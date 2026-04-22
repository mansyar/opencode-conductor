import { describe, it, expect, vi, beforeEach } from 'vitest';
import { type PluginInput } from '@opencode-ai/plugin';
import { createImplementTool } from './commands.js';
import { readFile } from 'fs/promises';

// Mock fs/promises
vi.mock('fs/promises', () => ({
  readFile: vi.fn(),
}));

describe('Remove OhMyOpenCode Compatibility Tests', () => {
  let mockCtx: PluginInput;
  let mockToolContext: any;
  
  beforeEach(() => {
    vi.clearAllMocks();

    mockCtx = {
      directory: '/test/project',
      isOMOActive: true, // Simulate OMO being active
    } as any;

    mockToolContext = {
      sessionID: 'test-session',
      messageID: 'test-message',
    };
  });

  it('should use manual strategy even if isOMOActive is true', async () => {
    vi.mocked(readFile).mockImplementation(async (path) => {
      if (typeof path === 'string' && path.endsWith('manual.md')) {
        return 'Manual Strategy';
      }
      if (typeof path === 'string' && path.endsWith('delegate.md')) {
        return 'Delegate Strategy';
      }
      return JSON.stringify({
        description: 'Implement',
        prompt: 'Strategy: {{strategy_section}}'
      });
    });

    const tool = createImplementTool(mockCtx);
    const result = await tool.execute({}, mockToolContext);
    
    expect(JSON.parse(result)).toEqual({ directives: 'Strategy: Manual Strategy' });
  });
});
