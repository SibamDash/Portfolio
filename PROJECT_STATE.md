# Project State

## 1. Context
- **Project**: Portfolio
- **Phase**: Phase 14: Dark/Light Mode System
- **State**: Build global theme toggle and refine light mode aesthetics.
- **Repository**: `main` branch solely used

## 2. Recent Actions
- **Phase 13 (Engineering Lab)**: Completed
  - Added `/lab` route in `App.tsx` and navigation menu.
  - Built `Lab.tsx` grid layout.
  - Implemented an interactive HTML5 Canvas `ParticleSystem` experiment using vanilla JS + Canvas API integrated in a React component.
- **Phase 12 (Architecture Visualization)**: Completed
  - Added `architectureNodes` (Json) to Prisma schema.
  - Built custom SVG/CSS interactive `ArchitectureDiagram.tsx`.
  - Updated Admin UI to accept JSON for architecture nodes.
  - Rendered diagram dynamically in Case Study view.
- **Phase 11 (Case Study System)**: Completed
  - Built `GET /api/projects` endpoints in Express.
  - Rewrote `ProjectDetail.tsx` to fetch dynamic project case studies from the backend.
  - Adapted `Home.tsx` and `Work.tsx` to dynamically fetch projects.
  - Conditionally rendered deep-dive content based on `caseStudyEnabled`.
- **Phase 10 (Automatic Live/GitHub Fallback)**: Completed
  - Extracted URL validation and fallback logic into `getProjectDestination`.
  - Applied centralized fallback logic to `ProjectCard` and `ProjectDetail`.
  - Added URL validation to `POST /api/admin/projects`.
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
