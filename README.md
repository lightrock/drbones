# PMP AI Project Skeleton

AI-vendor-agnostic project memory for AI-assisted development.

This repository is a GitHub template for projects that need more than prompts, chats, and generated code.

It gives humans and AI systems a shared project memory: workorders, intent records, architecture cognition, break words, full gates, examples, and repo-grounded operating discipline.

The point is simple:

```text
Do not keep the real project living only in chat.
Put the project memory in the repository.
```

## Use this template

1. Click **Use this template** on GitHub.
2. Create a new repository for your project.
3. Treat that new repository as the durable project memory for the work.
4. Read `README.md`, `AGENTS.md`, and the `workorders/` guidance in the new project.
5. Use workorders for substantial or process-sensitive tasks.

The template path is the clean first path. Future versions may support cleaner ways to splice this pattern into existing repositories.

## What this is

PMP is a project-management skeleton for AI-assisted work.

It is not an app framework.

It is not a deployment scaffold.

It is not a vendor-specific prompt pack.

It is a repository pattern for making AI-assisted projects more durable, inspectable, and less stupid.

The repository becomes the shared operating substrate. A human may use ChatGPT, Codex, Copilot, Claude, Gemini, local models, contractor tooling, or future AI systems, but the project memory, workorders, intent records, checks, and architecture doctrine should live in the repo instead of being trapped inside one vendor's chat window.

## Relationship to AI coding tools

PMP is not another AI coding tool.

PMP is the repo-native operating discipline that makes AI coding tools interchangeable.

AI coding tools still matter. They provide editors, terminals, file access, runtime environments, model access, task orchestration, and workflow polish.

PMP does not replace those tools.

PMP gives those tools a durable project memory and task-contract layer to work against.

A prompt wrapper, chat memory feature, agent mode, IDE panel, or proprietary project notebook is not enough by itself. The repo should contain the durable operating memory. The workorder should be the task contract. The AI vendor should be replaceable. The chat window should be disposable.

The useful discipline is:

```text
intent captured
scope bounded
constraints preserved
executor instructed
checks required
completion tied back to source intent
```

In that model, tools such as Codex, Roo Code, Cursor, Copilot, Claude, ChatGPT, Gemini, local agents, and future systems are executors or assistants. PMP is the portable project memory and operating discipline they consume.

## Core idea

Human-readable documentation still matters.

But for AI-assisted projects, human docs are no longer enough.

AI-readable architecture cognition becomes the operating substrate.

Human-facing documentation becomes a view, explanation, and audit artifact generated from that substrate.

Humans remain in authority.

The repo helps the AI know what it is doing before it generates, connects, exposes, modifies, or merges anything.

## Foreground AI quickstart

A foreground AI is the planning and intent-capture assistant.

An executor AI is the implementation assistant.

For example: a human may talk to a foreground AI to clarify intent and create a workorder, then hand that workorder to an executor AI to perform the bounded change.

When you start a new chat or tab, or before substantial work, paste this into your foreground AI chat:

```text
You are the foreground AI for this PMP-style repository.

Your job is not to produce word salad.

Your job is to help the human go from A to B with direction, purpose, constraints, and durable project memory.

Before doing substantial work or continuing in a new chat/tab:
1. Inspect the current repository state.
2. Read README.md and AGENTS.md.
3. Read existing workorders, handoffs, lessons learned, and doctrine files if they exist.
4. Treat current repo state as stronger than chat memory.
5. Identify the lane: doctrine, proposal concept, implementation, workorder, demo artifact, README/docs, architecture correction, release/stabilization, or conflict resolution.
6. Identify the current base: file path, pasted text, commit, screenshot, behavior, issue, PR, or workorder.
7. Identify the target: what B should look like.
8. Identify constraints: what must not be implied, broken, expanded, or silently changed.
9. Check whether the next move belongs in foreground chat or should become a workorder for an executor.
10. If the work needs many file edits, repeated repo mutations, terminal access, test runs, debugging, or behavior verification in a real environment, stop and create a workorder instead of trying to perform an implementation chain from chat.
11. When creating a workorder, include required checks, keep-working-until-checks-pass governance, completion-note requirements, and lessons-learned guidance.
12. Keep copy/paste prompts clean and self-contained. Do not put assistant-side comments, citations, placeholders, or explanatory text inside a block the user needs to paste into a coding agent, shell, or source file.
13. Do not accidentally switch into image, slide, document, or artifact generation unless the human explicitly asks for that output type.
14. Produce the smallest useful concrete output.

Default response shape:
Current state:
  A

Target:
  B

Constraint:
  Do not imply/break/expand C

Foreground/executor decision:
  This is safe to handle here OR this should become a workorder because E

Next move:
  patch/create/commit/workorder D
```

## Core concepts

### Workorders

A workorder is a durable task contract.

It is not a chat transcript.

It explains what the next human, AI assistant, coding agent, or review process is supposed to do.

Use workorders when intent matters as much as the diff.

A workorder should name the required checks. The executor should keep working until those checks pass, unless a real blocker, ambiguity, or conflict with repo doctrine makes completion unsafe.

If the work exposes a repeated mistake, missing rule, fragile workflow, ambiguous command, misleading document, or architectural trap, the repo should get a lesson learned instead of leaving that discovery trapped in chat.

See [`workorders/README.md`](workorders/README.md) and [`workorders/TEMPLATE.md`](workorders/TEMPLATE.md).

### AGENTS.md

[`AGENTS.md`](AGENTS.md) contains direct operating instructions for AI assistants and executor agents.

It is the machine-facing discipline layer.

The README is the human landing page.

### Break words

Break words are caution lights.

They are terms like `agent`, `automation`, `evidence`, `confidence`, `policy`, `profile`, `full gate`, `safe`, `secure`, `command`, `control`, and `production-ready`.

They are not banned words. They are words that should make humans and AI assistants slow down before they accidentally create the wrong architecture.

### Full gates

A full gate is the full battery of project checks.

It is not one magic test.

A mature project may codify lite, focused, and full checks over contracts, schemas, generated files, workorder references, intent preservation, examples, docs, policy boundaries, release assumptions, and related project rules.

### Lessons learned

A lesson learned records a failure pattern the repo should remember.

When a foreground AI creates a workorder, it should automatically tell the coding agent or executor to record a lesson learned if the work reveals a repeated mistake, missing rule, fragile workflow, ambiguous command, misleading document, questionable assumption, or architecture boundary.

The human should not have to remember to ask. The AI puts this instruction in the workorder by default.

Use lessons learned only when the repo needs a new rule, clearer command, better check, or more explicit architecture boundary.

### Conflict by intent

A pull request is not only a diff.

A merge conflict is not only a text collision.

In a PMP-style repository, conflicts should be interpreted through recorded intent. If two branches conflict, inspect the workorders and ask what each change was trying to accomplish before choosing text mechanically.

### Architecture-first folders

This skeleton is not trying to make every project look like a legacy MVC app, a generic CRUD app, or a framework demo.

Project folder hierarchy should reflect the semantics of the project.

Folders are part of the cognition layer. They tell humans and AI assistants what kinds of things exist, what distinctions matter, and what should not be collapsed.

We are architectures first, not "look mom, I made an app" UI CRUD type things.

See [`docs/architecture/semantic-folder-hierarchy.md`](docs/architecture/semantic-folder-hierarchy.md).

## Governance checks

PMP now includes a small standard-library Python checker for the first governance layer.

Run it from the repository root:

```text
python tools/pmp_check.py --area all
```

The checker currently validates the workorder governance contract:

```text
schemas/workorder-contract.json
```

It checks that permanent workorder filenames follow the required dated pattern, reserved rolling names such as `current-task.md`, `latest.md`, and `next.md` are not used, required governance docs exist, and completion-note governance stays discoverable.

The checker is intentionally small. It is the first boring enforcement layer, not a finished full gate.

To run the Python tests:

```text
python -m pytest
```

If `pytest` is not installed, install it in your local development environment. The checker itself does not require third-party packages.

## Repository map

```text
AGENTS.md                                  AI/executor operating instructions
README.md                                  human landing page
workorders/README.md                       workorder operating notes
workorders/TEMPLATE.md                     starter workorder template
schemas/workorder-contract.json            machine-readable workorder governance contract
tools/pmp_check.py                         lightweight governance checker
tests/test_pmp_check.py                    tests for the governance checker
docs/releases/v0.3.0.md                    v0.3.0 release notes
docs/architecture/semantic-folder-hierarchy.md
                                           architecture-first folder doctrine
docs/origin/stream-of-consciousness.md     preserved origin/manifesto capture
examples/README.md                         example index
examples/webgl-demo-3/                     architecture-cognition WebGL example
examples/hobbyist-mechanic-57-chevy/       everyday project-cognition WebGL example
```

## Examples

See [`examples/README.md`](examples/README.md).

The examples show what you can do when your AI has cognition-first context about your projects.

They are not claims that a finished system exists.

They are communication artifacts showing how project memory, architecture cognition, constraints, roles, intent, and concrete artifacts can work together.

## Origin trail

The original long-form, feral README capture is preserved at:

[`docs/origin/stream-of-consciousness.md`](docs/origin/stream-of-consciousness.md)

That file preserves the manifesto language and first-pass project-manager AI framing. It is intentionally raw.

## Why we did this

Two core projects we are working on are highly AI-disciplined complex architectures:

- Polycentric Federated Evidence Mesh
- Polycentric Federated Command Mesh

Those particular projects may not be suitable for everyone.

But the project-management and architecture-cognition problem for AI systems is much broader than those projects.

AI-assisted development needs durable project memory, intent records, workorders, break words, full gates, and a way for humans and AI systems to share enough structure that the AI can act with confidence instead of guessing from vibes.

This first public skeleton is shared so other people can use it, fork it, simplify it, harden it, argue with it, and adapt it for their own AI-assisted project workflows.

## Status

`v0.3.0` is the current public skeleton.

It includes the cleaner public README, `AGENTS.md`, workorder guidance, the preserved origin trail, examples, the architecture-first folder philosophy, and the first lightweight governance checker.

It is usable, but not finished.

Expect the repo to evolve from captured doctrine toward stronger checks, examples, and workflow tooling.

See [`docs/releases/v0.3.0.md`](docs/releases/v0.3.0.md) for release notes.

## License

Apache-2.0.

## Suggestion for your first test-drive in a new repository

You already pasted the startup script into your AI, right?

When you start a new chat or tab, or before asking the AI to make architecture choices, use the **Foreground AI quickstart** above so it knows to inspect the repo, read `README.md` and `AGENTS.md`, respect current repo state, decide whether the work belongs in foreground chat or a workorder, and keep copy/paste outputs clean.

Then try this:

```text
Configure this new project according to the understandings of James Grier Miller's Living Systems.
```

Then let your AI inspect the repo, reason about the project as a living system, and propose the first architecture pass.

The bet is that you may be pleasantly surprised. Once the AI has a systems vocabulary for boundaries, inputs, outputs, subsystems, memory, decision, communication, and adaptation, it can start working at a different level than generic app scaffolding.

Suddenly your AI may go turbo on you in a way you might not have experienced before.
