# `checkpoint` Tool Documentation

## Description
The `checkpoint` tool is a programmatic system utility for Conductor to automate recording task completion. It enforces quality gates (tests and coverage) and automates the Git commit/note lifecycle.

This tool is primarily used by the Conductor agent during the implementation phase to ensure that every task meets the project's quality standards before being marked as complete.

The checkpoint process includes:
1. **Coverage Discovery**: Automatically identifies the appropriate coverage command for the project.
2. **Quality Gate Enforcement**: Executes tests and verifies that code coverage meets the required threshold (default >80%).
3. **Automated Commit**: Stages changes and creates a Git commit with the task description.
4. **Git Notes Attachment**: Attaches the detailed verification report to the commit using Git notes for an auditable trail.

## Parameters
- **task_description** (required): Brief description of the completed task.
- **verification_report** (required): Detailed summary of the changes and verification steps.
- **coverage_command** (optional): Override for the automatically discovered coverage command.

## Usage (Internal)
The `checkpoint` tool is invoked by the Conductor agent:
```json
{
  "conductor_checkpoint": {
    "task_description": "Implement user model",
    "verification_report": "Created User class with validations. Added unit tests for all fields. Coverage: 85%.",
    "coverage_command": "pnpm test --coverage"
  }
}
```

## Quality Gates
The `checkpoint` tool enforces the following gates:
- **Tests Pass**: The coverage/test command must exit with a code of 0.
- **Coverage Threshold**: Total code coverage must meet or exceed the project's threshold (typically 80%).

## Git Integration
Each successful checkpoint produces:
- A Git commit with the message provided in `task_description`.
- A Git note attached to that commit containing the `verification_report`.

## Related Protocols
- **Phase Completion Verification**: A more rigorous version of the checkpoint protocol triggered at the end of each development phase.
