# Specification: Documentation Update (update_docs_20260423)

## Overview
Update all existing documentation in `conductor/documentation/` to accurately reflect the current implementation of the Conductor plugin, including the unified entry point and the new `checkpoint` tool.

## Functional Requirements
1.  **Command Documentation Updates**: Update `setup`, `newTrack`, `implement`, `status`, `review`, and `revert` documentation to reflect current prompt logic and tool arguments.
2.  **Workflow Documentation Update**: Revise `workflow_documentation.md` to include the automated checkpointing protocol and how it interacts with the `checkpoint` command.
3.  **New Command Documentation**: Create or update documentation for the `checkpoint` command, explaining its role in quality gates and Git notes.
4.  **General Documentation Synchronization**: Update `complete_documentation.md`, `index.md`, and `documentation_outline.md` to stay in sync with the updated command and workflow files.
5.  **Unified Entry Point Refactoring**: Ensure all installation and setup guides reflect the new unified `index.ts` entry point instead of the legacy bootstrapping method.

## Non-Functional Requirements
- **Consistency**: Maintain a consistent tone and formatting across all markdown files.
- **Clarity**: Ensure technical details (like pnpm usage and Git notes) are clearly explained.

## Acceptance Criteria
- All documentation files in `conductor/documentation/` are up to date.
- The `checkpoint` tool is fully documented.
- Installation instructions match the `src/index.ts` unified plugin entry point.
- All internal links within the documentation are valid.

## Out of Scope
- Adding new features to the Conductor plugin.
- Performance optimization of the plugin code.
