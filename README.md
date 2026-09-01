# Svenska Herald 🇸🇪

AI destekli İsveççe öğrenme platformu — veteriner hekimlik, tıp, İsveç kurumları, gramer ve **journalföring**.
Sunucusuz, kurulumsuz, tek sayfalık bir web uygulaması. Tüm veriler tarayıcında kalır.

*The English Herald'ın kardeş projesi; aynı mimari, tamamen İsveççeye ve İsveç sistemine uyarlanmış içerik.*

🔗 **Canlı:** https://volkeys.github.io/svenska-herald

---

## ✨ Neler var?

| Bölüm | Açıklama |
|---|---|
| 📖 **Lektioner** | 7 konu, 33 ünite, **332 kelime** · her kelimede çekim (en/ett, belirli hâl, çoğul / fiilin 4 hâli), telaffuz, örnek cümle ve Türkçeye özgü ipucu |
| 📰 **Dagens** | AI her gün seviyene uygun haber, özet, 6 kelime ve mini quiz üretir |
| 🔁 **Repetition** | SM-2 aralıklı tekrar · **sv→tr / tr→sv yön değiştirme**, klavye kısayolları |
| 📚 **Ordbanken** | Arama, kategori filtresi, sıralama, tekrar tarihi, CSV dışa aktarma |
| 🎓 **Prov** | **4 farklı standart**: CEFR · SFI/SAS · TISUS · Socialstyrelsen (aşağıda) |
| 📋 **Journal** | Hasta kaydı yazma, okuma, kısaltmalar ve şablonlar (aşağıda) |
| 📊 **Framsteg** | XP, seviye, gün serisi, 90 günlük aktivite haritası, 14 rozet |
| 💬 **AI-läraren** | Streaming yanıt, sesli konuşma (sv-SE), anlık hata düzeltme, **10 rol yapma senaryosu** |

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

## 🛠️ Teknik

Bağımlılık yok, derleme adımı yok — düz HTML/CSS/JS.

| Dosya | İçerik |
|---|---|
| `index.html` | İskelet, ayarlar modalı, 8 sekme |
| `style.css` | Tüm stiller, açık/koyu tema |
| `data.js` | Ders içeriği (7 konu, 33 ünite, 332 kelime) ve günlük içerik promptu |
| `exam-data.js` | 4 standart, görev bankaları, SBAR, departmanlar, değerlendirme promptları |
| `app.js` | Çekirdek: depolama, durum, streaming API, sv-SE ses/mikrofon, dersler, tekrar, banka, ilerleme |
| `chat.js` | AI-läraren — streaming, sesli konuşma, düzeltme, rol yapma |
| `exam.js` | Provdelen — skriva, tala, läsa, lyssna, resultat |
| `journal.js` | Journalföring — skriva, läsa, förkortningar, mallar |
| `sw.js`, `manifest.json` | Çevrimdışı çalışma ve PWA |

Tüm dinamik içerik `esc()` ile kaçırılır; AI çıktısı hiçbir zaman ham HTML olarak eklenmez.
Kullanıcı etkileşimleri `data-act` öznitelikleri ve tek bir olay dinleyicisi üzerinden yürür.

### Yayınlama
GitHub'da yeni bir repo aç (`svenska-herald`), 11 dosyayı yükle,
Settings → Pages → Deploy from a branch → varsayılan dal / `(root)` → Save.

---

*Svenska Herald — Türkçe'den İsveççeye, ämne för ämne, dag för dag*
