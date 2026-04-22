import { describe, it, expect } from "vitest"
import { readFileSync, readdirSync } from "fs"
import { join } from "path"

const PROMPTS_DIR = "src/prompts/conductor/"

describe("Prompt Files Validation", () => {
  const promptFiles = readdirSync(PROMPTS_DIR).filter(file => file.endsWith(".json"))

  it.each(promptFiles)("should be valid JSON in %s", (file) => {
    const filePath = join(PROMPTS_DIR, file)
    const content = readFileSync(filePath, "utf-8")
    expect(() => JSON.parse(content)).not.toThrow()
  })

  it.each(promptFiles)("should not contain 'ask_user' in %s", (file) => {
    const filePath = join(PROMPTS_DIR, file)
    const content = readFileSync(filePath, "utf-8")
    expect(content).not.toContain("ask_user")
  })

  it.each(promptFiles)("should contain 'question' tool in %s", (file) => {
    const filePath = join(PROMPTS_DIR, file)
    const content = readFileSync(filePath, "utf-8")
    expect(content).toContain("question")
  })

  it.each(promptFiles)("should contain instructions about not putting long paragraphs in 'question' tool in %s", (file) => {
    const filePath = join(PROMPTS_DIR, file)
    const content = readFileSync(filePath, "utf-8")
    // Looking for a specific phrase that we will add
    expect(content).toContain("do not put long explanatory paragraphs inside the tool call")
  })
})
