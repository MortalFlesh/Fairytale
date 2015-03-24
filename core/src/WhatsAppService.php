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

    public function sendMessage($message)
    {
        $userPhone = $this->whatsappConfig->getUserPhone();
        $userIdentity = $this->whatsappConfig->getUserIdentity();
        $userName = $this->whatsappConfig->getUserName();
        $password = $this->whatsappConfig->getPassword();
        $debug = $this->whatsappConfig->getDebug();
        $destinationPhone = $this->whatsappConfig->getDestination();

        $whatsApp = new WhatsProt($userPhone, $userIdentity, $userName, $debug);
        $whatsApp->connect();
        $whatsApp->loginWithPassword($password);
        $whatsApp->sendMessage($destinationPhone, $message);
    }

}
