export interface HardwareGuide {
  id: string;
  title: string;
  category: "Flashing & OS" | "Firmware & CLI" | "Embedded Linux" | "Geliştirici Ortamı (Arch/Hyprland)";
  targetHardware: string[];
  readTime: string;
  difficulty: "Başlangıç" | "Orta" | "İleri Seviye";
  summary: string;
  prerequisites: string[];
  steps: {
    title: string;
    description: string;
    command?: string;
    codeSnippet?: {
      language: string;
      code: string;
      caption?: string;
    };
    callout?: {
      type: "info" | "warning" | "success";
      title: string;
      message: string;
    };
  }[];
}

export const HARDWARE_GUIDES: HardwareGuide[] = [
  // 1. RASPBERRY PI OS / IMAGE ATMA & HEADLESS
  {
    id: "raspberry-pi-imager",
    title: "Raspberry Pi'ye OS İmajı Nasıl Yazılır? (Headless SSH & Wi-Fi Kurulumu)",
    category: "Flashing & OS",
    targetHardware: ["Raspberry Pi 5", "Raspberry Pi 4", "Raspberry Pi 3", "Raspberry Pi Zero 2W"],
    readTime: "8 dk",
    difficulty: "Başlangıç",
    summary: "Monitör, klavye ve fare bağlamadan (Headless) Raspberry Pi Imager veya dd ile MicroSD/NVMe sürücüsüne Linux imajı yazma, Wi-Fi ve SSH yetkilendirme kılavuzu.",
    prerequisites: [
      "MicroSD Kart (Min 16GB Class 10/UHS-1) veya NVMe SSD",
      "MicroSD Kart Okuyucu",
      "Bilgisayar (Linux, macOS veya Windows)",
    ],
    steps: [
      {
        title: "1. Raspberry Pi Imager İle İmaj Seçimi",
        description: "Raspberry Pi Vakfı'nın resmi yazılımı olan Raspberry Pi Imager'ı başlatın. 'Choose Device' alanından kart modelinizi (örn: Raspberry Pi 5), 'Choose OS' alanından ise sunucu veya gömülü işler için 'Raspberry Pi OS (64-bit Lite)' seçeneğini belirleyin.",
      },
      {
        title: "2. Headless Ayarları: OS Özelleştirme (Ctrl + Shift + X)",
        description: "Yazma işleminden önce klavyesiz/monitörsüz erişim için gelişmiş ayarlar penceresini açın:\n- Hostname: raspberrypi.local\n- Kullanıcı adı ve şifre belirleyin (örn: pi / guclusifre)\n- Wi-Fi SSID ve Parolanızı girin\n- 'Enable SSH' seçeneğini işaretleyip public key veya şifreli girişi açın.",
        callout: {
          type: "warning",
          title: "Eski wpa_supplicant.conf Yöntemi",
          message: "Yeni Debian Bookworm tabanlı Raspberry Pi OS sürümlerinde NetworkManager kullanılır. Eski usul boot bölümüne wpa_supplicant.conf koymak yerine Imager'ın kullanıcı yapılandırmasını (userconf.txt) kullanmak şarttır.",
        },
      },
      {
        title: "3. Terminalden Ham İmaj Yazma (Linux / macOS 'dd' Alternatifi)",
        description: "Grafik arayüz olmadan terminal üzerinden doğrudan SD karta imaj basmak isterseniz dd komutunu status=progress parametresiyle çalıştırabilirsiniz:",
        command: "sudo dd if=2024-raspios-bookworm-arm64-lite.img of=/dev/sdX bs=4M status=progress conv=fsync",
      },
      {
        title: "4. İlk Bağlantı ve SSH Üzerinden Sisteme Giriş",
        description: "SD kartı Raspberry Pi'ye takıp güç verin. Cihaz modeme bağlanıp IP aldıktan sonra yerel ağdan şu komutla bağlanın:",
        command: "ssh pi@raspberrypi.local",
        codeSnippet: {
          language: "bash",
          caption: "İlk Sistem Güncellemesi & Donanım Paketleri",
          code: `# Depoları güncelle ve çekirdek paketlerini yenile
sudo apt update && sudo apt full-upgrade -y

# I2C, SPI ve GPIO araçlarını yükle
sudo apt install -y i2c-tools python3-pip git build-essential

# I2C veriyolunu tara (0x00 - 0x7F bağlı aygıtlar)
sudo i2cdetect -y 1`,
        },
      },
    ],
  },

  // 2. ESP32 FIRMWARE & ESPTOOL.PY
  {
    id: "esp32-flash-guide",
    title: "ESP32 Firmware Flashlama, esptool.py & MicroPython Kurulumu",
    category: "Firmware & CLI",
    targetHardware: ["ESP32 WROOM-32", "ESP32-S3", "ESP32-C3", "ESP8266"],
    readTime: "7 dk",
    difficulty: "Başlangıç",
    summary: "esptool.py kullanarak ESP32 flash belleğini temizleme, MicroPython veya özel C binary yükleme ve klon kartlardaki 'Connecting...' BOOT tuşu sorununu çözme.",
    prerequisites: [
      "Python 3.x ve pip",
      "Micro-USB veya USB-C Veri Kablosu (Sadece şarj kablosu OLMAMALI)",
      "CH340 / CP2102 USB-UART sürücüsü (Windows için)",
    ],
    steps: [
      {
        title: "1. esptool.py Kurulumu ve Port Tespiti",
        description: "Espressif'in resmi Python tabanlı ROM yükleyicisi esptool.py'yi terminalden yükleyin ve cihazınızın bağlı olduğu seri portu doğrulayın:",
        command: "pip install esptool pyserial",
        codeSnippet: {
          language: "bash",
          caption: "Seri Port Tespiti (Linux/macOS)",
          code: `# Linux'ta CH340 / CP2102 aygıtını bulma:
ls -l /dev/ttyUSB* /dev/ttyACM*

# macOS'ta seri portu bulma:
ls -l /dev/cu.usbserial* /dev/cu.SLAB_USBtoUART*`,
        },
      },
      {
        title: "2. Flash Belleği Tamamen Sıfırlama (Erase Flash)",
        description: "Yeni bir firmware veya MicroPython atmadan önce eski NVS ve flash kalıntılarını temizlemek bootloop (sonsuz yeniden başlatma) sorunlarını engeller:",
        command: "esptool.py --port /dev/ttyUSB0 erase_flash",
        callout: {
          type: "warning",
          title: "ÖNEMLİ: 'Connecting........_____.....' Hatası Çözümü",
          message: "Terminalde noktalar akarken kart bağlantı kuramıyorsa, ESP32 kartının üzerindeki 'BOOT' (veya IO0) tuşuna parmağınızla basılı tutun. Yüzde (%0) yazma başladığı anda tuşu bırakın. Bu işlem çipi donanımsal indirme (download) moduna sokar.",
        },
      },
      {
        title: "3. MicroPython Firmware Yazma",
        description: "micropython.org adresinden indirdiğiniz güncel .bin dosyasını 0x1000 bellek adresine 460800 baud hızıyla yazın:",
        command: "esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 460800 write_flash -z 0x1000 ESP32_GENERIC-2024.bin",
      },
      {
        title: "4. REPL Konsoluna Bağlanma (Canlı Python Yorumlayıcısı)",
        description: "Yükleme tamamlandıktan sonra kartın üstündeki 'EN' (Reset) tuşuna bir kez basın. Ardından picocom veya minicom ile etkileşimli MicroPython konsoluna girin:",
        command: "picocom -b 115200 /dev/ttyUSB0",
        codeSnippet: {
          language: "python",
          caption: "MicroPython REPL Testi",
          code: `import machine, time
# ESP32 dahili LED'ini (Genelde GPIO 2) yakıp söndür
led = machine.Pin(2, machine.Pin.OUT)
for _ in range(5):
    led.value(1)
    time.sleep(0.3)
    led.value(0)
    time.sleep(0.3)
print("ESP32 MicroPython Başarıyla Çalışıyor!")`,
        },
      },
    ],
  },

  // 3. ARDUINO CLI & KÜTÜPHANE YÖNETİMİ
  {
    id: "arduino-cli-guide",
    title: "Arduino CLI: Terminalden Mikrodenetleyici Derleme, Yükleme & Kütüphane Yönetimi",
    category: "Firmware & CLI",
    targetHardware: ["Arduino Uno", "Arduino Nano", "ESP32", "STM32", "Raspberry Pi Pico"],
    readTime: "9 dk",
    difficulty: "Orta",
    summary: "Ağır grafiksel IDE açmadan Neovim/VSCode içinden doğrudan terminalden arduino-cli ile derleme yapma, kütüphane arayıp yükleme ve port monitor yönetimi.",
    prerequisites: [
      "Linux, macOS veya Windows terminali",
      "curl veya paket yöneticisi (pacman, brew, apt)",
    ],
    steps: [
      {
        title: "1. Arduino CLI Kurulumu",
        description: "Resmi ikili dosyayı doğrudan tek satırla sisteminize kurun:",
        command: "curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh",
        callout: {
          type: "info",
          title: "Arch Linux / macOS Alternatifi",
          message: "Arch Linux'ta 'sudo pacman -S arduino-cli', macOS'ta ise 'brew install arduino-cli' komutuyla doğrudan kurabilirsiniz.",
        },
      },
      {
        title: "2. Yapılandırma ve Çekirdek (Core) Kurulumu",
        description: "Yapılandırma dosyasını oluşturun ve kart paket dizinini güncelleyin:",
        command: "arduino-cli config init && arduino-cli core update-index",
        codeSnippet: {
          language: "bash",
          caption: "Arduino AVR ve ESP32 Çekirdeklerini Kurma",
          code: `# Standart Arduino Uno/Nano için AVR mimarisi
arduino-cli core install arduino:avr

# ESP32 eklemek için config'e URL ekleyin:
arduino-cli config add board_manager.additional_urls https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
arduino-cli core update-index
arduino-cli core install esp32:esp32`,
        },
      },
      {
        title: "3. Kütüphane (Library) Arama ve Tek Komutla Kurma",
        description: "Artık zip indirip klasöre atmaya gerek yok. Milyonlarca Arduino kütüphanesini terminalden arayın ve kurun:",
        codeSnippet: {
          language: "bash",
          caption: "Kütüphane Yönetimi",
          code: `# Kütüphane ara (örneğin sıcaklık sensörü DHT)
arduino-cli lib search "DHT sensor library"

# Doğrudan kur (Adafruit DHT sensör kütüphanesi)
arduino-cli lib install "DHT sensor library"
arduino-cli lib install "Adafruit Unified Sensor"
arduino-cli lib install "Adafruit NeoPixel"`,
        },
      },
      {
        title: "4. Proje Oluşturma, Derleme ve Karta Yazma (Workflow)",
        description: "Yeni bir taslak açın ve Uno kartına derleyip gönderin:",
        codeSnippet: {
          language: "bash",
          caption: "Tam Derleme ve Yükleme Döngüsü",
          code: `# Yeni taslak oluştur
arduino-cli sketch new BlinkLed
cd BlinkLed

# Derle (FQBN: arduino:avr:uno)
arduino-cli compile --fqbn arduino:avr:uno .

# Karta yükle (/dev/ttyACM0 portu)
arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno .

# Seri port monitörünü 115200 baud ile dinle
arduino-cli monitor -p /dev/ttyACM0 -c baudrate=115200`,
        },
      },
    ],
  },

  // 4. GÖMÜLÜ LINUX, U-BOOT & DEVICE TREE
  {
    id: "embedded-linux-guide",
    title: "Gömülü Linux Mimarisi: U-Boot, Kernel, Device Tree (DTS) & Buildroot",
    category: "Embedded Linux",
    targetHardware: ["Raspberry Pi", "NVIDIA Jetson", "BeagleBone Black", "Allwinner H616", "STM32MP1"],
    readTime: "12 dk",
    difficulty: "İleri Seviye",
    summary: "Bir SoC üzerinde Linux çalıştırmanın 4 temel ayağı: Çapraz derleyici (Cross-toolchain), U-Boot Bootloader, Linux Çekirdeği, Device Tree donanım haritası ve Root Filesystem.",
    prerequisites: [
      "Temel Linux kabuk (Bash) bilgisi",
      "C programlama ve Makefile temelleri",
      "ARM/RISC-V mikroişlemci kavramları",
    ],
    steps: [
      {
        title: "1. Gömülü Linux'un 4 Temel Katmanı",
        description: "Standart bir x86 PC'de BIOS/UEFI varken, gömülü SoC'lerde donanım otomatik tanınmaz. Mimarinin bileşenleri:\n1. Bootloader (U-Boot): RAM'i başlatır, Kernel ve Device Tree'yi belleğe çeker.\n2. Linux Kernel: Çekirdek sürücüler, bellek yönetimi ve proses izolasyonu.\n3. Device Tree (DTS/DTB): Çipe hangi pinde hangi I2C/SPI denetleyicisinin olduğunu anlatan donanım ağacı.\n4. Root Filesystem (Rootfs): BusyBox veya minimal kullanıcı alanı uygulamaları.",
      },
      {
        title: "2. Device Tree Sözdizimi (DTS Örneği)",
        description: "Aşağıdaki örnek, bir ARM SoC üzerinde GPIO 17 pinine bağlı bir LED'i ve 400kHz I2C veriyolunu çekirdeğe tanıtır:",
        codeSnippet: {
          language: "dts",
          caption: "Örnek Device Tree Source (board.dts)",
          code: `/dts-v1/;
/ {
    model = "Custom Embedded IoT Board";
    compatible = "vendor,my-board", "allwinner,sun50i-h6";

    leds {
        compatible = "gpio-leds";
        status_led {
            label = "status:green";
            gpios = <&pio 0 17 0>; /* Port A, Pin 17, Active High */
            linux,default-trigger = "heartbeat";
        };
    };
};

&i2c0 {
    status = "okay";
    clock-frequency = <400000>;

    eeprom@50 {
        compatible = "atmel,24c32";
        reg = <0x50>;
    };
};`,
        },
      },
      {
        title: "3. Buildroot ile 15 Dakikada Minimal Gömülü Linux Üretme",
        description: "Buildroot, tüm araç zincirini, çekirdeği ve rootfs'i tek bir 'make' komutuyla derleyen en popüler gömülü Linux inşa aracıdır:",
        codeSnippet: {
          language: "bash",
          caption: "Buildroot İnşa Akışı",
          code: `git clone git://git.buildroot.net/buildroot
cd buildroot

# Kart hedef yapılandırmasını yükle (Örn: Raspberry Pi 4 64-bit)
make raspberrypi4_64_defconfig

# Çekirdek ve paket menüsünü aç
make menuconfig

# Derlemeyi başlat (Çapraz derleyici ve sdcard.img üretir)
make -j$(nproc)`,
        },
      },
    ],
  },

  // 5. ARCH LINUX, HYPRLAND & CAELESTIA DONANIM GELİŞTİRİCİ ORTAMI
  {
    id: "arch-hyprland-caelestia",
    title: "Arch Linux, Hyprland & Caelestia: Modern Donanım & Gömülü Geliştirici Ortamı",
    category: "Geliştirici Ortamı (Arch/Hyprland)",
    targetHardware: ["ARM Cortex-M", "RISC-V", "ESP32", "FPGA / Artix-7", "AVR"],
    readTime: "11 dk",
    difficulty: "Orta",
    summary: "Arch Linux, Wayland tiling pencere yöneticisi Hyprland ve Caelestia estetik masaüstü ortamında sıfır gecikmeli, udev kuralları yapılandırılmış, tam donanımlı gömülü geliştirme atölyesi.",
    prerequisites: [
      "Arch Linux veya EndeavourOS kurulu sistem",
      "Hyprland / Wayland grafik ortamı",
      "sudo (root) yetkisi",
    ],
    steps: [
      {
        title: "1. Neden Arch Linux + Hyprland + Caelestia?",
        description: "Gömülü sistem mühendisleri için Arch Linux, en güncel GCC (ARM, RISC-V, AVR) derleyicilerine anında erişim sunar (Ubuntu gibi 3 yıl önceki eski derleyici paketlerine hapsolmazsınız). Hyprland ve Caelestia ise klavye odaklı tiling pencere yönetimiyle monitörünüzü bölerek eşzamanlı kodlama, seri monitör ve donanımsal debugger pencerelerini sıfır gecikmeyle yönetmenizi sağlar.",
      },
      {
        title: "2. Gömülü Donanım 'udev' Kuralları (/dev/ttyUSB Yetkilendirmesi)",
        description: "Yeni bir Linux kurulumunda kart taktığınızda 'Permission denied' hatası almamak için kullanıcınızı dialout/uucp grubuna ekleyin ve udev kural dosyasını yazın:",
        codeSnippet: {
          language: "bash",
          caption: "/etc/udev/rules.d/99-embedded.rules",
          code: `# Kullanıcıyı seri port grubuna ekle
sudo usermod -a -G uucp,dialout $USER

# ST-Link, J-Link, ESP32 ve FTDI USB dönüştürücüler için udev kuralı:
sudo tee /etc/udev/rules.d/99-embedded.rules << 'EOF'
# FTDI FT232 / CH340 / CP2102 Seri Portlar
SUBSYSTEM=="tty", ATTRS{idVendor}=="0403", MODE="0666", GROUP="uucp"
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", MODE="0666", GROUP="uucp"
SUBSYSTEM=="tty", ATTRS{idVendor}=="10c4", MODE="0666", GROUP="uucp"

# ST-Link V2 / V3 Debugger
ATTRS{idVendor}=="0483", ATTRS{idProduct}=="3748", MODE="0666", GROUP="uucp"
ATTRS{idVendor}=="0483", ATTRS{idProduct}=="374b", MODE="0666", GROUP="uucp"

# Raspberry Pi Pico Bootloader (RP2040)
ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="0003", MODE="0666", GROUP="uucp"
EOF

# Kuralları yeniden yükle
sudo udevadm control --reload-rules && sudo udevadm trigger`,
        },
      },
      {
        title: "3. Donanım Araç Zinciri Paketlerinin Kurulumu (Pacman)",
        description: "Gereken tüm gömülü derleyicileri ve simülasyon paketlerini tek komutla kurun:",
        command: "sudo pacman -S arm-none-eabi-gcc arm-none-eabi-newlib openocd gdb avr-gcc avrdude esptool minicom picocom gtkwave usbutils",
      },
      {
        title: "4. Hyprland & Caelestia Çalışma Düzeni (Tiling Workflow)",
        description: "Caelestia temasının sunduğu zarif Waybar ve dinamik animasyonlarla donanım geliştirme çalışma alanınızı 4 bölmeli tiling pencereye ayırın:\n- Sol Üst: Neovim veya VSCode (Bare-metal C / SystemVerilog kodlama)\n- Sağ Üst: 'picocom -b 115200 /dev/ttyUSB0' (Karttan gelen canlı UART çıktısı)\n- Sol Alt: 'openocd -f interface/stlink.cfg -f target/stm32f1x.cfg' (GDB Server)\n- Sağ Alt: 'arm-none-eabi-gdb firmware.elf' veya GTKWave (Sinyal dalga formu analizi)",
        callout: {
          type: "success",
          title: "Sıfır Donma, Maksimum Üretkenlik",
          message: "Wayland ve Hyprland'in ultra düşük giriş gecikmesi sayesinde, kartı yeniden flashlarken veya terminalde yüzbinlerce satır UART logu akarken masaüstünüzde en ufak bir takılma yaşanmaz.",
        },
      },
    ],
  },
];
