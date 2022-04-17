<?php

namespace core\module\web\controller;

use core\provider\DataProvider;

class MemberController {

    public function get_member (): array {
        $dc = new DataProvider;
        $member_profile = $dc -> get_member_profile([]);

        return [
            'profile' => $member_profile,
            'actions' => [
                'comments_create' => !!$member_profile,
                'comments_update' => false,
                'comments_author_update' => false,
                'message_create' => true,
            ],
        ];
    }

}