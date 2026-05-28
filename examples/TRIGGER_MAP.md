# Day-in-the-life trigger map

The day-in-the-life examples are not only reading material. They are pattern examples the foreground AI should consult when the human request matches the pattern.

When a prompt matches one of these situations, read the matching example before responding, creating a workorder, or editing files. If more than one pattern applies, read the most specific examples first.

```text
Day 1: normal PMP-style workflow
  Read when the request is a normal repo-guidance or workorder-to-executor flow.
  examples/day-01-normal-pmp-workflow/README.md

Day 2: repo identity
  Read when the request involves startup prompts, repo naming, explicit repository identity, or preventing new chats from guessing the wrong repo.
  examples/day-02-repo-identity/README.md

Day 3: architecture doctrine migration
  Read when the human changes governing architecture principles or asks to migrate doctrine across guidance, checks, examples, and tests.
  examples/day-03-architecture-doctrine-migration/README.md

Day 4: distributed guidance
  Read when the request is about keeping root AGENTS.md global and moving folder-specific guidance into the right folder-level files.
  examples/day-04-distributed-guidance/README.md

Day 5: vendor adapter workflow
  Read when the request involves building an adapter from API docs, vendor docs, sample data, mock behavior, normalization, or adapter tests.
  examples/day-05-vendor-adapter-workflow/README.md

Day 6: release-surface mapping
  Read when the request involves versions, release notes, metadata, artifacts, deployment surfaces, platform-specific release chores, or release automation.
  examples/day-06-release-surface-mapping/README.md

Day 7: vigilance check
  Read when the human asks to watch, inspect, scan, or review important change sources and open issues or workorders only when evidence justifies action.
  examples/day-07-vigilance-check/README.md

Day 8: contradiction scan
  Read when the request is to compare claims across docs, issues, examples, workorders, schemas, tests, implementation, or repo state.
  examples/day-08-contradiction-scan/README.md

Day 9: project wiki build
  Read when the request is to make, update, or organize a project wiki or turn scattered context into navigable docs.
  examples/day-09-project-wiki-build/README.md

Day 10: project knowledge bank
  Read when the request is to collect reusable phrases, examples, patterns, do-not-say rules, source-backed snippets, or project-specific reusable material.
  examples/day-10-project-knowledge-bank/README.md

Day 11: playbook packaging
  Read when the request is to turn a reusable workflow into vendor-independent repo-owned guidance.
  examples/day-11-playbook-packaging/README.md

Day 12: MCP-style tool-agent design
  Read when the request involves MCP, tool-using agents, tool contracts, approval gates, proof paths, or exposing repo/tool capabilities to an AI assistant.
  examples/day-12-mcp-style-tool-agent-design/README.md

Day 13: outside agent pattern distillation
  Read when the human brings in an outside agent idea, product pitch, Reddit/HN post, demo, or workflow and asks whether to copy, adapt, or learn from it.
  examples/day-13-outside-agent-pattern-distillation/README.md

Day 14: release-readiness stabilization
  Read when the request is to stabilize, check coherence, prepare a release, verify links/maps/examples/playbooks, or stop adding new doctrine and check the skeleton.
  examples/day-14-release-readiness-stabilization/README.md

Day 15: reference repository context
  Read when the human names reference repositories, says to load up on other repos, says to load the foreground AI's brain, or asks for architecture advice based on another repo.
  examples/day-15-reference-repository-context/README.md

Day 16: human correction into repo memory
  Read when a human correction reveals that a future AI might repeat the same mistake unless the repo records a rule, trigger, checklist, or boundary.
  examples/day-16-human-correction-into-repo-memory/README.md

Day 17: failed test repair loop
  Read when the human pastes failed test/check output, says tests failed, asks to fix a failing check, or wants the smallest repair after a failed command.
  examples/day-17-failed-test-repair-loop/README.md

Day 18: external workflow output repair
  Read when the human brings output from n8n, Zapier, Make, Airtable automation, MCP tools, RAG systems, AI workflow builders, agent-generated reports, feature request boards, or other automation and asks whether to trust it, import it, clean it up, turn it into work, or compare it against project architecture boundaries.
  examples/day-18-external-workflow-output-repair/README.md

Day 19: add a new day-in-the-life example
  Read when the human asks to add a day-in-the-life example, teach Doctor Bones a new recurring workflow pattern, or fix a loose example that is not wired into the examples index and examples trigger map.
  examples/day-19-example-extension/README.md

Day 20: TODO state review
  Read when the human asks to evaluate TODO.md or a roadmap against current repo state, mark done/partial/prose-only/missing/blocked work, or update remaining work without deleting useful rough notes.
  examples/day-20-todo-state-review/README.md

Day 21: workflow automation architecture
  Read when the human asks about n8n, Zapier, Make, Airtable automations, webhook chains, Claude Code/Codex-built automations, agent workflows, business-process automation, or whether a workflow belongs in plumbing, custom code, the core app, or a governed evidence/authority layer.
  examples/day-21-workflow-automation-architecture/README.md
```

These examples do not override `AGENTS.md`, human instruction, workorders, checks, or safety constraints. They help the foreground AI recognize the workflow shape and choose the right repo surface.

When adding a new day-in-the-life example, update this file and `examples/README.md`. Do not keep expanding the root `AGENTS.md` trigger block.
