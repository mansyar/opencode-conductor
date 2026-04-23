import { execSync, spawnSync } from "child_process";

interface CommitOptions {
  message: string;
  note: string;
}

/**
 * Stages all changes, commits with the given message, and attaches a git note.
 * Returns the commit hash.
 */
export function commitWithNote(options: CommitOptions): string {
  const { message, note } = options;

  // 1. Stage all changes
  execSync("git add .", { stdio: "pipe" });

  // 2. Commit
  const commitResult = spawnSync("git", ["commit", "-m", message], { stdio: "pipe" });
  if (commitResult.status !== 0) {
    throw new Error(`Git commit failed: ${commitResult.stderr.toString()}`);
  }

  // 3. Get the commit hash
  const hash = execSync("git log -1 --format=\"%H\"", { stdio: "pipe" }).toString().trim();

  // 4. Attach the note
  const noteResult = spawnSync("git", ["notes", "add", "-m", note, hash], { stdio: "pipe" });
  if (noteResult.status !== 0) {
    throw new Error(`Git notes add failed: ${noteResult.stderr.toString()}`);
  }

  return hash;
}
