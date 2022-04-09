<?php
const PATH_ROOT = '../../';
require PATH_ROOT . 'core/index.php';
require PATH_ROOT . 'web/app/index.php';

$as = new \core\service\AuthService;
$view = new \app\View;

$token = $as -> start_app_session();
$meta = $view -> get_meta();
?>
<!doctype html>
<html lang="<?= (WEB_DOCUMENT['meta']['lang']) ?>">
<head>
	<meta charset="<?= (WEB_DOCUMENT['meta']['charset']) ?>">
	<meta name="viewport" content="<?= (WEB_DOCUMENT['meta']['viewport']) ?>">
	<title><?=($meta['title']) ?></title>
	<meta name="description" content="<?=($meta['description']) ?>">
	<meta name="keywords" content="<?=($meta['keywords']) ?>">
	<meta name="robots" content="<?=($meta['robots']) ?>">
	<meta name="og:url" content="<?=($meta['url']) ?>">

	<link href="<?= (WEB_DOCUMENT['styles']) ?>" rel="stylesheet">

	<script>
		window.APP_ENV = window.APP_ENV || '<?=(ENV)?>';
		window.APP_TIMESTAMP = window.APP_TIMESTAMP || '<?=(TIMESTAMP)?>';
		window.APP_TOKEN = window.APP_TOKEN || '<?=($token)?>';
		window.MEMBER_TOKEN = window.MEMBER_TOKEN || '<?=($as -> get_member_token())?>';
	</script>
</head>
<body
	id="page"
	class="page"
>
<?php $view -> render() ?>
<script src="<?= (WEB_DOCUMENT['scripts']) ?>"></script>
</body>
</html>