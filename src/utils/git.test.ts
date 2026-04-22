import { describe, it, expect, vi, beforeEach } from "vitest";
import { commitWithNote } from "./git.js";
import { execSync } from "child_process";

vi.mock("child_process");

describe("git utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("commitWithNote", () => {
    it("should stage, commit, and add a note", () => {
      vi.mocked(execSync).mockReturnValue(Buffer.from("mock_hash\n"));

      const hash = commitWithNote({
        message: "feat: Test commit",
        note: "Verification report details"
      });

      expect(execSync).toHaveBeenCalledWith("git add .", expect.anything());
      expect(execSync).toHaveBeenCalledWith("git commit -m \"feat: Test commit\"", expect.anything());
      expect(execSync).toHaveBeenCalledWith("git log -1 --format=\"%H\"", expect.anything());
      expect(execSync).toHaveBeenCalledWith("git notes add -m \"Verification report details\" mock_hash", expect.anything());
      expect(hash).toBe("mock_hash");
    });

    it("should throw error if git command fails", () => {
      vi.mocked(execSync).mockImplementation(() => {
        throw new Error("Git error");
      });

      expect(() => commitWithNote({
        message: "feat: Test commit",
        note: "Note"
      })).toThrow("Git error");
    });
  });
});
