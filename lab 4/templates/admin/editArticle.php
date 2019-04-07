<?php include "templates/include/header.php" ?>

<h1>Edit article</h1>

<form action="admin.php?action=<?php echo $results['formAction']?>" method="post">
    <?php if (isset($results['errorMessage'])) { ?>
        <div class="errorMessage">
            <?php echo $results['errorMessage'] ?>
        </div>
    <?php } ?>

    <input type="hidden" name="articleId" value="<?php echo $results['article']->id ?>">

    <ul>
        <li>
            <input type="text" placeholder="Article title" name="title" id="title" required maxlength="255" value="<?php echo htmlspecialchars( $results['article']->title )?>">
        </li>
        <li>
            <textarea rows="10" cols="50" name="content" id="content" required maxlength="1000"><?php echo htmlspecialchars($results['article']->content)?></textarea>
        </li>
        <li>
            <label for="publicationDate">Publication Date</label>
            <input type="date" name="publicationDate" id="publicationDate" placeholder="YYYY-MM-DD" required maxlength="10" value="<?php echo $results['article']->publicationDate ? date( "Y-m-d", $results['article']->publicationDate ) : date("Y-m-d", time()) ?>" >
        </li>
    </ul>

    <div class="buttons">
        <input type="submit" name="saveChanges" value="Save Changes">
        <input type="submit" formnovalidate name="cancel" value="Cancel">
    </div>

</form>

<?php if ($results['article']->id) { ?>
      <a href="admin.php?action=deleteArticle&amp;articleId=<?php echo $results['article']->id ?>" onclick="return confirm('Delete This Article?')"><button class="delete">Delete</button></a>
<?php } ?>

<?php include "templates/include/footer.php" ?>