<?php

namespace core\provider;

use core\model\Categories;
use core\model\CmsRequests;
use core\model\Comments;
use core\model\Members;
use core\model\Menu;
use core\model\MenuItems;
use core\model\Messages;
use core\model\Pages;
use core\model\Posts;
use core\model\Tags;
use core\model\Translations;
use core\model\Uploads;
use core\model\Users;
use core\model\VisitorBlacklist;
use core\module\admin\Settings;
use core\module\admin\System;
use mysqli;

class DataProvider {

    /**
     * Categories
     **/
    public function get_categories ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $categories = new Categories;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $categories -> get($conn, $params, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function create_categories ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $categories = new Categories;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $categories -> create($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function update_categories ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $categories = new Categories;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $categories -> update($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function toggle_categories ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $categories = new Categories;
        $response = $categories -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_categories ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $categories = new Categories;
        $response = $categories -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

    /**
     * CmsRequests
     **/
    public function get_cmsRequests ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $cmsRequests = new CmsRequests;
        $response = $cmsRequests -> get($conn, $params);
        $conn -> close();

        return $response;
    }

    public function create_cmsRequests ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $cmsRequests = new CmsRequests;
        $response = $cmsRequests -> create($conn, $data);
        $conn -> close();

        return $response;
    }

    public function update_cmsRequests ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $cmsRequests = new CmsRequests;
        $response = $cmsRequests -> update($conn, $data);
        $conn -> close();

        return $response;
    }

    public function toggle_cmsRequests ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $cmsRequests = new CmsRequests;
        $response = $cmsRequests -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_cmsRequests ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $cmsRequests = new CmsRequests;
        $response = $cmsRequests -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

    /**
     * Comments
     **/
    public function get_comments ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $comments = new Comments;
        $response = $comments -> get($conn, $params);
        $conn -> close();

        return $response;
    }

    public function create_comments ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $comments = new Comments;
        $response = $comments -> create($conn, $data);
        $conn -> close();

        return $response;
    }

    public function update_comments ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $comments = new Comments;
        $response = $comments -> update($conn, $data);
        $conn -> close();

        return $response;
    }

    public function toggle_comments ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $comments = new Comments;
        $response = $comments -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_comments ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $comments = new Comments;
        $response = $comments -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

    public function confirm_comments ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $comments = new Comments;
        $response = $comments -> confirm($conn, $data);
        $conn -> close();

        return $response;
    }

    public function report_comments ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $comments = new Comments;
        $response = $comments -> report($conn, $data);
        $conn -> close();

        return $response;
    }

    /**
     * Members
     **/
    public function get_members ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $members = new Members;
        $response = $members -> get($conn, $params);
        $conn -> close();

        return $response;
    }

    public function create_members ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $members = new Members;
        $response = $members -> create($conn, $data);
        $conn -> close();

        return $response;
    }

    public function update_members ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $members = new Members;
        $response = $members -> update($conn, $data);
        $conn -> close();

        return $response;
    }

    public function toggle_members ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $members = new Members;
        $response = $members -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_members ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $members = new Members;
        $response = $members -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

    /**
     * Menu
     **/
    public function get_menu ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $menu = new Menu;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $menu -> get($conn, $params, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function create_menu ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $menu = new Menu;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $menu -> create($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function update_menu ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $menu = new Menu;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $menu -> update($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function toggle_menu ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $menu = new Menu;
        $response = $menu -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_menu ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $menu = new Menu;
        $response = $menu -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

    /**
     * MenuItems
     **/
    public function get_menuItems ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $menuItems = new MenuItems;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $menuItems -> get($conn, $params, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function create_menuItems ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $menuItems = new MenuItems;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $menuItems -> create($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function update_menuItems ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $menuItems = new MenuItems;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $menuItems -> update($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function toggle_menuItems ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $menuItems = new MenuItems;
        $response = $menuItems -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_menuItems ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $menuItems = new MenuItems;
        $response = $menuItems -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

    /**
     * Messages
     **/
    public function get_messages ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $messages = new Messages;
        $response = $messages -> get($conn, $params);
        $conn -> close();

        return $response;
    }

    public function create_messages ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $messages = new Messages;
        $response = $messages -> create($conn, $data);
        $conn -> close();

        return $response;
    }

    public function update_messages ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $messages = new Messages;
        $response = $messages -> update($conn, $data);
        $conn -> close();

        return $response;
    }

    public function toggle_messages ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $messages = new Messages;
        $response = $messages -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_messages ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $messages = new Messages;
        $response = $messages -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

    public function mark_read_messages ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $messages = new Messages;
        $response = $messages -> mark_read($conn, $data);
        $conn -> close();

        return $response;
    }

    /**
     * Pages
     **/
    public function get_pages ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $pages = new Pages;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $pages -> get($conn, $params, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function create_pages ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $pages = new Pages;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $pages -> create($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function update_pages ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $pages = new Pages;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $pages -> update($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function toggle_pages ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $pages = new Pages;
        $response = $pages -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_pages ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $pages = new Pages;
        $response = $pages -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

    /**
     * Posts
     **/
    public function get_posts ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $posts = new Posts;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $posts -> get($conn, $params, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function create_posts ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $posts = new Posts;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $posts -> create($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function update_posts ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $posts = new Posts;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $posts -> update($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function toggle_posts ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $posts = new Posts;
        $response = $posts -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_posts ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $posts = new Posts;
        $response = $posts -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

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
    public function get_uploads ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $uploads = new Uploads;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $uploads -> get($conn, $params, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function create_uploads ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $uploads = new Uploads;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $uploads -> create($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function update_uploads ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $uploads = new Uploads;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $uploads -> update($conn, $data, $languages['language_active']);
        $conn -> close();

        return $response;
    }

    public function toggle_uploads ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $uploads = new Uploads;
        $response = $uploads -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_uploads ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $uploads = new Uploads;
        $response = $uploads -> delete($conn, $data);
        $conn -> close();

        return $response;
    }

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
     * SettingsBlacklist / Visitor Blacklist
     **/
    public function get_visitorBlacklist ($params = []): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $visitorBlacklist = new VisitorBlacklist;
        $response = $visitorBlacklist -> get($conn, $params);
        $conn -> close();

        return $response;
    }

    public function create_visitorBlacklist ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $visitorBlacklist = new VisitorBlacklist;
        $response = $visitorBlacklist -> create($conn, $data);
        $conn -> close();

        return $response;
    }

    public function update_visitorBlacklist ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $visitorBlacklist = new VisitorBlacklist;
        $response = $visitorBlacklist -> update($conn, $data);
        $conn -> close();

        return $response;
    }

    public function toggle_visitorBlacklist ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $visitorBlacklist = new VisitorBlacklist;
        $response = $visitorBlacklist -> toggle($conn, $data);
        $conn -> close();

        return $response;
    }

    public function delete_visitorBlacklist ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $visitorBlacklist = new VisitorBlacklist;
        $response = $visitorBlacklist -> delete($conn, $data);
        $conn -> close();

        return $response;
    }


    /**
     * Settings ...
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


    /**
     * System ...
     **/
    public function create_log ($attrs) {
        $system = new System;

        return $system -> create_log($attrs);
    }

    public function get_log_list () {
        $system = new System;

        return $system -> get_log_list();
    }

    public function install_language ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $system = new System;
        $settings = new Settings;
        $response = $system -> install_language($conn, $data);
        $update_fields = [
            'language_installed' => $data['installed'],
        ];
        $response['update'] = $settings -> update_cms_settings($conn, $update_fields);
        $conn -> close();

        return $response;
    }

    public function export_data ($data): array {
        // $conn = new mysqli(...CFG_DB_CONN);
        $system = new System;
        $response = $system -> export_data($data);
        // $conn -> close();

        return $response;
    }

    public function delete_permanent_items (): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $system = new System;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $system -> delete_permanent_items($conn, $languages['language_installed']);
        $conn -> close();

        return $response;
    }

    public function delete_permanent_uploads (): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $system = new System;
        $settings = new Settings;
        $languages = $settings -> get_cms_languages($conn);
        $response = $system -> delete_permanent_uploads($conn, $languages['language_installed']);
        $conn -> close();

        return $response;
    }


}