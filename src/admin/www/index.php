<?php
const PATH_ROOT = '../../';
require PATH_ROOT . 'core/index.php';
$as = new \core\service\AuthService;
$token = $as -> start_app_session();
?>
<!doctype html>
<html lang="<?= (ADMIN_DOCUMENT['meta']['lang']) ?>">
<head>
	<meta charset="<?= (ADMIN_DOCUMENT['meta']['charset']) ?>">
	<meta name="viewport" content="<?= (ADMIN_DOCUMENT['meta']['viewport']) ?>">
	<title><?= (ADMIN_DOCUMENT['meta']['title']) ?></title>
	<meta name="description" content="<?= (ADMIN_DOCUMENT['meta']['description']) ?>">
	<meta name="keywords" content="<?= (ADMIN_DOCUMENT['meta']['keywords']) ?>">
	<meta name="robots" content="<?= (ADMIN_DOCUMENT['meta']['robots']) ?>">
	<meta name="og:url" content="<?= (ADMIN_DOCUMENT['root']) ?>">

	<script>
		window.APP_ENV = window.APP_ENV || '<?=(ENV)?>';
		window.APP_TIMESTAMP = window.APP_TIMESTAMP || '<?=(TIMESTAMP)?>';
		window.APP_TOKEN = window.APP_TOKEN || '<?=($token)?>';
		window.USER_TOKEN = window.USER_TOKEN || '<?=($as -> get_user_token())?>';
	</script>
</head>
<body class="page">
<div id="App">
	<div
		style="width: 100%;height: 100vh;min-height: 500px;display: flex;align-items: center;justify-content: center;flex-direction: column;">
		<div>
			Application is loading, please wait ...
		</div>
	</div>
</div>
<noscript>
	<div class="no-script-dialog">
		<div class="dialog-message">
        <?= (ADMIN_DOCUMENT['no_script_message']) ?>
		</div>
	</div>
</noscript>
<script src="<?= (ADMIN_DOCUMENT['scripts']) ?>"></script>
</body>
</html>
