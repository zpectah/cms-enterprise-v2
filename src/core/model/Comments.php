<?php

namespace core\model;

use core\common\Helpers;

class Comments {

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

    public function get ($conn, $data): array {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM comments WHERE status < ?');
        $types = 'i';
        $args = [ 4 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__assigned = $data['assigned'];
        $__assigned_id = $data['assigned_id'];
        $__with_children = $data['with_children'];

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                // iterate by params
                if ($__assigned && $__assigned_id) {
                    if ($__assigned == $row['assigned'] && $__assigned_id == $row['assigned_id']) {
                        $response[] = $row;
                    }
                } else {
                    $response[] = $row;
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

    public function create ($conn, $data) {
        $response = [];

        // prepare
        $query = ('INSERT INTO comments (type, email, title, content, assigned, assigned_id, parent, status) VALUES (?,?,?,?,?,?,?,?)');
        $types = 'sssssiii';
        $args = [
            $data['type'],
            $data['email'],
            $data['title'],
            $data['content'],
            $data['assigned'],
            $data['assigned_id'],
            $data['parent'],
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
        $query = ('UPDATE comments SET title = ?, content = ?, status = ? WHERE id = ?');
        $types = 'ssii';
        $args = [
            $data['title'],
            $data['content'],
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
            $response[] = $helpers -> proceed_update_row('UPDATE comments SET status = IF(status=1, 2, 1) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function confirm ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE comments SET status = 2 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function report ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE comments SET status = 3 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE comments SET status = 4 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

}