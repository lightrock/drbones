# Architecture lenses

This doctrine file holds PFEM-lite and PFCOMM-lite routing rules from root `AGENTS.md`.

## PFEM-lite and PFCOMM-lite analysis references

Doctor Bones carries small embedded reference snapshots for PFEM and PFCOMM:

```text
docs/internal-reference/pfem-lite.md
docs/internal-reference/pfcomm-lite.md
```

Use `pfem-lite.md` when the human asks for PFEM-style analysis, evidence-boundary comparison, source/provenance/confidence review, evidence/package/report/rollup review, MCP/tool authority boundary review, or external-repo critique and the live PFEM repository is not being inspected.

Use `pfcomm-lite.md` when the human asks for PFCOMM-style analysis, command/tasking/status review, authority/context review, coordination-message review, action-receipt review, after-action accountability review, MCP/tool authority boundary review, or external-repo critique and the live PFCOMM repository is not being inspected.

Read both files when the human asks for PFEM/PFCOMM comparison, evidence-to-command boundary analysis, or a review involving both evidence governance and command/coordination discipline.

PFEM-lite is enough for a useful first-pass analysis of:

```text
raw evidence
normalized observations
correlated entities or tracks
findings
alerts
evidence packages
dashboard actions
federation messages
rollup summaries
reports
MCP/tool exposure as callable interface rather than domain authority
workorders as durable task contracts
checks/gates as proof discipline
```

When performing PFEM-lite analysis of a target repository, include a reasonable but not exhaustive check of the target repo's test and check coverage. Look for tests, fixtures, schema checks, contract tests, golden outputs, CI workflows, validation scripts, or documented gates that prove important evidence-boundary behavior. Focus on whether the repo tests the boundaries PFEM-lite cares about: source input to normalized record, normalized record to finding, finding to report/package/rollup, confidence and provenance preservation, tool/MCP read-vs-mutate authority, and error or stale-data handling. Do not turn this into a full test audit unless the human asks. Say what test/check files or workflows you inspected, and be clear when coverage was not checked or could not be determined.

PFCOMM-lite is enough for a useful first-pass analysis of:

```text
command intent
authority context
tasking
assignments
resources
operational status
action receipts
escalation requests
coordination messages
decision logs
after-action records
reports
MCP/tool exposure as callable interface rather than domain authority
workorders as durable task contracts
checks/gates as proof discipline
```

Do not claim PFEM-lite is the full PFEM architecture or PFCOMM-lite is the full PFCOMM architecture. If the human asks for a full PFEM or PFCOMM comparison, inspect the current `lightrock/PFEM` or `lightrock/PFCOMM` repository state and report which files were actually read.

## PFEM-lite concrete artifacts

Doctor Bones carries a small PFEM-lite artifact pack so boundary discipline is not only prose:

```text
schemas/evidence.schema.json
schemas/finding.schema.json
schemas/remediation.schema.json
schemas/evaluation-result.schema.json
schemas/handoff.schema.json
schemas/completion-report.schema.json
rubrics/patch-is-not-verification.md
examples/pfem-lite-boundary-artifacts/README.md
```

These artifacts are intentionally modest. They are starter contracts for AI-assisted project discipline, not a replacement for the full PFEM architecture.

Use `rubrics/patch-is-not-verification.md` when reviewing an executor completion note, PR body, or AI answer that claims coding work is done. The rule is:

```text
A patch is an action.
Verification is evidence that the action produced the intended result.
Do not collapse them.
```
