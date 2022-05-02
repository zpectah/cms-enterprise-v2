<?php

namespace core\model;

use core\common\Helpers;

class Uploads {

    private function get_updated_row ($conn, $row, $languages): array {
        $helpers = new Helpers;
        foreach ($languages as $lang) {
            $table_language_name = 'uploads__' . strtolower(preg_replace('/-/m','_', $lang));
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
        $query = ('SELECT * FROM uploads WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__ids = [];
        if ($helpers -> get_key($data, 'ids')) {
            $__ids = is_string($data['ids']) ? explode(",", $data['ids']) : $data['ids']; // Must be an array[]
        }

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($__ids) {
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

        $new_file_name = $data['name'] . '.' . $data['file_extension'];

        // prepare
        $query = ('INSERT INTO uploads (name, type, file_extension, file_name, file_mime, file_size, active, deleted) VALUES (?,?,?,?,?,?,?,?)');
        $types = 'ssssssii';
        $args = [
            $data['name'],
            $data['type'],
            $data['file_extension'],
            $new_file_name,
            $data['file_mime'],
            $data['file_size'],
            $data['active'],
            0
        ];

        // upload result
        $uploadedFile = $helpers -> upload_file($data['fileBase64'], $data['fileBase64_cropped'], $data['name'], $data['file_extension'], $data['type']);

        // execute
        if ($uploadedFile) {
            if ($conn -> connect_error) {
                $response = $conn -> connect_error;
            } else {
                $stmt = $conn -> prepare($query);
                $stmt -> bind_param($types, ...$args);
                $stmt -> execute();
                $response['id'] = $stmt -> insert_id;
                $response['uploads'] = $uploadedFile;
                foreach ($languages as $lang) {
                    $table_language_name = 'uploads__' . strtolower(preg_replace('/-/m','_', $lang));
                    $response['lang'][] = $helpers -> update_language_row(
                        $conn,
                        $lang,
                        'INSERT INTO ' . $table_language_name . ' (id, label, description) VALUES (?,?,?)',
                        'iss',
                        [
                            $response['id'],
                            $data['lang'][$lang]['label'] ?? '',
                            $data['lang'][$lang]['description'] ?? ''
                        ]
                    );
                }
                $stmt -> close();
            }
        } else {
            $response['message'] = 'Error while uploading';
        }

        return $response;
    }

    public function update ($conn, $data, $languages) {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $query = ('UPDATE uploads SET active = ? WHERE id = ?');
        $types = 'ii';
        $args = [
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
                $table_language_name = 'uploads__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'UPDATE ' . $table_language_name . ' SET label = ?, description = ? WHERE id = ?',
                    'ssi',
                    [
                        $data['lang'][$lang]['label'] ?? '',
                        $data['lang'][$lang]['description'] ?? '',
                        $data['id']
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
            $response[] = $helpers -> proceed_update_row('UPDATE uploads SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE uploads SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete_all_permanent ($conn, $languages): array {
        $response = [];
        $ids = [];
        $helpers = new Helpers;

        // prepare
        $query = ('SELECT * FROM uploads WHERE deleted = ?');
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
                $response['files'][] = $helpers -> delete_file($row['file_name'], $row['type']);
            }
        }

        $response['db'] = $helpers -> proceed_delete_all('DELETE from uploads WHERE deleted = ?', $conn, 1);

        foreach ($ids as $id) {
            foreach ($languages as $lang) {
                $table_language_name = 'uploads__' . strtolower(preg_replace('/-/m','_', $lang));
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