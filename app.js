// ═══════════════════════════════════════════════════════════
// SVENSKA HERALD — ÇEKİRDEK
// Depolama · Durum · API (streaming) · Ses · Sekmeler · Dersler
// ═══════════════════════════════════════════════════════════
'use strict';

// ── DEPOLAMA ──────────────────────────────────────────────
const LS = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v === null ? def : JSON.parse(v); } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { showToast('Depolama dolu — eski verileri temizle', 'error'); return false; } },
  del: (k) => { try { localStorage.removeItem(k); } catch {} },
  keys: () => { try { return Object.keys(localStorage).filter(k => k.startsWith('sh_')); } catch { return []; } },
};

function todayKey(d) { const x = d ? new Date(d) : new Date(); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`; }
function dayKeyOffset(n) { const d = new Date(); d.setDate(d.getDate() + n); return todayKey(d); }

// ── DURUM ─────────────────────────────────────────────────
const S = {
  dark: LS.get('sh_dark', true),
  tab: 'lessons',
  topicK: 'vet', uIdx: 0, flipped: {},
  quiz: false, qIdx: 0, sel: null, score: 0, done: false, quizOrder: [], quizWrong: [],
  bank: LS.get('sh_bank', []),
  bFil: 'all', bSrch: '', bSort: 'new',
  rIdx: 0, rFlip: false, rQueue: null, rDir: 'sv2tr',
  completed: LS.get('sh_completed', {}),
  xp: LS.get('sh_xp', 0),
  streak: LS.get('sh_streak', 0),
  bestStreak: LS.get('sh_bestStreak', 0),
  lastActive: LS.get('sh_lastActive', ''),
  activityLog: LS.get('sh_activity', {}),
  badges: LS.get('sh_badges', []),
  dailyLoading: false,
  cfg: Object.assign({
    apiKey: '', workspaceId: '', model: 'claude-haiku-4-5-20251001', voiceURI: '', rate: 0.9,
    autoSpeak: false, autoListen: false, dailyGoal: 5,
    level: 'B1', standard: 'cefr', profession: 'veterinär', autoCorrect: true,
  }, LS.get('sh_cfg', {})),
  settingsTab: 'api',
};

function saveCfg() { LS.set('sh_cfg', S.cfg); }
function saveBank() { LS.set('sh_bank', S.bank); }
function saveCompleted() { LS.set('sh_completed', S.completed); }

(function updateStreak() {
  const today = todayKey(), last = S.lastActive;
  if (last === today) return;
  if (last === dayKeyOffset(-1)) S.streak++;
  else S.streak = 1;
  S.bestStreak = Math.max(S.bestStreak, S.streak);
  S.lastActive = today;
  LS.set('sh_streak', S.streak); LS.set('sh_bestStreak', S.bestStreak); LS.set('sh_lastActive', today);
})();

// ── GÜVENLİ RENDER ───────────────────────────────────────
function esc(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const attr = esc;

function md(text) {
  let t = esc(text);
  t = t.replace(/```([\s\S]*?)```/g, (_, c) => `<pre class="md-pre"><code>${c.trim()}</code></pre>`);
  t = t.replace(/`([^`\n]+)`/g, '<code class="md-code">$1</code>');
  t = t.replace(/^### (.+)$/gm, '<h4 class="md-h">$1</h4>');
  t = t.replace(/^## (.+)$/gm, '<h3 class="md-h">$1</h3>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  t = t.replace(/^\s*[-•*]\s+(.+)$/gm, '<li>$1</li>');
  t = t.replace(/^\s*(\d+)\.\s+(.+)$/gm, '<li>$2</li>');
  t = t.replace(/(<li>[\s\S]*?<\/li>)(?!\s*<li>)/g, '<ul class="md-ul">$1</ul>');
  t = t.replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>');
  t = t.replace(/<br>\s*(<(?:ul|h3|h4|pre))/g, '$1').replace(/(<\/(?:ul|h3|h4|pre)>)\s*<br>/g, '$1');
  t = t.replace(/(<\/li>)(?:\s*<br>\s*)+(<li>)/g, '$1$2');
  t = t.replace(/(<ul[^>]*>)(?:\s*<br>\s*)+/g, '$1').replace(/(?:\s*<br>\s*)+(<\/ul>)/g, '$1');
  return t;
}

let toastTimer = null;
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast ' + type;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 3200);
}

// ── SESLENDİRME (svensk TTS) ─────────────────────────────
const TTS = {
  voices: [],
  load() {
    if (!window.speechSynthesis) return;
    const all = speechSynthesis.getVoices();
    this.voices = all.filter(v => /^sv/i.test(v.lang));
    if (!this.voices.length) this.voices = all;    // hiç İsveççe ses yoksa hepsini göster
  },
  pick() {
    if (!this.voices.length) this.load();
    return this.voices.find(v => v.voiceURI === S.cfg.voiceURI)
      || this.voices.find(v => /^sv/i.test(v.lang))
      || this.voices[0] || null;
  },
  hasSwedish() { this.load(); return speechSynthesis && speechSynthesis.getVoices().some(v => /^sv/i.test(v.lang)); },
  speak(text, opts = {}) {
    if (!window.speechSynthesis || !text) return null;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/[*_`#>✗✓→•]/g, ' ').replace(/\s+/g, ' ').trim());
    const v = this.pick();
    if (v) u.voice = v;
    u.lang = v && /^sv/i.test(v.lang) ? v.lang : 'sv-SE';
    u.rate = opts.rate ?? S.cfg.rate ?? 0.9;
    u.pitch = 1;
    if (opts.onEnd) u.onend = opts.onEnd;
    speechSynthesis.speak(u);
    return u;
  },
  stop() { if (window.speechSynthesis) speechSynthesis.cancel(); },
};
if (window.speechSynthesis) { TTS.load(); speechSynthesis.onvoiceschanged = () => TTS.load(); }
function speak(t) { TTS.speak(t); }

// ── MİKROFON (sv-SE) ─────────────────────────────────────
const SRClass = window.SpeechRecognition || window.webkitSpeechRecognition;
const Mic = {
  supported: !!SRClass,
  rec: null, listening: false, want: false, finalText: '', handlers: {},
  start(h = {}) {
    if (!this.supported) { showToast('Tarayıcın konuşma tanımayı desteklemiyor (Chrome/Edge dene)', 'error'); return false; }
    this.stop();
    this.handlers = h; this.finalText = ''; this.want = true;
    const r = new SRClass();
    r.lang = h.lang || 'sv-SE';
    r.continuous = true; r.interimResults = true; r.maxAlternatives = 1;
    r.onstart = () => { this.listening = true; h.onStart?.(); };
    r.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const tr = e.results[i][0].transcript;
        if (e.results[i].isFinal) this.finalText += tr + ' '; else interim += tr;
      }
      h.onResult?.(this.finalText.trim(), interim.trim());
    };
    r.onerror = (e) => {
      if (e.error === 'no-speech') return;
      this.want = false; this.listening = false;
      h.onError?.(e.error);
      if (e.error === 'not-allowed') showToast('Mikrofon izni reddedildi', 'error');
      else if (e.error === 'language-not-supported') showToast('Tarayıcın İsveççe tanımayı desteklemiyor', 'error');
    };
    r.onend = () => {
      this.listening = false;
      if (this.want) { try { r.start(); this.listening = true; return; } catch {} }
      h.onEnd?.(this.finalText.trim());
    };
    this.rec = r;
    try { r.start(); } catch { return false; }
    return true;
  },
  stop() { this.want = false; if (this.rec) { try { this.rec.stop(); } catch {} } this.listening = false; },
};

// ── API ──────────────────────────────────────────────────
const API_URL = 'https://api.anthropic.com/v1/messages';
const apiHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': S.cfg.apiKey,
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true',
  ...(S.cfg.workspaceId ? { 'anthropic-workspace-id': S.cfg.workspaceId } : {}),
});

function apiErrMsg(status, body) {
  if (/anthropic-workspace-id/i.test(body || '')) return 'Anahtarın bir workspace\'e bağlı değil. ⚙️ Ayarlar → API → "Workspace ID" alanını doldur (console.anthropic.com → Settings → Workspaces → ID sütunu), ya da workspace\'e özel yeni bir anahtar oluştur.';
  if (status === 401) return 'API anahtarı geçersiz. Ayarlar → API bölümünden kontrol et.';
  if (status === 429) return 'Çok fazla istek. Biraz bekleyip tekrar dene.';
  if (status === 400 && /credit|balance/i.test(body || '')) return 'API kredin bitmiş görünüyor. console.anthropic.com → Billing.';
  if (status === 529 || status === 503) return 'Sunucu yoğun. Birkaç saniye sonra tekrar dene.';
  return `Hata ${status}. ${String(body || '').slice(0, 160)}`;
}

async function callAPI(system, messages, opts = {}) {
  if (!S.cfg.apiKey) throw new Error('NO_API_KEY');
  const res = await fetch(API_URL, {
    method: 'POST', headers: apiHeaders(), signal: opts.signal,
    body: JSON.stringify({ model: opts.model || S.cfg.model, max_tokens: opts.maxTokens || 1400, system, messages }),
  });
  if (!res.ok) throw new Error(apiErrMsg(res.status, await res.text().catch(() => '')));
  const data = await res.json();
  return (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
}

async function callAPIStream(system, messages, opts = {}) {
  if (!S.cfg.apiKey) throw new Error('NO_API_KEY');
  const res = await fetch(API_URL, {
    method: 'POST', headers: apiHeaders(), signal: opts.signal,
    body: JSON.stringify({ model: opts.model || S.cfg.model, max_tokens: opts.maxTokens || 1400, system, messages, stream: true }),
  });
  if (!res.ok) throw new Error(apiErrMsg(res.status, await res.text().catch(() => '')));
  if (!res.body) return callAPI(system, messages, opts);
  const reader = res.body.getReader(), dec = new TextDecoder();
  let buf = '', full = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split('\n'); buf = lines.pop() || '';
    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const p = line.slice(5).trim();
      if (!p || p === '[DONE]') continue;
      let ev; try { ev = JSON.parse(p); } catch { continue; }
      if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
        full += ev.delta.text; opts.onDelta?.(ev.delta.text, full);
      } else if (ev.type === 'error') throw new Error(ev.error?.message || 'Stream hatası');
    }
  }
  return full;
}

function parseJSONLoose(raw) {
  let t = String(raw).trim().replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  try { return JSON.parse(t); } catch {}
  const s = t.indexOf('{'), e = t.lastIndexOf('}');
  if (s > -1 && e > s) { try { return JSON.parse(t.slice(s, e + 1)); } catch {} }
  const a = t.indexOf('['), b = t.lastIndexOf(']');
  if (a > -1 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch {} }
  throw new Error('AI yanıtı okunamadı. Tekrar dene.');
}
async function callJSON(system, messages, opts = {}) {
  return parseJSONLoose(await callAPI(system, messages, Object.assign({ maxTokens: 2400 }, opts)));
}

// ── XP / SEVİYE / ROZET ──────────────────────────────────
const LEVEL_TITLES = ['Nybörjare', 'Lärling', 'Läsare', 'Reporter', 'Redaktör', 'Krönikör', 'Chefredaktör', 'Legend'];
function getLevel() {
  const l = Math.floor(S.xp / 100) + 1;
  return { level: l, xpInLevel: S.xp % 100, title: LEVEL_TITLES[Math.min(LEVEL_TITLES.length - 1, Math.floor((l - 1) / 3))] };
}
function addXP(amount) {
  const before = getLevel().level;
  S.xp += amount; LS.set('sh_xp', S.xp);
  const t = todayKey();
  S.activityLog[t] = (S.activityLog[t] || 0) + amount;
  LS.set('sh_activity', S.activityLog);
  if (getLevel().level > before) showToast(`🎉 Nivå ${getLevel().level} — ${getLevel().title}!`, 'success');
  checkBadges(); updateHeader();
}

const BADGES = [
  { id: 'first', icon: '🌱', name: 'Första ordet', desc: 'İlk kelimeni kaydet', test: () => S.bank.length >= 1 },
  { id: 'w50', icon: '📗', name: 'Samlare', desc: '50 kelime', test: () => S.bank.length >= 50 },
  { id: 'w200', icon: '📚', name: 'Ordbok', desc: '200 kelime', test: () => S.bank.length >= 200 },
  { id: 's7', icon: '🔥', name: 'En vecka', desc: '7 gün seri', test: () => S.streak >= 7 },
  { id: 's30', icon: '🌋', name: 'En månad', desc: '30 gün seri', test: () => S.streak >= 30 },
  { id: 'q10', icon: '📝', name: 'Provkung', desc: '10 ünite %70+', test: () => Object.values(S.completed).filter(p => p >= 70).length >= 10 },
  { id: 'qall', icon: '🏆', name: 'Alla klara', desc: 'Tüm üniteler %70+', test: () => { const tot = Object.values(CONTENT).reduce((s, t) => s + t.units.length, 0); return Object.values(S.completed).filter(p => p >= 70).length >= tot; } },
  { id: 'lv10', icon: '⚡', name: 'Nivå 10', desc: '1000 XP', test: () => S.xp >= 1000 },
  { id: 'ex1', icon: '🎓', name: 'Första provet', desc: 'İlk sınav denemesi', test: () => (LS.get('sh_exam_results', [])).length >= 1 },
  { id: 'ex10', icon: '🎯', name: 'Provmaraton', desc: '10 sınav denemesi', test: () => (LS.get('sh_exam_results', [])).length >= 10 },
  { id: 'c1', icon: '💎', name: 'C1-nivå', desc: 'Bir denemede C1 al', test: () => (LS.get('sh_exam_results', [])).some(r => ['C1', 'C2'].includes(r.cefr)) },
  { id: 'jour1', icon: '📋', name: 'Journalskrivare', desc: 'İlk journalını yaz', test: () => (LS.get('sh_journal_results', [])).length >= 1 },
  { id: 'jour10', icon: '🩺', name: 'Rutinerad', desc: '10 journal yaz', test: () => (LS.get('sh_journal_results', [])).length >= 10 },
  { id: 'talk', icon: '🎙️', name: 'Pratglad', desc: 'Sesli sohbeti dene', test: () => LS.get('sh_voice_used', false) },
];
function checkBadges() {
  let gained = null;
  BADGES.forEach(b => { if (!S.badges.includes(b.id)) { try { if (b.test()) { S.badges.push(b.id); gained = b; } } catch {} } });
  if (gained) { LS.set('sh_badges', S.badges); showToast(`${gained.icon} Rozet: ${gained.name}!`, 'success'); }
}

// ── KELİME REGISTRY ──────────────────────────────────────
const REG = { lesson: [], daily: [], chat: {}, exam: [], journal: [] };
function regWord(src, i, mIdx) {
  if (src === 'chat') return (REG.chat[mIdx] || [])[i];
  return (REG[src] || [])[i];
}

function isSaved(sv) { return S.bank.some(x => x.sv === sv); }
function getColor(k) { return COLORS[CONTENT[k]?.color] || COLORS.teal; }
function getTopic() { return CONTENT[S.topicK]; }
function getUnit() { return getTopic().units[S.uIdx]; }

function saveWordObj(w, cat) {
  if (!w || !w.sv) return;
  const idx = S.bank.findIndex(x => x.sv === w.sv);
  if (idx > -1) {
    S.bank.splice(idx, 1); saveBank();
    showToast('Bankadan çıkarıldı', 'info');
  } else {
    S.bank.push({
      sv: w.sv, tr: w.tr || '', form: w.form || '', uttal: w.uttal || w.pron || '',
      ex: w.ex || w.example || '', tip: w.tip || '',
      cat: cat || S.topicK, savedAt: Date.now(), srInterval: 1, srDue: Date.now(), srEase: 2.5, srReps: 0,
    });
    saveBank(); addXP(5);
    showToast('★ Ordbanken: eklendi! +5 XP', 'success');
  }
  updateHeader(); renderTab(S.tab);
}
function todaySavedCount() { return S.bank.filter(w => w.savedAt && todayKey(w.savedAt) === todayKey()).length; }

// ── SM-2 ─────────────────────────────────────────────────
function updateSR(word, quality) {
  const w = S.bank.find(x => x.sv === word.sv);
  if (!w) return;
  if (quality < 3) { w.srReps = 0; w.srInterval = 1; }
  else {
    if (!w.srReps) w.srInterval = 1;
    else if (w.srReps === 1) w.srInterval = 6;
    else w.srInterval = Math.round((w.srInterval || 1) * (w.srEase || 2.5));
    w.srReps = (w.srReps || 0) + 1;
    w.srEase = Math.max(1.3, (w.srEase || 2.5) + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  }
  w.srDue = Date.now() + w.srInterval * 86400000;
  saveBank();
}
function getDueWords() { const now = Date.now(); return S.bank.filter(w => !w.srDue || w.srDue <= now); }

// ═══════════════════════════════════════════════════════════
// AKSİYON YÖNLENDİRİCİSİ
// ═══════════════════════════════════════════════════════════
const ACTIONS = {};
window.ACTIONS = ACTIONS;

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const fn = ACTIONS[el.dataset.act];
  if (!fn) return;
  e.preventDefault();
  if (el.dataset.stop !== 'no') e.stopPropagation();
  fn(el.dataset, el, e);
});
document.addEventListener('input', (e) => {
  const el = e.target.closest('[data-inp]');
  if (el && ACTIONS[el.dataset.inp]) ACTIONS[el.dataset.inp](el.dataset, el, e);
});
document.addEventListener('change', (e) => {
  const el = e.target.closest('[data-chg]');
  if (el && ACTIONS[el.dataset.chg]) ACTIONS[el.dataset.chg](el.dataset, el, e);
});

Object.assign(ACTIONS, {
  switchTab: (d) => switchTab(d.tab),
  toggleTheme: () => toggleTheme(),
  openSettings: () => openSettings(),
  closeSettings: () => closeSettings(),
  saveSettings: () => saveSettings(),
  setSettingsTab: (d) => setSettingsTab(d.tab),
  toggleKeyVisibility: () => { const i = document.getElementById('apiKeyInput'); i.type = i.type === 'password' ? 'text' : 'password'; },
  testVoice: () => { applyVoiceInputs(); TTS.speak('Hej! Så här kommer Svenska Herald att läsa upp orden för dig.'); },
  exportData: () => exportData(),
  exportCsv: () => exportCsv(),
  resetData: () => resetData(),
  speak: (d) => TTS.speak(d.text),
  saveWord: (d) => saveWordObj(regWord(d.src, +d.i, d.m), d.cat),
});

function toggleTheme() { S.dark = !S.dark; LS.set('sh_dark', S.dark); applyTheme(); }
function applyTheme() {
  document.getElementById('body').className = S.dark ? 'dark' : 'light';
  const b = document.getElementById('themeBtn'); if (b) b.textContent = S.dark ? '🌙' : '☀️';
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = S.dark ? '#0d0f14' : '#f4f6fb';
}

// ── SEKMELER ─────────────────────────────────────────────
const TAB_IDS = ['lessons', 'daily', 'review', 'bank', 'exam', 'journal', 'progress', 'chat'];
function switchTab(tabId) {
  if (!TAB_IDS.includes(tabId)) return;
  if (S.tab === 'chat' && tabId !== 'chat') window.Chat?.onLeave?.();
  if (S.tab === 'exam' && tabId !== 'exam') window.Exam?.onLeave?.();
  S.tab = tabId;
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  const pane = document.getElementById('tab' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
  if (pane) pane.classList.remove('hidden');
  renderTab(tabId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderTab(tabId) {
  const pane = document.getElementById('tab' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
  if (!pane) return;
  if (tabId === 'lessons') pane.innerHTML = renderLessons();
  else if (tabId === 'daily') pane.innerHTML = renderDaily();
  else if (tabId === 'review') pane.innerHTML = renderReview();
  else if (tabId === 'bank') pane.innerHTML = renderBank();
  else if (tabId === 'exam') { pane.innerHTML = window.Exam ? Exam.render() : ''; window.Exam?.afterRender?.(); }
  else if (tabId === 'journal') { pane.innerHTML = window.Journal ? Journal.render() : ''; window.Journal?.afterRender?.(); }
  else if (tabId === 'progress') pane.innerHTML = renderProgress();
  else if (tabId === 'chat') { pane.innerHTML = window.Chat ? Chat.render() : ''; window.Chat?.afterRender?.(); }
}

function pill(color, txt, sm) {
  const fs = sm ? '9px' : '10px', pd = sm ? '2px 6px' : '3px 10px';
  return `<span class="chip" style="background:${attr(color)};font-size:${fs};padding:${pd}">${esc(txt)}</span>`;
}

function updateHeader() {
  const saved = todaySavedCount(), goal = S.cfg.dailyGoal || 5;
  const pct = Math.min(100, Math.round((saved / goal) * 100));
  const fill = document.getElementById('goalFill');
  if (fill) { fill.style.width = pct + '%'; fill.style.background = pct >= 100 ? 'var(--green)' : 'var(--gold)'; }
  const lv = getLevel();
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set('goalLabel', `${saved}/${goal}` + (pct >= 100 ? ' 🎉' : ''));
  set('xpLabel', S.xp + ' XP');
  set('levelLabel', `Nivå ${lv.level} · ${lv.title}`);
  set('streakNum', S.streak);
  const totalWords = Object.values(CONTENT).reduce((s, t) => s + t.units.reduce((a, u) => a + u.vocab.length, 0), 0);
  set('siteSubtitle', `${totalWords} ord · Veterinär- & humanmedicin · Myndigheter · Journalföring · ${STANDARDS[S.cfg.standard].short}`);
  const chips = document.getElementById('headerChips');
  if (chips) chips.innerHTML = [['var(--orange)', 'Veterinär'], ['var(--red)', 'Medicin'], ['var(--blue)', 'Myndigheter'], ['var(--purple)', 'Grammatik']].map(([c, t]) => pill(c, t)).join('');
  const sb = document.getElementById('streakBadge');
  if (sb) sb.title = `Dagsserie: ${S.streak} · Rekord: ${S.bestStreak}`;
  const lb = document.getElementById('levelChip');
  if (lb) lb.textContent = S.cfg.level;
}

// ═══════════════════════════════════════════════════════════
// LEKTIONER
// ═══════════════════════════════════════════════════════════
function shuffled(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

function topicBar() {
  return TOPIC_ORDER.map(k => {
    const v = CONTENT[k], tc = getColor(k);
    const done = v.units.filter((_, i) => (S.completed[`${k}_${i}`] || 0) >= 70).length;
    const active = S.topicK === k;
    return `<button class="topic-btn ${active ? 'active' : ''}" style="${active ? `background:${tc};border-color:${tc}` : ''}" data-act="setTopic" data-k="${attr(k)}">
      <span>${v.icon}</span><span>${esc(v.label)}</span>${done ? `<span class="topic-done">✓${done}</span>` : ''}</button>`;
  }).join('');
}

function unitTabsHTML() {
  const topic = getTopic();
  if (topic.units.length < 2) return '';
  const lc = getColor(S.topicK);
  return `<div class="unit-tabs">${topic.units.map((u, i) => {
    const pct = S.completed[`${S.topicK}_${i}`], active = S.uIdx === i;
    return `<button class="unit-tab ${active ? 'active' : ''}" style="${active ? `background:${lc}22;border-color:${lc};color:${lc}` : ''}" data-act="setUnit" data-i="${i}">
      <span>${i + 1}. ${esc(u.title)}</span>${pct ? `<span class="pct-badge" style="background:${pct >= 70 ? 'var(--green)' : 'var(--gold)'}">${pct}%</span>` : ''}</button>`;
  }).join('')}</div>`;
}

function vocabCardHTML(w, i, src, cat) {
  const flipped = src === 'lesson' ? !!S.flipped[i] : true;
  const saved = isSaved(w.sv);
  const lc = getColor(cat || S.topicK);
  return `<div class="vocab-card ${flipped ? 'flipped' : ''}" ${src === 'lesson' ? `data-act="toggleFlip" data-i="${i}"` : ''}
    style="${flipped ? `border-color:${lc};box-shadow:0 0 0 2px ${lc}33` : ''}">
    <div class="vocab-en">${esc(w.sv)}</div>
    <div class="vocab-pron">${w.uttal ? '[' + esc(w.uttal) + ']' : ''}</div>
    <div class="vocab-tr">${esc(w.tr)}</div>
    ${w.form ? `<div class="vocab-form">${esc(w.form)}</div>` : ''}
    ${flipped ? `<div class="vocab-extra">
      ${w.ex ? `<div class="vocab-ex">"${esc(w.ex)}"</div>` : ''}
      ${w.tip ? `<div class="vocab-tip" style="color:${lc};background:${lc}18">💡 ${esc(w.tip)}</div>` : ''}
    </div>` : ''}
    <div class="vocab-actions">
      <button class="vocab-speak-btn" data-act="speak" data-text="${attr(w.sv)}" aria-label="Uttal">🔊</button>
      <button class="vocab-star-btn ${saved ? 'saved' : ''}" data-act="saveWord" data-src="${attr(src)}" data-i="${i}" data-cat="${attr(cat || S.topicK)}" aria-label="Spara">${saved ? '★' : '☆'}</button>
    </div>
  </div>`;
}

function renderLessons() {
  const topic = getTopic(), unit = getUnit(), lc = getColor(S.topicK);
  REG.lesson = unit.vocab;

  const newsBox = `<div class="news-box" style="border-left-color:${lc}">
    <div class="news-source" style="color:${lc}">${topic.icon} ${esc(topic.label)} — ${esc(unit.title)} ${pill('#555', unit.source, true)}</div>
    <div class="news-text">${esc(unit.headline)}</div>
    <button class="news-listen" data-act="speak" data-text="${attr(unit.headline)}">🔊 Lyssna på rubriken</button>
  </div>`;

  if (!S.quiz) {
    const cards = unit.vocab.map((w, i) => vocabCardHTML(w, i, 'lesson')).join('');
    const allSaved = unit.vocab.every(w => isSaved(w.sv));
    return `<div class="fade-in">
      <div class="topic-bar">${topicBar()}</div>
      ${unitTabsHTML()}${newsBox}
      <div class="vocab-grid">${cards}</div>
      <p class="flip-hint">💡 Karta tıkla → örnek cümle & ipucu · 🔊 telaffuz · ★ ordbanken'e ekle · çekim bilgisi kartın üzerinde</p>
      <div class="lesson-footer">
        <button class="btn-ghost" data-act="saveAllUnit">${allSaved ? '✓ Hepsi bankada' : '★ Tüm üniteyi bankaya ekle'}</button>
        <button class="quiz-start-btn" style="background:${lc}" data-act="startQuiz">📝 Prov →</button>
      </div>
    </div>`;
  }

  if (!S.done) {
    const q = getUnit().quiz[S.quizOrder[S.qIdx]];
    const opts = q.o.map((opt, oi) => {
      let cls = 'quiz-opt';
      if (S.sel !== null) { if (opt === q.a) cls += ' correct'; else if (opt === S.sel) cls += ' wrong'; }
      const prefix = S.sel !== null ? (opt === q.a ? '✓ ' : (opt === S.sel ? '✗ ' : '')) : '';
      return `<button class="${cls}" data-act="answerQuiz" data-o="${oi}">${prefix}${esc(opt)}</button>`;
    }).join('');
    return `<div class="fade-in">
      <div class="topic-bar">${topicBar()}</div>${unitTabsHTML()}
      <div class="quiz-box" style="border-color:${lc}">
        <div class="quiz-header"><span style="color:var(--muted)">Fråga ${S.qIdx + 1}/${S.quizOrder.length}</span>
          <span class="quiz-score-live" style="color:${lc}">✓ ${S.score}</span></div>
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${(S.qIdx / S.quizOrder.length) * 100}%;background:${lc}"></div></div>
        <div class="quiz-question">${esc(q.q)}</div>
        <div class="quiz-options">${opts}</div>
        <button class="quiz-back-btn" data-act="stopQuiz">← Tillbaka</button>
      </div></div>`;
  }

  const total = S.quizOrder.length, sc = S.score;
  const emoji = sc === total ? '🏆' : sc >= Math.ceil(total / 2) ? '👍' : '📚';
  const msg = sc === total ? 'Perfekt! Alla rätt. 🎉' : sc >= Math.ceil(total / 2) ? 'Bra jobbat! Lite mer träning så sitter det.' : 'Gå igenom orden en gång till och försök igen.';
  const wrongList = S.quizWrong.length ? `<div class="quiz-wrong-box"><div class="qwb-title">Gözden geçir:</div>
    ${S.quizWrong.map(w => `<div class="qwb-row"><span>${esc(w.q)}</span><b style="color:var(--green)">${esc(w.a)}</b></div>`).join('')}</div>` : '';
  const nextBtn = S.uIdx < getTopic().units.length - 1 ? `<button class="btn-next" data-act="nextUnit">Nästa avsnitt →</button>` : '';
  return `<div class="fade-in">
    <div class="topic-bar">${topicBar()}</div>${unitTabsHTML()}
    <div class="quiz-done" style="border-color:${lc}">
      <div class="quiz-done-emoji">${emoji}</div>
      <div class="quiz-done-score">${sc}/${total} rätt</div>
      <div class="quiz-done-msg">${msg}</div>${wrongList}
      <div class="quiz-done-btns">
        <button style="background:${lc};color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;padding:11px 20px" data-act="startQuiz">🔄 Igen</button>
        <button style="background:none;border:2px solid ${lc};color:${lc};border-radius:8px;font-size:13px;font-weight:700;padding:11px 20px" data-act="stopQuiz">← Tillbaka</button>
        ${nextBtn}
      </div></div></div>`;
}

Object.assign(ACTIONS, {
  setTopic: (d) => { S.topicK = d.k; S.uIdx = 0; S.quiz = false; S.done = false; S.flipped = {}; S.sel = null; renderTab('lessons'); },
  setUnit: (d) => { S.uIdx = +d.i; S.quiz = false; S.done = false; S.flipped = {}; S.sel = null; renderTab('lessons'); },
  toggleFlip: (d) => { S.flipped[+d.i] = !S.flipped[+d.i]; renderTab('lessons'); },
  startQuiz: () => { S.quiz = true; S.qIdx = 0; S.sel = null; S.score = 0; S.done = false; S.quizWrong = []; S.quizOrder = shuffled(getUnit().quiz.map((_, i) => i)); renderTab('lessons'); },
  stopQuiz: () => { S.quiz = false; S.done = false; S.flipped = {}; renderTab('lessons'); },
  nextUnit: () => { S.uIdx++; S.quiz = false; S.done = false; S.flipped = {}; renderTab('lessons'); },
  saveAllUnit: () => {
    const unit = getUnit(); let n = 0;
    unit.vocab.forEach(w => { if (!isSaved(w.sv)) { S.bank.push({ ...w, cat: S.topicK, savedAt: Date.now(), srInterval: 1, srDue: Date.now(), srEase: 2.5, srReps: 0 }); n++; } });
    if (n) { saveBank(); addXP(n * 5); showToast(`${n} ord tillagda! +${n * 5} XP`, 'success'); }
    else showToast('Bu ünitenin tüm kelimeleri zaten bankada', 'info');
    renderTab('lessons');
  },
  answerQuiz: (d) => {
    if (S.sel !== null) return;
    const q = getUnit().quiz[S.quizOrder[S.qIdx]], opt = q.o[+d.o];
    S.sel = opt;
    if (opt === q.a) S.score++; else S.quizWrong.push({ q: q.q, a: q.a });
    renderTab('lessons');
    setTimeout(() => {
      if (S.qIdx + 1 >= S.quizOrder.length) {
        const pct = Math.round((S.score / S.quizOrder.length) * 100);
        const key = `${S.topicK}_${S.uIdx}`;
        S.completed[key] = Math.max(S.completed[key] || 0, pct);
        saveCompleted(); addXP(pct >= 70 ? 20 : 10); S.done = true;
      } else { S.qIdx++; S.sel = null; }
      renderTab('lessons');
    }, 1200);
  },
});

// ═══════════════════════════════════════════════════════════
// DAGENS INNEHÅLL
// ═══════════════════════════════════════════════════════════
function noApiNotice(what) {
  return `<div class="no-api-notice">
    <h3>🔑 API Anahtarı Gerekli</h3>
    <p>${esc(what)} için Anthropic API anahtarını ekle.<br><a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">console.anthropic.com</a> → API Keys</p>
    <button class="btn-primary" style="max-width:220px;margin:12px auto 0" data-act="openSettings">Anahtarı Ekle</button></div>`;
}

function renderDaily() {
  const todayStr = new Date().toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const head = (btn) => `<div class="daily-header"><div><h2 class="pane-h2">📰 Dagens svenska</h2><div class="daily-date">${esc(todayStr)}</div></div>${btn}</div>`;
  if (!S.cfg.apiKey) return `<div class="fade-in">${head('')}${noApiNotice('Günlük AI içeriği')}</div>`;

  const cached = LS.get('sh_daily_' + todayKey(), null);
  if (S.dailyLoading) return `<div class="fade-in">${head('')}<div class="ai-loading"><div class="ai-loading-dots"><span></span><span></span><span></span></div><span>AI dagens tidning hazırlıyor...</span></div></div>`;
  if (cached) return renderDailyContent(cached, todayStr);

  return `<div class="fade-in">${head('<button class="daily-generate-btn" data-act="genDaily">✨ Dagens innehåll</button>')}
    <div class="daily-empty"><div style="font-size:48px;margin-bottom:14px">🗞️</div>
      <p>AI her gün senin seviyene (${esc(S.cfg.level)}) uygun bir haber, özet, 6 kelime ve mini quiz üretir.</p></div>
    <div class="daily-topic-row">${DEPARTMENTS.map(t => `<button class="chat-topic-chip" data-act="genDaily" data-topic="${attr(t.label)}">${esc(t.label)}</button>`).join('')}</div>
  </div>`;
}

function renderDailyContent(c, todayStr) {
  REG.daily = c.words || [];
  const tc = /vet|djur/i.test(c.topic || '') ? 'var(--orange)' : /häls|medic|vård/i.test(c.topic || '') ? 'var(--red)' : 'var(--teal)';
  const cards = (c.words || []).map((w, i) => vocabCardHTML(w, i, 'daily', mapCat(w.cat))).join('');
  const qz = (c.quiz || []).length ? `<div class="daily-quiz"><h3 class="pane-h3">Snabbkoll</h3>
    ${c.quiz.map((q, i) => `<div class="dq-item"><div class="dq-q">${i + 1}. ${esc(q.q)}</div>
      <div class="dq-opts">${(q.o || []).map(o => `<button class="dq-opt" data-act="dailyAnswer" data-q="${i}" data-v="${attr(o)}">${esc(o)}</button>`).join('')}</div>
      <div class="dq-fb hidden" id="dqfb${i}"></div></div>`).join('')}</div>` : '';

  return `<div class="fade-in">
    <div class="daily-header"><div><h2 class="pane-h2">📰 Dagens svenska</h2><div class="daily-date">${esc(todayStr)}</div></div>
      <button class="daily-generate-btn" data-act="genDaily" data-force="1">🔄 Ny</button></div>
    <div class="daily-news-card" style="border-left-color:${tc}">
      <div class="daily-news-source">${esc(c.source || '')} — ${esc(c.topic || '')}</div>
      <div class="daily-news-headline">${esc(c.headline || '')}</div>
      <div class="daily-news-body">${esc(c.summary || '')}</div>
      ${c.tr_summary ? `<div class="daily-tr">🇹🇷 ${esc(c.tr_summary)}</div>` : ''}
      <button class="news-listen" data-act="speak" data-text="${attr((c.headline || '') + '. ' + (c.summary || ''))}">🔊 Lyssna</button>
    </div>
    <h3 class="pane-h3">Dagens ord</h3><div class="vocab-grid">${cards}</div>${qz}</div>`;
}

function mapCat(c) { return CONTENT[c] ? c : 'nyheter'; }

Object.assign(ACTIONS, {
  genDaily: async (d) => {
    const key = todayKey();
    if (!d.force && LS.get('sh_daily_' + key, null)) { renderTab('daily'); return; }
    if (!S.cfg.apiKey) { openSettings(); return; }
    S.dailyLoading = true; renderTab('daily');
    try {
      const todayStr = new Date().toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const content = await callJSON(DAILY_SYSTEM_PROMPT, [{ role: 'user', content: `Dagens datum: ${todayStr}. Elevens CEFR-nivå: ${S.cfg.level}. Yrke: ${S.cfg.profession}. ${d.topic ? `Ämnesområde: ${d.topic}.` : 'Välj själv ett relevant ämne.'} Skapa nyhet, sammanfattning, 6 ord och 3 quizfrågor. Endast JSON.` }], { maxTokens: 2200 });
      LS.set('sh_daily_' + key, content);
      addXP(10); showToast('Dagens tidning klar! +10 XP 🎉', 'success');
      pruneDailyCache();
    } catch (e) {
      showToast(e.message === 'NO_API_KEY' ? 'Önce API anahtarını ekle' : e.message, 'error');
      if (e.message === 'NO_API_KEY') openSettings();
    }
    S.dailyLoading = false; renderTab('daily');
  },
  dailyAnswer: (d, el) => {
    const c = LS.get('sh_daily_' + todayKey(), null); if (!c) return;
    const q = c.quiz[+d.q], fb = document.getElementById('dqfb' + d.q), ok = d.v === q.a;
    el.parentElement.querySelectorAll('.dq-opt').forEach(b => { b.disabled = true; if (b.dataset.v === q.a) b.classList.add('correct'); else if (b === el) b.classList.add('wrong'); });
    if (fb) { fb.className = 'dq-fb ' + (ok ? 'ok' : 'no'); fb.textContent = ok ? '✓ Rätt!' : `✗ Rätt svar: ${q.a}` + (q.why ? ` — ${q.why}` : ''); }
    if (ok) addXP(2);
  },
});
function pruneDailyCache() {
  const keep = new Set([0, -1, -2, -3, -4, -5, -6].map(n => 'sh_daily_' + dayKeyOffset(n)));
  LS.keys().filter(k => k.startsWith('sh_daily_') && !keep.has(k)).forEach(LS.del);
}

// ═══════════════════════════════════════════════════════════
// REPETITION
// ═══════════════════════════════════════════════════════════
function reviewQueue() {
  if (!S.rQueue) { const due = getDueWords(); S.rQueue = (due.length ? due : S.bank).map(w => w.sv); }
  return S.rQueue.map(sv => S.bank.find(w => w.sv === sv)).filter(Boolean);
}

function renderReview() {
  if (!S.bank.length) {
    return `<div class="fade-in empty-state"><div class="empty-state-icon">📖</div>
      <div class="empty-state-text">Henüz kelime yok.<br>Derslerde ☆ ile kelime ekle.</div>
      <button class="btn-primary" style="margin-top:16px;max-width:220px" data-act="switchTab" data-tab="lessons">Lektioner →</button></div>`;
  }
  const q = reviewQueue();
  if (!q.length) { S.rQueue = null; return renderReview(); }
  if (S.rIdx >= q.length) S.rIdx = 0;
  const w = q[S.rIdx];
  const due = getDueWords().length;
  const mastered = S.bank.filter(x => (x.srReps || 0) >= 3 && (x.srEase || 2.5) >= 2.4).length;
  const learning = S.bank.filter(x => (x.srReps || 0) > 0 && (x.srReps || 0) < 3).length;
  const pct = Math.round(((S.rIdx + 1) / q.length) * 100);
  const sv2tr = S.rDir === 'sv2tr';

  const face = !S.rFlip ? `
    <div class="fc-label">${sv2tr ? 'Svenska → Türkçe?' : 'Türkçe → Svenska?'}</div>
    <div class="fc-word">${esc(sv2tr ? w.sv : w.tr)}</div>
    <div class="fc-pron">${sv2tr && w.uttal ? '[' + esc(w.uttal) + ']' : ''}</div>
    ${sv2tr ? `<button class="fc-speak-btn" data-act="speak" data-text="${attr(w.sv)}">🔊 Lyssna</button>` : ''}
    <div class="fc-flip-hint">Kartı çevir (veya <kbd>Space</kbd>)</div>` : `
    <div class="fc-label">${sv2tr ? 'Türkçe' : 'Svenska'}</div>
    <div class="fc-answer">${esc(sv2tr ? w.tr : w.sv)}</div>
    ${w.form ? `<div class="fc-form">${esc(w.form)}</div>` : ''}
    ${w.ex ? `<div class="fc-ex">"${esc(w.ex)}"</div>` : ''}
    ${w.tip ? `<div class="fc-tip-box">💡 ${esc(w.tip)}</div>` : ''}
    <div class="fc-rating">
      <button style="background:var(--red);color:#fff" data-act="rateCard" data-q="1">😟 Svårt <kbd>1</kbd></button>
      <button style="background:var(--gold);color:#fff" data-act="rateCard" data-q="3">🙂 Okej <kbd>2</kbd></button>
      <button style="background:var(--green);color:#fff" data-act="rateCard" data-q="5">😄 Lätt <kbd>3</kbd></button>
    </div>`;

  return `<div class="fade-in">
    <div class="section-head"><h2>🔁 Repetition</h2><span class="badge" style="background:var(--teal)">${due ? due + ' väntar' : 'Klart för i dag!'}</span>
      <button class="btn-ghost btn-xs" style="margin-left:auto" data-act="toggleDir">${sv2tr ? '🇸🇪→🇹🇷' : '🇹🇷→🇸🇪'} yön değiştir</button></div>
    <div class="review-stats-row">
      <div class="review-stat"><div class="review-stat-num" style="color:var(--gold)">${due}</div><div class="review-stat-lbl">Väntar</div></div>
      <div class="review-stat"><div class="review-stat-num" style="color:var(--green)">${mastered}</div><div class="review-stat-lbl">Kan</div></div>
      <div class="review-stat"><div class="review-stat-num" style="color:var(--red)">${learning}</div><div class="review-stat-lbl">Lär mig</div></div>
      <div class="review-stat"><div class="review-stat-num" style="color:var(--teal)">${S.bank.length}</div><div class="review-stat-lbl">Totalt</div></div>
    </div>
    <div class="review-progress-row">
      <div class="review-bar-wrap"><div class="review-bar-fill" style="width:${pct}%"></div></div>
      <span class="rev-count">${S.rIdx + 1}/${q.length}</span>
      <button class="btn-ghost btn-xs" data-act="resetReview">↺ Om</button></div>
    <div class="flashcard" data-act="flipCard" tabindex="0">${face}</div>
    ${!S.rFlip ? `<div class="fc-nav">
      <button class="btn-ghost" data-act="prevCard" ${S.rIdx === 0 ? 'disabled' : ''}>← Förra</button>
      <button class="btn-primary" data-act="flipCard">Vänd</button>
      <button class="btn-ghost" data-act="nextCard" ${S.rIdx >= q.length - 1 ? 'disabled' : ''}>Nästa →</button></div>` : ''}
    <p class="flip-hint">Değerlendirmen tekrar aralığını belirler (SM-2). "Svårt" dediklerin yarın, "Lätt" dediklerin haftalar sonra döner.</p>
  </div>`;
}

Object.assign(ACTIONS, {
  flipCard: () => { S.rFlip = !S.rFlip; renderTab('review'); },
  prevCard: () => { S.rIdx = Math.max(0, S.rIdx - 1); S.rFlip = false; renderTab('review'); },
  nextCard: () => { const q = reviewQueue(); S.rIdx = Math.min(q.length - 1, S.rIdx + 1); S.rFlip = false; renderTab('review'); },
  resetReview: () => { S.rQueue = null; S.rIdx = 0; S.rFlip = false; renderTab('review'); },
  toggleDir: () => { S.rDir = S.rDir === 'sv2tr' ? 'tr2sv' : 'sv2tr'; S.rFlip = false; renderTab('review'); },
  rateCard: (d) => {
    const q = reviewQueue(), w = q[S.rIdx];
    if (w) { updateSR(w, +d.q); addXP(+d.q >= 3 ? 3 : 1); }
    if (S.rIdx >= q.length - 1) { S.rQueue = null; S.rIdx = 0; S.rFlip = false; showToast('Rundan klar! 🎉', 'success'); }
    else { S.rIdx++; S.rFlip = false; }
    renderTab('review');
  },
});

// ═══════════════════════════════════════════════════════════
// ORDBANKEN
// ═══════════════════════════════════════════════════════════
function bankFiltered() {
  const s = S.bSrch.toLowerCase();
  let list = S.bank.filter(w => {
    const fc = S.bFil === 'all' || w.cat === S.bFil || (S.bFil === 'due' && (!w.srDue || w.srDue <= Date.now()));
    const fs = !s || w.sv.toLowerCase().includes(s) || (w.tr || '').toLowerCase().includes(s);
    return fc && fs;
  });
  if (S.bSort === 'az') list.sort((a, b) => a.sv.localeCompare(b.sv, 'sv'));
  else if (S.bSort === 'due') list.sort((a, b) => (a.srDue || 0) - (b.srDue || 0));
  else list.sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
  return list;
}

function bankGridHTML() {
  const list = bankFiltered();
  if (!list.length) return `<div class="empty-state"><div class="empty-state-icon">🔍</div><div class="empty-state-text">Inga ord hittades.</div></div>`;
  return `<div class="bank-grid">${list.map(w => {
    const tc = getColor(w.cat);
    const dueNow = !w.srDue || w.srDue <= Date.now();
    const days = w.srDue ? Math.ceil((w.srDue - Date.now()) / 86400000) : 0;
    return `<div class="bank-card">
      ${pill(tc, CONTENT[w.cat]?.label || w.cat, true)}
      <div class="bank-card-en">${esc(w.sv)}
        <span class="sr-badge" style="background:${dueNow ? 'var(--red)' : 'var(--green)'}">${dueNow ? 'Nu!' : days + 'd'}</span>
        <button class="bank-card-speak" data-act="speak" data-text="${attr(w.sv)}">🔊</button></div>
      <div class="bank-card-pron">${w.uttal ? '[' + esc(w.uttal) + ']' : ''}</div>
      <div class="bank-card-tr">${esc(w.tr)}</div>
      ${w.form ? `<div class="bank-card-form">${esc(w.form)}</div>` : ''}
      ${w.ex ? `<div class="bank-card-ex">"${esc(w.ex)}"</div>` : ''}
      <button class="bank-card-del" data-act="deleteWord" data-sv="${attr(w.sv)}" aria-label="Ta bort">✕</button>
    </div>`;
  }).join('')}</div>`;
}

function renderBank() {
  const cats = TOPIC_ORDER;
  const stats = [['Totalt', S.bank.length, 'var(--gold)'], ...cats.map(c => [CONTENT[c].icon + ' ' + CONTENT[c].label.split(' ')[0], S.bank.filter(w => w.cat === c).length, getColor(c)])]
    .map(([l, n, c]) => `<div class="bank-stat-item"><span class="bank-stat-num" style="color:${c}">${n}</span><span class="bank-stat-lbl">${esc(l)}</span></div>`).join('');
  const filters = ['all', 'due', ...cats]
    .map(f => `<button class="filter-chip ${S.bFil === f ? 'active' : ''}" data-act="setBFil" data-f="${f}">${f === 'all' ? 'Alla' : f === 'due' ? '⏰ Väntar' : CONTENT[f].icon + ' ' + CONTENT[f].label.split(' ')[0]}</button>`).join('');

  return `<div class="fade-in">
    <div class="section-head"><h2>📚 Ordbanken</h2><span class="badge" style="background:var(--teal)">${S.bank.length} ord</span>
      ${S.bank.length ? `<button class="btn-primary btn-xs" style="margin-left:auto" data-act="switchTab" data-tab="review">🔁 Repetera</button>` : ''}</div>
    <div class="bank-stats-row">${stats}</div>
    <div class="filter-row">
      <input class="search-input" id="bankSearch" placeholder="Sök ord..." value="${attr(S.bSrch)}" data-inp="setBSrch" autocomplete="off">
      <select class="fld-select fld-inline" data-chg="setBSort">
        <option value="new"${S.bSort === 'new' ? ' selected' : ''}>Nyast först</option>
        <option value="az"${S.bSort === 'az' ? ' selected' : ''}>A → Ö</option>
        <option value="due"${S.bSort === 'due' ? ' selected' : ''}>Repetitionsordning</option>
      </select></div>
    <div class="filter-row">${filters}</div>
    <div id="bankGrid">${bankGridHTML()}</div></div>`;
}

Object.assign(ACTIONS, {
  setBFil: (d) => { S.bFil = d.f; renderTab('bank'); },
  setBSort: (d, el) => { S.bSort = el.value; document.getElementById('bankGrid').innerHTML = bankGridHTML(); },
  setBSrch: (d, el) => { S.bSrch = el.value; const g = document.getElementById('bankGrid'); if (g) g.innerHTML = bankGridHTML(); },
  deleteWord: (d) => { S.bank = S.bank.filter(w => w.sv !== d.sv); saveBank(); S.rQueue = null; renderTab('bank'); showToast('Ord borttaget', 'info'); updateHeader(); },
});

// ═══════════════════════════════════════════════════════════
// FRAMSTEG
// ═══════════════════════════════════════════════════════════
function renderProgress() {
  const totalUnits = Object.values(CONTENT).reduce((s, t) => s + t.units.length, 0);
  const totalWords = Object.values(CONTENT).reduce((s, t) => s + t.units.reduce((a, u) => a + u.vocab.length, 0), 0);
  const completedCount = Object.values(S.completed).filter(p => p >= 70).length;
  const lv = getLevel();
  const results = LS.get('sh_exam_results', []);
  const jr = LS.get('sh_journal_results', []);
  const lastCefr = results.length ? results[results.length - 1].cefr : null;

  const cells = Array.from({ length: 91 }, (_, i) => {
    const k = dayKeyOffset(-(90 - i)), xp = S.activityLog[k] || 0;
    const l = xp >= 60 ? 4 : xp >= 30 ? 3 : xp >= 10 ? 2 : xp > 0 ? 1 : 0;
    return `<div class="heatmap-cell level-${l}" title="${k}: ${xp} XP"></div>`;
  }).join('');

  const statCards = [
    { icon: '📚', label: 'Lektionsord', val: totalWords, c: 'var(--teal)' },
    { icon: '✅', label: 'Klara avsnitt', val: `${completedCount}/${totalUnits}`, c: 'var(--green)' },
    { icon: '⭐', label: 'Ordbanken', val: S.bank.length, c: 'var(--gold)' },
    { icon: '🔥', label: 'Dagsserie', val: `${S.streak} (rek. ${S.bestStreak})`, c: 'var(--orange)' },
    { icon: '⚡', label: 'Total XP', val: S.xp, c: 'var(--purple)' },
    { icon: '🎓', label: 'Senaste nivå', val: lastCefr || '—', c: 'var(--blue)' },
  ].map(s => `<div class="stat-card"><div class="stat-card-icon">${s.icon}</div><div class="stat-card-num" style="color:${s.c}">${esc(s.val)}</div><div class="stat-card-lbl">${s.label}</div></div>`).join('');

  const topicRows = TOPIC_ORDER.map(k => {
    const v = CONTENT[k], tc = getColor(k);
    const done = v.units.filter((_, i) => (S.completed[`${k}_${i}`] || 0) >= 70).length;
    const pct = Math.round((done / v.units.length) * 100);
    return `<div class="prog-topic-row"><div class="prog-topic-header"><span>${v.icon} ${esc(v.label)}</span>
      <span style="font-size:12px;color:${tc};font-weight:700">${done}/${v.units.length}</span></div>
      <div class="prog-bar-track"><div class="prog-bar-fill" style="width:${pct}%;background:${tc}"></div></div></div>`;
  }).join('');

  const badgeGrid = BADGES.map(b => {
    const has = S.badges.includes(b.id);
    return `<div class="badge-item ${has ? 'has' : ''}" title="${attr(b.desc)}"><div class="badge-ico">${has ? b.icon : '🔒'}</div><div class="badge-name">${esc(b.name)}</div></div>`;
  }).join('');

  const goalChips = [3, 5, 10, 15, 20].map(n => `<button class="goal-chip ${S.cfg.dailyGoal === n ? 'active' : ''}" data-act="setGoal" data-n="${n}">${n}</button>`).join('');
  const saved = todaySavedCount(), goalPct = Math.min(100, Math.round((saved / S.cfg.dailyGoal) * 100));

  return `<div class="fade-in">
    <div class="section-head"><h2>📊 Framsteg & mål</h2></div>
    <div class="stat-cards">${statCards}</div>
    <div class="panel"><div class="panel-title">Nivå ${lv.level} — ${esc(lv.title)} · ${lv.xpInLevel}/100 XP</div>
      <div class="thin-track"><div class="thin-fill" style="width:${lv.xpInLevel}%;background:var(--purple)"></div></div>
      <div class="panel-hint">Ord +5 · Quiz +10-20 · Dagens innehåll +10 · Repetition +1-3 · Chatt +2 · Prov +25-40 · Journal +30 XP</div></div>
    <div class="panel"><div class="panel-title">🎯 Dagligt mål</div><div class="goal-set-row">${goalChips}</div>
      <div class="thin-track"><div class="thin-fill" style="width:${goalPct}%;background:${goalPct >= 100 ? 'var(--green)' : 'var(--gold)'}"></div></div>
      <div class="panel-hint">${saved}/${S.cfg.dailyGoal} ord ${goalPct >= 100 ? '— Målet nått! 🎉' : ''}</div></div>
    <div class="panel"><div class="panel-title">📅 Aktivitet (90 dagar)</div><div class="heatmap-grid heatmap-90">${cells}</div>
      <div class="heatmap-legend"><span>Lite</span><i class="level-1"></i><i class="level-2"></i><i class="level-3"></i><i class="level-4"></i><span>Mycket</span></div></div>
    <div class="panel"><div class="panel-title">📋 Journalföring</div>
      <div class="panel-hint">${jr.length} journal skriven${jr.length === 1 ? '' : 'a'}${jr.length ? ` · son puan ${jr[jr.length - 1].score}/100` : ' — ilk journalını yazmaya ne dersin?'}</div>
      <button class="btn-ghost btn-xs" style="margin-top:10px" data-act="switchTab" data-tab="journal">Journalföring →</button></div>
    <div class="panel"><div class="panel-title">🏅 Märken (${S.badges.length}/${BADGES.length})</div><div class="badge-grid">${badgeGrid}</div></div>
    <div class="panel-title" style="margin:20px 0 12px">Ämnesvis framsteg</div>${topicRows}
    <div class="ai-suggestions"><div class="panel-title">💬 AI-läraren kan hjälpa dig med</div>
      <div class="sugg-list">${[
        'Förklara skillnaden mellan "sedan", "eftersom" och "därför att" med exempel',
        'Ge mig 5 medicinska förkortningar som används i svenska journaler',
        'Rätta den här meningen: Jag har varit på sjukhuset igår',
        'Öva rollspel: jag är veterinär och du är en orolig djurägare',
        'Vilka prepositioner används med "bero", "bestå" och "behandla"?',
      ].map(q => `<button class="sugg-btn" data-act="askTeacher" data-q="${attr(q)}">▸ ${esc(q)}</button>`).join('')}</div></div>
  </div>`;
}

Object.assign(ACTIONS, {
  setGoal: (d) => { S.cfg.dailyGoal = +d.n; saveCfg(); renderTab('progress'); updateHeader(); },
  askTeacher: (d) => { switchTab('chat'); setTimeout(() => window.Chat?.send(d.q), 120); },
});

// ═══════════════════════════════════════════════════════════
// INSTÄLLNINGAR
// ═══════════════════════════════════════════════════════════
function openSettings() {
  document.getElementById('apiKeyInput').value = S.cfg.apiKey || '';
  document.getElementById('workspaceInput').value = S.cfg.workspaceId || '';
  document.getElementById('modelSelect').value = S.cfg.model;
  document.getElementById('levelSelect').value = S.cfg.level;
  document.getElementById('standardSelect').value = S.cfg.standard;
  document.getElementById('professionInput').value = S.cfg.profession;
  document.getElementById('autoSpeakChk').checked = !!S.cfg.autoSpeak;
  document.getElementById('autoListenChk').checked = !!S.cfg.autoListen;
  document.getElementById('correctChk').checked = !!S.cfg.autoCorrect;
  document.getElementById('rateRange').value = S.cfg.rate;
  document.getElementById('rateVal').textContent = Number(S.cfg.rate).toFixed(2);
  fillVoiceSelect();
  const hasSv = TTS.hasSwedish();
  document.getElementById('micSupportNote').innerHTML =
    (hasSv ? '🔊 İsveççe ses bulundu.' : '⚠️ Bu cihazda İsveççe konuşma sesi yok — telaffuz yanlış olabilir. Windows: Ayarlar → Saat ve Dil → Konuşma → Ses ekle → Svenska. Mac: Ayarlar → Erişilebilirlik → Konuşulan İçerik → Sesler.') +
    '<br>' + (Mic.supported ? '🎙️ Mikrofon tanıma destekleniyor (sv-SE).' : '⚠️ Bu tarayıcı konuşma tanımayı desteklemiyor. Chrome veya Edge kullan.');
  document.getElementById('standardDesc').textContent = STANDARDS[S.cfg.standard].desc;
  document.getElementById('goalChipsSettings').innerHTML = [3, 5, 10, 15, 20].map(n =>
    `<button class="goal-chip ${S.cfg.dailyGoal === n ? 'active' : ''}" data-act="setGoal2" data-n="${n}">${n} ord</button>`).join('');
  renderDataStats();
  document.getElementById('settingsModal').classList.remove('hidden');
}
function closeSettings() { document.getElementById('settingsModal').classList.add('hidden'); }
function setSettingsTab(t) {
  S.settingsTab = t;
  document.querySelectorAll('.settings-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === t));
  ['api', 'voice', 'study', 'data'].forEach(k => document.getElementById('setPane' + k.charAt(0).toUpperCase() + k.slice(1)).classList.toggle('hidden', k !== t));
}
function fillVoiceSelect() {
  TTS.load();
  const sel = document.getElementById('voiceSelect'); if (!sel) return;
  sel.innerHTML = TTS.voices.length
    ? TTS.voices.map(v => `<option value="${attr(v.voiceURI)}"${v.voiceURI === S.cfg.voiceURI ? ' selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')
    : '<option value="">Systemets standardröst</option>';
}
function applyVoiceInputs() {
  const v = document.getElementById('voiceSelect'); if (v) S.cfg.voiceURI = v.value;
  const r = document.getElementById('rateRange'); if (r) S.cfg.rate = parseFloat(r.value);
}
function saveSettings() {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (key && !key.startsWith('sk-')) { showToast('API anahtarı "sk-" ile başlamalı', 'error'); return; }
  S.cfg.apiKey = key;
  S.cfg.workspaceId = document.getElementById('workspaceInput').value.trim();
  S.cfg.model = document.getElementById('modelSelect').value;
  S.cfg.level = document.getElementById('levelSelect').value;
  S.cfg.standard = document.getElementById('standardSelect').value;
  S.cfg.profession = document.getElementById('professionInput').value.trim() || 'veterinär';
  S.cfg.autoSpeak = document.getElementById('autoSpeakChk').checked;
  S.cfg.autoListen = document.getElementById('autoListenChk').checked;
  S.cfg.autoCorrect = document.getElementById('correctChk').checked;
  applyVoiceInputs(); saveCfg(); closeSettings();
  showToast('Inställningar sparade ✓', 'success');
  renderTab(S.tab); updateHeader();
}
Object.assign(ACTIONS, {
  setGoal2: (d) => { S.cfg.dailyGoal = +d.n; saveCfg(); openSettings(); updateHeader(); },
  standardChanged: (d, el) => { const s = STANDARDS[el.value]; if (s) document.getElementById('standardDesc').textContent = s.desc; },
});

function renderDataStats() {
  const bytes = LS.keys().reduce((s, k) => s + (localStorage.getItem(k) || '').length, 0);
  document.getElementById('dataStats').innerHTML = `
    <div class="ds-row"><span>Ordbanken</span><b>${S.bank.length}</b></div>
    <div class="ds-row"><span>Provförsök</span><b>${LS.get('sh_exam_results', []).length}</b></div>
    <div class="ds-row"><span>Journaler</span><b>${LS.get('sh_journal_results', []).length}</b></div>
    <div class="ds-row"><span>Total XP</span><b>${S.xp}</b></div>
    <div class="ds-row"><span>Lagringsstorlek</span><b>${(bytes / 1024).toFixed(1)} KB</b></div>`;
}

function download(name, content, type) {
  const blob = new Blob([content], { type: type || 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
function exportData() {
  const dump = {};
  LS.keys().forEach(k => { if (k !== 'sh_cfg') dump[k] = LS.get(k, null); });
  const cfg = { ...S.cfg }; delete cfg.apiKey;
  dump.sh_cfg = cfg; dump._exportedAt = new Date().toISOString();
  download(`svenska-herald-backup-${todayKey()}.json`, JSON.stringify(dump, null, 2));
  showToast('Yedek indirildi (API anahtarı dahil edilmedi)', 'success');
}
function exportCsv() {
  const rows = [['Svenska', 'Türkçe', 'Form', 'Uttal', 'Exempel', 'Kategori', 'Repetition']];
  S.bank.forEach(w => rows.push([w.sv, w.tr, w.form || '', w.uttal || '', w.ex || '', w.cat || '', w.srDue ? todayKey(w.srDue) : '']));
  download(`ordbanken-${todayKey()}.csv`, '﻿' + rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n'), 'text/csv;charset=utf-8');
}
document.addEventListener('change', (e) => {
  if (e.target.id !== 'importFile') return;
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      if (!d.sh_bank && !d.sh_xp) throw new Error('bad');
      Object.keys(d).forEach(k => { if (k.startsWith('sh_')) LS.set(k, d[k]); });
      showToast('Yedek yüklendi, sayfa yenileniyor...', 'success');
      setTimeout(() => location.reload(), 900);
    } catch { showToast('Dosya okunamadı — geçerli bir yedek mi?', 'error'); }
  };
  r.readAsText(f);
});
function resetData() {
  if (!confirm('TÜM verilerin silinecek (kelimeler, XP, sınavlar, journaller). Emin misin?')) return;
  if (!confirm('Son onay: geri alınamaz. Silinsin mi?')) return;
  LS.keys().forEach(LS.del); location.reload();
}

// ── KLAVYE ───────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.isContentEditable;
  if (e.key === 'Escape') { closeSettings(); TTS.stop(); Mic.stop(); return; }
  if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key >= '1' && e.key <= '8' && S.tab !== 'review') { switchTab(TAB_IDS[+e.key - 1]); return; }
  if (S.tab === 'review') {
    if (e.key === ' ') { e.preventDefault(); ACTIONS.flipCard(); }
    else if (S.rFlip && ['1', '2', '3'].includes(e.key)) ACTIONS.rateCard({ q: { '1': 1, '2': 3, '3': 5 }[e.key] });
    else if (e.key === 'ArrowRight') ACTIONS.nextCard();
    else if (e.key === 'ArrowLeft') ACTIONS.prevCard();
  }
});

// ── BAŞLATMA ─────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(); updateHeader(); checkBadges(); pruneDailyCache();
  renderTab('lessons');
  document.getElementById('rateRange')?.addEventListener('input', (e) => {
    S.cfg.rate = parseFloat(e.target.value);
    document.getElementById('rateVal').textContent = S.cfg.rate.toFixed(2);
  });
  if (!S.cfg.apiKey) setTimeout(openSettings, 700);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});
