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
     * @param $message
     */
    public function sendMessage($message)
    {
        $userPhone = $this->whatsappConfig->getUserPhone();
        $userName = $this->whatsappConfig->getUserName();
        $password = $this->whatsappConfig->getPassword();
        $debug = $this->whatsappConfig->getDebug();
        $destinationPhone = $this->whatsappConfig->getDestination();

        $whatsApp = new WhatsProt($userPhone, $userName, $debug);
        $whatsApp->connect();
        $whatsApp->loginWithPassword($password);
        $whatsApp->sendMessage($destinationPhone, $message);
    }

}
