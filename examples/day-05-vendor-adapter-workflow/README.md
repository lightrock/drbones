# Day in the life 5: build a vendor adapter from API docs and a known template

This example shows a PMP-style vendor integration workflow.

The human wants a coding agent to read vendor API documentation and build a new adapter according to an existing adapter foundation.

The point is simple:

```text
A vendor adapter is not random glue code.
It is a bounded translation layer with configuration, live/mock behavior, normalization, samples, and tests.
```

## The human request

```text
Go read the vendor API docs for X and make an adapter according to the prescribed foundations in the helloworld adapter template that fully exercises normalization and sample output when not marked "live" in the adapter's configuration JSON.
```

## The foreground AI response

```text
Current state:
  The repo has a helloworld adapter template that defines the expected adapter shape.
  The new vendor adapter must follow that template rather than inventing its own architecture.

Target:
  Add a vendor adapter for X that reads the vendor API docs, maps vendor records into the project's normalized record shape, and produces sample/mock output when the adapter is not configured as live.

Constraint:
  Do not call the real vendor API unless the adapter configuration explicitly marks the adapter as live.
  Do not put vendor-specific weirdness into core project logic.
  Do not collapse raw vendor input, normalized records, alerts/findings, reports, or rollups.
  Do not invent undocumented API fields.
  Preserve sample fixtures showing raw input and normalized output.

Foreground/executor decision:
  This must become a workorder because it requires reading docs, adding files, implementing adapter logic, creating samples, updating config/index metadata, and running tests.

Next move:
  Create a dated vendor-adapter workorder for a coding agent.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-25-1545-by-lightrock-add-vendor-x-adapter.md
```

The workorder tells the coding agent to:

```text
1. Inspect the current repository state.
2. Read README.md, AGENTS.md, and any folder-level AGENTS.md/README.md files that govern adapters, schemas, samples, tests, and generated data.
3. Read the helloworld adapter template and treat it as the required adapter foundation.
4. Read the vendor API docs for X.
5. Record which vendor docs were used and whether any fields are uncertain or undocumented.
6. Create the vendor adapter in the correct vendor/adapter folder.
7. Keep vendor-specific parsing/mapping inside the adapter.
8. Preserve raw vendor events separately from normalized output.
9. Implement normalization from vendor records into the project's normalized record shape.
10. Add config/config.example.json with a live flag or equivalent status field.
11. When the adapter is not marked live in configuration JSON, run only sample/mock/replay behavior.
12. Do not make network/API calls when live is false or absent.
13. Add sample raw input fixtures.
14. Add expected normalized output fixtures.
15. Add a smoke test or focused adapter test that exercises normalization.
16. Add a sample-output test or command that proves non-live mode emits deterministic sample output.
17. Update any adapter index, integration status, or documentation files that list available adapters.
18. Do not mark the adapter live until credentials, endpoint, docs, and operator approval are present.
19. Run the required project checks.
20. Keep working until checks pass or report a real blocker.
21. Create or propose a lesson learned if the vendor docs reveal a repeated adapter-design hazard.
```

## Adapter behavior expected by the workorder

The adapter should have three distinct lanes:

```text
raw vendor input
  -> adapter-specific parser/mapper
  -> normalized project record
  -> sample output or live publish path
```

The adapter should not skip straight from vendor input to alerts, findings, reports, or rollups.

Normalization is the contract.

## Live vs non-live behavior

The configuration should make live behavior explicit.

Example intent:

```json
{
  "adapter": {
    "slug": "vendor-x",
    "display_name": "Vendor X Adapter",
    "status": "mock",
    "live": false
  }
}
```

Expected rule:

```text
live is true:
  Adapter may call the configured vendor endpoint if credentials and endpoint are present.

live is false, missing, mock, docs-pending, or inactive:
  Adapter must not call the vendor endpoint.
  Adapter should use samples/replay/mock output only.
```

The exact field names should follow the repository's existing adapter config convention.

## What the coding agent should report

```text
Changed files:
  - list every changed file

Added adapter files:
  - adapter path
  - parser/mapper files
  - config example
  - raw samples
  - normalized samples
  - tests

Vendor docs used:
  - doc title or URL
  - version/date if available
  - uncertain fields or assumptions

Normalization behavior:
  - raw vendor fields consumed
  - normalized fields produced
  - fields intentionally omitted
  - confidence/quality caveats if applicable

Live/non-live behavior:
  - how live is configured
  - proof that non-live mode uses sample/mock/replay only
  - proof that non-live mode does not call vendor APIs

Checks run:
  - adapter-specific tests
  - python tools/pmp_check.py --area all, if applicable
  - python -m pytest, if applicable
  - any project-specific full or focused gate

Checks passed or failed:
  - report actual result

Checks not run and why:
  - report actual reason, if any

Lessons learned:
  - created, proposed, or not needed

Open questions:
  - missing API docs
  - uncertain vendor fields
  - credential/live deployment requirements

Workorder:
  - workorders/2026-05-25-1545-by-lightrock-add-vendor-x-adapter.md
```

## What this demonstrates

Vendor adapters are architecture boundaries.

They protect the core project from vendor-specific data shapes, field names, API weirdness, auth quirks, rate limits, and incomplete documentation.

The coding agent should not be asked to "just wire the API in."

It should be given a bounded adapter contract:

```text
read docs
follow template
keep vendor weirdness isolated
normalize records
prove sample output
respect live/non-live config
run checks
report assumptions
```

## The practical lesson

A good adapter workorder prevents three common AI-assisted failures:

```text
1. The AI invents vendor fields that were not in the docs.
2. The AI makes live network calls during mock/sample development.
3. The AI bypasses normalization and leaks vendor-specific shape into core logic.
```

The repo should make the safe path boring and obvious.
