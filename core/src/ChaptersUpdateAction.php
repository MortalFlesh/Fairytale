<?php
namespace MF\Fairytale;

use PDO;
use DateTime;

class ChaptersUpdateAction
{
    const MIN_LIMIT = 2;
    const LIMIT_ROLLS = 3;
    const PARAGRAPH_MIN_LENGTH = 150;
    const DB_DATE_FORMAT = 'Y-m-d H:i:s';

    /** @var string */
    private $status;

    /** @var PDO */
    private $pdo;

    /** @var Dice */
    private $dice;

    /**
     * @param PDO $pdo
     * @param Dice $dice
     */
    public function __construct(PDO $pdo, Dice $dice)
    {
        $this->pdo = $pdo;
        $this->dice = $dice;
    }

    /**
     * @return self
     */
    public function run()
    {
        $this->setAllPublicAsOld();

        $chapterId = $this->getFirstChapterIdToPublic();
        if ($chapterId <= 0) {
            $this->status = 'nothing-to-publish';
            return $this;
        }

        $limit = $this->calcLimit();

        $paragraphs = $this->loadParagraphsToPublish($chapterId, $limit);
        $newLimit = $this->checkParagraphsAndGetNewLimit($paragraphs, $limit);

        if ($newLimit !== $limit) {
            $paragraphs = $this->loadParagraphsToPublish($chapterId, $newLimit);
        }

        $this->setParagraphsAsNewAndPublic($paragraphs);

        $published = count($paragraphs);

        $this->status = 'published: ' . $published;
        return $this;
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
            if (mb_strlen($paragraph) < self::PARAGRAPH_MIN_LENGTH) {
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
        foreach($paragraphs as $paragraph) {
            $ids[] = (int) $paragraph['id'];
        }

        $now = new DateTime();
        $nowFormated = $now->format(self::DB_DATE_FORMAT);

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
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }
}
