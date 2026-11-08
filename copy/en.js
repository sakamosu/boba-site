// pekoe LP — English copy
// Keys match data-i18n / data-i18n-attr in index.html. Values may contain <strong> <code> <em> <br>.
window.PEKOE_COPY = window.PEKOE_COPY || {};
window.PEKOE_COPY.en = {
  "meta.title": "pekoe — A cozy home for your coding agents.",
  "meta.description": "A terminal tool for Ghostty that takes over worktrees, waiting, the browser and review — without changing how you use Claude Code.",

  // left panels
  "lp1.sum": "without leaving the terminal",
  "lp1.r1": "the promise",
  "lp1.r2": "three things",
  "lp2.r1": "the screen",
  "lp3.sum": "just look at the face",
  "lp3.r1": "states &amp; faces",
  "lp4.sum": "Claude Code, untouched",
  "lp4.r1": "principles",

  // [1] pekoe
  "s1.h1": "A cozy home for your coding agents.",
  "s1.h1_sub": "with tapi, your little companion",
  "s1.lead": "Run Claude Code in parallel and the work stops being writing code: it becomes watching for waits, preparing worktrees, checking the browser, reading diffs. pekoe takes over <strong>only that surrounding work</strong>. How you use Claude Code doesn't change.",
  "s1.cta_flow": "see the flow",
  "s1.kv_alt": "pekoe key visual: tapi, a smiling tapioca pearl, in front of a terminal",
  "s1.o1.title": "Never miss a wait",
  "s1.o1.body": "When an agent stops and waits, tapi tells you right away. Jump there, respond, come back to where you were.",
  "s1.o2.title": "A worktree in seconds",
  "s1.o2.body": "One branch name, and a worktree comes up with all the tedious setup already done. The agent can start right away.",
  "s1.o3.title": "Review picks up where you left off",
  "s1.o3.body": "Read only what's new since your last review. Approve change by change, each one labeled with the prompt that produced it.",

  // [2] Flow
  "s2.h2": "From a fresh worktree to a merged PR. One screen.",
  "s2.lead": "Sessions and worktrees on the left, the agent's own screen on the right. Switch around; nothing gets lost.",
  "s2.st1.title": "Make a worktree",
  "s2.st1.body": "Hand it a branch name and the agent starts in a worktree with the environment already set up. Hand it an issue number and the issue becomes the first prompt. Describe the setup once per repo and forget about it.",
  "s2.st2.title": "Run, and watch",
  "s2.st2.body": "Every agent in one pane. State arrives from Claude Code's hooks. Close the terminal and the sessions stay alive in the daemon; come back and pick up where you left off.",
  "s2.st3.title": "Respond",
  "s2.st3.body": "Jump to whichever agent is waiting on a permission or a question, answer, come back. Spotted something in the browser? Send the element itself back from your everyday Chrome.",
  "s2.st4.title": "Read only the diff",
  "s2.st4.body": "Review picks up where you last left it. Approve change by change — approvals survive shifting lines. Not sure why the agent did something? Ask it right there. Open it in Neovim and you also get a list of risky spots. Other people's PRs read inside pekoe too.",
  "s2.st5.title": "Land",
  "s2.st5.body": "rebase → test → push → PR in one go. Once merged, it cleans up and removes the worktree. Changed your mind? Step back one prompt.",
  "s2.shot_prompt": "← prompt #3: add CSV export",

  // [3] tapi
  "s3.h2": "Which one is waiting? Just look at the face.",
  "s3.lead": "The mascot is a tapioca pearl named tapi. If pekoe is the home for your agents, tapi is the little companion who lives there. tapi tells you everything about state: in the bottom bar it wears the state of all your sessions as a face, and says in a few words which session is doing what.",

  // [4] Principles
  "s4.h2": "Claude Code stays untouched. Your repo stays clean.",
  "s4.lead": "All the intelligence lives in the daemon; clients only display and type. Everything else follows from that one decision.",
  "s4.pr1": "Agents run as-is inside a pty. Whatever pekoe sends is written to the pty indistinguishably from keystrokes. State comes from hooks, never from reading the screen.",
  "s4.pr2": "Config, state and snapshots live outside the repo or under <code>refs/pekoe/</code> (never pushed, never in <code>git log</code>). The only trace left behind is a worktree — plain git.",
  "s4.pr3": "No knowledge of package managers or frameworks at runtime. The config is the commands you already type for that repo; pekoe fills in variables and runs them in order.",
  "s4.pr4": "The terminal layer starts as a tmux engine and moves to a libghostty-vt mux of its own. As long as the daemon/client boundary holds, any layer can be swapped without losing a feature.",
  "s4.daemon": "TUI, CLI, Neovim, the Chrome extension and MCP are thin display layers hitting the same API. A new feature lands in one place: the daemon.",
  "s4.svg_pty": "tmux -L pekoe · one pty per worktree",
  "s4.svg_aria": "pekoed, its five clients, and one pty per worktree",

  // [5] Install
  "s5.lead": "Runs on macOS (tested in Ghostty). Requires Go 1.25+, tmux 3.3+, git. Optional: gh (land, PR review), Neovim 0.10+ (review surface), Chrome (element picking).",
  "s5.soon": "pekoe isn’t public yet. Once the repository is on GitHub, the link and install steps will be right here.",
  "s5.c1": "# adds hooks to ~/.claude/settings.json",
  "s5.c2": "# optional: start pekoed at login",
  "s5.c3": "# detect the repo, draft its config",
  "s5.c4": "\"add CSV export\""
};
