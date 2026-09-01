// ═══════════════════════════════════════════════════════════
// JOURNALFÖRING — hasta kaydı yazma, okuma ve kısaltmalar
// ═══════════════════════════════════════════════════════════
'use strict';

// ── JOURNALENS DELAR (mall) ──────────────────────────────
const JOURNAL_SECTIONS = [
  { key: 'anamnes', sv: 'Anamnes', tr: 'Öykü', ph: 'Vem söker, för vad, hur länge, förlopp, tidigare sjukdomar, mediciner, allergier…',
    help: 'Kim, ne şikâyetiyle, ne zamandır. Kronolojik ol. Hastanın/sahibin sözünü aktarırken "uppger", "beskriver", "enligt ägaren" kullan. Kendi yorumunu buraya yazma.' },
  { key: 'status', sv: 'Status', tr: 'Muayene bulguları', ph: 'AT, vitalparametrar, organsystem, lokalstatus…',
    help: 'Sadece gözlemlediklerin. Ölçülen değerleri birimiyle yaz. Normal bulgular için "u.a." (utan anmärkning) kabul edilir ama neyi muayene ettiğini belirt.' },
  { key: 'bedomning', sv: 'Bedömning', tr: 'Değerlendirme', ph: 'Sannolik diagnos, differentialdiagnoser, resonemang…',
    help: 'Anamnez ve statusu bir araya getirdiğin yer. "Sannolikt…", "Misstänker…", "Differentialdiagnostiskt övervägs…" kalıpları kullanılır. Belirsizliği gizleme, yaz.' },
  { key: 'atgard', sv: 'Åtgärd / Plan', tr: 'Yapılanlar ve plan', ph: 'Utförda åtgärder, ordinationer med dos, provtagning, information, uppföljning…',
    help: 'Ne yaptın, ne reçete ettin (ilaç + doz + yol + süre), hastayı/sahibi neyle bilgilendirdin, ne zaman kontrol. Belirsiz doz = hasta güvenliği riski.' },
];

// ── FALLBANK ─────────────────────────────────────────────
const JOURNAL_CASES = [
  { id: 'v1', field: 'vet', level: 'B1', title: 'Akut kräkning — hund',
    brief: 'Hund, blandras, tik, 4 år, 18 kg. Ägaren söker akut.',
    facts: [
      'Kräkningar sedan i går kväll, sammanlagt fyra gånger, senast för två timmar sedan. Inget blod.',
      'Har inte ätit sedan i morse men dricker vatten.',
      'Var på skogspromenad i förrgår, ägaren såg henne tugga på något.',
      'Vaccinerad, avmaskad för två månader sedan. Inga mediciner. Ingen känd allergi.',
      'Status: TPR 38,9 °C / puls 104 / andningsfrekvens 24. AT något nedsatt men alert.',
      'Slemhinnor rosa och fuktiga, CRT under 2 sekunder. Bedömd hydreringsgrad normal.',
      'Buk: lätt ömhet mellan tarmslyngorna, inga palpabla resistenser. Tarmljud normala.',
      'Hjärt- och lungauskultation utan anmärkning.',
    ] },
  { id: 'v2', field: 'vet', level: 'B2', title: 'Hälta bakben — hund',
    brief: 'Hund, labrador retriever, hane, 8 år, 34 kg. Bokat besök.',
    facts: [
      'Ägaren beskriver hälta på höger bakben sedan cirka tre veckor, gradvis försämring.',
      'Värst efter vila och efter långa promenader. Har svårt att hoppa upp i bilen.',
      'Ingen känd skada. Ägaren har gett receptfria tillskott utan effekt.',
      'Tidigare frisk. Övervikt: BCS 7/9.',
      'Status: TPR 38,4 / 88 / 20. AT gott.',
      'Ortopedisk undersökning: grad 2 hälta i skritt på höger bak, tydligare i trav.',
      'Smärtreaktion vid extension av höger höftled. Nedsatt rörelseomfång.',
      'Muskelatrofi höger lår jämfört med vänster, cirka 2 cm omkretsskillnad.',
    ] },
  { id: 'v3', field: 'vet', level: 'C1', title: 'Kronisk njursjukdom — katt',
    brief: 'Katt, huskatt, honkatt, 14 år, 3,2 kg. Återbesök efter provtagning.',
    facts: [
      'Ägaren har noterat ökad törst och urinmängd sedan cirka två månader.',
      'Viktnedgång: vägde 4,1 kg för sex månader sedan.',
      'Aptit ojämn, kräkningar en till två gånger i veckan.',
      'Enbart inomhuskatt. Ingen medicinering.',
      'Status: TPR 38,6 / 180 / 32. Bltr 168 mmHg systoliskt.',
      'Mager, BCS 3/9. Njurar palperas små och oregelbundna.',
      'Labb: krea 320 µmol/L, urea 22 mmol/L, SDMA förhöjd, fosfat lätt förhöjd.',
      'Urin: specifik vikt 1,014, proteinkvot lätt förhöjd (UPC 0,4).',
    ] },
  { id: 'h1', field: 'human', level: 'B1', title: 'Halsont — vårdcentral',
    brief: 'Kvinna 28 år. Söker på vårdcentral, drop-in.',
    facts: [
      'Ont i halsen sedan tre dagar, tilltagande. Svårt att svälja.',
      'Feber upp till 38,7 °C hemma. Ingen hosta, ingen snuva.',
      'Ingen andningspåverkan. Har tagit paracetamol med viss effekt.',
      'Tidigare frisk. Inga mediciner. Penicillinallergi förnekas.',
      'Status: AT gott, opåverkad i vila. Temp 38,2 °C. Bltr 118/74, puls 92.',
      'Svalg: kraftigt rodnade tonsiller med beläggningar bilateralt.',
      'Ömma och förstorade lymfkörtlar i käkvinklarna.',
      'Lungor auskulteras utan anmärkning. Centor 4 poäng. Snabbtest strep A positivt.',
    ] },
  { id: 'h2', field: 'human', level: 'B2', title: 'Bröstsmärta — akutmottagning',
    brief: 'Man 61 år. Inkommer med ambulans till akutmottagningen.',
    facts: [
      'Central bröstsmärta som debuterade i vila för 90 minuter sedan, molande, utstrålning vänster arm.',
      'Åtföljd av kallsvettning och illamående. Ingen dyspné i vila.',
      'Hypertoni sedan tio år, behandlad med enalapril. Röker 15 cigaretter dagligen.',
      'Fadern hjärtinfarkt vid 58 års ålder.',
      'Status: AT påverkad, blek och kallsvettig. Bltr 148/92, puls 96 regelbunden, saturation 96 % på luft, andningsfrekvens 20, temp 36,8.',
      'Hjärta: regelbunden rytm, inga biljud. Lungor: normala andningsljud bilateralt.',
      'EKG: ST-höjning 2 mm i II, III och aVF.',
      'Troponin taget vid ankomst, svar avvaktas.',
    ] },
  { id: 'h3', field: 'human', level: 'C1', title: 'Trötthet & viktnedgång — utredning',
    brief: 'Kvinna 54 år. Bokat läkarbesök på vårdcentral.',
    facts: [
      'Tilltagande trötthet sedan tre månader. Orkar inte längre med sitt arbete som undersköterska.',
      'Ofrivillig viktnedgång 5 kg på fyra månader utan ändrade vanor.',
      'Nattliga svettningar senaste månaden. Ingen feber.',
      'Röker 10 cigaretter dagligen sedan 30 år. Alkohol sällan.',
      'Behandlas med levotyroxin för hypotyreos sedan tio år, senaste TSH normalt.',
      'Status: AT något blek, opåverkad. Bltr 138/84, puls 82, temp 36,9.',
      'Ingen palpabel lymfkörtelförstoring i hals, axiller eller ljumskar. Buk mjuk och oöm, ingen organförstoring.',
      'Labb: Hb 98 g/L, MCV 76 fL, ferritin 8 µg/L, CRP 12, LPK och TPK normala. F-Hb positivt.',
    ] },
];

// ── FÖRKORTNINGAR ────────────────────────────────────────
// OBS: Förkortningar varierar mellan arbetsplatser. Socialstyrelsen avråder
// från tvetydiga förkortningar i journal — skriv ut vid minsta osäkerhet.
const ABBREV = [
  { a: 'u.a.', full: 'utan anmärkning', tr: 'anormallik yok', cat: 'status' },
  { a: 'AT', full: 'allmäntillstånd', tr: 'genel durum', cat: 'status' },
  { a: 'bltr', full: 'blodtryck', tr: 'kan basıncı', cat: 'status' },
  { a: 'TPR', full: 'temperatur, puls, respiration', tr: 'ateş–nabız–solunum', cat: 'vet' },
  { a: 'AF', full: 'andningsfrekvens', tr: 'solunum sayısı', cat: 'status' },
  { a: 'sat', full: 'saturation (syremättnad)', tr: 'oksijen satürasyonu', cat: 'status' },
  { a: 'CRT', full: 'kapillär återfyllnadstid', tr: 'kapiller dolum zamanı', cat: 'vet' },
  { a: 'BCS', full: 'body condition score', tr: 'vücut kondisyon skoru', cat: 'vet' },
  { a: 'pat', full: 'patient', tr: 'hasta', cat: 'allmän' },
  { a: 'anamn', full: 'anamnes', tr: 'öykü', cat: 'allmän' },
  { a: 'dx', full: 'diagnos', tr: 'tanı', cat: 'allmän' },
  { a: 'ddx', full: 'differentialdiagnos', tr: 'ayırıcı tanı', cat: 'allmän' },
  { a: 'ssk', full: 'sjuksköterska', tr: 'hemşire', cat: 'allmän' },
  { a: 'usk', full: 'undersköterska', tr: 'sağlık teknisyeni', cat: 'allmän' },
  { a: 'VC', full: 'vårdcentral', tr: 'aile sağlığı merkezi', cat: 'allmän' },
  { a: 'IVA', full: 'intensivvårdsavdelning', tr: 'yoğun bakım', cat: 'allmän' },
  { a: 'AVA', full: 'akutvårdsavdelning', tr: 'acil gözlem servisi', cat: 'allmän' },
  { a: 'avd', full: 'avdelning', tr: 'servis', cat: 'allmän' },
  { a: 'op', full: 'operation / opererad', tr: 'ameliyat', cat: 'allmän' },
  { a: 'postop', full: 'postoperativt', tr: 'ameliyat sonrası', cat: 'allmän' },
  { a: 'preop', full: 'preoperativt', tr: 'ameliyat öncesi', cat: 'allmän' },
  { a: 'KAD', full: 'kvarliggande kateter (urinkateter)', tr: 'kalıcı idrar sondası', cat: 'allmän' },
  { a: 'PVK', full: 'perifer venkateter', tr: 'periferik damar yolu', cat: 'allmän' },
  { a: 'ADL', full: 'aktiviteter i dagliga livet', tr: 'günlük yaşam aktiviteleri', cat: 'allmän' },
  { a: 'lkm', full: 'läkemedel', tr: 'ilaç', cat: 'läkemedel' },
  { a: 'inj', full: 'injektion', tr: 'enjeksiyon', cat: 'läkemedel' },
  { a: 'tabl', full: 'tablett', tr: 'tablet', cat: 'läkemedel' },
  { a: 'supp', full: 'suppositorium', tr: 'fitil', cat: 'läkemedel' },
  { a: 'po', full: 'per os (via munnen)', tr: 'ağız yoluyla', cat: 'läkemedel' },
  { a: 'iv', full: 'intravenöst', tr: 'damar içi', cat: 'läkemedel' },
  { a: 'im', full: 'intramuskulärt', tr: 'kas içi', cat: 'läkemedel' },
  { a: 'sc', full: 'subkutant', tr: 'deri altı', cat: 'läkemedel' },
  { a: 'vb', full: 'vid behov', tr: 'gerektiğinde', cat: 'läkemedel' },
  { a: 'x1 / x2 / x3', full: 'antal gånger per dygn', tr: 'günde 1/2/3 kez', cat: 'läkemedel' },
  { a: 'tn', full: 'till natten', tr: 'geceleri', cat: 'läkemedel' },
  { a: 'Hb', full: 'hemoglobin', tr: 'hemoglobin', cat: 'labb' },
  { a: 'LPK', full: 'leukocytpartikelkoncentration (vita blodkroppar)', tr: 'lökosit sayısı', cat: 'labb' },
  { a: 'TPK', full: 'trombocytpartikelkoncentration', tr: 'trombosit sayısı', cat: 'labb' },
  { a: 'CRP', full: 'C-reaktivt protein', tr: 'CRP', cat: 'labb' },
  { a: 'SR', full: 'sänkningsreaktion', tr: 'sedimentasyon', cat: 'labb' },
  { a: 'krea', full: 'kreatinin', tr: 'kreatinin', cat: 'labb' },
  { a: 'ALAT / ASAT', full: 'levertransaminaser', tr: 'karaciğer enzimleri', cat: 'labb' },
  { a: 'TSH', full: 'tyreoideastimulerande hormon', tr: 'TSH', cat: 'labb' },
  { a: 'MCV', full: 'medelcellvolym (erytrocyter)', tr: 'ortalama eritrosit hacmi', cat: 'labb' },
  { a: 'SDMA', full: 'symmetriskt dimetylarginin (njurmarkör hos djur)', tr: 'böbrek belirteci (veteriner)', cat: 'vet' },
  { a: 'UPC', full: 'urin protein/kreatinin-kvot', tr: 'idrar protein/kreatinin oranı', cat: 'vet' },
  { a: 'rtg', full: 'röntgen', tr: 'röntgen', cat: 'undersökning' },
  { a: 'DT', full: 'datortomografi', tr: 'bilgisayarlı tomografi', cat: 'undersökning' },
  { a: 'MR', full: 'magnetresonanstomografi', tr: 'MR', cat: 'undersökning' },
  { a: 'UL', full: 'ultraljud', tr: 'ultrason', cat: 'undersökning' },
  { a: 'EKG', full: 'elektrokardiogram', tr: 'EKG', cat: 'undersökning' },
  { a: 'ausk', full: 'auskultation', tr: 'oskültasyon', cat: 'undersökning' },
  { a: 'palp', full: 'palpation', tr: 'palpasyon', cat: 'undersökning' },
  { a: 'PAD', full: 'patologisk anatomisk diagnos', tr: 'patoloji tanısı', cat: 'undersökning' },
  { a: 'pu/pd', full: 'polyuri / polydipsi', tr: 'çok idrar / çok su içme', cat: 'vet' },
  { a: 'vacc', full: 'vaccinerad / vaccination', tr: 'aşılı / aşılama', cat: 'vet' },
  { a: 'kast', full: 'kastrerad', tr: 'kısırlaştırılmış', cat: 'vet' },
  { a: 'ID', full: 'ID-märkt (chip)', tr: 'çipli / kimliklendirilmiş', cat: 'vet' },
  { a: 'ua bilat', full: 'utan anmärkning bilateralt', tr: 'iki tarafta da normal', cat: 'status' },
  { a: 'ev', full: 'eventuellt', tr: 'muhtemelen, gerekirse', cat: 'allmän' },
  { a: 'ffa', full: 'framför allt', tr: 'özellikle', cat: 'allmän' },
  { a: 'pga', full: 'på grund av', tr: 'nedeniyle', cat: 'allmän' },
  { a: 'tom / fom', full: 'till och med / från och med', tr: 'dahil olmak üzere / itibaren', cat: 'allmän' },
  { a: 'ca', full: 'cirka', tr: 'yaklaşık', cat: 'allmän' },
];

const ABBREV_CATS = { all: 'Alla', allmän: 'Allmänt', status: 'Status', labb: 'Labb', 'läkemedel': 'Läkemedel', 'undersökning': 'Undersökning', vet: 'Veterinär' };

// ── PROMPTAR ─────────────────────────────────────────────
const JOURNAL_EVAL_PROMPT = `Du är erfaren handledare i journalföring på ett svenskt sjukhus/djursjukhus och bedömer enligt Socialstyrelsens krav på medicinsk svenska (C1) samt god dokumentationssed.

Öğrenci Türk. GERİ BİLDİRİMİ TÜRKÇE yaz; İsveççe düzeltmeler ve model metin İSVEÇÇE olsun.

BEDÖM STRÄNGT och patientsäkerhetsinriktat:
- Innehåll: har eleven fått med det som är kliniskt relevant ur fallet? Saknas något viktigt (allergi, medicinering, vitalparametrar, dos, uppföljning) är det ett allvarligt fel.
- Struktur: rätt information under rätt rubrik. Bedömning i Anamnes eller status i Bedömning är strukturfel.
- Fackspråk: korrekt terminologi och korrekta, entydiga förkortningar. Felaktig eller påhittad term ska påpekas hårt.
- Objektivitet: Anamnes ska referera vad patienten/ägaren uppger ("uppger", "beskriver", "enligt ägaren"); Status ska bara innehålla observationer.
- Patientsäkerhet: otydlig dos, saknad enhet, saknad sida (höger/vänster), otydligt ansvar eller vag uppföljning = säkerhetsbrist. Lista dessa separat.
- Koncis stil: journalsvenska är kortfattad, ofta utan personliga pronomen och med passiv form ("provtagning utfördes"). Onödigt pratig text ska påpekas.

SVARA ENDAST med denna JSON:
{
  "verdict": "Godkänd | Godkänd med anmärkning | Ej godkänd ännu",
  "score": 72,
  "cefr": "B1|B2|C1|C2",
  "sections": [
    {"key":"Anamnes","score":75,"comment":"Türkçe 2-3 cümle: ne iyi, ne eksik, somut örnekle"}
  ],
  "missing": ["Fallet innehöll X men det saknas i journalen — Türkçe açıklama"],
  "safety": ["Patient/djursäkerhetsrisk: ... — Türkçe açıklama, neden riskli"],
  "terminology": [{"wrong":"elevens term","right":"korrekt svensk fackterm","why":"Türkçe açıklama"}],
  "errors": [{"original":"hatalı İsveççe parça","corrected":"düzeltilmiş hâli","type":"ordföljd|genus|verbform|preposition|ordval|stil|terminologi","why":"Türkçe açıklama"}],
  "styleTips": ["Türkçe: journal üslubuna dair somut öneri"],
  "modelJournal": "Aynı fall için örnek bir journal — İSVEÇÇE, rubrikleriyle (Anamnes:/Status:/Bedömning:/Åtgärd:), kısa ve profesyonel.",
  "nextStep": "Bir sonraki journalda odaklanacağı TEK şey (Türkçe, tek cümle)."
}
sections dizisinde öğrencinin doldurduğu her bölüm olmalı. missing/safety/terminology boş olabilir ama alan mutlaka bulunmalı.`;

const JOURNAL_READ_PROMPT = `Du skapar läsförståelseövningar av autentiskt utformade svenska journalanteckningar.

REGLER
- Skriv EN realistisk journalanteckning i den begärda kontexten, med rubrikerna Anamnes, Status, Bedömning och Åtgärd.
- Använd äkta journalstil: kortfattad, telegrafisk, passiv form, vedertagna förkortningar (u.a., AT, bltr, po, iv, vb, x2, CRP, Hb…). Minst 6 förkortningar ska förekomma.
- Längd 180–260 ord. Anpassa svårighet till begärd nivå.
- Skapa 8 frågor: 3 st innehållsförståelse (flerval, 4 alternativ), 3 st "vad betyder förkortningen X?" (öppet svar — exakt utskriven form), 2 st kliniskt resonemang (flerval, 4 alternativ) — t.ex. vad som talar för en viss bedömning eller vad som saknas i anteckningen.
- I "why" förklarar du kort PÅ TURKISKA var i texten svaret finns.

SVARA ENDAST med denna JSON:
{
  "title":"Rubrik, t.ex. Journalanteckning — akutmottagning",
  "context":"Türkçe tek cümle: neyi okuyacaksın",
  "text":"Hela journalanteckningen med rubriker och radbrytningar (\\n)",
  "questions":[
    {"n":1,"type":"mcq","q":"Fråga på svenska","o":["A","B","C","D"],"a":"A","why":"Türkçe açıklama"},
    {"n":4,"type":"abbr","q":"Vad betyder förkortningen \\"u.a.\\" i texten?","o":[],"a":"utan anmärkning","why":"Türkçe açıklama"}
  ],
  "glossary":[{"sv":"ord ur texten","tr":"Türkçe","form":"böjning","uttal":"telaffuz","ex":"mening ur texten"}]
}`;

const CASE_GEN_PROMPT = `Du är handledare som skapar fall för journalträning.
Skapa ETT realistiskt fall inom det begärda området och på den begärda nivån. Fallet ska ge råmaterial — INTE en färdig journal.

SVARA ENDAST med denna JSON:
{"title":"Kort falltitel på svenska","brief":"En rad: vem/vilket djur, ålder, kön, vikt, hur hen söker","facts":["8-10 punkter med anamnes- och statusuppgifter i blandad ordning, precis som verkligheten ger dem"],"level":"B1|B2|C1","field":"vet|human"}`;

// ═══════════════════════════════════════════════════════════
// MODUL
// ═══════════════════════════════════════════════════════════
const Journal = {
  sub: 'hub',            // hub | write | read | abbrev | mall
  busy: false, busyMsg: '',
  wCase: null, wText: {}, wResult: null,
  rSet: null, rAns: {}, rResult: null, rField: 'vet', rLevel: 'B2',
  aSearch: '', aCat: 'all',
  fieldFilter: 'alla',
};
window.Journal = Journal;

const jResults = () => LS.get('sh_journal_results', []);
function saveJournalResult(r) {
  const list = jResults();
  list.push(Object.assign({ id: Date.now(), date: new Date().toISOString() }, r));
  LS.set('sh_journal_results', list.slice(-60));
  checkBadges();
}

Journal.render = function () {
  if (this.busy) return this.shell(`<div class="ai-loading"><div class="ai-loading-dots"><span></span><span></span><span></span></div><span>${esc(this.busyMsg)}</span></div>`);
  switch (this.sub) {
    case 'write': return this.shell(this.renderWrite());
    case 'read': return this.shell(this.renderRead());
    case 'abbrev': return this.shell(this.renderAbbrev());
    case 'mall': return this.shell(this.renderMall());
    default: return this.shell(this.renderHub());
  }
};

Journal.shell = function (inner) {
  const tabs = [['hub', '🏠 Översikt'], ['write', '✍️ Skriva'], ['read', '📖 Läsa'], ['abbrev', '🔤 Förkortningar'], ['mall', '📐 Mallar']]
    .map(([k, l]) => `<button class="exam-tab ${this.sub === k ? 'active' : ''}" data-act="jSub" data-s="${k}">${l}</button>`).join('');
  const warn = !S.cfg.apiKey ? `<div class="key-warn">🔑 AI değerlendirmesi ve metin üretimi için API anahtarı gerekli — kısaltmalar ve mallar anahtarsız da çalışır.
    <button class="btn-ghost btn-xs" data-act="openSettings">Anahtar ekle</button></div>` : '';
  return `<div class="fade-in">
    <div class="section-head"><h2>📋 Journalföring</h2><span class="badge" style="background:var(--red)">Medicinsk svenska</span></div>
    <div class="exam-tabs">${tabs}</div>${warn}${inner}</div>`;
};

Journal.afterRender = function () {
  JOURNAL_SECTIONS.forEach(s => {
    const ta = document.getElementById('jsec_' + s.key);
    if (ta) ta.addEventListener('input', () => { Journal.wText[s.key] = ta.value; updateJWords(); });
  });
  updateJWords();
};

function jTotalWords() {
  return JOURNAL_SECTIONS.reduce((n, s) => n + ((Journal.wText[s.key] || '').trim().match(/\S+/g) || []).length, 0);
}
function updateJWords() {
  const el = document.getElementById('jWordCount');
  if (el) { const n = jTotalWords(); el.textContent = `${n} ord`; el.className = 'w-count ' + (n >= 120 ? 'ok' : n >= 60 ? 'near' : 'low'); }
}

// ── ÖVERSIKT ─────────────────────────────────────────────
Journal.renderHub = function () {
  const rs = jResults();
  const avg = rs.length ? Math.round(rs.reduce((s, r) => s + (r.score || 0), 0) / rs.length) : 0;
  const last = rs.slice(-8);
  const trend = last.length ? `<div class="trend-chart">${last.map(r => `<div class="trend-col" title="${esc(r.caseTitle || '')} · ${r.score}/100">
    <div class="trend-bar" style="height:${Math.max(6, r.score)}%;background:${r.score >= 75 ? 'var(--green)' : r.score >= 55 ? 'var(--gold)' : 'var(--red)'}"></div>
    <span class="trend-lbl">${r.score}</span></div>`).join('')}</div>` : '';

  const cards = [
    { k: 'write', icon: '✍️', title: 'Skriva journal', color: 'var(--red)', desc: 'Bir fall al, Anamnes / Status / Bedömning / Åtgärd bölümlerini doldur. AI hem dilini hem yapısını değerlendirir, eksik ve hasta güvenliği risklerini listeler, örnek journal verir.' },
    { k: 'read', icon: '📖', title: 'Läsa journal', color: 'var(--teal)', desc: 'AI gerçekçi bir journal metni üretir. Anlama soruları, kısaltma açma ve klinik akıl yürütme soruları ile test edersin.' },
    { k: 'abbrev', icon: '🔤', title: 'Förkortningar', color: 'var(--blue)', desc: `${ABBREV.length} yaygın kısaltma — arama, kategori filtresi, tek tıkla ordbanken'e ekleme.` },
    { k: 'mall', icon: '📐', title: 'Mallar & fraser', color: 'var(--purple)', desc: 'Her bölümün altına ne yazılır, hangi kalıplar kullanılır, SBAR ve epikris yapısı.' },
  ].map(c => `<button class="exam-card" data-act="jSub" data-s="${c.k}" style="border-left:4px solid ${c.color}">
    <div class="ec-top"><span class="ec-icon">${c.icon}</span><span class="ec-title">${c.title}</span></div>
    <div class="ec-desc">${esc(c.desc)}</div></button>`).join('');

  return `<div class="exam-hub">
    <div class="hub-banner">
      <div><div class="hub-band">${rs.length ? avg : '—'}</div><div class="hub-band-lbl">Ortalama puan (${rs.length} journal)</div></div>
      <div class="hub-target"><div class="hub-target-num">${rs.length ? (rs[rs.length - 1].verdict || '—') : '—'}</div><div class="hub-band-lbl">Son sonuç</div></div>
    </div>
    ${trend ? `<div class="panel"><div class="panel-title">📈 Son journaller</div>${trend}</div>` : ''}
    <div class="exam-card-grid">${cards}</div>
    <div class="panel"><div class="panel-title">Neden önemli?</div>
      <div class="panel-hint">İsveç'te journalföring yasal bir yükümlülüktür (patientdatalagen; hayvanlarda Jordbruksverket'in föreskrifter'i). Socialstyrelsen'in mesleki dil beklentisi de büyük ölçüde bu metinler üzerinden ölçülür: bir meslektaşın senin notunu okuyup <b>hiçbir şey sormadan</b> devam edebilmesi gerekir. Bu modül tam olarak bunu çalıştırır.</div>
      <div class="panel-hint" style="margin-top:10px">⚠️ Buradaki geri bildirim bir AI tahminidir ve gerçek denetim ya da sınav sonucu yerine geçmez. Kısaltmalar iş yerine göre değişebilir — kuşkuda kısaltma yerine kelimeyi açık yaz.</div></div>
  </div>`;
};

// ── SKRIVA ───────────────────────────────────────────────
Journal.renderWrite = function () {
  if (this.wResult) return this.renderWriteResult(this.wResult);

  if (!this.wCase) {
    const ff = this.fieldFilter;
    const cases = JOURNAL_CASES.filter(c => ff === 'alla' || c.field === ff);
    const list = cases.map(c => `<button class="opt-card" data-act="jPick" data-id="${c.id}">
      <b>${c.field === 'vet' ? '🐾' : '🏥'} ${esc(c.title)}</b>
      <span>${esc(c.brief)}</span>
      <span class="case-level">${esc(c.level)}</span></button>`).join('');
    return `<div class="seg-row">
        ${[['alla', 'Alla fall'], ['vet', '🐾 Veterinär'], ['human', '🏥 Human']].map(([k, l]) =>
          `<button class="seg-btn ${ff === k ? 'active' : ''}" data-act="jField" data-f="${k}">${l}</button>`).join('')}
      </div>
      <div class="panel"><div class="panel-title">Välj ett fall</div>
        <div class="panel-hint">Fall ham veri verir — anamnez ve status bilgileri karışık sırada. Senin işin bunları doğru başlıklar altında, journal üslubuyla düzenlemek.</div>
        <div class="opt-grid" style="margin-top:12px">${list}</div>
        <div class="btn-row"><button class="btn-ghost" data-act="jGenCase">✨ AI'dan yeni fall üret</button></div>
      </div>`;
  }

  const c = this.wCase;
  const secs = JOURNAL_SECTIONS.map(s => `<div class="jsec">
    <div class="jsec-head"><b>${s.sv}</b><span>${s.tr}</span>
      <button class="bt" data-act="jHelp" data-k="${s.key}">? ne yazılır</button></div>
    <div class="jsec-help hidden" id="jhelp_${s.key}">${esc(s.help)}</div>
    <textarea class="jsec-input" id="jsec_${s.key}" placeholder="${attr(s.ph)}">${esc(this.wText[s.key] || '')}</textarea>
  </div>`).join('');

  return `<div class="case-card">
      <div class="task-meta">${c.field === 'vet' ? '🐾 Veterinärmedicin' : '🏥 Humanmedicin'} · ${esc(c.level)}</div>
      <div class="task-q">${esc(c.title)}</div>
      <div class="case-brief">${esc(c.brief)}</div>
      <ul class="case-facts">${c.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
      <div class="task-actions">
        <button class="btn-ghost btn-xs" data-act="jReset">🎲 Annat fall</button>
        <button class="btn-ghost btn-xs" data-act="speak" data-text="${attr(c.facts.join('. '))}">🔊 Läs upp</button>
      </div>
    </div>
    <div class="editor-bar"><div class="timer-box"><b style="font-size:13px">Skriv journalen</b></div>
      <div class="wc-box"><span id="jWordCount" class="w-count low">0 ord</span><span class="w-hint">hedef: 120+ ord</span></div></div>
    <div class="jsec-wrap">${secs}</div>
    <div class="btn-row">
      <button class="btn-primary" data-act="jSubmit">📊 Låt handledaren bedöma</button>
      <button class="btn-ghost" data-act="jSaveDraft">💾 Spara utkast</button>
      <button class="btn-ghost" data-act="jReset">✕ Avbryt</button>
    </div>
    <p class="flip-hint">İpucu: Anamnez'de "uppger / beskriver / enligt ägaren" kullan. Status'ta sadece gözlem. Åtgärd'de doz + yol + süre eksiksiz olsun.</p>`;
};

Journal.renderWriteResult = function (r) {
  const col = r.score >= 75 ? 'var(--green)' : r.score >= 55 ? 'var(--gold)' : 'var(--red)';
  const secs = (r.sections || []).map(s => `<div class="crit-band">
    <div class="cb-head"><span>${esc(s.key)}</span><b style="color:${s.score >= 75 ? 'var(--green)' : s.score >= 55 ? 'var(--gold)' : 'var(--red)'}">${s.score}</b></div>
    <div class="cb-track"><div class="cb-fill" style="width:${Math.max(0, Math.min(100, s.score))}%;background:${s.score >= 75 ? 'var(--green)' : s.score >= 55 ? 'var(--gold)' : 'var(--red)'}"></div></div>
    <div class="cb-comment">${esc(s.comment)}</div></div>`).join('');

  const block = (title, arr, cls) => (arr || []).length
    ? `<div class="panel"><div class="panel-title">${title}</div><ul class="tight-list">${arr.map(x => `<li class="${cls}">${esc(x)}</li>`).join('')}</ul></div>` : '';

  const term = (r.terminology || []).length ? `<div class="panel"><div class="panel-title">🔤 Terminoloji düzeltmeleri</div>
    <div class="err-list">${r.terminology.map(t => `<div class="err-row">
      <div class="err-old">${esc(t.wrong)}</div><div class="err-new">${esc(t.right)}</div>
      <div class="err-why">${esc(t.why)}</div></div>`).join('')}</div></div>` : '';

  const errs = (r.errors || []).length ? `<div class="panel"><div class="panel-title">✏️ Dil hataları</div>
    <div class="err-list">${r.errors.map(e => `<div class="err-row">
      <div class="err-old">${esc(e.original)}</div><div class="err-new">${esc(e.corrected)}
        <button class="bt" data-act="speak" data-text="${attr(e.corrected)}">🔊</button></div>
      <div class="err-why">${pill('var(--dim)', e.type || 'språk', true)} ${esc(e.why || '')}</div></div>`).join('')}</div></div>` : '';

  return `<div class="result-wrap">
    <div class="band-hero" style="border-color:${col}">
      <div class="band-big" style="color:${col}">${r.score}</div>
      <div><div class="band-lbl">${esc(r.verdict || '')}</div>
        <div class="band-sub">${esc(r.caseTitle || '')} · tahmini dil seviyesi ${esc(r.cefr || '—')} · 100 üzerinden</div></div>
    </div>
    <div class="crit-grid">${secs}</div>
    ${r.nextStep ? `<div class="next-step">🎯 <b>Sıradaki odağın:</b> ${esc(r.nextStep)}</div>` : ''}
    ${block('⚠️ Hasta/hayvan güvenliği riskleri', r.safety, 'bad')}
    ${block('❗ Eksik kalan bilgiler', r.missing, 'bad')}
    ${term}${errs}
    ${block('✒️ Journal üslubu önerileri', r.styleTips, 'good')}
    ${r.modelJournal ? `<div class="panel"><div class="panel-title">💎 Örnek journal (handledarens version)</div>
      <div class="model-text">${esc(r.modelJournal)}</div>
      <button class="btn-ghost btn-xs" data-act="speak" data-text="${attr(r.modelJournal)}">🔊 Lyssna</button></div>` : ''}
    <div class="btn-row">
      <button class="btn-primary" data-act="jReset">🔄 Nytt fall</button>
      <button class="btn-ghost" data-act="jSub" data-s="hub">📈 Översikt</button>
      <button class="btn-ghost" data-act="jAskTeacher">💬 Fråga AI-läraren</button>
    </div></div>`;
};

// ── LÄSA ─────────────────────────────────────────────────
Journal.renderRead = function () {
  if (this.rResult) return this.renderReadResult(this.rResult);

  if (!this.rSet) {
    return `<div class="panel"><div class="panel-title">📖 Journalläsning</div>
      <div class="panel-hint">AI gerçek bir İsveç journalı gibi kısa, telegrafik ve kısaltmalı bir metin üretir. Sonra anlama, kısaltma açma ve klinik akıl yürütme soruları gelir.</div>
      <div class="seg-row" style="margin-top:14px">
        ${[['vet', '🐾 Veterinär'], ['human', '🏥 Human']].map(([k, l]) => `<button class="seg-btn ${this.rField === k ? 'active' : ''}" data-act="jrField" data-f="${k}">${l}</button>`).join('')}
      </div>
      <div class="filter-row">
        ${['A2', 'B1', 'B2', 'C1'].map(l => `<button class="filter-chip ${this.rLevel === l ? 'active' : ''}" data-act="jrLevel" data-l="${l}">${l}</button>`).join('')}
      </div>
      <div class="btn-row"><button class="btn-primary" data-act="jrGen">✨ Skapa journal & frågor</button></div></div>`;
  }

  const p = this.rSet;
  const qs = (p.questions || []).map((q, i) => `<div class="rq-item">
    <div class="rq-q"><b>${q.n || i + 1}.</b> ${esc(q.q)} ${q.type === 'abbr' ? '<i class="rq-hint">(skriv ut hela formen)</i>' : ''}</div>
    ${q.type === 'abbr'
      ? `<input class="rq-input" data-inp="jrSet" data-i="${i}" value="${attr(this.rAns[i] || '')}" placeholder="t.ex. utan anmärkning" autocomplete="off">`
      : `<div class="rq-opts">${(q.o || []).map(o => `<button class="rq-opt ${this.rAns[i] === o ? 'sel' : ''}" data-act="jrPick" data-i="${i}" data-v="${attr(o)}">${esc(o)}</button>`).join('')}</div>`}
  </div>`).join('');

  return `<div class="reading-wrap">
    <div class="journal-doc">
      <div class="jdoc-head">${esc(p.title)}</div>
      <div class="jdoc-ctx">${esc(p.context || '')}</div>
      <pre class="jdoc-body">${esc(p.text)}</pre>
      <button class="btn-ghost btn-xs" data-act="speak" data-text="${attr(String(p.text).slice(0, 900))}">🔊 Läs upp</button>
    </div>
    <div class="questions">${qs}</div>
    <div class="btn-row">
      <button class="btn-primary" data-act="jrSubmit">✓ Rätta</button>
      <button class="btn-ghost" data-act="jrReset">✕ Avbryt</button></div></div>`;
};

function normAbbr(s) {
  return String(s || '').toLowerCase().trim().replace(/[.,;:!?()]/g, '').replace(/\s+/g, ' ');
}
function abbrOk(given, correct) {
  const g = normAbbr(given); if (!g) return false;
  return String(correct).split('/').map(normAbbr).some(c => c === g || (c.length > 6 && (c.includes(g) || g.includes(c))));
}

Journal.renderReadResult = function (r) {
  const rows = r.detail.map(d => `<div class="ans-row ${d.ok ? 'ok' : 'no'}">
    <div class="ans-n">${d.n}</div>
    <div class="ans-body"><div class="ans-q">${esc(d.q)}</div>
      <div class="ans-line">Ditt svar: <b>${esc(d.given || '—')}</b>${d.ok ? '' : ` · Rätt: <b class="ans-correct">${esc(d.correct)}</b>`}</div>
      ${d.why ? `<div class="ans-why">${esc(d.why)}</div>` : ''}</div></div>`).join('');
  REG.journal = r.glossary || [];
  const gloss = (r.glossary || []).length ? `<div class="panel"><div class="panel-title">📚 Ord ur journalen</div>
    <div class="vocab-grid">${r.glossary.map((w, i) => vocabCardHTML(w, i, 'journal', 'med')).join('')}</div></div>` : '';
  const col = r.pct >= 75 ? 'var(--green)' : r.pct >= 50 ? 'var(--gold)' : 'var(--red)';

  return `<div class="result-wrap">
    <div class="band-hero" style="border-color:${col}">
      <div class="band-big" style="color:${col}">${r.correct}/${r.total}</div>
      <div><div class="band-lbl">Journalläsning</div><div class="band-sub">${esc(r.title || '')} · ${r.pct} %</div></div></div>
    <div class="panel"><div class="panel-title">Svar & förklaringar</div><div class="ans-list">${rows}</div></div>
    ${gloss}
    ${r.text ? `<details class="panel script-details"><summary>📄 Visa journalen igen</summary><pre class="jdoc-body">${esc(r.text)}</pre></details>` : ''}
    <div class="btn-row"><button class="btn-primary" data-act="jrReset">🔄 Ny journal</button>
      <button class="btn-ghost" data-act="jSub" data-s="abbrev">🔤 Förkortningar</button></div></div>`;
};

// ── FÖRKORTNINGAR ────────────────────────────────────────
Journal.renderAbbrev = function () {
  const s = this.aSearch.toLowerCase();
  const list = ABBREV.filter(x => (this.aCat === 'all' || x.cat === this.aCat) &&
    (!s || x.a.toLowerCase().includes(s) || x.full.toLowerCase().includes(s) || x.tr.toLowerCase().includes(s)));
  const cats = Object.entries(ABBREV_CATS).map(([k, l]) => `<button class="filter-chip ${this.aCat === k ? 'active' : ''}" data-act="jaCat" data-c="${attr(k)}">${esc(l)}</button>`).join('');
  const rows = list.length ? list.map(x => `<div class="abbr-row">
    <div class="abbr-a">${esc(x.a)}</div>
    <div class="abbr-mid"><div class="abbr-full">${esc(x.full)}</div><div class="abbr-tr">${esc(x.tr)}</div></div>
    <div class="abbr-acts">
      <button class="bt" data-act="speak" data-text="${attr(x.full)}">🔊</button>
      <button class="bt ${isSaved(x.full) ? 'saved' : ''}" data-act="jaSave" data-a="${attr(x.a)}">★</button>
    </div></div>`).join('') : '<div class="empty-state"><div class="empty-state-text">Inget hittades.</div></div>';

  return `<div class="panel">
      <div class="panel-title">🔤 Vanliga förkortningar i svenska journaler</div>
      <div class="panel-hint">⚠️ Kısaltmalar iş yerine ve uzmanlık alanına göre değişebilir. Socialstyrelsen çift anlamlı kısaltmalardan kaçınılmasını önerir — en ufak kuşkuda kelimeyi açık yaz.</div>
      <div class="filter-row" style="margin-top:12px">
        <input class="search-input" id="abbrSearch" placeholder="Sök förkortning eller betydelse..." value="${attr(this.aSearch)}" data-inp="jaSearch" autocomplete="off"></div>
      <div class="filter-row">${cats}</div>
      <div class="abbr-list">${rows}</div>
      <div class="panel-hint" style="margin-top:12px">${list.length} / ${ABBREV.length} kısaltma gösteriliyor · ★ ile ordbanken'e ekleyebilirsin.</div>
    </div>`;
};

// ── MALLAR ───────────────────────────────────────────────
Journal.renderMall = function () {
  const secs = JOURNAL_SECTIONS.map(s => `<div class="panel">
    <div class="panel-title">${s.sv} <span style="color:var(--muted);font-weight:500">— ${s.tr}</span></div>
    <div class="panel-hint">${esc(s.help)}</div></div>`).join('');

  const phrases = [
    ['Anamnes', ['Pat söker för …', 'Ägaren uppger att …', 'Debut för … sedan', 'Ingen feber, ingen viktnedgång.', 'Tidigare frisk. Inga mediciner. Ingen känd allergi.', 'Enligt ägaren har djuret …']],
    ['Status', ['AT gott, opåverkad i vila.', 'Bltr 128/82, puls 72 regelbunden, temp 37,1 °C.', 'Hjärta och lungor auskulteras u.a.', 'Buk mjuk och oöm, inga palpabla resistenser.', 'Slemhinnor rosa och fuktiga, CRT < 2 s.', 'Lokalstatus: … cm stort sår på …']],
    ['Bedömning', ['Sannolikt …', 'Misstänker … i första hand.', 'Differentialdiagnostiskt övervägs …', 'Fyndet talar för …', 'Ingen misstanke om … i nuläget.', 'Kliniskt stabil, ingen indikation för inläggning.']],
    ['Åtgärd', ['T. Amoxicillin 500 mg 1x3 po i 7 dagar.', 'Provtagning: blodstatus, CRP, krea.', 'Remiss skickad till …', 'Pat informerad om … och uppmanad att söka åter vid försämring.', 'Återbesök om 10 dagar för suturtagning.', 'Sjukskrivning 50 % i två veckor.']],
  ].map(([k, arr]) => `<div class="panel"><div class="panel-title">Standardfraser — ${k}</div>
    <div class="phrase-list">${arr.map(p => `<div class="phrase-row"><span>${esc(p)}</span>
      <button class="bt" data-act="speak" data-text="${attr(p)}">🔊</button></div>`).join('')}</div></div>`).join('');

  const sbar = `<div class="panel"><div class="panel-title">📞 SBAR — kollegial rapport</div>
    <div class="panel-hint">İsveç sağlık sisteminde meslektaşlar arası devir teslimin standardıdır. Telefonla acil bir durum bildirirken bu sırayı kullan.</div>
    <div class="sbar-list">${SBAR.map(x => `<div class="sbar-row">
      <div class="sbar-k">${x.k}</div>
      <div><div class="sbar-sv">${esc(x.sv)} <span class="sbar-tr">— ${esc(x.tr)}</span></div>
        <div class="sbar-desc">${esc(x.desc)}</div>
        <div class="sbar-ex">${esc(x.ex)}<button class="bt" data-act="speak" data-text="${attr(x.ex.replace(/"/g, ''))}">🔊</button></div></div>
    </div>`).join('')}</div></div>`;

  const epikris = `<div class="panel"><div class="panel-title">📄 Epikris — utskrivningsanteckning</div>
    <div class="crit-list">
      ${[['Inläggningsorsak', 'Neden yatırıldı — tek cümle'],
         ['Vårdförlopp', 'Yatış boyunca ne oldu, hangi tedaviler verildi'],
         ['Undersökningar & svar', 'Yapılan tetkikler ve sonuçları'],
         ['Aktuell medicinering', 'Taburculuktaki ilaç listesi — doz ve süre ile'],
         ['Status vid utskrivning', 'Çıkıştaki durum'],
         ['Uppföljning & ansvar', 'Kim, ne zaman, ne yapacak — en kritik bölüm']]
        .map(([k, d]) => `<div class="crit-row"><b>${k}</b><span>${esc(d)}</span></div>`).join('')}
    </div>
    <div class="panel-hint" style="margin-top:10px">En sık düşülen hata: uppföljning bölümünün belirsiz olması. "Kontroll vid behov" yeterli değil — kim, nerede, ne zaman yazılmalı.</div></div>`;

  const dont = `<div class="panel"><div class="panel-title">🚫 Journalda kaçınılması gerekenler</div>
    <ul class="tight-list">
      <li class="bad">Değer yargısı ve etiketleme ("besvärlig patient", "ovillig ägare") — sadece davranışı nesnel betimle.</li>
      <li class="bad">Belirsiz doz ya da birimsiz sayı ("2 tabletter" — hangi güçte?).</li>
      <li class="bad">Taraf belirtmemek (höger / vänster) — ameliyat ve yara kayıtlarında zorunlu.</li>
      <li class="bad">Çift anlamlı kısaltma (ör. "MS", "PC") — açık yaz.</li>
      <li class="bad">Bedömning'i Anamnes'in içine karıştırmak.</li>
      <li class="bad">Kopyala-yapıştır ile eski notu güncellemeden taşımak.</li>
    </ul></div>`;

  return `<div class="panel"><div class="panel-title">📐 Journalens fyra delar</div>
      <div class="panel-hint">İsveç'te standart yapı budur. Her bilginin doğru başlık altında olması, dilin doğruluğu kadar önemlidir.</div></div>
    ${secs}${phrases}${sbar}${epikris}${dont}`;
};

// ═══════════════════════════════════════════════════════════
// AKSİYONLAR
// ═══════════════════════════════════════════════════════════
Object.assign(ACTIONS, {
  jSub: (d) => { TTS.stop(); Journal.sub = d.s; renderTab('journal'); },
  jField: (d) => { Journal.fieldFilter = d.f; renderTab('journal'); },
  jHelp: (d) => { document.getElementById('jhelp_' + d.k)?.classList.toggle('hidden'); },
  jPick: (d) => {
    const c = JOURNAL_CASES.find(x => x.id === d.id); if (!c) return;
    Journal.wCase = c; Journal.wResult = null;
    Journal.wText = LS.get('sh_jdraft_' + c.id, {});
    renderTab('journal');
  },
  jReset: () => { Journal.wCase = null; Journal.wText = {}; Journal.wResult = null; renderTab('journal'); },
  jSaveDraft: () => {
    if (!Journal.wCase) return;
    LS.set('sh_jdraft_' + Journal.wCase.id, Journal.wText);
    showToast('Utkast sparat', 'success');
  },
  jGenCase: async () => {
    if (!S.cfg.apiKey) { openSettings(); return; }
    Journal.busy = true; Journal.busyMsg = 'AI yeni bir fall yazıyor...'; renderTab('journal');
    try {
      const field = Journal.fieldFilter === 'human' ? 'human' : Journal.fieldFilter === 'vet' ? 'vet' : (Math.random() < 0.5 ? 'vet' : 'human');
      const c = await callJSON(CASE_GEN_PROMPT, [{ role: 'user', content: `Område: ${field === 'vet' ? 'veterinärmedicin' : 'humanmedicin'}. Nivå: ${S.cfg.level}. Elevens yrke: ${S.cfg.profession}. Skapa ett fall.` }], { maxTokens: 1200 });
      c.id = 'ai' + Date.now(); c.field = c.field || field;
      Journal.wCase = c; Journal.wText = {}; Journal.wResult = null;
    } catch (e) { showToast(e.message, 'error'); }
    Journal.busy = false; renderTab('journal');
  },
  jSubmit: async () => {
    const n = jTotalWords();
    if (n < 30) { showToast('Değerlendirme için en az 30 kelime yaz', 'error'); return; }
    if (!S.cfg.apiKey) { openSettings(); return; }
    const filled = JOURNAL_SECTIONS.filter(s => (Journal.wText[s.key] || '').trim());
    if (filled.length < 2 && !confirm('Sadece ' + filled.length + ' bölüm doldurulmuş. Yine de değerlendirilsin mi?')) return;

    Journal.busy = true; Journal.busyMsg = 'Handledaren journalını okuyor...'; renderTab('journal');
    try {
      const c = Journal.wCase;
      const body = JOURNAL_SECTIONS.map(s => `${s.sv}:\n${(Journal.wText[s.key] || '(tomt)').trim()}`).join('\n\n');
      const res = await callJSON(JOURNAL_EVAL_PROMPT, [{
        role: 'user',
        content: `Elevens CEFR-nivå: ${S.cfg.level}. Yrke: ${S.cfg.profession}.\n\nFALLET (råmaterial som eleven fick):\nTitel: ${c.title}\n${c.brief}\n${(c.facts || []).map(f => '- ' + f).join('\n')}\n\nELEVENS JOURNAL (${n} ord):\n"""\n${body}\n"""`
      }], { maxTokens: 3400 });
      res.caseTitle = c.title; res.caseId = c.id; res.answer = body;
      res.score = Math.max(0, Math.min(100, Number(res.score) || 0));
      Journal.wResult = res; saveJournalResult(res); addXP(30);
      showToast(`Bedömning klar — ${res.score}/100 · +30 XP`, 'success');
    } catch (e) { showToast(e.message, 'error'); }
    Journal.busy = false; renderTab('journal');
  },
  jAskTeacher: () => {
    const r = Journal.wResult; if (!r) return;
    switchTab('chat');
    const weak = (r.sections || []).slice().sort((a, b) => a.score - b.score)[0];
    setTimeout(() => Chat.send(`Journalföring denemem ${r.score}/100 aldı. En zayıf bölümüm "${weak?.key || 'Bedömning'}". Bu bölümü nasıl geliştiririm? Bana 5 somut kalıp cümle ve bir örnek ver.`), 150);
  },

  // Läsa
  jrField: (d) => { Journal.rField = d.f; renderTab('journal'); },
  jrLevel: (d) => { Journal.rLevel = d.l; renderTab('journal'); },
  jrPick: (d) => { Journal.rAns[+d.i] = d.v; renderTab('journal'); },
  jrSet: (d, el) => { Journal.rAns[+d.i] = el.value; },
  jrReset: () => { Journal.rSet = null; Journal.rAns = {}; Journal.rResult = null; renderTab('journal'); },
  jrGen: async () => {
    if (!S.cfg.apiKey) { openSettings(); return; }
    Journal.busy = true; Journal.busyMsg = 'AI journal metnini ve soruları hazırlıyor...'; renderTab('journal');
    try {
      Journal.rSet = await callJSON(JOURNAL_READ_PROMPT, [{
        role: 'user',
        content: `Kontext: ${Journal.rField === 'vet' ? 'veterinärklinik/djursjukhus' : 'human sjukvård (vårdcentral eller sjukhus)'}. Nivå: ${Journal.rLevel}. Elevens yrke: ${S.cfg.profession}.`
      }], { maxTokens: 3200 });
      Journal.rAns = {}; Journal.rResult = null;
    } catch (e) { showToast(e.message, 'error'); }
    Journal.busy = false; renderTab('journal');
  },
  jrSubmit: () => {
    const set = Journal.rSet, qs = set.questions || [];
    const detail = qs.map((q, i) => {
      const given = Journal.rAns[i] || '';
      const ok = q.type === 'abbr' ? abbrOk(given, q.a) : normAbbr(given) === normAbbr(q.a);
      return { n: q.n || i + 1, q: q.q, given, correct: q.a, ok, why: q.why };
    });
    const correct = detail.filter(d => d.ok).length;
    const res = { title: set.title, text: set.text, correct, total: qs.length, pct: Math.round((correct / qs.length) * 100), detail, glossary: set.glossary || [] };
    Journal.rResult = res; addXP(20);
    showToast(`${correct}/${qs.length} rätt · +20 XP`, 'success');
    renderTab('journal');
  },

  // Förkortningar
  jaSearch: (d, el) => {
    Journal.aSearch = el.value;
    const pane = document.getElementById('tabJournal');
    if (pane) {
      pane.innerHTML = Journal.render();
      const inp = document.getElementById('abbrSearch');
      if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
    }
  },
  jaCat: (d) => { Journal.aCat = d.c; renderTab('journal'); },
  jaSave: (d) => {
    const x = ABBREV.find(y => y.a === d.a); if (!x) return;
    saveWordObj({ sv: x.full, tr: x.tr, form: `förkortas "${x.a}"`, uttal: '', ex: `I journalen skrivs det ofta "${x.a}".`, tip: `Journal kısaltması: ${x.a} = ${x.full}` }, 'med');
  },
});
