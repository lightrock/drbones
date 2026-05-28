# Day in the life 13: steal the pattern, not the product

This example is not about copying every shiny agent demo, startup pitch, Reddit thread, or product workflow that looks interesting.

It is about defining an invocable workflow for learning from outside agent examples without importing hype, unsafe assumptions, vendor lock-in, product claims, or bad authority boundaries.

The point is simple:

```text
Do not copy agent demos.
Extract the pattern, name the risks, define the authority boundary, then decide what belongs in your repo.
```

## The human request

```text
I found a real-world agent example. Figure out whether we should steal the pattern, and if so, turn it into a repo-safe workflow, example, playbook, or workorder without copying the product or importing unsafe assumptions.
```

## The foreground AI response

```text
Current state:
  The repo has durable governance docs, workorders, examples, playbooks, checks, and wiki pages.
  It has a playbook for MCP-style agent design and examples for vigilance, contradiction scanning, wiki building, knowledge banks, and playbook packaging.

Target:
  Analyze the outside agent idea, extract the reusable workflow pattern, classify risks and authority boundaries, and decide whether the idea should become a note, issue, example, playbook, workorder, or nothing.

Constraint:
  Do not copy the product.
  Do not copy branding, proprietary workflow claims, private details, unsafe automation, or vendor-specific assumptions.
  Do not treat a working demo as proof that the architecture is safe.
  Do not create an action agent without tool contracts, approval gates, and proof paths.
  Preserve source links if the outside idea is being cited or summarized.

Foreground/executor decision:
  This can stay in foreground chat for a quick pattern extraction.
  It should become a workorder if it will create repo files, update examples, add a playbook, design tools, or affect future executor behavior.

Next move:
  Produce a pattern extraction report or create a bounded workorder for turning the extracted pattern into repo-owned guidance.
```

## The workflow

```text
outside agent idea
→ summarize the claim
→ extract the actual workflow pattern
→ separate hype from mechanism
→ identify required workspace/context
→ classify tools by authority
→ identify approval gates and proof paths
→ identify legal/security/platform risks
→ decide repo output
```

## Pattern extraction checklist

For each outside idea, answer:

```text
What does the demo claim?
What is the actual workflow underneath?
What source material does it need?
What state does it need to remember?
What tools does it need?
Which tools are read-only?
Which tools draft artifacts?
Which tools take action?
Which tools prove outcomes?
What can go wrong?
What requires human approval?
What should never be automated?
What part is reusable across projects?
What part is product-specific noise?
What should the repo do with this idea?
```

## Repo output decision

The result should be one of:

```text
ignore
  Interesting, but not useful or safe enough.

watch
  Worth monitoring, but not ready for repo action.

note
  Add to a wiki/knowledge page as context.

issue
  Track a possible future improvement.

example
  Create a day-in-the-life teaching example.

playbook
  Create reusable repo-owned guidance.

workorder
  Assign bounded implementation/design work to an executor.

human decision
  Needs an architecture/product/legal/security decision before action.
```

## Example: trend-to-product concept workflow

External idea:

```text
An agent watches trends, drafts product concepts, creates mockups, drafts listings, and queues candidates for review.
```

High-risk variant:

```text
Apparel, parody, meme merchandise, fandom references, celebrity references, sports/team references, brand-adjacent jokes, political/current-event products, and tragedy-adjacent products require extra review.
```

Do not copy it as:

```text
Build an auto-publishing meme-merch machine.
```

Extract the pattern:

```text
signal detection
→ concept draft
→ asset draft
→ risk screen
→ human approval
→ publish
→ performance feedback
```

Identify the risks:

```text
copyright infringement
trademark infringement
celebrity/personality rights
sports/team/fandom IP
tragedy exploitation
reputation risk
spam marketplace behavior
false claims
unapproved ad spend
platform bans
```

Architecture boundary:

```text
trend signal is not a product idea
product idea is not an approved design
approved design is not a listing
listing is not publication
publication is not proof of success
AI recommendation is not business authority
```

Governed result:

```text
Create a trend-to-product workflow with signal capture, concept drafting, IP/platform/reputation screening, approval gates, publishing records, and performance feedback.
```

The reusable pattern is valuable. The unsafe product-copying behavior is not.

## Example: ops triage agent

External idea:

```text
An agent reads inbound operations requests, classifies urgency, gathers context, answers easy requests, and routes the rest to humans.
```

Extract the pattern:

```text
inbound request
→ classify urgency/type
→ assemble context
→ answer if safe
→ route if not
→ record decision
```

Architecture boundary:

```text
classification is not resolution
context assembly is not authority
a draft answer is not approval
a routed item is not completed work
```

Governed result:

```text
Create an ops-triage playbook with allowed request categories, safe auto-answer cases, escalation rules, source links, and completion records.
```

## Example: browser-testing agent

External idea:

```text
An agent uses a browser automation tool to test a web app and report failures.
```

Extract the pattern:

```text
requirement
→ implementation
→ automated browser test
→ failure report
→ fix loop
→ proof/check
→ completion note
```

Architecture boundary:

```text
browser observation is not proof of business correctness
test execution is not production authority
failing test is not diagnosis by itself
passing test is not full release approval
```

Governed result:

```text
Create a testing workflow that separates test environment access, allowed browser actions, proof artifacts, logs, fix loops, and release gates.
```

## Example: AI-search visibility agent

External idea:

```text
An agent asks search engines and LLM systems recurring market questions, tracks whether a brand is mentioned, and creates content to improve visibility.
```

Extract the pattern:

```text
generate market questions
→ query search/answer systems
→ detect mention vs hallucination
→ track trend
→ create/update content
```

Architecture boundary:

```text
AI mention is not market truth
search result is not endorsement
generated content is not approved claim
visibility work is not authority to spam
```

Governed result:

```text
Create an AI-answer-surface monitoring workflow with source capture, mention tracking, hallucination notes, content drafts, and human approval gates.
```

## Workorder shape

If the idea should become repo work, the foreground AI creates a workorder like:

```text
workorders/YYYY-MM-DD-HHMM-by-githubusername-distill-agent-pattern.md
```

The workorder tells the executor to:

```text
1. Inspect the current repository state.
2. Read README.md, AGENTS.md, playbooks/README.md, and relevant examples/playbooks.
3. Read or inspect the outside source material supplied by the human.
4. Summarize the outside claim without overstating it.
5. Extract the reusable workflow pattern.
6. Separate hype, product-specific claims, vendor-specific details, and unsafe behavior from the reusable mechanism.
7. Classify tool needs as read, draft, action, and proof tools.
8. Identify source authority, approval gates, side effects, failure behavior, and proof paths.
9. Decide whether the repo output should be ignore, watch, note, issue, example, playbook, workorder, or human decision.
10. Create only the repo artifact explicitly requested or justified by the workorder.
11. Do not implement broad automation unless explicitly authorized.
12. Run required checks if files are changed.
13. Keep working until checks pass or report a real blocker.
14. Create or propose a lesson learned if the outside idea exposes a repeated agent-pattern hazard.
```

## What this demonstrates

The outside world is full of agent demos.

Some are useful. Some are hype. Some are dangerous. Some are product-specific. Some are strong patterns hiding inside silly examples.

The useful move is:

```text
observe outside example
→ extract reusable pattern
→ preserve authority boundaries
→ decide repo action
→ make it durable only if justified
```

## The practical lesson

Good AI project governance does not ignore outside examples.

It also does not blindly copy them.

It learns from them safely.

```text
Steal the pattern.
Leave the unsafe product behind.
```
