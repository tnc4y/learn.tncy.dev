import { LessonContent } from "./lessonsData";

export const CSS_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // MODÜL 1: CSS TEMELLERİ, SÖZDİZİMİ & RENKLER
  // ========================================================
  "css-intro": {
    id: "css-intro",
    badge: "Modül 1 • CSS3 Temelleri",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "CSS3 Temelleri, Sözdizimi & Dahili/Harici Stiller",
    subtitle: "Web sayfalarına hayat verme: CSS sözdizimi, kurallar, seçiciler ve 3 farklı stil ekleme yöntemi (External, Internal, Inline).",
    sections: [
      {
        title: "1. CSS (Cascading Style Sheets) Nedir ve Nasıl Çalışır?",
        content: `HTML bir web sayfasının iskeletini ve içeriğini (paragraflar, başlıklar, butonlar) oluştururken; **CSS (Basamaklı Stil Şablonları)** bu iskeletin renklerini, yazı tiplerini, aralıklarını, sayfa düzenini ve animasyonlarını belirler.

"Cascading" (Basamaklı) terimi, kuralların yukarıdan aşağıya doğru bir şelale gibi akmasını ve belirli bir öncelik sırasına göre birbirini ezebilmesini (override) ifade eder.`,
      },
      {
        title: "2. CSS Kuralının Anatomisi",
        content: `Bir CSS kuralı iki ana parçadan oluşur: **Seçici (Selector)** ve **Bildirim Bloğu (Declaration Block)**:
\`\`\`css
h1 {
    color: #3b82f6;        /* Özellik: Değer; */
    font-size: 2rem;      /* Özellik: Değer; */
    text-align: center;
}
\`\`\`
- **Seçici (\`h1\`):** Sayfadaki hangi HTML elemanının hedeflendiğini belirtir.
- **Özellik (\`color\`):** Değiştirilmek istenen stil niteliğidir.
- **Değer (\`#3b82f6\`):** O özelliğe atanan yeni değerdir. Her bildirim mutlaka noktalı virgül (\`;\`) ile biter.`,
      },
      {
        title: "3. CSS Eklemenin 3 Yolu (External, Internal, Inline)",
        content: `CSS kodları bir HTML sayfasına 3 farklı şekilde bağlanabilir:

1. **Harici CSS (External - Önerilen Standart):** Stiller ayrı bir \`.css\` dosyasında tutulur ve HTML'in \`<head>\` kısmına \`<link>\` etiketi ile bağlanır. Tüm sitede tek merkezden tasarım yönetimi sağlar.
2. **Dahili CSS (Internal):** HTML belgesinin \`<head>\` alanında \`<style>\` etiketi içine yazılır. Yalnızca tek bir sayfaya özel stiller için uygundur.
3. **Satır İçi CSS (Inline - Kaçınılması Gereken):** Doğrudan HTML etiketinin içine \`style="..."\` özniteliği olarak yazılır. Bakımı zordur ve kod tekrarına sebep olur.`,
        code: {
          language: "html",
          caption: "css_methods.html - 3 Farklı Stil Bağlama Yöntemi",
          snippet: `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <!-- 1. Harici CSS Bağlantısı (En İyi Yöntem) -->
    <link rel="stylesheet" href="style.css">

    <!-- 2. Dahili CSS Bloğu -->
    <style>
        body {
            font-family: system-ui, sans-serif;
            background-color: #f8fafc;
        }
        .vurgulu-kutu {
            padding: 1.5rem;
            background: #ffffff;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="vurgulu-kutu">
        <!-- 3. Satır İçi (Inline) CSS -->
        <p style="color: crimson; font-weight: bold;">Bu metin satır içi stille renklendirildi.</p>
    </div>
</body>
</html>`,
        },
        callout: {
          type: "tip",
          title: "Öncelik Sırası (Cascade)",
          message: "Aynı elemanı hedefleyen kurallarda Satır İçi (Inline) stiller en yüksek önceliğe sahiptir; Dahili ve Harici stilleri ezer.",
        },
      },
    ],
    playground: {
      title: "CSS Sözdizimi Canlı Önizleme",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    .kart {
      background: linear-gradient(135deg, #1e293b, #0f172a);
      color: #ffffff;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      text-align: center;
      max-width: 320px;
      margin: 20px auto;
      font-family: sans-serif;
    }
    .baslik {
      color: #38bdf8;
      font-size: 1.4rem;
      margin-bottom: 8px;
    }
    .aciklama {
      color: #94a3b8;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .buton {
      display: inline-block;
      margin-top: 16px;
      padding: 10px 20px;
      background: #38bdf8;
      color: #0f172a;
      border-radius: 8px;
      font-weight: bold;
      text-decoration: none;
      transition: transform 0.2s;
    }
    .buton:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="kart">
    <h2 class="baslik">CSS3 ile Tasarla</h2>
    <p class="aciklama">CSS kuralları seçiciler ve bildirimlerden oluşur.</p>
    <a href="#" class="buton">Keşfet</a>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[CSS:RENDER] Sayfa stilleri tarayıcı motoru tarafından işlendi.",
        "[STYLE] .kart sınıfı ve hover durumları aktif.",
      ],
    },
    quiz: {
      question: "Birden fazla web sayfasında aynı tasarımın tutarlı şekilde kullanılabilmesi için CSS kodları hangi yöntemle eklenmelidir?",
      options: [
        "A) Harici (External) CSS dosyasını <link rel=\"stylesheet\"> ile bağlayarak",
        "B) Her HTML etiketinin içine 'style' özniteliği yazarak",
        "C) Yalnızca <body> sonuna <script> yazarak",
        "D) Sayfa başlığına <title> içinde yazarak",
      ],
      correctIndex: 0,
      explanation: "Doğru! Harici (External) CSS dosyası oluşturup <link> etiketiyle bağlamak; stilleri tek bir merkezde toplamayı ve tüm sitede ortak kullanmayı sağlar.",
    },
  },

  "css-colors-backgrounds": {
    id: "css-colors-backgrounds",
    badge: "Modül 1 • Renkler & Arka Planlar",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Renk Sistemleri & Arka Planlar (Colors & Backgrounds)",
    subtitle: "RGB, HEX, HSL ve OKLCH renk modelleri, arka plan görselleri (cover/contain) ve pürüzsüz CSS gradyanları.",
    sections: [
      {
        title: "1. Modern CSS Renk Modelleri",
        content: `CSS'te renkleri tanımlamanın 4 popüler yolu vardır:
- **HEX (Onaltılık):** \`#ff0055\` veya 8 haneli alfa kanallı \`#ff005580\` (%50 şeffaf).
- **RGB / RGBA:** Kırmızı, Yeşil, Mavi karışımı: \`rgb(59 130 246 / 0.8)\`.
- **HSL / HSLA:** Hue (Renk Tonu: 0-360°), Saturation (Doygunluk: %0-100), Lightness (Açıklık: %0-100): \`hsl(217deg 91% 60%)\`. Tasarımcılar için renk paleti türetmede en ergonomik modeldir.
- **OKLCH (Yeni Standart):** İnsan gözünün algısal parlaklığına göre homojen dağılan yeni nesil renk sistemi.`,
      },
      {
        title: "2. Gelişmiş Arka Plan Özellikleri (Background)",
        content: `Bir kutunun arka planını resimlerle süslerken kullanılan kritik özellikler:
- \`background-image: url('manzara.webp');\`
- \`background-repeat: no-repeat;\` : Resmin karo gibi döşenmesini engeller.
- \`background-size: cover;\` : Resmi kutunun tamamını dolduracak şekilde orantılı kırpar.
- \`background-position: center center;\` : Resmi merkeze hizalar.
- \`background-attachment: fixed;\` : Sayfa kaydırılsa dahi resmin sabit kalmasını sağlar (**Parallax Efekti**).`,
        code: {
          language: "css",
          caption: "hero_background.css - Tam Ekran Hero Arka Planı",
          snippet: `.hero-banner {
    min-height: 80vh;
    background-image: 
        linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)),
        url('/assets/hero-bg.webp');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
}`,
        },
      },
      {
        title: "3. CSS Gradyanları (Linear & Radial Gradients)",
        content: `Harici resim dosyası yüklemeden saf CSS ile renk geçişleri üretilir:
- \`linear-gradient(45deg, #3b82f6, #ec4899)\` : Doğrusal açılı geçiş.
- \`radial-gradient(circle at center, #38bdf8, #0f172a)\` : Merkezden dışa dairesel geçiş.`,
      },
    ],
    playground: {
      title: "Canlı CSS Gradyan ve Renk Düzenleyici",
      filename: "gradient.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-content: center; background: #0f172a; }
    .gradyan-kutu {
      width: 320px;
      height: 200px;
      border-radius: 20px;
      background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6);
      box-shadow: 0 20px 30px -10px rgba(236, 72, 153, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: sans-serif;
      font-weight: bold;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
  </style>
</head>
<body>
  <div class="gradyan-kutu">
    <span style="font-size: 1.5rem;">linear-gradient</span>
    <span style="font-size: 0.85rem; opacity: 0.9; margin-top: 6px;">135deg Renk Geçişi</span>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[CSS:GRADIENT] 3 Renkli lineer gradyan derlendi.",
        "[SHADOW] Renkli glow gölgesi uygulandı.",
      ],
    },
    quiz: {
      question: "Bir arka plan resminin en-boy oranını bozmadan kutunun tüm alanını boşluk bırakmaksızın doldurmasını sağlayan CSS kuralı hangisidir?",
      options: [
        "A) background-size: cover;",
        "B) background-size: contain;",
        "C) background-size: 100% 100%;",
        "D) background-repeat: all;",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'background-size: cover' oranı koruyarak tüm alanı kaplar (gerekirse kenarlardan taşan kısımları kırpar); 'contain' ise resmin tamamını kutu içine sığdırır.",
    },
  },

  "css-selectors": {
    id: "css-selectors",
    badge: "Modül 1 • Seçiciler (Selectors)",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Gelişmiş Seçiciler, Combinator'lar ve Özgüllük (Specificity)",
    subtitle: "ID/Class seçicileri, Torun ve Kardeş combinator'ları (> , + , ~), Specificity puan hesabı ve !important kuralları.",
    sections: [
      {
        title: "1. CSS Combinator'ları (İlişki Seçicileri)",
        content: `Birden fazla eleman arasındaki ilişkiye göre hedefleme yapılır:
- **Torun Seçicisi (Boşluk \` \`):** \`div p\` $\\rightarrow$ div içindeki tüm p etiketlerini seçer (derin torunlar dahil).
- **Doğrudan Çocuk (\`>\`):** \`ul > li\` $\\rightarrow$ Yalnızca ul'nin birinci derece doğrudan çocuğu olan li'leri seçer.
- **Bitişik Kardeş (\`+\`):** \`h2 + p\` $\\rightarrow$ h2'den hemen sonra gelen ilk p etiketini seçer.
- **Genel Kardeş (\`~\`):** \`h2 ~ p\` $\\rightarrow$ h2'den sonra aynı ebeveyn altında gelen tüm p etiketlerini seçer.`,
      },
      {
        title: "2. Nitelik (Attribute) Seçicileri",
        content: `Elemanların HTML özniteliklerine göre seçilmesi:
- \`input[type="password"]\` : Şifre kutularını hedefler.
- \`a[href^="https"]\` : 'https' ile **başlayan** linkleri hedefler.
- \`a[href$=".pdf"]\` : '.pdf' ile **biten** dosyaları hedefler.
- \`img[alt*="logo"]\` : Alt metninde 'logo' kelimesi **geçen** resimleri hedefler.`,
      },
      {
        title: "3. Özgüllük (Specificity) ve !important",
        content: `Tarayıcı aynı elemana yazılan stiller arasında çakışma olduğunda özgüllük puanına bakar:
1. **Satır İçi Stil (\`style="..."\`):** 1000 puan
2. **Kimlik Seçici (\`#id\`):** 100 puan
3. **Sınıf, Nitelik & Pseudo-class (\`.btn\`, \`[type]\`, \`:hover\`):** 10 puan
4. **Etiket & Pseudo-element (\`div\`, \`p\`, \`::before\`):** 1 puan

\`!important\` bildirimi tüm specificity puanlarını ezer. Ancak kod mimarisini bozduğu ve hata ayıklamayı zorlaştırdığı için acil durumlar haricinde kullanılmamalıdır.`,
        code: {
          language: "css",
          caption: "specificity_demo.css",
          snippet: `/* Puan: 1 (Etiket) */
p { color: black; }

/* Puan: 10 (.uyari sınıfı) */
.uyari { color: orange; }

/* Puan: 110 (#ana-kart içindeki .uyari) -> KAZANIR */
#ana-kart .uyari { color: red; }`,
        },
      },
    ],
    playground: {
      title: "CSS Combinator ve Nitelik Seçicileri Testi",
      filename: "selectors.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    /* Doğrudan çocuk seçicisi */
    .menu > li {
      color: #0284c7;
      font-weight: bold;
      margin-bottom: 6px;
    }
    /* PDF bağlantılarına özel ikon ve renk */
    a[href$=".pdf"] {
      color: #dc2626;
      text-decoration: none;
    }
    a[href$=".pdf"]::after {
      content: " 📄 (PDF)";
      font-size: 0.8rem;
    }
  </style>
</head>
<body>
  <ul class="menu">
    <li>Ana Sayfa</li>
    <li>Dokümanlar:
      <ul>
        <li><a href="kullanim-rehberi.pdf">Kullanım Kılavuzu</a></li>
        <li><a href="https://example.com">Web Sitesi</a></li>
      </ul>
    </li>
  </ul>
</body>
</html>`,
      expectedOutput: [
        "[CSS:SELECTOR] .menu > li doğrudan çocuk kuralı uygulandı.",
        "[ATTRIBUTE] a[href$='.pdf'] seçicisi PDF linkini yakaladı.",
      ],
    },
    quiz: {
      question: "Aşağıdaki seçicilerden hangisi '#menu .nav-item' kuralından daha yüksek bir özgüllük (specificity) puanına sahiptir?",
      options: [
        "A) .container .nav-item (20 puan)",
        "B) #header #menu (200 puan)",
        "C) nav li a (3 puan)",
        "D) .nav-item:hover (20 puan)",
      ],
      correctIndex: 1,
      explanation: "Doğru! '#header #menu' iki adet ID içerdiği için 200 puandır; '#menu .nav-item' ise 1 ID + 1 Class = 110 puandır.",
    },
  },

  // ========================================================
  // MODÜL 2: KUTU MODELİ, BOŞLUKLAR & KENARLIKLAR
  // ========================================================
  "css-box-model-deep": {
    id: "css-box-model-deep",
    badge: "Modül 2 • Kutu Modeli (Box Model)",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Kutu Modeli (Box Model): Margin, Padding, Border ve box-sizing",
    subtitle: "CSS kutu modelinin 4 katmanı, dikey margin çökmesi (Margin Collapse) ve box-sizing: border-box devrimi.",
    sections: [
      {
        title: "1. Kutu Modelinin 4 Katmanı",
        content: `Tarayıcıda gördüğünüz her HTML elemanı bir dikdörtgen kutudur. İçten dışa doğru 4 katmandan oluşur:
1. **Content (İçerik):** Metin, resim veya videonun bulunduğu asıl çekirdek alan (\`width\` ve \`height\`).
2. **Padding (İç Boşluk):** İçerik ile kenarlık arasındaki nefes alma boşluğu.
3. **Border (Kenarlık):** Elemanın etrafını çevreleyen çerçeve çizgisi.
4. **Margin (Dış Boşluk):** Elemanın komşu diğer elemanlarla arasındaki dış mesafe.`,
      },
      {
        title: "2. Kurtarıcı Kural: box-sizing: border-box",
        content: `Varsayılan CSS kutu modelinde (\`content-box\`), bir kutuya \`width: 300px\` ve \`padding: 20px\` verirseniz; kutunun toplam genişliği $300 + 20 + 20 = 340\\text{px}$ olur ve tasarım taşar!

Modern web geliştirmede evrensel CSS sıfırlaması (CSS Reset) ile **\`box-sizing: border-box\`** uygulanır:`,
        code: {
          language: "css",
          caption: "box_sizing_reset.css",
          snippet: `*, *::before, *::after {
    box-sizing: border-box; /* Padding ve border genişliğin içine dahil edilir */
    margin: 0;
    padding: 0;
}`,
        },
      },
      {
        title: "3. Dikey Margin Çökmesi (Margin Collapse)",
        content: `İki blok eleman alt alta geldiğinde, üstteki elemanın \`margin-bottom: 30px\` değeri ile alttaki elemanın \`margin-top: 20px\` değeri toplanıp 50px **olmaz**.

Tarayıcı iki değerden **büyük olanı (30px)** seçer ve iki kutu arasındaki boşluk 30px olur. Buna **Margin Çökmesi** denir. Yatay marginlerde çökme yaşanmaz.`,
      },
    ],
    playground: {
      title: "Kutu Modeli (Padding vs Margin) Canlı Deney",
      filename: "box_model.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f1f5f9; padding: 20px; }
    .kutu {
      box-sizing: border-box;
      width: 280px;
      padding: 24px;
      border: 4px solid #3b82f6;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="kutu">
    <h3 style="margin-top:0; color:#1e293b;">border-box Modeli</h3>
    <p style="color:#64748b; font-size:0.9rem;">Genişlik tam 280px olarak sabit kalır.</p>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[BOX-MODEL] Content: 224px, Padding: 24px, Border: 4px.",
        "[TOTAL WIDTH] Toplam Genişlik tam olarak 280px.",
      ],
    },
    quiz: {
      question: "Bir CSS kutusunda 'padding: 10px 20px;' kuralı uygulandığında boşluklar sırasıyla hangi yönlere verilir?",
      options: [
        "A) Üst-Alt 10px, Sağ-Sol 20px",
        "B) Üst 10px, Sağ 20px, Alt 10px, Sol 20px",
        "C) Sağ-Sol 10px, Üst-Alt 20px",
        "D) Sadece köşelere 10px ve 20px",
      ],
      correctIndex: 0,
      explanation: "Doğru! İki değerli padding/margin sözdiziminde ilk değer dikey ekseni (Üst-Alt), ikinci değer yatay ekseni (Sağ-Sol) ifade eder.",
    },
  },

  "css-borders-shadows": {
    id: "css-borders-shadows",
    badge: "Modül 2 • Çerçeveler & Gölgeler",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Kenarlıklar, Yuvarlak Köşeler, Outline ve Gölgeler (Borders & Shadows)",
    subtitle: "border-radius ile yuvarlak köşeler ve daireler, outline vs border farkı, modern katmanlı box-shadow ve text-shadow efektleri.",
    sections: [
      {
        title: "1. Kenarlıklar (Borders) ve border-radius",
        content: `Kenarlıklar \`border: 2px solid #e2e8f0\` şeklinde tek satırda tanımlanır.
\`border-radius\` ile yumuşak köşeler oluşturulur:
- \`border-radius: 8px;\` : Standart modern kart köşeleri.
- \`border-radius: 9999px;\` : Hap (Pill) şeklinde butonlar.
- \`border-radius: 50%;\` : Kare bir görseli tam bir daire (Avatar) yapar.`,
      },
      {
        title: "2. Outline vs Border Farkı",
        content: `- **Border:** Kutu modelinin bir parçasıdır; elemanın kapladığı fiziksel alanı etkiler.
- **Outline:** Kenarlığın hemen dışına çizilir; kutu modeline dahil değildir, sayfa yerleşimini (layout) asla kaydırmaz. \`outline-offset: 4px\` ile kenarlıktan dışa doğru boşluk bırakılabilir. Klavye erişilebilirliği (\`:focus-visible\`) için vazgeçilmezdir.`,
      },
      {
        title: "3. Katmanlı Kutu Gölgeleri (box-shadow)",
        content: `\`box-shadow: [X-ofseti] [Y-ofseti] [Bulanıklık] [Yayılma] [Renk];\`
Modern UI tasarımlarında tek bir sert gölge yerine birden çok yumuşak gölge katmanı birleştirilir:`,
        code: {
          language: "css",
          caption: "soft_shadows.css - Modern Apple Tarzı Yumuşak Gölge",
          snippet: `.modern-kart {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.05),
        0 10px 15px -3px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.modern-kart:hover {
    transform: translateY(-4px);
    box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
}`,
        },
      },
    ],
    playground: {
      title: "Canlı Gölge ve Kenarlık Laboratuvarı",
      filename: "shadows.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { min-height: 100vh; display: grid; place-content: center; background: #f8fafc; font-family: sans-serif; }
    .avatar-kart {
      background: white;
      padding: 30px;
      border-radius: 24px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
      text-align: center;
      width: 240px;
    }
    .profil-resmi {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(45deg, #06b6d4, #3b82f6);
      margin: 0 auto 16px;
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
    }
  </style>
</head>
<body>
  <div class="avatar-kart">
    <div class="profil-resmi"></div>
    <h3 style="margin: 0; color: #1e293b;">learn.tncy.dev</h3>
    <p style="color: #64748b; font-size: 0.85rem; margin-top: 6px;">CSS3 UI Bileşeni</p>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[SHADOW] box-shadow derinliği başarıyla çizildi.",
        "[BORDER-RADIUS] 50% dairesel avatar render edildi.",
      ],
    },
    quiz: {
      question: "CSS'te bir kutunun etrafına yerleşimi bozmadan ve kutu boyutunu büyütmeden odak çerçevesi çizmek için hangisi tercih edilir?",
      options: ["A) outline", "B) border", "C) padding", "D) margin"],
      correctIndex: 0,
      explanation: "Doğru! Outline kutu modeline dahil değildir; sayfa düzenini itmeden ve boyut değiştirmeden elemanın dışına çerçeve çizer.",
    },
  },

  // ========================================================
  // MODÜL 3: TİPOGRAFİ, METİN & SÖZDE ELEMANLAR
  // ========================================================
  "css-typography-colors": {
    id: "css-typography-colors",
    badge: "Modül 3 • Tipografi & Metin",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Web Tipografisi, Google Fonts ve Metin Düzenleme (Text & Fonts)",
    subtitle: "Yazı tipi hiyerarşisi, font-family yedek zincirleri, Google Fonts entegrasyonu ve akışkan font boyutu (clamp).",
    sections: [
      {
        title: "1. Temel Metin Özellikleri (Text Styling)",
        content: `- \`text-align\`: Metni \`left\`, \`center\`, \`right\` veya \`justify\` olarak hizalar.
- \`text-decoration\`: Alt çizgi (\`underline\`), üst çizgi (\`line-through\`) veya kaldırılmasını (\`none\`) sağlar.
- \`text-transform\`: Metni \`uppercase\` (büyük harf), \`lowercase\` (küçük harf) veya \`capitalize\` (baş harfleri büyük) yapar.
- \`line-height\`: Satırlar arası mesafeyi belirler (Okunabilirlik için 1.5 - 1.6 önerilir).
- \`letter-spacing\`: Harfler arasındaki mesafeyi ayarlar.`,
      },
      {
        title: "2. Yazı Tipleri (font-family) ve Google Fonts",
        content: `Kullanıcının bilgisayarında belirtilen font yüklü değilse sıradaki fonta geçilmesi için font listesi (Font Stack) verilir:
\`\`\`css
body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
\`\`\`
Google Fonts'tan bir font yüklemek için HTML'e \`<link>\` veya CSS başına \`@import\` eklenir:`,
        code: {
          language: "css",
          caption: "fonts.css - Google Fonts Bağlantısı",
          snippet: `@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap');

code, pre {
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
}`,
        },
      },
      {
        title: "3. Akışkan Yazı Boyutu: clamp(min, val, max)",
        content: `Medya sorgusu yazmadan ekran genişliğine göre orantılı büyüyüp küçülen yazı boyutu:
\`\`\`css
h1 {
    /* Minimum 1.75rem, ekranın %4'ü kadar dinamik, maksimum 3.5rem */
    font-size: clamp(1.75rem, 4vw + 1rem, 3.5rem);
}
\`\`\``,
      },
    ],
    playground: {
      title: "Tipografi ve clamp() Canlı Önizleme",
      filename: "typography.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 30px; line-height: 1.6; color: #334155; }
    h1 {
      font-size: clamp(1.5rem, 5vw, 3rem);
      color: #0f172a;
      letter-spacing: -0.03em;
      margin-bottom: 0.5rem;
    }
    p.lead {
      font-size: 1.15rem;
      color: #64748b;
      max-width: 65ch; /* Okuma ergonomisi için satır uzunluğu sınırı */
    }
  </style>
</head>
<body>
  <h1>Akışkan Tipografi</h1>
  <p class="lead">Ekran genişliğini değiştirseniz dahi clamp() sayesinde font boyutu mükemmel sınırlar içinde kalır.</p>
</body>
</html>`,
      expectedOutput: [
        "[TYPOGRAPHY] clamp() fonksiyonu pencere genişliğine göre hesaplandı.",
        "[MAX-WIDTH] 65ch optimal okuma sütun sınırı uygulandı.",
      ],
    },
    quiz: {
      question: "CSS'te bir metnin satır yüksekliğini (satırlar arası dikey boşluk) ayarlamak için hangi özellik kullanılır?",
      options: ["A) line-height", "B) letter-spacing", "C) text-indent", "D) word-spacing"],
      correctIndex: 0,
      explanation: "Doğru! 'line-height' özelliği satır yüksekliğini belirler; metinlerin birbirine girmesini engelleyerek okunabilirliği artırır.",
    },
  },

  "css-links-lists-tables": {
    id: "css-links-lists-tables",
    badge: "Modül 3 • Arayüz Bileşenleri",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Bağlantılar, Listeler, Tablolar ve Buton Stilleri (Links, Lists, Tables)",
    subtitle: "a etiketinin 4 durumu (:hover, :active), özel liste işaretçileri ve border-collapse ile modern zebra çizgili tablolar.",
    sections: [
      {
        title: "1. Bağlantı (Link) Durumları (LVHA Kuralı)",
        content: `Bağlantı durumlarının CSS'te doğru çalışması için **LVHA** sırasıyla yazılması şarttır:
1. \`a:link\` : Ziyaret edilmemiş normal link.
2. \`a:visited\` : Kullanıcının daha önce tıkladığı link.
3. \`a:hover\` : Fare imleci linkin üzerine geldiğinde.
4. \`a:active\` : Fare butonuyla tıklandığı an.`,
      },
      {
        title: "2. Modern Tablo Tasarımı (Zebra Striping)",
        content: `HTML tablolarında varsayılan çift kenarlık görüntüsünü tek çizgiye indirmek için **\`border-collapse: collapse;\`** kullanılır:`,
        code: {
          language: "css",
          caption: "table_styles.css - Modern Veri Tablosu",
          snippet: `table {
    width: 100%;
    border-collapse: collapse; /* Çift kenarlıkları birleştir */
    font-family: sans-serif;
}

th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

th {
    background-color: #f8fafc;
    color: #475569;
    font-weight: 600;
}

/* Zebra Çizgili Satırlar */
tbody tr:nth-child(even) {
    background-color: #f1f5f9;
}

/* Satır Vurgusu */
tbody tr:hover {
    background-color: #e2e8f0;
}`,
        },
      },
    ],
    playground: {
      title: "Zebra Çizgili Tablo Canlı Önizleme",
      filename: "table.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #cbd5e1; }
    th { background: #1e293b; color: white; }
    tr:nth-child(even) { background: #f8fafc; }
    tr:hover { background: #e2e8f0; }
  </style>
</head>
<body>
  <table>
    <thead>
      <tr><th>Protokol</th><th>Hız</th><th>Kullanım</th></tr>
    </thead>
    <tbody>
      <tr><td>UART</td><td>115.2 kbps</td><td>Hata Ayıklama</td></tr>
      <tr><td>I2C</td><td>400 kbps</td><td>Sensörler</td></tr>
      <tr><td>SPI</td><td>50 Mbps</td><td>Ekran & Hafıza</td></tr>
    </tbody>
  </table>
</body>
</html>`,
      expectedOutput: [
        "[TABLE] border-collapse uygulandı.",
        "[ZEBRA] nth-child(even) satır renklendirmesi aktif.",
      ],
    },
    quiz: {
      question: "HTML tablolarında hücreler arasındaki varsayılan çift kenarlık boşluklarını yok edip tek bir pürüzsüz kenarlık yapmak için hangi kural kullanılır?",
      options: [
        "A) border-collapse: collapse;",
        "B) border-spacing: 0;",
        "C) table-layout: fixed;",
        "D) border-style: single;",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'border-collapse: collapse' tablo kenarlıklarını tek bir ortak çizgi halinde birleştirir.",
    },
  },

  "css-pseudo-classes-elements": {
    id: "css-pseudo-classes-elements",
    badge: "Modül 3 • Sözde Sınıflar & Elemanlar",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Pseudo-Classes (:hover, :nth-child) ve Pseudo-Elements (::before, ::after)",
    subtitle: "Tek iki nokta (:) ile sözde sınıflar, çift iki nokta (::) ile sözde elemanlar ve content: \"\" ile dekoratif UI süslemeleri.",
    sections: [
      {
        title: "1. Sözde Sınıflar (Pseudo-Classes - Tek İki Nokta ':')",
        content: `Bir elemanın **özel bir durumda** olduğunu belirtir:
- \`:hover\` : Kullanıcı üzerine geldiğinde.
- \`:focus\` : Eleman odaklandığında (imleç input içindeyken).
- \`:nth-child(2n)\` : Çift sayılı elemanlar.
- \`:not(.aktif)\` : .aktif sınıfı olmayanları seçer.
- \`:is(h1, h2, h3)\` : Birden çok başlığı tek seferde hedefler.`,
      },
      {
        title: "2. Sözde Elemanlar (Pseudo-Elements - Çift İki Nokta '::')",
        content: `HTML'e fazladan etiket eklemeden CSS ile **sanal elemanlar** üretmeyi sağlar:
- \`::before\` : Elemanın içeriğinin hemen **öncesine** içerik ekler.
- \`::after\` : Elemanın içeriğinin hemen **sonrasına** içerik ekler.
- \`::placeholder\` : Form girdi yer tutucusunu stillendirir.
- \`::selection\` : Kullanıcının fareyle seçtiği (mavi yaptığı) metin rengini özelleştirir.

\`::before\` ve \`::after\` kullanırken **\`content: "";\`** özelliği zorunludur!`,
        code: {
          language: "css",
          caption: "fancy_button.css - ::after ile Parlama Efekti",
          snippet: `.btn-parlak {
    position: relative;
    padding: 12px 24px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 8px;
    overflow: hidden;
}

.btn-parlak::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.5s ease;
}

.btn-parlak:hover::after {
    left: 100%; /* Üzerine gelince soldan sağa ışık parlaması geçer */
}`,
        },
      },
    ],
    playground: {
      title: "::before ve ::after ile Araç İpucu (Tooltip)",
      filename: "tooltip.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { min-height: 100vh; display: grid; place-content: center; font-family: sans-serif; }
    .tooltip-btn {
      position: relative;
      padding: 12px 20px;
      background: #0284c7;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    }
    .tooltip-btn::before {
      content: "İpucu: learn.tncy.dev";
      position: absolute;
      bottom: 125%;
      left: 50%;
      transform: translateX(-50%);
      background: #1e293b;
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.75rem;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    .tooltip-btn:hover::before {
      opacity: 1;
    }
  </style>
</head>
<body>
  <button class="tooltip-btn">Üzerime Gel (Hover)</button>
</body>
</html>`,
      expectedOutput: [
        "[PSEUDO-ELEMENT] ::before ile HTML'siz sanal tooltip üretildi.",
        "[TRANSITION] Hover anında opacity 0 -> 1 animasyonu aktif.",
      ],
    },
    quiz: {
      question: "CSS'te '::before' veya '::after' sözde elemanlarının sayfada görünür olabilmesi için hangi özellik mutlaka tanımlanmalıdır?",
      options: ["A) content: \"\";", "B) display: flex;", "C) z-index: 1;", "D) position: relative;"],
      correctIndex: 0,
      explanation: "Doğru! 'content' özelliği (boş dahi olsa 'content: \"\";') verilmediği takdirde tarayıcı sözde elemanı render etmez.",
    },
  },

  // ========================================================
  // MODÜL 4: YERLEŞİM, KONUMLANDIRMA & TAŞINTI
  // ========================================================
  "css-display-positioning": {
    id: "css-display-positioning",
    badge: "Modül 4 • Yerleşim & Konumlandırma",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Görüntüleme & Konumlandırma (Display, Position & Z-Index)",
    subtitle: "block/inline/inline-block/none farkları, static/relative/absolute/fixed/sticky konumlandırma ve z-index yığın sırası.",
    sections: [
      {
        title: "1. Display Değerleri",
        content: `- \`display: block\` : Satırı tam kaplar, \`width\` ve \`height\` alabilir (div, p, h1).
- \`display: inline\` : Yalnızca içeriği kadar yer kaplar, satırı bölmez; \`width\` ve \`height\` ALAMAZ (span, a).
- \`display: inline-block\` : Satır içi davranır (yan yana dizilir) AMA \`width\`, \`height\`, margin ve padding alabilir!
- \`display: none\` : Elemanı DOM'da tutar ama sayfadan tamamen yok eder (yer kaplamaz).
- \`visibility: hidden\` : Elemanı görünmez yapar AMA sayfadaki fiziksel yerini korur (boşluk kalır).`,
      },
      {
        title: "2. Position Konumlandırma Türleri",
        content: `1. **\`static\` (Varsayılan):** Normal belge akışıdır. \`top\`, \`left\`, \`right\`, \`bottom\` komutları İŞLEMEZ.
2. **\`relative\`:** Elemanın normal yerini korur; kendi normal yerine göre ofsetlenir (\`top: 10px\`). Genelde \`absolute\` çocuklara referans olmak için kullanılır!
3. **\`absolute\`:** Belge akışından çıkarılır. En yakın \`position: relative\` olan ata elemanına göre konumlanır.
4. **\`fixed\`:** Belge akışından çıkarılır; doğrudan tarayıcı penceresine (Viewport) kilitlenir. Sayfa kaysa bile yerinden oynamaz (Sabit navbar).
5. **\`sticky\`:** Normalde akar; ancak kaydırma esnasında belirlenen sınıra (\`top: 0\`) ulaştığında yapışır.`,
      },
      {
        title: "3. z-index ve Katman Sıralaması (Stacking Context)",
        content: `Üst üste binen elemanlarda hangisinin önde duracağını belirler. 
\`z-index\` **yalnızca position değeri static OLMAYAN (relative, absolute, fixed, sticky) elemanlarda çalışır!**`,
        code: {
          language: "css",
          caption: "positioning.css - Karta Rozet Yapıştırma Kalıbı",
          snippet: `.kart {
    position: relative; /* Referans Ebeveyn */
    padding: 24px;
    background: #ffffff;
    border-radius: 12px;
}

.yeni-rozet {
    position: absolute; /* Karta göre konumlan */
    top: -10px;
    right: -10px;
    background: #ef4444;
    color: white;
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 0.75rem;
    z-index: 10;
}`,
        },
      },
    ],
    playground: {
      title: "Relative ve Absolute Konumlandırma Testi",
      filename: "position.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { padding: 40px; font-family: sans-serif; background: #f8fafc; }
    .ana-kutu {
      position: relative;
      width: 280px;
      height: 160px;
      background: white;
      border: 2px dashed #94a3b8;
      border-radius: 12px;
      padding: 16px;
    }
    .rozet {
      position: absolute;
      top: -12px;
      right: -12px;
      background: #10b981;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="ana-kutu">
    <div class="rozet">AKTİF</div>
    <h3>Position Denemesi</h3>
    <p style="color: #64748b; font-size: 0.9rem;">Rozet ebeveyn kutunun sağ üst köşesine kenetlenmiştir.</p>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[POSITION] .ana-kutu relative referans noktası oldu.",
        "[ABSOLUTE] .rozet top: -12px / right: -12px ile köşeye oturdu.",
      ],
    },
    quiz: {
      question: "Bir elemana 'position: absolute' verildiğinde eleman konum koordinatlarını (top, left) kime göre hesaplar?",
      options: [
        "A) Daima en baştaki <html> etiketine göre",
        "B) 'position' değeri static olmayan (relative, absolute, fixed) en yakın üst ata elemanına göre",
        "C) Doğrudan bir önceki kardeş elemanına göre",
        "D) Ekran kartının çözünürlüğüne göre",
      ],
      correctIndex: 1,
      explanation: "Doğru! Absolute elemanlar hiyerarşide yukarı doğru position'ı static olmayan (genellikle relative yapılan) ilk ebeveyn elemanı referans alır.",
    },
  },

  "css-overflow-float": {
    id: "css-overflow-float",
    badge: "Modül 4 • Taşma & Akış",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Taşma Yönetimi, Float ve Çoklu Sütunlar (Overflow & Multi-column)",
    subtitle: "overflow: hidden/auto/scroll, text-overflow: ellipsis ile 3 nokta kısaltma ve CSS3 multi-column gazete sütunları.",
    sections: [
      {
        title: "1. Taşma Yönetimi (Overflow)",
        content: `Bir kutunun içeriği kutunun sabit \`width\` veya \`height\` sınırlarını aştığında ne olacağını belirler:
- \`overflow: visible\` (Varsayılan): İçerik dışarı taşar ve alttaki elemanların üstüne biner.
- \`overflow: hidden\` : Kutu dışına taşan kısımlar görünmez şekilde kesilir.
- \`overflow: scroll\` : Taşsa da taşmasa da daima kaydırma çubuğu (scrollbar) gösterir.
- \`overflow: auto\` : Yalnızca içerik taştığı zaman otomatik kaydırma çubuğu ekler (En popüler).`,
      },
      {
        title: "2. Metni '...' ile Kısaltma (Text Ellipsis)",
        content: `Tek satıra sığmayan uzun metinleri şık bir şekilde üç nokta ile kesmek için 3 kural birlikte yazılır:`,
        code: {
          language: "css",
          caption: "ellipsis.css",
          snippet: `.tek-satir-kisalt {
    white-space: nowrap;       /* Asla alt satıra geçme */
    overflow: hidden;          /* Taşan kısmı gizle */
    text-overflow: ellipsis;   /* Taşan yerin sonuna '...' koy */
    max-width: 250px;
}`,
        },
      },
      {
        title: "3. Çoklu Sütun (Multi-Column) Gazete Düzeni",
        content: `Uzun bir makaleyi div'lere bölmeden doğrudan gazete sütunları gibi akıtmak için:
\`\`\`css
.makale {
    column-count: 3;        /* 3 sütun yap */
    column-gap: 30px;       /* Sütunlar arası boşluk */
    column-rule: 1px solid #e2e8f0; /* Sütunlar arası dikey çizgi */
}
\`\`\``,
      },
    ],
    playground: {
      title: "Overflow ve Ellipsis Test Alanı",
      filename: "overflow.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { padding: 20px; font-family: sans-serif; }
    .kart {
      width: 240px;
      padding: 16px;
      background: #f1f5f9;
      border-radius: 8px;
    }
    .kisaltilmis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
      color: #0369a1;
    }
  </style>
</head>
<body>
  <div class="kart">
    <div class="kisaltilmis">Bu çok uzun bir başlık metnidir ve kutuya sığmaz.</div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[OVERFLOW] Metin taşması engellendi.",
        "[ELLIPSIS] Sonuna '...' üç nokta başarıyla eklendi.",
      ],
    },
    quiz: {
      question: "CSS'te bir metnin satır sonuna geldiğinde alt satıra inmesini engelleyip tek satırda kalmasını sağlayan kural hangisidir?",
      options: ["A) white-space: nowrap;", "B) overflow: hidden;", "C) text-wrap: none;", "D) display: inline;"],
      correctIndex: 0,
      explanation: "Doğru! 'white-space: nowrap' metnin otomatik alt satıra geçmesini engeller ve tek satır boyunca uzamasını sağlar.",
    },
  },

  // ========================================================
  // MODÜL 5: MODERN SAYFA DÜZENLERİ (FLEXBOX & GRID)
  // ========================================================
  "css-flexbox-deep": {
    id: "css-flexbox-deep",
    badge: "Modül 5 • Flexbox Düzeni",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Kapsamlı Flexbox: 1 Boyutlu Esnek Yerleşim (Flexbox Layout)",
    subtitle: "Tek eksende kusursuz hizalama: flex-direction, justify-content, align-items, flex-wrap ve esnek kartlar.",
    sections: [
      {
        title: "1. Flexbox Mimarisi ve İki Eksen Kuralı",
        content: `Flexbox, elemanları tek bir eksen boyunca (yatay veya dikey) yerleştiren modern yerleşim motorudur:
- **Ana Eksen (Main Axis):** \`flex-direction\` tarafından belirlenir (Varsayılan: \`row\` yani yatay).
- **Çapraz Eksen (Cross Axis):** Ana eksene dik olan eksendir (Varsayılan: dikey).`,
      },
      {
        title: "2. Ebeveyn (Flex Container) Özellikleri",
        content: `- \`display: flex\` : Flexbox bağlamını başlatır.
- \`justify-content\` : **Ana eksende** hizalama yapar (\`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`, \`space-evenly\`).
- \`align-items\` : **Çapraz eksende** hizalama yapar (\`stretch\`, \`center\`, \`flex-start\`, \`flex-end\`).
- \`flex-wrap: wrap\` : Sığmayan elemanların alt satıra geçmesini sağlar.
- \`gap: 20px\` : Elemanlar arasına temiz boşluk koyar (Margin yerine modern standart).`,
        code: {
          language: "css",
          caption: "navbar_flex.css - Profesyonel Flexbox Navigasyon Çubuğu",
          snippet: `.navbar {
    display: flex;
    justify-content: space-between; /* Logo solda, butonlar sağda */
    align-items: center;            /* Dikeyde tam ortalı */
    padding: 1rem 2rem;
    background: #0f172a;
    color: white;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 1.5rem; /* Menü elemanları arası mesafe */
}`,
        },
      },
      {
        title: "3. Çocuk (Flex Item) Özellikleri",
        content: `- \`flex-grow: 1\` : Boş kalan alanı dolduracak şekilde elemanı büyütür.
- \`flex-shrink: 0\` : Alan daralsa dahi elemanın büzülmesini/küçülmesini engeller.
- \`align-self\` : Tek bir elemanın ebeveynin \`align-items\` kuralını ezmesini sağlar.`,
      },
    ],
    playground: {
      title: "Flexbox Hizalama Laboratuvarı",
      filename: "flexbox.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; padding: 20px; }
    .flex-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 16px;
      border-radius: 12px;
      gap: 12px;
    }
    .flex-item {
      background: #38bdf8;
      color: #0f172a;
      padding: 14px 20px;
      border-radius: 8px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="flex-container">
    <div class="flex-item">1. Sol</div>
    <div class="flex-item">2. Orta</div>
    <div class="flex-item">3. Sağ</div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[FLEXBOX] display: flex konteyneri oluşturuldu.",
        "[ALIGN] justify-content: space-between ile iki uca dağıtıldı.",
      ],
    },
    quiz: {
      question: "Flexbox'ta varsayılan yatay dizilimde (flex-direction: row) elemanları dikeyde (çapraz eksende) ortalamak için hangi özellik kullanılır?",
      options: ["A) align-items: center;", "B) justify-content: center;", "C) vertical-align: middle;", "D) text-align: center;"],
      correctIndex: 0,
      explanation: "Doğru! 'align-items' çapraz eksendeki (dikeydeki) hizalamayı kontrol eder; 'justify-content' ise ana ekseni kontrol eder.",
    },
  },

  "css-grid": {
    id: "css-grid",
    badge: "Modül 5 • CSS Grid Mimarisi",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "2 Boyutlu Düzen: CSS Grid Mimarisi (Grid Layout)",
    subtitle: "Satır ve sütunları aynı anda yönetme: fr birimleri, repeat(), minmax(), grid-template-areas ve otomatik responsive kart ızgarası.",
    sections: [
      {
        title: "1. Flexbox vs CSS Grid Farkı",
        content: `- **Flexbox:** **1 Boyutludur.** Yalnızca bir satır VEYA bir sütun boyunca eleman dizer.
- **CSS Grid:** **2 Boyutludur.** Hem satırları (rows) hem de sütunları (columns) aynı anda koordine eder. Komple web sayfası iskeletleri ve fotoğraf galerileri için idealdir.`,
      },
      {
        title: "2. Kesirli Birim (fr) ve repeat()",
        content: `CSS Grid, kalan alanı orantılı paylaştıran **\`fr\` (fractional unit)** birimini getirmiştir:
\`\`\`css
.layout {
    display: grid;
    /* 3 eşit sütun: */
    grid-template-columns: 1fr 1fr 1fr;
    /* veya kısaca repeat() ile: */
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
\`\`\``,
      },
      {
        title: "3. Sihirli Kalıp: Medya Sorgusuz Responsive Kartlar",
        content: `Hiçbir \`@media\` sorgusu yazmadan ekran küçüldükçe sütunları otomatik alt satıra indiren meşhur Grid kalıbı:`,
        code: {
          language: "css",
          caption: "auto_responsive_grid.css",
          snippet: `.kart-izgarasi {
    display: grid;
    /* Kartlar minimum 280px olsun, sığdıkça esnek şekilde yan yana dizilsin: */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}`,
        },
      },
    ],
    playground: {
      title: "2 Boyutlu CSS Grid Dashboard Düzeni",
      filename: "grid.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f8fafc; padding: 20px; }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
    }
    .kart {
      background: white;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      text-align: center;
      font-weight: bold;
      color: #3b82f6;
    }
  </style>
</head>
<body>
  <div class="grid-container">
    <div class="kart">Kart 1</div>
    <div class="kart">Kart 2</div>
    <div class="kart">Kart 3</div>
    <div class="kart">Kart 4</div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[GRID] repeat(auto-fit, minmax(...)) ızgarası aktif.",
        "[RESPONSIVE] Ekran daraldıkça sütun sayısı otomatik uyarlanır.",
      ],
    },
    quiz: {
      question: "CSS Grid'de kalan boş alanın belirli bir oranını (kesrini) temsil eden esnek birim hangisidir?",
      options: ["A) fr (Fraction)", "B) em", "C) rem", "D) vh"],
      correctIndex: 0,
      explanation: "Doğru! 'fr' (Fractional Unit) Grid'deki kullanılabilir serbest alanın kesirli oranını temsil eder.",
    },
  },

  // ========================================================
  // MODÜL 6: RESPONSIVE WEB, ANİMASYONLAR & MODERN CSS
  // ========================================================
  "css-responsive": {
    id: "css-responsive",
    badge: "Modül 6 • Duyarlı Tasarım",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Duyarlı Web Tasarımı ve Medya Sorguları (Responsive Design & Media Queries)",
    subtitle: "Mobile-First felsefesi, standart breakpoint noktaları (@media min-width), viewport birimleri ve esnek medya.",
    sections: [
      {
        title: "1. Mobil Öncelikli (Mobile-First) Tasarım Yaklaşımı",
        content: `Web siteleri önce en dar ekranlı akıllı telefonlar için kodlanır. Ekran genişledikçe \`@media (min-width: ...)\` ile sütunlar ve fontlar artırılır:
- **Mobil:** 0px - 640px (Varsayılan taban stiller)
- **Tablet (\`sm\` / \`md\`):** \`@media (min-width: 768px)\`
- **Masaüstü (\`lg\` / \`xl\`):** \`@media (min-width: 1024px)\``,
        code: {
          language: "css",
          caption: "responsive_mobile_first.css",
          snippet: `/* 1. Mobil Taban (1 sütun) */
.sayfa-duzeni {
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

/* 2. Tablet ve Masaüstü (768px üzeri - 2 sütun) */
@media (min-width: 768px) {
    .sayfa-duzeni {
        flex-direction: row;
        gap: 2rem;
    }
    .yan-menu {
        width: 250px;
    }
    .icerik {
        flex-grow: 1;
    }
}`,
        },
      },
      {
        title: "2. Duyarlı Görseller (object-fit: cover)",
        content: `Resimlerin kutuyu bozmadan veya ezilip büzülmeden düzgün oturması için:
\`\`\`css
img.responsive {
    max-width: 100%;
    height: auto;
    object-fit: cover; /* En-boy oranını bozmaz */
}
\`\`\``,
      },
    ],
    playground: {
      title: "Medya Sorgusu (@media) Canlı Testi",
      filename: "responsive.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; transition: background 0.3s; }
    .durum {
      padding: 20px;
      border-radius: 12px;
      font-weight: bold;
      color: white;
      background: #ef4444; /* Mobil: Kırmızı */
    }
    @media (min-width: 600px) {
      .durum {
        background: #10b981; /* Geniş ekran: Yeşil */
      }
    }
  </style>
</head>
<body>
  <div class="durum">
    Pencere Genişliğini Değiştirin!
  </div>
</body>
</html>`,
      expectedOutput: [
        "[MEDIA] @media (min-width: 600px) kuralı yüklendi.",
        "[VIEWPORT] Ekran 600px üzerine çıktığında renk yeşile döner.",
      ],
    },
    quiz: {
      question: "Mobil cihazların web sayfasını doğru ölçekle ve 1:1 piksel oranında görüntülemesi için HTML <head> içine hangi meta etiketi eklenmelidir?",
      options: [
        "A) <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        "B) <meta name=\"screen\" content=\"mobile\">",
        "C) <meta name=\"responsive\" content=\"true\">",
        "D) <meta http-equiv=\"refresh\" content=\"30\">",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'viewport' meta etiketi mobil tarayıcılara sayfa genişliğini cihazın kendi fiziksel ekran genişliğine eşitlemesini söyler.",
    },
  },

  "css-animations": {
    id: "css-animations",
    badge: "Modül 6 • Animasyonlar & Efektler",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Geçişler, 2D/3D Dönüşümler ve Animasyonlar (Transitions, Transforms & Animations)",
    subtitle: "CSS transitions (geçişler), transform (rotate, scale, translate), 3D kart çevirme ve @keyframes ile GPU tabanlı 60 FPS animasyonlar.",
    sections: [
      {
        title: "1. Pürüzsüz Geçişler (Transitions)",
        content: `Bir özelliğin ani değil, zamana yayılarak yumuşakça değişmesini sağlar:
\`transition: [özellik] [süre] [zamanlama-fonksiyonu] [gecikme];\`
\`\`\`css
.btn {
    background: #3b82f6;
    transition: background 0.3s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
}
\`\`\``,
      },
      {
        title: "2. 2D ve 3D Dönüşümler (Transform)",
        content: `- \`translate(X, Y)\` : Elemanı kaydırır.
- \`scale(1.1)\` : Elemanı %10 büyütür.
- \`rotate(45deg)\` : 45 derece döndürür.
- \`perspective: 1000px\` ve \`rotateY(180deg)\` : 3D derinlik algısıyla kartı ters yüz eder (Flip Card).`,
      },
      {
        title: "3. @keyframes ile Sonsuz Animasyonlar",
        content: `Kullanıcı etkileşimi olmadan kendi kendine çalışan döngüsel animasyonlar \`@keyframes\` ile tanımlanır:`,
        code: {
          language: "css",
          caption: "spinner_animation.css - 60 FPS Dönen Yükleyici (Spinner)",
          snippet: `@keyframes dondur {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(59, 130, 246, 0.2);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: dondur 0.8s linear infinite;
}`,
        },
        callout: {
          type: "tip",
          title: "GPU Hızlandırma Altın Kuralı",
          message: "En akıcı 60 FPS performansı için animasyonlarda sadece 'transform' ve 'opacity' kullanın. 'top', 'left', 'width' gibi özellikleri anime etmek işlemciyi (CPU) yorar.",
        },
      },
    ],
    playground: {
      title: "CSS @keyframes Animasyon Laboratuvarı",
      filename: "animation.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { min-height: 100vh; display: grid; place-content: center; background: #0f172a; }
    @keyframes nabiz {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.15); opacity: 0.7; }
    }
    .parlayan-halka {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: radial-gradient(circle, #38bdf8, #0284c7);
      box-shadow: 0 0 25px #38bdf8;
      animation: nabiz 1.5s infinite ease-in-out;
    }
  </style>
</head>
<body>
  <div class="parlayan-halka"></div>
</body>
</html>`,
      expectedOutput: [
        "[ANIMATION] @keyframes nabiz derlendi.",
        "[PERFORMANCE] transform scale ve opacity GPU üzerinde koşuyor.",
      ],
    },
    quiz: {
      question: "CSS'te bir animasyonun durmadan sonsuza kadar tekrarlanmasını sağlamak için 'animation-iteration-count' özelliğine hangi değer verilir?",
      options: ["A) loop", "B) infinite", "C) always", "D) 100%"],
      correctIndex: 1,
      explanation: "Doğru! 'animation-iteration-count: infinite' animasyonun sınırsız bir döngüde sürekli tekrar etmesini sağlar.",
    },
  },

  "css-variables-math": {
    id: "css-variables-math",
    badge: "Modül 6 • Modern CSS & Fonksiyonlar",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "CSS Değişkenleri ve Matematik Fonksiyonları (Variables & Math Functions)",
    subtitle: "Özel özellikler (:root { --primary }), calc() dinamik hesaplamaları, min(), max() ve karanlık mod (Dark Mode) temalama.",
    sections: [
      {
        title: "1. CSS Değişkenleri (Custom Properties)",
        content: `CSS değişkenleri \`--\` ön ekiyle tanımlanır ve \`var(--degisken-adi, yedek)\` ile çağrılır. En üst düzey kök eleman olan **\`:root\`** içinde tanımlandığında tüm sayfadan erişilebilir:
\`\`\`css
:root {
    --ana-renk: #3b82f6;
    --arkaplan: #ffffff;
    --kart-radius: 12px;
}

/* Karanlık Mod Override: */
@media (prefers-color-scheme: dark) {
    :root {
        --arkaplan: #0f172a;
    }
}
\`\`\``,
      },
      {
        title: "2. calc() Matematiksel Hesaplama Fonksiyonu",
        content: `Farklı birimleri (örneğin yüzde ile pikseli) çalışma anında dinamik olarak birbirine ekleyip çıkarmayı sağlar:
\`\`\`css
.kenar-cubugu-icerik {
    /* Ekranın tam yüksekliğinden 80px'lik üst navbar'ı çıkar: */
    height: calc(100vh - 80px);
    width: calc(100% - 30px);
}
\`\`\`
**Dikkat:** \`+\` ve \`-\` işaretlerinin iki yanında mutlaka birer boşluk bırakılmalıdır (\`calc(100% - 20px)\`).`,
      },
      {
        title: "3. min() ve max() Fonksiyonları",
        content: `- \`width: min(500px, 90vw);\` : 500px ile ekranın %90'ından hangisi daha küçükse onu seçer (Kutunun mobilde taşmasını önler).
- \`font-size: max(16px, 1.2vw);\` : Yazı boyutunun asla 16px'in altına düşmemesini garanti eder.`,
      },
    ],
    playground: {
      title: "CSS Değişkenleri ile Dinamik Tema",
      filename: "variables.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    :root {
      --primary: #8b5cf6;
      --bg: #1e1b4b;
      --text: #ffffff;
    }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: sans-serif;
      padding: 30px;
      display: grid;
      place-content: center;
    }
    .tema-kutu {
      width: min(300px, 90vw);
      height: calc(150px + 20px);
      border: 2px solid var(--primary);
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    }
  </style>
</head>
<body>
  <div class="tema-kutu">
    var(--primary) Teması
  </div>
</body>
</html>`,
      expectedOutput: [
        "[VARIABLES] :root değişkenleri uygulandı.",
        "[MATH] width: min(...) ve height: calc(...) başarıyla hesaplandı.",
      ],
    },
    quiz: {
      question: "CSS'te bir değişkene ':root' içinde değer atandıktan sonra bu değişkenin değerini çağırmak için hangi fonksiyon kullanılır?",
      options: ["A) var(--degisken)", "B) get(--degisken)", "C) $degisken", "D) const(--degisken)"],
      correctIndex: 0,
      explanation: "Doğru! 'var(--degisken-adi)' fonksiyonu CSS özel değişkeninin değerini okumak için kullanılır.",
    },
  },
};
