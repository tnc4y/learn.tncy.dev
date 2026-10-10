import { LessonContent } from "./lessonsData";

export const RTL_SYNTHESIS_PART2: Record<string, LessonContent> = {
  "synthesis-fundamentals": {
    id: "synthesis-fundamentals",
    badge: "Modül 6 • Yosys ile Mantık Sentezi (Logic Synthesis)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Mantık Sentezi Temelleri (Logic Synthesis) ve PPA Optimizasyonu",
    subtitle: "RTL tasarımının dökümhane teknoloji kütüphanesine eşlenmiş kapı seviyesi netlist'e dönüştürülmesi ve Alan-Zamanlama-Güç (PPA) hedefleri.",
    sections: [
      {
        title: "1. Mantık Sentezine Giriş: Tasarım Niyetinden Silikona",
        content: `Mantık sentezi (logic synthesis), insan tarafından yazılmış soyut donanım tanımlama dili (RTL - Register Transfer Level: Verilog, SystemVerilog veya VHDL) kodunu, yarı iletken dökümhanesinin (foundry) üretebileceği fiziksel mantık kapıları ve flip-flop bağlantı listesine (**gate-level netlist**) dönüştüren temel EDA (Electronic Design Automation) sürecidir.

RTL düzeyinde bir mühendis, donanımın *davranışsal niyetini* tanımlar:
\`\`\`verilog
always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        q <= 8'h00;
    else if (en)
        q <= a + b;
end
\`\`\`
Bu kod satırları simülasyonda mükemmel çalışabilir; ancak silikon üzerinde doğrudan "if-else" veya "+" operatörü bulunmaz. Silikon katmanlarında yalnızca p-MOS ve n-MOS transistörlerinden inşa edilmiş standart hücreler (**standard cells** - AND, NAND, NOR, MUX, DFF vb.) ve metal ara bağlantı hatları (**interconnect**) yer alır. Sentezleyicinin görevi, bu soyut davranışı hedef üretim teknolojisinin hücre kütüphanesine (\`.lib\`) en uygun şekilde tercüme etmektir.`,
      },
      {
        title: "2. Sentez Akışının Temel Aşamaları (Parsing, Elaboration, Optimization, Tech Mapping)",
        content: `Modern mantık sentezi akışı birbirini izleyen dört kritik aşamadan meydana gelir:

\`\`\`
[RTL Kodları (Verilog/SV)] 
            │
            ▼
 1. Ayrıştırma ve Detaylandırma (Parsing & Elaboration) 
    -> AST & Soyut İşleçler (Generic Gates, Adders, Multiplexers)
            │
            ▼
 2. Teknoloji-Bağımsız Optimizasyon (Boolean & Logic Minimization)
    -> Sabit Katlama (Constant Folding), Ölü Kod Temizliği, Mantık İndirgeme
            │
            ▼
 3. Teknoloji Eşleme (Technology Mapping - ABC)
    -> Liberty (.lib) Kütüphanesindeki Gerçek Standart Hücrelere Dönüşüm
            │
            ▼
 4. Kısıt Güdümlü Kapı Optimizasyonu (Timing & Area Recovery)
    -> Kapı Boyutlandırma (Gate Sizing), Tamponlama (Buffering)
            │
            ▼
[Kapı Seviyesi Netlist (Gate-Level Netlist) & Alan/Zamanlama Raporları]
\`\`\`

1. **Ayrıştırma ve Detaylandırma (Parsing & Elaboration):** Sözdizim denetlenir, hiyerarşi çözülür, parametreler açılır (\`generate\` blokları çözülür) ve RTL, soyut mantık düğümlerine dönüştürülür.
2. **Teknoloji-Bağımsız Optimizasyon:** Henüz hedef kütüphaneden bağımsız olarak Boole cebri sadeleştirmeleri, sabit katlama (**constant folding**), ortak alt-ifade eleme (**common subexpression elimination**) ve ölü kod temizliği (**dead code elimination**) yapılır.
3. **Teknoloji Eşleme (Technology Mapping):** Soyut kapılar, hedef teknolojinin Liberty (\`.lib\`) dosyasında tanımlanan gerçek fiziksel hücrelerle örtüştürülür (**graph covering / boolean matching**).
4. **Hedef Odaklı Optimizasyon:** Belirlenen saat frekansı ve alan hedeflerine ulaşmak için hücre sürücü güçleri ayarlanır, tamponlar eklenir.`,
      },
      {
        title: "3. Donanım Seviyeleri ve Dönüşüm Mekanizması: RTL'den Mantık Ağacına",
        content: `Sentezleyicinin donanımı anlama ve dönüştürme basamaklarını bir multiplexer örneği üzerinden inceleyelim:

* **RTL Düzeyi (Soyut İfade):**
  \`\`\`verilog
  assign out = sel ? in_b : in_a;
  \`\`\`
* **İç Mantık Grafı Düzeyi (Generic Logic Network):**
  Sentezleyici bu ifadeyi bir Boole denklemine dönüştürür:
  $$out = (sel \\cdot in\\_b) + (\\overline{sel} \\cdot in\\_a)$$
* **Teknoloji Eşleme Düzeyi (SkyWater 130nm Hücreleri):**
  Sentezleyici elindeki kütüphaneye bakar. Kütüphanede adanmış bir multiplexer hücresi (\`sky130_fd_sc_hd__mux2_1\`) varsa doğrudan bunu kullanır. Eğer kütüphanede multiplexer hücresi yoksa veya alan kısıtı gerektiriyorsa, bunu iki \`NAND\` ve bir \`INV\` hücresiyle sentezleyebilir.

\`\`\`
          Genel Boole Ağı                     Fiziksel Hücre (Sky130)
       ┌─────────────────┐                     ┌────────────────────┐
sel ───┤ AND / OR / INV  ├─── out     ===>     │ sky130_fd_sc_hd__  ├─── out
in_a ──┤ Mantık Grafiği  │             Eşleme   │ mux2_1             │
in_b ──┴─────────────────┘                     └────────────────────┘
\`\`\`

Bu dönüşüm sırasında sentezleyici, devrenin işlevsel doğruluğunu kesinlikle bozmadan (formel eşdeğerliği koruyarak) donanımı minimize eder.`,
      },
      {
        title: "4. Teknoloji Eşleme (Technology Mapping) ve Örüntü Örtme (Boolean Matching)",
        content: `Teknoloji eşleme, genel mantık grafını (örneğin AIG - And-Inverter Graph) hedef kütüphanedeki hücrelerle minimum maliyetle kaplama (**graph covering**) problemidir:

* **Örüntü Eşleme (Pattern Matching):** Kütüphanedeki her hücrenin bir Boole işlevi ve gecikme/alan maliyeti vardır. Eşleyici, mantık ağacını küçük alt ağaçlara böler ve kütüphanedeki hücre modelleriyle örtüştürür.
* **Kombinasyonel Mantık Eşleme:** Karmaşık ifadeler bileşik hücrelerle (örneğin \`AOI21\` - AND-OR-Invert veya \`OAI22\` - OR-AND-Invert) tek bir kapıda gerçekleştirilir. Bileşik hücreler hem silikon alanı hem de iç gecikme açısından ayrık AND/OR kapılarına göre çok daha üstündür.
* **Ardışıl Mantık (Sequential) Eşleme:** RTL içerisindeki \`always @(posedge clk)\` blokları tespit edilir ve hedef kütüphanedeki \`dff\` (D Flip-Flop), \`dffr\` (sıfırlamalı), \`dffe\` (yetkilendirmeli) gibi uygun standart hücrelere dönüştürülür.`,
      },
      {
        title: "5. Üç Boyutlu PPA Ödünleşimi: Alan (Area), Zamanlama (Timing) ve Güç (Power)",
        content: `ASIC tasarımında her mühendislik kararı **PPA (Power, Performance, Area)** üçgenindeki bir ödünleşimdir (trade-off):

| Metrik | Anlamı | İyileştirme Stratejisi | Ödünleşim / Maliyet |
| :--- | :--- | :--- | :--- |
| **Performans (Timing)** | Saatin periyodu ($T_{clk}$), gecikme (delay), çalışma frekansı | Paralel mantık ağaçları, büyük sürücülü (\`X4\`, \`X8\`) hücreler | Artan silikon alanı ve yüksek dinamik güç tüketimi |
| **Alan (Area)** | Toplam kapı sayısı ve standart hücre alanı ($\\mu m^2$) | Seri mantık blokları, en küçük hücreler (\`X1\`), mantık paylaşımı | Daha uzun gecikme yolları, frekans düşüşü |
| **Güç (Power)** | Dinamik ($P = lpha C V^2 f$) ve statik kaçak ($I_{leak} \\cdot V$) güç | Saat kapılama (clock gating), yüksek eşik gerilimi ($HVT$) | Kontrol mantığı karmaşıklığı, kurulum zamanı gecikmesi |

Sentez aracına herhangi bir kısıt vermezseniz, varsayılan olarak **alanı (Area)** minimize etmeye çalışır. Yüksek saat frekansı hedefi konulduğunda ise araç otomatik olarak daha büyük, daha fazla akım sürebilen hücreleri devreye sokarak gecikmeyi düşürür.`,
      },
      {
        title: "6. Kısıt Güdümlü Sentez (Constraint-Driven Synthesis) ve Sentez Kalite Metrikleri (QoR)",
        content: `Sentezleyicinin körü körüne çalışmasını engelleyen ve onu yönlendiren kurallara **Tasarım Kısıtları (Constraints)** denir. Genellikle **SDC (Synopsys Design Constraints)** formatında tanımlanır:

* Saat frekansı ve periyodu (\`create_clock -period 10.0 [get_ports clk]\`)
* Giriş ve çıkış dış gecikmeleri (\`set_input_delay\`, \`set_output_delay\`)
* Maksimum geçiş süresi ve yük sınırları (\`set_max_transition\`, \`set_max_capacitance\`)

Sentez sonucunda mühendis şu **QoR (Quality of Results)** metriklerini inceler:
1. **WNS (Worst Negative Slack):** Tasarımdaki en kötü zamanlama ihlali. $WNS \\ge 0$ olmalıdır.
2. **TNS (Total Negative Slack):** Tüm ihlalli yolların toplam negatif marjı.
3. **Hücre Sayısı ve Alan:** Toplam standart hücre sayısı ve mikronkare cinsinden alan.
4. **Sentez Uyarısı ve Hataları:** Mandal çıkarımı (latch inference) veya çoklu sürücü (multiple driver) gibi kritik tasarım hataları.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Mantık Sentezi Temelleri (Logic Synthesis) ve PPA Optimizasyonu** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "synthesis-fundamentals.v - Örnek RTL / Sentez Kodu",
          snippet: `module adder ( input [7:0] a, input [7:0] b, output [8:0] sum ); assign sum = a + b; endmodule`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Mantık Sentezi Temelleri (Logic Synthesis) ve PPA Optimizasyonu",
      initialCode: `module adder ( input [7:0] a, input [7:0] b, output [8:0] sum ); assign sum = a + b; endmodule`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Mantık sentezi sürecinde 'Teknoloji Eşleme' (Technology Mapping) aşamasının temel görevi aşağıdakilerden hangisidir?",
      options: ["Soyut ve teknoloji-bağımsız mantık ağacını, hedef dökümhanenin Liberty (.lib) kütüphanesinde tanımlı standart hücrelerine dönüştürmek", "Verilog kodunun sözdizimini kontrol edip testbench simülasyonunu koşturmak", "Çip üzerindeki metal yolların fiziksel yerleşimini (routing) ve DRC kontrollerini tamamlamak", "RTL içerisindeki saat frekansını ölçüp kristal osilatör devresini tasarlamak"],
      correctIndex: 0,
      explanation: "Teknoloji eşleme (Technology Mapping), teknoloji-bağımsız genel mantık kapılarını (AIG/generic netlist) dökümhane tarafından karakterize edilmiş fiziksel standart hücrelerle (AND2, NAND3, DFFQ vb.) eşleştiren kritik sentez aşamasıdır.",
    },
  },
  "yosys-synthesis-flow": {
    id: "yosys-synthesis-flow",
    badge: "Modül 6 • Yosys ile Mantık Sentezi (Logic Synthesis)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Yosys Mantık Sentezi Akışı ve Komut Mimarisi",
    subtitle: "Verilog RTL'in Yosys ile okunması, soyutlama basamakları, proc-opt-fsm-memory adımları ve ABC teknoloji eşleme sürecinin uçtan uca yönetimi.",
    sections: [
      {
        title: "1. Yosys Mantık Sentezleyicisinin Mimarisi ve Çalışma Felsefesi",
        content: `**Yosys (Yosys Open SYnthesis Suite)**, Clifford Wolf tarafından geliştirilen, açık kaynaklı ASIC ve FPGA mantık sentezi çatısıdır. Modern açık kaynak silikon tasarım dünyasının (OpenLane, efabless, Tiny Tapeout) belkemiğidir.

Yosys'in temel felsefesi **modüler geçişler (passes)** mimarisidir. Monolitik kapalı kutu araçların aksine, Yosys yüzlerce bağımsız C++ geçiş modülünden oluşur. Her geçiş iç veri yapısı olan **RTLIL (RTL Intermediate Language)** üzerinde belirli bir dönüşüm gerçekleştirir:

\`\`\`
[Verilog RTL] ───> [AST] ───> [RTLIL Veri Tabanı] ───> [ABC Motoru] ───> [Hedef Netlist]
                                     ▲
                       Geçişler: proc, opt, fsm, memory
\`\`\`

Kullanıcı bu geçişleri ister komut satırından interaktif olarak tek tek çalıştırabilir, isterse \`.ys\` betiği olarak ardışık bir akış halinde yürütebilir.`,
      },
      {
        title: "2. Tasarımın Yüklenmesi ve Hiyerarşi Yönetimi: `read_verilog` ve `hierarchy -top`",
        content: `Sentez akışının ilk adımı RTL kaynak dosyalarının okunması ve tasarım ağacının kurulmasıdır:

* **Tasarımı Okuma:**
  \`\`\`tcl
  read_verilog -sv alu.v register_file.v core_top.v
  \`\`\`
  \`-sv\` anahtarı SystemVerilog sözdizimi desteğini aktif eder.
* **Hiyerarşiyi Bağlama ve Kök Modülü Belirleme:**
  \`\`\`tcl
  hierarchy -check -top core_top
  \`\`\`
  \`hierarchy\` komutu tasarımın tepe modülünü (\`top\`) belirler, alt modül örneklemelerini (instances) bağlar ve çözülemeyen modül referanslarını \`-check\` parametresiyle raporlar. Kullanılmayan veya bağlanmamış modüller bu aşamada tespit edilir.`,
      },
      {
        title: "3. RTL İşleme ve İndirgeme Çekirdeği: `proc`, `opt`, `fsm` ve `memory`",
        content: `Yosys, yüksek seviyeli RTL yapılarını adım adım temel mantık kapılarına indirger:

1. **\`proc\` (Prosedür Dönüştürme):** Verilog \`always\` ve \`initial\` bloklarını, içindeki koşullu ifadeleri (\`if-else\`, \`case\`) çoklayıcılara (multiplexer) ve yazmaçlara (registers/latches) dönüştürür.
2. **\`opt\` (Mantık Optimizasyonu):** Sabit katlama (\`constant folding\`), basit Boole sadeleştirmeleri ve kullanılmayan kabloların/kapıların budanmasını (\`clean\`) yürütür.
3. **\`fsm\` (Sonlu Durum Makinesi Çıkarımı):** Tasarımdaki durum makinelerini tespit eder, durum kodlamasını (one-hot, binary veya gray) optimize eder ve durum geçiş mantığını sadeleştirir.
4. **\`memory\` (Bellek Dizisi Çıkarımı):** Verilog bellek dizilerini (\`reg [7:0] mem [0:255]\`) çok portlu bellek bloklarına veya adreslenebilir yazmaç öbeklerine dönüştürür.

Bu adımlar genellikle şu sırayla yürütülür:
\`\`\`tcl
proc; opt; fsm; opt; memory; opt
\`\`\``,
      },
      {
        title: "4. Standart Hücre Eşleme: `techmap`, `dfflegalize` ve `abc -liberty` Akışı",
        content: `Tasarım temel kapılara ve flip-floplara indirgendikten sonra fiziksel hücrelere eşlenir:

* **\`techmap\`:** Kaba mantık işlemlerini (toplayıcılar, karşılaştırıcılar) basit Boole kapılarına parçalar.
* **\`dfflegalize\`:** Flip-flopların saat, etkinleştirme ve sıfırlama (reset) kutuplarını hedef kütüphanenin desteklediği formatlara uyarlar (örneğin pozitif kenar tetiklemeli, aktif-alçak asenkron sıfırlamalı hücreler).
* **\`abc -liberty <kütüphane.lib>\`:** Berkeley ABC sentez motorunu çağırarak tüm kombinasyonel mantığı hedef Liberty kütüphanesindeki gerçek standart hücrelerle (AND, OR, MUX vb.) eşler.`,
      },
      {
        title: "5. Uçtan Uca Yosys Sentez Betiği (`synth.ys`) ve Adım Adım İnceleme",
        content: `Aşağıda SkyWater 130nm standart hücre kütüphanesini hedefleyen profesyonel bir Yosys sentez betiği yer almaktadır:

\`\`\`tcl
# 1. RTL Dosyalarını Oku
read_verilog -sv my_design.v

# 2. Hiyerarşiyi Çöz ve Tepe Modülü Seç
hierarchy -check -top my_design

# 3. Yüksek Seviyeli RTL Sentezi
proc
opt
fsm
opt
memory
opt

# 4. Flip-Flop Eşleme
dfflegalize -cell $_DFF_P_ 0 -cell $_DFF_PN0_ 0
techmap -map +/sky130/cells_ff.v

# 5. Berkeley ABC ile Kombinasyonel Mantık Eşleme
abc -liberty /path/to/sky130_fd_sc_hd__tt_025C_1v80.lib

# 6. Temizlik ve Raporlama
clean
stat -liberty /path/to/sky130_fd_sc_hd__tt_025C_1v80.lib

# 7. Kapı Seviyesi Netlist'i Dışa Aktar
write_verilog -noattr my_design_synth.v
\`\`\`

Bu akış, girdi olarak aldığı Verilog kodunu tamamen hedef kütüphane hücrelerinden oluşan fiziksel bir netlist'e dönüştürür.`,
      },
      {
        title: "6. Çıktı Üretimi (`write_verilog`) ve Sentez Doğrulama (Equivalence Checking)",
        content: `Sentez tamamlandığında netlist kaydedilir ve doğrulanır:

* **Netlist Kaydetme:**
  \`\`\`tcl
  write_verilog -noattr -noexpr netlist.v
  \`\`\`
  \`-noattr\` bayrağı iç Yosys özniteliklerini temizler, \`-noexpr\` ise netlist'in yalnızca hücre örneklemelerinden oluşmasını garanti eder (hiçbir \`assign\` ifadesi bırakmaz).
* **Formel Eşdeğerlik Doğrulaması (Equivalence Checking):**
  Sentez aracının tasarım mantığını bozmadığını matematiksel olarak ispatlamak için **SymbiYosys** veya Yosys'in içindeki \`equiv_make\` ve \`equiv_simple\` komutları kullanılır. Orijinal RTL ile sentezlenen netlist karşılaştırılarak her bir çıkışın tüm girdi kombinasyonlarında birebir aynı davrandığı formel olarak kanıtlanır.`,
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Yosys Mantık Sentezi Akışı ve Komut Mimarisi",
      initialCode: `// Minimal Sentezlenebilir Verilog Modülü
module counter (
    input  wire       clk,
    input  wire       rst_n,
    output reg  [3:0] count
);
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            count <= 4'b0000;
        else
            count <= count + 1'b1;
    end
endmodule`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Yosys sentez akışında 'proc' komutunun temel işlevi nedir?",
      options: ["Verilog 'always' ve 'initial' bloklarındaki koşullu ifadeleri çoklayıcılar (MUX) ve yazmaçlara dönüştürmek", "Hedef kütüphanedeki hücrelerin gecikme sürelerini hesaplamak", "Berkeley ABC aracını çağırıp saat ağacı sentezi (CTS) yapmak", "Fiziksel yerleşim ve rota (Place and Route) adımlarını başlatmak"],
      correctIndex: 0,
      explanation: "Yosys'te 'proc' geçişi, RTL içerisindeki prosedürel blokları ('always' blokları, 'if-else', 'case' yapıları) durumsuz çoklayıcılara ve ardışıl yazmaç/mandal öğelerine dönüştüren en kritik RTLIL ayrıştırma adımıdır.",
    },
  },
  "technology-mapping": {
    id: "technology-mapping",
    badge: "Modül 6 • Yosys ile Mantık Sentezi (Logic Synthesis)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Teknoloji Eşleme (Technology Mapping) ve Berkeley ABC Entegrasyonu",
    subtitle: "Soyut mantık ifadelerinin Liberty (.lib) hücre kütüphanelerine dönüştürülmesi, ABC optimizasyonu, sürücü gücü seçimi ve ardışıl mantık eşleme.",
    sections: [
      {
        title: "1. Teknoloji Eşleme Nedir? Soyut Kapılardan Gerçek Standart Hücrelere",
        content: `RTL sentezinin ilk evresinde devre, soyut mantık düğümleri (örneğin 2-girişli generic AND, OR, XOR veya soyut AIG - And-Inverter Graph) olarak temsil edilir. Bu soyut kapılar silikon üzerinde üretilemez.

**Teknoloji Eşleme (Technology Mapping)**, bu soyut mantık ağını hedef dökümhanenin sunduğu **Standart Hücre Kütüphanesindeki (Standard Cell Library)** fiziksel hücrelerle örtüştürme işlemidir. Örneğin genel bir \`(A & B) | C\` ifadesi, ayrı ayrı bir AND ve bir OR kapısı yerine tek bir entegre \`AOI21X1\` (veya \`OAI21X1\`) hücresi olarak eşlenebilir. Bu sayede transistör sayısı, silikon alanı ve yayılım gecikmesi drastik biçimde azaltılır.`,
      },
      {
        title: "2. Liberty (`.lib`) Kütüphane Anatomisi: NLDM Gecikme Modelleri ve Hücre Karakterizasyonu",
        content: `Teknoloji eşleyicinin hedef teknolojiyi tanıyabilmesi için **Liberty (\`.lib\`)** formatındaki kütüphane dosyasını okuması gerekir. Bir \`.lib\` dosyası şunları içerir:

1. **Hücre Boole Fonksiyonu:** Hücrenin mantıksal davranışı (örn. \`function: "(A & B) | C";\`).
2. **Alan (Area):** Hücrenin mikronkare cinsinden silikon kaplama alanı.
3. **NLDM (Non-Linear Delay Model) Tabloları:** Giriş geçiş süresi (**input transition**) ve çıkış yük kapasitansına (**output load capacitance**) bağlı gecikme lookup tabloları:
   $$	ext{Delay} = f(	ext{Input Slew}, 	ext{Load Capacitance})$$
4. **Pim Özellikleri:** Her giriş pimi için kapasitans ($C_{pin}$), her çıkış pimi için maksimum sürüş limiti ($C_{max}$).`,
      },
      {
        title: "3. Yosys ile Berkeley ABC Köprüsü: AIG Temsili ve Teknoloji Eşleme Algoritmaları",
        content: `Yosys, kombinasyonel mantık optimizasyonu ve teknoloji eşleme görevini Berkeley Üniversitesi tarafından geliştirilen dünya standardı mantık aracı **ABC**'ye devreder.

* **AIG (And-Inverter Graph):** ABC, tüm kombinasyonel mantığı yalnızca iki bileşene indirger: 2-girişli AND düğümleri ve tersleyiciler (eviriciler). Bu son derece kompakt temsil, milyonlarca kapılık devrelerin saniyeler içinde analiz edilmesini sağlar.
* **Dinamik Programlama ile Ağaç Örtme (Tree Covering):** ABC, mantık grafını örtüşmeyen ağaç parçalarına ayırır ve Liberty kütüphanesindeki hücrelerle dinamik programlama kullanarak minimum alan veya minimum gecikme maliyetiyle eşler.
* **Yosys Komutu:**
  \`\`\`tcl
  abc -liberty sky130_fd_sc_hd__tt_025C_1v80.lib
  \`\`\``,
      },
      {
        title: "4. Alan (Area) vs Gecikme (Delay) Optimizasyon Stratejileri ve Özel ABC Betikleri",
        content: `ABC'ye verilen parametreler sentezin PPA yönünü belirler:

* **Alan Odaklı Sentez (Area-focused):**
  Kütüphanedeki en küçük hücreler tercih edilir, mantık paylaşımı maksimize edilir.
  \`\`\`tcl
  abc -liberty my_cells.lib -script "+strash; dch; map -a"
  \`\`\`
* **Gecikme Odaklı Sentez (Timing-focused):**
  Kritik yollardaki mantık derinliği azaltılır, daha geniş sürücülü hızlı kapılar seçilir.
  \`\`\`tcl
  abc -liberty my_cells.lib -script "+strash; dch; map"
  \`\`\`

Özel ABC komut dizilerinde \`strash\` mantık ağını yapısal olarak sadeleştirir, \`dch\` mantık eşdeğerliklerini çıkararak alternatif ağaçlar türetir, \`map\` ise fiziksel eşlemeyi icra eder.`,
      },
      {
        title: "5. Sürücü Gücü (Drive Strength) Seçimi ve Fanout/Yük Kapasitansı Dengelemesi",
        content: `Bir standart hücre kütüphanesinde aynı mantıksal fonksiyona sahip birden çok hücre varyantı bulunur (örn. \`INV_X1\`, \`INV_X2\`, \`INV_X4\`, \`INV_X8\`):

* **Düşük Sürücü Gücü (\`X1\`, \`X2\`):** Küçük transistörler, minimum alan, düşük kaçak akım; fakat yüksek çıkış direnci. Yalnızca 1-2 kapı süren (düşük fanout) kısa hatlar için idealdir.
* **Yüksek Sürücü Gücü (\`X4\`, \`X8\`):** Geniş transistörler, yüksek akım sürme kabiliyeti, hızlı kenar geçişi; fakat yüksek alan ve yüksek dinamik güç. Yüksek fanout veya uzun hatlar için zorunludur.

ABC ve sentezleyici, yük kapasitansını ($C_{load} = \\sum C_{in} + C_{wire}$) hesaplayarak her düğüm için en uygun sürücü gücünü seçer.`,
      },
      {
        title: "6. Ardışıl Mantık (Sequential) Eşleme: Flip-Flop Dönüşümü ve `dfflegalize` Kuralları",
        content: `Teknoloji kütüphanelerindeki flip-floplar farklı kontrol pinlerine sahiptir: bazıları asenkron sıfırlamalı (\`async reset\`), bazıları senkron sıfırlamalı (\`sync reset\`), bazıları ise saat yetkilendirmelidir (\`clock enable\`).

Yosys'te ardışıl eşleme iki aşamada yürütülür:
1. **Legalizasyon (\`dfflegalize\`):** Tasarımdaki flip-flop tiplerini kütüphanenin sunduğu tiplere indirger. Örneğin kütüphanede saat yetkilendirmeli (\`enable\`) flip-flop yoksa, Yosys flip-flopun girişine bir çoklayıcı (MUX) ekleyerek geri besleme kurar.
   \`\`\`tcl
   dfflegalize -cell $_DFF_PP0_ 0 -cell $_DFF_P_ 0
   \`\`\`
2. **Kütüphane Eşlemesi:** Legalize edilen soyut flip-floplar hedef kütüphanedeki gerçek hücrelere (örn. \`sky130_fd_sc_hd__dfxtp_1\`) bağlanır.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Teknoloji Eşleme (Technology Mapping) ve Berkeley ABC Entegrasyonu** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "technology-mapping.v - Örnek RTL / Sentez Kodu",
          snippet: `$add cell (abstract adder) $dff cell (abstract flip-flop) $mux cell (abstract multiplexer) $and cell (abstract AND gate)`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Teknoloji Eşleme (Technology Mapping) ve Berkeley ABC Entegrasyonu",
      initialCode: `$add cell (abstract adder) $dff cell (abstract flip-flop) $mux cell (abstract multiplexer) $and cell (abstract AND gate)`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Aynı mantıksal işlevi gören iki standart hücreden X4 sürücü gücüne sahip olan hücre, X1 varyantına kıyasla ne gibi bir mühendislik avantajı sağlar?",
      options: ["Daha yüksek çıkış akımı sunarak yüksek fanout ve büyük kapasitif yükleri daha hızlı şarj/deşarj eder, böylece gecikmeyi düşürür.", "Silikon üzerinde 4 kat daha az yer kaplayarak alan tasarrufu sağlar.", "Çalışmak için saat (clock) sinyaline ihtiyaç duymaz.", "Statik kaçak akımı sıfıra indirir."],
      correctIndex: 0,
      explanation: "Yüksek sürücü gücüne (drive strength) sahip hücreler (örn. X4), daha geniş transistör kanallarına sahiptir. Bu sayede daha fazla akım sağlayarak yüksek kapasitif yüklerdeki yayılım gecikmesini (propagation delay) ciddi oranda azaltırlar; ancak silikon alanı ve güç tüketimi artar.",
    },
  },
  "synthesis-scripts": {
    id: "synthesis-scripts",
    badge: "Modül 6 • Yosys ile Mantık Sentezi (Logic Synthesis)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Üretim Düzeyinde Sentez Betikleri (Synthesis Scripts) ve Otomasyon",
    subtitle: "Tekrarlanabilir Yosys .ys ve Tcl betikleri, parametrik değişkenler, köşe kütüphaneleri ve hata yönetimi.",
    sections: [
      {
        title: "1. İnteraktif Komut Satırından Üretim Düzeyi Betiklere Geçiş",
        content: `Sentez araçlarını interaktif komut satırından çalıştırmak (\`yosys> read_verilog ...\`) öğrenme aşamasında faydalı olsa da, profesyonel ASIC tasarımında kabul edilemez:

* **Tekrarlanabilirlik (Reproducibility):** Aynı tasarımın haftalar sonra veya farklı bir mühendis tarafından hatasız şekilde birebir aynı netlist'i üretebilmesi gerekir.
* **Sürüm Kontrolü (Version Control):** Sentez ayarları ve parametreleri Git üzerinde takip edilmelidir.
* **Sürekli Entegrasyon (CI/CD):** Her kod değişiminde otomatik sentez koşularının tetiklenmesi için betikleşme zorunludur.`,
      },
      {
        title: "2. Yosys Betik Sözdizimi: `.ys` Dosyaları, Yorum Satırları ve Değişkenler",
        content: `Yosys iki tür betik formatını destekler:
1. **Yerel Yosys Betikleri (\`.ys\`):** Sıralı Yosys komutlarını içerir. \`#\` karakteri yorum satırıdır.
2. **Tcl Tabanlı Yosys Betikleri (\`.tcl\`):** Yosys Tcl yorumlayıcısıyla derlendiğinde tam döngü (\`for\`, \`foreach\`), koşullu dallanma (\`if-else\`) ve değişken atama (\`set\`) imkanı sunar.

Çalıştırma biçimi:
\`\`\`bash
# Yerel Yosys betiği için:
yosys -s synth.ys -l synth.log

# Tcl betiği için:
yosys -c run_synth.tcl -l synth.log
\`\`\``,
      },
      {
        title: "3. Temel, Orta ve İleri Seviye Sentez Betik Şablonları",
        content: `* **Temel Şablon (Tek Dosya, Hızlı Doğrulama):**
  \`\`\`tcl
  read_verilog counter.v
  synth -top counter
  write_verilog synth_counter.v
  \`\`\`
* **İleri Seviye Parametrik Tcl Şablonu:**
  \`\`\`tcl
  # Değişken Tanımları
  set DESIGN_NAME "mac_unit"
  set LIB_DIR "/pdk/sky130A/libs.ref/sky130_fd_sc_hd/lib"
  set LIB_FILE "$LIB_DIR/sky130_fd_sc_hd__tt_025C_1v80.lib"

  # RTL Okuma
  read_verilog -sv multiplier.v accumulator.v mac_unit.v

  # Hiyerarşi Kontrolü
  hierarchy -check -top $DESIGN_NAME

  # Standart Sentez
  synth -top $DESIGN_NAME -flatten

  # Kütüphane Eşleme
  dfflegalize -cell $_DFF_P_ 0
  abc -liberty $LIB_FILE

  # Temizlik ve Raporlama
  clean
  tee -o reports/area.rpt stat -liberty $LIB_FILE
  write_verilog -noattr outputs/\${DESIGN_NAME}_netlist.v
  \`\`\``,
      },
      {
        title: "4. SDC Kısıtlarının ve Saat Tanımlarının Sentez Akışına Dahil Edilmesi",
        content: `Yosys esasen bir mantıksal sentezleyicidir ve zamanlama hesaplarını Berkeley ABC motoruna devreder. Ancak tasarım kısıtları (SDC - Synopsys Design Constraints) sentez kararlarını doğrudan etkiler:

* **ABC Zamanlama Kısıtları:**
  ABC'ye gecikme hedefi vermek için \`-D <hedef_gecikme_ps>\` parametresi veya bir saat periyodu aktarılabilir:
  \`\`\`tcl
  # 1000 ps (1 ns) gecikme hedefiyle eşleme:
  abc -liberty my_tech.lib -D 1000
  \`\`\`
* **SDC Entegrasyonu:**
  Üretim akışlarında SDC kısıtları sentez betiğinde okunur veya sentez sonrasında zamanlama analiz motoruna (OpenSTA) aktarılmak üzere arşivlenir.`,
      },
      {
        title: "5. Çoklu Köşe (Multi-Corner) ve Çoklu Kütüphane Destekli Sentez Akışları",
        content: `ASIC tasarımları tek bir çalışma koşulunda üretilmez; dökümhane varyasyonlarına göre köşeler (corners) tanımlanır:

* **SS (Slow-Slow):** Düşük voltaj, yüksek sıcaklık -> En yavaş durum (Kurulum/Setup analizi için).
* **FF (Fast-Fast):** Yüksek voltaj, düşük sıcaklık -> En hızlı durum (Tutma/Hold analizi için).
* **TT (Typical-Typical):** Nominal koşullar.

Parametrik bir Tcl betiğinde köşe döngüsü kurularak tasarımın her köşe için ayrı ayrı sentez raporu üretmesi sağlanabilir:
\`\`\`tcl
set CORNERS { "ss_100C_1v60" "tt_025C_1v80" "ff_n40C_1v95" }
foreach c $CORNERS {
    set lib_path "libs/sky130_fd_sc_hd__\${c}.lib"
    puts "=== Köşe Sentezi Koşuluyor: $c ==="
    # Köşeye özel ABC eşleme ve stat raporlama
}
\`\`\``,
      },
      {
        title: "6. Betiklerde Hata Yakalama, Loglama ve Sürüm Kontrolü Entegrasyonu",
        content: `Üretim ortamlarında sentez betiklerinin dayanıklı (robust) olması için şu kurallara uyulmalıdır:

1. **Log Dosyası ve Rapor Ayrıştırma:**
   Çıktılar hem ekrana hem de log dosyasına yazdırılmalıdır (\`tee -o\`). Hata ve uyarı sayıları regex ile taranarak betik çıkış kodu belirlenmelidir:
   \`\`\`bash
   if grep -q "ERROR:" synth.log; then exit 1; fi
   \`\`\`
2. **Determinizm:**
   Yosys varsayılan olarak deterministiktir; ancak karmaşık optimizasyonlarda seed değerleri sabitlenmelidir.
3. **Git Arşivleme:**
   Yalnızca kaynak RTL ve \`.ys\` / \`.tcl\` betikleri depoda tutulmalı; üretilen geçici dosyalar (\`.rpt\`, \`netlist.v\`) \`.gitignore\` ile hariç tutulmalı ya da CI yapıtları (artifacts) olarak saklanmalıdır.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Üretim Düzeyinde Sentez Betikleri (Synthesis Scripts) ve Otomasyon** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "synthesis-scripts.v - Örnek RTL / Sentez Kodu",
          snippet: `# synthesis.ys # Comments start with '#' # Read design files read_verilog design.v # Synthesis flow hierarchy -check -top my_module proc fsm memory opt # Technology mapping read_liberty -lib cells.lib abc -liberty cells.lib # Output write_verilog design_synth.v`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Üretim Düzeyinde Sentez Betikleri (Synthesis Scripts) ve Otomasyon",
      initialCode: `# synthesis.ys # Comments start with '#' # Read design files read_verilog design.v # Synthesis flow hierarchy -check -top my_module proc fsm memory opt # Technology mapping read_liberty -lib cells.lib abc -liberty cells.lib # Output write_verilog design_synth.v`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Endüstriyel bir ASIC projesinde sentez adımlarını interaktif komut satırı yerine parametrik Tcl/.ys betikleriyle yürütmenin birincil avantajı nedir?",
      options: ["Sentez sürecinin tekrarlanabilirliğini (reproducibility) sağlamak ve CI/CD ortamında otomatik olarak koşturabilmek", "Sentez aracının bellek kullanımını sıfıra indirmek", "Verilog kodundaki tüm 'always' bloklarını otomatik olarak C++ koduna dönüştürmek", "PDK'deki Liberty dosyalarına duyulan ihtiyacı ortadan kaldırmak"],
      correctIndex: 0,
      explanation: "Betikleştirme (scripting), tasarım akışının insan hatasından arındırılmasını, parametrik olarak tekrarlanabilir (reproducible) olmasını ve sürüm kontrolü altında sürekli entegrasyon (CI) sistemlerine bağlanmasını sağlar.",
    },
  },
  "analyzing-synthesis-results": {
    id: "analyzing-synthesis-results",
    badge: "Modül 6 • Yosys ile Mantık Sentezi (Logic Synthesis)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Sentez Sonuçlarının Analizi ve Raporlama (QoR)",
    subtitle: "Yosys stat çıktısı, standart hücre alanı, kritik yol kestirimi, netlist incelemesi ve show komutuyla görselleştirme.",
    sections: [
      {
        title: "1. Sentez Raporlarını Okuma Sanatı: QoR (Quality of Results) Kavramı",
        content: `Sentez aracını başarıyla çalıştırmak ve bir netlist üretmek işin sadece başlangıcıdır. Bir ASIC mühendisi için asıl uzmanlık, üretilen netlist'in hedeflenen kalite kriterlerini (QoR - Quality of Results) karşılayıp karşılamadığını sayısal veriler üzerinden analiz edebilme yeteneğidir.

QoR değerlendirmesinde dört temel eksen incelenir:
1. **Toplam Standart Hücre Alanı ($\\mu m^2$):** Bütçelenen silikon kılığına sığıyor mu?
2. **Kombinasyonel ve Ardışıl Mantık Oranı:** Mantık derinliği hedeflenen frekansa izin verecek düzeyde mi?
3. **Mandal (Latch) ve Eşlenmemiş Hücre Uyarısı:** Tasarımda donanımsal hata var mı?
4. **Zamanlama Kestirimi:** En uzun yol (critical path) kaç mantık kapısından oluşuyor?`,
      },
      {
        title: "2. `stat` Komutunun Derinlemesine Analizi: Tel (Wire) ve Hücre İstatistikleri",
        content: `Yosys içerisindeki \`stat\` komutu, tasarımın genel yapısını özetleyen en önemli rapordur:

\`\`\`text
=== my_core ===

   Number of wires:                245
   Number of wire bits:            512
   Number of public wires:          64
   Number of public wire bits:     128
   Number of memories:               0
   Number of memory bits:            0
   Number of processes:              0
   Number of cells:                186
     sky130_fd_sc_hd__and2_1        42
     sky130_fd_sc_hd__dfxtp_1       32
     sky130_fd_sc_hd__mux2_1        24
     sky130_fd_sc_hd__nand2_1       38
     sky130_fd_sc_hd__or2_1         50
\`\`\`

* **\`Number of wires\` / \`wire bits\`:** Dahili sinyallerin ve veri yollarının toplam genişliği. Çok yüksek tel sayısı, fiziksel yerleşimde (routing) tıkanıklık (**congestion**) riski anlamına gelir.
* **\`Number of public wires\`:** RTL kodunuzda açıkça isimlendirdiğiniz giriş/çıkış ve modül içi sinyallerdir.
* **\`Number of processes\`:** 0 olmalıdır! Eğer 0'dan büyükse, sentezlenmemiş \`always\` blokları kalmış demektir (\`proc\` komutu çalıştırılmamış olabilir).
* **\`Number of cells\`:** Fiziksel standart hücre dökümüdür.`,
      },
      {
        title: "3. Liberty Alan Analizi ve Standart Hücre Dağılımı (Cell Breakdown)",
        content: `Sentez sonrası \`stat -liberty <kütüphane.lib>\` komutu çalıştırıldığında, Yosys kütüphanedeki hücre alanlarını okuyarak gerçek fiziksel alan hesabını sunar:

\`\`\`text
   Chip area for module 'my_core': 2450.840000 um^2
\`\`\`

Standart hücre dağılımı (Cell Breakdown) incelenirken şu oranlara dikkat edilir:
* **Ardışıl / Kombinasyonel Oranı:** Tipik dijital bloklarda flip-flop hücreleri (\`dfxtp\`) toplam hücre sayısının %15-30'unu, alanın ise %30-50'sini kaplar.
* **Bileşik Hücre Kullanımı:** \`AOI\` (AND-OR-INVERT) ve \`OAI\` (OR-AND-INVERT) gibi karmaşık hücrelerin oranı ne kadar yüksekse, sentezleyici mantık fonksiyonlarını o kadar kompakt paketlemiş demektir.
* **Evirici / Tampon Oranı:** Çok yüksek evirici sayısı mantık kutuplarının sık değiştiğini veya yüksek fanout yüklerini dengelemek için ara tamponlar atıldığını gösterir.`,
      },
      {
        title: "4. Yosys İçi Mantıksal Kritik Yol Kestirimi ve Sınırları",
        content: `Yosys, fiziksel yerleşim öncesinde mantıksal yol uzunluğunu kestirmek için \`ltp\` (Longest Topological Path) komutunu sunar:

\`\`\`tcl
# En uzun topolojik mantık yolunu bul:
ltp
\`\`\`

Bu komut, giriş pimlerinden veya flip-flop çıkışlarından başlayıp bir sonraki flip-flopa kadar olan en yüksek mantık kapısı derinliğini sayar.

**Önemli Mühendislik Sınırı:** Yosys bir mantık sentezleyicisidir, tam teşekküllü bir statik zamanlama analizörü (STA) değildir. Yosys metal hat dirençlerini ($R_{wire}$) ve parazitik kapasitansları ($C_{parasitic}$) tam modelleyemez. Bu nedenle nihai saat frekansı ve slack analizi mutlaka **OpenSTA** gibi adanmış bir STA aracıyla doğrulanmalıdır.`,
      },
      {
        title: "5. Netlist İnceleme: Sinyal İsimlerini Koruma (`(* keep *)`) ve Kapı Ağacı Takibi",
        content: `Sentezleyici optimizasyon sırasında kullanılmayan kabloları siler veya birden fazla sinyali tek bir kapı altında birleştirerek orijinal RTL isimlerini kaybedebilir (\`_042_\` gibi iç isimler atar).

* **Sinyal İsimlerini Koruma:**
  Hata ayıklama veya formal doğrulama için kritik bir sinyalin sentezleyici tarafından yutulmasını önlemek amacıyla RTL öznitelikleri (attributes) kullanılır:
  \`\`\`verilog
  (* keep *) wire [7:0] debug_bus;
  (* dont_touch *) wire alert_flag;
  \`\`\`
* **Netlist İzleme:**
  Üretilen \`netlist.v\` dosyasında kapıların port bağlantıları incelenerek mantık hataları, ters polariteli reset hatları veya yanlış bağlanan yetkilendirme sinyalleri yakalanabilir.`,
      },
      {
        title: "6. Görselleştirme: `show` Komutu ile Şematik İnceleme ve Hata Ayıklama",
        content: `Yosys, Graphviz / Dot altyapısını kullanarak tasarlanan devrenin kapı şematiğini görselleştirebilir:

\`\`\`tcl
# Tüm devreyi görselleştir:
show

# Belirli bir alt modülü ve sinyal yolunu görselleştir:
show -format dot -prefix core_schematic core_top

# Yalnızca belirli bir flip-flop ve çevresini göster:
show -lib sky130_cells.v \\dff_reg_0*
\`\`\`

Şematik görselleştirme özellikle şunları teşhis etmek için paha biçilmezdir:
* Beklenmeyen multiplexer zincirleri
* Çift yönlü veya ters bağlı kapılar
* Mandal (latch) oluşumuna yol açan geri besleme yolları.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Sentez Sonuçlarının Analizi ve Raporlama (QoR)** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "analyzing-synthesis-results.v - Örnek RTL / Sentez Kodu",
          snippet: `=== design hierarchy === top 1 === counter === Number of wires: 45 Number of wire bits: 109 Number of public wires: 13 Number of public wire bits: 37 Number of memories: 0 Number of memory bits: 0 Number of processes: 0 Number of cells: 32 AND2_X1 6 DFF_X1 8 INV_X1 12 NAND2_X1 4 OR2_X1 2`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Sentez Sonuçlarının Analizi ve Raporlama (QoR)",
      initialCode: `=== design hierarchy === top 1 === counter === Number of wires: 45 Number of wire bits: 109 Number of public wires: 13 Number of public wire bits: 37 Number of memories: 0 Number of memory bits: 0 Number of processes: 0 Number of cells: 32 AND2_X1 6 DFF_X1 8 INV_X1 12 NAND2_X1 4 OR2_X1 2`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Yosys tarafından üretilen bir netlist'te kritik mantık sinyallerinin optimizasyon sırasında silinmesini veya adının değiştirilmesini engellemek için hangi Verilog özniteliği (attribute) kullanılır?",
      options: ["(* keep *) veya (* dont_touch *)", "(* inline *) veya (* parallel_case *)", "(* full_case *)", "(* synthesize_fast *)"],
      correctIndex: 0,
      explanation: "RTL kodunda bir tel veya yazmacın başına '(* keep *)' veya '(* dont_touch *)' özniteliği eklendiğinde, sentezleyiciye bu sinyali optimizasyon adımlarında budamaması ve netlist içinde adını koruması talimatı verilir.",
    },
  },
  "common-synthesis-issues": {
    id: "common-synthesis-issues",
    badge: "Modül 6 • Yosys ile Mantık Sentezi (Logic Synthesis)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Sık Karşılaşılan Sentez Hataları ve Çözüm Yolları",
    subtitle: "İstenmeyen mandal (inferred latch) oluşumu, eşlenemeyen hücreler, kombinasyonel döngüler, boşta portlar ve tie-cell yönetimi.",
    sections: [
      {
        title: "1. Sentez Hatalarının Sınıflandırılması ve Teşhis Akışı",
        content: `RTL simülasyonda sorunsuz çalışan bir tasarım, sentez aşamasında donanımsal olarak çalışamaz hale gelebilir. Bunun nedeni, simülatörün kodu bir yazılım gibi satır satır yorumlaması, sentezleyicinin ise kodu gerçek fiziksel silikon kapılarına dönüştürmeye çalışmasıdır.

Sentezde karşılaşılan temel sorunlar 5 ana grupta toplanır:
1. **İstenmeyen Mandal Çıkarımı (Inferred Latches)**
2. **Eşlenemeyen Hücreler (Unmapped Cells / Blackboxes)**
3. **Kombinasyonel Döngüler (Combinational Loops)**
4. **Boşta Kalan Portlar ve Yüzen Düğümler (Floating / Unconnected Nets)**
5. **Sabit Mantık Hataları (Tie-High / Tie-Low problemleri)**`,
      },
      {
        title: "2. İstenmeyen Mandal (Inferred Latch) Tespiti, Riskleri ve RTL Düzeltmeleri",
        content: `**Mandal (Latch)**, saat kenarıyla (edge-triggered) değil seviyeyle (level-sensitive) tetiklenen bir hafıza elemanıdır. Senkron dijital tasarımda saat kenarı tetiklemeli flip-floplar tercih edilir; istenmeyen mandallar zamanlama analizini (STA) imkansızlaştırır ve yarış durumlarına (race condition) neden olur.

* **Klasik Mandal Hatası (Eksik Koşul Ataması):**
  \`\`\`verilog
  // HATALI RTL: Inferred Latch oluşur!
  always @(*) begin
      if (en)
          out = data_in;
      // en == 0 durumunda out değerini saklamak zorunda kalır!
  end
  \`\`\`
* **Doğru RTL Çözümü (Varsayılan Değer Atama):**
  \`\`\`verilog
  // DOĞRU RTL: Temiz kombinasyonel mantık (MUX)
  always @(*) begin
      out = 1'b0; // Varsayılan değer
      if (en)
          out = data_in;
  end
  \`\`\`
* **Yosys Tespiti:** Yosys loglarında \`Latch inferred for signal ...\` uyarısı aranır veya \`stat\` çıktısında \`$_DLATCH_\` hücreleri kontrol edilir.`,
      },
      {
        title: "3. Eşlenemeyen Hücreler (Unmapped Cells) ve Kütüphane Uyuşmazlığı",
        content: `Sentez sonrası netlist'te \`$_AND_\`, \`$_OR_\` veya \`$add\` gibi genel (generic) hücrelerin kalması, teknoloji eşleme aşamasının başarısız olduğunu gösterir.

* **Neden Oluşur?**
  1. Liberty kütüphanesi eksik veya hatalı yüklenmiştir.
  2. Kütüphanede belirli bir hücre tipi (örneğin asenkron sıfırlamalı flip-flop veya 3-durumlu sürücü) bulunmamaktadır.
  3. \`techmap\` veya \`abc\` komutu yürütülmemiştir.
* **Nasıl Çözülür?**
  Yosys akışında \`check\` komutu çalıştırılmalı ve netlist dışa aktarılmadan önce şu kontrol yapılmalıdır:
  \`\`\`tcl
  # Eşlenmemiş dahili hücreleri denetle:
  check -assert
  \`\`\`
  Eğer eşlenmemiş hücre varsa Yosys hata vererek durur ve hatalı netlist'in PnR aşamasına geçmesini engeller.`,
      },
      {
        title: "4. Kombinasyonel Döngüler (Combinational Loops): Tespiti ve Kırılması",
        content: `Bir kombinasyonel mantık kapısının çıkışının, araya hiçbir ardışıl eleman (flip-flop) girmeden doğrudan kendi girişine geri beslenmesine **kombinasyonel döngü (combinational loop)** denir:

\`\`\`
  ┌──────┐       ┌──────┐
──┤ AND  ├───────┤ OR   ├──┬──> out
  │      │   ┌───┤      │  │
  └──────┘   │   └──────┘  │
             └─────────────┘  (Geri Besleme Döngüsü!)
\`\`\`

* **Zararları:** Devre kararsız osilatör gibi davranabilir, statik zamanlama analizörü sonsuz döngüye girer ve zamanlama hesabı yapılamaz.
* **Tespiti:** Yosys veya OpenSTA \`Warning: Found combinational loop\` uyarısı basar.
* **Çözümü:** Geri besleme yoluna bir saat kenarı tetiklemeli flip-flop (\`always @(posedge clk)\`) yerleştirilmeli veya RTL mantık bağımlılığı yeniden yapılandırılmalıdır.`,
      },
      {
        title: "5. Boşta Kalan Portlar (Unconnected Ports) ve Yüzen Düğümler (Floating Nets)",
        content: `Bir modül örneklenirken giriş portunun boş bırakılması silikon üzerinde felakettir. CMOS teknolojisinde bağlı olmayan bir giriş kapısı (floating gate), ortamdaki elektrostatik gürültüye bağlı olarak 0 ile 1 arasında rastgele dalgalanır ve yüksek kısa devre akımına neden olur.

* **Yosys Kontrolü:**
  \`\`\`tcl
  # Bağlanmamış port ve netleri raporla:
  check
  \`\`\`
* **Kullanılmayan Çıkışlar:** Kullanılmayan çıkış portları zararsızdır; sentezleyici ölü kod eleme (**dead logic elimination**) ile bu çıkışları süren gereksiz mantık bloklarını otomatik olarak budar.`,
      },
      {
        title: "6. Sabit Mantık Sinyalleri ve Tie-High / Tie-Low Hücrelerinin Yönetimi",
        content: `Tasarımda sabit \`1'b1\` veya \`1'b0\` mantık değerlerine ihtiyaç duyulduğunda, transistör girişleri doğrudan $V_{DD}$ veya $V_{SS}$ güç raylarına bağlanmamalıdır. Ani voltaj sıçramaları ince kapı oksit tabakasını (gate oxide breakdown) delebilir.

ASIC dökümhaneleri bunun için özel **Tie-Cell** hücreleri sunar:
* \`sky130_fd_sc_hd__conb_1\`: Hem \`HI\` (1) hem de \`LO\` (0) çıkışı sağlayan koruyucu direnç/diyot yapılı hücredir.

Yosys'te sabit değerleri tie-cell hücrelerine bağlamak için:
\`\`\`tcl
# Sabit değerleri tie hücrelerine eşle:
hilomap -hicell sky130_fd_sc_hd__conb_1 HI -locell sky130_fd_sc_hd__conb_1 LO
\`\`\``,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Sık Karşılaşılan Sentez Hataları ve Çözüm Yolları** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "common-synthesis-issues.v - Örnek RTL / Sentez Kodu",
          snippet: `When EN = 1: Q follows D (transparent) When EN = 0: Q holds previous value (latched)`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Sık Karşılaşılan Sentez Hataları ve Çözüm Yolları",
      initialCode: `When EN = 1: Q follows D (transparent) When EN = 0: Q holds previous value (latched)`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Verilog 'always @(*)' bloğunda yazılan bir kombinasyonel mantık devresinde istenmeyen bir mandalın (inferred latch) ortaya çıkmasının temel sebebi nedir?",
      options: ["Tüm olası koşullarda (tüm if-else veya case dallarında) değişkene bir değer atanmamış olması", "Saat sinyalinin frekansının çok yüksek seçilmesi", "Tasarımda SystemVerilog 'wire' veri tipinin kullanılmış olması", "Liberty dosyasında tampon (buffer) hücresinin bulunmaması"],
      correctIndex: 0,
      explanation: "Kombinasyonel bir 'always @(*)' bloğunda bir sinyale her olası yürütme yolunda (if-else veya case dallarının tamamında) açıkça bir değer atanmazsa, sentezleyici sinyalin eski değerini koruması gerektiğini varsayar ve seviye duyarlı bir mandal (latch) çıkarımı yapar.",
    },
  },
  "static-timing-analysis-fundamentals": {
    id: "static-timing-analysis-fundamentals",
    badge: "Modül 7 • OpenSTA ile Statik Zamanlama Analizi (STA)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Statik Zamanlama Analizi (STA) Temelleri",
    subtitle: "Kurulum (Setup) ve tutma (Hold) zamanı fiziği, saat kayması (Skew), belirsizlik (Uncertainty) ve slack denklemleri.",
    sections: [
      {
        title: "1. Statik Zamanlama Analizi (STA) Nedir ve Dinamik Simülasyondan Farkı",
        content: `**Statik Zamanlama Analizi (STA - Static Timing Analysis)**, bir dijital entegre devrenin tüm olası zamanlama yollarını girdi vektörlerinden (test senaryolarından) bağımsız olarak matematiksel yöntemlerle doğrulayan yöntemdir.

| Özellik | Dinamik Simülasyon (Gate-Level Sim) | Statik Zamanlama Analizi (STA) |
| :--- | :--- | :--- |
| **Girdi Gereksinimi** | Testbench uyarıcı vektörleri zorunludur | Vektörsüzdür (Vectorless); kısıtlar (SDC) yeterlidir |
| **Kapsama (Coverage)** | Sadece testbench'in uyardığı yolları kontrol eder (%60-80) | Tasarımdaki istisnasız **tüm yolları (%100)** analiz eder |
| **Hız** | Çok yavaş (günler/haftalar sürebilir) | Çok hızlı (dakikalar içinde tamamlanır) |
| **Kritiklik** | Fonksiyonel doğrulamayı hedefler | Silikon zamanlama kapanımı (timing closure) için zorunludur |`,
      },
      {
        title: "2. Kurulum Zamanı (Setup Time / Max Delay) Analizi ve Matematiği",
        content: `**Kurulum Zamanı ($T_{setup}$):** Saat kenarı gelmeden önce verinin flip-flop girişinde kararlı (stable) kalması gereken minimum süredir. Veri bu süreden önce gelmelidir; bu nedenle **maksimum gecikme kontrolüdür (Max Delay Check)**.

\`\`\`
Saat (CLK):     ───────────┐           ┌───────────
                           │           │
Veri (D):   ───────XXXXXXXXXXXXXXXXX───┘
                   |<-- T_setup -->|
\`\`\`

İki ardışıl flip-flop arasındaki kurulum zamanı koşulu:
$$T_{clk} + T_{skew} \\ge T_{cq} + T_{comb\\_max} + T_{setup}$$

Burada:
* $T_{clk}$: Saat periyodu
* $T_{cq}$: Başlatıcı flip-flopun saatten çıkışa gecikmesi
* $T_{comb\\_max}$: Kombinasyonel mantığın en uzun yayılım gecikmesi
* $T_{setup}$: Yakalayıcı flip-flopun kurulum süresi
* $T_{skew}$: Saat kayması ($T_{clk\\_capture} - T_{clk\\_launch}$)

**Kurulum Marjı (Setup Slack):**
$$	ext{Slack}_{setup} = T_{	ext{required}} - T_{	ext{arrival}} \\ge 0$$
Eğer Slack negatifse, veri hedefe geç kalmıştır; frekans düşürülmeli veya kombinasyonel yol hızlandırılmalıdır.`,
      },
      {
        title: "3. Tutma Zamanı (Hold Time / Min Delay) Analizi ve Erken Veri Riski",
        content: `**Tutma Zamanı ($T_{hold}$):** Saat kenarı oluştuktan sonra, yakalanan verinin flip-flop girişinde kararlı kalmaya devam etmesi gereken minimum süredir. Veri çok erken değişmemelidir; bu nedenle **minimum gecikme kontrolüdür (Min Delay Check)**.

Tutma zamanı koşulu:
$$T_{cq} + T_{comb\\_min} - T_{skew} \\ge T_{hold}$$

**Hayati Mühendislik İlkesi:**
Kurulum ihlali saat frekansı düşürülerek (çipi daha yavaş çalıştırarak) telafi edilebilir. Ancak **tutma ihlali (hold violation)** saat periyodundan ($T_{clk}$) tamamen bağımsızdır! Eğer silikonda bir tutma ihlali varsa çip saat frekansı ne olursa olsun kesinlikle çalışmaz ve çöpe gider. Bu nedenle tutma ihlalleri üretim öncesinde mutlaka gecikme tamponları (\`buffer\`) eklenerek çözülmelidir.`,
      },
      {
        title: "4. Saat Ağı Parametreleri: Saat Kayması (Clock Skew) ve Belirsizlik (Clock Uncertainty)",
        content: `İdeal dünyada saat sinyali tüm flip-floplara aynı anda ulaşır. Fiziksel silikonda ise metal hat uzunlukları ve tampon gecikmeleri nedeniyle saat ağında gecikmeler oluşur:

* **Saat Kayması (Clock Skew):**
  Başlatıcı (launch) ve yakalayıcı (capture) flip-flopların saat pinlerine saatin ulaşma anları arasındaki farktır:
  $$T_{skew} = T_{clk\\_capture} - T_{clk\\_launch}$$
  Pozitif skew kurulum zamanına yardımcı olurken, tutma zamanını tehlikeye atar.
* **Saat Belirsizliği (Clock Uncertainty):**
  Fiziksel saat üretecinin jitter (titreme) değeri ile saat ağındaki bilinmeyen dökümhane varyasyonlarının toplam marjıdır. SDC'de şu komutla modellenir:
  \`\`\`tcl
  set_clock_uncertainty 0.25 [get_clocks sys_clk]
  \`\`\`
* **CPPR (Common-Path Pessimism Removal):** Saat ağacında ortak paylaşılan tamponların hem yavaş hem hızlı çalıştığı yönündeki yapay karamsarlığın analitik olarak ayıklanmasıdır.`,
      },
      {
        title: "5. Giriş ve Çıkış Gecikmeleri (I/O Delays) ve Kart Seviyesi Arayüz Zamanlaması",
        content: `Bir çip boşlukta tek başına çalışmaz; PCB üzerindeki diğer çiplerle haberleşir. STA motoru çip dışındaki gecikmeleri bilmelidir:

* **Giriş Gecikmesi (\`set_input_delay\`):** Dışarıdaki bir vericiden çıkan verinin çip pinine ulaşana kadar geçen süredir:
  \`\`\`tcl
  set_input_delay -clock sys_clk -max 3.0 [get_ports data_in]
  set_input_delay -clock sys_clk -min 1.0 [get_ports data_in]
  \`\`\`
* **Çıkış Gecikmesi (\`set_output_delay\`):** Çip çıkış pininden çıkan verinin dışarıdaki alıcı çip tarafından yakalanması için gereken dış bütçedir:
  \`\`\`tcl
  set_output_delay -clock sys_clk -max 2.5 [get_ports data_out]
  \`\`\``,
      },
      {
        title: "6. Zamanlama İstisnaları (Timing Exceptions): False Path ve Multicycle Path Temelleri",
        content: `STA motoru varsayılan olarak her başlatıcı flip-flop ile her yakalayıcı flip-flop arasındaki yolu tek bir saat çevriminde ($1 	imes T_{clk}$) tamamlanması gereken bir yol kabul eder. Bazı yollar için bu kural geçersizdir:

1. **Yalancı Yol (False Path):**
   Fiziksel olarak var olan ancak devre çalışırken fonksiyonel olarak hiçbir zaman etkinleşmeyen ya da asenkron olan yollardır (örn. statik konfigürasyon register'ları veya asenkron reset hatları):
   \`\`\`tcl
   set_false_path -from [get_ports rst_n]
   \`\`\`
2. **Çoklu Çevrim Yolu (Multicycle Path):**
   Tasarımcının mimari olarak sonucunu 1 çevrimde değil, 2 veya daha fazla çevrimde yakaladığı yollardır (örn. yavaş bir 32-bit kayan nokta çarpıcı ünitesi):
   \`\`\`tcl
   set_multicycle_path 2 -setup -from [get_cells u_mult/reg_*]
   set_multicycle_path 1 -hold -from [get_cells u_mult/reg_*]
   \`\`\``,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Statik Zamanlama Analizi (STA) Temelleri** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "static-timing-analysis-fundamentals.v - Örnek RTL / Sentez Kodu",
          snippet: `Data must be stable at least T_setup before the clock edge`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Statik Zamanlama Analizi (STA) Temelleri",
      initialCode: `Data must be stable at least T_setup before the clock edge`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Statik Zamanlama Analizinde (STA) 'Tutma Zamanı' (Hold Time) ihlallerinin Kurulum Zamanı (Setup Time) ihlallerine kıyasla silikon üretimi için çok daha ölümcül olmasının temel sebebi nedir?",
      options: ["Tutma zamanı denklemi saat periyodundan bağımsızdır; dolayısıyla silikonda ortaya çıkan bir tutma ihlali saat frekansı düşürülerek telafi edilemez.", "Tutma ihlalleri sadece FPGA'lerde görülür, ASIC'lerde asla oluşmaz.", "Tutma ihlali oluştuğunda çipin çalışma voltajı anında iki katına çıkar.", "Tutma ihlallerini tespit edebilen hiçbir açık kaynaklı EDA aracı bulunmamaktadır."],
      correctIndex: 0,
      explanation: "Kurulum ihlali oluştuğunda saat periyodu uzatılarak (çip daha düşük frekansta çalıştırılarak) devre kurtarılabilir. Ancak tutma zamanı (hold) formülünde saat periyodu ($T_{clk}$) yer almaz; veri çok erken değiştiğinde flip-flop hatalı veri örnekler ve çip hangi frekansta olursa olsun çalışamaz.",
    },
  },
  "opensta-basics": {
    id: "opensta-basics",
    badge: "Modül 7 • OpenSTA ile Statik Zamanlama Analizi (STA)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "OpenSTA Temelleri ve Komut Satırı Mimarisi",
    subtitle: "Açık kaynak STA motoru OpenSTA'nın mimarisi, Liberty ve Verilog okuma, Tcl komutları ve temel zamanlama raporlama.",
    sections: [
      {
        title: "1. OpenSTA Nedir? Mimarisi ve Açık Kaynak ASIC Akışındaki Rolü",
        content: `**OpenSTA (Open Static Timing Analyzer)**, Parallax Software Technologies ve EDA duayeni James Cherry tarafından geliştirilmiş, endüstri standardı doğrulukta açık kaynaklı bir kapı seviyesi statik zamanlama analizi motorudur.

OpenSTA, günümüzde ticari altın standart araçlarla (Synopsys PrimeTime, Cadence Tempus) yarışabilecek seviyede hız ve doğruluk sunar. OpenLane, OpenROAD ve qflow gibi tüm önde gelen açık kaynak ASIC tasarım akışlarının zamanlama omurgasını oluşturur.

Mimarisi C++ ile yazılmış yüksek başarımlı bir zamanlama grafı motoru ve kullanıcı etkileşimi için eksiksiz bir **Tcl (Tool Command Language)** kabuğu üzerine kuruludur. Standart Liberty (\`.lib\`), Verilog netlist (\`.v\`), SPEF (Standard Parasitic Extraction Format) ve SDC (Synopsys Design Constraints) dosyalarını doğrudan ayrıştırır.`,
      },
      {
        title: "2. Tasarımın Yüklenmesi: `read_liberty`, `read_verilog` ve `link_design`",
        content: `OpenSTA'yı interaktif başlatmak veya betik üzerinden çalıştırmak için temel yükleme komut dizisi şöyledir:

\`\`\`tcl
# 1. Hedef teknoloji kütüphanesini yükle
read_liberty /pdk/sky130A/libs.ref/sky130_fd_sc_hd/lib/sky130_fd_sc_hd__tt_025C_1v80.lib

# 2. Sentezlenmiş kapı seviyesi netlist'i yükle
read_verilog synth_netlist.v

# 3. Tepe modülü bağla ve tasarım grafını inşa et
link_design core_top
\`\`\`

* \`read_liberty\`: Hücrelerin NLDM gecikme tablolarını belleğe alır.
* \`read_verilog\`: Kapıların ve tel bağlantılarının hiyerarşik yapısını okur.
* \`link_design\`: Netlist içindeki hücre referanslarını Liberty kütüphanesindeki modellerle eşleştirerek bellek üzerinde yönlendirilmiş zamanlama grafını (**timing graph**) oluşturur.`,
      },
      {
        title: "3. Zamanlama Kısıtlarının Yüklenmesi: `read_sdc` ve Kısıt Denetimi",
        content: `Zamanlama grafı inşa edildikten sonra tasarımın saat ve gecikme sınırları SDC dosyası üzerinden araca bildirilir:

\`\`\`tcl
# SDC dosyasını oku
read_sdc constraints.sdc
\`\`\`

SDC yüklendikten hemen sonra kısıtların eksiksiz olduğunu doğrulamak için şu denetimler yapılır:
\`\`\`tcl
# Tanımsız veya saatsiz kalan flip-flopları kontrol et:
check_setup

# Kısıtlanmamış giriş/çıkış portlarını raporla:
report_checks -unconstrained
\`\`\`
Eğer saati tanımlanmamış flip-floplar veya referans saati olmayan giriş portları varsa, OpenSTA bu yolları zamanlama analizine dahil edemez; bu nedenle kısıt denetimi hayati önem taşır.`,
      },
      {
        title: "4. Temel Zamanlama Raporlama Komutları: `report_checks`, `report_worst_slack` ve `report_tns`",
        content: `OpenSTA'da zamanlama marjlarını incelemek için kullanılan temel Tcl komutları:

* **\`report_checks\`:** Varsayılan olarak tasarımdaki en kritik (en düşük slack'e sahip) yolu ayrıntılı olarak raporlar:
  \`\`\`tcl
  # En kötü 5 kurulum (setup) yolunu listele:
  report_checks -path_delay max -endpoint_count 5

  # En kötü tutma (hold) yolunu listele:
  report_checks -path_delay min
  \`\`\`
* **\`report_worst_slack\` (WNS):** Tasarımın genelindeki en kötü negatif marjı tek satırda verir:
  \`\`\`tcl
  report_worst_slack -max  ;# Setup WNS
  report_worst_slack -min  ;# Hold WNS
  \`\`\`
* **\`report_tns\` (TNS):** Tasarımdaki tüm ihlalli yolların toplam negatif marjını bildirir:
  \`\`\`tcl
  report_tns -max
  \`\`\``,
      },
      {
        title: "5. Zamanlama Yolu Raporunun Anatomisi: Varış Zamanı (Arrival), Gereken Zaman (Required) ve Slack",
        content: `Bir OpenSTA yol raporu iki ana sütundan oluşur: **Data Arrival Path** ve **Data Required Path**:

\`\`\`text
Startpoint: reg_a (rising edge-triggered flip-flop clocked by clk)
Endpoint:   reg_b (rising edge-triggered flip-flop clocked by clk)
Path Group: clk
Path Type:  max (setup)

  Fanout     Cap    Slew   Delay    Time   Description
-----------------------------------------------------------------------------
                           0.00    0.00   clock clk (rise edge)
                           0.15    0.15   clock network delay (ideal)
                           0.00    0.15 ^ reg_a/CLK (sky130_fd_sc_hd__dfxtp_1)
                    0.08   0.28    0.43 v reg_a/Q (sky130_fd_sc_hd__dfxtp_1)
       2    0.01    0.12   0.35    0.78 ^ u_and/X (sky130_fd_sc_hd__and2_1)
                           0.00    0.78 ^ reg_b/D (sky130_fd_sc_hd__dfxtp_1)
                                   0.78   data arrival time

                           5.00    5.00   clock clk (rise edge)
                           0.10    5.10   clock network delay (ideal)
                          -0.20    4.90   clock uncertainty
                          -0.12    4.78   library setup time
                                   4.78   data required time
-----------------------------------------------------------------------------
                                   4.78   data required time
                                  -0.78   data arrival time
-----------------------------------------------------------------------------
                                   4.00   slack (MET)
\`\`\`

$$	ext{Slack} = T_{	ext{required}} - T_{	ext{arrival}} = 4.78 - 0.78 = +4.00 	ext{ ns}$$
Slack pozitif olduğundan zamanlama kriteri karşılanmıştır (**MET**). Negatif olsaydı **VIOLATED** yazacaktı.`,
      },
      {
        title: "6. OpenSTA Otomasyon Betiği Hazırlama ve Toplu (Batch) Modda Çalıştırma",
        content: `Sürekli entegrasyonda zamanlama raporlarını otomatik üretmek için tek bir Tcl betiği (\`run_sta.tcl\`) hazırlanır:

\`\`\`tcl
# run_sta.tcl
set LIB_FILE "/pdk/sky130A/libs.ref/sky130_fd_sc_hd/lib/sky130_fd_sc_hd__tt_025C_1v80.lib"
set NETLIST  "outputs/core_netlist.v"
set SDC_FILE "constraints/core.sdc"

read_liberty $LIB_FILE
read_verilog $NETLIST
link_design core_top
read_sdc $SDC_FILE

# Raporları diske kaydet
report_checks -path_delay max -fields {slew cap input nets fanout} > reports/setup_timing.rpt
report_checks -path_delay min -fields {slew cap input nets fanout} > reports/hold_timing.rpt

exit
\`\`\`

Çalıştırma:
\`\`\`bash
sta -exit run_sta.tcl
\`\`\``,
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: OpenSTA Temelleri ve Komut Satırı Mimarisi",
      initialCode: `// Minimal Sentezlenebilir Verilog Modülü
module counter (
    input  wire       clk,
    input  wire       rst_n,
    output reg  [3:0] count
);
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            count <= 4'b0000;
        else
            count <= count + 1'b1;
    end
endmodule`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "OpenSTA zamanlama raporunda 'Slack' değeri nasıl hesaplanır ve pozitif olması ne anlama gelir?",
      options: ["Slack = Data Required Time - Data Arrival Time; pozitif olması verinin flip-flopa gereken zamandan önce ulaştığını ve zamanlamanın başarılı (MET) olduğunu gösterir.", "Slack = Data Arrival Time - Clock Period; pozitif olması devrenin yandığını gösterir.", "Slack = Fanout x Voltaj; pozitif olması saat ağında tampon bulunmadığını ifade eder.", "Slack = Toplam Kapı Sayısı - Tel Sayısı; pozitif olması tasarımın silikona sığacağını gösterir."],
      correctIndex: 0,
      explanation: "Slack, gereken varış zamanı (Required Time) ile gerçek varış zamanı (Arrival Time) arasındaki farktır (Slack = Required - Arrival). Kurulum analizinde pozitif slack, sinyalin hedefe deadline dolmadan güvenle vardığını ve zamanlama kısıtının karşılandığını (MET) belirtir.",
    },
  },
  "synthesis-design-constraints": {
    id: "synthesis-design-constraints",
    badge: "Modül 7 • OpenSTA ile Statik Zamanlama Analizi (STA)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Sentez ve Zamanlama Kısıtları (SDC - Synopsys Design Constraints)",
    subtitle: "create_clock, create_generated_clock, set_input_delay, set_output_delay ve zamanlama istisna komutları.",
    sections: [
      {
        title: "1. SDC Sözdizimi, Dosya Yapısı ve Zamanlama Kısıtlarının Önemi",
        content: `**SDC (Synopsys Design Constraints)**, dijital entegre devre tasarımında hem mantık sentezleyicilere (Yosys, Design Compiler) hem de statik zamanlama analizörlerine (OpenSTA, PrimeTime) ve yerleşim-rota araçlarına devrenin çalışma gereksinimlerini aktaran endüstri standardı Tcl tabanlı dildir.

Kısıtlar olmaksızın sentez ve STA araçları şunları bilemez:
* Çipin hedef çalışma frekansı nedir?
* Çip dışındaki devrelerden gelen veriler ne kadar gecikmeyle ulaşacak?
* Çıkış pinlerini süren harici yük kapasitansı ne kadardır?

İyi yapılandırılmış bir SDC dosyası şu sıra ile yazılır:
1. Birincil saat tanımları (\`create_clock\`)
2. Türetilmiş saatler (\`create_generated_clock\`)
3. Saat belirsizlikleri ve kaymaları (\`set_clock_uncertainty\`, \`set_clock_transition\`)
4. Giriş ve çıkış gecikmeleri (\`set_input_delay\`, \`set_output_delay\`)
5. Giriş sürücüleri ve çıkış yükleri (\`set_driving_cell\`, \`set_load\`)
6. Zamanlama istisnaları (\`set_false_path\`, \`set_multicycle_path\`).`,
      },
      {
        title: "2. Saat Tanımları: `create_clock`, Dalga Şekilleri ve Sanal Saatler (Virtual Clocks)",
        content: `* **Temel Saat Tanımı:**
  \`\`\`tcl
  # 10 ns periyotlu (100 MHz), %50 görev çevrimli saat:
  create_clock -name core_clk -period 10.0 [get_ports clk]
  \`\`\`
* **Özel Dalga Şekli (Waveform):**
  Varsayılan olarak saat $0.0$'da yükselir ve $	ext{periyot}/2$'de düşer. Farklı görev çevrimleri \`-waveform\` ile tanımlanır:
  \`\`\`tcl
  # 10 ns periyot, 2 ns'de yükselip 6 ns'de düşen dalga şekli:
  create_clock -name clk_custom -period 10.0 -waveform {2.0 6.0} [get_ports clk_in]
  \`\`\`
* **Sanal Saat (Virtual Clock):**
  Tasarımda herhangi bir fiziksel pine bağlı olmayan, yalnızca giriş veya çıkış portlarının dış arayüz zamanlamasını referanslamak için tanımlanan saattir:
  \`\`\`tcl
  create_clock -name vclk_ext -period 10.0
  \`\`\``,
      },
      {
        title: "3. Türetilmiş Saatler (`create_generated_clock`) ve Saat Bölücüler (Clock Dividers)",
        content: `Tasarım içerisinde bir flip-flop veya PLL çıkışından üretilen dahili saatler için \`create_generated_clock\` komutu kullanılır:

\`\`\`verilog
// 2'ye bölen saat devresi
always @(posedge clk or negedge rst_n) begin
    if (!rst_n) clk_div2 <= 1'b0;
    else        clk_div2 <= ~clk_div2;
end
\`\`\`

SDC Tanımı:
\`\`\`tcl
create_generated_clock -name clk_div2     -source [get_ports clk]     -divide_by 2     [get_pins u_clk_div/clk_div2_reg/Q]
\`\`\`

Bu komut sayesinde STA aracı ana saat (\`clk\`) ile türetilmiş saat (\`clk_div2\`) arasındaki faz ve frekans ilişkisini otomatik olarak kavrar ve alanlar arası geçişleri doğru modeller.`,
      },
      {
        title: "4. Giriş/Çıkış Kısıtları: `set_input_delay`, `set_output_delay` ve Yük/Sürücü Modelleri",
        content: `* **Giriş Gecikmesi (\`set_input_delay\`):**
  Dış dünyadan çip girişine gelen sinyalin dışarıda harcadığı süredir:
  \`\`\`tcl
  set_input_delay -clock core_clk -max 3.5 [get_ports data_in[*]]
  set_input_delay -clock core_clk -min 0.5 [get_ports data_in[*]]
  \`\`\`
* **Çıkış Gecikmesi (\`set_output_delay\`):**
  Çip çıkışından çıkan sinyalin dış alıcı çipe yetişmesi için kalan bütçedir:
  \`\`\`tcl
  set_output_delay -clock core_clk -max 2.0 [get_ports data_out[*]]
  \`\`\`
* **Giriş Sürücüsü ve Çıkış Yükü:**
  Sinyal kenar dikliklerini ve yüklerini modellemek için standart hücreler ve kapasitanslar atanır:
  \`\`\`tcl
  set_driving_cell -lib_cell sky130_fd_sc_hd__inv_2 [get_ports data_in[*]]
  set_load 0.05 [get_ports data_out[*]]  ;# 50 fF yük kapasitansı
  \`\`\``,
      },
      {
        title: "5. Zamanlama İstisnaları: `set_false_path` ve `set_multicycle_path` Komutları",
        content: `Zamanlama istisnaları, analiz aracının gereksiz yere ihlal üretmesini engeller:

* **\`set_false_path\`:**
  Zamanlama kontrolü yapılmaması gereken yolları devre dışı bırakır.
  \`\`\`tcl
  # Asenkron reset hattını analizden muaf tut:
  set_false_path -from [get_ports rst_n]

  # Birbirinden bağımsız asenkron saat alanları arasındaki yolları kapat:
  set_clock_groups -asynchronous -group [get_clocks clk_100m] -group [get_clocks clk_33m]
  \`\`\`
* **\`set_multicycle_path\`:**
  Verinin birden fazla saat çevriminde hedefe varmasına izin verir:
  \`\`\`tcl
  # 2 çevrimlik kurulum bütçesi ver:
  set_multicycle_path 2 -setup -from [get_pins u_alu/op_reg*/CLK] -to [get_pins u_alu/res_reg*/D]
  # Tutma kontrolünü 1 çevrim geri çek (varsayılanı düzelt):
  set_multicycle_path 1 -hold  -from [get_pins u_alu/op_reg*/CLK] -to [get_pins u_alu/res_reg*/D]
  \`\`\``,
      },
      {
        title: "6. SDC Tasarımında En İyi Pratikler ve Sık Yapılan Kısıt Hataları",
        content: `Profesyonel SDC yazımında dikkat edilmesi gereken altın kurallar:

1. **Aşırı Kısıtlama (Over-constraining) Tuzağı:**
   Gereksiz yere saat periyodunu çok küçük veya I/O gecikmelerini çok büyük girmek, sentezleyicinin dev devasa sürücüler kullanmasına, alanın şişmesine ve yüksek güç tüketimine yol açar.
2. **Eksik Kısıtlama (Under-constraining) Riski:**
   Giriş veya çıkış portlarına gecikme verilmezse, araç bu portlara giden/gelen yollarda gecikmeyi 0 kabul eder ve silikonda ihlal oluşur.
3. **Dikkatsiz \`set_false_path\` Kullanımı:**
   Zamanlama ihlalini çözmek için gerçek bir veri yoluna yanlışlıkla \`set_false_path\` koymak, silikonda çalışmayan bir çip üretilmesinin bir numaralı sebebidir!`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Sentez ve Zamanlama Kısıtları (SDC - Synopsys Design Constraints)** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "synthesis-design-constraints.v - Örnek RTL / Sentez Kodu",
          snippet: `# design.sdc - Timing constraints for my_design # Author: Your Name # Date: 2025-01-15 # ============================================================ # Clock Definitions # ============================================================ create_clock -name sys_clk -period 10.0 [get_ports clk] # ============================================================ # Clock Characteristics # ============================================================ set_clock_uncertainty 0.2 [get_clocks sys_clk] set_clock_latency 1.0 [get_clocks sys_clk] # ============================================================ # Input Constraints # ============================================================ set_input_delay -clock sys_clk -max 2.0 [all_inputs] set_input_delay -clock sys_clk -min 0.5 [all_inputs] # ============================================================ # Output Constraints # ============================================================ set_output_delay -clock sys_clk -max 1.5 [all_outputs] set_output_delay -clock sys_clk -min 0.3 [all_outputs] # ============================================================ # Design Rules # ============================================================ set_max_transition 0.5 [current_design] set_max_capacitance 0.2 [all_outputs] # ============================================================ # Timing Exceptions # ============================================================ # (false paths, multicycle paths, etc.)`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Sentez ve Zamanlama Kısıtları (SDC - Synopsys Design Constraints)",
      initialCode: `# design.sdc - Timing constraints for my_design # Author: Your Name # Date: 2025-01-15 # ============================================================ # Clock Definitions # ============================================================ create_clock -name sys_clk -period 10.0 [get_ports clk] # ============================================================ # Clock Characteristics # ============================================================ set_clock_uncertainty 0.2 [get_clocks sys_clk] set_clock_latency 1.0 [get_clocks sys_clk] # ============================================================ # Input Constraints # ============================================================ set_input_delay -clock sys_clk -max 2.0 [all_inputs] set_input_delay -clock sys_clk -min 0.5 [all_inputs] # ============================================================ # Output Constraints # ============================================================ set_output_delay -clock sys_clk -max 1.5 [all_outputs] set_output_delay -clock sys_clk -min 0.3 [all_outputs] # ============================================================ # Design Rules # ============================================================ set_max_transition 0.5 [current_design] set_max_capacitance 0.2 [all_outputs] # ============================================================ # Timing Exceptions # ============================================================ # (false paths, multicycle paths, etc.)`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Bir tasarımda 50 MHz'lik ana saatten (core_clk) bir flip-flop ile 2'ye bölünerek elde edilen 25 MHz'lik saat sinyalini SDC içerisinde tanımlamak için hangi komut kullanılmalıdır?",
      options: ["create_generated_clock -name clk_div2 -source [get_ports clk] -divide_by 2 [get_pins ...]", "create_clock -name clk_div2 -period 20.0", "set_false_path -from [get_ports clk] -to [get_pins clk_div2]", "set_clock_uncertainty -divide_by 2 [get_clocks core_clk]"],
      correctIndex: 0,
      explanation: "Tasarım içerisindeki mantık kapıları veya flip-floplar tarafından ana saatten türetilen alt saatler, 'create_generated_clock' komutu ile referans ana saate (-source) ve bölme/çarpma oranına (-divide_by / -multiply_by) bağlanarak tanımlanmalıdır.",
    },
  },
  "running-timing-analysis": {
    id: "running-timing-analysis",
    badge: "Modül 7 • OpenSTA ile Statik Zamanlama Analizi (STA)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Zamanlama Analizinin Yürütülmesi ve Detaylı Rapor Yorumlama",
    subtitle: "OpenSTA ile kurulum ve tutma kontrolleri, WNS/TNS analizi, başlangıç-bitiş noktası izleme ve ihlal kök neden tespiti.",
    sections: [
      {
        title: "1. Zamanlama Analizi Yürütme Akışı: Kurulum (Setup) ve Tutma (Hold) Koşuları",
        content: `Sentezlenen bir netlist'in doğrulanması iki temel zamanlama adımıyla gerçekleştirilir:

1. **Kurulum Analizi (\`max\` gecikme):**
   Veri yolundaki en uzun yayılım gecikmesini test eder. Verinin saat kenarından önce yakalama flip-flopuna yetişip yetişmediğini denetler.
2. **Tutma Analizi (\`min\` gecikme):**
   Veri yolundaki en kısa yayılım gecikmesini test eder. Yeni gelen verinin bir önceki veriyi yakalama kenarından hemen sonra bozup bozmadığını denetler.

Bu iki analiz genellikle farklı çalışma koşullarında (PVT köşelerinde) koşturulur: Kurulum analizi en yavaş köşede (**Slow Corner - SS**), tutma analizi ise en hızlı köşede (**Fast Corner - FF**) icra edilir.`,
      },
      {
        title: "2. Detaylı Zamanlama Raporunun Anatomisi: Satır Satır Gecikme Ayrıştırması",
        content: `OpenSTA tarafından üretilen kapsamlı bir yol raporu incelenirken şu satırlar takip edilir:

\`\`\`text
Startpoint: u_reg_file/data_reg_15 (rising edge-triggered flip-flop clocked by clk)
Endpoint:   u_alu/result_reg_15 (rising edge-triggered flip-flop clocked by clk)
Path Group: clk
Path Type:  max

  Pin                    Type                      Incr       Time
----------------------------------------------------------------------
  clk                    clock launch edge         0.00       0.00
  u_reg_file/data_reg/Q  dfxtp_1 (clk-to-q)        0.24       0.24
  u_alu/adder_inst/A     input slew                0.05       0.29
  u_alu/adder_inst/SUM   fa_1 (propagation delay)  0.65       0.94
  u_alu/result_reg/D     dfxtp_1 setup requirement 0.12       1.06
----------------------------------------------------------------------
  data arrival time                                           0.94
  data required time                                          2.50
  slack (MET)                                                 1.56
\`\`\`

* \`Incr\` (Incremental): İlgili kapı veya telin o adıma eklediği saf gecikme.
* \`Time\`: Yol boyunca kümülatif olarak biriken toplam süre.`,
      },
      {
        title: "3. Slack Matematiği: Pozitif vs. Negatif Slack ve Frekans Sınırları",
        content: `Slack değeri, devrenin zamanlama bütçesine göre durumunu ifade eden nihai çıktıdır:

$$	ext{Slack} = T_{	ext{required}} - T_{	ext{arrival}}$$

* **$	ext{Slack} > 0$ (MET):** Tasarım zamanlama hedefini karşılamıştır. Pozitif marj, saatin daha da hızlandırılabileceğini (over-clocking) veya alan kazanmak için hücrelerin küçültülebileceğini gösterir.
* **$	ext{Slack} = 0$ (CRITICAL):** Devre tam sınırda çalışmaktadır.
* **$	ext{Slack} < 0$ (VIOLATED):** Zamanlama ihlali mevcuttur. Çip bu frekansta güvenilir çalışamaz.

**Maksimum Frekans Hesabı:**
En kötü kurulum yolunun varış süresi $T_{crit}$ ise, devrenin çalışabileceği maksimum teorik frekans:
$$F_{max} = rac{1}{T_{crit} + T_{setup} + T_{uncertainty} - T_{skew}}$$`,
      },
      {
        title: "4. Global Zamanlama Metrikleri: WNS (Worst Negative Slack) ve TNS (Total Negative Slack)",
        content: `Tasarımın genel zamanlama sağlığını değerlendirmek için iki global metrik kullanılır:

1. **WNS (Worst Negative Slack):**
   Tasarımdaki tüm yollar arasındaki en kötü negatif slack değeridir.
   * Eğer $WNS = -0.45	ext{ ns}$ ise, devrenin hedef periyodu en az $0.45	ext{ ns}$ aşılmış demektir.
2. **TNS (Total Negative Slack):**
   Zamanlama ihlali yaşayan tüm uç noktaların (endpoints) negatif slack değerlerinin toplamıdır:
   $$TNS = \\sum_{i \\in 	ext{Violations}} 	ext{Slack}_i$$
   * $WNS = -0.2	ext{ ns}$ iken $TNS = -0.2	ext{ ns}$ ise, sadece 1 adet uç noktada ihlal vardır (kolay çözülür).
   * $WNS = -0.2	ext{ ns}$ iken $TNS = -120.0	ext{ ns}$ ise, yüzlerce yol ihlaldedir (yapısal/mimari bir sorun vardır).`,
      },
      {
        title: "5. Yol İzleme (Path Tracing): Başlangıç Noktası (Startpoint), Veri Yolu ve Saat Ağı İncelemesi",
        content: `Bir zamanlama ihlali incelenirken şu üç bileşen analiz edilir:

1. **Başlangıç Noktası (Startpoint):**
   Veriyi başlatan eleman (bir giriş portu veya flip-flopun saat pini). Flip-flopun saat gecikmesi (\`clk-to-Q\`) anormal yüksekse, flip-flop çıkışındaki fanout yükü aşırı olabilir.
2. **Veri Yolu Mantığı (Data Path Logic):**
   Araya giren mantık kapıları zinciri. Eğer yolda 15 adet mantık kapısı varsa, mantık derinliği fazladır; boru hattı (pipelining) gerekebilir.
3. **Bitiş Noktası (Endpoint):**
   Veriyi yakalayan flip-flopun \`D\` pini veya bir çıkış portu. Yakalama saati gecikmesi (\`capture clock latency\`) yeterince hızlı mı kontrol edilir.`,
      },
      {
        title: "6. İhlal Analizi ve Hata Raporlama Örneği (Pratik Vaka İncelemesi)",
        content: `Bir zamanlama ihlali ile karşılaşıldığında takip edilecek mühendislik adımları:

* **Adım 1:** OpenSTA'da ihlalli yolun detaylı dökümünü alın:
  \`\`\`tcl
  report_checks -slack_max 0.0 -path_delay max -fields {slew cap input nets fanout}
  \`\`\`
* **Adım 2 (Slew / Geçiş Süresi Kontrolü):**
  Rapordaki \`slew\` değerlerine bakın. Eğer bir pinde slew $1.5	ext{ ns}$ gibi devasa bir değere çıkmışsa, kapı yükü kaldıramıyordur. Çözüm: Hücre sürücü gücünü artırmak (\`X1\` -> \`X4\`) veya tampon eklemektir.
* **Adım 3 (Fanout Kontrolü):**
  Bir sinyal 50 farklı kapıyı sürüyorsa, araya tampon ağacı kurulmalıdır.
* **Adım 4 (Mantık Derinliği):**
  Kritik yoldaki mantık kapısı sayısı çok fazlaysa RTL düzeyinde boru hattı (pipelining) uygulanmalıdır.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Zamanlama Analizinin Yürütülmesi ve Detaylı Rapor Yorumlama** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "running-timing-analysis.v - Örnek RTL / Sentez Kodu",
          snippet: `report_checks -path_delay max`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Zamanlama Analizinin Yürütülmesi ve Detaylı Rapor Yorumlama",
      initialCode: `report_checks -path_delay max`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Bir dijital tasarımın zamanlama raporunda WNS (Worst Negative Slack) değeri -0.5 ns iken, TNS (Total Negative Slack) değerinin -0.5 ns olması neyi gösterir?",
      options: ["Tasarımda sadece tek bir uç noktada (endpoint) 0.5 ns'lik ihlal olduğunu, genel tasarımın geri kalanının zamanlamayı karşıladığını", "Devredeki tüm flip-flopların bozuk olduğunu", "Saat frekansının en az 500 MHz artırılabileceğini", "Tasarımın hiçbir optimizasyon gerektirmeden üretime hazır olduğunu"],
      correctIndex: 0,
      explanation: "TNS, ihlalli tüm yolların slack toplamıdır. WNS ile TNS birbirine eşit olduğunda (ikisi de -0.5 ns), devrede yalnızca tek bir kritik yolun hedefin 0.5 ns gerisinde kaldığı, diğer tüm yolların zamanlama hedefini tutturduğu anlaşılır.",
    },
  },
  "multi-corner-analysis": {
    id: "multi-corner-analysis",
    badge: "Modül 7 • OpenSTA ile Statik Zamanlama Analizi (STA)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Çoklu Köşe (Multi-Corner / PVT) Zamanlama Analizi",
    subtitle: "Süreç, gerilim ve sıcaklık (PVT) değişimleri, SS/FF/TT köşeleri, OCV/AOCV ve sign-off kriterleri.",
    sections: [
      {
        title: "1. Silikon Gerçekliği ve PVT (Process, Voltage, Temperature) Uzayı",
        content: `Üretilen hiçbir entegre devre nominal oda sıcaklığında (25°C) ve kusursuz voltajda çalışacak şekilde tek başına değerlendirilemez. Yarı iletken fabrikasyonunda silikon pullar (wafers) üzerindeki atomik katman kalınlıkları, katkılama oranları ve hat genişlikleri kaçınılmaz varyasyonlar gösterir.

Bu varyasyonlar **PVT (Process, Voltage, Temperature)** uzayı olarak adlandırılır:
* **P (Process - Süreç):** Transistörlerin üretim değişkenliği.
  * *Slow (S):* Transistör kanalı daha uzun, oksit daha kalın, akım zayıf -> Yavaş geçişler.
  * *Fast (F):* Transistör kanalı kısa, akım yüksek -> Hızlı geçişler.
  * *Typical (T):* Nominal fabrika standardı.
* **V (Voltage - Gerilim):** Güç kaynağından devrenin içine ulaşan voltaj dalgalanmaları (örn. 1.8V ± %10: 1.62V - 1.98V).
* **T (Temperature - Sıcaklık):** Çipin çalıştığı ortam ve kendi iç ısınması (örn. -40°C ile +125°C arası).`,
      },
      {
        title: "2. Köşelerin Rolü: SS (Slow-Slow) Kurulum ve FF (Fast-Fast) Tutma Kritikliği",
        content: `Farklı fiziksel fenomenler farklı köşelerde (corners) kritik hale gelir:

| Köşe (Corner) | Parametreler (P, V, T) | Transistör Hızı | Kritik Zamanlama Kontrolü | Neden? |
| :--- | :--- | :--- | :--- | :--- |
| **SS (Slow-Slow)** | Slow silikon, En düşük voltaj ($V_{min}$), En yüksek sıcaklık ($T_{max}$) | En Yavaş (Slowest) | **Kurulum (Setup / Max Delay)** | Veri yolları azami gecikmeye uğrar; saat periyoduna yetişememe riski doğar. |
| **FF (Fast-Fast)** | Fast silikon, En yüksek voltaj ($V_{max}$), En düşük sıcaklık ($T_{min}$) | En Hızlı (Fastest) | **Tutma (Hold / Min Delay)** | Veri çok erken varır; bir sonraki saat kenarından önce eski veriyi silme riski doğar. |
| **TT (Typical-Typical)** | Nominal silikon, Nominal voltaj ($1.8V$), Oda sıcaklığı ($25^\\circ C$) | Nominal (Typical) | **Güç ve Alan Doğrulaması** | Tipik çalışma performansı ve güç tüketimini kestirmek için kullanılır. |

**Önemli İstisna (Temperature Inversion):** Derin alt-mikron düğümlerde (28nm altı) yüksek sıcaklıkta gecikmenin azaldığı "ters sıcaklık etkisi" görülebilir. Ancak SkyWater 130nm gibi olgun teknolojilerde standart kural geçerlidir: Sıcaklık arttıkça transistör yavaşlar.`,
      },
      {
        title: "3. OpenSTA Çoklu Köşe Yapılandırması ve Köşe Betiği Tasarımı",
        content: `OpenSTA'da her köşe için ayrı bir analiz oturumu tanımlanabilir veya Tcl betiği içinde döngü oluşturulabilir:

\`\`\`tcl
# multi_corner_sta.tcl
set NETLIST "outputs/mac_unit_synth.v"
set SDC     "constraints/mac_unit.sdc"

# 1. SETUP ANALİZİ (SS KÖŞESİ)
puts "=================== SS KÖŞESİ (SETUP ANALİZİ) ==================="
read_liberty /pdk/sky130A/libs.ref/sky130_fd_sc_hd/lib/sky130_fd_sc_hd__ss_100C_1v60.lib
read_verilog $NETLIST
link_design mac_unit
read_sdc $SDC
report_checks -path_delay max -fields {slew cap input nets fanout} > reports/timing_ss_setup.rpt

# Belleği temizle ve yeni köşeyi yükle
clear
read_liberty /pdk/sky130A/libs.ref/sky130_fd_sc_hd/lib/sky130_fd_sc_hd__ff_n40C_1v95.lib
read_verilog $NETLIST
link_design mac_unit
read_sdc $SDC
report_checks -path_delay min -fields {slew cap input nets fanout} > reports/timing_ff_hold.rpt
\`\`\``,
      },
      {
        title: "4. Çip İçi Değişimler (On-Chip Variation - OCV) ve Derating Faktörleri",
        content: `Aynı çip üzerindeki transistörler bile metal kalınlığı gradyanları ve yerel sıcaklık noktaları (**hotspots**) sebebiyle tam olarak aynı hızda çalışmaz. Buna **Çip İçi Değişim (On-Chip Variation - OCV)** denir.

STA motorunda OCV karamsarlığını modellemek için **Timing Derating** kullanılır:
* Başlatıcı yoldaki (launch path) kapılar %5-10 yavaşlatılırken,
* Yakalayıcı saat yolundaki (capture path) kapılar %5-10 hızlandırılır.

SDC Komutu:
\`\`\`tcl
# Kurulum analizi için derate faktörleri:
set_timing_derate -early 0.95  ;# Yakalama yolu hızlandırılır
set_timing_derate -late  1.05  ;# Başlatma yolu yavaşlatılır
\`\`\`

Bu marjinleme, en kötü çip içi uyumsuzlukta dahi devrenin hatasız çalışmasını garanti eder.`,
      },
      {
        title: "5. Karşılaştırmalı Köşe Raporlama ve Köşe Karşılaştırma Tabloları",
        content: `Sentez ve STA sonrası elde edilen çoklu köşe sonuçları mühendislik tablosuna dökülür:

\`\`\`text
+-----------------------+-------------------+-------------------+-------------------+
| Metrik                | SS (100C, 1.60V)  | TT (25C, 1.80V)   | FF (-40C, 1.95V)  |
+-----------------------+-------------------+-------------------+-------------------+
| Max Clock Freq        | 125 MHz           | 166 MHz           | 210 MHz           |
| Worst Setup Slack     | +0.12 ns (MET)    | +1.84 ns (MET)    | +3.20 ns (MET)    |
| Worst Hold Slack      | +0.45 ns (MET)    | +0.18 ns (MET)    | +0.02 ns (MET)    |
| Dinamik Güç           | 18.2 mW           | 24.5 mW           | 31.8 mW           |
| Kaçak Güç (Leakage)   | 4.1 uW            | 1.2 uW            | 0.3 uW            |
+-----------------------+-------------------+-------------------+-------------------+
\`\`\`

Bu tablo, çipin her türlü zorlu ortam koşulunda güvenle çalışacağını ispatlar.`,
      },
      {
        title: "6. Üretim Öncesi Onay (Sign-Off) Kontrol Listesi ve En İyi Pratikler",
        content: `Tasarımın dökümhaneye gönderilmeden (**Tapeout / Sign-off**) önce geçmesi gereken çoklu köşe kontrol listesi:

1. [ ] **SS Köşesinde Setup Kapanımı:** Tüm yollarda $WNS_{setup} \\ge 0$ ve $TNS_{setup} = 0$.
2. [ ] **FF Köşesinde Hold Kapanımı:** Tüm yollarda $WNS_{hold} \\ge 0$ ve $TNS_{hold} = 0$.
3. [ ] **Maksimum Geçiş (Max Transition) Kontrolü:** Hiçbir pinde kütüphane sınırlarını aşan slew ihlali olmamalı.
4. [ ] **Maksimum Kapasitans (Max Capacitance) Kontrolü:** Çıkış pinleri aşırı yüklenmemeli.
5. [ ] **Asenkron Saat Geçişleri:** Tüm CDC yolları \`set_clock_groups\` ile doğru kısıtlanmalı.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Çoklu Köşe (Multi-Corner / PVT) Zamanlama Analizi** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "multi-corner-analysis.v - Örnek RTL / Sentez Kodu",
          snippet: `# Define operating conditions for each corner define_corners ss tt ff # Associate Liberty files with corners read_liberty -corner ss lib/stdcells_ss_1p62v_125c.lib read_liberty -corner tt lib/stdcells_tt_1p80v_25c.lib read_liberty -corner ff lib/stdcells_ff_1p98v_n40c.lib`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Çoklu Köşe (Multi-Corner / PVT) Zamanlama Analizi",
      initialCode: `# Define operating conditions for each corner define_corners ss tt ff # Associate Liberty files with corners read_liberty -corner ss lib/stdcells_ss_1p62v_125c.lib read_liberty -corner tt lib/stdcells_tt_1p80v_25c.lib read_liberty -corner ff lib/stdcells_ff_1p98v_n40c.lib`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "ASIC tasarımında Statik Zamanlama Analizi (STA) yapılırken Kurulum (Setup) ve Tutma (Hold) kontrolleri neden farklı PVT köşelerinde doğrulanmalıdır?",
      options: ["Çünkü en uzun gecikme (setup riski) en yavaş köşe olan SS'te gerçekleşirken, en kısa gecikme (hold riski) transistörlerin en hızlı aktığı FF köşesinde ortaya çıkar.", "Çünkü FF köşesinde devreye saat sinyali verilemez.", "Çünkü SS köşesinde kaçak güç tüketimi her zaman sıfırdır.", "Dökümhaneler birden fazla köşe kontrolünü sadece dosya boyutunu artırmak için zorunlu tutar."],
      correctIndex: 0,
      explanation: "Kurulum (setup) analizi en uzun yol gecikmesini kontrol eder ve bu en kötü voltaj/sıcaklık koşulu olan SS (Slow-Slow) köşesinde test edilmelidir. Tutma (hold) analizi ise verinin çok hızlı ulaşıp eski veriyi bozmasını denetler ve transistörlerin en hızlı çalıştığı FF (Fast-Fast) köşesinde test edilmelidir.",
    },
  },
  "timing-closure-techniques": {
    id: "timing-closure-techniques",
    badge: "Modül 7 • OpenSTA ile Statik Zamanlama Analizi (STA)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Zamanlama Kapanımı (Timing Closure) Teknikleri ve Optimizasyon",
    subtitle: "Kritik yol tespiti, tampon ekleme (buffering), hücre boyutlandırma (gate sizing), retiming ve boru hattı (pipelining) stratejileri.",
    sections: [
      {
        title: "1. Zamanlama Kapanımı (Timing Closure) Nedir ve İhlal Önceliklendirme",
        content: `**Zamanlama Kapanımı (Timing Closure)**, bir çip tasarımının hedeflenen saat frekansında hem kurulum (setup) hem de tutma (hold) zamanlama sınırlarını tüm PVT köşelerinde sıfır ihlalle ($WNS \\ge 0$) karşılaması için yürütülen optimizasyon sürecidir.

İlk sentez veya yerleşim koşusunda genellikle ihlaller ortaya çıkar. Başarılı bir kapanım için ihlaller önceliklendirilir:
1. **Büyük WNS İhlalleri ($WNS < -1.0	ext{ ns}$):** Yerel kapı değişimleriyle çözülemez; RTL mimarisi değişikliği veya boru hattı (pipelining) gerektirir.
2. **Orta Düzey İhlaller ($-1.0	ext{ ns} < WNS < -0.2	ext{ ns}$):** Mantık ağacı sadeleştirme, yeniden zamanlama (retiming) veya hücre boyutlandırma ile çözülür.
3. **Küçük İhlaller ($WNS > -0.2	ext{ ns}$):** Tampon ekleme (buffer insertion) ve yerel sürücü optimizasyonu ile kapanır.`,
      },
      {
        title: "2. Tampon Ekleme (Buffer Insertion) ve Yük/Geçiş Süresi Dengeleme",
        content: `Yüksek fanout'a (çok sayıda kapıyı süren bir çıkış pini) veya uzun metal hatlara sahip sinyallerde çıkış yük kapasitansı devasa boyutlara ulaşır ($C_{load} = \\sum C_{in} + C_{wire}$). Bu durum yayılım gecikmesini ve geçiş süresini (slew) aşırı uzatır.

* **Tampon Ekleme Çözümü:**
  Araya eklenen tamponlar (buffers) hattı elektriksel olarak izole eder. Her tampon yalnızca küçük bir yük sürer ve sinyal kenarlarını dikleştirir.

\`\`\`
Önce:  Sürücü ──────────────────────────────────────────> 20 Alıcı Kapı (Aşırı Gecikme!)

Sonra: Sürücü ───> [Tampon] ──┬──> [Tampon A] ──> 10 Kapı
                              └──> [Tampon B] ──> 10 Kapı
\`\`\`

Tamponun kendi yayılım gecikmesi ($t_{buf}$), sağladığı geçiş hızı kazancının yanında çok küçük kalır.`,
      },
      {
        title: "3. Hücre Boyutlandırma (Gate Sizing): Gecikme, Alan ve Güç Dengelemesi",
        content: `Hücre boyutlandırma (Gate Sizing), devrenin mantıksal işlevini değiştirmeden kütüphanedeki sürücü gücü alternatiflerini değiştirme işlemidir:

* **Boyut Büyütme (Upsizing: \`X1\` -> \`X4\`):**
  Kritik kurulum yollarında kullanılır. Transistör akımı arttığından çıkış kapasitansını daha hızlı şarj eder ve gecikmeyi düşürür. *Dezavantaj:* Alan ve güç tüketimi artar.
* **Boyut Küçültme (Downsizing: \`X4\` -> \`X1\`):**
  Zamanlama marjı yüksek (slack pozitif) kritik olmayan yollarda alanı ve dinamik gücü geri kazanmak (**area/power recovery**) için yapılır.
* **Tutma İhlali İçin Boyutlandırma:**
  Tutma ihlali olan yollara kasıtlı olarak küçük sürücülü veya gecikme hücreleri (\`clkbuf_dly\`) yerleştirilerek veri geciktirilir.`,
      },
      {
        title: "4. Yeniden Zamanlama (Retiming) ile Ardışıl Mantık Dengeleme",
        content: `**Yeniden Zamanlama (Retiming)**, kombinasyonel mantık bloklarının ortasındaki veya çevresindeki flip-flopların yerini fonksiyonel eşdeğerliği bozmadan mantık kapılarının önüne veya arkasına kaydırma işlemidir.

\`\`\`
Önce:   [FF1] ───> [10 Kademeli Ağır Mantık] ───> [FF2] ───> [2 Kademeli Hafif Mantık] ───> [FF3]
                   (Gecikme: 8 ns - İHLAL!)                   (Gecikme: 1.5 ns)

Sonra:  [FF1] ───> [6 Kademeli Mantık] ───> [FF2] ───> [6 Kademeli Mantık] ───> [FF3]
                   (Gecikme: 4.8 ns - MET!)                   (Gecikme: 4.7 ns - MET!)
\`\`\`

Yosys içerisinde retiming \`opt_clean\` ve ardışıl optimizasyon geçişleriyle uygulanabilir. Bu teknik ek donanım eklemeden saat frekansını %30'a varan oranda artırabilir.`,
      },
      {
        title: "5. Mimari Düzeltmeler: Boru Hattı (Pipelining) ile Kritik Yolu Bölme",
        content: `Eğer bir kombinasyonel mantık bloğu (örneğin 64-bit çarpıcı veya derin bir ALU) tek saat çevriminde hedeflenen frekansa yetişemiyorsa, en radikal ve etkili mühendislik çözümü **Boru Hattı (Pipelining)** eklemektir.

* **RTL Düzeyinde Pipelining:**
  Kritik yol arasına ara yazmaç kademeleri eklenir.
  \`\`\`verilog
  // 1 Çevrimlik Yavaş Çarpıcı:
  assign product = a * b; // 15 ns gecikme -> max 66 MHz

  // 2 Kademeli Boru Hattı:
  always @(posedge clk) begin
      stage1_reg <= a_high * b_low;
      stage2_reg <= a_low * b_high;
      product_reg <= stage1_reg + stage2_reg;
  end // Her kademe 7.5 ns -> 133 MHz!
  \`\`\`
Boru hattı gecikmeyi (latency - çevrim sayısını) artırsa da, veri akış hızını (throughput) ve maksimum çalışma frekansını katlar.`,
      },
      {
        title: "6. İteratif Kapanım Döngüsü ve Kısıt İyileştirme (Constraint Refinement)",
        content: `Zamanlama kapanımı tek seferlik bir işlem değil, iteratif bir döngüdür:

\`\`\`
[STA Raporu] ──> [İhlal Teşhisi] ──> [Fix Uygula (Sizing/Buffer/RTL)] ──> [Yeniden STA]
     ▲                                                                           │
     └──────────────────────── (Slack < 0 ise devam et) ─────────────────────────┘
\`\`\`

Ayrıca SDC kısıtları gözden geçirilmelidir:
* Yanlışlıkla gerçekçi olmayan I/O gecikmeleri girilmiş mi?
* Asenkron reset ve CDC yollarına \`false_path\` tanımlanmış mı?
* Multicycle path uygulanabilecek yavaş sinyaller tek çevrimde mi zorlanıyor?`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Zamanlama Kapanımı (Timing Closure) Teknikleri ve Optimizasyon** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "timing-closure-techniques.v - Örnek RTL / Sentez Kodu",
          snippet: `# Top 20 setup violations (or worst passing paths) report_checks -path_delay max -path_count 20 -slack_max 0.5 # Sort by slack (most critical first) report_checks -path_delay max -group_count 5`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Zamanlama Kapanımı (Timing Closure) Teknikleri ve Optimizasyon",
      initialCode: `# Top 20 setup violations (or worst passing paths) report_checks -path_delay max -path_count 20 -slack_max 0.5 # Sort by slack (most critical first) report_checks -path_delay max -group_count 5`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Ağır bir kombinasyonel mantık yolunda oluşan ve hücre boyutlandırma ile çözülemeyecek kadar büyük bir Kurulum (Setup) ihlalini gidermek için uygulanabilecek en etkili mimari yöntem hangisidir?",
      options: ["Boru hattı (Pipelining) uygulayarak uzun mantık yolunu araya flip-floplar koyup birden fazla saat çevrimine bölmek", "Tüm flip-flopları seviye duyarlı mandallarla (latches) değiştirmek", "Yol üzerindeki tüm tamponları silip kabloları inceltmek", "Çalışma voltajını düşürerek devreyi yavaşlatmak"],
      correctIndex: 0,
      explanation: "Büyük negatif slack ihlallerinde hücre boyutlandırma veya tampon ekleme yetersiz kalır. En etkili mimari çözüm, kritik yolu araya flip-flop yazmaç kademeleri ekleyerek (pipelining) parçalara ayırmak ve her parçanın gecikmesini saat periyodunun altına indirmektir.",
    },
  },
  "design-for-testability": {
    id: "design-for-testability",
    badge: "Modül 8 • İleri Konular: DFT, CDC ve Düşük Güç",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Test Edilebilirlik Tasarımı (DFT - Design for Testability)",
    subtitle: "Taramalı flip-floplar (Scan FFs), tarama zinciri (Scan Chain) mimarisi, ATPG ve hata modelleri (Stuck-at, At-speed).",
    sections: [
      {
        title: "1. Test Edilebilirlik Tasarımı (DFT) Nedir ve Üretim Testindeki Rolü",
        content: `Bir çip fabrikadan çıktığında içindeki milyarlarca transistörün kusursuz üretilip üretilmediğini anlamak imkansız derecede zordur. Çipin dışarıya açılan yalnızca birkaç yüz pini varken, iç kısımdaki derin flip-flopların durumunu doğrudan gözlemlemek veya onları istenen duruma getirmek dışarıdan neredeyse imkansızdır.

**Test Edilebilirlik Tasarımı (DFT - Design for Testability)**, üretilen entegre devredeki fabrikasyon hatalarını (kısa devreler, kopuk hatlar, hatalı transistörler) tespit edebilmek için tasarıma eklenen özel donanımsal test yapılarıdır.

DFT iki temel kavramı maksimize etmeyi amaçlar:
1. **Kontrol Edilebilirlik (Controllability):** Dahili bir mantık düğümüne dış pinlerden istenen '0' veya '1' değerini sürebilme kolaylığı.
2. **Gözlemlenebilirlik (Observability):** Dahili bir mantık düğümündeki değeri dış pinlerden okuyabilme kolaylığı.`,
      },
      {
        title: "2. Tarama Zinciri (Scan Chain) Mimarisi ve Taramalı Flip-Flop (Scan FF) Yapısı",
        content: `Modern DFT'nin temeli **Tarama Tabanlı Tasarımdır (Scan-Based Design)**. Sentez aşamasında devredeki standart flip-floplar **Taramalı Flip-Flop (Scan Flip-Flop)** hücreleriyle değiştirilir:

\`\`\`
        Normal Veri (D) ───┐ 0
                           ├─── [DFF] ─── Q (Normal Çıkış / Scan Out)
     Tarama Girişi (SI) ───┘ 1
                             ▲
      Tarama Yetki (SE) ─────┘
\`\`\`

* **İki Çalışma Modu:**
  * **Normal Mod ($SE = 0$):** Flip-flop $D$ girişinden normal fonksiyonel veriyi alır.
  * **Tarama Modu ($SE = 1$):** Flip-flop $SI$ (Scan In) girişinden test verisini alır.

Devredeki tüm flip-floplar $SO ightarrow SI$ şeklinde birbirine seri bağlanarak devasa bir kaydırma yazmacı (**Scan Chain**) oluşturur.`,
      },
      {
        title: "3. Tarama Testi Adımları: Shift (Öteleme) ve Capture (Yakalama) Fazları",
        content: `Fabrika test cihazı (ATE - Automated Test Equipment) çipi test ederken şu adımları işletir:

1. **Yükleme (Scan-In / Shift Fazı - $SE = 1$):**
   Test deseni (vektörü) saat darbeleriyle adım adım tarama zincirine kaydırılır. Her flip-flop istenen başlangıç değerine ($0$ veya $1$) kurulur.
2. **Uygulama ve Yakalama (Capture Fazı - $SE = 0$):**
   Tek bir saat darbesi verilir. Kombinasyonel mantık bu veriyi işler ve sonuçlar hedef flip-floplar tarafından yakalanır.
3. **Boşaltma (Scan-Out / Shift Fazı - $SE = 1$):**
   Bir sonraki test vektörü içeri kaydırılırken, bir önceki testin sonuçları eş zamanlı olarak dışarı kaydırılır ve ATE tarafından beklenen değerle karşılaştırılır.`,
      },
      {
        title: "4. Otomatik Test Deseni Üretimi (ATPG) ve Hata Modelleri (Stuck-at, Transition)",
        content: `Test modellerini mühendisler elle yazmaz; **ATPG (Automatic Test Pattern Generation)** yazılımları (örneğin açık kaynak Atalanta veya ticari Synopsys TetraMAX / Siemens Tessent) bu desenleri otomatik üretir.

Temel Hata Modelleri:
* **Sabit Kalma Hatası (Stuck-at Fault Model):**
  Bir sinyal hattının üretim kusuru sebebiyle kalıcı olarak mantık-0'a (Stuck-at-0 / SA0) veya mantık-1'e (Stuck-at-1 / SA1) kısa devre olduğunu varsayar.
* **Geçiş Hatası (Transition / At-speed Fault):**
  Kapının mantıksal olarak çalıştığı ancak geçişinin hedeflenen frekanstan daha yavaş olduğu gecikme hatalarını yakalar.`,
      },
      {
        title: "5. DFT İçin Tasarım Kuralları: Saat ve Sıfırlama Hatlarının Kontrol Edilebilirliği",
        content: `Sentez ve DFT ekleme aşamasında bir tasarımın taranabilir (scan-ready) olması için katı kurallar vardır:

1. **Dahili Saat Üretimi Yasağı:** Flip-flop saat pinleri doğrudan çip dışından gelen bir test saatine bağlanabilmelidir (test modunda saat MUX ile dış pine verilir).
2. **Asenkron Sıfırlama Kontrolü:** Test sırasında asenkron reset pinleri harici olarak devre dışı bırakılabilmelidir; aksi halde kaydırma sırasında flip-floplar rastgele sıfırlanır.
3. **Mandal (Latch) Kullanımından Kaçınma:** Mandallar tarama zincirine doğrudan bağlanamaz; test edilebilirliği zorlaştırır.`,
      },
      {
        title: "6. Test Kapsamı (Fault Coverage) Artırma ve Bellek BIST (MBIST) Mimarisi",
        content: `* **Hata Kapsamı (Fault Coverage):**
  $$	ext{Fault Coverage} = rac{	ext{Tespit Edilen Hata Sayısı}}{	ext{Toplam Olası Hata Sayısı}} 	imes 100$$
  Otomotiv ve havacılık standartlarında (ISO 26262) bu oran **%99.5** üzerinde olmalıdır.
* **MBIST (Memory Built-In Self-Test):**
  SRAM ve ROM bellek blokları milyarlarca transistör içerir ve standart tarama zincirleriyle test edilemez. Belleklerin yanına donanımsal bir test kontrolcüsü (MBIST) eklenir. MBIST kendi içinde Mart algoritmaları (March test) çalıştırarak belleğin sağlamlığını doğrular.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Test Edilebilirlik Tasarımı (DFT - Design for Testability)** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "design-for-testability.v - Örnek RTL / Sentez Kodu",
          snippet: `Standard Flip-Flop: D → [FF] → Q Scan Flip-Flop: D ----\\ MUX → [FF] → Q SI ---/ ↑ SE (Scan Enable)`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Test Edilebilirlik Tasarımı (DFT - Design for Testability)",
      initialCode: `Standard Flip-Flop: D → [FF] → Q Scan Flip-Flop: D ----\\ MUX → [FF] → Q SI ---/ ↑ SE (Scan Enable)`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "DFT (Design for Testability) mimarisinde standart flip-floplar yerine Scan Flip-Flop kullanılarak oluşturulan 'Tarama Zinciri' (Scan Chain) hangi temel amaca hizmet eder?",
      options: ["Dahili flip-flopları seri bir kaydırma yazmacına dönüştürerek çipin iç mantık düğümlerinin dış test cihazından kontrol edilebilirliğini ve gözlemlenebilirliğini sağlamak", "Çipin çalışma saat frekansını iki katına çıkarmak", "Statik kaçak akımı sıfıra indirmek", "Verilog kodunu otomatik olarak VHDL'e dönüştürmek"],
      correctIndex: 0,
      explanation: "Tarama zinciri (Scan Chain), binlerce dahili flip-flopu test modunda tek bir devasa kaydırma yazmacı gibi birbirine bağlar. Bu sayede test cihazı içeriye keyfi test vektörleri yükleyebilir (controllability) ve kombinasyonel mantığın sonuçlarını dışarı okuyabilir (observability).",
    },
  },
  "clock-domain-crossing": {
    id: "clock-domain-crossing",
    badge: "Modül 8 • İleri Konular: DFT, CDC ve Düşük Güç",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Saat Etki Alanı Geçişi (CDC - Clock Domain Crossing)",
    subtitle: "Kararsızlık (Metastability) fiziği, MTBF hesabı, 2-FF senkronizörler, Gray kodlu sayaçlar, el sıkışma ve asenkron FIFO.",
    sections: [
      {
        title: "1. Farklı Saat Alanları ve Saat Etki Alanı Geçişi (CDC) Problemi",
        content: `Modern SoC (System-on-Chip) tasarımlarında tek bir global saat bulunmaz. Örneğin bir çipte işlemci çekirdeği 500 MHz, DDR bellek kontrolcüsü 200 MHz, PCIe 100 MHz ve UART 115.2 kHz frekansında birbirinden bağımsız asenkron saatlerle çalışır.

Bir saat alanından (\`clk_a\`) çıkan bir sinyalin başka bir saat alanındaki (\`clk_b\`) flip-flop tarafından doğrudan örneklenmesine **Saat Etki Alanı Geçişi (CDC - Clock Domain Crossing)** denir.

İki saat birbirine göre asenkron olduğundan, gelen verinin yakalama saatinin kurulum ($T_{setup}$) veya tutma ($T_{hold}$) penceresine denk gelmesi kaçınılmazdır. Bu durum **zamanlama ihlaline** ve **kararsızlığa (metastability)** yol açar.`,
      },
      {
        title: "2. Kararsızlık (Metastability) Fiziği ve Hata Ortalaması Süresi (MTBF)",
        content: `**Kararsızlık (Metastability):** Bir flip-flopun giriş verisi saat kenarı anında değişirse, transistörler ne tam doyuma (1) ne de tam kesime (0) gidebilir; çıkış $V_{DD}/2$ civarında kararsız bir ara voltaj seviyesinde asılı kalır.

\`\`\`
Saat (CLK):     ───────────┐
                           │
Girdi (D):      ───────XXXXXXXXXXXXXXX─── (Setup/Hold İhlali!)
                           │
Çıkış (Q):      ───────────░░░░░░░░░─────┐  (Kararsız bölge!)
                                         └───── 0 veya 1
\`\`\`

Kararsızlığın ne kadar sürede çözüleceği istatistikseldir. Sistemin güvenilirliği **MTBF (Mean Time Between Failures - Hatalar Arası Ortalama Süre)** ile ölçülür:
$$	ext{MTBF} = rac{e^{s / 	au}}{T_w \\cdot f_{clk} \\cdot f_{data}}$$

Burada:
* $s$: Çözülme için tanınan zaman marjı
* $	au$: Flip-flopun teknolojiye bağlı geri besleme zaman sabiti
* $f_{clk}$ ve $f_{data}$: Saat ve veri frekansları
* $T_w$: Kararsızlık penceresi süresi.`,
      },
      {
        title: "3. Tek Bitlik Sinyal Senkronizasyonu: İki-Aşamalı Flip-Flop (2-FF) Senkronizör",
        content: `Tek bitlik yavaş kontrol sinyalleri için standart endüstri çözümü **2-FF Senkronizördür (Two-Flip-Flop Synchronizer)**:

\`\`\`verilog
module sync_2ff (
    input  wire clk_dst,
    input  wire async_in,
    output wire sync_out
);
    (* async_reg = "true" *) reg q1, q2;

    always @(posedge clk_dst) begin
        q1 <= async_in; // 1. FF: Kararsızlığa düşebilir
        q2 <= q1;       // 2. FF: 1 tam periyot sonra kararlı değeri yakalar
    end

    assign sync_out = q2;
endmodule
\`\`\`

* İlk flip-flop kararsızlığa düşse dahi, bir sonraki saat kenarına kadar ($1 	imes T_{clk\\_dst}$) gerilim kararlı 0 veya 1 seviyesine oturur.
* İkinci flip-flop kararlı çıkışı sisteme güvenle iletir. MTBF değeri günlerden binlerce yıla çıkar!`,
      },
      {
        title: "4. Çok Bitlik Veri Geçişleri: Gray Kodu, Bus Senkronizasyonu ve Sinyal Çözülmesi",
        content: `**ÖLÜMCÜL HATA: Çok Bitlik Veriyolunu Çoklu 2-FF ile Senkronize Etmek!**
Bir veri yolu (örneğin 4-bit \`data[3:0]\`) paralel 2-FF senkronizörlerden geçirilirse, hatlardaki minik gecikme farkları nedeniyle bazı bitler 1 çevrim önce, bazıları 1 çevrim sonra yakalanır:
$$0011 ightarrow 0100 	ext{ geçişinde ara durumlar: } 0000 	ext{ veya } 0111 	ext{ (ÇÖP VERİ!)}$$

* **Gray Kodu Çözümü:**
  Sayaç veya işaretçi (pointer) geçişlerinde **Gray Kodu** kullanılır. Gray kodunda ardışık iki sayı arasında **sadece ve sadece 1 bit** değişir:
  $$00 ightarrow 01 ightarrow 11 ightarrow 10$$
  Tek bir bit değiştiği için hiçbir zaman ara yanlış durum oluşamaz.`,
      },
      {
        title: "5. Protokol Seviyesinde CDC: El Sıkışma (Handshake) ve Asenkron FIFO Mimarisi",
        content: `Çok bitlik genel verilerin (örneğin 32-bit veya 64-bit veri paketleri) asenkron geçişi için iki temel yapı kullanılır:

1. **Dört Aşamalı El Sıkışma (4-Phase Handshake):**
   * Verici taraf veriyi oturtur ve \`req\` (istek) sinyali üretir.
   * Alıcı taraf 2-FF senkronizör ile \`req\` sinyalini yakalar, veriyi okur ve \`ack\` (onay) sinyali döner.
   * Düşük veri hızı (throughput), ancak minimum donanım alanı gerektirir.
2. **Asenkron FIFO (Dual-Clock FIFO):**
   * Yazma saati (\`wclk\`) ve okuma saati (\`rclk\`) birbirinden bağımsızdır.
   * Yazma ve okuma işaretçileri (pointers) Gray koduna dönüştürülerek 2-FF senkronizörlerle karşı alana aktarılır.
   * Yüksek bant genişliği ve sürekli veri akışı sunar.`,
      },
      {
        title: "6. Statik CDC Analizi, SDC Kısıtları (`set_clock_groups -asynchronous`) ve Doğrulama",
        content: `CDC yolları standart STA araçlarının normal zamanlama analizi yapmaması gereken yollardır. Bu nedenle SDC dosyasında doğru kısıtlanmalıdır:

\`\`\`tcl
# clk_core ve clk_pci arasındaki yolları asenkron ilan et:
set_clock_groups -asynchronous     -group [get_clocks clk_core]     -group [get_clocks clk_pci]
\`\`\`

**Uyarı:** \`set_clock_groups -asynchronous\` kullanıldığında STA bu yolları kontrol etmeyi bırakır; ancak bu yolların donanımsal olarak senkronizör içerip içermediğini STA doğrulayamaz! Bunun için **Statik CDC Doğrulama Araçları** (örneğin Questa CDC, SpyGlass CDC veya açık kaynak Verilator CDC kontrolleri) kullanılarak tasarımdaki tüm saat geçişleri formel olarak taranmalıdır.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Saat Etki Alanı Geçişi (CDC - Clock Domain Crossing)** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "clock-domain-crossing.v - Örnek RTL / Sentez Kodu",
          snippet: `Valid Operation: Data: ___/‾‾‾‾‾‾‾‾‾‾‾ Setup | Hold Clk: _____|‾‾‾|_____ ↑ Clean capture Metastable Condition: Data: _____/‾‾‾‾‾‾‾‾ Clk: _____|‾‾‾|_____ ↑ Data changes during setup/hold window`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Saat Etki Alanı Geçişi (CDC - Clock Domain Crossing)",
      initialCode: `Valid Operation: Data: ___/‾‾‾‾‾‾‾‾‾‾‾ Setup | Hold Clk: _____|‾‾‾|_____ ↑ Clean capture Metastable Condition: Data: _____/‾‾‾‾‾‾‾‾ Clk: _____|‾‾‾|_____ ↑ Data changes during setup/hold window`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Farklı frekanslarda çalışan iki bağımsız asenkron saat alanı arasında çok bitlik bir veri yolunu (multi-bit bus) doğrudan paralel 2-FF senkronizörler kullanarak geçirmenin sakıncası nedir?",
      options: ["Bit hatlarındaki ufak gecikme farkları nedeniyle bazı bitlerin bir çevrim önce, bazılarının sonra örneklenmesi sonucunda hedefte tutarsız ve anlamsız ara verilerin (garbage data) yakalanması", "Çipin çalışma sıcaklığını aniden düşürmesi", "Flip-flopların otomatik olarak mantık kapılarına dönüşmesi", "Verilog simülatörünün çökmesi"],
      correctIndex: 0,
      explanation: "Çok bitlik bir veriyolunda bitler paralel senkronizörlerden geçirildiğinde, hat gecikmeleri ve kararsızlık çözülme sürelerindeki minik farklar nedeniyle bazı bitler bir çevrim erken, bazıları geç örneklenir. Bu durum hedef tarafta geçici olarak tamamen hatalı ve tutarsız ara verilerin okunmasına yol açar (data coherency kaybı).",
    },
  },
  "low-power-techniques": {
    id: "low-power-techniques",
    badge: "Modül 8 • İleri Konular: DFT, CDC ve Düşük Güç",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Düşük Güç Tüketimi Teknikleri (Low-Power ASIC Design)",
    subtitle: "Dinamik ve kaçak güç analizi, saat kapılama (Clock Gating / ICG), güç kapılama (Power Gating), Multi-Vt ve UPF.",
    sections: [
      {
        title: "1. Düşük Güç Tasarımının Temelleri: Dinamik Güç ve Kaçak (Leakage) Akımlar",
        content: `Mobil cihazlardan yapay zeka hızlandırıcılarına ve veri merkezlerine kadar modern çiplerin en büyük darboğazı güç tüketimi ve ısınmadır. Bir CMOS entegre devrede güç iki ana bileşenden oluşur:

$$P_{total} = P_{dynamic} + P_{static}$$

1. **Dinamik Güç ($P_{dynamic}$):**
   * **Kapasitif Anahtarlama Gücü:** Düğüm kapasitanslarının şarj ve deşarj olması sırasında harcanan güç:
     $$P_{switch} = lpha \\cdot C_L \\cdot V_{DD}^2 \\cdot f$$
     ($lpha$: Anahtarlama etkinlik faktörü, $C_L$: Toplam yük kapasitansı, $V_{DD}$: Besleme voltajı, $f$: Saat frekansı).
   * **Kısa Devre Gücü:** Transistörlerin açılıp kapanma anında pMOS ve nMOS kanallarının aynı anda çok kısa süre iletime geçmesiyle oluşan akım.
2. **Statik Güç (Kaçak Akım - $P_{static}$):**
   * Transistörler anahtarlama yapmadığında, alt-eşik (sub-threshold) sızıntısı ve kapı oksit tünellemesiyle toprağa akan sızıntı akımı:
     $$P_{static} = I_{leakage} \\cdot V_{DD}$$`,
      },
      {
        title: "2. Saat Kapılama (Clock Gating): Mandala Dayalı Entegre ICG Hücreleri",
        content: `Bir çipte toplam dinamik gücün %30 ila %50'si saat ağacında (clock tree) ve flip-flopların saat girişlerinde harcanır. Flip-flop verisi değişmese dahi saat sinyali sürekli anahtarlama yapar.

**Saat Kapılama (Clock Gating):** Bir yazmaç öbeği yeni veri almıyorsa, ona giden saat sinyalini durdurmaktır.

* **Neden Basit AND Kapısı Kullanılamaz?**
  Bir saat hattını doğrudan basit bir AND kapısı ile yetkilendirme sinyaline bağlarsanız, sinyaldeki gürültü ve gecikmeler saat hattında ölümcül iğneciklere (**glitch**) neden olur.
* **Entegre Saat Kapılama Hücresi (ICG - Integrated Clock Gating):**
  İçerisinde seviye duyarlı bir mandal (latch) ve bir AND kapısı barındıran özel standart hücrelerdir:
  \`\`\`
               ┌──────────┐
  Enable ─────>│ Latch    ├─────┐
               │ (aktif 0)│     │     ┌──────┐
               └────┬─────┘     └────>│ AND  ├────> Gated_Clock
  Clock  ───────────┴────────────────>│      │
                                      └──────┘
  \`\`\`
  Bu mandal, etkinleştirme sinyalini saat alçaktayken kilitler ve saat hattının asla glitch üretmemesini garanti eder.`,
      },
      {
        title: "3. Güç Kapılama (Power Gating), Güç Anahtarları ve Durum Koruma (Retention)",
        content: `Çipin belirli bir bloğu (örneğin kullanılmayan bir kamera arayüzü veya DSP çekirdeği) uzun süre uyku modunda kalacaksa, dinamik gücü kesmek yetmez; kaçak akımı da durdurmak için bloğun besleme voltajı tamamen kesilir:

* **Güç Anahtarları (Power Switches - Sleep Transistors):**
  Bloğun $V_{DD}$ hattı ile gerçek güç hattı arasına yüksek dirençli büyük başucu (header) veya ayakucu (footer) transistörleri yerleştirilir.
* **Durum Koruma Flip-Flopları (Retention FFs):**
  Güç kapatıldığında kritik konfigürasyon register'larının sıfırlanmaması için, bu flip-floplar her zaman açık kalan mini bir yedek voltaj hattından beslenen dâhili hafıza hücrelerine sahiptir.
* **İzolasyon Hücreleri (Isolation Cells):**
  Gücü kapatılan bir bloğun çıkışları havada kalır ($floating$). Bu yüzen hatların açık olan aktif bloklara rastgele 0/1 sürmesini engellemek için arayüze izolasyon kapıları yerleştirilir.`,
      },
      {
        title: "4. Çoklu Eşik Gerilimi (Multi-Vt): HVT, SVT ve LVT Hücre Seçim Stratejileri",
        content: `Modern dökümhaneler aynı standart hücreyi farklı transistör eşik gerilimleriyle (**$V_t$**) üretir:

| Hücre Türü | Eşik Gerilimi ($V_t$) | Anahtarlama Hızı | Kaçak Akım ($I_{leak}$) | Tercih Edilen Yer |
| :--- | :--- | :--- | :--- | :--- |
| **LVT (Low-Vt)** | Düşük | Çok Hızlı | Çok Yüksek (10x-50x) | Yalnızca kritik kurulum yollarında ($Slack pprox 0$) |
| **SVT (Standard-Vt)** | Orta | Dengeli | Dengeli | Genel tasarım yollarında |
| **HVT (High-Vt)** | Yüksek | Yavaş | Çok Düşük (Minimum) | Zamanlama marjı bol olan kritik olmayan yollarda |

Sentezleyici başlangıçta tüm tasarımı HVT hücreleriyle sentezler; sadece zamanlama ihlali olan kritik yollardaki hücreleri LVT'ye dönüştürerek kaçak akımı en aza indirir.`,
      },
      {
        title: "5. Liberty Dosyalarında Güç Parametreleri ve Statik Güç Analizi",
        content: `Liberty (\`.lib\`) dosyasında her hücre için hem dahili dinamik enerji hem de statik kaçak akım tanımlanır:

\`\`\`text
cell (sky130_fd_sc_hd__nand2_1) {
    area : 5.43;
    cell_leakage_power : 0.042; /* nW */
    pin (Y) {
        internal_power () {
            power(energy_template) { ... }
        }
    }
}
\`\`\`

OpenSTA veya Yosys, bu verileri kullanarak ve her düğümün anahtarlama aktivite faktörünü ($lpha$) SAIF (Switching Activity Interchange Format) veya VCD simülasyon dalga formundan okuyarak çipin toplam mW tüketimini milimetrik hesaplar.`,
      },
      {
        title: "6. Birleşik Güç Formatı (UPF / IEEE 1801) ve Düşük Güç Sentez Akışı",
        content: `Karmaşık çoklu voltaj alanlarına (multi-voltage domains) sahip çiplerde güç mimarisi RTL kodunun içine gömülmez. Bunun yerine **UPF (Unified Power Format - IEEE 1801)** standardı kullanılır:

\`\`\`tcl
# UPF Güç Alanı Tanımı
create_power_domain PD_TOP
create_power_domain PD_DSP -elements {u_dsp_core}

# Güç Besleme Hatları
create_supply_port VDD
create_supply_port VSS
create_supply_net  VDD_TOP -domain PD_TOP
create_supply_net  VDD_DSP -domain PD_DSP

# İzolasyon ve Seviye Kaydırıcı Stratejisi
set_isolation iso_dsp -domain PD_DSP -isolation_signal pwr_good -clamp_value 0
set_level_shifter ls_dsp -domain PD_DSP -location to
\`\`\`

Sentez araçları UPF dosyasını okuyarak otomatik olarak seviye kaydırıcı (level shifter) ve izolasyon hücrelerini netlist'e bağlar.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Düşük Güç Tüketimi Teknikleri (Low-Power ASIC Design)** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "low-power-techniques.v - Örnek RTL / Sentez Kodu",
          snippet: `P_dynamic = α × C × V² × f Where: - α = activity factor (fraction of time signal toggles) - C = capacitance being switched - V = supply voltage - f = clock frequency`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Düşük Güç Tüketimi Teknikleri (Low-Power ASIC Design)",
      initialCode: `P_dynamic = α × C × V² × f Where: - α = activity factor (fraction of time signal toggles) - C = capacitance being switched - V = supply voltage - f = clock frequency`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Dijital entegre devrelerde saat ağının harcadığı dinamik gücü azaltmak için saat kapılama (Clock Gating) yapılırken basit AND kapıları yerine neden mandal tabanlı Entegre Saat Kapılama (ICG) hücreleri kullanılır?",
      options: ["Yetkilendirme (enable) sinyalindeki gürültü ve yarış durumlarının saat hattında istenmeyen iğneciklere (glitches) yol açmasını önlemek için", "Saat frekansını 10 katına çıkarabilmek için", "Sentez süresini yarıya indirmek için", "RTL kodundaki tüm flip-flopları silmek için"],
      correctIndex: 0,
      explanation: "Basit bir AND kapısı kullanıldığında enable sinyalinin geçiş anındaki parazitik dalgalanmalar saat sinyali üzerine binerek tehlikeli iğnecikler (glitch) oluşturur. ICG hücreleri dahili mandalları sayesinde enable sinyalini sadece saat seviyesi güvenliyken geçirerek glitch oluşumunu engeller.",
    },
  },
  "scalability-and-automation": {
    id: "scalability-and-automation",
    badge: "Modül 8 • İleri Konular: DFT, CDC ve Düşük Güç",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Ölçeklenebilirlik ve Donanım Tasarım Otomasyonu (CI/CD)",
    subtitle: "Makefile yapılandırması, Python tabanlı orkestrasyon, regresyon testleri, sürekli entegrasyon (CI) ve hiyerarşik sentez.",
    sections: [
      {
        title: "1. Donanım Tasarımında Otomasyon İhtiyacı ve 'Kod Olarak Donanım Akışı'",
        content: `Milyonlarca kapı içeren modern bir ASIC tasarımı; simülasyon, lint denetimi, mantık sentezi, statik zamanlama analizi (STA), yerleşim-rota (PnR), DRC ve LVS adımlarından oluşan devasa bir mühendislik zinciridir.

Bu adımları elle çalıştırmak; unutulan bayraklar, güncellenmemiş bağımlılıklar ve insani hatalar sebebiyle milyonlarca dolarlık silikon kayıplarına yol açar. Profesyonel donanım ekipleri bu süreci **Kod Olarak Tasarım Akışı (Flow-as-Code)** felsefesiyle tamamen otomatikleştirir.`,
      },
      {
        title: "2. Donanım Akışları İçin GNU Make Temelleri ve Bağımlılık Yönetimi",
        content: `**GNU Make**, donanım tasarım otomasyonunun en temel ve güvenilir aracıdır. En büyük gücü **artımlı derleme (incremental build)** mekanizmasıdır; yalnızca kaynak dosyası değişen adımları çalıştırır, değişmeyenleri atlar:

\`\`\`makefile
# ASIC Sentez ve STA Makefile
PDK_LIB = /pdk/sky130A/libs.ref/sky130_fd_sc_hd/lib/sky130_fd_sc_hd__tt_025C_1v80.lib
RTL_SRCS = $(wildcard src/*.v)
SYNTH_NETLIST = build/netlist.v
TIMING_RPT = build/timing.rpt

.PHONY: all clean lint timing

all: $(TIMING_RPT)

$(SYNTH_NETLIST): $(RTL_SRCS) synth.ys
	@mkdir -p build
	yosys -s synth.ys -l build/synth.log

$(TIMING_RPT): $(SYNTH_NETLIST) sta.tcl constraints.sdc
	sta -exit sta.tcl > $(TIMING_RPT)
	@grep -q "VIOLATED" $(TIMING_RPT) && echo "ZAMANLAMA IHLALI!" || echo "ZAMANLAMA MET!"

clean:
	rm -rf build/
\`\`\``,
      },
      {
        title: "3. Python ile EDA Araç Orkestrasyonu, Log Ayrıştırma ve Metrik Toplama",
        content: `Karmaşık tasarım taramalarında (örneğin onlarca saat frekansı ve alan kütüphanesi kombinasyonunu test eden parametre taramaları - design space exploration) Python vazgeçilmez bir orkestratördür:

\`\`\`python
import subprocess
import re
import json

def run_synthesis(clock_period_ns):
    # SDC şablonunu güncelle
    with open("constraints.sdc", "w") as f:
        f.write(f"create_clock -period {clock_period_ns} [get_ports clk]
")
    
    # Sentezi çalıştır
    subprocess.run(["yosys", "-s", "synth.ys"], check=True)
    
    # Log dosyasından alan bilgisini ayrıştır
    with open("synth.log") as f:
        log = f.read()
    area = re.search(r"Chip area for module.*:\\s+([\\d\\.]+)", log).group(1)
    return float(area)

results = {period: run_synthesis(period) for period in [5.0, 7.5, 10.0]}
print("PPA Sonuçları:", json.dumps(results, indent=2))
\`\`\``,
      },
      {
        title: "4. Donanım İçin Sürekli Entegrasyon (CI) ve Gece Regresyonları (Nightly Builds)",
        content: `Yazılım geliştirmedeki CI/CD pratikleri modern ASIC dünyasında da geçerlidir (GitHub Actions, GitLab CI):

1. **Commit Öncesi (Pre-commit Lint):**
   Verilator lint denetimi yapılarak sözdizim ve tip uyuşmazlıkları saniyeler içinde yakalanır.
2. **Birleştirme Denetimi (PR Merge Checks):**
   Kısa birim testleri (unit tests) ve hızlı bir Yosys mantık sentezi koşulur.
3. **Gece Regresyonları (Nightly Builds):**
   Her gece tüm sistem üzerinde kapsamlı çoklu köşe STA, Monte Carlo simülasyonları ve formal denklik kontrolleri çalıştırılarak regresyon raporları üretilir.`,
      },
      {
        title: "5. Hiyerarşik ve Artımlı (Incremental) Sentez Metodolojileri",
        content: `Milyonlarca kapılık tasarımlarda tüm çipi tek seferde sentezlemek (**flat synthesis**) hem bellek yetersizliğine yol açar hem de saatler sürer.

* **Hiyerarşik Sentez (Hierarchical Synthesis / Divide & Conquer):**
  Tasarım bağımsız alt modüllere (bloklara) bölünür. Her blok kendi SDC kısıtlarıyla ayrı ayrı sentezlenir ve zamanlama modeli (Liberty veya ILM - Interface Logic Model) çıkarılır.
* **Üst Katman Entegrasyonu:**
  En üst seviyede (top level) alt bloklar birer kara kutu (blackbox) veya zamanlama modeli olarak örneklenir. Böylece sentez süresi saatlerden dakikalara indirilir.`,
      },
      {
        title: "6. Tasarım Veritabanı ve Sürüm Kontrolü İçin En İyi Pratikler",
        content: `EDA araçlarıyla çalışırken Git deposunun temiz ve sürdürülebilir kalması için temel kurallar:

* **Sadece Kaynakları Saklayın:** RTL (\`.v\`, \`.sv\`), betikler (\`.ys\`, \`.tcl\`, \`Makefile\`), kısıtlar (\`.sdc\`) depoda tutulur.
* **Geçici Çıktıları Hariç Tutun (\`.gitignore\`):** Log dosyaları (\`.log\`), ara netlistler, dalga şekilleri (\`.vcd\`), sentez yapıtları depoya eklenmez.
* **Determinizm ve Tohum (Seed) Kilitleme:**
  Fiziksel tasarım araçlarında deterministik yerleşim için rastgele sayı tohumları betiklerde sabitlenmelidir.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Ölçeklenebilirlik ve Donanım Tasarım Otomasyonu (CI/CD)** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "scalability-and-automation.v - Örnek RTL / Sentez Kodu",
          snippet: `# File: Makefile # Design build system # Configuration RTL_DIR = rtl SIM_DIR = sim SYN_DIR = synthesis TB_DIR = testbench DESIGN = processor_core TOP_MODULE = cpu_top # Synthesis target $(SYN_DIR)/$(DESIGN).v: $(RTL_DIR)/*.v @echo "Synthesizing $(DESIGN)..." mkdir -p $(SYN_DIR) dc_shell -f scripts/synthesize.tcl | tee $(SYN_DIR)/synthesis.log @echo "Synthesis complete: $@" # Simulation target .PHONY: sim sim: $(RTL_DIR)/*.v $(TB_DIR)/$(TOP_MODULE)_tb.v @echo "Running simulation..." mkdir -p $(SIM_DIR) vcs -full64 -sverilog \\ $(RTL_DIR)/*.v \\ $(TB_DIR)/$(TOP_MODULE)_tb.v \\ -o $(SIM_DIR)/simv \\ +define+SIM \\ -debug_access+all cd $(SIM_DIR) && ./simv +vcdfile=waveform.vcd @echo "Simulation complete" # Coverage analysis .PHONY: coverage coverage: sim @echo "Generating coverage report..." urg -dir $(SIM_DIR)/simv.vdb -report $(SIM_DIR)/coverage firefox $(SIM_DIR)/coverage/index.html & # Clean targets .PHONY: clean clean: rm -rf $(SIM_DIR)/* $(SYN_DIR)/* @echo "Cleaned build directories" .PHONY: help help: @echo "Available targets:" @echo " make sim - Run RTL simulation" @echo " make coverage - Run simulation with coverage" @echo " make synthesis - Run synthesis" @echo " make clean - Remove generated files"`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Ölçeklenebilirlik ve Donanım Tasarım Otomasyonu (CI/CD)",
      initialCode: `# File: Makefile # Design build system # Configuration RTL_DIR = rtl SIM_DIR = sim SYN_DIR = synthesis TB_DIR = testbench DESIGN = processor_core TOP_MODULE = cpu_top # Synthesis target $(SYN_DIR)/$(DESIGN).v: $(RTL_DIR)/*.v @echo "Synthesizing $(DESIGN)..." mkdir -p $(SYN_DIR) dc_shell -f scripts/synthesize.tcl | tee $(SYN_DIR)/synthesis.log @echo "Synthesis complete: $@" # Simulation target .PHONY: sim sim: $(RTL_DIR)/*.v $(TB_DIR)/$(TOP_MODULE)_tb.v @echo "Running simulation..." mkdir -p $(SIM_DIR) vcs -full64 -sverilog \\ $(RTL_DIR)/*.v \\ $(TB_DIR)/$(TOP_MODULE)_tb.v \\ -o $(SIM_DIR)/simv \\ +define+SIM \\ -debug_access+all cd $(SIM_DIR) && ./simv +vcdfile=waveform.vcd @echo "Simulation complete" # Coverage analysis .PHONY: coverage coverage: sim @echo "Generating coverage report..." urg -dir $(SIM_DIR)/simv.vdb -report $(SIM_DIR)/coverage firefox $(SIM_DIR)/coverage/index.html & # Clean targets .PHONY: clean clean: rm -rf $(SIM_DIR)/* $(SYN_DIR)/* @echo "Cleaned build directories" .PHONY: help help: @echo "Available targets:" @echo " make sim - Run RTL simulation" @echo " make coverage - Run simulation with coverage" @echo " make synthesis - Run synthesis" @echo " make clean - Remove generated files"`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "ASIC tasarım akışında GNU Make gibi bağımlılık tabanlı bir otomasyon aracının kullanılmasının en büyük mühendislik faydası nedir?",
      options: ["Sadece kaynak kodu değişen modülleri artımlı (incremental) olarak yeniden derleyip sentezleyerek gereksiz işlemci ve zaman kaybını önlemek", "Verilog kodundaki mantık kapılarını otomatik olarak silmek", "Liberty dosyalarındaki gecikme değerlerini sıfırlamak", "Tasarımın silikon alanını donanımsal olarak iki katına çıkarmak"],
      correctIndex: 0,
      explanation: "GNU Make, dosya zaman damgalarını (timestamps) ve bağımlılık grafını takip eder. Yalnızca kaynak RTL veya kısıt dosyası değiştiğinde sentez ve analiz adımlarını yeniden yürütür; değişmeyen adımları atlayarak muazzam zaman kazandırır.",
    },
  },
  "transitioning-to-commerical-tools": {
    id: "transitioning-to-commerical-tools",
    badge: "Modül 8 • İleri Konular: DFT, CDC ve Düşük Güç",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Açık Kaynaktan Ticari EDA Araçlarına Geçiş Rehberi",
    subtitle: "Yosys vs Synopsys Design Compiler & Cadence Genus; OpenSTA vs Synopsys PrimeTime & Cadence Tempus; komut ve metodoloji eşleştirmeleri.",
    sections: [
      {
        title: "1. Açık Kaynak ve Ticari EDA Ekosistemlerinin Karşılaştırılması",
        content: `Açık kaynaklı EDA araçları (Yosys, OpenSTA, OpenROAD, Verilator) mantık sentezi ve zamanlama ilkelerini öğrenmek, prototip üretmek ve akademik çalışmalar için devrim niteliğindedir. Ancak yarı iletken endüstrisinde milyarlarca dolarlık ticari çipler ağırlıklı olarak **Synopsys, Cadence ve Siemens EDA** gibi büyük ticari araç takımlarıyla üretilir.

İki ekosistem arasındaki fark algoritmalardan ziyade şunlarda yatar:
* **Gelişmiş Teknolojik Düğümler (Advanced Nodes):** Ticari araçlar 3nm, 5nm gibi FinFET ve GAA teknolojilerindeki karmaşık kuantum etkilerini, gelişmiş varyasyonları (POCV) ve çoklu desenleme (multi-patterning) kurallarını destekler.
* **Gelişmiş Optimizasyon Motorları:** Milyarlarca kapıda otomatik retiming, güç kapılama sentezi ve fiziksel güdümlü sentez (physical synthesis).
* **Destek ve Sertifikasyon:** Dökümhaneler (TSMC, Samsung, Intel) üretim garantilerini (Tapeout Sign-off) ticari araçların raporlarına göre verir.`,
      },
      {
        title: "2. Mantık Sentezi Geçişi: Yosys'ten Synopsys Design Compiler ve Cadence Genus'a",
        content: `Açık kaynakta Yosys ile öğrendiğiniz tüm temel mantık (RTL ayrıştırma, teknoloji eşleme, alan/gecikme optimizasyonu), endüstri standardı **Synopsys Design Compiler (DC)** ve **Cadence Genus** araçlarında doğrudan karşılık bulur.

Her iki ticari araç da Tcl tabanlı komut kabuğu kullanır. Yosys'in modüler geçişleri yerine ticari araçlar genellikle yüksek seviyeli komutlarla arka planda binlerce optimizasyon motorunu paralel çalıştırır.`,
      },
      {
        title: "3. Sentez Komut ve Kavram Eşleştirme Tablosu (Synthesis Mapping)",
        content: `| Görev / Aşama | Yosys (Açık Kaynak) | Synopsys Design Compiler | Cadence Genus |
| :--- | :--- | :--- | :--- |
| **RTL Okuma** | \`read_verilog -sv alu.v\` | \`read_verilog alu.v\` / \`analyze\` | \`read_hdl alu.v\` |
| **Detaylandırma** | \`hierarchy -top core_top\` | \`elaborate core_top\` | \`elaborate core_top\` |
| **Kütüphane Yükleme**| \`abc -liberty sky130.lib\` | \`set target_library "slow.db"\` | \`set_db target_library "slow.lib"\` |
| **Kısıtları Yükleme**| \`read_sdc constraints.sdc\` | \`read_sdc constraints.sdc\` | \`read_sdc constraints.sdc\` |
| **Sentez & Eşleme** | \`synth -top ...; abc ...\` | \`compile_ultra\` | \`syn_generic; syn_map; syn_opt\` |
| **Alan Raporu** | \`stat -liberty ...\` | \`report_area\` | \`report_area\` |
| **Zamanlama Raporu**| \`ltp\` (OpenSTA: \`report_checks\`)| \`report_timing\` | \`report_timing\` |
| **Netlist Kaydetme** | \`write_verilog netlist.v\` | \`write -format verilog -out ...\` | \`write_hdl > netlist.v\` |`,
      },
      {
        title: "4. Zamanlama Analizi Geçişi: OpenSTA'dan Synopsys PrimeTime ve Cadence Tempus'a",
        content: `Statik Zamanlama Analizi dünyasında geçiş yapmak son derece pürüzsüzdür; çünkü **OpenSTA doğrudan Synopsys PrimeTime (PT) komut kümesini ve SDC standardını model alarak geliştirilmiştir**.

Eğer OpenSTA ile zamanlama analizi yapabiliyorsanız, endüstrinin altın standardı kabul edilen Synopsys PrimeTime ve Cadence Tempus araçlarını neredeyse hiçbir ek eğitime ihtiyaç duymadan kullanabilirsiniz. Temel rapor formatları, slack tabloları, \`report_checks\`, \`check_timing\` ve \`report_analysis_coverage\` komutları birebir aynı mantıkla çalışır.`,
      },
      {
        title: "5. STA Komut ve Raporlama Karşılaştırma Tablosu (Timing Mapping)",
        content: `| Zamanlama Görevi | OpenSTA | Synopsys PrimeTime (PT) | Cadence Tempus |
| :--- | :--- | :--- | :--- |
| **Kütüphane Okuma** | \`read_liberty cell.lib\` | \`read_db cell.db\` | \`read_lib cell.lib\` |
| **Netlist Okuma** | \`read_verilog netlist.v\`| \`read_verilog netlist.v\` | \`read_netlist netlist.v\` |
| **Tasarımı Bağlama** | \`link_design core_top\` | \`link_design core_top\` | \`init_design\` |
| **Kısıtları Okuma** | \`read_sdc constraints.sdc\`| \`read_sdc constraints.sdc\` | \`read_sdc constraints.sdc\` |
| **Setup Raporu** | \`report_checks -path_delay max\` | \`report_timing -delay_type max\` | \`report_timing -late\` |
| **Hold Raporu** | \`report_checks -path_delay min\` | \`report_timing -delay_type min\` | \`report_timing -early\` |
| **TNS / WNS Raporu** | \`report_tns; report_worst_slack\`| \`report_qor\` | \`report_constraint\` |`,
      },
      {
        title: "6. Endüstriyel Araçlara Hazırlık ve Profesyonel Becerileri Geliştirme Yol Haritası",
        content: `Açık kaynak dünyasında uzmanlaşan bir mühendisin ticari araç kullanan yarı iletken firmalarında (Apple, NVIDIA, Qualcomm, Intel, ASELSAN) başarılı olması için şu temel adımları atması önerilir:

1. **SDC Hakimiyeti:** Araç adı ne olursa olsun SDC ortak dildir. Saat tanımları, I/O bütçeleri ve multicycle kısıtlarını hatasız yazma pratiği kazanın.
2. **Tcl Betikleme Uzmanlığı:** Tüm ticari araçlar Tcl ile kontrol edilir. Regex ile rapor ayrıştırma ve veri yapıları oluşturma konusunda yetkinleşin.
3. **Fiziksel Farkındalık (Physical Awareness):** Yalnızca kapı gecikmelerini değil, metal tel dirençlerini ($RC$) ve parazitik ekstraksiyon (SPEF) formatını kavrayın.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Açık Kaynaktan Ticari EDA Araçlarına Geçiş Rehberi** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "transitioning-to-commerical-tools.v - Örnek RTL / Sentez Kodu",
          snippet: `# Yosys synthesis script yosys -p " read_verilog rtl/design.v hierarchy -check -top my_design proc; opt; fsm; opt; memory; opt techmap; opt abc -liberty lib/my_library.lib opt_clean -purge write_verilog output/synthesized.v stat -liberty lib/my_library.lib "`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Açık Kaynaktan Ticari EDA Araçlarına Geçiş Rehberi",
      initialCode: `# Yosys synthesis script yosys -p " read_verilog rtl/design.v hierarchy -check -top my_design proc; opt; fsm; opt; memory; opt techmap; opt abc -liberty lib/my_library.lib opt_clean -purge write_verilog output/synthesized.v stat -liberty lib/my_library.lib "`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Açık kaynaklı OpenSTA aracında statik zamanlama analizi öğrenen bir mühendisin ticari altın standart kabul edilen Synopsys PrimeTime aracına geçerken zorlanmamasının temel nedeni nedir?",
      options: ["OpenSTA'nın doğrudan PrimeTime Tcl komut kümesini, SDC kısıt sözdizimini ve raporlama mimarisini temel alarak geliştirilmiş olması", "İki aracın da grafiksel arayüzünün birebir aynı C++ kütüphanesiyle çizilmesi", "PrimeTime'ın sadece Linux değil Windows 98'de de çalışması", "İki aracın da Verilog yerine Python kodu sentezlemesi"],
      correctIndex: 0,
      explanation: "OpenSTA, endüstri standardı Synopsys PrimeTime komut kümesi (read_liberty, read_verilog, link_design, read_sdc, report_checks) ve SDC sözdizimi ile tam uyumlu olacak şekilde geliştirilmiştir. Bu sayede OpenSTA tecrübesi doğrudan ticari araç yetkinliğine dönüşür.",
    },
  },
  "quick-reference-cheat-sheet": {
    id: "quick-reference-cheat-sheet",
    badge: "Modül 8 • İleri Konular: DFT, CDC ve Düşük Güç",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Sentez ve STA Hızlı Başvuru Rehberi (Cheat Sheet)",
    subtitle: "Yosys, OpenSTA, SDC komutları, temel formüller, hata ayıklama ipuçları ve PPA optimizasyon kılavuzu özeti.",
    sections: [
      {
        title: "1. Yosys Mantık Sentezi Komutları ve İş Akışı Hızlı Başvuru",
        content: `ASIC ve FPGA mantık sentezi için en sık kullanılan Yosys komutları:

| Komut | Açıklama |
| :--- | :--- |
| \`read_verilog -sv <dosya>\` | SystemVerilog/Verilog kaynak dosyasını okur ve soyut sözdizim ağacı (AST) oluşturur. |
| \`hierarchy -check -top <modül>\` | Tasarım hiyerarşisini çözer, bağlanmamış modülleri denetler ve tepe modülü seçer. |
| \`proc\` | \`always\` ve \`initial\` bloklarındaki prosedürel mantığı çoklayıcılara ve yazmaçlara indirger. |
| \`opt\` | Sabit katlama (constant folding) ve kullanılmayan mantığı budama optimizasyonlarını yürütür. |
| \`fsm\` | Durum makinelerini tespit eder ve durum kodlamasını optimize eder. |
| \`memory\` | Çok boyutlu bellek dizilerini adreslenebilir yazmaç veya bellek hücrelerine dönüştürür. |
| \`dfflegalize -cell ...\` | Flip-flop kontrol kutuplarını kütüphanenin desteklediği formatlara uyarlar. |
| \`techmap\` | Karmaşık işleçleri basit Boole kapılarına parçalar. |
| \`abc -liberty <dosya.lib>\` | Berkeley ABC motoruyla kombinasyonel mantığı hedef standart hücrelere eşler. |
| \`stat -liberty <dosya.lib>\` | Toplam hücre sayısı ve silikon alanı ($\\mu m^2$) istatistiklerini raporlar. |
| \`write_verilog -noattr <netlist.v>\` | Sentezlenmiş kapı seviyesi netlist dosyasını diske kaydeder. |`,
      },
      {
        title: "2. OpenSTA Zamanlama Analizi Komutları ve Seçenekler Referansı",
        content: `Statik zamanlama analizi için temel OpenSTA komut seti:

\`\`\`tcl
# Tasarım ve Kütüphane Yükleme
read_liberty <dosya.lib>            # Hücre zamanlama modellerini oku
read_verilog <netlist.v>            # Kapı seviyesi netlist'i oku
link_design <top_module>            # Tasarım grafını bağla
read_sdc <constraints.sdc>          # SDC kısıt dosyasını uygula

# Zamanlama Raporlama
report_checks -path_delay max       # En kritik kurulum (setup) yolunu raporla
report_checks -path_delay min       # En kritik tutma (hold) yolunu raporla
report_checks -endpoint_count 10    # En kötü 10 uç noktayı listele
report_worst_slack -max             # Kurulum WNS değerini tek satırda yazdır
report_worst_slack -min             # Tutma WNS değerini tek satırda yazdır
report_tns -max                     # Toplam negatif marjı (TNS) raporla

# Tasarım Sağlığı Denetimleri
check_setup                         # Saatsiz veya kısıtsız flip-flopları listele
report_checks -unconstrained        # Kısıtlanmamış giriş/çıkış yollarını bul
report_units                        # Zaman, kapasitans ve voltaj birimlerini göster
\`\`\``,
      },
      {
        title: "3. SDC Zamanlama Kısıtları Sözdizimi Kartı (create_clock, I/O Delay, Exceptions)",
        content: `Endüstri standardı Synopsys Design Constraints (SDC) sözdizimi:

* **Saat Tanımlama:**
  \`\`\`tcl
  create_clock -name clk_main -period 10.0 [get_ports clk]
  create_clock -name vclk_ext -period 10.0  ;# Sanal Saat
  \`\`\`
* **Türetilmiş Saat:**
  \`\`\`tcl
  create_generated_clock -name clk_div2 -source [get_ports clk]       -divide_by 2 [get_pins u_div/q_reg/Q]
  \`\`\`
* **Giriş / Çıkış Gecikmeleri:**
  \`\`\`tcl
  set_input_delay  -clock clk_main -max 2.5 [get_ports data_in[*]]
  set_input_delay  -clock clk_main -min 0.5 [get_ports data_in[*]]
  set_output_delay -clock clk_main -max 2.0 [get_ports data_out[*]]
  \`\`\`
* **Saat Belirsizliği:**
  \`\`\`tcl
  set_clock_uncertainty 0.20 [get_clocks clk_main]
  \`\`\`
* **Zamanlama İstisnaları:**
  \`\`\`tcl
  set_false_path -from [get_ports rst_n]
  set_clock_groups -asynchronous -group [get_clocks clk_a] -group [get_clocks clk_b]
  set_multicycle_path 2 -setup -from [get_pins u_alu/a_reg*/CLK] -to [get_pins u_alu/r_reg*/D]
  set_multicycle_path 1 -hold  -from [get_pins u_alu/a_reg*/CLK] -to [get_pins u_alu/r_reg*/D]
  \`\`\``,
      },
      {
        title: "4. Zamanlama ve Güç Formülleri Kartı (Setup, Hold, Slack, MTBF, Dinamik Güç)",
        content: `ASIC mühendislerinin ezbere bilmesi gereken temel matematiksel modeller:

1. **Kurulum Zamanı Koşulu (Setup Check):**
   $$T_{clk} + T_{skew} \\ge T_{cq} + T_{comb\\_max} + T_{setup}$$
   $$	ext{Slack}_{setup} = T_{	ext{required}} - T_{	ext{arrival}} \\ge 0$$
2. **Tutma Zamanı Koşulu (Hold Check):**
   $$T_{cq} + T_{comb\\_min} - T_{skew} \\ge T_{hold}$$
   $$	ext{Slack}_{hold} = T_{	ext{arrival}} - T_{	ext{required}} \\ge 0$$
3. **Maksimum Çalışma Frekansı:**
   $$F_{max} = rac{1}{T_{cq} + T_{comb\\_max} + T_{setup} - T_{skew} + T_{jitter}}$$
4. **CDC Kararsızlık MTBF Hesabı:**
   $$	ext{MTBF} = rac{e^{s / 	au}}{T_w \\cdot f_{clk} \\cdot f_{data}}$$
5. **Dinamik Güç Tüketimi:**
   $$P_{dyn} = lpha \\cdot C_L \\cdot V_{DD}^2 \\cdot f$$`,
      },
      {
        title: "5. Sık Karşılaşılan Sentez ve STA Hataları Çözüm Matrisi",
        content: `| Hata / Uyarı | Nedeni | Kesin Çözüm |
| :--- | :--- | :--- |
| \`Latch inferred for signal ...\` | \`always @(*)\` bloğunda eksik if-else/case dalı | Bloğun en başına varsayılan değer atayın (\`out = 0;\`). |
| \`Found combinational loop\` | Kapı çıkışının ardışıl eleman olmadan geriye beslenmesi | Geri besleme yoluna flip-flop ekleyin veya RTL mantığını çözün. |
| \`Warning: Unmapped cells\` | Kütüphanede uygun hücre yok veya \`abc\` çalıştırılmadı | Kütüphaneyi doğrulayın, \`dfflegalize\` ve \`abc -liberty\` çalıştırın. |
| \`Setup VIOLATED (Slack < 0)\` | Mantık yolu çok uzun veya hücre sürücüsü zayıf | Kritik yola boru hattı (pipelining) ekleyin veya hücreleri büyütün (\`X4\`). |
| \`Hold VIOLATED (Slack < 0)\` | Veri yakalama saatinden önce değişiyor (kısa yol) | Veri yoluna gecikme tamponları (\`buffer\`) ekleyin. |
| \`Unconstrained endpoints\` | SDC dosyasında eksik saat veya I/O gecikmesi | Tüm portlara \`create_clock\` ve \`set_input_delay\` tanımlayın. |`,
      },
      {
        title: "6. SkyWater 130nm PDK ve PPA İyileştirme Kontrol Listesi",
        content: `SkyWater 130nm (\`sky130_fd_sc_hd\`) kütüphanesi ile başarılı bir silikon üretim (Tapeout) kontrol listesi:

* [ ] Sentez loglarında sıfır \`$_DLATCH_\` (mandal) tespiti.
* [ ] SS köşesinde (\`100C, 1.60V\`) kurulum slack'i pozitif ($WNS \\ge 0$).
* [ ] FF köşesinde (\`-40C, 1.95V\`) tutma slack'i pozitif ($WNS \\ge 0$).
* [ ] \`check\` komutunda hiçbir boşta giriş (floating input) bulunmaması.
* [ ] Sabit \`0\` ve \`1\` hatlarının \`conb_1\` tie hücrelerine bağlanmış olması.
* [ ] Tüm asenkron saat alanlarının (CDC) 2-FF veya asenkron FIFO ile korunması.
* [ ] Tasarım alanının ayrılan silikon kılıfını (die area) aşmadığının teyidi.`,
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Sentez ve STA Hızlı Başvuru Rehberi (Cheat Sheet)",
      initialCode: `// Minimal Sentezlenebilir Verilog Modülü
module counter (
    input  wire       clk,
    input  wire       rst_n,
    output reg  [3:0] count
);
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            count <= 4'b0000;
        else
            count <= count + 1'b1;
    end
endmodule`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Statik Zamanlama Analizinde (STA) formülü 'T_arrival - T_required >= 0' olan ve saat periyodundan (T_clk) bağımsız çalışan kritik zamanlama kontrolü hangisidir?",
      options: ["Tutma Zamanı (Hold Time / Min Delay) Kontrolü", "Kurulum Zamanı (Setup Time / Max Delay) Kontrolü", "Dinamik Güç Analizi", "Mantık Eşdeğerlik Kontrolü (Equivalence Checking)"],
      correctIndex: 0,
      explanation: "Tutma zamanı (Hold Time / Min Delay) kontrolü, verinin en erken ne zaman değişebileceğini denetler. Formülü Slack = Arrival - Required >= 0 olup, formülasyonunda saat periyodu (T_clk) yer almaz.",
    },
  },
  "skywater-pdk-resources": {
    id: "skywater-pdk-resources",
    badge: "Modül 8 • İleri Konular: DFT, CDC ve Düşük Güç",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "SkyWater 130nm PDK Kaynakları ve Açık Kaynak Silikon",
    subtitle: "SKY130 PDK mimarisi, Liberty kütüphaneleri, LEF/GDSII dosyaları, OpenLane entegrasyonu ve Efabless Caravel platformu.",
    sections: [
      {
        title: "1. Açık Kaynak Silikon Devrimi ve SkyWater 130nm (SKY130) PDK",
        content: `2020 yılında Google ve SkyWater Technology dökümhanesi, yarı iletken tarihinde bir ilke imza atarak **SkyWater 130nm Process Design Kit (SKY130 PDK)**'yı tamamen açık kaynak ve telifsiz (open-source & NDA-free) olarak Apache 2.0 lisansıyla kamuoyuna sundu.

Bu devrim sayesinde herhangi bir gizlilik anlaşması (NDA) imzalamadan veya yüz binlerce dolar lisans ücreti ödemeden; bir lise öğrencisinden araştırma laboratuvarlarına kadar herkes gerçek silikonda üretilebilir ASIC tasarımları yapabilir hale gelmiştir. Efabless ve Google sponsorluğundaki Open MPW (Multi-Project Wafer) programları ile binlerce açık kaynak çip ücretsiz üretilmiştir.`,
      },
      {
        title: "2. PDK Dosya Yapısı: Liberty (`.lib`), LEF, Verilog ve SPICE Modelleri",
        content: `SKY130 PDK deposu, EDA araçlarının ihtiyaç duyduğu tüm soyutlama katmanlarını barındırır:

\`\`\`
sky130A/
├── libs.ref/
│   └── sky130_fd_sc_hd/          # High-Density Standart Hücre Kütüphanesi
│       ├── lib/                  # Liberty (.lib) Zamanlama ve Güç Dosyaları
│       │   ├── ...__tt_025C_1v80.lib   # Tipik Köşe (TT)
│       │   ├── ...__ss_100C_1v60.lib   # Yavaş Köşe (SS - Setup)
│       │   └── ...__ff_n40C_1v95.lib   # Hızlı Köşe (FF - Hold)
│       ├── lef/                  # Yerleşim ve Rota için Geometrik Görünümler
│       ├── verilog/              # Fonksiyonel ve Zamanlamalı Simülasyon Modelleri
│       ├── gds/                  # Fiziksel Silikon Maske Katmanları (GDSII)
│       └── spice/                # SPICE Transistör Seviyesi Netlistler
└── libs.tech/
    ├── magic/                    # Magic VLSI DRC ve Ekstraksiyon Kuralları
    ├── openlane/                 # OpenLane Tasarım Konfigürasyonları
    └── klayout/                  # KLayout GDS Görüntüleyici Katman Ayarları
\`\`\``,
      },
      {
        title: "3. Standart Hücre Kütüphaneleri (`sky130_fd_sc_hd` ve Alternatifler)",
        content: `SKY130 PDK içerisinde farklı optimizasyon hedeflerine yönelik standart hücre kütüphaneleri yer alır:

1. **\`sky130_fd_sc_hd\` (High Density):**
   * En yaygın kullanılan kütüphanedir. Minimum alan ve yüksek kapı yoğunluğu sunar.
   * Hücre yüksekliği 5 metal hat adımıdır (5-track). Düşük güç ve kompakt mantık için idealdir.
2. **\`sky130_fd_sc_hs\` (High Speed):**
   * Yüksek saat frekansları hedefleyen tasarımlar içindir. Daha geniş transistör kanalları ve daha yüksek akım sunar; ancak silikon alanı ve kaçak akımı fazladır.
3. **\`sky130_fd_sc_ms\` (Medium Speed) & \`lp\` (Low Power):**
   * Orta hız ve ultra düşük kaçak güç odaklı özel kütüphanelerdir.`,
      },
      {
        title: "4. Uçtan Uca RTL-GDSII Akışı: OpenLane Mimarisi ve Yosys/OpenSTA Rolü",
        content: `**OpenLane**, Verilog RTL kodunu alıp tamamen otomatik olarak dökümhaneye gönderilmeye hazır nihai **GDSII** dosyasına dönüştüren açık kaynaklı bir ASIC akış orkestratörüdür.

OpenLane içerisindeki araç zinciri:
* **Sentez:** \`Yosys\` + \`ABC\`
* **Statik Zamanlama Analizi:** \`OpenSTA\` (her adımda zamanlama kontrolü ve optimizasyon)
* **Zemin Planlama (Floorplanning) & CTS:** \`OpenROAD\`
* **Yerleşim ve Rota (PnR):** \`OpenROAD\`
* **DRC ve LVS:** \`Magic\`, \`KLayout\` ve \`Netgen\`

Yosys mantık kapılarını sentezlerken, OpenSTA tasarımın hiçbir aşamada saat ihlali yapmadığını garanti eden denetim otoritesidir.`,
      },
      {
        title: "5. SoC Entegrasyonu: Efabless Caravel Platformu ve ChipIgniter",
        content: `Açık kaynak çip üretiminde tasarımcılar sıfırdan bir SoC mimarisi kurmak zorunda kalmaz. **Efabless Caravel**, tasarımcıya hazır bir çevre sunan bir "Harnessed SoC" altyapısıdır:

\`\`\`
+-------------------------------------------------------+
|  CARAVEL SoC HARNESS                                  |
|  +---------------------+   +-----------------------+  |
|  | RISC-V Yönetim Çekir|   | Bellek & PLL & SPI    |  |
|  | (Management Core)   |   | (Altyapı Blokları)    |  |
|  +---------------------+   +-----------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  |  KULLANICI ALANI (User Project Area - 10 mm^2)  |  |
|  |  [Sizin Tasarımınız: Kendi ASIC Çekirdeğiniz]   |  |
|  +-------------------------------------------------+  |
+-------------------------------------------------------+
\`\`\`

Kullanıcı sadece kendi özgün donanımını (örneğin bir şifreleme motoru veya nöromorfik işlemci) ~10 $mm^2$'lik kullanıcı alanına entegre eder; giriş/çıkış pad'leri, test arayüzleri ve RISC-V kontrolcüsü Caravel tarafından sağlanır.`,
      },
      {
        title: "6. SKY130 Tasarımları İçin En İyi Pratikler ve Hata Ayıklama İpuçları",
        content: `SKY130 ile başarılı bir silikon üretimi için altın kurallar:

1. **HD Kütüphanesinde Pin Erişimi (Pin Access):**
   \`sky130_fd_sc_hd\` hücreleri çok kompakt olduğundan metal-1 (M1) seviyesinde yönlendirme tıkanıklığı (**routing congestion**) yaşanabilir. Çözüm: Zemin planlamada hücre yoğunluğunu (core utilization) %50-60 seviyesinde tutmaktır.
2. **Saat Frekansı Hedefleri:**
   SKY130 olgun bir 130nm planar CMOS teknolojisidir. Tipik güvenli saat frekansları **50 MHz ile 150 MHz** arasındadır. 200+ MHz için agresif boru hattı (pipelining) zorunludur.
3. **Parazitik Direnç ve Kapasitans (RC):**
   Yerleşim sonrası SPEF ekstraksiyonu yapılarak OpenSTA ile nihai zamanlama doğrulanmalıdır.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **SkyWater 130nm PDK Kaynakları ve Açık Kaynak Silikon** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "skywater-pdk-resources.v - Örnek RTL / Sentez Kodu",
          snippet: `https://github.com/google/skywater-pdk`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: SkyWater 130nm PDK Kaynakları ve Açık Kaynak Silikon",
      initialCode: `https://github.com/google/skywater-pdk`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "SkyWater 130nm açık kaynak PDK'sında en yaygın kullanılan 'sky130_fd_sc_hd' standart hücre kütüphanesinin öne çıkan temel özelliği nedir?",
      options: ["Yüksek kapı yoğunluğu (High Density) ve kompakt silikon alanı sağlayarak düşük güç ve küçük çip alanını hedeflemesi", "10 GHz üzeri saat frekanslarında çalışmak üzere tasarlanmış olması", "Yalnızca analog devre bileşenleri içermesi", "Üretimi için gizlilik anlaşması (NDA) imzalanmasını zorunlu kılması"],
      correctIndex: 0,
      explanation: "'sky130_fd_sc_hd' (High Density) kütüphanesi, 5-track yüksekliğinde son derece kompakt hücreler sunar. Ana mühendislik hedefi silikon alanını minimize etmek ve kapı yoğunluğunu maksimize ederek maliyet etkin, düşük güçlü dijital entegre devreler üretmektir.",
    },
  },
  "troubleshooting-and-debugging-guide": {
    id: "troubleshooting-and-debugging-guide",
    badge: "Modül 9 • Ek: Hata Ayıklama Rehberi",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Sentez ve STA Hata Ayıklama (Troubleshooting) Kılavuzu",
    subtitle: "Icarus Verilog, Verilator, Yosys ve OpenSTA yaygın hata mesajları, mandal ve döngü tespiti, SDC uyumsuzlukları ve çözüm reçeteleri.",
    sections: [
      {
        title: "1. EDA Araç Zincirinde Hata Ayıklama Metodolojisi ve Teşhis Akışı",
        content: `Karmaşık ASIC tasarım akışlarında karşılaşılan hataları çözmek rastgele denemelerle mümkün değildir; sistematik bir **kök neden teşhis metodolojisi (root-cause diagnosis)** gerektirir.

Hata ayıklama adımları katman katman ilerlemelidir:
\`\`\`
[RTL Lint & Sözdizim] ──> [Mantık Sentezi] ──> [Zamanlama Analizi] ──> [Fiziksel Doğrulama]
(iverilog / Verilator)        (Yosys)             (OpenSTA)              (Magic / Netgen)
\`\`\`

Bir sonraki aşamaya geçmeden önce mevcut aşamanın log dosyaları taranmalı, tüm \`ERROR\` mesajları çözülmeli ve \`WARNING\` mesajlarının zararsız olduğu tek tek doğrulanmalıdır.`,
      },
      {
        title: "2. Simülasyon ve Lint Hataları (iverilog ve Verilator): Tanımsız Ağlar ve Sözdizimi",
        content: `Sentez öncesinde yakalanması gereken tipik kodlama hataları:

* **Tanımsız Sinyal (Undeclared Identifier / Implicit Net):**
  Verilog-1995 varsayılanı olarak tanımlanmamış sinyaller 1-bit \`wire\` kabul edilir. Bu durum çok bitlik veriyollarında bitlerin sessizce kırpılmasına yol açar!
  * *Çözüm:* Her Verilog dosyasının başına şu direktifi ekleyin:
    \`\`\`verilog
    \`default_nettype none
    \`\`\`
    Bu sayede tanımlanmamış her sinyalde derleyici derhal hata vererek durur.
* **Verilator Latch / Combinational Loop Uyarısı:**
  Verilator çalıştırırken lint bayraklarını aktif tutun:
  \`\`\`bash
  verilator --lint-only -Wall my_design.v
  \`\`\`
  \`UNOPTFLAT\` uyarısı potansiyel kombinasyonel döngüleri ve çözülemeyen döngüsel bağımlılıkları bildirir.`,
      },
      {
        title: "3. Yosys Sentez Uyarıları ve Hataları: Mandal Çıkarımı, Tip Dönüşümleri ve Eşlenemeyen Hücreler",
        content: `Yosys çalışırken log dosyasında dikkatle aranması gereken kritik uyarılar:

1. **\`Warning: Latch inferred for toplevel module ...\`**
   * *Teşhis:* Kombinasyonel \`always\` bloğunda bir \`if\` dalının \`else\` kısmı unutulmuş.
   * *Çözüm:* Tüm dalları tamamlayın veya bloğun başına varsayılan değer yazın.
2. **\`ERROR: Module '\\xyz' referenced in module '\\top' in cell '\\inst' is not part of the design\`**
   * *Teşhis:* Bir alt modül kaynak dosya listesine eklenmemiş.
   * *Çözüm:* \`read_verilog\` komutuna eksik dosyayı ekleyin.
3. **\`Warning: cell ... not mapped\`**
   * *Teşhis:* Teknoloji kütüphanesinde eşleşen standart hücre bulunamadı.
   * *Çözüm:* \`techmap\` ve \`abc -liberty\` adımlarının başarıyla çalıştığını doğrulayın.`,
      },
      {
        title: "4. SDC ve OpenSTA Hataları: Eksik Saatler, Tanımsız Portlar ve Aşırı Kısıtlama",
        content: `OpenSTA çalıştırıldığında en sık yapılan kısıtlama hataları:

* **\`Warning: No clock defined for register ...\`**
  Bir flip-flopun saat pini hiçbir \`create_clock\` veya \`create_generated_clock\` alanına bağlı değildir. Bu flip-flop zamanlama kontrolü dışı kalır!
* **\`Warning: unconstrained input/output port ...\`**
  Giriş ve çıkış portlarına \`set_input_delay\` veya \`set_output_delay\` atanmamıştır.
* **Aşırı Kısıtlama Hatası:**
  Örneğin 100 MHz hedefi olan bir devreye $T_{clk} = 1	ext{ ns}$ (1 GHz) tanımlamak. Sentezleyicinin devasa hücreler basıp alanı patlatmasına ve yüzlerce ihlal üretmesine yol açar.`,
      },
      {
        title: "5. Zamanlama İhlallerinin Kök Neden Teşhisi (Setup ve Hold Debugging)",
        content: `OpenSTA negatif slack raporladığında şu teşhis algoritması işletilir:

\`\`\`
                  [Negatif Slack İhlali Var]
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
       [Setup İhlali (Max)]          [Hold İhlali (Min)]
               │                             │
    ┌──────────┴──────────┐            ┌─────┴──────────┐
    ▼                     ▼            ▼                ▼
[Yol Çok Uzun]      [Slew Kötü]   [Kısa Yol]       [Saat Skew]
(Mantık Derinliği)  (Yüksek Yük)  (Tampon Ekle)    (Ağacı Dengele)
    │                     │
    ▼                     ▼
Boru Hattı Ekle    Hücreyi Büyüt
(Pipelining)       (Upsizing X4)
\`\`\`

Detaylı inceleme için her zaman \`-fields {slew cap input nets fanout}\` parametresiyle rapor alınmalıdır.`,
      },
      {
        title: "6. Ayrıntılı Log İnceleme, Hata İzolasyonu ve Çözüm Kontrol Listesi",
        content: `Tasarım akışını tıkayan bir hata ile karşılaşıldığında uygulanacak 4 adımlı izolasyon:

1. **Adım 1: İzole Et (Minimal Reproducible Example):**
   Hatalı modülü tüm SoC'den ayırıp tek başına küçük bir test betiğiyle sentezleyin.
2. **Adım 2: Ayrıntılı Çıktıyı Aç (Verbose Mode):**
   Yosys'te \`yosys -v 3\` veya OpenSTA'da detaylı raporlama komutlarını çalıştırarak arayüzün adımlarını izleyin.
3. **Adım 3: Şematik Çizin (\`show\`):**
   Hatalı düğümün kapı bağlantılarını görselleştirerek beklenmeyen terslemeleri veya geri beslemeleri yakalayın.
4. **Adım 4: Eşdeğerlik Doğrulaması:**
   Her kod değişikliğinden sonra orijinal RTL ile yeni netlist arasında formal denklik kontrolü koşun.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Sentez ve STA Hata Ayıklama (Troubleshooting) Kılavuzu** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "troubleshooting-and-debugging-guide.v - Örnek RTL / Sentez Kodu",
          snippet: `error: Unable to bind wire/reg/memory 'signal_name' in 'module_name'`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Sentez ve STA Hata Ayıklama (Troubleshooting) Kılavuzu",
      initialCode: `error: Unable to bind wire/reg/memory 'signal_name' in 'module_name'`,
      language: "verilog",
      terminalTitle: "Yosys / OpenSTA Sentez Konsolu",
      expectedOutput: [
        "[INFO:SYNTH] Yosys 0.38 (git sha1 abc1234, clang -O3)",
        "[INFO:SYNTH] Executing Verilog-2005 frontend: design.v",
        "[INFO:SYNTH] Generating RTLIL representation for module `counter`...",
        "[INFO:SYNTH] Technology mapping using cell library: sky130_fd_sc_hd",
        "[INFO:SYNTH] ABC: Area = 42.5 um^2, Delay = 0.85 ns",
        "[INFO:STA] OpenSTA v2.5: Running Static Timing Analysis...",
        "[INFO:STA] Path 1: clk -> count[3] Slack = +0.65ns (MET)",
        "[INFO:STA] Timing closure verified across TT / SS / FF corners.",
        "** SYNTHESIS & STA COMPLETED SUCCESSFULLY **",
      ],
    },
    quiz: {
      question: "Verilog tasarımlarında tanımlanmamış sinyallerin derleyici tarafından sessizce 1-bitlik tel (wire) varsayılarak çok bitlik veriyollarının kırpılmasını ve ölümcül hataların oluşmasını engellemek için hangi derleyici direktifi kullanılmalıdır?",
      options: ["`default_nettype none", "`timescale 1ns/1ps", "`define DEBUG 1", "`ifdef SYNTHESIS"],
      correctIndex: 0,
      explanation: "'`default_nettype none' direktifi, Verilog dosyasındaki tüm sinyallerin açıkça (explicitly) tanımlanmasını zorunlu kılar. Tanımlanmamış herhangi bir sinyal kullanıldığında derleyici anında sözdizim hatası vererek tasarımcıyı uyarır.",
    },
  },
};
