# HealthTrack – Clean Build Final v1.0

HealthTrack is a unified medical record and medication reminder system designed to help patients, doctors, and families manage and access medical information easily and securely.

This **Clean Build Final v1.0** delivers:
- 100% compatibility between Front-End (JavaScript) and Back-End (PHP)
- Dynamic API routing with zero hard‑coded URLs
- Fully validated database structure
- Clean, stable, production‑ready code

---

## 🚀 Features

### **For Patients**
- Digital medical file (history, labs, prescriptions)
- Medication reminders (browser notifications)
- Upload medical documents
- Manage personal information

### **For Doctors**
- Update patient medical records
- Add diagnoses, notes, and follow‑up instructions
- View patient history instantly

### **For Families**
- Single-family health hub
- Monitor parents/children’s health
- Receive medication alerts

---

## 📁 Project Structure

```
HealthTrack/
│
├── index.html
├── frontend/
│   ├── js/
│   │   ├── app.js
│   │   ├── patients.js
│   │   ├── records.js
│   │   └── reminders.js
│   ├── css/
│   │   └── style.css
│
├── backend/
│   ├── public/
│   │   └── index.php
│   ├── routes/
│   │   ├── patients.php
│   │   ├── records.php
│   │   ├── medications.php
│   │   └── appointments.php
│   ├── config/
│       ├── db.php
│       ├── bootstrap.php
│       └── mail.php
│
└── database/
    ├── tables.sql
    ├── healthtrack.sql
    └── sample-data.sql
```

---

## 🔗 API Routing (Dynamic)

All API requests use:

```
const API_BASE_URL = `${window.location.origin}/backend/public/index.php/api`;
```

This ensures:
- Works on localhost
- Works on cPanel/Hosting
- No broken routes
- No manual edits required

---

## 🛠️ Installation Guide

### **1. Setup Database**
Import all `.sql` files found inside the `database/` folder into MySQL.

### **2. Configure Backend**
Edit file:
```
backend/config/db.php
```
Set:
- host  
- database name  
- username  
- password  

### **3. Run the System**
Open:
```
http://localhost/HealthTrack/index.html
```
or your domain:
```
https://your-domain.com/index.html
```

---

## 📦 Version
**Clean Build Final v1.0**  
Stable and production ready.

---

## 👨🏻‍💻 Developer Notes
This version is:
- Completely debugged
- Optimized for deployment
- Fully synchronized between JS and PHP
- Reviewed file‑by‑file for full compatibility

If you need:
- PowerPoint presentation  
- Documentation PDF  
- UI/UX Improvements  
- API authentication (JWT)  


---

## 🤙🏻 Call Me  
- Linkedin  : www.linkedin.com/in/malek-al-edresi
- Call      : +967-778888730
- Instagram : dde.mt

Just ask!