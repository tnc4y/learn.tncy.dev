import { LessonContent } from "./lessonsData";

export const UVM_PART1: Record<string, LessonContent> = {
  "uvm": {
    id: "uvm",
    badge: "Modül 1 • UVM'e Giriş ve Temeller",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Eğitimi: Universal Verification Methodology Temelleri",
    subtitle: "Yarı iletken endüstrisinin standart çip doğrulama metodolojisi olan UVM'in mimari temelleri, tarihsel gelişimi ve endüstriyel önemi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm-tb.gif)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu eğitim modülünde modern yarı iletken ve çip tasarımı dünyasının vazgeçilmez doğrulama standardı olan UVM'e (Universal Verification Methodology) kapsamlı bir giriş yapacaksınız. Bölüm boyunca ele alınacak temel konular şunlardır:
- UVM'in ne olduğu ve donanım doğrulama süreçlerinde neden küresel bir endüstri standardı haline geldiği
- OVM'den (Open Verification Methodology) UVM'e geçiş süreci ve metodolojinin evrimi
- Temel UVM mimari yapı taşları: Testbench hiyerarşisi, işlemler (transactions), faz yönetimi (phasing) ve yapılandırma (configuration)
- UVM öğrenmek için gereken temel SystemVerilog ve nesne yönelimli programlama (OOP) ön koşulları`,
      },
      {
        title: "2. UVM Nedir? Modern Doğrulamadaki Rolü",
        content: `UVM (Universal Verification Methodology), sayısal entegre devrelerin (ASIC) ve yongada sistemlerin (SoC) işlevsel doğrulanması için geliştirilmiş, IEEE 1800.2 standardına dayalı bir doğrulama çerçevesidir (framework). SystemVerilog (IEEE 1800) dili üzerine inşa edilen UVM; mühendislerin modüler, yeniden kullanılabilir ve ölçeklenebilir test ortamları (testbench) oluşturmasını sağlayan geniş kapsamlı bir sınıf kütüphanesidir.

UVM'in Temel Karakteristikleri:
- **Standartlaştırılmış Yapı:** IEEE 1800.2 standardı sayesinde farklı EDA araçları (Synopsys VCS, Cadence Xcelium, Siemens Questa) ve şirketler arasında tam uyumluluk ve taşınabilirlik sağlar.
- **Modülerlik:** Önceden tanımlanmış temel sınıflar (\`uvm_driver\`, \`uvm_monitor\`, \`uvm_scoreboard\`, \`uvm_agent\`) doğrulama bileşenlerinin sıfırdan yazılması yerine standart şablonlarla hızla ayağa kaldırılmasını sağlar.
- **Yeniden Kullanılabilirlik (Reusability):** Bir IP bloğu için geliştirilen Doğrulama Fikri Mülkiyeti (Verification IP - VIP), hem blok seviyesinde hem alt sistemde hem de SoC seviyesinde yeniden kullanılabilir.
- **Yapılandırılabilirlik (Configurability):** Fabrika (Factory) deseni ve \`uvm_config_db\` veritabanı mekanizması sayesinde kaynak kodu değiştirmeden testbench davranışları ve senaryoları esnekçe özelleştirilebilir.

*Analoji:* Modern inşaat mühendisliğinde binalar nasıl standart mimari temeller, kolonlar ve tesisat hatları üzerine kuruluyorsa; UVM de binlerce projede başarısı kanıtlanmış standart doğrulama desenleri (agent, sequence, scoreboard, TLM) sunar.`,
      },
      {
        title: "3. Yarı İletken Endüstrisinde UVM Ekosistemi",
        content: `Günümüzde Intel, NVIDIA, AMD, Qualcomm, Apple ve ARM gibi küresel yarı iletken devleri; mikroişlemci (CPU), grafik işlemci (GPU), yapay zekâ hızlandırıcıları ve ağ yongalarının doğrulanmasında istisnasız UVM kullanmaktadır. Modern bir yüksek başarımlı GPU doğrulama ortamı 200.000 satırdan fazla UVM kodu içerebilmekte; PCIe, AXI, DDR gibi endüstri protokolleri ve özel arayüzler için 50'den fazla yeniden kullanılabilir \`uvm_agent\` barındırabilmektedir.

Eğer UVM standardizasyonu olmasaydı, her şirket kendi tescilli (proprietary) doğrulama çatısını geliştirmek zorunda kalacak, mühendis transferlerinde devasa adaptasyon kayıpları yaşanacak ve üçüncü parti VIP entegrasyonu imkânsız hale gelecekti.`,
      },
      {
        title: "4. Tarihsel Gelişim: OVM (Open Verification Methodology - 2008)",
        content: `2008 yılında Mentor Graphics ve Cadence Design Systems iş birliğiyle duyurulan OVM, SystemVerilog tabanlı ilk açık kaynaklı doğrulama metodolojisiydi. OVM, günümüz UVM standardının temelini oluşturan kritik konseptleri ortaya koymuştur:
- Doğrulama bileşenleri için temel sınıf hiyerarşisi (\`ovm_component\`, \`ovm_object\`)
- İşlem Seviyesinde Modelleme (Transaction-Level Modeling - TLM) haberleşme portları
- Bileşenlerin senkronizasyonu için yürütme fazı (phasing) mekanizması
- Nesnelerin esnek üretimi için fabrika (Factory) tasarım deseni`,
      },
      {
        title: "5. UVM'in Doğuşu: Universal Verification Methodology (2011)",
        content: `OVM büyük bir başarı yakalamış olsa da, Synopsys'in VMM (Verification Methodology Manual) çatısıyla olan rekabeti nedeniyle sektör ikiye bölünmüştü. 2011 yılında Accellera konsorsiyumu çatısı altında bir araya gelen sektör liderleri, OVM'in temelleri üzerine VMM'in en güçlü yönlerini de entegre ederek UVM 1.0 standardını yayınladı. Daha sonra IEEE bünyesinde resmi uluslararası standart haline gelen UVM, günümüzde IEEE 1800.2 standardı olarak güncelliğini korumaktadır.`,
      },
      {
        title: "6. OVM Neden UVM ile Değiştirildi? Kritik Kazanımlar",
        content: `UVM, OVM'in sahip olduğu dört kritik zayıflığı ve sektörün bölünmüş yapısını ortadan kaldırmak üzere tasarlandı:
1. **Evrensel Çoklu Satıcı (Multi-Vendor) Desteği:** OVM yalnızca Mentor ve Cadence eksenindeyken; UVM, Synopsys dahil tüm EDA devlerinin ve bağımsız kütüphanelerin ortak katkısıyla tam taşınabilir hale getirildi.
2. **Register Abstraction Layer (RAL) Entegrasyonu:** OVM'de yerleşik, güçlü bir donanım yazmaç modelleme katmanı bulunmuyordu. VMM'deki en güçlü özellik olan RAL mimarisi UVM'e \`uvm_reg\` olarak adapte edildi ve donanım yazmaçlarının/belleklerinin doğrulanması standartlaştı.
3. **Gelişmiş Faz ve İtiraz (Phasing & Objection) Yönetimi:** Testbench senkronizasyonunda yaşanan kilitlenmeler ve simülasyonun erken sonlanması problemleri, UVM'in dinamik çalışma zamanı fazları ve güçlü \`phase.raise_objection()\` / \`phase.drop_objection()\` mekanizmasıyla kökten çözüldü.
4. **Sekans ve Kaynak Yönetiminin İyileştirilmesi:** \`uvm_sequence_item\` ve \`uvm_sequencer\` mimarisi çok daha esnek, kütüphane seviyesinde ve sanal sekansları (virtual sequences) doğal olarak destekleyecek şekilde optimize edildi.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Eğitimi: Universal Verification Methodology Temelleri** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Example: PCIe transaction
class pcie_transaction extends uvm_sequence_item;
  rand bit [63:0] address;       // 64-bit address
  rand bit [31:0] data[];        // Payload (dynamic array)
  rand pcie_type_e trans_type;   // Read/Write/Message

  \`uvm_object_utils_begin(pcie_transaction)
    \`uvm_field_int(address, UVM_ALL_ON)
    \`uvm_field_array_int(data, UVM_ALL_ON)
    \`uvm_field_enum(pcie_type_e, trans_type, UVM_ALL_ON)
  \`uvm_object_utils_end

  // UVM provides automatic print, copy, compare for this transaction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Eğitimi: Universal Verification Methodology Temelleri",
      initialCode: `// Example: PCIe transaction
class pcie_transaction extends uvm_sequence_item;
  rand bit [63:0] address;       // 64-bit address
  rand bit [31:0] data[];        // Payload (dynamic array)
  rand pcie_type_e trans_type;   // Read/Write/Message

  \`uvm_object_utils_begin(pcie_transaction)
    \`uvm_field_int(address, UVM_ALL_ON)
    \`uvm_field_array_int(data, UVM_ALL_ON)
    \`uvm_field_enum(pcie_type_e, trans_type, UVM_ALL_ON)
  \`uvm_object_utils_end

  // UVM provides automatic print, copy, compare for this transaction
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Eğitimi: Universal Verification Methodology Temelleri doğrulaması başarıyla tamamlandı.",
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
      question: "UVM'in (IEEE 1800.2) kendisinden önceki metodolojilere (OVM ve VMM) kıyasla yarı iletken endüstrisindeki en belirleyici avantajı nedir?",
      options: ["A) Tüm büyük EDA satıcıları tarafından desteklenen tek birleşik IEEE standardı olması ve Register Abstraction Layer (RAL) gibi kritik özellikleri standart olarak bünyesinde barındırması", "B) SystemVerilog dili yerine C++ derleyicisi kullanarak donanımı doğrudan makine koduna çevirmesi", "C) Sadece analog devrelerin doğrulanması için özelleştirilmiş olması", "D) Nesne yönelimli programlama mantığını terk edip testbench'leri tamamen transistör seviyesine indirgemesi"],
      correctIndex: 0,
      explanation: "UVM, Cadence, Mentor ve Synopsys'in üzerinde uzlaştığı resmi IEEE 1800.2 standardıdır. OVM'deki eksiklikleri gidererek VMM'in güçlü yazmaç katmanını (RAL) entegre etmiş ve sektör genelinde taşınabilir, çok satıcılı tek doğrulama ekosistemini kurmuştur.",
    },
  },
  "uvm-introduction": {
    id: "uvm-introduction",
    badge: "Modül 1 • UVM'e Giriş ve Temeller",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM'e Giriş: Mimari Prensipler ve Bileşen Hiyerarşisi",
    subtitle: "Modern SystemVerilog tabanlı testbench mimarisi, statik bileşenler (`uvm_component`) ile dinamik nesneler (`uvm_object`) arasındaki farklar.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uml_uvm_class_hier.svg)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde UVM'in temel yapı taşlarını ve çalışma felsefesini derinlemesine inceleyeceksiniz:
- UVM'in SystemVerilog dili ile olan ilişkisi ve neden bir dil değil kütüphane olduğu
- Standart bir UVM doğrulama ortamının mimari bileşenleri (\`driver\`, \`monitor\`, \`sequencer\`, \`scoreboard\`, \`agent\`, \`env\`)
- Statik bileşenler (\`uvm_component\`) ile dinamik veri nesneleri (\`uvm_object\`) arasındaki temel kavramsal farklar
- UVM sınıf hiyerarşisinin iki ana kolu ve sağladığı kalıtım avantajları`,
      },
      {
        title: "2. UVM Nedir ve SystemVerilog ile İlişkisi",
        content: `SystemVerilog sözdizimi, veri tipleri ve semantik kuralları olan bir programlama ve donanım tanımlama dilidir (HDL/HVL). UVM (Universal Verification Methodology) ise bu dilin Nesne Yönelimli Programlama (OOP) yetenekleri üzerine inşa edilmiş kapsamlı bir sınıf kütüphanesidir.

*Özetle:* SystemVerilog altyapıyı ve dili temsil ederken; UVM, profesyonel doğrulama testbench'leri geliştirmek için kullanılan hazır mimari blokları, tasarım desenlerini ve iletişim protokollerini sunar. UVM'i etkin kullanabilmek için sınıflar, kalıtım (inheritance), çok biçimlilik (polymorphism) ve arayüzler (interfaces) konularında sağlam bir SystemVerilog temeli şarttır.`,
      },
      {
        title: "3. Neden UVM Kullanmalıyız?",
        content: `UVM öncesi dönemde her doğrulama ekibi kendi testbench yapısını geliştiriyordu. Bu durum ciddi problemlere yol açıyordu:
- **Tutarsızlık:** Farklı projelerdeki test ortamları birbirinden tamamen farklı kodlama stillerine ve mimarilere sahipti.
- **Yeniden Kullanım Zorluğu:** Bir doğrulama bileşenini başka bir projeye taşımak aylar süren kod revizyonları gerektiriyordu.
- **Zor Entegrasyon:** Farklı ekiplerden gelen Doğrulama IP'lerini (VIP) birleştirmek uyumsuzluklar yaratıyordu.
- **Altyapıya Harcanan Zaman:** Mühendisler asıl işleri olan hata bulma ve uyarım üretmeye odaklanmak yerine raporlama, faz yönetimi ve haberleşme tesisatı yazmakla vakit kaybediyordu.

UVM bu sorunları tek tip mimari, standart fazlar, yerleşik raporlama ve TLM haberleşmesi ile çözerek mühendislerin sadece tasarımın doğrulanmasına odaklanmasını sağlar.`,
      },
      {
        title: "4. UVM Hangi Alanlarda Kullanılır?",
        content: `UVM, karmaşık yongada sistem (SoC) ve ASIC tasarımlarının endüstri standardı doğrulama metodolojisidir:
- **İşlemciler (CPU):** Komut boru hatları (pipeline), dallanma tahmincileri ve önbellek tutarlılığı (cache coherency) doğrulaması
- **Grafik İşlemciler (GPU):** Paralel gölgelendirici çekirdekleri ve yüksek bant genişlikli bellek alt sistemleri
- **Ağ Yongaları:** Paket ayrıştırıcılar, yüksek hızlı anahtarlama yapıları ve protokol motorları (Ethernet, PCIe)
- **Hızlandırıcılar (NPU/AI):** Tensör işleme birimleri ve DMA veri transfer kanalları`,
      },
      {
        title: "5. Doğrulama Ortamının Temel Yapı Taşları",
        content: `Doğrulanan tasarımın (DUT) türü ne olursa olsun, bir UVM test ortamı şu temel bileşenlerden oluşur:
- **\`uvm_driver\` (Sürücü):** Sequencer'dan aldığı üst düzey işlemleri (transactions) pin seviyesinde saat kenarlı sinyal dalgalarına dönüştürerek DUT arayüzüne sürer.
- **\`uvm_monitor\` (Monitör):** DUT arayüzündeki sinyalleri pasif olarak izler, pin seviyesindeki dalga formlarını yakalayarak paket/işlem (transaction) nesnelerine dönüştürür ve yayınlar.
- **\`uvm_sequencer\` (Sekansör):** Üretilen uyarım sekanslarını (sequences) yönetir, önceliklendirir ve sürücüye iletir.
- **\`uvm_scoreboard\` (Puan Tablosu / Karşılaştırıcı):** Monitörlerden gelen gerçek DUT çıktılarını referans modelin (predictor) ürettiği beklenen sonuçlarla karşılaştırır.
- **\`uvm_agent\` (Ajan):** Belirli bir arayüz için sürücü, monitör ve sekansörü tek bir modüler yapı altında paketler.
- **\`uvm_env\` (Ortam):** Birden fazla agent, scoreboard ve kapsama (coverage) bileşenini barındıran en üst düzey doğrulama kapsayıcısıdır.`,
      },
      {
        title: "6. Statik Bileşenler (`uvm_component`) ve Dinamik Nesneler (`uvm_object`)",
        content: `UVM ekosisteminde iki temel varlık türü bulunur:
1. **Statik Bileşenler (\`uvm_component\`):** Simülasyonun başından sonuna kadar yaşayan, testbench hiyerarşik ağacını oluşturan altyapı elemanlarıdır (şehirdeki binalar gibi). Örnek: \`uvm_driver\`, \`uvm_monitor\`, \`uvm_env\`. Bu sınıflar fazlara (\`build_phase\`, \`connect_phase\`, \`run_phase\`) sahiptir.
2. **Dinamik Nesneler (\`uvm_object\`):** Testbench içerisinde akan, dinamik olarak üretilip işlendikten sonra bellekten silinen veri paketleridir (şehirdeki arabalar ve yayalar gibi). Örnek: \`uvm_sequence_item\`, konfigürasyon nesneleri, sekanslar.

*Temel Mühendislik İlkesi:* Bileşenler (\`uvm_component\`) nesneleri (\`uvm_object\`) işler. Örneğin bir sürücü (bileşen), sekansörden gelen işlem nesnelerini (nesne) alarak DUT pinlerine uygular.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM'e Giriş: Mimari Prensipler ve Bileşen Hiyerarşisi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-introduction.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Example: Building complex stimulus from simple sequences
class test_sequence extends uvm_sequence #(my_transaction);
  // Create individual sequences
  read_sequence  read_seq;
  write_sequence write_seq;

  virtual task body();
    // Compose complex patterns: W->R->R->W
    write_seq.start(m_sequencer);
    read_seq.start(m_sequencer);
    read_seq.start(m_sequencer);
    write_seq.start(m_sequencer);
  endtask
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM'e Giriş: Mimari Prensipler ve Bileşen Hiyerarşisi",
      initialCode: `// Example: Building complex stimulus from simple sequences
class test_sequence extends uvm_sequence #(my_transaction);
  // Create individual sequences
  read_sequence  read_seq;
  write_sequence write_seq;

  virtual task body();
    // Compose complex patterns: W->R->R->W
    write_seq.start(m_sequencer);
    read_seq.start(m_sequencer);
    read_seq.start(m_sequencer);
    write_seq.start(m_sequencer);
  endtask
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM'e Giriş: Mimari Prensipler ve Bileşen Hiyerarşisi doğrulaması başarıyla tamamlandı.",
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
      question: "UVM mimarisinde `uvm_component` ile `uvm_object` arasındaki temel yapısal ve yaşam döngüsü farkı nedir?",
      options: ["A) `uvm_component` simülasyon boyunca yaşayan ve fazlara katılan statik hiyerarşik altyapı elemanıdır; `uvm_object` ise işlem (transaction) gibi dinamik olarak üretilip tüketilen veri paketidir", "B) `uvm_component` yalnızca rastgele veri üretirken, `uvm_object` donanımın pinlerini doğrudan sürer", "C) `uvm_object` `build_phase` ve `run_phase` gibi yürütme fazlarına sahiptir, `uvm_component` ise faz mekanizmasını desteklemez", "D) Her ikisi de doğrudan SystemVerilog modülü olup aralarında hiçbir fark yoktur"],
      correctIndex: 0,
      explanation: "`uvm_component`, `uvm_object`'ten türemiş olup simülasyon boyunca varlığını koruyan ve testbench hiyerarşisini oluşturan yapılardır (driver, monitor vb.). `uvm_object` ise işlem paketleri (transaction) gibi simülasyon sırasında ihtiyaç duyuldukça dinamik olarak üretilen ve yok edilen nesnelerdir.",
    },
  },
  "uvm-installation": {
    id: "uvm-installation",
    badge: "Modül 1 • UVM'e Giriş ve Temeller",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Kurulumu: Kütüphane Yapısı ve Simülatör Entegrasyonu",
    subtitle: "UVM kaynak kodunun temini, Linux geliştirme ortamının yapılandırılması ve EDA simülatörleriyle entegrasyon adımları.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde UVM'in teknik yapısını ve geliştirme ortamınıza nasıl entegre edileceğini öğreneceksiniz:
- UVM'in neden klasik anlamda kurulabilir bir 'program' değil, bir SystemVerilog kütüphanesi olduğu
- Ticari simülatörlerde yerleşik UVM desteği ve harici kaynak koduna ne zaman ihtiyaç duyulduğu
- Accellera Systems Initiative resmi kaynaklarından ve GitHub reposundan kod temini
- Linux terminal ortam değişkenleri (\`$UVM_HOME\`) ve derleme dizin parametreleri (\`-incdir\` / \`+incdir+\`)`,
      },
      {
        title: "2. UVM Bir Program Değil, Bir Kütüphanedir",
        content: `Synopsys VCS, Cadence Xcelium ve Siemens Questa gibi modern ticari simülatörlerin büyük kısmı UVM kütüphanesini kendi kurulum dizinlerinde hazır olarak barındırır. Bu araçlarda çoğu zaman hiçbir şey indirmenize gerek kalmaz; simülatöre hangi UVM sürümünü kullanacağını belirtmeniz yeterlidir (örneğin \`-uvm\` veya \`-uvmhome\`).

Harici olarak UVM indirme ihtiyacı şu durumlarda ortaya çıkar:
- Simülatörünüz UVM içermiyorsa veya eski bir sürümle geliyorsa
- Projeniz belirli bir UVM sürümüne (örneğin IEEE 1800.2-2020.3.1) kesin bağımlılık duyuyorsa
- Açık kaynaklı simülatörler veya hafif doğrulama akışları kuruyorsanız

Güncel endüstri standardı Accellera tarafından sağlanan **UVM 2020.3.1 (IEEE 1800.2)** referans uygulamasıdır. UVM 1.2 eski projelerde yaygın olsa da, yeni projelerde IEEE 1800.2 sürümü tercih edilmelidir.`,
      },
      {
        title: "3. UVM Kaynak Kodunu İndirme Yolları",
        content: `UVM kaynak koduna Accellera Systems Initiative üzerinden iki güvenilir yolla erişebilirsiniz:
1. **Accellera Tarball Arşivi:** Resmi web sitesinden paketlenmiş \`.tar.gz\` formatında indirme
2. **Resmi GitHub Deposu (\`uvm-core\`):** Git sürüm kontrol sistemi üzerinden doğrudan çekme`,
      },
      {
        title: "4. Seçenek 1: Accellera Tarball Arşivi",
        content: `\`accellera.org/downloads/standards/uvm\` adresine giderek **UVM v2020.3.1 Library Code for IEEE 1800.2** paketini indirin. Bu paket geleneksel \`.tar.gz\` formatında sunulur ve kütüphanenin tüm kaynak dosyalarını (\`src/\` dizini altında \`uvm_pkg.sv\` ve \`uvm_macros.svh\`) içerir.`,
      },
      {
        title: "5. Seçenek 2: Accellera Resmi GitHub Deposu",
        content: `Accellera, UVM sürümlerini GitHub üzerinde \`github.com/accellera-official/uvm-core\` adresinde yayınlamaktadır. Git kullanarak belirli bir etiketi (tag) klonlayabilir veya ara hata düzeltmelerini kolayca takip edebilirsiniz:
\`\`\`bash
git clone --branch 1800.2-2020-3.1 https://github.com/accellera-official/uvm-core.git
\`\`\`
Eğer eski bir proje için UVM 1.2 gerekliyse, Accellera'nın arşiv sayfasında geçmiş sürümlerin tamamı mevcuttur.`,
      },
      {
        title: "6. Linux Ortamında Kurulum ve Simülatör Bayrakları",
        content: `Arşiv indirildikten sonra Linux çalışma alanınızda şu adımları izleyin:

**Adım 1: Arşivi Açın**
\`\`\`bash
tar -xvf UVM-1800.2-2020.3.1.tar.gz
\`\`\`

**Adım 2: Ortam Değişkenini Tanımlayın**
Kullandığınız kabuk türüne göre (bash veya tcsh):
\`\`\`bash
# Bash için (~/.bashrc dosyasına ekleyebilirsiniz)
export UVM_HOME=/path/to/your/workspace/UVM-1800.2-2020.3.1

# Tcsh için (~/.cshrc dosyasına ekleyebilirsiniz)
setenv UVM_HOME /path/to/your/workspace/UVM-1800.2-2020.3.1
\`\`\`

**Adım 3: Simülatör Derleme Komutuna Dahil Edin**
Simülatörün \`uvm_pkg.sv\` ve \`uvm_macros.svh\` dosyalarını bulabilmesi için include dizinini belirtin:
\`\`\`bash
# Genel kullanım örneği
vlog +incdir+$UVM_HOME/src $UVM_HOME/src/uvm_pkg.sv tb_top.sv
\`\`\`
*İpucu:* \`$UVM_HOME\` değişkenini kabuk başlangıç dosyanıza (\`~/.bashrc\`) eklemek, her yeni terminal açtığınızda değişkeni yeniden tanımlama zorunluluğunu ortadan kaldırır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Kurulumu: Kütüphane Yapısı ve Simülatör Entegrasyonu** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-installation.sv - Örnek UVM Doğrulama Kodu",
          snippet: `\`include "uvm_macros.svh"
import uvm_pkg::*;

module test;
  initial begin
    \`uvm_info("TEST", "UVM environment is working!", UVM_LOW)
  end
endmodule`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Kurulumu: Kütüphane Yapısı ve Simülatör Entegrasyonu",
      initialCode: `\`include "uvm_macros.svh"
import uvm_pkg::*;

module test;
  initial begin
    \`uvm_info("TEST", "UVM environment is working!", UVM_LOW)
  end
endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Kurulumu: Kütüphane Yapısı ve Simülatör Entegrasyonu doğrulaması başarıyla tamamlandı.",
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
      question: "Linux ortamında harici bir UVM kaynak kütüphanesi ile çalışırken `$UVM_HOME` ortam değişkeninin ve simülatör include (`-incdir` / `+incdir+`) bayraklarının kullanılma amacı nedir?",
      options: ["A) Simülatör derleyicisinin `uvm_pkg.sv` paketini ve `uvm_macros.svh` makro başlık dosyasını bulabilmesi için kütüphanenin kaynak dizinini belirtmek", "B) Simülatör lisansını internetten otomatik olarak doğrulamak", "C) FPGA donanımına doğrudan bit akışı (bitstream) yüklemek", "D) Linux işletim sistemine yeni bir grafik sürücüsü kurmak"],
      correctIndex: 0,
      explanation: "UVM bir yazılım uygulaması değil, SystemVerilog kaynak kodlarından oluşan bir kütüphanedir. Simülatörün `uvm_pkg.sv` paketini derleyebilmesi ve ` `include \"uvm_macros.svh\" ` çağrılarını çözümleyebilmesi için `$UVM_HOME/src` dizininin include bayrağıyla derleyiciye tanıtılması şarttır.",
    },
  },
  "uvm-hello-world": {
    id: "uvm-hello-world",
    badge: "Modül 1 • UVM'e Giriş ve Temeller",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İlk UVM Testi: 'Hello World' Simülasyonu ve Temel Sınıflar",
    subtitle: "Minimal bir test (`uvm_test`), ortam (`uvm_env`) ve üst modül (`tb_top`) ile UVM faz ve raporlama mekanizmasının çalıştırılması.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/hello-uvm-block-diagram.svg)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde UVM dünyasının ilk çalışan kodunu yazacak ve UVM çalışma zamanı omurgasını inceleyeceksiniz:
- Donanım (DUT) olmaksızın UVM sınıf yapısının ve fazlarının nasıl ayağa kaldırıldığı
- \`uvm_test\` ve \`uvm_env\` sınıflarının tanımı, yapıcı metotları (\`new\`) ve UVM Fabrikası (Factory) kaydı
- Üst düzey SystemVerilog modülü (\`tb_top\`) ve küresel \`run_test()\` görevinin işleyişi
- \` \`uvm_info \` makrosu ve simülasyon çıktılarında raporlama mekanizması
- Yeni başlayan mühendislerin sıklıkla düştüğü 3 kritik hata ve çözümleri`,
      },
      {
        title: "2. Testbench Mimarisi ve Kurulum",
        content: `Bu ilk uygulamada henüz harici bir donanım (DUT) bulunmamaktadır. Amacımız, UVM'in temel nesne üretimini, bileşen hiyerarşisini ve simülasyon fazlarının çalışma mantığını en yalın haliyle gözlemlemektir.

Sistem üç temel parçadan oluşur:
1. \`base_test\`: Test senaryosunu yönetir ve ortamı (\`my_env\`) yaratır.
2. \`my_env\`: Test ortamını temsil eder ve simülasyon sırasında mesaj yazdırır.
3. \`tb_top\`: \`run_test()\` çağrısını yaparak simülasyonu başlatan SystemVerilog modülüdür.`,
      },
      {
        title: "3. Test Sınıfının Oluşturulması (`base_test`)",
        content: `Test sınıfı \`uvm_test\` sınıfından türetilir ve test ortamını (\`my_env\`) bünyesinde barındırır:
\`\`\`systemverilog
class base_test extends uvm_test;
  \`uvm_component_utils(base_test)

  my_env m_top_env;

  function new(string name = "base_test", uvm_component parent = null);
    super.new(name, parent);
  endfunction : new

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    m_top_env = my_env::type_id::create("m_top_env", this);
  endfunction : build_phase

  virtual function void end_of_elaboration_phase(uvm_phase phase);
    uvm_top.print_topology();
  endfunction : end_of_elaboration_phase
endclass : base_test
\`\`\`
*Önemli Ayrıntılar:*
- \` \`uvm_component_utils \`: Bileşeni UVM Fabrikasına (Factory) kaydeder.
- \`type_id::create\`: Bileşeni doğrudan \`new()\` ile değil, fabrika mekanizması üzerinden dinamik olarak üretir. Bu sayede test ortamında sınıflar kod değiştirilmeden 'override' edilebilir.
- \`uvm_top.print_topology()\`: Elaboration fazı sonunda testbench hiyerarşik ağacını konsola basarak doğru kurulduğunu teyit eder.`,
      },
      {
        title: "4. Ortam Sınıfı (`my_env`) ve `run_phase` Süreci",
        content: `Ortam sınıfı \`uvm_env\`'den türetilir. Bu örnekte tek görevi \`run_phase\` içerisinde simülasyon mesajı yazdırmaktır:
\`\`\`systemverilog
class my_env extends uvm_env;
  \`uvm_component_utils(my_env)

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction : new

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
  endfunction : build_phase

  task run_phase(uvm_phase phase);
    \`uvm_info(get_name(), $sformatf("Hello UVM ! Simulation has started."), UVM_LOW)
  endtask : run_phase
endclass : my_env
\`\`\`
*\` \`uvm_info \` Makrosu:* \`$display\` yerine her zaman \` \`uvm_info \` kullanılmalıdır. Bu makro dosya adını, satır numarasını ve çağıran bileşenin hiyerarşik yolunu otomatik ekler. Ayrıca belirlenen verbosity seviyesine (örneğin \`UVM_LOW\`) göre simülasyon çıktısını filtreleme imkânı sunar.`,
      },
      {
        title: "5. Üst Düzey Modül (`tb_top`) ve Simülasyonun Başlatılması",
        content: `UVM sınıfları saf SystemVerilog sınıf kodlarıdır ve kendi başlarına çalışamazlar. Simülasyonu başlatmak için statik bir üst modül gereklidir:
\`\`\`systemverilog
module tb_top;
  import uvm_pkg::*;
  \`include "uvm_macros.svh"

  initial begin
    run_test("base_test");
  end
endmodule
\`\`\`
\`run_test("base_test")\` küresel görevi; belirtilen test sınıfını fabrikadan bulur, somutlaştırır ve \`build_phase\`'den başlayarak tüm UVM fazlarını sırayla yürütür.

*Simülasyon Çıktısı:*
\`\`\`text
UVM_INFO @ 0: reporter [RNTST] Running test base_test...
UVM_INFO @ 0: reporter [UVMTOP] UVM testbench topology:
------------------------------------
Name          Type       Size  Value
------------------------------------
uvm_test_top  base_test  -     @2601
  m_top_env   my_env     -     @201 
------------------------------------
UVM_INFO tb_top.sv(28) @ 0: uvm_test_top.m_top_env [m_top_env] Hello UVM ! Simulation has started.
--- UVM Report Summary ---
** Report counts by severity
UVM_INFO : 3
UVM_WARNING : 0
UVM_ERROR : 0
UVM_FATAL : 0
\`\`\`
*İpucu:* Test adını koda sabit yazmak yerine \`run_test();\` şeklinde boş bırakıp simülatör komut satırından \`+UVM_TESTNAME=base_test\` argümanı geçmek, kodu yeniden derlemeden farklı testler koşmanıza olanak tanır.`,
      },
      {
        title: "6. Yeni Başlayanların Yaptığı 3 Yaygın Hata",
        content: `1. **\`super.build_phase(phase)\` Çağrısını Unutmak:** Üst sınıfın \`build_phase\` metodunu çağırmamak, UVM altyapısının otomatik konfigürasyon mekanizmalarını bozar.
2. **Fabrika Yerine Doğrudan \`new()\` Kullanmak:** \`m_top_env = new(...)\` yazmak derlenir ancak fabrikayı devre dışı bırakır. Gelecekte sınıf tipini değiştirmek (override) istediğinizde kodunuz buna izin vermez.
3. **\`run_test\` İçinde Test Adını Unutmak:** Argümansız \`run_test();\` çağrıldığında komut satırından \`+UVM_TESTNAME\` geçilmezse, UVM koşacak test bulamaz ve simülasyon zaman 0'da sonlanır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **İlk UVM Testi: 'Hello World' Simülasyonu ve Temel Sınıflar** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-hello-world.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class base_test extends uvm_test;`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: İlk UVM Testi: 'Hello World' Simülasyonu ve Temel Sınıflar",
      initialCode: `class base_test extends uvm_test;`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] İlk UVM Testi: 'Hello World' Simülasyonu ve Temel Sınıflar doğrulaması başarıyla tamamlandı.",
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
      question: "UVM'de bir bileşenin `build_phase` metodunda alt bileşenleri oluştururken neden doğrudan `new()` yerine `type_id::create()` kullanılması zorunlu bir en iyi uygulamadır (best practice)?",
      options: ["A) `type_id::create()` çağrısı UVM Fabrikası (Factory) mekanizmasını kullanarak, test senaryolarında orijinal sınıf koduna dokunmadan tipleri geçersiz kılmaya (override) imkân tanır", "B) `new()` çağrısı SystemVerilog'da dinamik bellek tahsis edemez", "C) `type_id::create()` çağrısı simülasyonu anında durdurur ve derleyiciye haber verir", "D) `new()` anahtar kelimesi UVM kütüphanesinde tamamen yasaklanmıştır"],
      correctIndex: 0,
      explanation: "UVM Fabrikası (Factory) tasarım deseni nesne üretimini soyutlar. `type_id::create()` ile üretilen bileşenler, üst düzey testlerde `set_type_override_by_type` gibi yöntemlerle kaynak kod değiştirilmeden genişletilmiş/türetilmiş yeni bir sınıfla değiştirilebilir. `new()` kullanmak fabrikayı baypas eder ve bu esnekliği yok eder.",
    },
  },
  "uvm-build-your-first-testbench": {
    id: "uvm-build-your-first-testbench",
    badge: "Modül 2 • İlk Testbench ve Bileşen Mimarisi",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İlk UVM Doğrulama Ortamını İnşa Etme: DUT ve Arayüz (Interface)",
    subtitle: "16 yazmaçlı bellek modülü (DUT), SystemVerilog arayüzü (`reg_if`) ve sinyal gruplama mimarisi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/testbench_dut_interface_block_diagram.svg)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde somut bir donanım bloğunu (DUT) test etmek için gereken temel yapıları kuracaksınız:
- Doğrulanacak donanım tasarımı: 16 adresli bellek haritalı yazmaç bloğu (\`reg_block\`)
- Testbench ve DUT arasındaki sinyal kablolarını düzenleyen SystemVerilog arayüzü (\`reg_if\`)
- \`interface\` kullanımının tekil sinyal bildirimlerine göre avantajları
- DUT modülünün arayüz bağlantısı ve saat kenarı (clock edge) davranışı
- Kritik tasarım analizi: Eşzamanlı yazma/okuma çakışmaları ve doğrulama kısıtları`,
      },
      {
        title: "2. Test Edilen Tasarım (DUT): Bellek Haritalı Yazmaç Bloğu",
        content: `Bu eğitim serisi boyunca doğrulayacağımız tasarım \`reg_block\` modülüdür. Bu modül 16 adet 8-bitlik yazmaçtan oluşan bir yazmaç dosyasıdır (register file). İki temel işlemi destekler:
1. **Yazma (Write):** Belirli bir adrese 1 baytlık veri yazar.
2. **Okuma (Read):** Belirtilen adresteki 1 baytlık veriyi dışarı aktarır.

Tasarım 1 saykıllık okuma gecikmesine (latency) sahiptir; yani okuma talebi yapıldıktan sonraki saat kenarında veri \`rdata\` pininde geçerli olur.`,
      },
      {
        title: "3. Bu Tasarım Deseni Endüstride Nerede Kullanılır?",
        content: `Bellek haritalı yazmaç blokları (CSR - Control & Status Registers), modern dijital tasarımın her yerindedir. Bir mikrodenetleyicideki çevre birimlerinin (UART, SPI, I2C) ayar yazmaçları, yapay zekâ hızlandırıcılarının konfigürasyon tabloları veya AXI/APB veri yolu arkasındaki yazmaç alanları hep bu mimariyle çalışır.`,
      },
      {
        title: "4. Neden Tekil Sinyaller Değil de `interface` Kullanılır?",
        content: `Testbench ile DUT'u tek tek \`logic clk, logic wr_en, logic [7:0] wdata...\` gibi onlarca ayrı sinyal teliyle bağlamak, karmaşık tasarımlarda yönetilemez bir kablo kargaşası yaratır. SystemVerilog'un \`interface\` yapısı, birbiriyle ilişkili sinyalleri tek bir paket altında toplar ve tek bir tutamaç (handle) olarak bileşenlere aktarılmasına olanak tanır.

\`\`\`systemverilog
interface reg_if (input bit clk);
  logic       rst_n;
  logic       wr_en;
  logic       rd_en;
  logic [3:0] addr;
  logic [7:0] wdata;
  logic [7:0] rdata;
endinterface
\`\`\`
- \`clk\`: Arayüze dışarıdan beslenen referans saat sinyali
- \`rst_n\`: Aktif-düşük (active-low) sıfırlama sinyali
- \`wr_en\` / \`rd_en\`: 1 saat çevrimi süren yazma ve okuma tetikleyicileri
- \`addr\`: 16 konumu seçen 4-bitlik adres hattı
- \`wdata\`: Testbench tarafından DUT'a yazılan 8-bit veri
- \`rdata\`: DUT tarafından okuma işleminde üretilen 8-bit yanıt verisi`,
      },
      {
        title: "5. DUT Modülü (`reg_block`) Gerçeklemesi",
        content: `Tanımladığımız arayüz sayesinde DUT modülü artık uzun bir port listesi yerine sadece tek bir arayüz portu alır:
\`\`\`systemverilog
module reg_block (reg_if vif);
  logic [7:0] mem [0:15];

  always @(posedge vif.clk or negedge vif.rst_n) begin
    if (!vif.rst_n) begin
      vif.rdata <= 8'h00;
    end else begin
      if (vif.wr_en) begin
        mem[vif.addr] <= vif.wdata;
      end else if (vif.rd_en) begin
        vif.rdata <= mem[vif.addr];
      end
    end
  end
endmodule
\`\`\`
Davranış son derece nettir: \`vif.clk\` yükselen kenarında önce reset kontrol edilir. Reset pasifse \`wr_en\` kontrol edilir ve \`wdata\` belleğe yazılır. Eğer yazma yoksa ve \`rd_en\` aktifse, bellekteki veri \`vif.rdata\` çıkışına sürülür.`,
      },
      {
        title: "6. Kritik Mühendislik Analizi: Sinyal Öncelikleri ve Çakışmalar",
        content: `**Soru:** Eğer aynı saat çevriminde hem \`wr_en\` hem de \`rd_en\` lojik-1 yapılırsa donanım ne tepki verir?

**Analiz:** DUT kodundaki \`if (vif.wr_en) ... else if (vif.rd_en)\` yapısı gereği donanım yazma işlemini yapar, okuma işlemini ise tamamen yok sayar. Ancak gerçek bir protokolde aynı anda hem okuma hem yazma talep etmek belirsiz veya tanımsız bir durumdur. Doğrulama mühendisi olarak bir sonraki adımda yazacağımız UVM işlem sınıfında (transaction) kısıtlar (constraints) tanımlayarak bu iki sinyalin asla aynı anda aktif olmamasını garanti altına alacağız.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **İlk UVM Doğrulama Ortamını İnşa Etme: DUT ve Arayüz (Interface)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-build-your-first-testbench.sv - Örnek UVM Doğrulama Kodu",
          snippet: `interface reg_if (input bit clk);
  logic        rst_n;
  logic        wr_en;
  logic        rd_en;
  logic [3:0]  addr;
  logic [7:0]  wdata;
  logic [7:0]  rdata;
endinterface`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: İlk UVM Doğrulama Ortamını İnşa Etme: DUT ve Arayüz (Interface)",
      initialCode: `interface reg_if (input bit clk);
  logic        rst_n;
  logic        wr_en;
  logic        rd_en;
  logic [3:0]  addr;
  logic [7:0]  wdata;
  logic [7:0]  rdata;
endinterface`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] İlk UVM Doğrulama Ortamını İnşa Etme: DUT ve Arayüz (Interface) doğrulaması başarıyla tamamlandı.",
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
      question: "`reg_block` tasarımında `if (vif.wr_en) ... else if (vif.rd_en)` mantığı varken, aynı saat kenarında hem `wr_en` hem `rd_en` aktif olursa ne gerçekleşir ve doğrulama mühendisi bunu nasıl ele almalıdır?",
      options: ["A) Donanım yazma işlemini yapar ve okumayı göz ardı eder; testbench tarafında kısıt (constraint) eklenerek bu belirsiz uyarımın üretilmesi engellenmelidir", "B) Simülatör kilitlenir ve derleme zamanı hatası verir", "C) Bellek içeriği kalıcı olarak silinir ve sıfırlanır", "D) Donanım aynı saat çevriminde her iki işlemi de kusursuz tamamlar"],
      correctIndex: 0,
      explanation: "Tasarım kodundaki `if-else` önceliği nedeniyle `wr_en` baskın gelir ve okuma isteği göz ardı edilir. Doğrulamada tanımsız donanım davranışlarını engellemek adına işlem sınıfına `wr_en != rd_en` kısıtı (constraint) eklenerek uyarımın geçerli protokol kurallarına uyması sağlanmalıdır.",
    },
  },
  "uvm-defining-the-transaction-class": {
    id: "uvm-defining-the-transaction-class",
    badge: "Modül 2 • İlk Testbench ve Bileşen Mimarisi",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İşlem Sınıfı Tanımlama: `uvm_sequence_item` ve Kısıtlar",
    subtitle: "Arayüz sinyallerinin nesne düzeyinde modellenmesi, rastgeleleştirme (`rand`), UVM alan makroları ve kısıt mimarisi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/transaction_fields_vs_interface_diagram.svg)
![UVM Mimari Şeması](/images/uvm/transaction_journey_diagram.svg)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde donanım arayüzündeki sinyal hareketlerini nesne yönelimli bir veri paketine dönüştüreceksiniz:
- İşlem (transaction) sınıflarının neden doğrudan \`uvm_object\` yerine \`uvm_sequence_item\` sınıfından türetildiği
- \`reg_if\` sinyalleriyle birebir eşleşen \`reg_transaction\` sınıfının tasarımı
- Hangi alanların \`rand\` olacağı ve yanıt alanlarının (\`rdata\`) neden \`rand\` yapılmadığı
- \`wr_xor_rd_c\` kısıtı ile protokol çakışmalarının kaynağında çözülmesi
- UVM alan otomasyon makrolarının (\` \`uvm_field_* \`) sağladığı yetenekler`,
      },
      {
        title: "2. `uvm_object`'ten `uvm_sequence_item`'a Geçiş",
        content: `Test ortamında veri taşıyan tüm nesneler \`uvm_object\` ailesine aittir. Ancak bir işlemin (transaction) nihai görevi; sekansör (sequencer) üzerinden sürücüye (driver) taşınmak ve gerektiğinde sekansöre geri bildirim iletmektir.

\`uvm_sequence_item\` sınıfı, \`uvm_object\` üzerine sekans yönetimi, işlem kimliği (transaction ID) ve sekansör el sıkışma (handshake) mekanizmalarını ekler. Bu nedenle sürücüye gönderilecek tüm işlem paketleri doğrudan \`uvm_sequence_item\` sınıfından türetilmelidir.`,
      },
      {
        title: "3. Pratik Uygulama Alanları",
        content: `Endüstride karşılaşacağınız her protokol UVC'si (AXI, APB, AHB, PCIe, Ethernet veya şirket içi özel veri yolları) tam olarak bu deseni takip eder. Her protokol, o arayüzün bir transferini temsil eden tek bir işlem sınıfı tanımlar.`,
      },
      {
        title: "4. `reg_transaction` Sınıfının Tanımlanması",
        content: `\`reg_transaction\` sınıfının alanları \`reg_if\` sinyallerini birebir yansıtır:
\`\`\`systemverilog
class reg_transaction extends uvm_sequence_item;
  rand bit       wr_en;
  rand bit       rd_en;
  rand bit [3:0] addr;
  rand bit [7:0] wdata;
       bit [7:0] rdata;

  constraint wr_xor_rd_c {
    wr_en != rd_en;
  }

  \`uvm_object_utils_begin(reg_transaction)
    \`uvm_field_int(wr_en, UVM_ALL_ON)
    \`uvm_field_int(rd_en, UVM_ALL_ON)
    \`uvm_field_int(addr,  UVM_ALL_ON)
    \`uvm_field_int(wdata, UVM_ALL_ON)
    \`uvm_field_int(rdata, UVM_ALL_ON)
  \`uvm_object_utils_end

  function new(string name = "reg_transaction");
    super.new(name);
  endfunction
endclass
\`\`\`
*Kritik Tasarım Kararları:*
- \`wr_en\`, \`rd_en\`, \`addr\`, \`wdata\` alanları \`rand\` olarak işaretlenmiştir; çünkü bunlar test ortamının rastgele uyarım üretirken belirleyeceği giriş alanlarıdır.
- \`rdata\` alanı **bilerek \`rand\` yapılmamıştır**. Çünkü \`rdata\` bir uyarım değil, DUT'un okuma işlemine verdiği cevaptır (response). Sürücü veya monitör tarafından doldurulacaktır.`,
      },
      {
        title: "5. `wr_en` ve `rd_en` Belirsizliğinin Kısıtla Çözülmesi",
        content: `Bir önceki derste tartıştığımız eşzamanlı okuma ve yazma çakışması, \`wr_xor_rd_c\` kısıtıyla çözülür:
\`\`\`systemverilog
constraint wr_xor_rd_c {
  wr_en != rd_en;
}
\`\`\`
İki tek-bitlik değer arasında \`!=\` ifadesi, sadece biri 1 diğeri 0 olduğunda doğrudur (XOR mantığı). Böylece rastgele üretilen her işlem kesinlikle ya bir yazma ya da bir okuma işlemi olur. Asla ikisi birden 1 veya ikisi birden 0 olamaz.`,
      },
      {
        title: "6. Kısıtların Rastgeleleştirmeye Etkisi: Mühendislik Analizi",
        content: `**Soru:** Eğer \`wr_xor_rd_c\` kısıtını kaldırırsak \`randomize()\` çağrısı başarısız olur mu?

**Cevap:** Hayır, \`randomize()\` başarısız olmaz! Kısıt olmadığında \`wr_en\` ve \`rd_en\` bağımsız iki bit olarak 4 farklı olasılığı (00, 01, 10, 11) üretir. Fonksiyon hata vermez ancak donanım açısından anlamsız veya belirsiz durumlar üretilmiş olur. Kısıtların amacı çözücüyü (solver) kilitlemek değil, üretilen uyarımın geçerli protokol sınırları içinde kalmasını sağlamaktır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **İşlem Sınıfı Tanımlama: \`uvm_sequence_item\` ve Kısıtlar** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-defining-the-transaction-class.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class reg_transaction extends uvm_sequence_item;

  rand bit       wr_en;
  rand bit       rd_en;
  rand bit [3:0] addr;
  rand bit [7:0] wdata;
       bit [7:0] rdata;

  constraint wr_xor_rd_c {
    wr_en != rd_en;
  }

  \`uvm_object_utils_begin(reg_transaction)
    \`uvm_field_int(wr_en,  UVM_ALL_ON)
    \`uvm_field_int(rd_en,  UVM_ALL_ON)
    \`uvm_field_int(addr,   UVM_ALL_ON)
    \`uvm_field_int(wdata,  UVM_ALL_ON)
    \`uvm_field_int(rdata,  UVM_ALL_ON)
  \`uvm_object_utils_end

  function new(string name = "reg_transaction");
    super.new(name);
  endfunction

endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: İşlem Sınıfı Tanımlama: `uvm_sequence_item` ve Kısıtlar",
      initialCode: `class reg_transaction extends uvm_sequence_item;

  rand bit       wr_en;
  rand bit       rd_en;
  rand bit [3:0] addr;
  rand bit [7:0] wdata;
       bit [7:0] rdata;

  constraint wr_xor_rd_c {
    wr_en != rd_en;
  }

  \`uvm_object_utils_begin(reg_transaction)
    \`uvm_field_int(wr_en,  UVM_ALL_ON)
    \`uvm_field_int(rd_en,  UVM_ALL_ON)
    \`uvm_field_int(addr,   UVM_ALL_ON)
    \`uvm_field_int(wdata,  UVM_ALL_ON)
    \`uvm_field_int(rdata,  UVM_ALL_ON)
  \`uvm_object_utils_end

  function new(string name = "reg_transaction");
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
        "UVM_INFO @ 10: uvm_test_top [RUN] İşlem Sınıfı Tanımlama: \`uvm_sequence_item\` ve Kısıtlar doğrulaması başarıyla tamamlandı.",
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
      question: "`reg_transaction` sınıfında `rdata` alanının `rand` yapılmamasının ve `wr_xor_rd_c` kısıtının eklenmesinin temel mühendislik sebebi nedir?",
      options: ["A) `rdata` DUT'tan dönen bir yanıt (response) alanıdır ve testbench tarafından rastgele üretilmez; kısıt ise her işlemin kesinlikle ya sadece okuma ya da sadece yazma olmasını sağlar", "B) `rdata` 8-bit olduğu için SystemVerilog 8-bitlik değişkenleri rastgeleleştiremez", "C) Kısıt yazılmazsa simülatör bellek taşması hatası verir", "D) `rand` anahtar kelimesi yalnızca adres değişkenleri için kullanılabilir"],
      correctIndex: 0,
      explanation: "Sürücü donanımı uyarırken adres ve yazma verisini rastgele üretir; `rdata` ise DUT'un okuma talebine ürettiği cevaptır ve çalışma anında monitör/driver tarafından doldurulur. `wr_xor_rd_c` kısıtı da okuma ve yazma operasyonlarının birbirini dışlamasını (mutual exclusion) garanti eder.",
    },
  },
  "how-to-create-and-use-a-sequence": {
    id: "how-to-create-and-use-a-sequence",
    badge: "Modül 2 • İlk Testbench ve Bileşen Mimarisi",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Sekansları: Oluşturma, Başlatma ve İtiraz (Objection) Yönetimi",
    subtitle: "İşlem akışlarının organizasyonu, sekans başlatma yöntemleri (`start()` vs ` `uvm_do `) ve `raise_objection` / `drop_objection` yaşam döngüsü.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/sequence_container_library_diagram.svg)
![UVM Mimari Şeması](/images/uvm/sequence_objection_lifecycle_diagram.svg)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde test senaryolarını oluşturan sekans mimarisini ve UVM'in simülasyon kontrol mekanizmasını öğreneceksiniz:
- Sekansların (\`uvm_sequence\`) işlem kapsayıcısı olarak rolü
- Bir sekansı çalıştırmanın iki farklı yolu: Doğrudan \`start()\` metodu ve \` \`uvm_do \` makrosu
- Testin \`run_phase\` metodunda neden \` \`uvm_do \` kullanılamayacağı
- Simülasyonun vaktinden önce sonlanmasını engelleyen itiraz (objection) mekanizması (\`raise_objection\` / \`drop_objection\`)
- \`pre_body()\` ve \`post_body()\` kancalarında \`starting_phase\` denetimi`,
      },
      {
        title: "2. Sekanslar Birer İşlem Kapsayıcısıdır",
        content: `Tek bir \`reg_transaction\` nesnesi tek bir veri paketidir (bir okuma veya bir yazma işlemi). \`uvm_sequence\` ise bu işlemlerin organize bir koleksiyonudur. Örneğin; 'önce tüm yazmaçları sıfırla, ardından rastgele 100 adrese yaz ve doğrula' gibi karmaşık senaryolar bir sekans içinde kodlanır. Sekanslar başka sekansları da çağırabilir (hiyerarşik sekanslar).`,
      },
      {
        title: "3. Sekans Başlatmanın İki Yolu",
        content: `Bir sekansı çalıştırmak için iki temel yöntem bulunur:

**1. \`start()\` Metodunu Doğrudan Çağırmak:**
\`\`\`systemverilog
reg_sequence seq = reg_sequence::type_id::create("seq");
seq.start(m_sequencer);
\`\`\`
En temiz ve önerilen yöntemdir. Sekansın hangi sekansör üzerinde çalışacağını açıkça belirtir.

**2. \` \`uvm_do \` Makrosunu Kullanmak:**
\`\`\`systemverilog
\`uvm_do(seq)
\`\`\`
\` \`uvm_do \`, bir üst sekansın (parent sequence) kendi sekansörü üzerinde alt sekans veya transaction başlatırken kullanılır. Arka planda nesneyi oluşturur, rastgeleleştirir ve başlatır.`,
      },
      {
        title: "4. Kritik Mühendislik Sorusu: Test İçinde ` `uvm_do ` Kullanılabilir mi?",
        content: `**Soru:** Bir test sınıfının \`run_phase\` görevi içinde \`seq.start(m_sequencer)\` yerine \` \`uvm_do(seq) \` kullanılabilir mi?

**Cevap:** Doğrudan kullanılamaz! Çünkü \` \`uvm_do \` makrosu, çağıran yapının (\`this\`) bir sekans olduğunu varsayar ve onun sekansör tutamacını (\`m_sequencer\`) referans alır. Oysa \`base_test\` bir sekans değil, bir \`uvm_test\` (bileşen) sınıfıdır. Bu nedenle test düzeyinde sekanslar her zaman açıkça \`seq.start(...)\` yöntemiyle başlatılmalıdır.`,
      },
      {
        title: "5. Simülasyonu Canlı Tutmak: İtiraz (Objection) Mekanizması",
        content: `UVM'de simülasyon zamanı, \`run_phase\` fazında tüketilir. UVM'in kuralı şudur: Eğer hiçbir bileşen veya sekans itirazda bulunmamışsa (\`raise_objection\`), UVM yapılacak iş kalmadığını varsayar ve simülasyon zamanı (time 0'da) anında sona erer!

Simülasyonun sekans tamamlanana kadar devam etmesini sağlamak için itiraz yükseltilmeli ve işlem bitince düşürülmelidir:
\`\`\`systemverilog
task run_phase(uvm_phase phase);
  phase.raise_objection(this);
  seq.start(m_env.m_agent.m_sequencer);
  phase.drop_objection(this);
endtask
\`\`\``,
      },
      {
        title: "6. `pre_body()` ve `starting_phase` Mekanizması",
        content: `Eski UVM şablonlarında sekansın kendi içinde itiraz kaldırması için \`pre_body()\` ve \`post_body()\` kullanılırdı:
\`\`\`systemverilog
virtual task pre_body();
  if (starting_phase != null)
    starting_phase.raise_objection(this);
endtask
\`\`\`
Eğer sekans \`start()\` ile manuel çağrılırsa \`starting_phase\` değeri \`null\` döner ve bu kontrol objection kaldırmayı atlar. Modern IEEE 1800.2 standartlarında en temiz pratik, objection yönetimini sekansı başlatan testin \`run_phase\` metodunda açıkça yönetmektir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Sekansları: Oluşturma, Başlatma ve İtiraz (Objection) Yönetimi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "how-to-create-and-use-a-sequence.sv - Örnek UVM Doğrulama Kodu",
          snippet: `reg_sequence seq;
seq = reg_sequence::type_id::create("seq");
seq.start(m_sequencer);`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Sekansları: Oluşturma, Başlatma ve İtiraz (Objection) Yönetimi",
      initialCode: `reg_sequence seq;
seq = reg_sequence::type_id::create("seq");
seq.start(m_sequencer);`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Sekansları: Oluşturma, Başlatma ve İtiraz (Objection) Yönetimi doğrulaması başarıyla tamamlandı.",
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
      question: "Bir UVM testinin `run_phase` metodunda `phase.raise_objection(this)` çağrısı yapılmazsa ne gerçekleşir?",
      options: ["A) UVM aktif iş kalmadığını varsayar ve simülasyon zaman ilerlemeden (Time 0'da) hemen sonlanır", "B) Simülatör sonsuz döngüye girerek donar", "C) Sekanslar otomatik olarak 1000 döngü boyunca çalıştırılır", "D) Derleyici sözdizimi hatası vererek kodu derlemez"],
      correctIndex: 0,
      explanation: "UVM'in çalışma zamanı fazları objection (itiraz) sayacına bağlıdır. Eğer simülasyon başladığında sayaç 0 ise, UVM faz yöneticisi çalıştırılacak uyarım kalmadığını kabul eder ve simülasyonu derhal sonlandırır.",
    },
  },
  "uvm-scoreboard": {
    id: "uvm-scoreboard",
    badge: "Modül 2 • İlk Testbench ve Bileşen Mimarisi",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Scoreboard: Referans Model ve Otomatik Karşılaştırma",
    subtitle: "DUT çıktılarının doğruluğunu denetleyen referans model mimarisi, `uvm_analysis_imp` portu ve veri bütünlüğü denetimi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm_scoreboard.svg)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde test ortamının 'yargıcı' olan Scoreboard bileşenini inşa edeceksiniz:
- Scoreboard'un doğrulama ortamındaki kritik görevi ve fonksiyonel kapsamadan (coverage) farkı
- \`uvm_analysis_imp\` analiz uygulama portunun elle tanımlanması
- DUT'un beklenen davranışını simüle eden referans modelin (predictor) kurulması
- \`write()\` metodu üzerinden beklenen (expected) ve gerçekleşen (actual) verilerin otomatik karşılaştırılması
- Okuma/yazma kenar durumlarında sahte hataların (false positive) engellenmesi`,
      },
      {
        title: "2. Scoreboard Nedir? Referans Model (Predictor) Kavramı",
        content: `Scoreboard, donanımın doğru çalışıp çalışmadığını bağımsız olarak denetleyen doğrulama bileşenidir. Yazmaç bloğumuz için cevaplanması gereken soru basittir: Belirli bir adrese bir bayt veri yazıldıysa, daha sonra aynı adresten yapılan okuma o baytı doğru şekilde geri döndürüyor mu?

Bunu denetleyebilmek için Scoreboard'un donanımdan bağımsız bir **referans modele (reference model / predictor)** ihtiyacı vardır. Scoreboard, monitörün yakaladığı her yazma işlemini bu referans modelde saklar ve okuma işlemi geldiğinde donanımın çıktısını bu tahminle karşılaştırır.`,
      },
      {
        title: "3. Adım 1: Sınıfın Bildirilmesi (`reg_scoreboard`)",
        content: `Scoreboard sınıfı \`uvm_scoreboard\`'dan türetilir:
\`\`\`systemverilog
class reg_scoreboard extends uvm_scoreboard;
  \`uvm_component_utils(reg_scoreboard)

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction
endclass
\`\`\`
\`uvm_scoreboard\` doğrudan \`uvm_component\` üzerine ek bir metot getirmese de standart isimlendirme ve mimari netlik açısından her zaman \`uvm_scoreboard\`'dan türetilmelidir.`,
      },
      {
        title: "4. Adım 2: Analysis Implementation Portunun (`uvm_analysis_imp`) Kurulması",
        content: `Monitörden yayınlanan işlemleri yakalamak için Scoreboard bir \`uvm_analysis_imp\` portu tanımlar:
\`\`\`systemverilog
uvm_analysis_imp #(reg_transaction, reg_scoreboard) ap_imp;

function void build_phase(uvm_phase phase);
  super.build_phase(phase);
  ap_imp = new("ap_imp", this);
endfunction
\`\`\`
Bu bildirim, monitör \`ap.write(tr)\` çağrısı yaptığında Scoreboard içerisindeki \`write(reg_transaction tr)\` metodunun otomatik olarak tetiklenmesini sağlar.`,
      },
      {
        title: "5. Adım 3: Referans Modelin ve `write()` Metodunun Gerçeklenmesi",
        content: `Scoreboard referans belleğini ve karşılaştırma mantığını bünyesinde barındırır:
\`\`\`systemverilog
bit [7:0] expected_mem [16];
bit       written [16];

virtual function void write(reg_transaction tr);
  if (tr.wr_en) begin
    expected_mem[tr.addr] = tr.wdata;
    written[tr.addr]      = 1;
  end else if (tr.rd_en) begin
    if (!written[tr.addr]) begin
      \`uvm_info(get_type_name(), $sformatf("Adres=%0d henüz yazılmadı, denetim atlandı", tr.addr), UVM_LOW)
    end else if (tr.rdata != expected_mem[tr.addr]) begin
      \`uvm_error(get_type_name(), $sformatf("Uyuşmazlık! Adres=%0d: Beklenen=0x%0h Gerçekleşen=0x%0h", tr.addr, expected_mem[tr.addr], tr.rdata))
    end else begin
      \`uvm_info(get_type_name(), $sformatf("Adres=%0d eşleşti: 0x%0h", tr.addr, tr.rdata), UVM_HIGH)
    end
  end
endfunction
\`\`\``,
      },
      {
        title: "6. Kenar Durum Analizi: Henüz Yazılmamış Adreslerin Okunması",
        content: `**Kritik Mühendislik İpucu:** Eğer daha önce hiç yazma yapılmamış bir adresten okuma yapılırsa ne yapılmalıdır? Donanım sıfırlama sonrası tanımsız veya rastgele bir değer döndürebilir. Eğer referans modelde varsayılan 0 ile karşılaştırırsak sahte uyuşmazlık hataları (\`false error\`) üretiriz. \`written[16]\` dizisi tam olarak bu kenar durumu yönetir; adrese yazma yapılmadığı sürece karşılaştırma yapmaz ve gereksiz hata üretimini engeller.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Scoreboard: Referans Model ve Otomatik Karşılaştırma** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-scoreboard.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class reg_scoreboard extends uvm_scoreboard;

  \`uvm_component_utils(reg_scoreboard)

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  // Code for rest of the steps come here
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Scoreboard: Referans Model ve Otomatik Karşılaştırma",
      initialCode: `class reg_scoreboard extends uvm_scoreboard;

  \`uvm_component_utils(reg_scoreboard)

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  // Code for rest of the steps come here
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Scoreboard: Referans Model ve Otomatik Karşılaştırma doğrulaması başarıyla tamamlandı.",
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
      question: "`reg_scoreboard` referans modelinde daha önce yazma işlemi görmemiş bir adres okunduğunda neden doğrudan `expected_mem` içeriği ile karşılaştırma yapılmaz?",
      options: ["A) Donanım yazmaçlarının başlangıç değeri tanımsız olabileceğinden, varsayılan bir değerle karşılaştırmak sahte hata (false mismatch) raporlanmasına yol açar", "B) `uvm_analysis_imp` portu yazma yapılmadan veri kabul edemez", "C) SystemVerilog dizileri ilk değer atanmadan okunursa simülatör çöker", "D) Monitör yazılmamış adreslerin verisini asla yakalayamaz"],
      correctIndex: 0,
      explanation: "Henüz yazma yapılmamış bir adresin donanımdaki fiziksel içeriği belirsiz veya tanımsız olabilir. Referans modelde varsayılan bir değer (örneğin 0) olduğunu farz edip karşılaştırma yapmak yanıltıcı hatalara (`uvm_error`) neden olur. Bu yüzden `written` bayrağı ile adresin geçerliliği doğrulanır.",
    },
  },
  "uvm-agent": {
    id: "uvm-agent",
    badge: "Modül 2 • İlk Testbench ve Bileşen Mimarisi",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Agent: Sequencer, Driver ve Monitor Kapsülleme",
    subtitle: "Aktif ve pasif agent mimarisi, `is_active` konfigürasyonu ve protokol doğrulama bileşenlerinin birleştirilmesi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm_agent.svg)
![UVM Mimari Şeması](/images/uvm/uvm-agent.gif)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde doğrulama ortamının en temel yapısal birimi olan \`uvm_agent\` mimarisini inceleyeceksiniz:
- Agent'ın sürücü (\`driver\`), monitör (\`monitor\`) ve sekansörü (\`sequencer\`) kapsülleme rolü
- Aktif (Active) ve Pasif (Passive) agent arasındaki farklar ve endüstriyel kullanım senaryoları
- \`reg_agent\` sınıfının inşası ve bileşen tutamaçlarının tanımlanması
- \`build_phase\` içerisinde \`get_is_active()\` kontrolü ile dinamik bileşen üretimi
- Dışarıdan \`uvm_config_db\` ile agent çalışma modunun yapılandırılması`,
      },
      {
        title: "2. Agent Nedir? Protokol Doğrulama Paketi (UVC)",
        content: `Bir agent, belirli bir arayüz veya protokol için gereken sürücü, monitör ve sekansörü tek bir bağımsız varlık altında toplar. UVM'in temel tasarım felsefesi olan yeniden kullanılabilirlik (reusability), agent düzeyinde başlar. Örneğin geliştirdiğiniz bir APB Agent'ı, yarın başka bir projeye hiçbir değişiklik yapmadan doğrudan entegre edebilirsiniz.`,
      },
      {
        title: "3. Aktif vs. Pasif Agent Ayrımı",
        content: `- **Aktif Agent (\`UVM_ACTIVE\`):** Sequencer, Driver ve Monitor bileşenlerinin üçünü de barındırır. Görevi DUT'a uyarım sürmek ve aynı zamanda arayüzü izlemektir.
- **Pasif Agent (\`UVM_PASSIVE\`):** Yalnızca Monitor (ve varsa kapsamı) barındırır; Driver ve Sequencer üretilmez. Görevi hatta hiçbir sinyal sürmeden yalnızca geçen trafiği gözlemlemek, kapsama toplamak ve scoreboard'a veri sağlamaktır.

*Kullanım Alanı:* Bir SoC üzerinde iki blok birbiriyle haberleşiyorsa, aradaki arayüzü testbench sürmez (donanım sürer). Bu durumda aradaki hattı izlemek için pasif bir agent konumlandırılır.`,
      },
      {
        title: "4. Adım 1 & 2: Sınıfın Bildirilmesi ve Tutamaçlar",
        content: `\`reg_agent\` sınıfı \`uvm_agent\` sınıfından türetilir ve ilgili bileşenlerin tutamaçlarını bildirir:
\`\`\`systemverilog
class reg_agent extends uvm_agent;
  \`uvm_component_utils(reg_agent)

  reg_driver    m_driver;
  reg_monitor   m_monitor;
  reg_sequencer m_sequencer;
  reg_coverage  m_coverage;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction
  // build_phase ve connect_phase adımları
endclass
\`\`\``,
      },
      {
        title: "5. Adım 3: `build_phase` İçerisinde Koşullu Üretim",
        content: `Bileşenler \`get_is_active()\` fonksiyonunun sonucuna göre oluşturulur:
\`\`\`systemverilog
virtual function void build_phase(uvm_phase phase);
  super.build_phase(phase);

  if (get_is_active()) begin
    m_sequencer = reg_sequencer::type_id::create("m_sequencer", this);
    m_driver    = reg_driver::type_id::create("m_driver", this);
  end

  m_monitor  = reg_monitor::type_id::create("m_monitor", this);
  m_coverage = reg_coverage::type_id::create("m_coverage", this);
endfunction
\`\`\`
\`m_monitor\` ve \`m_coverage\` her durumda oluşturulur; çünkü agent pasif de olsa aktif de olsa hattı dinlemek ve analiz etmek zorundadır.`,
      },
      {
        title: "6. En İyi Uygulamalar (Best Practices): Agent Yapılandırması",
        content: `Bir agent'ın aktif veya pasif olacağı bilgisi kod içine sabitlenmemelidir. Bunun yerine üst ortam (\`uvm_env\`) veya test tarafından \`uvm_config_db\` aracılığıyla belirlenmelidir:
\`\`\`systemverilog
uvm_config_db#(uvm_active_passive_enum)::set(this, "m_agent", "is_active", UVM_PASSIVE);
\`\`\`
Bu sayede aynı testbench kodu içerisinde tek bir konfigürasyon değişikliğiyle agent pasif izleyici moduna geçirilebilir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Agent: Sequencer, Driver ve Monitor Kapsülleme** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-agent.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Inside reg_agent's build_phase
if (get_is_active()) begin
  // Build driver and sequencer
end
// Build monitor regardless`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Agent: Sequencer, Driver ve Monitor Kapsülleme",
      initialCode: `// Inside reg_agent's build_phase
if (get_is_active()) begin
  // Build driver and sequencer
end
// Build monitor regardless`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Agent: Sequencer, Driver ve Monitor Kapsülleme doğrulaması başarıyla tamamlandı.",
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
      question: "Bir UVM test ortamında `UVM_PASSIVE` modunda yapılandırılmış bir agent için hangi ifade doğrudur?",
      options: ["A) Yalnızca `monitor` (ve kapsama) bileşenlerini oluşturur; donanıma hiçbir sinyal sürmez, yalnızca arayüz trafiğini pasif olarak izler", "B) Hem `driver` hem `sequencer` oluşturur ancak simülasyonu zaman 0'da durdurur", "C) Simülatör tarafından tamamen yok sayılır ve belleğe yüklenmez", "D) Sadece DUT'un saat ve reset hatlarını sürer"],
      correctIndex: 0,
      explanation: "`UVM_PASSIVE` agent'lar başka bir birim tarafından sürülen hatları yalnızca dinlemek, protokol kural ihlallerini denetlemek ve fonksiyonel kapsama toplamak için kullanılır. Bu modda `driver` ve `sequencer` oluşturulmaz.",
    },
  },
  "uvm-testbench-top": {
    id: "uvm-testbench-top",
    badge: "Modül 2 • İlk Testbench ve Bileşen Mimarisi",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Testbench Top: Donanım ve Doğrulama Ortamının Entegrasyonu",
    subtitle: "En üst düzey modül (`tb_top`), sanal arayüzün (`virtual interface`) `uvm_config_db` ile aktarılması ve `run_test()` yürütme mekanizması.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/tb_top.svg)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde statik donanım dünyası ile dinamik UVM sınıfları dünyasını birbirine bağlayan kök yapıyı inşa edeceksiniz:
- En üst düzey testbench modülünün (\`tb_top\`) yapısı ve tüm simülasyonun kökü olarak rolü
- Arayüz (\`reg_if\`) ve tasarımın (\`reg_block\`) somutlaştırılması (instantiation)
- \`uvm_config_db\` veritabanı aracılığıyla sanal arayüz tutamacının UVM bileşenlerine iletilmesi
- \`uvm_config_db::set\` çağrısının neden kesinlikle \`run_test()\` öncesinde yapılması gerektiği
- Küresel \`run_test()\` görevinin arka planda nasıl çalıştığı ve simülasyon fazlarını nasıl yönettiği
- Saat ve sıfırlama (clock & reset) sinyallerinin üretimi`,
      },
      {
        title: "2. Testbench Top Nedir? Donanım ve Doğrulamanın Kesişim Noktası",
        content: `Bütün doğrulama bileşenleri, arayüzler ve test edilen tasarım (DUT), genellikle \`tb_top\` olarak adlandırılan tek bir en üst düzey SystemVerilog modülü içinde somutlaştırılır. Bu modül UVM eğitim serisinin sınıf (class) olmayan tek parçasıdır; statik donanım hiyerarşisinin kökünü oluşturur.`,
      },
      {
        title: "3. `reg_if` ve `reg_block` Örneklemesi ve Sanal Arayüz Paylaşımı",
        content: `Bu adımda \`reg_if\` ve \`reg_block\` simülatör için somut bir donanıma dönüşür:
\`\`\`systemverilog
module tb_top;
  import uvm_pkg::*;
  \`include "uvm_macros.svh"

  bit clk;
  always #10 clk = ~clk;

  reg_if    reg_if0(clk);
  reg_block dut0(reg_if0);

  initial begin
    // Sanal arayüzü UVM konfigürasyon veritabanına kaydediyoruz
    uvm_config_db #(virtual reg_if)::set(null, "*", "vif", reg_if0);
    run_test("reg_test");
  end
endmodule
\`\`\`
\`uvm_config_db #(virtual reg_if)::set(null, "*", "vif", reg_if0);\` satırı, statik \`reg_if0\` arayüzünü bir sanal arayüz (\`virtual interface\`) tutamacı olarak UVM hiyerarşisindeki tüm bileşenlerin erişebileceği ortak havuzda paylaşır.`,
      },
      {
        title: "4. Kritik Mühendislik Sorusu: `uvm_config_db::set` Neden `run_test()` Öncesinde Çağrılmalıdır?",
        content: `**Soru:** \`uvm_config_db::set()\` çağrısı neden \`run_test("reg_test")\` satırından önce yer almalıdır? Sonrasına yazılırsa ne olur?

**Cevap:** \`run_test()\` başlatıldığı anda UVM'in \`build_phase\` fazı yukarıdan aşağıya (top-down) çalışmaya başlar. \`reg_test\` oluşturulur, o \`reg_env\`'i oluşturur, o da \`reg_driver\` ve \`reg_monitor\` bileşenlerini oluşturur. Sürücü kendi \`build_phase\` metodunda \`uvm_config_db::get(...)\` çağırarak arayüzü sorgular. Eğer \`set()\` çağrısı \`run_test()\` sonrasına bırakılırsa, \`get()\` işlemi başarısız olur (\`vif == null\`) ve sürücü ilk saat kenarında simülasyonu ölümcül bir kilitlenmeyle (fatal null-pointer dereference) çökerterek durdurur.`,
      },
      {
        title: "5. `run_test()` Arka Planda Nasıl Çalışır?",
        content: `\`run_test()\`, UVM çekirdeğinde yer alan küresel bir görevdir:
\`\`\`systemverilog
task run_test(string test_name = "");
  uvm_root top;
  uvm_coreservice_t cs;
  cs  = uvm_coreservice_t::get();
  top = cs.get_root();
  top.run_test(test_name);
endtask
\`\`\`
Arka planda tekil \`uvm_root\` (top) nesnesini alır. Belirtilen test adını fabrikadan (factory) arar, bellekte somutlaştırır (\`uvm_test_top\` adıyla) ve \`build_phase\`, \`connect_phase\`, \`run_phase\` gibi tüm standart fazları sırayla koordine ederek simülasyonu tamamlar.`,
      },
      {
        title: "6. Saat (Clock) ve Sıfırlama (Reset) Üretimi",
        content: `Basit bir testbench için saat üretimi tek bir blokla sağlanabilir:
\`\`\`systemverilog
always #10 clk = ~clk; // 50 MHz saat periyodu (20 ns)
\`\`\`
Sıfırlama işlemi ise başlangıçta asenkron olarak tetiklenir:
\`\`\`systemverilog
initial begin
  reg_if0.rst_n = 0;
  #40;
  reg_if0.rst_n = 1;
end
\`\`\`
*İleri Düzey SoC İpucu:* Birden fazla saat alanına (clock domain) sahip veya dinamik frekans değiştiren (DVFS) karmaşık sistemlerde, saat ve reset üretimi üst modülde sabit bloklar yerine özel 'clock & reset generator' UVM agent'ları ile kontrol edilir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Testbench Top: Donanım ve Doğrulama Ortamının Entegrasyonu** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-testbench-top.sv - Örnek UVM Doğrulama Kodu",
          snippet: `module tb_top;
  import uvm_pkg::*;
  \`include "uvm_macros.svh"

  bit clk;
  always #10 clk = ~clk;

  reg_if   reg_if0 (clk);
  reg_block dut0   (reg_if0);

  initial begin
    uvm_config_db #(virtual reg_if)::set(null, "uvm_test_top", "vif", reg_if0);
    run_test("reg_test");
  end

endmodule`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Testbench Top: Donanım ve Doğrulama Ortamının Entegrasyonu",
      initialCode: `module tb_top;
  import uvm_pkg::*;
  \`include "uvm_macros.svh"

  bit clk;
  always #10 clk = ~clk;

  reg_if   reg_if0 (clk);
  reg_block dut0   (reg_if0);

  initial begin
    uvm_config_db #(virtual reg_if)::set(null, "uvm_test_top", "vif", reg_if0);
    run_test("reg_test");
  end

endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Testbench Top: Donanım ve Doğrulama Ortamının Entegrasyonu doğrulaması başarıyla tamamlandı.",
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
      question: "`tb_top` modülünde `uvm_config_db#(virtual reg_if)::set(...)` işleminin `run_test()` çağrısından ÖNCE yazılması neden zorunludur?",
      options: ["A) `run_test()` başladığı anda bileşenlerin `build_phase` adımı çalışır; sürücü ve monitörler sanal arayüzü `get()` ile aradıklarında veritabanında arayüzün önceden kayıtlı olması gerekir", "B) `run_test()` çağrısı SystemVerilog'daki tüm global arayüzleri kalıcı olarak siler", "C) Sanal arayüzler yalnızca simülasyon bittikten sonra belleğe kaydedilebilir", "D) `uvm_config_db` fonksiyonu yalnızca derleyici optimizasyonlarında kullanılan bir derleme anahtarıdır"],
      correctIndex: 0,
      explanation: "UVM hiyerarşisi `run_test()` çağrısıyla beraber yukarıdan aşağıya inşa edilmeye başlar. Sürücü (`reg_driver`) ve monitör (`reg_monitor`) kendi `build_phase` metotlarında `uvm_config_db::get` ile sanal arayüzü çekerler. Eğer `set()` çağrısı `run_test()` öncesinde yapılmamışsa, arayüz bulunamaz ve simülasyon null-pointer hatası ile anında çöker.",
    },
  },
  "base-classes": {
    id: "base-classes",
    badge: "Modül 3 • Temel Sınıflar ve Nesne Yöntemleri",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Temel Sınıfları: Kalıtım Hiyerarşisi ve Çekirdek Yapılar",
    subtitle: "`uvm_void`'den `uvm_component`'e uzanan hiyerarşik kalıtım zinciri, raporlama yetenekleri ve `uvm_sequence_item` evrimi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm_base_classes_hierarchy.svg)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde UVM nesne yönelimli mimarisinin omurgasını oluşturan temel sınıfları inceleyeceksiniz:
- \`uvm_void\`'den \`uvm_component\`'e uzanan eksiksiz kalıtım zinciri
- \`uvm_report_object\` sınıfının \`uvm_object\` ile \`uvm_component\` arasındaki kritik konumu
- Hiyerarşinin dinamik nesne kolu ile statik bileşen kolu arasındaki mimari farklar
- \`uvm_transaction\` sınıfının neden artık önerilmediği (deprecated) ve yerine neden \`uvm_sequence_item\` kullanıldığı`,
      },
      {
        title: "2. `uvm_void`: Hiyerarşinin Kökü ve Polimorfik Tutamaç",
        content: `\`uvm_void\` tüm UVM sınıf ağacının en tepesinde yer alır ve bilerek tamamen boş tanımlanmıştır:
\`\`\`systemverilog
virtual class uvm_void;
endclass
\`\`\`
Hiçbir değişkeni veya metodu yoktur. Tek amacı, C dilindeki \`void*\` işaretçisi gibi genel bir polimorfik temel tip sağlamaktır. Böylece UVM kütüphanesi içerisinde herhangi bir UVM nesnesini genel bir tutamaç altında saklayabilen jenerik konteynerler oluşturulabilir.`,
      },
      {
        title: "3. `uvm_object`: Dinamik Verilerin ve Temel Fonksiyonların Yuvası",
        content: `\`uvm_object\`, UVM temel kütüphanesinin gerçek anlamda işlev kazandığı yerdir. Testbench'te veri taşıyan ve hiyerarşik yapı oluşturan her sınıf (\`transaction\`, \`sequence\`, \`configuration\` ve bileşenler) bu sınıftan türer.

\`uvm_object\` şu çekirdek yetenekleri sağlar:
- **Fabrika (Factory) Desteği:** Türlerin çalışma anında dinamik üretimi ve değiştirilmesi
- **Çekirdek Veri Operasyonları:** \`copy()\`, \`clone()\`, \`compare()\`, \`print()\`, \`pack()\` ve \`unpack()\` metotları
- **İsimlendirme (Naming):** Her nesneye bir örnek adı (\`get_name()\`, \`set_name()\`) verilmesi`,
      },
      {
        title: "4. `uvm_report_object`: Mesajlaşma ve Raporlama Altyapısı",
        content: `\`uvm_report_object\`, \`uvm_object\` sınıfından genişletilmiştir ve UVM bileşenlerine standart raporlama yeteneklerini kazandıran sınıftır:
\`\`\`systemverilog
\`uvm_info("ID", "Mesaj metni", UVM_LOW)
\`uvm_warning("ID", "Uyarı metni")
\`uvm_error("ID", "Hata metni")
\`uvm_fatal("ID", "Ölümcül hata metni")
\`\`\`
Bu sınıf; mesajların şiddet seviyesine (severity), ID etiketine ve verbosity düzeyine göre filtrelenmesini ve rapor sunucusuna (\`uvm_report_server\`) yönlendirilmesini yönetir.`,
      },
      {
        title: "5. `uvm_component`: Hiyerarşik Ağaç ve Faz Yönetimi",
        content: `\`uvm_component\`, \`uvm_report_object\` sınıfından türetilmiştir. Geliştirdiğiniz tüm sürücüler (\`driver\`), monitörler (\`monitor\`), ajanlar (\`agent\`) ve ortamlar (\`env\`) kalıtım yoluyla hem bir \`uvm_report_object\` hem de bir \`uvm_object\`tir.

\`uvm_component\`'in temel farkları:
- **Hiyerarşik Yapı:** \`parent\` tutamacı sayesinde ebeveyn-çocuk ilişkisi kurar (\`uvm_test_top.env.agent.driver\` gibi).
- **Faz Mekanizması:** Simülasyon yaşam döngüsünü yöneten \`build_phase\`, \`connect_phase\`, \`run_phase\` gibi fazlara katılır.`,
      },
      {
        title: "6. `uvm_transaction` ve Neden `uvm_sequence_item` Tercih Edilir?",
        content: `\`uvm_transaction\`, \`uvm_object\`'ten türemiş ve zaman damgaları ile olay tetikleyicileri eklemiş eski bir sınıftır. Ancak sekansör-sürücü el sıkışma mekanizmasını (\`finish_item\`, sequence ID takibi) desteklemez.

Modern UVM ve IEEE 1800.2 standardında kullanıcı tanımlı işlemler için \`uvm_transaction\` kullanımı **kullanımdan kaldırılmıştır (deprecated)**. Bunun yerine \`uvm_transaction\`'dan türeyen ve sekans protokolünü tam destekleyen \`uvm_sequence_item\` sınıfı kullanılmalıdır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Temel Sınıfları: Kalıtım Hiyerarşisi ve Çekirdek Yapılar** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "base-classes.sv - Örnek UVM Doğrulama Kodu",
          snippet: `virtual class uvm_void;
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Temel Sınıfları: Kalıtım Hiyerarşisi ve Çekirdek Yapılar",
      initialCode: `virtual class uvm_void;
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Temel Sınıfları: Kalıtım Hiyerarşisi ve Çekirdek Yapılar doğrulaması başarıyla tamamlandı.",
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
      question: "UVM sınıf hiyerarşisinde `uvm_component` sınıfının `uvm_object`'ten doğrudan değil de `uvm_report_object` üzerinden türetilmiş olmasının sağladığı temel avantaj nedir?",
      options: ["A) Tüm UVM bileşenlerinin (`driver`, `monitor` vb.) doğal olarak ` `uvm_info `, ` `uvm_error ` gibi raporlama mekanizmalarına ve hiyerarşik mesaj filtreleme altyapısına sahip olması", "B) Donanım yazmaçlarını otomatik olarak sentezleyebilmesi", "C) Bileşenlerin SystemVerilog yerine C++ olarak derlenmesini sağlaması", "D) Testbench belleğini simülasyon sonunda otomatik olarak sıfırlaması"],
      correctIndex: 0,
      explanation: "`uvm_component`, `uvm_report_object` sınıfından türer. Bu sayede her UVM bileşeni harici bir nesneye gerek duymadan doğrudan ` `uvm_info `, ` `uvm_error ` makrolarını çağırabilir ve hiyerarşik rapor sunucusu üzerinden mesaj seviyelerini filtreleyebilir.",
    },
  },
  "uvm-object-pack-unpack": {
    id: "uvm-object-pack-unpack",
    badge: "Modül 3 • Temel Sınıflar ve Nesne Yöntemleri",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Nesne Paketleme: `pack` ve `unpack` Metotları",
    subtitle: "İşlemlerin bit, bayt ve int dizilerine serileştirilmesi (`serialization`), DPI-C entegrasyonu ve `do_pack`/`do_unpack` kancaları.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm_pack_unpack_diagram.svg)`,
      },
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde UVM nesnelerinin ikili (binary) akışlara dönüştürülmesini ve geri çatılmasını inceleyeceksiniz:
- \`pack\`, \`pack_bytes\` ve \`pack_ints\` fonksiyonları arasındaki farklar
- Nesne alanlarının serileştirilmesi (serialization) ve bit akışı oluşturma kuralları
- \`unpack()\` fonksiyonunun dönüş değerinin tam olarak neyi ifade ettiği
- Gerçek dünya projelerinde paketlemenin kullanım alanları (DPI-C, dosya kaydı, fiziksel seri hatlar)
- Simülasyon performansını artırmak için \`do_pack\` ve \`do_unpack\` kancalarının uygulanması`,
      },
      {
        title: "2. `pack` İşlemi ve Serileştirme (Serialization) Mantığı",
        content: `Paketleme (packing), bir nesnenin değişkenlerini ardışık bir bit dizisi (bit stream), bayt dizisi (\`byte[]\`) veya tamsayı dizisi (\`int[]\`) haline getirme işlemidir.

\` \`uvm_field_* \` makroları kullanıldığında UVM bu işlemi otomatik olarak gerçekleştirir:
\`\`\`systemverilog
class Packet extends uvm_object;
  rand bit [3:0] m_addr;
  rand bit [3:0] m_data;
  \`uvm_object_utils_begin(Packet)
    \`uvm_field_int(m_addr, UVM_DEFAULT)
    \`uvm_field_int(m_data, UVM_DEFAULT)
  \`uvm_object_utils_end
  // ...
endclass
\`\`\`
\`uvm_packer\` nesnesi kullanılarak \`pkt.pack(bit_array)\` çağrıldığında, makrolarda belirtilen sıra ile alanlar bit dizisine yazılır.`,
      },
      {
        title: "3. `unpack` İşlemi ve Bayt/Bit Akışından Nesne Yeniden Çatımı",
        content: `Paketten çıkarma (unpacking), ham bir bit veya bayt dizisini alıp hedef nesnenin değişkenlerini bu veriyle doldurma işlemidir:
\`\`\`systemverilog
Packet pkt1 = Packet::type_id::create("pkt1");
Packet pkt2 = Packet::type_id::create("pkt2");
bit bit_array[];

pkt1.randomize();
pkt1.pack(bit_array);       // pkt1 serileştirilir
pkt2.unpack(bit_array);     // bit_array verisi pkt2'ye aktarılır
\`\`\`
\`unpack()\` işlemi sonrasında \`pkt2\`, \`pkt1\` ile aynı değişken değerlerine sahip olur.`,
      },
      {
        title: "4. Kritik Mühendislik Analizi: `unpack()` Dönüş Değeri ve Bit Tüketimi",
        content: `**Soru:** \`unpack()\` fonksiyonunun geri döndürdüğü tamsayı değeri neyi belirtir? Örneğin nesneye 4-bitlik yeni bir alan ekleyip toplam boyutu 17 bite çıkardığımızda ne döner?

**Cevap:** \`unpack()\` dönüş değeri, diziden başarıyla okunup nesne alanlarına yerleştirilen **toplam bit sayısını** temsil eder. Toplam boyut 17 bit olduğunda dönüş değeri 17 (onaltılık tabanda 0x11) olur. Bu değer, veri akışının eksik veya fazla tüketilmediğini doğrulamak için kritik bir kontroldür.`,
      },
      {
        title: "5. Gerçek Hayatta Kullanım Alanları",
        content: `Paketleme ve paketten çıkarma operasyonları şu senaryolarda hayati önem taşır:
- **DPI-C Entegrasyonu:** SystemVerilog nesneleri doğrudan C/C++ referans modellerine geçirilemez. Nesne bayt dizisine serileştirilir ve DPI üzerinden C fonksiyonuna aktarılır.
- **Fiziksel Protokol Sınırları:** PCIe, Ethernet veya USB gibi paketlerin fiziksel hatta bit-bit veya bayt-bayt sürüldüğü protokollerde.
- **Dosya Kaydı ve Yeniden Oynatma (Replay):** Simülasyonda üretilen uyarımı diske ikili (binary) formatta kaydedip daha sonra hata ayıklama için yeniden çalıştırmak.`,
      },
      {
        title: "6. Performans İçin `do_pack` ve `do_unpack` Kancaları",
        content: `Ağır makrolar yerine doğrudan kullanıcı tanımlı kancaların uygulanması simülasyon hızını belirgin şekilde artırır:
\`\`\`systemverilog
virtual function void do_pack(uvm_packer packer);
  super.do_pack(packer);
  packer.pack_field_int(m_addr, 4);
  packer.pack_field_int(m_wdata, 4);
  packer.pack_field_int(m_rdata, 4);
  packer.pack_field_int(m_wr, 1);
endfunction

virtual function void do_unpack(uvm_packer packer);
  super.do_unpack(packer);
  m_addr  = packer.unpack_field_int(4);
  m_wdata = packer.unpack_field_int(4);
  m_rdata = packer.unpack_field_int(4);
  m_wr    = packer.unpack_field_int(1);
endfunction
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Nesne Paketleme: \`pack\` ve \`unpack\` Metotları** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-object-pack-unpack.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class Packet extends uvm_object;
  rand bit [3:0] m_addr;
  rand bit [3:0] m_wdata;
  rand bit [3:0] m_rdata;
  rand bit 		 m_wr;

  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(m_addr, 	UVM_DEFAULT)
  	\`uvm_field_int(m_wdata, UVM_DEFAULT)
  	\`uvm_field_int(m_rdata, UVM_DEFAULT)
  	\`uvm_field_int(m_wr,		UVM_DEFAULT)
  \`uvm_object_utils_end

  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Nesne Paketleme: `pack` ve `unpack` Metotları",
      initialCode: `class Packet extends uvm_object;
  rand bit [3:0] m_addr;
  rand bit [3:0] m_wdata;
  rand bit [3:0] m_rdata;
  rand bit 		 m_wr;

  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(m_addr, 	UVM_DEFAULT)
  	\`uvm_field_int(m_wdata, UVM_DEFAULT)
  	\`uvm_field_int(m_rdata, UVM_DEFAULT)
  	\`uvm_field_int(m_wr,		UVM_DEFAULT)
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
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Nesne Paketleme: \`pack\` ve \`unpack\` Metotları doğrulaması başarıyla tamamlandı.",
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
      question: "UVM'de bir nesne üzerinde `unpack()` metodu çağrıldığında dönen tamsayı (int) değeri neyi gösterir?",
      options: ["A) Giriş dizisinden okunup nesne değişkenlerine başarıyla aktarılan toplam bit sayısını", "B) Nesnenin bellekteki adres göstericisini", "C) Karşılaşılan hata kodunu (0 ise başarı)", "D) Nesne içerisindeki toplam değişken adedini"],
      correctIndex: 0,
      explanation: "`unpack()` metodu akıştan tam olarak kaç bit tüketildiğini (`total consumed bits`) döndürür. Bu sayı, serileştirilmiş verinin nesnenin beklediği bit genişliğiyle tam uyuştuğunu denetlemek için kullanılır.",
    },
  },
  "uvm-object-compare": {
    id: "uvm-object-compare",
    badge: "Modül 3 • Temel Sınıflar ve Nesne Yöntemleri",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Nesne Karşılaştırma: `compare` Metodu ve `do_compare` Kancası",
    subtitle: "Otomasyon makroları ile derin karşılaştırma, `do_compare` geri çağrımı ve simülatör performans optimizasyonları.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde iki UVM nesnesinin içerik bütünlüğünü karşılaştırma yöntemlerini öğreneceksiniz:
- UVM alan otomasyon makroları ile \`compare()\` fonksiyonunun kullanımı
- Otomasyon makrolarının neden simülasyon hızını düşürdüğü ve \`do_compare\` kancasının önemi
- \`do_compare\` metodunda \`$cast\` ve \`super.do_compare\` kullanımı
- Seçici ve maskeli karşılaştırma teknikleri (belirli alanları karşılaştırmadan muaf tutma)`,
      },
      {
        title: "2. Otomasyon Makroları ile Karşılaştırma (`compare`)",
        content: `\` \`uvm_field_* \` makroları kullanıldığında UVM her kayıtlı alan için otomatik bir karşılaştırma altyapısı kurar:
\`\`\`systemverilog
Packet pkt1 = Packet::type_id::create("pkt1");
Packet pkt2 = Packet::type_id::create("pkt2");
// ...
if (pkt1.compare(pkt2))
  \`uvm_info("CMP", "Paketler birebir eşleşti", UVM_LOW)
else
  \`uvm_error("CMP", "Paket içerikleri farklı!")
\`\`\`
\`compare()\` metodu \`uvm_comparer\` nesnesi ile çalışarak bir eşleşmezlik durumunda uyuşmayan alanın adını ve değerlerini simülasyon loguna yazdırabilir.`,
      },
      {
        title: "3. Neden `do_compare` Tercih Edilmelidir? Simülasyon Performansı",
        content: `Alan otomasyon makroları (\` \`uvm_field_* \`), her karşılaştırma çağrısında karmaşık tip tablolarını dolaşır ve yüzlerce satırlık genel kütüphane kodunu çalıştırır. Milyonlarca paketin aktığı gerçekçi bir testbench ortamında bu durum simülasyonu ciddi şekilde yavaşlatır.

Endüstri standardı en iyi uygulama (best practice), alan makrolarını terk edip doğrudan \`do_compare\` metodunu sınıf içinde elle yazmaktır.`,
      },
      {
        title: "4. `do_compare` Gerçeklemesi, `$cast` ve `super.do_compare` Kullanımı",
        content: `\`do_compare\` metodu jenerik bir \`uvm_object rhs\` tutamacı alır:
\`\`\`systemverilog
virtual function bit do_compare(uvm_object rhs, uvm_comparer comparer);
  Packet _pkt;

  // 1. Üst sınıf alanlarını karşılaştır
  if (!super.do_compare(rhs, comparer))
    return 0;

  // 2. Gelen genel nesneyi kendi sınıf tipimize dönüştür
  if (!$cast(_pkt, rhs))
    return 0;

  // 3. İlgili alanları doğrudan karşılaştır
  return (this.m_addr == _pkt.m_addr) &&
         (this.m_data == _pkt.m_data);
endfunction
\`\`\`
Bu yöntem doğrudan SystemVerilog mantıksal eşitlik operatörlerini (\`==\`) kullandığı için sıfır genel giderle en yüksek simülasyon hızını sunar.`,
      },
      {
        title: "5. Maskeli ve Seçici Karşılaştırma Stratejileri",
        content: `Bazı durumlarda bir paketin tüm alanlarının eşleşmesi beklenmez. Örneğin; zaman damgası (timestamp), paket sıra numarası veya paket gecikmesi (latency) gibi alanlar Scoreboard karşılaştırmasında göz ardı edilmelidir. \`do_compare\` metodu sayesinde bu filtrelemeyi tek bir satırda yapabilirsiniz; alan makrolarında ise karmaşık bayrak kombinasyonları (\`UVM_NOCOMPARE\`) gerekirdi.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Nesne Karşılaştırma: \`compare\` Metodu ve \`do_compare\` Kancası** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-object-compare.sv - Örnek UVM Doğrulama Kodu",
          snippet: `typedef enum {FALSE, TRUE} e_bool;

class Packet extends uvm_object;
  rand bit[15:0] 	m_addr;
  
  virtual function string convert2string();
    string contents;
    contents = $sformatf("m_addr=0x%0h", m_addr);
  endfunction

  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(m_addr, UVM_DEFAULT)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass

class Object extends uvm_object;
  rand e_bool 				m_bool;
  rand bit[3:0] 			m_mode;
  string 					m_name;
  rand Packet 				m_pkt;
  
  function new(string name = "Object");
    super.new(name);
    m_name = name;
    m_pkt = Packet::type_id::create("m_pkt");
    m_pkt.randomize();
  endfunction
  
  \`uvm_object_utils_begin(Object)
  	\`uvm_field_enum(e_bool, m_bool, UVM_DEFAULT)
  	\`uvm_field_int (m_mode, 		UVM_DEFAULT)
  	\`uvm_field_string(m_name, 		UVM_DEFAULT)
  	\`uvm_field_object(m_pkt, 		UVM_DEFAULT)
  \`uvm_object_utils_end
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Nesne Karşılaştırma: `compare` Metodu ve `do_compare` Kancası",
      initialCode: `typedef enum {FALSE, TRUE} e_bool;

class Packet extends uvm_object;
  rand bit[15:0] 	m_addr;
  
  virtual function string convert2string();
    string contents;
    contents = $sformatf("m_addr=0x%0h", m_addr);
  endfunction

  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(m_addr, UVM_DEFAULT)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass

class Object extends uvm_object;
  rand e_bool 				m_bool;
  rand bit[3:0] 			m_mode;
  string 					m_name;
  rand Packet 				m_pkt;
  
  function new(string name = "Object");
    super.new(name);
    m_name = name;
    m_pkt = Packet::type_id::create("m_pkt");
    m_pkt.randomize();
  endfunction
  
  \`uvm_object_utils_begin(Object)
  	\`uvm_field_enum(e_bool, m_bool, UVM_DEFAULT)
  	\`uvm_field_int (m_mode, 		UVM_DEFAULT)
  	\`uvm_field_string(m_name, 		UVM_DEFAULT)
  	\`uvm_field_object(m_pkt, 		UVM_DEFAULT)
  \`uvm_object_utils_end
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Nesne Karşılaştırma: \`compare\` Metodu ve \`do_compare\` Kancası doğrulaması başarıyla tamamlandı.",
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
      question: "Modern UVM projelerinde alan makroları yerine `do_compare` kancasının elle yazılmasının en temel mühendislik sebebi nedir?",
      options: ["A) Alan makrolarının arka planda aşırı genel kod çalıştırarak simülasyonu ciddi şekilde yavaşlatması; `do_compare`'in ise doğrudan değişken karşılaştırması yaparak maksimum simülasyon hızı sağlaması", "B) Alan makrolarının 16-bit'ten büyük verileri karşılaştıramaması", "C) `do_compare` metodunun SystemVerilog modüllerinde zorunlu olması", "D) `compare()` fonksiyonunun IEEE 1800.2 standardında yasaklanmış olması"],
      correctIndex: 0,
      explanation: "UVM alan otomasyon makroları (` `uvm_field_* `), dinamik tip analizi ve geniş kapsamlı döngüler nedeniyle simülasyon çalışma süresini (runtime) dramatik şekilde uzatır. Milyonlarca paketin aktığı ortamlarda `do_compare` metodu doğrudan `==` operatörü ile çalıştığından en yüksek performansı sunar.",
    },
  },
  "uvm-object-print": {
    id: "uvm-object-print",
    badge: "Modül 3 • Temel Sınıflar ve Nesne Yöntemleri",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Nesne Yazdırma: `print`, `sprint`, `do_print` ve `convert2string`",
    subtitle: "Nesne içeriklerinin tablo/ağaç formatında yazdırılması, `sprint`, `do_print` kancası ve yüksek performanslı `convert2string` yaklaşımı.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde UVM nesnelerinin hata ayıklama (debug) amacıyla yazdırılmasında kullanılan 4 temel yöntemi öğreneceksiniz:
- \`print()\` metodu ve varsayılan UVM tablo formatı
- Simülasyon hızını korumak için \`do_print()\` kancası ve \`uvm_printer\` kullanımı
- Konsola basmak yerine metin elde eden \`sprint()\` fonksiyonu
- En yüksek performansı sağlayan endüstri standardı \`convert2string()\` yaklaşımı
- Büyük projelerde log boyutunu ve simülasyon süresini optimize etme kuralları`,
      },
      {
        title: "2. Otomasyon Makroları ile `print()` Kullanımı ve Tablo Formatı",
        content: `Nesne alanları \` \`uvm_field_* \` ile kaydedildiğinde \`obj.print()\` doğrudan zengin bir tablo çıktısı üretir:
\`\`\`text
-----------------------------------------
Name          Type       Size  Value     
-----------------------------------------
obj           Object     -     @1829     
  m_addr      integral   16    'h1234    
  m_data      integral   8     'h5a      
-----------------------------------------
\`\`\`
Bu format küçük örnekler için çok okunaklı olsa da büyük testbench'lerde devasa log dosyalarına yol açar.`,
      },
      {
        title: "3. Performans Odaklı `do_print()` Kancası ve `uvm_printer`",
        content: `Makroların ağır yükünden kaçınmak için \`do_print()\` metodu uygulanabilir:
\`\`\`systemverilog
virtual function void do_print(uvm_printer printer);
  super.do_print(printer);
  printer.print_field_int("m_addr", m_addr, 16, UVM_HEX);
  printer.print_field_int("m_data", m_data, 8,  UVM_HEX);
endfunction
\`\`\`
Bu yöntem tablo formatını korurken alan makrolarının genel yükünü ortadan kaldırır.`,
      },
      {
        title: "4. `sprint()` Fonksiyonu ile Biçimlendirilmiş Dizgi Elde Etme",
        content: `\`sprint()\`, \`print()\` ile tamamen aynı formatlamayı yapar; ancak sonucu doğrudan konsola basmak yerine bir \`string\` olarak döndürür:
\`\`\`systemverilog
string str = obj.sprint();
\`uvm_info("TEST", $sformatf("Oluşturulan nesne:
%s", str), UVM_MEDIUM)
\`\`\`
Bu sayede mesaj UVM raporlama filtrelerine (\`verbosity\`) dahil edilir.`,
      },
      {
        title: "5. En İyi Uygulama (Best Practice): `convert2string()` ile Yüksek Başarım",
        content: `Modern doğrulama mühendisliğinde en çok tercih edilen yöntem \`convert2string()\` fonksiyonudur. Bu fonksiyon UVM printer mekanizmasının tablo oluşturma yükünü tamamen baypas eder ve \`$sformatf\` kullanarak tek satırlık öz ve hızlı bir metin döndürür:
\`\`\`systemverilog
virtual function string convert2string();
  return $sformatf("addr=0x%0h data=0x%0h mode=%s", m_addr, m_data, m_mode.name());
endfunction
\`\`\`
Kullanımı:
\`\`\`systemverilog
\`uvm_info("DRV", $sformatf("Sürülen işlem: %s", tr.convert2string()), UVM_HIGH)
\`\`\``,
      },
      {
        title: "6. Yazdırma Metotlarının Karşılaştırmalı Analizi ve Endüstri Standartları",
        content: `- **\`print()\`:** Hızlı prototipleme ve tek seferlik küçük hata ayıklamalar için uygundur.
- **\`do_print()\`:** Tablo formatı istenen ancak makro yükü istenmeyen durumlarda kullanılır.
- **\`convert2string()\`:** **Endüstri standardıdır.** Log dosyasını şişirmez, simülasyonu yavaşlatmaz ve \` \`uvm_info \` filtreleme seviyeleriyle mükemmel uyum sağlar.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Nesne Yazdırma: \`print\`, \`sprint\`, \`do_print\` ve \`convert2string\`** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-object-print.sv - Örnek UVM Doğrulama Kodu",
          snippet: `typedef enum {FALSE, TRUE} e_bool;
class Object extends uvm_object;
  
	rand e_bool 				m_bool;
  rand bit[3:0] 			m_mode;
  rand byte 					m_data[4];
  rand shortint 			m_queue[$];
  string							m_name;
  
  constraint c_queue { m_queue.size() == 3; }
  
  function new(string name = "Object");
    super.new(name);
    m_name = name;
  endfunction
  
  // Each variable has to be registered with a macro corresponding to its data
  // type. For example, "int" types use \`uvm_field int, "enum" types use 
  // \`uvm_field_enum, and "string" use \`uvm_field_string
  \`uvm_object_utils_begin(Object)
  	\`uvm_field_enum(e_bool, m_bool,	UVM_DEFAULT)
  	\`uvm_field_int (m_mode,					UVM_DEFAULT)
  	\`uvm_field_sarray_int(m_data,		UVM_DEFAULT)
  	\`uvm_field_queue_int(m_queue,		UVM_DEFAULT)
  	\`uvm_field_string(m_name,				UVM_DEFAULT)
  \`uvm_object_utils_end
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Nesne Yazdırma: `print`, `sprint`, `do_print` ve `convert2string`",
      initialCode: `typedef enum {FALSE, TRUE} e_bool;
class Object extends uvm_object;
  
	rand e_bool 				m_bool;
  rand bit[3:0] 			m_mode;
  rand byte 					m_data[4];
  rand shortint 			m_queue[$];
  string							m_name;
  
  constraint c_queue { m_queue.size() == 3; }
  
  function new(string name = "Object");
    super.new(name);
    m_name = name;
  endfunction
  
  // Each variable has to be registered with a macro corresponding to its data
  // type. For example, "int" types use \`uvm_field int, "enum" types use 
  // \`uvm_field_enum, and "string" use \`uvm_field_string
  \`uvm_object_utils_begin(Object)
  	\`uvm_field_enum(e_bool, m_bool,	UVM_DEFAULT)
  	\`uvm_field_int (m_mode,					UVM_DEFAULT)
  	\`uvm_field_sarray_int(m_data,		UVM_DEFAULT)
  	\`uvm_field_queue_int(m_queue,		UVM_DEFAULT)
  	\`uvm_field_string(m_name,				UVM_DEFAULT)
  \`uvm_object_utils_end
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Nesne Yazdırma: \`print\`, \`sprint\`, \`do_print\` ve \`convert2string\` doğrulaması başarıyla tamamlandı.",
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
      question: "Büyük ölçekli bir SoC doğrulama ortamında nesne içeriklerini ` `uvm_info ` ile kaydederken neden `print()` yerine `convert2string()` tercih edilmelidir?",
      options: ["A) `convert2string()`, UVM printer mekanizmasının tablo oluşturma ve bellek tarama yükünü baypas ederek doğrudan `$sformatf` ile hızlı string üretir ve simülasyon hızını korur", "B) `print()` metodu SystemVerilog sınıflarında çalışmaz", "C) `convert2string()` çağrısı simülatörün lisans kullanımını azaltır", "D) `sprint()` metodu sadece 1-bitlik verileri yazdırabilir"],
      correctIndex: 0,
      explanation: "`print()` karmaşık bir tablo ve nesne dolaşma yapısı çalıştırır. Milyonlarca işlemin döndüğü bir simülasyonda bu işlem simülasyonu ciddi ölçüde yavaşlatır ve gigabaytlarca log üretir. `convert2string()` ise doğrudan hafif bir dize biçimlendirmesi yaparak azami hız sağlar.",
    },
  },
  "uvm-object-copy-clone": {
    id: "uvm-object-copy-clone",
    badge: "Modül 3 • Temel Sınıflar ve Nesne Yöntemleri",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Nesne Kopyalama: `copy`, `clone` ve `do_copy` Mimarisi",
    subtitle: "Yüzeysel (shallow) ve derin (deep) kopyalama ayrımı, `do_copy` geri çağrımı ve `clone()` ile dinamik nesne üretimi.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde UVM nesnelerinin çoğaltılması ve veri güvenliğinin sağlanması mekanizmalarını inceleyeceksiniz:
- \`copy()\` metodunun alan otomasyon makroları ile kullanımı
- Performans ve derin kontrol için \`do_copy()\` kancasının gerçeklenmesi
- \`copy()\` ile \`clone()\` metotları arasındaki temel yapısal ve kullanım farkları
- \`$cast\` ile güvenli tip dönüşümü
- Yüzeysel (shallow copy) ve Derin (deep copy) kopyalama tehlikeleri: Bellek referans çakışmalarının önlenmesi`,
      },
      {
        title: "2. Otomasyon Makroları ile `copy()` Kullanımı",
        content: `\` \`uvm_field_* \` makroları kullanıldığında hedef nesneye kaynak nesnenin verileri \`copy()\` metoduyla kopyalanabilir:
\`\`\`systemverilog
Packet p1 = Packet::type_id::create("p1");
Packet p2 = Packet::type_id::create("p2");
p1.randomize();
p2.copy(p1); // p1 içeriği p2'ye aktarılır
\`\`\`
*Kritik Kural:* \`p2.copy(p1)\` çağrılmadan önce \`p2\` nesnesinin bellekte mutlaka yaratılmış (\`create\`) olması şarttır; aksi halde null-pointer hatası oluşur.`,
      },
      {
        title: "3. Performans ve Derin Kontrol İçin `do_copy` Kancasının Gerçeklenmesi",
        content: `Makroları devre dışı bırakıp yüksek performanslı \`do_copy\` kancası yazmak en güvenli yoldur:
\`\`\`systemverilog
virtual function void do_copy(uvm_object rhs);
  Object _obj;
  super.do_copy(rhs);          // 1. Üst sınıf kopyalaması
  if (!$cast(_obj, rhs)) begin // 2. Güvenli tür dönüşümü
    \`uvm_error("CAST_ERR", "do_copy: Tip dönüşümü başarısız!")
    return;
  end
  // 3. Alanların kopyalanması
  this.m_addr = _obj.m_addr;
  this.m_data = _obj.m_data;
  // Alt nesne varsa derin kopyalama yapılır
  if (_obj.m_pkt != null) begin
    if (this.m_pkt == null) this.m_pkt = Packet::type_id::create("m_pkt");
    this.m_pkt.copy(_obj.m_pkt);
  end
endfunction
\`\`\``,
      },
      {
        title: "4. `clone()` Metodu ile Nesne Üretimi ve Kopyalamanın Birleştirilmesi",
        content: `\`clone()\` metodu, hedef nesneyi önceden \`create()\` etme ihtiyacını ortadan kaldırır. Tek adımda yeni bir nesne üretir, içeriğini kopyalar ve genel \`uvm_object\` tutamacı olarak geri döndürür:
\`\`\`systemverilog
Object obj1 = Object::type_id::create("obj1");
Object obj2;
obj1.randomize();

// clone() doğrudan yeni nesne üretip içeriğini doldurur
$cast(obj2, obj1.clone());
\`\`\`
\`clone()\` dahili olarak fabrikayı (\`create\`) ve ardından \`copy()\` metodunu çalıştırır.`,
      },
      {
        title: "5. Yüzeysel (Shallow) ve Derin (Deep) Kopyalama Tehlikeleri: Yan Etki Analizi",
        content: `**Kritik Mühendislik Uyarısı:** Eğer bir sınıfın içinde başka bir nesne tutamacı (örneğin \`Packet m_pkt\`) varsa ve kopyalama sırasında sadece \`this.m_pkt = _obj.m_pkt;\` yazarsanız, nesnenin kendisini değil sadece adresini (işaretçisini) kopyalamış olursunuz (Shallow Copy).

Bu durumda \`obj1\` veya \`obj2\`'den biri \`m_pkt\` içeriğini değiştirdiğinde diğeri de farkında olmadan değişir ve testbench'te tespit edilmesi son derece güç sahte hatalara (side-effects) yol açar. Doğru yöntem, alt nesneler için de her zaman \`this.m_pkt.copy(_obj.m_pkt)\` şeklinde derin kopyalama (Deep Copy) yapmaktır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Nesne Kopyalama: \`copy\`, \`clone\` ve \`do_copy\` Mimarisi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-object-copy-clone.sv - Örnek UVM Doğrulama Kodu",
          snippet: `typedef enum {FALSE, TRUE} e_bool;

class Packet extends uvm_object;
  rand bit[15:0] 	m_addr;
  
  // Automation macros
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(m_addr, UVM_DEFAULT)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass

class Object extends uvm_object;
  rand e_bool 				m_bool;
  rand bit[3:0] 			m_mode;
  rand byte 				m_data[4];
  rand shortint 			m_queue[$];
  string 					m_name;
  rand Packet 				m_pkt;
  
  constraint c_queue { m_queue.size() == 3; }
  
  function new(string name = "Object");
    super.new(name);
    m_name = name;
    m_pkt = Packet::type_id::create("m_pkt");
    m_pkt.randomize();
  endfunction
  
  \`uvm_object_utils_begin(Object)
  	\`uvm_field_enum(e_bool, m_bool, UVM_DEFAULT)
  	\`uvm_field_int (m_mode, 		UVM_DEFAULT)
  	\`uvm_field_sarray_int(m_data, 	UVM_DEFAULT)
  	\`uvm_field_queue_int(m_queue, 	UVM_DEFAULT)
  	\`uvm_field_string(m_name, 		UVM_DEFAULT)
  	\`uvm_field_object(m_pkt, 		UVM_DEFAULT)
  \`uvm_object_utils_end
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Nesne Kopyalama: `copy`, `clone` ve `do_copy` Mimarisi",
      initialCode: `typedef enum {FALSE, TRUE} e_bool;

class Packet extends uvm_object;
  rand bit[15:0] 	m_addr;
  
  // Automation macros
  \`uvm_object_utils_begin(Packet)
  	\`uvm_field_int(m_addr, UVM_DEFAULT)
  \`uvm_object_utils_end
  
  function new(string name = "Packet");
    super.new(name);
  endfunction
endclass

class Object extends uvm_object;
  rand e_bool 				m_bool;
  rand bit[3:0] 			m_mode;
  rand byte 				m_data[4];
  rand shortint 			m_queue[$];
  string 					m_name;
  rand Packet 				m_pkt;
  
  constraint c_queue { m_queue.size() == 3; }
  
  function new(string name = "Object");
    super.new(name);
    m_name = name;
    m_pkt = Packet::type_id::create("m_pkt");
    m_pkt.randomize();
  endfunction
  
  \`uvm_object_utils_begin(Object)
  	\`uvm_field_enum(e_bool, m_bool, UVM_DEFAULT)
  	\`uvm_field_int (m_mode, 		UVM_DEFAULT)
  	\`uvm_field_sarray_int(m_data, 	UVM_DEFAULT)
  	\`uvm_field_queue_int(m_queue, 	UVM_DEFAULT)
  	\`uvm_field_string(m_name, 		UVM_DEFAULT)
  	\`uvm_field_object(m_pkt, 		UVM_DEFAULT)
  \`uvm_object_utils_end
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Nesne Kopyalama: \`copy\`, \`clone\` ve \`do_copy\` Mimarisi doğrulaması başarıyla tamamlandı.",
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
      question: "UVM'de `obj2.copy(obj1)` ile `$cast(obj2, obj1.clone())` arasındaki temel kullanım farkı nedir?",
      options: ["A) `copy()` çağrısında `obj2` nesnesinin önceden bellekte yaratılmış olması gerekir; `clone()` ise bellekte yeni bir nesne tahsis edip kopyayı onun içine doldurarak döndürür", "B) `clone()` yalnızca modüllerde kullanılır, sınıflarda çalışmaz", "C) `copy()` derin kopyalama yaparken, `clone()` verileri sıfırlar", "D) `clone()` fonksiyonu SystemVerilog'da derleme hatası verir"],
      correctIndex: 0,
      explanation: "`copy()` metodu çağrılmadan önce hedef nesne bellekte var olmalıdır, aksi halde çalışma zamanında kilitlenme (null pointer) yaşanır. `clone()` metodu ise arka planda önce fabrikayı kullanarak hedef nesneyi otomatik olarak üretir, ardından `copy()` işlemini uygulayarak döndürür.",
    },
  },
  "uvm-utility-field-macros": {
    id: "uvm-utility-field-macros",
    badge: "Modül 4 • Yardımcı Makrolar ve Alan Makroları",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Yardımcı ve Alan Makroları: Fabrika Kaydı ve Makro Açılımı",
    subtitle: "` `uvm_object_utils `, ` `uvm_component_utils `, makro genişlemesinin perde arkası ve `type_id::create` mimarisi.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde UVM'in en yaygın kullanılan makrolarının perde arkasını inceleyeceksiniz:
- Yardımcı makroların (\`utils\`) UVM Fabrikası (Factory) için hayati önemi
- \` \`uvm_object_utils \` ile \` \`uvm_component_utils \` arasındaki yapısal farklar ve yapıcı (\`new\`) fonksiyon kuralları
- Makro açılımı (macro expansion): Arka planda üretilen registry, proxy ve fonksiyonlar
- Neden her zaman \`type_id::create()\` kullanmalıyız?
- Alan makroları (\` \`uvm_field_* \`) ile gelen kolaylık ve simülasyon performansı ikilemi`,
      },
      {
        title: "2. Nesne Yardımcı Makrosu (` `uvm_object_utils `) ve Yapıcı Fonksiyon",
        content: `\`uvm_object\` veya \`uvm_sequence_item\` türevi sınıflar fabrikaya \` \`uvm_object_utils \` ile kaydedilir. Bu sınıfların yapıcı fonksiyonu (\`new\`) tek parametre (örnek adı) alır:
\`\`\`systemverilog
class MyItem extends uvm_sequence_item;
  \`uvm_object_utils(MyItem)

  function new(string name = "MyItem");
    super.new(name);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "3. Bileşen Yardımcı Makrosu (` `uvm_component_utils `) ve Ebeveyn Hiyerarşisi",
        content: `\`uvm_component\` türevi sınıflar (\`driver\`, \`monitor\`, \`env\` vb.) fabrikaya \` \`uvm_component_utils \` ile kaydedilir. Bileşenlerin yapıcı fonksiyonu iki parametre almak zorundadır: bileşen adı (\`name\`) ve hiyerarşik ebeveyn tutamacı (\`parent\`):
\`\`\`systemverilog
class MyDriver extends uvm_driver #(MyItem);
  \`uvm_component_utils(MyDriver)

  function new(string name = "MyDriver", uvm_component parent = null);
    super.new(name, parent);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "4. Makro Açılımı: Perde Arkasında Neler Oluyor? (Registry ve Proxy)",
        content: `\` \`uvm_object_utils(T) \` makrosu arka planda şu kritik adımları üretir:
1. **\`type_id\` Tanımı:** \`typedef uvm_object_registry#(T, "T") type_id;\` ile fabrikanın tür kayıt anahtarı oluşturulur.
2. **\`get_type()\` Metodu:** Fabrika proxy nesnesini döndüren statik bir metot ekler.
3. **\`create()\` Metodu:** Fabrika üzerinden nesne oluşturan altyapıyı kurar.
4. **\`get_type_name()\` Metodu:** Sınıfın adını metin (\`string\`) olarak döndürür.

Bu sayede UVM çekirdeği, sınıfın türünü çalışma zamanında dinamik olarak tanıyabilir ve yönetebilir.`,
      },
      {
        title: "5. Fabrika Tabanlı Üretim: Neden `type_id::create()` Kullanmalıyız?",
        content: `Doğrudan \`new()\` çağrısı yapmak SystemVerilog derleyicisini o spesifik sınıfa kilitler. Oysa \`type_id::create()\` kullanıldığında nesne üretimi UVM Fabrikası üzerinden yönlendirilir:
\`\`\`systemverilog
MyDriver drv = MyDriver::type_id::create("drv", this);
\`\`\`
Bu sayede üst düzey test sınıfında kaynak koduna dokunmadan:
\`\`\`systemverilog
set_type_override_by_type(MyDriver::get_type(), ErrorInjectingDriver::get_type());
\`\`\`
çağrısı yaparak sürücüyü hata enjekte eden genişletilmiş bir sürücüyle çalışma anında değiştirebilirsiniz (Factory Override).`,
      },
      {
        title: "6. Alan Makroları (` `uvm_field_* `): Kolaylık ile Performans Dengesi",
        content: `\`*_begin\` ve \`*_end\` arasına yazılan \` \`uvm_field_* \` makroları \`copy\`, \`compare\`, \`print\`, \`pack\` metotlarını otomatik olarak gerçekler. Geliştirme hızını artırsa da arka planda devasa bir kod şişkinliği ve simülasyon yavaşlığı oluşturur. Bu nedenle endüstri standardı doğrulama ortamlarında alan makroları yerine özel \`do_*\` kancaları tercih edilir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Yardımcı ve Alan Makroları: Fabrika Kaydı ve Makro Açılımı** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-utility-field-macros.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class ABC extends uvm_object;

	// Register this user defined class with the factory
	\`uvm_object_utils(ABC)
	
	function new(string name = "ABC");
		super.new(name);
	endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Yardımcı ve Alan Makroları: Fabrika Kaydı ve Makro Açılımı",
      initialCode: `class ABC extends uvm_object;

	// Register this user defined class with the factory
	\`uvm_object_utils(ABC)
	
	function new(string name = "ABC");
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
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Yardımcı ve Alan Makroları: Fabrika Kaydı ve Makro Açılımı doğrulaması başarıyla tamamlandı.",
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
      question: "` `uvm_component_utils ` makrosu ile kaydedilen bir sınıfın yapıcı fonksiyonunun (`new`), bir `uvm_object` yapıcısından farklı olarak zorunlu kıldığı ikinci parametre nedir?",
      options: ["A) Bileşenin testbench hiyerarşik ağacındaki yerini belirleyen `uvm_component parent` tutamacı", "B) Simülasyonun toplam çalışma zamanını belirten zaman damgası", "C) Simülatör lisans anahtarı numarası", "D) Donanımın saat frekansını belirten mantıksal değer"],
      correctIndex: 0,
      explanation: "UVM bileşenleri hiyerarşik bir ağaç yapısında yaşarlar (`uvm_top -> test -> env -> agent`). Bu hiyerarşiyi inşa edebilmek için her `uvm_component` yapıcısında (`new`), bileşenin adıyla birlikte kendisini kapsayan üst bileşenin tutamacı (`uvm_component parent`) zorunludur.",
    },
  },
  "uvm-field-macros": {
    id: "uvm-field-macros",
    badge: "Modül 4 • Yardımcı Makrolar ve Alan Makroları",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "UVM Alan Makroları: Bayrak Tipleri ve Yazdırma Seçenekleri",
    subtitle: "`UVM_ALL_ON`, `UVM_DEFAULT`, `UVM_NOCOPY` gibi bayrak kombinasyonları, yazdırma formatları ve pratik kullanım senaryoları.",
    sections: [
      {
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu bölümde UVM alan otomasyon makrolarında kullanılan bayrakları (\`FLAG\`) ve formatlama seçeneklerini inceleyeceksiniz:
- \`FLAG\` parametresinin çalışma mantığı ve bit düzeyinde VEYA (\`|\`) operatörü ile birleştirilmesi
- \`UVM_ALL_ON\` ve \`UVM_DEFAULT\` arasındaki farklar
- \`UVM_NOCOPY\`, \`UVM_NOCOMPARE\`, \`UVM_NOPRINT\` ve \`UVM_NOPACK\` ile operasyon kısıtlama
- Yazdırma formatı bayrakları (\`UVM_HEX\`, \`UVM_DEC\`, \`UVM_BIN\`, \`UVM_STRING\`)
- Enum, kuyruk (queue), dizi ve alt nesne içeren kapsamlı bir uygulama örneği`,
      },
      {
        title: "2. Alan Makrosu Bayrak Tipleri (`FLAG`) ve Bit Düzeyinde Maskeleme",
        content: `Alan makrolarında ikinci veya üçüncü parametre olarak verilen \`FLAG\`, o değişken üzerinde hangi UVM metotlarının etkin olacağını belirler:
- \`UVM_ALL_ON\`: Tüm temel operasyonları (copy, compare, print, pack/unpack) açar.
- \`UVM_DEFAULT\`: Önerilen standart bayraktır; temel işlemleri etkinleştirir.
- \`UVM_NOCOPY\`: Bu alanı kopyalama (\`copy\`) işleminden muaf tutar.
- \`UVM_NOCOMPARE\`: Bu alanı karşılaştırma (\`compare\`) işleminden muaf tutar.
- \`UVM_NOPRINT\`: Bu alanı yazdırma (\`print\`) işleminden muaf tutar.
- \`UVM_NOPACK\`: Bu alanı paketleme (\`pack/unpack\`) işleminden muaf tutar.
- \`UVM_REFERENCE\`: Nesneler için derin kopyalama yerine yalnızca tutamaç referansını kopyalar.

*Kombinasyon:* Birden fazla bayrak \`|\` operatörü ile birleştirilebilir: \`UVM_DEFAULT | UVM_NOCOMPARE\`.`,
      },
      {
        title: "3. Biçimlendirme ve Yazdırma Bayrakları",
        content: `Yazdırma formatını özelleştirmek için şu bayraklar eklenebilir:
- \`UVM_HEX\`: Onaltılık (Hexadecimal) formatta yazdırır
- \`UVM_DEC\`: İşaretli onluk (Decimal) formatta yazdırır
- \`UVM_UNSIGNED\`: İşaretsiz onluk formatta yazdırır
- \`UVM_BIN\`: İkilik (Binary) formatta yazdırır
- \`UVM_OCT\`: Sekizlik (Octal) formatta yazdırır
- \`UVM_STRING\`: Karakter dizisi formatında yazdırır
- \`UVM_TIME\`: Simülasyon zamanı formatında yazdırır`,
      },
      {
        title: "4. Kapsamlı Uygulama Örneği: Enum, Dizi, Kuyruk ve Alt Nesne",
        content: `Farklı veri tiplerinin UVM alan makroları ile tanımlanması:
\`\`\`systemverilog
typedef enum {FALSE, TRUE} e_bool;

class Child extends uvm_object;
  string    m_name;
  logic[3:0] m_age;
  \`uvm_object_utils_begin(Child)
    \`uvm_field_string(m_name, UVM_ALL_ON)
    \`uvm_field_int(m_age,    UVM_ALL_ON)
  \`uvm_object_utils_end
  function new(string name="Child"); super.new(name); endfunction
endclass

class Parent extends uvm_object;
  string    m_name;
  bit[15:0] m_age;
  int       m_numbers[$];
  e_bool    m_employed;
  Child     m_child;

  \`uvm_object_utils_begin(Parent)
    \`uvm_field_enum(e_bool, m_employed, UVM_ALL_ON)
    \`uvm_field_int(m_age,               UVM_ALL_ON | UVM_DEC)
    \`uvm_field_queue_int(m_numbers,     UVM_ALL_ON)
    \`uvm_field_string(m_name,           UVM_ALL_ON)
    \`uvm_field_object(m_child,          UVM_ALL_ON)
  \`uvm_object_utils_end
  function new(string name="Parent"); super.new(name); endfunction
endclass
\`\`\``,
      },
      {
        title: "5. Simülasyon Çıktısının İncelenmesi ve Tablo Yapısı",
        content: `\`parent_obj.print()\` çağrıldığında UVM konsola şu hiyerarşik tabloyu basar:
\`\`\`text
-----------------------------------------
Name          Type         Size  Value   
-----------------------------------------
Parent        Parent       -     @1829   
  m_employed  e_bool       32    TRUE    
  m_age       integral     16    'd29    
  m_numbers   da(integral) 3     -       
    [0]       integral     32    'h1234  
    [1]       integral     32    'h5678  
    [2]       integral     32    'h9011  
  m_name      string       4     Joey    
  m_child     Child        -     @1830   
    m_name    string       7     Joey Jr 
    m_age     integral     4     'h1     
-----------------------------------------
\`\`\`
Tabloda kuyruk elemanlarının indisleriyle açıldığı ve \`m_child\` alt nesnesinin kendi alanlarıyla hiyerarşik olarak listelendiği açıkça görülür.`,
      },
      {
        title: "6. Kritik Mühendislik Değerlendirmesi: Alan Makrolarının Doğru Kullanım Sınırları",
        content: `Alan makroları yukarıdaki gibi karmaşık tiplerin hızlıca yazdırılması ve prototiplenmesi için son derece pratiktir. Ancak her eklenen alan makrosunun derleme süresini ve simülasyon çalışma zamanı (runtime) yükünü katlayarak artırdığı unutulmamalıdır. Üretim seviyesindeki ASIC/SoC doğrulama projelerinde bu makrolar yerine \`do_print\`, \`do_copy\`, \`do_compare\` ve \`convert2string\` metotlarının elle yazılması IEEE 1800.2 standartları tarafından şiddetle tavsiye edilir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Alan Makroları: Bayrak Tipleri ve Yazdırma Seçenekleri** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-field-macros.sv - Örnek UVM Doğrulama Kodu",
          snippet: `typedef enum {FALSE, TRUE} e_bool;

class Child extends uvm_object;
  string 	 m_name;
  logic[3:0] m_age;
  
  \`uvm_object_utils_begin(Child)
  	\`uvm_field_string 	(m_name, UVM_ALL_ON)
  	\`uvm_field_int 		(m_age, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name="Child");
    super.new(name);
  endfunction
endclass

class Parent extends uvm_object;
  
  string 	m_name;
  bit[15:0]	m_age;
  int 		m_numbers[$];
  e_bool 	m_employed;
  Child 	m_child;
  
  \`uvm_object_utils_begin(Parent)
  	\`uvm_field_enum			(e_bool, m_employed, UVM_ALL_ON)
  	\`uvm_field_int			(m_age, UVM_ALL_ON)
  	\`uvm_field_queue_int 	(m_numbers, UVM_ALL_ON)
  	\`uvm_field_string 		(m_name, UVM_ALL_ON)
  	\`uvm_field_object 		(m_child, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name="Parent");
    super.new(name);
  endfunction
  
endclass

module tb;
  initial begin
    Parent p = Parent::type_id::create("Parent");
    p.m_name = "Joey";
    p.m_employed = TRUE;
    p.m_age = 29;
    p.m_numbers = '{1234, 5678, 9011};
    p.m_child = new();
    p.m_child.m_name = "Joey Jr";
    p.m_child.m_age  = 1;
    
    p.print();
  end
endmodule`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Alan Makroları: Bayrak Tipleri ve Yazdırma Seçenekleri",
      initialCode: `typedef enum {FALSE, TRUE} e_bool;

class Child extends uvm_object;
  string 	 m_name;
  logic[3:0] m_age;
  
  \`uvm_object_utils_begin(Child)
  	\`uvm_field_string 	(m_name, UVM_ALL_ON)
  	\`uvm_field_int 		(m_age, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name="Child");
    super.new(name);
  endfunction
endclass

class Parent extends uvm_object;
  
  string 	m_name;
  bit[15:0]	m_age;
  int 		m_numbers[$];
  e_bool 	m_employed;
  Child 	m_child;
  
  \`uvm_object_utils_begin(Parent)
  	\`uvm_field_enum			(e_bool, m_employed, UVM_ALL_ON)
  	\`uvm_field_int			(m_age, UVM_ALL_ON)
  	\`uvm_field_queue_int 	(m_numbers, UVM_ALL_ON)
  	\`uvm_field_string 		(m_name, UVM_ALL_ON)
  	\`uvm_field_object 		(m_child, UVM_ALL_ON)
  \`uvm_object_utils_end
  
  function new(string name="Parent");
    super.new(name);
  endfunction
  
endclass

module tb;
  initial begin
    Parent p = Parent::type_id::create("Parent");
    p.m_name = "Joey";
    p.m_employed = TRUE;
    p.m_age = 29;
    p.m_numbers = '{1234, 5678, 9011};
    p.m_child = new();
    p.m_child.m_name = "Joey Jr";
    p.m_child.m_age  = 1;
    
    p.print();
  end
endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Alan Makroları: Bayrak Tipleri ve Yazdırma Seçenekleri doğrulaması başarıyla tamamlandı.",
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
      question: "Bir işlem sınıfındaki zaman damgası (timestamp) alanının kopyalanması ve yazdırılması istenirken, Scoreboard karşılaştırmasından (`compare`) muaf tutulması için hangi bayrak ifadesi kullanılmalıdır?",
      options: ["A) `UVM_ALL_ON | UVM_NOCOMPARE` (veya `UVM_DEFAULT | UVM_NOCOMPARE`)", "B) `UVM_NOPRINT | UVM_NOCOPY`", "C) `UVM_HEX | UVM_BIN`", "D) `UVM_REFERENCE | UVM_NOPACK`"],
      correctIndex: 0,
      explanation: "UVM alan bayrakları bit düzeyinde VEYA (`|`) operatörü ile birleştirilir. `UVM_ALL_ON` tüm temel işlemleri aktif ederken, yanına `| UVM_NOCOMPARE` eklendiğinde karşılaştırma işlemi bu alan için devreden çıkarılır, yazdırma ve kopyalama ise aktif kalmaya devam eder.",
    },
  },
};
