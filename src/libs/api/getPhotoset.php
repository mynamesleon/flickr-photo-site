<?php
    session_start();
    header('Content-type: application/json');
    require_once("../phpflickr-3.1.1/phpFlickr.php");
    if (!isset($_SESSION["PHP_FLICKR_INSTANCE"])) {
        throw new Exception("Missing flickr data");
    }
    if (empty($_GET["PHOTOSET_ID"])) {
        throw new Exception("Missing Photoset ID");
    }
    $f = unserialize($_SESSION["PHP_FLICKR_INSTANCE"]);
    $photosetid = $_GET["PHOTOSET_ID"];
    $photos = $f->photosets_getPhotos($photosetid);
    echo json_encode($photos);
?>
