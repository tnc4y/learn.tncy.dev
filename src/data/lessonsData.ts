import { QuizQuestion } from "@/components/QuizExercise";
import { PlaygroundProps } from "@/components/CodePlayground";
import { SYSTEMVERILOG_LESSONS } from "./systemverilogLessons";
import { ROS2_LESSONS } from "./ros2Lessons";
import { VERILOG_LESSONS } from "./verilogLessons";
import { EMBEDDED_C_LESSONS } from "./embeddedCLessons";
import { MAKER_LESSONS } from "./makerLessons";
import { SYSTEMS_LESSONS } from "./systemsLessons";
import { WEB_LESSONS } from "./webLessons";
import { CSS_LESSONS } from "./cssLessons";

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
  ...SYSTEMVERILOG_LESSONS,
  ...ROS2_LESSONS,
  ...VERILOG_LESSONS,
  ...EMBEDDED_C_LESSONS,
  ...MAKER_LESSONS,
  ...SYSTEMS_LESSONS,
  ...WEB_LESSONS,
  ...CSS_LESSONS,

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

  // ==========================================
  // ROS 2 & OTONOM SİSTEMLER (ROBOTİK)
  // ==========================================
  "ros2-intro": {
    id: "ros2-intro",
    badge: "Modül 1 • ROS 2 Mimarisi & DDS",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "ROS 2 Nedir? ROS 1 vs ROS 2 Mimarisi & Gerçek Zamanlılık",
    subtitle:
      "Merkezi roscore darboğazından uçtan uca DDS omurgasına; mobil robotlar, insansız araçlar ve endüstriyel robotik için yeni nesil işletim sistemi.",
    sections: [
      {
        title: "1. Robotik Dünyasında Neden Özel Bir Katman (Middleware) Gerekir?",
        content:
          "Modern bir otonom robot (örneğin tekerlekli servis robotu veya fabrika AMR aracı) düzinelerce eşzamanlı donanımı yönetmek zorundadır:\n\n- **Sensörler:** 2D LiDAR saniyede 10 kez 360° lazer taraması yapar; derinlik kamerası saniyede 30 kare RGB-D görüntüsü üretir; IMU 200 Hz ile ivme ve açısal hız okur.\n- **Aktüatörler:** Motor sürücüleri mikro saniye hassasiyetinde PWM ve enkoder darbeleriyle tekerlek hızını ayarlar.\n- **Algoritmalar:** SLAM haritalama, engelden kaçma, yapay zeka nesne tanıma ve yol planlama algoritmaları bu verileri anlık olarak tüketir.\n\nTüm bu bağımsız parçaların tek bir dev C++ programında ('monolith') yazılması imkansızdır; herhangi bir sensör kilitlendiğinde tüm robot çöker. **ROS 2 (Robot Operating System 2)**, prosesleri bağımsız düğümlere (Nodes) bölerek aralarında yüksek performanslı, asenkron ve modüler bir veri dağıtımı sağlar.",
        callout: {
          type: "info",
          title: "ROS Gerçek Bir İşletim Sistemi midir?",
          message:
            "Hayır. ROS (Robot Operating System), Linux (Ubuntu/Debian), macOS veya Windows üzerinde çalışan gelişmiş bir Robotik İletişim Katmanı (Middleware) ve kütüphane ekosistemidir.",
        },
      },
      {
        title: "2. ROS 1 Neden Terk Edildi? ROS 2'nin Doğuşu",
        content:
          "2007 yılında geliştirilen klasik ROS 1, akademik laboratuvarlar için harikaydı fakat ticari otonom robotlar sahaya indikçe şu kritik krizler ortaya çıktı:\n\n1. **Tek Hata Noktası (Single Point of Failure - `roscore`):** ROS 1'de merkezi bir sunucu (`roscore`) çökerse tüm robotik ağ anında ölüyordu.\n2. **Gerçek Zamanlı (Real-Time) Desteği Yoktu:** Standart TCP/UDP soketleri deterministik değildi; acil durma veya güvenlik kritik frenleme anlarında gecikme (jitter) öngörülemiyordu.\n3. **Mikrodenetleyici Desteği Yoktu:** Yalnızca x86/ARM Linux PC'lerde çalışıyordu; STM32 veya ESP32 gibi MCU'lar sisteme dahil edilemiyordu.\n4. **Güvensiz Ağ:** Şifreleme ve kimlik doğrulama yoktu; ağdaki herkes `/cmd_vel` konusuna sahte motor hareket paketleri gönderebiliyordu.\n\n**ROS 2**, endüstri standardı **OMG DDS (Data Distribution Service)** omurgası üzerine inşa edilerek merkezi `roscore` ihtiyacını tamamen ortadan kaldırdı. Artık düğümler birbirini P2P (Peer-to-Peer) olarak dinamik keşfeder.",
      },
      {
        title: "3. İlk ROS 2 Python Düğümü (Minimal Node)",
        content:
          "ROS 2'de Python ile düğüm yazarken `rclpy` (ROS Client Library for Python) kullanılır. Düğümümüz nesne yönelimli olarak `Node` sınıfından miras alır:",
        code: {
          language: "python",
          caption: "minimal_node.py - rclpy ile İlk ROS 2 Düğümü",
          snippet: `import rclpy
from rclpy.node import Node

class OtonomRobotDugumu(Node):
    def __init__(self):
        super().__init__('otonom_robot_dugumu')
        self.get_logger().info('Robot ana kontrol düğümü başlatıldı!')
        
        # 1 saniyede bir tetiklenen periyodik zamanlayıcı (Timer)
        self.timer = self.create_timer(1.0, self.timer_geri_cagirma)
        self.adim = 0

    def timer_geri_cagirma(self):
        self.adim += 1
        self.get_logger().info(f'[@Zaman: {self.adim}s] Sistem telemetrisi: PIL %98 | LiDAR AKTIF')

def main(args=None):
    rclpy.init(args=args)
    dugum = OtonomRobotDugumu()
    
    try:
        rclpy.spin(dugum) # Düğümü olay döngüsünde sürekli çalıştır
    except KeyboardInterrupt:
        dugum.get_logger().warn('Kullanıcı düğümü sonlandırdı.')
    finally:
        dugum.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()`,
        },
      },
    ],
    quiz: {
      question: "ROS 2 mimarisinde merkezi 'roscore' sunucusunun kaldırılmasını ve düğümlerin birbirini otomatik keşfetmesini sağlayan endüstriyel iletişim standardı hangisidir?",
      options: [
        "A) HTTP REST API",
        "B) DDS (Data Distribution Service)",
        "C) MQTT Broker",
        "D) WebSocket Server",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! ROS 2, havacılık ve savunma sanayisinde kullanılan OMG DDS standardını (CycloneDDS, FastDDS) kullanarak merkezi sunucusuz P2P keşif ve deterministik iletişim sağlar.",
    },
  },

  "ros2-nodes-topics": {
    id: "ros2-nodes-topics",
    badge: "Modül 2 • rclpy & İletişim",
    readingTime: "9 dk okuma",
    level: "Başlangıç - Orta",
    title: "Düğümler (Nodes) ve Konular (Topics): rclpy ile Publisher / Subscriber",
    subtitle:
      "Sensör verilerini periyodik yayınlama, asenkron callback mekanizması ve terminal CLI araçlarıyla topic telemetrisi dinleme.",
    sections: [
      {
        title: "1. Yayıncı / Abone (Publisher / Subscriber) Modeli",
        content:
          "Robotik sistemlerde en yaygın veri akışı tek yönlü yayın modelidir:\n\n- **Topic (Konu):** İsimlendirilmiş bir veri borusudur (örn: `/scan`, `/cmd_vel`, `/odom`).\n- **Publisher (Yayıncı):** Sensör verisini üretip konuya basan düğüm (örn: LiDAR sürücüsü).\n- **Subscriber (Abone):** İlgili konuyu dinleyip veri geldiğinde tetiklenen düğüm (örn: SLAM haritalama algoritması).\n\nYayıncı abone sayısından habersizdir; 1 LiDAR yayıncısına aynı anda 5 farklı düğüm (ekran, kayıt cihazı, harita, engelden kaçma) abone olabilir.",
      },
      {
        title: "2. Telemetri Yayınlayan Publisher ve Dinleyen Subscriber Kodu",
        content:
          "Aşağıdaki kodda bir robot telemetri düğümü `/robot/durum` konusuna periyodik mesaj basarken, kontrol düğümü bu mesajları yakalamaktadır:",
        code: {
          language: "python",
          caption: "telemetry_pub_sub.py",
          snippet: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String

# 1. YAYINCI DÜĞÜMÜ (PUBLISHER)
class TelemetriYayinci(Node):
    def __init__(self):
        super().__init__('telemetri_yayinci')
        self.publisher_ = self.create_publisher(String, '/robot/durum', 10)
        self.timer = self.create_timer(0.5, self.yayinla) # 2 Hz
        self.sayac = 0

    def yayinla(self):
        msg = String()
        msg.data = f"Hız: 0.8 m/s | Batarya: 24.2V | Adım: #{self.sayac}"
        self.publisher_.publish(msg)
        self.get_logger().info(f'Yayınlandı: "{msg.data}"')
        self.sayac += 1

# 2. ABONE DÜĞÜMÜ (SUBSCRIBER)
class TelemetriDinleyici(Node):
    def __init__(self):
        super().__init__('telemetri_dinleyici')
        self.subscription = self.create_subscription(
            String,
            '/robot/durum',
            self.mesaj_geldi,
            10 # Kuyruk boyutu (Queue Depth)
        )

    def mesaj_geldi(self, msg):
        self.get_logger().info(f'Gelen Telemetri: "{msg.data}"')`,
        },
      },
      {
        title: "3. Terminalden ROS 2 Topic Hata Ayıklama Komutları",
        content:
          "ROS 2 geliştiricilerinin terminalde en sık kullandığı CLI komutları:\n\n```bash\n# 1. Ağdaki tüm aktif konuları listele\nros2 topic list\n\n# 2. Bir konudan akan canlı veriyi terminalde izle\nros2 topic echo /robot/durum\n\n# 3. Konunun yayın frekansını (Hz) ölç\nros2 topic hz /scan\n\n# 4. Terminalden elle doğrudan komut yayınla (/cmd_vel ile robotu ileri sür)\nros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist \"{linear: {x: 0.5, y: 0.0, z: 0.0}, angular: {z: 0.0}}\"\n```",
      },
    ],
    quiz: {
      question: "ROS 2 terminalinde çalışan bir robotun '/scan' LiDAR konusunun saniyede kaç kare (frekans) veri ürettiğini kontrol etmek için hangi komut kullanılır?",
      options: [
        "A) ros2 topic hz /scan",
        "B) ros2 topic ping /scan",
        "C) ros2 node status /scan",
        "D) ros2 topic measure /scan",
      ],
      correctIndex: 0,
      explanation:
        "Doğru! 'ros2 topic hz <topic_adi>' komutu konudan akan mesajların geliş aralığını ölçerek ortalama frekansı (Hz) ekrana basar.",
    },
  },

  "ros2-rpi-setup": {
    id: "ros2-rpi-setup",
    badge: "Modül 3 • Donanım & Raspberry Pi",
    readingTime: "9 dk okuma",
    level: "Orta Seviye",
    title: "Raspberry Pi Üzerinde ROS 2 Humble/Jazzy Kurulumu & Headless Yönetim",
    subtitle:
      "Raspberry Pi 4 ve 5 üzerinde headless Linux terminalinde ROS 2 ortamı, Wi-Fi DDS domain ID ve uzaktan yönetim.",
    sections: [
      {
        title: "1. Neden Raspberry Pi 4 / 5 ve Hangi İşletim Sistemi?",
        content:
          "Küçük ve orta ölçekli otonom mobil robotlarda (AMR) Raspberry Pi, LiDAR, derinlik kamerası ve motor sürücü kartlarını tek merkezde toplayan en popüler SBC'dir.\n\n- **Önerilen İşletim Sistemi:** Ubuntu Server 22.04 LTS (ROS 2 Humble için) veya Ubuntu Server 24.04 LTS / Raspberry Pi OS 64-bit Bookworm (ROS 2 Jazzy Jalisco için).\n- **Minimum RAM:** 4GB (8GB Gazebo veya OpenCV işleri için şiddetle tavsiye edilir).\n- **Depolama:** Hızlı bir A2 sınıfı MicroSD kart veya tercihen Raspberry Pi 5 M.2 NVMe HAT SSD sürücüsü.",
      },
      {
        title: "2. ROS 2 Paket Depoları ve Minimal Kurulum",
        content:
          "Robot üzerinde masaüstü grafik arayüzüne ihtiyaç olmadığı için `ros-humble-ros-base` paketi kurulmalıdır:",
        code: {
          language: "bash",
          caption: "Raspberry Pi Terminalinde ROS 2 Kurulumu",
          snippet: `# 1. UTF-8 Yerel ayarını doğrula
locale

# 2. Ubuntu Universe deposunu aç ve ROS 2 GPG anahtarını ekle
sudo apt update && sudo apt install -y software-properties-common curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 3. Paketleri güncelle ve Minimal ROS 2 Base yükle
sudo apt update
sudo apt install -y ros-humble-ros-base python3-colcon-common-extensions python3-rosdep

# 4. Ortam değişkenini bashrc'ye ekle
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc`,
        },
      },
      {
        title: "3. Kritik Ağ Ayarı: ROS_DOMAIN_ID ve DDS İzolasyonu",
        content:
          "Aynı Wi-Fi ağına bağlı birden çok öğrenci veya robot varsa, DDS varsayılan olarak tüm robotların topic'lerini birbiriyle karıştırır. Bunu önlemek için her robota benzersiz bir `ROS_DOMAIN_ID` verilmelidir:\n\n```bash\n# Örneğin robot numaranız 42 ise:\necho \"export ROS_DOMAIN_ID=42\" >> ~/.bashrc\necho \"export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp\" >> ~/.bashrc\n```\n\nArtık sadece bilgisayarında `ROS_DOMAIN_ID=42` olan geliştirici robotun telemetrisini görebilir.",
      },
    ],
    quiz: {
      question: "Aynı Wi-Fi yerel ağında çalışan birden çok ROS 2 robotunun konu ve düğümlerinin birbirine karışmasını engellemek için hangi ortam değişkeni ayarlanmalıdır?",
      options: [
        "A) ROS_MASTER_URI",
        "B) ROS_DOMAIN_ID",
        "C) ROS_SECURITY_KEY",
        "D) ROS_ROBOT_NAME",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! DDS standardında her alt ağa 0 ile 101 arasında bir ROS_DOMAIN_ID atanarak robotlar mantıksal olarak birbirinden tamamen izole edilir.",
    },
  },

  "ros2-lidar-sensor": {
    id: "ros2-lidar-sensor",
    badge: "Modül 3 • Sensörler & Lidar",
    readingTime: "9 dk okuma",
    level: "Orta Seviye",
    title: "2D RPLIDAR Entegrasyonu ve LaserScan Mesajları",
    subtitle:
      "360 derece lazer tarama, USB seri port udev kuralları, /scan verisinin anatomisi ve engellerin mesafesini filtreleme.",
    sections: [
      {
        title: "1. 2D Lidar Nasıl Çalışır ve ROS 2'ye Nasıl Bağlanır?",
        content:
          "RPLIDAR (A1, A2, S1 vb.), saniyede binlerce kez kızılötesi lazer darbesi gönderip yansımasını ölçerek (Triangulation / Time of Flight) robotun etrafındaki engellerin polar koordinatlarını (açı ve mesafe) çıkarır.\n\nUSB adaptörüyle Raspberry Pi'ye bağlandığında `/dev/ttyUSB0` olarak algılanır. Ancak başka aygıtlar takıldığında port adının değişmesini engellemek için kalıcı bir udev sembolik linki oluşturulmalıdır:",
        code: {
          language: "bash",
          caption: "/etc/udev/rules.d/99-rplidar.rules",
          snippet: `# Silicon Labs CP2102 veya FTDI RPLIDAR USB dönüştürücüsü
KERNEL=="ttyUSB*", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea60", MODE:="0666", SYMLINK+="rplidar"

# Kuralları yenile:
# sudo udevadm control --reload-rules && sudo udevadm trigger
# Artık LiDAR daima '/dev/rplidar' adresinde hazır olacaktır!`,
        },
      },
      {
        title: "2. LaserScan Mesajının Anatomisi",
        content:
          "`sensor_msgs/msg/LaserScan` veri yapısı şu kritik alanları içerir:\n\n- `angle_min` / `angle_max`: Tarama açısı sınırları (radyan cinsinden, örn: -π ile +π).\n- `angle_increment`: İki lazer ışını arasındaki açı farkı.\n- `range_min` / `range_max`: Sensörün güvenilir minimum (örn: 0.15m) ve maksimum (örn: 12.0m) ölçüm mesafesi.\n- `ranges[]`: Her açı için ölçülen mesafeleri tutan devasa float dizisi.",
      },
      {
        title: "3. Öndeki Engelleri Tespit Eden ve Durduran Python Düğümü",
        content:
          "Aşağıdaki düğüm, robotun tam önündeki (±20 derecelik sektördeki) en yakın engeli denetler ve 40 cm'den yakınsa uyarı üretir:",
        code: {
          language: "python",
          caption: "lidar_obstacle_detector.py",
          snippet: `import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
import math

class LidarEngelDedektoru(Node):
    def __init__(self):
        super().__init__('lidar_engel_dedektoru')
        self.sub = self.create_subscription(LaserScan, '/scan', self.scan_callback, 10)
        self.guvenli_mesafe = 0.40 # 40 cm

    def scan_callback(self, msg: LaserScan):
        # Tam robotun önü: index 0 veya liste ortası (sensör montaj açısına bağlı)
        # Örnek olarak 0 derece ön kabul edilirse:
        on_mesafeler = []
        for i in range(-15, 16):
            r = msg.ranges[i]
            if msg.range_min < r < msg.range_max:
                on_mesafeler.append(r)

        if on_mesafeler:
            en_yakin = min(on_mesafeler)
            if en_yakin < self.guvenli_mesafe:
                self.get_logger().error(f'ACIL DURMA! Önde Engel Var: {en_yakin:.2f} m')
            else:
                self.get_logger().info(f'Yol Açık. Ön Mesafe: {en_yakin:.2f} m')

def main():
    rclpy.init()
    node = LidarEngelDedektoru()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()`,
        },
      },
    ],
    quiz: {
      question: "ROS 2'de 2D LiDAR sensöründen gelen 360 derecelik mesafe verilerini taşıyan standart mesaj tipi hangisidir?",
      options: [
        "A) nav_msgs/msg/Odometry",
        "B) sensor_msgs/msg/LaserScan",
        "C) geometry_msgs/msg/Point32",
        "D) sensor_msgs/msg/PointCloud2",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 2D lazer tarayıcılar sensor_msgs/msg/LaserScan mesaj tipini kullanır. 3D LiDAR ve derinlik kameraları ise sensor_msgs/msg/PointCloud2 tipini kullanır.",
    },
  },

  "ros2-slam-cartographer": {
    id: "ros2-slam-cartographer",
    badge: "Modül 4 • SLAM & Haritalama",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "SLAM ile Canlı Haritalama: Cartographer ve Slam Toolbox",
    subtitle:
      "Bilinmeyen bir mekanda robotun kendi konumunu hesaplayarak (Odometri) LiDAR ile 2D Occupancy Grid haritası çıkarma.",
    sections: [
      {
        title: "1. SLAM (Simultaneous Localization and Mapping) Nedir?",
        content:
          "Robot daha önce hiç bulunmadığı kapalı bir odaya bırakıldığında iki büyük bilinmeyenle karşılaşır:\n1. **Harita nerede?** (Oda duvarları, kapılar, masalar nerede?)\n2. **Ben neredeyim?** (Tekerlekler patinaj yaptığı için odometri tek başına sürüklenir - drift eder).\n\nSLAM algoritması, LiDAR taramalarını önceki taramalarla üst üste eşleyerek (Scan Matching) hem robotun gerçek uzaysal konumunu düzeltir, hem de arkasında piksel piksel bir harita örer.",
      },
      {
        title: "2. Modern ROS 2 Standardı: SLAM Toolbox",
        content:
          "ROS 2 ekosisteminde artık eski Gmapping yerine Steve Macenski tarafından geliştirilen **SLAM Toolbox** endüstri standardıdır. Önemli avantajları:\n- Sürekli harita güncelleme ve dinamik döngü kapatma (Loop Closure).\n- Yaşam boyu haritalama (Lifelong Mapping): Önceden kaydedilmiş haritayı yükleyip değişen mobilyaları güncelleme imkanı.\n- Düşük CPU tüketimi (Raspberry Pi 4 ve 5 üzerinde akıcı çalışır).",
      },
      {
        title: "3. Haritayı Kaydetme ve Çıktı Dosyaları",
        content:
          "Robot odayı tamamen dolaştıktan sonra harita diske iki dosya olarak kaydedilir:\n\n```bash\n# Harita kaydetme komutu\nros2 run nav2_map_server map_saver_cli -f ~/harita/ev_salon\n```\n\nBu komut iki dosya üretir:\n1. `ev_salon.pgm`: Duvarların siyah (0), boş zeminlerin beyaz (254), bilinmeyen bölgelerin gri (205) olduğu gri tonlamalı 2D resim.\n2. `ev_salon.yaml`: Çözünürlük (piksel başına kaç metre, örn: 0.05m = 5cm) ve orijin koordinatlarını tutan başlık dosyası.",
      },
    ],
    quiz: {
      question: "SLAM Toolbox veya Cartographer ile çıkarılan harita 'map_saver_cli' ile kaydedildiğinde hangi iki dosya uzantısı oluşur?",
      options: [
        "A) .json ve .png",
        "B) .pgm (Görüntü) ve .yaml (Metadata)",
        "C) .urdf ve .xml",
        "D) .bin ve .csv",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! ROS harita sunucusu (map_server), 2D grid haritasını .pgm (grayscale bitmap) ve ölçek/orijin bilgilerini .yaml dosyası olarak saklar.",
    },
  },

  "ros2-nav2-stack": {
    id: "ros2-nav2-stack",
    badge: "Modül 4 • Otonom Navigasyon",
    readingTime: "11 dk okuma",
    level: "İleri Seviye",
    title: "Nav2 (Navigation 2): Costmaps, Global Planner & Local Planner",
    subtitle:
      "A* / Dijkstra ile küresel rota planlama, dinamik engelleri aşan yerel kontrolcüler ve hedefe otonom sürüş.",
    sections: [
      {
        title: "1. Nav2 (Navigation 2) Mimarisi",
        content:
          "Bir robotun harita üzerinde (X, Y) hedef koordinatına kendi kendine gitmesi için Nav2 şu katmanları kullanır:\n\n1. **Costmap (Maliyet Haritası):** Statik haritanın üstüne anlık LiDAR engellerini ekler ve robotun yarıçapı kadar duvarları şişirir (Inflation Layer).\n2. **Global Planner (Küresel Planlayıcı):** Hedefe giden en kısa teorik çizgiyi (A* veya Dijkstra) hesaplar.\n3. **Local Planner / Controller (Yerel Denetleyici - DWB/TEB):** Robotun tekerlek motorlarına doğrudan `cmd_vel` hız komutu verirken aniden önüne çıkan insan veya sandalyelerin etrafından kıvrılır.\n4. **Recovery Behaviors (Kurtarma Davranışları):** Robot çıkmaza girdiğinde geri çekilme veya kendi etrafında dönme manevraları yapar.",
      },
      {
        title: "2. Python ile Hedefe Otonom Görev Gönderme (BasicNavigator)",
        content:
          "Nav2, karmaşık action çağrılarını tek satıra indiren `BasicNavigator` Python kütüphanesini sunar:",
        code: {
          language: "python",
          caption: "navigate_to_goal.py",
          snippet: `import rclpy
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult
from geometry_msgs.msg import PoseStamped

def main():
    rclpy.init()
    nav = BasicNavigator()

    # Robotun Nav2 sisteminin hazır olmasını bekle
    nav.waitUntilNav2Active()

    # Hedef Nokta Belirle (X: 3.5 metre, Y: 1.2 metre)
    hedef = PoseStamped()
    hedef.header.frame_id = 'map'
    hedef.header.stamp = nav.get_clock().now().to_msg()
    hedef.pose.position.x = 3.5
    hedef.pose.position.y = 1.2
    hedef.pose.orientation.w = 1.0 # 0 derece yönelme

    print("Robot hedefe yönlendiriliyor...")
    nav.goToPose(hedef)

    # Görev tamamlanana kadar bekle ve geri bildirim al
    while not nav.isTaskComplete():
        feedback = nav.getFeedback()
        if feedback:
            print(f"Kalan Mesafe: {feedback.distance_remaining:.2f} metre")

    sonuc = nav.getResult()
    if sonuc == TaskResult.SUCCEEDED:
        print("Hedefe başarıyla ulaşıldı!")
    else:
        print("Görev iptal edildi veya rota bulunamadı!")

    rclpy.shutdown()

if __name__ == '__main__':
    main()`,
        },
      },
    ],
    quiz: {
      question: "Nav2 sisteminde robotun fiziksel boyutunu (çapını) hesaba katarak duvarların ve engellerin etrafında tehlike bölgeleri oluşturan Costmap katmanı hangisidir?",
      options: [
        "A) Static Layer",
        "B) Obstacle Layer",
        "C) Inflation Layer (Şişirme Katmanı)",
        "D) Voxel Layer",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! Inflation Layer, tespit edilen engellerin etrafını robotun yarıçapı kadar 'yüksek maliyetli' (high cost) olarak boyayarak robotun gövdesinin duvara çarpmasını engeller.",
    },
  },
};
