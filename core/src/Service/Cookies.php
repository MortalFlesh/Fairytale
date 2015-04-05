<?php

namespace MF\Fairytale\Service;

class Cookies
{
    /**
     * @param $name
     * @return string|array
     */
    public function get($name)
    {
        $value = isset($_COOKIE[$name]) ? $_COOKIE[$name] : null;

        $decoded = json_decode($value, true);
        if (is_array($decoded)) {
            return $decoded;
        }

        return $value;
    }

    /**
     * @param string $name
     * @param string|array $value
     * @param int $hours
     */
    public function set($name, $value, $hours)
    {
        if (is_array($value)) {
            $value = json_encode($value);
        }

        $_COOKIE[$name] = $value;
        setcookie($name, $value, time() + $hours * 60 * 60);
    }
}
