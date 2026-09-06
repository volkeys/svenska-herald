// ═══════════════════════════════════════════════════════════
// ORDLISTAN — tüm sözlük, paket üreticisi ve CSV içe aktarma
// Ordbanken sekmesinin "Hela ordlistan" ve "Skapa" modları
// ═══════════════════════════════════════════════════════════
'use strict';

// ── SÖZLÜK: dersler + kürasyonlu liste + kendi kelimelerin ──
let _dict = null;
function userWords() { return LS.get('sh_userwords', []); }
function saveUserWords(list) { LS.set('sh_userwords', list); dictInvalidate(); }
function dictInvalidate() { _dict = null; }

function dict() {
  if (_dict) return _dict;
  const out = [], seen = new Set();
  const push = (w, cat, src) => {
    if (!w || !w.sv || seen.has(w.sv)) return;
    seen.add(w.sv);
    out.push(Object.assign({}, w, { cat: cat || w.cat || 'vardag', src }));
  };
  TOPIC_ORDER.forEach(k => (CONTENT[k]?.units || []).forEach(u => u.vocab.forEach(w => push(w, k, 'lektion'))));
  (typeof VOCAB !== 'undefined' ? VOCAB : []).forEach(w => push(w, w.cat, 'ordlista'));
  userWords().forEach(w => push(w, w.cat, 'egen'));
  return (_dict = out);
}
window.dict = dict;

const LVL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const Ordlista = {
  search: '', cat: 'all', lvl: 'all', src: 'all', page: 0,
  // paket üreticisi
  gTheme: 'vet', gFree: '', gLevel: '', gCount: 25, gBusy: false, gResult: null, gPick: {},
};
window.Ordlista = Ordlista;
const PAGE_SIZE = 60;

// ── FİLTRELEME ───────────────────────────────────────────
Ordlista.filtered = function () {
  const s = this.search.toLowerCase().trim();
  return dict().filter(w => {
    if (this.cat !== 'all' && w.cat !== this.cat) return false;
    if (this.lvl !== 'all' && (w.lvl || '') !== this.lvl) return false;
    if (this.src !== 'all' && w.src !== this.src) return false;
    if (!s) return true;
    return w.sv.toLowerCase().includes(s) || (w.tr || '').toLowerCase().includes(s) || (w.ex || '').toLowerCase().includes(s);
  });
};

// ── SÖZLÜĞE GÖZ AT ───────────────────────────────────────
Ordlista.renderBrowse = function () {
  const all = dict();
  const list = this.filtered();
  const shown = list.slice(0, (this.page + 1) * PAGE_SIZE);

  const byCat = {}; all.forEach(w => { byCat[w.cat] = (byCat[w.cat] || 0) + 1; });
  const bySrc = {}; all.forEach(w => { bySrc[w.src] = (bySrc[w.src] || 0) + 1; });

  const catChips = ['all', ...TOPIC_ORDER.filter(k => byCat[k])].map(c =>
    `<button class="filter-chip ${this.cat === c ? 'active' : ''}" data-act="olCat" data-c="${attr(c)}">${c === 'all' ? `Alla (${all.length})` : `${CONTENT[c].icon} ${esc(CONTENT[c].label.split(' ')[0])} (${byCat[c]})`}</button>`).join('');
  const lvlChips = ['all', ...LVL_ORDER].map(l =>
    `<button class="filter-chip ${this.lvl === l ? 'active' : ''}" data-act="olLvl" data-l="${l}">${l === 'all' ? 'Alla nivåer' : l}</button>`).join('');
  const srcLbl = { lektion: '📖 Lektioner', ordlista: '📕 Ordlistan', egen: '⚡ Egna' };
  const srcChips = ['all', 'lektion', 'ordlista', 'egen'].filter(x => x === 'all' || bySrc[x]).map(x =>
    `<button class="filter-chip ${this.src === x ? 'active' : ''}" data-act="olSrc" data-s="${x}">${x === 'all' ? 'Alla källor' : srcLbl[x] + ' (' + bySrc[x] + ')'}</button>`).join('');

  const rows = shown.length ? shown.map(w => {
    const saved = isSaved(w.sv);
    return `<div class="ol-row">
      <div class="ol-main">
        <div class="ol-sv">${esc(w.sv)}${w.lvl ? `<span class="ol-lvl">${esc(w.lvl)}</span>` : ''}
          ${pill(getColor(w.cat), CONTENT[w.cat]?.label.split(' ')[0] || w.cat, true)}</div>
        <div class="ol-tr">${esc(w.tr)}</div>
        ${w.form ? `<div class="ol-form">${esc(w.form)}</div>` : ''}
        ${w.ex ? `<div class="ol-ex">"${esc(w.ex)}"</div>` : ''}
        ${w.tip ? `<div class="ol-tip">💡 ${esc(w.tip)}</div>` : ''}
      </div>
      <div class="ol-acts">
        <button class="bt" data-act="speak" data-text="${attr(w.sv)}">🔊</button>
        <button class="bt ${saved ? 'saved' : ''}" data-act="olSave" data-sv="${attr(w.sv)}">${saved ? '★' : '☆'}</button>
      </div></div>`;
  }).join('') : `<div class="empty-state"><div class="empty-state-icon">🔍</div><div class="empty-state-text">Inga ord matchar.</div></div>`;

  const more = list.length > shown.length
    ? `<button class="btn-ghost" style="width:100%;margin-top:12px" data-act="olMore">↓ Visa ${Math.min(PAGE_SIZE, list.length - shown.length)} till (${shown.length}/${list.length})</button>` : '';

  return `<div class="panel">
      <div class="panel-title">📕 Hela ordlistan — ${all.length} ord</div>
      <div class="panel-hint">Ders kelimeleri, kürasyonlu sözlük ve kendi ürettiğin paketler tek yerde. ★ ile ordbanken'e (tekrar programına) eklersin.</div>
      <div class="filter-row" style="margin-top:12px">
        <input class="search-input" id="olSearch" placeholder="Sök på svenska, turkiska eller i exempelmeningar..." value="${attr(this.search)}" data-inp="olSearch" autocomplete="off"></div>
      <div class="filter-row">${catChips}</div>
      <div class="filter-row">${lvlChips}</div>
      <div class="filter-row">${srcChips}</div>
    </div>
    <div class="ol-list">${rows}</div>${more}`;
};

// ── PAKET ÜRETİCİSİ + CSV ────────────────────────────────
const PACK_PROMPT = `Du skapar ordpaket för en turkisktalande som lär sig svenska.

REGLER — kvaliteten är viktigare än antalet
- Ge exakt det antal ord som begärs, alla inom det begärda temat och på den begärda CEFR-nivån.
- Välj ord som en verklig användare möter i det temat. Undvik de allra vanligaste basorden (och, att, vara) om nivån är B1 eller högre.
- "form" är OBLIGATORISKT och måste vara korrekt:
  · substantiv: "en journal – journalen – journaler" (obestämd – bestämd – plural)
  · verb: "skriva – skriver – skrev – skrivit" (infinitiv – presens – preteritum – supinum)
  · adjektiv: "stor – stort – stora"
  · övrigt: ordklassen, t.ex. "adverb" eller "fast uttryck"
- Är du osäker på genus (en/ett) eller pluralform för ett ord: VÄLJ ETT ANNAT ORD. Hellre färre säkra ord än ett felaktigt.
- "uttal" = uttalshjälp skriven så att en turkisktalande kan läsa den (inte IPA). Markera betonad stavelse med VERSALER.
- "ex" = en naturlig svensk exempelmening där ordet faktiskt används i temat.
- "tip" = TURKISK not: falsk vän, prepositionsskillnad, sammansättningslogik, eller vanligt fel turkar gör.

SVARA ENDAST med denna JSON:
{"words":[{"sv":"ord","tr":"Türkçe karşılık","form":"böjning","uttal":"telaffuz","ex":"svensk mening","tip":"Türkçe ipucu","lvl":"A1|A2|B1|B2|C1|C2"}]}`;

Ordlista.renderCreate = function () {
  if (this.gBusy) return `<div class="ai-loading"><div class="ai-loading-dots"><span></span><span></span><span></span></div><span>AI ${this.gCount} kelimelik paket hazırlıyor...</span></div>`;
  if (this.gResult) return this.renderReview();

  const themes = TOPIC_ORDER.map(k =>
    `<button class="chat-topic-chip ${this.gTheme === k ? 'active' : ''}" data-act="olTheme" data-k="${k}">${CONTENT[k].icon} ${esc(CONTENT[k].label)}</button>`).join('');
  const lvls = ['', ...LVL_ORDER].map(l =>
    `<button class="filter-chip ${this.gLevel === l ? 'active' : ''}" data-act="olGLvl" data-l="${l}">${l || 'Nivåm (' + esc(S.cfg.level) + ')'}</button>`).join('');
  const counts = [15, 25, 50].map(n =>
    `<button class="filter-chip ${this.gCount === n ? 'active' : ''}" data-act="olCount" data-n="${n}">${n} ord</button>`).join('');

  return `<div class="panel">
      <div class="panel-title">⚡ Skapa ordpaket</div>
      <div class="panel-hint">Tema ve seviye seç, AI kelime paketi üretsin. Onayladıkların kalıcı sözlüğüne girer — derslerde, tekrar programında ve günün kelimelerinde kullanılır. Zaten sözlükte olanlar otomatik elenir.</div>
      <div class="fld-label">Tema</div><div class="filter-row">${themes}</div>
      <div class="fld-label" for="olFree">Ya da kendi konun</div>
      <input class="fld-select" id="olFree" placeholder="t.ex. ortopedisk kirurgi, hästens rörelseapparat, tandvård..." value="${attr(this.gFree)}" data-inp="olFree" autocomplete="off">
      <div class="fld-label">Nivå</div><div class="filter-row">${lvls}</div>
      <div class="fld-label">Antal</div><div class="filter-row">${counts}</div>
      <div class="btn-row"><button class="btn-primary" data-act="olGenerate">✨ Skapa paket</button></div>
    </div>

    <div class="panel">
      <div class="panel-title">📄 CSV ile içe aktar</div>
      <div class="panel-hint">Elindeki listeyi doğrudan yükle. İlk satır başlık olmalı; en az <code class="md-code">sv</code> ve <code class="md-code">tr</code> sütunları gerekli.
        İsteğe bağlı: <code class="md-code">form, uttal, ex, tip, cat, lvl</code>. Ayraç virgül ya da noktalı virgül olabilir.</div>
      <label class="btn-ghost import-label" style="width:100%;margin-top:12px;display:block;text-align:center">
        ⬆️ CSV seç<input type="file" id="olCsv" accept=".csv,.txt" hidden></label>
      <button class="btn-ghost btn-xs" style="margin-top:10px" data-act="olCsvSample">📥 Örnek CSV indir</button>
    </div>

    ${userWords().length ? `<div class="panel">
      <div class="panel-title">⚡ Kendi kelimelerin — ${userWords().length}</div>
      <div class="panel-hint">Ürettiğin ve içe aktardığın kelimeler. Yedeklerine dahil edilir.</div>
      <div class="btn-row">
        <button class="btn-ghost btn-xs" data-act="olSrc" data-s="egen">Listede göster</button>
        <button class="btn-danger btn-xs" data-act="olClearUser">Hepsini sil</button></div></div>` : ''}`;
};

Ordlista.renderReview = function () {
  const words = this.gResult;
  const picked = Object.values(this.gPick).filter(Boolean).length;
  return `<div class="panel">
      <div class="panel-title">${words.length} ord klara — granska innan du sparar</div>
      <div class="panel-hint">Çekimi ya da çevirisi yanlış görünen varsa işareti kaldır. Sadece işaretlediklerin sözlüğe girer.</div>
      <div class="btn-row">
        <button class="btn-ghost btn-xs" data-act="olPickAll" data-v="1">Hepsini seç</button>
        <button class="btn-ghost btn-xs" data-act="olPickAll" data-v="0">Hiçbirini seçme</button></div>
    </div>
    <div class="ol-list">${words.map((w, i) => `<div class="ol-row ${this.gPick[i] ? 'picked' : 'unpicked'}">
      <div class="ol-main">
        <div class="ol-sv">${esc(w.sv)}${w.lvl ? `<span class="ol-lvl">${esc(w.lvl)}</span>` : ''}</div>
        <div class="ol-tr">${esc(w.tr)}</div>
        ${w.form ? `<div class="ol-form">${esc(w.form)}</div>` : ''}
        ${w.ex ? `<div class="ol-ex">"${esc(w.ex)}"</div>` : ''}
        ${w.tip ? `<div class="ol-tip">💡 ${esc(w.tip)}</div>` : ''}
      </div>
      <div class="ol-acts">
        <button class="bt" data-act="speak" data-text="${attr(w.sv)}">🔊</button>
        <button class="bt ${this.gPick[i] ? 'saved' : ''}" data-act="olPick" data-i="${i}">${this.gPick[i] ? '☑' : '☐'}</button>
      </div></div>`).join('')}</div>
    <div class="btn-row">
      <button class="btn-primary" data-act="olSavePack">💾 Spara ${picked} ord i ordlistan</button>
      <button class="btn-ghost" data-act="olDiscard">✕ Kasta</button>
      <button class="btn-ghost" data-act="olGenerate">🔄 Nytt paket</button></div>`;
};

// ── CSV ──────────────────────────────────────────────────
function parseCSV(text) {
  const lines = String(text).replace(/^﻿/, '').split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) throw new Error('Dosya boş ya da sadece başlık var');
  const delim = (lines[0].match(/;/g) || []).length > (lines[0].match(/,/g) || []).length ? ';' : ',';
  const splitRow = (line) => {
    const out = []; let cur = '', q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (q) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === delim) { out.push(cur); cur = ''; }
      else cur += c;
    }
    out.push(cur); return out.map(x => x.trim());
  };
  const head = splitRow(lines[0]).map(h => h.toLowerCase().replace(/[^a-zçğıöşü]/g, ''));
  const iSv = head.findIndex(h => ['sv', 'svenska', 'ord', 'isveççe', 'kelime'].includes(h));
  const iTr = head.findIndex(h => ['tr', 'turkiska', 'türkçe', 'turkce', 'anlam'].includes(h));
  if (iSv < 0 || iTr < 0) throw new Error('Başlıkta "sv" ve "tr" sütunları bulunamadı');
  const idx = (names) => head.findIndex(h => names.includes(h));
  const iForm = idx(['form', 'böjning', 'bojning', 'çekim']), iUt = idx(['uttal', 'telaffuz', 'pron']);
  const iEx = idx(['ex', 'exempel', 'örnek', 'ornek']), iTip = idx(['tip', 'not', 'ipucu']);
  const iCat = idx(['cat', 'kategori', 'tema']), iLvl = idx(['lvl', 'nivå', 'niva', 'seviye', 'cefr']);
  const get = (r, i) => (i >= 0 && r[i] ? r[i] : '');
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const r = splitRow(lines[i]);
    if (!r[iSv] || !r[iTr]) continue;
    const cat = get(r, iCat);
    out.push({
      sv: r[iSv], tr: r[iTr], form: get(r, iForm), uttal: get(r, iUt),
      ex: get(r, iEx), tip: get(r, iTip),
      cat: CONTENT[cat] ? cat : 'vardag',
      lvl: LVL_ORDER.includes(get(r, iLvl).toUpperCase()) ? get(r, iLvl).toUpperCase() : '',
    });
  }
  if (!out.length) throw new Error('Geçerli satır bulunamadı');
  return out;
}

function addToUserWords(words) {
  const existing = new Set(dict().map(w => w.sv.toLowerCase()));
  const list = userWords();
  let added = 0, dup = 0;
  words.forEach(w => {
    if (!w.sv || !w.tr) return;
    if (existing.has(w.sv.toLowerCase())) { dup++; return; }
    existing.add(w.sv.toLowerCase());
    list.push({ sv: w.sv, tr: w.tr, form: w.form || '', uttal: w.uttal || '', ex: w.ex || '', tip: w.tip || '', cat: w.cat || 'vardag', lvl: w.lvl || '' });
    added++;
  });
  saveUserWords(list);
  return { added, dup };
}

// ── AKSİYONLAR ───────────────────────────────────────────
Object.assign(ACTIONS, {
  olSearch: (d, el) => {
    Ordlista.search = el.value; Ordlista.page = 0;
    renderTab('bank');
    const i = document.getElementById('olSearch');
    if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
  },
  olCat: (d) => { Ordlista.cat = d.c; Ordlista.page = 0; renderTab('bank'); },
  olLvl: (d) => { Ordlista.lvl = d.l; Ordlista.page = 0; renderTab('bank'); },
  olSrc: (d) => { Ordlista.src = d.s; Ordlista.page = 0; S.bMode = 'browse'; renderTab('bank'); },
  olMore: () => { Ordlista.page++; renderTab('bank'); },
  olSave: (d) => {
    const w = dict().find(x => x.sv === d.sv); if (!w) return;
    saveWordObj(w, w.cat);
  },
  olTheme: (d) => { Ordlista.gTheme = d.k; renderTab('bank'); },
  olGLvl: (d) => { Ordlista.gLevel = d.l; renderTab('bank'); },
  olCount: (d) => { Ordlista.gCount = +d.n; renderTab('bank'); },
  olFree: (d, el) => { Ordlista.gFree = el.value; },
  olPick: (d) => { const i = +d.i; Ordlista.gPick[i] = !Ordlista.gPick[i]; renderTab('bank'); },
  olPickAll: (d) => { (Ordlista.gResult || []).forEach((_, i) => Ordlista.gPick[i] = d.v === '1'); renderTab('bank'); },
  olDiscard: () => { Ordlista.gResult = null; Ordlista.gPick = {}; renderTab('bank'); },
  olClearUser: () => {
    if (!confirm('Kendi ürettiğin ve içe aktardığın tüm kelimeler silinsin mi? (Ordbanken\'e kaydettiklerin kalır)')) return;
    saveUserWords([]); renderTab('bank'); showToast('Egna ord raderade', 'info');
  },
  olGenerate: async () => {
    if (!S.cfg.apiKey) { openSettings(); return; }
    Ordlista.gBusy = true; Ordlista.gResult = null; renderTab('bank');
    try {
      const theme = Ordlista.gFree.trim() || `${CONTENT[Ordlista.gTheme].label} (${CONTENT[Ordlista.gTheme].units.map(u => u.title).join(', ')})`;
      const lvl = Ordlista.gLevel || S.cfg.level;
      const have = dict().filter(w => w.cat === Ordlista.gTheme).slice(-120).map(w => w.sv).join(', ');
      const res = await callJSON(PACK_PROMPT, [{
        role: 'user',
        content: `Tema: ${theme}\nNivå: ${lvl}\nAntal ord: ${Ordlista.gCount}\nAnvändarens yrke: ${S.cfg.profession}\n${have ? `\nDessa ord finns REDAN — välj andra:\n${have}` : ''}`
      }], { maxTokens: 8000 });
      const words = (res.words || []).filter(w => w && w.sv && w.tr);
      if (!words.length) throw new Error('Paket boş döndü, tekrar dene');
      const existing = new Set(dict().map(w => w.sv.toLowerCase()));
      Ordlista.gResult = words.filter(w => !existing.has(w.sv.toLowerCase()));
      Ordlista.gPick = {}; Ordlista.gResult.forEach((_, i) => Ordlista.gPick[i] = true);
      const skipped = words.length - Ordlista.gResult.length;
      showToast(`${Ordlista.gResult.length} yeni kelime${skipped ? ` (${skipped} tekrar elendi)` : ''}`, 'success');
    } catch (e) { showToast(e.message, 'error'); }
    Ordlista.gBusy = false; renderTab('bank');
  },
  olSavePack: () => {
    const picked = (Ordlista.gResult || []).filter((_, i) => Ordlista.gPick[i])
      .map(w => Object.assign({}, w, { cat: Ordlista.gFree.trim() ? Ordlista.gTheme : Ordlista.gTheme }));
    if (!picked.length) { showToast('Hiç kelime seçilmedi', 'error'); return; }
    const { added, dup } = addToUserWords(picked);
    Ordlista.gResult = null; Ordlista.gPick = {};
    addXP(Math.min(50, added));
    showToast(`${added} ord tillagda i ordlistan${dup ? ` · ${dup} tekrar` : ''} · +${Math.min(50, added)} XP`, 'success');
    renderTab('bank');
  },
  olCsvSample: () => {
    const csv = '﻿sv,tr,form,uttal,ex,tip,cat,lvl\n'
      + '"anestesi","anestezi","en anestesi – anestesin – anestesier","ane-ste-Sİİİ","Anestesin inleddes klockan nio.","narkos = genel, bedövning = lokal","vet","B2"\n'
      + '"remiss","sevk","en remiss – remissen – remisser","re-MİSS","Remiss skickades till specialistkliniken.","skriva en remiss = sevk yazmak","med","B1"\n';
    download('ordlista-mall.csv', csv, 'text/csv;charset=utf-8');
  },
});

document.addEventListener('change', (e) => {
  if (e.target.id !== 'olCsv') return;
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const words = parseCSV(r.result);
      const { added, dup } = addToUserWords(words);
      showToast(`${added} ord importerade${dup ? ` · ${dup} tekrar elendi` : ''}`, 'success');
      renderTab('bank');
    } catch (err) { showToast('CSV okunamadı: ' + err.message, 'error'); }
  };
  r.readAsText(f, 'utf-8');
});
