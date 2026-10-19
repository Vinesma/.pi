---
name: compact-session
description: Compact an agentic coding session into a concise handoff file so work can be passed to a fresh session. Use when a session is pausing, hitting context limits, or transferring work to another session. Produces a .ctx file that resume-session can load.
---

# Compact Session

Condense an active session into a compact handoff file so the next session can resume without the full conversation history. The compact captures enough to continue correctly, not everything that happened.

Use this when:
- The session is pausing for a while and you want to resume later
- Context is filling up and you need to continue in a fresh session
- Handing work off to another session or model

## When NOT to Compact

- At the very start of a session (nothing to summarize yet)
- After a trivial one-step change (the diff is smaller than a compact)
- When the work is fully done and committed (commit message is the handoff)

## The Compact File Format

Write a single Markdown file with the `.ctx` extension. Keep it tight: target ~15-40 lines. Prefer dense, structured content over prose. Save it next to the project or in a known location the next session can find.

Use this exact structure. Sections that do not apply may be omitted or marked "none".

```markdown
# Session Compact

## Task
One or two sentences: what the session was trying to accomplish.

## Status
Where things stand right now. Pick one:
- IN_PROGRESS: work continues, not finished
- BLOCKED: waiting on something (see Open Questions)
- PAUSED: complete enough to resume later

## Progress
What was actually done this session. Concrete, verifiable.
- [done] item A
- [done] item B

## Open Questions
What is unknown, undecided, or needs a decision.
- Question 1
- Question 2

## Next Steps
The most useful thing to do next, in order.
1. First action
2. Next action
3. ...

## Key Decisions
Non-trivial choices already made and the reasoning behind them.
- Decision: why (so the next session doesn't re-litigate)

## File Locations
Files most relevant to continue. Path + role.
- path/to/file.ts — what it does
- path/to/dir/ — what lives here

## Gotchas
Non-obvious constraints, workarounds, things to avoid.
- e.g. "API expects field X renamed to Y until migration"
```

## Compaction Guidelines

The goal is high-signal, low-volume context. Follow these rules:

1. **Capture what the next session needs, not a transcript.** The diff, the git log, and the code itself hold the full history. The compact holds the *intent* and the *open thread*.

2. **Record decisions, not just actions.** "Added retry logic" is an action. "Used exponential backoff because the API rate-limits at 20 req/s, see line 42" is a decision that prevents the next session from undoing it.

3. **Be explicit about done vs. not-done.** A half-finished feature is the most common handoff failure. Mark progress with `[done]` and `[todo]` checkboxes.

4. **List the concrete next action first.** The next session should be able to start immediately from "Next Steps" without re-deriving the plan.

5. **Include the file paths that matter.** "The relevant file" is ambiguous across sessions. Give the path and one-line role.

6. **Keep gotchas.** The single most valuable section is often the non-obvious constraint that would otherwise be rediscovered at cost.

7. **One compact per handoff.** If multiple threads are in flight, one `.ctx` file with multiple "Next Steps" and "Open Questions" entries beats several files.

## Generating the Compact

To produce an accurate compact, gather ground truth rather than relying on memory alone:

```
1. git diff / git log --oneline   → what changed, what was committed
2. list open TODO/FIXME/FIXME: comments in the code → unfinished work
3. review the last few edits you made → actual progress vs. intended
4. check any open questions or pending decisions → Open Questions section
```

Then write the compact to the fixed handoff path, in the project root:

```
.pi/handoff/compact-YYYYMMDD-HHMMSS.ctx
```

Create the `.pi/handoff/` directory in the project root if it doesn't exist. Use a timestamp so repeated handoffs don't overwrite each other. The `resume-session` skill accepts a path to any `.ctx` file; the default location is `.pi/handoff/` in the project root.

## Verification

Before finishing the compact:
- [ ] Status reflects whether work is truly complete or paused
- [ ] Every `[done]` item actually matches a committed or verified change
- [ ] Next Steps start with the single most useful immediate action
- [ ] File paths are correct (verify with `ls`/`git status`, don't guess)
- [ ] The file is saved and its path recorded so it is easy to load later

## See Also

- `resume-session` — loads a `.ctx` file into a fresh session.
