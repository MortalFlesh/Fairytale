<?php

$pdo = new PDO('mysql:host=localhost;dbname=fairytale', 'root', '');

$bookId = 1;
$text = "";
$chapterNumber = 1;
$title = '';

$paragraphs = explode("\n", $text);
$inserts = [];

foreach($paragraphs as $paragraph) {
    $inserts[] = "('$chapterNumber', '$paragraph', '1')";
}

$pdo->query("INSERT INTO chapter (number, title, book_id) VALUES ($chapterNumber, '$title', $bookId)");
$pdo->query("INSERT INTO paragraph (chapter_id, content, is_new) VALUES " . implode(",", $inserts));