<?php
    header('Content-type: application/json');
    require_once("flickrInstance.php");
    
    $userId = $_GET["USER_ID"];
    $galleries = $f->photosets_getList($userId);
    echo json_encode($galleries);
?>
