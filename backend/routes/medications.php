<?php
// backend/routes/medications.php

function handle_medications(PDO $pdo, string $method, array $segments): void
{
    switch ($method) {
        case 'GET':
            // GET /api/medications
            try {
                $stmt = $pdo->query("SELECT * FROM medications ORDER BY id DESC");
                $rows = $stmt->fetchAll();
                json_response($rows);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                json_response(['error' => 'Error fetching medications.'], 500);
            }
            break;

        case 'POST':
            // CREATE medication
            $data       = json_input();
            $patient_id = $data['patient_id'] ?? null;
            $name       = $data['name'] ?? null;
            $dosage     = $data['dosage'] ?? null;
            $schedule   = $data['schedule'] ?? null;
            $email      = $data['email'] ?? null; // optional email address for reminders

            if ($patient_id === null || $name === null) {
                json_response(['error' => 'patient_id and name are required'], 400);
            }

            try {
                $stmt = $pdo->prepare(
                    "INSERT INTO medications (patient_id, name, dosage, schedule) VALUES (?, ?, ?, ?)"
                );
                $stmt->execute([$patient_id, $name, $dosage, $schedule]);
                $id = (int)$pdo->lastInsertId();

                // Simple immediate email notification (demonstration)
                if ($email) {
                    $subject = 'Medication Reminder Added - HealthTrack';
                    $message = "A new medication has been added for you in HealthTrack:\n"
                        . "Name: {$name}\n"
                        . "Dosage: {$dosage}\n"
                        . "Schedule: {$schedule}\n\n"
                        . "Please follow your doctor instructions.";
                    send_email($email, $subject, $message);
                }

                json_response(['id' => $id], 201);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                json_response(['error' => 'Error creating medication.'], 500);
            }
            break;

        default:
            method_not_allowed();
    }
}
