# Specification: Automate Git Notes & Protocol Enforcement

## Overview
This track implements a programmatic system utility, `conductor_checkpoint`, to automate the recording of task completion. It enforces quality gates (tests/coverage) and automates the Git commit/note lifecycle.

## Functional Requirements

### 1. Command Discovery
- The tool must dynamically identify the project's test and coverage commands by:
    - Reading the `conductor/workflow.md` or `package.json` (for Node projects).
    - Allowing an optional `coverage_command` override in the tool arguments.

### 2. Atomic Checkpoint Operation
- The tool performs:
    1. **Execute Coverage**: Runs the discovered coverage command.
    2. **Parse Results**: Extracts the total coverage percentage.
    3. **Enforce Gate**: Aborts if coverage < 80% or tests fail.
    4. **Auto-Commit**: Stages changes and commits with `task_description`.
    5. **Attach Git Note**: Attaches a note containing the `verification_report`.

### 3. Acceptance Criteria
- [ ] Tool correctly identifies `pnpm test` or similar from the environment.
- [ ] Tool parses coverage output (e.g., from Vitest or Istanbul).
- [ ] Tool successfully creates a commit and note if gates are passed.
- [ ] Tool returns the commit SHA to the agent.
