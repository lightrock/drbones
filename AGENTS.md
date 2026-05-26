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

A foreground AI must also check itself before acting. If the next move would require many file edits, repeated repo mutations, running checks, debugging failures, or verifying behavior in a real environment, the foreground AI should stop and create a workorder for an executor instead of trying to perform an implementation chain from chat or a read-only connector.

A foreground AI may make small, bounded documentation or repo edits directly when the change is low-risk, easy to inspect, and does not require running a local environment. When the work needs an execution environment, terminal access, test runs, or iterative debugging, the correct output is a workorder plus an exact executor instruction.

When creating a workorder for an executor, include governance that says the executor must run the named checks, keep working until the required checks pass or a real blocker is reported, and create a lesson learned when the work reveals a repeated, expensive, dangerous, or confusing failure pattern.

## Day-in-the-life trigger map

The day-in-the-life examples are not only reading material. They are pattern examples the foreground AI should consult when the human request matches the pattern.

When a prompt matches one of these situations, read the matching example before responding, creating a workorder, or editing files. If more than one pattern applies, read the most specific examples first.

```text
Day 1: normal PMP-style workflow
  Read when the request is a normal repo-guidance or workorder-to-executor flow.
  examples/day-in-the-life-1/README.md

Day 2: repo identity
  Read when the request involves startup prompts, repo naming, explicit repository identity, or preventing new chats from guessing the wrong repo.
  examples/day-in-the-life-2/README.md

Day 3: architecture doctrine migration
  Read when the human changes governing architecture principles or asks to migrate doctrine across guidance, checks, examples, and tests.
  examples/day-in-the-life-3/README.md

Day 4: distributed guidance
  Read when the request is about keeping root AGENTS.md global and moving folder-specific guidance into the right folder-level files.
  examples/day-in-the-life-4/README.md

Day 5: vendor adapter workflow
  Read when the request involves building an adapter from API docs, vendor docs, sample data, mock behavior, normalization, or adapter tests.
  examples/day-in-the-life-5/README.md

Day 6: release-surface mapping
  Read when the request involves versions, release notes, metadata, artifacts, deployment surfaces, platform-specific release chores, or release automation.
  examples/day-in-the-life-6/README.md

Day 7: vigilance check
  Read when the human asks to watch, inspect, scan, or review important change sources and open issues or workorders only when evidence justifies action.
  examples/day-in-the-life-7/README.md

Day 8: contradiction scan
  Read when the request is to compare claims across docs, issues, examples, workorders, schemas, tests, implementation, or repo state.
  examples/day-in-the-life-8/README.md

Day 9: project wiki build
  Read when the request is to make, update, or organize a project wiki or turn scattered context into navigable docs.
  examples/day-in-the-life-9/README.md

Day 10: project knowledge bank
  Read when the request is to collect reusable phrases, examples, patterns, do-not-say rules, source-backed snippets, or project-specific reusable material.
  examples/day-in-the-life-10/README.md

Day 11: playbook packaging
  Read when the request is to turn a reusable workflow into vendor-independent repo-owned guidance.
  examples/day-in-the-life-11/README.md

Day 12: MCP-style tool-agent design
  Read when the request involves MCP, tool-using agents, tool contracts, approval gates, proof paths, or exposing repo/tool capabilities to an AI assistant.
  examples/day-in-the-life-12/README.md

Day 13: outside agent pattern distillation
  Read when the human brings in an outside agent idea, product pitch, Reddit/HN post, demo, or workflow and asks whether to copy, adapt, or learn from it.
  examples/day-in-the-life-13/README.md

Day 14: release-readiness stabilization
  Read when the request is to stabilize, check coherence, prepare a release, verify links/maps/examples/playbooks, or stop adding new doctrine and check the skeleton.
  examples/day-in-the-life-14/README.md

Day 15: reference repository context
  Read when the human names reference repositories, says to load up on other repos, says to load the foreground AI's brain, or asks for architecture advice based on another repo.
  examples/day-in-the-life-15/README.md

Day 16: human correction into repo memory
  Read when a human correction reveals that a future AI might repeat the same mistake unless the repo records a rule, trigger, checklist, or boundary.
  examples/day-in-the-life-16/README.md
```

These examples do not override AGENTS.md, human instruction, workorders, checks, or safety constraints. They help the foreground AI recognize the workflow shape and choose the right repo surface.

Before using any example as a pattern, preserve this distinction:

```text
README.md = human landing-page clarity
AGENTS.md = standing AI operating rules and trigger conditions
workorders/ = one-time task contracts
playbooks/ = reusable workflow guidance
examples/ = teaching stories and pattern demonstrations
docs/wiki/ = navigation and cross-links
lessons learned = repeated failure patterns the repo should remember
```

## Foreground output discipline

A foreground AI should keep the human's workflow in one coherent lane.

Do not accidentally switch into image generation, slide generation, document generation, or another artifact mode unless the human explicitly asks for that output type.

Do not split the answer into multiple competing chat results and ask which one the human likes best. Prefer one concrete recommendation, one copy/paste artifact, or one workorder. If alternatives matter, summarize the tradeoff briefly and still give one recommended next move.

When creating a prompt, command, patch, code block, or workorder text that the human is expected to copy and paste, make it clean and self-contained. Do not insert assistant-side comments, citations, markdown decorations, placeholders, or explanatory text inside the copy/paste block if those characters could break execution or change meaning.

Never put comments inside generated commands or code prompts unless the comments are valid for that exact target language or shell and useful to the executor. If in doubt, put explanation before or after the copy/paste block, not inside it.

For coding-agent prompts, provide a single clean block that the user can copy as-is. The block should name the repository/context, exact task, constraints, checks, and expected completion report without requiring the user to merge scattered fragments from the surrounding chat.

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

## Playbooks

Playbooks are vendor-independent, repo-owned instructions for reusable workflows.

They are not Claude Skills, Codex features, ChatGPT memory, or vendor-specific prompt packs.

`AGENTS.md` remains the global operating rule set. Workorders remain one-time task contracts. Playbooks are task-specific reusable workflow guidance.

When a task or workorder references a playbook, the executor must read the matching `playbooks/<workflow-name>/PLAYBOOK.md` before doing the task.

A playbook must not override:

```text
AGENTS.md
workorders
required checks
source authority rules
human approval gates
safety constraints
```

If a playbook conflicts with `AGENTS.md` or the workorder, stop and report the conflict instead of guessing.

Do not run scripts or executable helpers from a playbook unless the workorder or human explicitly authorizes that execution.

Vendor-specific packages may be generated from playbooks later, but the repo playbook remains the source of truth.

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
