<?php

namespace app;

use app\controller\MemberController;
use app\controller\RouteController;
use app\controller\ViewController;
use eftec\bladeone\BladeOne;

class View {

    static array $o = [
        'layout' => [
            'minimal' =>                                                            'layout.minimal',
            'default' =>                                                            'layout.default',
        ],
        'page' => [
            'error' =>                                                              'page.error',
            'home' =>                                                               'page.home',
            'default' =>                                                            'page.default',
            'category' =>                                                           'page.category',
            'search-results' =>                                                     'page.search-results',
            'detail' =>                                                             'page.detail',
            'members-lost-password' =>                                              'page.members-lost-password',
            'members-profile' =>                                                    'page.members-profile',
            'members-registration' =>                                               'page.members-registration',
        ],
    ];

    function __construct () {
        $this -> $blade = new BladeOne(
            TEMPLATE_ROOT_PATH,
            "compiled"
        );
    }

    private function get_language_link_path ($path) {
        $rc = new RouteController;
        $vc = new ViewController;
        $language = $vc -> get_language();
        $urlParams = $rc -> get_url_params();

        return $urlParams['lang'] ? $path . '?' . $language['url_param'] : $path;
    }
    private function get_category_context ($category, $detail): array {
        $context = [
            'prev' => null,
            'index' => null,
            'next' => null,
        ];
        if ($category['items']) {
            $index = array_search($detail['detail'], $category['items']);
            $context['index'] = $index;
            if($index > 0 ) $context['prev'] = $category['items'][ $index -1 ];
            if($index < count($category['items']) -1 ) $context['next'] = $category['items'][ $index +1 ];
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
            'template' => self::$o['page']['error'],
            'layout' => self::$o['layout']['minimal'],
        ];
        $urlAttrs = $rc -> get_url_attrs();
        $pageName = $urlAttrs['page'];
        $page = $vc -> get_page($pageName);
        $members = $vc -> get_members_settings();

        if (!$pageName) {
            // Page: home
            $data['type'] = 'static';
            $data['name'] = 'home';
            $data['template'] = self::$o['page']['home'];
            $data['layout'] = self::$o['layout']['default'];
        } else if (array_key_exists($pageName, self::$o['page'])) {
            // Page: static
            $data['type'] = 'static';
            $data['name'] = $pageName;
            $data['template'] = self::$o['page'][$pageName];
            $data['layout'] = self::$o['layout']['default'];
            // Reset stats when Members are not activated
            if (
                (strpos($pageName, 'members') && !GLOBAL_MEMBERS_ACTIVE)
                || ($pageName == 'members-lost-password' && !$members['members_lostPassword_active'])
                || ($pageName == 'members-profile' && !$members['members_profile_active'])
                || ($pageName == 'members-registration' && !$members['members_register_active'])
            ) {
                $data['type'] = 'unknown';
                $data['name'] = 'error';
                $data['template'] = self::$o['page']['error'];
                $data['layout'] = self::$o['layout']['minimal'];
            }
        } else if ($page['page']) {
            // Page: generic
            $data['page'] = $page;
            $data['type'] = 'generic';
            $data['name'] = $pageName;
            $data['template'] = self::$o['page'][$page['page']['type']];
            $data['layout'] = self::$o['layout']['default'];
            if ($page['model'] && $urlAttrs['detail']) {
                $data['template'] = self::$o['page']['detail'];
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
        $language = $vc -> get_language();
        $urlParams = $rc -> get_url_params();
        $search = $urlParams['search'];

        if ($search) $results = $vc -> get_search_results($search, $language['current']);

        return $results;
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
        $category_context = self::get_category_context($page['page']['category'], $detail);
        $member_options = array_merge(
            $members,
            [
                'active' => GLOBAL_MEMBERS_ACTIVE,
            ],
            $vc -> get_member_options(
                $urlAttrs['listed'],
                $urlAttrs['page'] == 'members-lost-password',
            ),
        );
        $member = $mc -> get_member();
        $public = [
            'home_link' => self::get_language_link_path('/'),
            'search_action_link' => self::get_language_link_path('/search-results'),
            'members_registration_link' => self::get_language_link_path('/members-registration'),
            'members_lostPassword_link' => self::get_language_link_path('/members-lost-password'),
            'members_profile_link' => self::get_language_link_path('/members-profile'),
            'project' => [
                'copyright_year' => 2022,
                'meta' => PROJECT_META,
                'global' => PROJECT_GLOBAL,
            ],
        ];

        echo $this -> $blade -> run(
            $page['layout'],
            [
                '_page' => $page['page']['page']['lang'][$language['current']],
                '_category' => $page['page']['category']['data']['lang'][$language['current']],
                '_detail' => $detail['detail']['lang'][$language['current']],
                'page' => $page,
                'detail' => $detail,
                'category_context' => $category_context,
                'search_results' => $search_results,
                'route' => [
                    'attrs' => $urlAttrs,
                    'params' => $urlParams,
                    'root' => $_SERVER['REDIRECT_URL'],
                ],
                'language' => $language,
                'lang' => $language['current'],
                'translations' => $translations,
                'menu' => $menu,
                'company' => $company,
                'public' => array_merge($public, $web),
                'members_options' => $member_options,
                'member' => $member,
                't' => function ($key) { return self::get_t($key); },
                'menuLink' => function ($linkObject) { return self::get_menu_link($linkObject); },
                'languageLink' => function ($path) { return self::get_language_link_path($path); },
                'get_posts' => function ($props) { return self::get_posts($props); },
            ]
        );
    }

}