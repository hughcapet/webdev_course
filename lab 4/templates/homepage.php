<ul id="headlines">
 
<?php foreach ($results['articles'] as $article) { ?>
 
<li>
    <h2>
	<span class="pubDate">
			<?php echo date('j F Y', $article->publicationDate)?>
	</span>
	<a href=".?action=viewArticle&amp;articleId=<?php echo $article->id?>">
			<?php echo htmlspecialchars($article->title)?>
	</a>
    </h2>
</li>
 
<?php } ?>

</ul>

<p><a href="./?action=archive">Article Archive</a></p>
