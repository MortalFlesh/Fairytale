<?php
error_reporting(!E_ALL);

require_once "./../core/core.php";

$api = new \MF\Fairytale\Api($_REQUEST, new \MF\Fairytale\Config());

$response = $api->getResponse();

header('Content-Type: application/json');
echo json_encode($response, JSON_UNESCAPED_UNICODE);