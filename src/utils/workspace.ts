import * as fs from "fs";
import * as path from "path";

/**
 * Recursively gets all files in a directory that match certain extensions.
 * @param dir The directory to search.
 * @param extensions Array of file extensions to include (e.g., [".json", ".md"]).
 * @returns Array of absolute file paths.
 */
export const getFilesRecursively = (dir: string, extensions: string[] = [".json", ".md"]): string[] => {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath, extensions));
    } else {
      if (extensions.some(ext => filePath.endsWith(ext))) {
        results.push(filePath);
      }
    }
  }
  return results;
};

/**
 * Formats a list of files into a hierarchy string relative to a base directory.
 * @param files Array of absolute file paths.
 * @param baseDir The base directory for relative paths.
 * @returns A formatted hierarchy string.
 */
export const formatFileHierarchy = (files: string[], baseDir: string): string => {
  return files
    .map((f) => path.relative(baseDir, f))
    .join("\n                    ");
};

/**
 * Formats a list of files and their contents into a string for LLM context.
 * @param files Array of absolute file paths.
 * @param baseDir The base directory for relative paths.
 * @returns A formatted string containing file contents wrapped in XML tags.
 */
export const formatFilesForLLM = (files: string[], baseDir: string): string => {
  return files
    .map((f) => {
      const content = fs.readFileSync(f, "utf-8");
      const relPath = path.relative(baseDir, f);
      return `<${f} path="${relPath}">\n${content}\n</${f}>`;
    })
    .join("\n\n");
};

/**
 * Checks if Conductor has been set up in the project.
 * @param conductorPath The path to the conductor directory.
 * @returns True if setup_state.json exists, false otherwise.
 */
export const isConductorSetup = (conductorPath: string): boolean => {
  const setupStatePath = path.join(conductorPath, "setup_state.json");
  return fs.existsSync(setupStatePath);
};
