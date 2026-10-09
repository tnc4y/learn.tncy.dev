"use client";

interface BoardIllustrationProps {
  boardId: string;
  className?: string;
}

export default function BoardIllustration({ boardId, className = "" }: BoardIllustrationProps) {
  switch (boardId) {
    // 1. ARDUINO UNO R3
    case "arduino-uno-r3":
      return (
        <div className={`w-full aspect-16/10 rounded-2xl bg-gradient-to-br from-[#006468] to-[#00979d] p-3 relative flex flex-col justify-between overflow-hidden shadow-inner border border-teal-300/30 ${className}`}>
          {/* Silkscreen & Logo */}
          <div className="flex items-center justify-between text-white/90 font-mono text-[10px]">
            <div className="flex items-center gap-1 font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-white inline-block" />
              <span>ARDUINO UNO R3</span>
            </div>
            <span className="text-[8px] bg-black/30 px-1.5 py-0.5 rounded text-white/80">ATmega328P</span>
          </div>

          {/* Kart Ortası: Çipler ve Bileşenler */}
          <div className="flex items-center justify-between my-auto px-1">
            {/* Sol: USB-B ve DC Barrel Jack */}
            <div className="space-y-2">
              <div className="w-7 h-6 rounded-sm bg-gradient-to-r from-zinc-300 to-zinc-400 border border-zinc-500 shadow-sm flex items-center justify-center text-[7px] font-bold text-zinc-700">
                USB-B
              </div>
              <div className="w-6 h-7 rounded-sm bg-zinc-900 border border-zinc-700 shadow-inner flex items-center justify-center text-[6px] text-zinc-400">
                7-12V
              </div>
            </div>

            {/* Merkez: ATmega328P DIP Çip */}
            <div className="w-24 h-7 rounded bg-zinc-950 border border-zinc-800 shadow-md flex items-center justify-center relative">
              {/* Çip Bacakları (Silvers) */}
              <div className="absolute -top-1 w-20 flex justify-between px-1">
                {[...Array(7)].map((_, i) => (
                  <span key={i} className="w-1 h-1 bg-zinc-400 rounded-xs" />
                ))}
              </div>
              <span className="text-[8px] font-mono font-bold text-zinc-400 tracking-wider">
                ATMEGA328P-PU
              </span>
              <div className="absolute -bottom-1 w-20 flex justify-between px-1">
                {[...Array(7)].map((_, i) => (
                  <span key={i} className="w-1 h-1 bg-zinc-400 rounded-xs" />
                ))}
              </div>
            </div>

            {/* Sağ: Kristal Osilatör & Reset Butonu */}
            <div className="space-y-2 flex flex-col items-end">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-600 shadow-xs flex items-center justify-center text-[6px] font-bold text-amber-950">
                RST
              </div>
              <div className="w-5 h-2 rounded-full bg-zinc-300 border border-zinc-400 shadow-xs text-[5px] text-center text-zinc-700 font-bold">
                16MHz
              </div>
            </div>
          </div>

          {/* Alt: Header Pin Çizgileri */}
          <div className="flex justify-between items-center text-[8px] font-mono text-white/70 border-t border-white/20 pt-1">
            <span className="flex items-center gap-0.5">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-xs bg-zinc-900 inline-block border border-zinc-700" />
              ))}
              <span className="ml-1 text-[7px]">POWER</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="mr-1 text-[7px]">DIGITAL PWM</span>
              {[...Array(8)].map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-xs bg-zinc-900 inline-block border border-zinc-700" />
              ))}
            </span>
          </div>
        </div>
      );

    // 2. ESP32 WROOM-32
    case "esp32-wroom-32":
    case "esp32-devkit-v1":
    case "esp32-s3":
      return (
        <div className={`w-full aspect-16/10 rounded-2xl bg-gradient-to-br from-[#121216] to-[#25252c] p-3 relative flex flex-col justify-between overflow-hidden shadow-inner border border-zinc-700 ${className}`}>
          {/* Silkscreen Başlık */}
          <div className="flex items-center justify-between text-zinc-300 font-mono text-[10px]">
            <div className="flex items-center gap-1 font-bold text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
              <span>ESP32 DEVKIT V1</span>
            </div>
            <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
              Wi-Fi + BLE
            </span>
          </div>

          {/* Metal RF Kalkan & Wi-Fi Anteni */}
          <div className="flex items-center justify-between my-auto px-2">
            {/* Sol: Micro-USB & Butonlar */}
            <div className="space-y-1.5">
              <div className="w-6 h-4 rounded-sm bg-zinc-400 border border-zinc-300 text-[6px] text-center text-zinc-800 font-bold">
                USB
              </div>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-red-600 border border-red-400 text-[5px] text-white text-center font-bold">EN</span>
                <span className="w-2.5 h-2.5 rounded-xs bg-zinc-700 border border-zinc-500 text-[5px] text-zinc-200 text-center font-bold">IO0</span>
              </div>
            </div>

            {/* Merkez: Metal RF Shield */}
            <div className="w-24 h-12 rounded-md bg-gradient-to-br from-zinc-200 to-zinc-400 border border-zinc-100 shadow-md p-1.5 flex flex-col justify-between text-zinc-800">
              <div className="text-[7px] font-mono font-black">ESPRESSIF</div>
              <div className="text-[8px] font-mono font-bold tracking-wider text-center">ESP-WROOM-32</div>
              <div className="text-[6px] font-mono text-zinc-600">FCC ID: 2AC7Z</div>
            </div>

            {/* Sağ: Altın Wi-Fi PCB Anteni */}
            <div className="w-6 h-10 border-2 border-dashed border-amber-400 rounded-sm bg-amber-400/10 flex items-center justify-center">
              <span className="text-[6px] font-bold text-amber-400 -rotate-90">ANT</span>
            </div>
          </div>

          {/* İki Taraf Pin Dizileri */}
          <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500 border-t border-zinc-800 pt-1">
            <span>30-PIN DUAL HEADER</span>
            <span className="text-emerald-400 font-bold">240 MHz DUAL CORE</span>
          </div>
        </div>
      );

    // 3. RASPBERRY PI 5 / SBC
    case "raspberry-pi-5":
      return (
        <div className={`w-full aspect-16/10 rounded-2xl bg-gradient-to-br from-[#10562e] to-[#166534] p-3 relative flex flex-col justify-between overflow-hidden shadow-inner border border-emerald-400/30 ${className}`}>
          {/* Silkscreen Başlık */}
          <div className="flex items-center justify-between text-white font-mono text-[10px]">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span>Raspberry Pi 5</span>
            </div>
            <span className="text-[8px] bg-rose-950/60 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/40">
              BCM2712 2.4GHz
            </span>
          </div>

          {/* Donanım Blokları */}
          <div className="flex items-center justify-between my-auto px-1 gap-2">
            {/* Broadcom CPU Isı Dağıtıcısı */}
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 border border-white shadow-md flex flex-col items-center justify-center p-1">
              <span className="text-[7px] font-mono font-black text-zinc-800">BROADCOM</span>
              <span className="text-[8px] font-mono font-bold text-zinc-900">BCM2712</span>
              <span className="text-[6px] font-mono text-zinc-600">ARM Cortex-A76</span>
            </div>

            {/* RP1 I/O Çipi */}
            <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 flex flex-col items-center justify-center text-zinc-300 text-[6px] font-mono">
              <span>RP1</span>
              <span className="text-[5px] text-emerald-400">I/O</span>
            </div>

            {/* Sağ Portlar: USB 3.0 & Gigabit Ethernet */}
            <div className="space-y-1.5 flex flex-col items-end">
              <div className="w-7 h-5 rounded-sm bg-blue-600 border border-blue-400 text-[6px] text-white font-bold flex items-center justify-center">
                USB 3.0
              </div>
              <div className="w-7 h-5 rounded-sm bg-zinc-300 border border-zinc-400 text-[6px] text-zinc-800 font-bold flex items-center justify-center">
                GbE
              </div>
            </div>
          </div>

          {/* 40-Pin GPIO Başlığı */}
          <div className="flex justify-between items-center text-[7px] font-mono text-white/70 border-t border-white/20 pt-1">
            <span>40-PIN EXPANSION HEADER</span>
            <span className="text-amber-300 font-bold">PCIe 2.0 x1 NVMe</span>
          </div>
        </div>
      );

    // 4. RASPBERRY PI PICO / PICO W
    case "raspberry-pi-pico-w":
    case "rpi-pico":
      return (
        <div className={`w-full aspect-16/10 rounded-2xl bg-gradient-to-br from-[#166534] to-[#15803d] p-3 relative flex flex-col justify-between overflow-hidden shadow-inner border border-emerald-400/30 ${className}`}>
          <div className="flex items-center justify-between text-white font-mono text-[10px]">
            <span className="font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block" />
              Raspberry Pi Pico W
            </span>
            <span className="text-[8px] bg-black/20 text-emerald-200 px-1 rounded">RP2040</span>
          </div>

          <div className="flex items-center justify-around my-auto">
            <div className="w-5 h-4 bg-zinc-300 rounded-sm border border-zinc-400 text-[6px] text-center text-zinc-800 font-bold">
              USB
            </div>
            {/* RP2040 Çipi */}
            <div className="w-10 h-10 rounded bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center text-zinc-300 text-[6px] font-mono shadow-md">
              <span className="font-bold text-white">RP2040</span>
              <span className="text-[5px] text-emerald-400">Dual M0+</span>
            </div>
            {/* Metal Wi-Fi Shield */}
            <div className="w-8 h-8 rounded bg-zinc-200 border border-zinc-300 flex items-center justify-center text-[6px] font-bold text-zinc-700">
              Wi-Fi
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] font-mono text-white/80 border-t border-white/20 pt-1">
            <span>CASTLEATED PIN EDGES</span>
            <span className="text-emerald-200 font-bold">8x PIO BLOCKS</span>
          </div>
        </div>
      );

    // 5. DIGILENT BASYS 3 / FPGA
    case "digilent-basys-3":
    case "terasic-de10-lite":
    case "lattice-icestick":
      return (
        <div className={`w-full aspect-16/10 rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#047857] p-3 relative flex flex-col justify-between overflow-hidden shadow-inner border border-emerald-300/30 ${className}`}>
          <div className="flex items-center justify-between text-white font-mono text-[10px]">
            <span className="font-bold flex items-center gap-1 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              AMD XILINX ARTIX-7 FPGA
            </span>
            <span className="text-[8px] bg-black/40 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
              Basys 3
            </span>
          </div>

          <div className="flex items-center justify-between my-auto px-2">
            <div className="w-7 h-5 rounded-sm bg-blue-700 border border-blue-400 text-[6px] text-white font-bold flex items-center justify-center">
              VGA
            </div>

            {/* Büyük Artix-7 BGA Çipi */}
            <div className="w-14 h-14 rounded-lg bg-zinc-950 border border-zinc-700 shadow-xl flex flex-col items-center justify-center text-zinc-200 p-1">
              <span className="text-[6px] font-mono text-zinc-500 font-bold">XILINX</span>
              <span className="text-[8px] font-mono font-black text-amber-400">ARTIX-7</span>
              <span className="text-[6px] font-mono text-zinc-400">XC7A35T</span>
            </div>

            {/* 7-Segment ve Switchler */}
            <div className="space-y-1 flex flex-col items-end">
              <div className="w-9 h-4 bg-red-950 border border-red-700 rounded-xs text-[6px] text-red-500 font-mono font-bold flex items-center justify-center tracking-widest">
                8.8.8.8
              </div>
              <div className="flex gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="w-1.5 h-3 bg-zinc-800 rounded-xs border border-zinc-600" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] font-mono text-emerald-200 border-t border-emerald-500/30 pt-1">
            <span>33,280 LOGIC CELLS</span>
            <span className="text-white font-bold">SystemVerilog RTL Sentezi</span>
          </div>
        </div>
      );

    // 6. NVIDIA JETSON NANO
    case "nvidia-jetson-nano":
      return (
        <div className={`w-full aspect-16/10 rounded-2xl bg-gradient-to-br from-[#1c1917] to-[#292524] p-3 relative flex flex-col justify-between overflow-hidden shadow-inner border border-stone-700 ${className}`}>
          <div className="flex items-center justify-between text-white font-mono text-[10px]">
            <span className="font-bold flex items-center gap-1 text-[#76b900]">
              <span className="w-2 h-2 rounded-full bg-[#76b900] inline-block" />
              NVIDIA Jetson Nano
            </span>
            <span className="text-[8px] bg-[#76b900]/20 text-[#76b900] px-1.5 py-0.5 rounded border border-[#76b900]/40">
              128 CUDA Çekirdeği
            </span>
          </div>

          <div className="flex items-center justify-between my-auto px-2">
            {/* Büyük Alüminyum Siyah Soğutucu Blok */}
            <div className="w-28 h-12 rounded-md bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Soğutucu Kanatçıkları (Fins) */}
              <div className="absolute inset-0 flex justify-between px-1 opacity-25">
                {[...Array(14)].map((_, i) => (
                  <span key={i} className="w-0.5 h-full bg-zinc-400" />
                ))}
              </div>
              <span className="text-[7px] font-mono font-bold text-zinc-400">NVIDIA TEGRA X1</span>
              <span className="text-[8px] font-mono font-black text-[#76b900]">MAXWELL GPU</span>
            </div>

            {/* Port Grubu */}
            <div className="space-y-1 flex flex-col items-end">
              <div className="w-7 h-4 rounded-xs bg-blue-600 border border-blue-400 text-[5px] text-white font-bold flex items-center justify-center">
                4x USB 3.0
              </div>
              <div className="w-7 h-4 rounded-xs bg-zinc-300 border border-zinc-400 text-[5px] text-zinc-800 font-bold flex items-center justify-center">
                HDMI 2.0
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] font-mono text-stone-400 border-t border-stone-800 pt-1">
            <span>4GB 64-bit LPDDR4</span>
            <span className="text-[#76b900] font-bold">TensorRT / YOLO AI</span>
          </div>
        </div>
      );

    // 7. STM32 NUCLEO / BLUE PILL (VARSAYILAN MCU)
    default:
      return (
        <div className={`w-full aspect-16/10 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] p-3 relative flex flex-col justify-between overflow-hidden shadow-inner border border-blue-400/30 ${className}`}>
          <div className="flex items-center justify-between text-white font-mono text-[10px]">
            <span className="font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-300 inline-block" />
              ARM Cortex-M Mikrodenetleyici
            </span>
            <span className="text-[8px] bg-black/30 text-blue-200 px-1.5 py-0.5 rounded">STM32</span>
          </div>

          <div className="flex items-center justify-around my-auto">
            <div className="w-5 h-4 bg-zinc-300 rounded-sm border border-zinc-400 text-[6px] text-center text-zinc-800 font-bold">
              USB
            </div>
            <div className="w-12 h-12 rounded bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center text-zinc-300 text-[7px] font-mono shadow-md rotate-45">
              <span className="font-bold text-white -rotate-45">STM32</span>
              <span className="text-[6px] text-blue-400 -rotate-45">32-bit ARM</span>
            </div>
            <div className="space-y-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 block shadow-xs" />
              <span className="w-2 h-2 rounded-full bg-amber-400 block shadow-xs" />
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] font-mono text-blue-200 border-t border-blue-500/30 pt-1">
            <span>SWD DEBUG / ST-LINK</span>
            <span className="text-white font-bold">72 MHz - 168 MHz</span>
          </div>
        </div>
      );
  }
}
