/* pekoe LP — behaviour
   1. tapi sprite (docs/mascot.md, palette D) drawn as pixel rects
   2. TUI grammar: tabs + status bar follow the focused pane, keys, `?` modal, demo video (m = sound)
   3. image slots: assets/ に本番の画像が置かれたら仮の画像と差し替える
   4. i18n: copy/ja.js + copy/en.js → data-i18n / data-i18n-attr
*/
(function () {
  'use strict';

  /* ── 1. tapi ─────────────────────────────────────────────── */
  const P = { hi: '#f8ecd9', bd: '#e4c49a', sh: '#c7a57c', eye: '#2b201c' };
  const W = 5, H = 20 / 3;
  function eye(s, cx, cy) {
    const e = P.eye;
    switch (s) {
      case 'idle':  return `<circle cx="${cx}" cy="${cy}" r="1.9" fill="${e}"/>`;
      case 'work':  return `<circle cx="${cx}" cy="${cy}" r="3.1" fill="${e}"/>`;
      case 'wait':  return `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${e}"/><circle cx="${cx - 1.3}" cy="${cy - 1.3}" r="1.15" fill="${P.bd}"/>`;
      case 'done':  return `<path d="M${cx - 3.1} ${cy + 1.7} L${cx} ${cy - 1.9} L${cx + 3.1} ${cy + 1.7}" stroke="${e}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 'error': return `<path d="M${cx - 2.6} ${cy - 2.6} L${cx + 2.6} ${cy + 2.6} M${cx + 2.6} ${cy - 2.6} L${cx - 2.6} ${cy + 2.6}" stroke="${e}" stroke-width="1.8" stroke-linecap="round"/>`;
      case 'sleep': return `<path d="M${cx - 3.2} ${cy} L${cx + 3.2} ${cy}" stroke="${e}" stroke-width="1.8" stroke-linecap="round"/>`;
    }
    return '';
  }
  const r = (c0, c1, row, col) => `<rect x="${c0 * W}" y="${row * H}" width="${(c1 - c0 + 1) * W}" height="${H + 0.25}" fill="${P[col]}"/>`;
  // 5×3 cells of sextant blocks → 10×9 sub-cells. Round shape; glint on top-row cell 1; shadow bottom + middle-right.
  function inner3(s) {
    let g = '';
    g += r(2, 3, 1, 'hi') + r(4, 7, 1, 'bd');
    g += r(1, 1, 2, 'bd') + r(2, 3, 2, 'hi') + r(4, 8, 2, 'bd');
    for (const row of [3, 4, 5]) g += r(0, 7, row, 'bd') + r(8, 9, row, 'sh');
    g += r(1, 8, 6, 'sh') + r(2, 7, 7, 'sh');
    return g + eye(s, 15, 30) + eye(s, 35, 30);
  }
  const inner1 = s => `<rect x="5" y="0" width="35" height="20" fill="${P.bd}"/><rect x="40" y="0" width="5" height="20" fill="${P.sh}"/>${eye(s, 15, 10)}${eye(s, 35, 10)}`;
  const pearl1 = s => `<svg viewBox="0 0 50 20" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" role="img" aria-label="tapi ${s}">${inner1(s)}</svg>`;

  document.querySelectorAll('[data-tapi-line]').forEach(el => el.insertAdjacentHTML('afterbegin', pearl1(el.dataset.tapiLine)));
  document.querySelectorAll('g[data-tapi3]').forEach(g => { const w = +g.dataset.w; g.innerHTML = `<svg x="${g.dataset.x}" y="${g.dataset.y}" width="${w}" height="${w * 1.2}" viewBox="0 0 50 60" shape-rendering="crispEdges">${inner3(g.dataset.tapi3)}</svg>`; });
  document.querySelectorAll('g[data-tapi1]').forEach(g => { const w = +g.dataset.w; g.innerHTML = `<svg x="${g.dataset.x}" y="${g.dataset.y}" width="${w}" height="${w * 0.4}" viewBox="0 0 50 20" shape-rendering="crispEdges">${inner1(g.dataset.tapi1)}</svg>`; });

  // the live face in the status bar
  const live = document.querySelector('[data-tapi-live]');
  const stapi = document.getElementById('stapi'), say = document.getElementById('say');
  let faceState = 'idle', sayTimer = null;
  function setFace(s) {
    faceState = s; live.innerHTML = pearl1(s);
    stapi.className = 'seg tapi' + (s === 'wait' ? ' warn' : s === 'error' ? ' err' : (s === 'sleep' || s === 'idle') ? ' dimmed' : '');
  }
  function setSay(t) { say.textContent = t; }
  setFace('idle');

  /* ── 2. sections / focus / keys ──────────────────────────── */
  const secs = [...document.querySelectorAll('.pane[data-sec]')];
  const tabs = [...document.querySelectorAll('.tabs a')];
  const LAST = secs.length; // [7] install
  const mid = () => [['j/k', 'scroll'], [']', 'next'], ['[', 'prev'], ['l', 'lang'], ['?', 'keys']];
  const KEYS = { 1: [['i', 'install'], ['2', 'a day'], ['l', 'lang'], ['?', 'keys']] };
  for (let n = 2; n < LAST; n++) KEYS[n] = mid();
  KEYS[LAST] = [['[', 'prev'], ['g', 'top'], ['l', 'lang'], ['?', 'keys']];
  // demo video (単一ファイル版では index.html から除去されるので、無い時は何もしない)
  const demo = document.getElementById('demo'), soundbtn = document.getElementById('soundbtn');
  const demoSec = demo ? secs.indexOf(demo.closest('.pane')) + 1 : 0;
  if (demo) KEYS[demoSec].splice(3, 0, ['m', 'sound']);
  let cur = -1;
  const skeys = document.getElementById('skeys'), smode = document.getElementById('smode'), spos = document.getElementById('spos');
  const renderKeys = n => { skeys.innerHTML = KEYS[n].map(([k, a]) => `<b>${k}</b>${a}`).join(''); };
  // 各ペインの data-face が、そのペインにいる間の tapi の顔(data-say が台詞)
  const restFace = () => (secs[cur] && secs[cur].dataset.face) || 'idle';
  function focusSec(i) {
    if (i === cur) return;
    cur = i;
    secs.forEach((s, j) => s.classList.toggle('focus', j === i));
    tabs.forEach((t, j) => t.classList.toggle('sel', j === i));
    // 狭い幅ではタブ列が横スクロールになるので、選んだタブが見えるように寄せる(ページは縦に動かさない)
    const bar = tabs[i] && tabs[i].parentElement;
    if (bar && bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: Math.max(0, tabs[i].offsetLeft - bar.clientWidth / 2 + tabs[i].offsetWidth / 2), behavior: 'smooth' });
    const s = secs[i];
    smode.textContent = s.dataset.mode; spos.textContent = `${i + 1}/${secs.length}`;
    renderKeys(i + 1);
    if (!sayTimer) { setSay(s.dataset.say); setFace(restFace()); }
  }
  function track() {
    const y = window.scrollY + window.innerHeight * 0.35;
    let i = 0; secs.forEach((s, j) => { if (s.offsetTop <= y) i = j; });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) i = secs.length - 1;
    focusSec(i);
    wake();
  }
  let ticking = false;
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(() => { track(); ticking = false; }); ticking = true; } }, { passive: true });
  window.addEventListener('resize', track);
  function go(i) { i = Math.max(0, Math.min(secs.length - 1, i)); secs[i].scrollIntoView({ behavior: 'smooth', block: 'start' }); }

  // `?` modal — rows are selectable and runnable (lazygit-style menu)
  const modal = document.getElementById('modal'); const mrows = [...modal.querySelectorAll('.mrow')]; let msel = 0;
  function openModal() { modal.classList.add('open'); document.body.classList.add('modal-open'); msel = Math.max(0, cur); paintM(); setFace('wait'); setSay('which key?'); }
  function closeModal() { modal.classList.remove('open'); document.body.classList.remove('modal-open'); setFace(restFace()); setSay(secs[cur].dataset.say); }
  function paintM() { mrows.forEach((m, i) => m.classList.toggle('sel', i === msel)); }
  function runAct(a) {
    if (a.startsWith('sec:')) { closeModal(); go(+a.slice(4) - 1); return; }
    switch (a) {
      case 'next': closeModal(); go(cur + 1); break;
      case 'prev': closeModal(); go(cur - 1); break;
      case 'down': window.scrollBy({ top: 140, behavior: 'smooth' }); break;
      case 'up': window.scrollBy({ top: -140, behavior: 'smooth' }); break;
      case 'top': closeModal(); window.scrollTo({ top: 0, behavior: 'smooth' }); break;
      case 'bottom': closeModal(); window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); break;
      case 'lang': closeModal(); toggleLang(); break;
      case 'sound': closeModal(); toggleSound(); break;
      case 'close': closeModal(); break;
    }
  }
  mrows.forEach((m, i) => { m.addEventListener('mouseenter', () => { msel = i; paintM(); }); m.addEventListener('click', () => runAct(m.dataset.act)); });
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.getElementById('keysbtn').addEventListener('click', () => modal.classList.contains('open') ? closeModal() : openModal());

  function unknownKey(k) {
    setFace('error'); setSay(`no such key: ${k}`);
    clearTimeout(sayTimer);
    sayTimer = setTimeout(() => { sayTimer = null; setFace(restFace()); setSay(secs[cur].dataset.say); }, 1300);
  }
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase(); if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    const k = e.key;
    if (modal.classList.contains('open')) {
      if (k === 'Escape' || k === '?') { closeModal(); e.preventDefault(); return; }
      if (k === 'j' || k === 'ArrowDown') { msel = (msel + 1) % mrows.length; paintM(); e.preventDefault(); return; }
      if (k === 'k' || k === 'ArrowUp') { msel = (msel - 1 + mrows.length) % mrows.length; paintM(); e.preventDefault(); return; }
      if (k === 'Enter') { runAct(mrows[msel].dataset.act); e.preventDefault(); return; }
      return;
    }
    if (k === '?') { openModal(); e.preventDefault(); return; }
    if (/^[1-9]$/.test(k) && +k <= secs.length) { go(+k - 1); e.preventDefault(); return; }
    if (k === 'j' || k === 'ArrowDown') { window.scrollBy({ top: 140, behavior: 'smooth' }); e.preventDefault(); return; }
    if (k === 'k' || k === 'ArrowUp') { window.scrollBy({ top: -140, behavior: 'smooth' }); e.preventDefault(); return; }
    if (k === ']') { go(cur + 1); e.preventDefault(); return; }
    if (k === '[') { go(cur - 1); e.preventDefault(); return; }
    if (k === 'g') { window.scrollTo({ top: 0, behavior: 'smooth' }); e.preventDefault(); return; }
    if (k === 'G') { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); e.preventDefault(); return; }
    if (k === 'i') { go(LAST - 1); e.preventDefault(); return; }
    if (k === 'l') { toggleLang(); e.preventDefault(); return; }
    if (k === 'm' && demo) { toggleSound(); e.preventDefault(); return; }
    if (k === 'Escape' || k === 'Tab' || k === 'Shift' || k === ' ' || k === 'Enter' || k.startsWith('Arrow') || k.startsWith('Page') || k === 'Home' || k === 'End') return;
    if (k.length === 1) unknownKey(k);
  });

  // blink · sleep · pause when hidden (docs/mascot.md timing)
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // demo: ミュートで自動ループし、m / ボタンで音を出す。画面外・タブ非表示では止める
  let demoInView = false;
  const demoCanAutoplay = () => demo && demo.muted && !reduce && demoInView && !document.hidden;
  function demoPlay() { const p = demo.play(); if (p) p.catch(() => { /* autoplay blocked etc. */ }); }
  function syncDemo() {
    if (!demo) return;
    if (document.hidden || !demoInView) demo.pause();
    else if (demoCanAutoplay()) demoPlay();
  }
  function setSound(on) {
    demo.muted = !on; // ボタン表示は volumechange で合わせる
    if (on) { demo.currentTime = 0; demoPlay(); } else syncDemo();
  }
  function paintSound() {
    soundbtn.setAttribute('aria-pressed', String(!demo.muted));
    soundbtn.querySelector('span').textContent = demo.muted ? 'sound off' : 'sound on';
  }
  function toggleSound() { if (demo) setSound(demo.muted); }
  if (demo) {
    if (reduce) { demo.autoplay = false; demo.pause(); demo.controls = true; demo.parentElement.classList.add('controls'); }
    soundbtn.addEventListener('click', toggleSound);
    demo.addEventListener('volumechange', paintSound); // controls から切り替えた時も合わせる
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => { demoInView = es[es.length - 1].isIntersecting; syncDemo(); }, { threshold: 0.25 }).observe(demo);
    } else { demoInView = true; syncDemo(); }
  }
  let blinkT = null, sleepT = null, asleep = false;
  function scheduleBlink() {
    clearTimeout(blinkT); if (reduce || document.hidden) return;
    blinkT = setTimeout(() => {
      if ((faceState === 'idle' || faceState === 'work') && !asleep) {
        const prev = faceState; live.innerHTML = pearl1('sleep');
        setTimeout(() => { if (faceState === prev) live.innerHTML = pearl1(prev); }, 140);
      }
      scheduleBlink();
    }, 4000 + Math.random() * 2000);
  }
  function wake() {
    if (asleep) { asleep = false; setFace(restFace()); setSay(secs[cur].dataset.say); }
    clearTimeout(sleepT);
    sleepT = setTimeout(() => { asleep = true; setFace('sleep'); setSay('all quiet'); }, 180000);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) { clearTimeout(blinkT); clearTimeout(sleepT); } else { scheduleBlink(); wake(); } syncDemo(); });
  ['mousemove', 'keydown', 'touchstart'].forEach(ev => document.addEventListener(ev, () => { if (asleep) wake(); }, { passive: true }));

  /* ── 3. image slots ──────────────────────────────────────────
     .slot に本番の画像(.slot-img)と仮の画像(.slot-fb)を並べておき、本番の画像が読めたら差し替える。
     assets/ に決まった名前のファイルを置くだけで差し込める(README「画像を差し替える」) */
  document.querySelectorAll('.slot').forEach(slot => {
    const img = slot.querySelector('.slot-img'); if (!img) return;
    const ok = () => { if (img.naturalWidth > 0) slot.classList.add('has-img'); };
    if (img.complete) ok(); else img.addEventListener('load', ok);
  });

  /* ── 4. i18n ─────────────────────────────────────────────── */
  const COPY = window.PEKOE_COPY || {};
  const root = document.documentElement;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  function applyLang(l) {
    const dict = COPY[l] || {};
    root.dataset.lang = l; root.lang = l;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.dataset.i18n];
      if (v == null) return;
      if (el.namespaceURI === SVG_NS) el.textContent = v.replace(/<[^>]+>/g, '');
      else el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split('=').map(s => s.trim());
        const v = dict[key]; if (attr && v != null) el.setAttribute(attr, v);
      });
    });
    document.querySelectorAll('#langbtn .opt').forEach(o => o.classList.toggle('on', o.dataset.l === l));
    try { localStorage.setItem('pekoe-lang', l); } catch (e) { /* private mode etc. */ }
    track();
  }
  function toggleLang() { applyLang(root.dataset.lang === 'ja' ? 'en' : 'ja'); }
  let lang = null; try { lang = localStorage.getItem('pekoe-lang'); } catch (e) { /* ignore */ }
  if (lang !== 'ja' && lang !== 'en') lang = 'en';
  document.getElementById('langbtn').addEventListener('click', toggleLang);

  applyLang(lang);
  scheduleBlink(); wake();
})();
