import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// index.html は file:// でも動くよう、type="module" なしのクラシックスクリプトで
// copy/ja.js → copy/en.js → app.js を読み込んでいる。Vite はこれらをバンドルしないので、
// 同じパスのまま dist/ にコピーして、相対パスの <script src> がそのまま解決されるようにする。
const CLASSIC_SCRIPTS = ['copy/ja.js', 'copy/en.js', 'app.js'];

function copyClassicScripts() {
  return {
    name: 'pekoe:copy-classic-scripts',
    apply: 'build',
    generateBundle() {
      for (const fileName of CLASSIC_SCRIPTS) {
        this.emitFile({ type: 'asset', fileName, source: readFileSync(fileName, 'utf-8') });
      }
    },
  };
}

// og:image は絶対 URL(クローラー向け)で書いているので Vite は拾わない。
// assets/og-image.png があれば、ハッシュを付けずに dist/assets/og-image.png へコピーする。
const OG_IMAGE = 'assets/og-image.png';

function copyOgImage() {
  return {
    name: 'pekoe:copy-og-image',
    apply: 'build',
    generateBundle() {
      if (existsSync(OG_IMAGE)) this.emitFile({ type: 'asset', fileName: OG_IMAGE, source: readFileSync(OG_IMAGE) });
    },
  };
}

const port = process.env.PEKOE_PORT ? Number(process.env.PEKOE_PORT) : undefined;

export default defineConfig(({ command, isPreview }) => ({
  // GitHub Pages (https://sakamosu.github.io/pekoe-site/) 向け。dev サーバーはルートで配信する
  base: command === 'build' || isPreview ? '/pekoe-site/' : '/',
  server: port ? { port, strictPort: true } : {},
  plugins: [copyClassicScripts(), copyOgImage()],
}));
