export interface ProjectRecipe {
  id: string;
  title: string;
  category: "Robotik & ROS 2" | "FPGA & RTL" | "Gömülü IoT" | "Linux & SBC" | "Gömülü C & RTOS" | "Web & Donanım";
  difficulty: "Başlangıç" | "Orta" | "İleri Seviye";
  estimatedTime: string;
  image: string;
  tags: string[];
  summary: string;
  hardwareBOM: {
    item: string;
    count: string;
    note?: string;
  }[];
  wiring: {
    from: string;
    to: string;
    type: "Power" | "GND" | "Digital" | "I2C" | "SPI" | "Analog" | "UART" | "CAN";
  }[];
  sourceCode: {
    language: string;
    caption: string;
    code: string;
  };
  steps: {
    number: number;
    title: string;
    detail: string;
  }[];
  playgroundPresetId?: string;
}

export const PROJECT_RECIPES: ProjectRecipe[] = [
  // 1. ROS 2 OTONOM NAVİGASYON (NAV2 & LIDAR SLAM)
  {
    id: "ros2-autonomous-nav",
    title: "ROS 2 Humble: Nav2 & LiDAR SLAM ile Otonom Gezinim",
    category: "Robotik & ROS 2",
    difficulty: "İleri Seviye",
    estimatedTime: "5-7 Saat",
    image: "/images/projects/ros2-nav.svg",
    tags: ["ROS 2", "Nav2", "SLAM", "LiDAR", "Python", "Odometry"],
    playgroundPresetId: "ros2-nav",
    summary: "2D LiDAR sensörü ve diferansiyel tekerlek odometrisi kullanarak SLAM Toolbox ile mekanın haritasını çıkarma, Nav2 maliyet haritaları (Costmap) ve DWB lokal planlayıcı ile engellerden kaçarak hedef koordinata otonom gitme projesi.",
    hardwareBOM: [
      { item: "Raspberry Pi 5 (4GB/8GB) veya SBC", count: "1 Adet", note: "Ubuntu 22.04 LTS + ROS 2 Humble" },
      { item: "RPLiDAR A1M8 360° Lazer Tarayıcı", count: "1 Adet", note: "12m menzil, 5.5Hz tarama frekansı" },
      { item: "Diferansiyel Tahrikli Mobil Robot Şasisi", count: "1 Adet", note: "Enkoderli DC motorlar dahil" },
      { item: "3S 11.1V 2200mAh LiPo Batarya & Buck Regülatör", count: "1 Adet", note: "5V 5A sabit güç beslemesi" },
    ],
    wiring: [
      { from: "LiDAR USB", to: "Raspberry Pi USB 3.0", type: "UART" },
      { from: "Motor Sürücü PWM Sol", to: "RPi GPIO 18 (PWM0)", type: "Digital" },
      { from: "Motor Sürücü PWM Sağ", to: "RPi GPIO 19 (PWM1)", type: "Digital" },
      { from: "LiDAR / RPi Besleme", to: "5V Buck Regülatör Çıkışı", type: "Power" },
      { from: "Tüm Topraklar", to: "Ortak GND Hattı", type: "GND" },
    ],
    sourceCode: {
      language: "python",
      caption: "ROS 2 Nav2 Hedef Gönderme Düğümü (navigate_to_pose.py)",
      code: `import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult
from rclpy.duration import Duration

def main():
    rclpy.init()
    navigator = BasicNavigator()

    # Robotun Nav2 sisteminin hazır olmasını bekle
    navigator.waitUntilNav2Active()
    print("[INFO] Nav2 yığın mimarisi aktif! Hedef belirleniyor...")

    # Hedef Koordinat (X=2.5m, Y=1.2m, Yaw=0 rad)
    goal_pose = PoseStamped()
    goal_pose.header.frame_id = 'map'
    goal_pose.header.stamp = navigator.get_clock().now().to_msg()
    goal_pose.pose.position.x = 2.5
    goal_pose.pose.position.y = 1.2
    goal_pose.pose.orientation.w = 1.0

    # Nav2'ye rotayı başlat komutu ver
    navigator.goToPose(goal_pose)

    i = 0
    while not navigator.isTaskComplete():
        i += 1
        feedback = navigator.getFeedback()
        if feedback and i % 5 == 0:
            rem_dist = feedback.distance_remaining
            print(f"[@Nav2] Kalan Mesafe: {rem_dist:.2f} m | Süre: {feedback.navigation_time.sec} s")

    result = navigator.getResult()
    if result == TaskResult.SUCCEEDED:
        print("[SUCCESS] Robot hedef noktaya sıfır hata ile ulaştı!")
    else:
        print(f"[FAIL] Navigasyon tamamlanamadı. Kod: {result}")

    rclpy.shutdown()

if __name__ == '__main__':
    main()`,
    },
    steps: [
      {
        number: 1,
        title: "ROS 2 Humble & Nav2 Paketlerinin Kurulumu",
        detail: "Ubuntu 22.04 üzerinde 'sudo apt install ros-humble-navigation2 ros-humble-nav2-bringup ros-humble-slam-toolbox' komutlarıyla gerekli ekosistemi yükleyin.",
      },
      {
        number: 2,
        title: "URDF & TF Ağacı Yapılandırması",
        detail: "Robot şasisinin fiziksel boyutlarını 'base_link', tekerlekleri, 'odom' ve LiDAR sensörünün 'laser' transformasyonlarını robot_state_publisher ile yayınlayın.",
      },
      {
        number: 3,
        title: "SLAM ile Mekan Haritalama",
        detail: "Teleop klavye ile robotu manuel sürerek SLAM Toolbox yardımıyla 2D Occupancy Grid haritasını oluşturup 'map_saver_cli' ile kaydedin.",
      },
      {
        number: 4,
        title: "Otonom Rota Planlama & Çalıştırma",
        detail: "Nav2 yığınını haritayla başlatın, RViz2 arayüzünden veya Python betiğinden 2D Goal Pose vererek dinamik engel kaçınmalı navigasyonu gözlemleyin.",
      },
    ],
  },

  // 2. ROS 2 & MICRO-ROS DİFERANSİYEL ROBOT
  {
    id: "ros2-diff-drive",
    title: "Micro-ROS & ESP32: Diferansiyel Tahrikli Mobil Robot Sürücüsü",
    category: "Robotik & ROS 2",
    difficulty: "Orta",
    estimatedTime: "4-5 Saat",
    image: "/images/projects/ros2-diff-drive.svg",
    tags: ["micro-ROS", "ESP32", "PID", "Odometry", "FreeRTOS", "Robotics"],
    playgroundPresetId: "ros2-node",
    summary: "ESP32 mikrodenetleyicisi üzerinde Micro-ROS çalıştırarak `/cmd_vel` konusunu dinleme, donanımsal kuadratür enkoderleri 50Hz PID hız kontrol döngüsüne bağlama ve tekerlek odometrisini `/odom` konusu üzerinden ROS 2 ağına gerçek zamanlı aktarma.",
    hardwareBOM: [
      { item: "ESP32 DevKit V1 (30 Pin)", count: "1 Adet", note: "micro-ROS Agent ile seri/Wi-Fi köprü" },
      { item: "2 Adet 12V 330RPM Hall Effect Enkoderli DC Motor", count: "2 Adet", note: "11 PPR, 1:30 redüktör oranı" },
      { item: "L298N veya TB6612FNG Çift Motor Sürücü", count: "1 Adet", note: "H-Bridge motor sürücü kartı" },
      { item: "12V 2A Güç Kaynağı veya Li-Ion Pil Bloğu", count: "1 Adet" },
    ],
    wiring: [
      { from: "Motor Sürücü IN1 / IN2 (Sol)", to: "ESP32 GPIO 25, 26", type: "Digital" },
      { from: "Motor Sürücü IN3 / IN4 (Sağ)", to: "ESP32 GPIO 27, 14", type: "Digital" },
      { from: "Sol Enkoder A / B", to: "ESP32 GPIO 34, 35 (Giriş)", type: "Digital" },
      { from: "Sağ Enkoder A / B", to: "ESP32 GPIO 36, 39 (Giriş)", type: "Digital" },
      { from: "Motor Sürücü VCC & GND", to: "12V Pil & Ortak GND", type: "Power" },
    ],
    sourceCode: {
      language: "cpp",
      caption: "ESP32 micro-ROS Abone & Odometri Kodu (diff_drive_node.ino)",
      code: `#include <micro_ros_arduino.h>
#include <rcl/rcl.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>
#include <geometry_msgs/msg/twist.h>
#include <nav_msgs/msg/odometry.h>

rcl_subscription_t subscriber;
geometry_msgs__msg__Twist msg_cmd_vel;
rclc_executor_t executor;
rclc_support_t support;
rcl_allocator_t allocator;
rcl_node_t node;

// Hız komutu geldiğinde çağrılan Callback
void cmd_vel_callback(const void *msgin) {
  const geometry_msgs__msg__Twist *msg = (const geometry_msgs__msg__Twist *)msgin;
  float linear_x = msg->linear.x;   // İleri hız (m/s)
  float angular_z = msg->angular.z; // Dönüş hızı (rad/s)

  // Diferansiyel tekerlek hız formülü:
  // V_sol  = linear_x - (angular_z * TEKERLEK_MESAFESI / 2.0)
  // V_sag  = linear_x + (angular_z * TEKERLEK_MESAFESI / 2.0)
}

void setup() {
  set_microros_transports();
  allocator = rcl_get_default_allocator();

  rclc_support_init(&support, 0, NULL, &allocator);
  rclc_node_init_default(&node, "esp32_base_controller", "", &support);

  rclc_subscription_init_default(
    &subscriber,
    &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(geometry_msgs, msg, Twist),
    "/cmd_vel"
  );

  rclc_executor_init(&executor, &support.context, 1, &allocator);
  rclc_executor_add_subscription(&executor, &subscriber, &msg_cmd_vel, &cmd_vel_callback, ON_NEW_DATA);
}

void loop() {
  rclc_executor_spin_some(&executor, RCL_MS_TO_NS(10));
}`,
    },
    steps: [
      {
        number: 1,
        title: "micro-ROS Arduino Kütüphanesinin Eklenmesi",
        detail: "Arduino IDE veya PlatformIO ortamına micro_ros_arduino kütüphanesini ekleyin ve baud rate'i 115200 olarak seçin.",
      },
      {
        number: 2,
        title: "Enkoder Kesmeleri & PID Döngüsü",
        detail: "ESP32'nin donanımsal PCNT veya GPIO harici kesmelerini kullanarak tekerlek dönüş darbelerini kaçırmadan sayın.",
      },
      {
        number: 3,
        title: "micro-ROS Agent Başlatma",
        detail: "Ana bilgisayarda 'ros2 run micro_ros_agent micro_ros_agent serial --dev /dev/ttyUSB0 -b 115200' komutunu çalıştırarak köprüyü kurun.",
      },
      {
        number: 4,
        title: "Canlı Test ve Kontrol",
        detail: "'ros2 topic pub /cmd_vel geometry_msgs/msg/Twist ...' ile robota hareket komutu yollayın ve motorların tepkisini inceleyin.",
      },
    ],
  },

  // 3. FPGA SYSTEMVERILOG: DONANIMSAL UART ALICI/VERİCİ & FIFO
  {
    id: "fpga-uart-transceiver",
    title: "SystemVerilog: Donanımsal UART Transceiver & Ring FIFO Bellek",
    category: "FPGA & RTL",
    difficulty: "Orta",
    estimatedTime: "3-5 Saat",
    image: "/images/projects/fpga-uart.svg",
    tags: ["FPGA", "SystemVerilog", "UART", "FIFO", "Baud Gen", "Hardware"],
    playgroundPresetId: "uart-transceiver",
    summary: "İşlemci kullanmaksızın saf donanım lojiğiyle 115200 Baud UART alıcı (RX, 16x oversampling), verici (TX) ve veri kaybını önleyen 1024-byte dairesel Ring FIFO bellek mimarisini SystemVerilog ile sentezleme projesi.",
    hardwareBOM: [
      { item: "FPGA Geliştirme Kartı (Artix-7 Basys 3 veya Gowin GW1NR)", count: "1 Adet" },
      { item: "Dahili veya Harici USB-UART Köprüsü (FT2232 / CP2102)", count: "1 Adet" },
      { item: "USB Kablosu", count: "1 Adet" },
    ],
    wiring: [
      { from: "FPGA TX Pini (B18)", to: "FTDI RX Girişi", type: "UART" },
      { from: "FPGA RX Pini (A18)", to: "FTDI TX Çıkışı", type: "UART" },
      { from: "FPGA 100MHz Osilatör (W5)", to: "Dahili Saat Girişi", type: "Digital" },
      { from: "Dahili LED'ler (U16..V14)", to: "FIFO Durum Göstergesi", type: "Digital" },
    ],
    sourceCode: {
      language: "verilog",
      caption: "UART Alıcı Modülü (uart_rx.sv)",
      code: `// 16x Örneklemeli Donanımsal UART RX Alıcısı
module uart_rx #(
    parameter CLK_FREQ = 100_000_000,
    parameter BAUD_RATE = 115_200
)(
    input  logic       clk,
    input  logic       rst_n,
    input  logic       rx_in,
    output logic [7:0] data_out,
    output logic       data_valid
);
    localparam OVERSAMPLE = 16;
    localparam CLK_PER_SAMPLE = CLK_FREQ / (BAUD_RATE * OVERSAMPLE);

    typedef enum logic [1:0] { IDLE, START, DATA, STOP } state_t;
    state_t state;

    logic [15:0] clk_cnt;
    logic [3:0]  sample_cnt;
    logic [2:0]  bit_idx;
    logic [7:0]  rx_shift;

    always_ff @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            state      <= IDLE;
            clk_cnt    <= 0;
            sample_cnt <= 0;
            bit_idx    <= 0;
            data_valid <= 0;
            data_out   <= 0;
        end else begin
            data_valid <= 0;
            if (clk_cnt < CLK_PER_SAMPLE - 1) begin
                clk_cnt <= clk_cnt + 1;
            end else begin
                clk_cnt <= 0;
                sample_cnt <= sample_cnt + 1;

                case (state)
                    IDLE: begin
                        if (!rx_in) begin // Düşen kenar (Start biti)
                            state <= START;
                            sample_cnt <= 0;
                        end
                    end
                    START: begin
                        if (sample_cnt == 7) begin // Merkeze kilitle
                            if (!rx_in) begin
                                state <= DATA;
                                bit_idx <= 0;
                                sample_cnt <= 0;
                            end else state <= IDLE;
                        end
                    end
                    DATA: begin
                        if (sample_cnt == 15) begin
                            rx_shift[bit_idx] <= rx_in;
                            sample_cnt <= 0;
                            if (bit_idx == 7) state <= STOP;
                            else bit_idx <= bit_idx + 1;
                        end
                    end
                    STOP: begin
                        if (sample_cnt == 15) begin
                            data_out <= rx_shift;
                            data_valid <= 1;
                            state <= IDLE;
                        end
                    end
                endcase
            end
        end
    end
endmodule`,
    },
    steps: [
      {
        number: 1,
        title: "Baud Rate Zamanlayıcı Hesabı",
        detail: "100MHz sistem saati için 115200 baud ve 16x örnekleme çarpanına göre sayaç bölme katsayısını hesaplayın.",
      },
      {
        number: 2,
        title: "Merkez Örnekleme Mantığı",
        detail: "UART hattındaki gürültüyü yok etmek için her bitin tam orta noktasını (8. örnek) okuyan FSM durum makinesini kodlayın.",
      },
      {
        number: 3,
        title: "Çift Portlu Ring FIFO Entegrasyonu",
        detail: "Gelen baytları UART hızından daha yavaş tüketen işlemciler için taşmayı engelleyen 1KB FIFO tamponu ekleyin.",
      },
      {
        number: 4,
        title: "Seri Port Testi",
        detail: "Bilgisayardan terminal programı (Picocom/PuTTY) açarak klavyeden basılan karakterlerin döngüsel yankılandığını (Echo) test edin.",
      },
    ],
  },

  // 4. FPGA RISC-V RV32I ÇEKİRDEK TASARIMI
  {
    id: "fpga-riscv-rv32i",
    title: "SystemVerilog: Tek Çevrimli RISC-V RV32I İşlemci Çekirdeği",
    category: "FPGA & RTL",
    difficulty: "İleri Seviye",
    estimatedTime: "8-12 Saat",
    image: "/images/projects/fpga-riscv.svg",
    tags: ["RISC-V", "SystemVerilog", "CPU Architecture", "ALU", "Register File"],
    playgroundPresetId: "riscv-alu",
    summary: "Açık kaynak komut kümesi mimarisi RISC-V (RV32I Base) standardına uygun, 32 adet genel amaçlı yazmaç (x0-x31), Program Counter, Komut Çözücü, Aritmetik Mantık Birimi (ALU) ve Veri Belleği içeren tek çevrimli CPU çekirdeği.",
    hardwareBOM: [
      { item: "FPGA Geliştirme Kiti (Xilinx Artix-7 Basys 3)", count: "1 Adet" },
      { item: "Vivado Design Suite veya Yosys + NextPNR", count: "1 Takım" },
      { item: "RISC-V GNU Toolchain (riscv32-unknown-elf-gcc)", count: "1 Adet" },
    ],
    wiring: [
      { from: "FPGA Dahili Saat", to: "İşlemci CLK Girişi", type: "Digital" },
      { from: "Reset Butonu (Center Button)", to: "İşlemci RST_N", type: "Digital" },
      { from: "Register x1 Çıkışı", to: "Dahili 7-Segment Ekran", type: "Digital" },
    ],
    sourceCode: {
      language: "verilog",
      caption: "RISC-V Komut Çözücü & Yürütme Mantığı (rv32i_core.sv)",
      code: `// RISC-V RV32I Tek Çevrimli Çekirdek Özeti
module rv32i_core (
    input  logic        clk,
    input  logic        rst_n,
    output logic [31:0] pc_out,
    input  logic [31:0] instr,
    output logic [31:0] mem_addr,
    output logic [31:0] mem_wdata,
    input  logic [31:0] mem_rdata,
    output logic        mem_wen
);
    logic [31:0] pc, next_pc;
    logic [31:0] regfile [0:31];
    logic [31:0] rs1_data, rs2_data, alu_res, imm;
    logic [6:0]  opcode;
    logic [2:0]  funct3;
    logic [6:0]  funct7;
    logic [4:0]  rd, rs1, rs2;

    assign opcode = instr[6:0];
    assign rd     = instr[11:7];
    assign funct3 = instr[14:12];
    assign rs1    = instr[19:15];
    assign rs2    = instr[24:20];
    assign funct7 = instr[31:25];

    // x0 sabiti daima 0'dır
    assign rs1_data = (rs1 == 5'd0) ? 32'd0 : regfile[rs1];
    assign rs2_data = (rs2 == 5'd0) ? 32'd0 : regfile[rs2];

    // ALU İşlemleri
    always_comb begin
        case (opcode)
            7'b0110011: begin // R-Type (ADD, SUB, AND, OR, XOR)
                if (funct7 == 7'b0100000) alu_res = rs1_data - rs2_data; // SUB
                else alu_res = rs1_data + rs2_data; // ADD
            end
            7'b0010011: alu_res = rs1_data + imm; // I-Type (ADDI)
            default: alu_res = 32'd0;
        endcase
    end

    // Program Counter & Yazmaç Güncelleme
    always_ff @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            pc <= 32'h0000_0000;
        end else begin
            pc <= pc + 4;
            if (rd != 5'd0) regfile[rd] <= alu_res;
        end
    end

    assign pc_out = pc;
endmodule`,
    },
    steps: [
      {
        number: 1,
        title: "RISC-V ISA Komut Formatları",
        detail: "R, I, S, B, U, J formatlarının bit alanlarını belirleyip komut çözücü (Decoder) kombinasyonel bloğunu oluşturun.",
      },
      {
        number: 2,
        title: "Yazmaç Dosyası (Register File x0-x31)",
        detail: "2 okuma portu ve 1 yazma portuna sahip 32x32-bit yazmaç bloğunu kodlayın; x0 yazmacının daima sıfır kalmasını garanti edin.",
      },
      {
        number: 3,
        title: "ALU ve Dallanma Karşılaştırıcı",
        detail: "Toplama, mantıksal işlemler, kaydırma (SLL/SRL) ve BEQ/BNE koşullu dallanma karşılaştırıcılarını birleştirin.",
      },
      {
        number: 4,
        title: "C Kodunu Derleyip Çalıştırma",
        detail: "riscv32-unknown-elf-gcc ile derlediğiniz ikili makine kodunu FPGA ROM'una gömüp donanım üzerinde Fibonacci serisini çalıştırın.",
      },
    ],
  },

  // 5. RASPBERRY PI 5 & OPENCV NESNE TAKİP EDEN GİMBAL
  {
    id: "rpi-opencv-tracker",
    title: "Raspberry Pi 5 & OpenCV: Gerçek Zamanlı Nesne Takip Eden 2 Eksenli Gimbal",
    category: "Linux & SBC",
    difficulty: "Orta",
    estimatedTime: "3-4 Saat",
    image: "/images/projects/rpi-opencv.svg",
    tags: ["Raspberry Pi 5", "OpenCV", "Gimbal", "Computer Vision", "Python"],
    summary: "Raspberry Pi Kamera Modül 3 üzerinden 60 FPS video yakalama, HSV renk uzayında morfolojik filtreleme ile hedef nesneyi tespit etme ve iki adet servo motoru kapalı çevrim PID kontrol algoritmasıyla sürerek hedefi daima ekranda ortalama projesi.",
    hardwareBOM: [
      { item: "Raspberry Pi 5 (4GB)", count: "1 Adet", note: "Donanımsal ISP ve yüksek FPS" },
      { item: "Raspberry Pi Camera Module 3 (Autofocus)", count: "1 Adet", note: "CSI ribbon kablo ile" },
      { item: "2 Eksenli Pan/Tilt Servo Gimbal Kiti", count: "1 Adet", note: "SG90 veya MG90S metal dişli servolar" },
      { item: "PCA9685 I2C 16-Kanal PWM Sürücü Kartı", count: "1 Adet" },
    ],
    wiring: [
      { from: "PCA9685 VCC & GND", to: "RPi 5V & GND", type: "Power" },
      { from: "PCA9685 SDA", to: "RPi GPIO 2 (SDA1)", type: "I2C" },
      { from: "PCA9685 SCL", to: "RPi GPIO 3 (SCL1)", type: "I2C" },
      { from: "Pan Servo Sinyal", to: "PCA9685 Kanal 0", type: "Digital" },
      { from: "Tilt Servo Sinyal", to: "PCA9685 Kanal 1", type: "Digital" },
    ],
    sourceCode: {
      language: "python",
      caption: "OpenCV Renk Maskeleme ve PID Servo Takip Kodu (vision_tracker.py)",
      code: `import cv2
import numpy as np
import time

# Renk filtreleme sınırları (Örn: Parlak Sarı Top)
LOWER_COLOR = np.array([20, 100, 100])
UPPER_COLOR = np.array([35, 255, 255])

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# PID Katsayıları
Kp = 0.05
center_x = 320
center_y = 240

print("[INFO] Kamera akışı başlatıldı. 'q' ile çıkın.")

while True:
    ret, frame = cap.read()
    if not ret: break

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, LOWER_COLOR, UPPER_COLOR)
    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if contours:
        c = max(contours, key=cv2.contourArea)
        ((x, y), radius) = cv2.minEnclosingCircle(c)

        if radius > 15:
            # Hedefin merkezden sapma hatası
            error_x = x - center_x
            error_y = y - center_y

            cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 0), 2)
            cv2.putText(frame, f"Hata: X:{int(error_x)} Y:{int(error_y)}", (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    cv2.imshow("Tracking HUD", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break

cap.release()
cv2.destroyAllWindows()`,
    },
    steps: [
      {
        number: 1,
        title: "Kamera Modülü ve OpenCV Kurulumu",
        detail: "Raspberry Pi OS Bookworm üzerinde 'libcamera' ve 'python3-opencv' paketlerini yapılandırıp kamera akışını test edin.",
      },
      {
        number: 2,
        title: "Pan/Tilt Gimbal Montajı",
        detail: "İki adet servo motoru X ve Y eksenlerini oluşturacak şekilde mekanik şasiye monte edin ve PCA9685 kartına bağlayın.",
      },
      {
        number: 3,
        title: "Renk Eşikleme (HSV Thresholding)",
        detail: "Hedef nesnenin aydınlatma değişimlerinden etkilenmemesi için HSV renk aralıklarını trackbar ile kalibre edin.",
      },
      {
        number: 4,
        title: "Kapalı Çevrim Takip Testi",
        detail: "Kodu çalıştırın; nesneyi hareket ettirdikçe kameranın nesneyi otomatik olarak odak noktasında tuttuğunu gözlemleyin.",
      },
    ],
  },

  // 6. STM32 OTOMOTİV CAN BUS TELEMETRİ AĞI
  {
    id: "stm32-can-telemetry",
    title: "STM32 & CAN Bus: Otomotiv Sınıfı Diferansiyel Veri Telemetrisi",
    category: "Gömülü C & RTOS",
    difficulty: "İleri Seviye",
    estimatedTime: "4-5 Saat",
    image: "/images/projects/stm32-can.svg",
    tags: ["STM32", "CAN Bus", "ISO 11898", "Automotive", "Telemetry"],
    summary: "Otomotiv endüstrisi standardı Controller Area Network (CAN 2.0B) protokolü üzerinden iki bağımsız STM32 mikrodenetleyicisi arasında 500 kbps hızında motor devri, sıcaklık ve hata bayraklarını çarpışmasız (Arbitration) güvenle aktarma projesi.",
    hardwareBOM: [
      { item: "STM32F103C8T6 (Blue Pill) veya Nucleo Kart", count: "2 Adet" },
      { item: "TJA1050 veya MCP2551 CAN Alıcı/Verici (Transceiver)", count: "2 Adet" },
      { item: "120 Ohm Hat Sonlandırma Direnci", count: "2 Adet", note: "CAN_H ve CAN_L uçları arasına" },
      { item: "ST-Link V2 Programlayıcı", count: "1 Adet" },
    ],
    wiring: [
      { from: "STM32 PB9 (CAN_TX)", to: "TJA1050 TXD Pini", type: "CAN" },
      { from: "STM32 PB8 (CAN_RX)", to: "TJA1050 RXD Pini", type: "CAN" },
      { from: "TJA1050 CANH", to: "Ortak Hat CAN_High (120Ω ile)", type: "CAN" },
      { from: "TJA1050 CANL", to: "Ortak Hat CAN_Low (120Ω ile)", type: "CAN" },
      { from: "Transceiver VCC & GND", to: "5V ve Ortak GND", type: "Power" },
    ],
    sourceCode: {
      language: "c",
      caption: "STM32 CAN Mesaj Gönderme Fonksiyonu (can_bus.c)",
      code: `#include "stm32f1xx_hal.h"

extern CAN_HandleTypeDef hcan;

// 500 kbps CAN Mesaj Paketi Gönderme
HAL_StatusTypeDef CAN_Send_Motor_Telemetry(uint16_t rpm, int8_t coolant_temp) {
    CAN_TxHeaderTypeDef txHeader;
    uint8_t txData[8];
    uint32_t txMailbox;

    txHeader.StdId = 0x1A4;        // 11-Bit Standart Tanımlayıcı (ECU Telemetry)
    txHeader.ExtId = 0x00;
    txHeader.RTR = CAN_RTR_DATA;   // Veri Çerçevesi
    txHeader.IDE = CAN_ID_STD;     // Standart ID
    txHeader.DLC = 8;              // 8 Bayt Veri
    txHeader.TransmitGlobalTime = DISABLE;

    // Veri Paketleme
    txData[0] = (uint8_t)(rpm >> 8);   // RPM Yüksek Bayt
    txData[1] = (uint8_t)(rpm & 0xFF); // RPM Düşük Bayt
    txData[2] = (uint8_t)coolant_temp; // Sıcaklık
    txData[3] = 0x00;                  // Hata Kodu
    txData[4] = 0xAA;                  // Güvenlik Sayacı
    txData[5] = 0x00;
    txData[6] = 0x00;
    txData[7] = 0x55;

    // Uygun bir posta kutusuna (Mailbox) mesajı ekle
    return HAL_CAN_AddTxMessage(&hcan, &txHeader, txData, &txMailbox);
}`,
    },
    steps: [
      {
        number: 1,
        title: "STM32CubeMX bxCAN Yapılandırması",
        detail: "CAN zamanlama parametrelerini (Prescaler, BS1, BS2) 500 kbps ve %87.5 örnekleme noktasına denk gelecek şekilde ayarlayın.",
      },
      {
        number: 2,
        title: "Diferansiyel Hat ve 120Ω Sonlandırma",
        detail: "TJA1050 transreceiver modüllerinin CAN_H ve CAN_L bacakları arasına sinyal yansımasını engelleyen 120 Ohm sonlandırma dirençlerini bağlayın.",
      },
      {
        number: 3,
        title: "Filtreleme Maskeleri (CAN Filters)",
        detail: "İşlemcinin gereksiz mesajlarla kesilmesini önlemek için 0x1A4 ID'sini süzen 16-bit donanımsal kabul filtresi tanımlayın.",
      },
      {
        number: 4,
        title: "İletişim ve Osiloskop Doğrulaması",
        detail: "Her iki kartı enerjilendirin; diferansiyel sinyal seviyelerinin (CAN_H=3.5V, CAN_L=1.5V) doğru oluştuğunu ve verinin kayıpsız aktığını doğrulayın.",
      },
    ],
  },

  // 7. ESP32 BLE MESH AKILLI AĞ
  {
    id: "esp32-ble-mesh",
    title: "ESP32: Bluetooth LE Mesh Akıllı Ev Röle & Sensör Ağı",
    category: "Gömülü IoT",
    difficulty: "Orta",
    estimatedTime: "3-4 Saat",
    image: "/images/projects/esp32-ble-mesh.svg",
    tags: ["ESP32", "BLE Mesh", "Smart Home", "Bluetooth LE", "IoT"],
    summary: "Wi-Fi yönlendiriciye ihtiyaç duymadan, çoklu ESP32 düğümlerinin birbirleri üzerinden paketleri atlatarak (Multi-Hop Flooding) yüzlerce metre mesafeye ışık ve sensör komutlarını ulaştırdığı standart SIG BLE Mesh ağı kurma projesi.",
    hardwareBOM: [
      { item: "ESP32 Geliştirme Kartı (WROOM-32)", count: "3 Adet", note: "1 Provisioner, 2 Relay Düğümü" },
      { item: "Röle Modülü (5V Optokuplörlü)", count: "2 Adet" },
      { item: "PIR Hareket Sensörü (HC-SR501)", count: "1 Adet" },
      { item: "Akıllı Telefon (nRF Mesh Uygulaması ile)", count: "1 Adet" },
    ],
    wiring: [
      { from: "Röle 1 IN", to: "ESP32 #1 GPIO 18", type: "Digital" },
      { from: "Röle 2 IN", to: "ESP32 #2 GPIO 19", type: "Digital" },
      { from: "PIR Sensör OUT", to: "ESP32 #3 GPIO 4", type: "Digital" },
      { from: "Tüm Modüller VCC", to: "Ortak 5V", type: "Power" },
      { from: "Tüm Modüller GND", to: "Ortak GND", type: "GND" },
    ],
    sourceCode: {
      language: "c",
      caption: "ESP-IDF BLE Mesh Sunucu Modeli (ble_mesh_node.c)",
      code: `#include "esp_ble_mesh_defs.h"
#include "esp_ble_mesh_common_api.h"
#include "esp_ble_mesh_networking_api.h"

// Standart Generic OnOff Sunucu Durumu
static esp_ble_mesh_gen_onoff_srv_t onoff_server = {
    .rsp_ctrl.get_rsp_type = ESP_BLE_MESH_SERVER_RSP_BY_APP,
    .rsp_ctrl.set_rsp_type = ESP_BLE_MESH_SERVER_RSP_BY_APP,
};

static void ble_mesh_generic_server_cb(esp_ble_mesh_generic_server_cb_event_t event,
                                       esp_ble_mesh_generic_server_cb_param_t *param) {
    if (event == ESP_BLE_MESH_GENERIC_SERVER_STATE_CHANGE_EVT) {
        if (param->ctx.recv_op == ESP_BLE_MESH_MODEL_OP_GEN_ONOFF_SET) {
            uint8_t target_state = param->value.state_change.onoff_set.onoff;
            gpio_set_level(GPIO_NUM_18, target_state);
            printf("[MESH] Düğüm Durumu Güncellendi: %s\\n", target_state ? "ACIK (1)" : "KAPALI (0)");
        }
    }
}`,
    },
    steps: [
      {
        number: 1,
        title: "ESP-IDF BLE Mesh Bileşenlerinin Yapılandırması",
        detail: "menuconfig üzerinden Bluetooth Controller ve BLE Mesh özelliklerini açıp Relay/Proxy rollerini etkinleştirin.",
      },
      {
        number: 2,
        title: "Generic OnOff Model Tanımlaması",
        detail: "Bluetooth SIG standardı Generic OnOff Server ve Client modellerini ESP32 cihazlarına tanımlayın.",
      },
      {
        number: 3,
        title: "Provisioning & Anahtar Dağıtımı",
        detail: "Nordic 'nRF Mesh' mobil uygulamasıyla yayın yapan ESP32 düğümlerini tarayıp ağa dahil edin (Provision) ve grup adresleri atayın.",
      },
      {
        number: 4,
        title: "Multi-Hop Atlama Doğrulaması",
        detail: "Birinci cihazın kapsama alanı dışındaki üçüncü cihaza komut gönderildiğinde ortadaki ESP32'nin paketi başarıyla ilettiğini doğrulayın.",
      },
    ],
  },

  // 8. ESP32 & OLED HAVA DURUMU İSTASYONU
  {
    id: "esp32-weather-station",
    title: "ESP32 & OLED Web Tabanlı Hava Durumu İstasyonu",
    category: "Gömülü IoT",
    difficulty: "Başlangıç",
    estimatedTime: "2-3 Saat",
    image: "/images/projects/esp32-weather.svg",
    tags: ["ESP32", "OLED", "I2C", "Wi-Fi", "REST API", "JSON"],
    playgroundPresetId: "arduino-blink",
    summary: "ESP32'nin dahili Wi-Fi antenini kullanarak OpenWeatherMap REST API'sine HTTP GET isteği atma, JSON verisini ayrıştırma ve I2C SSD1306 0.96 inç OLED ekranda anlık sıcaklık/nem grafiği çizdirme projesi.",
    hardwareBOM: [
      { item: "ESP32 DevKit V1 (WROOM-32)", count: "1 Adet", note: "30-pin veya 36-pin versiyon" },
      { item: "0.96\" I2C OLED Ekran (SSD1306, 128x64)", count: "1 Adet", note: "I2C adres: 0x3C" },
      { item: "DHT22 veya DHT11 Sıcaklık/Nem Sensörü", count: "1 Adet", note: "10k pull-up direnci ile" },
      { item: "Breadboard & Jumper Kablolar", count: "1 Takım" },
    ],
    wiring: [
      { from: "OLED VCC", to: "ESP32 3V3", type: "Power" },
      { from: "OLED GND", to: "ESP32 GND", type: "GND" },
      { from: "OLED SCL", to: "ESP32 GPIO 22", type: "I2C" },
      { from: "OLED SDA", to: "ESP32 GPIO 21", type: "I2C" },
      { from: "DHT22 DATA", to: "ESP32 GPIO 4", type: "Digital" },
      { from: "DHT22 VCC", to: "ESP32 3V3", type: "Power" },
      { from: "DHT22 GND", to: "ESP32 GND", type: "GND" },
    ],
    sourceCode: {
      language: "cpp",
      caption: "ESP32 Arduino C++ Kodu (WeatherStation.ino)",
      code: `#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

const char* ssid = "WIFI_ADINIZ";
const char* password = "WIFI_SIFRENIZ";
const String apiKey = "OPENWEATHER_API_KEY";
const String city = "Istanbul,TR";

Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // SDA=21, SCL=22
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextColor(WHITE);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;
    http.begin(url);
    int httpCode = http.GET();

    if (httpCode == 200) {
      String payload = http.getString();
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);

      float temp = doc["main"]["temp"];
      int humidity = doc["main"]["humidity"];

      display.clearDisplay();
      display.setTextSize(1);
      display.setCursor(0, 5);
      display.println("learn.tncy.dev Weather");
      display.setTextSize(2);
      display.setCursor(0, 25);
      display.printf("%.1f C\\n", temp);
      display.setTextSize(1);
      display.printf("Nem: %%%d\\n", humidity);
      display.display();
    }
    http.end();
  }
  delay(60000); // 1 dakikada bir güncelle
}`,
    },
    steps: [
      {
        number: 1,
        title: "Devre Bağlantısı",
        detail: "OLED ekranın I2C bacaklarını ESP32'nin donanımsal I2C pinlerine bağlayın (GPIO 21 SDA, GPIO 22 SCL). DHT sensörünü GPIO 4'e bağlayın.",
      },
      {
        number: 2,
        title: "Kütüphanelerin Kurulumu",
        detail: "arduino-cli veya Arduino IDE kütüphane yöneticisinden 'Adafruit SSD1306', 'Adafruit GFX' ve 'ArduinoJson' paketlerini yükleyin.",
      },
      {
        number: 3,
        title: "API Anahtarı ve Wi-Fi Bilgileri",
        detail: "OpenWeatherMap üzerinden ücretsiz bir API anahtarı alın ve Wi-Fi bilgilerinizle birlikte kodun başına ekleyin.",
      },
      {
        number: 4,
        title: "Flashlama & Çalıştırma",
        detail: "Kodu ESP32'ye yükleyin. Ekran üzerinde sıcaklık ve nem değerlerinin canlı aktığını gözlemleyin.",
      },
    ],
  },

  // 9. FPGA SYSTEMVERILOG: VGA PONG OYUNU
  {
    id: "fpga-vga-pong",
    title: "FPGA & SystemVerilog: Donanımsal VGA Pong Video Oyunu",
    category: "FPGA & RTL",
    difficulty: "İleri Seviye",
    estimatedTime: "4-6 Saat",
    image: "/images/projects/fpga-pong.svg",
    tags: ["FPGA", "SystemVerilog", "VGA", "Basys 3", "RTL", "Timing"],
    playgroundPresetId: "vga-sync",
    summary: "İşlemci veya yazılım katmanı olmadan, sadece SystemVerilog RTL donanım bloklarıyla 640x480 @ 60Hz VGA zamanlama sinyali üretme, top fiziği, raket hareketi ve piksel çarpışma algoritmalarını doğrudan silikonda koşturma projesi.",
    hardwareBOM: [
      { item: "Digilent Basys 3 (Xilinx Artix-7) veya DE10-Lite", count: "1 Adet" },
      { item: "VGA Girişli Standart Monitör", count: "1 Adet" },
      { item: "VGA Kablosu", count: "1 Adet" },
    ],
    wiring: [
      { from: "FPGA VGA Port (12-bit R, G, B)", to: "Monitör VGA Girişi", type: "Digital" },
      { from: "FPGA H-Sync (J19)", to: "VGA Pin 13", type: "Digital" },
      { from: "FPGA V-Sync (J18)", to: "VGA Pin 14", type: "Digital" },
      { from: "Dahili Butonlar (U18, T18, W19, T17)", to: "Raket Yukarı/Aşağı Kontrolü", type: "Digital" },
    ],
    sourceCode: {
      language: "verilog",
      caption: "VGA Zamanlama Üreteci (vga_sync.sv)",
      code: `// 640x480 @ 60Hz Zamanlama Parametreleri (25.175 MHz Piksel Saati)
module vga_sync (
    input  logic clk_25mhz,
    input  logic reset_n,
    output logic hsync,
    output logic vsync,
    output logic video_on,
    output logic [9:0] pixel_x,
    output logic [9:0] pixel_y
);
    localparam HD = 640, HF = 16, HB = 48, HR = 96;  // Yatay
    localparam VD = 480, VF = 10, VB = 33, VR = 2;   // Dikey

    logic [9:0] h_count, v_count;

    always_ff @(posedge clk_25mhz or negedge reset_n) begin
        if (!reset_n) begin
            h_count <= 0;
            v_count <= 0;
        end else begin
            if (h_count == (HD + HF + HB + HR - 1)) begin
                h_count <= 0;
                if (v_count == (VD + VF + VB + VR - 1))
                    v_count <= 0;
                else
                    v_count <= v_count + 1;
            end else
                h_count <= h_count + 1;
        end
    end

    assign hsync = ~(h_count >= (HD + HF) && h_count < (HD + HF + HR));
    assign vsync = ~(v_count >= (VD + VF) && v_count < (VD + VF + VR));
    assign video_on = (h_count < HD) && (v_count < VD);
    assign pixel_x = h_count;
    assign pixel_y = v_count;
endmodule`,
    },
    steps: [
      {
        number: 1,
        title: "Piksel Saati (Pixel Clock) Üretimi",
        detail: "Basys 3 üzerindeki 100MHz ana osilatörü Vivado Clocking Wizard kullanarak 25MHz piksel saatine bölün.",
      },
      {
        number: 2,
        title: "VGA Senkronizasyon Modülü",
        detail: "H-Sync ve V-Sync zamanlama sayaçlarını SystemVerilog always_ff bloğuyla yazın.",
      },
      {
        number: 3,
        title: "Top Fiziği & Çarpışma Bloğu",
        detail: "Topun X ve Y koordinat sayaçlarını her dikey yenileme (V-Sync) darbesinde delta_x ve delta_y kadar artırıp raket sınırlarında ters çevirin.",
      },
      {
        number: 4,
        title: "Bitstream Sentezi ve Yükleme",
        detail: "Vivado'da sentez ve implementation adımlarını tamamlayıp bitstream'i (.bit) FPGA çipine yazın ve monitörde Pong oyununun başladığını görün.",
      },
    ],
  },

  // 10. RASPBERRY PI PI-HOLE REKLAM ENGELLEYİCİ
  {
    id: "rpi-pihole-dns",
    title: "Raspberry Pi ile Ağ Genelinde DNS Reklam Engelleyici (Pi-Hole)",
    category: "Linux & SBC",
    difficulty: "Başlangıç",
    estimatedTime: "1 Saat",
    image: "/images/projects/rpi-pihole.svg",
    tags: ["Raspberry Pi", "DNS", "Pi-Hole", "Docker", "Linux", "Networking"],
    summary: "Evinizdeki veya ofisinizdeki tüm telefon, tablet, TV ve bilgisayarlardaki reklamları ve takipçileri işletim sistemi düzeyinde filtreleyen, yerel DNS önbelleği sunan bağımsız Pi-Hole sunucusu kurma projesi.",
    hardwareBOM: [
      { item: "Raspberry Pi (Zero 2W, 3B, 4 veya 5)", count: "1 Adet" },
      { item: "MicroSD Kart (16GB+)", count: "1 Adet" },
      { item: "Ethernet Kablosu veya Wi-Fi Bağlantısı", count: "1 Adet" },
      { item: "5V Güç Adaptörü", count: "1 Adet" },
    ],
    wiring: [
      { from: "Raspberry Pi Ethernet", to: "Ev Modemi / Router LAN Portu", type: "Digital" },
      { from: "Micro-USB / USB-C", to: "5V Güç Beslemesi", type: "Power" },
    ],
    sourceCode: {
      language: "bash",
      caption: "Pi-Hole Hızlı Kurulum & Docker Compose (docker-compose.yml)",
      code: `services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "67:67/udp"
      - "80:80/tcp"
    environment:
      TZ: 'Europe/Istanbul'
      WEBPASSWORD: 'GucluBirSifre123'
    volumes:
      - './etc-pihole:/etc/pihole'
      - './etc-dnsmasq.d:/etc/dnsmasq.d'
    restart: unless-stopped`,
    },
    steps: [
      {
        number: 1,
        title: "Statik IP Ataması",
        detail: "Raspberry Pi'nin yerel ağ IP adresini (örn: 192.168.1.50) modem arayüzünden rezerve edin.",
      },
      {
        number: 2,
        title: "Docker veya Doğrudan Kurulum",
        detail: "Terminal üzerinden 'curl -sSL https://install.pi-hole.net | bash' komutunu veya Docker Compose dosyasını çalıştırın.",
      },
      {
        number: 3,
        title: "Modem DNS Yönlendirmesi",
        detail: "Modem ayarlarınızdaki birincil DNS sunucu adresini Raspberry Pi'nizin IP adresi olarak kaydedin.",
      },
      {
        number: 4,
        title: "Yönetim Paneli",
        detail: "http://192.168.1.50/admin adresinden engellenen sorguları, kara listeleri ve ağ trafiğini canlı grafiklerle takip edin.",
      },
    ],
  },

  // 11. STM32 FREERTOS ÇOKLU GÖREV YÖNETİCİSİ
  {
    id: "stm32-freertos-hub",
    title: "STM32 & FreeRTOS: Gerçek Zamanlı Çoklu Görev (Multitasking) & Sensör Hub",
    category: "Gömülü C & RTOS",
    difficulty: "Orta",
    estimatedTime: "3-4 Saat",
    image: "/images/projects/stm32-rtos.svg",
    tags: ["STM32", "FreeRTOS", "ARM Cortex", "Queues", "Mutex", "C"],
    playgroundPresetId: "stm32-freertos",
    summary: "Gömülü C dilinde 'delay()' komutunun işlemciyi kilitlemesini önleyen, öncelikli görev planlayıcı (Preemptive Scheduler), kuyruklar (Queue) ve Mutex mekanizmalarıyla eşzamanlı sensör okuma ve UART veri aktarımı projesi.",
    hardwareBOM: [
      { item: "STM32F103C8T6 (Blue Pill) veya Nucleo-F401RE", count: "1 Adet" },
      { item: "ST-Link V2 Programlayıcı", count: "1 Adet" },
      { item: "I2C Sensör (BMP280 veya MPU6050)", count: "1 Adet" },
      { item: "USB-TTL Seri Dönüştürücü (CH340/CP2102)", count: "1 Adet" },
    ],
    wiring: [
      { from: "ST-Link SWDIO", to: "STM32 SWDIO (PA13)", type: "Digital" },
      { from: "ST-Link SWCLK", to: "STM32 SWCLK (PA14)", type: "Digital" },
      { from: "ST-Link 3.3V & GND", to: "STM32 3V3 & GND", type: "Power" },
      { from: "Sensör I2C SCL", to: "STM32 PB6", type: "I2C" },
      { from: "Sensör I2C SDA", to: "STM32 PB7", type: "I2C" },
      { from: "USB-TTL RX", to: "STM32 PA9 (TX1)", type: "Digital" },
    ],
    sourceCode: {
      language: "c",
      caption: "STM32 FreeRTOS Görevleri (main.c)",
      code: `#include "main.h"
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
        HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13); // PC13 Dahili LED
        osDelay(500); // RTOS beklemesi (CPU boşa çıkar)
    }
}

void StartTaskSensor(void *argument) {
    SensorData_t data;
    for(;;) {
        // Sensörden veri oku (simüle)
        data.temperature = 24.5f;
        data.timestamp = osKernelGetTickCount();

        // Veriyi kuyruğa at (Queue)
        osMessageQueuePut(sensorQueueHandle, &data, 0U, 0U);
        osDelay(1000); // 1 Hz okuma periyodu
    }
}

int main(void) {
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();

    osKernelInitialize();
    sensorQueueHandle = osMessageQueueNew(16, sizeof(SensorData_t), NULL);

    const osThreadAttr_t led_attr = { .name = "TaskLed", .priority = (osPriority_t) osPriorityLow };
    taskLedHandle = osThreadNew(StartTaskLed, NULL, &led_attr);

    const osThreadAttr_t sensor_attr = { .name = "TaskSensor", .priority = (osPriority_t) osPriorityNormal };
    taskSensorHandle = osThreadNew(StartTaskSensor, NULL, &sensor_attr);

    osKernelStart();
    while (1) {}
}`,
    },
    steps: [
      {
        number: 1,
        title: "STM32CubeMX / FreeRTOS Yapılandırması",
        detail: "SysTick yerine TIM4'ü HAL timebase kaynağı olarak seçin; FreeRTOS CMSIS-V2 katmanını aktif edin.",
      },
      {
        number: 2,
        title: "Görev ve Kuyruk Tanımlamaları",
        detail: "İki bağımsız iş parçacığı (LED ve Sensör) ile aralarındaki veri paylaşımı için FreeRTOS kuyruğu oluşturun.",
      },
      {
        number: 3,
        title: "Öncelik (Priority) Dağıtımı",
        detail: "Zamana duyarlı sensör görevine normal öncelik, LED blink görevine düşük öncelik atayın.",
      },
      {
        number: 4,
        title: "ST-Link ile Flashlama",
        detail: "OpenOCD veya STM32CubeProgrammer ile kodu mikrodenetleyiciye flashlayın ve sıfır donmayla çalıştığını doğrulayın.",
      },
    ],
  },

  // 12. WEB SERIAL API İLE TARAYICI-DONANIM KONTROLCÜSÜ
  {
    id: "web-serial-controller",
    title: "Web Serial API ile Tarayıcıdan Donanım Kontrolü (Chrome to Arduino)",
    category: "Web & Donanım",
    difficulty: "Başlangıç",
    estimatedTime: "1-2 Saat",
    image: "/images/projects/web-serial.svg",
    tags: ["Web Serial API", "JavaScript", "Arduino", "Chrome", "Serial"],
    playgroundPresetId: "web-preview",
    summary: "Hiçbir masaüstü sürücüsü veya yerel sunucu kurmadan, doğrudan Google Chrome / Edge tarayıcısından Web Serial API kullanarak Arduino veya ESP32 seri portuna bağlanma ve tarayıcıdaki butonlarla donanımı kontrol etme projesi.",
    hardwareBOM: [
      { item: "Arduino Uno / Nano veya ESP32", count: "1 Adet" },
      { item: "USB Kablosu", count: "1 Adet" },
      { item: "1 Adet LED ve 220 Ohm Direnç", count: "1 Adet" },
    ],
    wiring: [
      { from: "LED Anot (+)", to: "Arduino Pin 13 (220 Ohm dirençle)", type: "Digital" },
      { from: "LED Katot (-)", to: "Arduino GND", type: "GND" },
    ],
    sourceCode: {
      language: "javascript",
      caption: "Tarayıcı JavaScript Kodu (serial_app.js)",
      code: `// Web Serial API: Tarayıcıdan Seri Porta Bağlanma
let port;
let writer;

async function connectSerial() {
    try {
        // Kullanıcıdan USB port seçimi iste
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });

        const textEncoder = new TextEncoderStream();
        const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        writer = textEncoder.writable.getWriter();
        alert("Seri porta başarıyla bağlanıldı!");
    } catch (err) {
        console.error("Bağlantı hatası:", err);
    }
}

async function sendCommand(cmd) {
    if (writer) {
        await writer.write(cmd + "\\n");
    } else {
        alert("Önce 'Porta Bağlan' butonuna tıklamalısınız.");
    }
}`,
    },
    steps: [
      {
        number: 1,
        title: "Arduino Alıcı Kodunun Yüklenmesi",
        detail: "Arduino'ya Seri porttan 'LED_ON' ve 'LED_OFF' komutlarını dinleyen standart Serial.readStringUntil('\\n') kodunu yükleyin.",
      },
      {
        number: 2,
        title: "HTML / JS Arayüzünün Hazırlanması",
        detail: "Tek bir HTML sayfasına 'Porta Bağlan', 'Aç' ve 'Kapat' butonları ekleyin.",
      },
      {
        number: 3,
        title: "Web Serial İzni",
        detail: "Sayfayı HTTPS (veya localhost) üzerinden açıp 'Porta Bağlan' butonuna tıkladığınızda açılan pencereden bağlı kartınızı seçin.",
      },
      {
        number: 4,
        title: "Canlı Donanım Kontrolü",
        detail: "Tarayıcıdaki butonlara tıkladığınızda masaüstünüzdeki fiziksel LED'in anında açılıp kapandığını deneyimleyin.",
      },
    ],
  },
];
