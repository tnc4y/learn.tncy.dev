import { LessonContent } from "./lessonsData";

export const SYSTEMVERILOG_PART4: Record<string, LessonContent> = {
  // ==========================================
  // MODÜL 10: ARAYÜZLER & MODPORTLAR
  // ==========================================
  "interface-modport": {
    id: "interface-modport",
    badge: "Modül 10 • Arayüzler & Modport",
    readingTime: "13 dk okuma",
    level: "Orta Seviye",
    title: "Arayüzler (interface) ve modport Kavramı",
    subtitle:
      "Sinyal karmaşasını sonlandırma, modüler protokol kablolaması, modport master/slave/monitor görünümleri ve dalga formları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste donanım modülleri arasındaki kablo kalabalığını bitiren \`interface\` yapısını öğreneceksiniz:
- Klasik Verilog port listelerinin hantallığı ve pin uyuşmazlığı riskleri.
- **\`interface\`** mimarisi: İlgili tüm protokol sinyallerini tek bir pakette toplama.
- **\`modport\`**: Arayüzü kullanan modüllere özel sinyal yönleri (input/output) tanımlama.
- Master, Slave ve Monitor modport görünümleri.
- Arayüz içine görev (\`task\`) ve fonksiyon (\`function\`) gömme.`,
      },
      {
        title: "2. Klasik Port Bağlantısı vs SystemVerilog Interface",
        content: `Klasik bir bus protokolünde (örneğin AXI, AHB veya SPI) 20-30 adet ayrı kablo bulunur. Bir modülü bağlamak için 30 satır port eşlemesi yapmanız gerekirdi.
SystemVerilog **\`interface\`** ile tüm kablolar tek bir demet halinde toplanır:

![Testbench Interface Örneği](/images/systemverilog/tb-interface-example.png)
![SystemVerilog Interface Mimarisi](/images/systemverilog/tb-interface-sv-example.png)`,
      },
      {
        title: "3. modport ile Sinyal Yönü Güvenliği",
        content: `Aynı arayüz hattını hem Master hem de Slave modülü kullanır; ancak Master için çıkış olan sinyal, Slave için giriştir.
Bu yön ayrımını sağlamak için **\`modport\`** kullanılır:

\`\`\`systemverilog
interface bus_if (input logic clk);
  logic [7:0] addr;
  logic [7:0] data;
  logic       wr_en;
  logic       ready;

  // Master Modülü Görünümü
  modport master (
    output addr, data, wr_en,
    input  ready, clk
  );

  // Slave Modülü Görünümü
  modport slave (
    input  addr, data, wr_en, clk,
    output ready
  );
endinterface
\`\`\``,
        callout: {
          type: "tip",
          title: "Sentez ve Derleme Güvenliği",
          message:
            "modport kullanıldığında, eğer Master modülü yanlışlıkla 'ready' sinyaline değer yazmaya çalışırsa, derleyici anında 'Illegal assignment to input port' hatası verir.",
        },
      },
      {
        title: "4. Modport Tasarım Dalga Formu",
        content: `![Modport Tasarım Dalga Formu](/images/systemverilog/modport-design-example-wave.PNG)

Yukarıdaki simülasyon dalga formunda görüldüğü gibi, Master \`wr_en\` sinyalini sürerken Slave \`ready\` bayrağını kaldırarak handshake işlemini kusursuzca tamamlar.`,
      },
      {
        title: "5. ChipVerify Örneği: Interface ile DUT ve Testbench Bağlantısı",
        content: `Aşağıdaki kodda bir interface'in modül bağlantısını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Interface ve Modport Kullanım Örneği",
          snippet: `// DUT
module mem_slave (bus_if.slave bus);
  logic [7:0] ram [0:255];

  always_ff @(posedge bus.clk) begin
    if (bus.wr_en)
      ram[bus.addr] <= bus.data;
    bus.ready <= 1'b1;
  end
endmodule

// Testbench
module tb_interface_top;
  logic clk = 0;
  always #5 clk = ~clk;

  // Interface örneği
  bus_if intf (clk);

  // DUT örneği (Tek bir port üzerinden 30 sinyali bağlama rahatlığı!)
  mem_slave dut (.bus(intf.slave));

  initial begin
    intf.wr_en = 1;
    intf.addr  = 8'h10;
    intf.data  = 8'hA5;
    @(posedge clk);
    intf.wr_en = 0;
    #10;
    $display("Test Tamamlandı, Hazır Bayrağı: %0b", intf.ready);
    $finish;
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Interface sentezlenebilir donanım arayüzlerinde de serbestçe kullanılır.
* Sinyal yönlerini netleştirmek için daima modport kullanın.`,
      },
    ],
    playground: {
      title: "Interface ve Modport Simülatörü",
      initialCode: `interface simple_if (input logic clk);
  logic [3:0] count;
  modport dut_port (output count, input clk);
endinterface

module counter_mod (simple_if.dut_port bus);
  always_ff @(posedge bus.clk) begin
    bus.count <= bus.count + 1'b1;
  end
endmodule

module tb_intf_sim;
  logic clk = 0;
  always #5 clk = ~clk;

  simple_if bus (clk);
  counter_mod uut (.bus(bus.dut_port));

  initial begin
    bus.count = 4'd0;
    repeat (3) @(posedge clk);
    $display("Son Sayıcı Değeri: %0d", bus.count);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_intf_sim.sv...",
        "Son Sayıcı Değeri: 3",
      ],
      notes: "bus.dut_port modport'u sayesinde sayacın arayüze nasıl sürdüğünü inceleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'modport' kullanmanın tasarım güvenliği açısından sağladığı en temel fayda nedir?",
      options: [
        "A) Arayüzün saat hızını artırır.",
        "B) Modüllerin arayüzdeki sinyalleri yalnızca izin verilen yönde (input, output) kullanmasını zorunlu kılar; ters yönde sürüş denemelerinde derleme hatası verir.",
        "C) Sinyalleri 2-durumlu hale getirir.",
        "D) Modülleri otomatik olarak sentezler.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! modport, sinyal yönlerini denetler. Bir modül input olarak tanımlanmış bir modport pinine değer yazmaya kalkarsa derleyici anında hata verir.",
    },
  },

  "virtual-interface": {
    id: "virtual-interface",
    badge: "Modül 10 • Arayüzler & Modport",
    readingTime: "13 dk okuma",
    level: "İleri Seviye",
    title: "Sanal Arayüzler (virtual interface) & Clocking Block",
    subtitle:
      "OOP tabanlı testbench sınıfları ile fiziksel donanım sinyallerini bağlama, saat blokları ve giriş/çıkış skew gecikmeleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste OOP testbench sınıfları (Driver, Monitor) ile fiziksel donanım arayüzlerini bağlayan köprüyü öğreneceksiniz:
- **Büyük Problem:** Neden bir \`class\` fiziksel bir \`interface\` örneğini doğrudan kapsayamaz?
- **\`virtual interface\`** handle kavramı ve dinamik atama.
- **\`clocking block\`**: Yarış durumlarını tamamen ortadan kaldıran senkronizasyon bloğu.
- Giriş/Çıkış Çarpıklığı (Input Skew / Output Skew): \`default input #1step output #0;\`.
- Çevrim gecikmesi ile senkron veri sürme (\`vif.cb.data <= 8'hFF;\`).`,
      },
      {
        title: "2. Clocking Block ve Skew Mimarisi",
        content: `![Clocking Block Skew Mimarisi](/images/systemverilog/clocking_block_skews_posedge.svg)

Saat kenarında hem DUT'un çıkış üretmesi hem de testbench'in girişleri okumaya çalışması simülatörde yarış durumuna (Race Condition) yol açar.
**Clocking Block**, sinyalleri saat kenarından hemen önce (**#1step** - Preponed) örnekler ve çıkışları saat kenarından sonra sürer. Böylece simülasyonda sıfır yarış durumu garantilenir!`,
      },
      {
        title: "3. Sanal Arayüz (virtual interface) Tanımlama",
        content: `Bir sınıf statik bir donanım teli barındıramaz; ancak o tele işaret eden bir sanal referans (**virtual interface**) tutabilir:

\`\`\`systemverilog
class Driver;
  virtual bus_if.master vif; // Sanal arayüz handle'ı

  function new(virtual bus_if.master vif_handle);
    this.vif = vif_handle;
  endfunction

  task send_data(bit [7:0] d);
    @(vif.cb); // Clocking block saat darbesini bekle
    vif.cb.data <= d;
  endtask
endclass
\`\`\``,
        callout: {
          type: "info",
          title: "UVM Bağlantısı",
          message:
            "Tüm UVM ortamlarında 'uvm_config_db' kullanılarak en üst düzey modülden Driver ve Monitor bileşenlerine tam olarak bu 'virtual interface' referansı aktarılır.",
        },
      },
      {
        title: "4. ChipVerify Örneği: Driver Sınıfı ile Virtual Interface",
        content: `Aşağıdaki kodda bir sınıfın donanım pinlerini sanal arayüzle nasıl sürdüğünü inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Virtual Interface ile Sınıf Üzerinden Donanım Sürme",
          snippet: `interface simple_bus (input logic clk);
  logic [7:0] data;
  clocking cb @(posedge clk);
    default input #1step output #0;
    output data;
  endclocking
endinterface

class SimpleDriver;
  virtual simple_bus vif;
  function new(virtual simple_bus v); this.vif = v; endfunction

  task drive(bit [7:0] val);
    @(vif.cb);
    vif.cb.data <= val;
    $display("[@%0tns] Donanım Hattına 0x%02h Verisi Sürüldü.", $time, val);
  endtask
endclass

module tb_vif_demo;
  logic clk = 0;
  always #5 clk = ~clk;

  simple_bus bus_inst (clk);

  initial begin
    SimpleDriver drv = new(bus_inst);
    drv.drive(8'hA1);
    drv.drive(8'hB2);
    #10;
    $finish;
  end
endmodule`,
        },
      },
      {
        title: "5. Hızlı Kontrol & Özet",
        content: `* Sınıf içinde \`virtual interface\` yazmayı unutursanız derleyici hata verir.
* Clocking block içindeki sinyallere erişirken \`vif.cb.sig\` sözdizimi kullanılır.`,
      },
    ],
    playground: {
      title: "Virtual Interface Simülatörü",
      initialCode: `interface test_if (input logic clk);
  logic [3:0] val;
endinterface

class Monitor;
  virtual test_if vif;
  function new(virtual test_if v); this.vif = v; endfunction
  task sample();
    $display("[Monitor @%0tns] Okunan Değer: %0d", $time, vif.val);
  endtask
endclass

module tb_vif_sim;
  logic clk = 0;
  test_if tif (clk);

  initial begin
    Monitor mon = new(tif);
    tif.val = 4'd9;
    #10;
    mon.sample();
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_vif_sim.sv...",
        "[Monitor @10ns] Okunan Değer: 9",
      ],
      notes: "tif.val değerini değiştirip Monitor'ün sanal arayüzden okumasını inceleyin.",
    },
    quiz: {
      question:
        "SystemVerilog OOP testbench sınıflarında donanım arayüzlerine erişmek için neden doğrudan 'interface' yerine 'virtual interface' kullanılır?",
      options: [
        "A) virtual interface kodun sentezlenmesini sağladığı için.",
        "B) Sınıflar dinamik nesnelerdir ve fiziksel donanım modüllerini doğrudan içeremezler; virtual interface fiziksel arayüze işaret eden bir referans (handle) sağlar.",
        "C) virtual interface sinyalleri terslediği için.",
        "D) Simülasyon hızını artırmak için.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! Sınıflar dinamik bellek nesneleridir. Fiziksel donanım telleriyle etkileşime geçebilmelerinin tek yolu, fiziksel arayüz örneğine işaret eden bir 'virtual interface' handle'ı kullanmaktır.",
    },
  },

  // ==========================================
  // MODÜL 11: İŞ PARÇACIKLARI & IPC
  // ==========================================
  "fork-join": {
    id: "fork-join",
    badge: "Modül 11 • Eşzamanlılık & IPC",
    readingTime: "12 dk okuma",
    level: "Orta Seviye",
    title: "Paralel Süreçler: fork..join, join_any, join_none",
    subtitle:
      "Aynı anda birden fazla donanım sürecini koşturma, join/join_any/join_none modları, disable fork ve wait fork.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog'un çoklu iş parçacığı (multithreading) yönetimini öğreneceksiniz:
- Seri yürütme (\`begin..end\`) vs Paralel yürütme (\`fork..join\`).
- Üç Temel Fork Modu:
  - **\`fork..join\`**: Tüm alt süreçlerin bitmesini bekler.
  - **\`fork..join_any\`**: Alt süreçlerden herhangi biri bittiği anda devam eder.
  - **\`fork..join_none\`**: Alt süreçleri arka planda başlatır ve hiç beklemeden devam eder.
- Arka plan süreçlerini temizleme: **\`disable fork\`** ve **\`wait fork\`**.
- Zaman aşımı (Timeout) mekanizması kurma.`,
      },
      {
        title: "2. Fork-Join Modları Mimarisi",
        content: `![SystemVerilog Fork Join Modları](/images/systemverilog/sv-fork-join-modes.svg)

Donanım doğası gereği tamamen paraleldir. Bir mikroişlemci çalışırken bellekten komut okur, kesmeleri dinler ve saat darbelerini sayar.
Bu paralel donanım aktörlerini testbench içinde simüle etmek için \`fork..join\` blokları kullanılır.`,
      },
      {
        title: "3. Üç Modun Karşılaştırması",
        content: `| Mod | Ana Süreç Ne Zaman Devam Eder? | Tipik Kullanım Alanı |
| :--- | :--- | :--- |
| **\`fork..join\`** | Tüm dallar tamamlandığında | Veri gönderme ve yanıt bekleme adımlarının ikisi de bittiğinde |
| **\`fork..join_any\`** | İlk dal tamamlandığında | **Zaman Aşımı (Timeout)** kontrolleri veya yarışan işlemler |
| **\`fork..join_none\`** | Hemen (hiç beklemeden) | Arka planda sürekli çalışan Monitor veya Saat üreteçleri |`,
      },
      {
        title: "4. Zaman Aşımı (Watchdog Timer) Şablonu",
        content: `Testbench yazarken en sık kullanılan şablon: Bir donanım yanıt vermezse simülasyonun sonsuza kadar asılı kalmasını engellemektir:

\`\`\`systemverilog
fork
  begin
    // Görev 1: Yanıtı bekle
    wait_for_ack();
  end
  begin
    // Görev 2: Zaman aşımı sayacı
    #1000;
    $fatal("HATA: Donanım 1000ns boyunca yanıt vermedi (Timeout)!");
  end
join_any
disable fork; // Kazanan bitti, diğer süreci öldür!
\`\`\``,
        callout: {
          type: "warning",
          title: "disable fork Önemi",
          message:
            "join_any sonrasında 'disable fork' çağrılmazsa, arka planda kalan sayaç çalışmaya devam eder ve ileride yanlışlıkla simülasyonu kapatabilir!",
        },
      },
      {
        title: "5. ChipVerify Örneği: fork join_any Kullanımı",
        content: `Aşağıdaki kodda \`fork..join_any\` ve \`disable fork\` kullanımını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "fork join_any ile Zaman Aşımı Kontrolü",
          snippet: `module tb_fork_demo;
  initial begin
    $display("[@%0tns] Paralel süreçler başlıyor...", $time);

    fork
      begin
        #20;
        $display("[@%0tns] Süreç A (20ns) bitti.", $time);
      end
      begin
        #50;
        $display("[@%0tns] Süreç B (50ns) bitti.", $time);
      end
    join_any

    $display("[@%0tns] İlk süreç tamamlandı! join_any'den çıkıldı.", $time);
    disable fork; // Kalan Süreç B iptal edilir
    #40;
    $display("[@%0tns] Test tamamlandı.", $time);
    $finish;
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Tüm görevleri beklemek için \`join\`.
* Yarışma ve timeout için \`join_any\` + \`disable fork\`.
* Arka plan iş parçacığı başlatmak için \`join_none\`.`,
      },
    ],
    playground: {
      title: "Fork-Join Simülatörü",
      initialCode: `module tb_fork_play;
  initial begin
    $display("Başlangıç Zamanı: %0tns", $time);
    fork
      #10 $display("Dal 1 tamamlandı (@%0tns)", $time);
      #30 $display("Dal 2 tamamlandı (@%0tns)", $time);
    join
    $display("join sonrası devam ediyor (@%0tns)", $time);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_fork_play.sv...",
        "Başlangıç Zamanı: 0ns",
        "Dal 1 tamamlandı (@10ns)",
        "Dal 2 tamamlandı (@30ns)",
        "join sonrası devam ediyor (@30ns)",
      ],
      notes: "join kelimesini join_any yaparak devam etme zamanının nasıl 10ns'e düştüğünü test edin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'fork..join_any' bloğundan sonra arka planda kalan diğer iş parçacıklarını sonlandırmak için hangi komut kullanılır?",
      options: [
        "A) wait fork",
        "B) disable fork",
        "C) kill",
        "D) break",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! 'disable fork' komutu, o anki yürütme kapsamı tarafından başlatılmış ve henüz tamamlanmamış tüm alt iş parçacıklarını derhal iptal eder.",
    },
  },

  "ipc-primitives": {
    id: "ipc-primitives",
    badge: "Modül 11 • Eşzamanlılık & IPC",
    readingTime: "13 dk okuma",
    level: "İleri Seviye",
    title: "Süreçler Arası İletişim: mailbox, semaphore, event",
    subtitle:
      "Thread-safe veri alışverişi, mailbox (put/get/peek), semaphore (kaynak kilitleme) ve event (tetikleme).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste bağımsız çalışan iş parçacıklarının güvenle haberleşmesini sağlayan IPC araçlarını öğreneceksiniz:
- Süreçler Arası İletişim (IPC - Inter-Process Communication) neden gereklidir?
- **\`event\`**: Olay tetikleme (\`->\`), dinleme (\`@\`) ve tetiklenmiş olma kontrolü (\`triggered\`).
- **\`semaphore\`**: Paylaşılan kaynakları kilitleme; anahtar alma (\`get\`) ve bırakma (\`put\`).
- **\`mailbox\`**: İş parçacıkları arasında güvenli veri kuyruğu; \`put()\`, \`get()\`, \`peek()\`.
- Bounded (Sınırlı) vs Unbounded (Sınırsız) mailbox.`,
      },
      {
        title: "2. SystemVerilog IPC Temelleri Mimarisi",
        content: `![SystemVerilog IPC Temelleri Mimarisi](/images/systemverilog/sv-ipc-primitives.svg)

Bir testbench ortamında Generator veri paketi üretirken, Driver o paketi donanım pinlerine aktarır. Generator ile Driver arasındaki veri transferinin güvenli, kilitlenmesiz ve kuyruklu olması gerekir.
SystemVerilog bu iletişimi üç temel ilkel yapı ile çözer.`,
      },
      {
        title: "3. Mailbox (Posta Kutusu) Mimarisi",
        content: `\`mailbox\` iş parçacığı güvenli (thread-safe) bir kuyruktur:
- **\`mbx.put(data)\`**: Kutunun içine veri bırakır. Kutu doluysa bloklar (bekler).
- **\`mbx.get(data)\`**: Kutudan veriyi çeker ve kutudan siler. Kutu boşsa veri gelene kadar bloklar.
- **\`mbx.peek(data)\`**: Kutunun başındaki veriyi silmeden okur.
- **\`try_put()\` / \`try_get()\`**: Bloklamayan alternatifler; işlem anında olmazsa \`0\` döner.

\`\`\`systemverilog
mailbox #(Packet) mbx = new(5); // En fazla 5 paket alabilen sınırlı mailbox
\`\`\``,
      },
      {
        title: "4. Semaphore (Semafor) ile Kaynak Paylaşımı",
        content: `Birden fazla sürücü aynı anda tek bir hafıza portuna yazmak isterse çakışma olur. \`semaphore\` bir anahtarlık gibidir:
\`\`\`systemverilog
semaphore sem = new(1); // 1 adet anahtar içeren semafor (Mutex)

task access_memory();
  sem.get(1); // Anahtarı al (biri kullanıyorsa bekle)
  // Kritik bölge: Belleğe yazma işlemi
  sem.put(1); // Anahtarı geri bırak
endtask
\`\`\``,
      },
      {
        title: "5. ChipVerify Örneği: Generator-Driver Mailbox İletişimi",
        content: `Aşağıdaki kodda tipik bir testbench bileşen haberleşmesini inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Mailbox ile Üretici-Tüketici (Producer-Consumer) Modeli",
          snippet: `module tb_mailbox_demo;
  mailbox #(int) mbx = new();

  // Generator Süreci
  initial begin
    for (int i = 1; i <= 3; i++) begin
      #10;
      mbx.put(i * 100);
      $display("[@%0tns Generator] Paket %0d mailbox'a atıldı.", $time, i * 100);
    end
  end

  // Driver Süreci
  initial begin
    int data;
    repeat (3) begin
      mbx.get(data); // Veri gelene kadar bekler
      $display("[@%0tns Driver] Veri alındı ve işlendi: %0d", $time, data);
    end
    $finish;
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Bileşenler arası paket aktarımı için \`mailbox\` kullanılır.
* Paylaşılan kaynak kilidi için \`semaphore\` kullanılır.
* Anlık bayrak tetiklemeleri için \`event\` kullanılır.`,
      },
    ],
    playground: {
      title: "Mailbox IPC Simülatörü",
      initialCode: `module tb_ipc_play;
  mailbox #(string) comm_box = new();

  initial begin
    fork
      begin
        #5 comm_box.put("Veri Paketi #1");
        #10 comm_box.put("Veri Paketi #2");
      end
      begin
        string msg;
        comm_box.get(msg);
        $display("[@%0tns Alıcı] Alınan: %s", $time, msg);
        comm_box.get(msg);
        $display("[@%0tns Alıcı] Alınan: %s", $time, msg);
      end
    join
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_ipc_play.sv...",
        "[@5ns Alıcı] Alınan: Veri Paketi #1",
        "[@15ns Alıcı] Alınan: Veri Paketi #2",
      ],
      notes: "Alıcının veriyi beklerken nasıl bloklandığını inceleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'mailbox.get(data)' metodu çağrıldığında ve mailbox o anda tamamen boşsa ne gerçekleşir?",
      options: [
        "A) Hata verip simülasyon çöker.",
        "B) Çağıran iş parçacığı (thread), başka bir süreç o mailbox'a 'put' ile veri atana kadar yürütmesini askıya alır (bloklanır).",
        "C) Rastgele bir değer döner.",
        "D) 0 döner ve hemen sonraki satıra geçer.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! mailbox.get() bloklayan bir görevdir (task). Kutu boşsa yeni bir veri gelene kadar çağıran süreci bekletir. Bloklamayan sürümü try_get() dir.",
    },
  },

  // ==========================================
  // MODÜL 12: TESTBENCH MİMARİSİ & GELİŞMİŞ ÖZELLİKLER
  // ==========================================
  "tb-components": {
    id: "tb-components",
    badge: "Modül 12 • Testbench Mimarisi",
    readingTime: "15 dk okuma",
    level: "İleri Seviye",
    title: "Transactor Mimarisi: Generator, Driver, Monitor, Scoreboard",
    subtitle:
      "Modern çip doğrulamada katmanlı testbench mimarisi, transactor sınıfları, UVM altyapısı ve callback entegrasyonu.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste endüstri standardı modüler testbench mimarisini (UVM'in temelini) öğreneceksiniz:
- Neden tek bir devasa testbench modülü yerine katmanlı nesneler kullanılır?
- **Transactor (Dönüştürücü)** sınıflarının görev dağılımı:
  - **Transaction (Paket):** Doğrulanacak veri nesnesi.
  - **Generator:** Kısıtlı rastgele test senaryolarını üreten beyin.
  - **Driver:** Soyut paketleri fiziksel saat/pin sinyallerine çeviren aktör.
  - **Monitor:** Donanım pinlerini pasif dinleyip paketlere dönüştüren gözlemci.
  - **Scoreboard:** Beklenen sonuç ile alınan sonucu karşılaştıran hakem.
  - **Environment & Test:** Tüm bu orkestrayı bir araya getiren çevre.`,
      },
      {
        title: "2. Katmanlı Testbench Mimarisi Şeması",
        content: `![SystemVerilog Katmanlı Testbench Mimarisi](/images/systemverilog/simple-testbench.png)

Yukarıdaki diyagramda görüldüğü gibi, DUT doğrudan test mantığına bağlı değildir. Araya giren Driver ve Monitor bileşenleri fiziksel pin seviyesini soyutlar. Bu sayede donanım arayüzü AXI'den APB'ye değişse bile Generator ve Scoreboard kodunuzu değiştirmek zorunda kalmazsınız!`,
      },
      {
        title: "3. Bileşenlerin Görevleri",
        content: `1. **Generator (Üretici):** İşlem paketlerini (\`Transaction\`) \`randomize()\` ederek üretir ve bir \`mailbox\` içine koyar.
2. **Driver (Sürücü):** Mailbox'tan paketi alır ve \`virtual interface\` üzerinden pinlere saat darbesiyle sürer.
3. **Monitor (İzleyici):** Pinleri dinler, geçerli bir transfer gördüğünde paketi yeniden oluşturur ve Scoreboard'a gönderir.
4. **Scoreboard (Puan Tahtası):** Tasarımın referans modeliyle (Golden Model) gerçek çıktısını karşılaştırır; uyumsuzluk varsa \`$error\` basar.`,
      },
      {
        title: "4. Callback ile Davranış Değiştirme",
        content: `![SystemVerilog Callback Mimarisi](/images/systemverilog/systemverilog-callback.svg)

Bileşenlerin kaynak kodunu değiştirmeden araya hata sokmak veya log basmak için transactor içine callback kancaları yerleştirilir.`,
      },
      {
        title: "5. ChipVerify Örneği: Katmanlı Mimari Şablonu",
        content: `Aşağıdaki kodda Generator, Driver ve Mailbox bağlantısını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Katmanlı Testbench Bileşenleri",
          snippet: `class Transaction;
  rand bit [7:0] data;
endclass

class Generator;
  mailbox #(Transaction) mbx;
  function new(mailbox #(Transaction) m); this.mbx = m; endfunction

  task run();
    Transaction tr = new();
    void'(tr.randomize());
    mbx.put(tr);
    $display("[Generator] Yeni paket mailbox'a bırakıldı.");
  endtask
endclass

class Driver;
  mailbox #(Transaction) mbx;
  function new(mailbox #(Transaction) m); this.mbx = m; endfunction

  task run();
    Transaction tr;
    mbx.get(tr);
    $display("[Driver] Paket alındı ve DUT pinlerine sürüldü: 0x%02h", tr.data);
  endtask
endclass

module tb_layered_top;
  mailbox #(Transaction) mbx = new();
  Generator gen = new(mbx);
  Driver    drv = new(mbx);

  initial begin
    fork
      gen.run();
      drv.run();
    join
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Katmanlı mimari kodun tekrar kullanılabilirliğini (reusability) maksimuma çıkarır.
* UVM (Universal Verification Methodology) bu transactor modelinin endüstri standardı kütüphanesidir.`,
      },
    ],
    playground: {
      title: "Transactor Mimarisi Simülatörü",
      initialCode: `class Packet;
  int id;
endclass

class Env;
  task run();
    $display("Testbench Ortamı Başlatıldı.");
    $display("Generator -> Driver -> Monitor -> Scoreboard zinciri devrede.");
  endtask
endclass

module tb_env_sim;
  initial begin
    Env e = new();
    e.run();
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_env_sim.sv...",
        "Testbench Ortamı Başlatıldı.",
        "Generator -> Driver -> Monitor -> Scoreboard zinciri devrede.",
      ],
      notes: "Bu mimari UVM sınıf hiyerarşisinin temel omurgasını oluşturur.",
    },
    quiz: {
      question:
        "Katmanlı bir SystemVerilog testbench mimarisinde donanımın (DUT) pinlerini dinleyip bu pin seviyesindeki sinyalleri soyut veri paketlerine dönüştüren bileşen hangisidir?",
      options: [
        "A) Generator",
        "B) Monitor",
        "C) Driver",
        "D) Sequencer",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! Monitor (İzleyici), DUT pinlerini pasif olarak gözlemler; transfer gerçekleştiğinde sinyalleri paket nesnesine dönüştürerek Scoreboard ve Coverage bileşenlerine iletir.",
    },
  },

  "dpi-c-packages": {
    id: "dpi-c-packages",
    badge: "Modül 12 • Testbench Mimarisi",
    readingTime: "12 dk okuma",
    level: "İleri Seviye",
    title: "C/C++ Entegrasyonu (DPI-C) ve Paketler (Packages)",
    subtitle:
      "DPI-C (Direct Programming Interface) ile C/C++ fonksiyonlarını doğrudan çağırma, svdpi.h başlığı ve paket (package) yönetimi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog ile C/C++ dünyasını birbirine bağlayan köprüyü öğreneceksiniz:
- Eski hantal PLI / VPI arayüzlerinin zorlukları.
- **DPI-C (Direct Programming Interface)** nedir ve nasıl çalışır?
- C fonksiyonunu içeri aktarma: \`import "DPI-C" function ...\`.
- SystemVerilog fonksiyonunu C'ye dışa aktarma: \`export "DPI-C" function ...\`.
- Tip eşleşmeleri: int, byte, double, string ve açık diziler.
- **\`package\`**: Kodları isim alanlarına (namespace) bölme ve \`import pkg::*;\`.`,
      },
      {
        title: "2. DPI-C Entegrasyon Mimarisi",
        content: `![SystemVerilog DPI-C Entegrasyon Mimarisi](/images/systemverilog/sv-dpi-c-architecture.svg)

Bir çipin yapay zeka hızlandırıcısını veya video sıkıştırma modülünü doğrulamak istediğinizde, matematiksel referans algoritması (Golden Model) genellikle Python veya C/C++ ile yazılmıştır.
SystemVerilog **DPI-C**, bu C algoritmalarını simülatör içinde hiçbir aracı kod yazmadan doğrudan standart bir fonksiyon gibi çağırmanızı sağlar!`,
      },
      {
        title: "3. DPI-C İçe ve Dışa Aktarma Sözdizimi",
        content: `1. **C Fonksiyonunu SystemVerilog'a Çağırma:**
\`\`\`systemverilog
// C prototipi: int c_add(int a, int b);
import "DPI-C" function int c_add(input int a, input int b);

initial begin
  int result = c_add(10, 20); // Doğrudan C kodu çalışır!
end
\`\`\`

2. **SystemVerilog Fonksiyonunu C'den Çağırma:**
\`\`\`systemverilog
export "DPI-C" function sv_display_status;

function void sv_display_status();
  $display("C kodundan SystemVerilog fonksiyonu tetiklendi!");
endfunction
\`\`\``,
      },
      {
        title: "4. Paketler (Packages) ile Kod Düzenleme",
        content: `Ortak \`typedef\`, \`class\` ve \`function\` tanımlarını tüm modüllerin erişebileceği bir kütüphane haline getirmek için **\`package\`** kullanılır:
\`\`\`systemverilog
package my_types_pkg;
  typedef logic [31:0] word_t;
  typedef enum {IDLE, ACTIVE} state_e;
endpackage

module my_module;
  import my_types_pkg::*; // Paketteki her şeyi içeri al
  word_t data;
endmodule
\`\`\``,
      },
      {
        title: "5. ChipVerify Örneği: Paket İçinde Tip Tanımları",
        content: `Aşağıdaki kodda paket kullanımını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "SystemVerilog Package Tanımı ve Import",
          snippet: `package common_pkg;
  parameter VERSION = "2.1";
  typedef struct packed {
    logic [7:0] cmd;
    logic [7:0] addr;
  } header_t;

  function void print_banner();
    $display("=== TESTBENCH SÜRÜMÜ %s ===", VERSION);
  endfunction
endpackage

module tb_pkg_demo;
  import common_pkg::*;

  initial begin
    header_t hdr;
    print_banner();
    hdr.cmd  = 8'h01;
    hdr.addr = 8'hFF;
    $display("Paket Başlığı: cmd=0x%02h, addr=0x%02h", hdr.cmd, hdr.addr);
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* DPI-C C fonksiyonlarını yerel SystemVerilog fonksiyonu gibi çağırır.
* Paketler küresel isim çakışmalarını önler ve modülerliği artırır.`,
      },
    ],
    playground: {
      title: "Paket (Package) Simülatörü",
      initialCode: `package math_pkg;
  function int square(int x);
    return x * x;
  endfunction
endpackage

module tb_math_sim;
  import math_pkg::*;

  initial begin
    $display("5'in Karesi = %0d", square(5));
    $display("12'nin Karesi = %0d", square(12));
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_math_sim.sv...",
        "5'in Karesi = 25",
        "12'nin Karesi = 144",
      ],
      notes: "Paket içindeki fonksiyonların nasıl import edildiğini inceleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da harici bir C fonksiyonunu simülasyona dahil etmek için kullanılan modern ve doğrudan arayüzün adı nedir?",
      options: [
        "A) PLI 1.0",
        "B) VPI",
        "C) DPI-C (Direct Programming Interface)",
        "D) Socket TCP",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! DPI-C (Direct Programming Interface), C ve C++ kodlarını hantal sarmalayıcılar (wrappers) olmadan doğrudan çağırmayı sağlayan modern IEEE 1800 standardıdır.",
    },
  },

  // ==========================================
  // MODÜL 13: MÜLAKAT SORU BANKASI
  // ==========================================
  "interview-prep": {
    id: "interview-prep",
    badge: "Modül 13 • Mülakat Hazırlığı",
    readingTime: "25 dk okuma",
    level: "Orta Seviye",
    title: "En Popüler 30+ SystemVerilog Mülakat Sorusu",
    subtitle:
      "Teknik iş görüşmelerinde sorulan tuzak sorular, kod parçaları, yarış durumları ve detaylı uzman açıklamaları.",
    sections: [
      {
        title: "1. Mülakat Soru Bankasına Genel Bakış",
        content: `Bu kapsamlı mülakat rehberi; Apple, Intel, NVIDIA, AMD, Qualcomm, ARM ve ASELSAN gibi küresel yarı iletken devlerinin **RTL Tasarım** ve **ASIC/FPGA Doğrulama Mühendisi** teknik mülakatlarında en sık sorduğu 30+ soruyu ve püf noktalarını bir araya getirir.`,
      },
      {
        title: "2. Veri Tipleri & RTL Temelleri Mülakat Soruları (Soru 1 - 7)",
        content: `### Soru 1: \`reg\`, \`wire\` ve \`logic\` arasındaki fark nedir?
- **Yanıt:** Klasik Verilog'da \`wire\` sürekli atamalar (\`assign\`), \`reg\` ise prosedürel bloklar (\`always\`) için zorunluydu (\`reg\` donanım flip-flop'u demek değildi). SystemVerilog **\`logic\`** tipini getirerek bu ayrımı kaldırdı. \`logic\` tek bir değişken türüdür, hem \`assign\` hem \`always\` içinde kullanılabilir ve tek sürücü kuralına tabidir. Çift yönlü çoklu sürücülü hatlar için \`wire logic\` kullanılır.

### Soru 2: 2-durumlu (2-state) tipler ile 4-durumlu (4-state) tipler arasındaki fark nedir?
- **Yanıt:** 4-durumlu tipler (\`logic\`, \`integer\`) 0, 1, X, Z değerlerini alabilir ve varsayılan başlangıç değerleri **X**'tir. 2-durumlu tipler (\`bit\`, \`byte\`, \`int\`) yalnızca 0 ve 1 alabilir ve varsayılan başlangıç değerleri **0**'dır. Testbench'lerde 2-durumlu tipler %30-50 daha az bellek ve CPU tüketir.

### Soru 3: \`always_comb\` ile klasik \`always @(*)\` arasındaki fark nedir?
- **Yanıt:**
  1. \`always_comb\` simülasyon başında T=0 anında otomatik 1 kez çalışır; \`always @(*)\` ise giriş sinyalleri değişene kadar beklemede kalır.
  2. \`always_comb\` fonksiyon çağrılarının içindeki sinyalleri de duyarlılık listesine ekler.
  3. Eksik dal bırakıldığında \`always_comb\` derleme anında mandal (latch) uyarısı verir.

### Soru 4: \`byte\` tipi tanımlandığında en sık yapılan hata nedir?
- **Yanıt:** \`byte\` tipi SystemVerilog'da varsayılan olarak **işaretlidir (signed -128 ile +127)**. 8-bit işaretsiz bir veri okumak istediğinizde mutlaka \`byte unsigned\` veya \`bit [7:0]\` tanımlanmalıdır; aksi takdirde işaret genişletme (sign extension) aritmetiği bozar.

### Soru 5: Paketlenmiş (Packed) ve Paketlenmemiş (Unpacked) dizi farkı nedir?
- **Yanıt:** Packed diziler (\`bit [3:0][7:0] p;\`) bellekte bit düzeyinde bitişik tek bir 32-bit vektör olarak saklanır; tek seferde aritmetik işleme girebilir. Unpacked diziler (\`bit [7:0] up [4];\`) bellekte ayrık adreslerde saklanır ve donanımsal RAM bloklarını modellemek için kullanılır.

### Soru 6: \`unique case\` ve \`priority case\` ne işe yarar?
- **Yanıt:** \`unique case\`, durumların örtüşmediğini bildirir ve donanımda paralel MUX üretir; birden fazla dal eşleşirse veya hiçbiri eşleşmezse simülatör ihlal uyarısı verir. \`priority case\` ise öncelikli donanım kodlayıcı üretir.

### Soru 7: \`#0\` gecikmesi ne yapar ve neden önerilmez?
- **Yanıt:** \`#0\`, atamayı o anki simülasyon zaman adımının Inactive bölgesine öteler. Delta döngüsü yarışlarını çözmek için geçici bir yama gibi görünse de, kod karmaşıklaştıkça birden fazla #0 birbiriyle yarışır ve determinizmi yok eder.`,
      },
      {
        title: "3. OOP & Testbench Mimarisi Mülakat Soruları (Soru 8 - 15)",
        content: `### Soru 8: Sığ Kopyalama (Shallow Copy) ile Derin Kopyalama (Deep Copy) farkı nedir?
- **Yanıt:** Shallow copy (\`p2 = new p1;\`) sadece birinci seviye değişkenleri kopyalar; nesnenin içindeki gömülü nesne handle'larını referans olarak paylaşır. Deep copy ise nesnenin içindeki tüm alt nesneleri de özyinelemeli olarak sıfırdan kopyalar.

### Soru 9: Neden bir metoda \`virtual\` ekleriz?
- **Yanıt:** \`virtual\` anahtar kelimesi dinamik bağlama (polimorfizm) sağlar. Temel sınıf handle'ı üzerinden bir alt sınıf nesnesi çağrıldığında, \`virtual\` varsa alt sınıfın ezilmiş (overridden) metodu çalışır; yoksa temel sınıfın metodu çalışır.

### Soru 10: \`$cast\` fonksiyonu ne zaman kullanılır?
- **Yanıt:** Bir üst sınıf (Base) handle'ından bir alt sınıf (Derived) handle'ına güvenli tip dönüşümü (downcasting) yapmak için kullanılır. Uyumsuz türlerde simülasyon çökmez; fonksiyon 0 döner.

### Soru 11: Neden sınıf içinde \`interface\` yerine \`virtual interface\` kullanılır?
- **Yanıt:** Sınıflar dinamik bellek nesneleridir ve fiziksel donanım kablolarını barındıramazlar. Fiziksel bir arayüze bağlanabilmek için arayüze işaret eden bir referans (virtual interface) şarttır.

### Soru 12: \`this\` ve \`super\` anahtar sözcükleri ne işe yarar?
- **Yanıt:** \`this\`, sınıfın kendi geçerli nesne örneğine işaret eder (özellikle kurucu argümanlarıyla üye isimleri çakıştığında kullanılır). \`super\`, türetilmiş sınıftan üst sınıfın kurucusunu veya ezilmiş metodunu çağırmak için kullanılır.

### Soru 13: Statik değişken ve fonksiyonlar nedir?
- **Yanıt:** Bir sınıfta \`static\` olarak tanımlanan değişkenler tüm nesneler arasında tek bir bellek alanını paylaşır. Kaç tane nesne üretildiğini saymak için sayaç olarak kullanılır.

### Soru 14: Soyut sınıf (Abstract Class) ve Saf Sanal Metot (Pure Virtual) nedir?
- **Yanıt:** \`virtual class\` doğrudan \`new()\` ile oluşturulamaz; yalnızca alt sınıflara kalıtım şablonu oluşturur. \`pure virtual function\` ise gövdesi olmayan, alt sınıf tarafından doldurulması zorunlu olan metodlardır.

### Soru 15: Transactor sınıfları nelerdir?
- **Yanıt:** Generator (Paket üretir), Driver (Pinleri sürer), Monitor (Pinleri dinler), Scoreboard (Beklenen ile çıkanı karşılaştırır).`,
      },
      {
        title: "4. Kısıtlı Rastlantısallık (CRV) Soruları (Soru 16 - 22)",
        content: `### Soru 16: \`rand\` ile \`randc\` arasındaki fark nedir?
- **Yanıt:** \`rand\` her seçimde bağımsız rastgele değer üretir (tekrar edebilir). \`randc\` ise olası tüm durum uzayı bitene kadar hiçbir değeri tekrar etmeden döngüsel (cyclic) üretir.

### Soru 17: \`dist\` operatöründeki \`:=\` ile \`:\/\` farkı nedir?
- **Yanıt:** \`:=\` aralıktaki her bir elemana belirtilen ağırlığı tek tek atar. \`:\/\` ise toplam ağırlığı aralıktaki eleman sayısına eşit olarak böler.

### Soru 18: \`solve x before y\` ne işe yarar?
- **Yanıt:** Kısıt çözücünün (solver) değişkenleri çözme olasılık dağılımını değiştirir. Normalde tüm değişkenler ortak çözülürken, \`solve x before y\` önce x'i seçer, ardından x'e bağlı olarak y'nin geçerli durumları arasından seçim yapar.

### Soru 19: \`pre_randomize()\` ve \`post_randomize()\` ne zaman çalışır?
- **Yanıt:** \`pre_randomize()\` kısıt motoru çalışmadan hemen önce; \`post_randomize()\` ise değerler başarıyla üretildikten hemen sonra otomatik tetiklenir.

### Soru 20: Satır içi kısıt (Inline Constraint) nasıl yazılır?
- **Yanıt:** \`pkt.randomize() with { addr == 32'h1000; };\` sözdizimiyle o anki test çağrısına özel geçici kurallar eklenir.

### Soru 21: Bir kısıt nasıl geçici olarak kapatılır?
- **Yanıt:** \`pkt.c_len.constraint_mode(0);\` ile kısıt devre dışı bırakılır; \`1\` ile tekrar açılır.

### Soru 22: \`rand_mode()\` nedir?
- **Yanıt:** Bir değişkenin rastgelelik özelliğini kapatıp açar (\`pkt.addr.rand_mode(0);\`). Kapatıldığında değişken mevcut değerini korur.`,
      },
      {
        title: "5. SVA, Coverage ve IPC Soruları (Soru 23 - 30)",
        content: `### Soru 23: Immediate Assertion ile Concurrent Assertion farkı nedir?
- **Yanıt:** Immediate assertion prosedürel bloklar içinde anlık kombinasyonel mantığı denetler. Concurrent assertion ise saat darbesine bağlı olarak zaman içindeki çok çevrimli protokol kurallarını denetler ve sinyalleri Preponed bölgesinde örnekler.

### Soru 24: SVA'da \`|->\` ile \`|=>\` farkı nedir?
- **Yanıt:** \`|->\` (overlapping) öncülün sağlandığı aynı saat çevriminde sonucu denetler. \`|=>\` (non-overlapping) ise öncül sağlandıktan bir sonraki saat darbesinde sonucu denetler.

### Soru 25: \`$rose\` ve \`$past\` ne yapar?
- **Yanıt:** \`$rose(sig)\` sinyalin 0'dan 1'e yükseldiğini denetler. \`$past(sig, N)\` sinyalin N çevrim önceki değerini döner.

### Soru 26: Kod Kapsaması %100 olduğunda test biter mi?
- **Yanıt:** KESİNLİKLE HAYIR! Kod kapsaması sadece satırların çalıştığını gösterir; doğru çalıştığını veya eksik bir donanım spesifikasyonunun varlığını gösteremez. %100 Fonksiyonel Kapsama da şarttır.

### Soru 27: \`cross\` coverage nedir?
- **Yanıt:** İki veya daha fazla coverpoint'in kartezyen çarpım matrisidir. Tüm kombinasyonların birlikte test edildiğini garanti eder.

### Soru 28: \`fork..join\`, \`join_any\` ve \`join_none\` farkı nedir?
- **Yanıt:** \`join\` tüm alt iş parçacıklarının bitmesini bekler. \`join_any\` ilk biten alt iş parçacığında devam eder. \`join_none\` hiç beklemeden anında devam eder.

### Soru 29: \`mailbox\` ile \`queue\` farkı nedir?
- **Yanıt:** Queue yerleşik bir dizi yapısıdır ve thread-safe değildir; \`new()\` gerektirmez. Mailbox ise bir IPC sınıfıdır; dahili semafor mekanizmasıyla iş parçacığı güvenlidir (thread-safe) ve boşken \`get()\` çağrıldığında işlemi bloklar.

### Soru 30: \`semaphore\` ne zaman kullanılır?
- **Yanıt:** Paylaşılan bir donanım kaynağına (örneğin tek bir hafıza portuna) aynı anda birden fazla sürücünün erişmesini engellemek (karşılıklı dışlama / mutex) için kullanılır.`,
      },
      {
        title: "6. Mülakat Başarısı İçin Altın Tavsiyeler",
        content: `1. **RTL mi Testbench mi?** Size sorulan bir soruya yanıt verirken özelliğin sentezlenebilir RTL mi yoksa simülasyon testbench yapısı mı olduğunu mutlaka belirtin.
2. **Yarış Durumlarına Hakim Olun:** \`<=\` ve \`=\` ayrımı, olay bölgeleri ve clocking block kavramları mülakatçıların en sevdiği eleme sorularıdır.
3. **Kapsama Felsefesini Vurgulayın:** "Bir test ne zaman biter?" sorusuna sadece "Hata çıkmadığında" demeyin; %100 Kod Kapsaması ve %100 Fonksiyonel Kapsama hedeflerinin tutturulması gerektiğini açıklayın.`,
      },
    ],
  },
};
