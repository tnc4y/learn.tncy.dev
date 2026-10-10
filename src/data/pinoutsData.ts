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

  // 4. STM32 BLUE PILL (STM32F103C8T6)
  "stm32-bluepill": {
    boardId: "stm32-bluepill",
    boardName: "STM32F103C8T6 (Blue Pill)",
    totalPins: 40,
    operatingVoltage: "3.3V (5V Tolerant Çoğu Pin)",
    leftPins: [
      { pinNumber: "1", name: "VBAT", type: "power", functions: ["RTC Pil Girişi"], description: "Gerçek zaman saati yedek pil girişi (1.8-3.6V)" },
      { pinNumber: "2", name: "PC13", type: "digital", functions: ["Dahili LED", "GPIO"], description: "Kart üstündeki yeşil kullanıcı LED'i (Aktif LOW)" },
      { pinNumber: "3", name: "PC14", type: "special", functions: ["OSC32_IN"], description: "32.768 kHz RTC harici kristal girişi" },
      { pinNumber: "4", name: "PC15", type: "special", functions: ["OSC32_OUT"], description: "32.768 kHz RTC harici kristal çıkışı" },
      { pinNumber: "5", name: "PA0", type: "analog", functions: ["ADC1_IN0", "WKUP", "PWM"], description: "12-bit ADC0, Uyandırma pini veya PWM" },
      { pinNumber: "6", name: "PA1", type: "analog", functions: ["ADC1_IN1", "PWM"], description: "12-bit ADC1 veya Timer 2 Ch2 PWM" },
      { pinNumber: "7", name: "PA2", type: "comm", functions: ["USART2 TX", "ADC1_IN2"], description: "Seri Port 2 Verici hattı" },
      { pinNumber: "8", name: "PA3", type: "comm", functions: ["USART2 RX", "ADC1_IN3"], description: "Seri Port 2 Alıcı hattı" },
      { pinNumber: "9", name: "PA4", type: "comm", functions: ["SPI1 NSS", "DAC"], description: "Donanımsal SPI1 Chip Select" },
      { pinNumber: "10", name: "PA5", type: "comm", functions: ["SPI1 SCK", "ADC1_IN5"], description: "Donanımsal SPI1 Saat hattı" },
      { pinNumber: "11", name: "PA6", type: "comm", functions: ["SPI1 MISO", "PWM"], description: "Donanımsal SPI1 MISO hattı" },
      { pinNumber: "12", name: "PA7", type: "comm", functions: ["SPI1 MOSI", "PWM"], description: "Donanımsal SPI1 MOSI hattı" },
      { pinNumber: "13", name: "PB0", type: "analog", functions: ["ADC1_IN8", "PWM"], description: "12-bit Analog Giriş 8 veya PWM" },
      { pinNumber: "14", name: "PB1", type: "analog", functions: ["ADC1_IN9", "PWM"], description: "12-bit Analog Giriş 9 veya PWM" },
      { pinNumber: "15", name: "PB10", type: "comm", functions: ["I2C2 SCL", "USART3 TX"], description: "Donanımsal I2C2 Saat veya UART3 TX" },
      { pinNumber: "16", name: "PB11", type: "comm", functions: ["I2C2 SDA", "USART3 RX"], description: "Donanımsal I2C2 Veri veya UART3 RX" },
      { pinNumber: "17", name: "NRST", type: "special", functions: ["Sistem Reset"], description: "Düşük seviyede MCU'yu sıfırlar (Reset butonu)" },
      { pinNumber: "18", name: "3V3", type: "power", functions: ["3.3V Güç Çıkışı"], description: "Dahili regüle 3.3V besleme" },
      { pinNumber: "19", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "20", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
    ],
    rightPins: [
      { pinNumber: "21", name: "5V", type: "power", functions: ["5V Güç Girişi"], description: "Micro-USB 5V veya harici regülatör beslemesi" },
      { pinNumber: "22", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Devre ortak toprak hattı" },
      { pinNumber: "23", name: "3V3", type: "power", functions: ["3.3V Güç"], description: "3.3V voltaj hattı" },
      { pinNumber: "24", name: "PB9", type: "comm", functions: ["I2C1 SDA", "CAN TX"], description: "I2C1 Veri Hattı veya CAN Bus TX" },
      { pinNumber: "25", name: "PB8", type: "comm", functions: ["I2C1 SCL", "CAN RX"], description: "I2C1 Saat Hattı veya CAN Bus RX" },
      { pinNumber: "26", name: "PB7", type: "comm", functions: ["I2C1 SDA", "USART1 RX"], description: "I2C1 Veri veya Seri Port 1 Alıcı" },
      { pinNumber: "27", name: "PB6", type: "comm", functions: ["I2C1 SCL", "USART1 TX"], description: "I2C1 Saat veya Seri Port 1 Verici" },
      { pinNumber: "28", name: "PB5", type: "digital", functions: ["SPI1 MOSI (Remap)"], description: "Genel amaçlı 5V toleranslı GPIO" },
      { pinNumber: "29", name: "PB4", type: "digital", functions: ["SPI1 MISO (Remap)"], description: "Genel amaçlı 5V toleranslı GPIO" },
      { pinNumber: "30", name: "PB3", type: "digital", functions: ["SPI1 SCK (Remap)"], description: "Genel amaçlı 5V toleranslı GPIO" },
      { pinNumber: "31", name: "PA15", type: "digital", functions: ["JTDI", "GPIO"], description: "JTAG Debug veya Dijital G/Ç" },
      { pinNumber: "32", name: "PA12", type: "comm", functions: ["USB DP", "CAN TX"], description: "Dahili USB D+ hattı veya CAN TX" },
      { pinNumber: "33", name: "PA11", type: "comm", functions: ["USB DM", "CAN RX"], description: "Dahili USB D- hattı veya CAN RX" },
      { pinNumber: "34", name: "PA10", type: "comm", functions: ["USART1 RX"], description: "Donanımsal Seri Port 1 RX (Ana Konsol)" },
      { pinNumber: "35", name: "PA9", type: "comm", functions: ["USART1 TX"], description: "Donanımsal Seri Port 1 TX (Ana Konsol)" },
      { pinNumber: "36", name: "PA8", type: "digital", functions: ["MCO", "PWM"], description: "Mikrodenetleyici Saat Çıkışı (MCO) / PWM" },
      { pinNumber: "37", name: "PB15", type: "comm", functions: ["SPI2 MOSI"], description: "İkinci Donanımsal SPI2 MOSI Hattı" },
      { pinNumber: "38", name: "PB14", type: "comm", functions: ["SPI2 MISO"], description: "İkinci Donanımsal SPI2 MISO Hattı" },
      { pinNumber: "39", name: "PB13", type: "comm", functions: ["SPI2 SCK"], description: "İkinci Donanımsal SPI2 Saat Hattı" },
      { pinNumber: "40", name: "PB12", type: "comm", functions: ["SPI2 NSS"], description: "İkinci Donanımsal SPI2 Chip Select" },
    ],
  },

  // 5. RASPBERRY PI 5 (40-PIN STANDART GPIO HEADER)
  "raspberry-pi-5": {
    boardId: "raspberry-pi-5",
    boardName: "Raspberry Pi 5 (40-Pin Header)",
    totalPins: 40,
    operatingVoltage: "3.3V Mantık (5V Güç Besleme)",
    leftPins: [
      { pinNumber: "1", name: "3V3 PWR", type: "power", functions: ["3.3V Güç"], description: "Maksimum 500mA 3.3V güç hattı" },
      { pinNumber: "3", name: "GPIO 2", type: "comm", functions: ["I2C1 SDA"], description: "Donanımsal I2C1 Veri Hattı (1.8k pull-up)" },
      { pinNumber: "5", name: "GPIO 3", type: "comm", functions: ["I2C1 SCL"], description: "Donanımsal I2C1 Saat Hattı (1.8k pull-up)" },
      { pinNumber: "7", name: "GPIO 4", type: "digital", functions: ["GPCLK0", "1-Wire"], description: "Genel amaçlı GPIO veya Dallas 1-Wire" },
      { pinNumber: "9", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Sistem ortak toprak hattı" },
      { pinNumber: "11", name: "GPIO 17", type: "digital", functions: ["GPIO 17"], description: "Genel amaçlı dijital G/Ç hattı" },
      { pinNumber: "13", name: "GPIO 27", type: "digital", functions: ["GPIO 27"], description: "Genel amaçlı dijital G/Ç hattı" },
      { pinNumber: "15", name: "GPIO 22", type: "digital", functions: ["GPIO 22"], description: "Genel amaçlı dijital G/Ç hattı" },
      { pinNumber: "17", name: "3V3 PWR", type: "power", functions: ["3.3V Güç"], description: "Dahili 3.3V güç çıkışı" },
      { pinNumber: "19", name: "GPIO 10", type: "comm", functions: ["SPI0 MOSI"], description: "Donanımsal SPI0 Master Out" },
      { pinNumber: "21", name: "GPIO 9", type: "comm", functions: ["SPI0 MISO"], description: "Donanımsal SPI0 Master In" },
      { pinNumber: "23", name: "GPIO 11", type: "comm", functions: ["SPI0 SCLK"], description: "Donanımsal SPI0 Saat Hattı" },
      { pinNumber: "25", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Sistem ortak toprak hattı" },
      { pinNumber: "27", name: "GPIO 0", type: "special", functions: ["ID_SD (HAT EEPROM)"], description: "Raspberry Pi HAT ID EEPROM Veri" },
      { pinNumber: "29", name: "GPIO 5", type: "digital", functions: ["GPIO 5"], description: "Genel amaçlı dijital G/Ç hattı" },
      { pinNumber: "31", name: "GPIO 6", type: "digital", functions: ["GPIO 6"], description: "Genel amaçlı dijital G/Ç hattı" },
      { pinNumber: "33", name: "GPIO 13", type: "pwm", functions: ["PWM1", "GPIO 13"], description: "RP1 Çip Donanımsal PWM Kanal 1" },
      { pinNumber: "35", name: "GPIO 19", type: "comm", functions: ["PCM_FS", "SPI1 MISO"], description: "I2S Dijital Ses / SPI1 MISO" },
      { pinNumber: "37", name: "GPIO 26", type: "digital", functions: ["GPIO 26"], description: "Genel amaçlı dijital G/Ç hattı" },
      { pinNumber: "39", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Sistem ortak toprak hattı" },
    ],
    rightPins: [
      { pinNumber: "2", name: "5V PWR", type: "power", functions: ["5V Güç"], description: "USB-C PD 5V sistem besleme hattı" },
      { pinNumber: "4", name: "5V PWR", type: "power", functions: ["5V Güç"], description: "USB-C PD 5V sistem besleme hattı" },
      { pinNumber: "6", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Sistem ortak toprak hattı" },
      { pinNumber: "8", name: "GPIO 14", type: "comm", functions: ["UART0 TX"], description: "Linux Seri Konsol Verici Hattı" },
      { pinNumber: "10", name: "GPIO 15", type: "comm", functions: ["UART0 RX"], description: "Linux Seri Konsol Alıcı Hattı" },
      { pinNumber: "12", name: "GPIO 18", type: "pwm", functions: ["PWM0", "PCM_CLK"], description: "Donanımsal PWM Kanal 0 veya I2S Saat" },
      { pinNumber: "14", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Sistem ortak toprak hattı" },
      { pinNumber: "16", name: "GPIO 23", type: "digital", functions: ["GPIO 23"], description: "Genel amaçlı dijital G/Ç hattı" },
      { pinNumber: "18", name: "GPIO 24", type: "digital", functions: ["GPIO 24"], description: "Genel amaçlı dijital G/Ç hattı" },
      { pinNumber: "20", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Sistem ortak toprak hattı" },
      { pinNumber: "22", name: "GPIO 25", type: "digital", functions: ["GPIO 25"], description: "Genel amaçlı dijital G/Ç hattı" },
      { pinNumber: "24", name: "GPIO 8", type: "comm", functions: ["SPI0 CE0"], description: "Donanımsal SPI0 Chip Enable 0" },
      { pinNumber: "26", name: "GPIO 7", type: "comm", functions: ["SPI0 CE1"], description: "Donanımsal SPI0 Chip Enable 1" },
      { pinNumber: "28", name: "GPIO 1", type: "special", functions: ["ID_SC (HAT EEPROM)"], description: "Raspberry Pi HAT ID EEPROM Saat" },
      { pinNumber: "30", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Sistem ortak toprak hattı" },
      { pinNumber: "32", name: "GPIO 12", type: "pwm", functions: ["PWM0", "GPIO 12"], description: "RP1 Çip Donanımsal PWM Kanal 0" },
      { pinNumber: "34", name: "GND", type: "gnd", functions: ["Toprak (GND)"], description: "Sistem ortak toprak hattı" },
      { pinNumber: "36", name: "GPIO 16", type: "comm", functions: ["UART0 CTS", "SPI1 CS"], description: "Seri Port Akış Kontrol / SPI1 CS" },
      { pinNumber: "38", name: "GPIO 20", type: "comm", functions: ["PCM_DIN", "SPI1 MOSI"], description: "I2S Dijital Ses Girişi / SPI1 MOSI" },
      { pinNumber: "40", name: "GPIO 21", type: "comm", functions: ["PCM_DOUT", "SPI1 SCLK"], description: "I2S Dijital Ses Çıkışı / SPI1 Saat" },
    ],
  },
};

export function getBoardPinout(boardId: string): BoardPinout | undefined {
  if (BOARD_PINOUTS[boardId]) return BOARD_PINOUTS[boardId];
  if (boardId === "esp32-wroom-32" || boardId === "esp32-s3") return BOARD_PINOUTS["esp32-devkit-v1"];
  if (boardId === "raspberry-pi-pico-w") return BOARD_PINOUTS["rpi-pico"];
  if (boardId === "arduino-nano") return BOARD_PINOUTS["arduino-uno-r3"];
  if (boardId === "nvidia-jetson-nano") return BOARD_PINOUTS["raspberry-pi-5"]; // 40-pin header compatible
  if (boardId === "stm32-nucleo-f401re") return BOARD_PINOUTS["stm32-bluepill"];
  return undefined;
}

