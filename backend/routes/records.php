<?php
// backend/routes/records.php

function handle_records(PDO $pdo, string $method, array $segments): void
{
    // Supported:
    // POST   /api/records
    // GET    /api/records/patient/:patientId
    // POST   /api/records/upload
    // GET    /api/records/uploads

    if ($method === 'GET') {
        if (!empty($segments) && $segments[0] === 'patient' && isset($segments[1])) {
            $patientId = (int)$segments[1];
            try {
                $stmt = $pdo->prepare(
                    "SELECT * FROM medical_records WHERE patient_id = ? ORDER BY created_at DESC"
                );
                $stmt->execute([$patientId]);
                $rows = $stmt->fetchAll();
                json_response($rows);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                json_response(['error' => 'Error fetching records.'], 500);
            }
            return;
        }

        if (!empty($segments) && $segments[0] === 'uploads') {
            try {
                $stmt = $pdo->query(
                    "SELECT * FROM uploaded_files ORDER BY created_at DESC"
                );
                $rows = $stmt->fetchAll();
                json_response($rows);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                json_response(['error' => 'Error fetching uploads.'], 500);
            }
            return;
        }

        // Optional: GET /api/records can return empty or all records; Node version does not define it explicitly.
        json_response([]);
        return;
    }

    if ($method === 'POST') {
        if (!empty($segments) && $segments[0] === 'upload') {
            handle_record_file_upload($pdo);
            return;
        }

        $data        = json_input();
        $patient_id  = $data['patient_id'] ?? null;
        $record_type = $data['record_type'] ?? null;
        $details     = $data['details'] ?? null;

        if ($patient_id === null || $record_type === null) {
            json_response(['error' => 'patient_id and record_type are required'], 400);
        }

        try {
            $stmt = $pdo->prepare(
                "INSERT INTO medical_records (patient_id, record_type, details) VALUES (?, ?, ?)"
            );
            $stmt->execute([$patient_id, $record_type, $details]);
            json_response(['id' => (int)$pdo->lastInsertId()], 201);
        } catch (Throwable $e) {
            error_log($e->getMessage());
            json_response(['error' => 'Error creating medical record.'], 500);
        }
        return;
    }

    method_not_allowed();
}

function handle_record_file_upload(PDO $pdo): void
{
    if (!isset($_POST['patient_id'])) {
        json_response(['error' => 'patient_id is required'], 400);
    }

    $patientId = (int)$_POST['patient_id'];

    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        json_response(['error' => 'No file uploaded or upload error.'], 400);
    }

    $uploadDir = __DIR__ . '/../storage/uploads';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $originalName = $_FILES['file']['name'];
    $ext          = pathinfo($originalName, PATHINFO_EXTENSION);
    $unique       = time() . '-' . random_int(100000, 999999);
    $safeName     = $unique . ($ext ? '.' . $ext : '');
    $targetPath   = $uploadDir . '/' . $safeName;

    if (!move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
        json_response(['error' => 'Failed to move uploaded file.'], 500);
    }

    try {
        $stmt = $pdo->prepare(
            "INSERT INTO uploaded_files (patient_id, file_name, original_name) VALUES (?, ?, ?)"
        );
        $stmt->execute([$patientId, $safeName, $originalName]);
        json_response(['message' => 'File uploaded.'], 201);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        json_response(['error' => 'Error saving file metadata.'], 500);
    }
}
