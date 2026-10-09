export interface BoardPin {
  pinNumber: string;
  name: string;
  type: "power" | "gnd" | "digital" | "pwm" | "analog" | "comm" | "special";
  functions: string[];
  description: string;
}

export interface BoardPinout {
  boardId: string;
  boardName: string;
  totalPins: number;
  operatingVoltage: string;
  leftPins: BoardPin[];
  rightPins: BoardPin[];
}

export const BOARD_PINOUTS: Record<string, BoardPinout> = {
  // 1. ARDUINO UNO R3
  "arduino-uno-r3": {
    boardId: "arduino-uno-r3",
    boardName: "Arduino Uno R3",
    totalPins: 28,
    operatingVoltage: "5V",
    leftPins: [
      { pinNumber: "1", name: "IOREF", type: "power", functions: ["5V Referans"], description: "Kalkan voltaj referans pini" },
      { pinNumber: "2", name: "RESET", type: "special", functions: ["Sistem Reset"], description: "Düşük seviyede mikrodenetleyiciyi sıfırlar" },
      { pinNumber: "3", name: "3.3V", type: "power", functions: ["3.3V Güç"], description: "Dahili 3.3V 50mA regülatör çıkışı" },
      { pinNumber: "4", name: "5V", type: "power", functions: ["5V Güç"], description: "Dahili 5V regüle güç çıkışı" },
      { pinNumber: "5", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "6", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "7", name: "VIN", type: "power", functions: ["Ham Voltaj Girişi"], description: "Harici 7-12V besleme girişi" },
      { pinNumber: "8", name: "A0", type: "analog", functions: ["ADC0", "GPIO 14"], description: "10-bit analog giriş / dijital GPIO" },
      { pinNumber: "9", name: "A1", type: "analog", functions: ["ADC1", "GPIO 15"], description: "10-bit analog giriş / dijital GPIO" },
      { pinNumber: "10", name: "A2", type: "analog", functions: ["ADC2", "GPIO 16"], description: "10-bit analog giriş / dijital GPIO" },
      { pinNumber: "11", name: "A3", type: "analog", functions: ["ADC3", "GPIO 17"], description: "10-bit analog giriş / dijital GPIO" },
      { pinNumber: "12", name: "A4", type: "comm", functions: ["SDA", "ADC4", "GPIO 18"], description: "I2C Veri Hattı (SDA) veya Analog Giriş" },
      { pinNumber: "13", name: "A5", type: "comm", functions: ["SCL", "ADC5", "GPIO 19"], description: "I2C Saat Hattı (SCL) veya Analog Giriş" },
    ],
    rightPins: [
      { pinNumber: "14", name: "D0 (RX)", type: "comm", functions: ["UART RX", "GPIO 0"], description: "Seri Port Alıcı Hattı" },
      { pinNumber: "15", name: "D1 (TX)", type: "comm", functions: ["UART TX", "GPIO 1"], description: "Seri Port Verici Hattı" },
      { pinNumber: "16", name: "D2", type: "digital", functions: ["INT0", "GPIO 2"], description: "Dış Donanım Kesmesi 0 (Interrupt 0)" },
      { pinNumber: "17", name: "D3", type: "pwm", functions: ["PWM", "INT1", "GPIO 3"], description: "8-bit Donanımsal PWM & Kesme 1" },
      { pinNumber: "18", name: "D4", type: "digital", functions: ["GPIO 4"], description: "Genel amaçlı dijital G/Ç" },
      { pinNumber: "19", name: "D5", type: "pwm", functions: ["PWM", "GPIO 5"], description: "8-bit Donanımsal PWM Çıkışı (980Hz)" },
      { pinNumber: "20", name: "D6", type: "pwm", functions: ["PWM", "GPIO 6"], description: "8-bit Donanımsal PWM Çıkışı (980Hz)" },
      { pinNumber: "21", name: "D7", type: "digital", functions: ["GPIO 7"], description: "Genel amaçlı dijital G/Ç" },
      { pinNumber: "22", name: "D8", type: "digital", functions: ["GPIO 8"], description: "Genel amaçlı dijital G/Ç" },
      { pinNumber: "23", name: "D9", type: "pwm", functions: ["PWM", "GPIO 9"], description: "8-bit Donanımsal PWM Çıkışı (490Hz)" },
      { pinNumber: "24", name: "D10", type: "pwm", functions: ["PWM", "SPI SS", "GPIO 10"], description: "PWM & Donanımsal SPI Slave Select" },
      { pinNumber: "25", name: "D11", type: "pwm", functions: ["PWM", "SPI MOSI", "GPIO 11"], description: "PWM & Donanımsal SPI Master Out" },
      { pinNumber: "26", name: "D12", type: "comm", functions: ["SPI MISO", "GPIO 12"], description: "Donanımsal SPI Master In" },
      { pinNumber: "27", name: "D13", type: "comm", functions: ["SPI SCK", "LED", "GPIO 13"], description: "Dahili Kart LED'i & SPI Saat Hattı" },
      { pinNumber: "28", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Ortak toprak bağlantısı" },
    ],
  },

  // 2. ESP32 DEVKIT V1 (30-PIN)
  "esp32-devkit-v1": {
    boardId: "esp32-devkit-v1",
    boardName: "ESP32 DevKit V1",
    totalPins: 30,
    operatingVoltage: "3.3V",
    leftPins: [
      { pinNumber: "1", name: "3V3", type: "power", functions: ["3.3V Güç"], description: "Kart 3.3V güç çıkışı (Max 600mA)" },
      { pinNumber: "2", name: "EN", type: "special", functions: ["Enable / Reset"], description: "ESP32 çipini yeniden başlatır (Reset)" },
      { pinNumber: "3", name: "GPIO 36", type: "analog", functions: ["ADC1_CH0", "VP"], description: "Sadece Giriş: Yüksek hassasiyetli ADC" },
      { pinNumber: "4", name: "GPIO 39", type: "analog", functions: ["ADC1_CH3", "VN"], description: "Sadece Giriş: Düşük gürültülü ADC" },
      { pinNumber: "5", name: "GPIO 34", type: "analog", functions: ["ADC1_CH6"], description: "Sadece Giriş (Pull-up/down yok)" },
      { pinNumber: "6", name: "GPIO 35", type: "analog", functions: ["ADC1_CH7"], description: "Sadece Giriş (Pull-up/down yok)" },
      { pinNumber: "7", name: "GPIO 32", type: "pwm", functions: ["ADC1_CH4", "Touch 9", "PWM"], description: "Dokunmatik Sensör & ADC & PWM" },
      { pinNumber: "8", name: "GPIO 33", type: "pwm", functions: ["ADC1_CH5", "Touch 8", "PWM"], description: "Dokunmatik Sensör & ADC & PWM" },
      { pinNumber: "9", name: "GPIO 25", type: "analog", functions: ["DAC 1", "ADC2_CH8"], description: "Gerçek 8-bit Analog Voltaj Çıkışı (DAC)" },
      { pinNumber: "10", name: "GPIO 26", type: "analog", functions: ["DAC 2", "ADC2_CH9"], description: "Gerçek 8-bit Analog Voltaj Çıkışı (DAC)" },
      { pinNumber: "11", name: "GPIO 27", type: "pwm", functions: ["Touch 7", "PWM"], description: "Kapasitif Dokunmatik & PWM" },
      { pinNumber: "12", name: "GPIO 14", type: "comm", functions: ["HSPI SCK", "Touch 6"], description: "Donanımsal SPI Saat Hattı" },
      { pinNumber: "13", name: "GPIO 12", type: "comm", functions: ["HSPI MISO", "Touch 5"], description: "Donanımsal SPI MISO (Boot pini)" },
      { pinNumber: "14", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Ortak toprak bağlantısı" },
      { pinNumber: "15", name: "GPIO 13", type: "comm", functions: ["HSPI MOSI", "Touch 4"], description: "Donanımsal SPI MOSI Hattı" },
    ],
    rightPins: [
      { pinNumber: "16", name: "VIN (5V)", type: "power", functions: ["5V Güç Girişi"], description: "USB 5V veya harici adaptör girişi" },
      { pinNumber: "17", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Ortak toprak bağlantısı" },
      { pinNumber: "18", name: "GPIO 23", type: "comm", functions: ["VSPI MOSI"], description: "Varsayılan SPI MOSI hattı" },
      { pinNumber: "19", name: "GPIO 22", type: "comm", functions: ["I2C SCL"], description: "Varsayılan I2C Saat Hattı (SCL)" },
      { pinNumber: "20", name: "GPIO 1 (TX0)", type: "comm", functions: ["UART0 TX"], description: "Seri Port Verici & Programlama" },
      { pinNumber: "21", name: "GPIO 3 (RX0)", type: "comm", functions: ["UART0 RX"], description: "Seri Port Alıcı & Programlama" },
      { pinNumber: "22", name: "GPIO 21", type: "comm", functions: ["I2C SDA"], description: "Varsayılan I2C Veri Hattı (SDA)" },
      { pinNumber: "23", name: "GPIO 19", type: "comm", functions: ["VSPI MISO"], description: "Varsayılan SPI MISO hattı" },
      { pinNumber: "24", name: "GPIO 18", type: "comm", functions: ["VSPI SCK"], description: "Varsayılan SPI Saat hattı" },
      { pinNumber: "25", name: "GPIO 5", type: "comm", functions: ["VSPI SS"], description: "Varsayılan SPI Chip Select hattı" },
      { pinNumber: "26", name: "GPIO 17", type: "comm", functions: ["UART2 TX"], description: "İkinci Donanımsal Seri Port TX" },
      { pinNumber: "27", name: "GPIO 16", type: "comm", functions: ["UART2 RX"], description: "İkinci Donanımsal Seri Port RX" },
      { pinNumber: "28", name: "GPIO 4", type: "pwm", functions: ["Touch 0", "PWM"], description: "Dokunmatik & Genel PWM G/Ç" },
      { pinNumber: "29", name: "GPIO 0", type: "special", functions: ["Boot Pin", "Touch 1"], description: "Önyükleme pini (LOW=Flaş Modu)" },
      { pinNumber: "30", name: "GPIO 2", type: "pwm", functions: ["Dahili Mavi LED"], description: "Kart üstündeki mavi kullanıcı LED'i" },
    ],
  },

  // 3. RASPBERRY PI PICO / PICO W
  "rpi-pico": {
    boardId: "rpi-pico",
    boardName: "Raspberry Pi Pico / Pico W",
    totalPins: 40,
    operatingVoltage: "3.3V",
    leftPins: [
      { pinNumber: "1", name: "GP0", type: "comm", functions: ["UART0 TX", "I2C0 SDA"], description: "UART0 Verici / I2C0 Veri Hattı" },
      { pinNumber: "2", name: "GP1", type: "comm", functions: ["UART0 RX", "I2C0 SCL"], description: "UART0 Alıcı / I2C0 Saat Hattı" },
      { pinNumber: "3", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "4", name: "GP2", type: "comm", functions: ["SPI0 SCK", "I2C1 SDA"], description: "SPI0 Saat / I2C1 Veri Hattı" },
      { pinNumber: "5", name: "GP3", type: "comm", functions: ["SPI0 TX", "I2C1 SCL"], description: "SPI0 MOSI / I2C1 Saat Hattı" },
      { pinNumber: "6", name: "GP4", type: "comm", functions: ["SPI0 RX", "I2C0 SDA"], description: "SPI0 MISO / I2C0 Veri Hattı" },
      { pinNumber: "7", name: "GP5", type: "comm", functions: ["SPI0 CSn", "I2C0 SCL"], description: "SPI0 Chip Select Hattı" },
      { pinNumber: "8", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "9", name: "GP6", type: "pwm", functions: ["PWM3 A"], description: "Programlanabilir G/Ç & PWM" },
      { pinNumber: "10", name: "GP7", type: "pwm", functions: ["PWM3 B"], description: "Programlanabilir G/Ç & PWM" },
      { pinNumber: "11", name: "GP8", type: "comm", functions: ["UART1 TX", "I2C0 SDA"], description: "UART1 Verici / I2C0 Veri" },
      { pinNumber: "12", name: "GP9", type: "comm", functions: ["UART1 RX", "I2C0 SCL"], description: "UART1 Alıcı / I2C0 Saat" },
      { pinNumber: "13", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "14", name: "GP10", type: "comm", functions: ["SPI1 SCK"], description: "SPI1 Saat Hattı" },
      { pinNumber: "15", name: "GP11", type: "comm", functions: ["SPI1 TX"], description: "SPI1 MOSI Hattı" },
      { pinNumber: "16", name: "GP12", type: "comm", functions: ["SPI1 RX"], description: "SPI1 MISO Hattı" },
      { pinNumber: "17", name: "GP13", type: "comm", functions: ["SPI1 CSn"], description: "SPI1 Chip Select" },
      { pinNumber: "18", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "19", name: "GP14", type: "pwm", functions: ["PWM7 A"], description: "Programlanabilir G/Ç & PWM" },
      { pinNumber: "20", name: "GP15", type: "pwm", functions: ["PWM7 B"], description: "Programlanabilir G/Ç & PWM" },
    ],
    rightPins: [
      { pinNumber: "21", name: "GP16", type: "comm", functions: ["SPI0 RX", "I2C0 SDA"], description: "SPI0 MISO / I2C0 Veri" },
      { pinNumber: "22", name: "GP17", type: "comm", functions: ["SPI0 CSn", "I2C0 SCL"], description: "SPI0 Chip Select / I2C0 Saat" },
      { pinNumber: "23", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "24", name: "GP18", type: "comm", functions: ["SPI0 SCK", "I2C1 SDA"], description: "SPI0 Saat / I2C1 Veri" },
      { pinNumber: "25", name: "GP19", type: "comm", functions: ["SPI0 TX", "I2C1 SCL"], description: "SPI0 MOSI / I2C1 Saat" },
      { pinNumber: "26", name: "GP20", type: "pwm", functions: ["PWM2 A"], description: "Programlanabilir G/Ç & PWM" },
      { pinNumber: "27", name: "GP21", type: "pwm", functions: ["PWM2 B"], description: "Programlanabilir G/Ç & PWM" },
      { pinNumber: "28", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "29", name: "GP22", type: "digital", functions: ["GPIO 22"], description: "Genel amaçlı dijital G/Ç" },
      { pinNumber: "30", name: "RUN", type: "special", functions: ["Reset Pin"], description: "Sistem Sıfırlama Pini (Reset)" },
      { pinNumber: "31", name: "GP26 (ADC0)", type: "analog", functions: ["ADC0", "I2C1 SDA"], description: "12-bit Analog Giriş 0" },
      { pinNumber: "32", name: "GP27 (ADC1)", type: "analog", functions: ["ADC1", "I2C1 SCL"], description: "12-bit Analog Giriş 1" },
      { pinNumber: "33", name: "GND", type: "gnd", functions: ["Analog GND"], description: "Analog referans toprağı" },
      { pinNumber: "34", name: "GP28 (ADC2)", type: "analog", functions: ["ADC2"], description: "12-bit Analog Giriş 2" },
      { pinNumber: "35", name: "ADC_VREF", type: "power", functions: ["ADC Voltaj Ref"], description: "Harici analog voltaj referansı" },
      { pinNumber: "36", name: "3V3(OUT)", type: "power", functions: ["3.3V Regüle Çıkış"], description: "Dahili SMPS 3.3V güç çıkışı" },
      { pinNumber: "37", name: "3V3_EN", type: "special", functions: ["SMPS Enable"], description: "3.3V Regülatörü Aç/Kapat" },
      { pinNumber: "38", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "39", name: "VSYS", type: "power", functions: ["1.8V - 5.5V Giriş"], description: "Pil veya harici güç girişi" },
      { pinNumber: "40", name: "VBUS", type: "power", functions: ["USB 5V Güç"], description: "Mikro-USB 5V güç pini" },
    ],
  },
};
