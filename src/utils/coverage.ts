import * as fs from "fs";
import * as path from "path";

/**
 * Discovers the coverage command from package.json or returns a default.
 */
export function discoverCoverageCommand(projectRoot: string): string {
  const packageJsonPath = path.join(projectRoot, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      if (packageJson.scripts && packageJson.scripts.test) {
        // Basic detection: if test script exists, assume we can run it with --coverage
        return "npm test -- --coverage";
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
  return "npm test -- --coverage";
}

/**
 * Parses the coverage output to extract the statement coverage percentage.
 * Currently supports Vitest coverage table output.
 */
export function parseCoverageOutput(output: string): number {
  // Look for the "All files" row in the coverage table
  // Format: All files | % Stmt | % Branch | % Funcs | % Lines
  // Example: All files    |    85.71 |       75.00 |   88.23 |     85.71 |
  const lines = output.split("\n");
  for (const line of lines) {
    if (line.includes("All files")) {
      const parts = line.split("|").map(p => p.trim());
      if (parts.length >= 2) {
        const coverageStr = parts[1];
        const coverage = parseFloat(coverageStr);
        if (!isNaN(coverage)) {
          return coverage;
        }
      }
    }
  }
  throw new Error("Could not parse coverage output");
}
