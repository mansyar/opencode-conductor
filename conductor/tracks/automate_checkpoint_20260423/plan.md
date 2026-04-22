# Implementation Plan: Automate Git Notes & Protocol Enforcement

## Phase 1: Infrastructure & Discovery [checkpoint: cc19e58]
- [x] Task: Create `src/utils/coverage.ts` to handle coverage command discovery and parsing d812eae
    - [ ] Implement logic to detect coverage scripts in `package.json`
    - [ ] Implement parser for common coverage outputs (Vitest/LCOV)
- [x] Task: Create `src/utils/git.ts` utilities for programmatic commits and notes 4b91464
    - [ ] Implement `commitWithNote` function
- [x] Task: Conductor - User Manual Verification 'Infrastructure' (Protocol in workflow.md) cc19e58

## Phase 2: Tool Implementation
- [x] Task: Define `conductor_checkpoint` schema in `src/tools/commands.ts` 24efb34
- [x] Task: Implement `createCheckpointTool` logic 1d5a802
    - [ ] Integrate coverage validation
    - [ ] Integrate git commit/note logic
- [ ] Task: Add unit tests for the checkpoint tool in `src/tools/commands.test.ts`
- [ ] Task: Conductor - User Manual Verification 'Tool Implementation' (Protocol in workflow.md)

## Phase 3: Integration & Testing
- [ ] Task: Update `src/index.ts` to register the new tool
- [ ] Task: Verify end-to-end flow with a dummy task
- [ ] Task: Conductor - User Manual Verification 'Integration' (Protocol in workflow.md)
