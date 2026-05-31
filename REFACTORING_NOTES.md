# Clinica Vet — Refactoring Progress Notes

This file tracks the major changes during the 5-phase improvement plan.

---

## Phase 1 — Stabilization (In Progress)

### Changes Completed So Far

**Security (Critical)**
- Removed hardcoded database password (`root:sql`) from `server/database/db.go`
- Added `github.com/joho/godotenv` support
- Created `server/.env.example` with all required variables
- Made CORS configurable and safer via `ALLOWED_ORIGINS` env var
- Updated `.gitignore` to protect `server/.env`

**Dependency Cleanup**
- Removed from `package.json`:
  - `express` + `@types/express`
  - `mongoose` + `@types/mongoose`
  - `pnpm` (as a runtime dependency — was nonsense)
- Updated project name, description, and version in `package.json`
- Added a `clean` script

**Code Hygiene**
- Fixed duplicate imports in `App.tsx`
- Fixed broken React `key` prop in `Clientes.tsx` (was using `id` instead of `cliente_id`)
- Fixed `index.html` title (was still showing boilerplate text)
- Updated outdated smoke test in `src/components/test.tsx`
- Major README overhaul with setup instructions

---

## Required Manual Steps (You Must Run These)

### 1. Install New Go Dependency

```powershell
cd server
go get github.com/joho/godotenv
go mod tidy
```

### 2. Configure Your Environment

```powershell
cd server
copy .env.example .env
# Now edit .env and put your real MySQL password
```

### 3. (Recommended) Clean Frontend Dependencies

```powershell
# After the above changes, run:
npm install
# or
pnpm install
```

This will remove the deleted packages from node_modules.

---

## ID Unification — JUST COMPLETED

We have standardized **all primary keys to `uint`** with consistent JSON tag `"id"`.

**All models now follow this pattern:**
- `ID uint `json:"id" gorm:"primaryKey"``
- Foreign keys remain descriptive: `ClienteID`, `PetID`, `VetID`

**Action Required From You:**

After pulling these changes:

1. Stop the backend
2. Drop the database:
   ```sql
   DROP DATABASE clinica_vet;
   CREATE DATABASE clinica_vet;
   ```
3. Restart the backend — it will recreate tables with the new schema via AutoMigrate.

If you had important test data, it will be lost. This was unavoidable for long-term correctness.

The following also received consistency improvements:
- All GET single endpoints now properly return 404 when not found
- All DELETE responses now return `{"message": "..."}` consistently
- Added missing not-found checks in several handlers

---

## Phase 2 Foundation - Started

We have begun **Phase 2: Foundation** work, focusing first on Developer Experience.

### New Files Added

- `docker-compose.yml` — Full stack (MySQL + Go backend + Vite frontend)
- `server/Dockerfile` — Go backend with Air hot reload support
- `server/air.toml` — Configuration for live reload inside Docker
- `Dockerfile.frontend` — Vite development container
- `Makefile` — Convenient commands (`make up`, `make down`, `make logs`, `make db-reset`, etc.)
- `.env.example` (root) — Environment variables for Docker Compose

### How to Use (Recommended)

```bash
cp .env.example .env
make up
```

This is a major improvement in local development experience.

---

## Next Steps

Current priority options:

1. **Continue Phase 2** — Improve API client layer, fix the terrible fixed-position layout, add backend validation.
2. **Continue Phase 3 (Features)** — Apply the same treatment we gave to Pets to **Vets** and **Consultas**.
3. **Router Migration** — Begin moving from wouter to react-router-dom v6 (as you chose earlier).

What would you like to tackle next?

---

## Current Decisions Locked

- ID strategy: All `uint`
- Router: Migrate from wouter → react-router-dom v6
- Auth (Phase 5): Minimal JWT + one bootstrap admin
- UI: Adopt shadcn/ui + Radix (longer term)
- Migrations (Phase 5): golang-migrate

---

**Last Updated**: During Phase 1 execution
