# `/conductor:review` Command Documentation

## Description
The `/conductor:review` command reviews completed track work against the project's standards, design guidelines, and the original plan. This command acts as a quality gate to ensure that completed work meets the project's requirements before being marked as fully complete.

The command performs the following steps:
1. **Identify Scope**: Determines which track or tracks to review
2. **Load Track Context**: Reads the track's specification, plan, and implementation
3. **Review Against Guidelines**: Checks code against project standards and style guides
4. **Verify Implementation**: Ensures all tasks in the plan were completed correctly
5. **Provide Feedback**: Offers constructive feedback and suggestions
6. **Mark for Approval**: Prepares the track for final approval or revision

## Syntax
```
/conductor:review [track_name]
```

## Parameters
- **track_name** (optional): Specific track to review
  - If not provided, the command will review the track marked as `[~] In Progress`
  - If provided, the command will review the specified track

## Usage Examples

### Review Current Track
```
/conductor:review
```
This will:
1. Find the track marked as `[~] In Progress`
2. Review all completed work against the specification and plan
3. Check code quality and adherence to guidelines
4. Provide feedback and suggestions
5. Mark the track for approval or revision

### Review Specific Track
```
/conductor:review "add_comprehensive_documentation_20260422"
```
This will:
1. Find the specified track
2. Review all completed work in that track
3. Provide detailed feedback
4. Mark the track for approval or revision

### Review All Completed Tracks
```
/conductor:review
```
If no track is specified and no track is marked as `[~] In Progress`, the command will review all completed tracks.

## Expected Output
Upon successful execution, you should see:
1. Confirmation of which track is being reviewed
2. Summary of completed tasks and their status
3. Code quality assessment
4. Adherence to project guidelines
5. Feedback and suggestions for improvement
6. Recommendation for approval or revision

## Common Errors

### Error: "Conductor is not set up"
**Cause**: This error occurs when you try to review tracks before running `/conductor:setup`.

**Solution**: Run `/conductor:setup` to initialize the Conductor environment for your project.

### Error: "No completed tracks found"
**Cause**: There are no tracks marked as completed (`[x]`) in the tracks registry.

**Solution**: Complete a track using `/conductor:implement` before reviewing it.

### Error: "Track not found"
**Cause**: The specified track name doesn't exist.

**Solution**: Check the track name spelling or run `/conductor:status` to see available tracks.

### Error: "No track in progress"
**Cause**: No track is marked as `[~] In Progress`.

**Solution**: Create a new track with `/conductor:newTrack` or select a specific track to review.

## Troubleshooting

### Review process is stuck or frozen
1. Check if there are any background processes interfering
2. Try running the command again
3. Check the OpenCode logs for any error messages

### Review feedback is unclear
1. Review the track's specification and plan files
2. Check the implementation code against the requirements
3. Run the tests manually to see detailed results
4. Ask for clarification on specific feedback points

### Code quality issues found
1. Review the specific issues mentioned in the feedback
2. Make the necessary changes to address the issues
3. Run the review again to verify the changes
4. Commit the changes and update the plan

### Guidelines not being followed
1. Review the project's style guides in `conductor/code_styleguides/`
2. Update the code to follow the guidelines
3. Run the review again to verify compliance
4. Commit the changes and update the plan

## Related Commands
- `/conductor:implement` - Implement tasks from a track
- `/conductor:status` - View all tracks and their status
- `/conductor:revert` - Revert changes if needed
- `/conductor:newTrack` - Create a new track

## Best Practices

### Before Reviewing
1. **Complete all tasks**: Ensure all tasks in the plan are marked as complete
2. **Run tests**: Verify all tests pass
3. **Check coverage**: Ensure code coverage meets requirements
4. **Review code**: Self-review for clarity and correctness

### During Review
1. **Be thorough**: Check all aspects of the implementation
2. **Be constructive**: Provide helpful feedback and suggestions
3. **Be specific**: Point to specific issues and provide examples
4. **Be objective**: Focus on code quality and adherence to guidelines

### After Review
1. **Address feedback**: Make necessary changes based on review feedback
2. **Update documentation**: Ensure documentation is up-to-date
3. **Commit changes**: Commit all changes with proper messages
4. **Mark as complete**: Update the track status to `[x] Completed`

## Review Checklist
Before marking a track as complete, verify:

### Code Quality
- [ ] Code follows project style guides
- [ ] Functions/methods are well-named and documented
- [ ] Code is readable and maintainable
- [ ] No code duplication
- [ ] Proper error handling

### Testing
- [ ] All unit tests pass
- [ ] Code coverage meets requirements (>80%)
- [ ] Edge cases are tested
- [ ] Integration tests pass (if applicable)

### Documentation
- [ ] Code is properly documented (comments, docstrings)
- [ ] Public APIs are documented
- [ ] Usage examples are provided
- [ ] README is updated if needed

### Implementation
- [ ] All tasks in the plan are completed
- [ ] Implementation matches the specification
- [ ] No security vulnerabilities introduced
- [ ] Performance is acceptable

### Version Control
- [ ] All changes are committed
- [ ] Commit messages are clear and descriptive
- [ ] Git notes are attached with task summaries
- [ ] Plan is updated with commit hashes

## Review Process
The review process follows these steps:

1. **Load Track Context**:
   - Read the track's specification (`spec.md`)
   - Read the track's implementation plan (`plan.md`)
   - Read the track's metadata (`metadata.json`)

2. **Review Implementation**:
   - Check that all tasks in the plan are marked as complete
   - Verify that implementation matches the specification
   - Review code quality and adherence to guidelines

3. **Review Testing**:
   - Verify that all tests pass
   - Check code coverage meets requirements
   - Review test quality and coverage

4. **Review Documentation**:
   - Check that code is properly documented
   - Verify that documentation is up-to-date
   - Review usage examples and comments

5. **Provide Feedback**:
   - Identify any issues or improvements needed
   - Provide constructive feedback and suggestions
   - Offer specific examples and recommendations

6. **Make Recommendation**:
   - Approve: Track meets all requirements and can be marked as complete
   - Revise: Track needs changes before being marked as complete
   - Reject: Track does not meet requirements and needs significant work

## Quality Gates
Before marking any track as complete, verify:

- [ ] All code implemented to specification
- [ ] Unit tests written and passing
- [ ] Code coverage meets project requirements
- [ ] Documentation complete (if applicable)
- [ ] Code passes all configured linting and static analysis checks
- [ ] Works beautifully on mobile (if applicable)
- [ ] Implementation notes added to `plan.md`
- [ ] Changes committed with proper message
- [ ] Git note with task summary attached to the commit