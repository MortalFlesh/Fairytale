<?php
namespace MF\Fairytale;

class Dice
{
    const MIN = 1;

    /**
     * @param $diceMaxNumber
     *
     * @return int
     */
    public function roll($diceMaxNumber)
    {
        return rand(self::MIN, $diceMaxNumber <= self::MIN ? self::MIN + 1 : $diceMaxNumber);
    }
}
