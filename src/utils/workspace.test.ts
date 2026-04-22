import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { 
  getFilesRecursively, 
  formatFileHierarchy, 
  formatFilesForLLM, 
  isConductorSetup 
} from "./workspace.js";

vi.mock("fs");

describe("workspace utils", () => {
  const mockDir = "/mock/dir";
  const mockConductorDir = path.join(mockDir, "conductor");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getFilesRecursively", () => {
    it("should return empty array if directory does not exist", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      const results = getFilesRecursively(mockDir);
      expect(results).toEqual([]);
    });

    it("should recursively find files with matching extensions", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockImplementation((dir: any) => {
        if (dir === mockDir) return ["file1.md", "subdir"] as any;
        if (dir === path.join(mockDir, "subdir")) return ["file2.json", "file3.txt"] as any;
        return [] as any;
      });
      vi.mocked(fs.statSync).mockImplementation((filePath: any) => {
        return {
          isDirectory: () => filePath.endsWith("subdir"),
        } as any;
      });

      const results = getFilesRecursively(mockDir);
      expect(results).toContain(path.join(mockDir, "file1.md"));
      expect(results).toContain(path.join(mockDir, "subdir", "file2.json"));
      expect(results).not.toContain(path.join(mockDir, "subdir", "file3.txt"));
      expect(results.length).toBe(2);
    });
  });

  describe("formatFileHierarchy", () => {
    it("should format file list into relative hierarchy string", () => {
      const files = [
        path.join(mockDir, "conductor", "index.md"),
        path.join(mockDir, "conductor", "tracks.md")
      ];
      const result = formatFileHierarchy(files, mockDir);
      expect(result).toBe("conductor\\index.md\n                    conductor\\tracks.md");
    });
  });

  describe("formatFilesForLLM", () => {
    it("should format files and contents into XML tags", () => {
      const files = [path.join(mockDir, "test.md")];
      vi.mocked(fs.readFileSync).mockReturnValue("content");
      
      const result = formatFilesForLLM(files, mockDir);
      expect(result).toContain("<" + path.join(mockDir, "test.md") + " path=\"test.md\">");
      expect(result).toContain("content");
      expect(result).toContain("</" + path.join(mockDir, "test.md") + ">");
    });
  });

  describe("isConductorSetup", () => {
    it("should return true if setup_state.json exists", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      expect(isConductorSetup(mockConductorDir)).toBe(true);
      expect(fs.existsSync).toHaveBeenCalledWith(path.join(mockConductorDir, "setup_state.json"));
    });

    it("should return false if setup_state.json does not exist", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      expect(isConductorSetup(mockConductorDir)).toBe(false);
    });
  });
});
