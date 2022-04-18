<?php

namespace core\module\web\controller;

use core\provider\DataProvider;

class MemberController {

    public function get_member (): array {
        $dc = new DataProvider;
        $member_profile = $dc -> get_member_profile([]);
        $members_settings = $dc -> get_cms_members();
        $web_settings = $dc -> get_cms_web();
        $actions = [
            'search' => true,
            'comments_create' => false,
            'messages_create' => false,
            'registration' => false,
            'login' => false,
            'lostPassword' => false,
            'view_profile' => false,
            'edit_profile' => false,
        ];

        if ($web_settings['comments_global_active']) $actions['comments_create'] = true;
        if ($web_settings['comments_anonymous']) $actions['comments_create'] = true;
        if ($members_settings['members_register_active']) $actions['registration'] = true;
        if ($members_settings['members_login_active']) $actions['login'] = true;
        if ($members_settings['members_lostPassword_active']) $actions['lostPassword'] = true;
        if ($member_profile) {
            if ($members_settings['members_profile_active']) $actions['view_profile'] = true;
            $actions['edit_profile'] = true;
            $actions['comments_create'] = true;
            $actions['messages_create'] = true;
        }

        return [
            'profile' => $member_profile,
            'actions' => $actions,
        ];
    }

}