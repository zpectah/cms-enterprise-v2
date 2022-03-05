<?php

namespace core\model;

use core\common\Helpers;

class Users {

    private function get_updated_row ($row, $withPassword) {
        if (!$withPassword) unset($row['password']);
        $row['active'] = $row['active'] == 1;
        unset($row['deleted']);

        return $row;
    }

    public function get ($conn, $params): array {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__id = $params['id'];
        $__email = $params['email'];
        $__withPassword = $params['with_password'];
        $__checkExist = $params['check_exist'];

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                // iterate by params
                if ($__id) {
                    if ($__id == $row['id']) {
                        if ($__checkExist) {
                            $response['exist'] = true;
                        } else {
                            $response = self::get_updated_row($row, $__withPassword);
                        }
                    }
                } else if ($__email) {
                    if ($__email == $row['email']) {
                        if ($__checkExist) {
                            $response['exist'] = true;
                        } else {
                            $response = self::get_updated_row($row, $__withPassword);
                        }
                    }
                } else {
                    $response[] = self::get_updated_row($row, $__withPassword);
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $query = ('INSERT INTO users (
                email, 
                type, 
                password, 
                nickname, 
                name_first, 
                name_last, 
                item_level, 
                item_group, 
                img_avatar, 
                description, 
                active, 
                deleted
                   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'ssssssisssii';
        $args = [
            $data['email'],
            $data['type'],
            $helpers -> password_hash($data['password']),
            $data['nickname'],
            $data['name_first'],
            $data['name_last'],
            $data['item_level'],
            $data['item_group'],
            $data['img_avatar'],
            $data['description'],
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

        return $response; // Returns [ 'id' => $ ]
    }

    public function update ($conn, $data) {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $password = $data['password'];
        $query = $password ? ('UPDATE users SET 
                email = ?, 
                type = ?, 
                password = ?, 
                nickname = ?, 
                name_first = ?, 
                name_last = ?, 
                item_level = ?, 
                item_group = ?, 
                img_avatar = ?, 
                description = ?, 
                active = ? 
            WHERE id = ?')
            : ('UPDATE users SET 
                email = ?, 
                type = ?, 
                nickname = ?, 
                name_first = ?, 
                name_last = ?, 
                item_level = ?, 
                item_group = ?, 
                img_avatar = ?, 
                description = ?, 
                active = ? 
            WHERE id = ?');
        $types = $password ? 'ssssssisssii' : 'sssssisssii';
        $args = $password ? [
            $data['email'],
            $data['type'],
            $helpers -> password_hash($data['password']),
            $data['nickname'],
            $data['name_first'],
            $data['name_last'],
            $data['item_level'],
            $data['item_group'],
            $data['img_avatar'],
            $data['description'],
            $data['active'],
            $data['id']
        ] : [
            $data['email'],
            $data['type'],
            $data['nickname'],
            $data['name_first'],
            $data['name_last'],
            $data['item_level'],
            $data['item_group'],
            $data['img_avatar'],
            $data['description'],
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

        return $response; // Returns [ 'rows' => $ ]
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE users SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function toggle ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE users SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }


}