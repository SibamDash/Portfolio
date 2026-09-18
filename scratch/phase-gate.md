
# MANDATORY PHASE APPROVAL GATE

This rule overrides any earlier instruction that tells the agent to automatically continue from one phase to another.

Antigravity MUST NOT automatically move to the next phase.

The required workflow is:

IMPLEMENT CURRENT PHASE
        ↓
COMPLETE ALL PHASE REQUIREMENTS
        ↓
RUN VALIDATION
        ↓
FIX ALL FAILURES
        ↓
FINAL PHASE REVIEW
        ↓
COMMIT
        ↓
PUSH TO origin/main
        ↓
VERIFY GITHUB / CI
        ↓
UPDATE PROJECT DOCUMENTATION
        ↓
STOP
        ↓
ASK USER FOR APPROVAL
        ↓
WAIT
        ↓
USER APPROVES
        ↓
START NEXT PHASE

==================================================
STRICT PHASE STOP RULE
==================================================

After completing EVERY phase:

1. Run all required tests.
2. Run typecheck.
3. Run lint.
4. Run production build.
5. Perform visual verification for UI changes.
6. Review git status.
7. Review git diff.
8. Verify no secrets or unrelated files are included.
9. Commit the completed phase.
10. Push the completed phase to:

origin/main

11. Verify the remote commit.
12. Verify CI/CD status where applicable.
13. Update:
    - PROGRESS.md
    - PROJECT_STATE.md
    - DECISIONS.md if applicable
    - CHALLENGES.md if applicable
    - CHANGELOG.md

ONLY AFTER ALL OF THE ABOVE:

STOP WORK.

Do NOT:
- start the next phase
- partially implement the next phase
- prepare the next phase
- modify files belonging to the next phase
- continue autonomously

Instead, report:

PHASE COMPLETED: <phase number and name>

Implemented:
- ...

Validation:
- Tests: PASS/FAIL
- Typecheck: PASS/FAIL
- Lint: PASS/FAIL
- Build: PASS/FAIL
- Visual verification: PASS/NOT APPLICABLE
- CI: PASS/FAIL/PENDING

Git:
- Branch: main
- Remote: origin
- Repository: https://github.com/SibamDash/Portfolio.git
- Commit: <hash>
- Push: VERIFIED/NOT VERIFIED

Documentation:
- PROGRESS.md: updated
- PROJECT_STATE.md: updated
- DECISIONS.md: updated/not applicable
- CHALLENGES.md: updated/not applicable
- CHANGELOG.md: updated

Known issues:
- ...

NEXT PHASE:
<phase number and name>

Then ask exactly:

"Phase <X> is complete and verified. Do you approve starting Phase <X+1>?"

WAIT FOR THE USER'S RESPONSE.

==================================================
NO IMPLICIT APPROVAL
==================================================

The following do NOT count as approval:

- silence
- previous approval
- opening the IDE
- changing files manually
- asking a question about the project
- saying "continue later"
- providing unrelated instructions
- Antigravity assuming permission
- completion of the previous phase

Only an explicit user approval such as:

"yes"
"continue"
"start the next phase"
"approved"

allows Antigravity to begin the next phase.

==================================================
IF USER DOES NOT APPROVE
==================================================

Remain stopped.

You may answer questions about the completed phase, inspect results, or make specifically requested corrections.

Do NOT begin the next phase until explicit approval is received.

==================================================
PHASE CORRECTION RULE
==================================================

If the user asks for a correction to the completed phase:

1. Make only the requested correction.
2. Re-run the relevant validation.
3. Re-run the full phase verification where necessary.
4. Commit the correction.
5. Push to origin/main.
6. Update project documentation.
7. Stop again.
8. Ask whether the phase is now approved.

Do not automatically proceed to the next phase after a correction.

==================================================
PHASE BOUNDARY RULE
==================================================

A phase is considered complete ONLY when every requirement explicitly assigned to that phase in implementation.md has been implemented and verified.

Do not mark a phase complete merely because:
- the UI looks acceptable
- the code compiles
- some requirements work
- the agent believes the phase is sufficient

Use the actual implementation.md requirements as the checklist.

==================================================
FUTURE GIT RULE
==================================================

All normal Portfolio development MUST use:

BRANCH:
main

REMOTE:
origin

REMOTE URL:
https://github.com/SibamDash/Portfolio.git

Normal development MUST NOT use master.

Before every phase push verify:

git rev-parse --show-toplevel
git branch --show-current
git remote -v
git status

Expected:

Repository root:
Portfolio

Branch:
main

Remote:
origin → https://github.com/SibamDash/Portfolio.git

If these do not match, STOP and fix the repository configuration before pushing.

==================================================
IMPORTANT
==================================================

Do not interpret "autonomous implementation" as permission to cross phase boundaries.

You are autonomous WITHIN the currently approved phase.

You MUST obtain explicit user approval before entering the next phase.

This phase-approval rule takes precedence over any earlier instruction in implementation.md that says to automatically continue to the next phase.
