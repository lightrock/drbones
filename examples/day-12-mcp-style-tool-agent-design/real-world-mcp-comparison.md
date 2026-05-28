# Real-world MCP examples compared to Day 12

Most working MCP-style examples teach one necessary thing:

```text
Here is how to wire a model to tools.
```

Day 12 teaches the layer that usually gets skipped:

```text
Here is how to decide what tools an agent should be allowed to have,
what authority those tools carry,
and how to prove the outcome.
```

Both are useful. They solve different problems.

## What real MCP examples usually show

A typical pedagogical MCP example has this shape:

```text
agent host
→ MCP client
→ MCP server
→ tool or resource
→ model calls tool
→ result comes back
```

Common examples include:

```text
filesystem access
GitHub or Git access
database queries
Slack or chat tools
Google Drive or document tools
browser automation
Playwright or Puppeteer-style testing
local scripts or shell helpers
```

Those examples are good at teaching plumbing:

```text
how to expose a tool
how to describe tool inputs
how the assistant calls the tool
how a server returns results
how many tools can become available through a common interface
```

That is necessary, but it is not enough.

## The question Day 12 asks

A normal MCP tutorial asks:

```text
Can the AI call this tool?
```

Day 12 asks:

```text
Should the AI be allowed to call this tool?
Under what conditions?
With what approval?
With what proof afterward?
```

That is the architecture boundary.

## Filesystem example

A filesystem tutorial may show an assistant reading or writing local files.

Day 12 asks:

```text
Is this read-only or write-capable?
Which folders are in scope?
Can it delete files?
Can it overwrite files?
Does it need a workorder first?
How do we prove what changed?
What checks must run afterward?
```

The correct first version is usually read-only.

A write-capable version should require a bounded workorder, inspectable diff, and checks.

## GitHub example

A GitHub MCP-style tutorial may show an assistant reading issues, opening issues, commenting, or creating pull requests.

Day 12 asks:

```text
Is issue creation a draft tool or an action tool?
Can the agent close issues?
Can it add labels?
Can it merge pull requests?
Can it edit release notes?
What source authority controls the change?
What completion note is required?
```

Reading an issue is not the same as changing project state.

Opening an issue is not the same as deciding the project direction.

Merging a pull request is not the same authority level as drafting one.

## Browser automation example

A browser automation example may show Playwright or Puppeteer driving a website.

Day 12 asks:

```text
Is this a test environment or production?
Can it submit forms?
Can it buy things?
Can it send messages?
Can it mutate accounts?
What proof is captured: screenshot, trace, log, exit code, or status page?
```

A browser tool gives the agent hands.

Hands need boundaries.

## Database example

A database example may show an assistant querying a database.

Day 12 asks:

```text
Is the tool read-only?
Can it see private data?
Can it write, update, or delete records?
Are queries logged?
Are results redacted?
What schema or contract defines allowed access?
Who approves migrations or destructive operations?
```

A query result is not global truth.

A local database row is not necessarily current business state.

## Slack or chat example

A chat integration may show an assistant reading channels or posting replies.

Day 12 asks:

```text
Can the agent only summarize?
Can it post drafts?
Can it post directly?
Which channels are in scope?
Can it mention users?
Can it trigger workflows?
What counts as human approval?
How are source messages cited or preserved?
```

A summary is not a decision.

A draft is not approval.

A posted message is an action.

## Why PFEM/PFCOMM-style discipline matters

Tool-using agents can easily collapse separate things into one misleading story:

```text
observed source material
→ AI summary
→ recommendation
→ command
→ execution
→ claimed success
```

Those are not the same thing.

Day 12 preserves these boundaries:

```text
raw evidence is not normalized evidence
normalized evidence is not a finding
a finding is not a report
a report is not a command
a command is not execution
execution is not proof
local evidence is not global truth
rollup status is not raw evidence
AI recommendation is not authority
```

That discipline is what turns a tool demo into a governable workflow.

## What Day 12 adds pedagogically

A normal tutorial says:

```text
Here is a tool schema.
Here is how to call it.
```

Day 12 says every tool needs a contract:

```text
name
purpose
allowed inputs
forbidden inputs
outputs
side effects
failure behavior
timeout/retry behavior
logging or audit behavior
approval requirement
checks after use
```

It also classifies tools by authority:

```text
Read tools:
  inspect files, docs, issues, logs, status

Draft tools:
  create proposed workorders, reports, issue bodies, patches

Action tools:
  write files, open issues, run commands, call APIs, publish, deploy, send, delete, charge

Proof tools:
  run tests, validate schemas, inspect diffs, fetch created records, check logs
```

That classification is more useful than saying "the agent has tools."

## What working examples are good for

Working examples are still important.

They teach capability:

```text
The model can call a tool.
The model can read files.
The model can query GitHub.
The model can drive a browser.
The model can inspect a database.
```

Day 12 teaches governability:

```text
What is the mission?
What tools exist?
Which are read-only?
Which have side effects?
Who approves action?
What proves success?
What happens on failure?
What is out of scope?
```

A complete education needs both.

## Suggested learning sequence

A safe pedagogical sequence is:

```text
1. Build a tiny MCP-style server.
2. Expose one read-only tool.
3. Add a draft tool.
4. Add a proof/check tool.
5. Only then consider an action tool.
6. Require a workorder and approval gate before action tools mutate anything.
```

That sequence makes tool use real without making it reckless.

## Bottom line

Real-world MCP examples show capability.

Day 12 adds authority discipline.

The best agent architecture needs both:

```text
working tool integration
+ explicit authority boundaries
+ approval gates
+ proof paths
+ completion reporting
```

Do not give an AI a loaded nail gun and call it innovation.

Design the authority boundary first. Then expose the smallest useful tool.
