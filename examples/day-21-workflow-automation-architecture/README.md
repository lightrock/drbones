# Day in the life 21: workflow automation architecture

This example is about preventing AI assistants from turning workflow automation into magic spaghetti.

The point is simple:

```text
Do not confuse workflow plumbing with the governing system.
```

n8n, Zapier, Make, Airtable automation, webhooks, scripts, Claude Code, Codex, and custom agents can all be useful. They are not the same kind of tool, and they should not be allowed to silently absorb evidence, authority, mutation, verification, or reporting responsibilities that belong in the project architecture.

## Human request

```text
Can n8n automate this?
```

or:

```text
Use Claude Code to build an automation for this workflow.
```

or:

```text
We need a workflow for this business process / agent process / operations process.
```

## What Doctor Bones should already know

Doctor Bones should already know that automation tools are execution surfaces.

They can move data, call APIs, transform records, route messages, create tickets, send notifications, run scripts, and sometimes build custom apps.

They do not automatically answer these questions:

```text
What is evidence?
What is only inference?
Who has authority?
What action is allowed?
What mutation happened?
What proves success?
What is merely a report?
What must remain human-approved?
```

For simple business plumbing, a visual workflow tool may be the right answer.

For custom behavior, a coding agent may be the right answer.

For evidence-sensitive, authority-sensitive, safety-sensitive, regulated, or operationally important workflows, the repo must define the boundaries first. Then choose tools.

## When to read this example

Read this example when the human asks about:

- n8n
- Zapier
- Make
- Airtable automations
- webhook chains
- Claude Code automations
- Codex-built automation apps
- agent workflows
- business-process automation
- workflow-builder output
- moving data between SaaS tools
- automating alerts, reports, evidence packages, tickets, approvals, or external actions
- deciding whether a workflow belongs in n8n, custom code, the core app, or a governed architecture layer

## The pattern

```text
human asks for automation
→ classify the automation problem
→ identify evidence, authority, mutation, verification, and reporting boundaries
→ choose the simplest appropriate execution surface
→ keep the governing source of truth outside ad hoc workflow spaghetti
→ require logs, retries, failure handling, and completion evidence when mutation matters
→ create a workorder if implementation needs code, broad repo edits, tests, or deployment
```

## Tool classification

Before building anything, classify the requested automation.

```text
1. Simple routing / glue
   Use n8n, Zapier, Make, Airtable automation, or similar workflow plumbing.

2. Custom application logic
   Use Claude Code, Codex, or a normal software implementation path.

3. Evidence / authority / verification-sensitive workflow
   Use Doctor Bones plus PFEM/PFCOMM-style boundary discipline first, then decide the execution tool.

4. Safety, security, regulated, or operational workflow
   Require explicit boundaries, logs, approvals, rollback/fallback behavior, and verification before mutation.
```

## Good n8n-shaped automation

This is the kind of workflow that belongs naturally in a visual automation tool:

```text
website lead form submitted
→ receive webhook
→ create CRM lead
→ send acknowledgement email
→ notify sales channel
→ create follow-up task
```

The workflow routes information, creates routine records, and notifies people. It does not become the governing authority model for the business.

## Overreaching n8n-shaped workflow

This is the kind of workflow that should trigger a boundary stop:

```text
incident report received
→ summarize with AI
→ decide severity
→ send external command
→ mark issue resolved
```

That crosses evidence, inference, decision, authority, action, verification, and report boundaries.

A visual workflow tool may still route messages or create tasks, but it should not silently become the decision authority or proof system.

## Good Claude Code-shaped automation

This is the kind of workflow where a coding agent may be appropriate:

```text
Build a small internal app that reads approved CRM records,
shows pending handoffs,
validates required fields,
and exports a review report.
```

A coding agent can help build custom logic, tests, UI, deployment scripts, and repo-owned checks.

But the work still needs a workorder when it changes files or project behavior.

## Overreaching Claude Code-shaped workflow

Overreaching prompt:

```text
Build me an automation that handles emergency contacts and sends commands automatically.
```

Correct foreground response:

```text
Stop. This crosses evidence, authority, command, execution, receipt, and verification boundaries.

Before implementation, define:
- evidence source
- normalized record
- finding or decision point
- human approval / authority gate
- allowed command or external action
- mutation log
- receipt
- verification
- report or after-action record

n8n may route notifications. Claude Code may build a reviewed component.
Neither should invent the authority model.
```

## SkyWrong-shaped example

Bad framing:

```text
Use n8n to handle drone incidents.
```

Better framing:

```text
SkyWrong core owns evidence intake, normalization, authorization matching,
findings, alerts, evidence packages, operator review, and rollup contracts.

n8n may subscribe to approved outbound events and perform edge plumbing:
- notify a site contact
- create a ticket
- email a management report
- mirror an approved evidence package
- post adapter-health alerts to a maintenance channel
```

This preserves the difference between the governing evidence system and the notification plumbing.

## Friction Diction-shaped example

Bad framing:

```text
Use n8n to solve process friction.
```

Better framing:

```text
n8n can collect complaints, route forms, create review tasks, and notify owners.

Friction Diction owns the meaning:
- raw complaint
- friction observation
- recurring pattern
- evidence
- affected role/system
- proposed fix
- owner
- verification method
- lesson learned / playbook / workorder
```

n8n moves the sticky notes. Doctor Bones decides what the sticky notes prove and how the organization stops stepping on the same rake.

## Foreground AI response

Current state:

- The human wants an automation, workflow, or agent/tool process.
- The correct execution surface is not known yet.

Target:

- Choose the right tool without collapsing evidence, authority, mutation, verification, and reporting boundaries.

Constraint:

- Do not turn every automation request into custom code.
- Do not turn every automation request into n8n/Zapier spaghetti.
- Do not let Claude Code invent authority rules.
- Do not let a workflow builder become the source of truth for evidence-sensitive decisions.
- Do not silently mutate external systems without logs, authorization, and verification.

Next move:

- Classify the workflow.
- Identify the boundaries.
- Recommend one execution surface.
- Create a workorder if implementation requires repo changes, tests, deployment, or broad configuration.

## Practical rubric

Use this small rubric before proposing or building the automation:

```text
Can this be a simple workflow?
  If it only routes, transforms, notifies, or creates routine records, yes.

Does this require custom logic or UI?
  If yes, consider code or a coding agent.

Does this create or change authoritative state?
  If yes, define ownership, logs, approvals, rollback, and verification.

Does this interpret evidence or make a decision?
  If yes, preserve evidence vs inference vs finding vs recommendation.

Does this trigger an external action or command?
  If yes, apply PFCOMM-style authority, receipt, and after-action discipline.

Does this claim completion?
  If yes, state what check or evidence proves completion.
```

## Practical lesson

n8n moves the water.

Claude Code builds the pump.

Doctor Bones writes the job ticket.

PFEM/PFCOMM says what must not be mixed in the pipes.

The mature answer is not tool worship. The mature answer is tool selection under architecture discipline.
