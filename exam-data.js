// ═══════════════════════════════════════════════════════════
// SVENSKA HERALD — PROVBANK & BEDÖMNINGSPROMPTAR
// 4 standart: CEFR · SFI/SAS · TISUS · Socialstyrelsen (medicinsk svenska)
// ═══════════════════════════════════════════════════════════
'use strict';

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// ── STANDARTLAR ──────────────────────────────────────────
const STANDARDS = {
  cefr: {
    id: 'cefr', label: 'CEFR — Genel Avrupa ölçeği', short: 'CEFR', icon: '🌍',
    desc: 'Belirli bir sınav formatı yok. Seçtiğin CEFR seviyesine göre zorluk ayarlanır, geri bildirim CEFR tanımlayıcılarıyla verilir.',
    verdictLabel: 'Tahmini CEFR seviyesi',
    writeCriteria: ['Uppgiftslösning', 'Sammanhang & struktur', 'Ordförråd', 'Grammatisk korrekthet'],
    speakCriteria: ['Flyt & sammanhang', 'Ordförråd', 'Grammatik', 'Uttal (uppskattat)'],
  },
  sfi: {
    id: 'sfi', label: 'SFI / SAS — nationella prov', short: 'SFI/SAS', icon: '🏫',
    desc: 'SFI kurs C–D ve Svenska som andraspråk 1–3 ulusal sınav formatı. Puanlama İsveç okul sistemine göre A–F notu olarak verilir.',
    verdictLabel: 'Betyg (A–F)',
    writeCriteria: ['Innehåll & uppgiftslösning', 'Disposition & sammanhang', 'Språklig variation', 'Språklig korrekthet'],
    speakCriteria: ['Innehåll & begriplighet', 'Flyt & interaktion', 'Ordförråd & variation', 'Uttal & intonation (uppskattat)'],
  },
  tisus: {
    id: 'tisus', label: 'TISUS — üniversite yeterlik sınavı', short: 'TISUS', icon: '🎓',
    desc: 'İsveç üniversitelerine giriş için akademik dil yeterliği. Üç bölüm: läsförståelse, skriftlig färdighet, muntlig färdighet. Sonuç Godkänd / Underkänd.',
    verdictLabel: 'Godkänd / Underkänd',
    writeCriteria: ['Uppgiftslösning & argumentation', 'Textstruktur & sammanhang', 'Akademiskt ordförråd', 'Språklig korrekthet'],
    speakCriteria: ['Argumentation & innehåll', 'Flyt & interaktion', 'Akademiskt ordförråd', 'Uttal & tydlighet (uppskattat)'],
  },
  medsv: {
    id: 'medsv', label: 'Socialstyrelsen — medicinsk svenska (C1)', short: 'Med. C1', icon: '⚕️',
    desc: 'Sağlık mesleği ruhsatı (legitimation) için gereken C1 düzeyi mesleki İsveççe. Hasta iletişimi, meslektaş iletişimi (SBAR) ve journalföring odaklı.',
    verdictLabel: 'C1-nivå: Godkänd / Ej godkänd ännu',
    writeCriteria: ['Fackspråklig korrekthet & terminologi', 'Struktur enligt vårdens mallar', 'Patientsäker tydlighet', 'Språklig korrekthet'],
    speakCriteria: ['Patientsäker kommunikation', 'Flyt & interaktion', 'Fackspråk & anpassning till mottagare', 'Uttal & tydlighet (uppskattat)'],
  },
};
const STANDARD_ORDER = ['cefr', 'sfi', 'tisus', 'medsv'];

// ── DEPARTMANLAR (okuma/dinleme/soru üretimi için) ───────
const DEPARTMENTS = [
  { id: 'vet', label: '🐾 Veterinärmedicin', hint: 'smådjur, häst, lantbruksdjur, kirurgi, anestesi, labb, farmakologi, djurägarkommunikation' },
  { id: 'med', label: '🏥 Humanmedicin', hint: 'akutmottagning, vårdcentral, internmedicin, kirurgi, psykiatri, radiologi, läkemedel' },
  { id: 'system', label: '🏛️ Myndigheter & samhälle', hint: 'Skatteverket, Försäkringskassan, Arbetsförmedlingen, Migrationsverket, bostad, arbetsrätt' },
  { id: 'vardag', label: '💬 Vardag & kultur', hint: 'vardagsliv, kultur, traditioner, konsumtion, relationer' },
  { id: 'nyheter', label: '📰 Nyheter & samhällsdebatt', hint: 'politik, ekonomi, klimat, teknik, utbildning' },
  { id: 'vetenskap', label: '🔬 Vetenskap & forskning', hint: 'medicinsk forskning, biologi, epidemiologi, statistik, forskningsetik' },
  { id: 'juridik', label: '⚖️ Juridik & etik', hint: 'patientlagen, djurskyddslagen, sekretess, samtycke, etiska dilemman' },
  { id: 'arbete', label: '💼 Arbetsliv', hint: 'arbetsmiljö, ledarskap, konflikthantering, rekrytering, kollektivavtal' },
];

// ═══════════════════════════════════════════════════════════
// SKRIFTLIGA UPPGIFTER
// ═══════════════════════════════════════════════════════════

const W_CEFR = [
  { level: 'A2', type: 'Informellt brev', topic: 'Vardag', min: 80, q: 'Skriv ett mejl till en vän som ska besöka Sverige för första gången. Berätta om vädret, vad man bör ta med sig och vad ni ska göra tillsammans.' },
  { level: 'A2', type: 'Beskrivning', topic: 'Vardag', min: 80, q: 'Beskriv din vardag: vad du gör på morgonen, på jobbet eller i skolan, och på kvällen. Använd tidsuttryck som "först", "sedan" och "efteråt".' },
  { level: 'B1', type: 'Åsiktstext', topic: 'Samhälle', min: 150, q: 'Många menar att alla borde arbeta hemifrån minst två dagar i veckan. Vad tycker du? Motivera din åsikt med minst två argument och ge exempel.' },
  { level: 'B1', type: 'Formellt brev', topic: 'Myndighet', min: 150, q: 'Du har fått ett beslut från en myndighet som du tycker är felaktigt. Skriv ett formellt brev där du förklarar situationen, motiverar varför beslutet bör omprövas och beskriver vilka handlingar du bifogar.' },
  { level: 'B2', type: 'Argumenterande text', topic: 'Hälsa', min: 250, q: 'Bör vården prioritera förebyggande insatser framför behandling av redan uppkomna sjukdomar? Diskutera fördelar och nackdelar och ta ställning.' },
  { level: 'B2', type: 'Diskuterande text', topic: 'Teknik', min: 250, q: 'Artificiell intelligens används alltmer i diagnostik. Vilka möjligheter och risker ser du? Diskutera och dra en slutsats.' },
  { level: 'C1', type: 'Utredande text', topic: 'Miljö', min: 300, q: 'Antibiotikaanvändning inom djurhållning bidrar till resistensutveckling hos människor. Utred orsakerna och diskutera vilka åtgärder som är rimliga att kräva av lantbruket, staten respektive konsumenten.' },
  { level: 'C1', type: 'Debattartikel', topic: 'Samhälle', min: 300, q: 'Skriv en debattartikel om huruvida legitimationskraven för utländska vårdutbildade i Sverige är rimliga. Bemöt minst ett motargument.' },
  { level: 'C2', type: 'Kritisk analys', topic: 'Vetenskap', min: 350, q: 'Publiceringsbias innebär att studier med positiva resultat oftare publiceras. Analysera vilka konsekvenser detta får för evidensbaserad vård och vad forskarsamhället kan göra åt saken.' },
];

const W_SFI = [
  { level: 'SFI C', type: 'Kort meddelande', topic: 'Vardag', min: 60, q: 'Du kan inte komma till ett inbokat möte på vårdcentralen. Skriv ett meddelande där du avbokar tiden, förklarar varför och frågar om en ny tid.' },
  { level: 'SFI D', type: 'Berättande text', topic: 'Vardag', min: 120, q: 'Berätta om en dag som blev annorlunda än du hade tänkt dig. Vad hände? Vad kände du? Hur slutade det?' },
  { level: 'SFI D', type: 'Åsiktstext', topic: 'Samhälle', min: 120, q: 'Är det viktigt att lära sig svenska för att kunna arbeta i Sverige? Skriv vad du tycker och ge minst två skäl.' },
  { level: 'SFI D', type: 'Formellt brev', topic: 'Bostad', min: 120, q: 'Det är kallt i din lägenhet och elementen fungerar dåligt. Skriv ett brev till hyresvärden. Beskriv problemet, hur länge det pågått och vad du vill att de gör.' },
  { level: 'SAS 1', type: 'Argumenterande text', topic: 'Utbildning', min: 200, q: 'Bör mobiltelefoner vara förbjudna i skolan? Skriv en argumenterande text med tes, minst två argument och en slutsats.' },
  { level: 'SAS 2', type: 'Utredande text', topic: 'Arbetsliv', min: 250, q: 'Många unga känner stress i arbetslivet. Utred möjliga orsaker och diskutera vad arbetsgivare och samhälle kan göra. Använd sambandsord för att binda ihop texten.' },
  { level: 'SAS 3', type: 'Vetenskapligt orienterad text', topic: 'Samhälle', min: 300, q: 'Skriv en utredande text om hur digitaliseringen påverkat kontakten mellan medborgare och myndigheter i Sverige. Väg för- och nackdelar och avsluta med en egen slutsats.' },
];

const W_TISUS = [
  { level: 'TISUS', type: 'Argumenterande uppsats', topic: 'Utbildning', min: 400,
    q: 'Vissa hävdar att högskoleutbildning i första hand ska förbereda studenter för arbetsmarknaden, medan andra menar att dess uppgift är att utveckla kritiskt tänkande oavsett nytta. Ta ställning i frågan och argumentera för din uppfattning. Bemöt minst ett motargument.' },
  { level: 'TISUS', type: 'Argumenterande uppsats', topic: 'Vård', min: 400,
    q: 'Bör vården i Sverige i högre grad finansieras med privata försäkringar? Diskutera konsekvenserna för tillgänglighet, kvalitet och jämlikhet, och ta ställning.' },
  { level: 'TISUS', type: 'Utredande uppsats', topic: 'Forskning', min: 400,
    q: 'Forskningsresultat sprids i dag snabbt via sociala medier, ofta innan de granskats. Utred vilka konsekvenser detta får för allmänhetens förtroende för vetenskap, och föreslå åtgärder.' },
  { level: 'TISUS', type: 'Argumenterande uppsats', topic: 'Miljö', min: 400,
    q: 'Är individens val eller politiska beslut viktigast för att minska klimatpåverkan? Argumentera för din ståndpunkt och bemöt motargument.' },
  { level: 'TISUS', type: 'Utredande uppsats', topic: 'Djur & etik', min: 400,
    q: 'Djurförsök är fortfarande en förutsättning för mycket medicinsk forskning. Utred de etiska avvägningarna och diskutera under vilka villkor djurförsök kan försvaras.' },
];

const W_MEDSV = [
  { level: 'C1', type: 'Journalanteckning', topic: 'Vårdcentral', min: 150, doc: 'journal',
    q: 'Skriv en journalanteckning efter följande besök. Använd rubrikerna Anamnes, Status, Bedömning och Åtgärd.',
    fall: 'Kvinna 54 år, söker för trötthet sedan tre månader, tilltagande. Sover dåligt. Ofrivillig viktnedgång 4 kg. Ingen feber. Röker 10 cig/dag sedan 30 år. Medicinerar med levotyroxin. I status: AT gott, opåverkad, bltr 142/88, puls 78 regelbunden, hjärta och lungor u.a., buk mjuk oöm, ingen palpabel lymfkörtelförstoring. Hb 102 g/L.' },
  { level: 'C1', type: 'Journalanteckning', topic: 'Djursjukhus', min: 150, doc: 'journal',
    q: 'Skriv en journalanteckning för detta veterinärbesök med rubrikerna Anamnes, Status, Bedömning och Åtgärd.',
    fall: 'Hund, labrador, hane, 7 år, 32 kg. Ägaren söker akut: kräkningar sedan i går kväll, sex tillfällen, sista med blodinslag. Äter inte. Har varit på skogspromenad. Vaccinerad, avmaskad för 4 månader sedan. Status: TPR 39,4 °C / puls 120 / andningsfrekvens 32. Nedsatt AT, uttorkad ca 6 %, kraftig bukömhet kranialt, tarmljud sparsamma. Slemhinnor bleka, CRT 2,5 s.' },
  { level: 'C1', type: 'Remiss', topic: 'Specialistvård', min: 150, doc: 'remiss',
    q: 'Skriv en remiss till specialistmottagning. Ange frågeställning, relevant anamnes, aktuellt status, utförda undersökningar och önskad åtgärd.',
    fall: 'Man 67 år. Sedan två månader tilltagande sväljningssvårigheter för fast föda, viktnedgång 6 kg. Tidigare frisk förutom hypertoni. Ingen dysfagi för vätska initialt men tillkommit senaste veckan. Hb 118, i övrigt normala prover. Du vill ha gastroskopi skyndsamt.' },
  { level: 'C1', type: 'Epikris', topic: 'Slutenvård', min: 180, doc: 'epikris',
    q: 'Skriv en epikris (utskrivningsanteckning) som ska skickas till patientens vårdcentral. Sammanfatta vårdtillfället och ange tydlig plan för uppföljning.',
    fall: 'Kvinna 71 år, inlagd 5 dygn för samhällsförvärvad pneumoni. Inkom med feber 39,2, hosta, andnöd, CRP 186. Behandlad med bensylpenicillin iv i 3 dygn, därefter po amoxicillin. Syrgasbehov första två dygnen. Successiv förbättring, CRP 42 vid utskrivning. Kvarstående lätt hosta. Antibiotika ska fullföljas 3 dagar till. Lungröntgenkontroll om 6 veckor. Patienten har KOL och står på inhalationer.' },
  { level: 'C1', type: 'Patientinformation', topic: 'Kommunikation', min: 180, doc: 'patientinfo',
    q: 'Skriv ett informationsbrev till patienten (eller djurägaren) på lättbegriplig svenska — utan fackuttryck. Förklara vad som hittats, vad som ska göras och vad personen själv ska tänka på.',
    fall: 'Katt, honkatt 12 år, nyupptäckt kronisk njursvikt IRIS stadium 2. Behöver njurfoder, fri tillgång till vatten, blodprovskontroll om 3 månader. Ägaren ska höra av sig vid ökad törst, viktnedgång eller kräkningar.' },
  { level: 'C1', type: 'Intyg', topic: 'Myndighet', min: 150, doc: 'intyg',
    q: 'Skriv ett läkarintyg för sjukskrivning till Försäkringskassan. Ange diagnos, funktionsnedsättning, aktivitetsbegränsning, grad och period samt planerad åtgärd.',
    fall: 'Man 43 år, byggnadsarbetare. Diskbråck L5-S1 med utstrålande smärta i höger ben och nedsatt kraft i fotled. Klarar inte tunga lyft, kan inte stå eller gå längre stunder. Sjukgymnastik pågår. Bedöms behöva heltidssjukskrivning 6 veckor.' },
  { level: 'C1', type: 'Avvikelserapport', topic: 'Patientsäkerhet', min: 150, doc: 'avvikelse',
    q: 'Skriv en avvikelserapport. Beskriv sakligt vad som hände, konsekvensen för patienten, bakomliggande orsaker och förslag på åtgärd. Skriv utan att peka ut enskilda personer.',
    fall: 'En patient fick dubbel dos av ett blodtrycksläkemedel eftersom två olika ordinationer fanns kvar i läkemedelslistan efter ett vårdgivarbyte. Patienten blev yr och fick ett blodtrycksfall men återhämtade sig efter observation i fyra timmar.' },
];

const WRITING_BANKS = { cefr: W_CEFR, sfi: W_SFI, tisus: W_TISUS, medsv: W_MEDSV };

// ═══════════════════════════════════════════════════════════
// MUNTLIGA UPPGIFTER
// ═══════════════════════════════════════════════════════════

const SPK_BANKS = {
  cefr: [
    { part: 'Del 1 — Presentation', qs: ['Berätta lite om dig själv och vad du arbetar med.', 'Hur ser en vanlig dag ut för dig?', 'Vad tycker du bäst om med ditt arbete?'] },
    { part: 'Del 2 — Berätta', qs: ['Berätta om en gång då du behövde hjälp av någon. Vad hände och hur löste det sig?', 'Beskriv en plats som betyder mycket för dig och förklara varför.'] },
    { part: 'Del 3 — Diskussion', qs: ['Är det lättare eller svårare att lära sig ett nytt språk som vuxen? Motivera.', 'Vad tycker du är svårast med att flytta till ett nytt land?', 'Hur kan samhället bli bättre på att ta emot nyanlända?'] },
  ],
  sfi: [
    { part: 'Del 1 — Samtal', qs: ['Berätta om var du bor och hur du trivs där.', 'Vad gör du på fritiden?', 'Vad gjorde du i helgen?'] },
    { part: 'Del 2 — Beskriva & jämföra', qs: ['Jämför hur man handlar mat i Sverige med hur man gör i ditt hemland.', 'Beskriv en tradition som är viktig för dig och förklara varför.'] },
    { part: 'Del 3 — Åsikt & argumentation', qs: ['Tycker du att alla borde lära sig svenska innan de börjar arbeta? Varför / varför inte?', 'Vad är viktigast för att trivas på en ny arbetsplats?', 'Hur skulle du förklara för en nyanländ hur sjukvården fungerar i Sverige?'] },
  ],
  tisus: [
    { part: 'Del 1 — Kort presentation', qs: ['Presentera dig kort och beskriv din utbildningsbakgrund och dina studiemål.'] },
    { part: 'Del 2 — Redogörelse', qs: ['Redogör för ett aktuellt samhällsproblem i Sverige och förklara varför det är svårt att lösa.', 'Presentera ett ämne inom ditt eget fackområde för någon som inte är insatt.'] },
    { part: 'Del 3 — Argumenterande diskussion', qs: ['Bör universitetsutbildning vara avgiftsfri för alla, även för studenter utanför EU? Argumentera.', 'Hur bör forskningsmedel fördelas mellan grundforskning och tillämpad forskning?', 'Vilket ansvar har experter för hur deras forskning används i den offentliga debatten?'] },
  ],
  medsv: [
    { part: 'Del 1 — Patientsamtal', qs: ['Du möter en ny patient som söker för buksmärta. Inled samtalet och ta en anamnes. Börja nu.', 'Ta upp läkemedels- och allergianamnes på ett strukturerat sätt.'] },
    { part: 'Del 2 — Förklara för patient', qs: ['Förklara på vardaglig svenska, utan fackuttryck, vad diabetes typ 2 innebär och vad patienten själv kan påverka.', 'Förklara för en djurägare varför du rekommenderar röntgen och vad undersökningen innebär.', 'Ge ett svårt besked på ett varsamt sätt: provsvaret visar en malign förändring.'] },
    { part: 'Del 3 — Kollegial rapport (SBAR)', qs: ['Rapportera följande patient till kollega enligt SBAR: 78-årig kvinna, inlagd för pneumoni, nu stigande andningsfrekvens 28, saturation 89 % på luft, feber 38,9. Ge din rekommendation.', 'Överrapportera ett postoperativt fall till nattpersonalen enligt SBAR.'] },
  ],
};

// ── SBAR referans ────────────────────────────────────────
const SBAR = [
  { k: 'S', sv: 'Situation', tr: 'Durum', desc: 'Kim arıyor, hangi hasta, sorun ne? Tek cümlede.', ex: '"Jag ringer om Anna Berg, 78 år, på avdelning 42. Hon har försämrad andning."' },
  { k: 'B', sv: 'Bakgrund', tr: 'Arka plan', desc: 'İlgili öykü, tanı, ilaçlar, ne zamandır yatıyor.', ex: '"Hon är inlagd sedan tre dygn för pneumoni och behandlas med bensylpenicillin."' },
  { k: 'A', sv: 'Aktuellt tillstånd', tr: 'Güncel durum', desc: 'Vital bulgular ve senin değerlendirmen.', ex: '"Andningsfrekvens 28, saturation 89 % på luft, temp 38,9. Jag bedömer att hon försämrats."' },
  { k: 'R', sv: 'Rekommendation', tr: 'Öneri', desc: 'Ne istiyorsun, ne kadar acele, kim ne yapacak.', ex: '"Jag önskar att du kommer och bedömer henne inom 30 minuter. Ska jag sätta syrgas under tiden?"' },
];

// ── OKUMA / DİNLEME ──────────────────────────────────────
const LISTEN_TYPES = [
  { id: 'dialog', label: 'Dialog — vardaglig situation (SFI-stil)' },
  { id: 'konsultation', label: 'Konsultation — patient/djurägare möter vårdpersonal' },
  { id: 'rapport', label: 'Kollegial rapport — SBAR-överlämning' },
  { id: 'forelasning', label: 'Föreläsning — akademiskt anförande (TISUS-stil)' },
  { id: 'nyheter', label: 'Nyhetsinslag — radio/TV-stil' },
];

// ═══════════════════════════════════════════════════════════
// BEDÖMNINGSPROMPTAR
// ═══════════════════════════════════════════════════════════

const SCALE_RULES = {
  cefr: `Bedöm enligt CEFR (A1–C2) och var STRÄNG. Vanligt fel: att ge B2 till allt. Riktmärken:
- A2: enkla huvudsatser, mycket begränsat ordförråd, återkommande fel som ibland stör förståelsen.
- B1: sammanhängande text om bekanta ämnen, enkla bisatser, tydliga men icke-störande fel.
- B2: nyanserad argumentation, varierad meningsbyggnad, god ordföljd, fel förekommer men sällan.
- C1: idiomatisk, flexibel, precist ordval, komplex syntax som fungerar; enstaka fel.
- C2: i praktiken felfri, stilistiskt medveten. Ge C2 ytterst sällan.
Om texten är kortare än minimikravet får uppgiftslösningen aldrig bedömas högre än A2/B1 — och du ska säga varför.`,

  sfi: `Bedöm enligt svenska skolans betygsskala A–F för SFI/SAS. Var STRÄNG och realistisk:
- F: uppgiften är inte löst, texten är för kort eller obegriplig i delar.
- E: uppgiften löst på ett enkelt sätt, begripligt men enformigt språk, många fel.
- C: tydlig struktur, viss variation i ordförråd och meningsbyggnad, fel stör inte förståelsen.
- A: självständig, välstrukturerad, varierat och träffsäkert språk, mycket få fel.
Kommentera uttryckligen: innehåll, disposition (inledning–avhandling–avslutning), sambandsord och språklig korrekthet.
Om texten är kortare än minimikravet kan betyget inte bli högre än E — säg det.`,

  tisus: `Bedöm enligt TISUS-kriterier. Resultatet är Godkänd eller Underkänd — det finns ingen mellannivå. Var STRÄNG:
- För Godkänd krävs ungefär C1: självständig argumentation med tes och motargument, akademisk stil, korrekt styckeindelning, varierad syntax, precist ordval, få störande fel.
- Underkänd ges vid: otydlig tes, uteblivet bemötande av motargument, talspråklig stil, återkommande grammatiska fel eller för kort text.
Ange alltid vad som saknas för Godkänd, konkret. En text under 400 ord blir normalt Underkänd på uppgiftslösning.`,

  medsv: `Bedöm enligt Socialstyrelsens krav på medicinsk svenska (nivå C1) för legitimation. Var STRÄNG och patientsäkerhetsinriktad:
- Fackspråk: korrekt terminologi och korrekta förkortningar. Felaktig term = patientsäkerhetsrisk, sänk hårt.
- Struktur: följer vårdens mallar (Anamnes/Status/Bedömning/Åtgärd, SBAR, epikrisens delar).
- Tydlighet: inga tvetydigheter i dos, sida, tidpunkt eller ansvar. Otydlig ordination är allvarligt.
- Anpassning: patientinformation ska vara FRI från fackuttryck; journal ska vara koncis och saklig.
Godkänd C1 kräver att en svensk kollega kan använda texten utan att behöva fråga om något. Ange "Ej godkänd ännu" om något är otydligt på ett sätt som kan påverka vården.`,
};

const JSON_WRITE_SHAPE = `{
  "verdict": "Standarda uygun sonuç (ör. \\"B2\\" / \\"Betyg C\\" / \\"Godkänd\\" / \\"Ej godkänd ännu\\")",
  "cefr": "A1|A2|B1|B2|C1|C2 — tahmini genel seviye",
  "score": 68,
  "criteria": [
    {"key":"kriter adı (İsveççe, verilen listeden)","level":"A2|B1|B2|C1|C2 veya betyg","score":70,"comment":"Türkçe 2-3 cümle: ne iyi, ne eksik, somut örnekle"}
  ],
  "wordCount": 268,
  "strengths": ["Türkçe madde"],
  "improvements": ["Türkçe, somut ve uygulanabilir madde"],
  "errors": [
    {"original":"öğrencinin yazdığı hatalı parça","corrected":"düzeltilmiş hâli","type":"ordföljd|genus|verbform|prepositioner|ordval|stavning|stil|terminologi","why":"Türkçe kısa açıklama — kuralı da söyle"}
  ],
  "upgrades": [
    {"basic":"öğrencinin kullandığı basit ifade","better":"bir üst seviyede İsveççe alternatif","note":"Türkçe not"}
  ],
  "modelText": "Öğrencinin en zayıf bölümünün hedef seviyede yeniden yazılmış İsveççe hâli (5-8 cümle).",
  "nextStep": "Bir sonraki denemede odaklanacağı TEK şey (Türkçe, tek cümle)."
}`;

const WRITING_EVAL_PROMPT = `Du är en erfaren svensk examinator. Öğrenci Türk. GERİ BİLDİRİMİ TÜRKÇE yaz; dil örnekleri, düzeltmeler ve model metin İSVEÇÇE olsun.

Kriterlerin adlarını sana verilen listeden AYNEN kullan.
errors en fazla 10, upgrades en fazla 6 madde olsun. Türkçe konuşanların İsveççede yaptığı tipik hatalara özellikle dikkat et: ordföljd (V2), BIFF kuralı, en/ett genus, bestämd form, prepositioner (på/i/till/för), partikelverb, "man" kullanımı, supinum–preteritum karışması.

SVARA ENDAST med denna JSON, inget annat:
${JSON_WRITE_SHAPE}`;

const SPEAKING_EVAL_PROMPT = `Du är en erfaren svensk examinator för muntlig färdighet. Öğrenci Türk. GERİ BİLDİRİM TÜRKÇE, dil örnekleri İSVEÇÇE.

ÖNEMLİ: Sana verilen metin, öğrencinin konuşmasının OTOMATİK TRANSKRİPTİDİR. Bu yüzden telaffuz bandı ancak TAHMİNİ olabilir ve bunu yorumda açıkça belirtmelisin. Akıcılık, kelime dağarcığı, dilbilgisi ve içerik güvenilir biçimde değerlendirilebilir. Transkriptte noktalama olmayabilir — bunu hata sayma.

Kriter adlarını verilen listeden aynen kullan. Dolgu sözcüklerini (öh, liksom, typ, alltså) say ve fillerWords alanında bildir.

SVARA ENDAST med denna JSON:
${JSON_WRITE_SHAPE.replace('"modelText"', '"fillerWords": ["typ","liksom"],\n  "modelText"')}`;

const READING_GEN_PROMPT = `Du är provkonstruktör för svenska läsförståelseprov. Skapa ett ORIGINALTEXT och frågor.

REGLER
- Texten ska vara 380–500 ord, indelad i 4–6 stycken märkta A, B, C…
- Stil och svårighetsgrad ska matcha den begärda nivån och det begärda provformatet.
- 10 frågor i denna ordning: 3 st sant/falskt/framgår inte, 3 st flervalsfrågor (4 alternativ), 2 st lucktext (HÖGST TVÅ ORD ur texten), 2 st "vad betyder ordet X i stycke Y?" (4 alternativ).
- "Framgår inte" ska verkligen saknas i texten; "falskt" ska MOTSÄGA texten. Var noggrann med skillnaden.
- Frågorna ska följa textens ordning och kräva förståelse, inte bara ordmatchning. På hög nivå ska minst tre frågor kräva slutledning.
- I varje "why" ska du ange vilket stycke svaret finns i.
- glossary: 6 svåra ord ur texten med turkisk översättning.

SVARA ENDAST med denna JSON:
{
  "title":"Rubrik",
  "paragraphs":[{"label":"A","text":"..."}],
  "questions":[
    {"n":1,"type":"tfng","q":"Påstående på svenska","o":["Sant","Falskt","Framgår inte"],"a":"Sant","why":"Türkçe açıklama + paragraf harfi"},
    {"n":4,"type":"mcq","q":"Fråga","o":["A","B","C","D"],"a":"B","why":"..."},
    {"n":7,"type":"gap","q":"Meningen kompletteras med ______ (HÖGST TVÅ ORD)","o":[],"a":"exakt svar","why":"..."},
    {"n":9,"type":"vocab","q":"Vad betyder \\"ordet\\" i stycke C?","o":["A","B","C","D"],"a":"A","why":"..."}
  ],
  "glossary":[{"sv":"ord","tr":"Türkçe","form":"en ord – ordet – ord","uttal":"telaffuz","ex":"mening"}]
}`;

const LISTENING_GEN_PROMPT = `Du är provkonstruktör för svenska hörförståelseprov. Ljudet läses upp av webbläsarens talsyntes, så skriv en text som fungerar uppläst: inga förkortningar, siffror skrivna tydligt.

REGLER
- 250–350 ord naturligt talad svenska i den begärda genren.
- Är det en dialog: markera repliker med "A:" och "B:".
- 8 frågor: 4 st lucktext/notering (HÖGST TVÅ ORD eller en siffra) och 4 st flervalsfrågor (3 alternativ).
- Svaren ska sägas tydligt i texten. Använd distraktorer men var rättvis.
- Anpassa tempo och komplexitet till nivån: på C1 ska det finnas underförstådd information och attityd att tolka.

SVARA ENDAST med denna JSON:
{
  "title":"Rubrik",
  "context":"Türkçe tek cümle: neyi dinleyeceksin",
  "script":"Den fullständiga texten som ska läsas upp",
  "questions":[
    {"n":1,"type":"gap","q":"Patienten har haft besvär i ______.","o":[],"a":"tre veckor","why":"Türkçe açıklama"},
    {"n":5,"type":"mcq","q":"Varför ringer personen?","o":["...","...","..."],"a":"...","why":"..."}
  ],
  "glossary":[{"sv":"ord","tr":"Türkçe","form":"...","uttal":"...","ex":"mening"}]
}`;

const TASK_GEN_PROMPT = `Du är provkonstruktör. Skapa EN originaluppgift av den begärda typen, på den begärda nivån och inom det begärda ämnesområdet. Uppgiften ska vara realistisk för det angivna provformatet.

SVARA ENDAST med denna JSON:
{"q":"uppgiftstexten på svenska","type":"uppgiftstyp","topic":"ämne","level":"nivå","min":250,"fall":"om det är en vårddokumentationsuppgift: patient-/djurfallet i punktform, annars tom sträng"}`;
