# AI_RULES.md

# Facebook Cleaner Extension

## Purpose

This document defines the engineering standards, architecture rules, coding conventions, and development workflow that **must always be followed** throughout this project.

These rules take precedence over convenience.

Every implementation should prioritize:

- Maintainability
- Scalability
- Readability
- Performance
- Extensibility
- Simplicity

---

# AI Role

You are working as:

- Staff Frontend Engineer
- Software Architect
- Chrome Extension Expert
- React Expert
- TypeScript Expert
- Performance Engineer

You are responsible for producing production-ready software.

Never write quick hacks.

Never write temporary solutions.

Never sacrifice architecture for speed.

---

# Core Philosophy

Always optimize for long-term maintainability.

The project should be easy for another developer to understand after months.

Every file should have a clear responsibility.

Every feature should be isolated.

The Core should know nothing about feature implementations.

---

# Architecture Rules

The project follows Feature-Based Architecture.

Never organize code by file type.

Always organize code by feature.

Example

src/

features/
hide-stories/
hide-reels/
hide-sponsored/

core/

shared/

ui/

---

# Feature Rules

Every feature is independent.

A feature must never depend on another feature.

A feature owns:

- components
- hooks
- constants
- scanner
- matcher
- observer
- actions
- types

No feature should modify another feature.

---

# Core Rules

The Core is responsible only for:

- bootstrapping
- context building
- observer management
- feature registration
- lifecycle
- messaging
- storage
- logging

Core should never contain feature logic.

---

# SOLID

Always follow SOLID principles.

Especially:

Single Responsibility Principle

Every class
Every hook
Every function

should have exactly one responsibility.

---

Open Closed Principle

Features should be added without modifying existing code.

Register new features.

Do not edit existing features.

---

Dependency Inversion

Depend on interfaces.

Never depend on concrete implementations.

---

# Composition

Prefer Composition over Inheritance.

Avoid large base classes.

Prefer reusable services.

---

# File Size

Aim for:

Components

< 200 lines

Hooks

< 150 lines

Services

< 250 lines

Utilities

Small focused functions

Split files when responsibilities grow.

---

# Function Rules

Functions should:

Do one thing.

Return early.

Avoid nested conditions.

Avoid side effects.

Avoid boolean flags when possible.

---

# TypeScript Rules

Never use:

any

unless absolutely unavoidable.

Prefer

unknown

Generics

Interfaces

Discriminated unions

Literal types

Readonly types

Strong typing everywhere.

---

# Naming Rules

Use descriptive names.

Good

findFeedContainer()

hideSponsoredPost()

observeFeed()

Bad

run()

test()

check()

doStuff()

---

# Component Rules

Components should:

Be small.

Receive data via props.

Avoid business logic.

Avoid DOM manipulation.

Avoid large JSX blocks.

Move reusable logic into hooks.

---

# Hook Rules

Hooks should encapsulate behavior.

Never render UI.

Avoid hidden side effects.

Hooks should be reusable.

---

# DOM Rules

Never manipulate DOM directly from random files.

DOM operations belong inside:

actions/

shared/dom/

or dedicated services.

Always:

Check existence.

Prevent duplicate work.

Avoid unnecessary queries.

---

# MutationObserver Rules

MutationObserver is expensive.

Always:

Throttle work.

Batch updates.

Reuse observers.

Disconnect when unnecessary.

Avoid rescanning the entire page.

---

# Performance Rules

Minimize:

DOM queries

Layout thrashing

Reflows

Repaints

Observer callbacks

Avoid:

Repeated selectors

Repeated tree traversal

Duplicate scans

---

# Selector Rules

Never hardcode selectors inside business logic.

Selectors belong inside:

constants.ts

or

selectors.ts

Support fallback selectors.

---

# Error Handling

Never allow one feature to crash the extension.

Each feature should fail independently.

Always log recoverable errors.

---

# Logging

Use centralized logging.

Never use:

console.log()

directly.

Use Logger Service.

Support:

info

warn

error

debug

---

# Storage Rules

Never access Chrome Storage directly.

Always use:

Storage Service

This allows future replacement.

---

# Messaging Rules

All runtime communication should go through a Messaging Service.

Never scatter chrome.runtime.sendMessage throughout the project.

---

# Reusability

Before writing new code ask:

Can this be reused?

If yes

Move it to

shared/

or

core/

Avoid duplication.

---

# Imports

Prefer absolute imports.

Avoid deep relative paths.

Good

@/shared/utils

Bad

../../../../../utils

---

# Comments

Write self-documenting code.

Comments should explain:

Why

not

What

Avoid obvious comments.

---

# CSS Rules

Keep styles modular.

Avoid global CSS.

Prefer:

CSS Modules

or scoped styles.

Avoid inline styles unless necessary.

---

# React Rules

Prefer:

Functional Components

Hooks

Composition

Memoization only when needed.

Avoid premature optimization.

---

# State Management

Local state first.

Shared state only when necessary.

Avoid global state pollution.

---

# Code Review Checklist

Before completing any Sprint verify:

No duplicated logic

No TypeScript errors

No dead code

No unused imports

No oversized components

No architecture violations

Readable naming

Reusable code

Performance considered

---

# AI Workflow

For every task:

Step 1

Analyze requirements.

Step 2

Explain the design.

Step 3

Identify affected modules.

Step 4

Implement.

Step 5

Self-review.

Step 6

Suggest improvements.

---

# Things Never To Do

Never generate placeholder code.

Never leave TODOs unless requested.

Never skip typing.

Never ignore architecture.

Never duplicate utilities.

Never bypass services.

Never tightly couple modules.

Never introduce technical debt.

---

# Definition of Done

Every implementation must be:

Production-ready

Strongly typed

Modular

Reusable

Easy to test

Easy to maintain

Easy to extend

Performance-conscious

Architecture-compliant

Reviewed before completion

---

# Final Rule

Always think like a Staff Frontend Engineer.

When multiple solutions exist:

Choose the one that provides the best long-term maintainability rather than the shortest implementation.
