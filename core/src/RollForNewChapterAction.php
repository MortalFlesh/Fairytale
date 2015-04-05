<?php

namespace MF\Fairytale;

use DateTime;
use MF\Fairytale\Service\Cookies;
use PDO;

class RollForNewChapterAction
{
    const HOURS_FOR_COOKIE = 20;
    const COOKIE_NAME = 'dice-rolled';

    private $response = [];

    /** @var array */
    private $data;

    /** @var PDO */
    private $pdo;

    /** @var Cookies */
    private $cookies;

    /**
     * @param array $data
     * @param PDO $pdo
     * @param Cookies $cookies
     */
    public function __construct(array $data, PDO $pdo, Cookies $cookies)
    {
        $this->data = $data;
        $this->pdo = $pdo;
        $this->cookies = $cookies;
    }

    public function getResponse()
    {
        $this->response['status'] = 'fail';

        $roll = (int) $this->data['roll'];
        $diceData = $this->cookies->get(self::COOKIE_NAME);
        $this->response['diceData'] = $diceData;

        if ($this->isRollValid($roll) && $this->isDiceDataValid($diceData)) {
            $now = new DateTime();
            $diceData['time'] = $now->format('Y-m-d H:i:s');

            $this->cookies->set(self::COOKIE_NAME, $diceData, self::HOURS_FOR_COOKIE);

            $this->response['status'] = 'ok';
        }

        return $this->response;
    }

    /**
     * @param int $roll
     * @return bool
     */
    private function isRollValid($roll)
    {
        return ($roll >= 1 && $roll <= 6);
    }

    /**
     * @param array $diceData
     * @return bool
     */
    private function isDiceDataValid($diceData){
        return (is_array($diceData) && array_key_exists('roll', $diceData) && !array_key_exists('time', $diceData));
    }
}
