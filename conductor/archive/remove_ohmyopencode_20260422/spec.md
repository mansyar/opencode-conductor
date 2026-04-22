# Specification: Remove OhMyOpenCode Compatibility

## Overview
This track aims to remove all functionality and compatibility features related to "OhMyOpenCode" from the project. This is an immediate removal to streamline the project and remove dependencies on OhMyOpenCode integration.

## Functional Requirements
- **Documentation**: Remove all mentions and integration guides related to OhMyOpenCode from the product documentation (e.g., `product.md`).
- **Configurations**: Eliminate any configuration handling specific to OhMyOpenCode.
- **Commands & Prompts**: Review all prompt and command files, and remove only the specific parts/sections that reference "ohmyopencode", while keeping the rest of the commands intact.

## Non-Functional Requirements
- The removal must be immediate without deprecation warnings.
- No migration guide is required for existing users.
- The project should remain fully functional and tests should pass after the removal.

## Acceptance Criteria
- [ ] No references to "OhMyOpenCode" or "ohmyopencode" exist in the `conductor/product.md` or other documentation.
- [ ] Configuration logic specifically checking for or handling OhMyOpenCode is completely removed.
- [ ] Commands and prompts continue to work as expected, minus the OhMyOpenCode-specific logic.
- [ ] The project builds successfully and the automated test suite passes completely.

## Out of Scope
- Creating migration tools or documentation for existing users.
- Removing entire commands or prompt files (only the OhMyOpenCode parts should be removed).