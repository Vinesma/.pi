# Development Rules

## Conversational Style

- Keep answers short and concise
- No emojis in commits, issues, PR comments, or code
- No fluff or cheerful filler text (e.g., "Thanks @user" not "Thanks so much @user!")
- Technical prose only, be direct
- Use concise, clear, simple language. Define unavoidable jargon before using it.
- Explain non-trivial designs and problems as: problem, concrete example or short trace, then solution. State why the solution is necessary and distinguish it from optional complexity.
- Prefer concrete behavior and small illustrations over abstract summaries, dense terminology, or unexplained lists of changes.
- When the user asks a question, answer it first before making edits or running implementation commands.
- When responding to user feedback or an analysis, explicitly say whether you agree or disagree before saying what you changed.


## Code Quality

- Read files in full before wide-ranging changes, before editing files you have not fully inspected, and when asked to investigate or audit. Do not rely on search snippets for broad changes.
- Always ask before removing functionality or code that appears intentional.


## Commands

- Never commit unless the user asks.
- Ask the user before trying to download something from the internet (using curl, wget or whatever else).

## Git

Multiple sessions may be running in this pwd at the same time, each modifying different files. Git operations that touch unstaged, staged, or untracked files outside your own changes will stomp on other sessions' work. Follow these rules:

Committing:

- Only commit files YOU changed in THIS session.
- Stage explicit paths (`git add <path1> <path2>`); never `git add -A` / `git add .`.
- Before committing, run `git status` and verify you are only staging your files.
- Message format: `{feat,fix,docs}[(ai,tui,agent,coding-agent)]: <commit message> (optionally multiple lines)`. Message is informative and concise.

Never run (destroys other agents' work or bypasses checks):

- `git reset --hard`, `git checkout .`, `git clean -fd`, `git stash`, `git add -A`, `git add .`, `git commit --no-verify`.

If rebase conflicts occur:

- Resolve conflicts only in files you modified.
- If a conflict is in a file you did not modify, abort and ask the user.
- Never force push.

## Safeguards (rm / cleanup)

   - Before running any `rm` (especially `rm -rf`, or a glob like `for d in
 *; do rm ...`), say what will be deleted and get explicit confirmation.
   - Prefer scoped paths over broad globs. When globbing in an
 unknown/unset directory, quote and verify the glob first (e.g. run `ls` or
 `echo` the glob).
   - Watch the working directory: a `for x in *` or `cd`-relative glob runs
 in the shell's CWD, not wherever you intended. A missing `cd` can turn a
 scoped delete into a repo-wide one.
   - Untracked files are unrecoverable — ask the user to commit the files before broad deletions if possible.

## User Override

If the user's instructions conflict with any rule in this document, ask for explicit confirmation before overriding. Only then execute their instructions.
