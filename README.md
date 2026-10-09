# 🚀 learn.tncy.dev | Modern Yazılım, Web & Donanım Eğitim Platformu

Web teknolojilerinden mikrodenetleyicilere, modern programlama dillerinden FPGA çip tasarımına kadar uzanan interaktif, uygulamalı ve yeni nesil bir geliştirici ve mühendislik öğrenme merkezi.

---

## 📌 Proje Vizyonu

Yazılım geliştirme ve donanım mühendisliği arasındaki köprüyü kurmak genellikle zorludur. **learn.tncy.dev**, hem web ve genel programlama temellerini hem de gömülü sistemler, mikrodenetleyici kontrolü ve sayısal donanım tasarımını (RTL & Verification) tek bir çatı altında birleştiren açık kaynaklı bir eğitim platformudur.

Platform, teori ile pratiği bir araya getiren canlı kod editörleri, sinyal dalga formu (waveform) analizörleri, geliştirme kartları kataloğu ve kendini test etme alıştırmaları sunar.

---

## 🧭 Eğitim Alanları & Müfredat (Learning Tracks)

Platform 4 ana kategori ve 11+ uzmanlık alanını kapsar:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        learn.tncy.dev Müfredatı                        │
├────────────────────────────────────────────────────────────────────────┤
│ 🌐 WEB GELİŞTİRME            ► HTML5, CSS3 (Flexbox/Grid), JavaScript  │
│ ⚡ GÖMÜLÜ SİSTEMLER & IoT     ► Gömülü C (Register/MMIO), MicroPython,  │
│                                 Arduino & Sensörler                    │
│ 🔬 DONANIM TASARIMI & FPGA   ► SystemVerilog (RTL & Testbench), Verilog│
│ 💻 PROGRAMLAMA DİLLERİ       ► Python 3, Modern C++ (C++20), Rust      │
│ 🔌 GELİŞTİRME KARTLARI (HUB) ► Arduino, ESP32, STM32, Pico, Basys 3   │
│                                 FPGA, NVIDIA Jetson Nano Ansiklopedisi │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Katman | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Yüksek performanslı React mimarisi, SSR ve Static Generation |
| **Dil** | [TypeScript](https://www.typescriptlang.org/) | Tip güvenliği ve ölçeklenebilir kod tabanı |
| **Stil & Tasarım** | [Tailwind CSS v4](https://tailwindcss.com/) | CSS-first modern utility kütüphanesi |
| **UI Bileşenleri** | [DaisyUI v5](https://daisyui.com/) | 8+ farklı tema destekli modern arayüz bileşenleri |
| **İnteraktif IDE** | Tam Ekran Split-Screen Web IDE | Satır numaralı editör, ayrı terminal ve dijital dalga formu |
| **Sinyal Analizi** | VCD Sinyal & SVG Dalga Formu | Sinyal zamanlama diyagramları (Clock, Bus, Reset) |

---

## ⚡ Canlı Web IDE & Simülasyon Mimarisi

Platform, tarayıcıda doğrudan çalışan bölünmüş ekran (split-screen) bir geliştirme ortamı içerir:

```
┌───────────────────────────────────────────────────────────────┐
│                    KOD DÜZENLEYİCİ (Sol Panel)                │
│  module counter (input logic clk, output logic [3:0] count);  │
│    always_ff @(posedge clk) count <= count + 1;               │
│  endmodule                                                    │
├──────────────────────────────┬────────────────────────────────┤
│    [ ▶ ÇALIŞTIR BUTONU ]     │    [ ↺ KODU SIFIRLA ]          │
├──────────────────────────────┴────────────────────────────────┤
│                    ÇIKTI & TERMİNAL (Sağ Panel)               │
│  ▶ Dijital Dalga Formu (Waveform): CLK __|‾|_ | DATA: 0, 1, 2 │
│  ▶ Ayrı Simülatör Terminali: $display ve $monitor çıktıları   │
│  ▶ Durum Göstergesi: PASS / FAIL (Otomatik Test Doğrulama)    │
└───────────────────────────────────────────────────────────────┘
```

---

## 🔌 Geliştirme Kartları Ansiklopedisi (`/boards`)

Piyasadaki tüm popüler geliştirme kartlarının teknik özelliklerini, pin sayılarını, voltajlarını ve kullanım alanlarını karşılaştıran interaktif katalog:
* **Mikrodenetleyiciler (MCU):** Arduino Uno R3, Arduino Nano, STM32 Blue Pill, STM32 Nucleo
* **IoT & Kablosuz:** ESP32 DevKit V1, ESP32-S3 (AI Vector), Raspberry Pi Pico W
* **FPGA Kartları:** Digilent Basys 3 (Artix-7), Terasic DE10-Lite (MAX 10), Lattice iCEstick
* **AI & SBC:** NVIDIA Jetson Nano (128-Core CUDA), Raspberry Pi 5

---

## 💻 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek projeyi görüntüleyebilirsiniz.

### Diğer Komutlar
```bash
# Üretim derlemesi (Production build)
npm run build

# Derlenmiş projeyi başlatma
npm run start

# ESLint kod kontrolü
npm run lint
```

---

## 📄 Lisans
Bu proje eğitim amaçlı geliştirilmekte olup açık kaynak topluluğuna katkı sağlamayı amaçlar.
