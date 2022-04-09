<?php

namespace app;

use app\controller\MemberController;
use app\controller\RouteController;
use app\controller\ViewController;
use eftec\bladeone\BladeOne;

class View {

    static array $options = [
        'layout' => [
            'minimal' => 'layout.minimal',
            'default' => 'layout.default',
        ],
        'page' => [
            'category' => 'page.category',
            'default' => 'page.default',
            'detail-posts' => 'page.detail-posts',
            'error' => 'page.error',
            'home' => 'page.home',
            'members-lostPassword' => 'page.members-lost-password',
            'members-profile' => 'page.members-profile',
            'members-registration' => 'page.members-registration',
            'search-results' => 'page.search-results',
        ],
    ];

    function __construct () {
        $this -> $blade = new BladeOne(
            TEMPLATE_ROOT_PATH,
            "compiled"
        );
    }







    public function get_view_meta (): array {
        $rc = new RouteController;
        $mc = new MemberController;
        $vc = new ViewController;

        return [
            'title' => 'web title ...',
            'description' => '',
            'keywords' => '',
            'robots' => '',
            'url' => '',
        ];
    }

    public function render_page () {
        $rc = new RouteController;
        $mc = new MemberController;
        $vc = new ViewController;

        $urlAttrs = $rc -> get_url_attrs();
        $urlParams = $rc -> get_url_params();

        $view = [
            'layout' => 'layout.default',
            'template' => 'page.default'
        ];
        $route = [
            'attrs' => $urlAttrs,
            'params' => $urlParams,
        ];

        echo $this -> $blade -> run(
            $view['layout'],
            [

                'view' => $view,

                'route' => $route,

            ]
        );
    }

}