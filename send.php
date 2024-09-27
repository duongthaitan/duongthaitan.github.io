<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Include PHPMailer
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    // Định nghĩa secret key
    $secretKey = '0x4AAAAAAAmsyYA-XsHrCqwKuGpr7iCTRqg';

    // Lấy dữ liệu từ POST
    $responseToken = $_POST['cf-turnstile-response'] ?? null;

    // Nếu không có token, thoát
    if (!$responseToken) {
        echo 'Missing captcha token.';
        exit();
    }

    // Lấy địa chỉ IP của người dùng
    $remoteIP = $_SERVER['REMOTE_ADDR'];

    // Chuẩn bị dữ liệu để gửi qua POST cho Cloudflare
    $data = array(
        'secret' => $secretKey,
        'response' => $responseToken,
        'remoteip' => $remoteIP
    );

    // Khởi tạo Curl để xác thực với Cloudflare
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Thực hiện yêu cầu và nhận kết quả
    $response = curl_exec($ch);
    curl_close($ch);

    // Phân tích kết quả JSON
    $result = json_decode($response, true);

    // Kiểm tra nếu xác minh captcha thành công
    if ($result && isset($result['success']) && $result['success'] === true) {

        // Khởi tạo PHPMailer
        $mail = new PHPMailer(true);

        try {
            // Cấu hình SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Sử dụng server Gmail
            $mail->SMTPAuth = true;
            $mail->Username = 'duongthaitan13@gmail.com'; // Địa chỉ Gmail
            $mail->Password = 'emuprqnfcmzdxhen'; // Mật khẩu ứng dụng
            $mail->Port = 587;
            $mail->SMTPSecure = 'tls';

            // Thiết lập thông tin người gửi và người nhận
            $mail->setFrom('duongthaitan13@gmail.com', 'Duong Thai Tan');
            $mail->addAddress('duongthaitan13@gmail.com'); // Thêm người nhận

            // Thiết lập nội dung email
            $mail->isHTML(false); // Gửi email dạng text
            $mail->Subject = 'Form Submission';
            $mail->Body    = "Name: " . $_POST['name'] . "\n" . "Email: " . $_POST['email'] . "\n" . "Message: " . $_POST['message'];

            // Gửi email
            $mail->send();

            // Phản hồi sau khi gửi thành công
            echo '<script>alert("Email sent successfully");</script>';
        } catch (Exception $e) {
            // Xử lý lỗi gửi email
            echo '<script>alert("Captcha verification successful, but email could not be sent. Please try again.");</script>';
        }
    } else {
        // Nếu xác minh captcha không thành công
        echo '<script>alert("Captcha verification failed. Please try again.");</script>';
    }
} else {
    // Phương thức không được cho phép
    http_response_code(405);
    echo 'Method Not Allowed';
}
