<?php

namespace core\model;

use core\common\Helpers;

class CmsRequests {

    public function get ($conn, $data) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM cms_requests');
        $types = '';
        $args = [];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__id = $data['id'];
        $__token = $data['token'];

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                // iterate by params
                if ($__id) {
                    if ($__id == $row['id']) $response = $row;
                } else if ($__token) {
                    if ($__token == $row['token']) $response = $row;
                } else {
                    $response[] = $row;
                }
            }

        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];

        // prepare
        $query = ('INSERT INTO cms_requests (type, context, value, token, ip_address, status) VALUES (?,?,?,?,?,?)');
        $types = 'sssssi';
        $args = [
            $data['type'],
            $data['context'],
            $data['value'],
            $data['token'],
            $data['ip_address'] ?? '',
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
        $query = ('UPDATE cms_requests SET ip_address = ?, status = ? WHERE token = ?');
        $types = 'sis';
        $args = [
            $data['ip_address'] ?? '',
            $data['status'],
            $data['token']
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

    public function toggle ($conn, $data) {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $token) {
            $response[] = $helpers -> proceed_update_row('UPDATE cms_requests SET status = IF(status=1, 2, 1) WHERE id = ?', $conn, $token);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data) {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $token) {
            $response[] = $helpers -> proceed_update_row('UPDATE cms_requests SET status = 3 WHERE token = ?', $conn, $token);
        }

        return $response; // list of affected ids
    }

}