# Decisions

## D-001: Architecture & Tech Stack Selection
**Context**: Need to determine the core technology stack for the portfolio based on `implementation.md`.
**Decision**: Use React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Lucide React for frontend. Backend/API will be determined later if a dedicated backend is strictly necessary, else Next.js/serverless if migrating, but the spec says "Next.js/serverless API OR small dedicated backend". Since Phase 1 says "Establish frontend architecture" and "Configure Vite/Tailwind" I will initialize a React + Vite + TypeScript app in Phase 1.
**Status**: Decided

## D-002: Backend Hosting & Database Setup
**Context**: We need a reliable hosting solution for the backend and a PostgreSQL database. We also want to prevent the backend from going to sleep due to inactivity on a free tier.
**Decision**: 
- **Backend Hosting**: Render.
- **Database**: Neon (PostgreSQL). This replaces the previous Oracle backend plans.
- **Cold-Start Mitigation**: We will set up a cron job to ping the backend (e.g., the `/api/health` endpoint) every 7 minutes. This prevents the Render free-tier instance from sleeping and avoids long cold starts after 15 minutes of inactivity.
**Status**: Decided
