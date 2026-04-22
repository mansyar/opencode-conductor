import { describe, it, expect, vi, beforeEach } from "vitest";
import { MyPlugin } from "./index.js";
import * as fs from "fs";
import * as path from "path";

vi.mock("fs");

describe("MyPlugin entry point", () => {
  const mockDirectory = "/mock/project";
  const mockInput: any = {
    project: {},
    client: {},
    $: vi.fn(),
    directory: mockDirectory,
    worktree: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue("mock prompt");
    vi.mocked(fs.readdirSync).mockReturnValue([] as any);
  });

  it("should export MyPlugin", () => {
    expect(MyPlugin).toBeDefined();
    expect(typeof MyPlugin).toBe("function");
  });

  it("should register conductor agent and commands", async () => {
    const pluginInstance = await MyPlugin(mockInput);
    const mockConfig: any = {};
    
    await pluginInstance.config(mockConfig);

    expect(mockConfig.agent).toHaveProperty("conductor");
    expect(mockConfig.agent.conductor.description).toContain("Spec-Driven Development Architect");
    
    expect(mockConfig.command).toHaveProperty("conductor:implement");
    expect(mockConfig.command).toHaveProperty("conductor:setup");
    expect(mockConfig.command).toHaveProperty("conductor:status");
  });
});
