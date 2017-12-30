<?php
    header('Content-type: application/json');
    require_once("../phpflickr-3.1.1/phpFlickr.php");
    $apikey = $_GET["API_KEY"];
    $photoId = $_GET["PHOTO_ID"];
    $cacheDur = $_GET["CACHE_DURATION"];

    if (!isset($f)) {
        $f = new phpFlickr($apikey);
        require_once("cache.php");
    }
    
    $info = $f->photos_getSizes($photoId);

    echo json_encode($info);
?>
