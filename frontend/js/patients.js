// Patients logic
const patientForm = document.getElementById("patientForm");
const patientsTableBody = document.querySelector("#patientsTable tbody");

async function loadPatients() {
  try {
    const patients = await apiRequest("/patients");
    patientsTableBody.innerHTML = "";
    patients.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.patient_type}</td>
        <td>${p.conditions || "-"}</td>
        <td>
          <button class="btn-secondary btn-small" data-id="${p.id}" data-action="edit">Edit</button>
        </td>
      `;
      patientsTableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load patients");
  }
}

if (patientForm) {
  patientForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("patientId").value;
    const payload = {
      name: document.getElementById("patientName").value.trim(),
      age: Number(document.getElementById("patientAge").value),
      patient_type: document.getElementById("patientType").value,
      conditions: document.getElementById("patientConditions").value.trim(),
    };

    try {
      if (id) {
        await apiRequest(`/patients/${id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/patients", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      patientForm.reset();
      document.getElementById("patientId").value = "";
      await loadPatients();
      alert("Patient saved successfully.");
    } catch (err) {
      console.error(err);
      alert("Error saving patient.");
    }
  });

  patientsTableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action='edit']");
    if (!btn) return;
    const id = btn.dataset.id;
    apiRequest(`/patients/${id}`)
      .then((p) => {
        document.getElementById("patientId").value = p.id;
        document.getElementById("patientName").value = p.name;
        document.getElementById("patientAge").value = p.age;
        document.getElementById("patientType").value = p.patient_type;
        document.getElementById("patientConditions").value = p.conditions || "";
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load patient data.");
      });
  });

  // initial load
  loadPatients();
}
