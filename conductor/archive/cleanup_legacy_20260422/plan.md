# Implementation Plan: Legacy Code Cleanup Track

## Phase 1: Investigation & Verification [checkpoint: a911480]

- [x] Task: Investigate orphan utility files for actual usage [ccd37f8]
  - [x] Search codebase for imports of src/tools/background.ts
  - [x] Search codebase for imports of src/tools/delegate.ts
  - [x] Search codebase for imports of src/utils/bootstrap.ts
  - [x] Search codebase for imports of src/utils/stateManager.ts
- [x] Task: Identify all build scripts referencing legacy systems [4f10b5f]
  - [x] Search for references to legacy/ in build scripts
  - [x] Search for references to dist/prompts/commands/
  - [x] Search for TOML conversion scripts
- [x] Task: Verify postinstall.cjs usage [8a42889]
  - [x] Read postinstall.cjs content
  - [x] Check if it's referenced in package.json

## Phase 2: Remove Legacy Conductor Directory [checkpoint: ddcfbac]

- [x] Task: Delete legacy/conductor/ directory [4374657]
  - [x] Verify directory exists
  - [x] Delete all contents
  - [x] Verify deletion

## Phase 3: Remove/Update Postinstall Script [checkpoint: 6f2ff16]

- [x] Task: Determine postinstall.cjs action (remove or update)
- [x] Task: Execute postinstall.cjs change [7b834cd]
  - [x] If removal: Remove file and update package.json
  - [ ] If update: Update references to valid paths

## Phase 4: Update Legacy Path References

- [x] Task: Read and analyze src/utils/commandFactory.ts
- [x] Task: Update legacy path references [56933d0]
  - [x] Remove or redirect legacy path references
  - [x] Verify file still compiles

## Phase 5: Remove Orphan Utility Files

- [x] Task: Remove src/tools/background.ts [7d65639]
- [x] Task: Remove src/tools/delegate.ts [7d65639]
- [x] Task: Remove src/utils/bootstrap.ts [7d65639]
- [x] Task: Remove src/utils/stateManager.ts [7d65639]

## Phase 6: Update Build Scripts

- [x] Task: Update identified build scripts [543f56f]
  - [x] Remove legacy conversion steps
  - [x] Verify build still works

## Phase 7: Verification & Checkpoint

- [x] Task: Run automated tests
  - [x] Execute: 
pm test
  - [x] Verify all tests pass
- [x] Task: Verify build succeeds
  - [x] Execute: 
pm run build
  - [x] Verify no build errors
- [x] Task: Conductor - User Manual Verification 'Phase 7' (Protocol in workflow.md)
  - [x] Manual verification: All conductor commands work correctly

## Phase: Review Fixes
- [x] Task: Apply review suggestions 9c5b295
