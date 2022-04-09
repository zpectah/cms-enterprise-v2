<?php

namespace app\controller;

class RouteController {

    public function get_url_attrs (): array {
        $request_url_trimmed = ltrim( $_SERVER['REDIRECT_URL'], "/" );
        $request_array = explode( "/", $request_url_trimmed );
        unset($request_array[0]); // unset 'web/'
        unset($request_array[1]); // unset 'www/'

        $listed = array_values($request_array);
        $model = 'unknown';
        $context = 'unknown';
        $page = $listed[0];
        $detail = $listed[1] == 'detail' ? true : false;
        $id = $listed[2];
        if ($detail && $id) $context = 'category';
        if ($listed[0] === 'detail' && $listed[2]) {
            if ($listed[1] == 'posts') {
                $detail = true;
                $id = $listed[2];
                $context = 'detail';
                $model = 'posts';
            }
        }

        return [
            'listed' => $listed,
            'page' => $page,
            'detail' => $detail,
            'id' => $id,
            'context' => $context,
            'model' => $model,
        ];
    }

    public function get_url_params (): array {
        return [

            // Languages
            'lang' => $_GET['lang'],

            // Search string
            'search' => $_GET['search'],

            // Lists paginating & limit
            'page' => $_GET['page'],
            'limit' => $_GET['limit'],

        ];
    }

}