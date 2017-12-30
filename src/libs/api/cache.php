<?php
    if (!file_exists('../../cache')) {
        mkdir('../../cache', 0777, true);
    }
    if (isset($f)) {
        $cacheFloat = floatval($cacheDur) * 60;
        $f->enableCache("fs", "../../cache", $cacheFloat);
    }
?>