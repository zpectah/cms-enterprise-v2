<?php

namespace core\model;

use core\common\Helpers;
use core\service\EmailService;

class Messages {

    private function get_updated_row ($row) {
        // $row['status'] = $row['status'] == 1;
        $row['recipients'] = $row['recipients'] == '' ? [] : explode(",", $row['recipients']);

        return $row;
    }

    public function get ($conn, $params): array {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM messages WHERE status < ?');
        $types = 'i';
        $args = [ 3 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $__ids = $params['ids']; // Must be an array[]

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($__ids) {
                    if (in_array($row['id'], $__ids)) $response[] = self::get_updated_row($row);
                } else {
                    $response[] = self::get_updated_row($row);
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];
        $es = new EmailService;
        $email_sent = [];
        $type = $data['type'];
        $subject = $data['subject'];
        $content = $data['content'];
        $sender = $data['sender'];
        $recipients = $data['recipients'];
        foreach ($recipients as $email) {
            $sent = $es -> send_email_message(
                $email,
                $subject,
                "<div>" . $content . "</div>",
                null,
                "message_" . $type,
                $sender
            );
            if ($sent) $email_sent[] = $email;
        }

        // prepare
        $query = ('INSERT INTO messages (type, sender, recipients, subject, content, ip_address, email_sent, status) VALUES (?,?,?,?,?,?,?,?)');
        $types = 'sssssssi';
        $args = [
            $type,
            $sender,
            $data['recipients'] ? implode(",", $data['recipients']) : '',
            $subject,
            $content,
            $data['ip_address'] ?? '',
            $email_sent ? implode(",", $email_sent) : '',
            1
        ];

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $response['id'] = $stmt -> insert_id;
            $stmt -> close();
        }

        return $response; // last created ID
    }

    public function update ($conn, $data) {
        $response = [];

        // prepare
        $query = ('UPDATE messages SET status = ? WHERE id = ?');
        $types = 'ii';
        $args = [
            $data['status'],
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
            $stmt -> close();
        }

        return $response; // list of affected ids
    }

    public function toggle ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE messages SET status = IF(status=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE messages SET status = 3 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function mark_read ($conn, $data): array {
        $response = [];
        $helpers = new Helpers;

        foreach ($data as $id) {
            $response[] = $helpers -> proceed_update_row('UPDATE messages SET status = 2 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete_all_permanent ($conn): array {
        $response = [];
        $helpers = new Helpers;
        $response['db'] = $helpers -> proceed_delete_all('DELETE from messages WHERE status = ?', $conn, 3);

        return $response;
    }

}