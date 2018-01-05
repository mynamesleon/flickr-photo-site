<?php
    header('Content-type: application/json');
    require_once("flickrInstance.php");
    
    $photoId = $_GET["PHOTO_ID"];
    $info = $f->photos_getSizes($photoId);
    echo json_encode($info);
?>
