# Implementation Plan: Update Prompt Tools

## Phase 1: Update Prompt Files
- [x] Task: Find all instances of `ask_user` in `src/prompts/conductor/`. e64dd69
- [x] Task: Replace `ask_user` with `question` in all identified files. e64dd69
- [x] Task: Update the instructions within the prompt files to specify not putting long paragraphs in the `question` tool and putting them in the chat instead. e64dd69
- [x] Task: Verify that all JSON and Markdown files remain syntactically valid after modifications. e64dd69
- [x] Task: Conductor - User Manual Verification 'Phase 1: Update Prompt Files' (Protocol in workflow.md) 903469d

## Phase 2: Testing and Review
- [x] Task: Run the automated test suite to ensure no tests are broken by the prompt updates.
    - [x] Update any tests that explicitly check for `ask_user` occurrences.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Testing and Review' (Protocol in workflow.md) 4765711

## Phase: Review Fixes
- [x] Task: Apply review suggestions (Commit missing track artifacts and fix archive state) b0bb6ad