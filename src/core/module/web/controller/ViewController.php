<?php

namespace core\module\web\controller;

use core\common\Helpers;
use core\provider\DataProvider;

class ViewController {

    private function get_category ($id): array {
        $dp = new DataProvider;
        $helpers = new Helpers;
        $items = [];
        $model = 'unknown';
        $category = $dp -> get_categories([ 'id' => $id ]);

        if ($category) {
            $type = $helpers -> get_key($category, 'type');
            $cid = $helpers -> get_key($category, 'id');
            switch ($type) {

                case 'posts':
                    $model = $type;
                    $posts = $dp -> get_posts([ 'sub' => true ]);
                    foreach ($posts as $post) {
                        $today = strtotime(date('Y-m-d H:i:s'));
                        $published = strtotime($post['published']);
                        $categories = $helpers -> get_key($post, 'categories');
                        $active = $helpers -> get_key($post, 'active');
                        if (in_array($cid, $categories) && $active && ($today >= $published)) $items[] = $post;
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
        $helpers = new Helpers;
        $cmsLanguages = $dp -> get_cms_languages();
        $language = $helpers -> get_key(WEB_DOCUMENT, 'language');
        $langParam = $helpers -> get_key($_GET, 'lang');
        $current = $langParam ?? $helpers -> get_key($language, 'default');
        $urlParameter = $langParam ? 'lang=' . $current : '';

        $cmsLanguageDefault = $helpers -> get_key($cmsLanguages, 'language_default');
        $cmsLanguageInstalled = $helpers -> get_key($cmsLanguages, 'language_installed');
        $cmsLanguageActive = $helpers -> get_key($cmsLanguages, 'language_active');

        $_languageDefault = $helpers -> get_key(WEB_DOCUMENT, 'language->default');
        $_languageList = $helpers -> get_key(WEB_DOCUMENT, 'language->list');
        $_active = $cmsLanguageActive ?? $_languageList;

        return [
            'current' => $current,
            'default' => $cmsLanguageDefault ?? $_languageDefault,
            'installed' => $cmsLanguageInstalled ?? $_languageList,
            'active' => $cmsLanguageActive ?? $_languageList,
            'active_count' => count($_active),
            'url_param' => $urlParameter,
            'locales' => PROJECT_LOCALES,
            'locale' => $helpers -> get_key(PROJECT_LOCALES, [ $current ], $language)
        ];
    }

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
        $helpers = new Helpers;
        $language = self::get_language();
        $lang = $helpers -> get_key($language, 'current');

        return $dp -> get_translations([ 'parsed' => true, 'lang' => $lang ]);
    }

    public function get_detail ($model, $id) {
        if (!$model) return null;

        $dp = new DataProvider;
        $helpers = new Helpers;
        $detail = null;
        $today = strtotime(date('Y-m-d H:i:s'));

        switch ($model) {

            case 'posts':
                $tmp_detail = $dp -> get_posts([ 'name' => $id, 'sub' => true ]);
                if ($tmp_detail) {
                    $published = $helpers -> get_key($tmp_detail, 'published');
                    $published = strtotime($published);
                    $active = $helpers -> get_key($tmp_detail, 'active');
                    if ($active && ($today >= $published)) {
                        $detail = $tmp_detail;
                    }
                }

                break;

        }

        return $detail;
    }

    public function get_page ($name): array {
        $dp = new DataProvider;
        $helpers = new Helpers;
        $pages = $dp -> get_pages([]);
        $page = [
            'page' => null,
            'category' => null,
        ];

        foreach ($pages as $p) {
            $p_name = $helpers -> get_key($p, 'name');
            $p_active = $helpers -> get_key($p, 'active');
            $p_type = $helpers -> get_key($p, 'type');
            $p_type_id = $helpers -> get_key($p, 'type_id');
            if ($p_name == $name && $p_active) {
                $page['page'] = $p;
                // Category data
                if ($p_type == 'category' && $p_type_id) {
                    $page['category'] = self::get_category($p_type_id);
                    $page['model'] = $helpers -> get_key($page, 'category->model');
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
        $helpers = new Helpers;
        $data = [
            'primary' => [],
            'secondary' => [],
            'tertiary' => [],
            'custom' => [],
        ];
        $menu = $dp -> get_menu();

        foreach ($menu as $item) {
            $active = $helpers -> get_key($item, 'active');
            $id = $helpers -> get_key($item, 'id');
            $type = $helpers -> get_key($item, 'type');
            $name = $helpers -> get_key($item, 'name');
            if ($active) {
                $item['__items'] = self::get_menu_items($id);
                $data[$type][$name] = $item;
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

    public function get_members_options ($attrs, $isLostPasswordPage): array {
        $helpers = new Helpers;
        $token = null;
        $a1 = $helpers -> get_key($attrs, [ 1 ]);
        $a2 = $helpers -> get_key($attrs, [ 2 ]);
        if ($isLostPasswordPage && $a1 == 'token' && $a2) {
            $token = $a2;
        }

        return [
            'lost_password_token' => $token,
        ];
    }

    public function get_posts_list ($props): array {
        // [ order_by, category_id, tag_id, limit ]
        $dp = new DataProvider;
        $helper = new Helpers;
        $posts = $dp -> get_posts([ 'sub' => true ]);
        $filtered = [];
        foreach ($posts as $post) {
            if ($helper -> get_key($post, 'active')) $filtered[] = $post;
        }
        $posts = $filtered;
        $p_order_by = $helper -> get_key($props, 'order_by');
        $p_category_id = $helper -> get_key($props, 'category_id');
        $p_tag_id = $helper -> get_key($props, 'tag_id');
        $p_limit = $helper -> get_key($props, 'limit');
        $orderBy = $p_order_by ?? 'id';
        if ($p_category_id) {
            $filtered = [];
            foreach ($posts as $post) {
                $categories = $helper -> get_key($post, 'categories');
                if (in_array($p_category_id, $categories)) $filtered[] = $post;
            }
            $posts = $filtered;
        }
        if ($p_tag_id) {
            $filtered = [];
            foreach ($posts as $post) {
                $tags = $helper -> get_key($post, 'tags');
                if (in_array($p_tag_id, $tags)) $filtered[] = $post;
            }
            $posts = $filtered;
        }
        usort($posts, function ($a, $b) use ($orderBy) { return strcmp($b[$orderBy], $a[$orderBy]); });
        if ($p_limit) $posts = array_slice($posts, 0, $p_limit);

        return $posts;
    }

}