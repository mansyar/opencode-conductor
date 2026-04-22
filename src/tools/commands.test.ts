import { describe, it, expect, vi, beforeEach } from "vitest"
import { type PluginInput } from "@opencode-ai/plugin"
import {
  createSetupTool,
  createNewTrackTool,
  createImplementTool,
  createStatusTool,
  createRevertTool,
  createCheckpointTool,
} from "./commands.js"
import { readFile } from "fs/promises"
import * as coverageUtils from "../utils/coverage.js"
import * as gitUtils from "../utils/git.js"
import { execSync } from "child_process"

// Mock fs/promises
vi.mock("fs/promises", () => ({
  readFile: vi.fn(),
}))

vi.mock("../utils/coverage.js")
vi.mock("../utils/git.js")
vi.mock("child_process")

describe("Command Tools", () => {
  let mockCtx: PluginInput
  let mockToolContext: any
  
  beforeEach(() => {
    vi.clearAllMocks()

    mockCtx = {
      directory: "/test/project",
      isOMOActive: false,
    } as any

    mockToolContext = {
      sessionID: "test-session",
      messageID: "test-message",
    }

    // Default mocks - using JSON format
    vi.mocked(readFile).mockResolvedValue(JSON.stringify({
      description: "Test command",
      prompt: "Test prompt content"
    }))
  })

  describe("createSetupTool", () => {
    it("should create a tool with correct description", () => {
      const tool = createSetupTool(mockCtx)
      expect(tool.description).toBe(
        "Directives lookup tool for scaffolding the project and setting up the Conductor environment",
      )
    })

    it("should return directives JSON string when executed", async () => {
      vi.mocked(readFile).mockResolvedValue(JSON.stringify({
        description: "Setup",
        prompt: "Setup Prompt"
      }))
      const tool = createSetupTool(mockCtx)
      const result = await tool.execute({}, mockToolContext)
      expect(JSON.parse(result)).toEqual({ directives: "Setup Prompt" })
    })
  })

  describe("createNewTrackTool", () => {
    it("should create a tool with correct description", () => {
        const tool = createNewTrackTool(mockCtx)
        expect(tool.description).toBe(
          "Directives lookup tool for planning a track, generating track-specific spec documents and updating the tracks file",
        )
      })

    it("should have optional description argument", () => {
      const tool = createNewTrackTool(mockCtx)
      expect(tool.args).toHaveProperty("description")
    })

    it("should replace description in directives", async () => {
      vi.mocked(readFile).mockResolvedValue(JSON.stringify({
        description: "New Track",
        prompt: "Track description: {{args}}"
      }))
      const tool = createNewTrackTool(mockCtx)
      const result = await tool.execute({ description: "Login feature" }, mockToolContext)
      expect(JSON.parse(result)).toEqual({ directives: "Track description: Login feature" })
    })
  })

  describe("createImplementTool", () => {
    it("should create a tool with correct description", () => {
        const tool = createImplementTool(mockCtx)
        expect(tool.description).toBe(
          "Directives lookup tool for executing the tasks defined in the specified track's plan",
        )
      })

    it("should have optional track_name argument", () => {
      const tool = createImplementTool(mockCtx)
      expect(tool.args).toHaveProperty("track_name")
    })

    it("should replace track_name in directives", async () => {
      vi.mocked(readFile).mockResolvedValue(JSON.stringify({
        description: "Implement",
        prompt: "Track: {{track_name}}"
      }))
      const tool = createImplementTool(mockCtx)
      const result = await tool.execute({ track_name: "auth-track" }, mockToolContext)
      expect(JSON.parse(result)).toEqual({ directives: "Track: auth-track" })
    })
  })

  describe("createStatusTool", () => {
    it("should create a tool with correct description", () => {
        const tool = createStatusTool(mockCtx)
        expect(tool.description).toBe(
          "Directives lookup tool for displaying the current progress of the project",
        )
      })

    it("should execute and return directives", async () => {
      vi.mocked(readFile).mockResolvedValue(JSON.stringify({
        description: "Status",
        prompt: "Status Prompt"
      }))
      const tool = createStatusTool(mockCtx)
      const result = await tool.execute({}, mockToolContext)
      expect(JSON.parse(result)).toEqual({ directives: "Status Prompt" })
    })
  })

  describe("createRevertTool", () => {
    it("should create a tool with correct description", () => {
        const tool = createRevertTool(mockCtx)
        expect(tool.description).toBe(
          "Directives lookup tool for reverting previous work",
        )
      })

    it("should replace target in directives", async () => {
      vi.mocked(readFile).mockResolvedValue(JSON.stringify({
        description: "Revert",
        prompt: "Target: {{target}}"
      }))
      const tool = createRevertTool(mockCtx)
      const result = await tool.execute({ target: "track 1" }, mockToolContext)
      expect(JSON.parse(result)).toEqual({ directives: "Target: track 1" })
    })
  })

  describe("createCheckpointTool", () => {
    it("should create a tool with correct description", () => {
      const tool = createCheckpointTool(mockCtx)
      expect(tool.description).toContain("programmatic system utility")
      expect(tool.description).toContain("checkpoint")
    })

    it("should have required arguments", () => {
      const tool = createCheckpointTool(mockCtx)
      expect(tool.args).toHaveProperty("task_description")
      expect(tool.args).toHaveProperty("verification_report")
      expect(tool.args).toHaveProperty("coverage_command")
    })

    it("should execute successfully if coverage is high enough", async () => {
      vi.mocked(coverageUtils.discoverCoverageCommand).mockReturnValue("npm test -- --coverage")
      vi.mocked(execSync).mockReturnValue(Buffer.from("All files | 85.00 | ..."))
      vi.mocked(coverageUtils.parseCoverageOutput).mockReturnValue(85.00)
      vi.mocked(gitUtils.commitWithNote).mockReturnValue("mock_sha")

      const tool = createCheckpointTool(mockCtx)
      const result = await tool.execute({
        task_description: "Done",
        verification_report: "Report"
      }, mockToolContext)

      expect(JSON.parse(result)).toEqual({
        status: "success",
        commit_sha: "mock_sha",
        coverage: 85.00
      })
    })

    it("should fail if coverage is too low", async () => {
      vi.mocked(coverageUtils.discoverCoverageCommand).mockReturnValue("npm test -- --coverage")
      vi.mocked(execSync).mockReturnValue(Buffer.from("All files | 75.00 | ..."))
      vi.mocked(coverageUtils.parseCoverageOutput).mockReturnValue(75.00)

      const tool = createCheckpointTool(mockCtx)
      const result = await tool.execute({
        task_description: "Done",
        verification_report: "Report"
      }, mockToolContext)

      expect(JSON.parse(result).status).toBe("error")
      expect(JSON.parse(result).message).toContain("Coverage too low (75%)")
    })
  })

  describe("Error Handling", () => {
    it("should return error in directives if readFile fails", async () => {
      vi.mocked(readFile).mockRejectedValue(new Error("File not found"))
      const tool = createSetupTool(mockCtx)
      const result = await tool.execute({}, mockToolContext)
      expect(JSON.parse(result).directives).toContain("SYSTEM ERROR: Failed to load prompt")
    })
  })

  describe("Prompt Replacement", () => {
    it("should replace standard variables in directives", async () => {
      vi.mocked(readFile).mockResolvedValue(JSON.stringify({
        description: "Test",
        prompt: "Templates: {{templatesDir}}"
      }))
      const tool = createNewTrackTool(mockCtx)
      const result = await tool.execute({}, mockToolContext)
      
      expect(JSON.parse(result).directives).toContain("Templates:")
    })
  })
})