<?php
error_reporting(E_ALL ^ E_NOTICE);
session_start();

if (isset($_GET['logout'])) {
    unset($_SESSION['logged']);
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    exit;
}

require_once "./../core/core.php";

$config = new \MF\Fairytale\Config();

if ($_SESSION['logged'] !== true) {
    if ($_POST['login']) {
        $pdo = $config->getPdoConnection();
        $login = $pdo->prepare("SELECT * FROM user WHERE id = ?");
        $login->execute([1]);

        $result = $login->fetch(PDO::FETCH_ASSOC);
        $passHash = password_hash($_POST['password'], PASSWORD_BCRYPT, ['cost' => 10,]);

        if (password_verify($result['password'], $passHash)) {
            $_SESSION['logged'] = true;
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit;
        }
    }
    ?>
    <html>
        <head>
            <title>Fairytale - Login</title>
        </head>
        <body>
            <form action="" method="POST">
                <input type="password" name="password" />
                <input type="submit" name="login" />
            </form>
        </body>
    </html>
    <?php
    exit;
}

function repairText($rawText) {
    $text = $rawText;
    $text = str_replace(['<i>', '<em>', '</i>', '</em>'], ['@*', '@*', '@', '@'], $text);
    $text = str_replace(['<b>', '<strong>', '</b>', '</strong>'], ['@#', '@#', '@', '@'], $text);
    $text = str_replace(['<p>', '</p>'], '', $text);

    return $text;
}

if ($_POST['save']) {
    $text = repairText($_POST['text']);

    $paragraphs = explode("\n", $text);

    foreach($paragraphs as $paragraph) {
        echo sprintf('<p>%s</p>', $paragraph);
    }

    exit;
}
?>
<html>
<head>
    <title>Fairytale - insert chapters</title>
    <script type="text/javascript" src="../admin/tinymce/js/tinymce/tinymce.min.js"></script>
    <script type="text/javascript">
        tinymce.init({
            selector: "textarea",
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            entity_encoding : "raw",
            valid_elements: "p,strong,b,em,i",
        });
    </script>
    <style type="text/css">
        input[type=text] {
            height: 30px;
        }

        .label-line {
            padding: 5px 0;
        }
    </style>
</head>
<body>
<div>
    <?=$status?>
</div>
<form action="" method="POST">
    <div>
        <textarea name="text" placeholder="text" style="height: 500px;"></textarea>
    </div>

    <div>
        <input type="submit" name="save" value="OK" style="width: 100px; height: 50px;" />
        <a style="padding-left: 200px;" href="?logout">Odhlásit</a>
    </div>
</form>    
</body>
</html>
