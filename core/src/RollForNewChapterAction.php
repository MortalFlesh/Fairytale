<?php

namespace MF\Fairytale;

use DateTime;
use MF\Fairytale\Service\Cookies;
use MF\Fairytale\Service\ServiceStatus;
use PDO;

class RollForNewChapterAction
{
    const HOURS_FOR_COOKIE = 20;
    const COOKIE_NAME = 'dice-rolled';
    const ALREADY_ROLLED = 'Already rolled today';

    /** @var array */
    private $data;

    /** @var PDO */
    private $pdo;

    /** @var Cookies */
    private $cookies;

    /** @var ServiceStatus */
    private $serviceStatus;

    /**
     * @param array $data
     * @param PDO $pdo
     * @param Cookies $cookies
     * @param ServiceStatus $serviceStatus
     */
    public function __construct(array $data, PDO $pdo, Cookies $cookies, ServiceStatus $serviceStatus)
    {
        $this->data = $data;
        $this->pdo = $pdo;
        $this->cookies = $cookies;
        $this->serviceStatus = $serviceStatus;
    }

    /**
     * @return array
     */
    public function getResponse()
    {
        $response = ['status' => 'fail'];

        $roll = (int) $this->data['roll'];
        $diceData = $this->cookies->get(self::COOKIE_NAME);

        if ($this->isRollValid($roll) && $this->isDiceDataValid($diceData)) {
            if ($this->alreadyRolledToday()) {
                $response['status'] = 'hack';
                return $response;
            }
            
            $this->setRolledForToday();

            $response['status'] = 'ok';
        }

        return $response;
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

    /**
     * @return bool
     */
    private function alreadyRolledToday()
    {
        $now = new DateTime();
        $status = $this->serviceStatus->getStatus(__CLASS__);

        /* var $statusTime DateTime */
        $statusTime = $status['time'];
        $alreadyRolled = ($status['message'] === self::ALREADY_ROLLED);

        $isToday = ($statusTime instanceof DateTime && $now->format('Y-m-d') === $statusTime->format('Y-m-d'));
        return ($alreadyRolled && $isToday);
    }

    private function setRolledForToday()
    {
        $now = new DateTime();
        $time = $now->format(DB_DATE_FORMAT);

        $diceData['time'] = $time;
        $this->cookies->set(self::COOKIE_NAME, $diceData, self::HOURS_FOR_COOKIE);

        $this->serviceStatus->setStatus(__CLASS__, self::ALREADY_ROLLED);
    }

}
