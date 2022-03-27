<?php

namespace core\module\admin;

use core\common\Helpers;
use core\model\CmsRequests;
use core\model\Users;
use core\service\AuthService;
use core\service\EmailService;

class Profile {

    public function get_user_profile ($conn): array {
        $response = [];
        $as = new AuthService;
        $email = $as -> get_user_session();
        $users = new Users;
        if ($email) $response = $users -> get($conn, ['email' => $email]);

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
        $email = $data['email'];
        $password = $data['password'];
        $user = $users -> get($conn, ['email' => $email, 'with_password' => true], []);
        if ($user) {
            $response['message'] = 'user_password_not_match';
            if ($user['active'] == 0) {
                $response['message'] = 'user_not_active';
            } else if ($user['deleted'] == 1) {
                $response['message'] = 'user_is_deleted';
            } else if ($helpers -> password_verify($password, $user['password'])) {
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
        $sender = $settings['form_email_sender'];
        $email = $data['email'];
        $user = $users -> get($conn, ['email' => $email]);
        if ($user) {
            if ($user['active'] == 0) {
                $response['message'] = 'user_not_active';
            } else if ($user['deleted'] == 1) {
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
                    'token' => $token
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
        $rd_password_raw = $data['password'];
        $rd_token = $data['token'];
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
        $sender = $settings['form_email_sender'];
        $token = $data['token'];
        $request_row = $cmsRequests -> get($conn, ['token' => $token]);
        if ($token) {
            if ($request_row) {
                if ($request_row['status'] == 1) {
                    $user_row = $users -> get($conn, ['email' => $request_row['value']]);
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
                            'token' => $request_row['token']
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