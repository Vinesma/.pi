---
name: resume-session
description: Load a session compact (.ctx file) into a fresh agentic coding session to continue prior work. Use when starting a new session that should pick up where another left off, or when a user provides a compact file to load.
---

# Resume Session

Take a compact handoff file (produced by `compact-session`) and fold it into a fresh session so work continues without replaying the original conversation.

## When to Use

- A user says "pick up where I left off" or "resume session X"
- A `.ctx` file exists from a previous compact and work should continue
- Context is small and you need the prior session's intent before starting

## Loading Procedure

1. **Read the compact file.** It is Markdown. If the path is given, read it directly. If only a name is given, look in the default location `.pi/handoff/` in the project root (list it with `ls .pi/handoff/`) and ask for the path if none matches.

2. **Internalize three things before doing anything:**
   - **Status** — is the work in progress, blocked, or paused?
   - **Next Steps** — the immediate actions listed.
   - **Key Decisions + Gotchas** — constraints not visible in the code, so you don't contradict them.

3. **Cross-check against the repo before trusting the compact.** A compact may be slightly stale. Verify the core claims:
   ```
   git status            → what is uncommitted / changed
   git log --oneline -5  → what was recently committed
   ls <file locations>   → do the referenced files still exist and match?
   ```
   If the compact conflicts with the repo, prefer the repo's current state and note the discrepancy to the user.

4. **Reconcile and report.** Tell the user briefly:
   - What the task was and current status
   - What you verified vs. what the compact claimed
   - The first action you'll take, or ask if they want to adjust direction

## Handling a Blocked Status

If the compact's Status is `BLOCKED` or it has `Open Questions`:
- Surface the open questions first — resuming may require a decision, not just code.
- Do not assume a resolution that isn't recorded. If the compact says "decided" but the change isn't in the code, verify and ask.

## Handling a Paused / Complete Status

If the compact's Status is `PAUSED` or most items are `[done]`:
- Confirm what is actually finished against the repo.
- Ask whether to continue the remaining Next Steps or wrap up.

## Best Practices

- **Don't blindly execute Next Steps.** They are a plan from a prior session; verify they still fit the current state before acting.
- **Don't discard the compact's decisions.** A recorded "why" prevents re-litigating or reverting a choice.
- **Keep the compact if work continues.** If the new session makes meaningful progress and will itself be handed off, produce a fresh compact with `compact-session` before pausing.
- **One compact at a time.** Load a single `.ctx` per session start. If multiple threads exist, consolidate them in the next compact.

## See Also

- `compact-session` — produces the `.ctx` file this skill loads.
