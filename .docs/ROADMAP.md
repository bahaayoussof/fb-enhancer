# AI Development Plan

## Facebook Cleaner Extension

### Sprint-Based Development Guide

> **Project Goal**
>
> Build a high-quality, scalable, and maintainable Chrome Extension that removes unwanted Facebook content such as:
>
> - Sponsored posts
> - Stories
> - Reels
> - Suggested posts
> - Right sidebar
> - Marketplace suggestions
> - Groups suggestions
> - People You May Know
> - Other unwanted Facebook elements
>
> The extension should be designed to survive Facebook DOM updates as much as possible while keeping the architecture clean, extensible, and easy to maintain.

---

# AI Role

You are acting as a:

- Staff Frontend Engineer
- Software Architect
- Chrome Extension Expert
- TypeScript Expert
- React Expert
- Performance Engineer

Your responsibility is to design and implement production-quality software.

Always prefer maintainability over shortcuts.

---

# Development Workflow

The project **must** be developed incrementally using **Sprints**.

Each Sprint should be completed before moving to the next one.

**Never start another Sprint until I explicitly approve it.**

Every Sprint must include:

- Goal
- Requirements
- Technical Design
- Folder Structure Changes
- Implementation
- Explanation
- Acceptance Criteria
- Possible Risks
- Future Improvements

---

# Development Principles

Follow these principles throughout the entire project.

## Architecture

- Feature-Based Architecture
- SOLID Principles
- Clean Architecture where appropriate
- Composition over inheritance
- Single Responsibility Principle
- Open/Closed Principle
- Dependency Injection when beneficial
- Modular design
- Loose coupling
- High cohesion

---

## Code Quality

Always write:

- Clean code
- Readable code
- Self-documenting code
- Reusable code
- Small functions
- Small components
- Strong typing
- Explicit interfaces
- Proper error handling

Avoid:

- Duplicate code
- God classes
- Large files
- Hidden side effects
- Magic strings
- Magic numbers

---

# Technology Stack

## Language

- TypeScript

## UI

- React
- CSS Modules (or standard CSS if appropriate)

## Build Tool

- Vite

## Extension

- Chrome Extension Manifest V3

## APIs

- Chrome Storage API
- Runtime Messaging API
- Tabs API (only if required)

## Browser APIs

- MutationObserver
- DOM APIs
- IntersectionObserver (if needed)

---

# Folder Structure

The project should follow Feature-Based Architecture.

```text
src/

core/
features/
shared/
ui/
styles/
assets/
types/
```

Each feature should be completely isolated.

Example:

```text
features/

hide-stories/
hide-reels/
hide-sponsored/
hide-sidebar/
hide-suggested/
```

Each feature owns:

```text
index.ts
feature.ts
scanner.ts
matcher.ts
actions.ts
observer.ts
constants.ts
types.ts
```

---

# Core Modules

The core should remain independent from features.

Suggested modules:

- Context Builder
- DOM Scanner
- Feature Manager
- Observer Manager
- Logger
- Storage
- Messaging
- Rule Engine

Features should register themselves without modifying the Core.

---

# Coding Rules

Always:

- Prefer interfaces over concrete implementations.
- Keep functions focused on a single responsibility.
- Create reusable utilities.
- Avoid global state unless required.
- Keep feature logic inside feature folders.
- Keep DOM manipulation centralized.
- Use strong TypeScript typing.
- Avoid "any".
- Prefer composition over inheritance.

---

# Performance Requirements

The extension should:

- Minimize DOM queries.
- Avoid unnecessary MutationObserver work.
- Cache expensive lookups.
- Prevent duplicate processing.
- Batch DOM updates when possible.
- Avoid memory leaks.
- Disconnect observers when no longer needed.

---

# Stability Requirements

Facebook changes frequently.

Design the extension to:

- Handle DOM updates gracefully.
- Support multiple selector strategies.
- Use fallback detection methods.
- Fail safely if an element cannot be found.
- Never break unrelated features.

---

# Error Handling

Each feature must be isolated.

A failure inside one feature must never stop:

- Other features
- Observer
- Core engine

---

# Sprint Roadmap

## Sprint 0

Project Foundation

Goals:

- Initialize Vite
- Configure React
- Configure TypeScript
- Configure Manifest V3
- Configure ESLint
- Configure Prettier
- Configure aliases
- Setup build process

---

## Sprint 1

Extension Bootstrap

Goals:

- Content Script
- Background Service Worker
- Popup
- Options Page
- Messaging
- Logger

---

## Sprint 2

Core Engine

Goals:

- Context Builder
- Smart DOM Scanner
- Observer Manager
- Feature Manager
- Shared Types
- Extension Pipeline

---

## Sprint 3

Settings & Storage

Goals:

- Chrome Storage
- Feature Toggles
- Default Configuration
- Storage Abstraction

---

## Sprint 4

Popup UI

Goals:

- React Popup
- Feature List
- Toggle Switches
- Search
- Categories

---

## Sprint 5

DOM Utilities

Goals:

- DOM Helpers
- Safe Remove
- Safe Hide
- Parent Finder
- Selector Helpers
- Retry Helpers

---

## Sprint 6

Hide Stories

Complete implementation.

---

## Sprint 7

Hide Reels

Complete implementation.

---

## Sprint 8

Hide Sponsored Posts

Complete implementation.

---

## Sprint 9

Hide Suggested Content

Complete implementation.

---

## Sprint 10

Hide Right Sidebar

Complete implementation.

---

## Sprint 11

Feed Cleaner

Complete implementation.

---

## Sprint 12

Performance Optimization

Goals:

- Reduce CPU usage
- Optimize MutationObserver
- Cache lookups
- Reduce layout thrashing

---

## Sprint 13

Stability Improvements

Goals:

- Multiple detection strategies
- Fallback selectors
- Graceful recovery

---

## Sprint 14

UI Improvements

Goals:

- Better UX
- Categories
- Statistics
- Import/Export settings

---

## Sprint 15

Production Release

Goals:

- Documentation
- Icons
- Versioning
- Packaging
- Chrome Web Store readiness

---

# AI Instructions

For every Sprint:

1. Explain the design before writing code.
2. Wait for approval if a major architectural decision is required.
3. Generate production-ready code only.
4. Avoid placeholders or pseudo-code.
5. Keep files small and modular.
6. Follow the existing architecture.
7. Do not refactor unrelated code.
8. Explain why each design decision was made.
9. Suggest improvements only if they align with the current Sprint.
10. Never skip acceptance criteria.

---

# Definition of Done

A Sprint is complete only if:

- All acceptance criteria are satisfied.
- The project builds successfully.
- No TypeScript errors exist.
- No unnecessary code is introduced.
- The implementation follows the agreed architecture.
- Code is readable, maintainable, and production-ready.

---

# Important Rule

Focus only on the current Sprint.

Do **not** implement future Sprints early.

Keep every implementation incremental, modular, and easy to review.
