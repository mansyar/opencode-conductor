# Specification: Legacy Code Cleanup Track

## Overview
Clean up legacy code, unused systems, and duplicate files across the project to reduce technical debt and simplify maintenance. This track focuses on removing deprecated systems that have been fully replaced by the modern JSON-based prompt system.

## Functional Requirements

### 1. Remove Legacy Conductor Directory
- **Action:** Delete the entire legacy/conductor/ directory
- **Contents to remove:**
  - 25+ duplicate code styleguide files (dart.md, general.md, typescript.md, etc.)
  - Duplicate workflow.md template
  - Old TOML command files (setup.toml, implement.toml, newTrack.toml, review.toml, revert.toml, status.toml)

### 2. Remove/Update Postinstall Script
- **Action:** Remove or update postinstall.cjs
- **Reason:** References non-existent dist/prompts/commands/ folder
- **Verification:** Confirm it's superseded by plugin interface registration in src/index.ts

### 3. Update Legacy Path References
- **Action:** Update src/utils/commandFactory.ts
- **Reason:** Contains legacy path references pointing to deprecated legacy/conductor/commands/conductor/ directory
- **Goal:** Remove or update these references to point to the new system

### 4. Remove Orphan Utility Files
- **Action:** Remove the following files that show zero dependencies in the code graph:
  - src/tools/background.ts
  - src/tools/delegate.ts
  - src/utils/bootstrap.ts
  - src/utils/stateManager.ts
- **Verification:** Confirm these files are not imported anywhere in the codebase

### 5. Update Build Scripts
- **Action:** Identify and update all build scripts that reference legacy systems
- **Goal:** Remove legacy conversion steps that are no longer needed

### 6. Preserve Critical Systems (DO NOT DELETE)
- **Preserve:** src/prompts/conductor/ - JSON prompts imported by src/index.ts
- **Preserve:** src/templates/ - Template system used by the plugin
- **Preserve:** src/index.ts - Main plugin entry point

## Non-Functional Requirements

1. **Build Success:** Project must compile without errors after cleanup
2. **Test Coverage:** All existing tests must continue to pass
3. **No Regression:** No loss of functionality for the conductor plugin commands
4. **Clean Code Graph:** Orphan files removed to simplify dependency analysis

## Acceptance Criteria

1. [ ] legacy/conductor/ directory completely removed
2. [ ] postinstall.cjs removed or updated (no references to non-existent paths)
3. [ ] src/utils/commandFactory.ts updated (no legacy path references)
4. [ ] All orphan utility files removed
5. [ ] Build scripts updated (no legacy conversion steps)
6. [ ] Automated tests pass (
pm test)
7. [ ] Manual verification: All conductor commands (/conductor:setup, /conductor:newTrack, /conductor:implement, /conductor:review, /conductor:revert, /conductor:status) work correctly

## Out of Scope

- Any modifications to src/prompts/conductor/ (JSON prompts)
- Any modifications to src/templates/
- Any modifications to src/index.ts (plugin entry point)
- Changes to the conductor configuration files in the project
