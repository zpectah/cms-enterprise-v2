<?php

namespace core\service;

class AuthService {

    // Application
    public function start_app_session () {
        session_start();
        $token = bin2hex(random_bytes(8));
        $_SESSION[SESSION_APP_TOKEN_PREFIX] = $token;

        return $token;
    }
    public function get_app_token () {
        session_start();

        return $_SESSION[SESSION_APP_TOKEN_PREFIX];
    }
//    public function close_app_session () {
//        session_start();
//        unset($_SESSION[SESSION_APP_TOKEN_PREFIX]);
//
//        return $_SESSION[SESSION_APP_TOKEN_PREFIX];
//    }

    // User / Profile
    public function get_user_session () {
        session_start();

        return $_SESSION[SESSION_USER_NAME_PREFIX];
    }
    public function get_user_token () {
        session_start();

        return $_SESSION[SESSION_USER_TOKEN_PREFIX];
    }
    public function start_user_session ($email): array {
        session_start();

        return [
            $_SESSION[SESSION_USER_TOKEN_PREFIX] = bin2hex(random_bytes(16)),
            $_SESSION[SESSION_USER_NAME_PREFIX] = $email,
        ];
    }
    public function close_user_session (): array {
        session_start();
        unset($_SESSION[SESSION_USER_TOKEN_PREFIX]);
        unset($_SESSION[SESSION_USER_NAME_PREFIX]);

        return [
            $_SESSION[SESSION_USER_TOKEN_PREFIX],
            $_SESSION[SESSION_USER_NAME_PREFIX],
        ];
    }

    // Member
    public function get_member_session () {
        session_start();

        return $_SESSION[SESSION_MEMBER_NAME_PREFIX];
    }
    public function get_member_token () {
        session_start();

        return $_SESSION[SESSION_MEMBER_TOKEN_PREFIX];
    }
    public function start_member_session ($email): array {
        session_start();

        return [
            $_SESSION[SESSION_MEMBER_TOKEN_PREFIX] = bin2hex(random_bytes(16)),
            $_SESSION[SESSION_MEMBER_NAME_PREFIX] = $email,
        ];
    }
    public function close_member_session (): array {
        session_start();
        unset($_SESSION[SESSION_MEMBER_TOKEN_PREFIX]);
        unset($_SESSION[SESSION_MEMBER_NAME_PREFIX]);

        return [
            $_SESSION[SESSION_MEMBER_TOKEN_PREFIX],
            $_SESSION[SESSION_MEMBER_NAME_PREFIX],
        ];
    }

}