const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET all patients
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM patients ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching patients.");
  }
});

// GET single patient
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM patients WHERE id = ?", [
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).send("Patient not found.");
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching patient.");
  }
});

// CREATE patient
router.post("/", async (req, res) => {
  const { name, age, patient_type, conditions } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO patients (name, age, patient_type, conditions) VALUES (?, ?, ?, ?)",
      [name, age, patient_type, conditions || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating patient.");
  }
});

// UPDATE patient
router.put("/:id", async (req, res) => {
  const { name, age, patient_type, conditions } = req.body;
  try {
    await db.query(
      "UPDATE patients SET name = ?, age = ?, patient_type = ?, conditions = ? WHERE id = ?",
      [name, age, patient_type, conditions || null, req.params.id]
    );
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating patient.");
  }
});

module.exports = router;
