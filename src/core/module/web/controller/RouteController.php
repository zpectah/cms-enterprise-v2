<?php

namespace core\module\web\controller;

use core\common\Helpers;

class RouteController {

    public function get_url_attrs (): array {
        $helpers = new Helpers;
        $request_url_trimmed = ltrim( $helpers -> get_key($_SERVER, 'REDIRECT_URL'), "/" );
        $request_array = explode( "/", $request_url_trimmed );
        unset($request_array[0]); // unset 'web/'
        unset($request_array[1]); // unset 'www/'
        $listed = array_values($request_array);
        $parsed = '/' . implode('/', $listed);
        $model = 'unknown';
        $context = 'unknown';
        $page = $helpers -> get_key($listed, [ 0 ]);
        $detail = $helpers -> get_key($listed, [ 1 ]) == 'detail';
        $id = $helpers -> get_key($listed, [ 2 ]);

        if ($detail && $id) $context = 'category';
        if ($helpers -> get_key($listed, [ 0 ]) === 'detail' && $helpers -> get_key($listed, [ 2 ])) {
            if ($helpers -> get_key($listed, [ 1 ]) == 'posts') {
                $detail = true;
                $id = $helpers -> get_key($listed, [ 2 ]);
                $context = 'detail';
                $model = 'posts';
            }
        }

        return [
            'url' => $request_url_trimmed,
            'listed' => $listed,
            'parsed' => $parsed,
            'page' => $page,
            'detail' => $detail,
            'id' => $id,
            'context' => $context,
            'model' => $model,
        ];
    }

    public function get_url_params (): array {
        $helpers = new Helpers;
        return [
            'lang' => $helpers -> get_key($_GET, 'lang'),
            'search' => $helpers -> get_key($_GET, 'search'),
            'email' => $helpers -> get_key($_GET, 'email'),
            'page' => $helpers -> get_key($_GET, 'page'),
            'limit' => $helpers -> get_key($_GET, 'limit'),
        ];
    }

}