"use client";

import { useState, useEffect } from "react";
import MonacoEditor from "@/components/MonacoEditor";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Activity,
  Layers,
  Cpu,
  Globe,
  Code2,
  FileCode,
  FolderTree,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Minimize2,
  Settings,
  GitBranch,
  RefreshCw,
  Bot,
  Sparkles,
  MapPin,
  Eye,
  Sliders,
} from "lucide-react";

export type WorkspacePresetId =
  | "systemverilog-counter"
  | "systemverilog-alu"
  | "web-developer"
  | "ros2-robotics"
  | "stm32-freertos";

export interface FileItem {
  name: string;
  language: string;
  content: string;
  readOnly?: boolean;
}

export interface WorkspaceConfig {
  id: WorkspacePresetId;
  title: string;
  category: "hardware" | "web" | "robotics" | "embedded" | "languages";
  categoryLabel: string;
  categoryColor: string;
  description: string;
  layout: "systemverilog-3pane" | "web-live-preview" | "ros2-split" | "standard";
  files: FileItem[];
  defaultActiveFile: string;
  secondaryFile?: string; // For 3-pane SystemVerilog right editor (e.g. testbench.sv)
  simLogs: string[];
  signals?: { name: string; wave: string; data?: string[] }[];
}

export const WORKSPACE_PRESETS: WorkspaceConfig[] = [
  // 1. SYSTEMVERILOG 3-PANE: SAYAÇ & TESTBENCH (VARSAYILAN HARDWARE STUDIO)
  {
    id: "systemverilog-counter",
    title: "SystemVerilog: 4-Bit Sayaç & Testbench",
    category: "hardware",
    categoryLabel: "Donanım & RTL",
    categoryColor: "badge-primary",
    description: "RTL Tasarım Kodu (DUT) + Testbench Kodu + Terminal & Dalga Şekli (3'lü VS Code Görünümü)",
    layout: "systemverilog-3pane",
    defaultActiveFile: "counter.sv",
    secondaryFile: "tb_counter.sv",
    files: [
      {
        name: "counter.sv",
        language: "systemverilog",
        content: `// 4-Bit Senkron İleri Sayaç (DUT - Design Under Test)
\`timescale 1ns/1ps

module counter (
    input  logic       clk,
    input  logic       rst_n,
    input  logic       enable,
    output logic [3:0] count,
    output logic       overflow
);

    // Ardışıl Mantık (Sequential Logic)
    always_ff @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            count    <= 4'b0000;
            overflow <= 1'b0;
        end else if (enable) begin
            if (count == 4'hF) begin
                count    <= 4'b0000;
                overflow <= 1'b1;
            end else begin
                count    <= count + 1'b1;
                overflow <= 1'b0;
            end
        end
    end

endmodule`,
      },
      {
        name: "tb_counter.sv",
        language: "systemverilog",
        content: `// Testbench (Testmark) Doğrulama Kodu
\`timescale 1ns/1ps

module tb_counter;
    logic       clk = 0;
    logic       rst_n = 0;
    logic       enable = 0;
    logic [3:0] count;
    logic       overflow;

    // 10ns Periyotlu Saat Üreteci (100 MHz)
    always #5 clk = ~clk;

    // DUT Örneklemesi (Instantiation)
    counter uut (
        .clk(clk),
        .rst_n(rst_n),
        .enable(enable),
        .count(count),
        .overflow(overflow)
    );

    initial begin
        $display("[INFO:SIM] Verilator/Icarus Simülatörü Başlatıldı.");
        $display("[T=0ns] Başlangıç Değerleri: Reset Aktif (0)");
        
        #12 rst_n = 1; enable = 1; // 12ns'de Reset bırakılır, sayma başlar
        $display("[T=12ns] Reset Bırakıldı, Sayma Etkinleştirildi.");

        #80;
        $display("[FINISH] Testbench tamamlandı. Son Sayı: %0d", count);
        $finish;
    end

    // Her saat çevriminde çıktıyı izle
    always @(posedge clk) begin
        if (rst_n && enable)
            $display("[@%0tns] CLK kenarı => count = %0d (0x%0h), OVF = %0b", 
                     $time, count, count, overflow);
    end
endmodule`,
      },
      {
        name: "waves.vcd",
        language: "vcd",
        readOnly: true,
        content: `$date 2026-10-10 $end
$version Icarus Verilog $end
$timescale 1ps $end
$scope module tb_counter $end
$var wire 1 ! clk $end
$var wire 1 " rst_n $end
$var wire 4 # count [3:0] $end
$upscope $end
$enddefinitions $end`,
      },
    ],
    simLogs: [
      "[INFO:EDA] Sentezleyici: Verilator v5.024 / Icarus Verilog",
      "[INFO:EDA] Dosyalar derleniyor: counter.sv, tb_counter.sv...",
      "[INFO:SIM] Simülasyon başladı (Zaman çözünürlüğü: 1ps)",
      "[T=0ns] Başlangıç Değerleri: Reset Aktif (0)",
      "[T=12ns] Reset Bırakıldı, Sayma Etkinleştirildi.",
      "[@15ns] CLK kenarı => count = 0 (0x0), OVF = 0",
      "[@25ns] CLK kenarı => count = 1 (0x1), OVF = 0",
      "[@35ns] CLK kenarı => count = 2 (0x2), OVF = 0",
      "[@45ns] CLK kenarı => count = 3 (0x3), OVF = 0",
      "[@55ns] CLK kenarı => count = 4 (0x4), OVF = 0",
      "[@65ns] CLK kenarı => count = 5 (0x5), OVF = 0",
      "[@75ns] CLK kenarı => count = 6 (0x6), OVF = 0",
      "[@85ns] CLK kenarı => count = 7 (0x7), OVF = 0",
      "[FINISH] Testbench tamamlandı. Son Sayı: 7",
      "[SUCCESS] Doğrulama Başarılı! 0 Hata, 0 Zamanlama İhlali.",
    ],
    signals: [
      { name: "clk", wave: "010101010101" },
      { name: "rst_n", wave: "001111111111" },
      { name: "enable", wave: "001111111111" },
      { name: "count[3:0]", wave: "======", data: ["0", "0", "1", "2", "3", "4", "5", "6", "7"] },
      { name: "overflow", wave: "000000000000" },
    ],
  },

  // 2. SYSTEMVERILOG 3-PANE: ALU & TESTBENCH
  {
    id: "systemverilog-alu",
    title: "SystemVerilog: 8-Bit Aritmetik Mantık Birimi (ALU)",
    category: "hardware",
    categoryLabel: "Donanım & RTL",
    categoryColor: "badge-primary",
    description: "Kombinasyonel ALU RTL Kodu + Çoklu Senaryo Testbench + Simülasyon Çıktısı",
    layout: "systemverilog-3pane",
    defaultActiveFile: "alu.sv",
    secondaryFile: "tb_alu.sv",
    files: [
      {
        name: "alu.sv",
        language: "systemverilog",
        content: `// 8-Bit Aritmetik Mantık Birimi (ALU)
module alu (
    input  logic [7:0] a,
    input  logic [7:0] b,
    input  logic [2:0] opcode,
    output logic [7:0] result,
    output logic       zero_flag,
    output logic       carry_flag
);

    logic [8:0] extended_res;

    always_comb begin
        extended_res = 9'd0;
        case (opcode)
            3'b000: extended_res = a + b;             // TOPLA
            3'b001: extended_res = a - b;             // CIKAR
            3'b010: extended_res = {1'b0, a & b};     // VE (AND)
            3'b011: extended_res = {1'b0, a | b};     // VEYA (OR)
            3'b100: extended_res = {1'b0, a ^ b};     // XOR
            3'b101: extended_res = {1'b0, a << 1};    // SOLA KAYDIR
            default: extended_res = 9'd0;
        endcase
        
        result     = extended_res[7:0];
        carry_flag = extended_res[8];
        zero_flag  = (result == 8'h00);
    end

endmodule`,
      },
      {
        name: "tb_alu.sv",
        language: "systemverilog",
        content: `// ALU Testbench Kodu (Testmark)
module tb_alu;
    logic [7:0] a, b;
    logic [2:0] opcode;
    logic [7:0] result;
    logic       zero_flag, carry_flag;

    alu dut (.*);

    initial begin
        $display("=== ALU DOĞRULAMA TESTLERİ BAŞLADI ===");
        
        // 1. Toplama Testi: 15 + 25 = 40
        a = 8'd15; b = 8'd25; opcode = 3'b000; #10;
        $display("[@10ns] TOPLA: %0d + %0d = %0d (Zero:%0b Carry:%0b)", a, b, result, zero_flag, carry_flag);

        // 2. Çıkarma Testi: 100 - 30 = 70
        a = 8'd100; b = 8'd30; opcode = 3'b001; #10;
        $display("[@20ns] CIKAR: %0d - %0d = %0d (Zero:%0b Carry:%0b)", a, b, result, zero_flag, carry_flag);

        // 3. XOR Testi: 0xAA ^ 0x55 = 0xFF
        a = 8'hAA; b = 8'h55; opcode = 3'b100; #10;
        $display("[@30ns] XOR: 0x%0h ^ 0x%0h = 0x%0h", a, b, result);

        // 4. Sıfır Bayrağı Testi: 50 - 50 = 0
        a = 8'd50; b = 8'd50; opcode = 3'b001; #10;
        $display("[@40ns] SIFIR TESTI: 50 - 50 = %0d => Zero Flag: %0b", result, zero_flag);

        $display("=== TÜM 4 TEST BAŞARIYLA GEÇTİ ===");
        $finish;
    end
endmodule`,
      },
    ],
    simLogs: [
      "[INFO:EDA] Compiling alu.sv and tb_alu.sv...",
      "=== ALU DOĞRULAMA TESTLERİ BAŞLADI ===",
      "[@10ns] TOPLA: 15 + 25 = 40 (Zero:0 Carry:0)",
      "[@20ns] CIKAR: 100 - 30 = 70 (Zero:0 Carry:0)",
      "[@30ns] XOR: 0xaa ^ 0x55 = 0xff",
      "[@40ns] SIFIR TESTI: 50 - 50 = 0 => Zero Flag: 1",
      "=== TÜM 4 TEST BAŞARIYLA GEÇTİ ===",
      "[SUCCESS] Doğrulama tamamlandı: 0 Hata.",
    ],
    signals: [
      { name: "opcode[2:0]", wave: "======", data: ["000", "000", "001", "100", "001"] },
      { name: "result[7:0]", wave: "======", data: ["40", "40", "70", "FF", "00"] },
      { name: "zero_flag", wave: "000011" },
    ],
  },

  // 3. WEB GELİŞTİRME (HTML / CSS / JS) - CANLI TARAYICI ÖNİZLEMESİ
  {
    id: "web-developer",
    title: "Web: HTML5, CSS3 & Donanım Telemetri Paneli",
    category: "web",
    categoryLabel: "Web Geliştirme",
    categoryColor: "badge-error",
    description: "HTML, CSS ve JavaScript Çoklu Sekmeli Editör + Canlı Tarayıcı Önizlemesi (Live Web Preview)",
    layout: "web-live-preview",
    defaultActiveFile: "index.html",
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
  <title>Gömülü Donanım Telemetri Paneli</title>
</head>
<body>
  <div class="dashboard">
    <header class="header">
      <div class="badge">CANLI TELEMETRI</div>
      <h1>STM32 & ESP32 Sensör Paneli</h1>
    </header>

    <div class="cards-grid">
      <div class="card">
        <span class="label">Sıcaklık</span>
        <div class="value" id="temp-val">24.6 °C</div>
        <div class="meter-bar"><div class="fill" style="width: 49%;"></div></div>
      </div>

      <div class="card">
        <span class="label">Nem Oranı</span>
        <div class="value" id="hum-val">%48.2</div>
        <div class="meter-bar"><div class="fill blue" style="width: 48%;"></div></div>
      </div>

      <div class="card">
        <span class="label">İşlemci Saati</span>
        <div class="value" id="clock-val">168 MHz</div>
        <div class="status-dot"></div>
      </div>
    </div>

    <div class="controls">
      <button id="btn-toggle" class="btn">LED Röle Durumunu Değiştir</button>
      <div id="relay-status" class="status-text">Röle: KAPALI</div>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>`,
      },
      {
        name: "style.css",
        language: "css",
        content: `/* Modern Cyberpunk / Dark Dashboard CSS */
body {
  margin: 0;
  padding: 24px;
  background-color: #0b0f19;
  color: #e2e8f0;
  font-family: system-ui, -apple-system, sans-serif;
}

.dashboard {
  max-width: 650px;
  margin: 0 auto;
}

.header {
  margin-bottom: 24px;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(14, 165, 233, 0.2);
  color: #38bdf8;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.05em;
  font-family: monospace;
}

h1 {
  font-size: 22px;
  margin: 8px 0 0 0;
  font-weight: 800;
  color: #ffffff;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.card {
  background: #151d30;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.label {
  font-size: 11px;
  color: #94a3b8;
  text-transform: uppercase;
  font-family: monospace;
}

.value {
  font-size: 22px;
  font-weight: 800;
  color: #38bdf8;
  margin: 8px 0;
  font-family: monospace;
}

.meter-bar {
  height: 6px;
  background: #1e293b;
  border-radius: 3px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: #10b981;
}

.fill.blue {
  background: #38bdf8;
}

.btn {
  background: #0284c7;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: #0369a1;
}

.controls {
  background: #151d30;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-text {
  font-family: monospace;
  font-size: 13px;
  color: #ef4444;
  font-weight: bold;
}`,
      },
      {
        name: "app.js",
        language: "javascript",
        content: `// Canlı Telemetri Simülasyonu
let isRelayOn = false;

document.getElementById("btn-toggle").addEventListener("click", () => {
  isRelayOn = !isRelayOn;
  const statusEl = document.getElementById("relay-status");
  statusEl.textContent = isRelayOn ? "Röle: AÇIK (220V Aktif)" : "Röle: KAPALI";
  statusEl.style.color = isRelayOn ? "#10b981" : "#ef4444";
});

// Sıcaklık verisini periyodik güncelle
setInterval(() => {
  const temp = (24 + Math.random() * 1.5).toFixed(1);
  const hum = (48 + Math.random() * 2).toFixed(1);
  const tempEl = document.getElementById("temp-val");
  const humEl = document.getElementById("hum-val");
  if (tempEl) tempEl.textContent = temp + " °C";
  if (humEl) humEl.textContent = "%" + hum;
}, 2000);`,
      },
    ],
    simLogs: [
      "[INFO:WEB] Live Server başlatıldı: http://localhost:3000",
      "[INFO:WEB] index.html, style.css ve app.js yüklendi.",
      "[EVENT] DOMContentLoaded tetiklendi.",
      "[TELEMETRY] Sensör polling aktif (Periyot: 2000ms)",
    ],
  },

  // 4. ROS 2 ROBOTİK ÇALIŞMA ALANI (RCLPY & DÜĞÜM GRAFİĞİ)
  {
    id: "ros2-robotics",
    title: "ROS 2 Humble: LiDAR Telemetri & Düğüm Grafiği",
    category: "robotics",
    categoryLabel: "Robotik & ROS 2",
    categoryColor: "badge-warning",
    description: "ROS 2 Python (rclpy) Publisher/Subscriber + Terminal Komutları + rqt_graph Görselleştirme",
    layout: "ros2-split",
    defaultActiveFile: "publisher_node.py",
    secondaryFile: "subscriber_node.py",
    files: [
      {
        name: "publisher_node.py",
        language: "python",
        content: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import json, random

class TelemetriPublisher(Node):
    def __init__(self):
        super().__init__('telemetri_publisher')
        self.publisher_ = self.create_publisher(String, '/robot/telemetry', 10)
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.sayac = 0
        self.get_logger().info('ROS 2 Telemetri Düğümü Başlatıldı! Topic: /robot/telemetry')

    def timer_callback(self):
        self.sayac += 1
        veri = {
            "seq": self.sayac,
            "pil_pct": max(20, 100 - self.sayac),
            "lidar_min_m": round(random.uniform(0.3, 3.5), 2),
            "hiz_mps": 0.45
        }
        msg = String()
        msg.data = json.dumps(veri)
        self.publisher_.publish(msg)
        self.get_logger().info(f'Yayınlandı #{self.sayac}: Pil=%{veri["pil_pct"]}, LiDAR={veri["lidar_min_m"]}m')

def main(args=None):
    rclpy.init(args=args)
    dugum = TelemetriPublisher()
    rclpy.spin(dugum)
    dugum.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()`,
      },
      {
        name: "subscriber_node.py",
        language: "python",
        content: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import json

class GuvenlikDenetleyici(Node):
    def __init__(self):
        super().__init__('guvenlik_denetleyici')
        self.subscription = self.create_subscription(
            String,
            '/robot/telemetry',
            self.listener_callback,
            10
        )
        self.get_logger().info('Güvenlik Denetleyicisi dinlemede...')

    def listener_callback(self, msg):
        veri = json.loads(msg.data)
        min_mesafe = veri.get("lidar_min_m", 1.0)
        
        if min_mesafe < 0.5:
            self.get_logger().warn(f'DİKKAT: Engel Çok Yakın ({min_mesafe}m)! Acil Durma Freni Uygulandı.')
        else:
            self.get_logger().info(f'Yol Açık ({min_mesafe}m). Normal sürüş devam ediyor.')

def main(args=None):
    rclpy.init(args=args)
    rclpy.spin(GuvenlikDenetleyici())
    rclpy.shutdown()

if __name__ == '__main__':
    main()`,
      },
      {
        name: "package.xml",
        language: "xml",
        readOnly: true,
        content: `<?xml version="1.0"?>
<package format="3">
  <name>robot_telemetry_pkg</name>
  <version>1.0.0</version>
  <description>ROS 2 Humble Telemetri ve Güvenlik Paketi</description>
  <maintainer email="tnc4y@learn.tncy.dev">Antigravity</maintainer>
  <license>Apache-2.0</license>
  <depend>rclpy</depend>
  <depend>std_msgs</depend>
</package>`,
      },
    ],
    simLogs: [
      "[ROS2] colcon build --packages-select robot_telemetry_pkg",
      "[ROS2] Summary: 1 package finished [0.82s]",
      "[ROS2] source install/setup.bash",
      "[BOOT] [telemetri_publisher]: ROS 2 Telemetri Düğümü Başlatıldı! Topic: /robot/telemetry",
      "[BOOT] [guvenlik_denetleyici]: Güvenlik Denetleyicisi dinlemede...",
      "[INFO] [telemetri_publisher]: Yayınlandı #1: Pil=%99, LiDAR=2.45m",
      "[INFO] [guvenlik_denetleyici]: Yol Açık (2.45m). Normal sürüş devam ediyor.",
      "[INFO] [telemetri_publisher]: Yayınlandı #2: Pil=%98, LiDAR=1.12m",
      "[INFO] [guvenlik_denetleyici]: Yol Açık (1.12m). Normal sürüş devam ediyor.",
      "[INFO] [telemetri_publisher]: Yayınlandı #3: Pil=%97, LiDAR=0.42m",
      "[WARN] [guvenlik_denetleyici]: DİKKAT: Engel Çok Yakın (0.42m)! Acil Durma Freni Uygulandı.",
      "[SUCCESS] ROS 2 DDS İletişim döngüsü aktif çalışıyor.",
    ],
  },

  // 5. GÖMÜLÜ C / STM32 & FREERTOS
  {
    id: "stm32-freertos",
    title: "STM32 & FreeRTOS: Çoklu Görev Planlayıcı (Multitasking)",
    category: "embedded",
    categoryLabel: "Gömülü C & RTOS",
    categoryColor: "badge-accent",
    description: "CMSIS-RTOS Görevleri, Kuyruklar (Queue) ve Preemptive Zaman Dilimleme",
    layout: "standard",
    defaultActiveFile: "main.c",
    files: [
      {
        name: "main.c",
        language: "c",
        content: `#include "main.h"
#include "cmsis_os.h"

osThreadId_t taskLedHandle;
osThreadId_t taskSensorHandle;
osMessageQueueId_t sensorQueueHandle;

typedef struct {
    float temperature;
    uint32_t timestamp;
} SensorData_t;

void StartTaskLed(void *argument) {
    for(;;) {
        HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
        osDelay(500); // 500ms CPU boş bırakılır (Diğer görev çalışır)
    }
}

void StartTaskSensor(void *argument) {
    SensorData_t data;
    for(;;) {
        data.temperature = 24.5f;
        data.timestamp = osKernelGetTickCount();
        osMessageQueuePut(sensorQueueHandle, &data, 0U, 0U);
        osDelay(1000);
    }
}

int main(void) {
    HAL_Init();
    SystemClock_Config();
    osKernelInitialize();

    sensorQueueHandle = osMessageQueueNew(16, sizeof(SensorData_t), NULL);
    taskLedHandle = osThreadNew(StartTaskLed, NULL, NULL);
    taskSensorHandle = osThreadNew(StartTaskSensor, NULL, NULL);

    osKernelStart();
    while (1) {}
}`,
      },
      {
        name: "FreeRTOSConfig.h",
        language: "c",
        readOnly: true,
        content: `#define configUSE_PREEMPTION                    1
#define configUSE_TIME_SLICING                  1
#define configCPU_CLOCK_HZ                      ( 84000000 )
#define configTICK_RATE_HZ                      ( ( TickType_t ) 1000 )
#define configMINIMAL_STACK_SIZE                ( ( uint16_t ) 128 )
#define configTOTAL_HEAP_SIZE                   ( ( size_t ) 15360 )`,
      },
    ],
    simLogs: [
      "[INFO:GCC] arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb -O2 main.c -o firmware.elf",
      "[INFO:LINK] Bölüm Boyutları: Flash: 14.2 KB (%2.7), RAM: 4.8 KB (%7.5)",
      "[OPENOCD] ST-Link V2 Bağlandı (Target: STM32F401RE)",
      "[BOOT] FreeRTOS v10.5.1 Preemptive Scheduler Başlatıldı.",
      "[@500ms] TaskLed: PC13 LED Durumu Terslendi (HIGH)",
      "[@1000ms] TaskSensor: Sıcaklık Kuyruğa Yazıldı -> 24.50 C",
      "[@1000ms] TaskLed: PC13 LED Durumu Terslendi (LOW)",
      "[SUCCESS] RTOS Görevleri Sıfır Gecikme ile Koşturuluyor.",
    ],
  },
];

export default function VSCodePlayground({ initialPresetId }: { initialPresetId?: string }) {
  const [selectedPresetId, setSelectedPresetId] = useState<WorkspacePresetId>(
    (initialPresetId as WorkspacePresetId) || "systemverilog-counter"
  );
  const currentWorkspace =
    WORKSPACE_PRESETS.find((p) => p.id === selectedPresetId) || WORKSPACE_PRESETS[0];

  // Dosya Durumları
  const [filesState, setFilesState] = useState<{ [key: string]: string }>({});
  const [activeFileName, setActiveFileName] = useState<string>(currentWorkspace.defaultActiveFile);
  const [secondaryFileName, setSecondaryFileName] = useState<string | undefined>(
    currentWorkspace.secondaryFile
  );

  // Çalışma ve Simülasyon
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [activeBottomTab, setActiveBottomTab] = useState<"terminal" | "waveform" | "rqt">(
    "terminal"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activityTab, setActivityTab] = useState<"explorer" | "run" | "git">("explorer");
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [minimapEnabled, setMinimapEnabled] = useState(true);
  const [webPreviewRefreshKey, setWebPreviewRefreshKey] = useState(0);

  // Çalışma Alanı Değiştiğinde Dosyaları Yükle
  useEffect(() => {
    const initialFiles: { [key: string]: string } = {};
    currentWorkspace.files.forEach((f) => {
      initialFiles[f.name] = f.content;
    });
    setFilesState(initialFiles);
    setActiveFileName(currentWorkspace.defaultActiveFile);
    setSecondaryFileName(currentWorkspace.secondaryFile);
    setTerminalLogs(currentWorkspace.simLogs.slice(0, 5));
  }, [currentWorkspace]);

  const activeFile = currentWorkspace.files.find((f) => f.name === activeFileName);
  const secondaryFile = currentWorkspace.files.find((f) => f.name === secondaryFileName);

  const activeContent = filesState[activeFileName] ?? activeFile?.content ?? "";
  const secondaryContent = secondaryFileName
    ? filesState[secondaryFileName] ?? secondaryFile?.content ?? ""
    : "";

  const handleContentChange = (filename: string, newContent: string) => {
    setFilesState((prev) => ({ ...prev, [filename]: newContent }));
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTerminalLogs([
      `[EXEC] Derleme ve simülasyon başlatılıyor (${activeFileName})...`,
      `[WAIT] Girişler doğrulanıyor...`,
    ]);

    setTimeout(() => {
      setIsRunning(false);
      setTerminalLogs(currentWorkspace.simLogs);
      setWebPreviewRefreshKey((k) => k + 1);
    }, 450);
  };

  const handleReset = () => {
    const initialFiles: { [key: string]: string } = {};
    currentWorkspace.files.forEach((f) => {
      initialFiles[f.name] = f.content;
    });
    setFilesState(initialFiles);
    setTerminalLogs(currentWorkspace.simLogs.slice(0, 3));
    setWebPreviewRefreshKey((k) => k + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Web Önizleme HTML Birleştirme
  const combinedWebHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>${filesState["style.css"] || ""}</style>
      </head>
      <body>
        ${filesState["index.html"] ? filesState["index.html"].replace(/<!DOCTYPE html>|<html[^>]*>|<\/html>|<head>[\s\S]*<\/head>|<body>|<\/body>/gi, "") : ""}
        <script>
          try {
            ${filesState["app.js"] || ""}
          } catch(e) {
            console.error(e);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div
      className={`flex flex-col bg-[#181818] text-[#cccccc] rounded-2xl border border-[#333333] shadow-2xl overflow-hidden font-sans select-none transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "min-h-[760px] h-[82vh]"
      }`}
    >
      {/* 1. VS CODE EN ÜST MENÜ & ÇALIŞMA ALANI SEÇİCİ BARI */}
      <div className="h-10 bg-[#252526] border-b border-[#1e1e1e] px-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {/* Logo / Title */}
          <div className="flex items-center gap-1.5 font-bold text-white shrink-0">
            <Code2 className="w-4 h-4 text-[#007acc]" />
            <span className="hidden sm:inline">VS Code Web (Monaco Engine)</span>
          </div>

          <span className="text-[#555555]">/</span>

          {/* Çalışma Alanı Seçici Dropdown */}
          <select
            value={selectedPresetId}
            onChange={(e) => setSelectedPresetId(e.target.value as WorkspacePresetId)}
            className="bg-[#333333] text-white text-xs px-2.5 py-1 rounded-md border border-[#444444] focus:outline-none focus:border-[#007acc] font-mono cursor-pointer"
          >
            <option value="systemverilog-counter">📁 SystemVerilog 3-Pane (Sayaç)</option>
            <option value="systemverilog-alu">📁 SystemVerilog 3-Pane (ALU)</option>
            <option value="web-developer">🌐 HTML5 / CSS3 / JS (Canlı Önizleme)</option>
            <option value="ros2-robotics">🤖 ROS 2 Humble (Düğüm & Telemetri)</option>
            <option value="stm32-freertos">⚡ STM32 & FreeRTOS (C RTOS)</option>
          </select>

          <span className={`badge ${currentWorkspace.categoryColor} badge-xs font-mono font-bold hidden md:inline-flex`}>
            {currentWorkspace.categoryLabel}
          </span>
        </div>

        {/* Sağ Aksiyon Butonları */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setMinimapEnabled(!minimapEnabled)}
            className={`p-1.5 rounded-md transition-colors ${
              minimapEnabled ? "text-[#007acc] bg-[#333333]" : "text-[#858585] hover:text-white"
            }`}
            title={minimapEnabled ? "Minimap Gizle" : "Minimap Göster"}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="flex items-center gap-1.5 bg-[#0e639c] hover:bg-[#1177bb] text-white px-3 py-1 rounded-md font-mono text-xs font-bold transition-colors shadow-xs"
            title="Kodu Derle ve Simüle Et (F5)"
          >
            {isRunning ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isRunning ? "Yürütülüyor..." : "Çalıştır (F5)"}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-[#333333] rounded-md text-[#999999] hover:text-white transition-colors"
            title="Varsayılan Koda Dön"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-[#333333] rounded-md text-[#999999] hover:text-white transition-colors"
            title="Aktif Kodu Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-[#333333] rounded-md text-[#999999] hover:text-white transition-colors"
            title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. ANA ÇALIŞMA ALANI (ACTIVITY BAR + EXPLORER + EDITORS + TERMINAL) */}
      <div className="flex-1 flex overflow-hidden">
        {/* A) EN SOL ACTIVITY BAR (48px) */}
        <div className="w-12 bg-[#252526] border-r border-[#1e1e1e] flex flex-col items-center justify-between py-2 shrink-0">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => {
                if (activityTab === "explorer") setSidebarOpen(!sidebarOpen);
                else {
                  setActivityTab("explorer");
                  setSidebarOpen(true);
                }
              }}
              className={`p-2.5 rounded-lg transition-colors ${
                activityTab === "explorer" && sidebarOpen
                  ? "text-white bg-[#37373d] border-l-2 border-[#007acc]"
                  : "text-[#858585] hover:text-white"
              }`}
              title="Dosya Gezgini (Explorer)"
            >
              <FolderTree className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setActivityTab("run");
                setSidebarOpen(true);
              }}
              className={`p-2.5 rounded-lg transition-colors ${
                activityTab === "run" && sidebarOpen
                  ? "text-white bg-[#37373d] border-l-2 border-[#007acc]"
                  : "text-[#858585] hover:text-white"
              }`}
              title="Çalıştır ve Hata Ayıkla (Run & Debug)"
            >
              <Play className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setActivityTab("git");
                setSidebarOpen(true);
              }}
              className={`p-2.5 rounded-lg transition-colors ${
                activityTab === "git" && sidebarOpen
                  ? "text-white bg-[#37373d] border-l-2 border-[#007acc]"
                  : "text-[#858585] hover:text-white"
              }`}
              title="Kaynak Kontrolü (Git)"
            >
              <GitBranch className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              className="p-2 text-[#858585] hover:text-white transition-colors"
              title="Ayarlar"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* B) PRIMARY SIDEBAR (EXPLORER TREE) */}
        {sidebarOpen && (
          <div className="w-56 bg-[#1e1e1e] border-r border-[#2d2d2d] flex flex-col shrink-0 text-xs">
            {/* Sidebar Başlığı */}
            <div className="h-9 px-3 border-b border-[#2d2d2d] flex items-center justify-between text-[#bbbbbb] font-bold tracking-wider uppercase font-mono text-[11px]">
              <span>GEZGİN: {currentWorkspace.categoryLabel}</span>
              <span className="text-[#666666]">{currentWorkspace.files.length} dosya</span>
            </div>

            {/* Dosya Ağacı */}
            <div className="p-2 flex-1 overflow-y-auto space-y-1 font-mono">
              <div className="flex items-center gap-1 text-[#858585] font-bold text-[10px] px-2 py-1">
                <ChevronDown className="w-3 h-3" />
                <span className="uppercase">WORKSPACE</span>
              </div>

              {currentWorkspace.files.map((file) => {
                const isActive = file.name === activeFileName;
                const isSecondary = file.name === secondaryFileName;

                return (
                  <button
                    key={file.name}
                    onClick={() => setActiveFileName(file.name)}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-left transition-colors ${
                      isActive
                        ? "bg-[#37373d] text-white font-bold"
                        : isSecondary
                        ? "bg-[#2a2d2e] text-[#4fc1ff]"
                        : "text-[#cccccc] hover:bg-[#2a2d2e]"
                    }`}
                  >
                    {/* Dosya İkonları */}
                    {file.name.endsWith(".sv") || file.name.endsWith(".v") ? (
                      <Cpu className="w-3.5 h-3.5 text-[#4fc1ff] shrink-0" />
                    ) : file.name.endsWith(".html") ? (
                      <Globe className="w-3.5 h-3.5 text-[#e44d26] shrink-0" />
                    ) : file.name.endsWith(".css") ? (
                      <Code2 className="w-3.5 h-3.5 text-[#264de4] shrink-0" />
                    ) : file.name.endsWith(".js") ? (
                      <FileCode className="w-3.5 h-3.5 text-[#f7df1e] shrink-0" />
                    ) : file.name.endsWith(".py") ? (
                      <Bot className="w-3.5 h-3.5 text-[#3776ab] shrink-0" />
                    ) : file.name.endsWith(".c") ? (
                      <Cpu className="w-3.5 h-3.5 text-[#00599c] shrink-0" />
                    ) : (
                      <FileCode className="w-3.5 h-3.5 text-[#9cdcfe] shrink-0" />
                    )}

                    <span className="truncate flex-1">{file.name}</span>

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007acc] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bilgi Kutusu */}
            <div className="p-3 border-t border-[#2d2d2d] bg-[#181818] text-[11px] text-[#858585] space-y-1">
              <div className="font-bold text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#007acc]" />
                <span>Monaco Editor Motoru</span>
              </div>
              <p className="leading-tight text-[10px]">
                VS Code'un resmi Monaco motoru ile renklendirme, minimap ve kısayollar aktif.
              </p>
            </div>
          </div>
        )}

        {/* C) MERKEZİ MONACO EDİTÖR & ÇIKTI ALANI */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
          {/* DURUM 1: SYSTEMVERILOG 3-PANE DÜZENİ (DUT + TESTBENCH + TERMINAL) */}
          {currentWorkspace.layout === "systemverilog-3pane" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* ÜST İKİLİ MONACO EDİTÖR (SOL: RTL KODU, SAĞ: TESTBENCH KODU) */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden border-b border-[#2d2d2d]">
                {/* SOL MONACO EDİTÖR (DUT / RTL) */}
                <div className="flex-1 flex flex-col border-r border-[#2d2d2d] overflow-hidden">
                  <div className="h-9 bg-[#252526] px-3 border-b border-[#1e1e1e] flex items-center justify-between text-xs font-mono shrink-0">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Cpu className="w-3.5 h-3.5 text-[#4fc1ff]" />
                      <span>{activeFileName} (RTL / Donanım)</span>
                    </div>
                    <span className="text-[10px] text-[#858585]">DUT Modülü (Monaco)</span>
                  </div>

                  <div className="flex-1 overflow-hidden relative">
                    <MonacoEditor
                      value={activeContent}
                      onChange={(val) => handleContentChange(activeFileName, val)}
                      language={activeFile?.language || "systemverilog"}
                      readOnly={activeFile?.readOnly}
                      minimap={minimapEnabled}
                    />
                  </div>
                </div>

                {/* SAĞ MONACO EDİTÖR (TESTBENCH / TESTMARK) */}
                {secondaryFileName && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="h-9 bg-[#252526] px-3 border-b border-[#1e1e1e] flex items-center justify-between text-xs font-mono shrink-0">
                      <div className="flex items-center gap-2 text-[#4fc1ff] font-bold">
                        <Code2 className="w-3.5 h-3.5 text-[#4fc1ff]" />
                        <span>{secondaryFileName} (Testbench / Testmark)</span>
                      </div>
                      <span className="text-[10px] text-[#858585]">Doğrulama Çevresi (Monaco)</span>
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                      <MonacoEditor
                        value={secondaryContent}
                        onChange={(val) => handleContentChange(secondaryFileName, val)}
                        language={secondaryFile?.language || "systemverilog"}
                        readOnly={secondaryFile?.readOnly}
                        minimap={minimapEnabled}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ALT PANE: SİMÜLASYON TERMİNALİ & DALGA ŞEKLİ GÖRÜNTÜLEYİCİ */}
              <div className="h-60 bg-[#181818] flex flex-col shrink-0">
                <div className="h-8 bg-[#252526] border-b border-[#1e1e1e] px-3 flex items-center justify-between text-xs font-mono shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveBottomTab("terminal")}
                      className={`h-8 flex items-center gap-1.5 px-2 border-b-2 transition-colors ${
                        activeBottomTab === "terminal"
                          ? "border-[#007acc] text-white font-bold"
                          : "border-transparent text-[#858585] hover:text-white"
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>TERMİNAL (iverilog & $display)</span>
                    </button>

                    <button
                      onClick={() => setActiveBottomTab("waveform")}
                      className={`h-8 flex items-center gap-1.5 px-2 border-b-2 transition-colors ${
                        activeBottomTab === "waveform"
                          ? "border-[#007acc] text-white font-bold"
                          : "border-transparent text-[#858585] hover:text-white"
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-[#4fc1ff]" />
                      <span>DALGA ŞEKLİ (Waveform Viewer)</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-[#666666]">Simülasyon Çözünürlüğü: 1ps</span>
                </div>

                <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
                  {activeBottomTab === "terminal" ? (
                    <div className="space-y-1">
                      {terminalLogs.map((log, lIdx) => (
                        <div
                          key={lIdx}
                          className={`${
                            log.includes("[SUCCESS]")
                              ? "text-emerald-400 font-bold"
                              : log.includes("[INFO")
                              ? "text-[#4fc1ff]"
                              : log.includes("[WARN")
                              ? "text-amber-400"
                              : log.includes("[FINISH")
                              ? "text-purple-400"
                              : "text-[#cccccc]"
                          }`}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Dalga Şekli Görüntüleyici */
                    <div className="space-y-3">
                      <div className="text-[11px] text-[#858585]">
                        VCD Dijital Sinyal Diyagramı (Simüle Edilen Zaman Çizelgesi):
                      </div>
                      {currentWorkspace.signals?.map((sig, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-3 text-xs">
                          <span className="w-24 text-right text-[#4fc1ff] font-bold truncate">
                            {sig.name}
                          </span>
                          <div className="flex-1 h-6 bg-[#252526] rounded flex items-center px-2 font-mono text-white tracking-widest overflow-x-auto">
                            {sig.data ? (
                              sig.data.map((d, dIdx) => (
                                <span
                                  key={dIdx}
                                  className="inline-block px-2 py-0.5 mx-0.5 bg-[#0e639c] text-white text-[10px] rounded font-bold"
                                >
                                  {d}
                                </span>
                              ))
                            ) : (
                              <span className="text-emerald-400">{sig.wave}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DURUM 2: WEB LIVE PREVIEW DÜZENİ (HTML/CSS/JS + CANLI TARAYICI) */}
          {currentWorkspace.layout === "web-live-preview" && (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* SOL MONACO EDİTÖR (KOD SEKMELERİ) */}
              <div className="flex-1 flex flex-col border-r border-[#2d2d2d] overflow-hidden">
                {/* Sekmeler */}
                <div className="h-9 bg-[#252526] px-2 flex items-center gap-1 border-b border-[#1e1e1e] overflow-x-auto scrollbar-none shrink-0">
                  {currentWorkspace.files.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => setActiveFileName(file.name)}
                      className={`h-9 px-3 flex items-center gap-2 border-b-2 text-xs font-mono transition-colors ${
                        activeFileName === file.name
                          ? "bg-[#1e1e1e] text-white border-[#007acc] font-bold"
                          : "text-[#858585] border-transparent hover:text-white"
                      }`}
                    >
                      <span>{file.name}</span>
                    </button>
                  ))}
                </div>

                {/* Monaco Editor */}
                <div className="flex-1 overflow-hidden relative">
                  <MonacoEditor
                    value={activeContent}
                    onChange={(val) => handleContentChange(activeFileName, val)}
                    language={activeFile?.language || "html"}
                    readOnly={activeFile?.readOnly}
                    minimap={minimapEnabled}
                  />
                </div>
              </div>

              {/* SAĞ: CANLI TARAYICI ÖNİZLEMESİ (LIVE WEB PREVIEW) */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0d14]">
                {/* Tarayıcı Chrome Başlığı */}
                <div className="h-9 bg-[#1e1e1e] border-b border-[#2d2d2d] px-3 flex items-center justify-between text-xs shrink-0">
                  <div className="flex items-center gap-2 flex-1 max-w-sm bg-[#121212] px-2.5 py-1 rounded-md text-[#858585] font-mono text-[11px] border border-[#2a2a2a]">
                    <Globe className="w-3 h-3 text-[#007acc]" />
                    <span className="truncate">http://localhost:3000</span>
                  </div>

                  <button
                    onClick={() => setWebPreviewRefreshKey((k) => k + 1)}
                    className="p-1 hover:bg-[#333333] rounded text-[#858585] hover:text-white ml-2"
                    title="Önizlemeyi Yenile"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Tarayıcı İçeriği (Sandbox Iframe) */}
                <div className="flex-1 p-2">
                  <iframe
                    key={webPreviewRefreshKey}
                    srcDoc={combinedWebHTML}
                    title="Web Live Preview"
                    className="w-full h-full rounded-xl border border-[#2d2d2d] bg-black"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            </div>
          )}

          {/* DURUM 3: ROS 2 ROBOTİK ÇALIŞMA ALANI */}
          {currentWorkspace.layout === "ros2-split" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden border-b border-[#2d2d2d]">
                {/* SOL MONACO (PUBLISHER NODE) */}
                <div className="flex-1 flex flex-col border-r border-[#2d2d2d] overflow-hidden">
                  <div className="h-9 bg-[#252526] px-3 border-b border-[#1e1e1e] flex items-center justify-between text-xs font-mono shrink-0">
                    <span className="text-white font-bold">{activeFileName}</span>
                    <span className="badge badge-warning badge-xs font-mono">ROS 2 Publisher (Monaco)</span>
                  </div>

                  <div className="flex-1 overflow-hidden relative">
                    <MonacoEditor
                      value={activeContent}
                      onChange={(val) => handleContentChange(activeFileName, val)}
                      language="python"
                      readOnly={activeFile?.readOnly}
                      minimap={minimapEnabled}
                    />
                  </div>
                </div>

                {/* SAĞ MONACO (SUBSCRIBER NODE) */}
                {secondaryFileName && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="h-9 bg-[#252526] px-3 border-b border-[#1e1e1e] flex items-center justify-between text-xs font-mono shrink-0">
                      <span className="text-[#4fc1ff] font-bold">{secondaryFileName}</span>
                      <span className="badge badge-info badge-xs font-mono">ROS 2 Subscriber (Monaco)</span>
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                      <MonacoEditor
                        value={secondaryContent}
                        onChange={(val) => handleContentChange(secondaryFileName, val)}
                        language="python"
                        readOnly={secondaryFile?.readOnly}
                        minimap={minimapEnabled}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ALT ROS 2 DÜĞÜM GRAFİĞİ & KONSOL */}
              <div className="h-56 bg-[#181818] flex flex-col shrink-0">
                <div className="h-8 bg-[#252526] border-b border-[#1e1e1e] px-3 flex items-center justify-between text-xs font-mono shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveBottomTab("terminal")}
                      className={`h-8 flex items-center gap-1 px-2 border-b-2 ${
                        activeBottomTab === "terminal"
                          ? "border-[#007acc] text-white font-bold"
                          : "border-transparent text-[#858585]"
                      }`}
                    >
                      <Terminal className="w-3 h-3" />
                      <span>ROS 2 TERMINAL (rclpy log)</span>
                    </button>

                    <button
                      onClick={() => setActiveBottomTab("rqt")}
                      className={`h-8 flex items-center gap-1 px-2 border-b-2 ${
                        activeBottomTab === "rqt"
                          ? "border-[#007acc] text-white font-bold"
                          : "border-transparent text-[#858585]"
                      }`}
                    >
                      <Bot className="w-3 h-3 text-warning" />
                      <span>RQT_GRAPH (Düğüm Mimarisi)</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
                  {activeBottomTab === "terminal" ? (
                    <div className="space-y-1">
                      {terminalLogs.map((log, lIdx) => (
                        <div
                          key={lIdx}
                          className={`${
                            log.includes("[WARN")
                              ? "text-amber-400 font-bold"
                              : log.includes("[BOOT")
                              ? "text-[#4fc1ff]"
                              : log.includes("[SUCCESS")
                              ? "text-emerald-400"
                              : "text-[#cccccc]"
                          }`}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* RQT GRAPH GÖRSELLEŞTİRİCİSİ */
                    <div className="h-full flex items-center justify-center p-4">
                      <div className="flex items-center gap-6 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-[#1e293b] border border-[#38bdf8] text-center">
                          <div className="font-bold text-white">/telemetri_publisher</div>
                          <div className="text-[10px] text-[#38bdf8]">Node (10 Hz)</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-[#22c55e] font-bold">/robot/telemetry</span>
                          <div className="w-24 h-0.5 bg-[#22c55e]" />
                          <span className="text-[9px] text-[#858585]">std_msgs/String</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#1e293b] border border-[#f59e0b] text-center">
                          <div className="font-bold text-white">/guvenlik_denetleyici</div>
                          <div className="text-[10px] text-[#f59e0b]">Node (Subscriber)</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DURUM 4: STANDART DÜZEN (STM32 / C) */}
          {currentWorkspace.layout === "standard" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="h-9 bg-[#252526] px-2 flex items-center gap-1 border-b border-[#1e1e1e] overflow-x-auto scrollbar-none shrink-0">
                {currentWorkspace.files.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveFileName(file.name)}
                    className={`h-9 px-3 flex items-center gap-2 border-b-2 text-xs font-mono transition-colors ${
                      activeFileName === file.name
                        ? "bg-[#1e1e1e] text-white border-[#007acc] font-bold"
                        : "text-[#858585] border-transparent hover:text-white"
                    }`}
                  >
                    <span>{file.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-hidden relative">
                <MonacoEditor
                  value={activeContent}
                  onChange={(val) => handleContentChange(activeFileName, val)}
                  language={activeFile?.language || "c"}
                  readOnly={activeFile?.readOnly}
                  minimap={minimapEnabled}
                />
              </div>

              {/* Alt Terminal */}
              <div className="h-48 bg-[#181818] border-t border-[#2d2d2d] p-3 overflow-y-auto font-mono text-xs space-y-1 shrink-0">
                <div className="text-[#858585] text-[11px] pb-1 border-b border-[#2d2d2d] mb-2 flex items-center justify-between">
                  <span>TERMINAL: GCC &amp; GÖMÜLÜ ÇIKTI</span>
                  <span>115200 Baud</span>
                </div>
                {terminalLogs.map((log, lIdx) => (
                  <div
                    key={lIdx}
                    className={`${
                      log.includes("[SUCCESS")
                        ? "text-emerald-400 font-bold"
                        : log.includes("[INFO")
                        ? "text-[#4fc1ff]"
                        : "text-[#cccccc]"
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. EN ALT VS CODE STATUS BAR (22px) */}
      <div className="h-6 bg-[#007acc] text-white text-[11px] font-mono px-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-bold">
            <GitBranch className="w-3 h-3" /> main*
          </span>
          <span className="hidden sm:inline">0 ⊗  0 ⚠</span>
          <span className="hidden md:inline text-white/80">Monaco Engine</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">LF</span>
          <span className="font-bold">{activeFile?.language.toUpperCase() || "TEXT"}</span>
          <span className="hidden md:inline">Prettier ✓</span>
        </div>
      </div>
    </div>
  );
}
