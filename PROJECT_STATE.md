# Project State

## 1. Context
- **Project**: Portfolio
- **Phase**: Phase 10: Automatic Live/GitHub Fallback
- **State**: Centralize click behavior logic across the portfolio cards.
- **Repository**: `main` branch solely used

## 2. Recent Actions
- **Phase 9 (Admin Project Management)**: Completed
  - Created GitHub API integration router (`server/github.ts`)
  - Added project creation POST API
  - Built two-step GitHub metadata import and review flow (`AdminProjectNew.tsx`)
- **Phase 8 (Admin Dashboard)**: Completed
  - Created Express API endpoint for listing projects
  - Built `AdminLayout` with sidebar navigation
  - Built `AdminProjects` UI showing projects table and empty states
- **Phase 7 (Admin Authentication)**: Completed
  - Added Express backend server for API routes
  - Implemented JWT cookie-based authentication
  - Added AuthContext and ProtectedRoutes to React frontend
  - Created `/admin/login` page
  - Configured Vite API proxying
  - Updated `dev` script to run backend and frontend concurrently
- **Phase 6 (Database & Content Model)**: Completed
- **Phase 5 (Project Detail / Case Studies)**: Completed
- **Phase 4 (Project Card Experience)**: Completed
- **Phase 3 (Public Homepage)**: Completed
- **Phase 2 (Design System)**: Completed
- **Phase 1 (Architecture & Foundation)**: Completed
- **Phase 0 (Repository Audit)**: Completed

## Known Issues
- Database migrations require a valid `DATABASE_URL` in `.env` to execute against a live PostgreSQL instance.

## Next Task
- Implement project creation form and GitHub data import.
