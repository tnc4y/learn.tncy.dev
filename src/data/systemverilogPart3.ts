import { LessonContent } from "./lessonsData";

export const SYSTEMVERILOG_PART3: Record<string, LessonContent> = {
  // ==========================================
  // MODÜL 6: NESNE YÖNELİMLİ PROGRAMLAMA (OOP)
  // ==========================================
  "classes-basics": {
    id: "classes-basics",
    badge: "Modül 6 • OOP & Sınıflar",
    readingTime: "13 dk okuma",
    level: "Orta Seviye",
    title: "Sınıflar (Classes), Nesneler ve new() Kurucusu",
    subtitle:
      "Donanım doğrulamada nesne yönelimli mimarinin temeli, referans handle kavramı, new() kurucusu ve sığ/derin kopyalama.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste modern testbench (UVM) mimarisinin temeli olan nesne yönelimli programlama (OOP) yapılarını öğreneceksiniz:
- Neden modüller (module) yerine sınıflar (class) doğrulama için şarttır?
- **Sınıf Tanımı** vs **Nesne (Object)** vs **Handle (İşaretçi)** ayrımı.
- Bellekte nesne yaratma: \`new()\` kurucu fonksiyonu.
- \`this\` anahtar kelimesi ve sınıf üyelerine erişim.
- Statik üyeler (\`static int count\`) ve sınıflar arası ortak veri paylaşımı.
- Nesne kopyalama: **Sığ Kopyalama (Shallow Copy)** vs **Derin Kopyalama (Deep Copy)**.`,
      },
      {
        title: "2. Sınıftan Nesneye: Bellek Mimarisi",
        content: `![SystemVerilog Sınıf ve Nesne Mimarisi](/images/systemverilog/sv-class-to-objects.svg)

Bir sınıf (\`class\`) sadece bir veri ve fonksiyon şablonudur; tanımlandığında bellekte yer kaplamaz.
Bir değişken bildirdiğinizde (\`Packet pkt;\`), sadece bir **handle (işaretçi/referans)** oluşur ve başlangıçta \`null\` değerindedir.
Gerçek nesne ancak \`pkt = new();\` çağrıldığında dinamik heap belleğinde inşa edilir!`,
      },
      {
        title: "3. Handle Kopyalama vs Nesne Kopyalama (Aliasing Tehlikesi)",
        content: `![Handle Aliasing Tehlikesi](/images/systemverilog/sv-class-handle-aliasing.svg)

Yeni başlayan mühendislerin en sık düştüğü tuzak:
\`\`\`systemverilog
Packet p1, p2;
p1 = new();
p1.data = 100;
p2 = p1; // DİKKAT: Yeni bir nesne oluşturulmaz!
p2.data = 200; // p1.data da artık 200 olur!
\`\`\`
\`p2 = p1;\` ifadesi yalnızca adres referansını kopyalar (Handle Aliasing). İki handle da bellekteki aynı tek nesneyi gösterir!`,
      },
      {
        title: "4. Sığ (Shallow) vs Derin (Deep) Kopyalama",
        content: `Yeni bir nesne kopyası oluşturmak için:
1. **Shallow Copy (\`p2 = new p1;\`):** Birinci seviye değişkenler kopyalanır; ancak nesnenin içindeki gömülü alt nesneler yine referans olarak kalır.
2. **Deep Copy (Özel \`copy()\` metodu):** Nesne ve onun altındaki tüm iç nesneler sıfırdan kopyalanır. Endüstriyel UVM ortamlarında daima deep copy kullanılır.`,
        callout: {
          type: "info",
          title: "UVM clone() Mantığı",
          message:
            "UVM'de tüm veri paketleri (uvm_sequence_item) deep copy mantığıyla çoğaltılır; böylece bir bileşen paketi işlerken diğeri orijinal veriyi bozamaz.",
        },
      },
      {
        title: "5. ChipVerify Örneği: Paket Sınıfı ve new() Kurucusu",
        content: `Aşağıdaki kodda özel kurucu parametrelerine sahip bir sınıf tanımını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "SystemVerilog Sınıfı ve Kurucu Metodu",
          snippet: `class Packet;
  bit [31:0] addr;
  bit [31:0] data;
  static int packet_count = 0; // Tüm nesneler için ortak sayaç

  // Kurucu (Constructor)
  function new(bit [31:0] a = 0, bit [31:0] d = 0);
    this.addr = a;
    this.data = d;
    packet_count++;
  endfunction

  function void print();
    $display("[Paket #%0d] Adres=0x%08h, Veri=0x%08h", 
             packet_count, this.addr, this.data);
  endfunction
endclass

module tb_class_demo;
  initial begin
    Packet p1 = new(32'h1000, 32'hDEADBEEF);
    Packet p2 = new(32'h2000, 32'hCAFEFEED);

    p1.print();
    p2.print();
    $display("Toplam Üretilen Paket: %0d", Packet::packet_count);
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Sınıflar sadece testbench doğrulamada kullanılır; sentezlenemez.
* \`pkt = new();\` çağrılmadan nesne metodlarına erişmek \`Null Pointer Dereference\` hatası verir.
* Statik değişkenler tüm sınıf nesneleri arasında ortaktır.`,
      },
    ],
    playground: {
      title: "OOP Sınıf ve Nesne Simülatörü",
      initialCode: `class Transactor;
  string name;
  int id;

  function new(string n, int i);
    this.name = n;
    this.id = i;
  endfunction

  function void report();
    $display("Bileşen: %s (ID: %0d)", name, id);
  endfunction
endclass

module tb_oop_sim;
  initial begin
    Transactor drv = new("Driver", 1);
    Transactor mon = new("Monitor", 2);

    drv.report();
    mon.report();
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_oop_sim.sv...",
        "Bileşen: Driver (ID: 1)",
        "Bileşen: Monitor (ID: 2)",
      ],
      notes: "drv = mon; atamasının nesne kimliğini nasıl değiştirdiğini test edin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'Packet p;' tanımlandıktan sonra 'p.data = 10;' yazılırsa ve 'p = new();' çağrılmamışsa ne olur?",
      options: [
        "A) p otomatik olarak oluşturulur ve değer atanır.",
        "B) Çalışma zamanında Null-pointer (null object dereference) ölümcül hatası alınır.",
        "C) p değişkeni 0 değeriyle başlatılır.",
        "D) Derleyici kodu yoksayar.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 'Packet p;' ifadesi yalnızca boş bir handle (işaretçi) tanımlar (değeri null'dur). new() ile bellekte nesne oluşturulmadan üyelerine erişilirse simülatör Null Pointer hatası verir.",
    },
  },

  "inheritance-polymorphism": {
    id: "inheritance-polymorphism",
    badge: "Modül 6 • OOP & Sınıflar",
    readingTime: "14 dk okuma",
    level: "İleri Seviye",
    title: "Kalıtım, Polimorfizm & Sanal Metodlar (virtual)",
    subtitle:
      "Genişletilebilir testbench sınıfları, extends anahtar kelimesi, super referansı, virtual metotlar ve callback mekanizmaları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste testbench mimarisini yeniden kullanılabilir hale getiren kalıtım ve polimorfizmi öğreneceksiniz:
- **Kalıtım (Inheritance):** \`extends\` anahtar kelimesi ile temel sınıftan türetme.
- Üst sınıf kurucusunu ve metodunu çağırma: \`super.new()\` ve \`super.print()\`.
- **Sanal Metotlar (\`virtual function/task\`):** Çalışma anı dinamik bağlama (Dynamic Binding).
- **Polimorfizm:** Temel sınıf handle'ı üzerinden alt sınıf davranışını tetikleme.
- **Soyut Sınıflar (Abstract / Pure Virtual):** Arayüz şablonları oluşturma.
- **Callback Mekanizması:** Test ortamını bozmadan araya test kancaları yerleştirme.`,
      },
      {
        title: "2. Kalıtım ve Polimorfizm Mimarisi",
        content: `![SystemVerilog Kalıtım ve Polimorfizm Mimarisi](/images/systemverilog/sv-inheritance-polymorphism.svg)

Doğrulama ortamında standart bir Ethernet paketi sınıfınız varsa ve hata enjekte edilmiş (bad CRC, bozuk payload) bir test paketi gerekiyorsa, sıfırdan yeni bir sınıf yazmak yerine kalıtım alırsınız:
\`\`\`systemverilog
class BadPacket extends Packet;
  // Sadece bozulacak kısımları ez (override)!
endclass
\`\`\``,
      },
      {
        title: "3. Sanal Metotların (virtual) Önemi",
        content: `Eğer bir metodun başına **\`virtual\`** yazmazsanız, SystemVerilog statik bağlama (static binding) yapar; yani handle'ın tipine bakar.
Başına **\`virtual\`** eklendiğinde ise nesnenin **gerçek çalışma zamanındaki türüne** bakar:

\`\`\`systemverilog
class Base;
  virtual function void display();
    $display("Ben Base sınıfıyım");
  endfunction
endclass

class Derived extends Base;
  function void display();
    $display("Ben Derived sınıfıyım");
  endfunction
endclass

// Polimorfizm:
Base b = new Derived();
b.display(); // Ekrana "Ben Derived sınıfıyım" basar! (virtual sayesinde)
\`\`\``,
        callout: {
          type: "tip",
          title: "UVM Kuralı",
          message:
            "Genişletilebilir bir testbench yazarken sınıflarınızdaki tüm task ve function tanımlarının başına daima 'virtual' ekleyin. Böylece alt sınıflar metotları güvenle ezebilir.",
        },
      },
      {
        title: "4. Testbench Callback Mekanizması",
        content: `![SystemVerilog Callback Mimarisi](/images/systemverilog/systemverilog-callback.svg)

Doğrulama mühendisleri bir sürücünün (Driver) kodunu değiştirmeden araya hata enjeksiyonu veya özel gecikmeler eklemek istediklerinde **Callback** sınıfları kullanırlar. Yukarıdaki mimaride görüldüğü gibi, ana akış belirli kancalarda (hooks) sanal callback metodlarını çağırır.`,
      },
      {
        title: "5. ChipVerify Örneği: Polimorfik Testbench",
        content: `Aşağıdaki kodda polimorfik paket işleme sistemini inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Polimorfizm ve super.new() Kullanımı",
          snippet: `class BasePacket;
  int id;
  function new(int i); this.id = i; endfunction
  virtual function void send();
    $display("Standart Paket #%0d iletildi.", id);
  endfunction
endclass

class ErrorPacket extends BasePacket;
  function new(int i); super.new(i); endfunction
  virtual function void send();
    $display("[HATA TESTİ] Paket #%0d bozuk CRC ile iletildi!", id);
  endfunction
endclass

module tb_poly;
  initial begin
    BasePacket pkt_list [2];
    pkt_list[0] = new BasePacket(1);
    pkt_list[1] = new ErrorPacket(2); // Polimorfik atama

    foreach (pkt_list[i]) begin
      pkt_list[i].send();
    end
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Kalıtım için \`extends\`, üst sınıf için \`super\` kullanılır.
* Polimorfizmin çalışması için taban sınıftaki metodun başına \`virtual\` konulmalıdır.`,
      },
    ],
    playground: {
      title: "Polimorfizm ve Sanal Metot Simülatörü",
      initialCode: `class Animal;
  virtual function void speak();
    $display("Hayvan sesi");
  endfunction
endclass

class Dog extends Animal;
  function void speak();
    $display("Hav hav!");
  endfunction
endclass

module tb_poly_play;
  initial begin
    Animal a = new Dog();
    a.speak(); // Sanal metot sayesinde köpeğin sesi çıkar
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_poly_play.sv...",
        "Hav hav!",
      ],
      notes: "Animal sınıfındaki 'virtual' kelimesini kaldırıp çıktının nasıl değiştiğini gözlemleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da temel sınıftaki bir metodun 'virtual' olarak tanımlanmasının temel amacı nedir?",
      options: [
        "A) Metodun simülasyonda daha hızlı çalışmasını sağlamak.",
        "B) Alt sınıflar tarafından ezildiğinde (override), temel sınıf handle'ı üzerinden bile alt sınıfın metodunun dinamik olarak çağrılabilmesini (polimorfizm) sağlamak.",
        "C) Metodun değişkenlerini sıfırlamak.",
        "D) Metodu sentezlenebilir hale getirmek.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! 'virtual' anahtar kelimesi çalışma zamanında dinamik bağlama (late binding) sağlar; temel sınıf handle'ı üzerinden nesne çağrıldığında gerçek nesnenin ezilmiş metodu çalışır.",
    },
  },

  "casting": {
    id: "casting",
    badge: "Modül 6 • OOP & Sınıflar",
    readingTime: "11 dk okuma",
    level: "İleri Seviye",
    title: "Tip Dönüşümü: Statik vs $cast Dinamik Dönüşüm",
    subtitle:
      "Statik casting (type'(val)), $cast dinamik dönüşümü, yukarı/aşağı tip dönüşümü (Upcasting / Downcasting).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog'un güvenli tip dönüştürme mekanizmalarını öğreneceksiniz:
- **Statik Tip Dönüşümü:** \`type'(ifade)\` sözdizimi.
- **Dinamik Tip Dönüşümü (\`$cast\`):** Çalışma anında güvenli sınıf ve enum dönüşümü.
- **Yukarı Dönüşüm (Upcasting):** Alt sınıftan üst sınıfa güvenli geçiş.
- **Aşağı Dönüşüm (Downcasting):** Üst sınıf handle'ından alt sınıfa geçiş ve tehlikeleri.
- \`$cast\` fonksiyonunun dönüş değeri ile güvenli hata yakalama.`,
      },
      {
        title: "2. Dinamik Tip Dönüşümü ($cast) Mimarisi",
        content: `![SystemVerilog Dinamik Tip Dönüşümü ($cast)](/images/systemverilog/sv-dynamic-cast.svg)

Bir temel sınıf handle'ı (\`Base b;\`) aslında bir alt sınıf nesnesi (\`Derived d;\`) tutuyor olabilir. Ancak derleyici handle'ın tipine baktığı için alt sınıfa özgü yeni değişkenlere doğrudan erişmenize izin vermez.
Alt sınıfın özel alanlarına erişebilmek için handle'ı alt sınıfa dönüştürmelisiniz (**Downcasting**). İşte bu dönüşümü güvenle yapan araç **\`$cast\`** dır!`,
      },
      {
        title: "3. Statik vs Dinamik Casting",
        content: `1. **Statik Casting (\`type'(val)\`):** Derleme anında kontrol edilir. Tamsayı genişliklerini veya işaret durumlarını değiştirmek için kullanılır:
\`\`\`systemverilog
int a = 100;
byte b = byte'(a); // 32-bit'ten 8-bit'e statik dönüşüm
\`\`\`

2. **Dinamik Casting (\`$cast(hedef, kaynak)\`):** Çalışma anında nesnenin gerçek bellekteki türünü denetler. Eğer türler uyumsuzsa \`0\` döner ve simülasyonun çökmesini engeller:
\`\`\`systemverilog
if (!$cast(derived_h, base_h)) begin
  $error("Dönüşüm başarısız! base_h aslında Derived türünde bir nesne değil!");
end
\`\`\``,
      },
      {
        title: "4. ChipVerify Örneği: $cast ile Downcasting ve Enum Dönüşümü",
        content: `Aşağıdaki kodda \`$cast\` fonksiyonunun hem sınıflarda hem de enum tiplerinde kullanımını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "$cast Fonksiyonu Kullanımı",
          snippet: `module tb_cast_demo;
  typedef enum {IDLE, READ, WRITE} state_e;
  state_e st;
  int val = 2;

  initial begin
    // Enum için güvenli tamsayı dönüşümü
    if ($cast(st, val))
      $display("Enum Dönüşümü Başarılı: %s", st.name());
    else
      $error("Geçersiz enum değeri!");

    // Geçersiz değer denemesi
    val = 99; // Tanımsız enum
    if (!$cast(st, val))
      $display("99 değeri enum'a dönüştürülemedi (Beklenen Güvenlik Davranışı)");
  end
endmodule`,
        },
      },
      {
        title: "5. Hızlı Kontrol & Özet",
        content: `* Upcasting otomatiktir ve her zaman güvenlidir (\`base = derived;\`).
* Downcasting için kesinlikle \`$cast\` kullanılmalıdır.
* \`$cast\` bir fonksiyon olarak çağrıldığında (if (!$cast(...))) başarısızlık durumunda simülasyonu çökertmez.`,
      },
    ],
    playground: {
      title: "$cast Dinamik Tip Dönüşümü Simülatörü",
      initialCode: `class Base;
  int id = 1;
endclass

class Derived extends Base;
  int extra_data = 999;
endclass

module tb_cast_play;
  initial begin
    Base b = new Derived(); // Upcasting
    Derived d;

    if ($cast(d, b)) begin
      $display("Dönüşüm Başarılı! extra_data = %0d", d.extra_data);
    end else begin
      $display("Dönüşüm Hatalı!");
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_cast_play.sv...",
        "Dönüşüm Başarılı! extra_data = 999",
      ],
      notes: "Base b = new Base(); yaparak $cast fonksiyonunun nasıl başarısız olduğunu test edin.",
    },
    quiz: {
      question:
        "SystemVerilog'da bir temel sınıf (Base) handle'ını bir alt sınıf (Derived) handle'ına dönüştürmek (downcasting) için neden $cast kullanılmalıdır?",
      options: [
        "A) Doğrudan atama (derived = base;) derleme anında tip uyuşmazlığı hatası vereceği için; $cast çalışma anında nesnenin gerçek tipini denetler.",
        "B) $cast nesneyi klonladığı için.",
        "C) $cast donanım flip-flop'u ürettiği için.",
        "D) Doğrudan atama sadece string tiplerinde geçerli olduğu için.",
      ],
      correctIndex: 0,
      explanation:
        "Doğru! SystemVerilog derleyicisi tür güvenliği gereği türetilmiş sınıf handle'ına doğrudan temel sınıf atamasına izin vermez. $cast, çalışma zamanında nesnenin gerçekte Derived olup olmadığını kontrol eder.",
    },
  },

  // ==========================================
  // MODÜL 7: KISITLI RASTLANTISALLIK (CRV)
  // ==========================================
  "rand-variables": {
    id: "rand-variables",
    badge: "Modül 7 • Kısıtlı Rastgele Test (CRV)",
    readingTime: "12 dk okuma",
    level: "Orta Seviye",
    title: "Rastgele Değişkenler: rand vs randc",
    subtitle:
      "Constrained Random Verification (CRV), rand vs randc, randomize() metodu ve pre/post_randomize fonksiyonları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste modern doğrulama metodolojisinin en güçlü silahı olan rastlantısal test üretimini (CRV) öğreneceksiniz:
- Neden elle yazılan test senaryoları (Direct Tests) modern SoC'leri doğrulamak için yetersizdir?
- **CRV (Constrained Random Verification)** felsefesi.
- **\`rand\`** vs **\`randc\` (Random Cyclic)** değişkenleri arasındaki kritik fark.
- \`obj.randomize()\` fonksiyonu ve başarı kontrolü.
- **Rastgelelik Kancaları:** \`pre_randomize()\` ve \`post_randomize()\`.
- Rastgeleliği açıp kapama: \`rand_mode()\`.`,
      },
      {
        title: "2. Rastgele Durum Uzayı ve Kapsama Mimarisi",
        content: `![Rastgele Durum Uzayı ve Doğrulama Kapsaması](/images/systemverilog/random-state-space-coverage.svg)

Geleneksel testlerde mühendis sadece aklına gelen durumları test eder; bu da tasarımdaki gizli köşelerde kalmış donanım böceklerinin (bugs) silisyuma kadar kaçmasına neden olur.
SystemVerilog CRV motoru, belirlenen sınırlar içinde milyonlarca beklenmeyen kombinasyonu otomatik üretir.`,
      },
      {
        title: "3. rand vs randc: Temel Fark",
        content: `* **\`rand\` (Standart Rastgele):** Her \`randomize()\` çağrısında eşit olasılıkla yeni bir değer seçer. Arka arkaya aynı değer gelebilir (örneğin zar atmak gibi).
* **\`randc\` (Rastgele Döngüsel / Random Cyclic):** Olası tüm değerler tam olarak bir kez seçilmeden hiçbir değer **tekrar etmez!** Tüm permütasyon bitince döngü sıfırlanır ve yeni bir permütasyon başlar (örneğin iskambil destesinden kart çekmek gibi).`,
        callout: {
          type: "tip",
          title: "randc Kullanım Alanı",
          message:
            "Bir durum makinesinin tüm durumlarını veya bir işlemcinin tüm op-kodlarını sırayla ama rastgele bir sırayla test etmek istediğinizde 'randc' mükemmel bir seçimdir.",
        },
      },
      {
        title: "4. pre_randomize ve post_randomize Kancaları",
        content: `Simülatör \`randomize()\` metodunu çalıştırırken otomatik olarak iki fonksiyonu tetikler:
1. **\`pre_randomize()\`**: Rastgele üretim başlamadan HEMEN ÖNCE çalışır. Ön hazırlık veya dinamik sınır ayarlamak için kullanılır.
2. **\`post_randomize()\`**: Değerler başarıyla üretildikten HEMEN SONRA çalışır. CRC hesaplamak veya türetilmiş alanları güncellemek için kullanılır.`,
      },
      {
        title: "5. ChipVerify Örneği: Paket Randomizasyonu",
        content: `Aşağıdaki kodda \`rand\` ve \`randc\` değişkenlerinin davranışını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "rand vs randc ve randomize() Kullanımı",
          snippet: `class Packet;
  rand  bit [3:0] normal_rand; // 0-15 arası rastgele (tekrar edebilir)
  randc bit [1:0] cyclic_rand; // 0-3 arası döngüsel (tümü bitmeden tekrar etmez)

  function void post_randomize();
    $display("Yeni Değerler: normal=%0d, cyclic=%0d", normal_rand, cyclic_rand);
  endfunction
endclass

module tb_rand_demo;
  initial begin
    Packet pkt = new();

    $display("--- 4 Çevrimlik Randomize Testi ---");
    repeat (4) begin
      if (!pkt.randomize())
        $error("Randomize başarısız!");
    end
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Randomize edilecek alanlar \`rand\` veya \`randc\` ile tanımlanmalıdır.
* \`randomize()\` çağrısı bir if içinde denetlenmelidir (\`if (!pkt.randomize()) $fatal(...)\`).`,
      },
    ],
    playground: {
      title: "Rastgele Değişkenler Simülatörü",
      initialCode: `class Dice;
  rand bit [2:0] val;
  constraint c_dice { val inside {[1:6]}; }
endclass

module tb_dice;
  initial begin
    Dice d = new();
    $display("Zar atılıyor (5 deneme):");
    repeat (5) begin
      void'(d.randomize());
      $display("  Gelen Zar: %0d", d.val);
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_dice.sv...",
        "Zar atılıyor (5 deneme):",
        "  Gelen Zar: 4",
        "  Gelen Zar: 6",
        "  Gelen Zar: 1",
        "  Gelen Zar: 3",
        "  Gelen Zar: 5",
      ],
      notes: "constraint içindeki aralığı [1:20] yaparak 20'lik zar simüle edin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'randc' niteleyicisi ile tanımlanmış 2-bitlik bir değişken (0, 1, 2, 3) için hangisi DOĞRUDUR?",
      options: [
        "A) Aynı değer arka arkaya rastgele gelebilir.",
        "B) Tüm 4 değer (0, 1, 2, 3) rastgele bir sırayla birer kez üretilmeden hiçbir değer tekrar edemez.",
        "C) Sadece çift sayıları üretir.",
        "D) Değerleri her zaman 0, 1, 2, 3 sırasıyla artarak üretir.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! 'randc' (random-cyclic), olası durum uzayındaki tüm değerleri rastgele bir permütasyonla tam birer kez tüketir; döngü tamamlanana kadar hiçbir değer tekrarlanmaz.",
    },
  },

  "constraint-blocks": {
    id: "constraint-blocks",
    badge: "Modül 7 • Kısıtlı Rastgele Test (CRV)",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Kısıt Blokları (constraint): inside, dist, implication",
    subtitle:
      "Protokol uyumlu veri paketleri, inside aralıkları, ağırlıklı dağılımlar (dist), koşullu kısıtlar (->) ve bellek bölümleme kısıtları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste rastgele değişkenleri akıllı ve anlamlı test paketlerine dönüştüren kısıt bloklarını öğreneceksiniz:
- Kısıt bloğu (\`constraint\`) tanımlama kuralları.
- **Aralık Kısıtı (\`inside\`):** Değer kümeleri ve tersleme (\`!(val inside {1, 2})\`).
- **Ağırlıklı Dağılım (\`dist\`):** Değerlerin seçilme sıklığını belirleme (\`:=\` vs \`:/\`).
- **Koşullu Kısıtlar:** Çıkarım (\`implication ->\`) ve \`if-else\` kısıtları.
- **Sıralama Belirleme (\`solve x before y;\`):** Olasılık dağılımını düzeltme.
- Satır içi kısıtlar: \`pkt.randomize() with { ... };\`.
- Bellek bölümleme ve çok boyutlu dizi kısıtları.`,
      },
      {
        title: "2. Çok Boyutlu Dizi Kısıtları Mimarisi",
        content: `![Çok Boyutlu Dizi Kısıtları](/images/systemverilog/multidimensional_array_constraint.png)

Karmaşık paket yapılarında ve hafıza tablolarında çok boyutlu dizilerin satır ve sütunlarının belirli kurallara uyması gerekir (örneğin her satırın toplamı belirli bir bayt sınırını geçemez). \`foreach\` kısıtları ile her dizi hücresi kurallara bağlanabilir.`,
      },
      {
        title: "3. Bellek Bölümleme (Memory Partitioning) Kısıtları",
        content: `Donanım doğrulamada bellek yöneticilerini (MMU) test etmek için bellek blokları rastgele parçalara bölünür:

![Bellek Bloğu](/images/systemverilog/memory_block.png)

1. **Eşit Parçalı Bölümleme:** Bellek eşit boyutlu bloklara ayrılır.
![Eşit Parçalı Bellek Bölümleme](/images/systemverilog/memory_equal_partitions.png)

2. **Değişken Boyutlu Bölümleme:** Farklı büyüklükteki veri paketleri için dinamik bloklar.
![Değişken Boyutlu Bellek Bölümleme](/images/systemverilog/memory_variable_partitions.png)

3. **Aralıklı (Gapped) Bölümleme:** Bloklar arasında ayrılmış koruma bölgeleri (guard bands).
![Aralıklı Bellek Bölümleme](/images/systemverilog/memory_variable_partitions_with_space_in_between.png)`,
      },
      {
        title: "4. Kısıt Operatörleri: inside, dist ve implication",
        content: `* **inside Operatörü:**
\`\`\`systemverilog
constraint c_addr { addr inside {[32'h0000:32'h0FFF], 32'hFFFF}; }
\`\`\`

* **dist (Ağırlıklı Dağılım):**
\`\`\`systemverilog
constraint c_len {
  // 1-10 arası her değere 40 ağırlık (:=), 11-100 arasına toplam 60 ağırlık (:/)
  len dist { [1:10] := 40, [11:100] :/ 60 };
}
\`\`\`

* **İma (Implication ->):**
\`\`\`systemverilog
constraint c_mode { (mode == READ) -> (burst_len == 1); }
\`\`\``,
      },
      {
        title: "5. ChipVerify Örneği: Protokol Uyumlu Paket Kısıtı",
        content: `Aşağıdaki kapsamlı ChipVerify örneğinde protokol kurallarının nasıl kısıtlandığını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Kapsamlı Kısıt Bloğu ve randomize() with",
          snippet: `class EthPacket;
  rand bit [15:0] length;
  rand bit [7:0]  payload [];
  rand bit        is_jumbo;

  // Temel Kısıtlar
  constraint c_jumbo {
    if (is_jumbo) {
      length inside {[1501:9000]};
    } else {
      length inside {[64:1500]};
    }
  }

  constraint c_payload {
    payload.size() == length;
  }
endclass

module tb_constraint_demo;
  initial begin
    EthPacket pkt = new();

    // Standart Kısıtla Üretim
    void'(pkt.randomize());
    $display("Paket 1: Jumbo=%0b, Uzunluk=%0d", pkt.is_jumbo, pkt.length);

    // Satır İçi (Inline) Kısıt: Sadece Jumbo üret!
    void'(pkt.randomize() with { is_jumbo == 1; length < 2000; });
    $display("Özel Jumbo Paket: Uzunluk=%0d", pkt.length);
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Çelişen kısıtlar (örneğin x > 10 ve x < 5) \`randomize()\` çağrısının başarısız olmasına yol açar.
* \`randomize() with { ... }\` ile o anki teste özel geçici kurallar eklenebilir.`,
      },
    ],
    playground: {
      title: "Kısıt Blokları (Constraint) Simülatörü",
      initialCode: `class BusTransaction;
  rand bit [7:0] addr;
  rand bit [7:0] data;

  constraint c_bus {
    addr inside {[8'h10:8'h20]}; // Sadece belirli adres aralığı
    data % 2 == 0;                // Sadece çift sayılar
  }
endclass

module tb_bus_play;
  initial begin
    BusTransaction tr = new();
    repeat (3) begin
      void'(tr.randomize());
      $display("Adres: 0x%02h, Veri: %0d", tr.addr, tr.data);
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_bus_play.sv...",
        "Adres: 0x14, Veri: 102",
        "Adres: 0x1f, Veri: 44",
        "Adres: 0x12, Veri: 220",
      ],
      notes: "tr.randomize() with { addr == 8'h15; }; ekleyerek adresi sabitlemeyi test edin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'len dist { [1:4] :/ 40 };' ifadesinde 1, 2, 3 ve 4 değerlerinin her birinin bireysel ağırlığı nedir?",
      options: [
        "A) Her birinin ağırlığı 40'tır.",
        "B) Toplam 40 ağırlık 4 elemana eşit paylaştırılır; her birinin ağırlığı 10'dur.",
        "C) Yalnızca 1 ve 4 değerlerinin ağırlığı 40'tır.",
        "D) Ağırlıklar rastgele atanır.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! ':/' operatörü belirtilen toplam ağırlığı (40) aralıktaki tüm eleman sayısına (4) eşit olarak böler (40 / 4 = 10). Bireysel ağırlık için ':=' kullanılırdı.",
    },
  },

  // ==========================================
  // MODÜL 8: FONKSİYONEL KAPSAMA (COVERAGE)
  // ==========================================
  "covergroup-coverpoint": {
    id: "covergroup-coverpoint",
    badge: "Modül 8 • Fonksiyonel Kapsama",
    readingTime: "12 dk okuma",
    level: "İleri Seviye",
    title: "covergroup ve coverpoint Temelleri",
    subtitle:
      "Kod kapsaması (Code Coverage) vs Fonksiyonel Kapsama, covergroup tanımları, örnekleme tetikleyicileri ve metrik ölçümü.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste doğrulamanın ne zaman bittiğine karar veren fonksiyonel kapsama temellerini öğreneceksiniz:
- **Kod Kapsaması (Code Coverage)** vs **Fonksiyonel Kapsama (Functional Coverage)**.
- **\`covergroup\`** mimarisi ve tanımlanması.
- **\`coverpoint\`** ile hedef sinyalleri ve değişkenleri izleme.
- Örnekleme yöntemleri: Saat darbesiyle otomatik örnekleme vs manuel \`cg.sample()\`.
- Kapsama yüzdesi hesaplama ve simülasyonu sonlandırma kriterleri.`,
      },
      {
        title: "2. Covergroup ve Bins Mimarisi",
        content: `![SystemVerilog Covergroup ve Bins Mimarisi](/images/systemverilog/sv-covergroup-bins.svg)

Kod kapsaması satırların çalışıp çalışmadığını ölçer; ancak bir tasarımın protokol kurallarını doğru icra edip etmediğini **asla bilemez**.
Fonksiyonel kapsama ise sizin tanımladığınız senaryoların (örneğin: "FIFO hem tam doldu mu, hem aynı anda okuma-yazma yapıldı mı?") test edilip edilmediğini ölçer.`,
      },
      {
        title: "3. covergroup Tanımlama ve sample() Metodu",
        content: `\`covergroup\` sınıf içinde veya modül içinde tanımlanabilir:
\`\`\`systemverilog
covergroup cg_bus @(posedge clk); // Her saat vuruşunda otomatik örnekler
  coverpoint addr;
  coverpoint cmd;
endgroup

// Manuel örneklemeli covergroup:
covergroup cg_manual;
  coverpoint mode;
endgroup

cg_manual cg_inst = new();
cg_inst.sample(); // Manuel tetikleme
\`\`\``,
      },
      {
        title: "4. ChipVerify Örneği: İşlem Kapsaması",
        content: `Aşağıdaki kodda basit bir komut kapsaması modelini inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Covergroup ve Manuel Örnekleme Örneği",
          snippet: `module tb_coverage_demo;
  logic [1:0] cmd;
  real cov_pct;

  covergroup cg_cmd;
    coverpoint cmd;
  endgroup

  initial begin
    cg_cmd cg = new();

    cmd = 2'b00; cg.sample();
    cmd = 2'b01; cg.sample();
    cmd = 2'b10; cg.sample();
    // 2'b11 henüz hiç örneklenmedi!

    cov_pct = cg.get_coverage();
    $display("Mevcut Kapsama: %0.2f%% (4 durumdan 3'ü görüldü: 75.00%%)", cov_pct);

    cmd = 2'b11; cg.sample();
    cov_pct = cg.get_coverage();
    $display("Nihai Kapsama: %0.2f%% (Hedef tamamlandı!)", cov_pct);
  end
endmodule`,
        },
      },
      {
        title: "5. Hızlı Kontrol & Özet",
        content: `* Fonksiyonel kapsama %100 olmadan bir çip asla üretime (tape-out) gönderilmez.
* \`get_coverage()\` fonksiyonu anlık kapsama başarısını döner.`,
      },
    ],
    playground: {
      title: "Fonksiyonel Kapsama Simülatörü",
      initialCode: `module tb_cov_play;
  logic [1:0] mode;

  covergroup cg_mode;
    cp_mode: coverpoint mode;
  endgroup

  initial begin
    cg_mode cg = new();
    mode = 2'b00; cg.sample();
    mode = 2'b01; cg.sample();

    $display("Kapsama: %0.2f%%", cg.get_inst_coverage());
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_cov_play.sv...",
        "Kapsama: 50.00%",
      ],
      notes: "Kalan 2 durumu da örnekleyerek kapsamayı %100'e ulaştırmayı deneyin.",
    },
    quiz: {
      question:
        "Kod Kapsaması (Code Coverage) ile Fonksiyonel Kapsama (Functional Coverage) arasındaki en önemli fark nedir?",
      options: [
        "A) Kod kapsaması sadece C++ için kullanılır.",
        "B) Kod kapsaması simülatör tarafından kod satırlarının ve dalların çalışmasını otomatik ölçerken; fonksiyonel kapsama tasarımın istenen spesifikasyon durumlarını yaşayıp yaşamadığını kullanıcının tanımladığı hedeflere göre ölçer.",
        "C) İkisi tamamen aynı metriktir.",
        "D) Fonksiyonel kapsama sentezlenebilir donanım üretir.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Kod kapsaması RTL kodunun satırlarını pasif olarak sayar. Fonksiyonel kapsama ise doğrulama mühendisinin test planında belirlediği spesifik senaryoların ve uç durumların gerçekleşip gerçekleşmediğini ölçer.",
    },
  },

  "coverage-bins-cross": {
    id: "coverage-bins-cross",
    badge: "Modül 8 • Fonksiyonel Kapsama",
    readingTime: "13 dk okuma",
    level: "İleri Seviye",
    title: "Bins Tanımları ve Çapraz Kapsama (cross)",
    subtitle:
      "Açık tanımlı bins, ignore_bins, illegal_bins ve çok boyutlu cross coverage matrisleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste kapsama noktalarını profesyonelce gruplamayı ve parametre kombinasyonlarını ölçmeyi öğreneceksiniz:
- Otomatik Bins (Auto-bins) vs Açık Tanımlı Bins (Explicit Bins).
- Bins aralıkları ve geçiş bins'leri (\`bins t = (0 => 1 => 2)\`).
- Yasaklı ve yoksayılan durumlar: **\`ignore_bins\`** ve **\`illegal_bins\`**.
- **Çapraz Kapsama (Cross Coverage):** İki veya daha fazla sinyalin ortak matris kombinasyonları.
- Kapsama seçenekleri: \`at_least\`, \`weight\` ve \`goal\`.`,
      },
      {
        title: "2. Çapraz Kapsama (Cross Coverage) Matris Mimarisi",
        content: `![SystemVerilog Çapraz Kapsama Bins Mimarisi](/images/systemverilog/systemverilog-cross-coverage-bins.svg)

Bir işlemcide 4 farklı komut türü (\`READ, WRITE, RESET, NOP\`) ve 3 farklı adres bölgesi (\`LOW, MID, HIGH\`) olsun.
Tek başına komutların test edilmesi veya tek başına adreslerin test edilmesi yeterli değildir. Her komutun her adres bölgesinde çalışıp çalışmadığını ölçmek için **\`cross\`** kullanılır ($4 \times 3 = 12$ kombinasyon!).`,
      },
      {
        title: "3. ignore_bins ve illegal_bins",
        content: `* **\`ignore_bins\`**: Ölçüm dışı bırakılmak istenen durumlar (kapsama yüzdesi hesabına katılmaz).
* **\`illegal_bins\`**: Donanımda asla yaşanmaması gereken ölümcül durumlar. Bu bins içine düşen bir örnekleme olduğunda simülatör anında çalışma zamanı ölümcül hatası (\`$fatal\`) fırlatır!`,
      },
      {
        title: "4. ChipVerify Örneği: Komut ve Adres Çapraz Kapsaması",
        content: `Aşağıdaki kodda \`bins\` ve \`cross\` tanımlarını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Açık Bins ve Cross Coverage Örneği",
          snippet: `module tb_cross_cov;
  logic [1:0] cmd;
  logic [7:0] addr;

  covergroup cg_bus;
    cp_cmd: coverpoint cmd {
      bins read_op  = {2'b00};
      bins write_op = {2'b01};
      ignore_bins idle = {2'b10, 2'b11};
    }

    cp_addr: coverpoint addr {
      bins low_addr  = {[0:63]};
      bins high_addr = {[64:255]};
    }

    // 2 x 2 = 4 kombinasyonluk matris
    cx_bus: cross cp_cmd, cp_addr;
  endgroup

  initial begin
    cg_bus cg = new();

    cmd = 2'b00; addr = 10;  cg.sample(); // read @ low
    cmd = 2'b01; addr = 100; cg.sample(); // write @ high

    $display("Cross Kapsama Başarıyla Örnekleniyor: %0.2f%%", cg.cx_bus.get_coverage());
  end
endmodule`,
        },
      },
      {
        title: "5. Hızlı Kontrol & Özet",
        content: `* \`cross\` çok boyutlu durum uzayını eksiksiz test etmeyi garanti eder.
* Donanım ihlallerini yakalamak için \`illegal_bins\` kullanılır.`,
      },
    ],
    playground: {
      title: "Cross Coverage Simülatörü",
      initialCode: `module tb_cross_play;
  bit a, b;

  covergroup cg;
    cp_a: coverpoint a;
    cp_b: coverpoint b;
    cx: cross cp_a, cp_b; // 4 kombinasyon: 00, 01, 10, 11
  endgroup

  initial begin
    cg c = new();
    a = 0; b = 0; c.sample();
    a = 1; b = 1; c.sample();

    $display("Cross Kapsama: %0.2f%%", c.cx.get_coverage());
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_cross_play.sv...",
        "Cross Kapsama: 50.00%",
      ],
      notes: "Kalan 01 ve 10 kombinasyonlarını da ekleyerek kapsamayı %100 yapmayı deneyin.",
    },
    quiz: {
      question:
        "SystemVerilog covergroup içinde 'illegal_bins' tanımlanmış bir duruma simülasyon sırasında denk gelinirse ne gerçekleşir?",
      options: [
        "A) Kapsama yüzdesi %100 olur.",
        "B) Simülatör derleme anında o satırı siler.",
        "C) Simülatör anında çalışma zamanı hatası (Run-time error / violation) vererek simülasyonu uyarır veya durdurur.",
        "D) Durum otomatik ignore_bins'e aktarılır.",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! 'illegal_bins', gerçekleşmesi yasak olan donanım durumlarını yakalar. Bu duruma girildiğinde simülatör kural ihlali hatası üretir.",
    },
  },

  // ==========================================
  // MODÜL 9: İFADELER (SVA - ASSERTIONS)
  // ==========================================
  "immediate-assertions": {
    id: "immediate-assertions",
    badge: "Modül 9 • Doğrulama İfadeleri (SVA)",
    readingTime: "11 dk okuma",
    level: "Orta Seviye",
    title: "Anlık İfadeler (Immediate Assertions)",
    subtitle:
      "Prosedürel bloklar içinde anlık durum doğrulama, assert/assume/cover ve önem derecesi fonksiyonları ($fatal, $error, $warning, $info).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste donanım tasarımında anlık hataları yakalayan Anlık İfadeleri (Immediate Assertions) öğreneceksiniz:
- **Immediate Assertions** nedir ve nerede çalışır?
- Sözdizimi: \`assert (koşul) else $error(...);\`.
- Başarı ve Başarısızlık Eylemleri (Action Blocks).
- Sistem önem derecesi fonksiyonları: **\`$fatal\`**, **\`$error\`**, **\`$warning\`**, **\`$info\`**.
- Simülasyon arızalarını hata anında (sıfır gecikmeyle) yakalamanın gücü.`,
      },
      {
        title: "2. Immediate Assertions Mimarisi",
        content: `![SystemVerilog Anlık İfadeler Mimarisi](/images/systemverilog/sv-immediate-assertions.svg)

Klasik testbench'te bir hata olduğunda simülasyon saatlerce devam eder ve binlerce çevrim sonra bambaşka bir modülde hata patlardı (hatayı kök sebebine kadar takip etmek günler alırdı).
Immediate Assertion ise hatanın oluştuğu **tam o saat vuruşunda** simülasyonu durdurarak saatlerce süren hata ayıklama (debug) zahmetini dakikalara indirir.`,
      },
      {
        title: "3. Önem Derecesi (Severity) Fonksiyonları",
        content: `Bir assertion başarısız olduğunda \`else\` bloğu içinde çağrılabilecek fonksiyonlar:

- **\`$fatal(seviye, "mesaj")\`**: Simülasyonu anında durdurur ve çıkış yapar (kritik ölümcül hata).
- **\`$error("mesaj")\`**: Hata basar; simülasyon devam edebilir ancak test başarısız işaretlenir.
- **\`$warning("mesaj")\`**: Uyarı basar.
- **\`$info("mesaj")\`**: Bilgilendirme notu basar.`,
      },
      {
        title: "4. ChipVerify Örneği: FIFO Giriş Doğrulaması",
        content: `Aşağıdaki kodda FIFO'nun dolu iken yazma yapılmasını engelleyen bir immediate assertion inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "FIFO Taşma Kontrolü ile Immediate Assertion",
          snippet: `module fifo_checker (
  input logic clk,
  input logic wr_en,
  input logic full
);
  always_comb begin
    if (wr_en) begin
      // FIFO doluysa ve yazma gelmişse HATA!
      assert (!full) 
        else $error("[HATA @%0tns] FIFO doluyken yazma denemesi (Overflow)!", $time);
    end
  end
endmodule`,
        },
      },
      {
        title: "5. Hızlı Kontrol & Özet",
        content: `* Immediate assertion prosedürel bloklar içinde anlık olarak değerlendirilir.
* \`else\` bloğu yazılmazsa simülatör varsayılan bir genel hata basar.`,
      },
    ],
    playground: {
      title: "Immediate Assertion Simülatörü",
      initialCode: `module tb_assert_play;
  int a = 10;
  int b = 5;

  initial begin
    // a > b olduğunu doğrula
    assert (a > b) 
      $display("[PASS] a, b'den büyük.");
    else 
      $error("[FAIL] a küçük veya eşit!");

    // Başarısız assertion testi
    b = 20;
    assert (a > b) 
      $display("[PASS] a büyük.");
    else 
      $warning("[UYARI] b artık daha büyük (a=%0d, b=%0d)", a, b);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_assert_play.sv...",
        "[PASS] a, b'den büyük.",
        "[UYARI] b artık daha büyük (a=10, b=20)",
      ],
      notes: "Koşulları değiştirerek assertion'ın nasıl çalıştığını inceleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da bir assertion başarısız olduğunda simülasyonu derhal sonlandırmak için hangi sistem görevi çağrılır?",
      options: [
        "A) $error",
        "B) $warning",
        "C) $fatal",
        "D) $stop",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! $fatal görevi, en yüksek önem derecesidir ve çağrıldığı anda simülasyonu ölümcül hata koduyla sonlandırır.",
    },
  },

  "concurrent-assertions": {
    id: "concurrent-assertions",
    badge: "Modül 9 • Doğrulama İfadeleri (SVA)",
    readingTime: "15 dk okuma",
    level: "İleri Seviye",
    title: "Eşzamanlı İfadeler: property ve sequence",
    subtitle:
      "Zamanla değişen protokol kurallarını (|->, |=>) saat darbeleriyle doğrulama, $rose, $fell, $stable ve zaman gecikmeleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste donanım protokollerini matematiksel kesinlikle doğrulayan eşzamanlı assertion (SVA) mimarisini öğreneceksiniz:
- **Concurrent Assertions** nedir ve neden saat kenarlarına bağlıdır?
- **\`sequence\`** vs **\`property\`** hiyerarşisi.
- Çevrim gecikmesi operatörü: **\`##[min:max]\`**.
- İma Operatörleri: Çakışan ima (**\`|->\`**) vs Çakışmayan ima (**\`|=>\`**).
- Sinyal kenar algılama fonksiyonları: **\`$rose()\`**, **\`$fell()\`**, **\`$stable()\`**, **\`$past()\`**.
- İptal mekanizması: **\`disable iff (reset)\`**.`,
      },
      {
        title: "2. Eşzamanlı Assertion Temel Mimarisi",
        content: `![SystemVerilog Eşzamanlı Assertion Mimarisi](/images/systemverilog/concurrent-assertion.png)

Concurrent assertion'lar zaman içinde yayılan olay dizilerini takip eder (örneğin: "İstek (req) geldiğinde, tam 2 çevrim sonra onay (ack) yükselmelidir").
Yukarıdaki dalga formunda görüldüğü gibi, simülatör her saat kenarında bu kuralı bağımsız bir iş parçacığı olarak denetler.`,
      },
      {
        title: "3. Örnekleme Fonksiyonları: $rose, $fell ve $stable",
        content: `Sinyal geçişlerini yakalamak için yerleşik fonksiyonlar kullanılır:

1. **\`$rose(sig)\`**: Sinyal önceki saat darbesinde 0 iken şimdi 1 oldu mu? (Yükselen kenar)
![assert rose a](/images/systemverilog/assert_rose_a.png)

2. **\`$fell(sig)\`**: Sinyal önceki saat darbesinde 1 iken şimdi 0 oldu mu? (Düşen kenar)
![assert fell a](/images/systemverilog/assert_fell_a.png)

3. **\`$stable(sig)\`**: Sinyal değerini korudu mu? (Değişmedi)
![assert stable a](/images/systemverilog/assert_stable_a.png)

4. **\`assert(a)\`**: Sinyal o anda 1 mi?
![assert a](/images/systemverilog/assert_a.png)`,
      },
      {
        title: "4. İma Operatörleri: |-> vs |=>",
        content: `* **Overlapping Implication (\`|->\`):** Koşul sağlandığı **aynı saat darbesinde** sonuç başlar.
* **Non-Overlapping Implication (\`|=>\`):** Koşul sağlandıktan **bir sonraki saat darbesinde** sonuç başlar (\`|-> ##1\` ile eşdeğerdir).

![Concurrent Assertion A or B](/images/systemverilog/concurrent-assertion-a-or-b.png)
![Concurrent Assertion Not A XNOR B](/images/systemverilog/concurrent-assertion-not-a-xnor-b.png)`,
      },
      {
        title: "5. ChipVerify Örneği: İstek-Onay (Req-Ack) Protokol Kuralı",
        content: `Aşağıdaki kodda endüstride sıkça kullanılan tipik bir protokol assertion'ını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Req-Ack Protokol Property Tanımı",
          snippet: `module bus_protocol_checker (
  input logic clk,
  input logic rst_n,
  input logic req,
  input logic ack
);
  // Kural: Reset yokken, req 1 olduğunda, 1 ila 3 çevrim sonra ack 1 olmalıdır!
  property p_req_ack;
    @(posedge clk) disable iff (!rst_n)
      $rose(req) |-> ##[1:3] $rose(ack);
  endproperty

  assert_req_ack: assert property (p_req_ack)
    else $error("[SVA HATA @%0tns] req geldi ancak 1-3 çevrim içinde ack gelmedi!", $time);
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Concurrent assertion saat sinyaline bağlıdır (\`@(posedge clk)\`).
* \`disable iff (!rst_n)\` ile reset anındaki geçersiz uyarılar bastırılır.`,
      },
    ],
    playground: {
      title: "Concurrent Assertion Simülatörü",
      initialCode: `module tb_sva_sim;
  logic clk = 0;
  logic req = 0;
  logic ack = 0;

  always #5 clk = ~clk;

  // SVA Property
  property p_ack_next;
    @(posedge clk) req |=> ack;
  endproperty

  assert property (p_ack_next) else $error("ack zamanında gelmedi!");

  initial begin
    @(posedge clk); req = 1;
    @(posedge clk); req = 0; ack = 1; // Başarılı!
    @(posedge clk); ack = 0;
    #10;
    $display("Test tamamlandı.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_sva_sim.sv...",
        "Test tamamlandı.",
      ],
      notes: "ack = 1 satırını kaldırarak assertion'ın nasıl hata fırlattığını test edin.",
    },
    quiz: {
      question:
        "SystemVerilog SVA'da 'req |=> ack' ifadesindeki '|=>' (non-overlapping implication) operatörünün anlamı nedir?",
      options: [
        "A) req 1 olduğu aynı çevrimde ack de 1 olmalıdır.",
        "B) req 1 olduğu çevrimden tam 1 saat darbesi sonra ack 1 olmalıdır.",
        "C) ack sinyali req'den önce gelmelidir.",
        "D) req ve ack sinyalleri OR işlemine tabi tutulur.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! '|=>' operatörü, öncül (req) sağlandıktan bir sonraki saat darbesinde ardılın (ack) doğru olması gerektiğini denetler (req |-> ##1 ack ile aynıdır).",
    },
  },
};
