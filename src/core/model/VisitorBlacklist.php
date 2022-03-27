<?php

namespace core\model;

use core\common\Helpers;

class VisitorBlacklist {

    private function get_updated_row ($row) {
        unset($row['deleted']);

        return $row;
    }

    public function get ($conn, $params) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM visitor_blacklist WHERE status < ?');
        $types = 'i';
        $args = [ 3 ];

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
        $query = ('INSERT INTO visitor_blacklist (type, visitor_email, visitor_ip, cause, description, status) VALUES (?,?,?,?,?,?)');
        $types = 'sssssi';
        $args = [
            $data['type'],
            $data['visitor_email'] ?? '',
            $data['visitor_ip'] ?? '',
            $data['cause'],
            $data['description'] ?? '',
            1
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
        $query = ('UPDATE visitor_blacklist SET type = ?, visitor_email = ?, visitor_ip = ?, cause = ?, description = ?, status = ? WHERE id = ?');
        $types = 'sssssii';
        $args = [
            $data['type'],
            $data['visitor_email'] ?? '',
            $data['visitor_ip'] ?? '',
            $data['cause'],
            $data['description'] ?? '',
            $data['status'],
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
            $response[] = $helpers -> proceed_update_row('UPDATE visitor_blacklist SET status = IF(active=2, 1, 2) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE visitor_blacklist SET status = 3 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete_all_permanent ($conn): array {
        $response = [];
        $helpers = new Helpers;
        $response['db'] = $helpers -> proceed_delete_all('DELETE from visitor_blacklist WHERE status = ?', $conn, 3);

        return $response;
    }

}