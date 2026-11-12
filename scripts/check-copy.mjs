// copy/en.js と copy/ja.js のキーがそろっているか、index.html が参照するキーがすべてあるか、
// 使われていないキーが無いかを照合する。 node scripts/check-copy.mjs(問題があれば exit 1)
// <template> の中の参照も数える。
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['copy/en.js', 'copy/ja.js']) vm.runInContext(readFileSync(f, 'utf-8'), ctx);
const en = new Set(Object.keys(ctx.window.PEKOE_COPY.en));
const ja = new Set(Object.keys(ctx.window.PEKOE_COPY.ja));

const html = readFileSync('index.html', 'utf-8');
const used = new Set();
for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) used.add(m[1]);
for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g))
  for (const pair of m[1].split(';')) used.add(pair.split('=')[1].trim());

// まだ出していない差し込み枠(<template id="slot-evidence">)のキーは、出すときに足すので未定義でよい
const pending = new Set([...used].filter(k => k.startsWith('s2.st6.')));

const diff = (a, b) => [...a].filter(k => !b.has(k)).sort();
const problems = {
  'en にあって ja に無い': diff(en, ja),
  'ja にあって en に無い': diff(ja, en),
  'index.html が参照していて en に無い': diff(used, en).filter(k => !pending.has(k)),
  'index.html が参照していて ja に無い': diff(used, ja).filter(k => !pending.has(k)),
  'copy にあって index.html が使っていない': diff(new Set([...en, ...ja]), used),
};
console.log(`en ${en.size} keys, ja ${ja.size} keys, index.html ${used.size} refs (${pending.size} pending for unshown slots: ${[...pending].join(', ')})`);
let bad = 0;
for (const [label, keys] of Object.entries(problems)) {
  console.log(`${keys.length ? '✗' : '✓'} ${label}: ${keys.length ? keys.join(', ') : 'なし'}`);
  bad += keys.length;
}
process.exit(bad ? 1 : 0);
