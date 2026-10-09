export interface HardwareGuide {
  id: string;
  title: string;
  category: "Flashing & OS" | "Firmware & CLI" | "Embedded Linux" | "Geliştirici Ortamı (Arch/Hyprland)" | "Robotik & ROS 2";
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

  // 6. ARCH LINUX SIFIRDAN UEFI KURULUMU (GÖMÜLÜ GELİŞTİRİCİ İÇİN)
  {
    id: "arch-linux-install",
    title: "Arch Linux Sıfırdan UEFI Kurulumu: Disk Bölme, Btrfs/Ext4, Pacstrap & GRUB",
    category: "Geliştirici Ortamı (Arch/Hyprland)",
    targetHardware: ["x86_64 PC / Laptop", "ThinkPad / Framework", "Geliştirici İş İstasyonu"],
    readTime: "16 dk",
    difficulty: "İleri Seviye",
    summary: "Gömülü sistem ve donanım geliştiricileri için sıfırdan Arch Linux UEFI kurulum kılavuzu: cfdisk ile EFI + Root disk bölümleme, Btrfs alt hacimleri (subvolumes) veya Ext4, pacstrap ile temel sistem, chroot, GRUB bootloader, NetworkManager, PipeWire ve donanım yetkilendirmeleri.",
    prerequisites: [
      "En az 8GB USB Flash Bellek (Ventoy veya dd ile Arch ISO yazılmış)",
      "UEFI modunda başlatılabilen bilgisayar (BIOS'ta Secure Boot KAPALI olmalıdır)",
      "Kablolu Ethernet veya Wi-Fi internet erişimi",
      "Hedef NVMe SSD / SATA disk üzerindeki verilerin yedeği",
    ],
    steps: [
      {
        title: "1. Canlı Ortamı Başlatma & UEFI / İnternet Doğrulaması",
        description: "USB bellekten Arch Linux canlı (live) medyasını başlatın. İlk olarak sistemin gerçekten UEFI modunda açıldığını ve internet bağlantısının aktif olduğunu doğrulayın:",
        command: "cat /sys/firmware/efi/fw_platform_size",
        codeSnippet: {
          language: "bash",
          caption: "Ağ Bağlantısı & Zaman Senkronizasyonu",
          code: `# 64 bit UEFI çıktısı (64) dönmelidir. Dosya yoksa sistem Legacy BIOS'ta açılmıştır.
cat /sys/firmware/efi/fw_platform_size

# Wi-Fi ile bağlanıyorsanız iwctl aracını kullanın:
# iwctl
#   [iwd]# station wlan0 scan
#   [iwd]# station wlan0 get-networks
#   [iwd]# station wlan0 connect "WIFI_ADINIZ"
#   [iwd]# exit

# Ağ bağlantısını test edin:
ping -c 3 archlinux.org

# Sistem saatini NTP ile internetten eşitleyin:
timedatectl set-ntp true`,
        },
      },
      {
        title: "2. Disk Bölümleme (cfdisk ile EFI + Root)",
        description: "Kurulum yapılacak NVMe veya SSD diski (örn: /dev/nvme0n1) cfdisk ile GPT tablosunda bölümlere ayırın:\n1. Bölüm: 1GB boyutunda 'EFI System' (Tip: EFI System)\n2. Bölüm: Kalan tüm alan 'Linux filesystem' (Tip: Linux root x86-64)",
        command: "cfdisk /dev/nvme0n1",
        callout: {
          type: "warning",
          title: "DİKKAT: Doğru Diski Seçin",
          message: "'lsblk' çıktısını dikkatle inceleyin. Yanlışlıkla USB belleği veya yedek diskinizi silmemek için /dev/nvme0n1 veya /dev/sda sürücüsünün boyutunu teyit edin.",
        },
      },
      {
        title: "3. Dosya Sistemlerini Formatlama ve Bağlama (Mount)",
        description: "EFI bölümünü FAT32, kök bölümü ise modern Ext4 veya anlık görüntü (snapshot) yetenekli Btrfs olarak formatlayıp bağlayın:",
        codeSnippet: {
          language: "bash",
          caption: "Formatlama ve Mount Komutları",
          code: `# 1. EFI Bölümünü FAT32 formatla:
mkfs.fat -F32 /dev/nvme0n1p1

# 2. Kök (Root) Bölümünü Ext4 formatla:
mkfs.ext4 -L ARCH_ROOT /dev/nvme0n1p2

# 3. Kök dizini /mnt altına bağla:
mount /dev/nvme0n1p2 /mnt

# 4. EFI bağlama noktasını aç ve bağla:
mkdir -p /mnt/boot
mount /dev/nvme0n1p1 /mnt/boot`,
        },
      },
      {
        title: "4. Pacstrap ile Temel Çekirdek ve Paketleri Yükleme",
        description: "Arch Linux'un temel çekirdek, firmware, derleyici ve metin düzenleyici araçlarını yeni diske indirin:",
        command: "pacstrap -K /mnt base linux linux-firmware base-devel networkmanager sudo git vim neovim intel-ucode amd-ucode",
        callout: {
          type: "info",
          title: "Microcode Paketleri",
          message: "İşlemciniz Intel ise 'intel-ucode', AMD Ryzen ise 'amd-ucode' paketi işlemci donanım yamaları ve kararlılık için gereklidir.",
        },
      },
      {
        title: "5. Fstab Üretme ve Chroot ile Yeni Sisteme Geçiş",
        description: "Disk UUID'lerini içeren dosya sistemi tablosunu (fstab) oluşturun ve yeni kurulan sisteme kök yetkisiyle geçin:",
        codeSnippet: {
          language: "bash",
          caption: "Fstab ve Chroot",
          code: `# Disk UUID tablosunu oluştur
genfstab -U /mnt >> /mnt/etc/fstab

# Fstab dosyasını kontrol et (nvme0n1p1 ve nvme0n1p2 satırları görünmelidir)
cat /mnt/etc/fstab

# Yeni kurulan sistemin içine geçiş yap:
arch-chroot /mnt`,
        },
      },
      {
        title: "6. Saat Dilimi, Yerel Ayarlar (Locale) & Hostname",
        description: "Chroot ortamında Türkiye saat dilimini, UTF-8 karakter setini ve bilgisayar ağ adını yapılandırın:",
        codeSnippet: {
          language: "bash",
          caption: "Sistem Kimliği Yapılandırması",
          code: `# Saat dilimi (İstanbul)
ln -sf /usr/share/zoneinfo/Europe/Istanbul /etc/localtime
hwclock --systohc

# Dil ve UTF-8 yereli (en_US.UTF-8 ve tr_TR.UTF-8 satırlarını açın)
sed -i 's/#en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen
sed -i 's/#tr_TR.UTF-8 UTF-8/tr_TR.UTF-8 UTF-8/' /etc/locale.gen
locale-gen

echo "LANG=en_US.UTF-8" > /etc/locale.conf

# Bilgisayar adı (Hostname)
echo "arch-embedded" > /etc/hostname
cat << 'EOF' > /etc/hosts
127.0.0.1   localhost
::1         localhost
127.0.1.1   arch-embedded.localdomain arch-embedded
EOF`,
        },
      },
      {
        title: "7. Kullanıcı Ekleme & Seri Port (uucp/dialout) İzinleri",
        description: "Root şifresini belirleyin ve günlük kullanım ile gömülü donanım geliştirme için sudo yetkili normal kullanıcı oluşturun:",
        codeSnippet: {
          language: "bash",
          caption: "Kullanıcı ve Grup Yetkilendirmesi",
          code: `# Root parolasını belirle:
passwd

# 'tnc4y' kullanıcısını ekle (uucp ve dialout grupları USB seri port erişimi içindir):
useradd -m -G wheel,uucp,dialout,storage,video,audio -s /bin/bash tnc4y
passwd tnc4y

# wheel grubuna sudo izni ver:
sed -i 's/# %wheel ALL=(ALL:ALL) ALL/%wheel ALL=(ALL:ALL) ALL/' /etc/sudoers`,
        },
      },
      {
        title: "8. GRUB UEFI Bootloader Kurulumu",
        description: "Bilgisayar açılırken Linux çekirdeğini yükleyecek UEFI GRUB önyükleyicisini kurun:",
        codeSnippet: {
          language: "bash",
          caption: "GRUB ve EFI Kurulumu",
          code: `# GRUB ve EFI araçlarını kur
pacman -S --noconfirm grub efibootmgr

# UEFI önyükleyici girdisini anakart NVRAM'ine yaz:
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB

# Yapılandırma dosyasını oluştur:
grub-mkconfig -o /boot/grub/grub.cfg`,
        },
      },
      {
        title: "9. NetworkManager & PipeWire Servislerini Etkinleştirme ve Çıkış",
        description: "İlk açılışta internetin ve ses sunucusunun otomatik başlaması için servisleri açın, chroot'tan çıkıp bilgisayarı yeniden başlatın:",
        codeSnippet: {
          language: "bash",
          caption: "Servisleri Açma ve Yeniden Başlatma",
          code: `# Ağ yöneticisini aç:
systemctl enable NetworkManager

# Ses altyapısını yükle ve hazırla
pacman -S --noconfirm pipewire pipewire-pulse pipewire-alsa wireplumber

# Chroot'tan çık ve diskleri ayır:
exit
umount -R /mnt
reboot`,
        },
        callout: {
          type: "success",
          title: "Tebrikler: Arch Linux Başarıyla Kuruldu!",
          message: "Sisteminiz açıldığında belirlediğiniz kullanıcı adı ve parolanızla giriş yapabilirsiniz. Bir sonraki kılavuzda Hyprland & Caelestia grafik ortamını kuracağız.",
        },
      },
    ],
  },

  // 7. HYPRLAND & CAELESTIA DESKTOP SHELL KURULUMU
  {
    id: "hyprland-caelestia-setup",
    title: "Hyprland & Caelestia Desktop Shell: Wayland, Kitty, Udev & Gömülü Dotfiles",
    category: "Geliştirici Ortamı (Arch/Hyprland)",
    targetHardware: ["Arch Linux", "Wayland", "AMD / Intel / NVIDIA GPU", "Gömülü Donanım Atölyesi"],
    readTime: "13 dk",
    difficulty: "Orta",
    summary: "Wayland dinamik tiling pencere yöneticisi Hyprland üzerinde Caelestia masaüstü kabuğu ve dotfiles ekosistemini kurma: Kitty GPU terminali, Waybar durum çubuğu, udev seri port izinleri ve donanım mühendisleri için çoklu pencere iş akışı.",
    prerequisites: [
      "Arch Linux çalışan temel sistem ve sudo yetkili kullanıcı",
      "Aktif internet bağlantısı",
      "GPU sürücüleri (Mesa veya Nvidia)",
    ],
    steps: [
      {
        title: "1. Hyprland & Wayland Çekirdek Paketlerini Yükleme",
        description: "Hyprland kompozitörünü, portal yöneticilerini, ekran görüntüsü ve pano araçlarını pacman ile kurun:",
        command: "sudo pacman -S hyprland waybar kitty rofi-wayland swww xdg-desktop-portal-hyprland qt5-wayland qt6-wayland polkit-kde-agent grim slurp wl-clipboard ttf-jetbrains-mono-nerd noto-fonts-emoji",
      },
      {
        title: "2. GPU Sürücüleri ve Hyprland Ortam Değişkenleri",
        description: "Ekran kartınıza göre donanımsal ivmelendirmeyi etkinleştirin:",
        codeSnippet: {
          language: "bash",
          caption: "GPU Sürücüleri (Intel / AMD / Nvidia)",
          code: `# Intel GPU için:
sudo pacman -S mesa vulkan-intel intel-media-driver

# AMD Radeon GPU için:
sudo pacman -S mesa vulkan-radeon libva-mesa-driver

# NVIDIA GPU için (Önemli env ayarları):
sudo pacman -S nvidia-dkms nvidia-utils
# ~/.config/hypr/hyprland.conf içine şu değişkenleri ekleyin:
# env = LIBVA_DRIVER_NAME,nvidia
# env = XDG_SESSION_TYPE,wayland
# env = GBM_BACKEND,nvidia-drm
# env = __GLX_VENDOR_LIBRARY_NAME,nvidia
# cursor:no_hardware_cursors = true`,
        },
      },
      {
        title: "3. Caelestia Dotfiles ve Arayüz Ekosisteminin Kurulumu",
        description: "Caelestia temasını, Waybar stilini ve Kitty terminal yapılandırmasını kullanıcı dizinine yerleştirin:",
        codeSnippet: {
          language: "bash",
          caption: "~/.config Dizin Yapısı",
          code: `# Yapılandırma dizinlerini oluştur
mkdir -p ~/.config/hypr ~/.config/kitty ~/.config/waybar

# Kitty yapılandırması (~/.config/kitty/kitty.conf):
cat << 'EOF' > ~/.config/kitty/kitty.conf
font_family      JetBrainsMono Nerd Font
font_size        11.5
background_opacity 0.92
confirm_os_window_close 0
enable_audio_bell no
EOF`,
        },
      },
      {
        title: "4. Gömülü Donanım Mühendisleri İçin Hyprland Pencere Kuralları",
        description: "Gömülü geliştirme yaparken GTKWave (dalga formu), PulseView (mantık analizörü) veya OpenOCD pencerelerinin tiling düzenini bozmaması için floating (yüzen pencere) kurallarını hyprland.conf dosyasına ekleyin:",
        codeSnippet: {
          language: "ini",
          caption: "~/.config/hypr/hyprland.conf - Geliştirici Pencere Kuralları",
          code: `# Donanım Araçları İçin Yüzen Pencere Kuralları:
windowrule = float, ^(gtkwave)$
windowrule = size 1200 800, ^(gtkwave)$

windowrule = float, ^(PulseView)$
windowrule = size 1300 850, ^(PulseView)$

windowrule = float, ^(Saleae Logic)$
windowrule = float, title:^(OpenOCD.*)$

# Seri Monitör için Özel Workspace 2 Kuralı:
windowrule = workspace 2, title:^(picocom.*)$

# Varsayılan Kısayollar:
# SUPER + Q  -> Kitty Terminal
# SUPER + C  -> Aktif Pencereyi Kapat
# SUPER + E  -> Dosya Yöneticisi
# SUPER + R  -> Rofi Uygulama Menüsü
# SUPER + V  -> Pencereyi Yüzen/Tiling Yap (Toggle Float)
# SUPER + M  -> Çıkış`,
        },
      },
      {
        title: "5. ST-Link, J-Link ve USB-UART udev İzin Kuralları",
        description: "Kart taktığınızda 'Permission denied' hatası almamak için kural dosyasını yazın ve udev'i yeniden yükleyin:",
        codeSnippet: {
          language: "bash",
          caption: "/etc/udev/rules.d/99-embedded.rules",
          code: `sudo tee /etc/udev/rules.d/99-embedded.rules << 'EOF'
# FTDI, CH340, CP2102 USB-UART Köprüleri
SUBSYSTEM=="tty", ATTRS{idVendor}=="0403", MODE="0666", GROUP="uucp"
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", MODE="0666", GROUP="uucp"
SUBSYSTEM=="tty", ATTRS{idVendor}=="10c4", MODE="0666", GROUP="uucp"

# ST-Link V2 / V3 Debugger
ATTRS{idVendor}=="0483", ATTRS{idProduct}=="3748", MODE="0666", GROUP="uucp"
ATTRS{idVendor}=="0483", ATTRS{idProduct}=="374b", MODE="0666", GROUP="uucp"

# SEGGER J-Link
ATTRS{idVendor}=="1366", MODE="0666", GROUP="uucp"

# Raspberry Pi Pico Bootloader (RP2040)
ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="0003", MODE="0666", GROUP="uucp"
EOF

sudo udevadm control --reload-rules && sudo udevadm trigger`,
        },
      },
    ],
  },

  // 8. RASPBERRY PI 5 + ROS 2 + RPLIDAR & CAMERA HARİTALAMA
  {
    id: "raspberry-pi-ros2-lidar",
    title: "Raspberry Pi 5 + ROS 2 Kurulumu: RPLIDAR & Pi Camera ile 2D Haritalama",
    category: "Robotik & ROS 2",
    targetHardware: ["Raspberry Pi 5", "Raspberry Pi 4", "RPLIDAR A1/A2", "Pi Camera V2/V3"],
    readTime: "15 dk",
    difficulty: "İleri Seviye",
    summary: "Raspberry Pi 5 üzerinde ROS 2 Humble/Jazzy koşturarak RPLIDAR A1/A2 sensörü ile 360° LaserScan verisi alma, Pi Camera yayını açma, SLAM Toolbox ile gerçek zamanlı 2D oda haritası çıkarma ve haritayı kaydetme rehberi.",
    prerequisites: [
      "Raspberry Pi 5 (4GB veya 8GB RAM)",
      "MicroSD Kart veya NVMe SSD üzerinde Raspberry Pi OS 64-bit Lite veya Ubuntu Server",
      "RPLIDAR A1 veya A2 2D Lazer Sensörü (USB bağlantılı)",
      "Wi-Fi bağlantısı ve SSH terminal erişimi",
      "Aynı yerel ağda bir Ubuntu veya Linux bilgisayar (RViz2 görselleştirme için)",
    ],
    steps: [
      {
        title: "1. Raspberry Pi Üzerine ROS 2 Paket Depolarının Kurulması",
        description: "Raspberry Pi terminalinde resmi ROS 2 depolarını ekleyin ve derleme araçlarını kurun:",
        codeSnippet: {
          language: "bash",
          caption: "ROS 2 Kurulum Komutları",
          code: `# GPG Anahtarı ve Depoyu Ekle
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Paketleri güncelle ve ROS 2 Base yükle
sudo apt update
sudo apt install -y ros-humble-ros-base python3-colcon-common-extensions git build-essential

# CycloneDDS Ağ Eklentisini Yükle (Düşük Wi-Fi gecikmesi için)
sudo apt install -y ros-humble-rmw-cyclonedds-cpp
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
echo "export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp" >> ~/.bashrc
source ~/.bashrc`,
        },
      },
      {
        title: "2. RPLIDAR USB Bağlantısı ve '/dev/rplidar' udev Kuralı",
        description: "LiDAR'ı Raspberry Pi'nin mavi USB 3.0 portuna takın. Portun sistem yeniden başladığında değişmemesi için udev kuralı yazın:",
        codeSnippet: {
          language: "bash",
          caption: "LiDAR Portunu /dev/rplidar Olarak Sabitleme",
          code: `sudo tee /etc/udev/rules.d/99-rplidar.rules << 'EOF'
KERNEL=="ttyUSB*", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea60", MODE:="0666", SYMLINK+="rplidar"
EOF

sudo udevadm control --reload-rules && sudo udevadm trigger
# Portu kontrol edin:
ls -l /dev/rplidar`,
        },
      },
      {
        title: "3. sllidar_ros2 Paketini Colcon ile Derleme",
        description: "Slamtec'in resmi ROS 2 sürücüsünü bir çalışma alanında klonlayıp derleyin:",
        codeSnippet: {
          language: "bash",
          caption: "ROS 2 Çalışma Alanı ve Derleme",
          code: `# Çalışma alanı oluştur
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src

# RPLIDAR sürücüsünü klonla
git clone https://github.com/Slamtec/sllidar_ros2.git

# Derle
cd ~/ros2_ws
colcon build --symlink-install

# Ortamı yükle
source install/setup.bash`,
        },
      },
      {
        title: "4. LiDAR Düğümünü Başlatma ve /scan Verisini Doğrulama",
        description: "LiDAR motorunu başlatın ve saniyede 10 Hz hızında LaserScan mesajlarının aktığını terminalden doğrulayın:",
        command: "ros2 launch sllidar_ros2 sllidar_a1_launch.py serial_port:=/dev/rplidar",
        codeSnippet: {
          language: "bash",
          caption: "Ayrı Bir Terminalde Topic Kontrolü",
          code: `# Konuları listele (/scan görünmelidir)
ros2 topic list

# Lazer tarama frekansını ölç (Yaklaşık 8.0 - 10.0 Hz olmalıdır)
ros2 topic hz /scan

# Canlı veriyi terminalden oku:
ros2 topic echo /scan --field ranges`,
        },
      },
      {
        title: "5. SLAM Toolbox ile Canlı 2D Harita Çıkarma",
        description: "Raspberry Pi üzerinde SLAM Toolbox paketini kurup haritalama düğümünü başlatın:",
        codeSnippet: {
          language: "bash",
          caption: "SLAM Toolbox Başlatma",
          code: `sudo apt install -y ros-humble-slam-toolbox

# Canlı haritalamayı başlat (Online Synchronous SLAM)
ros2 launch slam_toolbox online_sync_launch.py`,
        },
      },
      {
        title: "6. Uzak Bilgisayarda RViz2 ile Haritayı İzleme ve Diske Kaydetme",
        description: "Aynı Wi-Fi ağındaki dizüstü bilgisayarınızda RViz2 açarak canlı lazer noktalarını ve yeşil/siyah oda duvarlarını izleyin. Harita tamamlandığında tek komutla kaydedin:",
        codeSnippet: {
          language: "bash",
          caption: "Haritayı Diske Kaydetme Komutu",
          code: `# Nav2 Map Server CLI ile haritayı diske yaz:
sudo apt install -y ros-humble-nav2-map-server
ros2 run nav2_map_server map_saver_cli -f ~/oda_haritasi

# Sonuçta şu dosyalar üretilir:
# 1. oda_haritasi.pgm -> 2D gri tonlamalı duvar haritası
# 2. oda_haritasi.yaml -> Çözünürlük ve koordinat başlığı`,
        },
        callout: {
          type: "success",
          title: "Haritanız Hazır!",
          message: "Oluşturduğunuz haritayı Nav2 navigasyon yığınına vererek robotunuzu belirli oda koordinatlarına otonom sürüş yaptırabilirsiniz.",
        },
      },
    ],
  },

  // 9. RASPBERRY PI 5 DONANIM KONTROLÜ (KERNEL 6.6+ GPIOD)
  {
    id: "raspberry-pi-gpio-kernel",
    title: "Raspberry Pi 5 Donanım Kontrolü: Kernel 6.6+ gpiod, libgpiod & Python",
    category: "Embedded Linux",
    targetHardware: ["Raspberry Pi 5", "RP1 Gömülü I/O Denetleyicisi"],
    readTime: "9 dk",
    difficulty: "Orta",
    summary: "Raspberry Pi 5'in yeni RP1 güney köprüsü mimarisinde eski RPi.GPIO kütüphanesinin neden çalışmadığı ve modern Linux Kernel Character Device (gpiod / libgpiod / gpiozero) ile güvenli GPIO kontrolü.",
    prerequisites: [
      "Raspberry Pi 5",
      "Raspberry Pi OS Bookworm 64-bit (Linux Kernel 6.6+)",
      "Temel Python ve bash bilgisi",
    ],
    steps: [
      {
        title: "1. Raspberry Pi 5'te Ne Değişti? RP1 Çipi ve /dev/gpiochip4",
        description: "Raspberry Pi 1-4 serisinde GPIO pinleri doğrudan Broadcom SoC üzerindeydi ve /dev/gpiomem bellek haritalamasıyla sürülüyordu. Raspberry Pi 5'te ise tüm 40-pin GPIO başlığı Raspberry Pi'nin kendi tasarladığı 'RP1' I/O çipine bağlanmıştır. Bu yüzden eski RPi.GPIO kütüphanesi 'This board is not supported' hatası verir. Yeni standart, Linux çekirdeğinin resmi karakter aygıtı arayüzü olan 'libgpiod'dur.",
      },
      {
        title: "2. gpiod Terminal Araçları ile Pin Durumunu İnceleme",
        description: "Sistem araçlarını kurun ve RP1 çipinin bacak haritasını terminalden dökün:",
        codeSnippet: {
          language: "bash",
          caption: "gpiod Komut Satırı Araçları",
          code: `# Araçları kur
sudo apt update && sudo apt install -y gpiod python3-libgpiod python3-gpiozero

# Raspberry Pi 5'teki GPIO çiplerini listele (RP1 genelde gpiochip4'tür):
gpiodetect

# Pinlerin kullanım durumunu gör (Hangi pinde UART, SPI veya I2C var):
gpioinfo gpiochip4 | head -n 30

# GPIO 17 pinini (Line 17) lojik 1 yap (LED yak):
gpioset gpiochip4 17=1

# GPIO 17 pinini oku:
gpioget gpiochip4 17`,
        },
      },
      {
        title: "3. Python ile Modern ve Kararlı GPIO Kontrolü (gpiozero v2)",
        description: "Raspberry Pi Vakfı'nın tavsiye ettiği gpiozero kütüphanesi Pi 5'in RP1 çipini otomatik tanır ve arka planda libgpiod kullanır:",
        codeSnippet: {
          language: "python",
          caption: "led_button_pi5.py",
          code: `from gpiozero import LED, Button
from time import sleep

# GPIO 17'ye LED, GPIO 27'ye buton bağlı:
led = LED(17)
buton = Button(27)

print("Raspberry Pi 5 Donanım Kontrolü Başlatıldı...")

while True:
    if buton.is_pressed:
        led.on()
        print("Butona basıldı -> LED YANDI")
    else:
        led.off()
    sleep(0.05)`,
        },
      },
    ],
  },
];
