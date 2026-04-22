# Track Specification: Refactor Conductor Plugin Architecture

## Overview
Refactor the Conductor plugin to centralize agent capabilities in `src/tools/commands.ts`, remove redundant code, and ensure proper tool registration in `src/index.ts`.

## Functional Requirements
1. **Centralize Tool Definitions**: Ensure `src/tools/commands.ts` is the single source of truth for all Conductor tools.
2. **Tool Registration**: Update `src/index.ts` to import tools from `src/tools/commands.ts` and return them in the `tool` property of the `Plugin` object.
3. **JSON Template Alignment**: Update `src/tools/commands.ts` to correctly reference `.json` prompt templates (e.g., `implement.json` instead of `implement.toml`).
4. **Simplify Implementation Logic**: Remove the `strategy_section` placeholder and associated file-reading logic from the implementation command.
5. **Codebase Cleanup**: Delete the `src/commands/` directory and any redundant files.

## Acceptance Criteria
- [ ] Conductor agent tools are properly registered and visible to the OpenCode framework.
- [ ] Slash commands continue to function as expected.
- [ ] Redundant `src/commands/` directory is removed.
- [ ] `implement.json` is correctly loaded without `strategy_section` errors.
- [ ] Integration and regression tests pass.

## Out of Scope
- Adding new functional commands or tools.
- Modifying the core `commandFactory` logic (unless required for `.json` support).