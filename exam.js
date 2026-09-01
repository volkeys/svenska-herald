// ═══════════════════════════════════════════════════════════
// PROVDELEN — CEFR · SFI/SAS · TISUS · Socialstyrelsen
// Skriva · Tala · Läsa · Lyssna · Resultat
// ═══════════════════════════════════════════════════════════
'use strict';

const Exam = {
  sub: 'hub', busy: false, busyMsg: '',
  wTask: null, wText: '', wResult: null,
  sSteps: [], sIdx: 0, sPhase: 'idle', sResult: null, sPartIdx: 0,
  rDept: 'med', rLevel: 'B2', rSet: null, rAns: {}, rResult: null,
  lType: 'konsultation', lDept: 'med', lLevel: 'B2', lSet: null, lAns: {}, lResult: null, lPlays: 0,
  timer: { on: false, sec: 0, limit: 0, id: null },
};
window.Exam = Exam;

const eResults = () => LS.get('sh_exam_results', []);
function saveExamResult(r) {
  const list = eResults();
  list.push(Object.assign({ id: Date.now(), date: new Date().toISOString(), standard: S.cfg.standard }, r));
  LS.set('sh_exam_results', list.slice(-100));
  checkBadges();
}
const std = () => STANDARDS[S.cfg.standard] || STANDARDS.cefr;

// ── ZAMANLAYICI ──────────────────────────────────────────
function timerStart(limitSec, onEnd) {
  timerStop();
  Exam.timer = { on: true, sec: 0, limit: limitSec, id: null };
  Exam.timer.id = setInterval(() => {
    Exam.timer.sec++;
    const el = document.getElementById('examTimer');
    if (el) {
      const left = Exam.timer.limit ? Exam.timer.limit - Exam.timer.sec : Exam.timer.sec;
      el.textContent = fmtTime(Math.abs(left));
      el.classList.toggle('warn', !!Exam.timer.limit && left <= 300 && left > 60);
      el.classList.toggle('danger', !!Exam.timer.limit && left <= 60);
    }
    if (Exam.timer.limit && Exam.timer.sec >= Exam.timer.limit) { timerStop(); onEnd?.(); }
  }, 1000);
}
function timerStop() { if (Exam.timer.id) clearInterval(Exam.timer.id); Exam.timer.on = false; Exam.timer.id = null; }
function fmtTime(s) { return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }
Exam.onLeave = function () { timerStop(); Mic.stop(); TTS.stop(); };

// ── CEVAP NORMALLEŞTİRME ─────────────────────────────────
function normAns(s) {
  return String(s || '').toLowerCase().trim().replace(/[.,;:!?"'’]/g, '').replace(/\s+/g, ' ').replace(/^(en|ett|den|det|de)\s+/, '');
}
function answerOk(given, correct) {
  const g = normAns(given); if (!g) return false;
  return String(correct).split('/').map(normAns).some(c => c === g);
}

// ── PUAN → CEFR ──────────────────────────────────────────
function pctToCefr(pct, targetLevel) {
  const idx = CEFR_LEVELS.indexOf(targetLevel);
  const base = idx < 0 ? 2 : idx;
  let shift = pct >= 90 ? 1 : pct >= 70 ? 0 : pct >= 50 ? -1 : -2;
  return CEFR_LEVELS[Math.max(0, Math.min(CEFR_LEVELS.length - 1, base + shift))];
}
function pctVerdict(pct, level) {
  const st = S.cfg.standard;
  if (st === 'sfi') return pct >= 90 ? 'Betyg A' : pct >= 75 ? 'Betyg C' : pct >= 55 ? 'Betyg E' : 'Betyg F';
  if (st === 'tisus') return pct >= 75 ? 'Godkänd' : 'Underkänd';
  if (st === 'medsv') return pct >= 80 ? 'C1: Godkänd' : pct >= 60 ? 'Nära C1' : 'Ej godkänd ännu';
  return pctToCefr(pct, level);
}

// ═══════════════════════════════════════════════════════════
Exam.render = function () {
  if (this.busy) return this.shell(`<div class="ai-loading"><div class="ai-loading-dots"><span></span><span></span><span></span></div><span>${esc(this.busyMsg || 'AI förbereder...')}</span></div>`);
  switch (this.sub) {
    case 'writing': return this.shell(this.renderWriting());
    case 'speaking': return this.shell(this.renderSpeaking());
    case 'reading': return this.shell(this.renderReading());
    case 'listening': return this.shell(this.renderListening());
    case 'results': return this.shell(this.renderResults());
    default: return this.shell(this.renderHub());
  }
};

Exam.shell = function (inner) {
  const tabs = [['hub', '🏠 Översikt'], ['writing', '✍️ Skriva'], ['speaking', '🎙️ Tala'], ['reading', '📖 Läsa'], ['listening', '🎧 Lyssna'], ['results', '📈 Resultat']]
    .map(([k, l]) => `<button class="exam-tab ${this.sub === k ? 'active' : ''}" data-act="examSub" data-s="${k}">${l}</button>`).join('');
  const stdBar = STANDARD_ORDER.map(k => `<button class="std-chip ${S.cfg.standard === k ? 'active' : ''}" data-act="setStandard" data-k="${k}" title="${attr(STANDARDS[k].desc)}">${STANDARDS[k].icon} ${esc(STANDARDS[k].short)}</button>`).join('');
  const warn = !S.cfg.apiKey ? `<div class="key-warn">🔑 AI puanlaması ve içerik üretimi için API anahtarı gerekli — görevlere göz atabilir, cevap yazabilirsin.
    <button class="btn-ghost btn-xs" data-act="openSettings">Anahtar ekle</button></div>` : '';
  return `<div class="fade-in">
    <div class="section-head"><h2>🎓 Provdelen</h2><span class="badge" style="background:var(--blue)">${esc(S.cfg.level)}</span></div>
    <div class="std-bar">${stdBar}</div>
    <div class="std-desc">${esc(std().desc)}</div>
    <div class="exam-tabs">${tabs}</div>${warn}${inner}</div>`;
};

Exam.afterRender = function () {
  const ta = document.getElementById('wEditor');
  if (ta) { ta.addEventListener('input', () => { Exam.wText = ta.value; updateWordCount(); }); updateWordCount(); }
};

// ── ÖVERSIKT ─────────────────────────────────────────────
Exam.renderHub = function () {
  const rs = eResults();
  const avgOf = (kind) => {
    const f = rs.filter(r => r.kind === kind && typeof r.score === 'number');
    return f.length ? Math.round(f.reduce((s, r) => s + r.score, 0) / f.length) : null;
  };
  const cards = [
    { k: 'writing', icon: '✍️', title: 'Skriva', color: 'var(--red)', desc: 'Standarda uygun görev bankası + AI üretimi görevler. Süre sayacı, kelime sayacı; 4 kritere göre puan, hata listesi, seviye yükselten alternatifler, model metin.' },
    { k: 'speaking', icon: '🎙️', title: 'Tala', color: 'var(--orange)', desc: 'Sorular sesli okunur, mikrofonla İsveççe cevaplarsın, transkript çıkarılır ve 4 kritere göre değerlendirilir. Mikrofon yoksa yazarak da olur.' },
    { k: 'reading', icon: '📖', title: 'Läsa', color: 'var(--teal)', desc: 'Seçtiğin departman ve seviyede özgün metin: sant/falskt/framgår inte, çoktan seçmeli, boşluk doldurma ve kelime anlamı soruları.' },
    { k: 'listening', icon: '🎧', title: 'Lyssna', color: 'var(--purple)', desc: 'Diyalog, konsültasyon, SBAR raporu, akademik ders ya da haber — seslendirilip sorulur.' },
  ].map(c => {
    const a = avgOf(c.k);
    return `<button class="exam-card" data-act="examSub" data-s="${c.k}" style="border-left:4px solid ${c.color}">
      <div class="ec-top"><span class="ec-icon">${c.icon}</span><span class="ec-title">${c.title}</span><span class="ec-avg">${a === null ? '—' : 'ort. ' + a}</span></div>
      <div class="ec-desc">${esc(c.desc)}</div></button>`;
  }).join('');

  const withScore = rs.filter(r => typeof r.score === 'number');
  const overall = withScore.length ? Math.round(withScore.reduce((s, r) => s + r.score, 0) / withScore.length) : 0;
  const lastCefr = rs.length ? rs[rs.length - 1].cefr : null;

  return `<div class="exam-hub">
    <div class="hub-banner">
      <div><div class="hub-band">${withScore.length ? overall : '—'}</div><div class="hub-band-lbl">Ortalama puan (${rs.length} deneme)</div></div>
      <div class="hub-target"><div class="hub-target-num">${esc(lastCefr || S.cfg.level)}</div><div class="hub-band-lbl">${lastCefr ? 'Son tahmini seviye' : 'Hedef seviyen'}</div></div>
    </div>
    <div class="hub-msg">Seçili standart: <b>${esc(std().label)}</b>. Değerlendirme kriterleri ve sonuç etiketi buna göre değişir — ${esc(std().verdictLabel)}. Standardı yukarıdaki sekmeden değiştirebilirsin.</div>
    <div class="exam-card-grid">${cards}</div>
    <div class="panel"><div class="panel-title">Nasıl çalışır?</div>
      <div class="panel-hint">Her deneme <b>Resultat</b> sekmesinde saklanır ve kriter bazında en zayıf yönün hesaplanır. Değerlendirmeler AI tahminidir — gerçek sınav sonucu yerine geçmez, ama zayıf yönlerini görmek için güvenilir bir pusuladır. En isabetli puanlama için ⚙️ Ayarlar'dan <b>Sonnet</b> modelini seç.</div></div>
  </div>`;
};

// ═══════════════════════════════════════════════════════════
// SKRIVA
// ═══════════════════════════════════════════════════════════
function taskMin() { return Exam.wTask?.min || 250; }
function taskTime() { const m = taskMin(); return m >= 400 ? 90 * 60 : m >= 250 ? 60 * 60 : 40 * 60; }

function updateWordCount() {
  const n = (Exam.wText.trim().match(/\S+/g) || []).length, min = taskMin();
  const el = document.getElementById('wCount');
  if (el) { el.textContent = `${n} ord`; el.className = 'w-count ' + (n >= min ? 'ok' : n >= min * 0.7 ? 'near' : 'low'); }
  const hint = document.getElementById('wMinHint');
  if (hint) hint.textContent = n >= min ? '✓ Minimikravet uppfyllt' : `Minst ${min} ord (${min - n} kvar)`;
}

Exam.renderWriting = function () {
  if (this.wResult) return this.renderEvalResult(this.wResult, 'writing');

  if (!this.wTask) {
    const bank = WRITING_BANKS[S.cfg.standard] || W_CEFR;
    const list = bank.map((t, i) => `<button class="opt-card" data-act="wPick" data-i="${i}">
      <b>${esc(t.type)}${t.level ? ' · ' + esc(t.level) : ''}</b>
      <span>${esc(String(t.q).slice(0, 130))}${String(t.q).length > 130 ? '…' : ''}</span>
      <span class="case-level">min ${t.min} ord</span></button>`).join('');
    return `<div class="panel"><div class="panel-title">Välj en uppgift — ${esc(std().short)}</div>
        <div class="panel-hint">Kriterler: ${std().writeCriteria.join(' · ')}</div>
        <div class="opt-grid" style="margin-top:12px">${list}</div>
        <div class="btn-row"><button class="btn-ghost" data-act="wGenerate">✨ AI'dan yeni görev üret</button></div>
      </div>`;
  }

  const t = this.wTask;
  return `<div class="task-card">
      <div class="task-meta">${esc(t.type || '')}${t.topic ? ' · ' + esc(t.topic) : ''}${t.level ? ' · ' + esc(t.level) : ''}</div>
      <div class="task-q">${esc(t.q)}</div>
      ${t.fall ? `<div class="task-data"><b>Fall:</b> ${esc(t.fall)}</div>` : ''}
      <div class="task-actions">
        <button class="btn-ghost btn-xs" data-act="wReset">🎲 Annan uppgift</button>
        <button class="btn-ghost btn-xs" data-act="speak" data-text="${attr(t.q)}">🔊 Läs upp</button></div>
    </div>
    <div class="editor-bar">
      <div class="timer-box"><span id="examTimer" class="timer">${fmtTime(taskTime())}</span>
        <button class="btn-ghost btn-xs" data-act="wTimer">${this.timer.on ? '⏸ Pausa' : '▶ Starta tid'}</button></div>
      <div class="wc-box"><span id="wCount" class="w-count low">0 ord</span><span id="wMinHint" class="w-hint"></span></div>
    </div>
    <textarea id="wEditor" class="w-editor" placeholder="Skriv ditt svar på svenska här…" spellcheck="false">${esc(this.wText)}</textarea>
    <div class="btn-row">
      <button class="btn-primary" data-act="wSubmit">📊 Bedöm (AI-examinator)</button>
      <button class="btn-ghost" data-act="wSaveDraft">💾 Spara utkast</button>
      <button class="btn-ghost" data-act="wReset">✕ Avbryt</button>
    </div>
    <p class="flip-hint">İpucu: Önce 5 dakika plan yap. İsveççe akademik metinde <b>inledning – avhandling – avslutning</b> yapısı ve <b>sambandsord</b> (dessutom, däremot, följaktligen, å andra sidan) puanı doğrudan yükseltir.</p>`;
};

Object.assign(ACTIONS, {
  examSub: (d) => { timerStop(); Mic.stop(); TTS.stop(); Exam.sub = d.s; renderTab('exam'); },
  setStandard: (d) => { S.cfg.standard = d.k; saveCfg(); Exam.wTask = null; Exam.wResult = null; Exam.sSteps = []; Exam.sResult = null; renderTab('exam'); updateHeader(); },
  wPick: (d) => {
    const bank = WRITING_BANKS[S.cfg.standard] || W_CEFR;
    Exam.wTask = bank[+d.i];
    Exam.wText = LS.get('sh_draft_' + hash(Exam.wTask.q), '');
    Exam.wResult = null; renderTab('exam');
  },
  wGenerate: async () => {
    if (!S.cfg.apiKey) { openSettings(); return; }
    Exam.busy = true; Exam.busyMsg = 'AI yeni bir görev yazıyor...'; renderTab('exam');
    try {
      const map = {
        cefr: `en fri skrivuppgift enligt CEFR-nivå ${S.cfg.level}`,
        sfi: `en skrivuppgift i formatet nationella prov för SFI/SAS på nivå ${S.cfg.level}`,
        tisus: 'en argumenterande TISUS-uppsats (minst 400 ord)',
        medsv: `en yrkesmässig vårddokumentationsuppgift (journalanteckning, remiss, epikris, patientinformation, intyg eller avvikelserapport) för en ${S.cfg.profession} — inkludera ett fall i fältet "fall"`,
      };
      Exam.wTask = await callJSON(TASK_GEN_PROMPT, [{ role: 'user', content: `Skapa ${map[S.cfg.standard]}. Elevens intresseområden: veterinärmedicin, humanmedicin, svenskt samhälle. Yrke: ${S.cfg.profession}.` }], { maxTokens: 900 });
      Exam.wTask.min = Number(Exam.wTask.min) || 250;
      Exam.wText = ''; Exam.wResult = null;
    } catch (e) { showToast(e.message, 'error'); }
    Exam.busy = false; renderTab('exam');
  },
  wTimer: () => { if (Exam.timer.on) timerStop(); else timerStart(taskTime(), () => showToast('⏰ Tiden är ute!', 'error')); renderTab('exam'); },
  wSaveDraft: () => { if (Exam.wTask) { LS.set('sh_draft_' + hash(Exam.wTask.q), Exam.wText); showToast('Utkast sparat', 'success'); } },
  wReset: () => { timerStop(); Exam.wTask = null; Exam.wText = ''; Exam.wResult = null; renderTab('exam'); },
  wSubmit: async () => {
    const n = (Exam.wText.trim().match(/\S+/g) || []).length;
    if (n < 40) { showToast('Değerlendirme için en az 40 kelime yaz', 'error'); return; }
    if (n < taskMin() && !confirm(`${n} kelime yazdın, minimum ${taskMin()}. Sınavda bu puan kırar. Yine de değerlendirilsin mi?`)) return;
    if (!S.cfg.apiKey) { openSettings(); return; }
    timerStop();
    Exam.busy = true; Exam.busyMsg = 'Examinatorn läser och bedömer...'; renderTab('exam');
    try {
      const st = std();
      const res = await callJSON(WRITING_EVAL_PROMPT, [{
        role: 'user',
        content: `PROVFORMAT: ${st.label}\nBEDÖMNINGSSKALA:\n${SCALE_RULES[S.cfg.standard]}\n\nKRITERIER (använd exakt dessa namn): ${st.writeCriteria.join(' | ')}\nElevens angivna nivå: ${S.cfg.level}. Yrke: ${S.cfg.profession}.\n\nUPPGIFT (${Exam.wTask.type}, minst ${taskMin()} ord):\n${Exam.wTask.q}${Exam.wTask.fall ? '\n\nFALL:\n' + Exam.wTask.fall : ''}\n\nELEVENS TEXT (${n} ord):\n"""\n${Exam.wText}\n"""`
      }], { maxTokens: 3600 });
      res.kind = 'writing'; res.section = `${st.short} — ${Exam.wTask.type}`; res.task = Exam.wTask.q; res.answer = Exam.wText;
      res.score = Math.max(0, Math.min(100, Number(res.score) || 0));
      Exam.wResult = res; saveExamResult(res); addXP(35);
      showToast(`Bedömning klar — ${esc(res.verdict || res.cefr || '')} · +35 XP`, 'success');
    } catch (e) { showToast(e.message, 'error'); }
    Exam.busy = false; renderTab('exam');
  },
});
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h).toString(36); }

// ═══════════════════════════════════════════════════════════
// SONUÇ KARTI (Skriva & Tala)
// ═══════════════════════════════════════════════════════════
function scoreColor(v) { return v >= 80 ? 'var(--green)' : v >= 65 ? 'var(--teal)' : v >= 50 ? 'var(--gold)' : 'var(--red)'; }

Exam.renderEvalResult = function (r, kind) {
  const col = scoreColor(r.score || 0);
  const crit = (r.criteria || []).map(c => {
    const sc = Number(c.score) || 0;
    return `<div class="crit-band">
      <div class="cb-head"><span>${esc(c.key)}</span><b style="color:${scoreColor(sc)}">${c.level ? esc(c.level) : sc}</b></div>
      <div class="cb-track"><div class="cb-fill" style="width:${Math.max(0, Math.min(100, sc))}%;background:${scoreColor(sc)}"></div></div>
      <div class="cb-comment">${esc(c.comment)}</div></div>`;
  }).join('');

  const errs = (r.errors || []).map(e => `<div class="err-row">
    <div class="err-old">${esc(e.original)}</div>
    <div class="err-new">${esc(e.corrected)}<button class="bt" data-act="speak" data-text="${attr(e.corrected)}">🔊</button></div>
    <div class="err-why">${pill('var(--dim)', e.type || 'språk', true)} ${esc(e.why || '')}</div></div>`).join('');

  const ups = (r.upgrades || []).map((u, i) => `<div class="up-row">
    <div><span class="up-basic">${esc(u.basic)}</span> <span class="up-arrow">→</span> <span class="up-better">${esc(u.better)}</span></div>
    ${u.note ? `<div class="up-note">${esc(u.note)}</div>` : ''}
    <button class="up-save" data-act="examSaveUpgrade" data-i="${i}" data-kind="${kind}">★ Ordbanken</button></div>`).join('');

  const list = (arr, cls) => (arr || []).map(x => `<li class="${cls}">${esc(x)}</li>`).join('');

  return `<div class="result-wrap">
    <div class="band-hero" style="border-color:${col}">
      <div class="band-big" style="color:${col}">${esc(r.verdict || r.cefr || r.score)}</div>
      <div><div class="band-lbl">${esc(std().verdictLabel)}</div>
        <div class="band-sub">${esc(r.section || '')} · ${r.wordCount || ''} ord · poäng ${r.score}/100 · tahmini CEFR ${esc(r.cefr || '—')}</div></div>
    </div>
    <div class="crit-grid">${crit}</div>
    ${r.nextStep ? `<div class="next-step">🎯 <b>Sıradaki odağın:</b> ${esc(r.nextStep)}</div>` : ''}
    <div class="two-col">
      <div class="panel"><div class="panel-title">✅ Starka sidor</div><ul class="tight-list">${list(r.strengths, 'good')}</ul></div>
      <div class="panel"><div class="panel-title">⚠️ Att förbättra</div><ul class="tight-list">${list(r.improvements, 'bad')}</ul></div>
    </div>
    ${(r.fillerWords || []).length ? `<div class="panel"><div class="panel-title">🗣️ Utfyllnadsord</div>
      <div class="panel-hint">${r.fillerWords.map(f => `<code class="md-code">${esc(f)}</code>`).join(' ')} — bunları azaltmak akıcılık puanını doğrudan yükseltir.</div></div>` : ''}
    ${errs ? `<div class="panel"><div class="panel-title">✏️ Fel och rättelser</div><div class="err-list">${errs}</div></div>` : ''}
    ${ups ? `<div class="panel"><div class="panel-title">⬆️ Nivåhöjande alternativ</div><div class="up-list">${ups}</div></div>` : ''}
    ${r.modelText ? `<div class="panel"><div class="panel-title">💎 Modelltext</div>
      <div class="model-text">${esc(r.modelText)}</div>
      <button class="btn-ghost btn-xs" data-act="speak" data-text="${attr(r.modelText)}">🔊 Lyssna</button></div>` : ''}
    <div class="btn-row">
      <button class="btn-primary" data-act="examAgain" data-kind="${kind}">🔄 Nytt försök</button>
      <button class="btn-ghost" data-act="examSub" data-s="results">📈 Mina resultat</button>
      <button class="btn-ghost" data-act="examAskTeacher" data-kind="${kind}">💬 Fråga AI-läraren</button>
    </div></div>`;
};

Object.assign(ACTIONS, {
  examAgain: (d) => {
    if (d.kind === 'writing') { Exam.wResult = null; Exam.wTask = null; Exam.wText = ''; }
    else { Exam.sResult = null; Exam.sSteps = []; Exam.sIdx = 0; Exam.sPhase = 'idle'; }
    renderTab('exam');
  },
  examSaveUpgrade: (d) => {
    const r = d.kind === 'writing' ? Exam.wResult : Exam.sResult;
    const u = r?.upgrades?.[+d.i]; if (!u) return;
    saveWordObj({ sv: u.better, tr: u.note || u.basic, form: '', ex: u.better, tip: `Enklare variant: ${u.basic}` }, 'grammatik');
  },
  examAskTeacher: (d) => {
    const r = d.kind === 'writing' ? Exam.wResult : Exam.sResult; if (!r) return;
    const weak = (r.criteria || []).slice().sort((a, b) => (a.score || 0) - (b.score || 0))[0];
    switchTab('chat');
    setTimeout(() => Chat.send(`${std().short} denemem ${r.verdict || r.score} sonucu aldı. En zayıf kriterim "${weak?.key || ''}". Bunu bir üst seviyeye çıkarmak için 3 somut teknik ve İsveççe örnek cümleler ver.`), 150);
  },
});

// ═══════════════════════════════════════════════════════════
// TALA
// ═══════════════════════════════════════════════════════════
Exam.renderSpeaking = function () {
  if (this.sResult) return this.renderEvalResult(this.sResult, 'speaking');
  const bank = SPK_BANKS[S.cfg.standard] || SPK_BANKS.cefr;

  if (!Mic.supported && !this.sSteps.length) {
    return `<div class="panel"><div class="panel-title">🎙️ Mikrofon desteklenmiyor</div>
      <div class="panel-hint">Bu tarayıcı konuşma tanımayı desteklemiyor. Chrome veya Edge dene — ya da cevaplarını yazarak da değerlendirebilirsin.</div>
      <button class="btn-primary" style="margin-top:12px;max-width:280px" data-act="sStart" data-p="all">⌨️ Yazarak dene</button></div>`;
  }

  if (!this.sSteps.length) {
    const parts = bank.map((p, i) => `<button class="opt-card" data-act="sStart" data-p="${i}">
      <b>${esc(p.part)}</b><span>${p.qs.length} fråga${p.qs.length === 1 ? '' : 'r'}</span></button>`).join('');
    return `<div class="panel"><div class="panel-title">${esc(std().short)} — muntlig del</div>
        <div class="panel-hint">Kriterler: ${std().speakCriteria.join(' · ')}<br>Soru sesli okunur → 🎙️ ile İsveççe cevaplarsın → tarayıcı yazıya çevirir → sonunda hepsi birlikte puanlanır. Transkript otomatik olduğu için <b>telaffuz puanı tahminidir</b>.</div>
        <div class="opt-grid" style="margin-top:12px">${parts}</div>
        <div class="btn-row"><button class="btn-primary" data-act="sStart" data-p="all">▶ Hela provet</button></div></div>`;
  }

  const step = this.sSteps[this.sIdx];
  const progress = `${this.sIdx + 1}/${this.sSteps.length}`;
  return `<div class="spk-wrap">
    <div class="spk-head"><span class="spk-part">${esc(step.part)} · ${progress}</span>${this.sPhase === 'rec' ? `<span id="examTimer" class="timer">00:00</span>` : ''}</div>
    <div class="spk-q"><span>${esc(step.q)}</span>
      <button class="btn-ghost btn-xs" data-act="speak" data-text="${attr(step.q)}">🔊</button></div>
    ${this.sPhase === 'idle' ? `<div class="btn-row">
        ${Mic.supported ? '<button class="btn-primary" data-act="sRecord">🎙️ Svara</button>' : ''}
        <button class="btn-ghost" data-act="sTyped">⌨️ Skriv svaret</button></div>` : ''}
    ${this.sPhase === 'rec' ? `<div class="rec-box">
      <div class="rec-live"><span class="rec-dot"></span> Spelar in — tala svenska</div>
      <div class="rec-transcript" id="sTranscript">${esc(step.answer || '')}<span class="rec-interim" id="sInterim"></span></div>
      <div class="btn-row"><button class="btn-primary" data-act="sStopRec">⏹ Klar</button></div></div>` : ''}
    ${this.sPhase === 'typing' ? `<textarea id="sTypeBox" class="w-editor" placeholder="Skriv ditt svar på svenska…">${esc(step.answer || '')}</textarea>
      <div class="btn-row"><button class="btn-primary" data-act="sTypedSave">Spara →</button></div>` : ''}
    ${this.sPhase === 'done' ? this.doneBox(step) : ''}
  </div>`;
};

Exam.doneBox = function (step) {
  const last = this.sIdx >= this.sSteps.length - 1;
  return `<div class="rec-box done">
    <div class="rec-transcript">${esc(step.answer || '(inget svar)')}</div>
    <div class="rec-meta">${(String(step.answer || '').match(/\S+/g) || []).length} ord</div>
    <div class="btn-row">
      ${Mic.supported ? '<button class="btn-ghost" data-act="sRecord">🔄 Svara igen</button>' : '<button class="btn-ghost" data-act="sTyped">✏️ Ändra</button>'}
      ${last ? `<button class="btn-primary" data-act="sFinish">📊 Avsluta & bedöm</button>` : `<button class="btn-primary" data-act="sNext">Nästa fråga →</button>`}
    </div></div>`;
};

function buildSpeakingSteps(pIdx) {
  const bank = SPK_BANKS[S.cfg.standard] || SPK_BANKS.cefr;
  const steps = [];
  const parts = pIdx === 'all' ? bank : [bank[+pIdx]].filter(Boolean);
  parts.forEach(p => {
    const qs = pIdx === 'all' ? p.qs.slice(0, 2) : p.qs;
    qs.forEach(q => steps.push({ part: p.part, q, answer: '' }));
  });
  return steps;
}

Object.assign(ACTIONS, {
  sStart: (d) => {
    Exam.sSteps = buildSpeakingSteps(d.p);
    Exam.sIdx = 0; Exam.sPhase = 'idle'; Exam.sResult = null;
    renderTab('exam');
    setTimeout(() => TTS.speak(Exam.sSteps[0]?.q), 300);
  },
  sRecord: () => {
    timerStop(); TTS.stop();
    const step = Exam.sSteps[Exam.sIdx];
    step.answer = ''; Exam.sPhase = 'rec'; renderTab('exam');
    LS.set('sh_voice_used', true);
    timerStart(120, () => ACTIONS.sStopRec());
    const ok = Mic.start({
      lang: 'sv-SE',
      onResult: (fin, interim) => {
        step.answer = fin;
        const t = document.getElementById('sTranscript'), iv = document.getElementById('sInterim');
        if (t && t.childNodes[0]) t.childNodes[0].nodeValue = fin + ' ';
        if (iv) iv.textContent = ' ' + interim;
      },
      onError: () => { Exam.sPhase = 'idle'; renderTab('exam'); },
    });
    if (!ok) { Exam.sPhase = 'idle'; renderTab('exam'); }
  },
  sStopRec: () => {
    timerStop(); Mic.stop();
    const step = Exam.sSteps[Exam.sIdx];
    step.answer = (Mic.finalText || step.answer || '').trim();
    Exam.sPhase = 'done'; renderTab('exam');
  },
  sTyped: () => { Exam.sPhase = 'typing'; renderTab('exam'); },
  sTypedSave: () => { Exam.sSteps[Exam.sIdx].answer = (document.getElementById('sTypeBox')?.value || '').trim(); Exam.sPhase = 'done'; renderTab('exam'); },
  sNext: () => { Exam.sIdx++; Exam.sPhase = 'idle'; renderTab('exam'); setTimeout(() => TTS.speak(Exam.sSteps[Exam.sIdx]?.q), 250); },
  sFinish: async () => {
    timerStop(); Mic.stop();
    if (!Exam.sSteps.some(s => (s.answer || '').trim().length > 3)) { showToast('En az bir cevap gerekli', 'error'); return; }
    if (!S.cfg.apiKey) { openSettings(); return; }
    Exam.busy = true; Exam.busyMsg = 'Examinatorn bedömer ditt tal...'; renderTab('exam');
    try {
      const st = std();
      const body = Exam.sSteps.map(s => `[${s.part}]\nF: ${s.q}\nS: ${s.answer || '(inget svar)'}`).join('\n\n');
      const res = await callJSON(SPEAKING_EVAL_PROMPT, [{
        role: 'user',
        content: `PROVFORMAT: ${st.label}\nBEDÖMNINGSSKALA:\n${SCALE_RULES[S.cfg.standard]}\n\nKRITERIER (använd exakt dessa namn): ${st.speakCriteria.join(' | ')}\nElevens angivna nivå: ${S.cfg.level}. Yrke: ${S.cfg.profession}.\n\nMUNTLIGT PROV (automatisk transkription):\n${body}`
      }], { maxTokens: 3400 });
      res.kind = 'speaking'; res.section = `${st.short} — muntlig del`; res.task = Exam.sSteps[0]?.q || ''; res.answer = body;
      res.score = Math.max(0, Math.min(100, Number(res.score) || 0));
      Exam.sResult = res; saveExamResult(res); addXP(35);
      showToast(`Muntligt resultat: ${esc(res.verdict || res.cefr || '')} · +35 XP`, 'success');
    } catch (e) { showToast(e.message, 'error'); }
    Exam.busy = false; renderTab('exam');
  },
});

// ═══════════════════════════════════════════════════════════
// LÄSA
// ═══════════════════════════════════════════════════════════
function deptPicker(sel, act) {
  return DEPARTMENTS.map(d => `<button class="chat-topic-chip ${sel === d.id ? 'active' : ''}" data-act="${act}" data-d="${d.id}" title="${attr(d.hint)}">${esc(d.label)}</button>`).join('');
}
function levelPicker(sel, act) {
  return CEFR_LEVELS.map(l => `<button class="filter-chip ${sel === l ? 'active' : ''}" data-act="${act}" data-l="${l}">${l}</button>`).join('');
}

Exam.renderReading = function () {
  if (this.rResult) return this.renderQuizResult(this.rResult, 'reading');
  if (!this.rSet) {
    return `<div class="panel"><div class="panel-title">📖 Läsförståelse</div>
      <div class="panel-hint">AI seçtiğin departman ve seviyede özgün bir metin ve 10 soru üretir: 3× sant/falskt/framgår inte, 3× flerval, 2× lucktext, 2× ordbetydelse. C1–C2'de sorular çıkarım gerektirir.</div>
      <div class="fld-label">Ämnesområde</div><div class="filter-row">${deptPicker(this.rDept, 'rDept')}</div>
      <div class="fld-label">Svårighetsgrad</div><div class="filter-row">${levelPicker(this.rLevel, 'rLevel')}</div>
      <div class="btn-row"><button class="btn-primary" data-act="rGenerate">✨ Skapa text & frågor</button></div></div>`;
  }
  const p = this.rSet;
  const paras = (p.paragraphs || []).map(x => `<div class="rp-para"><span class="rp-label">${esc(x.label)}</span><span>${esc(x.text)}</span></div>`).join('');
  const qs = (p.questions || []).map((q, i) => `<div class="rq-item">
    <div class="rq-q"><b>${q.n || i + 1}.</b> ${esc(q.q)} ${q.type === 'gap' ? '<i class="rq-hint">(HÖGST TVÅ ORD)</i>' : ''}</div>
    ${q.type === 'gap'
      ? `<input class="rq-input" data-inp="rSet" data-i="${i}" value="${attr(this.rAns[i] || '')}" autocomplete="off">`
      : `<div class="rq-opts">${(q.o || []).map(o => `<button class="rq-opt ${this.rAns[i] === o ? 'sel' : ''}" data-act="rPick" data-i="${i}" data-v="${attr(o)}">${esc(o)}</button>`).join('')}</div>`}
  </div>`).join('');

  return `<div class="reading-wrap">
    <div class="editor-bar"><div class="timer-box"><span id="examTimer" class="timer">20:00</span>
      <button class="btn-ghost btn-xs" data-act="rTimer">${this.timer.on ? '⏸' : '▶ Tid'}</button></div>
      <button class="btn-ghost btn-xs" data-act="rReset">✕ Avbryt</button></div>
    <div class="passage"><h3 class="passage-title">${esc(p.title)}</h3>${paras}
      <button class="btn-ghost btn-xs" data-act="speak" data-text="${attr((p.paragraphs || []).map(x => x.text).join(' ').slice(0, 900))}">🔊 Läs upp</button></div>
    <div class="questions">${qs}</div>
    <div class="btn-row"><button class="btn-primary" data-act="rSubmit">✓ Rätta</button></div></div>`;
};

Object.assign(ACTIONS, {
  rDept: (d) => { Exam.rDept = d.d; renderTab('exam'); },
  rLevel: (d) => { Exam.rLevel = d.l; renderTab('exam'); },
  rTimer: () => { if (Exam.timer.on) timerStop(); else timerStart(20 * 60, () => showToast('⏰ Tiden är ute!', 'error')); renderTab('exam'); },
  rReset: () => { timerStop(); Exam.rSet = null; Exam.rAns = {}; Exam.rResult = null; renderTab('exam'); },
  rPick: (d) => { Exam.rAns[+d.i] = d.v; renderTab('exam'); },
  rSet: (d, el) => { Exam.rAns[+d.i] = el.value; },
  rGenerate: async () => {
    if (!S.cfg.apiKey) { openSettings(); return; }
    Exam.busy = true; Exam.busyMsg = 'AI metni ve soruları yazıyor...'; renderTab('exam');
    try {
      const dep = DEPARTMENTS.find(x => x.id === Exam.rDept);
      Exam.rSet = await callJSON(READING_GEN_PROMPT, [{ role: 'user',
        content: `Provformat: ${std().label}. Nivå: ${Exam.rLevel}. Ämnesområde: ${dep.label} (${dep.hint}). Elevens yrke: ${S.cfg.profession}.` }], { maxTokens: 4200 });
      Exam.rAns = {}; Exam.rResult = null;
      renderTab('exam');
      timerStart(20 * 60, () => showToast('⏰ Tiden är ute!', 'error'));
    } catch (e) { showToast(e.message, 'error'); }
    Exam.busy = false; renderTab('exam');
  },
  rSubmit: () => {
    timerStop();
    const res = scoreQuiz(Exam.rSet, Exam.rAns, 'reading', Exam.rLevel);
    Exam.rResult = res; saveExamResult(res); addXP(25);
    showToast(`${res.correct}/${res.total} rätt · ${res.verdict} · +25 XP`, 'success');
    renderTab('exam');
  },
});

// ═══════════════════════════════════════════════════════════
// LYSSNA
// ═══════════════════════════════════════════════════════════
Exam.renderListening = function () {
  if (this.lResult) return this.renderQuizResult(this.lResult, 'listening');
  if (!this.lSet) {
    const types = LISTEN_TYPES.map(t => `<button class="opt-card ${this.lType === t.id ? 'active' : ''}" data-act="lType" data-t="${t.id}"><b>${esc(t.label)}</b></button>`).join('');
    const svWarn = TTS.hasSwedish() ? '' : `<div class="key-warn">⚠️ Bu cihazda İsveççe konuşma sesi bulunamadı — metin yanlış telaffuzla okunabilir. ⚙️ Ayarlar → Ses bölümünde nasıl ekleneceği yazıyor.</div>`;
    return `<div class="panel"><div class="panel-title">🎧 Hörförståelse</div>
      <div class="panel-hint">AI bir konuşma metni ve 8 soru üretir; metin tarayıcının sesiyle okunur. Gerçek sınavda kayıt <b>bir kez</b> çalınır — önce bir kez dinlemeyi dene.</div>
      ${svWarn}
      <div class="opt-grid" style="margin-top:12px">${types}</div>
      <div class="fld-label">Ämnesområde</div><div class="filter-row">${deptPicker(this.lDept, 'lDept')}</div>
      <div class="fld-label">Svårighetsgrad</div><div class="filter-row">${levelPicker(this.lLevel, 'lLevel')}</div>
      <div class="btn-row"><button class="btn-primary" data-act="lGenerate">✨ Skapa & börja</button></div></div>`;
  }
  const p = this.lSet;
  const qs = (p.questions || []).map((q, i) => `<div class="rq-item">
    <div class="rq-q"><b>${q.n || i + 1}.</b> ${esc(q.q)} ${q.type === 'gap' ? '<i class="rq-hint">(HÖGST TVÅ ORD / SIFFRA)</i>' : ''}</div>
    ${q.type === 'gap'
      ? `<input class="rq-input" data-inp="lSet" data-i="${i}" value="${attr(this.lAns[i] || '')}" autocomplete="off">`
      : `<div class="rq-opts">${(q.o || []).map(o => `<button class="rq-opt ${this.lAns[i] === o ? 'sel' : ''}" data-act="lPick" data-i="${i}" data-v="${attr(o)}">${esc(o)}</button>`).join('')}</div>`}
  </div>`).join('');

  return `<div class="listening-wrap">
    <div class="audio-card"><div class="audio-title">🎧 ${esc(p.title)}</div>
      <div class="audio-ctx">${esc(p.context || '')}</div>
      <div class="audio-controls">
        <button class="btn-primary" data-act="lPlay">▶ ${this.lPlays === 0 ? 'Spela upp' : 'Spela igen'}</button>
        <button class="btn-ghost" data-act="lStop">⏹ Stoppa</button>
        <span class="audio-plays">${this.lPlays} uppspelning${this.lPlays === 1 ? '' : 'ar'}</span></div>
      <div class="panel-hint">Uppläsningshastighet ändras i ⚙️ Inställningar → Ljud.</div></div>
    <div class="questions">${qs}</div>
    <div class="btn-row"><button class="btn-primary" data-act="lSubmit">✓ Rätta</button>
      <button class="btn-ghost" data-act="lReset">✕ Avbryt</button></div></div>`;
};

Object.assign(ACTIONS, {
  lType: (d) => { Exam.lType = d.t; renderTab('exam'); },
  lDept: (d) => { Exam.lDept = d.d; renderTab('exam'); },
  lLevel: (d) => { Exam.lLevel = d.l; renderTab('exam'); },
  lPick: (d) => { Exam.lAns[+d.i] = d.v; renderTab('exam'); },
  lSet: (d, el) => { Exam.lAns[+d.i] = el.value; },
  lReset: () => { TTS.stop(); Exam.lSet = null; Exam.lAns = {}; Exam.lResult = null; Exam.lPlays = 0; renderTab('exam'); },
  lPlay: () => {
    if (!Exam.lSet) return;
    Exam.lPlays++;
    TTS.speak(String(Exam.lSet.script || '').replace(/^([AB]|Talare \d):/gm, ''));
    renderTab('exam');
  },
  lStop: () => TTS.stop(),
  lGenerate: async () => {
    if (!S.cfg.apiKey) { openSettings(); return; }
    Exam.busy = true; Exam.busyMsg = 'AI dinleme metnini hazırlıyor...'; renderTab('exam');
    try {
      const t = LISTEN_TYPES.find(x => x.id === Exam.lType), dep = DEPARTMENTS.find(x => x.id === Exam.lDept);
      Exam.lSet = await callJSON(LISTENING_GEN_PROMPT, [{ role: 'user',
        content: `Genre: ${t.label}. Ämnesområde: ${dep.label} (${dep.hint}). Nivå: ${Exam.lLevel}. Provformat: ${std().label}. Elevens yrke: ${S.cfg.profession}.` }], { maxTokens: 3600 });
      Exam.lAns = {}; Exam.lResult = null; Exam.lPlays = 0;
    } catch (e) { showToast(e.message, 'error'); }
    Exam.busy = false; renderTab('exam');
  },
  lSubmit: () => {
    TTS.stop();
    const res = scoreQuiz(Exam.lSet, Exam.lAns, 'listening', Exam.lLevel);
    Exam.lResult = res; saveExamResult(res); addXP(25);
    showToast(`${res.correct}/${res.total} rätt · ${res.verdict} · +25 XP`, 'success');
    renderTab('exam');
  },
});

// ── PUANLAMA (Läsa & Lyssna) ─────────────────────────────
function scoreQuiz(set, ansMap, kind, level) {
  const qs = set.questions || [];
  const detail = qs.map((q, i) => {
    const given = ansMap[i] || '';
    const ok = q.type === 'gap' ? answerOk(given, q.a) : normAns(given) === normAns(q.a);
    return { n: q.n || i + 1, q: q.q, given, correct: q.a, ok, why: q.why, type: q.type };
  });
  const correct = detail.filter(d => d.ok).length;
  const pct = Math.round((correct / Math.max(1, qs.length)) * 100);
  return {
    kind, section: `${std().short} — ${kind === 'reading' ? 'läsförståelse' : 'hörförståelse'} (${level})`,
    title: set.title, correct, total: qs.length, score: pct,
    cefr: pctToCefr(pct, level), verdict: pctVerdict(pct, level),
    detail, glossary: set.glossary || [], script: set.script || '',
  };
}

Exam.renderQuizResult = function (r, kind) {
  const col = scoreColor(r.score);
  const rows = r.detail.map(d => `<div class="ans-row ${d.ok ? 'ok' : 'no'}">
    <div class="ans-n">${d.n}</div>
    <div class="ans-body"><div class="ans-q">${esc(d.q)}</div>
      <div class="ans-line">Ditt svar: <b>${esc(d.given || '—')}</b>${d.ok ? '' : ` · Rätt: <b class="ans-correct">${esc(d.correct)}</b>`}</div>
      ${d.why ? `<div class="ans-why">${esc(d.why)}</div>` : ''}</div></div>`).join('');

  REG.exam = r.glossary || [];
  const gloss = (r.glossary || []).length ? `<div class="panel"><div class="panel-title">📚 Svåra ord ur texten</div>
    <div class="vocab-grid">${r.glossary.map((w, i) => vocabCardHTML(w, i, 'exam', 'nyheter')).join('')}</div></div>` : '';

  const byType = {};
  r.detail.forEach(d => { byType[d.type] = byType[d.type] || { ok: 0, n: 0 }; byType[d.type].n++; if (d.ok) byType[d.type].ok++; });
  const typeLbl = { tfng: 'Sant / Falskt / Framgår inte', mcq: 'Flervalsfrågor', gap: 'Lucktext', vocab: 'Ordbetydelse', abbr: 'Förkortningar' };
  const typeRows = Object.entries(byType).map(([t, v]) => `<div class="crit-row"><b>${typeLbl[t] || t}</b><span>${v.ok}/${v.n}</span></div>`).join('');

  return `<div class="result-wrap">
    <div class="band-hero" style="border-color:${col}">
      <div class="band-big" style="color:${col}">${esc(r.verdict)}</div>
      <div><div class="band-lbl">${esc(std().verdictLabel)}</div>
        <div class="band-sub">${esc(r.section)} · ${r.correct}/${r.total} rätt (${r.score} %) · tahmini CEFR ${esc(r.cefr)}</div></div></div>
    <div class="panel"><div class="panel-title">Frågetyp</div><div class="crit-list">${typeRows}</div></div>
    <div class="panel"><div class="panel-title">Svar & förklaringar</div><div class="ans-list">${rows}</div></div>
    ${gloss}
    ${kind === 'listening' && r.script ? `<details class="panel script-details"><summary>📄 Visa manus</summary><div class="model-text">${esc(r.script)}</div></details>` : ''}
    <div class="btn-row"><button class="btn-primary" data-act="${kind === 'reading' ? 'rReset' : 'lReset'}">🔄 Nytt försök</button>
      <button class="btn-ghost" data-act="examSub" data-s="results">📈 Mina resultat</button></div></div>`;
};

// ═══════════════════════════════════════════════════════════
// RESULTAT
// ═══════════════════════════════════════════════════════════
Exam.renderResults = function () {
  const rs = eResults().slice().reverse();
  if (!rs.length) {
    return `<div class="empty-state"><div class="empty-state-icon">📈</div>
      <div class="empty-state-text">Inga försök ännu.<br>Välj en del och gör ditt första prov.</div>
      <button class="btn-primary" style="margin-top:16px;max-width:220px" data-act="examSub" data-s="hub">Till delarna →</button></div>`;
  }
  const kinds = ['writing', 'speaking', 'reading', 'listening'];
  const kindLbl = { writing: ['✍️', 'Skriva'], speaking: ['🎙️', 'Tala'], reading: ['📖', 'Läsa'], listening: ['🎧', 'Lyssna'] };
  const avgCards = kinds.map(k => {
    const f = rs.filter(r => r.kind === k && typeof r.score === 'number');
    const a = f.length ? Math.round(f.reduce((s, r) => s + r.score, 0) / f.length) : null;
    return `<div class="stat-card"><div class="stat-card-icon">${kindLbl[k][0]}</div>
      <div class="stat-card-num" style="color:${a === null ? 'var(--dim)' : scoreColor(a)}">${a === null ? '—' : a}</div>
      <div class="stat-card-lbl">${kindLbl[k][1]} (${f.length})</div></div>`;
  }).join('');

  const withScore = rs.filter(r => typeof r.score === 'number');
  const overall = withScore.length ? Math.round(withScore.reduce((s, r) => s + r.score, 0) / withScore.length) : 0;

  const critAgg = {};
  rs.forEach(r => (r.criteria || []).forEach(c => {
    const k = String(c.key).replace(/\s*\((uppskattat|tahmini)\)/i, '');
    const v = Number(c.score); if (!isFinite(v)) return;
    critAgg[k] = critAgg[k] || { s: 0, n: 0 };
    critAgg[k].s += v; critAgg[k].n++;
  }));
  const critRows = Object.entries(critAgg).sort((a, b) => a[1].s / a[1].n - b[1].s / b[1].n).map(([k, v]) => {
    const a = Math.round(v.s / v.n);
    return `<div class="crit-band"><div class="cb-head"><span>${esc(k)}</span><b style="color:${scoreColor(a)}">${a}</b></div>
      <div class="cb-track"><div class="cb-fill" style="width:${a}%;background:${scoreColor(a)}"></div></div></div>`;
  }).join('');

  const last = withScore.slice(0, 12).reverse();
  const trend = `<div class="trend-chart">${last.map(r => `<div class="trend-col" title="${esc(r.section)} · ${r.score} · ${new Date(r.date).toLocaleDateString('sv-SE')}">
    <div class="trend-bar" style="height:${Math.max(6, r.score)}%;background:${scoreColor(r.score)}"></div>
    <span class="trend-lbl">${r.score}</span></div>`).join('')}</div>`;

  const list = rs.slice(0, 30).map(r => `<div class="res-row" data-act="examOpen" data-id="${r.id}">
    <span class="res-band" style="background:${scoreColor(r.score || 0)}">${esc(r.cefr || r.score || '?')}</span>
    <div class="res-mid"><div class="res-sec">${esc(r.section || r.kind)}</div>
      <div class="res-task">${esc(String(r.verdict || '') + ' · ' + String(r.task || r.title || '').slice(0, 70))}</div></div>
    <span class="res-date">${new Date(r.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}</span></div>`).join('');

  return `<div class="results-wrap">
    <div class="band-hero" style="border-color:${scoreColor(overall)}">
      <div class="band-big" style="color:${scoreColor(overall)}">${overall}</div>
      <div><div class="band-lbl">Genomsnitt (100)</div><div class="band-sub">${rs.length} försök · nuvarande standard ${esc(std().short)}</div></div></div>
    <div class="stat-cards">${avgCards}</div>
    <div class="panel"><div class="panel-title">📈 Senaste försöken</div>${trend}</div>
    ${critRows ? `<div class="panel"><div class="panel-title">Kriterier — svagast först</div><div class="crit-grid">${critRows}</div></div>` : ''}
    <div class="panel"><div class="panel-title">Historik</div><div class="res-list">${list}</div>
      <button class="btn-danger btn-xs" style="margin-top:12px" data-act="examClearResults">Rensa historik</button></div>
  </div>`;
};

Object.assign(ACTIONS, {
  examOpen: (d) => {
    const r = eResults().find(x => String(x.id) === String(d.id)); if (!r) return;
    if (r.kind === 'writing') { Exam.sub = 'writing'; Exam.wResult = r; }
    else if (r.kind === 'speaking') { Exam.sub = 'speaking'; Exam.sResult = r; }
    else if (r.kind === 'reading') { Exam.sub = 'reading'; Exam.rResult = r; Exam.rSet = { questions: [] }; }
    else { Exam.sub = 'listening'; Exam.lResult = r; Exam.lSet = { questions: [] }; }
    renderTab('exam');
  },
  examClearResults: () => { if (!confirm('Tüm sınav sonuçların silinsin mi?')) return; LS.set('sh_exam_results', []); renderTab('exam'); },
});
