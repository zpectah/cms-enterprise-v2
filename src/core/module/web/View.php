<?php

namespace core\module\web;

use core\module\web\controller\MemberController;
use core\module\web\controller\RouteController;
use core\module\web\controller\ViewController;
use eftec\bladeone\BladeOne;

class View {

    function __construct () {
        $this -> $blade = new BladeOne(
            WEB_PAGE_ROUTES['views_root'],
            WEB_PAGE_ROUTES['views_compiled']
        );
    }

    private function get_uploads_path ($name, $type = 'image', $size = 'original'): string {
        $path = LOCATION['UPLOADS'] . '/' . $type . '/';
        if ($size !== 'original') $path .= $size . '/';

        return $path . $name;
    }
    private function get_language_link_path ($path) {
        $rc = new RouteController;
        $vc = new ViewController;
        $language = $vc -> get_language();
        $urlParams = $rc -> get_url_params();

        return $urlParams['lang'] ? $path . '?' . $language['url_param'] : $path;
    }
    private function get_category_context ($pageName, $category, $detail): array {
        $context = [
            'prev' => null,
            'index' => null,
            'next' => null,
            'count' => null,
            'path_prefix' => null,
        ];
        if ($category['items']) {
            $index = array_search($detail['detail'], $category['items']);
            $context['index'] = $index;
            $context['count'] = count($category['items']);
            $context['path_prefix'] = '/' . $pageName . '/';
            if($index && $index > 0 ) $context['prev'] = $category['items'][ $index -1 ];
            if($index && $index < count($category['items']) -1 ) $context['next'] = $category['items'][ $index +1 ];
        }

        return $context;
    }
    private function get_detail_data ($pageModel): array {
        $rc = new RouteController;
        $vc = new ViewController;
        $data = [
            'model' => 'unknown',
            'detail' => null,
        ];
        $urlAttrs = $rc -> get_url_attrs();
        $model = null;
        $id = $urlAttrs['id'];

        if ($urlAttrs['context'] == 'detail') {
            $model = $urlAttrs['model'];
        } else if ($urlAttrs['context'] == 'category') {
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
        $data = [
            'page' => null,
            'type' => 'unknown',
            'name' => 'error',
            'template' => WEB_PAGE_ROUTES['page']['error']['template'],
            'layout' => WEB_PAGE_ROUTES['layout']['minimal']['template'],
        ];
        $urlAttrs = $rc -> get_url_attrs();
        $pageName = $urlAttrs['page'];
        $page = $vc -> get_page($pageName);
        $members = $vc -> get_members_settings();

        if (!$pageName) {
            // Page: home
            $data['type'] = 'static';
            $data['name'] = 'home';
            $data['template'] = WEB_PAGE_ROUTES['page']['home']['template'];
            $data['layout'] = WEB_PAGE_ROUTES['layout']['default']['template'];
        } else if (array_key_exists($pageName, WEB_PAGE_ROUTES['page'])) {
            // Page: static
            $data['type'] = 'static';
            $data['name'] = $pageName;
            $data['template'] = WEB_PAGE_ROUTES['page'][$pageName]['template'];
            $data['layout'] = WEB_PAGE_ROUTES['layout']['default']['template'];
            // Reset stats when Members are not activated
            if (
                (strpos($pageName, 'members') && !$members['members_enabled'])
                || ($pageName == 'lost-password' && !$members['members_lostPassword_active'])
                || ($pageName == 'profile' && !$members['members_profile_active'])
                || ($pageName == 'registration' && !$members['members_register_active'])
            ) {
                $data['type'] = 'unknown';
                $data['name'] = 'error';
                $data['template'] = WEB_PAGE_ROUTES['page']['error']['template'];
                $data['layout'] = WEB_PAGE_ROUTES['layout']['minimal']['template'];
            }
        } else if ($page['page']) {
            // Page: generic
            $data['page'] = $page;
            $data['type'] = 'generic';
            $data['name'] = $pageName;
            $data['template'] = WEB_PAGE_ROUTES['page'][$page['page']['type']]['template'];
            $data['layout'] = WEB_PAGE_ROUTES['layout']['default']['template'];
            if ($page['model'] && $urlAttrs['detail']) {
                $data['template'] = WEB_PAGE_ROUTES['page']['detail']['template'];
            }
        }

        return $data;
    }
    private function get_t ($key): string {
        $vc = new ViewController;
        $translations = $vc -> get_translations();
        $value = $key;
        if ($translations[$key]) $value = $translations[$key];

        return $value;
    }
    private function get_menu_link ($linkObject): array {
        $vc = new ViewController;
        $rc = new RouteController;
        $language = $vc -> get_language();
        $lang = $language['current'];
        $urlParams = $rc -> get_url_params();
        $urlAttrs = $rc -> get_url_attrs();
        $path = null;
        $target = null;
        $selected = false;

        switch ($linkObject['type']) {

            case 'external':
                $target = '_blank';
                $path = $linkObject['path_url'];
                break;

            case 'internal':
                $target = '_self';
                $path = $linkObject['path_url'];
                if ($urlParams['lang']) $path .= '?' . $language['url_param'];
                break;

            case 'page':
                $page = $vc -> get_menu_item_page($linkObject['page_id']);
                $target = '_self';
                $path = '/' . $page['name'];
                if ($urlParams['lang']) $path .= '?' . $language['url_param'];
                if ('web/www' . $path == $urlAttrs['url']) $selected = true;
                break;

        }

        return [
            'path' => $path,
            'label' => $linkObject['lang'][$lang]['label'],
            'selected' => $selected,
            'target' => $target,
        ];
    }
    private function get_search_results (): array {
        $vc = new ViewController;
        $rc = new RouteController;
        $results = [];
        $count = 0;
        $language = $vc -> get_language();
        $urlParams = $rc -> get_url_params();
        $search = $urlParams['search'];

        if ($search) {
            $results = $vc -> get_search_results($search, $language['current']);
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
        $web = $vc -> get_web_settings();
        $language = $vc -> get_language();
        $lang = $language['current'];
        $page = self::get_page_data();
        $detail = self::get_detail_data($page['page']['model']);
        $meta = [
            'title' => $web['web_meta_title'] ?? WEB_DOCUMENT['meta']['title'],
            'description' => $web['web_meta_description'] ?? WEB_DOCUMENT['meta']['description'],
            'keywords' => $web['web_meta_keywords'] ? implode(",", $web['web_meta_keywords']) : WEB_DOCUMENT['meta']['keywords'],
            'robots' => $web['web_meta_robots'] ?? WEB_DOCUMENT['meta']['robots'],
            'url' => WEB_DOCUMENT['root'],
            'lang' => $lang,
        ];

        switch ($page['type']) {

            case 'generic':
                if ($page['page']['page']) {
                    $meta['title'] = $page['page']['page']['lang'][$lang]['title'] . ' | ' . $meta['title'];
                    if ($page['page']['page']['lang'][$lang]['description'] !== '') {
                        $meta['description'] = $page['page']['page']['lang'][$lang]['description'];
                    }
                    if ($page['page']['page']['meta_robots'] !== 'inherit') {
                        $meta['robots'] = $page['page']['page']['meta_robots'];
                    }
                }
                break;

            case 'static':
                if ($page['name'] !== 'home') {
                    $meta['title'] = self::get_t('page:' . $page['name'] . '.title') . ' | ' . $meta['title'];
                }
                break;

        }

        if ($detail['detail']) {
            $meta['title'] = $detail['detail']['lang'][$lang]['title'] . ' | ' . $meta['title'];
            $meta['description'] = substr($detail['detail']['lang'][$lang]['description'],0,200);
        }

        return $meta;
    }

    public function render (): void {
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
        $detail = self::get_detail_data($page['page']['model']);
        $member = $mc -> get_member();
        $category_context = self::get_category_context(
            $page['page']['page']['name'],
            $page['page']['category'],
            $detail,
        );
        $members_options = array_merge(
            $members,
            $vc -> get_members_options(
                $urlAttrs['listed'],
                $urlAttrs['page'] == WEB_PAGE_ROUTES['page']['lost-password']['key'],
            ),
        );
        $route = [
            'attrs' => $urlAttrs,
            'params' => $urlParams,
            'root' => $_SERVER['REDIRECT_URL'],
        ];
        $public = array_merge(
            [
                'links' => [
                    'home' => self::get_language_link_path('/'),
                    'action_search' => self::get_language_link_path('/' . WEB_PAGE_ROUTES['page']['search-results']['key']),
                    'registration' => self::get_language_link_path('/' . WEB_PAGE_ROUTES['page']['registration']['key']),
                    'lostPassword' => self::get_language_link_path('/' . WEB_PAGE_ROUTES['page']['lost-password']['key']),
                    'profile' => self::get_language_link_path('/' . WEB_PAGE_ROUTES['page']['profile']['key']),
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
            'header_menu' => $menu['primary']['main-menu'],
            'sidebar_links' => $menu['custom']['sidebar-links'],
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

        echo $this -> $blade -> run(
            $page['layout'],
            [
                // Translated data objects
                '_page' => $page['page']['page']['lang'][$language['current']],
                '_category' => $page['page']['category']['data']['lang'][$language['current']],
                '_detail' => $detail['detail']['lang'][$language['current']],
                // Page data
                'page' => $page,
                'detail' => $detail,
                'category_context' => $category_context,
                'search_results' => $search_results,
                'route' => $route,
                'language' => $language,
                'lang' => $language['current'],
                'translations' => $translations,
                'menu' => $menu,
                'company' => $company,
                'public' => $public,
                'members_options' => $members_options,
                'member' => $member,
                'custom_data' => $custom_data,
                // Functions
                't' => function ($key) { return self::get_t($key); },
                'menuLink' => function ($linkObject) { return self::get_menu_link($linkObject); },
                'languageLink' => function ($path) { return self::get_language_link_path($path); },
                'uploadPath' => function ($name, $type = 'image', $size = 'original') { return self::get_uploads_path($name, $type, $size); },
                'getPosts' => function ($props) { return self::get_posts($props); },
                'formatDate' => function ($date) use ($language) { $d = date_create($date); return date_format($d, $language['locale']['format']['date_alt']); },
                'formatTime' => function ($date) use ($language) { $d = date_create($date); return date_format($d, $language['locale']['format']['time_alt']); },
                'formatDateTime' => function ($date) use ($language) { $d = date_create($date); return date_format($d, $language['locale']['format']['datetime_alt']); },
            ]
        );
    }

}