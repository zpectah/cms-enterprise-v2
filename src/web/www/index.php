<?php
session_start();
header("Content-Type: text/html;charset=utf-8");

const PATH_ROOT = '../../';
require PATH_ROOT . 'core/index.php';

$as = new \core\service\AuthService;
$view = new \core\module\web\View;

$token = $as -> start_app_session();
$meta = $view -> get_meta();
$bs_token = 'sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p';
?>
<!doctype html>
<html lang="<?=($meta['lang']) ?>">
<head>
	<meta charset="<?=(WEB_DOCUMENT['meta']['charset']) ?>" />
	<meta name="viewport" content="<?=(WEB_DOCUMENT['meta']['viewport']) ?>" />
	<title><?=($meta['title']) ?></title>
	<meta name="description" content="<?=($meta['description']) ?>" />
	<meta name="keywords" content="<?=($meta['keywords']) ?>" />
	<meta name="robots" content="<?=($meta['robots']) ?>" />
	<meta name="og:url" content="<?=($meta['url']) ?>" />

	<link rel="manifest" href="./manifest.json" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" />
	<link href="<?= (WEB_DOCUMENT['styles']) ?>" rel="stylesheet" />

	<script>
		window.APP_ENV = window.APP_ENV || '<?=(ENV)?>';
		window.APP_TIMESTAMP = window.APP_TIMESTAMP || '<?=(TIMESTAMP)?>';
		window.APP_TOKEN = window.APP_TOKEN || '<?=($token)?>';
		window.APP_LANG = window.APP_LANG || '<?=($meta['lang'])?>';
		window.MEMBER_TOKEN = window.MEMBER_TOKEN || '<?=($as -> get_member_token())?>';
	</script>
</head>
<body
	id="page"
	class="page"
>
	<div
		id="vue-scope"
		class="page-scope"
	>
			<?php $view -> render() ?>
	</div>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="<?=($bs_token)?>" crossorigin="anonymous"></script>
	<script src="<?= (WEB_DOCUMENT['scripts']) ?>"></script>
</body>
</html>