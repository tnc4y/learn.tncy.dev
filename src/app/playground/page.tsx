"use client";

import { useState } from "react";
import CodePlayground from "@/components/CodePlayground";
import { Terminal, Sparkles, Sliders } from "lucide-react";

const EXAMPLES = [
  {
    id: "counter",
    name: "4-Bit Sayaç (Counter)",
    description: "Saat (CLK) ve Reset (RST_N) kontrollü 4-bitlik binary sayaç ve testbench.",
    code: `// 4-Bit Binary Sayaç ve Testbench
module counter_tb;
  logic clk = 0;
  logic rst_n = 0;
  logic [3:0] count;

  always #5 clk = ~clk; // 10ns periyot

  // Sayaç Donanımı
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) count <= 4'h0;
    else        count <= count + 1'b1;
  end

  initial begin
    $display("[START] Sayaç Simülasyonu Başladı");
    #12 rst_n = 1; // 12. nanosaniyede reset kalkar
    #50;
    $display("[FINISH] Test tamamlandı, count = %0d", count);
    $finish;
  end

  always @(posedge clk) begin
    if (rst_n)
      $display("[@%0tns] CLK Yükselen Kenar => count = %0d (Hex: 0x%0h)", $time, count, count);
  end
endmodule`,
    expectedOutput: [
      "[INFO:EDA] Simulator: Verilator / ModelSim Engine",
      "[START] Sayaç Simülasyonu Başladı",
      "[@15ns] CLK Yükselen Kenar => count = 0 (Hex: 0x0)",
      "[@25ns] CLK Yükselen Kenar => count = 1 (Hex: 0x1)",
      "[@35ns] CLK Yükselen Kenar => count = 2 (Hex: 0x2)",
      "[@45ns] CLK Yükselen Kenar => count = 3 (Hex: 0x3)",
      "[@55ns] CLK Yükselen Kenar => count = 4 (Hex: 0x4)",
      "[FINISH] Test tamamlandı, count = 4",
      "[SUCCESS] 0 Hata, Simülasyon başarıyla tamamlandı.",
    ],
    signals: [
      { name: "clk", wave: "010101010101" },
      { name: "rst_n", wave: "001111111111" },
      { name: "count[3:0]", wave: "======", data: ["0", "0", "1", "2", "3", "4"] },
    ],
  },
  {
    id: "alu",
    name: "Basit ALU (Aritmetik Mantık Birimi)",
    description: "Toplama, Çıkarma, VE, VEYA ve XOR işlemlerini yürüten kombinasyonel ALU.",
    code: `// Aritmetik Mantık Birimi (ALU) ve Testbench
module alu_tb;
  logic [3:0] a, b;
  logic [1:0] op; // 00: TOPLA, 01: ÇIKAR, 10: VE, 11: VEYA
  logic [3:0] result;

  // Kombinasyonel ALU Mantığı
  always_comb begin
    case (op)
      2'b00: result = a + b;
      2'b01: result = a - b;
      2'b10: result = a & b;
      2'b11: result = a | b;
    endcase
  end

  initial begin
    $display("=== ALU DOĞRULAMA TESTLERİ ===");
    a = 4'd7; b = 4'd2;
    
    op = 2'b00; #10;
    $display("[@%0tns] TOPLAMA: %0d + %0d = %0d", $time, a, b, result);

    op = 2'b01; #10;
    $display("[@%0tns] ÇIKARMA: %0d - %0d = %0d", $time, a, b, result);

    op = 2'b10; #10;
    $display("[@%0tns] MANTIKSAL VE: %b & %b = %b", $time, a, b, result);

    op = 2'b11; #10;
    $display("[@%0tns] MANTIKSAL VEYA: %b | %b = %b", $time, a, b, result);

    $display("=== TÜM ALU TESTLERİ BAŞARILI ===");
  end
endmodule`,
    expectedOutput: [
      "=== ALU DOĞRULAMA TESTLERİ ===",
      "[@10ns] TOPLAMA: 7 + 2 = 9",
      "[@20ns] ÇIKARMA: 7 - 2 = 5",
      "[@30ns] MANTIKSAL VE: 0111 & 0010 = 0010",
      "[@40ns] MANTIKSAL VEYA: 0111 | 0010 = 0111",
      "=== TÜM ALU TESTLERİ BAŞARILI ===",
      "[SUCCESS] ALU doğrulaması tamamlandı.",
    ],
    signals: [
      { name: "op[1:0]", wave: "======", data: ["00", "00", "01", "10", "11"] },
      { name: "result[3:0]", wave: "======", data: ["9", "9", "5", "2", "7"] },
    ],
  },
  {
    id: "fsm",
    name: "Trafik Lambası FSM (Durum Makinesi)",
    description: "enum tipleriyle Kırmızı, Sarı ve Yeşil geçişlerini yöneten Moore FSM.",
    code: `// Trafik Lambası Durum Makinesi
module traffic_fsm_tb;
  typedef enum logic [1:0] {
    RED    = 2'b00,
    YELLOW = 2'b01,
    GREEN  = 2'b10
  } state_t;

  logic clk = 0;
  logic rst_n = 0;
  state_t current_state, next_state;

  always #5 clk = ~clk;

  // Ardışıl Durum Geçişi
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) current_state <= RED;
    else        current_state <= next_state;
  end

  // Kombinasyonel Bir Sonraki Durum Mantığı
  always_comb begin
    case (current_state)
      RED:    next_state = GREEN;
      GREEN:  next_state = YELLOW;
      YELLOW: next_state = RED;
      default: next_state = RED;
    endcase
  end

  initial begin
    $display("=== TRAFİK LAMBASI FSM TESTİ ===");
    #12 rst_n = 1;
    #40;
    $finish;
  end

  always @(current_state) begin
    $display("[@%0tns] Lamba Değişti: %s", $time, current_state.name());
  end
endmodule`,
    expectedOutput: [
      "=== TRAFİK LAMBASI FSM TESTİ ===",
      "[@0ns] Lamba Değişti: RED",
      "[@15ns] Lamba Değişti: GREEN",
      "[@25ns] Lamba Değişti: YELLOW",
      "[@35ns] Lamba Değişti: RED",
      "[@45ns] Lamba Değişti: GREEN",
      "[SUCCESS] FSM döngüsü başarıyla doğrulandı.",
    ],
    signals: [
      { name: "clk", wave: "010101010101" },
      { name: "state", wave: "======", data: ["RED", "RED", "GREEN", "YELLOW", "RED"] },
    ],
  },
];

export default function PlaygroundPage() {
  const [selectedExample, setSelectedExample] = useState(EXAMPLES[0]);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
      {/* Başlık Alanı */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-base-300">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Terminal className="w-4 h-4" />
            <span>W3Schools Tarzı Canlı Ortam</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
            SystemVerilog Kendin Dene (Playground)
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Tarayıcınızda canlı kod yazın, düzenleyin, simüle edin ve sinyal dalga formunu anında görün.
          </p>
        </div>

        {/* Hazır Örnek Şablonları */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-base-content/60 font-semibold flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" /> Şablon:
          </span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExample(ex)}
              className={`btn btn-xs font-mono text-[11px] ${
                selectedExample.id === ex.id ? "btn-primary shadow-xs" : "btn-outline"
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      {/* Seçili Örnek Açıklaması */}
      <div className="my-4 p-3 bg-base-200/60 rounded-lg border border-base-300 text-xs text-base-content/80 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-warning shrink-0" />
        <span>
          <strong>{selectedExample.name}:</strong> {selectedExample.description}
        </span>
      </div>

      {/* Ana Editör & Simülatör Bileşeni */}
      <CodePlayground
        key={selectedExample.id}
        title={selectedExample.name}
        initialCode={selectedExample.code}
        expectedOutput={selectedExample.expectedOutput}
        signals={selectedExample.signals}
        notes="Kodu dilediğiniz gibi değiştirebilir, yeni sinyaller ve $display ifadeleri ekleyerek anında test edebilirsiniz."
      />
    </div>
  );
}
