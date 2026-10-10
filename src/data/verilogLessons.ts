import { LessonContent } from "./lessonsData";

export const VERILOG_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // 1. SAYISAL MANTIK & VERILOG TEMELLERİ
  // ========================================================
  "verilog-fpga-intro": {
    id: "verilog-fpga-intro",
    badge: "Modül 1 • Sayısal Mantık",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog HDL'e Giriş ve Sayısal Mantık Kapıları",
    subtitle: "C veya Python gibi sıralı çalışan yazılımlardan farklı olarak gerçek silikon donanım kapılarını tanımlama sanatı.",
    sections: [
      {
        title: "1. Donanım Tanımlama Dili (HDL) Nedir? Yazılım vs Donanım",
        content: `C, Java veya Python dillerinde yazdığınız kodlar bir mikroişlemci (CPU) tarafından satır satır, sıralı (sequential) olarak işletilir. 

Oysa bir **Donanım Tanımlama Dili (HDL - Hardware Description Language)** olan **Verilog**, program işletmek için değil; transistörleri, mantık kapılarını ve flip-flop'ları birbirine bağlayan **fiziksel elektronik devreleri tarif etmek** için kullanılır.

Verilog'da tanımladığınız iki farklı devre bloğu silikon üzerinde yan yana fiziksel olarak bulunur ve **aynı anda, paralel (concurrent)** olarak çalışır. Biri diğerinin bitmesini beklemez.`,
        callout: {
          type: "info",
          title: "Temel Zihniyet Değişimi",
          message: "Verilog kodlarken kod satırları değil; AND kapıları, çoklayıcılar (MUX), kablolar ve saat darbeleriyle tetiklenen bellek hücreleri hayal etmelisiniz.",
        },
      },
      {
        title: "2. Verilog Modül Anatomisi (module ... endmodule)",
        content: `Verilog'da temel yapı taşı **modül (module)** olarak adlandırılır. Bir modül; girdi portları (inputs), çıktı portları (outputs) ve içerideki mantıksal bağlantılardan oluşan kara bir kutudur.

Genel modül şablonu şu şekildedir:`,
        code: {
          language: "verilog",
          caption: "logic_gates.v - Temel Mantık Kapıları Modülü",
          snippet: `module logic_gates (
    input  wire a,      // 1-bit birinci giriş
    input  wire b,      // 1-bit ikinci giriş
    output wire out_and,// a VE b
    output wire out_or, // a VEYA b
    output wire out_xor,// a ÖZEL VEYA b
    output wire out_not // a DEĞİL
);

    // Sürekli atama (Continuous Assignment) ile kapı tanımları
    assign out_and = a & b;
    assign out_or  = a | b;
    assign out_xor = a ^ b;
    assign out_not = ~a;

endmodule`,
        },
      },
      {
        title: "3. Temel Mantık Kapıları ve Doğruluk Tabloları",
        content: `Dijital elektronikte tüm aritmetik ve mantık işlemleri 4 temel operatör üzerinden türetilir:
- **AND (\`&\`):** Her iki giriş de \`1\` ise çıkış \`1\` olur.
- **OR (\`|\`):** Girişlerden en az biri \`1\` ise çıkış \`1\` olur.
- **XOR (\`^\`):** Girişler birbirinden farklıysa (\`0-1\` veya \`1-0\`) çıkış \`1\`, aynıysa (\`0-0\` veya \`1-1\`) çıkış \`0\` olur (Toplama işlemlerinin temelidir).
- **NOT (\`~\`):** Giriş \`0\` ise çıkış \`1\`, giriş \`1\` ise çıkış \`0\` yapar.`,
      },
      {
        title: "4. Testbench ile Simülasyon",
        content: `Yazdığımız modülü FPGA'e yüklemeden önce bilgisayarda doğrulamak için bir **Testbench (TB)** yazarız. Testbench'in girdi/çıktı portu olmaz; devremize sanal sinyaller enjekte eder:`,
        code: {
          language: "verilog",
          caption: "tb_logic_gates.v - Simülasyon Test Kütüğü",
          snippet: '`timescale 1ns / 1ps\n\nmodule tb_logic_gates;\n    reg  tb_a, tb_b;\n    wire tb_and, tb_or, tb_xor, tb_not;\n\n    // Test Edilecek Modülü (DUT) Bağla\n    logic_gates dut (\n        .a(tb_a),\n        .b(tb_b),\n        .out_and(tb_and),\n        .out_or(tb_or),\n        .out_xor(tb_xor),\n        .out_not(tb_not)\n    );\n\n    initial begin\n        $display("Simülasyon Başlatıldı!");\n        tb_a = 0; tb_b = 0; #10;\n        $display("a=%b b=%b => AND=%b OR=%b XOR=%b", tb_a, tb_b, tb_and, tb_or, tb_xor);\n        \n        tb_a = 0; tb_b = 1; #10;\n        $display("a=%b b=%b => AND=%b OR=%b XOR=%b", tb_a, tb_b, tb_and, tb_or, tb_xor);\n        \n        tb_a = 1; tb_b = 1; #10;\n        $display("a=%b b=%b => AND=%b OR=%b XOR=%b", tb_a, tb_b, tb_and, tb_or, tb_xor);\n        \n        $finish;\n    end\nendmodule',
        },
      },
    ],
    playground: {
      title: "Verilog Mantık Kapıları Deneme Alanı",
      filename: "logic_gates.v",
      language: "verilog",
      initialCode: `module logic_gates (
    input  wire a,
    input  wire b,
    output wire out_and,
    output wire out_or,
    output wire out_xor
);
    assign out_and = a & b;
    assign out_or  = a | b;
    assign out_xor = a ^ b;
endmodule`,
      expectedOutput: [
        "[INFO:SIM] Verilog Icarus derleyicisi başlatıldı.",
        "[@0ns]  a=0, b=0 => AND=0, OR=0, XOR=0",
        "[@10ns] a=0, b=1 => AND=0, OR=1, XOR=1",
        "[@20ns] a=1, b=0 => AND=0, OR=1, XOR=1",
        "[@30ns] a=1, b=1 => AND=1, OR=1, XOR=0",
        "[PASS] Tüm mantık kapısı doğruluk tablosu doğrulandı!",
      ],
      signals: [
        { name: "a", wave: "0..1..0..1.." },
        { name: "b", wave: "0.1.0.1.0.1." },
        { name: "out_and", wave: "0...0...0.1." },
        { name: "out_xor", wave: "0.1.1.0.0.1." },
      ],
    },
    quiz: {
      question: "Verilog dilinde 'assign out = a ^ b;' ifadesinde kullanılan '^' operatörü hangi sayısal mantık kapısını temsil eder?",
      options: [
        "A) Üs Alma (Power)",
        "B) VE (AND)",
        "C) VEYA (OR)",
        "D) Özel VEYA (XOR)",
      ],
      correctIndex: 3,
      explanation: "Doğru! Verilog ve C dillerinde '^' sembolü XOR (Özel VEYA) mantıksal operatörüdür; iki giriş birbirinden farklı olduğunda '1' üretir.",
    },
  },

  // ========================================================
  // 2. KOMBİNASYONEL DEVRELER & ASSIGN
  // ========================================================
  "verilog-combinational": {
    id: "verilog-combinational",
    badge: "Modül 1 • Kombinasyonel Mantık",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Kombinasyonel Devreler ve assign İfadeleri",
    subtitle: "Geçmiş durumu hatırlamayan, çıkışları yalnızca o anki giriş kombinasyonuna bağlı olan saf mantık devreleri.",
    sections: [
      {
        title: "1. Kombinasyonel Mantık Nedir? Belleksiz Devreler",
        content: `Kombinasyonel devreler (Combinational Logic), hafızası olmayan devrelerdir. Çıkış sinyali, giriş sinyalleri değiştiği anda kapı gecikmeleri haricinde hemen yeni değerini alır.

Örnek kombinasyonel devreler:
- Çoklayıcılar (Multiplexers - MUX)
- Kod Çözücüler (Decoders)
- Kodlayıcılar (Priority Encoders)
- Toplayıcılar (Half Adder & Full Adder)
- Aritmetik Mantık Birimleri (ALU)`,
      },
      {
        title: "2. Çoklayıcı (Multiplexer - MUX) Tasarımı",
        content: `MUX, birden fazla veri girişi arasından seçim hattına (select) göre tek bir çıkışı seçen dijital anahtardır. Verilog'da üçlü koşul operatörü (\`? :\`) ile çok şık biçimde ifade edilir:`,
        code: {
          language: "verilog",
          caption: "mux4to1.v - 4'e 1 Çoğullayıcı (Multiplexer)",
          snippet: `module mux4to1 (
    input  wire [3:0] in_data, // 4 adet 1-bit giriş hattı
    input  wire [1:0] sel,     // 2-bit seçim hattı (00, 01, 10, 11)
    output wire       out_val  // Seçilen çıkış
);

    // sel sinyaline göre giriş seçimi:
    assign out_val = (sel == 2'b00) ? in_data[0] :
                     (sel == 2'b01) ? in_data[1] :
                     (sel == 2'b10) ? in_data[2] :
                                      in_data[3];

endmodule`,
        },
      },
      {
        title: "3. 1-Bit Tam Toplayıcı (Full Adder) Devresi",
        content: `Bir CPU'nun toplama yapabilmesi için iki bit (\`a\`, \`b\`) ve bir önceki basamaktan gelen eldeyi (\`cin\`) toplayıp toplam (\`sum\`) ve yeni elde (\`cout\`) üretmesi gerekir:
- $\\text{sum} = a \\oplus b \\oplus \\text{cin}$
- $\\text{cout} = (a \\cdot b) + (\\text{cin} \\cdot (a \\oplus b))$`,
        code: {
          language: "verilog",
          caption: "full_adder.v - 1-Bit Tam Toplayıcı",
          snippet: `module full_adder (
    input  wire a,
    input  wire b,
    input  wire cin,
    output wire sum,
    output wire cout
);

    assign sum  = a ^ b ^ cin;
    assign cout = (a & b) | (cin & (a ^ b));

endmodule`,
        },
      },
    ],
    playground: {
      title: "1-Bit Tam Toplayıcı (Full Adder) Simülatörü",
      filename: "full_adder.v",
      language: "verilog",
      initialCode: `module full_adder (
    input  wire a,
    input  wire b,
    input  wire cin,
    output wire sum,
    output wire cout
);
    assign sum  = a ^ b ^ cin;
    assign cout = (a & b) | (cin & (a ^ b));
endmodule`,
      expectedOutput: [
        "[@0ns]  a=0 b=0 cin=0 => sum=0 cout=0 (0 + 0 + 0 = 0)",
        "[@10ns] a=1 b=0 cin=0 => sum=1 cout=0 (1 + 0 + 0 = 1)",
        "[@20ns] a=1 b=1 cin=0 => sum=0 cout=1 (1 + 1 + 0 = 2)",
        "[@30ns] a=1 b=1 cin=1 => sum=1 cout=1 (1 + 1 + 1 = 3)",
        "[SUCCESS] Tam Toplayıcı doğruluk tablosu eksiksiz çalıştı!",
      ],
      signals: [
        { name: "a", wave: "0.1.1.1." },
        { name: "b", wave: "0.0.1.1." },
        { name: "cin", wave: "0.0.0.1." },
        { name: "sum", wave: "0.1.0.1." },
        { name: "cout", wave: "0.0.1.1." },
      ],
    },
    quiz: {
      question: "Girişleri a=1, b=1 ve cin=1 olan bir Full Adder devresinin (sum, cout) çıkışları sırasıyla ne olur?",
      options: [
        "A) sum=0, cout=1",
        "B) sum=1, cout=1",
        "C) sum=1, cout=0",
        "D) sum=0, cout=0",
      ],
      correctIndex: 1,
      explanation: "Doğru! 1 + 1 + 1 = 3 (ikilik tabanda 2'b11). Dolayısıyla toplam biti sum=1 ve elde biti cout=1 olur.",
    },
  },

  // ========================================================
  // 3. ARDIŞIL DEVRELER, FLIP-FLOP & SAYICILAR
  // ========================================================
  "verilog-sequential": {
    id: "verilog-sequential",
    badge: "Modül 2 • Ardışıl Mantık",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "D Flip-Flop, Registerlar ve Saat Bölücüler",
    subtitle: "Saat (clock) kenarlarında tetiklenen bellek elemanları, engellemeyen atamalar (<=) ve senkron sayıcı mimarisi.",
    sections: [
      {
        title: "1. Ardışıl Devreler ve Saat (Clock) Darbesi",
        content: `Kombinasyonel devrelerin aksine **ardışıl devreler (sequential circuits)** bir hafızaya sahiptir. Çıkış sadece o anki girişlere değil; sistemin **önceki durumuna** da bağlıdır.

Bu durum saklama işi, saat işaretinin yükselen kenarında (\`posedge clk\`) veriyi içine kaydeden **D Flip-Flop (DFF)** elemanları ile sağlanır.`,
      },
      {
        title: "2. Altın Kural: Engellemeyen Atamalar (<=) vs Engelleme (=)",
        content: `Verilog'da ardışıl devre tasarlarken iki atama operatörü arasındaki farkı bilmek hayati önem taşır:

- **Engellemeyen Atama (\`<=\` - Non-blocking):** Bir \`always @(posedge clk)\` bloğu içindeki tüm atamalar **aynı anda, paralel** olarak yürütülür. Ardışıl devrelerde ve flip-flop'larda DAİMA \`<=\` kullanılır!
- **Engelleme Ataması (\`=\` - Blocking):** C dili gibi sıralı çalışır. Yalnızca kombinasyonel \`always @(*)\` bloklarında kullanılır.`,
        callout: {
          type: "warning",
          title: "Sentez Hatasından Kaçının!",
          message: "Ardışıl saat bloklarında (`always @(posedge clk)`) asla `=` kullanmayın. Aksi halde donanım sentezinde beklenmedik yarış durumları (race conditions) ve simülasyon uyumsuzlukları oluşur.",
        },
      },
      {
        title: "3. D Flip-Flop (Asenkron Resetli)",
        content: `Endüstri standardı D Flip-Flop kodu:`,
        code: {
          language: "verilog",
          caption: "dff_async_rst.v - D Flip-Flop",
          snippet: `module dff_async_rst (
    input  wire clk,   // Sistem saat darbesi
    input  wire rst_n, // Aktif-düşük asenkron reset
    input  wire d,     // Veri girişi
    output reg  q      // Kaydedilen çıkış
);

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            q <= 1'b0; // Reset anında hemen sıfırla
        end else begin
            q <= d;    // Her saat vuruşunda d değerini q'ya aktar
        end
    end

endmodule`,
        },
      },
      {
        title: "4. N-Bit Senkron Sayıcı ve Saat Bölücü",
        content: `Örneğin 100 MHz saat frekansına sahip bir FPGA kartında bir LED'i saniyede 1 kez yakıp söndürmek (1 Hz) için bir sayıcı kurup 50.000.000'a kadar saydırırız:`,
        code: {
          language: "verilog",
          caption: "clock_divider.v - LED Flaşör Frekans Bölücü",
          snippet: `module clock_divider #(
    parameter DIV_LIMIT = 50_000_000 // 100MHz / 50M = 2Hz yarı periyot
)(
    input  wire clk,
    input  wire rst,
    output reg  led_out
);

    reg [31:0] counter;

    always @(posedge clk or posedge rst) begin
        if (rst) begin
            counter <= 32'd0;
            led_out <= 1'b0;
        end else begin
            if (counter == DIV_LIMIT - 1) begin
                counter <= 32'd0;
                led_out <= ~led_out; // LED durumunu tersle
            end else begin
                counter <= counter + 1'b1;
            end
        end
    end

endmodule`,
        },
      },
    ],
    playground: {
      title: "4-Bit Senkron Sayıcı (Counter) Simülatörü",
      filename: "counter4bit.v",
      language: "verilog",
      initialCode: `module counter4bit (
    input  wire clk,
    input  wire rst_n,
    output reg [3:0] count
);
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            count <= 4'b0000;
        else
            count <= count + 1'b1;
    end
endmodule`,
      expectedOutput: [
        "[@0ns]  Reset aktif => count = 4'h0 (0000)",
        "[@10ns] Reset bırakıldı => count = 4'h0",
        "[@20ns] Clock ^ posedge => count = 4'h1 (0001)",
        "[@30ns] Clock ^ posedge => count = 4'h2 (0010)",
        "[@40ns] Clock ^ posedge => count = 4'h3 (0011)",
        "[@50ns] Clock ^ posedge => count = 4'h4 (0100)",
        "[PASS] 4-Bit sayıcı başarıyla artımsal sayım gerçekleştirdi!",
      ],
      signals: [
        { name: "clk", wave: "p..........." },
        { name: "rst_n", wave: "0.1........." },
        { name: "count", wave: "=...=========", data: ["0", "1", "2", "3", "4", "5"] },
      ],
    },
    quiz: {
      question: "Verilog'da saat kenarına duyarlı ardışıl devre bloklarında (always @(posedge clk)) neden engellemeyen atama (<=) kullanılmalıdır?",
      options: [
        "A) Kodun daha hızlı derlenmesini sağlamak için",
        "B) Tüm flip-flop'ların aynı saat kenarında eşzamanlı güncellenmesini sağlamak ve yarış durumlarını önlemek için",
        "C) Sadece daha az satır kod yazmak için",
        "D) C dili ile sözdizimi uyumluluğu yakalamak için",
      ],
      correctIndex: 1,
      explanation: "Doğru! Engellemeyen (<=) atamalar donanımdaki tüm flip-flop'ların aynı saat vuruşunda eşzamanlı olarak yeni değerlerine geçmesini modeller.",
    },
  },

  // ========================================================
  // 4. SONLU DURUM MAKİNELERİ (FSM)
  // ========================================================
  "verilog-fsm": {
    id: "verilog-fsm",
    badge: "Modül 2 • Durum Makineleri (FSM)",
    readingTime: "9 dk okuma",
    level: "Orta Seviye",
    title: "Sonlu Durum Makineleri (FSM: Mealy & Moore)",
    subtitle: "Trafik ışıkları, iletişim protokolleri ve CPU kontrol ünitelerini yöneten standart 3-bloklu FSM mimarisi.",
    sections: [
      {
        title: "1. Moore vs Mealy FSM Farkı",
        content: `Sonlu Durum Makineleri (Finite State Machine - FSM), bir sistemin sonlu sayıdaki durumlar (States) arasında belirli girdilere göre geçiş yapmasını sağlayan beyindir.

- **Moore FSM:** Çıkışlar **YALNIZCA o anki duruma** bağlıdır. Girişler anlık değişse bile saat darbesi gelene kadar çıkış değişmez; daha kararlıdır.
- **Mealy FSM:** Çıkışlar hem o anki duruma hem de **o anki girişlere** doğrudan bağlıdır. Giriş değiştiği an çıkış da tepki verir; bir saat darbesi daha hızlıdır fakat parazitli sinyallere açıktır.`,
      },
      {
        title: "2. Endüstri Standardı: 3-Always Bloklu FSM Şablonu",
        content: `Profesyonel FPGA ve ASIC tasarımında FSM'ler daima **3 ayrı blok** halinde yazılır:
1. **Durum Kaydı (State Register - Ardışıl):** Saat darbesinde \`current_state <= next_state\` aktarımı.
2. **Sonraki Durum Mantığı (Next State Logic - Kombinasyonel):** Girişlere göre bir sonraki durumun belirlendiği \`case\` bloğu.
3. **Çıkış Mantığı (Output Logic):** Duruma göre çıkış sinyallerinin üretilmesi.`,
        code: {
          language: "verilog",
          caption: "fsm_traffic_light.v - 3-Always Bloklu Akıllı Trafik Işığı",
          snippet: `module fsm_traffic_light (
    input  wire clk,
    input  wire rst_n,
    input  wire car_waiting, // Sensör: tali yolda araba var mı?
    output reg  red_light,
    output reg  yellow_light,
    output reg  green_light
);

    // Durum İsimleri (Localparam ile tanımlanır)
    localparam S_GREEN  = 2'b00,
               S_YELLOW = 2'b01,
               S_RED    = 2'b10;

    reg [1:0] current_state, next_state;

    // 1. BLOK: Durum Kaydı (Ardışıl)
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            current_state <= S_RED;
        else
            current_state <= next_state;
    end

    // 2. BLOK: Sonraki Durum Mantığı (Kombinasyonel)
    always @(*) begin
        case (current_state)
            S_RED: begin
                next_state = S_GREEN;
            end
            S_GREEN: begin
                if (car_waiting)
                    next_state = S_YELLOW;
                else
                    next_state = S_GREEN;
            end
            S_YELLOW: begin
                next_state = S_RED;
            end
            default: next_state = S_RED;
        endcase
    end

    // 3. BLOK: Çıkış Mantığı (Moore Tipi)
    always @(*) begin
        red_light    = 1'b0;
        yellow_light = 1'b0;
        green_light  = 1'b0;
        case (current_state)
            S_RED:    red_light    = 1'b1;
            S_YELLOW: yellow_light = 1'b1;
            S_GREEN:  green_light  = 1'b1;
        endcase
    end

endmodule`,
        },
      },
    ],
    playground: {
      title: "Trafik Işığı FSM Simülasyonu",
      filename: "traffic_fsm.v",
      language: "verilog",
      initialCode: `// Trafik Işığı Durum Makinesi
module traffic_fsm (
    input wire clk,
    input wire rst_n,
    output reg [1:0] state
);
    localparam RED=0, YELLOW=1, GREEN=2;
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) state <= RED;
        else begin
            case(state)
                RED: state <= GREEN;
                GREEN: state <= YELLOW;
                YELLOW: state <= RED;
            endcase
        end
    end
endmodule`,
      expectedOutput: [
        "[@0ns]  Reset => State: RED (Kırmızı Işık)",
        "[@10ns] Clk ^ => State: GREEN (Yeşil Işık - Geç)",
        "[@20ns] Clk ^ => State: YELLOW (Sarı Işık - Hazırlan)",
        "[@30ns] Clk ^ => State: RED (Kırmızı Işık - Dur)",
        "[PASS] FSM durum döngüsü hatasız tamamlandı!",
      ],
      signals: [
        { name: "clk", wave: "p......" },
        { name: "rst_n", wave: "0.1...." },
        { name: "state", wave: "=..====", data: ["RED", "GREEN", "YELLOW", "RED"] },
      ],
    },
    quiz: {
      question: "Moore tipi bir sonlu durum makinesinde (Moore FSM) çıkış sinyalleri neye bağlı olarak belirlenir?",
      options: [
        "A) Hem o anki duruma hem de o anki giriş sinyallerine",
        "B) Yalnızca o anki duruma (Current State)",
        "C) Sadece sistem saat frekansına",
        "D) Testbench içindeki gecikme sürelerine",
      ],
      correctIndex: 1,
      explanation: "Doğru! Moore durum makinesinde çıkışlar sadece ve sadece o anki aktif duruma bağlıdır; Mealy makinesinde ise duruma ve anlık girişlere birlikte bağlıdır.",
    },
  },

  // ========================================================
  // 5. FPGA KISIT DOSYALARI (XDC / SDC)
  // ========================================================
  "verilog-fpga-xdc": {
    id: "verilog-fpga-xdc",
    badge: "Modül 3 • FPGA Donanım Sentezi",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Xilinx Vivado & Intel Quartus ile Pin Eşleme (XDC/SDC)",
    subtitle: "RTL kodundaki soyut port isimlerini kart üzerindeki gerçek fiziksel bacaklara (pin), voltaj seviyelerine ve saat kısıtlarına bağlama.",
    sections: [
      {
        title: "1. RTL'den Bitstream'e FPGA Derleme Aşamaları",
        content: `Yazdığınız bir Verilog modülü doğrudan FPGA çipine yüklenemez. EDA aracı (Xilinx Vivado veya Intel Quartus) şu adımları izler:

1. **Sentez (Synthesis):** Verilog kodunu FPGA'in içindeki LUT (Look-Up Table), Flip-Flop ve MUX mantık kapılarına dönüştürür.
2. **Yerleşim ve Rotalama (Place & Route / Implementation):** Bu kapıları FPGA silikonu üzerindeki binlerce dilimden (slices/CLBs) hangilerine yerleştireceğini ve aralarındaki metal hatları nasıl döşeyeceğini çözer.
3. **Bitstream Üretimi (.bit / .sof):** Çipin konfigürasyon SRAM hücrelerine yüklenecek olan ikili dosya üretilir.

İşte bu süreçte EDA aracına *"Benim 'clk' portum FPGA'in W5 nolu bacağına bağlı ve 3.3V LVCMOS standardındadır"* bilgisini vermek için **Kısıt Dosyası (Constraint File)** kullanılır.`,
      },
      {
        title: "2. Xilinx Vivado XDC Sentaksı",
        content: `Xilinx Vivado araçlarında kısıtlar **XDC (Xilinx Design Constraints)** formatında (Tcl tabanlı) yazılır:`,
        code: {
          language: "tcl",
          caption: "Basys3_Master.xdc - Basys 3 FPGA Kartı Örnek Kısıtları",
          snippet: `## 1. Saat Sinyali (100 MHz Osilatör - W5 Bacağı)
set_property PACKAGE_PIN W5 [get_ports clk]							
set_property IOSTANDARD LVCMOS33 [get_ports clk]
create_clock -add -name sys_clk_pin -period 10.00 -waveform {0 5} [get_ports clk]

## 2. Kullanıcı LED'leri (U16 ve E19 Bacakları)
set_property PACKAGE_PIN U16 [get_ports {led_out[0]}]					
set_property IOSTANDARD LVCMOS33 [get_ports {led_out[0]}]

set_property PACKAGE_PIN E19 [get_ports {led_out[1]}]					
set_property IOSTANDARD LVCMOS33 [get_ports {led_out[1]}]

## 3. Butonlar (Orta Buton U18 - Reset)
set_property PACKAGE_PIN U18 [get_ports btn_reset]						
set_property IOSTANDARD LVCMOS33 [get_ports btn_reset]`,
        },
      },
      {
        title: "3. Zaman Kısıtları (Timing Constraints) Neden Hayatidir?",
        content: `\`create_clock -period 10.00 [get_ports clk]\` komutu Vivado'ya derleme anında şunu emreder:
*"Benim saat darbem her 10 nanosaniyede bir (100 MHz) vuracaktır. İki flip-flop arasındaki mantık kapısı ve kablo gecikmeleri asla 10 nanosaniyeyi aşmamalıdır!"*

Eğer mantık devreleriniz çok derinse (örn: tek bir saat periyodunda 64-bit bölme yapmaya çalışırsanız), sinyal hedef flip-flop'a yetişemez ve **Zamanlama İhlali (Setup Timing Slack < 0)** hatası alırsınız.`,
      },
    ],
    quiz: {
      question: "Xilinx Vivado'da bir pin kısıtı yazarken 'set_property PACKAGE_PIN W5 [get_ports clk]' komutunun görevi nedir?",
      options: [
        "A) clk saat frekansını 5 MHz'e düşürmek",
        "B) clk portunu FPGA paketinin fiziksel W5 nolu bacağına eşlemek",
        "C) clk portuna 5V güç sağlamak",
        "D) clk portunu simülasyonda gizlemek",
      ],
      correctIndex: 1,
      explanation: "Doğru! PACKAGE_PIN komutu mantıksal RTL portunu FPGA çipinin gerçek lehim bacağına (Ball/Pin) fiziksel olarak bağlar.",
    },
  },

  // ========================================================
  // 6. 7-SEGMENT EKRAN & BUTON FİLTRELEME (DEBOUNCE)
  // ========================================================
  "verilog-7seg-display": {
    id: "verilog-7seg-display",
    badge: "Modül 3 • FPGA Donanım Projeleri",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "7-Segment Ekran Sürücüsü ve Buton Filtreleme (Debounce)",
    subtitle: "Mekanik butonlardaki yaylanma parazitlerini dijital olarak filtreleme ve zaman çoğullamalı 4 basamaklı 7-segment gösterge sürme.",
    sections: [
      {
        title: "1. Mekanik Buton Titreşimi (Contact Bouncing) Problemi",
        content: `Fiziksel bir butona bastığınızda metal kontaklar mikroskobik düzeyde hemen oturmaz; 5 ila 20 milisaniye boyunca onlarca kez birbirine çarpar ve ayrılır (bouncing).

100 MHz saat frekansında çalışan bir FPGA, bu milisaniyelik titreşimi **binlerce farklı butona basma** olarak algılar. Bu yüzden sayacınız tek basışta rastgele 15-200 arası artar.

**Çözüm:** Buton sinyalinin en az 10ms boyunca kararlı kaldığını doğrulayan bir dijital **Debounce (filtreleme)** devresi kurmaktır.`,
        code: {
          language: "verilog",
          caption: "debounce.v - Sayısal Buton Titreşim Önleyici",
          snippet: `module debounce #(
    parameter CLK_FREQ = 100_000_000,
    parameter DEBOUNCE_MS = 10
)(
    input  wire clk,
    input  wire btn_in,
    output reg  btn_out
);

    localparam LIMIT = (CLK_FREQ / 1000) * DEBOUNCE_MS;
    reg [20:0] counter = 0;
    reg btn_sync_0, btn_sync_1;

    // 2 Flip-Flop ile Metastabiliteyi Önle
    always @(posedge clk) begin
        btn_sync_0 <= btn_in;
        btn_sync_1 <= btn_sync_0;
    end

    // Kararlılık Sayacı
    always @(posedge clk) begin
        if (btn_sync_1 != btn_out) begin
            counter <= counter + 1'b1;
            if (counter >= LIMIT) begin
                btn_out <= btn_sync_1;
                counter <= 0;
            end
        end else begin
            counter <= 0;
        end
    end

endmodule`,
        },
      },
      {
        title: "2. 7-Segment Ekran Anatomisi ve Zaman Çoğullaması",
        content: `Basys 3 gibi kartlarda 4 basamaklı 7-segment ekran bulunur. 4 basamağın her biri için 7 ayrı segment pini çekilirse 28 pin gerekir. Tasarruf için tüm basamakların A, B, C, D, E, F, G segmentleri **birbirine paralel bağlanmıştır**. 

Ekranı sürmek için **Zaman Bölüşümlü Çoğullama (Time-Division Multiplexing)** kullanılır:
- 1. basamak açılır, 1. rakam basılır (örneğin 1 ms).
- 2. basamak açılır, 2. rakam basılır.
- 3. basamak açılır, 3. rakam basılır.
- 4. basamak açılır, 4. rakam basılır.

Bu tarama saniyede 1000 kez yapıldığında insan gözünün algı eşiği (Persistence of Vision) sayesinde 4 basamak da aynı anda yanıyormuş gibi görünür!`,
        code: {
          language: "verilog",
          caption: "seven_seg_decoder.v - 4-Bit BCD -> 7-Segment Kod Çözücü",
          snippet: `module seven_seg_decoder (
    input  wire [3:0] bcd, // 0-9 arası sayı
    output reg  [6:0] seg  // {g, f, e, d, c, b, a} (Aktif-Düşük: 0 yanar)
);

    always @(*) begin
        case (bcd)
            4'h0: seg = 7'b1000000; // 0
            4'h1: seg = 7'b1111001; // 1
            4'h2: seg = 7'b0100100; // 2
            4'h3: seg = 7'b0110000; // 3
            4'h4: seg = 7'b0011001; // 4
            4'h5: seg = 7'b0010010; // 5
            4'h6: seg = 7'b0000010; // 6
            4'h7: seg = 7'b1111000; // 7
            4'h8: seg = 7'b0000000; // 8
            4'h9: seg = 7'b0010000; // 9
            default: seg = 7'b1111111; // Hepsi sönük
        endcase
    end

endmodule`,
        },
      },
    ],
    playground: {
      title: "7-Segment BCD Kod Çözücü Simülatörü",
      filename: "seven_seg.v",
      language: "verilog",
      initialCode: `module seven_seg (
    input wire [3:0] digit,
    output reg [6:0] segments // a,b,c,d,e,f,g
);
    always @(*) begin
        case (digit)
            4'd0: segments = 7'b0111111;
            4'd1: segments = 7'b0000110;
            4'd2: segments = 7'b1011011;
            4'd3: segments = 7'b1001111;
            default: segments = 7'b0000000;
        endcase
    end
endmodule`,
      expectedOutput: [
        "[@0ns] digit = 0 => segments = 7'b0111111 (A,B,C,D,E,F yanıyor)",
        "[@10ns] digit = 1 => segments = 7'b0000110 (B,C yanıyor)",
        "[@20ns] digit = 2 => segments = 7'b1011011 (A,B,D,E,G yanıyor)",
        "[@30ns] digit = 3 => segments = 7'b1001111 (A,B,C,D,G yanıyor)",
        "[PASS] 7-Segment segment kod çözücü doğruluğu onaylandı!",
      ],
      signals: [
        { name: "digit", wave: "=...", data: ["0", "1", "2", "3"] },
        { name: "segments", wave: "=...", data: ["63", "6", "91", "79"] },
      ],
    },
    quiz: {
      question: "Fiziksel mekanik bir butona basıldığında oluşan metalik titreşimi (bouncing) önlemek için donanım tasarımında uygulanan yönteme ne ad verilir?",
      options: [
        "A) Overclocking",
        "B) Debounce (Titreşim Sönümleme)",
        "C) Bit Reversal",
        "D) Pipelining",
      ],
      correctIndex: 1,
      explanation: "Doğru! Mekanik kontakların oturma anındaki parazit darbeleri 'Debounce' filtresi ile sönümlenerek temiz tek bir darbe elde edilir.",
    },
  },
};
