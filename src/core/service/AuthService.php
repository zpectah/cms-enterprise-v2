<?php

namespace core\service;

use core\common\Helpers;

class AuthService {

    // Application
    public function start_app_session () {
        $helpers = new Helpers;
        $sess = $helpers -> get_key($_SESSION, SESSION_APP_TOKEN_PREFIX);
        if ($sess) {
            $token = $sess;
        } else {
            $token = bin2hex(random_bytes(8));
            $_SESSION[SESSION_APP_TOKEN_PREFIX] = $token;
        }

        return $token;
    }
    public function get_app_token () {
        $helpers = new Helpers;
        $sess = $helpers -> get_key($_SESSION, SESSION_APP_TOKEN_PREFIX);

        return $sess;
    }

    // User / Profile
    public function get_user_session () {
        $helpers = new Helpers;
        $sess = $helpers -> get_key($_SESSION, SESSION_USER_NAME_PREFIX);

        return $sess;
    }
    public function get_user_token () {
        $helpers = new Helpers;
        $sess = $helpers -> get_key($_SESSION, SESSION_USER_TOKEN_PREFIX);

        return $sess;
    }
    public function start_user_session ($email): array {
        return [
            $_SESSION[SESSION_USER_TOKEN_PREFIX] = bin2hex(random_bytes(16)),
            $_SESSION[SESSION_USER_NAME_PREFIX] = $email,
        ];
    }
    public function close_user_session (): array {
        unset($_SESSION[SESSION_USER_TOKEN_PREFIX]);
        unset($_SESSION[SESSION_USER_NAME_PREFIX]);

        return [
            isset($_SESSION[SESSION_USER_TOKEN_PREFIX]) ?? $_SESSION[SESSION_USER_TOKEN_PREFIX],
            isset($_SESSION[SESSION_USER_NAME_PREFIX]) ?? $_SESSION[SESSION_USER_NAME_PREFIX],
        ];
    }

    // Member
    public function get_member_session () {
        $helpers = new Helpers;
        $sess = $helpers -> get_key($_SESSION, SESSION_MEMBER_NAME_PREFIX);

        return $sess;
    }
    public function get_member_token () {
        $helpers = new Helpers;
        $sess = $helpers -> get_key($_SESSION, SESSION_MEMBER_TOKEN_PREFIX);

        return $sess;
    }
    public function start_member_session ($email): array {
        return [
            $_SESSION[SESSION_MEMBER_TOKEN_PREFIX] = bin2hex(random_bytes(16)),
            $_SESSION[SESSION_MEMBER_NAME_PREFIX] = $email,
        ];
    }
    public function close_member_session (): array {
        unset($_SESSION[SESSION_MEMBER_TOKEN_PREFIX]);
        unset($_SESSION[SESSION_MEMBER_NAME_PREFIX]);

        return [
            isset($_SESSION[SESSION_MEMBER_TOKEN_PREFIX]) ?? $_SESSION[SESSION_MEMBER_TOKEN_PREFIX],
            isset($_SESSION[SESSION_MEMBER_NAME_PREFIX]) ?? $_SESSION[SESSION_MEMBER_NAME_PREFIX],
        ];
    }

}