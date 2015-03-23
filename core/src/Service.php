<?php
namespace MF\Fairytale;

use PDO;

class Service
{
    /** @var array */
    private $data;

    /** @var PDO */
    private $pdo;

    /** @var array */
    private $response;

    /**
     * @param array $data
     * @param PDO $pdo
     */
    public function __construct(array $data, PDO $pdo)
    {
        $this->data = $data;
        $this->pdo = $pdo;
    }

    /**
     * @return array
     */
    public function getResponse()
    {
        $service = $this->data['service'];
        $this->response = [];

        if (empty($service) || $service === 'chapters-update') {
            $this->chaptersUpdateAction();
        }

        return $this->response;
    }

    private function chaptersUpdateAction()
    {
        $chapterUpdateAction = new ChaptersUpdateAction();
        $this->response['status'] = $chapterUpdateAction
            ->run()
            ->getStatus();
    }
}
