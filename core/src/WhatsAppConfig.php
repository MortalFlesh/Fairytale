<?php

namespace MF\Fairytale;

class WhatsAppConfig
{
    private $userPhone;
    private $userIdentity;
    private $userName;
    private $password;
    private $debug;
    private $destination;

    /**
     * @return mixed
     */
    public function getUserPhone()
    {
        return $this->userPhone;
    }

    /**
     * @return mixed
     */
    public function getUserIdentity()
    {
        return $this->userIdentity;
    }

    /**
     * @return mixed
     */
    public function getUserName()
    {
        return $this->userName;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @return mixed
     */
    public function getDebug()
    {
        return $this->debug;
    }

    /**
     * @return mixed
     */
    public function getDestination()
    {
        return $this->destination;
    }
}
