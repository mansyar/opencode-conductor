import { tool, type ToolDefinition } from '@opencode-ai/plugin/tool';
import { createConductorCommand } from '../utils/commandFactory.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { discoverCoverageCommand, parseCoverageOutput } from '../utils/coverage.js';
import { commitWithNote } from '../utils/git.js';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const setupCommand = createConductorCommand({
  name: 'setup.json',
  description: 'Directives lookup tool for scaffolding the project and setting up the Conductor environment',
  args: {},
});

export const newTrackCommand = createConductorCommand({
  name: 'newTrack.json',
  description: 'Directives lookup tool for planning a track, generating track-specific spec documents and updating the tracks file',
  args: {
    description: tool.schema.string().optional().describe('Brief description of the track (feature, bug fix, chore, etc.)'),
  },
  additionalContext: async (ctx, args) => {
    return {
      args: args.description || '',
    };
  },
});

export const implementCommand = createConductorCommand({
  name: 'implement.json',
  description: 'Directives lookup tool for executing the tasks defined in the specified track\'s plan',
  args: {
    track_name: tool.schema.string().optional().describe('Name or description of the track to implement'),
  },
  additionalContext: async (ctx, args) => {
    return {
      track_name: args.track_name || '',
    };
  },
});

export const statusCommand = createConductorCommand({
  name: 'status.json',
  description: 'Directives lookup tool for displaying the current progress of the project',
  args: {},
});

export const revertCommand = createConductorCommand({
  name: 'revert.json',
  description: 'Directives lookup tool for reverting previous work',
  args: {
    target: tool.schema.string().optional().describe('Target to revert (e.g., \'track <track_id>\', \'phase <phase_name>\', \'task <task_name>\')'),
  },
  additionalContext: async (ctx, args) => {
    return {
      target: args.target || '',
    };
  },
});

export const reviewCommand = createConductorCommand({
  name: 'review.json',
  description: 'Directives lookup tool for reviewing a track or uncommitted changes',
  args: {
    args: tool.schema.string().optional().describe('Specific track name or \'current\' for uncommitted changes'),
  },
  additionalContext: async (ctx, args) => {
    return {
      args: args.args || '',
    };
  },
});

export const checkpointCommand = (ctx: any) => {
  return tool({
    description: 'A programmatic system utility for Conductor to automate recording task completion via a checkpoint. It enforces quality gates (tests/coverage) and automates the Git commit/note lifecycle.',
    args: {
      task_description: tool.schema.string().describe('Brief description of the completed task'),
      verification_report: tool.schema.string().describe('Detailed summary of the changes and verification steps'),
      coverage_command: tool.schema.string().optional().describe('Optional override for the coverage command'),
    },
    async execute(args: any, context: any) {
      try {
        const projectRoot = ctx.directory;
        
        // 1. Discover Coverage Command
        const coverageCommand = args.coverage_command || discoverCoverageCommand(projectRoot);
        
        // 2. Execute Coverage
        let output: string;
        try {
          output = execSync(coverageCommand, { cwd: projectRoot }).toString();
        } catch (e: any) {
          return JSON.stringify({
            status: 'error',
            message: `Tests failed or coverage command errored: ${e.message}`,
            output: e.stdout?.toString() || e.stderr?.toString() || ''
          });
        }

        // 3. Parse Results
        const coverage = parseCoverageOutput(output);

        // 4. Enforce Gate
        if (coverage < 80) {
          return JSON.stringify({
            status: 'error',
            message: `Coverage too low (${coverage}%). Target is >80%.`,
            output
          });
        }

        // 5. Auto-Commit & Attach Git Note
        const commitSha = commitWithNote({
          message: args.task_description,
          note: args.verification_report
        });

        return JSON.stringify({
          status: 'success',
          commit_sha: commitSha,
          coverage: coverage
        });
      } catch (error: any) {
        return JSON.stringify({
          status: 'error',
          message: `Checkpoint failed: ${error.message}`
        });
      }
    },
  });
};

/**
 * Creates the Conductor Setup tool.
 * @param ctx The plugin input context.
 * @returns The tool definition for setup.
 */
export function createSetupTool(ctx: any): ToolDefinition {
  return setupCommand(ctx);
}

/**
 * Creates the Conductor New Track tool.
 * @param ctx The plugin input context.
 * @returns The tool definition for creating a new track.
 */
export function createNewTrackTool(ctx: any): ToolDefinition {
  return newTrackCommand(ctx);
}

/**
 * Creates the Conductor Implement tool.
 * @param ctx The plugin input context.
 * @returns The tool definition for track implementation.
 */
export function createImplementTool(ctx: any): ToolDefinition {
  return implementCommand(ctx);
}

/**
 * Creates the Conductor Status tool.
 * @param ctx The plugin input context.
 * @returns The tool definition for status reporting.
 */
export function createStatusTool(ctx: any): ToolDefinition {
  return statusCommand(ctx);
}

/**
 * Creates the Conductor Revert tool.
 * @param ctx The plugin input context.
 * @returns The tool definition for reverting work.
 */
export function createRevertTool(ctx: any): ToolDefinition {
  return revertCommand(ctx);
}

/**
 * Creates the Conductor Review tool.
 * @param ctx The plugin input context.
 * @returns The tool definition for reviewing changes.
 */
export function createReviewTool(ctx: any): ToolDefinition {
  return reviewCommand(ctx);
}

/**
 * Creates the Conductor Checkpoint tool.
 * @param ctx The plugin input context.
 * @returns The tool definition for task checkpointing.
 */
export function createCheckpointTool(ctx: any): ToolDefinition {
  return checkpointCommand(ctx);
}
