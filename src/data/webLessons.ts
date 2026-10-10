import { LessonContent } from "./lessonsData";

export const WEB_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // HTML5 WEB GELİŞTİRME
  // ========================================================
  "html-intro": {
    id: "html-intro",
    badge: "Web Geliştirme • HTML5",
    readingTime: "5 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "HTML5 Temelleri ve Sayfa İskeleti",
    subtitle: "Web'in omurgası: DOCTYPE, html, head, body etiketleri ve tarayıcı DOM mimarisi.",
    sections: [
      {
        title: "1. Standart HTML5 Belge İskeleti",
        content: `HTML (HyperText Markup Language), web sayfalarının iskeletini ve anlamsal yapısını oluşturan işaretleme dilidir. Tüm modern HTML5 sayfaları aşağıdaki asgari iskeletle başlar:`,
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
    <p>learn.tncy.dev ile modern web geliştirme öğreniyorum.</p>
</body>
</html>`,
        },
      },
    ],
    quiz: {
      question: "Modern bir HTML belgesinin ilk satırında yer alan '<!DOCTYPE html>' bildiriminin temel amacı nedir?",
      options: [
        "A) Sayfayı internete yüklemek",
        "B) Tarayıcıya belgenin HTML5 standartlarında işlenmesi (Standards Mode) gerektiğini bildirmek",
        "C) CSS dosyalarını içe aktarmak",
        "D) JavaScript motorunu çalıştırmak",
      ],
      correctIndex: 1,
      explanation: "Doğru! '<!DOCTYPE html>' bildirimi tarayıcının sayfayı modern HTML5 standart modunda (Standards Mode) işlemesini sağlar.",
    },
  },

  "html-text-links": {
    id: "html-text-links",
    badge: "Modül 1 • Metin & Bağlantılar",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Metin Formatlama, Bağlantılar ve Resimler",
    subtitle: "Başlık hiyerarşisi (h1-h6), paragraflar, vurgulama (strong/em), köprü metinler (a) ve optimize görseller (img).",
    sections: [
      {
        title: "1. Başlık Hiyerarşisi ve Metin Vurguları",
        content: `Arama motoru optimizasyonu (SEO) ve ekran okuyucular için bir sayfada yalnızca tek bir \`<h1>\` ana başlığı bulunmalı, alt bölümler \`<h2>\` ve \`<h3>\` şeklinde hiyerarşik sıralanmalıdır.
- \`<strong>\`: Anlamsal olarak önemli, kalın metin.
- \`<em>\`: Vurgulanmış, yatık (italic) metin.`,
      },
      {
        title: "2. Köprüler (Links) ve Resimler",
        content: `Dış bağlantılar açılırken güvenlik için \`rel="noopener noreferrer"\` özniteliği eklenmelidir:`,
        code: {
          language: "html",
          caption: "links_images.html",
          snippet: `<!-- Yeni sekmede güvenli dış bağlantı -->
<a href="https://github.com" target="_blank" rel="noopener noreferrer">
    GitHub Sayfamı Ziyaret Edin
</a>

<!-- Erişilebilir ve optimize resim -->
<img src="/assets/chip.webp" alt="FPGA Çip Kartı Şeması" width="600" height="400" loading="lazy">`,
        },
      },
    ],
    quiz: {
      question: "HTML'de bir '<a>' etiketine 'target=\"_blank\"' verildiğinde güvenlik açığı oluşmaması için hangi öznitelik eklenmelidir?",
      options: [
        "A) rel=\"noopener noreferrer\"",
        "B) style=\"secure\"",
        "C) type=\"external\"",
        "D) auth=\"true\"",
      ],
      correctIndex: 0,
      explanation: "Doğru! rel=\"noopener noreferrer\" açılan yeni sayfanın window.opener üzerinden eski sayfayı manipüle etmesini (Tabnabbing saldırısını) önler.",
    },
  },

  "html-tables-media": {
    id: "html-tables-media",
    badge: "Modül 2 • Tablolar & Medya",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Tablolar, Video ve Audio Multimedya Etiketleri",
    subtitle: "thead, tbody ve tfoot ile yapılandırılmış tablolar; harici eklentisiz yerel HTML5 video ve ses oynatma.",
    sections: [
      {
        title: "1. Erişilebilir Veri Tablosu Mimarisi",
        content: `Tablolar sayfa düzeni (layout) için değil, yalnızca yapısal verileri göstermek için kullanılmalıdır:`,
        code: {
          language: "html",
          caption: "table_media.html",
          snippet: `<table border="1">
    <thead>
        <tr>
            <th>Donanım Modeli</th>
            <th>Saat Hızı</th>
            <th>Bellek</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>ESP32-S3</td>
            <td>240 MHz</td>
            <td>8 MB PSRAM</td>
        </tr>
    </tbody>
</table>

<!-- Yerel Video ve Ses -->
<video controls width="480">
    <source src="demo.mp4" type="video/mp4">
    Tarayıcınız video etiketini desteklemiyor.
</video>`,
        },
      },
    ],
    quiz: {
      question: "HTML5 tablolarında sütun başlıklarını tanımlamak için '<td>' yerine hangi semantik etiket kullanılır?",
      options: ["A) <th>", "B) <head>", "C) <title>", "D) <col>"],
      correctIndex: 0,
      explanation: "Doğru! <th> (Table Header) etiketi tablo başlık hücrelerini belirtir ve varsayılan olarak kalın/ortalanmış basılır.",
    },
  },

  "html-lists-containers": {
    id: "html-lists-containers",
    badge: "Modül 2 • Listeler & Bloklar",
    readingTime: "5 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Listeler ve Kapsayıcılar (div, span)",
    subtitle: "Sıralı (ol) ve sırasız (ul) listeler, blok düzeyinde <div> ile satır içi <span> arasındaki farklar.",
    sections: [
      {
        title: "1. Blok Düzeyi (div) vs Satır İçi (span)",
        content: `- **Blok Eleman (\`<div>\`, \`<p>\`, \`<h1>\`):** Bulunduğu satırı boydan boya (%100 genişlik) kaplar ve kendisinden sonraki elemanı alt satıra iter.
- **Satır İçi Eleman (\`<span>\`, \`<a>\`, \`<strong>\`):** Sadece kendi içeriği kadar genişlik kaplar, satırı bölmez.`,
      },
    ],
    quiz: {
      question: "HTML'de bir metnin sadece belirli bir kelimesine stil vermek için kullanılan satır içi (inline) kapsayıcı etiket hangisidir?",
      options: ["A) <div>", "B) <span>", "C) <section>", "D) <p>"],
      correctIndex: 1,
      explanation: "Doğru! <span> satır içi (inline) bir etiket olup yeni satır başlatmadan metnin bir kısmını sarmalamak için kullanılır.",
    },
  },

  "html-forms": {
    id: "html-forms",
    badge: "Modül 3 • Formlar & Girişler",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Modern HTML5 Formları ve Doğrulama",
    subtitle: "<form action method>, label bağlantıları, required ve yerel tarayıcı girdi doğrulaması.",
    sections: [
      {
        title: "1. label ve id Eşlemesi",
        content: `Erişilebilirlik için her form alanının (\`<input>\`) mutlaka bir \`<label>\` etiketi olmalı ve \`for\` özniteliği input'un \`id\` değeriyle birebir eşleşmelidir. Bu sayede etikete tıklandığında imleç otomatik kutucuğa odaklanır:`,
        code: {
          language: "html",
          caption: "form_demo.html",
          snippet: `<form action="/api/kayit" method="POST">
    <div>
        <label for="kullanici_email">E-posta Adresiniz:</label>
        <input type="email" id="kullanici_email" name="email" required placeholder="ornek@tncy.dev">
    </div>
    
    <div>
        <label for="kullanici_sifre">Şifre:</label>
        <input type="password" id="kullanici_sifre" name="sifre" required minlength="8">
    </div>

    <button type="submit">Giriş Yap</button>
</form>`,
        },
      },
    ],
    quiz: {
      question: "HTML formlarında bir alanın boş bırakılamayacağını ve doldurulmasının zorunlu olduğunu belirten boolean öznitelik hangisidir?",
      options: ["A) validate", "B) required", "C) compulsory", "D) check"],
      correctIndex: 1,
      explanation: "Doğru! 'required' özniteliği tarayıcının form gönderilmeden önce bu alanın doldurulduğunu kontrol etmesini sağlar.",
    },
  },

  "html-inputs-validation": {
    id: "html-inputs-validation",
    badge: "Modül 3 • Gelişmiş Formlar",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Form Girdi Tipleri, Desenler (Pattern) ve Güvenlik",
    subtitle: "input types (number, date, range, color), regex desenleri (pattern) ve form güvenliği temelleri.",
    sections: [
      {
        title: "1. Gelişmiş Girdi Tipleri ve Pattern",
        content: `HTML5, mobil cihazlarda uygun klavyenin açılması için zengin girdi tipleri sunar:
- \`type="tel"\`: Sayısal telefon tuş takımını açar.
- \`pattern="[0-9]{4}"\`: Yalnızca 4 haneli PIN girilmesini regex ile denetler.`,
      },
    ],
    quiz: {
      question: "Bir input alanına yalnızca geçerli formatta web URL'si girilebilmesini sağlayan HTML5 girdi tipi hangisidir?",
      options: ["A) type=\"link\"", "B) type=\"url\"", "C) type=\"web\"", "D) type=\"address\""],
      correctIndex: 1,
      explanation: "Doğru! 'type=\"url\"' girdisi tarayıcının 'http://' veya 'https://' ile başlayan geçerli bir web adresi formatı denetlemesini sağlar.",
    },
  },

  "html-semantics": {
    id: "html-semantics",
    badge: "Modül 4 • Semantik Web",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Semantik HTML5: header, nav, main, footer, article",
    subtitle: "'div çorbası' (div soup) yerine anlamlı etiketlerle SEO ve ekran okuyucu dostu mimari kurma.",
    sections: [
      {
        title: "1. Semantik Etiketlerin Önemi",
        content: `Eski web sitelerinde her şey \`<div class="header">\`, \`<div class="menu">\` şeklinde yazılıyordu. HTML5 semantik etiketleri tarayıcılara ve arama motorlarına sayfanın parçalarını açıkça anlatır:
- \`<header>\`: Site veya makale başlığı, logo alanı.
- \`<nav>\`: Ana gezinme menüsü.
- \`<main>\`: Sayfanın benzersiz ana içeriği (sayfada yalnızca 1 adet olmalıdır).
- \`<article>\`: Bağımsız olarak paylaşılabilen makale veya blog yazısı.
- \`<aside>\`: Kenar çubuğu (sidebar), ilgili bağlantılar.
- \`<footer>\`: Telif hakkı ve dipnot alanı.`,
      },
    ],
    quiz: {
      question: "Bir web sayfasında bağımsız olarak dağıtılabilen veya yeniden kullanılabilen (örneğin bir blog yazısı veya haber) içeriği temsil eden semantik etiket hangisidir?",
      options: ["A) <section>", "B) <article>", "C) <aside>", "D) <main>"],
      correctIndex: 1,
      explanation: "Doğru! <article> etiketi kendi başına anlam taşıyan ve bağımsız olarak sendikasyona (RSS, paylaşım) uygun içerikleri belirtir.",
    },
  },

  "html-accessibility": {
    id: "html-accessibility",
    badge: "Modül 4 • Erişilebilirlik (A11y)",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Web Erişilebilirliği (A11y) ve ARIA Standartları",
    subtitle: "Görme ve motor engelli kullanıcılar için klavye odağı, aria-label, aria-hidden ve kontrast standartları.",
    sections: [
      {
        title: "1. WAI-ARIA ve aria-label Kullanımı",
        content: `Bir butonda yalnızca bir ikon (örneğin büyüteç ikonu) varsa, görme engelli bir kullanıcının ekran okuyucusu bu butonu seslendiremez. Bu sorunu \`aria-label\` ile çözeriz:`,
        code: {
          language: "html",
          caption: "accessible_button.html",
          snippet: `<!-- Ekran okuyucu 'Arama Yap' diye seslendirir -->
<button aria-label="Sitede Arama Yap">
    <svg aria-hidden="true"><!-- Büyüteç ikonu --></svg>
</button>`,
        },
      },
    ],
    quiz: {
      question: "Sadece görsel amaçlı olan ve ekran okuyucuların görmezden gelmesi gereken dekoratif bir ikona hangi ARIA özniteliği eklenmelidir?",
      options: [
        "A) aria-hidden=\"true\"",
        "B) aria-disabled=\"true\"",
        "C) hidden=\"all\"",
        "D) screen-reader=\"false\"",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'aria-hidden=\"true\"' özniteliği ekran okuyucunun ilgili elemanı seslendirmesini engelleyerek gürültüyü önler.",
    },
  },

  // ========================================================
  // CSS3 STİL & TASARIM
  // ========================================================
  "css-intro": {
    id: "css-intro",
    badge: "Web Geliştirme • CSS3",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "CSS3 Temelleri & Flexbox Düzeni",
    subtitle: "Web sayfalarına stil kazandırma: Renkler, tipografi, kutu modeli (box-model) ve modern Flexbox.",
    sections: [
      {
        title: "1. Kutu Modeli (Box Model) ve Flexbox",
        content: `CSS'de her eleman bir dikdörtgen kutudur: Content (içerik), Padding (iç boşluk), Border (kenarlık) ve Margin (dış boşluk). Modern CSS'in en güçlü hizalama aracı olan **Flexbox** (\`display: flex\`), elemanları tek bir eksende (yatay veya dikey) kusursuz şekilde hizalamayı sağlar.`,
        code: {
          language: "css",
          caption: "flex_center.css",
          snippet: `.container {
    display: flex;
    justify-content: center; /* Yatay ortalama */
    align-items: center;     /* Dikey ortalama */
    gap: 1.5rem;             /* Elemanlar arası boşluk */
}`,
        },
      },
    ],
    quiz: {
      question: "Flexbox konteyneri içindeki elemanları ana eksende (varsayılan olarak yatayda) ortalamak için hangi özellik kullanılır?",
      options: [
        "A) align-items: center;",
        "B) justify-content: center;",
        "C) text-align: center;",
        "D) float: center;",
      ],
      correctIndex: 1,
      explanation: "Doğru! 'justify-content' ana eksendeki (main-axis) hizalamayı belirler; 'align-items' ise çapraz eksendeki hizalamayı kontrol eder.",
    },
  },

  "css-selectors": {
    id: "css-selectors",
    badge: "Modül 1 • Seçiciler (Selectors)",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Gelişmiş CSS Seçicileri ve Pseudo-Class'lar",
    subtitle: "Özgüllük (Specificity) hesabı, torun vs doğrudan çocuk (>), :hover, :focus-visible ve :nth-child().",
    sections: [
      {
        title: "1. CSS Özgüllük (Specificity) Sıralaması",
        content: `Aynı elemana birden fazla kural yazıldığında hangisinin kazanacağı özgüllük puanına göre belirlenir:
1. Satır İçi Stil (\`style="..."\`): 1000 puan
2. Kimlik Seçici (\`#id\`): 100 puan
3. Sınıf ve Pseudo-class (\`.class\`, \`:hover\`): 10 puan
4. Etiket Seçici (\`div\`, \`p\`): 1 puan`,
      },
      {
        title: "2. Modern Pseudo-Class'lar",
        content: `Aşağıdaki seçiciler kullanıcı deneyimini zenginleştirir:`,
        code: {
          language: "css",
          caption: "selectors.css",
          snippet: `/* Çift numaralı tablo satırları */
tbody tr:nth-child(even) {
    background-color: #f8fafc;
}

/* Sadece klavyeyle Tab tuşuyla odaklanıldığında çerçeve göster */
button:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}`,
        },
      },
    ],
    quiz: {
      question: "Bir CSS seçicisinde 'ul > li' ifadesindeki '>' büyüktür işaretinin anlamı nedir?",
      options: [
        "A) ul içindeki tüm li torunları",
        "B) Yalnızca ul'nin doğrudan (birinci derece) çocuğu olan li elemanları",
        "C) ul'den sonra gelen kardeş eleman",
        "D) ul'den önceki eleman",
      ],
      correctIndex: 1,
      explanation: "Doğru! '>' doğrudan çocuk (direct child) seçicisidir; torunların torununu kapsamaz.",
    },
  },

  "css-box-model-deep": {
    id: "css-box-model-deep",
    badge: "Modül 2 • Kutu Modeli",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Kutu Modeli: Padding, Margin, Border ve Display",
    subtitle: "Kutu boyutlandırma kabusu: box-sizing: border-box kuralı ve margin çökmesi (margin collapse).",
    sections: [
      {
        title: "1. Kurtarıcı Kural: box-sizing: border-box",
        content: `Varsayılan CSS kutu modelinde (\`content-box\`), bir kutuya \`width: 200px\` ve \`padding: 20px\` verirseniz, kutunun gerçek genişliği $200 + 20 + 20 = 240\\text{px}$ olur ve tasarımınız taşar!

Modern CSS'te tüm elemanlara \`box-sizing: border-box\` uygulanır. Böylece padding ve border genişliğin içine dahil edilir:`,
        code: {
          language: "css",
          caption: "reset.css",
          snippet: `*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}`,
        },
      },
    ],
    quiz: {
      question: "CSS'te bir kutunun padding ve border değerlerinin toplam genişliği büyütmesini engelleyip belirtilen width içinde kalmasını sağlayan özellik hangisidir?",
      options: [
        "A) box-sizing: border-box;",
        "B) display: flex;",
        "C) overflow: hidden;",
        "D) margin: auto;",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'box-sizing: border-box' kutunun toplam boyutunu padding ve kenarlıklarla şişirmeden sabit width sınırlarında tutar.",
    },
  },

  "css-typography-colors": {
    id: "css-typography-colors",
    badge: "Modül 2 • Renk & Tipografi",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Modern Renk Sistemleri (HSL, OKLCH) ve Web Tipografisi",
    subtitle: "Hex ve RGB yerine algısal olarak homojen OKLCH, font-display: swap ve akışkan tipografi (clamp).",
    sections: [
      {
        title: "1. Akışkan Yazı Boyutu (Fluid Typography - clamp())",
        content: `Medya sorgularıyla her ekran boyutu için tek tek font boyutu yazmak yerine CSS \`clamp()\` ile akışkan boyutlandırma yapılır:
\`\`\`css
/* Minimum 1.5rem, ekranın %4'ü kadar esnek, maksimum 3rem */
h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
}
\`\`\``,
      },
    ],
    quiz: {
      question: "CSS 'clamp(min, val, max)' fonksiyonunun görevi nedir?",
      options: [
        "A) Rengi griye dönüştürmek",
        "B) Bir değeri belirlenen alt (min) ve üst (max) sınırlar arasında sınırlamak",
        "C) Fontu kalınlaştırmak",
        "D) Sayfayı kaydırmak",
      ],
      correctIndex: 1,
      explanation: "Doğru! clamp() değeri bir aralıkta kilitler; örneğin ekran küçüldüğünde min değerin altına inmesini engeller.",
    },
  },

  "css-flexbox-deep": {
    id: "css-flexbox-deep",
    badge: "Modül 3 • Flexbox Düzeni",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Kapsamlı Flexbox: justify-content, align-items ve gap",
    subtitle: "Tek boyutlu esnek yerleşim: flex-direction, flex-wrap, flex-grow, flex-shrink ve flex-basis.",
    sections: [
      {
        title: "1. Flexbox Büyüme ve Küçülme (flex: 1 1 auto)",
        content: `- \`flex-grow\`: Boşta kalan alanı elemanın ne oranda paylaşacağını belirler.
- \`flex-shrink\`: Alan daraldığında elemanın ne oranda küçüleceğini belirler.
- \`flex-basis\`: Elemanın büyüyüp küçülmeden önceki varsayılan başlangıç boyutudur.`,
        code: {
          language: "css",
          caption: "navbar_layout.css",
          snippet: `.navbar {
    display: flex;
    justify-content: space-between; /* İki uca yasla */
    align-items: center;            /* Dikeyde ortala */
    padding: 1rem 2rem;
}

.search-input {
    flex-grow: 1; /* Boş alanı arama çubuğu doldursun */
    margin: 0 2rem;
}`,
        },
      },
    ],
    quiz: {
      question: "Flexbox konteynerinde elemanlar sığmadığında otomatik olarak bir alt satıra geçmelerini sağlayan özellik hangisidir?",
      options: ["A) flex-wrap: wrap;", "B) flex-flow: row;", "C) overflow: scroll;", "D) display: grid;"],
      correctIndex: 0,
      explanation: "Doğru! 'flex-wrap: wrap' elemanların tek satırda sıkışıp taşmasını engeller ve alt satıra geçmesini sağlar.",
    },
  },

  "css-grid": {
    id: "css-grid",
    badge: "Modül 3 • CSS Grid",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "2 Boyutlu Düzen: CSS Grid Mimarisi",
    subtitle: "Satır ve sütunları aynı anda yönetme: grid-template-columns, repeat(), minmax() ve auto-fit ile otomatik responsive kartlar.",
    sections: [
      {
        title: "1. Tek Satırda Tamamen Responsive Kart Grid'i",
        content: `Hiçbir medya sorgusu (media query) yazmadan ekran genişliğine göre 1, 2, 3 veya 4 sütun olan meşhur CSS Grid kalıbı:`,
        code: {
          language: "css",
          caption: "responsive_grid.css",
          snippet: `.card-grid {
    display: grid;
    /* Kartlar minimum 280px olsun, sığdıkça yan yana dolsun: */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}`,
        },
      },
    ],
    quiz: {
      question: "CSS Grid'de 'repeat(auto-fit, minmax(250px, 1fr))' ifadesinin sağladığı en büyük avantaj nedir?",
      options: [
        "A) Sayfayı siyah-beyaz yapar",
        "B) Medya sorgusuna gerek kalmadan ekran genişliğine göre sütun sayısını dinamik ve esnek olarak kendiliğinden ayarlaması",
        "C) Font boyutunu büyütmesi",
        "D) Resimleri sıkıştırması",
      ],
      correctIndex: 1,
      explanation: "Doğru! auto-fit ve minmax birleşimi ekran küçüldükçe sütunları otomatik alt satıra alarak kusursuz responsive kart ızgarası üretir.",
    },
  },

  "css-responsive": {
    id: "css-responsive",
    badge: "Modül 4 • Responsive Tasarım",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Medya Sorguları ve Mobil Uyumlu Tasarım",
    subtitle: "Mobil Öncelikli (Mobile-First) yaklaşım, breakpoint stratejileri ve @media (min-width).",
    sections: [
      {
        title: "1. Mobil Öncelikli (Mobile-First) Kuralı",
        content: `Modern CSS mimarisinde stiller önce en dar mobil ekran için yazılır. Ekran genişledikçe \`@media (min-width: ...)\` ile zenginleştirilir:`,
        code: {
          language: "css",
          caption: "responsive.css",
          snippet: `/* Varsayılan: Mobil Ekran (1 sütun) */
.layout {
    display: flex;
    flex-direction: column;
}

/* Tablet ve Masaüstü (768px ve üzeri) */
@media (min-width: 768px) {
    .layout {
        flex-direction: row;
    }
}`,
        },
      },
    ],
    quiz: {
      question: "Mobil öncelikli (Mobile-First) bir responsive CSS tasarımında ekran genişledikçe devreye giren medya sorgusu hangisidir?",
      options: [
        "A) @media (max-width: 768px)",
        "B) @media (min-width: 768px)",
        "C) @media (device-pixel: 2)",
        "D) @media screen only",
      ],
      correctIndex: 1,
      explanation: "Doğru! Mobile-First yaklaşımında taban kod mobildir; genişleyen ekranlar için min-width sorguları eklenir.",
    },
  },

  "css-animations": {
    id: "css-animations",
    badge: "Modül 4 • Animasyonlar",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Geçişler (Transitions), Transform ve Keyframes Animasyonları",
    subtitle: "GPU hızlandırmalı pürüzsüz 60 FPS animasyonlar: transform, opacity ve @keyframes döngüleri.",
    sections: [
      {
        title: "1. Performanslı Animasyon İlkesi",
        content: `Animasyon yaparken asla \`width\`, \`height\`, \`top\`, \`left\` gibi tarayıcının tüm sayfayı yeniden çizmesine (Reflow / Layout Shift) sebep olan özellikleri hareket ettirmeyin!

Yalnızca ekran kartının (GPU) doğrudan işlediği iki özelliği anime edin:
1. **\`transform\`** (translate, scale, rotate)
2. **\`opacity\`**`,
        code: {
          language: "css",
          caption: "smooth_animations.css",
          snippet: `@keyframes nabiz {
    0%   { transform: scale(1); opacity: 1; }
    50%  { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
}

.pulse-badge {
    animation: nabiz 2s infinite ease-in-out;
    will-change: transform;
}`,
        },
      },
    ],
    quiz: {
      question: "Web sayfalarında tarayıcının tüm sayfayı yeniden hesaplamasını (Reflow) önleyip GPU üzerinden 60 FPS akıcı animasyon sunan iki CSS özelliği hangisidir?",
      options: [
        "A) width ve height",
        "B) margin ve padding",
        "C) transform ve opacity",
        "D) top ve left",
      ],
      correctIndex: 2,
      explanation: "Doğru! 'transform' ve 'opacity' özellikleri compositor katmanında doğrudan GPU tarafından hesaplandığı için sayfa yerleşimini bozmaz ve en yüksek performansı verir.",
    },
  },

  // ========================================================
  // JAVASCRIPT (ES6+)
  // ========================================================
  "js-intro": {
    id: "js-intro",
    badge: "Web Geliştirme • JavaScript",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Modern JavaScript (ES6+) ve DOM Manipülasyonu",
    subtitle: "Sayfalara can verme: let/const, arrow fonksiyonlar, olay dinleyiciler ve asenkron veri çekme.",
    sections: [
      {
        title: "1. Modern Değişkenler ve DOM Olayları",
        content: `JavaScript, web sayfalarını dinamik hale getiren etkileşim motorudur. ES6 ile gelen \`const\` (sabit) ve \`let\` (kapsam değişkeni) eski \`var\` anahtar kelimesinin yerini almıştır.`,
        code: {
          language: "javascript",
          caption: "dom_events.js",
          snippet: `const button = document.querySelector("#btn-run");
const output = document.querySelector("#log-screen");

button.addEventListener("click", () => {
    output.textContent = "İşlem başarıyla başlatıldı...";
    output.classList.add("text-success");
});`,
        },
      },
    ],
    quiz: {
      question: "JavaScript ES6 ile gelen ve değeri bir kez atandıktan sonra yeniden atanamayan blok kapsamlı değişken bildirimi hangisidir?",
      options: ["A) var", "B) let", "C) const", "D) def"],
      correctIndex: 2,
      explanation: "Doğru! 'const' anahtar kelimesiyle tanımlanan değişkenler sabittir ve yeniden atama yapılamaz.",
    },
  },

  "js-data-types": {
    id: "js-data-types",
    badge: "Modül 1 • Tipler & Şablonlar",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Veri Tipleri, Tip Dönüşümleri ve Şablon Dizgileri",
    subtitle: "İlkel tipler (Primitive) vs Referans tipleri, katı eşitlik (=== vs ==) ve Template Literals (`${var}`).",
    sections: [
      {
        title: "1. Şablon Dizgileri (Template Literals)",
        content: `Eski \`+ \` birleştirme operatörü yerine ters tırnak (\`\` \` \`\`) ile çok satırlı dizgiler ve dize interpolasyonu (\`\${...}\`) kullanılır:`,
        code: {
          language: "javascript",
          caption: "template_literals.js",
          snippet: `const kullanici = "Ayşe";
const rol = "Gömülü Sistem Mühendisi";
const mesaj = \`Sayın \${kullanici}, platformumuza hoş geldiniz!
Unvanınız: \${rol}.\`;

console.log(mesaj);`,
        },
      },
    ],
    quiz: {
      question: "JavaScript'te '5 === '5'' ifadesinin sonucu nedir ve neden?",
      options: [
        "A) true, çünkü değerleri aynıdır",
        "B) false, çünkü '===' hem değeri hem de tipi kontrol eder (biri number, biri string)",
        "C) undefined",
        "D) NaN",
      ],
      correctIndex: 1,
      explanation: "Doğru! Katı eşitlik operatörü (===) tip dönüşümü (type coercion) yapmaz; tipleri farklı olduğu için doğrudan false döner.",
    },
  },

  "js-functions": {
    id: "js-functions",
    badge: "Modül 2 • Fonksiyonlar & Kapsam",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Arrow Fonksiyonlar, Kapsam (Scope) ve Closures",
    subtitle: "Ok fonksiyonları (() => {}), leksikal 'this' bağlamı ve fonksiyonel fabrika kalıpları (Closures).",
    sections: [
      {
        title: "1. Kapsama Alanı Kapanışları (Closures)",
        content: `Bir fonksiyon, kendisini çevreleyen dış fonksiyonun değişkenlerini dış fonksiyon tamamlandıktan sonra bile hatırlıyorsa buna **Closure** denir:`,
        code: {
          language: "javascript",
          caption: "closure_counter.js",
          snippet: `function sayacUretici(baslangic = 0) {
    let sayac = baslangic; // Gizli (private) değişken
    return {
        artir: () => ++sayac,
        oku: () => sayac
    };
}

const benimSayacim = sayacUretici(10);
console.log(benimSayacim.artir()); // 11
console.log(benimSayacim.artir()); // 12`,
        },
      },
    ],
    quiz: {
      question: "JavaScript'te bir iç fonksiyonun, kendisini çevreleyen dış fonksiyon kapsamındaki değişkenlere dış fonksiyon çalışmasını bitirse dahi erişebilmesine ne ad verilir?",
      options: ["A) Hoisting", "B) Closure (Kapanış)", "C) Recursion", "D) Prototype Chain"],
      correctIndex: 1,
      explanation: "Doğru! Closure, fonksiyonun kendi leksikal ortamını hafızasında saklamasını sağlar.",
    },
  },

  "js-arrays-objects": {
    id: "js-arrays-objects",
    badge: "Modül 2 • Diziler & Nesneler",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Dizi Metotları (map, filter, reduce) ve Destructuring",
    subtitle: "Döngüsüz fonksiyonel dizi işleme, nesne/dizi parçalama (Destructuring) ve Spread operatörü (...).",
    sections: [
      {
        title: "1. Modern Dizi Metotları",
        content: `- \`map()\`: Her elemanı dönüştürüp yeni bir dizi üretir.
- \`filter()\`: Koşulu sağlayan elemanları filtreler.
- \`reduce()\`: Tüm diziyi tek bir değere indirger (örneğin toplam).`,
        code: {
          language: "javascript",
          caption: "functional_arrays.js",
          snippet: `const urunler = [
    { ad: "Basys 3 FPGA", fiyat: 4500, stok: 5 },
    { ad: "ESP32-S3", fiyat: 250, stok: 20 },
    { ad: "RPLIDAR A1", fiyat: 3200, stok: 0 }
];

// Stokta olan ürünlerin adları:
const stoktakiler = urunler
    .filter(u => u.stok > 0)
    .map(u => u.ad);

console.log("Stoktaki Donanımlar:", stoktakiler);`,
        },
      },
    ],
    quiz: {
      question: "JavaScript'te bir dizinin tüm elemanlarını belirli bir kurala göre dönüştürüp aynı uzunlukta YENİ bir dizi oluşturan metot hangisidir?",
      options: ["A) forEach()", "B) map()", "C) filter()", "D) push()"],
      correctIndex: 1,
      explanation: "Doğru! map() metodu her eleman için verilen geri çağırma (callback) fonksiyonunu çalıştırıp sonuçlardan oluşan yeni bir dizi döndürür.",
    },
  },

  "js-dom-events": {
    id: "js-dom-events",
    badge: "Modül 3 • DOM & Olaylar",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "DOM Seçimi, Olaylar ve Event Listeners",
    subtitle: "querySelector, addEventListener, olay kabarcıklanması (Event Bubbling) ve Olay Yetkilendirme (Delegation).",
    sections: [
      {
        title: "1. Olay Yetkilendirme (Event Delegation)",
        content: `100 farklı liste elemanına tek tek 100 tane \`addEventListener\` eklemek belleği tüketir. Bunun yerine tek bir dinleyici üst kapsayıcıya (\`<ul>\`) eklenir ve tıklanan eleman \`e.target\` ile yakalanır:`,
        code: {
          language: "javascript",
          caption: "event_delegation.js",
          snippet: `const liste = document.querySelector("#gorev-listesi");

liste.addEventListener("click", (e) => {
    // Tıklanan eleman bir silme butonu mu?
    if (e.target.matches(".btn-sil")) {
        const satir = e.target.closest("li");
        satir.remove();
    }
});`,
        },
      },
    ],
    quiz: {
      question: "JavaScript'te bir olayın içteki elemandan dıştaki üst kapsayıcılara doğru yukarı tırmanmasına ne ad verilir?",
      options: [
        "A) Event Bubbling (Olay Kabarcıklanması)",
        "B) Event Tunneling",
        "C) DOM Parsing",
        "D) Event Propagation Lock",
      ],
      correctIndex: 0,
      explanation: "Doğru! Event Bubbling, tetiklenen bir olayın en içteki hedef elemandan başlayarak hiyerarşik olarak yukarıdaki ata elemanlara yayılmasıdır.",
    },
  },

  "js-dynamic-ui": {
    id: "js-dynamic-ui",
    badge: "Modül 3 • Dinamik Arayüz & Depolama",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Dinamik Liste/Kart Oluşturma ve LocalStorage",
    subtitle: "document.createElement, DocumentFragment ile DOM performansı ve tarayıcıda kalıcı veri (localStorage.setItem).",
    sections: [
      {
        title: "1. LocalStorage ile Kalıcı Durum",
        content: `Sayfa yenilendiğinde verilerin kaybolmaması için tarayıcının yerel depolama alanı kullanılır:`,
        code: {
          language: "javascript",
          caption: "localstorage_demo.js",
          snippet: `// Veriyi JSON string olarak kaydet:
const temaAyari = { karanlikMod: true, yaziBoyutu: "orta" };
localStorage.setItem("kullanici_ayarlari", JSON.stringify(temaAyari));

// Veriyi geri oku:
const kayitli = localStorage.getItem("kullanici_ayarlari");
if (kayitli) {
    const ayar = JSON.parse(kayitli);
    console.log("Karanlık Mod:", ayar.karanlikMod);
}`,
        },
      },
    ],
    quiz: {
      question: "Tarayıcı LocalStorage deposuna bir JavaScript nesnesi (Object) kaydederken hangi fonksiyonla string formatına çevrilmelidir?",
      options: [
        "A) JSON.parse()",
        "B) JSON.stringify()",
        "C) Object.toString()",
        "D) Storage.format()",
      ],
      correctIndex: 1,
      explanation: "Doğru! LocalStorage yalnızca string depolar; nesneler 'JSON.stringify(nesne)' ile metne çevrilerek saklanır.",
    },
  },

  "js-async-await": {
    id: "js-async-await",
    badge: "Modül 4 • Asenkron JavaScript",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Asenkron Programlama: Promises ve Async/Await",
    subtitle: "Callback Cehennemi (Callback Hell) sonu: Promise zincirleri, async/await sözdizimi ve try/catch hata yakalama.",
    sections: [
      {
        title: "1. Promise Durumları ve async/await",
        content: `JavaScript tek iş parçacıklı (single-threaded) bir dildir; uzun süren ağ istekleri tarayıcıyı dondurmasın diye asenkron işletilir.
- **Pending (Beklemede)**
- **Fulfilled / Resolved (Başarılı)**
- **Rejected (Hata)**

\`async/await\`, asenkron kodun sanki senkron kodmuş gibi temiz okunmasını sağlar:`,
        code: {
          language: "javascript",
          caption: "async_await.js",
          snippet: `function bekle(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function goreviCalistir() {
    console.log("Görev başladı...");
    await bekle(2000); // 2 saniye bekle (bloklamadan)
    console.log("2 saniye sonra görev tamamlandı!");
}

goreviCalistir();`,
        },
      },
    ],
    quiz: {
      question: "JavaScript'te bir fonksiyon içinde 'await' anahtar kelimesini kullanabilmek için o fonksiyonun tanımının başına ne eklenmelidir?",
      options: ["A) async", "B) promise", "C) defer", "D) thread"],
      correctIndex: 0,
      explanation: "Doğru! 'await' anahtar kelimesi yalnızca 'async' olarak tanımlanmış fonksiyonların içinde kullanılabilir.",
    },
  },

  "js-fetch-api": {
    id: "js-fetch-api",
    badge: "Modül 4 • Web API Entegrasyonu",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Fetch API ile REST Sunucularından Veri Çekme",
    subtitle: "HTTP GET/POST istekleri, response.json() ayrıştırma, HTTP durum kodları (200, 404, 500) ve ağ hataları.",
    sections: [
      {
        title: "1. Modern Fetch API Şablonu",
        content: `Sunucudan JSON verisi çekerken HTTP hata kodlarını (\`res.ok\`) kontrol etmek kritik bir güvenlik kuralıdır:`,
        code: {
          language: "javascript",
          caption: "fetch_api.js",
          snippet: `async function havaDurumuGetir(sehir) {
    try {
        const response = await fetch(\`https://api.example.com/weather?q=\${sehir}\`);
        
        // HTTP 404 veya 500 durumlarını yakala:
        if (!response.ok) {
            throw new Error(\`Sunucu hatası: \${response.status}\`);
        }
        
        const veri = await response.json();
        console.log(\`\${sehir} Sıcaklık:\`, veri.temp);
        return veri;
    } catch (hata) {
        console.error("Ağ veya API Hatası:", hata.message);
    }
}

havaDurumuGetir("Istanbul");`,
        },
      },
    ],
    quiz: {
      question: "Fetch API ile yapılan bir HTTP isteğinde sunucunun 404 (Not Found) dönüp dönmediğini kontrol eden boolean özellik hangisidir?",
      options: ["A) response.status404", "B) response.ok", "C) response.isError", "D) response.success"],
      correctIndex: 1,
      explanation: "Doğru! 'response.ok' özelliği HTTP durum kodu 200-299 aralığında ise true, 4xx veya 5xx ise false döner.",
    },
  },
};
