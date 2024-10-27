<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Include PHPMailer
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    // Kiểm tra reCAPTCHA
    $recaptcha = $_POST['g-recaptcha-response'];
    $secret = '6Ld-xm0qAAAAAAOR1suaN9nnuvSbRJqjqET-e_fW9';
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$recaptcha");
    $responseKeys = json_decode($response, true);

    if (intval($responseKeys["success"]) !== 1) {
        echo '<script>alert("Vui lòng xác minh reCAPTCHA.");</script>';
        exit();
    }

    // Khởi tạo PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Cấu hình SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'duongthaitan13@gmail.com';
        $mail->Password = 'emuprqnfcmzdxhen';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';

        // Thiết lập thông tin người gửi và người nhận
        $mail->setFrom('duongthaitan13@gmail.com', 'Duong Thai Tan');
        $mail->addAddress('duongthaitan13@gmail.com');

        // Thiết lập nội dung email
        $mail->isHTML(false);
        $mail->Subject = 'Form Submission';
        $mail->Body    = "Name: " . $_POST['name'] . "\n" . "Email: " . $_POST['email'] . "\n" . "Message: " . $_POST['message'];

        // Gửi email
        $mail->send();
        echo '<script>alert("Email đã được gửi thành công.");</script>';
    } catch (Exception $e) {
        echo '<script>alert("Email không thể gửi. Vui lòng thử lại.");</script>';
    }
} else {
    http_response_code(405);
    echo 'Method Not Allowed';
}
