const express = require("express");
const router = express.Router();
const db = require("../config/database");

// CRUD for appointments (basic)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM appointments ORDER BY date_time DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching appointments.");
  }
});

router.post("/", async (req, res) => {
  const { patient_id, doctor_name, date_time, notes } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO appointments (patient_id, doctor_name, date_time, notes) VALUES (?, ?, ?, ?)",
      [patient_id, doctor_name, date_time, notes]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating appointment.");
  }
});

module.exports = router;
