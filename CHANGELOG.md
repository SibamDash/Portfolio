# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Phase 6: Database & Content Model.
  - Setup Prisma 8 Composer with PostgreSQL target.
  - Defined `Project` schema for portfolio projects (categories, featured flags, timestamps, arrays).
  - Configured initial database migrations and `seed.ts` data.
- Phase 5: Project Detail / Case Studies.
  - Implemented `/work` route for listing projects.
  - Implemented `/work/[slug]` route with detailed case study layout.
- Phase 4: Project Card Experience.
  - Built interactive ProjectCard with Framer Motion hover mechanics.
  - Implemented automatic Live vs GitHub destination fallback.
- Phase 3: Public Homepage implementation.
  - Added Hero section, Current Focus, Featured Work.
  - Added Engineering Lab preview, Build Log, and About preview.
- Phase 2: Design System setup.
  - Implemented core UI primitives: Button, Card, Badge, Dialog, Skeleton, EmptyState.
  - Built ThemeProvider for seamless light/dark mode toggling.
  - Added RootLayout with responsive navigation.
- Phase 1: Established architecture and foundation.
  - React + Vite + TypeScript frontend.
  - Tailwind CSS configuration.
  - Basic route structure with `react-router-dom`.
  - Global error boundaries and environment variables convention.
- Initialized state files for tracking project progress.
