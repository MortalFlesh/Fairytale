<?php

namespace MF\Fairytale;

use PDO;

class Config
{
    /** @var PDO */
    private $pdo;

    /**
     * @return string
     */
    public function getHomeUrl()
    {
        return 'http://localhost/Fairytale/';
    }

    /**
     * @return PDO
     */
    public function getPdoConnection()
    {
        if (!isset($this->pdo)) {
            $this->pdo = new PDO('mysql:host=localhost;dbname=fairytale;charset=utf8', 'root', '');
        }

        return $this->pdo;
    }
}
