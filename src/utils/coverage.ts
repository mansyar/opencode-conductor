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
 * Parses the coverage threshold from conductor/workflow.md.
 * Defaults to 80 if not found.
 */
export function getCoverageThreshold(projectRoot: string): number {
  const workflowPath = path.join(projectRoot, "conductor", "workflow.md");
  if (fs.existsSync(workflowPath)) {
    try {
      const content = fs.readFileSync(workflowPath, "utf-8");
      // Look for patterns like ">80%", "at least 80%", etc.
      // Specifically target the "High Code Coverage" principle or Quality Gates
      const match = content.match(/>(\d+)%/);
      if (match && match[1]) {
        return parseInt(match[1], 10);
      }
    } catch (e) {
      // Ignore errors
    }
  }
  return 80; // Default fallback
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
