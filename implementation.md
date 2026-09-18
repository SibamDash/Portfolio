# Sibam Dash — Modern Engineering Portfolio
## Autonomous Implementation Specification for Antigravity

> **Mission:** Build, test, polish, deploy, and continuously maintain a production-quality personal portfolio with a premium Netflix-inspired project browsing experience and a private project-management/admin system.
>
> **Operating mode:** Antigravity should work autonomously through the phases below. Do not stop after each phase to ask for approval unless a decision is genuinely blocking, destructive, security-sensitive, or impossible to infer safely.

---

# 0. NON-NEGOTIABLE RULES

These rules apply to the entire project.

## 0.1 Product rules

1. This is a **professional engineering portfolio**, not a generic developer template.
2. The site must feel like a polished software product.
3. Use Netflix-inspired **browsing mechanics**, but DO NOT copy Netflix branding, layout, assets, wording, or proprietary visual identity.
4. Prioritize:
   - first impression
   - project discoverability
   - technical credibility
   - speed
   - accessibility
   - mobile usability
   - maintainability
5. Never add a feature merely because it is technically interesting.
6. Avoid visual clutter, excessive gradients, excessive glassmorphism, excessive 3D, particle backgrounds, giant animated text, skill percentage bars, fake statistics, fake testimonials, or generic motivational copy.
7. Every animation must have a purpose and must not interfere with navigation.
8. The portfolio must remain useful if JavaScript-dependent enhancements fail.
9. No fake project data, fake metrics, fake experience, fake users, fake testimonials, fake GitHub activity, or fabricated achievements.
10. Never expose secrets, API keys, admin credentials, database credentials, or private GitHub tokens to the client.

## 0.2 Engineering rules

1. Production-quality code only.
2. TypeScript strict mode.
3. No `any` unless there is a documented and unavoidable reason.
4. No giant components.
5. No duplicated business logic.
6. Use clear feature/module boundaries.
7. Validate all external input.
8. Sanitize/render untrusted content safely.
9. Server-side authorization must protect every admin mutation.
10. Never trust client-side admin checks.
11. Never store sensitive secrets in localStorage.
12. Use environment variables for secrets and deployment-specific configuration.
13. Add error handling for all network/API operations.
14. Add loading, empty, success, and failure states.
15. Do not silently swallow errors.
16. Do not disable linting/type checking to make builds pass.
17. Do not suppress warnings without documenting why.
18. Keep dependencies minimal.
19. Prefer stable, well-maintained packages.
20. Remove unused dependencies and dead code.

## 0.3 Autonomous-agent rules

Antigravity should:

1. Inspect the repository before changing anything.
2. Preserve existing useful work.
3. Never rewrite the project blindly.
4. Maintain a `PROJECT_STATE.md` file containing:
   - current phase
   - completed tasks
   - active task
   - known issues
   - next task
5. Maintain `DECISIONS.md` for important architectural decisions.
6. Maintain `CHANGELOG.md`.
7. After every meaningful milestone:
   - run type checking
   - run lint
   - run tests
   - run production build
8. Fix failures before moving forward.
9. If a test/tool is unavailable, document it instead of pretending it passed.
10. Use small, coherent commits.
11. Do not commit secrets, `.env` files, credentials, private keys, or generated junk.
12. Before destructive operations, create a recoverable checkpoint/commit.
13. Do not ask for approval for ordinary implementation choices when this specification already defines the desired behavior.
14. If blocked by missing credentials or an external service, continue all independent work and record the exact manual action required.
15. Never claim something works unless it has been verified.
16. At the end of every phase, update `PROJECT_STATE.md`.
17. When restarting work, read:
   - `PROJECT_STATE.md`
   - `DECISIONS.md`
   - `CHANGELOG.md`
   - repository instructions
   before doing anything else.

---

# 1. PRODUCT VISION

## Positioning

The portfolio should communicate:

> **I build software systems that solve real problems.**

Primary identity:

**Sibam Dash — Software Engineer / Builder**

Primary technical positioning:

- Backend engineering
- Full-stack development
- Enterprise-oriented systems
- APIs
- Identity and access management
- SaaS
- Databases
- Docker / CI/CD
- System architecture

The site must demonstrate these capabilities rather than merely listing them.

---

# 2. TARGET EXPERIENCE

A recruiter should be able to:

1. Understand who Sibam is within 10–20 seconds.
2. See the strongest projects immediately.
3. Hover a project card and understand what it does.
4. Open the live application directly if available.
5. Fall back to GitHub automatically if no live URL exists.
6. Inspect a technical case study.
7. View architecture and engineering decisions.
8. Access the resume.
9. Find GitHub and LinkedIn.
10. Use the entire site comfortably on mobile.

A technical interviewer should additionally be able to:

- inspect architecture
- inspect APIs
- understand design decisions
- see technology-to-project evidence
- inspect source code
- understand implementation tradeoffs

---

# 3. RECOMMENDED STACK

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend

Use a lightweight backend appropriate to deployment.

Preferred architecture:

- Next.js/serverless API OR
- small dedicated backend if required

Do NOT build a large Spring Boot backend for the portfolio merely because Java is a preferred skill.

The portfolio backend exists only to support legitimate functionality such as:

- admin authentication
- project CRUD
- GitHub metadata import
- media metadata
- contact handling if implemented

## Database

PostgreSQL.

Use a managed PostgreSQL provider.

## Storage

Use managed object/media storage for:

- project screenshots
- preview videos
- logos
- resume

Avoid storing large media blobs directly in PostgreSQL.

## Deployment

- Frontend: Vercel
- Database: managed PostgreSQL
- Media: appropriate managed object/media storage
- GitHub integration: GitHub API

## Analytics

Use privacy-conscious analytics such as Vercel Analytics if available.

---

# 4. INFORMATION ARCHITECTURE

## Public routes

```text
/
 /work
 /work/[slug]
 /lab
 /about
 /resume
 /contact
```

Optional:

```text
/now
```

## Admin routes

```text
/admin
/admin/login
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/settings
```

The admin area must not be linked prominently from the public navigation.

---

# 5. PUBLIC NAVIGATION

Keep navigation minimal:

```text
SIBAM DASH

Work
Lab
About
Resume

GitHub
LinkedIn
```

Mobile navigation must be compact and accessible.

---

# 6. HOMEPAGE DESIGN

## Section 1 — Hero

Minimal and high-impact.

Suggested structure:

```text
SOFTWARE ENGINEER

I build software systems that solve real problems.

Backend systems, SaaS platforms, identity infrastructure
and full-stack products.

[ Explore Work ]
[ GitHub ]
```

Do not use generic phrases such as:

- passionate developer
- coding enthusiast
- tech geek
- future software engineer
- turning coffee into code

## Section 2 — Current focus

Show what is currently being built.

Example:

```text
CURRENTLY BUILDING

Enterprise IAM
Identity · Authorization · Security
● IN DEVELOPMENT
```

This data should preferably come from the project database rather than being hardcoded.

## Section 3 — Featured work

This is the visual centerpiece.

---

# 7. NETFLIX-INSPIRED PROJECT EXPERIENCE

## Normal card

Each project card should show:

- project logo/mark
- project name
- concise category
- subtle metadata

Example:

```text
┌──────────────────────┐
│                      │
│        IAM           │
│                      │
│ Identity Platform    │
│                      │
└──────────────────────┘
```

## Hover

Desktop hover should expand/reveal:

- preview image OR short muted video
- project name
- short description
- key technologies
- Live/Open action
- Case Study action
- GitHub action

Use Framer Motion for a restrained transition.

## Click behavior

Primary card action:

```text
IF liveUrl exists
    → open liveUrl
ELSE
    → open repositoryUrl
```

Prefer an explicit `Open Project` button as well.

Never make the card's behavior ambiguous.

## Mobile behavior

Hover does not exist on touch devices.

Therefore:

- cards should be tappable
- preview/details can appear on tap
- provide explicit buttons
- avoid hover-only information

---

# 8. PROJECT DATA MODEL

Design the project schema around future extensibility.

Minimum fields:

```text
id
slug
name
shortDescription
description
repositoryUrl
liveUrl
logoUrl
previewImageUrl
previewVideoUrl
category
technologies[]
featured
status
displayOrder
createdAt
updatedAt
```

Optional advanced fields:

```text
problem
solution
architecture
engineeringDecisions[]
challenges[]
results[]
apiDocumentationUrl
caseStudyEnabled
githubMetadata
```

Status:

```text
IN_DEVELOPMENT
LIVE
ARCHIVED
```

Categories:

```text
BACKEND
FULL_STACK
SYSTEMS
EXPERIMENT
OTHER
```

Do not over-engineer the schema before there is a real need.

---

# 9. ADMIN PROJECT MANAGEMENT

The core admin goal:

> Add a project with minimal manual work.

## Add project flow

Admin enters:

```text
Repository URL *
Live URL (optional)
```

Then:

```text
[ Import Project ]
```

System fetches public GitHub metadata.

Automatically attempt to import:

- repository name
- description
- owner
- default branch
- language
- topics
- repository URL
- stars
- forks
- last updated
- README
- language breakdown

Never blindly trust repository metadata.

Allow the admin to review/edit imported information before publishing.

## Optional fields after import

```text
Project name
Slug
Short description
Category
Technologies
Logo
Preview image
Preview video
Live URL
Featured
Status
Display order
```

## Publish

Admin clicks:

```text
Save Draft
Publish
```

The public portfolio updates from database content.

---

# 10. AUTOMATIC LIVE/GITHUB FALLBACK

Centralize this logic.

Pseudo-behavior:

```text
function getProjectDestination(project):
    if valid(project.liveUrl):
        return project.liveUrl
    return project.repositoryUrl
```

Validation must happen before saving.

Rules:

- repository URL is required
- live URL is optional
- only valid HTTP(S) URLs are accepted
- unsafe schemes such as `javascript:` must be rejected
- external links should open safely
- broken live URLs should not be allowed to crash the UI

---

# 11. GITHUB IMPORT SYSTEM

Build GitHub import as a service/module, not inside UI components.

Responsibilities:

```text
GitHubService
 ├── parseRepositoryUrl()
 ├── fetchRepository()
 ├── fetchLanguages()
 ├── fetchTopics()
 ├── fetchReadme()
 └── normalizeRepositoryData()
```

Handle:

- invalid URLs
- private repositories
- deleted repositories
- rate limits
- API failures
- missing README
- missing description
- GitHub API changes

The admin UI must show useful error messages.

---

# 12. CASE STUDY SYSTEM

Every serious project can have a case study.

Recommended structure:

```text
Project
    ↓
Overview
    ↓
Problem
    ↓
Solution
    ↓
Architecture
    ↓
Technical decisions
    ↓
Implementation
    ↓
Challenges
    ↓
Results
    ↓
Links
```

Do not fabricate metrics.

If there are no measured results, say what was implemented rather than inventing performance claims.

---

# 13. ARCHITECTURE VISUALIZATION

For projects where architecture matters, provide a clean diagram.

Potential implementation:

- SVG
- React Flow
- custom CSS/SVG

Do not introduce a heavy graph library unless necessary.

Nodes may represent:

```text
Frontend
API
Authentication
Services
Database
Redis
Queue
External APIs
```

Interactions:

- hover highlights a component
- tooltip explains its responsibility
- mobile view remains readable
- diagram has accessible text equivalent

---

# 14. ENGINEERING LAB

Create a smaller section/page for technical experiments.

Examples:

```text
JWT Authentication
Redis Caching
RabbitMQ Messaging
PostgreSQL Indexing
Rate Limiting
Docker Networking
WebSockets
```

Each experiment should contain:

- problem
- implementation
- small demonstration
- takeaway
- source code where appropriate

Only include experiments that actually exist.

---

# 15. BUILD LOG

Create an optional chronological engineering log.

Example:

```text
2026.09.14
Added refresh-token rotation

2026.09.11
Added tenant-aware authorization

2026.09.05
Started IAM architecture
```

Possible automation:

- GitHub commits
- manually curated milestones
- release notes

Do not expose every trivial commit.

Prefer meaningful milestones.

---

# 16. GITHUB INTEGRATION

Public GitHub integration can display:

- selected repositories
- recent meaningful activity
- languages
- repository links

Do not make GitHub API requests on every page render if avoidable.

Use:

- caching
- server-side fetching
- incremental refresh
- appropriate API limits

Do not expose GitHub personal access tokens to the browser.

---

# 17. RESUME

Provide:

```text
View Resume
Download Resume
```

The resume should be accessible from navigation.

Do not require login.

If a web resume exists, keep it visually consistent with the portfolio.

---

# 18. ABOUT PAGE

Avoid a long biography.

Use:

```text
Who I am
What I build
What I am learning
What I care about technically
Current focus
Education
Links
```

Keep it factual.

---

# 19. DESIGN SYSTEM

## Typography

Preferred:

- Inter / Geist / similar modern sans-serif
- JetBrains Mono for technical/code elements

## Color

Use a restrained palette:

- near-black / white foundation
- muted gray secondary text
- one accent color

Support:

- dark mode
- light mode

Do not use multiple competing accent colors.

## Visual language

Use:

- strong typography
- whitespace
- subtle borders
- restrained shadows
- subtle grid/noise if useful
- smooth transitions

Avoid:

- excessive glassmorphism
- excessive neon
- huge gradients
- 3D gimmicks
- constant particle effects

---

# 20. ACCESSIBILITY

Target WCAG 2.2 AA where practical.

Requirements:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- alt text
- reduced-motion support
- accessible dialogs
- accessible menus
- accessible buttons
- no hover-only essential information
- form labels
- validation messages
- screen-reader-friendly architecture explanations

Respect:

```text
prefers-reduced-motion
```

---

# 21. PERFORMANCE

Target:

- Lighthouse Performance 90+
- Accessibility 90+
- Best Practices 90+
- SEO 90+

Optimize:

- images
- preview videos
- fonts
- JavaScript bundles
- API calls
- third-party scripts

Rules:

1. Lazy-load below-the-fold media.
2. Use responsive images.
3. Compress preview videos.
4. Avoid autoplaying multiple videos simultaneously.
5. Do not load large libraries for small effects.
6. Avoid unnecessary client-side rendering.
7. Cache external API data.

---

# 22. SEO

Implement:

- title metadata
- description metadata
- Open Graph
- Twitter/X card metadata where appropriate
- canonical URLs
- sitemap
- robots.txt
- semantic headings
- structured metadata where useful

Project pages should have unique metadata.

---

# 23. SECURITY

## Admin

Implement:

- secure authentication
- server-side authorization
- secure session/cookie handling
- rate limiting where appropriate
- CSRF protection where applicable
- input validation
- output sanitization
- secure headers

## Database

- parameterized queries / ORM
- least-privilege database credentials
- no credentials in source code

## GitHub

- public data can use unauthenticated API where possible
- if authentication is required, store token server-side only
- never expose GitHub tokens in client bundles

## Media

Validate:

- file type
- file size
- filename
- upload destination

Do not execute uploaded files.

---

# 24. CONTACT

Keep contact simple.

Preferred:

```text
Email
GitHub
LinkedIn
Resume
```

If a contact form is implemented:

- validate server-side
- rate limit
- spam protection
- clear success/error states
- never expose email-service secrets client-side

Do not build an elaborate messaging system.

---

# 25. ERROR STATES

Every dynamic area must have:

### Loading

A visually consistent skeleton.

### Empty

Example:

```text
No projects available yet.
```

### Error

Example:

```text
Something went wrong loading this section.

Retry
```

### Offline/network failure

The public portfolio should remain usable where cached/static content is available.

---

# 26. RESPONSIVE BEHAVIOR

Breakpoints should be based on layout needs, not arbitrary device names.

Desktop:

- expanded project hover interactions
- multi-column project grid
- architecture diagrams

Tablet:

- reduced grid
- simplified hover behavior

Mobile:

- one/two-column cards depending on width
- tap interactions
- no hover-dependent content
- simplified navigation
- readable architecture content

Test at minimum:

- 320px
- 375px
- 390px
- 768px
- 1024px
- 1440px+

---

# 27. PHASED IMPLEMENTATION

## PHASE 0 — Repository Audit

Tasks:

1. Inspect current repository.
2. Identify existing framework/files.
3. Read all repository instructions.
4. Identify existing assets.
5. Identify existing deployment configuration.
6. Check package manager.
7. Check current build.
8. Check current tests.
9. Check Git status.

Deliverables:

```text
PROJECT_STATE.md
DECISIONS.md
CHANGELOG.md
```

Do not delete existing useful work.

---

## PHASE 1 — Architecture & Foundation

Tasks:

1. Establish frontend architecture.
2. Configure TypeScript strict mode.
3. Configure linting.
4. Configure formatting.
5. Configure Tailwind.
6. Establish route structure.
7. Establish reusable UI primitives.
8. Establish design tokens.
9. Establish error boundaries.
10. Establish environment-variable conventions.

Validation:

```text
typecheck
lint
test
build
```

---

## PHASE 2 — Design System

Build:

- typography
- spacing
- buttons
- links
- cards
- badges
- dialogs
- navigation
- skeletons
- empty states
- error states

Implement:

- dark mode
- light mode
- responsive foundations
- reduced-motion behavior

Do not begin detailed pages until the primitives are stable.

---

## PHASE 3 — Public Homepage

Build:

1. Navbar
2. Hero
3. Current focus
4. Featured work
5. Engineering focus
6. Build log preview
7. About preview
8. Contact/footer

Focus on visual hierarchy.

Do not overload the homepage.

---

## PHASE 4 — Project Card Experience

Implement the signature experience.

Tasks:

1. Project card.
2. Hover expansion.
3. Preview image.
4. Preview video.
5. Technology badges.
6. Open Project action.
7. GitHub action.
8. Case Study action.
9. Mobile tap behavior.
10. Keyboard behavior.
11. Reduced-motion behavior.

Implement destination logic:

```text
liveUrl → live project
no liveUrl → GitHub
```

Test:

- mouse
- keyboard
- touch
- mobile
- reduced motion

---

## PHASE 5 — Project Detail / Case Studies

Build:

```text
/work/[slug]
```

Include:

- hero
- overview
- problem
- solution
- architecture
- technologies
- engineering decisions
- challenges
- results
- links

Use real project content only.

---

## PHASE 6 — Database & Content Model

Create PostgreSQL schema.

Implement:

- migrations
- project table
- categories/status
- ordering
- featured flag
- timestamps

Add seed data only for genuine projects.

Use migrations rather than manually changing production schema.

---

## PHASE 7 — Admin Authentication

Build:

```text
/admin/login
```

Requirements:

- secure authentication
- protected routes
- server-side authorization
- secure cookies/session
- logout
- session expiry
- rate limiting if appropriate

Test unauthorized access explicitly.

---

## PHASE 8 — Admin Project Dashboard

Build:

```text
/admin/projects
```

Features:

- list projects
- search
- filter
- sort
- create
- edit
- delete/archive
- publish/unpublish
- featured toggle
- display ordering

Use confirmation for destructive operations.

---

## PHASE 9 — GitHub Import

Build:

```text
Repository URL
Live URL
[Import Project]
```

Implement:

- URL parsing
- repository metadata retrieval
- language retrieval
- topics
- README
- normalization
- error handling
- rate-limit handling

Admin reviews imported data before publishing.

---

## PHASE 10 — Media Management

Allow admin to attach:

- logo
- screenshot
- preview video

Implement:

- upload validation
- compression/optimization where appropriate
- storage
- deletion
- replacement
- fallback image

Optimize video for web delivery.

---

## PHASE 11 — Engineering Lab & Build Log

Build:

- `/lab`
- build log component

Add only real content.

If GitHub activity is automated, cache it.

---

## PHASE 12 — GitHub Activity Integration

Implement:

- selected repositories
- recent meaningful activity
- language information

Add caching.

Ensure API failures do not break the portfolio.

---

## PHASE 13 — Resume / About / Contact

Build:

- `/resume`
- `/about`
- `/contact`

Keep content concise and factual.

---

## PHASE 14 — SEO & Discoverability

Implement:

- metadata
- sitemap
- robots
- canonical
- Open Graph
- project-specific metadata
- structured data where useful

Test generated metadata.

---

## PHASE 15 — Performance Optimization

Run production profiling.

Optimize:

- bundle
- fonts
- images
- videos
- API calls
- animations

Remove unnecessary dependencies.

Run Lighthouse.

Fix the highest-impact problems first.

---

## PHASE 16 — Security Audit

Review:

- authentication
- authorization
- cookies
- headers
- CORS
- CSRF
- XSS
- URL validation
- uploads
- database access
- environment variables
- rate limiting
- error leakage

Ensure production logs do not expose secrets.

---

## PHASE 17 — Full QA

Test:

### Functional

- navigation
- project opening
- GitHub fallback
- case studies
- admin login
- project creation
- project editing
- project deletion/archive
- GitHub import
- media upload
- publishing

### Responsive

- mobile
- tablet
- desktop

### Accessibility

- keyboard
- screen reader basics
- focus
- contrast
- reduced motion

### Failure cases

- API down
- GitHub unavailable
- invalid URL
- missing image
- missing video
- missing live URL
- expired session
- unauthorized admin request
- empty database

---

## PHASE 18 — Production Deployment

Tasks:

1. Configure production environment.
2. Configure database.
3. Run migrations.
4. Configure storage.
5. Configure environment variables.
6. Configure domain if available.
7. Deploy.
8. Run smoke tests against production.
9. Verify HTTPS.
10. Verify admin authentication.
11. Verify public project links.
12. Verify GitHub integration.
13. Verify mobile experience.

Never expose environment secrets in logs.

---

## PHASE 19 — Final Polish

Perform a final product-design pass.

Ask:

- Is the first impression strong?
- Is the portfolio obviously personal?
- Are the projects immediately discoverable?
- Does the hover interaction feel smooth?
- Is anything unnecessary?
- Are there awkward animations?
- Is typography consistent?
- Are cards visually balanced?
- Does mobile feel intentional?
- Does anything look like a generic template?

Remove rather than add if something weakens the experience.

---

# 28. AUTOMATION REQUIREMENTS

Automate as much maintenance as reasonably possible.

## Project import

Input:

```text
GitHub repository URL
```

Automatically retrieve metadata.

## Project publishing

After admin approval:

```text
Database → public portfolio
```

No code change required.

## GitHub activity

Automatically refresh cached activity.

## Build log

Optionally derive meaningful entries from GitHub releases/commits.

## Media

Automatically optimize uploaded images where infrastructure supports it.

## Deployment

Push to main:

```text
lint
→ typecheck
→ tests
→ build
→ deploy
```

If CI fails, deployment must fail.

---

# 29. TESTING STRATEGY

At minimum:

## Unit tests

- URL validation
- project destination logic
- GitHub URL parsing
- data normalization
- project validation

## Integration tests

- project CRUD
- authentication
- authorization
- GitHub import
- publishing

## E2E tests

At minimum:

```text
Homepage → project → live link
Homepage → project → GitHub fallback
Admin login → add project → publish → public project visible
```

Use a dedicated test database/environment.

---

# 30. CI/CD

Create a CI pipeline.

On pull request:

```text
install
lint
typecheck
unit tests
build
```

On main:

```text
lint
typecheck
tests
build
deploy
```

Do not deploy if validation fails.

---

# 31. CONTENT RULES

All public copy must be:

- concise
- specific
- factual
- technically credible

Prefer:

> Built a multi-tenant booking platform with tenant isolation, JWT authentication, PostgreSQL and Redis.

Avoid:

> Built a revolutionary next-generation enterprise-grade scalable solution.

Never use marketing language that cannot be supported.

---

# 32. PROJECT PRIORITY

The strongest projects should receive the most visual attention.

Initial project candidates:

1. Enterprise IAM
2. Multi-Tenant SaaS
3. GLAUSCO CRM
4. Event-Driven Notification Service
5. Selected experiments

Do not show unfinished/weak projects merely to increase the project count.

---

# 33. NO GENERIC PORTFOLIO FEATURES

Do NOT automatically add:

- fake testimonials
- fake client logos
- fake job counters
- fake visitor counters
- skill percentages
- meaningless progress bars
- motivational quotes
- stock developer illustrations
- random blog posts
- unnecessary chatbot
- unnecessary 3D avatar
- unnecessary loading screen
- giant terminal animation
- excessive particle effects

Every feature must justify its existence.

---

# 34. DEFINITION OF DONE

The project is complete only when:

- [ ] Public site works
- [ ] Mobile site works
- [ ] Project cards work
- [ ] Hover interaction works
- [ ] Mobile project interaction works
- [ ] Live URL redirects correctly
- [ ] GitHub fallback works
- [ ] Case studies work
- [ ] Admin authentication works
- [ ] Admin authorization works
- [ ] Project creation works
- [ ] Project editing works
- [ ] Project publishing works
- [ ] Project archival/deletion works
- [ ] GitHub import works
- [ ] Media upload works
- [ ] PostgreSQL works
- [ ] CI works
- [ ] Production build works
- [ ] Production deployment works
- [ ] SEO implemented
- [ ] Accessibility reviewed
- [ ] Performance reviewed
- [ ] Security reviewed
- [ ] No secrets committed
- [ ] No critical console errors
- [ ] No known critical bugs
- [ ] Documentation updated

---

# 35. FINAL AUTONOMOUS EXECUTION INSTRUCTION

Antigravity should now execute this specification sequentially.

For each phase:

1. Read the current state.
2. Inspect existing implementation.
3. Implement the phase.
4. Test it.
5. Fix failures.
6. Perform a small visual/UX review.
7. Update `PROJECT_STATE.md`.
8. Update `CHANGELOG.md`.
9. Record important decisions in `DECISIONS.md`.
10. Create a coherent checkpoint/commit.
11. Continue to the next phase.

Do not stop merely because a phase is complete.

Continue autonomously until:

- all feasible phases are complete,
- production deployment is complete,
- verification is complete,
- or a genuine external blocker requires human action.

When blocked, record:

```text
BLOCKED

Reason:
Exact required action:
Why it cannot be automated:
What work can continue meanwhile:
```

Then continue with all independent work.

At the end, provide a concise final report containing:

```text
STATUS
Completed phases:
Remaining work:
External actions required:
Production URL:
Admin URL:
Tests:
Build:
Deployment:
Known limitations:
```

Do not claim success for any item that was not actually verified.


---

# 36. GIT / VERSION CONTROL & VERIFIED PUSH POLICY

The configured GitHub repository is the **single source of truth** for this portfolio project.

## Mandatory workflow

Every coherent section must follow:

```text
IMPLEMENT
→ LOCAL VALIDATION
→ FUNCTIONAL CHECK
→ QUALITY CHECK
→ BUILD
→ COMMIT
→ PUSH
→ VERIFY REMOTE/CI
→ NEXT SECTION
```

**NEVER push code merely because it was written.**

A section may be pushed only after it has been:
- implemented against the specification
- functionally tested
- type-checked
- linted
- built successfully
- visually checked when UI changed
- checked for obvious regressions
- reviewed for secrets/unrelated files

If a required check fails:

```text
DO NOT COMMIT
DO NOT PUSH
FIX
RE-RUN CHECKS
```

After each section:
1. Compare implementation with the specification.
2. Test the section and affected integrations.
3. Run lint, typecheck, relevant tests, and production build.
4. Review UI changes visually.
5. Review `git diff` and `git status`.
6. Ensure no secrets or unrelated files are included.
7. Commit with a meaningful message.
8. Push to the configured repository.
9. Verify the remote/CI result.
10. Update `PROJECT_STATE.md` and `CHANGELOG.md`.
11. Only then start the next section.

Prefer commit messages such as:

```text
feat: add project card hover preview
feat: implement GitHub project import
fix: handle missing live project URL
test: add project destination tests
chore: configure CI pipeline
```

Do not accumulate the whole project into one final commit.

Before every commit, verify:
- repository and branch
- `git status`
- `git diff`
- no `.env`, credentials, API keys, private tokens, generated files, build output, `node_modules`, IDE junk, or unrelated projects

Never commit secrets.

---

# 37. CI/CD PIPELINE

The project must have automated CI/CD.

## Pull request validation

Every PR should run:

```text
Install dependencies
→ Lint
→ Typecheck
→ Unit tests
→ Integration tests where applicable
→ Production build
```

Required failing checks must prevent merging.

## Production branch

On successful merge/push to the production branch:

```text
Lint
→ Typecheck
→ Tests
→ Build
→ Security/dependency checks
→ Deploy
→ Production smoke test
```

Deployment must not happen when required validation fails.

Create appropriate workflows under:

```text
.github/workflows/
```

Recommended:

```text
.github/workflows/ci.yml
.github/workflows/deploy.yml
```

If Vercel's native deployment integration already provides reliable deployment, keep deployment simple and use CI as the validation gate.

If npm is used and a lockfile exists, use:

```text
npm ci
```

in CI.

Use GitHub Actions secrets/environment variables for all sensitive configuration. Never hardcode secrets in source or workflow files.

Where supported, protect the production branch with required CI checks, no force pushes, and controlled merges.

---

# 38. VERIFIED PUSH GATE

Every push is a **verified checkpoint**.

Before pushing, confirm:

```text
[ ] Correct repository
[ ] Correct branch
[ ] Intended files only
[ ] No secrets
[ ] Section requirements satisfied
[ ] Functional test passed
[ ] Lint passed
[ ] Typecheck passed
[ ] Relevant automated tests passed
[ ] Production build passed
[ ] UI manually reviewed if applicable
[ ] No known critical regression
```

If any mandatory item is unchecked:

> **DO NOT PUSH.**

After pushing:

```text
[ ] Remote contains expected commit
[ ] CI started/passed
[ ] PROJECT_STATE.md updated
[ ] CHANGELOG.md updated
```

If CI fails:
1. Diagnose it.
2. Fix it immediately.
3. Re-run local checks.
4. Push the fix.
5. Verify CI again.

Do not knowingly leave the main/production branch broken.

---

# 39. AUTONOMOUS EXECUTION LOOP

Antigravity should continuously operate:

```text
READ STATE
→ SELECT NEXT UNFINISHED SECTION
→ IMPLEMENT
→ TEST
→ REVIEW
→ FIX
→ VERIFY
→ COMMIT
→ PUSH
→ VERIFY CI
→ UPDATE STATE
→ CONTINUE
```

Do not wait for user approval between ordinary sections.

Only request human intervention for:
- credentials/authorization
- domain configuration
- deployment-provider approval
- destructive decisions
- genuinely blocking ambiguity
- external services requiring manual verification

Continue all independent work while blocked.

---

# 40. REMOTE REPOSITORY VERIFICATION

Before the first push:

```text
git remote -v
git branch --show-current
```

Confirm the remote is the intended portfolio repository.

If no remote exists, **do not guess the URL**. Request it.

Before every push, verify the current repository and branch.

---

# 41. FINAL REPOSITORY QUALITY CHECK

Before declaring the project complete:

```text
git status
git log --oneline
```

Confirm:
- working tree is clean
- intended commits exist
- remote is synchronized
- CI is passing
- deployment is live
- no accidental files are tracked
- no secrets are present
- README/setup instructions are accurate
- another developer can clone and understand the project


---

# 42. PERSISTENT PROJECT MEMORY — PROGRESS.md

`PROGRESS.md` is the primary resumability document for this project.

Its purpose is to allow Antigravity to stop and later resume the project without losing implementation context.

## Mandatory behavior

Antigravity MUST:

1. Read `PROGRESS.md` before starting or resuming work.
2. Update it after every meaningful implementation checkpoint.
3. Update it before stopping because of a blocker.
4. Update it after fixing a significant issue.
5. Update it after a verified Git push.
6. Never intentionally leave it describing an outdated state.

## Required structure

Maintain:

```markdown
# Portfolio Project Progress

## Current Phase
Phase X — <name>

## Current Section
<exact section currently being implemented>

## Overall Status
NOT STARTED / IN PROGRESS / BLOCKED / COMPLETE

## Completed
- ...

## In Progress
- ...

## Pending
- ...

## Last Verified Checkpoint
- Date/time:
- Commit:
- Branch:
- Tests:
- Typecheck:
- Lint:
- Build:
- CI:
- Deployment:

## Current Blockers
- None
```

## Resume protocol

Whenever work starts:

```text
READ PROGRESS.md
↓
READ PROJECT_STATE.md
↓
READ DECISIONS.md
↓
READ CHANGELOG.md
↓
CHECK GIT STATUS
↓
CHECK CURRENT BRANCH
↓
CHECK REMOTE
↓
VERIFY LAST CHECKPOINT
↓
CONTINUE FROM NEXT UNFINISHED TASK
```

Do NOT restart completed phases unless verification shows that their implementation is broken or obsolete.

If `PROGRESS.md` conflicts with the actual repository state:

> Trust the actual repository state, investigate the discrepancy, then correct `PROGRESS.md`.

## Progress granularity

Record progress at **section level**, not every individual line of code.

Example:

```text
Phase 4
✓ Project card base
✓ Hover expansion
✓ Live/GitHub destination logic
✓ Mobile interaction
→ Preview video optimization
○ Case-study action
```

This should make it immediately obvious what remains.

---

# 43. CHALLENGE & SOLUTION LOG — CHALLENGES.md

Create and maintain `CHALLENGES.md`.

Its purpose is to document meaningful engineering problems encountered during development and how they were solved.

This document is part of the project's engineering history.

## Record challenges when they are meaningful

Examples:

- architecture problems
- deployment failures
- Git/GitHub issues
- database migration problems
- authentication/security issues
- API rate limits
- performance bottlenecks
- responsive UI problems
- browser compatibility problems
- CI failures
- dependency conflicts
- unexpected production behavior
- difficult debugging sessions
- important design tradeoffs

Do NOT record every trivial typo or ordinary compiler error.

## Required format

Each challenge should use:

```markdown
## CH-001 — <Short title>

### Problem
What happened?

### Context
What were we trying to accomplish?

### Investigation
What was checked and what evidence was found?

### Root Cause
What actually caused the problem?

### Solution
What was changed?

### Verification
How was the solution verified?

### Lessons Learned
What should be done differently or remembered in the future?

### Related
- Phase:
- Commit:
- Files:
```

## Example

```markdown
## CH-001 — Parent Git Repository Tracking All Projects

### Problem
The IDE displayed thousands of changes when working on a single portfolio project.

### Context
The portfolio was located inside a directory containing multiple unrelated projects.

### Investigation
Git repository-root inspection showed that the parent directory was itself a Git repository.

### Root Cause
An old repository existed at the parent level, causing all child project directories to appear under the same repository.

### Solution
The accidental parent `.git` metadata was removed and the portfolio was kept as an independent Git repository.

### Verification
`git rev-parse --show-toplevel` returned the Portfolio directory and unrelated projects no longer appeared as changes.

### Lessons Learned
Each independently maintained project should have its own repository and repository root.

### Related
- Phase: Repository setup
- Commit: <commit>
- Files: <relevant files>
```

Only document facts that were actually observed.

Do not invent challenges to make the document look impressive.

---

# 44. FOUR DOCUMENTS THAT MUST STAY SYNCHRONIZED

The project must maintain these four project-management documents:

```text
PROJECT_STATE.md
PROGRESS.md
DECISIONS.md
CHALLENGES.md
```

And additionally:

```text
CHANGELOG.md
```

Their purposes are distinct:

| File | Purpose |
|---|---|
| `PROJECT_STATE.md` | Current operational state and immediate next action |
| `PROGRESS.md` | Persistent resumable progress across sessions |
| `DECISIONS.md` | Important architecture/product decisions and rationale |
| `CHALLENGES.md` | Meaningful problems, root causes, solutions, and lessons |
| `CHANGELOG.md` | User-facing/project-level history of meaningful changes |

Do not duplicate entire documents into each other.

---

# 45. SESSION START PROTOCOL

At the beginning of every new Antigravity session:

```text
1. Read implementation.md
2. Read PROGRESS.md
3. Read PROJECT_STATE.md
4. Read DECISIONS.md
5. Read CHALLENGES.md
6. Read CHANGELOG.md
7. Inspect git status
8. Inspect current branch
9. Inspect recent commits
10. Determine the last verified checkpoint
11. Determine the next unfinished section
12. Continue from there
```

The agent must not assume that the previous session completed work simply because a document says so.

Verify the repository state.

---

# 46. SESSION END / INTERRUPTION PROTOCOL

Before voluntarily stopping, or whenever a blocking issue is encountered:

Update `PROGRESS.md` with:

```text
Current Phase
Current Section
Completed
In Progress
Pending
Last Verified Checkpoint
Current Blockers
Exact next action
```

If work is interrupted unexpectedly, the next session should reconstruct the state using the repository and these documents.

Never leave unfinished work described as complete.

---

# 47. CHALLENGE DOCUMENTATION RULE

When a significant challenge is solved:

```text
DETECT
→ INVESTIGATE
→ IDENTIFY ROOT CAUSE
→ SOLVE
→ VERIFY
→ DOCUMENT IN CHALLENGES.md
→ COMMIT
→ PUSH
```

The challenge entry should be created in the same verified checkpoint as the fix whenever practical.

Do not hide failures simply because they were eventually resolved.

The purpose is to preserve useful engineering knowledge for future maintenance and interviews.
