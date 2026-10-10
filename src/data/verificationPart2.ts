import { LessonContent } from "./lessonsData";

export const VERIFICATION_PART2: Record<string, LessonContent> = {
  "how-rtl-simulation-works": {
    id: "how-rtl-simulation-works",
    badge: "Modül 4 • Simülasyon ve Hata Ayıklama (Simulation & Debugging)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "RTL Simülasyon Motorları ve Olay Tabanlı Yürütme Mantığı (Event-Driven Simulation)",
    subtitle: "Olay tabanlı (event-driven) simülasyon motorlarının çalışma mekanizması, delta döngüleri, zaman çarkı (time wheel) ve RTL derleme aşamaları.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Modern dijital tasarım ve doğrulama süreçlerinin kalbinde RTL simülatörleri (Synopsys VCS, Cadence Xcelium, Siemens Questa vb.) yer alır. Bu bölümde şu kritik konuları ele alacağız:
- Yazılım yürütme (CPU model) ile donanım simülasyonu arasındaki temel yapısal farklar.
- Olay tabanlı (event-driven) simülasyon motorlarının iç mimarisi ve zaman çarkı (\`time wheel\`) kavramı.
- Çevrim tabanlı (\`cycle-based\`) simülatörler ile olay tabanlı simülatörlerin karşılaştırılması.
- Sıfır simülasyon zamanında mantıksal kararlılığın sağlanması: Delta döngüleri (\`delta cycles\`).
- Derleme (\`compilation\`), detaylandırma (\`elaboration\`) ve simülasyon yürütme (\`execution\`) fazları.
- Simülasyon performansını optimize etme stratejileri (dalga formu yükü, profil çıkarma ve bellek yönetimi).`,
      },
      {
        title: "2. Yazılım Yürütümü vs Donanım Simülasyonu: Temel Ayrım",
        content: `Standart bir C++ veya Python programı bir CPU üzerinde sırayla (sequential) komut komut işlenir. Ancak bir ASIC veya FPGA yongasında trilyonlarca transistör ve milyonlarca mantık kapısı **tamamen paralel ve eşzamanlı** olarak çalışır. 

Bir CPU tek bir program sayacına (\`program counter\`) sahipken, donanım simülatörü milyonlarca bağımsız \`always\`, \`initial\`, \`assign\` bloğunu ve kapı seviyesi gecikmeleri aynı anda modellemek zorundadır. Bunu tek veya çok çekirdekli bir ana bilgisayarda yapabilmek için EDA (Electronic Design Automation) dünyası **olay tabanlı simülasyon (discrete event-driven simulation)** yöntemini geliştirmiştir.

Simülatör, devredeki tüm sinyalleri sürekli hesaplamak yerine yalnızca bir sinyalde lojik değer değişimi (0->1, 1->0, X veya Z) olduğunda tetiklenen mantık bloklarını yeniden değerlendirir. Değer değişimi olmayan hiçbir blok CPU zamanı tüketmez. Bu yaklaşıma **olay (event)** tabanlı yürütme denir.`,
      },
      {
        title: "3. Zaman Çarkı (Time Wheel) ve Olay Kuyruğu Mekanizması",
        content: `Olay tabanlı simülatörlerin çekirdeğinde bir **Zaman Çarkı (\`Time Wheel\`)** ve **Olay Kuyruğu (\`Event Queue\`)** bulunur.

1. **Zaman Damgaları (Time Slots):** Simülasyon zamanı (örneğin 0ns, 10ns, 15ns) ayrık adımlarla ilerler. Simülatör mevcut zaman adımındaki tüm olaylar tükenene kadar simülasyon saatini ilerletmez.
2. **Olayların Çizelgelenmesi (Scheduling):** Bir blok çalıştığında, ürettiği yeni sinyal değerleri gelecekteki bir zaman adımına (örneğin \`#5 clk = ~clk;\`) veya mevcut zaman adımının belirli bir alt fazına çizelgelenir.
3. **Zaman İlerlemesi:** Mevcut zaman adımında yapılacak hiçbir işlem kalmadığında, simülatör zaman çarkındaki bir sonraki aktif zaman dilimine doğrudan sıçrar. Aradaki boş sürede CPU çevrimi harcanmaz.`,
      },
      {
        title: "4. Delta Döngüleri (Delta Cycles): Sıfır Zamanda Kararlılık",
        content: `Donanım dünyasında kombinasyonel mantık kapıları zincirleme olarak birbirini tetikler: Giriş değişir -> Kapı 1 çıkışı değişir -> Kapı 2 çıkışı değişir. RTL simülasyonunda bu kapıların gecikmesi varsayılan olarak sıfırdır (\`#0\`).

Peki simülatör zaman ilerlemeden bu nedensellik zincirini nasıl çözer? Cevap: **Delta Döngüleri (\`Delta Cycles\`)**.
- Delta döngüsü, **simülasyon zamanının 0 olduğu (zaman ilerlemediği)** ancak simülatörün iç yürütme sıralamasının ilerlediği sonsuz küçük bir alt adımdır.
- Bir zaman adımı (örneğin \`t = 10ns\`), birden fazla delta adımından (\`10ns + 0d\`, \`10ns + 1d\`, \`10ns + 2d\`...) oluşabilir.
- Simülatör, kombinasyonel sinyaller kararlı duruma (steady state) ulaşana kadar delta döngülerini çalıştırmaya devam eder.
- Eğer tasarımda kombinasyonel bir geri besleme döngüsü (kombinasyonel loop / latch ring) varsa, sinyaller asla kararlı hale gelemez ve simülatör \`Zero-delay infinite loop detected\` hatası vererek durur.`,
      },
      {
        title: "5. Olay Tabanlı vs Çevrim Tabanlı Simülatörler",
        content: `Doğrulama dünyasında iki ana simülatör felsefesi bulunur:

| Özellik | Olay Tabanlı (\`Event-Driven\`) Simülatörler | Çevrim Tabanlı (\`Cycle-Based\`) Simülatörler |
| :--- | :--- | :--- |
| **Örnek Araçlar** | Synopsys VCS, Cadence Xcelium, Questa | Verilator, Synopsys CycleSim |
| **Zaman Çözünürlüğü** | Pikosanite/Femtosaniye hassasiyetinde | Yalnızca saat çevrimi (clock edge) adımı |
| **Gecikme Desteği** | \`#delay\`, SDF zamanlama ve kapı seviyesi desteklenir | Mantık kapısı gecikmeleri ve asenkron yapıları yoksayar |
| **Simülasyon Hızı** | Detaylı olay kuyruğu yönetimi nedeniyle görece daha yavaş | Muazzam hızlı (10x - 50x daha hızlı çalışabilir) |
| **Kullanım Alanı** | Tam kapsamlı SystemVerilog/UVM doğrulama, GLS, asenkron CDC | Büyük işlemci çekirdekleri, C++ referans ko-simülasyonu |`,
      },
      {
        title: "6. Simülasyonun 3 Temel Aşaması: Compilation, Elaboration, Run-Time",
        content: `Bir RTL simülasyonu üç ana aşamadan geçerek yürütülür:

1. **Derleme (\`Compilation\`):** SystemVerilog kaynak dosyaları (RTL, arayüzler, testbench paketleri) sözdizimsel (\`syntax\`) ve anlamsal (\`semantic\`) kontrolden geçirilir. Dosyalar ara makine koduna veya C++ nesnelerine dönüştürülür (örneğin VCS için \`vlogan\`, Questa için \`vlog\`).
2. **Detaylandırma (\`Elaboration\`):** En üst düzey modül (\`top module\`) baz alınarak hiyerarşi oluşturulur. Parametreler (\`defparam\`, \`parameter\`) çözümlenir, \`generate\` blokları açılır, port bağlantıları bağlanır ve netlist bellekte tek parça bir tasarım grafiğine dönüştürülür (örneğin VCS için \`vcs\`, Questa için \`vsim -c\`).
3. **Yürütme (\`Execution / Run-Time\`):** Simülasyon motoru başlatılır, testbench senaryoları koşulur, dalga formu (\`FSDB\`/\`VCD\`) dökümü alınır ve assertion kontrolleri icra edilir.`,
      },
      {
        title: "7. Simülasyon Performansını Artırma ve Hata Ayıklama İpuçları",
        content: `Büyük SoC projelerinde simülasyon süresi en kritik maliyet kalemidir. Simülasyonu hızlandırmak için uzman DV mühendisleri şu kurallara uyar:
- **Dalga Formu Dökümünü Sınırlandırın:** Tüm sinyallerin dalga formunu (\`$dumpvars\` veya \`$fsdbDumpvars\`) kaydetmek simülasyonu %50-80 oranında yavaşlatabilir. Yalnızca başarısız olan testlerde veya belirli zaman aralıklarında döküm alınmalıdır.
- **FSDB Formatını Tercih Edin:** Eski metin tabanlı \`VCD\` yerine Synopsys'in sıkıştırılmış ve indekslenmiş ikili \`FSDB\` formatı kullanılmalıdır.
- **Kombinasyonel Duyarlılık Listelerine Dikkat Edin:** Modern SystemVerilog'da \`always @(*)\` yerine \`always_comb\` kullanarak simülatörün statik bağımlılık analizini optimize etmesine yardımcı olun.
- **Gereksiz Display ve String İşlemlerinden Kaçının:** Yüksek frekansta çalışan \`$display\` veya string birleştirme operasyonları simülatörün bellek yöneticisini boğar.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: RTL Simülasyon Motorları ve Olay Tabanlı Yürütme Mantığı (Event-Driven Simulation)",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Olay tabanlı (event-driven) bir RTL simülatöründe 'Delta Döngüsü'nün (Delta Cycle) temel işlevi nedir?",
      options: ["A) Simülasyon zamanını ilerletmeden (0 simülasyon zamanında), birbirini tetikleyen kombinasyonel atamalar ve sinyaller kararlı duruma (steady-state) ulaşana kadar iç değerlendirme adımlarını yürütmek", "B) Simülasyon saatini 1 nanosaniye ileri alarak fiziksel flip-flop yayılım gecikmelerini hesaplamak", "C) UVM testbench bileşenlerini bellekten silerek simülasyonu sonlandırmak", "D) Sentez aracının netlist oluşturabilmesi için saat periyodunu ikiye bölmek"],
      correctIndex: 0,
      explanation: "Delta döngüsü, fiziksel simülasyon zamanı (zaman damgası) hiç ilerlemeden meydana gelen ayrık yürütme adımıdır. Mantık kapılarının ve kombinasyonel atamaların sıfır gecikmeli nedensellik zincirini çözerek devrenin kararlı duruma (steady-state) oturmasını sağlar.",
    },
  },
  "simulation-timestep-scheduling": {
    id: "simulation-timestep-scheduling",
    badge: "Modül 4 • Simülasyon ve Hata Ayıklama (Simulation & Debugging)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Simülasyon Zaman Adımı ve Zamanlama Bölgeleri (Simulation Timestep & Scheduling)",
    subtitle: "IEEE 1800 SystemVerilog Stratified Event Queue mimarisi, Active/Inactive/NBA/Reactive/Postponed bölgeleri ve yarış durumlarını (race conditions) önleme.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `SystemVerilog doğrulama mühendislerinin en sık karşılaştığı ölümcül hatalardan biri yarış durumlarıdır (\`race conditions\`). Bu bölümde şu konuları derinlemesine inceleyeceğiz:
- IEEE 1800 standardı tarafından tanımlanan katmanlı olay kuyruğu (\`Stratified Event Queue\`).
- Bloklayan (\`=\`) ve bloklamayan (\`<=\`) atamaların farklı zamanlama bölgelerine haritalanması.
- Tasarım (RTL) bölgesi ile testbench bölgesi arasındaki etkileşim.
- Aynı zaman adımında okuma-yazma determinizmsizliği ve yarış durumlarının nedenleri.
- Testbench ve RTL arasındaki yarış durumlarını kökten çözen \`clocking block\` mekanizması.
- Saat kenarında veri sürme ve örnekleme için en iyi mühendislik pratikleri.`,
      },
      {
        title: "2. IEEE 1800 Katmanlı Olay Kuyruğu (Stratified Event Queue)",
        content: `SystemVerilog'da tek bir simülasyon zaman adımı (\`timestep\`) içinde kodlar rastgele çalıştırılmaz. Standart, determinizmi sağlamak için her zaman adımını net sıralı bölgelere (\`scheduling regions\`) ayırmıştır:

1. **Preponed Region:** Zaman adımının en başıdır. Sinyaller bu bölgede henüz değişmemiştir; testbench \`clocking block\` girişleri ve assertion'lar buradaki değerleri örnekler (\`sampling\`).
2. **Active Region:** RTL tasarım kodlarının çalıştığı ana bölgedir. Bloklayan atamalar (\`=\`), bloklamayan atamaların sağ tarafının (\`RHS\`) hesaplanması ve \`$display\` komutları burada icra edilir.
3. **Inactive Region:** \`#0\` gecikmeli işlemlerin yürütüldüğü bölgedir (kullanılması kesinlikle önerilmez).
4. **NBA (Non-Blocking Assignment) Region:** Bloklamayan atamaların sol tarafına (\`LHS\`) değerlerin yazıldığı bölgedir. Sıralı (sequential) mantığın kararlılığı burada sağlanır.
5. **Observed Region:** Eşzamanlı SystemVerilog Assertions (\`SVA property\`) değerlendirmelerinin yapıldığı bölgedir.
6. **Reactive Region:** Testbench kodlarının (\`program\` blokları veya \`clocking block\` tetiklemeleri) çalıştığı bölgedir.
7. **Re-NBA Region:** Testbench içerisindeki bloklamayan atamaların güncellendiği bölgedir.
8. **Postponed Region:** Zaman adımının en sonudur. Tüm atamalar tamamlanmıştır; \`$strobe\` ve \`$monitor\` komutları burada nihai kararlı değerleri ekrana basar.`,
      },
      {
        title: "3. Bloklayan (=) vs Bloklamayan (<=) Atamaların Bölgelere Dağılımı",
        content: `Donanım tasarımında yarış durumlarını önlemenin birinci kuralı atama türlerini doğru seçmektir:

\`\`\`systemverilog
// Kombinasyonel Mantık - Bloklayan Atama (Active Region)
always @(*) begin
    temp = a & b;   // temp HEMEN güncellenir (Active)
    y    = temp | c; // Bir sonraki satır yeni temp değerini hemen görür
end

// Sıralı Mantık (Flip-Flop) - Bloklamayan Atama (Active -> NBA)
always @(posedge clk) begin
    q1 <= d;  // d'nin mevcut değeri Active bölgesinde okunur/hafızaya alınır,
              // q1'e yazma işlemi NBA bölgesine ötelenir!
    q2 <= q1; // q1'in eski değeri okunur; bu sayede kaydırmalı yazmaç (shift register)
              // yarış durumu olmadan hatasız çalışır!
end
\`\`\`

Eğer sıralı mantıkta \`=\` kullanılsaydı, iki bağımsız \`always\` bloğundan hangisinin önce çalışacağı simülatörün takdirine kalırdı ve determinizm tamamen kaybolurdu.`,
      },
      {
        title: "4. Testbench ve RTL Arasındaki Yarış Durumu (Race Condition)",
        content: `RTL tasarımı \`posedge clk\` ile çalışırken, testbench de aynı \`posedge clk\` kenarında veri sürerse ne olur?

\`\`\`systemverilog
// TEHLİKELİ TESTBENCH:
initial begin
    @(posedge clk);
    din = 1'b1; // Hangi bölgede çalışıyor? Active bölgesinde!
end

// RTL KODU:
always @(posedge clk) begin
    dout <= din; // din'in eski 0 değerini mi yoksa yeni 1 değerini mi görecek?
end
\`\`\`

Bu klasik bir yarış durumudur! Eğer simülatör önce testbench'i çalıştırırsa \`dout\` 1 olur; önce RTL'i çalıştırırsa \`dout\` 0 olur. Simülatörden simülatöre veya derleme bayraklarına göre testbench'in sonucu değişir! Bu durum kabul edilemez bir doğrulama hatasıdır.`,
      },
      {
        title: "5. Nihai Çözüm: Clocking Block Mekanizması",
        content: `SystemVerilog bu sorunu çözmek için \`clocking block\` yapısını sunmuştur. Bir \`clocking block\`, girişleri \`Preponed\` bölgesinde örnekler, çıkışları ise \`Reactive\` bölgesinde sürer:

\`\`\`systemverilog
interface bus_if(input logic clk);
    logic        valid;
    logic [31:0] data;

    // Saat kenarından önce örnekle, saat kenarından sonra sür
    clocking cb @(posedge clk);
        default input #1step output #0;
        input  data;
        output valid;
    endclocking
endinterface
\`\`\`

- \`#1step\`: Simülasyon zaman adımından hemen önceki \`Preponed\` bölgesini ifade eder. Girdi sinyali, saat kenarındaki olası gürültü ve değişimlerden tamamen izole olarak örneklenir.
- Testbench \`cb.valid <= 1'b1;\` şeklinde atama yaptığında, sürüş \`Reactive\` bölgesinde gerçekleşir. RTL ise saat kenarını çoktan \`Active\` ve \`NBA\` bölgelerinde işlemiştir. Böylece yarış durumu %100 ortadan kalkar.`,
      },
      {
        title: "6. Sık Yapılan Hatalar ve En İyi Mühendislik Pratikleri",
        content: `1. **\`#0\` Gecikmesi Kullanmak:** \`#0\` atamaları kodu yalnızca \`Inactive\` bölgesine erteler, ancak yarış durumunu garantili olarak çözmez; aksine kodu karmaşıklaştırır ve simülasyonu yavaşlatır.
2. **Kombinasyonel Mantıkta \`<=\`, Sıralı Mantıkta \`=\` Kullanmak:** Bu kuralın ihlali simülasyon ve sentez uyumsuzluklarına (\`simulation-synthesis mismatch\`) yol açar.
3. **Saat Kenarında Testbench'te Gecikmesiz Bloklayan Atama Yapmak:** \`@(posedge clk); data = 32'hA;\` yazmak yerine her zaman \`clocking block\` veya en azından \`#1ps\` gibi küçük bir delta ötelemesi kullanılmalıdır.
4. **Program Blokları vs Modüller:** Eski pratiklerde \`program\` blokları testbench için önerilse de, modern UVM dünyasında \`module\` + \`interface\` + \`clocking block\` standardı benimsenmiştir.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Simülasyon Zaman Adımı ve Zamanlama Bölgeleri (Simulation Timestep & Scheduling)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "simulation-timestep-scheduling.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// Blocking assignment — immediate update in Active region always @(*) begin temp = a & b; // temp updates immediately y = temp | c; // sees the new temp value on the next line end`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Simülasyon Zaman Adımı ve Zamanlama Bölgeleri (Simulation Timestep & Scheduling)",
      initialCode: `// Blocking assignment — immediate update in Active region always @(*) begin temp = a & b; // temp updates immediately y = temp | c; // sees the new temp value on the next line end`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "SystemVerilog Stratified Event Queue mimarisinde, bir flip-flop'un sıralı mantık bloğunda yer alan bloklamayan atamanın (non-blocking assignment, `<=`) sol tarafına (LHS) yeni değerin fiziksel olarak yazıldığı bölge hangisidir?",
      options: ["A) NBA (Non-Blocking Assignment) Region", "B) Active Region", "C) Preponed Region", "D) Postponed Region"],
      correctIndex: 0,
      explanation: "Bloklamayan atamalarda sağ taraf (RHS) ifadesi Active bölgesinde değerlendirilir ve hafızaya alınır, ancak sol taraftaki sinyale (LHS) yeni değerin yazılması NBA bölgesinde gerçekleşir. Bu sayede sıralı mantık flip-flop zincirlerinde yarış durumları önlenir.",
    },
  },
  "interpreting-waveforms": {
    id: "interpreting-waveforms",
    badge: "Modül 4 • Simülasyon ve Hata Ayıklama (Simulation & Debugging)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Dalga Formlarını Yorumlama ve Dalga Boyu Tabanlı Hata Analizi (Interpreting Waveforms)",
    subtitle: "Dalga formu görüntüleyicileri (Verdi, DVE, Questa), X yayılımı (X-propagation), yüksek empedans (Z), glitch tespiti ve sinyal kök neden analizi.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Dalga formu (waveform) görüntüleyicileri bir donanım doğrulama mühendisinin stetoskopudur. Bu bölümde öğrenecekleriniz:
- Modern dalga formu görüntüleme araçları (Synopsys Verdi, Questa Visualizer, Cadence SimVision) ve dosya formatları (\`FSDB\`, \`VCD\`, \`WLF\`).
- Bir hata analizi oturumunda mutlaka izlenmesi gereken kritik sinyaller.
- Yaygın hata imzaları: Kilitlenmeler (\`deadlock\`), beklenmeyen düşmeler ve el sıkışma ihlalleri.
- Glitch (kısa parazit darbe) oluşumu ve donanımsal etkileri.
- Bilinmeyen durum (\`X\`) ve yayılımı (\`X-propagation\`): Nedenleri ve ayıklama yöntemleri.
- Yüksek empedans (\`Z\`) durumu ve üç durumlu (tri-state) veri yolları.
- Milyonlarca çevrimlik devasa dalga formlarında hızlı gezinme teknikleri ve kök neden akışı.`,
      },
      {
        title: "2. Dalga Formu Görüntüleyicileri ve Dosya Formatları",
        content: `Simülasyon sırasında sinyal değişimleri ikili veya metin tabanlı dosyalara kaydedilir:
- **FSDB (Fast Signal Database):** Synopsys Verdi'nin endüstri standardı formatıdır. Üstün veri sıkıştırma algoritmaları ve anında rastgele erişim indeksleme yeteneği sayesinde gigabaytlarca veriyi saniyeler içinde açabilir.
- **VCD (Value Change Dump):** IEEE 1364 standardı olan açık metin formatıdır. Her araç tarafından desteklenir ancak dosya boyutları devasadır (kolayca yüzlerce gigabayta ulaşabilir) ve disk I/O darboğazı yaratır.
- **WLF / SHM:** Sırasıyla Siemens Questa ve Cadence SimVision'ın tescilli yüksek performanslı formatlarıdır.

Verdi gibi gelişmiş hata ayıklama platformları yalnızca dalga formunu göstermekle kalmaz; kaynak kod ile dalga formunu çift yönlü ilişkilendirerek (\`nTrace\`) bir sinyalin sürücüsünü tek tıkla şematik üzerinde izlemenize olanak tanır.`,
      },
      {
        title: "3. Bir Dalga Formunda Her Zaman İzlenmesi Gereken Kritik Sinyaller",
        content: `Rastgele yüzlerce sinyali dalga formu ekranına atmak mühendisin odak noktasını dağıtır. Disiplinli bir DV mühendisi dalga formunu şu hiyerarşik sırayla kurar:

1. **Sistem Sinyalleri:** Ana saatler (\`clk\`), türetilmiş saatler ve sıfırlama (\`rst_n\`) sinyalleri. Saatlerin frekansı ve resetin kalkış anı ilk incelenecek noktadır.
2. **Protokol El Sıkışma Sinyalleri (Handshake):** \`valid\` ve \`ready\` (veya \`req\`/\`ack\`). Veri transferinin ne zaman başlayıp ne zaman takıldığı doğrudan bu ikiliden anlaşılır.
3. **Durum Makinesi Durumu (FSM State):** Kontrol lojiğinin hangi durumda (\`IDLE\`, \`HEADER\`, \`PAYLOAD\`, \`WAIT_RESP\`, \`ERROR\`) takılı kaldığı.
4. **Veri ve Adres Yolları:** \`data\`, \`addr\`, \`byte_en\` gibi paket yükünü taşıyan sinyaller.
5. **Kuyruk / Bellek Göstergeleri:** FIFO \`empty\`, \`full\`, \`almost_full\` ve işaretçi (\`pointer\`) sinyalleri.`,
      },
      {
        title: "4. Bilinmeyen Durum (X-State) ve X-Yayılımı (X-Propagation)",
        content: `Dijital simülasyonda \`X\` durumu, bir sinyalin değerinin 0 mı yoksa 1 mi olduğunun simülatör tarafından kestirilemediğini ifade eder.

**X Neden Ortaya Çıkar?**
- Sıfırlanmamış (uninitialized) flip-flop'lar (özellikle simülasyonun \`t=0\` anında).
- Veri yolunda birden fazla aktif sürücünün çakışması (bus contention: aynı anda bir sürücü 1, diğeri 0 basıyor).
- Zamanlama ihlalleri (Gate-Level Simülasyonda \`setup\` veya \`hold\` ihlali oluştuğunda kütüphane modelleri çıkışa \`X\` basar).

**X-Yayılımı Tehlikesi (X-Propagation):**
Bir sinyaldeki \`X\`, girdiği mantık kapılarının çıkışını da \`X\` yapar (\`X & 1 = X\`, \`X | 0 = X\`). Eğer bir \`if (sel)\` koşulunda \`sel\` sinyali \`X\` ise, simülatör varsayılan olarak \`else\` dalına sapar (RTL X-optimism). Bu durum gerçek silikonda yonganın kilitlenmesine neden olurken simülasyonda gizlenebilir! Modern simülatörler bu yüzden \`+xprop\` bayrağı ile çalıştırılır.`,
      },
      {
        title: "5. Yüksek Empedans (Z) ve Glitch (Parazit Darbe) Tespiti",
        content: `- **Z (High Impedance):** Sinyalin hiçbir sürücü tarafından sürülmediğini (açık devre) ifade eder. Genellikle çift yönlü (\`inout\`) pinlerde, I2C veya bellek veri yollarında görülür. Eğer dahili bir RTL register'ında \`Z\` görülüyorsa, bu açıkta kalan (unconnected) bir port veya eksik kablolama hatasıdır.
- **Glitch (Kısa Süreli Lojik Darbe):** Farklı gecikmelere sahip kombinasyonel mantık yollarının yarışması sonucu, sinyalin nanosaniyenin kesirleri kadar bir sürede 0->1->0 yapmasıdır. 
- Kombinasyonel çıkışlarda glitch'ler doğaldır ve saat kenarından önce sönümlendiği sürece zararsızdır. Ancak bir glitch **saat sinyaline (\`clk\`) veya asenkron reset sinyaline (\`rst_n\`)** bulaşırsa, yongada felaket boyutunda hatalı tetiklemelere yol açar.`,
      },
      {
        title: "6. Dalga Formu Üzerinden Adım Adım Hata Ayıklama Akışı (Root Cause Analysis)",
        content: `Profesyonel bir DV mühendisi dalga formunda hatayı geriye doğru izler (\`back-tracing\`):
1. **Hata Belirtisini Konumlandırın:** Testbench scoreboard'unun hata verdiği veya assertion'ın çöktüğü zaman damgasına bir işaretçi (\`marker / cursor\`) koyun.
2. **Çıkış Sinyallerini İnceleyin:** DUT çıkışındaki hatalı veriyi veya beklenmeyen kontrol sinyalini doğrulayın.
3. **Sürücüyü Takip Edin (Trace Driver):** Verdi'de sinyale çift tıklayarak o sinyali süren register veya mantık bloğuna geri gidin.
4. **FSM ve El Sıkışmayı Kontrol Edin:** Hata anında FSM beklenen durumda mıydı? \`ready\` sinyali beklenmedik şekilde mi düştü?
5. **Giriş Uyarıcısını Doğrulayın:** Hata iç mantıktan mı kaynaklanıyor yoksa testbench DUT'ye geçersiz/protokol dışı bir paket mi gönderdi? Nedensellik zinciri giriş pinlerine kadar kesintisiz sürdürülmelidir.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Dalga Formlarını Yorumlama ve Dalga Boyu Tabanlı Hata Analizi (Interpreting Waveforms)",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "RTL simülasyonunda 'X-Propagation' (X Yayılımı) olgusunun ve RTL X-Optimism durumunun en tehlikeli riski nedir?",
      options: ["A) Gerçek silikonda yonganın kilitlenmesine yol açabilecek belirsiz bir durumun, RTL simülatöründe 'if (X)' koşulunun otomatik olarak 'else' dalına sapması nedeniyle simülasyonda tespit edilemeyip gizlenmesi", "B) Simülasyon dosya boyutunun (FSDB) diskte gereğinden az yer kaplaması", "C) Flip-flop'ların saat frekansını iki katına çıkarması", "D) Testbench içerisindeki UVM sequence nesnelerinin bellekte çoğalması"],
      correctIndex: 0,
      explanation: "Standart RTL simülasyonunda bir 'if' koşulu 'X' aldığında bunu 'false' kabul edip 'else' dalına geçer (X-optimism). Oysa gerçek fiziksel silikonda transistör kararsız kalabilir veya 'true' gibi davranabilir. Bu uyumsuzluk, kritik hataların simülasyondan kaçmasına neden olur.",
    },
  },
  "using-display-statements-effectively": {
    id: "using-display-statements-effectively",
    badge: "Modül 4 • Simülasyon ve Hata Ayıklama (Simulation & Debugging)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Simülasyon Çıktı Komutlarının Etkin Kullanımı ($display, $strobe, $monitor)",
    subtitle: "SystemVerilog ekran görevlerinin zamanlama bölgeleriyle ilişkisi, format belirteçleri ve endüstri standardı UVM raporlama yapısı.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Simülasyon log dosyaları hata ayıklamanın ilk başvuru kaynağıdır. Bu bölümde öğreneceğiniz temel başlıklar:
- SystemVerilog çıktı görevleri: \`$display\`, \`$write\`, \`$strobe\` ve \`$monitor\`.
- Bu görevlerin Stratified Event Queue (katmanlı olay kuyruğu) üzerindeki farklı yürütme bölgeleri.
- \`$display\`'in \`Active\` bölgesinde çalışmasından kaynaklanan yarış durumları ve neden yanıltıcı olabileceği.
- \`$strobe\` görevinin \`Postponed\` bölgesinde nihai kararlı değerleri yakalama gücü.
- \`$monitor\` görevinin sinyal değişikliklerini sürekli izleme mekanizması.
- Zaman ve sayı formatlama belirteçleri (\`%0t\`, \`%0d\`, \`%h\`, \`%b\`, \`%s\`).
- Basit \`$display\` komutlarından endüstri standardı yapılandırılmış UVM raporlama makrolarına (\`uvm_info\`, vb.) geçiş.`,
      },
      {
        title: "2. Üç Temel Yazdırma Görevinin Karşılaştırması",
        content: `SystemVerilog'da ekrana metin basan görevler aynı amaca hizmet ediyor gibi görünse de zamanlama açısından çok farklıdır:

| Görev Adı | Yürütüldüğü Bölge | Tetiklenme Şekli | Temel Kullanım Amacı |
| :--- | :--- | :--- | :--- |
| **\`$display\`** | \`Active Region\` | Çağrıldığı anda anında çalışır | Test adımları, prosedürel akış logları ve genel bilgilendirme |
| **\`$write\`** | \`Active Region\` | Anında çalışır (sonuna alt satır \`\\n\` eklemez) | Tek satırda birleştirilen döngüsel veriler |
| **\`$strobe\`** | \`Postponed Region\` | Zaman adımının en sonunda çalışır | Saat kenarındaki tüm NBA atamaları bittikten sonra kararlı değerleri yazdırma |
| **\`$monitor\`** | \`Postponed Region\` | Argüman listesindeki sinyaller değiştikçe otomatik tetiklenir | Belirli sinyallerin tüm simülasyon boyunca geçmişini otomatik kaydetme |`,
      },
      {
        title: "3. $display vs $strobe: Kritik Zamanlama Farkı",
        content: `Saat kenarında bir flip-flop güncellenirken \`$display\` ve \`$strobe\` çağrıldığında ne olur?

\`\`\`systemverilog
always @(posedge clk) begin
    q <= d; // NBA ataması: q'nun güncellenmesi NBA bölgesine ertelendi!
    $display("@%0t [DISPLAY] q = %0b, d = %0b", $time, q, d);
    $strobe ("@%0t [STROBE ] q = %0b, d = %0b", $time, q, d);
end
\`\`\`

Eğer \`d\` az önce 1 olduysa ve \`q\` daha önce 0 idiyse:
- \`$display\` **Active** bölgesinde çalıştığı için \`q\` henüz güncellenmemiştir ve ekrana \`q = 0\` yazar! Bu yanıltıcıdır çünkü flip-flop'un yeni değerini değil eski değerini gösterir.
- \`$strobe\` ise tüm NBA atamaları tamamlandıktan sonra **Postponed** bölgesinde çalıştığı için ekrana doğru nihai değeri basar: \`q = 1\`!
Bu nedenle saat kenarlarındaki sinyal durumlarını loglarken her zaman \`$strobe\` tercih edilmelidir.`,
      },
      {
        title: "4. $monitor: Otomatik Sinyal İzleme",
        content: `\`$monitor\`, simülasyon boyunca arka planda çalışan pasif bir nöbetçidir:

\`\`\`systemverilog
initial begin
    $monitor("@%0t | Sinyal Degisimi: addr=0x%0h, data=0x%0h, valid=%0b", 
             $time, bus.addr, bus.data, bus.valid);
end
\`\`\`

- Simülasyon zamanı boyunca \`bus.addr\`, \`bus.data\` veya \`bus.valid\` sinyallerinden herhangi biri değiştiğinde, o zaman adımının \`Postponed\` bölgesinde bu mesaj otomatik olarak bir kez yazdırılır.
- **Önemli Kural:** Bir simülasyonda aynı anda yalnızca BİR adet \`$monitor\` görevi aktif olabilir! Yeni bir \`$monitor\` çağrısı yapılırsa, önceki monitor iptal edilir. Monitor takibini durdurmak için \`$monitoroff\`, yeniden başlatmak için \`$monitoron\` kullanılır.`,
      },
      {
        title: "5. Zaman ve Sayı Formatlama Belirteçleri",
        content: `Profesyonel simülasyon çıktılarında formatlama kuralları logların okunabilirliğini belirler:

- **\`%0d\`, \`%0h\`, \`%0b\`:** Baştaki anlamsız boşlukları ve sıfırları kaldırır (\`00000042\` yerine doğrudan \`42\` yazar).
- **\`$timeformat\` ve \`%0t\`:** Simülasyon zaman birimini evrensel olarak ayarlar:
\`\`\`systemverilog
initial begin
    // birim: 1ns (-9), ondalık basamak: 2, ek metin: " ns", minimum genişlik: 10
    $timeformat(-9, 2, " ns", 10);
    $display("[%0t] Test baslatildi.", $realtime); // Çıktı: [     10.50 ns] Test baslatildi.
end
\`\`\`
- **\`%s\` ve \`%m\`:** \`%s\` metin basarken, \`%m\` komutun çağrıldığı modülün hiyerarşik yolunu (örneğin \`top.tb_env.dut.u_alu\`) otomatik olarak yazdırır.`,
      },
      {
        title: "6. Yapılandırılmış UVM Raporlama Sistemine Geçiş",
        content: `Büyük doğrulama projelerinde ham \`$display\` kullanımı yasaklanır (code linting kuralı). Bunun yerine UVM'in yapılandırılmış raporlama mekanizması kullanılır:

\`\`\`systemverilog
\`uvm_info("DRIVER", $sformatf("Veri paketi gonderildi: id=%0d", pkt.id), UVM_LOW)
\`uvm_warning("MONITOR", "Beklenmeyen paket gecikmesi algilandi!", UVM_MEDIUM)
\`uvm_error("SCOREBOARD", $sformatf("Uyusmazlik: Beklenen=0x%0h, Gelen=0x%0h", exp, act), UVM_NONE)
\`uvm_fatal("CONFIG", "DUT arayuzu sanal interface tablosunda bulunamadi!")
\`\`\`

**UVM Raporlamasının Avantajları:**
1. **Ayrıntı Düzeyi (Verbosity):** Komut satırından \`+UVM_VERBOSITY=UVM_HIGH\` veya \`UVM_LOW\` vererek gereksiz log kalabalığını simülasyonu yeniden derlemeden filtreleyebilirsiniz.
2. **Otomatik Hata Sayımı:** \`uvm_error\` otomatik olarak hata sayacını artırır ve test sonunda özet tablo çıkarır.
3. **Eylem Belirleme (Actions):** \`uvm_fatal\` çağrıldığında simülasyon anında kontrollü şekilde sonlandırılır.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Simülasyon Çıktı Komutlarının Etkin Kullanımı ($display, $strobe, $monitor)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "using-display-statements-effectively.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `always @(posedge clk) begin q <= d; // schedules q update for NBA region $display("q = %b", q); // fires in Active — prints OLD value of q end`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Simülasyon Çıktı Komutlarının Etkin Kullanımı ($display, $strobe, $monitor)",
      initialCode: `always @(posedge clk) begin q <= d; // schedules q update for NBA region $display("q = %b", q); // fires in Active — prints OLD value of q end`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Aynı zaman adımında bir flip-flop'un 'q <= d;' bloklamayan atamasıyla güncellendiği saat kenarında, '$strobe' komutunun '$display' komutuna kıyasla en önemli farkı nedir?",
      options: ["A) '$strobe' görevinin Postponed bölgesinde çalışarak, tüm NBA atamaları tamamlandıktan sonraki kararlı ve güncel değeri ekrana yazdırması", "B) '$strobe' görevinin Active bölgesinde çalışıp simülasyon saatini 5ns ileri alması", "C) '$strobe' komutunun yalnızca hata durumlarında çalışıp simülasyonu durdurması", "D) '$strobe' görevinin ekrana metin basmayıp dalga formuna sinyal çizmesi"],
      correctIndex: 0,
      explanation: "'$display' komutu Active bölgesinde çağrıldığı anda çalışır ve o anda henüz NBA bölgesinde güncellenmemiş olan eski değeri basabilir. '$strobe' ise o zaman adımının en son aşaması olan Postponed bölgesine ertelenir ve tüm bloklamayan atamalar tamamlandıktan sonraki nihai değeri basar.",
    },
  },
  "debugging-methodologies": {
    id: "debugging-methodologies",
    badge: "Modül 4 • Simülasyon ve Hata Ayıklama (Simulation & Debugging)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Donanım Doğrulama Hata Ayıklama Metodolojileri (Debugging Methodologies)",
    subtitle: "Böl ve yönet (divide and conquer), sinyal geriye izleme (signal tracing), SVA assertion yakınlık dedektörleri ve deterministik hata tekrarlama.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bir DV mühendisinin zamanının en az %50'si hata ayıklama (debug) ile geçer. Bu bölümde öğreneceğiniz temel metodolojiler:
- Böl ve Yönet (\`Divide and Conquer\`) stratejisi ile arama uzayını daraltma.
- Çıkıştan girişe doğru sinyal geriye izleme (\`Signal Tracing / Back-Tracing\`).
- SystemVerilog Assertions (\`SVA\`) kurallarını hata yakınlık dedektörü (\`proximity detector\`) olarak kullanma.
- Rastgele hataların deterministik olarak tekrarlanması (\`Reproducibility\`).
- Yaygın hata kategorileri ve imzaları (Protokol ihlalleri, FIFO taşması, reset sonrası kararsızlık).
- Hata ayıklama sürecinde sık yapılan hatalar ve verimli çalışma alışkanlıkları.`,
      },
      {
        title: "2. Böl ve Yönet (Divide and Conquer) Stratejisi",
        content: `Milyonlarca saat çevrimi süren karmaşık bir SoC simülasyonunda bir scoreboard hatası alındığında (\`UVM_ERROR: Data mismatch at cycle 1450230\`), tüm dalga formunu baştan sona incelemek imkansızdır.

**Arama Uzayını Daraltma Adımları:**
1. **Zaman Penceresini Daraltın:** Hatanın scoreboard tarafından raporlandığı andan geriye doğru giderek, hatalı paketin DUT'ye girdiği ilk zaman damgasını bulun. İncelemenizi sadece bu iki zaman damgası arasına sınırlandırın.
2. **Hiyerarşik İzolasyon:** Hatanın tüm çip seviyesinde mi yoksa belirli bir alt blokta (örneğin DMA kontrolcüsü veya paket ayrıştırıcı) mı başladığını tespit edin.
3. **Konfigürasyon İzolasyonu:** Hata yalnızca belirli bir modda (örneğin \`BURST_LEN=16\` veya \`BURST_LEN=64\`) mi tetikleniyor? Test senaryosunu sadeleştirerek minimum konfigürasyona indirin.`,
      },
      {
        title: "3. Sinyal Geriye İzleme (Signal Tracing) ve Mantıksal Nedensellik",
        content: `Sinyal izleme, hatalı gözlemlenen çıkış pininden geriye doğru mantık kapılarını takip etme sanatıdır:

1. **Hatalı Çıkış Sinyali:** Örneğin \`axi_rdata\` yanlış geldi.
2. **İlk Sürücüye Git (First Driver):** \`axi_rdata\`'yı süren dahili register \`rx_fifo_rdata\`'dır.
3. **FIFO Durumunu İncele:** FIFO okuma anında boş muydu (\`underflow\`)? Yoksa FIFO'ya yanlış veri mi yazılmıştı?
4. **FIFO Yazma Tarafına Git:** FIFO'ya yazılan \`pkt_payload\` register'ının kaynağı nedir?
5. **Kök Nedene Ulaş (Root Cause):** Paket başlığı ayrıştırılırken alan kayması (\`field offset\`) 1 bayt yanlış hesaplanmış!

Synopsys Verdi platformundaki **nTrace** ve **Active Trace** araçları, kaynak kod satırları ile şematik kapılar arasında tek tıklamayla bu geriye izlemeyi otomatikleştirir.`,
      },
      {
        title: "4. Assertion'ları Hata Yakınlık Dedektörü Olarak Kullanma",
        content: `Scoreboard hataları genellikle semptomdur; asıl kök neden yüzlerce çevrim önce gerçekleşmiş olabilir. Bu mesafeyi kapatmanın en etkili yolu arayüzlere ve iç sinyallere **SystemVerilog Assertions (SVA)** yerleştirmektir:

\`\`\`systemverilog
// Protokol Kuralı: valid 1 olduğunda ready gelene kadar veri değişmemelidir!
property p_stable_data;
    @(posedge clk) disable iff (!rst_n)
    (valid && !ready) |=> $stable(data);
endproperty
assert property (p_stable_data) else 
    \`uvm_error("SVA", "Protokol hatasi: ready beklenirken data degisti!")
\`\`\`

Eğer bu kural çiğnenirse, simülasyon scoreboard'un 500 çevrim sonra patlamasını beklemeden **hatanın tam gerçekleştiği saat çevriminde** alarm verir. Böylece hata ayıklama süresi saatlerden saniyelere iner.`,
      },
      {
        title: "5. Hatanın Deterministik Olarak Yeniden Üretilmesi (Reproducibility)",
        content: `Rastgele uyarım (constrained-random) ile çalışan testbench'lerde bir gece regresyonunda hata çıkıp ertesi sabah tekrarlanamazsa o hata çözülemez.

**Deterministik Tekrarlama Gereksinimleri:**
- **Rastgelelik Tohumu (Random Seed):** Simülatöre verilen tam tohum değeri (örneğin \`+ntb_random_seed=48291039\`) bilinmelidir.
- **Aynı Kod Sürümü:** RTL ve testbench'in o testi koşan tam Git commit hash'i alınmalıdır.
- **Aynı Derleme ve Çalıştırma Bayrakları:** \`+UVM_TESTNAME=my_dma_test\` ve simülatör parametreleri birebir korunmalıdır.
- **Dalga Formu Kaydı ile Tekrar Koşma:** Hatayı tek bir komutla izole ortamda yeniden çalıştırarak tam FSDB dalga formu kaydı alınmalıdır.`,
      },
      {
        title: "6. Yaygın Hata Kategorileri ve Belirtileri",
        content: `| Hata Türü | Tipik Belirtisi | İlk Bakılacak Yer |
| :--- | :--- | :--- |
| **Deadlock (Kilitlenme)** | Simülasyon zaman aşımına (\`timeout\`) uğrar, hiçbir işlem ilerlemez | \`valid\`/\`ready\` el sıkışmaları, kredi tabanlı akış kontrolü, dairesel bağımlılıklar |
| **FIFO Taşması (Overflow / Underflow)** | Veri kaybı, eksik paketler veya yinelenen paketler | FIFO \`wr_en\` ve \`full\` sinyallerinin eşzamanlılığı, eşik seviyeleri |
| **Reset / Başlatma Hataları** | Simülasyonun ilk 100ns'sinde devrede \`X\` yayılımı | Asenkron resetin kalkış anı, sıfırlanmamış konfigürasyon register'ları |
| **Adres ve Hizalama Hataları** | Hatalı bellek bölgelerinin ezilmesi | Adres kod çözücüleri (\`address decoders\`), bayt maskeleme (\`byte enable\`) |`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Donanım Doğrulama Hata Ayıklama Metodolojileri (Debugging Methodologies)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "debugging-methodologies.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// Immediate assertion — fires when this line executes always @(posedge clk) begin count <= count + 1; assert (count < MAX_COUNT) else $error("[%0t] count overflow: %0d", $time, count); end // Concurrent assertion — evaluates every clock edge assert property (@(posedge clk) valid |-> !$isunknown(data)) else $error("[%0t] data is X while valid is asserted", $time);`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Donanım Doğrulama Hata Ayıklama Metodolojileri (Debugging Methodologies)",
      initialCode: `// Immediate assertion — fires when this line executes always @(posedge clk) begin count <= count + 1; assert (count < MAX_COUNT) else $error("[%0t] count overflow: %0d", $time, count); end // Concurrent assertion — evaluates every clock edge assert property (@(posedge clk) valid |-> !$isunknown(data)) else $error("[%0t] data is X while valid is asserted", $time);`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Büyük bir SoC simülasyonunda meydana gelen bir hatanın kök nedenini (root cause) en kısa sürede bulmak için 'SVA (SystemVerilog Assertions)' kullanımının sağladığı en kritik avantaj nedir?",
      options: ["A) Hatanın scoreboard veya sistem çıkışında yüzlerce çevrim sonra fark edilmesi yerine, protokol ihlalinin gerçekleştiği tam saat çevriminde ve iç modül seviyesinde anında tetiklenerek hata konumlandırma mesafesini sıfıra indirmesi", "B) Simülasyonun saat frekansını artırarak testi daha hızlı tamamlaması", "C) RTL kodunun kapı seviyesinde sentezlenmesini sağlaması", "D) Testbench içerisindeki tüm rastgele değişkenlerin değerlerini sabitlemesi"],
      correctIndex: 0,
      explanation: "SVA assertion'ları 'hata yakınlık dedektörü' gibi çalışır. Hata semptomunun yüzlerce çevrim sonra scoreboard'a ulaşmasını beklemeden, kural ihlalinin gerçekleştiği tam anda ve sinyal noktasında anında hata bayrağı kaldırır.",
    },
  },
  "regression-testing-seed-management": {
    id: "regression-testing-seed-management",
    badge: "Modül 4 • Simülasyon ve Hata Ayıklama (Simulation & Debugging)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Regresyon Testleri ve Seed Yönetimi (Regression Testing & Seed Management)",
    subtitle: "Rastgele test (constrained random) regresyon paketleri, tohum (seed) arşivleme, hata triyajı (triage) ve simülasyon çiftlikleri.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Karmaşık yongaların doğrulanması tek bir testle değil, binlerce testin yüz binlerce farklı tohumla koşulduğu regresyon paketleriyle sağlanır. Bu bölümde:
- Regresyon paketi (\`Regression Suite\`) mimarisi ve sürekli entegrasyon (\`CI/CD\`).
- Regresyon katmanları: Duman testleri (\`smoke\`), gecelik (\`nightly\`) ve haftalık tam regresyonlar.
- Kısıtlı rastgelelik (\`Constrained-Random\`) ve tohum (\`Seed\`) kavramının önemi.
- Başarısız tohumların (\`failing seeds\`) arşivlenmesi ve gerileme testleri (\`non-regression suite\`).
- Hata Triyajı (\`Triage\`): RTL hatası vs Testbench hatası ayrımı.
- Simülasyon sunucu çiftlikleri (\`LSF\`, \`Slurm\`) üzerinde paralel iş yönetimi.`,
      },
      {
        title: "2. Regresyon Katmanları (Regression Tiers)",
        content: `Tüm testleri her kod değişikliğinde koşturmak işlemci kaynakları açısından maliyetlidir. Bu nedenle endüstri çok katmanlı regresyon modeli kullanır:

1. **Tier-0 / Smoke Tests (Duman Testleri):**
   - **Süre:** 15 - 30 dakika.
   - **Kapsam:** Temel reset, yazmaç okuma-yazma (sanity), tek bir basit paket transferi.
   - **Tetikleyici:** Her Git pull request / merge işlemi öncesinde çalışır. Kodun temel işlevini bozmadığını kanıtlar.
2. **Tier-1 / Nightly Regression (Gecelik Regresyon):**
   - **Süre:** 6 - 10 saat (gece boyunca).
   - **Kapsam:** Onlarca farklı test senaryosu, yüzlerce farklı rastgele seed ile koşulur.
   - **Hedef:** Gün içinde eklenen yeni özelliklerin ve köşe durumların doğrulanması.
3. **Tier-2 / Weekly Full Regression (Haftalık Tam Regresyon):**
   - **Süre:** Hafta sonu boyunca (48 saat).
   - **Kapsam:** Binlerce test, on binlerce farklı seed, maksimum fonksiyonel ve kod kapsaması hedefiyle sunucu çiftliğinde paralel koşulur.`,
      },
      {
        title: "3. Randomization Seed (Tohum) ve Önemi",
        content: `SystemVerilog'da \`randomize()\` fonksiyonu sözde rastgele (pseudo-random) algoritmalarla çalışır. Bu algoritmalar bir başlangıç tohumu (\`seed\`) değeriyle beslenir:

- **Determinizm:** Aynı kaynak kod, aynı simülatör versiyonu ve aynı seed değeri her zaman birebir aynı rastgele sayı dizisini üretir.
- **Farklı Tohumlar = Yeni Senaryolar:** Aynı testi 100 farklı seed ile koştuğunuzda, simülatör her seferinde farklı paket uzunlukları, farklı gecikmeler ve farklı adres aralıkları dener. Böylece mühendisin aklına gelmeyen köşe durumlar (\`corner cases\`) otomatik olarak taranır.
- **Seed Atama Örneği (VCS):**
\`\`\`bash
# Belirli bir seed ile testi koştur
./simv +UVM_TESTNAME=dma_random_test +ntb_random_seed=918274
# Rastgele seed atayarak koştur (simülasyon saati veya PID bazlı)
./simv +UVM_TESTNAME=dma_random_test +ntb_random_seed_automatic
\`\`\``,
      },
      {
        title: "4. Başarısız Tohumların Arşivlenmesi (Seed Archiving)",
        content: `Gecelik regresyonda bir test başarısız olduğunda (\`FAIL\`), o testin tohumu altın değerindedir!
1. **Tohumu Kaydet:** Başarısız olan testin tam komut satırı, commit hash'i ve seed değeri bir veritabanına kaydedilir.
2. **Kök Neden Çözülünce:** Tasarımcı hatayı giderip yeni RTL'i commit ettiğinde, o başarısız tohum tekrar koşturulur (\`Pass\` olduğu teyit edilir).
3. **Kalıcı Regresyona Ekleme:** O tohum, projenin kalıcı "Gerileme Önleme Paketine" (\`Non-Regression Suite\`) dahil edilir. Böylece 3 ay sonra başka bir mühendis kodu değiştirdiğinde aynı hatanın tekrar hortlaması (\`regression\`) anında engellenir.`,
      },
      {
        title: "5. Hata Triyajı (Triage): Gerçek RTL Hatası mı, Testbench mi?",
        content: `Regresyonda 50 adet test fail olduğunda, ilk adım triyajdır. Genellikle başarısızlıkların büyük kısmı tek bir kök nedenden kaynaklanır:

- **Adım 1: Log İmzalarını Gruplayın:** Hata mesajlarını otomatik betiklerle (Python/RegEx) tarayarak aynı assertion veya aynı scoreboard hatasını veren testleri kümeleyin. 50 testin 45'i aslında aynı FIFO taşması hatası olabilir.
- **Adım 2: Hata Kaynağını Belirleyin:**
  - *Testbench Hatası:* Scoreboard tahmincisi (predictor) hatalı, arayüz saatleme bloğu ihlali, geçersiz kısıt (\`over-constrained\` / \`illegal stimulus\`).
  - *RTL Tasarım Hatası:* Şartnameye aykırı donanım davranışı, kilitlenme, veri bozulması.
  - *Altyapı Hatası:* Lisans sunucusu kesintisi, disk alanı dolması, simülasyon zaman aşımı (\`timeout\`).
- **Adım 3: İlgili Mühendise Atayın:** RTL hataları tasarımcıya, testbench hataları doğrulama mühendisine atanır.`,
      },
      {
        title: "6. Simülasyon Çiftlikleri ve Otomasyon Araçları",
        content: `Modern yarı iletken şirketleri regresyonları mühendislerin şahsi bilgisayarlarında değil, binlerce sunucudan oluşan hesaplama kümelerinde koşturur:
- **İş Yöneticileri:** IBM LSF (\`bsub\`), Slurm (\`sbatch\`), Grid Engine.
- **Regresyon Yöneticileri:** Synopsys Testman, Cadence vManager, Siemens Questa Verification IQ.
- Bu araçlar testleri otomatik olarak sunuculara dağıtır, başarı/başarısızlık oranlarını toplar, kapsama veritabanlarını birleştirir (\`coverage merge\`) ve web tabanlı panolarda (\`dashboard\`) gerçek zamanlı sunar.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Regresyon Testleri ve Seed Yönetimi (Regression Testing & Seed Management)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "regression-testing-seed-management.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// Simulator log output at start of run // Cadence Xcelium / Synopsys VCS: // Random seed: 4721 // To reproduce: +ntb_random_seed=4721`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Regresyon Testleri ve Seed Yönetimi (Regression Testing & Seed Management)",
      initialCode: `// Simulator log output at start of run // Cadence Xcelium / Synopsys VCS: // Random seed: 4721 // To reproduce: +ntb_random_seed=4721`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Kısıtlı rastgele (constrained-random) regresyon testlerinde bir test senaryosu başarısız olduğunda (FAIL), o çalıştırmaya ait 'Random Seed' değerinin kaydedilmesinin en kritik amacı nedir?",
      options: ["A) Hatanın gerçekleştiği tam rastgele uyarım dizisini ve zamanlama adımlarını %100 deterministik olarak yeniden üretebilmek ve hata düzeltildikten sonra aynı testle gerileme (regression) kontrolü yapabilmek", "B) Simülasyon lisans ücretini düşürmek", "C) Sentez aracının zamanlama analizini hızlandırmak", "D) Veri yollarının bit genişliğini otomatik olarak genişletmek"],
      correctIndex: 0,
      explanation: "Sözde rastgele üreteçlerde aynı seed, aynı kaynak kod ve aynı simülatör kullanıldığında uyarım dizisi birebir aynıdır. Seed olmadan rastgele bir hatayı tekrar oluşturmak milyonda bir ihtimale kalır; seed sayesinde hata anında yeniden üretilir ve kalıcı gerileme testine eklenir.",
    },
  },
  "code-coverage": {
    id: "code-coverage",
    badge: "Modül 5 • Kapsama Analizi (Coverage Metrics & Closure)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Kod Kapsama Analizi Temelleri (Code Coverage Overview)",
    subtitle: "RTL kod kapsaması türleri (Line, Branch, Condition, Expression, Toggle, FSM), ölçüm metodolojisi ve sign-off gereksinimleri.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Kod kapsaması (Code Coverage), donanım doğrulama sürecinin en nesnel ve vazgeçilmez metriklerinden biridir. Bu bölümde:
- Kod kapsaması nedir ve simülatörler tarafından nasıl ölçülür?
- Başlıca RTL kod kapsaması türleri: Line/Statement, Branch, Condition, Expression, Toggle ve FSM.
- Her bir kapsama türünün yakaladığı yapısal donanım açıkları.
- Kod kapsaması metriklerinin karşılaştırma tablosu.
- %100 Kod kapsaması hedefine ulaşılabilir mi? Dışlamalar (\`exclusions / waivers\`).
- Neden sadece kod kapsaması tapeout için yeterli değildir? Kod Kapsaması vs Fonksiyonel Kapsama (\`Functional Coverage\`).`,
      },
      {
        title: "2. Kod Kapsaması (Code Coverage) Nedir?",
        content: `Kod kapsaması, yazılan RTL tasarım kodunun simülasyon testleri sırasında ne kadarının fiziksel olarak yürütüldüğünü, dallandığını ve durum değiştirdiğini ölçen **yapısal bir metriktir**.

- **Otomatik Enstrümantasyon:** Kod kapsaması için testbench'e özel kod yazmanız gerekmez. Simülatörü derlerken özel bayraklar verilir (örneğin VCS için \`-cm line+cond+fsm+tgl+branch\`).
- Simülatör, RTL kodunun her satırına, her dallanmasına ve her bitine otomatik sayaçlar (\`bins\`) yerleştirir.
- Simülasyon koştukça bu sayaçlar artar ve test sonunda detaylı bir kapsama raporu üretilir.`,
      },
      {
        title: "3. RTL Kod Kapsaması Türleri",
        content: `Modern EDA araçları RTL kodunu 6 ana boyutta analiz eder:

1. **Satır / İfade Kapsaması (Line / Statement Coverage):** RTL kodundaki her yürütülebilir satırın en az bir kez çalışıp çalışmadığını ölçer.
2. **Dallanma Kapsaması (Branch Coverage):** \`if-else\` ve \`case\` yapılarındaki tüm olası dalların (true/false, tüm case kolları ve default) test edilip edilmediğini kontrol eder.
3. **Koşul Kapsaması (Condition Coverage):** Mantıksal kararlardaki her alt koşulun (örneğin \`if (a && b)\`) ayrı ayrı \`true\` ve \`false\` yapılıp yapılmadığını denetler.
4. **İfade Kapsaması (Expression Coverage):** Karmaşık Boole denklemlerinde her girdinin çıkış üzerindeki bağımsız etkisini analiz eder.
5. **Geçiş Kapsaması (Toggle Coverage):** Tasarımdaki her bir sinyal bitinin \`0 -> 1\` ve \`1 -> 0\` geçişlerini yapıp yapmadığını izler.
6. **Sonlu Durum Makinesi Kapsaması (FSM Coverage):** Durum makinelerindeki tüm durumların (\`states\`) ziyaret edilip edilmediğini ve tanımlı tüm durum geçişlerinin (\`transitions\`) tetiklenip tetiklenmediğini ölçer.`,
      },
      {
        title: "4. Kod Kapsaması Türleri Karşılaştırma Tablosu",
        content: `| Kapsama Türü | Ne Ölçer? | Neyi Yakalar? |
| :--- | :--- | :--- |
| **Line / Statement** | Satır yürütümü | Hiç dokunulmamış ölü kodları ve çalıştırılmamış blokları |
| **Branch** | Karar yolları | \`else\` dalı unutulmuş veya hiç girilmemiş \`case\` seçeneklerini |
| **Condition** | Mantıksal alt girdiler | Koşullardan birinin sürekli baskın (dominant) kaldığı durumları |
| **Toggle** | Bit geçişleri | Hiç değişmeyen, sabit bağlı (\`tied-off\`) veya kopuk veri yollarını |
| **FSM State** | Durum makinesi durumları | Erişilemeyen veya hiç girilmeyen FSM durumlarını |
| **FSM Transition** | Durum geçişleri | İki durum arasındaki tanımlı ama hiç tetiklenmemiş geçiş yollarını |`,
      },
      {
        title: "5. %100 Kod Kapsaması Ulaşılabilir mi? Dışlamalar (Exclusions)",
        content: `Bir tapeout sign-off kriteri olarak yönetimler genellikle "%100 Kod Kapsaması" talep eder. Ancak pratikte saf simülasyonla %100'e ulaşmak imkansızdır çünkü:
- Savunma amaçlı yazılmış kodlar vardır (örneğin asla ulaşılamayacak bir \`default: error_flag = 1;\`).
- Parametrelerle kapatılmış modül özellikleri (örneğin \`DATA_WIDTH=32\` seçildiğinde 64-bit'e ait dallar) mevcuttur.
- Kullanılmayan harici arayüz bitleri veya test pinleri vardır.

Bu tür durumlar için **Kapsama Dışlama (\`Coverage Exclusion / Waiver\`)** süreci işletilir. Mühendis, kodun neden ulaşılamaz olduğunu resmi raporda belgeler, tasarım lideri onaylar ve bu satırlar kapsama hesabından düşülerek net %100 sign-off hedefine ulaşılır.`,
      },
      {
        title: "6. Kod Kapsaması Neden Tek Başına Yeterli Değildir?",
        content: `En tehlikeli yanılgı: "%100 Kod Kapsamasına ulaştık, tasarım kusursuz çalışıyor!" yanılgısıdır.
- **Kod Kapsaması Şartnameyi Bilmez:** RTL'e yanlış bir mantık yazılmışsa ve test o satırı çalıştırırsa, kod kapsaması %100 görünür. Ancak sonuç yanlıştır!
- **Eksik Fonksiyonları Göremez:** Şartnamede yer alan ama tasarımcının yazmayı unuttuğu bir özellik varsa, RTL'de kodu olmadığı için kod kapsaması eksikliği raporlayamaz.
- **Zamansal Sıralamayı Kontrol Etmez:** Kod kapsaması satırın çalıştığını söyler, ama doğru zamanda veya doğru protokolle çalışıp çalışmadığını doğrulayamaz.

Bu yüzden kod kapsaması mutlaka **Fonksiyonel Kapsama (Functional Coverage)** ve **SVA Assertions** ile birlikte kullanılmalıdır.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Kod Kapsama Analizi Temelleri (Code Coverage Overview)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "code-coverage.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `always_ff @(posedge clk) begin if (enable) data_out <= data_in; // Line covered if enable=1 occurs else data_out <= '0; // Line covered if enable=0 occurs end`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Kod Kapsama Analizi Temelleri (Code Coverage Overview)",
      initialCode: `always_ff @(posedge clk) begin if (enable) data_out <= data_in; // Line covered if enable=1 occurs else data_out <= '0; // Line covered if enable=0 occurs end`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir RTL tasarımında %100 Kod Kapsamasına (Line, Branch, Toggle, FSM) ulaşılmış olmasına rağmen yongada kritik bir tasarım hatasının bulunabilmesinin temel nedeni nedir?",
      options: ["A) Kod kapsaması yalnızca yazılmış olan RTL kodlarının icra edilip edilmediğini ölçer; şartnamede yer alıp RTL'de yazılması unutulmuş özellikleri veya yanlış yazılmış bir mantığın doğruluğunu tespit edemez", "B) Simülatörlerin kod kapsaması sayaçlarının donanım saatinden hızlı çalışması", "C) Kod kapsaması ölçümünün sadece analog devrelerde geçerli olması", "D) %100 kod kapsamasına ulaşıldığında simülatörün otomatik olarak hata raporlamayı kapatması"],
      correctIndex: 0,
      explanation: "Kod kapsaması yapısal bir ölçümdür. RTL'deki kod satırlarının ve dalların test edilip edilmediğini gösterir. Ancak şartnamede unutulmuş eksik bir özelliği göremez ve hatalı tasarlanmış bir mantık bloğu çalıştırıldığında dahi o satırı 'kapsandı' olarak işaretler.",
    },
  },
  "block-coverage": {
    id: "block-coverage",
    badge: "Modül 5 • Kapsama Analizi (Coverage Metrics & Closure)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Temel Blok Kapsaması (Block Coverage)",
    subtitle: "Temel kod bloklarının (basic block) yürütülme sıklığı, dallanma tespiti ve Statement/Branch kapsaması ile karşılaştırma.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Kod kapsama motorlarının kalbinde blok analizi yer alır. Bu bölümde:
- Temel Blok (\`Basic Block\`) tanımı ve yapısı.
- Blok kapsaması simülatörler tarafından nasıl enstrümante edilir?
- Blok Kapsaması vs İfade (Statement/Line) Kapsaması farkları.
- Blok Kapsaması vs Dallanma (Branch) Kapsaması ilişkisi.
- Blok kapsaması açıklarını (\`coverage holes\`) tespit etme ve kapatma yöntemleri.`,
      },
      {
        title: "2. Temel Blok (Basic Block) Nedir?",
        content: `Derleyici teorisinde ve EDA araçlarında **Temel Blok (\`Basic Block\`)**, şu iki kurala uyan ardışık bir kod dizisidir:
1. **Tek Giriş:** Kod dizisine yalnızca ilk satırdan girilebilir (arada başka bir atlama veya dallanma hedefi yoktur).
2. **Tek Çıkış:** Kod dizisi son satıra kadar kesintisiz çalışır; ilk satır çalıştığında istisnasız tüm blok satırları çalışmak zorundadır.

\`\`\`systemverilog
// TEK BİR TEMEL BLOK:
begin
    sum   = a + b;
    carry = (sum > 8'hFF);
    valid = 1'b1;
end
\`\`\`
Bu örnekte \`sum\` satırı çalıştığı anda, \`carry\` ve \`valid\` satırlarının da çalışacağı garantidir. Simülatör her satır için ayrı ayrı 3 sayaç tutmak yerine bu blok için **tek bir sayaç** tutarak simülasyon hızını optimize eder.`,
      },
      {
        title: "3. Blok Kapsaması vs İfade (Statement) Kapsaması",
        content: `Pek çok mühendis blok kapsaması ile ifade (satır) kapsamasını karıştırır:

- **İfade Kapsaması:** Kaynak koddaki her noktalı virgüllü ifadeyi ayrı bir varlık olarak sayar.
- **Blok Kapsaması:** Kod satırlarını dallanma noktalarına (\`if\`, \`else\`, \`case\`, \`for\`) göre gruplandırır.
- Bir temel blok 10 satırdan oluşsa bile, blok kapsaması açısından bu **1 adet bloktur**. Blok bir kez çalıştığında blok kapsaması %100 olur.
- Eğer bir blok hiç çalıştırılmamışsa, o bloğun içindeki tüm ifadeler de çalıştırılmamış demektir. Bu nedenle blok kapsaması, ifade kapsaması açıklarını topluca tespit etmek için mükemmel bir özet sunar.`,
      },
      {
        title: "4. Blok Kapsaması vs Dallanma (Branch) Kapsaması",
        content: `Dallanma yapıları temel blokları böler:

\`\`\`systemverilog
always_comb begin
    // Blok 1 (Giris)
    next_state = current_state;
    
    if (req && grant) begin
        // Blok 2 (Then kolu)
        next_state = EXEC;
        ack = 1'b1;
    end else begin
        // Blok 3 (Else kolu)
        next_state = IDLE;
        ack = 1'b0;
    end
end
\`\`\`

- Burada 3 adet temel blok vardır: Giriş bloğu (Blok 1), \`then\` bloğu (Blok 2) ve \`else\` bloğu (Blok 3).
- Eğer testlerinizde \`req && grant\` koşulu her zaman doğru çıkarsa, Blok 1 ve Blok 2 çalışır, ancak Blok 3 (Else kolu) hiç çalışmaz.
- Blok kapsaması raporu: \`2/3 blok kapsandı (%66.6)\` şeklinde net bir açık gösterir.`,
      },
      {
        title: "5. Blok Kapsaması Açıklarını Kapatma Stratejileri",
        content: `Kapsama raporunda kırmızı yanan (çalışmamış) bir temel blok gördüğünüzde şu adımları izleyin:
1. **Bloğa Ulaşan Koşulları İnceleyin:** O bloğu koruyan \`if\`, \`case\` veya \`assert\` koşulunu bulun.
2. **Kısıtları (Constraints) Gözden Geçirin:** Testbench uyarım üreteciniz o koşulu sağlayacak değerleri rastgele üretebiliyor mu? Yoksa bir kısıt (\`constraint\`) o kombinasyonu engelliyor mu?
3. **Özel Köşe Durum Testi Ekleyin:** Eğer rastgele testlerle o bloğa ulaşılamıyorsa, o bloğu hedefleyen yönlendirilmiş (\`directed\`) bir test senaryosu yazın.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Temel Blok Kapsaması (Block Coverage)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "block-coverage.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `always_ff @(posedge clk or negedge rst_n) begin if (!rst_n) begin // Basic Block 1: reset path count <= '0; valid <= 1'b0; end else if (enable) begin // Basic Block 2: enable=1 path count <= count + 1; valid <= 1'b1; end else begin // Basic Block 3: enable=0 path valid <= 1'b0; end end`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Temel Blok Kapsaması (Block Coverage)",
      initialCode: `always_ff @(posedge clk or negedge rst_n) begin if (!rst_n) begin // Basic Block 1: reset path count <= '0; valid <= 1'b0; end else if (enable) begin // Basic Block 2: enable=1 path count <= count + 1; valid <= 1'b1; end else begin // Basic Block 3: enable=0 path valid <= 1'b0; end end`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "EDA simülatörlerinde 'Temel Blok' (Basic Block) kavramının derleyici optimizasyonu ve kapsama ölçümündeki temel özelliği nedir?",
      options: ["A) Tek bir giriş ve tek bir çıkış noktasına sahip olması; ilk satırı çalıştığı anda aradaki tüm satırların kesintisiz çalışması garanti olduğundan tek bir sayaçla tüm bloğun yürütümünün takip edilebilmesi", "B) İçerisinde yalnızca saat sinyallerinin tanımlanabilmesi", "C) Flip-flop içermeyip sadece transistör seviyesinde çalışması", "D) Her saat çevriminde belleği sıfırlaması"],
      correctIndex: 0,
      explanation: "Temel blok (Basic Block), tek giriş ve tek çıkışa sahip kesintisiz kod dizisidir. Bloğun ilk komutu icra edildiğinde sonuna kadar tüm komutların çalışması zorunlu olduğundan, simülatör her satıra ayrı sayaç koymak yerine tüm bloğu tek bir enstrümantasyon sayacıyla ölçer.",
    },
  },
  "statement-coverage": {
    id: "statement-coverage",
    badge: "Modül 5 • Kapsama Analizi (Coverage Metrics & Closure)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "İfade / Satır Kapsaması (Statement / Line Coverage)",
    subtitle: "Yürütülebilir RTL ifadelerinin analizi, çalıştırılmamış kod satırları ve kapsama raporlarının yorumlanması.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `İfade kapsaması (Statement Coverage), doğrulama kapanışında (coverage closure) incelenen ilk ve en temel yapısal metriktir. Bu bölümde:
- Kapsanabilir ifade (\`coverable statement\`) nedir ve hangi satırlar kapsama dışındadır?
- Simülatörlerin ifade kapsamını ölçme metodolojisi.
- Tek bir satırda birden fazla ifade bulunması durumu ve makro (\`macro\`) genişlemeleri.
- İfade Kapsaması vs Blok ve Dallanma Kapsaması ilişkisi.
- Gerçek bir EDA aracı (VCS/Questa) ifade kapsama raporunu okuma ve yorumlama.
- Kapsanmayan satırların analizi ve yeni uyarım senaryoları tasarlama adımları.`,
      },
      {
        title: "2. Kapsanabilir İfade (Coverable Statement) Nedir?",
        content: `Bir SystemVerilog kaynak dosyasındaki her satır kapsanabilir bir ifade değildir. Simülatör kod satırlarını ikiye ayırır:

1. **Yürütülebilir İfadeler (Coverable):**
   - Atamalar: \`a = b + c;\`, \`q <= d;\`
   - Kontrol komutları: \`if (...)\`, \`case (...)\`, \`for (...)\`, \`return\`, \`break\`
   - Fonksiyon ve görev çağrıları: \`calc_crc();\`, \`$display(...);\`
2. **Kapsanamayan Satırlar (Non-Coverable):**
   - Bildirimler ve tür tanımları: \`logic [31:0] data;\`, \`typedef enum ...\`
   - Modül ve paket başlıkları: \`module alu (...);\`, \`endmodule\`, \`package ...\`
   - Boş satırlar ve yorumlar: \`// Bu bir aciklamadir\`

İfade kapsaması yüzdesi şu formülle hesaplanır:
$$\\text{Statement Coverage} = \\left( \\frac{\\text{Y\\"ur\\"ut\\"ulen \\.Ifade Say\\i s\\i}}{\\text{Toplam Y\\"ur\\"ut\\"ulebilir \\.Ifade Say\\i s\\i}} \\right) \\times 100$$`,
      },
      {
        title: "3. Tek Satırda Çoklu İfade ve Makro Genişlemeleri",
        content: `RTL kodlarında bazen tek bir fiziksel satıra birden fazla mantıksal ifade yazılır:

\`\`\`systemverilog
// Tek satirda uc ayri ifade:
if (enable) begin a = 1; b = 2; end
\`\`\`

Eski araçlar yalnızca satır bazlı (Line Coverage) ölçüm yaparken, modern araçlar ifade bazlı (Statement Coverage) analiz yapar. Yukarıdaki örnekte \`enable\` doğru olduğunda 3 ifadenin tümü çalışır. Ancak şu örnekte durum farklıdır:

\`\`\`systemverilog
if (cond) a = 1; else b = 2;
\`\`\`
Eğer tek satıra yazılan bu kodda sadece \`cond=1\` denenirse, satır çalışmış sayılsa bile \`b = 2\` ifadesi çalışmamıştır. Gelişmiş simülatörler noktalı virgülleri ayrıştırarak alt ifade sayaçları üretir.`,
      },
      {
        title: "4. İfade Kapsaması vs Dallanma ve Koşul Kapsaması",
        content: `İfade kapsamı yüksek çıksa bile kritik mantık yolları test edilmemiş olabilir:

\`\`\`systemverilog
always_comb begin
    out = in1;
    if (special_mode)
        out = in2;
end
\`\`\`
- Eğer testlerinizde \`special_mode\` hep 1 ise: \`out = in1;\` çalışır, \`if (special_mode)\` çalışır ve \`out = in2;\` çalışır.
- **İfade Kapsaması:** %100 çıkar!
- **Dallanma Kapsaması:** \`special_mode == 0\` (örtük \`else\` kolu) hiç test edilmediği için %50'de kalır!
Bu nedenle %100 ifade kapsamı asla tek başına yeterli bir başarı ölçütü değildir.`,
      },
      {
        title: "5. Kapsama Raporunun Yorumlanması ve Açıkların Kapatılması",
        content: `Bir VCS/Questa HTML kapsama raporunda kırmızı ile işaretlenmiş satırlar şunları gösterir:
1. **Hata Yakalama Blokları:** \`if (error_detected) report_fatal();\` gibi olağanüstü durum kolları. Bu blokları kapatmak için kasti olarak protokole aykırı veri veya bozuk CRC enjekte eden negatif testler (\`error injection tests\`) yazılmalıdır.
2. **Kullanılmayan Fonksiyonlar:** Tasarımcının yazdığı ama mimaride vazgeçilen yardımcı fonksiyonlar. Bunlar ya RTL'den silinmeli (\`dead code\`) ya da waiver ile dışlanmalıdır.
3. **Eksik Konfigürasyonlar:** Yalnızca belirli bir modda (örneğin 16-bit burst) çalışan satırlar. Testbench uyarım üretecinin kısıtları gevşetilerek tüm modların taranması sağlanmalıdır.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **İfade / Satır Kapsaması (Statement / Line Coverage)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "statement-coverage.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `module counter ( input logic clk, input logic rst_n, // Active-low synchronous reset input logic enable, output logic [7:0] count ); always_ff @(posedge clk) begin if (!rst_n) // Statement 1: condition evaluated every clock count <= 8'h00; // Statement 2: reset path else if (enable) // Statement 3: condition evaluated when not in reset count <= count + 1; // Statement 4: increment path else count <= count; // Statement 5: hold path (enable=0, not in reset) end endmodule`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: İfade / Satır Kapsaması (Statement / Line Coverage)",
      initialCode: `module counter ( input logic clk, input logic rst_n, // Active-low synchronous reset input logic enable, output logic [7:0] count ); always_ff @(posedge clk) begin if (!rst_n) // Statement 1: condition evaluated every clock count <= 8'h00; // Statement 2: reset path else if (enable) // Statement 3: condition evaluated when not in reset count <= count + 1; // Statement 4: increment path else count <= count; // Statement 5: hold path (enable=0, not in reset) end endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir RTL bloğunda Statement (İfade) Kapsamasının %100 olarak raporlanmasına rağmen, tasarımda test edilmemiş kritik senaryoların kalabilmesinin nedeni nedir?",
      options: ["A) İfade kapsamının yalnızca satırların icra edilip edilmediğine bakması; örneğin bir 'if' bloğunun 'else' dalı örtük (implicit) ise ve testlerde koşul hep doğru çıkmışsa, koşulun yanlış olduğu durumun (örtük dal) hiç test edilmemiş olması", "B) Simülatörün noktalı virgülleri sayarken bellek taşması yaşaması", "C) İfade kapsamının sadece flip-flop saat kenarlarında ölçülmesi", "D) Sentez aracının ifadeleri otomatik olarak silmesi"],
      correctIndex: 0,
      explanation: "İfade kapsamı sadece fiziksel olarak mevcut kod satırlarının yürütülmesini ölçer. Örtük bir 'else' dalı (yani if sağlanmadığında hiçbir şey yapılmaması) ayrı bir kod satırı olmadığı için ifade kapsamı %100 çıkabilir; ancak dallanma (branch) kapsamı test edilmemiş bu boş dalı anında yakalar.",
    },
  },
  "expression-coverage": {
    id: "expression-coverage",
    badge: "Modül 5 • Kapsama Analizi (Coverage Metrics & Closure)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Mantıksal İfade ve Koşul Kapsaması (Expression & Condition Coverage)",
    subtitle: "Boole ifadelerinde işlenen bağımsızlığı (operand independence), maskeleme etkisi (masking) ve MCDC analizleri.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Karmaşık RTL mantıklarında hatalar genellikle çoklu girdili Boole denklemlerinde gizlenir. Bu bölümde:
- İfade (\`Expression\`) ve Koşul (\`Condition\`) kapsaması arasındaki kavramsal temeller.
- İşlenen Bağımsızlığı (\`Operand Independence\`) ve Maskeleme Etkisi (\`Masking Effect\`).
- AND, OR ve karmaşık kapı ağlarında her girdinin çıkışı tek başına değiştirebilme yeteneği.
- Havacılık ve otomotiv standartlarında (DO-254, ISO 26262 ASIL-D) zorunlu kılınan MC/DC (\`Modified Condition / Decision Coverage\`) mantığı.
- Sürekli atamalarda (\`assign\`) ve üçlü koşul operatörlerinde (\`?:\`) ifade kapsaması.
- EDA simülatörlerinin gerçeğe uygunluk tablosu (\`Truth Table\`) raporlarını okuma teknikleri.`,
      },
      {
        title: "2. Temel Kavram: İşlenen Bağımsızlığı ve Maskeleme",
        content: `Bir RTL kararında birden fazla değişken yer aldığında, bir değişken diğerinin etkisini tamamen perdeleyebilir (maskeleme):

\`\`\`systemverilog
assign out = a && b;
\`\`\`
- Eğer testlerinizde \`b = 0\` iken \`a\`'yı hem 0 hem 1 yaparsanız, \`out\` her iki durumda da 0 kalır.
- \`a\` sinyali değişmiştir ancak çıkış üzerinde **hiçbir etkisi olmamıştır** çünkü \`b\` sinyali \`a\`'yı maskelemiştir!
- **İfade Kapsamasının Amacı:** Her bir işlenenin (\`operand\`), diğer işlenenler çıkışı etkilemeyecek durumdayken (maskelenmemişken) hem \`0\` hem de \`1\` değerini aldığını ve çıkışın mantıksal değerini tek başına değiştirebildiğini (\`independent effect\`) kanıtlamaktır.`,
      },
      {
        title: "3. AND ve OR İfadelerinde Doğruluk Tablosu Analizi",
        content: `İki girdili bir \`out = a && b;\` ifadesini tam olarak kapsamak için gereken minimum test kombinasyonları:

| Test Senaryosu | Girdi \`a\` | Girdi \`b\` | Çıkış \`out\` | Açıklama |
| :--- | :--- | :--- | :--- | :--- |
| **Test 1** | \`1\` | \`1\` | \`1\` | Temel doğru durum |
| **Test 2** | \`0\` | \`1\` | \`0\` | \`b=1\` iken \`a=0\` yapıldı (\`a\`'nın bağımsız etkisi kanıtlandı) |
| **Test 3** | \`1\` | \`0\` | \`0\` | \`a=1\` iken \`b=0\` yapıldı (\`b\`'nin bağımsız etkisi kanıtlandı) |

Eğer yalnızca \`(a=1, b=1)\` ve \`(a=0, b=0)\` test edilmişse:
- Dallanma kapsaması %100 der (çıkış hem 0 hem 1 oldu).
- Ancak İfade Kapsaması **eksik** kalır çünkü \`a\`'nın mı yoksa \`b\`'nin mi çıkışı 0 yaptığı ayırt edilememiştir!`,
      },
      {
        title: "4. MC/DC (Modified Condition / Decision Coverage) Nedir?",
        content: `Kritik güvenlik standartlarında (örneğin uçuş kontrol sistemleri DO-254 veya otonom sürüş ISO 26262) tam doğruluk tablosu testi ($2^N$ kombinasyon) çok büyük denklemlerde pratik değildir (10 değişken için 1024 test gerekir).

Bunun yerine **MC/DC** yaklaşımı kullanılır:
- $N$ adet değişken içeren bir karar için yalnızca $N + 1$ adet akıllıca seçilmiş test kombinasyonu ile tüm değişkenlerin bağımsız etkisi kanıtlanır.
- Her değişken için öyle iki test çifti bulunmalıdır ki:
  1. Değişkenin kendisi değer değiştirsin (0 -> 1).
  2. Diğer tüm değişkenler sabit kalsın.
  3. Tüm ifadenin nihai kararı değer değiştirsin (0 -> 1).
Modern EDA araçları (VCS, Questa) MC/DC analizini otomatik olarak raporlar.`,
      },
      {
        title: "5. İfade Kapsaması Açıklarını Giderme",
        content: `Simülatör raporlarında bir ifadenin tablosunda \`Uncovered Rows\` görüldüğünde:
1. **Maskeleyen Değişkeni Belirleyin:** Hangi değişkenin sabit kalarak diğerini perdelediğini tespit edin.
2. **Kısıtları İnceleyin:** Testbench'teki randomizasyon kısıtlarında o değişkenlerin bağımsız hareket etmesini engelleyen çapraz kısıtlar (\`cross-constraints\`) var mı?
3. **Yönlendirilmiş Test Ekleyin:** Rastgele testlerin nadiren yakaladığı hassas kombinasyonu üreten bir test sekansı kurgulayın.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Mantıksal İfade ve Koşul Kapsaması (Expression & Condition Coverage)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "expression-coverage.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `assign grant = req_valid && !fifo_full;`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Mantıksal İfade ve Koşul Kapsaması (Expression & Condition Coverage)",
      initialCode: `assign grant = req_valid && !fifo_full;`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "'assign out = a && b;' mantıksal ifadesinde, 'a' değişkeninin çıkış üzerindeki bağımsız etkisini (operand independence) kanıtlamak için 'b' değişkeninin değeri ne olmalıdır?",
      options: ["A) 'b' mutlaka 1 olmalıdır; çünkü 'b=0' iken 'a' ne olursa olsun çıkış 0 olarak maskelenir ve 'a' sinyalinin çıkışı tek başına değiştirme yeteneği gözlemlenemez", "B) 'b' mutlaka 0 olmalıdır", "C) 'b' sinyali yüksek empedansta (Z) tutulmalıdır", "D) 'b' değişkeninin değeri önemsizdir"],
      correctIndex: 0,
      explanation: "AND mantık kapısında 0 değeri baskındır (dominant). Eğer b=0 olursa çıkış her zaman 0 kalır (a maskelenir). Dolayısıyla a'nın çıkış üzerindeki bağımsız etkisini görebilmek için b'nin nötr (non-dominant) değeri olan 1'de sabit tutulması şarttır.",
    },
  },
  "toggle-coverage": {
    id: "toggle-coverage",
    badge: "Modül 5 • Kapsama Analizi (Coverage Metrics & Closure)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Sinyal Geçiş Kapsaması (Toggle Coverage)",
    subtitle: "RTL sinyallerinin 0->1 ve 1->0 durum geçişleri, çok bitli veri yolları, ölü lojik tespiti ve dışlama kuralları.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Toggle kapsaması, yongadaki her bir fiziksel tel ve yazmacın dinamik aktivitesini ölçer. Bu bölümde:
- Toggle Kapsamasının iki temel ölçüm gözü (\`bins\`): \`0 -> 1\` ve \`1 -> 0\` geçişleri.
- Genişletilmiş toggle seviyeleri (2-state vs 4-state / 8-state toggle).
- Çok bitli veri ve adres yollarında bit seviyesinde toggle analizi.
- Toggle açıklarının ortaya çıkardığı 3 kritik donanım senaryosu: Eksik uyarım, ölü lojik ve meşru kısıtlar.
- Toggle kapsamasından hariç tutulması gereken sinyaller (sabit pinler, test sinyalleri).
- Toggle Kapsaması vs Diğer kod kapsama metrikleri.`,
      },
      {
        title: "2. Temel Prensip: Her Bit İçin İki Geçiş Kutusu",
        content: `Toggle kapsaması, tasarımdaki her bir skaler sinyal ve vektörün her bir biti için iki temel soruyu yanıtlar:
1. Bu bit en az bir kez \`0\` seviyesinden \`1\` seviyesine yükseldi mi (\`0 -> 1\` toggle)?
2. Bu bit en az bir kez \`1\` seviyesinden \`0\` seviyesine düştü mü (\`1 -> 0\` toggle)?

Eğer tek bitlik bir \`flag\` sinyali simülasyon boyunca sadece \`0\`'da kalırsa: **%0 toggle**.  
Eğer \`0\`'dan \`1\`'e çıkar ve bir daha hiç \`0\`'a dönmezse: **%50 toggle**.  
Hem \`0 -> 1\` hem de \`1 -> 0\` geçişlerini tamamlarsa: **%100 toggle** elde edilir.

Bazı simülatörler \`Z\` ve \`X\` durumlarını da içeren 8-durumlu geçişleri (\`4-state toggle\`) destekler; ancak standart RTL sign-off süreçlerinde standart 2-durumlu (0->1 ve 1->0) geçişler temel alınır.`,
      },
      {
        title: "3. Çok Bitli Veri Yollarında (Busses) Toggle Analizi",
        content: `32-bit veya 64-bitlik bir veri yolunda (\`logic [31:0] data_bus\`) toggle analizi her bir bit için bağımsız yapılır:
- Toplam bin sayısı: $32 \\times 2 = 64$ adettir.
- Bir test paketinde sürekli küçük sayılar (örneğin 0 ile 15 arası değerler) gönderilirse, veri yolunun alt 4 biti (\`data_bus[3:0]\`) %100 toggle olurken, üst bitleri (\`data_bus[31:4]\`) hep 0 kaldığı için %0 toggle olarak kalır!
- Bu durum, testbench'in veri genişliğinin tamamını zorlamadığını ve üst bitlerdeki donanım yollarının hiç test edilmediğini gösterir.`,
      },
      {
        title: "4. Toggle Boşluklarının İşaret Ettiği 3 Kritik Durum",
        content: `Bir sinyalin toggle olmaması şu üç nedenden birine işaret eder:

1. **Eksik Test Uyarımı (Missing Stimulus):** Testbench veri genişliğini tam sürmemiştir, adres aralığının sınırlarına ulaşmamıştır veya belirli komutları göndermemiştir. Çözüm: Test senaryolarını çeşitlendirmek.
2. **Ölü veya Bağlantısız Mantık (Dead / Disconnected Logic):** Bir modülün çıkış pini üst seviyede boşta bırakılmıştır (\`unconnected\`) veya bir register'a yazma mantığı RTL'de yanlışlıkla unutulmuştur. Bu doğrudan bir **RTL tasarım hatasıdır!**
3. **Tasarım Gereği Sabit Sinyaller (Legitimately Tied-Off):** Bir arayüz 64-bit destekliyordur ancak o konfigürasyonda üst 32 bit şasiye bağlanmıştır (\`1'b0\`). Bu durum geçerli bir tasarım kararıdır ve waiver ile dışlanmalıdır.`,
      },
      {
        title: "5. Toggle Kapsamasından Dışlanması (Exclusion) Gereken Sinyaller",
        content: `Tapeout öncesi %100 toggle hedefine ulaşmak için şu sinyal grupları resmi onay ile dışlama listesine alınır:
- **Sabit Bağlı Pinler (\`Tied-off Pins\`):** \`assign unused_input = 1'b0;\` gibi sinyaller asla toggle olamaz.
- **DFT ve Tarama Pinleri (\`Scan Pins / Test Mode\`):** Yalnızca fabrikadaki çip testinde kullanılan \`scan_en\`, \`test_mode\` sinyalleri fonksiyonel simülasyonda aktifleştirilmez.
- **Statik Konfigürasyon ve Güvenlik Sigortaları (\`Fuses / Strap Pins\`):** Çip açılışında değeri sabitlenen ve çalışma süresince değişmeyen mod seçiciler.
- **Kullanılmayan Bellek Adres Bitleri:** Bellek boyutu adres yolundan küçükse üst bitler toggle olmaz.`,
      },
      {
        title: "6. Toggle Kapsaması ve Güç Tüketimi (Power Estimation)",
        content: `Toggle kapsaması yalnızca doğrulama için değil, fiziksel tasarım ve güç analizi için de hayatidir:
- Dijital CMOS devrelerinde dinamik güç tüketimi, kapıların durum değiştirme sıklığıyla ($lpha \\cdot C \\cdot V^2 \\cdot f$) doğru orantılıdır.
- Simülasyondan çıkarılan toggle aktivite dosyaları (\`SAIF\` - Switching Activity Interchange Format veya \`VCD\`), güç analizi araçlarına (Synopsys PrimePower vb.) beslenerek çipin gerçek çalışma sırasındaki ortalama ve tepe güç tüketimi hesaplanır.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Sinyal Geçiş Kapsaması (Toggle Coverage)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "toggle-coverage.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `module fifo_ctrl ( input logic clk, input logic rst_n, input logic wr_en, // Write enable input logic rd_en, // Read enable output logic full, // FIFO full flag output logic empty, // FIFO empty flag output logic [3:0] count // Current fill level ); // ... implementation endmodule`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Sinyal Geçiş Kapsaması (Toggle Coverage)",
      initialCode: `module fifo_ctrl ( input logic clk, input logic rst_n, input logic wr_en, // Write enable input logic rd_en, // Read enable output logic full, // FIFO full flag output logic empty, // FIFO empty flag output logic [3:0] count // Current fill level ); // ... implementation endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "32-bit genişliğindeki bir veri yolunda (data_bus[31:0]) simülasyon boyunca sadece 0 ile 255 arasındaki sayıların aktarılması durumunda Toggle Kapsaması raporunda ne gözlemlenir?",
      options: ["A) Veri yolunun alt 8 bitinin (data_bus[7:0]) her iki yönde de geçiş yaparak %100 toggle olması, ancak üst 24 bitin (data_bus[31:8]) sürekli 0 kalarak %0 toggle olması nedeniyle toplam veri yolu toggle kapsamının çok düşük kalması", "B) Simülatörün otomatik olarak 32-bit'in tümünü toggle oldu kabul etmesi", "C) Veri yolunun saat hızının düşmesi", "D) Statement kapsamının otomatik olarak sıfırlanması"],
      correctIndex: 0,
      explanation: "0 ile 255 arasındaki sayılar ikili tabanda sadece ilk 8 biti (2^8 = 256) kullanır. Üstteki 24 bit sürekli 0 değerinde kalır ve hiçbir zaman 1'e geçiş (0->1) yapamaz. Bu nedenle üst 24 bitin toggle kapsaması %0 kalır ve testbench'in veri alanını tam taramadığını ortaya çıkarır.",
    },
  },
  "assertion-coverage": {
    id: "assertion-coverage",
    badge: "Modül 5 • Kapsama Analizi (Coverage Metrics & Closure)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "SVA Doğrulama İddiası Kapsaması (Assertion Coverage)",
    subtitle: "SystemVerilog Assertions (SVA) ile cover property, assert property, protokol kurallarının temporal doğrulanması ve kapsama analizi.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `SystemVerilog Assertions (SVA), donanım doğrulamasında protokol kurallarının zamansal (temporal) olarak denetlenmesini sağlar. Bu bölümde:
- Üç temel SVA direktifi: \`assert property\`, \`cover property\` ve \`assume property\`.
- Assertion kapsaması simülatörler tarafından nasıl ölçülür? (Denenen, Başarılı, Başarısız durumları).
- Boş Başarı (\`Vacuous Success\`) kavramı ve neden tehlikeli bir yanılsama olduğu.
- Assertion Kapsaması vs Yapısal Kod Kapsaması (\`Structural Code Coverage\`).
- Yüksek değerli kapsama üreten SVA yazım teknikleri: Assert ve Cover eşleşmesi, \`disable iff\` ile reset filtreleme.
- Sign-off sürecinde assertion kapsaması hedefleri ve kapsama veritabanı entegrasyonu.`,
      },
      {
        title: "2. Üç Temel SVA Direktifi ve Görevleri",
        content: `SVA özellikleri farklı amaçlarla testbench veya RTL içine yerleştirilir:

1. **\`assert property\` (Hata Denetimi):** Bir protokol veya mantık kuralının her zaman doğru olduğunu varsayar. Kural ihlal edildiğinde simülatör anında hata fırlatır (\`Assertion Failure\`). Ancak kural sağlandığında bunu varsayılan olarak başarı sayacı olarak kaydetmeyebilir.
2. **\`cover property\` (Kapsama Takibi):** Belirli bir zamansal sekansın veya protokol akışının simülasyon boyunca en az bir kez (veya belirli sayıda) gerçekleşip gerçekleşmediğini izler. Kapsama veritabanına doğrudan bir \`bin\` olarak eklenir.
3. **\`assume property\` (Kısıtlama / Formal Doğrulama):** Genellikle Formal Verification (FV) araçlarında arayüz girişlerinin uyması gereken kuralları tanımlar. Dinamik simülasyonda ise \`assert\` gibi davranarak testbench'in hatalı uyarım sürmesini engeller.`,
      },
      {
        title: "3. Assertion Kapsaması Nasıl Ölçülür? Durum Analizi",
        content: `Bir assertion simülasyon boyunca şu 4 durumdan birinde bulunur:

- **Attempted (Denendi):** Özelliğin öncül (antecedent) koşulu tetiklendi.
- **Success (Gerçek Başarı):** Öncül sağlandı ve ardından gelen ardıl (consequent) koşul da zamansal olarak başarıyla yerine getirildi.
- **Vacuous Success (Boş Başarı):** Öncül koşul **hiç gerçekleşmediği için** mantıksal olarak özellik doğru kabul edildi (\`False -> Anything = True\`). Örneğin \`(valid) |=> (ready)\` kuralında simülasyon boyunca \`valid\` hiç 1 olmadıysa, bu kural boş başarı verir. Bu, testbench'in o kuralı aslında hiç zorlamadığı anlamına gelir!
- **Failure (Başarısızlık):** Öncül gerçekleşti ancak ardıl koşul ihlal edildi. Bu doğrudan bir donanım veya testbench hatasıdır.`,
      },
      {
        title: "4. Assertion Kapsaması vs Yapısal Kod Kapsaması",
        content: `Yapısal kod kapsaması (Line, Branch, Toggle), donanımın zamansal davranışını ölçemez.

Örneğin bir AXI veri yolunda:
- \`ready\` sinyali 1 oldu (Line ve Toggle kapsaması %100).
- \`valid\` sinyali 1 oldu (Line ve Toggle kapsaması %100).
- Ancak \`ready\`, \`valid\` sinyalinden tam 3 çevrim sonra mı geldi? Protokolün izin verdiği maksimum gecikme aşıldı mı?
Yapısal kod kapsaması bu zamansal ilişkiyi göremez. **Assertion Coverage**, çok çevrimli protokol sekanslarının (\`##[1:5]\`) ve el sıkışma zamanlamalarının tam olarak doğrulandığını kanıtlayan tek metriktir.`,
      },
      {
        title: "5. Yüksek Değerli Kapsama Üreten SVA Yazım Teknikleri",
        content: `Profesyonel doğrulama mühendisleri assertion yazarken şu kuralları uygular:

1. **Her Assert İçin Bir Cover Eşleşmesi Yapın:**
\`\`\`systemverilog
// Hata denetimi:
assert property (p_req_to_ack);
// Kapsama dogrulamasi (bos basariyi onlemek icin):
cover property (p_req_to_ack);
\`\`\`
2. **Reset Durumunu Her Zaman \`disable iff\` ile Filtreleyin:**
\`\`\`systemverilog
property p_req_ack;
    @(posedge clk) disable iff (!rst_n)
    req |-> ##[1:4] ack;
endproperty
\`\`\`
Reset aktifken tetiklenen assertion'lar sahte hatalara (\`false positive\`) yol açar.
3. **Uç Senaryoları (Corner Cases) Hedefleyin:** Örneğin bir FIFO'nun tam doluyken aynı anda hem yazma hem okuma yapıldığı sekansı \`cover property\` ile etiketleyin.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **SVA Doğrulama İddiası Kapsaması (Assertion Coverage)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "assertion-coverage.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// Assert: whenever a request is made, an acknowledge must follow within 4 cycles property p_req_ack; @(posedge clk) disable iff (!rst_n) req |-> ##[1:4] ack; endproperty assert property (p_req_ack) else $error("Request not acknowledged within 4 cycles");`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: SVA Doğrulama İddiası Kapsaması (Assertion Coverage)",
      initialCode: `// Assert: whenever a request is made, an acknowledge must follow within 4 cycles property p_req_ack; @(posedge clk) disable iff (!rst_n) req |-> ##[1:4] ack; endproperty assert property (p_req_ack) else $error("Request not acknowledged within 4 cycles");`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "SystemVerilog Assertion (SVA) analizinde 'Boş Başarı' (Vacuous Success) durumu ne anlama gelir ve doğrulama mühendisi için neden bir uyarı işaretidir?",
      options: ["A) İddianın öncül (antecedent) koşulu simülasyon boyunca hiç gerçekleşmediği için mantıksal olarak başarılı sayılması; yani testbench'in o protokol senaryosunu gerçekte hiç test etmediğini ve uyarımın eksik olduğunu göstermesi", "B) Simülasyonun başarıyla sonlanıp tüm dalga formlarının silinmesi", "C) Assertion'ın hata bulup simülasyonu durdurması", "D) Flip-flop saat frekansının sıfıra inmesi"],
      correctIndex: 0,
      explanation: "Matematiksel mantıkta 'Yanlış -> Herhangi Bir Şey' ifadesi her zaman Doğru kabul edilir (Vacuous Truth). Eğer bir SVA kuralının başlangıç şartı (antecedent) hiç tetiklenmemişse simülatör kuralı 'başarılı' sayar; ancak gerçekte o protokol senaryosu hiç uyarılmamıştır. Bu durum testbench'teki uyarım açığını gizleyebilir.",
    },
  },
  "unreachable-code-analysis": {
    id: "unreachable-code-analysis",
    badge: "Modül 5 • Kapsama Analizi (Coverage Metrics & Closure)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Erişilemeyen Kod Analizi ve Kapsama Dışlama Yönetimi (Unreachable Code Analysis)",
    subtitle: "RTL'deki ulaşılamaz yapıların tespiti, formel yöntemlerle kanıtlama, dışlama (exclusion/waiver) süreçleri ve denetim.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Tapeout öncesi %100 kod kapsamasına ulaşmanın önündeki en büyük engel erişilemeyen kodlardır (\`unreachable code\`). Bu bölümde:
- RTL tasarımlarında erişilemeyen kodların ortaya çıkış nedenleri.
- Savunma amaçlı \`default\` kolları, birbirini dışlayan koşullar ve parametrik kısıtlar.
- Erişilemeyen kodların kapsama kapanışı (\`coverage closure\`) üzerindeki etkisi.
- Resmi Dışlama / Feragat (\`Exclusion / Waiver\`) süreci ve 4 aşamalı iş akışı.
- Erişilemeyen Kod (\`Unreachable Code\`) ile Ölü Kod (\`Dead Code\`) arasındaki hayati fark.
- Formal Doğrulama (FV / Unreachability Analysis) araçlarıyla otomatik dışlama kanıtlama.`,
      },
      {
        title: "2. RTL'de Erişilemeyen Kod Neden Ortaya Çıkar?",
        content: `Erişilemeyen kod, tasarımcının hatasından değil, çoğunlukla donanım güvenliği ve iyi kodlama pratiklerinden kaynaklanır:

1. **Tam Numaralandırılmış Case Bloklarında Savunma Amaçlı \`default\`:**
\`\`\`systemverilog
typedef enum logic [1:0] {IDLE=2'b00, BUSY=2'b01, DONE=2'b10} state_t;
state_t state;
always_comb begin
    case (state)
        IDLE: ...;
        BUSY: ...;
        DONE: ...;
        default: state_err = 1'b1; // 2'b11 durumu FSM'de asla olusmaz ama
                                    // guvenlik icin default konulmustur!
    endcase
end
\`\`\`
Bu \`default\` kolu normal fonksiyonda asla çalışamaz; dolayısıyla simülasyonda %0 branch coverage verir.

2. **Tasarım Gereği Birbirini Dışlayan Koşullar:**
Örneğin donanımda bir arbitraj bloğu \`grant_a\` ve \`grant_b\` sinyallerinin aynı anda 1 olmasını donanımsal olarak engelliyorsa, alt modüldeki \`if (grant_a && grant_b)\` dalı asla çalışamaz.

3. **Parametre Kısıtları (Generic/Parameter Constrained Logic):**
Modül \`FIFO_DEPTH=16\` parametresiyle çağrıldığında, 32-derinlik için yazılmış özel kontrol satırları ölü kalır.`,
      },
      {
        title: "3. Erişilemeyen Kod vs Ölü Kod (Dead Code): Kritik Ayrım",
        content: `| Kriter | Erişilemeyen Kod (\`Unreachable Code\`) | Ölü Kod (\`Dead Code\`) |
| :--- | :--- | :--- |
| **Tanım** | Tasarım bütünlüğü, güvenlik veya parametre kısıtı nedeniyle ulaşılamayan kod | Tasarımcının unuttuğu, mimariden çıkarılmış veya hiçbir yere bağlanmayan gereksiz kod |
| **Aksiyon** | Resmi olarak incelenir, dokümante edilir ve **Waiver (Dışlama)** dosyasına eklenir | **RTL'den derhal silinmeli veya temizlenmelidir!** |
| **Tehlike** | Kapsama yüzdesini düşürür | Silikon alanı israf eder, zamanlama kapanışını bozar ve beklenmeyen parazit yaratabilir |`,
      },
      {
        title: "4. Dört Adımlı Resmi Kapsama Dışlama (Waiver) Süreci",
        content: `Bir kod satırını kapsama raporundan öylece silip atamazsınız. Yarı iletken endüstrisinde katı bir denetim süreci işletilir:

- **Adım 1: Kapsama Açığını İnceleyin:** Kapsanmayan satırın neden çalışmadığını araştırın. Testbench eksikliği mi yoksa mantıksal imkansızlık mı?
- **Adım 2: Nedeni Sınıflandırın:** Durum gerçekten erişilemez mi? (Formal analiz aracı ile ulaşılamaz olduğu matematiksel olarak kanıtlanabilir mi?).
- **Adım 3: Dışlamayı Dokümante Edin:** EDA aracının waiver formatına (örneğin Questa \`.do\` veya VCS \`.el\` dosyası) tam gerekçesi, tasarımcı ve doğrulama mühendisinin ismiyle kaydedilir:
\`\`\`tcl
# VCS Kapsama Dislama Kurali
coverage exclude -line alu_ctrl.sv:142 -comment "Savunma amacli default case dali, formal ile kanitlandi"
\`\`\`
- **Adım 4: Ekip İncelemesi (Sign-Off Review):** Tapeout öncesi tüm waiver listesi baş tasarımcı ve doğrulama lideri tarafından satır satır onaylanır.`,
      },
      {
        title: "5. Formal Kapsama Analizi (Formal Reachability Analysis)",
        content: `Modern EDA ortamlarında (Synopsys VC Formal, Cadence JasperGold, Siemens Questa CoverCheck) erişilemeyen kod analizi otomatikleştirilmiştir:
- Formal motor, RTL kodunu matematiksel Boolean denklemleri olarak çözer.
- Simülasyonda kapsanmamış satırları hedef alır ve *"Bu satıra ulaşabilecek herhangi bir girdi kombinasyonu var mı?"* sorusunu araştırır.
- Eğer matematiksel olarak hiçbir girdinin o satırı aktifleştiremeyeceğini kanıtlar ise (\`Mathematically Unreachable\`), simülatör için otomatik onaylı bir dışlama dosyası üretir.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Erişilemeyen Kod Analizi ve Kapsama Dışlama Yönetimi (Unreachable Code Analysis)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "unreachable-code-analysis.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `typedef enum logic [1:0] { IDLE = 2'b00, READ = 2'b01, WRITE = 2'b10, DONE = 2'b11 } state_t; state_t state; always_comb begin case (state) IDLE: next_state = READ; READ: next_state = WRITE; WRITE: next_state = DONE; DONE: next_state = IDLE; default: next_state = IDLE; // Unreachable: all 2-bit values handled above endcase end`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Erişilemeyen Kod Analizi ve Kapsama Dışlama Yönetimi (Unreachable Code Analysis)",
      initialCode: `typedef enum logic [1:0] { IDLE = 2'b00, READ = 2'b01, WRITE = 2'b10, DONE = 2'b11 } state_t; state_t state; always_comb begin case (state) IDLE: next_state = READ; READ: next_state = WRITE; WRITE: next_state = DONE; DONE: next_state = IDLE; default: next_state = IDLE; // Unreachable: all 2-bit values handled above endcase end`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "RTL tasarımında 'Erişilemeyen Kod' (Unreachable Code) ile 'Ölü Kod' (Dead Code) arasındaki temel fark ve izlenmesi gereken doğru mühendislik adımı nedir?",
      options: ["A) Ölü kod, işlevsiz veya yanlışlıkla unutulmuş mantık olup RTL kaynak kodundan tamamen silinmelidir; erişilemeyen kod ise savunma amaçlı default dalları veya parametrik kısıtlar gibi meşru nedenlerle ulaşılamayan yapılar olup incelenip resmi bir Waiver (dışlama) ile belgelenmelidir", "B) Her iki kod türü de testbench tarafından zorla çalıştırılmalı ve gerekirse donanım saat frekansı artırılmalıdır", "C) Ölü kodlar sentez aracına özel direktiflerle çipe aktarılmalıdır", "D) Erişilemeyen kodların tümü silinmeli, ölü kodlar ise dışlanmalıdır"],
      correctIndex: 0,
      explanation: "Ölü kod (dead code) mimariden kopmuş, hiçbir fonksiyonu olmayan gereksiz kod parçalarıdır ve kod temizliği kapsamında RTL'den silinmelidir. Erişilemeyen kod ise güvenlik amaçlı 'default' veya parametre kısıtları nedeniyle fiziksel olarak ulaşılamayan meşru yapılardır ve gerekçelendirilerek resmi bir Waiver (dışlama) ile kapsama hesabından düşülür.",
    },
  },
  "bug-lifecycle": {
    id: "bug-lifecycle",
    badge: "Modül 6 • Doğrulama Kapanışı ve Sign-Off (Verification Sign-Off)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Donanım Hata Yaşam Döngüsü ve Triyaj Süreci (Bug Lifecycle & Triaging)",
    subtitle: "Hata keşfinden kök neden analizine, RTL düzeltmesinden regresyon doğrulamasına ve kapatmaya kadar uçtan uca hata yönetimi.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Donanım dünyasında bir hatanın maliyeti aşamalar ilerledikçe katlanarak artar (Pre-silicon aşamasında 1 saatlik debug vs Post-silicon aşamasında 20 milyon dolarlık yeniden üretim / respin). Bu bölümde:
- Donanım hata yaşam döngüsünün (Bug Lifecycle) standart evreleri.
- Profesyonel bir donanım hata raporunun (Bug Report) anatomisi.
- Hata Triyajı (\`Triage\`): RTL vs Testbench vs Şartname uyuşmazlığı tespiti.
- Hata Önem Derecesi (\`Severity\`) ve Öncelik (\`Priority\`) matrisi.
- Kök Neden Analizi (\`Root Cause Analysis - RCA\`) ve RTL düzeltme süreci.
- Düzeltmenin doğrulanması, gerileme (\`regression\`) testleri ve kapanış (\`Closure\`).
- Jira/Bugzilla entegrasyonu, günlük Bug Scrub toplantıları ve hata yakma eğrisi (\`Bug Burn-down\`).`,
      },
      {
        title: "2. Donanım Hata Yaşam Döngüsünün Evreleri",
        content: `Bir donanım hatası keşfedildiği andan arşivlenene kadar şu standart adımlardan geçer:

1. **Keşif (Discovery / Detection):** Gece regresyonunda bir test çöker, assertion patlar veya scoreboard uyumsuzluk raporlar.
2. **Kayıt ve Raporlama (Filing):** Hata detaylı parametreleriyle Jira / Bugzilla sistemine işlenir (Durum: \`NEW / OPEN\`).
3. **Triyaj (Triage):** Hata DV ve RTL liderleri tarafından incelenir, gerçek bir tasarım hatası olup olmadığı sorgulanır ve sorumlu mühendise atanır (Durum: \`ASSIGNED\`).
4. **Kök Neden Analizi (Root Cause Analysis - RCA):** Tasarımcı dalga formunu inceler ve hatanın RTL'deki tam mantıksal kaynağını bulur.
5. **Düzeltme (Design Fix):** Tasarımcı RTL kodunu günceller ve lokal ortamda testi doğrular (Durum: \`RESOLVED / FIXED\`).
6. **Yeniden Doğrulama (Re-Verification):** Doğrulama mühendisi aynı seed ile testi yeniden koşar ve hatanın geçtiğini (\`PASS\`) teyit eder.
7. **Regresyon ve Kapatma (Closed):** Hata kalıcı gerileme paketine eklenir ve bilet kapatılır (Durum: \`VERIFIED / CLOSED\`).`,
      },
      {
        title: "3. Mükemmel Bir Donanım Hata Raporunun Anatomisi",
        content: `Yetersiz bir hata raporu ("DMA çalışmıyor, lütfen bakın") mühendislerin saatlerini boşa harcar. Profesyonel bir raporda şunlar bulunmalıdır:

- **Hata Özeti:** Kısa ve net başlık (örn: \`[DMA][AXI-Stream] Paket uzunlugu 64 bayt iken TLAST sinyali 1 cevrim erken dusuyor\`).
- **Simülasyon Tohumu ve Test İsmi:** \`+UVM_TESTNAME=dma_burst_test +ntb_random_seed=7829104\`.
- **Git Commit Hash:** RTL ve Testbench repo sürümleri.
- **Tekrarlama Komutu (Reproduce Command):** Tek bir komutla hatayı yeniden oluşturan terminal satırı.
- **Log ve Dalga Formu Yolu:** FSDB dosyasının sunucudaki tam adresi ve hata anının zaman damgası (\`t = 245.8 us\`).
- **Beklenen vs Gerçekleşen Davranış:** Şartnamenin Bölüm 4.2'sine göre beklenen davranış ve simülasyonda gözlemlenen hatalı davranış.`,
      },
      {
        title: "4. Önem Derecesi (Severity) ve Öncelik (Priority) Matrisi",
        content: `Tüm hatalar eşit derecede acil değildir:

| Seviye | Tanım | Örnek | Aksiyon |
| :--- | :--- | :--- | :--- |
| **S1 (Blocker)** | Tüm simülasyonu veya regresyonu kilitleyen, ilerlemeyi durduran hata | Çip resetten çıkmıyor, ana saat dağıtımı bozuk | Derhal RTL dondurulur, tüm ekip çözüme odaklanır |
| **S2 (Critical)** | Kritik bir arayüz veya temel fonksiyonun çalışmaması, geçici çözümü yok | PCIe arayüzü paketleri düşürüyor, veri yolu kilitleniyor | 24-48 saat içinde düzeltilmelidir |
| **S3 (Major)** | Bir fonksiyon hatalı çalışıyor ancak alternatif bir yazılım çözümü (\`workaround\`) var | Belirli bir burst modunda kesme gecikiyor | Planlı sprint içinde çözülür |
| **S4 (Minor / Trivial)** | Performans sapması veya kozmetik register biti uyumsuzluğu | Tanımlayıcı yazmacın alt biti yanlış değer dönüyor | Tapeout öncesi uygun vakitte çözülür |`,
      },
      {
        title: "5. Bug Scrub Toplantıları ve Hata Yakma (Burn-Down) Takibi",
        content: `Tapeout yaklaşırken proje yöneticileri haftalık veya günlük **Bug Scrub** toplantıları düzenler:
- Açıkta kalan tüm biletler incelenir: Hangi hatalar tapeout için engel (\`Tapeout Blocker\`), hangileri silikon sonrası yazılımla aşılabilir (\`Software Workaround\`)?
- **Bug Burn-Down Eğrisi:** Açılan yeni hatalar ile kapatılan hataların grafiğidir. Tapeout'a 4 hafta kala yeni hata açılma hızının sıfıra yaklaşması ve açık hata sayısının tamamen sıfırlanması zorunludur.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Donanım Hata Yaşam Döngüsü ve Triyaj Süreci (Bug Lifecycle & Triaging)",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Donanım doğrulama sürecinde bir hata raporu (Bug Ticket) açılırken 'Simülasyon Tohumu (Random Seed)' ve 'Git Commit Hash' bilgilerinin rapora eklenmesinin birincil önemi nedir?",
      options: ["A) Tasarımcının hatayı kendi yerel ortamında tek bir komutla %100 deterministik olarak yeniden üretebilmesini ve tam olarak hangi RTL sürümünde meydana geldiğini kesinleştirmesini sağlamak", "B) Simülasyon log dosyasının boyutunu küçültmek", "C) Hatanın önem derecesini otomatik olarak S4 (Minor) seviyesine düşürmek", "D) Sentez aracının saat ağını optimize etmesini sağlamak"],
      correctIndex: 0,
      explanation: "Kısıtlı rastgele testbench'lerde hatalar genellikle karmaşık rastgele uyarım dizileri sonucu ortaya çıkar. Kesin Git commit hash'i ve tam seed değeri olmadan bir tasarımcının hatayı yeniden üretmesi (reproduce) imkansıza yakındır. Bu bilgiler deterministik hata ayıklamanın temelidir.",
    },
  },
  "verification-metrics": {
    id: "verification-metrics",
    badge: "Modül 6 • Doğrulama Kapanışı ve Sign-Off (Verification Sign-Off)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Doğrulama Metrikleri ve İlerleme Takibi (Verification Metrics)",
    subtitle: "Kod ve fonksiyonel kapsama eğrileri, hata bulma oranı (bug rate), sızıntı oranı (escape rate) ve tamamlanma tahmin modelleri.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Doğrulama yöneticileri çipin ne zaman üretime hazır olduğunu sezgilerle değil, matematiksel metriklerle belirler. Bu bölümde:
- Doğrulama metriklerinin varlık nedeni ve proje takvimindeki rolü.
- Kapsama Metrikleri: Kod Kapsaması, Fonksiyonel Kapsama ve Assertion Kapsaması üçgeni.
- Hata Bulma Oranı (\`Bug Discovery Rate\`) ve beklenen S-eğrisi (\`S-Curve\`).
- Kırmızı Bayraklar (\`Red Flags\`): Erken plato çizimi ve tapeout öncesi geç gelen kritik hatalar.
- Hata Sızıntı Oranı (\`Bug Escape Rate\`): Blok seviyesinden SoC seviyesine ve silikona kaçan hataların maliyeti.
- Kalan doğrulama eforunu ve tapeout tarihini tahmin etme modelleri.`,
      },
      {
        title: "2. Doğrulama Metrikleri Üçgeni",
        content: `Başarılı bir tapeout için üç temel kapsama metriğinin eşzamanlı olarak hedefe ulaşması gerekir:

1. **Kod Kapsaması (Code Coverage - Yapısal):** RTL kaynak kodunun ne kadarının icra edildiğini ölçer. Hedef: Onaylı waiver'lar ile birlikte **%100**.
2. **Fonksiyonel Kapsama (Functional Coverage - Davranışsal):** Şartnamede tanımlanan kullanım senaryolarının, köşe durumların ve konfigürasyon kombinasyonlarının denenip denenmediğini \`covergroup\` ve \`coverpoint\` yapılarıyla ölçer. Hedef: **%100**.
3. **Assertion Kapsaması (Assertion Coverage - Zamansal):** Protokol kurallarının ve arayüz zamanlamalarının temporal olarak başarıyla doğrulandığını gösterir. Hedef: **%100 gerçek başarı (non-vacuous)**.`,
      },
      {
        title: "3. Beklenen Hata Bulma Eğrisi (S-Curve) ve Dinamikleri",
        content: `Sağlıklı bir donanım projesinde zaman içindeki kümülatif hata keşif eğrisi klasik bir **S-eğrisi (Sigmoid)** takip eder:

1. **Aşama 1 - Başlangıç (Ramp-up):** Testbench yeni ayağa kalkar, temel sanity testleri koşulur, hata sayısı yavaş artar.
2. **Aşama 2 - Yoğun Doğrulama (Peak Bug Rate):** Kısıtlı rastgele testler devreye girer, regresyonlar başlar. Günlük keşfedilen hata sayısı zirveye ulaşır. Bu dönemde çok sayıda hata bulunması projenin sağlıklı ilerlediğini gösterir.
3. **Aşama 3 - Kapanış ve Doygunluk (Saturation / Tapering):** RTL olgunlaşır, testbench yüz binlerce tohumla koşulmasına rağmen artık yeni hata bulunamaz. Yeni hata keşif hızı sıfıra yaklaşır. Bu aşama tapeout güvenini temsil eder.`,
      },
      {
        title: "4. Projedeki Kırmızı Bayraklar (Red Flags)",
        content: `Metrikleri doğru okumak yaklaşan felaketleri önceden haber verir:

- **Kırmızı Bayrak 1: Hata Oranının Erken Platoya Ulaşması:** Eğer regresyonlar koşulurken hata bulma eğrisi henüz projenin ortasında aniden yataylaşmışsa, tasarım hatasız demek değildir! Testbench artık yeni alanları taramıyor olabilir, kısıtlar çok dar tutulmuş olabilir veya testler belirli bir döngüde sıkışmış olabilir.
- **Kırmızı Bayrak 2: Tapeout Öncesi Geç Gelen S1/S2 Hataları:** Tapeout'a 2 hafta kala kritik mimari hatalar keşfediliyorsa, doğrulama planında büyük kör noktalar (\`blind spots\`) var demektir. Bu durumda tapeout tarihinin ertelenmesi şarttır.`,
      },
      {
        title: "5. Hata Sızıntı Oranı (Bug Escape Rate) ve Maliyeti",
        content: `**Escape Rate**, bir doğrulama katmanında yakalanması gerekirken bir sonraki katmana kaçan hataların yüzdesidir:
- Blok seviyesinden alt-sistem (subsystem) seviyesine kaçış.
- Alt-sistem seviyesinden SoC tam-çip seviyesine kaçış.
- SoC simülasyonundan emülasyona (emulation) veya silikona kaçış.

**Maliyet Kuralı (10x Kuralı):**
Bir hatayı blok simülasyonunda düzeltmek \\$100 efor gerektiriyorsa; SoC seviyesinde \\$1,000, post-silikon laboratuvarda \\$100,000, piyasaya sürülen yongada ise milyonlarca dolar ve itibar kaybına mal olur. Bu nedenle blok seviyesinde escape oranını sıfırlamak en kritik hedeftir.`,
      },
      {
        title: "6. Metriklerle Tapeout Hazırlığını Tahmin Etme",
        content: `Bir doğrulama yöneticisi sign-off toplantısında şu metrik panosunu (\`Dashboard\`) sunar:
- **Kapsama İlerleme Hızı (Coverage Slope):** Kapsama her hafta yüzde kaç artıyor?
- **Açık Hata Trendi:** Kapatılan hata sayısı açılan hata sayısından fazla mı?
- **Regresyon Geçiş Oranı:** Gece regresyonlarında \`Pass Rate >= %99.5\` seviyesinde mi?
Bu metriklerin tümü yeşile dönmeden çipin fiziksel maske üretimine gönderilmesine onay verilmez.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Doğrulama Metrikleri ve İlerleme Takibi (Verification Metrics)",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir ASIC doğrulama projesinde, kümülatif hata bulma eğrisinin (bug discovery rate) projenin planlanan bitiş tarihinden haftalar önce aniden yataylaşarak platoya ulaşması doğrulama lideri için neden bir tehlike (Red Flag) işareti olabilir?",
      options: ["A) Tasarımın tamamen hatasız olmasından ziyade, testbench'in uyarım kısıtlarının (constraints) çok dar olması veya test senaryolarının yeni fonksiyonel durumları keşfetmeyip aynı yolları tekrar tekrar dönmesi nedeniyle gizli hataların bulunamamış olma ihtimali", "B) Simülasyon sunucularının aşırı ısınması", "C) Kod kapsaması sayaçlarının bozulmuş olması", "D) Sentez aracının yeni saat frekansları denemesi"],
      correctIndex: 0,
      explanation: "Doğrulama sürecinde hata bulma oranının erken düzleşmesi (platoya girmesi) genellikle rehavete yol açan sahte bir güven duygusu yaratır. Çoğu zaman bu durum testbench'in yeni köşe durumları uyarmadığını, kısıtların aşırı kısıtlayıcı olduğunu veya uyarım uzayının tükendiğini gösterir.",
    },
  },
  "sign-off-criteria": {
    id: "sign-off-criteria",
    badge: "Modül 6 • Doğrulama Kapanışı ve Sign-Off (Verification Sign-Off)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Doğrulama Onay Kriterleri ve Kapanış (Sign-Off Criteria & Closure)",
    subtitle: "Tapeout öncesi %100 kapsama kapanışı, açık hata sıfırlama, gate-level simülasyon ve resmi onay incelemesi (sign-off review).",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Sign-off, bir yonga tasarımının üretim fabrikasına (foundry) maske üretimi için gönderilmesine verilen resmi mühendislik onayıdır. Bu bölümde:
- Doğrulama Sign-Off sürecinin önemi ve finansal sonuçları.
- Kapsama Kapanış Kriterleri: Kod Kapsaması, Fonksiyonel Kapsama ve Assertion Kapsaması hedefleri.
- Kapsama feragatlerinin (\`waivers / exclusions\`) resmi denetim süreci.
- Hata Kapanış Kriterleri: Açık hata toleransları (S1/S2 Blocker sıfırlama) ve bilinen sınırlamalar (\`known limitations\`).
- Regresyon Temizliği: Tam regresyon geçiş oranı ve Gate-Level Simülasyon (GLS) onayı.
- Resmi Sign-Off İnceleme Toplantısı (\`Sign-Off Review Meeting\`) ve imza yetkilileri.`,
      },
      {
        title: "2. Doğrulama Sign-Off Nedir ve Neden Hayatidir?",
        content: `Yazılım dünyasında bir hata çıktığında sunucuya birkaç dakika içinde yeni yama (\`hotfix\`) yüklenebilir. Ancak donanım dünyasında silikon üretildikten sonra RTL kodunu değiştiremezsiniz:
- Modern 5nm veya 3nm süreçlerinde bir fotolitografi maske seti **20 ila 40 milyon dolar** arasındadır.
- Hatalı bir çipin yeniden üretilmesi (\`respin\`) en az 6-9 ay gecikmeye yol açar ve şirketin pazara giriş penceresini (\`time-to-market\`) tamamen yok edebilir.
- Bu nedenle **Doğrulama Sign-Off**, doğrulama ekibinin *"Tasarım şartnameye %100 uygundur, hiçbir kritik hata kalmamıştır ve üretime hazırdır"* taahhüdüdür.`,
      },
      {
        title: "3. Kapsama Kapanış Kriterleri (%100 Closure)",
        content: `Tapeout için masaya konması gereken asgari kapsama şartları:

1. **%100 Kod Kapsaması (Waiver'lar Dahil):** Line, Branch, Condition, FSM ve Toggle kapsamalarının her biri ham simülasyon ve resmi onaylı feragatler (\`waivers\`) ile %100'e kapatılmalıdır.
2. **%100 Fonksiyonel Kapsama (Functional Coverage):** Doğrulama planında (\`vPlan\`) yer alan tüm özellikler, modlar ve köşe durumlar için tanımlanmış \`covergroup\` ve \`coverpoint\` nesneleri istisnasız %100 olmalıdır.
3. **%100 Assertion Kapsaması:** Tüm protokol kontrolleri en az bir kez gerçek (non-vacuous) başarı sağlamış olmalı ve regresyonda **sıfır assertion hatası** bulunmalıdır.`,
      },
      {
        title: "4. Hata Kapanış Kriterleri (Zero Open Critical Bugs)",
        content: `Jira / Bugzilla veritabanında tapeout öncesi katı filtreler uygulanır:
- **S1 (Blocker) ve S2 (Critical) Hatalar:** Kesinlikle **SIFIR (0)** olmak zorundadır. Tek bir açık S1 hatası varken tapeout yapılamaz.
- **S3 (Major) Hatalar:** İstisnai durumlar hariç sıfır olmalıdır. Eğer açık bırakılacaksa, yazılım sürücüsünde bir geçici çözümün (\`workaround\`) bulunduğu kanıtlanmalı ve mimari lider tarafından yazılı onaylanmalıdır.
- **S4 (Minor/Trivial) Hatalar:** Çipin çalışmasını etkilemeyen kozmetik durumlar listelenir ve müşteriye sunulacak "Errata / Known Issues" dokümanına kaydedilir.`,
      },
      {
        title: "5. Regresyon Temizliği ve GLS Onayı",
        content: `- **Temiz Regresyon Koşusu (Clean Regression Run):** Tapeout'tan önceki son 1 hafta içinde dondurulmuş RTL sürümü üzerinde koşulan on binlerce testin geçiş oranı **%100** olmalıdır (hiçbir rastgele tohum başarısız olmamalıdır).
- **Gate-Level Simülasyon (GLS) Sign-Off:** Sentezlenmiş netlist üzerinde, SDF gecikme bilgileriyle (Setup ve Hold süreleri eklenmiş halde) duman testleri, reset dizilimleri ve yüksek öncelikli testler hatasız geçmelidir.
- **CDC / RDC Temizliği:** Saat etki alanı geçişi (\`Clock Domain Crossing\`) analiz raporlarında hiçbir zamanlama metastabilitesi uyarısı kalmamalıdır.`,
      },
      {
        title: "6. Resmi Sign-Off İnceleme Toplantısı (The Sign-Off Review)",
        content: `Tapeout günü tüm departman liderlerinin katıldığı resmi bir oturum düzenlenir:
1. DV Lideri kapsama panolarını, regresyon sonuçlarını ve waiver listesini sunar.
2. Tasarım Lideri PPA (Güç, Performans, Alan) ve zamanlama kapanışını sunar.
3. Fiziksel Tasarım Lideri DRC/LVS temizliğini teyit eder.
4. Yazılım Lideri sürücü uyumluluğunu teyit eder.
5. Her lider resmi sign-off tutanağına ıslak veya dijital imza atar ve GDSII dosyası dökümhaneye gönderilir.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Doğrulama Onay Kriterleri ve Kapanış (Sign-Off Criteria & Closure)",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir ASIC projesinde tapeout öncesinde 'Doğrulama Sign-Off' (Verification Sign-Off) verilebilmesi için karşılanması zorunlu olan en temel hata kapanış kriteri nedir?",
      options: ["A) Açıkta kalan S1 (Blocker) ve S2 (Critical) seviyesindeki tüm tasarım hatalarının SIFIR (0) olması ve tüm kod/fonksiyonel kapsama hedeflerinin %100'e kapatılmış olması", "B) Simülasyonların sadece tek bir rastgele seed ile bir kez koşturulmuş olması", "C) Kod kapsaması yerine sadece tasarımcının sözlü onayının alınması", "D) Açık kalan tüm hataların bir sonraki silikon revizyonuna ertelenmesi"],
      correctIndex: 0,
      explanation: "ASIC tapeout sign-off sürecinde sıfır tolerans ilkesi geçerlidir. S1 ve S2 seviyesindeki açık bloklayıcı hataların sayısı istisnasız sıfır olmalı, tüm fonksiyonel ve kod kapsaması hedefleri (%100) onaylı feragatlerle birlikte eksiksiz kapatılmalıdır.",
    },
  },
  "tapeout-checklist": {
    id: "tapeout-checklist",
    badge: "Modül 6 • Doğrulama Kapanışı ve Sign-Off (Verification Sign-Off)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Tapeout Kontrol Listesi ve Fiziksel Üretim Öncesi Adımlar (Tapeout Checklist)",
    subtitle: "RTL freeze, sentez sonrası kontroller, Gate-Level Simülasyon (GLS), SDF back-annotation, DRC/LVS ve son regresyon.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `RTL simülasyonları başarıyla tamamlansa bile yonganın fabrikaya gönderilmesi için geçilmesi gereken kritik bir köprü vardır. Bu bölümde:
- RTL Sign-off ile fiziksel Tapeout arasındaki kritik adımlar.
- Adım 1: RTL Dondurma (\`RTL Freeze\`) ve konfigürasyon doğrulaması.
- Adım 2: Mantıksal Sentez ve Sentez Sonrası Statik Kontroller (Lint, CDC, RDC, Formallik).
- Adım 3 & 4: Gate-Level Simülasyon (\`GLS\`) ve \`SDF Back-Annotation\` zamanlama doğrulaması.
- Adım 5: Fiziksel Doğrulama - \`DRC\` (Design Rule Check) ve \`LVS\` (Layout Versus Schematic).
- Adım 6: Nihai Regresyon Koşusu ve DV ekibinin sorumluluk sınırları.`,
      },
      {
        title: "2. RTL Freeze ve Konfigürasyon Doğrulaması",
        content: `Tapeout sürecinin ilk resmi adımı **RTL Dondurmadır (\`RTL Freeze\`)**:
- Belirlenen tarihten itibaren Git deposundaki ana RTL dalına (\`main/release\`) yeni kod eklenmesi kesinlikle yasaklanır.
- Yalnızca sign-off toplantısında onaylanmış acil hata düzeltmeleri (cherry-pick) yapılabilir.
- **Konfigürasyon Doğrulaması:** Çipin son maskeye gidecek tüm makro parametreleri (bellek boyutları, aktif arayüz sayıları, endianness, metal katman sayısı) kilitlenir ve testbench bu konfigürasyonda son kez doğrulanır.`,
      },
      {
        title: "3. Sentez ve Sentez Sonrası Statik Kontroller",
        content: `RTL kodu lojik kapılara dönüştürüldükten (sentezlendikten) sonra şu statik kontroller icra edilir:

1. **Statik Zamanlama Analizi (STA - Static Timing Analysis):** Synopsys PrimeTime gibi araçlarla en kötü/en iyi çalışma köşelerinde (\`PVT corners\`) Setup ve Hold zamanlama ihlalleri kontrol edilir.
2. **Biçimsel Eşdeğerlik Kontrolü (Formality / LEC - Logic Equivalence Check):** Sentezlenen kapı netlist'inin orijinal RTL kaynak koduyla mantıksal olarak birebir aynı olduğu matematiksel olarak kanıtlanır.
3. **Saat Etki Alanı Geçişi (CDC):** Asenkron saatler arasındaki senkronizör yapıları statik olarak denetlenir.`,
      },
      {
        title: "4. Gate-Level Simülasyon (GLS) ve SDF Back-Annotation",
        content: `RTL simülasyonunda kapı ve tel gecikmeleri sıfırdır (\`zero-delay\`). Ancak fiziksel kapıların yayılım gecikmeleri vardır:
- **SDF (Standard Delay Format):** Fiziksel yerleşimden çıkarılan gerçek kapı ve metal yol gecikmelerini içerir.
- **SDF Back-Annotation:** Simülatör derlenmiş kapı netlist'ine SDF dosyasını yükler (\`$sdf_annotate\`).
- **Neden GLS Gereklidir?**
  1. Başlatma ve Reset Dizilimi: Sıfırlanmamış flip-flop'ların gerçek gecikmeler altında nasıl davrandığını görmek.
  2. Asenkron arayüzlerde meta-stabilite ve glitch etkilerini gözlemlemek.
  3. Statik zamanlama analizinin (STA) göremediği dinamik saat kapılama (\`clock gating\`) ve güç anahtarlama davranışlarını doğrulamak.`,
      },
      {
        title: "5. Fiziksel Doğrulama: DRC ve LVS",
        content: `Fiziksel tasarım (Physical Design) ekibi maske geometrilerini üretirken şu kontrolleri tamamlar:

- **DRC (Design Rule Check):** Geometrik yerleşimin yarı iletken dökümhanesinin (TSMC, Samsung, Intel vb.) üretim kurallarına (minimum metal aralığı, genişlik, yoğunluk kuralları) uygunluğunu denetler. Tek bir DRC hatası maskenin basılamaması demektir.
- **LVS (Layout Versus Schematic):** Fiziksel yerleşimdeki geometrik transistör ve metal ağının, sentezlenen elektrik devre şemasıyla (netlist) birebir eşleştiğini doğrular. Kopuk tel (\`open\`) veya kısa devre (\`short\`) olmadığını garanti eder.`,
      },
      {
        title: "6. Doğrulama Ekibinin Sorumluluk Sınırları",
        content: `Tapeout kontrol listesinde DV ekibinin sahipliği net tanımlanmıştır:
- **DV Ekibinin Sahip Olduğu Alanlar:** RTL simülasyonları, Fonksiyonel & Kod Kapsaması kapanışı, SVA denetimleri, GLS işlevsel duman testleri, Regresyon raporları.
- **DV Ekibinin Sorumlu OLMADIĞI Alanlar:** Fiziksel DRC/LVS temizliği, paketleme ve bonding şeması, silikon pad yerleşimi, dökümhane fotolitografi maske hazırlığı (GDSII / OASIS akışı). Bu alanlar Fiziksel Tasarım ve Donanım Mühendisliği ekiplerinin yetkisindedir.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Tapeout Kontrol Listesi ve Fiziksel Üretim Öncesi Adımlar (Tapeout Checklist)",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Tapeout kontrol listesinde yer alan 'SDF Back-Annotation ile Gate-Level Simülasyon (GLS)' adımının sıfır gecikmeli (zero-delay) RTL simülasyonuna kıyasla en kritik varlık nedeni nedir?",
      options: ["A) Fiziksel yerleşimden çıkarılan gerçek kapı ve tel yayılım gecikmelerini simülasyona dahil ederek sıfırlama (reset) sıralamasını, dinamik saat kapılama (clock gating) davranışını ve asenkron arayüzlerdeki potansiyel zamanlama problemlerini doğrulamak", "B) Simülasyon süresini 10 kat hızlandırmak", "C) RTL kodundaki sözdizimi (syntax) hatalarını düzeltmek", "D) Testbench içerisindeki UVM transaction sınıflarını optimize etmek"],
      correctIndex: 0,
      explanation: "RTL simülasyonları fonksiyonel olarak kusursuz görünse de gerçek fiziksel kapı ve metal gecikmelerini (wire delays) hesaba katmaz. SDF dosyası ile yapılan GLS, fiziksel gecikmeler altındaki reset dizilimini, saat kapılama mantığını ve zamanlama ihlali risklerini teyit etmek için vazgeçilmez bir tapeout adımıdır.",
    },
  },
  "post-silicon-validation": {
    id: "post-silicon-validation",
    badge: "Modül 6 • Doğrulama Kapanışı ve Sign-Off (Verification Sign-Off)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Silikon Sonrası Doğrulama ve Çip Uyandırma (Post-Silicon Validation & Bring-Up)",
    subtitle: "Laboratuvar ortamında ilk silikonun uyandırılması (bring-up), JTAG, lojik analizörler, elektriksel parazitler ve simülasyon korelasyonu.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Dökümhaneden (fab) gelen ilk fiziksel silikon paketleri laboratuvara ulaştığında heyecan dolu bir süreç başlar. Bu bölümde:
- Pre-Silicon (Simülasyon/Emülasyon) ile Post-Silicon (Fiziksel Çip) doğrulama arasındaki farklar.
- Çip Uyandırma (\`Silicon Bring-Up\`) sürecinin adım adım yol haritası.
- Fiziksel silikonun simülasyon dünyasından ayrılan yönleri: Parazitik etkiler, sıcaklık, voltaj ve parazit (\`crosstalk\`).
- Laboratuvar donanım araçları: JTAG / Boundary Scan, Lojik Analizörler, Osiloskoplar.
- Laboratuvarda karşılaşılan bir hatayı pre-silicon simülasyona geri besleme ve yeniden üretme (\`Bug Correlation\`).`,
      },
      {
        title: "2. Pre-Silicon vs Post-Silicon Karşılaştırması",
        content: `| Kriter | Pre-Silicon Simülasyon | Post-Silicon Doğrulama |
| :--- | :--- | :--- |
| **Hız** | 1 Hz - 100 Hz (Çok yavaş) | 100 MHz - 3+ GHz (Gerçek zamanlı hız, saniyede milyarlarca çevrim) |
| **Gözlemlenebilirlik (Visibility)** | %100: Her tel ve yazmaç izlenebilir | Çok Düşük: Yalnızca dış pinler, JTAG ve dahili gömülü izleme tamponları |
| **Fiziksel Etkiler** | İdeal matematiksel modeller | Gerçek termal etkiler, voltaj düşüşleri (IR drop), üretim değişkenliği |
| **Maliyet** | Bilgisayar ve EDA lisansı | Fiziksel laboratuvar ekipmanları, test kartları ve silikon üretimi |`,
      },
      {
        title: "3. Adım Adım Çip Uyandırma (Silicon Bring-Up)",
        content: `İlk yonga paketi test kartına (socket board) takıldığında şu sıra takip edilir:

1. **Adım 1 - Güç Açma ve Besleme Doğrulaması:** Güç kaynakları (\`power rails\`) kademeli olarak açılır. Çipin çektiği akım ölçülür; kısa devre veya aşırı akım (\`latch-up\`) olup olmadığı kontrol edilir.
2. **Adım 2 - Saat ve Reset Uyandırması:** Osiloskop ile kart üzerindeki osilatör saat sinyalleri ve reset bacağının temizliği gözlemlenir.
3. **Adım 3 - Duman Testi (JTAG ID Okuma):** JTAG arayüzü üzerinden komut gönderilerek yonganın \`IDCODE\` yazmacı okunmaya çalışılır. Başarılı olursa çipin kalbi atıyor demektir!
4. **Adım 4 - Temel Arayüz Doğrulaması:** Dahili SRAM bellek testleri (BIST), PCIe, DDR, Ethernet veya USB arayüzleri tek tek ayağa kaldırılır.
5. **Adım 5 - PVT Karakterizasyonu:** Çip termal fırınlarda farklı sıcaklıklarda (-40°C ile +125°C) ve farklı voltaj seviyelerinde zorlanır.`,
      },
      {
        title: "4. Fiziksel Dünyanın Zorlukları: Parazitik Etkiler ve Gürültü",
        content: `Simülasyonda her şey kusursuz kare dalgalardan ibarettir; ancak fiziksel silikonda:
- **Voltaj Düşüşü (IR Drop / Ground Bounce):** Milyonlarca transistör aynı anda anahtarlama yaptığında güç hatlarında anlık voltaj düşüşleri oluşur.
- **Kapasitif Kuplaj ve Çapraz Girişim (Crosstalk):** Yanyana giden iki metal telden birindeki hızlı geçiş, diğer telde sahte bir voltaj darbesi (\`glitch\`) indükleyebilir.
- **İşlem, Voltaj ve Sıcaklık Değişkenliği (PVT Variation):** Üretim toleransları nedeniyle aynı gofretin (\`wafer\`) merkezindeki çip ile kenarındaki çip farklı hızlarda çalışabilir.`,
      },
      {
        title: "5. Laboratuvar Hata Ayıklama Araçları",
        content: `Fiziksel yongayı anlamak için kullanılan temel cihazlar:
- **JTAG ve Boundary Scan (IEEE 1149.1):** Çipin pinlerini test etmek ve dahili yazmaçlara yazılım yüklemek için standart hata ayıklama köprüsüdür.
- **Osiloskoplar (Oscilloscopes):** Sinyallerin elektriksel kalitesini, yükselme/düşme sürelerini, göz diyagramlarını (\`eye diagrams\`) ve saat seğirmesini (\`jitter\`) ölçer.
- **Lojik Analizörler (Logic Analyzers):** Yüzlerce dijital pini aynı anda dinleyerek lojik durum geçişlerini ve protokol paketlerini kaydeder.
- **Çip İçi Gömülü İzleme (On-Chip Trace Buffers / ARM CoreSight):** Çipin içine yerleştirilen küçük bellekler son birkaç bin çevrimlik işlemci akışını kaydeder.`,
      },
      {
        title: "6. Laboratuvardaki Hatayı Simülasyona Geri Besleme (Bug Correlation)",
        content: `Laboratuvarda bir çip kilitlendiğinde içini doğrudan göremezsiniz:
1. Hatayı tetikleyen register yazma sırasını veya paket akışını lojik analizörden kaydedin.
2. Bu senaryoyu bir SystemVerilog/UVM testine dönüştürün.
3. Simülasyonu aynı register değerleriyle koşturun ve tam dalga formunu (\`FSDB\`) açın.
4. Kök nedeni tespit edin: Çipte geçici bir yazılım çözümü (\`chicken bit / work-around\`) uygulanabilir mi, yoksa sonraki üretim adımı (\`metal fix / new tapeout\`) için düzeltme mi gereklidir?`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Silikon Sonrası Doğrulama ve Çip Uyandırma (Post-Silicon Validation & Bring-Up)",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Pre-silicon RTL simülasyonuna kıyasla, Post-silicon doğrulamanın (laboratuvarda fiziksel çip testi) en büyük avantajı ve aynı zamanda en büyük dezavantajı nedir?",
      options: ["A) Avantajı saniyede milyarlarca çevrimlik gerçek zamanlı donanım hızında çalışabilmesi; dezavantajı ise dahili sinyallerin ve register'ların simülasyondaki gibi %100 doğrudan izlenememesi (gözlemlenebilirlik kısıtı)", "B) Avantajı simülasyon süresini uzatması; dezavantajı elektrik faturasını artırması", "C) Avantajı FPGA gerektirmemesi; dezavantajı osiloskop kullanılmaması", "D) Avantajı kod kapsaması ölçebilmesi; dezavantajı reset bacağı olmaması"],
      correctIndex: 0,
      explanation: "Fiziksel silikon gerçek saat hızlarında (GHz seviyesinde) çalışarak simülasyonda aylar sürecek trilyonlarca çevrimi dakikalar içinde test edebilir. Ancak simülasyonda devredeki her bir teli izleyebilirken, fiziksel yongada yalnızca dış pinler ve sınırlı sayıdaki gömülü test noktaları gözlemlenebilir.",
    },
  },
  "design-vs-verification-engineer": {
    id: "design-vs-verification-engineer",
    badge: "Modül 7 • Endüstri Pratikleri ve Kariyer (Industry Practices)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Tasarım Mühendisi vs Doğrulama Mühendisi (Design vs Verification Engineer)",
    subtitle: "RTL tasarım ve doğrulama rollerinin zihniyet farkı, günlük sorumluluklar, ortak çalışma dinamikleri ve kariyer yolları.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Modern yarı iletken sektöründe bir çip ekibinin insan kaynağının %60-70'i doğrulama mühendislerinden oluşur. Bu bölümde:
- Tasarım Mühendisi (RTL Designer) ile Doğrulama Mühendisi (DV Engineer) arasındaki temel zihniyet farkı (\`Mindset\`).
- Bir DV mühendisinin günlük sorumlulukları ve iş akışı.
- Bir RTL tasarım mühendisinin günlük sorumlulukları ve iş akışı.
- İki rolün kesişim noktaları: Şartname incelemesi, tasarım gözden geçirme ve hata triyajı.
- Doğrulama mühendisliğinde kariyer yolları: Blok DV, SoC DV, Formal Doğrulama, Emülasyon ve Metodoloji Mimarlığı.
- Üst düzey bir DV mühendisini öne çıkaran kritik yetkinlikler.`,
      },
      {
        title: "2. Temel Zihniyet Farkı: İnşa Eden vs Sorgulayan",
        content: `İki rol arasındaki fark yetenekten ziyade felsefe farkıdır:

- **RTL Tasarım Mühendisi (Yapıcı / Constructive Mindset):**
  - Hedef: *"Bu donanımı şartnameye uygun olarak en küçük alanda (Area), en düşük güç tüketimiyle (Power) ve en yüksek saat frekansında (Performance - PPA) nasıl çalıştırabilirim?"*
  - Tasarımcı mimariye ve devrenin doğru çalışmasına odaklanır.

- **Doğrulama Mühendisi (Sorgulayıcı / Destructive & Investigative Mindset):**
  - Hedef: *"Bu donanımı hangi şartlar altında bozabilirim? Tasarımcının şartnameyi okurken gözden kaçırdığı kör nokta neresidir? Hangi eşzamanlı olaylar devreyi kilitleyebilir?"*
  - DV mühendisi tasarımın çalışacağına asla peşinen inanmaz; matematiksel ve istatistiksel kanıt arar.`,
      },
      {
        title: "3. Doğrulama Mühendisinin (DV) Günlük Sorumlulukları",
        content: `Bir DV mühendisinin tipik çalışma döngüsü:
1. **Doğrulama Planı (Verification Plan - vPlan) Yazma:** Şartnamedeki her bir özelliği doğrulanabilir fonksiyonel senaryolara dönüştürmek.
2. **UVM Testbench Geliştirme:** Modüler sürücüler (\`driver\`), izleyiciler (\`monitor\`), referans tahmin modelleri (\`predictor / scoreboard\`) ve kısıtlı rastgele dizilimler (\`sequences\`) kodlamak.
3. **Regresyon Yönetimi ve Triyaj:** Gece koşan binlerce testin sonuçlarını incelemek, çöken testlerin kök nedenini dalga formunda izole etmek.
4. **Kapsama Kapatma (Coverage Closure):** Kapsama raporlarındaki boşlukları kapatacak yeni uyarım senaryoları geliştirmek ve waiver hazırlamak.`,
      },
      {
        title: "4. RTL Tasarım Mühendisinin Günlük Sorumlulukları",
        content: `Bir RTL tasarımcısının tipik çalışma döngüsü:
1. **Mikromimari Tasarımı:** Şartnameyi veri yollarına, yazmaçlara ve durum makinelerine (FSM) dökmek.
2. **RTL Kodlama:** SystemVerilog veya VHDL kullanarak sentezlenebilir donanım mantığını yazmak.
3. **Statik Kontroller:** Lint araçlarıyla kodlama standartlarını denetlemek, saat geçişlerini (CDC) analiz etmek.
4. **Sentez ve Zamanlama Kapatma (Timing Closure):** PrimeTime ve DC araçlarıyla Setup/Hold sürelerini iyileştirmek, kritik yolları (critical path) optimize etmek.`,
      },
      {
        title: "5. İki Rolün Ortak Çalışma Alanları ve İşbirliği",
        content: `Tasarım ve doğrulama mühendisleri rakip değil, aynı hedefe koşan ortaklardır:
- **Şartname İncelemesi (Spec Review):** DV mühendisi şartnamedeki belirsizlikleri ilk fark eden kişidir; tasarımcıyla birlikte metni netleştirirler.
- **Tasarım Gözden Geçirme (Design Review):** Tasarımcı iç durum makinesini ve kritik sinyalleri DV mühendisine anlatır; DV mühendisi nerelere assertion koyacağını belirler.
- **Hata Triyajı (Bug Triage):** Scoreboard uyumsuzluklarında bir araya gelerek dalga formunda hatanın kimden kaynaklandığı analiz edilir.
- **Kapsama İncelemesi (Coverage Review):** %100 kapsama kapanışı için ulaşılamayan kodların waiver listesi birlikte onaylanır.`,
      },
      {
        title: "6. Doğrulama Mühendisliğinde Kariyer Yolları",
        content: `DV uzmanlığı çok geniş dallara ayrılır:
- **Blok Seviyesi DV:** UVM ortamlarını sıfırdan kuran, derinlemesine protokol ve köşe durum uzmanları.
- **SoC Seviyesi DV:** Tüm işlemci, bellek ve veri yolu ara bağlantılarının entegre doğrulamasını C-testleri ve UVM ile yürüten sistem uzmanları.
- **Formal Doğrulama (FV) Uzmanı:** Simülasyon yerine matematiksel modellerle kilitlenme ve güvenlik kanıtı yapan matematik odaklı mühendisler.
- **Donanım Emülasyon Mühendisi (Emulation):** Milyarlarca kapılı çipleri Zebu veya Palladium gibi devasa donanım emülatörlerinde koşturan uzmanlar.
- **Doğrulama Lideri ve Metodoloji Mimarı (DV Lead):** Şirket genelindeki doğrulama standartlarını, kütüphanelerini ve sign-off stratejilerini belirleyen üst düzey liderler.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Tasarım Mühendisi vs Doğrulama Mühendisi (Design vs Verification Engineer)",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Modern yonga geliştirme takımlarında bir Doğrulama Mühendisi (DV Engineer) ile RTL Tasarım Mühendisi (Design Engineer) arasındaki en belirleyici zihniyet (mindset) farkı nedir?",
      options: ["A) Tasarım mühendisinin 'bu donanımı şartnameye göre en iyi PPA (güç, performans, alan) ile nasıl çalıştırırım' hedefine odaklanmasına karşılık, doğrulama mühendisinin 'bu donanımı hangi köşe durumlarda çökertebilirim ve gözden kaçan hataları nasıl ortaya çıkarırım' sorgulayıcı yaklaşımına odaklanması", "B) Tasarım mühendisinin C++ kullanırken doğrulama mühendisinin sadece Python kullanması", "C) Doğrulama mühendisinin sadece silikon üretiminden sonra devreye girmesi", "D) Tasarım mühendisinin testbench yazıp doğrulama mühendisinin sadece sentez yapması"],
      correctIndex: 0,
      explanation: "Tasarım mühendisi 'yapıcı' (constructive) bir zihniyetle mimariyi çalışır hale getirmeye odaklanırken; doğrulama mühendisi 'sorgulayıcı/çürütücü' (adversarial/investigative) bir zihniyetle tasarımın sınırlarını zorlar, köşeleri zorlayarak gizli kalmış mimari ve mantıksal açıkları arar.",
    },
  },
  "verification-methodology": {
    id: "verification-methodology",
    badge: "Modül 7 • Endüstri Pratikleri ve Kariyer (Industry Practices)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Doğrulama Metodolojilerinin Evrimi: VMM, OVM ve UVM (Verification Methodology Evolution)",
    subtitle: "Tescilli yaklaşımlardan IEEE 1800.2 küresel standardına geçiş, VIP ekosistemi ve metodolojinin endüstriyel değeri.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bugün küresel ölçekte kullanılan UVM (Universal Verification Methodology), yirmi yılı aşkın bir endüstriyel rekabet ve standardizasyon sürecinin ürünüdür. Bu bölümde:
- Standartlaşma öncesi doğrulama dünyasındaki karmaşa ve verimsizlikler.
- VMM (\`Verification Methodology Manual\`): Synopsys'in öncülük ettiği ilk ticari metodoloji.
- OVM (\`Open Verification Methodology\`): Cadence ve Mentor'un açık kaynak hamlesi.
- UVM (\`Universal Verification Methodology - IEEE 1800.2\`): Küresel birleşme ve zafer.
- Metodolojinin kodun ötesindeki endüstriyel değeri: VIP (\`Verification IP\`) pazarı, mühendis taşınabilirliği ve eğitim birliği.
- Modern doğrulama ekosisteminin bugünkü durumu ve geleceği.`,
      },
      {
        title: "2. Standartlaşma Öncesi Doğrulama Dünyasındaki Sorunlar",
        content: `2000'li yılların başında SystemVerilog yeni ortaya çıktığında, şirketlerin ortak bir testbench yazma standardı yoktu:
- Her şirket (Intel, AMD, Qualcomm, Motorola) kendi şirket içi (in-house) tescilli testbench kütüphanelerini yazıyordu.
- Bir şirketten diğerine geçen mühendisler aylar boyunca yeni şirketin kapalı betiklerini ve nesne hiyerarşisini öğrenmek zorunda kalıyordu.
- Üçüncü parti arayüz modelleri (PCIe veya USB doğrulama paketleri) farklı araçlar arasında taşınamıyordu. Cadence simülatöründe çalışan bir testbench Synopsys simülatöründe derlenemiyordu.
Bu durum ASIC sektöründe milyarlarca dolarlık iş gücü kaybına yol açıyordu.`,
      },
      {
        title: "3. Metodolojilerin Tarihsel Evrimi: VMM -> OVM -> UVM",
        content: `| Metodoloji | Yıl | Öncüler | Temel Özellikleri ve Sınırlamaları |
| :--- | :--- | :--- | :--- |
| **VMM** | 2005 | Synopsys & ARM | İlk kurumsal rehber. Çok güçlü bir yazmaç katmanına (\`RAL\`) sahipti ancak Synopsys araçlarına bağımlı tescilli bir yapıydı. |
| **OVM** | 2008 | Cadence & Mentor | İlk açık kaynaklı ve çoklu satıcı (\`multi-vendor\`) destekli metodoloji. TLM bağlantılarını ve modüler bileşen mimarisini popülerleştirdi ancak resmi bir RAL katmanı eksikti. |
| **UVM 1.0 / 1.2** | 2011 | Accellera | VMM ve OVM'in en güçlü yönlerini birleştiren küresel konsorsiyum standardı. OVM mimarisi üzerine VMM'in gelişmiş RAL mekanizması entegre edildi. |
| **IEEE 1800.2** | 2017 / 2020 | IEEE | UVM resmi bir uluslararası IEEE standardı haline geldi. Tüm büyük EDA şirketleri tam uyumluluk taahhüdü verdi. |`,
      },
      {
        title: "4. UVM Hangi Kritik Yapıları Standartlaştırdı?",
        content: `UVM, testbench mimarisini 4 temel sütun üzerinde evrenselleştirdi:

1. **Evrensel Faz Mekanizması (Phasing):** \`build_phase\`, \`connect_phase\`, \`run_phase\` adımları sayesinde tüm hiyerarşi küresel bir saat adımına senkronize edildi.
2. **İşlem Seviyesi Modelleme (TLM 1.0 / 2.0):** Pin seviyesindeki dalgalar yerine paket seviyesinde veri transferi sağlayan FIFO ve port yapıları standartlaştı.
3. **UVM Fabrikası (Factory Pattern):** Testbench kodunu yeniden derlemeden, komut satırından bileşen veya işlem sınıflarını ezebilme (\`type/inst override\`) esnekliği sağlandı.
4. **Register Abstraction Layer (RAL):** Donanım yazmaçlarına isimle erişmeyi, önbellek (\`mirror\`) tutmayı ve yerleşik yazmaç testlerini koşturmayı sağlayan standart nesne katmanı getirildi.`,
      },
      {
        title: "5. Metodolojinin Endüstriyel Değeri (VIP ve İnsan Kaynağı)",
        content: `UVM'in başarısı teknik avantajlarından çok ekonomik gücünden kaynaklanır:
- **Doğrulama IP (VIP) Pazarı:** Bugün Synopsys veya Cadence'ten hazır bir PCIe Gen5 veya DDR5 VIP satın aldığınızda, bunu projenize entegre etmek yalnızca birkaç satırlık standart UVM bağlantısı gerektirir.
- **Mühendis Taşınabilirliği (Engineer Mobility):** Bir DV mühendisi iş değiştirdiğinde ilk günden itibaren projeye katkı sunabilir; çünkü dünyanın her yerinde UVM aynı mimariyle yazılır.
- **Üniversite ve Eğitim Birliği:** Üniversiteler ve çevrimiçi eğitim platformları tek bir standart üzerinde uzman yetiştirebilmektedir.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Doğrulama Metodolojilerinin Evrimi: VMM, OVM ve UVM (Verification Methodology Evolution)",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Yarı iletken endüstrisinde OVM ve VMM gibi rakip yaklaşımların ardından UVM'in (IEEE 1800.2) küresel tek standart haline gelmesinin en büyük sektörel ve ekonomik sonucu nedir?",
      options: ["A) Tüm büyük EDA simülatörlerinde (Synopsys, Cadence, Siemens) taşınabilir tek bir testbench mimarisinin kurulması, üçüncü parti Doğrulama IP'lerinin (VIP) tak-çalıştır kullanılabilmesi ve doğrulama mühendislerinin şirketler arası hızla adapte olabilmesi", "B) Simülatör lisanslarının tamamen ücretsiz hale gelmesi", "C) SystemVerilog dili yerine Python'ın yonga tasarım dili haline gelmesi", "D) Donanım sentezleme sürelerinin sıfıra inmesi"],
      correctIndex: 0,
      explanation: "UVM'in en belirleyici ekonomik zaferi çoklu satıcı (multi-vendor) desteğiyle EDA kilitlenmesini kırması, endüstri standardı taşınabilir ticari VIP ekosistemini yaratması ve mühendislerin iş değiştirirken sıfırdan şirket içi araç öğrenme maliyetini ortadan kaldırmasıdır.",
    },
  },
  "understanding-dut-specification": {
    id: "understanding-dut-specification",
    badge: "Modül 7 • Endüstri Pratikleri ve Kariyer (Industry Practices)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Tasarım Şartnamesini (DUT Spec) Anlama ve Doğrulama Planına Dönüştürme",
    subtitle: "Donanım şartnamelerinin mimari analizi, belirsizliklerin giderilmesi, yazmaç haritası doğrulama ve scoreboard referans modeli oluşturma.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Tüm doğrulama süreci tek bir temel kaynağa dayanır: Donanım Şartnamesi (\`DUT Specification\`). Bu bölümde:
- Bir donanım şartnamesinin anatomisi ve içerdiği temel bölümler.
- Düz şartname metinlerinden doğrulanabilir özellikler (\`Verifiable Features\`) çıkarma metodolojisi.
- Şartnamedeki tehlikeli belirsizlikleri (\`Ambiguities\`) tespit etme ve giderme adımları.
- Yazmaç Haritası (\`Register Map\`) doğrulaması: Reset değerleri, erişim kuraları (\`RW, RO, W1C\`) ve alan davranışları.
- Şartnameyi Scoreboard için mutlak referans model (\`Ground Truth\`) olarak konumlandırma.
- Yeni bir şartnameyi okurken izlenmesi gereken pratik kontrol listesi.`,
      },
      {
        title: "2. Bir Donanım Şartnamesinin (DUT Spec) Temel Bölümleri",
        content: `Kapsamlı bir ASIC blok şartnamesi şu 4 ana bölümden oluşur:

1. **Üst Seviye Blok Diyagramı ve Veri Akışı:** Modülün ana alt bileşenleri (FIFO'lar, arbitraj birimleri, durum makineleri) ve veri akış yönleri.
2. **Arayüz Tanımları ve Zamanlama Şemaları:** Saat, reset, kontrol ve veri sinyalleri; giriş/çıkış yönleri, el sıkışma protokolleri ve dalga formu zamanlama diyagramları (\`timing diagrams\`).
3. **Yazmaç Haritası (Register Map):** Adres ofsetleri, yazmaç genişlikleri, alan tanımları (\`field bitfields\`), varsayılan reset değerleri ve erişim izinleri (\`Read-Only, Read-Write, Write-1-to-Clear\`).
4. **Fonksiyonel Davranış Açıklamaları:** Normal çalışma modları, hata durumları, kuyruk taşma mekanizmaları ve kesme (\`interrupt\`) üretim kuralları.`,
      },
      {
        title: "3. Düz Metinden Doğrulanabilir Özellik Çıkarma",
        content: `Şartname düzyazı ile yazılır, ancak DV mühendisi bunu matematiksel kurallara çevirmelidir:

- *Şartname Metni:* "FIFO dolduğunda (\`full=1\`), yeni bir yazma isteği gelirse veri yazılmaz, taşma bayrağı (\`overflow_err\`) bir sonraki çevrimde 1 olur ve kesme üretilir."
- *Doğrulama Planı Maddesi (vPlan Item):* \`FEAT_FIFO_OVERFLOW\`
  - **Uyarım (Stimulus):** FIFO'yu 16 paketle doldur, ardından 17. paketi yazmaya çalış.
  - **Kontrol (Check):** FIFO verisinin ezilmediğini teyit et.
  - **Assertion (SVA):** \`full && wr_en |=> overflow_err && interrupt;\`
  - **Kapsama (Coverage):** \`covergroup\` ile \`full\` iken \`wr_en=1\` durumunun denendiğini kaydet.`,
      },
      {
        title: "4. Şartnamedeki Belirsizliklerin (Ambiguities) Yönetimi",
        content: `En tehlikeli donanım hataları şartnamedeki belirsiz cümlelerden doğar:
- **Uç Durum Belirtilmemişse:** "Aynı anda hem reset hem paket gelirse ne olur?" metinde yazmıyorsa bu bir belirsizliktir.
- **Zamanlama Esnek Bırakılmışsa:** "Yanıt kısa süre içinde döner" ifadesi kabul edilemez. Tam çevrim sayısı (\`1 ile 3 saat çevrimi arasında\`) yazılmalıdır.

**Doğru Mühendislik Yaklaşımı:**
Bir belirsizlik fark edildiğinde asla *"Muhtemelen tasarımcı şöyle düşünmüştür"* diye varsayım yapılmamalıdır! Derhal mimari lider ve tasarımcı ile iletişime geçilerek şartname resmi revizyonla netleştirilmeli ve yazılı hale getirilmelidir.`,
      },
      {
        title: "5. Yazmaç Haritası (Register Map) Doğrulaması",
        content: `UVM RAL katmanı kullanılarak yazmaçlar şu 4 boyutta test edilir:
1. **Reset Değeri Kontrolü:** Güç açıldığında yazmaç şartnamedeki fabrika değerini (\`default value\`) veriyor mu?
2. **Yazmaç İzinleri:** \`RO\` (Read-Only) yazmaca yazmaya çalışıldığında değerin değişmediği, \`W1C\` (Write-1-to-Clear) biti üzerine 1 yazıldığında o bitin 0'a çekildiği doğrulanır.
3. **Bit-Bash Testi:** Tüm yazmaç alanlarına rastgele bit desenleri (\`0101...\`, \`1010...\`) yazılarak bitler arasında köprü/kısa devre olmadığı test edilir.
4. **Adres Haritası Bütünlüğü:** Bir yazmaca yazılan verinin yanlışlıkla yanındaki komşu yazmacı ezmediği (\`aliasing\`) kanıtlanır.`,
      },
      {
        title: "6. Şartnameyi Scoreboard İçin Mutlak Referans Alma",
        content: `Testbench içindeki **Scoreboard ve Referans Model (Predictor)**, DUT'nin RTL koduna bakılarak YAZILMAZ!
- Eğer referans modeli yazarken tasarımcının RTL kodunu okursanız, tasarımcının yaptığı mantık hatasını referans modele de kopyalarsınız! Bu durumda testbench yanlış çalışan RTL'i "başarılı" kabul eder (\`Common Mode Failure\`).
- Referans model **yalnızca ve yalnızca donanım şartnamesi** okunarak bağımsız bir yazılım modeli (C++ veya SystemVerilog sınıfı) olarak geliştirilmelidir.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Tasarım Şartnamesini (DUT Spec) Anlama ve Doğrulama Planına Dönüştürme",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Doğrulama testbench'i içerisindeki Referans Model (Predictor / Scoreboard) geliştirilirken neden tasarımcının yazdığı RTL koduna bakılmamalı, doğrudan DUT Şartnamesi (Spec) baz alınmalıdır?",
      options: ["A) Tasarımcının RTL kodunu referans almak, tasarımcının yaptığı mantıksal veya şartnameyi yanlış anlama hatalarının testbench referans modeline de aynen kopyalanmasına ve hatalı donanımın sahte bir şekilde testten geçmesine (Common Mode Failure) yol açacağı için", "B) RTL kodunun derlenmesi çok uzun sürdüğü için", "C) Scoreboard'un sadece kapı seviyesinde çalışabilmesi için", "D) Şartnamenin gizli bir belge olması nedeniyle"],
      correctIndex: 0,
      explanation: "Doğrulamanın bağımsız denetim gücü 'Clean Room' yaklaşımından gelir. Eğer DV mühendisi RTL kodunu okuyarak referans modeli kurarsa, tasarımcının gözden kaçırdığı şartname hatasını kendisi de modeline kopyalar. Böylece hem RTL hem scoreboard aynı hatayı yapar ve hata asla yakalanamaz.",
    },
  },
  "verification-in-a-tapeout-driven-team": {
    id: "verification-in-a-tapeout-driven-team",
    badge: "Modül 7 • Endüstri Pratikleri ve Kariyer (Industry Practices)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Tapeout Odaklı Ekiplerde Doğrulama Dinamikleri ve Proje Yönetimi",
    subtitle: "Kritik dökümhane teslim tarihleri altında önceliklendirme, RTL dalgalanması (churn) yönetimi, bug scrub toplantıları ve CI/CD akışları.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Yarı iletken endüstrisinde başarılı olmak sadece iyi kod yazmakla değil, katı dökümhane (foundry) teslim tarihlerini yönetebilmekle mümkündür. Bu bölümde:
- Ana kısıt olarak Tapeout Takvimi ve dökümhane slotlarının önemi.
- Doğrulama Önceliklendirme Çerçevesi (\`Priority Framework - P0/P1/P2\`).
- Tasarım ekibiyle paralel çalışma (\`Shift-Left\` yaklaşımı): RTL yazılmadan testbench kurma.
- RTL Dalgalanması (\`RTL Churn\`) ve değişen kodlar karşısında kapsamayı koruma.
- Doğrulama ekibi iletişim ritimleri: Günlük Standup, Kapsama İncelemesi ve Bug Scrub toplantıları.
- Modern DV araç seti: Git sürüm kontrolü, Jira hata takibi ve CI/CD regresyon otomasyonu.`,
      },
      {
        title: "2. Tapeout Takvimi: Değiştirilemez Ana Kısıt",
        content: `Bir yazılım projesinde sürüm tarihi 2 hafta ötelenebilir; ancak yarı iletken dünyasında:
- TSMC veya Samsung gibi dökümhanelerden aylar öncesinde milyonlarca dolarlık üretim rezervasyon slotu (\`foundry tapeout slot\`) satın alınır.
- Eğer belirlenen gün ve saatte son GDSII dosyası teslim edilemezse, o slot yanar; şirket hem devasa cezalar öder hem de yeni bir slot için 3 ila 6 ay beklemek zorunda kalır.
- Bu nedenle tapeout takvimi tartışılmaz bir ana kısıttır (\`hard deadline\`). Doğrulama ekibi tüm eforunu bu tarihe göre geriye doğru planlar.`,
      },
      {
        title: "3. Doğrulama Önceliklendirme Çerçevesi (P0 / P1 / P2)",
        content: `Zaman kısıtlı olduğunda her şeyi aynı anda test edemezsiniz:

- **P0 Özellikleri (Varoluşsal / Tapeout Blocker):**
  - Çipin ayağa kalkması (Power-on, Clock, Reset).
  - Temel veri yolları, işlemci komut yürütümü, ana bellek (DDR/HBM) erişimleri.
  - Testbench'i ve temel fonksiyonları kilitleyen alanlar. Kapsama hedefi: **%100**.
- **P1 Özellikleri (Yüksek Öncelik):**
  - Ana arayüz protokollerinin köşe durumları, hata enjeksiyonları, kuyruk taşmaları, DMA burst modları. Kapsama hedefi: **%100**.
- **P2 Özellikleri (Düşük Öncelik / Kozmetik):**
  - Seyrek kullanılan durum yazmaçları, nadir görülen istisnalar veya yazılımla kompanse edilebilecek ikincil özellikler.`,
      },
      {
        title: "4. Tasarım Ekibiyle Paralel Çalışma (Shift-Left Yaklaşımı)",
        content: `Geleneksel hatalı yaklaşımda önce RTL'in bitmesi beklenirdi. Modern tapeout odaklı ekiplerde ise **Shift-Left** uygulanır:

1. Şartname onaylandığı anda DV mühendisi işe başlar.
2. RTL tasarımcısı ilk satırı yazarken, DV mühendisi UVM testbench iskeletini, arayüzleri, paket sınıflarını ve referans modeli kurar.
3. Boş bir DUT kabuğuna (\`stub / dummy module\`) bağlanarak testbench derlenir.
4. Tasarımcı ilk çalışan RTL bloğunu teslim ettiği gün, testbench zaten hazırdır ve duman testleri ilk dakikada koşulmaya başlar.`,
      },
      {
        title: "5. RTL Dalgalanması (RTL Churn) ile Başa Çıkma",
        content: `Projenin orta aşamalarında tasarımcılar sürekli RTL'i değiştirir, yeni portlar ekler veya durum makinelerini günceller (\`RTL Churn\`):
- Bu değişiklikler testbench'lerin aniden çökmesine (\`compilation error\`) veya regresyonların kırmızıya boyanmasına neden olabilir.
- **Korunma Yöntemleri:**
  1. Modüler Arayüzler: Donanım sinyallerine doğrudan hiyerarşik erişim (\`top.dut.sub.sig\`) yerine standart SystemVerilog arayüzleri (\`interface\`) kullanmak.
  2. Otomatik CI Kapıları (Gating): Tasarımcının ana dala kod göndermeden önce yerel duman testlerini geçmesini zorunlu kılmak.
  3. Kapsama İzolasyonu: Değişen modüllere ait eski kapsama veritabanlarını regresyon birleştirmesinden ayırmak.`,
      },
      {
        title: "6. Ekip İçi İletişim Ritimleri ve Araç Zinciri",
        content: `Tapeout odaklı bir DV takımının günlük çalışma ritmi:
- **Günlük Standup (15 dk):** Dün gece regresyonda kaç test fail oldu? Kim hangi hatayı triyaj ediyor? Bloklayan bir durum var mı?
- **Haftalık Coverage Scrub:** Kapsama eğrisi hedefin gerisinde mi? Hangi modüllerde delikler var?
- **Bug Scrub Toplantısı:** Açık Jira biletlerinin önceliklerini gözden geçirme ve tasarımcılara atama.
- **Araç Zinciri:** Git (kod yönetimi), Jira (hata takibi), LSF/Slurm (sunucu çiftliği), Jenkins / GitLab CI (sürekli regresyon) ve Web Kapsama Panoları.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Tapeout Odaklı Ekiplerde Doğrulama Dinamikleri ve Proje Yönetimi",
      initialCode: `// Minimal Doğrulama Testbench Şablonu
module tb_verification;
    logic clk, rst_n;
    logic [7:0] data_in, data_out;

    // DUT Örneği
    dut_top u_dut (
        .clk(clk),
        .rst_n(rst_n),
        .d_in(data_in),
        .d_out(data_out)
    );

    initial begin
        $display("[INFO:TB] Fonksiyonel test başlatıldı.");
        rst_n = 0; #20;
        rst_n = 1; #10;
        assert(data_out == 8'h00) else $error("[FAIL] Reset hatası!");
        $display("[INFO:TB] Test başarıyla tamamlandı.");
        $finish;
    end
endmodule`,
      language: "systemverilog",
      terminalTitle: "EDA Doğrulama Simülatörü",
      expectedOutput: [
        "[INFO:SIM] Simulator started at time 0.00ns (Precision: 1ps)",
        "[INFO:TB] Test plan feature checks activated.",
        "[INFO:SVA] 15 Assertions active, 0 violations observed.",
        "[INFO:COV] Statement Coverage: 98.4%, Branch Coverage: 100.0%",
        "[INFO:COV] Functional Covergroup `cg_dut`: 100.0% coverage achieved.",
        "[PASS] Feature validation completed without errors.",
        "** VERIFICATION TEST PASSED **",
      ],
    },
    quiz: {
      question: "Tapeout odaklı bir yarı iletken projesinde 'Shift-Left' doğrulama yaklaşımının temel felsefesi nedir?",
      options: ["A) RTL kodunun yazılmasının tamamlanmasını beklemeden, şartname çıkar çıkmaz doğrulama planını, UVM testbench altyapısını ve referans modellerini tasarımla paralel olarak geliştirmeye başlayarak hata bulma sürecini projenin en erken aşamalarına çekmek", "B) Tüm testleri projenin son haftasına ertelemek", "C) Simülatör lisanslarını sol taraftaki sunuculara taşımak", "D) Tasarım mühendislerinin doğrulama yapmasını yasaklamak"],
      correctIndex: 0,
      explanation: "Shift-Left yaklaşımı, doğrulama faaliyetlerini RTL kodlamasının bitişinden sonraya bırakmak yerine, şartname aşamasında tasarım ile eşzamanlı başlatmayı hedefler. Böylece RTL'in ilk sürümleri çıktığı anda testbench hazır olur ve kritik mimari hatalar projenin başında tespit edilir.",
    },
  },
};
