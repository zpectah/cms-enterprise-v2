<?php

namespace app\controller;

class RouteController {

    public function get_url_attrs (): array {
        $request_url_trimmed = ltrim( $_SERVER['REDIRECT_URL'], "/" );
        $request_array = explode( "/", $request_url_trimmed );
        unset($request_array[0]); // unset 'web/'
        unset($request_array[1]); // unset 'www/'

        return array_values($request_array);
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