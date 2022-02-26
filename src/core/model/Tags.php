<?php

namespace core\model;

use core\common\Helpers;

class Tags {

    private function get_updated_row ($row) {
        $row['active'] = $row['active'] == 1;
        unset($row['deleted']);

        return $row;
    }

    public function get ($conn, $params) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM tags WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__ids = null;
        if ($params['ids']) $__ids = explode(",", $params['ids']);

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($__ids) {
                    if (in_array($row['id'], $__ids)) $response[] = self::get_updated_row($row);
                } else {
                    $response[] = self::get_updated_row($row);
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];

        // prepare
        $query = ('INSERT INTO tags (type, name, active, deleted) VALUES (?,?,?,?)');
        $types = 'ssii';
        $args = [
            $data['type'],
            $data['name'],
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
            $stmt -> close();
        }

        return $response; // last created ID
    }

    public function update ($conn, $data) {
        $response = [];

        // prepare
        $query = ('UPDATE tags SET type = ?, name = ?, active = ? WHERE id = ?');
        $types = 'ssii';
        $args = [
            $data['type'],
            $data['name'],
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
            $stmt -> close();
        }

        return $response; // list of affected ids
    }

    public function toggle ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE tags SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE tags SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

}