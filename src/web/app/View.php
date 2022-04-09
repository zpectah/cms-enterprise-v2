<?php

namespace app;

use app\controller\MemberController;
use app\controller\RouteController;
use app\controller\ViewController;
use eftec\bladeone\BladeOne;

class View {

    static array $o = [
        'layout' => [
            'minimal' => 'layout.minimal',
            'default' => 'layout.default',
        ],
        'page' => [
            'error' => 'page.error',
            'home' => 'page.home',
            'default' => 'page.default', // Default for generic pages
            'category' => 'page.category',
            'search-results' => 'page.search-results',
            'detail' => 'page.detail',
            'members-lostPassword' => 'page.members-lost-password',
            'members-profile' => 'page.members-profile',
            'members-registration' => 'page.members-registration',
        ],
    ];

    function __construct () {
        $this -> $blade = new BladeOne(
            TEMPLATE_ROOT_PATH,
            "compiled"
        );
    }



    private function get_detail_data ($lang, $pageModel): array {
        $rc = new RouteController;
        $vc = new ViewController;
        $data = [
            'detail_raw' => null,
            'detail' => null,
            'model' => 'unknown',
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
            $data['detail_raw'] = $detail;
            $data['detail'] = $detail['lang'][$lang];
            $data['model'] = $model;
        }

        return $data;
    }

    private function get_page_data ($lang): array {
        $rc = new RouteController;
        $vc = new ViewController;
        $data = [
            'page_raw' => null,                                                       // Raw database data
            'page' => null,                                                           // Translated page data (title, description, content)
            'type' => 'unknown',                                                      // Page type (unknown, static, generic)
            'name' => 'error',                                                        // Route name
            'template' => self::$o['page']['error'],                                  // Page template
            'layout' => self::$o['layout']['minimal'],                                // Layout template
            'category' => null,
        ];
        $urlAttrs = $rc -> get_url_attrs();
        $pageName = $urlAttrs['page'];
        $page = $vc -> get_page($pageName);

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
        } else if ($page['page']) {
            // Page: generic
            $data['page_raw'] = $page;
            $data['page'] = $page['page']['lang'][$lang];
            $data['type'] = 'generic';
            $data['name'] = $pageName;
            $data['template'] = self::$o['page'][$page['page']['type']];
            $data['layout'] = self::$o['layout']['default'];
            if ($page['model'] && $urlAttrs['detail']) {
                $data['template'] = self::$o['page']['detail'];
            }
            if ($page['page']['category']['data'] && $urlAttrs['context'] == 'category') {
                $data['category'] = $page['page']['category']['data']['lang'][$lang];
            }
        }

        return $data;
    }


    public function get_meta (): array {
        $vc = new ViewController;
        $cms = $vc -> get_web();
        $meta = [
            'title' => $cms['web_meta_title'] ?? WEB_DOCUMENT['meta']['title'],
            'description' => $cms['web_meta_description'] ?? WEB_DOCUMENT['meta']['description'],
            'keywords' => $cms['web_meta_keywords'] ? implode(",", $cms['web_meta_keywords']) : WEB_DOCUMENT['meta']['keywords'],
            'robots' => $cms['web_meta_robots'] ?? WEB_DOCUMENT['meta']['robots'],
            'url' => WEB_DOCUMENT['root'],
        ];
        $language = $vc -> get_language();
        $page = $this -> get_page_data($language['current']);
        $detail = $this -> get_detail_data(
            $language['current'],
            $page['page_raw']['model'],
        );

        switch ($page['type']) {

            case 'generic':
                if ($page['page_raw'] && $page['page']) {
                    $meta['title'] = $page['page']['title'] . ' | ' . $meta['title'];
                    if ($page['page']['description'] !== '') {
                        $meta['description'] = $page['page']['description'];
                    }
                    if ($page['page_raw']['page']['meta_robots'] !== 'inherit') {
                        $meta['robots'] = $page['page_raw']['page']['meta_robots'];
                    }
                }
                break;

            case 'static':
                // TODO ##translations
                // set static page meta from translations
                break;

        }

        if ($detail) {
            $meta['title'] = $detail['detail']['title'] . ' | ' . $meta['title'];
            $meta['description'] = $detail['detail']['description']; // TODO ##trim
        }

        return $meta;
    }

    public function render () {
        $rc = new RouteController;
        $mc = new MemberController;
        $vc = new ViewController;

        $language = $vc -> get_language();
        $urlAttrs = $rc -> get_url_attrs();
        $urlParams = $rc -> get_url_params();

        // Prepare data to render
        $page = $this -> get_page_data($language['current']);
        $detail = $this -> get_detail_data(
            $language['current'],
            $page['page_raw']['model'],
        );

        $page_translated = [];
        $category_translated = [];
        $detail_translated = [];

        // Render
        echo $this -> $blade -> run(
            $page['layout'],
            [
                'page' => $page,
                'detail' => $detail,
                'route' => [
                    'attrs' => $urlAttrs,
                    'params' => $urlParams,
                ],
                'language' => $language,
            ]
        );
    }

}