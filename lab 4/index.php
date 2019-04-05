<?php

require("config.php");
$action = isset($_GET['action']) ? $_GET['action'] : "";
 
switch ($action) {
	case 'archive':
		archive();
		break;
	case 'viewArticle':
		viewArticle();
		break;
	default:
    	homepage();
    }

/*
List all articles
*/
function archive() {
	$results = array();
	$data = Article::getList();
	$results['articles'] = $data['results'];
	$results['totalRows'] = $data['totalRows'];
	$results['pageTitle'] = "Article Archive | News";
	require(TEMPLATE_PATH . "/archive.php");
}

/*
Show article page
*/
function viewArticle() {
	if (!isset($_GET["articleId"]) || !$_GET["articleId"]) {
		homepage();
		return;
	}

	$results = array();
	$results['article'] = Article::getById((int)$_GET["articleId"]);
	$results['pageTitle'] = $results['article']->title . " | News";
	require(TEMPLATE_PATH . "/viewArticle.php");
}

/* 
Show main page
*/
function homepage() {
	$results = array();
	$data = Article::getList(HOMEPAGE_NUM_ARTICLES);
	$results['articles'] = $data['results'];
	$results['totalRows'] = $data['totalRows'];
	$results['pageTitle'] = "News";
	require(TEMPLATE_PATH . "/homepage.php");
}

?>
