<?php

namespace core\provider;

class ApiProvider {

    private function is_user_authorized (): bool {
        $authorized = true;
        //
        // TODO
        //

        return $authorized;
    }

    private function get_data ($path, $data, $params): array {
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

        switch ($path) {

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
            case 'get_users':
                $response['data'] = $dp -> get_users($params);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'create_users':
                $response['data'] = $dp -> create_users($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['id'] ? $msg_success : $msg_noCreated;
                break;

            case 'update_users':
                $response['data'] = $dp -> update_users($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data']['rows'] ? $msg_success : $msg_noUpdated;
                break;

            case 'toggle_users':
                $response['data'] = $dp -> toggle_users($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                break;

            case 'delete_users':
                $response['data'] = $dp -> delete_users($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                break;


            /**
             * System ...
             **/
            case 'get_cms_settings':
                $response['data'] = $dp -> get_cms_settings();
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noData;
                break;

            case 'update_cms_settings':
                $response['data'] = $dp -> update_cms_settings($data);
                $response['status'] = 'ok';
                $response['message'] = $response['data'] ? $msg_success : $msg_noUpdated;
                break;

        }

        return $response;
    }

    public function get_response (): array {
        $response = [
            'data' =>                  null,
            'status' =>                'error',
            'message' =>               MESSAGES['API']['REQUEST_ERROR'],
        ];
        $is_authorized =               self::is_user_authorized();
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
        ];

        if (!$is_authorized) {
            $response['message'] = MESSAGES['API']['UNAUTHORIZED'];
        } else {
            $response = self::get_data(
                $request_url_base,
                $request_data,
                $request_params
            );
        }

        // TODO #DEV
        $response['request'] = [
            'path' => $request_url_base,
            'params' => $request_params,
            'data' => $request_data,
        ];
        //

        return $response;
    }

}