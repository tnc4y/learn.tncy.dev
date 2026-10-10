import { LessonContent } from "./lessonsData";

export const UVM_PART4: Record<string, LessonContent> = {
  "uvm-using-get-next-item": {
    id: "uvm-using-get-next-item",
    badge: "Modül 12 • Sürücü-Dizici Etkileşimi ve İşlemler",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Sürücü-Dizici El Sıkışması: get_next_item() ve item_done() Mekanizması",
    subtitle: "uvm_driver ve uvm_sequencer arasındaki standart TLM el sıkışma protokolü, get_next_item() çağrısı ve item_done() ile işlem tamamlama akışı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/driver-sequencer-put-get-testbench.png)
![UVM Mimari Şeması](/images/uvm/driver-sequencer-get-next-item-flow.png)`,
      },
      {
        title: "1. Sürücü Tarafında get_next_item() Metodunun Çalışma Mantığı",
        content: `UVM mimarisinde sürücü (\`uvm_driver\`), tasarım arayüzüne (DUT) uygulayacağı işlem paketlerini (sequence item) diziciden (\`uvm_sequencer\`) talep eder. Bu talep genellikle sürücünün önceden tanımlanmış \`seq_item_port\` adlı TLM (Transaction Level Modeling) portu üzerinden gerçekleştirilir.

Sürücü \`seq_item_port.get_next_item(req)\` metodunu çağırdığında şu adımlar gerçekleşir:
- Bu çağrı bloklayıcı (blocking) bir görevdir. Dizici kuyruğunda hazır bir işlem öğesi yoksa sürücünün çalışması burada bekler.
- Dizicide bekleyen veya o anda çalışan bir \`uvm_sequence\` tarafından bir öğe sunulduğunda, dizici bu nesneyi kuyruktan çeker ve \`req\` parametresine bağlar.
- Önemli bir kural olarak, \`get_next_item()\` çağrısı işlemi dizicinin dahili kuyruğundan kalıcı olarak kaldırmaz; el sıkışmayı açık bırakır. Sürücü veriyi pin seviyesinde sürmeyi tamamladığında, mutlaka \`seq_item_port.item_done()\` metodunu çağırarak diziciye işlemin başarıyla bittiğini bildirmelidir.`,
      },
      {
        title: "2. Dizici ve Dizi (Sequence) Tarafındaki İşleyiş",
        content: `Dizici işlem öğelerini gökten zembille indirmez; bu öğeler dizicinin üzerinde koşturulan \`uvm_sequence\` nesneleri tarafından üretilir. Tipik bir dizi sınıfı içerisinde akış şu şekildedir:

\`\`\`systemverilog
class my_sequence extends uvm_sequence #(my_data);
  \`uvm_object_utils(my_sequence)

  virtual task body();
    my_data tx;
    // 1. Fabrika (factory) üzerinden işlem nesnesi oluşturulur
    tx = my_data::type_id::create("tx");

    // 2. start_item() çağrısı ile diziciden sürücüye erişim izni istenir (arbitrasyon)
    \`uvm_info("SEQ", "start_item çağrılıyor", UVM_MEDIUM)
    start_item(tx);

    // 3. Geç Rastgeleleştirme (Late Randomization):
    // Sürücü öğeyi kabul etmeye hazır olduğu anda nesne rastgeleleştirilir
    tx.randomize();
    \`uvm_info("SEQ", $sformatf("tx rastgeleleştirildi: addr=0x%0h data=0x%0h", tx.addr, tx.data), UVM_MEDIUM)

    // 4. finish_item() çağrısı işlemi sürücüye iletir ve sürücünün item_done() demesini bekler
    finish_item(tx);
    \`uvm_info("SEQ", "finish_item tamamlandı, işlem bitti", UVM_MEDIUM)
  endtask
endclass
\`\`\`

Bu mekanizmada **Geç Rastgeleleştirme (Late Randomization)** büyük avantaj sağlar: İşlem paketi önceden rastgeleleştirilip bayatlamaz; tam sürücünün pinleri süreceği simülasyon anındaki güncel testbench durumuna ve kısıtlarına göre değer alır.`,
      },
      {
        title: "3. Örnek Testbench Yapısı ve TLM Port Bağlantıları",
        content: `Sürücü ile dizici arasındaki iletişimi sağlamak için bir UVM ajanının (\`uvm_agent\`) \`connect_phase\` aşamasında TLM portları birbirine bağlanır:

\`\`\`systemverilog
virtual function void connect_phase(uvm_phase phase);
  super.connect_phase(phase);
  if (get_is_active() == UVM_ACTIVE) begin
    // Sürücünün seq_item_port'u dizicinin seq_item_export'una bağlanır
    driver.seq_item_port.connect(sequencer.seq_item_export);
  end
endfunction
\`\`\`

Bu tek satırlık TLM bağlantısı sayesinde sürücü ve dizici nesneleri birbirlerinin dahili uygulamalarından tamamen bağımsız (loose coupling) hale gelir.`,
      },
      {
        title: "4. İşlem Nesnesinin Tanımlanması: my_data Sınıfı",
        content: `Dizici ile sürücü arasında taşınacak veri paketini temsil eden işlem sınıfı \`uvm_sequence_item\` temel sınıfından türetilmelidir:

\`\`\`systemverilog
class my_data extends uvm_sequence_item;
  // Protokol alanları rand olarak tanımlanır
  rand bit [7:0] addr;
  rand bit [7:0] data;

  // Fabrika kaydı ve alan otomasyon makroları
  \`uvm_object_utils_begin(my_data)
    \`uvm_field_int(addr, UVM_DEFAULT)
    \`uvm_field_int(data, UVM_DEFAULT)
  \`uvm_object_utils_end

  function new(string name = "my_data");
    super.new(name);
  endfunction
endclass
\`\`\`

\`uvm_sequence_item\` sınıfı, dizici-sürücü el sıkışma kimliklerini (\`sequence_id\`, \`transaction_id\`) ve UVM fabrika altyapısını dahili olarak destekler.`,
      },
      {
        title: "5. Sürücü Sınıfının Geliştirilmesi: my_driver",
        content: `Sürücü sınıfı \`uvm_driver #(my_data)\` şablonundan türetilir. \`run_phase\` içerisinde sonsuz bir döngüde \`get_next_item\` ve \`item_done\` çifti kullanılır:

\`\`\`systemverilog
class my_driver extends uvm_driver #(my_data);
  \`uvm_component_utils(my_driver)

  virtual dut_if vif; // Sanal arayüz referansı

  function new(string name = "my_driver", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual task run_phase(uvm_phase phase);
    super.run_phase(phase);
    forever begin
      \`uvm_info("DRIVER", "Diziciden yeni işlem öğesi bekleniyor...", UVM_MEDIUM)
      // 1. Diziciden sıradaki işlem çekilir (bloklayıcı çağrı)
      seq_item_port.get_next_item(req);

      // 2. İşlem verisi DUT arayüzüne sürülür (örneğin 20ns simülasyon süresi)
      \`uvm_info("DRIVER", $sformatf("İşlem sürülüyor: addr=0x%0h data=0x%0h", req.addr, req.data), UVM_MEDIUM)
      #20;

      // 3. Sürüş tamamlandığında diziciye el sıkışmanın bittiği bildirilir
      \`uvm_info("DRIVER", "İşlem sürüşü tamamlandı, item_done() çağrılıyor", UVM_MEDIUM)
      seq_item_port.item_done();
    end
  endtask
endclass
\`\`\`

\`item_done()\` çağrılmadığı sürece dizici tarafındaki \`finish_item()\` görevi sonlanamaz ve bir sonraki öğe asla üretilemez. Bu nedenle her \`get_next_item()\` için tam olarak bir \`item_done()\` çağrısı şarttır.`,
      },
      {
        title: "6. Dizi Mimarisi ve Yaşam Döngüsü Özeti",
        content: `Özetle \`get_next_item()\` ve \`item_done()\` el sıkışma mekanizması şu adımlarla çalışır:
1. Dizi: \`start_item(tx)\` çağırarak dizici arbitrasyonuna girer.
2. Sürücü: \`seq_item_port.get_next_item(req)\` çağırarak bekler.
3. Dizici: Sürücü hazır olduğunda dizinin arbitrasyonunu çözer ve \`start_item\` geri döner.
4. Dizi: \`tx.randomize()\` ile geç rastgeleleştirmeyi tamamlar ve \`finish_item(tx)\` çağırır.
5. Sürücü: \`req\` üzerinden veriyi alır, donanım pinlerini sürer.
6. Sürücü: Sürüş bitince \`seq_item_port.item_done()\` çağırır.
7. Dizici: Dizi tarafındaki \`finish_item()\` blokajını kaldırır ve dizi bir sonraki döngüsüne geçer.

Bu disiplinli akış, donanım doğrulamada yarış durumlarını (race condition) engeller ve senkronizasyonu kusursuz kılar.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Sürücü-Dizici El Sıkışması: get_next_item() ve item_done() Mekanizması** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-using-get-next-item.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class my_driver extends uvm_driver #(my_data);
	\`uvm_component_utils (my_driver)
	
   virtual task run_phase(uvm_phase phase);
      super.run_phase(phase);
      
      // 1. This task will get an item from the sequencer using get_next_item()
      \`uvm_info ("DRIVER", $sformatf ("Waiting for data from sequencer"), UVM_MEDIUM)
      seq_item_port.get_next_item(req);
      
      // 2. For simplicity, lets just assume the driver drives the received packet
      // during this time and consumes 20ns to complete driving the transaction
      \`uvm_info ("DRIVER", $sformatf ("Start driving tx addr=0x%0h data=0x%0h", req.addr, req.data), UVM_MEDIUM)
      #20;
      
      // 3. After driver has finished the transaction, it has to let the sequencer know
      // by calling item_done()
      \`uvm_info ("DRIVER", $sformatf ("Finish driving tx addr=0x%0h data=0x%0h", req.addr, req.data), UVM_MEDIUM)
      seq_item_port.item_done();
   endtask`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Sürücü-Dizici El Sıkışması: get_next_item() ve item_done() Mekanizması",
      initialCode: `class my_driver extends uvm_driver #(my_data);
	\`uvm_component_utils (my_driver)
	
   virtual task run_phase(uvm_phase phase);
      super.run_phase(phase);
      
      // 1. This task will get an item from the sequencer using get_next_item()
      \`uvm_info ("DRIVER", $sformatf ("Waiting for data from sequencer"), UVM_MEDIUM)
      seq_item_port.get_next_item(req);
      
      // 2. For simplicity, lets just assume the driver drives the received packet
      // during this time and consumes 20ns to complete driving the transaction
      \`uvm_info ("DRIVER", $sformatf ("Start driving tx addr=0x%0h data=0x%0h", req.addr, req.data), UVM_MEDIUM)
      #20;
      
      // 3. After driver has finished the transaction, it has to let the sequencer know
      // by calling item_done()
      \`uvm_info ("DRIVER", $sformatf ("Finish driving tx addr=0x%0h data=0x%0h", req.addr, req.data), UVM_MEDIUM)
      seq_item_port.item_done();
   endtask`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Sürücü-Dizici El Sıkışması: get_next_item() ve item_done() Mekanizması doğrulaması başarıyla tamamlandı.",
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
      question: "UVM sürücü sınıfında `seq_item_port.get_next_item(req)` çağrıldıktan sonra `item_done()` çağrılmazsa simülasyonda ne gerçekleşir?",
      options: ["Simülasyon anında ölümcül (fatal) derleme hatası vererek durur.", "Dizi (sequence) tarafındaki `finish_item()` görevi bloke kalır ve yeni bir işlem öğesi gönderilemez (kilitlenme).", "Dizici otomatik olarak işlemi bitmiş sayar ve sonraki öğeyi derhal gönderir.", "Sürücü otomatik olarak `uvm_tlm_fifo` içine yeni bir kopya bırakır."],
      correctIndex: 1,
      explanation: "`get_next_item()` çağrısı dizici-sürücü el sıkışmasını başlatır. Dizi tarafındaki `finish_item()` görevi, sürücü `item_done()` çağırana kadar bloke bekler. Eğer sürücü `item_done()` çağırmayı unutursa el sıkışma tamamlanamaz ve dizi yeni işlem öğesi üretemeyerek simülasyon kilitlenir (hang).",
    },
  },
  "uvm-transaction-object": {
    id: "uvm-transaction-object",
    badge: "Modül 12 • Sürücü-Dizici Etkileşimi ve İşlemler",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM İşlem Nesnesi (Transaction Object) ve Veri Modelleme Mimarisi",
    subtitle: "Donanım doğrulamasında soyut veri paketlerinin modellenmesi, uvm_sequence_item sınıf hiyerarşisi, kısıtlı rastgelelik ve temel veri operasyonları.",
    sections: [
      {
        title: "1. UVM İşlem Nesnesi (Transaction Object) Nedir ve Neden Gereklidir?",
        content: `Geleneksel Verilog testbench'lerinde donanım sinyalleri tek tek saat vuruşlarında pin seviyesinde (pin-level) sürülür ve izlenir. Bu yaklaşım karmaşık protokoller (AXI, PCIe, Ethernet, USB) için sürdürülemezdir.

**İşlem Nesnesi (Transaction Object)**, zamana yayılan bu pin seviyesi sinyal hareketlerini mantıksal, soyut bir veri paketine dönüştürür. Örneğin 100 saat vuruşu süren bir AXI yazma patlaması (burst), testbench dünyasında tek bir nesne olarak modellenir: adres (\`addr\`), veri dizisi (\`data[]\`), patlama uzunluğu (\`burst_len\`) ve yanıt kodu (\`resp\`). Bu soyutlama sayesinde diziler (sequences), skor tahtaları (scoreboards) ve kapsama modelleri karmaşık pin zamanlamalarından izole edilir.`,
      },
      {
        title: "2. uvm_transaction ile uvm_sequence_item Arasındaki Temel Farklar",
        content: `UVM sınıf hiyerarşisinde işlem nesneleri şu şekilde türetilir:
\`uvm_void\` -> \`uvm_object\` -> \`uvm_transaction\` -> \`uvm_sequence_item\`

- \`uvm_transaction\`: Temel zamanlama ve simülatör işlem kaydı (transaction recording) yeteneklerine sahiptir; ancak dizici-sürücü el sıkışmasını veya dizi hiyerarşisini desteklemez. IEEE 1800.2 UVM standardında kullanıcı işlemlerinin doğrudan \`uvm_transaction\` sınıfından türetilmesi **kullanımdan kaldırılmıştır (deprecated)**.
- \`uvm_sequence_item\`: Doğrudan \`uvm_transaction\` sınıfından türer ve dizici etkileşimi için gerekli tüm altyapıyı (\`set_sequencer\`, \`get_sequence_id\`, \`set_transaction_id\`) bünyesinde barındırır. Modern UVM testbench'lerinde tüm işlem sınıfları istisnasız \`uvm_sequence_item\` sınıfından türetilmelidir.`,
      },
      {
        title: "3. Protokol Alanlarının Tanımlanması ve rand Niteleyicisi",
        content: `Bir işlem sınıfı tasarlanırken protokolü tanımlayan tüm parametreler sınıf üyesi olarak tanımlanır. Kısıtlı Rastgele Doğrulama (CRV - Constrained Random Verification) gücünden faydalanabilmek için değişkenler \`rand\` olarak bildirilmelidir:

\`\`\`systemverilog
class packet_item extends uvm_sequence_item;
  rand bit [31:0] src_addr;
  rand bit [31:0] dst_addr;
  rand bit [7:0]  payload[];
  rand bit [15:0] length;
  rand bit        is_error;

  // Varsayılan kısıtlar (soft constraints)
  constraint c_len {
    soft length inside {[64:1518]};
    payload.size() == length;
  }
  constraint c_err {
    soft is_error dist { 0 := 95, 1 := 5 }; // %5 hata senaryosu
  }
  // ...
endclass
\`\`\`

Kısıtların \`soft\` olarak tanımlanması, üst seviye dizilerin bu kuralları sınıf kodunu değiştirmeden ezebilmesini (inline constraint) sağlar.`,
      },
      {
        title: "4. Otomasyon Makroları (`uvm_field_*`) ve do_* Kancaları Karşılaştırması",
        content: `UVM'de işlem nesnelerinin kopyalanması (\`copy\`), karşılaştırılması (\`compare\`), yazdırılması (\`print\`) ve bayt dizisine dönüştürülmesi (\`pack/unpack\`) gerekir. Bunun için iki farklı yöntem mevcuttur:

1. **Alan Otomasyon Makroları (\`uvm_field_*\`)**: \`uvm_object_utils_begin\` ve \`uvm_object_utils_end\` blokları arasına yazılır. Kod yazımını hızlandırır; ancak arka planda yoğun çalışma zamanı ek yükü (runtime overhead) ve bellek tüketimi oluşturur.
2. **Kullanıcı Tanımlı \`do_*\` Metotları (\`do_copy\`, \`do_compare\`, \`do_print\`, \`do_pack\`)**: UVM temel sınıfındaki sanal metotların doğrudan ezilmesidir (override). Makrolara kıyasla çok daha hızlıdır, tip güvenliği (type safety) sağlar ve endüstriyel VIP (Verification IP) projelerinde kesinlikle tercih edilen yöntemdir.`,
      },
      {
        title: "5. Temel İşlem Metotlarının Uygulanması: do_copy, do_compare ve do_print",
        content: `Yüksek performanslı bir işlem nesnesi için \`do_*\` kancalarının nasıl uygulandığını inceleyelim:

\`\`\`systemverilog
class axi_item extends uvm_sequence_item;
  \`uvm_object_utils(axi_item) // Alan makroları yerine basit nesne kaydı

  rand bit [31:0] addr;
  rand bit [31:0] data;

  function void do_copy(uvm_object rhs);
    axi_item rhs_;
    super.do_copy(rhs);
    if (!$cast(rhs_, rhs)) begin
      \`uvm_fatal("CAST_ERR", "do_copy cast başarısız!")
    end
    this.addr = rhs_.addr;
    this.data = rhs_.data;
  endfunction

  function bit do_compare(uvm_object rhs, uvm_comparer comparer);
    axi_item rhs_;
    if (!$cast(rhs_, rhs)) return 0;
    return (super.do_compare(rhs, comparer) &&
            (this.addr == rhs_.addr) &&
            (this.data == rhs_.data));
  endfunction

  function string convert2str();
    return $sformatf("addr=0x%08h data=0x%08h", addr, data);
  endfunction
endclass
\`\`\`

Bu yaklaşım skor tahtası (scoreboard) karşılaştırmalarında simülatör hızını katbekat artırır.`,
      },
      {
        title: "6. Endüstri Standardı İşlem Nesnesi En İyi Uygulamaları",
        content: `Profesyonel bir UVM doğrulama ortamında işlem nesneleri geliştirirken şu ilkelere sadık kalınmalıdır:
- **Daima \`uvm_sequence_item\` türetmesi kullanın:** Asla ham \`uvm_object\` veya \`uvm_transaction\` türetmeyin.
- **Sabit değerleri kodun içine gömmeyin (No hardcoding):** Her protokol parametresini \`rand\` değişken yapın ve varsayılan davranışları \`soft\` kısıtlarla belirleyin.
- **\`convert2str()\` metodunu tanımlayın:** \`$sformatf\` ile hızlı string dönüşümü sağlamak, \`print()\` ve loglama çağrılarında büyük bellek ve CPU tasarrufu sağlar.
- **Hafif (Lightweight) tasarım:** İşlem nesneleri simülasyonda milyonlarca kez oluşturulup yok edilir; bu sınıfların içine ağır veri yapıları veya fonksiyonlar koymaktan kaçının.`,
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM İşlem Nesnesi (Transaction Object) ve Veri Modelleme Mimarisi",
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
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM İşlem Nesnesi (Transaction Object) ve Veri Modelleme Mimarisi doğrulaması başarıyla tamamlandı.",
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
      question: "IEEE 1800.2 UVM standardına göre, kullanıcı tanımlı bir testbench işlem nesnesi (transaction) neden doğrudan `uvm_transaction` yerine `uvm_sequence_item` sınıfından türetilmelidir?",
      options: ["`uvm_transaction` sınıfı SystemVerilog arayüzleri (interfaces) ile doğrudan fiziksel pin bağlantısı kuramaz.", "`uvm_sequence_item`, dizici-sürücü el sıkışması (`start_item`/`finish_item`) ve dizi kimlik yönetimi altyapısını içerir; `uvm_transaction` kullanımı ise kullanımdan kaldırılmıştır (deprecated).", "`uvm_transaction` sınıfı nesne yönelimli programlamada `randomize()` metodunu desteklemez.", "`uvm_sequence_item` sınıfı fazlama (phasing) mekanizmasına sahip bir `uvm_component` türevidir."],
      correctIndex: 1,
      explanation: "UVM'de `uvm_transaction` sınıfı artık doğrudan türetme için tavsiye edilmemekte (deprecated) olup, dizici-sürücü el sıkışması, arbitrasyon ve dizi hiyerarşisi desteğine sahip olan sınıf `uvm_sequence_item`'dır.",
    },
  },
  "driver-using-get-and-put": {
    id: "driver-using-get-and-put",
    badge: "Modül 12 • Sürücü-Dizici Etkileşimi ve İşlemler",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Sürücü-Dizici Çift Yönlü İletişimi: get() ve put() ile Yanıt (Response) Yönetimi",
    subtitle: "Sürücünün get() ile veri alıp put() ile yanıt döndürdüğü çift yönlü TLM mekanizması ve get_response() senkronizasyonu.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/driver-sequencer-put-get-testbench.png)
![UVM Mimari Şeması](/images/uvm/driver-sequencer-get-put-flow.png)`,
      },
      {
        title: "1. Sürücüde get() ve put() Çağrılarının Temel Mantığı",
        content: `\`get_next_item()\` / \`item_done()\` modelinde sürücü yalnızca işlem nesnesini tüketir ve tek yönlü el sıkışma yapar. Ancak bir işlem sonucunda DUT'den okunan verinin veya bir hata durum kodunun doğrudan diziyi üreten \`uvm_sequence\` nesnesine geri iletilmesi gerektiğinde **çift yönlü iletişim (two-way communication)** gerekir.

Bu senaryoda sürücü \`seq_item_port.get(req)\` ve ardından \`seq_item_port.put(rsp)\` metotlarını kullanır:
- \`get(req)\`: Bloklayıcı bir çağrıdır; diziciden bir sonraki işlem nesnesini çeker ve işlemi dizici kuyruğundan o anda tamamlayarak tüketir.
- \`put(rsp)\` / \`put(req)\`: Donanım arayüzünden toplanan yanıt verisini (örneğin okunan veri \`rdata\`) diziciye geri gönderir. Dizici bu yanıt nesnesini ilgili dizinin yanıt kuyruğuna yerleştirir.`,
      },
      {
        title: "2. Dizi Tarafında Yanıt Senkronizasyonu: get_response()",
        content: `Dizi tarafında \`finish_item()\` çağrısı yalnızca sürücünün işlemi devraldığını doğrular; sürücünün donanım pinlerini sürmeyi bitirdiğini veya DUT yanıtını ürettiğini garanti etmez.

Bu nedenle dizi, sürücünün üreteceği yanıtı beklemek için \`get_response(rsp)\` metodunu çağırır:

\`\`\`systemverilog
virtual task body();
  my_data tx = my_data::type_id::create("tx");
  start_item(tx);
  tx.randomize();
  finish_item(tx); // Sürücü get() ile nesneyi alır almaz finish_item döner

  // Sürücü put() çağırıp yanıtı iletene kadar dizi burada bloklanır:
  get_response(tx);
  \`uvm_info("SEQ", $sformatf("DUT yanıtı alındı: addr=0x%0h data=0x%0h", tx.addr, tx.data), UVM_MEDIUM)
endtask
\`\`\`

Bu sayede dizi, okunan veriye göre bir sonraki adımda göndereceği işlemi dinamik olarak kararlaştırabilir (örneğin kayıtçı okuma-yazma kontrolleri).`,
      },
      {
        title: "3. Sürücü ve Dizici Arasında Çift Yönlü El Sıkışma Mimarisi",
        content: `Dizici bünyesinde her dizi için ayrı bir yanıt kuyruğu (\`response FIFO\`) bulunur. Sürücü birden fazla işlem için paralel veya ardışık \`put()\` yapabilir.

Yanıtın doğru diziye ulaşabilmesi için yanıt nesnesinin \`transaction_id\` ve \`sequence_id\` değerleri orijinal talep nesnesiyle (\`req\`) eşleşmelidir. Sürücüde aynı \`req\` nesnesi üzerinde veriyi güncelleyip \`put(req)\` çağırmak veya yeni bir \`rsp\` nesnesi oluşturup \`rsp.set_id_info(req)\` çağrısı yapmak bu eşleşmeyi garanti eder.`,
      },
      {
        title: "4. İşlem Öğesi Tanımı: my_data Sınıfı",
        content: `Çift yönlü haberleşmede kullanılan işlem öğesi hem talep (request) hem de yanıt (response) alanlarını içerebilir:

\`\`\`systemverilog
class my_data extends uvm_sequence_item;
  rand bit [7:0] addr; // Sürülecek adres (Talep)
  rand bit [7:0] data; // Sürülecek veri (Yazma) veya DUT yanıtı (Okuma)

  \`uvm_object_utils_begin(my_data)
    \`uvm_field_int(addr, UVM_DEFAULT)
    \`uvm_field_int(data, UVM_DEFAULT)
  \`uvm_object_utils_end

  function new(string name = "my_data");
    super.new(name);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. Parametrik Sürücü Uygulaması: my_driver Sınıfı",
        content: `Sürücü \`uvm_driver #(my_data)\` sınıfından türetilir. \`run_phase\` döngüsünde \`get()\` ve \`put()\` çağrıları ardışık olarak koşturulur:

\`\`\`systemverilog
class my_driver extends uvm_driver #(my_data);
  \`uvm_component_utils(my_driver)

  function new(string name = "my_driver", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual task run_phase(uvm_phase phase);
    super.run_phase(phase);
    forever begin
      \`uvm_info("DRIVER", "Diziciden veri bekleniyor (get)...", UVM_MEDIUM)
      // 1. İşlem öğesi çekilir
      seq_item_port.get(req);

      \`uvm_info("DRIVER", $sformatf("Sürüş başlatıldı: addr=0x%0h data=0x%0h", req.addr, req.data), UVM_MEDIUM)
      #20; // Sinyal sürüş süresi (örnek 20ns)

      // 2. DUT'den okunan verinin döndüğünü simüle edelim (örnek 8'hAA)
      req.data = 8'hAA;

      // 3. Yanıt nesnesi put() ile diziciye geri iletilir
      \`uvm_info("DRIVER", $sformatf("put() çağrılıyor: yeni data=0x%0h", req.data), UVM_MEDIUM)
      seq_item_port.put(req);
      \`uvm_info("DRIVER", "Sürüş ve yanıt tamamlandı", UVM_MEDIUM)
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "6. get/put Mekanizması ile get_next_item/item_done Karşılaştırması",
        content: `| Özellik | get_next_item() + item_done() | get() + put() |
| :--- | :--- | :--- |
| **Haberleşme Yönü** | Tek yönlü (veya opsiyonel \`item_done(rsp)\`) | Çift yönlü doğal akış |
| **finish_item Blokajı** | \`item_done()\` çağrılana kadar bekler | \`get()\` çağrılır çağrılmaz sonlanır |
| **Yanıt Alma** | Genelde kullanılmaz veya tekil | \`get_response()\` ile açıkça beklenir |
| **Tipik Kullanım Alanı** | Standart tek yönlü protokol sürüşü (basit sürücüler) | Okuma-yanıt gerektiren karmaşık protokoller, RAM/Kayıtçı testleri |

Her iki mekanizma da UVM TLM standardının parçası olup, protokolün yanıt gereksinimlerine göre tercih edilir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Sürücü-Dizici Çift Yönlü İletişimi: get() ve put() ile Yanıt (Response) Yönetimi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "driver-using-get-and-put.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class my_driver extends uvm_driver #(my_data);
   \`uvm_component_utils (my_driver)

   virtual task run_phase(uvm_phase phase);
      super.run_phase(phase);

	  // 1. Get an item from the sequencer using "get" method
      seq_item_port.get(req);

	  // 2. For simplicity, lets assume the driver drives the item and consumes 20ns of simulation time
      #20;

	  // 3. After the driver is done, assume it gets back a read data called 8'hAA from the DUT
	  // Assign the read data into the "request" sequence_item object
      req.data = 8'hAA;

	  // 4. Call the "put" method to send the request item back to the sequencer
      seq_item_port.put(req);
   endtask
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Sürücü-Dizici Çift Yönlü İletişimi: get() ve put() ile Yanıt (Response) Yönetimi",
      initialCode: `class my_driver extends uvm_driver #(my_data);
   \`uvm_component_utils (my_driver)

   virtual task run_phase(uvm_phase phase);
      super.run_phase(phase);

	  // 1. Get an item from the sequencer using "get" method
      seq_item_port.get(req);

	  // 2. For simplicity, lets assume the driver drives the item and consumes 20ns of simulation time
      #20;

	  // 3. After the driver is done, assume it gets back a read data called 8'hAA from the DUT
	  // Assign the read data into the "request" sequence_item object
      req.data = 8'hAA;

	  // 4. Call the "put" method to send the request item back to the sequencer
      seq_item_port.put(req);
   endtask
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Sürücü-Dizici Çift Yönlü İletişimi: get() ve put() ile Yanıt (Response) Yönetimi doğrulaması başarıyla tamamlandı.",
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
      question: "Sürücü `seq_item_port.get(req)` ve `seq_item_port.put(req)` çağrılarını kullanırken, dizi (sequence) tarafında sürücünün döndürdüğü yanıt verisini yakalamak için hangi metot çağrılmalıdır?",
      options: ["`get_next_item(req)`", "`wait_for_grant()`", "`get_response(tx)`", "`uvm_wait_for_put()`"],
      correctIndex: 2,
      explanation: "Sürücü `put(req)` ile yanıt gönderdiğinde, bu yanıt dizicinin yanıt kuyruğuna (response FIFO) eklenir. Dizi tarafında bu yanıtı çekmek ve işlemi senkronize etmek için `get_response(tx)` metodu çağrılmalıdır.",
    },
  },
  "uvm-hdl-access-routines": {
    id: "uvm-hdl-access-routines",
    badge: "Modül 12 • Sürücü-Dizici Etkileşimi ve İşlemler",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM HDL Erişim Rutinleri: Backdoor Sinyal Erişimi ve DPI-C Fonksiyonları",
    subtitle: "Testbench bileşenlerinden simülasyondaki RTL hiyerarşisine doğrudan erişim, force, deposit ve release mekanizmaları.",
    sections: [
      {
        title: "1. uvm_hdl_check_path: HDL Hiyerarşik Yolunun Varlık Kontrolü",
        content: `UVM, simülatörün C/DPI arayüzü üzerinden RTL hiyerarşisindeki dahili sinyallere ve yazmaçlara (registers) arayüz pinlerini kullanmadan erişmek için bir dizi C tabanlı yardımcı rutin (\`uvm_hdl_*\`) sunar.

\`uvm_hdl_check_path\` fonksiyon prototipi:
\`\`\`systemverilog
import "DPI-C" context function int uvm_hdl_check_path(string path);
\`\`\`

Bu fonksiyon verilen string hiyerarşik yolun (örneğin \`"tb_top.dut.core.reg_a"\`) tasarım veri tabanında bulunup bulunmadığını kontrol eder. Yol mevcutsa \`1\`, değilse \`0\` döndürür.

\`\`\`systemverilog
if (uvm_hdl_check_path("tb.a.b.cfg")) begin
  \`uvm_info("TEST", "tb.a.b.cfg yolu bulundu", UVM_MEDIUM)
end else begin
  \`uvm_error("TEST", "Belirtilen HDL yolu bulunamadı!")
end
\`\`\`

Bu kontrol, hiyerarşik yol yazım hatalarından kaynaklanan simülasyon çöküşlerini engellemek için kritik bir güvenlik önlemidir.`,
      },
      {
        title: "2. uvm_hdl_deposit: Değer Atama (Deposit) Mekanizması",
        content: `\`uvm_hdl_deposit\` fonksiyonu belirtilen HDL sinyaline veya değişkenine doğrudan yeni bir değer atar:

\`\`\`systemverilog
import "DPI-C" context function int uvm_hdl_deposit(string path, uvm_hdl_data_t value);
\`\`\`

- İşlem başarılıysa \`1\`, aksi halde \`0\` döner.
- **Deposit Davranışı:** Atanan değer sinyal üzerine yazılır; ancak sinyali süren donanım sürücüsü (RTL driver / FF çıkışı) serbest kalmaya devam eder. RTL mantığı sinyale yeni bir değer sürdüğü ilk anda (örneğin bir sonraki saat vuruşunda), yatırılan değer ezilir ve sinyal normal RTL değerini alır.

\`\`\`systemverilog
if (!uvm_hdl_deposit("tb.a.b.cfg", 4'h9))
  \`uvm_error("TEST", "tb.a.b.cfg üzerine deposit başarısız!")
\`\`\``,
      },
      {
        title: "3. uvm_hdl_force: Donanım Sinyalini Zorlama (Force)",
        content: `\`uvm_hdl_force\` fonksiyonu, Verilog dilindeki \`force\` deyimine eşdeğer bir backdoor müdahalesidir:

\`\`\`systemverilog
import "DPI-C" context function int uvm_hdl_force(string path, uvm_hdl_data_t value);
\`\`\`

- Verilen değeri HDL yoluna zorlar ve başarılıysa \`1\` döner.
- **Force vs Deposit Farkı:** \`deposit\` işleminde değer RTL'in bir sonraki sürüşünde hemen ezilirken, \`force\` işleminde sinyal üzerinde tam bir donanımsal kilit kurulur. RTL devresi ne üretirse üretsin sinyal zorlanan değerde sabit kalır.
- Zorlamanın kalkması ve normal RTL sürüşünün devam etmesi için ilerleyen bir simülasyon anında mutlaka \`uvm_hdl_release\` çağrılmalıdır.`,
      },
      {
        title: "4. uvm_hdl_force_time: Zaman Kısıtlı Otomatik Force Uygulaması",
        content: `\`uvm_hdl_force_time\` görevi, belirtilen süre boyunca sinyali zorlar ve süre bitiminde zorlamayı otomatik olarak kaldırır:

\`\`\`systemverilog
task uvm_hdl_force_time(string path, uvm_hdl_data_t value, time force_time = 0);
\`\`\`

- Eğer \`force_time\` parametresi \`0\` olarak verilirse fonksiyon dahili olarak \`uvm_hdl_deposit\` metodunu çağırır.
- Pozitif bir süre verilirse (örneğin \`30ns\`), sinyal \`value\` değerine zorlanır, \`#force_time\` kadar beklenir ve ardından otomatik olarak \`uvm_hdl_release\` uygulanır.

\`\`\`systemverilog
// 30 simülasyon birimi boyunca sinyali 4'h9 değerine zorla ve otomatik bırak:
if (!uvm_hdl_force_time("tb.a.b.cfg", 4'h9, 30))
  \`uvm_error("TEST", "Force-time işlemi başarısız!")
\`\`\`

Bu yöntem geçici hata enjeksiyonu (fault injection) testlerinde kodu son derece sadeleştirir.`,
      },
      {
        title: "5. uvm_hdl_release_and_read: Force Kaldırma ve Güncel Değeri Okuma",
        content: `\`uvm_hdl_release_and_read\` fonksiyonu, önceden zorlanmış bir sinyalin üzerindeki zorlamayı kaldırır ve ardından sinyalin o anki değerini okuyup geri döndürür:

\`\`\`systemverilog
import "DPI-C" context function int uvm_hdl_release_and_read(string path, inout uvm_hdl_data_t value);
\`\`\`

Fonksiyon başarılı olduğunda \`1\` döner ve \`value\` parametresi sinyalin zorlama kalktıktan sonraki güncel donanım değerini içerir. Sinyalin zorlama kalkar kalkmaz RTL sürücüleri tarafından beklenen geçerli duruma dönüp dönmediğini tek adımda doğrulamak için idealdir.`,
      },
      {
        title: "6. uvm_hdl_release: Force Durumunu Sonlandırma",
        content: `\`uvm_hdl_release\` fonksiyonu, \`uvm_hdl_force\` ile başlatılan kilidi sonlandırır:

\`\`\`systemverilog
import "DPI-C" context function int uvm_hdl_release(string path);
\`\`\`

Zorlama kaldırıldıktan sonra sinyalin kontrolü tamamen RTL devresine ve ilgili net'i süren atamalara (continuous assignments / procedural blocks) geri verilir. Başarılı olursa \`1\`, hata durumunda \`0\` döner.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM HDL Erişim Rutinleri: Backdoor Sinyal Erişimi ve DPI-C Fonksiyonları** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-hdl-access-routines.sv - Örnek UVM Doğrulama Kodu",
          snippet: `module B;
	reg [3:0] cfg;
endmodule

module A;
	B b;
endmodule

// Testbench module
module tb;
	A a();
	initial 
		run_test("base_test");
endmodule`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM HDL Erişim Rutinleri: Backdoor Sinyal Erişimi ve DPI-C Fonksiyonları",
      initialCode: `module B;
	reg [3:0] cfg;
endmodule

module A;
	B b;
endmodule

// Testbench module
module tb;
	A a();
	initial 
		run_test("base_test");
endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM HDL Erişim Rutinleri: Backdoor Sinyal Erişimi ve DPI-C Fonksiyonları doğrulaması başarıyla tamamlandı.",
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
      question: "`uvm_hdl_deposit` ile `uvm_hdl_force` metotları arasındaki temel davranışsal fark nedir?",
      options: ["`uvm_hdl_deposit` yalnızca SystemVerilog arayüzlerinde çalışırken, `uvm_hdl_force` yalnızca modül portlarında çalışır.", "`uvm_hdl_deposit` ile atanan değer RTL sürücüsü yeni bir değer sürdüğünde hemen ezilir; `uvm_hdl_force` ise açıkça `release` edilene kadar RTL sürücülerini bastırarak sabit kalır.", "`uvm_hdl_deposit` simülasyon zamanı tüketirken (task), `uvm_hdl_force` anında sıfır zamanda çalışan bir fonksiyondur.", "`uvm_hdl_force` yalnızca testbench nesnelerini etkiler, DUT sinyallerini asla değiştiremez."],
      correctIndex: 1,
      explanation: "`deposit` işlemi sinyale anlık bir değer bırakır; sinyali besleyen mantık kapısı veya register yeni bir değer sürdüğü an deposit edilen değer ezilir. Buna karşın `force` işlemi, açıkça `uvm_hdl_release` çağrılana kadar RTL'deki tüm sürücüleri bastırarak sinyali zorlanan değerde tutar.",
    },
  },
  "uvm-singleton-object": {
    id: "uvm-singleton-object",
    badge: "Modül 12 • Sürücü-Dizici Etkileşimi ve İşlemler",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM'de Tekil Nesne (Singleton Object) Deseni ve Merkezi Veri Tabanı",
    subtitle: "Simülasyon boyunca tek bir örneği bulunan paylaşımlı veri yapıları, tasarım parametreleri ve global yapılandırma yönetimi.",
    sections: [
      {
        title: "1. Singleton (Tekil Nesne) Tasarım Deseni ve UVM'deki Yeri",
        content: `Nesne Yönelimli Programlamada (OOP) **Singleton** deseni, bir sınıfın tüm sistem boyunca yalnızca ve yalnızca tek bir örneğinin (instance) bulunmasını ve bu örneğe her yerden global bir erişim noktası sağlanmasını garanti eder.

Karmaşık Çip Üstü Sistem (SoC) testbench'lerinde düzinelerce master, slave, bellek bloğu ve ara bağlantı (interconnect/NoC) bulunur. Bu bileşenlerin veri yolu genişlikleri, adres haritaları, saat frekansları ve protokol sürümleri gibi ortak parametrelere erişmesi gerekir. Her bileşene tek tek konfigürasyon nesnesi geçmek yerine merkezi bir Singleton veri tabanı oluşturmak tasarımı sadeleştirir.`,
      },
      {
        title: "2. Singleton Nesne Yapısının SystemVerilog'da Uygulanması",
        content: `SystemVerilog'da bir Singleton sınıfı şu mimari kurallarla inşa edilir:
1. **Statik ve Yerel Örnek İşaretçisi (\`static local\` handle):** Sınıfın kendi türünde statik bir değişken oluşturulur.
2. **Korumalı Yapıcı Metot (\`protected/local new()\`):** Dışarıdaki sınıfların doğrudan \`new()\` çağrısı yapması engellenir.
3. **Statik Erişim Fonksiyonu (\`static get()\`):** Nesne henüz oluşturulmamışsa oluşturur (\`lazy initialization\`), oluşturulmuşsa mevcut tek örneğin referansını döndürür.

\`\`\`systemverilog
class car_db;
  // Statik tekil referans
  static local car_db m_inst;

  // Dışarıdan new() çağrılmasını engelle
  protected function new();
  endfunction

  // Global erişim metodu
  static function car_db get();
    if (m_inst == null) begin
      m_inst = new();
    end
    return m_inst;
  endfunction
endclass
\`\`\``,
      },
      {
        title: "3. Kullanım Senaryosu: Karmaşık SoC Arayüz ve Tasarım Parametreleri Veri Tabanı",
        content: `Bir SoC üzerindeki farklı master ve slave uç birimlerini temsil eden parametreleri ele alalım. Bu parametreler bir yapı (struct) listesi halinde tanımlanabilir ve bir betik (Python/Perl) aracılığıyla donanım spesifikasyonundan otomatik üretilebilir:

\`\`\`systemverilog
typedef enum { SEDAN, COUPE, SUV } e_type;
typedef enum { V6, V8, ELECTRIC } e_engine;

typedef struct {
  string   brand;
  e_type   car_type;
  e_engine engine;
  bit [15:0] length;
  bit      has_lcd;
} st_car;

// Tasarım konfigürasyon listesi
st_car car_list [2] = '{
  '{"honda", SEDAN, V6, 450, 1'b1},
  '{"bmw",   COUPE, V8, 300, 1'b0}
};
\`\`\``,
      },
      {
        title: "4. Merkezi car_db Veri Tabanı Sınıfı ve Sorgulama Fonksiyonları",
        content: `Veri tabanını temsil eden singleton sınıf, yapı verilerini nesne modellerine (\`base_car\`) dönüştürerek dahili bir kuyrukta depolar ve sorgulama API'leri sunar:

\`\`\`systemverilog
class base_car;
  string brand;
  e_type car_type;
  e_engine engine;
  function new(string brand, e_type car_type, e_engine engine);
    this.brand = brand;
    this.car_type = car_type;
    this.engine = engine;
  endfunction
endclass

class car_db;
  static local car_db m_inst;
  base_car db_queue [$];

  protected function new(); endfunction

  static function car_db get();
    if (m_inst == null) m_inst = new();
    return m_inst;
  endfunction

  // Özel sorgu fonksiyonu
  function base_car get_by_brand(string name);
    foreach (db_queue[i]) begin
      if (db_queue[i].brand == name) return db_queue[i];
    end
    return null;
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. En Üst Düzey Ortamda (top_env) Singleton Veri Tabanının Başlatılması",
        content: `Testbench'in en üst ortamı (\`top_env\`), \`build_phase\` aşamasında veri tabanını doldurur:

\`\`\`systemverilog
class top_env extends uvm_env;
  \`uvm_component_utils(top_env)
  car_db m_car_db;

  function new(string name, uvm_component parent); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    // Tekil örneğe eriş
    m_car_db = car_db::get();

    // Donanım parametrelerini veri tabanına yükle
    foreach (car_list[i]) begin
      base_car bc = new(car_list[i].brand, car_list[i].car_type, car_list[i].engine);
      m_car_db.db_queue.push_back(bc);
    end
    \`uvm_info("ENV", $sformatf("car_db başlatıldı, toplam kayıt: %0d", m_car_db.db_queue.size()), UVM_LOW)
  endfunction
endclass
\`\`\`

Artık ortamdaki herhangi bir sürücü, monitör veya dizi doğrudan \`car_db::get().get_by_brand("bmw")\` çağrısıyla bu parametrelere erişebilir.`,
      },
      {
        title: "6. Singleton Deseni ile uvm_config_db Karşılaştırması",
        content: `| Kriter | Singleton Nesne Deseni | uvm_config_db Mekanizması |
| :--- | :--- | :--- |
| **Erişim Kapsamı** | Global (tüm testbench için tekil nesne) | Hiyerarşik kapsam (üst bileşenden alt bileşene) |
| **Tür Güvenliği** | %100 derleme zamanı statik tür güvenliği | String tabanlı arama (çalışma zamanı riskleri) |
| **Ezme (Override) Esnekliği**| Zor (tüm ortam aynı tekil nesneyi görür) | Çok kolay (farklı hiyerarşilere farklı değerler set edilebilir) |
| **Kullanım Yeri** | Global parametre tabloları, NoC yönlendirme tabloları | Bileşen sanal arayüzleri, aktif/pasif mod anahtarları |

Doğrulama mühendisliğinde her iki yöntem de birbirini tamamlar; bileşene özgü parametreler için \`uvm_config_db\`, sistem geneli sabit veri tabloları için Singleton tercih edilir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM'de Tekil Nesne (Singleton Object) Deseni ve Merkezi Veri Tabanı** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-singleton-object.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Define a class that you want to make a singleton
class mySingleton;
	function new (string name = "mySingleton");
		...
   	endfunction

   	static local mySingleton m_sg;       // Singleton object
   	string name;                         // My test variable

	// Has a static method that returns the instance of the class
   	static function mySingleton get();
      	if (m_sg == null)
         	m_sg = new ();
      	return m_sg;
   	endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM'de Tekil Nesne (Singleton Object) Deseni ve Merkezi Veri Tabanı",
      initialCode: `// Define a class that you want to make a singleton
class mySingleton;
	function new (string name = "mySingleton");
		...
   	endfunction

   	static local mySingleton m_sg;       // Singleton object
   	string name;                         // My test variable

	// Has a static method that returns the instance of the class
   	static function mySingleton get();
      	if (m_sg == null)
         	m_sg = new ();
      	return m_sg;
   	endfunction
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM'de Tekil Nesne (Singleton Object) Deseni ve Merkezi Veri Tabanı doğrulaması başarıyla tamamlandı.",
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
      question: "SystemVerilog dilinde bir sınıfın Singleton (tekil nesne) olarak çalışmasını sağlamak için hangi tasarım kuralı uygulanmalıdır?",
      options: ["Sınıfın `uvm_component` temel sınıfından türetilmesi ve `build_phase` içinde `super.build_phase` çağrılması.", "Sınıf içinde `static local` tipinde bir örnek işaretçisi tutulması, yapıcı metodun (`new`) dış erişime kapatılması ve nesneye erişimin statik bir `get()` fonksiyonu ile sağlanması.", "Sınıf içindeki tüm değişkenlerin `rand` ve tüm metotların `virtual` olarak bildirilmesi.", "`uvm_config_db::set` metodunun `*` yol etiketiyle çağrılması."],
      correctIndex: 1,
      explanation: "Singleton tasarım deseni; sınıfın dışarıdan doğrudan `new()` ile türetilmesini önlemek amacıyla korumalı bir kurucu metot (`protected/local new`), sınıfın tekil kopyasını tutan `static local` bir değişken ve örneğe kontrollü erişim sağlayan statik bir `get()` metodu gerektirir.",
    },
  },
  "reusable-verification-components": {
    id: "reusable-verification-components",
    badge: "Modül 13 • Yeniden Kullanılabilir VIP Geliştirme",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Yeniden Kullanılabilir Doğrulama Bileşenleri (VIP/UVC) Geliştirme Rehberi",
    subtitle: "Endüstri standardı modüler, taşınabilir ve projeler arası aktarılabilir Doğrulama IP'si (VIP) mimari ilkeleri.",
    sections: [
      {
        title: "1. Yeniden Kullanılabilir VIP Geliştirme Temelleri ve Öğrenim Hedefleri",
        content: `Bir Doğrulama IP'si (Verification IP - VIP veya UVC), belirli bir protokolü (AXI, PCIe, SPI, I2C, UART) doğrulamak için tasarlanmış bağımsız bileşenler paketidir. Gerçek anlamda 'yeniden kullanılabilir' bir bileşen, tek bir blok seviyesi testbench'ten alınıp alt sistem ve çip seviyesi (SoC) testbench'lerine kaynak koduna tek bir satır dahi dokunulmadan entegre edilebilmelidir.

Bu bölümde öğrenecekleriniz:
- Bir UVM bileşenini gerçekten yeniden kullanılabilir kılan mimari prensipler.
- Veri öğelerinin (sequence items), ajanların ve dizilerin taşınabilirlik kuralları.
- Fabrika (factory), yapılandırma veri tabanı (\`uvm_config_db\`) ve geri çağırmaların (\`callback\`) doğru kullanımı.
- Yeniden kullanılabilirliği bozan yaygın tuzaklar ve bunlardan kaçınma yöntemleri.`,
      },
      {
        title: "2. Yarı İletken Endüstrisinde VIP Yeniden Kullanılabilirliğinin Önemi",
        content: `Modern bir SoC tasarımında onlarca farklı IP bloğu ve veri yolu arayüzü yer alır. Eğer her proje için AXI veya PCIe doğrulama bileşenleri sıfırdan yazılsaydı, projelerin pazara çıkış süresi (Time-to-Market) aylar veya yıllar mertebesinde uzardı.

Endüstride kanıtlanmış VIP'ler bir kez geliştirilir ve kurum bünyesindeki yüzlerce projede tak-çalıştır mantığıyla kullanılır. Kötü tasarlanmış, içine sabit değerler gömülmüş bir VIP ise her yeni projede hata ayıklama ve yeniden yazma maliyeti yaratarak doğrulama eforunu katlar.`,
      },
      {
        title: "3. Kural 1: Veri Öğelerini (Sequence Items) Doğru Modelleme Prensipleri",
        content: `Diziler, sürücüler ve monitörler arasında taşınan işlem nesnesi (\`uvm_sequence_item\`), yeniden kullanılabilir bir VIP'nin omurgasıdır. Bu sınıfın mimarisindeki en ufak bir kusur, VIP'yi kullanan tüm üst seviye test senaryolarını olumsuz etkiler.

Veri öğesini doğru modellemenin üç altın kuralı vardır:
1. Daima \`uvm_sequence_item\` sınıfından türetmek.
2. Protokol alanlarını \`rand\` olarak tanımlamak ve asla sabit değer gömmemek.
3. \`do_copy\`, \`do_compare\` ve \`do_print\` metotlarını eksiksiz gerçeklemek.`,
      },
      {
        title: "4. Daima uvm_sequence_item Sınıfından Türetme Kuralı",
        content: `Kullanıcı tanımlı her işlem sınıfı doğrudan ya da dolaylı olarak \`uvm_sequence_item\` sınıfından türetilmelidir. Bu sayede nesne:
- Sürücü-dizici TLM el sıkışma döngüsüne katılabilir,
- UVM Fabrikası (\`factory\`) üzerinden dinamik olarak ezilebilir (type/instance override),
- Yazdırma, kopyalama, klonlama ve karşılaştırma yardımcı işlevlerini kazanır.

\`\`\`systemverilog
class axi_transaction extends uvm_sequence_item;
  \`uvm_object_utils(axi_transaction)

  // Protokol alanları rand olarak bildirilir
  rand bit [31:0] addr;
  rand bit [31:0] data;
  rand bit        wr_rd;     // 1 = Yazma, 0 = Okuma
  rand bit [2:0]  burst_len;

  function new(string name = "axi_transaction");
    super.new(name);
  endfunction
  // do_* kancaları ve kısıtlar...
endclass
\`\`\``,
      },
      {
        title: "5. Protokol Alanlarını rand Olarak Tanımlama ve Esneklik",
        content: `Protokoldeki anlamlı tüm alanları \`rand\` olarak tanımlayın. Böylece üst seviye testler veya diziler, VIP'nin kaynak koduna dokunmadan harici kısıtlarla (\`inline constraints\`) istediği senaryoyu üretebilir.

**Önemli Uyarı:** İşlem sınıfı içerisine asla sabit değerler (hardcoded values) gömmeyin. Sabit değerler, VIP'yi yeniden kullanmak isteyen her mühendisi sınıfı modifiye etmeye zorlar ve taşınabilirliği tamamen yok eder. Değişmemesi gereken protokol kuralları varsa bunları \`soft\` kısıtlar olarak ekleyin.`,
      },
      {
        title: "6. do_copy, do_compare ve do_print Metotlarının Gerçeklenmesi",
        content: `\`uvm_object\` temel sınıfı, testbench bileşenlerinin nesneleri güvenle çoğaltması ve karşılaştırması için sanal \`do_*\` metotları sunar. Bu metotları doğru gerçeklemek, skor tahtalarının ve kapsama modellerinin hatasız çalışmasını sağlar:

\`\`\`systemverilog
function void do_copy(uvm_object rhs);
  axi_transaction rhs_;
  super.do_copy(rhs);
  if (!$cast(rhs_, rhs))
    \`uvm_fatal("TYPE_MISMATCH", "do_copy: geçersiz nesne türü!")
  this.addr      = rhs_.addr;
  this.data      = rhs_.data;
  this.wr_rd     = rhs_.wr_rd;
  this.burst_len = rhs_.burst_len;
endfunction
\`\`\`

Basit işlemler için \`uvm_field_*\` makroları da kullanılabilir; ancak endüstri standardı yüksek verimli VIP'lerde daima yukarıdaki gibi özel \`do_*\` metotları yazılır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Yeniden Kullanılabilir Doğrulama Bileşenleri (VIP/UVC) Geliştirme Rehberi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "reusable-verification-components.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class axi_transaction extends uvm_sequence_item;
  \`uvm_object_utils(axi_transaction)

  // Protocol fields as rand variables — enables constrained randomization
  rand bit [31:0] addr;
  rand bit [31:0] data;
  rand bit        wr_rd;    // 1 = write, 0 = read
  rand bit [2:0]  burst_len;

  function new(string name = "axi_transaction");
    super.new(name);
  endfunction

  // Rest of the code (field macros or do_* methods)
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Yeniden Kullanılabilir Doğrulama Bileşenleri (VIP/UVC) Geliştirme Rehberi",
      initialCode: `class axi_transaction extends uvm_sequence_item;
  \`uvm_object_utils(axi_transaction)

  // Protocol fields as rand variables — enables constrained randomization
  rand bit [31:0] addr;
  rand bit [31:0] data;
  rand bit        wr_rd;    // 1 = write, 0 = read
  rand bit [2:0]  burst_len;

  function new(string name = "axi_transaction");
    super.new(name);
  endfunction

  // Rest of the code (field macros or do_* methods)
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Yeniden Kullanılabilir Doğrulama Bileşenleri (VIP/UVC) Geliştirme Rehberi doğrulaması başarıyla tamamlandı.",
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
      question: "Yeniden kullanılabilir bir Doğrulama Bileşeninde (VIP) işlem sınıfının protokol alanlarına sabit (hardcoded) değerler atamak neden kaçınılması gereken bir hatadır?",
      options: ["SystemVerilog derleyicisi sabit değer içeren sınıfları derleyemez.", "Sabit değerler, bileşeni farklı test senaryolarında kullanmak isteyen mühendisleri VIP kaynak kodunu değiştirmeye zorlar ve taşınabilirliği bozar.", "Sabit değerler UVM fabrikasının `create()` metodunu geçersiz kılar.", "Sabit değer içeren sınıflar `uvm_driver` tarafından kabul edilemez."],
      correctIndex: 1,
      explanation: "Yeniden kullanılabilirliğin temeli, VIP kaynak kodunu değiştirmeden harici kısıtlarla farklı test senaryoları üretebilmektir. Sınıf içine sabit değerler gömüldüğünde üst seviye diziler bu alanları kontrol edemez ve VIP taşınabilirliğini kaybeder.",
    },
  },
  "verification-components": {
    id: "verification-components",
    badge: "Modül 13 • Yeniden Kullanılabilir VIP Geliştirme",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Doğrulama Bileşenlerini (UVC/VIP) Kullanma ve Entegre Etme Rehberi",
    subtitle: "Üçüncü parti ve kurum içi VIP'lerin SoC doğrulama ortamına entegrasyonu, arayüz sözleşmeleri ve ortam mimarisi.",
    sections: [
      {
        title: "1. UVC Entegrasyon Rehberine Genel Bakış ve Temel Konseptler",
        content: `Bu rehberde, hazır bir Doğrulama Bileşenini (UVC / VIP) projenize sorunsuzca entegre etmenin kurallarını öğreneceksiniz:
- Üçüncü parti veya yeniden kullanılan bir UVC'nin arayüz sözleşmesini (interface contract) analiz etme,
- UVC'leri bir \`uvm_env\` kapsayıcısı içinde doğru şekilde oluşturma ve yapılandırma,
- Test sınıfından UVC'leri süren dizileri yönetme ve sanal diziciler (\`virtual sequencer\`) ile koordine etme,
- Skor tahtası (\`scoreboard\`) ve kapsama modellerini UVC analiz portlarına bağlama.`,
      },
      {
        title: "2. Tipik bir SoC Doğrulama Akışında UVC'lerin Rolü ve Çoklu VIP Yönetimi",
        content: `Modern bir SoC doğrulama ortamı genellikle birden fazla UVC'yi bir arada barındırır. Örneğin AXI master ve slave portları, bir UART arayüzü ve bir kesme denetleyicisi (interrupt controller) içeren bir SoC projesinde, her biri bağımsız geliştirilmiş 3-4 farklı UVC aynı ortamda çalışır.

Doğrulama ortamının (\`chip_env\`) görevi, bu UVC'lerin iç kodlarına kesinlikle dokunmadan, onları merkezi bir mimaride yapılandırmak, sanal arayüzlerini bağlamak ve eşgüdümlü çalıştırmaktır.`,
      },
      {
        title: "3. Adım 1: UVC Arayüz Sözleşmesini (Interface Contract) İnceleme ve Analiz",
        content: `Tek bir satır entegrasyon kodu yazmadan önce UVC'nin ana ortamdan ne beklediğini anlamalısınız. İyi belgelenmiş bir UVC şu 4 temel bilgiyi sağlar:
1. **Yapılandırma Nesnesi Türü ve Alanları:** UVC \`uvm_config_db\` üzerinden hangi konfigürasyon sınıfını bekliyor?
2. **Sanal Arayüz Türü ve Yol Adı:** Testbench top modülü hangi interface örneğini hangi string etiketiyle aktarmalı?
3. **TLM Analiz Portları:** Skor tahtası ve kapsama toplayıcılarının bağlanacağı analiz portları nelerdir?
4. **Kullanılabilir Diziler:** UVC hangi hazır temel dizilerle gelmektedir?

Profesyonel bir UVC, ajan seviyesinde tek bir konfigürasyon nesnesi ve analiz portu sunar. Eğer bir UVC dahili sürücü veya monitörüne doğrudan erişmenizi gerektiriyorsa, bu kötü bir mimari tasarımı işaret eder.`,
      },
      {
        title: "4. Örnek İnceleme: UVC Yapılandırma Nesnesi (axi_agent_cfg) Çözümlemesi",
        content: `Entegre edeceğiniz bir AXI UVC'nin konfigürasyon sınıfı örneğini inceleyelim:

\`\`\`systemverilog
class axi_agent_cfg extends uvm_object;
  \`uvm_object_utils(axi_agent_cfg)

  virtual axi_if vif; // Testbench top tarafından atanmalıdır
  uvm_active_passive_enum is_active = UVM_ACTIVE; // Aktif/Pasif mod
  int unsigned max_outstanding = 8;               // Protokol parametresi
  bit en_coverage = 1;                            // Kapsama açık/kapalı
  bit en_protocol_checks = 1;                     // Protokol assertion'ları açık/kapalı

  function new(string name = "axi_agent_cfg"); super.new(name); endfunction
endclass
\`\`\`

Bu sınıf size tam olarak ne sağlamanız gerektiğini söyler: geçerli bir sanal arayüz tanıtıcısı, aktif/pasif çalışma modu ve doğrulama denetim anahtarları.`,
      },
      {
        title: "5. Adım 2: UVC'leri Daima uvm_env İçerisinde Örnekleme Kuralı",
        content: `UVC ajanları asla doğrudan \`uvm_test\` sınıfları içinde oluşturulmamalıdır! Bu, UVM mimarisindeki en kritik yapısal kurallardan biridir.

Eğer ajanları doğrudan \`uvm_test\` içinde örneklerseniz:
- Her test sınıfı ortam topolojisini ve bağlantıları bilmek zorunda kalır.
- Ortama yeni bir ajan eklendiğinde tüm test dosyalarını tek tek güncellemeniz gerekir.

Bunun yerine UVC'ler bir \`uvm_env\` kapsayıcısında toplanır:
- Test sınıfları yalnızca dizilerle ve yapılandırmayla ilgilenir; ajanlara doğrudan dokunmaz.
- Topoloji değişiklikleri sadece ortam sınıfında yapılır ve tüm testler bu ortamı paylaşır.
- Geliştirilen ortam sınıfı, daha büyük bir sistem seviyesi testbench'te alt ortam (\`sub-env\`) olarak kolayca yeniden kullanılabilir.`,
      },
      {
        title: "6. SoC Doğrulama Ortamının (chip_env) İnşası ve Sanal Arayüz Bağlantıları",
        content: `Tüm bu bileşenleri birleştiren eksiksiz bir \`chip_env\` mimarisi:

\`\`\`systemverilog
class chip_env extends uvm_env;
  \`uvm_component_utils(chip_env)

  axi_agent  axi_mst; // AXI Master UVC (Aktif)
  axi_agent  axi_slv; // AXI Slave UVC (Pasif - yalnızca izleme)
  uart_agent uart;    // UART UVC
  chip_scoreboard scb;// Projeye özel skor tahtası

  function void build_phase(uvm_phase phase);
    axi_agent_cfg mst_cfg, slv_cfg;
    uart_agent_cfg uart_cfg;
    super.build_phase(phase);

    // 1. Konfigürasyon nesnelerini oluştur
    mst_cfg  = axi_agent_cfg::type_id::create("mst_cfg");
    slv_cfg  = axi_agent_cfg::type_id::create("slv_cfg");
    uart_cfg = uart_agent_cfg::type_id::create("uart_cfg");
    slv_cfg.is_active = UVM_PASSIVE; // Yalnızca izleyici (monitör)

    // 2. TB Top tarafından atanan sanal arayüzleri çek
    if (!uvm_config_db #(virtual axi_if)::get(this, "", "axi_mst_if", mst_cfg.vif))
      \`uvm_fatal("NO_VIF", "AXI master virtual interface bulunamadı!")
    if (!uvm_config_db #(virtual axi_if)::get(this, "", "axi_slv_if", slv_cfg.vif))
      \`uvm_fatal("NO_VIF", "AXI slave virtual interface bulunamadı!")
    if (!uvm_config_db #(virtual uart_if)::get(this, "", "uart_if", uart_cfg.vif))
      \`uvm_fatal("NO_VIF", "UART virtual interface bulunamadı!")

    // 3. Konfigürasyon nesnelerini ilgili ajanlara ilet
    uvm_config_db #(axi_agent_cfg)::set(this, "axi_mst", "cfg", mst_cfg);
    uvm_config_db #(axi_agent_cfg)::set(this, "axi_slv", "cfg", slv_cfg);
    uvm_config_db #(uart_agent_cfg)::set(this, "uart", "cfg", uart_cfg);

    // 4. Ajanları ve skor tahtasını oluştur
    axi_mst = axi_agent::type_id::create("axi_mst", this);
    axi_slv = axi_agent::type_id::create("axi_slv", this);
    uart    = uart_agent::type_id::create("uart", this);
    scb     = chip_scoreboard::type_id::create("scb", this);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Doğrulama Bileşenlerini (UVC/VIP) Kullanma ve Entegre Etme Rehberi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "verification-components.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Provided by the UVC — do not modify
class axi_agent_cfg extends uvm_object;
  \`uvm_object_utils(axi_agent_cfg)

  virtual axi_if              vif;                    // Must be connected by testbench top
  uvm_active_passive_enum     is_active   = UVM_ACTIVE;
  int unsigned                max_outstanding = 8;    // Protocol parameter
  bit                         en_coverage = 1;        // Toggle coverage on/off
  bit                         en_protocol_checks = 1; // Toggle protocol assertions

  // Rest of the code (constructor, field macros)
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Doğrulama Bileşenlerini (UVC/VIP) Kullanma ve Entegre Etme Rehberi",
      initialCode: `// Provided by the UVC — do not modify
class axi_agent_cfg extends uvm_object;
  \`uvm_object_utils(axi_agent_cfg)

  virtual axi_if              vif;                    // Must be connected by testbench top
  uvm_active_passive_enum     is_active   = UVM_ACTIVE;
  int unsigned                max_outstanding = 8;    // Protocol parameter
  bit                         en_coverage = 1;        // Toggle coverage on/off
  bit                         en_protocol_checks = 1; // Toggle protocol assertions

  // Rest of the code (constructor, field macros)
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Doğrulama Bileşenlerini (UVC/VIP) Kullanma ve Entegre Etme Rehberi doğrulaması başarıyla tamamlandı.",
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
      question: "Bir UVM testbench mimarisinde UVC ajanlarının (agents) doğrudan `uvm_test` içinde değil de mutlaka bir `uvm_env` konteyneri içinde örneklenmesi neden zorunlu bir kuraldır?",
      options: ["`uvm_test` sınıfı SystemVerilog'da `uvm_component_utils` makrosunu desteklemez.", "Ajanları `uvm_test` içine koymak testlerin ortam topolojisine bağımlı olmasına yol açar; ortam sınıfı kullanılmadığında topoloji değişiklikleri tüm testleri bozar ve ortamın alt sistemlerde yeniden kullanımı imkansızlaşır.", "`uvm_test` sınıfı sadece bir adet TLM portu barındırabilir.", "Simülatör fazlama motoru `uvm_test` içindeki ajanların `connect_phase` aşamasını çalıştırmaz."],
      correctIndex: 1,
      explanation: "UVC ajanlarının `uvm_env` içinde toplanması yapısal soyutlama sağlar. Testler yalnızca senaryo ve dizilerle ilgilenir. Eğer ajanlar doğrudan test içine konursa her test ortamın mimarisine bağımlı hale gelir, bir ajan eklendiğinde tüm testler değişmek zorunda kalır ve testbench alt sistem seviyesinde yeniden kullanılamaz.",
    },
  },
  "uvm-verification-testbench-example": {
    id: "uvm-verification-testbench-example",
    badge: "Modül 14 • Uçtan Uca UVM Testbench Projeleri",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Uçtan Uca UVM Testbench Projesi: '1011' Örüntü Dedektörü (Pattern Detector)",
    subtitle: "FSM tabanlı seri veri örüntü dedektörünün UVM mimarisiyle doğrulanması, test planı, kısıtlı rastgelelik ve arayüz izleme.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm-verification-testbench-example-wave.png)`,
      },
      {
        title: "1. Tasarım Mimarisi: '1011' Sıralı Örüntü Dedektörü (FSM DUT)",
        content: `Bu projede doğrulanacak tasarım (DUT), seri bir girdi akışında ardışık \`'1011'\` bit örüntüsünü tespit eden klasik bir Sonlu Durum Makinesidir (FSM).

- **Çalışma İlkesi:** Her saat vuruşunda (\`clk\`) tasarıma yeni bir \`in\` biti girer. FSM durumları adım adım takip eder ve örüntü yakalandığı anda \`out\` çıkışını \`1\` yapar.
- **Örtüşmeli (Overlapping) Durum:** '1011' yakalandıktan sonra gelen son '1' biti, potansiyel olarak bir sonraki '1011' örüntüsünün ilk biti olarak değerlendirilebilir. Testbench hem örtüşmeli hem de örtüşmesiz durumları kapsamalıdır.`,
      },
      {
        title: "2. Doğrulama Test Planı ve UVM Mimari Blok Şeması",
        content: `Tasarımı doğrulamak için geliştirilecek UVM testbench mimarisi şu temel bileşenlerden oluşur:

1. **Dizi (\`gen_item_seq\`):** Rastgele girdi bitleri (\`in\`) üreterek diziciye iletir.
2. **Sürücü (\`driver\`):** Diziciden aldığı \`Item\` nesnelerini sanal arayüz (\`virtual des_if\`) üzerinden saat vuruşuna senkronize şekilde DUT pinlerine sürer.
3. **İzleyici (\`monitor\`):** Tasarımın giriş ve çıkış pinlerini saatleme bloğu (\`clocking block\`) ile izler, yakaladığı transferi \`Item\` nesnesine paketler ve analiz portuna basar.
4. **Skor Tahtası (\`scoreboard\`):** Gelen giriş akışını dahili altın model (golden model) mantığıyla değerlendirir; beklenen '1011' yakalandığında donanımın \`out\` çıkışının tam o anda \`1\` olup olmadığını doğrular.

Test senaryoları \`01_1011011\`, \`010_10_1011\`, \`100_11_1011\` gibi kritik durumları yakalamak üzere tasarlanmıştır.`,
      },
      {
        title: "3. İşlem Öğesi Tanımı: Item Sınıfı ve Olasılık Dağılımlı Kısıtlar",
        content: `Ortamda hem girdi sürüşü hem de gözlem amacıyla kullanılacak işlem nesnesi:

\`\`\`systemverilog
class Item extends uvm_sequence_item;
  \`uvm_object_utils(Item)

  rand bit in;  // DUT girişine sürülecek bit
  bit      out; // DUT çıkışından gözlemlenen bit

  // Örüntünün daha sık ortaya çıkması için '1' olasılığı artırılır:
  constraint c1 {
    in dist { 0 := 20, 1 := 80 };
  }

  function new(string name = "Item");
    super.new(name);
  endfunction

  virtual function string convert2str();
    return $sformatf("in=%0d, out=%0d", in, out);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "4. Dizi Mimarisi: Rastgele İşlem Üretici (gen_item_seq)",
        content: `Dizi sınıfı, belirlenen sayıda rastgele \`Item\` nesnesi üretip diziciye iletir:

\`\`\`systemverilog
class gen_item_seq extends uvm_sequence #(Item);
  \`uvm_object_utils(gen_item_seq)

  rand int num;
  constraint c1 { soft num inside {[10:50]}; }

  function new(string name = "gen_item_seq");
    super.new(name);
  endfunction

  virtual task body();
    for (int i = 0; i < num; i++) begin
      Item m_item = Item::type_id::create("m_item");
      start_item(m_item);
      m_item.randomize();
      \`uvm_info("SEQ", $sformatf("Yeni öğe üretildi [%0d]: %s", i, m_item.convert2str()), UVM_HIGH)
      finish_item(m_item);
    end
    \`uvm_info("SEQ", $sformatf("%0d adet öğe başarıyla üretildi", num), UVM_LOW)
  endtask
endclass
\`\`\``,
      },
      {
        title: "5. Sürücü Uygulaması: Saatleme Bloğu (Clocking Block) ile Sürüş",
        content: `Yarış durumlarını (race conditions) önlemek için sürücü, sanal arayüz içerisindeki saatleme bloğunu (\`vif.cb\`) kullanır:

\`\`\`systemverilog
class driver extends uvm_driver #(Item);
  \`uvm_component_utils(driver)

  virtual des_if vif;

  function new(string name = "driver", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if (!uvm_config_db #(virtual des_if)::get(this, "", "des_vif", vif))
      \`uvm_fatal("DRV", "Sanal arayüz (des_vif) alınamadı!")
  endfunction

  virtual task run_phase(uvm_phase phase);
    super.run_phase(phase);
    forever begin
      Item m_item;
      seq_item_port.get_next_item(m_item);
      drive_item(m_item);
      seq_item_port.item_done();
    end
  endtask

  virtual task drive_item(Item m_item);
    @(vif.cb);
    vif.cb.in <= m_item.in;
  endtask
endclass
\`\`\``,
      },
      {
        title: "6. İzleyici (Monitor): Giriş ve Çıkış Sinyallerini Eşzamanlı Örnekleme",
        content: `İzleyici, sıfırlama kalktığında her saat vuruşunda giriş ve çıkış pinlerini örnekler:

\`\`\`systemverilog
class monitor extends uvm_monitor;
  \`uvm_component_utils(monitor)

  uvm_analysis_port #(Item) mon_analysis_port;
  virtual des_if vif;

  function new(string name = "monitor", uvm_component parent = null);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if (!uvm_config_db #(virtual des_if)::get(this, "", "des_vif", vif))
      \`uvm_fatal("MON", "Sanal arayüz (des_vif) alınamadı!")
    mon_analysis_port = new("mon_analysis_port", this);
  endfunction

  virtual task run_phase(uvm_phase phase);
    super.run_phase(phase);
    forever begin
      @(vif.cb);
      if (vif.rstn) begin
        Item item = Item::type_id::create("item");
        item.in  = vif.in;
        item.out = vif.cb.out;
        mon_analysis_port.write(item);
        \`uvm_info("MON", $sformatf("Örneklenen işlem: %s", item.convert2str()), UVM_HIGH)
      end
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Uçtan Uca UVM Testbench Projesi: '1011' Örüntü Dedektörü (Pattern Detector)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-verification-testbench-example.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// This is the base transaction object that will be used
// in the environment to initiate new transactions and 
// capture transactions at DUT interface
class Item extends uvm_sequence_item;
  \`uvm_object_utils(Item)
  rand bit  in;
  bit 		out;
  
  virtual function string convert2str();
    return $sformatf("in=%0d, out=%0d", in, out);
  endfunction
  
  function new(string name = "Item");
    super.new(name);
  endfunction
  
  constraint c1 { in dist {0:/20, 1:/80}; }
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Uçtan Uca UVM Testbench Projesi: '1011' Örüntü Dedektörü (Pattern Detector)",
      initialCode: `// This is the base transaction object that will be used
// in the environment to initiate new transactions and 
// capture transactions at DUT interface
class Item extends uvm_sequence_item;
  \`uvm_object_utils(Item)
  rand bit  in;
  bit 		out;
  
  virtual function string convert2str();
    return $sformatf("in=%0d, out=%0d", in, out);
  endfunction
  
  function new(string name = "Item");
    super.new(name);
  endfunction
  
  constraint c1 { in dist {0:/20, 1:/80}; }
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Uçtan Uca UVM Testbench Projesi: '1011' Örüntü Dedektörü (Pattern Detector) doğrulaması başarıyla tamamlandı.",
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
      question: "'1011' örüntü dedektörü testbench'inde `Item` sınıfında `in dist { 0 := 20, 1 := 80 };` kısıtının kullanılmasının temel mühendislik sebebi nedir?",
      options: ["DUT tasarımı yalnızca '1' değerlerini kabul edebildiği için.", "Eşit olasılıklı (%50-%50) rastgelelikte '1011' dizisinin denk gelme sıklığı düşük olacağından, 1 ağırlığını artırarak örüntü yakalama ve kapsama (coverage) verimini yükseltmek.", "SystemVerilog'da '0' biti rastgeleleştirilemediği için.", "Saatleme bloğunun (clocking block) '0' bitinde kilitlenmesini engellemek için."],
      correctIndex: 1,
      explanation: "Doğrulamada hedef örüntü ağırlıklı olarak '1' bitlerinden oluşuyorsa ('1011'), '1' gelme olasılığını artırmak (%80) örüntünün çok daha sık tetiklenmesini sağlar. Böylece simülasyonda gereksiz boş döngüler harcanmadan hedeflenen durum makinesi geçişleri hızla doğrulanır.",
    },
  },
  "uvm-testbench-example-1": {
    id: "uvm-testbench-example-1",
    badge: "Modül 14 • Uçtan Uca UVM Testbench Projeleri",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Kapsamlı UVM Testbench Projesi 1: Kayıtçıl Bellek Denetleyicisi (Register Memory Controller)",
    subtitle: "Adres ve veri tabanlı bellek denetleyicisinin yazma/okuma protokolü, referans modeli ve skor tahtası ile tam UVM doğrulaması.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm-testbench-example-2-wave.png)
![UVM Mimari Şeması](/images/uvm/tb_top.png)`,
      },
      {
        title: "1. İşlem Öğesi Tanımı: reg_item ve Alan Otomasyonu",
        content: `Kayıtçıl bellek kontrolcüsü (Register Memory Controller) için adres, yazma verisi, okuma verisi ve yazma/okuma kontrol bayrağını barındıran işlem nesnesi:

\`\`\`systemverilog
class reg_item extends uvm_sequence_item;
  rand bit [\`ADDR_WIDTH-1:0] addr;
  rand bit [\`DATA_WIDTH-1:0] wdata;
  rand bit                   wr;    // 1 = Yazma, 0 = Okuma
  bit      [\`DATA_WIDTH-1:0] rdata; // DUT tarafından dönen okuma verisi

  \`uvm_object_utils_begin(reg_item)
    \`uvm_field_int(addr,  UVM_DEFAULT)
    \`uvm_field_int(wdata, UVM_DEFAULT)
    \`uvm_field_int(rdata, UVM_DEFAULT)
    \`uvm_field_int(wr,    UVM_DEFAULT)
  \`uvm_object_utils_end

  function new(string name = "reg_item"); super.new(name); endfunction

  virtual function string convert2str();
    return $sformatf("addr=0x%0h wr=%0b wdata=0x%0h rdata=0x%0h", addr, wr, wdata, rdata);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "2. Sürücü Uygulaması: reg_driver ve Protokol Handshake Sürüşü",
        content: `Sürücü, bellek kontrolcüsünün seçim (\`sel\`) ve hazır (\`ready\`) el sıkışma protokolünü uygular:

\`\`\`systemverilog
class driver extends uvm_driver #(reg_item);
  \`uvm_component_utils(driver)
  virtual reg_if vif;

  function new(string name = "driver", uvm_component parent = null); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if (!uvm_config_db #(virtual reg_if)::get(this, "", "reg_vif", vif))
      \`uvm_fatal("DRV", "reg_vif bulunamadı!")
  endfunction

  virtual task run_phase(uvm_phase phase);
    super.run_phase(phase);
    forever begin
      reg_item m_item;
      seq_item_port.get_next_item(m_item);
      drive_item(m_item);
      seq_item_port.item_done();
    end
  endtask

  virtual task drive_item(reg_item m_item);
    vif.sel   <= 1;
    vif.addr  <= m_item.addr;
    vif.wr    <= m_item.wr;
    vif.wdata <= m_item.wdata;
    @(posedge vif.clk);
    while (!vif.ready) begin
      \`uvm_info("DRV", "ready sinyali bekleniyor...", UVM_LOW)
      @(posedge vif.clk);
    end
    vif.sel <= 0;
  endtask
endclass
\`\`\``,
      },
      {
        title: "3. İzleyici Tasarımı: reg_monitor ve Arayüz Protokol Paketi Çözümleme",
        content: `İzleyici, veriyolu üzerindeki transferleri yakalar. Okuma işlemi yapıldığında okuma verisinin (\`rdata\`) bir saat vuruşu gecikmeyle gelmesini bekler:

\`\`\`systemverilog
class monitor extends uvm_monitor;
  \`uvm_component_utils(monitor)
  uvm_analysis_port #(reg_item) mon_analysis_port;
  virtual reg_if vif;

  function new(string name = "monitor", uvm_component parent = null); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if (!uvm_config_db #(virtual reg_if)::get(this, "", "reg_vif", vif))
      \`uvm_fatal("MON", "reg_vif bulunamadı!")
    mon_analysis_port = new("mon_analysis_port", this);
  endfunction

  virtual task run_phase(uvm_phase phase);
    super.run_phase(phase);
    forever begin
      @(posedge vif.clk);
      if (vif.sel) begin
        reg_item item = new();
        item.addr  = vif.addr;
        item.wr    = vif.wr;
        item.wdata = vif.wdata;
        if (!vif.wr) begin
          @(posedge vif.clk); // Okuma verisi gecikmesi
          item.rdata = vif.rdata;
        end
        \`uvm_info(get_type_name(), $sformatf("Paket yakalandı: %s", item.convert2str()), UVM_LOW)
        mon_analysis_port.write(item);
      end
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Ajan Mimarisi: reg_agent ile Bileşen Kapsülleme",
        content: `Ajan sınıfı, sürücü, dizici ve monitör bileşenlerini standart UVM kalıbıyla bir araya getirir ve TLM bağlantısını kurar:

\`\`\`systemverilog
class agent extends uvm_agent;
  \`uvm_component_utils(agent)
  driver                  d0;
  monitor                 m0;
  uvm_sequencer #(reg_item) s0;

  function new(string name = "agent", uvm_component parent = null); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    s0 = uvm_sequencer #(reg_item)::type_id::create("s0", this);
    d0 = driver::type_id::create("d0", this);
    m0 = monitor::type_id::create("m0", this);
  endfunction

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    d0.seq_item_port.connect(s0.seq_item_export);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. Skor Tahtası Tasarımı: Referans Bellek Modeli (refq) ve Tahminleme",
        content: `Skor tahtası, donanımın davranışını taklit eden dahili bir referans dizi (\`reg_item refq[\`DEPTH]\`) tutar:

\`\`\`systemverilog
class scoreboard extends uvm_scoreboard;
  \`uvm_component_utils(scoreboard)
  reg_item refq[\`DEPTH];
  uvm_analysis_imp #(reg_item, scoreboard) m_analysis_imp;

  function new(string name = "scoreboard", uvm_component parent = null); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    m_analysis_imp = new("m_analysis_imp", this);
  endfunction

  virtual function void write(reg_item item);
    if (item.wr) begin
      // Yazma işlemi: Referans model güncellenir
      refq[item.addr] = item;
      \`uvm_info(get_type_name(), $sformatf("Yazıldı: addr=0x%0h wdata=0x%0h", item.addr, item.wdata), UVM_LOW)
    end else begin
      // Okuma işlemi: Henüz yazılmamışsa varsayılan ('h1234), yazılmışsa refq kontrol edilir
      if (refq[item.addr] == null) begin
        if (item.rdata != 'h1234)
          \`uvm_error(get_type_name(), $sformatf("İlk okuma hatası! addr=0x%0h exp=1234 act=0x%0h", item.addr, item.rdata))
        else
          \`uvm_info(get_type_name(), "BAŞARILI: İlk okuma doğru", UVM_LOW)
      end else if (item.rdata != refq[item.addr].wdata) begin
        \`uvm_error(get_type_name(), $sformatf("UYUŞMAZLIK! addr=0x%0h exp=0x%0h act=0x%0h", item.addr, refq[item.addr].wdata, item.rdata))
      end else begin
        \`uvm_info(get_type_name(), $sformatf("BAŞARILI! addr=0x%0h veri eşleşti: 0x%0h", item.addr, item.rdata), UVM_LOW)
      end
    end
  endfunction
endclass
\`\`\``,
      },
      {
        title: "6. UVM Ortamı: env Sınıfı ve Analiz Portu Bağlantısı",
        content: `Ortam sınıfı (\`env\`), ajanı ve skor tahtasını oluşturup analiz portu üzerinden bağlar:

\`\`\`systemverilog
class env extends uvm_env;
  \`uvm_component_utils(env)
  agent      a0;
  scoreboard sb0;

  function new(string name = "env", uvm_component parent = null); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    a0  = agent::type_id::create("a0", this);
    sb0 = scoreboard::type_id::create("sb0", this);
  endfunction

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Monitörün analiz portu skor tahtasının uvm_analysis_imp portuna bağlanır
    a0.m0.mon_analysis_port.connect(sb0.m_analysis_imp);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Kapsamlı UVM Testbench Projesi 1: Kayıtçıl Bellek Denetleyicisi (Register Memory Controller)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-testbench-example-1.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class reg_item extends uvm_sequence_item;
  rand bit [\`ADDR_WIDTH-1:0]  	addr;
  rand bit [\`DATA_WIDTH-1:0] 	wdata;
  rand bit 						wr;
  bit [\`DATA_WIDTH-1:0] 		rdata;  

  // Use utility macros to implement standard functions
  // like print, copy, clone, etc
  \`uvm_object_utils_begin(reg_item)
  	\`uvm_field_int (addr, UVM_DEFAULT)
  	\`uvm_field_int (wdata, UVM_DEFAULT)
  	\`uvm_field_int (rdata, UVM_DEFAULT)
  	\`uvm_field_int (wr, UVM_DEFAULT)
  \`uvm_object_utils_end
  
  virtual function string convert2str();
    return $sformatf("addr=0x%0h wr=0x%0h wdata=0x%0h rdata=0x%0h", addr, wr, wdata, rdata);
  endfunction
  
  function new(string name = "reg_item");
    super.new(name);
  endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Kapsamlı UVM Testbench Projesi 1: Kayıtçıl Bellek Denetleyicisi (Register Memory Controller)",
      initialCode: `class reg_item extends uvm_sequence_item;
  rand bit [\`ADDR_WIDTH-1:0]  	addr;
  rand bit [\`DATA_WIDTH-1:0] 	wdata;
  rand bit 						wr;
  bit [\`DATA_WIDTH-1:0] 		rdata;  

  // Use utility macros to implement standard functions
  // like print, copy, clone, etc
  \`uvm_object_utils_begin(reg_item)
  	\`uvm_field_int (addr, UVM_DEFAULT)
  	\`uvm_field_int (wdata, UVM_DEFAULT)
  	\`uvm_field_int (rdata, UVM_DEFAULT)
  	\`uvm_field_int (wr, UVM_DEFAULT)
  \`uvm_object_utils_end
  
  virtual function string convert2str();
    return $sformatf("addr=0x%0h wr=0x%0h wdata=0x%0h rdata=0x%0h", addr, wr, wdata, rdata);
  endfunction
  
  function new(string name = "reg_item");
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
        "UVM_INFO @ 10: uvm_test_top [RUN] Kapsamlı UVM Testbench Projesi 1: Kayıtçıl Bellek Denetleyicisi (Register Memory Controller) doğrulaması başarıyla tamamlandı.",
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
      question: "Kayıtçıl bellek skor tahtasında (`scoreboard`), `write()` fonksiyonu çağrıldığında okuma (`!item.wr`) işlemi için referans model kontrolü nasıl gerçekleştirilir?",
      options: ["Skor tahtası DUT register'larına backdoor force uygulayarak değeri doğrudan okur.", "Dahili `refq` dizisinde o adrese daha önce yazılmış bir nesne olup olmadığına bakar; yazılmışsa `item.rdata` ile `refq[addr].wdata` değerini karşılaştırır.", "Skor tahtası diziciye yeni bir okuma dizisi (`sequence`) tetikler.", "Skor tahtası simülasyonu sonlandırır ve `report_phase` aşamasını çağırır."],
      correctIndex: 1,
      explanation: "Skor tahtası bir referans model (`refq`) tutar. Yazma işlemlerinde yazılan veriyi bu diziye kaydeder. Okuma işlemi geldiğinde ise DUT'den okunan verinin (`item.rdata`), referans bellekte o adrese saklanmış olan yazma verisiyle (`refq[item.addr].wdata`) birebir aynı olduğunu denetler.",
    },
  },
  "uvm-testbench-example-2": {
    id: "uvm-testbench-example-2",
    badge: "Modül 14 • Uçtan Uca UVM Testbench Projeleri",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Kapsamlı UVM Testbench Projesi 2: Yönlendirici Anahtar (1-to-2 Switch Router)",
    subtitle: "Tek girişten adres aralığına göre iki çıkış portuna yönlendiren Switch tasarımının paralel izleme ve çoklu kontrol skor tahtası ile testi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/tb_top.png)`,
      },
      {
        title: "1. İşlem Öğesi Mimarisi: switch_item ve Çıkış Port Alanları",
        content: `1 giriş ve 2 çıkış (Port A ve Port B) portuna sahip bir anahtarlama devresi için \`switch_item\` sınıfı modellenir:

\`\`\`systemverilog
class switch_item extends uvm_sequence_item;
  rand bit [7:0] addr;
  rand bit [15:0] data;

  // Çıkış portlarından yakalanan değerler
  bit [7:0]  addr_a, addr_b;
  bit [15:0] data_a, data_b;

  \`uvm_object_utils_begin(switch_item)
    \`uvm_field_int(addr,   UVM_DEFAULT)
    \`uvm_field_int(data,   UVM_DEFAULT)
    \`uvm_field_int(addr_a, UVM_DEFAULT)
    \`uvm_field_int(data_a, UVM_DEFAULT)
    \`uvm_field_int(addr_b, UVM_DEFAULT)
    \`uvm_field_int(data_b, UVM_DEFAULT)
  \`uvm_object_utils_end

  function new(string name = "switch_item"); super.new(name); endfunction
endclass
\`\`\`

Bu modelde hem giriş verisi hem de yönlendirilmesi beklenen çıkış portu verileri tek bir transfer paketinde birleştirilerek skor tahtasında karşılaştırma kolaylığı sağlanır.`,
      },
      {
        title: "2. Sürücü Tasarımı: switch_driver ile Arayüz Sürüşü",
        content: `Sürücü, geçerlilik (\`vld\`) sinyalini bir saat vuruşu boyunca yüksek tutarak adres ve veriyi anahtara uygular:

\`\`\`systemverilog
class driver extends uvm_driver #(switch_item);
  \`uvm_component_utils(driver)
  virtual switch_if vif;

  function new(string name = "driver", uvm_component parent = null); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if (!uvm_config_db #(virtual switch_if)::get(this, "", "switch_vif", vif))
      \`uvm_fatal("DRV", "switch_vif bulunamadı!")
  endfunction

  virtual task run_phase(uvm_phase phase);
    super.run_phase(phase);
    forever begin
      switch_item m_item;
      seq_item_port.get_next_item(m_item);
      drive_item(m_item);
      seq_item_port.item_done();
    end
  endtask

  virtual task drive_item(switch_item m_item);
    vif.vld  <= 1;
    vif.addr <= m_item.addr;
    vif.data <= m_item.data;
    @(posedge vif.clk);
    vif.vld  <= 0;
  endtask
endclass
\`\`\``,
      },
      {
        title: "3. İzleyici Mimarisi: switch_monitor, Semafor ve Paralel Örnekleme",
        content: `Monitör, giriş portunun yanı sıra eşzamanlı olarak çıkış portlarını (Port A ve Port B) örnekler. Paylaşılan kaynakları yönetmek ve işlem bütünlüğünü korumak için \`semaphore\` mekanizması kullanılır:

\`\`\`systemverilog
class monitor extends uvm_monitor;
  \`uvm_component_utils(monitor)
  uvm_analysis_port #(switch_item) mon_analysis_port;
  virtual switch_if vif;
  semaphore sema4;

  function new(string name = "monitor", uvm_component parent = null); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if (!uvm_config_db #(virtual switch_if)::get(this, "", "switch_vif", vif))
      \`uvm_fatal("MON", "switch_vif bulunamadı!")
    sema4 = new(1);
    mon_analysis_port = new("mon_analysis_port", this);
  endfunction

  virtual task run_phase(uvm_phase phase);
    super.run_phase(phase);
    fork
      sample_port("Thread0");
      sample_port("Thread1");
    join
  endtask

  virtual task sample_port(string tag = "");
    forever begin
      @(posedge vif.clk);
      if (vif.rstn & vif.vld) begin
        switch_item item = new();
        sema4.get();
        item.addr = vif.addr;
        item.data = vif.data;
        @(posedge vif.clk);
        sema4.put();
        item.addr_a = vif.addr_a;
        item.data_a = vif.data_a;
        item.addr_b = vif.addr_b;
        item.data_b = vif.data_b;
        mon_analysis_port.write(item);
      end
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Ajan Konteyneri: switch_agent",
        content: `Ajan sınıfı, switch protokolü için gerekli transactor sınıflarını hiyerarşik olarak kapsüller:

\`\`\`systemverilog
class agent extends uvm_agent;
  \`uvm_component_utils(agent)
  driver                     d0;
  monitor                    m0;
  uvm_sequencer #(switch_item) s0;

  function new(string name = "agent", uvm_component parent = null); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    s0 = uvm_sequencer #(switch_item)::type_id::create("s0", this);
    d0 = driver::type_id::create("d0", this);
    m0 = monitor::type_id::create("m0", this);
  endfunction

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    d0.seq_item_port.connect(s0.seq_item_export);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. Skor Tahtası Kontrol Mantığı: Adres Bazlı Yönlendirme Denetimi",
        content: `Tasarım spesifikasyonuna göre adresi \`0\` ile \`0x3F\` arasında olan paketler Port A'ya, \`0x3F\` üzerindeki paketler ise Port B'ye yönlendirilmelidir:

\`\`\`systemverilog
class scoreboard extends uvm_scoreboard;
  \`uvm_component_utils(scoreboard)
  uvm_analysis_imp #(switch_item, scoreboard) m_analysis_imp;

  function new(string name = "scoreboard", uvm_component parent = null); super.new(name, parent); endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    m_analysis_imp = new("m_analysis_imp", this);
  endfunction

  virtual function void write(switch_item item);
    if (item.addr inside {[0:'h3F]}) begin
      // Port A yönlendirme denetimi
      if (item.addr_a != item.addr || item.data_a != item.data)
        \`uvm_error("SCBD", $sformatf("PORT A HATASI! Beklenen: addr=0x%0h data=0x%0h, Gelen: addr_a=0x%0h data_a=0x%0h", item.addr, item.data, item.addr_a, item.data_a))
      else
        \`uvm_info("SCBD", "PORT A BAŞARILI: Yönlendirme ve veri doğru", UVM_LOW)
    end else begin
      // Port B yönlendirme denetimi
      if (item.addr_b != item.addr || item.data_b != item.data)
        \`uvm_error("SCBD", $sformatf("PORT B HATASI! Beklenen: addr=0x%0h data=0x%0h, Gelen: addr_b=0x%0h data_b=0x%0h", item.addr, item.data, item.addr_b, item.data_b))
      else
        \`uvm_info("SCBD", "PORT B BAŞARILI: Yönlendirme ve veri doğru", UVM_LOW)
    end
  endfunction
endclass
\`\`\``,
      },
      {
        title: "6. Entegrasyon Ortamı: switch_env ve Sistem Mimarisi",
        content: `Ajan ve skor tahtası \`switch_env\` içinde birleştirilerek testbench tamamlanır. \`mon_analysis_port\` doğrudan skor tahtasının \`m_analysis_imp\` portuna bağlanarak uçtan uca doğrulama boru hattı kurulur.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Kapsamlı UVM Testbench Projesi 2: Yönlendirici Anahtar (1-to-2 Switch Router)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-testbench-example-2.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// This is the base transaction object that will be used
// in the environment to initiate new transactions and 
// capture transactions at DUT interface
class switch_item extends uvm_sequence_item;
  rand bit [7:0]  	addr;
  rand bit [15:0] 	data;
  bit [7:0] 		addr_a;
  bit [15:0] 		data_a;
  bit [7:0] 		addr_b;
  bit [15:0] 		data_b;

  // Use utility macros to implement standard functions
  // like print, copy, clone, etc
  \`uvm_object_utils_begin(switch_item)
  	\`uvm_field_int (addr, UVM_DEFAULT)
  	\`uvm_field_int (data, UVM_DEFAULT)
  	\`uvm_field_int (addr_a, UVM_DEFAULT)
  	\`uvm_field_int (data_a, UVM_DEFAULT)
  	\`uvm_field_int (addr_b, UVM_DEFAULT)
  	\`uvm_field_int (data_b, UVM_DEFAULT)
  \`uvm_object_utils_end
  
  function new(string name = "switch_item");
    super.new(name);
  endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Kapsamlı UVM Testbench Projesi 2: Yönlendirici Anahtar (1-to-2 Switch Router)",
      initialCode: `// This is the base transaction object that will be used
// in the environment to initiate new transactions and 
// capture transactions at DUT interface
class switch_item extends uvm_sequence_item;
  rand bit [7:0]  	addr;
  rand bit [15:0] 	data;
  bit [7:0] 		addr_a;
  bit [15:0] 		data_a;
  bit [7:0] 		addr_b;
  bit [15:0] 		data_b;

  // Use utility macros to implement standard functions
  // like print, copy, clone, etc
  \`uvm_object_utils_begin(switch_item)
  	\`uvm_field_int (addr, UVM_DEFAULT)
  	\`uvm_field_int (data, UVM_DEFAULT)
  	\`uvm_field_int (addr_a, UVM_DEFAULT)
  	\`uvm_field_int (data_a, UVM_DEFAULT)
  	\`uvm_field_int (addr_b, UVM_DEFAULT)
  	\`uvm_field_int (data_b, UVM_DEFAULT)
  \`uvm_object_utils_end
  
  function new(string name = "switch_item");
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
        "UVM_INFO @ 10: uvm_test_top [RUN] Kapsamlı UVM Testbench Projesi 2: Yönlendirici Anahtar (1-to-2 Switch Router) doğrulaması başarıyla tamamlandı.",
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
      question: "Switch yönlendirici tasarımında adresi `0x55` olan bir işlem paketi gönderildiğinde skor tahtası (`scoreboard`) hangi kurala göre doğrulama yapmalıdır?",
      options: ["`addr inside {[0:'h3F]}` kuralına uyduğu için paketin Port A'da (`addr_a`, `data_a`) çıkmasını bekler.", "`0x55` adresi `0x3F`'ten büyük olduğu için paketin Port B'ye (`addr_b`, `data_b`) yönlendirildiğini ve Port B verilerinin eşleştiğini doğrular.", "Paketin her iki porttan aynı anda çıkmasını zorunlu tutar.", "Adres geçersiz olduğu için paketi yok sayar."],
      correctIndex: 1,
      explanation: "Spesifikasyona göre `[0:0x3F]` aralığı Port A'ya, bunun dışındaki adresler ise (`0x55 > 0x3F`) Port B'ye yönlendirilmelidir. Skor tahtası `0x55` adresli bir pakette Port B çıkışını (`addr_b`, `data_b`) orijinal girişle karşılaştırarak doğrular.",
    },
  },
  "uvm-interview-questions-set-1": {
    id: "uvm-interview-questions-set-1",
    badge: "Modül 15 • UVM Teknik Mülakat Soruları ve Çözümleri",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM Mülakat Soruları ve Çözümleri - Set 1: Temel Mimari, RAL ve Fabrika",
    subtitle: "Donanım doğrulama mühendisliği mülakatlarında en sık sorulan temel mimari, RAL modelleri, analiz portları ve fabrika mekanizması.",
    sections: [
      {
        title: "1. Soru 1: UVM RAL (Register Abstraction Layer) Nedir ve Neden Kullanılır?",
        content: `**Cevap:**
RAL (Kayıtçı Soyutlama Katmanı), bir donanım tasarımındaki (DUT) kontrol ve durum yazmaçlarını (CSR - Control & Status Registers) ve bellek bloklarını nesne yönelimli sınıflar olarak modelleyen güçlü bir UVM kütüphanesidir.

**Neden Gereklidir?**
- **Protokolden Bağımsızlık:** Yazmaçlara yazma ve okuma işlemleri (\`reg.write()\`, \`reg.read()\`) soyut API'ler ile yapılır. Alt taraftaki veri yolu AXI, APB veya TileLink olsa dahi test senaryosu değişmez.
- **Aynalanan Değer (Mirrored Value):** RAL, DUT içindeki her yazmacın simülasyondaki güncel değerini yerel bir kopya (\`m_mirrored\`) olarak tutar. Böylece yazmaçların beklenen durumu her an bilinir.
- **Hazır Doğrulama Testleri:** Donanım sıfırlama testi (\`uvm_reg_hw_reset_seq\`), bit çarpışma testi (\`uvm_reg_bit_bash_seq\`) gibi standart testler tek satır kod yazmadan otomatik koşturulabilir.`,
      },
      {
        title: "2. Soru 2: p_sequencer Nedir, m_sequencer'dan Farkı Nedir ve Nerede Kullanılır?",
        content: `**Cevap:**
- \`m_sequencer\`: Her \`uvm_sequence\` içinde otomatik olarak bulunan ve temel \`uvm_sequencer_base\` türünde olan bir işaretçidir.
- \`p_sequencer\`: Dizinin koşturulduğu somut, kullanıcı tanımlı dizici türüne (\`my_sequencer\`) işaret eden tip korumalı (type-safe) tanıtıcıdır. \`\` \`uvm_declare_p_sequencer(my_sequencer) \`\` makrosu ile bildirilir.

**Nerede Kullanılır?**
Özellikle **Sanal Dizilerde (Virtual Sequences)** kullanılır. Sanal dizi, ortamdaki alt dizicilere (örneğin \`p_sequencer.axi_seqr\`, \`p_sequencer.uart_seqr\`) veya dizicideki özel konfigürasyon değişkenlerine erişmek istediğinde \`p_sequencer\` kullanılarak manuel \`$cast\` zahmetinden ve riskinden kurtulunur.`,
      },
      {
        title: "3. Soru 3: TLM Analiz Portu (uvm_analysis_port) Nedir ve Standart TLM Portlarından Farkı Nedir?",
        content: `**Cevap:**
Analiz portu (\`uvm_analysis_port\`), 1'e çok (1-to-many / broadcast) yayın yapabilen ve bloklayıcı olmayan (non-blocking) bir TLM mekanizmasıdır.

**Standart TLM Portlarından Farkları:**
1. **Bağlantı Sayısı:** Standart TLM portları (put/get) 1'e 1 bağlantı zorunluluğuna sahiptir. Analiz portuna ise 0, 1 veya onlarca bileşen bağlanabilir.
2. **Hata Üretmeme:** Analiz portuna hiçbir dinleyici bağlanmasa dahi \`write()\` çağrısı simülasyon hatası üretmez.
3. **Kullanım Yeri:** İzleyicilerin (monitors) yakaladıkları işlemleri skor tahtalarına (\`scoreboard\`), kapsama toplayıcılarına (\`coverage\`) ve loglayıcılara aynı anda dağıtması için standart yöntemdir.`,
      },
      {
        title: "4. Soru 4: SystemVerilog new() ile UVM create() Metotları Arasındaki Fark Nedir?",
        content: `**Cevap:**
- \`new()\`: Standart SystemVerilog yapıcı metodudur. Doğrudan çağrıldığında belirtilen sınıfın katı (hardcoded) bir örneğini üretir. Kod sonradan değiştirilemez veya ezilemez.
- \`create()\`: UVM Fabrikası (\`factory\`) üzerinden nesne üretir (\`component::type_id::create()\`). Fabrika tablosunu kontrol eder; eğer bir test sınıfında o bileşen için bir ezme kuralı (\`factory override\`) tanımlanmışsa, orijinal sınıf yerine türetilmiş yeni sınıfın nesnesini dinamik olarak döndürür.`,
      },
      {
        title: "5. Soru 5: UVM Metodolojisi SystemVerilog Dilinden Bağımsız mıdır?",
        content: `**Cevap:**
Hayır. Standart UVM (IEEE 1800.2), tamamen SystemVerilog dilinin nesne yönelimli programlama (OOP), sanal arayüzler (virtual interfaces), DPI-C ve kısıtlı rastgelelik (CRV) yetenekleri üzerine inşa edilmiş bir sınıf kütüphanesidir. SystemVerilog desteklemeyen bir EDA simülatöründe UVM koşturulamaz.
*(Not: Akademik veya deneysel Python [pyuvm] ya da SystemC türevleri bulunsa da endüstri standardı UVM doğrudan IEEE 1800 SystemVerilog'a bağımlıdır).* `,
      },
      {
        title: "6. Soru 6: Bir Sınıfı UVM Fabrikasına (Factory) Kaydettirmek Neden Gereklidir?",
        content: `**Cevap:**
Bir sınıfı \`\` \`uvm_component_utils \`\` veya \`\` \`uvm_object_utils \`\` makrosuyla fabrikaya kaydettirmek şunları sağlar:
1. Sınıfın \`type_id::create()\` ile dinamik olarak oluşturulabilmesi,
2. Test sınıflarından \`set_type_override\` veya \`set_inst_override\` ile bileşenlerin kod değiştirilmeden ezilebilmesi,
3. UVM hiyerarşisi, hata mesajları ve raporlama altyapısında sınıfın tip adının (\`get_type_name()\`) otomatik olarak çözümlenebilmesi.`,
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Mülakat Soruları ve Çözümleri - Set 1: Temel Mimari, RAL ve Fabrika",
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
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Mülakat Soruları ve Çözümleri - Set 1: Temel Mimari, RAL ve Fabrika doğrulaması başarıyla tamamlandı.",
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
      question: "Bir UVM dizisinde `p_sequencer` tanıtıcısını kullanabilmek için hangi makro çağrılmalıdır ve bu işaretçinin `m_sequencer`'a göre temel avantajı nedir?",
      options: ["`uvm_component_utils`; avantajı dizinin `build_phase` aşamasında çalışmasıdır.", "`uvm_declare_p_sequencer(MY_SEQUENCER)`; avantajı dizici türüne tip korumalı (type-safe) erişim sağlayarak manuel cast yapmadan dizicideki nesnelere erişebilmesidir.", "`uvm_field_utils`; avantajı dizicinin tüm kayıtçılarını otomatik kopyalamasıdır.", "`uvm_sequence_action`; avantajı dizinin birden fazla saat bölgesinde çalışmasını sağlamasıdır."],
      correctIndex: 1,
      explanation: "`` `uvm_declare_p_sequencer(MY_SEQR) `` makrosu, genel `uvm_sequencer_base` türündeki `m_sequencer` işaretçisini hedef türdeki `p_sequencer`'a otomatik olarak cast eder. Böylece dizici içerisindeki özel değişkenlere veya alt dizicilere doğrudan ve güvenli biçimde erişilir.",
    },
  },
  "uvm-interview-questions-set-2": {
    id: "uvm-interview-questions-set-2",
    badge: "Modül 15 • UVM Teknik Mülakat Soruları ve Çözümleri",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM Mülakat Soruları ve Çözümleri - Set 2: Fazlar, Diziler ve Makrolar",
    subtitle: "UVM fazlama sırası, sanal diziler (virtual sequence), `uvm_do makroları, sequence_item farkı ve özel fazlar.",
    sections: [
      {
        title: "1. Soru 1: UVM'deki Simülasyon Fazları (Phases) Nelerdir ve Hangi Sırayla Çalışırlar?",
        content: `**Cevap:**
UVM fazları simülasyonun adım adım düzenli ilerlemesini sağlar ve üç ana gruba ayrılır:

1. **Derleme/Kurulum Fazları (Fonksiyon, Sıfır Zaman):**
   - \`build_phase\` (**Yukarıdan Aşağıya - Top-Down**): Hiyerarşideki bileşenler ve konfigürasyonlar oluşturulur.
   - \`connect_phase\` (**Aşağıdan Yukarıya - Bottom-Up**): TLM portları ve sanal arayüzler bağlanır.
   - \`end_of_elaboration_phase\` ve \`start_of_simulation_phase\` (Bottom-Up).
2. **Çalışma Fazı (Görev / Task, Simülasyon Zamanı Tüketir):**
   - \`run_phase\`: Tüm bileşenlerde paralel çalışır. Kendi içinde \`reset\`, \`configure\`, \`main\`, \`shutdown\` gibi 12 alt çalışma fazına (sub-phases) ayrılabilir.
3. **Temizlik ve Raporlama Fazları (Fonksiyon, Sıfır Zaman, Bottom-Up):**
   - \`extract_phase\`, \`check_phase\`, \`report_phase\` ve \`final_phase\`.`,
      },
      {
        title: "2. Soru 2: Sanal Dizi (Virtual Sequence) ve Sanal Dizici (Virtual Sequencer) Nedir?",
        content: `**Cevap:**
- **Sanal Dizici (\`virtual sequencer\`):** Fiziksel bir sürücüye (driver) bağlı değildir; görevi ortamdaki farklı ajanların dizicilerine (\`axi_seqr\`, \`pcie_seqr\`, \`uart_seqr\`) ait tanıtıcıları (handles) merkezi olarak barındırmaktır.
- **Sanal Dizi (\`virtual sequence\`):** Doğrudan işlem nesnesi (item) üretip pin sürmez. Bunun yerine, barındırdığı senaryo mantığıyla birden fazla ajanın dizilerini eşgüdümlü olarak ilgili fiziksel diziciler üzerinde başlatır (örneğin önce PCIe üzerinden konfigürasyon yap, sonra AXI üzerinden veri akıt).`,
      },
      {
        title: "3. Soru 3: `uvm_do ile `uvm_send Makroları Arasındaki Fark Nedir?",
        content: `**Cevap:**
- \`\` \`uvm_do(item) \`\`: İşlem yaşam döngüsünün tamamını otomatik yönetir: Fabrika ile nesneyi oluşturur (\`create\`), \`start_item()\` çağırır, nesneyi rastgeleleştirir (\`randomize\`) ve \`finish_item()\` ile sürücüye iletir.
- \`\` \`uvm_send(item) \`\`: Nesnenin zaten önceden oluşturulmuş ve rastgeleleştirilmiş olduğunu varsayar. Yalnızca \`start_item()\` ve \`finish_item()\` el sıkışmasını gerçekleştirir.`,
      },
      {
        title: "4. Soru 4: uvm_transaction ile uvm_sequence_item Arasındaki Fark Nedir?",
        content: `**Cevap:**
- \`uvm_transaction\`: UVM'deki ilk temel işlem sınıfıdır; zamanlama bilgisi ve simülatör dalga biçimi kayıt arayüzüne sahiptir. Ancak dizici-sürücü el sıkışmasını ve yanıt mekanizmasını desteklemez. IEEE 1800.2 standardında kullanıcı işlemlerinin doğrudan buradan türetilmesi kullanımdan kaldırılmıştır (deprecated).
- \`uvm_sequence_item\`: \`uvm_transaction\` sınıfından türer; dizici kimliği (\`sequence_id\`), işlem kimliği (\`transaction_id\`) ve el sıkışma metotlarını bünyesinde barındırır. Modern testbench'lerdeki tek geçerli işlem tabanıdır.`,
      },
      {
        title: "5. Soru 5: Donanım Doğrulamasında UVM Kullanmanın Temel Avantajları Nelerdir?",
        content: `**Cevap:**
1. **Modülerlik ve Yeniden Kullanılabilirlik (VIP):** Blok seviyesinde yazılan bir ajan SoC seviyesine taşınabilir.
2. **Standart Mimari:** Farklı şirket veya ekiplerden gelen mühendisler aynı testbench yapısını hemen anlar.
3. **UVM Fabrikası:** Testleri yeniden derlemeden bileşen davranışları dinamik olarak ezilebilir.
4. **Kapsamlı Raporlama ve Verbosity:** Hata ayıklama log seviyeleri komut satırından kontrol edilir.
5. **Otomatik Fazlama ve Objection:** Testin ne zaman sonlanacağı hatasız yönetilir.`,
      },
      {
        title: "6. Soru 6: UVM'de Kullanıcı Tanımlı Özel Bir Faz (User-Defined Phase) Oluşturulabilir mi?",
        content: `**Cevap:**
Evet, mümkündür. \`uvm_task_phase\` (zaman tüketen) veya \`uvm_topdown_phase\` / \`uvm_bottomup_phase\` (fonksiyon) temel sınıflarından türeyen yeni bir faz sınıfı tanımlanır. İçerisinde \`exec_task()\` veya \`exec_func()\` metodu gerçeklenir ve bu faz \`uvm_domain\` nesnesi üzerinden mevcut faz çizelgesine \`add()\`, \`add_before()\` veya \`add_after()\` metotlarıyla eklenir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Mülakat Soruları ve Çözümleri - Set 2: Fazlar, Diziler ve Makrolar** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-interview-questions-set-2.sv - Örnek UVM Doğrulama Kodu",
          snippet: `set_config_int(...) => uvm_config_db#(uvm_bitstream_t)::set(cntxt,...)
set_config_string(...) => uvm_config_db#(string)::set(cntxt,...)
set_config_object(...) => uvm_config_db#(uvm_object)::set(cntxt,...)`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Mülakat Soruları ve Çözümleri - Set 2: Fazlar, Diziler ve Makrolar",
      initialCode: `set_config_int(...) => uvm_config_db#(uvm_bitstream_t)::set(cntxt,...)
set_config_string(...) => uvm_config_db#(string)::set(cntxt,...)
set_config_object(...) => uvm_config_db#(uvm_object)::set(cntxt,...)`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Mülakat Soruları ve Çözümleri - Set 2: Fazlar, Diziler ve Makrolar doğrulaması başarıyla tamamlandı.",
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
      question: "UVM fazlama mekanizmasında `build_phase` ile `connect_phase` aşamalarının hiyerarşik çalışma sıralaması nasıldır?",
      options: ["`build_phase` yukarıdan aşağıya (top-down), `connect_phase` aşağıdan yukarıya (bottom-up) çalışır.", "Her iki faz da simülasyon zamanı tüketen görevlerdir (task) ve paralel çalışırlar.", "`build_phase` aşağıdan yukarıya (bottom-up), `connect_phase` yukarıdan aşağıya (top-down) çalışır.", "`build_phase` yalnızca `uvm_test` içinde çalışır, alt bileşenlerde çalışmaz."],
      correctIndex: 0,
      explanation: "`build_phase` aşamasında üst bileşenlerin alt bileşenleri ve konfigürasyonlarını oluşturabilmesi için yukarıdan aşağıya (top-down) sıra şarttır. `connect_phase` aşamasında ise alt bileşenlerin portları hazır olduktan sonra üst bileşenin bunları bağlayabilmesi için aşağıdan yukarıya (bottom-up) yürütülür.",
    },
  },
  "uvm-interview-questions-set-3": {
    id: "uvm-interview-questions-set-3",
    badge: "Modül 15 • UVM Teknik Mülakat Soruları ve Çözümleri",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM Mülakat Soruları ve Çözümleri - Set 3: RTL Erişimi, RAL İleri Düzey ve Hata Ayıklama",
    subtitle: "DUT sinyallerine backdoor erişim, RALGEN otomasyonu, register adaptörleri ve uvm_config_db hata ayıklama stratejileri.",
    sections: [
      {
        title: "1. Soru 1: UVM Bileşen veya Dizilerinden DUT Sinyallerine Nasıl Erişilir?",
        content: `**Cevap:**
İki temel yöntem vardır:
1. **Frontdoor (Ön Kapı - Fiziksel Arayüz):** Testbench top modülünde oluşturulan fiziksel \`interface\` referansı \`uvm_config_db\` aracılığıyla bileşenlere bir \`virtual interface\` olarak aktarılır. Sürücü ve monitörler pinleri bu sanal arayüz üzerinden sürer ve okur.
2. **Backdoor (Arka Kapı - Hiyerarşik HDL Yolu):** Simülasyon zamanı harcamadan dahili yazmaçlara veya net'lere doğrudan erişmek için UVM'in C/DPI tabanlı \`uvm_hdl_force()\`, \`uvm_hdl_deposit()\` ve \`uvm_hdl_read()\` fonksiyonları kullanılır.`,
      },
      {
        title: "2. Soru 2: RALGEN Aracı Nedir ve Kayıtçı Modeli Üretiminde Nasıl Kullanılır?",
        content: `**Cevap:**
RALGEN, EDA sağlayıcıları (örneğin Synopsys) tarafından sunulan bir yazmaç modeli üretim aracıdır.

Donanım spesifikasyonunu içeren IP-XACT (XML), SystemRDL veya CSV dosyalarını girdi olarak alır ve UVM RAL sınıflarını (\`uvm_reg_block\`, \`uvm_reg\`, \`uvm_reg_field\`, \`uvm_mem\`) otomatik olarak SystemVerilog kodu halinde üretir. Binlerce kayıtçısı olan karmaşık çiplerde yazmaç modelinin elle yazılması imkansıza yakın olduğundan RALGEN vazgeçilmez bir araçtır.`,
      },
      {
        title: "3. Soru 3: RAL Modelinde Desired (İstenen) ve Mirrored (Aynalanan) Değerler Ne Anlama Gelir?",
        content: `**Cevap:**
- **Mirrored Value (\`m_mirrored\`):** RAL modelinin DUT içindeki gerçek donanım yazmacında o an bulunduğunu tahmin ettiği güncel değerdir.
- **Desired Value (\`m_desired\`):** Doğrulama mühendisinin veya dizinin, yazmaca yazılmasını hedeflediği değerdir.

\`reg.set(val)\` çağrısı sadece istenen (\`desired\`) değeri günceller, DUT'ye henüz yazmaz. Ardından \`reg.update()\` çağrıldığında, eğer \`desired != mirrored\` ise donanıma fiziksel yazma işlemi tetiklenir ve \`mirrored\` değeri güncellenir.`,
      },
      {
        title: "4. Soru 4: reg2bus ve bus2reg Adaptör Fonksiyonlarının Görevi Nedir?",
        content: `**Cevap:**
RAL modeli protokollerden bağımsız genel bir yapıdır (\`uvm_reg_bus_op\`). Bunu gerçek fiziksel veri yolu protokolüne bağlamak için \`uvm_reg_adapter\` kullanılır:
- \`reg2bus()\`: RAL tarafından üretilen genel yazma/okuma komutunu (\`uvm_reg_bus_op\`), protokole özgü işlem nesnesine (örneğin \`apb_item\` veya \`axi_item\`) dönüştürür.
- \`bus2reg()\`: Veri yolundan dönen yanıt paketini alıp \`uvm_reg_bus_op\` formatına geri dönüştürür; böylece RAL okunan veriyi alır ve aynalanan değerini (\`mirrored\`) günceller.`,
      },
      {
        title: "5. Soru 5: uvm_config_db İsim veya Yol Uyuşmazlığı Sorunları Nasıl Ayıklanır?",
        content: `**Cevap:**
\`uvm_config_db\` hataları (örneğin \`get()\` çağrısının başarısız olması) çalışma zamanında en sık karşılaşılan sorunlardandır. Ayıklamak için:
1. Komut satırına \`+UVM_CONFIG_DB_TRACE\` argümanı eklenir. Bu argüman tüm \`set\` ve \`get\` işlemlerinin zamanını, hiyerarşik yolunu ve eşleşme durumunu konsola döker.
2. \`check_config()\` metodu kullanılarak konfigürasyon veri tabanında eşleşmeyen anahtarlar listelenir.
3. Ayarlanan veri tipi ile çekilen veri tipinin birebir aynı (\`virtual my_if\`) olduğu teyit edilir.`,
      },
      {
        title: "6. Soru 6: Bir UVM Testbench Mimarisindeki Temel Bileşenler Nelerdir?",
        content: `**Cevap:**
Standart bir UVM ortamında şu bileşenler bulunur:
- \`uvm_sequence_item\`: Veri işlem paketi,
- \`uvm_sequence\`: Uyarıcı üreteci,
- \`uvm_sequencer\`: Dizileri koordine eden ve sürücüye sunan arbitratör,
- \`uvm_driver\`: İşlemleri pin seviyesinde süren transactor,
- \`uvm_monitor\`: Pinleri gözlemleyip paketlere dönüştüren izleyici,
- \`uvm_agent\`: Dizici, sürücü ve izleyiciyi kapsayan protokol birimi,
- \`uvm_scoreboard\`: Referans model ve doğruluk denetleyicisi,
- \`uvm_env\`: Ajanlar ve skor tahtalarını barındıran ortam konteyneri,
- \`uvm_test\`: Test senaryolarını ve ortam konfigürasyonunu belirleyen en üst bileşen.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Mülakat Soruları ve Çözümleri - Set 3: RTL Erişimi, RAL İleri Düzey ve Hata Ayıklama** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-interview-questions-set-3.sv - Örnek UVM Doğrulama Kodu",
          snippet: `uvm_hdl_force("top.eatable.fruits.apple.slice", 2);
uvm_hdl_deposit("top.eatable.fruits.apple.slice", 3);
uvm_hdl_read("top.eatable.fruits.apple.slice", rdata);`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Mülakat Soruları ve Çözümleri - Set 3: RTL Erişimi, RAL İleri Düzey ve Hata Ayıklama",
      initialCode: `uvm_hdl_force("top.eatable.fruits.apple.slice", 2);
uvm_hdl_deposit("top.eatable.fruits.apple.slice", 3);
uvm_hdl_read("top.eatable.fruits.apple.slice", rdata);`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Mülakat Soruları ve Çözümleri - Set 3: RTL Erişimi, RAL İleri Düzey ve Hata Ayıklama doğrulaması başarıyla tamamlandı.",
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
      question: "UVM RAL modelinde bir yazmacın `desired` değeri ile `mirrored` değeri arasındaki fark nedir?",
      options: ["`desired` değer donanımdan okunan değerdir, `mirrored` ise reset değeridir.", "`desired` değer testbench'in yazmayı hedeflediği değerdir; `mirrored` değer ise DUT içindeki yazmaçta bulunduğu bilinen güncel kopyadır.", "`desired` değer backdoor erişimde kullanılır, `mirrored` değer frontdoor erişimde kullanılır.", "`mirrored` değer rastgeleleştirilebilen bir alandır, `desired` sabit bir sabittir."],
      correctIndex: 1,
      explanation: "RAL modelinde `desired` değer testbench tarafından yazılmak üzere hedeflenen içeriği temsil eder. `mirrored` değer ise simülasyondaki DUT yazmacının anlık fiziksel durumunu yansıtan altın kopyadır.",
    },
  },
  "uvm-interview-questions-set-4": {
    id: "uvm-interview-questions-set-4",
    badge: "Modül 15 • UVM Teknik Mülakat Soruları ve Çözümleri",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM Mülakat Soruları ve Çözümleri - Set 4: İleri Düzey Mimari, Performans ve Skor Tahtası",
    subtitle: "Kıdemli DV mühendisliği mülakatlarında sorulan TLM-1 vs TLM-2.0, objection optimizasyonu, dizi arbitrasyonu ve fabrika ezme stratejileri.",
    sections: [
      {
        title: "1. Soru 1: TLM-1 ile TLM-2.0 Arasındaki Temel Farklar Nelerdir?",
        content: `**Cevap:**
- **TLM-1:** Nesne tabanlıdır ve put/get/transport gibi sabit arayüzlerle çalışır. Her protokol için farklı veri sınıfları taşır. Yüksek soyutlama sağlar ancak yüksek hızlı sistem simülasyonlarında ve sanal prototiplemede (SystemC entegrasyonu) performans kısıtları vardır.
- **TLM-2.0:** Standart bir genel veri paketi (\`uvm_tlm_generic_payload\`) ve soket (socket) mimarisi kullanır. Bloklayıcı (\`b_transport\`) ve bloklayıcı olmayan (\`nb_transport\`) taşıma mekanizmaları, faz takibi (\`BEGIN_REQ\`, \`END_REQ\`, \`BEGIN_RESP\`, \`END_RESP\`) ve zamansal ayrıştırma (temporal decoupling) sunarak özellikle SoC seviyesinde olağanüstü simülasyon hızları sağlar.`,
      },
      {
        title: "2. Soru 2: UVM Objection Mekanizması Simülasyon Performansını Nasıl Etkiler ve En İyi Uygulamalar Nelerdir?",
        content: `**Cevap:**
Objection mekanizması (\`phase.raise_objection()\` / \`phase.drop_objection()\`), simülasyonun bir fazdan diğerine ne zaman geçeceğini kontrol eder.

**Performans Tuzağı:**
Her bir işlem öğesi (transaction) için sürücünün veya monitörün iç döngüsünde \`raise_objection\` ve \`drop_objection\` çağırmak, hiyerarşik dize aramaları ve durum güncellemeleri nedeniyle simülasyon hızını dramatik şekilde (%30-%50) yavaşlatır.

**En İyi Uygulama (Best Practice):**
Objection çağrıları yalnızca en üst seviyedeki \`uvm_test\` veya ana \`virtual sequence\` seviyesinde, tüm senaryo başlatılırken bir kez kaldırılmalı (\`raise\`) ve senaryo bittiğinde bir kez indirilmelidir (\`drop\`). İç transactor döngülerinde asla objection kullanılmamalıdır.`,
      },
      {
        title: "3. Soru 3: Dizici Arbitrasyonu (Sequencer Arbitration) ve Önceliklendirme Nasıl Yapılır?",
        content: `**Cevap:**
Bir dizici üzerinde aynı anda birden fazla dizi (\`uvm_sequence\`) çalıştığında, hangi dizinin işlem öğesinin sürücüye gideceğini dizici arbitrasyon algoritması belirler.

- \`seqr.set_arbitration(UVM_SEQ_ARB_STRICT_FIFO)\` gibi fonksiyonlarla arbitrasyon modu seçilir.
- Yaygın modlar: \`SEQ_ARB_FIFO\` (varsayılan), \`SEQ_ARB_WEIGHTED\` (ağırlıklı rastgele), \`SEQ_ARB_RANDOM\`, \`SEQ_ARB_STRICT_FIFO\` (en yüksek öncelikli diziyi önce koşturur).
- Dizi tarafında \`start_item(item, priority)\` veya \`seq.start(seqr, parent, priority)\` çağrısıyla öncelik değeri belirlenir.`,
      },
      {
        title: "4. Soru 4: UVM Fabrikasında Tür Bazlı (Type Override) ve Örnek Bazlı (Instance Override) Ezme Farkı Nedir?",
        content: `**Cevap:**
- **Tür Bazlı Ezme (\`set_type_override_by_type\`):** Tüm testbench boyunca o sınıftan üretilecek olan her örneği yeni türetilmiş sınıfla değiştirir. Örneğin tüm standart sürücülerin hatalı paket üreten özel sürücüyle değiştirilmesi.
- **Örnek Bazlı Ezme (\`set_inst_override_by_type\`):** Belirli bir hiyerarşik yola sahip tek bir bileşeni değiştirir. Örneğin \`"top.env.agent0.driver"\` yolundaki sürücü değiştirilirken \`agent1\` içindeki sürücü orijinal kalır.`,
      },
      {
        title: "5. Soru 5: UVM Geri Çağırma (Callback) Mekanizması Nedir ve Hata Enjeksiyonunda Nasıl Kullanılır?",
        content: `**Cevap:**
UVM Callbacks, doğrulanmış ve kapalı bir VIP bileşeninin (örneğin bir PCIe sürücüsü) kaynak kodunu değiştirmeden, çalışma anında araya girip davranışını genişletmeyi sağlayan OOP desenidir.

Sürücü içine \`\` \`uvm_do_callbacks(my_driver, my_driver_cb, pre_send(item)) \`\` kancaları yerleştirilir. Doğrulama mühendisi \`my_driver_cb\` sınıfından türeyip \`pre_send\` metodunu ezerek paketin CRC alanını bozabilir (hata enjeksiyonu - error injection) ve bunu \`uvm_callbacks#(my_driver, my_driver_cb)::add(drv, cb)\` ile sürücüye bağlar.`,
      },
      {
        title: "6. Soru 6: Skor Tahtasında Sıralı (In-Order) ve Sırasız (Out-of-Order) Karşılaştırma Nasıl Tasarlanır?",
        content: `**Cevap:**
- **Sıralı (In-Order) Skor Tahtası:** FIFO mantığıyla çalışan arayüzlerde (örneğin senkron UART, basit FIFO) kullanılır. Beklenen işlemler basit bir SystemVerilog kuyruğuna (\`item q[$]\`) atılır. Monitörden çıkış verisi geldikçe kuyruğun en başındaki elemanla (\`pop_front()\`) karşılaştırılır.
- **Sırasız (Out-of-Order) Skor Tahtası:** AXI (farklı \`ARID/AWID\` işlemleri), PCIe veya yönlendirici anahtarlarda paketler farklı sıralarla dönebilir. Bu durumda skor tahtasında işlem kimliğine (Transaction ID) göre indekslenen bir **ilişkisel dizi (associative array - \`item table[int]\`)** tutulur. Paket geldiğinde kendi kimliğine göre eşleşir ve tablodan silinir. \`check_phase\` aşamasında tabloda sahipsiz paket kalıp kalmadığı doğrulanır.`,
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Mülakat Soruları ve Çözümleri - Set 4: İleri Düzey Mimari, Performans ve Skor Tahtası",
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
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Mülakat Soruları ve Çözümleri - Set 4: İleri Düzey Mimari, Performans ve Skor Tahtası doğrulaması başarıyla tamamlandı.",
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
      question: "UVM testbench'lerinde sürücünün (`uvm_driver`) her paket gönderiminde `raise_objection()` ve `drop_objection()` çağırması neden ciddi bir performans hatası olarak kabul edilir?",
      options: ["Simülatörün saat sinyalini durdurmasına yol açtığı için.", "Objection mekanizmasının hiyerarşik yayılımı ve string aramaları nedeniyle aşırı CPU yükü oluşturarak simülasyon hızını dramatik şekilde yavaşlatması.", "Dizicinin TLM portunu devre dışı bırakması.", "SystemVerilog derleyicisinin syntax hatası vermesi."],
      correctIndex: 1,
      explanation: "Her işlem öğesinde (transaction) objection kaldırmak ve indirmek, simülasyon motorunun hiyerarşik ağacı her seferinde taramasına yol açar ve milyonlarca işlem koşan testlerde devasa bir CPU darboğazı yaratır. Objection yalnızca test seviyesinde veya ana dizi başlatılırken yönetilmelidir.",
    },
  },
};
