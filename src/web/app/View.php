<?php

namespace app;

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
        return [
            'title' => 'web title ...',
            'description' => '',
            'keywords' => '',
            'robots' => '',
            'url' => '',
        ];
    }

    public function render_page () {

        $page = [
            'template' => 'page.default'
        ];

        echo $this -> $blade -> run('layout.default', [

            'page' => $page,

        ]);
    }

}