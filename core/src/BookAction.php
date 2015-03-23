<?php

namespace MF\Fairytale;

use PDO;

class BookAction
{
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
            SELECT *
            FROM paragraph
            WHERE chapter_id = $chapterNumber AND public = 1
            ORDER BY id
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
