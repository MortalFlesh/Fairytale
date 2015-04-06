<?php

namespace MF\Fairytale;

use WhatsProt;

class WhatsAppService
{
    /** @var WhatsAppConfig */
    private $whatsappConfig;

    /**
     * @param $whatsappConfig
     */
    public function __construct($whatsappConfig)
    {
        $this->whatsappConfig = $whatsappConfig;
    }

    /**
     * @param string $message
     */
    public function sendMessage($message)
    {
        $this->send($message);
    }

    /**
     * @param string $message
     * @param string|null $destinationPhone
     */
    private function send($message, $destinationPhone = null)
    {
        $userPhone = $this->whatsappConfig->getUserPhone();
        $userName = $this->whatsappConfig->getUserName();
        $password = $this->whatsappConfig->getPassword();
        $debug = $this->whatsappConfig->getDebug();

        if (empty($destinationPhone)) {
            $destinationPhone = $this->whatsappConfig->getDestination();
        }

        $whatsApp = new WhatsProt($userPhone, $userName, $debug);
        $whatsApp->connect();
        $whatsApp->loginWithPassword($password);
        $whatsApp->sendMessage($destinationPhone, $message);
    }

    /**
     * @param string $message
     */
    public function sendAdminMessage($message)
    {
        $this->send($message, $this->whatsappConfig->getAdminDestination());
    }

}
