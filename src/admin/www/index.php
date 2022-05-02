<?php
session_start();
header("Content-Type: text/html;charset=utf-8");

const PATH_ROOT = '../../';
require PATH_ROOT . 'core/index.php';

$as = new \core\service\AuthService;

$token = $as -> start_app_session();
?>
<!doctype html>
<html lang="<?= (ADMIN_DOCUMENT['meta']['lang']) ?>">
<head>
	<meta charset="<?= (ADMIN_DOCUMENT['meta']['charset']) ?>" />
	<meta name="viewport" content="<?= (ADMIN_DOCUMENT['meta']['viewport']) ?>" />
	<title><?= (ADMIN_DOCUMENT['meta']['title']) ?></title>
	<meta name="description" content="<?= (ADMIN_DOCUMENT['meta']['description']) ?>" />
	<meta name="keywords" content="<?= (ADMIN_DOCUMENT['meta']['keywords']) ?>" />
	<meta name="robots" content="<?= (ADMIN_DOCUMENT['meta']['robots']) ?>" />
	<meta name="og:url" content="<?= (ADMIN_DOCUMENT['root']) ?>" />
	<link rel="shortcut icon" href="<?= (ADMIN_DOCUMENT['meta']['icon_ico']) ?>" />
	<link rel="icon" type="image/png" href="<?= (ADMIN_DOCUMENT['meta']['icon_png']) ?>" />

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
			<svg width="57" height="57" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" stroke="#6868ac">
				<g fill="none" fill-rule="evenodd">
					<g transform="translate(1 1)" stroke-width="2">
						<circle cx="5" cy="50" r="5">
							<animate attributeName="cy"
											 begin="0s" dur="2.2s"
											 values="50;5;50;50"
											 calcMode="linear"
											 repeatCount="indefinite" />
							<animate attributeName="cx"
											 begin="0s" dur="2.2s"
											 values="5;27;49;5"
											 calcMode="linear"
											 repeatCount="indefinite" />
						</circle>
						<circle cx="27" cy="5" r="5">
							<animate attributeName="cy"
											 begin="0s" dur="2.2s"
											 from="5" to="5"
											 values="5;50;50;5"
											 calcMode="linear"
											 repeatCount="indefinite" />
							<animate attributeName="cx"
											 begin="0s" dur="2.2s"
											 from="27" to="27"
											 values="27;49;5;27"
											 calcMode="linear"
											 repeatCount="indefinite" />
						</circle>
						<circle cx="49" cy="50" r="5">
							<animate attributeName="cy"
											 begin="0s" dur="2.2s"
											 values="50;50;5;50"
											 calcMode="linear"
											 repeatCount="indefinite" />
							<animate attributeName="cx"
											 from="49" to="49"
											 begin="0s" dur="2.2s"
											 values="49;5;27;49"
											 calcMode="linear"
											 repeatCount="indefinite" />
						</circle>
					</g>
				</g>
			</svg>
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
