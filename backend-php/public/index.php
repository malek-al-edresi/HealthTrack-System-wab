<?php
// backend-php/public/index.php

require __DIR__ . '/../config/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Normalize base path if the app is in a subdirectory
$scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
if ($scriptDir !== '' && $scriptDir !== '/' && strpos($uri, $scriptDir) === 0) {
    $uri = substr($uri, strlen($scriptDir));
}

$segments = array_values(array_filter(explode('/', $uri)));

// Expect routes like /api/...
if (!isset($segments[0]) || $segments[0] !== 'api') {
    not_found();
}

array_shift($segments); // remove 'api'

$resource = $segments[0] ?? null;
array_shift($segments); // remaining path segments

switch ($resource) {
    case 'health':
        if ($method === 'GET') {
            json_response([
                'status'  => 'ok',
                'message' => 'HealthTrack PHP backend is running',
            ]);
        }
        method_not_allowed();
        break;

    case 'patients':
        require __DIR__ . '/../routes/patients.php';
        handle_patients($pdo, $method, $segments);
        break;

    case 'records':
        require __DIR__ . '/../routes/records.php';
        handle_records($pdo, $method, $segments);
        break;

    case 'medications':
        require __DIR__ . '/../routes/medications.php';
        handle_medications($pdo, $method, $segments);
        break;

    case 'appointments':
        require __DIR__ . '/../routes/appointments.php';
        handle_appointments($pdo, $method, $segments);
        break;

    default:
        not_found();
}
