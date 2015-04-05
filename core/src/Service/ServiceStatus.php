<?php

namespace MF\Fairytale\Service;

use DateTime;
use PDO;

class ServiceStatus
{
    /** @var PDO */
    private $pdo;

    /**
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * @param string $name
     * @param string $message
     * @param int $attemp
     */
    public function setStatus($name, $message = '', $attemp = 0)
    {
        $now = new DateTime();
        $time = $now->format(DB_DATE_FORMAT);

        $this->pdo->query("
            REPLACE INTO service (`name`, `message`, `attemp`, `time`)
            VALUES ('$name', '$message', $attemp, '$time')"
        );
    }

    /**
     * @param string $name
     * @return array
     */
    public function getStatus($name)
    {
        $res = $this->pdo->query("SELECT * FROM service WHERE `name` = '$name'");
        $status = $res->fetch(PDO::FETCH_ASSOC);

        return [
            'message' => $status['message'],
            'attemp' => (int) $status['attemp'] > 0 ? (int) $status['attemp'] : 0,
            'time' => DateTime::createFromFormat(DB_DATE_FORMAT, $status['time']),
        ];
    }
}
