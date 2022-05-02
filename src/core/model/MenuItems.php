<?php

namespace core\model;

use core\common\Helpers;

class MenuItems {

    private function get_items_children ($parentId, $items): array {
        $children = [];
        foreach ($items as $item) {
            if ($parentId == $item['parent']) {
                $item['children'] = self::get_items_children($item['id'], $items);
                $children[] = $item;
            }
        }

        return $children;
    }

    private function get_updated_row ($conn, $row, $languages): array {
        $helpers = new Helpers;
        foreach ($languages as $lang) {
            $table_language_name = 'menu_items__' . strtolower(preg_replace('/-/m','_', $lang));
            $row['lang'][$lang] = $helpers -> get_language_row(
                $conn,
                $row['id'],
                'SELECT * FROM ' . $table_language_name . ' WHERE id = ?'
            );
        }
        $row['active'] = $row['active'] == 1;
        unset($row['deleted']);

        return $row;
    }

    public function get ($conn, $data, $languages): array {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $query = ('SELECT * FROM menu_items WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__menuId = $helpers -> get_key($data, 'menu_id');
        $__with_children = $helpers -> get_key($data, 'with_children');
        $__ids = [];
        if ($helpers -> get_key($data, 'ids')) {
            $__ids = is_string($data['ids']) ? explode(",", $data['ids']) : $data['ids']; // Must be an array[]
        }

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($__menuId) {
                    if ($__menuId == $row['menu_id']) $response[] = self::get_updated_row($conn, $row, $languages);
                } else if ($__ids) {
                    if (in_array($row['id'], $__ids)) $response[] = self::get_updated_row($conn, $row, $languages);
                } else {
                    $response[] = self::get_updated_row($conn, $row, $languages);
                }
            }
        }
        if ($__with_children) {
            $response_new = [];
            foreach ($response as $item) {
                if ($item['parent'] == 0) {
                    $item['children'] = self::get_items_children($item['id'], $response);
                    $response_new[] = $item;
                }
            }
            $response = $response_new;
        }

        return $response;
    }

    public function create ($conn, $data, $languages) {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $query = ('INSERT INTO menu_items (name, type, page_id, path_url, parent, link_custom_key, menu_id, item_order, active, deleted) VALUES (?,?,?,?,?,?,?,?,?,?)');
        $types = 'ssssssiiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['page_id'] ?? '',
            $data['path_url'] ?? '',
            $data['parent'] ?? '',
            $data['link_custom_key'] ?? '',
            $data['menu_id'],
            $data['item_order'],
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
                $table_language_name = 'menu_items__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'INSERT INTO ' . $table_language_name . ' (id, label) VALUES (?,?)',
                    'is',
                    [
                        $response['id'],
                        $data['lang'][$lang]['label'] ?? ''
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
        $query = ('UPDATE menu_items SET name = ?, type = ?, page_id = ?, path_url = ?, menu_id = ?, parent = ?, link_custom_key = ?, item_order = ?, active = ? WHERE id = ?');
        $types = 'ssssissiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['page_id'],
            $data['path_url'],
            $data['menu_id'],
            $data['parent'] ?? '',
            $data['link_custom_key'] ?? '',
            $data['item_order'],
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
                $table_language_name = 'menu_items__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'UPDATE ' . $table_language_name . ' SET label = ? WHERE id = ?',
                    'si',
                    [
                        $data['lang'][$lang]['label'],
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
            $response[] = $helpers -> proceed_update_row('UPDATE menu_items SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE menu_items SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete_all_permanent ($conn, $languages): array {
        $response = [];
        $ids = [];
        $helpers = new Helpers;

        // prepare
        $query = ('SELECT * FROM menu_items WHERE deleted = ?');
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

        $response['db'] = $helpers -> proceed_delete_all('DELETE from menu_items WHERE deleted = ?', $conn, 1);

        foreach ($ids as $id) {
            foreach ($languages as $lang) {
                $table_language_name = 'menu_items__' . strtolower(preg_replace('/-/m','_', $lang));
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