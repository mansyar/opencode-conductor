# `/conductor:newTrack` Command Documentation

## Description
The `/conductor:newTrack` command creates a new track (a feature, bug fix, or chore) for your project. This command guides you through an interactive process to define the track's specification and generates a detailed implementation plan.

The command performs the following steps:
1. **Get Track Description**: Accepts a brief description of the track from the user
2. **Interactive Specification Generation**: Asks a series of questions to build a comprehensive specification (`spec.md`)
3. **Interactive Plan Generation**: Creates a phased implementation plan (`plan.md`) based on the specification
4. **Track Artifacts Creation**: Generates track-specific files and directories
5. **Tracks Registry Update**: Adds the new track to the project's tracks registry

## Syntax
```
/conductor:newTrack [description]
```

## Parameters
- **description** (optional): A brief description of the track (feature, bug fix, chore, etc.)
  - If not provided, the command will guide you through defining the track description interactively.
  - Example: "Implement user authentication"
  - Example: "Fix login page styling issues"
  - Example: "Update dependencies to latest versions"

## Usage Examples

### Creating a New Feature Track
```
/conductor:newTrack "Implement user authentication with OAuth2"
```
This will:
1. Create a new track with ID `implement-user-authentication_YYYYMMDD`
2. Generate a specification file (`spec.md`) with detailed requirements
3. Create an implementation plan (`plan.md`) with phased tasks
4. Add the track to the tracks registry (`tracks.md`)

### Creating a Bug Fix Track
```
/conductor:newTrack "Fix mobile layout issues on dashboard"
```
This will:
1. Create a new track for fixing the mobile layout
2. Generate a specification with reproduction steps and expected behavior
3. Create an implementation plan with testing and verification tasks
4. Add the track to the tracks registry

### Creating a Chore Track
```
/conductor:newTrack "Update dependencies to latest versions"
```
This will:
1. Create a new track for maintenance work
2. Generate a specification with dependency list and update requirements
3. Create an implementation plan with testing tasks
4. Add the track to the tracks registry

## Expected Output
Upon successful execution, you should see:
1. Confirmation that a new track has been created
2. The track ID (e.g., `implement-user-authentication_20260422`)
3. Location of the track's specification and plan files
4. Instructions for next steps (implementing the track)

## Common Errors

### Error: "Conductor is not set up"
**Cause**: This error occurs when you try to create a track before running `/conductor:setup`.

**Solution**: Run `/conductor:setup` to initialize the Conductor environment for your project.

### Error: Missing track description
**Cause**: The command was run without providing a description.

**Solution**: Provide a brief description of the track when running the command:
```
/conductor:newTrack "Your track description here"
```

### Error: Invalid track description format
**Cause**: The track description contains invalid characters or is too long.

**Solution**: Use a clear, concise description (recommended: 10-100 characters). Avoid special characters except basic punctuation.

### Error: Track already exists
**Cause**: A track with a similar description already exists.

**Solution**: Use a more specific description or check the existing tracks with `/conductor:status`.

## Troubleshooting

### Command doesn't respond or seems stuck
1. Check if OpenCode is running properly
2. Ensure you have an active conversation with the Conductor agent
3. Try running the command again with a simpler description

### Track files not created
1. Verify that the `conductor/tracks/` directory exists
2. Check that you have write permissions in the project directory
3. Look for error messages in the OpenCode output

### Specification or plan files are incomplete
1. Check the generated files in `conductor/tracks/<track_id>/`
2. Review the specification and plan - you can edit them manually
3. Run `/conductor:implement` to see if the track can be implemented

### Track not appearing in status
1. Verify that the track was added to `conductor/tracks.md`
2. Check the track ID matches what was displayed during creation
3. Run `/conductor:status` to see all tracks

## Related Commands
- `/conductor:setup` - Initialize the Conductor environment
- `/conductor:implement` - Start implementing tasks from a track
- `/conductor:status` - View all tracks and their status
- `/conductor:review` - Review completed track work

## Best Practices

### Track Description Guidelines
1. **Be specific**: "Implement user authentication" is better than "Add auth"
2. **Be concise**: Keep descriptions under 100 characters
3. **Use action verbs**: Start with "Implement", "Fix", "Update", "Add", etc.
4. **Include scope**: Mention what part of the system is affected

### Track Creation Workflow
1. **Before creating**: Have a clear idea of what needs to be done
2. **During creation**: Answer questions thoughtfully to build a good specification
3. **After creation**: Review the generated spec and plan before implementing
4. **Before implementing**: Ensure the specification accurately captures requirements

### Track Organization
1. **Use consistent naming**: Follow the pattern `shortname_YYYYMMDD`
2. **Group related tracks**: Create tracks for related features together
3. **Keep tracks focused**: Each track should address a single feature or bug
4. **Document dependencies**: Note if a track depends on other tracks

## Track Structure
After creating a track, the following files are generated:
```
conductor/tracks/<track_id>/
├── index.md          # Track context with links to other files
├── spec.md           # Detailed specification
├── plan.md           # Implementation plan with tasks
└── metadata.json     # Track metadata (ID, type, status, etc.)
```

The track is also added to `conductor/tracks.md` with a link to its folder.