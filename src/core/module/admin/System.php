<?php

namespace core\module\admin;

class System {

    // TODO
    public function create_log ($attrs): array {

        return [];
    }

    // TODO
    public function get_log_list (): array {

        return [];
    }

    private function create_language_tables ($conn, $tablePrefix, $lang_default, $lang_new) {
        $response = null;
        $table_language_name_source = $tablePrefix . '__' . strtolower(preg_replace('/-/m','_', $lang_default));
        $table_language_name_target = $tablePrefix . '__' . strtolower(preg_replace('/-/m','_', $lang_new));

        // prepare
        $query = ("CREATE TABLE $table_language_name_target LIKE $table_language_name_source");

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> execute();
            $response = $stmt -> affected_rows;
            $stmt -> close();
        }

        return $response;
    }

    private function copy_language_tables ($conn, $tablePrefix, $lang_default, $lang_new) {
        $response = null;
        $table_language_name_source = $tablePrefix . '__' . strtolower(preg_replace('/-/m','_', $lang_default));
        $table_language_name_target = $tablePrefix . '__' . strtolower(preg_replace('/-/m','_', $lang_new));

        // prepare
        $query = ("INSERT $table_language_name_target SELECT * FROM $table_language_name_source");

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> execute();
            $response = $stmt -> affected_rows;
            $stmt -> close();
        }

        return $response;
    }

    public function install_language ($conn, $data): array {
        $response = [
            'lang' => $data['lang_source'],
            'status' => 'error'
        ];
        $tables = [
            'categories',
            'menu_items',
            'menu',
            'pages',
            'posts',
            'translations',
            'uploads'
        ];
        $lang_source = $data['lang_source'];
        $lang_target = $data['lang_target'];
        $executed = [];
        foreach ($tables as $item) {
            $executed[] = self::create_language_tables($conn, $item, $lang_source, $lang_target);
            $executed[] = self::copy_language_tables($conn, $item, $lang_source, $lang_target);
        }
        $response['status'] = count($tables) == (count($executed)/2) ? 'done' : 'error';

        return [];
    }

    // TODO
    public function export_data ($attrs): array {

        return [ $attrs ];
    }

    // TODO
    public function delete_permanent_items ($conn, $data): array {

        return [ $data ];
    }

    // TODO
    public function delete_permanent_files ($conn, $data): array {

        return [ $data ];
    }

}