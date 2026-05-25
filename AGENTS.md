# AGENTS.md

This file is for AI assistants and executor agents working inside a PMP-style repository.

The human-readable README may explain the project in a feral, manifesto-like way. This file turns the operating discipline into direct agent instructions.

## Core rule

Do not produce word salad.

Help the human go from A to B with direction, purpose, constraints, and durable project memory.

Current repository state beats chat memory.

If repository state conflicts with remembered context, inspect the repo and report the conflict instead of guessing.

## Starting a new project from this skeleton

If this skeleton is being used to start a new project, use GitHub's **Use this template** feature to create a new repository.

Then treat the new project repository as the durable project memory for the work.

The project should not live only in chat.

## Foreground AI behavior

A foreground AI is the planning and intent-capture assistant.

It should:

```text
1. Inspect the current repository state.
2. Read README.md and AGENTS.md.
3. Read existing workorders, handoffs, lessons learned, and doctrine files if they exist.
4. Identify the lane.
5. Identify the current base.
6. Identify the target.
7. Identify constraints.
8. Produce the smallest useful concrete output.
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

When creating a workorder for an executor, include governance that says the executor must run the named checks, keep working until the required checks pass or a real blocker is reported, and create a lesson learned when the work reveals a repeated, expensive, dangerous, or confusing failure pattern.

## Executor AI behavior

An executor AI performs the named scope.

It should not silently expand the project.

When given a workorder, it must:

```text
1. Read the exact committed workorder file.
2. Inspect recent workorders for overlap or conflict before editing.
3. Perform only the named scope unless the human explicitly expands it.
4. Run the required checks, or the closest available checks.
5. Keep working until the required checks pass, unless blocked by missing authority, missing access, unsafe ambiguity, or a real conflict with the workorder/repo doctrine.
6. If blocked, report the blocker precisely and stop instead of pretending completion.
7. Report exactly what changed and what checks ran.
8. Reference the exact workorder path in completion notes and pull request text.
```

Passing checks does not authorize scope expansion. Failing checks are not optional. If the executor cannot make the required checks pass, it must report what failed, why it could not fix the failure within scope, and what human decision or follow-up workorder is needed.

If the work exposes a repeated mistake, missing rule, fragile workflow, ambiguous command, misleading documentation, or architectural trap, the executor should create or propose a lesson learned in the repo rather than leaving the discovery trapped in chat.

## Workorders

Use a workorder when the task is substantial, process-sensitive, intended for another executor, likely to affect future contributor behavior, or needs durable intent before implementation.

When the human says:

```text
make a workorder
create a workorder
write a workorder
```

create a dated workorder under `workorders/` and give the exact executor line:

```text
Read workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md and execute it.
```

Use this filename shape:

```text
workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md
```

Do not use `current-task.md`, `latest.md`, or `next.md`.

Those names destroy history.

## Start a new tab

When the human says:

```text
start a new tab
```

Do not continue implementation work.

Produce a copy/paste-ready handoff prompt for a new working context.

The handoff should tell the next worker:

```text
repository: <owner/repo>
current repo state beats chat memory
read README.md and AGENTS.md
read relevant workorders and doctrine files
identify current state as "verify against repo"
state the project lane
state the constraints
state what not to do
state the next likely work
make the smallest doctrine-preserving change when unsure
```

Do not expose private chain-of-thought.

Provide architecture rationale, operating discipline, repo-reading instructions, decision rules, and safety checks.

## Break words

Break words are caution lights.

They are not banned words.

When a break word is ambiguous:

```text
1. Stop implementation work.
2. Name the ambiguity.
3. Explain the distinction in plain language.
4. Ask or infer which meaning is intended only if the repo/task context makes that safe.
5. Continue with the smallest doctrine-preserving change.
```

Do not use break words as an excuse to stall obvious small edits.

Use them when continuing under the wrong meaning could create wrong architecture, wrong records, wrong checks, or misleading documentation.

## Full gates

A full gate is the full battery of project checks.

It is not one magic test.

It is the codified set of checks that proves, as far as the repository can prove, that the project still hangs together across important boundaries: contracts, schemas, generated files, workorder references, intent preservation, terminology rules, examples, fixtures, docs, policy/profile separation, security or safety assumptions, and release expectations.

Lite checks are for fast feedback.

Focused checks are for the area being changed.

Full gates are for release preparation, semantic closure, broad plumbing changes, stabilization, or anything that could break the project contract across multiple areas.

Do not pretend a quick syntax check is a full gate.

## Lessons learned

A lesson learned is not a diary entry.

A lesson learned records a repeated, expensive, dangerous, confusing, or high-impact failure pattern so future humans and AI systems do not have to rediscover it.

Create or propose a lesson learned when:

```text
1. The same mistake happened more than once.
2. An AI made a plausible but wrong assumption.
3. A command, workorder, file path, check, or workflow was ambiguous.
4. A missing rule caused wasted work or unsafe confidence.
5. A generated artifact looked correct but implied the wrong capability.
6. A human had to explain a boundary that should have been repo-visible.
```

Do not generate lessons learned as ceremony for every tiny edit. Use them when the repo should remember the failure pattern.

## Pull requests and merge conflicts

A pull request is not only a diff.

A merge conflict is not only a text collision.

In a PMP-style repository, both should be interpreted through recorded intent.

If workorders exist, inspect the workorder history and ask:

```text
What was this change trying to accomplish?
What constraints was it preserving?
What was explicitly out of scope?
Which later workorder superseded or refined the earlier intent?
Did two branches conflict because the text collided, or because the intended project direction collided?
```

If the intents are compatible, merge the intent, not just the text.

If the intents are incompatible, stop and ask the human for the governing decision.

Create a resolving workorder when needed.

## Folder hierarchy doctrine

Project folder hierarchy should reflect semantic cognition for AI systems.

Do not blindly copy MVC, CRUD-app, or framework-default patterns unless those patterns genuinely express the architecture the project needs.

A PMP-style repository is architecture-first.

Folder names are instructions to future humans and AI assistants.

Use folders that expose the real project concepts: doctrine, architecture, contracts, schemas, workorders, checks, examples, demos, lessons learned, handoffs, and intent records.

## Standing constraint

Humans remain in authority.

AI-readable architecture cognition is the operating substrate.

Human-facing documentation is a view, explanation, and audit artifact generated from that substrate.
