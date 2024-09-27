<?php

// Define your secret key
$secretKey = '0x4AAAAAAAmlq2-98NPqbgoIC75PKPPVBKE';

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

    // Set recipient email address
    $recipient = 'duongthaitan13@gmail.com';

    // Subject
    $subject = 'Form Submission';

    // Message
    $message = "Name: " . $_POST['name'] . "\n" . "Email: " . $_POST['email'] . "\n" . "Message: " . $_POST['message'];

    // Send email
    if (mail($recipient, $subject, $message)) {
        echo '<script>';
        echo 'alert("Email sent successfully");';
        echo '</script>';
    } else {
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
