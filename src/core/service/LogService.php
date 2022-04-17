<?php

namespace core\service;

use core\common\Helpers;

class LogService {

    public function create_log ($attrs = [ 'type' => 'unknown', 'content' => 'undefined' ]): array {
        $helpers = new Helpers;
        $response = [
            'status' => 'error',
            'file' => null,
        ];
        $b = $helpers -> get_browser();

        $ip = $helpers -> get_client_ip_address();
        $url = $helpers -> get_current_url();
        $date = date("G:i:s");
        $platform = $b['platform'];
        $browser = $b['name'];
        $browser_v = $b['version'];
        $folder = PATHS['LOGS'] . '/' . date("Y");
        $file = date("Y-j-n") . '.log';

        // Create log row
        $log = '[';
        $log .= $date . '|';
        $log .= $platform . '|';
        $log .= $browser . ' ' . $browser_v . '|';
        $log .= $ip . '|';
        $log .= $url . '|';
        $log .= '[';
        $log .= $attrs['type'] . ':' . $attrs['content'];
        $log .= ']|';
        $log .= '];' . PHP_EOL;

        // Create folder if not exist and put file in
        $helpers -> create_folder($folder);
        $response['file'] = file_put_contents($folder . '/' . $file, $log, FILE_APPEND);
        if ($response['file']) $response['status'] = 'ok';

        return $response;
    }

    public function get_log_list (): array {

        // TODO #logs (Create list of logs if needed)
        return [];
    }

}