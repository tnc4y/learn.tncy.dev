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
  intro: {
    id: "intro",
    badge: "Modül 1 • Giriş & Temeller",
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
    badge: "Modül 1 • Giriş & Temeller",
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
      {
        title: "2. logic Ne Zaman Kullanılamaz? (Tek İstisna: Çoklu Sürücüler)",
        content:
          "Eğer bir hatta birden fazla sürücü bağlıysa (örneğin I2C veriyolu gibi birden fazla cihazın aynı kabloya `Z` ve `0` sürdüğü tristate veriyolları), birden fazla sürücüyü çözümlemek (resolve etmek) için `wire` veya `tri` kullanılır.\n\n`logic` veri tipi yalnızca **tek bir sürücüye (single driver)** izin verir. Eğer kazara iki ayrı `always` bloğundan aynı `logic` sinyaline atama yaparsanız, SystemVerilog derleyicisi anında derleme hatası verir. Bu, çok büyük bir avantajdır!",
        code: {
          language: "systemverilog",
          caption: "logic Kullanım Örneği",
          snippet: `// Hem ardışıl hem kombinasyonel için geçerli:
logic clk;
logic [7:0] data_bus;
logic valid;

assign valid = (data_bus != 8'h00);

always_ff @(posedge clk) begin
  data_bus <= data_bus + 1'b1;
end`,
        },
      },
    ],
    playground: {
      title: "4-Durumlu Mantık ve logic Deneme Alanı",
      initialCode: `module logic_demo;
  logic [3:0] sig_a; // 4-bit logic
  logic [3:0] sig_b;

  initial begin
    // Başlangıçta değer atanmadığı için 4'bxxxx (Bilinmeyen) olur
    $display("[@%0tns] Başlangıç Değeri: sig_a = %b", $time, sig_a);

    #10 sig_a = 4'b1010;
    #10 sig_b = 4'b0011;
    #10;
    $display("[@%0tns] sig_a = %b, sig_b = %b", $time, sig_a, sig_b);
    $display("[@%0tns] VE Mantığı (sig_a & sig_b) = %b", $time, sig_a & sig_b);
    $display("[@%0tns] VEYA Mantığı (sig_a | sig_b) = %b", $time, sig_a | sig_b);

    // X ve Z durumlarını test etme
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
        "Doğru! 'logic' 4-durumlu bir veri tipidir ve değer atanmadığında varsayılan olarak 'X' (Bilinmeyen) durumundadır. (2-durumlu olan 'bit' tipi ise varsayılan olarak 0 başlar).",
    },
  },
};
