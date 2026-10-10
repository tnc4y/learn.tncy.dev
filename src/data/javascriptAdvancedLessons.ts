import { LessonContent } from "./lessonsData";

export const JAVASCRIPT_ADVANCED_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // 1. YÜRÜTME BAĞLAMI, HOISTING & TDZ
  // ========================================================
  "js-hoisting-tdz": {
    id: "js-hoisting-tdz",
    badge: "Modül 3 • Kapsam & Yürütme",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Yürütme Bağlamı, Hoisting ve Geçici Ölü Bölge (TDZ)",
    subtitle: "JavaScript motorunun iki aşamalı çalışma mekanizması: Creation Phase, Execution Phase, var vs let/const yükseltilmesi.",
    sections: [
      {
        title: "1. Yürütme Bağlamı (Execution Context) Nedir?",
        content: `JavaScript motoru (ör. Google V8) bir kodu çalıştırmadan önce iki aşamadan geçer:
1. **Oluşturma Aşaması (Creation / Compilation Phase):** Motor tüm kodu tarar. Bellekte değişkenler ve fonksiyonlar için yer açar.
2. **Yürütme Aşaması (Execution Phase):** Kod yukarıdan aşağıya satır satır çalıştırılır ve değişkenlere değerleri atanır.

Bu iki aşamalı mimari, kod çalışmadan önce değişkenlerin ve fonksiyonların belleğe "yükseltilmesi" (**Hoisting**) anlamına gelir.`,
        callout: {
          type: "info",
          title: "Önemli Kural",
          message: "Hoisting fiziksel olarak kodun yukarı taşınması DEĞİLDİR; derleme aşamasında tanımlayıcıların belleğe kaydedilmesidir.",
        },
      },
      {
        title: "2. var vs let / const ve Geçici Ölü Bölge (Temporal Dead Zone - TDZ)",
        content: `- **\`var\` Hoisting:** \`var\` ile tanımlanan değişkenler derleme aşamasında belleğe \`undefined\` değeriyle başlatılır. Bu yüzden satırından önce erişildiğinde hata vermez, \`undefined\` döner.
- **\`let\` ve \`const\` Hoisting (TDZ):** \`let\` ve \`const\` da derleme aşamasında belleğe kaydedilir; ancak **başlatılmaz (uninitialized)**! Tanımlandığı satıra kadar olan bölgeye **Temporal Dead Zone (Geçici Ölü Bölge)** denir. Bu bölgede değişkene erişmeye çalışırsanız \`ReferenceError: Cannot access 'x' before initialization\` hatası alırsınız.`,
        code: {
          language: "javascript",
          caption: "hoisting-comparison.js",
          snippet: `console.log(eskiVar); // undefined (Hata vermez ama bug kaynağı!)
var eskiVar = "Merhaba";

// console.log(modernLet); // ReferenceError: Cannot access 'modernLet' before initialization (TDZ)
let modernLet = "Güvenli Değişken";`,
        },
      },
      {
        title: "3. Fonksiyon Bildirimi vs Fonksiyon İfadesi Hoisting",
        content: `Fonksiyon bildirimleri (\`function foo() {}\`) gövdeleriyle birlikte tamamen belleğe yüklenir; bu sayede tanımlanmadan önceki bir satırda çağrılabilir.

Buna karşılık ok fonksiyonlar veya fonksiyon ifadeleri (\`const foo = () => {}\`) bir değişken olarak saklandığı için TDZ kuralına tabidir ve tanımlanmadan önce çağrılamaz.`,
      },
    ],
    playground: {
      title: "Hoisting & Temporal Dead Zone (TDZ) Simülatörü",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #0f172a; color: #f8fafc; }
    .panel { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 12px; }
    button { background: #3b82f6; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 8px; }
    button:hover { background: #2563eb; }
    .out { background: #020617; padding: 12px; border-radius: 6px; color: #38bdf8; min-height: 50px; font-size: 13px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="panel">
    <h3>⚡ Hoisting & TDZ Canlı Deneyi</h3>
    <button onclick="testVar()">1. var ile Erken Erişim</button>
    <button onclick="testLet()" style="background:#ef4444">2. let (TDZ) Erken Erişim</button>
    <button onclick="testFunction()" style="background:#10b981">3. Fonksiyon Hoisting</button>
    <div id="log" class="out" style="margin-top:12px">Sonuçları görmek için butonlara tıklayın...</div>
  </div>

  <script>
    function testVar() {
      // var testi simülasyonu
      let log = "--- var Testi ---\\n";
      log += "eval('console.log(a); var a = 10;') -> ";
      log += "Değer: undefined (Değişken tanımlanmadan erişildi, çökmedi!)\\n";
      document.getElementById('log').innerText = log;
    }

    function testLet() {
      let log = "--- let & const (TDZ) Testi ---\\n";
      log += "eval('console.log(b); let b = 20;') -> \\n";
      log += "HATA: ReferenceError: Cannot access 'b' before initialization\\n";
      log += "Açıklama: Değişken TDZ içinde olduğu için motor erişimi engelledi!";
      document.getElementById('log').innerText = log;
    }

    function testFunction() {
      let log = "--- Fonksiyon Bildirimi Testi ---\\n";
      const res = calis();
      log += "calis() çağrıldı -> Çıktı: " + res + "\\n";
      log += "Açıklama: 'function calis()' satırından önce çağrılabildi çünkü fonksiyon gövdesi belleğe yükseltildi.";
      document.getElementById('log').innerText = log;
    }

    function calis() {
      return "Fonksiyon başarıyla çalıştı!";
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[HOISTING] var değişkeni 'undefined' olarak yükseltildi.",
        "[TDZ] let değişkeni başlatılmadan önce erişilemez hatası üretti.",
        "[FUNCTION] Fonksiyon bildirimi tanımlandığı satırın yukarısından çağrılabildi.",
      ],
    },
    quiz: {
      question: "Temporal Dead Zone (Geçici Ölü Bölge) hangi değişken türleri için geçerlidir ve bu bölgede değişkene erişildiğinde ne fırlatılır?",
      options: [
        "A) var için geçerlidir; undefined döner",
        "B) let ve const için geçerlidir; ReferenceError fırlatılır",
        "C) Sadece global değişkenler için geçerlidir; TypeError fırlatılır",
        "D) Sadece arrow fonksiyonlar için geçerlidir; SyntaxError döner",
      ],
      correctIndex: 1,
      explanation: "Doğru! let ve const blok kapsamının başından tanımlandıkları satıra kadar TDZ içindedir. Bu aralıkta erişilirse JavaScript motoru ReferenceError fırlatır.",
    },
  },

  // ========================================================
  // 2. 'THIS' BAĞLAMI, CALL, APPLY & BIND
  // ========================================================
  "js-this-bind": {
    id: "js-this-bind",
    badge: "Modül 3 • Kapsam & Yürütme",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "'this' Anahtar Kelimesi, call(), apply() ve bind()",
    subtitle: "Dinamik bağlam (context) yönetimi: call, apply ve bind ile fonksiyon ödünç alma (method borrowing).",
    sections: [
      {
        title: "1. JavaScript'te 'this' Neyi Temsil Eder?",
        content: `JavaScript'te \`this\`, fonksiyonun **nerede tanımlandığına değil, NASIL çağrıldığına** bağlı olarak çalışma zamanında (runtime) belirlenen dinamik bir referanstır:

1. **Bir nesne metodunda:** Metodu çağıran nesneyi temsil eder (\`kullanici.girisYap()\` -> \`this = kullanici\`).
2. **Tek başına (Global fonksiyonda):** Standart modda \`window\` (tarayıcı) veya \`global\` (Node.js); \`"use strict"\` katı modunda ise \`undefined\` olur.
3. **DOM olay dinleyicisinde:** Olayı tetikleyen HTML elemanını temsil eder (\`btn.addEventListener('click', function() { this === btn })\`).
4. **Arrow Function (Ok Fonksiyonu):** Kendi \`this\`'i yoktur; yazıldığı sözcüksel (lexical) üst kapsamın \`this\`'ini miras alır.`,
      },
      {
        title: "2. Açık Bağlam Atama: call(), apply() ve bind()",
        content: `Bir fonksiyonun \`this\` bağlamını manuel olarak belirlemek için \`Function.prototype\` üzerindeki 3 metot kullanılır:

- **\`call(thisArg, arg1, arg2, ...)\`:** Fonksiyonu hemen çalıştırır. Argümanları virgülle ayrılmış tekil liste olarak alır.
- **\`apply(thisArg, [args])\`:** Fonksiyonu hemen çalıştırır. Argümanları bir dizi (\`array\`) olarak alır.
- **\`bind(thisArg, arg1, arg2, ...)\`:** Fonksiyonu hemen ÇALIŞTIRMAZ. \`this\` bağlamı kalıcı olarak sabitlenmiş YENİ bir fonksiyon üretir.`,
        code: {
          language: "javascript",
          caption: "this-borrowing.js - Metot Ödünç Alma",
          snippet: `const gelistirici = {
  ad: "Emre",
  unvan: "Yazılım Mimarı",
  tanit(sehir, yil) {
    return \`\${this.ad} (\${this.unvan}) - \${sehir}, \${yil} yıldır sektörde.\`;
  }
};

const konuk = { ad: "Zeynep", unvan: "DevOps Mühendisi" };

// 1. call: argümanlar virgülle
console.log(gelistirici.tanit.call(konuk, "İzmir", 5));
// "Zeynep (DevOps Mühendisi) - İzmir, 5 yıldır sektörde."

// 2. apply: argümanlar dizi olarak
console.log(gelistirici.tanit.apply(konuk, ["Ankara", 4]));

// 3. bind: yeni fonksiyon üretir
const zeynepTanit = gelistirici.tanit.bind(konuk, "İstanbul");
console.log(zeynepTanit(6));`,
        },
      },
    ],
    playground: {
      title: "call, apply ve bind ile Metot Ödünç Alma Laboratuvarı",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 16px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 12px; }
    button { background: #0ea5e9; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; margin-right: 6px; font-weight: bold; }
    button:hover { background: #0284c7; }
    .out { background: #020617; padding: 12px; border-radius: 6px; font-family: monospace; color: #a5f3fc; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>🎮 Karakter Yetenek Ödünç Alma</h3>
    <p>Savaşçı nesnesinin 'saldir' metodunu Büyücü nesnesi üzerinde 'call' ve 'bind' ile çalıştırın.</p>
    <button onclick="calistirCall()">1. call() ile Anında Saldır</button>
    <button onclick="calistirApply()">2. apply() ile Dizi Argümanı</button>
    <button onclick="calistirBind()" style="background:#8b5cf6">3. bind() ile Sabit Fonksiyon</button>
    <div id="sonuc" class="out">Sonuç bekleniyor...</div>
  </div>

  <script>
    const savasci = {
      isim: "Thorin (Savaşçı)",
      guc: 100,
      saldir(hedef, bonus) {
        const hasar = this.guc + bonus;
        return \`[\${this.isim}] -> \${hedef} hedefine \${hasar} hasar vurdu! (Bonus: +\${bonus})\`;
      }
    };

    const buyucu = { isim: "Gandalf (Büyücü)", guc: 180 };

    function calistirCall() {
      // call(): buyucu'yu 'this' yap, parametreleri tek tek ver
      const msg = savasci.saldir.call(buyucu, "Kara Ejderha", 50);
      document.getElementById('sonuc').innerText = "call() Çıktısı:\\n" + msg;
    }

    function calistirApply() {
      // apply(): parametreleri dizi [hedef, bonus] olarak ilet
      const msg = savasci.saldir.apply(buyucu, ["Ork Ordusu", 30]);
      document.getElementById('sonuc').innerText = "apply() Çıktısı:\\n" + msg;
    }

    function calistirBind() {
      // bind(): buyucu'ye kalıcı bağlanmış yeni fonksiyon türet
      const buyucuSaldir = savasci.saldir.bind(buyucu, "Goblin Kralı");
      const msg = buyucuSaldir(20);
      document.getElementById('sonuc').innerText = "bind() Çıktısı:\\n" + msg;
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[CALL] savasci.saldir.call(buyucu) ile Gandalf üzerinden hasar hesaplandı.",
        "[APPLY] Argümanlar [hedef, bonus] dizisi olarak aktarıldı.",
        "[BIND] Kalıcı bağlanmış fonksiyon türetilip çağrıldı.",
      ],
    },
    quiz: {
      question: "call() ile apply() arasındaki temel fark nedir?",
      options: [
        "A) call fonksiyonu hemen çalıştırırken, apply yeni bir fonksiyon döndürür",
        "B) call argümanları tekil parametreler olarak alırken, apply argümanları bir dizi (array) olarak alır",
        "C) apply sadece Arrow fonksiyonlarda çalışır",
        "D) call katı modda (strict mode) çalışmaz",
      ],
      correctIndex: 1,
      explanation: "Doğru! Hem call hem apply fonksiyonu anında çağırır ve birinci parametre olarak thisArg alır. call sonraki argümanları virgülle ayrılmış liste olarak (arg1, arg2), apply ise dizi olarak ([arg1, arg2]) alır.",
    },
  },

  // ========================================================
  // 3. PROTOTİPLER VE PROTOTİPSEL KALITIM
  // ========================================================
  "js-prototypes": {
    id: "js-prototypes",
    badge: "Modül 4 • Nesneler & Prototipler",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Prototip Mimarisi ve Prototipsel Kalıtım (Prototypes)",
    subtitle: "JavaScript'in nesne omurgası: __proto__, prototype özelliği, prototip zinciri ve bellek optimizasyonu.",
    sections: [
      {
        title: "1. Prototip (Prototype) Nedir?",
        content: `JavaScript sınıf tabanlı (class-based) değil; özünde **prototip tabanlı (prototypal)** bir dildir. ES6 \`class\` sözdizimi de arka planda prototipler üzerinde çalışan "sözdizimsel bir şekerdir" (syntactic sugar).

Her JavaScript nesnesinin, başka bir nesneye referans veren gizli bir prototip özelliği (\`[[Prototype]]\` veya erişilebilir haliyle \`__proto__\`) vardır. Bir nesnede bir özellik veya metot arandığında, nesnede bulunamazsa prototipine bakılır; orada da yoksa onun prototipine bakılır. Bu zincire **Prototip Zinciri (Prototype Chain)** denir ve en tepede \`Object.prototype\` (\`null\` ile biter) bulunur.`,
      },
      {
        title: "2. Neden Metotları Prototipte Tanımlarız?",
        content: `Bir yapıcı fonksiyon (Constructor Function) içinde metot tanımlarsanız, her \`new\` ile yeni nesne oluşturulduğunda o metot bellekte tekrar tekrar oluşturulur (1.000 kullanıcı = 1.000 ayrı metot kopyası).

Bunun yerine metodu \`Yapici.prototype\` üzerine eklerseniz, 1.000 nesnenin tamamı bellekteki **tek bir metodu** paylaşır. Bu muazzam bir bellek tasarrufu sağlar.`,
        code: {
          language: "javascript",
          caption: "prototype-chain.js",
          snippet: `function Arac(marka, model) {
  this.marka = marka;
  this.model = model;
}

// Ortak metot prototipe eklenir
Arac.prototype.calis = function() {
  return \`\${this.marka} \${this.model} motoru çalıştı!\`;
};

const oto1 = new Arac("TOGG", "T10X");
const oto2 = new Arac("Tesla", "Model Y");

console.log(oto1.calis()); // "TOGG T10X motoru çalıştı!"
console.log(oto1.calis === oto2.calis); // TRUE! (Aynı bellek adresini paylaşırlar)`,
        },
      },
      {
        title: "3. Prototip Zincirinde Arama: hasOwnProperty()",
        content: `Bir özelliğin nesnenin kendisine mi ait olduğunu (\`own property\`) yoksa prototip zincirinden mi geldiğini ayırt etmek için \`Object.hasOwn(obj, "ozellik")\` veya \`obj.hasOwnProperty("ozellik")\` kullanılır.`,
      },
    ],
    playground: {
      title: "Prototip Zinciri & Özel Array Metodu Deneyi",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #0f172a; color: white; }
    .box { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 12px; }
    button { background: #6366f1; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    button:hover { background: #4f46e5; }
    .out { background: #020617; padding: 12px; border-radius: 6px; color: #a5b4fc; margin-top: 10px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="box">
    <h3>🧬 Prototip Zincirini İnceleme</h3>
    <p>Array.prototype üzerine özel bir 'sonEleman' metodu ekleyip prototip zincirinden miras alacağız.</p>
    <button onclick="prototipTesti()">Prototip Metodunu Çalıştır</button>
    <div id="cikti" class="out">Sonuç bekleniyor...</div>
  </div>

  <script>
    // Prototip genişletme örneği
    Array.prototype.sonEleman = function() {
      return this[this.length - 1];
    };

    function prototipTesti() {
      const sehirler = ["İstanbul", "Ankara", "İzmir", "Trabzon"];
      const son = sehirler.sonEleman();
      
      let res = "Dizi: " + JSON.stringify(sehirler) + "\\n";
      res += "sehirler.sonEleman() -> " + son + "\\n\\n";
      res += "Prototip Zinciri Kontrolü:\\n";
      res += "sehirler.hasOwnProperty('sonEleman') -> " + sehirler.hasOwnProperty('sonEleman') + " (Prototipte tanımlı)\\n";
      res += "sehirler.__proto__ === Array.prototype -> " + (sehirler.__proto__ === Array.prototype) + "\\n";
      res += "Array.prototype.__proto__ === Object.prototype -> " + (Array.prototype.__proto__ === Object.prototype) + "\\n";
      res += "Object.prototype.__proto__ -> " + Object.prototype.__proto__ + " (Zincirin sonu)";

      document.getElementById('cikti').innerText = res;
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[PROTOTYPE] Array.prototype üzerine sonEleman() metodu enjekte edildi.",
        "[CHAIN] Prototip zinciri Object.prototype -> null şeklinde doğrulandı.",
      ],
    },
    quiz: {
      question: "JavaScript'te bir nesnenin prototip zincirinin en tepesinde hangi nesne bulunur ve onun prototipi nedir?",
      options: [
        "A) Function.prototype, prototipi Object'tir",
        "B) Object.prototype, prototipi null'dır",
        "C) Array.prototype, prototipi undefined'dır",
        "D) Window nesnesi, prototipi HTMLDocument'tir",
      ],
      correctIndex: 1,
      explanation: "Doğru! Prototip zincirinin en tepesinde Object.prototype yer alır ve onun __proto__ değeri null'dır; arama burada sonlanır.",
    },
  },

  // ========================================================
  // 4. GELİŞMİŞ NESNE YÖNETİMİ & OBJECT API
  // ========================================================
  "js-object-methods": {
    id: "js-object-methods",
    badge: "Modül 4 • Nesneler & Prototipler",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "Gelişmiş Nesne Yönetimi: Getters/Setters & Object API",
    subtitle: "Object.defineProperty(), Object.freeze(), Object.seal(), getters/setters ile veri kapsülleme ve koruma.",
    sections: [
      {
        title: "1. Erişimciler: Getters ve Setters (get / set)",
        content: `Getters ve Setters, nesne özelliklerine fonksiyon gibi davranan ancak özellik gibi okunan/yazılan erişim yöntemleridir:
- **\`get ozellik()\`**: Özellik okunduğunda tetiklenir, hesaplanmış dinamik değer döner.
- **\`set ozellik(deger)\`**: Özelliğe yeni değer atanırken tetiklenir; doğrulama (validation) ve formatlama sağlar.`,
      },
      {
        title: "2. Object.defineProperty() ve Özellik Bayrakları",
        content: `JavaScript'te her nesne özelliğinin arkasında 3 gizli bayrak (descriptor) bulunur:
- **\`writable\`**: Değer değiştirilebilir mi? (\`false\` ise salt okunur).
- **\`enumerable\`**: Döngülerde (\`for...in\`, \`Object.keys\`) listelenir mi?
- **\`configurable\`**: Özellik silinebilir (\`delete\`) veya bayrakları değiştirilebilir mi?`,
        code: {
          language: "javascript",
          caption: "define-property.js",
          snippet: `const hesap = {};

Object.defineProperty(hesap, "iban", {
  value: "TR1234567890",
  writable: false,      // Değiştirilemez!
  enumerable: true,     // Listelenebilir
  configurable: false   // Silinemez!
});

hesap.iban = "TR9999"; // Katı modda hata fırlatır, standart modda sessizce yok sayılır
console.log(hesap.iban); // TR1234567890 (Korumalı)`,
        },
      },
      {
        title: "3. Nesne Koruması: freeze() vs seal()",
        content: `- **\`Object.freeze(obj)\`:** Nesneyi tamamen dondurur. Yeni özellik eklenemez, mevcut özellik silinemez, değerler DEĞİŞTİRİLEMEZ (tam salt okunur).
- **\`Object.seal(obj)\`:** Nesneyi mühürler. Yeni özellik eklenemez, mevcutlar silinemez; ANCAK mevcut özelliklerin değerleri değiştirilebilir.`,
      },
    ],
    playground: {
      title: "Object.freeze() ve defineProperty() Kalkanı",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 12px; }
    button { background: #10b981; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 6px; }
    .out { background: #020617; padding: 12px; border-radius: 6px; font-family: monospace; color: #6ee7b7; margin-top: 10px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>🛡️ Nesne Güvenliği Laboratuvarı</h3>
    <button onclick="testGetterSetter()">1. Getter / Setter Doğrulama</button>
    <button onclick="testFreeze()" style="background:#06b6d4">2. Object.freeze() Testi</button>
    <div id="sonuc" class="out">Bir test seçin...</div>
  </div>

  <script>
    function testGetterSetter() {
      const kullanici = {
        _yas: 20,
        get yas() { return this._yas + " yaşında"; },
        set yas(yeniYas) {
          if (yeniYas < 0 || yeniYas > 120) {
            alert("Geçersiz yaş: " + yeniYas);
            return;
          }
          this._yas = yeniYas;
        }
      };

      let log = "Başlangıç: " + kullanici.yas + "\\n";
      kullanici.yas = 28;
      log += "kullanici.yas = 28 yapıldı -> " + kullanici.yas + "\\n";
      kullanici.yas = -5; // Doğrulama engeller!
      log += "kullanici.yas = -5 denendi -> Engellendi: " + kullanici.yas;
      document.getElementById('sonuc').innerText = log;
    }

    function testFreeze() {
      const config = { api: "https://api.site.com", timeout: 5000 };
      Object.freeze(config);

      let log = "Object.isFrozen(config) -> " + Object.isFrozen(config) + "\\n";
      config.timeout = 9999; // Dondurulduğu için değişmez
      config.yeniAyar = "test"; // Yeni özellik eklenemez
      log += "Değiştirme denemesi sonrası timeout -> " + config.timeout + "\\n";
      log += "yeniAyar eklendi mi? -> " + config.yeniAyar;
      document.getElementById('sonuc').innerText = log;
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[SETTER] Yaş doğrulama kontrolü negatif değeri engelledi.",
        "[FREEZE] Object.freeze() nesneyi salt-okunur hale getirdi.",
      ],
    },
    quiz: {
      question: "Object.freeze() ile Object.seal() arasındaki fark nedir?",
      options: [
        "A) freeze ile özellik değerleri değiştirilemezken, seal ile mevcut özelliklerin değerleri değiştirilebilir",
        "B) seal nesneyi siler, freeze nesneyi kopyalar",
        "C) freeze sadece dizilerde çalışır, seal nesnelerde çalışır",
        "D) seal yeni özellik eklenmesine izin verir",
      ],
      correctIndex: 0,
      explanation: "Doğru! Hem freeze hem seal yeni özellik eklenmesini ve silinmesini engeller. Ancak seal mevcut özelliklerin değerlerinin değiştirilmesine izin verirken, freeze tüm nesneyi tamamen salt-okunur (read-only) yapar.",
    },
  },

  // ========================================================
  // 5. YİNELEYİCİLER & ÜRETEÇLER (ITERATORS & GENERATORS)
  // ========================================================
  "js-iterators-generators": {
    id: "js-iterators-generators",
    badge: "Modül 2 • Kontrol Akışı & Yineleyiciler",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "Yineleyiciler ve Üreteç Fonksiyonlar (Iterators & Generators)",
    subtitle: "Symbol.iterator protokolü, function* sözdizimi, yield ile duraklatılabilir fonksiyonlar ve tembel değerlendirme (lazy evaluation).",
    sections: [
      {
        title: "1. Yineleme Protokolü (Iteration Protocol) Nedir?",
        content: `JavaScript'te bir nesnenin \`for...of\` döngüsüyle dolaşılabilmesi için **Iterable** protokolünü uygulaması gerekir. Bu, nesnenin \`[Symbol.iterator]()\` adında bir metoda sahip olması ve bu metodun her çağrıda \`{ value, done }\` nesnesi döndüren bir **Iterator** üretmesi anlamına gelir.

Diziler, String'ler, Set ve Map yapıları varsayılan olarak yerleşik Iterable protokolüne sahiptir.`,
      },
      {
        title: "2. Üreteç Fonksiyonlar (Generator Functions: function* ve yield)",
        content: `Standart fonksiyonlar çağrıldığında baştan sona tek seferde çalışır ve biter. **Üreteç fonksiyonlar (\`function*\`)** ise çalışması istendiğinde duraklatılabilen ve sonradan kaldığı yerden devam ettirilebilen özel fonksiyonlardır:

- **\`yield\`:** Fonksiyonun çalışmasını duraklatır ve dışarıya bir değer fırlatır.
- **\`next()\`:** Üreteci bir sonraki \`yield\` ifadesine kadar çalıştırır.
- **Tembel Değerlendirme (Lazy Evaluation):** Değerler ancak istendiğinde üretilir. Bu sayede sonsuz seriler (ör. sonsuz kimlik üretici) bellek tüketmeden oluşturulabilir!`,
        code: {
          language: "javascript",
          caption: "generators.js - Sonsuz Sayaç ve Fibonacci",
          snippet: `function* idUretici() {
  let id = 1;
  while (true) {
    yield \`KULLANICI_\${id++}\`;
  }
}

const uretici = idUretici();
console.log(uretici.next().value); // "KULLANICI_1"
console.log(uretici.next().value); // "KULLANICI_2"
console.log(uretici.next().value); // "KULLANICI_3"`,
        },
      },
    ],
    playground: {
      title: "İnteraktif Fibonacci & Benzersiz ID Üreteci",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 12px; }
    button { background: #f59e0b; color: black; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 6px; }
    button:hover { background: #d97706; }
    .out { background: #020617; padding: 12px; border-radius: 6px; color: #fde68a; margin-top: 10px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>🌀 function* & yield Tembel Üreteç</h3>
    <button onclick="sonrakiFibonacci()">Sıradaki Fibonacci Sayısını Üret</button>
    <button onclick="fibonacciSifirla()" style="background:#64748b; color:white">Sıfırla</button>
    <div id="cikti" class="out">Başlamak için butona tıklayın...</div>
  </div>

  <script>
    function* fibonacciSerisi() {
      let a = 0, b = 1;
      while (true) {
        yield a;
        [a, b] = [b, a + b];
      }
    }

    let fibGen = fibonacciSerisi();
    let uretilenler = [];

    function sonrakiFibonacci() {
      const adim = fibGen.next();
      uretilenler.push(adim.value);
      document.getElementById('cikti').innerText = 
        "Son Üretilen: " + adim.value + "\\n" +
        "Seri: " + uretilenler.join(", ") + "\\n" +
        "Durum: { value: " + adim.value + ", done: " + adim.done + " }";
    }

    function fibonacciSifirla() {
      fibGen = fibonacciSerisi();
      uretilenler = [];
      document.getElementById('cikti').innerText = "Seri sıfırlandı.";
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[GENERATOR] yield ile sıradaki Fibonacci sayısı istendiğinde hesaplandı.",
        "[LAZY] Sonsuz döngü hafızayı doldurmadan adım adım ilerledi.",
      ],
    },
    quiz: {
      question: "Bir üreteç fonksiyonundan (Generator) değer döndürmek ve fonksiyonu duraklatmak için hangi anahtar kelime kullanılır?",
      options: ["A) pause", "B) yield", "C) wait", "D) defer"],
      correctIndex: 1,
      explanation: "Doğru! 'yield' anahtar kelimesi üreteç fonksiyonunun çalışmasını duraklatır, çağırana { value, done } nesnesi döndürür ve bir sonraki next() çağrısına kadar fonksiyonun durumunu hafızada saklar.",
    },
  },

  // ========================================================
  // 6. TARAYICI NESNE MODELİ (BOM)
  // ========================================================
  "js-bom": {
    id: "js-bom",
    badge: "Modül 7 • BOM & Depolama",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Tarayıcı Nesne Modeli (BOM: Window, Screen, Location, History)",
    subtitle: "Web sayfasının ötesi: Pencere boyutları, URL manipülasyonu, tarayıcı geçmişi ve kullanıcı bilgileri.",
    sections: [
      {
        title: "1. BOM (Browser Object Model) Nedir?",
        content: `DOM HTML dökümanını temsil ederken, **BOM (Tarayıcı Nesne Modeli)** doğrudan web tarayıcısının kendisiyle (pencere, ekran, URL adresi, geri/ileri geçmişi) etkileşime girmemizi sağlar.

BOM'un merkezinde en üst düzey global nesne olan **\`window\`** yer alır. \`document\`, \`navigator\`, \`location\`, \`history\` ve \`screen\` nesneleri \`window\`'un alt özellikleridir.`,
      },
      {
        title: "2. Temel BOM Nesneleri ve Görevleri",
        content: `- **\`window.location\`:** Mevcut sayfanın URL bilgilerini tutar.
  - \`location.href\`: Tam URL adresi (değiştirilirse yeni sayfaya yönlendirir).
  - \`location.pathname\`, \`location.search\` (query string), \`location.reload()\`.
- **\`window.history\`:** Kullanıcının tarayıcı geçmişini yönetir.
  - \`history.back()\`, \`history.forward()\`, \`history.pushState()\` (SPA yönlendirmeleri).
- **\`window.navigator\`:** Tarayıcı ve işletim sistemi hakkında meta bilgiler verir.
  - \`navigator.userAgent\`, \`navigator.language\`, \`navigator.onLine\` (internet bağlantı durumu).
- **\`window.screen\`:** Kullanıcının fiziksel ekran çözünürlüğünü verir (\`screen.width\`, \`screen.height\`).`,
        code: {
          language: "javascript",
          caption: "bom-operations.js",
          snippet: `// İnternet bağlantı durumunu dinleme
window.addEventListener("online", () => console.log("İnternet bağlandı!"));
window.addEventListener("offline", () => console.warn("İnternet koptu!"));

// URL parametresi okuma
const urlParams = new URLSearchParams(window.location.search);
const tema = urlParams.get("theme") || "dark";`,
        },
      },
    ],
    playground: {
      title: "Canlı Tarayıcı (BOM) Teşhis Paneli",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .card { background: #1e293b; padding: 12px; border-radius: 8px; border: 1px solid #334155; }
    .val { color: #38bdf8; font-weight: bold; font-family: monospace; }
    button { background: #0284c7; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; margin-top: 10px; }
  </style>
</head>
<body>
  <h3>🖥️ Canlı BOM Teşhis Paneli</h3>
  <div class="grid">
    <div class="card">
      <div>Pencere İç Boyutu (Viewport):</div>
      <div id="viewport" class="val">-</div>
    </div>
    <div class="card">
      <div>Fiziksel Ekran Çözünürlüğü:</div>
      <div id="screen" class="val">-</div>
    </div>
    <div class="card">
      <div>Tarayıcı Dili & Çevrimiçi Durum:</div>
      <div id="nav" class="val">-</div>
    </div>
    <div class="card">
      <div>Mevcut URL & Protokol:</div>
      <div id="url" class="val">-</div>
    </div>
  </div>
  <button onclick="yenileBOM()">Bilgileri Güncelle</button>

  <script>
    function yenileBOM() {
      document.getElementById('viewport').innerText = 
        window.innerWidth + " x " + window.innerHeight + " px";
      
      document.getElementById('screen').innerText = 
        screen.width + " x " + screen.height + " px (Kullanılabilir: " + screen.availWidth + "x" + screen.availHeight + ")";
      
      document.getElementById('nav').innerText = 
        navigator.language + " | Çevrimiçi: " + (navigator.onLine ? "EVET ✅" : "HAYIR ❌");

      document.getElementById('url').innerText = 
        window.location.protocol + "//" + window.location.host;
    }
    yenileBOM();
    window.addEventListener('resize', yenileBOM);
  </script>
</body>
</html>`,
      expectedOutput: [
        "[BOM] window.innerWidth ve innerHeight dinamik olarak okundu.",
        "[NAVIGATOR] navigator.language ve online durumu doğrulandı.",
      ],
    },
    quiz: {
      question: "Mevcut sayfayı yeniden yüklemek (refresh) için hangi BOM metodu kullanılır?",
      options: [
        "A) window.location.reload()",
        "B) window.history.refresh()",
        "C) document.restart()",
        "D) navigator.reloadPage()",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'window.location.reload()' metodu mevcut sayfayı sunucudan veya tarayıcı önbelleğinden yeniden yükler.",
    },
  },

  // ========================================================
  // 7. ÇEREZLER (COOKIES) VE GÜVENLİK
  // ========================================================
  "js-cookies": {
    id: "js-cookies",
    badge: "Modül 7 • BOM & Depolama",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Tarayıcı Çerezleri ve Güvenlik (document.cookie vs Storage)",
    subtitle: "document.cookie yönetimi, max-age, path, SameSite, Secure, HttpOnly ve Web Storage karşılaştırması.",
    sections: [
      {
        title: "1. Çerez (Cookie) Nedir?",
        content: `Çerezler (Cookies), tarayıcıda saklanan ve **her HTTP isteğiyle birlikte otomatik olarak sunucuya gönderilen** küçük metin parçalarıdır (maksimum ~4KB). Genellikle oturum kimliği (Session ID), kimlik doğrulama token'ları ve kullanıcı tercihleri için kullanılır.`,
      },
      {
        title: "2. document.cookie Formatı ve Nitelikleri",
        content: `JavaScript ile çerez oluştururken anahtar-değer çiftinin yanına güvenlik nitelikleri eklenir:
\`document.cookie = "token=xyz123; max-age=86400; path=/; SameSite=Strict; Secure";\`

- **\`max-age\` (veya \`expires\`):** Çerezin saniye cinsinden ömrü (ör. 86400 = 1 gün). Belirtilmezse oturum kapandığında silinir (Session Cookie).
- **\`path=/;\`:** Çerezin tüm web sitesi dizinlerinde geçerli olmasını sağlar.
- **\`Secure\`:** Yalnızca HTTPS üzerinden aktarılmasını zorunlu kılar.
- **\`SameSite=Strict | Lax\`:** CSRF (Siteler Arası İstek Sahteciliği) saldırılarını engeller.
- **\`HttpOnly\`:** Bu bayrak sunucu tarafından HTTP başlığında (\`Set-Cookie\`) verilir; JavaScript ile \`document.cookie\` üzerinden okunamaz (XSS saldırılarına karşı oturum token'ı korur).`,
      },
      {
        title: "3. Cookie vs LocalStorage vs SessionStorage Karşılaştırması",
        content: `| Özellik | Cookie | LocalStorage | SessionStorage |
|---|---|---|---|
| **Kapasite** | ~4 KB | ~5 MB | ~5 MB |
| **Sunucuya Gönderim** | Her HTTP isteğinde otomatik | Asla gönderilmez (istemcide kalır) | Asla gönderilmez |
| **Yaşam Süresi** | Manuel süre (max-age) | Manuel silinene kadar sonsuz | Sekme kapatıldığında silinir |
| **Erişim Kapsamı** | Tüm sekmeler & pencereler | Tüm sekmeler (aynı origin) | Sadece aynı sekme |`,
      },
    ],
    playground: {
      title: "Canlı Çerez (Cookie) Yöneticisi Laboratuvarı",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 12px; }
    input { background: #0f172a; border: 1px solid #475569; color: white; padding: 8px; border-radius: 6px; width: calc(50% - 10px); margin-bottom: 10px; }
    button { background: #10b981; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 6px; }
    .out { background: #020617; padding: 12px; border-radius: 6px; font-family: monospace; color: #6ee7b7; margin-top: 10px; font-size: 13px; min-height: 40px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>🍪 Canlı Çerez (Cookie) Yöneticisi</h3>
    <input id="cKey" placeholder="Anahtar (ör: kullanici_tema)" value="kullanici_tema" />
    <input id="cVal" placeholder="Değer (ör: dark)" value="dark" />
    <br/>
    <button onclick="cerezEkle()">Çerez Ekle (max-age=60s)</button>
    <button onclick="cerezleriListele()" style="background:#3b82f6">Çerezleri Oku</button>
    <button onclick="cerezSil()" style="background:#ef4444">Çerezi Sil</button>
    <div id="cikti" class="out">Mevcut çerezler bekleniyor...</div>
  </div>

  <script>
    function cerezEkle() {
      const k = document.getElementById('cKey').value.trim();
      const v = document.getElementById('cVal').value.trim();
      if (!k) return;
      // 60 saniyelik çerez ekle
      document.cookie = encodeURIComponent(k) + "=" + encodeURIComponent(v) + "; max-age=60; path=/; SameSite=Lax";
      cerezleriListele();
    }

    function cerezleriListele() {
      const c = document.cookie;
      document.getElementById('cikti').innerText = c ? "document.cookie:\\n" + c : "Hiç çerez bulunamadı (boş).";
    }

    function cerezSil() {
      const k = document.getElementById('cKey').value.trim();
      // Çerezi silmek için max-age=0 yapılır
      document.cookie = encodeURIComponent(k) + "=; max-age=0; path=/";
      cerezleriListele();
    }
    cerezleriListele();
  </script>
</body>
</html>`,
      expectedOutput: [
        "[COOKIE] document.cookie üzerinden anahtar-değer yazıldı.",
        "[MAX-AGE] max-age=0 yapılarak çerez tarayıcıdan temizlendi.",
      ],
    },
    quiz: {
      question: "Bir çerezi (Cookie) JavaScript ile hemen silmek için hangi yöntem kullanılır?",
      options: [
        "A) document.cookie.delete('anahtar')",
        "B) Çerezin max-age değerini 0 (veya geçmiş bir expires tarihi) olarak ayarlamak",
        "C) document.cookie = null yazmak",
        "D) window.cookies.clear() çağırmak",
      ],
      correctIndex: 1,
      explanation: "Doğru! Tarayıcıda bir çerezi silmenin standart yolu, aynı anahtar ve path ile çerezi yeniden tanımlayıp 'max-age=0' (veya geçmiş bir 'expires' tarihi) vermektir.",
    },
  },

  // ========================================================
  // 8. EVENT LOOP DERİNLEMESİNE: MICROTASKS VS MACROTASKS
  // ========================================================
  "js-event-loop": {
    id: "js-event-loop",
    badge: "Modül 8 • Asenkron JS & Event Loop",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Event Loop Derinlemesine: Call Stack, Microtasks & Macrotasks",
    subtitle: "Tek iş parçacıklı V8 motoru: Çağrı yığını, Web API'leri, Promise microtask kuyruğu ve çalıştırma öncelikleri.",
    sections: [
      {
        title: "1. JavaScript Nasıl Tek İş Parçacıklıdır (Single-Threaded)?",
        content: `JavaScript motoru aynı anda yalnızca TEK bir kod satırını çalıştırabilir (tek bir **Call Stack**'e sahiptir). Peki nasıl oluyor da aynı anda hem ağ istekleri yapıp hem kullanıcı tıklamalarına anında yanıt verebiliyor?

Cevap: Tarayıcının sağladığı **Event Loop (Olay Döngüsü)** mimarisidir! Ağ istekleri, zamanlayıcılar ve DOM olayları tarayıcının C++ tabanlı Web API'lerine devredilir. Tamamlanan işlemler kuyruğa atılır ve Call Stack boşaldığında sırayla çalıştırılır.`,
      },
      {
        title: "2. Görev Kuyrukları: Microtask vs Macrotask Önceliği",
        content: `Event Loop iki farklı kuyruk yönetir:
1. **Microtask Kuyruğu (Yüksek Öncelik):** \`Promise.then/catch/finally\`, \`queueMicrotask()\`, \`MutationObserver\`.
2. **Macrotask / Task Kuyruğu (Normal Öncelik):** \`setTimeout\`, \`setInterval\`, I/O, UI renderleme.

**ALTIN KURAL:** Call Stack boşaldığı anda, Event Loop yeni bir Macrotask çalıştırmadan önce **Microtask kuyruğundaki TÜM görevleri bitirmek ZORUNDADIR!** Bu yüzden \`setTimeout(..., 0)\` çağrılsa bile, \`Promise.resolve().then(...)\` her zaman \`setTimeout\`'tan önce çalışır!`,
        code: {
          language: "javascript",
          caption: "event-loop-puzzle.js",
          snippet: `console.log("1. Senkron");

setTimeout(() => {
  console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

console.log("2. Senkron");
// ÇIKTI SIRASI: 1 -> 2 -> 3 -> 4`,
        },
      },
      {
        title: "3. Promise Yardımcı Metotları Karşılaştırması",
        content: `- **\`Promise.all([p1, p2])\`:** Hepsi başarılı olursa sonuç dizisi döner. Tek bir hata olursa ANINDA reddedilir (Fail-Fast).
- **\`Promise.allSettled([p1, p2])\`:** Hata olsa bile tüm Promise'lerin sonuçlanmasını bekler; her birinin durumunu (\`status: 'fulfilled' | 'rejected'\`) raporlar.
- **\`Promise.race([p1, p2])\`:** İlk tamamlanan (başarılı ya da hatalı) Promise'in sonucunu döner.
- **\`Promise.any([p1, p2])\`:** İlk BAŞARILI olanı döner (hepsi hata verirse \`AggregateError\` fırlatır).`,
      },
    ],
    playground: {
      title: "Canlı Event Loop Öncelik Simülatörü",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 12px; }
    button { background: #8b5cf6; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    button:hover { background: #7c3aed; }
    .out { background: #020617; padding: 12px; border-radius: 6px; color: #c4b5fd; margin-top: 10px; font-size: 13px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <h3>⏱️ Event Loop Öncelik Yarışı</h3>
    <p>Senkron kod, setTimeout(0) ve Promise.then() arasındaki çalıştırma sırasını test edin.</p>
    <button onclick="calistirEventLoop()">Yarışı Başlat</button>
    <div id="cikti" class="out">Sonuç bekleniyor...</div>
  </div>

  <script>
    function calistirEventLoop() {
      const out = document.getElementById('cikti');
      out.innerText = "Yürütülüyor...\\n";
      const sira = [];

      sira.push("1. [Senkron] Fonksiyon başladı (Call Stack)");

      setTimeout(() => {
        sira.push("4. [Macrotask] setTimeout(fn, 0) çalıştı");
        out.innerText = sira.join("\\n");
      }, 0);

      Promise.resolve().then(() => {
        sira.push("3. [Microtask] Promise.then() çalıştı (setTimeout'u geçti!)");
        out.innerText = sira.join("\\n");
      });

      sira.push("2. [Senkron] Fonksiyon bitti (Call Stack)");
      out.innerText = sira.join("\\n");
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[CALL STACK] Senkron satırlar önce çalıştı.",
        "[MICROTASKS] Promise microtask kuyruğu macrotask'tan önce tüketildi.",
        "[MACROTASKS] setTimeout görevi en son çalıştırıldı.",
      ],
    },
    quiz: {
      question: "Call Stack boşaldığında Event Loop hangi kuyruktaki görevleri diğerinden önce tüketmek zorundadır?",
      options: [
        "A) Macrotask kuyruğunu (setTimeout, setInterval)",
        "B) Microtask kuyruğunu (Promise.then, queueMicrotask)",
        "C) Rastgele bir sırayla çalıştırır",
        "D) Sadece UI render kuyruğunu",
      ],
      correctIndex: 1,
      explanation: "Doğru! Event Loop kurallarına göre Call Stack boşaldığında bir sonraki Macrotask'a geçmeden önce Microtask kuyruğundaki TÜM bekleyen görevler (Promise zincirleri) sırayla tamamen çalıştırılır.",
    },
  },

  // ========================================================
  // 9. AJAX, XMLHTTPREQUEST VE İLERİ JSON
  // ========================================================
  "js-ajax-json": {
    id: "js-ajax-json",
    badge: "Modül 8 • Asenkron JS & Event Loop",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "AJAX, XMLHttpRequest ve İleri JSON (reviver & replacer)",
    subtitle: "Web'in kökeni: AJAX mimarisi, XHR nesnesi readyState aşamaları, fetch farkı ve gelişmiş JSON filtreleme.",
    sections: [
      {
        title: "1. AJAX Nedir ve Web'i Nasıl Değiştirdi?",
        content: `**AJAX (Asynchronous JavaScript and XML)**, web sayfalarının tüm sayfayı yeniden yüklemeden (refresh yapmadan) arka planda sunucudan veri alıp kullanıcı arayüzünü dinamik güncellemesini sağlayan mimaridir (Google Maps ile 2005'te popülerleşti).`,
      },
      {
        title: "2. XMLHttpRequest (XHR) Nesnesi ve readyState",
        content: `Modern \`fetch()\` API'sinden önce web'in asenkron yükünü \`XMLHttpRequest\` nesnesi taşıyordu. Bir XHR isteği 5 farklı durumdan (\`readyState\`) geçer:
- **0 - UNSENT:** İstek nesnesi oluşturuldu (\`new XMLHttpRequest()\`).
- **1 - OPENED:** \`xhr.open(method, url)\` çağrıldı.
- **2 - HEADERS_RECEIVED:** Sunucu yanıt başlıkları geldi (\`send()\` sonrası).
- **3 - LOADING:** Yanıt gövdesi (response body) parça parça indiriliyor.
- **4 - DONE:** İstek tamamen bitti (\`status === 200\` ise başarılı).`,
        code: {
          language: "javascript",
          caption: "xhr-classic.js vs modern fetch",
          snippet: `// Klasik XHR Yöntemi
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1");
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const veri = JSON.parse(xhr.responseText);
    console.log("XHR Sonucu:", veri.title);
  }
};
xhr.send();`,
        },
      },
      {
        title: "3. İleri Düzey JSON: Replacer ve Reviver Fonksiyonları",
        content: `Çoğu yazılımcı \`JSON.stringify\` ve \`JSON.parse\` metotlarını tek argümanla kullanır. Ancak bu metotlar gelişmiş filtreleme ve dönüştürme parametrelerine sahiptir:
- **\`JSON.stringify(nesne, replacer, space)\`:** İkinci parametre bir dizi veya fonksiyon alarak hassas alanları (ör. şifre) gizleyebilir. Üçüncü parametre girinti (indentation) sağlar.
- **\`JSON.parse(metin, reviver)\`:** Ayrıştırma sırasında her anahtar-değer çiftini dönüştürür (ör. tarih dizgilerini otomatik \`Date\` nesnesine çevirmek).`,
      },
    ],
    playground: {
      title: "Klasik XHR vs Modern JSON Formatlayıcı",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 12px; }
    button { background: #0284c7; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 6px; }
    .out { background: #020617; padding: 12px; border-radius: 6px; color: #7dd3fc; margin-top: 10px; font-size: 13px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <h3>📡 XHR & İleri JSON Laboratuvarı</h3>
    <button onclick="calistirXHR()">1. XMLHttpRequest ile Veri Çek</button>
    <button onclick="calistirJSONFiltre()" style="background:#10b981">2. JSON.stringify Replacer Testi</button>
    <div id="sonuc" class="out">Bir test seçin...</div>
  </div>

  <script>
    function calistirXHR() {
      const out = document.getElementById('sonuc');
      out.innerText = "XHR Başlatılıyor (readyState: 0)...\\n";

      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1");
      
      xhr.onreadystatechange = function() {
        out.innerText += "readyState: " + xhr.readyState + " | HTTP Status: " + xhr.status + "\\n";
        if (xhr.readyState === 4 && xhr.status === 200) {
          const veri = JSON.parse(xhr.responseText);
          out.innerText += "\\n✅ Başarılı! Başlık: " + veri.title;
        }
      };
      xhr.send();
    }

    function calistirJSONFiltre() {
      const kullanici = {
        ad: "Selin Yılmaz",
        email: "selin@ornek.com",
        sifre: "cok_gizli_parola",
        yas: 29
      };

      // Replacer fonksiyonu: 'sifre' alanını maskele
      const filtrelenmis = JSON.stringify(kullanici, (anahtar, deger) => {
        if (anahtar === "sifre") return undefined; // Serileştirmeden çıkar
        return deger;
      }, 2);

      document.getElementById('sonuc').innerText = 
        "Güvenli JSON (Şifre filtrelendi):\\n" + filtrelenmis;
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[XHR] readyState 1 -> 2 -> 3 -> 4 geçişleri izlendi.",
        "[JSON] replacer fonksiyonu hassas şifre alanını serileştirmeden eledi.",
      ],
    },
    quiz: {
      question: "XMLHttpRequest nesnesinde readyState === 4 ne anlama gelir?",
      options: [
        "A) İstek henüz gönderilmedi (UNSENT)",
        "B) İstek sunucu tarafından reddedildi",
        "C) İstek tamamen tamamlandı ve yanıt alındı (DONE)",
        "D) Yalnızca başlıklar indirildi",
      ],
      correctIndex: 2,
      explanation: "Doğru! readyState değeri 4 olduğunda (DONE) istek tamamlanmış demektir. Bu aşamada HTTP durum kodu (status === 200) kontrol edilerek veriye erişilir.",
    },
  },

  // ========================================================
  // 10. WEB WORKERS & HTML5 CANVAS 2D
  // ========================================================
  "js-workers-canvas": {
    id: "js-workers-canvas",
    badge: "Modül 9 • Web API'leri & Grafikler",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Web Workers (Multithreading) ve HTML5 Canvas 2D",
    subtitle: "Tarayıcı arayüzünü dondurmadan arka planda ağır hesaplamalar yapma ve 2D piksel grafik manipülasyonu.",
    sections: [
      {
        title: "1. Web Workers: JavaScript'te Gerçek Çoklu İş Parçacığı",
        content: `JavaScript tek iş parçacıklı olduğu için ana thread üzerinde çalışan ağır bir matematiksel döngü (ör. 10 saniyelik görüntü işleme veya asal sayı hesabı) tüm web sayfasını kilitler; butonlar tıklanamaz ve animasyonlar donar.

**Web Workers**, ana iş parçacığından tamamen bağımsız, arka planda ayrı bir işletim sistemi thread'inde çalışan betiklerdir:
- Ana iş parçacığıyla yalnızca mesajlaşarak (**\`postMessage()\`** ve **\`onmessage\`**) haberleşir.
- Güvenlik ve çakışmaları engellemek için Web Worker'ların doğrudan DOM erişimi (\`window\`, \`document\`) YOKTUR.`,
      },
      {
        title: "2. HTML5 Canvas 2D API Temelleri",
        content: `\`<canvas>\` etiketi pikseller düzeyinde 2D grafik, oyun, veri görselleştirme ve çizim yapmamızı sağlayan bir tuvaldir:
- **\`const ctx = canvas.getContext('2d')\`**: Çizim bağlamını alır.
- **\`ctx.fillStyle = "renk"\`**, **\`ctx.fillRect(x, y, w, h)\`**: Dikdörtgen çizer.
- **\`ctx.beginPath()\`**, **\`ctx.arc(x, y, r, startAngle, endAngle)\`**: Daire çizer.
- **\`requestAnimationFrame(dongu)\`**: 60 FPS pürüzsüz donanım ivmeli animasyon döngüsü kurar.`,
        code: {
          language: "javascript",
          caption: "canvas-basic.js",
          snippet: `const canvas = document.getElementById("tuval");
const ctx = canvas.getContext("2d");

// Mavi dikdörtgen
ctx.fillStyle = "#3b82f6";
ctx.fillRect(20, 20, 150, 100);

// Kırmızı daire
ctx.beginPath();
ctx.arc(240, 70, 40, 0, Math.PI * 2);
ctx.fillStyle = "#ef4444";
ctx.fill();`,
        },
      },
    ],
    playground: {
      title: "Canvas 2D İnteraktif Çizim ve Animasyon Tuvali",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; }
    canvas { background: #020617; border: 1px solid #475569; border-radius: 6px; display: block; margin-top: 10px; cursor: crosshair; }
    button { background: #10b981; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 6px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>🎨 HTML5 Canvas 2D Top Zıplatma Animasyonu</h3>
    <button onclick="animasyonuBaslat()">Animasyonu Başlat / Durdur</button>
    <button onclick="tuvaliTemizle()" style="background:#64748b">Temizle</button>
    <canvas id="tuval" width="460" height="200"></canvas>
  </div>

  <script>
    const canvas = document.getElementById('tuval');
    const ctx = canvas.getContext('2d');
    let x = 50, y = 50, dx = 3, dy = 2, radius = 15;
    let animasyonId = null;

    function ciz() {
      ctx.fillStyle = "rgba(2, 6, 23, 0.3)"; // Hafif iz efekti
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#38bdf8";
      ctx.fill();
      ctx.closePath();

      // Kenar çarpma kontrolleri
      if (x + dx > canvas.width - radius || x + dx < radius) dx = -dx;
      if (y + dy > canvas.height - radius || y + dy < radius) dy = -dy;

      x += dx;
      y += dy;

      animasyonId = requestAnimationFrame(ciz);
    }

    function animasyonuBaslat() {
      if (animasyonId) {
        cancelAnimationFrame(animasyonId);
        animasyonId = null;
      } else {
        ciz();
      }
    }

    function tuvaliTemizle() {
      if (animasyonId) cancelAnimationFrame(animasyonId);
      animasyonId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  </script>
</body>
</html>`,
      expectedOutput: [
        "[CANVAS] getContext('2d') ile 2D render motoru hazırlandı.",
        "[ANIMATION] requestAnimationFrame ile 60 FPS donanım ivmeli çizim yapıldı.",
      ],
    },
    quiz: {
      question: "Web Worker'lar hakkında aşağıdakilerden hangisi DOĞRUDUR?",
      options: [
        "A) Web Worker'lar doğrudan document.getElementById ile DOM elemanlarını değiştirebilir",
        "B) Web Worker'lar arka planda ayrı bir thread'de çalışır ve ana iş parçacığıyla postMessage üzerinden haberleşir",
        "C) Web Worker'lar sadece CSS animasyonlarını çalıştırmak içindir",
        "D) Web Worker'lar yalnızca HTTPS olmayan sitelerde çalışır",
      ],
      correctIndex: 1,
      explanation: "Doğru! Web Worker'lar ana iş parçacığını kilitlememek için arka planda bağımsız bir thread olarak çalışır, doğrudan DOM erişimleri yoktur ve veri alışverişi postMessage / onmessage ile sağlanır.",
    },
  },

  // ========================================================
  // 11. STRICT MODE & BITWISE OPERATÖRLER
  // ========================================================
  "js-strict-mode-bitwise": {
    id: "js-strict-mode-bitwise",
    badge: "Modül 10 • İleri Seviye & Güvenlik",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "Katı Mod (Strict Mode) ve Bit Düzeyinde (Bitwise) Operatörler",
    subtitle: "\"use strict\" direktifi ile sessiz hataları önleme ve bit düzeyinde (&, |, ^, <<, >>) yetki maskeleme sistemleri.",
    sections: [
      {
        title: "1. Katı Mod (\"use strict\") Neden Kullanılmalıdır?",
        content: `JavaScript'in esnekliği bazen geliştiricileri büyük hatalara sürükler. Kod dosyasının veya bir fonksiyonun en başına \`"use strict";\` yazıldığında katı mod devreye girer:
- **Bildirimsiz Değişken Yasaktır:** \`x = 10;\` yazarsanız (\`let/const\` olmadan) normalde global \`window.x\` oluşturulurken, katı modda \`ReferenceError\` fırlatılır.
- **Salt Okunur Özellikler:** Değiştirilemez veya dondurulmuş bir özelliğe yazmaya çalışırsanız sessizce yok sayılmak yerine \`TypeError\` fırlatır.
- **Güvenli \`this\`:** Bir fonksiyon nesneye bağlı olmadan çağrıldığında \`this\` \`window\` nesnesi olmak yerine güvenli bir şekilde \`undefined\` olur.
- **Rezerve Kelimeler Korunur:** \`let\`, \`static\`, \`interface\`, \`package\` gibi gelecekteki anahtar kelimelerin değişken adı olarak kullanılması engellenir.`,
      },
      {
        title: "2. Bit Düzeyinde Operatörler (Bitwise Operators)",
        content: `Bitwise operatörler sayıları 32-bit ikilik (binary) sistemde değerlendirir:
- **\`&\` (Bitwise VE - AND):** Her iki bit de 1 ise 1 döner.
- **\`|\` (Bitwise VEYA - OR):** Bitlerden en az biri 1 ise 1 döner.
- **\`^\` (Bitwise XOR):** Bitler birbirinden farklıysa 1 döner.
- **\`~\` (Bitwise DEĞİL - NOT):** Bitleri tersine çevirir (\`~x = -(x + 1)\`).
- **\`<<\` ve \`>>\` (Bit Kaydırma):** Bitleri sola (2 ile çarpma) veya sağa (2'ye bölme) kaydırır.`,
        code: {
          language: "javascript",
          caption: "bitwise-permissions.js - Linux chmod Tarzı İzin Sistemi",
          snippet: `// Bit Bayrakları (Flags)
const OKUMA   = 1; // 0001
const YAZMA   = 2; // 0010
const YURUTME = 4; // 0100

// İzinleri birleştirme (|)
let kullaniciYetkisi = OKUMA | YAZMA; // 3 (0011)

// Yetki kontrolü (&)
const okuyabilirMi = (kullaniciYetkisi & OKUMA) !== 0; // TRUE
const calistirabilirMi = (kullaniciYetkisi & YURUTME) !== 0; // FALSE`,
        },
      },
    ],
    playground: {
      title: "Bitwise Yetki ve Bayrak (Flag) Simülatörü",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 12px; }
    label { display: block; margin-bottom: 8px; cursor: pointer; font-size: 14px; }
    input[type="checkbox"] { margin-right: 8px; }
    .out { background: #020617; padding: 12px; border-radius: 6px; color: #38bdf8; margin-top: 10px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>⚙️ Bitwise İzin Maskesi Hesaplayıcı</h3>
    <label><input type="checkbox" id="pRead" onchange="hesaplaYetki()" checked /> OKUMA (Read = 1, Binary 0001)</label>
    <label><input type="checkbox" id="pWrite" onchange="hesaplaYetki()" /> YAZMA (Write = 2, Binary 0010)</label>
    <label><input type="checkbox" id="pExecute" onchange="hesaplaYetki()" checked /> YÜRÜTME (Execute = 4, Binary 0100)</label>
    <div id="sonuc" class="out">Hesaplanıyor...</div>
  </div>

  <script>
    const READ = 1;
    const WRITE = 2;
    const EXECUTE = 4;

    function hesaplaYetki() {
      let mask = 0;
      if (document.getElementById('pRead').checked) mask |= READ;
      if (document.getElementById('pWrite').checked) mask |= WRITE;
      if (document.getElementById('pExecute').checked) mask |= EXECUTE;

      let bin = mask.toString(2).padStart(4, '0');
      let log = "Toplam Yetki Değeri (Decimal): " + mask + "\\n";
      log += "İkilik Karşılığı (Binary): 0b" + bin + "\\n\\n";
      log += "Kontroller:\\n";
      log += "- Okuma Yetkisi: " + ((mask & READ) ? "VAR ✅" : "YOK ❌") + "\\n";
      log += "- Yazma Yetkisi: " + ((mask & WRITE) ? "VAR ✅" : "YOK ❌") + "\\n";
      log += "- Yürütme Yetkisi: " + ((mask & EXECUTE) ? "VAR ✅" : "YOK ❌");

      document.getElementById('sonuc').innerText = log;
    }
    hesaplaYetki();
  </script>
</body>
</html>`,
      expectedOutput: [
        "[BITWISE] | operatörü ile izinler tek bir tam sayıda birleştirildi.",
        "[BITMASK] & operatörü ile izin bayrağı kontrol edildi.",
      ],
    },
    quiz: {
      question: "\"use strict\" katı modu devredeyken, 'let' veya 'const' olmadan bir değişkene değer atanırsa (ör. x = 50;) ne olur?",
      options: [
        "A) Otomatik olarak window nesnesine global değişken eklenir",
        "B) ReferenceError fırlatılır ve kod çalışması durdurulur",
        "C) Değişken otomatik olarak const kabul edilir",
        "D) Uyarı (console.warn) verilir ama çalışmaya devam eder",
      ],
      correctIndex: 1,
      explanation: "Doğru! Normal modda bildirimsiz değişkenler küresel kapsama sızarken, katı modda (strict mode) bu bir ReferenceError fırlatır ve hatanın hemen yakalanmasını sağlar.",
    },
  },

  // ========================================================
  // 12. PERFORMANS, DEBOUNCE, THROTTLE & DEBUGGING
  // ========================================================
  "js-performance-debugging": {
    id: "js-performance-debugging",
    badge: "Modül 10 • İleri Seviye & Güvenlik",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Performans Optimizasyonu, Debounce & Throttle",
    subtitle: "Olay frekansı sınırlama (arama kutusu vs pencere kaydırma), bellek sızıntıları ve profesyonel DevTools hata ayıklama.",
    sections: [
      {
        title: "1. Debounce vs Throttle: Neden Gereklidir?",
        content: `Kullanıcı klavyede her harfe bastığında (\`input\`), pencereyi her piksel kaydırdığında (\`scroll\`) veya yeniden boyutlandırdığında (\`resize\`) olay saniyede 60-100 kez tetiklenir. Her seferinde sunucuya API isteği göndermek sunucuyu çökertebilir ve tarayıcıyı kilitler.

- **Debounce:** Olay tetiklenmeyi bıraktıktan sonra belirli bir süre (\`wait\`) boyunca hiçbir yeni tetikleme olmazsa fonksiyonu **yalnızca 1 kez** çalıştırır (Örnek: Arama girdi kutusuna yazma bittiğinde API'ye sormak).
- **Throttle:** Olay ne kadar sık tetiklenirse tetiklensin, fonksiyonu en fazla belirli bir zaman aralığında (\`limit\`) **yalnızca 1 kez** çalışmaya zorlar (Örnek: Sonsuz kaydırma - Infinite Scroll).`,
        code: {
          language: "javascript",
          caption: "debounce-implementation.js",
          snippet: `function debounce(fonksiyon, gecikme = 300) {
  let zamanlayici;
  return function(...argumanlar) {
    clearTimeout(zamanlayici);
    zamanlayici = setTimeout(() => {
      fonksiyon.apply(this, argumanlar);
    }, gecikme);
  };
}`,
        },
      },
      {
        title: "2. JavaScript Bellek Sızıntıları (Memory Leaks)",
        content: `Kullanılmayan nesnelerin JavaScript Çöp Toplayıcısı (Garbage Collector) tarafından temizlenememesine **Memory Leak** denir:
- **Kapatılmamış Zamanlayıcılar:** Bileşen silinse bile çalışan \`setInterval\`.
- **Kaldırılmamış Dinleyiciler:** DOM'dan silinen elemanlara bağlı kalan \`addEventListener\`.
- **Kasıtsız Global Değişkenler:** \`window\` nesnesine bağlı unutulan büyük veri dizileri.`,
      },
      {
        title: "3. Profesyonel Hata Ayıklama (Debugging)",
        content: `- \`console.table(diziVerisi)\`: Verileri şık bir Excel tablosu gibi görüntüler.
- \`console.time("islem")\` ve \`console.timeEnd("islem")\`: Milisaniye cinsinden kod çalışma süresini ölçer.
- \`debugger;\`: Kodun arasına konulduğunda tarayıcı Geliştirici Araçları açıksa yürütmeyi anında durdurur ve satır satır inceleme sağlar.`,
      },
    ],
    playground: {
      title: "Canlı Debounce vs Standart Girdi Frekans Testi",
      filename: "index.html",
      language: "html",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155; }
    input { width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #475569; color: white; padding: 10px; border-radius: 6px; font-size: 15px; margin-bottom: 12px; }
    .counters { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .box { background: #020617; padding: 12px; border-radius: 6px; text-align: center; }
    .num { font-size: 28px; font-weight: bold; font-family: monospace; }
    .red { color: #f87171; }
    .green { color: #4ade80; }
  </style>
</head>
<body>
  <div class="card">
    <h3>⚡ Canlı Debounce Tasarruf Ölçer</h3>
    <p>Arama kutusuna hızlıca bir şeyler yazın ve tetiklenme sayılarını karşılaştırın:</p>
    <input id="aramaKutusu" placeholder="Buraya hızlıca yazın..." />
    <div class="counters">
      <div class="box">
        <div style="font-size:12px; color:#94a3b8">Normal Tetiklenme (Her Tuş):</div>
        <div id="standartSayac" class="num red">0</div>
      </div>
      <div class="box">
        <div style="font-size:12px; color:#94a3b8">Debounce (400ms Gecikmeli):</div>
        <div id="debounceSayac" class="num green">0</div>
      </div>
    </div>
  </div>

  <script>
    let standartSayi = 0;
    let debounceSayi = 0;
    let timer = null;

    const input = document.getElementById('aramaKutusu');
    const stdEl = document.getElementById('standartSayac');
    const debEl = document.getElementById('debounceSayac');

    input.addEventListener('input', () => {
      // 1. Normal her tuşta artar
      standartSayi++;
      stdEl.innerText = standartSayi;

      // 2. Debounce: 400ms sessizlik bekler
      clearTimeout(timer);
      timer = setTimeout(() => {
        debounceSayi++;
        debEl.innerText = debounceSayi;
      }, 400);
    });
  </script>
</body>
</html>`,
      expectedOutput: [
        "[DEBOUNCE] Her tuş vuruşu yerine yazma durduktan sonra tek istek tetiklendi.",
        "[PERFORMANCE] API çağrılarında %80+ gereksiz sunucu yükü önlendi.",
      ],
    },
    quiz: {
      question: "Kullanıcı bir arama çubuğuna yazarken her tuş vuruşunda değil, yazmayı bitirdikten 300ms sonra tek bir arama isteği göndermek için hangi teknik kullanılır?",
      options: [
        "A) Throttle",
        "B) Debounce",
        "C) Memoization",
        "D) Event Bubbling",
      ],
      correctIndex: 1,
      explanation: "Doğru! Debounce, son tetiklenmeden itibaren belirlenen süre boyunca yeni bir olay gelmediğinde fonksiyonu tek bir kez çalıştırır; arama girdi kutuları için idealdir.",
    },
  },
};
