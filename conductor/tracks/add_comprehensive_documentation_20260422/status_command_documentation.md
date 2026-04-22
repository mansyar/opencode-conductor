# `/conductor:status` Command Documentation

## Description
The `/conductor:status` command displays a high-level overview of project progress and active tracks. This command provides a quick snapshot of the project's current state, including completed tracks, in-progress tracks, and pending work.

The command performs the following steps:
1. **Read Project Plan**: Loads the tracks registry and all track plans
2. **Parse Track Status**: Identifies completed, in-progress, and pending tracks
3. **Summarize Progress**: Calculates overall project progress
4. **Display Overview**: Presents a clear, organized status report

## Syntax
```
/conductor:status
```

## Parameters
This command does not accept any parameters.

## Usage Examples

### Check Project Status
```
/conductor:status
```
This will display:
- List of all tracks in the project
- Status of each track (completed, in-progress, pending)
- Overall project progress percentage
- Summary of completed and pending work

### View Active Tracks
```
/conductor:status
```
The status output includes:
- Tracks marked as `[~] In Progress`
- Next tasks to be completed
- Estimated time to completion

### Track Progress Over Time
```
/conductor:status
```
Run this command periodically to:
- Monitor project progress
- Identify bottlenecks
- Plan next steps
- Track completion rates

## Expected Output
Upon successful execution, you should see:

### Track List
```
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
```

### Progress Summary
```
Project Progress: 33% (1/3 tracks completed)
Completed: 1 track
In Progress: 1 track
Pending: 1 track
```

### Next Steps
```
Next Steps:
1. Complete implementation of user authentication track
2. Review completed work
3. Start work on dark mode support track
```

## Common Errors

### Error: "Conductor is not set up"
**Cause**: This error occurs when you try to check status before running `/conductor:setup`.

**Solution**: Run `/conductor:setup` to initialize the Conductor environment for your project.

### Error: "Tracks file not found"
**Cause**: The tracks registry file (`conductor/tracks.md`) doesn't exist.

**Solution**: Run `/conductor:setup` to create the tracks registry, or create a new track with `/conductor:newTrack`.

### Error: "No tracks found"
**Cause**: The tracks registry exists but contains no tracks.

**Solution**: Create a new track with `/conductor:newTrack` to get started.

## Troubleshooting

### Status output is unclear
1. Check that the tracks registry file exists
2. Verify that tracks are properly formatted in the registry
3. Run `/conductor:setup` to reinitialize if needed
4. Check the OpenCode logs for any error messages

### Tracks not appearing in status
1. Verify that tracks are added to `conductor/tracks.md`
2. Check that track folders exist in `conductor/tracks/`
3. Ensure track files (`spec.md`, `plan.md`) are properly formatted
4. Run `/conductor:status` again to refresh the display

### Progress percentage seems incorrect
1. Check that all tracks are properly marked as completed (`[x]`)
2. Verify that in-progress tracks are marked as `[~]`
3. Ensure pending tracks are marked as `[ ]`
4. Run `/conductor:status` again to recalculate

### Status command not responding
1. Check if OpenCode is running properly
2. Ensure you have an active conversation with the Conductor agent
3. Try running the command again
4. Check the OpenCode logs for any error messages

## Related Commands
- `/conductor:newTrack` - Create a new track
- `/conductor:implement` - Start implementing tasks
- `/conductor:review` - Review completed work
- `/conductor:revert` - Revert changes if needed

## Best Practices

### Regular Status Checks
1. **Daily**: Check status at the start of each day
2. **Before commits**: Check status before committing changes
3. **After completion**: Check status after completing a track
4. **Team meetings**: Use status for team updates

### Interpreting Status
1. **Completed tracks**: Review and learn from completed work
2. **In-progress tracks**: Focus on completing current tasks
3. **Pending tracks**: Plan and prioritize upcoming work
4. **Overall progress**: Track project velocity and adjust plans

### Status Reporting
1. **Share with team**: Use status for team updates
2. **Track trends**: Monitor progress over time
3. **Identify bottlenecks**: Look for slow-moving tracks
4. **Adjust plans**: Re-prioritize based on status

## Status Output Format
The status command displays:

### Header
```
Project Tracks
==============
```

### Track Sections
```
Completed Tracks:
- [x] Track: <Description>
  *Link: [./tracks/<track_id>/]*

In Progress Tracks:
- [~] Track: <Description>
  *Link: [./tracks/<track_id>/]*

Pending Tracks:
- [ ] Track: <Description>
  *Link: [./tracks/<track_id>]/*
```

### Progress Summary
```
Project Progress: <percentage>% (<completed>/<total> tracks completed)
Completed: <number> track(s)
In Progress: <number> track(s)
Pending: <number> track(s)
```

### Next Steps
```
Next Steps:
1. <Action item 1>
2. <Action item 2>
3. <Action item 3>
```

## Understanding Track Status

### Completed Tracks (`[x]`)
- All tasks in the track are complete
- Track has been reviewed and approved
- Changes have been committed and documented
- Track can be archived or deleted

### In Progress Tracks (`[~]`)
- At least one task is being actively worked on
- Track is currently being implemented
- Focus should be on completing current tasks
- Track should not be started until current one is complete

### Pending Tracks (`[ ]`)
- No work has started on this track
- Track is waiting to be implemented
- Can be prioritized and scheduled
- Should be reviewed before starting work

## Project Progress Calculation
The progress percentage is calculated as:

```
Progress = (Completed Tracks / Total Tracks) * 100
```

For example:
- 1 completed track out of 3 total tracks = 33% progress
- 2 completed tracks out of 3 total tracks = 67% progress
- 3 completed tracks out of 3 total tracks = 100% progress

## Track Information Displayed
For each track, the status shows:
1. **Status marker**: `[x]`, `[~]`, or `[ ]`
2. **Track description**: Brief description of the track
3. **Track link**: Path to the track's folder
4. **Track ID**: Unique identifier for the track

## Using Status for Planning
The status output can help you:
1. **Prioritize work**: Focus on in-progress tracks first
2. **Plan next steps**: Identify which pending tracks to start next
3. **Track velocity**: Monitor how quickly tracks are completed
4. **Identify issues**: Spot tracks that are taking too long

## Status Command Workflow
1. **Run command**: Execute `/conductor:status`
2. **Review output**: Examine the status display
3. **Identify next action**: Determine what to work on next
4. **Take action**: Start implementing or continue current work
5. **Repeat**: Check status regularly to track progress