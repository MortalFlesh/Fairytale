<?php
namespace MF\Fairytale;

use MF\Fairytale\Exception\NothingToPublishException;
use MF\Fairytale\Service\ParagraphPublisher;
use MF\Fairytale\Service\ServiceStatus;
use PDO;
use DateTime;
use Exception;

class ChaptersUpdateAction
{
    const ALREADY_RUN = 'already_run';
    const TRY_TO_RUN = 'trying';
    const MAX_ATTEMPS = 5;

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

    /** @var ParagraphPublisher */
    private $publisher;

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

        $this->publisher = new ParagraphPublisher($this->pdo, $this->dice);
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
            $this->serviceStatus->setStatus(__CLASS__, self::ALREADY_RUN);

            $published = $this->publisher->publishParagraphs();

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

    private function setAllPublicAsOld()
    {
        $this->pdo->query("UPDATE paragraph SET is_new = 0");
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
