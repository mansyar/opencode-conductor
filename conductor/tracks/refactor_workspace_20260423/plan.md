# Implementation Plan: Refactor src/index.ts

## Phase 1: Setup and Test Strategy [checkpoint: 2db7013]
- [x] Task: Setup new module and test suite (36e6f6b)
    - [x] Create `src/utils/workspace.ts` module.
    - [x] Create `src/utils/workspace.test.ts` test file.
- [x] Task: Write failing unit tests (Red Phase) (36e6f6b)
    - [x] Write unit test for `getFilesRecursively` logic.
    - [x] Write unit test for LLM context formatting logic.
    - [x] Write unit test for `setup_state.json` checking logic.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Setup and Test Strategy' (Protocol in workflow.md) (2db7013)

## Phase 2: Implementation
- [x] Task: Implement file system logic (Green Phase) (36e6f6b)
    - [x] Implement `getFilesRecursively` and related logic in `src/utils/workspace.ts`.
    - [x] Ensure unit tests for file system logic pass.
- [x] Task: Implement LLM context formatting logic (Green Phase) (36e6f6b)
    - [x] Implement LLM context formatting logic in `src/utils/workspace.ts`.
    - [x] Ensure unit tests for context logic pass.
- [x] Task: Implement setup state checking logic (Green Phase) (36e6f6b)
    - [x] Implement `setup_state.json` checking logic in `src/utils/workspace.ts`.
    - [x] Ensure unit tests for state checking logic pass.
- [ ] Task: Refactor `src/index.ts`
    - [ ] Remove `getFilesRecursively`, LLM context formatting, and `setup_state.json` checking from `src/index.ts`.
    - [ ] Import and use the new utilities from `src/utils/workspace.ts` in `src/index.ts`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation' (Protocol in workflow.md)

## Phase 3: Final Review and Integration
- [ ] Task: Integration Testing and Quality Gates
    - [ ] Run full test suite and integration tests to ensure the plugin functions end-to-end.
    - [ ] Verify test coverage is >80%.
    - [ ] Ensure code adheres strictly to TypeScript style guidelines.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Review and Integration' (Protocol in workflow.md)