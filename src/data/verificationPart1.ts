import { LessonContent } from "./lessonsData";

export const VERIFICATION_PART1: Record<string, LessonContent> = {
  "verification": {
    id: "verification",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Sayısal Tasarım Doğrulama (DV) Temelleri ve Çip Tasarımındaki Yeri",
    subtitle: "Sayısal entegre devre tasarımında işlevsel doğrulama disiplini, RTL hata analizi, kapsam ölçümü ve modern AI destekli doğrulama yöntemleri.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu eğitim modülünde yarı iletken ve çip tasarımı endüstrisinin en kritik ve kaynak tüketen disiplini olan Donanım Doğrulama Mühendisliğine (Design Verification - DV) kapsamlı bir giriş yapacaksınız. Bölüm boyunca şu temel konuları inceleyeceğiz:

- Sayısal tasarım doğrulamanın tanımı, amacı ve modern çip projelerindeki merkezi rolü
- RTL (Register Transfer Level) donanım hatalarının neden kaçınılmaz olduğu ve en sık rastlanan hata sınıfları
- Doğrulama süreçlerinin proje bütçesi ve takvimindeki devasa payı (%70 kuralı)
- Üretim sonrasına (post-silicon) kaçan bir donanım hatasının finansal, operasyonel ve prestij maliyetleri
- Doğrulamanın tamamlandığını gösteren metrikler: Kod Kapsaması (\`code coverage\`) ve İşlevsel Kapsama (\`functional coverage\`)
- Modern doğrulama ekosisteminde yapay zekâ (AI/LLM) ve otonom doğrulama ajanlarının (\`Agentic Verification\`) getirdiği devrim.`,
      },
      {
        title: "2. Sayısal Tasarım Doğrulama (DV) Nedir ve Neden Hayatidir?",
        content: `Sayısal Tasarım Doğrulama (Design Verification - DV), yazılan RTL (Verilog, SystemVerilog veya VHDL) kodunun mimari spesifikasyona ve tasarım niyetine %100 sadık kaldığını çip fiziksel olarak üretilmeden önce (pre-silicon) kanıtlama sürecidir.

Bir yazılım projesinde kod hatası (bug) tespit edildiğinde saatler içinde bir yama (patch) veya güncelleme yayınlanabilir. Ancak entegre devre dünyasında fiziksel silikon dökümhaneye (Foundry - TSMC, Intel, Samsung) gönderildikten sonra kodu değiştirmenin hiçbir yolu yoktur. Milyarlarca transistör fiziksel katmanlar halinde silikon pul (wafer) üzerine işlenmiştir. Tek bir ters mantık kapısı veya unutulmuş bir durum biti, tüm çipin çalışamaz hale gelmesine yol açabilir.

DV mühendisliğinin temel felsefesi: *"Tasarımcının ne yazdığını değil, mimari spesifikasyonun gerçekte ne istediğini doğrulamaktır."* Bu nedenle tasarım ekibi ile doğrulama ekibi birbirinden bağımsız çalışarak tarafsız bir kalite kontrol bariyeri oluşturur.`,
      },
      {
        title: "3. RTL Hatalarının Anatomisi ve Kaçınılmazlığı",
        content: `Modern yongada sistemler (SoC), yüzlerce IP bloğu, karmaşık bellek denetleyicileri, çok çekirdekli işlemciler ve yüksek hızlı veri yollarını bir araya getirir. Tasarım karmaşıklığı insan zihninin tek seferde kavrayabileceği sınırların çok ötesindedir. RTL kodlama sürecinde en sık karşılaşılan hata türleri şunlardır:

- **Polarite Hataları (Polarity Inversions):** Bir sinyalin aktif-düşük (active-low) yerine aktif-yüksek (active-high) varsayılması veya sıfırlama (reset) kutbunun ters bağlanması.
- **Bir Fazlalık/Eksiklik (Off-by-One Errors):** Sayaç döngülerinde, FIFO derinlik kontrollerinde veya bellek sınırlarında \`<\` yerine \`<=\` kullanılması.
- **Eksik Dal ve Durumlar (Missing Branches):** Bir \`case\` ifadesinde ele alınmayan durumlar veya eksik \`default\` dalları nedeniyle sentez sonrası donanımda istenmeyen mandal (latch) oluşumu.
- **Zamanlama ve El Sıkışma Uyuşmazlıkları:** \`valid\`/\`ready\` protokollerinde verinin onay gelmeden bir saat döngüsü önce kesilmesi veya ardışık düzen (pipeline) gecikmelerinin yanlış hesaplanması.
- **Saat Bölgesi Geçişleri (Clock Domain Crossing - CDC):** Farklı saat frekanslarında çalışan modüller arasında metastabilite önleyici senkronizörlerin unutulması.`,
      },
      {
        title: "4. Bir Hata Silikona Kaçarsa Ne Olur? (The Cost of an Escape)",
        content: `Tasarım aşamasında yakalanamayıp fiziksel silikona ulaşan hatalara sektörde 'hata kaçışı' (bug escape) adı verilir. Bir hata kaçışının faturası son derece ağırdır:

1. **Yeniden Maske Üretimi (Respin):** Modern gelişmiş üretim düğümlerinde (7nm, 5nm, 3nm) bir fotolitografi maske setinin yeniden üretilmesi 10 ila 50 milyon dolar arasında bir maliyete mal olur.
2. **Pazara Giriş Gecikmesi (Time-to-Market Loss):** Yeni bir maske üretilip silikonun dökümhaneden dönmesi en az 3 ila 6 ay sürer. Tüketici elektroniğinde 6 aylık bir gecikme pazar payının tamamen rakiplere kaptırılması anlamına gelebilir.
3. **Tarihsel İbret: Intel Pentium FDIV Hatası (1994):** Kayan nokta bölme tablosundaki küçük bir eksiklik nedeniyle işlemci belirli bölme işlemlerinde hatalı sonuç üretmiş; Intel hatalı çipleri geri çağırmak zorunda kalarak doğrudan 475 milyon dolar zarar etmiştir.
4. **Güvenlik ve İtibar Kaybı:** Otomotiv (ISO 26262), havacılık veya savunma sistemlerinde donanım hatası insan hayatını doğrudan tehdit edebilir.`,
      },
      {
        title: "5. Doğrulamanın Tamamlandığını Nasıl Anlarız? (Kapsama ve Kapanış)",
        content: `Bir çipte test edilebilecek durum uzayı astronomiktir ($2^{100}$ durumun üzerinde). Bu nedenle 'tüm olası durumları denedik' demek fiziksel olarak imkânsızdır. Doğrulamanın bittiğine nesnel metriklerle karar verilir:

- **Kod Kapsaması (Code Coverage):** Simülasyon araçları tarafından otomatik ölçülür. Yazılmış RTL kodunun ne kadarının tetiklendiğini gösterir (Satır, Dal, Koşul, Geçiş ve FSM kapsaması). Ancak kodun çalıştırılmış olması, beklenen doğru sonucu ürettiğini kanıtlamaz.
- **İşlevsel Kapsama (Functional Coverage):** Doğrulama mühendisinin tasarım spesifikasyonundan çıkardığı hedeflerdir (\`covergroup\`, \`coverpoint\`, \`cross\`). Spesifikasyondaki tüm kritik özelliklerin, köşe durumların ve arayüz kombinasyonlarının simülasyonda gerçekleşip gerçekleşmediğini ölçer.

**Kapanış (Sign-off Criteria):** Tapeout öncesinde kural basittir: %100 İşlevsel Kapsama + %100 Kod Kapsaması (onaylanmış feragatnameler dahil) ve regresyonda sıfır hata.`,
      },
      {
        title: "6. Yapay Zekâ ve Otonom Ajanlar ile Doğrulamanın Geleceği",
        content: `Son yıllarda yarı iletken endüstrisinde üretken yapay zekâ (Generative AI) ve LLM tabanlı doğrulama araçları hızla yaygınlaşmaktadır:

- **Kapsama Kapanışının Hızlandırılması (Coverage Closure Acceleration):** Ulaşılamayan kapsama noktalarını kapatmak için kısıtları (\`constraints\`) otomatik analiz edip özel uyarıcı dizileri üreten akıllı modeller.
- **LLM Destekli Testbench ve SVA Üretimi:** İngilizce spesifikasyon paragraflarından doğrudan SystemVerilog Assertions (\`SVA\`) ve UVM sequence şablonları türeten sistemler.
- **Akıllı Hata Ayıklama (AI-Assisted Debug):** Binlerce başarısız regresyon logunu analiz ederek aynı kök nedenden kaynaklanan hataları gruplayan ve mühendise doğrudan hatalı RTL satırını işaret eden algoritmalar.
- **Otonom Doğrulama Ajanları (\`Agentic Verification\`):** Kendi kendine simülatörü çalıştıran, logları okuyan, test senaryosu türeten ve kapanışa ulaşana kadar döngüyü sürdüren yeni nesil doğrulama mimarileri.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Sayısal Tasarım Doğrulama (DV) Temelleri ve Çip Tasarımındaki Yeri** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "verification.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `module counter ( input clk, input rst, // intended as active-low reset output reg [7:0] count ); parameter MAX_VALUE = 8'd255; always @(posedge clk or negedge rst) begin if (rst) begin // BUG: should be !rst for active-low count <= 8'd0; end else begin if (count == MAX_VALUE) count <= 8'd0; else count <= count + 1; end end endmodule`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Sayısal Tasarım Doğrulama (DV) Temelleri ve Çip Tasarımındaki Yeri",
      initialCode: `module counter ( input clk, input rst, // intended as active-low reset output reg [7:0] count ); parameter MAX_VALUE = 8'd255; always @(posedge clk or negedge rst) begin if (rst) begin // BUG: should be !rst for active-low count <= 8'd0; end else begin if (count == MAX_VALUE) count <= 8'd0; else count <= count + 1; end end endmodule`,
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
      question: "Modern bir yarı iletken projesinde donanım doğrulama (DV) sürecinin toplam proje süresi ve mühendislik eforunun yaklaşık %70'ini oluşturmasının temel sebebi nedir?",
      options: ["Donanım üretiminin (silikon döküm) geri dönülemez olması; silikona kaçacak tek bir mantık hatasının milyonlarca dolarlık maske revizyonu (respin) ve aylar süren gecikmeye yol açması", "SystemVerilog dilinin C++ veya Python'a kıyasla derleme süresinin çok yavaş olması", "Doğrulama mühendislerinin RTL kodunu her simülasyonda transistör seviyesinde SPICE modelleriyle analiz etme zorunluluğu", "Çip tasarımında kod kapsaması (code coverage) %100 olmadan sentez araçlarının netlist üretememesi"],
      correctIndex: 0,
      explanation: "Entegre devrelerde üretim (fabrication) son derece pahalı ve geri dönülemez bir süreçtir. Yazılımdaki gibi sonradan yama yapılamaz; üretim sonrasına kaçan tek bir mantık hatası 10-50 milyon dolarlık yeniden maske üretimi (respin) ve aylar süren pazar kaybı doğurur. Bu nedenle çip üretime gitmeden önce tasarımın hatasız olduğundan emin olmak için projenin en büyük kaynağı doğrulamaya ayrılır.",
    },
  },
  "verification-in-chip-design-flow": {
    id: "verification-in-chip-design-flow",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Çip Tasarım Akışında Doğrulama Süreçleri ve Fazlar",
    subtitle: "Spesifikasyondan tapeout'a ASIC tasarım akışında doğrulama adımları, vPlan oluşturma, GLS, STA ve tasarım-doğrulama ekibi iş birliği.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde bir ASIC veya SoC geliştirme akışında doğrulamanın nerede başlayıp nasıl evrildiğini tüm aşamalarıyla göreceksiniz:

- ASIC tasarım akışının temel basamakları ve her basamağa eşlik eden paralel doğrulama aktiviteleri
- Doğrulama planlamasının (\`vPlan\`) neden RTL yazımı başlamadan önce mimari spesifikasyon aşamasında yapıldığı
- RTL kodlama sürecindeki yoğun doğrulama akışı (Simülasyon, Formal Doğrulama, Emülasyon)
- Sentez ve Fiziksel Yerleşim sonrası Kapı Seviyesi Simülasyonun (\`Gate-Level Simulation - GLS\`) rolü
- GLS ile Statik Zamanlama Analizi (\`Static Timing Analysis - STA\`) arasındaki kesin sorumluluk ayrımı
- Kritik proje kilometre taşları: \`Feature Freeze\`, \`Code Freeze\` ve nihai \`Tapeout Sign-Off\`.`,
      },
      {
        title: "2. Tasarım Akışında Doğrulamanın Yeri: Paralel ve Sürekli Bir Süreç",
        content: `Entegre devre tasarımında yaygın bir yanılgı, doğrulamanın tasarım bittikten sonra başlayan bir son denetim adımı olduğudur. Gerçekte doğrulama, ilk mimari spesifikasyon belgesinin yazıldığı andan dökümhaneye son GDSII dosyasının gönderildiği ana kadar tasarımla kol kola yürüyen paralel bir süreçtir.

ASIC akışı ve paralel doğrulama fazları:
1. **Mimari Spesifikasyon:** Doğrulama Planı (\`vPlan\`) hazırlanır, arayüz gereksinimleri çıkarılır.
2. **RTL Tasarım:** Blok seviyesinde dinamik simülasyon (UVM), statik linting ve formal property checking başlar.
3. **Mantıksal Sentez:** Mantıksal Eşdeğerlik Kontrolü (\`LEC / Formality\`) ve ilk sıfır gecikmeli GLS koşulur.
4. **Yerleşim ve Rota (Place & Route):** Parazitik gecikmeler (\`SDF\`) çıkarılır; zamanlamalı GLS ve STA yürütülür.
5. **Fiziksel Doğrulama (DRC/LVS):** Nihai yerleşim kuralları denetlenir.
6. **Tapeout Sign-Off:** Tüm regresyon testleri dondurulmuş RTL üzerinde %100 başarıyla tamamlanır.`,
      },
      {
        title: "3. Spesifikasyon İncelemesi ve Doğrulama Planı (vPlan)",
        content: `Doğrulama ekibinin ilk görevi testbench yazmak değil, sistem mimarları tarafından hazırlanan spesifikasyon belgesini satır satır okumaktır.

Bu aşamada DV mühendisi tarafsız bir denetçi gibi hareket ederek mimarideki eksiklikleri, muğlak ifadeleri ve çelişkileri sorgular. Bu sorgulamalar henüz tek bir satır RTL kodu yazılmadan mimari seviyedeki tasarım kusurlarını önler.

Spesifikasyon netleştikçe **Doğrulama Planı (\`vPlan\`)** üretilir. \`vPlan\`; çipin tüm özelliklerini, hangi test senaryolarıyla uyarılacağını, hangi \`covergroup\` modelleriyle izleneceğini ve geçiş kriterlerini listeleyen bağlayıcı bir mühendislik sözleşmesidir.`,
      },
      {
        title: "4. RTL Kodlama Aşamasında Yoğun Doğrulama Trafiği",
        content: `RTL tasarımcıları modülleri tamamlayıp doğrulama ekibine teslim ettikçe (RTL handoff) üç ana doğrulama kolu eşzamanlı olarak çalışmaya başlar:

- **Dinamik Blok Simülasyonu:** SystemVerilog ve UVM ortamları kullanılarak blokların girişlerine milyonlarca kısıtlı rastgele (\`CRV\`) işlem paketi basılır. Skorboard (\`Scoreboard\`) ve referans modeller çıktıları denetler.
- **Formal Doğrulama (Property Checking):** Simülasyon gerektirmeden, kritik kontrol mantığı ve protokol kuralları matematiksel çözücüler ile taranır.
- **Donanım Emülasyonu:** Tasarımlar büyüyüp alt sistemler birleştikçe yazılım sürücülerinin (firmware) donanımla birlikte çalışabilmesi için özel emülatörlere (Palladium, Zebu) yüklenir.`,
      },
      {
        title: "5. Kapı Seviyesi Simülasyon (GLS) ve Statik Zamanlama Analizi (STA)",
        content: `Sentez ve yerleşim tamamlandığında RTL kodu mantık kapıları ve bağlantı tellerine (netlist) dönüştürülmüştür. Bu aşamada zamanlama ve mantık denetimi için iki farklı yöntem kullanılır:

- **Statik Zamanlama Analizi (STA):** Giriş uyarıcılarına ihtiyaç duymadan, devredeki tüm olası yolların saat periyodu içinde hedefe ulaşıp ulaşmadığını (setup/hold) matematiksel olarak inceler. Zamanlama garantisini STA verir; bu GLS'in işi değildir.
- **Kapı Seviyesi Simülasyon (GLS):** Netlist üzerinde gerçek gecikme dosyaları (\`SDF - Standard Delay Format\`) eklenerek simülasyon koşulur. GLS'in asıl amacı zamanlamayı kanıtlamak değil;
  * Sıfırlama diziliminin (reset sequence) doğruluğu
  * Asenkron saat bölgeleri arasındaki dinamik davranışlar
  * RTL'de \`x\` optimizasyonu yapılan ama kapı seviyesinde yayılan belirsizlikler (\`X-propagation\`)
  * Düşük güç mantığının (\`UPF/CPF\`, güç adaları) doğru açılıp kapandığını teyit etmektir.`,
      },
      {
        title: "6. Kritik Dönüm Noktaları (Milestones) ve Tapeout İmzası",
        content: `Bir projenin aşamaları arasındaki geçişler resmi dönüm noktalarıyla koordine edilir:

- **Feature Freeze (Özellik Dondurma):** Bu tarihten sonra tasarıma yeni bir işlev eklenemez. \`vPlan\` kesinleştirilir; doğrulama ekibi artık hareketli bir hedefi değil, sabit bir hedefin kapsamını kapatmaya odaklanır.
- **Code Freeze (Kod Dondurma):** RTL kodlaması tamamen biter. Yalnızca kritik hata düzeltmeleri (bug fix) resmi onay süreçleriyle koda dahil edilebilir.
- **Tapeout Sign-Off (Dökümhane İmzası):** Dökümhaneye gönderilecek kesin RTL kopyası üzerinde tam regresyon süiti çalıştırılır. Hiçbir başarısız test, çözülmemiş hata veya feragatsiz kapsama açığı bulunmamalıdır. Tüm onaylar alındıktan sonra GDSII dosyası üretime verilir.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Çip Tasarım Akışında Doğrulama Süreçleri ve Fazlar",
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
      question: "Modern bir ASIC tasarım akışında sentez ve yerleşim sonrası Kapı Seviyesi Simülasyonun (Gate-Level Simulation - GLS) asıl varlık sebebi nedir ve neden zamanlama kontrolü için Statik Zamanlama Analizi (STA) tercih edilir?",
      options: ["GLS'in temel amacı reset dizilimi, X-yayılımı (X-propagation) ve güç anahtarlama gibi dinamik durumları doğrulamaktır; zamanlama ihlalleri (setup/hold) ise simülasyonun girdi vektörlerine bağımlı kalmadan tüm yolları tüketen STA ile garanti altına alınır.", "STA yalnızca analog blokları doğrulamak için kullanılır, sayısal blokların tüm zamanlama analizleri zorunlu olarak GLS ile yapılır.", "GLS, RTL kodunun derleyicide hiç derlenmeden doğrudan silikona aktarılmasını sağlayan tek araçtır.", "GLS simülasyonları RTL simülasyonundan binlerce kat daha hızlı çalıştığı için regresyon süresini kısaltmak amacıyla tercih edilir."],
      correctIndex: 0,
      explanation: "Zamanlama doğrulaması (setup ve hold kontrolleri) için Statik Zamanlama Analizi (STA) kullanılır çünkü STA tüm sinyal yollarını girdi vektörlerine ihtiyaç duymadan eksiksiz analiz eder. GLS ise çok yavaş ve yalnızca simülasyonun uyardığı yolları görebilen bir yöntemdir; asıl amacı reset dizilimi, X-yayılımı ve güç yönetimi gibi dinamik donanım davranışlarını denetlemektir.",
    },
  },
  "verification-vs-validation": {
    id: "verification-vs-validation",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Doğrulama (Verification) ve Sağlama (Validation) Arasındaki Temel Farklar",
    subtitle: "Pre-silicon doğrulama ile post-silicon sağlama arasındaki mimari sınırlar, hata kaçış mekanizmaları ve sektördeki mühendislik rolleri.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `

![Pre-Silicon Verification vs Post-Silicon Validation](/images/verification/verification-vs-validation.svg)

Bu bölümde yarı iletken terminolojisinde sıkça karıştırılan iki temel kavram olan Doğrulama (\`Verification\`) ve Sağlama (\`Validation\`) disiplinlerini derinlemesine inceleyeceksiniz:

- 'Tasarımı doğru mu yaptık?' (\`Verification\`) ile 'Doğru tasarımı mı yaptık?' (\`Validation\`) sorularının arkasındaki felsefe
- Pre-Silicon Doğrulama (DV) ortamı: Simülasyon, emülasyon ve yazılımsal modeller
- Post-Silicon Sağlama (SV) ortamı: Laboratuvar tezgahları, gerçek çipler, osiloskoplar ve anakartlar
- Doğrulamadan kaçıp sağlamada yakalanan donanım hatalarının türleri
- Hem doğrulamayı hem sağlamayı aşarak son kullanıcıya (in-the-field) ulaşan kritik riskler
- Yarı iletken endüstrisindeki unvanlar ve kariyer yolları: DV Mühendisi vs SV Mühendisi.`,
      },
      {
        title: "2. Temel Ayrım: 'Tasarımı Doğru mu Yaptık?' vs 'Doğru Tasarımı mı Yaptık?'",
        content: `Donanım mühendisliğinde bu iki kavram iki farklı soruyu yanıtlar:

- **Doğrulama (Verification - Pre-Silicon):** *'Did we build the design right?'* (Tasarımı doğru inşa ettik mi?). Bu aşamada referans mutlak gerçek mimari spesifikasyondur. Eğer spesifikasyonda 'Kontrol yazmacı reset anında 0xA5 değerini alır' yazıyorsa, DV ekibi RTL kodunun bu davranışı sergilediğini kanıtlar. Spesifikasyonun eksik veya hatalı olup olmadığı bu aşamanın doğrudan konusu değildir.
- **Sağlama (Validation - Post-Silicon):** *'Did we build the right design?'* (Doğru tasarımı mı inşa ettik?). Bu aşamada referans gerçek dünyadır. Çip fiziksel silikon olarak gelmiştir ve gerçek bir sistemde (örneğin bir sunucu anakartında veya akıllı telefonda), gerçek işletim sistemi ve çevre birimleriyle birlikte test edilir. Burada amaç spesifikasyonun kendisinin gerçek dünya gereksinimlerini karşılayıp karşılamadığını ve nihai ürünün stabil çalışıp çalışmadığını görmektir.`,
      },
      {
        title: "3. Pre-Silicon Doğrulamanın Gücü ve Zayıflıkları",
        content: `Pre-silicon doğrulama, çip fabrikada üretilmeden önce yazılımsal ve emülasyon ortamlarında icra edilir.

- **En Büyük Gücü: %100 Gözlemlenebilirlik ve Kontrol Edilebilirlik:** Tasarımın içindeki her bir telin (wire), flip-flop'un veya durum makinesinin değerini dalga formunda (waveform) pikosaniye hassasiyetiyle görebilirsiniz. Simülasyonu istediğiniz anda durdurabilir, saat sinyalini dondurabilir ve iç sinyallere hata enjekte edebilirsiniz.
- **En Büyük Kısıtı: Yavaşlık:** Yazılımsal simülatörler saniyede yalnızca 10 ila 100 saat döngüsü (Hz seviyesi) koşturabilir. Bu hızla modern bir işletim sistemini (Linux) açmak veya saniyelerce video akışını işlemek aylar sürer.`,
      },
      {
        title: "4. Post-Silicon Sağlamanın Dinamikleri ve İlk Silikon (Bring-Up)",
        content: `Post-silicon sağlama, dökümhaneden paketlenmiş ilk fiziksel çiplerin laboratuvara ulaştığı gün (\`First Silicon Bring-Up\`) başlar.

- **En Büyük Gücü: Gerçek Donanım Hızı:** Çip hedef saat frekansında (örneğin 3.5 GHz) çalışır. Bu sayede saniyede milyarlarca, günlerce süren stres testlerinde ise katrilyonlarca saat döngüsü tüketilebilir. Simülasyonun trilyonlarca yılda ulaşamayacağı derin çalışma senaryoları birkaç saatte taranır.
- **En Büyük Zorluğu: Siyah Kutu (Black Box) Sorunu:** Çipin içine bakamazsınız. Yalnızca dış pinler, JTAG arayüzleri ve dahili tarama zincirleri (\`scan chains\`) görünürdür. Çip kilitlendiğinde osiloskoplar, mantık analizörleri ve özel hata ayıklama yazılımlarıyla kök neden analizi yapmak dedektiflik gerektirir.`,
      },
      {
        title: "5. Hata Kaçış Mekanizmaları: Doğrulamadan Kaçan Hatalar Neden Olur?",
        content: `Pre-silicon DV mükemmel çalışsa bile bazı hata türleri yapısal olarak yalnızca post-silicon aşamasında yakalanabilir:

1. **Spesifikasyon Hataları (Spec Bugs):** RTL spesifikasyonu kusursuzca uygulamıştır, ancak spesifikasyon gerçeği yansıtmamaktadır. Çip tasarlandığı gibi çalışır ama hedef çevre birimiyle anlaşamaz.
2. **Analog ve Sinyal Bütünlüğü Problemleri:** Çapraz girişim (\`crosstalk\`), besleme gerilimi düşüşleri (\`IR drop\`), saat kayması (\`jitter\`) ve termal ısınma gibi saf fiziksel ve analog etkiler sayısal RTL simülasyonunda modellenemez.
3. **Milyonlarca Döngü Sonra Tetiklenen Senaryolar:** Günler süren yoğun ağ trafiği altında bellek tamponlarının taşması gibi aşırı derin senaryolar sadece gerçek frekansta çalışan silikonda görünür.

Eğer bir hata sağlamayı da aşarsa son kullanıcı cihazlarında çökmelere yol açar (in-the-field failures).`,
      },
      {
        title: "6. Endüstriyel Roller: DV Mühendisi ve SV Mühendisi Karşılaştırması",
        content: `Yarı iletken şirketlerinde bu iki uzmanlık alanı farklı ekipler ve araç setleriyle yürütülür:

| Kriter | Design Verification (DV) Mühendisi | Silicon Validation (SV) Mühendisi |
| :--- | :--- | :--- |
| **Aşama** | Pre-Silicon (Üretim öncesi) | Post-Silicon (Üretim sonrası laboratuvar) |
| **Ortam** | Linux sunucuları, EDA simülatörleri, emülatörler | Laboratuvar tezgahı, osiloskop, lojik analizör, referans kartlar |
| **Diller & Araçlar** | SystemVerilog, UVM, SVA, Python, Verdi, VCS | C/C++, Python, LabVIEW, Linux çekirdek sürücüleri, JTAG |
| **Hedef Nesne** | RTL kaynak kodu ve sentez netlist'i | Paketlenmiş fiziksel çip ve silikon gofret |
| **Görünürlük** | Tam görünürlük (Tüm iç sinyaller ve dalga formları) | Kısıtlı görünürlük (Dış pinler, telemetry ve JTAG kayıtları) |`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Doğrulama (Verification) ve Sağlama (Validation) Arasındaki Temel Farklar",
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
      question: "Bir çip projesinde RTL tasarımının yazılı mimari spesifikasyona harfiyen uyduğu kanıtlanmasına rağmen, çip üretilip laboratuvara geldiğinde çevre birimleriyle iletişim kuramaması durumu en iyi nasıl açıklanır?",
      options: ["Pre-silicon doğrulama (DV) spesifikasyonun doğruluğunu değil, tasarımın spesifikasyona uygunluğunu denetler; eğer spesifikasyonun kendisi eksik veya hatalıysa, bu durum ancak post-silicon sağlama (validation) aşamasında ortaya çıkar.", "DV mühendisleri testbench yazarken SystemVerilog yerine C dili kullandıkları için donanım simülasyonu başarısız olmuştur.", "Dökümhanede üretim yapılırken saat frekansı otomatik olarak yarıya düşürüldüğü için tasarım bozulmuştur.", "Post-silicon sağlama aşamasında yazılım sürücülerinin donanımla temas etmesi yasaktır."],
      correctIndex: 0,
      explanation: "Doğrulama (Verification), tasarımın mimari spesifikasyona uygunluğunu denetler ('Tasarımı doğru inşa ettik mi?'). Ancak spesifikasyonun kendisinde bir hata veya eksiklik varsa, tasarım spesifikasyona tam uysa bile gerçek dünyada çalışmaz. Sistemin gerçek dünya gereksinimlerini karşılayıp karşılamadığı ('Doğru tasarımı inşa ettik mi?') sorusu yalnızca post-silicon sağlama (validation) aşamasında yanıt bulur.",
    },
  },
  "verification-techniques": {
    id: "verification-techniques",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Donanım Doğrulama Teknikleri: Simülasyon, Formal, Emülasyon ve Prototipleme",
    subtitle: "Modern SoC projelerinde dinamik simülasyon, matematiksel formal doğrulama, donanım emülasyonu ve FPGA prototipleme tekniklerinin karşılaştırılması.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde modern entegre devre doğrulamada kullanılan dört temel tekniği ve bu tekniklerin birbirini nasıl tamamladığını öğreneceksiniz:

- Mantıksal Simülasyon (\`Logic Simulation\`): Olay güdümlü doğrulamanın temelleri
- Matematiksel Formal Doğrulama (\`Formal Verification\`): Durum uzayı ve matematiksel kanıtlar
- Donanım Emülasyonu (\`Hardware Emulation\`): Milyonlarca dolarlık özel donanım hızlandırıcıları
- FPGA Prototipleme (\`FPGA Prototyping\`): Gerçek frekansa yakın yazılım geliştirme ortamları
- Bu dört tekniğin hız, kapasite, hata ayıklama (debug) görünürlüğü ve maliyet karşılaştırması
- Endüstriyel hibrit doğrulama piramidi ve stratejisi.`,
      },
      {
        title: "2. Dinamik Mantıksal Simülasyon (Simulation)",
        content: `Mantıksal simülasyon, çip doğrulamanın en eski, en yaygın ve en esnek tekniğidir (Synopsys VCS, Cadence Xcelium, Siemens Questa).

- **Çalışma Mantığı:** Olay güdümlü (event-driven) bir simülasyon motoru, testbench tarafından üretilen girdi uyarıcılarını (stimulus) saat kenarlarında RTL modeline uygular ve sinyal değişimlerini hesaplar.
- **Avantajları:** En yüksek hata ayıklama konforunu sunar. Tasarımın tüm iç sinyalleri dalga formu olarak kaydedilebilir, kaynak kod satır satır izlenebilir. SystemVerilog ve UVM gibi nesne yönelimli dilleri tam destekler.
- **Zayıf Yönü:** Yavaşlık. Tipik bir simülasyon 1 ila 100 Hz hızında çalışır. Milyonlarca saat döngüsü gerektiren karmaşık SoC senaryolarında günlerce koşturulması gerekebilir.`,
      },
      {
        title: "3. Matematiksel Formal Doğrulama (Formal Verification)",
        content: `Formal doğrulama, simülasyondan temel bir felsefeyle ayrılır: Testbench veya test vektörü yazmaya ihtiyaç duymaz!

- **Çalışma Mantığı:** RTL tasarımı ve tasarımın uyması gereken kurallar (SystemVerilog Assertions - SVA) matematiksel mantık önermelerine dönüştürülür. SAT/SMT çözücüler tasarımın ulaşabileceği tüm durum uzayını matematiksel olarak tarar.
- **Gücü:** Simülasyon milyarlarca rastgele test koşsa bile bir hatanın olmadığını asla kanıtlayamaz; sadece denenmiş durumlarda hata çıkmadığını gösterir. Formal doğrulama ise bir kuralın ihlal edilmesinin matematiksel olarak imkânsız olduğunu kanıtlar (\`Full Proof\`).
- **Kısıtı:** Durum uzayı patlaması (\`State Space Explosion\`). Flip-flop sayısı arttıkça durum sayısı üstel ($2^N$) artar; bu nedenle formal doğrulama tüm SoC yerine kontrol mantığı, hakemlik (arbiter) ve protokol arayüzleri gibi odaklanmış bloklarda etkilidir.`,
      },
      {
        title: "4. Donanım Emülasyonu (Hardware Emulation)",
        content: `Büyük SoC tasarımlarında simülasyonun yetersiz kaldığı hız problemini çözmek için özel emülatörler kullanılır (Cadence Palladium, Synopsys Zebu, Siemens Veloce).

- **Çalışma Mantığı:** Özel olarak geliştirilmiş devasa işlemci dizileri veya ASIC tabanlı donanım süper bilgisayarlarıdır. RTL kodu sentezlenerek bu donanım motoruna yüklenir.
- **Hız:** Simülasyondan 1.000 ila 10.000 kat daha hızlıdır (~1-5 MHz). Bir işletim sisteminin (Linux, Android) saniyeler içinde ayağa kalkmasını sağlar.
- **Kullanım Alanı:** Firmware/yazılım sürücüleri ile donanımın bir arada test edilmesi, donanım-yazılım ortak doğrulaması (HW/SW co-verification) ve çok çipli büyük sistemlerin doğrulanması.
- **Maliyeti:** Milyonlarca dolarlık kurulum ve özel veri merkezi altyapısı gerektirir.`,
      },
      {
        title: "5. FPGA Prototipleme (FPGA Prototyping)",
        content: `FPGA prototipleme, RTL tasarımının ticari olarak satılan yüksek kapasiteli FPGA yongalarına (AMD Xilinx Virtex UltraScale+, Intel Stratix 10) sentezlenip gömülmesidir (Synopsys HAPS vb.).

- **Hız:** 10 ila 100 MHz hızlarına ulaşabilir. Gerçek silikon hızına en yakın ortamdır.
- **Amacı:** Çip fabrikadan çıkmadan aylar önce yazılım ve uygulama geliştirme ekiplerine çalışan bir fiziksel geliştirme platformu sunmak.
- **Zorlukları:** Milyarlarca kapılı bir tasarımı tek bir FPGA'e sığdırmak imkânsızdır; tasarımı birden çok FPGA'e bölmek (partitioning), saat yapısını FPGA mantığına uyarlamak ve günlerce süren yerleşim-bağlantı (place & route) süreçleriyle uğraşmak gerekir. Ayrıca donanım içi görünürlük çok düşüktür.`,
      },
      {
        title: "6. Karşılaştırma Matrisi ve Hibrit Doğrulama Stratejisi",
        content: `Modern bir yarı iletken projesinde bu tekniklerin hiçbiri tek başına kullanılmaz; hibrit bir doğrulama piramidi kurulur:

| Teknik | Hız | Kapasite | Görünürlük | Kullanım Alanı |
| :--- | :--- | :--- | :--- | :--- |
| **Simülasyon** | Çok Yavaş (~10 Hz) | Sınırsız (Hafıza yettiğince) | %100 (Tam dalga formu) | Blok ve alt sistem seviyesi işlevsel testler |
| **Formal** | Bağımsız (Çözücü süresi) | Küçük / Orta (Kritik kontrol) | Karşıt örnek (Counterexample) | Arayüz protokolleri, arbitrasyon, güvenlik |
| **Emülasyon** | Hızlı (~1-5 MHz) | Çok Büyük (Tüm SoC) | Yüksek (Dinamik prob izleme) | SoC seviyesi entegrasyon, OS boot, uzun testler |
| **FPGA Prototip** | En Hızlı (~50 MHz) | Orta / Büyük (Bölünmüş) | Düşük (Sınırlı lojik analizör) | Yazılım geliştirme, müşteri demoları, HDMI/PCIe |

Strateji: Blok seviyesinde Formal ve UVM Simülasyonu; alt sistemde UVM ve Emülasyon; SoC seviyesinde Emülasyon ve FPGA Prototipleme.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Donanım Doğrulama Teknikleri: Simülasyon, Formal, Emülasyon ve Prototipleme",
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
      question: "Bir SoC projesinde işlemci çekirdeği ile bellek kontrolörü arasındaki karmaşık bir AXI barasında kilitlenme (deadlock) ihtimalini sıfıra indirmek ve hiçbir uyarıcı test vektörü yazmadan bunu matematiksel olarak ispatlamak isteyen bir DV mühendisi hangi tekniği seçmelidir?",
      options: ["Matematiksel Formal Doğrulama (Formal Verification)", "Kapı Seviyesi Simülasyon (GLS)", "FPGA Prototipleme", "Yönlendirilmiş Simülasyon (Directed Simulation)"],
      correctIndex: 0,
      explanation: "Formal Doğrulama (Formal Verification), girdi uyarıcılarına ve testbench'e ihtiyaç duymadan, tasarımın tüm durum uzayını matematiksel çözücülerle tüketici bir şekilde tarar. Kilitlenme (deadlock) gibi güvenlik ve kontrol özelliklerinin hiçbir koşulda ihlal edilmeyeceğini matematiksel kesinlikle kanıtlayabilen yegane tekniktir.",
    },
  },
  "verification-stages": {
    id: "verification-stages",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Doğrulama Kademeleri: Blok, Alt Sistem ve SoC/Sistem Düzeyi",
    subtitle: "Entegre devre doğrulamada hiyerarşik kademeler, regresyon stratejileri, aşamalar arası devir (handoff) kriterleri ve geç bulunan hataların maliyeti.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde modern entegre devre doğrulamada uygulanan hiyerarşik kademelendirme mimarisini ve devir disiplinini öğreneceksiniz:

- Yonganın neden tek bir devasa ortam yerine hiyerarşik kademelere bölünerek doğrulandığı
- Blok Düzeyi (Block / Unit-Level) Doğrulama: Derinlemesine kontrol ve maksimum kapsama
- Alt Sistem Düzeyi (Subsystem-Level) Doğrulama: Bloklar arası entegrasyon ve arayüz protokolleri
- Sistem / SoC Düzeyi (SoC-Level) Doğrulama: Uçtan uca senaryolar ve donanım-yazılım etkileşimi
- Geç Bulunan Hataların Katlanarak Artan Maliyet Eğrisi (10x Kuralı)
- Kademeler arası resmi devir (Handoff) kapıları ve regresyon yönetimi.`,
      },
      {
        title: "2. Neden Kademeli Doğrulama? Böl ve Yönet Prensibi",
        content: `Milyarlarca transistör içeren modern bir SoC'yi doğrudan en üst seviyede (top-level) doğrulamaya çalışmak imkânsız bir görevdir.

Eğer bir FIFO'nun doluluk bayrağındaki hata tüm SoC birleştirildikten sonra aranırsa:
- Hatayı tetiklemek için işlemcinin yüzlerce komut çalıştırması gerekir.
- Simülasyon saatlerce sürer.
- Hatanın FIFO'dan mı, bellek kontrolöründen mi, yoksa aradaki veri yolundan mı kaynaklandığını izole etmek günler alır.

Bu nedenle doğrulama piramidi 'Böl ve Yönet' (Divide and Conquer) felsefesiyle kurulur: Tabanında derinlemesine blok testleri, ortasında alt sistem entegrasyonu, tepesinde ise odaklanmış uçtan uca sistem testleri yer alır.`,
      },
      {
        title: "3. Blok Düzeyi (Unit/Block-Level) Doğrulama: Kalite Güvencesinin Temeli",
        content: `Blok seviyesi, her bir donanım modülünün (örneğin UART, DMA denetleyici, Kripto motoru, FIFO) tek başına, izole bir testbench içinde doğrulandığı kademedir.

- **Odak Noktası:** Blok spesifikasyonundaki tüm işlevsel özellikler, register okuma/yazma haritası, hata durumları ve tüm köşe durumlar.
- **Kapsama Hedefi:** En yüksek kapsama zorunluluğu bu kademededir. %100 Satır, Dal, Koşul, Geçiş, FSM ve İşlevsel Kapsama kapatılmalıdır.
- **Testbench Mimarisi:** Tam teşekküllü UVM ortamı kurulur. Giriş pinleri doğrudan testbench ajanları tarafından sürülür, maksimum kontrol edilebilirlik sağlanır. Bir test birkaç saniyede koşar ve kök neden anında bulunur.`,
      },
      {
        title: "4. Alt Sistem Düzeyi (Subsystem-Level) Doğrulama: Entegrasyon ve Protokol Uyumu",
        content: `Bireysel bloklar kendi blok seviyesi sign-off onayını aldıktan sonra mantıksal gruplar halinde birleştirilir (örneğin CPU Kümesi, Güvenlik Alt Sistemi, Bellek Alt Sistemi).

- **Odak Noktası:** Blokların birbiriyle konuşması. AXI/AHB baralarında arbitrasyon, tampon taşmaları, kesme (interrupt) dağıtımı ve saat kapılama (clock gating) kontrolleri.
- **Yeniden Kullanılabilirlik (Reusability):** Blok seviyesinde yazılan UVM ajanları (\`uvm_agent\`) atılmaz; alt sistem testbench'ine taşınarak pasif moda (\`UVM_PASSIVE\`) geçirilir ve arayüz trafiğini izleyen monitörlere dönüştürülür.
- **Kapsama:** Alt sistemler arası veri akışı ve protokol senaryoları hedeflenir.`,
      },
      {
        title: "5. Sistem Düzeyi / SoC Doğrulaması: Uçtan Uca Bütünlük",
        content: `Sistem düzeyinde yonganın tamamı bir aradadır: Tüm işlemci çekirdekleri, harici bellek arayüzleri (DDR), yüksek hızlı çevre birimleri (PCIe, USB) ve güç kontrol birimleri.

- **Odak Noktası:** Uçtan uca kullanım senaryoları (use cases). Örneğin: 'İşlemci DMA'yi tetikler, DMA veriyi harici DDR'dan şifreleme motoruna aktarır, şifreli veri Ethernet üzerinden paketlenir ve işlemciye kesme üretilir.'
- **Yöntem:** Bu aşamada testler artık sadece UVM sequence'ları ile değil, işlemci üzerinde koşan C programları (firmware/bare-metal code) ile yürütülür. Donanım emülasyonu bu aşamanın birincil çalışma atıdır.`,
      },
      {
        title: "6. Geç Yakalanan Hataların Bedeli (10x Kuralı) ve Devir Kapıları",
        content: `Doğrulama mühendisliğinde evrensel bir gerçek vardır: Bir hatayı yakalama aşaması ne kadar gecikirse, onu çözmenin maliyeti 10 kat artar (10x Rule of Bug Cost):

$$\\text{Maliyet: } \\text{Blok} \\xrightarrow{\\times 10} \\text{Alt Sistem} \\xrightarrow{\\times 10} \\text{SoC} \\xrightarrow{\\times 100} \\text{Silikon (Lab)} \\xrightarrow{\\times 1000} \\text{Saha}$$

- Blok seviyesinde 1 saatte çözülen bir mantık hatası, SoC seviyesinde günlerce debug gerektirir. Silikonda ise milyonlarca dolarlık felakete dönüşür.
- **Devir (Handoff) Disiplini:** Hiçbir blok, kendi blok düzeyi \`vPlan\` hedeflerini (%100 kapsama, sıfır açık hata) kapatmadan alt sistem seviyesine devredilemez. Bu kapı disiplini çipin başarısını garanti altına alır.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Doğrulama Kademeleri: Blok, Alt Sistem ve SoC/Sistem Düzeyi",
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
      question: "Bir FIFO bloğunun doluluk bayrağındaki (full flag) bir mantık hatasını SoC seviyesi testlerde yakalamak yerine blok seviyesi doğrulamada yakalamanın mühendislik açısından en kritik avantajı nedir?",
      options: ["Blok seviyesinde testbench sinyalleri doğrudan kontrol edebilir, simülasyon saniyeler sürer ve kök neden doğrudan dalga formunda izole edilir; SoC seviyesinde ise bu hatayı tetiklemek için karmaşık yazılım komutları gerekir ve simülasyon saatler sürer.", "Blok seviyesinde simülatörler donanımı doğrudan makine koduna dönüştürerek çalıştırır.", "SoC seviyesinde hata ayıklarken dalga formu (waveform) kaydetmek teknik olarak imkânsızdır.", "Blok seviyesinde bulunan hatalar için RTL tasarımcısının kodu düzeltmesi zorunlu değildir."],
      correctIndex: 0,
      explanation: "Blok seviyesinde doğrulama yaparken ortam son derece izoledir ve simülasyon saniyeler içinde tamamlanır; hatanın kök nedeni birkaç sinyal incelenerek anında bulunur. SoC seviyesinde ise aynı hatayı ortaya çıkarmak için tüm işlemci yığınının çalışması gerekir, simülasyon saatler sürer ve aradaki onlarca veri yolu yüzünden hatayı izole etmek son derece zordur.",
    },
  },
  "directed-verification": {
    id: "directed-verification",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Yönlendirilmiş Doğrulama (Directed Verification) Metodolojisi",
    subtitle: "Belirli senaryolar ve uç durumlar için elle yazılan yönlendirilmiş testlerin mimarisi, kullanım alanları ve kısıtlı rastgele doğrulamaya göre sınırları.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde donanım doğrulamanın en temel ve sezgisel yöntemi olan Yönlendirilmiş Doğrulama (\`Directed Verification\`) yaklaşımını inceleyeceksiniz:

- Yönlendirilmiş doğrulamanın tanımı, mantığı ve deterministik yapısı
- Kimler yönlendirilmiş test yazar? Tasarımcı duman testleri (\`smoke tests\`) vs DV mühendisi köşe durum testleri
- Yönlendirilmiş testlerin vazgeçilmez ve en verimli olduğu spesifik kullanım alanları
- Tipik bir SystemVerilog yönlendirilmiş testbench mimarisi ve görev (task) akışı
- Yönlendirilmiş testbench'lerde sık yapılan hatalar (Zamanlama uyuşmazlıkları, eksik kontroller)
- Bu metodolojinin yapısal sınırları ve neden tek başına modern çipleri doğrulamaya yetmediği.`,
      },
      {
        title: "2. Yönlendirilmiş Doğrulama Nedir?",
        content: `Yönlendirilmiş doğrulama (Directed Verification), mühendisin simülasyona uygulanacak her bir girdi sinyalini, veri değerini, sıralamayı ve zamanlamayı satır satır, elle yazdığı deterministik bir test yaklaşımıdır.

Akış tamamen öngörülebilirdir:
- Saat 10ns'de reset bırakılır.
- Saat 20ns'de adres hattına \`0x1000\` yazılır.
- Saat 30ns'de veri hattına \`0xDEADBEEF\` sürülür.
- Saat 50ns'de çıkış sinyalinin \`0x00000001\` olduğu kontrol edilir.

Bu test her çalıştırıldığında mikro-saniyesine kadar aynı yolları tüketir, aynı durumları ziyaret eder ve aynı sonucu üretir. Hiçbir rastgelelik veya belirsizlik barındırmaz.`,
      },
      {
        title: "3. Yönlendirilmiş Testbench Mimarisi ve Kod Örneği",
        content: `Yönlendirilmiş bir testbench genellikle sıralı görevlerden (\`tasks\`) veya UVM ortamında sabit kodlanmış sekanslardan (\`directed sequences\`) oluşur. Tipik bir senkron FIFO için yönlendirilmiş test senaryosu şu şekilde yazılabilir:

\`\`\`systemverilog
module tb_directed_fifo;
  logic clk = 0, rst_n;
  logic wr_en, rd_en, full, empty;
  logic [7:0] din, dout;

  sync_fifo dut (.*);
  always #5 clk = ~clk;

  initial begin
    // 1. Reset Dizilimi
    rst_n = 0; wr_en = 0; rd_en = 0; din = 0;
    repeat (2) @(posedge clk);
    rst_n = 1;
    @(posedge clk);

    // 2. Yönlendirilmiş Senaryo: FIFO Tamamen Dolana Kadar Yaz
    $display("[%0t] FIFO dolduruluyor...", $time);
    while (!full) begin
      @(posedge clk);
      wr_en <= 1'b1;
      din   <= din + 1'b1;
    end
    @(posedge clk);
    wr_en <= 1'b0;

    // 3. Kontrol: FIFO doluyken yazmaya devam etmeyi dene (Hata Senaryosu)
    @(posedge clk);
    wr_en <= 1'b1;
    din   <= 8'hFF;
    @(posedge clk);
    assert (full === 1'b1) else $error("FIFO dolu bayragi dustu!");
    wr_en <= 1'b0;
    $finish;
  end
endmodule
\`\`\``,
      },
      {
        title: "4. Yönlendirilmiş Testlerin Vazgeçilmez Olduğu Durumlar",
        content: `Kısıtlı rastgele doğrulama (CRV) sektöre hakim olsa da yönlendirilmiş testler belirli durumlarda en doğru araçtır:

1. **İlk RTL Teslimi ve Duman Testleri (Smoke Tests):** RTL kodu henüz yeni yazıldığında testbench ortamının sağlıklı ayağa kalktığını, temel veri akışının çalıştığını teyit etmek için ilk olarak yönlendirilmiş bir duman testi koşulur.
2. **Katı Protokol Başlatma Adımları:** PCIe Link Eğitimi (LTSSM) veya DDR bellek kalibrasyonu gibi onlarca kesin adımlık sıralı protokol adımlarını rastgelelikle denemek saatler alır; bu akışlar yönlendirilmiş sekanslarla hızla tamamlanır.
3. **Kapsama Açıklarını Kapatma (Coverage Closure):** Regresyonun sonunda rastgele testlerin bir türlü denk getiremediği %1'lik aşırı nadir bir köşe durumu hedeflemek için özel bir yönlendirilmiş test yazılır.
4. **Hata Yeniden Üretimi (Bug Reproduction):** Post-silicon laboratuvarında veya regresyonda yakalanan bir hatayı izole edip hızla hata ayıklamak (debug) için hatayı tetikleyen adımlar yönlendirilmiş teste dökülür.`,
      },
      {
        title: "5. Yaygın Hatalar ve Dikkat Edilmesi Gereken Noktalar",
        content: `Yönlendirilmiş test yazarken en sık düşülen tuzaklar şunlardır:

- **Çıkışları Çok Erken Örneklemek:** Saat kenarından hemen önce veya ardışık düzen (pipeline) gecikmesi tamamlanmadan çıkışı kontrol etmek (yarış durumu yaratır).
- **Yalnızca 'Mutlu Yol' (Happy Path) Test Etmek:** Tasarımın normal çalışmasını doğrulayıp geçersiz girdiler, parite hataları veya sıfırlama anındaki davranışları test etmemek.
- **Test Senaryolarını Birbirine Bağımlı Kılmak:** İkinci testin çalışabilmesi için birinci testin bıraktığı durumu varsaymak. Her test senaryosu tasarımı bilinen bir başlangıç durumuna (clean reset) getirmelidir.`,
      },
      {
        title: "6. Yapısal Sınırlar: Neden Yönlendirilmiş Testlerle Çip Doğrulanamaz?",
        content: `Yönlendirilmiş doğrulamanın öldürücü kusuru insan hayal gücüyle sınırlı olmasıdır:

- **Bilinmeyen Bilinmeyenler (Unknown Unknowns):** Yönlendirilmiş bir test yalnızca mühendisin önceden öngördüğü senaryoyu dener. Ancak en yıkıcı donanım hataları mimarın veya DV mühendisinin aklına hiç gelmeyen beklenmedik sinyal kombinasyonlarında ortaya çıkar.
- **Ölçeklenemezlik:** 64-bitlik iki sayıyı toplayan bir devrede $2^{128}$ olası durum vardır. Bir mühendis ömrü boyunca elle en fazla birkaç yüz test yazabilir; bu da uzayın trilyonda birine bile denk gelmez.

İşte bu nedenle modern çip endüstrisi yönlendirilmiş testleri tamamlayıcı bir araç olarak tutarken, ana doğrulama omurgasını **Kısıtlı Rastgele Doğrulama (CRV)** ve **Kapsama Güdümlü Doğrulama (CDV)** üzerine kurmuştur.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Yönlendirilmiş Doğrulama (Directed Verification) Metodolojisi** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "directed-verification.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `module tb_fifo; parameter DATA_W = 8; parameter DEPTH = 4; logic clk, rst_n; logic wr_en, rd_en; logic [DATA_W-1:0] wr_data, rd_data; logic full, empty; sync_fifo #(.DATA_W(DATA_W), .DEPTH(DEPTH)) u_fifo ( .clk(clk), .rst_n(rst_n), .wr_en(wr_en), .wr_data(wr_data), .rd_en(rd_en), .rd_data(rd_data), .full(full), .empty(empty) ); initial clk = 0; always #5 clk = ~clk; initial begin wr_en = 0; rd_en = 0; wr_data = 0; // -- TEST 1: Reset (designer sanity check) -- // After reset deasserts, FIFO must report empty and not full. rst_n = 0; repeat(2) @(posedge clk); rst_n = 1; @(posedge clk); if (!empty) $error("TEST 1 FAIL: expected empty after reset"); if ( full) $error("TEST 1 FAIL: full must not assert after reset"); $display("TEST 1 PASS: reset behaviour correct"); // -- TEST 2: Overflow blocked (VE corner-case directed test) -- // Fill the FIFO to capacity, then attempt one extra write. // The DUT must discard it; draining must yield only DEPTH entries. repeat(DEPTH) begin @(posedge clk); wr_en <= 1; wr_data <= wr_data + 1; @(posedge clk); wr_en <= 0; end if (!full) $error("TEST 2 FAIL: full flag did not assert after %0d writes", DEPTH); @(posedge clk); wr_en <= 1; wr_data <= 8'hFF; // overflow attempt @(posedge clk); wr_en <= 0; repeat(DEPTH) begin @(posedge clk); rd_en <= 1; @(posedge clk); rd_en <= 0; if (rd_data === 8'hFF) $error("TEST 2 FAIL: overflow data 0xFF entered the FIFO"); end if (!empty) $error("TEST 2 FAIL: FIFO not empty after draining %0d entries", DEPTH); $display("TEST 2 PASS: overflow correctly blocked"); $finish; end endmodule`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Yönlendirilmiş Doğrulama (Directed Verification) Metodolojisi",
      initialCode: `module tb_fifo; parameter DATA_W = 8; parameter DEPTH = 4; logic clk, rst_n; logic wr_en, rd_en; logic [DATA_W-1:0] wr_data, rd_data; logic full, empty; sync_fifo #(.DATA_W(DATA_W), .DEPTH(DEPTH)) u_fifo ( .clk(clk), .rst_n(rst_n), .wr_en(wr_en), .wr_data(wr_data), .rd_en(rd_en), .rd_data(rd_data), .full(full), .empty(empty) ); initial clk = 0; always #5 clk = ~clk; initial begin wr_en = 0; rd_en = 0; wr_data = 0; // -- TEST 1: Reset (designer sanity check) -- // After reset deasserts, FIFO must report empty and not full. rst_n = 0; repeat(2) @(posedge clk); rst_n = 1; @(posedge clk); if (!empty) $error("TEST 1 FAIL: expected empty after reset"); if ( full) $error("TEST 1 FAIL: full must not assert after reset"); $display("TEST 1 PASS: reset behaviour correct"); // -- TEST 2: Overflow blocked (VE corner-case directed test) -- // Fill the FIFO to capacity, then attempt one extra write. // The DUT must discard it; draining must yield only DEPTH entries. repeat(DEPTH) begin @(posedge clk); wr_en <= 1; wr_data <= wr_data + 1; @(posedge clk); wr_en <= 0; end if (!full) $error("TEST 2 FAIL: full flag did not assert after %0d writes", DEPTH); @(posedge clk); wr_en <= 1; wr_data <= 8'hFF; // overflow attempt @(posedge clk); wr_en <= 0; repeat(DEPTH) begin @(posedge clk); rd_en <= 1; @(posedge clk); rd_en <= 0; if (rd_data === 8'hFF) $error("TEST 2 FAIL: overflow data 0xFF entered the FIFO"); end if (!empty) $error("TEST 2 FAIL: FIFO not empty after draining %0d entries", DEPTH); $display("TEST 2 PASS: overflow correctly blocked"); $finish; end endmodule`,
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
      question: "Yarı iletken endüstrisinde yönlendirilmiş testlerin (directed testing) en güçlü olduğu ve vazgeçilmez kabul edildiği kullanım senaryosu aşağıdakilerden hangisidir?",
      options: ["RTL kodunun ilk tesliminde temel fonksiyonların çalıştığını kanıtlayan duman testleri (smoke tests) ve rastgele simülasyonların ulaşamadığı spesifik kapsama boşluklarını kapatmak", "Tasarımın tüm durum uzayını eksiksiz olarak tüketmek", "Doğrulama mühendisinin spesifikasyonu hiç okumadan doğrudan testbench geliştirmesini sağlamak", "SystemVerilog kısıt çözücüsünün (constraint solver) performansını optimize etmek"],
      correctIndex: 0,
      explanation: "Yönlendirilmiş testler deterministik ve hızlıdır; RTL'in ilk tesliminde temel işlevlerin çalıştığını teyit eden duman testlerinde (smoke tests) ve rastgele testlerin istatistiksel olarak denk gelemediği son %1-2'lik zor kapsama boşluklarını (coverage holes) doğrudan hedeflemede vazgeçilmez bir araçtır.",
    },
  },
  "constraint-random-verification": {
    id: "constraint-random-verification",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Kısıtlı Rastgele Doğrulama (CRV - Constraint-Random Verification)",
    subtitle: "SystemVerilog kısıt çözücüsü (constraint solver), rastgele tohumlama (seed), işlem modelleme ve öngörülmeyen donanım hatalarını yakalama sanatı.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde modern entegre devre doğrulamanın temel taşı olan Kısıtlı Rastgele Doğrulama (\`Constraint-Random Verification - CRV\`) metodolojisini inceleyeceksiniz:

- Saf rastgeleliğin (\`$random\`) neden yetersiz kaldığı ve kısıtların (\`constraints\`) rolü
- SystemVerilog Kısıt Çözücüsü (\`Constraint Solver\`) ve arka plandaki matematiksel mantık
- Rastgele Tohum (\`Seed\`) mekanizması ve deterministik simülasyon tekrarlanabilirliği
- İşlem (\`Transaction\`) modelleme: \`rand\` ve \`randc\` değişkenleri
- Satır içi kısıtlar (\`randomize() with\`) ve dinamik kısıt kontrolü
- CRV'nin güçlü olduğu alanlar, tökezlediği durumlar ve sık yapılan modelleme hataları.`,
      },
      {
        title: "2. Neden Saf Rastgelelik Yetersizdir? Kısıtların Önemi",
        content: `Geleneksel Verilog'daki \`$random\` fonksiyonu kısıtsız, ham sayılar üretir. Ancak modern donanım protokolleri son derece katı kurallara tabidir.

Örneğin bir PCIe veya AXI paketini kısıtsız rastgele değerlerle sürerseniz:
- Paket uzunluğu geçersiz bir sayı olabilir.
- Adres ayrılmış (reserved) veya yasak bir bölgeye düşebilir.
- Veri genişliği arayüz hizalamasını bozabilir.

Sonuç olarak donanım ilk saat döngüsünde protokol hatası verir ve kilitlenir. Çipin iç mantığına asla ulaşılamaz!

**CRV'nin Çözümü:** Uyarıcıları sadece yasal (veya kontrollü biçimde illegal) protokol kuralları içinde tutmak, ancak bu yasal alanın içindeki tüm parametreleri (paket boyu, gecikme, veri, adres) rastgele kombinasyonlarla sınamaktır.`,
      },
      {
        title: "3. SystemVerilog Sınıflarında İşlem Modellemesi ve Kısıtlar",
        content: `CRV ortamında donanım trafiği nesne yönelimli sınıflar halinde modellenir. \`rand\` anahtar kelimesi rastgeleleştirilecek alanları, \`constraint\` blokları ise kuralları tanımlar:

\`\`\`systemverilog
class axi_trans;
  rand bit [31:0] addr;
  rand bit [7:0]  len;
  rand bit [2:0]  size;
  rand bit [1:0]  burst;
  rand bit [31:0] data[];

  // Kural 1: Adres 4-bayt hizalı olmalıdır
  constraint c_aligned_addr { addr[1:0] == 2'b00; }

  // Kural 2: Burst uzunluğu 1 ile 16 transfer arasında olmalıdır
  constraint c_len { len inside {[1:16]}; }

  // Kural 3: Veri dinamik dizisinin boyutu burst uzunluğuna eşit olmalıdır
  constraint c_data_size { data.size() == len; }

  // Kural 4: INCR burst tipi %80, WRAP %15, FIXED %5 olasılıkla seçilsin
  constraint c_burst_dist {
    burst dist { 2'b01 := 80, 2'b10 := 15, 2'b00 := 5 };
  }
endclass
\`\`\`

Simülatörün kısıt çözücüsü bu kuralların tamamını aynı anda sağlayan rastgele bir çözüm kümesi bulur.`,
      },
      {
        title: "4. Tohum (Seed) Mekanizması ve Hata Tekrarlanabilirliği",
        content: `CRV'deki rastgelelik 'sözde-rastgele'dir (pseudo-random). Her simülasyon bir tohum (seed) değeri ile başlatılır.

- **Aynı Tohum = Aynı Davranış:** Simülatöre aynı tohum argümanı (örneğin \`+ntb_random_seed=892341\`) verildiğinde, simülasyon mikrosaniyesine kadar aynı rastgele sayı dizisini üretir.
- **Gecelik Regresyon Stratejisi:** Gecelik testlerde binlerce işlemci çekirdeğinde aynı test, binlerce farklı tohumla koşturulur (\`Multi-seed regression\`). Böylece her çalıştırmada donanımın farklı bir köşe durumu sınanır.
- **Hata Ayıklama (Debug):** Regresyonda 4.000 testten sadece biri hata verirse, log dosyasındaki tohum numarası alınır. Mühendis yerel terminalinde bu tohumla simülasyonu başlatır ve hatayı %100 kesinlikle yeniden üretip dalga formunu inceler.`,
      },
      {
        title: "5. Satır İçi Kısıtlar (Inline Constraints): randomize() with",
        content: `Temel sınıftaki genel kuralları bozmadan belirli bir test senaryosuna özgü kısıtlar eklemek için \`randomize() with\` yapısı kullanılır:

\`\`\`systemverilog
axi_trans tx = new();

// Sadece bu test için adresi kritik bir tampon bölgesine zorla
if (!tx.randomize() with { addr inside {[32'h0000_1000 : 32'h0000_1FFF]}; len == 16; }) begin
  $fatal("Kisit cozulemedi! Celiski var.");
end
\`\`\`

**Kısıt Çatışması (Constraint Contradiction):** Eğer sınıf içindeki bir kısıt ile \`with\` bloğundaki kısıt birbiriyle çelişirse (örneğin sınıf \`len < 10\` derken test \`len == 16\` isterse) çözücü kilitlenir ve derleme/koşum hatası verir.`,
      },
      {
        title: "6. CRV'nin Güçlü Yönleri, Sınırları ve Yaygın Hatalar",
        content: `CRV'nin sunduğu en büyük avantaj insan aklının öngöremeyeceği kombinasyonları ortaya çıkarmasıdır. Örneğin 'Tam FIFO dolarken eşzamanlı okuma gelmesi ve aradaki 3. saatte reset sinyalinin tetiklenmesi' gibi senaryoları CRV hızla keşfeder.

**CRV'nin Zorlandığı Durumlar:**
- Çok derin sıralı durumlar: 20 adımlık katı bir başlatma protokolünü çözücünün şansa bulması trilyonlarca döngü alabilir.

**En Yaygın Modelleme Hatası:** Kısıtları gereğinden fazla daraltmak (\`over-constraining\`). Mühendis istemeden kuralları o kadar daraltır ki test ortamı fiilen tek bir yönlendirilmiş teste dönüşür ve rastgeleliğin hata bulma gücü yok olur.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Kısıtlı Rastgele Doğrulama (CRV - Constraint-Random Verification)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "constraint-random-verification.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// Transaction class for a simple memory interface class mem_transaction; // --- Randomized fields --- rand bit write; // 1 = write, 0 = read rand bit [31:0] addr; // byte address rand bit [31:0] wdata; // write data (ignored for reads) rand bit [3:0] byte_en; // byte enable: which bytes are active // --- Constraint: address must be word-aligned (bits [1:0] always 0) --- constraint c_align { addr[1:0] == 2'b00; } // --- Constraint: address must be within the mapped region --- constraint c_addr_range { addr inside {[32'h0000_0000 : 32'h0000_FFFF]}; } // --- Constraint: byte enables must have at least one active byte --- constraint c_byte_en { byte_en != 4'b0000; } // --- Constraint: for reads, byte enables must be all-ones (full-word read) --- // This is a conditional constraint: only active when write == 0 constraint c_read_be { if (!write) byte_en == 4'b1111; } endclass`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Kısıtlı Rastgele Doğrulama (CRV - Constraint-Random Verification)",
      initialCode: `// Transaction class for a simple memory interface class mem_transaction; // --- Randomized fields --- rand bit write; // 1 = write, 0 = read rand bit [31:0] addr; // byte address rand bit [31:0] wdata; // write data (ignored for reads) rand bit [3:0] byte_en; // byte enable: which bytes are active // --- Constraint: address must be word-aligned (bits [1:0] always 0) --- constraint c_align { addr[1:0] == 2'b00; } // --- Constraint: address must be within the mapped region --- constraint c_addr_range { addr inside {[32'h0000_0000 : 32'h0000_FFFF]}; } // --- Constraint: byte enables must have at least one active byte --- constraint c_byte_en { byte_en != 4'b0000; } // --- Constraint: for reads, byte enables must be all-ones (full-word read) --- // This is a conditional constraint: only active when write == 0 constraint c_read_be { if (!write) byte_en == 4'b1111; } endclass`,
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
      question: "SystemVerilog tabanlı Kısıtlı Rastgele Doğrulama (CRV) ortamında, regresyonda rastgele bir tohumla (seed) yakalanan kritik bir donanım hatasının hata ayıklama (debug) aşamasında en büyük avantajı nedir?",
      options: ["Rastgele tohum (seed) sözde-rastgele bir sayı ürettiğinden, simülatöre aynı tohum argümanı verildiğinde tam olarak aynı rastgele işlem dizilimi yeniden üretilir ve hata deterministik olarak tekrarlanır.", "Tohum kullanıldığında simülasyon otomatik olarak RTL'deki hatayı kendisi onarır.", "Tohum değeri donanımın saat frekansını artırarak simülasyon süresini sıfırlar.", "Kısıt çözücüsü tohum sayesinde kod kapsaması (code coverage) ölçümüne ihtiyaç duymaz."],
      correctIndex: 0,
      explanation: "Sözde-rastgele sayı üreteçleri aynı tohum (seed) değeri ile başlatıldığında her zaman aynı deterministik sayı dizisini üretir. Bu sayede gecelik rastgele regresyonda yakalanan karmaşık bir hata, simülatöre aynı tohum argümanı verilerek yerel ortamda %100 kesinlikle tekrar canlandırılabilir ve dalga formunda incelenebilir.",
    },
  },
  "assertion-based-verification": {
    id: "assertion-based-verification",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Önsav Tabanlı Doğrulama (ABV - Assertion-Based Verification) ve SVA",
    subtitle: "SystemVerilog Assertions (SVA) ile protokol ve arayüz denetimi, anlık (immediate) ve eşzamanlı (concurrent) önsavlar, assert/assume/cover semantiği.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `

![SystemVerilog Assertions Hierarchical Structure](/images/verification/assertion-sva-property.svg)

Bu bölümde donanım tasarım ve doğrulama süreçlerinin en etkili kalite kontrol aracı olan Önsav Tabanlı Doğrulama (\`Assertion-Based Verification - ABV\`) disiplinini inceleyeceksiniz:

- ABV felsefesi: Hatanın kaynağına en yakın noktada, sıfır gecikmeyle yakalanması
- Anlık Önsavlar (\`Immediate Assertions\`) ve Eşzamanlı Önsavlar (\`Concurrent Assertions\`) arasındaki farklar
- Üç temel SVA direktifi: \`assert\`, \`assume\` ve \`cover\` semantiği
- Eşzamanlı SVA yapıları: Dizilimler (\`sequence\`), özellikler (\`property\`) ve çıkarım operatörleri (\`|->\`, \`|=>\`)
- ABV'nin Simülasyon ve Formal Doğrulamadaki birleşik gücü
- En sık yapılan ABV hataları: Sıfırlama (\`rst_n\`) kontrolünün unutulması ve yarış durumları.`,
      },
      {
        title: "2. ABV Nedir? Çıkış Kontrolünden İç Mantık Gözlemine Geçiş",
        content: `Klasik testbench yaklaşımları sadece doğrulanacak tasarımın (DUT) dış pinlerini izler (Black-box testing). Bu yaklaşımın ciddi bir kusuru vardır:

Eğer tasarımın derinliklerindeki bir durum makinesinde bir mantık hatası oluşursa, bu hatanın dış pinlere yansıması yüzlerce saat döngüsü alabilir veya veri yolundaki başka bir maskeleme yüzünden dışarıya hiç yansımayabilir!

**ABV Çözümü (White-box Verification):**
Önsavlar, tasarımın içindeki modüllere ve protokol arayüzlerine doğrudan yerleştirilen mantıksal bekçilerdir. Tasarımın asla çiğnememesi gereken bir kural tanımlanır. Kural ihlal edildiği anda, tam o saat vuruşunda simülasyon hata verir (\`Zero-cycle latency error detection\`).`,
      },
      {
        title: "3. Anlık (Immediate) vs Eşzamanlı (Concurrent) Önsavlar",
        content: `SystemVerilog iki farklı önsav kategorisi sunar:

- **Anlık Önsavlar (Immediate Assertions):** Prosedürel bloklar (\`always_comb\`, \`always_ff\`, fonksiyonlar) içinde bir \`if\` ifadesi gibi değerlendirilir. Simülasyon o kod satırına ulaştığı anda ifadenin doğru olup olmadığına bakar:
\`\`\`systemverilog
always_comb begin
  if (enable)
    assert (data_in != 8'h00) else $error("data_in sifir olamaz!");
end
\`\`\`
- **Eşzamanlı Önsavlar (Concurrent Assertions):** Zaman ve saat döngüleri boyunca çalışan, çoklu döngü ilişkilerini izleyen yapılardır. Simülasyonun geri kalanıyla paralel (eşzamanlı) çalışır ve saat kenarlarında örneklenir (\`sampled value\`).`,
      },
      {
        title: "4. Temel Direktifler: assert, assume ve cover",
        content: `SVA aynı sözdizimini kullanan üç temel direktif sunar:

1. **\`assert property\` (Tasarım Bu Kurala Uymak Zorundadır):** Tasarımın asla çiğnememesi gereken kuralı tanımlar. Simülasyonda veya formal analizde ihlal edilirse RTL hatasıdır.
2. **\`assume property\` (Ortam Bu Kısıta Uymak Zorundadır):** Tasarımın girişlerini süren çevreye konulan kısıttır. Formal doğrulamada çözücünün arama uzayını sınırlar ('Girişteki reset sinyali en az 2 döngü aktif kalacaktır'). Simülasyonda genellikle bir assert gibi davranır.
3. **\`cover property\` (Bu Senaryo Gerçekleşti mi?):** Kapsama takibidir. Tasarımın belirli bir protokol dizilimini en az bir kez yaşayıp yaşamadığını ölçer.`,
      },
      {
        title: "5. Pratik SVA Operatörleri ve Protokol Doğrulama Örneği",
        content: `Eşzamanlı önsavlarda iki temel çıkarım operatörü (implication operators) kullanılır:
- \`|->\` (Overlapping): Öncül (antecedent) doğruysa, sonuç (consequent) AYNI saat döngüsünde kontrol edilir.
- \`|=>\` (Non-overlapping): Öncül doğruysa, sonuç BİR SONRAKİ saat döngüsünde kontrol edilir.

Örnek AXI Protokol Kuralı: *'Eğer \`valid\` yükselmiş ve \`ready\` gelmemişse, bir sonraki döngüde \`valid\` 1 kalmalı ve veri (\`data\`) değişmemelidir:'*

\`\`\`systemverilog
property p_axi_data_stable;
  @(posedge clk) disable iff (!rst_n)
  (valid && !ready) |=> (valid && $stable(data));
endproperty

assert property (p_axi_data_stable)
  else $error("AXI Protokol Ihlali: ready gelmeden data degistirildi!");
\`\`\``,
      },
      {
        title: "6. Yaygın Hatalar ve En İyi Pratikler",
        content: `ABV uygularken en kritik hatalar şunlardır:

- **\`disable iff (!rst_n)\` İfadesini Unutmak:** Eğer önsava sıfırlama (reset) filtresi koymazsanız, çip reset anındayken geçersiz sinyaller yüzünden yüzlerce sahte hata alarmı (\`false failure\`) fırlar.
- **Boş Tetiklenmeler (Vacuous Success):** Bir önsavın öncülü hiç gerçekleşmezse önsav teknik olarak 'başarılı' sayılır (\`vacuously true\`). Bu durum sahte bir güven hissi yaratabilir; bu nedenle kritik önsavlara mutlaka eşlik eden bir \`cover property\` yazılmalıdır.
- **\`bind\` Mekanizması:** Önsavları RTL kaynak kodunun içine gömmek yerine, ayrı bir doğrulama modülünde yazıp \`bind\` komutuyla RTL örneğine dışarıdan bağlamak temiz bir mimari sağlar.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Önsav Tabanlı Doğrulama (ABV - Assertion-Based Verification) ve SVA** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "assertion-based-verification.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `always @(posedge clk) begin // Immediate assertion: check that grant is never high when request is low. // Evaluated at every rising clock edge, just like the surrounding logic. assert (!(gnt && !req)) else $error("Grant asserted without a request at time %0t", $time); end`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Önsav Tabanlı Doğrulama (ABV - Assertion-Based Verification) ve SVA",
      initialCode: `always @(posedge clk) begin // Immediate assertion: check that grant is never high when request is low. // Evaluated at every rising clock edge, just like the surrounding logic. assert (!(gnt && !req)) else $error("Grant asserted without a request at time %0t", $time); end`,
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
      question: "SystemVerilog Assertions (SVA) ile yazılan bir eşzamanlı önsavda (concurrent assertion) `disable iff (!rst_n)` ifadesinin kullanılmasının temel mühendislik amacı nedir?",
      options: ["Donanım sıfırlama (reset) durumundayken sinyallerin geçersiz veya tanımsız olmasından kaynaklanabilecek sahte hata bildirimlerini (false positives) engellemek", "Simülasyonun saat sinyalini durdurarak güç tüketimini sıfıra indirmek", "Önsavı yalnızca simülasyon bittikten sonra değerlendirmek", "SVA kodunu sentezlenebilir RTL koduna dönüştürmek"],
      correctIndex: 0,
      explanation: "Reset anında donanım sinyalleri geçici, tanımsız veya değişken durumdadır. `disable iff (!rst_n)` ifadesi, sıfırlama sinyali aktif olduğu sürece önsav denetimini devre dışı bırakır; böylece reset sırasında oluşabilecek sahte hata alarmları (false failures) engellenmiş olur.",
    },
  },
  "formal-verification": {
    id: "formal-verification",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Matematiksel Formal Doğrulama (Formal Verification) Temelleri",
    subtitle: "Durum uzayı keşfi, Bounded Model Checking (BMC), tam matematiksel kanıt (full proof), protokol kontrolörleri ve simülasyonun yetersiz kaldığı durumlar.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde mantıksal simülasyona ihtiyaç duymadan tasarımları matematiksel olarak ispatlayan Formal Doğrulama (\`Formal Verification\`) metodolojisini inceleyeceksiniz:

- Formal doğrulamanın matematiksel çalışma prensibi: Uyarıcı yok, testbench yok!
- Bounded Model Checking (\`BMC - Sınırlı Model Denetimi\`) ile Tam Matematiksel Kanıt (\`Full Proof\`) arasındaki farklar
- Durum Uzayı Patlaması (\`State Space Explosion\`) problemi ve donanım sınırları
- Formal doğrulamanın simülasyona kıyasla rakipsiz olduğu alanlar (Arbitrasyon, Güvenlik, Arayüz Uyumu)
- Formal doğrulama sürecinde yapılan en tehlikeli hata: Aşırı kısıtlama (\`Over-constraining\`)
- Tasarım akışında formal doğrulamanın konumu ve simülasyonla sinerjisi.`,
      },
      {
        title: "2. Formal Doğrulama Nasıl Çalışır? Matematiksel Modelleme",
        content: `Klasik bir simülatör belirli girdiler verir ve belirli çıkışları gözlemler. Formal araç ise bambaşka bir yaklaşımla çalışır:

RTL kodunu ve yazılmış olan kuralları (SVA önsavları) devasa bir Boolean mantık denklemine dönüştürür. Gelişmiş SAT/SMT matematiksel çözücüler şu soruyu sorar:

*"Bu tasarımda yazılmış olan önsavı (assertion) ihlal edebilecek tek bir girdi kombinasyonu veya durum geçiş yolu var mıdır?"*

- **Eğer bir ihlal yolu varsa:** Araç, hatanın tam olarak kaç saat döngüsünde ve hangi girdi sinyalleriyle tetiklendiğini gösteren kesin bir **Karşıt Örnek (\`Counterexample - CEX\`)** dalga formu üretir.
- **Eğer hiçbir ihlal yolu yoksa:** Özelliğin matematiksel olarak **KANITLANDIĞI (\`Proven\`)** ilan edilir.`,
      },
      {
        title: "3. Bounded Model Checking (BMC) vs Tam Matematiksel Kanıt (Full Proof)",
        content: `Formal doğrulama araçları iki farklı modda çalışır:

- **Bounded Model Checking (BMC):** Özelliğin sıfırlama (reset) anından itibaren belirli bir döngü derinliğine kadar (örneğin $k=30$ saat döngüsü) geçerli olduğunu ispatlar. Eğer araç 30 döngü boyunca bir karşıt örnek bulamazsa özellik '30 döngü için güvenli' der; ancak 31. döngüde bir hata olma olasılığını dışlayamaz.
- **Tam Matematiksel Kanıt (Full Proof / Unbounded):** Matematiksel tümevarım ($k$-induction) veya durum erişilebilirlik algoritmaları kullanarak, tasarımın ulaşabileceği tüm durumlarda bu özelliğin sonsuza kadar ihlal edilemeyeceğini kanıtlar. Bu, ulaşılabilecek en yüksek doğrulama güvencesidir.`,
      },
      {
        title: "4. Durum Uzayı Patlaması (State Space Explosion) Problemi",
        content: `Formal doğrulamanın en büyük engeli durum uzayının üstel büyümesidir.

Sayısal bir devrede $N$ adet flip-flop (yazmaç) varsa, devrenin potansiyel durum sayısı $2^N$'dir:
- 10 flip-flop = 1.024 durum (çözücü mikrosaniyede çözer)
- 64 flip-flop = $1.84 \\times 10^{19}$ durum
- 1.000 flip-flop = $2^{1000}$ durum (evrendeki atom sayısından katrilyonlarca kat fazla!)

Bu nedenle tüm bir SoC'yi doğrudan formal araca vermek çözücünün hafızasını tüketir ve kilitlenmesine yol açar (\`tool blow-up\`). Başarılı bir formal doğrulama, tasarımı küçük odaklanmış bloklara bölmeyi ve gereksiz veri yollarını soyutlamayı (black-boxing) gerektirir.`,
      },
      {
        title: "5. Formal Doğrulamanın Yıldızlaştığı Alanlar",
        content: `Formal doğrulama aşağıdaki alanlarda simülasyondan kat kat üstündür:

1. **Hakemlik Mantığı (Arbiter / Mutual Exclusion):** İki farklı isteğin aynı anda onay (\`grant\`) almayacağının ve hiçbir isteğin sonsuza kadar aç bırakılmayacağının (\`starvation-free\`) ispatı.
2. **Protokol Denetimi:** AXI, APB, PCIe gibi standart veri yollarının tüm protokol kurallarını eksiksiz sağladığının kanıtlanması.
3. **Sıfırlama (Reset) Analizi:** Çipin reset anından sonra tüm dahili yazmaçlarının doğru başlangıç değerlerine ulaştığının teyidi.
4. **Donanım Güvenliği (Security Properties):** Bir şifreleme anahtarının (cryptographic key) hiçbir koşulda harici bir debug portuna sızmayacağının matematiksel garantisi.
5. **Kontrol Mantığı ve FSM Kilitlenmeleri:** Durum makinelerinde hiçbir kilitlenme (deadlock) durumu olmadığını ispatlamak.`,
      },
      {
        title: "6. Formal Doğrulamada En Tehlikeli Hata: Aşırı Kısıtlama (Over-Constraining)",
        content: `Formal doğrulamada girdileri sınırlamak için \`assume property\` direktifleri kullanılır.

Eğer bir mühendis giriş kısıtlarını gerçekte var olmayan kurallarla aşırı daraltırsa:
- Formal araç bu daraltılmış alanda hiçbir hata bulamaz ve gururla **PROVEN** (Kanıtlandı) raporu verir.
- Ancak gerçek donanımda o yasaklanan durum oluşabilir ve çip sahada kilitlenir!

Buna sektörde **Aşırı Kısıtlama (Over-Constraining)** denir ve formal doğrulamadaki en tehlikeli sahte güvenlik hissidir. Kural: \`assume\` ifadeleri yalnızca arayüzün mutlak elektriksel ve protokol kısıtlarını modellemelidir.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Matematiksel Formal Doğrulama (Formal Verification) Temelleri** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "formal-verification.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// Mutual exclusion: no two grants ever simultaneously asserted assert property (@(posedge clk) disable iff (!rst_n) $onehot0(gnt)); // at most one bit of gnt is high at any time // Liveness: a request must be served within 8 cycles assert property (@(posedge clk) disable iff (!rst_n) req[0] |-> ##[1:8] gnt[0]);`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Matematiksel Formal Doğrulama (Formal Verification) Temelleri",
      initialCode: `// Mutual exclusion: no two grants ever simultaneously asserted assert property (@(posedge clk) disable iff (!rst_n) $onehot0(gnt)); // at most one bit of gnt is high at any time // Liveness: a request must be served within 8 cycles assert property (@(posedge clk) disable iff (!rst_n) req[0] |-> ##[1:8] gnt[0]);`,
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
      question: "Matematiksel formal doğrulama (Formal Verification) sürecinde bir mühendisin girdi arayüzüne yazdığı `assume` kısıtlarını gereğinden fazla daraltmasının (over-constraining) doğuracağı en tehlikeli sonuç nedir?",
      options: ["Formal aracın gerçekte var olan kritik bir donanım hatasını arama uzayı dışında bırakarak hatalı bir şekilde 'Kanıtlandı' (Proven) raporu vermesi (sahte güvenlik hissi)", "Simülasyon süresinin logaritmik olarak artması", "RTL kodunun derleyicide sentaks hatası vermesi", "Çipteki saat sinyalinin faz kaymasına uğraması"],
      correctIndex: 0,
      explanation: "Girdi kısıtları (`assume`) gereğinden fazla daraltıldığında (over-constraining), formal çözücü tasarımın gerçek dünyada karşılaşabileceği yasal durumları arama uzayından çıkarır. Sonuç olarak gerçekte var olan bir hata arama dışında kaldığı için araç hatalı şekilde özelliğin kanıtlandığını ('Proven') raporlar ve tehlikeli bir sahte güvenlik hissi doğurur.",
    },
  },
  "coverage-driven-verification": {
    id: "coverage-driven-verification",
    badge: "Modül 1 • Doğrulama Temelleri (Fundamentals of Verification)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Kapsama Güdümlü Doğrulama (CDV - Coverage-Driven Verification)",
    subtitle: "Kod kapsaması (code coverage) ve işlevsel kapsama (functional coverage) metrikleri, covergroup/coverpoint yapıları ve tape-out kapanış (closure) döngüsü.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `

![Coverage-Driven Verification Closed Loop Architecture](/images/verification/crv-coverage-loop.svg)

Bu bölümde modern entegre devre doğrulama metodolojilerinin yönetim omurgası olan Kapsama Güdümlü Doğrulama (\`Coverage-Driven Verification - CDV\`) disiplinini inceleyeceksiniz:

- CDV metodolojisinin felsefesi: 'Neyi doğrulamak istiyoruz ve ne kadarını doğruladık?'
- Kod Kapsaması (\`Code Coverage\`) türleri: Satır, Dal, Koşul, Geçiş ve FSM kapsaması
- İşlevsel Kapsama (\`Functional Coverage\`): \`covergroup\`, \`coverpoint\`, \`bins\` ve \`cross coverage\`
- CDV Kapanış Döngüsü (\`Coverage Closure Loop\`): vPlan'den %100 kapsama hedefine giden yol
- Kapsama Boşlukları (\`Coverage Holes\`) analizi ve hedefli test stratejisi
- Feragatname (\`Waiver / Exclusion\`) yönetimi ve Tape-out Sign-off kriterleri.`,
      },
      {
        title: "2. Kapsama Güdümlü Doğrulama (CDV) Nedir?",
        content: `Eski nesil doğrulama süreçlerinde 'Yazdığımız 50 testin hepsi geçti, demek ki çip hazır' anlayışı hakimdi. Bu yaklaşım son derece tehlikelidir çünkü o 50 test tasarımın sadece %30'luk bir kısmını sınıyor olabilir; geri kalan %70 hiç uyarılmamış olabilir!

**CDV Yaklaşımı:**
Doğrulamanın ilerleyişini test sayısıyla veya hislerle değil, doğrudan toplanan kapsama verileriyle (coverage metrics) ölçer. Simülasyonun amacı yalnızca testin geçmesi değil, önceden tanımlanmış işlevsel kapsama hedeflerinin (bins) vurulmasıdır.

CDV olmadan yürütülen rastgele testler karanlıkta rastgele ateş etmeye benzer; CDV ise hedefin neresinin vurulduğunu ve neresinin açık kaldığını aydınlatan radardır.`,
      },
      {
        title: "3. Kod Kapsaması (Code Coverage) ve Türleri",
        content: `Kod kapsaması, simülatör tarafından RTL koduna otomatik olarak eklenen sayaçlarla ölçülür. Mühendisin özel bir kod yazmasına gerek yoktur:

- **Satır Kapsaması (Line/Statement):** Yazılan RTL kod satırlarının yüzde kaçı simülasyonda en az bir kez çalıştı?
- **Dal Kapsaması (Branch):** \`if-else\` ve \`case\` yapılarındaki tüm alternatif kollar (true/false) ziyaret edildi mi?
- **Koşul Kapsaması (Condition/Expression):** Bileşik mantık ifadelerindeki (örneğin \`A && B || C\`) her bir girişin çıkışı değiştirdiği durumlar görüldü mü?
- **Geçiş Kapsaması (Toggle):** Tasarımdaki her bir bit hem \`0 -> 1\` hem de \`1 -> 0\` geçişi yaptı mı? (Sürekli 0 veya 1'de takılı kalan sinyalleri yakalar).
- **Durum Makinesi Kapsaması (FSM):** FSM içindeki tüm durumlar ve durumlar arasındaki tüm yasal geçişler gerçekleşti mi?

*Önemli Not:* %100 Kod Kapsaması kodun koşturulduğunu gösterir, ancak beklenen doğru sonucu ürettiğini kanıtlamaz!`,
      },
      {
        title: "4. İşlevsel Kapsama (Functional Coverage) ve SystemVerilog Modelleri",
        content: `İşlevsel kapsama, doğrudan mimari spesifikasyonun gereksinimlerini modeller. Tasarımın amaçlanan işlevlerinin gerçekten gerçekleşip gerçekleşmediğini ölçer:

\`\`\`systemverilog
covergroup cg_packet @(posedge clk);
  // Paket uzunluğu dağılımı
  cp_len: coverpoint pkt_len {
    bins short_pkt  = {[1:10]};
    bins medium_pkt = {[11:50]};
    bins jumbo_pkt  = {[51:1500]};
  }

  // Çalışma modları
  cp_mode: coverpoint op_mode {
    bins read_mode  = {2'b00};
    bins write_mode = {2'b01};
    bins burst_mode = {2'b10};
  }

  // Çapraz Kapsama (Cross Coverage):
  // 'Tüm modlarda tüm paket boyları denendi mi?'
  cx_len_x_mode: cross cp_len, cp_mode;
endgroup
\`\`\`

Bu model sayesinde simülasyonun yalnızca kısa paketleri değil, tüm modlarda jumbo paketleri de deneyip denemediği nesnel olarak izlenir.`,
      },
      {
        title: "5. Kapsama Kapanış Döngüsü (Coverage Closure Loop)",
        content: `CDV metodolojisi yinelemeli bir döngü halinde işletilir:

1. **Rastgele Regresyonlar:** Geniş kısıtlı rastgele testler (\`CRV\`) farklı tohumlarla koşturulur. Kapsama hızla %0'dan %75-85 seviyelerine çıkar.
2. **Kapsama Birleştirme (Coverage Merge):** Tüm testlerden gelen kapsama veritabanları tek bir birleşik veritabanında toplanır.
3. **Boşluk Analizi (Coverage Hole Analysis):** Hangi \`bins\` veya kod dalları vurulamadı? Neden vurulamadı?
4. **Hedefli İyileştirme:** Eğer boşluk kısıtların aşırı dar olmasından kaynaklanıyorsa kısıtlar gevşetilir. Eğer istatistiksel olarak denk gelmesi zor bir köşe durumsa, hedefe yönelik özel bir test (\`directed test\`) yazılır.
5. **Kapanış:** Kapsama %100'e ulaşana kadar döngü tekrarlanır.`,
      },
      {
        title: "6. Feragatname (Waiver) Disiplini ve Tapeout İmzası",
        content: `Bazı durumlarda kod kapsaması fiziksel olarak %100 olamaz. Örneğin:
- Parametre ile pasif bırakılmış bir modül kolu
- Donanım güvenliği için konulmuş ama normal modda asla ulaşılamayan \`default\` koruma dalları
- Kullanılmayan harici arayüz bitleri.

Bu ulaşılamayan noktalar keyfi olarak göz ardı edilemez! Her biri için resmi bir **Feragatname (\`Coverage Waiver / Exclusion\`)** belgesi oluşturulur ve teknik gerekçesi yazılır.

**Tapeout Sign-Off Kriteri:**
- %100 İşlevsel Kapsama (\`vPlan\` maddelerinin tamamı)
- %100 Kod Kapsaması (Onaylanmış feragatnameler dahil)
- Son regresyonda sıfır hata!`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Kapsama Güdümlü Doğrulama (CDV - Coverage-Driven Verification)",
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
      question: "Bir çip doğrulama projesinde simülatörün raporladığı Kod Kapsaması (Code Coverage) oranının %100 olması neden tek başına çipin hatasız olduğunu ve dökümhaneye gönderilebileceğini kanıtlamaz?",
      options: ["Kod kapsaması yalnızca yazılmış olan RTL kodunun satırlarının ve dallarının çalıştırıldığını gösterir; spesifikasyonda unutulmuş bir özelliğin veya tasarıma hiç eklenmemiş eksik mantığın varlığını tespit edemez.", "Kod kapsaması sadece analog devrelerde geçerli bir metriktir.", "Kod kapsaması %100 olduğunda testbench'teki skorboard (scoreboard) otomatik olarak devre dışı kalır.", "SystemVerilog dili kod kapsaması ölçülürken assertion'ları dikkate almaz."],
      correctIndex: 0,
      explanation: "Kod kapsaması (Code Coverage) yalnızca mevcut RTL kodunun çalışıp çalışmadığını ölçer. Eğer mimari spesifikasyonda yer alan kritik bir özellik RTL tasarımcısı tarafından tamamen unutulmuşsa, ortada o özelliğe ait bir RTL kodu bulunmadığı için kod kapsaması %100 görünebilir ancak çip eksik ve hatalı kalır. Bu açığı kapatmak için doğrudan spesifikasyon hedeflerini ölçen İşlevsel Kapsama (Functional Coverage) şarttır.",
    },
  },
  "verification-plan": {
    id: "verification-plan",
    badge: "Modül 2 • Doğrulama Planlaması (Verification Planning)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Doğrulama Planı (Verification Plan - vPlan) Mimarisi ve Yönetimi",
    subtitle: "Spesifikasyondan test senaryolarına ve kapsama hedeflerine köprü kuran kapsamlı vPlan hazırlama, izlenebilirlik ve sign-off kriterleri.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde donanım doğrulama projelerinin en kritik yönetim ve yürütme belgesi olan Doğrulama Planı (\`Verification Plan - vPlan\`) mimarisini öğreneceksiniz:

- Bir \`vPlan\` belgesinin neden ilk RTL satırından önce, mimari spesifikasyonla birlikte yazılması gerektiği
- Endüstri standardı bir \`vPlan\` dokümanının temel bileşenleri ve hiyerarşik yapısı
- Spesifikasyondan doğrulanabilir gereksinimlerin çıkarılması ve İzlenebilirlik Matrisi (\`Traceability Matrix\`)
- Test planı, kapsama planı ve formal doğrulama hedeflerinin entegrasyonu
- Çok paydaşlı plan gözden geçirme süreci (\`Plan Review Process\`)
- Doğrulama planlamasında yapılan ölümcül hatalar ve kapanış (\`sign-off\`) yönetimi.`,
      },
      {
        title: "2. Neden Önce Doğrulama Planı? Plansız Doğrulamanın Felaketi",
        content: `Plansız doğrulama yapmak, rotası ve hedefi olmadan açık denize açılmaya benzer. Mühendisler yüzlerce test yazabilir, haftalarca simülasyon koşturabilir; ancak hangi özelliklerin test edildiği, hangi köşe durumların atlandığı ve tasarımın üretime hazır olup olmadığı asla bilinemez.

**vPlan'in Temel Rolü:**
Doğrulama Planı (\`vPlan\`), sistem mimarları, tasarımcılar ve doğrulama mühendisleri arasındaki resmi bir sözleşmedir (\`contract\`).
- Mimarideki 'Bu FIFO 64 derinlikte olmalı ve doluyken yazmaya çalışıldığında taşma hatası vermelidir' cümlesi, \`vPlan\` içinde somut bir test ID'sine, bir \`SVA\` önsavına ve bir \`covergroup\` hedefine dönüşür.
- Bu disiplin, doğrulama ekibinin tasarımı tasarımcının zihnindeki varsayımlara göre değil, yazılı nesnel şartnameye göre tarafsızca sınamasını garanti eder.`,
      },
      {
        title: "3. Endüstri Standardı Bir vPlan'in Bileşenleri",
        content: `Kapsamlı bir \`vPlan\` şu 7 ana bölümden oluşur:

1. **Tasarım Genel Bakışı ve Kapsam (Scope):** Bloğun işlevi, harici arayüzleri, saat/reset mimarisi ve doğrulama sınırları (neler dahil, neler hariç).
2. **Doğrulanacak Özellikler Listesi (Features):** Blok işlevlerinin tekil ve hiyerarşik kimliklerle (\`FEAT_01\`, \`FEAT_02\`) sınıflandırılması.
3. **Doğrulama Metodolojisi ve Ortam:** Testbench mimarisi (UVM), yeniden kullanılacak VIP'ler, formal doğrulama ve emülasyon gereksinimleri.
4. **Test Senaryoları Matrisi (Test Matrix):** Duman testleri, yönlendirilmiş testler, kısıtlı rastgele testler (\`CRV\`) ve hata enjeksiyon senaryoları.
5. **Kapsama Planı (Coverage Plan):** Hangi özelliklerin hangi \`covergroup\` ve \`coverpoint\` yapılarıyla takip edileceğinin haritası.
6. **Kapanış ve İmza Kriterleri (Sign-off Criteria):** %100 regresyon geçişi, %100 işlevsel ve kod kapsaması, sıfır açık hata şartı.
7. **Kaynak ve Takvim Tahmini:** İhtiyaç duyulan EDA lisansları, sunucu çekirdeği sayısı ve adam-ay iş gücü planı.`,
      },
      {
        title: "4. İzlenebilirlik (Traceability): Spesifikasyondan Kapsama Veritabanına",
        content: `Modern EDA platformlarında (Cadence vManager, Synopsys Verdi Planner, Siemens Questa Verification IQ) \`vPlan\` statik bir Word belgesi olarak kalmaz; doğrudan simülasyon araçlarına entegre bir elektronik veri tabanıdır.

**İzlenebilirlik Zinciri:**
$$\\text{Spesifikasyon Cümlesi} \\longrightarrow \\text{vPlan Maddesi} \\longrightarrow \\text{Test/Önsav} \\longrightarrow \\text{Kapsama Veritabanı}$$

Regresyon koştuğunda araç toplanan işlevsel kapsama verilerini doğrudan \`vPlan\` maddeleriyle eşleştirir. Canlı gösterge panelinde her bir gereksinim yeşil (tamamlandı), sarı (kısmen test edildi) veya kırmızı (hiç test edilmedi) olarak raporlanır. Böylece projenin ilerleyişi matematiksel bir şeffaflıkla izlenir.`,
      },
      {
        title: "5. vPlan Gözden Geçirme Süreci (Plan Review)",
        content: `\`vPlan\` asla tek bir mühendisin kendi başına yazıp rafa kaldırdığı bir döküman olamaz. Resmi bir gözden geçirme toplantısı (\`Formal Review\`) düzenlenir:

- **Katılımcılar:** Sistem Mimarı, RTL Tasarımcısı, DV Lideri ve Post-Silicon Sağlama Mühendisi.
- **Hedefler:**
  * Şartnamenin eksik veya yanlış yorumlanıp yorumlanmadığı denetlenir.
  * RTL tasarımcısının mikro-mimariyi kurarken fark ettiği gizli köşe durumlar plana eklenir.
  * Post-silicon mühendisi laboratuvar kartında test edilmesi zor olacak noktaların simülasyonda mutlaka kapsanmasını talep eder.
- Bu toplantı sonucunda onaylanan plan, projenin 'Anayasası' haline gelir.`,
      },
      {
        title: "6. Doğrulama Planlamasında En Yaygın Hatalar",
        content: `Planlama aşamasında yapılan hatalar projenin sonunda haftalarca süren gecikmelere yol açar:

- **Yalnızca 'Mutlu Yol' (Happy Path) Planlamak:** Şartnamedeki örnek senaryoları yazıp, protokol ihlallerini, geçersiz adresleri ve zaman aşımlarını plana dahil etmemek.
- **Muğlak Kapanış Kriterleri Koymak:** 'Yeterince test koşulacak' gibi soyut hedefler yerine '%100 Functional Coverage, sıfır açık hata, 1.000 tohumluk temiz gecelik regresyon' gibi ölçülebilir hedefler konulmalıdır.
- **Planı Statik Sanmak:** Tasarım geliştikçe ve şartname değiştikçe \`vPlan\`'i güncellemeyi unutmak. Şartname her revize edildiğinde \`vPlan\` de eşzamanlı olarak revize edilmelidir.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Doğrulama Planı (Verification Plan - vPlan) Mimarisi ve Yönetimi** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "verification-plan.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// ===================================================================== // Vplan Entry Example (documented as a comment for illustration) // Block: UART Transmitter // ===================================================================== // // Feature ID : TX-04 // Feature : Parity Generation // Spec Ref : Section 3.2.1 // Description: Transmitter shall append a parity bit after the data // frame. Parity mode (even/odd/none) is configured via // the PARITY_CFG register field [1:0]. // // Verification Scenarios: // TX-04-A : Even parity — verify parity bit is 0 when data has // even number of 1s, and 1 when odd number of 1s. // TX-04-B : Odd parity — verify inverse of even parity behavior. // TX-04-C : No parity — verify no extra bit is transmitted and // frame length matches 8-bit expectation. // TX-04-D : Switch parity mode mid-stream — verify reconfiguration // takes effect on the next frame boundary, not mid-frame. // // Test Type : Constrained random (TX-04-A/B), Directed (TX-04-C/D) // Coverage : Coverpoint on PARITY_CFG[1:0] x data[7:0] cross // Pass Criteria: Scoreboard compares captured serial output against // reference parity model for each transmitted byte. // Priority : High // Effort : 1.5 days`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Doğrulama Planı (Verification Plan - vPlan) Mimarisi ve Yönetimi",
      initialCode: `// ===================================================================== // Vplan Entry Example (documented as a comment for illustration) // Block: UART Transmitter // ===================================================================== // // Feature ID : TX-04 // Feature : Parity Generation // Spec Ref : Section 3.2.1 // Description: Transmitter shall append a parity bit after the data // frame. Parity mode (even/odd/none) is configured via // the PARITY_CFG register field [1:0]. // // Verification Scenarios: // TX-04-A : Even parity — verify parity bit is 0 when data has // even number of 1s, and 1 when odd number of 1s. // TX-04-B : Odd parity — verify inverse of even parity behavior. // TX-04-C : No parity — verify no extra bit is transmitted and // frame length matches 8-bit expectation. // TX-04-D : Switch parity mode mid-stream — verify reconfiguration // takes effect on the next frame boundary, not mid-frame. // // Test Type : Constrained random (TX-04-A/B), Directed (TX-04-C/D) // Coverage : Coverpoint on PARITY_CFG[1:0] x data[7:0] cross // Pass Criteria: Scoreboard compares captured serial output against // reference parity model for each transmitted byte. // Priority : High // Effort : 1.5 days`,
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
      question: "Bir çip projesinde Doğrulama Planı'nın (vPlan) henüz tek bir satır RTL kodu yazılmadan önce mimari spesifikasyon üzerinden hazırlanmasının en temel mühendislik gerekçesi nedir?",
      options: ["Doğrulama mühendisinin tasarım spesifikasyonundaki belirsizlikleri ve çelişkileri erken aşamada ortaya çıkarması, test hedeflerini tasarımcının uygulama detaylarından bağımsız olarak objektif biçimde belirlemesi", "EDA simülasyon araçlarının lisans ücretlerini düşürmek", "RTL tasarımcısının kod yazma zorunluluğunu ortadan kaldırmak", "Sentez araçlarının otomatik olarak vPlan üzerinden donanım netlist'i üretmesini sağlamak"],
      correctIndex: 0,
      explanation: "Doğrulama planı (vPlan) henüz RTL yazılmadan hazırlandığında iki büyük fayda sağlar: Birincisi, spesifikasyondaki belirsizlik ve çelişkiler erkenden fark edilir. İkincisi, test hedefleri tasarımcının kodlama tercihlerinden tamamen bağımsız olarak doğrudan sistem mimarisinin gereksinimlerine göre tarafsız biçimde tanımlanır.",
    },
  },
  "identifying-features-corner-cases": {
    id: "identifying-features-corner-cases",
    badge: "Modül 2 • Doğrulama Planlaması (Verification Planning)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Özelliklerin ve Uç Durumların (Corner Cases) Belirlenmesi",
    subtitle: "Spesifikasyon analizinden fonksiyonel özelliklerin, arayüz protokollerinin, sınır koşullarının ve eşzamanlı olayların sistematik çıkarımı.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde bir donanım spesifikasyon belgesini şüpheci bir doğrulama mühendisi gözüyle analiz etme ve gizli tuzakları açığa çıkarma metodolojisini öğreneceksiniz:

- Spesifikasyondan doğrulanabilir özellikleri sistematik olarak çıkarma teknikleri
- Fonksiyonel özelliklerin 4 ana kategorisi: Temel İşlev, Arayüz Protokolleri, Hata Yönetimi, Yapılandırma Modları
- Uç durumların (\`Corner Cases\`) anatomisi: Neden standart testlerde ortaya çıkmazlar?
- Sınır Koşulları (\`Boundary Conditions\`), Arka Arkaya İşlemler (\`Back-to-Back\`) ve Eşzamanlı Olaylar (\`Simultaneous Events\`)
- Karar Tabloları (\`Decision Tables\`) ve Durum Geçiş Analizi ile köşe durum keşfi
- Risk temelli önceliklendirme matrisi.`,
      },
      {
        title: "2. Spesifikasyon Okuma Disiplini: 'Shall' İfadelerinden Gizli Durumlara",
        content: `Bir şartname belgesinde geçen her 'yapmalıdır' (\`shall / must\`) ifadesi açık bir gereksinimdir. Ancak en tehlikeli donanım hataları şartnamede açıkça YAZILMAMIŞ olan boşluklarda saklanır.

Örnek:
*Şartname:* 'Girişteki \`valid\` pini 1 olduğunda, çıkış verisi bir sonraki saat döngüsünde hazır olur.'

*Şüpheci DV Mühendisinin Soruları:*
- \`valid\` 1 iken reset gelirse ne olur?
- \`valid\` arka arkaya 50 döngü boyunca 1 kalırsa ardışık düzen (pipeline) tıkanır mı?
- \`valid\` yükselip alıcı henüz \`ready\` vermeden \`valid\` aniden 0'a çekilirse donanım veriyi yutar mı?

İşte bu sorular standart işlevlerin ötesindeki uç durumları (corner cases) ortaya çıkarır.`,
      },
      {
        title: "3. Özellikleri Kategorize Etme",
        content: `Çıkarılan özellikler 4 ana sütunda yapılandırılmalıdır:

1. **Temel Fonksiyonel Davranış:** Veri aritmetiği, şifreleme, adres kod çözümü ve ana veri yolu akışları.
2. **Arayüz Protokolleri:** \`valid\`/\`ready\` el sıkışmaları, AXI/APB bus kuralları, paket başlığı ve kuyruk mekanizmaları.
3. **Hata Yönetimi (Error Handling):** Geçersiz adres erişimleri, parite/ECC hataları, tampon taşması (\`overflow\`) veya boşken okuma (\`underflow\`). Bu kategori en az test edilen ama sahada en çok felakete yol açan alandır!
4. **Yapılandırma ve Çalışma Modları:** Kontrol yazmaçlarıyla (CSR) değiştirilen modlar (örneğin 8-bit vs 32-bit modu, kesme maskeleri, güç tasarruf modları).`,
      },
      {
        title: "4. Uç Durumlar (Corner Cases) Nerede Gizlenir?",
        content: `Donanım hatalarının %80'i şu üç kritik bölgede kümelenir:

- **Sınır Koşulları (Boundary Conditions):** Sayacın maksimum değerden sıfıra dönmesi (\`0xFF -> 0x00\`), FIFO derinliğinin tam 0, 1, MAX-1 ve MAX olduğu anlar, bellek adres uzayının ilk ve son baytları.
- **Arka Arkaya İşlemler (Back-to-Back Transactions):** Araya hiçbir boş döngü (idle cycle) koymadan gönderilen kesintisiz işlem fırtınası. Bu durum ardışık düzendeki boru hattı tıkanıklıklarını ve bayrak gecikmelerini anında patlatır.
- **Eşzamanlı Olaylar (Simultaneous Events):** Donanım doğası gereği paraleldir! Aynı saat vuruşunda FIFO'ya hem yazma hem okuma isteği gelmesi; tam bir işlem ortasındayken asenkron reset tetiklenmesi veya aynı anda iki farklı çekirdeğin aynı hafıza satırını istemesi.`,
      },
      {
        title: "5. Sistematik Keşif Araçları: Karar Tabloları ve FSM Analizi",
        content: `Uç durumları şansa bırakmamak için analitik araçlar kullanılır:

- **Karar Tabloları (Decision Tables):** Çoklu kontrol sinyallerinin tüm olası permütasyonları tabloya dökülür:

| Yazma İsteği (\`wr_en\`) | Okuma İsteği (\`rd_en\`) | FIFO Durumu | Beklenen Çıkış |
| :---: | :---: | :---: | :--- |
| 1 | 0 | Dolu (\`Full\`) | Hata bayrağı, veri yazılmaz |
| 0 | 1 | Boş (\`Empty\`) | Hata bayrağı, geçersiz veri |
| 1 | 1 | Dolu (\`Full\`) | Yazma reddedilir, okuma gerçekleşir (veya eşzamanlı aktarım) |
| 1 | 1 | Boş (\`Empty\`) | Yazma gerçekleşir, okuma bayrağı yönetilir |

- **FSM Geçiş Matrisi:** Durum makinesindeki tüm durumlardan tüm diğer durumlara geçiş yolları, kural dışı durumlardan kurtarma (recovery) mekanizmaları taranır.`,
      },
      {
        title: "6. Risk Temelli Önceliklendirme ve Yaygın Hatalar",
        content: `Doğrulama süresi ve bütçesi sonsuz değildir. Hangi uç durumlara öncelik verileceğine bir risk matrisi ile karar verilir:

$$\\text{Risk Skoru} = \\text{Hata Olasılığı (Tasarım Karmaşıklığı)} \\times \\text{Hatanın Etkisi (Kritiklik)}$$

- **Kritik Hata:** Güvenlik açığı yaratabilecek veya tüm sistemi kilitleyecek (deadlock) senaryolar en yüksek risk puanına sahiptir ve ilk doğrulanmalıdır.
- **Yaygın Hata:** Şartnamedeki parlak ve kolay örnek senaryoları günlerce test edip, hata enjeksiyonlarını ve asenkron olayları 'vakit kalırsa bakarız' diyerek ertelemek.`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Özelliklerin ve Uç Durumların (Corner Cases) Belirlenmesi",
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
      question: "Senkron bir FIFO (First-In First-Out) tampon devresinde donanım uç durumlarını (corner cases) doğrulamak isteyen bir mühendisin testbench'te öncelikle hedeflemesi gereken en kritik senaryo kombinasyonu hangisidir?",
      options: ["FIFO tamamen doluyken aynı saat vuruşunda eşzamanlı olarak hem yazma (write) hem okuma (read) isteği göndermek ve FIFO boşken arka arkaya (back-to-back) okuma denemesi yapmak", "FIFO'ya dakikada yalnızca bir kez veri yazıp çıktıyı dalga formunda elle gözlemlemek", "Simülasyonu saatsiz (clock-less) olarak çalıştırmak", "FIFO'nun veri genişliğini tek bir bite indirgemek"],
      correctIndex: 0,
      explanation: "Eşzamanlı olaylar (aynı anda hem okuma hem yazma yapılması) ve sınır koşulları (tamamen doluyken veya boşken işlem zorlanması), FIFO kontrol mantığındaki bayrak üretim devrelerinde ve işaretçi (pointer) hesaplamalarında en sık hata veren kritik uç durumlardır (corner cases).",
    },
  },
  "pass-fail-criteria-scoreboards": {
    id: "pass-fail-criteria-scoreboards",
    badge: "Modül 2 • Doğrulama Planlaması (Verification Planning)",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Geçti/Kaldı Kriterleri, Skorboard (Scoreboard) ve Referans Modeller",
    subtitle: "Çıkış doğruluğu, önsav kontrolleri, zaman aşımı yönetimi, transaction-level scoreboard mimarisi ve Golden Reference Model entegrasyonu.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `

![Self-Checking Testbench: Scoreboard & Golden Reference Model](/images/verification/scoreboard-golden-model.svg)

Bu bölümde bir testin gerçekten başarılı sayılıp sayılmadığına karar veren mekanizmaları ve testbench'in kalbi olan Skorboard (\`Scoreboard\`) mimarisini inceleyeceksiniz:

- Bir testin başarılı (\`PASS\`) sayılması için zorunlu olan 3 bağımsız kriter
- Skorboard nedir? Testbench hiyerarşisindeki yeri ve tarafsız hakem rolü
- Skorboard'un 3 aşamalı veri akışı: Girdiyi yakalama, referans modelle hesaplama, çıktıyı denetleme
- Referans Modeller (\`Golden Models\`): Davranışsal, işlem düzeyinde (TLM) ve döngü hassas (cycle-accurate) modeller
- Yanlış alarmlar (\`False Failures\`), testbench hataları ve erken aşama getirme (\`bring-up\`) sorunları
- Doğrulama planında geçti/kaldı kriterlerinin belgelenmesi.`,
      },
      {
        title: "2. Bir Test Ne Zaman Başarılı Sayılır? Üç Altın Kriter",
        content: `Yalnızca 'simülasyon bir hata fırlatmadan bitti' demek testin geçtiğini göstermez. Gerçek bir PASS için 3 kriterin üçü de AYNI ANDA sağlanmalıdır:

1. **Çıkış Doğruluğu (Output Correctness):** Donanımın ürettiği her veri paketi, referans modelin beklediği değerle bit düzeyinde uyuşmalıdır.
2. **Sıfır Önsav İhlali (Zero Assertion Failures):** Simülasyon boyunca hiçbir \`SVA\` protokol kuralı, zamanlama ihlali veya arayüz kısıtı tetiklenmemiş olmalıdır.
3. **Zaman Aşımı Yokluğu (No Timeouts / Liveness):** Donanım kilitlenmemiş (\`hang/deadlock\`), tüm işlemleri makul bir simülasyon süresi içinde tamamlamış olmalıdır.

Bu üç şarttan biri bile aksarsa test başarısızdır (\`FAIL\`).`,
      },
      {
        title: "3. Skorboard Mimarisi ve 3 Aşamalı Veri Akışı",
        content: `Skorboard, DUT'nin dış dünyadan bağımsız tarafsız yargıcıdır. Tipik bir SystemVerilog/UVM skorboard'unda veri akışı şu 3 aşamada işler:

\`\`\`
[Giriş Monitörü] ---> (Girdi İşlemi) ---> [SKORBOARD: Referans Model] ---> [Beklenen Kuyruk]
                                                                                |
                                                                                v (Karşılaştır)
[Çıkış Monitörü] ---> (Çıktı İşlemi) ----------------------------------> [Uyuşmazlık? $error]
\`\`\`

1. **Aşama 1 (Girdi Dinleme):** Giriş monitörü DUT pinlerine sürülen işlemi yakalar ve skorboard'a iletir.
2. **Aşama 2 (Referans Hesaplama):** Skorboard bu girdiyi bir altın modele (Golden Model) vererek beklenen sonucu hesaplar ve beklenenler kuyruğuna (\`expected queue\`) ekler.
3. **Aşama 3 (Karşılaştırma):** Çıkış monitörü DUT'nin ürettiği gerçek sonucu yakalar. Skorboard beklenenler kuyruğundan ilgili veriyi çeker (\`pop_front\`) ve bit-bit karşılaştırır. En ufak bir uyumsuzlukta \`$error\` basar.`,
      },
      {
        title: "4. Referans Model Türleri (Golden Models)",
        content: `Skorboard içindeki altın modelin karmaşıklığı doğrulanacak tasarıma göre seçilir:

- **Davranışsal Modeller (Behavioral):** Tasarımın algoritmasını yüksek seviyeli dille modeller (örneğin SystemVerilog'da \`expected_sum = a + b\`). Donanımın iç ardışık düzenini modellemez; sadece ne yapması gerektiğini bilir.
- **İşlem Düzeyinde Modeller (Transaction-Level - TLM):** C/C++ veya Python ile yazılmış, genellikle mimari ekibin sağladığı algoritma kütüphaneleridir. SystemVerilog'a \`DPI-C\` (Direct Programming Interface) üzerinden bağlanır.
- **Döngü Hassas Modeller (Cycle-Accurate):** Çıktının sadece doğruluğunu değil, tam olarak hangi saat döngüsünde üretileceğini de birebir hesaplayan karmaşık modellerdir.`,
      },
      {
        title: "5. Yanlış Alarmlar (False Failures) ve Testbench Hataları",
        content: `Skorboard bir uyumsuzluk bildirdiğinde hata her zaman RTL kodunda olmayabilir!

- **Testbench Hataları:** Referans modeldeki matematiksel bir hata, monitörün veriyi saat kenarından önce veya sonra yanlış örneklemesi ya da kuyruk sıralamasındaki bir karmaşa testbench'in sahte bir hata üretmesine (\`False Failure\`) yol açar.
- **Erken Aşama (Bring-up) Gerçekleri:** RTL geliştirilirken bazı modüller henüz tamamlanmamış olabilir. Skorboard'un bilinen bu eksik özellikleri geçici olarak maskeleyebilecek esnek konfigürasyon anahtarlarına sahip olması gerekir.`,
      },
      {
        title: "6. Yaygın Hatalar ve En İyi Pratikler",
        content: `Skorboard geliştirirken en sık yapılan kritik hatalar:

- **Hata 1: Skorboard Yazmak Yerine Ekrana \`$display\` Basmak:** Konsola binlerce satır çıktı yazdırıp insanın dalga formuna bakmasını ummak gecelik regresyon otomasyonunu imkânsız kılar.
- **Hata 2: Simülasyon Sonunda Kalan Verileri Kontrol Etmemek:** Test bittiğinde beklenenler kuyruğunda eleman kalmışsa (\`exp_q.size() != 0\`), bu durum DUT'nin kendisine gönderilen bir işlemi yuttuğunu veya kilitlendiğini gösterir! \`check_phase\` aşamasında bu kontrol mutlaka yapılmalıdır.
- **Hata 3: Sırasız (Out-of-Order) Veri Yollarında Düz Kuyruk Kullanmak:** Eğer tasarım işlemleri geliş sırasından bağımsız işliyorsa (örneğin AXI reordering), basit bir FIFO kuyruğu yerine etiket (\`ID / Tag\`) tabanlı ilişkisel diziler (\`associative arrays\`) kullanılmalıdır.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Geçti/Kaldı Kriterleri, Skorboard (Scoreboard) ve Referans Modeller** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "pass-fail-criteria-scoreboards.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// Simple scoreboard for an 8-bit adder DUT // Inputs: operand_a, operand_b, carry_in // Outputs: sum, carry_out class adder_scoreboard; // Queue to hold expected results until the DUT output arrives // Each entry is {expected_sum, expected_carry_out} logic [8:0] expected_q[$]; // 9 bits: 8-bit sum + carry_out // Called by the input monitor each time a new transaction is applied function void predict( input logic [7:0] operand_a, input logic [7:0] operand_b, input logic carry_in ); logic [8:0] result; // Reference model: simple addition result = operand_a + operand_b + carry_in; // Push expected result into the queue in transaction order expected_q.push_back(result); endfunction // Called by the output monitor each time the DUT drives a result function void check( input logic [7:0] actual_sum, input logic actual_carry_out ); logic [8:0] expected; logic [8:0] actual; // Make sure we have something to compare against if (expected_q.size() == 0) begin $error("SCOREBOARD: DUT produced output with no pending expected result"); return; end expected = expected_q.pop_front(); actual = {actual_carry_out, actual_sum}; if (actual !== expected) begin $error("SCOREBOARD MISMATCH: expected 0x%0h, got 0x%0h", expected, actual); end endfunction // Called at end of test — any remaining entries are missing DUT responses function void final_check(); if (expected_q.size() != 0) $error("SCOREBOARD: %0d expected results never received from DUT", expected_q.size()); endfunction endclass`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Geçti/Kaldı Kriterleri, Skorboard (Scoreboard) ve Referans Modeller",
      initialCode: `// Simple scoreboard for an 8-bit adder DUT // Inputs: operand_a, operand_b, carry_in // Outputs: sum, carry_out class adder_scoreboard; // Queue to hold expected results until the DUT output arrives // Each entry is {expected_sum, expected_carry_out} logic [8:0] expected_q[$]; // 9 bits: 8-bit sum + carry_out // Called by the input monitor each time a new transaction is applied function void predict( input logic [7:0] operand_a, input logic [7:0] operand_b, input logic carry_in ); logic [8:0] result; // Reference model: simple addition result = operand_a + operand_b + carry_in; // Push expected result into the queue in transaction order expected_q.push_back(result); endfunction // Called by the output monitor each time the DUT drives a result function void check( input logic [7:0] actual_sum, input logic actual_carry_out ); logic [8:0] expected; logic [8:0] actual; // Make sure we have something to compare against if (expected_q.size() == 0) begin $error("SCOREBOARD: DUT produced output with no pending expected result"); return; end expected = expected_q.pop_front(); actual = {actual_carry_out, actual_sum}; if (actual !== expected) begin $error("SCOREBOARD MISMATCH: expected 0x%0h, got 0x%0h", expected, actual); end endfunction // Called at end of test — any remaining entries are missing DUT responses function void final_check(); if (expected_q.size() != 0) $error("SCOREBOARD: %0d expected results never received from DUT", expected_q.size()); endfunction endclass`,
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
      question: "Bir UVM skorboard (scoreboard) bileşeninde simülasyon tamamlandığında (check_phase aşamasında) beklenen veri kuyruğunda (expected queue) eleman kalmış olması neyi gösterir?",
      options: ["DUT'nin (Device Under Test) kendisine gönderilen bazı işlemleri hiç üretmediğini, veriyi yuttuğunu veya donanımın kilitlenerek işlemi tamamlayamadığını", "Simülasyonun başarıyla %100 kapsama ile tamamlandığını", "Referans modelin donanımdan daha yavaş çalıştığını", "Sentez aracının netlist dosyasını başarıyla oluşturduğunu"],
      correctIndex: 0,
      explanation: "Skorboard'da beklenenler kuyruğu, giriş monitöründen gelen verilere göre üretilen beklenen çıktıları saklar. Eğer simülasyon bittiğinde kuyrukta hâlâ eleman kalmışsa, DUT bu işlemleri üretmemiş, içeride düşürmüş (yutmuş) veya kilitlenip dışarı basamamıştır; bu durum kesin bir test başarısızlığıdır (FAIL).",
    },
  },
  "testbench-evolution": {
    id: "testbench-evolution",
    badge: "Modül 3 • Testbench Mimari Evrimi (Testbench Architecture)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Testbench Mimarilerinin Evrimi: Lineer Koddan UVM'e 6 Nesil",
    subtitle: "Basit lineer testbench'lerden dosya tabanlı, FSM tabanlı, rastgele ve kendi kendini denetleyen (self-checking) yapılardan modern UVM'e tarihsel gelişim.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde donanım doğrulama ortamlarının 1980'lerden günümüze geçirdiği 6 nesillik büyük mimari evrimi inceleyeceksiniz:

- Testbench mimarisinin tarihsel gelişim çizgisi ve her neslin çözdüğü temel mühendislik problemi
- Nesil 1: Lineer Testbench (Sıralı uyarıcılar ve manuel dalga formu incelemesi)
- Nesil 2: Dosya Tabanlı Testbench (Vektörlerin koddan ayrılması, \`$readmemh\`)
- Nesil 3: Durum Makinesi Tabanlı Testbench (Protokol bilinci ve el sıkışma FSM'leri)
- Nesil 4: Lineer Rastgele Testbench (\`$random\` ile ilk rastgele testler)
- Nesil 5: Kendi Kendini Denetleyen Testbench (Self-Checking, referans modeller ve regresyon)
- Nesil 6: UVM (Universal Verification Methodology - Standart, nesne yönelimli, modüler çatı)
- Projenizin ölçeğine en uygun testbench mimarisini seçme kriterleri.`,
      },
      {
        title: "2. Nesil 1 & 2: Lineer ve Dosya Tabanlı Testbench'ler",
        content: `Doğrulamanın ilk adımları tamamen manuel ve basitti:

- **Nesil 1 — Lineer Testbench:** Tek bir \`initial\` bloğu içinde \`#10 a=1; b=2; #10 a=3;\` şeklinde alt alta yazılan en ilkel testbench. Çıktı denetimi yoktur; mühendis simülasyon bittikten sonra dalga formunu (waveform) açar ve sinyal geçişlerine tek tek gözüyle bakar. 10 testten fazlası yönetilemez.
- **Nesil 2 — Dosya Tabanlı Testbench:** Giriş vektörlerini testbench kaynak kodundan ayırma fikri doğdu. Test verileri harici metin/hex dosyalarına yazıldı ve Verilog'un \`$readmemh\` fonksiyonu ile belleğe yüklendi. Testbench kodu temizlendi ve test vektörleri yazılım betikleriyle üretilebilir hale geldi, ancak hâlâ protokol bilinci ve otomatik denetim yoktu.`,
      },
      {
        title: "3. Nesil 3 & 4: Protokol Bilinci ve Rastgeleliğe İlk Adım",
        content: `Donanım arayüzleri geliştikçe sabit zaman gecikmeleri (\`#delay\`) yetersiz kalmaya başladı:

- **Nesil 3 — Durum Makinesi Tabanlı (FSM) Testbench:** Arayüzler \`valid\`/\`ready\` gibi el sıkışma protokollerine geçince testbench'in içine de bir FSM yerleştirildi. Testbench artık donanımın yanıtını bekleyen (\`wait for ready\`), protokol durumlarına göre şekil alan akıllı bir yapıya kavuştu.
- **Nesil 4 — Lineer Rastgele Testbench:** Elle yazılan sabit veriler yerine \`$random\` ve \`$urandom\` çağrıları entegre edildi. Mühendislerin hayal edemediği beklenmedik sayı kombinasyonları donanımı zorlamaya başladı; ancak kısıt mekanizması olmadığı için karmaşık protokol kurallarını sağlamak imkânsızdı.`,
      },
      {
        title: "4. Nesil 5: Kendi Kendini Denetleyen Testbench (Self-Checking)",
        content: `Doğrulama tarihindeki en büyük devrimlerden biri Nesil 5 ile yaşandı: **Self-Checking Testbench.**

- Testbench'in içine beklenen sonucu hesaplayan dahili bir referans model ve otomatik denetim yapan karşılaştırıcılar (\`assert\`, \`$error\`) eklendi.
- **Regresyon Otomasyonunun Doğuşu:** İnsanın dalga formuna bakma zorunluluğu ortadan kalktı! Simülatör testi bitirdiğinde konsola tek bir satır yazdı: \`TEST PASSED\` veya \`TEST FAILED\`.
- Bu gelişme sayesinde geceleri binlerce testin sunucu çiftliklerinde insansız olarak (unattended regression) koşturulabilmesinin önü açıldı.`,
      },
      {
        title: "5. Nesil 6: Endüstri Standardı ve UVM Devrimi",
        content: `Nesil 5 harikaydı, ancak ciddi bir kaos doğurdu: Her şirket, hatta her mühendis kendi özel (ad-hoc) testbench mimarisini yazıyordu. Bir projede yazılan testbench başka bir projede kullanılamıyor, üçüncü parti VIP blokları entegre edilemiyordu.

2011 yılında Accellera ve IEEE öncülüğünde **UVM (Universal Verification Methodology - IEEE 1800.2)** doğdu:
- Standart sınıf hiyerarşisi (\`uvm_driver\`, \`uvm_monitor\`, \`uvm_scoreboard\`, \`uvm_agent\`)
- İşlem düzeyinde haberleşme (\`TLM\` portları)
- Fabrika (Factory) deseni ile kod değiştirmeden bileşen ezme (override)
- Faz mekanizması (\`build_phase\`, \`run_phase\`) ile senkronize yönetim.

UVM sayesinde doğrulama ortamları evrensel, taşınabilir ve yeniden kullanılabilir hale geldi.`,
      },
      {
        title: "6. Projeniz İçin Doğru Mimarisi Seçme Kılavuzu",
        content: `Her proje için devasa bir UVM ortamı kurmak mühendislik açısından doğru bir maliyet yönetimi değildir:

| Tasarım Tipi | Önerilen Mimari | Neden? |
| :--- | :--- | :--- |
| Küçük Kombinasyonel Blok (ALU, Mux) | Nesil 1 veya Nesil 5 (Basit Self-checking) | UVM kurma ek yüküne gerek yoktur, birkaç saatte biter. |
| Basit Bellek / Arayüz Bloğu | Nesil 3 (FSM) veya Nesil 5 | Protokolü beklemek ve hızlıca doğrulamak yeterlidir. |
| Karmaşık ASIC/SoC IP Bloğu (PCIe, AXI) | Nesil 6 (UVM) | Kısıtlı rastgelelik, yeniden kullanılabilirlik ve standart VIP şarttır. |
| Çok Çipli Büyük SoC | Nesil 6 (UVM) + Emülasyon | Çoklu protokoller, C/C++ sürücüleri ve milyonlarca işlem. |`,
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Testbench Mimarilerinin Evrimi: Lineer Koddan UVM'e 6 Nesil",
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
      question: "Donanım doğrulama tarihinde 'Kendi Kendini Denetleyen Testbench' (Self-Checking Testbench - 5. Nesil) mimarisinin ortaya çıkması doğrulama mühendisliği iş akışında hangi devrimsel dönüşümü sağlamıştır?",
      options: ["Simülasyon sonuçlarının mühendis tarafından dalga formunda (waveform) elle incelenmesi zorunluluğunu ortadan kaldırarak gecelik binlerce testin insansız regresyon (unattended regression) ile otomatik koşulmasını sağlamıştır.", "Tasarımın sentezlenerek doğrudan FPGA donanımına yüklenmesini sağlamıştır.", "RTL tasarımında donanım saat frekansının sonsuza çıkmasına olanak tanımıştır.", "SystemVerilog dili yerine Python derleyicisinin kullanılmasını zorunlu kılmıştır."],
      correctIndex: 0,
      explanation: "Self-checking testbench'ler çıktıları otomatik olarak beklenen değerlerle karşılaştırıp pass/fail kararı verebildiği için, mühendislerin her simülasyon sonrası dalga formunu elle açıp gözle kontrol etme zorunluluğu bitti. Bu sayede gecelik binlerce testin otomatik koşulduğu insansız regresyon (unattended regression) sistemleri kurulabildi.",
    },
  },
  "linear-testbench": {
    id: "linear-testbench",
    badge: "Modül 3 • Testbench Mimari Evrimi (Testbench Architecture)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Lineer Testbench Mimarisi: İlk Adım Doğrulama Ortamı",
    subtitle: "DUT örneklemesi, saat ve reset üretimi, sıralı uyarıcı (stimulus) sürme ve basit blokların ilkel doğrulanmasındaki rolü.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde donanım doğrulamanın başlangıç noktası olan Lineer Testbench mimarisini tüm yapı taşlarıyla inceleyeceksiniz:

- Lineer bir testbench'in genel anatomisi ve SystemVerilog modül yapısı
- Doğrulanacak Tasarımın (\`DUT - Device Under Test\`) örneklenmesi (instantiation) ve port bağlantıları
- Saat (\`clock\`) ve sıfırlama (\`reset\`) üreteçlerinin doğru kalıpları
- Sıralı uyarıcı sürme, zaman gecikmeleri (\`#delay\`) ve sinyal atamaları
- Konsol log çıktıları (\`$monitor\`, \`$display\`) ve dalga formu incelemesi
- Lineer testbench'in kısıtları, sık yapılan hatalar ve ne zaman kullanılması gerektiği.`,
      },
      {
        title: "2. Lineer Testbench Nedir? Temel Yapı",
        content: `Lineer testbench, donanım doğrulamanın en temel biçimidir. Dış dünyaya açılan hiçbir giriş veya çıkış portu olmayan bağımsız bir SystemVerilog modülüdür (\`module tb; ... endmodule\`).

İçinde şu 4 temel öğeyi barındırır:
1. **DUT Sinyalleri:** DUT'nin girişlerine bağlanacak değişkenler (\`reg\` veya \`logic\`) ve çıkışlarını alacak sinyaller (\`wire\` veya \`logic\`).
2. **DUT Örneklemesi:** Doğrulanacak donanım modülünün isimle veya sırayla bağlanması.
3. **Saat ve Reset Blokları:** Tasarımın ritmini belirleyen osilatör ve sıfırlama döngüleri.
4. **Sıralı Uyarıcı Bloğu (\`initial begin ... end\`):** Zaman içinde sırayla yürütülen test vektörleri.`,
      },
      {
        title: "3. Saat ve Reset Üretimi: Doğru Kalıplar",
        content: `Bir testbench'te saat ve reset sinyalleri şu endüstriyel kalıplarla oluşturulur:

\`\`\`systemverilog
module tb_top;
  logic clk;
  logic rst_n;

  // 100 MHz Saat Üretici (10ns periyot: 5ns düşük, 5ns yüksek)
  initial clk = 0;
  always #5 clk = ~clk;

  // Senkron/Asenkron Sıfırlama Üretici
  initial begin
    rst_n = 1'b0; // Reset aktif
    #25;          // 2.5 saat döngüsü boyunca reset'te tut
    rst_n = 1'b1; // Reset bırakıldı
  end
endmodule
\`\`\`

Saat sinyalinin başlangıçta \`0\` olarak başlatılması ve \`#5\` gecikmeyle terslenmesi yarış durumlarını engeller.`,
      },
      {
        title: "4. Adım Adım Uyarıcı Sürme: 4-bit Toplayıcı Örneği",
        content: `Basit bir 4-bit toplayıcı (\`adder_4bit\`) devresini doğrulayan eksiksiz bir lineer testbench:

\`\`\`systemverilog
\`timescale 1ns/1ps
module tb_adder_4bit;
  logic [3:0] a, b;
  logic [3:0] sum;
  logic       cout;

  // DUT Örneklemesi
  adder_4bit dut (
    .a(a),
    .b(b),
    .sum(sum),
    .cout(cout)
  );

  initial begin
    // Sinyal değişimlerini konsola canlı yazdır
    $monitor("[%0t ns] a=%0d b=%0d | sum=%0d cout=%b", $time, a, b, sum, cout);

    // Senaryo 1: Basit Toplama
    a = 4'd2; b = 4'd3; #10;

    // Senaryo 2: Taşma Sınırı (Overflow)
    a = 4'd15; b = 4'd1; #10;

    // Senaryo 3: Maksimum Girişler
    a = 4'd15; b = 4'd15; #10;

    // Senaryo 4: Sıfır Testi
    a = 4'd0; b = 4'd0; #10;

    $display("Simulasyon tamamlandi.");
    $finish;
  end
endmodule
\`\`\``,
      },
      {
        title: "5. Simülasyon Çıktıları ve Dalga Formu (Waveform)",
        content: `Bu testbench bir simülatörde (örneğin Icarus Verilog, ModelSim, VCS) çalıştırıldığında şu konsol çıktısını üretir:

\`\`\`text
[0 ns]  a=2  b=3  | sum=5  cout=0
[10 ns] a=15 b=1  | sum=0  cout=1
[20 ns] a=15 b=15 | sum=14 cout=1
[30 ns] a=0  b=0  | sum=0  cout=0
Simulasyon tamamlandi.
\`\`\`

Mühendis aynı zamanda simülatörün dalga formu kayıt komutunu (\`$dumpfile("tb.vcd"); $dumpvars(0, tb_adder_4bit);\`) ekleyerek GTKWave veya Verdi üzerinde sinyallerin yükselen ve düşen kenarlarını inceler.`,
      },
      {
        title: "6. Lineer Testbench'in Sınırları ve Yaygın Hatalar",
        content: `Lineer testbench son derece öğreticidir ancak büyük projelerde kullanılamaz:

- **Ölçeklenemezlik:** 100 test senaryosu eklemek yüzlerce satır tekrarlı kod gerektirir.
- **Otomatik Denetim Yoktur:** Sonucun doğru olup olmadığına simülatör değil, konsol çıktısına veya dalga formuna bakan mühendis karar verir.
- **Zamanlama Tuzağı:** Çıkışın oturması için gereken gecikmeyi (\`#delay\`) koymadan hemen bir sonraki girdiyi sürmek.

**Ne Zaman Kullanılmalıdır?** Yeni yazılmış küçük bir bloğun ilk duman testini (smoke test) 10 dakika içinde yapmak ve temel sinyal bağlantılarını görmek için mükemmel bir araçtır.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Lineer Testbench Mimarisi: İlk Adım Doğrulama Ortamı** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "linear-testbench.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// DUT: 4-bit adder // Inputs : a, b (4-bit operands) // cin (carry-in from a previous stage) // Outputs: sum (4-bit result) // cout (carry-out — set when the result exceeds 4 bits) module adder ( input [3:0] a, input [3:0] b, input cin, output [3:0] sum, output cout ); assign {cout, sum} = a + b + cin; endmodule`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Lineer Testbench Mimarisi: İlk Adım Doğrulama Ortamı",
      initialCode: `// DUT: 4-bit adder // Inputs : a, b (4-bit operands) // cin (carry-in from a previous stage) // Outputs: sum (4-bit result) // cout (carry-out — set when the result exceeds 4 bits) module adder ( input [3:0] a, input [3:0] b, input cin, output [3:0] sum, output cout ); assign {cout, sum} = a + b + cin; endmodule`,
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
      question: "Lineer bir testbench ortamında saat (clock) sinyali üretirken `always #5 clk = ~clk;` yazıldığında üretilen saat sinyalinin periyodu ve frekansı nedir? (Timescale: 1ns/1ps varsayımıyla)",
      options: ["Periyot 10ns, frekans 100 MHz", "Periyot 5ns, frekans 200 MHz", "Periyot 20ns, frekans 50 MHz", "Saat sinyali hiç salınmaz, sürekli 0 kalır"],
      correctIndex: 0,
      explanation: "Her `#5` (5ns) gecikmede saat sinyali mantıksal tersine çevrildiğinden, saat sinyali 5ns lojik-0 ve 5ns lojik-1 seviyesinde kalır. Dolayısıyla tam bir periyot $T = 5\\text{ns} + 5\\text{ns} = 10\\text{ns}$ olur. Frekans ise $f = 1 / T = 1 / (10 \\times 10^{-9}\\text{s}) = 100\\text{ MHz}$ olarak hesaplanır.",
    },
  },
  "file-based-testbench": {
    id: "file-based-testbench",
    badge: "Modül 3 • Testbench Mimari Evrimi (Testbench Architecture)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Dosya Tabanlı Testbench (File-Based Testbench) ve Vektör Ayrıştırma",
    subtitle: "Test vektörlerinin testbench kodundan ayrılması, `$readmemh`/`$readmemb` kullanımı, hex/binary veri dosyaları ve sonuç günlüğü oluşturma.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde testbench kaynak kodunu test verilerinden bağımsızlaştıran Dosya Tabanlı Testbench (\`File-Based Testbench\`) mimarisini inceleyeceksiniz:

- Test verisi ile testbench kodunu ayırma felsefesi ve getirdiği esneklik
- Hexadecimal (\`$readmemh\`) ve Binary (\`$readmemb\`) sistem fonksiyonlarının çalışma prensibi
- Testbellek dizisinin (\`memory array\`) boyutlandırılması ve dosya formatı kuralları
- Girdi dosyalarından veri okuma, DUT pinlerine sürme ve çıkışları dosyaya (\`$fdisplay\`) yazma
- Üretilen sonuç dosyasının harici yazılım modelleriyle (\`diff\` analizi) otomatik doğrulanması
- Dosya tabanlı yaklaşımın sınırları ve en yaygın dosya işleme hataları.`,
      },
      {
        title: "2. Veri ve Kodun Ayrılması: Neden Dosya Tabanlı Testbench?",
        content: `Lineer testbench'te yeni bir test senaryosu eklemek için Verilog kaynak kodunu değiştirmek, dosyayı yeniden derlemek ve simülatörü tekrar başlatmak gerekirdi. Bu yaklaşım yüzlerce test içeren projelerde sürdürülemezdir.

**Dosya Tabanlı Testbench Çözümü:**
- Testbench donanım mantığı ve port bağlantıları sabit bir Verilog kodu olarak kalır.
- Girdi uyarıcıları ve beklenen sonuçlar harici metin dosyalarında (\`stimulus.hex\`, \`golden.hex\`) saklanır.
- Python, MATLAB veya C++ ile yazılmış harici yazılım betikleri milyonlarca test vektörü üreterek bu dosyaya yazabilir.
- Yeni testler eklemek için tek satır HDL kodu değiştirmeye gerek kalmaz.`,
      },
      {
        title: "3. $readmemh ve $readmemb Sistem Fonksiyonları",
        content: `Verilog ve SystemVerilog, harici dosyalardan bellek dizilerine veri yüklemek için yerleşik sistem görevleri sunar:

- **\`$readmemh("dosya_adi.hex", bellek_dizisi);\`**
  Onaltılık (Hexadecimal) formatta yazılmış verileri okur. Sayılar arasında boşluk veya alt çizgi (\`_\`) kullanılabilir.
- **\`$readmemb("dosya_adi.bin", bellek_dizisi);\`**
  İkilik (Binary) formatta (\`0\` ve \`1\`) yazılmış ham bit dizilerini okur.

Örnek \`stimulus.hex\` Dosyası:
\`\`\`text
// Format: a (4-bit) ve b (4-bit) toplam 8-bit hex
12  // a=1, b=2
FA  // a=15, b=10
00  // a=0, b=0
FF  // a=15, b=15
\`\`\``,
      },
      {
        title: "4. Testbench Mimarisi: Okuma, Sürme ve Çıkış Günlüğü",
        content: `Dosya tabanlı testbench bellek dizisini tanımlar, dosyayı yükler ve bir döngü içinde verileri sürer:

\`\`\`systemverilog
\`timescale 1ns/1ps
module tb_file_based;
  logic [3:0] a, b;
  logic [3:0] sum;
  logic       cout;
  logic [7:0] stim_mem [0:255]; // 256 satırlık test belleği
  integer out_file;

  adder_4bit dut (.a(a), .b(b), .sum(sum), .cout(cout));

  initial begin
    // 1. Girdi dosyasını oku
    $readmemh("stimulus.hex", stim_mem);
    // 2. Çıktı dosyasını yazma modunda aç
    out_file = $fopen("results.out", "w");

    // 3. Bellekteki vektörleri sırayla sür
    for (int i = 0; i < 256; i++) begin
      {a, b} = stim_mem[i]; // Üst 4-bit 'a', alt 4-bit 'b'
      #10;
      // Sonuçları dosyaya kaydet
      $fdisplay(out_file, "%h %h -> %h %b", a, b, sum, cout);
    end

    // 4. Dosyayı kapat ve simülasyonu bitir
    $fclose(out_file);
    $display("Tum vektorler suruldu.");
    $finish;
  end
endmodule
\`\`\``,
      },
      {
        title: "5. Yazılım Referansı ile Otomatik Karşılaştırma",
        content: `Simülasyon tamamlandığında üretilen \`results.out\` dosyası, aynı girdi vektörlerini işleyen Python referans modelinin çıktısıyla işletim sistemi seviyesinde karşılaştırılabilir:

\`\`\`bash
# Python referans modelini koştur
python3 golden_adder.py stimulus.hex golden.out

# Simülatör çıktısı ile altın referansı karşılaştır
diff -u results.out golden.out
if [ $? -eq 0 ]; then
  echo "*** TEST PASSED: Tum sonuclar eslesiyor ***"
else
  echo "!!! TEST FAILED: Uyumsuzluk tespit edildi !!!"
fi
\`\`\`

Bu yöntem testbench içerisine karmaşık doğrulama mantığı yazmadan, harici araçlarla regresyon yapılmasını sağlar.`,
      },
      {
        title: "6. Sınırlar ve Yaygın Hatalar",
        content: `Dosya tabanlı yaklaşımın zayıf yönleri ve sık yapılan hatalar:

- **Protokol Duyarsızlığı:** Vektörler sabit \`#10\` zaman gecikmeleriyle sürülür. Donanımın meşgul (\`busy\`) veya hazır olmaması durumunda testbench beklemeyi bilmez; statik kalır.
- **Bellek Boyutu Uyuşmazlığı:** \`stim_mem\` dizisinin boyutunu dosyadaki satır sayısından küçük tanımlamak (veri kaybı ve eksik testler).
- **Dosya Kapatmayı Unutmak:** \`$fclose(out_file)\` çağrılmadığında işletim sistemi dosya tamponunu (\`buffer\`) diske yazmayabilir ve \`results.out\` dosyası boş görünebilir.
- **Dosya Yolu Hataları:** Simülatörün çalıştırıldığı dizin ile hex dosyasının bulunduğu dizin farklı olduğunda \`$readmemh\` sessizce boş dönebilir.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Dosya Tabanlı Testbench (File-Based Testbench) ve Vektör Ayrıştırma** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "file-based-testbench.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// DUT: 4-bit adder (unchanged from linear testbench article) module adder ( input [3:0] a, input [3:0] b, input cin, output [3:0] sum, output cout ); assign {cout, sum} = a + b + cin; endmodule`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Dosya Tabanlı Testbench (File-Based Testbench) ve Vektör Ayrıştırma",
      initialCode: `// DUT: 4-bit adder (unchanged from linear testbench article) module adder ( input [3:0] a, input [3:0] b, input cin, output [3:0] sum, output cout ); assign {cout, sum} = a + b + cin; endmodule`,
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
      question: "SystemVerilog'da `$readmemh` sistem görevi kullanılarak harici bir metin dosyasından test uyarıcıları yüklenirken dosya içeriğindeki verilerin sayı tabanı (radix) ne olmalıdır?",
      options: ["Onaltılık (Hexadecimal)", "İkilik (Binary)", "Onluk (Decimal)", "Sekizlik (Octal)"],
      correctIndex: 0,
      explanation: "`$readmemh` fonksiyonunun sonundaki 'h' harfi Onaltılık (Hexadecimal) tabanı temsil eder; dosya içeriğindeki tüm veriler hex olarak yorumlanır. İkilik (binary) tabanda veri yüklemek için ise `$readmemb` ('b' harfi) kullanılır.",
    },
  },
  "state-machine-based-testbench": {
    id: "state-machine-based-testbench",
    badge: "Modül 3 • Testbench Mimari Evrimi (Testbench Architecture)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Durum Makinesi Tabanlı Testbench (FSM-Based Testbench)",
    subtitle: "Protokol el sıkışmaları (handshake), istek/onay akışları ve zamanlama bağımlı arayüzler için FSM tabanlı uyarıcı ve denetleyici mimarisi.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde donanım protokollerinin doğasına uygun, dinamik el sıkışma yapabilen Durum Makinesi Tabanlı Testbench (\`FSM-Based Testbench\`) mimarisini öğreneceksiniz:

- Neden sabit zaman gecikmeli (\`#delay\`) testbench'ler modern arayüz protokollerinde yetersiz kalır?
- Protokol el sıkışmaları (\`Handshake: Valid/Ready, Req/Ack\`) ve bekleme mantığı
- Testbench içinde durum makinesi (FSM) tasarlama ve kodlama teknikleri
- Basit senkron bellek arayüzü üzerinde FSM testbench uygulaması
- FSM tabanlı yaklaşımın avantajları ve çoklu işlem (transaction) desteği
- Durum kilitlenmelerini (\`Deadlock/Hang\`) önlemek için zaman aşımı (\`Watchdog Timer\`) kullanımı.`,
      },
      {
        title: "2. Problem: Bekleme Gerektiren Protokoller",
        content: `Gerçek dünyadaki çipler deterministik sabit gecikmelerle çalışmaz:
- Bir bellek denetleyicisi meşgul olabilir (\`busy\`).
- Bir AXI köprüsü rastgele 1 ila 5 saat döngüsü sonra onay (\`ready\`) verebilir.
- Bir çevre birimi arabelleği dolduğunda istekleri bekletebilir.

Lineer veya dosya tabanlı bir testbench sabit zaman gecikmesi kullandığı için donanım henüz hazır değilken veriyi sürer veya hazır olduğu anı kaçırır.

**Çözüm:** Testbench'in kendisi de bir Durum Makinesine (FSM) sahip olmalıdır! Testbench, donanım \`ready\` veya \`ack\` verene kadar beklemeli, ancak onay geldiğinde bir sonraki duruma geçmelidir.`,
      },
      {
        title: "3. Testbench Durum Makinesinin Mimarisi",
        content: `Testbench FSM'i genellikle sentezlenebilir donanım FSM'lerinden farklı olarak bir \`initial\` bloğu içinde \`while/case\` yapısıyla kurulur:

\`\`\`
  [IDLE] 
    | (Başla)
    v
[WRITE_REQ] ---> (ready=0) ---> [WRITE_WAIT]
                                    |
                                    v (ready=1)
[READ_WAIT] <--- (ready=0) <--- [READ_REQ]
     |
     v (ready=1 & data valid)
  [DONE]
\`\`\`

Her durum bir protokol fazını temsil eder. Durum makinesi giriş sinyallerini örnekler, gerekirse bekler ve işlem onaylandığında sonraki faza ilerler.`,
      },
      {
        title: "4. Kod İncelemesi: El Sıkışmalı Bellek Testbench'i",
        content: `8 konumlu, el sıkışmalı senkron bir bellek için FSM testbench örneği:

\`\`\`systemverilog
module tb_fsm_memory;
  typedef enum logic [2:0] {
    IDLE, WRITE, WRITE_WAIT, READ, READ_WAIT, DONE
  } state_t;

  state_t state = IDLE;
  logic clk = 0, rst_n, wr_en, rd_en, ready;
  logic [2:0] addr;
  logic [7:0] wdata, rdata;

  // Saat ve DUT Örneklemesi
  always #5 clk = ~clk;
  sync_mem dut (.*);

  initial begin
    rst_n = 0; wr_en = 0; rd_en = 0; addr = 0; wdata = 0;
    #20 rst_n = 1;

    while (state != DONE) begin
      @(posedge clk);
      case (state)
        IDLE: begin
          state <= WRITE;
        end
        WRITE: begin
          wr_en <= 1'b1; addr <= 3'd2; wdata <= 8'hA5;
          state <= WRITE_WAIT;
        end
        WRITE_WAIT: begin
          if (ready) begin
            wr_en <= 1'b0;
            state <= READ;
          end
        end
        READ: begin
          rd_en <= 1'b1; addr <= 3'd2;
          state <= READ_WAIT;
        end
        READ_WAIT: begin
          if (ready) begin
            rd_en <= 1'b0;
            if (rdata !== 8'hA5) $error("Veri hatasi: Beklenen 0xA5, Alinan %h", rdata);
            state <= DONE;
          end
        end
      endcase
    end
    $display("Bellek islemleri basariyla tamamlandi.");
    $finish;
  end
endmodule
\`\`\``,
      },
      {
        title: "5. FSM Tabanlı Testbench'in Avantajları",
        content: `FSM tabanlı yaklaşım doğrulama kalitesinde büyük bir sıçrama sağlar:

- **Protokol Uyumluluğu:** Donanım onay vermeden testbench asla ilerlemez. Zamanlama belirsizlikleri ortadan kalkar.
- **Değişken Gecikmelere Dayanıklılık:** Donanım ister 1 döngüde ister 10 döngüde yanıt versin, testbench esnek bir şekilde bekler.
- **Çoklu İşlem Desteği:** Durum makinesi döngüsel hale getirilerek arka arkaya yüzlerce yazma ve okuma transferi (\`burst\`) tek bir düzenli akışta yürütülebilir.`,
      },
      {
        title: "6. Sınırlar ve Kilitlenme (Deadlock) Tuzağı",
        content: `FSM testbench mimarisinin en büyük tehlikesi **Sonsuz Kilitlenmedir (\`Simulation Hang\`):**

- Eğer DUT içinde bir RTL hatası varsa ve donanım \`ready\` sinyalini asla 1 yapmazsa, testbench \`WRITE_WAIT\` durumunda sonsuza kadar bekler!
- Simülasyon saati ilerler ama hiçbir şey olmaz; test asla bitmez.

**Zorunlu Çözüm (Watchdog Timer):**
Her bekleme durumuna bir zaman aşımı sayacı eklenmeli veya bağımsız bir bekçi görevi çalıştırılmalıdır:
\`\`\`systemverilog
initial begin
  #100_000; // 100 mikrosaniye sonra hala bitmediyse
  $fatal("ZAMAN ASIMI (TIMEOUT): DUT ready vermedi, sistem kilitlendi!");
end
\`\`\``,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Durum Makinesi Tabanlı Testbench (FSM-Based Testbench)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "state-machine-based-testbench.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// DUT: 8x8 synchronous memory with acknowledge handshake // Write: assert wr_en=1, provide addr and wr_data, wait for ack // Read: assert rd_en=1, provide addr, wait for ack, then sample rd_data module mem_dut ( input clk, input rst, input wr_en, // write enable input rd_en, // read enable input [2:0] addr, // 3-bit address (8 locations) input [7:0] wr_data, // data to write output [7:0] rd_data, // data read out output ack // pulsed high for one cycle when done ); reg [7:0] mem [0:7]; // the 8-byte storage array reg [7:0] rd_data; reg ack; integer i; always @(posedge clk) begin ack <= 0; // default: ack is low rd_data <= 0; if (rst) begin for (i = 0; i < 8; i = i + 1) mem[i] <= 8'h00; end else if (wr_en) begin mem[addr] <= wr_data; // store the data ack <= 1; // acknowledge one cycle later end else if (rd_en) begin rd_data <= mem[addr]; // fetch the data ack <= 1; // acknowledge one cycle later end end endmodule`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Durum Makinesi Tabanlı Testbench (FSM-Based Testbench)",
      initialCode: `// DUT: 8x8 synchronous memory with acknowledge handshake // Write: assert wr_en=1, provide addr and wr_data, wait for ack // Read: assert rd_en=1, provide addr, wait for ack, then sample rd_data module mem_dut ( input clk, input rst, input wr_en, // write enable input rd_en, // read enable input [2:0] addr, // 3-bit address (8 locations) input [7:0] wr_data, // data to write output [7:0] rd_data, // data read out output ack // pulsed high for one cycle when done ); reg [7:0] mem [0:7]; // the 8-byte storage array reg [7:0] rd_data; reg ack; integer i; always @(posedge clk) begin ack <= 0; // default: ack is low rd_data <= 0; if (rst) begin for (i = 0; i < 8; i = i + 1) mem[i] <= 8'h00; end else if (wr_en) begin mem[addr] <= wr_data; // store the data ack <= 1; // acknowledge one cycle later end else if (rd_en) begin rd_data <= mem[addr]; // fetch the data ack <= 1; // acknowledge one cycle later end end endmodule`,
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
      question: "Protokol el sıkışması (handshake) içeren bir donanım arayüzünü doğrularken FSM tabanlı testbench mimarisinde karşılaşılabilecek en kritik risk nedir ve nasıl önlenir?",
      options: ["DUT'nin yanıt sinyalini (ready/ack) hiçbir zaman vermemesi durumunda testbench'in o durumda sonsuza kadar kilitli kalması (hang); bekleme durumlarına zaman aşımı (timeout watchdog) eklenerek önlenir.", "Durum makinesinin SystemVerilog yerine Verilog-95 formatında derlenmesi.", "Simülatörün saat sinyalini ters çevirmesi.", "FSM kullanıldığında kod kapsaması (code coverage) ölçümünün imkânsız hale gelmesi."],
      correctIndex: 0,
      explanation: "El sıkışmalı protokollerde testbench donanımın onayını (`ready`) bekler. Eğer RTL'deki bir mantık hatası nedeniyle DUT asla onay vermezse, testbench bekleme durumunda kilitli kalır ve simülasyon sonsuz döngüye girer. Bu durum simülasyonu sonlandıracak bağımsız bir zaman aşımı bekçisi (watchdog timer) konularak önlenir.",
    },
  },
  "linear-random-testbench": {
    id: "linear-random-testbench",
    badge: "Modül 3 • Testbench Mimari Evrimi (Testbench Architecture)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Lineer Rastgele Testbench (Linear Random Testbench)",
    subtitle: "`$urandom` ve `$random` fonksiyonları, rastgele tohum (seed) yönetimi, simülasyon tekrarlanabilirliği ve uç durumları keşfetme.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde deterministik sabit test vektörlerinden olasılıksal doğrulama dünyasına geçişi sağlayan Lineer Rastgele Testbench (\`Linear Random Testbench\`) mimarisini inceleyeceksiniz:

- Elle yazılan sabit veriler yerine rastgele uyarıcı üretiminin devreye alınması
- \`$random\` (işaretli) ile \`$urandom\` (işaretsiz) fonksiyonları arasındaki kritik semantik farklar
- Değer aralıklarını sınırlandırma teknikleri: Modulo (\`%\`) ve \`$urandom_range()\` kullanımı
- Rastgele Tohum (\`Seed\`) yönetimi ve simülasyon tekrarlanabilirliği (reproducibility)
- Çoklu tohumlu (\`Multi-seed\`) regresyon stratejisi ile beklenmedik hataları yakalama
- Kısıtsız rastgeleliğin sınırları ve neden nesne tabanlı CRV'ye ihtiyaç duyulduğu.`,
      },
      {
        title: "2. $random vs $urandom: Temel Farklar",
        content: `Verilog ve SystemVerilog rastgele sayı üretimi için iki farklı sistem görevi sunar:

- **\`$random\` (Klasik Verilog):** İşaretli (signed) 32-bit tamsayı döner. Değerler $-2^{31}$ ile $+2^{31}-1$ arasında değişir. Sayı negatif olabildiğinden, işaretsiz bir bellek adresine veya veri yoluna atandığında beklenmeyen taşmalara ve yanlış adreslemelere yol açar.
- **\`$urandom\` (SystemVerilog):** İşaretsiz (unsigned) 32-bit tamsayı döner. Değerler $0$ ile $2^{32}-1$ ($0$ ile $4.294.967.295$) arasındadır. Modern donanım doğrulamasında daima \`$urandom\` tercih edilmelidir.
- **\`$urandom_range(max, min)\`:** Belirlenen iki sınır arasında doğrudan rastgele sayı üretir (örneğin \`$urandom_range(15, 0)\` doğrudan 0 ile 15 arasında 4-bitlik bir değer verir).`,
      },
      {
        title: "3. Lineer Rastgele Testbench Mimarisi ve Kod Yapısı",
        content: `Lineer rastgele testbench, basit bir \`for\` döngüsü içinde binlerce rastgele işlemi arka arkaya sürer:

\`\`\`systemverilog
\`timescale 1ns/1ps
module tb_linear_random;
  logic [3:0] a, b;
  logic [3:0] sum;
  logic       cout;
  int error_count = 0;

  adder_4bit dut (.*);

  initial begin
    $display("[%0t] 1000 iterasyonluk rastgele test basliyor...", $time);

    for (int i = 0; i < 1000; i++) begin
      a = $urandom_range(15, 0); // 0..15 aralığında rastgele
      b = $urandom_range(15, 0);
      #10;

      // Otomatik Doğruluk Denetimi
      if ({cout, sum} !== (a + b)) begin
        $error("Hata! i=%0d: a=%0d b=%0d -> Beklenen=%0d Alinan=%0d",
               i, a, b, (a + b), {cout, sum});
        error_count++;
      end
    end

    if (error_count == 0)
      $display("*** 1000 RASTGELE TEST BASARIYLA GECTI ***");
    else
      $display("!!! TOPLAM HATA SAYISI: %0d !!!", error_count);
    $finish;
  end
endmodule
\`\`\``,
      },
      {
        title: "4. Tohum (Seed) Kontrolü ve Deterministik Tekrarlanabilirlik",
        content: `Rastgele sayı üreteçleri gerçekte matematiksel bir formüle dayanan sözde-rastgele (pseudo-random) dizilimler üretir.

- **Tohum Sabitse:** Simülatör her çalıştırıldığında aynı tohumu kullanırsa, her defasında TAM OLARAK AYNI rastgele sayıları üretir. Bu durum yeni bir hata bulmayı engeller.
- **Tohumu Değiştirmek:** Komut satırından her simülasyona farklı bir tohum verilir:
  \`\`\`bash
  vcs -R tb.sv +ntb_random_seed=48192
  # veya Questa:
  vsim -sv_seed random tb
  \`\`\`
- **Altın Kural:** Simülasyon başlarken kullanılan tohum değeri mutlaka log dosyasına yazdırılmalıdır. Hata çıktığında o tohum numarası olmadan hatayı tekrar canlandırmak imkânsızdır!`,
      },
      {
        title: "5. Rastgele Testlerin Gücü: İnsan Önyargısını Kırmak",
        content: `Bir mühendis elle test yazdığında bilinçaltında 'mantıklı' görünen sayıları seçer: 0, 1, 2, maksimum değer. Ancak donanım hataları genellikle absürt kombinasyonlarda gizlidir:

- Bir saat döngüsünde \`0\` gelirken hemen sonraki döngüde maksimum değer \`15\` gelmesi
- Arka arkaya 10 kez aynı sayının tekrarlanması
- Giriş sinyallerinin tüm bitlerinin aynı anda terslenmesi (\`0101 -> 1010\`)

Rastgele testbench bu beklenmedik kombinasyonları saniyeler içinde binlerce kez deneyerek insan gözünün asla akıl edemeyeceği köşe durumları açığa çıkarır.`,
      },
      {
        title: "6. Kısıtsız Rastgeleliğin Sınırları",
        content: `Lineer rastgele testbench toplayıcı gibi basit bloklarda harikadır; ancak karmaşık protokollerde duvara toslar:

- **Kural Bilmez:** \`$urandom\` protokol kuralından anlamaz. Bir PCIe paketinde 'CRC alanı veri uzunluğuna göre hesaplanmalıdır' kuralını \`$urandom\` ile tutturma olasılığı sıfıra yakındır.
- **İlişki Kuramaz:** İki değişken arasındaki karmaşık bağımlılıkları (örneğin 'eğer mod=1 ise adres 64-bit olmalı, mod=0 ise adres 32-bit olmalı') basit \`$urandom\` ile ifade etmek yüzlerce \`if-else\` satırı gerektirir.

Bu sınır, nesne yönelimli sınıflar ve SystemVerilog kısıt çözücüsü (\`CRV\`) ile aşılmıştır.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Lineer Rastgele Testbench (Linear Random Testbench)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "linear-random-testbench.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `// DUT: 4-bit adder (same as previous articles) module adder ( input [3:0] a, input [3:0] b, input cin, output [3:0] sum, output cout ); assign {cout, sum} = a + b + cin; endmodule`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Lineer Rastgele Testbench (Linear Random Testbench)",
      initialCode: `// DUT: 4-bit adder (same as previous articles) module adder ( input [3:0] a, input [3:0] b, input cin, output [3:0] sum, output cout ); assign {cout, sum} = a + b + cin; endmodule`,
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
      question: "SystemVerilog'da rastgele uyarıcı üretirken `$random` yerine `$urandom` fonksiyonunun tercih edilmesinin en temel sebebi nedir?",
      options: ["`$urandom` fonksiyonunun işaretsiz (unsigned) 32-bit değer üretmesi; `$random`'un ise işaretli üretip donanım adresleme veya veri yollarında istenmeyen negatif değerlere yol açabilmesi", "`$urandom`'un yalnızca analog sinyalleri simüle edebilmesi", "`$random` fonksiyonunun SystemVerilog standardından tamamen kaldırılmış olması", "`$urandom` kullanıldığında simülasyon tohumuna (seed) ihtiyaç duyulmaması"],
      correctIndex: 0,
      explanation: "`$random` fonksiyonu işaretli (signed) tamsayı üretir ve negatif değerler alabilir. Sayısal donanımlarda bellek adresleri, veri genişlikleri ve kontrol bayrakları işaretsiz olduğundan, negatif bir değer beklenmeyen taşmalara ve hatalı adreslemelere yol açar. `$urandom` ise doğrudan 32-bit işaretsiz (unsigned) pozitif değerler üretir.",
    },
  },
  "self-checking-testbench": {
    id: "self-checking-testbench",
    badge: "Modül 3 • Testbench Mimari Evrimi (Testbench Architecture)",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Kendi Kendini Denetleyen Testbench (Self-Checking Testbench)",
    subtitle: "Manuel dalga formu incelemesini ortadan kaldıran dinamik sonuç denetimi, `$error`/`$fatal` kullanımı, ardışık düzen (pipeline) kontrolü ve regresyon otomasyonu.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde modern entegre devre doğrulamasının olmazsa olmaz standardı olan Kendi Kendini Denetleyen Testbench (\`Self-Checking Testbench\`) mimarisini öğreneceksiniz:

- Manuel dalga formu incelemesinden tam otomatik sonuç denetimine geçiş
- Kombinasyonel devreler için yerleşik denetleyici (\`checker task\`) yazımı
- Ardışık düzenli (\`pipelined\`) ve gecikmeli tasarımlarda SystemVerilog Kuyrukları (\`queue\`) ile denetim
- Standart hata raporlama hiyerarşisi: \`$info\`, \`$warning\`, \`$error\` ve \`$fatal\` kullanımı
- Önsavlar (\`Assertions\`) ile protokol kontrollerinin birleştirilmesi
- İnsansız Gecelik Regresyon (\`Unattended Regression\`) otomasyonunun temelleri.`,
      },
      {
        title: "2. Manuel İncelemeden Otomasyona Geçiş",
        content: `10 test koşturulurken mühendis dalga formunu (waveform) açıp sinyallere tek tek bakabilir. Ancak modern bir çip projesinde her gece 10.000 farklı test simüle edilir. 10.000 testin dalga formunu gözle incelemek imkânsızdır!

**Self-Checking Felsefesi:**
Testbench kendi kendine şu soruyu sormalı ve yanıtlamalıdır: *'DUT doğru sonucu üretti mi?'*
- Doğruysa: Sessizce devam eder veya başarılı işlem sayacını bir artırır.
- Yanlışsa: Hatanın tam olarak hangi saat döngüsünde, hangi girdilerle gerçekleştiğini ve beklenen ile alınan değerleri log dosyasına raporlar.
- Simülasyon bittiğinde işletim sistemine temiz bir dönüş kodu (exit code 0 veya 1) döner.`,
      },
      {
        title: "3. Kombinasyonel Devrelerde Otomatik Denetim",
        content: `Gecikmesiz kombinasyonel devrelerde girdi uygulandıktan sonra çıkış doğrudan bir fonksiyonel denetleyici ile sınanır:

\`\`\`systemverilog
task check_adder(input logic [3:0] a, b,
                 input logic [3:0] sum,
                 input logic       cout);
  logic [4:0] expected;
  expected = a + b;

  if ({cout, sum} !== expected) begin
    $error("[%0t ns] UYUMSUZLUK: a=%0d b=%0d | Beklenen=%0d Alinan=%0d",
           $time, a, b, expected, {cout, sum});
    fail_count++;
  end else begin
    pass_count++;
  end
endtask
\`\`\`

Bu görev her girdi uygulandıktan sonra çağrılarak sonucu sıfır insan müdahalesiyle denetler.`,
      },
      {
        title: "4. Ardışık Düzenli (Pipelined) Tasarımlarda Kuyruk (Queue) ile Denetim",
        content: `Eğer donanım ardışık düzen (pipeline) gecikmesine sahipse (örneğin girdi verildikten 3 saat döngüsü sonra çıkış üretiyorsa) anlık karşılaştırma yapılamaz. Çözüm SystemVerilog kuyruklarıdır (\`queue\`):

\`\`\`systemverilog
logic [7:0] expected_q [$]; // SystemVerilog kuyruk yapısı

// Girdi Sürüş Bloğu: Girdi verildiği an beklenen sonucu hesapla ve kuyruğa at
always @(posedge clk) begin
  if (valid_in) begin
    expected_q.push_back(compute_expected(data_in));
  end
end

// Çıktı Denetim Bloğu: Çıkış geçerli olduğu an kuyruğun başındaki elemanla karşılaştır
always @(posedge clk) begin
  if (valid_out) begin
    if (expected_q.size() == 0) begin
      $error("[%0t] Beklenmedik cikis! Kuyruk bos ama valid_out aktif.", $time);
    end else begin
      logic [7:0] exp_val;
      exp_val = expected_q.pop_front();
      if (data_out !== exp_val) begin
        $error("[%0t] HATA: Beklenen=%h, Alinan=%h", $time, exp_val, data_out);
      end
    end
  end
end
\`\`\``,
      },
      {
        title: "5. Hata Raporlama Standartları: $error ve $fatal",
        content: `Doğrulama ortamlarında \`$display\` yerine resmi ciddiyet seviyeleri (severity levels) kullanılmalıdır:

- **\`$info\`:** Bilgilendirme mesajları (test başladı, faz tamamlandı).
- **\`$warning\`:** Protokol dışı olmayan ama şüpheli durumlar (örneğin uzun süre işlem gelmemesi).
- **\`$error\`:** Fonksiyonel veri uyumsuzluğu veya önsav ihlali. Simülasyon durmaz; hata sayacı artar ve test koşturulmaya devam edilerek diğer hatalar da toplanır.
- **\`$fatal\`:** Telafisi imkânsız kritik kilitlenme veya kütüphane çökmesi. Simülasyon derhal durdurulur ve işletim sistemine hata kodu döner.`,
      },
      {
        title: "6. İnsansız Regresyon (Unattended Regression) ve Başarı Kriterleri",
        content: `Testin en sonunda \`final\` bloğu içinde nihai özet kontrolü yapılır:

\`\`\`systemverilog
final begin
  $display("=========================================");
  $display("DOGRULAMA SONUC OZETI:");
  $display("Basarili Islem: %0d | Hatali Islem: %0d", pass_count, fail_count);

  if (fail_count == 0 && expected_q.size() == 0) begin
    $display("*** TEST PASSED (BASARILI) ***");
  end else begin
    $display("!!! TEST FAILED (BASARISIZ) !!!");
    $fatal(1, "Regresyon basarisiz oldu.");
  end
  $display("=========================================");
end
\`\`\`

Bu yapı sayesinde CI/CD sistemleri (Jenkins, GitLab CI, GitHub Actions) gecelik regresyonu otomatik koşturur, logları tarar ve sabah ekibe tek bir başarı/başarısızlık raporu gönderir.`,
      },
      {
        title: "Örnek Doğrulama Testbench Kodu",
        content: `Aşağıdaki kod parçası **Kendi Kendini Denetleyen Testbench (Self-Checking Testbench)** konusunun pratik SystemVerilog testbench uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Doğrulama (DV) İpucu",
          message: "Regresyon koşularında deterministik hata ayıklama için rastgele tohum değerini (`seed`) simülatör log dosyasına mutlaka kaydediniz.",
        },
        code: {
          language: "systemverilog",
          caption: "self-checking-testbench.sv - Örnek Doğrulama Testbench Kodu",
          snippet: `module tb_adder_selfcheck; // ── DUT signals ──────────────────────────────────────────────── reg [3:0] a; reg [3:0] b; reg cin; wire [3:0] sum; wire cout; // ── DUT instantiation ────────────────────────────────────────── adder dut ( .a(a), .b(b), .cin(cin), .sum(sum), .cout(cout) ); // ── Clock ────────────────────────────────────────────────────── reg clk = 0; always #5 clk = ~clk; // ── Checker state ────────────────────────────────────────────── integer i; integer pass_count; integer fail_count; reg [4:0] expected; // 5-bit: {cout_expected, sum_expected} initial begin $display("Seed = %0d", $get_initial_random_seed()); pass_count = 0; fail_count = 0; a = 0; b = 0; cin = 0; @(posedge clk); @(posedge clk); for (i = 0; i < 1000; i = i + 1) begin // ── Apply random stimulus ────────────────────────────── a = $urandom; b = $urandom; cin = $urandom; @(posedge clk); // wait for output to settle // ── Reference model: independent computation ────────── expected = a + b + cin; // ── Checker: compare DUT output against expected ─────── // Use !== so X or Z on DUT outputs are caught as failures if ({cout, sum} !== expected) begin $error("FAIL [%0d]: a=%0d b=%0d cin=%0d | expected=%05b got=%b%04b", i, a, b, cin, expected, cout, sum); fail_count = fail_count + 1; end else begin pass_count = pass_count + 1; end end // ── Final summary ────────────────────────────────────────── $display("------------------------------------------"); $display("Results: %0d passed, %0d failed / 1000 total", pass_count, fail_count); if (fail_count > 0) $fatal(1, "TEST FAILED — %0d errors detected", fail_count); else $display("TEST PASSED"); $finish; end endmodule`,
        },
      },
    ],
    playground: {
      title: "Doğrulama Simülatörü: Kendi Kendini Denetleyen Testbench (Self-Checking Testbench)",
      initialCode: `module tb_adder_selfcheck; // ── DUT signals ──────────────────────────────────────────────── reg [3:0] a; reg [3:0] b; reg cin; wire [3:0] sum; wire cout; // ── DUT instantiation ────────────────────────────────────────── adder dut ( .a(a), .b(b), .cin(cin), .sum(sum), .cout(cout) ); // ── Clock ────────────────────────────────────────────────────── reg clk = 0; always #5 clk = ~clk; // ── Checker state ────────────────────────────────────────────── integer i; integer pass_count; integer fail_count; reg [4:0] expected; // 5-bit: {cout_expected, sum_expected} initial begin $display("Seed = %0d", $get_initial_random_seed()); pass_count = 0; fail_count = 0; a = 0; b = 0; cin = 0; @(posedge clk); @(posedge clk); for (i = 0; i < 1000; i = i + 1) begin // ── Apply random stimulus ────────────────────────────── a = $urandom; b = $urandom; cin = $urandom; @(posedge clk); // wait for output to settle // ── Reference model: independent computation ────────── expected = a + b + cin; // ── Checker: compare DUT output against expected ─────── // Use !== so X or Z on DUT outputs are caught as failures if ({cout, sum} !== expected) begin $error("FAIL [%0d]: a=%0d b=%0d cin=%0d | expected=%05b got=%b%04b", i, a, b, cin, expected, cout, sum); fail_count = fail_count + 1; end else begin pass_count = pass_count + 1; end end // ── Final summary ────────────────────────────────────────── $display("------------------------------------------"); $display("Results: %0d passed, %0d failed / 1000 total", pass_count, fail_count); if (fail_count > 0) $fatal(1, "TEST FAILED — %0d errors detected", fail_count); else $display("TEST PASSED"); $finish; end endmodule`,
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
      question: "3 saat döngüsü ardışık düzen (pipeline) gecikmesine sahip bir donanım bloğunu kendi kendini denetleyen (self-checking) bir testbench ile doğrularken beklenen çıktıları saklamak ve doğru döngüde karşılaştırmak için en uygun SystemVerilog veri yapısı hangisidir?",
      options: ["SystemVerilog Kuyruğu (Queue - push_back ve pop_front metotları ile FIFO mantığı)", "Tek bitlik reg değişkeni", "1 boyutlu statik tel (wire) dizisi", "Sadece $random tohumu saklayan tamsayı"],
      correctIndex: 0,
      explanation: "Ardışık düzenli (pipelined) devrelerde girdi verildikten belirli bir süre sonra çıkış üretilir. Girdi sürüldüğü anda beklenen sonuç hesaplanıp bir kuyruğa (`push_back`) itilir; çıkış verisi hazır olduğunda ise kuyruğun en başındaki beklenen eleman çekilerek (`pop_front`) donanımın ürettiği çıktı ile birebir karşılaştırılır.",
    },
  },
};
