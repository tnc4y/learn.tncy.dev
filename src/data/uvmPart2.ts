import { LessonContent } from "./lessonsData";

export const UVM_PART2: Record<string, LessonContent> = {
  "uvm-phases": {
    id: "uvm-phases",
    badge: "Modül 5 • UVM Fazları ve İtiraz (Objection) Mekanizması",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Fazları: build_phase, connect_phase ve run_phase Yaşam Döngüsü",
    subtitle: "Testbench bileşenlerinin hiyerarşik inşası, TLM bağlantıları ve simülasyon adımlarının küresel senkronizasyon mekanizması.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm-phases.png)
![UVM Mimari Şeması](/images/uvm/uvm-run-time-phases.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in (Universal Verification Methodology) kalbinde yer alan faz (phasing) mekanizmasını derinlemesine öğreneceksiniz:
- UVM fazlarının varlık nedeni ve testbench bileşenlerini küresel düzeyde nasıl senkronize ettiği.
- Üç ana faz kategorisi: **İnşa (Build)**, **Çalışma (Run)** ve **Temizleme (Cleanup)** fazları.
- Simülasyon zamanı harcamayan fonksiyonel fazlar (\`function void\`) ile zaman tüketen görev tabanlı fazlar (\`task\`) arasındaki temel farklar.
- \`build_phase\` metodunun neden yukarıdan aşağıya (**top-down**) yürütülmesi gerektiği.
- \`connect_phase\` metodunun neden aşağıdan yukarıya (**bottom-up**) çalıştığı ve TLM port bağlantı kuralları.
- \`run_phase\` alt fazları (run-time sub-phases) ile karmaşık ASIC/SoC senaryolarının yönetimi.`,
      },
      {
        title: "2. UVM Faz Mekanizması Nedir ve Neden Hayatidir?",
        content: `Klasik SystemVerilog veya Verilog testbench yapılarında en büyük zorluklardan biri, farklı bileşenlerin ne zaman başlatılacağı ve birbirleriyle nasıl senkronize olacağıdır. Örneğin, bir \`driver\` bileşeni henüz bir \`sequencer\` bellekte oluşturulmadan ona bağlanmaya çalışırsa veya DUT henüz sıfırlanmadan (reset) testbench veri sürmeye başlarsa, ölümcül bellek erişim hataları (\`null pointer dereference\`) ve yarış durumları (\`race conditions\`) ortaya çıkar.

UVM'de \`uvm_component\` taban sınıfından türetilen tüm bileşenler, önceden tanımlanmış küresel bir faz akışına katılır. Bu mekanizmanın temel kuralları şunlardır:
1. **Küresel Adım Senkronizasyonu:** Testbench hiyerarşisindeki istisnasız tüm bileşenler mevcut fazı tamamlamadan hiçbiri bir sonraki faza geçemez.
2. **Geri Çağırma (Callback) Modeli:** Her faz, bileşen sınıfı içinde \`override\` edilen sanal bir metottur (\`virtual function\` veya \`virtual task\`).
3. **Zaman Harcayan vs Harcamayan Fazlar:** \`run_phase\` haricindeki neredeyse tüm temel fazlar birer \`function\` olarak tanımlanır ve **sıfır simülasyon zamanında (0 delta time)** tamamlanır. \`run_phase\` ise simülasyon saati tüketen tek üst düzey \`task\` fazıdır.`,
      },
      {
        title: "3. Temel UVM Fazları Tablosu ve Görevleri",
        content: `UVM standart fazları üç ana grupta toplanır:

| Kategori | Faz Adı | Metot Türü | Sıralama | Temel Amacı |
| :--- | :--- | :--- | :--- | :--- |
| **İnşa (Build)** | \`build_phase\` | \`function\` | Top-Down | Hiyerarşik bileşenlerin oluşturulması ve yapılandırılması |
| **İnşa (Build)** | \`connect_phase\` | \`function\` | Bottom-Up | TLM port, export ve imp bağlantılarının yapılması |
| **İnşa (Build)** | \`end_of_elaboration_phase\` | \`function\` | Bottom-Up | Bağlantıların kontrolü ve son ince ayarlar |
| **İnşa (Build)** | \`start_of_simulation_phase\` | \`function\` | Bottom-Up | Simülasyon öncesi başlık logları ve topoloji dökümü |
| **Çalışma (Run)** | \`run_phase\` | \`task\` | Paralel | DUT'ye uyarıcı (stimulus) sürülmesi ve yanıtların izlenmesi |
| **Temizleme (Cleanup)** | \`extract_phase\` | \`function\` | Bottom-Up | Scoreboard ve DUT'den nihai verilerin toplanması |
| **Temizleme (Cleanup)** | \`check_phase\` | \`function\` | Bottom-Up | Beklenen ve gerçekleşen sonuçların karşılaştırılması |
| **Temizleme (Cleanup)** | \`report_phase\` | \`function\` | Bottom-Up | Test sonuçlarının ve başarı/hata raporlarının yazdırılması |
| **Temizleme (Cleanup)** | \`final_phase\` | \`function\` | Top-Down | Dosyaların kapatılması ve simülatör kaynaklarının bırakılması |`,
      },
      {
        title: "4. build_phase ve Hiyerarşik İnşa Sırası (Top-Down)",
        content: `\`build_phase\`, UVM doğrulama ortamının iskeletini oluşturur. Bu faz **yukarıdan aşağıya (top-down)** sırayla yürütülür:
1. İlk olarak en üstteki test sınıfı (\`uvm_test\`) çalışır.
2. Ardından testin içinde oluşturulan ortam (\`uvm_env\`) çalışır.
3. Daha sonra ortamın içindeki temsilciler (\`uvm_agent\`) çalışır.
4. Son olarak temsilcinin altındaki \`driver\`, \`monitor\` ve \`sequencer\` bileşenleri oluşturulur.

**Neden Top-Down?** Mantık çok basittir: Bir ebeveyn bileşen (parent), alt bileşenlerini (children) oluşturmadan o alt bileşenlerin \`build_phase\` metodu yürütülemez.

\`\`\`systemverilog
class my_env extends uvm_env;
  \`uvm_component_utils(my_env)
  
  my_agent      agent;
  my_scoreboard sb;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  function void build_phase(uvm_phase phase);
    super.build_phase(phase); // Daima super çağrısı yapılmalıdır
    
    // Alt bileşenler mutlaka build_phase içinde ve fabrika (factory) ile oluşturulmalıdır
    agent = my_agent::type_id::create("agent", this);
    sb    = my_scoreboard::type_id::create("sb", this);
  endfunction
endclass
\`\`\`

> [!CAUTION]
> Alt bileşenleri asla \`connect_phase\` veya \`run_phase\` içinde oluşturmayın! Eğer bir alt bileşeni \`connect_phase\` içinde oluşturmaya kalkışırsanız, diğer bileşenler \`connect_phase\` başladığında o bileşenin henüz var olmadığını görecek ve testbench çökecektir.

\`build_phase\` tamamlandıktan sonra testbench yapısı \`uvm_top.print_topology()\` ile terminale dökülebilir:
\`\`\`text
----------------------------------------------------------------------
Name                     Type                    Size  Value
----------------------------------------------------------------------
uvm_test_top             my_test                 -     @335
  m_env                  my_env                  -     @348
    agent                my_agent                -     @357
      drv                my_driver               -     @366
      mon                my_monitor              -     @375
      seqr               my_sequencer            -     @384
    sb                   my_scoreboard           -     @393
----------------------------------------------------------------------
\`\`\``,
      },
      {
        title: "5. connect_phase: Testbench Bileşenlerini Kablolama (Bottom-Up)",
        content: `Tüm bileşenler \`build_phase\` sırasında başarıyla oluşturulduktan sonra, UVM \`connect_phase\` adımına geçer. Bu fazda bileşenler arasındaki TLM (Transaction Level Modeling) port ve export bağlantıları kurulur.

\`connect_phase\` **aşağıdan yukarıya (bottom-up)** çalışır. Alt bileşenler kendi iç bağlantılarını tamamlar, ardından üst modüller sistem seviyesindeki entegrasyonu gerçekleştirir. Örneğin bir \`agent\` içinde \`driver\` ile \`sequencer\` bağlantısı şu şekilde yapılır:

\`\`\`systemverilog
class my_agent extends uvm_agent;
  \`uvm_component_utils(my_agent)

  my_driver                  drv;
  my_monitor                 mon;
  uvm_sequencer #(my_item)   seqr;

  // build_phase icinde create() cagrildiktan sonra...
  function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    
    // Driver'in item portu ile Sequencer'in item export'u baglanir
    if (get_is_active() == UVM_ACTIVE) begin
      drv.seq_item_port.connect(seqr.seq_item_export);
    end
  endfunction
endclass
\`\`\`

> [!TIP]
> TLM bağlantılarında \`.connect()\` metodunu çağırırken kural: İsteği başlatan port (\`port\`), sağlayıcı veya geçit olan \`export\` ya da \`imp\` arayüzüne bağlanır (\`initiator.port.connect(target.export)\`).`,
      },
      {
        title: "6. run_phase ve Koşma Zamanı Alt Fazları (Run-time Sub-phases)",
        content: `\`run_phase\`, simülasyon zamanı harcayan tek ana fazdır ve tüm bileşenlerde **paralel** olarak yürütülür. Ancak karmaşık SoC doğrulamalarında donanımın sıfırlanması (reset), konfigüre edilmesi ve ana trafiğin sürülmesi gibi adımları daha hassas yönetmek için UVM, 12 adet sıralı alt faz sunar:

\`\`\`
[pre_reset] -> [reset] -> [post_reset]
     -> [pre_configure] -> [configure] -> [post_configure]
     -> [pre_main] -> [main] -> [post_main]
     -> [pre_shutdown] -> [shutdown] -> [post_shutdown]
\`\`\`

Bu alt fazlar \`run_phase\` ile eşzamanlı olarak arka planda çalışır. 
- Bir bileşen \`reset_phase\` içinde donanım reset sinyalini sürebilir.
- \`configure_phase\` içinde register yapılandırması (DUT register programming) yapılabilir.
- \`main_phase\` içinde ise asıl veri paketleri sürülebilir.

> [!NOTE]
> Endüstri standardında doğrulama IP'lerinin (VIP) büyük çoğunluğu, karmaşıklığı azaltmak ve VIP uyumluluğunu korumak için doğrudan standart \`run_phase\` task'ını kullanır ve sıfırlama/yapılandırma adımlarını \`sequence\` katmanında yönetir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Fazları: build_phase, connect_phase ve run_phase Yaşam Döngüsü** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-phases.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class my_env extends uvm_env;
  \`uvm_component_utils(my_env)

  my_agent    agent;
  my_scoreboard sb;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);

    // Create child components — must happen in build_phase
    agent = my_agent::type_id::create("agent", this);
    sb    = my_scoreboard::type_id::create("sb", this);
  endfunction

  // Rest of the code (connect_phase, etc.)
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Fazları: build_phase, connect_phase ve run_phase Yaşam Döngüsü",
      initialCode: `class my_env extends uvm_env;
  \`uvm_component_utils(my_env)

  my_agent    agent;
  my_scoreboard sb;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);

    // Create child components — must happen in build_phase
    agent = my_agent::type_id::create("agent", this);
    sb    = my_scoreboard::type_id::create("sb", this);
  endfunction

  // Rest of the code (connect_phase, etc.)
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Fazları: build_phase, connect_phase ve run_phase Yaşam Döngüsü doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir UVM testbench'inde bileşenleri oluşturan 'build_phase' yukarıdan aşağıya (top-down) çalışırken, TLM bağlantılarını yapan 'connect_phase' neden aşağıdan yukarıya (bottom-up) çalışır?",
      options: ["Çünkü alt bileşenlerin kendi iç bağlantı ve hazırlıklarını tamamlaması, üst modüllerin onları güvenle dış bağlantılara entegre edebilmesi için gereklidir.", "SystemVerilog derleyicisi sınıfları ters sırada bellekten sildiği için bu sıralama zorunludur.", "connect_phase simülasyon saati tüketen bir task olduğundan paralel çalışmak zorundadır.", "Sadece factory override mekanizmasının kayıtlarını temizlemek amacıyla bu sıra uygulanır."],
      correctIndex: 0,
      explanation: "Doğru! build_phase'de önce ebeveyn (parent) var olmalı ki alt bileşenleri (children) yaratabilsin (top-down). connect_phase'de ise alt bileşenlerin kendi iç port ve bağlantılarını tamamlamış olması, üst katmanların (environment/test) onları güvenle diğer bloklara bağlamasını garanti altına alır (bottom-up).",
    },
  },
  "uvm-objection": {
    id: "uvm-objection",
    badge: "Modül 5 • UVM Fazları ve İtiraz (Objection) Mekanizması",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Objection (İtiraz) Mekanizması: Simülasyon Ömrünü Yönetme",
    subtitle: "Simülasyonun vaktinden önce sonlanmasını engelleme, raise_objection/drop_objection yaşam döngüsü ve drain time kontrolü.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'de simülasyonun ne zaman başlayıp ne zaman sonlanacağını belirleyen itiraz (objection) mekanizmasını öğreneceksiniz:
- Objection mekanizmasının temel mantığı ve SystemVerilog \`$finish\` karmaşasını nasıl çözdüğü.
- \`phase.raise_objection()\` ve \`phase.drop_objection()\` çağrılarının kuralları.
- Simülasyonun 0 zamanında erken sonlanması (early exit) probleminin nedeni ve çözümü.
- Boşaltma süresi (**drain time**) kavramı ile DUT boru hattındaki (pipeline) paketlerin işlenmesi.
- Simülasyon performansı açısından objection yönetimi ve en iyi mühendislik pratikleri.`,
      },
      {
        title: "2. Objection Mekanizması Nedir ve Neden Hayatidir?",
        content: `Klasik Verilog testbench'lerinde simülasyonu bitirmek için rastgele gecikmelerden sonra \`$finish\` çağrılırdı. Ancak çok kanallı ve asenkron modern sistemlerde, hangi bileşenin işinin bittiğini kestirmek imkansızdır.

UVM'de \`run_phase\` başladığında simülatör arkada bir itiraz sayacı (**objection counter**) tutar:
- Eğer simülasyon zamanı sıfırken (time 0) hiçbir bileşen itiraz bildirmezse (sayaç = 0), UVM testbench'in yapacak bir işi olmadığını varsayar ve **run_phase'i anında sonlandırır!**
- Bir bileşen veya sekans simülasyonun devam etmesini istiyorsa \`phase.raise_objection()\` çağırarak sayacı 1 artırır ("Benim henüz bitmemiş işim var, simülasyonu kapatma!").
- İşi tamamlandığında ise \`phase.drop_objection()\` çağırarak sayacı 1 azaltır.
- Sayaç tekrar 0'a ulaştığında, UVM simülasyonun bittiğine karar verir ve temizleme fazlarına (\`extract_phase\`, \`check_phase\`, vb.) geçer.`,
      },
      {
        title: "3. raise_objection ve drop_objection Kullanımı",
        content: `Objection mekanizması çoğunlukla ya en üst düzey test sınıfının \`run_phase\` metodunda ya da test senaryosunu yürüten ana \`uvm_sequence\` içinde kullanılır.

**Test Sınıfı İçinde Kullanım:**
\`\`\`systemverilog
class my_test extends uvm_test;
  \`uvm_component_utils(my_test)

  task run_phase(uvm_phase phase);
    // 1. İtirazı kaldır (simülasyonu canlı tut)
    phase.raise_objection(this, "Ana test calismaya basladi");
    \`uvm_info("TEST", "Stimulus uretimi baslatiliyor...", UVM_LOW)

    // 2. Simülasyon işlemleri veya sekans yürütme
    #1000ns;

    \`uvm_info("TEST", "Test tamamlandi, itiraz dusuruluyor.", UVM_LOW)
    // 3. İtirazı düşür (simülasyonun kapanmasına izin ver)
    phase.drop_objection(this, "Ana test tamamlandi");
  endtask
endclass
\`\`\`

**Sekans (Sequence) İçinde Kullanım:**
Modern UVM metodolojisinde yaygın pratik, objection'ı doğrudan sekansta yönetmektir:
\`\`\`systemverilog
class my_sequence extends uvm_sequence #(my_transaction);
  \`uvm_object_utils(my_sequence)

  task pre_body();
    if (starting_phase != null)
      starting_phase.raise_objection(this, "Sekans basladi");
  endtask

  task body();
    \`uvm_info("SEQ", "Islem paketleri gonderiliyor...", UVM_MEDIUM)
    \`uvm_do(req)
  endtask

  task post_body();
    if (starting_phase != null)
      starting_phase.drop_objection(this, "Sekans bitti");
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Drain Time (Boşaltma Süresi) ve Son İşlemler",
        content: `Bir test senaryosunda son işlem paketi DUT'ye sürüldükten hemen sonra objection düşürülebilir. Ancak bu paketin DUT içindeki boru hatlarından (pipeline) geçip çıkış portuna ulaşması ve \`monitor\` tarafından yakalanıp \`scoreboard\`'da denetlenmesi ek bir zaman alabilir.

Eğer objection düşürüldüğü anda simülasyon kapanırsa, boru hattındaki son paket denetlenemeden simülasyon biter. Bu sorunu çözmek için UVM **Drain Time** (boşaltma süresi) mekanizmasını sunar:

\`\`\`systemverilog
function void end_of_elaboration_phase(uvm_phase phase);
  super.end_of_elaboration_phase(phase);
  // Son objection dustukten sonra 100ns daha bekle, ardindan fazi kapat
  uvm_phase run_phase_h = phase.find_by_name("run", 0);
  run_phase_h.phase_done.set_drain_time(this, 100ns);
endfunction
\`\`\`

Sayaç sıfıra ulaştığında UVM belirtilen drain time kadar bekler. Bu süre zarfında yeni bir objection kaldırılmazsa \`run_phase\` resmi olarak sonlandırılır.`,
      },
      {
        title: "5. En İyi Tasarım Pratikleri ve Yaygın Hatalar",
        content: `> [!WARNING]
> **Kritik Performans Uyarısı:** Asla \`driver\` veya \`monitor\` bileşenlerinin ana döngülerinde (\`forever\` döngüsü içinde her paket için) \`raise_objection\` ve \`drop_objection\` çağırmayın! Her objection çağrısı tüm UVM hiyerarşisi boyunca bildirim yayar; saatlerce sürecek bir regresyon testinde simülasyon hızını %50'ye varan oranda düşürebilir.

1. **Objection Sorumluluğunu Yüksek Katmanda Tutun:** İtirazları yalnızca test senaryolarında veya en üst düzey sanal sekanslarda (\`virtual sequence\`) yönetin.
2. **Kilitlenmeleri Önleme:** Eğer bir \`raise_objection\` çağrısından sonra hata fırlatılır veya kod takılırsa, \`drop_objection\` asla çalışmayabilir ve simülasyon sonsuza kadar asılı kalabilir.
3. **Objection İzleme Komutu:** Simülasyonun hangi bileşen yüzünden kapanmadığını görmek için simülatörü \`+UVM_OBJECTION_TRACE\` bayrağı ile çalıştırın. Bu bayrak, tüm raise ve drop işlemlerini zaman damgası ve bileşen yolu ile loglar.`,
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Objection (İtiraz) Mekanizması: Simülasyon Ömrünü Yönetme",
      initialCode: `// Minimal UVM Testbench Template
import uvm_pkg::*;
\`include "uvm_macros.svh"

class sample_test extends uvm_test;
  \`uvm_component_utils(sample_test)
  function new(string name = "sample_test", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual task run_phase(uvm_phase phase);
    phase.raise_objection(this);
    \`uvm_info("TEST", "UVM Simülasyonu başarıyla yürütüldü!", UVM_LOW)
    #100;
    phase.drop_objection(this);
  endtask
endclass

module tb_top;
  initial run_test("sample_test");
endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Objection (İtiraz) Mekanizması: Simülasyon Ömrünü Yönetme doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir UVM testbench'inde 'run_phase' başladığı anda hiçbir bileşen veya sekans 'phase.raise_objection()' çağrısı yapmazsa ne gerçekleşir?",
      options: ["Simülatör hata verir ve derleme aşamasına geri döner.", "run_phase 0 simülasyon zamanında anında sonlanır ve doğrudan cleanup (extract, check, report) fazlarına geçilir.", "Simülatör varsayılan olarak 1000 ns boyunca bekleyip ardından kapanır.", "Testbench sonsuz döngüye girer ve simülasyon zaman aşımına (timeout) uğrar."],
      correctIndex: 1,
      explanation: "Doğru! UVM'de simülasyonun ilerlemesi objection sayacının sıfırdan büyük olmasına bağlıdır. Zaman 0'da hiçbir itiraz kaldırılmazsa sayaç 0 kalır ve UVM yapılacak iş kalmadığını varsayarak run_phase'i sıfır zamanında derhal bitirir.",
    },
  },
  "uvm-user-defined-phase": {
    id: "uvm-user-defined-phase",
    badge: "Modül 5 • UVM Fazları ve İtiraz (Objection) Mekanizması",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Kullanıcı Tanımlı UVM Fazları (User-Defined Phases)",
    subtitle: "Standart UVM faz akışını özelleştirme, uvm_task_phase türetme ve özel senkronizasyon adımları ekleme.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, standart UVM faz akışının yetersiz kaldığı durumlarda sisteme nasıl özel faz eklenebileceğini öğreneceksiniz:
- Kullanıcı tanımlı fazlara (user-defined phases) ne zaman ihtiyaç duyulur?
- \`uvm_task_phase\` (zaman tüketen) ve \`uvm_topdown_phase\` (fonksiyonel) sınıflarından türetme.
- Singleton deseni ile tekil faz tanıtıcısı (\`get()\`) oluşturma.
- \`uvm_domain\` ve \`uvm_phase\` çizelgesine yeni fazı ekleme (\`domain.add()\`).
- Özel faz geliştirmenin getirdiği mimari riskler ve standart alternatifler.`,
      },
      {
        title: "2. Kullanıcı Tanımlı Fazlara Ne Zaman İhtiyaç Duyulur?",
        content: `Standart UVM mimarisi \`reset_phase\`, \`configure_phase\`, \`main_phase\` gibi fazlar sunar. Ancak bazı karmaşık donanım doğrulama senaryolarında daha özelleşmiş adımlar gerekebilir:
- **Firmware Yükleme:** İşlemci çekirdekleri çalıştırılmadan önce harici flash bellek modeline özel bir firmware ikili dosyasının yazılması.
- **Termal/Voltaj Kalibrasyonu:** Çip üstü sensörlerin ve PLL'lerin kilitlenme senkronizasyonu.
- **Çoklu Çip (Multi-Die / Chiplet) Eşzamanlaması:** İki farklı yonganın bağımsız güç açma (power-on) adımlarının belirli bir bariyer noktasında buluşması.

Bu tür durumlarda tüm bileşenlerin aynı anda belirli bir adıma geçmesini zorunlu kılmak için özel bir UVM fazı tanımlanabilir.`,
      },
      {
        title: "3. Özel Faz Sınıfı Geliştirme (uvm_task_phase)",
        content: `Zaman harcayan (task tabanlı) bir özel faz oluşturmak için \`uvm_task_phase\` sınıfı genişletilir. Sınıf içerisinde Singleton deseni uygulanır ve \`exec_task\` metodu ezilir:

\`\`\`systemverilog
class fw_load_phase extends uvm_task_phase;
  // Singleton nesne referansi
  static local fw_load_phase m_inst;

  function new(string name = "fw_load_phase");
    super.new(name);
  endfunction

  // Tekil ornek donduren get() metodu
  static function fw_load_phase get();
    if (m_inst == null)
      m_inst = new();
    return m_inst;
  endfunction

  // Faz yurutulurken bilesen uzerindeki ilgili metodu cagirir
  virtual task exec_task(uvm_component comp, uvm_phase phase);
    my_component c;
    if ($cast(c, comp)) begin
      c.fw_load_phase(phase);
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Faz Çizelgesine (Schedule) Ekleme Adımları",
        content: `Tanımlanan faz sınıfının simülatör tarafından tanınması için UVM faz çizelgesine eklenmesi gerekir. Bu işlem genellikle ortamın veya testin \`build_phase\` metodunda veya bir paket başlatma bloğunda yapılır:

\`\`\`systemverilog
class my_test extends uvm_test;
  \`uvm_component_utils(my_test)

  function void build_phase(uvm_phase phase);
    uvm_domain common_domain;
    super.build_phase(phase);

    // Ortak calisma alanini (domain) al
    common_domain = uvm_domain::get_common_domain();

    // fw_load_phase'i reset_phase ile configure_phase arasina ekle
    common_domain.add(
      fw_load_phase::get(),
      null,                     // On kosul fazi
      uvm_reset_phase::get()    // Hangi fazdan sonra gelecegi
    );
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. Mimari Tavsiyeler ve Dikkat Edilmesi Gereken Noktalar",
        content: `> [!IMPORTANT]
> **Endüstriyel UVM Tavsiyesi:** Özel fazları yalnızca kesinlikle zorunlu olduğunda kullanın!
> 1. **VIP Uyumluluk Riski:** Üçüncü parti doğrulama IP'leri (örneğin Synopsys/Cadence PCIe veya AXI VIP) sizin tanımladığınız \`fw_load_phase\` metodunu bilmez ve bu fazda hiçbir işlem yapmaz.
> 2. **Taşınabilirlik Sorunu:** Başka projelerle entegre edilirken testbench hiyerarşisinde faz senkronizasyonu karmaşıklaşabilir.
> 3. **Modern Alternatif:** Çoğu zaman bu tür adımlar, bir \`virtual sequence\` içinde \`reset_seq.start()\` ardından \`fw_load_seq.start()\` şeklinde sıralı çağrılarla çok daha temiz ve taşınabilir bir biçimde çözülebilir.`,
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Kullanıcı Tanımlı UVM Fazları (User-Defined Phases)",
      initialCode: `// Minimal UVM Testbench Template
import uvm_pkg::*;
\`include "uvm_macros.svh"

class sample_test extends uvm_test;
  \`uvm_component_utils(sample_test)
  function new(string name = "sample_test", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual task run_phase(uvm_phase phase);
    phase.raise_objection(this);
    \`uvm_info("TEST", "UVM Simülasyonu başarıyla yürütüldü!", UVM_LOW)
    #100;
    phase.drop_objection(this);
  endtask
endclass

module tb_top;
  initial run_test("sample_test");
endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Kullanıcı Tanımlı UVM Fazları (User-Defined Phases) doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Simülasyon zamanı tüketen (time-consuming) özel bir UVM fazı geliştirmek istediğinizde hangi UVM temel sınıfını genişletmeniz (extends) gerekir?",
      options: ["uvm_topdown_phase", "uvm_task_phase", "uvm_object_wrapper", "uvm_resource_db"],
      correctIndex: 1,
      explanation: "Doğru! Simülasyon zamanı tüketen (task tabanlı) özel fazlar 'uvm_task_phase' sınıfından türetilir. Sıfır zamanda çalışan fonksiyonel fazlar ise 'uvm_topdown_phase' veya 'uvm_bottomup_phase' sınıflarından türetilir.",
    },
  },
  "uvm-factory-override": {
    id: "uvm-factory-override",
    badge: "Modül 6 • Fabrika (Factory) ve Konfigürasyon Veritabanı",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Fabrika Ezme Mekanizması (Factory Override)",
    subtitle: "Bileşen ve işlem sınıflarını kaynak kodunu değiştirmeden polimorfik olarak ikame etme, Type ve Instance Override yöntemleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in en güçlü nesne yönelimli tasarım kalıplarından biri olan Fabrika Ezme (Factory Override) mekanizmasını inceleyeceksiniz:
- Neden doğrudan \`new()\` yerine UVM Factory mekanizması kullanılır?
- \`uvm_component_utils\` ve \`uvm_object_utils\` makroları ile fabrika kaydı.
- \`type_id::create()\` ile dinamik nesne üretimi.
- **Type Override (Türe Göre Ezme):** Tüm ortamdaki belirli bir sınıf türünü global olarak değiştirme.
- **Instance Override (Örneğe Göre Ezme):** Yalnızca belirli bir hiyerarşik yoldaki bileşeni özelleştirme.
- Fabrika ezme kuralları, çağırma zamanlaması ve \`factory.print()\` ile doğrulama.`,
      },
      {
        title: "2. Neden Doğrudan new() Kullanılmamalıdır?",
        content: `Klasik SystemVerilog'da bir alt bileşeni \`agent = new("agent", this);\` şeklinde oluşturursanız, \`agent\` sınıfının türü kaynak kodun içerisine kalıcı olarak kazınır (hardcoded). 

Diyelim ki 100 farklı test senaryonuz var ve bunlardan bir tanesinde hatta hata enjeksiyonu yapacak özel bir \`error_driver\` kullanmak istiyorsunuz. Eğer doğrudan \`new()\` kullandıysanız:
- Ya ortamın (\`env\`) kaynak kodunu değiştirip test için özel kodlar eklemeniz gerekir (kötü mimari!),
- Ya da ortamın kopyasını çıkarıp bakım maliyetini katlamanız gerekir.

**UVM Factory Çözümü:**
Ortam \`base_driver::type_id::create("drv", this)\` ile fabrika üzerinden nesne talep eder. Test sınıfı ise daha ortam inşa edilmeden fabrikaya şu talimatı verir: *"Bu test süresince kim senden base_driver isterse, ona sessizce error_driver üretip ver!"* Böylece ortam koduna tek bir satır dahi dokunmadan testbench polimorfik olarak dönüştürülür.`,
      },
      {
        title: "3. Fabrika Kaydı ve Nesne Üretimi",
        content: `Bir sınıfın fabrika ezme mekanizmasına katılabilmesi için iki şart vardır:
1. İlgili UVM makrosuyla fabrikaya kaydedilmiş olması:
\`\`\`systemverilog
// uvm_component turevleri icin (driver, monitor, agent, env, test)
class my_driver extends uvm_driver #(my_transaction);
  \`uvm_component_utils(my_driver)
  // ...
endclass

// uvm_object turevleri icin (transaction, sequence_item, sequence)
class my_transaction extends uvm_sequence_item;
  \`uvm_object_utils(my_transaction)
  // ...
endclass
\`\`\`
2. Nesnenin \`new()\` yerine statik \`type_id::create()\` metoduyla üretilmesi:
\`\`\`systemverilog
drv = my_driver::type_id::create("drv", this);
\`\`\``,
      },
      {
        title: "4. Type Override (Küresel Tür Değiştirme)",
        content: `Type Override, testbench genelinde talep edilen bir sınıf türünü her yerde türetilmiş bir alt sınıfla değiştirir.

Örnek senaryo: Standart \`base_agent\` yerine hata senaryoları için özelleştirilmiş \`child_agent\` kullanmak istiyoruz:

\`\`\`systemverilog
class child_agent extends base_agent;
  \`uvm_component_utils(child_agent)
  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction
  // Ozel fonksiyonlar, hata enjeksiyonu surucusu vb.
endclass

class my_test extends uvm_test;
  \`uvm_component_utils(my_test)
  base_env m_env;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    
    // FABRİKA EZME: base_agent istendiğinde child_agent üret!
    set_type_override_by_type(base_agent::get_type(), child_agent::get_type());

    // m_env olusturuldugunda icindeki create("agent", this) cagrisi
    // otomatik olarak child_agent nesnesi donecektir!
    m_env = base_env::type_id::create("m_env", this);
  endfunction
endclass
\`\`\`

Simülasyon sırasında \`uvm_factory::get().print()\` çağrıldığında ezme tablosu doğrulanır:
\`\`\`text
#### Factory Configuration (*)
Type Overrides:
Requested Type   Override Type
--------------   -------------
base_agent       child_agent
\`\`\``,
      },
      {
        title: "5. Instance Override (Yol Tabanlı Özelleştirme)",
        content: `Bazen aynı türden 4 adet agent'ınız olabilir (örneğin 4 portlu bir switch doğrulaması), ancak siz sadece 2. porttaki agent'ın driver'ını değiştirmek istersiniz. Bu durumda genel türü değil, yalnızca belirli bir hiyerarşik yolu ezen **Instance Override** kullanılır:

\`\`\`systemverilog
class my_test extends uvm_test;
  \`uvm_component_utils(my_test)
  base_env m_env;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    
    // Yalnizca m_env.m_agent_1 altindaki driver'i ozellestir
    set_inst_override_by_type(
      base_driver::get_type(),
      err_driver::get_type(),
      "m_env.m_agent_1.driver"
    );

    m_env = base_env::type_id::create("m_env", this);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "6. Kritik Kurallar ve Hata Ayıklama",
        content: `> [!CAUTION]
> **En Sık Yapılan Hata:** Fabrika ezme çağrısı (\`set_type_override...\`), ezilecek nesnelerin \`create()\` çağrısından **ÖNCE** yapılmalıdır! Eğer \`m_env\` oluşturulduktan sonra override çağrılırsa hiçbir etkisi olmaz; çünkü fabrika nesneleri geçmişe dönük olarak değiştiremez.

1. **Kalıtım Şartı:** Ezici sınıf (override class), ezilen orijinal sınıftan mutlaka kalıtım almalıdır (\`child_agent extends base_agent\`).
2. **Compile-Time Güvenliği:** \`_by_type\` metotları tercih edilmelidir (\`set_type_override_by_type\`). String tabanlı \`_by_name\` metotlarında yapılabilecek bir harf hatası derleme zamanında yakalanamaz.
3. **Fabrika Durumunu Görüntüleme:** Testinizin \`build_phase\` sonunda \`factory.print()\` çağırarak aktif override kurallarını terminalde görebilirsiniz.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Fabrika Ezme Mekanizması (Factory Override)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-factory-override.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Using new() — factory cannot intercept this
wb_pkt m_pkt = new("m_pkt");

// Using create() — factory can substitute type transparently
wb_pkt m_pkt = wb_pkt::type_id::create("m_pkt", this);`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Fabrika Ezme Mekanizması (Factory Override)",
      initialCode: `// Using new() — factory cannot intercept this
wb_pkt m_pkt = new("m_pkt");

// Using create() — factory can substitute type transparently
wb_pkt m_pkt = wb_pkt::type_id::create("m_pkt", this);`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Fabrika Ezme Mekanizması (Factory Override) doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir test senaryosunda tanımlanan 'set_type_override_by_type' çağrısının geçerli olabilmesi için nerede ve ne zaman çağrılması zorunludur?",
      options: ["connect_phase içinde, tüm TLM bağlantıları tamamlandıktan hemen sonra.", "Hedef bileşen hiyerarşisini oluşturan create() çağrısından önce, genellikle test sınıfının build_phase metodunda.", "run_phase içinde, ilk sequence başlatılmadan hemen önce.", "extract_phase içinde, scoreboard sonuçları toplanmadan önce."],
      correctIndex: 1,
      explanation: "Doğru! Fabrika ezme kuralları nesneler üretilmeden önce fabrikaya bildirilmelidir. create() çağrısı yapıldığı anda fabrika tabloya bakar ve ezme kuralı varsa yeni sınıfı üretir. create() çağrısından sonra yapılan override'ların geçmişe dönük hiçbir etkisi olmaz.",
    },
  },
  "configure-components": {
    id: "configure-components",
    badge: "Modül 6 • Fabrika (Factory) ve Konfigürasyon Veritabanı",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Bileşenlerini Yapılandırma: Knobs ve Konfigürasyon Sınıfları",
    subtitle: "Testbench ortamlarını parametrik düğmeler (knobs), uvm_object konfigürasyon sınıfları ve config_db ile dinamik olarak yönetme.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/active_passive_enum.png)
![UVM Mimari Şeması](/images/uvm/cfg_object.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM doğrulama ortamlarını farklı test senaryolarına göre dinamik olarak yapılandırma tekniklerini öğreneceksiniz:
- Testbench esnekliğini artıran yapılandırma parametreleri ve düğmeler (**knobs**).
- \`UVM_ACTIVE\` ve \`UVM_PASSIVE\` agent modları arasındaki yapısal farklar.
- Tek tek değişken aktarımı yerine Konfigürasyon Sınıfı (\`uvm_object\`) kullanmanın mühendislik avantajları.
- Konfigürasyon nesnelerinin hiyerarşik olarak yukarıdan aşağıya dağıtılması (**Top-Down Configuration**).
- \`uvm_config_db\` ile konfigürasyon nesnelerinin güvenli aktarımı.`,
      },
      {
        title: "2. Yapılandırılabilir Düğmeler (Knobs) ve Testbench Esnekliği",
        content: `İyi tasarlanmış bir UVM bileşeni, hiçbir zaman sabit kodlanmış (hardcoded) varsayımlara bağımlı olmamalıdır. Bir test senaryosu ortamın yapısını veya çalışma biçimini değiştirmek istediğinde, bileşenin sunduğu kontrol düğmelerini (knobs) kullanabilmelidir:

1. **Aktif / Pasif Agent Modu:**
   - **\`UVM_ACTIVE\`:** Agent bir \`driver\`, bir \`sequencer\` ve bir \`monitor\` oluşturur; DUT'ye aktif olarak sinyal sürer.
   - **\`UVM_PASSIVE\`:** Agent sadece bir \`monitor\` oluşturur; pinleri sadece dinler. Örneğin sistem seviyesi bir testbench'te DUT çıkışındaki bir arayüz için driver ve sequencer üretmeye gerek yoktur. Bu seçim \`is_active\` düğmesi ile yönetilir.
2. **Kapsama (Coverage) ve Denetleyici (Checker) Düğmeleri:**
   - Regresyon sürelerini kısaltmak amacıyla belirli testlerde fonksiyonel kapsama toplamayı (\`has_coverage = 0\`) veya protokol denetleyicilerini devre dışı bırakabilmek.
3. **Protokol Parametreleri:**
   - Veriyolu genişliği, saat frekansı, baud rate, timeout eşikleri ve FIFO derinlikleri gibi değişkenler.`,
      },
      {
        title: "3. UVM Konfigürasyon Mekanizması Mantığı",
        content: `UVM'in dahili konfigürasyon mekanizması, arkada iki sütunlu küresel bir tablo gibi çalışır:
- **Sol Sütun:** Değişkenin veya nesnenin benzersiz anahtarı / kapsam yolu (\`scope + field_name\`).
- **Sağ Sütun:** Saklanan değer veya nesne referansı.

Eğer tüm testbench bileşenleri bu tabloya erişebilirse, bilgi aktarımı çok kolaylaşır. Ancak her bileşenin her veriyi görmesi istenmez (örneğin AXI driver'ın I2C konfigürasyonunu görmesine gerek yoktur). Bu kısıtlama hiyerarşik yol kuralı ile sağlanır:

\`\`\`systemverilog
// Belirli bir kopeğe ozel ayar koyma
uvm_config_db #(int)::set(this, "*.wb_slaves[0]", "slave_id", 0);

// Tum test ortaminda gorunur sanal arayuz koyma
uvm_config_db #(virtual dut_if)::set(null, "uvm_test_top*", "vif", dut_if1);
\`\`\``,
      },
      {
        title: "4. Konfigürasyon Sınıfları (Configuration Objects) ile Kapsülleme",
        content: `Bir agent'a 15 farklı ayar aktarmanız gerektiğini hayal edin. Her biri için ayrı ayrı \`uvm_config_db::set\` ve \`get\` çağırmak kod karmaşasına ve olası yazım hatalarına yol açar.

Endüstri standardı en iyi pratik, ilgili tüm ayarları \`uvm_object\`'ten türeyen tek bir **Konfigürasyon Sınıfı** içinde toplamaktır:

\`\`\`systemverilog
class uart_agent_config extends uvm_object;
  \`uvm_object_utils(uart_agent_config)

  uvm_active_passive_enum  is_active = UVM_ACTIVE;
  int                      baud_rate = 115200;
  bit                      has_coverage = 1;
  virtual uart_if          vif;

  function new(string name = "uart_agent_config");
    super.new(name);
  endfunction
endclass
\`\`\`

**Konfigürasyon Sınıfı Kullanmanın Avantajları:**
- **Randomizasyon:** Parametreler \`rand\` olarak tanımlanıp kısıtlamalarla (\`constraints\`) rastgele test edilebilir.
- **Kalıtım:** İleride yeni bir özellik geldiğinde sınıf türetilerek genişletilebilir.
- **Tek Noktadan Aktarım:** 15 parametre yerine tek bir nesne referansı aktarılır.`,
      },
      {
        title: "5. Hiyerarşik Yayılım ve Doğrulama Ortamı Mimarisi",
        content: `Konfigürasyon nesnesi en üst düzey test sınıfında (\`my_test\`) üretilir, ayarlanır ve \`uvm_config_db\` aracılığıyla ortama verilir. Ortam da bu nesneyi alt agent'a iletir:

\`\`\`systemverilog
// Test sinifinda set
class my_test extends uvm_test;
  \`uvm_component_utils(my_test)
  uart_agent_config cfg;
  my_env            env;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    cfg = uart_agent_config::type_id::create("cfg");
    cfg.is_active = UVM_ACTIVE;
    cfg.baud_rate = 9600;

    // Arayuz referansini veritabanindan alip nesneye bagla
    void'(uvm_config_db#(virtual uart_if)::get(this, "", "vif", cfg.vif));

    // Agent'in erisebilmesi icin konfigürasyon nesnesini kaydet
    uvm_config_db#(uart_agent_config)::set(this, "env.agent", "cfg", cfg);

    env = my_env::type_id::create("env", this);
  endfunction
endclass

// Agent sinifinda get
class uart_agent extends uvm_agent;
  \`uvm_component_utils(uart_agent)
  uart_agent_config cfg;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if (!uvm_config_db#(uart_agent_config)::get(this, "", "cfg", cfg))
      \`uvm_fatal("NOCFG", "Agent konfigürasyon nesnesi bulunamadi!")

    // Sadece aktif modda driver ve sequencer olustur
    if (cfg.is_active == UVM_ACTIVE) begin
      drv  = uart_driver::type_id::create("drv", this);
      seqr = uart_sequencer::type_id::create("seqr", this);
    end
    mon = uart_monitor::type_id::create("mon", this);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Bileşenlerini Yapılandırma: Knobs ve Konfigürasyon Sınıfları** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "configure-components.sv - Örnek UVM Doğrulama Kodu",
          snippet: `uvm_config_db #(int) :: set (this, "*.wbSlaves[0]", "slave_id", 0);
uvm_config_db #(virtual dut_if)::set (null, "uvm_test_top", "dut_if", dut_if1);

uvm_resource_db #(myObj) :: set ("test", "shared_config", data, this);`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Bileşenlerini Yapılandırma: Knobs ve Konfigürasyon Sınıfları",
      initialCode: `uvm_config_db #(int) :: set (this, "*.wbSlaves[0]", "slave_id", 0);
uvm_config_db #(virtual dut_if)::set (null, "uvm_test_top", "dut_if", dut_if1);

uvm_resource_db #(myObj) :: set ("test", "shared_config", data, this);`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Bileşenlerini Yapılandırma: Knobs ve Konfigürasyon Sınıfları doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir UVM agent bileşenine aktarılacak 10'dan fazla yapılandırma ayarını (aktiflik, saat hızı, parite, arayüz vb.) yönetirken endüstri standardı en iyi yaklaşım hangisidir?",
      options: ["Her bir ayarı ayrı ayrı string anahtarlarla uvm_config_db üzerinden tek tek aktarmak.", "Tüm ayarları uvm_object'ten türeyen özel bir konfigürasyon sınıfında kapsülleyip bu nesneyi tek seferde uvm_config_db ile aktarmak.", "Tüm ayarları global SystemVerilog paket değişkenleri olarak tanımlayıp her yerden doğrudan erişmek.", "Ayarları bileşenin new() constructor fonksiyonuna çok sayıda parametre olarak eklemek."],
      correctIndex: 1,
      explanation: "Doğru! Ayarları tek bir uvm_object türevi konfigürasyon sınıfında toplamak hem kod temizliği sağlar, hem randomizasyon ve kısıtlama imkanı sunar, hem de tek bir config_db aktarımı ile tüm hiyerarşiye güvenle dağıtılmasını mümkün kılar.",
    },
  },
  "understanding-the-resource-database": {
    id: "understanding-the-resource-database",
    badge: "Modül 6 • Fabrika (Factory) ve Konfigürasyon Veritabanı",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Kaynak Veritabanını Anlamak: uvm_resource_db ve Resource Pool Mimarisi",
    subtitle: "UVM merkezi veri havuzunun iç mekanizması, uvm_resource_pool, tür/isim eşleme ve sanal arayüz (virtual interface) aktarımı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/resource_database.png)
![UVM Mimari Şeması](/images/uvm/resource_pool_queue.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in temel veri paylaşım omurgası olan Kaynak Veritabanını (Resource Database) inceleyeceksiniz:
- UVM Kaynak Veritabanı ve \`uvm_resource_pool\` mimarisinin çalışma prensibi.
- \`uvm_resource_db\` ile \`uvm_config_db\` arasındaki temel mimari ve hiyerarşik farklar.
- Kaynakların (Resources) yapısı: Tür tabanlı (by type) ve isim tabanlı (by name) indeksleme.
- En kritik kullanım alanı: En üst düzey modülden (\`top.sv\`) testbench sınıflarına Sanal Arayüz (\`virtual interface\`) aktarımı.
- Global değişken karmaşasından kurtulma ve yeniden kullanılabilirlik ilkeleri.`,
      },
      {
        title: "2. UVM Kaynak Veritabanı Nedir ve Nasıl Çalışır?",
        content: `Modern donanım doğrulamada farklı bileşenlerin ortak verilere erişmesi gerekir. Ancak bileşenlerin birbirlerinin iç değişkenlerine doğrudan erişmesi (sıkı bağlılık - tight coupling), yeniden kullanılabilirliği (reusability) tamamen yok eder.

UVM Kaynak Veritabanı, testbench içinde küresel bir duyuru panosu (**bulletin board**) gibi çalışır:
- İsteyen herhangi bir bileşen bu panoya bir bilgi asabilir (\`set\`).
- İhtiyacı olan herhangi bir bileşen panodan bu bilgiyi alıp kullanabilir (\`get\`).
- Parametrik sınıf yapısı sayesinde veritabanı tür güvenlidir (**type-safe**); bir integer beklenirken yanlışlıkla string okunması derleme zamanında engellenir.`,
      },
      {
        title: "3. uvm_resource_db vs uvm_config_db",
        content: `UVM kodlarında hem \`uvm_resource_db\` hem de \`uvm_config_db\` ile karşılaşırsınız. Bu iki yapı arasındaki ilişki şudur:

1. **\`uvm_resource_pool\`:** Bellekte tüm kaynakların tutulduğu tekil (singleton) depolama alanıdır.
2. **\`uvm_resource_db\`:** Bu havuza doğrudan erişim sağlayan genel amaçlı sınıftır. Hiyerarşik bağlamı (context) zorunlu tutmaz; verileri isim veya tür bazında saklar.
3. **\`uvm_config_db\`:** \`uvm_resource_db\` üzerine inşa edilmiş daha gelişmiş bir katmandır. Bileşenlerin hiyerarşik konumunu (\`cntxt\`), üst bileşenin alt bileşen ayarını ezme önceliğini (**precedence**) ve hiyerarşik yol çözümlemesini ekler.

> [!NOTE]
> Günlük UVM testbench geliştirmede daima \`uvm_config_db\` tercih edilmelidir. \`uvm_resource_db\` ise genellikle hiyerarşiden bağımsız, global araçlar ve kütüphaneler tarafından altta kullanılır.`,
      },
      {
        title: "4. Kaynak Veritabanının İç Yapısı: uvm_resource_pool",
        content: `\`uvm_resource_pool\`, kaynakları iki ayrı tabloda organize eder:
- **İsim Tablosu (\`rsrc_tab\`):** Kaynakları string etiketlere göre saklar.
- **Tip Tablosu (\`rtab\`):** Kaynakları veri türlerine (\`type T\`) göre gruplar.

Her kaynak ayrıca bir kapsam (**scope**) bilgisine sahiptir. Bir bileşen veritabanından bir kaynak talep ettiğinde, havuz hem isim/tip eşleşmesine hem de talep eden bileşenin hiyerarşik yolunun kaynak kapsamıyla uyuşup uyuşmadığına bakar.`,
      },
      {
        title: "5. En Temel Kullanım Senaryosu: Sanal Arayüz (Virtual Interface) Aktarımı",
        content: `SystemVerilog'da donanım sinyalleri statik \`module\` ve \`interface\` bloklarında yaşarken, UVM testbench'i dinamik \`class\` nesnelerinden oluşur. Dinamik sınıfların statik donanım pinlerini sürebilmesinin tek yolu **\`virtual interface\`** kullanmaktır.

Bu aktarımın standart yolu Kaynak / Konfigürasyon veritabanıdır:

\`\`\`systemverilog
// 1. En ust duzey SV modulu (top.sv)
module top;
  logic clk;
  logic rst_n;
  dut_if if_inst(clk, rst_n); // Fiziksel arayuz

  // DUT baglantisi
  my_dut dut (.clk(clk), .rst_n(rst_n), .bus(if_inst));

  initial begin
    // Fiziksel arayuzun sanal tanıtıcısını (virtual interface handle) veritabanina koy
    uvm_config_db#(virtual dut_if)::set(null, "uvm_test_top*", "vif", if_inst);
    
    run_test();
  end
endmodule
\`\`\`

\`\`\`systemverilog
// 2. Testbench Driver bileseni (my_driver.sv)
class my_driver extends uvm_driver #(my_item);
  \`uvm_component_utils(my_driver)
  virtual dut_if vif;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    
    // Veritabanindan sanal arayuzu cek
    if (!uvm_config_db#(virtual dut_if)::get(this, "", "vif", vif))
      \`uvm_fatal("NOVIF", "Driver icin sanal arayuz veritabaninda bulunamadi!")
  endfunction
  
  task run_phase(uvm_phase phase);
    // Donanim pinlerini sur
    @(posedge vif.clk);
    vif.valid <= 1'b1;
  endtask
endclass
\`\`\``,
      },
      {
        title: "6. Kaynak Veritabanının Avantajları ve Mühendislik İlkeleri",
        content: `- **Global Değişken Yokluğu:** Testbench'te \`$root\` veya global değişken kullanımını ortadan kaldırarak isim çakışmalarını önler.
- **Tip Güvenliği (Type Safety):** Yanlış bir veri tipiyle \`get\` yapılmaya çalışıldığında çalışma zamanında bellek bozulmalarını engeller.
- **Taşınabilirlik (Portability):** Bir \`driver\` bileşeni hangi testbench'te çalıştırılırsa çalıştırılsın, sadece \`vif\` adında bir sanal arayüz arar; ortamın geri kalanının nasıl bağlandığıyla ilgilenmez.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Kaynak Veritabanını Anlamak: uvm_resource_db ve Resource Pool Mimarisi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "understanding-the-resource-database.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// In your top-level SystemVerilog module (e.g., tb_top.sv)
module tb_top;
  import uvm_pkg::*;
  import ubus_pkg::*;

  ubus_if vif(); // SystemVerilog interface to the DUT

  dut_dummy dut(vif.sig_request, ..., vif.sig_error); // DUT instance

  initial begin
    automatic uvm_coreservice_t cs_ = uvm_coreservice_t::get();
    // Set the virtual interface in the global configuration database
    uvm_config_db#(virtual ubus_if)::set(cs_.get_root(), "*", "vif", vif);
    run_test();
  end
  // ... clock and reset generation ...
endmodule`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Kaynak Veritabanını Anlamak: uvm_resource_db ve Resource Pool Mimarisi",
      initialCode: `// In your top-level SystemVerilog module (e.g., tb_top.sv)
module tb_top;
  import uvm_pkg::*;
  import ubus_pkg::*;

  ubus_if vif(); // SystemVerilog interface to the DUT

  dut_dummy dut(vif.sig_request, ..., vif.sig_error); // DUT instance

  initial begin
    automatic uvm_coreservice_t cs_ = uvm_coreservice_t::get();
    // Set the virtual interface in the global configuration database
    uvm_config_db#(virtual ubus_if)::set(cs_.get_root(), "*", "vif", vif);
    run_test();
  end
  // ... clock and reset generation ...
endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Kaynak Veritabanını Anlamak: uvm_resource_db ve Resource Pool Mimarisi doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "'uvm_resource_db' ile 'uvm_config_db' arasındaki temel mimari fark nedir?",
      options: ["uvm_resource_db sadece tam sayıları (int) saklayabilirken, uvm_config_db yalnızca sanal arayüzleri saklayabilir.", "uvm_config_db, uvm_resource_db üzerine inşa edilmiş olup bileşen hiyerarşisi bağlamı (context) ve hiyerarşik öncelik (precedence) kurallarını ekler.", "uvm_resource_db simülasyon zamanı harcayan bir task iken, uvm_config_db sıfır zamanda çalışan bir fonksiyondur.", "uvm_config_db IEEE standardı dışındadır ve yalnızca eski simülatörlerde çalışır."],
      correctIndex: 1,
      explanation: "Doğru! uvm_resource_db genel amaçlı havuz erişimi sunarken, uvm_config_db onun üzerine hiyerarşik bileşen bağlamını (cntxt), yol eşlemeyi ve ebeveyn bileşenlerin alt bileşen ayarlarını ezebilmesini sağlayan öncelik kurallarını entegre eder.",
    },
  },
  "uvm-config-db": {
    id: "uvm-config-db",
    badge: "Modül 6 • Fabrika (Factory) ve Konfigürasyon Veritabanı",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "uvm_config_db API ve Metotları: set, get, exists ve wait_modified",
    subtitle: "Tür güvenli yapılandırma metotlarının derinlemesine analizi, geri dönüş değerleri, hata kontrolleri ve dinamik eşzamanlama.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/config-db-example.png)
![UVM Mimari Şeması](/images/uvm/resource.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM doğrulama projelerinde en sık kullanılan API olan \`uvm_config_db\` sınıfının tüm metotlarını öğreneceksiniz:
- \`uvm_config_db#(T)\` parametrik sınıf sözdizimi ve tür güvenliği.
- \`set()\` metodunun dört parametresi: \`cntxt\`, \`inst_name\`, \`field_name\` ve \`value\`.
- \`get()\` metodunun geri dönüş değeri (\`bit\`) ve ölümcül hataları (\`uvm_fatal\`) engelleme disiplini.
- \`exists()\` fonksiyonu ile varlık sorgulama.
- \`wait_modified()\` görevi ile çalışma zamanında parametre değişimlerini bekleme.
- Kısayol tipleri (\`uvm_config_int\`, \`uvm_config_string\`, \`uvm_config_object\`).`,
      },
      {
        title: "2. set() Metodunun İmzası ve Parametre Kuralları",
        content: `\`set()\` metodu, veritabanına bir değer veya nesne tanıtıcısı eklemek için kullanılır:

\`\`\`systemverilog
static function void set(
  uvm_component cntxt,      // 1. Baslangic bileseni baglami
  string        inst_name,  // 2. Hedef bilesenin goreli/mutlak yolu
  string        field_name, // 3. Degiskenin etiketi/adi
  T             value       // 4. Saklanacak deger veya nesne handle'i
);
\`\`\`

**Parametrelerin Anlamları:**
1. **\`cntxt\` (Context):** \`set\` çağrısını yapan bileşendir (\`this\`). Eğer çağrı bir modülden (\`top.sv\`) yapılıyorsa veya tam hiyerarşik yol veriliyorsa \`null\` geçilir.
2. **\`inst_name\`:** Değeri alacak bileşenin hedef yolu. Örneğin \`"env.agent.drv"\`, \`"*agent*"\` veya tüm hiyerarşi için \`"*"\`.
3. **\`field_name\`:** Değişkeni tanımlayan etiket string'i (örneğin \`"vif"\`, \`"bus_width"\`).
4. **\`value\`:** Saklanacak veri. T tipi ile tam olarak eşleşmelidir.`,
      },
      {
        title: "3. get() Metodu ve Güvenli Programlama Disiplini",
        content: `\`get()\` metodu veritabanından değeri okur ve verilen değişkene yazar:

\`\`\`systemverilog
static function bit get(
  uvm_component cntxt,      // Okumayi yapan bilesen (genellikle this)
  string        inst_name,  // Ek yol bilgisi (genellikle bos "")
  string        field_name, // Okunacak etiket
  inout T       value       // Degerin yazilacagi degisken
);
\`\`\`

> [!CAUTION]
> **Hayati Kural:** \`get()\` metodu geriye \`bit\` döndürür (bulunursa \`1\`, bulunamazsa \`0\`). Dönen değeri **asla kontrol etmeden geçmeyin!**

\`\`\`systemverilog
// GU蕪ENLI YAKLASIM:
if (!uvm_config_db#(virtual dut_if)::get(this, "", "vif", vif)) begin
  \`uvm_fatal("NOVIF", {"Sanal arayuz 'vif' alinamadi! Path: ", get_full_name()})
end
\`\`\`
Eğer bu kontrolü yapmazsanız ve \`get()\` başarısız olursa, \`vif\` değişkeni \`null\` kalır ve ileride \`vif.clk\` dendiğinde simülasyon çöker.`,
      },
      {
        title: "4. exists() ve wait_modified() Metotları",
        content: `**\`exists()\` Metodu:**
Bir ayarın veritabanında mevcut olup olmadığını değeri çekmeden kontrol eder:
\`\`\`systemverilog
if (uvm_config_db#(int)::exists(this, "", "cache_size")) begin
  \`uvm_info("CFG", "Ozel onbellek boyutu tanimli.", UVM_LOW)
end
\`\`\`

**\`wait_modified()\` Görevi:**
Simülasyon koşarken (\`run_phase\` sırasında) bir konfigürasyon ayarı başka bir bileşen tarafından güncellendiğinde tetiklenen bloklayıcı bir task'tır:
\`\`\`systemverilog
task run_phase(uvm_phase phase);
  forever begin
    // "freq_mhz" degeri set() ile her degistirildiginde uyan
    uvm_config_db#(int)::wait_modified(this, "", "freq_mhz");
    void'(uvm_config_db#(int)::get(this, "", "freq_mhz", current_freq));
    \`uvm_info("DRV", $sformatf("Saat frekansi guncellendi: %0d MHz", current_freq), UVM_LOW)
    update_clock_period();
  end
endtask
\`\`\``,
      },
      {
        title: "5. Kısayol Typedef'leri ve Kullanım Kolaylığı",
        content: `UVM, sık kullanılan veri türleri için her defasında \`#(...)\` sözdizimini yazmamak adına yerleşik typedef'ler sunar:

\`\`\`systemverilog
typedef uvm_config_db #(uvm_bitstream_t) uvm_config_int;
typedef uvm_config_db #(string)          uvm_config_string;
typedef uvm_config_db #(uvm_object)      uvm_config_object;
\`\`\`

Örneğin:
\`\`\`systemverilog
// uvm_config_db#(int)::set(...) yerine:
uvm_config_int::set(this, "env", "num_trans", 50);

// uvm_config_db#(string)::get(...) yerine:
uvm_config_string::get(this, "", "log_file", file_name);
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **uvm_config_db API ve Metotları: set, get, exists ve wait_modified** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-config-db.sv - Örnek UVM Doğrulama Kodu",
          snippet: `static function void set (  uvm_component cntxt,
	                            string        inst_name,
	                            string        field_name,
	                            T             value);

    // Calling set method
    uvm_config_db#(type T)::set(uvm_component cntxt, string inst_name, string field_name, T value);`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: uvm_config_db API ve Metotları: set, get, exists ve wait_modified",
      initialCode: `static function void set (  uvm_component cntxt,
	                            string        inst_name,
	                            string        field_name,
	                            T             value);

    // Calling set method
    uvm_config_db#(type T)::set(uvm_component cntxt, string inst_name, string field_name, T value);`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] uvm_config_db API ve Metotları: set, get, exists ve wait_modified doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "'uvm_config_db#(T)::get()' metodunun geri dönüş değeri kontrol edilmediğinde karşılaşılabilecek en büyük tehlike nedir?",
      options: ["Derleyici sözdizimi hatası vererek derlemeyi durdurur.", "Eğer aranan anahtar veritabanında yoksa değişken tanımsız/null kalır ve ileride bu değişkene erişildiğinde sessiz veri hataları veya ölümcül Null Pointer çökmeleri meydana gelir.", "Simülatör eksik değeri otomatik olarak sıfır ile doldurup uyarı verir.", "Simülasyon sonsuz döngüye girerek zaman aşımına uğrar."],
      correctIndex: 1,
      explanation: "Doğru! get() başarısız olduğunda (dönüş değeri 0) hedef değişken güncellenmez. Eğer bu bir sanal arayüz veya nesne tanıtıcısı ise null kalır. Kod çalışmaya devam edip null referansa eriştiğinde simülatör çöker. Bu yüzden her get() çağrısı mutlaka if (!...::get(...)) `uvm_fatal(...) kalıbıyla denetlenmelidir.",
    },
  },
  "uvm-config-db-examples": {
    id: "uvm-config-db-examples",
    badge: "Modül 6 • Fabrika (Factory) ve Konfigürasyon Veritabanı",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Pratik uvm_config_db Örnekleri ve Hata Ayıklama (+UVM_CONFIG_DB_TRACE)",
    subtitle: "Test, Env ve çoklu Agent hiyerarşilerinde kapsam çözümleme kuralları, joker (*) karakterler ve simülasyon log analizi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, \`uvm_config_db\`'nin karmaşık hiyerarşilerde nasıl çalıştığını pratik kodlar ve simülatör hata ayıklama teknikleriyle pekiştireceksiniz:
- Kapsam çözümleme kuralları: \`{cntxt, ".", inst_name}\` birleşimi.
- Hiyerarşik öncelik kuralları: Üst katmanların alt katmanlara üstünlüğü (**precedence**).
- Joker karakterler (\`*\`) ile geniş kapsamlı konfigürasyon dağıtımı.
- \`+UVM_CONFIG_DB_TRACE\` simülatör komut satırı argümanı ile derinlemesine izleme.
- Adım adım kod örnekleri: Test-Env ve Test-Env-Çoklu Agent yapılandırmaları.
- En sık yapılan 5 konfigürasyon hatası ve çözüm kontrol listesi.`,
      },
      {
        title: "2. Kapsam (Scope) Çözümleme ve Öncelik Kuralları",
        content: `\`uvm_config_db\` içinde tam arama yolu şu kurala göre oluşturulur:
- Eğer \`cntxt != null\` ise: Yol \`{cntxt.get_full_name(), ".", inst_name}\` olarak hesaplanır.
- Eğer \`cntxt == null\` ise: \`inst_name\` doğrudan tam yol olarak kabul edilir.

**Öncelik Kuralları (Precedence Rules):**
1. **Farklı Hiyerarşi Seviyeleri:** Hiyerarşide daha yukarıda olan bileşenin yaptığı \`set\` çağrısı, daha aşağıda olan bileşenin ayarını ezer! Örneğin \`test\` sınıfının yaptığı ayar, \`env\` sınıfının yaptığı ayara göre daima önceliklidir.
2. **Aynı Hiyerarşi Seviyesi:** Aynı seviyedeki bir bileşen aynı değişken için iki kez \`set\` çağırırsa, **son yapılan ayar geçerli olur** (last write wins).`,
      },
      {
        title: "3. +UVM_CONFIG_DB_TRACE ile Canlı Hata Ayıklama",
        content: `Bir değişkenin neden okunamadığını veya hangi bileşen tarafından ezildiğini anlamanın en etkili yolu, simülatörü \`+UVM_CONFIG_DB_TRACE\` bayrağı ile çalıştırmaktır:

\`\`\`bash
# Simulatorde trace bayragini aktif etme
vsim +UVM_CONFIG_DB_TRACE ...
# veya
xrun +UVM_CONFIG_DB_TRACE ...
\`\`\`

Bu bayrak açıldığında simülasyon logunda tüm \`set\` ve \`get\` işlemleri detaylıca listelenir:
\`\`\`text
UVM_INFO @ 0: reporter [CFGDB/SET] Configuration 'uvm_test_top.Friend' (type string) set by uvm_test_top = (string) "Joey"
UVM_INFO @ 0: reporter [CFGDB/GET] Configuration 'uvm_test_top.base_env.recording_detail' read by uvm_test_top.base_env = null (failed lookup)
UVM_INFO @ 0: reporter [CFGDB/GET] Configuration 'uvm_test_top.Friend' (type string) read by uvm_test_top.base_env = (string) "Joey"
\`\`\`
Logdaki \`(failed lookup)\` ibaresi, aranan yol veya etiketle eşleşen bir kaydın veritabanında bulunamadığını gösterir.`,
      },
      {
        title: "4. Örnek 1: Test ve Env Arasında Parametre Aktarımı",
        content: `Aşağıdaki örnekte test sınıfı bir string değişkeni veritabanına koyar ve ortam sınıfı bunu kendi \`build_phase\` metodunda okur:

\`\`\`systemverilog
class base_test extends uvm_test;
  \`uvm_component_utils(base_test)
  base_env m_env;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    
    // Yontem A: cntxt = null, tam yol "uvm_test_top"
    // uvm_config_db#(string)::set(null, "uvm_test_top", "Friend", "Joey");
    
    // Yontem B (Tavsiye edilen): cntxt = this, hedef bos string ""
    uvm_config_db#(string)::set(this, "", "Friend", "Joey");

    m_env = base_env::type_id::create("m_env", this);
  endfunction
endclass

class base_env extends uvm_env;
  \`uvm_component_utils(base_env)
  string friend_name;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if (uvm_config_db#(string)::get(this, "", "Friend", friend_name))
      \`uvm_info("ENV", $sformatf("Bulunan deger: %s", friend_name), UVM_LOW)
    else
      \`uvm_error("ENV", "'Friend' parametresi alinamadi!")
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. Örnek 2: Joker Karakter (*) ile Çoklu Agent Yapılandırma",
        content: `Ortamınızda birden fazla agent varsa (\`m_agent0\`, \`m_agent1\`), her birine ayrı ayrı ayar yapmak yerine joker karakterler (\`*\`) kullanabilirsiniz:

\`\`\`systemverilog
class my_test extends uvm_test;
  \`uvm_component_utils(my_test)
  my_env m_env;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    
    // m_env altindaki TUM agent'lara ortak timeout degeri ata:
    uvm_config_db#(int)::set(this, "m_env.*agent*", "timeout_cycles", 500);

    m_env = my_env::type_id::create("m_env", this);
  endfunction
endclass
\`\`\`

Her iki agent'ın \`build_phase\` metodundaki \`get(this, "", "timeout_cycles", timeout)\` çağrısı başarıyla 500 değerini elde edecektir.`,
      },
      {
        title: "6. En Sık Yapılan Hatalar Kontrol Listesi",
        content: `1. **Tip Uyuşmazlığı:** \`set\` işleminde \`int\` yazıp, \`get\` işleminde \`bit [31:0]\` aramak. Türler tam olarak uyuşmalıdır.
2. **Fazlama Sırası Hatası:** Bir bileşenin \`connect_phase\` içinde \`set\` yapıp, alt bileşenin \`build_phase\` içinde bunu okumasını beklemek. \`build_phase\` önce çalışıp bittiği için get işlemi başarısız olur.
3. **super.build_phase() Çağrısının Unutulması:** UVM otomatik alan mekanizmalarının çalışabilmesi için \`super.build_phase(phase)\` çağrılmalıdır.
4. **Harf Hataları (Typos):** \`field_name\` string'inde küçük/büyük harf veya boşluk hataları.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Pratik uvm_config_db Örnekleri ve Hata Ayıklama (+UVM_CONFIG_DB_TRACE)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-config-db-examples.sv - Örnek UVM Doğrulama Kodu",
          snippet: `static function void set (  uvm_component   cntxt,
                            string          inst_name,
                            string          field_name,
                            T               value);

static function bit get (   uvm_component  cntxt,
                            string         inst_name,
                            string         field_name,
                      inout T              value);`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Pratik uvm_config_db Örnekleri ve Hata Ayıklama (+UVM_CONFIG_DB_TRACE)",
      initialCode: `static function void set (  uvm_component   cntxt,
                            string          inst_name,
                            string          field_name,
                            T               value);

static function bit get (   uvm_component  cntxt,
                            string         inst_name,
                            string         field_name,
                      inout T              value);`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Pratik uvm_config_db Örnekleri ve Hata Ayıklama (+UVM_CONFIG_DB_TRACE) doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "UVM simülasyonu çalışırken tüm uvm_config_db set ve get işlemlerini, arama yollarını ve eşleşme durumlarını log terminaline dökmek için hangi komut satırı argümanı kullanılır?",
      options: ["+UVM_PHASE_TRACE", "+UVM_CONFIG_DB_TRACE", "+UVM_VERBOSITY=DEBUG", "+UVM_OBJECTION_TRACE"],
      correctIndex: 1,
      explanation: "Doğru! '+UVM_CONFIG_DB_TRACE' argümanı simülatöre verildiğinde, UVM çalışma anındaki tüm set ve get çağrılarını, veri tiplerini ve başarılı/başarısız lookup durumlarını detaylı olarak log dosyasına döker.",
    },
  },
  "uvm-tlm": {
    id: "uvm-tlm",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM TLM Temelleri: İşlem Seviyesinde Modelleme (Transaction-Level Modeling)",
    subtitle: "Bileşenler arası soyut veri iletişimi, Port, Export ve Imp mimarisi, bloklayan ve bloklamayan haberleşme felsefesi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/tlm.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in bileşenler arası haberleşme standardı olan TLM (Transaction Level Modeling) mimarisini öğreneceksiniz:
- TLM kavramı ve donanım doğrulamasındaki kritik rolü.
- Sinyal seviyesindeki (pin-level) karmaşıklıktan işlem/paket seviyesine soyutlama.
- Üç temel yapı taşı: **Port**, **Export** ve **Imp** (Implementation).
- Bloklayan (**Blocking**) ve Bloklamayan (**Non-blocking**) iletişim modelleri.
- TLM-1 kanal türleri (\`put\`, \`get\`, \`analysis\`) ve TLM-2.0 soket mimarisi.`,
      },
      {
        title: "2. TLM Nedir ve Testbench Tasarımında Neden Vazgeçilmezdir?",
        content: `Klasik testbench yapılarında bileşenler birbirine doğrudan SystemVerilog sinyalleri veya somut değişkenler üzerinden bağlanırdı. Örneğin bir paket üretici, alıcının içindeki belirli bir diziye erişip eleman eklerdi. Bu durum bileşenleri birbirine bağımlı (tightly coupled) kılar ve bir bileşeni başka projede kullanmayı imkansız hale getirir.

**TLM Çözümü:**
TLM, bileşenler arasındaki haberleşmeyi standartlaştırılmış metot çağrılarına (\`put()\`, \`get()\`, \`write()\`) dönüştürür:
- Bir \`sequencer\`, veriyi alan \`driver\`'ın hangi arayüzü kullandığını bilmek zorunda değildir.
- Bir \`monitor\`, paketi gönderdiği \`scoreboard\`'un hafıza modelini bilmek zorunda değildir.
- İletişim tamamen soyut nesneler (\`uvm_sequence_item\`) üzerinden yürütülür.`,
      },
      {
        title: "3. Üçlü Mimari: Port, Export ve Imp Kavramları",
        content: `UVM TLM mimarisi üç farklı arayüz rolü üzerine kuruludur:

\`\`\`
[ Bilesen A (Port) ] ----> [ Bilesen B (Export) ] ----> [ Bilesen C (Imp) ]
   (Cagriyi Yapar)            (Iletir / Gecit)           (Gorevi Gercekler)
\`\`\`

1. **Port (Başlatıcı):** İletişim metodunu çağıran taraftır. Örneğin \`m_put_port.put(pkt)\`. İçinde metodun gerçek kodu bulunmaz; sadece metodun çağrılacağını taahhüt eder.
2. **Export (Geçit / İletici):** Hiyerarşik sarmalayıcılarda (örneğin bir \`agent\` veya \`env\`) işlemi bir üst veya alt katmana yönlendiren arayüzdür.
3. **Imp (Gerçekleyici / Implementation):** Çağrılan metodun SystemVerilog kod gövdesini fiziksel olarak barındıran nihai bileşendir.

> [!IMPORTANT]
> **Altın Kural:** Bir TLM bağlantı zinciri nerede başlarsa başlasın, eninde sonunda mutlaka bir **Imp** ile sonlanmak zorundadır! Metodu çalıştıran kod Imp içindedir.`,
      },
      {
        title: "4. İletişim Modelleri: Bloklayan vs Bloklamayan",
        content: `UVM TLM iki temel yürütme modeli sunar:

| Özellik | Bloklayan (Blocking) | Bloklamayan (Non-blocking) |
| :--- | :--- | :--- |
| **Metot Türü** | \`task\` (zaman tüketebilir) | \`function\` (sıfır simülasyon zamanı) |
| **İşlem Tamamlanması** | Karşı taraf hazır olana kadar bekler | Anında geri döner, başarı bayrağı (\`bit\`) döner |
| **Metot İsimleri** | \`put()\`, \`get()\`, \`peek()\` | \`try_put()\`, \`can_put()\`, \`try_get()\`, \`can_get()\` |
| **Kullanım Yeri** | Driver-Sequencer, FIFO transferleri | Çoklu kanal dinleme, zaman kritik kontrol mekanizmaları |`,
      },
      {
        title: "5. UVM TLM Kanal Aileleri Genel Bakış",
        content: `1. **Tek Yönlü Kanallar (Unidirectional):**
   - **Put Kanalları:** Veriyi üreten taraf veriyi hedefe iter (\`push\`).
   - **Get Kanalları:** Veriye ihtiyaç duyan taraf sağlayıcıdan veriyi çeker (\`pull\`).
2. **İki Yönlü Kanallar (Bidirectional):**
   - **Transport Kanalları:** Bir istek gönderip aynı çağrı içinde yanıt alır (Request-Response).
3. **Çoklu Yayın (Broadcast) - Analiz Portları:**
   - **\`uvm_analysis_port\`:** Tek bir monitörden Scoreboard, Coverage Collector ve Logger gibi birden çok aboneye aynı anda paketi kopyalar (\`1-to-many\`).`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM TLM Temelleri: İşlem Seviyesinde Modelleme (Transaction-Level Modeling)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-tlm.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class simple_packet extends uvm_object;
	\`uvm_object_utils (simple_packet)
	
	rand bit [7:0] addr;
	rand bit [7:0] data;
		 bit 		rwb;
	
	constraint c_addr { addr > 8'h2a; };
	constraint c_data { data inside {[8'h14:8'he9]};
	
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM TLM Temelleri: İşlem Seviyesinde Modelleme (Transaction-Level Modeling)",
      initialCode: `class simple_packet extends uvm_object;
	\`uvm_object_utils (simple_packet)
	
	rand bit [7:0] addr;
	rand bit [7:0] data;
		 bit 		rwb;
	
	constraint c_addr { addr > 8'h2a; };
	constraint c_data { data inside {[8'h14:8'he9]};
	
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM TLM Temelleri: İşlem Seviyesinde Modelleme (Transaction-Level Modeling) doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "UVM TLM mimarisinde çağrılan bir metodun (örneğin put() veya get()) SystemVerilog kod gövdesini fiziksel olarak barındıran ve işlemi yürüten nihai bileşen hangisidir?",
      options: ["uvm_*_port", "uvm_*_export", "uvm_*_imp (Implementation)", "uvm_tlm_fifo"],
      correctIndex: 2,
      explanation: "Doğru! Port çağrıyı yapan arayüzdür, Export işlemi hiyerarşide yönlendiren geçittir. Metodun gerçek kod gövdesini (implementasyonunu) barındıran ve yürüten nihai eleman ise daima uvm_*_imp bileşenidir.",
    },
  },
  "uvm-tlm-blocking-put-port": {
    id: "uvm-tlm-blocking-put-port",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM TLM Bloklayan Put Portu (uvm_blocking_put_port)",
    subtitle: "İşlem paketlerinin uvm_blocking_put_port ve uvm_blocking_put_imp ile tek yönlü bloklayıcı transferi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/tlm.png)
![UVM Mimari Şeması](/images/uvm/tlm-put.gif)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in en temel tek yönlü (unidirectional) TLM iletişim kanalı olan Bloklayan Put (Blocking Put) arayüzünü inceleyeceksiniz:
- Bloklayan Put (\`uvm_blocking_put_port\`) mekanizmasının çalışma mantığı.
- Veri paketi nesnesi (\`Packet\`) tasarımı ve \`uvm_sequence_item\` alan makroları.
- Gönderici (Initiator / Component A) bileşeninde port tanımlama ve \`put()\` göreviyle veri sürme.
- Alıcı (Target / Component B) bileşeninde \`uvm_blocking_put_imp\` tanımlama ve \`put()\` görevini gerçekleme.
- Bloklama davranışının simülasyonda analizi (gecikmeli alıcı senaryosu).
- \`connect_phase\` içinde port-to-imp bağlantısının kurulması ve hata yönetimi.`,
      },
      {
        title: "2. Veri Paketi (Packet) Tasarımı",
        content: `Bileşenler arasında aktarılacak veri nesnesi, \`uvm_sequence_item\` veya \`uvm_object\` sınıfından türetilir. Bu nesne içerisinde rastgele üretilebilecek (\`rand\`) alanlar tanımlanır ve UVM alan makroları (\`field macros\`) ile donatılır:

\`\`\`systemverilog
class Packet extends uvm_object;
  rand bit [7:0] addr;
  rand bit [7:0] data;

  \`uvm_object_utils_begin(Packet)
    \`uvm_field_int(addr, UVM_DEFAULT)
    \`uvm_field_int(data, UVM_DEFAULT)
  \`uvm_object_utils_end

  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "3. Gönderici Bileşen (Component A) ve put() Çağrısı",
        content: `Gönderici bileşen (\`componentA\`), işlemi başlatan taraftır. İçerisinde \`uvm_blocking_put_port #(Packet)\` türünde bir port tanımlar:

\`\`\`systemverilog
class componentA extends uvm_component;
  \`uvm_component_utils(componentA)

  // Packet tipinde veri gonderen bloklayan put portu
  uvm_blocking_put_port #(Packet) put_port;

  function new(string name = "componentA", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    // Port nesnesi mutlaka build_phase icinde olusturulmalidir
    put_port = new("put_port", this);
  endfunction

  virtual task run_phase(uvm_phase phase);
    Packet pkt;
    phase.raise_objection(this);

    repeat (3) begin
      pkt = Packet::type_id::create("pkt");
      assert(pkt.randomize());
      \`uvm_info("COMP_A", $sformatf("Paket gonderiliyor: addr=0x%0h data=0x%0h", pkt.addr, pkt.data), UVM_LOW)
      
      // BLOKLAYAN CAGRI: Hedef bilesen put() gorevini tamamlayana kadar bekler!
      put_port.put(pkt);
    end

    phase.drop_objection(this);
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Alıcı Bileşen (Component B) ve put() Görevinin Gerçeklenmesi",
        content: `Alıcı bileşen (\`componentB\`), işlemi kabul eden ve metodun gerçek kodunu yürüten taraftır. Bu nedenle bir **Imp** (\`uvm_blocking_put_imp\`) tanımlar ve \`put()\` task'ını gövdesiyle birlikte yazar:

\`\`\`systemverilog
class componentB extends uvm_component;
  \`uvm_component_utils(componentB)

  // 1. Parametre: Veri tipi (Packet), 2. Parametre: Bu metodu gerceklestiren sinif (componentB)
  uvm_blocking_put_imp #(Packet, componentB) put_imp;

  function new(string name = "componentB", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    put_imp = new("put_imp", this);
  endfunction

  // put() gorevinin gercek kod blogu (Implementation)
  virtual task put(Packet pkt);
    \`uvm_info("COMP_B", $sformatf("Paket basariyla alindi: addr=0x%0h data=0x%0h", pkt.addr, pkt.data), UVM_LOW)
  endtask
endclass
\`\`\``,
      },
      {
        title: "5. Bloklama Davranışının Simülasyon Analizi",
        content: `\`uvm_blocking_put_port\` arayüzünün en kritik özelliği **bloklayıcı** olmasıdır. Eğer alıcı bileşenin \`put()\` task'ı içinde simülasyon zamanı tüketen bir işlem veya gecikme varsa (örneğin \`#20ns\`), gönderici bileşen \`put()\` satırında askıya alınır ve ancak 20ns sonra bir sonraki satıra geçebilir:

\`\`\`systemverilog
// componentB icindeki put gorevine gecikme eklenirse:
virtual task put(Packet pkt);
  \`uvm_info("COMP_B", "Paket alindi, isleniyor... (20ns gecikme)", UVM_LOW)
  #20ns; // Donanim mesguliyetini veya kuyruk beklemesini modelleme
  \`uvm_info("COMP_B", "Paket islendi, put() tamamlandi.", UVM_LOW)
endtask
\`\`\`

**Simülasyon Log Çıktısı:**
\`\`\`text
UVM_INFO @ 0 ns: uvm_test_top.env.compA [COMP_A] Paket gonderiliyor: addr=0x3a data=0x12
UVM_INFO @ 0 ns: uvm_test_top.env.compB [COMP_B] Paket alindi, isleniyor... (20ns gecikme)
UVM_INFO @ 20 ns: uvm_test_top.env.compB [COMP_B] Paket islendi, put() tamamlandi.
UVM_INFO @ 20 ns: uvm_test_top.env.compA [COMP_A] Paket gonderiliyor: addr=0xbc data=0x74
UVM_INFO @ 20 ns: uvm_test_top.env.compB [COMP_B] Paket alindi, isleniyor... (20ns gecikme)
UVM_INFO @ 40 ns: uvm_test_top.env.compB [COMP_B] Paket islendi, put() tamamlandi.
\`\`\`
Görüldüğü üzere \`compA\`, alıcının işlemi bitirmesini 20ns boyunca beklemiştir.`,
      },
      {
        title: "6. connect_phase İçinde Bağlantı ve Hata Yönetimi",
        content: `Bileşenlerin port ve imp arayüzleri, üst sarmalayıcı sınıfın (genellikle \`my_env\` veya \`my_test\`) \`connect_phase\` metodunda birbirine bağlanır:

\`\`\`systemverilog
class my_env extends uvm_env;
  \`uvm_component_utils(my_env)
  componentA compA;
  componentB compB;

  // build_phase icinde create edildikten sonra...
  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Port ile Imp baglantisi
    compA.put_port.connect(compB.put_imp);
  endfunction
endclass
\`\`\`

> [!WARNING]
> Eğer \`compA.put_port\` bağlanmadan bırakılırsa, simülatör \`run_phase\` sırasında \`Connection Error: Port not connected\` ölümcül hatasını fırlatacaktır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM TLM Bloklayan Put Portu (uvm_blocking_put_port)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-tlm-blocking-put-port.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Create a class data object that can be sent from one 
// component to another
class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
  
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(addr, UVM_ALL_ON)
  	\`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM TLM Bloklayan Put Portu (uvm_blocking_put_port)",
      initialCode: `// Create a class data object that can be sent from one 
// component to another
class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
  
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(addr, UVM_ALL_ON)
  	\`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM TLM Bloklayan Put Portu (uvm_blocking_put_port) doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Gönderici bileşen 'put_port.put(pkt)' metodunu çağırdığında, alıcı bileşenin 'put()' metodu içerisinde '#50ns' gecikme varsa simülasyonda ne gerçekleşir?",
      options: ["Gönderici gecikmeyi beklemeden hemen bir sonraki satıra geçer ve yeni paket üretir.", "Gönderici iş parçacığı (thread), alıcının put() görevi 50 ns sonra tamamlanana kadar bloke olur ve bekler.", "Simülatör tip uyuşmazlığı hatası vererek çalışmayı sonlandırır.", "Paket havuzda kaybolur ve alıcı tarafından işlenemez."],
      correctIndex: 1,
      explanation: "Doğru! 'uvm_blocking_put_port' bir task arayüzüdür ve bloklayıcıdır. Hedef bileşenin put() metodu tamamlanmadan çağıran koda geri dönülmez. Dolayısıyla alıcıdaki 50ns'lik gecikme göndericiyi de 50ns boyunca bekletir.",
    },
  },
  "uvm-tlm-blocking-get-port": {
    id: "uvm-tlm-blocking-get-port",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM TLM Bloklayan Get Portu (uvm_blocking_get_port)",
    subtitle: "Alıcı tarafından tetiklenen çekme (pull) modeli, uvm_blocking_get_port ve uvm_blocking_get_imp kullanımı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/tlm-get.png)
![UVM Mimari Şeması](/images/uvm/tlm-get.gif)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in istek tabanlı veri çekme mekanizması olan Bloklayan Get (Blocking Get) arayüzünü inceleyeceksiniz:
- Bloklayan Get (\`uvm_blocking_get_port\`) mimarisi ve Çekme (**Pull**) modeli.
- İtme (Push - Put) modeli ile Çekme (Pull - Get) modeli arasındaki yapısal farklar.
- İstekçi (Consumer / Component B) bileşeninde get portu tanımlama ve \`get()\` çağırma.
- Sağlayıcı (Provider / Component A) bileşeninde \`uvm_blocking_get_imp\` tanımlama ve \`get()\` görevini gerçekleme.
- Sağlayıcı gecikmelerinin tüketiciyi nasıl blokladığının simülasyon analizi.
- Endüstriyel kullanım senaryosu: Sequencer-Driver arasındaki veri akışı.`,
      },
      {
        title: "2. Get Portu Mimarisi ve Pull Modeli",
        content: `TLM Put modelinde veriyi üreten taraf veriyi hedefe doğru iter (**push**). Ancak donanım doğrulama dünyasında çoğu zaman alıcı bileşen kendi hızında çalışır ve yeni bir paketi ancak kendisi hazır olduğunda talep etmek ister.

İşte bu senaryoda **TLM Get (Pull)** modeli devreye girer:
- **Tüketici (Consumer):** Veriye ihtiyaç duyduğunda \`get()\` metodunu çağırır.
- **Sağlayıcı (Provider):** \`get()\` metodu çağrıldığında paketi üretir veya kuyruktan çıkarıp \`output\` argümanı üzerinden geri döndürür.
- Eğer sağlayıcıda o anda hazır bir paket yoksa, tüketici veri gelene kadar **bloke olur (bekler)**.`,
      },
      {
        title: "3. Tüketici Bileşen (Consumer / Component B) Tasarımı",
        content: `Tüketici bileşen, portu başlatan taraftır ve \`uvm_blocking_get_port #(Packet)\` kullanır:

\`\`\`systemverilog
class componentB extends uvm_component;
  \`uvm_component_utils(componentB)

  // Veri talep eden get portu
  uvm_blocking_get_port #(Packet) get_port;

  function new(string name = "componentB", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    get_port = new("get_port", this);
  endfunction

  virtual task run_phase(uvm_phase phase);
    Packet pkt;
    phase.raise_objection(this);

    repeat (3) begin
      \`uvm_info("COMP_B", "Saglayicidan paket talep ediliyor (get)...", UVM_LOW)
      
      // BLOKLAYAN GET CAGRISI: Saglayici paketi dondurene kadar bekler
      get_port.get(pkt);

      \`uvm_info("COMP_B", $sformatf("Paket basariyla alindi: addr=0x%0h data=0x%0h", pkt.addr, pkt.data), UVM_LOW)
    end

    phase.drop_objection(this);
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Sağlayıcı Bileşen (Provider / Component A) Tasarımı",
        content: `Sağlayıcı bileşen \`uvm_blocking_get_imp\` tanımlar ve \`get(output Packet pkt)\` görevini gerçekler:

\`\`\`systemverilog
class componentA extends uvm_component;
  \`uvm_component_utils(componentA)

  // 1. Parametre: Veri tipi, 2. Parametre: Metodu uygulayan sinif
  uvm_blocking_get_imp #(Packet, componentA) get_imp;

  function new(string name = "componentA", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    get_imp = new("get_imp", this);
  endfunction

  // get() gorevinin gerceklenmesi (output argumani ile nesne dondurulur)
  virtual task get(output Packet pkt);
    #20ns; // Paketin hazirlanmasi icin gereken donanim gecikmesi
    pkt = Packet::type_id::create("pkt");
    assert(pkt.randomize());
    \`uvm_info("COMP_A", $sformatf("Paket hazirlandi ve donduruluyor: addr=0x%0h", pkt.addr), UVM_LOW)
  endtask
endclass
\`\`\``,
      },
      {
        title: "5. Bloklama Davranışının Doğrulanması ve Log Analizi",
        content: `Tüketici \`get_port.get(pkt)\` dediğinde, sağlayıcının içindeki 20ns gecikme nedeniyle tüketici de 20ns boyunca o satırda bekler:

\`\`\`text
UVM_INFO @ 0 ns: uvm_test_top.env.compB [COMP_B] Saglayicidan paket talep ediliyor (get)...
UVM_INFO @ 20 ns: uvm_test_top.env.compA [COMP_A] Paket hazirlandi ve donduruluyor: addr=0x42
UVM_INFO @ 20 ns: uvm_test_top.env.compB [COMP_B] Paket basariyla alindi: addr=0x42 data=0xa1
UVM_INFO @ 20 ns: uvm_test_top.env.compB [COMP_B] Saglayicidan paket talep ediliyor (get)...
UVM_INFO @ 40 ns: uvm_test_top.env.compA [COMP_A] Paket hazirlandi ve donduruluyor: addr=0x99
UVM_INFO @ 40 ns: uvm_test_top.env.compB [COMP_B] Paket basariyla alindi: addr=0x99 data=0x5f
\`\`\`

Görüldüğü gibi paket akışı üreticinin keyfine göre değil, tüketicinin talep ettiği anlarda gerçekleşmektedir.`,
      },
      {
        title: "6. Put vs Get Karşılaştırmalı Tasarım Rehberi",
        content: `| Karşılaştırma Noktası | Bloklayan Put (Push) | Bloklayan Get (Pull) |
| :--- | :--- | :--- |
| **İnisiyatifi Alan** | Veri Üreticisi (Producer) | Veri Tüketicisi (Consumer) |
| **Port Sahibi** | Gönderici (\`m_put_port\`) | Alıcı (\`m_get_port\`) |
| **Imp Sahibi** | Alıcı (\`m_put_imp\`) | Sağlayıcı (\`m_get_imp\`) |
| **Metot İmzası** | \`task put(T t)\` | \`task get(output T t)\` |
| **Tipik UVM Kullanımı** | Transactor çıkışları, loglayıcılar | \`uvm_driver\`'ın Sequencer'dan işlem çekmesi (\`seq_item_port.get_next_item\`) |`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM TLM Bloklayan Get Portu (uvm_blocking_get_port)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-tlm-blocking-get-port.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Create a class data object that can be sent from one 
// component to another
class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
  
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(addr, UVM_ALL_ON)
  	\`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM TLM Bloklayan Get Portu (uvm_blocking_get_port)",
      initialCode: `// Create a class data object that can be sent from one 
// component to another
class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
  
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(addr, UVM_ALL_ON)
  	\`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM TLM Bloklayan Get Portu (uvm_blocking_get_port) doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "UVM TLM Blocking Get mekanizmasında veri akışı ve metot çağrı yönü ile ilgili hangisi doğrudur?",
      options: ["Veriyi üreten bileşen metodu çağırır ve veriyi hedefe doğru iter (push).", "Veriye ihtiyaç duyan alıcı bileşen get() metodunu çağırarak sağlayıcıdan veriyi talep eder ve çeker (pull).", "Her iki bileşen de eşzamanlı olarak birbirine broadcast yayını yapar.", "Veri akışı yalnızca connect_phase sırasında gerçekleşir, run_phase'de veri taşınamaz."],
      correctIndex: 1,
      explanation: "Doğru! Blocking Get mekanizmasında inisiyatif alıcıdadır (Pull modeli). Alıcı get() çağrısını yapar, sağlayıcı metot içinde paketi oluşturup output parametresiyle alıcıya teslim eder.",
    },
  },
  "uvm-tlm-example": {
    id: "uvm-tlm-example",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Kapsamlı UVM TLM Hiyerarşi ve FIFO Entegrasyon Örneği",
    subtitle: "Farklı hızlardaki alt bileşenleri uvm_tlm_fifo ile köprüleme, hiyerarşik port yönlendirme ve uçtan uca veri akışı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/tlm-hier.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, gerçek dünya SoC doğrulama ortamlarında sıkça karşılaşılan çok katmanlı TLM mimarisini inceleyeceksiniz:
- Hız uyumsuzluğu (**rate mismatch**) olan bileşenlerin \`uvm_tlm_fifo\` ile tamponlanması.
- Alt bileşenler (\`subComp1\`, \`subComp2\`, \`subComp3\`) arasında hiyerarşik port yönlendirmesi.
- Sarmalayıcı bileşenler (\`ComponentA\` ve \`ComponentB\`) içinde dahili bağlantı mimarisi.
- \`put_export\` ve \`put_port\` arayüzlerinin hiyerarşi sınırlarını aşması.
- En üst düzey ortamda (\`my_env\` / \`test\`) uçtan uca TLM entegrasyonu ve simülasyon doğrulaması.`,
      },
      {
        title: "2. Sistem Mimarisi ve Problem Tanımı",
        content: `Doğrulama ortamımızda şu senaryoyu ele alıyoruz:
- \`subComp1\`: Çok hızlı bir paket üreticisidir (her çevrimde veri basmak ister).
- \`subComp2\`: Orta hızda çalışan bir filtre/yönlendiricidir.
- \`subComp3\`: \`ComponentB\` içinde yer alan ve paketleri çok yavaş tüketen nihai hedeftir.

Eğer bu bileşenleri doğrudan birbirine bağlarsak, yavaş bileşen en baştaki üreticiyi sürekli durdurur veya veri kaybı yaşanır. Bu hız dengesizliğini çözmek için katmanlar arasına \`uvm_tlm_fifo #(Packet)\` entegre edilir:

\`\`\`
[ subComp1 (put_port) ] ---> [ FIFO_A ] ---> [ subComp2 (get_port / put_port) ]
                                                     | (ComponentA Dışına Çıkış)
                                                     v
                                [ ComponentB (put_export) ]
                                             |
                                             v
                                         [ FIFO_B ]
                                             |
                                             v
                                   [ subComp3 (get_port) ]
\`\`\``,
      },
      {
        title: "3. ComponentA Katmanı: subComp1, subComp2 ve İç TLM FIFO",
        content: `\`ComponentA\`, iki alt bileşeni ve aralarındaki FIFO'yu barındırır:

\`\`\`systemverilog
class componentA extends uvm_component;
  \`uvm_component_utils(componentA)

  subComp1            m_subcomp_1;
  subComp2            m_subcomp_2;
  uvm_tlm_fifo #(Packet) m_tlm_fifo;

  // Dis dunyaya veri ileten harici put portu
  uvm_blocking_put_port #(Packet) m_put_port;

  function new(string name = "componentA", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    m_subcomp_1 = subComp1::type_id::create("m_subcomp_1", this);
    m_subcomp_2 = subComp2::type_id::create("m_subcomp_2", this);
    m_tlm_fifo  = new("m_tlm_fifo", this, 2); // 2 elemanli FIFO
    m_put_port  = new("m_put_port", this);
  endfunction

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // subComp1 -> FIFO
    m_subcomp_1.m_put_port.connect(m_tlm_fifo.put_export);
    // FIFO -> subComp2
    m_subcomp_2.m_get_port.connect(m_tlm_fifo.get_export);
    // subComp2 -> Harici cikis portu (Port-to-Port baglantisi)
    m_subcomp_2.m_put_port.connect(this.m_put_port);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "4. ComponentB Katmanı: subComp3 ve Dahili FIFO Tamponu",
        content: `\`ComponentB\`, dışarıdan paketleri kabul eden bir \`put_export\` sunar ve gelen paketleri kendi içindeki yavaş \`subComp3\` bileşenine ulaştırır:

\`\`\`systemverilog
class componentB extends uvm_component;
  \`uvm_component_utils(componentB)

  subComp3            m_subcomp_3;
  uvm_tlm_fifo #(Packet) m_tlm_fifo;
  uvm_blocking_put_export #(Packet) m_put_export;

  function new(string name = "componentB", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    m_subcomp_3  = subComp3::type_id::create("m_subcomp_3", this);
    m_tlm_fifo   = new("m_tlm_fifo", this, 4); // 4 elemanli tampon
    m_put_export = new("m_put_export", this);
  endfunction

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Disaridan gelen export cagrisi dogrudan dahili FIFO'ya aktarilir
    this.m_put_export.connect(m_tlm_fifo.put_export);
    // subComp3 dahili FIFO'dan veriyi ceker
    m_subcomp_3.m_get_port.connect(m_tlm_fifo.get_export);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. Üst Düzey Test / Ortam Katmanında connect_phase",
        content: `İki büyük hiyerarşik blok (\`componentA\` ve \`componentB\`), test sınıfının \`connect_phase\` metodunda tek bir satırla birbirine bağlanır:

\`\`\`systemverilog
class my_test extends uvm_test;
  \`uvm_component_utils(my_test)

  componentA compA;
  componentB compB;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    compA = componentA::type_id::create("compA", this);
    compB = componentB::type_id::create("compB", this);
  endfunction

  function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Hiyerarsik bilesenlerin birbirine baglanmasi
    compA.m_put_port.connect(compB.m_put_export);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "6. Simülasyon Çıktısı ve Veri Bütünlüğü Doğrulaması",
        content: `Simülasyon koştuğunda paketlerin FIFO'lar sayesinde takılmadan aktarıldığı görülür:
\`\`\`text
UVM_INFO @ 0 ns: uvm_test_top.compA.m_subcomp_1 [SC1] Paket FIFO_A'ya atildi: addr=0x11
UVM_INFO @ 0 ns: uvm_test_top.compA.m_subcomp_1 [SC1] Paket FIFO_A'ya atildi: addr=0x22
UVM_INFO @ 5 ns: uvm_test_top.compA.m_subcomp_2 [SC2] FIFO_A'dan alindi, compB'ye aktariliyor...
UVM_INFO @ 25 ns: uvm_test_top.compB.m_subcomp_3 [SC3] FIFO_B'den alindi ve islendi: addr=0x11
\`\`\`
Bu mimari sayesinde \`subComp1\`, \`subComp3\`'ün yavaşlığından etkilenmeden kendi hızında çalışabilmiştir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Kapsamlı UVM TLM Hiyerarşi ve FIFO Entegrasyon Örneği** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-tlm-example.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
 
  \`uvm_object_utils_begin(Packet)
    \`uvm_field_int(addr, UVM_ALL_ON)
    \`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
 
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Kapsamlı UVM TLM Hiyerarşi ve FIFO Entegrasyon Örneği",
      initialCode: `class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
 
  \`uvm_object_utils_begin(Packet)
    \`uvm_field_int(addr, UVM_ALL_ON)
    \`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
 
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Kapsamlı UVM TLM Hiyerarşi ve FIFO Entegrasyon Örneği doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Hızlı bir veri üreticisi ile yavaş bir tüketici arasında UVM doğrulama ortamında neden 'uvm_tlm_fifo' kullanılır?",
      options: ["TLM portlarının doğrudan birbirine bağlanması SystemVerilog tarafından yasaklandığı için.", "Hızlı bileşenin yavaş bileşeni sürekli bloke etmesini engellemek ve işlem paketlerini asenkron olarak güvenle tamponlamak için.", "Yalnızca simülasyon loglarını dosyaya yazdırmak amacıyla.", "Sınıf randomizasyonunu otomatik olarak başlatmak için."],
      correctIndex: 1,
      explanation: "Doğru! uvm_tlm_fifo, hız farkı olan üretici ve tüketici bileşenler arasına yerleştirilerek paketleri asenkron olarak tamponlar. Böylece hızlı üretici her seferinde yavaş tüketicinin işini bitirmesini beklemek zorunda kalmaz.",
    },
  },
  "uvm-tlm-analysis-port": {
    id: "uvm-tlm-analysis-port",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM TLM Analiz Portu (uvm_analysis_port) ve Yayın Mekanizması",
    subtitle: "Tek göndericiden çoklu alıcıya (1-to-many broadcast) bloklamayan veri yayını, Scoreboard ve Coverage entegrasyonu.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/tlm-ap.gif)
![UVM Mimari Şeması](/images/uvm/tlm-ap.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in izleme, denetleme ve kapsama toplama omurgasını oluşturan Analiz Portu (\`uvm_analysis_port\`) mekanizmasını öğreneceksiniz:
- Analiz portunun yayın (**1-to-many broadcast**) felsefesi.
- Neden analiz portları asla bloklayamaz? (\`write()\` fonksiyonu, sıfır simülasyon zamanı).
- Yayımcı (Publisher) bileşen olan \`uvm_monitor\` içinde analiz portu tanımlama.
- Abone (Subscriber) bileşenler: \`uvm_subscriber\` sınıfı ve \`write()\` metodunun gerçeklenmesi.
- \`connect_phase\` içinde bir analiz portunu Scoreboard, Coverage Collector ve Logger'a aynı anda bağlama.
- Standart TLM portları ile Analiz Portları arasındaki temel farklar tablosu.`,
      },
      {
        title: "2. Analiz Portu Nedir ve Neden Hayatidir?",
        content: `Standart TLM put ve get portları bire-bir (**point-to-point**) haberleşme için tasarlanmıştır. Ancak donanım doğrulamasında bir \`monitor\`, DUT pinlerinden yakaladığı bir işlemi aynı anda:
1. Sonuçların doğruluğunu kontrol etmesi için **Scoreboard**'a,
2. Fonksiyonel kapsama oranını ölçmesi için **Coverage Collector**'a,
3. Hata ayıklama loglarını tutması için **Tracer/Logger**'a göndermek zorundadır.

Eğer standart put portu kullanılsaydı, Scoreboard işlemi yavaş işlediğinde tüm testbench dururdu ve birden fazla alıcıya veri göndermek imkansızlaşırdı.

**Analiz Portu Çözümü:**
- **Bire-Çok (1-to-Many):** Tek bir analiz portu 0, 1 veya N sayıda dinleyiciye bağlanabilir.
- **Bloklamayan (Non-blocking):** Veri \`write()\` adlı bir \`function void\` ile dağıtılır. Sıfır simülasyon zamanında tamamlanır ve asla çağıranı bloke edemez.
- **Zorunlu Olmayan Bağlantı:** Hiçbir abone bağlanmasa dahi \`write()\` çağrısı hata vermez.`,
      },
      {
        title: "3. Yayımcı Bileşen: Monitor İçinde Analiz Portu Tanımlama",
        content: `Yayımcı bileşen (genellikle \`monitor\`), paketleri yayınlamak için bir \`uvm_analysis_port\` tanımlar:

\`\`\`systemverilog
class my_monitor extends uvm_monitor;
  \`uvm_component_utils(my_monitor)

  // simple_packet yayini yapacak analiz portu
  uvm_analysis_port #(simple_packet) ap;

  function new(string name = "my_monitor", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    ap = new("ap", this);
  endfunction

  virtual task run_phase(uvm_phase phase);
    simple_packet pkt;
    forever begin
      // Donanim pinlerinden paketi topla...
      #10ns; 
      pkt = simple_packet::type_id::create("pkt");
      assert(pkt.randomize());

      \`uvm_info("MON", "DUT islemi yakalandi, abonelere yayinlaniyor...", UVM_LOW)
      
      // TUM ABONELERE TEK SEFERDE YAYIN YAPILIR:
      ap.write(pkt);
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Abone Bileşenler: uvm_subscriber ve write() Metodu",
        content: `Bir bileşenin analiz portundan yayınlanan verileri alabilmesi için en kolay yol, \`uvm_subscriber\` sınıfından türemektir. Bu sınıf halihazırda bir \`analysis_export\` içerir ve geliştiricinin yalnızca \`write()\` metodunu yazmasını bekler:

\`\`\`systemverilog
class my_scoreboard extends uvm_subscriber #(simple_packet);
  \`uvm_component_utils(my_scoreboard)

  function new(string name = "my_scoreboard", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  // write() bir fonksiyondur, ASLA gecikme (#10ns) barindiramaz!
  virtual function void write(simple_packet t);
    \`uvm_info("SCOREBOARD", $sformatf("Denetim icin paket alindi: addr=0x%0h data=0x%0h", t.addr, t.data), UVM_LOW)
    // Beklenen model ile karsilastirma islemi yapilir
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. connect_phase İçinde Çoklu Bağlantı (1-to-Many)",
        content: `Ortam (\`my_env\`) seviyesinde bir tek analiz portu, birden çok aboneye kolayca bağlanır:

\`\`\`systemverilog
class my_env extends uvm_env;
  \`uvm_component_utils(my_env)

  my_monitor           mon;
  my_scoreboard        sb;
  my_coverage_collector cov;

  // build_phase icinde create edildikten sonra...
  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    
    // 1-to-Many Yayini: Ayni port iki farkli aboneye baglaniyor!
    mon.ap.connect(sb.analysis_export);
    mon.ap.connect(cov.analysis_export);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "6. Standart Portlar vs Analiz Portları Karşılaştırması",
        content: `| Kriter | Standart TLM Portları (\`put\`/\`get\`) | Analiz Portları (\`analysis_port\`) |
| :--- | :--- | :--- |
| **Bağlantı Sayısı** | Bire-Bir (Tam olarak 1 hedef) | Bire-Çok (0, 1 veya N hedef) |
| **Bağlantı Zorunluluğu** | Zorunlu (Bağlanmazsa ölümcül hata verir) | İsteğe Bağlı (0 abone olsa da çalışır) |
| **İletişim Metodu** | \`task\` (\`put()\`, \`get()\`) | \`function void write(T t)\` |
| **Simülasyon Zamanı** | Simülasyon zamanı tüketebilir | Sıfır simülasyon zamanı (Non-blocking) |
| **Kullanım Amacı** | Trafik sürme ve veri alışverişi | İzleme, Scoreboard denetimi ve Kapsama |`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM TLM Analiz Portu (uvm_analysis_port) ve Yayın Mekanizması** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-tlm-analysis-port.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class my_monitor extends uvm_component;
	...
	uvm_analysis_port #(my_data) analysis_port;
	...
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM TLM Analiz Portu (uvm_analysis_port) ve Yayın Mekanizması",
      initialCode: `class my_monitor extends uvm_component;
	...
	uvm_analysis_port #(my_data) analysis_port;
	...
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM TLM Analiz Portu (uvm_analysis_port) ve Yayın Mekanizması doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir 'uvm_analysis_port' nesnesine hiçbir abone (uvm_subscriber veya analysis_imp) bağlanmamışken 'write(pkt)' çağrısı yapılırsa ne gerçekleşir?",
      options: ["Simülatör 'Unconnected analysis port' ölümcül hatası vererek simülasyonu durdurur.", "Çağrı hiçbir hata vermeden güvenle tamamlanır, çünkü analiz portları 0 ile N arasında aboneyi destekler.", "write fonksiyonu sonsuz döngüye girer.", "Paket otomatik olarak çöp toplayıcı tarafından belleğe kilitlenir."],
      correctIndex: 1,
      explanation: "Doğru! Standart portların aksine analiz portları (analysis port) 0 ile N arasında aboneyi destekleyecek şekilde tasarlanmıştır. Hiçbir dinleyici bağlı olmasa bile write() çağrısı sessizce ve güvenle tamamlanır.",
    },
  },
  "uvm-tlm-sockets": {
    id: "uvm-tlm-sockets",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM TLM-2.0 Soketleri: Initiator, Target ve Passthrough Mimarisi",
    subtitle: "IEEE 1666 TLM-2.0 standart soketleri, generic payload ve zaman açıklamalı (b_transport) işlem transferi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/tlm-socket.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in IEEE 1666 TLM-2.0 standardıyla uyumlu soket (socket) mimarisini inceleyeceksiniz:
- TLM-1 ile TLM-2.0 arasındaki mimari farklar ve soket kavramı.
- Soketlerin çift yönlü avantajı: İleri ve geri iletişimi tek bir nesnede birleştirme.
- \`uvm_tlm_b_initiator_socket\` ve \`uvm_tlm_b_target_socket\` sınıfları.
- \`b_transport\` metodu ve zaman açıklaması (**timing annotation** / \`uvm_tlm_time delay\`) mekanizması.
- Simülasyon hızını dramatik şekilde artıran Gevşek Zamanlı (**Loose-Timed**) modelleme mantığı.`,
      },
      {
        title: "2. TLM-2.0 Soket Mimarisine Giriş",
        content: `TLM-1 mimarisinde (put/get portları), istek göndermek için bir port, yanıt almak için başka bir port açmak ve her ikisini ayrı ayrı kablolamak gerekirdi. Bu durum özellikle karmaşık veriyolu protokollerinde (PCIe, AXI, AHB) yüzlerce ayrı port nesnesine ve karmaşık bağlantılara yol açıyordu.

TLM-2.0 bu sorunu **Soket (Socket)** kavramıyla çözdü:
- Bir soket, hem ileri yönlü (\`forward\`) hem de geri yönlü (\`backward\`) iletişim arayüzlerini tek bir nesnede birleştirir.
- Standart bir veri paketi formatı olan Genel Yük (**Generic Payload** - \`uvm_tlm_generic_payload\`) kullanır (adres, veri, komut, bayt aktif bayrakları yerleşiktir).
- \`initiator.socket.connect(target.socket)\` şeklinde tek satırda iki yönlü köprü kurulur.`,
      },
      {
        title: "3. Başlatıcı (Initiator) ve Hedef (Target) Bileşen Tasarımı",
        content: `**Başlatıcı Bileşen (Initiator):**
\`\`\`systemverilog
class initiator extends uvm_component;
  \`uvm_component_utils(initiator)

  // Bloklayan iletisim baslatici soketi
  uvm_tlm_b_initiator_socket #(simple_packet) initSocket;
  uvm_tlm_time delay;

  function new(string name = "initiator", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    initSocket = new("initSocket", this);
    delay      = new();
  endfunction

  virtual task run_phase(uvm_phase phase);
    simple_packet pkt;
    phase.raise_objection(this);

    repeat (3) begin
      pkt = simple_packet::type_id::create("pkt");
      assert(pkt.randomize());
      \`uvm_info("INIT", "Paket soket uzerinden gonderiliyor...", UVM_LOW)
      
      // b_transport metodu cagirilir (zaman aciklamasi ile birlikte)
      initSocket.b_transport(pkt, delay);
    end

    phase.drop_objection(this);
  endtask
endclass
\`\`\`

**Hedef Bileşen (Target):**
\`\`\`systemverilog
class target extends uvm_component;
  \`uvm_component_utils(target)

  // Hedef soket
  uvm_tlm_b_target_socket #(target, simple_packet) targetSocket;

  function new(string name = "target", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    targetSocket = new("targetSocket", this);
  endfunction

  // b_transport gorevinin hedef tarafindaki implementasyonu
  virtual task b_transport(simple_packet pkt, uvm_tlm_time delay);
    \`uvm_info("TGT", $sformatf("Soketten paket alindi: addr=0x%0h data=0x%0h", pkt.addr, pkt.data), UVM_LOW)
    // Gecikme dogrudan simulatorde bekletilmek yerine delay nesnesine eklenebilir
    delay.incr(10ns, 1ns);
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Zaman Açıklaması (Timing Annotation) ve Simülasyon Performansı",
        content: `Geleneksel testbench'lerde her mikro gecikme için \`#10ns\` veya \`@(posedge clk)\` çağrısı yapılır. Bu durum simülatör çekirdeğinin (kernel) sürekli olay kuyruğuna bağlam değiştirmesine (**context switch**) neden olur ve simülasyonu aşırı derecede yavaşlatır.

TLM-2.0'daki \`uvm_tlm_time delay\` parametresi, gecikmenin simülatör zamanını hemen tüketmeden, **işlem üzerinde yerel bir sayı olarak biriktirilmesini (accumulate)** sağlar:
- İşlemler sıfır simülasyon zamanında hızla hedefe ulaştırılır.
- Gecikme miktarı \`delay.incr(20ns)\` ile kaydedilir.
- Bileşen ancak gerçekten bir donanım senkronizasyonu gerektiğinde birikmiş toplam süre kadar simülatörü bekletir (\`#(delay.get_realtime(1ns)))\`). Bu tekniğe **Gevşek Zamanlı (Loosely-Timed)** modelleme denir.`,
      },
      {
        title: "5. connect_phase İçinde Soket Bağlantısı",
        content: `Ortam (\`my_env\`) seviyesinde bağlantı son derece yalındır:

\`\`\`systemverilog
class my_env extends uvm_env;
  \`uvm_component_utils(my_env)
  initiator init;
  target    tgt;

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    init = initiator::type_id::create("init", this);
    tgt  = target::type_id::create("tgt", this);
  endfunction

  function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Tek satirda cifte yonlu iletisim koprusu:
    init.initSocket.connect(tgt.targetSocket);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM TLM-2.0 Soketleri: Initiator, Target ve Passthrough Mimarisi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-tlm-sockets.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class initiator extends uvm_component;
   \`uvm_component_utils (initiator)

   // Declare a blocking transport socket (using initiator socket class)
   uvm_tlm_b_initiator_socket #(simple_packet) initSocket;
   uvm_tlm_time   delay;
   simple_packet  pkt;

   function new (string name = "initiator", uvm_component parent= null);
      super.new (name, parent);
   endfunction

   virtual function void build_phase (uvm_phase phase);
      super.build_phase (phase);
      
      // Create an instance of the socket
      initSocket = new ("initSocket", this);
      delay = new ();
   endfunction

   virtual task run_phase (uvm_phase phase);
      // Let us generate 5 packets and send it via socket
      repeat (5) begin
         pkt = simple_packet::type_id::create ("pkt");
         assert(pkt.randomize ()); 
         \`uvm_info ("INIT", "Packet sent to target", UVM_LOW)
         pkt.print (uvm_default_line_printer);
         
         // Use the socket to send data
         initSocket.b_transport (pkt, delay);
      end
   endtask
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM TLM-2.0 Soketleri: Initiator, Target ve Passthrough Mimarisi",
      initialCode: `class initiator extends uvm_component;
   \`uvm_component_utils (initiator)

   // Declare a blocking transport socket (using initiator socket class)
   uvm_tlm_b_initiator_socket #(simple_packet) initSocket;
   uvm_tlm_time   delay;
   simple_packet  pkt;

   function new (string name = "initiator", uvm_component parent= null);
      super.new (name, parent);
   endfunction

   virtual function void build_phase (uvm_phase phase);
      super.build_phase (phase);
      
      // Create an instance of the socket
      initSocket = new ("initSocket", this);
      delay = new ();
   endfunction

   virtual task run_phase (uvm_phase phase);
      // Let us generate 5 packets and send it via socket
      repeat (5) begin
         pkt = simple_packet::type_id::create ("pkt");
         assert(pkt.randomize ()); 
         \`uvm_info ("INIT", "Packet sent to target", UVM_LOW)
         pkt.print (uvm_default_line_printer);
         
         // Use the socket to send data
         initSocket.b_transport (pkt, delay);
      end
   endtask
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM TLM-2.0 Soketleri: Initiator, Target ve Passthrough Mimarisi doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "TLM-2.0 'b_transport(trans, delay)' çağrısında yer alan 'delay' (zaman açıklaması) argümanının en büyük mühendislik avantajı nedir?",
      options: ["Simülasyon saat frekansını iki katına çıkarmak.", "Her mikro gecikmede simülatör olay kuyruğuna bağlam değiştirmeden gecikmeyi işlem üzerinde modelleyerek simülasyon hızını dramatik şekilde artırmak.", "Veri paketini donanım şifreleme motoruna göndermek.", "Sadece hata enjeksiyonu amacıyla kullanılabilir."],
      correctIndex: 1,
      explanation: "Doğru! Zaman açıklaması (timing annotation), simülatörün pahalı context switch işlemlerine girmeden gecikmeleri işlem üzerinde matematiksel olarak biriktirmesini sağlar. Bu sayede simülasyon hızı katbekat artar.",
    },
  },
  "using-decl-macro-in-tlm": {
    id: "using-decl-macro-in-tlm",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "TLM Bildirim Makroları (`uvm_*_imp_decl) ile Çoklu Port Çakışmasını Çözme",
    subtitle: "Aynı bileşende aynı tipte birden fazla TLM imp arayüzünü `uvm_*_imp_decl makrosuyla çakışmasız bağlama ve gerçekleme.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/compAcompC_tlm.png)
![UVM Mimari Şeması](/images/uvm/compAcompC_export_tlm.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, karmaşık UVM doğrulama ortamlarında aynı sınıfta birden fazla aynı tip Imp portu gerektiğinde ortaya çıkan metot çakışmasını çözmeyi öğreneceksiniz:
- Tek bir hedef sınıfta (örneğin Scoreboard) iki farklı kaynaktan aynı tipte işlem alma gereksinimi.
- Metot isim çakışması (**name collision**) problemi ve SystemVerilog kısıtları.
- \`\` \`uvm_blocking_put_imp_decl \`\` ve \`\` \`uvm_analysis_imp_decl \`\` makrolarının çalışma mekanizması.
- Sonek (suffix) kullanarak özelleştirilmiş Imp sınıfları ve metot imzaları üretme.
- İki üreticiden gelen paketleri tek bir alıcıda bağımsız işleyen uçtan uca kod örneği.`,
      },
      {
        title: "2. Problem: Metot İsim Çakışması (Name Collision)",
        content: `Bir \`componentB\` düşünün: Hem \`componentA\`'dan hem de \`componentC\`'den \`put()\` metoduyla paket almak istiyor.

Normal şartlarda \`componentB\` içine iki adet \`uvm_blocking_put_imp #(simple_packet, componentB)\` koymak isterdiniz. Ancak:
- Her iki imp de \`componentB\` sınıfı içinde \`task put(simple_packet pkt)\` metodunu arar!
- SystemVerilog'da aynı sınıf içinde aynı isim ve parametreye sahip iki farklı \`task\` tanımlayamazsınız (\`Duplicate declaration error\`).
- \`componentA\`'dan gelen paketi ayrı, \`componentC\`'den gelen paketi ayrı işleyemezsiniz.`,
      },
      {
        title: "3. Çözüm: `uvm_*_imp_decl Makroları",
        content: `UVM, bu sorunu çözmek için sınıf bildiriminden önce çağrılan özel bildirim makroları sunar. Makroya verilen sonek (suffix), yeni bir imp sınıfı ve bu sınıfın arayacağı metot ismini üretir:

\`\`\`systemverilog
// 1. Ozel sonekli yeni imp turleri uret
\`uvm_blocking_put_imp_decl(_1)
\`uvm_blocking_put_imp_decl(_2)
\`\`\`

Bu iki satır derleyiciye arka planda şunu söyler:
- \`uvm_blocking_put_imp_1\`: Bu imp, hedef sınıfta \`put()\` yerine **\`put_1()\`** görevini arayacak!
- \`uvm_blocking_put_imp_2\`: Bu imp, hedef sınıfta \`put()\` yerine **\`put_2()\`** görevini arayacak!

Böylece \`componentB\` içinde artık iki ayrı metot tanımlayabilirsiniz: \`task put_1(...)\` ve \`task put_2(...)\`!`,
      },
      {
        title: "4. Çoklu Imp İçeren Hedef Bileşen Tasarımı",
        content: `Üretilen özel imp türlerini \`componentB\` içinde kullanalım:

\`\`\`systemverilog
\`uvm_blocking_put_imp_decl(_1)
\`uvm_blocking_put_imp_decl(_2)

class componentB extends uvm_component;
  \`uvm_component_utils(componentB)

  // Uretilen ozel imp siniflarindan ornekler tanimlanir
  uvm_blocking_put_imp_1 #(simple_packet, componentB) put_imp1;
  uvm_blocking_put_imp_2 #(simple_packet, componentB) put_imp2;

  function new(string name = "componentB", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    put_imp1 = new("put_imp1", this);
    put_imp2 = new("put_imp2", this);
  endfunction

  // componentA'dan gelen paketler buraya duser:
  virtual task put_1(simple_packet pkt);
    \`uvm_info("COMP_B", $sformatf("Kanal 1'den paket alindi: addr=0x%0h", pkt.addr), UVM_LOW)
  endtask

  // componentC'den gelen paketler buraya duser:
  virtual task put_2(simple_packet pkt);
    \`uvm_info("COMP_B", $sformatf("Kanal 2'den paket alindi: addr=0x%0h", pkt.addr), UVM_LOW)
  endtask
endclass
\`\`\``,
      },
      {
        title: "5. connect_phase Entegrasyonu ve Topoloji Dökümü",
        content: `Ortam (\`my_env\`) seviyesinde bağlantılar ilgili özel imp portlarına yapılır:

\`\`\`systemverilog
class my_env extends uvm_env;
  \`uvm_component_utils(my_env)

  componentA compA;
  componentC compC;
  componentB compB;

  // build_phase icinde olusturulduktan sonra...
  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // compA put_imp1'e baglanir
    compA.put_port.connect(compB.put_imp1);
    // compC put_imp2'ye baglanir
    compC.put_port.connect(compB.put_imp2);
  endfunction
endclass
\`\`\`

Simülasyonda \`uvm_top.print_topology()\` çıktısı:
\`\`\`text
---------------------------------------------------
Name        Type                      Size  Value
---------------------------------------------------
compA       componentA                -     @2699
  put_port  uvm_blocking_put_port     -     @2808
compB       componentB                -     @2759
  put_imp1  uvm_blocking_put_imp_1    -     @2861
  put_imp2  uvm_blocking_put_imp_2    -     @2910
compC       componentC                -     @2729
  put_port  uvm_blocking_put_port     -     @2962
---------------------------------------------------
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **TLM Bildirim Makroları (\`uvm_*_imp_decl) ile Çoklu Port Çakışmasını Çözme** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "using-decl-macro-in-tlm.sv - Örnek UVM Doğrulama Kodu",
          snippet: `\`uvm_put_imp_decl (_1)
\`uvm_put_imp_decl (_2)

class my_put_imp #(type T=int) extends uvm_component;
	uvm_put_imp_1 #(T, my_put_imp #(T)) put_imp1;
	uvm_put_imp_2 #(T, my_put_imp #(T)) put_imp2;
	
	function void put_1 (input T t);
		// puts coming from put_imp1
	endfunction
	
	function void put_2 (input T t);
		// puts coming from put_imp2
	endfunction
	...
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: TLM Bildirim Makroları (`uvm_*_imp_decl) ile Çoklu Port Çakışmasını Çözme",
      initialCode: `\`uvm_put_imp_decl (_1)
\`uvm_put_imp_decl (_2)

class my_put_imp #(type T=int) extends uvm_component;
	uvm_put_imp_1 #(T, my_put_imp #(T)) put_imp1;
	uvm_put_imp_2 #(T, my_put_imp #(T)) put_imp2;
	
	function void put_1 (input T t);
		// puts coming from put_imp1
	endfunction
	
	function void put_2 (input T t);
		// puts coming from put_imp2
	endfunction
	...
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] TLM Bildirim Makroları (\`uvm_*_imp_decl) ile Çoklu Port Çakışmasını Çözme doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir hedef sınıfta aynı türden iki farklı TLM imp portunu kullanırken neden '`uvm_*_imp_decl' makrosuna ihtiyaç duyulur?",
      options: ["SystemVerilog aynı sınıfta aynı isim ve imzaya sahip iki farklı metot (örneğin put veya write) tanımlamaya izin vermediği için, farklı isimlerde metotlar arayan özel imp sınıfları türetmek amacıyla.", "Port bağlantılarının simülasyon hızını artırmak için.", "Sadece sanal arayüzlerin (virtual interface) bağlanabilmesi için.", "Simülatörün otomatik olarak fazları atlamasını sağlamak için."],
      correctIndex: 0,
      explanation: "Doğru! SystemVerilog aynı sınıfta iki adet 'put' veya 'write' metodunun tanımlanmasına izin vermez. `uvm_*_imp_decl makrosu, arayacağı metot ismine sonek ekleyerek (put_1, put_2 gibi) çakışmayı çözer ve her portun bağımsız bir metoda bağlanmasını sağlar.",
    },
  },
  "uvm-tlm-nonblocking-put-port": {
    id: "uvm-tlm-nonblocking-put-port",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM TLM Bloklamayan Put Portu (uvm_nonblocking_put_port)",
    subtitle: "try_put ve can_put metotları ile simülasyon zamanı harcamayan sıfır gecikmeli veri aktarımı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/tlm.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in sıfır simülasyon zamanında çalışan tek yönlü aktarım modeli olan Bloklamayan Put (Non-blocking Put) mekanizmasını öğreneceksiniz:
- Bloklamayan Put (\`uvm_nonblocking_put_port\`) kavramı ve iş parçacığını bekletmeme felsefesi.
- \`try_put()\` fonksiyonu: Anında yürütme ve başarı bayrağı (\`bit\`) kontrolü.
- \`can_put()\` fonksiyonu: Paketi oluşturmadan önce hedefin uygunluğunu sorgulama.
- Yeniden deneme (**polling / retry loop**) döngülerinin kurulması.
- Bloklayan Put (\`task\`) ile Bloklamayan Put (\`function\`) arasındaki karşılaştırma.`,
      },
      {
        title: "2. Bloklamayan Put Mekanizması Nedir?",
        content: `Bloklayan \`put()\` metodu bir \`task\`'tır; alıcı meşgulse göndericiyi bekletir. Ancak bir testbench bileşeni (örneğin birden çok kanala aynı anda paket dağıtan bir yönlendirici veya saat darbesiyle çalışan bir state machine), tek bir alıcının gecikmesi yüzünden askıda kalamaz.

**Bloklamayan Put Özellikleri:**
- \`try_put()\` ve \`can_put()\` metotları birer **\`function\`** olarak tanımlanmıştır.
- Asla \`#10ns\` veya \`@(posedge clk)\` gibi simülasyon zamanı harcayamazlar.
- Eğer alıcı müsaitse işlem anında gerçekleşir ve metot \`1\` (true) döner.
- Eğer alıcı meşgulse metot anında \`0\` (false) döner; gönderici duraklatılmaz, kontrol hemen göndericiye geri verilir.`,
      },
      {
        title: "3. try_put() Metodu ve Yeniden Deneme (Polling) Döngüsü",
        content: `Gönderici bileşen, paketi aktarmayı dener. Eğer alıcı meşgul olduğu için aktarım başarısız olursa (\`0\` dönerse), uygun bir beklemeden sonra tekrar deneyebilir:

\`\`\`systemverilog
class componentA extends uvm_component;
  \`uvm_component_utils(componentA)

  uvm_nonblocking_put_port #(Packet) put_port;

  function new(string name = "componentA", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    put_port = new("put_port", this);
  endfunction

  virtual task run_phase(uvm_phase phase);
    Packet pkt;
    phase.raise_objection(this);

    pkt = Packet::type_id::create("pkt");
    assert(pkt.randomize());

    // Alıcı kabul edene kadar dene (Polling Dongusu)
    while (!put_port.try_put(pkt)) begin
      \`uvm_info("COMP_A", "Hedef mesgul, 10ns sonra tekrar denenecek...", UVM_LOW)
      #10ns;
    end

    \`uvm_info("COMP_A", "Paket basariyla aktarildi!", UVM_LOW)
    phase.drop_objection(this);
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. can_put() ile Durum Sorgulama",
        content: `Gereksiz yere \`try_put()\` çağırmak veya henüz gönderilemeyecek bir paketi boş yere randomize edip bellek harcamak yerine, önce hedefin hazır olup olmadığı \`can_put()\` fonksiyonu ile sorgulanabilir:

\`\`\`systemverilog
virtual task run_phase(uvm_phase phase);
  Packet pkt;
  phase.raise_objection(this);

  // Once hedefin kabul edip edemeyecegini sor
  if (put_port.can_put()) begin
    pkt = Packet::type_id::create("pkt");
    assert(pkt.randomize());
    void'(put_port.try_put(pkt));
    \`uvm_info("COMP_A", "Paket hedefe iletildi.", UVM_LOW)
  end else begin
    \`uvm_info("COMP_A", "Hedef su anda musait degil.", UVM_LOW)
  end

  phase.drop_objection(this);
endtask
\`\`\``,
      },
      {
        title: "5. Alıcı Tarafında can_put ve try_put Gerçekleme",
        content: `Alıcı bileşen \`uvm_nonblocking_put_imp\` kullanır ve iki fonksiyonu da kendi içinde implement eder:

\`\`\`systemverilog
class componentB extends uvm_component;
  \`uvm_component_utils(componentB)

  uvm_nonblocking_put_imp #(Packet, componentB) put_imp;
  bit is_busy = 0;

  function new(string name = "componentB", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    put_imp = new("put_imp", this);
  endfunction

  // can_put: Hedef hazir mi?
  virtual function bit can_put();
    return !is_busy;
  endfunction

  // try_put: Paketi aninda al
  virtual function bit try_put(Packet pkt);
    if (is_busy) return 0;
    
    \`uvm_info("COMP_B", $sformatf("Paket kabul edildi: addr=0x%0h", pkt.addr), UVM_LOW)
    return 1;
  endfunction
endclass
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM TLM Bloklamayan Put Portu (uvm_nonblocking_put_port)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-tlm-nonblocking-put-port.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Create a class data object that can be sent from one 
// component to another
class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
  
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(addr, UVM_ALL_ON)
  	\`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM TLM Bloklamayan Put Portu (uvm_nonblocking_put_port)",
      initialCode: `// Create a class data object that can be sent from one 
// component to another
class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
  
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(addr, UVM_ALL_ON)
  	\`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM TLM Bloklamayan Put Portu (uvm_nonblocking_put_port) doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "'uvm_nonblocking_put_port' arayüzünün 'try_put(pkt)' metodu çağrıldığında alıcı bileşen meşgulse ne gerçekleşir?",
      options: ["Gönderici iş parçacığı alıcı boşalana kadar simülasyon zamanında bekletilir.", "Simülasyon zamanı harcamadan anında 0 (false) döndürerek yürütme akışını kesintisiz olarak göndericiye bırakır.", "Paket otomatik olarak drop edilir ve simülatör ölümcül hata verir.", "Simülasyon fazı doğrudan cleanup aşamasına geçer."],
      correctIndex: 1,
      explanation: "Doğru! try_put bir fonksiyondur ve bloklayamaz. Hedef müsait değilse simülasyon zamanı harcamadan anında 0 döner. Çağıran kod bu duruma göre işlemi erteleyebilir veya daha sonra tekrar deneyebilir.",
    },
  },
  "uvm-tlm-port-export-imp": {
    id: "uvm-tlm-port-export-imp",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM TLM Hiyerarşisi: Port, Export ve Imp Arasındaki İletişim Zinciri",
    subtitle: "Port-to-Port, Port-to-Export ve Export-to-Imp hiyerarşik bağlantı kuralları ve yönlendirme zinciri.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm-tlm-put-port-port-imp.png)
![UVM Mimari Şeması](/images/uvm/uvm-tlm-put-port-port-export-export-imp.png)`,
      },
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, katmanlı UVM hiyerarşilerinde bileşen sınırlarını aşan TLM bağlantı kurallarını öğreneceksiniz:
- Hiyerarşik TLM yönlendirme mimarisi.
- Alt bileşenden üst bileşene: **Port-to-Port** bağlantısı.
- Üst bileşenden komşu üst bileşene: **Port-to-Export** bağlantısı.
- Üst bileşenden hedef alt bileşene: **Export-to-Imp** bağlantısı.
- Uçtan uca iletişim zinciri: \`Port -> Port -> Export -> Imp\` kuralı.
- En yaygın bağlantı hataları ve teşhis yöntemleri.`,
      },
      {
        title: "2. UVM TLM Hiyerarşik Bağlantı Kuralları",
        content: `Gerçek bir UVM ortamında alt bileşenler (örneğin bir \`driver\` veya \`subCompA\`) doğrudan dış dünyadaki diğer alt bileşenlere erişemez. Kapsülleme (encapsulation) prensibi gereği işlemler üst katmanlar üzerinden yönlendirilmelidir:

\`\`\`
[ subCompA (port) ] ---> [ ComponentA (port) ]  (Port-to-Port: Disari dogru)
                                |
                                v
                         [ ComponentB (export) ] (Port-to-Export: Ortam seviyesi)
                                |
                                v
                         [ subCompB (imp) ]     (Export-to-Imp: Iceri dogru)
\`\`\`

**Temel Prensipler:**
1. **Portlar Dışarı Açar:** Alt bileşen veriyi üst bileşene doğru çıkarırken Port-to-Port bağlanır.
2. **Exportlar İçeri Alır:** Üst bileşen dışarıdan gelen veriyi alt bileşene aktarırken Export-to-Imp bağlanır.
3. **Zincir Imp ile Biter:** Tüm bağlantı zincirlerinin nihai hedefi mutlaka bir \`Imp\` olmak zorundadır.`,
      },
      {
        title: "3. Alt Bileşenden Üst Bileşene: Port-to-Port (subCompA -> ComponentA)",
        content: `\`subCompA\`, \`ComponentA\`'nın içindedir. Her ikisi de birer \`uvm_blocking_put_port\` tanımlar:

\`\`\`systemverilog
// subCompA icinde
class subCompA extends uvm_component;
  \`uvm_component_utils(subCompA)
  uvm_blocking_put_port #(Packet) m_put_port;
  // ...
endclass

// ComponentA icinde Port-to-Port baglantisi
class componentA extends uvm_component;
  \`uvm_component_utils(componentA)
  subCompA m_subcomp_A;
  uvm_blocking_put_port #(Packet) m_put_port;

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Alt bilesenin portu ust bilesenin portuna baglanir:
    m_subcomp_A.m_put_port.connect(this.m_put_port);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "4. Üst Bileşenden Alt Bileşene: Export-to-Imp (ComponentB -> subCompB)",
        content: `Hedef tarafında \`ComponentB\` bir \`put_export\` açar, altındaki \`subCompB\` ise gerçekleme yapan \`put_imp\` tanımlar:

\`\`\`systemverilog
// subCompB (Hedef Alt Bilesen)
class subCompB extends uvm_component;
  \`uvm_component_utils(subCompB)
  uvm_blocking_put_imp #(Packet, subCompB) m_put_imp;

  virtual task put(Packet pkt);
    \`uvm_info("SUB_B", "Nihai hedef subCompB paketi aldi ve isledi!", UVM_LOW)
  endtask
endclass

// ComponentB icinde Export-to-Imp baglantisi
class componentB extends uvm_component;
  \`uvm_component_utils(componentB)
  subCompB m_subcomp_B;
  uvm_blocking_put_export #(Packet) m_put_export;

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Ust bilesenin export'u alt bilesenin imp'ine baglanir:
    this.m_put_export.connect(m_subcomp_B.m_put_imp);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. Sistem Düzeyinde Uçtan Uca Zincirleme (my_env)",
        content: `En üst düzey ortamda iki ana blok birbirine bağlanır:

\`\`\`systemverilog
class my_env extends uvm_env;
  \`uvm_component_utils(my_env)
  componentA compA;
  componentB compB;

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // compA'nin port'u, compB'nin export'una baglanir:
    compA.m_put_port.connect(compB.m_put_export);
  endfunction
endclass
\`\`\`

Böylece \`subCompA\` bir paket gönderdiğinde:
\`subCompA.port -> compA.port -> compB.export -> subCompB.imp\` zinciri kusursuz bir şekilde akar!`,
      },
      {
        title: "6. En Yaygın TLM Hataları ve Çözümleri",
        content: `1. **Bağlantı Yönünü Ters Çevirmek:** \`export.connect(port)\` veya \`imp.connect(export)\` yazmak geçersizdir. Metot çağrısı daima başlatan taraftan yürütülür (\`port.connect(...)\`).
2. **Imp Eksikliği:** Zincirin sonunda bir Imp bağlanmazsa simülatör çalışma anında \`Port not bounded to implementation\` hatası verir.
3. **Farklı Tipler:** Port ve Imp nesnelerinin veri türü (\`Packet\`) birebir aynı olmalıdır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM TLM Hiyerarşisi: Port, Export ve Imp Arasındaki İletişim Zinciri** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-tlm-port-export-imp.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Create a class data object that can be sent from one 
// component to another
class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
  
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(addr, UVM_ALL_ON)
  	\`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM TLM Hiyerarşisi: Port, Export ve Imp Arasındaki İletişim Zinciri",
      initialCode: `// Create a class data object that can be sent from one 
// component to another
class Packet extends uvm_object;
  rand bit[7:0] addr;
  rand bit[7:0] data;
  
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(addr, UVM_ALL_ON)
  	\`uvm_field_int(data, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM TLM Hiyerarşisi: Port, Export ve Imp Arasındaki İletişim Zinciri doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "UVM hiyerarşik TLM bağlantı zincirinde (Port -> Port -> Export -> Imp) metodun SystemVerilog kod gövdesini fiziksel olarak barındıran ve zinciri sonlandıran eleman hangisi olmak zorundadır?",
      options: ["uvm_*_port", "uvm_*_export", "uvm_*_imp (Implementation)", "uvm_component"],
      correctIndex: 2,
      explanation: "Doğru! Portlar isteği iletir, Exportlar hiyerarşide geçit görevi görür. Ancak metodun (put/get) gerçek kod gövdesini barındıran ve işlemi yürüten nihai uç nokta daima uvm_*_imp bileşenidir.",
    },
  },
  "uvm-tlm-nonblocking-get-port": {
    id: "uvm-tlm-nonblocking-get-port",
    badge: "Modül 7 • TLM (Transaction Level Modeling) İletişimi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM TLM Bloklamayan Get Portu (uvm_nonblocking_get_port)",
    subtitle: "try_get ve can_get metotları ile sıfır simülasyon zamanında işlem çekme ve veri yoklama.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Öğrenme Hedefleri)",
        content: `Bu bölümde, UVM'in sıfır simülasyon zamanında çalışan çekme (pull) mekanizması olan Bloklamayan Get (Non-blocking Get) portunu öğreneceksiniz:
- Bloklamayan Get (\`uvm_nonblocking_get_port\`) mimarisi ve çalışma prensibi.
- \`try_get()\` fonksiyonu ile veri çekme ve başarı durumunu denetleme.
- \`can_get()\` fonksiyonu ile sağlayıcı kuyruğunda veri olup olmadığını önceden sorgulama.
- Sağlayıcı boşken tüketicinin kilitlenmesini engelleme (non-blocking polling).
- Sağlayıcı (Provider) tarafında \`uvm_nonblocking_get_imp\` implementasyonu.
- Bloklayan Get ile Bloklamayan Get arasındaki tasarım farkları.`,
      },
      {
        title: "2. Bloklamayan Get Mekanizması Nedir?",
        content: `Standart bloklayıcı \`get()\` metodunda, eğer sağlayıcıda o anda hazır bir paket yoksa çağıran iş parçacığı askıya alınır (\`blocked\`). Ancak aşağıdaki senaryolarda bu kabul edilemez:
- **Çok Kanallı Tarama (Round-Robin Arbiter):** 4 farklı kanaldan veri toplayan bir bileşen, 1. kanal boş diye orada takılıp kalamaz; diğer 3 kanalı kontrol etmeye devam etmelidir.
- **Zaman Aşımı (Timeout) Korumalı Tüketiciler:** Veri yoksa başka işler yapmak veya saat çevrimini saymak isteyen kontrolcüler.

**Çözüm:** \`uvm_nonblocking_get_port\` kullanmaktır. \`try_get()\` bir fonksiyondur; veri varsa anında alır ve \`1\` döner, yoksa sıfır zamanda \`0\` dönerek yürütmenin devam etmesini sağlar.`,
      },
      {
        title: "3. try_get() Metodu ile Veri Çekme",
        content: `Tüketici bileşen \`uvm_nonblocking_get_port #(Packet)\` tanımlar ve \`run_phase\` içinde \`try_get()\` çağırır:

\`\`\`systemverilog
class my_consumer extends uvm_component;
  \`uvm_component_utils(my_consumer)

  uvm_nonblocking_get_port #(Packet) get_port;

  function new(string name = "my_consumer", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    get_port = new("get_port", this);
  endfunction

  virtual task run_phase(uvm_phase phase);
    Packet pkt;
    phase.raise_objection(this);

    repeat (5) begin
      // VERI CEKMEYI DENE (BLOKLAMAZ)
      if (get_port.try_get(pkt)) begin
        \`uvm_info("CONSUMER", $sformatf("Paket basariyla alindi: addr=0x%0h data=0x%0h", pkt.addr, pkt.data), UVM_LOW)
      end else begin
        \`uvm_info("CONSUMER", "Kuyruk bos! Diger islemler yurutuluyor...", UVM_LOW)
      end
      #10ns; // Saat cevrimi bekle
    end

    phase.drop_objection(this);
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. can_get() ile Kuyruk Durumu Denetimi",
        content: `\`can_get()\` fonksiyonu, sağlayıcıda hazır bir eleman olup olmadığını önceden anlamayı sağlar:

\`\`\`systemverilog
virtual task run_phase(uvm_phase phase);
  Packet pkt;
  forever begin
    @(posedge vif.clk);
    // Saglayicida paket var mi?
    if (get_port.can_get()) begin
      void'(get_port.try_get(pkt));
      process_packet(pkt);
    end
  end
endtask
\`\`\``,
      },
      {
        title: "5. Sağlayıcı (Provider) Bileşen Tasarımı ve Gerçekleme",
        content: `Sağlayıcı bileşen \`uvm_nonblocking_get_imp\` tanımlar ve \`can_get\` ile \`try_get\` fonksiyonlarını sağlar:

\`\`\`systemverilog
class my_provider extends uvm_component;
  \`uvm_component_utils(my_provider)

  uvm_nonblocking_get_imp #(Packet, my_provider) get_imp;
  Packet fifo_q[$]; // Dahili paket kuyrugu

  function new(string name = "my_provider", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    get_imp = new("get_imp", this);
  endfunction

  virtual function bit can_get();
    return (fifo_q.size() > 0);
  endfunction

  virtual function bit try_get(output Packet pkt);
    if (fifo_q.size() > 0) begin
      pkt = fifo_q.pop_front();
      return 1;
    end
    return 0; // Kuyruk bos, beklemeden basarisiz don
  endfunction
endclass
\`\`\``,
      },
      {
        title: "6. Karşılaştırma ve En İyi Tasarım Pratikleri",
        content: `| Kriter | Bloklayan Get (\`blocking_get_port\`) | Bloklamayan Get (\`nonblocking_get_port\`) |
| :--- | :--- | :--- |
| **Metot Türü** | \`task get(output T t)\` | \`function bit try_get(output T t)\` |
| **Simülasyon Zamanı** | Simülasyon zamanı tüketebilir | Sıfır simülasyon zamanında döner |
| **Kuyruk Boşken** | Tüketici veri gelene kadar uyur (bloke olur) | Hemen \`0\` döner, tüketici çalışmaya devam eder |
| **Kullanım Yeri** | Basit üretici-tüketici boru hatları | Çok kanallı arbiter, timeout korumalı alıcılar |`,
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM TLM Bloklamayan Get Portu (uvm_nonblocking_get_port)",
      initialCode: `// Minimal UVM Testbench Template
import uvm_pkg::*;
\`include "uvm_macros.svh"

class sample_test extends uvm_test;
  \`uvm_component_utils(sample_test)
  function new(string name = "sample_test", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual task run_phase(uvm_phase phase);
    phase.raise_objection(this);
    \`uvm_info("TEST", "UVM Simülasyonu başarıyla yürütüldü!", UVM_LOW)
    #100;
    phase.drop_objection(this);
  endtask
endclass

module tb_top;
  initial run_test("sample_test");
endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM TLM Bloklamayan Get Portu (uvm_nonblocking_get_port) doğrulaması başarıyla tamamlandı.",
        "--- UVM Report Summary ---",
        "** Report counts by severity",
        "UVM_INFO : 5",
        "UVM_WARNING : 0",
        "UVM_ERROR : 0",
        "UVM_FATAL : 0",
        "** UVM TEST PASSED **",
      ],
    },
    quiz: {
      question: "Bir tüketici bileşen 'uvm_nonblocking_get_port' üzerindeki 'try_get(pkt)' metodunu çağırdığında sağlayıcıda henüz hazır bir veri paketi yoksa ne gerçekleşir?",
      options: ["Tüketici veri hazır olana kadar simülasyon zamanında bloke olur.", "Metot simülasyon zamanı harcamadan anında 0 (false) döndürür ve tüketici akışına kesintisiz devam eder.", "Simülatör 'Buffer underflow' hatası vererek simülasyonu kapatır.", "Sağlayıcı otomatik olarak rastgele geçersiz bir paket üretir."],
      correctIndex: 1,
      explanation: "Doğru! Non-blocking get metotları fonksiyondur ve çağıran kodu asla bloke etmez. Veri yoksa anında 0 (false) döndürerek kontrolü tüketiciye bırakır.",
    },
  },
};
