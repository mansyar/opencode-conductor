# Track: Update Prompt Tools

## Overview
Update all agent prompts in `src/prompts/conductor/` to use a new tool name for asking questions, replacing the previous `ask_user` tool with `question`. Additionally, add specific instructions to prevent agents from putting long explanatory paragraphs inside the tool call, redirecting those explanations to the main chat.

## Functional Requirements
- Modify all JSON/Markdown prompt files within the `src/prompts/conductor/` directory.
- Replace all instances of the `ask_user` tool name with `question`.
- Add an explicit instruction to the prompts directing the agent to place long explanatory paragraphs in the chat rather than within the `question` tool's payload.

## Non-Functional Requirements
- Maintain valid JSON and Markdown formatting across all modified prompt files.
- Ensure the tone of the updated instructions matches the existing prompt style.

## Acceptance Criteria
- [ ] A search for `ask_user` in `src/prompts/conductor/` returns no results.
- [ ] A search for `question` in `src/prompts/conductor/` shows it being used as the replacement for the user interaction tool.
- [ ] Each modified prompt contains a clear directive about placing long paragraphs in the chat and keeping the `question` tool strictly for the question itself.

## Out of Scope
- Modifying the actual implementation or schema of the tool (as it's a built-in environment tool, not defined in this plugin's source code).
- Updating prompts outside of the `src/prompts/conductor/` directory.