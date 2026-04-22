import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "fs";
import { discoverCoverageCommand, parseCoverageOutput } from "./coverage.js";

vi.mock("fs");

describe("coverage utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("discoverCoverageCommand", () => {
    it("should discover vitest coverage command from package.json", () => {
      const mockPackageJson = JSON.stringify({
        scripts: {
          test: "vitest run"
        }
      });
      vi.mocked(fs.readFileSync).mockReturnValue(mockPackageJson);
      vi.mocked(fs.existsSync).mockReturnValue(true);

      const command = discoverCoverageCommand("/mock/dir");
      expect(command).toBe("npm test -- --coverage");
    });

    it("should return default command if no package.json found", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      const command = discoverCoverageCommand("/mock/dir");
      expect(command).toBe("npm test -- --coverage"); // Default fallback
    });
  });

  describe("parseCoverageOutput", () => {
    it("should parse vitest coverage summary table", () => {
      const output = `
 % Statements | % Branch | % Functions | % Lines | Uncovered Line #s 
--------------|----------|-------------|---------|-------------------
 All files    |    85.71 |       75.00 |   88.23 |     85.71 |                   
      `;
      const coverage = parseCoverageOutput(output);
      expect(coverage).toBe(85.71);
    });

    it("should parse vitest coverage with zero coverage", () => {
      const output = `
 % Statements | % Branch | % Functions | % Lines | Uncovered Line #s 
--------------|----------|-------------|---------|-------------------
 All files    |     0.00 |        0.00 |    0.00 |      0.00 |                   
      `;
      const coverage = parseCoverageOutput(output);
      expect(coverage).toBe(0);
    });

    it("should throw error if coverage cannot be parsed", () => {
      const output = "Random text with no coverage info";
      expect(() => parseCoverageOutput(output)).toThrow("Could not parse coverage output");
    });
  });
});
