<?php
    session_start();
    header('Content-type: application/json');
    require_once("../phpflickr-3.1.1/phpFlickr.php");
    if (!isset($_SESSION["PHP_FLICKR_INSTANCE"]) || !isset($_SESSION["PHP_FLICKR_USER_ID"])) {
        throw new Exception("Missing flickr data");
    }
    $f = unserialize($_SESSION["PHP_FLICKR_INSTANCE"]);
    $userId = $_SESSION["PHP_FLICKR_USER_ID"];
    $info = $f->people_getInfo($userId);
    echo json_encode($info);
?>
