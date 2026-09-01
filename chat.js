// ═══════════════════════════════════════════════════════════
// AI-LÄRAREN — canlı sohbet
// Streaming · Sesli konuşma (sv-SE) · Anlık düzeltme · Rollspel
// ═══════════════════════════════════════════════════════════
'use strict';

const CHAT_TOPICS = [
  { id: 'vet', label: '🐾 Veterinär' },
  { id: 'med', label: '🏥 Medicin' },
  { id: 'system', label: '🏛️ Myndigheter' },
  { id: 'vardag', label: '💬 Vardag' },
  { id: 'grammatik', label: '✏️ Grammatik' },
  { id: 'nyheter', label: '📰 Nyheter' },
  { id: 'uttryck', label: '🗣️ Uttryck' },
];

const ROLEPLAYS = [
  { id: 'vardcentral', icon: '🩺', name: 'Hos läkaren', you: 'patient', desc: 'Şikâyetini anlat, doktorun sorularını yanıtla.',
    setup: 'Du är distriktsläkare på en svensk vårdcentral. Eleven är din patient. Ta anamnes med öppna frågor, en fråga i taget. Använd naturlig, vänlig vårdsvenska.' },
  { id: 'veterinar', icon: '🐕', name: 'Orolig djurägare', you: 'veterinär', desc: 'Sen veterinersin — endişeli hayvan sahibiyle konuş.',
    setup: 'Du är en orolig djurägare som kommit till kliniken med ditt djur. Eleven är veterinären. Beskriv symtom vagt och ställ oroliga följdfrågor om kostnad och prognos, precis som en riktig djurägare gör. Håll dig i rollen.' },
  { id: 'sbar', icon: '📞', name: 'SBAR till kollega', you: 'rapporterande', desc: 'Meslektaşına yapılandırılmış hasta raporu ver.',
    setup: 'Du är jourhavande läkare som blir uppringd. Eleven ska rapportera en patient enligt SBAR (Situation, Bakgrund, Aktuellt tillstånd, Rekommendation). Om något saknas i rapporten, fråga efter det precis som en verklig kollega skulle. Avsluta med att sammanfatta vad ni kommit överens om.' },
  { id: 'svartbesked', icon: '💔', name: 'Ge ett svårt besked', you: 'vårdpersonal', desc: 'Kötü haberi şefkatle vermeyi çalış.',
    setup: 'Du är patient (eller djurägare) som får ett svårt besked. Eleven ska förmedla beskedet. Reagera realistiskt: tystnad, frågor, ibland förnekelse. Var inte överdramatisk. Ge eleven utrymme.' },
  { id: 'apotek', icon: '💊', name: 'På apoteket', you: 'kund', desc: 'Reçete, doz ve yan etki sorularını sor.',
    setup: 'Du är farmaceut på ett svenskt apotek. Eleven är kund och hämtar ut ett recept. Förklara dosering, biverkningar och högkostnadsskyddet på tydlig svenska.' },
  { id: 'myndighet', icon: '🏛️', name: 'Myndighetssamtal', you: 'sökande', desc: 'Försäkringskassan / Migrationsverket görüşmesi.',
    setup: 'Du är handläggare på en svensk myndighet (Försäkringskassan eller Migrationsverket). Eleven ringer om sitt ärende. Använd formell myndighetssvenska, be om personnummer, förklara handläggningstid och vilka underlag som saknas.' },
  { id: 'jobbintervju', icon: '💼', name: 'Anställningsintervju', you: 'sökande', desc: 'İsveççe iş görüşmesi pratiği.',
    setup: 'Du är rekryterande chef på ett svenskt sjukhus eller djursjukhus. Intervjua eleven för en tjänst. Ställ kompetensbaserade frågor en i taget ("Berätta om en gång då…"). Ge kort feedback på slutet om eleven ber om det.' },
  { id: 'fikarummet', icon: '☕', name: 'Fikarummet', you: 'kollega', desc: 'İş yerinde küçük sohbet — en zoru!',
    setup: 'Du är en svensk arbetskamrat i fikarummet. Småprata avslappnat om vardagliga saker: vädret, helgen, semestern, en tv-serie. Använd talspråk, utfyllnadsord (typ, alltså, liksom) och korta repliker. Dra in eleven i samtalet.' },
  { id: 'hyresvard', icon: '🏠', name: 'Samtal med hyresvärd', you: 'hyresgäst', desc: 'Ev sorununu bildir, çözüm iste.',
    setup: 'Du är hyresvärd/fastighetsskötare. Eleven ringer om ett problem i lägenheten. Var lite byråkratisk, fråga efter detaljer och föreslå en tid för besök.' },
  { id: 'tisus', icon: '🎓', name: 'TISUS muntlig del', you: 'kandidat', desc: 'Akademik sözlü sınav simülasyonu.',
    setup: 'Du är TISUS-examinator för den muntliga delen. Följ upplägget: kort presentation → redogörelse för ett ämne → argumenterande diskussion där du aktivt invänder mot elevens ståndpunkter. Håll en akademisk ton. Ge bedömning endast om eleven ber om det.' },
];

const Chat = {
  history: LS.get('sh_chat', []),
  topic: LS.get('sh_chat_topic', 'vet'),
  mode: 'normal', roleplay: null,
  voiceMode: false, streaming: false, controller: null, draft: '',
};
window.Chat = Chat;

Chat.systemPrompt = function () {
  const topicLabel = CONTENT[this.topic]?.label || 'Allmän svenska';
  const recent = S.bank.slice(-15).map(w => w.sv).join(', ');
  let p = `Du är AI-läraren i "Svenska Herald". Eleven är turkisktalande, CEFR-nivå ${S.cfg.level}, yrke: ${S.cfg.profession}, siktar mot ${STANDARDS[S.cfg.standard].label}.

GRUNDREGLER
- Förklaringar på TURKISKA, allt språkmaterial (ord, meningar, exempel) på SVENSKA.
- Var kortfattad: högst 250 ord. Hellre 3-5 starka exempel än långa listor.
- För varje nytt ord: betydelse + böjning (en/ett, bestämd form, plural — eller verbets fyra former) + en äkta exempelmening + en turkiskspecifik ipucu (falsk vän, prepositionsskillnad, sammansättningslogik).
- Anpassa svårighetsgraden till nivå ${S.cfg.level}.
- Avsluta med EN fråga som får eleven att producera svenska.
- Hitta inte på fakta. Är du osäker, säg det.
- Fokusområde: ${topicLabel}.`;

  if (recent) p += `\n- Elevens senast sparade ord (återanvänd dem naturligt om det passar): ${recent}.`;

  if (S.cfg.autoCorrect) {
    p += `

RÄTTNING
Har eleven skrivit svenska med fel, lägg ALLRA FÖRST i svaret detta block (utelämna det helt om språket är korrekt):
###FIX###
{"original":"elevens mening","corrected":"rättad mening","notes":["kort förklaring PÅ TURKISKA — nämn regeln, t.ex. V2, BIFF, en/ett, preposition"],"level":"minor|major"}
###END###`;
  }

  if (this.mode === 'roleplay' && this.roleplay) {
    p += `

ROLLSPEL — ${this.roleplay.name}
${this.roleplay.setup}
- Håll dig i rollen, tala SVENSKA, håll replikerna korta (2-4 meningar) och ställ en fråga i taget.
- Rätta INTE mitt i rollspelet om det inte hindrar förståelsen — stanna i rollen.
- Säger eleven "stopp" eller "avsluta": bryt rollen och ge kort feedback PÅ TURKISKA (styrkor, 3 fel med rättning, 5 användbara fraser).`;
  }

  p += `

ORDKORT
Har du lärt ut nya ord, lägg SIST i svaret (annars inte):
###VOCAB###
[{"sv":"ord","tr":"Türkçe","form":"en journal – journalen – journaler | skriva – skriver – skrev – skrivit","uttal":"Türk okuyucu için telaffuz","cat":"vet|med|system|vardag|grammatik|nyheter|uttryck","ex":"svensk exempelmening","tip":"Türkçe ipucu"}]
###END###`;
  return p;
};

function splitBlocks(raw) {
  let text = raw, vocab = [], fix = null;
  const vm = text.match(/###VOCAB###([\s\S]*?)(?:###END###|$)/);
  if (vm) { text = text.replace(vm[0], '').trim(); try { const v = parseJSONLoose(vm[1]); if (Array.isArray(v)) vocab = v; } catch {} }
  const fm = text.match(/###FIX###([\s\S]*?)(?:###END###|$)/);
  if (fm) { text = text.replace(fm[0], '').trim(); try { fix = parseJSONLoose(fm[1]); } catch {} }
  return { text: text.trim(), vocab, fix };
}

Chat.render = function () {
  if (!S.cfg.apiKey) return `<div class="fade-in"><div class="section-head"><h2>💬 AI-läraren</h2></div>${noApiNotice('Canlı AI sohbeti')}</div>`;

  const topicBtns = CHAT_TOPICS.map(t => `<button class="chat-topic-chip ${this.topic === t.id && this.mode === 'normal' ? 'active' : ''}" data-act="chatTopic" data-t="${t.id}">${t.label}</button>`).join('');
  const rpBtns = ROLEPLAYS.map(r => `<button class="rp-chip ${this.roleplay?.id === r.id ? 'active' : ''}" data-act="chatRoleplay" data-r="${r.id}" title="${attr(r.desc)}">${r.icon} ${esc(r.name)}</button>`).join('');
  const msgs = this.history.length ? this.history.map((m, i) => this.msgHTML(m, i)).join('') : this.welcomeHTML();

  const quick = [
    ['🐾 Vetord', 'Lär mig 5 veterinärmedicinska ord som används dagligen på en svensk klinik, med böjning och exempel'],
    ['🏥 Journalfraser', 'Ge mig 8 standardfraser som används i svenska journalanteckningar, med förklaring'],
    ['✏️ Rätta mig', 'Ge mig 5 meningar med typiska fel som turkar gör på svenska, och låt mig rätta dem'],
    ['🔤 Prepositioner', 'Förklara skillnaden mellan prepositionerna på, i, till och för med exempel'],
    ['📝 Miniprov', 'Ge mig ett kort prov på 5 frågor från mina senast sparade ord'],
    ['🗣️ Uttal', 'Vilka svenska ljud är svårast för turkisktalande? Ge övningsord för varje'],
  ].map(([l, p]) => `<button class="chat-quick-btn" data-act="chatQuick" data-q="${attr(p)}">${l}</button>`).join('');

  const rpBanner = this.mode === 'roleplay' && this.roleplay ? `<div class="rp-banner">
    <span>${this.roleplay.icon} <b>${esc(this.roleplay.name)}</b> — sen ${esc(this.roleplay.you)} rolündesin. Svenska tack!</span>
    <button class="btn-ghost btn-xs" data-act="chatEndRoleplay">Avsluta rollspel</button></div>` : '';

  return `<div class="fade-in">
    <div class="section-head"><h2>💬 AI-läraren</h2><span class="badge badge-live">● Live</span>
      <button class="btn-ghost btn-xs" style="margin-left:auto" data-act="chatClear">🗑 Rensa</button></div>
    <div class="chat-topic-bar">${topicBtns}</div>
    <details class="rp-details" ${this.mode === 'roleplay' ? 'open' : ''}>
      <summary>🎭 Rollspel — riktig samtalsträning (10 scenarier)</summary>
      <div class="rp-grid">${rpBtns}</div></details>
    ${rpBanner}
    <div class="chat-container">
      <div class="chat-messages" id="chatMessages">${msgs}</div>
      <div class="chat-input-row">
        <button class="mic-btn ${this.voiceMode ? 'on' : ''}" id="micBtn" data-act="chatMic" title="Tala svenska" aria-label="Mikrofon">🎙️</button>
        <textarea class="chat-input" id="chatInput" placeholder="${this.mode === 'roleplay' ? 'Svara på svenska…' : 'Fråga något, be om ord, öva en mening…'}" rows="1">${esc(this.draft)}</textarea>
        <button class="chat-send-btn" id="chatSendBtn" data-act="chatSend">${this.streaming ? '■ Stopp' : 'Skicka →'}</button>
      </div>
      <div class="mic-status hidden" id="micStatus"></div>
    </div>
    <div class="chat-quick-btns">${quick}</div>
    <p class="flip-hint">💡 Mikrofona bas → İsveççe konuş → AI hem yazsın hem sesli cevaplasın. Ses ve otomatik düzeltme ayarları ⚙️ menüsünde.</p>
  </div>`;
};

Chat.welcomeHTML = function () {
  return `<div class="chat-msg ai"><div class="chat-avatar">📰</div><div><div class="chat-bubble">${md(`Hej! Ben **Svenska Herald**'ın AI öğretmeniyim. 🇸🇪

Seviyen **${S.cfg.level}**, hedefin **${STANDARDS[S.cfg.standard].short}**. Buna göre konuşacağım.

**Deneyebileceklerin:**
- "Lär mig 5 ord om anestesi"
- "Är den här meningen rätt: Jag har varit på sjukhuset igår?"
- 🎭 Rollspel seç — orolig djurägare, SBAR-rapport, jobbintervju...
- 🎙️ Mikrofona basıp İsveççe konuş

Vad vill du öva på i dag?`)}</div></div></div>`;
};

Chat.msgHTML = function (m, i) {
  if (m.role === 'user') return `<div class="chat-msg user"><div class="chat-avatar">👤</div><div><div class="chat-bubble">${esc(m.text)}</div></div></div>`;
  REG.chat[i] = m.vocab || [];
  const fix = m.fix ? this.fixHTML(m.fix) : '';
  const vocab = (m.vocab || []).length ? `<div class="chat-vocab-row">${m.vocab.map((w, vi) => {
    const saved = isSaved(w.sv);
    return `<div class="chat-vocab-mini">
      <div class="cvm-cat">${esc(CONTENT[w.cat]?.label || w.cat || '')}</div>
      <div class="cvm-en">${esc(w.sv)}</div>
      <div class="cvm-tr">${esc(w.tr)}</div>
      ${w.form ? `<div class="cvm-form">${esc(w.form)}</div>` : ''}
      ${w.ex ? `<div class="cvm-ex">"${esc(w.ex)}"</div>` : ''}
      <div class="cvm-actions">
        <button class="cvm-speak" data-act="speak" data-text="${attr(w.sv)}">🔊</button>
        <button class="cvm-star ${saved ? 'saved' : ''}" data-act="saveWord" data-src="chat" data-m="${i}" data-i="${vi}" data-cat="${attr(mapCat(w.cat))}">${saved ? '★' : '☆'}</button>
      </div></div>`;
  }).join('')}</div>` : '';
  return `<div class="chat-msg ai"><div class="chat-avatar">📰</div><div>${fix}
    <div class="chat-bubble">${md(m.text)}</div>
    <div class="bubble-tools"><button class="bt" data-act="speakMsg" data-i="${i}">🔊 Lyssna</button><button class="bt" data-act="copyMsg" data-i="${i}">📋 Kopiera</button></div>
    ${vocab}</div></div>`;
};

Chat.fixHTML = function (f) {
  return `<div class="fix-card ${f.level === 'major' ? 'major' : ''}">
    <div class="fix-head">✏️ Rättning</div>
    <div class="fix-line old">${esc(f.original || '')}</div>
    <div class="fix-line new">${esc(f.corrected || '')}
      <button class="bt" data-act="speak" data-text="${attr(f.corrected || '')}">🔊</button></div>
    ${(f.notes || []).length ? `<ul class="fix-notes">${f.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
  </div>`;
};

Chat.afterRender = function () {
  const el = document.getElementById('chatMessages');
  if (el) el.scrollTop = el.scrollHeight;
  const inp = document.getElementById('chatInput');
  if (inp) {
    inp.addEventListener('input', () => { Chat.draft = inp.value; autoGrow(inp); });
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); Chat.sendFromInput(); } });
    autoGrow(inp);
  }
};
function autoGrow(el) { el.style.height = 'auto'; el.style.height = Math.min(160, el.scrollHeight) + 'px'; }

Chat.onLeave = function () { Mic.stop(); TTS.stop(); this.voiceMode = false; if (this.controller) { this.controller.abort(); this.streaming = false; } };

Chat.sendFromInput = function () {
  const inp = document.getElementById('chatInput'); if (!inp) return;
  const v = inp.value.trim(); if (!v) return;
  inp.value = ''; this.draft = ''; autoGrow(inp);
  this.send(v);
};

Chat.appendNode = function (html) {
  const box = document.getElementById('chatMessages'); if (!box) return null;
  if (this.history.length === 1) box.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  const node = wrap.firstElementChild;
  box.appendChild(node); box.scrollTop = box.scrollHeight;
  return node;
};

Chat.send = async function (text) {
  if (!text || !text.trim() || this.streaming) return;
  if (!S.cfg.apiKey) { openSettings(); return; }
  TTS.stop();
  this.history.push({ role: 'user', text: text.trim() });
  const uIdx = this.history.length - 1;
  this.appendNode(this.msgHTML(this.history[uIdx], uIdx));

  const aiWrap = this.appendNode(`<div class="chat-msg ai"><div class="chat-avatar">📰</div><div>
    <div class="chat-bubble streaming" id="liveBubble"><span class="typing-indicator"><span></span><span></span><span></span></span></div></div></div>`);
  const bubble = aiWrap.querySelector('#liveBubble');
  const box = document.getElementById('chatMessages');

  this.streaming = true;
  this.controller = new AbortController();
  const btn = document.getElementById('chatSendBtn');
  if (btn) btn.textContent = '■ Stopp';

  const apiMsgs = this.history.slice(-14).map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text }));
  let raw = '';
  try {
    raw = await callAPIStream(this.systemPrompt(), apiMsgs, {
      maxTokens: 1400, signal: this.controller.signal,
      onDelta: (_, full) => {
        const shown = full.replace(/###(FIX|VOCAB)###[\s\S]*$/, '').trim();
        bubble.innerHTML = md(shown) || '<span class="typing-indicator"><span></span><span></span><span></span></span>';
        if (box.scrollHeight - box.scrollTop - box.clientHeight < 140) box.scrollTop = box.scrollHeight;
      },
    });
  } catch (e) {
    if (e.name === 'AbortError') raw = raw || '_(avbrutet)_';
    else {
      this.streaming = false;
      if (btn) btn.textContent = 'Skicka →';
      bubble.classList.remove('streaming');
      bubble.innerHTML = md('⚠️ ' + (e.message === 'NO_API_KEY' ? 'API anahtarı gerekli — ⚙️ Ayarlar' : e.message));
      this.history.push({ role: 'ai', text: '⚠️ ' + e.message, vocab: [] });
      this.save(); return;
    }
  }

  const { text: clean, vocab, fix } = splitBlocks(raw);
  this.history.push({ role: 'ai', text: clean, vocab, fix });
  this.save(); addXP(2);

  const idx = this.history.length - 1;
  const finalWrap = document.createElement('div');
  finalWrap.innerHTML = this.msgHTML(this.history[idx], idx);
  aiWrap.replaceWith(finalWrap.firstElementChild);
  box.scrollTop = box.scrollHeight;

  this.streaming = false; this.controller = null;
  if (btn) btn.textContent = 'Skicka →';

  if (S.cfg.autoSpeak || this.voiceMode) {
    TTS.speak(swedishOnly(clean), { onEnd: () => { if (this.voiceMode && S.cfg.autoListen) this.startMic(); } });
  } else if (this.voiceMode && S.cfg.autoListen) this.startMic();
};

/** Rol yapma modunda tüm metin İsveççe; normal modda tırnak içindeki İsveççe cümleleri seslendir */
function swedishOnly(t) {
  if (Chat.mode === 'roleplay') return t.replace(/\*\*/g, '').slice(0, 800);
  const quoted = t.match(/"([^"]{8,})"/g);
  if (quoted && quoted.length >= 2) return quoted.map(q => q.replace(/"/g, '')).join('. ');
  return t.replace(/\*\*/g, '').slice(0, 700);
}

Chat.save = function () { this.history = this.history.slice(-60); LS.set('sh_chat', this.history); };

Chat.startMic = function () {
  const status = document.getElementById('micStatus'), btn = document.getElementById('micBtn'), inp = document.getElementById('chatInput');
  if (!Mic.supported) { showToast('Bu tarayıcı mikrofon tanımayı desteklemiyor (Chrome/Edge dene)', 'error'); return; }
  LS.set('sh_voice_used', true); checkBadges();
  btn?.classList.add('listening');
  if (status) { status.classList.remove('hidden'); status.innerHTML = '<span class="rec-dot"></span> Lyssnar… tala svenska, tryck på mikrofonen igen när du är klar.'; }
  Mic.start({
    lang: 'sv-SE',
    onResult: (fin, interim) => {
      if (inp) { inp.value = (fin + ' ' + interim).trim(); autoGrow(inp); }
      if (status) status.innerHTML = '<span class="rec-dot"></span> ' + esc((fin + ' ' + interim).trim() || 'Lyssnar…');
    },
    onEnd: (fin) => {
      btn?.classList.remove('listening');
      if (status) status.classList.add('hidden');
      const t = (inp?.value || fin || '').trim();
      if (t) { if (inp) inp.value = ''; Chat.send(t); }
    },
    onError: () => { btn?.classList.remove('listening'); if (status) status.classList.add('hidden'); },
  });
};

Object.assign(ACTIONS, {
  chatSend: () => { if (Chat.streaming) { Chat.controller?.abort(); return; } Chat.sendFromInput(); },
  chatQuick: (d) => Chat.send(d.q),
  chatTopic: (d) => { Chat.topic = d.t; LS.set('sh_chat_topic', d.t); Chat.mode = 'normal'; Chat.roleplay = null; renderTab('chat'); },
  chatRoleplay: (d) => {
    const r = ROLEPLAYS.find(x => x.id === d.r); if (!r) return;
    Chat.roleplay = r; Chat.mode = 'roleplay'; renderTab('chat');
    Chat.send(`Nu börjar vi rollspelet: ${r.name}. Du spelar din roll, jag är ${r.you}. Ge första repliken på svenska, kort.`);
  },
  chatEndRoleplay: () => {
    const r = Chat.roleplay;
    Chat.mode = 'normal'; Chat.roleplay = null; renderTab('chat');
    if (r) Chat.send('Vi avslutar rollspelet. Konuşmam hakkında Türkçe kısa geri bildirim ver: güçlü yanlar, 3 hata ve düzeltmesi, 5 faydalı İsveççe ifade.');
  },
  chatClear: () => { if (!confirm('Sohbet geçmişi silinsin mi?')) return; Chat.history = []; Chat.save(); REG.chat = {}; renderTab('chat'); },
  chatMic: () => { if (Mic.listening) { Mic.stop(); return; } Chat.voiceMode = true; Chat.startMic(); },
  speakMsg: (d) => { const m = Chat.history[+d.i]; if (m) TTS.speak(swedishOnly(m.text)); },
  copyMsg: (d) => {
    const m = Chat.history[+d.i]; if (!m) return;
    navigator.clipboard?.writeText(m.text).then(() => showToast('Kopierat', 'success')).catch(() => showToast('Kopyalanamadı', 'error'));
  },
});
