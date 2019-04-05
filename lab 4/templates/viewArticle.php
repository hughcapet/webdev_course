<?php include "templates/include/header.php" ?>
<h1>
	<?php echo htmlspecialchars( $results['article']->title )?>
</h1>
<div>
	<?php echo $results['article']->content?>
</div>
<p class="pubDate">
	Published on <?php echo date('j F Y', $results['article']->publicationDate)?>
</p>
 
 <p><a href="./">Return to Homepage</a></p>