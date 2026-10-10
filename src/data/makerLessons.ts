import { LessonContent } from "./lessonsData";

export const MAKER_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // ARDUINO & SENSÖRLER
  // ========================================================
  "arduino-intro": {
    id: "arduino-intro",
    badge: "Modül 1 • Arduino Temelleri",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Arduino Temelleri: setup(), loop() ve Dijital I/O",
    subtitle: "Mikrodenetleyici dünyasına ilk adım: Standart yaşam döngüsü, pin modları ve LED flaşör.",
    sections: [
      {
        title: "1. Arduino Yaşam Döngüsü: setup() ve loop()",
        content: `Her Arduino programı (Sketch) iki ana fonksiyondan meydana gelir:
- **\`setup()\`:** Kart elektriğe bağlandığında veya reset butonuna basıldığında **yalnızca 1 kez** çalışır. Pinlerin giriş/çıkış modları, haberleşme hızları ve sensör başlatma komutları burada verilir.
- **\`loop()\`:** \`setup()\` bittikten sonra devreye girer ve kartın enerjisi kesilene kadar **sonsuz bir döngüde** sürekli tekrarlanır. Donanım mantığı buraya yazılır.`,
      },
      {
        title: "2. Dijital Pin Kontrolü (pinMode, digitalWrite, delay)",
        content: `Dijital pinler sadece iki voltaj seviyesini temsil eder: \`HIGH\` (5V veya 3.3V) ve \`LOW\` (0V / GND).`,
        code: {
          language: "cpp",
          caption: "blink.ino - Klasik LED Flaşör",
          snippet: `const int LED_PIN = 13; // Kart üzerindeki yerleşik LED

void setup() {
  // 13 nolu pini çıkış olarak ayarla:
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH); // LED'i yak (5V)
  delay(1000);                 // 1000 milisaniye (1 saniye) bekle
  digitalWrite(LED_PIN, LOW);  // LED'i söndür (0V)
  delay(1000);                 // 1 saniye bekle
}`,
        },
      },
    ],
    quiz: {
      question: "Arduino kartına enerji verildiğinde sadece bir defa çalışan başlangıç fonksiyonu hangisidir?",
      options: ["A) main()", "B) loop()", "C) setup()", "D) init()"],
      correctIndex: 2,
      explanation: "Doğru! setup() fonksiyonu kart açıldığında veya resetlendiğinde donanımı hazırlamak için sadece 1 kez çalışır.",
    },
  },

  "arduino-breadboard-led": {
    id: "arduino-breadboard-led",
    badge: "Modül 1 • Devre Kurulumu",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Devre Kurulumu: Buton ile LED Yakma ve Pull-up Direnci",
    subtitle: "Breadboard kullanımı, akım sınırlayıcı direnç hesabı ve yüzen (floating) pin sorununa INPUT_PULLUP çözümü.",
    sections: [
      {
        title: "1. Breadboard Mimarisi ve LED Direnç Hesabı",
        content: `Breadboard'da üst ve alt kırmızı/mavi hatlar yatay olarak boydan boya iletkendir (Güç rayları: VCC ve GND). Orta kısımdaki delikler ise dikey sütunlar (A-B-C-D-E ve F-G-H-I-J) halinde birbirine bağlıdır.

**Ohm Kanunu ($V = I \\times R$) ile LED Direnci:**
Standart bir kırmızı LED yaklaşık 2.0V gerilim düşümüne sahiptir ve üzerinden maksimum 15-20 mA akım geçmelidir:
$$R = \\frac{V_{kaynak} - V_{LED}}{I_{hedef}} = \\frac{5\\text{V} - 2.0\\text{V}}{0.015\\text{A}} = 200\\,\\Omega$$
Bu yüzden LED'in anot bacağına seri olarak **220Ω veya 330Ω** direnç bağlanır.`,
      },
      {
        title: "2. Yüzen Pin (Floating Pin) Problemi ve INPUT_PULLUP",
        content: `Bir butona basılmadığında giriş pini havada kalırsa (boşta ise), ortamdaki elektromanyetik gürültüden dolayı rastgele 0 ve 1 okur.

Bunu önlemek için pini dahili 20kΩ dirençle 5V'a çeken **\`INPUT_PULLUP\`** modu kullanılır:
- Butona basılmadığında pin \`HIGH\` (1) okur.
- Butona basıldığında GND'ye bağlanır ve \`LOW\` (0) okur (Ters mantık).`,
        code: {
          language: "cpp",
          caption: "button_led.ino - Dahili Pull-Up ile Buton Okuma",
          snippet: `const int BUTTON_PIN = 2; // Buton pini (GND ile Pin 2 arası)
const int LED_PIN    = 8; // LED pini

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP); // Dahili Pull-up aktif
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  // INPUT_PULLUP modunda butona basıldığında LOW döner:
  if (buttonState == LOW) {
    digitalWrite(LED_PIN, HIGH); // Basıldıysa yak
  } else {
    digitalWrite(LED_PIN, LOW);  // Bırakıldıysa söndür
  }
}`,
        },
      },
    ],
    quiz: {
      question: "Arduino'da 'pinMode(pin, INPUT_PULLUP);' kullanıldığında butona basılmadığı boşta durumda pin hangi değeri okur?",
      options: [
        "A) LOW (0V)",
        "B) HIGH (5V/3.3V)",
        "C) Rastgele değişken (Floating)",
        "D) -1",
      ],
      correctIndex: 1,
      explanation: "Doğru! Dahili Pull-up direnci pini dahili olarak VCC'ye çektiği için butona basılmadığında HIGH okur; butona basılınca GND'ye çekilip LOW olur.",
    },
  },

  "arduino-serial-sensors": {
    id: "arduino-serial-sensors",
    badge: "Modül 2 • Seri Port & Sensörler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Seri Port Haberleşmesi ve HC-SR04 Ultrasonik Sensör",
    subtitle: "Serial.begin(115200), Serial Monitor / Plotter ve ses dalgalarının yansıma süresiyle santimetre cinsinden mesafe hesabı.",
    sections: [
      {
        title: "1. HC-SR04 Ultrasonik Mesafe Ölçüm İlkesi",
        content: `HC-SR04 sensörü iki silindirik gözden oluşur:
1. **Trig (Tetik):** 10 mikrosaniyelik bir darbe ile 40 kHz frekansında 8 ultrasonik ses patlaması gönderir.
2. **Echo (Yankı):** Ses dalgası bir engele çarpıp geri dönene kadar geçen süre boyunca \`HIGH\` sinyali üretir.

**Mesafe Formülü:**
Sesin havadaki yayılma hızı $340\\text{ m/s}$ yani mikrosaniyede $0.0343\\text{ cm}$'dir. Ses gidip geri döndüğü için süre ikiye bölünür:
$$\\text{Mesafe (cm)} = \\frac{\\text{Süre (}\\mu\\text{s)} \\times 0.0343}{2}$$`,
        code: {
          language: "cpp",
          caption: "ultrasonic_distance.ino",
          snippet: `const int TRIG_PIN = 9;
const int ECHO_PIN = 10;

void setup() {
  Serial.begin(115200); // Seri iletişimi başlat
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  // 1. Trig pinine 10us temiz darbe gönder:
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // 2. Echo pininin HIGH kalma süresini mikrosaniye olarak ölç:
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout

  // 3. Mesafeyi cm olarak hesapla:
  float distanceCm = (duration * 0.0343) / 2.0;

  if (duration == 0) {
    Serial.println("Menzil Dışı (Hedef bulunamadı)");
  } else {
    Serial.print("Mesafe: ");
    Serial.print(distanceCm, 1);
    Serial.println(" cm");
  }

  delay(100); // 10 Hz güncelleme
}`,
        },
      },
    ],
    quiz: {
      question: "HC-SR04 ultrasonik sensöründe ses dalgasının gidiş-dönüş süresini mikrosaniye cinsinden ölçmek için hangi Arduino fonksiyonu kullanılır?",
      options: [
        "A) pulseIn()",
        "B) analogRead()",
        "C) delayMicroseconds()",
        "D) micros()",
      ],
      correctIndex: 0,
      explanation: "Doğru! pulseIn(pin, HIGH) fonksiyonu pinde beklenen mantıksal durumun kaç mikrosaniye sürdüğünü hassas bir biçimde ölçer.",
    },
  },

  "arduino-analog-read": {
    id: "arduino-analog-read",
    badge: "Modül 2 • Analog Sinyaller",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Analog Giriş (analogRead) ve LDR Işık Sensörü",
    subtitle: "10-bit ADC (Analog-to-Digital Converter) mimarisi, voltaj bölücü direnç devresi ve map() fonksiyonu ile kalibrasyon.",
    sections: [
      {
        title: "1. Arduino 10-bit ADC ve Voltaj Bölücü Devre",
        content: `Arduino Uno'nun analog pinleri (A0-A5), 0V ile 5V arasındaki gerilimi **10-bitlik bir sayıya (0 ile 1023)** dönüştüren bir ADC içerir:
- $0\\text{V} \\rightarrow 0$
- $2.5\\text{V} \\rightarrow 512$
- $5.0\\text{V} \\rightarrow 1023$
- Adım hassasiyeti: $\\frac{5\\text{V}}{1024} \\approx 4.88\\text{ mV}$.

Işığa duyarlı direnç olan **LDR (Light Dependent Resistor)**, aydınlıkta direnci düşen (örn: 500Ω), karanlıkta ise megaohm seviyesine çıkan bir komponenttir. LDR'yi 10kΩ bir dirençle seri bağlayarak voltaj bölücü oluştururuz:
$$V_{out} = 5\\text{V} \\times \\frac{10\\text{k}\\Omega}{R_{LDR} + 10\\text{k}\\Omega}$$`,
        code: {
          language: "cpp",
          caption: "ldr_light_sensor.ino",
          snippet: `const int LDR_PIN = A0;
const int LED_PIN = 9;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int sensorValue = analogRead(LDR_PIN); // 0 - 1023 arası

  // Değeri 0-255 arası PWM parlaklığına haritalandır:
  int brightness = map(sensorValue, 200, 900, 255, 0);
  brightness = constrain(brightness, 0, 255);

  analogWrite(LED_PIN, brightness); // Ortam karardıkça LED parlar

  Serial.print("Ham ADC: ");
  Serial.print(sensorValue);
  Serial.print(" | LED PWM: ");
  Serial.println(brightness);

  delay(50);
}`,
        },
      },
    ],
    quiz: {
      question: "Standart bir Arduino Uno (ATmega328P) analog giriş pinine 2.5V gerilim uygulandığında analogRead() fonksiyonu yaklaşık hangi değeri döndürür?",
      options: ["A) 255", "B) 512", "C) 1023", "D) 50"],
      correctIndex: 1,
      explanation: "Doğru! 10-bit ADC çözünürlüğünde (0-1023) 5V tam skaladır; dolayısıyla 2.5V tam orta değer olan 511-512'ye denk gelir.",
    },
  },

  "arduino-pwm-motors": {
    id: "arduino-pwm-motors",
    badge: "Modül 3 • Motorlar & Aktüatörler",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "PWM ile Servo ve DC Motor Hız / Açı Kontrolü",
    subtitle: "Darbe Genişlik Modülasyonu (PWM), Servo.h kütüphanesi (1ms-2ms darbe), L298N / TB6612FNG DC motor H-Köprüsü.",
    sections: [
      {
        title: "1. PWM (Pulse Width Modulation) Nedir?",
        content: `Arduino analog bir voltaj üretemez; bunun yerine voltajı çok hızlı açıp kapatarak ortalama gerilimi değiştirir. Buna **Görev Döngüsü (Duty Cycle)** denir:
- \`analogWrite(pin, 0)\`   $\\rightarrow$ %0 Duty (0V)
- \`analogWrite(pin, 127)\` $\\rightarrow$ %50 Duty (Ortalama 2.5V)
- \`analogWrite(pin, 255)\` $\\rightarrow$ %100 Duty (5V)`,
      },
      {
        title: "2. RC Servo Motor Açı Kontrolü (Servo.h)",
        content: `Standart RC servolar (SG90, MG996R) 50 Hz (20 ms periyot) PWM sinyali ile kontrol edilir:
- **1.0 ms darbe:** $0^\\circ$ açı
- **1.5 ms darbe:** $90^\\circ$ orta konum
- **2.0 ms darbe:** $180^\\circ$ açı`,
        code: {
          language: "cpp",
          caption: "servo_sweep.ino - Servo Süpürme",
          snippet: `#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9); // Pin 9'a bağlı servo
}

void loop() {
  // 0 dereceden 180 dereceye yumuşak hareket:
  for (int pos = 0; pos <= 180; pos += 1) {
    myServo.write(pos);
    delay(15);
  }
  // 180 dereceden 0 dereceye geri dönüş:
  for (int pos = 180; pos >= 0; pos -= 1) {
    myServo.write(pos);
    delay(15);
  }
}`,
        },
      },
    ],
    quiz: {
      question: "Arduino'da 'analogWrite(pin, 127);' komutu uygulandığında PWM sinyalinin görev döngüsü (Duty Cycle) yaklaşık yüzde kaçtır?",
      options: ["A) %10", "B) %25", "C) %50", "D) %100"],
      correctIndex: 2,
      explanation: "Doğru! 8-bit PWM (0-255) skalasında 127/255 yaklaşık %50 Duty Cycle'a denk gelir.",
    },
  },

  "arduino-i2c-lcd": {
    id: "arduino-i2c-lcd",
    badge: "Modül 3 • Ekranlar & Göstergeler",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "I2C LCD ve OLED Ekranlarda Metin / Grafik Gösterme",
    subtitle: "2 kabloyla haberleşme (SDA / SCL), PCF8574 I2C modülü, 16x2 LCD ve SSD1306 128x64 OLED ekran kütüphaneleri.",
    sections: [
      {
        title: "1. I2C Protokolü Neden Hayat Kurtarır?",
        content: `Klasik bir 16x2 LCD ekranı Arduino'ya bağlamak için en az 6-8 dijital pin feda etmek gerekir. 

Arkasına lehimlenen **PCF8574 I2C modülü** sayesinde yalnızca iki kablo ile haberleşilir:
- **SDA (Veri Hattı):** Arduino Uno'da Pin A4
- **SCL (Saat Hattı):** Arduino Uno'da Pin A5

Aynı iki hatta 127 farklı sensör ve ekran paralel bağlanabilir!`,
        code: {
          language: "cpp",
          caption: "lcd_i2c_demo.ino",
          snippet: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Standart I2C adresi çoğunlukla 0x27 veya 0x3F'dir:
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  lcd.init();
  lcd.backlight(); // Arka ışığı yak

  lcd.setCursor(0, 0); // 1. Satır, 1. Sütun
  lcd.print("learn.tncy.dev");

  lcd.setCursor(0, 1); // 2. Satır
  lcd.print("I2C LCD Hazir!");
}

void loop() {
  // Canlı sayaç:
  lcd.setCursor(11, 1);
  lcd.print(millis() / 1000);
  delay(1000);
}`,
        },
      },
    ],
    quiz: {
      question: "Arduino Uno kartında donanımsal I2C haberleşmesi için kullanılan SDA ve SCL hatları hangi analog pinlerde yer alır?",
      options: [
        "A) A0 ve A1",
        "B) A2 ve A3",
        "C) A4 (SDA) ve A5 (SCL)",
        "D) Pin 0 ve Pin 1",
      ],
      correctIndex: 2,
      explanation: "Doğru! ATmega328P mimarisinde Pin A4 SDA (Serial Data), Pin A5 ise SCL (Serial Clock) hattıdır.",
    },
  },

  // ========================================================
  // MICROPYTHON (ESP32 & PICO)
  // ========================================================
  "micropython-intro": {
    id: "micropython-intro",
    badge: "Modül 1 • MicroPython Temelleri",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "MicroPython ile ESP32 & Pico Donanım Kontrolü",
    subtitle: "Python sadeliği mikrodenetleyicilerde: machine modülü, GPIO kontrolü ve zamanlama döngüleri.",
    sections: [
      {
        title: "1. MicroPython Nedir?",
        content: `MicroPython, CPython 3'ün mikrodenetleyiciler için optimize edilmiş, C ile yazılmış son derece hafif bir açık kaynaklı yorumlayıcısıdır. Derleme yapmaya gerek kalmadan kodunuzu karta yüklediğiniz anda çalıştırır.`,
        code: {
          language: "python",
          caption: "blink.py - MicroPython LED Yakma",
          snippet: `from machine import Pin
import time

# ESP32 dahili LED (GPIO 2)
led = Pin(2, Pin.OUT)

while True:
    led.value(1) # LED Yak (HIGH)
    time.sleep(0.5)
    led.value(0) # LED Söndür (LOW)
    time.sleep(0.5)`,
        },
      },
    ],
    quiz: {
      question: "MicroPython'da bir GPIO pinini çıkış olarak ayarlamak için hangi yapı kullanılır?",
      options: [
        "A) Pin(pin_no, Pin.OUT)",
        "B) pinMode(pin_no, OUTPUT)",
        "C) GPIO.setup(pin_no, 'out')",
        "D) digital.out(pin_no)",
      ],
      correctIndex: 0,
      explanation: "Doğru! machine.Pin sınıfında 'Pin(pin_no, Pin.OUT)' ifadesi pini dijital çıkış olarak konfigüre eder.",
    },
  },

  "micropython-repl": {
    id: "micropython-repl",
    badge: "Modül 1 • REPL & Geliştirme",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "REPL Etkileşimli Kabuk ve Thonny IDE Kullanımı",
    subtitle: "Kodu derlemeden satır satır çalıştırma, boot.py vs main.py yaşam döngüsü ve dosya sistemi yönetimi.",
    sections: [
      {
        title: "1. REPL (Read-Eval-Print Loop) Sihri",
        content: `Klasik C++ geliştirmede tek satır bir kodu test etmek için tüm projeyi yeniden derleyip flaş belleğe yazmanız gerekir.

MicroPython'da ise seri port üzerinden karta bağlandığınızda karşınıza etkileşimli bir Python komut istemi (\`>>>\`) çıkar (**REPL**):
\`\`\`python
>>> from machine import Pin
>>> p = Pin(2, Pin.OUT)
>>> p.value(1) # Enter'a bastığınız an karttaki LED fiziksel olarak yanar!
\`\`\``,
      },
      {
        title: "2. Kartın Başlangıç Dosyaları: boot.py ve main.py",
        content: `MicroPython kartı açıldığında iki dosyayı sırayla çalıştırır:
1. **\`boot.py\`:** Donanım ilk açıldığında çalışır. Wi-Fi bağlantısı veya düşük seviyeli ayarlar buraya konur.
2. **\`main.py\`:** \`boot.py\` bittikten hemen sonra ana uygulamanız olarak devreye girer. Kartı bilgisayardan ayırıp pille çalıştırdığınızda çalışan dosya budur.`,
      },
    ],
    quiz: {
      question: "MicroPython yüklü bir ESP32 kartı elektriğe bağlandığında otomatik olarak çalışan ana uygulama dosyasının adı nedir?",
      options: ["A) app.py", "B) main.py", "C) index.py", "D) firmware.bin"],
      correctIndex: 1,
      explanation: "Doğru! MicroPython sisteminde ana program mantığı 'main.py' dosyasına kaydedilir ve açılışta otomatik icra edilir.",
    },
  },

  "micropython-adc-pwm": {
    id: "micropython-adc-pwm",
    badge: "Modül 2 • Analog & PWM",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Analog Okuma (ADC) ve PWM ile Motor/LED Kontrolü",
    subtitle: "ESP32 12-bit ADC (0-4095), voltaj zayıflatma (attenuation: 3.3V ölçeği) ve PWM duty cycle sürme.",
    sections: [
      {
        title: "1. ESP32 12-bit ADC ve Zayıflatma (Attenuation)",
        content: `ESP32 ADC'si varsayılan olarak yalnızca 0V ile 1.1V arasındaki gerilimleri okuyabilir. 3.3V tam ölçeği okumak için zayıflatma seviyesi **\`ADC.ATTN_11DB\`** olarak ayarlanmalıdır:`,
        code: {
          language: "python",
          caption: "adc_pwm.py - Potansiyometre ile LED Parlaklığı",
          snippet: `from machine import Pin, ADC, PWM
import time

# 1. Analog Giriş (Potansiyometre - GPIO 34)
pot = ADC(Pin(34))
pot.atten(ADC.ATTN_11DB)       # 0 - 3.3V ölçüm aralığı
pot.width(ADC.WIDTH_12BIT)     # 0 - 4095 çözünürlük

# 2. PWM Çıkışı (LED - GPIO 4)
led_pwm = PWM(Pin(4))
led_pwm.freq(1000) # 1 kHz frekans

while True:
    val = pot.read() # 0 - 4095
    # ESP32 PWM duty aralığı 0 - 1023'tür (MicroPython ESP32 portu):
    duty = int(val / 4)
    led_pwm.duty(duty)
    
    print(f"Pot: {val} | Voltaj: {(val/4095)*3.3:.2f}V | Duty: {duty}")
    time.sleep(0.1)`,
        },
      },
    ],
    quiz: {
      question: "ESP32'de MicroPython ile 3.3V analog voltajı tam skalada okumak için ADC zayıflatma ayarı (attenuation) ne yapılmalıdır?",
      options: [
        "A) ADC.ATTN_0DB",
        "B) ADC.ATTN_2_5DB",
        "C) ADC.ATTN_11DB",
        "D) ADC.ATTN_OFF",
      ],
      correctIndex: 2,
      explanation: "Doğru! ADC.ATTN_11DB zayıflatması maksimum giriş voltaj aralığını yaklaşık 3.3V seviyesine genişletir.",
    },
  },

  "micropython-sensors-i2c": {
    id: "micropython-sensors-i2c",
    badge: "Modül 2 • Çevre Sensörleri",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "I2C ve SPI ile Çevre Sensörleri (DHT22, BMP280) Okuma",
    subtitle: "I2C veri yolu tarama (i2c.scan()), sıcaklık/nem sensörleri ve barometrik basınçtan irtifa hesabı.",
    sections: [
      {
        title: "1. I2C Otomatik Cihaz Taraması",
        content: `ESP32'de I2C pinleri yazılımsal veya donanımsal olarak herhangi bir GPIO'ya atanabilir:`,
        code: {
          language: "python",
          caption: "i2c_scan.py",
          snippet: `from machine import Pin, I2C

# ESP32 varsayılan: SDA=GPIO21, SCL=GPIO22
i2c = I2C(0, scl=Pin(22), sda=Pin(21), freq=400000)

devices = i2c.scan()
print("Bulunan I2C Cihaz Adresleri:")
for d in devices:
    print(f"Hex Adres: {hex(d)}")`,
        },
      },
      {
        title: "2. DHT22 Sıcaklık ve Nem Sensörü",
        content: `MicroPython dahili bir \`dht\` kütüphanesine sahiptir:`,
        code: {
          language: "python",
          caption: "dht22_read.py",
          snippet: `from machine import Pin
import dht
import time

sensor = dht.DHT22(Pin(15))

while True:
    try:
        sensor.measure()
        sicaklik = sensor.temperature()
        nem = sensor.humidity()
        print(f"Sıcaklık: {sicaklik:.1f}°C | Bağıl Nem: %{nem:.1f}")
    except OSError as e:
        print("Sensör okuma hatası!")
    time.sleep(2)`,
        },
      },
    ],
    quiz: {
      question: "MicroPython'da I2C veri yoluna bağlı aktif tüm cihazların adreslerini bulmak için hangi metot çağrılır?",
      options: ["A) i2c.find()", "B) i2c.scan()", "C) i2c.search()", "D) i2c.ping()"],
      correctIndex: 1,
      explanation: "Doğru! i2c.scan() metodu veri yolundaki tüm adresleri yoklayarak yanıt veren cihazların hex adres listesini döndürür.",
    },
  },

  "micropython-wifi-mqtt": {
    id: "micropython-wifi-mqtt",
    badge: "Modül 3 • IoT & Bulut",
    readingTime: "9 dk okuma",
    level: "Orta Seviye",
    title: "Wi-Fi Bağlantısı ve MQTT ile Telemetri Gönderimi",
    subtitle: "network.WLAN istemcisi, MQTT Publish/Subscribe protokolü ve Node-RED / Home Assistant entegrasyonu.",
    sections: [
      {
        title: "1. Wi-Fi Ağına Bağlanma Şablonu",
        content: `ESP32'nin yerleşik Wi-Fi çipi \`network\` modülü ile kontrol edilir:`,
        code: {
          language: "python",
          caption: "wifi_connect.py",
          snippet: `import network
import time

def wifi_baglan(ssid, sifre):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print(f"'{ssid}' ağına bağlanılıyor...")
        wlan.connect(ssid, sifre)
        timeout = 10
        while not wlan.isconnected() and timeout > 0:
            time.sleep(1)
            timeout -= 1
            
    if wlan.isconnected():
        print("Bağlandı! IP Adresi:", wlan.ifconfig()[0])
        return True
    else:
        print("Bağlantı başarısız!")
        return False`,
        },
      },
      {
        title: "2. umqtt.simple ile Telemetri Yayını",
        content: `MQTT, IoT cihazları için hafif bir yayın/abone (Publish/Subscribe) mesajlaşma protokolüdür:`,
        code: {
          language: "python",
          caption: "mqtt_publisher.py",
          snippet: `from umqtt.simple import MQTTClient
import ujson

BROKER = "broker.hivemq.com"
CLIENT_ID = "esp32_hava_istasyonu"
TOPIC = b"ev/salon/telemetri"

client = MQTTClient(CLIENT_ID, BROKER)
client.connect()
print("MQTT Broker'a bağlanıldı!")

veri = {"sicaklik": 24.5, "nem": 55, "cihaz": "ESP32"}
client.publish(TOPIC, ujson.dumps(veri).encode())
print("Telemetri yayınlandı!")
client.disconnect()`,
        },
      },
    ],
    quiz: {
      question: "MicroPython'da ESP32'yi standart bir Wi-Fi istemcisi (modem/router'a bağlanan cihaz) olarak yapılandırmak için hangi mod seçilir?",
      options: [
        "A) network.AP_IF (Erişim Noktası)",
        "B) network.STA_IF (İstasyon Modu)",
        "C) network.MESH_IF",
        "D) network.BLUETOOTH_IF",
      ],
      correctIndex: 1,
      explanation: "Doğru! STA_IF (Station Interface) cihazın bir kablosuz ağa istemci olarak bağlanmasını sağlar; AP_IF ise cihazın kendisinin bir Wi-Fi erişim noktası yaymasını sağlar.",
    },
  },

  "micropython-web-server": {
    id: "micropython-web-server",
    badge: "Modül 3 • Gömülü Web",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Mikrodenetleyici Üzerinde Web Sunucusu (Socket & HTTP)",
    subtitle: "usocket modülü ile yerel ağda HTML arayüz sunma ve tarayıcı butonlarıyla röle / LED kontrolü.",
    sections: [
      {
        title: "1. Mikro Web Sunucusu Mimarisi",
        content: `ESP32 üzerinde doğrudan 80 numaralı porttan HTTP isteklerini dinleyen hafif bir soket sunucusu ayağa kaldırabiliriz. Bir akıllı telefon veya bilgisayar tarayıcısından ESP32'nin IP adresine girildiğinde interaktif bir kontrol paneli açılır.`,
        code: {
          language: "python",
          caption: "web_server.py - ESP32 Web Kontrol Paneli",
          snippet: `import usocket as socket
from machine import Pin

led = Pin(2, Pin.OUT)

def web_sayfasi(led_durum):
    durum_metni = "AÇIK" if led_durum else "KAPALI"
    html = f"""<!DOCTYPE html>
<html>
<head><title>ESP32 Kontrol Paneli</title><meta charset="utf-8"></head>
<body style="font-family:sans-serif; text-align:center; padding:50px;">
  <h1>ESP32 Röle & LED Kontrolü</h1>
  <p>Mevcut Durum: <strong>{durum_metni}</strong></p>
  <p><a href="/?led=on"><button style="padding:15px 30px; font-size:18px; background:#4CAF50; color:white;">AÇ</button></a></p>
  <p><a href="/?led=off"><button style="padding:15px 30px; font-size:18px; background:#f44336; color:white;">KAPAT</button></a></p>
</body>
</html>"""
    return html

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('', 80))
s.listen(5)
print("Web Sunucusu 80 portunda dinliyor...")

while True:
    conn, addr = s.accept()
    request = conn.recv(1024).decode()
    if '/?led=on' in request:
        led.value(1)
    elif '/?led=off' in request:
        led.value(0)
    
    response = web_sayfasi(led.value())
    conn.send('HTTP/1.1 200 OK\\nContent-Type: text/html\\nConnection: close\\n\\n')
    conn.sendall(response.encode())
    conn.close()`,
        },
      },
    ],
    quiz: {
      question: "Web tarayıcılarının web sitelerine bağlanırken standart olarak kullandığı varsayılan HTTP port numarası kaçtır?",
      options: ["A) 21", "B) 22", "C) 80", "D) 443 (HTTPS)"],
      correctIndex: 2,
      explanation: "Doğru! Standart şifresiz HTTP protokolü 80 numaralı port üzerinden çalışır.",
    },
  },
};
