<?php

namespace MF\Fairytale\Service;

use DateTime;
use MF\Fairytale\Dice;
use MF\Fairytale\Exception\NothingToPublishException;
use MF\Fairytale\WhatsAppService;
use PDO;

class ParagraphPublisher
{
    const LOW_PREPARED_PARAGRAPH_COUNT = 30;

    const MIN_LIMIT = 2;
    const LIMIT_ROLLS = 3;
    const PARAGRAPH_MIN_LENGTH = 150;

    /** @var PDO */
    private $pdo;

    /** @var Dice */
    private $dice;

    /** @var WhatsAppService */
    private $whatsapp;

    /**
     * @param PDO $pdo
     * @param Dice $dice
     * @param WhatsAppService $whatsapp
     */
    public function __construct(PDO $pdo, Dice $dice, WhatsAppService $whatsapp)
    {
        $this->pdo = $pdo;
        $this->dice = $dice;
        $this->whatsapp = $whatsapp;
    }

    /**
     * @return int
     */
    public function publishParagraphs()
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

        $this->checkPreparedParagraphsCount();

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
                    `is_new` = 1,
                    `public` = 1,
                    `public_from` = '$nowFormated'
                WHERE `id` IN (" . implode(',', $ids) . ")
            ");
        }
    }

    private function checkPreparedParagraphsCount()
    {
        $res = $this->pdo->query("SELECT COUNT(id) FROM paragraph WHERE `public` = 0");
        $count = (int) $res->fetchColumn();

        if ($count <= self::LOW_PREPARED_PARAGRAPH_COUNT) {
            $this->whatsapp->sendAdminMessage('Nizký počet (' . $count . ') odstavců v pohádce!');
        }
    }
}