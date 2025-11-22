USE healthtrack;

-- Sample patients
INSERT INTO patients (name, age, patient_type, conditions)
VALUES
('Ahmed Ali', 65, 'senior', 'Hypertension, Type 2 Diabetes'),
('Fatimah Hassan', 54, 'chronic', 'Asthma'),
('Salem Mohammed', 72, 'senior', 'Heart disease');

-- Sample doctors
INSERT INTO doctors (name, specialty, phone)
VALUES
('Dr. Sara Al-Qahtani', 'Internal Medicine', '+966500000001'),
('Dr. Omar Al-Harbi', 'Cardiology', '+966500000002');

-- Sample families
INSERT INTO families (family_name)
VALUES ('Al-Ali Family'), ('Al-Hassan Family');

-- Link families to doctors
INSERT INTO family_doctors (family_id, doctor_id)
VALUES (1, 1), (2, 2);

-- Sample medical records
INSERT INTO medical_records (patient_id, record_type, details)
VALUES
(1, 'visit', 'Routine check-up, blood pressure stable.'),
(1, 'prescription', 'Amlodipine 5mg once daily.'),
(2, 'lab', 'Spirometry test, mild obstruction.');

-- Sample medications
INSERT INTO medications (patient_id, name, dosage, schedule)
VALUES
(1, 'Metformin', '500mg', 'Twice daily with meals'),
(2, 'Inhaler', 'As prescribed', 'Morning and evening');

-- Sample appointments
INSERT INTO appointments (patient_id, doctor_name, date_time, notes)
VALUES
(1, 'Dr. Sara Al-Qahtani', DATE_ADD(NOW(), INTERVAL 7 DAY), 'Follow-up for blood pressure.'),
(2, 'Dr. Omar Al-Harbi', DATE_ADD(NOW(), INTERVAL 14 DAY), 'Cardiology review.');
