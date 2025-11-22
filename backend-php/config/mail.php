<?php
// backend-php/config/mail.php
// Simple email sender using PHP mail(). This works on InfinityFree if mail() is enabled.

function send_email(string $to, string $subject, string $message): void
{
    // NOTE: On InfinityFree, you may need to use a real From address.
    $headers  = "From: HealthTrack <no-reply@yourdomain.com>\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Suppress errors to avoid breaking API, but you can log them if needed.
    @mail($to, $subject, $message, $headers);
}
