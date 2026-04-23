# `/conductor:revert` Command Documentation

## Description
The `/conductor:revert` command interactively selects a task, phase, or track to undo via Git. This command provides a safe way to revert changes while maintaining the logical structure of your work.

The command performs the following steps:
1. **Identify Revertible Changes**: Analyzes Git history to find revertible commits
2. **Present Options**: Shows available revert options (task, phase, track)
3. **Interactive Selection**: Allows user to choose what to revert
4. **Confirm Revert**: Asks for confirmation before reverting
5. **Execute Revert**: Performs the revert operation using Git
6. **Update Plan**: Updates the implementation plan to reflect the revert

## Syntax
```
/conductor:revert [target]
```

## Parameters
- **target** (optional): Specific target to revert (e.g., 'track <track_id>', 'phase <phase_name>', 'task <task_name>')
  - If not provided, the command will show revert options for all tracks
  - If provided, the command will show revert options for the specified target

## Usage Examples

### Revert Specific Task
```
/conductor:revert "task Create user model"
```
This will:
1. Revert the specific task and update the plan.

### Revert Specific Phase
```
/conductor:revert "phase Research and Discovery"
```
This will:
1. Revert the specific phase and update the plan.

### Revert Entire Track
```
/conductor:revert "track add_comprehensive_documentation_20260422"
```
This will:
1. Show revert options for the specified track
2. Allow you to select the entire track to revert
3. Confirm the revert operation
4. Revert the entire track and update the plan

### Revert After Mistake
```
/conductor:revert
```
If you made a mistake in implementation:
1. Run `/conductor:revert` to see revert options
2. Select the task or phase that contains the mistake
3. Confirm the revert operation
4. Continue implementation with the corrected code

## Expected Output
Upon successful execution, you should see:

### Revert Options
```
Available Revert Options:
1. Task: Create test file for setup command documentation
   *Commit: abc1234 - feat(docs): Create test file for setup command*
2. Phase: Research and Planning
   *Commit: def5678 - checkpoint: End of Phase 1*
3. Track: Add comprehensive documentation for all slash commands
   *Commit: ghi9012 - chore(conductor): Mark track as complete*

Please select an option (1-3):
```

### Confirmation
```
You selected: Task: Create test file for setup command documentation
This will revert the following commit:
- Commit: abc1234
- Message: feat(docs): Create test file for setup command
- Files changed: 1 file

Are you sure you want to revert this task? (yes/no):
```

### Revert Confirmation
```
Reverting task: Create test file for setup command documentation
Revert completed successfully!
The task has been marked as pending in the plan.
```

## Common Errors

### Error: "Conductor is not set up"
**Cause**: This error occurs when you try to revert changes before running `/conductor:setup`.

**Solution**: Run `/conductor:setup` to initialize the Conductor environment for your project.

### Error: "No revertible changes found"
**Cause**: There are no commits that can be reverted (e.g., no commits in the current branch).

**Solution**: Ensure you have committed changes before trying to revert them.

### Error: "Track not found"
**Cause**: The specified track name doesn't exist.

**Solution**: Check the track name spelling or run `/conductor:status` to see available tracks.

### Error: "Revert failed"
**Cause**: The Git revert operation failed (e.g., merge conflicts).

**Solution**: Resolve any Git conflicts manually, then try the revert again.

## Troubleshooting

### Revert process is stuck or frozen
1. Check if there are any background processes interfering
2. Try running the command again
3. Check the OpenCode logs for any error messages

### Revert options are unclear
1. Review the commit history with `git log`
2. Check the track's plan file to see task status
3. Run `/conductor:status` to see track progress
4. Ask for clarification on specific options

### Revert fails due to merge conflicts
1. Check which files have conflicts
2. Resolve the conflicts manually
3. Commit the resolved changes
4. Try the revert again

### Plan not updated after revert
1. Check that the plan file is writable
2. Verify the task line format in the plan
3. Manually update the task status if needed
4. Commit the plan changes separately

## Related Commands
- `/conductor:implement` - Implement tasks from a track
- `/conductor:review` - Review completed track work
- `/conductor:status` - View all tracks and their status
- `/conductor:newTrack` - Create a new track

## Best Practices

### Before Reverting
1. **Review changes**: Check what will be reverted
2. **Backup work**: Consider stashing changes if needed
3. **Understand impact**: Know what will be affected
4. **Plan next steps**: Know what to do after revert

### During Revert
1. **Be specific**: Revert only what's needed
2. **Confirm carefully**: Double-check before confirming
3. **Document reasons**: Note why you're reverting
4. **Update plan**: Ensure plan reflects the revert

### After Revert
1. **Verify changes**: Check that revert worked as expected
2. **Update plan**: Mark reverted tasks as pending
3. **Continue work**: Resume implementation with corrected code
4. **Commit changes**: Commit the revert with proper message

## Revert Options
The revert command provides these options:

### Task Revert
- **What**: Reverts a specific task
- **When**: When a task has mistakes or needs changes
- **Impact**: Only affects the specific task
- **Plan Update**: Task marked as pending

### Phase Revert
- **What**: Reverts an entire phase
- **When**: When a phase has fundamental issues
- **Impact**: Affects all tasks in the phase
- **Plan Update**: All tasks in phase marked as pending

### Track Revert
- **What**: Reverts the entire track
- **When**: When the track direction is wrong
- **Impact**: Affects all tasks in the track
- **Plan Update**: All tasks in track marked as pending

## Revert Workflow
1. **Run revert command**: Execute `/conductor:revert`
2. **Review options**: Examine available revert options
3. **Select option**: Choose what to revert
4. **Confirm**: Confirm the revert operation
5. **Execute**: Revert the selected changes
6. **Update plan**: Mark reverted tasks as pending
7. **Continue work**: Resume implementation

## Git Revert vs. Conductor Revert
### Git Revert
- Reverts a specific commit
- Creates a new commit that undoes changes
- Can cause merge conflicts
- Manual process

### Conductor Revert
- Reverts logical units of work (tasks, phases, tracks)
- Updates the implementation plan automatically
- Provides interactive selection
- Integrated with Conductor workflow

## Quality Gates
Before reverting, verify:
- [ ] You understand what will be reverted
- [ ] You know why you're reverting
- [ ] You have a plan for what to do after revert
- [ ] You've backed up any important changes
- [ ] You're reverting the correct thing

## Safety Features
The revert command includes safety features:
1. **Interactive selection**: Choose exactly what to revert
2. **Confirmation prompt**: Confirm before reverting
3. **Plan updates**: Automatically updates the plan
4. **Commit messages**: Clear messages about what was reverted
5. **Git notes**: Detailed notes about the revert operation