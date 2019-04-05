<?php include "templates/include/header.php" ?>

<h1>All Articles</h1>

<?php if (isset($results['errorMessage'])) { ?>
    <div class="errorMessage">
    	<?php echo $results['errorMessage'] ?>
    </div>
<?php } ?>


<?php if (isset($results['statusMessage'])) { ?>
        <div class="statusMessage">
        	<?php echo $results['statusMessage'] ?>
        </div>
<?php } ?>

<table>
	<tr>
		<th>Publication Date</th>
        <th>Article</th>
    </tr>

<?php foreach ($results['articles'] as $article) { ?>

    <tr> 
    	<td><?php echo date('j M Y', $article->publicationDate)?></td>
		<td>
			<a href="admin.php?action=editArticle&amp;articleId=<?php echo $article->id?>'"><?php echo $article->title?></a>
		</td>
    	    
    </tr>

<?php } ?>

</table>

<p><a href="admin.php?action=newArticle">New Article</a></p>
