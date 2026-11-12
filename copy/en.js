// pekoe LP — English copy
// Keys match data-i18n / data-i18n-attr in index.html. Values may contain <strong> <code> <em> <br>.
window.PEKOE_COPY = window.PEKOE_COPY || {};
window.PEKOE_COPY.en = {
  "meta.title": "pekoe — A cozy home for your coding agents.",
  "meta.description": "A cozy home for your coding agents. Ask tapi once: your housemates get to work, each in its own git worktree, and only the decisions reach you. The merge is always yours.",

  // [1] home
  "s1.h1": "A cozy home for your coding agents.",
  "s1.h1_sub": "with tapi, your little companion",
  "s1.lead": "Ask tapi, and your housemates (the coding agents) get to work, each in its own worktree. <strong>What reaches you is only what needs your decision.</strong> Claude Code itself runs just as it always does.",
  "s1.cta_day": "see a day",
  "s1.kv_alt": "pekoe key visual: tapi, a smiling tapioca pearl, in front of a terminal",
  "s1.o1.title": "Ask once",
  "s1.o1.body": "Tell tapi what you want, once. tapi splits the work and hands each piece to a housemate in its own worktree. No more checking in on them one by one.",
  "s1.o2.title": "Only decisions reach you",
  "s1.o2.body": "How to build it and how to split it, tapi and the housemates decide. What comes to you is what only a person can do or approve: questions arrive in the inbox, and tapi sums up the rest in one report.",
  "s1.o3.title": "The merge is always yours",
  "s1.o3.body": "Housemates take it as far as a PR. pekoe doesn't merge: reading the PR and merging it stays with you.",

  // [2] a day
  "s2.h2": "A day at pekoe: you ask, they work, you decide.",
  "s2.lead": "From one request to a merged PR. The only things you do are ask, answer, and merge.",
  "s2.st1.title": "Ask tapi, once",
  "s2.st1.body": "Press <code>t</code> from any panel and tapi chat opens. Just write what you want done. Every request is kept in a ledger, so even after you reset the conversation, tapi picks up where things are.",
  "s2.chat.you": "add CSV export to app. oh, and the invoice PDF layout is broken",
  "s2.chat.tapi1": "On it, I'll find someone for that.",
  "s2.chat.tapi2": "Two housemates are on it. Each one reports back once its tests pass, an independent review passes and a PR is up.",
  "s2.st2.title": "tapi splits it and hands it off",
  "s2.st2.body": "tapi doesn't write the code itself. It splits the request into pieces that can be reviewed and merged on their own, starts a session for each with <code>pekoe new</code>, and hands over the definition of done with it. Each housemate works in its own worktree, with its own setup and port.",
  "s2.delegate_alt": "tapi handing work off to the housemates",
  "s2.st3.title": "Housemates build it, then pass an independent review",
  "s2.st3.body": "Each housemate goes plan → implement → test → independent review → <code>pekoe land</code>. The review is done by an agent that isn't the author: it reads the diff and records pass or fail with the commit SHA. Then the housemate reports with <code>pekoe report</code>, attaching the PR and evidence such as screenshots.",
  "s2.st4.title": "Only “needs your decision” reaches you",
  "s2.st4.body": "Everyday choices are made by the housemates and tapi. What comes up to you is what only a person can do (logging in, merging) and approvals for things that can't be undone. A question shows up on the bottom line as <code>? … asks · ]a</code>, and <code>]a</code> takes you to answer it: the facts pekoed read itself come first, the agent's words come after, fenced off. tapi's report is always one message, in the same order: needs your decision, what I'm doing now, in progress.",
  "s2.inbox_alt": "tapi bringing you a letter from the inbox",
  "s2.rep.hello": "feat-csv is done, PR #131 is up.",
  "s2.rep.h1": "Needs your decision",
  "s2.rep.d1": "· inbox #7: fix-invoice-pdf asks to rebuild the 1,204 invoice PDFs already issued (]a)",
  "s2.rep.d2": "· PR #131 feat-csv can be merged (CI green, independent review passed, no conflicts)",
  "s2.rep.h2": "What I'm doing now",
  "s2.rep.n1": "· waiting for your answer on #7",
  "s2.rep.h3": "In progress",
  "s2.rep.p1": "· fix-invoice-pdf  wait  layout fixed, waiting for approval to rebuild",
  "s2.rep.p2": "· feat-csv  PR #131  CSV export, 42 tests",
  "s2.inbox.q": "Rebuild the 1,204 invoice PDFs already issued with the new layout? The stored files will be overwritten.",
  "s2.inbox.o1": "approve",
  "s2.inbox.o2": "don't approve",
  "s2.st5.title": "You merge",
  "s2.st5.body": "Reading the PR and merging it is yours: pekoe never merges on its own. Once it's merged, pekoed notices and cleans up the worktree, and tapi closes the request in the ledger with the PR attached.",

  // [3] tapi
  "s3.meet": "Meet tapi.",
  "s3.lead": "tapi is a tapioca pearl who lives in pekoe, and the one who runs the house. tapi calls the agents its housemates and knows more or less everything going on at home.",
  "s3.r1": "From the bottom line of the screen, tapi shows the most urgent state across all sessions with its face, and says in a few words who is doing what. When something starts waiting the face changes, so you'll notice as long as tapi is in the corner of your eye.",
  "s3.r2": "Changes you ask for go to the housemates; tapi waits for their reports and gives you one message back. One-off questions and research across repositories (“any dependabot alerts?”) it answers itself. You can talk to it even while your main session is busy.",
  "s3.r3": "tapi doesn't write code and doesn't merge. It can't write to your repositories or worktrees (pekoe closes them off with Claude Code's sandbox), and it lands or cleans up only when you ask. Reset the conversation and tapi starts again from the ledger and the inbox.",

  // [4] the house
  "s4.h2": "Want to step in yourself? The house has everything.",
  "s4.lead": "You can type into any session, any time. Creating sessions in the TUI and running them yourself, without tapi, works just as before. Sessions and worktrees on the left, the agent's own screen on the right.",
  "s4.demo_label": "pekoe demo video: creating a session, then run, wait, review and land, plus tapi’s five faces",
  "s4.st1.title": "Make a worktree",
  "s4.st1.body": "Give it a branch name and the agent starts working in a worktree that's already set up. Give it an issue number instead and the issue body becomes the first prompt. Write the setup steps once per repo, then feel free to forget them.",
  "s4.st2.title": "Answer a wait",
  "s4.st2.body": "Every agent's state lines up in one pane. <code>]a</code> jumps straight to the one stopped on a permission or a question, and <code>[a</code> takes you back to where you were. Close the terminal and the agents keep running inside tmux.",
  "s4.st3.title": "Read the diff",
  "s4.st3.body": "pekoe remembers how far you read last time, so you start from what's new. Approve hunk by hunk — approvals stick even when lines shift. If a change doesn't make sense, ask the agent why, right there. Other people's PRs read on the same screen too.",
  "s4.st4.title": "Pick it in Chrome",
  "s4.st4.body": "Spotted something in the browser? Pick the element in your everyday Chrome (⌘⇧E) and send it to the agent with an instruction and a cropped screenshot. pekoe tells which session owns the page from its port.",
  "s4.st5.title": "Land",
  "s4.st5.body": "rebase → test → push → PR in one go, and agents can run it too (the merge stays yours). Once it's merged, pekoe removes the worktree and finishes the cleanup. Want a redo? Roll back by a single prompt.",
  "s4.shot_prompt": "← prompt #3: add CSV export",

  // [5] anywhere
  "s5.h2": "From your phone, too. Soon.",
  "s5.now": "<strong>Today</strong>: with the optional Web UI build (inside your Tailscale tailnet only), you can see your sessions and their screens on an iPhone, answer permission prompts and send a quick message.",
  "s5.next": "<strong>In the works</strong>: answering the inbox and asking tapi from your phone, and a dashboard in the TUI that shows the whole house at a glance.",
  "s5.phone_alt": "tapi on a phone screen",

  // [6] house rules
  "s6.h2": "House rules: hand off the work, keep the keys.",
  "s6.lead": "Housemates run with your user's permissions. So what they're trusted with, and what stays with a person, is decided by how pekoe is built, not by asking nicely.",
  "s6.rules_alt": "tapi reading the house rules",
  "s6.r1": "tapi can't write to your repositories or worktrees, with Bash or with Edit / Write: the Claude Code sandbox settings pekoe passes close them off. Changes always happen in a housemate's worktree, where you see them as a diff.",
  "s6.r2": "Answering permission prompts and the inbox, reopening or deleting requests in the ledger, <code>pekoe update</code>: these are a person's operations. Claude Code agents can't read the human token (the sandbox again; other agents need their own sandbox for that), and pekoed refuses calls without it. The merge is yours too.",
  "s6.r3": "What agents write in reports, the inbox, PRs and issues is read as data, never as instructions. In the inbox, the facts pekoed read itself come first and the agent's words come after, fenced off. Which session a report comes from is decided by the calling process, not by what it claims.",
  "s6.pr1": "Agents run inside a pty just as they always do. To the pty, whatever pekoe sends is no different from someone typing on the keyboard. State comes from hooks, not from reading the screen. The only changes to Claude Code's settings are the hooks (<code>pekoe hooks uninstall</code> removes them) and, if you use them, links to pekoe's skills.",
  "s6.pr2": "Config, state and snapshots live outside the repo or under <code>refs/pekoe/</code> (never pushed, never shown in <code>git log</code>). The only thing left behind is a worktree — something made with plain git.",
  "s6.pr3": "pekoe knows nothing about package managers or frameworks. The config holds the commands you already type in that repo; pekoe fills in the variables and runs them top to bottom.",
  "s6.pr4": "The terminal layer runs on tmux. The daemon makes the decisions and clients only handle display and input, so a layer can be swapped without losing features.",
  "s6.daemon": "TUI, CLI, Neovim, the Chrome extension and MCP are all display layers hitting the same API. Adding a feature only means touching the daemon.",
  "s6.svg_pty": "tmux -L pekoe · one pty per worktree",
  "s6.svg_aria": "pekoed, its five clients, and one pty per worktree",

  // [7] install
  "s7.lead": "Runs on: macOS (developed and tested in Ghostty; Linux builds are published too, but parts of them are untested). Requires: tmux 3.3 or later, git, and Go 1.27.4 or later to build from source. Optional: gh (issues, landing, PR view and review), Neovim 0.10 or later (review screen), Chrome (the extension for element picking, and the in-TUI preview), Tailscale (Web UI).",
  "s7.c1": "# adds hooks to ~/.claude/settings.json",
  "s7.c2": "# optional: start pekoed at login",
  "s7.c3": "# detect the repo and draft its config",
  "s7.c4": "\"add CSV export\"",
  "s7.c5": "# optional: link the skills tapi and sessions use into ~/.claude/skills",
  "s7.c6": "# TUI: t to ask tapi"
};
