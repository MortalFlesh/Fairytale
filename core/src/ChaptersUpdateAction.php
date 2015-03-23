<?php
namespace MF\Fairytale;

use PDO;

class ChaptersUpdateAction
{
    /** @var string */
    private $status;

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
     * @return self
     */
    public function run()
    {
        $this->status = 'ok';
        return $this;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }
}
