<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Kiểm tra phương thức POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Include PHPMailer
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    // Khởi tạo PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Cấu hình SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'duongthaitan13@gmail.com'; // Địa chỉ Gmail
        $mail->Password = 'emuprqnfcmzdxhen'; // Mật khẩu ứng dụng
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';

        // Thiết lập thông tin người gửi và người nhận
        $mail->setFrom('duongthaitan13@gmail.com', 'Duong Thai Tan');
        $mail->addAddress('duongthaitan13@gmail.com'); // Người nhận

        // Thiết lập nội dung email
        $mail->isHTML(false); // Gửi email dạng text
        $mail->Subject = $_POST['subject']; // Tiêu đề từ form
        $mail->Body    = "Name: " . $_POST['name'] . "\n" . "Email: " . $_POST['email'] . "\n" . "Message: " . $_POST['message'];

        // Gửi email
        $mail->send();
        echo '<script>alert("Email đã được gửi thành công.");</script>';
    } catch (Exception $e) {
        echo '<script>alert("Email không thể gửi. Vui lòng thử lại.");</script>';
    }
} else {
    http_response_code(405);
    echo 'Method Not Allowed. Please ensure you are using POST method.';
}
error_reporting(E_ALL);
ini_set('display_errors', 1);
