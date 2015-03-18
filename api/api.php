<?php
$pdo = new PDO('mysql:host=localhost;dbname=fairytale;charset=utf8', 'root', '');

$book = [];

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

    $book = [
        'title' => $bookR['title'],
        'subTitle' => $bookR['sub_title'],
        'cover' => $bookR['cover'],
        'chapters' => $chapters,
    ];
}

header('Content-Type: application/json');
echo json_encode($book, JSON_UNESCAPED_UNICODE);