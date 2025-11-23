<?php
$DB_HOST = getenv('DB_HOST') ?: 'sql211.infinityfree.com';      // e.g. sqlXXX.epizy.com on InfinityFree
$DB_NAME = getenv('DB_NAME') ?: 'if0_40484502_healthtrack';     // your database name
$DB_USER = getenv('DB_USER') ?: 'if0_40484502';                 // your db username
$DB_PASS = getenv('DB_PASSWORD') ?: 'UKRgrkoJarKn';             // your db password


$connection = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
    if ($connection){
        die("Connection successful");  
    }

    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
$connection->set_charset("utf8mb4");