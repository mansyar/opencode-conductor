import { describe, it, expect } from "vitest";
import { MyPlugin } from "./index.js";

describe("MyPlugin entry point", () => {
  it("should export MyPlugin", () => {
    expect(MyPlugin).toBeDefined();
    expect(typeof MyPlugin).toBe("function");
  });
});
