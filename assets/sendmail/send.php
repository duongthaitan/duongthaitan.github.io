<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'duongthaitan13@gmail.com'; // Địa chỉ Gmail
        $mail->Password = 'emuprqnfcmzdxhen'; // Mật khẩu ứng dụng
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';

        $mail->setFrom('duongthaitan13@gmail.com', 'Duong Thai Tan');
        $mail->addAddress('duongthaitan13@gmail.com');

        $mail->isHTML(false);
        $mail->Subject = $_POST['subject'];
        $mail->Body    = "Name: " . $_POST['name'] . "\n" . "Email: " . $_POST['email'] . "\n" . "Message: " . $_POST['message'];

        $mail->send();
        echo 'OK';  // Trả về "OK" khi gửi thành công
    } catch (Exception $e) {
        echo 'Email không thể gửi. Lỗi: ' . $e->getMessage();  // Trả về thông báo lỗi
    }
} else {
    http_response_code(405);
    echo 'Method Not Allowed. Please ensure you are using POST method.';
}
