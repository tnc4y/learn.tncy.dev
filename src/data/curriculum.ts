export interface Lesson {
  id: string;
  title: string;
  shortTitle: string;
  readTime: string;
  difficulty: "Başlangıç" | "Orta" | "İleri";
  description: string;
  hasPlayground: boolean;
  category: "Design" | "Verification" | "Core" | "Web" | "Embedded" | "Programming";
}

export interface ModuleSection {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseTrack {
  id: string;
  title: string;
  shortTitle: string;
  category: "Web Geliştirme" | "Gömülü Sistemler" | "Donanım & FPGA" | "Programlama Dilleri";
  icon: string;
  badge: string;
  color: string;
  description: string;
  modules: ModuleSection[];
}

export const COURSES: CourseTrack[] = [
  // ========================================================
  // 1. SYSTEMVERILOG (ÇİP TASARIMI & DOĞRULAMA)
  // ========================================================
  {
    id: "systemverilog",
    title: "SystemVerilog (RTL & Doğrulama)",
    shortTitle: "SystemVerilog",
    category: "Donanım & FPGA",
    icon: "Cpu",
    badge: "Çip Tasarımı & Doğrulama",
    color: "badge-primary",
    description: "Endüstri standardı donanım tanımlama ve doğrulama dili: Sentezlenebilir RTL, 4-durumlu logic, FSM, OOP sınıfları, SVA ve UVM temelleri.",
    modules: [
      {
        id: "sv-basics",
        number: 1,
        title: "Giriş & Temeller",
        description: "SystemVerilog mimarisi, RTL tasarımı ile doğrulama (verification) arasındaki farklar ve EDA simülasyon akışı.",
        lessons: [
          {
            id: "intro",
            title: "SystemVerilog Nedir? (Verilog vs SystemVerilog)",
            shortTitle: "Giriş & Genel Bakış",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "Modern çiplerin tasarımı ve doğrulanmasında SystemVerilog'un yeri ve Verilog'dan farkları.",
            hasPlayground: true,
            category: "Core",
          },
          {
            id: "testbench-basics",
            title: "İlk Testbench ve Simülasyon Mantığı",
            shortTitle: "Testbench Temelleri",
            readTime: "8 dk",
            difficulty: "Başlangıç",
            description: "DUT (Design Under Test) kavramı, uyaran üretme ve $display, $monitor kullanımı.",
            hasPlayground: true,
            category: "Verification",
          },
        ],
      },
      {
        id: "sv-data-types",
        number: 2,
        title: "Veri Tipleri",
        description: "2-durumlu ve 4-durumlu modern SystemVerilog veri tipleri, enum, struct ve kullanıcı tanımlı tipler.",
        lessons: [
          {
            id: "logic-type",
            title: "4-Durumlu Mantık: logic Veri Tipi",
            shortTitle: "logic Veri Tipi",
            readTime: "5 dk",
            difficulty: "Başlangıç",
            description: "0, 1, X, Z durumları ve reg/wire yerine tek tip mantığı: logic.",
            hasPlayground: true,
            category: "Core",
          },
          {
            id: "2-state-types",
            title: "2-Durumlu Tipler: bit, byte, int, longint",
            shortTitle: "bit, byte, int Tipleri",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "Yüksek hızlı simülasyonlar için 2-durumlu (0 ve 1) veri tipleri.",
            hasPlayground: true,
            category: "Core",
          },
          {
            id: "strings",
            title: "Dizgiler (Strings) ve Formatlama",
            shortTitle: "string Veri Tipi",
            readTime: "5 dk",
            difficulty: "Başlangıç",
            description: "Metin manipülasyonu, len(), toupper() ve $sformatf fonksiyonları.",
            hasPlayground: true,
            category: "Verification",
          },
          {
            id: "enums",
            title: "Numaralandırılmış Tipler (enum) & FSM",
            shortTitle: "enum (Numaralandırma)",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Sonlu durum makineleri (FSM) ve tip güvenli durum tanımları.",
            hasPlayground: true,
            category: "Design",
          },
          {
            id: "struct-union",
            title: "Yapılar (struct) ve Birlikler (union)",
            shortTitle: "struct & union",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Paketlenmiş (packed) ve paketlenmemiş veri paketleme mimarileri.",
            hasPlayground: true,
            category: "Core",
          },
          {
            id: "typedef-alias",
            title: "Özel Tipler: typedef ve alias",
            shortTitle: "typedef & alias",
            readTime: "4 dk",
            difficulty: "Başlangıç",
            description: "Okunabilir ve tekrar kullanılabilir tip tanımlamaları oluşturma.",
            hasPlayground: false,
            category: "Core",
          },
        ],
      },
      {
        id: "sv-arrays",
        number: 3,
        title: "Diziler & Koleksiyonlar",
        description: "Packed, unpacked, dinamik diziler, kuyruklar (queues) ve ilişkisel hash haritaları.",
        lessons: [
          {
            id: "packed-unpacked-arrays",
            title: "Paketlenmiş (Packed) vs Paketlenmemiş Diziler",
            shortTitle: "Packed / Unpacked Diziler",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Bit düzeyinde hafıza yerleşimi ve donanım register modelleri.",
            hasPlayground: true,
            category: "Design",
          },
          {
            id: "dynamic-arrays",
            title: "Dinamik Diziler (Dynamic Arrays)",
            shortTitle: "Dinamik Diziler",
            readTime: "6 dk",
            difficulty: "Orta",
            description: "Çalışma anında boyutlandırılabilir bellek ve testbench veri havuzları.",
            hasPlayground: true,
            category: "Verification",
          },
          {
            id: "queues",
            title: "Kuyruklar (Queues): push, pop ve Arama",
            shortTitle: "Kuyruklar (Queues)",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "FIFO ve paket kuyruklama için dahili SystemVerilog kuyruk mekanizması.",
            hasPlayground: true,
            category: "Verification",
          },
          {
            id: "associative-arrays",
            title: "İlişkisel Diziler (Associative Arrays)",
            shortTitle: "İlişkisel Diziler",
            readTime: "6 dk",
            difficulty: "İleri",
            description: "Büyük seyrek bellek (sparse memory) modelleri ve anahtar-değer haritaları.",
            hasPlayground: true,
            category: "Verification",
          },
          {
            id: "array-methods",
            title: "Dizi Manipülasyon Metodları",
            shortTitle: "Dizi Metodları (sort/find)",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "find(), find_index(), sort(), reverse() ve sum() fonksiyonları.",
            hasPlayground: true,
            category: "Verification",
          },
        ],
      },
      {
        id: "sv-control-flow",
        number: 4,
        title: "Akış Kontrolü & Sentezlenebilir RTL",
        description: "always_comb, always_ff blokları, döngüler ve modern dallanma mekanizmaları.",
        lessons: [
          {
            id: "always-blocks",
            title: "always_comb, always_ff ve always_latch",
            shortTitle: "Modern always Blokları",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Latch oluşumunu engelleyen ve sentez niyetini belirten modern RTL blokları.",
            hasPlayground: true,
            category: "Design",
          },
          {
            id: "unique-priority",
            title: "unique ve priority (if-else & case)",
            shortTitle: "unique / priority",
            readTime: "6 dk",
            difficulty: "Orta",
            description: "Eksik dalları yakalama ve paralel/öncelikli donanım kodlayıcıları.",
            hasPlayground: true,
            category: "Design",
          },
          {
            id: "loops",
            title: "Döngüler: for, foreach, repeat ve forever",
            shortTitle: "Döngüler (Loops)",
            readTime: "7 dk",
            difficulty: "Başlangıç",
            description: "Diziler üzerinde gezinme ve testbench saat/uyaran üreteçleri.",
            hasPlayground: true,
            category: "Core",
          },
        ],
      },
      {
        id: "sv-scheduling",
        number: 5,
        title: "Zamanlama Semantiği",
        description: "Olay bölgeleri (event regions), delta döngüleri ve yarış durumlarının çözümü.",
        lessons: [
          {
            id: "event-regions",
            title: "SystemVerilog Zamanlama Bölgeleri (Stratified Queue)",
            shortTitle: "Olay Bölgeleri",
            readTime: "9 dk",
            difficulty: "İleri",
            description: "Preponed, Active, Observed, Reactive ve Postponed bölgeleri.",
            hasPlayground: false,
            category: "Core",
          },
          {
            id: "delta-cycles-race",
            title: "Delta Döngüleri & Yarış Durumları (Race Conditions)",
            shortTitle: "Delta Döngüleri & #0",
            readTime: "7 dk",
            difficulty: "İleri",
            description: "#0 gecikmesinin tehlikeleri ve engellenemeyen atamaların (<=) önemi.",
            hasPlayground: true,
            category: "Design",
          },
        ],
      },
      {
        id: "sv-oop",
        number: 6,
        title: "Nesne Yönelimli Programlama (OOP)",
        description: "Sınıflar, kalıtım, polimorfizm, sanal metodlar ve $cast dinamik dönüşümü.",
        lessons: [
          {
            id: "classes-basics",
            title: "Sınıflar (Classes), Nesneler ve new() Kurucusu",
            shortTitle: "Class & Nesne Mantığı",
            readTime: "9 dk",
            difficulty: "Orta",
            description: "Donanım doğrulamada nesne yönelimli mimarinin temeli ve referans handle kavramı.",
            hasPlayground: true,
            category: "Verification",
          },
          {
            id: "inheritance-polymorphism",
            title: "Kalıtım, Polimorfizm & Sanal Metodlar (virtual)",
            shortTitle: "Kalıtım & Polimorfizm",
            readTime: "10 dk",
            difficulty: "İleri",
            description: "Genişletilebilir testbench sınıfları ve çalışma anı polimorfizmi.",
            hasPlayground: true,
            category: "Verification",
          },
          {
            id: "casting",
            title: "Tip Dönüşümü: Statik vs $cast Dinamik Dönüşüm",
            shortTitle: "Tip Dönüşümü ($cast)",
            readTime: "6 dk",
            difficulty: "İleri",
            description: "Üst sınıf ve alt sınıf handle'ları arasında güvenli geçiş.",
            hasPlayground: true,
            category: "Verification",
          },
        ],
      },
      {
        id: "sv-randomization",
        number: 7,
        title: "Rastgeleleştirme & Kısıtlar (CRV)",
        description: "rand, randc, pre_randomize, post_randomize ve kısıt blokları (constraints).",
        lessons: [
          {
            id: "rand-variables",
            title: "rand ve randc Değişkenleri",
            shortTitle: "rand & randc Değişkenleri",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Kısıtlı rastgele testbench (Constrained Random Verification - CRV) temelleri.",
            hasPlayground: true,
            category: "Verification",
          },
          {
            id: "constraint-blocks",
            title: "Kısıt Blokları (constraint): inside, dist, implication",
            shortTitle: "Kısıt Blokları",
            readTime: "9 dk",
            difficulty: "Orta",
            description: "Protokol uyumlu veri paketleri üretmek için kısıt kuralları yazımı.",
            hasPlayground: true,
            category: "Verification",
          },
        ],
      },
      {
        id: "sv-assertions",
        number: 8,
        title: "İfadeler (SVA - SystemVerilog Assertions)",
        description: "Anlık ve zaman tabanlı concurrent assertion'lar, sequence ve property kuralları.",
        lessons: [
          {
            id: "immediate-assertions",
            title: "Anlık İfadeler (Immediate Assertions)",
            shortTitle: "Immediate Assertions",
            readTime: "6 dk",
            difficulty: "Orta",
            description: "Prosedürel bloklar içinde anlık durum doğrulama ve hata raporlama.",
            hasPlayground: true,
            category: "Verification",
          },
          {
            id: "concurrent-assertions",
            title: "Eşzamanlı İfadeler: property ve sequence",
            shortTitle: "Concurrent SVA & Property",
            readTime: "10 dk",
            difficulty: "İleri",
            description: "Zamanla değişen protokol kurallarını (|->, |=>) saat darbeleriyle doğrulama.",
            hasPlayground: true,
            category: "Verification",
          },
        ],
      },
      {
        id: "sv-interfaces",
        number: 9,
        title: "Arayüzler & Modportlar",
        description: "Interface yapısı, modport bağlantıları, saat blokları ve sanal arayüzler.",
        lessons: [
          {
            id: "interface-modport",
            title: "Arayüzler (interface) ve modport Kavramı",
            shortTitle: "Interface & Modport",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Sinyal karmaşasını sonlandırma, modüler protokol kablolaması.",
            hasPlayground: true,
            category: "Design",
          },
          {
            id: "virtual-interface",
            title: "Sanal Arayüzler (virtual interface) & Clocking Block",
            shortTitle: "Virtual Interface",
            readTime: "9 dk",
            difficulty: "İleri",
            description: "OOP tabanlı testbench sınıfları ile fiziksel donanım sinyallerini bağlama.",
            hasPlayground: true,
            category: "Verification",
          },
        ],
      },
      {
        id: "sv-threads",
        number: 10,
        title: "İş Parçacıkları & IPC",
        description: "fork..join paralel süreçler, mailbox, semaphore ve event iletişimi.",
        lessons: [
          {
            id: "fork-join",
            title: "Paralel Süreçler: fork..join, join_any, join_none",
            shortTitle: "fork..join İşlemleri",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Aynı anda birden fazla donanım aktörünü ve zaman aşımlarını çalıştırma.",
            hasPlayground: true,
            category: "Core",
          },
          {
            id: "ipc-primitives",
            title: "Süreçler Arası İletişim: mailbox, semaphore, event",
            shortTitle: "IPC (Mailbox/Semaphore)",
            readTime: "8 dk",
            difficulty: "İleri",
            description: "Thread-safe veri alışverişi ve kaynak kilitleme mekanizmaları.",
            hasPlayground: true,
            category: "Verification",
          },
        ],
      },
      {
        id: "sv-interview",
        number: 11,
        title: "Mülakat Soru Bankası",
        description: "En sık sorulan SystemVerilog & Donanım Doğrulama mülakat soruları ve yanıtları.",
        lessons: [
          {
            id: "interview-prep",
            title: "En Popüler 30+ SystemVerilog Mülakat Sorusu",
            shortTitle: "Mülakat Soruları",
            readTime: "15 dk",
            difficulty: "Orta",
            description: "Teknik iş görüşmelerinde sorulan tuzak sorular, kod parçaları ve detaylı açıklamaları.",
            hasPlayground: false,
            category: "Core",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 2. VERILOG & FPGA DONANIM TASARIMI
  // ========================================================
  {
    id: "verilog-fpga",
    title: "Verilog & FPGA Mantık Tasarımı",
    shortTitle: "Verilog & FPGA",
    category: "Donanım & FPGA",
    icon: "Activity",
    badge: "Mantıksal Sentez",
    color: "badge-secondary",
    description: "Sayısal mantık devreleri ve FPGA programlama: Kombinasyonel/ardışıl mantık, Basys 3 / DE10-Lite kısıtları ve donanım sentezi.",
    modules: [
      {
        id: "v-basics",
        number: 1,
        title: "Sayısal Mantık & Verilog Temelleri",
        description: "Temel mantık kapıları, veri akışı ve assign ifadeleri.",
        lessons: [
          {
            id: "verilog-fpga-intro",
            title: "Verilog HDL'e Giriş ve Sayısal Mantık Kapıları",
            shortTitle: "Verilog & Mantık Kapıları",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "AND, OR, NOT, XOR kapıları, module/endmodule iskeleti ve testbench simülasyonu.",
            hasPlayground: true,
            category: "Design",
          },
          {
            id: "verilog-combinational",
            title: "Kombinasyonel Devreler ve assign İfadeleri",
            shortTitle: "Kombinasyonel Mantık",
            readTime: "7 dk",
            difficulty: "Başlangıç",
            description: "Çoğullayıcı (Multiplexer), Kod Çözücü (Decoder) ve Tam Toplayıcı (Full Adder) tasarımı.",
            hasPlayground: true,
            category: "Design",
          },
        ],
      },
      {
        id: "v-sequential",
        number: 2,
        title: "Ardışıl Devreler & Saat Darbeleri",
        description: "D Flip-Flop, sayıcılar (counters) ve frekans bölücüler.",
        lessons: [
          {
            id: "verilog-sequential",
            title: "D Flip-Flop, Registerlar ve Saat Bölücüler",
            shortTitle: "Flip-Flop & Sayıcılar",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "always @(posedge clk) blokları, engellemeyen (non-blocking) atamalar ve saat frekansı bölme.",
            hasPlayground: true,
            category: "Design",
          },
          {
            id: "verilog-fsm",
            title: "Sonlu Durum Makineleri (FSM: Mealy & Moore)",
            shortTitle: "FSM Durum Makineleri",
            readTime: "9 dk",
            difficulty: "Orta",
            description: "Trafik ışığı ve desen tanıyıcı için 3-parçalı standart FSM kodlama stili.",
            hasPlayground: true,
            category: "Design",
          },
        ],
      },
      {
        id: "v-fpga-hw",
        number: 3,
        title: "FPGA Donanım Sentezi & Kısıt Dosyaları",
        description: "Basys 3 ve DE10-Lite üzerinde canlı pin eşleme ve XDC kısıtları.",
        lessons: [
          {
            id: "verilog-fpga-xdc",
            title: "Xilinx Vivado & Intel Quartus ile Pin Eşleme (XDC/SDC)",
            shortTitle: "FPGA Pin Eşleme & XDC",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Paket pinleri, I/O standartları (LVCMOS33) ve zaman kısıtları (timing constraints).",
            hasPlayground: false,
            category: "Design",
          },
          {
            id: "verilog-7seg-display",
            title: "7-Segment Ekran Sürücüsü ve Buton Filtreleme (Debounce)",
            shortTitle: "7-Segment & Debounce",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Zaman çoğullamalı 7-segment gösterge ve mekanik buton titreşim önleme mimarisi.",
            hasPlayground: true,
            category: "Design",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 3. HTML5 (WEB GELİŞTİRME)
  // ========================================================
  {
    id: "html",
    title: "HTML5 Web Geliştirme",
    shortTitle: "HTML5",
    category: "Web Geliştirme",
    icon: "FileCode2",
    badge: "Web Temelleri",
    color: "badge-error",
    description: "Modern web sayfalarının iskeleti: Semantik etiketler, formlar, tablolar ve multimedya elemanları.",
    modules: [
      {
        id: "html-basics",
        number: 1,
        title: "HTML5 Temelleri & Belge Yapısı",
        description: "Web sayfalarının yapısı, DOCTYPE, başlık ve paragraf etiketleri.",
        lessons: [
          {
            id: "html-intro",
            title: "HTML5 Temelleri ve Sayfa İskeleti",
            shortTitle: "HTML5 Giriş & İskelet",
            readTime: "5 dk",
            difficulty: "Başlangıç",
            description: "Web sayfalarının iskeletini oluşturan semantik etiketler ve temel etiket hiyerarşisi.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "html-text-links",
            title: "Metin Formatlama, Bağlantılar ve Resimler",
            shortTitle: "Metin, Link & Medya",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "<a>, <img>, <ul>, <ol> ve modern bağlantı kuralları.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
      {
        id: "html-media-tables",
        number: 2,
        title: "Medya Elemanları & Tablolar",
        description: "Görseller, ses/video oynatıcılar ve veri tabloları.",
        lessons: [
          {
            id: "html-tables-media",
            title: "Tablolar, Video ve Audio Multimedya Etiketleri",
            shortTitle: "Tablolar & Medya",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "<table>, <tr>, <th>, <td>, <video> ve <audio> yerel tarayıcı oynatıcıları.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "html-lists-containers",
            title: "Listeler ve Kapsayıcılar (div, span)",
            shortTitle: "Listeler & Kapsayıcılar",
            readTime: "5 dk",
            difficulty: "Başlangıç",
            description: "Blok (block) ve satır içi (inline) elemanlar, genel kapsayıcılar.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
      {
        id: "html-forms-module",
        number: 3,
        title: "Formlar & Veri Girişi",
        description: "Kullanıcıdan veri alma, modern HTML5 form elemanları ve doğrulama.",
        lessons: [
          {
            id: "html-forms",
            title: "Modern HTML5 Formları ve Doğrulama",
            shortTitle: "HTML Formları",
            readTime: "7 dk",
            difficulty: "Başlangıç",
            description: "input tipleri, validation, select ve textarea etiketleri.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "html-inputs-validation",
            title: "Form Girdi Tipleri, Desenler (Pattern) ve Güvenlik",
            shortTitle: "Girdi Tipleri & Validasyon",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "email, number, date, regex pattern kuralları ve form submit olayları.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
      {
        id: "html-semantics-module",
        number: 4,
        title: "Semantik Web & Erişilebilirlik (A11y)",
        description: "SEO, ekran okuyucu uyumluluğu ve modern semantik sayfa bölümleri.",
        lessons: [
          {
            id: "html-semantics",
            title: "Semantik HTML5: header, nav, main, footer, article",
            shortTitle: "Semantik Etiketler",
            readTime: "5 dk",
            difficulty: "Başlangıç",
            description: "SEO ve erişilebilirlik (A11y) standartlarına uygun semantik yapı.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "html-accessibility",
            title: "Web Erişilebilirliği (A11y) ve ARIA Standartları",
            shortTitle: "Erişilebilirlik (A11y)",
            readTime: "6 dk",
            difficulty: "Orta",
            description: "aria-label, rol atamaları, odaklanma yönetimi ve WCAG kuralları.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 4. CSS3 (STİL & TASARIM)
  // ========================================================
  {
    id: "css",
    title: "CSS3 Stil & Tasarım",
    shortTitle: "CSS3",
    category: "Web Geliştirme",
    icon: "Palette",
    badge: "Stil & Düzen",
    color: "badge-info",
    description: "Modern web tasarımı, Flexbox ve Grid sistemleri, duyarlı (responsive) tasarım ve animasyonlar.",
    modules: [
      {
        id: "css-basics",
        number: 1,
        title: "CSS Temelleri & Seçiciler",
        description: "Sözdizimi, renkler, tipografi ve seçiciler hiyerarşisi.",
        lessons: [
          {
            id: "css-intro",
            title: "CSS3 Temelleri & Flexbox Düzeni",
            shortTitle: "CSS3 & Flexbox",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "Modern kutu modeli, renkler ve tek eksende esnek Flexbox hizalama.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "css-selectors",
            title: "Gelişmiş CSS Seçicileri ve Pseudo-Class'lar",
            shortTitle: "Seçiciler & Pseudo-Class",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "ID, sınıf, nitelik seçicileri, :hover, :focus ve :nth-child kuralları.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
      {
        id: "css-box-module",
        number: 2,
        title: "Kutu Modeli (Box Model) & Tipografi",
        description: "Margin, padding, border, box-sizing ve web yazı tipleri.",
        lessons: [
          {
            id: "css-box-model-deep",
            title: "Kutu Modeli: Padding, Margin, Border ve Display",
            shortTitle: "Kutu Modeli (Box Model)",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "İç boşluk, dış boşluk, border ve kutu boyutlandırma kuralları.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "css-typography-colors",
            title: "Modern Renk Sistemleri (HSL, OKLCH) ve Web Tipografisi",
            shortTitle: "Renkler & Tipografi",
            readTime: "5 dk",
            difficulty: "Başlangıç",
            description: "font-family, line-height, letter-spacing ve modern CSS değişkenleri (variables).",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
      {
        id: "css-layout-module",
        number: 3,
        title: "Modern Yerleşim: Flexbox & Grid",
        description: "Esnek tek boyutlu ve 2 boyutlu modern web ızgara mimarileri.",
        lessons: [
          {
            id: "css-flexbox-deep",
            title: "Kapsamlı Flexbox: justify-content, align-items ve gap",
            shortTitle: "Derinlemesine Flexbox",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Flex yönü, sarma (flex-wrap), büyüme/küçülme faktörleri ve pratik navbar/kart düzenleri.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "css-grid",
            title: "2 Boyutlu Düzen: CSS Grid Mimarisi",
            shortTitle: "CSS Grid Sistemi",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Satırlar, sütunlar, grid-template-areas ve modern web ızgaraları.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
      {
        id: "css-responsive-module",
        number: 4,
        title: "Responsive Tasarım & Animasyonlar",
        description: "Medya sorguları, dönüşümler (transform) ve anahtar kare (keyframes) animasyonları.",
        lessons: [
          {
            id: "css-responsive",
            title: "Medya Sorguları ve Mobil Uyumlu Tasarım",
            shortTitle: "Responsive Tasarım",
            readTime: "6 dk",
            difficulty: "Orta",
            description: "Mobil, tablet ve masaüstü ekranlar için breakpoints yönetimi.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "css-animations",
            title: "Geçişler (Transitions), Transform ve Keyframes Animasyonları",
            shortTitle: "CSS Animasyonları",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Akıcı buton efektleri, yükleme animasyonları ve GPU hızlandırmalı transformasyonlar.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 5. JAVASCRIPT (ES6+)
  // ========================================================
  {
    id: "javascript",
    title: "JavaScript (ES6+)",
    shortTitle: "JavaScript",
    category: "Web Geliştirme",
    icon: "Code2",
    badge: "Etkileşim & Dinamizm",
    color: "badge-warning",
    description: "Modern JavaScript: let/const, DOM manipülasyonu, olaylar, asenkron async/await ve API istekleri.",
    modules: [
      {
        id: "js-core",
        number: 1,
        title: "JS Temelleri & Değişkenler",
        description: "Değişken tanımlama (let/const), ilkel tipler ve operatörler.",
        lessons: [
          {
            id: "js-intro",
            title: "Modern JavaScript (ES6+) & DOM",
            shortTitle: "JavaScript Temelleri",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Dinamik web uygulamaları için let/const, olay dinleme ve modern JS temelleri.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "js-data-types",
            title: "Veri Tipleri, Tip Dönüşümleri ve Şablon Dizgileri",
            shortTitle: "Veri Tipleri & Strings",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "String, Number, Boolean, BigInt, Symbol, tip güvenliği ve backtick kullanımı.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
      {
        id: "js-functions-module",
        number: 2,
        title: "Fonksiyonlar, Kapsam & Diziler",
        description: "Arrow functions, closures, modern dizi ve nesne metotları.",
        lessons: [
          {
            id: "js-functions",
            title: "Arrow Fonksiyonlar, Kapsam (Scope) ve Closures",
            shortTitle: "Fonksiyonlar & Scope",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Geleneksel vs Ok fonksiyonlar, lexical this, closures ve fonksiyonel programlama.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "js-arrays-objects",
            title: "Dizi Metotları (map, filter, reduce) ve Destructuring",
            shortTitle: "Diziler & Nesneler",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Modern veri işleme, rest/spread operatörleri ve obje parçalama (destructuring).",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
      {
        id: "js-dom-module",
        number: 3,
        title: "DOM Manipülasyonu & Olaylar",
        description: "Sayfa elemanlarını seçme, stil değiştirme ve olay dinleyicileri.",
        lessons: [
          {
            id: "js-dom-events",
            title: "DOM Seçimi, Olaylar ve Event Listeners",
            shortTitle: "DOM & Olay Yönetimi",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "querySelector, addEventListener ve dinamik HTML element oluşturma.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "js-dynamic-ui",
            title: "Dinamik Liste/Kart Oluşturma ve LocalStorage",
            shortTitle: "Dinamik UI & Depolama",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Tarayıcı hafızasında veri saklama (localStorage) ve dinamik liste render etme.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
      {
        id: "js-async",
        number: 4,
        title: "Asenkron JavaScript & API'ler",
        description: "Promises, async/await ve fetch ile veri alışverişi.",
        lessons: [
          {
            id: "js-async-await",
            title: "Asenkron Programlama: Promises ve Async/Await",
            shortTitle: "Async / Await Mantığı",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Bloke etmeyen JavaScript, Promise zincirleri ve try/catch hata yönetimi.",
            hasPlayground: false,
            category: "Web",
          },
          {
            id: "js-fetch-api",
            title: "Fetch API ile REST Sunucularından Veri Çekme",
            shortTitle: "Fetch API & JSON",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "JSON veri formatı, GET/POST istekleri ve hata yakalama.",
            hasPlayground: false,
            category: "Web",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 6. GÖMÜLÜ C (EMBEDDED C)
  // ========================================================
  {
    id: "embedded-c",
    title: "Gömülü C (Embedded C)",
    shortTitle: "Gömülü C",
    category: "Gömülü Sistemler",
    icon: "Cpu",
    badge: "Donanım Kontrolü",
    color: "badge-primary",
    description: "Mikrodenetleyiciler için C: Bit manipülasyonları, işaretçiler, bellek haritalı I/O (MMIO) ve kesmeler.",
    modules: [
      {
        id: "emb-c-basics",
        number: 1,
        title: "Bit Düzeyinde Kontrol & Registerlar",
        description: "Bitwise operatörler, maskeleme ve doğrudan register erişimi.",
        lessons: [
          {
            id: "embedded-c-intro",
            title: "Gömülü C ve Bit Düzeyinde Donanım Kontrolü",
            shortTitle: "Gömülü C (Bit/Register)",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Mikrodenetleyicilerde bitwise işlemler, işaretçiler ve MMIO register kontrolü.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "embedded-c-data-types",
            title: "stdint.h Tipleri (uint8_t, int32_t) ve Endianness",
            shortTitle: "Sabit Boyutlu Tipler",
            readTime: "6 dk",
            difficulty: "Orta",
            description: "Mimari bağımsız veri tipleri, byte hizalama (alignment) ve Little/Big Endian.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
      {
        id: "emb-c-pointers",
        number: 2,
        title: "Bellek & İşaretçiler (Pointers)",
        description: "Bellek eşlemeli I/O (MMIO) ve işaretçi aritmetiği.",
        lessons: [
          {
            id: "embedded-c-pointers-mmio",
            title: "Bellek Haritalı I/O (MMIO) ve Pointer Aritmetiği",
            shortTitle: "MMIO & İşaretçiler",
            readTime: "9 dk",
            difficulty: "İleri",
            description: "Fiziksel donanım adreslerine C işaretçileri ile doğrudan yazma ve okuma.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "embedded-c-bitwise",
            title: "Bit Maskeleme: Set, Clear, Toggle ve Shift Operatörleri",
            shortTitle: "Bit Maskeleme İşlemleri",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Register bitlerini güvenle değiştirme yöntemleri: (1 << PIN), bitwise AND/OR/XOR.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
      {
        id: "emb-c-interrupts",
        number: 3,
        title: "Kesmeler (Interrupts) & Volatile",
        description: "Donanım kesmeleri, kesme servis rutinleri (ISR) ve volatile niteleyicisi.",
        lessons: [
          {
            id: "embedded-c-volatile-isr",
            title: "volatile Niteleyicisi ve Kesme Servis Rutinleri (ISR)",
            shortTitle: "volatile & Kesmeler",
            readTime: "8 dk",
            difficulty: "İleri",
            description: "Derleyici optimizasyon tuzakları, volatile gerekliliği ve ISR kuralları.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "embedded-c-critical-sections",
            title: "Kritik Bölgeler ve Kesme Devre Dışı Bırakma (Cli/Sei)",
            shortTitle: "Kritik Bölgeler & Eşzamanlılık",
            readTime: "7 dk",
            difficulty: "İleri",
            description: "Yarış durumu (race condition) önleme ve atomik veri erişimi sağlama.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
      {
        id: "emb-c-drivers",
        number: 4,
        title: "Donanım Sürücüleri (Peripherals)",
        description: "GPIO, UART seri haberleşme ve I2C sürücüsü geliştirme.",
        lessons: [
          {
            id: "embedded-c-gpio-driver",
            title: "Sıfırdan Bare-Metal GPIO Sürücüsü Yazma",
            shortTitle: "Bare-Metal GPIO Sürücüsü",
            readTime: "8 dk",
            difficulty: "İleri",
            description: "MODER, ODR, IDR registerları üzerinden STM32 / AVR pin sürme.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "embedded-c-uart-comm",
            title: "UART Seri Haberleşme Sürücüsü ve Baud Rate Hesabı",
            shortTitle: "UART Seri Sürücü",
            readTime: "9 dk",
            difficulty: "İleri",
            description: "Donanımsal FIFO, baud rate bölücü hesaplama ve bloklamayan veri iletimi.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 7. MICROPYTHON
  // ========================================================
  {
    id: "micropython",
    title: "MicroPython (ESP32 & Pico)",
    shortTitle: "MicroPython",
    category: "Gömülü Sistemler",
    icon: "Terminal",
    badge: "Hızlı IoT",
    color: "badge-success",
    description: "ESP32 ve Raspberry Pi Pico üzerinde Python: GPIO, sensör okuma, PWM, Wi-Fi ve MQTT.",
    modules: [
      {
        id: "mpy-basics",
        number: 1,
        title: "Kurulum & Donanım Sürme (GPIO)",
        description: "machine modülü, REPL ve dijital giriş/çıkış kontrolü.",
        lessons: [
          {
            id: "micropython-intro",
            title: "MicroPython ile ESP32 & Pico Donanım Kontrolü",
            shortTitle: "MicroPython Giriş",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "machine.Pin modülü ile GPIO kontrolü, PWM ve hızlı IoT prototipleme.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "micropython-repl",
            title: "REPL Etkileşimli Kabuk ve Thonny IDE Kullanımı",
            shortTitle: "REPL & Thonny IDE",
            readTime: "5 dk",
            difficulty: "Başlangıç",
            description: "Canlı kod yürütme, mikrodenetleyici dosya sistemi (LittleFS) yönetimi.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
      {
        id: "mpy-sensors",
        number: 2,
        title: "Analog Okuma & PWM Sinyalleri",
        description: "ADC potansiyometre okuma ve PWM ile motor/LED parlaklık ayarı.",
        lessons: [
          {
            id: "micropython-adc-pwm",
            title: "Analog Okuma (ADC) ve PWM ile Motor/LED Kontrolü",
            shortTitle: "ADC & PWM Kontrolü",
            readTime: "7 dk",
            difficulty: "Başlangıç",
            description: "Potansiyometre okuma, duty cycle ayarı ve motor hız kontrolü.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "micropython-sensors-i2c",
            title: "I2C ve SPI ile Çevre Sensörleri (DHT22, BMP280) Okuma",
            shortTitle: "I2C/SPI Sensör Okuma",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Donanımsal I2C veriyolu taraması ve sıcaklık/basınç kütüphaneleri.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
      {
        id: "mpy-iot",
        number: 3,
        title: "IoT & Kablosuz Ağlar",
        description: "ESP32 Wi-Fi bağlantısı ve MQTT ile buluta veri gönderme.",
        lessons: [
          {
            id: "micropython-wifi-mqtt",
            title: "Wi-Fi Bağlantısı ve MQTT ile Telemetri Gönderimi",
            shortTitle: "Wi-Fi & MQTT IoT",
            readTime: "9 dk",
            difficulty: "Orta",
            description: "network modülü, kablosuz ağa bağlanma ve MQTT broker iletişimi.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "micropython-web-server",
            title: "Mikrodenetleyici Üzerinde Web Sunucusu (Socket & HTTP)",
            shortTitle: "Dahili Web Sunucusu",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Tarayıcıdan kartın röle ve LED'lerini açıp kapatan yerel HTTP sunucu.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 8. ARDUINO
  // ========================================================
  {
    id: "arduino",
    title: "Arduino & Sensörler",
    shortTitle: "Arduino",
    category: "Gömülü Sistemler",
    icon: "Layers",
    badge: "Robotik & Prototip",
    color: "badge-accent",
    description: "Arduino ekosistemi: Dijital/analog pinler, seri port haberleşmesi, motorlar ve sensörler.",
    modules: [
      {
        id: "ard-basics",
        number: 1,
        title: "Arduino Ekosistemi & Temeller",
        description: "setup/loop yaşam döngüsü, pinMode, digitalWrite ve breadboard.",
        lessons: [
          {
            id: "arduino-intro",
            title: "Arduino Temelleri: setup(), loop() ve Dijital I/O",
            shortTitle: "Arduino Programlama",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "Standart Arduino yaşam döngüsü, sensör okuma ve dijital çıkış mantığı.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "arduino-breadboard-led",
            title: "Devre Kurulumu: Buton ile LED Yakma ve Pull-up Direnci",
            shortTitle: "Buton & Pull-Up Mantığı",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "INPUT_PULLUP modu, buton arkı (bounce) ve akım sınırlayıcı direnç hesabı.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
      {
        id: "ard-sensors-comm",
        number: 2,
        title: "Seri Port & Sensör Entegrasyonu",
        description: "Serial Monitor, analog okuma ve HC-SR04 ultrasonik sensör.",
        lessons: [
          {
            id: "arduino-serial-sensors",
            title: "Seri Port Haberleşmesi ve Ultrasonik Sensör",
            shortTitle: "Seri Port & Sensörler",
            readTime: "7 dk",
            difficulty: "Başlangıç",
            description: "Serial.print, baud rate ve HC-SR04 mesafe sensörü okuması.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "arduino-analog-read",
            title: "Analog Giriş (analogRead) ve LDR Işık Sensörü",
            shortTitle: "Analog Giriş & LDR",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "10-bit ADC çözünürlüğü, 0-1023 voltaj eşleme (map) fonksiyonu.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
      {
        id: "ard-actuators",
        number: 3,
        title: "Aktüatörler, Motorlar & Ekranlar",
        description: "PWM sinyali, Servo motor açısı ve I2C LCD ekran kontrolü.",
        lessons: [
          {
            id: "arduino-pwm-motors",
            title: "PWM ile Servo ve DC Motor Hız / Açı Kontrolü",
            shortTitle: "Motor & Servo Kontrolü",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Servo kütüphanesi (write, attach), L298N H-köprüsü motor sürücü mantığı.",
            hasPlayground: false,
            category: "Embedded",
          },
          {
            id: "arduino-i2c-lcd",
            title: "I2C LCD ve OLED Ekranlarda Metin / Grafik Gösterme",
            shortTitle: "I2C LCD & Ekranlar",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "LiquidCrystal_I2C kütüphanesi ile 2 pin üzerinden bilgi ekranı sürme.",
            hasPlayground: false,
            category: "Embedded",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 9. PYTHON 3
  // ========================================================
  {
    id: "python",
    title: "Python 3 Programlama",
    shortTitle: "Python",
    category: "Programlama Dilleri",
    icon: "Code2",
    badge: "Genel Amaçlı & AI",
    color: "badge-info",
    description: "Temiz sözdizimli modern dil: Veri yapıları, fonksiyonlar, OOP sınıfları ve dosya I/O.",
    modules: [
      {
        id: "py-basics",
        number: 1,
        title: "Python Temelleri & Veri Yapıları",
        description: "Değişkenler, listeler, sözlükler (dict) ve döngüler.",
        lessons: [
          {
            id: "python-intro",
            title: "Python 3 Temelleri & Veri Yapıları",
            shortTitle: "Python 3 Temelleri",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "Temiz sözdizimi, listeler, sözlükler (dict) ve list comprehension.",
            hasPlayground: false,
            category: "Programming",
          },
          {
            id: "python-control-flow",
            title: "Koşul İfadeleri, Döngüler (for, while) ve Fonksiyonlar",
            shortTitle: "Döngüler & Fonksiyonlar",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "if/elif/else, enumerate, zip ve parametreli fonksiyon mimarisi.",
            hasPlayground: false,
            category: "Programming",
          },
        ],
      },
      {
        id: "py-functions-files",
        number: 2,
        title: "Gelişmiş Fonksiyonlar & Dosya I/O",
        description: "Lambda, *args, **kwargs, dosya okuma/yazma ve JSON.",
        lessons: [
          {
            id: "python-functions",
            title: "Gelişmiş Fonksiyonlar, *args/**kwargs ve Lambdalar",
            shortTitle: "Fonksiyonlar & Lambdalar",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Değişken sayıda argümanlar, tek satırlık lambdalar ve generator ifadeleri.",
            hasPlayground: false,
            category: "Programming",
          },
          {
            id: "python-file-io",
            title: "Dosya Yönetimi (with open) ve JSON Veri Ayrıştırma",
            shortTitle: "Dosya İşlemleri & JSON",
            readTime: "7 dk",
            difficulty: "Orta",
            description: "Context manager (with), metin/CSV okuma, json.loads ve json.dumps.",
            hasPlayground: false,
            category: "Programming",
          },
        ],
      },
      {
        id: "py-oop-exceptions",
        number: 3,
        title: "Nesne Yönelimli Programlama & Hata Yönetimi",
        description: "Sınıflar, kalıtım, sihirli metodlar ve try/except blokları.",
        lessons: [
          {
            id: "python-oop",
            title: "Python ile Nesne Yönelimli Programlama (OOP)",
            shortTitle: "Python OOP (Sınıflar)",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "__init__, self, kalıtım ve sihirli metodlar (magic methods).",
            hasPlayground: false,
            category: "Programming",
          },
          {
            id: "python-exceptions",
            title: "Hata Yönetimi (try/except) ve Özel İstisnalar",
            shortTitle: "Hata Yönetimi (Exceptions)",
            readTime: "6 dk",
            difficulty: "Orta",
            description: "Sağlam kod yazma, finally blokları ve raise ile özel istisna fırlatma.",
            hasPlayground: false,
            category: "Programming",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 10. MODERN C++ (C++20)
  // ========================================================
  {
    id: "cpp",
    title: "Modern C++ (C++20)",
    shortTitle: "Modern C++",
    category: "Programlama Dilleri",
    icon: "Code2",
    badge: "Yüksek Başarım",
    color: "badge-neutral",
    description: "Yüksek performanslı sistem programlama: RAII, akıllı işaretçiler, şablonlar (templates) ve STL.",
    modules: [
      {
        id: "cpp-modern",
        number: 1,
        title: "Modern C++ & Bellek Mimarisi",
        description: "std::unique_ptr, referanslar, RAII ve move semantiği.",
        lessons: [
          {
            id: "cpp-intro",
            title: "Modern C++ (C++20) ve RAII Mimarisi",
            shortTitle: "Modern C++ (C++20)",
            readTime: "7 dk",
            difficulty: "İleri",
            description: "Akıllı işaretçiler (std::unique_ptr), bellek yönetimi ve RAII prensibi.",
            hasPlayground: false,
            category: "Programming",
          },
          {
            id: "cpp-references",
            title: "Referanslar, const Doğruluğu ve auto Tipi",
            shortTitle: "Referanslar & auto",
            readTime: "6 dk",
            difficulty: "Orta",
            description: "Kopya maliyetini sıfırlama (&), const garantisi ve derleme anı tip çıkarımı.",
            hasPlayground: false,
            category: "Programming",
          },
        ],
      },
      {
        id: "cpp-classes-raii",
        number: 2,
        title: "Sınıflar, OOP & Akıllı İşaretçiler",
        description: "Kurucular, yıkıcılar, std::unique_ptr ve std::shared_ptr.",
        lessons: [
          {
            id: "cpp-classes",
            title: "Sınıf Mimarisi, Kurucu / Yıkıcı Metotlar ve Rule of 5",
            shortTitle: "Sınıflar & Rule of 5",
            readTime: "8 dk",
            difficulty: "İleri",
            description: "Kapsülleme, yıkıcıda kaynak temizliği, kopyalama ve taşıma (move) kuralları.",
            hasPlayground: false,
            category: "Programming",
          },
          {
            id: "cpp-smart-pointers",
            title: "Akıllı İşaretçiler: unique_ptr, shared_ptr, weak_ptr",
            shortTitle: "Akıllı İşaretçiler (Pointers)",
            readTime: "8 dk",
            difficulty: "İleri",
            description: "Bellek sızıntılarını sıfıra indiren sahiplik modelleri ve referans sayacı.",
            hasPlayground: false,
            category: "Programming",
          },
        ],
      },
      {
        id: "cpp-stl-templates",
        number: 3,
        title: "STL Konteynerleri & Şablonlar (Templates)",
        description: "std::vector, std::unordered_map, lambda ifadeleri ve jenerik şablonlar.",
        lessons: [
          {
            id: "cpp-templates",
            title: "Şablonlar (Templates) ve Jenerik Programlama",
            shortTitle: "Şablonlar (Templates)",
            readTime: "7 dk",
            difficulty: "İleri",
            description: "Türden bağımsız jenerik fonksiyon ve sınıf yazımı.",
            hasPlayground: false,
            category: "Programming",
          },
          {
            id: "cpp-stl",
            title: "Standart Şablon Kütüphanesi (STL: vector, map, algoritmalar)",
            shortTitle: "STL Konteynerleri",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "std::vector dinamik dizisi, std::map haritaları ve std::sort algoritmaları.",
            hasPlayground: false,
            category: "Programming",
          },
        ],
      },
    ],
  },

  // ========================================================
  // 11. RUST
  // ========================================================
  {
    id: "rust",
    title: "Rust Sistem Programlama",
    shortTitle: "Rust",
    category: "Programlama Dilleri",
    icon: "Zap",
    badge: "Bellek Güvenliği",
    color: "badge-warning",
    description: "Garbage collector olmadan %100 bellek güvenliği: Ownership, borrowing, lifetimes ve traits.",
    modules: [
      {
        id: "rust-ownership-module",
        number: 1,
        title: "Sahiplik (Ownership) & Ödünç Alma",
        description: "Rust'ın temel bellek modeli: Move, borrow, lifetimes ve pattern matching.",
        lessons: [
          {
            id: "rust-intro",
            title: "Rust: Sahiplik (Ownership) ve Bellek Güvenliği",
            shortTitle: "Rust & Ownership",
            readTime: "8 dk",
            difficulty: "İleri",
            description: "Garbage collector olmadan derleme anında %100 bellek güvenliği.",
            hasPlayground: false,
            category: "Programming",
          },
          {
            id: "rust-basics",
            title: "Cargo Paketi, Değişkenler (let mut) ve Skaler Tipler",
            shortTitle: "Cargo & Değişkenler",
            readTime: "6 dk",
            difficulty: "Başlangıç",
            description: "Rust ekosistemi, varsayılan sabitlik (immutability) ve temel skaler tipler.",
            hasPlayground: false,
            category: "Programming",
          },
        ],
      },
      {
        id: "rust-borrowing-module",
        number: 2,
        title: "Ödünç Alma (Borrowing) & Dilimler (Slices)",
        description: "Referanslar (&, &mut), referans kuralları ve dilimler.",
        lessons: [
          {
            id: "rust-borrowing",
            title: "Ödünç Alma (&) ve Değiştirilebilir Referanslar (&mut)",
            shortTitle: "Borrowing & Referanslar",
            readTime: "8 dk",
            difficulty: "İleri",
            description: "Aynı anda birden çok okuma referansı veya tek yazma referansı kuralı.",
            hasPlayground: false,
            category: "Programming",
          },
          {
            id: "rust-slices",
            title: "Dilimler (Slices) ve Koleksiyon Görünümleri",
            shortTitle: "Dilimler (Slices)",
            readTime: "6 dk",
            difficulty: "Orta",
            description: "Dize dilimleri (&str) ve dizi dilimleri ile kopyalamadan veri erişimi.",
            hasPlayground: false,
            category: "Programming",
          },
        ],
      },
      {
        id: "rust-structs-errors",
        number: 3,
        title: "Structs, Enums & Hata Yönetimi",
        description: "Option, Result, match deseni ve güvenli hata yönetimi.",
        lessons: [
          {
            id: "rust-structs-enums",
            title: "Yapılar (struct), Numaralandırmalar (enum) ve match Deseni",
            shortTitle: "Structs & Enums",
            readTime: "8 dk",
            difficulty: "Orta",
            description: "Özel veri modelleri, impl blokları ve derleyici garantili pattern matching.",
            hasPlayground: false,
            category: "Programming",
          },
          {
            id: "rust-error-handling",
            title: "Hata Yönetimi: Option, Result ve ? Operatörü",
            shortTitle: "Option & Result",
            readTime: "7 dk",
            difficulty: "İleri",
            description: "Null işaretçi hatalarını önleyen Option<T> ve kurtarılabilir hatalar (Result<T, E>).",
            hasPlayground: false,
            category: "Programming",
          },
        ],
      },
    ],
  },
];

// DÜZ LİSTE & GERİYE UYUMLULUK:
// Tüm modülleri tek bir dizide toplar (arama ve haritalama için)
export const CURRICULUM: ModuleSection[] = COURSES.flatMap((c) => c.modules);

// DERSİ VE BAĞLI OLDUĞU KURSU/MODÜLÜ BULMA:
export function getLessonById(id: string): {
  lesson: Lesson;
  module: ModuleSection;
  course: CourseTrack;
} | null {
  for (const course of COURSES) {
    for (const modSection of course.modules) {
      const lesson = modSection.lessons.find((l) => l.id === id);
      if (lesson) {
        return { lesson, module: modSection, course };
      }
    }
  }
  return null;
}

// BİR KURSA AİT ÖNCEKİ VE SONRAKİ DERSİ BULMA (DERSLER BİRBİRİNE KARIŞMASIN):
export function getAdjacentLessons(id: string): { prev: Lesson | null; next: Lesson | null } {
  // Önce dersin hangi kursa ait olduğunu bul:
  const lookup = getLessonById(id);
  if (!lookup) return { prev: null, next: null };

  // Yalnızca O KURSA ait dersler listesinde gez! (Böylece HTML dersi SystemVerilog'a atlamaz)
  const courseLessons = lookup.course.modules.flatMap((m) => m.lessons);
  const index = courseLessons.findIndex((l) => l.id === id);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? courseLessons[index - 1] : null,
    next: index < courseLessons.length - 1 ? courseLessons[index + 1] : null,
  };
}
