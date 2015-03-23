<?php

$root = __DIR__ . '/../';

require_once $root . 'vendor/autoload.php';

$loader = new \Nette\Loaders\RobotLoader();
$loader->addDirectory($root . 'core/src/');
$loader->setCacheStorage(new \Nette\Caching\Storages\FileStorage($root . 'fairytale/cache'));
$loader->register();