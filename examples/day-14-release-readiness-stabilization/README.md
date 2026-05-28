# Day in the life 14: stop adding bones and check the skeleton

This example is not about adding another feature, workflow, playbook, or clever architecture idea.

It is about knowing when the repo has grown enough that the next responsible move is stabilization.

The point is simple:

```text
After rapid architecture growth, stop adding bones and check whether the skeleton still hangs together.
```

## The human request

```text
We added a lot of examples and playbooks. Run a release-readiness pass before we tag a new version. Check whether the repo still hangs together.
```

## Release identity rule

Before recommending, naming, drafting, tagging, or announcing a release version, verify the current release state from repository evidence.

Do not guess the current or next version from chat memory.

Check one or more of these sources, depending on what is available:

```text
Git tags
GitHub releases
CHANGELOG or release notes
version file or package metadata
recent release workorders
explicit human statement in the current conversation
```

If the human gives the current release number in the current conversation, use that as the current working fact and say so. If repo evidence and the human statement conflict, report the conflict before recommending the next version.

When giving a release recommendation, state the basis:

```text
Current release verified from: <source>
Current release: <version>
Recommended next release: <version>
Reason: patch / minor / major / not ready
```

For Doctor Bones specifically, remember the correction that `v0.5.0` already happened; the next cleanup release discussed here is `v0.5.1` unless repository evidence or the human says otherwise.

## The foreground AI response

```text
Current state:
  The repo has expanded with new examples, wiki pages, playbooks, and governance language.
  Recent additions include project wiki guidance, knowledge-bank workflow, vendor-independent playbooks, MCP-style tool-agent design, and outside-agent-pattern distillation.
  Current and next release identity must be verified from tags, releases, release notes, package metadata, workorders, or explicit current-conversation human instruction before naming a version.

Target:
  Create a bounded stabilization workorder that checks consistency across README, AGENTS.md, readme_pmp.md, playbooks, examples, wiki pages, workorders, schemas, tests, and release notes.

Constraint:
  Do not introduce new doctrine unless required to fix a contradiction.
  Do not rename the project during stabilization.
  Do not add new features.
  Do not turn stabilization into another architecture expansion.
  Do not guess the current or next release number from memory.
  Prefer issues or follow-up workorders for larger changes.

Foreground/executor decision:
  This should become a workorder because it requires repo inspection, link/path checks, tests, release identity checks, and possibly multiple small corrections.

Next move:
  Create a dated release-readiness stabilization workorder.
```

## The workflow

```text
recent repo growth
→ inspect changed areas
→ verify current release identity
→ recommend next release only after evidence check
→ check docs/wiki/examples/playbooks/workorders alignment
→ find stale names, contradictions, and broken links
→ verify repo map and source authority rules
→ run checks
→ record unresolved issues
→ decide release readiness
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-26-1930-by-lightrock-release-readiness-pass.md
```

The workorder tells the executor to:

```text
1. Inspect the current repository state.
2. Read README.md, readme_pmp.md if present, AGENTS.md, examples/README.md, playbooks/README.md, docs/wiki/*.md, workorders/README.md, and relevant release notes.
3. Verify the current release version and likely next release version from Git tags, GitHub releases, CHANGELOG/release notes, package metadata, recent release workorders, or explicit current-conversation human instruction.
4. If release sources conflict, report the conflict before recommending or tagging a version.
5. Verify every day-in-the-life example is linked from examples/README.md.
6. Verify every major invocable workflow is represented consistently in the wiki and long guide.
7. Verify every playbook is discoverable from playbooks/README.md and any relevant examples/wiki pages.
8. Check that AGENTS.md, workorders, playbooks, examples, and wiki pages agree on authority boundaries.
9. Check stale naming or branding references without doing a rename.
10. Check that risky examples, especially trend-to-product or tool-agent examples, are safely framed.
11. Check that workorders remain one-time task contracts and playbooks remain reusable workflow guidance.
12. Check that examples remain teaching artifacts, not finished-product claims.
13. Run required checks.
14. Keep working until checks pass or report a real blocker.
15. Record unresolved issues in a needs-human-decision page, issue, or follow-up workorder only if needed.
16. Do not broaden scope into new feature work.
17. Create or propose a lesson learned if the stabilization pass reveals a repeated drift pattern.
```

## Required checks

At minimum, run:

```text
python tools/pmp_check.py --area all
python -m pytest
```

Also perform a focused manual check for:

```text
- current release tag / release notes / package metadata alignment
- next release recommendation based on actual current release state
- broken relative links in README/readme_pmp/wiki/examples/playbooks
- examples listed in examples/README.md
- playbooks listed in playbooks/README.md or linked from relevant docs
- repo map accuracy
- stale references to old names or incomplete concepts
- examples that accidentally sound like product claims
- workorders or examples that imply unsafe autonomous action
```

If a local link checker or markdown checker exists, use it. If not, report that no such checker exists and perform a manual path/link review.

## Expected output

The executor should produce a stabilization report with:

```text
Changed files:
  - list every changed file

Reviewed areas:
  - README.md
  - readme_pmp.md
  - AGENTS.md
  - examples/
  - playbooks/
  - docs/wiki/
  - workorders/
  - schemas/
  - tests/
  - release tags / release notes / package metadata

Release identity:
  - current release verified from <source>
  - current release is <version>
  - recommended next release is <version>
  - reason is patch / minor / major / not ready

Consistency findings:
  - aligned items
  - stale or conflicting items fixed
  - unresolved items preserved for human decision

Checks run:
  - exact commands

Checks passed or failed:
  - actual results

Follow-up work:
  - issues or workorders proposed
  - release blocker or not

Release-readiness recommendation:
  - ready to tag
  - ready after small fixes
  - not ready; blockers listed

Lessons learned:
  - created, proposed, or not needed
```

## What this demonstrates

Architecture work has a lifecycle:

```text
invent
→ capture
→ link
→ check
→ stabilize
→ verify release identity
→ release
```

Without stabilization, even good architecture can become a brilliant junk drawer.

## The practical lesson

A repo can get smarter quickly, but smart does not mean stable.

After a fast run of new doctrine, examples, playbooks, and wiki pages, the responsible move is to stop, check coherence, verify current release identity, run the gates, and decide whether the skeleton is ready for a release.
