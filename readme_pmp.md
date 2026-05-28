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

## Why coding agents look smarter than other agents

Coding agents look unusually capable partly because software repositories already give them a strong workspace.

A repo gives an AI assistant:

```text
files
rules
docs
tests
schemas
history
diffs
checks
a place to write changes back
```

Most non-coding work does not naturally come with that substrate. The work may live across email, chat, dashboards, spreadsheets, PDFs, SaaS records, meetings, human memory, and external systems.

That does not mean non-coding agents need to be magical or psychic.

It means the project needs to make the work inspectable first.

PMP generalizes the advantage coding agents already have:

```text
durable context
+ task contracts
+ source-of-truth files
+ checks
+ audit trail
+ human authority boundaries
```

Before asking AI to operate in a domain, give it a workspace where state, rules, evidence, decisions, checks, and outputs can be inspected and corrected.

This is why many useful PMP workflows are invocable workflows, not resident autonomous agents. A human or foreground AI can invoke a vigilance check, contradiction scan, release-surface map, project-wiki build, project-knowledge-bank build, playbook-packaging pass, MCP-style tool-agent design pass, outside-agent-pattern distillation, release-readiness stabilization, workorder creation, or context-assembly pass when needed.

The goal is not to pretend the AI knows everything.

The goal is to stop forcing humans to rehydrate context from scratch every time.

## Core idea

Human-readable documentation still matters.

But for AI-assisted projects, human docs are no longer enough.

AI-readable architecture cognition becomes the operating substrate.

If your project wants retrieval or RAG behavior, add it in your own project in whatever way fits your architecture.

PMP does not require a specific vector database, retrieval pipeline, embedding model, indexer, or AI vendor.

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

## Useful commands

These are copy/paste prompts for foreground AI chats, except where a shell command is explicitly shown.

### Start a new tab

Use this when starting a fresh chat against this repository:

```text
You are the foreground AI for the DrBones repository (built from the PMP / AI Project Skeleton).

Repository:
  https://github.com/lightrock/drbones

Current repo state beats chat memory. Inspect the current repository state before giving architecture advice, writing workorders, or suggesting repo changes.

Read README.md and AGENTS.md first. Then identify current state, target, constraints, foreground/executor decision, and the smallest useful next move.
```

### Make a workorder with preview

Use this when the next change should be handed to an executor AI or coding agent, and the human should see the workorder before it is saved or handed off:

```text
Create a bounded workorder for this repository and show me a clean preview first.

Repository:
  https://github.com/lightrock/drbones

Task:
  <describe the exact task>

Include:
  - current repo state assumptions to verify
  - exact files or folders likely involved
  - constraints and what not to do
  - required checks to run
  - keep-working-until-checks-pass instruction
  - completion-note requirements
  - lessons-learned instruction if the work exposes a repeated mistake, fragile workflow, missing rule, or architecture boundary

Preview rules:
  - Put only the workorder body in one clean copy/paste block.
  - Do not put citations, assistant notes, explanations, links, or commentary inside the workorder block.
  - After the preview, ask whether to save it to the repository or revise it.
```

### Make a workorder quietly

Use this when the workorder should be saved directly and the human only wants the link to paste into an executor AI:

```text
Create a bounded workorder for this repository quietly.

Repository:
  https://github.com/lightrock/drbones

Task:
  <describe the exact task>

Include the same governance payload as the preview mode: current repo state assumptions to verify, exact scope, constraints, what not to do, required checks, keep-working-until-checks-pass instruction, completion-note requirements, and lessons-learned instruction.

Save the workorder file in the repository using the repo's workorder naming rules. Do not paste the full workorder into chat. Reply with only a short confirmation and the repository link to the saved workorder.
```

### Decide whether this belongs in foreground chat or executor work

Use this when the request may be too large for foreground chat:

```text
Classify this request before doing it.

Current request:
  <paste request>

Tell me whether it should be handled in foreground chat or turned into a workorder for an executor AI. Use the smallest safe next step. If it needs multiple file edits, terminal checks, debugging, repo mutation, or behavior verification, create a workorder instead of trying to implement it directly here.
```

### Run the local checks

Run these from the repository root:

```text
python tools/pmp_check.py --area all
python -m pytest
```

### Read the day-in-the-life examples

Before inventing a new workflow, read the examples linked below, especially the `day-*` day-in-the-life examples in [`examples/README.md`](examples/README.md). They show how foreground AI requests become bounded executor workorders, checks, completion notes, and lessons learned without turning root `AGENTS.md` into a junk drawer.

## Core concepts

### Workorders

A workorder is a durable AI-to-AI task contract.

The normal path is:

```text
human intent
→ foreground AI clarifies the task
→ foreground AI writes the workorder
→ executor AI performs the bounded work
→ checks and completion notes tie the result back to intent
```

Workorders can be written manually, but PMP assumes they are often generated by AI for AI.

They are not chat transcripts. They preserve the repository, exact task, constraints, what not to do, required checks, completion-note expectations, and lessons-learned guidance.

Use a workorder when intent matters as much as the diff, or when the work needs executor tools, file edits, terminal checks, debugging, repo mutation, or behavior verification.

See [`workorders/README.md`](workorders/README.md) and [`workorders/TEMPLATE.md`](workorders/TEMPLATE.md).

### AGENTS.md

[`AGENTS.md`](AGENTS.md) contains direct operating instructions for AI assistants and executor agents.

It is the machine-facing discipline layer.

The README is the human landing page.

### Playbooks

[`playbooks/`](playbooks/README.md) contains vendor-independent, repo-owned instructions for reusable workflows.

Playbooks are not one-time workorders and they are not vendor-specific skills.

Use a playbook when a workflow has become reusable enough that future workorders should reference stable task-specific guidance.

A playbook does not override `AGENTS.md`, workorders, required checks, source authority rules, human approval gates, or safety constraints.

The MCP-style agent design playbook shows how to design tool access, tool contracts, approval gates, proof paths, and authority boundaries before exposing tools to AI assistants.

### Break words

Break words are caution lights.

They are terms like `agent`, `automation`, `evidence`, `confidence`, `policy`, `profile`, `full gate`, `safe`, `secure`, `command`, `control`, and `production-ready`.

They are not banned words. They are words that should make humans and AI assistants slow down before they accidentally create the wrong architecture.

### Full gates

A full gate is the full battery of project checks.

It is not one magic test.

Codified checks help coding agents check their own work. A good workorder tells the executor which contracts, schemas, tests, generated-file checks, documentation checks, and policy checks must pass, and the executor should keep working until those checks pass unless there is a real blocker or conflict with repo doctrine.

This is one of the most important PMP habits: turn important architecture rules into checks so coding agents cannot easily do the wrong thing and call it finished.

A mature project may codify lite, focused, and full checks over contracts, schemas, generated files, workorder references, intent preservation, examples, docs, policy boundaries, release assumptions, and related project rules.

You can also tell the foreground AI to create more tests, contracts, schemas, fixtures, or checker rules before handing work to an executor, so the executor has rails instead of vibes.

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
readme_pmp.md                              full PMP / AI Project Skeleton guide
playbooks/README.md                        vendor-independent reusable workflow guidance
playbooks/mcp-style-agent-design/          tool-agent authority and contract design playbook
workorders/README.md                       workorder operating notes
workorders/TEMPLATE.md                     starter workorder template
schemas/workorder-contract.json            machine-readable workorder governance contract
tools/pmp_check.py                         lightweight governance checker
tests/test_pmp_check.py                    tests for the governance checker
docs/releases/v0.4.0.md                    v0.4.0 release notes
docs/architecture/semantic-folder-hierarchy.md
                                           architecture-first folder doctrine
docs/origin/stream-of-consciousness.md     preserved origin/manifesto capture
examples/README.md                         example index
examples/day-06-release-surface-mapping/             release-surface mapping workflow example
examples/day-07-vigilance-check/                     invocable vigilance-check workflow example
examples/day-08-contradiction-scan/                  invocable contradiction-scan workflow example
examples/day-09-project-wiki-build/                  invocable project-wiki-build workflow example
examples/day-10-project-knowledge-bank/              invocable project-knowledge-bank workflow example
examples/day-11-playbook-packaging/                  vendor-independent playbook packaging workflow example
examples/day-12-mcp-style-tool-agent-design/         MCP-style tool-agent design workflow example
examples/day-13-outside-agent-pattern-distillation/  outside-agent-pattern distillation workflow example
examples/day-14-release-readiness-stabilization/     release-readiness stabilization workflow example
examples/webgl-demo-3/                     architecture-cognition WebGL example
examples/hobbyist-mechanic-57-chevy/       everyday project-cognition WebGL example
```

## Examples

See [`examples/README.md`](examples/README.md).

The examples show what you can do when your AI has cognition-first context about your projects.

They are not claims that a finished system exists.

They are communication artifacts showing how project memory, architecture cognition, constraints, roles, intent, and concrete artifacts can work together.

Some examples are invocable workflows rather than always-on agents. A human or foreground AI can run them when needed, such as a release-surface map, vigilance check, contradiction scan, project-wiki build, project-knowledge-bank build, playbook-packaging pass, MCP-style tool-agent design pass, outside-agent-pattern distillation, or release-readiness stabilization.

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

`v0.4.0` is the current public skeleton release for DrBones.

It includes the renamed DrBones project identity, the cleaner public README, `AGENTS.md`, workorder guidance, vendor-independent playbooks, MCP-style tool-agent design guidance, outside-agent-pattern distillation, release-readiness stabilization, the preserved origin trail, examples, the architecture-first folder philosophy, the first lightweight governance checker, and clearer foreground AI workorder handoff commands.

It is usable, but not finished.

Expect the repo to evolve from captured doctrine toward stronger checks, examples, and workflow tooling.

See [`docs/releases/v0.4.0.md`](docs/releases/v0.4.0.md) for release notes.

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
