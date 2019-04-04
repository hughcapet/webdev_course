<?php
ini_set("display_errors", true);
date_default_timezone_set("Europe/Moscow");
define("DB_DSN", "mysql:host=localhost;dbname=news");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "");
define("CLASS_PATH", "classes");
define("TEMPLATE_PATH", "templates");
define("HOMEPAGE_NUM_ARTICLES", 5);
require( CLASS_PATH . "/Article.php" );

function handleException($exception) {
	echo "An error occured";
	error_log($exception->getMessage());
}

set_exception_handler("handleException");
?>