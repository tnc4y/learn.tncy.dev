import { LessonContent } from "./lessonsData";

export const SYSTEMVERILOG_PART1: Record<string, LessonContent> = {
  // ==========================================
  // MODÜL 1: GİRİŞ & TEMELLER
  // ==========================================
  "intro": {
    id: "intro",
    badge: "Modül 1 • Donanım Tasarımı",
    readingTime: "12 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "SystemVerilog Nedir? (Verilog vs SystemVerilog)",
    subtitle:
      "Modern mikroişlemcilerin, GPU'ların ve SoC'lerin donanım tasarımı ve doğrulanmasında endüstri standardı dil: IEEE 1800 Standardı.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog dilinin donanım dünyasındaki yerini ve evrimini öğreneceksiniz:
- Klasik Verilog (IEEE 1364) ile Modern SystemVerilog (IEEE 1800) arasındaki mimari farklar.
- Çip üretimindeki iki ana disiplin: **Sentezlenebilir RTL Tasarımı** ve **Kapsamlı Doğrulama (Verification)**.
- Donanım karmaşıklığı milyarlarca transistöre ulaşırken doğrulama darboğazının (Verification Gap) nasıl aşıldığı.
- Tek bir dilde birleşen dünya: C/C++ esintili tipler, OOP, kısıtlı rastgele test (CRV) ve fonksiyonel kapsama.`,
      },
      {
        title: "2. Donanım ve Doğrulama Mimarisi Genel Görünümü",
        content: `![SystemVerilog Veri Tipleri ve Donanım Katmanları](/images/systemverilog/systemverilog-datatypes.svg)

SystemVerilog, donanım tasarımcısı ile doğrulama mühendisini aynı çatı altında buluşturan yegane endüstri standardıdır. Yukarıdaki mimaride görüldüğü gibi, fiziksel kapılardan simülasyon testbench ortamına kadar tüm soyutlama katmanlarını kapsar.`,
      },
      {
        title: "3. Klasik Verilog Neden Yetersiz Kaldı?",
        content: `1980'lerde geliştirilen klasik Verilog (Verilog-95 ve Verilog-2001), birkaç bin kapılı küçük ASIC devreleri için yeterliydi. Ancak 2000'li yıllarda çok çekirdekli işlemciler ve mobil SoC'ler ortaya çıktığında iki büyük kriz baş gösterdi:

1. **RTL Tasarımındaki Belirsizlikler:**
   - \`reg\` ve \`wire\` ayrımı mantıksal bir anlam taşımıyordu; sadece atanacak bloğun türüne (\`assign\` vs \`always\`) bağlı teknik bir formaliteydi.
   - Tasarımcı yanlışlıkla bir \`if\` dalını eksik bıraktığında sentez aracı istemeden bir bellek elemanı (**latch**) çıkarıyor ve silikonda ölümcül hatalara yol açıyordu.

2. **Doğrulama (Verification) Krizi:**
   - Bir donanımın tasarım süresi %30 sürerken, hatasız çalıştığını doğrulamak projenin **%70 zaman ve bütçesini** tüketiyordu.
   - Klasik Verilog'da nesne yönelimli programlama (OOP), rastgele test üretimi (Constrained Random), fonksiyonel kapsama (Coverage) ve dinamik kuyruklar yoktu. Mühendisler Verilog'un yanına C/C++ veya e/Vera gibi üçüncü parti diller eklemek zorunda kalıyordu.

İşte bu parçalanmayı bitirmek için Accellera ve IEEE, 2005 yılında **SystemVerilog (IEEE 1800)** standardını ilan etti.`,
        callout: {
          type: "info",
          title: "Altın Kural: SystemVerilog Verilog'un Bir Üst Kümesidir",
          message:
            "Geçerli olan her Verilog kodu aynı zamanda geçerli bir SystemVerilog kodudur. Ancak SystemVerilog'un her özelliği (örneğin class, mailbox, randomize, covergroup) sentezlenebilir değildir; bu soyut yapılar testbench tarafına ayrılmıştır.",
        },
      },
      {
        title: "4. Tasarım (RTL) vs Doğrulama (Testbench) Karşılaştırması",
        content: `SystemVerilog öğrenirken hangi özelliğin silikona (donanıma) dönüşeceğini, hangi özelliğin ise sadece simülatörde kalacağını bilmek çok önemlidir:

| Özellik Grubu | Sentezlenebilir RTL (Donanım) | Testbench / Simülasyon (Yazılım) |
| :--- | :--- | :--- |
| **Ana Veri Tipleri** | \`logic\`, \`bit\`, \`struct\`, \`enum\` | \`string\`, \`class\`, \`mailbox\`, dinamik dizi |
| **İşlem Blokları** | \`always_comb\`, \`always_ff\`, \`always_latch\` | \`initial\`, \`fork..join\`, \`forever\`, \`task\` |
| **Gecikme & Zamanlama**| Yasaktır! (\`#10\` sentezlenemez) | \`#5\`, \`@(posedge clk)\`, zamanlama bölgeleri |
| **Metodoloji** | Flip-Flop, MUX, ALU, Kapı seviyesi sentez | OOP, UVM, Constrained Random, Functional Coverage |

![Verilog reg/wire ve SystemVerilog logic Tip Karşılaştırması](/images/systemverilog/reg-wire-logic-comparison.svg)`,
      },
      {
        title: "5. Örnek: Sentezlenebilir Sayaç ve Testbench Entegrasyonu",
        content: `Aşağıdaki örnekte aynı dil içinde hem sentezlenebilir donanım modülünün (\`counter\`) hem de onu doğrulayan testbench'in (\`tb_counter\`) nasıl çalıştığını inceleyebilirsiniz:`,
        code: {
          language: "systemverilog",
          caption: "SystemVerilog RTL ve Testbench Birlikteliği",
          snippet: `// === 1. SENTEZLENEBİLİR RTL TASARIMI (Silisyumda Kapılara Dönüşür) ===
module counter (
  input  logic       clk,
  input  logic       rst_n,
  input  logic       enable,
  output logic [3:0] count
);
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      count <= 4'b0000;
    else if (enable)
      count <= count + 1'b1;
  end
endmodule

// === 2. DOĞRULAMA TESTBENCH'İ (Yalnızca Simülatörde Koşar) ===
module tb_counter;
  logic clk = 0;
  logic rst_n = 0;
  logic enable = 0;
  logic [3:0] count;

  // 10ns periyotlu saat sinyali üretimi
  always #5 clk = ~clk;

  // Tasarımın (DUT) bağlanması
  counter dut (.*);

  initial begin
    $display("[@%0tns] Simülasyon başladı, Reset aktif.", $time);
    #12 rst_n = 1; // Reset bırakıldı
    #10 enable = 1; // Sayma aktif
    #40 enable = 0; // Sayma durduruldu
    #10;
    $display("[@%0tns] Son Sayaç Değeri: %0d", $time, count);
    $finish;
  end
endmodule`,
        },
      },
      {
        title: "6. Sık Yapılan Tasarım Hataları",
        content: `* **RTL İçinde Gecikme (#) Kullanmak:** \`#5 a = b;\` gibi ifadeler sentez aracı tarafından yok sayılır veya hata verir. Sentezlenebilir kodda zamanlama yalnızca saat sinyali kenarlarıyla (\`posedge clk\`) belirlenir.
* **always_ff İçinde Bloklayan Atama (=) Kullanmak:** Ardışıl mantıkta bloklayan (\`=\`) atama kullanmak simülasyon ile sentezlenen donanım arasında yarış durumlarına (Race Condition) yol açar. Her zaman bloklamayan (\`<=\`) operatör kullanılmalıdır.
* **Testbench Mantığını Donanım Sanmak:** \`class\`, \`randomize()\` veya \`string\` yapıları asla FPGA LUT'larına veya ASIC kapılarına dönüşmez. Bu yapılar sadece simülatör yazılımı tarafından çalıştırılır.`,
        callout: {
          type: "warning",
          title: "Dikkat: Simülasyon Başarısı Sentez Garantisi Değildir",
          message:
            "Bir kodun simülatörde hatasız koşması, FPGA veya ASIC sentezinden geçeceği anlamına gelmez. Sentezlenebilirlik kurallarına sıkı sıkıya bağlı kalmalısınız.",
        },
      },
      {
        title: "7. Hızlı Kontrol & Özet",
        content: `* **SystemVerilog Nedir?** IEEE 1800 standardı; Verilog'un RTL gücü ile C++'ın test/OOP yeteneklerini birleştiren dildir.
* **logic Tipi:** Hem \`reg\` hem \`wire\` yerine geçer, 4-durumludur (0, 1, X, Z).
* **RTL vs TB:** RTL donanıma sentezlenir; Testbench simülatörde koşan doğrulama programıdır.`,
      },
    ],
    playground: {
      title: "SystemVerilog RTL ve Simülasyon Çalışma Alanı",
      initialCode: `module tb_intro;
  logic [3:0] counter = 4'b0000;
  logic clk = 0;

  always #5 clk = ~clk;

  initial begin
    $display("[START] SystemVerilog Simülasyonu Başlatıldı!");
    repeat (5) begin
      @(posedge clk);
      counter <= counter + 1'b1;
      $display("[@%0tns] clk yükseldi, Sayaç = %0d", $time, counter + 1'b1);
    end
    $display("[FINISH] Test Başarıyla Tamamlandı.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_intro.sv...",
        "[START] SystemVerilog Simülasyonu Başlatıldı!",
        "[@5ns] clk yükseldi, Sayaç = 1",
        "[@15ns] clk yükseldi, Sayaç = 2",
        "[@25ns] clk yükseldi, Sayaç = 3",
        "[@35ns] clk yükseldi, Sayaç = 4",
        "[@45ns] clk yükseldi, Sayaç = 5",
        "[FINISH] Test Başarıyla Tamamlandı.",
      ],
      notes: "Kod üzerinde counter artış miktarını değiştirerek simülasyon çıktısını anlık inceleyebilirsiniz.",
    },
    quiz: {
      question:
        "SystemVerilog dilinde yazılan bir kod parçasının 'sentezlenebilir RTL' olması ne anlama gelir?",
      options: [
        "A) Kodun simülatörde çok hızlı çalışması anlamına gelir.",
        "B) Kodun mantık sentezleyici (synthesis tool) tarafından fiziksel kapılara ve flip-flop'lara dönüştürülebilmesi anlamına gelir.",
        "C) Kodun C++ derleyicisi ile derlenebilmesi anlamına gelir.",
        "D) Kodun içinde class ve mailbox kullanılmış olması anlamına gelir.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Sentezlenebilir RTL (Register Transfer Level), kodun mantık sentez araçları tarafından fiziksel donanım kapılarına (AND, OR, Flip-Flop) dönüştürülebilir kurallarla yazıldığını ifade eder.",
    },
  },

  "testbench-basics": {
    id: "testbench-basics",
    badge: "Modül 1 • Testbench Temelleri",
    readingTime: "14 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İlk Testbench ve Simülasyon Mantığı",
    subtitle:
      "DUT (Design Under Test) kavramı, uyaran üretimi, $display, $monitor ve otomatik doğrulama mekanizmaları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste modern donanım doğrulamanın temelini atan testbench mimarisini öğreneceksiniz:
- Testbench nedir ve neden giriş/çıkış portu (port listesi) barındırmaz?
- **DUT (Design Under Test)** kavramı ve port eşleme yöntemleri (\`.*\` vs adıyla bağlama).
- Saat (Clock) ve Reset üreteçleri nasıl kurulur?
- Simülasyon kontrol sistem görevleri: \`$display\`, \`$monitor\`, \`$time\`, \`$finish\`.
- Otomatik sonuç karşılaştırma (Self-checking Testbench) mantığı.`,
      },
      {
        title: "2. Testbench Mimari Blok Şeması",
        content: `![SystemVerilog Basit Testbench Mimarisi](/images/systemverilog/simple-testbench.png)

Yukarıdaki diyagramda görüldüğü gibi, testbench kendisi bir çevre modülüdür. İçinde doğrulanacak donanımı (DUT) barındırır, DUT'un girişlerine test sinyalleri (stimulus) enjekte eder ve çıkışlarını gözlemleyerek beklenen sonuçla karşılaştırır.`,
      },
      {
        title: "3. Testbench Modülünün Anatomisi",
        content: `Bir testbench modülünün en belirgin özelliği, dış dünyaya bağlanan hiçbir portunun olmamasıdır:
\`\`\`systemverilog
module tb_my_design; // Dikkat: Parantez içinde input/output portu YOKTUR!
  // 1. Dahili bağlantı sinyalleri
  // 2. DUT örneklemesi (Instantiation)
  // 3. Saat üretme döngüsü
  // 4. Uyaran (Stimulus) bloğu (initial)
endmodule
\`\`\`

Testbench harici bir çipe bağlanmaz; simülatörün içinde yaşayan kapalı bir sanal laboratuvardır. DUT'un girişlerine bağlanacak sinyaller testbench içinde birer sürücü (\`logic\`), çıkışları okuyacak hatlar ise gözlemci olarak tanımlanır.`,
      },
      {
        title: "4. Sistem Görevleri: $display vs $monitor vs $strobe",
        content: `Simülasyon sürecinde sinyal değerlerini terminale yazdırmak için kullanılan sistem fonksiyonları şunlardır:

1. **\`$display\`**: Çağrıldığı anda sinyalin o mikro andaki değerini 1 kez ekrana basar. C dilindeki \`printf\` fonksiyonuna benzer.
2. **\`$monitor\`**: Arka planda sürekli çalışır. Parametre olarak verilen sinyallerden herhangi biri değiştiğinde otomatik olarak yeni satır basar. Bir testbench içinde genellikle sadece 1 adet \`$monitor\` kullanılır.
3. **\`$time\`**: O anki simülasyon zamanını integer olarak döner (\`$realtime\` kesirli döner).
4. **\`$finish\`**: Simülasyonu sonlandırır ve simülatörden çıkar.`,
        callout: {
          type: "info",
          title: "$monitor vs $display Farkı",
          message:
            "$display prosedürel akışın o anki değerini tek seferlik basarken, $monitor olay tetiklemelidir; dinlediği sinyaller değiştiği anda otomatik tetiklenir.",
        },
      },
      {
        title: "5. Eksiksiz Kendini Doğrulayan (Self-Checking) Testbench Örneği",
        content: `Aşağıdaki kod, 4-bitlik bir toplayıcıyı test eden ve hatalı sonuçta \`$error\` fırlatan profesyonel bir testbench örneğidir:`,
        code: {
          language: "systemverilog",
          caption: "4-Bit Toplayıcı Self-Checking Testbench",
          snippet: `// === DOĞRULANACAK TASARIM (DUT) ===
module adder4 (
  input  logic [3:0] a,
  input  logic [3:0] b,
  output logic [4:0] sum
);
  assign sum = a + b;
endmodule

// === TESTBENCH ===
module tb_adder4;
  logic [3:0] a;
  logic [3:0] b;
  logic [4:0] sum;
  int err_count = 0;

  // DUT Örneklemesi
  adder4 uut (
    .a   (a),
    .b   (b),
    .sum (sum)
  );

  initial begin
    $display("=== 4-BIT TOPLAYICI TESTİ BAŞLADI ===");
    
    // Test 1: 0 + 0
    a = 4'd0; b = 4'd0; #10;
    check_result(5'd0);

    // Test 2: 7 + 8
    a = 4'd7; b = 4'd8; #10;
    check_result(5'd15);

    // Test 3: 15 + 15 (Taşma testi)
    a = 4'd15; b = 4'd15; #10;
    check_result(5'd30);

    if (err_count == 0)
      $display(">>> BAŞARILI: Tüm test senaryoları 0 hatayla geçti! <<<");
    else
      $display(">>> HATA: Toplam %0d test başarısız oldu! <<<", err_count);

    $finish;
  end

  // Otomatik kontrol fonksiyonu
  task check_result(input logic [4:0] expected);
    if (sum !== expected) begin
      $error("[HATA @%0tns] a=%0d b=%0d -> Beklenen: %0d, Alınan: %0d", $time, a, b, expected, sum);
      err_count++;
    end else begin
      $display("[PASS @%0tns] a=%0d b=%0d -> sum=%0d (Doğru)", $time, a, b, sum);
    end
  endtask
endmodule`,
        },
      },
      {
        title: "6. Sık Yapılan Hatalar",
        content: `* **$finish Unutmak:** Testbench içinde \`$finish;\` çağrılmazsa ve sonsuz saat üreteci varsa (\`always #5 clk = ~clk;\`), simülasyon sonsuza kadar kilitlenir.
* **Gecikme Vermeden Okuma Yapmak:** Girdiyi verdikten hemen sonra aynı anda (\`#0\`) çıktıyı okumaya çalışmak, kombinasyonel yayılma henüz tamamlanmadığı için yanlış değer okumanıza neden olabilir.
* **Terslenmiş Port Bağlantısı:** Giriş ve çıkış portlarını yanlış bağlamak (örneğin DUT çıkışını testbench girişine atamak) simülatörde 'X' çakışmasına neden olur.`,
      },
      {
        title: "7. Hızlı Kontrol & Özet",
        content: `* Testbench bir 'kutu' gibidir; dış portu yoktur, içinde DUT'u barındırır.
* \`initial\` blokları simülasyon başında T=0 anında bir kez başlar ve sırayla yürütülür.
* \`check_result\` tarzı otomatik doğrulama mekanizmaları dalga formlarına (waveform) tek tek bakma zorunluluğunu ortadan kaldırır.`,
      },
    ],
    playground: {
      title: "Otomatik Doğrulayan Toplayıcı Testbench",
      initialCode: `module tb_playground_adder;
  logic [3:0] a, b;
  logic [4:0] sum;

  // 4-bit toplayıcı mantığı
  assign sum = a + b;

  initial begin
    $display("[START] Otomatik Test Başlatılıyor...");
    a = 4'd3; b = 4'd4; #10;
    $display("[@%0tns] %0d + %0d = %0d (Beklenen: 7)", $time, a, b, sum);
    
    a = 4'd10; b = 4'd5; #10;
    $display("[@%0tns] %0d + %0d = %0d (Beklenen: 15)", $time, a, b, sum);
    
    $display("[FINISH] Testbench tamamlandı.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_playground_adder.sv...",
        "[START] Otomatik Test Başlatılıyor...",
        "[@10ns] 3 + 4 = 7 (Beklenen: 7)",
        "[@20ns] 10 + 5 = 15 (Beklenen: 15)",
        "[FINISH] Testbench tamamlandı.",
      ],
      notes: "Giriş değerlerini değiştirip farklı matematiksel sonuçları gözlemleyin.",
    },
    quiz: {
      question:
        "Bir SystemVerilog testbench modülünün port listesi neden boştur (module tb; şeklinde tanımlanır)?",
      options: [
        "A) Verilog sözdizimi port yazmayı yasakladığı için.",
        "B) Testbench'in kendisi fiziksel bir çip olmayıp simülatör ortamında kapalı bir test ortamı teşkil ettiği için.",
        "C) Testbench modülleri sadece fonksiyonlardan oluştuğu için.",
        "D) Portlar tanımlanırsa FPGA sentez aracının hata vereceği için.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! Testbench, doğrulanacak devreyi (DUT) içine alan en üst düzey sanal kapsayıcıdır. Başka bir modüle sinyal verip almadığı için harici giriş/çıkış portu bulunmaz.",
    },
  },

  // ==========================================
  // MODÜL 2: VERİ TİPLERİ (DATA TYPES)
  // ==========================================
  "logic-type": {
    id: "logic-type",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "4-Durumlu Mantık: logic Veri Tipi",
    subtitle:
      "Verilog'daki kafa karıştırıcı reg ve wire ayrımına son veren modern çözüm: Tek sürücülü 4-durumlu logic tipi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog'un en çok kullanılan veri tipi olan \`logic\` yapısını derinlemesine inceleyeceğiz:
- 4-durumlu mantığın (**0, 1, X, Z**) fiziksel devrelerdeki karşılığı.
- Klasik Verilog'daki \`wire\` vs \`reg\` kabusunun neden ortaya çıktığı.
- \`logic\` tipinin hem prosedürel (\`always\`) hem de sürekli atamalarda (\`assign\`) nasıl tek tip olarak çalıştığı.
- **Tek Sürücü (Single Driver)** kuralı ve derleme anında çoklu sürücü hatalarını yakalama.
- Çoklu sürücülü çift yönlü hatlar için \`wire logic\` kullanımı.`,
      },
      {
        title: "2. 4-Durumlu Mantık ve Fiziksel Karşılıkları",
        content: `Dijital elektronikte kablolar sadece ikili (0 ve 1) düzeyde çalışmaz. Donanımı tam olarak modellemek için 4 durum zorunludur:

- **\`0\` (Logic LOW):** Toprak gerilimi (GND / 0V).
- **\`1\` (Logic HIGH):** Besleme gerilimi ($V_{DD}$ / örneğin 1.0V, 3.3V).
- **\`X\` (Unknown / Bilinmeyen):** Belirsiz mantıksal durum. Ya bir sinyal henüz sıfırlanmamıştır (uninitialized), ya da iki farklı sürücü aynı anda hatta çakışan değerler basıyordur (örneğin biri 0 basarken diğeri 1 basıyor).
- **\`Z\` (High Impedance / Yüksek Empedans):** Hatta hiçbir sürücü aktif değildir; hat elektriksel olarak havada yüzmektedir (floating / tri-state).

![Verilog reg/wire ve SystemVerilog logic Tip Karşılaştırması](/images/systemverilog/reg-wire-logic-comparison.svg)`,
      },
      {
        title: "3. Klasik Verilog Çıkmazı: wire mı reg mi?",
        content: `Klasik Verilog'da yeni başlayan mühendislerin en çok kafasını karıştıran kural şuydu:
- Bir sinyale \`assign\` ile atama yapacaksanız \`wire\` olmalıdır.
- Bir sinyale \`always\` bloğu içinde atama yapacaksanız \`reg\` olmalıdır.

Ancak buradaki \`reg\` kelimesi donanımsal bir register (flip-flop) anlamına **gelmiyordu**! Kombinasyonel bir MUX yazarken bile \`reg\` tanımlamak zorundaydınız. Bu kafa karışıklığı donanım tasarımcıları arasında yıllarca büyük hatalara sebep oldu.

**SystemVerilog Çözümü:** \`logic\` tipi geldi! Artık hem \`assign\` hem \`always\` bloklarında doğrudan \`logic\` kullanabilirsiniz.`,
        callout: {
          type: "success",
          title: "Altın Kural",
          message:
            "Modern SystemVerilog kodlarında (RTL veya Testbench), çift yönlü tri-state hatlar haricinde 'wire' ve 'reg' sözcüklerini tamamen unutun ve her yerde 'logic' kullanın!",
        },
      },
      {
        title: "4. Tek Sürücü (Single Driver) Güvenlik Kuralı",
        content: `SystemVerilog'da \`logic\` tipi bir **değişken (variable)** türüdür. Bu sayede simülatör, bir \`logic\` sinyaline birden fazla sürücünün aynı anda atama yapmasını derleme aşamasında yasaklar:

\`\`\`systemverilog
module illegal_drivers;
  logic data;

  assign data = 1'b1;  // Sürücü #1 (Sürekli atama)
  assign data = 1'b0;  // HATA: logic değişkenine birden fazla sürücü bağlanamaz!
endmodule
\`\`\`

Bu harika özellik sayesinde, devrenizde yanlışlıkla iki bloğun aynı tele sürmesi hatası (bus contention) simülasyon bile başlamadan derleyicide yakalanır.`,
      },
      {
        title: "5. Çoklu Sürücülü Çift Yönlü Hatlar: wire logic",
        content: `Peki I2C haberleşmesi veya hafıza veri yolları gibi gerçek çift yönlü (tri-state) hatları nasıl modelleyeceğiz?
Birden fazla sürücüye izin veren bir net türüne ihtiyacımız olduğunda, net türü ile \`logic\` veri tipini birleştiririz:

\`\`\`systemverilog
module tristate_bus (
  inout wire logic [7:0] data_bus // Çoklu sürücüyü destekleyen 4-durumlu hat
);
  logic drive_enable;
  logic [7:0] tx_data;

  // Hat aktifse veri bas, değilse Z (yüksek empedans) bırak
  assign data_bus = drive_enable ? tx_data : 8'hZZ;
endmodule
\`\`\``,
      },
      {
        title: "6. ChipVerify Örneği: Prosedürel ve Sürekli logic Kullanımı",
        content: `Aşağıdaki kapsamlı ChipVerify örneğinde hem \`always_comb\` hem de \`assign\` içinde \`logic\` tipinin kullanımını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "logic Veri Tipi Kullanım Örneği",
          snippet: `module tb_logic_demo;
  logic [3:0]  my_data; // 4-bit 4-durumlu vektör
  logic        en;      // 1-bit logic

  initial begin
    $display("[T=0] Başlangıç Değerleri (Uninitialized):");
    $display("  my_data = 0x%0h (Beklenen: 4'bxxxx)", my_data);
    $display("  en      = %0b   (Beklenen: 1'bx)", en);

    #10;
    my_data = 4'hA;
    en      = 1'b1;
    $display("[T=10] Atama Sonrası:");
    $display("  my_data = 0x%0h (%04b)", my_data, my_data);
    $display("  en      = %0b", en);

    #10;
    my_data = 4'b1x0z;
    $display("[T=20] 4-Durumlu Karışık Değer:");
    $display("  my_data = %b", my_data);
    $finish;
  end
endmodule`,
        },
      },
      {
        title: "7. Sık Yapılan Hatalar & Özet",
        content: `* **Başlatılmamış logic'i Doğrudan Okumak:** \`logic\` sinyalleri T=0 anında \`X\` (bilinmeyen) başlar. Reset verilmeden okunursa X durumu tüm tasarıma yayılır (X-propagation).
* **Tri-state Hatta Düz logic Tanımlamak:** Çift yönlü bir hatta \`inout logic\` derseniz derleyici çoklu sürücü hatası verir; doğrusu \`inout wire logic\` dir.`,
      },
    ],
    playground: {
      title: "logic Veri Tipi ve 4-Durumlu Simülasyon",
      initialCode: `module tb_playground_logic;
  logic [3:0] sig_a;
  logic [3:0] sig_b;
  logic [3:0] result_and;

  assign result_and = sig_a & sig_b;

  initial begin
    $display("[T=0] sig_a=%b, sig_b=%b => AND=%b", sig_a, sig_b, result_and);
    #10 sig_a = 4'b1100; sig_b = 4'b1010;
    #10;
    $display("[T=20] sig_a=%b, sig_b=%b => AND=%b", sig_a, sig_b, result_and);
    #10 sig_a = 4'b11xx; sig_b = 4'b1010;
    #10;
    $display("[T=40] X Durumu ile AND: sig_a=%b => AND=%b", sig_a, result_and);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_playground_logic.sv...",
        "[T=0] sig_a=xxxx, sig_b=xxxx => AND=xxxx",
        "[T=20] sig_a=1100, sig_b=1010 => AND=1000",
        "[T=40] X Durumu ile AND: sig_a=11xx => AND=10xx",
      ],
      notes: "X değerinin AND işleminde nasıl yayıldığını gözlemleyin (1 & X = X, ancak 0 & X = 0).",
    },
    quiz: {
      question:
        "SystemVerilog'da 'logic' tipinde tanımlanmış bir sinyale iki farklı 'assign' ifadesiyle değer atanırsa ne olur?",
      options: [
        "A) İki değer 'OR' mantığıyla birleşir ve simülasyon devam eder.",
        "B) Derleme (elaboration) aşamasında derleyici 'Multiple drivers on variable' hatası verir.",
        "C) Sinyal otomatik olarak 'Z' durumuna geçer.",
        "D) Son atanan değer geçerli olur.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 'logic' bir değişkendir ve tek sürücü kuralına tabidir. Birden fazla blok veya assign aynı değişkene sürmeye çalıştığında derleme anında hata oluşur.",
    },
  },

  "2-state-types": {
    id: "2-state-types",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "11 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "2-Durumlu Tipler: bit, byte, int, longint",
    subtitle:
      "Simülasyon performansını katlayan 2-durumlu (0 ve 1) veri tipleri, işaretli/işaretsiz yapılar ve bellek boyutları.",
    sections: [
      {
        title: "1. 2-Durumlu (2-State) vs 4-Durumlu (4-State) Mantık",
        content: `Klasik Verilog'da tüm veri tipleri 4-durumludur: \`0\`, \`1\`, \`X\` (bilinmeyen) ve \`Z\` (yüksek empedans). Donanım devrelerinde X ve Z durumları fiziksel gerçekliği modellemek için şarttır.

Ancak doğrulama (testbench) ortamlarında paket sayaçları, döngü indisleri ve saf veri yükleri (payload) için X ve Z durumlarına ihtiyaç duyulmaz. 4-durumlu her bir değişken bellekte fazladan bellek ve işlemci gücü tüketir. **SystemVerilog**, yalnızca \`0\` ve \`1\` değerini alan **2-durumlu (2-state)** tipleri C/C++ dillerinden esinlenerek tanıttı.

![SystemVerilog 2-Durumlu Tipler Mimarisi](/images/systemverilog/sv-2state-types.svg)`,
        callout: {
          type: "warning",
          title: "Varsayılan Başlangıç Değerleri",
          message:
            "4-durumlu tipler (`logic`, `integer`) simülasyon başlangıcında varsayılan olarak 'X' değerini alırken; 2-durumlu tipler (`bit`, `byte`, `int`) varsayılan olarak '0' değerini alır. Sıfırlanmamış bir donanım sinyali için 2-durumlu tip kullanırsanız, X arızalarını maskeleyebilirsiniz!",
        },
      },
      {
        title: "2. SystemVerilog 2-Durumlu Veri Tipleri Tablosu",
        content: `Tüm 2-durumlu tipler C dilindeki standart tamsayı boyutlarıyla birebir örtüşür:

- **\`bit\`**: 1-bit genişliğinde işaretsiz (unsigned). İstenen genişlikte vektör yapılabilir: \`bit [7:0] my_byte;\`
- **\`byte\`**: 8-bit genişliğinde **işaretli (signed)** tamsayı (-128 ile +127 arası).
- **\`shortint\`**: 16-bit genişliğinde işaretli tamsayı (-32768 ile +32767 arası).
- **\`int\`**: 32-bit genişliğinde işaretli tamsayı (en sık kullanılan sayaç tipi).
- **\`longint\`**: 64-bit genişliğinde işaretli tamsayı (büyük zaman ve adres değerleri için).
- **\`time\` / \`realtime\`**: 64-bit simülasyon zamanı tutucu tipler.`,
        code: {
          language: "systemverilog",
          caption: "2-Durumlu Tipler ve unsigned Tanımlama",
          snippet: `module datatypes_demo;
  bit        single_flag = 1'b1;       // 1-bit (0 veya 1)
  bit [7:0]  data_byte   = 8'hA5;      // 8-bit işaretsiz vektör
  byte       signed_b    = 8'h80;      // -128 (işaretli!)
  byte unsigned u_byte   = 8'h80;      // +128 (işaretsiz!)
  int        counter     = 1000;       // 32-bit işaretli
  longint    cycle_count = 64'd500000; // 64-bit

  initial begin
    $display("signed_b = %0d (işaretli)", signed_b);
    $display("u_byte   = %0d (işaretsiz)", u_byte);
  end
endmodule`,
        },
      },
      {
        title: "3. İşaret Genişletme (Sign Extension) ve Taşma",
        content: `\`byte\` tipi varsayılan olarak signed olduğu için, en anlamlı bit (MSB) 1 olduğunda SystemVerilog bunu negatif sayı kabul eder ve 32-bit \`int\` içine atanırken işaret bitini genişletir (sign extend). İşaretsiz baytlar için her zaman \`byte unsigned\` kullanılmalıdır.`,
      },
      {
        title: "4. 4-Durumlu Değerin 2-Durumlu Tipe Atanması",
        content: `Bir \`logic\` sinyali \`X\` veya \`Z\` değerindeyken bunu bir \`bit\` değişkenine atarsanız ne olur?
IEEE 1800 standardına göre:
- Hem \`X\` hem de \`Z\` değerleri otomatik olarak **\`0\`** değerine dönüştürülür.
Bu dönüşüm sessizce gerçekleşir (herhangi bir uyarı üretilmez), bu yüzden donanım arayüzlerinde \`bit\` yerine daima \`logic\` tercih edilmelidir.`,
      },
    ],
    playground: {
      title: "2-Durumlu Tipler ve İşaretli Aritmetik Simülatörü",
      initialCode: `module tb_2state;
  byte signed_val = -5;
  byte unsigned unsigned_val = 250;
  bit [3:0] nibble = 4'b1111; // 15

  initial begin
    $display("signed_val   = %0d", signed_val);
    $display("unsigned_val = %0d", unsigned_val);
    $display("nibble       = %0d", nibble);
    
    // İşaret taşması denemesi
    signed_val = 127;
    signed_val = signed_val + 1;
    $display("127 + 1 byte signed = %0d (Taşma!)", signed_val);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_2state.sv...",
        "signed_val   = -5",
        "unsigned_val = 250",
        "nibble       = 15",
        "127 + 1 byte signed = -128 (Taşma!)",
      ],
      notes: "127 sayısına 1 eklendiğinde byte tipi 8-bit ikiye tümleyen gereği -128'e taşar.",
    },
    quiz: {
      question:
        "SystemVerilog'da başlatılmamış (değer verilmemiş) bir 'bit' değişkeninin simülasyon başlangıcındaki değeri nedir?",
      options: ["A) X", "B) Z", "C) 0", "D) 1"],
      correctIndex: 2,
      explanation:
        "Doğru! 2-durumlu tipler (bit, byte, int) yalnızca 0 ve 1 değerini alabilir ve simülasyon başladığında varsayılan olarak 0 değerini alırlar.",
    },
  },

  "strings": {
    id: "strings",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "11 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Dizgeler (Strings) ve Dahili Metodları",
    subtitle:
      "Dinamik boyutlu metin yönetimi, dahili fonksiyonlar ve log/mesaj formatlama.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog'un güçlü \`string\` veri tipini ve yerleşik fonksiyonlarını öğreneceksiniz:
- Klasik Verilog'daki sabit genişlikli \`reg [8*N-1:0]\` yaklaşımı ile SystemVerilog \`string\` tipi farkı.
- Dinamik bellek tahsisi ve otomatik boyutlandırma.
- Yerleşik metin işleme fonksiyonları: \`len()\`, \`putc()\`, \`getc()\`, \`toupper()\`, \`tolower()\`, \`substr()\`.
- Sayı-dizge dönüşümleri: \`atoi()\`, \`atohex()\`, \`atobin()\`, \`itoa()\`, \`hextoa()\`.
- Testbench raporlamasında ve paket başlıklarında string kullanımı.`,
      },
      {
        title: "2. SystemVerilog String Mimarisi",
        content: `![SystemVerilog String Tipleri ve Metotları](/images/systemverilog/sv-strings.svg)

Klasik Verilog'da dizgeler aslında sabit boyutlu birer bayt vektörüydü. Eğer 10 karakterlik bir metni 20 karakterlik vektöre atarsanız, boşta kalan baytlar \`8'h00\` (NULL) ile doldurulurdu.
SystemVerilog ise C++ \`std::string\` benzeri **dinamik boyutlu \`string\`** tipini getirdi. Metin uzadıkça bellek dinamik olarak tahsis edilir.`,
      },
      {
        title: "3. Temel String Metotları",
        content: `SystemVerilog \`string\` tipi nesne yönelimli birçok faydalı metoda sahiptir:

| Metot | Görevi | Örnek |
| :--- | :--- | :--- |
| **\`str.len()\`** | Karakter sayısını (uzunluğu) döner | \`s.len()\` |
| **\`str.putc(i, c)\`** | \`i\`. indeksteki karakteri değiştirir | \`s.putc(0, "A")\` |
| **\`str.getc(i)\`** | \`i\`. indeksteki karakterin ASCII kodunu döner | \`byte b = s.getc(2)\` |
| **\`str.toupper()\`** | Tüm harfleri büyük harfe çevirir | \`s = s.toupper()\` |
| **\`str.tolower()\`** | Tüm harfleri küçük harfe çevirir | \`s = s.tolower()\` |
| **\`str.substr(i, j)\`** | \`i\` ile \`j\` arasındaki alt dizgeyi döner | \`sub = s.substr(0, 3)\` |`,
      },
      {
        title: "4. ChipVerify Örneği: String İşlemleri ve Dönüşümler",
        content: `Aşağıdaki kodda metin manipülasyonu ve sayı dönüşümlerini inceleyebilirsiniz:`,
        code: {
          language: "systemverilog",
          caption: "String Metodları ve Dönüşüm Örneği",
          snippet: `module tb_strings;
  string s1 = "ChipVerify";
  string s2 = " SystemVerilog";
  string full;
  string num_str = "1234";
  int val;

  initial begin
    // Birleştirme
    full = {s1, s2};
    $display("Birleştirilmiş Metin: %s", full);
    $display("Karakter Uzunluğu: %0d", full.len());

    // Alt dize (Substring)
    $display("İlk 4 Harf: %s", full.substr(0, 3));

    // Büyük / Küçük Harf
    $display("BÜYÜK: %s", full.toupper());

    // String -> Integer Dönüşümü
    val = num_str.atoi();
    $display("Metinden Sayıya: %0d + 10 = %0d", val, val + 10);
  end
endmodule`,
        },
      },
      {
        title: "5. Sık Yapılan Hatalar",
        content: `* **String'i RTL Tasarımında Kullanmak:** \`string\` dinamik bir veri yapısıdır; donanım kapılarına (LUT) sentezlenemez. Sadece testbench ortamlarında kullanılmalıdır.
* **Geçersiz İndeksle getc/putc Çağırmak:** \`str.len()\` sınırını aşan bir indekse erişmek simülatörün çalışma zamanı hatası vermesine neden olur.`,
      },
    ],
    playground: {
      title: "String Manipülasyon Simülatörü",
      initialCode: `module tb_str_playground;
  string greeting = "merhaba systemverilog";
  string upper_str;

  initial begin
    $display("Orijinal Metin: %s (Uzunluk: %0d)", greeting, greeting.len());
    upper_str = greeting.toupper();
    $display("Büyük Harf: %s", upper_str);
    $display("İlk Kelime: %s", greeting.substr(0, 6));
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_str_playground.sv...",
        "Orijinal Metin: merhaba systemverilog (Uzunluk: 21)",
        "Büyük Harf: MERHABA SYSTEMVERILOG",
        "İlk Kelime: merhaba",
      ],
      notes: "substr ve toupper gibi metotları test ederek dizge çıktısını gözlemleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 's' bir string değişkeni iken s.substr(2, 4) ifadesi ne üretir?",
      options: [
        "A) 2. karakterden başlayarak 4 karakterlik bir alt dize",
        "B) 2. indeksten 4. indekse kadar (dahil) olan karakterleri içeren alt dize",
        "C) 2. karakter ile 4. karakterin ASCII toplamını",
        "D) Metindeki ilk 2 ve son 4 karakteri",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! SystemVerilog substr(i, j) fonksiyonu, i indeksinden başlayıp j indeksine kadar olan (her iki indeks de dahil) alt dizgeyi döndürür.",
    },
  },

  "enums": {
    id: "enums",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "12 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Numaralandırılmış Tipler (enum) ve Güvenli Durum Kodlama",
    subtitle:
      "Tip güvenli durum makineleri (FSM), otomatik kodlama ve enum yerleşik metodları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste son derece kritik bir SystemVerilog özelliği olan \`enum\` yapılarını öğreneceksiniz:
- Klasik parametre (\`parameter\`) tanımlarının getirdiği tip karmaşası ve tehlikeleri.
- \`typedef enum\` sözdizimi ve durum makinesi (FSM) tasarımı.
- Taban veri tipi belirleme (\`logic [1:0]\`, \`int\`) ve özel değer atama.
- Tip güvenliği: Neden doğrudan tamsayı atanamaz ve \`$cast\` gerekebilir?
- Yerleşik enum metodları: \`first()\`, \`last()\`, \`next()\`, \`prev()\`, \`num()\`, \`name()\`.`,
      },
      {
        title: "2. SystemVerilog Enum Mimarisi",
        content: `![SystemVerilog Enum Tipleri ve Metotları](/images/systemverilog/sv-enums.svg)

Klasik Verilog'da durum makineleri \`parameter IDLE = 2'b00, READ = 2'b01;\` şeklinde tanımlanırdı. Ancak bu parametreler sıradan tamsayılar olduğu için, bir tasarımcı yanlışlıkla \`state = 2'b11\` (tanımsız bir durum) atadığında derleyici bunu fark edemezdi.
SystemVerilog **\`enum\`** ile güçlü bir tip sistemi getirdi. Bir enum değişkenine yalnızca tanımlı etiketler atanabilir!`,
      },
      {
        title: "3. Taban Tip Belirleme ve Özel Değerler",
        content: `Varsayılan olarak bir enum 32-bit \`int\` tabanlıdır. Donanım sentezinde gereksiz kapı harcamamak için her zaman taban tip açıkça belirtilmelidir:

\`\`\`systemverilog
// 2-bit genişliğinde FSM durumları
typedef enum logic [1:0] {
  IDLE  = 2'b00,
  SETUP = 2'b01,
  READ  = 2'b10,
  WRITE = 2'b11
} fsm_state_e;
\`\`\``,
      },
      {
        title: "4. Enum Yerleşik Metotları",
        content: `SystemVerilog enum tipleri durum makineleri üzerinde döngü kurmayı ve simülasyonda durum ismini yazdırmayı çok kolaylaştıran dahili metotlara sahiptir:

- **\`name()\`**: Durumun sembolik adını string olarak döner (örneğin \`"IDLE"\`). Simülasyon loglarında doğrudan durum ismini görmek için paha biçilmezdir!
- **\`first()\`**: Enum kümesindeki ilk elemanın değerini döner.
- **\`last()\`**: Son elemanın değerini döner.
- **\`next(N)\`**: N adım sonraki elemanı döner (varsayılan N=1). Sona gelindiğinde başa sarar (wrap-around).
- **\`prev(N)\`**: N adım önceki elemanı döner.
- **\`num()\`**: Toplam durum sayısını döner.`,
      },
      {
        title: "5. ChipVerify Örneği: Enum Döngüsü ve .name() Metodu",
        content: `Aşağıdaki kod, tüm durumlar üzerinde nasıl dönüldüğünü ve loglarda string isimlerinin nasıl basıldığını gösterir:`,
        code: {
          language: "systemverilog",
          caption: "Enum Metotları ile FSM Durum Gezinmesi",
          snippet: `module tb_enum_demo;
  typedef enum logic [1:0] {
    IDLE,
    SETUP,
    ACCESS
  } state_e;

  state_e current_state;

  initial begin
    current_state = current_state.first();

    for (int i = 0; i < current_state.num(); i++) begin
      $display("Adım %0d: Değer = %0d, Durum Adı = %s", 
               i, current_state, current_state.name());
      current_state = current_state.next();
    end
  end
endmodule`,
        },
      },
      {
        title: "6. Sık Yapılan Hatalar",
        content: `* **Doğrudan Tamsayı Atamak:** \`current_state = 1;\` yazmak SystemVerilog'da derleme hatasıdır! Tamsayı değeri atamak için \`$cast(current_state, 1);\` veya doğrudan etiket (\`current_state = SETUP;\`) kullanılmalıdır.
* **Taban Tipi Belirtmeyi Unutmak:** \`enum {A, B} state;\` derseniz 32-bit int kullanılır; FPGA sentezinde gereksiz register israfına yol açar.`,
      },
    ],
    playground: {
      title: "Enum FSM Durum Makinesi Simülatörü",
      initialCode: `module tb_fsm_enum;
  typedef enum logic [1:0] {
    S_IDLE  = 2'b00,
    S_READY = 2'b01,
    S_BUSY  = 2'b10,
    S_DONE  = 2'b11
  } state_t;

  state_t state;

  initial begin
    state = S_IDLE;
    $display("Başlangıç Durumu: %s (%b)", state.name(), state);
    state = state.next();
    $display("Sonraki Durum:   %s (%b)", state.name(), state);
    state = S_DONE;
    $display("Bitiş Durumu:     %s (%b)", state.name(), state);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_fsm_enum.sv...",
        "Başlangıç Durumu: S_IDLE (00)",
        "Sonraki Durum:   S_READY (01)",
        "Bitiş Durumu:     S_DONE (11)",
      ],
      notes: "state.name() fonksiyonunun nasıl doğrudan string durum adı bastığını inceleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da tanımlı bir enum değişkenine 'state = 2;' şeklinde doğrudan sayısal atama yapıldığında ne gerçekleşir?",
      options: [
        "A) Simülatör 2. sıradaki durumu otomatik seçer.",
        "B) Derleme hatası oluşur; çünkü SystemVerilog güçlü tip kontrolü (strong typing) uygular.",
        "C) Simülasyon zaman aşımına uğrar.",
        "D) Sayısal değer ikiliye çevrilip sessizce atanır.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! SystemVerilog enum tiplerinde güçlü tip güvenliği (strong typing) vardır. Tamsayı doğrudan atanamaz; ya sembolik ad kullanılmalı ya da $cast fonksiyonu çağrılmalıdır.",
    },
  },

  "struct-union": {
    id: "struct-union",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "13 dk okuma",
    level: "Orta Seviye",
    title: "Yapılar (struct) ve Birlikler (union)",
    subtitle:
      "Paketlenmiş (packed) ve paketlenmemiş veri paketleme mimarileri, bit düzeyinde hizalama ve union modelleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog'un veri paketleme yapı taşları olan \`struct\` ve \`union\` yapılarını öğreneceksiniz:
- **Paketlenmemiş (Unpacked) struct:** C tarzı heterojen veri alanlarını bir araya getirme.
- **Paketlenmiş (Packed) struct:** Bitişik tek bir bit vektörü gibi davranan ve sentezlenebilir donanım register'ları.
- Bit dilimleme (Bit slicing) ve packed struct'ı vektör olarak kullanma.
- **Birlikler (Union):** Aynı bellek alanını farklı veri formatlarında yorumlama.
- Paketlenmiş union (Packed union) ile protokol başlığı çözümleme.`,
      },
      {
        title: "2. Struct vs Union Mimari Karşılaştırması",
        content: `![SystemVerilog Struct vs Union Mimarisi](/images/systemverilog/systemverilog-union-struct-vs-union.svg)

Yukarıdaki diyagramda görüldüğü gibi:
- **\`struct\` (Yapı):** İçindeki her bir üye bellekte **ardışık ayrı alanlar** kaplar. Toplam boyut tüm üyelerin boyutlarının toplamıdır.
- **\`union\` (Birlik):** İçindeki tüm üyeler **aynı bellek alanını** paylaşır. Toplam boyut en büyük üyenin boyutuna eşittir.`,
      },
      {
        title: "3. Paketlenmiş (Packed) vs Paketlenmemiş (Unpacked) Struct",
        content: `SystemVerilog'da iki çeşit struct vardır:

1. **Unpacked Struct:** Üyeler simülatör belleğinde ayrı ayrı saklanır. Bir tamsayı gibi aritmetik işleme sokulamaz veya tek bir vektör olarak atanamaz.
2. **Packed Struct (\`typedef struct packed\`):** Üyeler bit düzeyinde bitişik olarak dizilir. Tek bir \`logic [N-1:0]\` vektörü gibi davranır!

![SystemVerilog Packed Union Örneği](/images/systemverilog/systemverilog-union-packed-example.svg)`,
        callout: {
          type: "tip",
          title: "Sentezlenebilir RTL İçin Altın Kural",
          message:
            "Donanım kayıtları (control registers) veya paket başlıkları tanımlarken her zaman 'struct packed' kullanın. Böylece hem alan adlarıyla (.parity, .data) erişebilir hem de tek bir veri yolu olarak sürebilirsiniz.",
        },
      },
      {
        title: "4. ChipVerify Örneği: Packed Struct Kullanımı",
        content: `Aşağıdaki örnekte bir haberleşme protokolü başlığının packed struct ile nasıl modellendiğini görebilirsiniz:`,
        code: {
          language: "systemverilog",
          caption: "Paketlenmiş Protokol Başlığı Struct'ı",
          snippet: `module tb_struct_demo;
  // 16-bitlik toplam paket başlığı (bitişik)
  typedef struct packed {
    logic [3:0] preamble; // [15:12]
    logic [7:0] payload;  // [11:4]
    logic [3:0] crc;      // [3:0]
  } packet_t;

  packet_t pkt;

  initial begin
    // Alanlara tek tek erişim
    pkt.preamble = 4'hA;
    pkt.payload  = 8'h55;
    pkt.crc      = 4'hF;

    $display("16-Bit Toplam Vektör Değeri: 0x%04h", pkt);
    $display("Preamble = 0x%0h, Payload = 0x%0h, CRC = 0x%0h", 
             pkt.preamble, pkt.payload, pkt.crc);

    // Bütünsel vektör ataması
    pkt = 16'hBEEF;
    $display("Yeni Atama Sonrası Preamble = 0x%0h", pkt.preamble);
  end
endmodule`,
        },
      },
      {
        title: "5. Paketlenmiş Birlikler (Packed Union)",
        content: `Bir 32-bit register'ı hem 32-bitlik tek bir tamsayı olarak, hem de 4 adet 8-bitlik bayt olarak aynı anda okumak istediğinizde \`union packed\` kullanılır:
\`\`\`systemverilog
typedef union packed {
  logic [31:0]       word;
  logic [3:0][7:0]   bytes;
} reg32_u;
\`\`\`
Bu sayede donanım tasarımında tip dönüşümü yapmadan register dilimleme kolaylaşır.`,
      },
      {
        title: "6. Sık Yapılan Hatalar & Özet",
        content: `* **Packed Struct İçinde 2-Durumlu ve 4-Durumlu Tipleri Karıştırmak:** Packed bir struct içindeki tüm elemanlar ya tamamen 4-durumlu (\`logic\`) ya da tamamen 2-durumlu (\`bit\`) olmalıdır.
* **Unpacked Struct'ı Vektör Gibi Yazdırmak:** Unpacked struct tek bir \`%h\` formatıyla basılamaz; her alanı ayrı ayrı yazdırılmalıdır.`,
      },
    ],
    playground: {
      title: "Paketlenmiş Struct Simülatörü",
      initialCode: `module tb_struct_sim;
  typedef struct packed {
    logic [7:0] addr;
    logic [7:0] data;
  } bus_pkt_t;

  bus_pkt_t pkt;

  initial begin
    pkt.addr = 8'h10;
    pkt.data = 8'hFF;
    $display("Adres: 0x%02h, Veri: 0x%02h", pkt.addr, pkt.data);
    $display("16-Bit Ham Veri: 0x%04h", pkt);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_struct_sim.sv...",
        "Adres: 0x10, Veri: 0xff",
        "16-Bit Ham Veri: 0x10ff",
      ],
      notes: "pkt değişkeninin 16-bitlik tek bir vektör olarak nasıl basıldığını gözlemleyin.",
    },
    quiz: {
      question:
        "Paketlenmiş (packed) bir struct ile paketlenmemiş (unpacked) bir struct arasındaki en temel fark nedir?",
      options: [
        "A) Packed struct sentezlenemez, unpacked sentezlenir.",
        "B) Packed struct bit düzeyinde bitişik bir vektör gibi saklanır ve tek bir vektör olarak atanabilir.",
        "C) Unpacked struct sadece tamsayı tutabilir.",
        "D) İkisi arasında simülasyonda hiçbir fark yoktur.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! Packed struct içindeki üyeler bellekte bit düzeyinde bitişik (contiguous) bir vektör olarak yerleşir; bu sayede tek bir sinyal hattı veya register gibi işlem görebilir.",
    },
  },

  "typedef-alias": {
    id: "typedef-alias",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "9 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Özel Tipler: typedef ve alias",
    subtitle:
      "Okunabilir ve tekrar kullanılabilir tip tanımlamaları oluşturma, forward declarations ve çift yönlü alias eşlemeleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog'un kod mimarisini düzenleyen \`typedef\` ve \`alias\` anahtar kelimelerini öğreneceksiniz:
- Kod okunabilirliğini artıran kullanıcı tanımlı tipler (\`typedef\`).
- Endüstriyel isimlendirme standartları (\`_t\`, \`_e\`, \`_s\`).
- İleriye dönük sınıf bildirimi: \`typedef class\`.
- Çift yönlü donanım sinyali bağlama: \`alias\` ifadesi.
- \`alias\` ile \`assign\` arasındaki kritik farklar.`,
      },
      {
        title: "2. SystemVerilog Typedef ve Alias Mimarisi",
        content: `![SystemVerilog Typedef ve Alias Mimarisi](/images/systemverilog/sv-typedef-alias.svg)

Büyük SoC projelerinde yüz binlerce sinyal bulunur. 32-bitlik bir veri yolunu her modülde \`logic [31:0]\` olarak tanımlamak yerine \`word_t\` olarak tanımlamak projenin taşınabilirliğini ve bakımını büyük ölçüde kolaylaştırır.`,
      },
      {
        title: "3. typedef ile Özel Tipler Oluşturma",
        content: `\`typedef\` mevcut bir veri tipine yeni bir isim vermek için kullanılır:

\`\`\`systemverilog
typedef logic [31:0] uint32_t;
typedef logic [63:0] address_t;
typedef logic [7:0]  byte_t;

// Kullanım:
address_t mem_addr;
uint32_t  data_word;
\`\`\`

Eğer gelecekte adres veri yolu 64-bit yerine 48-bit yapılırsa, projedeki tek bir \`typedef\` satırını güncellemek tüm tasarımı düzeltmek için yeterlidir.`,
      },
      {
        title: "4. Forward Declaration: typedef class",
        content: `İki sınıfın birbirini referans ettiği durumlarda (döngüsel bağımlılık / circular dependency), derleyici henüz tanımlanmamış sınıfı görünce hata verir. Bu sorunu çözmek için sınıfın varlığı önceden bildirilir:

\`\`\`systemverilog
typedef class Driver; // İleriye dönük bildirim

class Generator;
  Driver drv; // Henüz tanımlanmamış Driver sınıfı referans alınabilir
endclass

class Driver;
  Generator gen;
endclass
\`\`\``,
      },
      {
        title: "5. alias: Çift Yönlü Donanım Sinyal Eşleme",
        content: `Klasik Verilog'daki \`assign\` tek yönlü bir sürücüdür (\`assign a = b;\` dendiğinde b sinyali a'yı sürer, ancak a b'yi süremez).
SystemVerilog'un **\`alias\`** ifadesi ise iki net (hat) arasında gerçek çift yönlü elektriksel kısa devre oluşturur:

\`\`\`systemverilog
module pin_mux;
  wire reset_pin, rst_n_net;

  // reset_pin ve rst_n_net artık elektriksel olarak AYNI HATTIR
  alias reset_pin = rst_n_net;
endmodule
\`\`\``,
        callout: {
          type: "info",
          title: "alias vs assign",
          message:
            "assign tek yönlü veri transferi yaparken, alias çift yönlü elektriksel bağ kurar. Her iki hattan birine yapılan değişiklik diğer hatta anında yansır.",
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* \`typedef\` kodun okunabilirliğini ve parametrik esnekliğini artırır.
* \`typedef class\` döngüsel bağımlılıkları çözer.
* \`alias\` sentezlenebilir çift yönlü net eşlemesi sağlar.`,
      },
    ],
    playground: {
      title: "Typedef ile Özel Tip Tanımlama Simülatörü",
      initialCode: `module tb_typedef;
  typedef logic [15:0] halfword_t;
  typedef logic [7:0]  byte_t;

  halfword_t hw = 16'hABCD;
  byte_t     b  = 8'h12;

  initial begin
    $display("Halfword = 0x%04h (Genişlik: %0d bit)", hw, $bits(hw));
    $display("Byte     = 0x%02h (Genişlik: %0d bit)", b, $bits(b));
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_typedef.sv...",
        "Halfword = 0xabcd (Genişlik: 16 bit)",
        "Byte     = 0x12 (Genişlik: 8 bit)",
      ],
      notes: "$bits() fonksiyonu ile typedef tiplerinin donanımsal bit genişliğini inceleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'alias' anahtar kelimesi ile 'assign' arasındaki temel fark nedir?",
      options: [
        "A) alias sadece simülasyonda çalışır, assign sentezlenir.",
        "B) assign tek yönlü bir sürücü iken, alias iki hat arasında çift yönlü eşleme sağlar.",
        "C) alias sadece class içinde kullanılır.",
        "D) İkisi tamamen aynı işlevi görür.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! assign tek yönlü sinyal aktarımı sağlarken (sağdan sola), alias iki neti birbirine çift yönlü bağlayarak elektriksel olarak tek bir hat haline getirir.",
    },
  },
};
