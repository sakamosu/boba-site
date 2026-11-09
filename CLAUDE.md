# CLAUDE.md

## 変更作業は pekoe スキルに従う

このリポジトリは pekoe で worktree ごとにセッションを分けて運用している。

- コードやコピー(`copy/*.js` など)の変更を頼まれたら、手を付ける前に **必ず pekoe スキルを読み込んで従う**
- リポジトリ本体(main のチェックアウト)では直接編集しない。`pekoe new` で worktree セッションを作って任せる
- linked worktree 内のセッションなら、その worktree で直接作業してよい
- どちらにいるかは `$PEKOE_SESSION` ではなく cwd で判定する(main 側にも `PEKOE_SESSION` が入っているため)。`git rev-parse --git-dir` と `--git-common-dir` が一致すればリポジトリ本体、異なれば linked worktree

## リポジトリ概要

- pekoe の静的 LP。`index.html`(構造)/ `style.css`(見た目)/ `app.js`(挙動)
- 文言は `copy/ja.js` と `copy/en.js`。キーは両ファイルで揃える
- main への push で GitHub Pages にデプロイされる
- 詳細は README.md
