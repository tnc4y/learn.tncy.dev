import { LessonContent } from "./lessonsData";

export const FPGA_LESSONS: Record<string, LessonContent> = {
  "verilog-fpga-xdc": {
    id: "verilog-fpga-xdc",
    badge: "Modül 1 • FPGA Donanım Sentezi",
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

## 3. Buton Girişi (U18 - Merkez Buton)
set_property PACKAGE_PIN U18 [get_ports btn_center]						
set_property IOSTANDARD LVCMOS33 [get_ports btn_center]`,
        },
        callout: {
          type: "warning",
          title: "Voltaj Standardına (IOSTANDARD) Dikkat!",
          message: "FPGA bacakları genellikle 3.3V (LVCMOS33) veya 1.8V mantık seviyelerinde çalışır. 5V seviyesindeki Arduino sensörlerini doğrudan FPGA pinine bağlamak çipin giriş tamponunu (buffer) kalıcı olarak yakar!",
        },
      },
      {
        title: "3. Intel Quartus SDC & QSF Sentaksı",
        content: `Intel / Altera Quartus (örneğin DE10-Lite kartı) kullanıyorsanız:
- Pin bacakları ve voltaj standartları **.qsf (Quartus Settings File)** dosyasında tanımlanır:
\`\`\`tcl
set_location_assignment PIN_P11 -to clk
set_instance_assignment -name IO_STANDARD "3.3-V LVTTL" -to clk
\`\`\`
- Saat frekansı ve zamanlama kısıtları ise Synopsys standardı olan **.sdc (Synopsys Design Constraints)** dosyasında belirlenir:
\`\`\`tcl
create_clock -name "clk" -period 20.000ns [get_ports {clk}]
\`\`\``,
      },
    ],
    playground: {
      initialCode: `// FPGA Top-Level Modülü
module fpga_top (
    input  wire clk,
    input  wire btn_center,
    output wire [1:0] led_out
);
    reg [25:0] counter = 0;
    always @(posedge clk) begin
        counter <= counter + 1'b1;
    end

    assign led_out[0] = counter[25];
    assign led_out[1] = btn_center;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "FPGA kısıt dosyasında (XDC/SDC) 'PACKAGE_PIN' neyi belirtir?",
      options: [
        "Portun bağlı olduğu FPGA fiziksel entegre bacağını",
        "RTL kodundaki değişkenin bit genişliğini",
        "Saat frekansının megahertz cinsinden değerini",
        "FPGA çipinin sıcaklık limitini"
      ],
      correctIndex: 0,
      explanation: "PACKAGE_PIN parametresi, Verilog modülündeki mantıksal port adını FPGA silikon kılıfındaki fiziksel pine (örneğin W5) bağlar."
    }
  },

  "verilog-7seg-display": {
    id: "verilog-7seg-display",
    badge: "Modül 1 • FPGA Donanım Projeleri",
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
        title: "2. 7-Segment Ekran ve Zaman Çoğullama (Time-Multiplexing)",
        content: `Basys 3 gibi kartlarda 4 basamaklı 7-segment ekran bulunur. Her basamağın A-G segmentleri birbirine paralel bağlıdır; ancak her basamağın bağımsız bir **Anot (Anode)** pini vardır.

4 basamağın hepsinde aynı anda farklı sayılar gösterebilmek için:
1. Basamak 1 açılır, 1. sayının segmentleri verilir (1-2 milisaniye).
2. Basamak 2 açılır, 2. sayının segmentleri verilir.
3. Basamak 3 açılır, 3. sayının segmentleri verilir.
4. Basamak 4 açılır, 4. sayının segmentleri verilir.

İnsan gözünün **Görüntü Kalıcılığı (Persistence of Vision)** sayesinde saniyede ~250 kez tekrarlanan bu döngü, 4 basamağın da sürekli yandığı izlenimini verir!`,
      },
    ],
    playground: {
      initialCode: `module hex_to_7seg (
    input  wire [3:0] hex,
    output reg  [6:0] seg // active LOW: CA CB CC CD CE CF CG
);
    always @(*) begin
        case (hex)
            4'h0: seg = 7'b1000000;
            4'h1: seg = 7'b1111001;
            4'h2: seg = 7'b0100100;
            4'h3: seg = 7'b0110000;
            4'h4: seg = 7'b0011001;
            4'h5: seg = 7'b0010010;
            4'h6: seg = 7'b0000010;
            4'h7: seg = 7'b1111000;
            4'h8: seg = 7'b0000000;
            4'h9: seg = 7'b0010000;
            default: seg = 7'b1111111;
        endcase
    end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "4 basamaklı bir 7-segment göstergede tüm basamakların farklı sayılar göstermesi hangi prensiple sağlanır?",
      options: [
        "Zaman çoğullama (Time-Multiplexing) ve gözün algı kalıcılığı ile",
        "Her basamağa bağımsız 64 bit veri yolu döşeyerek",
        "Ekranın çalışma voltajını 12V seviyesine yükselterek",
        "Sadece statik DC gerilim uygulayarak"
      ],
      correctIndex: 0,
      explanation: "Zaman çoğullamalı sürme (Time-multiplexing), basamakları sırayla çok yüksek frekansta (örneğin 1 kHz) yakıp söndürerek insan gözünün hepsini aynı anda yanıyormuş gibi algılamasını sağlar."
    }
  }
};
