HealthTrack_System
===================

Description
-----------
HealthTrack is a smart personal health record and medication reminder
system. It targets **chronic patients and elderly people** and provides:

- Centralized medical records (visits, prescriptions, lab results).
- Medication and appointment reminders.
- File upload for prescriptions and lab reports.
- Multiple interfaces: **Patient**, **Doctor**, and **Family**.
- Ability for doctors to update records.
- Logical linking between families and designated doctors.

Technologies
------------
Frontend:
- HTML, CSS, JavaScript

Backend:
- Node.js + Express

Database:
- MySQL

Notifications:
- Web Notifications (browser-based)

File Upload:
- multer (Node.js) storing files under `backend/uploads/` folder.

Structure
---------
HealthTrack_System/
├── frontend/
│   ├── index.html              # Main UI (Patient / Doctor / Family)
│   ├── css/
│   │   └── style.css           # Main styling
│   ├── js/
│   │   ├── app.js              # Shared logic + API base URL
│   │   ├── patients.js         # Patient registration & listing
│   │   ├── records.js          # Medical record management (lab results, files)
│   │   └── reminders.js        # UI for reminders (medications / appointments)
│   └── assets/                 # (optional) images, icons, logos
│
├── backend-php/                # Main PHP backend (Production Ready)
│   ├── public/
│   │   └── index.php           # Single entry point + API router (/api/*)
│   │
│   ├── config/
│   │   ├── db.php              # PDO MySQL connection (local + InfinityFree)
│   │   ├── bootstrap.php       # CORS headers + JSON helpers + common utils
│   │   └── mail.php            # Email alerts using PHP mail() (notifications)
│   │
│   ├── routes/
│   │   ├── patients.php        # /api/patients       (GET, GET/:id, POST, PUT)
│   │   ├── records.php         # /api/records       + /patient/:id + uploads
│   │   ├── medications.php     # /api/medications   (GET, POST + email notify)
│   │   └── appointments.php    # /api/appointments  (GET, POST + email confirm)
│   │
│   ├── storage/
│   │   └── uploads/            # Secure storage for uploaded medical files
│   │
│   └── README-PHP.md           # Backend documentation & deployment guide
│
├── backend/                    # (Optional) Original Node.js backend (not used on InfinityFree)
│   ├── server.js
│   ├── package.json
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   ├── patients.js
│   │   ├── records.js
│   │   ├── medications.js
│   │   └── appointments.js
│   └── uploads/
│
└── database/
    ├── healthtrack.sql         # Full schema + seed data for MySQL
    ├── tables.sql              # Table definitions
    └── sample-data.sql         # Sample inserts for testing

How Requirements Are Covered
----------------------------
1. **Patient data registration (chronic & elderly)**  
   - Table: `patients` (`patient_type` = 'chronic' or 'senior').  
   - UI: Patient portal in `frontend/index.html`, `patients.js`.

2. **Medical record management (prescriptions, labs, visits)**  
   - Table: `medical_records` with `record_type` (visit/prescription/lab).  
   - Backend: `routes/records.js`.  
   - UI: Doctor portal section + `records.js`.

3. **Medication and appointment reminders**  
   - DB tables: `medications`, `appointments`.  
   - UI reminders: Web Notifications in `reminders.js` (schedules browser
     notifications based on date/time chosen in the Family portal).

4. **File upload & storage**  
   - Backend: `multer` in `routes/records.js`, files saved to `backend/uploads/`.  
   - Metadata stored in table `uploaded_files`.  
   - UI: Upload section + `reminders.js` (upload form + uploads table).

5. **Multiple interfaces (patient, doctor, family)**  
   - Three role sections in `index.html`, switched via buttons on the top
     bar (`.role-switcher`).  
   - Each role sees only relevant forms and data.

6. **Doctors updating records**  
   - Doctors add medical records through Doctor portal forms (backend uses
     `medical_records` table).  
   - Additional update endpoints can be extended easily if required.

7. **Link families to a designated doctor**  
   - Database: `families`, `doctors`, `family_doctors`.  
   - UI: Family portal shows a simple demo form for linking a family to a
     doctor (client-side alert).  
   - Can be connected to backend endpoints later if needed.

Setup Instructions
------------------
1. **Create the database and tables**
   - Open your MySQL client (phpMyAdmin, MySQL Workbench, CLI, etc.).
   - Run the following scripts in order:
     1. `database/healthtrack.sql`
     2. `database/tables.sql`
     3. `database/sample-data.sql` (optional, for demo data).

2. **Configure backend**
   - Go to `backend/` folder:
     - `cd backend`
   - Install dependencies:
     - `npm install`
   - Configure database connection (optional):
     - Edit `config/database.js` or set environment variables:
       - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - Start the server:
     - For production: `npm start`
     - For development with auto-restart: `npm run dev`
   - Backend will run by default on: `http://localhost:3000`

3. **Run frontend**
   - Open `frontend/index.html` directly in a browser **or**
   - Serve it via a simple HTTP server (recommended for CORS clarity):
     - Example using `npx` inside `frontend`:
       - `npx serve .`  (or use any lightweight static server)
   - Make sure `API_BASE_URL` in `frontend/js/app.js` points to your backend:
     - Default: `http://localhost:3000/api`

4. **Web Notifications**
   - When you use the Family portal to schedule a reminder, the browser
     will ask for notification permission.
   - You need to **Allow** notifications.
   - If you set a reminder time in the future and keep the page open,
     a notification will appear at the scheduled time.

Notes
-----
- This project is a clean base that you can extend for authentication,
  full role-based access control, and advanced dashboards.
- All code is organized to be readable and easy to modify for your
  course requirements.

Call Me  
-------
Linkedin  : www.linkedin.com/in/malek-al-edresi
Call      : +967-778888730
Instagram : dde.mt