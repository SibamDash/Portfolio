# Decisions

## D-001: Architecture & Tech Stack Selection
**Context**: Need to determine the core technology stack for the portfolio based on `implementation.md`.
**Decision**: Use React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Lucide React for frontend. Backend/API will be determined later if a dedicated backend is strictly necessary, else Next.js/serverless if migrating, but the spec says "Next.js/serverless API OR small dedicated backend". Since Phase 1 says "Establish frontend architecture" and "Configure Vite/Tailwind" I will initialize a React + Vite + TypeScript app in Phase 1.
**Status**: Decided
