<?php

require("config.php");
$action = isset($_GET['action']) ? $_GET['action'] : "";

switch ($action) {
	case 'newArticle':
		newArticle();
		break;
	case 'editArticle':
		editArticle();
		break;
	case 'deleteArticle':
		deleteArticle();
		break;
	default:
		listArticle();
	}

/*
Create new article
*/
function newArticle() {
	$results = array();
	$results['pageTitle'] = "New Article";
	$results['formAction'] = "newArticle";
	if (isset($_POST['saveChanges'])) {
		$article = new Article;
		$article->storeFromValues($_POST);
		$article->insert();
		header("Location: admin.php?status=changesSaved");
	} elseif (isset($_POST['cancel'])) {
		header("Location: admin.php");
	} else {
		$results['article'] = new Article;
		require(TEMPLATE_PATH . "/admin/editArticle.php");
	}
}

/*
Edit existing article
*/
function editArticle() {
	$results = array();
	$results['pageTitle'] = "Edit Article";
	$results['formAction'] = "editArticle";
	if (isset($_POST['saveChanges'])) {
		if (!$article = Article::getById((int)$_POST['articleId'])) {
			header("Location: admin.php?error=articleNotFound");
			return;
		}
		$article->storeFromValues($_POST);
		$article->update();
		header("Location: admin.php?status=changesSaved");
	} elseif (isset($_POST['cancel'])) {
		header("Location: admin.php");
	} else {
		$results['article'] = Article::getById((int)$_GET['articleId']);
		require(TEMPLATE_PATH . "/admin/editArticle.php");
	}
}

/*
Delete existing article
*/
function deleteArticle() {
	if (!$article = Article::getById((int)$_GET['articleId'])) {
		header( "Location: admin.php?error=articleNotFound" );
		return;
	}
	$article->delete();
	header("Location: admin.php?status=articleDeleted");
}

/*
Show all articles
*/
function listArticle() {
	$results = array();
	$data = Article::getList();
	$results['articles'] = $data['results'];
	$results['totalRows'] = $data['totalRows'];
	$results['pageTitle'] = "All Articles | admin page";

	if (isset($_GET['error'])) {
		if ($_GET['error'] == "articleNotFound") $results['errorMessage'] = "Error: Article not found.";
	}

	if (isset($_GET['status'])) {
		if ($_GET['status'] == "changesSaved") $results['statusMessage'] = "Your changes have been saved.";
		if ($_GET['status'] == "articleDeleted") $results['statusMessage'] = "Article deleted.";
	}
	require(TEMPLATE_PATH . "/admin/listArticles.php");
}

?>
