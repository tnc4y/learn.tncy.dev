"use client";

import { useState } from "react";
import CodePlayground from "@/components/CodePlayground";
import { Terminal, Sparkles, Sliders, Layers, Cpu, Globe, Code2, Zap } from "lucide-react";
import Link from "next/link";

interface PlaygroundTemplate {
  id: string;
  name: string;
  category: "hardware" | "web" | "embedded" | "languages";
  categoryLabel: string;
  categoryColor: string;
  description: string;
  code: string;
  expectedOutput: string[];
  signals?: { name: string; wave: string; data?: string[] }[];
  filename?: string;
  language?: string;
  engineBadge?: string;
  terminalTitle?: string;
  runButtonText?: string;
  timePrecision?: string;
}

const TEMPLATES: PlaygroundTemplate[] = [
  // 1. DONANIM (SYSTEMVERILOG)
  {
    id: "counter",
    name: "4-Bit Sayaç (Counter)",
    category: "hardware",
    categoryLabel: "Donanım & RTL",
    categoryColor: "badge-primary",
    description: "Saat (CLK) ve Reset (RST_N) kontrollü 4-bitlik binary sayaç ve testbench.",
    filename: "counter_tb.sv",
    language: "SystemVerilog",
    engineBadge: "Verilator / Icarus",
    terminalTitle: "Simülatör Konsolu (iverilog / $display)",
    runButtonText: "Simülasyonu Çalıştır",
    timePrecision: "1ps",
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
    name: "Aritmetik Mantık Birimi (ALU)",
    category: "hardware",
    categoryLabel: "Donanım & RTL",
    categoryColor: "badge-primary",
    description: "Toplama, Çıkarma, VE, VEYA ve XOR işlemlerini yürüten kombinasyonel ALU.",
    filename: "alu_tb.sv",
    language: "SystemVerilog",
    engineBadge: "Verilator / Icarus",
    terminalTitle: "Simülatör Konsolu (iverilog / $display)",
    runButtonText: "Simülasyonu Çalıştır",
    timePrecision: "1ps",
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
    name: "Trafik Lambası (FSM)",
    category: "hardware",
    categoryLabel: "Donanım & RTL",
    categoryColor: "badge-primary",
    description: "enum tipleriyle Kırmızı, Sarı ve Yeşil geçişlerini yöneten Moore FSM.",
    filename: "traffic_fsm_tb.sv",
    language: "SystemVerilog",
    engineBadge: "Verilator / Icarus",
    terminalTitle: "Simülatör Konsolu (iverilog / $display)",
    runButtonText: "Simülasyonu Çalıştır",
    timePrecision: "1ps",
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

  // 2. WEB GELİŞTİRME (HTML/JS)
  {
    id: "js-async",
    name: "JavaScript: Async / Await API İstekleri",
    category: "web",
    categoryLabel: "Web Geliştirme",
    categoryColor: "badge-error",
    description: "Modern JavaScript'te asenkron veri çekme ve Promise yönetimi.",
    filename: "app.js",
    language: "JavaScript (ES2024)",
    engineBadge: "Node.js / V8",
    terminalTitle: "Tarayıcı Geliştirici Konsolu (console.log)",
    runButtonText: "JavaScript'i Çalıştır",
    timePrecision: "Ağ Gecikmesi: ~100ms",
    code: `// Asenkron Veri Alma Simülasyonu
async function kullaniciGetir(id) {
  console.log(\`[@0ms] Kullanıcı #\${id} için REST isteği gönderildi...\`);
  
  // 100ms ağ gecikmesi simülasyonu
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, isim: "Ali Kaya", rol: "Gömülü Sistem Mühendisi" });
    }, 100);
  });
}

async function baslat() {
  const veri = await kullaniciGetir(42);
  console.log("[@100ms] Yanıt Alındı:", JSON.stringify(veri));
  console.log("[STATUS] DOM bileşeni başarıyla güncellendi.");
}

baslat();`,
    expectedOutput: [
      "[@0ms] Kullanıcı #42 için REST isteği gönderildi...",
      '[@100ms] Yanıt Alındı: {"id":42,"isim":"Ali Kaya","rol":"Gömülü Sistem Mühendisi"}',
      "[STATUS] DOM bileşeni başarıyla güncellendi.",
      "[SUCCESS] Asenkron akış tamamlandı.",
    ],
  },

  // 3. GÖMÜLÜ SİSTEMLER (ARDUINO / C)
  {
    id: "arduino-blink",
    name: "Arduino: LED & PWM Motor Kontrolü",
    category: "embedded",
    categoryLabel: "Gömülü Sistemler",
    categoryColor: "badge-accent",
    description: "Arduino pinMode, analogWrite ve seri port üzerinden PWM sinyali sürme.",
    filename: "sketch.ino",
    language: "Arduino C++ (AVR)",
    engineBadge: "ATmega328P Core Sim",
    terminalTitle: "Seri Port Monitörü (115200 Baud)",
    runButtonText: "Kodu Yükle & Çalıştır",
    timePrecision: "16 MHz Saat",
    code: `// Arduino PWM ve Seri Port Kontrolü
const int LED_PIN = 9;   // PWM destekli pin
const int POT_PIN = A0;  // Analog giriş pini

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("[BOOT] Arduino Uno başlatıldı. 16MHz Saat Hazır.");
}

void loop() {
  // Potansiyometreden 0-1023 oku, 0-255 PWM'e eşle:
  int potDeger = 512; // Örnek okuma
  int pwmCikis = map(potDeger, 0, 1023, 0, 255);
  
  analogWrite(LED_PIN, pwmCikis);
  Serial.print("[INFO] Pot: ");
  Serial.print(potDeger);
  Serial.print(" => PWM Duty: ");
  Serial.println(pwmCikis);
  delay(1000);
}`,
    expectedOutput: [
      "[BOOT] Arduino Uno başlatıldı. 16MHz Saat Hazır.",
      "[INFO] Pot: 512 => PWM Duty: 127",
      "[INFO] Pin 9 %50 doluluk oranıyla 490Hz kare dalga üretiyor.",
      "[SUCCESS] Simülasyon çevrimi hatasız çalışıyor.",
    ],
  },
  {
    id: "ros2-telemetry-node",
    name: "ROS 2: rclpy Sensör Telemetri Düğümü",
    category: "embedded",
    categoryLabel: "Gömülü & Robotik",
    categoryColor: "badge-warning",
    description: "ROS 2 Python (rclpy) ile periyodik LiDAR ve batarya telemetrisi yayınlayan Publisher düğümü.",
    filename: "telemetry_node.py",
    language: "Python 3 / ROS 2 rclpy",
    engineBadge: "ROS 2 Humble / DDS",
    terminalTitle: "ROS 2 Düğüm Günlüğü (rclpy logger)",
    runButtonText: "Düğümü Başlat",
    timePrecision: "DDS Döngüsü: 10Hz",
    code: `# ROS 2 rclpy Sensör Telemetri Düğümü
import time

class TelemetriDugumu:
    def __init__(self, dugum_adi="/robot/telemetry"):
        self.dugum_adi = dugum_adi
        self.sayac = 0
        print(f"[BOOT] ROS 2 Düğümü Başlatıldı: {self.dugum_adi}")
        print("[INFO:DDS] CycloneDDS discovery aktif (Domain ID: 0)")

    def telemetri_yayinla(self, pil_yuzde, lidar_menzil_m):
        self.sayac += 1
        mesaj = {
            "seq": self.sayac,
            "topic": "/robot/telemetry",
            "battery_pct": pil_yuzde,
            "min_lidar_distance_m": lidar_menzil_m,
            "status": "NORMAL" if lidar_menzil_m > 0.5 else "ENGEL_UYARISI"
        }
        print(f"[@Adım {self.sayac}] Topic: {mesaj['topic']} | Pil: %{mesaj['battery_pct']} | Ön Mesafe: {mesaj['min_lidar_distance_m']}m -> {mesaj['status']}")
        return mesaj

dugum = TelemetriDugumu()
dugum.telemetri_yayinla(98, 2.45)
dugum.telemetri_yayinla(97, 1.10)
dugum.telemetri_yayinla(97, 0.38) # Engel algılandı
print("[FINISH] Düğüm yaşam döngüsü başarıyla tamamlandı.")`,
    expectedOutput: [
      "[BOOT] ROS 2 Düğümü Başlatıldı: /robot/telemetry",
      "[INFO:DDS] CycloneDDS discovery aktif (Domain ID: 0)",
      "[@Adım 1] Topic: /robot/telemetry | Pil: %98 | Ön Mesafe: 2.45m -> NORMAL",
      "[@Adım 2] Topic: /robot/telemetry | Pil: %97 | Ön Mesafe: 1.1m -> NORMAL",
      "[@Adım 3] Topic: /robot/telemetry | Pil: %97 | Ön Mesafe: 0.38m -> ENGEL_UYARISI",
      "[FINISH] Düğüm yaşam döngüsü başarıyla tamamlandı.",
    ],
  },

  // 4. PROGRAMLAMA DİLLERİ (PYTHON / RUST)
  {
    id: "python-oop",
    name: "Python 3: OOP ve Sensör Sınıfı",
    category: "languages",
    categoryLabel: "Programlama Dilleri",
    categoryColor: "badge-info",
    description: "Python ile nesne yönelimli programlama, kapsülleme ve dize formatlama.",
    filename: "sensor.py",
    language: "Python 3.12",
    engineBadge: "CPython Yorumlayıcı",
    terminalTitle: "Python Konsolu (stdout)",
    runButtonText: "Betiği Çalıştır",
    timePrecision: "Yürütme: ~4ms",
    code: `# Python Nesne Yönelimli Sensör Modeli
class SicaklikSensoru:
    def __init__(self, model: str, pin: int):
        self.model = model
        self.pin = pin
        self._okumalar = []

    def veri_ekle(self, derece: float):
        self._okumalar.append(derece)

    def ortalama_hesapla(self) -> float:
        if not self._okumalar:
            return 0.0
        return sum(self._okumalar) / len(self._okumalar)

# Test Kullanımı:
sensor = SicaklikSensoru("DHT22", 4)
sensor.veri_ekle(23.4)
sensor.veri_ekle(24.1)
sensor.veri_ekle(23.9)

print(f"Sensör Modeli: {sensor.model} (Pin: {sensor.pin})")
print(f"Ortalama Sıcaklık: {sensor.ortalama_hesapla():.2f}°C")`,
    expectedOutput: [
      "[START] Python 3.12 Çekirdeği Hazırlandı.",
      "Sensör Modeli: DHT22 (Pin: 4)",
      "Ortalama Sıcaklık: 23.80°C",
      "[FINISH] İşlem 4ms içinde tamamlandı.",
    ],
  },
  {
    id: "rust-ownership",
    name: "Rust: Sahiplik (Ownership) & Borrowing",
    category: "languages",
    categoryLabel: "Programlama Dilleri",
    categoryColor: "badge-warning",
    description: "Rust dilinde derleme anı bellek güvenliği ve referansla ödünç alma.",
    filename: "main.rs",
    language: "Rust 2021",
    engineBadge: "rustc --release",
    terminalTitle: "Terminal Çıktısı (stdout)",
    runButtonText: "Derle ve Çalıştır",
    timePrecision: "Sıfır Ek Maliyet",
    code: `// Rust Bellek Güvenliği ve Borrowing
fn main() {
    println!("[START] Rust Bellek Modeli");

    let mut veri = String::from("learn.tncy.dev");
    
    // Veriyi referansla ödünç veriyoruz (&):
    let uzunluk = uzunluk_olculer(&veri);
    
    // Veriyi değiştirmek için tekil mutable referans alıyoruz (&mut):
    ekle(&mut veri, " - Donanım & Yazılım");

    println!("Sonuç: {}", veri);
    println!("İlk Uzunluk: {}", uzunluk);
}

fn uzunluk_olculer(s: &String) -> usize {
    s.len()
}

fn ekle(s: &mut String, ek: &str) {
    s.push_str(ek);
}`,
    expectedOutput: [
      "[START] Rust Bellek Modeli",
      "Sonuç: learn.tncy.dev - Donanım & Yazılım",
      "İlk Uzunluk: 14",
      "[SUCCESS] Sıfır bellek sızıntısı (Zero-Cost Abstraction).",
    ],
  },
];

export default function PlaygroundPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<PlaygroundTemplate>(TEMPLATES[0]);

  const filteredTemplates = TEMPLATES.filter(
    (t) => selectedCategory === "all" || t.category === selectedCategory
  );

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-5 max-w-[1600px] w-full mx-auto space-y-3">
      {/* 1. Üst Başlık & Kategori / Şablon Seçici */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-base-200/50 p-3.5 rounded-2xl border border-base-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-base-content">
                Web IDE & Canlı Simülatör
              </h1>
              <span className="badge badge-primary badge-xs font-mono">Çok Dilli v2.0</span>
            </div>
            <p className="text-xs text-base-content/60">
              SystemVerilog, Web, Arduino ve Modern diller için tam ekran deneme ortamı.
            </p>
          </div>
        </div>

        {/* Alan Filtresi & Şablonlar */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Alan Sekmeleri */}
          <div className="flex items-center gap-1 bg-base-100 p-1 rounded-xl border border-base-300 mr-2">
            {[
              { id: "all", label: "Tümü" },
              { id: "hardware", label: "Donanım" },
              { id: "web", label: "Web" },
              { id: "embedded", label: "Gömülü" },
              { id: "languages", label: "Diller" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-content font-bold shadow-xs"
                    : "text-base-content/70 hover:bg-base-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Şablon Butonları */}
          <div className="flex flex-wrap items-center gap-1">
            {filteredTemplates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl)}
                className={`btn btn-xs font-mono text-[11px] rounded-lg ${
                  selectedTemplate.id === tpl.id
                    ? "btn-primary shadow-xs font-bold"
                    : "btn-ghost border border-base-content/10"
                }`}
              >
                {tpl.name}
              </button>
            ))}
          </div>

          <Link
            href="/boards"
            className="btn btn-warning btn-outline btn-xs font-mono text-[11px] rounded-lg ml-1 hidden sm:flex"
          >
            <Layers className="w-3 h-3" />
            Kartlar
          </Link>
        </div>
      </div>

      {/* 2. Seçili Şablon Bilgi Şeridi */}
      <div className="px-3.5 py-2 bg-base-200/40 rounded-xl border border-base-content/5 text-xs text-base-content/70 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className={`badge ${selectedTemplate.categoryColor} badge-xs font-mono font-bold shrink-0`}>
            {selectedTemplate.categoryLabel}
          </span>
          <strong className="text-base-content truncate">{selectedTemplate.name}:</strong>
          <span className="truncate hidden sm:inline">{selectedTemplate.description}</span>
        </div>
        <span className="text-[10px] font-mono text-base-content/50 shrink-0 ml-2">
          Kısayol: ⌘K arama
        </span>
      </div>

      {/* 3. Tam Ekran IDE Bileşeni */}
      <div className="flex-1 min-h-[600px]">
        <CodePlayground
          key={selectedTemplate.id}
          title={selectedTemplate.name}
          initialCode={selectedTemplate.code}
          expectedOutput={selectedTemplate.expectedOutput}
          signals={selectedTemplate.signals}
          filename={selectedTemplate.filename}
          language={selectedTemplate.language}
          engineBadge={selectedTemplate.engineBadge}
          terminalTitle={selectedTemplate.terminalTitle}
          runButtonText={selectedTemplate.runButtonText}
          timePrecision={selectedTemplate.timePrecision}
          mode="fullscreen"
        />
      </div>
    </div>
  );
}
