<?php
    header('Content-type: application/json');
    require_once("../phpflickr-3.1.1/phpFlickr.php");
    $apikey = $_GET["API_KEY"];
    $photosetid = $_GET["PHOTOSET_ID"];
    $cacheDur = $_GET["CACHE_DURATION"];

    if (!isset($f)) {
        $f = new phpFlickr($apikey);
        require_once("cache.php");
    }

    $photos = $f->photosets_getPhotos($photosetid);

    echo json_encode($photos);
?>
