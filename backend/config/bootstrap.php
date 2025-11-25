<?php
// backend-php/config/bootstrap.php

header('Content-Type: application/json; charset=utf-8');

// CORS (adjust Access-Control-Allow-Origin for your production domain)
header('Access-Control-Allow-Origin:  http://health-sys.gt.tc/*');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/db.php';
require __DIR__ . '/mail.php';

function json_input(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === '' || $raw === false) {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function json_response($data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function not_found(): void
{
    json_response(['error' => 'Not found'], 404);
}

function method_not_allowed(): void
{
    json_response(['error' => 'Method not allowed'], 405);
}
