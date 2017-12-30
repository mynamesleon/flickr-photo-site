<?php
    header('Content-type: application/json');
    require_once("../phpflickr-3.1.1/phpFlickr.php");
    $apikey = $_GET["API_KEY"];
    $userId = $_GET["USER_ID"];
    $cacheDur = $_GET["CACHE_DURATION"];

    if (!isset($f)) {
        $f = new phpFlickr($apikey);
        require_once("cache.php");
    }

    $galleries = $f->photosets_getList($userId);

    echo json_encode($galleries);
?>
