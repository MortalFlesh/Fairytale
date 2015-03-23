<?php
require_once "./../core/core.php";

$config = new \MF\Fairytale\Config();

$pdo = $config->getPdoConnection();

$json = file_get_contents('./../api/characters.json');
$array = json_decode($json, true);

$characters = $array['pohadka'];

foreach($characters as $character) {
    $name = $character['Name'];

    $characterId = insertAndGetId($pdo, 'character', ['name'], ["'$name'"], "`name` = '$name'");

    foreach($character['Infos'] as $infoTitle => $infos) {

        $infoId = insertAndGetId(
            $pdo,
            'character_info',
            ['name', 'character_id'],
            ["'$infoTitle'", $characterId],
            "character_id = $characterId AND `name` = '$name'"
        );

        foreach($infos as $info) {
            insertAndGetId(
                $pdo,
                'character_info_item',
                ['value', 'character_info_id'],
                ["'$info'", $infoId],
                "character_info_id = $infoId AND `value` = '$info'"
            );
        }
    }
}

function insertAndGetId(PDO $pdo, $table, array $cols, array $values, $condition) {
    $cols = implode(', ', array_map(function($col) {
        return "`$col`";
    }, $cols));

    $pdo->query("INSERT IGNORE INTO `$table` ($cols) VALUES (" . implode(',', $values) . ')');
    $id = $pdo->lastInsertId();

    if (empty($id)) {
        $id = (int)$pdo->query("SELECT id FROM `$table` WHERE $condition")->fetch(PDO::FETCH_ASSOC)['id'];
    }
    return $id;
}