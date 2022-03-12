<?php

namespace core\model;

use core\common\Helpers;

class Members {

    private function get_updated_row ($row, $rp_withPassword) {
        if (!$rp_withPassword) unset($row['password']);
        $row['active'] = $row['active'] == 1;
        $row['subscription'] = $row['subscription'] == 1;
        $row['phone_alt'] = $row['phone_alt'] == '' ? [] : explode(",", $row['phone_alt']);
        $row['email_alt'] = $row['email_alt'] == '' ? [] : explode(",", $row['email_alt']);
        $row['birthdate'] = $row['birthdate'] == '' ? null : $row['birthdate'];
        unset($row['deleted']);

        return $row;
    }

    public function get ($conn, $params): array {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM members WHERE deleted = ?');
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
        $query = ('INSERT INTO members (
                email, 
                type, 
                password, 
                phone,
                nickname, 
                name_first, 
                name_last, 
                position,
                country,
                city,
                address,
                zip,
                item_group,
                img_avatar,
                phone_alt,
                email_alt,
                 sex,
                 birthdate,
                description,
                subscription,
                active, 
                deleted
                   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'sssssssssssssssssssiii';
        $args = [
            $data['email'],
            $data['type'],
            $data['password'] ? $helpers -> password_hash($data['password']) : '',
            $data['phone'] ? $data['phone'] : '',
            $data['nickname'] ? $data['nickname'] : '',
            $data['name_first'] ? $data['name_first'] : '',
            $data['name_last'] ? $data['name_last'] : '',
            $data['position'] ? $data['position'] : '',
            $data['country'] ? $data['country'] : '',
            $data['city'] ? $data['city'] : '',
            $data['address'] ? $data['address'] : '',
            $data['zip'] ? $data['zip'] : '',
            $data['item_group'] ? $data['item_group'] : '',
            $data['img_avatar'] ? $data['img_avatar'] : '',
            $data['phone_alt'] ? implode(",", $data['phone_alt']) : '',
            $data['email_alt'] ? implode(",", $data['email_alt']) : '',
            $data['sex'] ? $data['sex'] : '',
            $data['birthdate'] ? $data['birthdate'] : '',
            $data['description'] ? $data['description'] : '',
            $data['subscription'],
            $data['active'] ? $data['active'] : 1,
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

        return $response;
    }

    public function update ($conn, $data) {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $password = $data['password'];
        $query = $password ? ('UPDATE members SET 
                email = ?, 
                type = ?, 
                password = ?, 
                phone = ?,                    
                nickname = ?, 
                name_first = ?, 
                name_last = ?, 
                position = ?,
                country = ?, 
                city = ?, 
                address = ?, 
                zip = ?, 
                item_group = ?,
                img_avatar = ?,
                phone_alt = ?, 
                email_alt = ?,    
                sex = ?,
                birthdate = ?,
                description = ?, 
                subscription = ?,
                active = ? 
            WHERE id = ?')
            : ('UPDATE members SET 
                email = ?, 
                type = ?, 
                phone = ?,                  
                nickname = ?, 
                name_first = ?, 
                name_last = ?, 
                position = ?, 
                country = ?, 
                city = ?, 
                address = ?, 
                zip = ?, 
                item_group = ?,
                img_avatar = ?,
                phone_alt = ?, 
                email_alt = ?,  
                sex = ?,
                birthdate = ?, 
                description = ?, 
                subscription = ?,
                active = ? 
            WHERE id = ?');
        $types = $password ? 'sssssssssssssssssssiii' : 'ssssssssssssssssssiii';
        $args = $password ? [
            $data['email'],
            $data['type'],
            $helpers -> password_hash($data['password']),
            $data['phone'],
            $data['nickname'],
            $data['name_first'],
            $data['name_last'],
            $data['position'],
            $data['country'],
            $data['city'],
            $data['address'],
            $data['zip'],
            $data['item_group'],
            $data['img_avatar'],
            $data['phone_alt'] ? implode(",", $data['phone_alt']) : '',
            $data['email_alt'] ? implode(",", $data['email_alt']) : '',
            $data['sex'],
            $data['birthdate'] ?? '',
            $data['description'],
            $data['subscription'],
            $data['active'],
            $data['id']
        ] : [
            $data['email'],
            $data['type'],
            $data['phone'],
            $data['nickname'],
            $data['name_first'],
            $data['name_last'],
            $data['position'],
            $data['country'],
            $data['city'],
            $data['address'],
            $data['zip'],
            $data['item_group'],
            $data['img_avatar'],
            $data['phone_alt'] ? implode(",", $data['phone_alt']) : '',
            $data['email_alt'] ? implode(",", $data['email_alt']) : '',
            $data['sex'],
            $data['birthdate'] ?? '',
            $data['description'],
            $data['subscription'],
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

        return $response;
    }

    public function toggle ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE members SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE members SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

}