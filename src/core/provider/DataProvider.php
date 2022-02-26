<?php

namespace core\provider;

use core\model\Tags;
use core\model\Translations;
use core\model\Users;
use core\module\admin\Settings;
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
     * Messages
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
    public function get_tags ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $tags = new Tags;
        $response = $tags -> get($conn, $params);
        $conn -> close();

        return $response;
    }

    public function create_tags ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $tags = new Tags;
        $response = $tags -> create($conn, $data);
        $conn -> close();

        return $response;
    }

    public function update_tags ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $tags = new Tags;
        $response = $tags -> update($conn, $data);
        $conn -> close();

        return $response;
    }

    public function toggle_tags ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $tags = new Tags;
        $response = $tags -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_tags ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $tags = new Tags;
        $response = $tags -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

    /**
     * Translations
     **/
    public function get_translations ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $translations = new Translations;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $translations -> get($conn, $params, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function create_translations ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $translations = new Translations;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $translations -> create($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function update_translations ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $translations = new Translations;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $translations -> update($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function toggle_translations ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $translations = new Translations;
        $response = $translations -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_translations ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $translations = new Translations;
        $response = $translations -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

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
    public function get_cms_settings (): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $settings = new Settings;
        $response = $settings -> get_cms_settings($conn);
        $conn -> close();

        return $response;
    }

    public function update_cms_settings ($fields) {
        $conn = new mysqli(...CFG_DB_CONN);
        $settings = new Settings;
        $response = $settings -> update_cms_settings($conn, $fields);
        $conn -> close();

        return $response;
    }

    public function get_cms_languages (): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $settings = new Settings;
        $response = $settings -> get_cms_languages($conn);
        $conn -> close();

        return $response;
    }


}