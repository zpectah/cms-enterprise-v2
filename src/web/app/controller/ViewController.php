<?php

namespace app\controller;

use core\common\Helpers;
use core\provider\DataProvider;

class ViewController {

    private function get_category ($id): array {
        $dp = new DataProvider;
        $items = [];
        $model = 'unknown';
        $category = $dp -> get_categories([ 'id' => $id ]);

        if ($category) {

            switch ($category['type']) {

                case 'posts':
                    $model = $category['type'];
                    $posts = $dp -> get_posts([ 'sub' => true ]);
                    foreach ($posts as $post) {
                        $today = strtotime(date('Y-m-d H:i:s'));
                        $published = strtotime($post['published']);
                        if (in_array($category['id'], $post['categories'])
                            && $post['active']
                            && ($today >= $published)
                        ) $items[] = $post;
                    }
                    break;

            }

        }

        return [
            'model' => $model,
            'data' => $category,
            'items' => $items,
        ];
    }

    public function get_language (): array {
        $dp = new DataProvider;
        $cmsLanguages = $dp -> get_cms_languages();
        $language = WEB_DOCUMENT['language'];
        $langParam = $_GET['lang'];
        $current = $langParam ?? $language['default'];
        $urlParameter = $langParam ? 'lang=' . $current : '';

        return [
            'current' => $current,
            'default' => $cmsLanguages['language_default'] ?? WEB_DOCUMENT['language']['default'],
            'installed' => $cmsLanguages['language_installed'] ?? WEB_DOCUMENT['language']['list'],
            'active' => $cmsLanguages['language_active'] ?? WEB_DOCUMENT['language']['list'],
            'url_param' => $urlParameter,
        ];
    }

//    public function get_settings (): array {
//        $dp = new DataProvider;
//
//        return $dp -> get_cms_settings();
//    }

    public function get_web_settings (): array {
        $dp = new DataProvider;

        return $dp -> get_cms_web();
    }

    public function get_company_settings (): array {
        $dp = new DataProvider;

        return $dp -> get_cms_company();
    }

    public function get_members_settings (): array {
        $dp = new DataProvider;

        return $dp -> get_cms_members();
    }

    public function get_translations (): array {
        $dp = new DataProvider;
        $language = self::get_language();
        $lang = $language['current'];

        return $dp -> get_translations([ 'parsed' => true, 'lang' => $lang ]);
    }

    public function get_detail ($model, $id) {
        if (!$model) return null;

        $dp = new DataProvider;
        $detail = null;

        switch ($model) {

            case 'posts':
                $tmp_detail = $dp -> get_posts([ 'name' => $id, 'sub' => true ]);
                if ($tmp_detail) {
                    $today = strtotime(date('Y-m-d H:i:s'));
                    $published = strtotime($tmp_detail['published']);
                    if ($tmp_detail['active'] && ($today >= $published)) {
                        $detail = $tmp_detail;
                    }
                }

                break;

        }

        return $detail;
    }

    public function get_page ($name): array {
        $dp = new DataProvider;
        $pages = $dp -> get_pages([]);
        $page = [
            'page' => null,
            'category' => null,
        ];

        foreach ($pages as $p) {
            if ($p['name'] == $name && $p['active']) {
                $page['page'] = $p;
                // Category data
                if ($p['type'] == 'category' && $p['type_id']) {
                    $page['category'] = self::get_category($p['type_id']);
                    $page['model'] = $page['category']['model'];
                }
            }
        }

        return $page;
    }

    public function get_menu_item_page ($id) {
        $dp = new DataProvider;

        return $dp -> get_pages([ 'id' => $id ]);
    }
    public function get_menu_items ($menuId): array {
        $dp = new DataProvider;
        $helper = new Helpers;
        $data = $dp -> get_menuItems([ 'menu_id' => $menuId, 'with_children' => true ]);
        usort($data, $helper -> build_sorter('item_order'));

        return $data;
    }

    public function get_menu (): array {
        $dp = new DataProvider;
        $data = [
            'primary' => [],
            'secondary' => [],
            'tertiary' => [],
            'custom' => [],
        ];
        $menu = $dp -> get_menu();

        foreach ($menu as $item) {
            if ($item['active']) {
                $item['__items'] = self::get_menu_items($item['id']);
                $data[$item['type']][$item['name']] = $item;
            }
        }

        return $data;
    }

    public function get_search_results ($search, $lang): array {
        $dp = new DataProvider;
        $pages = $dp -> search_pages([ 'search' => $search, 'lang' => $lang ]);
        $posts = $dp -> search_posts([ 'search' => $search, 'lang' => $lang ]);

        return array_merge($pages, $posts);
    }

}