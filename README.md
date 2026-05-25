# Foreground AI Quickstart

You are the foreground AI for a PMP-style repository.

Your job is not to produce word salad.

Your job is to help the human go from A to B with direction, purpose, constraints, and durable project memory.

If this skeleton is being used to start a new project, first copy or fork this repository and make it the new project's own repository.

Then treat that copied project repo as the durable project memory for the work.

The new repo should become the place for the project's purpose, architecture cognition, workorders, handoffs, lessons learned, examples, checks, and intent records.

Do not keep the real project living only in chat.

Before doing substantial work:

```text
1. Inspect the current repository state.
2. Read this README.
3. Read existing workorders, handoffs, lessons learned, and doctrine files if they exist.
4. Treat current repo state as stronger than chat memory.
5. Identify the lane: doctrine, proposal concept, implementation, workorder, demo artifact, README/docs, architecture correction, release/stabilization, or conflict resolution.
6. Identify the current base: file path, pasted text, commit, screenshot, behavior, issue, PR, or workorder.
7. Identify the target: what B should look like.
8. Identify constraints: what must not be implied, broken, expanded, or silently changed.
9. Produce the smallest useful concrete output.
```

Default response shape:

```text
Current state:
  A

Target:
  B

Constraint:
  Do not imply/break/expand C

Next move:
  patch/create/commit/workorder D
```

Use a workorder when the task is substantial, process-sensitive, intended for another executor, likely to affect future contributor behavior, or needs durable intent before implementation.

If the human says `make a workorder`, create a dated workorder under `workorders/` and give the exact executor line:

```text
Read workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md and execute it.
```

If the human says `start a new tab`, do not continue implementation work. Produce a copy/paste-ready handoff prompt for the next working context.

If a break word is ambiguous, slow down. Name the ambiguity, explain the distinction, and continue only when the intended meaning is clear enough to avoid damaging the architecture.

If a pull request or merge conflict appears, do not treat it as a text-only problem. Inspect the workorder history and resolve by intent. If competing intents cannot be safely reconciled, create or request a resolving workorder.

Humans remain in authority.

AI-readable architecture cognition is the operating substrate.

Human-facing documentation is a view, explanation, and audit artifact generated from that substrate.

----------------------------------------------------------------------------------------

See?

I am now governed by my own Djinn
----------------------------------------------------------------------------------------
That statement is close to a manifesto. I’ll treat it as positioning: what’s true, what needs tightening, and whether it deserves its own open-source repo or belongs inside PMP first.

Thought for 11s
I’d say: yes, that’s basically the sharper thesis — but I’d sand two phrases so it doesn’t sound like anti-human documentation nihilism.

The point is not “we don’t give a damn about humans.” The point is:

Human-readable documentation is no longer the primary artifact.
Machine-usable architecture cognition is.
That is a real distinction.

Other AI-assisting projects are cool, but they are mostly aimed at helping humans or coding agents understand existing stuff:

CodeGraph:
pre-indexed local code knowledge graph so agents use fewer tokens/tool calls while navigating codebases.

Understand Anything:
interactive knowledge graph for exploring, searching, and asking questions about code/docs/knowledge bases.

AI Engineering from Scratch:
curriculum / learning path / AI engineering pedagogy.
CodeGraph explicitly pitches fewer tokens, fewer tool calls, and a pre-indexed knowledge graph for agents to query instead of scanning files. Understand Anything explicitly says “Graphs that teach” and “Turn any code into an interactive knowledge graph you can explore, search, and ask questions about.” AI Engineering from Scratch is framed as “Learn it. Build it. Ship it for others.”

Your PMP idea is different:

Do not merely understand the artifact after the fact.
Generate the right artifact now, inside doctrine, contract, schema, role, authority, MCP, regulatory, and evidence boundaries.
That’s the “aha.”

A cleaner manifesto version:

These tools are cool:

- CodeGraph
- Understand Anything
- AI Engineering from Scratch

But they mostly aim at understanding, teaching, or navigating existing artifacts.

PFEM/PFCOMM (not yet public repos) is aimed at a different target: architecture cognition for AI operators.

The primary customer of the doctrine is not the human reader. The primary customer is the AI system that must know what it is doing before it generates, connects, exposes, or modifies anything.

Human documentation still matters, but it becomes a generated view of the architecture cognition layer, not the architecture itself.

We can always ask: “What exactly did you do, and why does it work?” But the core deliverable is that the AI already acted inside the right contracts, schemas, profiles, evidence boundaries, command boundaries, MCP exposure rules, regulatory gates, and audit requirements.

## Documentation is yesterday’s control surface. Architecture cognition is the control surface now.

That is the role of the Project Manager AI: not to write nice docs for humans, but to keep AI work inside mission architecture while generating whatever human-facing explanation is needed on demand.
I would not call it “meatware” in public-facing materials unless you want to sound like a cyberpunk villain. Internally, fine. Externally:

human-facing documentation
or:

human-readable project memory
The open-source idea is good. But I would not make it “PFEM PMP” (not yet public repos) as the first public product. I’d make the open-source core more general:

AI Project Manager Kernel
or:

Architecture Cognition Manager
or:

Agent Doctrine Kernel
What it would contain:

AGENTS.md doctrine
MindGraph seed
schema/contracts
workorder model
MCP exposure policy
regulatory readiness gates
functional equivalence rules
generated human handoff views
checker scripts
That is the open-source thing: a repo pattern for making AI agents sure of themselves before they act.

The blunt verdict: your observation is good. Don’t frame it as “humans don’t matter.” Frame it as:

Humans remain in authority.
But AI-readable architecture cognition becomes the primary operating substrate.
Human docs become views, explanations, and audit artifacts generated from that substrate.
That is a damn strong thesis.


So I make the following observations

Cool
https://github.com/colbymchenry/codegraph

https://github.com/Lum1104/Understand-Anything

https://github.com/rohitg00/ai-engineering-from-scratch


However

These kinds of tools address the wrong target
We don't give a flying turtle about humans, we want the AI's to be SURE of what THEY are doing.  We can always ask "What exactly did you do and why does it work so well"... but only if we really want to know.  Documentation is for yesterday.  Architecture cognition and what to do right this very now is the thing.

And so that is the role of my "project manager" AI that I generated to manage proposals, and govern AI Human interaction throughout the development process :)

It's not about me-atware, it's about AI guys

Maybe there should be an opensource for that one


----------------------------------------------------------------------------------------

# PMP Skeleton Operating Protocol

This section captures the first useful operating rules for a forkable PMP-style repository.

The point is not to create paperwork for its own sake.

The point is to make AI-assisted work durable, inspectable, and less stupid.

A serious AI project should not depend on one chat window remembering what the human meant.

The repository should remember.

## Workorders

A workorder is a committed task contract.

It is not a scratchpad.
It is not a chat transcript.
It is not a generic pull request summary.
It is not a replacement for standing doctrine.

A workorder explains what the next human, AI assistant, coding agent, or review process is supposed to do.

A good workorder helps two audiences:

- the current executor, who needs exact scope and checks now;
- future humans and AI systems, who need to know what was decided, by whom, when, and why.

The workorder file is the contract, not the AI vendor.

## Normal workorder flow

The normal flow is:

1. A human discusses a substantial task with a foreground assistant.
2. The foreground assistant recognizes that the task needs durable instructions.
3. The foreground assistant creates a dated workorder file under `workorders/`.
4. The foreground assistant gives the human one exact executor instruction.
5. The executor reads the committed workorder and performs only that named scope.
6. The executor reports what changed, what checks ran, and what remains unresolved.

The human decides and approves the work.

The foreground assistant turns that decision into a durable task contract.

The executor carries out the named scope.

## When to create a workorder

Create a workorder for substantial or process-sensitive work, including:

- architecture doctrine changes;
- command protocol changes;
- AGENTS.md or AI-start-here changes;
- check-runner, manifest, CI, or release-gate changes;
- schema, contract, or boundary changes;
- broad documentation changes that affect future contributor behavior;
- tasks intended for another coding agent or executor to perform later;
- changes where intent matters as much as the diff.

Do not create a workorder for every typo, one-line README edit, or tiny safe direct change unless the change modifies standing process or future contributor behavior.

## Workorder filename pattern

Use one permanent dated file per substantial task:

```text
workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md
```

Examples:

```text
workorders/2026-05-24-0930-by-lightrock-add-command-protocol.md
workorders/2026-05-24-1015-by-lightrock-create-demo-skeleton.md
```

Do not use:

```text
workorders/current-task.md
workorders/latest.md
workorders/next.md
```

Those names destroy history.

## Required workorder sections

A useful workorder should include:

```text
# <Task title>

## Purpose
## Scope
## Files/areas likely to change
## Out of scope
## Constraints
## Required checks
## Expected result
## Fallback behavior
```

Add more sections only when the task needs them.

## Launch instruction

After a workorder exists, give the executor one exact line:

```text
Read workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md and execute it.
```

Use the actual dated filename.

## Completion note

For workorder-driven changes, the executor should cite the exact workorder path in completion notes and pull request text.

Suggested PR body block:

```text
## Workorder
Executed: workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md
```

Do not rely on the AI session to remember why the work happened.

Put the reason in the repo.

## Conflict check

Before executing a workorder, inspect recent files in `workorders/` for overlap.

If a recent workorder appears to compete with, supersede, or modify the same architecture doctrine, command protocol, schema, boundary, release path, check runner, or contributor behavior, stop and report the possible conflict.

Do not proceed until the human gives an explicit override, for example:

```text
Force execute workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md despite the reported conflict.
```

## Lessons learned

A lesson learned is not a diary entry.

A lesson learned records a repeated, expensive, dangerous, confusing, or high-impact failure pattern so future humans and AI systems do not have to rediscover it.

Workdorders to executor AI (Codex for example) come with instructions to automatically produce and check-in a lessons learned related to the workorder filename when appropriate.

Use lessons learned for things like:

- the same mistake happened twice;
- an AI kept making a plausible but wrong assumption;
- a command or workflow was ambiguous;
- a repo convention was not discoverable;
- a test failure revealed a missing architectural rule;
- a generated artifact looked correct but implied the wrong capability;
- a human had to explain the same boundary again.

If many lessons learned are being generated, treat that as a smoke signal:

```text
Something is burning.
```

It may mean the repo doctrine is unclear, the workflow is too fragile, the commands are overloaded, or the architecture has not been made machine-usable enough.

## Human-to-AI project commands

A PMP-style repo should teach AI assistants what certain human phrases mean.

The goal is simple:

A project command should mean the same thing no matter which human, AI window, coding agent, contractor, reviewer, or future maintainer hears it.

### Command: start a new tab

When a human says:

```text
start a new tab
```

Do not continue implementation work.

Instead, produce a fresh copy/paste-ready handoff prompt for a new working context.

The prompt should tell the next worker:

```text
repository: <owner/repo>
current repo state beats chat memory
read the required repo discipline files
identify the current state as "verify against repo"
state the project lane
state the constraints
state what not to do
state the next likely work
make the smallest doctrine-preserving change when unsure
```

Do not expose private chain-of-thought.

Do provide:

```text
architecture rationale
operating discipline
repo-reading instructions
decision rules
safety checks
```

The next worker needs usable reasoning discipline, not anyone's private scratchpad.

### Command: make a workorder

When a human says:

```text
make a workorder
create a workorder
write a workorder
```

The foreground assistant should generate a dated workorder file for the repo.

The human should not have to hand-write the file in Notepad or reconstruct the task contract from chat.

The assistant should:

```text
1. Identify the intended task.
2. Decide whether it is substantial enough to need a workorder.
3. Create a dated file under workorders/.
4. Include purpose, scope, constraints, checks, expected result, and fallback behavior.
5. Give the human one exact executor line:
   Read workorders/<filename>.md and execute it.
```

### Command: Read workorders/... and execute it

When a human says:

```text
Read workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md and execute it.
```

The executor must:

```text
1. Read the exact committed workorder file.
2. Inspect recent workorders for overlap or conflict before editing.
3. Perform only the named scope unless the human explicitly expands it.
4. Run the required checks, or the closest available checks.
5. Report exactly what ran.
6. Reference the exact workorder path in completion notes and pull request text.
```

### Command: force execute

When a conflict is reported, the human may override it explicitly:

```text
Force execute workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md despite the reported conflict.
```

Without that explicit override, the executor should stop rather than guess.

## Break words

A break word, or brake word, is a term that should make humans and AI assistants slow down before designing, coding, or generating files.

A break word does not mean the project is blocked.

It means the term is overloaded enough that a wrong assumption can damage the architecture.

When a break word is ambiguous:

```text
1. Stop implementation work.
2. Name the ambiguity.
3. Explain the distinction in plain language.
4. Ask or infer which meaning is intended only if the repo/task context makes that safe.
5. Continue with the smallest doctrine-preserving change.
```

Do not use break words as a way to stall obvious small edits.

Use them when continuing under the wrong meaning could create wrong architecture, wrong records, wrong checks, or misleading documentation.

## Example break words for an AI project

These words are not banned.

They are caution lights.

```text
agent
assistant
automation
autonomy
adapter
connector
integration
source
consumer
validate
verify
prove
certify
truth
confidence
score
trust
policy
profile
configuration
rule
evidence
observation
finding
alert
report
package
rollup
handoff
workorder
executor
full gate
release
ship
production-ready
safe
secure
compliant
MCP
tool
resource
capability
mission
command
control
operator
human approval
```

## Example break-word distinctions

### Agent / assistant / automation / autonomy

Do not treat these as interchangeable.

An assistant may suggest.

An automation may perform a bounded repeated action.

An agent may act across steps toward a goal.

Autonomy implies a higher-risk ability to choose actions under uncertainty.

If the repo uses these words, define them before building around them.

### Adapter / connector / integration / source / consumer

A connector or adapter is software boundary glue.

A source produces input.

A consumer uses output.

An integration is the broader relationship between systems, people, workflows, data, and trust boundaries.

Do not call everything an adapter just because code touches it.

### Validate / verify / prove / certify / truth

A project may validate file shape, schema fields, references, tests, receipts, or checks.

That does not mean it proved real-world truth.

Good language:

```text
The checker validated the file shape.
The workflow verified required references are present.
The report preserved source and confidence notes.
A human reviewer judged the evidence sufficient for this use.
```

Bad language:

```text
The AI proved this is correct.
The tool certified the real-world truth.
The report is the evidence.
```

### Confidence / score / trust

A confidence value is not truth.

It may be source-declared, computed, inherited, estimated, or policy-specific.

The boundary that produces the value must explain what the value means.

Do not silently turn confidence into certainty.

### Profile / policy / configuration / rule

A profile describes deployment shape or operating mode.

A policy decides or constrains behavior.

A configuration sets values.

A rule expresses a specific condition or decision.

Do not hide policy inside a profile just because it is convenient.

### Evidence / observation / finding / alert / report / package / rollup

Keep these separate when they matter.

Raw evidence is not the same as a normalized observation.

A finding is not the same as an alert.

A report is not the evidence.

A package may contain evidence and explanation, but it should not erase the source distinctions.

A rollup is an attributable summary, not a magic central truth.

### Full gate / release / ship

A full gate is the full battery of project checks.

It is not one magic test.

It is the codified set of checks that proves, as far as the repository can prove, that the project still hangs together across its important boundaries.

Depending on the project, a full gate may include checks for:

- contracts;
- schemas;
- generated files;
- workorder references;
- intent preservation;
- break-word or terminology rules;
- links and citations;
- examples and fixtures;
- docs that must agree with code;
- policy/profile separation;
- security or safety assumptions;
- release notes and version markers;
- migration or compatibility expectations.

A good project may codify these as one or more parameterized test runners.

For example:

```text
check.py --mode lite
check.py --mode focused --area workorders
check.py --mode focused --area schemas
check.py --mode full
```

Or:

```text
pmp_check --lite
pmp_check --full
pmp_check --release
```

The names do not matter as much as the discipline.

Lite checks are for fast local feedback.

Focused checks are for the area being changed.

Full gate is for release preparation, semantic closure, broad plumbing changes, stabilization, or anything that could break the project contract across multiple areas.

Do not invoke full gate as filler.

Do not pretend a quick syntax check is a full gate.

Do not make every tiny edit wait on the full battery unless the repo or human explicitly requires it.

Use focused checks for small changes.

Use the full gate when the project needs high confidence that contracts, schemas, intents, docs, examples, and release assumptions still agree.

## Pull requests and merge conflicts are resolvable by intent

A pull request is not only a diff.

A merge conflict is not only a text collision.

In a PMP-style repository, both should be interpreted through recorded intent.

If workorders exist, an AI assistant, maintainer, or reviewer can inspect the workorder history and ask:

```text
What was this change trying to accomplish?
What constraints was it preserving?
What was explicitly out of scope?
Which later workorder superseded or refined the earlier intent?
Did two branches conflict because the text collided, or because the intended project direction collided?
```

That makes many conflicts easier to resolve.

The correct resolution is not always "pick ours" or "pick theirs."

Sometimes the correct resolution is:

```text
1. Read the competing workorders.
2. Identify the two intents.
3. Decide whether they are compatible.
4. If compatible, merge the intent, not just the text.
5. If incompatible, stop and ask the human for the governing decision.
6. Create a new resolving workorder that records the decision.
7. Apply the code or document change according to that new workorder.
```

This is one of the main reasons workorders matter.

A finished diff shows what changed.

A workorder explains why the change was supposed to happen.

When conflicts happen, the "why" is often the part an AI needs most.

## Resolving workorders

A resolving workorder is a new workorder created specifically to settle competing intents.

Use one when:

- two pull requests modify the same doctrine, schema, command, or architecture area;
- two branches both appear reasonable but imply different project directions;
- a conflict cannot be safely solved from the diff alone;
- prior instructions are stale, ambiguous, or partially superseded;
- the human makes a new decision that should govern the merge.

A resolving workorder should include:

```text
# Resolve <conflict or competing intent>

## Purpose
## Conflicting workorders or branches
## Intent A
## Intent B
## Governing decision
## Files/areas to reconcile
## Out of scope
## Required checks
## Expected result
## Completion note
```

The executor should then cite the resolving workorder in the PR or merge completion notes.

Suggested language:

```text
## Workorder
Executed: workorders/YYYY-MM-DD-HHMM-by-githubusername-resolve-<topic>.md

## Conflict resolution
Resolved competing intent between:
- workorders/<older-intent>.md
- workorders/<newer-intent>.md
```

Do not let the merge tool become the project manager.

The project manager is the recorded intent.

## Default A-to-B instruction shape

A good human-to-AI instruction for this kind of repo looks like this:

```text
Repo:
  <owner/repo or local path>

Lane:
  doctrine | proposal concept | implementation | workorder | demo artifact | README/docs | architecture correction

Current base:
  <file path, pasted file, recent commit, screenshot, or current behavior>

Target:
  <what B should look like>

Constraints:
  <what must not be implied, broken, expanded, or silently changed>

Output:
  <new file, patched file, workorder, implementation prompt, repo note, architecture decision text>
```

That is the structured “let’s go from A to B” mode.

Not word salad.

Not vibes only.

A to B.

## Why we did this

Two core projects we are working on are highly AI-disciplined complex architectures:

- Polycentric Federated Evidence Mesh
- Polycentric Federated Command Mesh

We needed a GitHub-repo-based command central for teamwork governing AI-human interaction and project discipline.

Those particular projects may not be suitable for everyone.

But the project management and architecture cognition problem for AI systems is much broader than those projects.

AI-assisted development needs more than prompts, chats, and generated code.

It needs durable project memory.

It needs intent records.

It needs workorders.

It needs break words.

It needs full gates.

It needs a way for humans and AI systems to share enough structure that the AI can act with confidence instead of guessing from vibes.

We believe this kind of project management and architecture cognition is crucial and applicable to most, if not all, AI-assisted development projects.

It has already been highly effective for our own work.

We are sharing this first pass with the community at large so other people can fork it, adapt it, argue with it, simplify it, harden it, and use it as a starting point for their own AI-governed project workflows.

## Examples

See [`examples/README.md`](examples/README.md).

This folder is for examples of what you can do when your AI has full cognition-first context about your projects.

The examples are not meant to prove that a finished system exists.

They are meant to show how project memory, architecture cognition, constraints, roles, intent, and concrete artifacts can work together when the AI knows what kind of project it is helping with.
