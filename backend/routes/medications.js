const express = require("express");
const router = express.Router();
const db = require("../config/database");

// CRUD for medications (basic)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM medications ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching medications.");
  }
});

router.post("/", async (req, res) => {
  const { patient_id, name, dosage, schedule } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO medications (patient_id, name, dosage, schedule) VALUES (?, ?, ?, ?)",
      [patient_id, name, dosage, schedule]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating medication.");
  }
});

module.exports = router;
