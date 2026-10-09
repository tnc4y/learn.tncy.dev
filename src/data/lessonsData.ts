import { QuizQuestion } from "@/components/QuizExercise";
import { PlaygroundProps } from "@/components/CodePlayground";

export interface LessonContent {
  id: string;
  badge: string;
  readingTime: string;
  level: string;
  title: string;
  subtitle: string;
  sections: {
    title: string;
    content: string;
    callout?: {
      type: "info" | "warning" | "success" | "tip";
      title: string;
      message: string;
    };
    code?: {
      language: string;
      caption?: string;
      snippet: string;
    };
  }[];
  playground?: PlaygroundProps;
  quiz?: QuizQuestion;
}

export const LESSONS_DATA: Record<string, LessonContent> = {
  // ==========================================
  // SYSTEMVERILOG
  // ==========================================
  intro: {
    id: "intro",
    badge: "Modül 1 • Donanım Tasarımı",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "SystemVerilog Nedir? (Verilog vs SystemVerilog)",
    subtitle:
      "Modern mikroişlemcilerin, GPU'ların ve SoC'lerin donanım tasarımı ve doğrulanmasında endüstri standardı dil.",
    sections: [
      {
        title: "1. Çip Tasarımındaki İki Büyük Problem: Tasarım ve Doğrulama",
        content:
          "Günümüz modern çipleri milyarlarca transistör içerir. Bu devasa ölçek iki temel zorluk doğurur:\n\n1. **Tasarım (Design / RTL):** Donanımı hatasız, net ve sentezlenebilir (yani gerçek kapılara ve flip-flop'lara dönüşebilecek) şekilde tanımlamak.\n2. **Doğrulama (Verification):** Üretim bandına (Fab / Silikon) gönderilmeden önce, yazılan donanımın tasarlanan mantığa %100 uygun çalıştığını kanıtlamak.\n\nEski Verilog dili 1980'lerde küçük dijital devreler için geliştirilmişti. Ancak milyonlarca kapılı modern SoC dünyasında, nesne yönelimli doğrulama (OOP), kısıtlı rastgele test (CRV) ve fonksiyonel kapsama özellikleri eksik kalıyordu. İşte bu boşluğu doldurmak için **SystemVerilog**, IEEE 1800 standardı olarak doğdu.",
        callout: {
          type: "info",
          title: "Altın Kural: SystemVerilog Verilog'un Bir Üst Kümesidir",
          message:
            "Geçerli olan her Verilog kodu aynı zamanda geçerli bir SystemVerilog kodudur. Ancak SystemVerilog'un her özelliği (örneğin class, mailbox, randomize) sentezlenebilir değildir; bu soyut yapılar testbench (doğrulama) tarafına ayrılmıştır.",
        },
      },
      {
        title: "2. Verilog Neden Yetersiz Kaldı?",
        content:
          "Klasik Verilog'da `reg` ve `wire` ayrımı yeni başlayanlar ve karmaşık tasarımlar için sürekli kafa karışıklığı yaratırdı. Ayrıca `always` bloğu yanlış yazıldığında istemeden istenmeyen bir 'latch' üretilmesine sebep oluyordu.\n\nSystemVerilog bu sorunları şu yeniliklerle çözdü:\n- **`logic` Veri Tipi:** Hem `reg` hem de `wire` yerine geçebilen tek tip.\n- **Açık Sentez Blokları:** `always_comb` (kombinasyonel mantık), `always_ff` (flip-flop mantığı) ve `always_latch`.\n- **Nesne Yönelimli Programlama (OOP):** Doğrulama testbench'leri için sınıflar, kalıtım ve polimorfizm.\n- **Constrained Random Verification (CRV):** Milyonlarca rastgele test paketini otomatik üreten kısıt motoru.",
      },
      {
        title: "3. Tasarım (RTL) vs Doğrulama (Testbench) Karşılaştırması",
        content:
          "SystemVerilog öğrenirken hangi özelliğin silikona (donanıma) dönüşeceğini, hangi özelliğin ise sadece simülasyonda kalacağını bilmek çok önemlidir:",
        code: {
          language: "systemverilog",
          caption: "RTL vs Doğrulama Ayrımı",
          snippet: `// === SENTEZLENEBİLİR RTL TASARIMI (Donanım Olur) ===
module counter (
  input  logic       clk,
  input  logic       rst_n,
  output logic [3:0] count
);
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      count <= 4'b0;
    else
      count <= count + 1'b1;
  end
endmodule

// === TESTBENCH DOĞRULAMA KODU (Simülasyonda Çalışır, Silikon Olmaz) ===
class Packet;
  rand bit [3:0] data;
  constraint c_limit { data inside {[1:10]}; }
endclass`,
        },
      },
    ],
    playground: {
      title: "Deneysel Simülasyon: 4-Bitlik Sayıcı ve Testbench",
      initialCode: `// 4-Bit Sayıcı (DUT) ve Testbench Örneği
module tb;
  logic clk = 0;
  logic rst_n = 0;
  logic [3:0] count;

  // 10ns periyodlu saat sinyali üretimi
  always #5 clk = ~clk;

  // Sayıcı Mantığı (Kombinasyonel/Ardışıl)
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      count <= 4'h0;
    else
      count <= count + 1'b1;
  end

  // Testbench Uyaranı (Stimulus)
  initial begin
    $display("[START] SystemVerilog Simülasyonu Başladı!");
    #10 rst_n = 1; // Reset bırakıldı
    #40;
    $display("[FINISH] Test tamamlandı, Son count = %0d", count);
    $finish;
  end

  // Sinyal Değişimlerini İzleme
  always @(count) begin
    $display("[@%0tns] clk=%b, rst_n=%b => count = %0d (4'b%04b)", 
             $time, clk, rst_n, count, count);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Simulator: Icarus Verilog / Verilator",
        "[START] SystemVerilog Simülasyonu Başladı!",
        "[@0ns] clk=0, rst_n=0 => count = 0 (4'b0000)",
        "[@10ns] Reset bırakıldı, rst_n = 1",
        "[@15ns] clk=1, rst_n=1 => count = 1 (4'b0001)",
        "[@25ns] clk=1, rst_n=1 => count = 2 (4'b0010)",
        "[@35ns] clk=1, rst_n=1 => count = 3 (4'b0011)",
        "[@45ns] clk=1, rst_n=1 => count = 4 (4'b0100)",
        "[FINISH] Test tamamlandı, Son count = 4",
        "[SUCCESS] 0 Hata, Simülasyon başarıyla tamamlandı.",
      ],
      signals: [
        { name: "clk", wave: "010101010101" },
        { name: "rst_n", wave: "001111111111" },
        { name: "count[3:0]", wave: "======", data: ["0", "1", "2", "3", "4"] },
      ],
      notes:
        "Yukarıdaki kodda #5 ile saat periyodu, #10 ile reset zamanı kontrol edilir. Kodu istediğiniz gibi değiştirip 'Simülasyonu Çalıştır' diyebilirsiniz.",
    },
    quiz: {
      question:
        "Aşağıdaki SystemVerilog özelliklerinden hangisi sentezlenebilir (RTL) bir donanım oluşturmak için kullanılır?",
      codeSnippet: `A) class ve virtual methods
B) mailbox ve semaphore
C) always_ff ve logic
D) rand ve constraint`,
      options: [
        "A) class ve virtual methods",
        "B) mailbox ve semaphore",
        "C) always_ff ve logic",
        "D) rand ve constraint",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! 'always_ff' ve 'logic' sentezlenebilir RTL yapılarıdır ve fiziksel mantık kapılarına/flip-flop'lara dönüşür. 'class', 'mailbox' ve 'constraint' ise yalnızca doğrulama (testbench) amacıyla simülasyon ortamında kullanılır.",
    },
  },

  "testbench-basics": {
    id: "testbench-basics",
    badge: "Modül 1 • Donanım Tasarımı",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İlk Testbench ve Simülasyon Mantığı",
    subtitle:
      "Tasarımı test etmek için saat üretme, reset sürme ve $display, $monitor sistem fonksiyonları.",
    sections: [
      {
        title: "1. Testbench Nedir ve Neden Gereklidir?",
        content:
          "Testbench (Test Tezgahı), yazdığınız donanım modülünü (DUT - Design Under Test) çevreleyen ve ona sanal sinyaller uygulayan simülasyon kodudur.\n\nGerçek bir entegre devrede pinlere sinyal üreteci bağlamak neyse, simülatörde de testbench odur. Testbench'ler sentezlenmez; yani içerisindeki `#delay` gibi zamanlama ifadeleri donanım kapısına dönüşmez.",
        callout: {
          type: "tip",
          title: "DUT (Design Under Test)",
          message:
            "Test edilen asıl donanım modülüne endüstride genellikle DUT (Design Under Test) veya DUV (Design Under Verification) adı verilir.",
        },
      },
      {
        title: "2. Zamanlama Fonksiyonları ve Loglama",
        content:
          "SystemVerilog'da testbench akışını izlemek için yerleşik sistem görevleri (System Tasks) kullanılır:\n- `$time`: Geçerli simülasyon zamanını döndürür.\n- `$display`: Konsola biçimlendirilmiş metin yazdırır (C dilindeki `printf` gibi).\n- `$monitor`: Argüman olarak verilen sinyallerden herhangi biri değiştiğinde otomatik olarak ekrana yazdırır.\n- `$finish`: Simülasyonu sonlandırır.",
        code: {
          language: "systemverilog",
          caption: "$display ve $monitor Kullanımı",
          snippet: `initial begin
  // Sinyal değiştikçe otomatik tetiklenir:
  $monitor("[Zaman: %0t] a=%b, b=%b => sum=%b", $time, a, b, sum);
end`,
        },
      },
    ],
    playground: {
      title: "İnteraktif 2-Girişli Toplayıcı (Adder) Testbench'i",
      initialCode: `// 2-Bit Toplayıcı DUT ve Testbench
module adder_tb;
  logic [1:0] a, b;
  logic [2:0] sum;

  // DUT Örnekleme (Bağlantı)
  assign sum = a + b;

  initial begin
    $display("=== TOPLAYICI TESTİ BAŞLADI ===");
    
    a = 2'd1; b = 2'd1;
    #10;
    $display("[@%0tns] Test 1: %0d + %0d = %0d (Beklenen: 2)", $time, a, b, sum);

    a = 2'd2; b = 2'd3;
    #10;
    $display("[@%0tns] Test 2: %0d + %0d = %0d (Beklenen: 5)", $time, a, b, sum);

    a = 2'd3; b = 2'd3;
    #10;
    $display("[@%0tns] Test 3: %0d + %0d = %0d (Beklenen: 6)", $time, a, b, sum);

    $display("=== TÜM TESTLER BAŞARIYLA GEÇTİ ===");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling adder_tb.sv...",
        "=== TOPLAYICI TESTİ BAŞLADI ===",
        "[@10ns] Test 1: 1 + 1 = 2 (Beklenen: 2)",
        "[@20ns] Test 2: 2 + 3 = 5 (Beklenen: 5)",
        "[@30ns] Test 3: 3 + 3 = 6 (Beklenen: 6)",
        "=== TÜM TESTLER BAŞARIYLA GEÇTİ ===",
        "[SUCCESS] 0 Hata, Simülasyon bitti.",
      ],
      signals: [
        { name: "a[1:0]", wave: "======", data: ["1", "1", "2", "2", "3", "3"] },
        { name: "b[1:0]", wave: "======", data: ["1", "1", "3", "3", "3", "3"] },
        { name: "sum[2:0]", wave: "======", data: ["2", "2", "5", "5", "6", "6"] },
      ],
      notes: "Test girdilerini (a ve b) değiştirerek toplayıcının çıktısını konsoldan kontrol edin.",
    },
    quiz: {
      question:
        "$monitor ile $display sistem fonksiyonları arasındaki temel fark nedir?",
      options: [
        "A) $monitor sadece dosyalara yazar, $display ekrana yazar.",
        "B) $display çağrıldığı anda 1 kez yazar, $monitor ise izlenen sinyal her değiştiğinde otomatik yazar.",
        "C) $display sentezlenebilir, $monitor sentezlenemez.",
        "D) İkisi arasında hiçbir fark yoktur.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! $display sadece o satır çalıştığı anda tek seferlik çıktı verirken; $monitor kendisine parametre olarak verilen sinyalleri izler ve değerleri her değiştiğinde otomatik olarak ekrana yazar.",
    },
  },

  "logic-type": {
    id: "logic-type",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "5 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "4-Durumlu Mantık: logic Veri Tipi",
    subtitle:
      "Verilog'daki kafa karıştırıcı reg ve wire ayrımına son veren modern çözüm: logic.",
    sections: [
      {
        title: "1. 4-Durumlu (4-State) Mantık Nedir?",
        content:
          "Dijital donanım dünyasında bir hat sadece `0` ve `1` değerini almaz. Donanımı doğru modellemek için 4 durum gereklidir:\n\n- **`0`**: Mantıksal Sıfır (Düşük Gerilim / GND)\n- **`1`**: Mantıksal Bir (Yüksek Gerilim / VDD)\n- **`X`**: Bilinmeyen Değer (Unknown / Çakışma / Başlatılmamış)\n- **`Z`**: Yüksek Empedans (High-Z / Açık Devre / Tristate / Sürücüsüz)\n\nVerilog'da atanacak yere göre `wire` mı yoksa `reg` mi kullanılacağı sürekli hata kaynağıydı. SystemVerilog **`logic`** tipini getirerek bu karmaşayı bitirdi.",
        callout: {
          type: "success",
          title: "Tek Bir Tip: logic",
          message:
            "SystemVerilog'da artık neredeyse her yerde sadece 'logic' kullanabilirsiniz! Hem prosedürel bloklar (always) hem de sürekli atamalar (assign) içinde doğrudan 'logic' kullanılabilir.",
        },
      },
    ],
    playground: {
      title: "4-Durumlu Mantık ve logic Deneme Alanı",
      initialCode: `module logic_demo;
  logic [3:0] sig_a; // 4-bit logic
  logic [3:0] sig_b;

  initial begin
    $display("[@%0tns] Başlangıç Değeri: sig_a = %b", $time, sig_a);
    #10 sig_a = 4'b1010;
    #10 sig_b = 4'b0011;
    #10;
    $display("[@%0tns] sig_a = %b, sig_b = %b", $time, sig_a, sig_b);
    $display("[@%0tns] VE Mantığı (sig_a & sig_b) = %b", $time, sig_a & sig_b);
    $display("[@%0tns] VEYA Mantığı (sig_a | sig_b) = %b", $time, sig_a | sig_b);
    #10 sig_a = 4'b1x0z;
    $display("[@%0tns] 4-Durumlu Değer: sig_a = %b", $time, sig_a);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling logic_demo.sv...",
        "[@0ns] Başlangıç Değeri: sig_a = xxxx",
        "[@30ns] sig_a = 1010, sig_b = 0011",
        "[@30ns] VE Mantığı (sig_a & sig_b) = 0010",
        "[@30ns] VEYA Mantığı (sig_a | sig_b) = 1011",
        "[@40ns] 4-Durumlu Değer: sig_a = 1x0z",
        "[SUCCESS] Test başarıyla tamamlandı.",
      ],
      signals: [
        { name: "sig_a[3:0]", wave: "======", data: ["xxxx", "1010", "1010", "1x0z"] },
        { name: "sig_b[3:0]", wave: "======", data: ["xxxx", "xxxx", "0011", "0011"] },
      ],
      notes: "Değer atanmamış bir 4-durumlu sinyal her zaman 'x' olarak başlar. Farklı değerler atayarak test edin.",
    },
    quiz: {
      question:
        "SystemVerilog'da başlatılmamış (değer verilmemiş) bir 'logic' değişkeninin varsayılan değeri nedir?",
      options: [
        "A) 0",
        "B) 1",
        "C) X (Bilinmeyen / Unknown)",
        "D) Z (Yüksek Empedans / High-Z)",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! 'logic' 4-durumlu bir veri tipidir ve değer atanmadığında varsayılan olarak 'X' (Bilinmeyen) durumundadır.",
    },
  },

  // ==========================================
  // WEB GELİŞTİRME (HTML, CSS, JS)
  // ==========================================
  "html-intro": {
    id: "html-intro",
    badge: "Web Geliştirme • HTML5",
    readingTime: "5 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "HTML5 Temelleri ve Sayfa İskeleti",
    subtitle:
      "Modern web sayfalarının yapı taşı: Semantik etiketler, başlıklar, paragraflar ve formlar.",
    sections: [
      {
        title: "1. HTML Nedir ve Nasıl Çalışır?",
        content:
          "HTML (HyperText Markup Language), web tarayıcılarına bir sayfanın içeriğini nasıl yapılandıracağını söyleyen standart işaretleme dilidir. HTML bir programlama dili değil, bir işaretleme (markup) dilidir.\n\nModern HTML5 ile gelen `<header>`, `<nav>`, `<main>`, `<article>` ve `<footer>` gibi semantik etiketler hem arama motoru optimizasyonu (SEO) hem de ekran okuyucular için kritik öneme sahiptir.",
        callout: {
          type: "tip",
          title: "Semantik HTML",
          message:
            "Sadece `<div>` kullanmak yerine amacını belirten `<section>`, `<nav>`, `<header>` etiketlerini kullanmak web standartlarına uygun temiz kod üretir.",
        },
        code: {
          language: "html",
          caption: "Standart HTML5 Belge İskeleti",
          snippet: `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8">
    <title>İlk Web Sayfam</title>
  </head>
  <body>
    <header>
      <h1>Hoş Geldiniz!</h1>
    </header>
    <main>
      <p>learn.tncy.dev ile web geliştirmeyi keşfedin.</p>
    </main>
  </body>
</html>`,
        },
      },
    ],
    quiz: {
      question: "HTML5 belgesinin standart bir HTML5 sayfası olduğunu tarayıcıya bildiren ilk bildirim hangisidir?",
      options: [
        "A) <html version='5'>",
        "B) <!DOCTYPE html>",
        "C) <meta charset='utf-8'>",
        "D) <head>",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! '<!DOCTYPE html>' bildirimi tarayıcının sayfayı modern HTML5 standart modunda (Standards Mode) işlemesini sağlar.",
    },
  },

  "css-intro": {
    id: "css-intro",
    badge: "Web Geliştirme • CSS3",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "CSS3 Temelleri & Flexbox Düzeni",
    subtitle:
      "Web sayfalarına stil kazandırma: Renkler, tipografi, kutu modeli (box-model) ve modern Flexbox.",
    sections: [
      {
        title: "1. Kutu Modeli (Box Model) ve Flexbox",
        content:
          "CSS'de her eleman bir dikdörtgen kutudur: Content (içerik), Padding (iç boşluk), Border (kenarlık) ve Margin (dış boşluk).\n\nModern CSS'in en güçlü hizalama aracı olan **Flexbox** (`display: flex`), elemanları tek bir eksende (yatay veya dikey) kusursuz şekilde hizalamayı ve alan dağıtmayı sağlar.",
        code: {
          language: "css",
          caption: "Flexbox ile Ortalanmış Modern Kart Düzeni",
          snippet: `.container {
  display: flex;
  justify-content: center; /* Yatay ortalama */
  align-items: center;     /* Dikey ortalama */
  gap: 1.5rem;             /* Elemanlar arası boşluk */
}

.card {
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #1e1e2e;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
      explanation:
        "Doğru! 'justify-content' ana eksendeki (main-axis) hizalamayı belirler; 'align-items' ise çapraz eksendeki (cross-axis) hizalamayı kontrol eder.",
    },
  },

  "js-intro": {
    id: "js-intro",
    badge: "Web Geliştirme • JavaScript",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Modern JavaScript (ES6+) ve DOM Manipülasyonu",
    subtitle:
      "Sayfalara can verme: let/const, arrow fonksiyonlar, olay dinleyiciler ve asenkron veri çekme.",
    sections: [
      {
        title: "1. Modern Değişkenler ve DOM Olayları",
        content:
          "JavaScript, web sayfalarını dinamik hale getiren etkileşim motorudur. ES6 ile gelen `const` (sabit) ve `let` (kapsam değişkeni) eski `var` anahtar kelimesinin yerini almıştır.\n\nDOM (Document Object Model) sayesinde web sayfasındaki butonlara tıklama, form gönderme veya klavye tuşlarına basma gibi olaylar dinlenebilir.",
        code: {
          language: "javascript",
          caption: "Olay Dinleme ve Dinamik Güncelleme",
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
      explanation:
        "Doğru! 'const' anahtar kelimesiyle tanımlanan değişkenler sabittir ve yeniden atama (reassignment) yapılamaz.",
    },
  },

  // ==========================================
  // GÖMÜLÜ SİSTEMLER (C, MICROPYTHON, ARDUINO)
  // ==========================================
  "embedded-c-intro": {
    id: "embedded-c-intro",
    badge: "Gömülü Sistemler • C",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Gömülü C ve Bit Düzeyinde Donanım Kontrolü",
    subtitle:
      "Mikrodenetleyici register erişimi: Bitwise mantık operatörleri, işaretçiler (pointers) ve volatile.",
    sections: [
      {
        title: "1. Bit Düzeyinde Register Manipülasyonu",
        content:
          "Gömülü C dünyasında en sık yapılan işlem, mikrodenetleyicinin çevre birimi (GPIO, Timer, ADC) register'larındaki tek bir biti 1 veya 0 yapmaktır.\n\nBir register'daki diğer bitleri bozmadan belirli bir biti 1 yapmak için mantıksal VEYA (`|`), 0 yapmak için ters VE (`& ~`) ve terslemek (toggle) için XOR (`^`) operatörü kullanılır.",
        code: {
          language: "c",
          caption: "Standart Bit Operatörleri",
          snippet: `// PIN 5'i 1 yap (Bit Set):
PORTB |= (1 << 5);

// PIN 5'i 0 yap (Bit Clear):
PORTB &= ~(1 << 5);

// PIN 5'in durumunu tersle (Bit Toggle):
PORTB ^= (1 << 5);

// PIN 5'in 1 olup olmadığını kontrol et:
if (PINB & (1 << 5)) {
  // Pin lojik 1 durumunda
}`,
        },
      },
    ],
    quiz: {
      question: "Gömülü C'de bir register içindeki 3. biti diğer bitleri değiştirmeden '1' yapmak için hangi ifade kullanılır?",
      options: [
        "A) REG &= (1 << 3);",
        "B) REG |= (1 << 3);",
        "C) REG ^= (1 << 3);",
        "D) REG = 3;",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 'REG |= (1 << 3);' ifadesi bitwise OR mantığıyla 3. biti 1 yapar ve diğer tüm bitleri olduğu gibi korur.",
    },
  },

  "micropython-intro": {
    id: "micropython-intro",
    badge: "Gömülü Sistemler • MicroPython",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "MicroPython ile ESP32 & Pico Donanım Kontrolü",
    subtitle:
      "Python sadeliği mikrodenetleyicilerde: machine modülü, GPIO kontrolü ve zamanlama döngüleri.",
    sections: [
      {
        title: "1. machine.Pin ile Donanım Sürme",
        content:
          "MicroPython, CPython 3'ün mikrodenetleyiciler için hafifletilmiş açık kaynaklı sürümüdür. `machine` kütüphanesi donanıma doğrudan erişim sağlar.",
        code: {
          language: "python",
          caption: "ESP32 Dahili LED Yanıp Sönme (Blink)",
          snippet: `from machine import Pin
import time

led = Pin(2, Pin.OUT) # GPIO2 LED çıkışı

while True:
    led.value(1) # LED Aç
    time.sleep(0.5)
    led.value(0) # LED Kapat
    time.sleep(0.5)`,
        },
      },
    ],
    quiz: {
      question: "MicroPython'da bir GPIO pinini çıkış (output) olarak yapılandırmak için hangi sınıf ve parametre kullanılır?",
      options: [
        "A) gpio.setOutput(pin)",
        "B) Pin(pin_no, Pin.OUT)",
        "C) digital.write(pin, HIGH)",
        "D) port.direction('out')",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! MicroPython'da 'machine.Pin(pin_no, Pin.OUT)' ifadesi ilgili pini dijital çıkış olarak konfigüre eder.",
    },
  },

  "arduino-intro": {
    id: "arduino-intro",
    badge: "Gömülü Sistemler • Arduino",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Arduino Temelleri: setup(), loop() ve Dijital I/O",
    subtitle:
      "Elektronik dünyasına giriş: Standart Arduino yaşam döngüsü, buton okuma ve PWM analog çıkış.",
    sections: [
      {
        title: "1. Arduino Yaşam Döngüsü",
        content:
          "Her Arduino programı iki ana fonksiyondan oluşur:\n- `setup()`: Kart açıldığında veya resetlendiğinde yalnızca bir kez çalışır. Pin yönlendirmeleri ve seri haberleşme başlatılır.\n- `loop()`: Sonsuz bir döngüde sürekli tekrar eden donanım mantığı.",
        code: {
          language: "cpp",
          caption: "Arduino Temel İskelet",
          snippet: `const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}`,
        },
      },
    ],
    quiz: {
      question: "Arduino kartı elektriğe bağlandığında sadece bir defa çalışan başlangıç fonksiyonu hangisidir?",
      options: ["A) main()", "B) loop()", "C) setup()", "D) init()"],
      correctIndex: 2,
      explanation:
        "Doğru! 'setup()' fonksiyonu enerji verildiğinde veya reset butonuna basıldığında donanımı hazırlamak için sadece 1 kez yürütülür.",
    },
  },

  // ==========================================
  // PROGRAMLAMA DİLLERİ (PYTHON, C++, RUST)
  // ==========================================
  "python-intro": {
    id: "python-intro",
    badge: "Programlama • Python 3",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Python 3 Temelleri & Veri Yapıları",
    subtitle:
      "Temiz sözdizimi, dinamik tipler: Listeler, Sözlükler (Dict) ve List Comprehension.",
    sections: [
      {
        title: "1. Pythonic Kodlama ve Veri Yapıları",
        content:
          "Python; okunabilirlik, hızlı geliştirme ve zengin kütüphane ekosistemiyle dünyanın en çok tercih edilen genel amaçlı programlama dilidir.\n\nListeler (`list`), sözlükler (`dict`) ve küme (`set`) yapıları Python'ın en güçlü yerleşik veri yapılarıdır.",
        code: {
          language: "python",
          caption: "List Comprehension ve Sözlükler",
          snippet: `# 0-9 arasındaki çift sayıların karesi:
kareler = [x**2 for x in range(10) if x % 2 == 0]
print(kareler) # [0, 4, 16, 36, 64]

cihaz = {
  "ad": "ESP32",
  "ram_kb": 520,
  "wifi": True
}
print(f"Cihaz: {cihaz['ad']}, RAM: {cihaz['ram_kb']}KB")`,
        },
      },
    ],
    quiz: {
      question: "Python'da anahtar-değer (key-value) çiftlerini depolayan yerleşik veri yapısı hangisidir?",
      options: ["A) list", "B) tuple", "C) dict (Sözlük)", "D) array"],
      correctIndex: 2,
      explanation:
        "Doğru! 'dict' (dictionary), benzersiz anahtarlar ile değerleri eşleyen hızlı karma haritası (hash map) yapısıdır.",
    },
  },

  "cpp-intro": {
    id: "cpp-intro",
    badge: "Programlama • Modern C++",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "Modern C++ (C++20) ve RAII Mimarisi",
    subtitle:
      "Sistem programlama ve yüksek başarım: Akıllı işaretçiler (smart pointers), referanslar ve STL.",
    sections: [
      {
        title: "1. RAII ve Akıllı İşaretçiler (Smart Pointers)",
        content:
          "Klasik C++'taki `new` ve `delete` kaynaklı bellek sızıntılarını (memory leaks) önlemek için Modern C++ (C++11/20), **RAII (Resource Acquisition Is Initialization)** prensibini ve akıllı işaretçileri getirmiştir:\n- `std::unique_ptr`: Tek sahiplik (zero-overhead)\n- `std::shared_ptr`: Ortak sahiplik (referans sayacı ile)",
        code: {
          language: "cpp",
          caption: "std::unique_ptr Kullanımı",
          snippet: `#include <iostream>
#include <memory>

class Sensor {
public:
  Sensor()  { std::cout << "Sensör açıldı\\n"; }
  ~Sensor() { std::cout << "Sensör güvenle kapandı\\n"; }
};

int main() {
  // Otomatik bellek temizliği (delete gerekmez):
  auto s = std::make_unique<Sensor>();
  return 0;
}`,
        },
      },
    ],
    quiz: {
      question: "Modern C++'ta nesnenin tek bir sahibinin olmasını garanti eden ve nesne kapsamdan çıkınca belleği otomatik serbest bırakan akıllı işaretçi hangisidir?",
      options: ["A) std::shared_ptr", "B) std::unique_ptr", "C) std::weak_ptr", "D) raw pointer (*)"],
      correctIndex: 1,
      explanation:
        "Doğru! 'std::unique_ptr' kaynak üzerinde tekil sahiplik sağlar ve sıfır ek maliyetle (zero-cost abstraction) çalışır.",
    },
  },

  "rust-intro": {
    id: "rust-intro",
    badge: "Programlama • Rust",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Rust: Sahiplik (Ownership) ve Bellek Güvenliği",
    subtitle:
      "Çöp toplayıcı (GC) olmadan derleme anında bellek güvenliği: Ownership, Borrowing ve Eşzamanlılık.",
    sections: [
      {
        title: "1. Sahiplik (Ownership) Kuralları",
        content:
          "Rust dilinin devrim niteliğindeki özelliği, bellek hatalarını (null pointer dereference, use-after-free, data race) **çalışma anında değil derleme anında** engellemesidir.\n\nÜç temel kural:\n1. Rust'taki her değerin bir **sahibi (owner)** vardır.\n2. Bir anda yalnızca bir sahip olabilir.\n3. Sahip kapsamdan (scope) çıktığında, değer otomatik olarak bellekten atılır (`drop`).",
        code: {
          language: "rust",
          caption: "Sahiplik ve Borrowing (Ödünç Alma)",
          snippet: `fn main() {
    let s1 = String::from("learn.tncy.dev");
    let len = hesapla(&s1); // & ile ödünç verdik (borrow)
    println!("Dize: {}, Uzunluk: {}", s1, len);
}

fn hesapla(metin: &String) -> usize {
    metin.len()
}`,
        },
      },
    ],
    quiz: {
      question: "Rust'ta bir değişkenin sahipliğini devretmeden (move etmeden) değerini fonksiyonlara okuma amaçlı geçirmek için hangi operatör kullanılır?",
      options: ["A) * (Dereference)", "B) & (Reference / Borrowing)", "C) mut", "D) clone()"],
      correctIndex: 1,
      explanation:
        "Doğru! '&' işareti (referans) sahipliği devretmeden değeri ödünç almayı (borrowing) sağlar.",
    },
  },
};
