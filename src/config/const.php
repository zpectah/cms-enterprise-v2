<?php
require_once PATH_ROOT . 'config/database.php';
require_once PATH_ROOT . 'config/env.php';

$CFG_ENV = json_decode(file_get_contents(PATH_ROOT . 'config/environmental.json'), true);
$CFG_OPTIONS = json_decode(file_get_contents(PATH_ROOT . 'config/options.json'), true);
$CFG_PROJECT = json_decode(file_get_contents(PATH_ROOT . 'config/project.json'), true);
$CFG_LOCALES = json_decode(file_get_contents(PATH_ROOT . 'config/locales.json'), true);
$CFG_STATIC = json_decode(file_get_contents(PATH_ROOT . 'config/static.json'), true);


const ENV =                                               BUILD['env'];
const TIMESTAMP =                                         BUILD['timestamp'];
const PASS_CRYPT =                                        PASSWORD_ARGON2ID;
const PASS_CRYPT_OPTIONS = [
    'memory_cost' =>                                      2048,
    'time_cost' =>                                        4,
    'threads' =>                                          3
];

const SESSION_KEYS = [
    'USER_NAME' => 'USER_NAME',
    'USER_TOKEN' => 'USER_TOKEN',
    'MEMBER_NAME' => 'MEMBER_NAME',
    'MEMBER_TOKEN' => 'MEMBER_TOKEN',
];

define( "CFG_ENV",                                        $CFG_ENV[ ENV ] );
const ROOT =                                              CFG_ENV['root'];

define("PATHS", [
    'ROOT' => ROOT,
    'UPLOADS' => PATH_ROOT . $CFG_PROJECT['global']['path']['uploads'],
    'LOGS' => PATH_ROOT . $CFG_PROJECT['global']['path']['logs'],
    'ASSETS' => PATH_ROOT . $CFG_PROJECT['global']['path']['assets'],
]);
define("LOCATION", [
    'UPLOADS' => '/' . $CFG_PROJECT['global']['path']['uploads'],
    'LOGS' => '/' . $CFG_PROJECT['global']['path']['logs'],
]);
const URL = [
    'USER_LOST_PASSWORD' => ROOT . 'admin/lost-password/token/',
    'MEMBER_LOST_PASSWORD' => ROOT . 'lost-password/token/',
];


define('ADMIN_DOCUMENT', [
    'meta' => [
        'title' => $CFG_PROJECT['admin']['meta']['title'],
        'description' => $CFG_PROJECT['admin']['meta']['description'],
        'keywords' => $CFG_PROJECT['admin']['meta']['keywords'],
        'robots' => $CFG_PROJECT['admin']['meta']['robots'],
        'author' => $CFG_PROJECT['meta']['author'],
        'charset' => $CFG_PROJECT['admin']['meta']['charset'],
        'viewport' => $CFG_PROJECT['admin']['meta']['viewport'],
        'lang' => $CFG_PROJECT['admin']['meta']['lang'],
    ],
    'root' => ROOT,
    'scripts' => CFG_ENV['admin']['scripts'] . '?v=' . TIMESTAMP,
    'no_script_message' => 'Javascript must be allowed to run this app.',
]);

define('WEB_DOCUMENT', [
    'meta' => [
        'title' => $CFG_PROJECT['web']['meta']['title'],
        'description' => $CFG_PROJECT['web']['meta']['description'],
        'keywords' => $CFG_PROJECT['web']['meta']['keywords'],
        'robots' => $CFG_PROJECT['web']['meta']['robots'],
        'author' => $CFG_PROJECT['meta']['author'],
        'charset' => $CFG_PROJECT['web']['meta']['charset'],
        'viewport' => $CFG_PROJECT['web']['meta']['viewport'],
        'lang' => $CFG_PROJECT['web']['meta']['lang'],
    ],
    'root' => ROOT,
    'scripts' => CFG_ENV['web']['scripts'] . '?v=' . TIMESTAMP,
    'styles' => CFG_ENV['web']['styles'] . '?v=' . TIMESTAMP,
    'no_script_message' => 'Javascript must be allowed to run this app.',
]);


