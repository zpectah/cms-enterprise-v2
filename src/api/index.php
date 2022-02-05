<?php

header("Access-Control-Allow-Headers: content-type, origin, accept, X-User-Token, X-App-Token");
header("Content-Type: multipart/form-data");

const PATH_ROOT = '../';
require PATH_ROOT . 'core/index.php';

$api = new \core\provider\ApiProvider;

print_r( json_encode( $api -> get_response(), JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) );
