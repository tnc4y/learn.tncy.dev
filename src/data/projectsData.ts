export interface ProjectRecipe {
  id: string;
  title: string;
  category: "Gömülü IoT" | "FPGA & RTL" | "Linux & SBC" | "Gömülü C & RTOS" | "Web & Donanım";
  difficulty: "Başlangıç" | "Orta" | "İleri Seviye";
  estimatedTime: string;
  summary: string;
  hardwareBOM: {
    item: string;
    count: string;
    note?: string;
  }[];
  wiring: {
    from: string;
    to: string;
    type: "Power" | "GND" | "Digital" | "I2C" | "SPI" | "Analog";
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
}

export const PROJECT_RECIPES: ProjectRecipe[] = [
  // 1. ESP32 & OLED HAVA DURUMU İSTASYONU
  {
    id: "esp32-weather-station",
    title: "ESP32 & OLED Web Tabanlı Hava Durumu İstasyonu",
    category: "Gömülü IoT",
    difficulty: "Başlangıç",
    estimatedTime: "2-3 Saat",
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

  // 2. FPGA SYSTEMVERILOG: VGA PONG OYUNU
  {
    id: "fpga-vga-pong",
    title: "FPGA & SystemVerilog: Donanımsal VGA Pong Video Oyunu",
    category: "FPGA & RTL",
    difficulty: "İleri Seviye",
    estimatedTime: "4-6 Saat",
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

  // 3. RASPBERRY PI PI-HOLE REKLAM ENGELLEYİCİ
  {
    id: "rpi-pihole-dns",
    title: "Raspberry Pi ile Tüm Ağ İçin Donanımsal DNS Reklam Engelleyici (Pi-Hole)",
    category: "Linux & SBC",
    difficulty: "Başlangıç",
    estimatedTime: "1 Saat",
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

  // 4. STM32 FREERTOS ÇOKLU GÖREV YÖNETİCİSİ
  {
    id: "stm32-freertos-hub",
    title: "STM32 & FreeRTOS: Gerçek Zamanlı Çoklu Görev (Multitasking) & Sensör Hub",
    category: "Gömülü C & RTOS",
    difficulty: "Orta",
    estimatedTime: "3-4 Saat",
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

  // 5. WEB SERIAL API İLE TARAYICI-DONANIM KONTROLCÜSÜ
  {
    id: "web-serial-controller",
    title: "Web Serial API ile Tarayıcıdan Donanım Kontrolü (Chrome to Arduino)",
    category: "Web & Donanım",
    difficulty: "Başlangıç",
    estimatedTime: "1-2 Saat",
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
}

// Buton Olayları:
// sendCommand("LED_ON");
// sendCommand("LED_OFF");`,
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
