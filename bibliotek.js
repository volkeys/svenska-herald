// ═══════════════════════════════════════════════════════════
// BİBLİOTEK — Svenska Akademien + Litteraturbanken (Ljud & Bild)
// 1) SAX: kelimeler için Svenska Akademien örnekleri (SAG cümlesi) ve SO/SAOL bağlantıları
// 2) Library: "🎧 Bibliotek" sekmesi — dinle, izle, oku
// Kayıtlar Litteraturbanken'in kendi sayfasında açılır (telif: kayıtların bir kısmı
// Sveriges Radio ve hak sahiplerinin izniyle yalnızca orada yayımlanıyor).
// Verket podcastı SoundCloud'un resmî gömme oynatıcısıyla, kullanıcı isteyince yüklenir.
// ═══════════════════════════════════════════════════════════
(function () {
  const LB = 'https://litteraturbanken.se/ljudochbild/';
  const so = w => `https://svenska.se/?q=${encodeURIComponent(w)}&activeTab=so&exactMatch=true`;
  const saol = w => `https://svenska.se/?q=${encodeURIComponent(w)}&activeTab=saol&exactMatch=true`;
  const SAG_PDF = v => `https://svenska.se/SAG_Volym_${v}.pdf`;
  const link = (url, txt, cls = '') => `<a class="${cls}" href="${attr(url)}" data-act="openLink" data-url="${attr(url)}" target="_blank" rel="noopener">${txt}</a>`;

  // ── 1) KELİME ÖRNEKLERİ ───────────────────────────────────
  function ex(word) { const e = (window.SAG_EX || {})[word]; return e ? { t: e[0], tr: e[1], v: e[2], s: e[3] } : null; }
  function block(word) {
    if (!word) return '';
    const e = ex(word);
    return `<div class="sax">
      <div class="sax-h">📘 Svenska Akademien</div>
      ${e ? `<div class="sax-ex">“${esc(e.t)}” <button class="bt" data-act="speak" data-text="${attr(e.t)}" aria-label="Dinle">🔊</button></div>
        <div class="sax-tr">${esc(e.tr)}</div>
        <div class="sax-src">${link(SAG_PDF(e.v), `Svenska Akademiens grammatik ${e.v}, s. ${e.s} ↗`)}</div>` : ''}
      <div class="sax-links">${link(so(word), 'SO: anlam ve örnek cümleler ↗')}${link(saol(word), 'SAOL: çekim ↗')}</div>
    </div>`;
  }
  function mini(word) {
    const e = ex(word);
    return `<div class="sax sax-mini">${e ? `<div class="sax-ex">📘 “${esc(e.t)}”</div><div class="sax-tr">${esc(e.tr)} · <span class="sax-src">SAG ${e.v}, s. ${e.s}</span></div>` : ''}
      <div class="sax-links">${link(so(word), 'SO ↗')}${link(saol(word), 'SAOL ↗')}</div></div>`;
  }
  function soBtn(word) { return link(so(word), '📘', 'bt sax-bt'); }

  Object.assign(ACTIONS, {
    openLink: (d) => { if (d.url) window.open(d.url, '_blank', 'noopener'); },
    libEmbed: (d) => {
      const box = document.getElementById(d.box); if (!box) return;
      box.innerHTML = `<iframe class="lib-sc" title="${attr(d.title || 'SoundCloud')}" scrolling="no" frameborder="no" allow="autoplay"
        src="https://w.soundcloud.com/player/?url=${encodeURIComponent(d.sc)}&color=%23a07de8&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"></iframe>`;
    },
    libMore: (d, el) => {
      const box = el.closest('.lib-list'); if (!box) return;
      const open = box.classList.toggle('open');
      el.textContent = open ? 'Daha az göster ▴' : `Tümünü göster (${el.dataset.n}) ▾`;
    },
    srLoad: (d) => srLoad(d.k),
    srPlay: (d) => {
      const box = document.getElementById('srp-' + d.k); if (!box) return;
      box.innerHTML = srFrame(d.id, d.title);
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
  });

  // ── 2) KÜTÜPHANE VERİSİ ───────────────────────────────────
  const VERKET = [
    ['2026/03/18/verket-barnen-ifran-frostmofjallet/', 'Barnen ifrån Frostmofjället', 'Laura Fitinghoff, 1907', 'Kıtlık yıllarında dağlardan geçen yedi yetim kardeşin klasik çocuk romanı.'],
    ['2025/12/18/verket-en-julsaga/', 'En julsaga', 'Charles Dickens, 1843', 'Dickens\'ın Noel hikâyesi ve İsveç\'teki yeri.'],
    ['2025/12/05/verket-tomtebobarnen/', 'Tomtebobarnen', 'Elsa Beskow, 1910', 'İsveç\'in en sevilen resimli çocuk kitaplarından biri.'],
    ['2025/06/12/verket-var-ar-den-van/', 'Var är den Vän', 'Johan Olof Wallin, 1819', 'Ünlü bir ilahi metni ve İsveç kültüründeki yeri.'],
    ['2025/05/14/verket-rosen-pa-tistelon/', 'Rosen på Tistelön', 'Emilie Flygare-Carlén, 1842', 'Batı kıyısında geçen kaçakçılık ve aşk romanı.'],
    ['2025/02/26/verket-overtalning-jane-austen/', 'Övertalning', 'Jane Austen, 1817', 'Austen\'ın son romanı (Persuasion) üzerine sohbet.'],
    ['2025/02/03/verket-vierge-moderne/', 'Vierge moderne', 'Edith Södergran, 1916', 'Modernist şiirin simge metinlerinden biri.'],
    ['2024/12/11/verket-jag-kommer-av-ett-brusand-hav/', 'Jag kommer av ett brusand\' hav', 'Evert Taube', 'Taube\'nin denizle ilgili şarkı ve şiirleri.'],
  ];
  const DIKTER = [
    ['Den nya skapelsen', 'Johan Henric Kellgren', 'KellgrenJH'],
    ['Några ord till min k. Dotter, i fall jag hade någon', 'Anna Maria Lenngren', 'LenngrenAM'],
    ['Vän! i förödelsens stund', 'Erik Johan Stagnelius', 'StagneliusEJ'],
    ['Dagen svalnar …', 'Edith Södergran', 'SödergranE'],
    ['En gamling', 'Dan Andersson', 'AnderssonD'],
    ['Tag mig. – Håll mig. – Smek mig sakta', 'Harriet Löwenhjelm', 'LöwenhjelmH'],
    ['Ja visst gör det ont', 'Karin Boye (kendi sesinden)', 'BoyeK'],
    ['När skönheten kom till byn', 'Nils Ferlin (kendi sesinden, 1939)', 'FerlinN'],
    ['Dikten', 'Kerstin Söderholm', 'SöderholmK'],
    ['Kväll i inlandet', 'Harry Martinson', 'MartinsonH'],
  ];
  const NOVELLER = [
    ['Ett halvt ark papper', 'August Strindberg', 'Tek sayfalık, çok sade dilli ünlü öykü — başlamak için ideal.'],
    ['Ur mörkret', 'Victoria Benedictsson', ''],
    ['Bortbytingen', 'Selma Lagerlöf', 'Lagerlöf\'ün masalsı öyküsü.'],
    ['Pyrrhussegrar', 'Stella Kleve (Mathilda Malling)', ''],
    ['Pelsen', 'Hjalmar Söderberg', 'Söderberg\'in kısa, ironik Stockholm öykülerinden.'],
    ['Käringamötet', 'Elin Wägner', ''],
    ['Åbrodd och lilja', 'Ivar Lo-Johansson', ''],
    ['Staden', 'Eva Neander', ''],
    ['Pingstbrud', 'Tage Aurell (kendi sesinden, 1949)', ''],
    ['Att döda ett barn', 'Stig Dagerman (kendi sesinden, 1952)', 'Kısa ve çok güçlü bir öykü; trafik güvenliği kampanyası için yazıldı.'],
  ];
  const LJUD = [
    ['2021/10/31/att-doda-ett-barn-2/', 'Att döda ett barn', 'Stig Dagerman öyküsünü kendisi okuyor.'],
    ['2026/02/05/vinterns-litteratur/', 'Vinterns litteratur', 'Kış temalı şiir ve öykü okumaları.'],
    ['2025/12/05/anna-karin-palm-och-novellen/', 'Anna-Karin Palm & novellen', 'Yazar Anna-Karin Palm öykü türü üzerine; Lagerlöf ve Dagerman okumaları.'],
    ['2026/02/19/en-beowulf-for-2020-talet/', 'En Beowulf för 2020-talet', 'Beowulf destanının yeni İsveççe çevirisinden sesli kitap.'],
    ['2019/11/07/ekdahl-laser-sodergran/', 'Ekdahl läser Södergran', 'Oyuncu Ekdahl, Edith Södergran\'ın şiirlerini okuyor.'],
    ['2021/03/02/wide-man-maste-borja/', 'Wide: Man måste börja', ''],
  ];
  const RÖSTER = [
    ['2025/03/28/frank-heller-aventyrsromaner/', 'Att skriva äventyrsromaner', 'Frank Heller, 1943 — Radiotjänst kaydı.'],
    ['2025/03/26/nar-frans-g-bengtsson-blev-forfattare/', 'En kreaturskötarens minnen', 'Frans G. Bengtsson, 1938 — Radiotjänst kaydı.'],
    ['2025/02/28/kare-kare-ernst-norlind/', 'Käre käre Ernst Norlind!', 'Radyo sohbeti (kåseri), 1946.'],
    ['2025/02/02/linder-tolkar-sjoberg/', 'Släpp fångarne loss!', 'Birger Sjöberg\'in şarkıları üzerine radyo kayıtları.'],
  ];
  const FILM = [
    ['2023/03/27/fadren-1912-en-film/', 'Fadren (1912)', 'Strindberg\'in oyunundan sessiz film.'],
    ['2023/03/27/norrtullsligan-1923-en-film/', 'Norrtullsligan (1923)', 'Elin Wägner\'in romanından sessiz film; ara yazılar okuma pratiği için iyi.'],
    ['2025/02/11/margit-fribergs-oland/', 'Margit Fribergs Öland', 'Öland adası üzerine belgesel nitelikli film.'],
    ['2022/02/27/boye-saljer-bocker/', 'Boye säljer böcker', 'Karin Boye\'nin kısa film görüntüleri.'],
    ['2023/05/09/litteraturens-sapmi/', 'Samiska klassiker', 'Sami edebiyatı ve filmleri.'],
    ['2023/04/26/med-ackja-och-ren-i-inka-lantas-vinterland/', 'I Inka Läntas vinterland', ''],
    ['2020/09/07/ventlinge-i-varlden/', 'Ventlinge i världen', ''],
    ['2019/09/22/en-skalds-begravning/', 'En skalds begravning', ''],
    ['2019/09/22/en-barnbok-och-verkligheten/', 'Kattresans Älvängen', ''],
    ['2019/09/22/nagra-ogonblick-1911/', 'Några ögonblick, 1911', ''],
    ['2019/09/22/poeten-far-pris/', 'Poeten får pris', ''],
    ['2019/09/22/en-diktare-undervisar/', 'En diktare undervisar', ''],
    ['2019/09/22/heidenstam-naddo/', 'Heidenstam på Naddö', ''],
    ['2025/10/23/fran-forr-scenens-filmens-varld/', 'Från förr: Scenens & filmens värld', ''],
  ];
  const SA = 'https://www.svenskaakademien.se/litteraturen/bokutgivning/';
  const SPRAK = [
    ['Svenska Akademiens grammatik (SAG)', 'Dört ciltlik başvuru grameri. Uygulamadaki gramer dersleri bununla karşılaştırıldı.', [[SAG_PDF(1), 'Cilt 1'], [SAG_PDF(2), 'Cilt 2 Ord'], [SAG_PDF(3), 'Cilt 3 Fraser'], [SAG_PDF(4), 'Cilt 4 Satser'], [SA + 'bocker-om-svenska-spraket/svenska-akademiens-grammatik', 'Kitap sayfası']], 'Ücretsiz PDF'],
    ['Svenska Akademiens ordlista (SAOL)', 'Yazım ve çekim normu: bir kelimenin doğru çoğulu, fiil çekimi, cinsiyeti.', [['https://svenska.se/', 'svenska.se'], [SA + 'bocker-om-svenska-spraket/svenska-akademiens-ordlista', 'Kitap sayfası']], 'Ücretsiz çevrim içi + uygulama'],
    ['Svensk ordbok (SO)', 'Anlam, kullanım, deyimler ve örnek cümleler; ileri öğrenenler için ideal sözlük.', [['https://svenska.se/', 'svenska.se'], ['https://itunes.apple.com/se/app/svensk-ordbok-utgiven-av-svenska/id1036105642?mt=8', 'iPhone'], ['https://play.google.com/store/apps/details?id=se.svenskaakademien.so16', 'Android'], [SA + 'bocker-om-svenska-spraket/svensk-ordbok-utgiven-av-svenska-akademien', 'Kitap sayfası']], 'Ücretsiz çevrim içi + uygulama'],
    ['Svenska Akademiens ordbok (SAOB)', 'Tarihî büyük sözlük: kelimelerin kökeni ve tarihsel kullanımı.', [['https://www.saob.se', 'saob.se'], [SA + 'bocker-om-svenska-spraket/svenska-akademiens-ordbok', 'Kitap sayfası']], 'Ücretsiz çevrim içi'],
    ['Svenska Akademiens språklära (SAS)', 'SAG\'ın kısa, tek ciltlik özeti.', [[SA + 'bocker-om-svenska-spraket/svenska-akademiens-spraklara', 'Kitap sayfası']], 'Basılı'],
    ['Inledning till grammatiken', 'Gramere giriş kitabı.', [[SA + 'bocker-om-svenska-spraket/inledning-till-grammatiken', 'Kitap sayfası']], 'Basılı'],
    ['Grammatik, ord, texter', 'Olle Josephson — dil üzerine yazılar.', [[SA + 'bocker-om-svenska-spraket/grammatik-ord-texter', 'Kitap sayfası']], 'Basılı'],
  ];
  const POESI = [
    ['Tid för poesi', '52 şiir — yılın her haftası için bir tane; çağdaş illüstrasyonlarla. Öğrenci için sohbet soruları da var.', [[SA + 'ovrig-utgivning/tid-for-poesi', 'Kitap sayfası'], ['https://www.svenskaakademien.se/svenska-akademien/tidforpoesi', 'Rehber ve sorular']]],
    ['En bro av poesi', '1600\'lerden bugüne 60 şiir; okul yılını takip eden kısa, anlaşılır şiirler.', [[SA + 'ovrig-utgivning/en-bro-av-poesi', 'Kitap sayfası']]],
  ];
  const KLASSIKER = [
    ['Hundra fabler på svenska', 'Antoloji', 'hundra-fabler-pa-svenska'], ['Sanningslekar', 'Erland Josephson', 'erland-josephson-sanningslekar'],
    ['Samlade dikter I–IV', 'Gunnar Ekelöf', 'gunnar-ekelof-samlade-dikter-I-IV'], ['99 visor och en rapp', 'Antoloji', 'en-ny-svensk-visbok'],
    ['Ottar Trallings levnadsmålning', 'Fredrik Cederborgh', 'fredrik-cederborgh-ottar-trallings-levnadsmalning'], ['Nemesis divina', 'Carl von Linné', 'carl-von-linne-nemesis-divina'],
    ['Fjärilen i min hjärna', 'Anders Paulrud', 'anders-paulrud-fjarilen-i-min-hjarna'], ['En svensk visbok', 'Antoloji', 'en-svensk-visbok'],
    ['Dramatik och vältalighet', 'Gustaf III', 'gustaf-iii-dramatik-och-valtalighet'], ['Vallfart till Trubadurien och Toscana', 'Evert Taube', 'vallfart-till-trubadurien-och-toscana'],
    ['Kärleken och dårskapen', 'Anna Maria Lenngren', 'karleken-och-darskapen-dikter-i-urval-av-forfattaren'], ['Maximer', 'Kristina', 'maximer'],
    ['Eufemiavisorna I–II', 'Antoloji', 'eufemiavisorna-i-ii'], ['Japanen som försvann', 'Bo Grandien', 'bo-grandien-japanen-som-forsvann-och-andra-berattelser'],
    ['Lekverk', 'Per Erik Wahlund', 'per-erik-wahlund-lekverk-essaer-och-kritik-i-urval'], ['Marmorbruden', 'August Blanche', 'august-blanche-marmorbruden-stockholmsberattelser'],
    ['Skördarne / Dagens stunder', 'Johan Gabriel Oxenstierna', 'johan-gabriel-oxenstierna-skordarne-dagens-stunder'], ['Venerid', 'Skogekär Bergbo', 'skogekar-bergbo-venerid'],
    ['Samlade dikter I–II', 'Gunnar Ekelöf', 'gunnar-ekelof-samlade-dikter-i-ii'], ['Iliaden och Odysséen', 'Lagerlöfs Homeros', 'lagerlofs-homeros-iliaden-och-odysseen'],
    ['Samlade skrifter I–V', 'Erik Johan Stagnelius', 'erik-johan-stagnelius-samlade-skrifter-iv'], ['Dikter och brev', 'Gustav Philip Creutz', 'gustav-philip-creutz-dikter-och-brev'],
    ['Resebrev', 'Adolph Törneros', 'adolph-torneros-resebrev'], ['Ord på liv och död I–II', 'Victoria Benedictsson', 'victoria-benedictsson-ord-pa-liv-och-dod-kortprosa'],
    ['Kritisk prosa I–II', 'Oscar Levertin', 'oscar-levertin-kritisk-prosa-i-ii'], ['Brev och skrifter', 'Kristina', 'kristina-brev-och-skrifter'],
    ['Vårfrost', 'Bo Bergman', 'bo-bergman-varfrost-poesi-och-prosa-1903-1967'], ['Breven till Claes', 'Johan Ekeblad', 'johan-ekeblad-breven-till-claes-om-livet-och-hovet'],
    ['Samlade dikter I–II', 'Vilhelm Ekelund', 'vilhelm-ekelund-samlade-dikter-i-ii'], ['Pennskaftet', 'Elin Wägner', 'elin-wagner-pennskaftet'],
    ['Uppenbarelser', 'Heliga Birgitta', 'heliga-birgitta-uppenbarelser'], ['Judas / Gerhard Grim', 'Tor Hedberg', 'tor-hedberg-judas-gerhard-grim'],
    ['Minnen från Tyskland och Italien', 'P. D. A. Atterbom', 'p-d-a-atterbom-minnen-fran-tyskland-och-italien-i'], ['En skälmroman / Döda fallet', 'Per Hallström', 'per-hallstrom-en-skalmroman-doda-fallet'],
    ['Den gamla psalmboken', 'Antoloji', 'den-gamla-psalmboken'], ['Skrifter I–II', 'Gösta Oswald', 'gosta-oswald-skrifter-i-ii'],
    ['Att följa ögonblicken', 'Thomas Thorild', 'thomas-thorild-att-folja-ogonblicken-texter-i'], ['Dikter', 'Erik Gustaf Geijer', 'erik-gustaf-geijer-dikter'],
    ['Sälla jaktmarker', 'Lars Göransson', 'lars-goransson-salla-jaktmarker'], ['Dikter', 'Johan Ludvig Runeberg', 'johan-ludvig-runeberg-dikter'],
    ['Herr Clerk Vår Mästare', 'Eyvind Johnson', 'eyvind-johnson-herr-clerk-var-mastare'], ['Spader Dame', 'Clas Livijn', 'clas-livijn-spader-dame'],
    ['Lyrik och essäer', 'Ola Hansson', 'ola-hansson-lyrik-och-essaer'], ['Dikter', 'Viktor Rydberg', 'viktor-rydberg-dikter'],
    ['Skrifter', 'Hedvig Charlotta Nordenflycht', 'hedvig-charlotta-nordenflycht-skrifter'], ['Stensborg', 'Sven Lidman', 'sven-lidman-stensborg'],
    ['Livet i gamla världen. Palestina', 'Fredrika Bremer', 'fredrika-bremer-livet-i-gamla-varlden-palestina'], ['Hans Alienus', 'Verner von Heidenstam', 'verner-von-heidenstam-hans-alienus'],
    ['En döds memoarer', 'Hjalmar Bergman', 'hjalmar-bergman-en-dods-memoarer'], ['Skrifter I–II', 'Johan Henric Kellgren', 'johan-henric-kellgren-skrifter-i-ii'],
  ];

  // ── 3) KÜTÜPHANE GÖRÜNÜMÜ ─────────────────────────────────
  function sec(id, icon, title, sub, body, lvl) {
    return `<section class="panel lib-sec" id="lib-${id}"><div class="lib-h"><span class="lib-ic">${icon}</span><div><div class="lib-t">${esc(title)}${lvl ? ` <span class="lib-lvl">${esc(lvl)}</span>` : ''}</div>${sub ? `<div class="lib-sub">${sub}</div>` : ''}</div></div>${body}</section>`;
  }
  function more(k, list, n, row) {
    return list.map((x, i) => i < n ? row(x) : `<div class="lib-x">${row(x)}</div>`).join('') + (list.length > n ? `<button class="dw-more" data-act="libMore" data-k="${k}" data-n="${list.length}">Tümünü göster (${list.length}) ▾</button>` : '');
  }

  // ── SVERIGES RADIO ────────────────────────────────────────
  // Resmî gömme oynatıcı: sverigesradio.se/embed/episode/{id}. Bölüm listesi SR'nin açık API'sinden
  // (api.sr.se) tarayıcıda çekilir; erişilemezse program sayfası bağlantısı gösterilir.
  // SR koşulları: yalnızca bağlantı/akış, içerik değiştirilmez, kaynak açıkça "Sveriges Radio".
  const SR = [
    // [anahtar, ad, programid (doğrulanmış) ya da null → adla aranır, seviye, Türkçe açıklama, kategori]
    ['latt', 'Radio Sweden på lätt svenska', 4916, 'A2–B1', 'Her gün birkaç dakikalık haber; yavaş ve kolay İsveççe. SFI\'da kullanılıyor. Metni de sitede var — önce dinle, sonra metinle kontrol et.', 'kolay'],
    ['klartext', 'Klartext', null, 'B1', 'P4\'ün sade dilli haber bülteni; Radio Sweden\'dan biraz daha hızlı.', 'kolay'],
    ['ekot', 'Ekot', null, 'B2', 'Sveriges Radio\'nun ana haber programı; gerçek hızda, sadeleştirilmemiş haber dili.', 'orta'],
    ['kropp', 'Kropp och själ', null, 'B2', 'Sağlık, tıp ve psikoloji üzerine P1 programı — mesleğine yakın kelime hazinesi.', 'orta'],
    ['vetenskap', 'Vetenskapsradion', null, 'B2', 'Bilim haberleri; araştırma, sağlık ve hayvanlar dahil.', 'orta'],
    ['spraket', 'Språket', null, 'B2', 'Dil soruları ve kelimelerin kökeni; Språkrådet uzmanlarıyla.', 'orta'],
    ['sommar', 'Sommar & Vinter i P1', null, 'B2–C1', 'İsveç\'in en çok dinlenen programı: tanınmış kişiler kendi hayat hikâyelerini anlatıyor.', 'ileri'],
    ['p3dok', 'P3 Dokumentär', 2519, 'C1', 'İsveç\'in en popüler belgesel podcastı; yakın tarih ve önemli olaylar.', 'ileri'],
    ['p3hist', 'P3 Historia', null, 'C1', 'Tarihî olaylar ve kişiler, anlatı biçiminde.', 'ileri'],
    ['lordag', 'Ekots lördagsintervju', null, 'C1', 'Cumartesi günleri politikacılarla uzun röportaj; resmî ve tartışmacı dil.', 'ileri'],
  ];
  const SRK = Object.fromEntries(SR.map(r => [r[0], r]));
  const srCache = {};
  function srFrame(id, title) {
    return `<iframe class="sr-frame" title="${attr(title || 'Sveriges Radio')}" src="https://sverigesradio.se/embed/episode/${encodeURIComponent(id)}" frameborder="0" allow="autoplay" loading="lazy"></iframe>
      <div class="sr-credit">Ljud: <b>Sveriges Radio</b></div>`;
  }
  function srGet(path) {   // önce CORS fetch, olmazsa JSONP
    const url = 'https://api.sr.se/api/v2/' + path + (path.includes('?') ? '&' : '?') + 'format=json';
    return fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }).catch(() => new Promise((res, rej) => {
      const cb = '__sr' + Math.random().toString(36).slice(2), s = document.createElement('script');
      const done = (v, e) => { clearTimeout(tm); delete window[cb]; s.remove(); e ? rej(e) : res(v); };
      const tm = setTimeout(() => done(null, new Error('timeout')), 8000);
      window[cb] = v => done(v); s.onerror = () => done(null, new Error('jsonp'));
      s.src = url + '&callback=' + cb; document.head.appendChild(s);
    }));
  }
  async function srProgramId(r) {
    if (r[2]) return r[2];
    const k = 'sh_srpid_' + r[0], c = LS.get(k, null); if (c) return c;
    const d = await srGet('programs/search?query=' + encodeURIComponent(r[1]) + '&size=10');
    const norm = s => String(s || '').toLowerCase().replace(/[&]/g, 'och').replace(/\s+/g, ' ').trim();
    const list = d?.programs || [];
    const hit = list.find(p => norm(p.name) === norm(r[1])) || list.find(p => norm(p.name).includes(norm(r[1])));
    if (!hit) throw new Error('not found');
    LS.set(k, hit.id); return hit.id;
  }
  function srDate(s) { const m = /Date\((\d+)/.exec(s || ''); return m ? new Date(+m[1]).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }) : ''; }
  async function srLoad(k) {
    const r = SRK[k], box = document.getElementById('srl-' + k); if (!r || !box) return;
    box.innerHTML = '<div class="lib-note">Bölümler yükleniyor…</div>';
    try {
      const id = await srProgramId(r);
      const d = srCache[id] || (srCache[id] = await srGet('episodes/index?programid=' + id + '&size=6'));
      const eps = (d?.episodes || []).filter(e => e.id);
      if (!eps.length) throw new Error('empty');
      box.innerHTML = `<div id="srp-${k}" class="sr-player">${srFrame(eps[0].id, eps[0].title)}</div>
        <div class="sr-eps">${eps.map(e => `<button class="sr-ep" data-act="srPlay" data-k="${k}" data-id="${attr(e.id)}" data-title="${attr(e.title)}">
          <span class="sr-ep-t">▶ ${esc(e.title)}</span><span class="sr-ep-d">${esc(srDate(e.publishdateutc))}</span></button>`).join('')}</div>
        <div class="lib-foot">${link('https://sverigesradio.se/avsnitt?programid=' + id, 'Tüm bölümler — Sveriges Radio ↗')}</div>`;
    } catch (e) {
      const url = r[2] ? 'https://sverigesradio.se/avsnitt?programid=' + r[2] : 'https://sverigesradio.se/sok?query=' + encodeURIComponent(r[1]);
      box.innerHTML = `<div class="lib-note">Bölüm listesi şu an yüklenemedi. ${link(url, 'Sveriges Radio\'da dinle ↗')}</div>`;
    }
  }
  function srCard(r) {
    const [k, name, , lvl, desc] = r;
    return `<div class="sr-card"><div class="sr-card-h"><b>${esc(name)}</b> <span class="lib-lvl">${esc(lvl)}</span></div>
      <div class="lib-desc">${esc(desc)}</div>
      <div id="srl-${k}" class="sr-box"><button class="btn-ghost btn-xs" data-act="srLoad" data-k="${k}">▶ Son bölümleri getir ve dinle</button></div></div>`;
  }

  // ── EN ÇOK DİNLENENLER (öneri) ────────────────────────────
  // Kaynak: poddkoll.se topplista, 7 Ekim 2026 (gerçek dinlenme rakamlarına dayalı, ölçüm kuruluşu belirtilmemiş)
  const TOP = [
    ['Rättegångspodden', '', 'Gerçek mahkeme kayıtları; hukuk dili ve resmî konuşma (zor).'],
    ['P3 Dokumentär', 'p3dok', 'Sveriges Radio — yukarıdan uygulama içinde dinleyebilirsin.'],
    ['Svenska fall podcast', '', 'İsveç\'teki suç vakaları.'],
    ['ursäkta', '', 'Mizah ve sohbet.'],
    ['Spöktimmen', '', 'Doğaüstü hikâyeler; anlatı dili.'],
    ['Kansli – med Jessica & Sebastian', '', 'Gündelik sohbet.'],
    ['Alex & Sigges podcast', '', 'İki yazarın haftalık sohbeti; doğal, hızlı konuşma dili.'],
    ['Historiepodden', '', 'Tarih; açık ve düzenli anlatım.'],
    ['Fallen jag aldrig glömmer', '', 'Eski bir polisin anlattığı vakalar.'],
    ['Framgångspodden', '', 'Röportajlar: kariyer, sağlık, hayat.'],
  ];
  const spot = n => 'https://open.spotify.com/search/' + encodeURIComponent(n) + '/podcasts';
  const apple = n => 'https://podcasts.apple.com/se/search?term=' + encodeURIComponent(n);
  function scFrame(url, title, h) {
    return `<iframe class="lib-sc" style="height:${h}px" title="${attr(title)}" scrolling="no" frameborder="no" allow="autoplay" loading="lazy"
      src="https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23a07de8&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"></iframe>`;
  }
  function render() {
    const nEx = Object.keys(window.SAG_EX || {}).length;
    const nav = [['sr', '📻 Sveriges Radio'], ['topp', '🔥 En çok dinlenenler'], ['verket', '🎙️ Verket'], ['dikter', '📜 Şiirler'], ['noveller', '📖 Öyküler'], ['ljud', '🎧 Diğer kayıtlar'], ['film', '🎬 Filmler'], ['sa', '📘 Svenska Akademien']]
      .map(([k, t]) => `<a href="#lib-${k}" data-act="libJump" data-k="${k}">${t}</a>`).join('');
    const verket = sec('verket', '🎙️', 'Verket – en podd om klassiker', 'Litteraturbanken · Nationalmuseum · Dramaten · Stockholms universitet',
      `<p class="lib-p">Her bölümde bir edebiyat ya da sanat uzmanı tek bir klasik eseri doğal, akıcı İsveççeyle anlatıyor. Gerçek konuşma dilini dinlemek için çok iyi; önce eserin kısa özetini oku, sonra dinle.</p>
       <div class="lib-embed">${scFrame('https://soundcloud.com/verketpodcast', 'Verket – en podd om klassiker', 450)}
         <div class="lib-note">Tüm bölümler oynatıcının listesinde. Ses: Litteraturbanken / Verket (SoundCloud).</div></div>
       <div class="lib-h4">Son bölüm: Barnen ifrån Frostmofjället</div>
       <div class="lib-embed">${scFrame('https://soundcloud.com/verketpodcast/47-barnen-ifra-n-frostmofja', 'Verket: Barnen ifrån Frostmofjället', 166)}</div>
       <div class="lib-list">${VERKET.map(([u, t, a, d]) => `<div class="lib-row"><div class="lib-row-main"><b>${esc(t)}</b> <span class="lib-meta">${esc(a)}</span>${d ? `<div class="lib-desc">${esc(d)}</div>` : ''}</div>${link(LB + u, 'Bölüm sayfası ↗', 'lib-btn')}</div>`).join('')}</div>
       <div class="lib-foot">${link(LB + 'verket/', 'Tüm bölümler (Litteraturbanken) ↗')}</div>`, 'B2–C1');
    const dikter = sec('dikter', '📜', 'Tio klassiska dikter', 'On klasik şiir — oyuncuların ve şairlerin kendi seslerinden',
      `<p class="lib-p">Kısa şiirler telaffuz ve vurgu çalışmak için idealdir: önce metni Litteraturbanken'de oku, sonra kaydı dinle, en son sesli tekrar et.</p>
       <div class="lib-list">${DIKTER.map(([t, a, id]) => `<div class="lib-row"><div class="lib-row-main"><b>${esc(t)}</b> <span class="lib-meta">${esc(a)}</span></div>
         <div class="lib-acts">${link(LB + '2021/10/31/tio-klassiska-dikter/', '▶ Dinle ↗', 'lib-btn')}${link('https://litteraturbanken.se/författare/' + id, '📖 Oku ↗', 'lib-btn')}</div></div>`).join('')}</div>`, 'B2+');
    const noveller = sec('noveller', '📖', 'Tio klassiska noveller', 'On klasik öykü — sesli okuma',
      `<p class="lib-p">Öyküler 5–30 dakika sürer. <b>Ett halvt ark papper</b> (Strindberg) tek sayfalık ve sade; başlamak için en iyisi.</p>
       <div class="lib-list">${NOVELLER.map(([t, a, d]) => `<div class="lib-row"><div class="lib-row-main"><b>${esc(t)}</b> <span class="lib-meta">${esc(a)}</span>${d ? `<div class="lib-desc">${esc(d)}</div>` : ''}</div>${link(LB + '2021/10/31/tio-klassiska-noveller/', '▶ Dinle ↗', 'lib-btn')}</div>`).join('')}</div>`, 'B2+');
    const ljud = sec('ljud', '🎧', 'Diğer kayıtlar ve tarihî sesler', 'Sesli kitaplar, okumalar ve eski radyo kayıtları',
      `<div class="lib-list">${LJUD.concat(RÖSTER).map(([u, t, d]) => `<div class="lib-row"><div class="lib-row-main"><b>${esc(t)}</b>${d ? `<div class="lib-desc">${esc(d)}</div>` : ''}</div>${link(LB + u, '▶ Dinle ↗', 'lib-btn')}</div>`).join('')}</div>
       <div class="lib-foot">${link(LB + 'dikt-1593-1939/', 'Dikt 1593–1939: şiir antolojisi ↗')} · ${link(LB + 'titlar/', 'Tüm kayıtlar A–Ö ↗')} · ${link('https://litteraturbanken.se/diktensmuseum/', 'Diktens museum ↗')}</div>`, 'B2–C1');
    const film = sec('film', '🎬', 'Filmler', 'Litteraturbanken film arşivi — sessiz filmler ve belgeseller',
      `<p class="lib-p">Sessiz filmlerdeki ara yazılar kısa, okunaklı İsveççe metinlerdir; okuma hızını artırmak için iyi bir pratik.</p>
       <div class="lib-list">${more('film', FILM, 6, ([u, t, d]) => `<div class="lib-row"><div class="lib-row-main"><b>${esc(t)}</b>${d ? `<div class="lib-desc">${esc(d)}</div>` : ''}</div>${link(LB + u, '▶ İzle ↗', 'lib-btn')}</div>`)}</div>`, '');
    const sa = sec('sa', '📘', 'Svenska Akademien — kitaplar', 'İsveççenin norm kurumu: sözlükler, gramer, klasikler',
      `<div class="lib-callout">💡 Uygulamada <b>${nEx}</b> kelimenin kartında Svenska Akademiens grammatik'ten alınmış bir örnek cümle (Türkçe çevirisiyle) ve her kelime için <b>SO</b> (anlam ve örnek cümleler) ile <b>SAOL</b> (çekim) bağlantıları var.</div>
       <h4 class="lib-h4">Dil kitapları ve sözlükler</h4>
       <div class="lib-books">${SPRAK.map(([t, d, links, tag]) => `<div class="lib-book"><div class="lib-book-t">${esc(t)} <span class="lib-tag">${esc(tag)}</span></div><div class="lib-desc">${esc(d)}</div><div class="lib-acts">${links.map(([u, l]) => link(u, esc(l) + ' ↗', 'lib-btn')).join('')}</div></div>`).join('')}</div>
       <h4 class="lib-h4">Şiir antolojileri</h4>
       <div class="lib-books">${POESI.map(([t, d, links]) => `<div class="lib-book"><div class="lib-book-t">${esc(t)}</div><div class="lib-desc">${esc(d)}</div><div class="lib-acts">${links.map(([u, l]) => link(u, esc(l) + ' ↗', 'lib-btn')).join('')}</div></div>`).join('')}</div>
       <h4 class="lib-h4">Svenska klassiker serisi (${KLASSIKER.length} kitap)</h4>
       <p class="lib-p">Svenska Akademien'in klasik eser dizisi. Klasik yazarların eserlerinin çoğunu ${link('https://litteraturbanken.se/', 'Litteraturbanken')}'de ücretsiz okuyabilirsin.</p>
       <div class="lib-list">${more('klassiker', KLASSIKER, 10, ([t, a, slug]) => `<div class="lib-row"><div class="lib-row-main"><b>${esc(t)}</b> <span class="lib-meta">${esc(a)}</span></div>${link(SA + 'svenska-klassiker/' + slug, 'Kitap ↗', 'lib-btn')}</div>`)}</div>`, '');
    const grp = (g, t) => `<h4 class="lib-h4">${t}</h4><div class="sr-grid">${SR.filter(r => r[5] === g).map(srCard).join('')}</div>`;
    const sr = sec('sr', '📻', 'Sveriges Radio — podcastlar', 'Uygulama içinde dinle · Ljud: Sveriges Radio',
      `<p class="lib-p">Seviyene göre sıralandı. Önce <b>kolay</b> programlarla başla; haberleri anlıyorsan <b>orta</b>, uzun anlatıları takip edebiliyorsan <b>ileri</b> seviyeye geç. Her programda en yeni bölümler listelenir ve SR'nin kendi oynatıcısıyla burada çalar.</p>
       ${grp('kolay', '🟢 Kolay — öğrenenler için')}${grp('orta', '🟡 Orta — gerçek hızda, net konuşma')}${grp('ileri', '🔴 İleri — uzun anlatı ve tartışma')}`, 'A2–C1');
    const topp = sec('topp', '🔥', 'En çok dinlenen podcastlar — öneri', 'İsveç topplistan: poddkoll.se, 7 Ekim 2026',
      `<p class="lib-p">İsveçlilerin şu an en çok dinlediği podcastlar. Bunlar doğal, hızlı günlük İsveççedir — B2 ve üstü için iyi bir hedef. Liste düzenli değişir.</p>
       <div class="lib-list">${TOP.map(([n, k, d], i) => `<div class="lib-row"><div class="lib-row-main"><span class="top-n">${i + 1}</span><b>${esc(n)}</b>${k ? ' <span class="lib-tag">Sveriges Radio</span>' : ''}<div class="lib-desc">${esc(d)}</div></div>
         <div class="lib-acts">${k ? `<button class="lib-btn" data-act="libJump" data-k="sr">▶ Burada dinle</button>` : `${link(spot(n), 'Spotify ↗', 'lib-btn')}${link(apple(n), 'Apple ↗', 'lib-btn')}`}</div></div>`).join('')}</div>
       <div class="lib-foot">${link('https://poddkoll.se/topplista', 'Güncel liste: poddkoll.se ↗')} · ${link('https://www.sverigesradio.se/artikel/topplista-mest-lyssnade-sommarpraten-2026', 'En çok dinlenen Sommar bölümleri 2026 ↗')}</div>`, '');
    return `<div class="fade-in lib">
      <div class="section-head"><h2 class="pane-h2">🎧 Bibliotek</h2><span class="lib-sub">Dinle, izle, oku — Litteraturbanken ve Svenska Akademien</span></div>
      <div class="lib-nav">${nav}</div>
      <div class="lib-callout">📻 <b>Sveriges Radio</b> ve 🎙️ <b>Verket</b> podcastları burada, uygulamanın içinde çalar. Litteraturbanken'in şiir, öykü ve film kayıtları telif nedeniyle onların sitesinde açılır.</div>
      ${sr}${topp}${verket}${dikter}${noveller}${ljud}${film}${sa}</div>`;
  }
  ACTIONS.libJump = (d) => { const el = document.getElementById('lib-' + d.k); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  window.SAX = { ex, block, mini, soBtn };
  window.Library = { render };
})();
