<?php
    header('Content-type: application/json');
    require_once("flickrInstance.php");
    
    $photosetid = $_GET["PHOTOSET_ID"];
    $photos = $f->photosets_getPhotos($photosetid);
    echo json_encode($photos);
?>
