<?php
// backend/routes/patients.php

function handle_patients(PDO $pdo, string $method, array $segments): void
{
    switch ($method) {
        case 'GET':
            // GET /api/patients or /api/patients/:id
            if (empty($segments)) {
                try {
                    $stmt = $pdo->query("SELECT * FROM patients ORDER BY id DESC");
                    $rows = $stmt->fetchAll();
                    json_response($rows);
                } catch (Throwable $e) {
                    error_log($e->getMessage());
                    json_response(['error' => 'Error fetching patients.'], 500);
                }
            } else {
                $id = (int)$segments[0];
                try {
                    $stmt = $pdo->prepare("SELECT * FROM patients WHERE id = ?");
                    $stmt->execute([$id]);
                    $row = $stmt->fetch();
                    if (!$row) {
                        json_response(['error' => 'Patient not found.'], 404);
                    }
                    json_response($row);
                } catch (Throwable $e) {
                    error_log($e->getMessage());
                    json_response(['error' => 'Error fetching patient.'], 500);
                }
            }
            break;

        case 'POST':
            // CREATE patient
            $data = json_input();
            $name         = $data['name'] ?? null;
            $age          = $data['age'] ?? null;
            $patient_type = $data['patient_type'] ?? null;
            $conditions   = $data['conditions'] ?? null;

            if ($name === null || $age === null || $patient_type === null) {
                json_response(['error' => 'name, age, and patient_type are required'], 400);
            }

            try {
                $stmt = $pdo->prepare(
                    "INSERT INTO patients (name, age, patient_type, conditions) VALUES (?, ?, ?, ?)"
                );
                $stmt->execute([$name, $age, $patient_type, $conditions ?: null]);
                json_response(['id' => (int)$pdo->lastInsertId()], 201);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                json_response(['error' => 'Error creating patient.'], 500);
            }
            break;

        case 'PUT':
        case 'PATCH':
            // UPDATE patient
            if (empty($segments)) {
                not_found();
            }

            $id   = (int)$segments[0];
            $data = json_input();

            $name         = $data['name'] ?? null;
            $age          = $data['age'] ?? null;
            $patient_type = $data['patient_type'] ?? null;
            $conditions   = $data['conditions'] ?? null;

            try {
                $stmt = $pdo->prepare(
                    "UPDATE patients 
                     SET name = ?, age = ?, patient_type = ?, conditions = ?
                     WHERE id = ?"
                );
                $stmt->execute([$name, $age, $patient_type, $conditions ?: null, $id]);
                http_response_code(204);
                exit;
            } catch (Throwable $e) {
                error_log($e->getMessage());
                json_response(['error' => 'Error updating patient.'], 500);
            }
            break;

        default:
            method_not_allowed();
    }
}
