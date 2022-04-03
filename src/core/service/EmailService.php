<?php

namespace core\service;

class EmailService {

    private function send_message ($to, $subject, $content, $headers, $context, $from): bool {
        $message_headers = "MIME-Version: 1.0" . "\r\n";
        $message_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $message_headers .= "From: " . $from . "\r\n";
        $headers && $message_headers .= $headers;

        $message_content = $content;

        return mail($to, $subject, $message_content, $message_headers);
    }

    private function create_message ($to, $subject, $content, $headers, $context, $from): bool {
        $message_content = "<html style='width:100%;height:100%;margin:0;padding:0;font-size:16px;'><head><title>" . $subject . "</title></head><body style='width:100%;height:100%;font-size:1rem;font-weight:normal;color:rgb(25,25,25);background-color:rgb(250,250,250);'>";
        $message_content .= "<div style='width:100%;padding:3rem 2rem;text-align:center;'><h1 style='margin:0;padding:0 0 2rem 0;font-size:1.75rem;font-weight:normal;'>" . PROJECT_ADMIN_TITLE . ": " . $subject . "</h1><div>";
        $message_content .= $content;
        $message_content .= "</div></div>";
        $message_content .= "</body></html>";

        return $this -> send_message($to, $subject, $message_content, $headers, $context, $from);
    }

    public function send_email_message (
        $to,
        $subject,
        $content,
        $headers = null,
        $context = null,
        $from = 'noreply@your-web-domain.com'
    ): bool {
        return $this -> create_message($to, $subject, $content, $headers, $context, $from);
    }

}