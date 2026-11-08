# boba LP

boba のランディングページ。ページ自体が boba の TUI の文法(左に番号付きパネル、右に本文、最下行にステータスバーとキーヒント)で組んである。

```
index.html     構造。文言は data-i18n="key" で参照するだけ
style.css      見た目。カラートークンは docs/ui-guidelines.md の値
app.js         tapi の描画、左パネルの追従、キー操作(1-5 / j k / [ ] / ? / l)、言語切り替え
copy/ja.js     日本語コピー(key → 文)
copy/en.js     英語コピー
assets/        ステッカー(WebP、背景は切り抜き済み)
build.py       配布用の 1 枚 HTML を dist-single/ に生成
vite.config.js ローカル開発サーバーと GitHub Pages 向けビルド(dist/)
```

## 編集

- 文言を直す → `copy/ja.js` / `copy/en.js` の値を直す。キーは両ファイルで揃える
- 文言を増やす → `index.html` に `data-i18n="新キー"` の要素を置き、両方の copy にキーを足す。属性は `data-i18n-attr="alt=key"`
- 画像を差し替える → `assets/` の同名ファイルを置き換える

`index.html` をブラウザで開けばそのまま見られる(file:// でも動く)。

## 配布用の 1 枚

```sh
python3 build.py   # → dist-single/boba-lp.html
```

CSS・JS・コピー・画像をすべて埋め込んだ単一ファイル。Google Fonts だけ外部参照。

## ローカルで起動する(Vite)

Node.js が必要。フレームワークは使わず素の Vite で配信する。

```sh
npm install
npm run dev                    # 開発サーバー(既定ポート 5173)
BOBA_PORT=3003 npm run dev     # 環境変数 BOBA_PORT があればそのポートで起動(使用中なら失敗する)
```

## ビルド(GitHub Pages 用)

```sh
npm run build     # → dist/(base は /boba-site/)
npm run preview   # ビルド結果を http://localhost:4173/boba-site/ で確認
```

- 公開先は https://sakamosu.github.io/boba-site/ を想定し、ビルド時の base を `/boba-site/` にしている(dev サーバーは `/` で配信)
- 画像と CSS は Vite がハッシュ付きファイル名で `dist/assets/` に出力する
- `copy/*.js` と `app.js` は file:// でも動くようクラシックスクリプトのままにしているため、Vite はバンドルせず同じパスで `dist/` にコピーする(ビルド時の `can't be bundled without type="module"` 警告はこのため。想定どおり)
- `dist/` と `dist-single/` はどちらも生成物なので git では管理しない

## 公開

main に push すると GitHub Actions(`.github/workflows/deploy.yml`)がビルドして https://sakamosu.github.io/boba-site/ にデプロイする。手動で流すときは Actions の「Deploy to GitHub Pages」から Run workflow。
