# Implementation Plan: Refactor Conductor Plugin Architecture

## Phase 1: Cleanup and Simplification
- [ ] **Task: Remove Redundant Code**
    - [ ] Delete `src/commands/implement.ts` and the `src/commands/` directory.
- [ ] **Task: Simplify `implementCommand`**
    - [ ] Update `src/tools/commands.ts` to remove `strategy_section` logic and file reading of `manual.md`.

## Phase 2: Tool Alignment and Registration
- [ ] **Task: Align Prompt Extensions**
    - [ ] Update all command definitions in `src/tools/commands.ts` to use `.json` instead of `.toml`.
- [ ] **Task: Register Tools in Index**
    - [ ] Update `src/index.ts` to import tool factories from `src/tools/commands.ts`.
    - [ ] Update the `Plugin` return object in `src/index.ts` to include the `tool` property with registered Conductor tools.

## Phase 3: Verification
- [ ] **Task: Run Existing Tests**
    - [ ] Execute `npm test` to ensure existing `commands.test.ts` still pass after refactoring.
- [ ] **Task: Conductor - User Manual Verification 'Refactor Verification' (Protocol in workflow.md)**