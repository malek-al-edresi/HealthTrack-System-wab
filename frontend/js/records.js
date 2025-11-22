// Records logic
const recordForm = document.getElementById("recordForm");
const recordsPatientSearch = document.getElementById("recordsPatientSearch");
const loadRecordsBtn = document.getElementById("loadRecordsBtn");
const recordsTableBody = document.querySelector("#recordsTable tbody");

async function loadRecords(patientId) {
  try {
    const records = await apiRequest(`/records/patient/${patientId}`);
    recordsTableBody.innerHTML = "";
    if (!records.length) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 4;
      td.textContent = "No records found for this patient.";
      tr.appendChild(td);
      recordsTableBody.appendChild(tr);
      return;
    }
    records.forEach((r) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.id}</td>
        <td>${r.record_type}</td>
        <td>${r.details}</td>
        <td>${new Date(r.created_at).toLocaleString()}</td>
      `;
      recordsTableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load records.");
  }
}

if (recordForm) {
  recordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      patient_id: Number(document.getElementById("recordPatientId").value),
      record_type: document.getElementById("recordType").value,
      details: document.getElementById("recordDetails").value.trim(),
    };
    try {
      await apiRequest("/records", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      alert("Record saved.");
      recordForm.reset();
      if (recordsPatientSearch.value) {
        loadRecords(recordsPatientSearch.value);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving record.");
    }
  });
}

if (loadRecordsBtn) {
  loadRecordsBtn.addEventListener("click", () => {
    const id = recordsPatientSearch.value;
    if (!id) {
      alert("Enter patient ID first.");
      return;
    }
    loadRecords(id);
  });
}
