# boba LP

boba のランディングページ。ページ自体が boba の TUI の文法(左に番号付きパネル、右に本文、最下行にステータスバーとキーヒント)で組んである。

```
index.html     構造。文言は data-i18n="key" で参照するだけ
style.css      見た目。カラートークンは docs/ui-guidelines.md の値
app.js         tapi の描画、左パネルの追従、キー操作(1-5 / j k / [ ] / ? / l)、言語切り替え
copy/ja.js     日本語コピー(key → 文)
copy/en.js     英語コピー
assets/        ステッカー(WebP、背景は切り抜き済み)
build.py       配布用の 1 枚 HTML を dist/ に生成
```

## 編集

- 文言を直す → `copy/ja.js` / `copy/en.js` の値を直す。キーは両ファイルで揃える
- 文言を増やす → `index.html` に `data-i18n="新キー"` の要素を置き、両方の copy にキーを足す。属性は `data-i18n-attr="alt=key"`
- 画像を差し替える → `assets/` の同名ファイルを置き換える

`index.html` をブラウザで開けばそのまま見られる(file:// でも動く)。

## 配布用の 1 枚

```sh
python3 build.py   # → dist/boba-lp.html
```

CSS・JS・コピー・画像をすべて埋め込んだ単一ファイル。Google Fonts だけ外部参照。
