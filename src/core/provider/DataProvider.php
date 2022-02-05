<?php

namespace core\provider;

use core\model\Users;
use mysqli;

class DataProvider {

    /**
     * Categories
     **/


    /**
     * CmsRequests
     **/


    /**
     * Comments
     **/


    /**
     * Members
     **/


    /**
     * Menu
     **/


    /**
     * MenuItems
     **/


    /**
     * Pages
     **/


    /**
     * Posts
     **/


    /**
     * PostsOptions
     **/


    /**
     * Tags
     **/


    /**
     * Translations
     **/


    /**
     * Uploads
     **/


    /**
     * Users
     **/
    public function get_users ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $users = new Users;
        $response = $users -> get($conn, $params);
        $conn -> close();

        return $response;
    }

    public function create_users ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $users = new Users;
        $response = $users -> create($conn, $data);
        $conn -> close();

        return $response;
    }

    public function update_users ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $users = new Users;
        $response = $users -> update($conn, $data);
        $conn -> close();

        return $response;
    }

    public function toggle_users ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $users = new Users;
        $response = $users -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_users ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $users = new Users;
        $response = $users -> delete($conn, $data);
        $conn -> close();

        return $response;
    }


    /**
     * System ...
     **/



}