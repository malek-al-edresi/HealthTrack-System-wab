const express = require("express");
const router = express.Router();
const db = require("../config/database");
const multer = require("multer");
const path = require("path");

// Medical records CRUD

router.post("/", async (req, res) => {
  const { patient_id, record_type, details } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO medical_records (patient_id, record_type, details) VALUES (?, ?, ?)",
      [patient_id, record_type, details]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating record.");
  }
});

router.get("/patient/:patientId", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM medical_records WHERE patient_id = ? ORDER BY created_at DESC",
      [req.params.patientId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records.");
  }
});

// File uploads using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const { patient_id } = req.body;
  if (!req.file) return res.status(400).send("No file uploaded.");
  try {
    await db.query(
      "INSERT INTO uploaded_files (patient_id, file_name, original_name) VALUES (?, ?, ?)",
      [patient_id, req.file.filename, req.file.originalname]
    );
    res.status(201).json({ message: "File uploaded." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving file metadata.");
  }
});

router.get("/uploads", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM uploaded_files ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching uploads.");
  }
});

module.exports = router;
