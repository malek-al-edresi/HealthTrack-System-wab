// Web Notifications and reminders
const reminderForm = document.getElementById("reminderForm");
const remindersList = document.getElementById("remindersList");

const familyDoctorForm = document.getElementById("familyDoctorForm");

async function ensureNotificationPermission() {
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
    return false;
  }
  if (Notification.permission === "granted") return true;
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return false;
}

function scheduleNotification(reminder) {
  const now = Date.now();
  const target = new Date(reminder.time).getTime();
  const diff = target - now;
  if (diff <= 0) {
    // If time already passed, notify immediately
    new Notification("HealthTrack reminder", {
      body: `${reminder.type.toUpperCase()}: ${reminder.note} (Patient ID: ${reminder.patient_id})`,
    });
    return;
  }
  setTimeout(() => {
    new Notification("HealthTrack reminder", {
      body: `${reminder.type.toUpperCase()}: ${reminder.note} (Patient ID: ${reminder.patient_id})`,
    });
  }, diff);
}

function addReminderToList(reminder) {
  const li = document.createElement("li");
  li.textContent = `[${reminder.type}] ${reminder.note} – ${new Date(
    reminder.time
  ).toLocaleString()} (Patient ${reminder.patient_id})`;
  remindersList.appendChild(li);
}

if (reminderForm) {
  reminderForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = await ensureNotificationPermission();
    if (!ok) {
      alert("Notifications permission denied.");
      return;
    }
    const reminder = {
      patient_id: Number(document.getElementById("reminderPatientId").value),
      type: document.getElementById("reminderType").value,
      time: document.getElementById("reminderTime").value,
      note: document.getElementById("reminderNote").value || "Scheduled reminder",
    };
    addReminderToList(reminder);
    scheduleNotification(reminder);
    reminderForm.reset();
  });
}

// Family–Doctor link - simple demo only (stored client-side)
if (familyDoctorForm) {
  familyDoctorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const family = document.getElementById("familyName").value.trim();
    const doctor = document.getElementById("doctorName").value.trim();
    alert(`Family "${family}" is now linked to Dr. "${doctor}" (demo only).`);
    familyDoctorForm.reset();
  });
}

// File uploads
const uploadForm = document.getElementById("uploadForm");
const uploadsTableBody = document.querySelector("#uploadsTable tbody");

async function loadUploads() {
  try {
    const uploads = await apiRequest("/records/uploads");
    uploadsTableBody.innerHTML = "";
    uploads.forEach((u) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.original_name}</td>
        <td>${u.patient_id}</td>
        <td>${new Date(u.created_at).toLocaleString()}</td>
      `;
      uploadsTableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
  }
}

if (uploadForm) {
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const patientId = document.getElementById("uploadPatientId").value;
    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
      alert("Select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("patient_id", patientId);
    formData.append("file", fileInput.files[0]);

    try {
      const res = await fetch(API_BASE_URL + "/records/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      await loadUploads();
      uploadForm.reset();
      alert("File uploaded successfully.");
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    }
  });

  loadUploads();
}
