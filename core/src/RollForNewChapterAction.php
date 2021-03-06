<?php

namespace MF\Fairytale;

use DateTime;
use MF\Fairytale\Exception\NothingToPublishException;
use MF\Fairytale\Service\ParagraphPublisher;
use MF\Fairytale\Service\ServiceStatus;
use PDO;

class RollForNewChapterAction
{
    const HOURS_FOR_COOKIE = 20;
    const COOKIE_NAME = 'dice-rolled';
    const ALREADY_ROLLED = 'Already rolled today';
    const ROLL_BOUNDARY = 1;

    /** @var array */
    private $data;

    /** @var PDO */
    private $pdo;

    /** @var ServiceStatus */
    private $serviceStatus;

    /** @var Dice */
    private $dice;

    /** @var WhatsAppService */
    private $whatsAppService;

    /**
     * @param array $data
     * @param PDO $pdo
     * @param ServiceStatus $serviceStatus
     * @param Dice $dice
     */
    public function __construct(array $data, PDO $pdo, ServiceStatus $serviceStatus, Dice $dice, WhatsAppService $whatsAppService)
    {
        $this->data = $data;
        $this->pdo = $pdo;
        $this->serviceStatus = $serviceStatus;
        $this->dice = $dice;
        $this->whatsAppService = $whatsAppService;
    }

    /**
     * @return array
     */
    public function getResponse()
    {
        $response = ['status' => 'fail'];

        if ($this->alreadyRolledToday()) {
            $response['status'] = 'hack';
            return $response;
        }

        $this->serviceStatus->setStatus(__CLASS__, self::ALREADY_ROLLED);

        $roll = (int) $this->data['roll'];

        if ($this->isRollValid($roll)) {
            $response = $this->publishNewChapter();
        }

        return $response;
    }

    /**
     * @param int $roll
     * @return bool
     */
    private function isRollValid($roll)
    {
        $chance = $this->dice->roll(6);
        $low = $chance - self::ROLL_BOUNDARY;
        $high = $chance + self::ROLL_BOUNDARY;

        $isValid = ($roll >= 1 && $roll <= 6);
        $isInBoundaries = ($low <= $roll && $roll <= $high);

        return ($isValid && $isInBoundaries);
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

    /**
     * @return array
     */
    private function publishNewChapter()
    {
        try {
            $publisher = new ParagraphPublisher($this->pdo, $this->dice, $this->whatsAppService);
            $publishedCount = $publisher->publishParagraphs();

            return [
                'status' => 'ok',
                'publishedCount' => $publishedCount,
            ];
        } catch(NothingToPublishException $e) {
            return [
                'status' => 'nothing-to-publish',
            ];
        }
    }

}
