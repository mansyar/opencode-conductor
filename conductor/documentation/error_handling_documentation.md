# Error Handling Guide

This document provides a comprehensive guide to common errors and their solutions when using the Conductor plugin.

## 1. Common Setup Errors

### Error: "Conductor is not set up"
**Cause**: This error occurs when you try to use Conductor commands before running `/conductor:setup`.

**Solution**: Run `/conductor:setup` to initialize the Conductor environment for your project.

**Example:**
```
/conductor:newTrack "Implement user authentication"

Error: Conductor is not set up. Please run `/conductor:setup` to set up the environment.
```

**Steps to fix:**
1. Run `/conductor:setup`
2. Complete the setup process
3. Run the original command again

### Error: Permission denied
**Cause**: Insufficient file permissions to create or modify files in the project directory.

**Solution**: Check file permissions and ensure you have write access to the project directory.

**Example:**
```
/conductor:setup

Error: Permission denied: 'conductor/product.md'
```

**Steps to fix:**
1. Check directory permissions: `ls -la` (Unix/Linux) or check folder properties (Windows)
2. Adjust permissions if needed: `chmod u+w .` (Unix/Linux)
3. Try running OpenCode with administrator privileges if needed
4. Run `/conductor:setup` again

### Error: Git repository has uncommitted changes
**Cause**: The setup process detected uncommitted changes in your Git repository.

**Solution**: Commit or stash your changes before running `/conductor:setup`.

**Example:**
```
/conductor:setup

Warning: You have uncommitted changes in your Git repository. Please commit or stash your changes before proceeding.
```

**Steps to fix:**
1. Review uncommitted changes: `git status`
2. Commit changes: `git add . && git commit -m "Save current work"`
3. Or stash changes: `git stash`
4. Run `/conductor:setup` again

### Error: Setup state file corruption
**Cause**: The `conductor/setup_state.json` file is corrupted or invalid.

**Solution**: Delete the file and run `/conductor:setup` again.

**Example:**
```
/conductor:setup

Error: Invalid JSON in setup_state.json
```

**Steps to fix:**
1. Delete the file: `rm conductor/setup_state.json`
2. Run `/conductor:setup` again
3. Complete the setup process from the beginning

## 2. Common Track Management Errors

### Error: "No pending tasks found"
**Cause**: All tasks in the current track have been completed.

**Solution**: Create a new track with `/conductor:newTrack` or select a different track.

**Example:**
```
/conductor:implement

Error: No pending tasks found in the current track.
```

**Steps to fix:**
1. Run `/conductor:status` to see all tracks
2. Create a new track: `/conductor:newTrack "description"`
3. Or switch to a different track: `/conductor:implement "track_name"`

### Error: "Track not found"
**Cause**: The specified track name doesn't exist.

**Solution**: Check the track name spelling or run `/conductor:status` to see available tracks.

**Example:**
```
/conductor:implement "user_auth"

Error: Track not found: user_auth
```

**Steps to fix:**
1. Run `/conductor:status` to see all tracks
2. Copy the exact track name from the status output
3. Run the command with the correct track name

### Error: "No track in progress"
**Cause**: No track is marked as `[~] In Progress`.

**Solution**: Create a new track or select a specific track to work on.

**Example:**
```
/conductor:review

Error: No track in progress. Please create a new track or select a specific track.
```

**Steps to fix:**
1. Run `/conductor:status` to see all tracks
2. Create a new track: `/conductor:newTrack "description"`
3. Or review a specific track: `/conductor:review "track_name"`

### Error: Track files not created
**Cause**: Track files were not created during track creation.

**Solution**: Check the track folder and create missing files manually.

**Example:**
```
/conductor:newTrack "Implement user authentication"

Track created but files missing in conductor/tracks/implement_user_auth_20260422/
```

**Steps to fix:**
1. Check the track folder: `ls conductor/tracks/implement_user_auth_20260422/`
2. Create missing files manually
3. Update the tracks registry if needed

## 3. Common Implementation Errors

### Error: Test failures
**Cause**: Tests are failing during the implementation phase.

**Solution**: Follow the TDD workflow - write failing tests first, then implement code to make them pass.

**Example:**
```
/conductor:implement

Red Phase: Writing failing tests...
✗ Test failed: test_user_authentication() failed with error: NameError: name 'authenticate' is not defined
```

**Steps to fix:**
1. Review the test file to understand what's expected
2. Implement the minimum code to make tests pass
3. Run tests again to verify they pass
4. Refactor if needed

### Error: Coverage requirements not met
**Cause**: Code coverage is below the project's requirements (>80%).

**Solution**: Add more tests to increase coverage before marking the task as complete.

**Example:**
```
/conductor:implement

Coverage: 65% (target: 80%)
✗ Coverage requirement not met
```

**Steps to fix:**
1. Run coverage report: `npm run coverage` or `pytest --cov=app`
2. Identify uncovered code paths
3. Add tests for uncovered code
4. Run coverage again to verify

### Error: Commit fails due to pre-commit hooks
**Cause**: Pre-commit hooks are failing (linting, formatting, etc.).

**Solution**: Fix the issues identified by the hooks, then commit again.

**Example:**
```
git commit -m "feat(auth): Add user authentication"

✗ Pre-commit hook failed: Linting errors found
```

**Steps to fix:**
1. Review the pre-commit hook output
2. Fix the identified issues (linting, formatting, etc.)
3. Run the commit again
4. If needed, use `--no-verify` flag (not recommended)

### Error: Task status not updating in plan
**Cause**: The plan file is not writable or the task line format is incorrect.

**Solution**: Check the plan file and update the task status manually if needed.

**Example:**
```
/conductor:implement

Error: Could not update task status in plan.md
```

**Steps to fix:**
1. Check if plan.md is writable
2. Verify the task line format in the plan
3. Manually update the task status from `[~]` to `[x]`
4. Commit the plan changes separately

### Error: Checkpoint failed
**Cause**: The automated checkpoint failed due to test failures, low coverage, or Git issues.

**Solution**: Review the checkpoint output, fix the underlying issue, and retry.

**Example:**
```
/conductor:implement

Error: Checkpoint failed: Coverage too low (75%). Target is >80%.
```

**Steps to fix:**
1. Review the coverage report to identify gaps.
2. Add more tests to reach the 80% threshold.
3. If the failure was due to Git (e.g., identity not set), configure your Git user.
4. Retry the implementation or manually run the checkpoint tool.

## 4. Common Review Errors

### Error: "No completed tracks found"
**Cause**: There are no tracks marked as completed (`[x]`) in the tracks registry.

**Solution**: Complete a track using `/conductor:implement` before reviewing it.

**Example:**
```
/conductor:review

Error: No completed tracks found. Please complete a track before reviewing.
```

**Steps to fix:**
1. Run `/conductor:status` to see track status
2. Complete a track using `/conductor:implement`
3. Run `/conductor:review` again

### Error: Review feedback is unclear
**Cause**: The review feedback doesn't provide specific guidance.

**Solution**: Review the track's specification and plan files to understand requirements.

**Example:**
```
/conductor:review

Review: Code needs improvement
```

**Steps to fix:**
1. Review the track's specification (`spec.md`)
2. Review the track's plan (`plan.md`)
3. Check code against project style guides
4. Make specific improvements based on requirements

## 5. Common Status Errors

### Error: "Tracks file not found"
**Cause**: The tracks registry file (`conductor/tracks.md`) doesn't exist.

**Solution**: Run `/conductor:setup` to create the tracks registry.

**Example:**
```
/conductor:status

Error: Tracks file not found: conductor/tracks.md
```

**Steps to fix:**
1. Run `/conductor:setup` to initialize the project
2. Or create the tracks file manually
3. Run `/conductor:status` again

### Error: "No tracks found"
**Cause**: The tracks registry exists but contains no tracks.

**Solution**: Create a new track with `/conductor:newTrack` to get started.

**Example:**
```
/conductor:status

No tracks found. Create a new track with `/conductor:newTrack`.
```

**Steps to fix:**
1. Run `/conductor:newTrack "description"`
2. Complete the track creation process
3. Run `/conductor:status` again

## 6. Common Revert Errors

### Error: "No revertible changes found"
**Cause**: There are no commits that can be reverted (e.g., no commits in the current branch).

**Solution**: Ensure you have committed changes before trying to revert them.

**Example:**
```
/conductor:revert

Error: No revertible changes found.
```

**Steps to fix:**
1. Check commit history: `git log`
2. Ensure you have committed changes
3. Run `/conductor:revert` again

### Error: Revert fails due to merge conflicts
**Cause**: The Git revert operation encountered merge conflicts.

**Solution**: Resolve the conflicts manually, then try the revert again.

**Example:**
```
/conductor:revert

Error: Merge conflict in file: src/auth.js
```

**Steps to fix:**
1. Check which files have conflicts
2. Resolve the conflicts manually
3. Commit the resolved changes
4. Try the revert again

## 7. General Troubleshooting Steps

### Step 1: Check OpenCode Status
1. Ensure OpenCode is running properly
2. Check for any error messages in the OpenCode output
3. Restart OpenCode if needed

### Step 2: Check Conductor Setup
1. Run `/conductor:status` to verify setup
2. Check that all required files exist in `conductor/`
3. Run `/conductor:setup` if needed

### Step 3: Check Git Status
1. Run `git status` to see current changes
2. Commit or stash changes if needed
3. Ensure you're on the correct branch

### Step 4: Check File Permissions
1. Verify you have write access to the project directory
2. Check file permissions on `conductor/` directory
3. Adjust permissions if needed

### Step 5: Check Command Syntax
1. Verify you're using the correct command syntax
2. Check for typos in command names
3. Refer to command documentation for correct usage

### Step 6: Check Track Status
1. Run `/conductor:status` to see all tracks
2. Verify track names and status
3. Ensure you're working on the correct track

### Step 7: Check Implementation Plan
1. Review the track's `plan.md` file
2. Verify task status markers (`[ ]`, `[~]`, `[x]`)
3. Ensure tasks are properly formatted

### Step 8: Check Test Results
1. Run tests manually to see detailed error messages
2. Review test files for correctness
3. Check test coverage reports

## 8. Getting Help

### Documentation
1. Review this error handling guide
2. Check individual command documentation
3. Read the workflow documentation

### Community Support
1. Check the project repository for issues
2. Search for similar problems and solutions
3. Ask for help in the community forums

### Debugging Tips
1. Check OpenCode logs for detailed error messages
2. Run commands with verbose output if available
3. Use debugging tools to identify issues

## 9. Prevention Tips

### Before Running Commands
1. **Read documentation**: Understand what each command does
2. **Check status**: Run `/conductor:status` to see current state
3. **Backup work**: Commit or stash important changes
4. **Plan ahead**: Know what you want to accomplish

### During Implementation
1. **Follow TDD**: Write tests before implementation
2. **Commit often**: Make small, focused commits
3. **Update plan**: Mark tasks as complete after each task
4. **Review regularly**: Check status and progress

### After Completion
1. **Review work**: Run `/conductor:review` before marking complete
2. **Update documentation**: Ensure documentation is up-to-date
3. **Commit changes**: Commit all changes with proper messages
4. **Share with team**: Keep team updated on progress

## 10. Emergency Procedures

### Critical Bug in Production
1. Create hotfix branch from main
2. Write failing test for bug
3. Implement minimal fix
4. Test thoroughly including mobile
5. Deploy immediately
6. Document in plan.md

### Data Loss
1. Stop all write operations
2. Restore from latest backup
3. Verify data integrity
4. Document incident
5. Update backup procedures

### Security Breach
1. Rotate all secrets immediately
2. Review access logs
3. Patch vulnerability
4. Notify affected users (if any)
5. Document and update security procedures