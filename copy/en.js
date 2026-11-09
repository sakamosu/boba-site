// pekoe LP — English copy
// Keys match data-i18n / data-i18n-attr in index.html. Values may contain <strong> <code> <em> <br>.
window.PEKOE_COPY = window.PEKOE_COPY || {};
window.PEKOE_COPY.en = {
  "meta.title": "pekoe — A cozy home for your coding agents.",
  "meta.description": "A terminal tool for Ghostty that handles the chores of running Claude Code in parallel: finding stalled agents, setting up and cleaning up worktrees, going back and forth with the browser.",

  // [1] pekoe
  "s1.h1": "A cozy home for your coding agents.",
  "s1.h1_sub": "with tapi, always by your side",
  "s1.lead": "Run Claude Code in parallel and you end up spending more time checking which agent has stalled, or creating and cleaning up worktrees, than actually reading code. pekoe takes on <strong>just those chores</strong>.",
  "s1.cta_flow": "see the flow",
  "s1.kv_alt": "pekoe key visual: tapi, a smiling tapioca pearl, in front of a terminal",
  "s1.o1.title": "Never miss a wait",
  "s1.o1.body": "When an agent stops, tapi lets you know. No more peeking into panes one by one.",
  "s1.o2.title": "Worktrees, set up and cleaned up",
  "s1.o2.body": "Give it a branch name and a ready-to-go worktree comes up. Removing it after the merge is pekoe's job too.",
  "s1.o3.title": "Just focus on reading",
  "s1.o3.body": "pekoe remembers how far you've read. Next to each diff sits the prompt that produced it.",
  "s1.demo_label": "pekoe demo video: creating a session, then run, wait, review and land, plus tapi’s five faces",

  // [2] Flow
  "s2.h2": "From creating a worktree to merging the PR, on one screen.",
  "s2.lead": "Sessions and worktrees on the left, the agent's own screen on the right. Move around all you like; you won't lose track of where you were or what you were doing.",
  "s2.st1.title": "Make a worktree",
  "s2.st1.body": "Give it a branch name and the agent starts working in a worktree that's already set up. Give it an issue number instead and the issue body becomes the first prompt. Write the setup steps once per repo, then feel free to forget them.",
  "s2.st2.title": "Run, and watch",
  "s2.st2.body": "Every agent's state lines up in a single pane. Close the terminal and the sessions keep running inside the daemon, so when you come back you pick up right where you left off.",
  "s2.st3.title": "Respond",
  "s2.st3.body": "Jump straight to an agent stopped on a permission or a question, answer it, and head back to where you were. Spotted something in the browser? Pick the element in your everyday Chrome and send it straight to the agent.",
  "s2.st4.title": "Read the diff",
  "s2.st4.body": "pekoe remembers how far you read last time, so you start from what's new. Approve hunk by hunk — approvals stick even when lines shift. If a change doesn't make sense, just ask the agent why, right there. Open it in Neovim and you also get a list of spots worth a closer look. Other people's PRs read on the same screen too.",
  "s2.st5.title": "Land",
  "s2.st5.body": "rebase → test → push → PR in one go. Once it's merged, pekoe removes the worktree and finishes the cleanup. Want a redo? Roll back by a single prompt.",
  "s2.shot_prompt": "← prompt #3: add CSV export",

  // [3] tapi
  "s3.meet": "Meet tapi.",
  "s3.lead": "tapi is a tapioca pearl who lives in pekoe. From the bottom line of the screen, tapi shows how all your sessions are doing through its face, and tells you in a few words who is doing what right now. When something starts waiting, the face changes, so you'll notice as long as tapi is in the corner of your eye.",

  // [4] Principles
  "s4.h2": "Claude Code stays untouched. Your repo stays clean.",
  "s4.lead": "The daemon makes every decision; clients only handle display and input. Most of the principles below follow from that design.",
  "s4.pr1": "Agents run inside a pty just as they always do. To the pty, whatever pekoe sends is no different from someone typing on the keyboard. State comes from hooks, not from reading the screen.",
  "s4.pr2": "Config, state and snapshots live outside the repo or under <code>refs/pekoe/</code> (never pushed, never shown in <code>git log</code>). The only thing left behind is a worktree — something made with plain git.",
  "s4.pr3": "pekoe knows nothing about package managers or frameworks. The config holds the commands you already type in that repo; pekoe fills in the variables and runs them top to bottom.",
  "s4.pr4": "The terminal layer runs on tmux for now, and will eventually move to a mux of its own built on libghostty-vt. As long as the daemon/client boundary holds, swapping any layer costs no features.",
  "s4.daemon": "TUI, CLI, Neovim, the Chrome extension and MCP are all display layers hitting the same API. Adding a feature only means touching the daemon.",
  "s4.svg_pty": "tmux -L pekoe · one pty per worktree",
  "s4.svg_aria": "pekoed, its five clients, and one pty per worktree",

  // [5] Install
  "s5.lead": "Runs on: macOS (tested in Ghostty). Requires: Go 1.25 or later, tmux 3.3 or later, git. Optional: gh (landing and PR review), Neovim 0.10 or later (review screen), Chrome (element picking).",
  "s5.soon": "pekoe isn’t public yet. Once the repository is published, the link and install steps will be right here.",
  "s5.c1": "# adds hooks to ~/.claude/settings.json",
  "s5.c2": "# optional: start pekoed at login",
  "s5.c3": "# detect the repo and draft its config",
  "s5.c4": "\"add CSV export\""
};
