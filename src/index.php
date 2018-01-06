<?php 
    // include your API key setting here 
    $apikey = "{API_KEY}";

    // unclude your flickr user ID here
    $userid = "{USER_ID}";

    // cache duration setting, in minutes
    $cacheduration = 30;

    // core functionality from here...
    $root = dirname(__FILE__);
    require_once($root . "/libs/phpflickr-3.1.1/phpFlickr.php");
    session_start();

    // store user id in session
    if (!isset($_SESSION["PHP_FLICKR_USER_ID"])) {
        $_SESSION["PHP_FLICKR_USER_ID"] = $userid;
    }

    // grab flickr instance from session storage if available
    if (isset($_SESSION["PHP_FLICKR_INSTANCE"])) {
        $f = unserialize($_SESSION["PHP_FLICKR_INSTANCE"]);
    } 
    // create instance
    else {
        $f = new phpFlickr($apikey);
        // create writeable cache directory if needed
        if (!file_exists("cache")) {
            mkdir("cache", 0777, true);
        }
        // enable caching 
        $cacheFloat = floatval($cacheduration) * 60;
        $f->enableCache("fs", "cache", $cacheFloat);
        // serialize flickr instance and store in session
        $sf = serialize($f);
        $_SESSION["PHP_FLICKR_INSTANCE"] = $sf;
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Flickr Photography Site</title>
  <link rel="icon" href="/favicon.png" />
  <!--[if IE]><link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" /><![endif]-->
  <link rel="apple-touch-icon" href="/touch-icon.png" />
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="msapplication-TileImage" content="/ms-icon.png" />
  <meta name="theme-color" content="#ffffff" />
  <link href="/main.bundle.css" rel="stylesheet" />
</head>

<body>
  <div id="app"></div>
  <script src="/main.bundle.js"></script>
</body>

</html>