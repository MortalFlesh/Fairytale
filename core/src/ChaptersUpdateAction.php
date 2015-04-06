<?php
namespace MF\Fairytale;

use MF\Fairytale\Exception\NothingToPublishException;
use MF\Fairytale\Service\ServiceStatus;
use PDO;
use DateTime;
use Exception;

class ChaptersUpdateAction
{
    const ALREADY_RUN = 'already_run';
    const TRY_TO_RUN = 'trying';
    const MAX_ATTEMPS = 5;

    const MIN_LIMIT = 2;
    const LIMIT_ROLLS = 3;
    const PARAGRAPH_MIN_LENGTH = 150;

    /** @var string */
    private $status;

    /** @var PDO */
    private $pdo;

    /** @var Dice */
    private $dice;

    /** @var WhatsAppService */
    private $whatsAppService;

    /** @var ServiceStatus */
    private $serviceStatus;

    /**
     * @param PDO $pdo
     * @param Dice $dice
     * @param WhatsAppService $whatsAppService
     * @param ServiceStatus $serviceStatus
     */
    public function __construct(PDO $pdo, Dice $dice, WhatsAppService $whatsAppService, ServiceStatus $serviceStatus)
    {
        $this->pdo = $pdo;
        $this->dice = $dice;
        $this->whatsAppService = $whatsAppService;
        $this->serviceStatus = $serviceStatus;
    }

    /**
     * @return self
     */
    public function run()
    {
        if (!$this->shouldRun()) {
            return $this;
        }

        $this->setAllPublicAsOld();

        try {
            $published = $this->publishParagraphs();

            if ($published > 0) {
                $this->notify($published);
                $this->status = 'published: ' . $published;
            } else {
                $this->status = 'none-published';
            }
        } catch(NothingToPublishException $e) {
            $this->status = 'nothing-to-publish';
        }

        return $this;
    }

    /**
     * @return bool
     */
    private function shouldRun()
    {
        $status = $this->serviceStatus->getStatus(__CLASS__);
        $attemp = (int) $status['attemp'];
        $currentAttemp = $attemp + 1;

        /* var $statusTime DateTime */
        $statusTime = $status['time'];
        $now = new DateTime();

        $noMessage = (empty($status['message']));
        $tryingMsg = ($status['message'] === self::TRY_TO_RUN);
        $alreadyRun = ($status['message'] === self::ALREADY_RUN);

        $isToday = ($statusTime instanceof DateTime && $now->format('Y-m-d') === $statusTime->format('Y-m-d'));
        $alreadyRunToday = ($alreadyRun && $isToday);

        $canRun = (!$alreadyRunToday && ($noMessage || $tryingMsg));
        $shouldRun = ($currentAttemp > self::MAX_ATTEMPS || $this->dice->roll(6) >= 5);

        if ($canRun && $shouldRun) {
            $this->status = 'running...';
            return true;
        } elseif (!$alreadyRunToday) {
            $this->status = self::TRY_TO_RUN . ' ' . $currentAttemp;
            $this->serviceStatus->setStatus(__CLASS__, self::TRY_TO_RUN, $currentAttemp);
        } else {
            $this->status = self::ALREADY_RUN;
        }
        return false;
    }

    /**
     * @return int
     */
    private function publishParagraphs()
    {
        $chapterId = $this->getFirstChapterIdToPublic();
        if ($chapterId <= 0) {
            throw new NothingToPublishException();
        }

        $limit = $this->calcLimit();

        $paragraphs = $this->loadParagraphsToPublish($chapterId, $limit);
        $newLimit = $this->checkParagraphsAndGetNewLimit($paragraphs, $limit);

        if ($newLimit !== $limit) {
            $paragraphs = $this->loadParagraphsToPublish($chapterId, $newLimit);
        }

        $this->setParagraphsAsNewAndPublic($paragraphs);
        $this->serviceStatus->setStatus(__CLASS__, self::ALREADY_RUN);

        return count($paragraphs);
    }

    /**
     * @return int
     */
    private function getFirstChapterIdToPublic()
    {
        $res = $this->pdo->query("
            SELECT C.number
            FROM chapter C
            JOIN paragraph P
                ON C.number = P.chapter_id
                AND P.public = 0
            ORDER BY C.number ASC
            LIMIT 1
            ");

        return (int) $res->fetchColumn();
    }

    private function setAllPublicAsOld()
    {
        $this->pdo->query("UPDATE paragraph SET is_new = 0");
    }

    /**
     * @return int
     */
    private function calcLimit()
    {
        $limit = self::MIN_LIMIT;

        for ($i = 0; $i < self::LIMIT_ROLLS; $i++) {
            if ($this->dice->roll(6) === 6) {
                $limit++;
            }
        }

        return $limit;
    }

    /**
     * @param $chapterId
     * @param $limit
     *
     * @return array
     */
    private function loadParagraphsToPublish($chapterId, $limit)
    {
        $res = $this->pdo->query("
            SELECT *
            FROM paragraph
            WHERE chapter_id >= $chapterId AND public = 0
            LIMIT $limit
        ");

        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * @param array $paragraphs
     * @param $limit
     *
     * @return mixed
     */
    private function checkParagraphsAndGetNewLimit(array $paragraphs, $limit)
    {
        $newLimit = $limit;

        foreach ($paragraphs as $paragraph) {
            if (mb_strlen($paragraph['content']) < self::PARAGRAPH_MIN_LENGTH) {
                $newLimit++;
            }
        }

        return $newLimit;
    }

    /**
     * @param array $paragraphs
     */
    private function setParagraphsAsNewAndPublic(array $paragraphs)
    {
        $ids = [];
        foreach ($paragraphs as $paragraph) {
            $ids[] = (int) $paragraph['id'];
        }

        $now = new DateTime();
        $nowFormated = $now->format(DB_DATE_FORMAT);

        if (!empty($ids)) {
            $this->pdo->query("
                UPDATE paragraph
                SET
                    is_new = 1,
                    public = 1,
                    public_from = '$nowFormated'
                WHERE id IN (" . implode(',', $ids) . ")
            ");
        }
    }

    /**
     * @param $publishedCount
     */
    private function notify($publishedCount)
    {
        $message = '';

        if ($publishedCount === 1) {
            $message .= 'Přibyl Ti ' . $publishedCount . ' nový odstavec';
        } elseif ($publishedCount >= 2 && $publishedCount <= 4) {
            $message .= 'Přibyly Ti ' . $publishedCount . ' nové odstavce';
        } elseif ($publishedCount >= 5) {
            $message .= 'Přibylo Ti ' . $publishedCount . ' nových odstavců';
        }

        $message .= ' v pohádce, tak se koukni na www.magmadin.cz :-*';

        try {
            $this->whatsAppService->sendMessage($message);
        } catch (Exception $e) {
            $this->status .= ' | with notify error';
        }
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }
}
