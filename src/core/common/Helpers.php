<?php

namespace core\common;

use Gumlet\ImageResize;

class Helpers {

    public function get_key($variable, $key_list, $default_value=null) {
        // https://adhoctuts.com/php-undefined-key/
        /**
         * Access keys or properties of array or object
         * @variable array|object - array or object variable
         * @key_list array|string - list of keys, valid inputs are: ['key1', 'key2'], 'key1', 'key1->key2->key3', etc.
         * @default_value mixed, the default value to return if key/property does not exist
         */
        if (!isset($variable)) return $default_value;
        if (is_string($key_list)) {
            $multi = false;
            foreach (['->', '=>', '.', ','] as $sep) {
                if (strpos($key_list, $sep) !== false) {
                    $key_list = explode($sep, $key_list);
                    $multi = true;
                    break;
                }
            }
            if (!$multi) $key_list = [$key_list];
        }
        $curr = $variable;
        foreach($key_list as $key) {
            if (is_object($curr)) $curr = $curr->$key ?? null;
            else if (is_array($curr)) $curr = $curr[$key] ?? null;
            else return $default_value;
            if (is_null($curr)) return $default_value;
        }
        return $curr;
    }

    public function get_current_url (): string {
        if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
            $url = "https://";
        else
            $url = "http://";
        $url.= $_SERVER['HTTP_HOST'];
        $url.= $_SERVER['REQUEST_URI'];

        return $url;
    }

    public function create_folder ($directory, $permissions = 0777): void {
        if (!file_exists($directory)) {
            $mask = umask(0);
            mkdir($directory, $permissions, true);
            umask($mask);
        }
    }

    public function get_random_string ($length = 10, $type = 'all'): string {
        $chars_nums = '0123456789';
        $chars_lower = 'abcdefghijklmnopqrstuvwxyz';
        $chars_upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        switch ($type) {

            case 'nums':
                $chars = $chars_nums;
                break;

            case 'lower':
                $chars = $chars_lower;
                break;

            case 'upper':
                $chars = $chars_upper;
                break;

            case 'all':
            default:
                $chars = $chars_nums . $chars_lower . $chars_upper;
                break;

        }

        $charactersLength = strlen($chars);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $chars[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function get_token ($length = 4, $separator = '-'): string {
        return self::get_random_string(($length/2), 'lower') . $separator . self::get_random_string($length, 'nums') . $separator . self::get_random_string(($length*2));
    }

    public function get_client_ip_address(): string {
        if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else{
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }

    public function get_browser (): array {
        $u_agent = isset($_SERVER['HTTP_USER_AGENT']) ?? $_SERVER['HTTP_USER_AGENT'];
        $bname = 'Unknown';
        $platform = 'Unknown';
        $version= "";
        $ub = "";

        //First get the platform?
        if (preg_match('/linux/i', $u_agent)) {
            $platform = 'linux';
        }elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
            $platform = 'mac';
        }elseif (preg_match('/windows|win32/i', $u_agent)) {
            $platform = 'windows';
        }

        // Next get the name of the useragent yes seperately and for good reason
        if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)){
            $bname = 'Internet Explorer';
            $ub = "MSIE";
        }elseif(preg_match('/Firefox/i',$u_agent)){
            $bname = 'Mozilla Firefox';
            $ub = "Firefox";
        }elseif(preg_match('/OPR/i',$u_agent)){
            $bname = 'Opera';
            $ub = "Opera";
        }elseif(preg_match('/Chrome/i',$u_agent) && !preg_match('/Edge/i',$u_agent)){
            $bname = 'Google Chrome';
            $ub = "Chrome";
        }elseif(preg_match('/Safari/i',$u_agent) && !preg_match('/Edge/i',$u_agent)){
            $bname = 'Apple Safari';
            $ub = "Safari";
        }elseif(preg_match('/Netscape/i',$u_agent)){
            $bname = 'Netscape';
            $ub = "Netscape";
        }elseif(preg_match('/Edge/i',$u_agent)){
            $bname = 'Edge';
            $ub = "Edge";
        }elseif(preg_match('/Trident/i',$u_agent)){
            $bname = 'Internet Explorer';
            $ub = "MSIE";
        }

        // finally get the correct version number
        $known = array('Version', $ub, 'other');
        $pattern = '#(?<browser>' . join('|', $known) .
            ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
        if (!preg_match_all($pattern, $u_agent, $matches)) {
            // we have no matching number just continue
        }
        // see how many we have
        $i = count($matches['browser']);
        $mv = self::get_key($matches, 'version');
        $mv0 = self::get_key($mv, [ 0 ]);
        $mv1 = self::get_key($mv, [ 1 ]);
        if ($i != 1) {
            //we will have two since we are not using 'other' argument yet
            //see if version is before or after the name
            if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
                $version = $mv0;
            }else {
                $version = $mv1;
            }
        }else {
            $version = $mv0;
        }

        // check if we have a number
        if ($version==null || $version=="") {$version="?";}

        return [
            'userAgent' => $u_agent,
            'name'      => $bname,
            'version'   => $version,
            'platform'  => $platform,
            'pattern'    => $pattern,
        ];
    }

    public function proceed_update_row ($query, $conn, $id): int {
        // prepare
        $types = 'i';
        $args = [ $id ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $r = $stmt -> affected_rows;
        $stmt -> close();

        return $r;
    }

    public function proceed_delete_all ($query, $conn, $state): int {
        // prepare
        $types = 'i';
        $args = [ $state ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $response = $stmt -> affected_rows;
        $stmt -> close();

        return $response;
    }

    public function password_hash ($password): string {
        return password_hash($password, PASS_CRYPT, PASS_CRYPT_OPTIONS);
    }

    public function password_verify ($password, $passwordHash): bool {
        return password_verify($password, $passwordHash);
    }

    public function get_language_row ($conn, $id, $query) {
        $response = null;

        // prepare
        $types = 'i';
        $args = [ $id ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();
        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                $response = $row;
            }
        }

        return $response;
    }

    public function update_language_row ($conn, $lang, $query, $types, $args) {
        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $response = $lang;
            $stmt -> close();
        }

        return $response;
    }

    public function put_file ($fileName, $fileData, $filePath) {
        $file = $filePath . $fileName;
        if (!file_exists($filePath)) mkdir($filePath, 0777, true);

        return file_put_contents($file, $fileData);
    }

    public function put_custom_image ($width, $height, $key, $imageData, $pathPrefix, $fileName, $quality, $crop = false) {
        $image = ImageResize::createFromString($imageData);
        if ($crop) {
            $image -> crop($width, $height, true, ImageResize::CROPCENTER);
        } else {
            $image -> resizeToBestFit($width, $height);
        }
        $image -> quality_jpg = $quality;
        $file_path = $pathPrefix . $key . '/';

        return self::put_file($fileName, $image, $file_path);
    }

    public function upload_file ($file_object, $cropped_file_object, $name, $ext, $type): array {
        $response = null;
        $file_path = null;
        $file_parts = explode(";base64,", $file_object);
        $file_base64 = base64_decode($file_parts[1]);
        if ($type !== 'unknown') $file_path = self::get_key(PATHS, 'UPLOADS') . '/' . $type . '/';
        if ($file_path) {
            $response['original'] = self::put_file($name . '.' . $ext, $file_base64, $file_path);
            if ($type == 'image') {
                $file_cropped_parts = explode(";base64,", $cropped_file_object);
                $file_cropped_base64 = base64_decode($file_cropped_parts[1]);
                $imageData = $file_cropped_base64;
                if (!$imageData) $imageData = $file_base64;

                // Save by defined sizes and options
                foreach (self::get_key(UPLOADS, 'IMAGE->FORMATS') as $v) {
                    $response[$v['key']] = self::put_custom_image(
                        $v['width'],
                        $v['height'],
                        $v['key'],
                        $imageData,
                        $file_path,
                        $name . '.' . $ext,
                        $v['quality'],
                        $v['crop']
                    );
                }
            }
        }

        return $response;
    }

    public function delete_file ($name, $type): array {
        $response = [];
        $file_path = self::get_key(PATHS, 'UPLOADS') . '/' . $type . '/';
        // Delete original
        $response['original'] = unlink($file_path . $name);
        // Delete rest of cropped images
        foreach (self::get_key(UPLOADS, 'IMAGE->FORMATS') as $v) {
            $response[$v['key']] = unlink($file_path . $v['key'] . '/' . $name);
        }

        return $response;
    }

    public function build_sorter ($key, $reverse = false): \Closure {
        return function ($a, $b) use ($key, $reverse) {
            if ($reverse) {
                return strnatcmp($b[$key], $b[$key]);
            } else {
                return strnatcmp($a[$key], $b[$key]);
            }
        };
    }

}