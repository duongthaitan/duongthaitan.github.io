<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Define your secret key
$secretKey = '0x4AAAAAAAmsyYA-XsHrCqwKuGpr7iCTRqg';

// Get response token from the form
$responseToken = $_POST['cf-turnstile-response'];

// Get user's IP address
$remoteIP = $_SERVER['REMOTE_ADDR'];

// Prepare data for the POST request
$data = array(
    'secret' => $secretKey,
    'response' => $responseToken,
    'remoteip' => $remoteIP
);

// Initialize Curl session
$ch = curl_init();

// Set Curl options
curl_setopt($ch, CURLOPT_URL, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the POST request
$response = curl_exec($ch);

// Close the Curl session
curl_close($ch);

// Decode the JSON response
$result = json_decode($response, true);

// Check if verification was successful
if ($result && isset($result['success']) && $result['success'] === true) {
    // Verification successful, proceed with sending the email

    // Instantiate PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'SMTP Server Address'; // Enter SMTP server address
        $mail->SMTPAuth = true;
        $mail->Username = 'SMTP Username'; // Username for SMTP authentication
        $mail->Password = 'SMTP Password'; // Password for SMTP authentication
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';

        // Set sender (From) with email address and name
        $mail->setFrom('duongthaitan13@gmail.com', 'Duong Thai Tan');
        $mail->addAddress('duongthaitan13@gmail.com'); // Add recipient
        // Content
        $mail->isHTML(false);
        $mail->Subject = 'Form Submission';
        $mail->Body    = "Name: " . $_POST['name'] . "\n" . "Email: " . $_POST['email'] . "\n" . "Message: " . $_POST['message'];

        $mail->send();

        // Here you can choose between redirection or a simple alert

        //  header("Location: confirmation.html");
        echo '<script>';
        echo 'alert("Email sent successfully");';
        echo '</script>';
    } catch (Exception $e) {
        echo '<script>';
        echo 'alert("Captcha verification successful, but email could not be sent. Please try again.");';
        echo '</script>';
    }
} else {
    // Verification failed, handle error
    echo '<script>';
    echo 'alert("Captcha verification failed. Please try again.");';
    echo '</script>';
}
