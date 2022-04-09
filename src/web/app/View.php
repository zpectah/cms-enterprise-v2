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



    private function get_detail ($lang, $pageModel): array {
        $rc = new RouteController;
        $vc = new ViewController;

        $urlAttrs = $rc -> get_url_attrs();

        $data = [
            'detail_raw' => null,
            'detail' => null,
        ];

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
        }

        return $data;
    }

    private function get_page ($lang): array {
        $rc = new RouteController;
        // $mc = new MemberController;
        $vc = new ViewController;

        $urlAttrs = $rc -> get_url_attrs();

        $pageName = $urlAttrs['page'];

        $page = $vc -> get_page($pageName);

        $data = [
            'data_raw' => null,                                                       // Raw database data
            'data' => null,                                                           // Translated page data (title, description, content)
            'type' => 'unknown',                                                      // Page type (unknown, static, generic)
            'name' => 'error',                                                        // Route name
            'template' => self::$o['page']['error'],                                  // Page template
            'layout' => self::$o['layout']['minimal'],                                // Layout template
            'model' => 'unknown',                                                     // Model data (posts, ...)
        ];

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
            $data['data_raw'] = $page;
            $data['data'] = $page['page']['lang'][$lang];
            $data['type'] = 'generic';
            $data['name'] = $pageName;
            $data['template'] = self::$o['page'][$page['page']['type']];
            $data['layout'] = self::$o['layout']['default'];
            $data['model'] = $page['model'];
        }

        return $data;
    }


    public function get_meta (): array {
        $vc = new ViewController;
        $meta = [
            'title' => WEB_DOCUMENT['meta']['title'],
            'description' => WEB_DOCUMENT['meta']['description'],
            'keywords' => WEB_DOCUMENT['meta']['keywords'],
            'robots' => WEB_DOCUMENT['meta']['robots'],
            'url' => WEB_DOCUMENT['root'],
        ];

        $language = $vc -> get_language();

        $page = $this -> get_page($language['current']);
        $detail = $this -> get_detail(
            $language['current'],
            $page['data_raw']['model'],
        );

        switch ($page['type']) {

            case 'generic':
                if ($page['data_raw'] && $page['data']) {
                    $meta['title'] = $page['data']['title'] . ' | ' . $meta['title'];
                    if ($page['data']['description'] !== '') {
                        $meta['description'] = $page['data']['description'];
                    }
                    if ($page['data_raw']['page']['meta_robots'] !== 'inherit') {
                        $meta['robots'] = $page['data_raw']['page']['meta_robots'];
                    }
                } else if ($detail) {
                    // TODO
                }
                break;

            case 'static':
                // TODO: set static page meta from translations ...
                // ... set translations keys first
                break;

            case 'unknown':
            default:
                // Do nothing, keep default state
                break;

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

        $page = $this -> get_page($language['current']);
        $detail = $this -> get_detail(
            $language['current'],
            $page['data_raw']['model'],
        );

        $route = [
            'attrs' => $urlAttrs,
            'params' => $urlParams,
        ];

        echo $this -> $blade -> run(
            $page['layout'],
            [

                'page' => $page,
                'detail' => $detail,

                'route' => $route,

            ]
        );
    }

}