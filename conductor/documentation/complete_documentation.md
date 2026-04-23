# Conductor Plugin - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Command Reference](#command-reference)
3. [Common Workflows](#common-workflows)
4. [Error Handling](#error-handling)
5. [Best Practices](#best-practices)
6. [Quick Reference](#quick-reference)

---

## Introduction

The Conductor plugin is a specialized OpenCode plugin designed to enforce a rigorous, Context-Driven Development lifecycle. It transforms OpenCode from a reactive coding tool into a proactive project architect that follows a strict protocol to specify, plan, and implement software features and bug fixes.

### Key Features
- **Slash Commands**: Native commands for frictionless project management
- **Track Management**: Create, plan, and implement tracks with automatic spec and plan generation
- **Smart Revert System**: Git-aware revert that understands logical units of work
- **Agent Agnostic**: Commands can be invoked by any agent, giving you the freedom to choose your primary interface

---

## Command Reference

### `/conductor:setup` Command
Initializes the Conductor directory and project "Constitution" for a new or existing project.

**Syntax:** `/conductor:setup`

**Usage:**
```
/conductor:setup
```

**Environmental Overrides (OpenCode Plugin):**
- **Ignore Files**: Uses `.opencodeignore` or `.gitignore` for analysis.
- **Model Selection**: Always selects the "flash" model for speed.

**Expected Output:**
- Welcome message with setup overview
- Step-by-step guidance through setup process
- Confirmation that Conductor environment is initialized

**Common Errors:**
- "Conductor is not set up" - Run `/conductor:setup` first
- Permission denied - Check file permissions
- Git repository has uncommitted changes - Commit or stash changes

---

### `/conductor:newTrack` Command
Creates a new track (feature, bug fix, or chore) with specification and implementation plan.

**Syntax:** `/conductor:newTrack [description]`

**Usage:**
```
/conductor:newTrack "Implement user authentication with OAuth2"
```

**Parameters:**
- **description** (optional): Brief description of the track. If not provided, the command will guide you through defining it interactively.

**Expected Output:**
- Confirmation that track was created
- Track ID (e.g., `implement_user_auth_20260422`)
- Location of specification and plan files

**Common Errors:**
- Missing track description - Provide a description when running the command
- Invalid track description format - Use clear, concise description

---

### `/conductor:implement` Command
Starts implementing the next pending task in the current track.

**Syntax:** `/conductor:implement [track_name]`

**Usage:**
```
/conductor:implement
```

**Expected Output:**
- Confirmation of which task is being implemented
- Progress through TDD phases
- Test results and coverage information
- **Checkpoint confirmation** (automated Git commit and note attachment)

**Common Errors:**
- No pending tasks found - Create a new track or select a different track
- Test failures - Follow TDD workflow to fix failing tests
- Coverage requirements not met - Add more tests to meet coverage requirements

---

### `/conductor:review` Command
Reviews completed track work against guidelines and the plan.

**Syntax:** `/conductor:review [track_name]`

**Usage:**
```
/conductor:review
```

**Expected Output:**
- Summary of completed tasks
- Code quality assessment
- Feedback and suggestions
- Recommendation for approval or revision

**Common Errors:**
- No completed tracks found - Complete a track before reviewing it
- Track not found - Check track name spelling

---

### `/conductor:status` Command
Displays a high-level overview of project progress and active tracks.

**Syntax:** `/conductor:status`

**Usage:**
```
/conductor:status
```

**Expected Output:**
- List of all tracks in the project
- Status of each track (completed, in-progress, pending)
- Overall project progress percentage
- Summary of completed and pending work

**Common Errors:**
- Tracks file not found - Run `/conductor:setup` to create the tracks registry
- No tracks found - Create a new track with `/conductor:newTrack`

---

### `/conductor:revert` Command
Interactively selects a task, phase, or track to undo via Git.

**Syntax:** `/conductor:revert [target]`

**Usage:**
```
/conductor:revert "task Create user model"
```

**Parameters:**
- **target** (optional): Specific target to revert (e.g., 'track <track_id>', 'phase <phase_name>', 'task <task_name>').

**Expected Output:**
- List of revertible options
- Confirmation prompt
- Revert completion message

**Common Errors:**
- No revertible changes found - Ensure you have committed changes before trying to revert
- Revert fails due to merge conflicts - Resolve conflicts manually

---

### `checkpoint` Tool (Internal Utility)
A programmatic system utility for Conductor to automate recording task completion.

**Features:**
- Enforces quality gates (tests and coverage >80%)
- Automates Git commit with task description
- Attaches detailed verification report as a Git note

---

## Common Workflows

### 1. Setup → New Track → Implement → Review
1. Run `/conductor:setup` to initialize the project
2. Run `/conductor:newTrack "description"` to create a new track
3. Run `/conductor:implement` to start implementing tasks
4. **Automated Checkpoint**: Occurs after each successful implementation task
5. Run `/conductor:review` to review completed work

### 2. Phase Completion Verification and Checkpointing
Triggered at the end of each development phase:
1. Ensure test coverage for all phase changes
2. Execute full automated test suite
3. Follow the manual verification plan
4. Create a phase checkpoint with an auditable report

### 3. Track Status Monitoring
1. Run `/conductor:status` to check project progress
2. Review active tracks and their status
3. Plan next steps based on status

### 4. Reverting Changes
1. Run `/conductor:revert` to see revert options
2. Select the task, phase, or track to revert
3. Confirm the revert operation

---

## Error Handling

### Common Setup Errors
- **Conductor is not set up** - Run `/conductor:setup`
- **Permission denied** - Check file permissions
- **Git repository has uncommitted changes** - Commit or stash changes

### Common Track Management Errors
- **No pending tasks found** - Create a new track
- **Track not found** - Check track name spelling
- **No track in progress** - Create a new track or select a specific track

### Common Implementation Errors
- **Test failures** - Follow TDD workflow
- **Coverage requirements not met** - Add more tests
- **Checkpoint failed** - Fix test/coverage issues or Git configuration
- **Commit fails due to pre-commit hooks** - Fix issues identified by hooks

---

## Best Practices

### Track Creation
- Use clear, descriptive track names
- Break large features into smaller tracks
- Include acceptance criteria in specifications

### Implementation
- Follow Test-Driven Development (TDD)
- Maintain high code coverage (>80%)
- Write clear commit messages

### Documentation
- Keep documentation up-to-date
- Use consistent terminology
- Include examples and usage patterns

---

## Quick Reference

### Essential Commands
```
/conductor:setup          # Initialize project
/conductor:newTrack "..." # Create new track
/conductor:implement      # Start implementing
/conductor:review         # Review completed work
/conductor:status         # Check project status
/conductor:revert         # Revert changes
```

### Track Status
- `[ ]` - Pending (not started)
- `[~]` - In Progress (being worked on)
- `[x]` - Completed (done and reviewed)

### Workflow Summary
1. **Setup**: `/conductor:setup`
2. **Create Track**: `/conductor:newTrack "description"`
3. **Implement**: `/conductor:implement`
4. **Review**: `/conductor:review`
5. **Monitor**: `/conductor:status`
6. **Revert** (if needed): `/conductor:revert`

---

## Resources

### Documentation Files
- `setup_command_documentation.md` - Detailed `/conductor:setup` documentation
- `newtrack_command_documentation.md` - Detailed `/conductor:newTrack` documentation
- `implement_command_documentation.md` - Detailed `/conductor:implement` documentation
- `review_command_documentation.md` - Detailed `/conductor:review` documentation
- `status_command_documentation.md` - Detailed `/conductor:status` documentation
- `revert_command_documentation.md` - Detailed `/conductor:revert` documentation
- `checkpoint_command_documentation.md` - Detailed `checkpoint` tool documentation
- `workflow_documentation.md` - Common workflows guide
- `error_handling_documentation.md` - Error handling guide

### Project Files
- `conductor/product.md` - Product definition
- `conductor/tech-stack.md` - Technology stack
- `conductor/workflow.md` - Development workflow
- `conductor/tracks.md` - Tracks registry
- `conductor/tracks/` - Track directories with specifications and plans

---

## Support

For additional help:
1. Review individual command documentation
2. Check the error handling guide
3. Read the workflow documentation
4. Visit the project repository for issues and support