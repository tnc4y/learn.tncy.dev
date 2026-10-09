export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: "İşlemci & Mimari" | "Donanım Tasarımı" | "FPGA & EDA Araçları" | "Savunma & Kritik Sistemler" | "Yarı İletken & Çip";
  categoryColor: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featured?: boolean;
  sections: {
    id: string;
    title: string;
    content: string;
    callout?: {
      type: "info" | "warning" | "success" | "tip";
      title: string;
      message: string;
    };
    code?: {
      language: string;
      code: string;
      caption?: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  keyTakeaways: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  // =========================================================================
  // 1. YAZILIM VE İŞLEMCİ MİMARİSİ
  // =========================================================================
  {
    slug: "yazilim-ve-islemci-mimarisi",
    title: "Yazılım ve İşlemci Mimarisi: Kodlarımız Silikonda Nasıl Hayat Bulur?",
    subtitle: "Kaynak koddan ikili buyruklara, Von Neumann'dan modern Pipeline ve Cache hiyerarşisine uzanan derin teknik yolculuk.",
    excerpt: "Yazdığımız yüksek seviyeli bir C++ veya Python kodunun milyarlarca mikroskobik transistör tarafından nasıl yorumlanıp koşturulduğunu, Von Neumann mimarisini, CPU Pipeline evrelerini ve bellek hiyerarşisini adım adım inceliyoruz.",
    category: "İşlemci & Mimari",
    categoryColor: "badge-primary",
    tags: ["CPU", "İşlemci Mimarisi", "RISC-V", "x86", "Pipeline", "Cache", "Von Neumann"],
    readTime: "12 dk",
    publishedAt: "9 Ekim 2026",
    author: {
      name: "Tuncay & learn.tncy.dev Ekibi",
      role: "Sistem ve Donanım Mühendisi",
    },
    featured: true,
    sections: [
      {
        id: "giris-soyutlama-katmanlari",
        title: "1. Soyutlama Katmanları: Koddan Transistöre Köprü",
        content: `Çoğu yazılımcı için bilgisayar bir işletim sistemi ve üzerinde çalışan bir derleyiciden ibarettir. Ancak gerçekte yazılım ile fiziksel donanım arasında kusursuz bir katmanlaşma vardır:

1. **Yüksek Seviyeli Dil (C++, Rust, Python):** İnsan algısına uygun mantıksal soyutlama.
2. **Derleyici & Ara Temsil (Compiler & IR):** Kodu optimize ederek hedef mimarinin anlayacağı Assembly komutlarına çevirir.
3. **Komut Kümesi Mimarisi (ISA - Instruction Set Architecture):** Yazılım ile donanım arasındaki resmi sözleşme (x86, ARM, RISC-V).
4. **Mikromimari (Microarchitecture):** ISA'nın donanımsal icrası (ALU, Pipeline, Branch Predictor, Cache).
5. **RTL Mantığı (Register Transfer Level):** Verilog veya SystemVerilog ile kapı seviyesinde tasarlanan lojik bloklar.
6. **Silikon & Fiziksel Transistörler:** CMOS transistörler, voltaj seviyeleri ve lojik 1/0 gerilimleri.

Bu zinciri anlamak, yüksek başarımlı (high-performance) ve bellek dostu yazılım geliştirmenin anahtarıdır.`,
        callout: {
          type: "info",
          title: "Altın Kural: ISA Donanımın API'sidir",
          message: "ISA (Instruction Set Architecture), bir işlemcinin desteklediği komutları, register sayısını ve adresleme biçimlerini tanımlar. Aynı ISA'yı (örn: ARMv8) Apple M serisi ve Qualcomm Snapdragon farklı mikromimarilerle bambaşka başarılarda uygulayabilir.",
        },
      },
      {
        id: "mimari-modeller-von-neumann-vs-harvard",
        title: "2. Mimari Modeller: Von Neumann vs Harvard",
        content: `İşlemci dünyasında bellek organizasyonu tarih boyunca iki temel felsefeyle şekillenmiştir:

### Von Neumann Mimarisi
- Program komutları (instructions) ve veriler (data) **aynı fiziksel belleği** ve aynı veri yolunu (bus) paylaşır.
- **Avantajı:** Donanım tasarımı basittir, bellek alanı esnek kullanılır.
- **Dezavantajı (Von Neumann Darboğazı):** İşlemci bir komut çekerken (fetch) aynı anda bellekten veri okuyamaz veya yazamaz. Veri yolu darboğaz yaratır.

### Harvard Mimarisi
- Komut belleği ve veri belleği **tamamen ayrı fiziksel yollara (bus) ve adres alanlarına** sahiptir.
- **Avantajı:** İşlemci aynı saat vuruşunda hem komut okuyabilir hem de veri belleğine yazabilir. Çok daha yüksek bant genişliği sunar.
- **Dezavantajı:** Daha karmaşık fiziksel kablolama ve donanım maliyeti.

Modern masaüstü ve sunucu işlemcileri (Intel Core, AMD Ryzen, Apple Silicon) bu iki mimariyi **Modifiye Edilmiş Harvard (Modified Harvard)** çatısı altında birleştirir: Dışarıdan bakıldığında RAM tek bir adrestir (Von Neumann kolaylığı), ancak CPU çekirdeğinin içinde L1 Komut Önbelleği (L1I) ve L1 Veri Önbelleği (L1D) tamamen birbirinden ayrıdır (Harvard hızı).`,
      },
      {
        id: "cpu-bilesenleri",
        title: "3. İşlemcinin İç Organları: Bir Çekirdeğin İçinde Ne Var?",
        content: `Bir CPU çekirdeğinin içinde temel olarak şu organlar görev yapar:

- **Program Sayacı (PC - Program Counter):** Yürütülecek bir sonraki makine komutunun RAM/Cache adresini tutar.
- **Komut Yazmacı (IR - Instruction Register):** Bellekten çekilen ve çözümlenmekte olan komutu saklar.
- **Register Dosyası (GPR - General Purpose Registers):** İşlemcinin en hızlı bellek birimidir (genellikle 32 adet 64-bit yazmaç). Sıfır gecikmeyle veriye erişir.
- **Aritmetik Mantık Birimi (ALU - Arithmetic Logic Unit):** Toplama, çıkarma, VE, VEYA, XOR ve kaydırma gibi tüm matematiksel ve mantıksal hesapları icra eden donanım.
- **Kontrol Birimi (Control Unit - CU):** Komut kodunu (opcode) çözerek veri yollarındaki multiplexer'ları, bellek okuma/yazma sinyallerini ve ALU işlemlerini yöneten devasa durum makinesidir.`,
        code: {
          language: "asm",
          code: `// Basit bir RISC-V Toplama ve Bellek Yükleme Örneği
lw   x5, 0(x10)     // RAM'den (x10 adresinden) x5 register'ına 32-bit veri yükle
lw   x6, 4(x10)     // x10+4 adresinden x6 register'ına veri yükle
add  x7, x5, x6     // ALU: x7 = x5 + x6 (1 saat çevriminde icra edilir)
sw   x7, 8(x10)     // Sonucu (x7) RAM'deki x10+8 adresine geri yaz`,
          caption: "RISC-V Komut Akışı: Bellek Yükleme, ALU İcrası ve Geri Yazma",
        },
      },
      {
        id: "pipeline-mekanizmasi",
        title: "4. Komut Hattı (Pipeline) Mantığı: Çamaşırhane Analojisi",
        content: `Eski işlemciler bir komutun işini tamamen bitirmeden yenisine başlamazdı. Bir komut 5 aşamadan geçiyorsa (Fetch, Decode, Execute, Memory, Write-back), her komut 5 saat vuruşu sürerdi.

Modern işlemciler bunu **Pipeline (Boru Hattı)** tekniğiyle çözer. Tıpkı bir çamaşırhanede birinci parti çamaşır yıkanıp kurutmaya geçtiğinde, boşalan çamaşır makinesine hemen ikinci partinin atılması gibidir:

1. **IF (Instruction Fetch):** Bellekten komutu oku.
2. **ID (Instruction Decode):** Komutun ne istediğini ve hangi register'ları kullanacağını çöz.
3. **EX (Execute):** ALU'da işlemi yap veya adresi hesapla.
4. **MEM (Memory Access):** Gerekiyorsa RAM'e veri yaz veya oku.
5. **WB (Write Back):** Çıkan sonucu hedef register'a kaydet.

Pipeline dolduğunda, ideal şartlarda **her saat vuruşunda bir komut tamamlanır (CPI = 1)**!`,
        table: {
          headers: ["Saat Çevrimi", "Komut 1", "Komut 2", "Komut 3", "Komut 4", "Komut 5"],
          rows: [
            ["Saat 1", "IF (Fetch)", "-", "-", "-", "-"],
            ["Saat 2", "ID (Decode)", "IF (Fetch)", "-", "-", "-"],
            ["Saat 3", "EX (Execute)", "ID (Decode)", "IF (Fetch)", "-", "-"],
            ["Saat 4", "MEM (Hafıza)", "EX (Execute)", "ID (Decode)", "IF (Fetch)", "-"],
            ["Saat 5", "WB (Bitti)", "MEM (Hafıza)", "EX (Execute)", "ID (Decode)", "IF (Fetch)"],
          ],
        },
      },
      {
        id: "pipeline-tehlikeleri-ve-branch-prediction",
        title: "5. Pipeline Tehlikeleri (Hazards) ve Branch Prediction",
        content: `Pipeline mükemmel görünse de pratikte 3 büyük engelle karşılaşır:

- **Yapısal Tehlike (Structural Hazard):** İki farklı komutun aynı anda aynı donanım birimine (örn: tek portlu bellek) ihtiyaç duyması.
- **Veri Tehlikesi (Data Hazard / RAW):** İkinci komutun, birinci komutun üreteceği sonuca muhtaç olması. Bu durumda pipeline duraklatılır (stall / bubble) veya 'Forwarding' bypass hattı kullanılır.
- **Kontrol Tehlikesi (Control Hazard):** Bir 'if' şartı veya döngü geldiğinde, işlemcinin hangi yoldan gideceğini önceden bilememesi.

Modern işlemciler kontrol tehlikesini **Dallanma Tahmincisi (Branch Predictor)** ile aşar. İşlemci geçmiş istatistiklere bakarak 'if bloğunun içine girilecek' varsayımıyla sonraki komutları önceden spekülatif olarak yürütür (Speculative Execution). Eğer tahmin doğruysa zaman kaybı sıfırdır; tahmin yanlış çıkarsa tüm pipeline boşaltılır (Pipeline Flush) ve 15-20 saat çevrimi ceza ödenir.`,
        callout: {
          type: "warning",
          title: "Yazılımcıya İpucu: Sıralı vs Rastgele Veri",
          message: "Sıralanmış bir dizi üzerinde çalışan 'if (arr[i] > 128)' kontrolü, rastgele dizide çalışan kontrolden 3 ila 5 kat daha hızlıdır! Çünkü Branch Predictor sıralı veride %99 doğrulukla tahmin yapar, rastgele veride sürekli yanılır.",
        },
      },
      {
        id: "bellek-hiyerarsisi-ve-cache",
        title: "6. Bellek Hiyerarşisi: Cache Neden Hayati Önem Taşır?",
        content: `İşlemciler son 30 yılda transistör hızları açısından devasa sıçrama yaptı; ancak DRAM belleklerin erişim süresi aynı oranda hızlanamadı. Bu fark 'Bellek Duvarı (Memory Wall)' olarak adlandırılır.

İşlemci doğrudan RAM'den veri beklerse yaklaşık 200 saat çevrimi boşta (idle) bekler. Bu yüzden katmanlı önbellek mimarisi kurulmuştur:

- **Register Dosyası:** ~1 KB | Gecikme: 0 çevrim (Anında)
- **L1 Cache (Çekirdeğe Özel):** 32 - 64 KB | Gecikme: ~4-5 çevrim (~1ns)
- **L2 Cache (Çekirdeğe Özel):** 512 KB - 1 MB | Gecikme: ~12-14 çevrim (~3ns)
- **L3 Cache (Çekirdekler Ortak):** 16 - 96 MB | Gecikme: ~40-60 çevrim (~10-15ns)
- **DRAM (Ana Bellek):** 16 - 64 GB | Gecikme: ~150-250 çevrim (~60-80ns)
- **NVMe SSD / Disk:** 1 - 4 TB | Gecikme: Binlerce çevrim (~10-50 mikrosaniye)

Yazılım geliştirirken matrisleri satır bazlı (row-major) gezmek Spatial Locality sağlayarak verilerin L1 önbelleğe peşin çekilmesini garantiler ve kodun katbekat hızlı çalışmasını sağlar.`,
      },
    ],
    keyTakeaways: [
      "Modern işlemciler dışarıdan Von Neumann gibi görünse de çekirdek içinde L1I ve L1D ile Harvard mimarisi kullanır.",
      "Pipeline tekniği sayesinde saat vuruşu başına düşen komut sayısı (IPC) dramatik şekilde artırılır.",
      "Branch Predictor ve Cache optimizasyonları, saf algoritma karmaşıklığı kadar (bazen daha fazla) performansı belirler.",
      "Yazılım ve işlemci mimarisi arasındaki ilişkiyi anlamak, 'Clean Code' ile 'Fast Code' arasındaki köprüyü kurar.",
    ],
  },

  // =========================================================================
  // 2. SYSTEMVERILOG NEDİR?
  // =========================================================================
  {
    slug: "systemverilog-nedir",
    title: "SystemVerilog Nedir? Modern Çip Tasarımı ve Doğrulamanın Kalbi",
    subtitle: "Klasik Verilog'un kısıtlarından IEEE 1800 standardına, sentezlenebilir RTL ve nesne yönelimli doğrulama (CRV & UVM) devrimi.",
    excerpt: "Neden milyarlarca dolarlık modern mikroişlemciler, GPU'lar ve SoC'ler SystemVerilog ile tasarlanıp doğrulanıyor? logic veri tipi, always_ff blokları, donanım interface yapıları ve UVM testbench gücünü derinlemesine keşfedin.",
    category: "Donanım Tasarımı",
    categoryColor: "badge-success",
    tags: ["SystemVerilog", "RTL", "FPGA", "ASIC", "UVM", "Doğrulama", "EDA"],
    readTime: "11 dk",
    publishedAt: "9 Ekim 2026",
    author: {
      name: "Tuncay & learn.tncy.dev Ekibi",
      role: "Sistem ve Donanım Mühendisi",
    },
    featured: true,
    sections: [
      {
        id: "sv-tarihcesi-ve-dogusu",
        title: "1. Verilog Neden Tıkandı? SystemVerilog'un Doğuşu",
        content: `1984 yılında Gateway Design Automation tarafından geliştirilen klasik Verilog (IEEE 1364), küçük dijital devrelerin simülasyonu için biçilmiş kaftandı. Ancak 2000'li yıllara gelindiğinde entegre devreler milyonlarca kapıya ulaştı ve şu büyük sorunlar baş gösterdi:

1. **Tasarım Hataları:** Klasik Verilog'daki \`reg\` ve \`wire\` veri tipleri sürekli kafa karıştırıyordu. Bir sinyalin fiziksel bir register mı yoksa basit bir bakır tel mi olduğu sentaks seviyesinde belirsizdi.
2. **İstenmeyen Latch Üretimi:** Eksik yazılmış bir \`always @(*)\` bloğu, sentezleyicinin devrede istemeden bellek hücresi (latch) türetmesine ve saat frekansının çökmesine yol açıyordu.
3. **Doğrulama Krizi:** Bir çipin RTL kodunu yazmak projenin sadece %30'unu alır; kalan %70'lik mesai çipin hatasız çalıştığını kanıtlamaya (Verification) harcanır. Verilog'da nesne yönelimli sınıflar (OOP), dinamik diziler ve kısıtlı rastgele test mekanizması yoktu.

İşte bu devasa boşluğu doldurmak için Accellera ve IEEE ortaklığıyla **SystemVerilog (IEEE 1800)** standardı ilan edildi. SystemVerilog hem **HDVL (Hardware Description and Verification Language)** hem de modern EDA araçlarının ortak dilidir.`,
        callout: {
          type: "tip",
          title: "SystemVerilog = Donanım Tasarımı + C++ Seviyesinde Doğrulama",
          message: "SystemVerilog hem sentezlenebilir RTL kodları yazabileceğiniz bir donanım dilidir, hem de Java/C++ benzeri OOP sınıfları, garbage collector ve kısıt çözücüsü barındıran güçlü bir test ortamıdır.",
        },
      },
      {
        id: "sv-tasarim-yenilikleri",
        title: "2. Donanım Tasarımında (RTL) Getirdiği Çığır Açan Yenilikler",
        content: `SystemVerilog donanım mühendislerinin işini şu temel yeniliklerle kökten değiştirdi:

### 1. 'logic' Veri Tipi
Artık 'bu sinyal reg mi olmalı wire mı?' diye düşünmeye gerek yoktur. Tek sürücülü (single-driver) tüm sinyaller için \`logic\` kullanılır:
\`\`\`systemverilog
logic clk;
logic [7:0] veri_yolu;
\`\`\`

### 2. Açık Niyet Belirten Bloklar
- **\`always_comb\`:** Tamamen kombinasyonel mantık için kullanılır. Duyarlılık listesini (\`*\`) otomatik doldurur ve eksik durum varsa derleyici uyarısı vererek latch oluşmasını engeller.
- **\`always_ff @(posedge clk or negedge rst_n)\`:** Yalnızca Flip-Flop (ardışıl mantık) için kullanılır.
- **\`always_latch\`:** Gerçekten bir latch tasarlanmak istendiğinde bilinçli olarak kullanılır.

### 3. Kullanıcı Tanımlı Tipler ve Enum
C benzeri \`typedef struct\` ve \`typedef enum\` desteği sayesinde durum makineleri (FSM) ve paket başlıkları okunabilir hale gelir.`,
        code: {
          language: "systemverilog",
          code: `// Modern SystemVerilog Durum Makinesi
typedef enum logic [1:0] {
  IDLE  = 2'b00,
  READ  = 2'b01,
  WRITE = 2'b10,
  ERROR = 2'b11
} fsm_state_t;

fsm_state_t simdiki_durum, sonraki_durum;

// Ardışıl Flip-Flop Bloğu
always_ff @(posedge clk or negedge rst_n) begin
  if (!rst_n) simdiki_durum <= IDLE;
  else        simdiki_durum <= sonraki_durum;
end

// Kombinasyonel Bir Sonraki Durum Mantığı
always_comb begin
  sonraki_durum = simdiki_durum;
  case (simdiki_durum)
    IDLE:  if (baslat) sonraki_durum = READ;
    READ:  sonraki_durum = WRITE;
    WRITE: sonraki_durum = IDLE;
    default: sonraki_durum = IDLE;
  endcase
end`,
          caption: "SystemVerilog ile Açık ve Hatasız 3-Parçalı FSM Şablonu",
        },
      },
      {
        id: "interface-modulleri",
        title: "3. Donanım Arayüzleri: 'interface' ve 'modport'",
        content: `Karmaşık bir SoC projesinde modüller arasında bazen 50 ila 100 pinlik AXI, PCIe veya SPI veri yolları taşınır. Klasik Verilog'da bu 100 pin her alt modüle tek tek port olarak bağlanmak zorundaydı ve bir sinyal değiştiğinde yüzlerce satır kod bozuluyordu.

SystemVerilog **\`interface\`** kavramını getirdi:
- Tüm sinyalleri tek bir arayüz paketinde toplar.
- \`modport\` ile modüllerin o arayüze göre yönünü (master: çıkış, slave: giriş) belirler.
- Modüller arası bağlantı tek bir satıra iner: \`cpu_core dut (.axi_bus(axi_if.master));\`.`,
      },
      {
        id: "dogrulama-ve-uvm",
        title: "4. Doğrulama Devrimi: OOP, CRV ve UVM",
        content: `SystemVerilog'u asıl vazgeçilmez kılan unsur **Testbench** yetenekleridir:

- **Sınıflar (Classes):** Test senaryoları, veri paketleri (packet/transaction) ve doğrulama bileşenleri (Driver, Monitor, Scoreboard) nesne yönelimli sınıflar olarak kodlanır.
- **Kısıtlı Rastgele Test (CRV - Constrained Random Verification):** Test mühendisi el ile tek tek test yazmaz; kuralları ve kısıtları tanımlar (\`constraint c_len { payload.size() inside {[64:1518]}; }\`), SystemVerilog kısıt çözücüsü ise milyonlarca rastgele köşe durum (corner-case) test paketini otomatik üretir.
- **Fonksiyonel Kapsama (Functional Coverage):** Kodun hangi protokol durumlarını, hangi hata senaryolarını test ettiğini matematiksel yüzdeyle (%100 Coverage) raporlar.
- **UVM (Universal Verification Methodology):** Dünyadaki tüm çip devlerinin (Intel, AMD, Nvidia, Apple, Qualcomm) ortak kullandığı standart testbench çerçevesidir.`,
        callout: {
          type: "success",
          title: "Endüstri Standardı",
          message: "Bugün bir ASIC veya büyük FPGA tasarımında doğrulama için SystemVerilog/UVM bilmek sektörün en çok aranan ve en yüksek değerli mühendislik yetkinliklerinden biridir.",
        },
      },
    ],
    keyTakeaways: [
      "SystemVerilog, klasik Verilog'un tasarım açıklarını kapatan ve devasa doğrulama araçları ekleyen üst kümesidir.",
      "logic, always_comb ve always_ff sentezlenebilir donanım tasarımını çok daha güvenli hale getirir.",
      "interface yapısı SoC projelerinde sinyal karmaşasını tek bir modüler kablo demetine dönüştürür.",
      "OOP, CRV ve UVM sayesinde silikona gitmeden önce çiplerin %100 doğrulukla test edilmesi sağlanır.",
    ],
  },

  // =========================================================================
  // 3. NEDEN VIVADO EN ÇOK KULLANILAN ARAÇTIR?
  // =========================================================================
  {
    slug: "neden-vivado-en-cok-kullanilan-aractir",
    title: "Neden AMD/Xilinx Vivado En Çok Tercih Edilen FPGA Geliştirme Aracıdır?",
    subtitle: "Xilinx ISE'den Vivado Design Suite'e, IP Integrator'den Vivado HLS ve UltraFast metodolojisine endüstri liderliğinin anatomisi.",
    excerpt: "Dünya genelinde üniversitelerden savunma sanayiine, yapay zeka hızlandırıcılardan telekoma kadar FPGA mühendislerinin neden ezici çoğunlukla Vivado kullandığını, IP Integrator kolaylığını, donanım içi hata ayıklama (ILA) araçlarını ve Vivado HLS gücünü inceliyoruz.",
    category: "FPGA & EDA Araçları",
    categoryColor: "badge-warning",
    tags: ["Vivado", "FPGA", "AMD Xilinx", "Zynq", "IP Integrator", "HLS", "EDA"],
    readTime: "13 dk",
    publishedAt: "9 Ekim 2026",
    author: {
      name: "Tuncay & learn.tncy.dev Ekibi",
      role: "Sistem ve Donanım Mühendisi",
    },
    featured: true,
    sections: [
      {
        id: "vivado-dogusu-ve-ise-gecisi",
        title: "1. Bir Dönüm Noktası: ISE'den Vivado'ya 200 Milyon Dolarlık Geçiş",
        content: `2012 yılına kadar Xilinx mühendisleri **ISE Design Suite** kullanıyordu. Ancak 28nm teknolojisiyle birlikte (7-Serisi: Artix-7, Kintex-7, Virtex-7 ve Zynq-7000) FPGA'lerde mantık kapısı sayısı milyonlardan milyarlara çıktı. ISE'nin 1990'lardan kalma mimarisi bu devasa çipleri derlerken saatlerce, hatta günlerce süren yerleşim (Place & Route) sürelerine takılıyordu.

Xilinx, sıfırdan modern bir EDA ortamı inşa etmek için yaklaşık 200 milyon dolar ve 500 adam-yıllık Ar-Ge yatırımı yaparak **Vivado Design Suite**'i piyasaya sürdü:
- Ortak bellek veri tabanı (Shared Data Model) ile sentez, yerleşim ve zaman analizi arasındaki geçişlerde veri kaybı ve disk okuma-yazma gecikmeleri sıfırlandı.
- Standart sektör zamanlama kısıtı dili **SDC / XDC (Xilinx Design Constraints)** benimsendi.
- Tcl (Tool Command Language) komut satırı mimarisiyle %100 otomasyona ve CI/CD süreçlerine uyumlu hale geldi.`,
      },
      {
        id: "ip-integrator-devrimi",
        title: "2. Blok Diyagramlarla Donanım İnşası: Vivado IP Integrator (IPI)",
        content: `Vivado'yu rakiplerinden ayıran en çarpıcı özellik **IP Integrator** arayüzüdür.

Geleneksel yöntemde bir ARM işlemci çekirdeğini (Zynq PS), DDR bellek kontrolcüsünü, DMA motorunu ve kendi yazdığınız donanım modülünü bağlamak için binlerce satır Verilog kablolaması yapmanız gerekirdi.

Vivado IP Integrator ile:
- Çekirdekler blok diyagram tuvaline sürüklenip bırakılır.
- **Run Connection Automation** ve **Run Block Automation** butonları AXI veri yollarını, saat hatlarını ve reset sinyallerini akıllıca otomatik bağlar.
- AXI4, AXI4-Lite ve AXI-Stream protokolleri renkli çizgilerle ayrıştırılır, adres haritası (Address Editor) otomatik üretilir.
- Dakikalar içinde çalışan bir gömülü Linux SoC donanım platformu elde edilir.`,
        callout: {
          type: "info",
          title: "Zynq Ekosisteminin Hakimiyeti",
          message: "Vivado'nun bu kadar yaygın olmasının en büyük nedenlerinden biri AMD/Xilinx Zynq mimarisidir. Çift çekirdek ARM işlemci ile FPGA lojiğini aynı silikonda birleştiren Zynq, Vivado olmadan yönetilemeyecek kadar güçlü bir ekosistem yaratmıştır.",
        },
      },
      {
        id: "vivado-hls-c-cpp-donanima",
        title: "3. Vivado HLS (Vitis HLS): C/C++ ile Donanım Sentezi",
        content: `Yapay zeka, görüntü işleme ve dijital sinyal işleme (DSP) algoritmalarını saf Verilog/VHDL ile yazmak aylar sürebilir.

**Vivado HLS (High-Level Synthesis)** ile:
- C veya C++ dilinde yazılan standart bir filtre veya matris çarpımı fonksiyonu alınır.
- \`#pragma HLS PIPELINE\` ve \`#pragma HLS UNROLL\` direktifleriyle döngüler donanımda paralelleştirilir.
- Araç, bu C++ kodunu tamamen sentezlenebilir, saat frekansına uygun AXI arayüzlü bir SystemVerilog/VHDL IP modülüne dönüştürür.
- Bu özellik, yazılımcıların ve algoritma mühendislerinin FPGA dünyasına adım atmasını sağlamıştır.`,
      },
      {
        id: "ila-ve-donanim-ici-hata-ayiklama",
        title: "4. Donanım İçi Osiloskop: ILA (Integrated Logic Analyzer)",
        content: `FPGA üzerinde bir donanım tasarladığınızda simülasyonda çalışan kod bazen gerçek kart üzerinde çalışmaz. Kartın üzerindeki saat frekansı, harici sensör gürültüleri veya senkronizasyon hataları fiziksel dünyada ortaya çıkar.

Vivado'nun **ILA (Integrated Logic Analyzer)** çekirdeği sayesinde:
- FPGA'in içindeki BRAM bellekler geçici bir veri kaydediciye dönüştürülür.
- İncelenmek istenen kritik iç sinyaller ILA'ya bağlanır.
- JTAG kablosu üzerinden Vivado Hardware Manager ekranında fiziksel FPGA içindeki sinyal dalga formları (Waveform) canlı bir osiloskop gibi izlenir!
- Karmaşık tetikleyiciler (Trigger: 'Eğer veri 0xFF olursa ve hata biti 1 olursa kaydet') kurulabilir.`,
      },
      {
        id: "arac-karsilastirma-matrisi",
        title: "5. Karşılaştırma: Vivado vs Intel Quartus Prime vs Açık Kaynak",
        content: `FPGA pazarındaki temel araçların karşılaştırması:`,
        table: {
          headers: ["Özellik", "AMD/Xilinx Vivado", "Intel Quartus Prime", "Açık Kaynak (Yosys/nextpnr)"],
          rows: [
            ["Pazar Payı", "%55+ (Endüstri Lideri)", "%35 (Çok Güçlü)", "%5-10 (Yükselişte)"],
            ["IP Entegratörü", "Üst Seviye (IP Integrator)", "Platform Designer (Qsys)", "Komut Satırı / Manuel"],
            ["Yüksek Seviye Sentez", "Vitis HLS (Mükemmel)", "Intel HLS Compiler", "Sınırlı (Calyx/Bambu)"],
            ["Hata Ayıklama", "ILA & VIO (Çok Başarılı)", "Signal Tap Logic Analyzer", "Dahili BRAM lojik izleme"],
            ["Zamanlama Kısıtı", "Endüstri Standardı XDC / SDC", "Synopsys SDC", "Basit kısıt dosyaları"],
            ["Lisans", "WebPACK (Ücretsiz) / Standart", "Lite (Ücretsiz) / Standart", "%100 Açık Kaynak / Ücretsiz"],
          ],
        },
      },
    ],
    keyTakeaways: [
      "Vivado, modern bellek veri modeli ve XDC kısıt motoruyla büyük FPGA tasarımlarını saatler yerine dakikalarda derler.",
      "IP Integrator arayüzü karmaşık SoC ve AXI veri yolu bağlantılarını görsel blok diyagram kolaylığına indirgemiştir.",
      "Vitis HLS ile C/C++ kodlarını yüksek başarımlı RTL donanımlara dönüştürme yeteneği sektörde benzersiz bir avantajdır.",
      "ILA ve Hardware Manager araçları sayesinde donanım içindeki sinyaller JTAG üzerinden canlı olarak hata ayıklanabilir.",
    ],
  },

  // =========================================================================
  // 4. VHDL NEDİR?
  // =========================================================================
  {
    slug: "vhdl-nedir-ve-nerelerde-kullanilir",
    title: "VHDL Nedir? Savunma Sanayii ve Kritik Sistemlerin Katı Donanım Dili",
    subtitle: "DoD kökenlerinden IEEE 1076 standardına, güçlü tip sistemi (strong typing) ve sıfır hata toleranslı sistemlerin vazgeçilmezi.",
    excerpt: "Neden havacılık, uzay ve savunma sanayiinde (ASELSAN, ROKETSAN, NASA, ESA) hala VHDL tercih ediliyor? Güçlü tip denetimi, entity/architecture ayrımı ve Verilog ile felsefi farklarını tüm detaylarıyla öğrenin.",
    category: "Savunma & Kritik Sistemler",
    categoryColor: "badge-error",
    tags: ["VHDL", "Savunma Sanayii", "Havacılık", "DO-254", "FPGA", "IEEE 1076", "Donanım"],
    readTime: "10 dk",
    publishedAt: "9 Ekim 2026",
    author: {
      name: "Tuncay & learn.tncy.dev Ekibi",
      role: "Sistem ve Donanım Mühendisi",
    },
    featured: true,
    sections: [
      {
        id: "vhdl-kokeni-ve-tarihcesi",
        title: "1. VHDL'in Kökeni: Amerikan Savunma Bakanlığı (DoD) Mirası",
        content: `**VHDL** (VHSIC Hardware Description Language), 1980'lerin başında ABD Savunma Bakanlığı'nın (Department of Defense - DoD) **VHSIC (Very High Speed Integrated Circuits)** programı kapsamında doğdu.

O dönemde Amerikan ordusunun en büyük kabusu şuydu: Yüzlerce farklı alt yüklenici firma (Boeing, Lockheed Martin, Raytheon vb.) silah sistemleri için çipler üretiyordu. Ancak her firmanın dokümantasyon dili farklıydı. Bir firma iflas ettiğinde veya tasarımın yenilenmesi gerektiğinde, o çipin ne yaptığı anlaşılamıyordu.

DoD şu şartı koştu:
- Tasarımlar standart, okunabilir, donanım bağımsız ve belgelenebilir tek bir dilde yazılacak.
- Dil o dönemin en güvenilir askeri yazılım dili olan **Ada** sentaksını örnek alacak.
- Tip güvenliği o kadar katı olacak ki, mühendis derleme anında en ufak bir bit genişliği uyuşmazlığında veya geçersiz tip atamasında durdurulacak.

1987 yılında **IEEE 1076** standardı olarak kabul edilen VHDL, bugün havacılık ve savunma sanayiinde bu ödünsüz disiplini temsil eder.`,
      },
      {
        id: "guclu-tip-sistemi",
        title: "2. Güçlü Tip Sistemi (Strong Typing): Hata Yapmayı İmkansız Kılmak",
        content: `Verilog C dilinin esnekliğini taşır; bir 8-bitlik integer ile bir 1-bitlik wire'ı sessizce birbirine atayabilirsiniz, derleyici hata vermez (sadece kırpar veya genişletir). Bu esneklik hızlı prototipleme sağlasa da, gözden kaçan bir hata bir füzenin hedeften sapmasına veya uçağın kontrol yüzeyinin kilitlenmesine yol açabilir!

VHDL'de ise **Güçlü Tip Sistemi (Strong Typing)** geçerlidir:
- Bir \`integer\` ile \`std_logic_vector\` doğrudan toplanamaz!
- Önce açıkça tip dönüşümü (type casting) yapılmalıdır.
- Sinyal genişlikleri (bit-width) birebir uyuşmak zorundadır.
- Derleyici hiçbir şeyi tahmin etmez; ne yazdıysanız harfiyen onu ister.`,
        code: {
          language: "vhdl",
          code: `-- VHDL ile Basit Bir Sayıcı (Counter) ve Tip Dönüşümü
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL; -- Aritmetik işlemler için standart kütüphane

entity counter is
    Port (
        clk   : in  std_logic;
        rst_n : in  std_logic;
        count : out std_logic_vector(3 downto 0)
    );
end entity counter;

architecture Behavioral of counter is
    signal count_reg : unsigned(3 downto 0); -- Aritmetik tip
begin
    process(clk, rst_n)
    begin
        if rst_n = '0' then
            count_reg <= (others => '0');
        elsif rising_edge(clk) then
            count_reg <= count_reg + 1; -- unsigned ile aritmetik toplama
        end if;
    end process;

    -- Açık Tip Dönüşümü (Explicit Casting):
    count <= std_logic_vector(count_reg);
end architecture Behavioral;`,
          caption: "VHDL Modüler Yapısı: entity, architecture ve numeric_std kütüphanesi",
        },
      },
      {
        id: "entity-ve-architecture-ayrimi",
        title: "3. 'entity' ve 'architecture' Ayrımı",
        content: `VHDL'in en zarif tasarım felsefelerinden biri arayüz ile iç uygulamanın kesin olarak ayrılmasıdır:

- **\`entity\`:** Donanımın dışarıya bakan yüzüdür. Giriş ve çıkış pinlerini (port) tanımlar.
- **\`architecture\`:** Bu donanımın içinde ne olduğunu tanımlar.

Bir \`entity\` için **birden fazla \`architecture\`** yazabilirsiniz! Örneğin \`alu\` isimli bir entity tanımlayıp:
- Bir adet \`architecture RTL\` (gerçek FPGA için sentezlenebilir hızlı tasarım)
- Bir adet \`architecture Behavioral\` (hızlı simülasyon için davranışsal kod)
tanımlayabilir ve derleyiciye hangi mimariyi kullanacağını tek satırla belirtebilirsiniz.`,
      },
      {
        id: "neden-savunma-sanayi",
        title: "4. Neden Savunma Sanayii ve DO-254 Havacılık Standardı?",
        content: `Türkiye'de ASELSAN, ROKETSAN, HAVELSAN ve TUSAŞ gibi devler; küresel ölçekte ise NASA, ESA, Airbus ve Thales projelerinde neden hala VHDL birincil dildir?

1. **DO-254 Sertifikasyonu:** Sivil havacılıkta bir uçakta uçacak donanımın DO-254 (Design Assurance Guidance for Airborne Electronic Hardware) sertifikası alması zorunludur. VHDL'in katı kuralları, tasarımın her aşamasının matematiksel olarak izlenebilir olmasını sağlar.
2. **Uzun Ömürlü Sistemler (Obsolescence Management):** Bir savaş uçağı veya radar sistemi 30-40 yıl hizmet verir. VHDL kodları o kadar açık ve kütüphane bağımsızdır ki, 1995 yılında yazılmış bir VHDL kodu bugün en modern FPGA'de tek bir satır değişmeden derlenebilir.
3. **Avrupa Geleneği:** Amerika ticari silikon vadisi şirketlerinde Verilog/SystemVerilog'a ağırlık verirken, Avrupa ve savunma ekosistemi VHDL ekolünü devam ettirmektedir.`,
        callout: {
          type: "tip",
          title: "Mühendislere Tavsiye",
          message: "Savunma sanayiinde kariyer hedefleyen bir donanım mühendisinin VHDL bilmesi neredeyse zorunluluktur; tüketici elektroniği ve çip devlerinde (Apple, Intel, Nvidia) ise SystemVerilog ağırlıktadır. Her iki dile de hakim olmak en büyük rekabet avantajıdır.",
        },
      },
    ],
    keyTakeaways: [
      "VHDL, Amerikan Savunma Bakanlığı standartlarıyla doğmuş, Ada dili tabanlı katı bir donanım tanımlama dilidir.",
      "Güçlü tip sistemi (Strong Typing) hataların henüz derleme aşamasında tespit edilmesini garanti eder.",
      "entity ve architecture ayrımı, arayüz ile implementasyon arasında muazzam bir modülerlik sunar.",
      "Havacılık (DO-254) ve savunma sanayiinde 30-40 yıllık sistem kararlılığı için vazgeçilmez endüstri standardıdır.",
    ],
  },

  // =========================================================================
  // 5. FPGA VS ASIC
  // =========================================================================
  {
    slug: "fpga-vs-asic-karsilastirmasi",
    title: "FPGA vs ASIC: Hangi Durumda Hangisi Seçilmeli? (Maliyet, Güç ve Hız Analizi)",
    subtitle: "Yeniden programlanabilir lojik bloklar mı, yoksa fabrikada dökülen kalıcı silikon mu? Başabaş analizi ve stratejik tercihler.",
    excerpt: "FPGA'lerin esnekliği ve anında devreye alınma gücü ile ASIC'lerin rakipsiz enerji verimliliği ve birim maliyet avantajını masaya yatırıyoruz. Hangi üretim hacminde ASIC'e geçilmeli?",
    category: "Yarı İletken & Çip",
    categoryColor: "badge-info",
    tags: ["FPGA", "ASIC", "Yarı İletken", "Maliyet Analizi", "Donanım", "Çip Tasarımı"],
    readTime: "9 dk",
    publishedAt: "9 Ekim 2026",
    author: {
      name: "Tuncay & learn.tncy.dev Ekibi",
      role: "Sistem ve Donanım Mühendisi",
    },
    featured: false,
    sections: [
      {
        id: "temel-kavramlar",
        title: "1. Temel Tanımlar: Esneklik vs Özelleşmiş Silikon",
        content: `- **FPGA (Field Programmable Gate Array):** Fabrikadan çıktıktan sonra sahada mühendis tarafından SRAM tabanlı konfigürasyon dosyasıyla (Bitstream) içindeki mantık kapıları, LUT'ları ve yönlendirme yolları anında yeniden programlanabilen entegre devredir.
- **ASIC (Application-Specific Integrated Circuit):** Yalnızca tek bir belirli görev için özel olarak tasarlanan ve yarı iletken fabrikasında (TSMC, Intel, GlobalFoundries) silikon katmanlarına kalıcı olarak kazınan entegre devredir. Üretildikten sonra donanım mantığı asla değiştirilemez.`,
      },
      {
        id: "karsilastirma-kriterleri",
        title: "2. Karşılaştırma Kriterleri: Maliyet, Hız ve Güç",
        content: `Donanım mimarisini seçerken şu dört parametre belirleyicidir:

1. **NRE (Non-Recurring Engineering) Maliyeti:** ASIC tasarlamak milyonlarca dolarlık maske seti ve EDA lisansı gerektirir. FPGA'de ise NRE maliyeti sıfıra yakındır; kartı satın alır ve kodunuzu yüklersiniz.
2. **Birim Parça Maliyeti (Unit Cost):** Yüksek hacimlerde (örn: 1 milyon adet) bir ASIC çipinin maliyeti 2-3 dolar iken, eşdeğer lojiğe sahip bir FPGA çipi 50-200 dolar olabilir.
3. **Güç Tüketimi (Power Consumption):** FPGA içinde kullanılmayan transistörler ve esnek routing anahtarları statik güç harcar. ASIC ise yalnızca gereken kapıları içerdiği için FPGA'e göre 5 ila 10 kat daha az güç tüketir.
4. **Çalışma Frekansı (Clock Speed):** ASIC'ler 3-5 GHz hızlara çıkabilirken, FPGA'lerin esnek iç yapısı genellikle 200 - 600 MHz bandında sınırlıdır.`,
        table: {
          headers: ["Kriter", "FPGA", "ASIC"],
          rows: [
            ["Piyasaya Çıkış Süresi (Time-to-Market)", "Haftalar / Aylar (Çok Hızlı)", "1.5 - 3 Yıl (Uzun ve Zahmetli)"],
            ["Geliştirme Maliyeti (NRE)", "Düşük (Yalnızca geliştirme kiti)", "Çok Yüksek ($1M - $50M+)"],
            ["Birim Maliyet (Yüksek Adet)", "Yüksek ($30 - $5000+)", "Çok Düşük ($1 - $20)"],
            ["Donanım Güncellemesi (Upgrade)", "Mümkün (Bitstream yüklenir)", "İmkansız (Silikon sabittir)"],
            ["Güç Verimliliği (Perf/Watt)", "Orta", "En Üst Düzey"],
          ],
        },
      },
    ],
    keyTakeaways: [
      "Düşük adetli üretimler, prototipler ve sürekli güncellenen protokoller için FPGA tartışmasız seçimdir.",
      "Milyonlarca adet basılacak akıllı telefon işlemcileri veya Bitcoin madencilik cihazları için ASIC kaçınılmazdır.",
    ],
  },

  // =========================================================================
  // 6. RTL'DEN SİLİKONA ÇİP YOLCULUĞU
  // =========================================================================
  {
    slug: "rtlden-silikona-cip-uretim-yolculugu",
    title: "RTL'den Silikona: Koddan Çipe Fabrikasyon Yolculuğu (TSMC, Tape-Out ve Paketleme)",
    subtitle: "Klavyede yazılan SystemVerilog satırlarının nanometrik silikon katmanlarına dönüşme macerası.",
    excerpt: "RTL sentezinden Floorplan'e, Clock Tree Synthesis (CTS) ve GDSII dosyasından TSMC dökümhanesine uzanan modern mikroçip fabrikasyon sürecinin tüm adımlarını keşfedin.",
    category: "Yarı İletken & Çip",
    categoryColor: "badge-secondary",
    tags: ["Tape-Out", "TSMC", "ASIC", "Yarı İletken", "GDSII", "Fotolitografi"],
    readTime: "11 dk",
    publishedAt: "9 Ekim 2026",
    author: {
      name: "Tuncay & learn.tncy.dev Ekibi",
      role: "Sistem ve Donanım Mühendisi",
    },
    featured: false,
    sections: [
      {
        id: "on-taraf-tasarim-front-end",
        title: "1. Ön Uç (Front-End) Tasarım ve Mantıksal Sentez",
        content: `Çip üretimi dijital ortamda RTL kodlamasıyla başlar:
1. **RTL Tasarımı:** SystemVerilog veya VHDL ile mimari yazılır.
2. **Fonksiyonel Simülasyon:** UVM ile testbench koşulur.
3. **Mantıksal Sentez (Synthesis):** Synopsys Design Compiler gibi araçlar RTL kodunu hedef dökümhanenin (örn: TSMC 3nm veya SkyWater 130nm) standart hücre kütüphanesine (NAND, NOR, D-Flip-Flop) dönüştürür.
4. **Gate-Level Netlist:** Kapı seviyesinde bağlantı listesi çıkarılır.`,
      },
      {
        id: "arka-yuz-fiziksel-tasarim",
        title: "2. Arka Uç (Back-End) Fiziksel Tasarım: Kodun Mekana Yerleşmesi",
        content: `Bu aşamada lojik kapılar 2 boyutlu çip alanına fiziksel olarak yerleştirilir:
- **Floorplanning:** Bellek blokları (SRAM) ve I/O pad'leri çipin köşelerine paylaştırılır.
- **Placement:** Standart lojik hücreler sıralara dizilir.
- **Clock Tree Synthesis (CTS):** Saat sinyalinin tüm flip-flop'lara aynı anda (sıfır skew) ulaşması için saat dağıtım ağacı örülür.
- **Routing:** Milyarlarca metal hat (Metal 1'den Metal 12'ye kadar) katmanlar halinde birbirine bağlanır.
- **STA (Static Timing Analysis):** Setup ve Hold zaman ihlalleri incelenir.`,
      },
      {
        id: "tape-out-ve-fabrikasyon",
        title: "3. Tape-Out ve Temiz Oda (Fabrikasyon)",
        content: `Tasarım DRC (Design Rule Check) ve LVS (Layout vs Schematic) testlerini geçtikten sonra **GDSII** veya **OASIS** formatında fabrikaya gönderilir. Bu adıma tarihi nedenlerle **Tape-Out** denir.

Dökümhane (Foundry) süreci:
- **Fotolitografi:** Morötesi (EUV) lazerler ile tasarım şablonu silikon wafer üzerine ışıkla basılır.
- **Aşındırma ve İyon Aşılama:** Kimyasal işlemlerle transistör kanalları oluşturulur.
- **Metalizasyon:** Bakır yollar çekilir.
- **Wafer Test & Dicing:** Wafer kesilerek tekil çıplak zarlar (Die) elde edilir.
- **Paketleme (Packaging):** BGA veya flip-chip kılıfına yerleştirilip ayakları lehimlenir.`,
      },
    ],
    keyTakeaways: [
      "RTL kodu fiziksel bir çipe dönüşürken sentez, yerleşim (P&R), CTS ve zaman analizi süzgeçlerinden geçer.",
      "Tape-Out, tasarımın nihai olarak üretim bandına teslim edildiği geri dönülemez kritik eşiktir.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
