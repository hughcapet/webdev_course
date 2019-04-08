<?php include "templates/include/header.php" ?>
<h1>Article Archive</h1>

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
   


<p><?php echo $results['totalRows']?> article<?php echo ( $results['totalRows'] != 1 ) ? 's' : '' ?> in total.</p>
