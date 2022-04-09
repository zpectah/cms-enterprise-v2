<?php

namespace app\controller;

use core\provider\DataProvider;

class ViewController {

    private function get_category ($id): array {
        $dp = new DataProvider;
        $category = $dp -> get_categories([ 'id' => $id ]);
        $items = [];
        $model = 'unknown';

        if ($category) {
            if ($category['type'] == 'posts') {
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
            }
        }

        return [
            'model' => $model,
            'category' => $category,
            'items' => $items,
        ];
    }

    public function get_language (): array {

        return [
            'current' => 'cs-CZ', // TODO
            'default' => 'cs-CZ', // TODO
            'installed' => [ 'cs-CZ' ], // TODO
            'active' => [ 'cs-CZ' ], // TODO
            'url_param' => null,  // TODO ... get and set ...
        ];
    }

    public function get_translations (): array {

        return [];
    }

    public function get_detail ($model, $id) {
        if (!$model) return null;

        $dp = new DataProvider;
        $detail = null;
        switch ($model) {

            case 'posts':
                $detail = $dp -> get_posts([ 'name' => $id, 'sub' => true ]);
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
                    $page['category'] = $this -> get_category($p['type_id']);
                    $page['model'] = $page['category']['model'];
                }
            }
        }

        return $page;
    }

    public function get_search_results (): array {

        return [];
    }

}