# Day in the life 15: make your foreground AI smarter with PFEM and PFCOMM

This example is about giving a foreground AI focused architecture context before it writes advice or workorders.

Use only these source repositories for this default pattern:

- `lightrock/PFEM`
- `lightrock/PFCOMM`

Do not include legal billing, SkyWrong, Friction Diction, Mission Program Mesh, or other project repositories unless the human explicitly names them.

## Human request

Ask the foreground AI to read PFEM and PFCOMM before giving architecture advice for DrBones.

## Source roles

DrBones is the current repo. It owns the workorders, playbooks, examples, checks, and handoff rules.

PFEM is the evidence architecture source. Use it for evidence boundaries, provenance, normalization, findings, reports, packages, rollups, and proof discipline.

PFCOMM is the communication architecture source. Use it for requests, status, handoffs, approvals, coordination, and human-AI communication boundaries.

## Checklist

Before writing advice or a workorder, the foreground AI should answer:

- Which DrBones files were read?
- Which PFEM files were read?
- Which PFCOMM files were read?
- What transfers cleanly into DrBones?
- What belongs only in PFEM or PFCOMM?
- What is source-backed?
- What is inference?
- What should DrBones do next, if anything?

## Workorder shape

If this becomes durable work, create a workorder such as:

`workorders/YYYY-MM-DD-HHMM-by-githubusername-load-pfem-pfcomm-context.md`

The workorder should tell the executor to inspect DrBones first, then inspect only `lightrock/PFEM` and `lightrock/PFCOMM`, record files read, preserve source boundaries, and run required checks if files change.

## Practical lesson

A smarter foreground AI is not just a longer prompt.

It is a source-aware setup:

- current repo first
- PFEM for evidence discipline
- PFCOMM for communication discipline
- clear transfer rules
- bounded next action

Load the governing architecture. Keep sharper boundaries.
