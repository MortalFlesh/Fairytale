<?php

$root = __DIR__ . '/../';

require_once $root . 'vendor/autoload.php';

$loader = new \Nette\Loaders\RobotLoader();
$loader->addDirectory($root . 'core/src/');
$loader->setCacheStorage(new \Nette\Caching\Storages\FileStorage($root . 'fairytale/cache'));
$loader->register();

mb_internal_encoding('UTF-8');

define('DB_DATE_FORMAT', 'Y-m-d H:i:s');
