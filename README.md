# pekoe LP

pekoe のランディングページ。ページ自体が pekoe の TUI の文法(上部に番号付きタブ、その下に本文のペイン、最下行にステータスバーとキーヒント)で組んである。

```
index.html     構造。文言は data-i18n="key" で参照するだけ
style.css      見た目。カラートークンは docs/ui-guidelines.md の値
app.js         tapi の描画、タブとステータスバーの追従、キー操作(1-7 / j k / [ ] / g G / i / ? / l / m)、画像の差し込み枠、言語切り替え、デモ動画の再生制御
copy/ja.js     日本語コピー(key → 文)
copy/en.js     英語コピー
assets/        ステッカー(WebP、背景は切り抜き済み)とデモ動画(pekoe-demo.webm / .mp4 / -poster.jpg)
scripts/check-copy.mjs  en / ja のキーと index.html の参照の照合(npm run check:copy)
build.py       配布用の 1 枚 HTML を dist-single/ に生成
vite.config.js ローカル開発サーバーと GitHub Pages 向けビルド(dist/)
```

## 構成

7 つのペイン(上部のタブと番号キー 1〜7 で移動)。各ペインの `data-mode` がステータスバーのモード、`data-say` が tapi の台詞、`data-face` が tapi の顔。

| タブ | 中身 |
| --- | --- |
| [1] home | コンセプトの 2 行、リード、3 つの約束(一度頼むだけ / 届くのは決めることだけ / マージはいつもあなた) |
| [2] a day | tapi に頼む → tapi が分けて任せる → 同居人が実装・独立レビュー → 受信箱 → あなたがマージ。段階 3 の「根拠の受信箱」は `<template id="slot-evidence">` に枠だけ |
| [3] tapi | 5 つの顔、統括役であること、tapi は書かない・マージしない |
| [4] the house | 自分で手を入れるときの設備(worktree・待ちへの応答・差分レビュー・Chrome の要素選び・land)とデモ動画 |
| [5] anywhere | 今の Web UI でできることと、作っているもの(coming の小さな枠) |
| [6] house rules | 安全のきまりと設計の原則、pekoed の図 |
| [7] install | 公開前の仮置きと、公開後に出すインストール手順(`<template id="install-steps">`) |

機能の説明は pekoe 本体の docs(README・docs/orchestration.md・docs/tapi-chat.md)に書かれていることだけにする。段階 3 以降の機能を「できる」と書かない。

## 編集

- 文言を直す → `copy/ja.js` / `copy/en.js` の値を直す。キーは両ファイルで揃える
- 文言を増やす → `index.html` に `data-i18n="新キー"` の要素を置き、両方の copy にキーを足す。属性は `data-i18n-attr="alt=key"`
- 画像を差し替える → `assets/` の同名ファイルを置き換える(下の「画像を差し替える」)
- コピーを直したら `npm run check:copy` で en / ja のキーの過不足と index.html の参照を照合する
- デモ動画を差し替える → `assets/pekoe-demo.webm`・`pekoe-demo.mp4`・`pekoe-demo-poster.jpg` を同名で置き換える(webm と mp4 は同じ中身で両方用意する)
- 単一ファイル版(`build.py`)には動画を入れない。`index.html` の `<!-- demo -->` 〜 `<!-- /demo -->` はブロックごと除去される

`index.html` をブラウザで開けばそのまま見られる(file:// でも動く)。

## 画像を差し替える

`assets/` の同名ファイルを置き換えればよい。次の画像は `.slot` の枠に入っていて、ファイルが読めたら `app.js` が仮の画像と差し替える(ファイルが無いときは仮の画像が出る)。Vite のビルドと `build.py` も、置いてあれば取り込む。

書き出しの目安: ステッカーは背景を透過にして余白を切り、長辺 600px の WebP(`cwebp -q 86 -alpha_q 100`)。キービジュアルは幅 1600px、スマホの画像は幅 600px の WebP。`og-image.png` はちょうど 1200×630 の PNG。

| ファイル | 大きさ | 場所 | 無い間に出るもの |
| --- | --- | --- | --- |
| `assets/kv-house.webp` | 16:9 | [1] home のキービジュアル | `pekoe-logo.webp` |
| `assets/tapi-delegate.webp` | 正方形くらい(背景は切り抜き) | [2] a day の 02(tapi が任せる) | `tapi-work.webp` |
| `assets/tapi-inbox.webp` | 正方形くらい(背景は切り抜き) | [2] a day の 04(受信箱) | `tapi-wait.webp` |
| `assets/tapi-evidence.webp` | 正方形くらい(背景は切り抜き) | [2] a day の 06(段階 3 の根拠の受信箱)。`<template id="slot-evidence">` を出すときに使う | (枠ごと非表示) |
| `assets/tapi-phone.webp` | 縦長(9:16) | [5] anywhere | `tapi-sleep.webp` |
| `assets/tapi-rules.webp` | 正方形くらい(背景は切り抜き) | [6] house rules | `tapi-done.webp` |
| `assets/og-image.png` | 1200×630 | SNS のカード(`og:image`) | なし(meta だけ先に入れてある) |

- `og:image` はクローラー向けに絶対 URL(`https://sakamosu.github.io/pekoe-site/assets/og-image.png`)で書いてある。Vite は絶対 URL を拾わないので、`vite.config.js` が `assets/og-image.png` をハッシュなしで `dist/assets/` にコピーする
- 置いた画像が出ないときは、ファイル名と拡張子(`.webp` / `.png`)を確かめる。無い画像へのリクエストは 404 になるが、仮の画像が出るので見た目は崩れない

## 配布用の 1 枚

```sh
python3 build.py   # → dist-single/pekoe-lp.html
```

CSS・JS・コピー・画像をすべて埋め込んだ単一ファイル。Google Fonts だけ外部参照。デモ動画は含めない。

## ローカルで起動する(Vite)

Node.js が必要。フレームワークは使わず素の Vite で配信する。

```sh
npm install
npm run dev                    # 開発サーバー(既定ポート 5173)
PEKOE_PORT=3003 npm run dev     # 環境変数 PEKOE_PORT があればそのポートで起動(使用中なら失敗する)
```

## ビルド(GitHub Pages 用)

```sh
npm run build     # → dist/(base は /pekoe-site/)
npm run preview   # ビルド結果を http://localhost:4173/pekoe-site/ で確認
```

- 公開先は https://sakamosu.github.io/pekoe-site/ を想定し、ビルド時の base を `/pekoe-site/` にしている(dev サーバーは `/` で配信)
- 画像と CSS は Vite がハッシュ付きファイル名で `dist/assets/` に出力する
- `copy/*.js` と `app.js` は file:// でも動くようクラシックスクリプトのままにしているため、Vite はバンドルせず同じパスで `dist/` にコピーする(ビルド時の `can't be bundled without type="module"` 警告はこのため。想定どおり)
- `dist/` と `dist-single/` はどちらも生成物なので git では管理しない

## 公開

main に push すると GitHub Actions(`.github/workflows/deploy.yml`)がビルドして https://sakamosu.github.io/pekoe-site/ にデプロイする。手動で流すときは Actions の「Deploy to GitHub Pages」から Run workflow。
