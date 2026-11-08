import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// index.html は file:// でも動くよう、type="module" なしのクラシックスクリプトで
// copy/ja.js → copy/en.js → app.js を読み込んでいる。Vite はこれらをバンドルしないので、
// 同じパスのまま dist/ にコピーして、相対パスの <script src> がそのまま解決されるようにする。
const CLASSIC_SCRIPTS = ['copy/ja.js', 'copy/en.js', 'app.js'];

function copyClassicScripts() {
  return {
    name: 'boba:copy-classic-scripts',
    apply: 'build',
    generateBundle() {
      for (const fileName of CLASSIC_SCRIPTS) {
        this.emitFile({ type: 'asset', fileName, source: readFileSync(fileName, 'utf-8') });
      }
    },
  };
}

const port = process.env.BOBA_PORT ? Number(process.env.BOBA_PORT) : undefined;

export default defineConfig(({ command, isPreview }) => ({
  // GitHub Pages (https://sakamosu.github.io/boba-site/) 向け。dev サーバーはルートで配信する
  base: command === 'build' || isPreview ? '/boba-site/' : '/',
  server: port ? { port, strictPort: true } : {},
  plugins: [copyClassicScripts()],
}));
