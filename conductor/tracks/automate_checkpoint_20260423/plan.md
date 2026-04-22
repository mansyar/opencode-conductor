# Implementation Plan: Automate Git Notes & Protocol Enforcement

## Phase 1: Infrastructure & Discovery
- [x] Task: Create `src/utils/coverage.ts` to handle coverage command discovery and parsing d812eae
    - [ ] Implement logic to detect coverage scripts in `package.json`
    - [ ] Implement parser for common coverage outputs (Vitest/LCOV)
- [ ] Task: Create `src/utils/git.ts` utilities for programmatic commits and notes
    - [ ] Implement `commitWithNote` function
- [ ] Task: Conductor - User Manual Verification 'Infrastructure' (Protocol in workflow.md)

## Phase 2: Tool Implementation
- [ ] Task: Define `conductor_checkpoint` schema in `src/tools/commands.ts`
- [ ] Task: Implement `createCheckpointTool` logic
    - [ ] Integrate coverage validation
    - [ ] Integrate git commit/note logic
- [ ] Task: Add unit tests for the checkpoint tool in `src/tools/commands.test.ts`
- [ ] Task: Conductor - User Manual Verification 'Tool Implementation' (Protocol in workflow.md)

## Phase 3: Integration & Testing
- [ ] Task: Update `src/index.ts` to register the new tool
- [ ] Task: Verify end-to-end flow with a dummy task
- [ ] Task: Conductor - User Manual Verification 'Integration' (Protocol in workflow.md)
