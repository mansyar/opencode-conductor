# `/conductor:implement` Command Documentation

## Description
The `/conductor:implement` command starts implementing the next pending task in the current track. This command follows the Test-Driven Development (TDD) workflow and guides you through the implementation process step by step.

The command performs the following steps:
1. **Select Task**: Chooses the next available task from the track's implementation plan
2. **Mark In Progress**: Updates the task status from `[ ]` to `[~]` in the plan
3. **Write Failing Tests (Red Phase)**: Creates test files and writes tests that fail as expected
4. **Implement to Pass Tests (Green Phase)**: Writes application code to make the tests pass
5. **Refactor**: Improves code clarity and performance without changing behavior
6. **Verify Coverage**: Ensures code coverage meets project requirements
7. **Execute Checkpoint**: Automates the Git commit and note attachment using the `checkpoint` tool
8. **Update Plan**: Marks the task as complete in the implementation plan

## Syntax
```
/conductor:implement [track_name]
```

## Parameters
- **track_name** (optional): Specific track to implement
  - If not provided, the command will implement the next pending task in the current track
  - If provided, the command will implement tasks from the specified track

## Usage Examples

### Implement Next Task in Current Track
```
/conductor:implement
```
This will:
1. Find the next pending task in the current track
2. Mark it as in progress
3. Follow the TDD workflow to implement the task
4. Update the plan and commit changes

### Implement Specific Track
```
/conductor:implement "add_comprehensive_documentation_20260422"
```
This will:
1. Find the specified track
2. Implement the next pending task in that track
3. Follow the TDD workflow
4. Update the plan and commit changes

### Implement After Creating a New Track
```
/conductor:newTrack "Implement user authentication"
/conductor:implement
```
After creating a new track, run `/conductor:implement` to start working on the first task in the implementation plan.

## Expected Output
Upon successful execution, you should see:
1. Confirmation of which task is being implemented
2. Progress through the TDD workflow (Red, Green, Refactor phases)
3. Test results and coverage information
4. Commit confirmation with commit hash
5. Updated task status in the implementation plan

## Common Errors

### Error: "Conductor is not set up"
**Cause**: This error occurs when you try to implement tasks before running `/conductor:setup`.

**Solution**: Run `/conductor:setup` to initialize the Conductor environment for your project.

### Error: "No pending tasks found"
**Cause**: All tasks in the current track have been completed.

**Solution**: Create a new track with `/conductor:newTrack` or select a different track.

### Error: "Track not found"
**Cause**: The specified track name doesn't exist.

**Solution**: Check the track name spelling or run `/conductor:status` to see available tracks.

### Error: "Test failures"
**Cause**: Tests are failing during the implementation phase.

**Solution**: Follow the TDD workflow - write failing tests first, then implement code to make them pass.

### Error: "Coverage requirements not met"
**Cause**: Code coverage is below the project's requirements (>80%).

**Solution**: Add more tests to increase coverage before marking the task as complete.

## Troubleshooting

### Implementation process is stuck or frozen
1. Check if there are any background processes interfering
2. Try running the command again - it should resume from the last step
3. Check the OpenCode logs for any error messages

### Tests are failing unexpectedly
1. Review the test file to ensure tests are correct
2. Check the implementation code for bugs
3. Run the tests manually to see detailed error messages
4. Use debugging tools to identify the issue

### Code coverage is too low
1. Run the coverage report to see which lines are not covered
2. Add tests for uncovered code paths
3. Consider edge cases and error conditions
4. Use the coverage tool to identify gaps

### Commit fails due to pre-commit hooks
1. Check the pre-commit hook configuration
2. Fix any issues identified by the hooks
3. Run the commit again with `--no-verify` if needed (not recommended)

### Task status not updating in plan
1. Check that the plan file is writable
2. Verify the task line format in the plan
3. Manually update the task status if needed
4. Commit the plan changes separately

## Related Commands
- `/conductor:newTrack` - Create a new track to implement
- `/conductor:review` - Review completed track work
- `/conductor:status` - View all tracks and their status
- `/conductor:revert` - Revert changes if needed

## Best Practices

### TDD Workflow
1. **Red Phase**: Write tests that fail
2. **Green Phase**: Write minimal code to make tests pass
3. **Refactor**: Improve code without changing behavior
4. **Verify**: Ensure tests still pass after refactoring

### Task Implementation
1. **One task at a time**: Focus on completing one task before moving to the next
2. **Small commits**: Make small, focused commits for each task
3. **Clear messages**: Use descriptive commit messages following the project's guidelines
4. **Test coverage**: Ensure adequate test coverage before marking tasks complete

### Code Quality
1. **Follow style guides**: Adhere to the project's code style guidelines
2. **Document code**: Add comments and docstrings where appropriate
3. **Type safety**: Use type hints or TypeScript types as required
4. **No linting errors**: Ensure code passes all linting checks

### Before Committing
1. **Run tests**: Ensure all tests pass
2. **Check coverage**: Verify coverage meets requirements
3. **Review code**: Self-review for clarity and correctness
4. **Update plan**: Mark task as complete in the implementation plan

## Task Workflow
Each task follows this workflow:

1. **Select Task**: Choose next available task from `plan.md`
2. **Mark In Progress**: Edit `plan.md` and change task from `[ ]` to `[~]`
3. **Write Failing Tests (Red Phase)**:
   - Create test file for the feature or bug fix
   - Write unit tests that define expected behavior
   - Run tests and confirm they fail as expected
4. **Implement to Pass Tests (Green Phase)**:
   - Write minimum code to make failing tests pass
   - Run test suite and confirm all tests pass
5. **Refactor (Optional but Recommended)**:
   - Improve code clarity and performance
   - Rerun tests to ensure they still pass
6. **Verify Coverage**:
   - Run coverage reports
   - Target >80% coverage for new code
7. **Execute Checkpoint**:
   - The agent invokes the `checkpoint` tool
   - This automatically stages changes, commits them, and attaches the verification report as a Git note
8. **Update Plan**:
   - Mark task as complete in `plan.md`
   - Append commit hash to task
9. **Commit Plan Update**:
    - Stage modified `plan.md`
    - Commit with descriptive message

## Quality Gates
Before marking any task complete, verify:
- [ ] All tests pass
- [ ] Code coverage meets requirements (>80%)
- [ ] Code follows project's code style guidelines
- [ ] All public functions/methods are documented
- [ ] Type safety is enforced
- [ ] No linting or static analysis errors
- [ ] Works correctly on mobile (if applicable)
- [ ] Documentation updated if needed
- [ ] No security vulnerabilities introduced