<?php

namespace core\model;

use core\common\Helpers;
use core\module\admin\Settings;

class Posts {

    private function get_updated_row ($conn, $row, $languages): array {
        $helpers = new Helpers;

        foreach ($languages as $lang) {
            $table_language_name = 'posts__' . strtolower(preg_replace('/-/m','_', $lang));
            $row['lang'][$lang] = $helpers -> get_language_row(
                $conn,
                $row['id'],
                'SELECT * FROM ' . $table_language_name . ' WHERE id = ?'
            );
        }

        $row['attachments'] = $row['attachments'] == '' ? [] : explode(",", $row['attachments']);
        $row['tags'] = $row['tags'] == '' ? [] : explode(",", $row['tags']);
        $row['categories'] = $row['categories'] == '' ? [] : explode(",", $row['categories']);
        $row['links'] = $row['links'] == '' ? [] : explode(",", $row['links']);
        $row['template'] = $row['template'] == 1;
        $row['active'] = $row['active'] == 1;
        $row['event_start'] = $row['event_start'] == '' ? null : $row['event_start'];
        $row['event_end'] = $row['event_end'] == '' ? null : $row['event_end'];
        $row['published'] = $row['published'] == '' ? null : $row['published'];
        $row['event_location'] = $row['event_location'] == '' ? [] : explode(",", $row['event_location']);
        unset($row['deleted']);

        return $row;
    }

    private function get_row_sub_data ($conn, $row, $languages) {
        $row['sub_media'] = [];
        $row['sub_attachments'] = [];
        $row['sub_tags'] = [];
        $row['sub_categories'] = [];
        $row['sub_links'] = [];
        $row['sub_author'] = [];

        if ($row['media']) {
            $uploads = new Uploads;
            $row['sub_media'] = $uploads -> get($conn, [ 'ids' => $row['media'] ], $languages);
        }
        if ($row['attachments']) {
            $uploads = new Uploads;
            $row['sub_attachments'] = $uploads -> get($conn, [ 'ids' => $row['attachments'] ], $languages);
        }
        if ($row['tags']) {
            $tags = new Tags;
            $row['sub_tags'] = $tags -> get($conn, [ 'ids' => $row['tags'] ], []);
        }
        if ($row['categories']) {
            $categories = new Categories;
            $row['sub_categories'] = $categories -> get($conn, [ 'ids' => $row['categories'] ], $languages);
        }
        if ($row['links']) {
            $row['sub_links'] = $row['links']; // TODO
        }
        if ($row['author']) {
            $users = new Users;
            $row['sub_author'] = $users -> get($conn, [ 'id' => $row['author'] ]);
        }

        return $row;
    }

    public function get ($conn, $data, $languages): array {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM posts WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__sub = $data['sub'];

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($__sub) {
                    $response[] = self::get_row_sub_data($conn, self::get_updated_row($conn, $row, $languages), $languages);
                } else {
                    $response[] = self::get_updated_row($conn, $row, $languages);
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data, $languages) {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $query = ('INSERT INTO posts (
                   name, 
                   type, 
                   categories, 
                   tags, 
                   event_start, 
                   event_end, 
                   event_location, 
                   event_address, 
                   event_country, 
                   event_city, 
                   event_zip, 
                   media, 
                   attachments, 
                   img_main, 
                   img_thumbnail, 
                   published, 
                   links,
                   author, 
                   rating,
                   template,
                   active, 
                   deleted
                   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'sssssssssssssssssiiiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['categories'] ? implode(",", $data['categories']) : '',
            $data['tags'] ? implode(",", $data['tags']) : '',
            $data['event_start'] ?? '',
            $data['event_end'] ?? '',
            $data['event_location'] ? implode(",", $data['event_location']) : '0,0',
            $data['event_address'],
            $data['event_country'],
            $data['event_city'],
            $data['event_zip'],
            $data['media'] ?? '',
            $data['attachments'] ? implode(",", $data['attachments']) : '',
            $data['img_main'],
            $data['img_thumbnail'],
            $data['published'] ?? '',
            $data['links'] ? implode(",", $data['links']) : '',
            $data['author'],
            $data['rating'],
            $data['template'],
            $data['active'],
            0
        ];

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $response['id'] = $stmt -> insert_id;
            foreach ($languages as $lang) {
                $table_language_name = 'posts__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'INSERT INTO ' . $table_language_name . ' (id, title, description, content) VALUES (?,?,?,?)',
                    'isss',
                    [
                        $response['id'],
                        $data['lang'][$lang]['title'] ?? '',
                        $data['lang'][$lang]['description'] ?? '',
                        $data['lang'][$lang]['content'] ?? ''
                    ]
                );
            }
            $stmt -> close();
        }

        return $response;
    }

    public function update ($conn, $data, $languages) {
        $response = [];
        $helpers = new Helpers;

        // prepare
        $query = ('UPDATE posts SET 
                     name = ?, 
                     type = ?, 
                     categories = ?, 
                     tags = ?, 
                     event_start = ?, 
                     event_end = ?, 
                     event_location = ?, 
                     event_address = ?, 
                     event_country = ?, 
                     event_city = ?, 
                     event_zip = ?, 
                     media = ?, 
                     attachments = ?, 
                     img_main = ?, 
                     img_thumbnail = ?, 
                     published = ?, 
                     links = ?, 
                     author = ?, 
                     rating = ?, 
                     template = ?, 
                     active = ? 
                WHERE id = ?');
        $types = 'sssssssssssssssssiiiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['categories'] ? implode(",", $data['categories']) : '',
            $data['tags'] ? implode(",", $data['tags']) : '',
            $data['event_start'] ?? '',
            $data['event_end'] ?? '',
            $data['event_location'] ? implode(",", $data['event_location']) : '0,0',
            $data['event_address'],
            $data['event_country'],
            $data['event_city'],
            $data['event_zip'],
            $data['media'] ?? '',
            $data['attachments'] ? implode(",", $data['attachments']) : '',
            $data['img_main'],
            $data['img_thumbnail'],
            $data['published'] ?? '',
            $data['links'] ? implode(",", $data['links']) : '',
            $data['author'],
            $data['rating'],
            $data['template'],
            $data['active'],
            $data['id']
        ];

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $response['rows'] = $stmt -> affected_rows;
            foreach ($languages as $lang) {
                $table_language_name = 'posts__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'UPDATE ' . $table_language_name . ' SET title = ?, description = ?, content = ? WHERE id = ?',
                    'sssi',
                    [
                        $data['lang'][$lang]['title'],
                        $data['lang'][$lang]['description'],
                        $data['lang'][$lang]['content'],
                        $data['lang'][$lang]['id']
                    ]
                );
            }
            $stmt -> close();
        }

        return $response;
    }

    public function toggle ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE posts SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE posts SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function search ($conn, $data, $languages): array {
        $results = [];
        $string = strtolower($data['search']);
        $settings = new Settings;
        if ($data['lang']) {
            $lng = $data['lang'];
        } else {
            $lng = $settings['language_default'];
        }
        $posts = $this -> get($conn, [], $languages);
        $today = strtotime(date('Y-m-d H:i:s'));
        foreach ($posts as $item) {
            if (
                preg_match( "/{$string}/i", strtolower($item['name']))
                || preg_match( "/{$string}/i", strtolower($item['lang'][$lng]['title']))
                || preg_match( "/{$string}/i", strtolower($item['lang'][$lng]['description']))
                || preg_match( "/{$string}/i", strtolower($item['lang'][$lng]['content']))
                && $item['active']
            ) {
                $published = strtotime($item['published']);
                if ($today >= $published) {
                    $item['model'] = 'posts';
                    $results[] = $item;
                }
            }
        }

        return $results;
    }

    public function delete_all_permanent ($conn, $languages): array {
        $response = [];
        $ids = [];
        $helpers = new Helpers;

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM posts WHERE deleted = ?');
        $types = 'i';
        $args = [ 1 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                $ids[] = $row['id'];
            }
        }

        $response['db'] = $helpers -> proceed_delete_all('DELETE from posts WHERE deleted = ?', $conn, 1);

        foreach ($ids as $id) {
            foreach ($languages as $lang) {
                $table_language_name = 'posts__' . strtolower(preg_replace('/-/m','_', $lang));
                $response['lang'][] = $helpers -> update_language_row(
                    $conn,
                    $lang,
                    'DELETE from ' . $table_language_name . ' WHERE id = ?',
                    'i',
                    [ $id ]
                );
            }
        }

        return $response;
    }

}