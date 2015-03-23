<?php

namespace MF\Fairytale;

use PDO;

class BookAction
{
    const MIN_PARAGRAPHS = 2;

    /** @var PDO */
    private $pdo;

    /** @var array */
    private $response;

    /**
     * @param $pdo
     */
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    /** @return array */
    public function getResponse()
    {
        $this->response = [];
        $this->loadBook();
        return $this->response;
    }

    private function loadBook()
    {
        $bookQ = $this->pdo->query("SELECT * FROM book");
        foreach($bookQ->fetchAll(PDO::FETCH_ASSOC) as $bookR) {
            $chapters = $this->loadChapters($bookR['id']);

            $this->response = [
                'title' => $bookR['title'],
                'subTitle' => $bookR['sub_title'],
                'cover' => $bookR['cover'],
                'chapters' => $chapters,
            ];
        }
    }

    /**
     * @param $bookId
     *
     * @return array
     */
    private function loadChapters($bookId)
    {
        $chapters = [];

        $chaptersQ = $this->pdo->query("SELECT * FROM chapter WHERE book_id = " . $bookId);
        foreach($chaptersQ->fetchAll(PDO::FETCH_ASSOC) as $chapterR) {
            $paragraphs = $this->loadParagraphs($chapterR['number']);

            $chapters[] = [
                'header' => [
                    'number' => $chapterR['number'],
                    'title' => $chapterR['title'],
                ],
                'paragraphs' => $paragraphs,
                'image' => $chapterR['image'],
            ];
        }

        return $chapters;
    }

    /**
     * @param $chapterNumber
     *
     * @return array
     */
    private function loadParagraphs($chapterNumber)
    {
        $paragraphs = [];

        $paragraphsQ = $this->pdo->query("
            SELECT * FROM (
                (SELECT * FROM paragraph WHERE chapter_id = 1 AND is_new = 0)
                UNION
                (SELECT * FROM paragraph WHERE chapter_id = 1 AND is_new = 1 LIMIT " . self::MIN_PARAGRAPHS . ")
            ) paragraphs ORDER BY id
        ");
        foreach($paragraphsQ->fetchAll(PDO::FETCH_ASSOC) as $paragraphR) {
            $paragraphs[] = [
                'content' => $paragraphR['content'],
                'isNew' => $paragraphR['is_new'],
            ];
        }

        return $paragraphs;
    }
}
