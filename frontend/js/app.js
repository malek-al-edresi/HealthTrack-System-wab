// Global API base URL: always points to backend on same domain
const API_BASE_URL = `${window.location.origin}/backend/public/index.php/api`;

// Simple helper for fetch with JSON
async function apiRequest(path, options = {}) {
  const res = await fetch(API_BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }
  return res.json();
}

// Role switcher UI
const roleButtons = document.querySelectorAll(".role-switcher button");
const roleSections = document.querySelectorAll(".role-section");

roleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const role = btn.dataset.role;
    roleButtons.forEach((b) => b.classList.toggle("active", b === btn));
    roleSections.forEach((section) => {
      section.classList.toggle("hidden", section.dataset.role !== role);
    });
  });
});