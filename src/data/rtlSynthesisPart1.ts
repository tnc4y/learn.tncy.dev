import { LessonContent } from "./lessonsData";

export const RTL_SYNTHESIS_PART1: Record<string, LessonContent> = {
  "overview-of-digital-design-flow": {
    id: "overview-of-digital-design-flow",
    badge: "Modül 1 • RTL ve Sentez Temelleri",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "RTL'den Silikona Dijital Tasarım ve Sentez Akışına Genel Bakış",
    subtitle: "Donanım tanımlama dillerinden (HDL) fiziksel silikon yerleşimine (GDSII) uzanan dijital ASIC tasarım boru hattı, sentez aşamaları ve açık kaynak EDA devrimi.",
    sections: [
      {
        title: "1. Modern Dijital ASIC Tasarım Akışı ve RTL Seviyesi",
        content: `Modern mikroişlemciler, grafik işlemciler ve yapay zekâ hızlandırıcıları milyarlarca transistörden oluşur. Bu karmaşıklıktaki bir sistemi transistör seviyesinde tek tek çizerek tasarlamak imkânsızdır. Bu nedenle modern dijital tasarım, yüksek soyutlama seviyelerinden fiziksel silikona doğru adım adım ilerleyen disiplinli bir çevrim (pipeline) izler.

Tasarım yolculuğunun başladığı temel soyutlama düzeyi **RTL (Register Transfer Level - Yazmaç Aktarım Düzeyi)** olarak adlandırılır. RTL seviyesinde tasarımcı; Verilog, SystemVerilog veya VHDL dillerini kullanarak verinin saat vuruşlarıyla yazmaçlar (flip-flop'lar) arasında nasıl aktarıldığını ve bu aktarım esnasında mantıksal fonksiyonlarla nasıl işlendiğini tanımlar. Örneğin \`assign sum = a + b;\` veya \`always @(posedge clk) q <= d;\` ifadeleri doğrudan kapı seviyesini değil, devrenin zamansal ve fonksiyonel davranışını soyutlar.`,
      },
      {
        title: "2. Fonksiyonel Doğrulama ve Simülasyon Aşaması",
        content: `RTL kodu yazıldıktan sonra donanım geliştirmenin en kritik aşamalarından biri olan **fonksiyonel simülasyon ve doğrulama** başlar. Silikon üretim maliyetlerinin (maske maliyetleri ve dökümhane masrafları) milyonlarca doları bulduğu ASIC dünyasında, hataların (bug) silikona gitmeden önce yazılım ortamında yakalanması şarttır.

Bu aşamada simülatörler (\`Icarus Verilog\`, \`Verilator\`, \`VCS\`, \`Questa\`) kullanılır. Bir testbench oluşturularak tasarıma giriş uyaranları (stimulus) uygulanır ve devrenin beklenen çıkışları üretip üretmediği kontrol edilir. Davranışsal simülasyon genellikle gecikmesiz (zero-delay) çalışır; yani mantık kapılarının yayılma gecikmeleri veya kablo gecikmeleri hesaba katılmadan yalnızca mimari doğruluk denetlenir.`,
      },
      {
        title: "3. Mantık Sentezi (Logic Synthesis): RTL'den Standart Hücre Ağına",
        content: `Doğrulanmış RTL kodu silikona doğrudan aktarılamaz. İşte bu noktada **Mantık Sentezi (Logic Synthesis)** devreye girer. Sentez aracı (\`Yosys\`, \`Synopsys Design Compiler\`), RTL kodunu alır ve onu hedef dökümhanenin (foundry) sunduğu **Standart Hücre Kütüphanesindeki (Standard Cell Library)** fiziksel kapılara (AND, OR, NAND, Flip-Flop vb.) dönüştürür.

Sentez işlemi temel olarak üç ana fazdan oluşur:
- **Elaboration & Translation:** RTL ifadeleri genel mantık operatörlerine ve ara soyutlamalara (Generic Netlist) ayrıştırılır.
- **Logic Optimization:** Boolean cebri ve Karnaugh haritaları benzeri ileri algoritmalarla gereksiz mantık elenir, alan ve mantık derinliği optimize edilir.
- **Technology Mapping:** Genel mantık kapıları, hedef teknolojiye (örneğin Skywater 130nm PDK) ait gerçek standart hücrelere eşlenir ve çıkışta bir \`Gate-Level Netlist\` (Kapı Seviyesi Ağ Listesi) üretilir.`,
      },
      {
        title: "4. Statik Zamanlama Analizi (STA) ve Zamanlama Kapanımı",
        content: `Mantık kapılarına dönüştürülen devrenin sadece fonksiyonel olarak doğru çalışması yetmez; aynı zamanda hedeflenen saat frekansında (örneğin 100 MHz veya 1 GHz) hatasız çalışabilmesi gerekir. **Statik Zamanlama Analizi (Static Timing Analysis - STA)**, dinamik simülasyona ihtiyaç duymadan devredeki tüm mantıksal yolların gecikmesini matematiksel olarak hesaplar.

STA araçları (\`OpenSTA\`, \`Synopsys PrimeTime\`), standart hücrelerin Liberty (\`.lib\`) dosyalarında yer alan gecikme tablolarını okur. İki temel kriteri denetler:
- **Setup Time (Kurulum Süresi):** Verinin, saat tetiklemesinden önce flip-flop girişinde kararlı kalması gereken minimum süre. İhlal edilirse çip hedeflenen frekansta çalışamaz.
- **Hold Time (Tutma Süresi):** Verinin, saat tetiklemesinden sonra flip-flop girişinde kararlı kalması gereken minimum süre. İhlal edilirse çip saat frekansı ne kadar düşürülürse düşürülsün kalıcı olarak işlevsiz hale gelir.`,
      },
      {
        title: "5. Fiziksel Tasarım (Place & Route) ve GDSII Üretimi",
        content: `Zamanlama kısıtlarını sağlayan kapı seviyesi ağ listesi, **Fiziksel Tasarım (Physical Design / P&R)** aşamasına aktarılır. Bu aşama silikon yüzeyindeki geometrik yerleşimi belirler:
- **Floorplanning:** Çip sınırlarının, güç raylarının (VDD/GND grid) ve girdi/çıktı (I/O) pad'lerinin tanımlanması.
- **Placement:** Yüz binlerce standart hücrenin satırlara en uygun şekilde yerleştirilmesi.
- **Clock Tree Synthesis (CTS):** Saat sinyalinin tüm flip-flop'lara minimum gecikme ve sıfıra yakın saat kaymasıyla (skew) ulaşmasını sağlayan özel tampon (buffer) ağacının örülmesi.
- **Routing:** Hücre pinleri arasındaki metal bağlantı katmanlarının döşenmesi.
- **Sign-off Doğrulaması:** DRC (Design Rule Checking) ve LVS (Layout Versus Schematic) kontrollerinden geçen nihai geometri, dökümhaneye gönderilmek üzere endüstri standardı \`GDSII\` veya \`OASIS\` formatında dışa aktarılır.`,
      },
      {
        title: "6. Açık Kaynaklı EDA Devrimi ve Skywater 130nm PDK",
        content: `Geçmişte dijital ASIC tasarımı, yüz binlerce dolarlık lisanslara sahip ticari araçlar (Synopsys, Cadence, Siemens) ve gizlilik sözleşmeleri (NDA) arkasında saklanan dökümhane proses kitleri nedeniyle yalnızca büyük şirketlerin tekelindeydi.

2020 yılında Google ve Skywater Technology iş birliğiyle duyurulan **Skywater 130nm Open PDK**, donanım dünyasında devrim yarattı. İlk kez ticari olarak üretilebilir bir dökümhane proses kiti Apache 2.0 açık kaynak lisansıyla yayınlandı. Bu atılım; \`Yosys\` (sentez), \`OpenROAD\` (fiziksel tasarım), \`OpenSTA\` (zamanlama analizi), \`Icarus Verilog\` ve \`Verilator\` (doğrulama) gibi açık kaynaklı EDA araçlarının bir araya gelerek uçtan uca açık kaynaklı bir ASIC akışı (\`OpenLane\`) oluşturmasını sağladı. Artık herhangi bir mühendis veya öğrenci, tek satır lisans ücreti ödemeden RTL'den çalışan silikona kadar tüm akışı koşturabilmektedir.`,
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: RTL'den Silikona Dijital Tasarım ve Sentez Akışına Genel Bakış",
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
      question: "Dijital ASIC tasarım akışında RTL kodunu hedef dökümhanenin standart hücre kütüphanesindeki gerçek mantık kapılarına dönüştüren aşama hangisidir?",
      options: ["Mantık Sentezi (Logic Synthesis)", "Statik Zamanlama Analizi (STA)", "Floorplanning ve Güç Ağı Yerleşimi", "Davranışsal Simülasyon (Behavioral Simulation)"],
      correctIndex: 0,
      explanation: "Mantık sentezi (Logic Synthesis), RTL seviyesinde yazılmış donanım tanımlama kodunu (Verilog/VHDL) alır, mantıksal optimizasyonlar yapar ve hedef dökümhaneye ait standart hücre kütüphanesini kullanarak kapı seviyesi ağ listesine (Gate-Level Netlist) dönüştürür.",
    },
  },
  "icarus-verilog": {
    id: "icarus-verilog",
    badge: "Modül 2 • Icarus Verilog ile Simülasyon",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Icarus Verilog ile Simülasyon: İki Aşamalı Derleme ve Çalıştırma Akışı",
    subtitle: "iverilog derleyicisi ve vvp sanal işlemcisi ile Verilog/SystemVerilog tasarımlarının komut satırından derlenmesi, benzetimi ve hata ayıklama pratikleri.",
    sections: [
      {
        title: "1. Icarus Verilog Mimarisi ve İki Kademeli Simülasyon Felsefesi",
        content: `\`Icarus Verilog\` (\`iverilog\`), Stephen Williams tarafından geliştirilen ve sayısal donanım dünyasında yaygın olarak kullanılan açık kaynaklı bir IEEE-1364 Verilog simülasyon ve sentez aracıdır.

Birçok yorumlayıcı (interpreter) tabanlı simülatörün aksine Icarus Verilog, C derleyicilerine benzeyen **iki aşamalı (two-stage)** bir mimari kullanır:
1. **Ön Derleme ve Elaboration Aşaması (\`iverilog\`):** HDL kaynak dosyalarını okur, sözdizimini denetler, modül hiyerarşisini bağlar ve optimize edilmiş bir ara kod (bytecode) dosyası üretir.
2. **Çalıştırma Aşaması (\`vvp\`):** Üretilen ara kod dosyasını yürüten sanal işlemcidir (Verilog Virtual Processor). Simülasyon zamanını ilerletir, olay kuyruğunu (event queue) işler ve dalga biçimi çıktılarını kaydeder.`,
      },
      {
        title: "2. Birinci Adım: iverilog ile Ayrıştırma, Elaboration ve VVP Üretimi",
        content: `\`iverilog\` komutu çalıştırıldığında derleyici arka planda dört temel adım yürütür:
- **Parsing (Ayrıştırma):** Kaynak kodlardaki parantez hataları, eksik noktalı virgüller ve dilbilgisi kuralları denetlenir.
- **Elaboration (Genişletme/Bağlama):** Üst düzey (top-level) modülden başlayarak tüm alt modül örneklemeleri (instantiations), parametreler (\`parameter\`, \`defparam\`) ve port bağlantıları çözümlenerek tek birleşik tasarım hiyerarşisi oluşturulur.
- **Optimizasyon:** Kullanılmayan ölü mantıklar elenir ve sabit değerler önceden hesaplanır (constant propagation).
- **Kod Üretimi:** Simülasyon motoru için optimize edilmiş yürütülebilir \`.vvp\` dosyası oluşturulur.

Temel derleme komutu:
\`\`\`bash
iverilog -o sim_output.vvp design.v testbench.v
\`\`\`
Burada \`-o\` bayrağı çıktı dosyasının adını belirtir. Belirtilmezse varsayılan olarak \`a.out\` oluşturulur.`,
      },
      {
        title: "3. İkinci Adım: vvp ile Olay Güdümlü Simülasyonun Yürütülmesi",
        content: `Derleme tamamlandığında oluşturulan sanal işlemci dosyası \`vvp\` komutuyla koşturulur:
\`\`\`bash
vvp sim_output.vvp
\`\`\`
\`vvp\` motoru çalıştırıldığında şu süreçler gerçekleşir:
- Bütün \`initial\` blokları ve \`always\` blokları simülasyon zamanı \`t = 0\` anında başlatılır.
- Değişkenler ve teller başlatma kurallarına göre \`1'bx\` veya belirlenen başlangıç değerlerine atanır.
- Zaman tabanlı olaylar (\`#10\`, \`@(posedge clk)\`) IEEE olay zamanlayıcısı (event scheduler) tarafından işlenir.
- Kod içerisindeki \`$display\`, \`$monitor\` ve \`$finish\` gibi sistem görevleri yürütülür.
- Kodda \`$dumpfile\` ve \`$dumpvars\` tanımlanmışsa dalga biçimi verileri diske (\`.vcd\` dosyası) yazılır.

İki aşamalı yapının en büyük avantajı; derleme işlemini tek bir kez yapıp, farklı çalışma zamanı parametreleriyle (\`vvp sim_output.vvp +TESTCASE=3\`) defalarca simülasyon koşturabilmektir.`,
      },
      {
        title: "4. Kritik Komut Satırı Bayrakları: Standart Sürümleri, Yollar ve Makrolar",
        content: `\`iverilog\` gelişmiş projelerde çok çeşitli komut satırı seçenekleri sunar:
- **Dil Standardı Seçimi (\`-g\`):** Verilog ve SystemVerilog sürümlerini belirler:
  - \`-g1995\` : Klasik Verilog-1995 standardı.
  - \`-g2001\` : Verilog-2001 (varsayılan genişletmeler, \`generate\` blokları vb.).
  - \`-g2005-sv\` veya \`-g2012\` : Modern SystemVerilog sözdizimi ve veri tipleri.
- **Başlık Dosyası Yolları (\`-I\`):** Kaynak kodda \`\` \`include "defines.vh" \`\` yönergesi kullanıldığında derleyicinin arama yapacağı dizini belirtir:
  \`\`\`bash
  iverilog -I ./include -o sim.vvp top.v tb.v
  \`\`\`
- **Makro Tanımlama (\`-D\`):** Komut satırından koşullu derleme makroları tanımlar:
  \`\`\`bash
  iverilog -DSIMULATION -DDEBUG_LEVEL=2 -o sim.vvp top.v tb.v
  \`\`\`
- **Uyarı Yönetimi (\`-Wall\`):** Muhtemel mantık hataları, genişlik uyuşmazlıkları ve tanımlanmamış kablolar için tüm uyarıları etkinleştirir.`,
      },
      {
        title: "5. Çoklu Kaynak Dosyaları ve Dosya Listeleri (.f / Filelists)",
        content: `Büyük tasarımlar onlarca alt modül, kütüphane ve testbench dosyasından oluşur. Komut satırına tüm dosya adlarını tek tek yazmak sürdürülemez bir yöntemdir. Bunun yerine **Dosya Listesi (Filelist)** dosyaları (genellikle \`.f\` uzantılı) kullanılır.

Örnek \`sources.f\` içeriği:
\`\`\`text
+incdir+./includes
./rtl/alu.v
./rtl/register_file.v
./rtl/cpu_core.v
./tb/cpu_core_tb.v
\`\`\`
Bu dosya listesini derlemek için \`-f\` veya \`-c\` bayrağı kullanılır:
\`\`\`bash
iverilog -g2012 -c sources.f -o cpu_sim.vvp
\`\`\`
Dosya listeleri iç içe de tanımlanabilir; böylece RTL dosyaları ile testbench dosyaları ayrı listelerde modüler olarak saklanabilir.`,
      },
      {
        title: "6. Pratik Testbench Akışı, Hata Ayıklama İpuçları ve En İyi Uygulamalar",
        content: `Icarus Verilog ile profesyonel bir çalışma ortamı kurarken şu en iyi uygulamalar takip edilmelidir:
- **Ayrı Derleme Dizinleri:** Üretilen \`.vvp\` ve \`.vcd\` dosyalarının kaynak kod dizinini kirletmemesi için bir \`build/\` veya \`sim/\` dizini kullanılmalıdır.
- **Otomasyon (Makefile):** Derleme ve çalıştırma adımları bir \`Makefile\` ile otomatikleştirilmelidir:
\`\`\`makefile
SIM_DIR = sim
RTL = rtl/counter.v
TB = tb/counter_tb.v
TARGET = $(SIM_DIR)/counter_sim.vvp

all: run

$(TARGET): $(RTL) $(TB)
	mkdir -p $(SIM_DIR)
	iverilog -g2005 -Wall -o $(TARGET) $(RTL) $(TB)

run: $(TARGET)
	vvp $(TARGET)

clean:
	rm -rf $(SIM_DIR) *.vcd
\`\`\`
- **Hata Yakalama:** Testbench içerisinde \`$fatal\` veya \`$error\` kullanıldığında simülasyonun otomatik sonlanması sağlanarak CI/CD boru hatlarında başarısızlıklar anında yakalanabilir.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Icarus Verilog ile Simülasyon: İki Aşamalı Derleme ve Çalıştırma Akışı** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "icarus-verilog.v - Örnek RTL / Sentez Kodu",
          snippet: `iverilog -o my_design.vvp design.v testbench.v`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Icarus Verilog ile Simülasyon: İki Aşamalı Derleme ve Çalıştırma Akışı",
      initialCode: `iverilog -o my_design.vvp design.v testbench.v`,
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
      question: "Icarus Verilog simülasyon akışında `iverilog` ve `vvp` araçlarının görev dağılımı aşağıdakilerden hangisinde doğru açıklanmıştır?",
      options: ["`iverilog` kaynak kodları derleyip bir ara dosya (.vvp) üretir; `vvp` ise bu ara dosyayı çalıştırarak simülasyonu yürütür.", "`iverilog` dalga biçimi grafik arayüzünü açar; `vvp` ise kodu doğrudan silikon fotomaskesine dönüştürür.", "`iverilog` sadece C++ kodlarını derler; `vvp` ise SystemVerilog kodlarını sentezler.", "`vvp` syntax kontrolü yapar; `iverilog` ise donanım test kartına bitstream yükler."],
      correctIndex: 0,
      explanation: "Icarus Verilog iki aşamalı bir mimariye sahiptir: `iverilog` derleme, elaboration ve optimizasyon yaparak `.vvp` ara kodunu üretir; `vvp` (Verilog Virtual Processor) ise bu ara kodu yorumlayıp olay tabanlı simülasyonu koşturur.",
    },
  },
  "waveform-analysis-with-gtkwave": {
    id: "waveform-analysis-with-gtkwave",
    badge: "Modül 2 • Icarus Verilog ile Simülasyon",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "GTKWave ile Dalga Biçimi (Waveform) Analizi ve Hata Ayıklama",
    subtitle: "VCD (Value Change Dump) dosyalarının üretilmesi, GTKWave grafik arayüzünde sinyal takibi, imleçler, radiks formatları ve donanım zamanlama hatalarının tespiti.",
    sections: [
      {
        title: "1. Donanım Doğrulamada Dalga Biçimi Analizinin Önemi",
        content: `Sayısal tasarımda bir testbench'in konsola \`$display("Test Passed!")\` yazdırması, tasarımın her yönüyle mükemmel çalıştığı anlamına gelmez. Donanım sinyallerinin saat kenarlarına göre ne zaman değiştiği, ara durumlarda geçici bozulmaların (glitch) oluşup oluşmadığı ve veri yollarının kararlılığı ancak zaman ekseninde görselleştirilerek anlaşılabilir.

**Dalga Biçimi Analizi (Waveform Analysis)**, simülasyon süresince sistemdeki tüm kablo ve yazmaçların değer değişimlerini bir osiloskop veya mantık analizörü (logic analyzer) hassasiyetinde incelememize olanak tanır. Açık kaynaklı sayısal tasarım dünyasında bu incelemenin fiili standardı \`GTKWave\` yazılımıdır.`,
      },
      {
        title: "2. IEEE Standart VCD (Value Change Dump) Dosya Formatı",
        content: `Dalga biçimi görselleştiricilerinin veriyi okuyabilmesi için simülatörün zaman içindeki sinyal değişimlerini standart bir formatta kaydetmesi gerekir. Bu formatların başında IEEE 1364 standardıyla tanımlanan **VCD (Value Change Dump)** gelir.

VCD formatının temel özellikleri:
- **ASCII Metin Tabanlıdır:** İnsan tarafından okunabilir bir metin yapısına sahiptir. Başlık kısmında modül hiyerarşisi, sinyal isimleri ve bunlara atanan kısa sembolik karakterler tanımlanır.
- **Sadece Değişimleri Kaydeder (Event-Driven):** Her simülasyon zaman adımında tüm sinyalleri tekrar tekrar yazmak yerine, yalnızca değeri değişen sinyalleri \`#zaman sembol_yeni_değer\` şeklinde günlüğe kaydeder. Bu sayede dosya boyutu optimize edilir.
- **Evrensel Uyumluluk:** Icarus Verilog, Verilator, ModelSim, VCS ve Vivado dahil tüm modern EDA araçları VCD formatını doğrudan destekler.`,
      },
      {
        title: "3. Testbench İçerisinde VCD Dökümü Alma: $dumpfile ve $dumpvars",
        content: `Verilog simülasyonunda VCD çıktısı üretmek için testbench modülünün \`initial\` bloğuna iki temel sistem görevi (system task) eklenir:
\`\`\`verilog
initial begin
  // 1. Dalga biçimi dosyasının adını belirle
  $dumpfile("waveform.vcd");

  // 2. Döküm seviyesini ve izlenecek hiyerarşiyi belirle
  // İlk parametre derinlik (0 = tüm alt hiyerarşiler), ikinci parametre kök modül
  $dumpvars(0, tb_top);
end
\`\`\`
İleri düzey VCD kontrol komutları:
- \`$dumpon\`: Önceden durdurulmuş VCD kayıt sürecini yeniden başlatır.
- \`$dumpoff\`: Sadece belirli bir zaman aralığına odaklanmak ve dosya boyutunu küçük tutmak için VCD kaydını geçici olarak askıya alır.
- \`$dumpall\`: Belirtilen andaki tüm sinyallerin anlık değerlerini zorunlu olarak VCD kütüğüne döker.`,
      },
      {
        title: "4. GTKWave Kullanıcı Arayüzü, Sinyal Ağacı ve Görüntü Özelleştirme",
        content: `Üretilen VCD dosyası terminalden doğrudan GTKWave ile açılır:
\`\`\`bash
gtkwave waveform.vcd &
\`\`\`
GTKWave arayüzü üç temel panelden oluşur:
- **SST (Signal Search Tree):** Sol üstte tasarımın modül hiyerarşisini gösterir. Bir modül seçildiğinde sol alttaki panelde o modüle ait port ve sinyaller listelenir.
- **Signals Display Panel:** İncelemek istediğiniz sinyalleri sürükleyip bıraktığınız veya \`Append\` ile eklediğiniz orta dikey alan.
- **Waveform Display Panel:** Sağdaki ana grafik ekranı. Sinyallerin zaman eksenindeki (\`ps\`, \`ns\`, \`us\`) dijital dalga biçimleri burada çizilir.

Sinyal Görünümünü Özelleştirme:
- **Radix Değiştirme:** Çok bitli veri yollarını ikili (\`Binary\`), onaltılık (\`Hexadecimal\`), onluk işaretli/işaretsiz (\`Signed/Unsigned Decimal\`) veya ASCII formatında görüntüleme.
- **Renk ve Çizgi Tipi:** Kritik saat sinyallerini sarı, sıfırlama hatlarını kırmızı, veri yollarını yeşil yaparak görsel ayrışım sağlama.`,
      },
      {
        title: "5. Dalga Biçimi Üzerinde Donanım Hatalarını Yakalama",
        content: `GTKWave yalnızca sinyal izlemek için değil, donanım hatalarını teşhis etmek için bir tanı aracıdır:
- **Gereksiz Kısa Sinyal Geçişleri (Glitches):** Kombinasyonel mantık yollarındaki dengesiz yayılma gecikmeleri nedeniyle bir sinyalin çok kısa süreliğine yanlış değere zıplayıp geri dönmesi. GTKWave'de ani darbe çizgileri olarak görülür.
- **Yarış Durumları (Race Conditions):** Aynı saat kenarında iki farklı bloğun birbirine bağımlı sinyalleri yanlış sırada güncellemesi sonucu oluşan 1 döngülük gecikme veya veri kaybı.
- **Saat Alanı Geçişi (Clock Domain Crossing - CDC) Hataları:** Hızlı saat alanından yavaş saat alanına aktarılan darbelerin örneklenemeden kaybolması (pulse swallowing).
- **Bilinmeyen Değerler (X ve Z):** Başlatılmamış yazmaçlar veya aynı hatta birden fazla sürücünün çakışması sonucu oluşan kırmızı \`X\` çizgileri.`,
      },
      {
        title: "6. İşaretleyiciler (Markers), Oturum Dosyaları (.gtkw) ve Sistemli İş Akışı",
        content: `Verimli bir dalga biçimi analizi için şu pratik teknikler kullanılmalıdır:
- **Zaman Ölçüm İmleçleri (Markers):** Dalga ekranına fareyle tıklanarak bir birincil imleç, ardından sağ tıklama veya orta tuşla ikincil imleçler bırakılabilir. İki imleç arasındaki zaman farkı (\`Delta Time\`) ve frekans (\`1/Delta\`) GTKWave alt çubuğunda anlık olarak gösterilir. Bu yöntemle saat periyodu ve darbe genişliği (pulse width) doğrudan ölçülür.
- **Oturum Dosyaları (\`.gtkw\`):** Onlarca sinyali seçip renklerini ve radikslerini ayarladıktan sonra GTKWave kapatıldığında bu ayarlar kaybolur. Bunu önlemek için \`File -> Write Save File\` seçeneğiyle bir \`.gtkw\` dosyası kaydedilir. Gelecek simülasyonlarda:
\`\`\`bash
gtkwave waveform.vcd session.gtkw &
\`\`\`
komutuyla oturum açıldığında tüm sinyal düzeni ve imleçler anında geri yüklenir.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **GTKWave ile Dalga Biçimi (Waveform) Analizi ve Hata Ayıklama** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "waveform-analysis-with-gtkwave.v - Örnek RTL / Sentez Kodu",
          snippet: `$date Mon Nov 10 2025 $end $timescale 1ns $end $scope module testbench $end $var wire 1 ! clk $end $var wire 8 " data [7:0] $end $upscope $end #0 0! b00000000 " #5 1! #10 0! b00001010 "`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: GTKWave ile Dalga Biçimi (Waveform) Analizi ve Hata Ayıklama",
      initialCode: `$date Mon Nov 10 2025 $end $timescale 1ns $end $scope module testbench $end $var wire 1 ! clk $end $var wire 8 " data [7:0] $end $upscope $end #0 0! b00000000 " #5 1! #10 0! b00001010 "`,
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
      question: "Bir Verilog testbench dosyasında simülasyon sinyallerinin tüm hiyerarşisiyle birlikte `waves.vcd` adlı dosyaya dökülmesini sağlayan standart ikili sistem görevi çağrısı hangisidir?",
      options: ["$dumpfile(\"waves.vcd\"); $dumpvars(0, tb_top);", "$open_wave(\"waves.vcd\"); $log_all_signals();", "$monitor(\"waves.vcd\"); $display(tb_top);", "$vcd_record(\"waves.vcd\", ALL_HIERARCHY);"],
      correctIndex: 0,
      explanation: "IEEE Verilog standardında `$dumpfile(\"dosya_adi.vcd\")` hedef dosya adını belirler; `$dumpvars(0, modül_adi)` ise ilk parametresi olan '0' derinliği sayesinde belirtilen kök modülün tüm alt hiyerarşilerindeki sinyalleri VCD kaydına dahil eder.",
    },
  },
  "simulation-vs-reality": {
    id: "simulation-vs-reality",
    badge: "Modül 2 • Icarus Verilog ile Simülasyon",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Simülasyon ve Fiziksel Gerçeklik: Sıfır Gecikme Modellerinin Sınırları",
    subtitle: "RTL sıfır gecikmeli (zero-delay) simülasyon varsayımları, delta döngüleri (delta cycles), kapı seviyesi benzetim (GLS) ve silikon üzerinde ortaya çıkan fiziksel etkiler.",
    sections: [
      {
        title: "1. Simülasyon Paradoksu: Kusursuz Kod vs Fiziksel Silikon",
        content: `Dijital tasarım mühendislerinin karşılaştığı en büyük yanılgılardan biri şudur: *"Simülasyonda mükemmel çalışan bir tasarım, gerçek silikonda da mutlaka çalışır."* Gerçek dünyada bu varsayım felaketle sonuçlanabilir.

RTL simülasyonu mantıksal ve matematiksel bir soyutlamadır. İdealize edilmiş bir dünyada elektrik sinyallerinin kablolarda ışık hızından hızlı yayıldığı, transistörlerin sıfır nanosaniyede açılıp kapandığı, besleme geriliminin her noktada kusursuz sabit kaldığı ve saat darbelerinin tüm çipe aynı pikosaniyede ulaştığı varsayılır. Oysa fiziksel silikon; parazitik dirençler, kapasitanslar, sıcaklık dalgalanmaları ve üretim toleranslarıyla yönetilen analog bir ortamdır.`,
      },
      {
        title: "2. Sıfır Gecikme (Zero-Delay) Modeli ve Delta Döngüsü Mekanizması",
        content: `Davranışsal RTL simülatörlerinin ezici çoğunluğu **Sıfır Gecikme Modeli (Zero-Delay Model)** ile çalışır. Bu modelde bir mantık kapısının girişindeki değişim, çıkışa hiçbir fiziksel zaman (\`t = t + 0ns\`) harcamadan yansır.

Peki simülatör aynı simülasyon zaman adımında gerçekleşen yüzlerce mantıksal bağımlılığı nasıl sıraya koyar? Cevap: **Delta Döngüleri (Delta Cycles)**.
- Delta döngüsü, simülasyon zamanını ilerletmeyen (\`Delta_t = 0\`) yapay bir hesaplama adımıdır.
- Örneğin A sinyali B'yi, B sinyali C'yi tetikliyorsa; simülatör \`t = 10ns\` zamanında önce A'yı günceller (Delta 0), ardından bu güncellemenin sonucu olarak B'yi hesaplar (Delta 1), son olarak C'yi hesaplar (Delta 2). Dışarıdan bakıldığında tüm bu olaylar tam olarak \`t = 10ns\` anında gerçekleşmiş gibi görünür.`,
      },
      {
        title: "3. Delta Döngüsü Tuzakları ve Yarış Koşulları (Race Conditions)",
        content: `Delta döngülerinin simülasyondaki yapaylığı, tasarımcının kodlama stiline bağlı ölümcül yarış koşullarına yol açabilir:
- **Bloklayan vs Bloklamayan Atamalar:** Sıralı mantık (\`always @(posedge clk)\`) bloklarında bloklayan atama (\`=\`) kullanıldığında, aynı saat vuruşunda çalışan iki \`always\` bloğunun yürütülme sırası simülatörün iç algoritmasına bağlı kalır. Bir simülatör ilk bloğu Delta 0'da çalıştırıp ikinci bloğa yeni veriyi geçirirken, başka bir simülatör tam tersini yapabilir. Bu durum simülatörler arasında tutarsızlığa yol açar.
- **Çözüm (IEEE Kuralı):** Sıralı mantıkta istisnasız **bloklamayan atama (\`<=\`)**, kombinasyonel mantıkta ise **bloklayan atama (\`=\`)** kullanılmalıdır. Bloklamayan atamalar, sağ taraftaki ifadelerin değerini mevcut delta adımında okur ancak sol taraftaki değişkenlere atamayı NBA (Non-Blocking Assignment) güncelleme fazına bırakarak yarış durumlarını tamamen engeller.`,
      },
      {
        title: "4. Davranışsal Simülasyonun Göremediği Fiziksel Kusurlar",
        content: `Davranışsal simülatörlerin yapısı gereği göremediği ve tasarımcıyı sahte bir güven duygusuna ittiği fiziksel gerçekler şunlardır:
- **Yayılma Gecikmeleri (Propagation Delays):** Mantık kapılarının transistör boyutlarına ve çıkış yük kapasitansına bağlı gerçek gecikmeleri RTL seviyesinde yoktur.
- **Kablo Gecikmeleri ve Parazitik Etkiler:** Çip üzerindeki mikroskobik bakır hatların direnç ve kapasitansları (RC gecikmeleri) sinyali geciktirir ve bozar.
- **Sinyal Eğimi (Slew / Transition Time):** Gerçek dünyada sinyaller anında 0'dan 1'e sıçramaz; sonlu bir yükselme (rise) ve düşme (fall) süresine sahiptir.
- **Saat Kayması (Clock Skew) ve Saat Titremesi (Jitter):** Saat dağıtım ağacındaki fiziksel yol uzunlukları farklı olduğundan, saat sinyali farklı flip-flop'lara farklı zamanlarda varır.`,
      },
      {
        title: "5. Gerçek Dünyada Arıza Modları: CDC, Reset ve Asenkron Girişler",
        content: `Sıfır gecikmeli simülasyonda asla hata vermeyen ancak gerçek çipte sistemi kilitleyen tipik arıza modları:
- **Saat Alanı Geçişleri (Clock Domain Crossing - CDC):** Birbirinden bağımsız iki farklı saat kaynağıyla (örneğin 100 MHz ve 133 MHz) çalışan bloklar arasında sinyal aktarılırken, hedef flip-flop'un kurulum (setup) veya tutma (hold) penceresi ihlal edilir. Flip-flop **kararsızlık (metastability)** durumuna düşer. Davranışsal simülatör metastabiliteyi modelleyemez ve veriyi anında doğru kabul eder.
- **Reset Dağıtımı ve Çözülmesi (Reset Removal / Recovery):** Asenkron reset sinyali kaldırılırken saatin yükselen kenarına çok yakın bir anda serbest bırakılırsa bazı flip-flop'lar resetten çıkarken bazıları çıkamaz ve durum makinesi (FSM) kilitlenir.
- **Kombinasyonel Geri Besleme Döngüleri (Combinational Loops):** Yazmaçsız döngüsel mantıklar devrenin fiziksel olarak salınım yapmasına (ring oscillator gibi davranmasına) yol açar.`,
      },
      {
        title: "6. Kapı Seviyesi Simülasyon (GLS) ve Doğrulama Piramidi",
        content: `Donanım tasarımında güvenilir bir doğrulama sağlamak için çok katmanlı bir **Doğrulama Piramidi (Verification Pyramid)** uygulanmalıdır:
1. **RTL Simülasyonu:** Mimari ve fonksiyonel mantığın hızlıca doğrulanması (en hızlı aşama).
2. **Statik Analiz (Linting & CDC):** Kodlama hatalarının ve saat alanı geçişlerinin simülasyona gerek kalmadan matematiksel taranması.
3. **Statik Zamanlama Analizi (STA):** En kötü (SS) ve en iyi (FF) proses köşelerinde kurulum ve tutma sürelerinin garanti altına alınması.
4. **Kapı Seviyesi Simülasyon (Gate-Level Simulation - GLS):** Sentez ve yerleşim sonrası elde edilen gerçek SDF (Standard Delay Format) gecikmelerinin ağ listesine yüklenerek simüle edilmesi. GLS; reset senkronizasyonunu, asenkron arayüzleri ve SDF zamanlama ihlallerini doğrudan doğrulamak için son savunma hattıdır.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Simülasyon ve Fiziksel Gerçeklik: Sıfır Gecikme Modellerinin Sınırları** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "simulation-vs-reality.v - Örnek RTL / Sentez Kodu",
          snippet: `assign sum = a + b;`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Simülasyon ve Fiziksel Gerçeklik: Sıfır Gecikme Modellerinin Sınırları",
      initialCode: `assign sum = a + b;`,
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
      question: "Sıfır gecikmeli (zero-delay) RTL simülatörlerinde aynı simülasyon zaman adımında gerçekleşen bağımlı olayların sırayla çözülmesini sağlayan ancak simülasyon zamanını ilerletmeyen mekanizma nedir?",
      options: ["Delta Döngüsü (Delta Cycle)", "Statik Zamanlama Analizi (STA)", "Metastabilite Çözümleme Döngüsü", "Standart Gecikme Formatı (SDF)"],
      correctIndex: 0,
      explanation: "Delta döngüsü (Delta Cycle), olay tabanlı simülatörlerin aynı zaman adımında (Delta_t = 0) gerçekleşen mantıksal olayları sıralı olarak değerlendirmek ve kararlı duruma ulaşmak için kullandığı yapay değerlendirme döngüsüdür.",
    },
  },
  "introduction-to-verilator": {
    id: "introduction-to-verilator",
    badge: "Modül 3 • Verilator ile Lint ve Doğrulama",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilator'a Giriş: Döngü Hassas C++ Donanım Derleyicisi",
    subtitle: "Verilog/SystemVerilog kodunu yüksek başarımlı C++ modellerine dönüştüren Verilator mimarisi, döngü hassas (cycle-accurate) benzetim ve statik linting temelleri.",
    sections: [
      {
        title: "1. Verilator Nedir? Geleneksel Simülatörlerden Radikal Farkı",
        content: `\`Verilator\`, Wilson Snyder tarafından geliştirilen, donanım tasarım ve doğrulama dünyasının en popüler ve en yüksek başarımlı açık kaynaklı araçlarından biridir. Ancak Verilator, alışılagelmiş simülatörler (Icarus Verilog, ModelSim, VCS) gibi çalışmaz.

Geleneksel simülatörler **Olay Güdümlü (Event-Driven)** çalışır; sinyallerdeki her bir kenar değişimini bir olay kuyruğuna koyar ve zaman çizelgesini adım adım ilerletir. Bu model son derece esnek olsa da büyük SoC (System-on-Chip) tasarımlarında dramatik biçimde yavaşlar.

Verilator ise bir **Transpiler (Kaynak Kod Derleyicisi)** olarak çalışır: Sentezlenebilir Verilog/SystemVerilog kodunu alır, optimize eder ve onu doğrudan yerel makine koduna derlenebilen yüksek başarımlı, çok iş parçacıklı (multithreaded) optimize **C++ veya SystemC sınıflarına** dönüştürür. Ortaya çıkan simülasyon modeli, geleneksel olay güdümlü simülatörlere göre **10 kat ila 100 kat daha hızlı** çalışır.`,
      },
      {
        title: "2. Döngü Hassas (Cycle-Accurate) Simülasyon ve İki Durumlu (2-State) Mantık",
        content: `Verilator'ın sunduğu bu devasa hız artışının arkasında iki temel mühendislik tercihi yatar:
- **Döngü Hassaslık (Cycle-Accurateness):** Verilator, saat döngüleri arasındaki nanosaniyelik ara olayları ve kapı gecikmelerini modellemez. Bunun yerine her saat kenarında devrenin kararlı durumunu bir defada hesaplar. Senkron dijital tasarımlar için bu yaklaşım fonksiyonel olarak %100 doğruluğu korurken gereksiz ara hesaplamaları ortadan kaldırır.
- **İki Durumlu Mantık (2-State Logic: 0 ve 1):** Standart Verilog simülatörleri dört durum (\`0\`, \`1\`, \`X\` - bilinmeyen, \`Z\` - yüksek empedans) kullanır. Bu durum her bit için fazladan bellek ve karmaşık dallanma mantığı gerektirir. Verilator ise donanım sinyallerini doğrudan C++ temel veri tiplerine (\`uint32_t\`, \`uint64_t\`) eşler. Simülasyon iki durumlu (yalnızca 0 ve 1) yürütülür; bu sayede modern işlemcilerin SIMD ve kayıt mimarisi maksimum verimle kullanılır.`,
      },
      {
        title: "3. Verilasyon (Verilation) Süreci: RTL'den C++ Sınıflarına Dönüşüm",
        content: `Verilator'ın donanım kodunu C++ sınıflarına dönüştürme işlemine **Verilation** denir. Bu akış şu adımlarla işler:
1. **Ayrıştırma ve Ön Kontrol:** SystemVerilog kaynak dosyaları okunur ve güçlü bir statik analizden (Linting) geçirilir.
2. **Hiyerarşi Düzleştirme ve Optimizasyon:** Modül hiyerarşisi çözülür, kombinasyonel mantıklar en az işlemci komutuyla çözülecek şekilde optimize edilmiş sıralı C++ ifadelerine dönüştürülür.
3. **C++ Kod Üretimi:** Tasarımın giriş ve çıkış portlarını birer C++ değişkeni olarak barındıran üst düzey bir sınıf (örneğin \`Vtop.h\` ve \`Vtop.cpp\`) oluşturulur.
4. **Derleme:** GCC veya Clang derleyicisi bu C++ dosyalarını ve kullanıcının yazdığı testbench'i derleyerek doğrudan çalıştırılabilir bir ikili dosya (binary) üretir.`,
      },
      {
        title: "4. C++ Testbench Mimarisi ve Saat Döngüsü Sürüş Mantığı",
        content: `Verilator'da testbench Verilog yerine C++ dilinde yazılır. Bu durum yazılım dünyasının tüm gücünü (dosya okuma, soket iletişimi, çok çekirdekli işleme, nesne yönelimli kütüphaneler) donanım test ortamına taşır.

Tipik bir C++ testbench yapısı (\`sim_main.cpp\`):
\`\`\`cpp
#include <verilated.h>
#include "Vcounter.h"
#include <iostream>

int main(int argc, char** argv) {
    VerilatedContext* contextp = new VerilatedContext;
    contextp->commandArgs(argc, argv);
    Vcounter* top = new Vcounter{contextp};

    top->clk = 0;
    top->rst_n = 0;

    // 20 saat döngüsü boyunca simülasyon koştur
    while (!contextp->gotFinish() && contextp->time() < 40) {
        contextp->timeInc(1); // Zamanı 1 adım ilerlet
        top->clk = !top->clk; // Saati tersle
        if (contextp->time() > 4) top->rst_n = 1; // Reseti kaldır

        top->eval(); // Devre durumunu yeniden hesapla
        std::cout << "Zaman: " << contextp->time() 
                  << " Sayac: " << (int)top->count << std::endl;
    }

    top->final();
    delete top;
    delete contextp;
    return 0;
}
\`\`\`
Buradaki \`top->eval()\` fonksiyonu, giriş sinyallerindeki değişiklikleri devrenin tüm mantık yollarına yayan ve çıkışları hesaplayan kalptir.`,
      },
      {
        title: "5. Statik Analiz (Linting) Motoru Olarak Verilator'ın Gücü",
        content: `Verilator yalnızca bir simülatör değil, aynı zamanda yarı iletken endüstrisindeki en yetenekli açık kaynaklı **Linting (Statik Hata Ayıklama)** araçlarından biridir.

Kodda simülasyon koşturmadan bile sadece \`--lint-only\` bayrağı verilerek:
- İstenmeyen mandal (latch) çıkarımları,
- Genişlik uyuşmazlıkları ve bit kırpılmaları,
- Sürülmeyen (undriven) veya okunmayan (unused) sinyaller,
- Kombinasyonel geri besleme döngüleri,
- Yanlış bloklama/bloklamama atama kullanımları
saniyeler içinde tespit edilir. Birçok ticari çip tasarım şirketi, kodlarını depoya göndermeden önce (pre-commit hook) Verilator lint kontrolünden geçirmeyi zorunlu kılar.`,
      },
      {
        title: "6. SoC Doğrulaması, RISC-V Emülasyonu ve Modern CI/CD Akışları",
        content: `Geleneksel bir simülatör ile bir RISC-V işlemci üzerinde Linux önyüklemesi (booting) yapmak günler hatta haftalar sürebilir. Verilator'ın saniyede milyonlarca saat döngüsü yürütebilen C++ modeli sayesinde Linux boot işlemi dakikalar içinde tamamlanabilir.

Ayrıca Verilator:
- **Yazılım-Donanım Eş-Doğrulaması (Co-simulation):** Donanım çekirdeği ile C/C++ yazılım sürücülerinin aynı bellek alanında doğrudan konuşmasını sağlar.
- **Cocotb Entegrasyonu:** Python tabanlı modern testbench çatılarının arkasında hızlı bir arka uç motoru olarak görev yapar.
- **CI/CD Boru Hatları:** GitHub Actions veya GitLab CI üzerinde saniyeler içinde binlerce regresyon testinin koşturulabilmesine imkân tanır.`,
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Verilator'a Giriş: Döngü Hassas C++ Donanım Derleyicisi",
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
      question: "Verilator'ın geleneksel olay güdümlü (event-driven) simülatörlere kıyasla 10 ila 100 kat daha hızlı simülasyon başarımı sağlamasının temel mimari sebebi nedir?",
      options: ["Verilog kodunu doğrudan çok iş parçacıklı C++ sınıflarına dönüştürmesi ve döngü hassas (cycle-accurate) iki durumlu (2-state) bir model kullanması", "Tüm mantık kapılarını GPU donanımında transistör seviyesinde SPICE olarak çözmesi", "Devredeki flip-flop'ları tamamen kaldırıp her şeyi kombinasyonel mantığa indirgemesi", "Yalnızca analog devre bileşenlerini modelleyip dijital saatleri yok sayması"],
      correctIndex: 0,
      explanation: "Verilator, sentezlenebilir Verilog kodunu yüksek düzeyde optimize edilmiş C++ sınıflarına dönüştürür (transpilation). Ara gecikmeleri hesaplamayan döngü hassas yapısı ve 2 durumlu (0/1) doğrudan yerel makine talimatlarını kullanan mimarisi sayesinde devasa bir hız kazanır.",
    },
  },
  "linting-your-design": {
    id: "linting-your-design",
    badge: "Modül 3 • Verilator ile Lint ve Doğrulama",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilator ile Donanım Tasarımında Kapsamlı Linting ve Statik Analiz",
    subtitle: "RTL kodundaki istenmeyen mandalları (latches), kombinasyonel döngüleri, sinyal genişlik uyuşmazlıklarını ve sürülmeyen hatları sentez öncesi tespit etme teknikleri.",
    sections: [
      {
        title: "1. Donanım Tasarımında Statik Analizin (Linting) Önemi",
        content: `Yazılım geliştirmede derleyicinin kod sözdizimini hatasız kabul etmesi programın doğru çalıştığı anlamına gelmez. Benzer şekilde Verilog'da bir tasarımın derlenmesi, onun donanım olarak sentezlenebilir veya hatasız olduğu anlamına gelmez. Hatta Verilog'un gevşek tip kontrolü (loose typing) ve örtük tel tanımlama (implicit wires) kuralları, en ölümcül donanım hatalarının bile sessizce derlenmesine neden olur.

**Linting**, tasarımı simüle etmeden veya sentezlemeden önce kaynak kodun statik kurallar bütününe göre taranmasıdır. Erken aşamada yakalanan bir hata saatlerce süren simülasyon ve sentez döngülerinden tasarruf sağlar; daha da önemlisi silikon revizyonu (respin) riskini sıfıra indirir.`,
      },
      {
        title: "2. Verilator Uyarı Mekanizması ve Komut Satırı Kullanımı",
        content: `Verilator, donanım dünyasındaki en katı ve titiz statik analiz motorlarından birine sahiptir. Bir tasarımı simülasyon ikilisi üretmeden sadece lint kontrolünden geçirmek için \`--lint-only\` seçeneği kullanılır:
\`\`\`bash
verilator --lint-only -Wall my_design.v
\`\`\`
Önemli seçenekler:
- \`--lint-only\`: C++ kodu veya yürütülebilir dosya üretmez; yalnızca statik analiz raporu sunar.
- \`-Wall\`: Tüm temel uyarı kategorilerini etkinleştirir.
- \`-Werror-<uyarı>\`: Belirli bir uyarıyı derlemeyi durduran ölümcül bir hataya (fatal error) dönüştürür (örneğin \`-Werror-LATCH\`).
- \`-Wno-<uyarı>\`: Tasarımcının bilinçli olarak tercih ettiği durumlarda belirli bir uyarıyı susturur (örneğin \`-Wno-UNUSED\`).`,
      },
      {
        title: "3. Sessiz Tasarım Katili: İstenmeyen Mandal (Latch) Çıkarımı",
        content: `ASIC tasarımında en sık rastlanan ve en tehlikeli sentez hatalarından biri **İstenmeyen Mandal (Inferred Latch)** oluşumudur.

Senkron ASIC tasarımlarında bellek elemanı olarak yalnızca saat kenarıyla tetiklenen flip-flop'lar hedeflenir. Seviye tetiklemeli mandallar (latches); saat ağacı kontrolünü zorlaştırır, statik zamanlama analizini (STA) karmaşıklaştırır ve yarış durumlarına davetiye çıkarır.

Bir mandal nasıl ortaya çıkar?
Kombinasyonel bir \`always\` bloğunda (\`always @(*)\`) bir sinyale her olası koşulda değer atanmazsa, sentez aracı sinyalin eski değerini koruması gerektiğini varsayar ve donanıma şeffaf bir mandal yerleştirir:
\`\`\`verilog
// HATALI: LATCH ÜRETİR
always @(*) begin
  if (sel == 2'b00) out = a;
  else if (sel == 2'b01) out = b;
  // sel 2'b10 veya 2'b11 olduğunda 'out' ne olacak? Belirtilmedi -> LATCH!
end
\`\`\`
Verilator burada derhal uyarır:
\`%Warning-LATCH: Latch inferred for signal 'out'\`

Doğru Çözüm:
Bloğun en başında varsayılan bir değer atamak veya eksiksiz bir \`else\` / \`default\` dalı tanımlamaktır:
\`\`\`verilog
// DOĞRU: KOMBİNASYONEL MANTIK
always @(*) begin
  out = 1'b0; // Varsayılan değer
  if (sel == 2'b00) out = a;
  else if (sel == 2'b01) out = b;
end
\`\`\``,
      },
      {
        title: "4. Kombinasyonel Döngüler ve Geri Besleme Hataları (UNOPTFLAT)",
        content: `**Kombinasyonel Döngü (Combinational Loop)**, bir mantık zincirinin çıkışının araya hiçbir flip-flop girmeden tekrar kendi girişine bağlanmasıdır. Bu durum devrenin kararsızlığa düşmesine, yüksek frekansta kontrolsüzce salınmasına ve mantık sentezi araçlarının kilitlenmesine neden olur.

Verilator döngüsel bağımlılıkları tespit ettiğinde şu kritik uyarıyı verir:
\`%Warning-UNOPTFLAT: Unsupported: Signal unoptimizable: Feedback to logic\`

Nedenleri ve Çözümleri:
- Genellikle karmaşık durum makinelerinde veya birbirine çapraz bağlı \`assign\` ifadelerinde yanlışlıkla kendi kendini referans alan sinyallerden kaynaklanır.
- Çözüm: Döngüsel yolun arasına saatle tetiklenen bir yazmaç (flip-flop) yerleştirerek geri beslemeyi senkronize etmektir.`,
      },
      {
        title: "5. Bit Genişliği Uyuşmazlıkları (WIDTH) ve Veri Kırpılma Riskleri",
        content: `Verilog, farklı bit genişliğine sahip değişkenler arasında atama yapılmasına izin veren toleranslı bir dildir. Ancak bu esneklik genellikle tasarımcının gözden kaçırdığı bit kaybı veya taşma hatalarına yol açar.

Verilator \`WIDTH\` uyarısıyla bu uyuşmazlıkları net biçimde yakalar:
\`\`\`verilog
wire [7:0] data_8bit;
wire [3:0] data_4bit;
assign data_4bit = data_8bit; // 8 bitlik veri 4 bite atanıyor!
\`\`\`
Verilator Uyarısı:
\`%Warning-WIDTH: Operator ASSIGNW expects 4 bits on the Assign LHS, but RHS's VARREF 'data_8bit' generates 8 bits.\`

İyi Uygulama Disiplini:
- Genişlik kırpılması bilinçli yapılıyorsa açıkça dilimleme operatörü kullanılmalıdır: \`assign data_4bit = data_8bit[3:0];\`
- Sabit sayılar tanımlanırken mutlaka bit genişliği açıkça belirtilmelidir: \`3\` yazmak yerine \`2'b11\` veya \`4'd3\` yazılmalıdır. Aksi halde Verilog varsayılan olarak 32-bit tamsayı kabul eder ve uyuşmazlık üretir.`,
      },
      {
        title: "6. Kullanılmayan (UNUSED) ve Sürülmeyen (UNDRIVEN) Sinyallerin Yönetimi",
        content: `Büyük tasarımlarda zamanla ölü kodlar ve unutulmuş bağlantılar birikir:
- **\`UNDRIVEN\` Uyarısı:** Tanımlanmış ve okunmakta olan bir telin hiçbir mantık tarafından sürülmediğini gösterir. Gerçek silikonda bu hat havada (floating) kalır ve rastgele gürültü toplar.
- **\`UNUSED\` Uyarısı:** Tanımlanmış ve değer atanmış ancak devrenin hiçbir yerinde okunmayan sinyalleri gösterir. Genellikle bir alt modül portunun yanlış bağlanması veya unutulması neticesinde oluşur.

Bilinçli Olarak Kullanılmayan Hatlar İçin Lint Direktifleri:
Eğer bir modülün belirli çıkış bitleri kasten kullanılmıyorsa kodun içine şu özel yorum direktifi eklenerek Verilator uyarısı profesyonelce susturulabilir:
\`\`\`verilog
/* verilator lint_off UNUSED */
wire [7:0] unused_status;
/* verilator lint_on UNUSED */
\`\`\`
Temiz bir kod tabanında hedef her zaman **sıfır lint uyarısı** olmalıdır.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Verilator ile Donanım Tasarımında Kapsamlı Linting ve Statik Analiz** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "linting-your-design.v - Örnek RTL / Sentez Kodu",
          snippet: `verilator --lint-only -Wall design.v`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Verilator ile Donanım Tasarımında Kapsamlı Linting ve Statik Analiz",
      initialCode: `verilator --lint-only -Wall design.v`,
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
      question: "Kombinasyonel bir `always @(*)` bloğunda bir çıkış sinyaline tüm koşullu dallarda (`if-else` veya `case`) değer atanmadığında sentez aracının donanıma istenmeyen bir mandal (inferred latch) yerleştirmesinin temel nedeni nedir?",
      options: ["Belirtilmeyen durumlarda sinyalin önceki değerini koruması gerektiği varsayıldığı için seviye tetiklemeli bir saklama elemanına ihtiyaç duyulması", "Verilog standardının her zaman flip-flop yerine latch kullanımını zorunlu kılması", "Simülatörün saat frekansını iki katına çıkarmak istemesi", "Kombinasyonel mantığın gücünü azaltmak için dökümhanenin bunu şart koşması"],
      correctIndex: 0,
      explanation: "Kombinasyonel bloklarda bir sinyal tüm dallarda güncellenmezse, donanım mantığı sinyalin mevcut durumunu saklamak zorundadır. Bu durum sentez aracının donanıma istenmeyen bir seviye tetiklemeli mandal (transparent latch) yerleştirmesine neden olur.",
    },
  },
  "verilator-simulation": {
    id: "verilator-simulation",
    badge: "Modül 3 • Verilator ile Lint ve Doğrulama",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilator ile İleri Düzey Simülasyon: C++ Testbench ve İki Durumlu Model",
    subtitle: "Olay güdümlü benzetim ile döngü hassas model arasındaki semantik farklar, C++ wrapper geliştirme, VCD dalga biçimi dökümü ve simülasyon optimizasyonu.",
    sections: [
      {
        title: "1. Olay Güdümlü (Event-Driven) vs Döngü Hassas (Cycle-Accurate) Semantik",
        content: `Verilator'ın sunduğu hızdan tam anlamıyla faydalanmak için onun çalışma semantiğini derinlemesine kavramak gerekir.

Klasik simülatörlerde zaman sürekli bir eksendir; kapıların iç gecikmeleri (gate delay), kablo gecikmeleri ve \`#5\` gibi mikro-gecikmeler olay kuyruğunda tek tek planlanır. Verilator ise donanımı C++ koduna derlerken bütün tasarımı tek bir devasa değerlendirme fonksiyonuna (\`eval()\`) indirger.

Bu felsefede simülasyon bir döngüden (loop) ibarettir:
1. Testbench giriş pinlerine yeni değerler yazar.
2. Saat sinyali kenar değiştirir (\`top->clk = !top->clk\`).
3. \`top->eval()\` çağrılır. Verilator tüm kombinasyonel mantığı ve flip-flop güncellemelerini tek bir geçişte çözer.
4. Çıkış pinleri okunur ve doğrulanır.`,
      },
      {
        title: "2. İki Durumlu (2-State) Gerçekliğin Doğrulama Üzerindeki Etkileri",
        content: `Verilator'da \`X\` (bilinmeyen/tanımsız) ve \`Z\` (yüksek empedans) değerleri yoktur. Tüm değişkenler bellekte sadece \`0\` veya \`1\` olabilir.

Bu durumun doğrulama mühendisliği açısından sonuçları şunlardır:
- **X-Yayılımı (X-Propagation) Görülemez:** Başlatılmamış bir yazmaç standart simülatörde \`X\` üretirken, Verilator'da genellikle \`0\` olarak başlar. Bu durum, reset mantığında eksiklik olan tasarımların Verilator'da yanıltıcı bir şekilde "çalışıyormuş" gibi görünmesine yol açabilir.
- **Çözüm:** Verilator derleme aşamasında \`--x-assign unique\` veya \`--x-initial unique\` bayrağı verilerek başlatılmamış değişkenlere rastgele 0 veya 1 atanması sağlanabilir. Böylece tasarımın reset altyapısı sağlamlaştırılır.
- **Durum Eşitliği (\`===\` ve \`!==\`):** Dört durumlu eşitlik operatörleri Verilator tarafından otomatik olarak standart iki durumlu eşitliğe (\`==\`) dönüştürülür.`,
      },
      {
        title: "3. INITIALDLY ve COMBDLY Uyarılarının Anlamı",
        content: `Verilator kodun sentezlenebilir donanım mantığına tam uymasını bekler. Yanlış atama operatörleri kullanıldığında çok spesifik uyarılar üretir:
- **\`INITIALDLY\` Uyarısı:** Bir \`initial\` bloğu içinde bloklamayan atama (\`<=\`) kullanıldığında verilir. \`initial\` blokları doğası gereği sıralı yazılım adımlarıdır; dolayısıyla burada bloklayan atama (\`=\`) kullanılmalıdır.
- **\`COMBDLY\` Uyarısı:** Kombinasyonel bir blok (\`always @(*)\`) içinde bloklamayan atama (\`<=\`) kullanıldığında ortaya çıkar. Kombinasyonel mantıkta gecikmesiz güncelleme gerektiğinden mutlaka bloklayan atama (\`=\`) kullanılmalıdır.

Bu uyarılar sadece estetik değil, donanımın sentez sonrası fiziksel davranışıyla simülasyon davranışının birebir örtüşmesini sağlayan hayati güvencelerdir.`,
      },
      {
        title: "4. Kapsamlı Bir C++ Testbench Mimarisi",
        content: `Profesyonel bir Verilator testbench ortamı, C++ sınıfları kullanılarak nesne yönelimli ve modüler bir mimariyle kurulur.

Örnek saat ve reset yönetim sınıfı:
\`\`\`cpp
#include <verilated.h>
#include "Vmy_design.h"
#include <memory>

class Testbench {
public:
    std::unique_ptr<Vmy_design> top;
    vluint64_t sim_time = 0;

    Testbench() {
        top = std::make_unique<Vmy_design>();
    }

    void tick() {
        top->clk = 0;
        top->eval();
        sim_time++;

        top->clk = 1;
        top->eval();
        sim_time++;
    }

    void reset() {
        top->rst_n = 0;
        tick();
        tick();
        top->rst_n = 1;
    }
};
\`\`\`
Bu yapı sayesinde test senaryosu Verilog karmaşasından kurtulur; \`tb.reset();\` ve \`tb.tick();\` gibi sade çağrılarla yüksek hızlı donanım sürüşü gerçekleştirilir.`,
      },
      {
        title: "5. Verilator ile VCD Dalga Biçimi Dökümü (VerilatedVcdC)",
        content: `Verilator testbench'i C++ dilinde yazıldığı için VCD dalga biçimi dökümü alma işlemi de C++ tarafında yönetilir. Bunun için Verilator'ın yerleşik \`VerilatedVcdC\` sınıfı kullanılır.

Adım adım VCD entegrasyonu:
1. Verilator komutuna \`--trace\` bayrağı eklenir:
   \`verilator --cc --trace my_design.v --exe sim_main.cpp\`
2. C++ testbench içerisinde izleme nesnesi tanımlanır:
\`\`\`cpp
#include <verilated_vcd_c.h>

Verilated::traceEverOn(true); // İzlemeyi etkinleştir
VerilatedVcdC* tfp = new VerilatedVcdC;
top->trace(tfp, 99); // 99 hiyerarşi derinliği
tfp->open("waveform.vcd");

// Simülasyon döngüsü içinde:
top->eval();
tfp->dump(contextp->time()); // Zaman damgasıyla döküm al

// Simülasyon sonunda:
tfp->close();
\`\`\`
İzleme işlemi simülasyonu bir miktar yavaşlattığından, regresyon testlerinde izleme kapatılabilir; sadece hata oluşan testlerde \`--trace\` açılarak hata ayıklanabilir.`,
      },
      {
        title: "6. Sentezlenebilirlik Disiplini ve Verilator Felsefesi",
        content: `Geleneksel simülatörler sentezlenemeyen birçok Verilog yapısını (\`fork-join\`, kullanıcı tanımlı zamanlama gecikmeleri \`#\`, \`deassign\`) hoşgörüyle karşılar. Ancak Verilator, donanıma dönüştürülemeyecek yapıları ya reddeder ya da görmezden gelir.

Verilator'ın Katı Felsefesi:
- Verilator'da başarıyla derlenen ve sıfır uyarı veren bir RTL kodu, dökümhane sentez araçlarında (Yosys veya Synopsys DC) neredeyse %100 sorunsuz sentezlenir.
- Bu yönüyle Verilator bir "engel" değil, mühendisi endüstriyel sentez standartlarına ve kusursuz RTL disiplinine zorlayan güçlü bir kılavuzdur.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Verilator ile İleri Düzey Simülasyon: C++ Testbench ve İki Durumlu Model** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "verilator-simulation.v - Örnek RTL / Sentez Kodu",
          snippet: `module top; int a = 1; int b = 2; int c = 3; initial begin a <= b; b <= c; c <= a; end endmodule`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Verilator ile İleri Düzey Simülasyon: C++ Testbench ve İki Durumlu Model",
      initialCode: `module top; int a = 1; int b = 2; int c = 3; initial begin a <= b; b <= c; c <= a; end endmodule`,
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
      question: "Verilator simülasyonunda C++ testbench üzerinden VCD dalga biçimi dökümü (waveform trace) alabilmek için Verilator derleme komutuna hangi bayrak eklenmelidir?",
      options: ["--trace", "--vcd-dump-all", "--enable-gtkwave", "--waveform-generate"],
      correctIndex: 0,
      explanation: "Verilator'da dalga biçimi izleme altyapısını etkinleştirmek için derleme komutuna `--trace` bayrağı eklenmelidir. Bu bayrak sayesinde C++ modelinde `trace()` metotları ve `VerilatedVcdC` kütüphane desteği derlenir.",
    },
  },
  "understanding-process-design-kits": {
    id: "understanding-process-design-kits",
    badge: "Modül 4 • Skywater 130nm PDK Mimarisi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Proses Tasarım Kitlerini (PDK) Anlamak: Mantıktan Fiziksel Silikona Köprü",
    subtitle: "PDK bileşenleri, teknoloji dosyaları, DRC/LVS kuralları, açık kaynaklı Skywater 130nm devrimi ve transistör boyutlandırmasının fiziksel temelleri.",
    sections: [
      {
        title: "1. Proses Tasarım Kiti (PDK) Nedir ve Neden Hayatidir?",
        content: `RTL seviyesinde yazdığınız bir Verilog kodu kusursuz çalışabilir; ancak bu kodun gerçek bir silikon çipe (ASIC) dönüşebilmesi için belirli bir yarı iletken üretim fabrikasının (Foundry) üretim parametreleriyle buluşması gerekir.

**Proses Tasarım Kiti (Process Design Kit - PDK)**, bir dökümhanenin belirli bir üretim teknolojisinde (örneğin 130nm, 65nm, 7nm) çip üretebilmesi için çip tasarımcılarına ve EDA yazılımlarına sağladığı kapsamlı dosya, model ve kural kütüphanesidir. PDK; soyut mantık tasarımı dünyası ile katı kuantum fiziği ve malzeme bilimi kurallarıyla yönetilen üretim fabrikası arasındaki resmi köprüdür.`,
      },
      {
        title: "2. Bir PDK'nin Temel Bileşenleri",
        content: `Eksiksiz bir PDK şu ana bileşenleri bünyesinde barındırır:
- **Teknoloji Dosyaları (Technology Files):** Çipte kullanılabilen metal katman sayısı (örneğin 5 veya 6 metal katmanı), dielektrik kalınlıkları, katman dirençleri ve tabaka dirençleri (sheet resistance).
- **Fiziksel Doğrulama Kuralları:**
  - **DRC (Design Rule Checking):** İki metal hat arasındaki minimum mesafe, minimum kablo genişliği gibi litografi sınırlarını denetleyen kurallar.
  - **LVS (Layout Versus Schematic):** Fiziksel yerleşimin (maske çizimi) tasarlanan kapı seviyesi ağ listesiyle elektriksel olarak birebir aynı olup olmadığını denetleyen kurallar.
- **Cihaz Modelleri (Device Models):** Transistörlerin (NMOS, PMOS), diyotların ve pasif elemanların (direnç, kondansatör) farklı sıcaklık ve voltajlardaki davranışlarını simüle eden analog SPICE modelleri.
- **Standart Hücre Kütüphaneleri (Standard Cell Libraries):** Mantık kapılarının (NAND, NOR, DFF) zamanlama, güç ve alan verilerini içeren Liberty (\`.lib\`), LEF ve GDSII dosyaları.`,
      },
      {
        title: "3. Geleneksel Kapalı PDK Düzeni ve Silikon Üretimi Bariyerleri",
        content: `Yarı iletken endüstrisinin ilk 40 yılı boyunca PDK'ler dökümhanelerin (TSMC, GlobalFoundries, Intel, UMC) en sıkı korunan ticari sırlarıydı. Bir PDK'ye erişebilmek için şirketlerin katı Gizlilik Sözleşmeleri (NDA - Non-Disclosure Agreement) imzalaması ve milyonlarca dolarlık üretim hacmi taahhüt etmesi gerekirdi.

Bu kapalı ekosistem:
- Üniversitelerin ve bağımsız araştırmacıların gerçek silikon üzerinde deneysel çipler üretmesini imkânsız hale getirmiş,
- Açık kaynaklı EDA yazılımlarının gerçek dökümhane verileriyle test edilmesini engellemiş,
- Donanım girişimciliğinin önünde devasa bir sermaye bariyeri oluşturmuştu.`,
      },
      {
        title: "4. Skywater 130nm Devrimi: İlk Açık Kaynaklı PDK",
        content: `2020 yılında Google ve ABD merkezli SkyWater Technology dökümhanesi iş birliği yaparak yarı iletken tarihinde bir ilke imza attı: **SkyWater 130nm PDK** (kod adı \`sky130\`), Apache 2.0 açık kaynak lisansıyla kamuoyuna sunuldu.

Bu devrimin tarihi önemi:
- İnternet erişimi olan herhangi bir mühendis veya öğrenci, hiçbir NDA imzalamadan dökümhanenin tüm DRC kurallarını, transistör SPICE modellerini ve standart hücre kütüphanelerini GitHub'dan indirebilir hale geldi.
- Google, bu PDK ile tasarlanan açık kaynaklı çiplerin masraflarını karşılayarak ücretsiz üretim programları (Google Open MPW Shuttles) başlattı ve binlerce açık kaynak çip üretilerek paketlendi.`,
      },
      {
        title: "5. Teknoloji Düğümü (Node) Efsanesi: '130nm' Gerçekte Ne Demektir?",
        content: `Yarı iletken sektöründe "130nm", "7nm", "3nm" gibi isimler sıkça telaffuz edilir. Ancak bu isimlendirme günümüzde saf bir fiziksel ölçüden ziyade bir pazarlama terimidir.

Tarihsel Gelişim:
- 1980 ve 1990'larda teknoloji düğümü, transistörün fiziksel **kapı uzunluğunu (gate length - L)** birebir temsil ediyordu. Örneğin 500nm bir proseste transistörün polisin kapı uzunluğu gerçekten 500 nanometreydi.
- 90nm'nin altına inildikçe ve FinFET/GAA mimarilerine geçildikçe dökümhaneler isimleri eşdeğer yoğunluk artışına göre adlandırmaya başladı; bugün 3nm olarak satılan bir transistörün hiçbir fiziksel parçası 3 nanometre değildir.

Skywater 130nm Gerçeği:
Skywater 130nm prosesi olgun (mature) bir düzlemsel (planar) CMOS teknolojisidir. Burada 130nm, transistör kanalının güvenilir biçimde üretilebilen minimum kapı uzunluğunu (L_min = 130 nm) ifade eder. İçerisinde 5 metal katmanı (1 yerel ara bağlantı + 4 bakır/alüminyum metal katmanı) barındırır ve 1.8V mantık seviyesi ile 5.0V I/O seviyesini destekler.`,
      },
      {
        title: "6. Açık PDK'lerin Donanım Mühendisliğine ve Senteze Etkisi",
        content: `Skywater 130nm gibi açık bir PDK üzerinde çalışmak, bir mantık tasarımcısının sentez kararlarını doğrudan etkiler:
- **Alan Bilinci:** Belirli bir mantık bloğunun silikonda kaç mikrometrekare alan kaplayacağı tam olarak bilinir.
- **Zamanlama Gerçekçiliği:** Yosys ve OpenSTA gibi araçlar, dökümhanenin gerçek silikon ölçümlerinden türetilmiş Liberty dosyalarını kullanarak pikosaniye mertebesinde kesin zamanlama raporları üretir.
- **Uçtan Uca Sentez Başarısı:** RTL'den başlayarak GDSII maske üretimine kadar her adım şeffaf bir şekilde denetlenebilir ve optimize edilebilir.`,
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Proses Tasarım Kitlerini (PDK) Anlamak: Mantıktan Fiziksel Silikona Köprü",
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
      question: "Yarı iletken tasarımında Proses Tasarım Kiti (PDK) kavramını en doğru şekilde açıklayan tanım hangisidir?",
      options: ["Dökümhanenin belirli bir üretim teknolojisinde çip üretilebilmesi için EDA araçlarına ve tasarımcılara sağladığı teknoloji dosyaları, DRC/LVS kuralları, SPICE modelleri ve standart hücre kütüphaneleri bütünüdür.", "Yalnızca C++ testbench kodlarını derlemek için kullanılan bir IDE eklentisidir.", "Sadece FPGA kartlarına bitstream yükleyen bir programlama donanımıdır.", "Mikroişlemcilerin işletim sistemi çekirdeğini oluşturan açık kaynaklı yazılım paketidir."],
      correctIndex: 0,
      explanation: "PDK (Process Design Kit), dökümhanenin belirli bir üretim sürecine (proses) ait fiziksel katman kurallarını (DRC), elektriksel doğrulama verilerini (LVS), analog SPICE modellerini ve standart hücre kütüphanelerini içeren resmi tasarım paketidir.",
    },
  },
  "standard-cell-libraries": {
    id: "standard-cell-libraries",
    badge: "Modül 4 • Skywater 130nm PDK Mimarisi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Standart Hücre Kütüphaneleri (Standard Cell Libraries)",
    subtitle: "Dijital sentezin temel yapı taşları: Fiziksel hücre mimarisi, mantık ve sıralı hücre türleri, sürüş gücü (drive strength) ve Skywater 130nm kütüphane düzeni.",
    sections: [
      {
        title: "1. Standart Hücre Kavramı ve Sayısal Entegre Devrelerdeki Rolü",
        content: `Sayısal entegre devrelerin (ASIC) tasarımında transistörleri tek tek elle çizmek (full-custom layout) günümüzün milyonlarca kapılı çiplerinde pratik değildir. Bunun yerine yarı iletken endüstrisi, modüler ve önceden tasarlanmış yapı taşları olan **Standart Hücreleri (Standard Cells)** kullanır.

Bir standart hücre kütüphanesi; dökümhane veya kütüphane tasarımcıları tarafından transistör seviyesinde en ince ayrıntısına kadar optimize edilmiş, fiziksel maske çizimleri (GDSII), mantıksal davranışları (Verilog) ve elektriksel gecikme/güç modelleri (Liberty \`.lib\`) eksiksiz olarak hazırlanmış bir mantık kapıları koleksiyonudur. Mantık sentezi araçları (\`Yosys\`, \`Synopsys DC\`), tasarımcının yazdığı RTL kodunu doğrudan bu kütüphanedeki hazır hücrelerle inşa eder.`,
      },
      {
        title: "2. Bir Standart Hücrenin Fiziksel Anatomisi",
        content: `Standart hücrelerin en belirleyici fiziksel özelliği **sabit yüksekliktir (fixed cell height)**. Bir kütüphanedeki tüm hücreler (ister 1 transistörlü bir invertör, ister 30 transistörlü bir flip-flop olsun) aynı dikey yüksekliğe sahiptir; değişen tek şey hücrenin yatay genişliğidir (cell width).

Fiziksel Yapı Bileşenleri:
- **Güç Rayları (Power Rails):** Hücrenin en üst sınırında kesintisiz bir \`VDD\` metal şeridi, en alt sınırında ise \`VSS\` (GND) metal şeridi yer alır. Hücreler yan yana dizildiğinde bu raylar otomatik olarak birleşerek çip boyunca kesintisiz bir güç hattı oluşturur.
- **Transistör Bölgeleri:** Hücrenin üst yarısında PMOS transistörler (N-well içinde), alt yarısında ise NMOS transistörler (P-substrate üzerinde) yer alır.
- **Pinler:** Hücrenin giriş ve çıkış bağlantıları (A, B, Y vb.) iç metal katmanında (genellikle Metal 1 veya yerel ara bağlantı Li1) tanımlanır. Bu pinler otomatik yerleşim ve yönlendirme (P&R) araçlarının kolayca bağlanabilmesi için belirli bir ızgara (routing grid) üzerine hizalanır.`,
      },
      {
        title: "3. Bir Hücrenin Farklı Mühendislik Görünümleri",
        content: `Bir standart hücre tek bir dosya değildir; EDA akışının her farklı aşaması için o hücrenin farklı bir soyutlama seviyesindeki görünümü (view) kullanılır:
- **Mantıksal Görünüm (\`.v\`):** Simülatörlerin fonksiyonel doğrulama yapabilmesi için hücrenin mantık denklemini tanımlayan Verilog modeli.
- **Zamanlama ve Güç Görünümü (\`.lib\`):** Mantık sentezi ve STA araçlarının hücre gecikmelerini ve enerji tüketimini hesaplamasını sağlayan Liberty dosyası.
- **Fiziksel Soyutlama Görünümü (\`.lef\`):** Yerleşim ve yönlendirme (P&R) araçları için transistörlerin iç detaylarını gizleyen, yalnızca hücre sınırını (boundary) ve pin konumlarını içeren dosya (Library Exchange Format).
- **Fiziksel Maske Görünümü (\`.gds\` / \`.mag\`):** Çipin dökümhanede üretilebilmesi için tüm difüzyon, polisilikon ve metal katmanlarının tam geometrisini içeren nihai maske verisi.
- **Transistör Seviyesi Görünüm (\`.spice\`):** Karakterizasyon ve analog devre benzetimleri için transistör boyutlarını ve parazitik RC değerlerini içeren ağ listesi.`,
      },
      {
        title: "4. Temel Hücre Türleri: Kombinasyonel, Sıralı ve Özel Hücreler",
        content: `Tipik bir standart hücre kütüphanesi 200 ila 800 arasında farklı hücre tipi barındırır. Bu hücreler üç ana kategoriye ayrılır:
1. **Kombinasyonel Mantık Kapıları:** \`inv\` (değil), \`nand\`, \`nor\`, \`and\`, \`or\`, \`xor\`, \`xnor\`, \`mux\` (çoklayıcı), \`aoi\` (AND-OR-Invert) ve \`oai\` (OR-AND-Invert) karmaşık kapıları.
2. **Sıralı Elemanlar (Sequential Cells):** Saat tetiklemeli flip-flop'lar (\`dfrtp\` - pozitif kenar tetiklemeli, resetli D-FF), tarama özellikli test flip-flop'ları (\`scandff\`) ve seviye tetiklemeli mandallar (\`latch\`).
3. **Özel Hücreler (Special Purpose Cells):** Saat tamponları (clock buffers), gecikme elemanları (delay cells), mantıksal sabit bağlama hücreleri (\`tie-high\`, \`tie-low\`), anten koruma diyotları ve substrat tap hücreleri.`,
      },
      {
        title: "5. Sürüş Gücü (Drive Strength) Çarpanları ve Boyutlandırma",
        content: `Standart hücre isimlerinin sonunda genellikle bir sürüş gücü çarpanı yer alır (örneğin \`sky130_fd_sc_hd__inv_1\`, \`inv_2\`, \`inv_4\`, \`inv_8\`).

Sürüş Gücü Ne Anlama Gelir?
- Bir hücrenin sürüş gücü, çıkış katındaki NMOS ve PMOS transistörlerin genişliğiyle (W) doğrudan orantılıdır.
- \`inv_1\` temel minimum transistör genişliğine sahipken; \`inv_4\`, 4 kat daha geniş transistörlere sahiptir ve 4 kat daha fazla çıkış akımı (\`I_ds\`) sağlayabilir.

Mühendislik Takası (Trade-off):
- **Yüksek Sürüş Gücü (\`_4\`, \`_8\`):** Yüksek yük kapasitanslarını (uzun kabloları veya çok sayıda bağlı kapıyı) çok daha hızlı şarj/deşarj eder; yayılma gecikmesini düşürür ve çıkış eğimini (slew) keskinleştirir. Ancak daha fazla silikon alanı kaplar ve daha yüksek dinamik güç tüketir.
- **Düşük Sürüş Gücü (\`_1\`, \`_2\`):** Minimum alan ve minimum kaçak güç harcar; ancak çıkış yükü arttığında gecikmesi hızla katlanır. Sentez araçları kritik zamanlama yollarında büyük hücreleri, kritik olmayan yollarda ise küçük hücreleri otomatik olarak seçer.`,
      },
      {
        title: "6. Sentez Aracının (Yosys) Hücre Seçme ve Haritalama Mantığı",
        content: `Mantık sentezi sırasında \`Yosys\` (veya ticari sentez araçları), RTL kodundaki mantık ifadelerini kütüphanedeki hücrelere eşlerken (Technology Mapping) çok kriterli bir optimizasyon yürütür:
- **Kombinasyonel Birleştirme:** İki ayrı \`AND\` ve \`NOR\` kapısı kullanmak yerine tek bir \`aoi21\` (AND-OR-Invert) hücresi kullanmak hem transistör sayısını azaltır hem de gecikmeyi düşürür.
- **Yük Analizi:** Sentez aracı bir kapının çıkışına bağlı kapıların toplam giriş kapasitansını (\`C_load\`) toplar ve Liberty dosyasındaki tablolara bakarak bu yükü hedeflenen zamanda sürebilecek en küçük sürüş güçlü hücreyi seçer.
- **Alan ve Güç Kısıtları:** Tasarımcının belirlediği saat frekansı hedefine göre zamanlama kapanımı (timing closure) sağlanırken alan ve güç tüketimi en aza indirilir.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Standart Hücre Kütüphaneleri (Standard Cell Libraries)** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "standard-cell-libraries.v - Örnek RTL / Sentez Kodu",
          snippet: `# Use high-density library read_liberty sky130_fd_sc_hd__tt_025C_1v80.lib # Or for multiple libraries (optimization across options) read_liberty sky130_fd_sc_hd__tt_025C_1v80.lib read_liberty sky130_fd_sc_ms__tt_025C_1v80.lib`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Standart Hücre Kütüphaneleri (Standard Cell Libraries)",
      initialCode: `# Use high-density library read_liberty sky130_fd_sc_hd__tt_025C_1v80.lib # Or for multiple libraries (optimization across options) read_liberty sky130_fd_sc_hd__tt_025C_1v80.lib read_liberty sky130_fd_sc_ms__tt_025C_1v80.lib`,
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
      question: "Bir standart hücre kütüphanesinde aynı mantıksal işlevi gören iki hücreden `inv_4` hücresinin `inv_1` hücresine kıyasla temel farkı ve avantajı nedir?",
      options: ["`inv_4` daha geniş transistörlere sahiptir; yüksek yük kapasitanslarını daha hızlı sürerek gecikmeyi azaltır ancak daha fazla alan ve güç harcar.", "`inv_4` dört farklı giriş portuna sahiptir ve 4-bitlik veriyi aynı anda tersler.", "`inv_4` saat sinyalini 4 katına çıkaran bir frekans çarpanıdır.", "`inv_4` sadece analog sinyalleri işlemek için tasarlanmıştır."],
      correctIndex: 0,
      explanation: "Sürüş gücü çarpanı (örneğin _4), çıkış transistörlerinin genişliğini temsil eder. Transistörler genişledikçe sağlanan akım artar; bu sayede yüksek kapasitif yükler çok daha hızlı sürülerek yayılma gecikmesi düşürülür (alan ve güç maliyeti karşılığında).",
    },
  },
  "cell-documentation": {
    id: "cell-documentation",
    badge: "Modül 4 • Skywater 130nm PDK Mimarisi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Hücre Dokümantasyonu ve Özel Hücreler (Cell Documentation)",
    subtitle: "Hücre veri sayfaları, LEF fiziksel soyutlaması, güç-alan-gecikme takasları ve kritik özel hücreler (Tap, Filler, Antenna, DeCap, Tie, Clock Gating).",
    sections: [
      {
        title: "1. Standart Hücre Dokümantasyonunun Anatomisi",
        content: `Dijital entegre devre tasarımı yapan bir mühendisin en önemli başvuru kaynağı, standart hücre veri sayfaları (datasheets) ve kütüphane dokümantasyonudur.

Her standart hücre dokümantasyonunda şu temel bilgiler yer alır:
- **Mantık Fonksiyonu ve Doğruluk Tablosu (Truth Table):** Giriş kombinasyonlarına karşılık çıkışın aldığı değerler.
- **Şematik ve Transistör Sayısı:** Hücrenin iç yapısındaki NMOS ve PMOS ağının mimarisi.
- **Fiziksel Boyutlar:** Hücrenin mikrometre cinsinden yüksekliği, genişliği ve ızgara adım sayısı (site units / pitches).
- **Pin Kapasitansları:** Her bir giriş pininin dışarıya gösterdiği eşdeğer yük kapasitansı (femtofarad cinsinden).
- **Zamanlama Yayı Yayılma Gecikmeleri:** Farklı giriş eğimleri ve yük kapasitanslarına karşılık gelen gecikme değerleri.`,
      },
      {
        title: "2. Fiziksel Düzen Soyutlaması: LEF Dosyaları ve Satır Yapısı",
        content: `Yerleşim ve yönlendirme (P&R) araçları çip üzerindeki yüz binlerce hücreyi yerleştirirken transistörlerin iç polisin ve difüzyon detaylarıyla ilgilenmez. Bu detaylar gereksiz bellek harcar ve hesaplamaları kilitler. Bunun yerine fiziksel soyutlama standardı olan **LEF (Library Exchange Format)** kullanılır.

LEF Dosyasındaki Kritik Bilgiler:
- **CLASS ve SIZE:** Hücrenin standart hücre sınıfında olduğunu ve geometrik kutu sınırlarını (Bounding Box - örneğin genişlik: 1.38µm, yükseklik: 2.72µm) belirtir.
- **PIN Tanımları:** Metal bağlantı pinlerinin geometrik şekilleri, bulundukları metal katmanı (Layer) ve yönü (INPUT, OUTPUT, INOUT).
- **OBS (Obstruction / Blokaj):** Hücrenin iç bağlantıları için kullanılan metal bölgeler. Yönlendirme aracına *"bu koordinatların üzerinden başka sinyal teli geçirme, hücre içiyle kısa devre olur"* uyarısını verir.`,
      },
      {
        title: "3. Demir Üçgen: Güç, Alan ve Gecikme (PPA) Takas Analizi",
        content: `ASIC tasarımında her mühendislik kararı **PPA (Power, Performance, Area - Güç, Başarım, Alan)** üçgeni etrafında şekillenir:
- **Performans (Gecikme):** Daha hızlı anahtarlama için daha yüksek sürüş gücüne veya düşük eşik gerilimine (LVT) sahip hücreler seçilir.
- **Alan:** Daha büyük hücreler çip alanını (silikon maliyetini) doğrudan artırır.
- **Güç:** Yüksek sürüş gücü dinamik şarj akımını, geniş transistörler ise kapalı durumdaki statik kaçak akımı (leakage) katlar.

Hücre veri sayfası incelenirken tasarımcı bu üç parametre arasındaki optimum dengeyi bularak aşırı boyutlandırmadan (over-design) kaçınır.`,
      },
      {
        title: "4. Özel Hücreler: Tie, Filler ve DeCap Hücreleri",
        content: `Bir standart hücre kütüphanesi sadece mantık kapılarından oluşmaz; devrenin fiziksel ve elektriksel bütünlüğünü sağlayan özel hücreler barındırır:
- **Tie Cells (\`tiehi\`, \`tielo\`):** Mantık '1' veya '0' sabitlerine bağlanması gereken giriş pinleri asla doğrudan \`VDD\` veya \`VSS\` raylarına bağlanmaz. Ani voltaj sıçramaları (ESD ve gürültü) transistörün ince oksit kapısını delip tahrip edebilir. Tie hücreleri, kapı oksitlerini koruyarak güvenli sabit 1 veya 0 voltajı sağlar.
- **Filler Cells (Dolgu Hücreleri):** Yerleşim tamamlandıktan sonra hücreler arasında boşluklar kalır. Dolgu hücreleri mantıksal bir işlev görmez; \`VDD\` ve \`VSS\` güç raylarının sürekliliğini sağlamak, N-kuyusu (N-well) sürekliliğini korumak ve dökümhanenin metal yoğunluk (density) kurallarını sağlamak için bu boşluklara yerleştirilir.
- **DeCap Cells (Ayrıştırma Kondansatörleri):** Güç rayları arasına yerleştirilen entegre MOS kapasitörlerdir. Yüksek hızlı anahtarlamalarda voltaj düşüşlerini (IR drop ve ground bounce) filtrelemek için anlık yerel şarj rezervuarı olarak görev yaparlar.`,
      },
      {
        title: "5. Güvenilirlik Hücreleri: Substrat Tap Hücreleri ve Anten Diyotları",
        content: `Silikon üretiminde ve çalışmasında güvenliği garanti altına alan hayati hücreler:
- **Tap Cells (\`tapvpwrvgnd\`):** CMOS teknolojisinde parazitik bipolar transistörler (NPN ve PNP) kaçınılmaz olarak oluşur. Bu parazitik yapı tetiklenirse **Latchup** adı verilen ölümcül bir kısa devre meydana gelir ve çip yanarak kalıcı olarak bozulur. Tap hücreleri, substratı \`VSS\`'e ve N-kuyusunu \`VDD\`'ye düşük dirençli kontaklarla bağlayarak latchup riskini tamamen ortadan kaldırır. P&R kuralları gereği belirli aralıklarla (örneğin her 15 mikrometrede bir) düzenli tap hücresi dizilmelidir.
- **Antenna Diode Cells (Anten Hücreleri):** Üretim esnasında plazma aşındırma (plasma etching) yapılırken uzun metal hatlarda statik elektrik yükü birikir. Bu yük bağlı olduğu transistörün ince kapı oksitini delerek çipin fabrikadan bozuk çıkmasına neden olur. Anten diyotu hücreleri, biriken bu statik yükü güvenle substrata deşarj ederek transistörü korur.`,
      },
      {
        title: "6. Saat Ağacı Hücreleri ve Tümleşik Saat Kapılama (ICG)",
        content: `Saat sinyali çip üzerindeki en yüksek frekanslı ve en kritik sinyaldir:
- **Clock Buffers / Inverters (\`clkbuf\`, \`clkinv\`):** Saat ağacında kullanılan tamponlar, standart mantık tamponlarından farklı olarak son derece simetrik yükselme ve düşme sürelerine (\`t_rise = t_fall\`) sahip olacak şekilde özel dengelenmiş transistörlerle üretilir. Bu sayede saat darbe genişliği (duty cycle) bozulmaz.
- **Integrated Clock Gating (ICG - Tümleşik Saat Kapılama):** Bir dijital devrede dinamik gücün %40'tan fazlasını saat ağı tüketir. İlgili yazmaç bloğuna veri yazılmadığı döngülerde saat sinyalini durdurmak için ICG hücreleri kullanılır. ICG hücresi bir mandal (latch) ve bir AND kapısını tek bir standart hücre içinde birleştirerek saat hattında ölümcül geçici bozulmaların (glitch) oluşmasını önler.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Hücre Dokümantasyonu ve Özel Hücreler (Cell Documentation)** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "cell-documentation.v - Örnek RTL / Sentez Kodu",
          snippet: `library (sky130_fd_sc_hd__tt_025C_1v80) { technology : cmos; delay_model : table_lookup; /* Library-level defaults */ voltage : 1.80; temperature : 25; /* Units */ time_unit : "1ns"; voltage_unit : "1V"; current_unit : "1mA"; capacitive_load_unit (1, pf); /* Operating conditions */ operating_conditions (tt_025C_1v80) { process : 1.0; temperature : 25; voltage : 1.80; } /* Individual cell descriptions */ cell (sky130_fd_sc_hd__inv_1) { /* Cell characteristics */ } cell (sky130_fd_sc_hd__nand2_1) { /* Cell characteristics */ } /* ... hundreds more cells ... */ }`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Hücre Dokümantasyonu ve Özel Hücreler (Cell Documentation)",
      initialCode: `library (sky130_fd_sc_hd__tt_025C_1v80) { technology : cmos; delay_model : table_lookup; /* Library-level defaults */ voltage : 1.80; temperature : 25; /* Units */ time_unit : "1ns"; voltage_unit : "1V"; current_unit : "1mA"; capacitive_load_unit (1, pf); /* Operating conditions */ operating_conditions (tt_025C_1v80) { process : 1.0; temperature : 25; voltage : 1.80; } /* Individual cell descriptions */ cell (sky130_fd_sc_hd__inv_1) { /* Cell characteristics */ } cell (sky130_fd_sc_hd__nand2_1) { /* Cell characteristics */ } /* ... hundreds more cells ... */ }`,
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
      question: "CMOS teknolojisinde parazitik transistörlerin tetiklenmesiyle ortaya çıkan ve çipin güç rayları arasında kalıcı kısa devreye yol açarak fiziksel olarak yanmasına sebep olan ölümcül 'Latchup' arızasını önlemek için standart hücre satırlarına düzenli aralıklarla yerleştirilen özel hücre hangisidir?",
      options: ["Tap Hücresi (Substrate/Well Tap Cell)", "Filler Hücresi (Dolgu Hücresi)", "Anten Diyotu Hücresi (Antenna Diode)", "Tie-High Hücresi (Sabit 1 Hücresi)"],
      correctIndex: 0,
      explanation: "Substrat ve N-kuyusu tap hücreleri (Well Tap Cells), substratı toprağa (VSS) ve N-kuyusunu beslemeye (VDD) düşük dirençle bağlayarak parazitik bipolar transistörlerin iletime geçmesini engeller ve CMOS latchup felaketini önler.",
    },
  },
  "library-variants": {
    id: "library-variants",
    badge: "Modül 4 • Skywater 130nm PDK Mimarisi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Kütüphane Varyantları: Teknoloji Düğümünde Performans, Alan ve Güç Optimizasyonu",
    subtitle: "Farklı hücre yükseklikleri (hd, hs, ms), eşik gerilimi (Vt) mühendisliği ve Skywater 130nm kütüphane varyantları arasında stratejik seçim rehberi.",
    sections: [
      {
        title: "1. Neden Birden Çok Kütüphane Varyantı Vardır?",
        content: `Aynı dökümhanede, aynı 130nm silikon plaka (wafer) üzerinde üretilen iki farklı çip birbirine taban tabana zıt hedeflere sahip olabilir:
- Biri pille çalışan bir tıbbi cihaz veya IoT sensörüdür; amacı minimum güç tüketmek ve en küçük alana sığmaktır (hız önemsizdir).
- Diğeri ise yüksek frekansta çalışan bir haberleşme işlemcisidir; amacı ne pahasına olursa olsun maksimum çalışma frekansına ulaşmaktır.

Tek bir standart hücre kütüphanesinin tüm bu zıt hedefleri aynı anda optimum karşılaması fizik kuralları gereği mümkün değildir. Bu nedenle yarı iletken dökümhaneleri aynı teknoloji düğümü içerisinde farklı mimari önceliklere sahip **Kütüphane Varyantları (Library Variants)** sunar.`,
      },
      {
        title: "2. Transistör Boyutlandırması ve Hücre Yüksekliği (Cell Height) Farklılıkları",
        content: `Kütüphane varyantları arasındaki en temel fiziksel ayrım **Hücre Yüksekliğidir (Cell Height)**:
- Hücre yüksekliği standart yönlendirme kanallarının (routing tracks) adediyle ölçülür (örneğin 7-track, 9-track, 12-track).
- **Kısa Hücreler (Düşük Track - örneğin 7T / 2.72µm):** Hücre içi dikey alan dardır; bu nedenle transistör genişlikleri küçüktür. Sonuç: Ultra yüksek mantık yoğunluğu (High Density), minimum kaçak akım, ancak daha sınırlı akım sürüş kapasitesi.
- **Uzun Hücreler (Yüksek Track - örneğin 12T / 4.8µm - 6.0µm):** Hücre içi dikey alan geniştir; devasa transistörler yerleştirilebilir. Sonuç: Çok yüksek sürüş akımı, süper hızlı anahtarlama (High Speed), ancak büyük silikon alanı ve yüksek güç tüketimi.`,
      },
      {
        title: "3. Eşik Gerilimi (Vt) Mühendisliği: SVT, LVT ve HVT",
        content: `Transistörlerin açılma eşik voltajı (Threshold Voltage - \`V_th\`), litografi aşamasında uygulanan katkılama (doping) konsantrasyonuyla hassas bir şekilde ayarlanabilir:
- **Düşük Eşik Gerilimi (Low-Vt / LVT):** Transistör çok düşük kapı voltajında hızla iletime geçer. Anahtarlama son derece hızlıdır; yüksek frekanslı kritik yollar için mükemmeldir. Ancak dezavantajı: Kapalı olduğu durumlarda bile üzerinden sızan **statik kaçak akım (leakage) logaritmik olarak katlanır**.
- **Yüksek Eşik Gerilimi (High-Vt / HVT):** Transistörün açılması daha yüksek voltaj ve zaman gerektirir (daha yavaştır). Ancak kapalıyken kaçak akım sıfıra yakındır. Pille çalışan sistemler ve zamanlama marjı geniş yollar için idealdir.
- **Standart Eşik Gerilimi (Standard-Vt / SVT):** Hız ile kaçak güç arasında dengeli endüstri standardı referans noktasıdır.`,
      },
      {
        title: "4. Skywater 130nm Standart Hücre Kütüphane Ailesi",
        content: `Skywater 130nm açık kaynaklı PDK'sinde (\`sky130_fd_sc_...\`) dökümhane tarafından hazırlanmış 5 temel kütüphane varyantı yer alır:
- **\`sky130_fd_sc_hd\` (High Density):** Standart 2.72 µm yükseklik (7-track). Açık kaynaklı çip tasarımlarında varsayılan (default) seçenektir. En yüksek transistör yoğunluğunu sunar; RISC-V SoC'ler ve genel mantık blokları için dengeli en iyi çözümdür.
- **\`sky130_fd_sc_hs\` (High Speed):** Yaklaşık 6.0 µm yükseklik. Maksimum saat frekansı hedefleyen, geniş transistörlü yüksek başarımlı kütüphane.
- **\`sky130_fd_sc_ms\` (Medium Speed):** 4.8 µm yükseklik. Hız ile alan arasında orta kademe bir optimizasyon sunar.
- **\`sky130_fd_sc_ls\` (Low Speed / Low Power):** 2.72 µm yükseklik. Düşük güç tüketimi ve minimum kaçak için özel transistör boyutlandırması içerir.
- **\`sky130_fd_sc_hdll\` (High Density Low Leakage):** Yüksek yoğunluk ile ultra düşük kaçak akımı birleştiren, bekleme (standby) süresi uzun cihazlar için optimize varyant.`,
      },
      {
        title: "5. Hibrit ve Çoklu Kütüphane Stratejileri",
        content: `Modern gelişmiş ASIC tasarımlarında tek bir kütüphane varyantına mahkûm kalınmaz; **Çoklu Kütüphane Optimizasyonu (Multi-Vt / Multi-Library Optimization)** uygulanır:
- Sentez ve STA aracı devredeki tüm mantık yollarını analiz eder.
- **Kritik Yollar (Critical Paths):** Kurulum süresi (setup time) sıkışık olan en kritik %5-%10'luk yollara hızlı, düşük eşik gerilimli (\`hs\` veya \`LVT\`) hücreler yerleştirilir.
- **Geri Kalan Mantık:** Zamanlama payı (slack) rahat olan geriye kalan %90'lık kısma yüksek yoğunluklu veya düşük kaçaklı (\`hd\` / \`HVT\`) hücreler yerleştirilir.
Bu hibrit strateji sayesinde çipin toplam çalışma frekansı korunurken, toplam kaçak güç tüketimi %60-%80 oranında düşürülebilir.`,
      },
      {
        title: "6. Kütüphane Seçim Karar Ağacı ve Sentez Komutları",
        content: `Bir projeye başlarken kütüphane seçimi rastgele yapılmaz. Şu sistematik karar adımları izlenir:
1. **Birincil Kısıtı Belirle:** Projenin birincil kısıtı silikon alanı ve maliyet mi, yoksa zorlu bir saat frekansı mı?
2. **Temel Sentez:** Tasarım öncelikle standart \`sky130_fd_sc_hd\` kütüphanesiyle sentezlenir. Yosys komut satırında:
\`\`\`tcl
read_liberty -lib sky130_fd_sc_hd__tt_025C_1v80.lib
synth -top my_design
dfflibmap -liberty sky130_fd_sc_hd__tt_025C_1v80.lib
abclib -liberty sky130_fd_sc_hd__tt_025C_1v80.lib
\`\`\`
3. **STA Sonuçlarını İncele:** Eğer \`hd\` kütüphanesiyle yapılan sentezde zamanlama rahatça kapanıyorsa başka varyanta gerek yoktur. Eğer kritik yollarda negatif slack oluşuyorsa sadece ilgili bloklar için \`ms\` veya \`hs\` varyantlarına geçilir.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Kütüphane Varyantları: Teknoloji Düğümünde Performans, Alan ve Güç Optimizasyonu** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "library-variants.v - Örnek RTL / Sentez Kodu",
          snippet: `Example: inv_1 (inverter) - Area: 1.07 µm² - Delay (typical): ~25 ps @ 10fF load - Leakage: 2.1 nW - Max drive: ~15 fF`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Kütüphane Varyantları: Teknoloji Düğümünde Performans, Alan ve Güç Optimizasyonu",
      initialCode: `Example: inv_1 (inverter) - Area: 1.07 µm² - Delay (typical): ~25 ps @ 10fF load - Leakage: 2.1 nW - Max drive: ~15 fF`,
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
      question: "Skywater 130nm PDK kütüphane varyantları arasında yer alan `sky130_fd_sc_hd` kütüphanesinin temel tasarım hedefi ve en belirgin fiziksel avantajı nedir?",
      options: ["2.72 µm standart hücre yüksekliğiyle maksimum silikon alanı tasarrufu ve en yüksek transistör yoğunluğu (High Density) sağlamak", "Yalnızca 1 GHz üzerindeki RF analog devreleri çalıştırmak", "Hücre yüksekliğini 12 mikrometreye çıkararak transistör akımlarını maksimize etmek", "Saat frekansını artırmak için transistör kaçak akımlarını serbest bırakmak"],
      correctIndex: 0,
      explanation: "`sky130_fd_sc_hd` (High Density), 2.72 µm hücre yüksekliği ve kompakt 7-track mimarisiyle silikon alanını en verimli şekilde kullanan ve en yüksek kapı yoğunluğunu sunan varsayılan Skywater kütüphanesidir.",
    },
  },
  "introduction-to-liberty-format": {
    id: "introduction-to-liberty-format",
    badge: "Modül 5 • Liberty (.lib) Dosyaları ve Zamanlama Modelleri",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Liberty (.lib) Formatına Giriş: Zamanlama ve Güç Modellemesinin Standardı",
    subtitle: "Synopsys Liberty (.lib) dosya sözdizimi, grup hiyerarşisi, arama tablosu (look-up table) şablonları ve STA ile mantık sentezindeki kritik rolü.",
    sections: [
      {
        title: "1. Liberty (.lib) Formatı Nedir ve Dijital Tasarım Akışındaki Yeri",
        content: `Dijital entegre devre tasarımında mantık sentezi araçları (\`Yosys\`, \`Design Compiler\`) ve Statik Zamanlama Analizi araçları (\`OpenSTA\`, \`PrimeTime\`), standart hücrelerin elektriksel davranışlarını bilmeden hiçbir optimizasyon yapamaz. Bir NAND kapısının girişine bir sinyal geldiğinde çıkışın kaç pikosaniye sonra değişeceğini, ne kadar enerji harcayacağını bilmek zorundadırlar.

İşte bu elektriksel verileri standart bir formatta sunan endüstri standardı **Liberty Formatıdır (genellikle \`.lib\` uzantılı)**. 1980'lerde Synopsys tarafından geliştirilen ve daha sonra IEEE standardizasyon süreçleriyle açık endüstri standardı haline gelen Liberty formatı, dijital yarı iletken dünyasının en kritik dosya formatıdır.`,
      },
      {
        title: "2. Mantık Sentezi ve Statik Zamanlama Analizinde Liberty Kullanımı",
        content: `Liberty dosyası tasarım akışının iki temel aşamasında merkezi bir rol oynar:
- **Mantık Sentezi (Logic Synthesis):** Sentez aracı Liberty dosyasını okuyarak hangi kapıların mevcut olduğunu, bu kapıların mantıksal fonksiyonlarını (\`function: "(A & B)";\`), giriş kapasitanslarını ve gecikme potansiyellerini öğrenir. Tasarımcının RTL kodunu en az gecikme ve alanla gerçekleştirecek hücre kombinasyonunu bu verilere dayanarak seçer.
- **Statik Zamanlama Analizi (STA):** Yerleşim öncesi ve sonrası tüm saat yollarını, flip-flop kurulum/tutma sürelerini ve kombinasyonel gecikmeleri Liberty tablolarındaki kesin değerleri arayarak veya enterpole ederek hesaplar. Zamanlama kapanımı (timing closure) Liberty dosyası olmadan imkânsızdır.`,
      },
      {
        title: "3. Liberty Sözdizimi Temelleri: Gruplar, Öznitelikler ve Değerler",
        content: `Liberty dosyası ASCII metin tabanlı, hiyerarşik ve blok yapılı (group-based) bir sözdizimine sahiptir:
- **Gruplar (Groups):** Süslü parantezlerle (\`{ ... }\`) tanımlanan hiyerarşik nesnelerdir. Örneğin \`library (adi) { ... }\`, \`cell (nand2) { ... }\`, \`pin (Y) { ... }\`, \`timing () { ... }\`.
- **Basit Öznitelikler (Simple Attributes):** Tek bir değişkene değer atar: \`time_unit : "1ns";\`, \`capacitive_load_unit (1, pf);\`.
- **Karmaşık Öznitelikler (Complex Attributes):** Parantez içinde virgülle ayrılmış parametre listeleri içerir: \`values ("0.045, 0.052, 0.061", "0.089, 0.102, 0.118");\`.`,
      },
      {
        title: "4. Kütüphane Düzeyi Tanımlamalar ve Birimler (Units)",
        content: `Bir Liberty dosyasının en üst bloğu \`library (...)\` bloğudur ve tüm kütüphane için geçerli global kuralları tanımlar:
\`\`\`text
library (sky130_fd_sc_hd__tt_025C_1v80) {
  technology (cmos);
  delay_model : table_lookup;
  
  /* Ölçü Birimleri */
  time_unit : "1ns";
  voltage_unit : "1V";
  current_unit : "1mA";
  pulling_resistance_unit : "1kohm";
  capacitive_load_unit (1, pf);
  
  /* Çalışma Koşulları */
  nom_process : 1.0;
  nom_temperature : 25.0;
  nom_voltage : 1.80;
  ...
}
\`\`\`
Birim tanımlamaları hayati önem taşır; çünkü tablolardaki sayılar ham rakamlardır. Eğer \`time_unit\` 1ns ise tabloda görülen \`0.05\` değeri 50 pikosaniyeyi (ps) temsil eder.`,
      },
      {
        title: "5. Arama Tablosu Şablonları (lu_table_template)",
        content: `Modern kütüphanelerde gecikmeler sabit bir sayı değildir; giriş sinyalinin eğimine (input slew) ve çıkışa bağlı kapasitif yüke (output capacitance) göre değişir. Liberty bu doğrusal olmayan davranışı modellemek için **Arama Tabloları (Look-Up Tables - LUT)** kullanır.

Önce kütüphane seviyesinde bir şablon tanımlanır:
\`\`\`text
lu_table_template(delay_template_5x5) {
  variable_1 : input_net_transition;
  variable_2 : total_output_net_capacitance;
  index_1 ("0.01, 0.05, 0.15, 0.40, 1.00");
  index_2 ("0.001, 0.010, 0.030, 0.080, 0.200");
}
\`\`\`
Burada \`index_1\` giriş eğimi değerlerini (ns), \`index_2\` ise çıkış yük kapasitansı değerlerini (pF) belirler. Hücrelerin içindeki zamanlama tabloları bu 5x5 matris şablonunu referans alarak 25 adet kesin gecikme değerini listeler.`,
      },
      {
        title: "6. Hücre, Pin ve Zamanlama Yaylarının (Timing Arcs) Yapısı",
        content: `Kütüphane içinde her bir kapı \`cell (...)\` grubu altında tanımlanır:
- Hücrenin alanı (\`area : 4.56;\`), kaçak gücü (\`cell_leakage_power : 0.125;\`).
- Her bir bacak için \`pin (A)\` grubu açılır: Yönü (\`direction : input;\`), giriş kapasitansı (\`capacitance : 0.0035;\`).
- Çıkış bacağı \`pin (Y)\` altında mantıksal denklem (\`function : "!(A & B)";\`) ve giriş pinlerinden çıkışa uzanan **Zamanlama Yayları (Timing Arcs)** tanımlanır:
\`\`\`text
timing () {
  related_pin : "A";
  timing_sense : negative_unate; /* Giriş 1 olunca çıkış 0 olur */
  cell_rise (delay_template_5x5) {
    values ("0.035, 0.042, 0.058, 0.110, 0.240", ...);
  }
  cell_fall (delay_template_5x5) {
    values ("0.028, 0.034, 0.046, 0.092, 0.198", ...);
  }
}
\`\`\`
Bu hiyerarşik yapı sayesinde EDA araçları devrenin her pikosaniyelik elektriksel davranışını hatasız bir şekilde modeller.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Liberty (.lib) Formatına Giriş: Zamanlama ve Güç Modellemesinin Standardı** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "introduction-to-liberty-format.v - Örnek RTL / Sentez Kodu",
          snippet: `group_name (optional_name) { attribute_name : attribute_value ; subgroup_name (subgroup_params) { ... } }`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Liberty (.lib) Formatına Giriş: Zamanlama ve Güç Modellemesinin Standardı",
      initialCode: `group_name (optional_name) { attribute_name : attribute_value ; subgroup_name (subgroup_params) { ... } }`,
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
      question: "Liberty (.lib) dosyasında bir mantık kapısının gecikmesini hesaplamak için kullanılan arama tablosu şablonunda (lu_table_template) yer alan iki temel eksen değişkeni (variable_1 ve variable_2) genellikle hangi fiziksel büyüklüklerdir?",
      options: ["Giriş sinyali geçiş süresi (input net transition / slew) ve çıkış yük kapasitansı (total output capacitance)", "Silikon plakanın kalınlığı ve fırınlama sıcaklığı", "Saat frekansı ve transistörün seri numarası", "Testbench süresi ve VCD dosya boyutu"],
      correctIndex: 0,
      explanation: "Modern standart hücre gecikme modelleri (NLDM), yayılma gecikmesini giriş sinyalinin eğimine (input transition / slew) ve çıkış pinine bağlı toplam yük kapasitansına (output load capacitance) bağlı iki boyutlu bir arama tablosu olarak modeller.",
    },
  },
  "process-corners-explained": {
    id: "process-corners-explained",
    badge: "Modül 5 • Liberty (.lib) Dosyaları ve Zamanlama Modelleri",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Üretim Köşeleri (Process Corners) ve PVT Değişintileri",
    subtitle: "Silikon üretimindeki fiziksel sapmalar, Proses-Voltaj-Sıcaklık (PVT) köşeleri (SS, TT, FF, SF, FS) ve Multi-Corner Multi-Mode (MCMM) zamanlama analizi.",
    sections: [
      {
        title: "1. Silikon Üretimindeki Fiziksel Değişintiler ve Toleranslar",
        content: `Fotolitografi, iyon ekleme (ion implantation), kimyasal buhar biriktirme ve plazma aşındırma gibi yarı iletken üretim adımları atomik seviyede hassasiyet gerektirir. Ancak hiçbir üretim süreci kusursuz ve homojen değildir.

Bir silikon plaka (wafer) üzerinde transistörlerin fiziksel kapı uzunlukları (L_eff), kapı oksit kalınlıkları (t_ox) ve katkılama konsantrasyonları plakadan plakaya ve hatta aynı plakanın merkezinden kenarına doğru mikroskobik sapmalar gösterir. Bu kaçınılmaz sapmalar, üretilen transistörlerin akım taşıma kapasitelerinde ve anahtarlama hızlarında farklılıklara yol açar.`,
      },
      {
        title: "2. Temel Proses Köşeleri: Yavaş (SS), Nominal (TT) ve Hızlı (FF)",
        content: `Üretimdeki istatistiksel Gaussian dağılımını yönetebilmek için dökümhaneler parametrelerin ±3-sigma sınırlarını modelleyen **Proses Köşeleri (Process Corners)** tanımlar. Köşe isimlendirmesinde ilk harf NMOS transistörün, ikinci harf PMOS transistörün hız durumunu belirtir:
- **TT (Typical-Typical):** Nominal üretim koşullarını temsil eder. Transistörlerin çoğu bu merkez frekansta üretilir.
- **SS (Slow-Slow / En Yavaş Köşe):** Hem NMOS hem PMOS transistörlerin en kalın oksite, en uzun kanala veya en düşük akıma sahip olduğu en kötü durum (Worst-Case). Transistörler son derece yavaş anahtarlar. **Setup (Kurulum) zamanlaması kısıtları mutlaka SS köşesinde doğrulanmalıdır.**
- **FF (Fast-Fast / En Hızlı Köşe):** Hem NMOS hem PMOS transistörlerin minimum kanal uzunluğuna ve en yüksek akıma sahip olduğu en hızlı durum (Best-Case). Transistörler aşırı hızlı anahtarlar. **Hold (Tutma) zamanlaması kısıtları mutlaka FF köşesinde doğrulanmalıdır;** çünkü hızlı kapılar veriyi erken aktararak sonraki flip-flop'un tutma süresini ihlal edebilir.`,
      },
      {
        title: "3. Çapraz Köşeler (Cross Corners): SF ve FS Koşulları",
        content: `NMOS ve PMOS transistörler farklı katkılama adımlarından geçtiği için değişimleri her zaman mükemmel senkronize olmaz:
- **SF (Slow NMOS, Fast PMOS):** NMOS yavaş, PMOS hızlıdır.
- **FS (Fast NMOS, Slow PMOS):** NMOS hızlı, PMOS yavaştır.

Bu çapraz köşeler özellikle NMOS ve PMOS çekme/itme dengesine dayanan bellek hücreleri (SRAM bitcell margin), diferansiyel mantıklar, oranlı mantık devreleri (ratioed logic) ve saat ağacı eğim (skew) dengesi açısından kritik risk oluşturur.`,
      },
      {
        title: "4. Voltaj ve Sıcaklık Değişintileri (PVT)",
        content: `Bir çipin hızı sadece silikon üretimine (P - Process) bağlı değildir; çipin çalıştığı ortamın voltajına (V) ve sıcaklığına (T) da doğrudan bağlıdır:
- **Voltaj (Voltage):** Güç kaynağından sağlanan nominal 1.8V gerilim, çip içi dirençler ve yük değişimleri nedeniyle ±%10 oynayabilir (1.62V - 1.98V). Düşük voltaj transistör akımını azaltır ve devreyi yavaşlatır.
- **Sıcaklık (Temperature):** Çip -40°C ortam sıcaklığında da çalışabilir, aşırı yük altında 125°C kavurucu sıcaklıkta da çalışabilir. Geleneksel teknolojilerde yüksek sıcaklık elektronların saçılmasını artırarak (azalan mobilite) transistörü yavaşlatır.
- **PVT Matrisi:** Tasarım üç parametrenin en olumsuz kombinasyonlarında kapatılır:
  - *En Yavaş PVT (Setup):* SS proses + 1.62V (düşük voltaj) + 125°C (yüksek sıcaklık).
  - *En Hızlı PVT (Hold):* FF proses + 1.98V (yüksek voltaj) + -40°C (düşük sıcaklık).`,
      },
      {
        title: "5. Ters Sıcaklık Bağımlılığı (Temperature Inversion) Olgusu",
        content: `Modern derin mikron altı teknolojilerde (45nm altı ve bazı özel 130nm düşük voltaj durumlarında) şaşırtıcı bir fiziksel olay gerçekleşir: **Ters Sıcaklık Bağımlılığı (Temperature Inversion)**.

Transistör akımı iki faktörün rekabetine bağlıdır: Taşıyıcı mobilitesi (sıcaklık arttıkça düşer ve yavaşlatır) ve eşik gerilimi \`V_th\` (sıcaklık arttıkça düşer ve hızlandırır). Düşük besleme gerilimlerinde \`V_th\` düşüşü baskın hale gelir; bu durumda transistör **soğukta (-40°C) sıcaktan (125°C) daha yavaş çalışabilir!** Bu nedenle modern STA akışlarında hem en yüksek hem en düşük sıcaklık köşeleri taranmalıdır.`,
      },
      {
        title: "6. Multi-Corner Multi-Mode (MCMM) Zamanlama Analizi",
        content: `Eski tasarımlarda tek bir köşe analizi yeterliyken, günümüz karmaşık SoC'lerinde **Multi-Corner Multi-Mode (MCMM)** yaklaşımı zorunludur:
- **Modlar (Modes):** Fonksiyonel çalışma modu, Test/Scan modu, Uyku (Sleep/Low-power) modu.
- **Köşeler (Corners):** SS_125C, FF_-40C, TT_25C, SF, FS.

Modern bir zamanlama aracı (OpenSTA), tüm bu mod ve köşe permütasyonlarını aynı anda yükler. Amaç, dökümhaneden çıkan silikon çiplerin üretim veriminin (yield) %99'un üzerinde olmasını ve her türlü sıcaklık/voltaj dalgalanmasında kusursuz çalışmasını garanti etmektir.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Üretim Köşeleri (Process Corners) ve PVT Değişintileri** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "process-corners-explained.v - Örnek RTL / Sentez Kodu",
          snippet: `operating_conditions (SLOW) { process : 1.0; // Nominal process voltage : 1.62; // Low voltage (Vdd - 10%) temperature : 125; // High temperature (°C) }`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Üretim Köşeleri (Process Corners) ve PVT Değişintileri",
      initialCode: `operating_conditions (SLOW) { process : 1.0; // Nominal process voltage : 1.62; // Low voltage (Vdd - 10%) temperature : 125; // High temperature (°C) }`,
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
      question: "Statik Zamanlama Analizinde (STA) flip-flop'ların 'Kurulum Süresi (Setup Time)' ve 'Tutma Süresi (Hold Time)' ihlalleri sırasıyla en kritik olarak hangi üretim köşelerinde (process corners) doğrulanmalıdır?",
      options: ["Setup süresi en yavaş köşede (SS - Worst-Case), Hold süresi en hızlı köşede (FF - Best-Case)", "Setup süresi en hızlı köşede (FF), Hold süresi en yavaş köşede (SS)", "Her iki ihlal de sadece nominal köşede (TT)", "Setup süresi sadece yüksek sıcaklıkta, Hold süresi ise sadece simülasyonda"],
      correctIndex: 0,
      explanation: "Setup ihlalleri mantık yollarının çok yavaş kalması durumunda oluştuğundan en yavaş köşede (SS, düşük voltaj, yüksek sıcaklık) incelenir. Hold ihlalleri ise yeni verinin çok hızlı ulaşıp mevcut veriyi bozması durumunda oluştuğundan en hızlı köşede (FF, yüksek voltaj, düşük sıcaklık) incelenir.",
    },
  },
  "cell-characterization-data": {
    id: "cell-characterization-data",
    badge: "Modül 5 • Liberty (.lib) Dosyaları ve Zamanlama Modelleri",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Hücre Karakterizasyon Verileri: SPICE Simülasyonundan Liberty Tablolarına",
    subtitle: "Standart hücrelerin analog SPICE/Spectre simülasyonlarıyla karakterize edilmesi, yayılma gecikmesi, geçiş süresi ve sıralı eleman kısıtlarının elde edilme akışı.",
    sections: [
      {
        title: "1. Standart Hücre Karakterizasyonu Nedir? Fizikten Soyut Tablolara Köprü",
        content: `Dijital mantık kapıları özünde karmaşık analog devrelerdir. Bir NAND kapısının girişindeki voltaj anında değişmez; giriş kapasitansı şarj olurken eğimli bir eğri çizer ve çıkış transistörleri doyum ve lineer bölgelerden geçerek akım iletir.

Eğer bir çipteki 500.000 mantık kapısının her birini analog SPICE simülatörüyle çözmeye kalkışsaydık, tek bir saat döngüsünü simüle etmek aylar sürerdi. Bu nedenle dökümhaneler **Hücre Karakterizasyonu (Cell Characterization)** adı verilen süreci yürütür. Karakterizasyon; her bir standart hücrenin elektriksel davranışını analog transistör seviyesinde binlerce kez simüle edip, sonuçları dijital araçların (\`Yosys\`, \`OpenSTA\`) mikrosaniyeler içinde okuyabileceği kompakt sayısal tablolara (Liberty \`.lib\`) dönüştürme sanatıdır.`,
      },
      {
        title: "2. Otomatik Karakterizasyon Akışı ve EDA Araçları",
        content: `Karakterizasyon süreci insan eliyle yürütülemez; özel otomatik karakterizasyon yazılımları (\`Cadence Liberate\`, \`Synopsys SiliconSmart\`, açık kaynaklı \`CharLib\`) kullanılır.

Karakterizasyon Boru Hattı:
1. **Giriş Dosyaları:** Hücrenin transistör seviyesindeki SPICE ağ listesi (parazitik direnç ve kapasitansları içeren post-layout extracted netlist) ve dökümhanenin transistör modelleri (BSIM4 / BSIM-CMG).
2. **Matris Tanımlama:** Giriş sinyali geçiş süreleri (slew: örneğin 10ps'den 1.5ns'ye kadar 7 değer) ve çıkış yük kapasitansları (load: örneğin 1fF'den 300fF'ye kadar 7 değer) belirlenir. Bu, her bir zamanlama yayı için 7x7 = 49 farklı analog simülasyon noktası demektir.
3. **SPICE Koşturma:** Yazılım otomatik olarak yüz binlerce SPICE geçici durum analizi (transient analysis) koşturur.
4. **Ölçüm ve Tablo Üretimi:** Dalga biçimleri analiz edilerek gecikmeler ve güç değerleri çıkarılır, Liberty formatına yazılır.`,
      },
      {
        title: "3. Yayılma Gecikmesi ve Geçiş Süresi Ölçüm Metotları (%50 ve %10-%90 Eşikleri)",
        content: `Analog dalga biçimlerinden sayısal zamanlama metrikleri çıkarılırken IEEE standart voltaj eşikleri kullanılır:
- **Yayılma Gecikmesi (Propagation Delay - \`cell_rise\`, \`cell_fall\`):** Giriş sinyalinin besleme geriliminin %50'sine ulaştığı an ile çıkış sinyalinin %50'sine ulaştığı an arasındaki zaman farkıdır (\`Delta_t = t_out(50%) - t_in(50%)\`).
- **Geçiş Süresi / Eğim (Transition Time / Slew - \`rise_transition\`, \`fall_transition\`):** Çıkış sinyalinin bir mantık seviyesinden diğerine geçerken harcadığı süredir. Standart kütüphanelerde genellikle %10 ile %90 eşikleri (veya %20 ile %80 eşikleri) arasındaki süre ölçülür.

Her bir giriş kombinasyonu için hem yükselen kenar (\`cell_rise\`) hem düşen kenar (\`cell_fall\`) gecikmeleri ayrı ayrı karakterize edilir; çünkü PMOS ve NMOS transistörlerin akım taşıma hızları asimetriktir.`,
      },
      {
        title: "4. Sıralı Hücrelerin Karakterizasyonu: Kurulum, Tutma ve Negatif Kısıtlar",
        content: `Flip-flop ve mandal gibi sıralı bellek elemanlarının karakterizasyonu kombinasyonel kapılardan çok daha karmaşıktır. Burada sadece gecikme değil, kararlılık kısıtları ölçülür:
- **Setup Time (Kurulum Süresi):** Veri sinyali (D) saatin (CLK) aktif kenarına yaklaştırıldığında, çıkışın (Q) doğru değere oturmasını garanti eden minimum süre.
- **Hold Time (Tutma Süresi):** Saat kenarından sonra veri sinyalinin değişmeden kalması gereken minimum süre.
- **Karakterizasyon Yöntemi:** D ile CLK sinyalleri arasındaki zaman farkı adım adım daraltılarak simülasyonlar koşturulur. Çıkış gecikmesinin (CLK-to-Q) nominal değerinden %10 saptığı an (push-out kriteri) kurulum veya tutma sınır noktası olarak kaydedilir.
- **Negatif Tutma Süreleri (Negative Hold):** Eğer hücrenin iç saat yolunda dahili bir gecikme tamponu varsa, veri sinyali saat kenarından önce değişse bile hücre veriyi yakalayabilir; bu durum kütüphanede negatif tutma süresi olarak karakterize edilir.`,
      },
      {
        title: "5. Güç Karakterizasyonu: Dahili Enerji ve Statik Kaçak Ölçümleri",
        content: `Karakterizasyon motoru her hücrenin enerji profilini de çıkarır:
- **Statik Kaçak Gücü (Leakage Power):** Girişler sabit tutulduğunda (\`A=0, B=0\` veya \`A=1, B=0\`) devreden toprağa akan sabit DC kaçak akımı (\`I_leak\`) ölçülür ve \`P = VDD * I_leak\` formülüyle her durum için kaydedilir.
- **Dahili Enerji (Internal Energy / Switching Power):** Giriş anahtarladığında hücrenin iç transistör düğümlerini şarj/deşarj etmek için harcanan enerji ve anahtarlama esnasında PMOS ve NMOS transistörlerin aynı anda kısa bir an açık kalmasıyla oluşan **Kısa Devre Akımının (Short-Circuit Current)** integrali alınarak pikojoule (pJ) veya femtojoule (fJ) cinsinden tablolara yazılır.`,
      },
      {
        title: "6. Karakterizasyon Çıktılarının Liberty Tablolarına Dönüştürülmesi ve Doğrulama",
        content: `Yüz binlerce simülasyon tamamlandığında veriler doğrulanır (Data Sanity Check):
- Monotonluk Kontrolü: Yük kapasitansı arttıkça gecikmenin kesinlikle artması gerekir; azalan değerler simülasyon hatasına işaret eder.
- Şablon Biçimlendirme: Ölçülen değerler \`lu_table_template\` yapısına göre düzenlenerek \`.lib\` dosyasına aktarılır.
- Sonuç olarak ortaya çıkan bu zengin kütüphane verisi, karmaşık analog fiziği birkaç megabaytlık bir metin dosyasında toplayarak modern dijital çip tasarımının temel dayanağını oluşturur.`,
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Hücre Karakterizasyon Verileri: SPICE Simülasyonundan Liberty Tablolarına",
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
      question: "Standart hücre karakterizasyonunda bir mantık kapısının 'Yayılma Gecikmesi (Propagation Delay)' analog SPICE dalga biçimleri üzerinden nasıl ölçülür?",
      options: ["Giriş sinyalinin %50 voltaj seviyesine ulaştığı an ile çıkış sinyalinin %50 voltaj seviyesine ulaştığı an arasındaki zaman farkı ölçülerek", "Çıkış sinyalinin %0'dan %100'e ulaştığı toplam süre ölçülerek", "Giriş sinyali frekansı ile çıkış sinyali frekansı bölünerek", "Transistörün kapı oksit direnci ile kapasitans çarpılarak"],
      correctIndex: 0,
      explanation: "Standart hücre karakterizasyonunda IEEE kuralı olarak yayılma gecikmesi (cell delay), giriş dalga biçiminin %50 eşik seviyesini kestiği an ile çıkış dalga biçiminin %50 eşik seviyesini kestiği an arasındaki süre (t_50%_out - t_50%_in) olarak hesaplanır.",
    },
  },
  "delay-tables-and-modeling": {
    id: "delay-tables-and-modeling",
    badge: "Modül 5 • Liberty (.lib) Dosyaları ve Zamanlama Modelleri",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Gecikme Tabloları ve Modelleme: NLDM ve İki Boyutlu İnterpolasyon",
    subtitle: "Doğrusal Olmayan Gecikme Modeli (NLDM), 2B arama tabloları, giriş eğimi (slew) ve çıkış yükü (load) interpolasyonu ile ekstrapolasyon riskleri.",
    sections: [
      {
        title: "1. Gecikme Modellemesinin Evrimi: Sabit Gecikmelerden NLDM'ye",
        content: `Entegre devre tasarımının ilk yıllarında kapı gecikmeleri sabit sayılar olarak kabul edilirdi (örneğin "bir NAND kapısı 1 nanosaniyedir"). Ancak transistörler küçüldükçe gecikmenin sabit olmadığı, bağlı olduğu dış devrenin durumuna göre 10 kat değişebildiği görüldü.

Doğrusal modeller (Linear Delay Models) geliştirildi; ancak transistörlerin akım-gerilim ilişkisi doğası gereği doğrusal değildir. Bu sorunu çözmek için yarı iletken endüstrisi **Doğrusal Olmayan Gecikme Modelini (Non-Linear Delay Model - NLDM)** benimsedi. NLDM, karmaşık diferansiyel denklemleri çözmek yerine önceden simüle edilmiş hassas 2 boyutlu arama tablolarına dayanır.`,
      },
      {
        title: "2. NLDM Temel Felsefesi: Giriş Eğimi (Slew) ve Çıkış Yükü (Load)",
        content: `NLDM modeline göre herhangi bir mantık kapısının yayılma gecikmesi ve çıkış geçiş süresi temel olarak iki bağımsız değişkene bağlıdır:
1. **Giriş Geçiş Süresi (Input Transition Time / Slew - \`index_1\`):** Giriş sinyalinin 0'dan 1'e ne kadar hızlı veya yavaş yükseldiği. Yavaş yükselen bir giriş sinyali, kapının iç transistörlerini geç tetikler ve gecikmeyi artırır.
2. **Çıkış Yük Kapasitansı (Output Load Capacitance - \`index_2\`):** Çıkış pinine bağlı metal kabloların parazitik kapasitansı ile sürülen sonraki kapıların giriş kapı oksit kapasitanslarının toplamı. Yük ne kadar büyükse çıkış transistörlerinin bu yükü şarj/deşarj etmesi o kadar uzun sürer.`,
      },
      {
        title: "3. İki Boyutlu Arama Tablosunun Anatomisi ve İndeks Dağılımı",
        content: `Liberty dosyasında tipik bir NLDM tablosu matris formatında yazılır:
\`\`\`text
cell_rise (delay_template_5x5) {
  index_1 ("0.010, 0.030, 0.080, 0.200, 0.500"); /* Giriş Slew (ns) */
  index_2 ("0.002, 0.008, 0.025, 0.080, 0.250"); /* Çıkış Yükü (pF) */
  values (
    "0.038, 0.052, 0.095, 0.210, 0.580",
    "0.045, 0.060, 0.104, 0.222, 0.595",
    "0.065, 0.082, 0.128, 0.250, 0.630",
    "0.120, 0.142, 0.190, 0.315, 0.710",
    "0.240, 0.268, 0.325, 0.460, 0.890"
  );
}
\`\`\`
İndeks Değerlerinin Dağılımı:
İndeks adımları eşit aralıklı değildir (0.1, 0.2, 0.3 şeklinde gitmez). Transistör davranışının eğriliğinin en dik olduğu küçük yük ve keskin eğim bölgelerinde indeksler çok sık yerleştirilirken, doyuma ulaşılan büyük değerlerde aralıklar açılır. Bu logaritmik benzeri dağılım minimum veri noktasıyla maksimum doğruluğu sağlar.`,
      },
      {
        title: "4. İnterpolasyon Matematiği: Doğrusal (1D) ve Çift Doğrusal (Bilinear 2D)",
        content: `Gerçek bir devrede bir sinyalin giriş eğimi veya çıkış yükü nadiren tablodaki tam indeks rakamlarına denk gelir (örneğin giriş slew = 0.055 ns, yük = 0.015 pF olabilir). Bu durumda zamanlama aracı **İnterpolasyon (Ara Değerleme)** yapar.

Çift Doğrusal İnterpolasyon (Bilinear Interpolation) Adımları:
1. Noktayı çevreleyen 4 tablo düğüm noktası belirlenir: \`(S1, L1), (S1, L2), (S2, L1), (S2, L2)\`.
2. Önce yük ekseninde (L) iki adet 1 boyutlu doğrusal interpolasyon yapılır:
   \`D(S1) = D11 + (L - L1)/(L2 - L1) * (D12 - D11)\`
   \`D(S2) = D21 + (L - L1)/(L2 - L1) * (D22 - D21)\`
3. Ardından giriş eğimi ekseninde (S) bu iki ara değer arasında son interpolasyon hesaplanır:
   \`D(S, L) = D(S1) + (S - S1)/(S2 - S1) * (D(S2) - D(S1))\`
Bu matematiksel işlem sayesinde araç, tablodaki ayrık 25 noktadan sonsuz çözünürlükte pürüzsüz bir gecikme yüzeyi elde eder.`,
      },
      {
        title: "5. Tablo Sınırlarının Ötesi: Ekstrapolasyon Tehlikeleri",
        content: `Eğer devredeki bir netin çıkış yük kapasitansı tablonun en büyük indeksinden daha büyükse (örneğin \`L > 0.250 pF\`) veya giriş eğimi tablonun dışına taşmışsa, zamanlama aracı **Ekstrapolasyon (Dış Değerleme)** yapmak zorunda kalır.

Ekstrapolasyonun Riskleri:
- Transistörlerin davranışı tablo sınırlarının ötesinde aşırı doyum ve doğrusal olmayan distorsiyona uğrar.
- Doğrusal ekstrapolasyon devrenin gerçek gecikmesini aşırı iyimser (optimistic) veya aşırı kötümser (pessimistic) tahmin edebilir.
- OpenSTA ve ticari araçlar ekstrapolasyon gerçekleştiğinde konsola şu kritik uyarıyı basar:
  \`Warning: Line 1420: table lookup extrapolated value outside characterized range.\`
- Tasarımcı bu uyarıları asla görmezden gelmemeli; araya tampon (buffer) ekleyerek yükü ve eğimi kütüphanenin karakterize edilmiş güvenli sınırları içine çekmelidir.`,
      },
      {
        title: "6. NLDM'nin Sınırları ve Gelişmiş Zamanlama Modelleri (CCS ve ECSM)",
        content: `NLDM modeli 90nm ve 65nm teknolojilerine kadar mükemmel hizmet etti. Ancak 45nm ve altındaki derin mikron altı düğümlerde iki temel sorun ortaya çıktı:
- Kablo dirençleri (wire resistance) transistör direncine kıyasla ihmal edilemez hale geldi ve çıkış yükü saf bir kapasitör olmaktan çıkıp dağıtılmış bir RC ağına dönüştü (Pi-model).
- Miller kapasitansı ve dalga biçimi eğrilikleri basitleştirilmiş rampaları geçersiz kıldı.

Bu sınırları aşmak için endüstri **Kompozit Akım Kaynağı Modellerine (Composite Current Source - CCS ve ECSM)** geçti. CCS modelleri voltaj tabloları yerine zaman içinde değişen doğrusal olmayan akım kaynaklarını (\`I(t)\`) modelleyerek nanometre seviyesinde kusursuz hassasiyet sunar.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Gecikme Tabloları ve Modelleme: NLDM ve İki Boyutlu İnterpolasyon** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "delay-tables-and-modeling.v - Örnek RTL / Sentez Kodu",
          snippet: `Delay = K1 + K2 × Load`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Gecikme Tabloları ve Modelleme: NLDM ve İki Boyutlu İnterpolasyon",
      initialCode: `Delay = K1 + K2 × Load`,
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
      question: "Statik Zamanlama Analizi (STA) sırasında bir sinyal yolunun hesaplanan çıkış yük kapasitansı veya giriş eğimi Liberty dosyasındaki arama tablosunun maksimum sınırlarını aştığında gerçekleşen ve zamanlama sonuçlarının güvenilirliğini tehdit eden işlem nedir?",
      options: ["Ekstrapolasyon (Extrapolation)", "İnterpolasyon (Interpolation)", "Döngüsel Katlama (Convolution)", "Sıfır Gecikme Dengelemesi (Zero-Delay Alignment)"],
      correctIndex: 0,
      explanation: "Karakterize edilmiş tablo sınırlarının dışına çıkıldığında yapılan hesaplamaya ekstrapolasyon (extrapolation) denir. Transistörün doyum eğrileri bu sınırların ötesinde doğrusal kalmadığından ekstrapolasyon zamanlama analizinde ciddi doğruluk sapmalarına yol açar.",
    },
  },
  "power-information-in-liberty-files": {
    id: "power-information-in-liberty-files",
    badge: "Modül 5 • Liberty (.lib) Dosyaları ve Zamanlama Modelleri",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Liberty Dosyalarında Güç Bilgileri: Statik Kaçak ve Dinamik Güç Modellemesi",
    subtitle: "Statik kaçak gücü (leakage), duruma bağlı kaçak, dahili anahtarlama gücü (internal power), yük anahtarlama gücü ve düşük güç optimizasyon teknikleri.",
    sections: [
      {
        title: "1. Sayısal Entegre Devrelerde Güç Tüketiminin Temel Bileşenleri",
        content: `Modern çip tasarımında enerji verimliliği ve güç tüketimi en az hız kadar belirleyici bir metriktir. Aşırı güç tüketen bir çip pil ömrünü kısaltır, termal ısınma nedeniyle frekansını kısmak (throttling) zorunda kalır ve soğutma maliyetlerini katlar.

Sayısal bir devrede toplam güç tüketimi iki temel bileşenin toplamıdır:
\`P_total = P_statik + P_dinamik\`
- **Statik Güç (P_statik):** Devreye güç verildiği andan itibaren, hiçbir sinyal değişmese bile transistörlerin üzerinden sızan kaçak güçtür.
- **Dinamik Güç (P_dinamik):** Mantık kapılarının durum değiştirmesi (0'dan 1'e veya 1'den 0'a geçişi) sırasında tüketilen aktif güçtür.`,
      },
      {
        title: "2. Statik (Kaçak / Leakage) Güç ve Liberty Dosyasındaki Temsili",
        content: `Transistörler ideal anahtarlar değildir. Kapı voltajı sıfır olsa bile yarı iletken kanaldan ve ultra ince kapı oksitinden mikroskobik akımlar sızar:
- Alt eşik kaçak akımı (Subthreshold leakage),
- Kapı oksit tünelleme akımı (Gate oxide tunneling),
- Ters kutuplu pn jonksiyon kaçak akımı.

Liberty dosyasında basit bir hücrenin ortalama kaçak gücü doğrudan \`cell_leakage_power\` özniteliğiyle belirtilir:
\`\`\`text
cell (sky130_fd_sc_hd__inv_1) {
  area : 1.38;
  cell_leakage_power : 0.125; /* nanowatt cinsinden */
  ...
}
\`\`\`
Bu değer, çip açık olduğu sürece her bir invertörün arka planda sürekli olarak 0.125 nW enerji tükettiğini gösterir. Milyonlarca kapı bir araya geldiğinde bu mikroskobik değerler onlarca miliwatta ulaşabilir.`,
      },
      {
        title: "3. Duruma Bağlı Kaçak Güç (State-Dependent Leakage) Modellemesi",
        content: `Gerçekte bir hücrenin kaçak akımı giriş sinyallerinin o andaki mantıksal durumuna sıkı sıkıya bağlıdır. Örneğin 2 girişli bir NAND kapısında (\`A\` ve \`B\`):
- \`A=0, B=0\` olduğunda seri bağlı iki NMOS transistör de kapalıdır (Stack Effect) ve kaçak akım minimum seviyeye iner.
- \`A=1, B=1\` olduğunda paralel iki PMOS transistör de kapalıdır; ancak PMOS kaçakları farklıdır.

İleri düzey Liberty dosyaları bu davranışı \`leakage_power ()\` gruplarıyla modeller:
\`\`\`text
leakage_power () {
  when : "!A & !B";
  value : 0.045;
}
leakage_power () {
  when : "A & B";
  value : 0.210;
}
\`\`\`
Görüldüğü gibi NAND kapısının kaçak gücü giriş durumuna göre neredeyse 5 kat fark edebilir! Güç analizi araçları bu durum modellerini simülasyon aktivite verileriyle birleştirerek kesin statik güç raporları üretir.`,
      },
      {
        title: "4. Dinamik Güç: Dahili Güç (Internal Power) ve Kısa Devre Akımları",
        content: `Dinamik güç kendi içinde ikiye ayrılır: **Dahili Güç (Internal Power)** ve **Yük Anahtarlama Gücü (Switching Power)**.

Dahili Güç Nedir?
Bir mantık kapısı çıkışını değiştirdiğinde hücrenin kendi iç düğümlerindeki transistör parazitik kapasitansları şarj ve deşarj olur. Ayrıca sinyal geçiş anında PMOS ve NMOS transistörlerin ikisi de çok kısa bir süre (pikosaniyeler mertebesinde) aynı anda iletime geçer. Bu esnada \`VDD\`'den doğrudan \`VSS\`'e bir **Kısa Devre Akımı (Short-Circuit Current)** akar.

Liberty dosyasında dahili güç, tıpkı gecikmeler gibi 2 boyutlu arama tablolarıyla modellenir:
\`\`\`text
internal_power () {
  related_pin : "A";
  power(power_template_5x5) {
    index_1 ("0.01, 0.05, 0.15, 0.40, 1.00");
    index_2 ("0.001, 0.010, 0.030, 0.080, 0.200");
    values (...);
  }
}
\`\`\``,
      },
      {
        title: "5. Çıkış Yükü Anahtarlama Gücü ve Aktivite Faktörü (α)",
        content: `Dinamik gücün ikinci ve genellikle en büyük bileşeni **Çıkış Yükü Anahtarlama Gücüdür (Switching Power)**. Bu, hücrenin çıkış pinine bağlı dış kablo ve sonraki kapıların toplam kapasitansını (\`C_load\`) şarj etmek için harcanan enerjidir.

Klasik CMOS Güç Denklemi:
\`P_switching = 0.5 * alpha * C_load * VDD^2 * f\`
- \`C_load\`: Çıkış yük kapasitansı.
- \`VDD\`: Besleme gerilimi (karesiyle orantılı olduğundan voltajı düşürmek gücü dramatik biçimde azaltır).
- \`f\`: Saat frekansı.
- \`alpha\` (Aktivite Faktörü / Switching Activity): Bir sinyalin saat vuruşu başına ortalama kaç kez 0'dan 1'e geçtiğini gösteren olasılıksal değer (0 ile 1 arasında).

Güç analiz araçları simülasyondan elde edilen \`VCD\` (Value Change Dump) veya \`SAIF\` (Switching Activity Interchange Format) dosyalarını okuyarak her bir telin gerçek \`alpha\` değerini hesaplar.`,
      },
      {
        title: "6. Düşük Güç Optimizasyon Stratejileri: Clock Gating ve Multi-Vt",
        content: `Liberty dosyasındaki güç modelleri tasarımcılara ve sentez araçlarına güçlü optimizasyon yetenekleri kazandırır:
- **Tümleşik Saat Kapılama (Integrated Clock Gating - ICG):** Boşta (idle) duran modüllerin saat hatlarını durdurarak dinamik saat ağacı gücünü sıfırlar.
- **Çoklu-Vt (Multi-Threshold Voltage) Değişimi:** Zamanlama payı (slack) bol olan kritik olmayan mantık yollarındaki hızlı LVT hücreleri, kütüphanedeki eşdeğer HVT hücreleriyle değiştirilir. Bu işlem devrenin çalışma frekansını zerre düşürmeden toplam kaçak akımı %70'e varan oranlarda azaltır.
- **Hücre Boyutunu Küçültme (Downsizing):** Gereğinden büyük seçilmiş \`_4\` veya \`_8\` sürüş güçlü hücreler \`_1\` veya \`_2\` ile değiştirilerek hem iç kapasitanslar hem de kısa devre güçleri optimize edilir.`,
      },
      {
        title: "Örnek RTL ve Sentez Betiği",
        content: `Aşağıdaki kod parçası **Liberty Dosyalarında Güç Bilgileri: Statik Kaçak ve Dinamik Güç Modellemesi** konusunun pratik donanım veya sentez uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Sentez ve Zamanlama İpucu",
          message: "Statik zamanlama analizinde (STA) negatif slack (WNS < 0) oluştuğunda kritik yol üzerindeki mantık derinliğini azaltmak için boru hattı (pipelining) tekniklerini kullanınız.",
        },
        code: {
          language: "verilog",
          caption: "power-information-in-liberty-files.v - Örnek RTL / Sentez Kodu",
          snippet: `cell (INV_X1) { area : 2.532; /* Single leakage value for entire cell */ cell_leakage_power : 0.125; // In library power units (nW) pin (A) { direction : input; capacitance : 0.0015; } pin (Y) { direction : output; function : "!A"; } }`,
        },
      },
    ],
    playground: {
      title: "RTL Sentez & EDA Konsolu: Liberty Dosyalarında Güç Bilgileri: Statik Kaçak ve Dinamik Güç Modellemesi",
      initialCode: `cell (INV_X1) { area : 2.532; /* Single leakage value for entire cell */ cell_leakage_power : 0.125; // In library power units (nW) pin (A) { direction : input; capacitance : 0.0015; } pin (Y) { direction : output; function : "!A"; } }`,
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
      question: "CMOS sayısal entegre devrelerinde çıkış yük kapasitansının şarj/deşarj edilmesiyle harcanan dinamik anahtarlama gücü formülü `P = 0.5 * alpha * C_load * VDD^2 * f` olarak ifade edilir. Bu denklemde 'alpha' (switching activity factor) parametresi neyi temsil eder?",
      options: ["Bir sinyalin saat çevrimi başına ortalama 0'dan 1'e geçiş yapma sıklığını (anahtarlama aktivite faktörü)", "Silikon plakanın üretim esnasındaki sıcaklık katsayısını", "Dökümhanenin transistör hata payı yüzdesini", "Transistörün kapı oksit dielektrik sabitini"],
      correctIndex: 0,
      explanation: "Aktivite faktörü (alpha / switching activity), bir mantık düğümünün saat darbesi başına 0'dan 1'e geçiş yapma olasılığını/oranını temsil eder. Bir düğüm ne kadar sık anahtarlarsa dinamik güç tüketimi o kadar artar.",
    },
  },
};
