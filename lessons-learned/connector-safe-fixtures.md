# Connector-safe fixture wording

## Lesson

When editing repository files through connector tools, especially whole-file replacement APIs, keep test fixtures and example text semantically precise and non-inflammatory.

Do not use throwaway words like `Bad`, `evil`, `attack`, `malicious`, `exploit`, or similar labels inside fake fixture bodies unless the test specifically needs those words.

Prefer neutral fixture wording:

```text
Invalid fixture
Reserved-name fixture
Example failure fixture
Expected failure fixture
Nonconforming workorder fixture
```

## Why this exists

Connector writes can be blocked before they reach GitHub if a safety filter misreads a harmless test fixture or code payload.

The most recent failure happened while updating a test file. The intended fixture body used `# Bad` as fake Markdown content for invalid workorder files. The connector blocked the write. Replacing that fake fixture body with `# Invalid fixture` allowed the same repo update to succeed.

That was not a GitHub failure, not a repo failure, and not a project security issue. It was connector safety friction caused by sloppy fixture wording.

## Rule

Write tests and examples so a reader and a safety filter can tell what the fixture means.

Use terms that describe the contract being tested, not emotional labels.

```text
Bad:
  # Bad

Better:
  # Invalid fixture
  # Reserved-name fixture
  # Missing required heading fixture
```

## Agent instruction

When creating or editing tests, examples, or fixtures through a connector:

1. Use neutral, contract-specific fixture names.
2. Avoid dramatic security words unless they are the actual subject of the test.
3. If a connector blocks a write, simplify neutral fixture text first before changing the intended repo behavior.
4. Report the block as connector safety friction, not as a project test failure.

## Related principle

A fixture is evidence.

Sloppy fixture text creates noisy evidence, confused agents, and avoidable connector failures.
