# Hobbyist Mechanic: 1957 Chevy Restoration

This example shows the same PMP idea in a harmless everyday setting.

The human says:

```text
I am a hobbyist mechanic. I am restoring a '57 Chevy and I need to order parts regularly and keep track of what I am doing.
```

A word-salad AI might produce a generic checklist.

An architecture-cognition AI should see a small project system:

- parts needed;
- parts ordered;
- parts received;
- work sessions;
- decisions;
- blockers;
- vendors;
- receipts;
- measurements;
- photos;
- safety notes;
- next actions;
- done/not-done state.

The demo is a small WebGL visualization of that project cognition.

It is not a parts database.

It is not a real inventory system.

It is not an app claim.

It is an example of how a PMP-style assistant can convert a human project into a structured, visible, trackable operating model.

## Run it

Open `index.html` in a modern browser.

If your browser blocks module imports from a local file, run a small local server from this folder or the repo root:

```bash
python -m http.server 8000
```

Then open the served page in your browser.
