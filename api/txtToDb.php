<?php
error_reporting(E_ALL ^ E_NOTICE);

if ($_POST['save']) {
    $pdo = new PDO('mysql:host=localhost;dbname=fairytale', 'root', '');

    $bookId = 1;
    $text = $_POST['text'];
    $chapterNumber = (int)$_POST['chapter'];
    $title = $_POST['title'];

    $chapter = $pdo->query("INSERT INTO chapter (number, title, book_id, image) VALUES ($chapterNumber, '$title', $bookId, '')");

    $paragraphs = explode("\n", $text);
    $inserts = [];

    foreach($paragraphs as $paragraph) {
        $inserts[] = "('$chapterNumber', '$paragraph', '1')";
    }

    $pdo->query("INSERT INTO paragraph (chapter_id, content, is_new) VALUES " . implode(",", $inserts));

    $status = 'ok';
}
?>
<html>
<head>
    <title>Fairytale - insert chapters</title>
</head>
<body>
<div>
    <?=$status?>
</div>
<form action="" method="POST">
    <div>
        <input type="text" name="chapter" value="" placeholder="chapter" />
        <input type="text" name="title" value="" placeholder="title" style="width: 200px;" />
    </div>
    
    <div>
        <textarea name="text" placeholder="text" style="width: 690px; height: 600px;"></textarea>
    </div>
    
    <div>
        <input type="submit" name="save" value="OK" style="width: 100px; height: 50px;" />
    </div>
</form>    
</body>
</html>
