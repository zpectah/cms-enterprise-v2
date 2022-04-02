<?php

namespace core\module\admin;

use core\model\Categories;
use core\model\Comments;
use core\model\Members;
use core\model\Menu;
use core\model\MenuItems;
use core\model\Messages;
use core\model\Pages;
use core\model\Posts;
use core\model\Tags;
use core\model\Translations;
use core\model\Uploads;
use core\model\Users;
use core\model\VisitorBlacklist;

class System {

    // TODO
    public function create_log ($attrs): array {

        return [];
    }

    // TODO
    public function get_log_list (): array {

        return [];
    }

    // TODO
    public function export_data ($attrs): array {

        return [ $attrs ];
    }


    private function create_language_tables ($conn, $tablePrefix, $lang_source, $lang_target) {
        $response = null;
        $table_language_name_source = $tablePrefix . '__' . strtolower(preg_replace('/-/m','_', $lang_source));
        $table_language_name_target = $tablePrefix . '__' . strtolower(preg_replace('/-/m','_', $lang_target));

        // prepare
        $query = ("CREATE TABLE $table_language_name_target LIKE $table_language_name_source");

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> execute();
            $response = $stmt -> affected_rows;
            $stmt -> close();
        }

        return $response;
    }

    private function copy_language_tables ($conn, $tablePrefix, $lang_source, $lang_target) {
        $response = null;
        $table_language_name_source = $tablePrefix . '__' . strtolower(preg_replace('/-/m','_', $lang_source));
        $table_language_name_target = $tablePrefix . '__' . strtolower(preg_replace('/-/m','_', $lang_target));

        // prepare
        $query = ("INSERT $table_language_name_target SELECT * FROM $table_language_name_source");

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> execute();
            $response = $stmt -> affected_rows;
            $stmt -> close();
        }

        return $response;
    }

    private function create_empty_language_tables ($conn, $tablePrefix, $lang_target) {
        $response = null;
        $table_language_name_target = $tablePrefix . '__' . strtolower(preg_replace('/-/m','_', $lang_target));

        // prepare
        $query = null;
        switch ($tablePrefix) {

            case 'categories':
                $query = ("CREATE TABLE $table_language_name_target (
                  `id` int(11) NOT NULL,
                  `title` text NOT NULL,
                  `description` text NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
                break;

            case 'menu_items':
            case 'menu':
                $query = ("CREATE TABLE $table_language_name_target (
                  `id` int(11) NOT NULL,
                  `label` text NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
                break;

            case 'pages':
            case 'posts':
                $query = ("CREATE TABLE $table_language_name_target (
                  `id` int(11) NOT NULL,
                  `title` text NOT NULL,
                  `description` text NOT NULL,
                  `content` longtext NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
                break;

            case 'translations':
                $query = ("CREATE TABLE $table_language_name_target (
                  `id` int(11) NOT NULL,
                  `value` text NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
                break;

            case 'uploads':
                $query = ("CREATE TABLE $table_language_name_target (
                  `id` int(11) NOT NULL,
                  `label` text NOT NULL,
                  `description` text NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
                break;

        }

        // execute
        if ($query) {
            if ($conn -> connect_error) {
                $response = $conn -> connect_error;
            } else {
                $stmt = $conn -> prepare($query);
                $stmt -> execute();
                $response = $stmt -> affected_rows;
                $stmt -> close();
            }
        }

        return $response;
    }

    public function install_language ($conn, $data): array {
        $response = [
            'lang' => $data['lang_source'],
            'status' => 'error'
        ];
        $tables = [
            'categories',
            'menu_items',
            'menu',
            'pages',
            'posts',
            'translations',
            'uploads'
        ];
        $lang_source = $data['lang_source'];
        $lang_target = $data['lang_target'];
        $executed = [];
        foreach ($tables as $table) {
            if ($lang_source !== 'empty') {
                $executed[] = self::create_language_tables($conn, $table, $lang_source, $lang_target);
                $executed[] = self::copy_language_tables($conn, $table, $lang_source, $lang_target);
            } else {
                $executed[] = self::create_empty_language_tables ($conn, $table, $lang_target);
            }
        }
        $response['status'] = count($tables) == (count($executed)/2) ? 'done' : 'error';

        return [];
    }

    public function delete_permanent_items ($conn, $language): array {
        $response = [];
        $categories = new Categories;
        $comments = new Comments;
        $members = new Members;
        $menu = new Menu;
        $menuItems = new MenuItems;
        $messages = new Messages;
        $pages = new Pages;
        $posts = new Posts;
        $tags = new Tags;
        $translations = new Translations;
        $users = new Users;
        $visitorBlacklist = new VisitorBlacklist;
        $response['categories'] = $categories -> delete_all_permanent($conn, $language);
        $response['comments'] = $comments -> delete_all_permanent($conn);
        $response['members'] = $members -> delete_all_permanent($conn);
        $response['menu'] = $menu -> delete_all_permanent($conn, $language);
        $response['menuItems'] = $menuItems -> delete_all_permanent($conn, $language);
        $response['messages'] = $messages -> delete_all_permanent($conn);
        $response['pages'] = $pages -> delete_all_permanent($conn, $language);
        $response['posts'] = $posts -> delete_all_permanent($conn, $language);
        $response['tags'] = $tags -> delete_all_permanent($conn);
        $response['translations'] = $translations -> delete_all_permanent($conn, $language);
        $response['users'] = $users -> delete_all_permanent($conn);
        $response['visitorBlacklist'] = $visitorBlacklist -> delete_all_permanent($conn);

        return $response;
    }

    public function delete_permanent_uploads ($conn, $language): array {
        $uploads = new Uploads;

        return $uploads -> delete_all_permanent($conn, $language);
    }

}