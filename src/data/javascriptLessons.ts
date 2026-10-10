import { LessonContent } from "./lessonsData";

export const JAVASCRIPT_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // MODÜL 1: JAVASCRIPT TEMELLERİ & DEĞİŞKENLER
  // ========================================================
  "js-intro": {
    id: "js-intro",
    badge: "Modül 1 • JS Temelleri",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Modern JavaScript (ES6+) Giriş & Sözdizimi",
    subtitle: "Web'in programlama dili: JS motorları (V8), çıktı yöntemleri (console/innerHTML), let, const ve var karşılaştırması.",
    sections: [
      {
        title: "1. JavaScript Nedir ve Nerede Çalışır?",
        content: `HTML sayfanın iskeletini, CSS tasarımını oluştururken; **JavaScript (JS)** web sayfalarına canlılık, dinamik etkileşim ve mantıksal işlev kazandıran dünyanın en popüler programlama dilidir.

Tarayıcılar (Chrome, Firefox, Safari) JavaScript'i doğrudan çalıştıran gelişmiş derleyici motorlara (Google V8, SpiderMonkey, JavaScriptCore) sahiptir. Günümüzde Node.js ve Deno sayesinde JS yalnızca tarayıcılarda değil; sunucularda, gömülü cihazlarda ve masaüstü yazılımlarında da çalışır.`,
      },
      {
        title: "2. Ekrana Çıktı Verme Yöntemleri",
        content: `JavaScript ile veri görüntülemenin 4 temel yolu:
- \`console.log(veri)\`: Tarayıcının Geliştirici Araçları (F12) konsoluna hata ayıklama mesajı basar.
- \`document.getElementById("id").innerHTML = "..."\`: Bir HTML elemanının içeriğini canlı değiştirir.
- \`alert("mesaj")\`: Kullanıcının önüne modal uyarı kutusu açar.
- \`document.write()\`: Yalnızca test amaçlıdır; sayfa yüklendikten sonra çağrılırsa tüm sayfayı siler!`,
      },
      {
        title: "3. Değişken Tanımlama: var vs let vs const",
        content: `ES6 (2015) öncesinde yalnızca \`var\` vardı. Modern JavaScript'te \`var\` tamamen terk edilmiş, yerine \`let\` ve \`const\` getirilmiştir:

- **\`const\` (Sabit - Varsayılan Tercih):** Değeri bir kez atandıktan sonra yeniden atanamaz (\`reassignment\` yapılamaz). Blok kapsamlıdır (\`block scope\`).
- **\`let\` (Değişken):** Değeri sonradan değişebilen sayaç veya bayraklar için kullanılır. Blok kapsamlıdır.
- **\`var\` (Eski & Tehlikeli):** Fonksiyon kapsamlıdır; süslü parantezlerin (\`{}\`) dışına sızar ve Hoisting sebebiyle tanımsız (\`undefined\`) hatalarına yol açar.`,
        code: {
          language: "javascript",
          caption: "variables.js - let ve const Kapsam Kuralı",
          snippet: `const KULLANICI_ADI = "ayse_kaya";
// KULLANICI_ADI = "yeni_ad"; // HATA! TypeError: Assignment to constant variable.

let puan = 100;
puan += 25; // 125 (Başarılı)

{
    let gizliSayi = 42;
}
// console.log(gizliSayi); // HATA! ReferenceError: gizliSayi is not defined`,
        },
      },
    ],
    playground: {
      title: "JavaScript Canlı Konsol ve DOM Çıktısı",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    .kutu { background: #1e293b; padding: 20px; border-radius: 12px; max-width: 340px; }
    button { background: #38bdf8; border: none; padding: 10px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div class="kutu">
    <h3 id="mesaj">JavaScript Hazır</h3>
    <p>Tıklama sayacı: <span id="sayac">0</span></p>
    <button onclick="artir()">Puan Artır</button>
  </div>

  <script>
    let sayi = 0;
    function artir() {
      sayi++;
      document.getElementById("sayac").textContent = sayi;
      document.getElementById("mesaj").textContent = "Tıklandı! Puan: " + (sayi * 10);
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[JS:INIT] let sayi = 0 tanımlandı.",
        "[DOM:EVENT] Buton onclick olay dinleyicisi aktif.",
      ],
    },
    quiz: {
      question: "JavaScript ES6 ile gelen ve değeri bir kez atandıktan sonra yeniden atanamayan (reassignment engelli) blok kapsamlı değişken anahtar kelimesi hangisidir?",
      options: ["A) var", "B) let", "C) const", "D) static"],
      correctIndex: 2,
      explanation: "Doğru! 'const' anahtar kelimesi ile tanımlanan değişkenlerin değeri sabittir ve sonradan yeniden atama yapılamaz.",
    },
  },

  "js-data-types": {
    id: "js-data-types",
    badge: "Modül 1 • Tipler & Dizgiler",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Veri Tipleri, Tip Dönüşümleri ve Şablon Dizgileri (Data Types & Strings)",
    subtitle: "8 yerleşik veri tipi, typeof operatörü, katı eşitlik (=== vs ==) ve string manipülasyon metotları.",
    sections: [
      {
        title: "1. JavaScript'in 8 Temel Veri Tipi",
        content: `JavaScript dinamik tipli (dynamically typed) bir dildir; değişkenin tipi atanan değere göre otomatik belirlenir:
- **7 İlkel Tip (Primitives - Değere göre kopyalanır):**
  1. \`string\`: Metinler (\`"Merhaba"\`, \`'Dünya'\`, \`\`JS\`\`)
  2. \`number\`: Tamsayılar ve ondalıklılar (\`42\`, \`3.14\`)
  3. \`bigint\`: Çok büyük sayılar (\`9007199254740991n\`)
  4. \`boolean\`: Mantıksal (\`true\` veya \`false\`)
  5. \`undefined\`: Bildirilmiş ama değer atanmamış değişken
  6. \`null\`: Kasıtlı olarak boş bırakılmış değer
  7. \`symbol\`: Benzersiz kimlikler
- **1 Referans Tipi:**
  8. \`object\`: Nesneler, Diziler (\`Array\`), Tarihler (\`Date\`).`,
      },
      {
        title: "2. Katı Eşitlik (===) vs Gevşek Eşitlik (==)",
        content: `- \`==\` (Gevşek Eşitlik): Tipleri birbirine dönüştürmeye (Type Coercion) zorlar. Örn: \`5 == "5"\` $\\rightarrow$ \`true\`! Bu durum beklenmedik hatalara yol açar.
- \`===\` (Katı Eşitlik - Daima Kullanın): Hem değeri hem de tipi kontrol eder. Örn: \`5 === "5"\` $\\rightarrow$ \`false\` döner.`,
      },
      {
        title: "3. String Metotları ve Template Literals",
        content: `Metinler üzerinde en sık kullanılan metotlar:`,
        code: {
          language: "javascript",
          caption: "string_methods.js",
          snippet: `const baslik = "  Modern JavaScript Rehberi  ";

console.log(baslik.trim());              // "Modern JavaScript Rehberi" (Boşlukları kırpar)
console.log(baslik.toLowerCase());       // Küçük harfe çevirir
console.log(baslik.includes("Script"));  // true (İçeriyor mu?)
console.log(baslik.slice(2, 8));         // "Modern" (Belirli aralığı keser)
console.log(baslik.replace("Modern", "İleri")); // Değiştirir

// Şablon Dizgisi (Template Literals - Ters Tırnak):
const isim = "Deniz";
const ders = "SystemVerilog";
const mesaj = \`Sayın \${isim}, \${ders} eğitiminiz hazır!\`;
console.log(mesaj);`,
        },
      },
    ],
    playground: {
      title: "String Metotları ve Ters Tırnak Testi",
      filename: "strings.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #1e1e2e; color: #cdd6f4; }
    .sonuc { background: #11111b; padding: 15px; border-radius: 8px; border-left: 4px solid #a6e3a1; }
  </style>
</head>
<body>
  <h3>String Manipülasyon Çıktısı:</h3>
  <div id="log" class="sonuc"></div>

  <script>
    const email = "  Kullanici@Tncy.Dev  ";
    const temizEmail = email.trim().toLowerCase();
    const domain = temizEmail.split("@")[1];
    
    document.getElementById("log").innerHTML = 
      \`Orijinal: '\${email}'<br>\` +
      \`Temizlenmiş: '\${temizEmail}'<br>\` +
      \`Domain: <strong>\${domain}</strong>\`;
  </script>
</body>
</html>`,
      expectedOutput: [
        "[STRING] trim() ve toLowerCase() çalıştı.",
        "[TEMPLATE] Template literals değişkenleri ayrıştırdı.",
      ],
    },
    quiz: {
      question: "JavaScript'te 'typeof null' ifadesinin sonucu nedir ve bu durumun sebebi nedir?",
      options: [
        "A) 'null'",
        "B) 'undefined'",
        "C) 'object' (JavaScript'in ilk sürümünden kalan tarihsel bir hata)",
        "D) 'boolean'",
      ],
      correctIndex: 2,
      explanation: "Doğru! 'typeof null' ifadesi 'object' döndürür; bu durum JavaScript'in 1995 yılındaki ilk tasarımından kalan ve geriye dönük uyumluluk nedeniyle düzeltilemeyen meşhur bir dildir.",
    },
  },

  "js-operators-math": {
    id: "js-operators-math",
    badge: "Modül 1 • Sayılar & Math",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Sayılar, Operatörler ve Math / Date Nesneleri (Numbers, Math & Date)",
    subtitle: "Number hassasiyeti (0.1 + 0.2 tuhaflığı), Math kütüphanesi (round, floor, random) ve Date zaman damgası.",
    sections: [
      {
        title: "1. Kayan Noktalı Sayı (Floating Point) Hassasiyeti",
        content: `Tüm JavaScript sayıları IEEE 754 standardında 64-bit float olarak saklanır. Bu yüzden ikilik tabanda tam ifade edilemeyen ondalıklarda şu meşhur sonuç çıkar:
\`\`\`javascript
console.log(0.1 + 0.2); // 0.30000000000000004
\`\`\`
Para birimi veya hassas hesaplamalarda \`toFixed(2)\` veya tamsayıya (kuruş/sent) çevirerek işlem yapmak gerekir.`,
      },
      {
        title: "2. Yerleşik Math Nesnesi",
        content: `- \`Math.round(4.6)\`: En yakın tamsayıya yuvarlar (5).
- \`Math.floor(4.9)\`: Daima aşağı yuvarlar (4).
- \`Math.ceil(4.1)\`: Daima yukarı yuvarlar (5).
- \`Math.max(10, 50, 5)\`: En büyük sayıyı seçer (50).
- \`Math.random()\`: $0$ (dahil) ile $1$ (hariç) arasında rastgele float üretir.`,
        code: {
          language: "javascript",
          caption: "random_numbers.js - Belirli Aralıkta Rastgele Sayı Üretme",
          snippet: `// min ile max arasında rastgele tamsayı fonksiyonu:
function rastgeleSayi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("Zar Sonucu (1-6):", rastgeleSayi(1, 6));`,
        },
      },
      {
        title: "3. Date (Tarih ve Saat) Nesnesi",
        content: `\`\`\`javascript
const suan = new Date();
console.log(suan.getFullYear()); // 2026
console.log(suan.toISOString()); // ISO formatlı zaman damgası
console.log(Date.now());         // 1970'ten bu yana geçen milisaniye (Timestamp)
\`\`\``,
      },
    ],
    playground: {
      title: "Canlı Zar Atma ve Math.random Simülatörü",
      filename: "math.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 30px; background: #0f172a; color: white; }
    .zar-kutu { font-size: 3rem; background: #3b82f6; width: 80px; height: 80px; line-height: 80px; border-radius: 16px; margin: 20px auto; }
    button { padding: 12px 24px; font-size: 1rem; border: none; border-radius: 8px; background: #10b981; color: white; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <h2>Zar Simülatörü</h2>
  <div id="zar" class="zar-kutu">?</div>
  <button onclick="zarAt()">Zar At (1-6)</button>

  <script>
    function zarAt() {
      const zar = Math.floor(Math.random() * 6) + 1;
      document.getElementById("zar").textContent = zar;
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[MATH] Math.floor(Math.random() * 6) + 1 hesaplandı.",
        "[OUTPUT] 1 ile 6 arasında rastgele tam sayı üretildi.",
      ],
    },
    quiz: {
      question: "JavaScript'te 'Math.floor(7.99)' ifadesinin sonucu nedir?",
      options: ["A) 8", "B) 7", "C) 7.9", "D) NaN"],
      correctIndex: 1,
      explanation: "Doğru! 'Math.floor()' ondalık kısmı atarak sayıyı daima kendisine en yakın küçük tamsayıya yuvarlar (7).",
    },
  },

  // ========================================================
  // MODÜL 2: KOŞULLAR, DÖNGÜLER & FONKSİYONLAR
  // ========================================================
  "js-control-flow": {
    id: "js-control-flow",
    badge: "Modül 2 • Akış Kontrolü",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Koşul İfadeleri ve Döngüler (If/Else, Switch, For, While)",
    subtitle: "Karar mekanizmaları (if-else, switch-case), döngü çeşitleri (for, while) ve for...of / for...in farkları.",
    sections: [
      {
        title: "1. Karar Mekanizmaları: if, else ve switch",
        content: `Program akışını belirli koşullara göre dallandırır:
- \`if / else if / else\` : Aralık ve boolean kontrolleri için.
- \`Ternary Operatör (? :)\` : Tek satırlık hızlı koşul: \`const durum = yas >= 18 ? "Yetişkin" : "Reşit Değil";\`
- \`switch (deger)\` : Tek bir değişkenin çoklu sabit değerlerle eşleştirilmesinde okunabilirliği artırır (Her \`case\` sonuna \`break;\` unutulmamalıdır).`,
      },
      {
        title: "2. Döngü Çeşitleri (Loops)",
        content: `- **Klasik \`for\`:** İndeks sayacı ile: \`for (let i = 0; i < 5; i++)\`.
- **\`while\`:** Koşul sağlandığı sürece döner: \`while (enerji > 0)\`.
- **\`for...of\` (Değerler Üzerinde):** Diziler, Stringler üzerinde doğrudan elemanları alır (En çok kullanılan modern döngü).
- **\`for...in\` (Anahtarlar Üzerinde):** Nesnelerin (Object) özellik isimlerini (key) gezer.`,
        code: {
          language: "javascript",
          caption: "loops_demo.js - for...of vs for...in",
          snippet: `const diller = ["SystemVerilog", "C++", "Rust", "Python"];

// for...of ile elemanları doğrudan alma:
for (const dil of diller) {
    console.log("Desteklenen Dil:", dil);
}

const cihaz = { model: "Basys 3", uretici: "Digilent", fpga: "Artix-7" };

// for...in ile nesne özelliklerini gezme:
for (const anahtar in cihaz) {
    console.log(\`\${anahtar}: \${cihaz[anahtar]}\`);
}`,
        },
      },
    ],
    playground: {
      title: "Döngü ve Koşul Mekanizması Testi",
      filename: "loops.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #1e1b4b; color: white; }
    ul { list-style: none; padding: 0; }
    li { background: #312e81; margin: 6px 0; padding: 8px 14px; border-radius: 6px; }
    .cift { border-left: 4px solid #10b981; }
    .tek  { border-left: 4px solid #f59e0b; }
  </style>
</head>
<body>
  <h3>Sayı Listesi Analizi:</h3>
  <ul id="liste"></ul>

  <script>
    const sayilar = [12, 7, 24, 19, 30, 5];
    const ul = document.getElementById("liste");

    for (const n of sayilar) {
      const li = document.createElement("li");
      const tur = (n % 2 === 0) ? "Çift" : "Tek";
      li.className = (n % 2 === 0) ? "cift" : "tek";
      li.textContent = \`Sayı: \${n} (\${tur})\`;
      ul.appendChild(li);
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[FOR...OF] Dizi elemanları for...of ile gezildi.",
        "[TERNARY] n % 2 === 0 ile Çift/Tek ayrımı yapıldı.",
      ],
    },
    quiz: {
      question: "JavaScript'te bir dizinin (Array) eleman değerleri üzerinde sırayla dönmek için hangi döngü yapısı önerilir?",
      options: ["A) for...in", "B) for...of", "C) switch", "D) goto"],
      correctIndex: 1,
      explanation: "Doğru! 'for...of' diziler ve yinelenebilir koleksiyonların değerleri üzerinde döner; 'for...in' ise nesnelerin anahtarları (property keys) üzerinde döner.",
    },
  },

  "js-functions": {
    id: "js-functions",
    badge: "Modül 2 • Fonksiyonlar & Kapsam",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Fonksiyonlar, Arrow Functions, Kapsam (Scope) ve Closures",
    subtitle: "Fonksiyon tanımlama yöntemleri, ok fonksiyonları (() => {}), leksikal this bağlamı ve fonksiyonel fabrika kalıpları (Closures).",
    sections: [
      {
        title: "1. Fonksiyon Bildirimi vs Ok Fonksiyonu (Arrow Function)",
        content: `Modern JavaScript'te kısa sözdizimi ve \`this\` karmaşasını çözmesi nedeniyle **Arrow Functions** tercih edilir:
\`\`\`javascript
// 1. Geleneksel Fonksiyon:
function topla(a, b) {
    return a + b;
}

// 2. Arrow Function (Tek satırda örtük return):
const toplaKisa = (a, b) => a + b;

// 3. Tek parametreli parantezsiz arrow:
const kareAl = x => x * x;
\`\`\`
**Kritik Fark:** Arrow fonksiyonların kendilerine ait bir \`this\` bağlamı yoktur; \`this\` değerini kendisini çevreleyen dış kapsamdan alır (**Lexical this**).`,
      },
      {
        title: "2. Kapsama Alanı Kapanışları (Closures)",
        content: `Bir fonksiyon, kendisini çevreleyen üst fonksiyon tamamlandıktan sonra dahi üst fonksiyonun değişkenlerini hafızasında tutmaya devam ediyorsa buna **Closure** denir. Özel (private) değişkenler üretmek için kullanılır:`,
        code: {
          language: "javascript",
          caption: "closure_pattern.js - Kapsüllenmiş Sayaç",
          snippet: `function sayacOlustur() {
    let gizliPuan = 0; // Dışarıdan doğrudan erişilemez!

    return {
        artir: () => ++gizliPuan,
        azalt: () => --gizliPuan,
        deger: () => gizliPuan
    };
}

const oyuncu1 = sayacOlustur();
console.log(oyuncu1.artir()); // 1
console.log(oyuncu1.artir()); // 2
console.log(oyuncu1.deger()); // 2
// oyuncu1.gizliPuan = 999; // İşe yaramaz, veri korunur!`,
        },
      },
    ],
    playground: {
      title: "Arrow Fonksiyon ve Closure Sayacı",
      filename: "closure.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 30px; background: #0f172a; color: white; }
    .kutu { background: #1e293b; display: inline-block; padding: 24px; border-radius: 12px; }
    button { padding: 8px 16px; margin: 4px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer; }
    .artir { background: #10b981; color: white; }
    .azalt { background: #ef4444; color: white; }
  </style>
</head>
<body>
  <div class="kutu">
    <h3>Closure Sayacı: <span id="skor">0</span></h3>
    <button class="artir" onclick="sayac.artir()">+1 Artır</button>
    <button class="azalt" onclick="sayac.azalt()">-1 Azalt</button>
  </div>

  <script>
    const sayac = (() => {
      let sayi = 0;
      const guncelle = () => document.getElementById("skor").textContent = sayi;
      return {
        artir: () => { sayi++; guncelle(); },
        azalt: () => { sayi--; guncelle(); }
      };
    })();
  </script>
</body>
</html>`,
      expectedOutput: [
        "[CLOSURE] IIFE ile özel 'sayi' değişkeni kapsüllendi.",
        "[ARROW] Lexical arrow fonksiyonları tetiklendi.",
      ],
    },
    quiz: {
      question: "Arrow fonksiyonlar (() => {}) ile geleneksel fonksiyonlar (function() {}) arasındaki en önemli davranışsal fark nedir?",
      options: [
        "A) Arrow fonksiyonlar daha yavaş çalışır",
        "B) Arrow fonksiyonların kendilerine ait 'this' bağlamı yoktur; leksikal olarak dış kapsamın 'this' değerini miras alırlar",
        "C) Arrow fonksiyonlar parametre alamaz",
        "D) Arrow fonksiyonlar sadece sayılarla çalışır",
      ],
      correctIndex: 1,
      explanation: "Doğru! Arrow fonksiyonlar kendi 'this' nesnelerini bağlamaz (no binding of this); 'this' değerini tanımlandıkları dış ortamdan (lexical scope) alırlar.",
    },
  },

  // ========================================================
  // MODÜL 3: NESNELER, DİZİLER & VERİ YAPILARI
  // ========================================================
  "js-objects-classes": {
    id: "js-objects-classes",
    badge: "Modül 3 • Nesneler & Sınıflar",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Nesneler (Objects), 'this' Bağlamı ve ES6 Sınıfları (Classes)",
    subtitle: "Anahtar-değer yapıları, metotlar, ES6 class sözdizimi, constructor ve extends kalıtımı.",
    sections: [
      {
        title: "1. Nesneler (Object Literals)",
        content: `Nesneler, verileri ve bu veriler üzerinde işlem yapan metotları bir arada tutan anahtar-değer (Key-Value) koleksiyonlarıdır:`,
        code: {
          language: "javascript",
          caption: "object_demo.js",
          snippet: `const robot = {
    ad: "Gezgin-1",
    pil: 85,
    durum: "Aktif",
    
    // Nesne Metodu:
    raporVer() {
        return \`Robot: \${this.ad} | Pil Seviyesi: %\${this.pil}\`;
    }
};

console.log(robot.raporVer());

// Faydalı Object Metotları:
console.log(Object.keys(robot));   // ["ad", "pil", "durum", "raporVer"]
console.log(Object.values(robot)); // ["Gezgin-1", 85, "Aktif", ...]`,
        },
      },
      {
        title: "2. ES6 Sınıfları (Classes) ve Kalıtım (Inheritance)",
        content: `Java veya C++'taki gibi nesne yönelimli şablonlar oluşturmak için ES6 \`class\` sözdizimini kullanırız:`,
        code: {
          language: "javascript",
          caption: "classes_inheritance.js",
          snippet: `class Sensor {
    constructor(ad, pin) {
        this.ad = ad;
        this.pin = pin;
    }

    bilgi() {
        return \`Sensör: \${this.ad} (Pin: \${this.pin})\`;
    }
}

// Kalıtım (extends ve super):
class SicaklikSensoru extends Sensor {
    constructor(ad, pin, birim = "C") {
        super(ad, pin); // Ebeveyn sınıfın kurucusunu çağır
        this.birim = birim;
    }

    sicaklikOku() {
        return 24.5;
    }
}

const dht = new SicaklikSensoru("DHT22", 4);
console.log(dht.bilgi()); // Sensör: DHT22 (Pin: 4)
console.log("Değer:", dht.sicaklikOku(), dht.birim);`,
        },
      },
    ],
    playground: {
      title: "ES6 Sınıfları ve Nesne Canlı Testi",
      filename: "classes.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #1e1e2e; color: #a6e3a1; }
    .kart { background: #181825; padding: 16px; border-radius: 8px; border: 1px solid #313244; }
  </style>
</head>
<body>
  <h3>Sınıf (Class) Çıktısı:</h3>
  <div id="output" class="kart"></div>

  <script>
    class DonanimKarti {
      constructor(isim, mcu, saatMhz) {
        this.isim = isim;
        this.mcu = mcu;
        this.saatMhz = saatMhz;
      }
      tanit() {
        return \`Kart: \${this.isim} | MCU: \${this.mcu} | Frekans: \${this.saatMhz}MHz\`;
      }
    }

    const kart = new DonanimKarti("ESP32-S3", "Xtensa LX7", 240);
    document.getElementById("output").textContent = kart.tanit();
  </script>
</body>
</html>`,
      expectedOutput: [
        "[CLASS] DonanımKarti sınıfı örneklendi (instantiated).",
        "[METHOD] kart.tanit() metodu çağrıldı.",
      ],
    },
    quiz: {
      question: "ES6 sınıflarında (class) bir alt sınıfın ebeveyn sınıfının kurucusunu (constructor) çağırmak için hangi anahtar kelime kullanılır?",
      options: ["A) parent()", "B) super()", "C) base()", "D) this()"],
      correctIndex: 1,
      explanation: "Doğru! 'super()' metodu türetilen alt sınıftan ebeveyn (parent) sınıfın yapıcısını çağırarak 'this' bağlamını başlatır.",
    },
  },

  "js-arrays-objects": {
    id: "js-arrays-objects",
    badge: "Modül 3 • Diziler & İterasyon",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Dizi Metotları (map, filter, reduce) ve Destructuring",
    subtitle: "Döngüsüz fonksiyonel programlama, parçalama (Destructuring), Rest ve Spread (...) operatörleri.",
    sections: [
      {
        title: "1. Modern Dizi İterasyon Metotları",
        content: `Klasik \`for\` döngüleri yerine modern JavaScript'te fonksiyonel metotlar zincirlenerek (Method Chaining) kullanılır:
- **\`map(fn)\`:** Her elemanı dönüştürür ve **aynı uzunlukta YENİ bir dizi** döndürür.
- **\`filter(fn)\`:** Yalnızca koşulu sağlayan (\`true\` dönen) elemanları seçip yeni dizi yapar.
- **\`reduce(fn, baslangic)\`:** Tüm diziyi tek bir kümülatif değere indirger (örneğin sepet toplamı).
- **\`find(fn)\`:** Koşulu sağlayan **ilk elemanı** döndürür.
- **\`some(fn)\` / \`every(fn)\`:** Elemanların en az birinin / tamamının koşulu sağlayıp sağlamadığını boolean döner.`,
        code: {
          language: "javascript",
          caption: "functional_arrays.js",
          snippet: `const urunler = [
    { ad: "ESP32", fiyat: 200, stok: 15 },
    { ad: "Arduino Uno", fiyat: 150, stok: 0 },
    { ad: "Raspberry Pi 5", fiyat: 3200, stok: 4 }
];

// Stokta olan ürünlerin KDV dahil fiyatları:
const kdvliStoktakiler = urunler
    .filter(u => u.stok > 0)
    .map(u => ({ ...u, kdvliFiyat: u.fiyat * 1.2 }));

console.log("KDV'li Ürünler:", kdvliStoktakiler);

// Toplam stok envanter maliyeti (reduce):
const toplamMaliyet = urunler.reduce((toplam, u) => toplam + (u.fiyat * u.stok), 0);
console.log("Toplam Maliyet:", toplamMaliyet, "TL");`,
        },
      },
      {
        title: "2. Parçalama (Destructuring) ve Spread / Rest (...)",
        content: `\`\`\`javascript
// 1. Nesne Parçalama:
const kisi = { ad: "Zeynep", rol: "Geliştirici", sehir: "Ankara" };
const { ad, rol } = kisi; // ad="Zeynep", rol="Geliştirici"

// 2. Dizi Parçalama:
const koordinatlar = [41.0082, 28.9784];
const [enlem, boylam] = koordinatlar;

// 3. Spread Operatörü (Kopyalama / Birleştirme):
const temelDiller = ["C", "C++"];
const tumDiller = [...temelDiller, "Rust", "SystemVerilog"]; // Kopyalar
\`\`\``,
      },
    ],
    playground: {
      title: "map, filter, reduce Canlı Deney",
      filename: "arrays.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    .kutu { background: #1e293b; padding: 15px; border-radius: 8px; margin-top: 10px; }
  </style>
</head>
<body>
  <h3>Dizi İşleme Sonuçları:</h3>
  <div id="output" class="kutu"></div>

  <script>
    const sayilar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // Çift sayıların karelerinin toplamı:
    const toplam = sayilar
      .filter(n => n % 2 === 0)
      .map(n => n * n)
      .reduce((acc, curr) => acc + curr, 0);

    document.getElementById("output").innerHTML = 
      "Kaynak: " + sayilar.join(", ") + "<br>" +
      "Çiftlerin Kareleri Toplamı: <strong>" + toplam + "</strong> (4+16+36+64+100)";
  </script>
</body>
</html>`,
      expectedOutput: [
        "[ARRAY] filter() ile çift sayılar seçildi.",
        "[MAP] map() ile kareleri alındı.",
        "[REDUCE] reduce() ile toplam 220 hesaplandı.",
      ],
    },
    quiz: {
      question: "JavaScript'te bir dizideki tüm sayıların toplamını tek bir sonuca indirgemek için hangi dizi metodu kullanılır?",
      options: ["A) map()", "B) filter()", "C) reduce()", "D) sort()"],
      correctIndex: 2,
      explanation: "Doğru! 'reduce()' metodu dizideki her eleman üzerinde akümülatör fonksiyonu çalıştırarak tüm diziyi tek bir değere indirger.",
    },
  },

  "js-sets-maps": {
    id: "js-sets-maps",
    badge: "Modül 3 • Set & Map",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Gelişmiş Veri Yapıları: Set ve Map (Sets & Maps)",
    subtitle: "Benzersiz elemanlar kümesi (Set) ile dizi tekilleştirme, her veri tipini anahtar yapabilen Map koleksiyonu.",
    sections: [
      {
        title: "1. Set (Benzersiz Değerler Kümesi)",
        content: `\`Set\`, içinde her değerin yalnızca **bir kez** bulunabildiği matematiksel bir kümedir. Bir dizideki tekrarlayan (duplicate) elemanları tek satırda silmek için kullanılır:`,
        code: {
          language: "javascript",
          caption: "sets_demo.js",
          snippet: `const tekrarlayan = [1, 2, 2, 3, 4, 4, 5, 1];

// Tekrarları tekilleştir:
const benzersiz = [...new Set(tekrarlayan)];
console.log(benzersiz); // [1, 2, 3, 4, 5]

const etiketler = new Set();
etiketler.add("FPGA");
etiketler.add("Verilog");
etiketler.add("FPGA"); // Eklenmez, zaten var!

console.log("Boyut:", etiketler.size);       // 2
console.log("Var mı?", etiketler.has("FPGA")); // true`,
        },
      },
      {
        title: "2. Map (Gelişmiş Anahtar-Değer Haritası)",
        content: `Standart JavaScript objelerinde anahtarlar (key) yalnızca string veya sembol olabilir. \`Map\` yapısında ise **her şey (bir fonksiyon veya başka bir obje dahi)** anahtar olabilir:`,
        code: {
          language: "javascript",
          caption: "maps_demo.js",
          snippet: `const kullaniciRolleri = new Map();

const kullanici1 = { id: 101, ad: "Ahmet" };
const kullanici2 = { id: 102, ad: "Elif" };

// Objeyi anahtar olarak kullanma:
kullaniciRolleri.set(kullanici1, "Yönetici");
kullaniciRolleri.set(kullanici2, "Mühendis");

console.log(kullaniciRolleri.get(kullanici1)); // "Yönetici"
console.log(kullaniciRolleri.size);             // 2`,
        },
      },
    ],
    playground: {
      title: "Set ile Dizi Tekilleştirme Canlı Önizleme",
      filename: "set.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #0f172a; color: white; }
    .kutu { background: #1e293b; padding: 16px; border-radius: 8px; }
  </style>
</head>
<body>
  <h3>Set ile Tekrarları Temizleme:</h3>
  <div id="output" class="kutu"></div>

  <script>
    const hamVeri = ["C", "Rust", "Python", "C", "Rust", "SystemVerilog"];
    const temiz = Array.from(new Set(hamVeri));

    document.getElementById("output").innerHTML = 
      "Ham: " + hamVeri.join(", ") + "<br>" +
      "Set ile Temizlenmiş: <strong>" + temiz.join(", ") + "</strong>";
  </script>
</body>
</html>`,
      expectedOutput: [
        "[SET] new Set(hamVeri) ile tekrarlar elendi.",
        "[RESULT] Benzersiz liste oluşturuldu.",
      ],
    },
    quiz: {
      question: "JavaScript'te bir dizideki yinelenen (tekrarlayan) elemanları kaldırmak için en pratik ve modern yöntem hangisidir?",
      options: [
        "A) [...new Set(dizi)]",
        "B) dizi.unique()",
        "C) dizi.filterDuplicates()",
        "D) new Map(dizi)",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'new Set(dizi)' küme oluşturup tekrarları atar; spread operatörü ('[...set]') ise bunu tekrar diziye çevirir.",
    },
  },

  // ========================================================
  // MODÜL 4: DOM MANİPÜLASYONU & OLAY YÖNETİMİ
  // ========================================================
  "js-dom-events": {
    id: "js-dom-events",
    badge: "Modül 4 • DOM & Olaylar",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "DOM Seçimi, Değişiklikleri ve Event Listeners (DOM & Events)",
    subtitle: "querySelector, element özellikleri, stil manipülasyonu ve addEventListener ile dinamik sayfa kontrolü.",
    sections: [
      {
        title: "1. DOM (Document Object Model) Nedir?",
        content: `Bir HTML sayfası yüklendiğinde tarayıcı bu belgeden hiyerarşik bir ağaç yapısı oluşturur (**DOM Tree**). JavaScript bu ağaca bağlanarak sayfadaki herhangi bir etiketi okuyabilir, silebilir, stilini değiştirebilir veya yeni etiket ekleyebilir.`,
      },
      {
        title: "2. Eleman Seçimi ve Güncelleme",
        content: `- \`document.querySelector(".kutu")\` : CSS seçicisiyle eşleşen **ilk elemanı** seçer.
- \`document.querySelectorAll(".item")\` : Eşleşen **tüm elemanları** NodeList olarak seçer.
- \`el.textContent = "Metin"\` : Güvenli metin ataması (XSS saldırılarını önler).
- \`el.classList.add("aktif")\` / \`remove()\` / \`toggle()\` : CSS sınıflarını yönetir.`,
      },
      {
        title: "3. addEventListener ile Olay Dinleme",
        content: `HTML etiketine \`onclick=""\` yazmak yerine JS dosyasında olay dinleyici eklemek temiz mimaridir:`,
        code: {
          language: "javascript",
          caption: "dom_events.js",
          snippet: `const buton = document.querySelector("#btn-gonder");
const girdi = document.querySelector("#input-ad");

buton.addEventListener("click", (olay) => {
    olay.preventDefault(); // Formun sayfayı yenilemesini engelle
    const isim = girdi.value.trim();
    if (isim) {
        alert(\`Hoş geldin, \${isim}!\`);
    }
});`,
        },
      },
    ],
    playground: {
      title: "DOM Eleman Seçimi ve Olay Dinleyici",
      filename: "dom.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    .kutu { padding: 20px; border-radius: 12px; background: #1e293b; border: 2px solid #334155; }
    .vurgu { border-color: #38bdf8; background: #0369a1; }
    button { padding: 10px 20px; border-radius: 8px; border: none; background: #38bdf8; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div id="kart" class="kutu">
    <h3>Dinamik DOM Kartı</h3>
    <p id="metin">Durum: Normal</p>
    <button id="btn-degistir">Stili Değiştir</button>
  </div>

  <script>
    const kart = document.querySelector("#kart");
    const metin = document.querySelector("#metin");
    const btn = document.querySelector("#btn-degistir");

    btn.addEventListener("click", () => {
      kart.classList.toggle("vurgu");
      const aktif = kart.classList.contains("vurgu");
      metin.textContent = aktif ? "Durum: Vurgulandı!" : "Durum: Normal";
    });
  </script>
</body>
</html>`,
      expectedOutput: [
        "[DOM] querySelector ile kart ve buton seçildi.",
        "[EVENT] click olayı ile classList.toggle('vurgu') bağlandı.",
      ],
    },
    quiz: {
      question: "JavaScript'te bir form submit edildiğinde sayfanın otomatik olarak yeniden yüklenmesini (refresh) engellemek için olay nesnesi üzerinde hangi metot çağrılır?",
      options: [
        "A) e.stopPropagation()",
        "B) e.preventDefault()",
        "C) e.stopReload()",
        "D) e.freeze()",
      ],
      correctIndex: 1,
      explanation: "Doğru! 'e.preventDefault()' tarayıcının o olay için varsayılan eylemini (form gönderiminde sayfa yenileme, linke tıklandığında sayfadan çıkma vb.) engeller.",
    },
  },

  "js-dom-advanced": {
    id: "js-dom-advanced",
    badge: "Modül 4 • İleri DOM & Olaylar",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Gelişmiş DOM: Olay Yayılımı (Bubbling/Delegation) ve Dinamik Elemanlar",
    subtitle: "Event Bubbling vs Capturing, Event Delegation ile yüksek performans ve createElement / DocumentFragment.",
    sections: [
      {
        title: "1. Olay Yayılımı: Event Bubbling",
        content: `Bir butona tıkladığınızda olay sadece o butonda kalmaz; bir su kabarcığı gibi yukarı doğru \`button\` $\\rightarrow$ \`div\` $\\rightarrow$ \`body\` $\\rightarrow$ \`document\` hiyerarşisi boyunca tırmanır (**Event Bubbling**).`,
      },
      {
        title: "2. Olay Yetkilendirme (Event Delegation)",
        content: `Sayfada dinamik olarak eklenen 100 farklı silme butonuna tek tek 100 tane \`addEventListener\` bağlamak belleği tüketir. 

Bunun yerine tek bir dinleyici ortak üst kapsayıcıya (\`<ul>\`) bağlanır ve tıklanan eleman **\`e.target.matches()\`** ile yakalanır:`,
        code: {
          language: "javascript",
          caption: "event_delegation.js",
          snippet: `const liste = document.querySelector("#gorev-listesi");

// Tek bir dinleyici tüm alt butonları yönetir:
liste.addEventListener("click", (e) => {
    if (e.target.matches(".btn-sil")) {
        const li = e.target.closest("li");
        li.remove(); // Tıklanan satırı güvenle sil
    }
});`,
        },
      },
      {
        title: "3. createElement ve DocumentFragment Performansı",
        content: `Döngü içinde her adımda DOM'a \`appendChild\` yapmak sayfayı sürekli yeniden hesaplatır (Reflow). Bunun yerine elemanlar sanal bir hafıza olan **\`DocumentFragment\`** içinde toplanıp DOM'a tek seferde basılır:`,
        code: {
          language: "javascript",
          caption: "fragment_performance.js",
          snippet: `const fragment = document.createDocumentFragment();

for (let i = 1; i <= 100; i++) {
    const li = document.createElement("li");
    li.textContent = \`Öğe #\${i}\`;
    fragment.appendChild(li); // DOM'a henüz dokunulmadı!
}

// 100 elemanı tek seferde DOM'a ekle:
document.querySelector("#liste").appendChild(fragment);`,
        },
      },
    ],
    playground: {
      title: "Event Delegation ile Dinamik Liste",
      filename: "delegation.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    ul { list-style: none; padding: 0; max-width: 320px; }
    li { background: #1e293b; margin: 6px 0; padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .sil-btn { background: #ef4444; color: white; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; }
    input { padding: 8px; border-radius: 6px; border: 1px solid #334155; }
    .ekle-btn { padding: 8px 14px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div>
    <input id="input-gorev" placeholder="Yeni Görev...">
    <button class="ekle-btn" onclick="ekle()">Ekle</button>
  </div>
  <ul id="gorevler"></ul>

  <script>
    const liste = document.getElementById("gorevler");

    // Event Delegation:
    liste.addEventListener("click", (e) => {
      if (e.target.matches(".sil-btn")) {
        e.target.closest("li").remove();
      }
    });

    function ekle() {
      const inp = document.getElementById("input-gorev");
      if (!inp.value.trim()) return;
      const li = document.createElement("li");
      li.innerHTML = \`<span>\${inp.value}</span><button class="sil-btn">Sil</button>\`;
      liste.appendChild(li);
      inp.value = "";
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[DELEGATION] Ortak ul dinleyicisi sil butonlarını yakaladı.",
        "[PERFORMANCE] Dinamik eklenen elemanlara ekstra listener bağlanmadı.",
      ],
    },
    quiz: {
      question: "Dinamik olarak sonradan sayfaya eklenen butonların tıklama olaylarını yakalamak için hangi teknik en yüksek performansı ve temizliği sağlar?",
      options: [
        "A) Her eleman eklendiğinde ona özel yeni bir addEventListener açmak",
        "B) Event Delegation (Olay Yetkilendirme) ile ortak üst kapsayıcıya tek bir dinleyici eklemek",
        "C) window.reload() çağırmak",
        "D) setInterval() ile sürekli kontrol etmek",
      ],
      correctIndex: 1,
      explanation: "Doğru! Event Delegation, olay kabarcıklanmasını kullanarak ortak üst elemana tek bir dinleyici ekler ve sonradan eklenen tüm çocukları sıfır bellek ek yüküyle yakalar.",
    },
  },

  "js-dynamic-ui": {
    id: "js-dynamic-ui",
    badge: "Modül 4 • Dinamik Arayüz & Depolama",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Dinamik Arayüz & Tarayıcı Depolama (UI & LocalStorage / SessionStorage)",
    subtitle: "Kalıcı tarayıcı hafızası (localStorage), JSON serileştirme ve sayfa yenilense de kaybolmayan Todo/Panel arayüzleri.",
    sections: [
      {
        title: "1. Web Storage API: localStorage vs sessionStorage",
        content: `- **\`localStorage\`:** Veriler kullanıcı tarayıcıyı veya bilgisayarı kapatsa bile **kalıcı olarak** saklanır (5-10 MB kapasite).
- **\`sessionStorage\`:** Veriler yalnızca o tarayıcı sekmesi açık kaldığı sürece saklanır; sekme kapandığında silinir.
- **Cookies (Çerezler):** Çok daha küçüktür (4 KB) ve her HTTP isteğinde sunucuya taşınır.

**Altın Kural:** Web Storage yalnızca **dizgi (string)** saklayabilir. Objeleri saklamak için \`JSON.stringify()\`, okumak için \`JSON.parse()\` zorunludur!`,
        code: {
          language: "javascript",
          caption: "localstorage_crud.js",
          snippet: `// 1. Veri Kaydetme (Set):
const ayarlar = { tema: "karanlik", bildirimler: true };
localStorage.setItem("kullanici_ayari", JSON.stringify(ayarlar));

// 2. Veri Okuma (Get):
const kayitliVeri = localStorage.getItem("kullanici_ayari");
if (kayitliVeri) {
    const ayarObjesi = JSON.parse(kayitliVeri);
    console.log("Tema:", ayarObjesi.tema);
}

// 3. Veri Silme:
// localStorage.removeItem("kullanici_ayari");
// localStorage.clear(); // Tüm storage'ı sıfırlar`,
        },
      },
    ],
    playground: {
      title: "Kalıcı LocalStorage Not Defteri",
      filename: "storage.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    textarea { width: 100%; height: 100px; padding: 10px; border-radius: 8px; background: #1e293b; color: white; border: 1px solid #334155; }
    .bilgi { font-size: 0.85rem; color: #94a3b8; margin-top: 6px; }
  </style>
</head>
<body>
  <h3>Kalıcı Not Defteri</h3>
  <textarea id="not" placeholder="Buraya yazın, sayfa yenilense de kalır..."></textarea>
  <div class="bilgi" id="durum">Yazılanlar otomatik localStorage'a kaydedilir.</div>

  <script>
    const notAlan = document.getElementById("not");
    
    // Açılışta kaydı yükle:
    notAlan.value = localStorage.getItem("hizli_not") || "";

    // Her tuş vuruşunda kaydet:
    notAlan.addEventListener("input", () => {
      localStorage.setItem("hizli_not", notAlan.value);
      document.getElementById("durum").textContent = "Son kayıt: " + new Date().toLocaleTimeString();
    });
  </script>
</body>
</html>`,
      expectedOutput: [
        "[STORAGE] localStorage.getItem('hizli_not') yüklendi.",
        "[AUTO-SAVE] input olayında anlık localStorage.setItem çalışıyor.",
      ],
    },
    quiz: {
      question: "Tarayıcı LocalStorage deposuna bir JavaScript dizisi veya nesnesi kaydederken hangi dönüşüm fonksiyonu kullanılmalıdır?",
      options: ["A) JSON.stringify(veri)", "B) JSON.parse(veri)", "C) String(veri)", "D) Object.encode(veri)"],
      correctIndex: 0,
      explanation: "Doğru! LocalStorage sadece düz metin saklayabilir; bu nedenle karmaşık nesneler 'JSON.stringify()' ile JSON metnine çevrilerek kaydedilir.",
    },
  },

  // ========================================================
  // MODÜL 5: HATA YÖNETİMİ, REGEX & MODÜLLER
  // ========================================================
  "js-errors-regex": {
    id: "js-errors-regex",
    badge: "Modül 5 • Hata Yönetimi & RegEx",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Hata Yönetimi (try/catch/finally) ve Düzenli İfadeler (RegEx)",
    subtitle: "İstisnaları yakalama, özel Error fırlatma (throw), strict mode ve regex ile email/şifre doğrulama kalıpları.",
    sections: [
      {
        title: "1. try, catch, finally ve throw Mimarisi",
        content: `Beklenmedik bir hata olduğunda programın patlamasını engeller:
- \`try\` : Hata oluşturabilecek riskli kod bloğu.
- \`catch (hata)\` : Hata çıkarsa yakalanıp loglanan blok.
- \`finally\` : Hata çıksa da çıkmasa da **istisnasız daima** çalışan temizlik bloğu.
- \`throw new Error("Mesaj")\` : Kendi özel mantıksal hatamızı fırlatmamızı sağlar.`,
        code: {
          language: "javascript",
          caption: "error_handling.js",
          snippet: `function bol(a, b) {
    if (b === 0) {
        throw new Error("Sıfıra bölme hatası!");
    }
    return a / b;
}

try {
    const sonuc = bol(10, 0);
    console.log("Sonuç:", sonuc);
} catch (err) {
    console.error("Hata Yakalandı:", err.message);
} finally {
    console.log("İşlem tamamlandı (finally her zaman çalışır).");
}`,
        },
      },
      {
        title: "2. Düzenli İfadeler (Regular Expressions - RegEx)",
        content: `Metin kalıplarını doğrulamak ve aramak için \`/desen/flags\` formatında yazılır:
- \`test(metin)\` : Kalıp uyuyorsa \`true\`, uymuyorsa \`false\` döner.
- \`^\\d{4}$\` : Tam 4 basamaklı sayı (PIN kodu).
- \`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\` : E-posta doğrulama.`,
      },
    ],
    playground: {
      title: "RegEx E-Posta Doğrulama Testi",
      filename: "regex.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    input { padding: 10px; border-radius: 8px; border: 2px solid #334155; background: #1e293b; color: white; width: 240px; }
    .gecerli { border-color: #10b981; }
    .gecersiz { border-color: #ef4444; }
  </style>
</head>
<body>
  <h3>E-posta RegEx Kontrolü</h3>
  <input id="email" placeholder="ornek@tncy.dev">
  <p id="sonuc"></p>

  <script>
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    const inp = document.getElementById("email");
    const out = document.getElementById("sonuc");

    inp.addEventListener("input", () => {
      const gecerli = regex.test(inp.value.trim());
      inp.className = gecerli ? "gecerli" : "gecersiz";
      out.textContent = gecerli ? "✓ Geçerli E-posta" : "✗ Hatalı Format";
      out.style.color = gecerli ? "#10b981" : "#ef4444";
    });
  </script>
</body>
</html>`,
      expectedOutput: [
        "[REGEX] regex.test() anlık girdi kontrolü yapıyor.",
        "[VALIDATION] E-posta desen eşleşmesi başarılı.",
      ],
    },
    quiz: {
      question: "JavaScript'te bir RegEx deseninin verilen bir metinle eşleşip eşleşmediğini kontrol edip boolean (true/false) dönen metot hangisidir?",
      options: ["A) regex.test(metin)", "B) regex.check(metin)", "C) metin.verify(regex)", "D) regex.validate()"],
      correctIndex: 0,
      explanation: "Doğru! 'RegExp.prototype.test(metin)' metodu desen metin içinde bulunuyorsa true, aksi halde false döndürür.",
    },
  },

  "js-modules-modern": {
    id: "js-modules-modern",
    badge: "Modül 5 • Modüller & Modern JS",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "ES6 Modülleri (Import/Export) ve Modern JS Standartları",
    subtitle: "Modüler mimari (export/import), Optional Chaining (?.), Nullish Coalescing (??) ve bellek yönetimi.",
    sections: [
      {
        title: "1. ES6 Modülleri (export & import)",
        content: `Büyük JavaScript projelerinde tüm kodu tek bir dosyaya yazmak yerine modüllere ayırırız:`,
        code: {
          language: "javascript",
          caption: "math_utils.js ve app.js",
          snippet: `// math_utils.js (Dışa Aktarma):
export const PI = 3.14159;
export function topla(a, b) { return a + b; }
export default function carp(a, b) { return a * b; } // Varsayılan aktarım

// app.js (İçe Aktarma):
import carp, { PI, topla } from './math_utils.js';

console.log(topla(5, 10)); // 15
console.log(carp(4, 5));   // 20`,
        },
      },
      {
        title: "2. Hayat Kurtaran Modern Operatörler",
        content: `- **Optional Chaining (\`?.\`):** Derin objelerde \`Cannot read properties of undefined\` çökmesini önler:
\`\`\`javascript
const sehir = kullanici?.adres?.sehir; // Hata vermez, varsa alır, yoksa undefined döner
\`\`\`
- **Nullish Coalescing (\`??\`):** Yalnızca \`null\` veya \`undefined\` durumunda varsayılan değeri atar (\`0\` ve \`false\` değerlerini bozmaz):
\`\`\`javascript
const limit = kullaniciLimiti ?? 50;
\`\`\``,
      },
    ],
    playground: {
      title: "Optional Chaining ve Nullish Coalescing",
      filename: "modern.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #0f172a; color: white; }
    .kutu { background: #1e293b; padding: 15px; border-radius: 8px; }
  </style>
</head>
<body>
  <h3>Modern Operatör Çıktıları:</h3>
  <div id="out" class="kutu"></div>

  <script>
    const profil = {
      ad: "Ahmet",
      iletisim: { email: "ahmet@tncy.dev" }
      // telefon tanımlı değil!
    };

    // Güvenli okuma (çökmez):
    const tel = profil?.iletisim?.telefon ?? "Kayıtlı telefon yok";
    const port = 0;
    const aktifPort = port ?? 8080; // port 0 olduğu için 0'ı korur!

    document.getElementById("out").innerHTML = 
      "Telefon: " + tel + "<br>" +
      "Aktif Port: " + aktifPort;
  </script>
</body>
</html>`,
      expectedOutput: [
        "[OPTIONAL CHAINING] profil?.iletisim?.telefon güvenle sorgulandı.",
        "[NULLISH COALESCING] ?? operatörü ile 0 değeri korundu.",
      ],
    },
    quiz: {
      question: "JavaScript'te derin bir nesne hiyerarşisinde ara bir özelliğin undefined olması durumunda programın çökmesini engelleyen güvenli erişim operatörü hangisidir?",
      options: ["A) ?.", "B) ??", "C) ||", "D) &&="],
      correctIndex: 0,
      explanation: "Doğru! Optional Chaining (?.) operatörü zincirdeki herhangi bir referans null veya undefined ise hata fırlatmak yerine güvenle undefined döndürür.",
    },
  },

  // ========================================================
  // MODÜL 6: ASENKRON JS, PROMISES & FETCH API
  // ========================================================
  "js-async-await": {
    id: "js-async-await",
    badge: "Modül 6 • Asenkron JS",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Asenkron Programlama: Callbacks, Promises ve Async/Await",
    subtitle: "JavaScript Event Loop mimarisi, Callback Cehennemi, Promise zincirleri ve modern async/await sözdizimi.",
    sections: [
      {
        title: "1. Tek İş Parçacığı (Single-Thread) ve Event Loop",
        content: `JavaScript tarayıcıda tek bir ana iş parçacığında (Call Stack) çalışır. Uzun süren bir ağ isteği veya zamanlayıcı işletilirken tarayıcının donmasını engellemek için tarayıcı API'leri arka planda koşturulur ve işlem bitince **Event Loop** üzerinden geri çağrılır.`,
      },
      {
        title: "2. Promise Anatomisi",
        content: `Bir \`Promise\`, gelecekte sonuçlanacak asenkron bir eylemin temsilcisidir:
- **Pending (Beklemede):** İşlem henüz sonuçlanmadı.
- **Fulfilled (Başarılı):** \`resolve(veri)\` çağrıldı $\\rightarrow$ \`.then()\` tetiklenir.
- **Rejected (Hata):** \`reject(hata)\` çağrıldı $\\rightarrow$ \`.catch()\` tetiklenir.`,
      },
      {
        title: "3. async / await ile Temiz Kod",
        content: `Promise zincirlerini senkron kod gibi okunabilir kılan ES8 standardı:`,
        code: {
          language: "javascript",
          caption: "async_delay.js",
          snippet: `// Zaman gecikmesi simülasyonu (Promise wrapper):
const bekle = (ms) => new Promise(res => setTimeout(res, ms));

async function gorevleriYurut() {
    console.log("1. Görev başlatıldı...");
    await bekle(1000); // 1 saniye bekle
    console.log("2. İkinci aşama tamamlandı...");
    await bekle(1500); // 1.5 saniye bekle
    console.log("3. Tüm süreç başarıyla bitti!");
}

gorevleriYurut();`,
        },
      },
    ],
    playground: {
      title: "Asenkron Zamanlayıcı ve Async/Await Testi",
      filename: "async.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    .durum { padding: 12px; border-radius: 8px; background: #1e293b; margin-top: 10px; }
    button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <button id="btn" onclick="baslat()">İşlemi Başlat</button>
  <div id="log" class="durum">Hazır</div>

  <script>
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const log = document.getElementById("log");

    async function baslat() {
      log.textContent = "Bağlanıyor (1.5s bekleyin)...";
      await sleep(1500);
      log.textContent = "Veriler indiriliyor (1s bekleyin)...";
      await sleep(1000);
      log.textContent = "✓ Tamamlandı! Veriler hazır.";
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[PROMISE] setTimeout tabanlı sleep Promise'i oluşturuldu.",
        "[ASYNC/AWAIT] async fonksiyon adımları sırayla yürüttü.",
      ],
    },
    quiz: {
      question: "Bir JavaScript fonksiyonunun içinde 'await' anahtar kelimesini kullanabilmek için o fonksiyon nasıl tanımlanmalıdır?",
      options: ["A) async function", "B) promise function", "C) defer function", "D) thread function"],
      correctIndex: 0,
      explanation: "Doğru! 'await' anahtar kelimesi yalnızca 'async' olarak tanımlanmış fonksiyonların gövdesinde kullanılabilir.",
    },
  },

  "js-fetch-api": {
    id: "js-fetch-api",
    badge: "Modül 6 • Fetch & HTTP",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Fetch API ile REST API'lerden Veri Çekme (Fetch & HTTP Requests)",
    subtitle: "HTTP GET ve POST istekleri, Headers, response.json() ayrıştırma ve sağlam ağ hata yönetimi.",
    sections: [
      {
        title: "1. Modern Fetch API Mimarisi",
        content: `Eski hantal \`XMLHttpRequest\` yerine modern tarayıcı standardı **Fetch API** kullanılır.

Fetch bir Promise döner; sunucudan yanıt geldiğinde \`response.json()\` ile gövde okunur:`,
        code: {
          language: "javascript",
          caption: "fetch_get_post.js - GET ve POST İstekleri",
          snippet: `// 1. GET İsteği ile Veri Çekme:
async function kullanicilariGetir() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
        
        // HTTP 404 veya 500 hatalarını kontrol et!
        if (!res.ok) {
            throw new Error(\`Sunucu Hatası: \${res.status}\`);
        }
        
        const veri = await res.json();
        console.log("Kullanıcı:", veri.name, veri.email);
    } catch (err) {
        console.error("Ağ Hatası:", err.message);
    }
}

// 2. POST İsteği ile Veri Gönderme:
async function yeniGorevOlustur(baslik) {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: baslik, completed: false })
    });
    const yeniKayit = await res.json();
    console.log("Oluşturulan Kayıt:", yeniKayit);
}`,
        },
        callout: {
          type: "warning",
          title: "Kritik Fetch Tuzağı",
          message: "Fetch API, sunucu 404 (Not Found) veya 500 (Internal Server Error) dönse bile Promise'i reject ETMEZ! Sadece internet koparsa reject eder. Bu nedenle daima 'if (!res.ok)' kontrolü yapılmalıdır.",
        },
      },
    ],
    playground: {
      title: "Fetch API ile Canlı REST İstek Simülatörü",
      filename: "fetch.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    .kart { background: #1e293b; padding: 15px; border-radius: 8px; margin-top: 10px; }
    button { padding: 10px 16px; background: #38bdf8; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <h3>Fetch API Testi</h3>
  <button onclick="veriCek()">Kullanıcı Getir</button>
  <div id="sonuc" class="kart">Henüz istek atılmadı.</div>

  <script>
    async function veriCek() {
      const out = document.getElementById("sonuc");
      out.textContent = "Yükleniyor...";
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!res.ok) throw new Error("Durum: " + res.status);
        const data = await res.json();
        out.innerHTML = \`<strong>\${data.name}</strong><br>Email: \${data.email}<br>Şehir: \${data.address.city}\`;
      } catch (err) {
        out.textContent = "Hata: " + err.message;
      }
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[FETCH] JSONPlaceholder API'sine GET isteği yapıldı.",
        "[PARSER] response.json() başarıyla DOM'a yazdırıldı.",
      ],
    },
    quiz: {
      question: "Fetch API ile yapılan bir istekte sunucunun 404 (Not Found) veya 500 hatası döndüğünü programatik olarak yakalamak için hangi kontrol yapılmalıdır?",
      options: [
        "A) if (!response.ok)",
        "B) if (response.status === 200)",
        "C) Sadece catch(err) bloğu yeterlidir",
        "D) if (response.error)",
      ],
      correctIndex: 0,
      explanation: "Doğru! Fetch API HTTP hata durumlarında catch bloğuna düşmez; 'response.ok' özelliği HTTP durum kodu 200-299 aralığında ise true, aksi halde false döner.",
    },
  },

  "js-web-apis": {
    id: "js-web-apis",
    badge: "Modül 6 • Web API'leri",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Modern Web API'leri (Geolocation, Timers & Clipboard)",
    subtitle: "Tarayıcının yerel yetenekleri: Geolocation konum alma, Clipboard panoya kopyalama ve setInterval zamanlayıcıları.",
    sections: [
      {
        title: "1. Geolocation API (Coğrafi Konum)",
        content: `Kullanıcı izin verdiği takdirde GPS ve Wi-Fi üzerinden enlem ve boylam koordinatları alınır:
\`\`\`javascript
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        pos => console.log(\`Enlem: \${pos.coords.latitude}, Boylam: \${pos.coords.longitude}\`),
        err => console.error("Konum hatası:", err.message)
    );
}
\`\`\``,
      },
      {
        title: "2. Clipboard API (Tek Tıkla Kopyalama)",
        content: `Modern web sitelerinde 'Kodu Kopyala' butonlarını çalıştırmak için:
\`\`\`javascript
async function metniKopyala(metin) {
    await navigator.clipboard.writeText(metin);
    alert("Panoya kopyalandı!");
}
\`\`\``,
      },
      {
        title: "3. Zamanlayıcılar: setTimeout & setInterval",
        content: `- \`setTimeout(fn, ms)\`: Belirtilen milisaniye sonra **bir defa** çalışır.
- \`setInterval(fn, ms)\`: Belirtilen aralıklarla **sürekli** tekrar eder.
- \`clearInterval(id)\`: Sayacı durdurur.`,
      },
    ],
    playground: {
      title: "Canlı Kronometre ve Clipboard Kopyalama",
      filename: "web_api.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 30px; background: #0f172a; color: white; }
    .kronometre { font-size: 2.5rem; font-family: monospace; color: #38bdf8; margin: 15px 0; }
    button { padding: 8px 16px; margin: 4px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div class="kronometre" id="sayac">0.0 s</div>
  <button style="background:#10b981; color:white;" onclick="baslat()">Başlat</button>
  <button style="background:#ef4444; color:white;" onclick="durdur()">Durdur</button>
  <button style="background:#64748b; color:white;" onclick="kopyala()">Süreyi Kopyala</button>

  <script>
    let timer = null;
    let sn = 0;
    function baslat() {
      if (timer) return;
      timer = setInterval(() => {
        sn += 0.1;
        document.getElementById("sayac").textContent = sn.toFixed(1) + " s";
      }, 100);
    }
    function durdur() {
      clearInterval(timer);
      timer = null;
    }
    async function kopyala() {
      await navigator.clipboard.writeText(sn.toFixed(1) + " s");
      alert("Süre panoya kopyalandı!");
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[TIMER] setInterval() ile 100ms hassasiyetli kronometre çalıştı.",
        "[CLIPBOARD] navigator.clipboard.writeText() panoya aktardı.",
      ],
    },
    quiz: {
      question: "JavaScript'te 'setInterval' ile başlatılan tekrarlı bir zamanlayıcıyı tamamen durdurmak için hangi fonksiyon kullanılır?",
      options: ["A) stopInterval()", "B) clearInterval(timerId)", "C) cancelTimer()", "D) pause()"],
      correctIndex: 1,
      explanation: "Doğru! 'clearInterval(timerId)' fonksiyonu setInterval tarafından döndürülen zamanlayıcı kimliğini alarak periyodik döngüyü sonlandırır.",
    },
  },
};
