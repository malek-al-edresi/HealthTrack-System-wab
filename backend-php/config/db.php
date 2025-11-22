<?php
// backend-php/config/db.php
// Database connection using PDO (MySQL)
// IMPORTANT: Change these values to match your InfinityFree/MySQL settings.

$DB_HOST = getenv('DB_HOST') ?: 'sql211.infinityfree.com';      // e.g. sqlXXX.epizy.com on InfinityFree
$DB_NAME = getenv('DB_NAME') ?: 'if0_40484502_healthtrack';    // your database name
$DB_USER = getenv('DB_USER') ?: 'if0_40484502';           // your db username
$DB_PASS = getenv('DB_PASSWORD') ?: 'UKRgrkoJarKn';           // your db password

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO(
        "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        $options
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
