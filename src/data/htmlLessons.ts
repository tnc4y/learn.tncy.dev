import { LessonContent } from "./lessonsData";
import { HTML_ADVANCED_LESSONS } from "./htmlAdvancedLessons";

const CORE_HTML_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // 1. HTML5 TEMELLERİ, BELGE YAPISI & DOM
  // ========================================================
  "html-intro": {
    id: "html-intro",
    badge: "Modül 1 • HTML5 Temelleri",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "HTML5 Temelleri, Sayfa İskeleti & DOM Mimarisi",
    subtitle: "Web'in omurgası: DOCTYPE, html, head, body etiketleri, etiket anatomisi ve tarayıcı DOM ağacı.",
    sections: [
      {
        title: "1. HTML Nedir ve Tarayıcılar Nasıl Çalışır?",
        content: `**HTML (HyperText Markup Language)**, web sayfalarının iskeletini ve anlamsal yapısını oluşturan işaretleme dilidir. HTML bir programlama dili değildir; tarayıcıya (Chrome, Safari, Firefox) sayfadaki metinlerin, resimlerin, butonların ve formların nasıl yapılandırılacağını söyleyen bir standarttır.

Tarayıcı bir HTML dosyasını indirdiğinde, etiketleri yukarıdan aşağıya okur ve bellekte nesnelerden oluşan bir aile ağacı kurar: buna **DOM (Document Object Model)** denir.`,
      },
      {
        title: "2. Standart HTML5 Belge İskeleti",
        content: `Her modern HTML5 belgesi aşağıdaki asgari iskeletle başlar:
- **\`<!DOCTYPE html>\`**: Tarayıcıya bu belgenin modern HTML5 standart modunda (Standards Mode) işlenmesi gerektiğini bildirir.
- **\`<html lang="tr">\`**: Belgenin kök etiketidir; sayfanın dilini belirtir (SEO ve ekran okuyucular için kritiktir).
- **\`<head>\`**: Kullanıcıya görünmeyen ancak tarayıcı ve arama motorları için hayati önem taşıyan meta verileri (meta, title, link) barındırır.
- **\`<body>\`**: Kullanıcının ekranda gördüğü tüm içerikleri (başlıklar, paragraflar, resimler) barındırır.`,
        code: {
          language: "html",
          caption: "index.html - Minimal HTML5 İskeleti",
          snippet: `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İlk Web Sayfam</title>
</head>
<body>
    <h1>Merhaba Dünya!</h1>
    <p>HTML5 öğrenerek modern web geliştirme dünyasına ilk adımımı atıyorum.</p>
</body>
</html>`,
        },
      },
      {
        title: "3. Etiket Anatomisi (Elements, Attributes & Void Tags)",
        content: `HTML elemanları genellikle bir açılış etiketi, içerik ve kapanış etiketinden oluşur:
\`<p class="vurgu">Örnek Metin</p>\`
- \`<p>\`: Açılış etiketi (Opening Tag)
- \`class="vurgu"\`: Nitelik (Attribute - elemana ek özellik kazandırır)
- \`Örnek Metin\`: İçerik (Content)
- \`</p>\`: Kapanış etiketi (Closing Tag)

**Kendi Kendini Kapatan (Void) Etiketler:** İçinde metin barındırmayan \`<img>\`, \`<br>\`, \`<hr>\`, \`<input>\`, \`<meta>\` gibi etiketlerin kapanış etiketi olmaz.`,
      },
    ],
    playground: {
      title: "Canlı HTML5 Sayfa İskeleti ve DOM Önizleme",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Canlı HTML5 Testi</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 25px; background: #0f172a; color: #f8fafc; line-height: 1.6; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; }
    h1 { color: #38bdf8; margin-top: 0; font-size: 24px; }
    p { color: #cbd5e1; font-size: 15px; }
    .badge { display: inline-block; background: #0284c7; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">HTML5 Standart Mod</span>
    <h1>🌐 Merhaba, Modern Web!</h1>
    <p>
      Bu sayfa standart bir <code>&lt;!DOCTYPE html&gt;</code> iskeleti üzerinde çalışmaktadır.
      Tarayıcı bu etiketleri okuyarak DOM (Belge Nesne Modeli) hiyerarşisi oluşturdu.
    </p>
    <hr style="border-color: #334155; margin: 15px 0;">
    <small style="color: #94a3b8">learn.tncy.dev • İnteraktif Canlı Web Önizleme</small>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[DOCTYPE] HTML5 Standart Modda tarayıcı tarafından yorumlandı.",
        "[DOM] h1, p ve div etiketleri DOM ağacına başarıyla yerleştirildi.",
      ],
    },
    quiz: {
      question: "Modern bir HTML dökümanının ilk satırında yer alan '<!DOCTYPE html>' bildiriminin temel amacı nedir?",
      options: [
        "A) Web sunucusunun IP adresini belirlemek",
        "B) Tarayıcıya belgenin modern HTML5 standart modunda (Standards Mode) işlenmesi gerektiğini bildirmek",
        "C) CSS stil dosyalarını sayfaya dahil etmek",
        "D) JavaScript derleyicisini başlatmak",
      ],
      correctIndex: 1,
      explanation: "Doğru! '<!DOCTYPE html>' bildirimi tarayıcının eski uyumluluk moduna (Quirks Mode) geçmesini engeller ve modern HTML5 standartlarında işlemesini sağlar.",
    },
  },

  // ========================================================
  // 2. HEAD BÖLÜMÜ, META ETİKETLERİ & SEO
  // ========================================================
  "html-head-meta": {
    id: "html-head-meta",
    badge: "Modül 1 • HTML5 Temelleri",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Head Bölümü, Meta Etiketleri & SEO Optimizasyonu",
    subtitle: "<head> anatomisi, <title>, viewport, charset, Open Graph sosyal medya kartları ve favicon.",
    sections: [
      {
        title: "1. <head> Bölümünün Görevi Nedir?",
        content: `\`<head>\` etiketi, web sayfasının **beynidir**. Burada tanımlanan bilgiler ekranda doğrudan çizilmez; ancak arama motorları (Google, Bing), sosyal medya platformları (Twitter, LinkedIn) ve tarayıcının kendisi için en kritik yapılandırmaları içerir.`,
      },
      {
        title: "2. Olmazsa Olmaz Temel Meta Etiketleri",
        content: `- **\`<title>\`**: Tarayıcı sekmesinde görünen ve Google arama sonuçlarında mavi başlık olarak tıklanan en önemli SEO etiketi.
- **\`<meta charset="UTF-8">\`**: Türkçe karakterler (ç, ğ, ı, ö, ş, ü) ve tüm dünya alfabeleri ile emojilerin doğru görüntülenmesini sağlar.
- **\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`**: Mobil uyumluluğun (Responsive Design) temel taşıdır! Tarayıcıya sayfa genişliğinin cihaz ekran genişliğine eşit olmasını söyler.
- **\`<meta name="description" content="...">\`**: Arama motoru sonuçlarında başlığın altında çıkan 150-160 karakterlik özet açıklama.
- **\`<link rel="icon" href="/favicon.ico">\`**: Tarayıcı sekmesinde sayfa başlığının solunda çıkan küçük simge.`,
        code: {
          language: "html",
          caption: "seo-head.html",
          snippet: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verilog & Web Geliştirme Eğitimi | learn.tncy.dev</title>
  <meta name="description" content="Sıfırdan ileri seviyeye FPGA, SystemVerilog ve modern web teknolojileri eğitim platformu.">
  
  <!-- Sosyal Medya Paylaşım Kartları (Open Graph) -->
  <meta property="og:title" content="learn.tncy.dev - Geliştirici Akademisi">
  <meta property="og:image" content="https://learn.tncy.dev/og-cover.png">
</head>`,
        },
      },
    ],
    playground: {
      title: "Canlı Tarayıcı Sekmesi ve Meta Bilgi Simülatörü",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .browser-frame { border: 1px solid #334155; border-radius: 8px; overflow: hidden; max-width: 500px; background: #1e293b; }
    .tab-bar { background: #020617; padding: 8px 12px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #334155; }
    .tab { background: #1e293b; padding: 6px 14px; border-radius: 6px 6px 0 0; font-size: 13px; font-weight: bold; color: #38bdf8; display: flex; align-items: center; gap: 6px; }
    .content { padding: 20px; }
    .tag { background: #334155; color: #a5f3fc; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 12px; }
  </style>
</head>
<body>
  <div class="browser-frame">
    <!-- Simüle Edilmiş Tarayıcı Sekmesi -->
    <div class="tab-bar">
      <div class="tab">
        <span>🚀</span> <span id="tabTitle">Modern Web Geliştirme</span> <span>✕</span>
      </div>
    </div>
    
    <div class="content">
      <h3 style="margin-top:0">🔍 &lt;head&gt; Meta Veri Analizi</h3>
      <p style="font-size:14px; color:#cbd5e1">
        Yukarıdaki sekme başlığı <code>&lt;title&gt;</code> etiketinden, solundaki roket simgesi ise <code>&lt;link rel="icon"&gt;</code> favicon etiketinden beslenir.
      </p>
      <div style="background:#0f172a; padding:12px; border-radius:6px; font-size:13px; font-family:monospace; color:#94a3b8">
        <div>&lt;meta charset="UTF-8"&gt; -> Türkçe Tam Destek</div>
        <div>&lt;meta name="viewport" ...&gt; -> Mobil %100 Uyumlu</div>
      </div>
    </div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[HEAD] title ve favicon sekme arayüzüne başarıyla yansıtıldı.",
        "[SEO] meta viewport ve charset yapılandırması doğrulandı.",
      ],
    },
    quiz: {
      question: "Bir web sayfasının mobil cihazlarda düzgün ölçeklenmesi ve responsive davranabilmesi için <head> içine hangi meta etiketi mutlaka eklenmelidir?",
      options: [
        "A) <meta name='viewport' content='width=device-width, initial-scale=1.0'>",
        "B) <meta name='screen' content='mobile-first'>",
        "C) <meta name='responsive' content='true'>",
        "D) <meta name='scale' content='auto'>",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'viewport' meta etiketi mobil tarayıcılara sanal masaüstü görünümü yerine cihazın gerçek fiziksel genişliğini ('width=device-width') baz almasını söyler.",
    },
  },

  // ========================================================
  // 3. METİN HİYERARŞİSİ, BİÇİMLENDİRME & KOD ETİKETLERİ
  // ========================================================
  "html-text-formatting": {
    id: "html-text-formatting",
    badge: "Modül 1 • HTML5 Temelleri",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Metin Hiyerarşisi, Biçimlendirme & Kod Etiketleri",
    subtitle: "h1-h6 başlık hiyerarşisi, paragraflar, semantik vurgular (strong/em/mark) ve kod blokları (code/pre/kbd).",
    sections: [
      {
        title: "1. Başlık Hiyerarşisi (Headings: h1 - h6)",
        content: `HTML'de 6 seviye başlık bulunur: \`<h1>\` en önemli, \`<h6>\` en düşük seviyelidir.
- **SEO ve Erişilebilirlik Altın Kuralı:** Bir sayfada **yalnızca tek bir \`<h1>\`** başlığı olmalıdır (sayfanın ana konusu).
- Başlıklar alt bölümlere geçerken seviye atlanmadan (\`<h1>\` -> \`<h2>\` -> \`<h3>\`) mantıksal olarak sıralanmalıdır. Sırf yazıyı büyütmek için \`<h1>\` KULLANILMAMALIDIR (büyüklük CSS ile ayarlanır).`,
      },
      {
        title: "2. Semantik Metin Vurgulama Etiketleri",
        content: `- **\`<strong>\` vs \`<b>\`**: \`<b>\` yalnızca görsel olarak kalınlaştırır; \`<strong>\` ise arama motorlarına ve ekran okuyuculara içeriğin *büyük bir anlamsal öneme sahip olduğunu* bildirir.
- **\`<em>\` vs \`<i>\`**: \`<i>\` görsel olarak italiktir; \`<em>\` (emphasis) sesli okumada vurgulu telaffuz edilmesini sağlar.
- **\`<mark>\`**: Fosforlu sarı kalemle çizilmiş gibi önemli bölümleri aydınlatır.
- **\`<del>\` ve \`<ins>\`**: Silinmiş (\`<del>\`) ve yerine yeni eklenmiş (\`<ins>\`) metinleri gösterir (ör. indirimli fiyatlar).
- **\`<sub>\` ve \`<sup>\`**: Alt simge (H<sub>2</sub>O) ve üst simge (E = mc<sup>2</sup>).`,
      },
      {
        title: "3. Bilgisayar ve Kod Etiketleri",
        content: `- **\`<code>\`**: Satır içi kaynak kod parçalarını monospace yazı tipiyle gösterir.
- **\`<pre>\`**: Önceden biçimlendirilmiş metin; boşlukları ve satır atlamalarını olduğu gibi korur.
- **\`<kbd>\`**: Klavyeden basılması gereken tuş kombinasyonlarını belirtir (\`<kbd>Ctrl</kbd> + <kbd>C</kbd>\`).`,
      },
    ],
    playground: {
      title: "Zengin Metin Biçimlendirme ve Kod Önizleme",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; line-height: 1.6; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 550px; }
    mark { background: #fef08a; color: #854d0e; padding: 2px 4px; border-radius: 3px; font-weight: bold; }
    kbd { background: #020617; border: 1px solid #475569; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px; box-shadow: 0 2px 0 #334155; }
    pre { background: #020617; padding: 12px; border-radius: 6px; border: 1px solid #334155; overflow-x: auto; color: #38bdf8; }
  </style>
</head>
<body>
  <div class="card">
    <h1 style="color:#38bdf8; font-size:22px; margin-top:0">Modern HTML5 Tipografisi</h1>
    <p>
      Bu metinde <strong>hayati önem taşıyan bilgiler</strong> ve <em>vurgulu kelimeler</em> yer alır.
      Özel kampanyada eski fiyat <del>100 TL</del> yerine <ins style="color:#4ade80">75 TL</ins> olarak güncellendi!
    </p>
    <p>
      Kimya formülü: H<sub>2</sub>O | Matematik: x<sup>2</sup> + y<sup>2</sup> = r<sup>2</sup>
    </p>
    <p>
      Aramayı durdurmak için lütfen <kbd>Ctrl</kbd> + <kbd>C</kbd> tuşlarına basın.
    </p>
    <p>
      Sonuç: <mark>Bu cümle fosforlu kalemle çizilmiştir.</mark>
    </p>
    <pre><code>// Kaynak Kod Bloğu
function selamla(ad) {
  return "Merhaba " + ad;
}</code></pre>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[HEADINGS] h1 tekil ana başlık olarak hiyerarşiyi kurdu.",
        "[FORMATTING] strong, mark, del, ins, sub, sup ve kbd doğru render edildi.",
      ],
    },
    quiz: {
      question: "HTML5'te '<b>' etiketi ile '<strong>' etiketi arasındaki temel fark nedir?",
      options: [
        "A) '<b>' sadece metni görsel olarak kalınlaştırır; '<strong>' ise içeriğin anlamsal olarak önemli olduğunu arama motorlarına ve ekran okuyuculara bildirir",
        "B) '<strong>' mavi renk yapar, '<b>' siyah yapar",
        "C) '<b>' mobil cihazlarda çalışmaz",
        "D) Aralarında hiçbir fark yoktur",
      ],
      correctIndex: 0,
      explanation: "Doğru! '<b>' salt stilistik bir kalınlaştırmadır. '<strong>' ise anlamsal (semantik) bir etikettir ve metnin önem taşıdığını belirtir.",
    },
  },

  // ========================================================
  // 4. KÖPRÜ METİNLER (LINKS) & DOSYA YOLLARI
  // ========================================================
  "html-links": {
    id: "html-links",
    badge: "Modül 2 • Bağlantılar & Medya",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Köprü Metinler (Links), Çapalar & Dosya Yolları",
    subtitle: "<a href>, target='_blank', rel='noopener noreferrer', sayfa içi çapalar (#id), mailto: ve dosya yolları.",
    sections: [
      {
        title: "1. Bağlantıların Temeli: <a> (Anchor) Etiketi",
        content: `Web'in (World Wide Web) temel taşı bağlantılardır. \`<a>\` etiketi \`href\` (Hypertext Reference) niteliğiyle kullanıcıyı başka sayfalara, dosyalara veya aynı sayfa içindeki bölümlere yönlendirir.

**Harici Sayfaları Yeni Sekmede Açma ve Güvenlik:**
\`<a href="https://ornek.com" target="_blank" rel="noopener noreferrer">Siteye Git</a>\`
- **\`target="_blank"\`**: Bağlantıyı yeni sekmede açar.
- **\`rel="noopener noreferrer"\` (Hayati Güvenlik Kuralı):** Açılan yeni sekmenin \`window.opener\` üzerinden orijinal sayfanızı ele geçirmesini (Tabnabbing güvenlik açığı) ve referans bilgilerinizin sızmasını engeller.`,
      },
      {
        title: "2. Sayfa İçi Çapalar ve Özel Bağlantı Protokolleri",
        content: `- **Sayfa İçi Atlama (Bookmark):** Bir elemana \`id="bolum-2"\` verip linkte \`href="#bolum-2"\` yazarak sayfa içinde o bölüme kaydırabilirsiniz.
- **E-posta Bağlantısı:** \`<a href="mailto:destek@site.com?subject=Yardim">E-posta Gönder</a>\` (Varsayılan e-posta istemcisini açar).
- **Telefon Bağlantısı:** \`<a href="tel:+905551234567">Hemen Ara</a>\` (Mobilde doğrudan telefon arama ekranını açar).`,
      },
      {
        title: "3. Dosya Yolları: Mutlak (Absolute) vs Göreli (Relative)",
        content: `- **Mutlak Yol:** Tam internet adresi (\`https://site.com/resim.png\`).
- **Aynı Dizinde:** \`./hakkimizda.html\` veya doğrudan \`hakkimizda.html\`.
- **Bir Üst Dizine Çıkma:** \`../iletisim.html\`.
- **Kök Dizinden Başlama:** \`/images/logo.png\`.`,
      },
    ],
    playground: {
      title: "Gelişmiş Bağlantı ve Çapa (Anchor) Testi",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; line-height: 1.6; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 500px; }
    a { color: #38bdf8; text-decoration: none; font-weight: bold; }
    a:hover { text-decoration: underline; color: #7dd3fc; }
    .btn-link { display: inline-block; background: #0284c7; color: white; padding: 8px 14px; border-radius: 6px; margin: 4px 0; text-decoration: none; }
    .btn-link:hover { background: #0369a1; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <h3 style="margin-top:0">🔗 HTML5 Bağlantı Laboratuvarı</h3>
    <p>1. Yeni sekmede güvenli harici link:</p>
    <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Web Docs (Güvenli Yeni Sekme) ↗</a>

    <p style="margin-top:15px">2. İletişim Aksiyonları:</p>
    <a href="mailto:info@tncy.dev" class="btn-link">✉️ E-posta Gönder (mailto:)</a>
    <a href="tel:+905550000000" class="btn-link" style="background:#10b981">📞 Telefon Et (tel:)</a>

    <p style="margin-top:15px">3. Sayfa içi çapa bağlantısı:</p>
    <a href="#alt-bolum">Sayfanın Altına Işınlan (#alt-bolum) ↓</a>

    <div style="height: 100px;"></div>
    <div id="alt-bolum" style="background:#020617; padding:10px; border-radius:6px; border:1px solid #38bdf8">
      🎯 Tebrikler! Sayfa içi çapa (#alt-bolum) ile buraya geldiniz.
    </div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[LINKS] rel='noopener noreferrer' güvenlik önlemiyle harici link açıldı.",
        "[ANCHOR] #alt-bolum içi çapa bağlantısı hedef elemana odaklandı.",
      ],
    },
    quiz: {
      question: "target='_blank' ile yeni sekmede açılan harici bağlantılara Tabnabbing güvenlik açığını önlemek için hangi nitelik eklenmelidir?",
      options: [
        "A) rel='noopener noreferrer'",
        "B) secure='true'",
        "C) sandbox='strict'",
        "D) allow='none'",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'rel=\"noopener noreferrer\"' niteliği açılan yeni sayfanın 'window.opener' API'si üzerinden orijinal sayfayı kontrol etmesini engeller.",
    },
  },

  // ========================================================
  // 5. GÖRSELLER & DUYARLI PICTURE ETİKETİ
  // ========================================================
  "html-images": {
    id: "html-images",
    badge: "Modül 2 • Bağlantılar & Medya",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Görseller, Duyarlı Resimler & <picture> Etiketi",
    subtitle: "<img>, alt niteliği (SEO & A11y), loading='lazy', srcset/sizes ve <picture> ile duyarlı görsel yönlendirmesi.",
    sections: [
      {
        title: "1. <img> Etiketi ve Zorunlu Nitelikler",
        content: `Görseller web sitelerinin en çok dikkat çeken ancak en çok ağırlık yapan öğeleridir.
- **\`src\`**: Resmin dosya yolu veya web adresi.
- **\`alt\` (Alternatif Metin - ASLA UNUTULMAMALI!):** Resim yüklenemezse görünen, görme engelli ekran okuyucularının okuduğu ve Google Görsel aramasının resmi anladığı zorunlu metindir.
- **\`width\` ve \`height\`**: Resim yüklenmeden önce tarayıcının ekranda yer ayırmasını sağlayarak **CLS (Cumulative Layout Shift)** sayfa kaymalarını engeller.`,
      },
      {
        title: "2. Performans: loading='lazy' (Tembel Yükleme)",
        content: `Sayfanın en altında kalan ve kullanıcının henüz kaydırıp görmediği resimlerin hemen indirilmesi sayfa açılışını yavaşlatır.
\`<img src="resim.jpg" alt="..." loading="lazy">\`
\`loading="lazy"\` niteliği sayesinde tarayıcı resmi yalnızca kullanıcı ona yaklaştığında indirir!`,
      },
      {
        title: "3. Duyarlı Görseller: srcset ve <picture> Etiketi",
        content: `Mobil cihazda 4K devasa bir resim indirmek kullanıcının kotasını harcar.
- **\`srcset\`**: Tarayıcıya ekran çözünürlüğüne (1x, 2x Retina) veya ekran genişliğine göre uygun boyuttaki resmi seçme özgürlüğü verir.
- **\`<picture>\`**: Sanat yönetimi (Art Direction) sağlar. Örneğin mobilde dikey kırpılmış resim, masaüstünde geniş yatay resim göstermek için kullanılır.`,
      },
    ],
    playground: {
      title: "Duyarlı Görsel ve <picture> Etiketi Deneyimi",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 550px; }
    img { max-width: 100%; height: auto; border-radius: 6px; display: block; }
    .img-box { background: #020617; border: 1px dashed #475569; padding: 15px; border-radius: 8px; margin-top: 10px; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <h3 style="margin-top:0">🖼️ HTML5 Görsel Mimarisi</h3>
    <p>Aşağıdaki görselde <code>loading="lazy"</code>, <code>alt</code> ve net genişlik tanımları yer alır:</p>
    
    <div class="img-box">
      <img 
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80" 
        alt="Yarı İletken Mikroçip ve Entegre Devre Yakın Çekimi" 
        width="480" 
        height="260"
        loading="lazy"
      />
    </div>

    <p style="font-size:13px; color:#94a3b8; margin-top:10px">
      ✅ <strong>CLS Koruması:</strong> width="480" ve height="260" sayesinde sayfa açılırken düzen bozulmaz.
    </p>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[IMAGE] alt niteliği erişilebilirlik standartlarına uygun tanımlandı.",
        "[PERFORMANCE] loading='lazy' ve boyut nitelikleri uygulandı.",
      ],
    },
    quiz: {
      question: "Kullanıcı sayfayı aşağı kaydırıp resme yaklaşana kadar resmin indirilmesini geciktirerek sayfa açılış hızını artıran yerel HTML5 niteliği hangisidir?",
      options: ["A) loading='lazy'", "B) defer='true'", "C) async='image'", "D) preload='none'"],
      correctIndex: 0,
      explanation: "Doğru! 'loading=\"lazy\"' niteliği tarayıcının ekran dışındaki görselleri tembel (lazy) yüklemesini sağlayarak bant genişliği ve açılış süresinden tasarruf ettirir.",
    },
  },

  // ========================================================
  // 6. MULTİMEDYA: VİDEO VE SES OYNATICILAR
  // ========================================================
  "html-multimedia": {
    id: "html-multimedia",
    badge: "Modül 2 • Bağlantılar & Medya",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Ses ve Video Oynatıcılar (Audio & Video)",
    subtitle: "<video>, <audio>, <source>, controls, poster, autoplay, muted kuralları ve altyazı desteği (<track>).",
    sections: [
      {
        title: "1. HTML5 Öncesi ve Sonrası Multimedya",
        content: `Eski web sitelerinde video oynatmak için Adobe Flash gibi hantal ve güvenlik açığı dolu eklentiler gerekirdi. HTML5, tarayıcıya yerleşik donanım ivmeli \`<video>\` ve \`<audio>\` etiketlerini getirdi.`,
      },
      {
        title: "2. Video Etiketi ve Önemli Nitelikleri",
        content: `- **\`controls\`**: Oynat/Durdur butonu, ses çubuğu ve tam ekran düğmelerini gösterir.
- **\`poster="kapak.jpg"\`**: Video oynatılmadan önce görünen kapak görseli.
- **\`autoplay\` ve \`muted\` (Kritik Tarayıcı Kuralı):** Modern tarayıcılar kullanıcının rızası olmadan sesli videoların otomatik başlamasını engeller. Bir videonun otomatik başlaması isteniyorsa mutlaka \`muted\` (sessiz) niteliğiyle birlikte yazılmalıdır (\`autoplay muted\`).
- **\`<source>\`**: Farklı tarayıcı uyumlulukları için alternatif formatlar (MP4, WebM) sunar.
- **\`<track>\`**: Altyazı (\`kind="subtitles"\`) ve çeviri dosyaları ekler (.vtt formatında).`,
      },
    ],
    playground: {
      title: "HTML5 Özel Kapaklı Video ve Ses Oynatıcı",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 500px; }
    video, audio { width: 100%; border-radius: 6px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <h3 style="margin-top:0">🎬 HTML5 Video & Ses Oynatıcı</h3>
    
    <label style="font-size:13px; color:#38bdf8; font-weight:bold">Video Oynatıcı (controls & poster):</label>
    <video controls poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Tarayıcınız video etiketini desteklemiyor.
    </video>

    <div style="margin-top:20px">
      <label style="font-size:13px; color:#4ade80; font-weight:bold">Ses Oynatıcı (Audio):</label>
      <audio controls>
        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        Tarayıcınız ses etiketini desteklemiyor.
      </audio>
    </div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[MULTIMEDIA] video etiketi poster ve kontrollerle yüklendi.",
        "[AUDIO] audio kontrol çubuğu hazırlandı.",
      ],
    },
    quiz: {
      question: "Modern web tarayıcılarında bir videonun sayfa açıldığında otomatik olarak (autoplay) başlayabilmesi için hangi nitelik zorunludur?",
      options: [
        "A) muted (sessiz olması zorunludur)",
        "B) loop (sürekli dönmesi zorunludur)",
        "C) controls (kontrollerin açık olması)",
        "D) preload='auto'",
      ],
      correctIndex: 0,
      explanation: "Doğru! Kullanıcı deneyimini korumak amacıyla modern tarayıcılar sesli videoların otomatik başlamasını yasaklar. Otomatik oynatma için videonun 'muted' olması gerekir.",
    },
  },

  // ========================================================
  // 7. LİSTELER: SIRALI, SIRASIZ VE TANIM LİSTELERİ
  // ========================================================
  "html-lists": {
    id: "html-lists",
    badge: "Modül 3 • Tablolar & Listeler",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Sıralı, Sırasız ve Tanım Listeleri (Lists)",
    subtitle: "<ul>, <ol> (type, start, reversed), <li>, <dl>, <dt>, <dd> ve iç içe gezinti (navigation) menüleri.",
    sections: [
      {
        title: "1. Liste Türleri Nelerdir?",
        content: `HTML'de 3 temel liste yapısı vardır:
1. **Sırasız Liste (\`<ul>\` - Unordered List):** Sıranın önemli olmadığı madde işaretli (bullet point) listeler. Web sitelerinin menüleri (nav) neredeyse her zaman \`<ul>\` ile kodlanır.
2. **Sıralı Liste (\`<ol>\` - Ordered List):** Adımların veya sıralamanın önemli olduğu numaralandırılmış listeler (1, 2, 3 veya A, B, C).
3. **Tanım / Açıklama Listesi (\`<dl>\` - Description List):** Terim ve tanım ikilileri için kullanılan özel semantik liste türü.`,
      },
      {
        title: "2. Sıralı Liste İnce Ayarları (<ol> Nitelikleri)",
        content: `- **\`type\`**: Numaralandırma biçimi (\`type="1"\` rakam, \`type="A"\` büyük harf, \`type="I"\` roma rakamı).
- **\`start="5"\`**: Sayımın belirli bir sayıdan başlamasını sağlar.
- **\`reversed\`**: Sayımı geriye doğru saydırır (ör. geri sayım listesi).`,
      },
      {
        title: "3. Tanım Listeleri: <dl>, <dt> ve <dd>",
        content: `- **\`<dl>\`**: Tanım listesi kapsayıcısı.
- **\`<dt>\` (Definition Term)**: Açıklanacak terim/başlık.
- **\`<dd>\` (Definition Description)**: Terimin detaylı açıklaması.`,
      },
    ],
    playground: {
      title: "HTML5 Liste Türleri ve Tanım Listesi Laboratuvarı",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 600px; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; }
    ul, ol { padding-left: 20px; font-size: 14px; color: #cbd5e1; }
    li { margin-bottom: 5px; }
    dt { font-weight: bold; color: #38bdf8; margin-top: 8px; }
    dd { margin-left: 15px; font-size: 13px; color: #94a3b8; }
  </style>
</head>
<body>
  <h3>📑 HTML5 Liste Mimarisi</h3>
  <div class="grid">
    <div class="card">
      <h4 style="margin-top:0; color:#38bdf8">Sıralı Liste (Roma Rakamı)</h4>
      <ol type="I" start="1">
        <li>Planlama ve Analiz</li>
        <li>UI/UX Prototipleme</li>
        <li>Frontend Kodlama</li>
        <li>Test ve Dağıtım</li>
      </ol>
    </div>

    <div class="card">
      <h4 style="margin-top:0; color:#4ade80">Tanım Listesi (&lt;dl&gt;)</h4>
      <dl>
        <dt>FPGA</dt>
        <dd>Donanımı sonradan programlanabilir entegre devre.</dd>
        <dt>DOM</dt>
        <dd>HTML dökümanının tarayıcı belleğindeki nesne ağacı.</dd>
      </dl>
    </div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[LISTS] ol type='I' roma rakamlarıyla numaralandırıldı.",
        "[DEFINITION] dl, dt ve dd ile semantik sözlük yapısı oluşturuldu.",
      ],
    },
    quiz: {
      question: "Bir sözlükteki terimleri ve onların detaylı açıklamalarını temsil etmek için hangi semantik etiket grubu kullanılır?",
      options: [
        "A) <dl>, <dt> ve <dd>",
        "B) <ul>, <li> ve <span>",
        "C) <ol>, <item> ve <desc>",
        "D) <table>, <tr> ve <td>",
      ],
      correctIndex: 0,
      explanation: "Doğru! '<dl>' (Description List), '<dt>' (Definition Term - Terim) ve '<dd>' (Definition Description - Açıklama) etiketleri sözlük ve meta veri listeleri için özel semantik yapılardır.",
    },
  },

  // ========================================================
  // 8. VERİ TABLOLARI (TABLES, COLSPAN & ROWSPAN)
  // ========================================================
  "html-tables": {
    id: "html-tables",
    badge: "Modül 3 • Tablolar & Listeler",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Veri Tabloları (Tables, Colspan & Rowspan)",
    subtitle: "<table>, <thead>, <tbody>, <tfoot>, <tr>, <th>, <td>, <caption> ve hücre birleştirme teknikleri.",
    sections: [
      {
        title: "1. Tablolar Ne Zaman Kullanılmalıdır?",
        content: `**ÖNEMLİ KURAL:** 90'lı yıllarda tablolar web sayfası düzeni (layout) kurmak için kullanılırdı; bu günümüzde kesinlikle YASAKTIR (düzen için Flexbox ve Grid kullanılır).
Tablolar yalnızca ve yalnızca **tablosal verileri** (ders programı, fiyat tarifesi, finansal raporlar, istatistikler) göstermek için kullanılmalıdır.`,
      },
      {
        title: "2. Semantik Tablo Anatomisi",
        content: `- **\`<table>\`**: Tablo kapsayıcısı.
- **\`<caption>\`**: Tablonun başlığı (erişilebilirlik için zorunlu).
- **\`<thead>\`**: Tablonun başlık satırlarını gruplar.
- **\`<tbody>\`**: Tablonun veri satırlarını gruplar.
- **\`<tfoot>\`**: Toplam veya özet satırlarını gruplar.
- **\`<tr>\` (Table Row)**: Tablo satırı.
- **\`<th>\` (Table Header)**: Başlık hücresi (varsayılan olarak kalın ve ortalı; \`scope="col"\` verilebilir).
- **\`<td>\` (Table Data)**: Standart veri hücresi.`,
      },
      {
        title: "3. Hücre Birleştirme: colspan ve rowspan",
        content: `- **\`colspan="N"\` (Column Span)**: Hücreyi yatayda N adet sütun boyunca genişletir/birleştirir.
- **\`rowspan="N"\` (Row Span)**: Hücreyi dikeyde N adet satır boyunca genişletir/birleştirir.`,
      },
    ],
    playground: {
      title: "Gelişmiş Ders Programı ve Hücre Birleştirme Tablosu",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    table { width: 100%; max-width: 550px; border-collapse: collapse; margin-top: 10px; background: #1e293b; border-radius: 8px; overflow: hidden; font-size: 14px; }
    caption { font-weight: bold; color: #38bdf8; margin-bottom: 8px; font-size: 16px; text-align: left; }
    th, td { border: 1px solid #334155; padding: 10px 12px; text-align: center; }
    thead th { background: #020617; color: #38bdf8; }
    tfoot td { background: #0f172a; font-weight: bold; }
    .merge { background: #0369a1; color: white; font-weight: bold; }
  </style>
</head>
<body>
  <table>
    <caption>Haftalık Mühendislik Eğitim Programı</caption>
    <thead>
      <tr>
        <th scope="col">Gün</th>
        <th scope="col">09:00 - 12:00</th>
        <th scope="col">13:00 - 17:00</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" style="background:#0f172a">Pazartesi</th>
        <td>SystemVerilog</td>
        <td>FPGA Vivado Laboratuvarı</td>
      </tr>
      <tr>
        <th scope="row" style="background:#0f172a">Salı</th>
        <!-- colspan ile iki ders saati birleştirildi -->
        <td colspan="2" class="merge">Tam Gün Hackathon & Proje Sunumları</td>
      </tr>
      <tr>
        <th scope="row" style="background:#0f172a">Çarşamba</th>
        <td>Modern HTML5/CSS</td>
        <td>JavaScript V8 Motoru</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">Toplam 24 Saat Uygulamalı Eğitim</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`,
      expectedOutput: [
        "[TABLE] caption, thead, tbody ve tfoot semantik blokları işlendi.",
        "[SPAN] colspan='2' ile sütunlar başarıyla birleştirildi.",
      ],
    },
    quiz: {
      question: "Bir tablonun tek bir hücresini yatayda 3 sütun boyunca birleştirmek için hangi nitelik kullanılmalıdır?",
      options: ["A) colspan='3'", "B) rowspan='3'", "C) colmerge='3'", "D) width='3col'"],
      correctIndex: 0,
      explanation: "Doğru! 'colspan' (column span) niteliği bir hücrenin yatayda birden fazla sütunu kaplamasını sağlar.",
    },
  },

  // ========================================================
  // 9. BLOK VS SATIR İÇİ ELEMANLAR (DIV & SPAN)
  // ========================================================
  "html-block-inline": {
    id: "html-block-inline",
    badge: "Modül 3 • Tablolar & Listeler",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Blok vs Satır İçi Elemanlar (div, span & Kapsayıcılar)",
    subtitle: "Block-level vs Inline-level akış kuralları, <div> ve <span> kullanımı, id ve class nitelikleri.",
    sections: [
      {
        title: "1. Blok Düzeyindeki Elemanlar (Block-Level Elements)",
        content: `Blok düzeyindeki elemanlar her zaman **yeni bir satırdan başlar** ve içinde bulunduğu ebeveynin tüm yatay genişliğini (%100) kaplar.
- Kendisinden sonra gelen eleman otomatik alt satıra geçer.
- Genişlik (\`width\`), yükseklik (\`height\`), margin ve padding değerlerini tam olarak alırlar.
- **Örnekler:** \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, \`<section>\`, \`<ul>\`, \`<table>\`.`,
      },
      {
        title: "2. Satır İçi Elemanlar (Inline-Level Elements)",
        content: `Satır içi elemanlar yeni bir satır başlatmaz; metin akışının içinde **yalnızca içeriği kadar** yer kaplar.
- Genişlik (\`width\`) ve yükseklik (\`height\`) almazlar!
- **Örnekler:** \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<code>\`.`,
      },
      {
        title: "3. id vs class Nitelikleri",
        content: `- **\`id="benzersiz-ad"\`**: Bir sayfada her ID **yalnızca tek bir elemana** verilebilir. Benzersizdir.
- **\`class="ortak-stil"\`**: Aynı sınıf adı sayfadaki onlarca elemana verilebilir ve tekrar tekrar kullanılabilir.`,
      },
    ],
    playground: {
      title: "Blok vs Satır İçi Görsel Akış Simülatörü",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 500px; }
    .block-box { background: #3b82f6; color: white; padding: 10px; margin-bottom: 8px; border-radius: 4px; text-align: center; }
    .inline-box { background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="card">
    <h3 style="margin-top:0">📦 Blok (Block) Elemanlar:</h3>
    <div class="block-box">&lt;div&gt; 1: Tüm satırı tek başına kaplar</div>
    <div class="block-box" style="background:#6366f1">&lt;div&gt; 2: Alt satırdan başlar ve %100 genişler</div>

    <h3 style="margin-top:20px">🔤 Satır İçi (Inline) Elemanlar:</h3>
    <p>
      Bu normal bir paragraf içinde yer alan 
      <span class="inline-box">&lt;span&gt; 1</span> ve 
      <span class="inline-box" style="background:#f59e0b; color:black">&lt;span&gt; 2</span> 
      aynı satırda yan yana akarlar, satırı bölmezler.
    </p>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[BLOCK] div elemanları tüm satırı kaplayarak alt alta sıralandı.",
        "[INLINE] span elemanları metin akışında yan yana yerleşti.",
      ],
    },
    quiz: {
      question: "Inline (satır içi) elemanlar hakkında aşağıdakilerden hangisi DOĞRUDUR?",
      options: [
        "A) Her zaman yeni bir satırdan başlarlar ve tüm satırı kaplarlar",
        "B) Yeni bir satır başlatmazlar, yalnızca içerikleri kadar yer kaplarlar ve yan yana sıralanırlar",
        "C) İçlerine doğrudan <div> elemanı konulabilir",
        "D) Genişlik ve yükseklik değerlerini zorla %100 yaparlar",
      ],
      correctIndex: 1,
      explanation: "Doğru! Inline elemanlar yeni bir satır başlatmaz, metin akışında yalnızca içerikleri kadar alan kaplarlar.",
    },
  },

  // ========================================================
  // 10. FORMLAR & TEMEL GİRDİ ELEMANLARI
  // ========================================================
  "html-forms": {
    id: "html-forms",
    badge: "Modül 4 • Formlar & Doğrulama",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Modern HTML5 Formları ve Temel Girdiler",
    subtitle: "<form action method='GET|POST'>, <label for>, <input type='text|password|email'> ve butonlar.",
    sections: [
      {
        title: "1. Formların Mimarisi: <form action method>",
        content: `Formlar, kullanıcılardan veri almak (giriş yapma, arama, kayıt, sipariş) için kullanılan temel iletişim köprüsüdür.
- **\`action="/kaydet"\`**: Verinin gönderileceği sunucu uç noktası (endpoint).
- **\`method="GET"\`**: Verileri URL adresine query parametresi olarak ekler (\`?ara=kitap\`). Arama formları için uygundur.
- **\`method="POST"\`**: Verileri HTTP isteğinin gövdesinde (body) gizlice ve güvenle taşır. Şifre, kredi kartı ve form kayıtları için ZORUNLUDUR.`,
      },
      {
        title: "2. label Etiketi ve for Niteliği (Erişilebilirlik)",
        content: `Bir form alanının ne olduğunu belirten metinler her zaman **\`<label>\`** etiketiyle yazılmalıdır:
\`<label for="kullanici">Kullanıcı Adı:</label>\`
\`<input type="text" id="kullanici" name="kullanici">\`
- **\`for\` ve \`id\` eşleşmesi**: Kullanıcı etiketin yazısına tıkladığında bile ilgili input kutusu otomatik olarak odaklanır (focus alır). Bu hem mobil dokunmatik ekranlar hem de görme engelliler için hayati bir standarttır.`,
      },
      {
        title: "3. Temel Girdi (Input) Tipleri",
        content: `- \`type="text"\`: Standart tek satırlık metin kutusu.
- \`type="password"\`: Girilen karakterleri gizleyen (nokta veya yıldız yapan) şifre kutusu.
- \`type="email"\`: Otomatik e-posta formatı denetimi yapar.
- \`type="number"\`: Yalnızca sayısal değer kabul eder.
- \`type="submit"\`: Formu sunucuya gönderen buton.`,
      },
    ],
    playground: {
      title: "Modern Üye Giriş ve Kayıt Formu",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .form-card { max-width: 400px; background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; }
    .field { margin-bottom: 12px; }
    label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 4px; }
    input { width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #475569; color: white; padding: 8px 12px; border-radius: 6px; font-size: 14px; }
    input:focus { outline: 2px solid #38bdf8; border-color: transparent; }
    button { width: 100%; background: #38bdf8; color: #0f172a; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px; }
    button:hover { background: #7dd3fc; }
  </style>
</head>
<body>
  <div class="form-card">
    <h3 style="margin-top:0; color:#38bdf8">Giriş Yap</h3>
    <form onsubmit="event.preventDefault(); alert('Giriş başarılı: ' + document.getElementById('eposta').value);">
      <div class="field">
        <label for="eposta">E-posta Adresi (Etikete tıklayın):</label>
        <input type="email" id="eposta" name="email" required placeholder="ornek@domain.com" />
      </div>
      <div class="field">
        <label for="parola">Şifre:</label>
        <input type="password" id="parola" name="pass" required placeholder="••••••••" />
      </div>
      <button type="submit">Güvenli Giriş</button>
    </form>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[FORM] label for ve input id eşleşmesi ile tıklanabilir alan sağlandı.",
        "[SUBMIT] method POST prensiplerine uygun güvenli form işlendi.",
      ],
    },
    quiz: {
      question: "Kullanıcı şifre veya hassas kimlik bilgilerini gönderirken bu verilerin URL adresinde açıkça görünmesini engellemek için formda hangi method kullanılmalıdır?",
      options: ["A) method='POST'", "B) method='GET'", "C) method='URL'", "D) method='SECURE'"],
      correctIndex: 0,
      explanation: "Doğru! 'POST' metodu form verilerini URL yerine HTTP istek gövdesinde (request body) taşır; şifre ve hassas veriler için zorunludur.",
    },
  },

  // ========================================================
  // 11. GELİŞMİŞ INPUTLAR, DATALIST & SEÇİMLER
  // ========================================================
  "html-advanced-inputs": {
    id: "html-advanced-inputs",
    badge: "Modül 4 • Formlar & Doğrulama",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Gelişmiş Girdi Tipleri, Datalist & Seçimler",
    subtitle: "color, date, range, file, checkbox, radio, <select>, <textarea> ve otomatik öneren <datalist>.",
    sections: [
      {
        title: "1. Özel HTML5 Input Tipleri",
        content: `HTML5 ile birlikte harici JavaScript tarih seçicilerine veya renk paletlerine gerek kalmadı:
- \`type="color"\`: Tarayıcının yerel renk seçim paletini açar (#HEX döner).
- \`type="date"\`: Yerel takvim açar (YYYY-MM-DD formatında tarih seçimi).
- \`type="range"\`: Kaydırılabilir sürgü çubuğu (slider) oluşturur (\`min\`, \`max\`, \`step\`).
- \`type="file"\`: Kullanıcının cihazından dosya yüklemesini sağlar (\`accept="image/*"\`, \`multiple\`).`,
      },
      {
        title: "2. Seçim Elemanları: Radio, Checkbox ve <select>",
        content: `- **Radio (\`type="radio"\`)**: Birden fazla seçenekten **yalnızca BİRİNİ** seçtirmek için kullanılır (Aynı gruptaki tüm radio'ların \`name\` niteliği aynı olmalıdır!).
- **Checkbox (\`type="checkbox"\`)**: Bağımsız birden fazla seçeneği işaretlemek için kullanılır.
- **\`<select>\` ve \`<option>\`**: Açılır açılır kutu (dropdown). Gruplamak için \`<optgroup>\` kullanılır.
- **\`<textarea>\`**: Çok satırlı geniş metin giriş alanı.`,
      },
      {
        title: "3. Akıllı Arama Önerileri: <datalist>",
        content: `\`<datalist>\` etiketi, normal bir \`<input>\` kutusuna otomatik tamamlama (autocomplete) öneri listesi bağlar. Kullanıcı isterse önerilerden birini tıklar, isterse tamamen farklı bir şey yazar!`,
        code: {
          language: "html",
          caption: "datalist-example.html",
          snippet: `<label for="sehir">Şehir Seçin:</label>
<input list="sehirler" id="sehir" name="sehir" placeholder="Yazmaya başlayın...">

<datalist id="sehirler">
  <option value="İstanbul">
  <option value="Ankara">
  <option value="İzmir">
  <option value="Bursa">
</datalist>`,
        },
      },
    ],
    playground: {
      title: "Gelişmiş HTML5 Girdi ve Datalist Laboratuvarı",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 480px; }
    .row { margin-bottom: 12px; }
    label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 4px; }
    input, select, textarea { width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #475569; color: white; padding: 8px; border-radius: 6px; }
    .flex-row { display: flex; gap: 10px; align-items: center; }
  </style>
</head>
<body>
  <div class="card">
    <h3 style="margin-top:0; color:#38bdf8">🎨 Gelişmiş HTML5 Form Kontrolleri</h3>
    
    <div class="row">
      <label for="sehirInput">Akıllı Arama (&lt;datalist&gt;):</label>
      <input list="sehirList" id="sehirInput" placeholder="Şehir yazın (ör: İst)..." />
      <datalist id="sehirList">
        <option value="İstanbul"></option>
        <option value="Ankara"></option>
        <option value="İzmir"></option>
        <option value="Antalya"></option>
      </datalist>
    </div>

    <div class="row flex-row">
      <div style="flex:1">
        <label for="renk">Tema Rengi:</label>
        <input type="color" id="renk" value="#38bdf8" style="height:40px; cursor:pointer" />
      </div>
      <div style="flex:1">
        <label for="tarih">Randevu Tarihi:</label>
        <input type="date" id="tarih" />
      </div>
    </div>

    <div class="row">
      <label for="ses">Ses Seviyesi (Range): <span id="sesVal">50</span>%</label>
      <input type="range" id="ses" min="0" max="100" value="50" oninput="document.getElementById('sesVal').innerText = this.value" />
    </div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[DATALIST] Otomatik tamamlama öneri listesi inputa bağlandı.",
        "[INPUTS] color, date ve range kontrolleri başarıyla render edildi.",
      ],
    },
    quiz: {
      question: "Bir metin inputuna yazarken kullanıcıya öneri listesi sunan ancak kullanıcının listede olmayan bir şeyi de yazmasına izin veren HTML5 etiketi hangisidir?",
      options: ["A) <datalist>", "B) <select>", "C) <suggest>", "D) <autocomplete>"],
      correctIndex: 0,
      explanation: "Doğru! '<datalist>' etiketi input kutusuna bağlı bir öneri listesi sunar; kullanıcı ister listeden seçer isterse serbest metin yazar.",
    },
  },
};

export const HTML_LESSONS: Record<string, LessonContent> = {
  ...CORE_HTML_LESSONS,
  ...HTML_ADVANCED_LESSONS,
};
