<?php
error_reporting(!E_ALL);

$pdo = new PDO('mysql:host=localhost;dbname=fairytale;charset=utf8', 'root', '');

$action = $_GET['action'];
$response = [];

if (empty($action) || $action === 'book') {
    $bookQ = $pdo->query("SELECT * FROM book");
    $bookQ->setFetchMode(PDO::FETCH_ASSOC);

    foreach($bookQ->fetchAll() as $bookR) {
        $chapters = [];

        $chaptersQ = $pdo->query("SELECT * FROM chapter WHERE book_id = " . $bookR['id']);
        $chaptersQ->setFetchMode(PDO::FETCH_ASSOC);
        foreach($chaptersQ->fetchAll() as $chapterR) {
            $paragraphs = [];

            $paragraphsQ = $pdo->query("SELECT * FROM paragraph WHERE chapter_id = " . $chapterR['number'] . " ORDER BY id");
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

        $response = [
            'title' => $bookR['title'],
            'subTitle' => $bookR['sub_title'],
            'cover' => $bookR['cover'],
            'chapters' => $chapters,
        ];
    }
} elseif ($action === 'characters') {
    $charactersQ = $pdo->query("SELECT * FROM `character`");
    foreach($charactersQ->fetchAll(PDO::FETCH_ASSOC) as $characterR) {
        $infos = [];

        $infosQ = $pdo->query("SELECT * FROM `character_info` WHERE `character_id` = " . $characterR['id']);
        foreach($infosQ->fetchAll(PDO::FETCH_ASSOC) as $infoR) {
            $items = [];

            $itemsQ = $pdo->query("SELECT * FROM `character_info_item` WHERE character_info_id = " . $infoR['id']);
            foreach($itemsQ->fetchAll(PDO::FETCH_ASSOC) AS $itemR) {
                $items[] = $itemR['value'];
            }

            $infos[] = [
                'name' => $infoR['name'],
                'items' => $items,
            ];
        }

        $response[] = [
            'name' => $characterR['name'],
            'infos' => $infos,
        ];
    }
}

header('Content-Type: application/json');
echo json_encode($response, JSON_UNESCAPED_UNICODE);