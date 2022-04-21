<?php

namespace core\model;

use core\common\Helpers;

class Translations {

    private function get_updated_row ($conn, $row, $languages): array {
        $helpers = new Helpers;
        foreach ($languages as $lang) {
            $table_language_name = 'translations__' . strtolower(preg_replace('/-/m','_', $lang));
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

    public function get ($conn, $params, $languages): array {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM translations WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__parsed = $params['parsed'];
        $__lang = $params['lang'];
        $__ids = is_string($params['ids']) ? explode(",", $params['ids']) : $params['ids']; // Must be an array[]

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($__parsed == 'true' and $__lang) {
                    $r = self::get_updated_row($conn, $row, $languages);
                    if ($row['active']) $response[$row['name']] = $r['lang'][$__lang]['value'];
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
        $query = ('INSERT INTO translations (name, type, active, deleted) VALUES (?,?,?,?)');
        $types = 'ssii';
        $args = [
            $data['name'],
            $data['type'],
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
                $table_language_name = 'translations__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'INSERT INTO ' . $table_language_name . ' (id, value) VALUES (?,?)',
                    'is',
                    [
                        $response['id'],
                        $data['lang'][$lang]['value'] ?? ''
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
        $query = ('UPDATE translations SET name = ?, type = ?, active = ? WHERE id = ?');
        $types = 'ssii';
        $args = [
            $data['name'],
            $data['type'],
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
                $table_language_name = 'translations__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'UPDATE ' . $table_language_name . ' SET value = ? WHERE id = ?',
                    'si',
                    [
                        $data['lang'][$lang]['value'],
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
            $response[] = $helpers -> proceed_update_row('UPDATE translations SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;
        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE translations SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete_all_permanent ($conn, $languages): array {
        $response = [];
        $ids = [];
        $helpers = new Helpers;

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM translations WHERE deleted = ?');
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

        $response['db'] = $helpers -> proceed_delete_all('DELETE from translations WHERE deleted = ?', $conn, 1);

        foreach ($ids as $id) {
            foreach ($languages as $lang) {
                $table_language_name = 'translations__' . strtolower(preg_replace('/-/m','_', $lang));
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