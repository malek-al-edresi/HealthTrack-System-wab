<?php
// backend/routes/appointments.php

function handle_appointments(PDO $pdo, string $method, array $segments): void
{
    switch ($method) {
        case 'GET':
            // GET /api/appointments
            try {
                $stmt = $pdo->query(
                    "SELECT * FROM appointments ORDER BY date_time DESC"
                );
                $rows = $stmt->fetchAll();
                json_response($rows);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                json_response(['error' => 'Error fetching appointments.'], 500);
            }
            break;

        case 'POST':
            // CREATE appointment
            $data        = json_input();
            $patient_id  = $data['patient_id'] ?? null;
            $doctor_name = $data['doctor_name'] ?? null;
            $date_time   = $data['date_time'] ?? null;
            $notes       = $data['notes'] ?? null;
            $email       = $data['email'] ?? null; // optional for sending confirmation

            if ($patient_id === null || $doctor_name === null || $date_time === null) {
                json_response(
                    ['error' => 'patient_id, doctor_name and date_time are required'],
                    400
                );
            }

            try {
                $stmt = $pdo->prepare(
                    "INSERT INTO appointments (patient_id, doctor_name, date_time, notes) 
                     VALUES (?, ?, ?, ?)"
                );
                $stmt->execute([$patient_id, $doctor_name, $date_time, $notes]);
                $id = (int)$pdo->lastInsertId();

                if ($email) {
                    $subject = 'Appointment Scheduled - HealthTrack';
                    $message = "Your appointment has been scheduled:\n"
                        . "Doctor: {$doctor_name}\n"
                        . "Date & Time: {$date_time}\n"
                        . "Notes: {$notes}\n\n"
                        . "Please arrive on time and bring any required documents.";
                    send_email($email, $subject, $message);
                }

                json_response(['id' => $id], 201);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                json_response(['error' => 'Error creating appointment.'], 500);
            }
            break;

        default:
            method_not_allowed();
    }
}
