<?php 
    require_once("../phpflickr-3.1.1/phpFlickr.php");
    session_start();
    if (isset($_SESSION["PHP_FLICKR_INSTANCE"])) {
        $f = unserialize($_SESSION["PHP_FLICKR_INSTANCE"]);
    } else {
        $apikey = $_GET["API_KEY"];
        $f = new phpFlickr($apikey);
        require_once("cache.php");
        $sf = serialize($f);
        $_SESSION["PHP_FLICKR_INSTANCE"] = $sf;
    }
?>