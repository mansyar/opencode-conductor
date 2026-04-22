# Common Workflows

This document describes common workflows for using the Conductor plugin to manage your development lifecycle.

## 1. Setup → New Track → Implement → Review

This is the primary workflow for developing new features or fixing bugs.

### Step 1: Setup Project
```
/conductor:setup
```

**What happens:**
1. Conductor analyzes your project directory
2. You define your product vision and technology stack
3. You select code style guides
4. Conductor creates the initial track with a detailed plan

**Expected output:**
- Welcome message with setup overview
- Step-by-step guidance through setup process
- Confirmation that Conductor environment is initialized

**Example:**
```
/conductor:setup

Welcome to Conductor. I will guide you through the following steps to set up your project:
1. **Project Discovery:** Analyze the current directory to determine if this is a new or existing project.
2. **Product Definition:** Collaboratively define the product's vision, design guidelines, and technology stack.
3. **Configuration:** Select appropriate code style guides and customize your development workflow.
4. **Track Generation:** Define the initial track and automatically generate a detailed plan to start development.

Let's get started!
```

### Step 2: Create New Track
```
/conductor:newTrack "Implement user authentication with OAuth2"
```

**What happens:**
1. Conductor creates a new track with a unique ID
2. You answer questions to build a comprehensive specification
3. Conductor generates a detailed implementation plan
4. The track is added to the tracks registry

**Expected output:**
- Confirmation that track was created
- Track ID (e.g., `implement_user_auth_20260422`)
- Location of specification and plan files

**Example:**
```
/conductor:newTrack "Implement user authentication with OAuth2"

Track created: implement_user_auth_20260422
Specification: conductor/tracks/implement_user_auth_20260422/spec.md
Plan: conductor/tracks/implement_user_auth_20260422/plan.md

Next step: Run `/conductor:implement` to start working on tasks.
```

### Step 3: Implement Tasks
```
/conductor:implement
```

**What happens:**
1. Conductor selects the next pending task from the plan
2. You follow the TDD workflow (Red → Green → Refactor)
3. Conductor guides you through implementation
4. Changes are committed with proper messages

**Expected output:**
- Confirmation of which task is being implemented
- Progress through TDD phases
- Test results and coverage information
- Commit confirmation

**Example:**
```
/conductor:implement

Implementing task: Create test file for user authentication
Following TDD workflow...

Red Phase: Writing failing tests...
- Created test file: tests/test_user_auth.py
- Wrote 5 test cases
- All tests failed as expected ✓

Green Phase: Implementing code...
- Wrote minimal code to make tests pass
- All tests now pass ✓

Refactor Phase: Improving code...
- Refactored for clarity and performance
- All tests still pass ✓

Coverage: 85% (target: 80%) ✓

Commit: abc1234 - feat(auth): Create test file for user authentication
Task marked as complete in plan.
```

### Step 4: Review Completed Work
```
/conductor:review
```

**What happens:**
1. Conductor reviews completed track work
2. Checks code against project standards
3. Verifies implementation matches specification
4. Provides feedback and recommendations

**Expected output:**
- Summary of completed tasks
- Code quality assessment
- Feedback and suggestions
- Recommendation for approval or revision

**Example:**
```
/conductor:review

Reviewing track: implement_user_auth_20260422

Completed Tasks:
✓ Create test file for user authentication
✓ Implement user authentication logic
✓ Add OAuth2 integration
✓ Write documentation

Code Quality: ✓ Pass
Test Coverage: ✓ 85% (target: 80%)
Documentation: ✓ Complete

Recommendation: APPROVE
Track meets all requirements and can be marked as complete.
```

### Step 5: Repeat
After completing a track, repeat steps 2-4 for the next feature or bug fix.

## 2. Track Status Monitoring

This workflow helps you monitor project progress and plan next steps.

### Step 1: Check Status
```
/conductor:status
```

**What happens:**
1. Conductor reads all tracks and their status
2. Calculates overall project progress
3. Displays a clear status overview

**Expected output:**
- List of completed, in-progress, and pending tracks
- Overall project progress percentage
- Next steps and recommendations

**Example:**
```
/conductor:status

Project Tracks
==============

Completed Tracks:
- [x] Track: Add comprehensive documentation for all slash commands
  *Link: [./tracks/add_comprehensive_documentation_20260422/]*

In Progress Tracks:
- [~] Track: Implement user authentication
  *Link: [./tracks/implement_user_auth_20260422/]*

Pending Tracks:
- [ ] Track: Add dark mode support
  *Link: [./tracks/add_dark_mode_20260423/]*

Project Progress: 33% (1/3 tracks completed)
Completed: 1 track
In Progress: 1 track
Pending: 1 track

Next Steps:
1. Complete implementation of user authentication track
2. Review completed work
3. Start work on dark mode support track
```

### Step 2: Plan Next Steps
Based on the status output:
1. Focus on completing in-progress tracks
2. Plan which pending track to start next
3. Identify any bottlenecks or issues
4. Adjust priorities as needed

### Step 3: Regular Monitoring
Run `/conductor:status` regularly to:
- Track progress over time
- Identify slow-moving tracks
- Adjust plans based on current state
- Keep team updated on project status

## 3. Reverting Changes

This workflow helps you safely revert changes when needed.

### Step 1: Identify Need to Revert
You may need to revert when:
- Implementation has critical bugs
- Track direction is wrong
- Changes conflict with other work
- Mistakes were made in implementation

### Step 2: Run Revert Command
```
/conductor:revert
```

**What happens:**
1. Conductor shows available revert options
2. You select what to revert (task, phase, or track)
3. You confirm the revert operation
4. Conductor reverts the changes and updates the plan

**Expected output:**
- List of revertible options
- Confirmation prompt
- Revert completion message

**Example:**
```
/conductor:revert

Available Revert Options:
1. Task: Create test file for setup command documentation
   *Commit: abc1234 - feat(docs): Create test file for setup command*
2. Phase: Research and Planning
   *Commit: def5678 - checkpoint: End of Phase 1*
3. Track: Add comprehensive documentation for all slash commands
   *Commit: ghi9012 - chore(conductor): Mark track as complete*

Please select an option (1-3): 1

You selected: Task: Create test file for setup command documentation
This will revert the following commit:
- Commit: abc1234
- Message: feat(docs): Create test file for setup command
- Files changed: 1 file

Are you sure you want to revert this task? (yes/no): yes

Reverting task: Create test file for setup command documentation
Revert completed successfully!
The task has been marked as pending in the plan.
```

### Step 3: Continue Implementation
After reverting:
1. Review what was reverted
2. Make necessary corrections
3. Continue implementation with corrected code
4. Commit changes with proper messages

## 4. Complete Track Workflow

This workflow describes the complete lifecycle of a track from creation to completion.

### Phase 1: Track Creation
1. Run `/conductor:newTrack "description"`
2. Answer questions to build specification
3. Review and approve specification
4. Generate implementation plan
5. Add track to registry

### Phase 2: Implementation
1. Run `/conductor:implement` to start tasks
2. Follow TDD workflow for each task
3. Commit changes with proper messages
4. Update plan after each task
5. Repeat until all tasks complete

### Phase 3: Review
1. Run `/conductor:review` to review completed work
2. Address any feedback or issues
3. Ensure all requirements are met
4. Get approval for completion

### Phase 4: Finalization
1. Mark track as complete in registry
2. Commit final changes
3. Update project documentation if needed
4. Archive or delete track folder (optional)

## 5. Multi-Track Workflow

When working on multiple tracks simultaneously:

### Step 1: Prioritize Tracks
1. Run `/conductor:status` to see all tracks
2. Identify which track to work on first
3. Focus on one track at a time
4. Avoid context switching

### Step 2: Work on One Track
1. Select the highest priority track
2. Run `/conductor:implement` to start work
3. Complete all tasks in the track
4. Review and finalize the track

### Step 3: Switch Tracks
1. Run `/conductor:status` to see next track
2. Switch to the next track
3. Repeat implementation workflow
4. Continue until all tracks complete

## 6. Team Collaboration Workflow

When working with a team:

### Step 1: Track Assignment
1. Create tracks for each feature/bug
2. Assign tracks to team members
3. Use `/conductor:status` to track progress

### Step 2: Individual Implementation
1. Each team member works on assigned tracks
2. Follow the standard implementation workflow
3. Commit changes with clear messages
4. Update plan after each task

### Step 3: Team Review
1. Run `/conductor:review` on completed tracks
2. Share review feedback with team
3. Address any issues found
4. Get team approval for completion

### Step 4: Team Status Updates
1. Run `/conductor:status` for team updates
2. Share progress with team members
3. Adjust priorities based on team capacity
4. Plan next sprint or iteration

## 7. Emergency Workflow

When critical bugs need immediate attention:

### Step 1: Create Hotfix Track
```
/conductor:newTrack "Fix critical login bug"
```

### Step 2: Implement Immediately
```
/conductor:implement
```

### Step 3: Review and Deploy
```
/conductor:review
```

### Step 4: Update Documentation
Update any documentation affected by the fix.

## 8. Maintenance Workflow

When performing maintenance tasks:

### Step 1: Create Maintenance Track
```
/conductor:newTrack "Update dependencies to latest versions"
```

### Step 2: Implement Maintenance Tasks
```
/conductor:implement
```

### Step 3: Test Thoroughly
Ensure all tests pass and coverage is adequate.

### Step 4: Review and Merge
```
/conductor:review
```

## Best Practices

### Workflow Tips
1. **One track at a time**: Focus on completing one track before starting another
2. **Regular status checks**: Run `/conductor:status` daily to track progress
3. **Clear commit messages**: Use descriptive commit messages following project guidelines
4. **Review before completion**: Always review completed work before marking as complete

### Common Pitfalls
1. **Starting multiple tracks**: Avoid context switching between tracks
2. **Skipping reviews**: Always review completed work before marking as complete
3. **Poor commit messages**: Use clear, descriptive commit messages
4. **Ignoring status**: Regular status checks help identify issues early

### Workflow Optimization
1. **Batch similar tasks**: Group similar tasks together in tracks
2. **Plan ahead**: Create tracks for upcoming work
3. **Track velocity**: Monitor how quickly tracks are completed
4. **Adjust plans**: Use status information to adjust priorities

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

### Workflow Summary
1. **Setup**: `/conductor:setup`
2. **Create Track**: `/conductor:newTrack "description"`
3. **Implement**: `/conductor:implement`
4. **Review**: `/conductor:review`
5. **Monitor**: `/conductor:status`
6. **Revert** (if needed): `/conductor:revert`

### Track Lifecycle
1. **Pending**: `[ ]` - Not started
2. **In Progress**: `[~]` - Being worked on
3. **Completed**: `[x]` - Done and reviewed