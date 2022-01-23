<?php
const PATH_ROOT = '../../';
require PATH_ROOT . 'core/index.php';

?>
<!doctype html>
<html lang="<?= (WEB_DOCUMENT['meta']['lang']) ?>">
<head>
	<meta charset="<?= (WEB_DOCUMENT['meta']['charset']) ?>">
	<meta name="viewport" content="<?= (WEB_DOCUMENT['meta']['viewport']) ?>">
	<title><?= (WEB_DOCUMENT['meta']['title']) ?></title>
	<meta name="description" content="<?= (WEB_DOCUMENT['meta']['description']) ?>">
	<meta name="keywords" content="<?= (WEB_DOCUMENT['meta']['keywords']) ?>">
	<meta name="robots" content="<?= (WEB_DOCUMENT['meta']['robots']) ?>">
	<meta name="og:url" content="<?= (WEB_DOCUMENT['root']) ?>">

	<link href="<?= (WEB_DOCUMENT['styles']) ?>" rel="stylesheet">

	<script>
		window.APP_ENV = window.APP_ENV || '<?=(ENV)?>';
		window.APP_TIMESTAMP = window.APP_TIMESTAMP || '<?=(TIMESTAMP)?>';
	</script>
</head>
<body class="page">
<div id="App">web page</div>

<script src="<?= (WEB_DOCUMENT['scripts']) ?>"></script>
</body>
</html>