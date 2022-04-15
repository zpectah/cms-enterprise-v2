<?php

namespace core\module\web;

use core\common\Helpers;
use core\model\CmsRequests;
use core\model\Members;
use core\model\VisitorBlacklist;
use core\module\admin\Settings;
use core\service\AuthService;
use core\service\EmailService;

class Member {

    public function get_member_profile ($conn): array {
        $response = [];
        $as = new AuthService;
        $email = $as -> get_member_session();
        $members = new Members;
        if ($email) $response = $members -> get($conn, ['email' => $email]);

        return $response;
    }

    public function member_update_profile ($conn, $data): array {
        $members = new Members;

        return $members -> update($conn, $data);
    }

    public function member_subscribe ($conn, $data): array {
        $members = new Members;
        $helpers = new Helpers;
        $blacklist = new VisitorBlacklist;
        $response = [
            'message' => 'member_subscribe_error',
        ];
        $should_create = false;
        $blacklisted = false;
        $ipAddress = $helpers -> get_client_ip_address();
        $allMembers = $members -> get($conn, []);
        $bl = $blacklist -> get($conn, []);
        foreach ($allMembers as $m) {
            if ($m['email'] !== $data['email']) {
                foreach ($bl as $li) {
                    if ($li['visitor_email'] == $data['email'] || $li['visitor_ip'] == $ipAddress) $blacklisted = true;
                }
                if ($blacklisted) {
                    $response['message'] = 'member_is_blacklisted';
                    $should_create = false;
                } else {
                    $should_create = true;
                }
            } else {
                $response['message'] = 'member_already_exist';
                $should_create = false;
            }
        }
        if ($should_create) {
            $updatedData = array_merge($data, [
                'ip_address' => $ipAddress,
                'type' => 'subscriber',
                'subscription' => true,
            ]);
            $member = $members -> create($conn, $updatedData);
            if ($member['id'] !== 0) {
                $response['message'] = 'member_success_created';
            } else {
                $response['message'] = 'member_not_created';
            }
        }

        return $response;
    }

    public function member_registration ($conn, $data): array {
        $members = new Members;
        $helpers = new Helpers;
        $blacklist = new VisitorBlacklist;
        $response = [
            'message' => 'member_registration_error',
        ];
        $should_create = false;
        $blacklisted = false;
        $ipAddress = $helpers -> get_client_ip_address();
        $allMembers = $members -> get($conn, []);
        $bl = $blacklist -> get($conn, []);
        foreach ($allMembers as $m) {
            if ($m['email'] !== $data['email']) {
                foreach ($bl as $li) {
                    if ($li['visitor_email'] == $data['email'] || $li['visitor_ip'] == $ipAddress) $blacklisted = true;
                }
                if ($blacklisted) {
                    $response['message'] = 'member_is_blacklisted';
                    $should_create = false;
                } else {
                    $should_create = true;
                }
            } else {
                $response['message'] = 'member_already_exist';
                $should_create = false;
            }
        }
        if ($should_create) {
            $updatedData = array_merge($data, [
                'ip_address' => $ipAddress,
                'type' => 'default',
            ]);
            $member = $members -> create($conn, $updatedData);
            if ($member['id'] !== 0) {
                $response['message'] = 'member_success_created';
            } else {
                $response['message'] = 'member_not_created';
            }
        }

        return $response;
    }

    public function member_login ($conn, $data): array {
        $response = [
            'message' => 'member_not_found',
            'session' => null,
        ];
        $as = new AuthService;
        $members = new Members;
        $helpers = new Helpers;
        $email = $data['email'];
        $password = $data['password'];
        $user = $members -> get($conn, ['email' => $email, 'with_password' => true], []);
        if ($user) {
            $response['message'] = 'member_password_mismatch';
            if ($user['active'] == 0) {
                $response['message'] = 'member_not_active';
            } else if ($user['deleted'] == 1) {
                $response['message'] = 'member_is_deleted';
            } else if ($helpers -> password_verify($password, $user['password'])) {
                $response['session'] = $as -> start_member_session($email);
                $response['message'] = 'member_login_success';
            }
        }

        return $response;
    }

    public function member_logout (): array {
        $as = new AuthService;

        return $as -> close_member_session();
    }

    public function member_lost_password ($conn, $data): array {
        $response = [
            'message' => 'member_not_found',
            'email' => null,
            'row' => null,
        ];
        $es = new EmailService;
        $members = new Members;
        $cmsRequests = new CmsRequests;
        $settings = new Settings;
        $helpers = new Helpers;
        $sender = $settings -> get_cms_settings($conn)['form_email_sender'];
        $email = $data['email'];
        $user = $members -> get($conn, ['email' => $email]);
        if ($user) {
            if ($user['active'] == 0) {
                $response['message'] = 'member_not_active';
            } else if ($user['deleted'] == 1) {
                $response['message'] = 'member_is_deleted';
            } else {
                $token = $helpers -> get_token(16, '');
                $confirm_url = URL_MEMBER_LOST_PASSWORD_TOKEN . $token;
                $response['email'] = $es -> send_email_message(
                    $email,
                    "Lost password request",
                    "<div>Confirm password reset<br /><a href='" . $confirm_url ."' target='_blank'>this link</a></div>",
                    null,
                    "lost_password",
                    $sender
                );
                $response['row'] = $cmsRequests -> create($conn, [
                    'type' => 'member',
                    'context' => 'lost_password',
                    'value' => $email,
                    'token' => $token
                ]);
                $response['message'] = 'request_was_send';
            }
        }

        return $response;
    }

    public function member_create_new_password ($conn, $data): array {
        $response = [
            'message' => 'member_password_reset_error',
            'request' => null,
            'user' => null,
        ];
        $members = new Members;
        $cmsRequests = new CmsRequests;
        $rd_password_raw = $data['password'];
        $rd_token = $data['token'];
        if ($rd_token) {
            $request_row = $cmsRequests -> get($conn, ['token' => $rd_token]);
            if ($request_row) {
                if ($request_row['status'] == 1) {
                    $member_row = $members -> get($conn, ['email' => $request_row['value']]);
                    $member_row['password'] = $rd_password_raw;
                    $response['member'] = $members -> update($conn, $member_row);
                    $response['request'] = $cmsRequests -> update($conn, [
                        'status' => 2,
                        'token' => $rd_token
                    ]);
                    $response['message'] = 'member_password_reset_success';
                } else {
                    $response['message'] = 'member_password_already_reset';
                }
            } else {
                $response['message'] = 'request_not_found';
            }
        } else {
            $response['message'] = 'token_not_found';
        }

        return $response;
    }

    public function member_lost_password_reset ($conn, $data): array {
        $response = [
            'message' => 'member_password_reset_error',
            'email' => null,
            'request' => null,
            'user' => null,
        ];
        $es = new EmailService;
        $members = new Members;
        $cmsRequests = new CmsRequests;
        $settings = new Settings;
        $helpers = new Helpers;
        $sender = $settings['form_email_sender'];
        $token = $data['token'];
        $request_row = $cmsRequests -> get($conn, ['token' => $token]);
        if ($token) {
            if ($request_row) {
                if ($request_row['status'] == 1) {
                    $user_row = $members -> get($conn, ['email' => $request_row['value']]);
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
                        $response['member'] = $members -> update($conn, $user_row);
                        $response['message'] = 'member_password_reset_success';
                    }
                } else {
                    $response['message'] = 'member_password_already_reset';
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