# Day in the life 15: make your foreground AI smarter with reference repos

This example is about giving a foreground AI focused architecture context before it writes advice, plans, or repo changes.

The point is simple:

```text
Load relevant reference repositories on purpose.
Keep the current repo boundary clear.
```

## Human request

```text
Before you give architecture advice for this repo, load up on the following reference repositories.
```

Example reference repositories:

- `lightrock/PFEM`
- `lightrock/PFCOMM`

These are examples. A different project may name different reference repositories.

A reference repo can be:

- an architecture repo
- a method library
- a playbook collection
- a standards/example repo
- a prior project with reusable patterns

For example, a repository like `skills-for-humanity` could be loaded as a method-library reference repo. The foreground AI should inspect it, identify portable reasoning procedures, and use them only when the human asks to port, adapt, compare, or load up on that source.

## Source roles

Current repo:

- The repository being changed or advised on.
- Owns its own workorders, playbooks, examples, checks, handoff rules, and current repo state.

Reference repo example: PFEM

- PFEM is an evidence architecture source.
- It may be useful for evidence boundaries, provenance, normalization, findings, reports, packages, rollups, and proof discipline.

Reference repo example: PFCOMM

- PFCOMM is a communication architecture source.
- It may be useful for requests, status, handoffs, approvals, coordination, and human-AI communication boundaries.

Reference repo example: method library

- A method-library repo is a source of reusable procedures.
- It may be useful for extracting named reasoning workflows, routing patterns, checklists, or playbook candidates.
- It should not be copied wholesale. The foreground AI should classify what is portable, what is vendor-specific, and what belongs only in the reference repo.

## Checklist

Before writing advice based on reference repositories, the foreground AI should answer:

- Which current-repo files were read?
- Which reference repositories were named by the human?
- Which reference files were read?
- What transfers cleanly into the current repo?
- What belongs only in a reference repo?
- What is source-backed?
- What is inference?
- What should the current repo do next, if anything?

## Practical lesson

A smarter foreground AI is not just a longer prompt.

It is a source-aware setup:

- current repo first
- selected reference repos second
- clear transfer rules
- bounded next action

Load more context. Keep sharper boundaries.
