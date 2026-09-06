# Svenska Herald 🇸🇪

AI destekli İsveççe öğrenme platformu — veteriner hekimlik, tıp, İsveç kurumları, gramer ve **journalföring**.
Sunucusuz, kurulumsuz, tek sayfalık bir web uygulaması. Tüm veriler tarayıcında kalır.

*The English Herald'ın kardeş projesi; aynı mimari, tamamen İsveççeye ve İsveç sistemine uyarlanmış içerik.*

🔗 **Canlı:** https://volkeys.github.io/svenska-herald

---

## ✨ Neler var?

| Bölüm | Açıklama |
|---|---|
| 📖 **Lektioner** | 7 konu, 33 ünite, 332 ders kelimesi (+ **1 933 kelimelik kürasyonlu ordlista**) · her kelimede çekim (en/ett, belirli hâl, çoğul / fiilin 4 hâli), telaffuz, örnek cümle ve Türkçeye özgü ipucu |
| 📰 **Dagens** | **Her gün otomatik yenilenen brifing** — aşağıda |
| 🔁 **Repetition** | SM-2 aralıklı tekrar · **sv→tr / tr→sv yön değiştirme**, klavye kısayolları |
| 📚 **Ordbanken** | Üç mod: ⭐ *Mina ord* (arama, filtre, sıralama, tekrar tarihi, CSV dışa aktarma) · 📕 **Hela ordlistan — 2 095 kelime** · ⚡ *Skapa & importera* (AI paket üreticisi + CSV içe aktarma) |
| 🎓 **Prov** | **4 farklı standart**: CEFR · SFI/SAS · TISUS · Socialstyrelsen (aşağıda) |
| 📋 **Journal** | Hasta kaydı yazma, okuma, kısaltmalar ve şablonlar (aşağıda) |
| 🛠️ **Verktyg** | Mesleki İsveççe araçları — journal çevirici, djurägarråd, röntgen, doz, yazışma (aşağıda) |
| 📊 **Framsteg** | XP, seviye, gün serisi, 90 günlük aktivite haritası, 14 rozet |
| 💬 **AI-läraren** | Streaming yanıt, sesli konuşma (sv-SE), anlık hata düzeltme, **10 rol yapma senaryosu** |

---

## 📰 Dagens — her gün değişen brifing

Uygulamayı günde ilk kez açtığında brifing **kendiliğinden** hazırlanır. Beş bölüm var:

**🔤 Dagens ord** — 5 kelime, **API'siz çalışır**. Tarihe göre deterministik döner: aynı gün hep aynı,
ertesi gün başka. Havuz artık **1 371 kelime** (vet · med · system · vardag · nyheter): tur bitmeden
hiçbir kelime tekrarlanmaz, yani **274 günlük tekrarsız döngü**. Tur bittiğinde sıra yeniden karılır.
Ordbanken'e kendi kelimelerini eklersen havuz da o kadar büyür.

**🤖 Dagens AI-ord + nyhet** — AI o gün için haber, Türkçe özet, 6 kelime ve 3 soruluk quiz üretir.
Son 14 günün konularını hatırlar ve tekrarlamaz.

**✏️ Dagens grammatik · 🗣️ Dagens uttryck · 🩺 Dagens fackfras** — her gün bir gramer kuralı, bir deyim ve
bir journal kalıbı. Bunlar da API'siz çalışır ve gün gün döner. Fackfras'ı tek tıkla ordbanken'e eklersin.

**⚡ Günlük Veteriner Klinik Bilgi Paketi** — kurulumda hazır gelir. Her gün başka bir tür, sistem ve
aciliyet düzeyinden yedi bölümlük bir paket üretir: *Dagens fall · 5 fackord (çekimli) · journalfras ·
differentialdiagnoser · läkemedel & dos · djurägarfras · snabbfråga*.
⚙️ Ayarlar → Studier'den üzerine kendi promptunu yazabilir, hazır pakete tek tuşla dönebilirsin.
Aynı promptun her gün farklı çıktı vermesi için tarih ve tekrar etmeme kuralı sisteme dahil edildi.

**🔁 Dünün tekrarı** — dün gördüğün kelimelerden 3 soruluk hızlı test. Tamamen yerel, API gerektirmez.

### Ana sayfa da her gün değişir
**Lektioner** sekmesini açtığında en üstte o günün 5 kelimesi durur. Altındaki ders de her gün başka
bir üniteye ayarlanır — 33 ünite, 33 günde tam tur — ve o ünite *Dagens avsnitt* rozetiyle işaretlenir.
Gün içinde istediğin konuya geçebilirsin; seçimin ertesi güne kadar korunur.

---

## 📕 Ordlistan — 2 095 kelime, 10 000'e giden yol

**Ordbanken** sekmesi artık üç modlu:

| Mod | Ne yapar |
|---|---|
| ⭐ **Mina ord** | Yıldızladığın kelimeler — tekrar programına giren, SM-2 ile takip edilen liste |
| 📕 **Hela ordlistan** | **Tüm sözlük, 2 095 kelime.** İsveççe, Türkçe ve örnek cümlelerde arama · konu filtresi · CEFR seviye filtresi · kaynak filtresi (ders / ordlista / kendi kelimelerin) |
| ⚡ **Skapa & importera** | AI'a konu + seviye + adet verip yeni paket ürettirirsin, ya da hazır CSV'ni yüklersin |

### Sözlük nereden geliyor?

Üç kaynak `dict()` içinde birleşir, `sv` alanına göre tekilleştirilir:

1. **Ders kelimeleri** — 332 kelime, ünitelerin içinden
2. **Kürasyonlu ordlista** (`vocab.js`) — **1 933 kelime**, elle yazıldı ve tek tek kontrol edildi.
   Konu dağılımı: veterinärmedicin 268 · humanmedicin 249 · myndigheter & arbetsliv 259 ·
   vardag 276 · grammatik (verb, adjektiv, funktionsord) 390 · nyheter 214 · uttryck & idiom 277
3. **Kendi kelimelerin** — ürettiğin paketler ve içe aktardığın CSV'ler (tarayıcında saklanır, yedeğe dahil)

Her kelimede **çekim zorunlu**: `en journal – journalen – journaler`, `att skriva – skriver – skrev –
har skrivit`, `stor – stort – stora`. Telaffuz Türkçe okunuşla ve vurgulu hece **BÜYÜK** yazılır.
İpucu alanı Türkçedir: yanlış dost, edat farkı, bileşik kelimenin mantığı ya da Türklerin sık yaptığı hata.

### 10 000'e nasıl çıkarsın?

Sana 1 933 doğru kelime yazdım — 10 000 kelimenin tamamını elle yazıp her birinin `en/ett`'ini ve
çoğulunu garanti edemem, ve **yanlış bir `en/ett` eksik kelimeden kötüdür**: yıllarca tekrarlarsın.
O yüzden mimari şöyle: sağlam bir çekirdek + kendi büyütme aracın.

**⚡ Skapa** ile: konu (ya da serbest metin — *"ortopedisk kirurgi"*, *"hästens rörelseapparat"*),
seviye ve adet (15 / 25 / 50) seç. AI paketi üretir, **kaydetmeden önce listeyi görürsün** —
çekimi ya da çevirisi şüpheli görüneni işaretten çıkarırsın. Sözlükte zaten olanlar otomatik elenir.
Promptta açık kural var: *"genus ya da çoğul konusunda emin değilsen BAŞKA BİR KELİME SEÇ."*

Günde iki 50'lik paket = ayda ~3 000 kelime. Üç ayda 10 000'i geçersin, hem de kendi mesleğinin
kelimeleriyle. **📄 CSV** ile de elindeki hazır listeyi doğrudan yükleyebilirsin
(`sv,tr` zorunlu; `form, uttal, ex, tip, cat, lvl` isteğe bağlı — örnek şablonu indirebilirsin).

Sözlüğe giren her kelime **her yerde** kullanılır: günün kelimeleri, tekrar programı, arama, filtreler.

## 🛠️ Verktyg — mesleki İsveççe araçları

Bunlar dil alıştırması değil, **işini gördüren araçlar**. Notunu Türkçe, İngilizce ya da karışık yazarsın;
araç sana kopyalayıp kullanabileceğin profesyonel İsveççe metni verir. Her çıktının altında hangi terimi
neden seçtiğini anlatan Türkçe not olur — kullanırken öğrenirsin.

| Araç | Ne yapar |
|---|---|
| 📋 **Journal-omskrivning** | Dağınık notunu Anamnes / Status / Bedömning / Åtgärd yapısında profesyonel journal metnine çevirir |
| 🐕 **Djurägarråd** | Klinik bulguyu hasta sahibinin anlayacağı sade İsveççeye çevirir; "ne zaman ara" güvenlik ağı zorunlu |
| 🩻 **Röntgenutlåtande** | Gözlemlerinden Fynd + Bedömning yapısında rapor yazar, pozisyon/kalite sınırlarını not eder |
| 💊 **Dos & ordination** | Hesabı adım adım gösterir (mg/kg × kg → mg → ml), kullandığı referans aralığını söyler, tür kontrendikasyonlarını ayrı bir uyarı bloğunda listeler |
| ✉️ **Kundkommunikation** | Randevu, tedavi bilgisi, sigorta kararı, fatura, teklif, takip ve şikâyet yanıtı |

Ortak kurallar: araç **underlagda olmayan hiçbir bulgu, doz ya da tanı eklemez**; eksik bilgi varsa uydurmak
yerine *"Underlaget saknar"* listesine yazar. Doz aracında art, kilo, konsantrasyon veya endikasyon eksikse
**hesap yapmaz**.

> ⚠️ Çıktılar dil taslağıdır, klinik karar değildir. Tıbbi içeriğin, dozun ve endikasyonun doğruluğundan
> kullanan sorumludur. Doz aracı hesabı açıkça gösterir ki kontrol edebilesin.

---

## 📋 Journalföring — projenin kalbi

İsveç'te journalföring yasal bir yükümlülüktür ve mesleki dil yeterliğinin fiilen ölçüldüğü yerdir:
bir meslektaşın senin notunu okuyup **hiçbir şey sormadan** devam edebilmesi gerekir. Bu modül tam olarak bunu çalıştırır.

**✍️ Skriva** — Bir *fall* seçersin (6 hazır vaka: veteriner + insan, B1–C1; ya da AI'a yeni vaka ürettirirsin).
Vaka sana ham veri verir — anamnez ve status bilgileri karışık sırada, tıpkı gerçekte olduğu gibi.
Senin işin bunları dört başlık altında journal üslubuyla düzenlemek: **Anamnes · Status · Bedömning · Åtgärd**.
Her başlığın yanında "ne yazılır" açıklaması var. Gönderdiğinde AI:

- her bölüme ayrı puan ve gerekçe verir
- vakada olup journalinde **eksik kalan** bilgileri listeler
- **hasta/hayvan güvenliği risklerini** ayrı başlıkta gösterir (belirsiz doz, eksik taraf, muğlak takip)
- yanlış kullandığın **terminolojiyi** doğrusuyla değiştirir
- dil hatalarını (ordföljd, genus, verbform, preposition) düzeltir
- journal üslubuna dair öneriler verir ve **örnek bir journal** yazar

**📖 Läsa** — AI gerçek bir İsveç journalı gibi kısa, telegrafik ve kısaltmalı bir metin üretir.
Anlama soruları, **kısaltma açma** soruları ve klinik akıl yürütme soruları ile test edilirsin.

**🔤 Förkortningar** — 65 yaygın kısaltmanın açık hâli ve Türkçe karşılığı: `u.a.`, `AT`, `bltr`, `TPR`, `CRT`,
`KAD`, `PVK`, `po/iv/im/sc`, `vb`, `Hb`, `LPK`, `CRP`, `krea`, `SDMA`, `pu/pd`… Arama, kategori filtresi,
tek tıkla ordbanken'e ekleme.
*Kısaltmalar iş yerine göre değişebilir; Socialstyrelsen çift anlamlı kısaltmalardan kaçınılmasını önerir.*

**📐 Mallar** — Her bölümün altına ne yazılır, 24 standart kalıp cümle, **SBAR** (kollegial rapor),
epikris yapısı ve journalda kaçınılması gerekenler.

---

## 🎓 Prov — dört standart, aynı arayüz

Üstteki şeritten standardı seçersin; kriterler, zorluk ve sonuç etiketi ona göre değişir.

| Standart | Ne için | Sonuç |
|---|---|---|
| 🌍 **CEFR** | Genel Avrupa ölçeği, A1–C2 | Tahmini CEFR seviyesi |
| 🏫 **SFI / SAS** | SFI kurs C–D ve Svenska som andraspråk 1–3, nationella prov formatı | Betyg A–F |
| 🎓 **TISUS** | Üniversiteye giriş için akademik yeterlik | Godkänd / Underkänd |
| ⚕️ **Socialstyrelsen** | Legitimation için C1 mesleki İsveççe | C1: Godkänd / Ej godkänd ännu |

Dört bölüm de her standartta çalışır:

- **✍️ Skriva** — Standarda özel görev bankası (CEFR 9 · SFI/SAS 7 · TISUS 5 · Socialstyrelsen 7 mesleki belge:
  journalanteckning, remiss, epikris, patientinformation, intyg, avvikelserapport) + AI üretimi görevler.
  Süre sayacı, kelime sayacı, 4 kritere göre puan, hata listesi, seviye yükselten alternatifler, model metin.
- **🎙️ Tala** — Sorular sesli okunur, mikrofonla İsveççe cevaplarsın, tarayıcı yazıya çevirir.
  Socialstyrelsen modunda: hasta görüşmesi, hastaya sade dille açıklama, **SBAR ile meslektaş raporu**.
  *Transkript otomatik olduğu için telaffuz puanı tahminidir ve arayüzde böyle işaretlenir.*
- **📖 Läsa** — **8 departman** (veteriner, tıp, kurumlar, günlük hayat, haber, bilim, hukuk/etik, iş hayatı)
  × **6 zorluk seviyesi**. Sant/Falskt/Framgår inte, çoktan seçmeli, boşluk doldurma, kelime anlamı.
  C1–C2'de sorular çıkarım gerektirir.
- **🎧 Lyssna** — 5 tür: günlük diyalog, klinik konsültasyon, SBAR devir teslim, akademik ders, haber bülteni.
  Metin tarayıcı sesiyle okunur, sorular otomatik puanlanır, sonunda tam metin gösterilir.

**📈 Resultat** — Tüm denemelerin geçmişi, bölüm ortalamaları, trend grafiği ve kriterlerin en zayıftan
en güçlüye sıralanması.

> Değerlendirmeler AI tahminidir; gerçek sınav sonucu yerine geçmez. Zayıf yönlerini görmek için bir pusuladır.

---

## 💬 AI-läraren

- **Streaming yanıt** — cevap harf harf akar, istediğin an durdurabilirsin
- **Sesli konuşma** — 🎙️ tuşuna bas, İsveççe konuş; AI yazsın ve sesli cevaplasın.
  "AI bitince mikrofonu aç" seçersen kesintisiz sohbet olur
- **Anlık düzeltme** — İsveççe yazdığında önce hatanı düzeltir, kuralını Türkçe söyler (V2, BIFF, en/ett, preposition)
- **10 rol yapma senaryosu** — Hos läkaren · Orolig djurägare · SBAR till kollega · Ge ett svårt besked ·
  På apoteket · Myndighetssamtal · Anställningsintervju · **Fikarummet** · Samtal med hyresvärd · TISUS muntlig del
- Öğrettiği her kelimeyi çekimiyle birlikte tek tıkla ordbanken'e ekler

---

## 📚 Ders içeriği

| Konu | Ünite | Kelime |
|---|---|---|
| 🐾 Veterinärmedicin | 7 | 72 |
| 🏥 Humanmedicin | 6 | 60 |
| 🏛️ Myndigheter & Samhälle | 5 | 50 |
| 💬 Vardagssvenska | 4 | 40 |
| ✏️ Grammatik | 5 | 50 |
| 📰 Nyhetssvenska | 3 | 30 |
| 🗣️ Uttryck & Idiom | 3 | 30 |
| **Toplam** | **33** | **332** |

Gramer bölümü İsveççenin gerçekten zor kısımlarını hedefler: **V2 kuralı**, **BIFF kuralı**, en/ett ve
bestämd form, beş çoğul grubu, dört fiil grubu, partikel fiiller, sıfat çekimi ve komparasyon.

Kurumlar bölümü günlük hayatta gerçekten lazım olanı verir: Skatteverket & personnummer,
Försäkringskassan, Arbetsförmedlingen & kollektivavtal, Migrationsverket & uppehållstillstånd, bostad & kontrakt.

---

## 🔑 Kurulum

1. https://console.anthropic.com/settings/keys → **Create Key**
2. Uygulamayı aç → ⚙️ → **API** → anahtarı yapıştır → Spara
3. ⚙️ → **Studier**: CEFR seviyeni, provstandard'ı ve mesleğini gir — AI hepsine göre kendini ayarlar
4. ⚙️ → **Ljud**: İsveççe bir ses seç ve test et

API anahtarın yalnızca senin tarayıcının `localStorage`'ında durur; hiçbir sunucuya gönderilmez,
aldığın yedeklere de dahil edilmez.

**API anahtarı olmadan da:** tüm dersler, quizler, kelime bankası, tekrar sistemi, kısaltma sözlüğü,
journal şablonları ve sınav görevleri çalışır. Yalnızca AI puanlaması ve içerik üretimi anahtar ister.

### 🔊 İsveççe ses yoksa
Tarayıcıda İsveççe TTS sesi yüklü değilse telaffuz yanlış olur. Eklemek için:
**Windows** → Ayarlar → Saat ve Dil → Konuşma → Ses ekle → *Svenska*.
**macOS** → Sistem Ayarları → Erişilebilirlik → Konuşulan İçerik → Sesler → *Svenska*.
Uygulama ses bulamazsa ⚙️ → Ljud bölümünde uyarır.

Mikrofon (sv-SE konuşma tanıma) Chrome ve Edge'de çalışır; Safari ve Firefox'ta sınırlıdır.

---

## ⌨️ Kısayollar

`1`–`8` sekmeler · `Space` kartı çevir · `1/2/3` tekrar kartını değerlendir · `←` `→` gezinme · `Esc` kapat / sesi durdur

---

## 📱 Çevrimdışı & mobil

Service worker sayesinde dersler, kelime bankan, kısaltma sözlüğü ve journal şablonları internetsiz de
çalışır (AI özellikleri doğal olarak bağlantı ister). Telefonda "Ana ekrana ekle" dersen uygulama gibi açılır.

---

## 📱 Telefona uygulama olarak kurmak

Her iki proje de **PWA** — App Store / Play Store'a gerek yok, siteyi açıp ana ekrana eklemen yeterli.
Sonrası gerçek bir uygulama gibi: kendi simgesi, tam ekran (tarayıcı çubuğu yok), çevrimdışı çalışma.

### iPhone / iPad (Safari — Chrome'dan olmaz)
1. **Safari**'de siteyi aç
2. Alttaki **Paylaş** düğmesi (kare + yukarı ok)
3. Listede aşağı in → **Ana Ekrana Ekle**
4. **Ekle** → simge ana ekranda

### Android (Chrome)
1. Chrome'da siteyi aç
2. Sağ üstteki **⋮** → **Uygulamayı yükle** *(ya da "Ana ekrana ekle")*
3. Alttan bir kurulum önerisi de çıkabilir — ona da basabilirsin

### Kurulunca ne değişir?
- Dersler, sözlük, tekrar sistemi, kısayollar **internetsiz** çalışır
- Sadece AI özellikleri (sohbet, sınav değerlendirmesi, günlük brifing) internet ister
- API anahtarın ve kelimelerin **sadece o cihazda** saklanır — telefon ve bilgisayar ayrı ayrıdır

### Telefonda çalışmayan tek şey
**iPhone'da mikrofonla konuşma tanıma çalışmaz.** Apple, WebKit'te Speech Recognition API'sini
web sitelerine açmıyor — Chrome yüklesen de değişmez, çünkü iOS'ta her tarayıcı Safari motorunu kullanır.
Seslendirme (🔊 dinleme) her cihazda çalışır, Speaking / Tala pratiğini **yazarak** yapabilirsin.
Android Chrome'da mikrofon sorunsuz çalışır.

### Uygulamayı güncellemek
Yeni sürümü GitHub'a yükledikten sonra telefondaki uygulamayı **kapat ve yeniden aç** — iki açılışta
kendini günceller. Hemen istiyorsan: uygulamayı sil, tarayıcıdan siteyi aç, tekrar ana ekrana ekle.
Kelimelerin ve ayarların silinmeden önce **⚙️ → 💾 Veri → yedek al** demeyi unutma.

## 🛠️ Teknik

Bağımlılık yok, derleme adımı yok — düz HTML/CSS/JS.

| Dosya | İçerik |
|---|---|
| `index.html` | İskelet, ayarlar modalı, 8 sekme |
| `style.css` | Tüm stiller, açık/koyu tema |
| `data.js` | Ders içeriği (7 konu, 33 ünite, 332 kelime) ve günlük içerik promptu |
| `vocab.js` | **Kürasyonlu ordlista — 1 933 kelime**, hepsi çekimli (en/ett, çoğul, fiilin 4 hâli), telaffuzlu, örnek cümleli |
| `ordlista.js` | Sözlük katmanı: `dict()` birleştirme, göz atma/arama/filtre, AI paket üreticisi, CSV içe aktarma |
| `exam-data.js` | 4 standart, görev bankaları, SBAR, departmanlar, değerlendirme promptları |
| `app.js` | Çekirdek: depolama, durum, streaming API, sv-SE ses/mikrofon, dersler, tekrar, banka, ilerleme |
| `chat.js` | AI-läraren — streaming, sesli konuşma, düzeltme, rol yapma |
| `exam.js` | Provdelen — skriva, tala, läsa, lyssna, resultat |
| `journal.js` | Journalföring — skriva, läsa, förkortningar, mallar |
| `tools.js` | Verktyg — 5 mesleki İsveççe aracı |
| `sw.js`, `manifest.json` | Çevrimdışı çalışma ve PWA |

Tüm dinamik içerik `esc()` ile kaçırılır; AI çıktısı hiçbir zaman ham HTML olarak eklenmez.
Kullanıcı etkileşimleri `data-act` öznitelikleri ve tek bir olay dinleyicisi üzerinden yürür.

### Yayınlama
GitHub'da yeni bir repo aç (`svenska-herald`), 14 dosyayı yükle,
Settings → Pages → Deploy from a branch → varsayılan dal / `(root)` → Save.

---

*Svenska Herald — Türkçe'den İsveççeye, ämne för ämne, dag för dag*
