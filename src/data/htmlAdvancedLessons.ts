import { LessonContent } from "./lessonsData";

export const HTML_ADVANCED_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // 12. FORM DOĞRULAMA (VALIDATION) & DESENLER
  // ========================================================
  "html-form-validation": {
    id: "html-form-validation",
    badge: "Modül 4 • Formlar & Doğrulama",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "HTML5 Form Doğrulama (Validation) & Güvenlik",
    subtitle: "required, pattern (RegEx), min/max, maxlength, novalidate nitelikleri ve tarayıcı yerel balon hata uyarıları.",
    sections: [
      {
        title: "1. Tarayıcı Yerel Form Doğrulaması (Client-side Validation)",
        content: `HTML5 öncesinde basit bir boş alan kontrolü veya e-posta doğrulaması için bile onlarca satır JavaScript kodu yazmak gerekiyordu. Modern HTML5, tarayıcının çekirdeğinde çalışan yerleşik doğrulama nitelikleri sunar:
- **\`required\`**: Alanın boş bırakılmasını engeller; form gönderilmeden önce tarayıcı otomatik uyarı balonu çıkarır.
- **\`minlength\` / \`maxlength\`**: Girilebilecek minimum ve maksimum karakter sayısını sınırlar.
- **\`min\` / \`max\` / \`step\`**: Sayı veya tarih alanları için alt/üst limitleri ve artış adımlarını belirler.`,
      },
      {
        title: "2. Düzenli İfadelerle Desen Eşleme: pattern Özelliği",
        content: `Özel veri formatları (ör. T.C. Kimlik No, telefon numarası veya güçlü şifre) için **\`pattern\`** niteliğine bir Düzenli İfade (RegEx) yazılır:
- \`pattern="[0-9]{11}"\`: Yalnızca 11 haneli rakam kabul eder.
- \`pattern="[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}"\`: E-posta formatını zorunlu kılar.
- **\`title\` niteliği**: Kullanıcı hatalı format girdiğinde tarayıcının göstereceği açıklayıcı ipucunu belirler.`,
        code: {
          language: "html",
          caption: "form-validation.html",
          snippet: `<form action="/kayit" method="POST">
  <label for="tel">Telefon Numarası (05XX-XXX-XXXX):</label>
  <input 
    type="tel" 
    id="tel" 
    name="telefon" 
    pattern="05[0-9]{2}-[0-9]{3}-[0-9]{4}" 
    placeholder="0532-123-4567" 
    required 
    title="Lütfen 05XX-XXX-XXXX formatında giriniz."
  >
  <button type="submit">Gönder</button>
</form>`,
        },
      },
    ],
    playground: {
      title: "Canlı HTML5 Form Doğrulama ve Desen Testi",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .form-box { max-width: 420px; background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; }
    .group { margin-bottom: 14px; }
    label { display: block; font-size: 13px; margin-bottom: 5px; color: #94a3b8; }
    input { width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #475569; color: white; padding: 10px; border-radius: 6px; font-size: 14px; }
    input:invalid { border-color: #f43f5e; }
    input:valid { border-color: #10b981; }
    button { width: 100%; background: #3b82f6; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px; }
    button:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="form-box">
    <h3 style="margin-top:0">🛡️ Güvenli Kayıt Formu</h3>
    <form onsubmit="event.preventDefault(); alert('Form doğrulandı ve başarıyla gönderildi!');">
      <div class="group">
        <label for="tc">T.C. Kimlik No (11 Rakam):</label>
        <input type="text" id="tc" pattern="[0-9]{11}" maxlength="11" required placeholder="12345678901" title="11 haneli rakam giriniz" />
      </div>
      <div class="group">
        <label for="sifre">Güçlü Şifre (En az 8 karakter, 1 rakam):</label>
        <input type="password" id="sifre" minlength="8" pattern="(?=.*\\d).{8,}" required placeholder="••••••••" title="En az 8 karakter ve en az bir rakam içermelidir" />
      </div>
      <div class="group">
        <label for="yas">Yaş (18 - 99):</label>
        <input type="number" id="yas" min="18" max="99" required placeholder="25" />
      </div>
      <button type="submit">Doğrula ve Gönder</button>
    </form>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[VALIDATION] required ve pattern kuralına uymayan girişler kırmızı ile işaretlendi.",
        "[SUBMIT] Doğrulama başarılı olunca submit olayı tetiklendi.",
      ],
    },
    quiz: {
      question: "Bir input alanına yalnızca 11 haneli rakam girilmesini zorunlu kılmak için hangi HTML5 niteliği ve RegEx deseni kullanılır?",
      options: [
        "A) pattern='[0-9]{11}'",
        "B) regex='11-digits'",
        "C) validate='numeric:11'",
        "D) format='number(11)'",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'pattern' niteliği içine yazılan '[0-9]{11}' düzenli ifadesi, alanın yalnızca 11 adet rakamdan oluşmasını zorunlu kılar.",
    },
  },

  // ========================================================
  // 13. SEMANTİK WEB & SAYFA BÖLÜMLERİ
  // ========================================================
  "html-semantics": {
    id: "html-semantics",
    badge: "Modül 5 • Semantik Web & Erişilebilirlik",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Semantik HTML5: header, nav, main, article, section, footer",
    subtitle: "Neden anlamsız <div> çorbası yerine semantik etiketler? SEO, ekran okuyucular ve temiz kod mimarisi.",
    sections: [
      {
        title: "1. Semantik (Anlamsal) Etiket Nedir?",
        content: `Semantik bir etiket, hem tarayıcıya hem de geliştiriciye o içeriğin **ne anlama geldiğini** açıkça ifade eder. Örneğin \`<div>\` ve \`<span>\` hiçbir anlamsal bilgi taşımazken; \`<article>\`, \`<nav>\` veya \`<footer>\` etiketi içeriğin rolünü doğrudan belirtir.

**Semantik Etiketlerin Faydaları:**
- **Üstün SEO (Arama Motoru Sıralaması):** Google botları sayfanın ana içeriğini (\`<main>\`), başlık alanını (\`<header>\`) ve yazar bilgisini anında anlar.
- **Ekran Okuyucu Desteği:** Görme engelli kullanıcılar klavyeleriyle doğrudan \`<nav>\` menüsüne veya \`<main>\` içeriğe atlayabilir.
- **Bakım Kolaylığı:** Kod okunabilirliği ve ekip içi standardizasyon artar.`,
      },
      {
        title: "2. Temel Semantik HTML5 Yerleşim Elemanları",
        content: `- **\`<header>\`**: Sayfa veya makale başlık alanı, logo ve arama kutusu.
- **\`<nav>\`**: Sayfalar arası gezinme bağlantılarını içeren menü bölümü.
- **\`<main>\`**: Sayfanın asıl ve benzersiz ana içeriği (her sayfada yalnızca 1 adet bulunmalıdır!).
- **\`<article>\`**: Bağımsız, kendi başına anlamlı ve dağıtılabilir içerik (blog yazısı, forum mesajı, haber).
- **\`<section>\`**: Bir konu etrafında toplanmış tematik alt bölüm (genellikle kendi \`<h2>\` başlığı olur).
- **\`<aside>\`**: Ana içerikle dolaylı ilişkili kenar çubuğu (sidebar, reklam, ilgili yazılar).
- **\`<footer>\`**: Telif hakkı, iletişim bilgileri, yasal uyarılar ve sosyal medya linkleri.`,
      },
    ],
    playground: {
      title: "Tam Teşekküllü Semantik Web Sayfası Düzeni",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #0f172a; color: white; }
    header { background: #1e293b; padding: 15px 20px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: #38bdf8; text-decoration: none; margin-left: 15px; font-size: 14px; }
    main { max-width: 800px; margin: 20px auto; padding: 0 15px; }
    article { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 20px; }
    figure { margin: 15px 0; background: #020617; padding: 10px; border-radius: 6px; }
    figcaption { font-size: 12px; color: #94a3b8; text-align: center; margin-top: 6px; }
    footer { background: #020617; text-align: center; padding: 15px; font-size: 13px; color: #64748b; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <header>
    <div style="font-weight:bold; font-size:18px; color:#38bdf8">Teknoloji Dünyası</div>
    <nav>
      <a href="#haberler">Haberler</a>
      <a href="#yazilim">Yazılım</a>
      <a href="#iletisim">İletişim</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Yarı İletken Sektöründe 2nm Çip Devrimi</h2>
      <p style="color:#94a3b8; font-size:13px">Yayınlanma: <time datetime="2026-10-10">10 Ekim 2026</time> | Yazar: Emre Kaya</p>
      <p>Yeni nesil litografi teknolojileri sayesinde transistör yoğunluğu iki katına çıkarken güç tüketimi %30 azaldı.</p>
      
      <figure>
        <div style="background:#334155; height:120px; display:flex; align-items:center; justify-content:center; border-radius:4px">
          [Silikon Wafer Mikroskop Görseli]
        </div>
        <figcaption>Şekil 1: Yeni nesil GAAFET transistör mimarisi.</figcaption>
      </figure>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 Teknoloji Dünyası • Tüm hakları saklıdır.</p>
  </footer>
</body>
</html>`,
      expectedOutput: [
        "[SEMANTICS] header, nav, main, article, figure ve footer doğru hiyerarşide render edildi.",
        "[A11Y] time ve figcaption ile zengin anlamsal meta veri sağlandı.",
      ],
    },
    quiz: {
      question: "Bir web sayfasında bağımsız, kendi başına anlam ifade eden ve başka bir sitede yayınlanabilecek bir içeriği (ör. blog yazısı) sarmalamak için hangi etiket tercih edilmelidir?",
      options: ["A) <section>", "B) <article>", "C) <aside>", "D) <div>"],
      correctIndex: 1,
      explanation: "Doğru! '<article>' etiketi kendi başına bağımsız ve yeniden dağıtılabilir içeriği temsil eder. '<section>' ise genellikle aynı konu etrafındaki bölümleri gruplamak içindir.",
    },
  },

  // ========================================================
  // 14. ERİŞİLEBİLİRLİK (A11Y) & ARIA STANDARTLARI
  // ========================================================
  "html-accessibility": {
    id: "html-accessibility",
    badge: "Modül 5 • Semantik Web & Erişilebilirlik",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Web Erişilebilirliği (A11y) ve ARIA Standartları",
    subtitle: "WCAG prensipleri, aria-label, aria-hidden, role atamaları ve ekran okuyucu uyumluluğu.",
    sections: [
      {
        title: "1. Web Erişilebilirliği (A11y) Nedir?",
        content: `Web erişilebilirliği (Accessibility - kısaca **A11y**), engelli bireyler (görme, işitme, motor veya bilişsel kısıtlılıklar) dahil herkesin web sitelerini sorunsuz kullanabilmesini sağlama sanatıdır. Dünya genelinde kabul gören kurallar bütününe **WCAG (Web Content Accessibility Guidelines)** denir.`,
      },
      {
        title: "2. WAI-ARIA (Accessible Rich Internet Applications)",
        content: `Standart HTML etiketlerinin yetersiz kaldığı karmaşık dinamik arayüzlerde (ör. özel akordeonlar, modal pencereler veya ikon butonlar) tarayıcıya ek anlamsal ipucu vermek için ARIA nitelikleri kullanılır:
- **\`aria-label\`**: Ekranda görünür metin olmayan (yalnızca simge içeren) butonlara ekran okuyucunun seslendireceği metin verir (\`<button aria-label="Aramayı Kapat">✕</button>\`).
- **\`aria-hidden="true"\`**: Görsel süslemeleri veya dekoratif ikonları ekran okuyuculardan gizler.
- **\`role\`**: Elemanın davranışsal rolünü açıklar (\`role="alert"\`, \`role="dialog"\`).
- **\`tabindex="0"\`**: Bir elemanı klavye ile odaklanabilir (Tab tuşuyla erişilebilir) hale getirir.`,
      },
    ],
    playground: {
      title: "Ekran Okuyucu Dostu Erişilebilir Buton ve Uyarı Paneli",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 450px; }
    .icon-btn { background: #334155; border: 1px solid #475569; color: white; width: 40px; height: 40px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; }
    .icon-btn:focus { outline: 2px solid #38bdf8; outline-offset: 2px; }
    .alert-box { background: #831843; border: 1px solid #f43f5e; color: #ffe4e6; padding: 12px; border-radius: 6px; margin-top: 15px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>♿ A11y Erişilebilirlik Paneli</h3>
    <p>Aşağıdaki ikon butonun içinde metin yoktur, ancak ekran okuyucular için <code>aria-label</code> eklenmiştir:</p>
    
    <div style="display:flex; gap:10px; align-items:center;">
      <button class="icon-btn" aria-label="Ayarlar Menüsünü Aç" title="Ayarlar">
        <span aria-hidden="true">⚙️</span>
      </button>
      <button class="icon-btn" aria-label="Kullanıcı Profilini Görüntüle" title="Profil">
        <span aria-hidden="true">👤</span>
      </button>
    </div>

    <!-- Dinamik Uyarı Bildirimi -->
    <div role="alert" class="alert-box" aria-live="assertive">
      <strong>⚠️ Önemli Bildirim:</strong> role="alert" sayesinde bu mesaj ekranda belirdiği anda ekran okuyucu kullanıcıya anında seslendirilir.
    </div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[A11Y] aria-label ile ikon butonlara görünmez ekran okuyucu başlığı eklendi.",
        "[ARIA] role='alert' canlı bildirim alanı oluşturuldu.",
      ],
    },
    quiz: {
      question: "Yalnızca bir simgeden (ikon) oluşan ve içinde görünür yazı bulunmayan bir butona ekran okuyucuların doğru seslendirme yapabilmesi için hangi nitelik eklenmelidir?",
      options: ["A) aria-label", "B) aria-hidden='true'", "C) tabindex='-1'", "D) alt='button'"],
      correctIndex: 0,
      explanation: "Doğru! 'aria-label' niteliği görsel olarak metin içermeyen buton veya linklere ekran okuyucunun okuyacağı bir etiket metni sağlar.",
    },
  },

  // ========================================================
  // 15. IFRAMES & SANDBOX GÜVENLİĞİ
  // ========================================================
  "html-iframes": {
    id: "html-iframes",
    badge: "Modül 6 • Gömülü İçerikler & Bileşenler",
    readingTime: "6 dk okuma",
    level: "Orta Seviye",
    title: "Iframes, Video/Harita Gömme ve Sandbox Güvenliği",
    subtitle: "<iframe> etiketi, loading='lazy', sandbox kısıtlamaları ve güvenli üçüncü parti içerik entegrasyonu.",
    sections: [
      {
        title: "1. Iframe (Satır İçi Çerçeve) Nedir?",
        content: `\`<iframe>\` (Inline Frame) etiketi, mevcut web sayfasının içine başka bir web sayfasını, YouTube videosunu veya haritayı gömmemizi (embed) sağlar.

**Temel Nitelikler:**
- \`src\`: Gömülecek sayfanın adresi.
- \`width\` / \`height\`: Boyutlar.
- \`loading="lazy"\`: Iframe ekrana yaklaşana kadar yüklemeyi geciktirerek sayfa açılış hızını artırır.
- \`title\`: Ekran okuyucuların iframe içeriğini anlaması için zorunlu erişilebilirlik açıklamasıdır.`,
      },
      {
        title: "2. Iframe Güvenliği: sandbox Niteliği",
        content: `Başka sitelerin içeriklerini sitenize gömerken kötü amaçlı yazılımlardan (XSS, pop-up istismarı, form hırsızlığı) korunmak için **\`sandbox\`** niteliği kullanılır.
Parametresiz \`sandbox\` yazılırsa iframe maksimum kısıtlamaya alınır (script çalıştırma, form gönderme, popup engellenir). İhtiyaç duyulan izinler tek tek verilir:
- \`allow-scripts\`: Iframe içinde JS çalışmasına izin verir.
- \`allow-same-origin\`: Iframe'in kendi çerezlerine/depolamasına erişmesine izin verir.
- \`allow-forms\`: Form göndermeye izin verir.`,
      },
    ],
    playground: {
      title: "Güvenli Iframe ve Gömülü İçerik Simülatörü",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; max-width: 600px; }
    iframe { width: 100%; height: 200px; border: 1px solid #475569; border-radius: 6px; background: white; }
  </style>
</head>
<body>
  <div class="card">
    <h3>🌐 HTML5 Iframe ve Sandbox</h3>
    <p>Aşağıda sandbox ile izole edilmiş bir satır içi döküman gömülmüştür:</p>
    
    <iframe 
      title="Örnek Gömülü Belge" 
      srcdoc="<h2 style='font-family:sans-serif;color:#0284c7'>Iframe İçeriği</h2><p>Bu alan ana sayfadan tamamen izole edilmiş bağımsız bir ortamdır.</p>" 
      sandbox="allow-scripts"
      loading="lazy"
    ></iframe>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[IFRAME] srcdoc ile güvenli izole iframe başarıyla yüklendi.",
        "[SECURITY] sandbox='allow-scripts' kısıtlama profili uygulandı.",
      ],
    },
    quiz: {
      question: "Bir iframe içindeki üçüncü parti içeriğin ana sayfada yetkisiz komut çalıştırmasını ve form hırsızlığı yapmasını engellemek için hangi güvenlik niteliği kullanılır?",
      options: ["A) sandbox", "B) secure='true'", "C) protect", "D) cross-origin='strict'"],
      correctIndex: 0,
      explanation: "Doğru! 'sandbox' niteliği iframe'i katı bir güvenlik kum havuzuna (sandbox) alarak script yürütme, popup açma ve form gönderme gibi tehlikeli eylemleri kısıtlar.",
    },
  },

  // ========================================================
  // 16. ETKİLEŞİMLİ ELEMANLAR: DETAILS, DIALOG & TEMPLATE
  // ========================================================
  "html-interactive": {
    id: "html-interactive",
    badge: "Modül 6 • Gömülü İçerikler & Bileşenler",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Etkileşimli HTML5: details, summary, dialog & template",
    subtitle: "JavaScript yazmadan yerel akordeon (details/summary), tarayıcı modal penceresi (dialog) ve web bileşeni şablonları (template).",
    sections: [
      {
        title: "1. Sıfır JavaScript ile Akordeon: <details> ve <summary>",
        content: `Sıkça Sorulan Sorular (SSS) veya gizlenebilir paneller için JavaScript ile display: none/block toggle yazmaya gerek yoktur.
\`<details>\` ve içine yazılan \`<summary>\` etiketi, tarayıcıda yerel olarak açılıp kapanabilen interaktif bir akordeon oluşturur:
\`open\` niteliği verilirse varsayılan olarak açık başlar.`,
      },
      {
        title: "2. Yerel Modal Penceresi: <dialog>",
        content: `Eski web sitelerinde modal açmak için karmaşık z-index ve backdrop katmanları gerekirdi. Modern HTML5'in **\`<dialog>\`** etiketi tarayıcının yerel modal motorunu kullanır:
- \`dialogEl.showModal()\`: Sayfayı arka planda karartan ve odaklanmayı içine hapseden erişilebilir modal açar.
- \`dialogEl.close()\`: Modalı kapatır.
- \`::backdrop\` CSS sahte elemanı ile arka plan karartması kolayca stillendirilir.`,
      },
      {
        title: "3. Yeniden Kullanılabilir Şablonlar: <template>",
        content: `\`<template>\` etiketi içindeki HTML kodları sayfa ilk yüklendiğinde EKRANDA GÖRÜNMEZ. JavaScript ile klonlanıp (\`cloneNode\`) dinamik olarak sayfaya eklenmek üzere bekleyen şablonlardır.`,
      },
    ],
    playground: {
      title: "Yerel Akordeon ve Dialog Modal Laboratuvarı",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 500px; }
    details { background: #0f172a; border: 1px solid #334155; padding: 10px 14px; border-radius: 6px; margin-bottom: 10px; }
    summary { font-weight: bold; cursor: pointer; color: #38bdf8; }
    details[open] { border-color: #38bdf8; }
    dialog { background: #1e293b; color: white; border: 1px solid #475569; border-radius: 8px; padding: 20px; max-width: 400px; }
    dialog::backdrop { background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(2px); }
    button { background: #10b981; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h3>✨ Etkileşimli HTML5 Elemanları</h3>
    
    <!-- details & summary -->
    <details>
      <summary>HTML5 Neden Semantiktir?</summary>
      <p style="font-size:14px; color:#cbd5e1; margin-top:8px">Çünkü her etiket içeriğin amacını tarayıcıya, arama motorlarına ve ekran okuyuculara açıkça bildirir.</p>
    </details>
    
    <details>
      <summary>&lt;dialog&gt; Ne İşe Yarar?</summary>
      <p style="font-size:14px; color:#cbd5e1; margin-top:8px">Harici kütüphanelere gerek kalmadan erişilebilir modal pencereler açmayı sağlar.</p>
    </details>

    <br/>
    <button onclick="document.getElementById('modalim').showModal()">Yerel Modalı Aç (&lt;dialog&gt;)</button>

    <dialog id="modalim">
      <h3 style="margin-top:0">🎉 Yerel HTML5 Dialog Penceresi</h3>
      <p style="font-size:14px; color:#cbd5e1">Bu modal hiçbir harici JS kütüphanesi olmadan yerel HTML5 ile açıldı.</p>
      <button onclick="document.getElementById('modalim').close()" style="background:#ef4444">Kapat</button>
    </dialog>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[DETAILS] details ve summary ile sıfır JS akordeon çalıştı.",
        "[DIALOG] showModal() ile yerel dialog ve backdrop render edildi.",
      ],
    },
    quiz: {
      question: "JavaScript kullanmadan açılıp kapanabilen yerel bir akordeon (detay paneli) oluşturmak için hangi etiket ikilisi kullanılır?",
      options: [
        "A) <details> ve <summary>",
        "B) <accordion> ve <panel>",
        "C) <collapse> ve <trigger>",
        "D) <toggle> ve <content>",
      ],
      correctIndex: 0,
      explanation: "Doğru! '<details>' kapsayıcısı ve başlık görevi gören '<summary>' etiketi, hiçbir JS kodu gerekmeden tarayıcıda yerel açılır-kapanır paneller oluşturur.",
    },
  },

  // ========================================================
  // 17. SVG VEKTÖREL GRAFİKLER
  // ========================================================
  "html-svg": {
    id: "html-svg",
    badge: "Modül 7 • HTML Grafikleri",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "SVG Vektörel Grafikler (Scalable Vector Graphics)",
    subtitle: "<svg>, <circle>, <rect>, <path>, <polygon> etiketleri, CSS stillendirmesi ve çözünürlükten bağımsız grafikler.",
    sections: [
      {
        title: "1. SVG (Ölçeklenebilir Vektör Grafiği) Nedir?",
        content: `**SVG (Scalable Vector Graphics)**, 2 boyutlu grafikleri XML/HTML formatında matematiksel koordinatlarla tanımlayan bir standarttır.
- **Piksel Bağımsız (Vektörel):** 4K veya Retina ekranda ne kadar büyütülürse büyütülsün pikselleşme veya bulanıklık oluşmaz, her zaman kristal netliğindedir.
- **DOM Erişilebilir:** Her bir SVG şekli bir HTML elemanıdır; CSS ile rengi değiştirilebilir, JavaScript ile tıklanabilir veya animasyon verilebilir!`,
      },
      {
        title: "2. Temel SVG Şekil Etiketleri",
        content: `- **\`<rect x="10" y="10" width="100" height="50" rx="5" />\`**: Dikdörtgen (rx köşe yuvarlatır).
- **\`<circle cx="50" cy="50" r="40" />\`**: Merkez koordinatları cx/cy ve yarıçapı r olan daire.
- **\`<line x1="0" y1="0" x2="200" y2="200" />\`**: Çizgi.
- **\`<path d="M 10 80 Q 95 10 180 80" />\`**: Her türlü karmaşık eğri ve ikon tasarımını oluşturan yol (path).
- **Stil Nitelikleri**: \`fill\` (dolgu rengi), \`stroke\` (kenarlık rengi), \`stroke-width\` (kenarlık kalınlığı).`,
      },
    ],
    playground: {
      title: "İnteraktif SVG İkon ve Grafik Tasarım Atölyesi",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 500px; text-align: center; }
    svg { background: #020617; border-radius: 8px; border: 1px solid #334155; }
    .pulsing-circle { transition: all 0.3s ease; }
    .pulsing-circle:hover { fill: #f43f5e; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h3>📐 Saf HTML & SVG Vektör Çizimi</h3>
    <p>Aşağıdaki SVG elemanının üzerine gelin (CSS ile renk değişir):</p>
    
    <svg width="300" height="150" viewBox="0 0 300 150">
      <!-- Arka plan ızgarası -->
      <line x1="0" y1="75" x2="300" y2="75" stroke="#1e293b" stroke-dasharray="5,5" />
      
      <!-- Dikdörtgen -->
      <rect x="20" y="30" width="80" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" stroke-width="2" />
      
      <!-- Etkileşimli Daire -->
      <circle class="pulsing-circle" cx="160" cy="70" r="35" fill="#10b981" stroke="#34d399" stroke-width="3" />
      
      <!-- Yıldız / Poligon -->
      <polygon points="250,25 260,55 290,55 265,75 275,105 250,85 225,105 235,75 210,55 240,55" fill="#f59e0b" />
    </svg>
    <div style="font-size:12px; color:#94a3b8; margin-top:8px">Mavi: Dikdörtgen | Yeşil: Daire (hover yapın) | Sarı: Poligon Yıldız</div>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[SVG] viewBox koordinat sistemiyle vektörel şekiller render edildi.",
        "[CSS] SVG elemanları CSS :hover ile stilize edildi.",
      ],
    },
    quiz: {
      question: "SVG grafikleri hakkında aşağıdakilerden hangisi DOĞRUDUR?",
      options: [
        "A) Büyütüldüklerinde pikselleşir ve çözünürlükleri bozulur",
        "B) XML/HTML tabanlı vektörel grafiklerdir; CSS ve DOM ile doğrudan kontrol edilebilirler",
        "C) Yalnızca siyah-beyaz çizimler yapabilirler",
        "D) Sadece harici .png dosyası olarak sayfaya eklenebilirler",
      ],
      correctIndex: 1,
      explanation: "Doğru! SVG matematiksel vektör formülleriyle tanımlandığı için çözünürlükten bağımsızdır, netliği asla bozulmaz ve her bir parçası DOM'da CSS/JS ile kontrol edilebilir.",
    },
  },

  // ========================================================
  // 18. HTML5 CANVAS TUVALİ
  // ========================================================
  "html-canvas": {
    id: "html-canvas",
    badge: "Modül 7 • HTML Grafikleri",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "HTML5 Canvas Grafik Tuvali",
    subtitle: "<canvas> etiketi, getContext('2d'), çizim yolları, renkler ve Canvas vs SVG karşılaştırması.",
    sections: [
      {
        title: "1. Canvas Nedir ve SVG'den Farkı Nedir?",
        content: `\`<canvas>\` etiketi, web sayfasında pikseller üzerinde doğrudan çizim yapabileceğimiz şeffaf bir çizim tuvalidir. SVG eleman bazlı vektör iken; Canvas **piksel tabanlı (raster)** bir çizim ortamıdır:

| Özellik | Canvas | SVG |
|---|---|---|
| **Teknoloji** | Piksel / Raster (JS ile çizilir) | Vektör / DOM Elemanları (XML) |
| **Performans** | Binlerce nesnede ve oyunlarda çok hızlı | Fazla nesnede DOM yavaşlar |
| **Yeniden Boyutlandırma** | Büyütülürse pikselleşebilir | Asla bozulmaz |
| **En İyi Kullanım** | Oyunlar, gerçek zamanlı grafik simülasyonları | İkonlar, logolar, haritalar, kullanıcı arayüzleri |`,
      },
      {
        title: "2. Canvas 2D Çizim Akışı",
        content: `\`<canvas>\` etiketinin kendisi yalnızca bir alandır; çizimi yapan JavaScript kodudur:
1. Tuval elemanı seçilir: \`const canvas = document.getElementById("tuval");\`
2. 2D çizim bağlamı alınır: \`const ctx = canvas.getContext("2d");\`
3. Çizim metotları uygulanır (\`fillRect\`, \`strokeRect\`, \`arc\`, vb.).`,
      },
    ],
    playground: {
      title: "Canvas 2D İnteraktif Çizim Konsolu",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; max-width: 450px; }
    canvas { background: #020617; border: 1px solid #475569; border-radius: 6px; display: block; margin: 10px 0; }
    button { background: #3b82f6; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 6px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>🎨 HTML5 Canvas Çizim Tuvali</h3>
    <canvas id="benimTuval" width="400" height="150"></canvas>
    <button onclick="cizSekiller()">Şekilleri Çiz</button>
    <button onclick="temizle()" style="background:#64748b">Temizle</button>
  </div>

  <script>
    function cizSekiller() {
      const c = document.getElementById('benimTuval');
      const ctx = c.getContext('2d');
      temizle();

      // Gradyan Arka Plan
      const grad = ctx.createLinearGradient(0, 0, 400, 0);
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);

      // Kırmızı Kutu
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(30, 30, 80, 80);

      // Mavi Daire
      ctx.beginPath();
      ctx.arc(200, 70, 40, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      // Sarı Çizgi
      ctx.beginPath();
      ctx.moveTo(280, 30);
      ctx.lineTo(370, 110);
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    function temizle() {
      const c = document.getElementById('benimTuval');
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, c.width, c.height);
    }
    cizSekiller();
  </script>
</body>
</html>`,
      expectedOutput: [
        "[CANVAS] getContext('2d') ile tuval bağlamı oluşturuldu.",
        "[RENDER] fillRect, arc ve stroke ile şekiller çizildi.",
      ],
    },
    quiz: {
      question: "HTML5 Canvas ve SVG arasındaki en temel fark nedir?",
      options: [
        "A) Canvas piksel (raster) tabanlıdır ve JS ile çizilir; SVG vektör tabanlıdır ve DOM elemanlarından oluşur",
        "B) Canvas yalnızca metin yazabilir, SVG yalnızca resim ekler",
        "C) Canvas CSS ile stillendirilir, SVG'de CSS çalışmaz",
        "D) SVG mobil tarayıcılarda çalışmaz",
      ],
      correctIndex: 0,
      explanation: "Doğru! Canvas piksel tabanlı bir tuval olup JavaScript ile çizilirken, SVG matematiksel vektör elemanlarından (DOM düğümlerinden) oluşur ve ölçeklendiğinde asla bozulmaz.",
    },
  },

  // ========================================================
  // 19. HTML VARLIKLARI (ENTITIES), SEMBOLLER & EMOJİLER
  // ========================================================
  "html-entities-symbols": {
    id: "html-entities-symbols",
    badge: "Modül 8 • İleri Seviye & Standartlar",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "HTML Varlıkları (Entities), Semboller ve Emojiler",
    subtitle: "Özel karakterler (&lt;, &gt;, &copy;, &nbsp;), matematiksel semboller ve UTF-8 emojiler.",
    sections: [
      {
        title: "1. HTML Varlığı (Entity) Nedir ve Neden Kullanılır?",
        content: `HTML'de bazı karakterler rezerve edilmiştir. Örneğin \`<\` işareti bir etiketin başlangıcı, \`>\` işareti ise bitişi olarak kabul edilir. Metin içinde doğrudan \`<\` yazarsanız tarayıcı bunu etiket sanabilir ve sayfanız bozulabilir!

Bu karakterleri güvenle ekrana yazdırmak için **HTML Varlıkları (Entities)** kullanılır. Varlıklar \`&\` ile başlar ve \`;\` ile biter:
- **\`&lt;\`** (less than): \`<\` işareti
- **\`&gt;\`** (greater than): \`>\` işareti
- **\`&amp;\`** (ampersand): \`&\` işareti
- **\`&quot;\`**: \`"\` çift tırnak
- **\`&apos;\`**: \`'\` tek tırnak
- **\`&copy;\`**: \`©\` telif hakkı simgesi
- **\`&euro;\`**: \`€\` Euro simgesi
- **\`&nbsp;\`** (non-breaking space): Kırılmaz boşluk (tarayıcının kelimeleri satır sonuna bölmesini engeller).`,
      },
      {
        title: "2. UTF-8 ve Emojiler",
        content: `HTML5 belgenizin \`<head>\` kısmında \`<meta charset="UTF-8">\` tanımlı olduğu sürece dünyanın tüm dillerindeki karakterleri ve binlerce modern emojiyi (🚀, 💡, 🛡️, ⚙️) doğrudan metin gibi kullanabilirsiniz!`,
      },
    ],
    playground: {
      title: "Canlı HTML Entities & Semboller Tablosu",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 500px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
    th, td { border: 1px solid #334155; padding: 8px 12px; text-align: left; }
    th { background: #020617; color: #38bdf8; }
    code { color: #f43f5e; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <h3>🔤 HTML Entities ve Özel Semboller</h3>
    <table>
      <thead>
        <tr><th>Görünüm</th><th>Entity İsmi</th><th>Açıklama</th></tr>
      </thead>
      <tbody>
        <tr><td>&lt;</td><td><code>&amp;lt;</code></td><td>Küçüktür (&lt;)</td></tr>
        <tr><td>&gt;</td><td><code>&amp;gt;</code></td><td>Büyüktür (&gt;)</td></tr>
        <tr><td>&amp;</td><td><code>&amp;amp;</code></td><td>Ve İşareti (&amp;)</td></tr>
        <tr><td>&copy;</td><td><code>&amp;copy;</code></td><td>Telif Hakkı (&copy;)</td></tr>
        <tr><td>&euro;</td><td><code>&amp;euro;</code></td><td>Euro Para Birimi (&euro;)</td></tr>
        <tr><td>&#9829;</td><td><code>&amp;hearts;</code></td><td>Kupa Kalp (♥)</td></tr>
        <tr><td>🚀 🔥</td><td>UTF-8 Doğrudan</td><td>Modern Emojiler</td></tr>
      </tbody>
    </table>
    <p style="margin-top:15px; font-size:13px; color:#94a3b8">
      Örnek: Kod bloğu yazarken <code>&lt;div&gt;</code> şeklinde yazmalısınız!
    </p>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[ENTITIES] Rezerve karakterler entity kodlarıyla ekrana basıldı.",
        "[UTF-8] Emojiler ve semboller eksiksiz görüntülendi.",
      ],
    },
    quiz: {
      question: "HTML metni içinde '<' (küçüktür) karakterini tarayıcının etiket sanmasını engellemek için hangi HTML entity kodu yazılmalıdır?",
      options: ["A) &lt;", "B) &gt;", "C) &less;", "D) &tag;"],
      correctIndex: 0,
      explanation: "Doğru! '&lt;' (less than) entity'si, tarayıcıya '<' karakterini bir HTML etiketi başlatmak yerine doğrudan metin karakteri olarak görüntülemesini bildirir.",
    },
  },

  // ========================================================
  // 20. DRAG AND DROP (SÜRÜKLE VE BIRAK) API'Sİ
  // ========================================================
  "html-drag-drop": {
    id: "html-drag-drop",
    badge: "Modül 8 • İleri Seviye & Standartlar",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "HTML5 Sürükle ve Bırak API'si (Drag and Drop)",
    subtitle: "draggable='true', ondragstart, ondragover, ondrop ve e.dataTransfer ile Trello tarzı Kanban panoları.",
    sections: [
      {
        title: "1. Yerel Sürükle ve Bırak (Drag and Drop) Mantığı",
        content: `HTML5, harici JavaScript kütüphanelerine ihtiyaç duymadan yerleşik sürükle-bırak desteği sunar.
Herhangi bir elemanı sürüklenebilir yapmak için **\`draggable="true"\`** niteliği verilir (resimler ve linkler varsayılan olarak sürüklenebilirdir).`,
      },
      {
        title: "2. Sürükle-Bırak Olayları ve dataTransfer",
        content: `Bir sürükle-bırak döngüsü 3 temel aşamadan oluşur:
1. **\`dragstart\`**: Kullanıcı elemanı sürüklemeye başladığında tetiklenir. Taşınacak veri \`e.dataTransfer.setData("text/plain", id)\` ile kaydedilir.
2. **\`dragover\`**: Eleman bırakılacak alanın üzerindeyken tetiklenir. **ÇOK ÖNEMLİ:** Tarayıcının varsayılan olarak bırakmayı engellemesini aşmak için bu olayda mutlaka \`e.preventDefault()\` çağrılmalıdır!
3. **\`drop\`**: Eleman hedefin üzerine bırakıldığında tetiklenir. \`e.dataTransfer.getData()\` ile veri okunur ve eleman yeni yerine taşınır (\`appendChild\`).`,
      },
    ],
    playground: {
      title: "Mini Kanban Sürükle ve Bırak Panosu",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .board { display: flex; gap: 15px; }
    .col { flex: 1; background: #1e293b; padding: 15px; border-radius: 8px; border: 2px dashed #334155; min-height: 180px; }
    .col h4 { margin-top: 0; color: #38bdf8; }
    .card { background: #3b82f6; color: white; padding: 10px; border-radius: 6px; margin-bottom: 8px; cursor: grab; font-weight: bold; font-size: 13px; }
    .card:active { cursor: grabbing; opacity: 0.6; }
  </style>
</head>
<body>
  <h3>📋 HTML5 Sürükle ve Bırak Kanban Panosu</h3>
  <p>Kartları sütunlar arasında sürükleyip bırakabilirsiniz:</p>
  
  <div class="board">
    <div class="col" ondragover="event.preventDefault()" ondrop="drop(event, this)">
      <h4>Yapılacaklar</h4>
      <div id="kart1" class="card" draggable="true" ondragstart="drag(event)">1. UI Tasarımı Yap</div>
      <div id="kart2" class="card" draggable="true" ondragstart="drag(event)">2. API Entegrasyonu</div>
    </div>
    
    <div class="col" ondragover="event.preventDefault()" ondrop="drop(event, this)">
      <h4>Tamamlananlar</h4>
      <div id="kart3" class="card" draggable="true" ondragstart="drag(event)" style="background:#10b981">3. Proje Kurulumu</div>
    </div>
  </div>

  <script>
    function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }
    function drop(ev, hedefKolon) {
      ev.preventDefault();
      const id = ev.dataTransfer.getData("text");
      const kart = document.getElementById(id);
      if (kart) hedefKolon.appendChild(kart);
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[DRAG] draggable='true' kartlar dataTransfer ile taşındı.",
        "[DROP] ondragover preventDefault ve drop ile hedef kolona eklendi.",
      ],
    },
    quiz: {
      question: "Bir elemanın üzerine başka bir eleman bırakılabilmesi için 'dragover' olayında mutlaka hangi işlem yapılmalıdır?",
      options: [
        "A) e.preventDefault() çağrılmalıdır",
        "B) window.alert verilmelidir",
        "C) e.stopPropagation() çağrılmalıdır",
        "D) Hiçbir işlem yapılmasına gerek yoktur",
      ],
      correctIndex: 0,
      explanation: "Doğru! Tarayıcılar varsayılan olarak elemanların içine bırakma (drop) yapılmasını engeller. Bu varsayılan davranışı aşmak için 'dragover' olayında 'e.preventDefault()' çağrılmalıdır.",
    },
  },

  // ========================================================
  // 21. YEREL HTML5 WEB API'LERİ (GEOLOCATION & STORAGE)
  // ========================================================
  "html-web-apis": {
    id: "html-web-apis",
    badge: "Modül 8 • İleri Seviye & Standartlar",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Yerel HTML5 Web API'leri (Geolocation & Storage)",
    subtitle: "navigator.geolocation GPS koordinatları, localStorage ile otomatik form taslak kaydı.",
    sections: [
      {
        title: "1. HTML5 Geolocation API (Coğrafi Konum)",
        content: `HTML5 Geolocation API, kullanıcının izni dahilinde cihazın GPS, Wi-Fi veya IP tabanlı coğrafi konumunu (enlem ve boylam) almayı sağlar:
\`navigator.geolocation.getCurrentPosition(basarili, hata)\`
Güvenlik ve gizlilik nedeniyle Geolocation API yalnızca **HTTPS** bağlantılarında ve localhost üzerinde çalışır.`,
      },
      {
        title: "2. Form Taslaklarını Tarayıcıda Saklama (Web Storage)",
        content: `Kullanıcı uzun bir form doldururken tarayıcı yanlışlıkla kapandığında verilerin kaybolmaması için HTML form girdileri \`localStorage\` ile anlık olarak saklanabilir. Sayfa tekrar açıldığında son durum otomatik geri yüklenir.`,
      },
    ],
    playground: {
      title: "Canlı GPS Konum Alıcı ve Otomatik Kayıt Paneli",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; max-width: 450px; }
    button { background: #0284c7; color: white; border: none; padding: 10px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
    .out { background: #020617; padding: 12px; border-radius: 6px; font-family: monospace; color: #38bdf8; margin-top: 10px; font-size: 13px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <h3>📍 HTML5 Geolocation API</h3>
    <p>Tarayıcınızdan anlık GPS konum koordinatlarını sorgulayın:</p>
    <button onclick="konumAl()">Mevcut Konumumu Al</button>
    <div id="cikti" class="out">Konum bekleniyor...</div>
  </div>

  <script>
    function konumAl() {
      const out = document.getElementById('cikti');
      if (!navigator.geolocation) {
        out.innerText = "Hata: Tarayıcınız Geolocation API desteklemiyor.";
        return;
      }
      out.innerText = "İzin isteniyor ve GPS uyduları taranıyor...";
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          out.innerText = 
            "✅ Konum Başarıyla Alındı!\\n" +
            "Enlem (Latitude):  " + pos.coords.latitude.toFixed(6) + "\\n" +
            "Boylam (Longitude): " + pos.coords.longitude.toFixed(6) + "\\n" +
            "Hassasiyet:         ±" + pos.coords.accuracy.toFixed(1) + " metre";
        },
        (err) => {
          out.innerText = "❌ Konum Alınamadı: " + err.message;
        }
      );
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[GEOLOCATION] navigator.geolocation.getCurrentPosition çağrıldı.",
        "[COORDINATES] Enlem, boylam ve hassasiyet değerleri okundu.",
      ],
    },
    quiz: {
      question: "Kullanıcının mevcut coğrafi koordinatlarını (enlem/boylam) almak için hangi yerleşik HTML5 tarayıcı nesnesi kullanılır?",
      options: [
        "A) navigator.geolocation",
        "B) window.gps",
        "C) document.locationService",
        "D) screen.coordinates",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'navigator.geolocation' nesnesi ve onun 'getCurrentPosition()' fonksiyonu kullanıcının onay vermesi halinde cihazın GPS ve ağ tabanlı coğrafi koordinatlarını döndürür.",
    },
  },

  // ========================================================
  // 22. EN İYİ PRATİKLER, SEO & PERFORMANS
  // ========================================================
  "html-best-practices": {
    id: "html-best-practices",
    badge: "Modül 8 • İleri Seviye & Standartlar",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "HTML Stil Rehberi, SEO & Performans Optimizasyonu",
    subtitle: "W3C validasyonu, Core Web Vitals (CLS/LCP), görsel boyutlandırma ve rel='preload' kritik kaynak ön yüklemesi.",
    sections: [
      {
        title: "1. Temiz HTML Kodlama Standartları (W3C Standartları)",
        content: `- **Küçük Harf Kuralı:** Etiket ve nitelik adları her zaman küçük harfle yazılmalıdır (\`<section class="kart">\`, büyük harfli \`<SECTION CLASS="...">\` YAZILMAMALIDIR).
- **Tırnak İşaretleri:** Tüm nitelik değerleri çift tırnak içine alınmalıdır (\`src="resim.jpg"\`).
- **Kapanış Etiketleri:** Tüm etiketler kurallara uygun kapatılmalıdır; iç içe geçmiş etiketlerde hiyerarşi bozulmamalıdır.
- **Karakter Kodlaması:** Belgenin ilk satırlarında mutlaka \`<meta charset="UTF-8">\` tanımlanmalıdır.`,
      },
      {
        title: "2. Core Web Vitals ve Performans İpuçları",
        content: `- **CLS (Cumulative Layout Shift) Önleme:** Her \`<img>\` ve video etiketine mutlaka \`width\` ve \`height\` nitelikleri verilmelidir. Böylece resim yüklenene kadar tarayıcı sayfada yer ayırır ve sayfa aşağıya zıplamaz.
- **Kritik Kaynakları Ön Yükleme:** \`<link rel="preload" href="font.woff2" as="font">\` ile sayfa açılışını hızlandırmak.
- **Tembel Yükleme:** Ekran dışında kalan tüm görsellere \`loading="lazy"\` verilmelidir.`,
      },
    ],
    playground: {
      title: "Web Sitesi Sağlık ve CLS Önleme Denetleyicisi",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Performans Odaklı Temiz HTML Örneği</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 500px; }
    .badge-ok { background: #065f46; color: #6ee7b7; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    ul { padding-left: 20px; font-size: 14px; line-height: 1.8; }
  </style>
</head>
<body>
  <div class="card">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="margin:0">🚀 W3C & Web Vitals Kontrol Listesi</h3>
      <span class="badge-ok">100 / 100 SEO</span>
    </div>
    <ul>
      <li>✅ <code>&lt;!DOCTYPE html&gt;</code> ve <code>lang="tr"</code> tanımlı.</li>
      <li>✅ Viewport mobil uyumlu meta etiketi ekli.</li>
      <li>✅ Görsellerde <code>width</code>, <code>height</code> ve <code>alt</code> zorunlu tutuldu (CLS = 0).</li>
      <li>✅ Semantik <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code> hiyerarşisi uygulandı.</li>
      <li>✅ Ekran dışı görsellerde <code>loading="lazy"</code> kullanıldı.</li>
    </ul>
  </div>
</body>
</html>`,
      expectedOutput: [
        "[BEST PRACTICES] Temiz W3C uyumlu HTML5 dökümanı doğrulandı.",
        "[PERFORMANCE] CLS ve SEO standartları uygulandı.",
      ],
    },
    quiz: {
      question: "Web sayfalarında resimler yüklenirken sayfa düzeninin aşağı-yukarı kaymasını (Cumulative Layout Shift - CLS) önlemek için <img> etiketine hangi nitelikler mutlaka eklenmelidir?",
      options: [
        "A) width ve height nitelikleri",
        "B) draggable='false'",
        "C) position: absolute",
        "D) reload='never'",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'width' ve 'height' (veya CSS aspect-ratio) nitelikleri tarayıcıya resmin en-boy oranını bildirir. Böylece resim henüz inmemişken bile tarayıcı gereken boşluğu ayırır ve sayfa düzeni kaymaz.",
    },
  },
};
