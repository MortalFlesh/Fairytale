<?php

namespace MF\Fairytale;

use PDO;

class Api
{
    /** @var array */
    private $data;

    /** @var PDO */
    private $pdo;

    /** @var string */
    private $homeUrl;

    /** @var array */
    private $response;

    /**
     * @param array $data
     * @param Config $config
     */
    public function __construct(array $data, Config $config)
    {
        $this->data = $data;
        $this->pdo = $config->getPdoConnection();
        $this->homeUrl = $config->getHomeUrl();
    }

    /**
     * @return array
     */
    public function getResponse()
    {
        $action = $this->data['action'];
        $this->response = [];

        if (empty($action) || $action === 'book') {
            $this->bookAction();
        } elseif ($action === 'characters') {
            $this->charactersAction();
        } elseif ($action === 'menu-items') {
            $this->menuItemsAction();
        }

        return $this->response;
    }

    private function bookAction()
    {
        $bookQ = $this->pdo->query("SELECT * FROM book");
        
        foreach($bookQ->fetchAll(PDO::FETCH_ASSOC) as $bookR) {
            $chapters = [];

            $chaptersQ = $this->pdo->query("SELECT * FROM chapter WHERE book_id = " . $bookR['id']);
            $chaptersQ->setFetchMode(PDO::FETCH_ASSOC);
            foreach($chaptersQ->fetchAll() as $chapterR) {
                $paragraphs = [];

                $paragraphsQ = $this->pdo->query("SELECT * FROM paragraph WHERE chapter_id = " . $chapterR['number'] . " ORDER BY id");
                $paragraphsQ->setFetchMode(PDO::FETCH_ASSOC);
                foreach($paragraphsQ->fetchAll() as $paragraphR) {
                    $paragraphs[] = [
                        'content' => $paragraphR['content'],
                        'isNew' => $paragraphR['is_new'],
                    ];
                }

                $chapters[] = [
                    'header' => [
                        'number' => $chapterR['number'],
                        'title' => $chapterR['title'],
                    ],
                    'paragraphs' => $paragraphs,
                    'image' => $chapterR['image'],
                ];
            }

            $this->response = [
                'title' => $bookR['title'],
                'subTitle' => $bookR['sub_title'],
                'cover' => $bookR['cover'],
                'chapters' => $chapters,
            ];
        }
    }

    private function charactersAction()
    {
        $charactersQ = $this->pdo->query("SELECT * FROM `character`");
        foreach($charactersQ->fetchAll(PDO::FETCH_ASSOC) as $characterR) {
            $infos = [];

            $infosQ = $this->pdo->query("SELECT * FROM `character_info` WHERE `character_id` = " . $characterR['id']);
            foreach($infosQ->fetchAll(PDO::FETCH_ASSOC) as $infoR) {
                $items = [];

                $itemsQ = $this->pdo->query("SELECT * FROM `character_info_item` WHERE character_info_id = " . $infoR['id']);
                foreach($itemsQ->fetchAll(PDO::FETCH_ASSOC) AS $itemR) {
                    $items[] = $itemR['value'];
                }

                $infos[] = [
                    'name' => $infoR['name'],
                    'items' => $items,
                ];
            }

            $this->response[] = [
                'name' => $characterR['name'],
                'infos' => $infos,
            ];
        }
    }

    private function menuItemsAction()
    {
        $itemsQ = $this->pdo->query("SELECT * FROM menu_item ORDER BY priority ASC");

        foreach($itemsQ->fetchAll(PDO::FETCH_ASSOC) as $itemsR) {
            $this->response[] = [
                'name' => $itemsR['name'],
                'pathName' => $itemsR['path_name'],
                'link' => $this->homeUrl . $itemsR['link'],
            ];
        }
    }
}
