<?php

namespace core\module\admin;

class System {

    public function create_log ($attrs): array {

        return [];
    }

    public function get_log_list (): array {

        return [];
    }


    private function create_language_tables () {}

    private function copy_language_tables () {}

    public function install_language ($attrs): array {

        return [];
    }


    public function export_data ($attrs): array {

        return [ $attrs ];
    }

}