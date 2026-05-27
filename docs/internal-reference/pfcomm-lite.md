# PFCOMM-lite reference for Doctor Bones

This file is an embedded Doctor Bones reference copy of the PFCOMM README.

Source repository: `lightrock/PFCOMM`

Source file: `README.md`

Source snapshot SHA from fetch: `df9712ec7422edd3e2f83afceeb1d7c383c018b8`

Use this file as a **PFCOMM-lite** analysis lens when the live PFCOMM repository is not available or when the human only needs a lightweight command, tasking, status, coordination, authority, and after-action accountability comparison.

Do not claim this file is the whole PFCOMM architecture. It is enough to support a useful first-pass analysis of command boundaries, authority context, tasking, assignments, resources, action receipts, operational status, coordination messages, decision logs, after-action records, MCP/tool exposure, workorder discipline, and proof/report separation. If the human asks for a full PFCOMM comparison, inspect the current `lightrock/PFCOMM` repository state.

## Human prompt shape

Read this PFCOMM-lite reference when the human asks something like:

```text
Go analyze my other repo <repo URL or owner/name> with PFCOMM-lite analysis capabilities.
```

Equivalent prompt shapes include:

```text
Use PFCOMM-lite to analyze <repo>.
Compare <repo> against Doctor Bones' PFCOMM-lite lens.
Look at <repo> for command/tasking/status boundary problems using PFCOMM-lite.
Analyze this external repo with PFCOMM-style boundaries, but do not do a full PFCOMM repo scan.
```

Expected response boundary:

```text
I used Doctor Bones' embedded PFCOMM-lite reference for this analysis.
I inspected <target repo files actually read>.
I did not inspect the full live PFCOMM repository.
I did not write to the external repository.
```

For a PFCOMM-lite repo analysis, inspect the target repository first, then compare it against this embedded lens. Separate source-backed observations from architectural inference. Do not call a gap a bug unless the target repository evidence supports that claim.

---

# PFCOMM

**PFCOMM** means **Polycentric Federated Command Mesh**.

PFCOMM is an architecture-first project for configurable command, coordination, tasking, action-status, resource-assignment, and after-action accountability nodes.

The goal is one headless reference architecture that can support many operational shapes by configuration rather than product forks:

- incident command nodes
- emergency operations nodes
- field coordination nodes
- infrastructure operations nodes
- security operations nodes
- mission-support nodes
- partner liaison nodes
- disconnected edge command nodes

## MCP-style instance interoperability

PFCOMM does not become MCP, but a PFCOMM instance may expose selected command, tasking, message, status, acknowledgement, rollup, and rolldown capabilities through MCP-style tools/resources.

Those exposed capabilities are callable tools for AI clients, operator workbenches, coordinators, or adjacent systems, while PFCOMM keeps ownership of command semantics, authority context, tasking meaning, action receipts, status, audit, and after-action accountability.

Examples of future PFCOMM-exposed tools:

- `pfcomm.message.read`
- `pfcomm.status.read`
- `pfcomm.tasking.propose`
- `pfcomm.acknowledgement.record`
- `pfcomm.roll_down.draft`
- `pfcomm.roll_up.submit`

Read-only tools should come first. Draft/propose tools come next. Mutation, submit, assign, acknowledge, or operational tools require policy, audit, authority context, and human approval.

PFEM may expose evidence/package/report/rollup capabilities the same way. MCP is the callable-tool layer; PFEM and PFCOMM keep the domain meaning.

MCP exposure is optional and earned. A PFCOMM deployment may keep many doodads as local Python services, CLI tools, internal APIs, files, queues, or dashboard internals. Expose a PFCOMM capability through MCP only when crossing an AI/tool boundary is useful, safe, and governable. See `docs/architecture/mcp-exposure-policy.md`.

## Core rule

PFCOMM keeps these separate:

- command intent
- authority context
- tasking
- assignments
- resources
- operational status
- action receipts
- escalation requests
- coordination messages
- decision logs
- after-action records
- reports

PFCOMM is not an evidence system and should not pretend to own raw evidence, observations, findings, evidence packages, or provenance rules that belong in an evidence-governance architecture such as PFEM.

PFCOMM consumes trusted findings, alerts, rollups, and evidence-package references from adjacent systems. It produces tasking, assignments, priorities, action receipts, status updates, decision logs, and after-action accountability records.

Adapters bring source-specific command or coordination inputs into PFCOMM contracts.

Profiles decide what kind of command or coordination node is being deployed.

Command/action flows help authorized humans and systems decide what to do, assign responsibility, track execution, and close the loop.

Federation and rollup move attributable command-state summaries, requests, tasking records, action receipts, and status updates across explicit authority and sharing boundaries.

Prior art and positioning:

- [docs/prior-art.html](docs/prior-art.html)

Start here:

- `docs/AI_START_HERE.md`
- `docs/architecture/README.md`
- `docs/architecture/pfcomm-boundary-model.md`
- `docs/developer/pfcomm-contributor-command-protocol.md`
- `docs/developer/pfcomm-new-tab-prompt.md`
- `workorders/README.md`

## Architecture and testing principles observed

PFCOMM is being built as a command-coordination reference architecture, not as a dashboard, task app, military simulator, or pile of scripts. The project should keep proving its shape through small, named, auditable boundaries.

Architecture principles:

- Keep evidence, interpretation, command intent, tasking, action, status, report, and after-action concepts separate.
- Prefer explicit record species over ambiguous blobs when a boundary matters.
- Treat each generated PFCOMM boundary as a full contract boundary: data, schema, validator, tool, catalog, audit, doctor wiring, docs, contract, tests, and check-manifest registration when those systems exist.
- Use real domain nouns for generated boundaries. Names should describe the PFCOMM responsibility, not the implementation trick.
- Do not let PFCOMM become PFEM. PFCOMM may consume evidence-governance outputs, but command authority and evidence custody are different architectural responsibilities.
- Do not preserve project knowledge only in chat. Put doctrine, handoff, standards, and gotchas in the repo.
- Do not add infrastructure, databases, queues, identity systems, background services, weapons logic, targeting logic, or operational integrations unless the architecture docs justify it.

Testing principles:

- Make the normal path boring: one launcher, one manifest, predictable focused checks when the checker layer exists.
- New PFCOMM checks should belong under `tools/` and be registered in a check manifest when one is introduced.
- During large generation work, run focused validators and quick gates. Save full gates for stabilization, release, and broad plumbing changes.
- Let gates reveal real missing boundaries. Do not invent fake references, fake authority, fake tasks, fake actions, or fake evidence just to quiet a failing check.
- Treat schema-contract failures as design feedback.

Contributor handoff:

- Start with `AGENTS.md`.
- Read `docs/AI_START_HERE.md`.
- Read `docs/architecture/README.md`.
- Read `docs/architecture/pfcomm-boundary-model.md`.
- Read `docs/developer/pfcomm-contributor-command-protocol.md`.
- Read `docs/developer/pfcomm-new-tab-prompt.md`.
- Read `workorders/README.md` before creating or executing substantial task instructions.
- Inspect current `main` before assuming conversation memory is current.

## Your first new session instruction to an AI

Before asking a new AI/chat/development session to work on PFCOMM, paste this first:

```text
We are working in the PFCOMM repository: lightrock/PFCOMM.
Inspect current main before relying on chat memory.
Read AGENTS.md, README.md, docs/AI_START_HERE.md, docs/developer/pfcomm-contributor-command-protocol.md, docs/developer/pfcomm-new-tab-prompt.md, workorders/README.md, and any check manifest before making changes.
Follow PFCOMM boundary language, workorder discipline, and patch safety rules.
Keep PFCOMM command/action coordination separate from PFEM evidence governance.
If any filename has changed, inspect the closest current equivalent in the repository before proceeding.
```

Once your AI assistant has executed those startup instructions, it will automatically know how to handle the following project commands and workflows.

When any developer says `start a new tab`, the worker should produce the canonical PFCOMM new-tab handoff prompt instead of continuing implementation work.

When any developer says `create a workorder`, `write a workorder`, or `make a workorder`, the foreground assistant should generate a dated PFCOMM workorder file under `workorders/` and give the developer the exact one-line instruction to paste into the executor. The developer should not have to hand-write the workorder in Notepad.

See:

```text
docs/developer/pfcomm-contributor-command-protocol.md
docs/developer/pfcomm-new-tab-prompt.md
workorders/README.md
```

## Workorders

Workorders are meant to be generated for developers, not hand-written by developers.

The normal workflow is:

1. A developer discusses a substantial task with a foreground assistant.
2. The foreground assistant decides the task needs a durable handoff.
3. The foreground assistant creates a dated PFCOMM workorder file under `workorders/`.
4. The foreground assistant gives the developer one exact line to paste into the executor, such as Codex, another AI, or a human working session.
5. The executor reads that committed workorder file and carries out the task.

The developer's job is to decide and approve the work. The foreground assistant's job is to turn that decision into a clear workorder when the work is substantial enough to need one.

A workorder is the bridge between two lanes:

- a foreground assistant or human frames the work, constraints, and checks;
- an executor, such as Codex, another AI, or a human developer, carries out the named task.

A workorder is also a committed pre-action decision record and executable task contract. It keeps the project from losing the reason for a change inside a chat window, local patch folder, or vendor-specific AI session.

Use workorders for substantial or process-sensitive work, especially changes that affect:

- PFCOMM boundaries;
- command protocol;
- `AGENTS.md` or `docs/AI_START_HERE.md`;
- check runners, check manifests, release gates, or full-gate behavior;
- architecture doctrine;
- broad contributor behavior.

Tiny safe edits do not need workorders. Standing-process changes usually do.

# Break words

PFCOMM has project terms that can stop a conversation long enough to prevent a bad architectural assumption.

Examples include:

```text
adapter
subsystem
source
consumer
validate
verify
prove
certify
truth
confidence
mesh
boundary
profile
policy
evidence
finding
command
control
authority
intent
tasking
assignment
resource
action
receipt
status
rollup
federation
workorder
full gate
release
```

If one of these terms is ambiguous, the assistant or contributor should pause implementation work, explain the PFCOMM-specific meanings, identify which meaning is intended, and then continue with the smallest doctrine-preserving change.

## Check Framework

PFCOMM now has a starter check path:

```text
pfcomm_check.bat --quick
pfcomm_check.bat --full
python -m unittest discover -s tests -p test_*.py
```

The manifest lives at `tools/pfcomm_check_manifest.json`. Boundary species are registered in `schemas/pfcomm_boundary_registry.json`.
