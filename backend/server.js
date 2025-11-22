const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");

const patientsRoutes = require("./routes/patients");
const recordsRoutes = require("./routes/records");
const medicationsRoutes = require("./routes/medications");
const appointmentsRoutes = require("./routes/appointments");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve uploaded files statically if needed
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/patients", patientsRoutes);
app.use("/api/records", recordsRoutes);
app.use("/api/medications", medicationsRoutes);
app.use("/api/appointments", appointmentsRoutes);

// Simple health route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "HealthTrack backend is running" });
});

app.listen(PORT, () => {
  console.log(`HealthTrack backend running on http://localhost:${PORT}`);
});
