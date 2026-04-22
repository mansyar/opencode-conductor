# Implementation Plan: Refactor Conductor Plugin Architecture

## Phase 1: Cleanup and Simplification [checkpoint: 8c33d93]
- [x] **Task: Remove Redundant Code** 85dea58
    - [x] Delete `src/commands/implement.ts` and the `src/commands/` directory.
- [x] **Task: Simplify `implementCommand`** 85dea58
    - [x] Update `src/tools/commands.ts` to remove `strategy_section` logic and file reading of `manual.md`.

## Phase 2: Tool Alignment and Registration [checkpoint: 842dfd3]
- [x] **Task: Align Prompt Extensions** f2c679b
    - [x] Update all command definitions in `src/tools/commands.ts` to use `.json` instead of `.toml`.
- [x] **Task: Register Tools in Index** f2c679b
    - [x] Update `src/index.ts` to import tool factories from `src/tools/commands.ts`.
    - [x] Update the `Plugin` return object in `src/index.ts` to include the `tool` property with registered Conductor tools.

## Phase 3: Verification
- [ ] **Task: Run Existing Tests**
    - [ ] Execute `npm test` to ensure existing `commands.test.ts` still pass after refactoring.
- [ ] **Task: Conductor - User Manual Verification 'Refactor Verification' (Protocol in workflow.md)**