<?php

namespace core\module\web\controller;

use core\common\Helpers;
use core\provider\DataProvider;

class MemberController {

    public function get_member (): array {
        $dc = new DataProvider;
        $helpers = new Helpers;
        $member_profile = $dc -> get_member_profile([]);
        $members_settings = $dc -> get_cms_members();
        $web_settings = $dc -> get_cms_web();
        $actions = [
            'search' => true,
            'comments_view' => false,
            'comments_create' => false,
            'messages_create' => false,
            'registration' => false,
            'subscription' => false,
            'login' => false,
            'lostPassword' => false,
            'profile_view' => false,
            'profile_edit' => false,
        ];

        $commentsGlobalActive = $helpers -> get_key($web_settings, 'comments_global_active');
        $commentsAnonymousActive = $helpers -> get_key($web_settings, 'comments_anonymous_active');
        $membersEnabled = $helpers -> get_key($members_settings, 'members_enabled');
        $membersLoginActive = $helpers -> get_key($members_settings, 'members_login_active');
        $membersLostPasswordActive = $helpers -> get_key($members_settings, 'members_lostPassword_active');
        $membersRegisterActive = $helpers -> get_key($members_settings, 'members_register_active');
        $membersProfileActive = $helpers -> get_key($members_settings, 'members_profile_active');

        if ($commentsGlobalActive) {
            $actions['comments_view'] = true;
            if ($commentsAnonymousActive) {
                $actions['messages_create'] = true;
                $actions['comments_create'] = true;
            }
        }
        if ($membersEnabled) {
            if ($membersLoginActive) $actions['login'] = true;
            if ($membersLostPasswordActive) $actions['lostPassword'] = true;
            if ($membersRegisterActive) {
                $actions['registration'] = true;
                $actions['subscription'] = true;
            }
            if (isset($member_profile)) {
                $actions['comments_create'] = true;
                $actions['messages_create'] = true;
                if ($membersProfileActive) {
                    $actions['profile_view'] = true;
                    $actions['profile_edit'] = true;
                }
            }
        }

        return [
            'profile' => $member_profile,
            'actions' => $actions,
        ];
    }

}