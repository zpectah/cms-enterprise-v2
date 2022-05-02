<?php

namespace core\module\web;

use core\common\Helpers;
use core\module\web\controller\MemberController;
use core\module\web\controller\RouteController;
use core\module\web\controller\ViewController;
use eftec\bladeone\BladeOne;

class View {

    private function get_uploads_path ($name, $type = 'image', $size = 'original'): string {
        $helpers = new Helpers;
        $path = $helpers -> get_key(LOCATION, 'UPLOADS') . '/' . $type . '/';
        if ($size !== 'original') $path .= $size . '/';

        return $path . $name;
    }
    private function get_language_link_path ($path) {
        $rc = new RouteController;
        $vc = new ViewController;
        $helpers = new Helpers;
        $language = $vc -> get_language();
        $urlParams = $rc -> get_url_params();
        $urlLangParams = $helpers -> get_key($language, 'url_param');
        $urlLang = $helpers -> get_key($urlParams, 'lang');

        return $urlLang ? $path . '?' . $urlLangParams : $path;
    }
    private function get_category_context ($pageName, $category, $detail): array {
        $helpers = new Helpers;
        $context = [
            'prev' => null,
            'index' => -1,
            'next' => null,
            'count' => null,
            'path_prefix' => null,
        ];
        if (isset($category['items'])) {
            $category_items = $helpers -> get_key($category, 'items');
            $index = array_search($helpers -> get_key($detail, 'detail'), $category_items);
            $context['index'] = $index;
            $context['count'] = count($category_items);
            $context['path_prefix'] = '/' . $pageName;
            $prev_item = $helpers -> get_key($category_items, [ $index -1 ]);
            $next_item = $helpers -> get_key($category_items, [ $index +1 ]);
            if($index && $index > 0 ) $context['prev'] = isset($prev_item['active']) ? $prev_item : null;
            if($index !== false && ($index < count($category_items) -1)) $context['next'] = isset($next_item['active']) ? $next_item : null;
        }

        return $context;
    }
    private function get_detail_data ($pageModel): array {
        $rc = new RouteController;
        $vc = new ViewController;
        $helpers = new Helpers;
        $data = [
            'model' => 'unknown',
            'detail' => null,
        ];
        $urlAttrs = $rc -> get_url_attrs();
        $model = null;
        $id = $helpers -> get_key($urlAttrs, 'id');
        $context = $helpers -> get_key($urlAttrs, 'context');

        if ($context == 'detail') {
            $model = $helpers -> get_key($urlAttrs, 'model');
        } else if ($context == 'category') {
            $model = $pageModel;
        }

        $detail = $vc -> get_detail($model, $id);

        if ($detail) {
            $data['detail'] = $detail;
            $data['model'] = $model;
        }

        return $data;
    }
    private function get_page_data (): array {
        $rc = new RouteController;
        $vc = new ViewController;
        $helpers = new Helpers;
        $data = [
            'page' => null,
            'type' => 'unknown',
            'name' => 'error',
            'template' => $helpers -> get_key(WEB_PAGE_ROUTES, 'page->error->template'),
            'layout' => $helpers -> get_key(WEB_PAGE_ROUTES, 'layout->minimal->template'),
        ];
        $urlAttrs = $rc -> get_url_attrs();
        $pageName = $helpers -> get_key($urlAttrs, 'page');
        $page = $vc -> get_page($pageName);
        $members = $vc -> get_members_settings();
        $pageType = $helpers -> get_key($page, 'page->type');

        $membersEnabled = isset($members['members_enabled']) ?? $members['members_enabled'];
        $membersLostPasswordActive = isset($members['members_lostPassword_active']) ?? $members['members_lostPassword_active'];
        $membersProfileActive = isset($members['members_profile_active']) ?? $members['members_profile_active'];
        $membersRegisterActive = isset($members['members_register_active']) ?? $members['members_register_active'];

        if (!$pageName) {
            // Page: home
            $data['type'] = 'static';
            $data['name'] = 'home';
            $data['template'] = $helpers -> get_key(WEB_PAGE_ROUTES, 'page->home->template');
            $data['layout'] = $helpers -> get_key(WEB_PAGE_ROUTES, 'layout->default->template');
        } else if (array_key_exists($pageName, $helpers -> get_key(WEB_PAGE_ROUTES, 'page'))) {
            // Page: static
            $data['type'] = 'static';
            $data['name'] = $pageName;
            $data['template'] = $helpers -> get_key(WEB_PAGE_ROUTES, 'page->' . $pageName . '->template');
            $data['layout'] = $helpers -> get_key(WEB_PAGE_ROUTES, 'layout->default->template');
            // Reset stats when Members are not activated
            if (
                (strpos($pageName, 'members') && !$membersEnabled)
                || ($pageName == 'lost-password' && !$membersLostPasswordActive)
                || ($pageName == 'profile' && !$membersProfileActive)
                || ($pageName == 'registration' && !$membersRegisterActive)
            ) {
                $data['type'] = 'unknown';
                $data['name'] = 'error';
                $data['template'] = $helpers -> get_key(WEB_PAGE_ROUTES, 'page->error->template');
                $data['layout'] = $helpers -> get_key(WEB_PAGE_ROUTES, 'layout->minimal->template');
            }
        } else if (isset($page['page'])) {
            // Page: generic
            $data['page'] = $page;
            $data['type'] = 'generic';
            $data['name'] = $pageName;
            $data['template'] = $helpers -> get_key(WEB_PAGE_ROUTES, 'page->' . $pageType . '->template');
            $data['layout'] = $helpers -> get_key(WEB_PAGE_ROUTES, 'layout->default->template');
            $m = $helpers -> get_key($page, 'model');
            $d = $helpers -> get_key($urlAttrs, 'detail');
            if ($m && $d) {
                $data['template'] = $helpers -> get_key(WEB_PAGE_ROUTES, 'page->detail->template');
            }
        }

        return $data;
    }
    private function get_t ($key): string {
        $vc = new ViewController;
        $translations = $vc -> get_translations();
        $value = $key;
        if (isset($translations[$key])) $value = $translations[$key];

        return $value;
    }
    private function get_menu_link ($linkObject): array {
        $vc = new ViewController;
        $rc = new RouteController;
        $helpers = new Helpers;
        $language = $vc -> get_language();
        $lang = $helpers -> get_key($language, 'current');
        $urlAttrs = $rc -> get_url_attrs();
        $path = null;
        $target = null;
        $selected = false;

        switch ($helpers -> get_key($linkObject, 'type')) {

            case 'external':
                $target = '_blank';
                $path = $helpers -> get_key($linkObject, 'path_url');
                break;

            case 'internal':
                $target = '_self';
                $path = $helpers -> get_key($linkObject, 'path_url');
                $url = $helpers -> get_key($urlAttrs, 'url');
                if ('web/www' . $path == $url || ($path !== '/' && strpos($url, $path) !== false )) $selected = true;
                $path = self::get_language_link_path($path);
                break;

            case 'page':
                $page_id = $helpers -> get_key($linkObject, 'page_id');
                $page = $vc -> get_menu_item_page($page_id);
                $target = '_self';
                $path = '/' . $helpers -> get_key($page, 'name');
                $url = $helpers -> get_key($urlAttrs, 'url');
                if ('web/www' . $path == $url) $selected = true;
                $path = self::get_language_link_path($path);
                break;

        }

        return [
            'path' => $path,
            'label' => $helpers -> get_key($linkObject, 'lang->' . $lang . '->label'),
            'selected' => $selected,
            'target' => $target,
        ];
    }
    private function get_search_results (): array {
        $vc = new ViewController;
        $rc = new RouteController;
        $helpers = new Helpers;
        $results = [];
        $count = 0;
        $language = $vc -> get_language();
        $urlParams = $rc -> get_url_params();
        $lang = $helpers -> get_key($language, 'current');
        $search = $helpers -> get_key($urlParams, 'search');

        if ($search) {
            $results = $vc -> get_search_results($search, $lang);
            $count = count($results);
        }

        return [
            'results' => $results,
            'count' => $count,
        ];
    }
    private function get_posts ($props): array {
        $vc = new ViewController;

        return $vc -> get_posts_list($props);
    }

    public function get_meta (): array {
        $vc = new ViewController;
        $helpers = new Helpers;
        $web = $vc -> get_web_settings();
        $language = $vc -> get_language();
        $lang = $helpers -> get_key($language, 'current');
        $page = self::get_page_data();
        $detail = self::get_detail_data($helpers -> get_key($page, 'page->model'));
        $meta = [
            'title' => $helpers -> get_key($web, 'web_meta_title') ?? $helpers -> get_key(WEB_DOCUMENT, 'meta->title'),
            'description' => $helpers -> get_key($web, 'web_meta_description') ?? $helpers -> get_key(WEB_DOCUMENT, 'meta->description'),
            'keywords' => $helpers -> get_key($web, 'web_meta_keywords') ? implode(",", $web['web_meta_keywords']) : $helpers -> get_key(WEB_DOCUMENT, 'meta->keywords'),
            'robots' => $helpers -> get_key($web, 'web_meta_robots') ?? $helpers -> get_key(WEB_DOCUMENT, 'meta->robots'),
            'url' => $helpers -> get_key(WEB_DOCUMENT, 'root'),
            'lang' => $lang,
        ];

        switch ($helpers -> get_key($page, 'type')) {

            case 'generic':
                if ($helpers -> get_key($page, 'page->page')) {
                    $meta['title'] = $helpers -> get_key($page, 'page->page->lang->' . $lang . '->title') . ' | ' . $helpers -> get_key($meta, 'title');
                    $desc = $helpers -> get_key($page, 'page->page->lang->' . $lang . '->description');
                    $robots = $helpers -> get_key($page, 'page->page->meta_robots');
                    if ($desc !== '') {
                        $meta['description'] = $desc;
                    }
                    if ($robots !== 'inherit') {
                        $meta['robots'] = $robots;
                    }
                }
                break;

            case 'static':
                if ($helpers -> get_key($page, 'name') !== 'home') {
                    $meta['title'] = self::get_t('page:' . $helpers -> get_key($page, 'name') . '.title') . ' | ' . $helpers -> get_key($meta, 'title');
                }
                break;

        }

        if ($helpers -> get_key($detail, 'detail')) {
            $meta['title'] = $helpers -> get_key($detail, 'detail->lang->' . $lang . '->title') . ' | ' . $helpers -> get_key($meta, 'title');
            $meta['description'] = substr($helpers -> get_key($detail, 'detail->lang->' . $lang . '->description'),0,200);
        }

        return $meta;
    }

    public function render (): void {
        $helpers = new Helpers;
        $blade = new BladeOne(
            $helpers -> get_key(WEB_PAGE_ROUTES, 'views_root'),
            $helpers -> get_key(WEB_PAGE_ROUTES, 'views_compiled'),
        );
        $rc = new RouteController;
        $vc = new ViewController;
        $mc = new MemberController;
        $language = $vc -> get_language();
        $urlAttrs = $rc -> get_url_attrs();
        $urlParams = $rc -> get_url_params();
        $translations = $vc -> get_translations();
        $menu = $vc -> get_menu();
        $company = $vc -> get_company_settings();
        $members = $vc -> get_members_settings();
        $web = $vc -> get_web_settings();
        $page = self::get_page_data();
        $search_results = self::get_search_results();
        $detail = self::get_detail_data($helpers -> get_key($page, 'page->model'));
        $member = $mc -> get_member();
        $category_context = self::get_category_context(
            $helpers -> get_key($page, 'page->page->name'),
            $helpers -> get_key($page, 'page->category'),
            $detail,
        );
        $lang = $helpers -> get_key($language, 'current');
        $members_options = array_merge(
            $members,
            $vc -> get_members_options(
                isset($urlAttrs['listed']) ?? $urlAttrs['listed'],
                $urlAttrs['page'] == $helpers -> get_key(WEB_PAGE_ROUTES, 'page->lost-password->key'),
            ),
        );
        $route = [
            'attrs' => $urlAttrs,
            'params' => $urlParams,
            'root' => isset($_SERVER['REDIRECT_URL']) ?? $_SERVER['REDIRECT_URL'],
        ];
        $public = array_merge(
            [
                'links' => [
                    'home' => self::get_language_link_path('/'),
                    'action_search' => self::get_language_link_path('/' . $helpers -> get_key(WEB_PAGE_ROUTES, 'page->search-results->key')),
                    'registration' => self::get_language_link_path('/' . $helpers -> get_key(WEB_PAGE_ROUTES, 'page->registration->key')),
                    'lostPassword' => self::get_language_link_path('/' . $helpers -> get_key(WEB_PAGE_ROUTES, 'page->lost-password->key')),
                    'profile' => self::get_language_link_path('/' . $helpers -> get_key(WEB_PAGE_ROUTES, 'page->profile->key')),
                ],
                'project' => [
                    'copyright_year' => 2022,
                    'meta' => PROJECT_META,
                    'global' => PROJECT_GLOBAL,
                ],
            ],
            $web,
        );
        $custom_data = [
            // TODO #menu
            'header_menu' => $helpers -> get_key($menu, 'primary->main-menu'),
            'sidebar_links' => $helpers -> get_key($menu, 'custom->sidebar-links'),
            // TODO #category #posts
            'homepage_posts' => [
                'category_id' => 1,
                'limit' => 5,
            ],
            'sidebar_posts' => [
                'tag_id' => 3,
                'limit' => 3,
            ],
        ];

        echo $blade -> run(
            $helpers -> get_key($page, 'layout'),
            [
                // Translated data objects
                '_page' => $helpers -> get_key($page, 'page->page->lang->' . $lang),
                '_category' => $helpers -> get_key($page, 'page->category->data->lang->' . $lang),
                '_detail' => $helpers -> get_key($detail, 'detail->lang->' . $lang),
                // Page data
                'page' => $page,
                'detail' => $detail,
                'category_context' => $category_context,
                'search_results' => $search_results,
                'route' => $route,
                'language' => $language,
                'lang' => $lang,
                'translations' => $translations,
                'menu' => $menu,
                'company' => $company,
                'public' => $public,
                'members_options' => $members_options,
                'member' => $member,
                'custom_data' => $custom_data,
                // Functions
                't' => function ($key) { return self::get_t($key); },
                'k' => function ($var, $keys, $value = null) use ($helpers) { return $helpers -> get_key($var, $keys, $value); },
                'menuLink' => function ($linkObject) { return self::get_menu_link($linkObject); },
                'languageLink' => function ($path) { return self::get_language_link_path($path); },
                'uploadPath' => function ($name, $type = 'image', $size = 'original') { return self::get_uploads_path($name, $type, $size); },
                'getPosts' => function ($props) { return self::get_posts($props); },
                'formatDate' => function ($date) use ($language, $helpers) { $d = date_create($date); return date_format($d, $helpers -> get_key($language, 'locale->format->date_alt')); },
                'formatTime' => function ($date) use ($language, $helpers) { $d = date_create($date); return date_format($d, $helpers -> get_key($language, 'locale->format->time_alt')); },
                'formatDateTime' => function ($date) use ($language, $helpers) { $d = date_create($date); return date_format($d, $helpers -> get_key($language, 'locale->format->datetime_alt')); },
            ]
        );
    }

}