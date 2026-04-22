import type { Plugin } from "@opencode-ai/plugin";
import * as fs from "fs";
import * as path from "path";
import ImplementPrompt from "./prompts/conductor/implement.json" with { type: "json" };
import NewTrackPrompt from "./prompts/conductor/newTrack.json" with { type: "json" };
import RevertPrompt from "./prompts/conductor/revert.json" with { type: "json" };
import ReviewPrompt from "./prompts/conductor/review.json" with { type: "json" };
import SetupPrompt from "./prompts/conductor/setup.json" with { type: "json" };
import StatusPrompt from "./prompts/conductor/status.json" with { type: "json" };
import { 
  getFilesRecursively, 
  formatFileHierarchy, 
  isConductorSetup 
} from "./utils/workspace.js";
import {
  createSetupTool,
  createNewTrackTool,
  createImplementTool,
  createStatusTool,
  createRevertTool,
  createReviewTool,
  createCheckpointTool,
} from "./tools/commands.js";

export const MyPlugin: Plugin = async ({
  project,
  client,
  $,
  directory,
  worktree,
}) => {
  // 1. Read the agent prompt
  const agentPromptPath = path.join(import.meta.dirname, "prompts", "agent", "conductor.md");
  let agentPrompt = "";
  try {
    agentPrompt = fs.readFileSync(agentPromptPath, "utf-8");
  } catch (e) {
    console.error("[Conductor] Failed to read agent prompt");
    agentPrompt = "Specialized agent for Conductor spec-driven development.";
  }

  // List all files and folders which are in conductor subfolder (.json and .md files only)
  const conductorPath = path.join(directory, "conductor");
  let files: string[] = [];
  let fileHeirarchy = "";

  if (fs.existsSync(conductorPath)) {
    files = getFilesRecursively(conductorPath);
    fileHeirarchy = formatFileHierarchy(files, directory);
  }

  // @note determine if setup has occured within the project yet
  const setupOccurred = isConductorSetup(conductorPath);

  return {
    tool: {
      conductor_setup: createSetupTool({ project, client, $, directory, worktree }),
      conductor_new_track: createNewTrackTool({ project, client, $, directory, worktree }),
      conductor_implement: createImplementTool({ project, client, $, directory, worktree }),
      conductor_status: createStatusTool({ project, client, $, directory, worktree }),
      conductor_revert: createRevertTool({ project, client, $, directory, worktree }),
      conductor_review: createReviewTool({ project, client, $, directory, worktree }),
      conductor_checkpoint: createCheckpointTool({ project, client, $, directory, worktree }),
    },
    config: async (_config) => {
      // Register the Conductor Agent
      _config.agent = _config.agent || {};
      _config.agent["conductor"] = {
        description: "Spec-Driven Development Architect. Manages the project lifecycle using the Conductor protocol.",
        prompt: agentPrompt,
        tools: {
          conductor_setup: true,
          conductor_new_track: true,
          conductor_implement: true,
          conductor_status: true,
          conductor_revert: true,
          conductor_review: true,
          conductor_checkpoint: true,
        },
      };

      _config.command = {
        ..._config.command,
        "conductor:implement": {
          agent: "conductor",
          template: ImplementPrompt.prompt + `
            Environment Details: 
              - Directory: ${directory}
              - Conductor Setup: ${setupOccurred}
              - Current Conductor Files (Location: ${directory}/conductor)
                  File Tree:
                    ${fileHeirarchy}
          `,
          description: ImplementPrompt.description,
        },
        "conductor:newTrack": {
          agent: "conductor",
          template: NewTrackPrompt.prompt,
          description: NewTrackPrompt.description,
        },
        "conductor:revert": {
          agent: "conductor",
          template: RevertPrompt.prompt,
          description: RevertPrompt.description,
        },
        "conductor:review": {
          agent: "conductor",
          template: ReviewPrompt.prompt + `
            Environment Details: 
              - Directory: ${directory}
              - Conductor Setup: ${setupOccurred}
              - Current Conductor Files (Location: ${directory}/conductor)
                  File Tree:
                    ${fileHeirarchy}
          `,
          description: ReviewPrompt.description,
        },
        "conductor:setup": {
          agent: "conductor",
          template: SetupPrompt.prompt + `
            Environment Details: 
              - Directory: ${directory}
              - Conductor Setup: ${setupOccurred}
              - Current Conductor Files (with tracks) (${directory}/conductor)
                File Tree:
                  ${fileHeirarchy}

              **CRITICAL ENVIRONMENTAL OVERRIDE:** You are an OpenCode plugin. Use .opencodeignore or .gitignore for analysis. .gemini files are not used in this environment.
          `,
          description: SetupPrompt.description,
        },
        "conductor:status": {
          agent: "conductor",
          template: StatusPrompt.prompt + `

          
          ***Current Environment Details***: 
            - Current Working Directory: ${directory}
            - Conductor Setup Process Completed: ${setupOccurred}
            - Current Conductor Files (with tracks) (${directory}/conductor)
                File Tree:
                  ${fileHeirarchy}
        `,
          description: StatusPrompt.description,
        },
      };
    },
  };
};
