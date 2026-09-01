// ═══════════════════════════════════════════════════════════
// SVENSKA HERALD — LEKTIONSINNEHÅLL / DERS İÇERİĞİ
// Alan biçimi: {sv, tr, form, uttal, ex, tip}
//   form  = çekim (en/ett + belirli/çoğul, ya da fiil çekimi)
//   uttal = Türk okuyucu için telaffuz yaklaşımı
// ═══════════════════════════════════════════════════════════

const COLORS = {
  red: "#e05c6a", teal: "#38c9b8", green: "#3fc87a",
  purple: "#a07de8", gold: "#e8c24a", blue: "#5b9cf6", orange: "#f0944d",
};

const CONTENT = {

  // ════════════════ VETERINÄRMEDICIN ════════════════
  vet: {
    label: "Veterinärmedicin", icon: "🐾", color: "orange", units: [

      { title: "Kliniska grundtermer", source: "Svensk Veterinärtidning",
        headline: '"Vid varje undersökning ska anamnes, status och bedömning dokumenteras i journalen — annars saknas underlag för uppföljning."',
        vocab: [
          { sv: "anamnes", tr: "anamnez, hasta öyküsü", form: "en anamnes – anamnesen – anamneser", uttal: "anamnÉÉs", ex: "Ägaren uppger i anamnesen att hunden kräkts i tre dagar.", tip: "Journalın ilk bölümü. Türkçedeki 'anamnez' ile aynı kök (Yunanca anamnēsis)." },
          { sv: "status", tr: "muayene bulguları", form: "ett status – statuset", uttal: "stÁÁtus", ex: "I status noteras temp 39,8 °C och kraftig buksmärta.", tip: "İngilizcedeki 'status' değil — burada 'fizik muayene bulguları' demek." },
          { sv: "bedömning", tr: "değerlendirme, klinik kanaat", form: "en bedömning – bedömningen – bedömningar", uttal: "be-DÖÖM-ning", ex: "Bedömning: sannolikt akut gastroenterit.", tip: "'bedöma' (değerlendirmek) fiilinden. Diagnoz değil, senin yorumun." },
          { sv: "åtgärd", tr: "yapılan işlem, müdahale", form: "en åtgärd – åtgärden – åtgärder", uttal: "OT-yäärd", ex: "Åtgärd: vätsketerapi intravenöst samt smärtlindring.", tip: "'åt' + 'gärd'. Sık kalıp: 'vidta åtgärder' = önlem almak." },
          { sv: "undersökning", tr: "muayene, inceleme", form: "en undersökning – undersökningen – undersökningar", uttal: "UNN-der-sööknıng", ex: "En klinisk undersökning visade inga avvikelser.", tip: "'undersöka' fiilinden. 'utredning' = daha geniş tetkik süreci." },
          { sv: "avvikelse", tr: "sapma, anormallik", form: "en avvikelse – avvikelsen – avvikelser", uttal: "AAV-viikelse", ex: "Inga avvikelser i hjärt- och lungauskultation.", tip: "Journalda çok geçer. 'utan anmärkning (u.a.)' ile aynı anlamda kullanılır." },
          { sv: "symtom", tr: "semptom, belirti", form: "ett symtom – symtomet – symtom", uttal: "SÜMM-tom", ex: "Symtomen debuterade akut i går kväll.", tip: "İsveççede 'symptom' değil 'symtom' — p yok! Sık yapılan yazım hatası." },
          { sv: "behandling", tr: "tedavi", form: "en behandling – behandlingen – behandlingar", uttal: "be-HAND-lıng", ex: "Behandlingen sattes in omedelbart.", tip: "'behandla' fiilinden. 'sätta in behandling' = tedaviye başlamak." },
          { sv: "prognos", tr: "prognoz, gidişat", form: "en prognos – prognosen – prognoser", uttal: "prong-NÔÔS", ex: "Prognosen bedöms som god vid tidig behandling.", tip: "'god / försiktig / dålig prognos' üçlüsü standart ifadedir." },
          { sv: "uppföljning", tr: "takip, kontrol", form: "en uppföljning – uppföljningen – uppföljningar", uttal: "UPP-föl-yning", ex: "Uppföljning om tio dagar för suturtagning.", tip: "'återbesök' = kontrol randevusu. İkisi de journalda geçer." },
        ],
        quiz: [
          { q: "Journalda hastanın öyküsünü hangi başlık altında yazarsın?", a: "anamnes", o: ["anamnes", "status", "åtgärd", "prognos"] },
          { q: '"Inga avvikelser" ne demek?', a: "Anormallik yok", o: ["Anormallik yok", "Tedavi yok", "Sonuç yok", "Takip yok"] },
          { q: "'Semptom' İsveççe nasıl yazılır?", a: "symtom", o: ["symtom", "symptom", "symptomen", "simtom"] },
          { q: "'Åtgärd' journalın hangi kısmıdır?", a: "Yapılan işlem", o: ["Yapılan işlem", "Hasta öyküsü", "Muayene bulgusu", "Gidişat tahmini"] },
        ] },

      { title: "Smådjur — hund & katt", source: "SVA — Statens veterinärmedicinska anstalt",
        headline: '"Kastrering av hankatt är ett rutiningrepp, men djurägaren ska alltid informeras om narkosrisken före operationen."',
        vocab: [
          { sv: "hund", tr: "köpek", form: "en hund – hunden – hundar", uttal: "hund", ex: "Hunden är en sex år gammal labrador.", tip: "'hane' = erkek, 'tik' = dişi köpek. Journalda cinsiyet böyle yazılır." },
          { sv: "katt", tr: "kedi", form: "en katt – katten – katter", uttal: "katt", ex: "Katten är inomhuskatt och vaccinerad.", tip: "'hankatt' = erkek kedi, 'honkatt' = dişi kedi." },
          { sv: "kastrering", tr: "kısırlaştırma", form: "en kastrering – kastreringen – kastreringar", uttal: "kast-RÉÉ-ring", ex: "Kastrering utfördes utan komplikationer.", tip: "Fiil: 'kastrera'. Dişi için 'sterilisering' de kullanılır." },
          { sv: "vaccination", tr: "aşılama", form: "en vaccination – vaccinationen – vaccinationer", uttal: "vaksinaşÔÔN", ex: "Grundvaccination gavs vid åtta veckors ålder.", tip: "Kısaltma: 'vacc'. 'vaccinera' = aşılamak." },
          { sv: "avmaskning", tr: "paraziter tedavi, solucan düşürme", form: "en avmaskning – avmaskningen – avmaskningar", uttal: "AAV-maskning", ex: "Avmaskning rekommenderas var tredje månad.", tip: "'mask' = solucan; 'av-' öneki 'uzaklaştırma' katıyor." },
          { sv: "klösa", tr: "tırmalamak", form: "klösa – klöser – klöste – klöst", uttal: "KLÖÖ-sa", ex: "Katten klöste ägaren under undersökningen.", tip: "'bita' = ısırmak. İkisi de olay kaydında geçer." },
          { sv: "halta", tr: "topallamak", form: "halta – haltar – haltade – haltat", uttal: "HALL-ta", ex: "Hunden haltar på vänster framben.", tip: "İsim: 'hälta'. 'grad 2 hälta' gibi derecelendirilir." },
          { sv: "klåda", tr: "kaşıntı", form: "en klåda – klådan", uttal: "KLÔÔ-da", ex: "Ägaren beskriver kraftig klåda sedan två veckor.", tip: "'kliar sig' = kaşınıyor. Alerji vakalarının anahtar kelimesi." },
          { sv: "päls", tr: "tüy, post", form: "en päls – pälsen – pälsar", uttal: "pels", ex: "Pälsen är matt och håravfall ses över ryggen.", tip: "'håravfall' = tüy dökülmesi, 'kal fläck' = kel bölge." },
          { sv: "tass", tr: "pati", form: "en tass – tassen – tassar", uttal: "tass", ex: "Sår mellan tårna på höger baktass.", tip: "'tå/tår' = parmak, 'trampdyna' = pati yastığı, 'klo/klor' = tırnak." },
          { sv: "foder", tr: "mama, yem", form: "ett foder – fodret", uttal: "FÔÔ-der", ex: "Ägaren har bytt foder nyligen.", tip: "'utfodra' = beslemek. Beslenme değişikliği anamnezin klasik sorusudur." },
          { sv: "kräkas", tr: "kusmak", form: "kräkas – kräks – kräktes – kräkts", uttal: "KREE-kas", ex: "Hunden har kräkts fem gånger sedan i går.", tip: "Deponens fiil (-s ile biter ama edilgen değil). İsim: 'kräkning'." },
        ],
        quiz: [
          { q: "'Klåda' ne demek?", a: "kaşıntı", o: ["kaşıntı", "topallama", "kusma", "ateş"] },
          { q: "Köpek sol ön bacağını topallıyor: ___", a: "Hunden haltar på vänster framben", o: ["Hunden haltar på vänster framben", "Hunden klöser vänster framben", "Hunden kräks på vänster framben", "Hunden biter vänster framben"] },
          { q: "'Tik' hangi hayvanı belirtir?", a: "Dişi köpek", o: ["Dişi köpek", "Erkek köpek", "Dişi kedi", "Yavru"] },
          { q: "'Kräkas' fiilinin geçmiş zamanı?", a: "kräktes", o: ["kräktes", "kräkade", "kräkte", "kräkts"] },
        ] },

      { title: "Häst & lantbruksdjur", source: "Jordbruksverket",
        headline: '"Vid misstanke om epizootisk sjukdom hos lantbruksdjur ska veterinären omedelbart kontakta Jordbruksverket."',
        vocab: [
          { sv: "häst", tr: "at", form: "en häst – hästen – hästar", uttal: "hest", ex: "Hästen är ett sto på tolv år.", tip: "'sto' = kısrak, 'hingst' = aygır, 'valack' = iğdiş at, 'föl' = tay." },
          { sv: "nötkreatur", tr: "sığır", form: "ett nötkreatur – nötkreaturet – nötkreatur", uttal: "NÖÖT-kreatuur", ex: "Besättningen består av 120 nötkreatur.", tip: "'ko' = inek, 'tjur' = boğa, 'kviga' = düve, 'kalv' = buzağı." },
          { sv: "besättning", tr: "sürü, hayvan varlığı", form: "en besättning – besättningen – besättningar", uttal: "be-SETT-nıng", ex: "Hela besättningen provtogs.", tip: "Çiftlik hayvanlarında 'sürü' için standart resmî terim." },
          { sv: "juver", tr: "meme (büyükbaş)", form: "ett juver – juvret – juver", uttal: "YÜÜ-ver", ex: "Juvret är svullet och varmt i höger fjärdedel.", tip: "'juverinflammation / mastit' = meme iltihabı, süt sığırcılığının en sık sorunu." },
          { sv: "hov", tr: "toynak (at)", form: "en hov – hoven – hovar", uttal: "hôôv", ex: "Hoven visar tecken på fång.", tip: "Sığırda 'klöv' denir. 'fång' = laminitis." },
          { sv: "epizooti", tr: "epizooti, ihbarı zorunlu salgın", form: "en epizooti – epizootin – epizootier", uttal: "epi-zo-o-TÎÎ", ex: "Misstänkt epizooti ska anmälas omgående.", tip: "İsveç'te bildirimi yasal zorunluluk. 'anmälningspliktig' = bildirimi zorunlu." },
          { sv: "smittskydd", tr: "bulaş kontrolü", form: "ett smittskydd – smittskyddet", uttal: "SMİTT-şüdd", ex: "Goda smittskyddsrutiner minskar spridningen.", tip: "'smitta' = bulaş(mak), 'skydd' = koruma. Çok üretken bir bileşik." },
          { sv: "karantän", tr: "karantina", form: "en karantän – karantänen – karantäner", uttal: "karan-TÉÉN", ex: "Nyinköpta djur hålls i karantän i två veckor.", tip: "Fransızcadan; İsveççe yazımına dikkat: -än sonu." },
          { sv: "obduktion", tr: "otopsi, nekropsi", form: "en obduktion – obduktionen – obduktioner", uttal: "obduk-şÔÔN", ex: "Obduktion utfördes på SVA.", tip: "Hayvanlarda da 'obduktion' denir; 'nekropsi' daha akademik." },
          { sv: "avliva", tr: "ötanazi yapmak", form: "avliva – avlivar – avlivade – avlivat", uttal: "AAV-liiva", ex: "Djuret avlivades av djurskyddsskäl.", tip: "İsim: 'avlivning'. 'eutanasi' de anlaşılır ama günlük dilde 'avliva' kullanılır." },
        ],
        quiz: [
          { q: "'Sto' hangi hayvandır?", a: "Kısrak (dişi at)", o: ["Kısrak (dişi at)", "Aygır", "Tay", "İnek"] },
          { q: "Sığırın ayak ucuna ne denir?", a: "klöv", o: ["klöv", "hov", "tass", "klo"] },
          { q: "'Anmälningspliktig' ne demek?", a: "Bildirimi zorunlu", o: ["Bildirimi zorunlu", "Tedavisi zorunlu", "Aşısı zorunlu", "Ücretli"] },
          { q: "'Avliva' ne anlama gelir?", a: "Ötanazi yapmak", o: ["Ötanazi yapmak", "Canlandırmak", "Aşılamak", "Ameliyat etmek"] },
        ] },

      { title: "Kirurgi & anestesi", source: "Sveriges Veterinärförbund",
        headline: '"Innan narkos ska djurägaren informeras om riskerna och underteckna ett medgivande."',
        vocab: [
          { sv: "ingrepp", tr: "girişim, operasyon", form: "ett ingrepp – ingreppet – ingrepp", uttal: "İNN-grepp", ex: "Ingreppet tog cirka fyrtio minuter.", tip: "'rutiningrepp' = rutin operasyon. 'operation' ile eşanlamlı ama daha nötr." },
          { sv: "narkos", tr: "genel anestezi", form: "en narkos – narkosen – narkoser", uttal: "nar-KÔÔS", ex: "Djuret sövdes med propofol.", tip: "'söva' = uyutmak, 'vakna ur narkosen' = anesteziden çıkmak." },
          { sv: "bedövning", tr: "lokal anestezi", form: "en bedövning – bedövningen – bedövningar", uttal: "be-DÖÖV-ning", ex: "Lokalbedövning gavs innan suturering.", tip: "'narkos' = genel, 'bedövning' = lokal. Karıştırma!" },
          { sv: "snitt", tr: "insizyon, kesi", form: "ett snitt – snittet – snitt", uttal: "snitt", ex: "Ett snitt lades i medellinjen.", tip: "'lägga ett snitt' = kesi yapmak. 'kejsarsnitt' = sezaryen." },
          { sv: "sutur", tr: "sütür, dikiş", form: "en sutur – suturen – suturer", uttal: "su-TÜÜR", ex: "Suturerna tas om tio dagar.", tip: "'suturtagning' = dikiş alma. 'sy' = dikmek (günlük dilde)." },
          { sv: "sårvård", tr: "yara bakımı", form: "en sårvård – sårvården", uttal: "SÔÔR-vord", ex: "Sårvård utförs dagligen med koksaltlösning.", tip: "'sår' = yara, 'vård' = bakım. 'sårläkning' = yara iyileşmesi." },
          { sv: "blödning", tr: "kanama", form: "en blödning – blödningen – blödningar", uttal: "BLÖÖD-ning", ex: "Ingen postoperativ blödning noterades.", tip: "'blöda' fiilinden. 'stoppa blödningen' = kanamayı durdurmak." },
          { sv: "komplikation", tr: "komplikasyon", form: "en komplikation – komplikationen – komplikationer", uttal: "komplika-şÔÔN", ex: "Operationen förlöpte utan komplikationer.", tip: "'förlöpa utan komplikationer' hazır kalıptır, ezberle." },
          { sv: "smärtlindring", tr: "ağrı kesici tedavi", form: "en smärtlindring – smärtlindringen", uttal: "SMEERT-lindring", ex: "Smärtlindring gavs i tio dagar postoperativt.", tip: "'smärta' = ağrı, 'lindra' = hafifletmek. 'analgetika' = ağrı kesici ilaçlar." },
          { sv: "medgivande", tr: "onam, rıza", form: "ett medgivande – medgivandet – medgivanden", uttal: "MÉÉD-yiivande", ex: "Skriftligt medgivande inhämtades före ingreppet.", tip: "'samtycke' de aynı anlamda kullanılır; hukuki metinlerde ikisi de geçer." },
        ],
        quiz: [
          { q: "Genel anestezi hangisidir?", a: "narkos", o: ["narkos", "bedövning", "smärtlindring", "sårvård"] },
          { q: "'Operationen förlöpte utan komplikationer' ne demek?", a: "Operasyon komplikasyonsuz geçti", o: ["Operasyon komplikasyonsuz geçti", "Operasyon iptal edildi", "Operasyon uzun sürdü", "Operasyon başarısızdı"] },
          { q: "'Suturtagning' ne zaman yapılır?", a: "Dikiş alınırken", o: ["Dikiş alınırken", "Ameliyat başında", "Aşı sırasında", "Otopside"] },
          { q: "'Medgivande' ile eşanlamlı olan?", a: "samtycke", o: ["samtycke", "bedömning", "anamnes", "åtgärd"] },
        ] },

      { title: "Laboratorium & diagnostik", source: "SVA Laboratorium",
        headline: '"Provsvaren visade förhöjda leverenzymer, vilket föranledde vidare utredning med ultraljud."',
        vocab: [
          { sv: "prov", tr: "numune, test", form: "ett prov – provet – prover", uttal: "prôôv", ex: "Prov togs för blodstatus och biokemi.", tip: "'ta prov' = numune almak, 'provsvar' = test sonucu, 'provtagning' = numune alma." },
          { sv: "blodprov", tr: "kan tahlili", form: "ett blodprov – blodprovet – blodprover", uttal: "BLÔÔD-prôôv", ex: "Blodprovet visade leukocytos.", tip: "'urinprov' = idrar, 'avföringsprov' = dışkı numunesi." },
          { sv: "förhöjd", tr: "yüksek, artmış", form: "förhöjd – förhöjt – förhöjda", uttal: "för-HÖYD", ex: "Förhöjda njurvärden noterades.", tip: "Karşıtı: 'sänkt' = düşük. 'värden' = değerler." },
          { sv: "referensvärde", tr: "referans değeri", form: "ett referensvärde – referensvärdet – referensvärden", uttal: "refe-RENNS-veerde", ex: "Samtliga värden ligger inom referensvärdena.", tip: "'inom / utanför referensvärdet' = normal sınırlar içinde / dışında." },
          { sv: "odling", tr: "kültür", form: "en odling – odlingen – odlingar", uttal: "ÔÔD-ling", ex: "Bakteriologisk odling med resistensbestämning beställdes.", tip: "'resistensbestämning' = antibiyogram. Antibiyotik direnci konusunda kilit terim." },
          { sv: "röntgen", tr: "röntgen", form: "en röntgen – röntgen", uttal: "RÖNT-yen", ex: "Röntgen av thorax visade inga förändringar.", tip: "'g' burada 'y' okunur. Fiil: 'röntga'." },
          { sv: "ultraljud", tr: "ultrason", form: "ett ultraljud – ultraljudet", uttal: "ULL-tra-yuud", ex: "Ultraljud av buken utfördes.", tip: "'ljud' = ses; 'j' Türkçedeki 'y' gibi okunur." },
          { sv: "förändring", tr: "değişiklik, lezyon", form: "en förändring – förändringen – förändringar", uttal: "för-ENN-dring", ex: "Inga patologiska förändringar kunde påvisas.", tip: "Görüntülemede 'lezyon' yerine bu kelime kullanılır." },
          { sv: "påvisa", tr: "saptamak, göstermek", form: "påvisa – påvisar – påvisade – påvisat", uttal: "PÔÔ-viisa", ex: "Bakterier kunde påvisas i urinen.", tip: "'kunde inte påvisas' = saptanamadı. Rapor dilinin klasik kalıbı." },
          { sv: "remiss", tr: "sevk, konsültasyon istemi", form: "en remiss – remissen – remisser", uttal: "re-MİSS", ex: "Remiss skickades till specialistklinik.", tip: "'skriva en remiss' = sevk yazmak. Hem insan hem veteriner hekimlikte kullanılır." },
        ],
        quiz: [
          { q: "'Provsvar' ne demek?", a: "Test sonucu", o: ["Test sonucu", "Numune tüpü", "Test isteği", "Laboratuvar"] },
          { q: "Antibiyogram İsveççe nasıl ifade edilir?", a: "resistensbestämning", o: ["resistensbestämning", "referensvärde", "provtagning", "odlingsrör"] },
          { q: "'Kunde inte påvisas' ne anlama gelir?", a: "Saptanamadı", o: ["Saptanamadı", "Kesin saptandı", "Şüpheli", "Tekrar edilecek"] },
          { q: "Uzmana yönlendirmek için ne yazarsın?", a: "en remiss", o: ["en remiss", "ett prov", "en odling", "en åtgärd"] },
        ] },

      { title: "Farmakologi & recept", source: "Läkemedelsverket",
        headline: '"Antibiotika ska förskrivas restriktivt och alltid efter odling när det är möjligt."',
        vocab: [
          { sv: "läkemedel", tr: "ilaç", form: "ett läkemedel – läkemedlet – läkemedel", uttal: "LEEke-meedel", ex: "Läkemedlet ges två gånger dagligen.", tip: "Kısaltma: 'lkm'. 'medicin' günlük dilde, 'läkemedel' resmî dilde." },
          { sv: "dosering", tr: "dozaj", form: "en dosering – doseringen – doseringar", uttal: "do-SÉÉ-ring", ex: "Dosering: 10 mg/kg var tolfte timme.", tip: "'var tolfte timme' = 12 saatte bir. 'x2' = günde iki kez." },
          { sv: "förskriva", tr: "reçete etmek", form: "förskriva – förskriver – förskrev – förskrivit", uttal: "för-SKRİİ-va", ex: "Veterinären förskrev antibiotika i sju dagar.", tip: "İsim: 'förskrivning'. 'skriva ut' günlük eşanlamlısıdır." },
          { sv: "recept", tr: "reçete", form: "ett recept – receptet – recept", uttal: "re-SEPPT", ex: "Receptet skickades elektroniskt till apoteket.", tip: "'e-recept' İsveç'te standarttır. Ayrıca 'yemek tarifi' anlamına da gelir!" },
          { sv: "biverkning", tr: "yan etki", form: "en biverkning – biverkningen – biverkningar", uttal: "Bİİİ-verkning", ex: "Vanliga biverkningar är kräkning och diarré.", tip: "'bi-' = yan, 'verkan' = etki. 'huvudverkan' = ana etki." },
          { sv: "kontraindikation", tr: "kontrendikasyon", form: "en kontraindikation – kontraindikationen – kontraindikationer", uttal: "kontra-indika-şÔÔN", ex: "Dräktighet är en kontraindikation.", tip: "'dräktig' = gebe (hayvan); insanda 'gravid'." },
          { sv: "tablett", tr: "tablet", form: "en tablett – tabletten – tabletter", uttal: "tab-LETT", ex: "En tablett morgon och kväll.", tip: "'kapsel' = kapsül, 'mixtur' = şurup, 'salva' = merhem, 'droppar' = damla." },
          { sv: "injektion", tr: "enjeksiyon", form: "en injektion – injektionen – injektioner", uttal: "inyek-şÔÔN", ex: "Injektionen gavs subkutant.", tip: "Kısaltmalar: iv (damardan), im (kas içi), sc (deri altı), po (ağızdan)." },
          { sv: "karenstid", tr: "arınma süresi (gıda hayvanı)", form: "en karenstid – karenstiden – karenstider", uttal: "ka-RENNS-tiid", ex: "Karenstiden för mjölk är 96 timmar.", tip: "Gıda değeri olan hayvanlarda yasal zorunluluk — veteriner hekimliğe özgü." },
          { sv: "antibiotikaresistens", tr: "antibiyotik direnci", form: "en antibiotikaresistens – antibiotikaresistensen", uttal: "anti-bi-ÔÔ-tika-resistenns", ex: "Antibiotikaresistens är ett växande hot.", tip: "İsveç bu konuda AB'nin en katı ülkelerinden; sınavlarda sık çıkar." },
        ],
        quiz: [
          { q: "'Biverkning' ne demek?", a: "Yan etki", o: ["Yan etki", "Ana etki", "Doz", "Reçete"] },
          { q: "'sc' kısaltması hangi uygulama yoludur?", a: "Deri altı", o: ["Deri altı", "Damar içi", "Kas içi", "Ağızdan"] },
          { q: "Süt için 96 saatlik süre neyi ifade eder?", a: "karenstid", o: ["karenstid", "dosering", "hållbarhet", "behandlingstid"] },
          { q: "'Var tolfte timme' ne demek?", a: "12 saatte bir", o: ["12 saatte bir", "Günde 12 kez", "12 gün boyunca", "Saat 12'de"] },
        ] },

      { title: "Djurägarkommunikation", source: "Agria / Svensk Djursjukvård",
        headline: '"Att förklara en diagnos på ett begripligt sätt är lika viktigt som att ställa den rätt."',
        vocab: [
          { sv: "djurägare", tr: "hayvan sahibi", form: "en djurägare – djurägaren – djurägare", uttal: "YÜÜR-eegare", ex: "Djurägaren informerades om behandlingsplanen.", tip: "'djur' = hayvan, 'ägare' = sahip. 'husdjur' = evcil hayvan." },
          { sv: "bekymrad", tr: "endişeli", form: "bekymrad – bekymrat – bekymrade", uttal: "be-SHÜM-rad", ex: "Ägaren är mycket bekymrad över prognosen.", tip: "'orolig' de endişeli demek ama daha hafif. 'bekymmer' = kaygı." },
          { sv: "förklara", tr: "açıklamak", form: "förklara – förklarar – förklarade – förklarat", uttal: "för-KLÂÂ-ra", ex: "Jag ska förklara vad provsvaren betyder.", tip: "'förklara' = anlatmak; 'förklaring' = açıklama." },
          { sv: "kostnadsförslag", tr: "maliyet tahmini", form: "ett kostnadsförslag – kostnadsförslaget – kostnadsförslag", uttal: "KOSST-nads-för-slaag", ex: "Ett kostnadsförslag lämnades före behandling.", tip: "İsveç'te tedavi öncesi vermek neredeyse zorunlu bir uygulamadır." },
          { sv: "försäkring", tr: "sigorta", form: "en försäkring – försäkringen – försäkringar", uttal: "för-SEEK-ring", ex: "Hunden är försäkrad hos Agria.", tip: "'direktreglering' = kliniğin sigortayla doğrudan mahsuplaşması." },
          { sv: "avvakta", tr: "beklemek, izlemek", form: "avvakta – avvaktar – avvaktade – avvaktat", uttal: "AAV-vakta", ex: "Vi avvaktar med operation tills provsvaren kommer.", tip: "'expektans' resmî karşılığı. Sık kalıp: 'avvakta och observera'." },
          { sv: "informera", tr: "bilgilendirmek", form: "informera – informerar – informerade – informerat", uttal: "infor-MÉÉ-ra", ex: "Ägaren informerades om riskerna.", tip: "Journalda edilgen çatı standarttır: 'ägaren informerades'." },
          { sv: "återbesök", tr: "kontrol randevusu", form: "ett återbesök – återbesöket – återbesök", uttal: "ÔÔ-ter-besöök", ex: "Återbesök bokas om två veckor.", tip: "'boka' = randevu almak, 'avboka' = iptal etmek, 'omboka' = değiştirmek." },
          { sv: "svårt besked", tr: "kötü haber", form: "ett besked – beskedet – besked", uttal: "be-SHÉÉD", ex: "Jag är ledsen att behöva ge er ett svårt besked.", tip: "Kötü haber verirken en yaygın giriş cümlesi. Ezberlemeye değer." },
          { sv: "tacksam", tr: "minnettar", form: "tacksam – tacksamt – tacksamma", uttal: "TAK-sam", ex: "Ägaren var mycket tacksam för hjälpen.", tip: "'Jag är tacksam om ni kan...' = nazik rica kalıbı." },
        ],
        quiz: [
          { q: "'Kostnadsförslag' ne demek?", a: "Maliyet tahmini", o: ["Maliyet tahmini", "Fatura", "Reçete", "Sigorta poliçesi"] },
          { q: "Kötü haber vereceğini nasıl başlatırsın?", a: "Jag är ledsen att behöva ge er ett svårt besked", o: ["Jag är ledsen att behöva ge er ett svårt besked", "Jag är tacksam för hjälpen", "Vi avvaktar med operation", "Ett kostnadsförslag lämnades"] },
          { q: "'Avvakta' ne demek?", a: "Beklemek, izlemek", o: ["Beklemek, izlemek", "Acele etmek", "İptal etmek", "Sevk etmek"] },
          { q: "Kontrol randevusu için doğru kelime?", a: "återbesök", o: ["återbesök", "remiss", "besked", "medgivande"] },
        ] },
    ]
  },

  // ════════════════ HUMANMEDICIN ════════════════
  med: {
    label: "Humanmedicin", icon: "🏥", color: "red", units: [

      { title: "Akutmottagning", source: "1177 Vårdguiden",
        headline: '"Patienter på akutmottagningen prioriteras efter triage — inte efter ankomsttid."',
        vocab: [
          { sv: "akutmottagning", tr: "acil servis", form: "en akutmottagning – akutmottagningen – akutmottagningar", uttal: "a-KÜÜT-mottaagning", ex: "Patienten inkom till akutmottagningen klockan 02.15.", tip: "Kısaltma: 'akuten'. 'inkomma' = gelmek (resmî dilde)." },
          { sv: "triage", tr: "triyaj", form: "ett triage – triaget", uttal: "tri-ÂÂŞ", ex: "Vid triage bedömdes patienten som prioritet 2.", tip: "Fransızca telaffuz korunur. 'prio 1' en acil demektir." },
          { sv: "andningsfrekvens", tr: "solunum sayısı", form: "en andningsfrekvens – andningsfrekvensen", uttal: "AND-nings-frekvenns", ex: "Andningsfrekvens 24 per minut.", tip: "Vital bulgular: 'puls', 'blodtryck (bltr)', 'saturation', 'temp'." },
          { sv: "medvetande", tr: "bilinç", form: "ett medvetande – medvetandet", uttal: "MÉÉD-veetande", ex: "Patienten är vid fullt medvetande.", tip: "'medvetslös' = bilinçsiz, 'vaken och orienterad' = uyanık ve oryante." },
          { sv: "bröstsmärta", tr: "göğüs ağrısı", form: "en bröstsmärta – bröstsmärtan – bröstsmärtor", uttal: "BRÖST-smeerta", ex: "Patienten söker för akut bröstsmärta.", tip: "'söka för' = şikâyetiyle başvurmak. Anamnezin ilk cümlesi hep böyle kurulur." },
          { sv: "andnöd", tr: "nefes darlığı", form: "en andnöd – andnöden", uttal: "AND-nööd", ex: "Andnöd sedan två timmar.", tip: "'dyspné' tıbbi karşılığı; hasta 'får inte luft' der." },
          { sv: "yrsel", tr: "baş dönmesi", form: "en yrsel – yrseln", uttal: "ÜÜR-sel", ex: "Patienten beskriver yrsel vid uppresning.", tip: "'svimma' = bayılmak, 'svimningskänsla' = bayılacak gibi olmak." },
          { sv: "olycksfall", tr: "kaza", form: "ett olycksfall – olycksfallet – olycksfall", uttal: "ÔÔ-lüks-fall", ex: "Patienten inkom efter ett olycksfall i hemmet.", tip: "'trafikolycka' = trafik kazası, 'fallolycka' = düşme." },
          { sv: "inläggning", tr: "yatış, hastaneye yatırma", form: "en inläggning – inläggningen – inläggningar", uttal: "İNN-leggning", ex: "Beslut om inläggning togs.", tip: "'läggas in' = yatırılmak, 'skrivas ut' = taburcu edilmek." },
          { sv: "övervakning", tr: "monitörizasyon", form: "en övervakning – övervakningen", uttal: "ÖÖ-ver-vaakning", ex: "Patienten sattes på kontinuerlig övervakning.", tip: "'IVA' = yoğun bakım (intensivvårdsavdelning)." },
        ],
        quiz: [
          { q: "'Söka för bröstsmärta' ne demek?", a: "Göğüs ağrısı şikâyetiyle başvurmak", o: ["Göğüs ağrısı şikâyetiyle başvurmak", "Göğüs ağrısını aramak", "Göğüs ağrısını tedavi etmek", "Göğüs ağrısını sormak"] },
          { q: "'IVA' neyin kısaltmasıdır?", a: "intensivvårdsavdelning", o: ["intensivvårdsavdelning", "internmedicinsk vårdavdelning", "invärtes vårdanalys", "intravenös vårdavdelning"] },
          { q: "Taburcu edilmek nasıl denir?", a: "skrivas ut", o: ["skrivas ut", "läggas in", "sökas för", "tas emot"] },
          { q: "'Andnöd' ne demek?", a: "Nefes darlığı", o: ["Nefes darlığı", "Baş dönmesi", "Bilinç kaybı", "Göğüs ağrısı"] },
        ] },

      { title: "Vårdcentral & primärvård", source: "1177 Vårdguiden",
        headline: '"Vårdcentralen är den första kontakten med sjukvården för de flesta patienter i Sverige."',
        vocab: [
          { sv: "vårdcentral", tr: "aile sağlığı merkezi", form: "en vårdcentral – vårdcentralen – vårdcentraler", uttal: "VÔÔRD-sentraal", ex: "Ring vårdcentralen för en tid.", tip: "Kısaltma: 'VC'. İsveç sağlık sisteminin giriş kapısıdır." },
          { sv: "distriktsläkare", tr: "aile hekimi", form: "en distriktsläkare – distriktsläkaren – distriktsläkare", uttal: "diss-TRİKTS-leekare", ex: "Du får träffa en distriktsläkare i morgon.", tip: "'allmänläkare' de aynı anlamda. 'specialist i allmänmedicin' resmî unvandır." },
          { sv: "tidsbokning", tr: "randevu alma", form: "en tidsbokning – tidsbokningen – tidsbokningar", uttal: "TİİDS-bookning", ex: "Tidsbokning sker via 1177.", tip: "'boka en tid' = randevu almak. '1177' hem telefon hem site." },
          { sv: "remittera", tr: "sevk etmek", form: "remittera – remitterar – remitterade – remitterat", uttal: "remi-TÉÉ-ra", ex: "Patienten remitterades till hudmottagningen.", tip: "'remiss' isim hâli. Uzmana gitmek için genelde şart." },
          { sv: "sjukskrivning", tr: "istirahat raporu", form: "en sjukskrivning – sjukskrivningen – sjukskrivningar", uttal: "ŞÜÜK-skriivning", ex: "Sjukskrivning på 50 % i två veckor.", tip: "Yüzdeyle verilebilir (25/50/75/100 %). Försäkringskassan'a gider." },
          { sv: "läkarintyg", tr: "doktor raporu", form: "ett läkarintyg – läkarintyget – läkarintyg", uttal: "LEE-kar-in-tüüg", ex: "Arbetsgivaren kräver läkarintyg från dag åtta.", tip: "'intyg' = belge/sertifika. Çok geçen bir sözcük." },
          { sv: "vaccinering", tr: "aşı uygulaması", form: "en vaccinering – vaccineringen – vaccineringar", uttal: "vaksi-NÉÉ-ring", ex: "Influensavaccinering erbjuds till riskgrupper.", tip: "'erbjuda' = sunmak, teklif etmek — resmî yazışmaların favorisi." },
          { sv: "hälsokontroll", tr: "check-up", form: "en hälsokontroll – hälsokontrollen – hälsokontroller", uttal: "HELL-so-kontrolll", ex: "En årlig hälsokontroll rekommenderas.", tip: "'hälsa' = sağlık, 'hälsosam' = sağlıklı (yaşam tarzı için)." },
          { sv: "väntetid", tr: "bekleme süresi", form: "en väntetid – väntetiden – väntetider", uttal: "VENN-te-tiid", ex: "Väntetiden är cirka tre veckor.", tip: "'vårdgaranti' = yasal azami bekleme süresi güvencesi." },
          { sv: "journalanteckning", tr: "hasta kaydı notu", form: "en journalanteckning – journalanteckningen – journalanteckningar", uttal: "şur-NÂÂL-anteckning", ex: "Journalanteckningen ska skrivas samma dag.", tip: "'journal' = şurnâl okunur (sj-sesi). 'anteckna' = not almak." },
        ],
        quiz: [
          { q: "'VC' neyin kısaltmasıdır?", a: "vårdcentral", o: ["vårdcentral", "vårdchef", "veterinärcentral", "vaccinationscentral"] },
          { q: "'Sjukskrivning på 50 %' ne demek?", a: "Yarı zamanlı istirahat raporu", o: ["Yarı zamanlı istirahat raporu", "İki hafta rapor", "%50 iyileşme", "Yarım ücret"] },
          { q: "Uzmana yönlendirme fiili hangisidir?", a: "remittera", o: ["remittera", "erbjuda", "anteckna", "boka"] },
          { q: "'Journal' kelimesinin ilk sesi nasıl okunur?", a: "ş / h gibi (sj-sesi)", o: ["ş / h gibi (sj-sesi)", "c gibi", "y gibi", "j gibi (İngilizce)"] },
        ] },

      { title: "Symtom & internmedicin", source: "Läkartidningen",
        headline: '"Trötthet, viktnedgång och nattliga svettningar bör alltid föranleda vidare utredning."',
        vocab: [
          { sv: "feber", tr: "ateş", form: "en feber – febern", uttal: "FÉÉ-ber", ex: "Patienten har haft feber i fyra dygn.", tip: "'dygn' = 24 saat; 'dag'dan farklı, tıbbi metinlerde 'dygn' tercih edilir." },
          { sv: "trötthet", tr: "yorgunluk", form: "en trötthet – tröttheten", uttal: "TRÖTT-heet", ex: "Uttalad trötthet sedan flera månader.", tip: "'uttalad' = belirgin. Sıfat olarak 'trött' = yorgun." },
          { sv: "viktnedgång", tr: "kilo kaybı", form: "en viktnedgång – viktnedgången", uttal: "VİKT-need-gong", ex: "Ofrivillig viktnedgång på åtta kilo.", tip: "'ofrivillig' = istemsiz — bu kelime alarm zilidir, mutlaka öğren." },
          { sv: "illamående", tr: "bulantı", form: "ett illamående – illamåendet", uttal: "İLLA-moo-ende", ex: "Illamående utan kräkning.", tip: "'må illa' = mide bulanmak. 'må bra/dåligt' = iyi/kötü hissetmek." },
          { sv: "diarré", tr: "ishal", form: "en diarré – diarrén – diarréer", uttal: "dia-RÉÉ", ex: "Vattnig diarré sedan tre dagar.", tip: "'förstoppning' = kabızlık. 'avföring' = dışkı." },
          { sv: "utredning", tr: "tetkik süreci", form: "en utredning – utredningen – utredningar", uttal: "ÜÜT-reedning", ex: "Vidare utredning med gastroskopi planeras.", tip: "'undersökning' tek muayene; 'utredning' bütün süreç." },
          { sv: "diagnos", tr: "tanı", form: "en diagnos – diagnosen – diagnoser", uttal: "diag-NÔÔS", ex: "Diagnosen ställdes efter biopsi.", tip: "'ställa en diagnos' = tanı koymak. 'diagnostisera' fiil hâli." },
          { sv: "kronisk", tr: "kronik", form: "kronisk – kroniskt – kroniska", uttal: "KRÔÔ-nisk", ex: "Patienten har kronisk njursvikt.", tip: "Karşıtı 'akut'. 'svikt' = yetmezlik: hjärtsvikt, njursvikt, leversvikt." },
          { sv: "besvär", tr: "şikâyet, rahatsızlık", form: "ett besvär – besväret – besvär", uttal: "be-SVEER", ex: "Patienten har besvär från magen.", tip: "Çok kullanışlı genel sözcük: 'magbesvär', 'ryggbesvär', 'sömnbesvär'." },
          { sv: "återhämtning", tr: "iyileşme, toparlanma", form: "en återhämtning – återhämtningen", uttal: "ÔÔ-ter-hemtning", ex: "Återhämtningen går långsamt.", tip: "'hämta sig' = kendine gelmek. 'tillfriskna' = şifa bulmak." },
        ],
        quiz: [
          { q: "'Ofrivillig viktnedgång' neden önemlidir?", a: "İstemsiz kilo kaybı ciddi hastalık işareti olabilir", o: ["İstemsiz kilo kaybı ciddi hastalık işareti olabilir", "Diyet başarısı gösterir", "Normal bir durumdur", "Ateşle ilgilidir"] },
          { q: "'Dygn' ne kadar bir süredir?", a: "24 saat", o: ["24 saat", "12 saat", "Bir hafta", "Gündüz saatleri"] },
          { q: "'Hjärtsvikt' ne demek?", a: "Kalp yetmezliği", o: ["Kalp yetmezliği", "Kalp krizi", "Kalp çarpıntısı", "Kalp ameliyatı"] },
          { q: "Tanı koymak için doğru kalıp?", a: "ställa en diagnos", o: ["ställa en diagnos", "ta en diagnos", "göra en diagnos", "sätta en diagnos"] },
        ] },

      { title: "Kirurgi & vårdavdelning", source: "Vårdhandboken",
        headline: '"Preoperativ information minskar patientens oro och förbättrar det postoperativa förloppet."',
        vocab: [
          { sv: "operation", tr: "ameliyat", form: "en operation – operationen – operationer", uttal: "opera-şÔÔN", ex: "Operationen är planerad till fredag.", tip: "Kısaltma: 'op'. 'operera' = ameliyat etmek." },
          { sv: "vårdavdelning", tr: "servis, klinik katı", form: "en vårdavdelning – vårdavdelningen – vårdavdelningar", uttal: "VÔÔRD-aav-deelning", ex: "Patienten flyttades till vårdavdelning 42.", tip: "Kısaltma: 'avd'. 'vårdplats' = yatak." },
          { sv: "sjuksköterska", tr: "hemşire", form: "en sjuksköterska – sjuksköterskan – sjuksköterskor", uttal: "ŞÜÜK-şöterska", ex: "Sjuksköterskan kontrollerar såret varje dag.", tip: "Kısaltma: 'ssk'. 'undersköterska (usk)' = sağlık teknisyeni." },
          { sv: "postoperativ", tr: "ameliyat sonrası", form: "postoperativ – postoperativt – postoperativa", uttal: "POST-opera-tiiv", ex: "Postoperativt förlopp utan komplikationer.", tip: "'preoperativ' = ameliyat öncesi. 'peroperativt' = ameliyat sırasında." },
          { sv: "smärtstillande", tr: "ağrı kesici", form: "ett smärtstillande – smärtstillande", uttal: "SMEERT-stillande", ex: "Smärtstillande ges vid behov.", tip: "'vid behov (vb)' = gerektiğinde. Reçetede çok geçer." },
          { sv: "dropp", tr: "serum, IV sıvı", form: "ett dropp – droppet – dropp", uttal: "dropp", ex: "Patienten får dropp med Ringer-acetat.", tip: "'sätta dropp' = serum takmak. 'infusion' resmî karşılığı." },
          { sv: "kateter", tr: "kateter, sonda", form: "en kateter – katetern – katetrar", uttal: "ka-TÉÉ-ter", ex: "KAD sattes preoperativt.", tip: "'KAD' = kvarliggande kateter (kalıcı idrar sondası)." },
          { sv: "mobilisering", tr: "hastayı hareketlendirme", form: "en mobilisering – mobiliseringen", uttal: "mobili-SÉÉ-ring", ex: "Tidig mobilisering minskar risken för trombos.", tip: "'mobilisera' fiil. Ameliyat sonrası bakımın anahtar kavramı." },
          { sv: "infektion", tr: "enfeksiyon", form: "en infektion – infektionen – infektioner", uttal: "infek-şÔÔN", ex: "Tecken på sårinfektion saknas.", tip: "'tecken på' = ...belirtisi. 'saknas' = yok/bulunmuyor." },
          { sv: "utskrivning", tr: "taburculuk", form: "en utskrivning – utskrivningen – utskrivningar", uttal: "ÜÜT-skriivning", ex: "Utskrivning planeras till på torsdag.", tip: "'epikris' = taburculuk özeti; journalın son bölümüdür." },
        ],
        quiz: [
          { q: "'ssk' kimin kısaltmasıdır?", a: "sjuksköterska", o: ["sjuksköterska", "sjukhus", "sjukskrivning", "specialistsköterska"] },
          { q: "'Vid behov (vb)' ne demek?", a: "Gerektiğinde", o: ["Gerektiğinde", "Günde iki kez", "Aç karnına", "Yatmadan önce"] },
          { q: "'KAD' nedir?", a: "Kalıcı idrar sondası", o: ["Kalıcı idrar sondası", "Damar yolu", "Kalp monitörü", "Yara drenajı"] },
          { q: "Taburculuk özetine ne denir?", a: "epikris", o: ["epikris", "anamnes", "remiss", "intyg"] },
        ] },

      { title: "Psykiatri & psykisk hälsa", source: "Socialstyrelsen",
        headline: '"Psykisk ohälsa är en av de vanligaste orsakerna till sjukskrivning i Sverige."',
        vocab: [
          { sv: "psykisk ohälsa", tr: "ruhsal sağlık sorunu", form: "en ohälsa – ohälsan", uttal: "SÜÜ-kisk ÔÔ-hellsa", ex: "Psykisk ohälsa ökar bland unga.", tip: "'o-' olumsuzluk öneki: hälsa → ohälsa, säker → osäker." },
          { sv: "nedstämdhet", tr: "çökkünlük, düşük duygudurum", form: "en nedstämdhet – nedstämdheten", uttal: "NÉÉD-stemdheet", ex: "Patienten beskriver nedstämdhet sedan hösten.", tip: "'nedstämd' = keyifsiz. 'depression' klinik tanı için kullanılır." },
          { sv: "ångest", tr: "anksiyete, kaygı", form: "en ångest – ångesten", uttal: "ONG-est", ex: "Ångest med panikattacker flera gånger i veckan.", tip: "'orolig' = endişeli (hafif), 'ångest' = klinik düzeyde kaygı." },
          { sv: "sömnsvårigheter", tr: "uyku sorunları", form: "sömnsvårigheter (çoğul)", uttal: "SÖÖMN-svoorigheeter", ex: "Sömnsvårigheter med tidigt uppvaknande.", tip: "'insomni' tıbbi terimi. 'sova dåligt' günlük ifadesi." },
          { sv: "utmattning", tr: "tükenmişlik", form: "en utmattning – utmattningen", uttal: "ÜÜT-mattning", ex: "Diagnosen utmattningssyndrom ställdes.", tip: "'utmattningssyndrom' İsveç'te resmî bir tanıdır — çok yaygın." },
          { sv: "samtalsstöd", tr: "psikolojik destek görüşmesi", form: "ett samtalsstöd – samtalsstödet", uttal: "SAM-taals-stööd", ex: "Patienten erbjöds samtalsstöd via vårdcentralen.", tip: "'samtal' = konuşma, görüşme; 'stöd' = destek." },
          { sv: "remitteras", tr: "sevk edilmek", form: "remitteras – remitterades", uttal: "remi-TÉÉ-ras", ex: "Patienten remitteras till psykiatrisk öppenvård.", tip: "'öppenvård' = ayaktan tedavi, 'slutenvård' = yatarak tedavi." },
          { sv: "bemötande", tr: "yaklaşım, muamele", form: "ett bemötande – bemötandet", uttal: "be-MÖÖ-tande", ex: "Ett respektfullt bemötande är grundläggande.", tip: "İsveç sağlık sisteminin çok değer verdiği bir kavram — sınavlarda çıkar." },
          { sv: "sekretess", tr: "gizlilik, sır saklama yükümlülüğü", form: "en sekretess – sekretessen", uttal: "sekre-TESS", ex: "All vårdpersonal omfattas av sekretess.", tip: "'tystnadsplikt' de aynı anlamda; yasal zorunluluktur." },
          { sv: "självskattning", tr: "öz değerlendirme ölçeği", form: "en självskattning – självskattningen – självskattningar", uttal: "ŞELV-skattning", ex: "Självskattningsformulär MADRS-S användes.", tip: "'själv' = kendi; 'skatta' = değerlendirmek, tahmin etmek." },
        ],
        quiz: [
          { q: "'Utmattningssyndrom' ne demek?", a: "Tükenmişlik sendromu", o: ["Tükenmişlik sendromu", "Uykusuzluk", "Panik atak", "Depresyon"] },
          { q: "'Öppenvård' nedir?", a: "Ayaktan tedavi", o: ["Ayaktan tedavi", "Yatarak tedavi", "Acil servis", "Evde bakım"] },
          { q: "'Tystnadsplikt' ile eşanlamlı olan?", a: "sekretess", o: ["sekretess", "bemötande", "samtalsstöd", "skattning"] },
          { q: "'O-' öneki ne yapar? (hälsa → ohälsa)", a: "Olumsuzlaştırır", o: ["Olumsuzlaştırır", "Çoğul yapar", "Küçültür", "Geçmiş zaman yapar"] },
        ] },

      { title: "Patientsamtal", source: "Vårdhandboken",
        headline: '"Öppna frågor ger mer information än slutna — låt patienten berätta färdigt innan du avbryter."',
        vocab: [
          { sv: "Vad kan jag hjälpa dig med?", tr: "Size nasıl yardımcı olabilirim?", form: "hazır kalıp", uttal: "vaad kan yag YELpa dey med", ex: "Hej, jag heter Anna. Vad kan jag hjälpa dig med idag?", tip: "Görüşmenin standart açılışı. 'dig' resmî ortamda da kullanılır (İsveç'te 'ni' nadirdir)." },
          { sv: "Kan du berätta mer?", tr: "Biraz daha anlatabilir misiniz?", form: "hazır kalıp", uttal: "kan dü be-RETTa méér", ex: "Kan du berätta mer om när smärtan började?", tip: "Açık uçlu soru. Anamnez almanın temel aracı." },
          { sv: "Hur länge har du haft besvären?", tr: "Şikâyetler ne zamandır var?", form: "hazır kalıp", uttal: "hüür LENGe har dü haft be-SVEEren", ex: "Hur länge har du haft besvären? — Sedan i måndags.", tip: "'sedan' = ...den beri; 'i måndags' = geçen pazartesi." },
          { sv: "Var gör det ont?", tr: "Neresi ağrıyor?", form: "hazır kalıp", uttal: "vaar yöör de ont", ex: "Var gör det ont? Kan du peka?", tip: "'göra ont' = ağrımak. 'ont i magen' = karın ağrısı." },
          { sv: "Tar du några mediciner?", tr: "İlaç kullanıyor musunuz?", form: "hazır kalıp", uttal: "taar dü nôgra medi-SİİNer", ex: "Tar du några mediciner regelbundet?", tip: "'regelbundet' = düzenli olarak. Anamnezin zorunlu sorusu." },
          { sv: "Är du allergisk mot något?", tr: "Alerjiniz var mı?", form: "hazır kalıp", uttal: "eer dü aller-YİSK moot nôôgot", ex: "Är du allergisk mot något läkemedel?", tip: "Ameliyat/ilaç öncesi mutlaka sorulur. 'överkänslig' = hassas." },
          { sv: "Jag förstår att det känns jobbigt.", tr: "Zor olduğunu anlıyorum.", form: "hazır kalıp", uttal: "yag för-STÔÔR att de sens YOBigt", ex: "Jag förstår att det känns jobbigt att vänta på svar.", tip: "Empati cümlesi. 'jobbig' = zorlayıcı, yorucu (çok yaygın günlük kelime)." },
          { sv: "Har du några frågor?", tr: "Sorunuz var mı?", form: "hazır kalıp", uttal: "har dü nôgra FRÔÔgor", ex: "Har du några frågor innan vi avslutar?", tip: "Görüşmeyi kapatma kalıbı. 'avsluta' = bitirmek." },
          { sv: "Vi tar det steg för steg.", tr: "Adım adım ilerleyelim.", form: "hazır kalıp", uttal: "vi taar de steeg för steeg", ex: "Vi tar det steg för steg, du behöver inte oroa dig.", tip: "Sakinleştirici kalıp. 'oroa sig' = endişelenmek." },
          { sv: "Skulle du kunna...?", tr: "...yapabilir misiniz? (nazik)", form: "kalıp: skulle + kunna + mastar", uttal: "SKÜLLe dü KUNNa", ex: "Skulle du kunna ta av dig tröjan?", tip: "En kibar rica biçimi. 'Kan du...' daha doğrudan, 'Skulle du kunna...' daha nazik." },
        ],
        quiz: [
          { q: "Açık uçlu soru hangisidir?", a: "Kan du berätta mer?", o: ["Kan du berätta mer?", "Har du feber?", "Tar du mediciner?", "Är du allergisk?"] },
          { q: "'Var gör det ont?' ne demek?", a: "Neresi ağrıyor?", o: ["Neresi ağrıyor?", "Ne zaman başladı?", "Ne kadar sürdü?", "Kaç kez oldu?"] },
          { q: "En nazik rica kalıbı?", a: "Skulle du kunna...", o: ["Skulle du kunna...", "Kan du...", "Du ska...", "Gör det!"] },
          { q: "'Jobbigt' ne demek?", a: "Zorlayıcı, yorucu", o: ["Zorlayıcı, yorucu", "İşle ilgili", "Eğlenceli", "Hızlı"] },
        ] },
    ]
  },

  // ════════════════ MYNDIGHETER & SAMHÄLLE ════════════════
  system: {
    label: "Myndigheter & Samhälle", icon: "🏛️", color: "blue", units: [

      { title: "Skatteverket & personnummer", source: "Skatteverket",
        headline: '"Personnumret är nyckeln till det svenska samhället — utan det blir det mesta krångligt."',
        vocab: [
          { sv: "personnummer", tr: "kimlik numarası", form: "ett personnummer – personnumret – personnummer", uttal: "per-SÔÔN-nummer", ex: "Personnumret består av tio siffror.", tip: "ÅÅMMDD-XXXX biçiminde. Her şeyin anahtarı: banka, sağlık, iş." },
          { sv: "folkbokföring", tr: "nüfus kaydı, ikamet tescili", form: "en folkbokföring – folkbokföringen", uttal: "FOLK-bookföring", ex: "Du måste anmäla flytt till folkbokföringen.", tip: "'folkbokförd i Sverige' olmak birçok hakkın ön koşuludur." },
          { sv: "skattedeklaration", tr: "vergi beyannamesi", form: "en skattedeklaration – skattedeklarationen – skattedeklarationer", uttal: "SKATTe-deklara-şôôn", ex: "Skattedeklarationen ska lämnas in senast i maj.", tip: "'deklarera' = beyanname vermek. Çoğu kişi için tek tuşla onaylanır." },
          { sv: "inkomst", tr: "gelir", form: "en inkomst – inkomsten – inkomster", uttal: "İNN-komst", ex: "Din inkomst påverkar hur mycket skatt du betalar.", tip: "'utgift' = gider, 'lön' = maaş, 'bruttolön/nettolön' = brüt/net." },
          { sv: "skattsedel", tr: "vergi kartı, A-skatt belgesi", form: "en skattsedel – skattsedeln – skattsedlar", uttal: "SKATT-seedel", ex: "Arbetsgivaren behöver din skattsedel.", tip: "'A-skatt' = çalışanlar, 'F-skatt' = serbest çalışanlar/şirket." },
          { sv: "ansöka", tr: "başvurmak", form: "ansöka – ansöker – ansökte – ansökt", uttal: "AAN-sööka", ex: "Du kan ansöka om ID-kort hos Skatteverket.", tip: "'ansöka om' + isim. İsim hâli: 'en ansökan' = başvuru." },
          { sv: "blankett", tr: "form, matbu evrak", form: "en blankett – blanketten – blanketter", uttal: "blan-KETT", ex: "Fyll i blanketten och skicka in den.", tip: "'fylla i' = doldurmak, 'skicka in' = göndermek. İkisi de partikel fiil." },
          { sv: "handläggare", tr: "dosya sorumlusu memur", form: "en handläggare – handläggaren – handläggare", uttal: "HAND-leggare", ex: "Din handläggare kontaktar dig inom två veckor.", tip: "Her resmî kurumda karşına çıkar. 'handläggningstid' = işlem süresi." },
          { sv: "beslut", tr: "karar", form: "ett beslut – beslutet – beslut", uttal: "be-SLÜÜT", ex: "Du får beslutet skriftligt.", tip: "'fatta beslut' = karar vermek, 'överklaga ett beslut' = karara itiraz etmek." },
          { sv: "överklaga", tr: "itiraz etmek", form: "överklaga – överklagar – överklagade – överklagat", uttal: "ÖÖ-ver-klaaga", ex: "Beslutet kan överklagas inom tre veckor.", tip: "Süre genelde 3 haftadır. 'överklagande' = itiraz dilekçesi." },
        ],
        quiz: [
          { q: "'Folkbokförd' olmak ne demek?", a: "Nüfusa/ikamete kayıtlı olmak", o: ["Nüfusa/ikamete kayıtlı olmak", "Vergi ödemek", "Vatandaş olmak", "Çalışma izni almak"] },
          { q: "'Handläggare' kimdir?", a: "Dosyana bakan memur", o: ["Dosyana bakan memur", "Avukat", "Tercüman", "Doktor"] },
          { q: "Karara itiraz etmek?", a: "överklaga", o: ["överklaga", "ansöka", "deklarera", "anmäla"] },
          { q: "Serbest çalışanların vergi türü?", a: "F-skatt", o: ["F-skatt", "A-skatt", "Moms", "Arbetsgivaravgift"] },
        ] },

      { title: "Försäkringskassan", source: "Försäkringskassan",
        headline: '"Ersättning betalas ut först när ansökan är komplett — komplettera därför i tid."',
        vocab: [
          { sv: "ersättning", tr: "ödenek, tazminat", form: "en ersättning – ersättningen – ersättningar", uttal: "er-SETT-ning", ex: "Du kan ha rätt till ersättning under sjukskrivningen.", tip: "'ha rätt till' = ...hakkına sahip olmak — bu kalıbı ezberle." },
          { sv: "sjukpenning", tr: "hastalık ödeneği", form: "en sjukpenning – sjukpenningen", uttal: "ŞÜÜK-penning", ex: "Sjukpenning betalas från dag 15.", tip: "İlk 14 gün işveren öder ('sjuklön'), sonrası Försäkringskassan." },
          { sv: "föräldrapenning", tr: "ebeveyn ödeneği", form: "en föräldrapenning – föräldrapenningen", uttal: "för-ELL-dra-penning", ex: "Föräldrapenning kan tas ut till barnet är tolv år.", tip: "480 gün; İsveç sisteminin simgesi. 'ta ut dagar' = gün kullanmak." },
          { sv: "bidrag", tr: "yardım, destek ödemesi", form: "ett bidrag – bidraget – bidrag", uttal: "Bİİ-draag", ex: "Bostadsbidrag söks separat.", tip: "'barnbidrag' = çocuk parası (otomatik), 'bostadsbidrag' = kira desteği." },
          { sv: "komplettera", tr: "eksik belge tamamlamak", form: "komplettera – kompletterar – kompletterade – kompletterat", uttal: "komple-TÉÉ-ra", ex: "Vi behöver att du kompletterar med ett läkarintyg.", tip: "'begäran om komplettering' mektubu gelirse panik yapma, belge iste demektir." },
          { sv: "utbetalning", tr: "ödeme", form: "en utbetalning – utbetalningen – utbetalningar", uttal: "ÜÜT-betaalning", ex: "Utbetalningen sker den 25:e varje månad.", tip: "'sker' = gerçekleşir. Resmî dilde çok kullanılan yalın fiil." },
          { sv: "ärende", tr: "dosya, işlem", form: "ett ärende – ärendet – ärenden", uttal: "EE-rende", ex: "Ditt ärende är under handläggning.", tip: "'Mina sidor'da dosyanı takip edersin. 'under handläggning' = işlemde." },
          { sv: "underlag", tr: "dayanak belge", form: "ett underlag – underlaget – underlag", uttal: "UN-der-laag", ex: "Vi saknar underlag för din ansökan.", tip: "Sağlık raporu, maaş bordrosu vb. hepsi 'underlag' sayılır." },
          { sv: "återkrav", tr: "geri ödeme talebi", form: "ett återkrav – återkravet – återkrav", uttal: "ÔÔ-ter-kraav", ex: "Felaktig utbetalning leder till återkrav.", tip: "Yanlış ödenen parayı geri isterler. Bilgilerini güncel tutmak önemlidir." },
          { sv: "intyg", tr: "belge, sertifika", form: "ett intyg – intyget – intyg", uttal: "İNN-tüüg", ex: "Bifoga intyg från arbetsgivaren.", tip: "'bifoga' = eklemek (ek olarak göndermek)." },
        ],
        quiz: [
          { q: "'Ha rätt till ersättning' ne demek?", a: "Ödenek hakkına sahip olmak", o: ["Ödenek hakkına sahip olmak", "Ödeneği geri vermek", "Ödenek istemek", "Ödeneği reddetmek"] },
          { q: "Hastalıkta ilk 14 günü kim öder?", a: "Arbetsgivaren (sjuklön)", o: ["Arbetsgivaren (sjuklön)", "Försäkringskassan", "Vårdcentralen", "Kommunen"] },
          { q: "'Under handläggning' ne demek?", a: "İşleme alınmış, inceleniyor", o: ["İşleme alınmış, inceleniyor", "Reddedildi", "Onaylandı", "Ödendi"] },
          { q: "'Bifoga' ne demek?", a: "Eklemek (ek belge)", o: ["Eklemek (ek belge)", "İmzalamak", "Silmek", "Göndermek"] },
        ] },

      { title: "Arbetsförmedlingen & arbetsliv", source: "Arbetsförmedlingen",
        headline: '"Ett personligt brev ska vara kort, konkret och anpassat till just den tjänst du söker."',
        vocab: [
          { sv: "arbetslös", tr: "işsiz", form: "arbetslös – arbetslöst – arbetslösa", uttal: "AR-beets-lööss", ex: "Anmäl dig som arbetslös första dagen.", tip: "'-lös' eki 'yoksun' demektir: hemlös, sömnlös, meningslös." },
          { sv: "tjänst", tr: "kadro, pozisyon", form: "en tjänst – tjänsten – tjänster", uttal: "çenst", ex: "Vi söker dig till en tjänst som veterinär.", tip: "'söka en tjänst' = pozisyona başvurmak. Ayrıca 'hizmet' anlamına da gelir." },
          { sv: "personligt brev", tr: "niyet mektubu", form: "ett brev – brevet – brev", uttal: "per-SÔÔN-ligt breev", ex: "Bifoga CV och personligt brev.", tip: "İsveç'te CV kadar önemlidir, tek sayfa olmalıdır." },
          { sv: "anställning", tr: "işe alım, istihdam", form: "en anställning – anställningen – anställningar", uttal: "AAN-stellning", ex: "Tillsvidareanställning på heltid.", tip: "'tillsvidare' = süresiz, 'vikariat' = geçici, 'provanställning' = deneme süresi." },
          { sv: "heltid", tr: "tam zamanlı", form: "en heltid – heltiden", uttal: "HÉÉL-tiid", ex: "Tjänsten är på heltid, 40 timmar i veckan.", tip: "'deltid' = yarı zamanlı, '75 %' gibi yüzde de yazılır." },
          { sv: "kollektivavtal", tr: "toplu iş sözleşmesi", form: "ett kollektivavtal – kollektivavtalet – kollektivavtal", uttal: "kollek-TİİV-aavtaal", ex: "Arbetsplatsen har kollektivavtal.", tip: "İsveç iş piyasasının temeli. Maaş, izin, emeklilik hep buradan." },
          { sv: "fackförbund", tr: "sendika", form: "ett fackförbund – fackförbundet – fackförbund", uttal: "FAKK-förbund", ex: "Många anställda är med i ett fackförbund.", tip: "Kısaca 'facket'. 'a-kassa' = işsizlik sigortası kasası, ayrıdır." },
          { sv: "anställningsintervju", tr: "iş görüşmesi", form: "en anställningsintervju – intervjun – intervjuer", uttal: "AAN-stellnings-inter-vyüü", ex: "Jag är kallad till anställningsintervju.", tip: "'bli kallad till' = çağrılmak. 'jobbintervju' günlük hâli." },
          { sv: "referens", tr: "referans", form: "en referens – referensen – referenser", uttal: "refe-RENNS", ex: "Referenser lämnas på begäran.", tip: "'på begäran' = talep üzerine. CV'nin klasik son satırı." },
          { sv: "legitimation", tr: "meslek ruhsatı", form: "en legitimation – legitimationen – legitimationer", uttal: "legitima-şÔÔN", ex: "För att arbeta som veterinär i Sverige krävs legitimation.", tip: "Kısaca 'leg.'. Sağlık meslekleri için Socialstyrelsen / Jordbruksverket verir." },
        ],
        quiz: [
          { q: "'Tillsvidareanställning' ne demek?", a: "Süresiz kadro", o: ["Süresiz kadro", "Geçici kadro", "Deneme süresi", "Yarı zamanlı"] },
          { q: "'Facket' nedir?", a: "Sendika", o: ["Sendika", "İşsizlik kasası", "İş bulma kurumu", "Vergi dairesi"] },
          { q: "'-lös' eki ne katar? (arbetslös)", a: "Yoksunluk", o: ["Yoksunluk", "Çokluk", "Geçmişlik", "Küçültme"] },
          { q: "Veteriner olarak çalışmak için gereken belge?", a: "legitimation", o: ["legitimation", "personligt brev", "referens", "kollektivavtal"] },
        ] },

      { title: "Migrationsverket & uppehållstillstånd", source: "Migrationsverket",
        headline: '"Handläggningstiderna varierar — se alltid den aktuella tiden för just din ärendetyp."',
        vocab: [
          { sv: "uppehållstillstånd", tr: "oturma izni", form: "ett uppehållstillstånd – uppehållstillståndet – uppehållstillstånd", uttal: "UPP-e-holls-till-stond", ex: "Han har permanent uppehållstillstånd.", tip: "Kısaltma: 'UT'. 'permanent (PUT)' = süresiz, 'tidsbegränsat' = süreli." },
          { sv: "arbetstillstånd", tr: "çalışma izni", form: "ett arbetstillstånd – arbetstillståndet", uttal: "AR-beets-till-stond", ex: "Arbetstillstånd söks före inresa.", tip: "'före inresa' = ülkeye girmeden önce — kritik bir kural." },
          { sv: "medborgarskap", tr: "vatandaşlık", form: "ett medborgarskap – medborgarskapet", uttal: "MÉÉD-boryarskaap", ex: "Ansökan om svenskt medborgarskap.", tip: "'medborgare' = vatandaş. 'bli svensk medborgare' = vatandaş olmak." },
          { sv: "handläggningstid", tr: "işlem süresi", form: "en handläggningstid – handläggningstiden – handläggningstider", uttal: "HAND-leggnings-tiid", ex: "Handläggningstiden är för närvarande tolv månader.", tip: "'för närvarande' = şu anda. Resmî dilin klasik ifadesi." },
          { sv: "förlängning", tr: "uzatma", form: "en förlängning – förlängningen – förlängningar", uttal: "för-LENG-ning", ex: "Ansök om förlängning innan tillståndet går ut.", tip: "'gå ut' = süresi dolmak. 'förlänga' = uzatmak." },
          { sv: "avslag", tr: "ret", form: "ett avslag – avslaget – avslag", uttal: "AAV-slaag", ex: "Ansökan fick avslag.", tip: "Karşıtı 'bifall' = kabul. 'få avslag' = reddedilmek." },
          { sv: "bifall", tr: "kabul, olumlu karar", form: "ett bifall – bifallet", uttal: "Bİİ-fall", ex: "Beslutet innebar bifall till ansökan.", tip: "'innebära' = anlamına gelmek. Resmî yazılarda çok geçer." },
          { sv: "styrka", tr: "belgelemek, kanıtlamak", form: "styrka – styrker – styrkte – styrkt", uttal: "STÜÜR-ka", ex: "Du behöver styrka din identitet.", tip: "'styrkt kopia' = onaylı suret. Bu fiilin 'güç' anlamı da vardır." },
          { sv: "vidimera", tr: "suret onaylamak", form: "vidimera – vidimerar – vidimerade – vidimerat", uttal: "vidi-MÉÉ-ra", ex: "Kopian ska vidimeras av två personer.", tip: "İki kişi imzalar ve telefon numarasını yazar — İsveç'e özgü bir uygulama." },
          { sv: "komplett ansökan", tr: "eksiksiz başvuru", form: "en ansökan – ansökan – ansökningar", uttal: "kom-PLETT AAN-sööekan", ex: "Handläggningen börjar när ansökan är komplett.", tip: "'ansökan' tekil belirli hâlde de 'ansökan' — düzensizdir, dikkat." },
        ],
        quiz: [
          { q: "'PUT' ne demek?", a: "Süresiz oturma izni", o: ["Süresiz oturma izni", "Çalışma izni", "Vatandaşlık", "Geçici vize"] },
          { q: "'Få avslag' ne anlama gelir?", a: "Reddedilmek", o: ["Reddedilmek", "Kabul edilmek", "Uzatılmak", "Beklemeye alınmak"] },
          { q: "'Vidimera' ne demek?", a: "Sureti onaylamak", o: ["Sureti onaylamak", "Tercüme etmek", "Başvurmak", "İtiraz etmek"] },
          { q: "'För närvarande' ne demek?", a: "Şu anda", o: ["Şu anda", "Gelecekte", "Ne yazık ki", "Genellikle"] },
        ] },

      { title: "Bostad & kontrakt", source: "Hyresgästföreningen",
        headline: '"Ett förstahandskontrakt är svårt att få i storstäderna, och andrahandsuthyrning kräver godkännande."',
        vocab: [
          { sv: "hyresrätt", tr: "kiralık daire hakkı", form: "en hyresrätt – hyresrätten – hyresrätter", uttal: "HÜÜ-res-rett", ex: "Han står i kö för en hyresrätt.", tip: "'bostadsrätt' = kat mülkiyeti (satın alınır), 'villa' = müstakil ev." },
          { sv: "förstahandskontrakt", tr: "birinci el kira sözleşmesi", form: "ett kontrakt – kontraktet – kontrakt", uttal: "FÖRSTa-hands-kontrakt", ex: "Med förstahandskontrakt har du starkt besittningsskydd.", tip: "'andrahand' = ikinci el (kiracıdan kiralamak), izin gerekir." },
          { sv: "bostadskö", tr: "konut sırası", form: "en bostadskö – bostadskön – bostadsköer", uttal: "BÔÔ-staads-köö", ex: "Kötiden i Stockholm är över tio år.", tip: "'ställa sig i kö' = sıraya girmek. Stockholm'de erken kaydolmak şart." },
          { sv: "hyra", tr: "kira / kiralamak", form: "en hyra – hyran | hyra – hyr – hyrde – hyrt", uttal: "HÜÜ-ra", ex: "Hyran betalas den sista varje månad.", tip: "Hem isim hem fiil. 'hyresvärd' = ev sahibi, 'hyresgäst' = kiracı." },
          { sv: "uppsägningstid", tr: "ihbar süresi", form: "en uppsägningstid – uppsägningstiden", uttal: "UPP-segnings-tiid", ex: "Uppsägningstiden är tre månader.", tip: "'säga upp' = feshetmek — hem kira hem iş için." },
          { sv: "deposition", tr: "depozito", form: "en deposition – depositionen – depositioner", uttal: "deposi-şÔÔN", ex: "Deposition motsvarande en månadshyra.", tip: "'motsvarande' = ...karşılığında/kadar. Resmî yazışmada çok geçer." },
          { sv: "besiktning", tr: "daire teslim kontrolü", form: "en besiktning – besiktningen – besiktningar", uttal: "be-SİKT-ning", ex: "Besiktning sker vid inflyttning och utflyttning.", tip: "'inflyttning' = taşınma girişi, 'utflyttning' = çıkış." },
          { sv: "el och vatten", tr: "elektrik ve su", form: "en el – elen | ett vatten – vattnet", uttal: "eel ock VATTen", ex: "El ingår inte i hyran.", tip: "'ingå i' = dahil olmak. Kira ilanlarında kritik bilgi." },
          { sv: "sambo", tr: "birlikte yaşayan partner", form: "en sambo – sambon – sambor", uttal: "SAM-bo", ex: "Vi är sambor sedan tre år.", tip: "Yasal statüsü vardır (sambolagen). 'särbo' = ayrı yaşayan çift." },
          { sv: "flytta", tr: "taşınmak", form: "flytta – flyttar – flyttade – flyttat", uttal: "FLÜTTa", ex: "Vi flyttar in den första september.", tip: "'flytta in' = taşınmak (girmek), 'flytta ut' = çıkmak. Partikel fiil." },
        ],
        quiz: [
          { q: "'Hyresvärd' kimdir?", a: "Ev sahibi", o: ["Ev sahibi", "Kiracı", "Emlakçı", "Komşu"] },
          { q: "'Andrahandskontrakt' için ne gerekir?", a: "Ev sahibinin/derneğin onayı", o: ["Ev sahibinin/derneğin onayı", "Hiçbir şey", "Vatandaşlık", "Banka kredisi"] },
          { q: "'Ingår inte i hyran' ne demek?", a: "Kiraya dahil değil", o: ["Kiraya dahil değil", "Kiraya dahil", "Kira artacak", "Kira sabit"] },
          { q: "'Säga upp' ne demek?", a: "Feshetmek", o: ["Feshetmek", "İmzalamak", "Uzatmak", "Ödemek"] },
        ] },
    ]
  },

  // ════════════════ VARDAGSSVENSKA ════════════════
  vardag: {
    label: "Vardagssvenska", icon: "💬", color: "teal", units: [

      { title: "Hälsningar & småprat", source: "Vardagssvenska",
        headline: '"Svenskar småpratar gärna om vädret — det är den säkraste öppningen som finns."',
        vocab: [
          { sv: "Hur är läget?", tr: "Nasıl gidiyor?", form: "hazır kalıp", uttal: "hüür eer LEEget", ex: "Hej! Hur är läget?", tip: "Samimi ama iş yerinde de kullanılır. 'Hur mår du?' biraz daha kişiseldir." },
          { sv: "Vi hörs!", tr: "Görüşürüz! (konuşuruz)", form: "hazır kalıp", uttal: "vi hööş", ex: "Okej, vi hörs på måndag!", tip: "'Vi ses!' = görüşürüz (yüz yüze). 'hörs' = duyuşuruz." },
          { sv: "Ha det bra!", tr: "İyi günler! (vedalaşma)", form: "hazır kalıp", uttal: "ha de braa", ex: "Tack för hjälpen, ha det bra!", tip: "En yaygın veda. Cevabı: 'Detsamma!' = sana da." },
          { sv: "Lagom", tr: "tam kıvamında, ne az ne çok", form: "sıfat/zarf, çekimsiz", uttal: "LÂÂ-gom", ex: "Kaffet är lagom varmt.", tip: "İsveç kültürünün anahtar kelimesi; birebir çevirisi yoktur." },
          { sv: "Fika", tr: "kahve molası", form: "en fika – fikan | fika – fikar – fikade – fikat", uttal: "Fİİİ-ka", ex: "Ska vi fika efter mötet?", tip: "Hem isim hem fiil. Sadece kahve değil, sosyal ritüel." },
          { sv: "Tack så mycket", tr: "Çok teşekkürler", form: "hazır kalıp", uttal: "tack so MÜCKe", ex: "Tack så mycket för hjälpen!", tip: "İsveççede 'tack' her yerde. 'Tack ska du ha' de çok kullanılır." },
          { sv: "Förlåt", tr: "Özür dilerim", form: "ünlem / förlåta – förlåter – förlät – förlåtit", uttal: "för-LÔÔT", ex: "Förlåt att jag är sen.", tip: "'Ursäkta' = affedersiniz (dikkat çekmek için). Farkı önemli." },
          { sv: "Varsågod", tr: "Buyurun / Rica ederim", form: "hazır kalıp", uttal: "VAŞ-o-gôôd", ex: "Varsågod, här är din kaffe.", tip: "Hem bir şey uzatırken hem 'rica ederim' olarak kullanılır." },
          { sv: "Precis", tr: "Aynen, kesinlikle", form: "zarf", uttal: "pre-SİİS", ex: "— Så du menar att det är för dyrt? — Precis.", tip: "Konuşmada onay için sürekli duyulur. 'Exakt' de aynı işlevde." },
          { sv: "Jag håller med", tr: "Katılıyorum", form: "hålla med – håller med – höll med – hållit med", uttal: "yag HOLLer med", ex: "Jag håller med dig om det där.", tip: "Partikel fiil. Karşıtı: 'Jag håller inte med'." },
        ],
        quiz: [
          { q: "'Lagom' ne demek?", a: "Tam kıvamında, ne az ne çok", o: ["Tam kıvamında, ne az ne çok", "Çok fazla", "Çok az", "Yeterince değil"] },
          { q: "Birinin dikkatini çekmek için hangisi?", a: "Ursäkta", o: ["Ursäkta", "Förlåt", "Varsågod", "Precis"] },
          { q: "'Vi hörs!' ne demek?", a: "Konuşuruz / görüşürüz", o: ["Konuşuruz / görüşürüz", "Duydum", "Dinliyorum", "Anladım"] },
          { q: "'Fika' nedir?", a: "Kahve molası (sosyal ritüel)", o: ["Kahve molası (sosyal ritüel)", "Öğle yemeği", "Toplantı", "Tatil"] },
        ] },

      { title: "Handla & pengar", source: "Vardagssvenska",
        headline: '"Sverige är nästan kontantlöst — de flesta butiker tar bara kort eller Swish."',
        vocab: [
          { sv: "kvitto", tr: "fiş, makbuz", form: "ett kvitto – kvittot – kvitton", uttal: "KVİTTo", ex: "Vill du ha kvittot?", tip: "İade için şart. 'byta' = değiştirmek, 'returnera' = iade etmek." },
          { sv: "rabatt", tr: "indirim", form: "en rabatt – rabatten – rabatter", uttal: "ra-BATT", ex: "Det är 20 % rabatt på allt.", tip: "'rea' = sezon indirimi, 'erbjudande' = kampanya, 'extrapris' = özel fiyat." },
          { sv: "kassa", tr: "kasa", form: "en kassa – kassan – kassor", uttal: "KASSa", ex: "Betala i kassan till höger.", tip: "'självscanning' = kendin okut; İsveç marketlerinde çok yaygın." },
          { sv: "Swish", tr: "anlık para transferi uygulaması", form: "en swish – swishen | swisha", uttal: "SVİŞ", ex: "Kan jag swisha dig pengarna?", tip: "Fiil olarak da kullanılır. Günlük hayatta neredeyse zorunlu." },
          { sv: "kontant", tr: "nakit", form: "kontant – kontanter (çoğul: nakit para)", uttal: "kon-TANT", ex: "Vi tar tyvärr inte kontanter.", tip: "'kontantlöst' = nakitsiz. Bu tabelayı çok göreceksin." },
          { sv: "moms", tr: "KDV", form: "en moms – momsen", uttal: "moms", ex: "Priset är inklusive moms.", tip: "'inklusive/exklusive moms' = KDV dahil/hariç. Faturada kritik." },
          { sv: "faktura", tr: "fatura", form: "en faktura – fakturan – fakturor", uttal: "FAK-tuura", ex: "Fakturan förfaller den 30:e.", tip: "'förfalla' = vadesi dolmak. 'påminnelse' = ödeme hatırlatması." },
          { sv: "avbetalning", tr: "taksitli ödeme", form: "en avbetalning – avbetalningen – avbetalningar", uttal: "AAV-betaalning", ex: "Du kan köpa på avbetalning.", tip: "'delbetalning' de aynı. 'ränta' = faiz." },
          { sv: "spara", tr: "biriktirmek / kaydetmek", form: "spara – sparar – sparade – sparat", uttal: "SPÂÂ-ra", ex: "Jag sparar till en ny bil.", tip: "İki anlamlı: para biriktirmek ve dosya kaydetmek." },
          { sv: "räcka", tr: "yetmek", form: "räcka – räcker – räckte – räckt", uttal: "REKKa", ex: "Pengarna räcker inte till hyran.", tip: "'Det räcker!' = Yeter! Çok kullanılır." },
        ],
        quiz: [
          { q: "'Inklusive moms' ne demek?", a: "KDV dahil", o: ["KDV dahil", "KDV hariç", "İndirimli", "Taksitli"] },
          { q: "'Vi tar inte kontanter' ne demek?", a: "Nakit kabul etmiyoruz", o: ["Nakit kabul etmiyoruz", "Kart kabul etmiyoruz", "Kapalıyız", "İade yok"] },
          { q: "'Det räcker!' ne demek?", a: "Yeter!", o: ["Yeter!", "Devam et!", "Bitti!", "Anladım!"] },
          { q: "'Fakturan förfaller' ne demek?", a: "Faturanın vadesi doluyor", o: ["Faturanın vadesi doluyor", "Fatura iptal oldu", "Fatura ödendi", "Fatura düştü"] },
        ] },

      { title: "Resa & kollektivtrafik", source: "SL / SJ",
        headline: '"Tåget är försenat på grund av ett signalfel — ersättningsbussar sätts in."',
        vocab: [
          { sv: "tåg", tr: "tren", form: "ett tåg – tåget – tåg", uttal: "tôôg", ex: "Tåget avgår från spår 4.", tip: "'avgå' = kalkmak, 'ankomma' = varmak. Duyurularda hep bu iki fiil." },
          { sv: "hållplats", tr: "durak", form: "en hållplats – hållplatsen – hållplatser", uttal: "HOLL-plats", ex: "Nästa hållplats: Odenplan.", tip: "'station' = istasyon (tren/metro), 'hållplats' = otobüs/tramvay durağı." },
          { sv: "biljett", tr: "bilet", form: "en biljett – biljetten – biljetter", uttal: "bil-YETT", ex: "Köp biljett i appen innan du går ombord.", tip: "'gå ombord' = binmek. Biletsiz binmek ağır cezalıdır." },
          { sv: "försenad", tr: "gecikmiş", form: "försenad – försenat – försenade", uttal: "för-SÉÉ-nad", ex: "Bussen är tio minuter försenad.", tip: "İsim: 'försening'. 'inställd' = iptal edilmiş — daha kötüsü!" },
          { sv: "byta", tr: "aktarma yapmak / değiştirmek", form: "byta – byter – bytte – bytt", uttal: "BÜÜ-ta", ex: "Du måste byta tåg i Hallsberg.", tip: "'byte' = aktarma/değişim. 'byta om' = üstünü değiştirmek." },
          { sv: "enkel / tur och retur", tr: "gidiş / gidiş-dönüş", form: "hazır kalıp", uttal: "ENN-kel / tuur ock re-TÜÜR", ex: "En enkel till Göteborg, tack.", tip: "Kısaltma: 't/r'. Bilet gişesinin standart sorusu." },
          { sv: "körkort", tr: "ehliyet", form: "ett körkort – körkortet – körkort", uttal: "ÇÖÖR-koort", ex: "Svenskt körkort krävs för tjänsten.", tip: "'B-körkort' = otomobil. Yabancı ehliyetin geçerliliği ülkeye göre değişir." },
          { sv: "trafikstörning", tr: "trafik aksaması", form: "en trafikstörning – trafikstörningen – trafikstörningar", uttal: "tra-FİİK-stöörning", ex: "Trafikstörningar på grön linje.", tip: "'på grund av (pga)' = ...nedeniyle. Duyurularda sürekli geçer." },
          { sv: "pendla", tr: "işe gidip gelmek", form: "pendla – pendlar – pendlade – pendlat", uttal: "PENND-la", ex: "Jag pendlar till Uppsala varje dag.", tip: "'pendlare' = commuter, 'pendeltåg' = banliyö treni." },
          { sv: "i tid", tr: "zamanında", form: "hazır kalıp", uttal: "i tiid", ex: "Tåget kom i tid för en gångs skull.", tip: "'för en gångs skull' = bir kereliğine — çok kullanışlı deyim." },
        ],
        quiz: [
          { q: "'Inställd' ne demek?", a: "İptal edilmiş", o: ["İptal edilmiş", "Gecikmiş", "Zamanında", "Dolu"] },
          { q: "'Tur och retur' ne demek?", a: "Gidiş-dönüş", o: ["Gidiş-dönüş", "Tek yön", "Aktarmalı", "Doğrudan"] },
          { q: "'Pga' neyin kısaltmasıdır?", a: "på grund av", o: ["på grund av", "per gång alltid", "på gatan av", "punkt går av"] },
          { q: "'Byta tåg' ne demek?", a: "Tren değiştirmek (aktarma)", o: ["Tren değiştirmek (aktarma)", "Bilet almak", "Trenden inmek", "Trene binmek"] },
        ] },

      { title: "Väder & årstider", source: "SMHI",
        headline: '"SMHI utfärdar gul varning för kraftigt snöfall i norra Sverige under natten."',
        vocab: [
          { sv: "väder", tr: "hava durumu", form: "ett väder – vädret", uttal: "VEE-der", ex: "Vilket härligt väder!", tip: "'väderlek' resmî hâli. Küçük konuşmanın 1 numaralı konusu." },
          { sv: "snöfall", tr: "kar yağışı", form: "ett snöfall – snöfallet", uttal: "SNÖÖ-fall", ex: "Kraftigt snöfall väntas i natt.", tip: "'snöa' = kar yağmak, 'snöröjning' = kar temizleme." },
          { sv: "halka", tr: "buzlanma, kayganlık", form: "en halka – halkan | halka – halkar", uttal: "HALL-ka", ex: "Var försiktig, det är halt ute.", tip: "'halt' = kaygan. Kışın en sık duyacağın uyarı." },
          { sv: "regn", tr: "yağmur", form: "ett regn – regnet", uttal: "rengn", ex: "Det regnar hela dagen.", tip: "'g' burada okunur ama yumuşaktır. 'duggregn' = çiseleme." },
          { sv: "molnigt", tr: "bulutlu", form: "molnig – molnigt – molniga", uttal: "MÔÔL-nigt", ex: "Molnigt med tillfälliga uppklarnanden.", tip: "'soligt' = güneşli, 'mulet' = kapalı, 'växlande' = değişken." },
          { sv: "grader", tr: "derece", form: "en grad – graden – grader", uttal: "GRÂÂ-der", ex: "Det är minus tolv grader ute.", tip: "'minus' hep önce söylenir: 'minus tolv', '-12 °C'." },
          { sv: "årstid", tr: "mevsim", form: "en årstid – årstiden – årstider", uttal: "ÔÔŞ-tiid", ex: "Hösten är min favoritårstid.", tip: "vår, sommar, höst, vinter. 'på våren' = ilkbaharda." },
          { sv: "mörker", tr: "karanlık", form: "ett mörker – mörkret", uttal: "MÖR-ker", ex: "Mörkret kommer tidigt i december.", tip: "İsveç kışının kilit kelimesi. 'mörkt' = karanlık (sıfat)." },
          { sv: "midnattssol", tr: "gece yarısı güneşi", form: "en midnattssol – midnattssolen", uttal: "MİİD-nats-sôôl", ex: "I Kiruna lyser midnattssolen i juni.", tip: "Kuzeyde yazın güneş batmaz. Karşıtı 'polarnatt' = kutup gecesi." },
          { sv: "varning", tr: "uyarı", form: "en varning – varningen – varningar", uttal: "VÂÂR-ning", ex: "SMHI har utfärdat en orange varning.", tip: "Renk kodları: gul (sarı) < orange < röd. 'utfärda' = yayımlamak." },
        ],
        quiz: [
          { q: "'Det är halt ute' ne demek?", a: "Dışarısı kaygan", o: ["Dışarısı kaygan", "Dışarısı sıcak", "Dışarısı karanlık", "Dışarısı rüzgârlı"] },
          { q: "En ciddi hava uyarısı rengi?", a: "röd", o: ["röd", "gul", "orange", "grön"] },
          { q: "'Höst' hangi mevsimdir?", a: "Sonbahar", o: ["Sonbahar", "İlkbahar", "Kış", "Yaz"] },
          { q: "'Minus tolv grader' nasıl yazılır?", a: "-12 °C", o: ["-12 °C", "+12 °C", "12 °F", "120 °C"] },
        ] },
    ]
  },

  // ════════════════ GRAMMATIK ════════════════
  grammatik: {
    label: "Grammatik", icon: "✏️", color: "purple", units: [

      { title: "Ordföljd — V2 & BIFF", source: "Svenska Akademiens grammatik",
        headline: '"Svenskan har rak och omvänd ordföljd i huvudsatser, men i bisatser står inte alltid före verbet."',
        vocab: [
          { sv: "V2-regeln", tr: "Fiil daima 2. sırada", form: "kural", uttal: "vee-TVÔÔ-reegeln", ex: "Jag läser boken. / I dag läser jag boken.", tip: "Ana cümlede çekimli fiil HER ZAMAN ikinci öğedir. Türkçeden en büyük fark." },
          { sv: "omvänd ordföljd", tr: "devrik dizim", form: "en ordföljd – ordföljden", uttal: "ÔÔM-vend ÔÔRD-fölyd", ex: "I morgon åker vi till Malmö.", tip: "Cümle özneyle başlamıyorsa özne fiilden SONRA gelir. 'I morgon vi åker' YANLIŞ." },
          { sv: "BIFF-regeln", tr: "Yan cümlede 'inte' fiilden önce", form: "kural", uttal: "biff-REEgeln", ex: "Han säger att han inte kommer.", tip: "BIFF = Bisats – Inte – Före – Fiilet. Sınavların favori konusu." },
          { sv: "bisats", tr: "yan cümle", form: "en bisats – bisatsen – bisatser", uttal: "Bİİ-sats", ex: "Jag vet att du inte gillar kaffe.", tip: "att, om, när, eftersom, som ile başlar. 'huvudsats' = ana cümle." },
          { sv: "eftersom", tr: "çünkü (yan cümle kurar)", form: "bağlaç", uttal: "EFF-ter-som", ex: "Jag stannar hemma eftersom jag inte mår bra.", tip: "'för att' de 'çünkü' demek ama 'eftersom' daha resmîdir. BIFF geçerlidir!" },
          { sv: "därför att", tr: "çünkü (sonra gelir)", form: "bağlaç", uttal: "DEER-för att", ex: "Han kom inte, därför att han var sjuk.", tip: "'därför' tek başına = bu yüzden ve ana cümle kurar → devrik dizim." },
          { sv: "trots att", tr: "-e rağmen", form: "bağlaç", uttal: "trots att", ex: "Trots att det regnade gick vi ut.", tip: "'trots' tek başına edat: 'trots regnet'. 'att' ile yan cümle olur." },
          { sv: "medan", tr: "-iken", form: "bağlaç", uttal: "MÉÉ-dan", ex: "Hon lagade mat medan jag städade.", tip: "'under tiden' = bu arada (zarf). İkisini karıştırma." },
          { sv: "om", tr: "eğer / hakkında / -ip -mediğini", form: "bağlaç", uttal: "om", ex: "Jag vet inte om han kommer.", tip: "Üç işlevi var: koşul, konu ('om vädret'), dolaylı soru." },
          { sv: "att", tr: "ki / -mak (mastar)", form: "bağlaç / mastar eki", uttal: "att", ex: "Jag hoppas att du kommer. / Det är roligt att resa.", tip: "İki farklı 'att' var: bağlaç ve mastar işareti. Çok karıştırılır." },
        ],
        quiz: [
          { q: "Doğru olan hangisi?", a: "I morgon åker vi till Malmö.", o: ["I morgon åker vi till Malmö.", "I morgon vi åker till Malmö.", "I morgon till Malmö vi åker.", "Åker i morgon vi till Malmö."] },
          { q: "BIFF kuralına göre doğru olan?", a: "...att han inte kommer", o: ["...att han inte kommer", "...att han kommer inte", "...att inte han kommer", "...att kommer han inte"] },
          { q: "V2 kuralı neyi söyler?", a: "Çekimli fiil ana cümlede 2. sıradadır", o: ["Çekimli fiil ana cümlede 2. sıradadır", "Özne hep başta olur", "Fiil hep sonda olur", "İki fiil kullanılır"] },
          { q: "'Trots att' ne demek?", a: "-e rağmen", o: ["-e rağmen", "çünkü", "-iken", "eğer"] },
        ] },

      { title: "En eller ett — genus & bestämd form", source: "Svenska Akademiens ordlista",
        headline: '"Cirka 75 % av svenska substantiv är en-ord, men de vanligaste vardagsorden är ofta ett-ord."',
        vocab: [
          { sv: "en-ord (utrum)", tr: "'en' alan isimler", form: "en bil – bilen – bilar – bilarna", uttal: "een-ôôrd", ex: "en hund → hunden → hundar → hundarna", tip: "İsimlerin ~%75'i. İnsan ve hayvanların neredeyse tamamı en-ord." },
          { sv: "ett-ord (neutrum)", tr: "'ett' alan isimler", form: "ett hus – huset – hus – husen", uttal: "ett-ôôrd", ex: "ett barn → barnet → barn → barnen", tip: "Genelde tek heceli somut şeyler. Ne yazık ki kesin kural yok — ezber." },
          { sv: "bestämd form", tr: "belirli hâl", form: "-en / -et sonu", uttal: "be-STEMD form", ex: "bilen (o araba), huset (o ev)", tip: "İsveççede artikel SONA eklenir. Türkçedeki 'araba-yı' gibi düşün." },
          { sv: "obestämd form", tr: "belirsiz hâl", form: "en / ett + isim", uttal: "ÔÔ-be-stemd form", ex: "en bil (bir araba), ett hus (bir ev)", tip: "Yeni bir şeyden ilk kez bahsederken kullanılır." },
          { sv: "plural på -or", tr: "-a ile biten en-ord çoğulu", form: "en flicka → flickor", uttal: "plu-RÂÂL po ÔÔR", ex: "en klocka → två klockor", tip: "1. çoğul grubu: -a düşer, -or gelir." },
          { sv: "plural på -ar", tr: "en-ord çoğulu (en yaygın)", form: "en hund → hundar", uttal: "...po AAR", ex: "en pojke → två pojkar", tip: "2. grup. En sık rastlanan çoğul ekidir." },
          { sv: "plural på -er", tr: "yabancı kökenli/uzun kelimeler", form: "en patient → patienter", uttal: "...po EER", ex: "en journal → två journaler", tip: "3. grup. Tıbbi terimlerin çoğu buraya girer — senin için önemli!" },
          { sv: "plural på -n", tr: "ünlüyle biten ett-ord", form: "ett äpple → äpplen", uttal: "...po ENN", ex: "ett bi → två bin", tip: "4. grup. Sadece ünlüyle biten ett-ord'lar." },
          { sv: "oräknelig plural", tr: "değişmeyen çoğul", form: "ett barn → barn", uttal: "ÔÔ-reeknelig", ex: "ett djur → två djur → djuren", tip: "5. grup: ünsüzle biten ett-ord'lar çoğulda değişmez. 'djur' böyle!" },
          { sv: "genitiv med -s", tr: "iyelik: -s", form: "hundens matte, Annas bok", uttal: "geni-TİİV", ex: "patientens journal, hundens ägare", tip: "Kesme işareti YOK! 'Annas' doğru, 'Anna's' yanlış." },
        ],
        quiz: [
          { q: "'Djur' kelimesinin çoğulu?", a: "djur (değişmez)", o: ["djur (değişmez)", "djurar", "djurer", "djuren"] },
          { q: "'Journal' çoğulu nasıl olur?", a: "journaler", o: ["journaler", "journalar", "journalor", "journal"] },
          { q: "İyelik nasıl yazılır?", a: "patientens journal", o: ["patientens journal", "patient's journal", "patienten's journal", "patients journal"] },
          { q: "Belirli hâl İsveççede nerede işaretlenir?", a: "Kelimenin sonunda", o: ["Kelimenin sonunda", "Kelimenin başında", "Ayrı bir kelimeyle", "İşaretlenmez"] },
        ] },

      { title: "Verbgrupper & tempus", source: "Svensk grammatik",
        headline: '"Svenska verb böjs inte efter person — jag är, du är, han är. Det är den goda nyheten."',
        vocab: [
          { sv: "grupp 1 (-ar)", tr: "1. fiil grubu", form: "tala – talar – talade – talat", uttal: "grupp ett", ex: "Jag arbetar, jag arbetade, jag har arbetat.", tip: "En büyük ve en düzenli grup. Yeni fiiller hep buraya katılır." },
          { sv: "grupp 2 (-er)", tr: "2. fiil grubu", form: "ringa – ringer – ringde – ringt", uttal: "grupp tvôô", ex: "Jag ringer, jag ringde, jag har ringt.", tip: "2a: -de (ringde), 2b: sert ünsüzden sonra -te (köpte, läste)." },
          { sv: "grupp 3 (-r)", tr: "3. fiil grubu (kısa)", form: "bo – bor – bodde – bott", uttal: "grupp tree", ex: "Jag bor i Malmö, jag bodde i Ankara.", tip: "Tek heceli, ünlüyle biten fiiller: bo, tro, må, sy." },
          { sv: "grupp 4 (starka)", tr: "4. grup: düzensiz fiiller", form: "skriva – skriver – skrev – skrivit", uttal: "STARKa veerb", ex: "Jag skriver journal, jag skrev, jag har skrivit.", tip: "Ünlü değişir. Ezberlemek şart: dricka-drack-druckit, gå-gick-gått." },
          { sv: "presens", tr: "geniş/şimdiki zaman", form: "-r ile biter", uttal: "PRÉÉ-sens", ex: "Jag skriver just nu.", tip: "İsveççede ayrı 'şimdiki zaman' yok; 'håller på att' ile vurgulanır." },
          { sv: "preteritum", tr: "-di'li geçmiş", form: "-ade / -de / -te / ünlü değişimi", uttal: "pre-TÉÉ-ritum", ex: "Igår skrev jag tre journaler.", tip: "Belirli bir geçmiş an için kullanılır. Zaman zarfıyla birlikte gelir." },
          { sv: "perfekt", tr: "-miş'li geçmiş", form: "har + supinum", uttal: "PER-fekt", ex: "Jag har skrivit journalen.", tip: "'har' + supinum (-t/-it). Sonucu bugüne uzanan geçmiş." },
          { sv: "supinum", tr: "perfekt için fiil biçimi", form: "talat / ringt / bott / skrivit", uttal: "SÜÜ-pinum", ex: "Har du ätit?", tip: "Sadece 'har/hade' ile kullanılır. Sıfat gibi kullanılmaz (o 'participium')." },
          { sv: "futurum med 'ska'", tr: "gelecek: niyet", form: "ska + mastar", uttal: "skaa", ex: "Jag ska ringa dig i morgon.", tip: "'ska' = planlanmış/kararlaştırılmış. Bir söz veriyor gibisin." },
          { sv: "futurum med 'kommer att'", tr: "gelecek: tahmin", form: "kommer att + mastar", uttal: "KOMMer att", ex: "Det kommer att regna i morgon.", tip: "'kommer att' = öngörü, senin kontrolünde olmayan şeyler." },
        ],
        quiz: [
          { q: "'Skriva' fiilinin preteritumu?", a: "skrev", o: ["skrev", "skrivade", "skrivde", "skrivit"] },
          { q: "'Jag har ___ journalen' boşluğa ne gelir?", a: "skrivit", o: ["skrivit", "skrev", "skriver", "skriva"] },
          { q: "Yarın yağmur yağacak (tahmin):", a: "Det kommer att regna", o: ["Det kommer att regna", "Det ska regna", "Det regnar", "Det regnade"] },
          { q: "İsveççe fiiller kişiye göre çekimlenir mi?", a: "Hayır", o: ["Hayır", "Evet, hepsi", "Sadece geçmişte", "Sadece 3. kişide"] },
        ] },

      { title: "Partikelverb", source: "Svensk grammatik",
        headline: '"Partikelverb ändrar ofta betydelse helt — att slå upp ett ord är inte att slå någon."',
        vocab: [
          { sv: "tycka om", tr: "sevmek, hoşlanmak", form: "tycka om – tycker om – tyckte om – tyckt om", uttal: "TÜKKa OM", ex: "Jag tycker om att arbeta med djur.", tip: "Vurgu partikelde: tycker OM. 'tycka' tek başına = düşünmek/görüş belirtmek." },
          { sv: "slå upp", tr: "(sözlükte) bakmak", form: "slå upp – slår upp – slog upp – slagit upp", uttal: "slo UPP", ex: "Jag slog upp ordet i lexikonet.", tip: "'slå' = vurmak; partikelle anlamı tamamen değişir." },
          { sv: "komma på", tr: "aklına gelmek / yakalamak", form: "komma på – kommer på – kom på – kommit på", uttal: "komma PO", ex: "Jag kom på en lösning.", tip: "'komma ihåg' = hatırlamak, 'komma överens' = anlaşmak." },
          { sv: "ta hand om", tr: "ilgilenmek, bakmak", form: "ta hand om – tar hand om – tog hand om", uttal: "ta hand OM", ex: "Kan du ta hand om patienten?", tip: "Üç parçalı. 'ta hand om sig' = kendine bakmak." },
          { sv: "ställa in", tr: "iptal etmek / ayarlamak", form: "ställa in – ställer in – ställde in", uttal: "stella İNN", ex: "Operationen ställdes in.", tip: "'inställd' = iptal. Ayrıca cihaz ayarlamak anlamı da var." },
          { sv: "sätta in", tr: "başlatmak (tedavi) / yatırmak (para)", form: "sätta in – sätter in – satte in", uttal: "setta İNN", ex: "Antibiotika sattes in direkt.", tip: "Tıp dilinde çok geçer: 'sätta in behandling'." },
          { sv: "gå ut", tr: "süresi dolmak / dışarı çıkmak", form: "gå ut – går ut – gick ut – gått ut", uttal: "go ÜÜT", ex: "Mitt uppehållstillstånd går ut i mars.", tip: "'gå ut på' = ...ile ilgili olmak: 'Vad går det ut på?'" },
          { sv: "hålla på", tr: "meşgul olmak, ...makta olmak", form: "hålla på – håller på – höll på", uttal: "holla PO", ex: "Jag håller på att skriva journalen.", tip: "'håller på att' + mastar = şimdiki zaman vurgusu. Çok kullanışlı." },
          { sv: "lägga ner", tr: "kapatmak / harcamak (emek)", form: "lägga ner – lägger ner – lade ner", uttal: "legga NÉÉR", ex: "Hon lade ner mycket tid på ansökan.", tip: "'lägga ner ett företag' = şirketi kapatmak." },
          { sv: "skriva ut", tr: "taburcu etmek / reçete etmek", form: "skriva ut – skriver ut – skrev ut", uttal: "skriva ÜÜT", ex: "Patienten skrevs ut på fredagen.", tip: "İki tıbbi anlamı da var: hem taburcu hem reçete. Bağlamdan anlaşılır." },
        ],
        quiz: [
          { q: "'Operationen ställdes in' ne demek?", a: "Ameliyat iptal edildi", o: ["Ameliyat iptal edildi", "Ameliyat ayarlandı", "Ameliyat yapıldı", "Ameliyat ertelendi"] },
          { q: "'Jag håller på att skriva' ne demek?", a: "Şu anda yazıyorum", o: ["Şu anda yazıyorum", "Yazmayı seviyorum", "Yazacağım", "Yazdım"] },
          { q: "'Slå upp ett ord' ne demek?", a: "Kelimeye sözlükten bakmak", o: ["Kelimeye sözlükten bakmak", "Kelimeyi silmek", "Kelimeyi söylemek", "Kelimeyi yazmak"] },
          { q: "Partikel fiillerde vurgu nerededir?", a: "Partikelde", o: ["Partikelde", "Fiilde", "İlk hecede", "Son hecede"] },
        ] },

      { title: "Adjektiv & komparation", source: "Svensk grammatik",
        headline: '"Adjektivet böjs efter substantivets genus, numerus och bestämdhet — tre saker samtidigt."',
        vocab: [
          { sv: "en-form", tr: "en-ord ile sıfat", form: "en stor hund", uttal: "een-form", ex: "en snabb bil, en trött patient", tip: "Temel biçim, ek almaz." },
          { sv: "ett-form", tr: "ett-ord ile sıfat (+t)", form: "ett stort hus", uttal: "ett-form", ex: "ett snabbt tåg, ett trött barn", tip: "Sonuna -t eklenir. En sık yapılan hata burada." },
          { sv: "pluralform", tr: "çoğul sıfat (+a)", form: "stora hundar", uttal: "PLU-raal-form", ex: "snabba bilar, trötta patienter", tip: "Sonuna -a eklenir." },
          { sv: "bestämd form", tr: "belirli hâl sıfatı (+a)", form: "den stora hunden", uttal: "be-STEMD form", ex: "det stora huset, de stora hundarna", tip: "Çift belirlilik! Hem 'den' hem '-en' hem '-a'. İsveççeye özgü." },
          { sv: "komparativ (-are)", tr: "üstünlük derecesi", form: "stor – större – störst", uttal: "kompa-ra-TİİV", ex: "Den här hunden är större.", tip: "Düzenli: snabb → snabbare. Düzensiz: stor → större, god → bättre." },
          { sv: "superlativ (-ast)", tr: "en üstünlük", form: "snabb – snabbare – snabbast", uttal: "super-la-TİİV", ex: "Det är den snabbaste metoden.", tip: "Belirli hâlde -e alır: 'den snabbaste'." },
          { sv: "bra – bättre – bäst", tr: "iyi – daha iyi – en iyi", form: "düzensiz", uttal: "braa – BETTre – best", ex: "Patienten mår bättre i dag.", tip: "En sık kullanılan düzensiz sıfat. 'må bättre' = daha iyi hissetmek." },
          { sv: "dålig – sämre – sämst", tr: "kötü – daha kötü – en kötü", form: "düzensiz", uttal: "DÔÔ-lig – SEM-re – semst", ex: "Tillståndet har blivit sämre.", tip: "'värre' de 'daha kötü' demek ama soyut/durum için: 'det blir värre'." },
          { sv: "mer / mest", tr: "daha / en (uzun sıfatlar)", form: "mer intressant – mest intressant", uttal: "méér / mest", ex: "Det är en mer komplicerad fråga.", tip: "-isk, -ande, -ad ile bitenler ek almaz, 'mer/mest' alır." },
          { sv: "lika ... som", tr: "...kadar", form: "kalıp", uttal: "Lİİka ... som", ex: "Katten är lika gammal som hunden.", tip: "'inte lika ... som' = ...kadar değil. 'än' ise karşılaştırmada: 'större än'." },
        ],
        quiz: [
          { q: "'ett ___ hus' (stor)", a: "stort", o: ["stort", "stor", "stora", "större"] },
          { q: "'den ___ hunden' (stor)", a: "stora", o: ["stora", "stor", "stort", "störst"] },
          { q: "'Dålig' sıfatının komparatifi?", a: "sämre", o: ["sämre", "dåligare", "bättre", "värst"] },
          { q: "'Större ___ hunden' boşluğa ne gelir?", a: "än", o: ["än", "som", "av", "på"] },
        ] },
    ]
  },

  // ════════════════ NYHETSSVENSKA ════════════════
  nyheter: {
    label: "Nyhetssvenska", icon: "📰", color: "green", units: [

      { title: "Politik & samhälle", source: "SVT Nyheter",
        headline: '"Regeringen presenterade i dag ett förslag som ska behandlas av riksdagen under hösten."',
        vocab: [
          { sv: "regering", tr: "hükümet", form: "en regering – regeringen – regeringar", uttal: "re-YÉÉ-ring", ex: "Regeringen föreslår nya regler.", tip: "'riksdagen' = parlamento, 'statsminister' = başbakan." },
          { sv: "riksdag", tr: "parlamento", form: "en riksdag – riksdagen", uttal: "RİKS-daag", ex: "Riksdagen röstade för förslaget.", tip: "349 sandalye. 'rösta för/emot' = lehte/aleyhte oy vermek." },
          { sv: "förslag", tr: "öneri, tasarı", form: "ett förslag – förslaget – förslag", uttal: "för-SLÂÂG", ex: "Förslaget möter kritik från oppositionen.", tip: "'lagförslag' = yasa tasarısı, 'proposition' = hükümet tasarısı." },
          { sv: "utredning", tr: "resmî inceleme raporu", form: "en utredning – utredningen – utredningar", uttal: "ÜÜT-reedning", ex: "En statlig utredning tillsattes.", tip: "'SOU' = Statens offentliga utredningar. İsveç siyasetinin temel aracı." },
          { sv: "beslutsfattare", tr: "karar verici", form: "en beslutsfattare – beslutsfattaren – beslutsfattare", uttal: "be-SLÜÜTS-fattare", ex: "Beslutsfattarna möts i morgon.", tip: "'fatta beslut' = karar vermek fiilinden türer." },
          { sv: "kommun", tr: "belediye", form: "en kommun – kommunen – kommuner", uttal: "kom-MÜÜN", ex: "Kommunen ansvarar för skola och äldreomsorg.", tip: "290 belediye var. 'region' = bölge (sağlık hizmetinden sorumlu)." },
          { sv: "myndighet", tr: "kurum, otorite", form: "en myndighet – myndigheten – myndigheter", uttal: "MÜNN-digheet", ex: "Flera myndigheter samarbetar i frågan.", tip: "Skatteverket, Försäkringskassan vb. hepsi 'myndighet'tir." },
          { sv: "debatt", tr: "tartışma", form: "en debatt – debatten – debatter", uttal: "de-BATT", ex: "Frågan har väckt en het debatt.", tip: "'väcka debatt' = tartışma başlatmak. 'het' = hararetli." },
          { sv: "kritik", tr: "eleştiri", form: "en kritik – kritiken", uttal: "kri-TİİK", ex: "Beslutet får kritik från flera håll.", tip: "'få kritik' = eleştiri almak, 'rikta kritik mot' = eleştiri yöneltmek." },
          { sv: "enligt", tr: "-e göre", form: "edat", uttal: "ÉÉN-ligt", ex: "Enligt regeringen är förslaget nödvändigt.", tip: "Haber dilinin en sık edatı. Kaynak belirtmek için kullanılır." },
        ],
        quiz: [
          { q: "'Riksdagen' nedir?", a: "Parlamento", o: ["Parlamento", "Hükümet", "Belediye", "Mahkeme"] },
          { q: "'Enligt' ne demek?", a: "-e göre", o: ["-e göre", "-e rağmen", "-den beri", "-e doğru"] },
          { q: "Sağlık hizmetinden sorumlu birim?", a: "regionen", o: ["regionen", "kommunen", "riksdagen", "myndigheten"] },
          { q: "'Väcka debatt' ne demek?", a: "Tartışma başlatmak", o: ["Tartışma başlatmak", "Tartışmayı bitirmek", "Tartışmaya girmek", "Tartışmayı kazanmak"] },
        ] },

      { title: "Ekonomi & arbetsmarknad", source: "Dagens Nyheter",
        headline: '"Arbetslösheten sjönk något under kvartalet, samtidigt som inflationen fortsatte att stiga."',
        vocab: [
          { sv: "arbetslöshet", tr: "işsizlik", form: "en arbetslöshet – arbetslösheten", uttal: "AR-beets-lööss-heet", ex: "Arbetslösheten ligger på 7,2 procent.", tip: "'ligga på' = ...seviyesinde olmak. İstatistik dilinin kalıbı." },
          { sv: "inflation", tr: "enflasyon", form: "en inflation – inflationen", uttal: "infla-şÔÔN", ex: "Inflationen steg till fyra procent.", tip: "'stiga' = yükselmek, 'sjunka' = düşmek. İkisi de düzensiz fiil." },
          { sv: "ränta", tr: "faiz", form: "en ränta – räntan – räntor", uttal: "RENN-ta", ex: "Riksbanken höjde räntan med 0,25 procentenheter.", tip: "'Riksbanken' = Merkez Bankası. 'styrränta' = politika faizi." },
          { sv: "konjunktur", tr: "konjonktür, ekonomik gidişat", form: "en konjunktur – konjunkturen", uttal: "kon-yunk-TÜÜR", ex: "Konjunkturen försvagas.", tip: "'högkonjunktur' = canlanma, 'lågkonjunktur' = durgunluk." },
          { sv: "varsel", tr: "işten çıkarma bildirimi", form: "ett varsel – varslet – varsel", uttal: "VÂÂR-sel", ex: "Företaget varslade 200 anställda.", tip: "İsveç'e özgü: toplu işten çıkarma önce resmî olarak bildirilir." },
          { sv: "löneökning", tr: "maaş artışı", form: "en löneökning – löneökningen – löneökningar", uttal: "LÖÖ-ne-ööknıng", ex: "Avtalet ger tvåprocentiga löneökningar.", tip: "'avtalsrörelse' = toplu sözleşme dönemi; her 2-3 yılda bir olur." },
          { sv: "tillväxt", tr: "büyüme", form: "en tillväxt – tillväxten", uttal: "TİLL-vekst", ex: "BNP-tillväxten var svag.", tip: "'BNP' = GSYİH. 'växa' = büyümek fiilinden." },
          { sv: "kvartal", tr: "çeyrek (dönem)", form: "ett kvartal – kvartalet – kvartal", uttal: "kvar-TÂÂL", ex: "Resultatet för tredje kvartalet redovisas i morgon.", tip: "'redovisa' = açıklamak, raporlamak." },
          { sv: "prognos", tr: "öngörü", form: "en prognos – prognosen – prognoser", uttal: "prong-NÔÔS", ex: "Enligt prognosen dämpas ökningen nästa år.", tip: "Hem tıpta hem ekonomide aynı kelime. 'dämpas' = yavaşlamak." },
          { sv: "andel", tr: "pay, oran", form: "en andel – andelen – andelar", uttal: "AAN-deel", ex: "Andelen unga arbetslösa har minskat.", tip: "'andel' = oran/pay, 'antal' = sayı. Çok karıştırılır." },
        ],
        quiz: [
          { q: "'Varsel' ne demek?", a: "İşten çıkarma bildirimi", o: ["İşten çıkarma bildirimi", "Maaş zammı", "İş ilanı", "Grev"] },
          { q: "'Andel' ile 'antal' farkı?", a: "andel = oran, antal = sayı", o: ["andel = oran, antal = sayı", "andel = sayı, antal = oran", "Aynı şey", "andel = toplam"] },
          { q: "'Sjunka' ne demek?", a: "Düşmek", o: ["Düşmek", "Yükselmek", "Sabit kalmak", "Dalgalanmak"] },
          { q: "Merkez Bankası İsveççede?", a: "Riksbanken", o: ["Riksbanken", "Riksdagen", "Regeringen", "Skatteverket"] },
        ] },

      { title: "Klimat & miljö", source: "SVT Vetenskap",
        headline: '"Utsläppen minskade men takten är för långsam för att nå klimatmålen till 2045."',
        vocab: [
          { sv: "utsläpp", tr: "emisyon, salım", form: "ett utsläpp – utsläppet – utsläpp", uttal: "ÜÜT-slepp", ex: "Utsläppen av växthusgaser minskade med tre procent.", tip: "'växthusgas' = sera gazı. 'släppa ut' fiilinden." },
          { sv: "klimatförändring", tr: "iklim değişikliği", form: "en klimatförändring – klimatförändringen – klimatförändringar", uttal: "kli-MÂÂT-för-endring", ex: "Klimatförändringarna påverkar hela ekosystemet.", tip: "Genelde çoğul kullanılır: 'klimatförändringarna'." },
          { sv: "hållbar", tr: "sürdürülebilir", form: "hållbar – hållbart – hållbara", uttal: "HOLL-baar", ex: "En hållbar utveckling kräver långsiktiga beslut.", tip: "'hållbarhet' = sürdürülebilirlik. Ayrıca 'son kullanma tarihi' anlamı da var." },
          { sv: "förnybar energi", tr: "yenilenebilir enerji", form: "förnybar – förnybart – förnybara", uttal: "för-NÜÜ-baar ener-Yİİİ", ex: "Andelen förnybar energi ökar.", tip: "'vindkraft' = rüzgâr, 'vattenkraft' = hidroelektrik, 'kärnkraft' = nükleer." },
          { sv: "återvinning", tr: "geri dönüşüm", form: "en återvinning – återvinningen", uttal: "ÔÔ-ter-vinning", ex: "Sverige har hög grad av återvinning.", tip: "'pant' = depozito (şişe iadesi) — İsveç'te günlük hayatın parçası." },
          { sv: "biologisk mångfald", tr: "biyoçeşitlilik", form: "en mångfald – mångfalden", uttal: "bio-LÔÔ-gisk MONG-fald", ex: "Den biologiska mångfalden hotas.", tip: "'hota' = tehdit etmek, 'hotad art' = tehdit altındaki tür." },
          { sv: "miljöpåverkan", tr: "çevresel etki", form: "en miljöpåverkan – miljöpåverkan", uttal: "mil-YÖÖ-po-verkan", ex: "Transporternas miljöpåverkan är stor.", tip: "'miljö' = çevre; ayrıca 'ortam' anlamına da gelir ('arbetsmiljö')." },
          { sv: "avfall", tr: "atık", form: "ett avfall – avfallet", uttal: "AAV-fall", ex: "Farligt avfall ska lämnas på återvinningscentralen.", tip: "'sopor' günlük dilde çöp; 'avfall' resmî terim." },
          { sv: "målsättning", tr: "hedef", form: "en målsättning – målsättningen – målsättningar", uttal: "MÔÔL-settning", ex: "Målsättningen är nettonollutsläpp 2045.", tip: "'mål' = hedef/gol. 'nå ett mål' = hedefe ulaşmak." },
          { sv: "påverka", tr: "etkilemek", form: "påverka – påverkar – påverkade – påverkat", uttal: "PO-verka", ex: "Besluten påverkar hela branschen.", tip: "'påverkan' = etki (isim). 'bli påverkad' = etkilenmek." },
        ],
        quiz: [
          { q: "'Utsläpp' ne demek?", a: "Emisyon, salım", o: ["Emisyon, salım", "Geri dönüşüm", "Enerji", "Atık"] },
          { q: "'Pant' nedir?", a: "Şişe depozitosu", o: ["Şişe depozitosu", "Vergi", "Ceza", "Kira"] },
          { q: "'Hållbar' kelimesinin ikinci anlamı?", a: "Son kullanma süresi olan (dayanıklı)", o: ["Son kullanma süresi olan (dayanıklı)", "Pahalı", "Hızlı", "Yerli"] },
          { q: "'Hotad art' ne demek?", a: "Tehdit altındaki tür", o: ["Tehdit altındaki tür", "Yeni tür", "Yaygın tür", "Evcil tür"] },
        ] },
    ]
  },

  // ════════════════ UTTRYCK & IDIOM ════════════════
  uttryck: {
    label: "Uttryck & Idiom", icon: "🗣️", color: "gold", units: [

      { title: "Vardagsuttryck", source: "Talspråk",
        headline: '"Det är ingen ko på isen — men vi bör ändå hålla tummarna."',
        vocab: [
          { sv: "Ingen ko på isen", tr: "Acele yok, sorun yok", form: "deyim", uttal: "İNGen kôô po İİsen", ex: "Ta det lugnt, det är ingen ko på isen.", tip: "Kelimesi kelimesine: 'buzun üstünde inek yok'. Panik yapmaya gerek yok." },
          { sv: "Hålla tummarna", tr: "Şans dilemek", form: "deyim", uttal: "HOLLa TUMMarna", ex: "Jag håller tummarna för din intervju!", tip: "İngilizcedeki 'fingers crossed'. İsveçliler başparmaklarını tutar." },
          { sv: "Det ordnar sig", tr: "Yoluna girer", form: "deyim", uttal: "de ÔÔRD-nar sey", ex: "Oroa dig inte, det ordnar sig.", tip: "En sık kullanılan teselli cümlesi." },
          { sv: "Ta det lugnt", tr: "Sakin ol", form: "deyim", uttal: "ta de lungnt", ex: "Ta det lugnt, vi hinner.", tip: "'hinna' = yetişmek — çok kullanışlı bir fiil, Türkçede tam karşılığı yok." },
          { sv: "Skitbra", tr: "Süper, harika", form: "argo sıfat", uttal: "ŞİİT-braa", ex: "Det gick skitbra på provet!", tip: "'skit-' pekiştirici öntakı; kaba sayılmaz ama resmî ortamda kullanma." },
          { sv: "Nja...", tr: "Ee, şey... (kararsızlık)", form: "ünlem", uttal: "nya", ex: "— Var det bra? — Nja, sådär.", tip: "'ja' ve 'nej' arası. 'sådär' = şöyle böyle." },
          { sv: "Typ", tr: "yani, gibi", form: "dolgu sözcüğü", uttal: "tüüp", ex: "Det tar typ tjugo minuter.", tip: "Gençlerin dilinde çok yaygın. Resmî yazıda asla kullanma." },
          { sv: "Alltså", tr: "yani", form: "bağlaç/dolgu", uttal: "ALLT-so", ex: "Alltså, jag menar att vi bör vänta.", tip: "Hem 'yani' hem 'demek ki'. Cümle başında düşünme payı verir." },
          { sv: "Precis som vanligt", tr: "Her zamanki gibi", form: "kalıp", uttal: "pre-SİİS som VÂÂN-ligt", ex: "Han var sen, precis som vanligt.", tip: "'som vanligt' tek başına da kullanılır." },
          { sv: "Det var som tusan!", tr: "Vay canına!", form: "ünlem", uttal: "de var som TUUsan", ex: "Det var som tusan, vad snabbt det gick!", tip: "Eski moda ama sevimli bir şaşkınlık ifadesi." },
        ],
        quiz: [
          { q: "'Ingen ko på isen' ne demek?", a: "Acele yok, sorun yok", o: ["Acele yok, sorun yok", "Çok tehlikeli", "İnek buzda", "Hava soğuk"] },
          { q: "'Hålla tummarna' ne demek?", a: "Şans dilemek", o: ["Şans dilemek", "Sabretmek", "Söz vermek", "Susmak"] },
          { q: "'Hinna' ne demek?", a: "Yetişmek (zamanı olmak)", o: ["Yetişmek (zamanı olmak)", "Koşmak", "Beklemek", "Gecikmek"] },
          { q: "Hangisi resmî yazıda kullanılmaz?", a: "typ", o: ["typ", "alltså", "precis", "vanligt"] },
        ] },

      { title: "Uttryck i arbetslivet", source: "Arbetslivsspråk",
        headline: '"Vi tar det på nästa möte — men låt oss först stämma av läget."',
        vocab: [
          { sv: "stämma av", tr: "durumu kontrol etmek, senkronize olmak", form: "stämma av – stämmer av – stämde av", uttal: "STEMMa AAV", ex: "Vi stämmer av på fredag.", tip: "Ofis dilinin en sık ifadelerinden. 'avstämning' = durum toplantısı." },
          { sv: "återkomma", tr: "geri dönüş yapmak", form: "återkomma – återkommer – återkom", uttal: "ÔÔ-ter-komma", ex: "Jag återkommer med besked.", tip: "E-postaların klasik kapanışı. 'Jag återkommer' = size döneceğim." },
          { sv: "ta höjd för", tr: "payı bırakmak, hesaba katmak", form: "kalıp", uttal: "ta höyd för", ex: "Vi måste ta höjd för förseningar.", tip: "Planlamada risk payı bırakmak demek." },
          { sv: "bolla idéer", tr: "fikir alışverişi yapmak", form: "kalıp", uttal: "BOLLa i-de-ÉÉr", ex: "Ska vi bolla lite idéer före mötet?", tip: "'bolla' = top oynatmak → fikirleri gidip gelmek." },
          { sv: "sätta sig in i", tr: "bir konuya hâkim olmak", form: "kalıp", uttal: "SETTa sey inn i", ex: "Jag behöver sätta mig in i ärendet.", tip: "Dönüşlü fiil: 'sätta sig'. Kendini bir şeyin içine yerleştirmek." },
          { sv: "ligga efter", tr: "geride kalmak", form: "kalıp", uttal: "LİGGa EFFter", ex: "Vi ligger efter i tidsplanen.", tip: "Karşıtı: 'ligga i fas' = programa uygun gitmek." },
          { sv: "höra av sig", tr: "haber vermek, iletişime geçmek", form: "höra av sig – hör av sig – hörde av sig", uttal: "HÖÖra aav sey", ex: "Hör av dig om något ändras!", tip: "Dönüşlü. E-posta/mesaj kapanışında sürekli görürsün." },
          { sv: "i god tid", tr: "erkenden, vaktinde", form: "kalıp", uttal: "i gôôd tiid", ex: "Anmäl dig i god tid.", tip: "'i sista minuten' = son dakikada — karşıtı." },
          { sv: "med vänliga hälsningar", tr: "Saygılarımla (e-posta)", form: "kapanış kalıbı", uttal: "med VENN-liga HELL-sningar", ex: "Med vänliga hälsningar, Volkan", tip: "Kısaltma: 'Mvh'. İş e-postalarının standart bitişi." },
          { sv: "på förhand tack", tr: "Şimdiden teşekkürler", form: "kalıp", uttal: "po FÖÖR-hand tack", ex: "På förhand tack för hjälpen!", tip: "Rica eden e-postaların sonunda çok kullanılır." },
        ],
        quiz: [
          { q: "'Mvh' neyin kısaltmasıdır?", a: "Med vänliga hälsningar", o: ["Med vänliga hälsningar", "Mycket viktig hälsning", "Möte varje helg", "Med vänner här"] },
          { q: "'Jag återkommer' ne demek?", a: "Size döneceğim", o: ["Size döneceğim", "Geri geliyorum", "Tekrar başlıyorum", "Kabul ediyorum"] },
          { q: "'Ligga efter' ne demek?", a: "Programın gerisinde kalmak", o: ["Programın gerisinde kalmak", "Uzanmak", "Öne geçmek", "Beklemek"] },
          { q: "'Hör av dig!' ne demek?", a: "Haber ver!", o: ["Haber ver!", "Dinle!", "Sus!", "Gel!"] },
        ] },

      { title: "Idiom med djur & kropp", source: "Svenska idiom",
        headline: '"Han gick som katten kring het gröt i stället för att ta tjuren vid hornen."',
        vocab: [
          { sv: "Gå som katten kring het gröt", tr: "Lafı dolandırmak", form: "deyim", uttal: "go som KATTen kring heet grööt", ex: "Sluta gå som katten kring het gröt och säg vad du menar.", tip: "'Kedinin sıcak lapanın etrafında dolanması'. Türkçedeki 'lafı ağzında gevelemek'." },
          { sv: "Ta tjuren vid hornen", tr: "Boğayı boynuzundan tutmak", form: "deyim", uttal: "ta ÇÜÜren vid HÔÔRnen", ex: "Det är dags att ta tjuren vid hornen.", tip: "Türkçesiyle neredeyse birebir aynı — kolay ezberlenir." },
          { sv: "Ha en räv bakom örat", tr: "Bir bildiği olmak, kurnaz olmak", form: "deyim", uttal: "ha en reev BÂÂ-kom ÖÖ-rat", ex: "Akta dig, han har en räv bakom örat.", tip: "'Kulağının arkasında tilki olmak'. 'akta dig' = dikkatli ol." },
          { sv: "Skjuta upp", tr: "Ertelemek", form: "skjuta upp – skjuter upp – sköt upp", uttal: "ŞUUta upp", ex: "Vi sköt upp mötet till nästa vecka.", tip: "'skj-' de sj-sesi verir: 'ş/h'. Yazılışa aldanma." },
          { sv: "Ha huvudet på skaft", tr: "Kafası çalışmak", form: "deyim", uttal: "ha HÜÜ-vudet po skaft", ex: "Hon har huvudet på skaft — hon löser det.", tip: "'Kafası sapının üstünde' = akıllı, pratik." },
          { sv: "Lägga korten på bordet", tr: "Açık konuşmak", form: "deyim", uttal: "LEGGa KÔÔRten po BÔÔRdet", ex: "Nu lägger vi korten på bordet.", tip: "'Kartları masaya koymak' — Türkçeyle aynı mantık." },
          { sv: "Inte vara hela världen", tr: "Dünyanın sonu değil", form: "deyim", uttal: "İNTe vaara HÉÉla VEERden", ex: "Det är inte hela världen om du missar bussen.", tip: "Teselli için çok kullanılır. Çok İsveçlice bir 'lagom' yaklaşımı." },
          { sv: "Kasta ett öga på", tr: "Göz atmak", form: "deyim", uttal: "KASSta ett ÖÖ-ga po", ex: "Kan du kasta ett öga på min ansökan?", tip: "Nazik bir rica biçimi." },
          { sv: "Få kalla fötter", tr: "Son anda vazgeçmek", form: "deyim", uttal: "fo KALLa FÖTTer", ex: "Han fick kalla fötter dagen före.", tip: "'Soğuk ayaklar' — İngilizce 'cold feet' ile aynı." },
          { sv: "Hålla masken", tr: "İfadesini bozmamak", form: "deyim", uttal: "HOLLa MASSken", ex: "Jag kunde knappt hålla masken.", tip: "'mask' = maske. Gülmemek için kendini tutmak." },
        ],
        quiz: [
          { q: "'Gå som katten kring het gröt' ne demek?", a: "Lafı dolandırmak", o: ["Lafı dolandırmak", "Aç olmak", "Yavaş yürümek", "Tehlikeye atılmak"] },
          { q: "'Det är inte hela världen' ne demek?", a: "Dünyanın sonu değil", o: ["Dünyanın sonu değil", "Çok önemli", "Herkes biliyor", "Çok büyük"] },
          { q: "'Ha en räv bakom örat' ne demek?", a: "Kurnaz olmak", o: ["Kurnaz olmak", "Kulağı ağrımak", "Hayvan sevmek", "Saklanmak"] },
          { q: "'Skj-' harf grubu nasıl okunur?", a: "ş/h sesi", o: ["ş/h sesi", "sk gibi", "sky gibi", "s gibi"] },
        ] },
    ]
  },
};

const TOPIC_ORDER = ["vet", "med", "system", "vardag", "grammatik", "nyheter", "uttryck"];

// ── GÜNLÜK İÇERİK PROMPTU ────────────────────────────────
const DAILY_SYSTEM_PROMPT = `Du är redaktör för "Svenska Herald", en plattform där turkiska yrkespersoner lär sig svenska. Öğrenci Türk; açıklamalar TÜRKÇE, dil malzemesi İSVEÇÇE olmalı.

STIL: SVT Nyheter / Dagens Nyheter / Läkartidningen tarzı, gerçekçi ve bilgilendirici. Uydurma iddialarda bulunma; genel ve doğru bilgilere dayan.

SVARA ENDAST med denna JSON, inget annat:

{
  "source": "SVT Nyheter",
  "topic": "Hälsa",
  "headline": "İsveççe haber başlığı",
  "summary": "3-4 cümle İsveççe özet, öğrencinin CEFR seviyesine uygun",
  "tr_summary": "2 cümle Türkçe özet",
  "words": [
    {"sv": "ord", "tr": "Türkçe karşılık", "cat": "vet|med|system|vardag|grammatik|nyheter|uttryck", "form": "en/ett + belirli + çoğul, ya da fiil çekimi (4 hâl)", "uttal": "Türk okuyucu için telaffuz", "ex": "İsveççe örnek cümle", "tip": "Türkçe ipucu: kullanım farkı, yanlış dost, bileşik kelime mantığı"}
  ],
  "quiz": [
    {"q": "Soru", "o": ["şık1","şık2","şık3","şık4"], "a": "doğru şık", "why": "kısa Türkçe açıklama"}
  ]
}

- 6 kelime üret; en az 2 tanesi özet metninde geçsin.
- 'form' alanı ZORUNLU: isimlerde "en journal – journalen – journaler", fiillerde "skriva – skriver – skrev – skrivit".
- 3 soruluk quiz: biri kelime anlamı, biri bağlamdan çıkarım, biri gramer/kullanım.`;

