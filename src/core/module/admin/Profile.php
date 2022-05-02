<?php

namespace core\module\admin;

use core\common\Helpers;
use core\model\CmsRequests;
use core\model\Users;
use core\service\AuthService;
use core\service\EmailService;

class Profile {

    private function get_entity_actions ($level): array {
        $actions = [
            'profile' => [
                'active' => true,
                'view' => true,
                'update' => true,
            ],
        ];
        $md = [
            'view' => true,
            'update' => true,
            'delete' => true,
            'create' => true,
        ];

        switch ($level) {

            case 3: // Redactor
                $actions['Posts'] = [
                    'view' => true,
                    'update' => true,
                    'delete' => false,
                    'create' => true,
                ];
                $actions['Translations'] = [
                    'view' => true,
                    'update' => true,
                    'delete' => false,
                    'create' => true,
                ];
                $actions['Categories'] = [
                    'view' => true,
                    'update' => true,
                    'delete' => false,
                    'create' => true,
                ];
                $actions['Uploads'] = [
                    'view' => true,
                    'update' => true,
                    'delete' => false,
                    'create' => true,
                ];
                $actions['Tags'] = [
                    'view' => true,
                    'update' => true,
                    'delete' => false,
                    'create' => true,
                ];
                break;

            case 5: // Manager
                $actions['settings'] = [
                    'view' => true,
                    'update' => true,
                    'language' => true,
                    'maintenance' => false,
                    'blacklist' => false,
                ];
                $actions['Posts'] = $md;
                $actions['Translations'] = $md;
                $actions['Categories'] = $md;
                $actions['Uploads'] = $md;
                $actions['Tags'] = $md;
                $actions['Users'] = [
                    'view' => true,
                    'update' => true,
                    'delete' => false,
                    'create' => true,
                    'admin' => false,
                ];
                $actions['Pages'] = $md;
                $actions['Menu'] = $md;
                $actions['MenuItems'] = $md;
                $actions['Members'] = $md;
                $actions['Messages'] = $md;

                break;

            case 7: // Admin
                $actions['settings'] = [
                    'view' => true,
                    'update' => true,
                    'language' => true,
                    'maintenance' => true,
                    'blacklist' => true,
                ];
                $actions['Posts'] = $md;
                $actions['Translations'] = $md;
                $actions['Categories'] = $md;
                $actions['Uploads'] = $md;
                $actions['Tags'] = $md;
                $actions['Users'] = [
                    'view' => true,
                    'update' => true,
                    'delete' => true,
                    'create' => true,
                    'admin' => true,
                ];
                $actions['Pages'] = $md;
                $actions['Menu'] = $md;
                $actions['MenuItems'] = $md;
                $actions['Members'] = $md;
                $actions['Messages'] = $md;

                break;

        }

        return $actions;
    }

    public function get_user_profile ($conn): array {
        $response = [];
        $as = new AuthService;
        $email = $as -> get_user_session();
        $users = new Users;
        if ($email) {
            $response = $users -> get($conn, ['email' => $email]);
            $response['entity_actions'] = self::get_entity_actions($response['item_level']);
        }

        return $response;
    }

    public function user_update_profile ($conn, $data): array {
        $users = new Users;

        return $users -> update($conn, $data);
    }

    public function user_login ($conn, $data): array {
        $response = [
            'message' => 'user_not_found',
            'session' => null,
        ];
        $as = new AuthService;
        $users = new Users;
        $helpers = new Helpers;
        $email = $helpers -> get_key($data, 'email');
        $password = $helpers -> get_key($data, 'password');
        $user = $users -> get($conn, ['email' => $email, 'with_password' => true], []);
        if ($user) {
            $response['message'] = 'user_password_not_match';
            $user_password = $helpers -> get_key($user, 'password');
            $user_active = $helpers -> get_key($user, 'active');
            $user_deleted = $helpers -> get_key($user, 'deleted');
            if ($user_active == 0) {
                $response['message'] = 'user_not_active';
            } else if ($user_deleted == 1) {
                $response['message'] = 'user_is_deleted';
            } else if ($helpers -> password_verify($password, $user_password)) {
                $response['session'] = $as -> start_user_session($email);
                $response['message'] = 'user_login_success';
            }
        }

        return $response;
    }

    public function user_logout (): array {
        $as = new AuthService;

        return $as -> close_user_session();
    }

    public function user_lost_password ($conn, $data): array {
        $response = [
            'message' => 'user_not_found',
            'email' => null,
            'row' => null,
        ];
        $es = new EmailService;
        $users = new Users;
        $cmsRequests = new CmsRequests;
        $settings = new Settings;
        $helpers = new Helpers;
        $sender = $settings -> get_cms_settings($conn)['form_email_sender'];
        $email = $helpers -> get_key($data, 'email');
        $user = $users -> get($conn, ['email' => $email]);
        if ($user) {
            $user_active = $helpers -> get_key($user, 'active');
            $user_deleted = $helpers -> get_key($user, 'deleted');
            if ($user_active == 0) {
                $response['message'] = 'user_not_active';
            } else if ($user_deleted == 1) {
                $response['message'] = 'user_is_deleted';
            } else {
                $token = $helpers -> get_token(16, '');
                $confirm_url = URL_USER_LOST_PASSWORD_TOKEN . $token;
                $response['email'] = $es -> send_email_message(
                    $email,
                    "Lost password request",
                    "<div>Confirm password reset<br /><a href='" . $confirm_url ."' target='_blank'>this link</a></div>",
                    null,
                    "lost_password",
                    $sender
                );
                $response['row'] = $cmsRequests -> create($conn, [
                    'type' => 'user',
                    'context' => 'lost_password',
                    'value' => $email,
                    'token' => $token,
                    'ip_address' => $helpers -> get_client_ip_address(),
                ]);
                $response['message'] = 'request_was_send';
            }
        }

        return $response;
    }

    public function user_create_new_password ($conn, $data): array {
        $response = [
            'message' => 'user_password_reset_error',
            'request' => null,
            'user' => null,
        ];
        $users = new Users;
        $cmsRequests = new CmsRequests;
        $helpers = new Helpers;
        $rd_password_raw = $helpers -> get_key($data, 'password');
        $rd_token = $helpers -> get_key($data, 'token');
        if ($rd_token) {
            $request_row = $cmsRequests -> get($conn, ['token' => $rd_token]);
            if ($request_row) {
                if ($request_row['status'] == 1) {
                    $user_row = $users -> get($conn, ['email' => $request_row['value']]);
                    $user_row['password'] = $rd_password_raw;
                    $response['user'] = $users -> update($conn, $user_row);
                    $response['request'] = $cmsRequests -> update($conn, [
                        'status' => 2,
                        'token' => $rd_token
                    ]);
                    $response['message'] = 'user_password_reset_success';
                } else {
                    $response['message'] = 'user_password_already_reset';
                }
            } else {
                $response['message'] = 'request_not_found';
            }
        } else {
            $response['message'] = 'token_not_found';
        }

        return $response;
    }

    public function user_lost_password_reset ($conn, $data): array {
        $response = [
            'message' => 'user_password_reset_error',
            'email' => null,
            'request' => null,
            'user' => null,
        ];
        $es = new EmailService;
        $users = new Users;
        $cmsRequests = new CmsRequests;
        $settings = new Settings;
        $helpers = new Helpers;
        $sender = $helpers -> get_key($settings, 'form_email_sender');
        $token = $helpers -> get_key($data, 'token');
        $request_row = $cmsRequests -> get($conn, ['token' => $token]);
        if ($token) {
            if ($request_row) {
                if ($request_row['status'] == 1) {
                    $value = $helpers -> get_key($request_row, 'value');
                    $token = $helpers -> get_key($request_row, 'token');
                    $user_row = $users -> get($conn, ['email' => $value]);
                    if ($user_row) {
                        $tmp_password = $helpers -> get_token(4, '');
                        $response['email'] = $es -> send_email_message(
                            $user_row['email'],
                            "New password",
                            "<div>This is your new password: <b>" . $tmp_password .  "</b><br /> Keep it safe, or change after login</div>",
                            null,
                            'password_reset',
                            $sender
                        );
                        $response['request'] = $cmsRequests -> update($conn, [
                            'status' => 2,
                            'token' => $token
                        ]);
                        $user_row['password'] = $tmp_password;
                        $response['user'] = $users -> update($conn, $user_row);
                        $response['message'] = 'user_password_reset_success';
                    }
                } else {
                    $response['message'] = 'user_password_already_reset';
                }
            } else {
                $response['message'] = 'request_not_found';
            }
        } else {
            $response['message'] = 'token_not_found';
        }

        return $response;
    }

}