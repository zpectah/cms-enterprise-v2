<?php
require_once PATH_ROOT . 'config/database.php';
require_once PATH_ROOT . 'config/env.php';

$CFG_ENV = json_decode(file_get_contents(PATH_ROOT . 'config/environmental.json'), true);
$CFG_OPTIONS = json_decode(file_get_contents(PATH_ROOT . 'config/options.json'), true);
$CFG_PROJECT = json_decode(file_get_contents(PATH_ROOT . 'config/project.json'), true);
$CFG_LOCALES = json_decode(file_get_contents(PATH_ROOT . 'config/locales.json'), true);

const ENV = BUILD['env'];
const TIMESTAMP = BUILD['timestamp'];
const ENV_DEBUG = BUILD['debug'];
const APP_DEBUG = ENV_DEBUG; // Display tools for development, like web debug bar, etc.
const PASS_CRYPT = PASSWORD_ARGON2ID;
const PASS_CRYPT_OPTIONS = [
    'memory_cost' => 2048,
    'time_cost' => 4,
    'threads' => 3
];
define( "CFG_DB_SQL", $DATABASE[ ENV ]['SQL'] );
define("PROJECT_META", $CFG_PROJECT['meta']);
define("PROJECT_GLOBAL", $CFG_PROJECT['global']);
define("PROJECT_LOCALES", $CFG_LOCALES);
define("PROJECT_ADMIN_TITLE", $CFG_PROJECT['admin']['meta']['title']);
const CFG_DB_CONN = [
    CFG_DB_SQL['server'],
    CFG_DB_SQL['user'],
    CFG_DB_SQL['password'],
    CFG_DB_SQL['name'],
    CFG_DB_SQL['port'],
];
define("CFG_ENV", $CFG_ENV[ENV]);
const ROOT = CFG_ENV['root'];
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
define("UPLOADS", [
    'IMAGE' => [
        'FORMATS' => $CFG_OPTIONS['model']['Uploads']['image']['format'],
    ],
]);
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
        'icon_ico' => $CFG_PROJECT['admin']['meta']['icon']['ico'],
        'icon_png' => $CFG_PROJECT['admin']['meta']['icon']['png'],
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
    'language' => $CFG_PROJECT['web']['language'],
]);
const MESSAGES = [
    'API' => [
        'REQUEST_ERROR' => 'request_error',
        'WRONG_REQUEST' => 'wrong_request',
        'UNAUTHORIZED' => 'unauthorized_request',
        'SUCCESS' => 'request_success',
        'NO_DATA' => 'no_data_found',
        'NO_CREATED' => 'no_data_created',
        'NO_UPDATED' => 'no_data_updated',
    ],
];
const SESSION_USER_NAME_PREFIX = 'cms_enterprise_user';
const SESSION_APP_TOKEN_PREFIX = 'cms_enterprise_app_token';
const SESSION_USER_TOKEN_PREFIX = 'cms_enterprise_user_token';
const SESSION_MEMBER_NAME_PREFIX = 'cms_enterprise_member';
const SESSION_MEMBER_TOKEN_PREFIX = 'cms_enterprise_member_token';
const URL_USER_LOST_PASSWORD_TOKEN = CFG_ENV['root'] . 'admin/lost-password/token/';
const URL_MEMBER_LOST_PASSWORD_TOKEN = CFG_ENV['root'] . 'members-lost-password/token/';
define("WEB_PAGE_ROUTES", [
    'views_root' => PATH_ROOT . $CFG_PROJECT['web']['blade']['root'],
    'views_compiled' => 'compiled',
    'layout' => [
        'minimal' => [
            'key' => 'minimal',
            'template' => 'layout.minimal',
        ],
        'default' => [
            'key' => 'default',
            'template' => 'layout.default',
        ],
    ],
    'page' => [
        'error' => [
            'key' => 'error',
            'path' => null,
            'template' => 'page.error',
        ],
        'default' => [
            'key' => 'default',
            'path' => null,
            'template' => 'page.default',
        ],
        'category' => [
            'key' => 'category',
            'path' => null,
            'template' => 'page.category',
        ],
        'detail' => [
            'key' => 'detail',
            'path' => null,
            'template' => 'page.detail',
        ],
        'home' => [
            'key' => 'home',
            'path' => '/',
            'template' => 'page.home',
        ],
        'search-results' => [
            'key' => 'search-results',
            'path' => 'search-results',
            'template' => 'page.search-results',
        ],
        'members-lost-password' => [
            'key' => 'members-lost-password',
            'path' => 'lost-password',
            'template' => 'page.members-lost-password',
        ],
        'members-profile' => [
            'key' => 'members-profile',
            'path' => 'profile',
            'template' => 'page.members-profile',
        ],
        'members-registration' => [
            'key' => 'members-registration',
            'path' => 'registration',
            'template' => 'page.members-registration',
        ],
    ],
]);
