<?php
    header('Content-type: application/json');
    require_once("flickrInstance.php");
    
    $userId = $_GET["USER_ID"];
    $info = $f->people_getInfo($userId);
    echo json_encode($info);
?>
