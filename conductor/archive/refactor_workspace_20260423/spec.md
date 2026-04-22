# Specification: Refactor src/index.ts

## Overview
The `src/index.ts` file currently handles heavy lifting by registering the plugin, reading the file system recursively, formatting context for the LLM, and defining the config hook. This track will refactor the file system logic, context formatting, and `setup_state.json` checking into a dedicated `src/utils/workspace.ts` module to keep the main entry point lean and focused solely on plugin registration.

## Functional Requirements
- Create a new module `src/utils/workspace.ts`.
- Extract `getFilesRecursively` and related file system reading logic from `src/index.ts` to `workspace.ts`.
- Extract LLM context formatting logic from `src/index.ts` to `workspace.ts`.
- Extract `setup_state.json` checking logic from `src/index.ts` to `workspace.ts`.
- Refactor `src/index.ts` to import and utilize the newly created utilities in `workspace.ts`.

## Non-Functional Requirements
- **Testing:** Implement both new unit tests for the utilities in `workspace.ts` and ensure integration tests confirm the plugin functions as expected end-to-end.
- **Code Coverage:** Maintain or exceed the >80% code coverage requirement as outlined in the project workflow.
- **Style:** Adhere strictly to the TypeScript code style guidelines.

## Acceptance Criteria
- `src/index.ts` exclusively handles plugin registration without internal file system or context formatting logic.
- `src/utils/workspace.ts` successfully exports the extracted file system and context formatting functionalities.
- All existing and new tests (unit and integration) pass seamlessly.

## Out of Scope
- Adding new functional features to the plugin.
- Modifying logic beyond the file system context retrieval and formatting.