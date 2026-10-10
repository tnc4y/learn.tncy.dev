import { LessonContent } from "./lessonsData";

export const EMBEDDED_C_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // 1. GÖMÜLÜ C GİRİŞ & BİT DÜZEYİNDE KONTROL
  // ========================================================
  "embedded-c-intro": {
    id: "embedded-c-intro",
    badge: "Modül 1 • Gömülü C Temelleri",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Gömülü C ve Bit Düzeyinde Donanım Kontrolü",
    subtitle: "Mikrodenetleyici register erişimi: Bitwise mantık operatörleri, işaretçiler (pointers) ve donanım register adresleme.",
    sections: [
      {
        title: "1. Masaüstü C ile Gömülü C Arasındaki Temel Farklar",
        content: `Standart bir C programı (örneğin Linux veya Windows üzerinde koşan) işletim sisteminin bellek koruması altındadır. Belleğe doğrudan adres yazmaya çalıştığınızda işletim sistemi \`Segmentation Fault\` hatası vererek programınızı kapatır.

Oysa **Gömülü C (Embedded C)** dünyasında çoğunlukla bir işletim sistemi (OS) bulunmaz (**Bare-Metal**). Yazdığınız C kodu doğrudan mikrodenetleyicinin (ARM Cortex-M, AVR, RISC-V) fiziksel adres alanına erişir.

Mikrodenetleyicinin bir bacağını (GPIO) 3.3V seviyesine çekmek veya bir zamanlayıcıyı (Timer) başlatmak; o donanıma tahsis edilmiş özel bir RAM adresindeki (**Memory-Mapped Register**) belirli bir biti \`1\` veya \`0\` yapmak demektir.`,
        callout: {
          type: "info",
          title: "Memory-Mapped I/O (MMIO)",
          message: "ARM Cortex-M mimarisinde donanım çevre birimleri (GPIO, UART, I2C, SPI) normal RAM gibi adreslenir. Örneğin 0x40020000 adresine bir byte yazmak fiziksel bir çip bacağının voltajını değiştirir.",
        },
      },
      {
        title: "2. Bit Düzeyinde Register Manipülasyonu",
        content: `Bir mikrodenetleyici register'ında genellikle 8, 16 veya 32 adet farklı kontrol biti bulunur. Bir pini açarken diğer pinlerin ayarını bozmamak için **Bit Maskeleme (Bitmasking)** kullanılır:`,
        code: {
          language: "c",
          caption: "bit_manipulation.c - Standart Bit İşlemleri",
          snippet: `// 1. Biti 1 Yap (Bit Set - OR operatörü):
PORTB |= (1 << 5); // 5. biti 1 yapar, diğer bitleri korur

// 2. Biti 0 Yap (Bit Clear - AND NOT operatörü):
PORTB &= ~(1 << 5); // 5. biti 0 yapar, diğer bitleri korur

// 3. Biti Tersle (Bit Toggle - XOR operatörü):
PORTB ^= (1 << 5); // 5. bit 1 ise 0, 0 ise 1 yapar

// 4. Biti Oku (Bit Check):
if (PINB & (1 << 5)) {
    // 5. bit lojik 1 durumundadır
}`,
        },
      },
    ],
    quiz: {
      question: "Gömülü C'de bir register içindeki 3. biti diğer bitleri değiştirmeden '1' yapmak için hangi ifade kullanılır?",
      options: [
        "A) REG &= (1 << 3);",
        "B) REG |= (1 << 3);",
        "C) REG ^= (1 << 3);",
        "D) REG = 3;",
      ],
      correctIndex: 1,
      explanation: "Doğru! 'REG |= (1 << 3);' ifadesi bitwise OR mantığıyla 3. biti 1 yapar ve diğer tüm bitleri olduğu gibi korur.",
    },
  },

  // ========================================================
  // 2. STDINT.H TİPLERİ & ENDIANNESS
  // ========================================================
  "embedded-c-data-types": {
    id: "embedded-c-data-types",
    badge: "Modül 1 • Veri Tipleri & Mimari",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "stdint.h Tipleri (uint8_t, int32_t) ve Endianness",
    subtitle: "Taşınabilir gömülü kodlama: Belirsiz 'int' yerine sabit genişlikli tipler, bellek dizilimi ve struct padding kuralları.",
    sections: [
      {
        title: "1. Neden 'int' veya 'long' Yerine 'stdint.h'?",
        content: `Standart C dilinde \`int\` tipinin boyutu derleyiciye ve mikrodenetleyici mimarisine göre değişir:
- 8-bit AVR mimarisinde (Arduino Uno): \`sizeof(int) = 2 byte (16 bit)\`
- 32-bit ARM Cortex-M mimarisinde (STM32, RP2040): \`sizeof(int) = 4 byte (32 bit)\`

Eğer donanım register'ına 16-bit veri yazarken sadece \`int\` kullanırsanız, kodunuzu başka bir karta taşıdığınızda program çöker.

Bu ölümcül belirsizliği önlemek için C99 standardında **\`<stdint.h>\`** kütüphanesi getirilmiştir:
- \`uint8_t\` : 8-bit işaretsiz tamsayı (0 ile 255)
- \`int8_t\`  : 8-bit işaretli tamsayı (-128 ile +127)
- \`uint16_t\`: 16-bit işaretsiz tamsayı (0 ile 65.535)
- \`uint32_t\`: 32-bit işaretsiz tamsayı (0 ile 4.294.967.295)`,
      },
      {
        title: "2. Endianness: Little-Endian vs Big-Endian",
        content: `Birden fazla byte tutan bir veri (örneğin \`0x12345678\`) belleğe yazılırken byte'ların sırası donanım mimarisine bağlıdır:

- **Little-Endian (ARM Cortex-M, x86, RISC-V):** En düşük değerlikli byte (Least Significant Byte - LSB) en düşük bellek adresine yazılır.
  - Adres \`0x00\`: \`0x78\`
  - Adres \`0x01\`: \`0x56\`
  - Adres \`0x02\`: \`0x34\`
  - Adres \`0x03\`: \`0x12\`
- **Big-Endian (Ağ Protokolleri - TCP/IP, Eski PowerPC):** En yüksek değerlikli byte (MSB) ilk adrese yazılır: \`0x12, 0x34, 0x56, 0x78\`.`,
        code: {
          language: "c",
          caption: "endian_test.c - Çipin Endianness Yapısını Test Etme",
          snippet: `#include <stdio.h>
#include <stdint.h>

void check_endianness(void) {
    uint32_t val = 0x01;
    uint8_t *byte_ptr = (uint8_t *)&val;

    if (*byte_ptr == 0x01) {
        // İlk adreste 0x01 varsa:
        // Sistem Little-Endian mimarisidir (ARM Cortex-M gibi)
    } else {
        // Sistem Big-Endian mimarisidir
    }
}`,
        },
      },
      {
        title: "3. Bellek Hizalama (Alignment) ve Struct Packing",
        content: `32-bit işlemciler veriye 4-byte'ın katı olan adreslerden çok daha hızlı erişir. Bu yüzden derleyici struct içine görünmez boşluklar (**padding**) ekler. Donanım paketlerinde veya haberleşmede byte kaymalarını önlemek için \`__attribute__((packed))\` kullanılır.`,
        code: {
          language: "c",
          caption: "packed_struct.c - Bayt Kaymasını Önleme",
          snippet: `// Derleyici bu struct'ı otomatik 8 byte yapabilir (padding ile)
typedef struct {
    uint8_t  sensor_id; // 1 byte
    // 3 byte boşluk (padding) eklenebilir!
    uint32_t raw_value; // 4 byte
} UnpackedData;

// __attribute__((packed)) ile tam 5 byte olması zorlanır:
typedef struct __attribute__((packed)) {
    uint8_t  sensor_id; // 1 byte
    uint32_t raw_value; // 4 byte
} TelemetryPacket; // Tam 5 byte!`,
        },
      },
    ],
    quiz: {
      question: "ARM Cortex-M ve x86 gibi Little-Endian mimarilerde 0xAABBCCDD değeri belleğe yazıldığında en düşük adreste hangi bayt yer alır?",
      options: [
        "A) 0xAA",
        "B) 0xBB",
        "C) 0xCC",
        "D) 0xDD",
      ],
      correctIndex: 3,
      explanation: "Doğru! Little-Endian mimarisinde en düşük değerlikli bayt (LSB olan 0xDD) en düşük bellek adresine yazılır.",
    },
  },

  // ========================================================
  // 3. BELLEK HARİTALI I/O (MMIO) & POINTER ARİTMETİĞİ
  // ========================================================
  "embedded-c-pointers-mmio": {
    id: "embedded-c-pointers-mmio",
    badge: "Modül 2 • Bellek & İşaretçiler",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Bellek Haritalı I/O (MMIO) ve Pointer Aritmetiği",
    subtitle: "Ham 32-bit heksadesimal donanım adreslerini C işaretçilerine (pointers) dönüştürme ve çevre birimi sürme sanatı.",
    sections: [
      {
        title: "1. Donanım Register'ına C Pointer ile Ulaşma",
        content: `Mikrodenetleyici üreticisinin veri sayfasını (Datasheet / Reference Manual) açtığınızda örneğin şunu görürsünüz:
- **Port A Çıkış Register'ı (ODR):** Adres = \`0x40020014\`

Bu adrese C dilinde doğrudan bir sayı olarak yazamayız. Adresi bir donanım işaretçisine (pointer) dönüştürmek (typecast) gerekir:`,
        code: {
          language: "c",
          caption: "mmio_access.c - Ham Adrese Doğrudan Yazma",
          snippet: `#define GPIOA_ODR  (*((volatile uint32_t *)0x40020014))

void led_ac(void) {
    GPIOA_ODR |= (1 << 5); // 0x40020014 adresindeki 5. biti 1 yap
}

void led_kapat(void) {
    GPIOA_ODR &= ~(1 << 5); // 0x40020014 adresindeki 5. biti 0 yap
}`,
        },
      },
      {
        title: "2. CMSIS Standart Register Struct Modeli",
        content: `Her register için tek tek \`#define\` yazmak yerine ARM standardı **CMSIS (Cortex Microcontroller Software Interface Standard)** yapısı kullanılır.

Çevre biriminin register'ları bir \`struct\` içinde sıralı tanımlanır. C dilinde struct elemanları bellekte ardışık yerleştiği için çevre biriminin taban adresi (Base Address) bu struct'a dönüştürülür:`,
        code: {
          language: "c",
          caption: "cmsis_gpio.h - CMSIS Biçiminde Register Eşleme",
          snippet: `typedef struct {
    volatile uint32_t MODER;   // Offset 0x00: Mod Register (Giriş/Çıkış)
    volatile uint32_t OTYPER;  // Offset 0x04: Çıkış Tipi (Push-pull / Open-drain)
    volatile uint32_t OSPEEDR; // Offset 0x08: Hız Registerı
    volatile uint32_t PUPDR;   // Offset 0x0C: Pull-up / Pull-down
    volatile uint32_t IDR;     // Offset 0x10: Giriş Veri Registerı
    volatile uint32_t ODR;     // Offset 0x14: Çıkış Veri Registerı
} GPIO_TypeDef;

// Taban Adresler (Base Addresses)
#define GPIOA_BASE  (0x40020000UL)
#define GPIOA       ((GPIO_TypeDef *) GPIOA_BASE)

// Kullanımı son derece temizdir:
void gpio_init(void) {
    GPIOA->MODER |= (1 << 10);  // Pin 5 çıkış
    GPIOA->ODR   |= (1 << 5);   // Pin 5 HIGH
}`,
        },
      },
    ],
    quiz: {
      question: "C dilinde '#define REG (*((volatile uint32_t *)0x40001000))' ifadesindeki '*' (dereference) işaretinin amacı nedir?",
      options: [
        "A) 0x40001000 sayısını çarpmak",
        "B) Adresin kendisini değil, o adresin işaret ettiği bellek hücresindeki değeri okuma/yazma yapılabilir kılmak",
        "C) Adresi geçersiz kılmak",
        "D) Kesmeleri devre dışı bırakmak",
      ],
      correctIndex: 1,
      explanation: "Doğru! Dereference operatörü (*), bellek adresinin işaret ettiği donanım register hücresine doğrudan erişip veri yazmayı/okumayı sağlar.",
    },
  },

  // ========================================================
  // 4. BİT MASKELEME OPERATÖRLERİ & MAKROLAR
  // ========================================================
  "embedded-c-bitwise": {
    id: "embedded-c-bitwise",
    badge: "Modül 2 • Bitwise Mantık",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Bit Maskeleme: Set, Clear, Toggle ve Shift Operatörleri",
    subtitle: "Bitwise operatörlerin matematiksel temelleri, çoklu bit alanı temizleme/yazma ve endüstriyel makro şablonları.",
    sections: [
      {
        title: "1. Çoklu Bit Alanı Güncelleme (Read-Modify-Write)",
        content: `Bir register'da bazen tek bir bit değil, 2 veya 4 bitlik bir konfigürasyon alanı bulunur (örneğin pin hızını belirleyen 2-bitlik alan: \`00=2MHz\`, \`01=10MHz\`, \`11=50MHz\`).

Buraya yeni değer yazmadan önce o 2 biti **önce sıfırlamak (mask clearing)**, ardından yeni değeri VEYAlamak (OR) zorundayız:`,
        code: {
          language: "c",
          caption: "bitfield_update.c - Çoklu Bit Alanı Değiştirme",
          snippet: `// Pin 5'in MODER alanını (10. ve 11. bitler) '01' (Genel Çıkış) yapmak:
#define GPIO_MODER_PIN5_MASK  (0x3UL << (5 * 2)) // 10. ve 11. bitler maskesi (0b11)

// 1. ADIM: Eski konfigürasyonu temizle (Clear):
GPIOA->MODER &= ~GPIO_MODER_PIN5_MASK;

// 2. ADIM: Yeni modu yerleştir (Set):
GPIOA->MODER |= (0x1UL << (5 * 2)); // 01 modunu yaz`,
        },
      },
      {
        title: "2. Pratik Bit Makroları",
        content: `Gömülü C projelerinde okunabilirliği artırmak için standart makrolar tanımlanır:`,
        code: {
          language: "c",
          caption: "bit_macros.h - Standart Gömülü Bit Makroları",
          snippet: `#define BV(bit)               (1UL << (bit))
#define BIT_SET(reg, bit)     ((reg) |= BV(bit))
#define BIT_CLEAR(reg, bit)   ((reg) &= ~BV(bit))
#define BIT_TOGGLE(reg, bit)  ((reg) ^= BV(bit))
#define BIT_CHECK(reg, bit)   (!!((reg) & BV(bit)))

// Örnek kullanım:
BIT_SET(PORTB, 7);    // 7. pini yak
BIT_TOGGLE(PORTB, 7); // 7. pini tersle`,
        },
      },
    ],
    quiz: {
      question: "Bir register'daki 4. ve 5. bitleri sıfırlamak (clear etmek) için hangi bit maskesi ile AND (&) işlemi yapılmalıdır?",
      options: [
        "A) ~(0x30)",
        "B) (1 << 4) | (1 << 5)",
        "C) 0xFF",
        "D) ~(0x03)",
      ],
      correctIndex: 0,
      explanation: "Doğru! 4. ve 5. bitler ikilikte (1<<4 | 1<<5) = 0b00110000 = 0x30'dur. Sıfırlamak için bunun tersi olan ~(0x30) ile AND işlemi yapılır.",
    },
  },

  // ========================================================
  // 5. VOLATILE NİTELEYİCİSİ & KESMELER (ISR)
  // ========================================================
  "embedded-c-volatile-isr": {
    id: "embedded-c-volatile-isr",
    badge: "Modül 3 • Kesmeler & volatile",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "volatile Niteleyicisi ve Kesme Servis Rutinleri (ISR)",
    subtitle: "Derleyici optimizasyonlarının donanım kodunu bozmasını engelleme, bayrak paylaşımı ve kesme işleyicisi kuralları.",
    sections: [
      {
        title: "1. 'volatile' Anahtar Kelimesi Neden Hayatidir?",
        content: `Modern C derleyicileri (\`gcc -O2\` veya \`-O3\`) kodu hızlandırmak için agresif optimizasyonlar yapar.

Eğer bir değişkenin değerini program kodu içinde değiştiren bir satır görmezse, o değişkeni işlemcinin hızlı yazmacına (CPU Register) önbelleğe alır ve RAM'den tekrar okumaz.

Fakat gömülü sistemlerde bir değişken:
1. Fiziksel bir donanım çevre birimi (örneğin UART veri register'ı) olabilir.
2. Bir **Kesme Servis Rutini (ISR - Interrupt Service Routine)** tarafından arka planda değiştiriliyor olabilir.

İşte bu durumlarda derleyiciye *"Bu değişkene her eriştiğinde belleğe/adrese git, CPU register'ında önbelleğe alma!"* demek için **\`volatile\`** kullanılır.`,
        code: {
          language: "c",
          caption: "volatile_trap.c - Derleyici Optimizasyonu Tuzağı",
          snippet: `// HATALI KOD (volatile yok):
uint8_t flag = 0;

void USART_IRQHandler(void) {
    flag = 1; // Kesme geldiğinde flag 1 olur
}

int main(void) {
    while (flag == 0) {
        // Derleyici burayı sonsuz döngüye çevirir!
        // Çünkü döngü içinde flag'in değiştiğini göremez.
    }
    return 0;
}

// DOĞRU KOD:
volatile uint8_t flag = 0; // Derleyici her defasında RAM'den okumak zorundadır`,
        },
      },
      {
        title: "2. Kesme Servis Rutinleri (ISR) Kuralları",
        content: `Donanım kesmeleri (External Pin, Timer Overflow, UART Receive) meydana geldiğinde CPU o an yaptığı işi durdurur ve ISR fonksiyonuna dalar.

Kritik ISR Kuralları:
- **ISR Mümkün Olduğunca Kısa Olmalıdır:** Asla \`delay()\`, karmaşık matematik veya printf gibi yavaş fonksiyonlar konulmamalıdır.
- **Sadece Bayrak (Flag) Kaldırılmalıdır:** ISR içinde bayrak set edilir (\`data_ready = 1\`), asıl veri işleme \`main()\` döngüsünde yapılır.
- **Bellek Tahsisi (malloc/free) Yapılmamalıdır.**`,
      },
    ],
    quiz: {
      question: "Gömülü C'de bir kesme fonksiyonu (ISR) ile ana döngü (main) arasında paylaşılan bir bayrak değişkeninin başına hangi anahtar kelime eklenmelidir?",
      options: [
        "A) static",
        "B) volatile",
        "C) const",
        "D) register",
      ],
      correctIndex: 1,
      explanation: "Doğru! 'volatile' niteleyicisi, derleyicinin değişkeni CPU yazmacında önbelleğe almasını önleyerek her seferinde gerçek bellek adresinden okunmasını garanti eder.",
    },
  },

  // ========================================================
  // 6. KRİTİK BÖLGELER & KESME YÖNETİMİ
  // ========================================================
  "embedded-c-critical-sections": {
    id: "embedded-c-critical-sections",
    badge: "Modül 3 • Eşzamanlılık & Güvenlik",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "Kritik Bölgeler ve Kesme Devre Dışı Bırakma (Cli/Sei)",
    subtitle: "Atomik olmayan çok baytlı veri transferlerinde yarış durumlarını (race condition) ve veri bozulmasını engelleme.",
    sections: [
      {
        title: "1. Atomik Olmayan İşlemler ve Yarış Durumu (Race Condition)",
        content: `8-bitlik bir işlemcide 16-bitlik veya 32-bitlik bir sayıyı güncellemek tek bir komutla yapılamaz. İşlemci önce düşük baytı yazar, sonra yüksek baytı yazar (2 ayrı makine komutu).

Eğer tam düşük bayt yazıldıktan sonra araya bir donanım kesmesi girer ve o sayıyı okursa:
- Eski yüksek bayt ile yeni düşük bayt birleşir!
- Veri tamamen saçmalar ve sistem beklenmedik şekilde kilitlenir.

Bölünemeyen, tek saat darbesinde biten işlemlere **Atomik (Atomic)** işlem denir. Birden fazla komut süren paylaşımlı işlemlere ise **Kritik Bölge (Critical Section)** denir.`,
      },
      {
        title: "2. Kesmeleri Devre Dışı Bırakarak Koruma",
        content: `Kritik bir veriye erişirken küresel kesmeler geçici olarak kapatılır, işlem bitince önceki haline döndürülür:`,
        code: {
          language: "c",
          caption: "critical_section.c - ARM Cortex-M Kesme Kalkanı",
          snippet: `#include <stdint.h>

volatile uint32_t sensor_timestamp; // 32-bit paylaşılan veri

// ARM Cortex-M için:
uint32_t guvenli_timestamp_oku(void) {
    uint32_t primask;
    uint32_t deger;

    // 1. Önceki kesme durumunu oku ve kesmeleri kapat
    __asm volatile ("mrs %0, primask" : "=r" (primask));
    __asm volatile ("cpsid i" : : : "memory");

    // --- KRİTİK BÖLGE BAŞLANGICI ---
    deger = sensor_timestamp; // Güvenli okuma
    // --- KRİTİK BÖLGE BİTİŞİ ---

    // 2. Kesmeleri önceki durumuna geri yükle
    __asm volatile ("msr primask, %0" : : "r" (primask) : "memory");

    return deger;
}`,
        },
      },
    ],
    quiz: {
      question: "Gömülü sistemlerde atomik olmayan (birden çok komut süren) paylaşılan bir veriye erişirken araya kesme girmesini engellemek için ne yapılır?",
      options: [
        "A) Saat frekansı iki katına çıkarılır",
        "B) Kritik bölgeye girmeden önce kesmeler geçici olarak devre dışı bırakılır (Disable Interrupts)",
        "C) malloc() ile yeni bellek açılır",
        "D) İşlemci resetlenir",
      ],
      correctIndex: 1,
      explanation: "Doğru! Kritik bölgeye girerken kesmeler devre dışı bırakılarak işlem bölünmeden (atomik olarak) tamamlanır ve ardından kesmeler tekrar açılır.",
    },
  },

  // ========================================================
  // 7. BARE-METAL GPIO SÜRÜCÜSÜ GELİŞTİRME
  // ========================================================
  "embedded-c-gpio-driver": {
    id: "embedded-c-gpio-driver",
    badge: "Modül 4 • Donanım Sürücüleri",
    readingTime: "9 dk okuma",
    level: "İleri Seviye",
    title: "Sıfırdan Bare-Metal GPIO Sürücüsü Yazma",
    subtitle: "Hiçbir HAL veya hazır kütüphane kullanmadan STM32 / ARM Cortex-M için profesyonel, yeniden kullanılabilir GPIO kütüphanesi mimarisi.",
    sections: [
      {
        title: "1. STM32 Saat Hattı (RCC) ve Güç Tasarrufu Mantığı",
        content: `ARM Cortex-M işlemcilerde güç tasarrufu için varsayılan olarak **tüm çevre birimlerinin saat sinyali (Clock) kapalıdır**.

Bir GPIO pinini kullanmadan önce Reset and Clock Control (**RCC**) biriminden o GPIO portunun saat hattını aktif etmezseniz, GPIO register'larına yazmaya çalıştığınızda işlemci kilitlenir (**BusFault**).`,
        code: {
          language: "c",
          caption: "rcc_enable.c - Port A Saat Hattını Açma",
          snippet: `#define RCC_AHB1ENR (*((volatile uint32_t *)0x40023830))
#define RCC_GPIOA_EN (1 << 0) // AHB1 bus üzerinde GPIOA biti

void gpioa_clock_enable(void) {
    RCC_AHB1ENR |= RCC_GPIOA_EN; // Port A saat sinyalini aç
}`,
        },
      },
      {
        title: "2. Profesyonel GPIO Başlık Dosyası (gpio_driver.h)",
        content: `Sürücümüzün dış dünyaya sunduğu API fonksiyonları:`,
        code: {
          language: "c",
          caption: "gpio_driver.h",
          snippet: `#ifndef GPIO_DRIVER_H
#define GPIO_DRIVER_H

#include <stdint.h>

typedef enum {
    GPIO_MODE_INPUT  = 0x00,
    GPIO_MODE_OUTPUT = 0x01,
    GPIO_MODE_AF     = 0x02,
    GPIO_MODE_ANALOG = 0x03
} GPIOMode_t;

typedef enum {
    GPIO_PIN_LOW  = 0,
    GPIO_PIN_HIGH = 1
} PinState_t;

void GPIO_Init(uint8_t pin, GPIOMode_t mode);
void GPIO_WritePin(uint8_t pin, PinState_t state);
PinState_t GPIO_ReadPin(uint8_t pin);
void GPIO_TogglePin(uint8_t pin);

#endif`,
        },
      },
      {
        title: "3. Sürücü Gövdesi (BSRR Register ile Atomik Yazma)",
        content: `STM32'de pin çıkışını değiştirmek için \`ODR\` register'ına OR/AND yapmak yerine **BSRR (Bit Set/Reset Register)** kullanılır. BSRR'ye yazmak tek saat vuruşunda **tamamen atomik** olarak pini açar veya kapatır; kesme kalkanı gerektirmez!`,
        code: {
          language: "c",
          caption: "gpio_driver.c",
          snippet: `#include "gpio_driver.h"

#define GPIOA_MODER  (*((volatile uint32_t *)0x40020000))
#define GPIOA_BSRR   (*((volatile uint32_t *)0x40020018))
#define GPIOA_IDR    (*((volatile uint32_t *)0x40020010))

void GPIO_Init(uint8_t pin, GPIOMode_t mode) {
    // 2-bitlik modu temizle ve ayarla:
    GPIOA_MODER &= ~(0x3UL << (pin * 2));
    GPIOA_MODER |= ((uint32_t)mode << (pin * 2));
}

void GPIO_WritePin(uint8_t pin, PinState_t state) {
    if (state == GPIO_PIN_HIGH) {
        GPIOA_BSRR = (1UL << pin);          // Alt 16 bit: pini 1 yapar
    } else {
        GPIOA_BSRR = (1UL << (pin + 16));   // Üst 16 bit: pini 0 yapar
    }
}

PinState_t GPIO_ReadPin(uint8_t pin) {
    return (GPIOA_IDR & (1UL << pin)) ? GPIO_PIN_HIGH : GPIO_PIN_LOW;
}

void GPIO_TogglePin(uint8_t pin) {
    if (GPIO_ReadPin(pin) == GPIO_PIN_HIGH)
        GPIO_WritePin(pin, GPIO_PIN_LOW);
    else
        GPIO_WritePin(pin, GPIO_PIN_HIGH);
}`,
        },
      },
    ],
    quiz: {
      question: "STM32 mikrodenetleyicilerinde GPIO pininin durumunu atomik olarak değiştirmek için ODR yerine neden BSRR register'ı tercih edilir?",
      options: [
        "A) BSRR register'ı pini doğrudan donanımsal olarak tek adımda set veya reset ettiği için kesme çakışmalarını önler",
        "B) BSRR daha az voltaj çeker",
        "C) ODR register'ı sadece analog pinler içindir",
        "D) BSRR sadece 8-bitliktir",
      ],
      correctIndex: 0,
      explanation: "Doğru! BSRR (Bit Set/Reset Register) yazma işlemi atomiktir; okuma-değiştirme-yazma (Read-Modify-Write) döngüsü gerektirmediği için kesmelerle yarış durumu oluşturmaz.",
    },
  },

  // ========================================================
  // 8. UART HABERLEŞME SÜRÜCÜSÜ & BAUD RATE
  // ========================================================
  "embedded-c-uart-comm": {
    id: "embedded-c-uart-comm",
    badge: "Modül 4 • Donanım Sürücüleri",
    readingTime: "9 dk okuma",
    level: "İleri Seviye",
    title: "UART Seri Haberleşme Sürücüsü ve Baud Rate Hesabı",
    subtitle: "Evrensel Asenkron Alıcı/Verici: BRR register hesaplaması, TXE/RXNE bayrakları ve dairesel tampon (Ring Buffer).",
    sections: [
      {
        title: "1. UART Protokolü ve Baud Rate Matematiği",
        content: `UART (Universal Asynchronous Receiver-Transmitter), iki cihaz arasında saat hattı (clock) olmadan yalnızca iki hat (\`TX\` ve \`RX\`) üzerinden seri veri aktaran protokoldür.

Ortak bir saat kablosu olmadığı için her iki taraf da önceden belirlenmiş aynı iletim hızında (**Baud Rate**, örn: 115200 bps) anlaşmak zorundadır.

**Baud Rate Register (USART_BRR) Hesabı:**
$$USART\\_DIV = \\frac{f_{CK}}{16 \\times \\text{BaudRate}}$$

Örneğin çevre birimi saati $f_{CK} = 16\\text{ MHz}$ ve hedef hız $115200$ ise:
$$USART\\_DIV = \\frac{16\\,000\\,000}{16 \\times 115200} \\approx 8.6805$$
Tamsayı kısmı $8$, kesir kısmı $0.6805 \\times 16 \\approx 11$ (\`0xB\`) olur. BRR değerine \`0x8B\` yazılır.`,
      },
      {
        title: "2. Bare-Metal UART Sürücüsü Kodu",
        content: `Aşağıdaki sürücü, bloklamalı (polling) olarak karakter ve metin dizgisi gönderip almayı sağlar:`,
        code: {
          language: "c",
          caption: "uart_driver.c - STM32 USART2 Bare-Metal Sürücüsü",
          snippet: `#include <stdint.h>

#define USART2_SR   (*((volatile uint32_t *)0x40004400))
#define USART2_DR   (*((volatile uint32_t *)0x40004404))
#define USART2_BRR  (*((volatile uint32_t *)0x40004408))
#define USART2_CR1  (*((volatile uint32_t *)0x4000440C))

#define SR_TXE      (1 << 7) // Transmit Data Register Empty (Gönderim Boş)
#define SR_RXNE     (1 << 5) // Read Data Register Not Empty (Yeni Veri Geldi)
#define CR1_UE      (1 << 13)// USART Aktif Et
#define CR1_TE      (1 << 3) // Transmitter Aktif Et
#define CR1_RE      (1 << 2) // Receiver Aktif Et

void uart2_init(void) {
    // 16 MHz saatte 115200 Baud:
    USART2_BRR = 0x008B;
    // Gönderici, alıcı ve USART modülünü aç:
    USART2_CR1 = (CR1_UE | CR1_TE | CR1_RE);
}

void uart2_write_char(char c) {
    // Gönderim tamponu (TXE) boşalana kadar bekle:
    while (!(USART2_SR & SR_TXE));
    USART2_DR = (c & 0xFF);
}

void uart2_print(const char *str) {
    while (*str) {
        uart2_write_char(*str++);
    }
}

char uart2_read_char(void) {
    // Alıcı tamponuna yeni veri (RXNE) gelene kadar bekle:
    while (!(USART2_SR & SR_RXNE));
    return (char)(USART2_DR & 0xFF);
}`,
        },
      },
    ],
    quiz: {
      question: "UART sürücüsünde bir karakter göndermeden önce donanım durum register'ında (SR) hangi bayrağın '1' olması beklenir?",
      options: [
        "A) RXNE (Alıcı Tamponu Dolu)",
        "B) TXE (Verici Tamponu Boş)",
        "C) PE (Parite Hatası)",
        "D) IDLE (Hat Boşta)",
      ],
      correctIndex: 1,
      explanation: "Doğru! TXE (Transmit Data Register Empty) bayrağı 1 olmadan yeni veri yazılırsa önceki karakterin üzerine yazılır ve veri bozulur.",
    },
  },
};
