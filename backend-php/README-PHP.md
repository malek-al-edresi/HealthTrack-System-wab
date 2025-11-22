HealthTrack System - PHP Backend (InfinityFree Ready)
================================================

This directory contains a pure PHP backend (no framework) that replaces the original Node.js backend.

Structure
---------

backend-php/
  public/
    index.php          Main entry point & router (/api/*)
  config/
    db.php             PDO database connection (MySQL) - edit for InfinityFree
    bootstrap.php      CORS, JSON helpers, and common utilities
    mail.php           Simple email sender using PHP mail()
  routes/
    patients.php       /api/patients        (GET, GET/:id, POST, PUT/:id)
    records.php        /api/records         (POST)
                       /api/records/patient/:id
                       /api/records/upload
                       /api/records/uploads
    medications.php    /api/medications     (GET, POST) + optional email on create
    appointments.php   /api/appointments    (GET, POST) + optional email on create
  storage/uploads/     Uploaded medical files (lab results, documents)

Local Development
-----------------

1. Import the database from: database/healthtrack.sql into MySQL.

2. Update backend-php/config/db.php if needed:

   $DB_HOST = 'localhost';
   $DB_NAME = 'healthtrack';
   $DB_USER = 'root';
   $DB_PASS = '';

3. From the backend-php directory, run:

   php -S localhost:3000 -t public

4. The frontend uses:

   const API_BASE_URL = "http://localhost:3000/api";

   so no change is required for local development.

InfinityFree Deployment
-----------------------

1. Create a MySQL database in the InfinityFree control panel.

2. Import database/healthtrack.sql into that database using phpMyAdmin.

3. Update backend-php/config/db.php with the InfinityFree credentials:

   $DB_HOST = 'sqlXXX.epizy.com';
   $DB_NAME = 'your_db_name';
   $DB_USER = 'your_db_user';
   $DB_PASS = 'your_db_password';

4. Upload the project to the htdocs directory. For example:

   /htdocs/
     index.html (from frontend)
     frontend/...
     backend-php/...

5. To make the API reachable at:

   https://yourdomain.com/api

   ensure that the web server points /api to backend-php/public (on InfinityFree,
   placing backend-php directly under htdocs and calling /backend-php/public/index.php
   is usually sufficient, or you can adjust links accordingly).

Email Alerts
------------

The backend includes a simple email helper in config/mail.php which uses PHP mail().

- When creating a medication via POST /api/medications with a JSON body that includes an "email" field,
  the API will send an immediate informational email with the medication details.

- When creating an appointment via POST /api/appointments with an "email" field,
  the API will send a confirmation email with the appointment details.

NOTE: On InfinityFree, mail() may require a valid From address, such as:

  no-reply@yourdomain.com

Configure that inside config/mail.php if necessary.
