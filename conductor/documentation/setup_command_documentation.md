# `/conductor:setup` Command Documentation

## Description
The `/conductor:setup` command initializes the Conductor directory and project "Constitution" for a new or existing project. This command sets up the foundational structure needed for Conductor to manage your project's development lifecycle.

The setup process includes:
1. **Project Discovery**: Analyzes the current directory to determine if this is a new or existing project
2. **Product Definition**: Collaboratively defines the product's vision, design guidelines, and technology stack
3. **Configuration**: Selects appropriate code style guides and customizes your development workflow
4. **Track Generation**: Defines the initial track (a high-level unit of work like a feature or bug fix) and automatically generates a detailed plan to start development

## Syntax
```
/conductor:setup
```

## Parameters
This command does not accept any parameters.

## Usage Examples

### Basic Setup for New Project
```
/conductor:setup
```
This will guide you through the complete setup process for a new project. The command will:
1. Detect that this is a new project (Greenfield)
2. Ask for your project goal (e.g., "A mobile app for tracking expenses")
3. Guide you through defining the product vision and technology stack
4. Help you select appropriate code style guides
5. Create the initial track with a detailed implementation plan

### Resuming Setup After Interruption
```
/conductor:setup
```
If the setup process was interrupted, running the command again will resume from the last completed step. The setup state is tracked in `conductor/setup_state.json`.

## Environmental Overrides
When running as an OpenCode plugin, Conductor applies the following environmental rules:
- **Ignore Files**: Uses `.opencodeignore` or `.gitignore` for analysis. `.gemini` files are not used in this environment.
- **Model Selection**: Always selects the "flash" model for all tasks to ensure speed and efficiency.

### Setup for Existing (Brownfield) Project
```
/conductor:setup
```
For existing projects, the command will:
1. Detect existing project structure (Git repository, dependency files, source code)
2. Analyze the project to infer the technology stack
3. Ask for confirmation of the detected stack
4. Document the existing setup in the Conductor files
5. Create the initial track based on the project's current state

### Interactive Setup Example
```
/conductor:setup
```
When you run this command, you'll see an interactive dialogue like:

**Welcome to Conductor. I will guide you through the following steps to set up your project:**
1. **Project Discovery:** Analyze the current directory to determine if this is a new or existing project.
2. **Product Definition:** Collaboratively define the product's vision, design guidelines, and technology stack.
3. **Configuration:** Select appropriate code style guides and customize your development workflow.
4. **Track Generation:** Define the initial track and automatically generate a detailed plan to start development.

**Let's get started!**

## Expected Output
Upon successful execution, you should see:
1. A welcome message with an overview of the setup process
2. Step-by-step guidance through project discovery, product definition, configuration, and track generation
3. Confirmation that the Conductor environment has been initialized
4. Instructions for next steps (creating your first track or implementing existing tracks)

## Common Errors

### Error: "Conductor is not set up"
**Cause**: This error occurs when you try to use Conductor commands before running `/conductor:setup`.

**Solution**: Run `/conductor:setup` to initialize the Conductor environment for your project.

### Error: Permission denied
**Cause**: Insufficient file permissions to create or modify files in the project directory.

**Solution**: Check file permissions and ensure you have write access to the project directory. On Unix/Linux systems, you may need to use `sudo` or adjust directory permissions.

### Error: Git repository has uncommitted changes
**Cause**: The setup process detected uncommitted changes in your Git repository.

**Solution**: Commit or stash your changes before running `/conductor:setup`. This ensures that Conductor's modifications are tracked properly.

## Troubleshooting

### Setup process is stuck or frozen
1. Check if there are any background processes interfering
2. Try running the command again - Conductor supports resuming from the last completed step
3. Check the `conductor/setup_state.json` file to see the current step
4. If the issue persists, check the OpenCode logs for any error messages

### Setup completes but commands don't work
1. Verify that the `conductor/` directory was created in your project root
2. Check that all required files (`product.md`, `tech-stack.md`, `workflow.md`) exist in the `conductor/` directory
3. Try running `/conductor:status` to verify the setup
4. Ensure you have the latest version of the Conductor plugin

### Brownfield project detection issues
1. Ensure your project has a `.git` directory or dependency manifest files
2. Check that source code directories (`src/`, `app/`, `lib/`) exist and contain code files
3. Verify that the project is not classified as Greenfield by mistake
4. If detection is incorrect, you can manually classify by running the setup in a clean directory

### Permission errors during setup
1. Check file permissions on your project directory
2. On Unix/Linux, use `ls -la` to check permissions
3. On Windows, check folder properties and security settings
4. Try running OpenCode with administrator privileges if needed

### Setup state file corruption
1. Check if `conductor/setup_state.json` exists and is valid JSON
2. If corrupted, delete the file and run `/conductor:setup` again
3. The setup will restart from the beginning

## Related Commands
- `/conductor:newTrack` - Create a new track after setup is complete
- `/conductor:status` - Check project status and active tracks
- `/conductor:implement` - Start implementing tasks from your tracks

## Best Practices
1. Run `/conductor:setup` at the beginning of any new project
2. Complete the entire setup process before creating tracks
3. Follow the prompts carefully to define your product vision and technology stack
4. Commit the generated `conductor/` directory to version control