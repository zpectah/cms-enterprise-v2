<?php

namespace core\model;

use core\common\Helpers;
use core\module\admin\Settings;

class Pages {

    private function get_updated_row ($conn, $row, $languages): array {
        $helpers = new Helpers;
        foreach ($languages as $lang) {
            $table_language_name = 'pages__' . strtolower(preg_replace('/-/m','_', $lang));
            $row['lang'][$lang] = $helpers -> get_language_row(
                $conn,
                $row['id'],
                'SELECT * FROM ' . $table_language_name . ' WHERE id = ?'
            );
        }
        $row['page_elements'] = $row['page_elements'] == '' ? [] : explode(",", $row['page_elements']);
        $row['active'] = $row['active'] == 1;
        unset($row['deleted']);

        return $row;
    }

    public function get ($conn, $params, $languages): array {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $query = ('SELECT * FROM pages WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__id = $helpers -> get_key($params, 'id');
        $__ids = [];
        if ($helpers -> get_key($params, 'ids')) {
            $__ids = is_string($params['ids']) ? explode(",", $params['ids']) : $params['ids']; // Must be an array[]
        }

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($__id) {
                    if ($__id == $row['id']) $response = self::get_updated_row($conn, $row, $languages);
                } else if ($__ids) {
                    if (in_array($row['id'], $__ids)) $response[] = self::get_updated_row($conn, $row, $languages);
                } else {
                    $response[] = self::get_updated_row($conn, $row, $languages);
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data, $languages) {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $query = ('INSERT INTO pages (name, type, type_id, meta_robots, page_elements, active, deleted) VALUES (?,?,?,?,?,?,?)');
        $types = 'sssssii';
        $args = [
            $data['name'],
            $data['type'],
            $data['type_id'],
            $data['meta_robots'],
            $data['page_elements'] ? implode(",", $data['page_elements']) : '',
            $data['active'],
            0
        ];

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $response['id'] = $stmt -> insert_id;
            foreach ($languages as $lang) {
                $table_language_name = 'pages__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'INSERT INTO ' . $table_language_name . ' (id, title, description, content) VALUES (?,?,?,?)',
                    'isss',
                    [
                        $response['id'],
                        $data['lang'][$lang]['title'] ?? '',
                        $data['lang'][$lang]['description'] ?? '',
                        $data['lang'][$lang]['content'] ?? '',
                    ]
                );
            }
            $stmt -> close();
        }

        return $response;
    }

    public function update ($conn, $data, $languages) {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $query = ('UPDATE pages SET name = ?, type = ?, type_id = ?, meta_robots = ?, page_elements = ?, active = ? WHERE id = ?');
        $types = 'sssssii';
        $args = [
            $data['name'],
            $data['type'],
            $data['type_id'],
            $data['meta_robots'],
            $data['page_elements'] ? implode(",", $data['page_elements']) : '',
            $data['active'],
            $data['id']
        ];

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $response['rows'] = $stmt -> affected_rows;
            foreach ($languages as $lang) {
                $table_language_name = 'pages__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'UPDATE ' . $table_language_name . ' SET title = ?, description = ?, content = ? WHERE id = ?',
                    'sssi',
                    [
                        $data['lang'][$lang]['title'],
                        $data['lang'][$lang]['description'],
                        $data['lang'][$lang]['content'],
                        $data['lang'][$lang]['id']
                    ]
                );
            }
            $stmt -> close();
        }

        return $response;
    }

    public function toggle ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE pages SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE pages SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function search ($conn, $data, $languages): array {
        $results = [];
        $string = strtolower($data['search']);
        $settings = new Settings;
        if ($data['lang']) {
            $lng = $data['lang'];
        } else {
            $lng = $settings['language_default'];
        }
        $pages = $this -> get($conn, [], $languages);
        // $today = strtotime(date('Y-m-d H:i:s'));
        foreach ($pages as $item) {
            if (
                preg_match( "/{$string}/i", strtolower($item['name']))
                || preg_match( "/{$string}/i", strtolower($item['lang'][$lng]['title']))
                || preg_match( "/{$string}/i", strtolower($item['lang'][$lng]['description']))
                || preg_match( "/{$string}/i", strtolower($item['lang'][$lng]['content']))
                && $item['active']
            ) {
                $item['model'] = 'pages';
                $results[] = $item;
            }
        }

        return $results;
    }

    public function delete_all_permanent ($conn, $languages): array {
        $response = [];
        $ids = [];
        $helpers = new Helpers;

        // prepare
        $query = ('SELECT * FROM pages WHERE deleted = ?');
        $types = 'i';
        $args = [ 1 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                $ids[] = $row['id'];
            }
        }

        $response['db'] = $helpers -> proceed_delete_all('DELETE from pages WHERE deleted = ?', $conn, 1);

        foreach ($ids as $id) {
            foreach ($languages as $lang) {
                $table_language_name = 'pages__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'DELETE from ' . $table_language_name . ' WHERE id = ?',
                    'i',
                    [ $id ]
                );
            }
        }

        return $response;
    }

}