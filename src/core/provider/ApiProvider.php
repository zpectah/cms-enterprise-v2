<?php

namespace core\provider;

use core\service\AuthService;

class ApiProvider {

    private function get_data ($path, $data, $params, $auth): array {
        $response = [
            'data' => null,
            'status' => 'error',
            'message' => MESSAGES['API']['WRONG_REQUEST'],
        ];
        $dp = new DataProvider;

        $msg_success = MESSAGES['API']['SUCCESS'];
        $msg_noData = MESSAGES['API']['NO_DATA'];
        $msg_noCreated = MESSAGES['API']['NO_CREATED'];
        $msg_noUpdated = MESSAGES['API']['NO_UPDATED'];
        $msg_unauthorized = MESSAGES['API']['UNAUTHORIZED'];

        switch ($path) {

            /**
             * Categories
             **/
            case 'get_categories':
                $response['data'] = $dp -> get_categories($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_categories':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_categories($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_categories':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_categories($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_categories':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_categories($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_categories':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_categories($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * CmsRequests
             **/
            case 'get_cms_requests':
                $response['data'] = $dp -> get_cmsRequests($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_cms_requests':
                if ($auth['user'] || $auth['member']) {
                    $response['data'] = $dp -> create_cmsRequests($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_cms_requests':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_cmsRequests($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_cms_requests':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_cmsRequests($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_cms_requests':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_cmsRequests($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Comments
             **/
            case 'get_comments':
                $response['data'] = $dp -> get_comments($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_comments':
                $response['data'] = $dp -> create_comments($data);
                $response['status'] = 'ok';
                if ($response['data']['error']) {
                    $response['message'] = $response['data']['error'];
                } else {
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                }
                break;

            case 'update_comments':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_comments($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_comments':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_comments($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_comments':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_comments($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'confirm_comments':
                if ($auth['user']) {
                    $response['data'] = $dp -> confirm_comments($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'report_comments':
                if ($auth['user']) {
                    $response['data'] = $dp -> report_comments($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Members
             **/
            case 'get_members':
                $response['data'] = $dp -> get_members($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_members':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_members($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_members':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_members($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_members':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_members($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_members':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_members($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Menu
             **/
            case 'get_menu':
                $response['data'] = $dp -> get_menu($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_menu':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_menu($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_menu':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_menu($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_menu':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_menu($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_menu':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_menu($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * MenuItems
             **/
            case 'get_menu_items':
                $response['data'] = $dp -> get_menuItems($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_menu_items':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_menuItems($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_menu_items':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_menuItems($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_menu_items':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_menuItems($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_menu_items':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_menuItems($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Messages
             **/
            case 'get_messages':
                $response['data'] = $dp -> get_messages($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_messages':
                $response['data'] = $dp -> create_messages($data);
                $response['status'] = 'ok';
                if ($response['data']['error']) {
                    $response['message'] = $response['data']['error'];
                } else {
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                }
                break;

            case 'update_messages':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_messages($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_messages':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_messages($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_messages':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_messages($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'mark_read_messages':
                if ($auth['user']) {
                    $response['data'] = $dp -> mark_read_messages($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Pages
             **/
            case 'get_pages':
                $response['data'] = $dp -> get_pages($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'search_pages':
                $response['data'] = $dp -> search_pages($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_pages':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_pages($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_pages':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_pages($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_pages':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_pages($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_pages':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_pages($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Posts
             **/
            case 'get_posts':
                $response['data'] = $dp -> get_posts($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'search_posts':
                $response['data'] = $dp -> search_posts($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_posts':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_posts($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_posts':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_posts($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_posts':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_posts($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_posts':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_posts($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'like_posts':
                $response['data'] = $dp -> like_posts($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                break;

            case 'dislike_posts':
                $response['data'] = $dp -> dislike_posts($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                break;

            /**
             * Tags
             **/
            case 'get_tags':
                $response['data'] = $dp -> get_tags($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_tags':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_tags($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_tags':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_tags($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_tags':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_tags($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_tags':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_tags($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Translations
             **/
            case 'get_translations':
                $response['data'] = $dp -> get_translations($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_translations':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_translations($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_translations':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_translations($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_translations':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_translations($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_translations':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_translations($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Uploads
             **/
            case 'get_uploads':
                $response['data'] = $dp -> get_uploads($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_uploads':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_uploads($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_uploads':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_uploads($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_uploads':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_uploads($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_uploads':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_uploads($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Users
             **/
            case 'get_users':
                $response['data'] = $dp -> get_users($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_users':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_users($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_users':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_users($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_users':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_users($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_users':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_users($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * SettingsBlacklist / Visitor Blacklist
             **/
            case 'get_visitor_blacklist':
                $response['data'] = $dp -> get_visitorBlacklist($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_visitor_blacklist':
                if ($auth['user']) {
                    $response['data'] = $dp -> create_visitorBlacklist($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_visitor_blacklist':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_visitorBlacklist($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'toggle_visitor_blacklist':
                if ($auth['user']) {
                    $response['data'] = $dp -> toggle_visitorBlacklist($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_visitor_blacklist':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_visitorBlacklist($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Settings ...
             **/
            case 'get_cms_settings':
                $response['data'] = $dp -> get_cms_settings();
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'update_cms_settings':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_cms_settings($data);
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'get_cms_languages':
                if ($auth['user']) {
                    $response['data'] = $dp -> get_cms_languages();
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'get_cms_web':
                if ($auth['user']) {
                    $response['data'] = $dp -> get_cms_web();
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'get_cms_company':
                if ($auth['user']) {
                    $response['data'] = $dp -> get_cms_company();
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'get_cms_members':
                if ($auth['user']) {
                    $response['data'] = $dp -> get_cms_members();
                    $response['status'] = 'ok';
                    $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            /**
             * Profile
             **/
            case 'get_user_profile':
                if ($auth['user']) {
                    $response['data'] = $dp -> get_user_profile($data);
                    $response['status'] = 'ok';
                    $response['message'] = $msg_success;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_user_profile':
                if ($auth['user']) {
                    $response['data'] = $dp -> update_user_profile($data);
                    $response['status'] = 'ok';
                    $response['message'] = $msg_success;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'user_login':
                $response['data'] = $dp -> user_login($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'] ?? $response['message'];
                break;

            case 'user_logout':
                $response['data'] = $dp -> user_logout();
                $response['status'] = 'ok';
                $response['message'] = $msg_success;
                break;

            case 'user_lost_password':
                $response['data'] = $dp -> user_lost_password($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'] ?? $response['message'];
                break;

            case 'user_lost_password_reset':
                $response['data'] = $dp -> user_lost_password_reset($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'] ?? $response['message'];
                break;

            case 'user_create_new_password':
                $response['data'] = $dp -> user_create_new_password($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'] ?? $response['message'];
                break;

            /**
             * Member profile
             **/
            case 'get_member_profile':
                if ($auth['member']) {
                    $response['data'] = $dp -> get_member_profile($data);
                    $response['status'] = 'ok';
                    $response['message'] = $msg_success;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'update_member_profile':
                if ($auth['member']) {
                    $response['data'] = $dp -> update_member_profile($data);
                    $response['status'] = 'ok';
                    $response['message'] = $msg_success;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'member_subscribe':
                $response['data'] = $dp -> member_subscribe($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'];
                break;

            case 'member_registration':
                $response['data'] = $dp -> member_registration($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'];
                break;

            case 'member_login':
                $response['data'] = $dp -> member_login($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'] ?? $response['message'];
                break;

            case 'member_logout':
                $response['data'] = $dp -> member_logout();
                $response['status'] = 'ok';
                $response['message'] = $msg_success;
                break;

            case 'member_lost_password':
                $response['data'] = $dp -> member_lost_password($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'] ?? $response['message'];
                break;

            case 'member_lost_password_reset':
                $response['data'] = $dp -> member_lost_password_reset($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'] ?? $response['message'];
                break;

            case 'member_create_new_password':
                $response['data'] = $dp -> member_create_new_password($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['message'] ?? $response['message'];
                break;

            /**
             * System ...
             **/
            case 'create_log':
                $response['data'] = $dp -> create_log($data);
                $response['status'] = 'ok';
                // $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                $response['message'] = 'Success'; // TODO
                break;

            case 'get_log_list':
                $response['data'] = $dp -> get_log_list();
                $response['status'] = 'ok';
                // $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                $response['message'] = 'Success'; // TODO
                break;

            case 'install_language':
                if ($auth['user']) {
                    $response['data'] = $dp -> install_language($data);
                    $response['status'] = 'ok';
                    $response['message'] = $msg_success;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'export_data':
                if ($auth['user']) {
                    $response['data'] = $dp -> export_data($data);
                    $response['status'] = 'ok';
                    $response['message'] = $msg_success;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_permanent_items':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_permanent_items();
                    $response['status'] = 'ok';
                    $response['message'] = $msg_success;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

            case 'delete_permanent_uploads':
                if ($auth['user']) {
                    $response['data'] = $dp -> delete_permanent_uploads();
                    $response['status'] = 'ok';
                    $response['message'] = $msg_success;
                } else {
                    $response['message'] = $msg_unauthorized;
                }
                break;

        }

        return $response;
    }

    private function is_request_authorized (): bool {
        $authorized = false;
        $as = new AuthService;
        $request_app_token = $_SERVER['HTTP_X_APP_TOKEN'];
        $app_token = $as -> get_app_token();
        if ($request_app_token && $request_app_token === $app_token) $authorized = true;

        return $authorized;
    }

    private function is_user_authorized (): bool {
        $authorized = false;
        $as = new AuthService;
        $request_user_token = $_SERVER['HTTP_X_USER_TOKEN'];
        $user_token = $as -> get_user_token();
        if ($request_user_token && $request_user_token === $user_token) $authorized = true;

        return $authorized;
    }

    private function is_member_authorized (): bool {
        $authorized = false;
        $as = new AuthService;
        $request_member_token = $_SERVER['HTTP_X_MEMBER_TOKEN'];
        $member_token = $as -> get_member_token();
        if ($request_member_token && $request_member_token === $member_token) $authorized = true;

        return $authorized;
    }

    public function get_response (): array {
        $response = [
            'data' =>                  null,
            'status' =>                'error',
            'message' =>               MESSAGES['API']['REQUEST_ERROR'],
        ];
        $auth = [
            'app' =>                   self::is_request_authorized(),
            'user' =>                  self::is_user_authorized(),
            'member' =>                self::is_member_authorized(),
            'web' =>                   false, // TODO
        ];
        $request_url_trimmed =         ltrim( $_SERVER['REDIRECT_URL'], "/" );
        $request_url =                 explode( "/", $request_url_trimmed );
        $request_data_raw =            json_decode(file_get_contents('php://input'));
        $request_data =                json_decode(json_encode($request_data_raw), true);
        $request_url_base =            $request_url[1];
        $request_params = [
            'id' =>                    $_GET['id'],
            'name' =>                  $_GET['name'],
            'email' =>                 $_GET['email'],
            'with_password' =>         $_GET['with_password'],
            'token' =>                 $_GET['token'],
            'parsed' =>                $_GET['parsed'],
            'lang' =>                  $_GET['lang'],
            'sub' =>                   $_GET['sub'],
            'ids' =>                   $_GET['ids'],
            'check_exist' =>           $_GET['check_exist'],
            'with_children' =>         $_GET['with_children'],
            'assigned' =>              $_GET['assigned'],
            'assigned_id' =>           $_GET['assigned_id'],
            'menu_id' =>               $_GET['menu_id'],
        ];
        if ($auth['app'] || $auth['web']) {
            $response = self::get_data(
                $request_url_base,
                $request_data,
                $request_params,
                $auth,
            );
        } else {
            $response['message'] = MESSAGES['API']['UNAUTHORIZED'];
        }
        if (APP_DEBUG) $response['request'] = [
            'path' => $request_url_base,
            'params' => $request_params,
            'data' => $request_data,
            'auth' => $auth,
        ];

        return $response;
    }

}