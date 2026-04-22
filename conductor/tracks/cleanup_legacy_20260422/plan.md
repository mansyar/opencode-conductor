# Implementation Plan: Legacy Code Cleanup Track

## Phase 1: Investigation & Verification

- [x] Task: Investigate orphan utility files for actual usage [ccd37f8]
  - [x] Search codebase for imports of src/tools/background.ts
  - [x] Search codebase for imports of src/tools/delegate.ts
  - [x] Search codebase for imports of src/utils/bootstrap.ts
  - [x] Search codebase for imports of src/utils/stateManager.ts
- [x] Task: Identify all build scripts referencing legacy systems [4f10b5f]
  - [x] Search for references to legacy/ in build scripts
  - [x] Search for references to dist/prompts/commands/
  - [x] Search for TOML conversion scripts
- [x] Task: Verify postinstall.cjs usage
  - [x] Read postinstall.cjs content
  - [x] Check if it's referenced in package.json

## Phase 2: Remove Legacy Conductor Directory

- [ ] Task: Delete legacy/conductor/ directory
  - [ ] Verify directory exists
  - [ ] Delete all contents
  - [ ] Verify deletion

## Phase 3: Remove/Update Postinstall Script

- [ ] Task: Determine postinstall.cjs action (remove or update)
- [ ] Task: Execute postinstall.cjs change
  - [ ] If removal: Remove file and update package.json
  - [ ] If update: Update references to valid paths

## Phase 4: Update Legacy Path References

- [ ] Task: Read and analyze src/utils/commandFactory.ts
- [ ] Task: Update legacy path references
  - [ ] Remove or redirect legacy path references
  - [ ] Verify file still compiles

## Phase 5: Remove Orphan Utility Files

- [ ] Task: Remove src/tools/background.ts
- [ ] Task: Remove src/tools/delegate.ts
- [ ] Task: Remove src/utils/bootstrap.ts
- [ ] Task: Remove src/utils/stateManager.ts

## Phase 6: Update Build Scripts

- [ ] Task: Update identified build scripts
  - [ ] Remove legacy conversion steps
  - [ ] Verify build still works

## Phase 7: Verification & Checkpoint

- [ ] Task: Run automated tests
  - [ ] Execute: 
pm test
  - [ ] Verify all tests pass
- [ ] Task: Verify build succeeds
  - [ ] Execute: 
pm run build
  - [ ] Verify no build errors
- [ ] Task: Conductor - User Manual Verification 'Phase 7' (Protocol in workflow.md)
  - [ ] Manual verification: All conductor commands work correctly
