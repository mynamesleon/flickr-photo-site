<?php
    session_start();
    header('Content-type: application/json');
    require_once("../phpflickr-3.1.1/phpFlickr.php");
    if (!isset($_SESSION["PHP_FLICKR_INSTANCE"])) {
        throw new Exception("Missing flickr data");
    }
    if (empty($_GET["PHOTO_ID"])) {
        throw new Exception("Missing Photo ID");
    }
    $f = unserialize($_SESSION["PHP_FLICKR_INSTANCE"]);
    $photoId = $_GET["PHOTO_ID"];
    $info = $f->photos_getSizes($photoId);
    echo json_encode($info);
?>
