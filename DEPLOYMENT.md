# HealthTrack System – Final Unified Build

This is the **final cleaned build** of the HealthTrack project where
frontend and backend are fully unified and wired together.

## Project Structure

- `index.html`               → Main web UI
- `frontend/`                → HTML/CSS/JS assets
- `backend/public/index.php` → PHP API entry point
- `backend/config/db.php`    → Database connection (MySQL)
- `database/`                → SQL scripts for schema & sample data

## How to Run on a Server (XAMPP / cPanel / Hosting)

1. Copy the entire **HealthTrack_System** folder contents into your web root:
   - For XAMPP: `htdocs/`
   - For cPanel: `public_html/`

2. Create a MySQL database and import:
   - Files inside `database/` (tables & data).

3. Open `backend/config/db.php` and set:
   - Host, DB name, username, password.

4. In browser open:
   - `https://your-domain.com/index.html`
   or for local: `http://localhost/HealthTrack_System/index.html`

5. The frontend will automatically call:
   - `/backend/public/index.php/api/...`
   using the same domain (no hard-coded URLs).

## Notes

- All JavaScript files use a **single global** `API_BASE_URL`.
- All API routes are compatible with backend PHP routes.
- This build is prepared to work **without manual code changes** after deployment.