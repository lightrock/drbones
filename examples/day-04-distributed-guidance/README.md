# Day in the life 4: distribute AI guidance into semantic folders

This example shows a PMP-style repo-governance cleanup.

The human has noticed a common failure mode:

```text
Everything gets stuffed into the root AGENTS.md.
```

That feels convenient at first, but it turns the root agent file into a giant mixed-purpose prompt pile. Future agents have to read too much, and folder-specific rules lose their authority.

The point is simple:

```text
Root AGENTS.md should define global operating discipline.
Folder-level AGENTS.md and README.md files should define local semantics.
```

## The human request

```text
Make sure the AI repo guidance is not stuffing everything into the main AGENTS.md.
Put AGENTS.md files and/or README.md files in appropriately specific governing places in the repo folder architecture for the semantics of the repo folder structure and subsystems.
```

## The foreground AI response

```text
Current state:
  The repo may rely too heavily on the root AGENTS.md for all AI instructions.
  Some folder-specific semantics may belong closer to the folders they govern.

Target:
  Keep root AGENTS.md as global operating discipline.
  Add or update folder-level AGENTS.md and README.md files where local semantics matter.
  Make the repo teach future agents from the correct architectural location.

Constraint:
  Do not scatter instructions randomly.
  Do not duplicate global rules everywhere.
  Do not create folder-level AGENTS.md files where a short README note is enough.
  Do not bury safety-critical global rules in a local folder.

Foreground/executor decision:
  This should become a workorder because it requires inspecting folder semantics, moving or splitting guidance, and possibly updating checks/tests.

Next move:
  Create a dated governance-distribution workorder for a coding agent.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-25-1530-by-lightrock-distribute-agent-guidance.md
```

The workorder tells the coding agent to:

```text
1. Inspect the current repository tree.
2. Read root AGENTS.md and README.md.
3. Read existing README.md or AGENTS.md files in subfolders.
4. Identify guidance currently in root AGENTS.md that is actually folder-specific.
5. Move or restate folder-specific guidance into the appropriate folder README.md or AGENTS.md.
6. Keep root AGENTS.md focused on global agent behavior, cross-repo discipline, foreground/executor distinction, workorder rules, and universal safety/stop conditions.
7. Use folder-level AGENTS.md only when agents working inside that folder need operating rules different from the global rules.
8. Use folder-level README.md when the folder needs human/agent explanation but not a separate operating contract.
9. Avoid duplicate instruction drift: do not copy the same long rule into many folders unless the local folder must own it.
10. Update examples/README.md, docs, or repository maps if new guidance files are added.
11. Update tools/pmp_check.py and tests/test_pmp_check.py only if the repo should enforce discovery or placement of folder-level guidance.
12. Run python tools/pmp_check.py --area all.
13. Run python -m pytest.
14. Keep working until checks pass or report a real blocker.
15. Create or propose a lesson learned if root AGENTS.md had become a junk drawer for local semantics.
```

## Global vs local guidance

The executor should preserve this distinction:

```text
Root AGENTS.md:
  - global agent behavior
  - foreground AI behavior
  - executor AI behavior
  - workorder rules
  - copy/paste prompt hygiene
  - repo-state-beats-chat-memory rule
  - universal stop conditions
  - global completion-report expectations

Folder AGENTS.md:
  - local operating rules for agents editing that folder
  - local invariants
  - local generated-file rules
  - local safety boundaries
  - local test/check expectations

Folder README.md:
  - what this folder is for
  - what belongs here
  - what does not belong here
  - how humans and agents should understand the folder
```

## Example folder semantics

A PMP-style repo might eventually teach folder semantics this way:

```text
workorders/AGENTS.md
  Rules for creating, naming, executing, and completing workorders.

schemas/README.md
  Explains that schemas are machine-readable contracts, not casual examples.

tools/AGENTS.md
  Rules for governance checkers and CLI tools.

tests/AGENTS.md
  Rules for test expectations and what must be updated when contracts change.

examples/README.md
  Explains that examples are communication artifacts, not finished product claims.

docs/architecture/README.md
  Explains where governing architecture doctrine lives.
```

The exact files should be chosen after inspecting the repo. The workorder should not force useless local files just to look organized.

## What the coding agent should report

```text
Changed files:
  - list every changed file

Added guidance files:
  - path
  - why the guidance belongs there instead of root AGENTS.md

Root AGENTS.md cleanup:
  - what stayed global
  - what moved local
  - what was removed as duplicate or stale

Checks run:
  - python tools/pmp_check.py --area all
  - python -m pytest

Checks passed or failed:
  - report actual result

Checks not run and why:
  - report actual reason, if any

Lessons learned:
  - created, proposed, or not needed

Open questions:
  - any folder-semantics decision needing human approval

Workorder:
  - workorders/2026-05-25-1530-by-lightrock-distribute-agent-guidance.md
```

## What this demonstrates

AI guidance is part of repo architecture.

A root `AGENTS.md` is useful, but it should not become a landfill for every local rule.

Folder-specific semantics should live near the folder they govern so future agents do not have to infer local rules from a giant global document.

## The practical lesson

Put rules where they have authority.

```text
global rules belong at the root
folder rules belong in the folder
human/agent explanations belong in README.md
operating contracts belong in AGENTS.md
machine-readable contracts belong in schemas/
checks belong in tools/ and tests/
```

The repo should teach agents through structure, not through one enormous prompt file.
