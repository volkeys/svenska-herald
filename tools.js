// ═══════════════════════════════════════════════════════════
// VERKTYG — mesleki İsveççe araçları (veteriner & sağlık)
// Journal çevirici · Djurägarråd · Röntgen · Dos · Kommunikation
// ═══════════════════════════════════════════════════════════
'use strict';

const TOOL_GUARD = `GEMENSAMMA REGLER
- Du skriver PROFESSIONELL SVENSKA. Utkastet ska kunna klistras in i ett svenskt journalsystem eller skickas till en djurägare/patient utan omskrivning.
- Använd korrekt svensk fackterminologi och vedertagna förkortningar. Hitta ALDRIG på förkortningar.
- Lägg ALDRIG till kliniska fynd, mätvärden, diagnoser eller åtgärder som inte finns i underlaget. Saknas något viktigt: skriv det i fältet "saknas" istället för att gissa.
- Är underlaget motsägelsefullt eller otydligt: påpeka det i "saknas". Skriv inte runt problemet.
- Ange alltid sida (höger/vänster) och enhet när det förekommer i underlaget.
- Efter det svenska utkastet ger du en kort TÜRKÇE not om vilka språkliga val du gjort (terminoloji, kalıp), så att användaren lär sig.
- Slutanvändaren är legitimerad yrkesperson och ansvarar för det medicinska innehållet. Ditt utkast är ett SPRÅKLIGT förslag som ska granskas.`;

const TOOLS = [
  {
    id: 'journal', icon: '📋', name: 'Journal-omskrivning', color: 'var(--red)',
    desc: 'Dağınık Türkçe/İngilizce/karışık notlarını profesyonel İsveççe hasta kaydına çevirir. Anamnes / Status / Bedömning / Åtgärd yapısına oturtur.',
    fields: [
      { id: 'notes', label: 'Ham notların', type: 'area', rows: 9, req: true,
        ph: 'Karışık dilde yazabilirsin.\n\nÖrn: kedi 12 yaş dişi, 2 aydır çok su içiyor çok işiyor, 4.1den 3.2ye düşmüş, iştah dalgalı, haftada 1-2 kusma. muayenede zayıf BCS 3/9, böbrekler küçük ve düzensiz, tansiyon 168. krea 320, urea 22, SDMA yüksek. idrar dansite 1014. bence CKD. renal diyet başladım, 3 ay sonra kontrol.' },
      { id: 'species', label: 'Hasta / hayvan', type: 'text', ph: 'Katt, honkatt, 14 år, 3,2 kg' },
      { id: 'context', label: 'Bağlam', type: 'select', opts: ['Djursjukhus / veterinärklinik', 'Vårdcentral', 'Akutmottagning', 'Vårdavdelning / slutenvård', 'Hembesök'] },
    ],
    system: `Du är erfaren handledare i journalföring och skriver om råa anteckningar till korrekt svensk journaltext.

STRUKTUR: Anamnes / Status / Bedömning / Åtgärd. Placera varje uppgift under RÄTT rubrik — anamnesuppgifter hör inte hemma i status, och bedömning inte i anamnes.

STIL: journalsvenska är kortfattad och telegrafisk. Passiv form ("provtagning utfördes"), inga personliga pronomen, inga onödiga ord. Anamnes refererar vad patienten/ägaren uppger ("uppger", "beskriver", "enligt ägaren"). Status innehåller endast observationer.

${TOOL_GUARD}

SVARA ENDAST med denna JSON:
{"output":"Den färdiga journaltexten med rubrikerna Anamnes:/Status:/Bedömning:/Åtgärd: och radbrytningar (\\n)","saknas":["Underlaget saknar X — Türkçe açıklama, neden önemli"],"noter":["Türkçe: hangi terimi neden seçtim, hangi kalıbı kullandım"]}`,
  },
  {
    id: 'agarrad', icon: '🐕', name: 'Djurägarråd / Patientinformation', color: 'var(--teal)',
    desc: 'Klinik bulgu ve tedaviyi, hasta sahibinin anlayacağı sade İsveççeye çevirir. Taburculuk ve evde bakım talimatı üretir.',
    fields: [
      { id: 'findings', label: 'Bulgular / yapılanlar / verilen ilaçlar', type: 'area', rows: 7, req: true,
        ph: 'Örn: köpek, kastrasyon yapıldı bugün. meloksikam 0.1 mg/kg po x1, 4 gün. dikişler 10 gün sonra alınacak. yalamasın diye yaka. 3 gün kısa tasmalı yürüyüş.' },
      { id: 'audience', label: 'Kime', type: 'select', opts: ['Djurägare', 'Patient (vuxen)', 'Anhörig', 'Förälder till barnpatient'] },
      { id: 'tone', label: 'Ton', type: 'select', opts: ['Neutral och tydlig', 'Extra varsam (oroligt läge)', 'Kort och punktform'] },
    ],
    system: `Du skriver information till djurägare respektive patienter på LÄTTBEGRIPLIG SVENSKA.

SPRÅKKRAV
- INGA fackuttryck. Skriver du ändå en fackterm måste du förklara den direkt i samma mening.
- Korta meningar, du-tilltal, aktiv form. Konkreta tidsangivelser ("i tre dagar", "en gång om dagen på morgonen").
- Struktur: Vad vi hittade · Vad vi gjorde · Vad du ska göra hemma · När du ska höra av dig.
- Avsnittet "När du ska höra av dig" (säkerhetsnät) är OBLIGATORISKT och ska vara konkret.

${TOOL_GUARD}

SVARA ENDAST med denna JSON:
{"output":"Den färdiga texten till mottagaren, med rubriker och radbrytningar (\\n)","saknas":["..."],"noter":["Türkçe: hangi fackterm'i nasıl sadeleştirdim"]}`,
  },
  {
    id: 'rontgen', icon: '🩻', name: 'Röntgenutlåtande', color: 'var(--purple)',
    desc: 'Gözlemlerinden İsveççe radyoloji raporu (fynd + bedömning) yazar. Pozisyon ve görüntü kalitesi sınırlarını da not eder.',
    fields: [
      { id: 'obs', label: 'Gözlemlerin', type: 'area', rows: 7, req: true,
        ph: 'Örn: köpek toraks, lateral ve VD. kalp silueti hafif büyük VHS 11.2. perihiler alanda interstisyel-alveolar patern. bronş duvarları belirgin. plevral efüzyon yok. VD projeksiyon hafif rotasyonlu.' },
      { id: 'region', label: 'Bölge / proje', type: 'text', ph: 'Thorax, lateral + VD' },
      { id: 'quality', label: 'Görüntü kalitesi', type: 'select', opts: ['God kvalitet', 'Lätt rotation', 'Suboptimal positionering', 'Rörelseoskärpa', 'Inte angivet'] },
    ],
    system: `Du skriver svenska röntgenutlåtanden för smådjur.

STRUKTUR: "Frågeställning" (om angiven) · "Undersökning" (region och projektioner) · "Fynd" · "Bedömning" · vid behov "Rekommendation".

VIKTIGT
- Du har INTE sett några bilder. Du formulerar användarens EGNA observationer på korrekt svenska. Påstå aldrig att du granskat bilder och lägg aldrig till fynd.
- Fynd = beskrivande och objektivt (lokalisation, utbredning, densitet, storlek). Bedömning = tolkning, med differentialdiagnoser i sannolikhetsordning.
- Nämn positionerings- eller kvalitetsbegränsningar och hur de påverkar tolkningen.
- Använd etablerad svensk radiologisk terminologi (interstitiellt/alveolärt/bronkiellt mönster, VHS, osteolys, periostal reaktion, kontrastuppladdning).

${TOOL_GUARD}

SVARA ENDAST med denna JSON:
{"output":"Det färdiga utlåtandet med rubriker och radbrytningar (\\n)","saknas":["..."],"noter":["Türkçe: terminoloji notları"]}`,
  },
  {
    id: 'dos', icon: '💊', name: 'Dos & ordinationstext', color: 'var(--gold)',
    desc: 'Doz hesabını adım adım gösterir ve İsveççe reçete/ordinasyon cümlesini yazar. Hesabı ve kullandığı aralığı açıkça belirtir.',
    fields: [
      { id: 'animal', label: 'Hasta', type: 'text', req: true, ph: 'Hund, 18,4 kg' },
      { id: 'drug', label: 'İlaç', type: 'text', req: true, ph: 'Meloxicam' },
      { id: 'form', label: 'Formülasyon / konsantrasyon', type: 'text', req: true, ph: 'oral suspension 1,5 mg/ml — ya da tabl 20 mg' },
      { id: 'indication', label: 'Endikasyon', type: 'text', req: true, ph: 'Postoperativ smärtlindring efter kastration' },
      { id: 'regimen', label: 'İstediğin doz / rejim (biliyorsan)', type: 'text', ph: '0,1 mg/kg x1 i 4 dagar — boş bırakırsan aralık önerilir' },
      { id: 'notes2', label: 'Not (böbrek/karaciğer, gebelik, eş zamanlı ilaç…)', type: 'text', ph: 'Nedsatt njurfunktion, står på furosemid' },
    ],
    system: `Du hjälper en LEGITIMERAD yrkesperson att räkna ut dos och formulera ordinationstext på svenska.

ARBETSGÅNG — visa ALLTID uträkningen
1. Ange vilket dosintervall du utgår från (mg/kg, intervall, duration) och att det är ett REFERENSINTERVALL som ska verifieras mot FASS/FASS VET eller klinikens rutin.
2. Räkna steg för steg och visa mellanleden: mg/kg × kg = mg, sedan mg ÷ koncentration = ml (eller antal tabletter). Avrunda till praktiskt mätbar volym och säg hur du avrundat.
3. Skriv ordinationstexten på svenska i standardformat: läkemedel, styrka, dos, administreringsväg, frekvens, duration. Alla sex delarna måste finnas.

SÄKERHET — detta är viktigare än att vara hjälpsam
- Saknas art, vikt, koncentration eller indikation: RÄKNA INTE. Skriv i "saknas" exakt vad som behövs och lämna "output" tom.
- Är läkemedlet kontraindicerat eller farligt för arten (t.ex. paracetamol till katt, permetrin till katt, NSAID vid dehydrering/njursvikt, ivermektin till MDR1-känsliga raser): säg det TYDLIGT i "varningar" — före allt annat.
- Hamnar dosen utanför normalt intervall, eller finns interaktion/organpåverkan i underlaget: flagga i "varningar".
- Gäller det livsmedelsproducerande djur: påminn om karenstid.
- Avsluta alltid "output" med raden: "Kontrollera dos och kontraindikationer mot FASS VET/FASS före ordination."

${TOOL_GUARD}

SVARA ENDAST med denna JSON:
{"output":"Uträkning steg för steg + färdig ordinationstext, med radbrytningar (\\n). Tom sträng om underlaget är otillräckligt.","varningar":["Türkçe + İsveççe: güvenlik uyarısı"],"saknas":["Hangi bilgi eksik ve neden gerekli — Türkçe"],"noter":["Türkçe: kullanılan referans aralığı ve dil notları"]}`,
  },
  {
    id: 'kommunikation', icon: '✉️', name: 'Kundkommunikation', color: 'var(--blue)',
    desc: 'Randevu, tedavi bilgisi, sigorta kararı, fatura, teklif ve takip yazışmalarını profesyonel İsveççe olarak hazırlar.',
    fields: [
      { id: 'situation', label: 'Durum / iletmek istediğin', type: 'area', rows: 6, req: true,
        ph: 'Örn: sigorta şirketi kalça displazisi tedavisini karşılamayı reddetti çünkü sigortadan önceki bir bulgu saymışlar. sahibine bunu anlatmam, itiraz hakkını ve maliyet tahminini söylemem lazım.' },
      { id: 'kind', label: 'Yazışma türü', type: 'select', opts: ['Tidsbokning / ombokning', 'Behandlingsuppdatering', 'Försäkringsbesked', 'Faktura / betalning', 'Kostnadsförslag', 'Uppföljning', 'Klagomålssvar', 'Allmän fråga'] },
      { id: 'channel', label: 'Kanal', type: 'select', opts: ['E-post', 'SMS (kort)', 'Brev', 'Telefonmanus'] },
      { id: 'sender', label: 'Gönderen / klinik', type: 'text', ph: 'Anna Svensson, leg. veterinär, Malmö Djurklinik' },
    ],
    system: `Du skriver professionell svensk kundkommunikation för en klinik.

STIL
- Artig, tydlig, du-tilltal. Aktiv form. Inga överdrivna ursäkter, ingen kanslisvenska.
- E-post: ämnesrad + hälsning + kärnbudskap i första stycket + detaljer + tydligt nästa steg + avslutning ("Med vänliga hälsningar").
- SMS: högst 320 tecken, ingen hälsningsfras, ett budskap.
- Telefonmanus: repliker med [paus för svar]-markeringar.
- Negativa besked: säg det rakt i första stycket, förklara sedan varför, och avsluta ALLTID med vad mottagaren kan göra härnäst (t.ex. överklaga, delbetalning, ny tid).
- Ange aldrig belopp, datum eller villkor som inte finns i underlaget — skriv [belopp] / [datum] som platshållare.
- GDPR: skriv inga känsliga uppgifter som inte behövs för budskapet.

${TOOL_GUARD}

SVARA ENDAST med denna JSON:
{"output":"Det färdiga meddelandet, med ämnesrad om det är e-post, radbrytningar (\\n)","saknas":["..."],"noter":["Türkçe: üslup ve kalıp notları"]}`,
  },
];

const Tools = {
  cur: null, busy: false, vals: {}, result: null,
};
window.Tools = Tools;

Tools.render = function () {
  if (this.busy) return this.shell(`<div class="ai-loading"><div class="ai-loading-dots"><span></span><span></span><span></span></div><span>Utkast skrivs...</span></div>`);
  if (this.cur) return this.shell(this.renderTool(this.cur));
  return this.shell(this.renderHub());
};

Tools.shell = function (inner) {
  const back = this.cur ? `<button class="btn-ghost btn-xs" style="margin-left:auto" data-act="tReset">← Alla verktyg</button>` : '';
  const warn = !S.cfg.apiKey ? `<div class="key-warn">🔑 Bu araçlar AI kullanır — ⚙️ Ayarlar'dan API anahtarı ekle.
    <button class="btn-ghost btn-xs" data-act="openSettings">Anahtar ekle</button></div>` : '';
  return `<div class="fade-in">
    <div class="section-head"><h2>🛠️ Verktyg</h2><span class="badge" style="background:var(--green)">Yrkessvenska</span>${back}</div>
    ${warn}${inner}</div>`;
};

Tools.renderHub = function () {
  const cards = TOOLS.map(t => `<button class="exam-card" data-act="tOpen" data-id="${t.id}" style="border-left:4px solid ${t.color}">
    <div class="ec-top"><span class="ec-icon">${t.icon}</span><span class="ec-title">${esc(t.name)}</span></div>
    <div class="ec-desc">${esc(t.desc)}</div></button>`).join('');
  const recent = LS.get('sh_tool_history', []).slice(-5).reverse();
  return `<div class="exam-hub">
    <div class="panel"><div class="panel-title">Ne işe yarar?</div>
      <div class="panel-hint">Bunlar dil alıştırması değil — <b>işini gördüren araçlar</b>. Notunu Türkçe, İngilizce ya da karışık yazarsın; araç sana kopyalayıp kullanabileceğin profesyonel İsveççe metni verir. Her çıktının altında hangi terimi neden seçtiğini anlatan Türkçe not da olur, böylece kullanırken öğrenirsin.</div></div>
    <div class="exam-card-grid">${cards}</div>
    ${recent.length ? `<div class="panel"><div class="panel-title">Son çıktıların</div>
      <div class="res-list">${recent.map(r => `<div class="res-row" data-act="tOpenHist" data-id="${r.id}">
        <span class="res-band" style="background:var(--green);font-size:16px">${esc(r.icon)}</span>
        <div class="res-mid"><div class="res-sec">${esc(r.name)}</div>
          <div class="res-task">${esc(String(r.preview || '').slice(0, 80))}</div></div>
        <span class="res-date">${new Date(r.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}</span></div>`).join('')}</div></div>` : ''}
    <div class="panel"><div class="panel-title">⚠️ Sorumluluk</div>
      <div class="panel-hint">Çıktılar <b>dil taslağıdır</b>, klinik karar değildir. Tıbbi içeriğin, dozun ve endikasyonun doğruluğundan sen sorumlusun — kullanmadan önce oku ve gerekiyorsa düzelt. Doz aracı hesabı ve kullandığı referans aralığını açıkça gösterir ki kontrol edebilesin.</div></div>
  </div>`;
};

Tools.renderTool = function (t) {
  if (this.result) return this.renderResult(t, this.result);
  const fields = t.fields.map(f => {
    const v = this.vals[f.id] || '';
    const lbl = `<label class="fld-label" for="tf_${f.id}">${esc(f.label)}${f.req ? ' <span style="color:var(--red)">*</span>' : ''}</label>`;
    if (f.type === 'area') return `${lbl}<textarea class="fld-textarea" id="tf_${f.id}" data-inp="tSet" data-f="${f.id}" rows="${f.rows || 6}" placeholder="${attr(f.ph || '')}">${esc(v)}</textarea>`;
    if (f.type === 'select') return `${lbl}<select class="fld-select" id="tf_${f.id}" data-chg="tSet" data-f="${f.id}">${f.opts.map(o => `<option${v === o ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    return `${lbl}<input class="fld-select" id="tf_${f.id}" data-inp="tSet" data-f="${f.id}" value="${attr(v)}" placeholder="${attr(f.ph || '')}" autocomplete="off">`;
  }).join('');
  return `<div class="task-card" style="border-left-color:${t.color}">
      <div class="task-meta">${t.icon} ${esc(t.name)}</div>
      <div class="case-brief">${esc(t.desc)}</div></div>
    <div class="panel">${fields}
      <div class="btn-row"><button class="btn-primary" data-act="tRun">✨ Skapa utkast</button>
        <button class="btn-ghost" data-act="tClear">✕ Temizle</button></div></div>`;
};

Tools.renderResult = function (t, r) {
  const block = (title, arr, cls) => (arr || []).length
    ? `<div class="panel"><div class="panel-title">${title}</div><ul class="tight-list">${arr.map(x => `<li class="${cls}">${esc(x)}</li>`).join('')}</ul></div>` : '';
  return `<div class="result-wrap">
    ${block('⚠️ Varningar', r.varningar, 'bad')}
    ${r.output ? `<div class="panel" style="border-left:4px solid ${t.color}">
      <div class="panel-title">${t.icon} ${esc(t.name)} — utkast
        <button class="bt" style="margin-left:auto" data-act="tCopy">📋 Kopiera</button>
        <button class="bt" data-act="speak" data-text="${attr(String(r.output).slice(0, 900))}">🔊</button></div>
      <pre class="jdoc-body" id="toolOut">${esc(r.output)}</pre></div>`
      : `<div class="panel"><div class="panel-title">Utkast skapades inte</div>
         <div class="panel-hint">Eksik bilgiler yüzünden taslak yazılmadı — aşağıdaki listeyi tamamlayıp tekrar dene.</div></div>`}
    ${block('❗ Underlaget saknar', r.saknas, 'bad')}
    ${block('📝 Dil notları', r.noter, 'good')}
    <div class="btn-row">
      <button class="btn-primary" data-act="tBack">✏️ Düzenle & tekrar üret</button>
      <button class="btn-ghost" data-act="tReset">← Alla verktyg</button>
      <button class="btn-ghost" data-act="tAsk">💬 AI-läraren'e sor</button></div>
    <p class="flip-hint">⚠️ Bu bir dil taslağıdır. Tıbbi içeriği, dozu ve endikasyonu kullanmadan önce sen doğrula.</p>
  </div>`;
};

Object.assign(ACTIONS, {
  tOpen: (d) => { Tools.cur = TOOLS.find(x => x.id === d.id); Tools.vals = LS.get('sh_tool_vals_' + d.id, {}); Tools.result = null; renderTab('tools'); },
  tOpenHist: (d) => {
    const h = LS.get('sh_tool_history', []).find(x => String(x.id) === String(d.id)); if (!h) return;
    Tools.cur = TOOLS.find(x => x.id === h.tool); Tools.result = h.result; renderTab('tools');
  },
  tReset: () => { Tools.cur = null; Tools.result = null; renderTab('tools'); },
  tBack: () => { Tools.result = null; renderTab('tools'); },
  tClear: () => { Tools.vals = {}; if (Tools.cur) LS.del('sh_tool_vals_' + Tools.cur.id); renderTab('tools'); },
  tSet: (d, el) => { Tools.vals[d.f] = el.value; if (Tools.cur) LS.set('sh_tool_vals_' + Tools.cur.id, Tools.vals); },
  tCopy: () => {
    const el = document.getElementById('toolOut'); if (!el) return;
    navigator.clipboard?.writeText(el.textContent).then(() => showToast('Kopierat ✓', 'success')).catch(() => showToast('Kopyalanamadı', 'error'));
  },
  tRun: async () => {
    const t = Tools.cur; if (!t) return;
    if (!S.cfg.apiKey) { openSettings(); return; }
    const missing = t.fields.filter(f => f.req && !String(Tools.vals[f.id] || '').trim()).map(f => f.label);
    if (missing.length) { showToast('Zorunlu alan eksik: ' + missing.join(', '), 'error'); return; }
    Tools.busy = true; renderTab('tools');
    try {
      const body = t.fields.map(f => {
        const v = String(Tools.vals[f.id] || (f.type === 'select' ? f.opts[0] : '')).trim();
        return v ? `${f.label}: ${v}` : null;
      }).filter(Boolean).join('\n');
      const res = await callJSON(t.system, [{ role: 'user', content: `Användarens yrke: ${S.cfg.profession}.\n\nUNDERLAG:\n"""\n${body}\n"""` }], { maxTokens: 3000 });
      Tools.result = res;
      const hist = LS.get('sh_tool_history', []);
      hist.push({ id: Date.now(), tool: t.id, name: t.name, icon: t.icon, date: new Date().toISOString(), preview: String(res.output || '').slice(0, 120), result: res });
      LS.set('sh_tool_history', hist.slice(-20));
      addXP(15);
      showToast('Utkast klart · +15 XP', 'success');
    } catch (e) { showToast(e.message, 'error'); }
    Tools.busy = false; renderTab('tools');
  },
  tAsk: () => {
    const t = Tools.cur, r = Tools.result; if (!t || !r) return;
    switchTab('chat');
    setTimeout(() => Chat.send(`Şu İsveççe metni birlikte inceleyelim — hangi kalıplar kullanılmış, hangi kelimeleri öğrenmeliyim, daha doğal nasıl söylenirdi?\n\n"""\n${String(r.output || '').slice(0, 1200)}\n"""`), 150);
  },
});
