# Product Definition

## Initial Concept
Conductor is a specialized OpenCode plugin designed to enforce a rigorous, Context-Driven Development lifecycle. It transforms OpenCode from a reactive coding tool into a proactive project architect that follows a strict protocol to specify, plan, and implement software features and bug fixes.

## Target Users
- **OpenCode CLI Users**: Developers using the OpenCode command-line interface who need structured project management
- **Plugin Developers**: Developers building OpenCode plugins who want to follow established protocols
- **Team Leads/Architects**: Technical leads managing project workflows and development teams

## Core Goals
1. **Enforce Development Protocol**: Ensure every project follows the Context → Spec → Plan → Implement → Review lifecycle
2. **Manage Project Tracks**: Organize work into manageable units (features/bug fixes) with detailed specifications and implementation plans
3. **Integrate with OhMyOpenCode**: Work seamlessly alongside Sisyphus for multi-agent team experiences

## Key Features
- **Slash Commands**: Native commands like `/conductor:setup`, `/conductor:newTrack`, `/conductor:implement`, `/conductor:review` for frictionless project management
- **Track Management**: Create, plan, and implement tracks with automatic spec.md and plan.md generation
- **Smart Revert System**: Git-aware revert that understands logical units of work (Tracks, Phases, Tasks) instead of just raw commit hashes
- **19+ Style Templates**: Built-in support for a vast range of languages including Rust, Solidity, Zig, Julia, Kotlin, Swift, and more

## Design Principles
1. **Protocol-Driven**: Strict adherence to the Context → Spec → Plan → Implement → Review lifecycle
2. **Zero-Config Bootstrap**: Automatically installs agents and commands to your global OpenCode configuration on first run
3. **Agent Agnostic**: Commands can be invoked by any agent, giving you the freedom to choose your primary interface

## Technology Stack
- **Primary Language**: TypeScript
- **Runtime**: Node.js
- **Build Tool**: TypeScript compiler (tsc)
- **Testing Framework**: Vitest
- **Package Manager**: npm
- **Release Management**: semantic-release

## Success Metrics
- Adoption rate among OpenCode users
- Reduction in development time through structured workflows
- Improved code quality through enforced protocols
- Seamless integration with existing OpenCode ecosystem