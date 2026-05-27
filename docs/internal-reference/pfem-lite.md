# PFEM-lite reference for Doctor Bones

This file is an embedded Doctor Bones reference copy of the PFEM README.

Source repository: `lightrock/PFEM`

Source file: `README.md`

Source snapshot SHA from fetch: `cbe066e9c9d28ceea21483716bb5946b331823c4`

Use this file as a **PFEM-lite** analysis lens when the live PFEM repository is not available or when the human only needs a lightweight evidence-boundary comparison.

Do not claim this file is the whole PFEM architecture. It is enough to support a useful first-pass analysis of evidence boundaries, provenance, confidence, MCP/tool exposure, record species, workorder discipline, and proof/report/rollup separation. If the human asks for a full PFEM comparison, inspect the current `lightrock/PFEM` repository state.

## Human prompt shape

Read this PFEM-lite reference when the human asks something like:

```text
Go analyze my other repo <repo URL or owner/name> with PFEM-lite analysis capabilities.
```

Equivalent prompt shapes include:

```text
Use PFEM-lite to analyze <repo>.
Compare <repo> against Doctor Bones' PFEM-lite lens.
Look at <repo> for evidence-boundary problems using PFEM-lite.
Analyze this external repo with PFEM-style boundaries, but do not do a full PFEM repo scan.
```

Expected response boundary:

```text
I used Doctor Bones' embedded PFEM-lite reference for this analysis.
I inspected <target repo files actually read>.
I did not inspect the full live PFEM repository.
```

For a PFEM-lite repo analysis, inspect the target repository first, then compare it against this embedded lens. Separate source-backed observations from architectural inference. Do not call a gap a bug unless the target repository evidence supports that claim.

---

# PFEM

**PFEM** means **Polycentric Federated Evidence Mesh**.

PFEM is an architecture-first project for configurable evidence, sensor-input, human-report, dashboard, and rollup nodes.

## State-of-the-art note

PFEM should be read as a useful fossil and reference architecture: it captures an explicit evidence-governance model, boundary vocabulary, and AI/human repository discipline. The state of the art in AI-assisted and autonomous systems work is already moving beyond "AI writes code" or "one AI helps one operator" toward governed coalitions of human teams, AI agents, robotic systems, infrastructure nodes, and disconnected edge participants.

PFEM remains valuable as the evidence/provenance side of that future architecture, but it is not the whole frontier. Newer adjacent work should treat PFEM as a baseline substrate for claims, custody, confidence, provenance, rollups, and shareable evidence packages while exploring more advanced agentic command, coordination, authority, and action-accountability patterns elsewhere.

The goal is one core architecture that can support many deployment shapes by configuration rather than product forks:

- field-radio nodes
- community mesh nodes
- infrastructure site nodes
- civil dashboard nodes
- research testbed nodes
- formal authority rollup nodes
- disconnected edge nodes

## MCP-style instance interoperability

PFEM does not become MCP, but a PFEM instance may expose selected evidence, package, report, rollup, and MindGraph capabilities through MCP-style tools/resources.

Those exposed capabilities are callable tools for AI clients, operator workbenches, coordinators, or adjacent systems, while PFEM keeps ownership of evidence semantics, provenance, audit, confidence, package/report meaning, and boundary discipline.

Examples of future PFEM-exposed tools:

- `pfem.evidence.lookup`
- `pfem.package.read`
- `pfem.package.draft`
- `pfem.report.draft`
- `pfem.rollup.read`
- `pfem.mindgraph.lookup`

Read-only tools should come first. Draft/propose tools come next. Mutation, publish, send, or operational tools require policy, audit, authority context, and human approval.

PFCOMM may expose command/tasking/status capabilities the same way. MCP is the callable-tool layer; PFEM and PFCOMM keep the domain meaning.

MCP exposure is optional and earned. A PFEM deployment may keep many doodads as local Python services, CLI tools, internal APIs, files, queues, or dashboard internals. Expose a PFEM capability through MCP only when crossing an AI/tool boundary is useful, safe, and governable. See `docs/architecture/mcp-exposure-policy.md`.

## Core rule

PFEM keeps these separate:

- raw evidence
- normalized observations
- correlated entities or tracks
- findings
- alerts
- evidence packages
- dashboard actions
- federation messages
- rollup summaries
- reports

Adapters bring source-specific inputs into PFEM contracts.

Profiles decide what kind of node is being deployed.

Dashboard/action flows help humans decide what to do next.

Federation and rollup move attributable summaries, requests, and evidence packages across explicit sharing boundaries.

Prior art and positioning:

- [docs/prior-art.html](docs/prior-art.html)

Start here:

- `docs/AI_START_HERE.md`
- `docs/architecture/neutral-language.md`
- `docs/architecture/pfem-node-shapes.md`
- `docs/architecture/cross-node-sharing-model.md`
- `ai/architecture-rules.md`
- `contracts/adapter-contract.md`

## Architecture and testing principles observed

PFEM is being built as an evidence-governance architecture, not as a pile of scripts. The project should keep proving its shape through small, named, auditable boundaries.

Architecture principles:

- Keep evidence, interpretation, action, package, report, and rollup concepts separate.
- Prefer explicit record species over ambiguous blobs when a boundary matters.
- Treat each generated PFEM boundary as a full contract boundary: data, schema, validator, tool, catalog, audit, doctor wiring, docs, contract, tests, and check-manifest registration.
- Use real domain nouns for generated boundaries. Names should describe the PFEM responsibility, not the implementation trick.
- Stop generating new species when a chain reaches a real semantic endcap. After an endcap, stabilize and run gates.
- Do not preserve project knowledge only in chat. Put doctrine, handoff, standards, and gotchas in the repo.
- Do not add infrastructure, queues, databases, services, or auth just because they are familiar. Add them only when the architecture earns them.

Testing principles:

- Make the normal path boring: one launcher, one manifest, predictable focused checks.
- New PFEM checks belong under `tools/` and should be registered in `tools/pfem_check_manifest.json`.
- Avoid root-level `.bat` wrapper churn. Keep `pfem_check.bat` and `pfem_check.sh` as the launcher pair.
- During large generation work, run focused validators and quick gates. Save the full gate for stabilization, release, and broad plumbing changes.
- Let gates reveal real missing boundaries. Do not invent fake references or fake species just to quiet a failing check.
- Write noisy patch status output to `build/pfem-patch-status/` so operators can see actual failures without scrolling through hundreds of status lines.
- Treat schema-contract failures as design feedback. Example: `missing_refs` is an optional diagnostic array for passed verification receipts, not a required non-empty field.

Contributor handoff:

- Start with `AGENTS.md`.
- Read `docs/developer/pfem-boundary-language-generation-standard.md`.
- Read `docs/developer/pfem-new-chat-handoff.md`.
- Read `docs/developer/pfem-terminal-tail-stabilization.md`.
- Inspect `tools/pfem_check_manifest.json`.
- Read `workorders/README.md` before creating or executing substantial task instructions.
- `docs/developer/pfem-architecture-theory-notes.md` for the higher-level PFEM theory vocabulary.
- `docs/developer/pfem-codegraph-local-tooling.md` for optional local CodeGraph navigation setup.
- Inspect current `main` before assuming conversation memory is current.

## Your first new session instruction to an AI

Before asking a new AI/chat/development session to work on PFEM, paste this first:

```text
We are working in the PFEM repository: lightrock/PFEM.
Inspect current main before relying on chat memory.
Read AGENTS.md, README.md, docs/AI_START_HERE.md, docs/developer/pfem-contributor-command-protocol.md, docs/developer/pfem-new-tab-prompt.md, workorders/README.md, and tools/pfem_check_manifest.json before making changes.
Follow PFEM boundary language, workorder discipline, and patch safety rules.
If any filename has changed, inspect the closest current equivalent in the repository before proceeding.
```

Once your AI assistant has executed those startup instructions, it will automatically know how to handle the following project commands and workflows.

When any developer says `start a new tab`, the worker should produce the canonical PFEM new-tab handoff prompt instead of continuing implementation work.

When any developer says `create a workorder`, `write a workorder`, or `make a workorder`, the foreground assistant should generate a dated PFEM workorder file under `workorders/` and give the developer the exact one-line instruction to paste into the executor. The developer should not have to hand-write the workorder in Notepad.

See:

```text
docs/developer/pfem-contributor-command-protocol.md
docs/developer/pfem-new-tab-prompt.md
workorders/README.md
workorders/AGENTS.md
```

## Workorders

Workorders are meant to be generated for developers, not hand-written by developers.

The normal workflow is:

1. A developer discusses a substantial task with a foreground assistant such as GPT.
2. The foreground assistant decides the task needs a durable handoff.
3. The foreground assistant creates a dated workorder file under `workorders/`.
4. The foreground assistant gives the developer one exact line to paste into the executor, such as Codex, another AI, or a human working session.
5. The executor reads that committed workorder file and carries out the task.

The developer's job is to decide and approve the work. The foreground assistant's job is to turn that decision into a clear workorder when the work is substantial enough to need one.

A workorder is the bridge between two lanes:

- a foreground assistant or human frames the work, constraints, and checks;
- an executor, such as Codex, another AI, or a human developer, carries out the named task.

A workorder is also a committed pre-action decision record and executable task contract. It keeps the project from losing the reason for a change inside a chat window, local patch folder, or vendor-specific AI session.

In github, if there is a merge conflict, provided there are work order file references, a connected AI can re-figure the original intents and resolve conflicts with much greater effectiveness.

This matters because a GitHub PR alone may show the final code diff without preserving what the foreground assistant asked the executor to do. A workorder gives the PR a durable breadcrumb: the executor should name the exact `workorders/...md` file it used so future reviewers can trace the instruction, implementation, and review path.

Use workorders for substantial or process-sensitive work, especially changes that affect:

- PFEM boundaries;
- command protocol;
- `AGENTS.md` or `docs/AI_START_HERE.md`;
- check runners, check manifests, release gates, or full-gate behavior;
- architecture doctrine;
- broad contributor behavior.

A workorder may also ask the executor to record a lessons-learned note when it encounters a hard, repeated, or high-impact problem. The point is replay value: if the same class of task happens again, the next human or AI should not have to rediscover the same lesson from scratch.

If a lot of lessons learned are being generated, this should be treated as a smoke signal, architecturally, "something's burning!"

The standard filename shape is:

```text
workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md
```

After a workorder is created, the executor instruction is:

```text
Read workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md and execute it.
```

Tiny safe edits do not need workorders. Standing-process changes usually do.

# Break words

PFEM has project terms that can stop a conversation long enough to prevent a bad architectural assumption.

It is a developer and AI working rule. The detailed rules live in:

```text
docs/developer/pfem-terminology-brake-rules.md
```

You may be interrupted to clarify when a term is overloaded enough that continuing could create the wrong architecture, wrong records, wrong checks, or misleading documentation.

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
report
rollup
federation
workorder
full gate
release
```

If one of these terms is ambiguous, the assistant or contributor should pause implementation work, explain the PFEM-specific meanings, identify which meaning is intended, and then continue with the smallest doctrine-preserving change.
