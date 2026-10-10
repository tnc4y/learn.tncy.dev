import { LessonContent } from "./lessonsData";

export const UVM_PART3: Record<string, LessonContent> = {
  "how-to-execute-sequences-via-start-method": {
    id: "how-to-execute-sequences-via-start-method",
    badge: "Modül 8 • Diziler (Sequences) ve Sanal Diziciler",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Dizileri: start() Metodu ile Dizi Çalıştırma ve Yaşam Döngüsü",
    subtitle: "UVM dizilerinin start() metodu aracılığıyla yürütülmesi, parametreleri (sequencer, parent, priority, call_pre_post) ve callback kancalarının çalışma sırası.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/seq_hier.png)
![UVM Mimari Şeması](/images/uvm/sequence_flow.png)`,
      },
      {
        title: "1. UVM'de Dizi Yürütme Mimarisi ve start() Metodunun İmzası",
        content: `Universal Verification Methodology (UVM - IEEE 1800.2) standartlarında uyaran üretimi (stimulus generation) işlem seviyesinde (transaction-level) \`uvm_sequence\` sınıfları aracılığıyla gerçekleştirilir. Bir dizinin (\`uvm_sequence\`) bir dizici (\`uvm_sequencer\`) üzerinde koşturulması ve sürücüye (\`uvm_driver\`) işlem paketleri (\`uvm_sequence_item\`) aktarması için en temel, esnek ve nesne yönelimli yöntem \`start()\` metodudur.

\`start()\` metodu, \`uvm_sequence_base\` sınıfında tanımlanmış bir \`virtual task\`'tır ve prototipi şu şekildedir:

\`\`\`systemverilog
virtual task start (
    uvm_sequencer_base sequencer,          // Dizinin bağlanacağı hedef dizici
    uvm_sequence_base  parent_sequence = null, // Varsa bu diziyi başlatan üst dizi
    int                this_priority   = -1,   // Hakemlik öncelik değeri (-1: varsayılan)
    bit                call_pre_post   = 1     // pre_body/post_body çağrı kontrol bayrağı
);
\`\`\`

Bu argümanların görevleri şunlardır:
- **\`sequencer\`**: Dizinin işlem paketlerini göndereceği hedef dizici referansıdır. Sanal dizilerde (\`virtual sequence\`) doğrudan bir sürücüye bağlanılmadığı için bu argümana \`null\` geçilebilir.
- **\`parent_sequence\`**: Bu diziyi çağıran ebeveyn dizinin referansıdır. Hiyerarşik dizi takibinde ve ebeveynin \`pre_do()\`, \`mid_do()\`, \`post_do()\` kancalarını tetiklemede kullanılır. Üst düzey testten çağrılıyorsa \`null\` bırakılır.
- **\`this_priority\`**: Dizicinin hakemlik (\`arbitration\`) kuyruğunda kullanılacak öncelik değeridir. Varsayılan \`-1\`, dizicinin o anki varsayılan önceliğini devralır.
- **\`call_pre_post\`**: Dizinin \`pre_body()\` ve \`post_body()\` kancalarının yürütülüp yürütülmeyeceğini denetleyen 1-bitlik bayraktır (Varsayılan: \`1\`).`,
      },
      {
        title: "2. Dizi Yaşam Döngüsü ve Çalışma Sırası (Execution Lifecycle)",
        content: `Bir dizi üzerinde \`start()\` metodu çağrıldığında UVM motoru katı bir yaşam döngüsü protokolü işletir. Bu döngü esnasında çağrılan metotların kronolojik sırası şu şekildedir:

1. **\`sub_seq.pre_start()\`**: Dizi başlatılmadan önce çalıştırılan kancadır. \`call_pre_post\` bayrağının değerinden bağımsız olarak **her zaman** çağrılır.
2. **\`sub_seq.pre_body()\`**: Yalnızca \`call_pre_post == 1\` olduğunda çağrılır. Genellikle ön hazırlıklar için kullanılır (ancak modern UVM'de faz objection yönetimi için \`pre_start\` önerilir).
3. **\`parent_seq.pre_do(0)\`**: Eğer \`parent_sequence\` tanımlanmışsa, ebeveyn diziye alt dizinin başlamak üzere olduğunu haber verir.
4. **\`parent_seq.mid_do(this)\`**: Ebeveyn diziye, alt dizinin randomizasyonundan hemen sonra bildirim gönderir.
5. **\`sub_seq.body()\`**: Dizinin ana yürütme görevidir. Asıl uyaran senaryosu ve \`uvm_sequence_item\` üretimleri burada gerçekleşir.
6. **\`parent_seq.post_do(this)\`**: Ebeveyn diziye, alt dizinin \`body()\` yürütmesini tamamladığını bildirir.
7. **\`sub_seq.post_body()\`**: Yalnızca \`call_pre_post == 1\` olduğunda çağrılır.
8. **\`sub_seq.post_start()\`**: Dizi sonlanırken her koşulda **mutlaka** çağrılan kapanış kancasıdır.

Aşağıdaki SystemVerilog kodunda tüm bu kancalara log mesajı eklenmiş bir temel dizi görülmektedir:

\`\`\`systemverilog
class base_seq extends uvm_sequence #(uvm_sequence_item);
  \`uvm_object_utils(base_seq)

  function new(string name = "base_seq");
    super.new(name);
  endfunction

  virtual task pre_start();
    \`uvm_info(get_type_name(), "pre_start() calistirildi", UVM_LOW)
  endtask

  virtual task pre_body();
    \`uvm_info(get_type_name(), "pre_body() calistirildi", UVM_LOW)
  endtask

  virtual task pre_do(bit is_item);
    \`uvm_info(get_type_name(), "pre_do() calistirildi", UVM_LOW)
  endtask

  virtual function void mid_do(uvm_sequence_item this_item);
    \`uvm_info(get_type_name(), "mid_do() calistirildi", UVM_LOW)
  endfunction

  virtual task body();
    \`uvm_info(get_type_name(), "body() calistirildi - Asil uyaran akisi", UVM_LOW)
  endtask

  virtual function void post_do(uvm_sequence_item this_item);
    \`uvm_info(get_type_name(), "post_do() calistirildi", UVM_LOW)
  endfunction

  virtual task post_body();
    \`uvm_info(get_type_name(), "post_body() calistirildi", UVM_LOW)
  endtask

  virtual task post_start();
    \`uvm_info(get_type_name(), "post_start() calistirildi", UVM_LOW)
  endtask
endclass
\`\`\``,
      },
      {
        title: "3. call_pre_post Argümanının Etkisi ve Alt Dizi Davranışı",
        content: `\`start()\` metodunun dördüncü argümanı olan \`call_pre_post\`, alt dizi yürütmelerinde kritik bir rol oynar. Bir test sınıfı içerisinden dizi başlatılırken varsayılan değer olan \`1\` kullanılırsa \`pre_body()\` ve \`post_body()\` görevleri yürütülür:

\`\`\`systemverilog
class base_test extends uvm_test;
  \`uvm_component_utils(base_test)
  // ... constructor ve build_phase ...

  virtual task run_phase(uvm_phase phase);
    base_seq bs = base_seq::type_id::create("bs");
    phase.raise_objection(this);
    // call_pre_post varsayilan olarak 1'dir:
    bs.start(m_env.m_seqr);
    phase.drop_objection(this);
  endtask
endclass
\`\`\`

Simülasyon çıktısında sırasıyla şunlar görülür:
\`\`\`text
UVM_INFO @ 0: uvm_test_top.bs [base_seq] pre_start() calistirildi
UVM_INFO @ 0: uvm_test_top.bs [base_seq] pre_body() calistirildi
UVM_INFO @ 0: uvm_test_top.bs [base_seq] body() calistirildi - Asil uyaran akisi
UVM_INFO @ 0: uvm_test_top.bs [base_seq] post_body() calistirildi
UVM_INFO @ 0: uvm_test_top.bs [base_seq] post_start() calistirildi
\`\`\`

Şimdi \`call_pre_post\` argümanını \`0\` yaparak aynı testi çalıştıralım:

\`\`\`systemverilog
bs.start(m_env.m_seqr, null, -1, 0); // call_pre_post = 0
\`\`\`

Bu durumda simülasyon çıktısı:
\`\`\`text
UVM_INFO @ 0: uvm_test_top.bs [base_seq] pre_start() calistirildi
UVM_INFO @ 0: uvm_test_top.bs [base_seq] body() calistirildi - Asil uyaran akisi
UVM_INFO @ 0: uvm_test_top.bs [base_seq] post_start() calistirildi
\`\`\`

Görüldüğü gibi \`pre_body()\` ve \`post_body()\` tamamen atlanmıştır; ancak \`pre_start()\` ve \`post_start()\` halen çalışmaktadır. Bu ayrım, alt diziler çağrıldığında faz objection'larının çift düşürülmesini engellemek için hayati önem taşır.`,
      },
      {
        title: "4. Kalıtım (Inheritance) ve Ebeveyn Dizi (Parent Sequence) Ayrımı",
        content: `Doğrulamaya yeni başlayan mühendislerin en sık karıştırdığı konulardan biri nesne yönelimli kalıtım (\`class child_seq extends base_seq\`) ile çalışma zamanı ebeveyn dizi (\`parent_sequence\`) ilişkisidir.

- **OOP Kalıtımı:** Statik sınıf yapısıdır. \`child1_seq\`, \`base_seq\`'in metotlarını miras alır ve isterse \`pre_body()\` metodunu override edebilir.
- **Parent Sequence:** Dinamik hiyerarşidir. Bir dizinin çalışma anında başka bir dizi tarafından \`start(seqr, this)\` şeklinde çağrılmasıdır.

Aşağıdaki örnekte \`child1_seq\`, \`base_seq\` sınıfından türetilmiştir ve test sınıfı tarafından doğrudan başlatılmıştır:

\`\`\`systemverilog
class child1_seq extends base_seq;
  \`uvm_object_utils(child1_seq)

  function new(string name = "child1_seq");
    super.new(name);
  endfunction

  virtual task pre_body();
    \`uvm_info(get_type_name(), "child1_seq :: pre_body() override edildi", UVM_LOW)
  endtask
endclass
\`\`\`

Test sınıfında \`cs.start(m_env.m_seqr, null)\` çağrıldığında \`parent_sequence\` \`null\`'dır. Polimorfizm gereği \`child1_seq\`'in kendi \`pre_body()\` metodu çalıştırılır. Burada \`parent\` parametresinin \`null\` olması kalıtımı etkilemez; yalnızca çağıran bir üst dizinin olmadığını belirtir.`,
      },
      {
        title: "5. İç İçe Dizi Başlatma (Spawned Sequence Flow) ve Parent Referansı",
        content: `Bir dizinin (\`child1_seq\`) kendi \`body()\` görevi içerisinde başka bir alt diziyi (\`child2_seq\`) başlatması durumunda \`parent_sequence\` parametresinin gücü ortaya çıkar.

Eğer \`child2_seq.start(m_sequencer, null)\` şeklinde \`null\` verilirse:
\`child1_seq\` ve \`child2_seq\` birbirinden habersiz çalışır.

Ancak \`child2_seq.start(m_sequencer, this)\` şeklinde \`this\` (yani \`child1_seq\`) ebeveyn olarak verilirse:
UVM motoru alt dizi çalışırken ebeveyn dizinin \`pre_do()\`, \`mid_do()\` ve \`post_do()\` kancalarını tetikler!

\`\`\`systemverilog
class child2_seq extends base_seq;
  \`uvm_object_utils(child2_seq)

  function new(string name = "child2_seq");
    super.new(name);
  endfunction

  virtual task body();
    \`uvm_info(get_type_name(), "child2_seq :: body() baslatildi", UVM_LOW)
  endtask
endclass

class child1_seq extends base_seq;
  \`uvm_object_utils(child1_seq)

  function new(string name = "child1_seq");
    super.new(name);
  endfunction

  virtual task body();
    child2_seq cs2;
    \`uvm_info(get_type_name(), "child1_seq :: body() icerisindeyiz", UVM_LOW)
    
    cs2 = child2_seq::type_id::create("cs2");
    // 'this' argumani verilerek child1_seq ebeveyn olarak tanitilir:
    cs2.start(m_sequencer, this);

    \`uvm_info(get_type_name(), "child1_seq :: body() tamamlandi", UVM_LOW)
  endtask
endclass
\`\`\`

Bu kod koşturulduğunda simülasyon konsolundaki hiyerarşik akış mükemmel bir şekilde izlenebilir:
\`\`\`text
UVM_INFO @ 0: uvm_test_top.cs [child1_seq] pre_body() calistirildi
UVM_INFO @ 0: uvm_test_top.cs [child1_seq] body() icerisindeyiz
UVM_INFO @ 0: uvm_test_top.cs.cs2 [child2_seq] pre_body() calistirildi
UVM_INFO @ 0: uvm_test_top.cs [child1_seq] pre_do() calistirildi   <-- Parent kancasi tetiklendi!
UVM_INFO @ 0: uvm_test_top.cs [child1_seq] mid_do() calistirildi   <-- Parent kancasi tetiklendi!
UVM_INFO @ 0: uvm_test_top.cs.cs2 [child2_seq] child2_seq :: body() baslatildi
UVM_INFO @ 0: uvm_test_top.cs [child1_seq] post_do() calistirildi  <-- Parent kancasi tetiklendi!
UVM_INFO @ 0: uvm_test_top.cs.cs2 [child2_seq] post_body() calistirildi
UVM_INFO @ 0: uvm_test_top.cs [child1_seq] child1_seq :: body() tamamlandi
UVM_INFO @ 0: uvm_test_top.cs [child1_seq] post_body() calistirildi
\`\`\``,
      },
      {
        title: "6. Doğrulama Mühendisliği İçin Kritik İpuçları ve Best Practices",
        content: `Endüstriyel UVM projelerinde dizi mimarisi tasarlarken şu yönergelere dikkat edilmelidir:

1. **Objection Yönetimi Yeri:**
   Klasik UVM örneklerinde \`starting_phase.raise_objection(this)\` çağrısı bazen \`pre_body()\` içerisine konulurdu. Ancak bir dizi başka bir dizi tarafından \`call_pre_post = 0\` ile çağrıldığında \`pre_body()\` atlandığı için simülasyon objection yükseltilmeden erkenden sonlanabilir. **IEEE 1800.2 standardı gereği objection yönetimi ya test sınıfında ya da dizinin \`pre_start()\` / \`post_start()\` kancalarında yapılmalıdır.**

2. **m_sequencer Referansı:**
   Alt diziler başlatılırken hedef dizici olarak genellikle ebeveyn dizinin sahip olduğu \`m_sequencer\` geçirilir (\`sub_seq.start(m_sequencer, this)\`).

3. **Makrolar vs start():**
   \`uvm_do\` makroları arka planda \`start()\` çağrısı yaparken \`call_pre_post = 0\` değerini zorlar. Eğer alt dizinizin \`pre_body\` / \`post_body\` görevlerine bağımlılığı varsa makro yerine doğrudan açık \`start()\` çağrısı tercih edilmelidir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Dizileri: start() Metodu ile Dizi Çalıştırma ve Yaşam Döngüsü** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "how-to-execute-sequences-via-start-method.sv - Örnek UVM Doğrulama Kodu",
          snippet: `virtual task start ( uvm_sequencer_base   sequencer,
                     uvm_sequence_base    parent_sequence = null,
                     int                  this_priority = -1,
                     bit                  call_pre_post = 1 );`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Dizileri: start() Metodu ile Dizi Çalıştırma ve Yaşam Döngüsü",
      initialCode: `virtual task start ( uvm_sequencer_base   sequencer,
                     uvm_sequence_base    parent_sequence = null,
                     int                  this_priority = -1,
                     bit                  call_pre_post = 1 );`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Dizileri: start() Metodu ile Dizi Çalıştırma ve Yaşam Döngüsü doğrulaması başarıyla tamamlandı.",
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
      question: "UVM'de bir dizinin start() metodunda 'call_pre_post' argümanı 0 yapıldığında hangi kancalar (hook tasks) yürütülmez?",
      options: ["pre_start() ve post_start()", "pre_body() ve post_body()", "pre_do() ve post_do()", "body() ve mid_do()"],
      correctIndex: 1,
      explanation: "call_pre_post argümanı 0 yapıldığında UVM yalnızca pre_body() ve post_body() görevlerini atlar. pre_start() ve post_start() kancaları ise bu bayraktan etkilenmeyerek her koşulda mutlaka çalıştırılır.",
    },
  },
  "how-to-execute-sequences-via-uvm-do-macros": {
    id: "how-to-execute-sequences-via-uvm-do-macros",
    badge: "Modül 8 • Diziler (Sequences) ve Sanal Diziciler",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Dizileri: `uvm_do Makro Ailesi ile Alt Dizi Yürütme",
    subtitle: "start() metoduna alternatif olarak `uvm_do_* makroları ile alt dizilerin çağrılması, önceliklendirme ve kısıt aktarımı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/seq_using_uvm_do.png)
![UVM Mimari Şeması](/images/uvm/seq_execution_uvm_do.png)`,
      },
      {
        title: "1. Makrolarla Dizi Başlatmaya Genel Bakış",
        content: `UVM metodolojisinde diziler (\`uvm_sequence\`) yalnızca doğrudan \`start()\` metodu ile değil, aynı zamanda \`uvm_do\` makro ailesi kullanılarak da yürütülebilir. \`uvm_do\` makroları genellikle \`uvm_sequence_item\` paketlerini sürücüye göndermek için bilinse de, argüman olarak bir \`uvm_sequence\` nesnesi verildiğinde motor otomatik olarak alt dizi çalıştırma moduna geçer.

Bir alt dizi bir makro ile çalıştırıldığında UVM şu adımları otomatik gerçekleştirir:
1. Eğer dizi nesnesi henüz oluşturulmamışsa UVM fabrikası (\`factory\`) üzerinden nesneyi yaratır.
2. Dizi üzerinde inline kısıtlar varsa (\`with { ... }\`) bunları uygulayarak diziyi randomize eder.
3. Dizinin \`start()\` metodunu çağırır.

Ancak burada çok kritik bir mimari detay vardır: **\`uvm_do\` makroları alt dizi başlatırken dahili olarak \`call_pre_post = 0\` argümanını geçer.** Bu durum, alt dizinin \`pre_body()\` ve \`post_body()\` kancalarının çalışmayacağı anlamına gelir!`,
      },
      {
        title: "2. `uvm_do_pri_with ile Alt Dizi Yürütme Mimarisi",
        content: `\`uvm_do_pri_with\` makrosu, hem hakemlik önceliğini (\`priority\`) belirlemeye hem de alt dizinin üyelerine inline kısıtlar (\`constraints\`) uygulamaya olanak tanır:

\`\`\`systemverilog
\`uvm_do_pri_with(SEQ_OR_ITEM, PRIORITY, { CONSTRAINTS })
\`\`\`

Bir alt dizi bu makro ile yürütüldüğünde:
- Alt dizinin \`pre_start()\` görevi çalışır.
- Alt dizinin \`pre_body()\` görevi **atlanır** (\`call_pre_post = 0\`).
- Ebeveyn dizinin \`pre_do()\` ve \`mid_do()\` fonksiyonları tetiklenir.
- Alt dizinin \`body()\` görevi çalıştırılır.
- Ebeveyn dizinin \`post_do()\` fonksiyonu tetiklenir.
- Alt dizinin \`post_body()\` görevi **atlanır**.
- Alt dizinin \`post_start()\` görevi çalışır.`,
      },
      {
        title: "3. Örnek Senaryo: Üç Kademeli Alt Dizi Hiyerarşisi (seq1, seq2, seq3)",
        content: `Aşağıdaki örnekte ortak bir temel sınıftan (\`base_sequence\`) türetilen üç seviyeli bir dizi mimarisi kurulmuştur. \`seq1\` dizisi \`seq2\`'yi, \`seq2\` dizisi ise \`seq3\`'ü \`uvm_do_pri_with\` ile yürütmektedir:

\`\`\`systemverilog
class base_sequence extends uvm_sequence #(my_data);
  \`uvm_object_utils(base_sequence)
  \`uvm_declare_p_sequencer(my_sequencer)

  function new(string name = "base_sequence");
    super.new(name);
  endfunction

  virtual task pre_start();
    \`uvm_info(get_type_name(), "pre_start() calisiyor", UVM_MEDIUM)
  endtask

  virtual task pre_do(bit is_item);
    \`uvm_info(get_type_name(), "pre_do() calisiyor", UVM_MEDIUM)
  endtask

  virtual function void mid_do(uvm_sequence_item this_item);
    \`uvm_info(get_type_name(), "mid_do() calisiyor", UVM_MEDIUM)
  endfunction

  virtual function void post_do(uvm_sequence_item this_item);
    \`uvm_info(get_type_name(), "post_do() calisiyor", UVM_MEDIUM)
  endfunction

  virtual task post_start();
    \`uvm_info(get_type_name(), "post_start() calisiyor", UVM_MEDIUM)
  endtask
endclass

class seq3 extends base_sequence;
  \`uvm_object_utils(seq3)

  function new(string name = "seq3");
    super.new(name);
  endfunction

  virtual task pre_body();
    \`uvm_info(get_type_name(), "seq3 pre_body (ATLANACAK)", UVM_MEDIUM)
  endtask

  virtual task body();
    \`uvm_info("SEQ3", "seq3 body() calisiyor - Islem yapildi", UVM_MEDIUM)
    #10;
  endtask

  virtual task post_body();
    \`uvm_info(get_type_name(), "seq3 post_body (ATLANACAK)", UVM_MEDIUM)
  endtask
endclass

class seq2 extends base_sequence;
  \`uvm_object_utils(seq2)
  seq3 m_seq3;

  function new(string name = "seq2");
    super.new(name);
  endfunction

  virtual task body();
    \`uvm_info("SEQ2", "seq2 body() basladi", UVM_MEDIUM)
    m_seq3 = seq3::type_id::create("m_seq3");
    #10;
    // seq3 alt dizisi makro ile calistiriliyor:
    \`uvm_do_pri_with(m_seq3, -1, {})
    \`uvm_info("SEQ2", "seq2 body() bitti", UVM_MEDIUM)
  endtask
endclass

class seq1 extends base_sequence;
  \`uvm_object_utils(seq1)
  seq2 m_seq2;

  function new(string name = "seq1");
    super.new(name);
  endfunction

  virtual task body();
    \`uvm_info("SEQ1", "seq1 body() basladi", UVM_MEDIUM)
    m_seq2 = seq2::type_id::create("m_seq2");
    #10;
    // seq2 alt dizisi makro ile calistiriliyor:
    \`uvm_do_pri_with(m_seq2, -1, {})
    \`uvm_info("SEQ1", "seq1 body() bitti", UVM_MEDIUM)
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Simülasyon Çıktısı ve Çağrı Sırasının Adım Adım Analizi",
        content: `Bu hiyerarşik yapı çalıştırıldığında simülatör konsolunda şu çıktı üretilir:

\`\`\`text
UVM_INFO @ 0: uvm_test_top.m_seq1 [seq1] pre_start() calisiyor
UVM_INFO @ 0: uvm_test_top.m_seq1 [seq1] seq1 body() basladi
UVM_INFO @ 10: uvm_test_top.m_seq1.m_seq2 [seq2] pre_start() calisiyor
UVM_INFO @ 10: uvm_test_top.m_seq1 [seq1] pre_do() calisiyor
UVM_INFO @ 10: uvm_test_top.m_seq1 [seq1] mid_do() calisiyor
UVM_INFO @ 10: uvm_test_top.m_seq1.m_seq2 [seq2] seq2 body() basladi
UVM_INFO @ 20: uvm_test_top.m_seq1.m_seq2.m_seq3 [seq3] pre_start() calisiyor
UVM_INFO @ 20: uvm_test_top.m_seq1.m_seq2 [seq2] pre_do() calisiyor
UVM_INFO @ 20: uvm_test_top.m_seq1.m_seq2 [seq2] mid_do() calisiyor
UVM_INFO @ 20: uvm_test_top.m_seq1.m_seq2.m_seq3 [seq3] seq3 body() calisiyor - Islem yapildi
UVM_INFO @ 30: uvm_test_top.m_seq1.m_seq2 [seq2] post_do() calisiyor
UVM_INFO @ 30: uvm_test_top.m_seq1.m_seq2.m_seq3 [seq3] post_start() calisiyor
UVM_INFO @ 30: uvm_test_top.m_seq1.m_seq2 [seq2] seq2 body() bitti
UVM_INFO @ 30: uvm_test_top.m_seq1 [seq1] post_do() calisiyor
UVM_INFO @ 30: uvm_test_top.m_seq1.m_seq2 [seq2] post_start() calisiyor
UVM_INFO @ 30: uvm_test_top.m_seq1 [seq1] seq1 body() bitti
UVM_INFO @ 30: uvm_test_top.m_seq1 [seq1] post_start() calisiyor
\`\`\`

Dikkat Edilecek Hususlar:
1. Konsolda hiçbir zaman \`Executing pre_body\` veya \`Executing post_body\` mesajı çıkmamıştır. Çünkü \`uvm_do\` makroları \`call_pre_post=0\` kuralını uygulamıştır.
2. \`seq2\` çalışırken ebeveyni olan \`seq1\`'in \`pre_do\` ve \`mid_do\` fonksiyonları çağrılmıştır.
3. \`seq3\` çalışırken ise doğrudan ebeveyni olan \`seq2\`'nin \`pre_do\` ve \`mid_do\` fonksiyonları çağrılmıştır.`,
      },
      {
        title: "5. Endüstri Standartları ve Makro Kullanımının Değerlendirilmesi",
        content: `UVM doğrulama projelerinde \`uvm_do\` ailesinin kullanımı konusunda iki ana yaklaşım vardır:

- **Makroların Avantajı:** Tek bir satırda nesne yaratımı (\`create\`), önceliklendirme, inline kısıt aktarımı ve çalıştırmayı birleştirerek kod tekrarını azaltır.
- **Makroların Sakıncaları:**
  - Derleyici hata mesajları makro katmanları altında karmaşıklaşır.
  - \`call_pre_post\` bayrağının \`0\` olması nedeniyle, alt dizilerin \`pre_body\` içine yazılmış kodları sessizce atlanır ve zor hata ayıklama (debug) süreçlerine yol açar.
  - Kodun arka planda ne yaptığını gizlediği için kontrol kaybı yaşanabilir.

Modern IEEE 1800.2 UVM pratiklerinde, alt diziler çalıştırılırken genellikle doğrudan \`sub_seq.start(m_sequencer, this)\` metodunun açıkça çağrılması önerilmektedir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Dizileri: \`uvm_do Makro Ailesi ile Alt Dizi Yürütme** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "how-to-execute-sequences-via-uvm-do-macros.sv - Örnek UVM Doğrulama Kodu",
          snippet: `\`define uvm_do_on_pri_with(SEQ_OR_ITEM, SEQR, PRIORITY, CONSTRAINTS)     
  begin                                                                  
  uvm_sequence_base __seq;                                               
  \`uvm_create_on(SEQ_OR_ITEM, SEQR)                                      
  if (!$cast(__seq,SEQ_OR_ITEM)) start_item(SEQ_OR_ITEM, PRIORITY);      
  if ((__seq == null || !__seq.do_not_randomize) && !SEQ_OR_ITEM.randomize() with CONSTRAINTS ) begin 
    \`uvm_warning("RNDFLD", "Randomization failed in uvm_do_with action") 
  end                                                                    
  if (!$cast(__seq,SEQ_OR_ITEM)) finish_item(SEQ_OR_ITEM, PRIORITY);     
  else __seq.start(SEQR, this, PRIORITY, 0);                             
  end`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Dizileri: `uvm_do Makro Ailesi ile Alt Dizi Yürütme",
      initialCode: `\`define uvm_do_on_pri_with(SEQ_OR_ITEM, SEQR, PRIORITY, CONSTRAINTS)     
  begin                                                                  
  uvm_sequence_base __seq;                                               
  \`uvm_create_on(SEQ_OR_ITEM, SEQR)                                      
  if (!$cast(__seq,SEQ_OR_ITEM)) start_item(SEQ_OR_ITEM, PRIORITY);      
  if ((__seq == null || !__seq.do_not_randomize) && !SEQ_OR_ITEM.randomize() with CONSTRAINTS ) begin 
    \`uvm_warning("RNDFLD", "Randomization failed in uvm_do_with action") 
  end                                                                    
  if (!$cast(__seq,SEQ_OR_ITEM)) finish_item(SEQ_OR_ITEM, PRIORITY);     
  else __seq.start(SEQR, this, PRIORITY, 0);                             
  end`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Dizileri: \`uvm_do Makro Ailesi ile Alt Dizi Yürütme doğrulaması başarıyla tamamlandı.",
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
      question: "Bir üst dizi içerisinde `uvm_do_pri_with makrosu ile bir alt dizi çalıştırıldığında alt dizinin pre_body() ve post_body() metotları neden yürütülmez?",
      options: ["Alt dizilerde body() metodu bulunmadığı için.", "`uvm_do makro tanımları alt dizi için dahili olarak start() metodunu call_pre_post = 0 argümanı ile çağırır.", "SystemVerilog makroları görev (task) çağrılarını desteklemediği için.", "Yalnızca sanal diziciler üzerinde çalışan dizilerde pre_body() çağrılabilir."],
      correctIndex: 1,
      explanation: "`uvm_do makro hiyerarşisi, alt dizileri başlatırken start() metoduna call_pre_post = 0 parametresini geçirir. Bu nedenle alt dizinin pre_body() ve post_body() kancaları çağrılmaz.",
    },
  },
  "uvm-do-macros": {
    id: "uvm-do-macros",
    badge: "Modül 8 • Diziler (Sequences) ve Sanal Diziciler",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "`uvm_do Dizi Makrolarının Anatomisi ve Kullanımı",
    subtitle: "UVM doğrulama ortamlarında sequence_item ve sequence üretimini otomatikleştiren `uvm_do makro ailesinin derinlemesine incelenmesi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm_do_macros.png)`,
      },
      {
        title: "1. `uvm_do Makro Ailesine Genel Bakış",
        content: `UVM'de dizilerin (\`uvm_sequence\`) sürücülere (\`uvm_driver\`) uyaran nesneleri (\`uvm_sequence_item\`) aktarması, doğrulama ortamının kalbidir. Bu aktarım klasik yöntemde \`create()\`, \`start_item()\`, \`randomize()\` ve \`finish_item()\` adımlarını içeren dört aşamalı bir protokoldür.

UVM, bu adımları tek satırda birleştirmek amacıyla 8 farklı \`uvm_do\` makrosu sunar:
- **\`uvm_do(item)\`**: Varsayılan dizici üzerinde standart öncelikle öğeyi yaratır, randomize eder ve gönderir.
- **\`uvm_do_pri(item, pri)\`**: Belirtilen öncelik değeri ile işlemi yürütür.
- **\`uvm_do_with(item, { constraints })\`**: Öğeye inline kısıtlar uygulayarak randomize eder ve yürütür.
- **\`uvm_do_pri_with(item, pri, { constraints })\`**: Hem öncelik hem de inline kısıt tanımlayarak yürütür.
- **\`uvm_do_on(item, seqr)\`**: Varsayılan dizici yerine açıkça belirtilen bir dizici (\`seqr\`) üzerinde koşturur.
- **\`uvm_do_on_pri(item, seqr, pri)\`**: Belirtilen dizici ve öncelik ile yürütür.
- **\`uvm_do_on_with(item, seqr, { constraints })\`**: Belirtilen dizici ve kısıtlar ile yürütür.
- **\`uvm_do_on_pri_with(item, seqr, pri, { constraints })\`**: Tüm parametreleri alan ana temel makrodur.`,
      },
      {
        title: "2. Makroların Dahili Mimarisi (`uvm_do_on_pri_with)",
        content: `UVM kaynak kodunda tüm \`uvm_do_*\` makroları aslında en genel makro olan \`uvm_do_on_pri_with\` makrosuna yönlendirilir. Bu temel makronun iç yapısı şu şekildedir:

\`\`\`systemverilog
\`define uvm_do_on_pri_with(SEQ_OR_ITEM, SEQR, PRIORITY, CONSTRAINTS) \\
  begin \\
    uvm_sequence_base __seq; \\
    // 1. Nesne null ise fabrikadan create edilir \\
    \`uvm_create_on(SEQ_OR_ITEM, SEQR) \\
    if (!$cast(__seq, SEQ_OR_ITEM)) begin \\
      // Durum A: Bir uvm_sequence_item ise: \\
      start_item(SEQ_OR_ITEM, PRIORITY); \\
      if (!SEQ_OR_ITEM.randomize() with CONSTRAINTS) begin \\
        \`uvm_warning("RNDFLD", "Randomization failed in uvm_do") \\
      end \\
      finish_item(SEQ_OR_ITEM, PRIORITY); \\
    end else begin \\
      // Durum B: Bir uvm_sequence ise: \\
      if (!__seq.randomize() with CONSTRAINTS) begin \\
        \`uvm_warning("RNDFLD", "Randomization failed in uvm_do") \\
      end \\
      __seq.start(SEQR, this, PRIORITY, 0); \\
    end \\
  end
\`\`\`

Bu genişleme sayesinde tek bir makro satırı hem \`sequence_item\` hem de \`sequence\` tiplerini polimorfik olarak algılayıp doğru protokolü işletebilir.`,
      },
      {
        title: "3. Kapsamlı Kod Örneği: Kısıtlı ve Öncelikli İşlem Üretimi",
        content: `Aşağıdaki örnekte bir temel dizi (\`base_sequence\`), \`my_data\` paketlerini farklı makrolar kullanarak sürücüye iletmektedir:

\`\`\`systemverilog
class my_data extends uvm_sequence_item;
  \`uvm_object_utils(my_data)

  rand bit [7:0] data;
  rand bit [7:0] addr;

  constraint c_addr { addr inside {[8'h00 : 8'hFF]}; }

  function new(string name = "my_data");
    super.new(name);
  endfunction

  function string convert2string();
    return $sformatf("addr=0x%02h data=0x%02h", addr, data);
  endfunction
endclass

class base_sequence extends uvm_sequence #(my_data);
  \`uvm_object_utils(base_sequence)

  function new(string name = "base_sequence");
    super.new(name);
  endfunction

  virtual task body();
    \`uvm_info("BASE_SEQ", "Dizi baslatildi", UVM_MEDIUM)

    // 1. Standart uvm_do: Tamamen rastgele nesne uretimi
    \`uvm_do(req)
    \`uvm_info("BASE_SEQ", $sformatf("Uretilen Paket 1: %s", req.convert2string()), UVM_MEDIUM)

    // 2. uvm_do_with: Inline kisitlar ile spesifik paket uretimi
    \`uvm_do_with(req, { data == 8'h4E; addr == 8'hA1; })
    \`uvm_info("BASE_SEQ", $sformatf("Uretilen Paket 2: %s", req.convert2string()), UVM_MEDIUM)

    // 3. uvm_do_pri: Oncelik degeri 9 olarak ayarlanmis paket
    \`uvm_do_pri(req, 9)
    \`uvm_info("BASE_SEQ", $sformatf("Uretilen Paket 3: %s", req.convert2string()), UVM_MEDIUM)

    // 4. uvm_do_pri_with: Hem oncelik (3) hem inline kisit (data == 8'hC5)
    \`uvm_do_pri_with(req, 3, { data == 8'hC5; })
    \`uvm_info("BASE_SEQ", $sformatf("Uretilen Paket 4: %s", req.convert2string()), UVM_MEDIUM)

    \`uvm_info("BASE_SEQ", "Dizi basariyla tamamlandi", UVM_MEDIUM)
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Simülasyon Sonuçları ve İşlem Doğrulaması",
        content: `Yukarıdaki dizinin çalıştırılması sonucunda konsol günlüğünde (log) üretilen çıktılar incelendiğinde, inline kısıtların başarıyla çalıştığı açıkça görülür:

\`\`\`text
UVM_INFO @ 0: reporter [RNTST] Running test base_test...
UVM_INFO my_seq.sv(22) @ 0: uvm_test_top.env.seqr@@bs [BASE_SEQ] Dizi baslatildi
UVM_INFO my_seq.sv(26) @ 10: uvm_test_top.env.seqr@@bs [BASE_SEQ] Uretilen Paket 1: addr=0x3f data=0x8b
UVM_INFO my_seq.sv(30) @ 20: uvm_test_top.env.seqr@@bs [BASE_SEQ] Uretilen Paket 2: addr=0xa1 data=0x4e
UVM_INFO my_seq.sv(34) @ 30: uvm_test_top.env.seqr@@bs [BASE_SEQ] Uretilen Paket 3: addr=0x12 data=0xf4
UVM_INFO my_seq.sv(38) @ 40: uvm_test_top.env.seqr@@bs [BASE_SEQ] Uretilen Paket 4: addr=0x7c data=0xc5
UVM_INFO my_seq.sv(41) @ 40: uvm_test_top.env.seqr@@bs [BASE_SEQ] Dizi basariyla tamamlandi
\`\`\`

Paket 2'de \`addr\` 0xA1 ve \`data\` 0x4E olarak sabitlenmiş, Paket 4'te ise \`data\` 0xC5 değerini alırken \`addr\` rastgele seçilmiştir.`,
      },
      {
        title: "5. Modern UVM Perspektifi: Makrolar vs Açık Metot Çağrıları",
        content: `Büyük ölçekli ASIC ve SoC doğrulama projelerinde endüstri liderleri (Siemens, Synopsys, Cadence) genellikle \`uvm_do\` makroları yerine açık metot çağrılarını önermektedir:

\`\`\`systemverilog
// Acik metot yaklasimi (Tavsiye Edilen):
req = my_data::type_id::create("req");
start_item(req);
if (!req.randomize() with { addr == 8'hA1; }) begin
  \`uvm_fatal("RND_ERR", "Randomizasyon hatasi!")
end
finish_item(req);
\`\`\`

Açık Metot Yaklaşımının Avantajları:
1. **Late Randomization (Geç Randomizasyon):** \`start_item()\` sürücünün hazır olduğunu onaylayana kadar bloke olur. Sürücü hazır olduktan sonra \`randomize()\` çağrılır; böylece DUT'un o anki en güncel durumuna (ör. FIFO doluluğu, bayraklar) göre kısıtlar çözülür.
2. **Hata Ayıklama Kolaylığı:** Makro genişlemelerinde derleyici hata satırını makronun içine işaret ederken, açık metotta tam satır numarası görünür.
3. **Performans:** Gereksiz tip sorgulamaları (\`$cast\`) yapılmaz.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **\`uvm_do Dizi Makrolarının Anatomisi ve Kullanımı** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-do-macros.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class base_sequence extends uvm_sequence #(my_data);
	\`uvm_object_utils (base_sequence)
	
	...
	virtual task body ();
      \`uvm_info ("BASE_SEQ", $sformatf ("Starting body of %s", this.get_name()), UVM_MEDIUM)
      \`uvm_do (req)
      \`uvm_do_with (req, { data == 8'h4e;
                           addr == 8'ha1; })
      \`uvm_do_pri (req, 9)
      \`uvm_do_pri_with (req, 3, { data == 8'hc5; })
      \`uvm_info ("BASE_SEQ", $sformatf ("Sequence %s is over", this.get_name()), UVM_MEDIUM)
   endtask
	...
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: `uvm_do Dizi Makrolarının Anatomisi ve Kullanımı",
      initialCode: `class base_sequence extends uvm_sequence #(my_data);
	\`uvm_object_utils (base_sequence)
	
	...
	virtual task body ();
      \`uvm_info ("BASE_SEQ", $sformatf ("Starting body of %s", this.get_name()), UVM_MEDIUM)
      \`uvm_do (req)
      \`uvm_do_with (req, { data == 8'h4e;
                           addr == 8'ha1; })
      \`uvm_do_pri (req, 9)
      \`uvm_do_pri_with (req, 3, { data == 8'hc5; })
      \`uvm_info ("BASE_SEQ", $sformatf ("Sequence %s is over", this.get_name()), UVM_MEDIUM)
   endtask
	...
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] \`uvm_do Dizi Makrolarının Anatomisi ve Kullanımı doğrulaması başarıyla tamamlandı.",
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
      question: "`uvm_do_with(req, { data == 8'h4E; })` makrosu bir sequence_item için çalıştırıldığında arka planda hangi metodolojik sıralama izlenir?",
      options: ["start_item() -> create() -> finish_item() -> randomize()", "create() -> start_item() -> randomize() with constraints -> finish_item()", "randomize() -> create() -> start_item() -> finish_item()", "start_item() -> finish_item() -> randomize()"],
      correctIndex: 1,
      explanation: "uvm_do_with makrosu önce nesne var değilse create eder, ardından dizicide hakemlik için start_item() çağırır, kısıtları uygulayarak randomize() eder ve son olarak finish_item() ile sürücüye teslim eder.",
    },
  },
  "sequence-action-macros-for-pre-existing-items": {
    id: "sequence-action-macros-for-pre-existing-items",
    badge: "Modül 8 • Diziler (Sequences) ve Sanal Diziciler",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Önceden Oluşturulmuş Nesneler İçin Dizi Eylem Makroları (`uvm_send`, `uvm_rand_send`)",
    subtitle: "Hali hazırda bellekte yaratılmış işlem nesneleri (pre-existing sequence items) üzerinde `create` çağırmadan işlem yürütme teknikleri.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm_send.png)
![UVM Mimari Şeması](/images/uvm/uvm_send_seq_flow.png)`,
      },
      {
        title: "1. Önceden Oluşturulmuş Nesneler Kavramı ve `uvm_do ile Farkı",
        content: `UVM'de \`uvm_do\` makro ailesi her çağrıldığında parametre olarak verilen nesnenin \`null\` olup olmadığını kontrol eder ve gerekiyorsa UVM fabrikası (\`factory\`) üzerinden yeni bir nesne oluşturur (\`create\`). Ancak birçok ileri seviye doğrulama senaryosunda işlem nesnesi zaten önceden oluşturulmuştur:

- Nesne başka bir kaynaktan (örneğin bir referans modelden veya bir kuyruktan) klonlanmış olabilir.
- Nesnenin alanları döngüsel bir algoritma veya C-DPI modeli tarafından önceden özel olarak doldurulmuş olabilir.
- Yüksek bant genişlikli simülasyonlarda bellek ayırma (dynamic allocation) maliyetini düşürmek için önceden tahsis edilmiş bir nesne havuzu (object pool) kullanılıyor olabilir.

Bu senaryolarda \`uvm_do\` kullanmak tehlikelidir; çünkü makro nesneyi sıfırdan yeniden oluşturabilir ve önceden atanmış tüm özel değerleri ezebilir. İşte bu durumlarda **önceden oluşturulmuş nesne eylem makroları** (\`uvm_send\` ve \`uvm_rand_send\`) devreye girer.`,
      },
      {
        title: "2. Makro Ailesinin Anatomisi: `uvm_send` ve `uvm_rand_send`",
        content: `Bu eylem makroları iki ana gruba ayrılır:

### A. Randomizasyonsuz Gönderim: \`uvm_send_*\`
Bu makrolar nesneyi **randomize etmez**; mevcut değerlerini olduğu gibi sürücüye iletir:
- **\`uvm_send(item)\`**: Önceden oluşturulmuş öğeyi varsayılan öncelikle sürücüye gönderir (\`start_item\` + \`finish_item\`).
- **\`uvm_send_pri(item, pri)\`**: Belirtilen öncelik değeri ile gönderir.

### B. Randomizasyonlu Gönderim: \`uvm_rand_send_*\`
Bu makrolar nesneyi yeniden oluşturmaz (\`create\` çağırmaz), ancak sürücüye teslim etmeden önce **randomize eder**:
- **\`uvm_rand_send(item)\`**: Nesneyi randomize eder ve gönderir.
- **\`uvm_rand_send_pri(item, pri)\`**: Öncelik belirterek randomize eder ve gönderir.
- **\`uvm_rand_send_with(item, { constraints })\`**: Inline kısıtlar uygulayarak randomize eder ve gönderir.
- **\`uvm_rand_send_pri_with(item, pri, { constraints })\`**: Hem öncelik hem inline kısıt ile randomize edip gönderir.`,
      },
      {
        title: "3. İki Aşamalı Dizi Akışı: `uvm_create` + `uvm_send` Mimarisi",
        content: `UVM'de nesne yaratımı ile gönderimini birbirinden ayırmak istendiğinde standart tasarım deseni \`uvm_create\` ile \`uvm_send\` kombinasyonudur:

\`\`\`systemverilog
task body();
  my_packet pkt;

  // 1. Asama: Nesneyi yarat
  \`uvm_create(pkt)

  // 2. Asama: Ozel hesaplamalar yap ve degerleri elle ata
  pkt.header = 32'hDEAD_BEEF;
  pkt.crc    = calculate_custom_crc(pkt.header);

  // 3. Asama: Randomize etmeden aynen gonder
  \`uvm_send(pkt)
endtask
\`\`\`

Bu desen, \`uvm_do\` makrosunun monolitik yapısına kıyasla mühendise işlem paketinin her alanını sürücüye teslim edilmeden önce denetleme ve manipüle etme esnekliği sunar.`,
      },
      {
        title: "4. Kapsamlı Kod Örneği: Paket Yeniden Kullanımı ve Klonlama",
        content: `Aşağıdaki örnekte bir baz paketin klonlanıp belirli alanlarının değiştirilerek \`uvm_send\` ile sürücüye aktarılması gösterilmektedir:

\`\`\`systemverilog
class clone_send_seq extends uvm_sequence #(my_packet);
  \`uvm_object_utils(clone_send_seq)

  my_packet golden_template;

  function new(string name = "clone_send_seq");
    super.new(name);
  endfunction

  virtual task body();
    my_packet cur_pkt;

    // Sablon paketi bir kez olustur ve hazirla
    \`uvm_create(golden_template)
    golden_template.src_ip   = 32'hC0A8_0101; // 192.168.1.1
    golden_template.dest_ip  = 32'hC0A8_0164; // 192.168.1.100
    golden_template.protocol = 8'h06;         // TCP

    for (int i = 0; i < 5; i++) begin
      // Altin sablonu klonla (deep copy)
      $cast(cur_pkt, golden_template.clone());
      cur_pkt.seq_num = i; // Her pakette sira numarasini artir

      \`uvm_info("CLONE_SEQ", $sformatf("Paket %0d gonderiliyor: IP=0x%08h Seq=%0d", 
                i, cur_pkt.dest_ip, cur_pkt.seq_num), UVM_LOW)

      // Onceden hazir nesneyi randomize etmeden surucuye gonder:
      \`uvm_send(cur_pkt)
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "5. Performans, Bellek Yönetimi ve Garbage Collector Tasarrufu",
        content: `Simülasyon performansında bellek yönetimi (memory allocation) en kritik darboğazlardan biridir. Milyonlarca işlemin üretildiği uzun süreli regresyon testlerinde (örneğin 100 Gbps Ethernet veya PCIe Gen5 testleri) her paket için \`new()\` çağrılması SystemVerilog çöp toplayıcısına (Garbage Collector) aşırı yük bindirir.

\`uvm_send\` ve \`uvm_rand_send\` makroları sayesinde tek bir nesne önceden oluşturulup döngü boyunca yeniden kullanılabilir (object reuse):

\`\`\`systemverilog
task body();
  my_packet reused_pkt;
  \`uvm_create(reused_pkt) // Bellekte sadece bir kez yer ayrilir

  repeat (100_000) begin
    // Yeni nesne uretilmez, ayni bellek randomize edilip surulur
    \`uvm_rand_send_with(reused_pkt, { reused_pkt.len inside {[64:1518]}; })
  end
endtask
\`\`\`

Bu yöntem simülasyon hızında %20 ile %40 arasında belirgin bir performans artışı sağlayabilir.`,
      },
      {
        title: "6. Sık Yapılan Hatalar ve Kaçınma Yöntemleri",
        content: `1. **Null Nesne ile \`uvm_send\` Çağırmak:**
   \`uvm_send\` nesne üzerinde \`create\` çağırmaz. Eğer nesne \`null\` iken \`uvm_send\` işletilirse simülatör ölümcül \`Null Pointer Dereference\` hatası vererek çöker. \`uvm_send\` öncesinde nesnenin yaratıldığından emin olunmalıdır.

2. **\`uvm_send\` ile Randomizasyon Beklemek:**
   \`uvm_send\`, randomizasyon yapmaz. Rastgelelik isteniyorsa \`uvm_rand_send\` tercih edilmelidir.

3. **Objection Unutulması:**
   Makrolar sürücü el sıkışmasını yönetse de test aşamasının erken bitmemesi için objection yönetimi mutlaka yapılmalıdır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Önceden Oluşturulmuş Nesneler İçin Dizi Eylem Makroları (\`uvm_send\`, \`uvm_rand_send\`)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "sequence-action-macros-for-pre-existing-items.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class seq1 extends base_sequence;
   \`uvm_object_utils (seq1)

   seq2     m_seq2;           
   my_data  m_data0;          // This data object will be created by us
   my_data  m_data1;          // This data object will be left to uvm_create to create
   my_data  m_data2;          // Will be used with \`uvm_send

   virtual task pre_start ();
      \`uvm_info (get_type_name (), "Executing pre_start()", UVM_MEDIUM)
   endtask

   function new (string name = "seq1");
      super.new (name);
      m_data0 = my_data::type_id::create ("m_data0");
   endfunction

   virtual task body ();
      starting_phase.raise_objection (this);
      \`uvm_info ("SEQ1", "Starting seq1", UVM_MEDIUM)

      // req already exists, but is not instantiated/new()'d. Calling uvm_do will internally 
      // call \`uvm_create and generate the object, randomize it and send to sequencer
      \`uvm_info ("SEQ1", "uvm_do (req) - Create, randomize and send req", UVM_MEDIUM)
      \`uvm_do (req)
      
      // If uvm_do is called again, then the same object will be randomized again and sent
      \`uvm_info ("SEQ1", "uvm_do (req) - Randomize again, and send", UVM_MEDIUM)
      \`uvm_do (req)

      // m_data0 is already created above; so its randomized and sent
      \`uvm_info ("SEQ1", "uvm_do (m_data0) - Data already exists, simply randomize and send", UVM_MEDIUM)
      \`uvm_do (m_data0)
      // m_data1 was not created above, so it will be created, randomized and sent
      \`uvm_info ("SEQ1", "uvm_do (m_data1) - Data was not created, so create it, randomize and send", UVM_MEDIUM)
      \`uvm_do (m_data1)

      // req already exists, but will not be randomized 
      \`uvm_info ("SEQ1", "uvm_send (req) - req already exists from previous create, Send it without randomization", UVM_MEDIUM)
      \`uvm_send (req)

\`ifdef RUNTIME_ERR
      // m_data2 was not created, and will not be created - Runtime Error !
      \`uvm_send (m_data2) 
\`enddif

      \`uvm_info ("SEQ1", "uvm_send (req) - Manually create, randomize and send", UVM_MEDIUM)
      // Create the object, randomize it and  send to sequencer
      \`uvm_create (m_data2)
      void'(m_data2.randomize ());
      \`uvm_send (m_data2)

      \`uvm_info ("SEQ1", "uvm_send_pri (req) - Send with priority", UVM_MEDIUM)
      \`uvm_send_pri (m_data2, 72)
      \`uvm_info ("SEQ1", "Ending seq1", UVM_MEDIUM)

      // Start the next sequence - will be discussed later
      \`uvm_do (m_seq2)
      starting_phase.drop_objection (this);
   endtask

endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Önceden Oluşturulmuş Nesneler İçin Dizi Eylem Makroları (`uvm_send`, `uvm_rand_send`)",
      initialCode: `class seq1 extends base_sequence;
   \`uvm_object_utils (seq1)

   seq2     m_seq2;           
   my_data  m_data0;          // This data object will be created by us
   my_data  m_data1;          // This data object will be left to uvm_create to create
   my_data  m_data2;          // Will be used with \`uvm_send

   virtual task pre_start ();
      \`uvm_info (get_type_name (), "Executing pre_start()", UVM_MEDIUM)
   endtask

   function new (string name = "seq1");
      super.new (name);
      m_data0 = my_data::type_id::create ("m_data0");
   endfunction

   virtual task body ();
      starting_phase.raise_objection (this);
      \`uvm_info ("SEQ1", "Starting seq1", UVM_MEDIUM)

      // req already exists, but is not instantiated/new()'d. Calling uvm_do will internally 
      // call \`uvm_create and generate the object, randomize it and send to sequencer
      \`uvm_info ("SEQ1", "uvm_do (req) - Create, randomize and send req", UVM_MEDIUM)
      \`uvm_do (req)
      
      // If uvm_do is called again, then the same object will be randomized again and sent
      \`uvm_info ("SEQ1", "uvm_do (req) - Randomize again, and send", UVM_MEDIUM)
      \`uvm_do (req)

      // m_data0 is already created above; so its randomized and sent
      \`uvm_info ("SEQ1", "uvm_do (m_data0) - Data already exists, simply randomize and send", UVM_MEDIUM)
      \`uvm_do (m_data0)
      // m_data1 was not created above, so it will be created, randomized and sent
      \`uvm_info ("SEQ1", "uvm_do (m_data1) - Data was not created, so create it, randomize and send", UVM_MEDIUM)
      \`uvm_do (m_data1)

      // req already exists, but will not be randomized 
      \`uvm_info ("SEQ1", "uvm_send (req) - req already exists from previous create, Send it without randomization", UVM_MEDIUM)
      \`uvm_send (req)

\`ifdef RUNTIME_ERR
      // m_data2 was not created, and will not be created - Runtime Error !
      \`uvm_send (m_data2) 
\`enddif

      \`uvm_info ("SEQ1", "uvm_send (req) - Manually create, randomize and send", UVM_MEDIUM)
      // Create the object, randomize it and  send to sequencer
      \`uvm_create (m_data2)
      void'(m_data2.randomize ());
      \`uvm_send (m_data2)

      \`uvm_info ("SEQ1", "uvm_send_pri (req) - Send with priority", UVM_MEDIUM)
      \`uvm_send_pri (m_data2, 72)
      \`uvm_info ("SEQ1", "Ending seq1", UVM_MEDIUM)

      // Start the next sequence - will be discussed later
      \`uvm_do (m_seq2)
      starting_phase.drop_objection (this);
   endtask

endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Önceden Oluşturulmuş Nesneler İçin Dizi Eylem Makroları (\`uvm_send\`, \`uvm_rand_send\`) doğrulaması başarıyla tamamlandı.",
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
      question: "`uvm_send` makrosunun `uvm_do` makrosundan en temel farkı aşağıdakilerden hangisidir?",
      options: ["Nesneyi fabrikadan yeniden oluşturmaz (`create` çağırmaz) ve nesneyi randomize etmez; doğrudan sürücü protokolünü işletir.", "Sürücüye göndermeden önce paketin tüm bitlerini sıfırlar.", "Yalnızca sanal diziciler (virtual sequencer) üzerinde çalıştırılabilir.", "Sürücünün item_done() yanıtını beklemeden asenkron çalışır."],
      correctIndex: 0,
      explanation: "`uvm_send`, önceden bellekte tahsis edilmiş ve değerleri ayarlanmış nesneler içindir. create() ve randomize() adımlarını atlayarak doğrudan start_item() ve finish_item() çağrısı yapar.",
    },
  },
  "uvm-virtual-sequence": {
    id: "uvm-virtual-sequence",
    badge: "Modül 8 • Diziler (Sequences) ve Sanal Diziciler",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Sanal Diziler (Virtual Sequences) ve Çoklu Arayüz Koordinasyonu",
    subtitle: "Farklı arayüzlerin (APB, PCIe, Wishbone vb.) dizilerini tek bir merkezden eşzamanlı ve senkronize şekilde koordine etme sanatı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/vseq.png)`,
      },
      {
        title: "1. Sanal Dizi (Virtual Sequence) Nedir ve Neden İhtiyaç Duyulur?",
        content: `Modern Sayısal Tasarım ve Sistem Çip (SoC) mimarilerinde tek bir veri yolu veya arayüz nadiren bulunur. Tipik bir SoC; bir mikroişlemci veri yolu (ör. AXI), konfigürasyon çevre birimi veri yolu (ör. APB), yüksek hızlı seri arayüz (ör. PCIe) ve bellek denetleyicisi (ör. DDR) gibi birden çok alt sistemi aynı anda barındırır.

Geleneksel bir \`uvm_sequence\` tek bir hedef arayüz için özelleşmiştir ve tek bir dizici (\`uvm_sequencer\`) üzerinden tek bir sürücüye (\`uvm_driver\`) paket gönderir. Ancak sistem seviyesinde bir senaryoyu doğrulamak için farklı protokollerin birbiriyle senkronize çalışması gerekir:
1. Wishbone üzerinden sistemi sıfırlama (Reset işlemi).
2. APB üzerinden dahili register'ları yapılandırma (Configuration).
3. PCIe arayüzünden yüksek hızlı veri paketlerini başlatma (Traffic generation).
4. Eşzamanlı olarak kesme (Interrupt) kontrolü yapma.

Tüm bu bağımsız alt dizileri tek bir merkezden yöneten, zamanlayan ve aralarındaki bağımlılıkları koordine eden üst düzey dizilere **Sanal Dizi (Virtual Sequence)** adı verilir.`,
      },
      {
        title: "2. Sanal Dizi Mimarisi: Sürücüsüz Çalışma İlkesi",
        content: `Sanal bir dizinin en belirgin mimari özelliği, **kendisine doğrudan bağlı bir sürücünün bulunmaması** ve doğrudan \`uvm_sequence_item\` üretmemesidir.

Sanal dizi:
- \`uvm_sequence\` sınıfından türetilir (genellikle varsayılan parametre veya \`uvm_sequence_item\` ile).
- Kendi \`body()\` görevi içerisinde alt arayüzlerin dizilerini (\`apb_config_seq\`, \`pcie_traffic_seq\` vb.) örnekler.
- Bu alt dizileri, ilgili alt sistemlerin fiziksel dizicileri üzerinde \`start()\` metodu ile yürütür.
- Alt dizilerin paralel (\`fork ... join\`) veya sıralı çalışmasını yönetir.

Sanal dizilerin uygulanmasında endüstride iki temel yöntem yaygın olarak kullanılır:
1. **Sanal Dizici (Virtual Sequencer) Kullanan Yöntem**
2. **Sanal Dizicisiz (Doğrudan Referanslı) Yöntem**`,
      },
      {
        title: "3. Yöntem 1: Sanal Dizici (Virtual Sequencer) ve `uvm_declare_p_sequencer Kullanımı",
        content: `Bu yöntemde ortamda bir \`my_virtual_sequencer\` bileşeni bulunur ve sanal dizi \`uvm_declare_p_sequencer\` makrosu ile bu sanal diziciye bağlanır.

\`\`\`systemverilog
class my_virtual_seq extends uvm_sequence;
  \`uvm_object_utils(my_virtual_seq)

  // Sanal dizici tipini p_sequencer olarak tanimla:
  \`uvm_declare_p_sequencer(my_virtual_sequencer)

  apb_rd_wr_seq  m_apb_seq;
  wb_reset_seq   m_wb_seq;
  pcie_gen_seq   m_pcie_seq;

  function new(string name = "my_virtual_seq");
    super.new(name);
  endfunction

  virtual task pre_body();
    // Alt dizileri fabrikadan uret
    m_apb_seq  = apb_rd_wr_seq::type_id::create("m_apb_seq");
    m_wb_seq   = wb_reset_seq::type_id::create("m_wb_seq");
    m_pcie_seq = pcie_gen_seq::type_id::create("m_pcie_seq");
  endtask

  virtual task body();
    \`uvm_info("VSEQ", "Sanal Dizi Baslatildi: Coklu arayuz senaryosu", UVM_LOW)

    // 1. Adim: Wishbone uzerinden reset dizisini calistir
    m_wb_seq.start(p_sequencer.m_wb_seqr);

    // 2. Adim: APB konfigurasyonu ve PCIe trafigini paralel yurut
    fork
      begin
        \`uvm_info("VSEQ", "APB Yapilandirma dizisi baslatiliyor", UVM_LOW)
        m_apb_seq.start(p_sequencer.m_apb_seqr);
      end
      begin
        \`uvm_info("VSEQ", "PCIe Trafik dizisi baslatiliyor", UVM_LOW)
        m_pcie_seq.start(p_sequencer.m_pcie_seqr);
      end
    join

    \`uvm_info("VSEQ", "Sanal Dizi Basariyla Tamamlandi", UVM_LOW)
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Yöntem 2: Sanal Dizici Olmadan (Doğrudan Referanslar ile) Çalıştırma",
        content: `Küçük veya orta ölçekli doğrulama ortamlarında ayrı bir sanal dizici bileşeni oluşturmak yerine, fiziksel dizici tutucuları doğrudan sanal dizinin içerisine yerleştirilebilir:

\`\`\`systemverilog
class direct_vseq extends uvm_sequence;
  \`uvm_object_utils(direct_vseq)

  // Fiziksel dizici tutuculari dogrudan dizi icinde tanimlanir:
  apb_sequencer  m_apb_seqr;
  wb_sequencer   m_wb_seqr;
  pcie_sequencer m_pcie_seqr;

  apb_rd_wr_seq  m_apb_seq;
  wb_reset_seq   m_wb_seq;

  function new(string name = "direct_vseq");
    super.new(name);
  endfunction

  virtual task body();
    m_wb_seq  = wb_reset_seq::type_id::create("m_wb_seq");
    m_apb_seq = apb_rd_wr_seq::type_id::create("m_apb_seq");

    // Tutucular test tarafindan dolduruldugunda calistirilir:
    m_wb_seq.start(m_wb_seqr);
    m_apb_seq.start(m_apb_seqr);
  endtask
endclass
\`\`\`

Test sınıfı bu diziyi koştururken tutucuları ortamdan atar:
\`\`\`systemverilog
virtual task run_phase(uvm_phase phase);
  direct_vseq vseq = direct_vseq::type_id::create("vseq");
  phase.raise_objection(this);

  // Dizici referanslarini dogrudan ata:
  vseq.m_apb_seqr  = m_env.m_apb_agent.m_seqr;
  vseq.m_wb_seqr   = m_env.m_wb_agent.m_seqr;
  vseq.m_pcie_seqr = m_env.m_pcie_agent.m_seqr;

  // Dizici belirtmeksizin (null ile) baslat:
  vseq.start(null);
  phase.drop_objection(this);
endtask
\`\`\`

Karşılaştırma: Bu yaklaşım sanal dizici sınıfı yazma zahmetini ortadan kaldırır; ancak ortam karmaşıklaştıkça ve onlarca sanal dizi yazıldığında her dizide tek tek atama yapmak kod tekrarına yol açar.`,
      },
      {
        title: "5. Sanal Dizilerde En İyi Tasarım Pratikleri (Best Practices)",
        content: `1. **Faz Objection Yönetimi:**
   Sanal diziler test seviyesinde başlatıldığı için \`raise_objection\` ve \`drop_objection\` çağrıları ya testin \`run_phase\` metodunda ya da sanal dizinin \`pre_start\` / \`post_start\` aşamalarında yapılmalıdır. Alt dizilerin tek tek objection alması simülasyon faz yönetimini karmaşıklaştırabilir.

2. **Hata Yakalama ve Zaman Aşımı (Timeout):**
   Paralel çalışan alt dizilerden biri takılırsa (\`fork ... join\`) tüm sanal dizi kilitlenebilir. Kritik alt sistemler için \`fork ... join_any\` ve bir zaman aşımı sayacı (watchdog) mekanizması eklenmesi tavsiye edilir.

3. **Yeniden Kullanılabilirlik (Reusability):**
   Bir IP blok seviyesinde yazılan sanal dizi, alt sistem seviyesinde başka bir sanal dizinin alt dizisi olarak yeniden kullanılabilmelidir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Sanal Diziler (Virtual Sequences) ve Çoklu Arayüz Koordinasyonu** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-virtual-sequence.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class my_virtual_seq extends uvm_sequence;
		\`uvm_object_utils (my_virtual_seq)
		\`uvm_declare_p_sequencer (my_virtual_sequencer)
		
		function new (string name = "my_virtual_seq");
			super.new (name);
		endfunction
		
		apb_rd_wr_seq 	m_apb_rd_wr_seq;
		wb_reset_seq 	m_wb_reset_seq;
		pcie_gen_seq 	m_pcie_gen_seq;
		
		task pre_body();
			m_apb_rd_wr_seq = apb_rd_wr_seq::type_id::create ("m_apb_rd_wr_seq");
			m_wb_reset_seq  = wb_reset_seq::type_id::create ("m_wb_reset_seq");
			m_pcie_gen_seq  = pcie_gen_seq::type_id::create ("m_pcie_gen_seq");
		endtask
		
		task body();
			...
			m_apb_rd_wr_seq.start (p_sequencer.m_apb_seqr);
			fork
				m_wb_reset_seq.start (p_sequencer.m_wb_seqr);
				m_pcie_gen_seq.start (p_sequencer.m_pcie_seqr);
			join 
			...
		endtask
	endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Sanal Diziler (Virtual Sequences) ve Çoklu Arayüz Koordinasyonu",
      initialCode: `class my_virtual_seq extends uvm_sequence;
		\`uvm_object_utils (my_virtual_seq)
		\`uvm_declare_p_sequencer (my_virtual_sequencer)
		
		function new (string name = "my_virtual_seq");
			super.new (name);
		endfunction
		
		apb_rd_wr_seq 	m_apb_rd_wr_seq;
		wb_reset_seq 	m_wb_reset_seq;
		pcie_gen_seq 	m_pcie_gen_seq;
		
		task pre_body();
			m_apb_rd_wr_seq = apb_rd_wr_seq::type_id::create ("m_apb_rd_wr_seq");
			m_wb_reset_seq  = wb_reset_seq::type_id::create ("m_wb_reset_seq");
			m_pcie_gen_seq  = pcie_gen_seq::type_id::create ("m_pcie_gen_seq");
		endtask
		
		task body();
			...
			m_apb_rd_wr_seq.start (p_sequencer.m_apb_seqr);
			fork
				m_wb_reset_seq.start (p_sequencer.m_wb_seqr);
				m_pcie_gen_seq.start (p_sequencer.m_pcie_seqr);
			join 
			...
		endtask
	endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Sanal Diziler (Virtual Sequences) ve Çoklu Arayüz Koordinasyonu doğrulaması başarıyla tamamlandı.",
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
      question: "Sanal bir dizinin (virtual sequence) standart bir diziden en belirgin mimari farkı nedir?",
      options: ["Kendisine doğrudan bağlı bir sürücüsü (driver) yoktur; alt dizileri farklı diziciler üzerinde koordine eder.", "Yalnızca statik değişkenler barındırabilir ve SystemVerilog OOP kurallarına tabi değildir.", "Simülasyon fazlarından yalnızca build_phase aşamasında çalışabilir.", "Randomizasyon kısıtlarını desteklemez."],
      correctIndex: 0,
      explanation: "Sanal dizi, doğrudan fiziksel bir sürücüye pin seviyesinde işlem paketi göndermez. Temel görevi, ortamdaki farklı alt sistemlerin fiziksel dizicilerini koordine ederek alt dizileri zamanlamaktır.",
    },
  },
  "uvm-virtual-sequencer": {
    id: "uvm-virtual-sequencer",
    badge: "Modül 8 • Diziler (Sequences) ve Sanal Diziciler",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Sanal Dizici (Virtual Sequencer) Mimarisi ve Entegrasyonu",
    subtitle: "Sürücüsü olmayan, birden fazla alt diziciye (sub-sequencer) referans tutarak karmaşık SoC doğrulamasını yöneten sanal dizici yapısı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm_virtual_sequencer.svg)`,
      },
      {
        title: "1. Sanal Dizici (Virtual Sequencer) Kavramı ve Görevi",
        content: `Sanal Dizici (\`virtual sequencer\`), \`uvm_sequencer\` sınıfından türetilen ancak **herhangi bir sürücüye (\`uvm_driver\`) bağlanmayan** özel bir UVM bileşenidir (\`uvm_component\`).

Görevi:
Doğrulama ortamında yer alan farklı aracıların (\`agent\`) fiziksel dizicilerine (\`ahb_sequencer\`, \`apb_sequencer\`, \`pcie_sequencer\` vb.) ait nesne tutucularını (handle) tek bir merkezi çatı altında toplamaktır.

Neden Gereklidir?
Bir sanal dizi (\`virtual sequence\`) çalışırken birden fazla fiziksel veri yolunu kontrol etmek zorundadır. Sanal dizinin bu dizicilere erişebilmesi için sanal dizici bir yönlendirme santrali (routing hub) görevi görür.`,
      },
      {
        title: "2. Sanal Dizici Oluşturmanın Dört Adımı",
        content: `Bir sanal dizici oluşturmak standart bir dizici oluşturmaya benzer, ancak önemli farklar barındırır:

1. **Sınıfı Genişletme:** \`uvm_sequencer\` sınıfından türetilir. Herhangi bir spesifik \`uvm_sequence_item\` üretmediği için parametresiz (veya jenerik \`uvm_sequence_item\` ile) tanımlanır.
2. **Fiziksel Dizici Tutucularını Tanımlama:** Ortamdaki gerçek dizicilerin tiplerinde üye değişkenler tanımlanır.
3. **UVM Fabrika Kaydı:** \`\\\`uvm_component_utils\\\` makrosu ile bileşen fabrikaya kaydedilir.
4. **Standart Yapıcı (Constructor):** \`new\` fonksiyonu tanımlanır.

\`\`\`systemverilog
class my_virtual_sequencer extends uvm_sequencer;
  \`uvm_component_utils(my_virtual_sequencer)

  // Ortamdaki gercek fiziksel dizicilerin tutuculari:
  apb_sequencer  m_apb_seqr;
  pcie_sequencer m_pcie_seqr;
  eth_sequencer  m_eth_seqr;

  function new(string name = "my_virtual_sequencer", uvm_component parent = null);
    super.new(name, parent);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "3. Ortam (Environment) Seviyesinde Bağlantı (connect_phase)",
        content: `Sanal dizici ortamın (\`uvm_env\`) \`build_phase\` aşamasında yaratılır ve fiziksel dizicilerle olan bağlantısı \`connect_phase\` aşamasında kurulur:

\`\`\`systemverilog
class top_env extends uvm_env;
  \`uvm_component_utils(top_env)

  apb_agent           m_apb_agent;
  pcie_agent          m_pcie_agent;
  eth_agent           m_eth_agent;
  my_virtual_sequencer m_vsqr;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    m_apb_agent  = apb_agent::type_id::create("m_apb_agent", this);
    m_pcie_agent = pcie_agent::type_id::create("m_pcie_agent", this);
    m_eth_agent  = eth_agent::type_id::create("m_eth_agent", this);
    m_vsqr       = my_virtual_sequencer::type_id::create("m_vsqr", this);
  endfunction

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Sanal dizicideki tutuculari araci icindeki gercek dizicilere bagla:
    m_vsqr.m_apb_seqr  = m_apb_agent.m_seqr;
    m_vsqr.m_pcie_seqr = m_pcie_agent.m_seqr;
    m_vsqr.m_eth_seqr  = m_eth_agent.m_seqr;
  endfunction
endclass
\`\`\``,
      },
      {
        title: "4. m_sequencer ve p_sequencer Ayrımı (`uvm_declare_p_sequencer)",
        content: `Her \`uvm_sequence\` nesnesi dahili olarak \`m_sequencer\` isimli bir tutucuya sahiptir. Ancak \`m_sequencer\`, temel sınıf olan \`uvm_sequencer_base\` tipindedir.

Bu nedenle sanal dizinin içerisinden \`m_sequencer.m_apb_seqr\` şeklinde doğrudan erişim yapılamaz; çünkü temel sınıfta \`m_apb_seqr\` değişkeni tanımlı değildir (derleme hatası oluşur).

SystemVerilog'da dinamik tip dönüşümü (\`$cast\`) yapmak gerekir. UVM bu işlemi otomatikleştirmek için \`\\\`uvm_declare_p_sequencer\\\` makrosunu sağlamıştır:

\`\`\`systemverilog
\`uvm_declare_p_sequencer(my_virtual_sequencer)
\`\`\`

Bu makro arka planda:
1. \`my_virtual_sequencer p_sequencer;\` tutucusunu oluşturur.
2. Dizi başladığında \`m_sequencer\` referansını otomatik olarak \`p_sequencer\` tipine \`$cast\` eder.
3. Tip uyumsuzluğu durumunda bilgilendirici bir \`UVM_FATAL\` mesajı fırlatır.`,
      },
      {
        title: "5. Mimari Kurallar ve Dikkat Edilmesi Gereken Yönergeler",
        content: `Sanal dizici tasarımı yaparken uyulması gereken altın kurallar şunlardır:

1. **Sürücü Bağlantısı Yapmayın:**
   Sanal dizicinin \`seq_item_export\` portunu asla bir sürücüye bağlamayın. Sanal diziciler işlem paketi tüketmez veya üretmez.

2. **İş Mantığı (Business Logic) Eklemeyin:**
   Sanal dizici içerisine karmaşık test mantığı, kuyruklar veya işlem denetimleri yazmayın. Sanal dizici yalnızca saf bir tutucu/bağlantı elemanı (container/routing) olarak kalmalıdır; iş mantığı sanal dizilerin (\`virtual sequence\`) sorumluluğundadır.

3. **Hiyerarşik Düzen:**
   Blok seviyesinden alt sistem seviyesine geçildiğinde, bir sanal dizici başka bir üst düzey sanal dizicinin alt tutucusu olarak bağlanabilir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Sanal Dizici (Virtual Sequencer) Mimarisi ve Entegrasyonu** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-virtual-sequencer.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class virtual_sequencer extends uvm_sequencer;`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Sanal Dizici (Virtual Sequencer) Mimarisi ve Entegrasyonu",
      initialCode: `class virtual_sequencer extends uvm_sequencer;`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Sanal Dizici (Virtual Sequencer) Mimarisi ve Entegrasyonu doğrulaması başarıyla tamamlandı.",
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
      question: "Sanal bir dizide `uvm_declare_p_sequencer(my_v_seqr) makrosunun kullanılmasının temel teknik amacı nedir?",
      options: ["Diziyi UVM fabrika kayıt tablosuna eklemek.", "Jenerik temel sınıf referansı olan m_sequencer'ı kullanıcı tanımlı my_v_seqr tipine cast eden tip-güvenli p_sequencer tutucusunu otomatik oluşturmak.", "Sanal dizici ile sürücü arasında fiziksel pin bağlantısı kurmak.", "Simülasyon zamanını sıfıra çekmek."],
      correctIndex: 1,
      explanation: "m_sequencer temel sınıf tipinde (uvm_sequencer_base) olduğu için türetilmiş sınıftaki alt dizici değişkenlerine erişemez. `uvm_declare_p_sequencer makrosu, güvenli bir $cast işlemiyle doğrudan erişim sağlayan p_sequencer tutucusunu otomatik oluşturur.",
    },
  },
  "uvm-sequence-library": {
    id: "uvm-sequence-library",
    badge: "Modül 8 • Diziler (Sequences) ve Sanal Diziciler",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Dizi Kütüphanesi (Sequence Library) ile Otomatik Uyaran Seçimi",
    subtitle: "Doğrulama ortamında birden fazla diziyi bir araya toplayıp rastgele veya döngüsel modlarda çalıştıran kütüphane altyapısı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/library.png)
![UVM Mimari Şeması](/images/uvm/uvm_sequence_library.png)`,
      },
      {
        title: "1. UVM Dizi Kütüphanesi (`uvm_sequence_library`) Nedir?",
        content: `Bir sayısal tasarımın (DUT) doğrulanmasında regresyon testleri çalıştırılırken onlarca farklı senaryo dizisine ihtiyaç duyulur (örneğin okuma, yazma, kesintili transfer, hatalı paket, burst transfer dizileri).

Bu dizileri tek tek elle başlatmak yerine, benzer tipte \`sequence_item\` üreten dizileri tek bir havuzda toplayan ve bunları yapılandırılabilir algoritmalarla (rastgele, döngüsel vb.) otomatik olarak yürüten UVM sınıfına **Dizi Kütüphanesi (\`uvm_sequence_library\`)** denir.

\`uvm_sequence_library\`, \`uvm_sequence\` sınıfından türetilmiştir; dolayısıyla kendisi de bir dizidir ve herhangi bir standart dizici üzerinde \`start()\` metodu ile koşturulabilir.`,
      },
      {
        title: "2. Neden Dizi Kütüphanesi Kullanılır? (Doğrulama Faydaları)",
        content: `Dizi kütüphanesinin sağladığı temel avantajlar:
- **Otomatik Uyaran Çeşitliliği:** Doğrulama mühendisinin aklına gelmeyecek dizi sıralamalarını rastgele üreterek DUT üzerinde stres testi (stress testing) yapar.
- **Fonksiyonel Kapsama (Coverage) Artışı:** Farklı dizilerin ardışık ve öngörülemeyen kombinasyonlarda çalışması, tasarımın köşe durumlarını (corner cases) tetikler.
- **Parametrik Kontrol:** Kütüphanenin kaç kez döneceği (\`min_random_count\`, \`max_random_count\`) ve hangi seçim algoritmasını kullanacağı test seviyesinden kolayca ayarlanabilir.
- **Modülerlik:** Kütüphaneye yeni bir test dizisi eklemek için mevcut testbench altyapısını değiştirmeye gerek yoktur; tek bir makro kaydı yeterlidir.`,
      },
      {
        title: "3. Kütüphane Tanımlama ve Başlatma (`init_sequence_library`)",
        content: `Bir dizi kütüphanesi oluşturmak için şu adımlar izlenir:

1. \`uvm_sequence_library #(ITEM_TYPE)\` sınıfından türetilir.
2. \`\\\`uvm_object_utils\\\` ve \`\\\`uvm_sequence_library_utils\\\` makroları çağrılır.
3. Yapıcı (\`new\`) fonksiyonu içerisinde \`init_sequence_library()\` çağrılır.

\`\`\`systemverilog
class mem_seq_lib extends uvm_sequence_library #(mem_item);
  \`uvm_object_utils(mem_seq_lib)
  \`uvm_sequence_library_utils(mem_seq_lib)

  function new(string name = "mem_seq_lib");
    super.new(name);
    // Statik olarak kaydedilmis dizileri kutuphaneye yukle:
    init_sequence_library();
  endfunction
endclass
\`\`\``,
      },
      {
        title: "4. Dizi Ekleme Yolları: Statik ve Dinamik Yöntemler",
        content: `Kütüphaneye üye diziler iki şekilde dahil edilebilir:

### A. Statik Kayıt (\`\\\`uvm_add_to_seq_lib\\\`)
Dizi sınıfının kendi tanımı içerisine yerleştirilen makro ile derleme zamanında kayıt yapılır:

\`\`\`systemverilog
class mem_read_seq extends uvm_sequence #(mem_item);
  \`uvm_object_utils(mem_read_seq)
  // Bu diziyi mem_seq_lib kutuphanesine kaydet:
  \`uvm_add_to_seq_lib(mem_read_seq, mem_seq_lib)

  // ... body task ...
endclass

class mem_write_seq extends uvm_sequence #(mem_item);
  \`uvm_object_utils(mem_write_seq)
  \`uvm_add_to_seq_lib(mem_write_seq, mem_seq_lib)

  // ... body task ...
endclass
\`\`\`

### B. Dinamik Kayıt (\`add_typewide_sequence\`)
Çalışma zamanında ortam veya test içerisinden belirli diziler kütüphaneye eklenebilir:

\`\`\`systemverilog
mem_seq_lib::add_typewide_sequence(mem_burst_seq::get_type());
\`\`\``,
      },
      {
        title: "5. Seçim Modları (Selection Modes) ve Yapılandırma Düğmeleri",
        content: `UVM dizi kütüphanesinin yürütme stratejisi \`selection_mode\` değişkeni ile kontrol edilir:

- **\`UVM_SEQ_LIB_RAND\`**: Havuzdaki diziler tamamen rastgele seçilerek çalıştırılır. Bir dizi art arda birden çok kez seçilebilir.
- **\`UVM_SEQ_LIB_RANDC\`**: Döngüsel rastgele (random cyclic) seçimdir. Havuzdaki her bir dizi en az bir kez çalıştırılmadan hiçbir dizi tekrarlanmaz.
- **\`UVM_SEQ_LIB_ITEM\`**: Diziler yerine doğrudan kütüphanenin tipi olan \`sequence_item\` üretilir.
- **\`UVM_SEQ_LIB_USER\`**: Kullanıcının \`select_sequence()\` metodunu override ederek kendi algoritmasını tanımlamasına izin verir.

Döngü Sayacı Yapılandırması:
\`\`\`systemverilog
virtual task run_phase(uvm_phase phase);
  mem_seq_lib seq_lib = mem_seq_lib::type_id::create("seq_lib");
  phase.raise_objection(this);

  // Calisma parametrelerini ayarla:
  seq_lib.selection_mode   = UVM_SEQ_LIB_RANDC; // Dongusel mod
  seq_lib.min_random_count = 5;                 // En az 5 dizi calistir
  seq_lib.max_random_count = 10;                // En fazla 10 dizi calistir

  seq_lib.start(m_env.m_seqr);
  phase.drop_objection(this);
endtask
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Dizi Kütüphanesi (Sequence Library) ile Otomatik Uyaran Seçimi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-sequence-library.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class uvm_sequence_library #(type REQ=int, RSP=REQ) extends uvm_sequence#(REQ,RSP);`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Dizi Kütüphanesi (Sequence Library) ile Otomatik Uyaran Seçimi",
      initialCode: `class uvm_sequence_library #(type REQ=int, RSP=REQ) extends uvm_sequence#(REQ,RSP);`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Dizi Kütüphanesi (Sequence Library) ile Otomatik Uyaran Seçimi doğrulaması başarıyla tamamlandı.",
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
      question: "`uvm_sequence_library` içerisinde havuza kayıtlı tüm dizilerin tekrarlanmaksızın rastgele bir sırayla birer kez çalıştırılmasını garanti eden seçim modu hangisidir?",
      options: ["UVM_SEQ_LIB_RAND", "UVM_SEQ_LIB_RANDC", "UVM_SEQ_LIB_ITEM", "UVM_SEQ_LIB_FIFO"],
      correctIndex: 1,
      explanation: "UVM_SEQ_LIB_RANDC modu, SystemVerilog'daki randc (random-cyclic) mekanizması gibi çalışır; kütüphanedeki tüm diziler bir kez çalıştırılana kadar aynı dizi yeniden seçilmez.",
    },
  },
  "uvm-sequence-arbitration": {
    id: "uvm-sequence-arbitration",
    badge: "Modül 8 • Diziler (Sequences) ve Sanal Diziciler",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Dizi Önceliklendirme ve Hakemlik (Sequence Arbitration)",
    subtitle: "Aynı dizici üzerinde yarışan birden fazla paralel dizinin erişim haklarının UVM hakemlik algoritmalarıyla yönetimi.",
    sections: [
      {
        title: "1. Dizi Hakemliği (Arbitration) Nedir ve Ne Zaman Devreye Girer?",
        content: `Tipik bir doğrulama ortamında aynı diziciye (\`uvm_sequencer\`) bağlı birden fazla bağımsız dizi paralel olarak (\`fork ... join\`) çalışabilir.

Örneğin:
- Düşük öncelikli bir arka plan bellek doldurma dizisi (\`background_traffic_seq\`).
- Orta öncelikli bir periyodik durum sorgulama dizisi (\`status_poll_seq\`).
- Yüksek öncelikli bir acil kesme veya hata kurtarma dizisi (\`urgent_interrupt_seq\`).

Bu diziler aynı anda sürücüye paket göndermek için \`start_item()\` çağırdığında, fiziksel sürücü tek bir zamanda yalnızca tek bir işlem paketini yürütebilir. Hangi dizinin paketinin önce gönderileceğini belirleyen mekanizmaya **Dizi Hakemliği (Sequence Arbitration)** denir.`,
      },
      {
        title: "2. UVM Hakemlik Algoritmaları (Arbitration Modes)",
        content: `UVM dizicileri (\`uvm_sequencer\`), \`set_arbitration()\` metodu ile değiştirilebilen 6 farklı hakemlik moduna sahiptir:

| Hakemlik Modu | Çalışma Mantığı |
|---|---|
| **\`UVM_SEQ_ARB_FIFO\`** *(Varsayılan)* | İstek sırasına göre ilk gelen ilk hizmet alır (FIFO). Dizilerin öncelik değerleri tamamen yok sayılır. |
| **\`UVM_SEQ_ARB_WEIGHTED\`** | Öncelik değerlerine göre ağırlıklı rastgele seçim yapılır. Yüksek öncelikli dizinin seçilme olasılığı daha yüksektir, ancak düşük öncelikli dizi de araya girebilir. |
| **\`UVM_SEQ_ARB_RANDOM\`** | İstek sırasını ve öncelikleri tamamen göz ardı ederek kuyruktaki diziler arasından saf rastgele seçim yapar. |
| **\`UVM_SEQ_ARB_STRICT_FIFO\`** | Kuyrukta bekleyen en yüksek öncelikli dizilere **mutlak öncelik** tanınır. Eşit önceliğe sahip diziler arasında FIFO kuralı işletilir. |
| **\`UVM_SEQ_ARB_STRICT_RANDOM\`** | En yüksek öncelikli dizilere mutlak hak verilir. Eşit öncelikliler arasından rastgele seçim yapılır. |
| **\`UVM_SEQ_ARB_USER\`** | Kullanıcının \`user_priority_arbitration()\` fonksiyonunu geçersiz kılarak (override) kendi özel donanımsal hakemlik algoritmasını tanımlamasına izin verir. |`,
      },
      {
        title: "3. Testbench Mimarisi: Veri Paketi, Sürücü ve Ortam",
        content: `Hakemlik mekanizmasını gözlemlemek için bir veri paketi (\`base_pkt\`), simüle edilmiş gecikmeye sahip bir sürücü (\`base_driver\`) ve bir ortam (\`base_env\`) kurulur:

\`\`\`systemverilog
class base_pkt extends uvm_sequence_item;
  \`uvm_object_utils(base_pkt)
  rand bit [7:0] addr;
  rand bit [7:0] data;

  function new(string name = "base_pkt");
    super.new(name);
  endfunction
endclass

class base_driver extends uvm_driver #(base_pkt);
  \`uvm_component_utils(base_driver)

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  virtual task run_phase(uvm_phase phase);
    base_pkt pkt;
    forever begin
      seq_item_port.get_next_item(pkt);
      // Surucunun pini surmesi icin gereken 10ns gecikme:
      #10;
      \`uvm_info("DRV", $sformatf("Paket suruldu: addr=0x%02h", pkt.addr), UVM_LOW)
      seq_item_port.item_done();
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Öncelikli Dizilerin Paralel Başlatılması",
        content: `Farklı önceliklere sahip diziler test sınıfı içerisinde paralel olarak başlatılır:

\`\`\`systemverilog
class base_seq extends uvm_sequence #(base_pkt);
  \`uvm_object_utils(base_seq)
  int seq_id;

  function new(string name = "base_seq");
    super.new(name);
  endfunction

  virtual task body();
    base_pkt pkt = base_pkt::type_id::create($sformatf("pkt_%0d", seq_id));
    // start_item ile diziciye talep gonderilir ve hakemlik beklenir:
    start_item(pkt);
    pkt.addr = seq_id * 10;
    finish_item(pkt);
  endtask
endclass
\`\`\``,
      },
      {
        title: "5. Test Sınıfında `set_arbitration()` Yapılandırması ve Karşılaştırma",
        content: `Test sınıfının \`run_phase\` görevinde hakemlik modu açıkça seçilir:

\`\`\`systemverilog
class arb_test extends uvm_test;
  \`uvm_component_utils(arb_test)
  base_env m_env;

  // ... build_phase ...

  virtual task run_phase(uvm_phase phase);
    base_seq seq[3];
    phase.raise_objection(this);

    // Dizicide MUTLAK ONCELIK modunu sec:
    m_env.m_seqr.set_arbitration(UVM_SEQ_ARB_STRICT_FIFO);

    foreach (seq[i]) begin
      seq[i] = base_seq::type_id::create($sformatf("seq_%0d", i));
      seq[i].seq_id = i;
    end

    // Dizileri eszamanli olarak baslat (Farkli onceliklerle):
    fork
      seq[0].start(m_env.m_seqr, null, 100); // Dusuk oncelik (100)
      seq[1].start(m_env.m_seqr, null, 200); // Orta oncelik  (200)
      seq[2].start(m_env.m_seqr, null, 500); // En yuksek oncelik (500)
    join

    phase.drop_objection(this);
  endtask
endclass
\`\`\`

Simülasyon Çıktısı Analizi:
- Eğer varsayılan \`UVM_SEQ_ARB_FIFO\` kullanılsaydı, isteklerin diziciye ulaştığı sıra (genellikle \`seq_0\`, \`seq_1\`, \`seq_2\`) takip edilirdi.
- Ancak \`UVM_SEQ_ARB_STRICT_FIFO\` kullanıldığında, dizici en yüksek öncelik değeri olan 500'e sahip \`seq_2\` paketine mutlak öncelik tanır; ardından \`seq_1\` (200) ve en son \`seq_0\` (100) sürücüye iletilir.`,
      },
      {
        title: "6. Doğrulama Stratejileri ve Uyarılar",
        content: `1. **Açlık (Starvation) Riski:**
   \`UVM_SEQ_ARB_STRICT_FIFO\` veya \`UVM_SEQ_ARB_STRICT_RANDOM\` modları kullanılırken, yüksek öncelikli diziler sürekli yeni paketler üretirse düşük öncelikli diziler asla sürücüye erişemeyebilir (starvation). Bu durumu önlemek için dengeli regresyonlarda \`UVM_SEQ_ARB_WEIGHTED\` modu tercih edilmelidir.

2. **Yalnızca start_item / finish_item Arasında Geçerlidir:**
   Dizicinin hakemliği yalnızca diziler \`start_item()\` metodunu çağırdığı an devreye girer. Sürücüye paket göndermeyen saf kod blokları hakemlikten etkilenmez.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Dizi Önceliklendirme ve Hakemlik (Sequence Arbitration)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-sequence-arbitration.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class base_pkt extends uvm_sequence_item;
  \`uvm_object_utils(base_pkt)
  function new(string name = "base_pkt");
    super.new(name);
  endfunction
  
  rand bit[7:0] addr;
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Dizi Önceliklendirme ve Hakemlik (Sequence Arbitration)",
      initialCode: `class base_pkt extends uvm_sequence_item;
  \`uvm_object_utils(base_pkt)
  function new(string name = "base_pkt");
    super.new(name);
  endfunction
  
  rand bit[7:0] addr;
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Dizi Önceliklendirme ve Hakemlik (Sequence Arbitration) doğrulaması başarıyla tamamlandı.",
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
      question: "Aynı dizici üzerinde yarışan birden fazla paralel dizide `UVM_SEQ_ARB_STRICT_FIFO` modu etkinleştirildiğinde dizicinin davranış şekli nasıldır?",
      options: ["Dizilerin öncelik değerlerini yok sayar ve istek sırasına göre ilk gelene ilk hizmet verir.", "En yüksek öncelik değerine sahip bekleyen dizilere mutlak hak tanır; eşit önceliğe sahip olanlar arasında FIFO kuralını uygular.", "Dizileri önceliklerine oranla rastgele bir dağılımla seçer.", "En düşük öncelikli diziyi derhal iptal eder."],
      correctIndex: 1,
      explanation: "UVM_SEQ_ARB_STRICT_FIFO modu katı (strict) öncelik kurallarını uygular. Kuyruktaki en yüksek öncelikli istekler daima önce yürütülür; eşit öncelikli talepler varsa kendi aralarında geliş sırasına göre (FIFO) sıralanır.",
    },
  },
  "reporting-classes": {
    id: "reporting-classes",
    badge: "Modül 9 • Raporlama ve Mesajlaşma Sistemi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Raporlama Sınıfları ve Mesajlaşma Mimarisi",
    subtitle: "UVM mesajlaşma hiyerarşisinin temel taşları: `uvm_report_object`, `uvm_report_handler` ve `uvm_report_server`.",
    sections: [
      {
        title: "1. UVM Raporlama Mimarisine Giriş ve Temel Felsefe",
        content: `Sayısal doğrulama ortamlarında geleneksel Verilog \`$display\` ifadeleri kullanmak ciddi mimari sınırlamalara yol açar:
- \`$display\` mesajları filtrelenemez; her simülasyonda konsolu gereksiz metinlerle doldurur.
- Mesajların ciddiyet seviyesi (bilgi, uyarı, hata, ölümcül hata) ayırt edilemez.
- Mesajları farklı dosyalara yönlendirmek veya hata adedini merkezi bir sayaçla sayıp simülasyonu otomatik durdurmak imkansızdır.

Universal Verification Methodology (UVM - IEEE 1800.2), bu sorunları çözmek amacıyla nesne yönelimli, üç katmanlı ve merkezi bir raporlama altyapısı sunar:
1. **İstemci Arayüz Katmanı (\`uvm_report_object\`)**
2. **Yönlendirme ve Politika Katmanı (\`uvm_report_handler\`)**
3. **Merkezi İşleme ve Sunucu Katmanı (\`uvm_report_server\`)**`,
      },
      {
        title: "2. `uvm_report_object`: Bileşenlerin Raporlama Arayüzü",
        content: `\`uvm_report_object\`, UVM hiyerarşisinde mesaj üretmek isteyen tüm sınıflar için temel arayüzü sunan sınıftır. En kritik özellik, \`uvm_component\` sınıfının doğrudan \`uvm_report_object\` sınıfından türetilmiş olmasıdır.

Bu sayede tüm sürücüler (\`uvm_driver\`), monitörler (\`uvm_monitor\`), diziciler (\`uvm_sequencer\`) ve ortamlar (\`uvm_env\`):
- \`uvm_report_info()\`
- \`uvm_report_warning()\`
- \`uvm_report_error()\`
- \`uvm_report_fatal()\`
metotlarına doğrudan erişebilir.

Her \`uvm_report_object\`, arka planda mesajların nasıl işleneceğini denetleyen bir \`uvm_report_handler\` referansına sahiptir.`,
      },
      {
        title: "3. `uvm_report_handler`: Mesaj Aksiyonları ve Dosya Tanımlayıcıları",
        content: `\`uvm_report_handler\`, gelen bir mesajın hangi eylemleri (\`action\`) tetikleyeceğini ve hangi dosyalara (\`file descriptor\`) yazılacağını belirleyen konfigürasyon tablosunu yönetir.

UVM'de tanımlı standart raporlama aksiyonları şunlardır:
- **\`UVM_NO_ACTION\` (0)**: Mesaj tamamen yok sayılır.
- **\`UVM_DISPLAY\` (1)**: Mesaj standart simülatör konsoluna yazdırılır.
- **\`UVM_LOG\` (2)**: Mesaj ilişkili disk dosyasına yazılır.
- **\`UVM_COUNT\` (4)**: Mesaj hata sayacını (\`quit_count\`) 1 artırır.
- **\`UVM_EXIT\` (8)**: Simülasyonu derhal sonlandırır (\`$finish\`).
- **\`UVM_CALL_HOOK\` (16)**: Kullanıcı kancasını (\`report_hook\`) çağırır.
- **\`UVM_STOP\` (32)**: Simülatörü hata ayıklama (debug) duraklatma moduna geçirir (\`$stop\`).

Bu aksiyonlar bit düzeyinde mantıksal VEYA (\`|\`) ile birleştirilebilir:
\`\`\`systemverilog
// Bir hata olustugunda hem ekrana yaz, hem dosyaya kaydet, hem sayaci artir:
set_report_severity_action(UVM_ERROR, UVM_DISPLAY | UVM_LOG | UVM_COUNT);
\`\`\``,
      },
      {
        title: "4. `uvm_report_server`: Merkezi Mesaj İşleme ve Hata Sayım Motoru",
        content: `\`uvm_report_server\`, tüm UVM ortamı boyunca yalnızca tek bir örneği bulunan tekil (singleton) bir işleme motorudur.

Görevleri:
1. **Mesaj Biçimlendirme (\`compose_report_message\`):** Zaman damgası (\`@ 1250ns\`), dosya adı, satır numarası, ciddiyet (\`UVM_ERROR\`), bileşen hiyerarşisi (\`uvm_test_top.env.agent.drv\`) ve etiket bilgilerini standart bir metne dönüştürür.
2. **Hata Sayacı ve Simülasyon Sonlandırma (\`max_quit_count\`):** \`UVM_COUNT\` bayrağı taşıyan hataların sayısını tutar. Hata sayısı belirlenen eşiğe ulaştığında simülasyonu otomatik olarak kapatır.
3. **Simülasyon Özeti:** Simülasyonun sonunda üretilen toplam bilgi, uyarı, hata ve fatal sayılarını tablo halinde raporlar.

Global sunucu örneğine erişim:
\`\`\`systemverilog
uvm_report_server svr = uvm_report_server::get_server();
int err_cnt = svr.get_severity_count(UVM_ERROR);
svr.set_max_quit_count(10); // 10 hata olunca simülasyonu durdur
\`\`\``,
      },
      {
        title: "5. Özel (Custom) Rapor Sunucusu Geliştirme Örneği",
        content: `Büyük doğrulama ekipleri ve CI/CD otomasyonları genellikle konsol çıktılarını renklendirmek, şirket log formatına uyarlamak veya JSON çıktısı üretmek için özel bir rapor sunucusu tanımlar:

\`\`\`systemverilog
class colored_report_server extends uvm_default_report_server;
  \`uvm_object_utils(colored_report_server)

  virtual function string compose_report_message(uvm_report_message report_message,
                                                 string server_context = "");
    string msg;
    string sev_name = report_message.get_severity().name();
    
    // ANSI renk kodlari ekle (Hatalar Kirmizi, Uyarilar Sari):
    if (report_message.get_severity() == UVM_ERROR)
      msg = $sformatf("\\033[1;31m[%s] %s\\033[0m", sev_name, report_message.get_message());
    else if (report_message.get_severity() == UVM_WARNING)
      msg = $sformatf("\\033[1;33m[%s] %s\\033[0m", sev_name, report_message.get_message());
    else
      msg = super.compose_report_message(report_message, server_context);
      
    return msg;
  endfunction
endclass
\`\`\`

Bu özel sunucu test sınıfının \`start_of_simulation_phase\` aşamasında sisteme tanıtılır:
\`\`\`systemverilog
colored_report_server my_svr = new();
uvm_report_server::set_server(my_svr);
\`\`\``,
      },
      {
        title: "6. Modern UVM (IEEE 1800.2) Raporlama Mesaj Nesnesi (`uvm_report_message`)",
        content: `IEEE 1800.2 standardı ile birlikte raporlama mekanizması saf dizge (string) tabanlı olmaktan çıkarılıp \`uvm_report_message\` sınıfı nesneleri üzerine oturtulmuştur.

Bu sayede bir mesaj nesnesi içerisinde:
- Sayısal hata kodları (context),
- İşlem paketinin doğrudan kendisi (\`uvm_object\`),
- Ek etiketler ve meta veriler
taşınabilir. Scoreboard uyuşmazlığı olduğunda sadece hata metni değil, uyuşmayan nesne de hata mesajı nesnesi içerisine iliştirilebilir.`,
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Raporlama Sınıfları ve Mesajlaşma Mimarisi",
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
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Raporlama Sınıfları ve Mesajlaşma Mimarisi doğrulaması başarıyla tamamlandı.",
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
      question: "UVM'de tüm bileşenlerden gelen mesajları toplayıp biçimlendiren (compose), hata sayılarını takip eden ve max_quit_count aşıldığında simülasyonu durduran merkezi tekil (singleton) sınıf hangisidir?",
      options: ["uvm_report_object", "uvm_report_handler", "uvm_report_server", "uvm_root"],
      correctIndex: 2,
      explanation: "uvm_report_server, UVM raporlama mimarisinin merkezi işleme motorudur; tüm mesaj formatlamasını, hata sayımlarını (quit count) ve simülasyon sonlandırma eşiklerini denetler.",
    },
  },
  "report-functions": {
    id: "report-functions",
    badge: "Modül 9 • Raporlama ve Mesajlaşma Sistemi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Raporlama Fonksiyonları, Makrolar ve Ayrıntı Düzeyleri (Verbosity)",
    subtitle: "Standart raporlama metotları (`uvm_report_*`), makrolar (`uvm_info`, `uvm_error`) ve mesaj filtreleme mekanizmaları.",
    sections: [
      {
        title: "1. Raporlama Metotları vs Raporlama Makroları",
        content: `UVM'de log mesajı üretmek için iki ana yöntem bulunur:

### A. Doğrudan Metot Çağrısı (\`uvm_report_*\`)
\`\`\`systemverilog
uvm_report_info("DRV", "Surucu baslatildi", UVM_LOW, \`__FILE__, \`__LINE__);
uvm_report_warning("ALARM", "FIFO dolmak uzere", \`__FILE__, \`__LINE__);
uvm_report_error("SCB", "Veri uyusmazligi!", \`__FILE__, \`__LINE__);
uvm_report_fatal("CLK", "Saat sinyali kesildi!", \`__FILE__, \`__LINE__);
\`\`\`

### B. Raporlama Makroları (\`\\\`uvm_info\\\`, \`\\\`uvm_error\\\` vb.)
\`\`\`systemverilog
\`uvm_info("DRV", "Surucu baslatildi", UVM_LOW)
\`uvm_warning("ALARM", "FIFO dolmak uzere")
\`uvm_error("SCB", "Veri uyusmazligi!")
\`uvm_fatal("CLK", "Saat sinyali kesildi!")
\`\`\`

**Neden Makrolar Tercih Edilmelidir?**
1. **Otomatik Dosya ve Satır Bilgisi:** Makrolar SystemVerilog derleyicisinin \`\\\`__FILE__\\\`\` ve \`\\\`__LINE__\\\`\` değerlerini otomatik olarak enjekte eder; geliştiricinin elle yazmasına gerek kalmaz.
2. **Kritik Performans Optimizasyonu:** \`\\\`uvm_info\\\` makrosu, mesaj dizgesini oluşturmadan (örneğin \`$sformatf\` fonksiyonunu çalıştırmadan) önce verbosity filtresini kontrol eder. Eğer mesaj elenecekse \`$sformatf\` hiç çalıştırılmaz; bu da simülasyon hızında devasa tasarruf sağlar!`,
      },
      {
        title: "2. Dört Ciddiyet Seviyesi (Severity Levels)",
        content: `UVM mesajları önem derecesine göre 4 seviyeye ayrılır:

1. **\`UVM_INFO\`**: Bilgilendirici durum mesajlarıdır. Simülasyon akışını ve veri paketlerini takip etmek için kullanılır. Hata sayacını artırmaz.
2. **\`UVM_WARNING\`**: Potansiyel bir probleme işaret eder (ör. beklenmeyen bir bayrak kalkması veya arabellek taşma riski). Simülasyon devam eder; varsayılan olarak hata sayacı artmaz.
3. **\`UVM_ERROR\`**: Bir doğrulama hatasıdır (ör. scoreboard veri uyuşmazlığı, zaman aşımı). Varsayılan olarak \`quit_count\` sayacını 1 artırır. Ancak simülasyon hemen durmaz; diğer test adımlarının devam etmesine izin verir.
4. **\`UVM_FATAL\`**: Kurtarılamaz sistem çökmesidir (ör. sıfırlama sinyali hiç gelmedi, null pointer, kritik saat sinyali yok). Varsayılan olarak simülasyonu anında durdurur (\`$finish\`).`,
      },
      {
        title: "3. Ayrıntı Düzeyleri (Verbosity Levels) ve Filtreleme Mantığı",
        content: `UVM, gereksiz log kalabalığını önlemek için sayısal tamsayılarla eşleşen 6 farklı ayrıntı düzeyi (\`verbosity\`) tanımlar:

| Verbosity Sabiti | Sayısal Değeri | Tipik Kullanım Alanı |
|---|---|---|
| **\`UVM_NONE\`** | 0 | Asla filtrelenemeyen kritik kilometre taşları (Test başladı/bitti). |
| **\`UVM_LOW\`** | 100 | Önemli faz geçişleri, reset tamamlanması, ana durum değişiklikleri. |
| **\`UVM_MEDIUM\`** | 200 | **Varsayılan seviye.** Tipik işlem seviyesi (transaction) hareketleri. |
| **\`UVM_HIGH\`** | 300 | Ayrıntılı paket içeriği, handshake sinyalleri, durum makinesi geçişleri. |
| **\`UVM_FULL\`** | 400 | Çok detaylı sinyal seviyesi dökümler. |
| **\`UVM_DEBUG\`** | 500 | En derin hata ayıklama mesajları; yalnızca derin analizlerde açılır. |

**Altın Filtre Kuralı:**
Bir \`\\\`uvm_info\\\` mesajı ekrana **yalnızca** mesajın kendi verbosity seviyesi, sistemin o anki aktif verbosity eşiğine **eşit veya ondan küçükse** yazdırılır:
$$\\text{Mesajın Düzeyi} \\le \\text{Aktif Sistem Eşiği} \\implies \\text{Mesaj Görüntülenir}$$`,
      },
      {
        title: "4. Komut Satırından ve Kod İçinden Verbosity Yapılandırması",
        content: `UVM'in en güçlü yanlarından biri, kodu yeniden derlemeye (recompile) gerek kalmadan çalışma zamanında komut satırından log seviyesinin değiştirilebilmesidir:

### A. Komut Satırı Argümanları
\`\`\`bash
# Tum ortamin log seviyesini UVM_HIGH yapmak icin:
<simulator> +UVM_VERBOSITY=UVM_HIGH

# Sadece belirli bir bilesenin seviyesini DEBUG yapmak icin:
<simulator> +uvm_set_verbosity=uvm_test_top.env.agent.drv,_ALL_,UVM_DEBUG,run
\`\`\`

### B. Kod İçinden Hiyerarşik Yapılandırma
\`\`\`systemverilog
// Sadece bu bilesenin seviyesini ayarla:
set_report_verbosity_level(UVM_HIGH);

// Bu bilesen ve tum alt dallarinin seviyesini ayarla:
set_report_verbosity_level_hier(UVM_LOW);

// Belirli bir ID etiketine sahip mesajlarin seviyesini ayarla:
set_report_id_verbosity("PCIE_RX_PKT", UVM_DEBUG);
\`\`\``,
      },
      {
        title: "5. Dosyaya Günlükleme (File Logging) ve Eylem Özelleştirme",
        content: `Farklı ciddiyetteki veya farklı ID'lere sahip mesajlar ayrı dosyalara yönlendirilebilir:

\`\`\`systemverilog
virtual function void build_phase(uvm_phase phase);
  UVM_FILE err_log_file;
  super.build_phase(phase);

  // Dosya ac:
  err_log_file = $fopen("errors.log", "w");

  // UVM_ERROR mesajlari icin hem ekrana bas hem dosyaya yaz:
  set_report_severity_action(UVM_ERROR, UVM_DISPLAY | UVM_LOG | UVM_COUNT);
  set_report_severity_file(UVM_ERROR, err_log_file);
endfunction
\`\`\``,
      },
      {
        title: "6. Endüstriyel Hata Ayıklama İpuçları ve Doğrulama Kılavuzu",
        content: `1. **Standart ID Etiketleri Kullanın:**
   Mesaj ID'leri rastgele belirlenmemeli, ekip genelinde standart bir taksonomiye bağlanmalıdır (ör. \`[DRV/APB/SEND]\`, \`[SCB/MATCH]\`, \`[MON/DROP]\`).

2. **Gereksiz UVM_LOW Kullanımından Kaçının:**
   Her işlemde \`UVM_LOW\` basmak regresyon log dosyalarının gigabaytlarca şişmesine yol açar. İşlem seviyesi loglar için \`UVM_HIGH\` veya \`UVM_FULL\` tercih edilmelidir.

3. **\`uvm_error\` ile Scoreboard Uyuşmazlıkları:**
   Scoreboard uyuşmazlıklarında asla \`uvm_fatal\` çağrılmamalıdır; \`uvm_error\` kullanılmalı ve simülasyonun \`max_quit_count\` ile kontrollü sonlanması sağlanmalıdır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Raporlama Fonksiyonları, Makrolar ve Ayrıntı Düzeyleri (Verbosity)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "report-functions.sv - Örnek UVM Doğrulama Kodu",
          snippet: `uvm_report_* ("TAG", $sformatf ("[Enter the display message]"), VERBOSITY_LEVEL);`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Raporlama Fonksiyonları, Makrolar ve Ayrıntı Düzeyleri (Verbosity)",
      initialCode: `uvm_report_* ("TAG", $sformatf ("[Enter the display message]"), VERBOSITY_LEVEL);`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Raporlama Fonksiyonları, Makrolar ve Ayrıntı Düzeyleri (Verbosity) doğrulaması başarıyla tamamlandı.",
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
      question: "Varsayılan UVM verbosity seviyesi UVM_MEDIUM (200) olarak ayarlanmış bir test ortamında, `uvm_info(\"ID\", \"Mesaj\", UVM_HIGH) satırı yürütüldüğünde ne gerçekleşir?",
      options: ["Mesaj derhal konsola yazdırılır ve simülasyonu sonlandırır.", "Mesajın verbosity düzeyi (300), sistem eşik düzeyinden (200) büyük olduğu için filtrelenir ve ekrana basılmaz.", "Mesaj otomatik olarak UVM_WARNING ciddiyetine yükseltilir.", "Sistem hata sayacı 1 artırılır."],
      correctIndex: 1,
      explanation: "UVM mesaj filtreleme kuralına göre bir mesajın gösterilmesi için mesaj düzeyi <= sistem düzeyi olmalıdır. 300 > 200 olduğu için UVM_HIGH mesajı sessizce filtrelenir ve ekrana basılmaz.",
    },
  },
  "uvm-printer": {
    id: "uvm-printer",
    badge: "Modül 9 • Raporlama ve Mesajlaşma Sistemi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Yazıcı Sınıfları (`uvm_printer`) ve Nesne Biçimlendirmesi",
    subtitle: "İşlem paketlerinin ve bileşenlerin tablo, ağaç veya satır biçiminde yazdırılması, yazıcı düğmeleri (`knobs`) ve özelleştirme.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm_printer.png)
![UVM Mimari Şeması](/images/uvm/example_nested_classes.png)`,
      },
      {
        title: "1. Geleneksel `$display` Yaklaşımının Zorlukları ve UVM Çözümü",
        content: `Doğrulama ortamlarında işlem paketlerinin (\`uvm_sequence_item\`) içeriğini konsola yazdırmak hata ayıklamanın en temel adımıdır.

Klasik Verilog yaklaşımında mühendisler her sınıf için özel \`$display\` fonksiyonları yazmak zorunda kalırdı:
\`\`\`systemverilog
function void print_pkt();
  $display("addr=0x%0h len=0x%0h crc=0x%0h ...", addr, len, crc);
endfunction
\`\`\`

Bu yöntemin dezavantajları:
- Sınıfa yeni bir değişken eklendiğinde display fonksiyonunu da elle güncellemek gerekir.
- Farklı formatlarda (tablo, tek satır, ağaç hiyerarşisi) yazdırmak için ayrı ayrı fonksiyonlar gerekir.
- Hiyerarşik iç içe geçmiş nesneleri düzgün girintilerle yazdırmak kod karmaşasına yol açar.

UVM, polimorfik \`uvm_printer\` motoru ve \`uvm_object::print()\` / \`sprint()\` metotları ile bu süreci tamamen otomatikleştirir.`,
      },
      {
        title: "2. Üç Temel UVM Yazıcı Biçimi (Printer Styles)",
        content: `UVM kütüphanesinde üç temel yazıcı biçimi hazır olarak sunulur:

1. **\`uvm_table_printer\`**: Nesne alanlarını sütunlar halinde düzenli bir tablo olarak gösterir.
   Sütunlar: \`Name\` (Alan adı), \`Type\` (Veri tipi), \`Size\` (Bit genişliği), \`Value\` (Değer).
   *(UVM'in varsayılan yazıcısıdır: \`uvm_default_table_printer\`)*

\`\`\`text
---------------------------------------------------
Name        Type      Size  Value                  
---------------------------------------------------
req         my_data   -     @1022                  
  addr      integral  8     'ha1                   
  data      integral  8     'h4e                   
  payload   da(byte)  4     -                      
    [0]     integral  8     'h12                   
    [1]     integral  8     'h34                   
---------------------------------------------------
\`\`\`

2. **\`uvm_tree_printer\`**: Nesneleri ağaç hiyerarşisi biçiminde, girintili satırlarla görüntüler.
3. **\`uvm_line_printer\`**: Tüm alanları aralarına ayraç koyarak tek bir yatay satırda gösterir; log dosyalarında az yer kaplamak ve otomatik script analizleri için mükemmeldir.`,
      },
      {
        title: "3. Yazdırma Mekanizması: Field Automation Makroları vs `do_print()`",
        content: `Bir nesnenin \`print()\` metodunu desteklemesi için iki yoldan biri seçilmelidir:

### Yöntem A: Field Automation Makroları
Sınıf tanımlanırken alanlar \`\\\`uvm_field_*\\\` makroları ile kaydedilir:
\`\`\`systemverilog
class my_data extends uvm_sequence_item;
  rand bit [7:0] addr;
  rand bit [7:0] data;

  \`uvm_object_utils_begin(my_data)
    \`uvm_field_int(addr, UVM_DEFAULT | UVM_HEX)
    \`uvm_field_int(data, UVM_DEFAULT | UVM_HEX)
  \`uvm_object_utils_end

  function new(string name = "my_data");
    super.new(name);
  endfunction
endclass
\`\`\`

### Yöntem B: \`do_print()\` Metodunu Override Etmek (Önerilen)
Field makroları simülasyonu yavaşlatabildiği için büyük projelerde \`do_print()\` metodunu elle yazmak en iyi pratiktir:
\`\`\`systemverilog
virtual function void do_print(uvm_printer printer);
  super.do_print(printer);
  printer.print_field("addr", addr, 8, UVM_HEX);
  printer.print_field("data", data, 8, UVM_HEX);
endfunction
\`\`\``,
      },
      {
        title: "4. `uvm_default_printer` Kullanımı ve Yazıcı Nesnesi Değişimi",
        content: `Varsayılan yazıcı UVM'de \`uvm_default_printer\` global değişkeni üzerinden yönetilir.

İstenirse global yazıcı değiştirilebilir:
\`\`\`systemverilog
// Global olarak agac bicimli yaziciya gec:
uvm_default_printer = uvm_default_tree_printer;
\`\`\`

Ya da doğrudan çağrı esnasında özel bir yazıcı nesnesi aktarılabilir:
\`\`\`systemverilog
req.print(uvm_default_line_printer); // Tek satirda bas
string s = req.sprint();             // Konsola basmak yerine string degiskene aktar
\`\`\``,
      },
      {
        title: "5. Yazıcı Düğmeleri (`uvm_printer_knobs`) ile Biçimlendirme Ayarları",
        content: `Her yazıcı sınıfı dahili olarak bir \`knobs\` nesnesine sahiptir. Bu düğmeler aracılığıyla çıktının görünümü milimetrik olarak özelleştirilebilir:

\`\`\`systemverilog
// Size sutununu gizle:
uvm_default_printer.knobs.size = 0;

// Type sutununu gizle:
uvm_default_printer.knobs.type_name = 0;

// Girinti miktarini 4 karaktere cikar:
uvm_default_printer.knobs.indent = 4;

// Varsayilan sayi tabanini onaltilik (HEX) yap:
uvm_default_printer.knobs.default_radix = UVM_HEX;

// Maksimum derinligi 2 seviye ile sınırla (cok derin nesneleri kisalt):
uvm_default_printer.knobs.max_depth = 2;
\`\`\``,
      },
      {
        title: "6. Doğrulama İpuçları ve Performans Kılavuzu",
        content: `1. **\`print()\` vs \`sprint()\`:**
   Konsola doğrudan basmak yerine \`sprint()\` çıktısını bir \`\\\`uvm_info\\\` makrosuna geçirmek en doğru yaklaşımdır:
   \`\`\`systemverilog
   \`uvm_info("PKT", $sformatf("Alinan paket:\\n%s", req.sprint()), UVM_HIGH)
   \`\`\`
   Böylece log seviyesi \`UVM_MEDIUM\` iken yazdırma formatlama maliyeti hiç oluşmaz!

2. **Döngü İçinde \`print()\` Kullanmayın:**
   Yüksek hızlı veri akışlarında (ör. milyonlarca paket) her paketi \`print()\` ile basmak simülasyonu 10 kata kadar yavaşlatabilir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Yazıcı Sınıfları (\`uvm_printer\`) ve Nesne Biçimlendirmesi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-printer.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class Packet;
	bit [31:0]  addr;
	int         count_id;
	bit [3:0]   length;
	...
	function display ();
		$display ("addr=0x%0h count_id=0x%0h length=0x%0h", p1.addr, p1.count_id, p1.length);
	endfunction
endclass

module tb;
	initial begin
		Packet p1 = new();
		p1.display();
	end
endmodule`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Yazıcı Sınıfları (`uvm_printer`) ve Nesne Biçimlendirmesi",
      initialCode: `class Packet;
	bit [31:0]  addr;
	int         count_id;
	bit [3:0]   length;
	...
	function display ();
		$display ("addr=0x%0h count_id=0x%0h length=0x%0h", p1.addr, p1.count_id, p1.length);
	endfunction
endclass

module tb;
	initial begin
		Packet p1 = new();
		p1.display();
	end
endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Yazıcı Sınıfları (\`uvm_printer\`) ve Nesne Biçimlendirmesi doğrulaması başarıyla tamamlandı.",
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
      question: "UVM'de bir işlem paketinin tüm alanlarını log dosyasında tek bir satırda kompakt biçimde görüntülemek için hangi yazıcı sınıfı kullanılmalıdır?",
      options: ["uvm_table_printer", "uvm_line_printer", "uvm_tree_printer", "uvm_xml_printer"],
      correctIndex: 1,
      explanation: "uvm_line_printer, işlem nesnesinin tüm alanlarını aralarına ayraçlar yerleştirerek tek bir yatay satırda yazdıran özel yazıcı sınıfıdır.",
    },
  },
  "uvm-comparer": {
    id: "uvm-comparer",
    badge: "Modül 9 • Raporlama ve Mesajlaşma Sistemi",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Karşılaştırıcı (`uvm_comparer`) ile Veri Karşılaştırma Politikaları",
    subtitle: "Scoreboard ve referans model doğrulamasında nesne karşılaştırmasını özelleştirme, tolerans ayarları ve hata raporlama.",
    sections: [
      {
        title: "1. UVM'de Nesne Karşılaştırma Felsefesi ve `uvm_comparer` Sınıfı",
        content: `Sayısal donanım doğrulamasında Skorbord (Scoreboard) bileşeninin temel görevi, DUT'tan (Design Under Test) toplanan gerçek işlem paketleri ile Referans Modelden (Predictor) gelen beklenen paketleri karşılaştırmaktır.

Bir \`uvm_sequence_item\` nesnesi üzerinde \`compare()\` metodu çağrıldığında UVM, arka planda bir **karşılaştırma politikası** işletir:
\`\`\`systemverilog
bit is_match = actual_pkt.compare(expected_pkt, custom_comparer);
\`\`\`

Bu politikanın nasıl davranacağını, kaç hataya kadar raporlama yapılacağını ve uyuşmazlıkların hangi ciddiyet seviyesinde (\`UVM_INFO\`, \`UVM_WARNING\`, \`UVM_ERROR\`) konsola basılacağını yöneten sınıfa **\`uvm_comparer\`** denir.

Eğer ikinci argüman olarak özel bir karşılaştırıcı nesnesi verilmezse UVM global \`uvm_default_comparer\` nesnesini kullanır.`,
      },
      {
        title: "2. `compare()` Metodu, Field Makroları ve `do_compare()` Kancası",
        content: `İki nesnenin alan bazında karşılaştırılması iki temel yöntemle tanımlanır:

### Yöntem A: Field Automation Makroları (\`\\\`uvm_field_*\\\`)
Sınıf tanımlanırken \`\\\`uvm_field_int(data, UVM_DEFAULT)\\\` şeklinde kaydedilen tüm alanlar otomatik olarak karşılaştırılır. Eğer bir alanın karşılaştırılması istenmiyorsa \`UVM_NOCOMPARE\` bayrağı verilir:
\`\`\`systemverilog
\`uvm_field_int(timestamp, UVM_DEFAULT | UVM_NOCOMPARE)
\`\`\`

### Yöntem B: \`do_compare()\` Metodunu Override Etmek (Önerilen)
Yüksek simülasyon performansı için \`do_compare\` metodunu elle yazmak endüstri standardıdır:
\`\`\`systemverilog
virtual function bit do_compare(uvm_object rhs, uvm_comparer comparer);
  my_packet rhs_;
  if (!$cast(rhs_, rhs)) return 0;

  return (super.do_compare(rhs, comparer) &&
          comparer.compare_field("addr", addr, rhs_.addr, 32) &&
          comparer.compare_field("data", data, rhs_.data, 32));
endfunction
\`\`\``,
      },
      {
        title: "3. Karşılaştırıcı Düğmeleri (Comparer Knobs) ve Politikalar",
        content: `\`uvm_comparer\` sınıfı, karşılaştırmanın davranışını milimetrik olarak ayarlamaya izin veren konfigürasyon değişkenlerine (knobs) sahiptir:

- **\`show_max\` (int)**: Raporlanacak maksimum uyuşmazlık (miscompare) adedini belirler. Varsayılan değeri \`1\`'dir (yani ilk uyuşmazlıkta durur ve sadece onu basar). Eğer bir paketteki tüm hatalı alanları görmek istiyorsanız bu değer örneğin \`10\` veya \`100\` yapılmalıdır.
- **\`sev\` (uvm_severity)**: Bir uyuşmazlık tespit edildiğinde üretilecek mesajın ciddiyet seviyesidir. Varsayılan değeri \`UVM_INFO\`'dur. İstenirse \`UVM_WARNING\` veya \`UVM_ERROR\` seviyesine çekilebilir.
- **\`miscompares\` (int)**: Karşılaştırma boyunca tespit edilen toplam hatalı alan sayısını tutar.
- **\`physical\` (bit)**: Yalnızca fiziksel alanların mı yoksa soyut meta verilerin de mi karşılaştırılacağını belirler.
- **\`check_type\` (bit)**: Karşılaştırılan iki nesnenin tam olarak aynı sınıftan türeyip türemediğini denetler.`,
      },
      {
        title: "4. Kapsamlı Kod Örneği: İki Paketin Karşılaştırılması",
        content: `Aşağıdaki örnekte iki farklı veri paketi oluşturulmuş, kasıtlı olarak farklı alanlar atanmış ve özel bir \`uvm_comparer\` ile karşılaştırılmıştır:

\`\`\`systemverilog
class my_data extends uvm_sequence_item;
  \`uvm_object_utils_begin(my_data)
    \`uvm_field_int(addr, UVM_DEFAULT | UVM_HEX)
    \`uvm_field_int(data, UVM_DEFAULT | UVM_HEX)
  \`uvm_object_utils_end

  bit [7:0] addr;
  bit [7:0] data;

  function new(string name = "my_data");
    super.new(name);
  endfunction
endclass

class comp_test extends uvm_test;
  \`uvm_component_utils(comp_test)

  my_data obj0, obj1;
  uvm_comparer custom_cmp;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    obj0 = my_data::type_id::create("obj0");
    obj1 = my_data::type_id::create("obj1");
    custom_cmp = new();
  endfunction

  virtual task run_phase(uvm_phase phase);
    phase.raise_objection(this);

    // obj0 degerleri
    obj0.addr = 8'h10;
    obj0.data = 8'hAA;

    // obj1 degerleri (Farkli adres ve veri!)
    obj1.addr = 8'h20;
    obj1.data = 8'hBB;

    // Karsilastirici ayarlarini yapilandir:
    custom_cmp.show_max = 5;          // Ilk 5 hatayi goster
    custom_cmp.sev      = UVM_WARNING; // Hatalari UVM_WARNING olarak bas

    \`uvm_info("TEST", "Paket karsilastirmasi baslatiliyor...", UVM_LOW)
    if (obj0.compare(obj1, custom_cmp)) begin
      \`uvm_info("TEST", "Paketler TAMAMEN ESLESTI!", UVM_LOW)
    end else begin
      \`uvm_error("TEST", $sformatf("Paketlerde %0d adet uyusmazlik tespit edildi!", 
                 custom_cmp.miscompares))
    end

    phase.drop_objection(this);
  endtask
endclass
\`\`\``,
      },
      {
        title: "5. Simülasyon Çıktısı ve Uyuşmazlık Raporu Analizi",
        content: `Yukarıdaki simülasyon koşturulduğunda \`custom_cmp\` sayesinde konsolda her iki uyuşmazlık da ayrıntılı bir fark tablosu olarak yazdırılır:

\`\`\`text
UVM_INFO @ 0: reporter [RNTST] Running test comp_test...
UVM_INFO comp_test.sv(27) @ 0: uvm_test_top [TEST] Paket karsilastirmasi baslatiliyor...
UVM_WARNING @ 0: reporter [MISCMP] Miscompare for obj0.addr: lhs = 'h10 : rhs = 'h20
UVM_WARNING @ 0: reporter [MISCMP] Miscompare for obj0.data: lhs = 'haa : rhs = 'hbb
UVM_ERROR comp_test.sv(32) @ 0: uvm_test_top [TEST] Paketlerde 2 adet uyusmazlik tespit edildi!
\`\`\`

Görüldüğü gibi \`show_max = 5\` yapıldığı için hem \`addr\` hem de \`data\` alanlarındaki uyuşmazlıklar sırayla listelenmiş ve \`lhs\` (Sol taraf - obj0) ile \`rhs\` (Sağ taraf - obj1) değerleri net bir şekilde gösterilmiştir.`,
      },
      {
        title: "6. Scoreboard Mimarilerinde Gelişmiş Karşılaştırma Stratejileri",
        content: `1. **Don't-Care ve Maskeleme:**
   Ağ ve haberleşme protokollerinde paketlerin sıra numaraları (sequence numbers) veya zaman damgaları (timestamp) referans model ile DUT arasında doğal olarak farklı olabilir. Bu alanlar \`do_compare\` içerisinde maskelenmeli veya \`UVM_NOCOMPARE\` bayrağı ile karşılaştırmadan muaf tutulmalıdır.

2. **Dinamik Dizi / Payload Karşılaştırması:**
   Büyük yük paketlerinde (payload queue) \`comparer.compare_field_int\` yerine döngüsel bayt karşılaştırması yapılmalı ve ilk hatalı indeks hızlıca loglanmalıdır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Karşılaştırıcı (\`uvm_comparer\`) ile Veri Karşılaştırma Politikaları** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-comparer.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class base_test extends uvm_test;
   \`uvm_component_utils (base_test)

   my_data obj0, obj1;
   derivative dv0, dv1;

   uvm_comparer uc0;

   function new (string name = "base_test", uvm_component parent);
      super.new (name, parent);
   endfunction

   virtual function void build_phase (uvm_phase phase);
      super.build_phase (phase);
      obj0 = my_data::type_id::create ("obj0");
      obj1 = my_data::type_id::create ("obj1");
      uc0 = new();
   endfunction

   virtual task run_phase (uvm_phase phase);

      cfg_comparer();
      // Do not use the same uvm_compare object to do multiple comparisons, like shown below 
      // The example is a demonstration of the different methods of uvm_compare
      // NOTE: There's an internal variable "result" that stores the number of miscompares.
      // This variable will continue to be incremented for every mismatch, until cleared manually 

      \`uvm_info ("COMPARE", "Trying out compare_field", UVM_MEDIUM)
      uc0.compare_field ("compare_field1", 7, 7, 2);            // pass
      uc0.compare_field ("compare_field2", 8'd45, 8'd8, 2);     // fail

      \`uvm_info ("COMPARE", "Trying out field_int", UVM_MEDIUM)
      uc0.compare_field_int ("field_int1", 64'hface_deaf_feed_cafe, 64'hfabe_deaf_feed_cafe, 64);  // fail 
      uc0.compare_field_int ("field_int2", 64'habcd_ef12_3456_7890, 64'habcd_ef12_3456_7890, 64);  // pass
      
      uc0.compare_field_int ("field_int3", 64'hface_deaf_feed_cafe, 64'h7ace_deaf_feed_cafe, 63);  // pass 
      uc0.compare_field_int ("field_int4", 64'hface_deaf_feed_cafe, 64'h8abe_deaf_feed_cafe, 64);  // fail 

      uc0.compare_field_int ("field_int5", 68'hbbbb_face_deaf_feed_cafe, 68'haaaa_8abe_deaf_feed_cafe, 68); //  won't work; nothing happens
      uc0.compare_field ("field", 68'hb_face_deaf_feed_cafe, 68'haa_8abe_deaf_feed_cafe, 68); // fail: will work with field, because size > 64

      \`uvm_info ("COMPARE", "Trying out compare_object", UVM_MEDIUM)
      void'(obj0.randomize());
      void'(obj1.randomize());
      uc0.compare_object ("object1", obj0, obj1);  // fail
      obj1.copy (obj0);
      uc0.compare_object ("object2", obj0, obj1);  // pass

      \`uvm_info ("COMPARE", "Trying out compare_string", UVM_MEDIUM)
      uc0.compare_string ("string1", "Hello", "World");   // fail
      uc0.compare_string ("string2", "Hello", "Hello");   // pass

      
      // Proper Usage: Set the configuration for uvm_comparer and pass it to compare()
      // The "result" variable is cleared before comparison starts within uvm_object::compare()
      obj0.name = "Apple";
      obj0.m_format0.m_color.fav = "magenta";
      obj0.m_format0.m_color.unfav = "yellow";

      obj1.name = "Orange";
      obj1.m_format0.m_color.fav = "magenta";
      obj1.m_format0.m_color.unfav = "green";

      cfg_comparer();
      void'(obj0.randomize());
      obj1.compare (obj0, uc0);

      // randomize and compare again
      void'(obj0.randomize());
      obj1.compare (obj0, uc0);
      

   endtask

   virtual function cfg_comparer();
      uc0.show_max = 20;     // total number of miscompares to be printed
      uc0.verbosity = UVM_MEDIUM;
   endfunction

endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Karşılaştırıcı (`uvm_comparer`) ile Veri Karşılaştırma Politikaları",
      initialCode: `class base_test extends uvm_test;
   \`uvm_component_utils (base_test)

   my_data obj0, obj1;
   derivative dv0, dv1;

   uvm_comparer uc0;

   function new (string name = "base_test", uvm_component parent);
      super.new (name, parent);
   endfunction

   virtual function void build_phase (uvm_phase phase);
      super.build_phase (phase);
      obj0 = my_data::type_id::create ("obj0");
      obj1 = my_data::type_id::create ("obj1");
      uc0 = new();
   endfunction

   virtual task run_phase (uvm_phase phase);

      cfg_comparer();
      // Do not use the same uvm_compare object to do multiple comparisons, like shown below 
      // The example is a demonstration of the different methods of uvm_compare
      // NOTE: There's an internal variable "result" that stores the number of miscompares.
      // This variable will continue to be incremented for every mismatch, until cleared manually 

      \`uvm_info ("COMPARE", "Trying out compare_field", UVM_MEDIUM)
      uc0.compare_field ("compare_field1", 7, 7, 2);            // pass
      uc0.compare_field ("compare_field2", 8'd45, 8'd8, 2);     // fail

      \`uvm_info ("COMPARE", "Trying out field_int", UVM_MEDIUM)
      uc0.compare_field_int ("field_int1", 64'hface_deaf_feed_cafe, 64'hfabe_deaf_feed_cafe, 64);  // fail 
      uc0.compare_field_int ("field_int2", 64'habcd_ef12_3456_7890, 64'habcd_ef12_3456_7890, 64);  // pass
      
      uc0.compare_field_int ("field_int3", 64'hface_deaf_feed_cafe, 64'h7ace_deaf_feed_cafe, 63);  // pass 
      uc0.compare_field_int ("field_int4", 64'hface_deaf_feed_cafe, 64'h8abe_deaf_feed_cafe, 64);  // fail 

      uc0.compare_field_int ("field_int5", 68'hbbbb_face_deaf_feed_cafe, 68'haaaa_8abe_deaf_feed_cafe, 68); //  won't work; nothing happens
      uc0.compare_field ("field", 68'hb_face_deaf_feed_cafe, 68'haa_8abe_deaf_feed_cafe, 68); // fail: will work with field, because size > 64

      \`uvm_info ("COMPARE", "Trying out compare_object", UVM_MEDIUM)
      void'(obj0.randomize());
      void'(obj1.randomize());
      uc0.compare_object ("object1", obj0, obj1);  // fail
      obj1.copy (obj0);
      uc0.compare_object ("object2", obj0, obj1);  // pass

      \`uvm_info ("COMPARE", "Trying out compare_string", UVM_MEDIUM)
      uc0.compare_string ("string1", "Hello", "World");   // fail
      uc0.compare_string ("string2", "Hello", "Hello");   // pass

      
      // Proper Usage: Set the configuration for uvm_comparer and pass it to compare()
      // The "result" variable is cleared before comparison starts within uvm_object::compare()
      obj0.name = "Apple";
      obj0.m_format0.m_color.fav = "magenta";
      obj0.m_format0.m_color.unfav = "yellow";

      obj1.name = "Orange";
      obj1.m_format0.m_color.fav = "magenta";
      obj1.m_format0.m_color.unfav = "green";

      cfg_comparer();
      void'(obj0.randomize());
      obj1.compare (obj0, uc0);

      // randomize and compare again
      void'(obj0.randomize());
      obj1.compare (obj0, uc0);
      

   endtask

   virtual function cfg_comparer();
      uc0.show_max = 20;     // total number of miscompares to be printed
      uc0.verbosity = UVM_MEDIUM;
   endfunction

endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Karşılaştırıcı (\`uvm_comparer\`) ile Veri Karşılaştırma Politikaları doğrulaması başarıyla tamamlandı.",
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
      question: "UVM'de `uvm_comparer` sınıfının `show_max` değişkeni varsayılan olarak 1 iken bu değerin 10 yapılması ne sağlar?",
      options: ["Karşılaştırma işleminin 10 simülasyon zaman birimi sonra bitmesini sağlar.", "İki nesne arasında tespit edilen ilk 10 uyuşmazlığın (miscompare) ayrıntılı olarak raporlanmasına izin verir.", "Karşılaştırma toleransını 10 bit genişletir.", "Skorbord bileşeninin 10 farklı paketi paralel karşılaştırmasını sağlar."],
      correctIndex: 1,
      explanation: "show_max düğmesi, raporlanacak maksimum uyuşmazlık adedini belirler. Varsayılan değer 1 olduğunda ilk hata basılıp durulurken, 10 yapıldığında ilk 10 uyuşmazlık detaylarıyla loglanır.",
    },
  },
  "uvm-callback": {
    id: "uvm-callback",
    badge: "Modül 10 • Geri Çağırmalar (Callbacks) ve Olaylar",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Geri Çağırma (Callback) Mekanizması ve Hata Enjeksiyonu",
    subtitle: "Mevcut bileşen kodunu değiştirmeden çalışma zamanında davranışını genişletme, hata enjeksiyonu ve kanca mimarisi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uml_uvm_callback.svg)`,
      },
      {
        title: "1. Callback Tasarım Deseni Nedir ve UVM'deki Önemi?",
        content: `Nesne Yönelimli Programlamanın (OOP) en temel prensiplerinden biri **Açık/Kapalı Prensibidir (Open-Closed Principle)**: Bir yazılım modülü geliştirmeye *açık*, ancak kaynak kod değişimine *kapalı* olmalıdır.

Doğrulama dünyasında üçüncü parti şirketlerden satın alınan veya ekip içinde standartlaştırılan Doğrulama Fikri Mülkiyetleri (Verification IP - VIP) bulunur (örneğin AXI VIP, USB VIP, PCIe VIP). Mühendislerin bu VIP'lerin kaynak kodunu değiştirmesi yasaktır; çünkü kod değiştiğinde VIP'nin taşınabilirliği bozulur.

Peki kaynak kodu değiştirmeden şu senaryolar nasıl gerçekleştirilebilir?
- Sürücünün gönderdiği paketlerin CRC alanına kasıtlı olarak hata enjekte etmek (Error Injection).
- Monitörün yakaladığı paketleri belirli bir kurala göre filtrelere tabi tutmak veya düşürmek (Packet Drop).
- Belirli bir işlem gerçekleştiğinde özel sayaçlar ve kapsam verileri toplamak.

İşte bu ihtiyacı karşılayan zarif çözüme **UVM Geri Çağırma (Callback)** mekanizması denir.`,
      },
      {
        title: "2. Temel Sınıflar ve Makrolar: `uvm_callback`, `uvm_register_cb`",
        content: `UVM callback altyapısı şu bileşenlerden oluşur:

- **\`uvm_callback\`**: Kullanıcı tanımlı tüm callback sınıflarının türetildiği soyut temel sınıftır.
- **\`\\\`uvm_register_cb(T, CB)\\\`**: \`CB\` callback tipini hedef bileşen tipi olan \`T\`'ye bağlayan makrodur.
- **\`\\\`uvm_do_callbacks(T, CB, METHOD)\\\`**: Hedef bileşenin kaynak kodu içerisinde, kayıtlı tüm callback'lerin ilgili metodunu sırayla yürüten kancadır.
- **\`\\\`uvm_do_callbacks_exit_on(T, CB, METHOD, VAL)\\\`**: Eğer callback metodu belirli bir değer (\`VAL\`) döndürürse döngüyü erken sonlandırır (örneğin bir paketin düşürülmesi durumunda).
- **\`uvm_callbacks#(T, CB)::add(t_inst, cb_inst)\`**: Çalışma zamanında belirli bir bileşen örneğine callback bağlayan statik metottur.`,
      },
      {
        title: "3. Sürücü veya Monitör Bileşeninde Callback Kancası Tanımlama",
        content: `Bir VIP geliştiricisi bileşenini callback destekli hale getirmek için 3 basit adım uygular:

\`\`\`systemverilog
// 1. Adim: Temel Callback Sinifini Tanimla (Govdesi bos virtual task/function)
virtual class my_driver_cb extends uvm_callback;
  function new(string name = "my_driver_cb");
    super.new(name);
  endfunction

  virtual task pre_send(my_driver drv, ref my_packet pkt);
    // Varsayilan olarak ici bostur
  endtask
endclass

// 2. Adim: Surucu Sinifina Callback'i Kaydet
class my_driver extends uvm_driver #(my_packet);
  \`uvm_component_utils(my_driver)
  \`uvm_register_cb(my_driver, my_driver_cb) // Kayit makrosu

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  virtual task run_phase(uvm_phase phase);
    forever begin
      seq_item_port.get_next_item(req);

      // 3. Adim: Kancayi calistir! (Kayitli callback'ler burada calisir)
      \`uvm_do_callbacks(my_driver, my_driver_cb, pre_send(this, req))

      // Paketi fiziksel pinlere sur:
      drive_pins(req);
      seq_item_port.item_done();
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "4. Kullanıcı Tarafı: Hata Enjekte Eden Callback Geliştirme",
        content: `Doğrulama mühendisi VIP koduna hiç dokunmadan, sadece \`my_driver_cb\` sınıfından türeyen bir hata enjektörü yazar:

\`\`\`systemverilog
class err_inject_cb extends my_driver_cb;
  \`uvm_object_utils(err_inject_cb)

  function new(string name = "err_inject_cb");
    super.new(name);
  endfunction

  // pre_send metodunu override et:
  virtual task pre_send(my_driver drv, ref my_packet pkt);
    if (pkt.addr == 8'hFF) begin
      \`uvm_info("ERR_CB", "Adres 0xFF yakalandi: KASITLI PARITE HATASI ENJEKTE EDILIYOR!", UVM_LOW)
      pkt.parity = ~pkt.parity; // Parite bitini ters cevir!
    end
  endtask
endclass
\`\`\``,
      },
      {
        title: "5. Test Sınıfında Callback Kaydı ve Etkinleştirme",
        content: `Oluşturulan callback nesnesi test sınıfının \`build_phase\` veya \`connect_phase\` aşamasında sürücüye bağlanır:

\`\`\`systemverilog
class error_test extends uvm_test;
  \`uvm_component_utils(error_test)
  my_env         m_env;
  err_inject_cb  m_err_cb;

  // ... build_phase ...
  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    m_env    = my_env::type_id::create("m_env", this);
    m_err_cb = err_inject_cb::type_id::create("m_err_cb");
  endfunction

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Callback'i surucuye bagla:
    uvm_callbacks#(my_driver, my_driver_cb)::add(m_env.m_agent.m_drv, m_err_cb);
  endfunction
endclass
\`\`\`

Dinamik Kontrol:
Bir callback çalışma zamanında geçici olarak devre dışı bırakılabilir veya tekrar açılabilir:
\`\`\`systemverilog
m_err_cb.callback_mode(0); // Gecici olarak kapat
m_err_cb.callback_mode(1); // Tekrar etkinlestir
\`\`\``,
      },
      {
        title: "6. Callback Kullanımında Performans ve Doğrulama İpuçları",
        content: `1. **Performans Etkisi:**
   \`\\\`uvm_do_callbacks\\\` makrosu, kayıtlı bir callback listesini döngüyle tarar. Eğer kayıtlı callback yoksa performans kaybı son derece düşüktür; ancak yoğun simülasyon döngülerinde çok sayıda karmaşık callback çalıştırmak simülasyonu yavaşlatabilir.

2. **Kayıtlı Callback'leri Listeleme:**
   Hata ayıklama esnasında hangi bileşene hangi callback'lerin bağlı olduğunu konsola dökmek için \`uvm_callbacks#(T, CB)::display()\` çağrılabilir.

3. **Çoklu Callback Sırası:**
   Bir bileşene birden fazla callback eklendiğinde bunlar varsayılan olarak eklenme sırasına (FIFO) göre çalıştırılır.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Geri Çağırma (Callback) Mekanizması ve Hata Enjeksiyonu** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-callback.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Macro definition
\`define uvm_register_cb(T,CB) 
  static local bit m_register_cb_\`\`CB = uvm_callbacks#(T,CB)::m_register_pair(\`"T\`",\`"CB\`");`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Geri Çağırma (Callback) Mekanizması ve Hata Enjeksiyonu",
      initialCode: `// Macro definition
\`define uvm_register_cb(T,CB) 
  static local bit m_register_cb_\`\`CB = uvm_callbacks#(T,CB)::m_register_pair(\`"T\`",\`"CB\`");`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Geri Çağırma (Callback) Mekanizması ve Hata Enjeksiyonu doğrulaması başarıyla tamamlandı.",
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
      question: "UVM'de bir sürücüye (driver) çalışma zamanında kullanıcı tanımlı bir callback nesnesi eklemek için hangi statik metot çağrısı kullanılır?",
      options: ["uvm_callbacks#(T, CB)::add(component_inst, cb_inst)", "component_inst.register_callback(cb_inst)", "uvm_config_db#(uvm_callback)::set(this, \"*\", \"cb\", cb_inst)", "cb_inst.bind_to(component_inst)"],
      correctIndex: 0,
      explanation: "UVM'de bileşen ile callback arasındaki ilişkiyi çalışma zamanında bağlamak için tip parametreli uvm_callbacks#(T, CB)::add(target_component, callback_instance) statik metodu kullanılır.",
    },
  },
  "uvm-event": {
    id: "uvm-event",
    badge: "Modül 10 • Geri Çağırmalar (Callbacks) ve Olaylar",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Olayları (`uvm_event`) ve Süreçler Arası Senkronizasyon",
    subtitle: "SystemVerilog `event` yapısının nesne yönelimli alternatifi: kalıcı tetikleme, veri taşıma ve yarış durumlarını önleme.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uml_uvm_event.svg)`,
      },
      {
        title: "1. Standart SystemVerilog Olaylarının Kısıtları ve `uvm_event` Çözümü",
        content: `SystemVerilog dilinin yerel \`event\` veri tipi, eşzamanlı süreçler (processes) arasında basit tetikleme senkronizasyonu sağlar. Ancak büyük doğrulama ortamlarında yerel \`event\` kullanımı iki büyük ölümcül probleme yol açar:

1. **Yarış Durumu ve Tetik Kaçırma (Race Condition / Missed Trigger):**
   Eğer Tetikleyici Süreç olayı tetiklerse (\`->e\`), ancak Dinleyici Süreç henüz dinleme satırına (\`@e\`) ulaşmamışsa tetikleme kaybolur. Dinleyici satıra bir simülasyon adımı veya hatta aynı delta döngüsünün hemen sonrasında gelse dahi sonsuza kadar kilitlenir (hang/deadlock).
2. **Veri Taşıyamama:**
   Yerel bir SystemVerilog eventi ile birlikte bir veri paketi, durum nesnesi veya sayaç iletilemez.

UVM, \`uvm_event\` sınıfı ile bu sınırlamaları ortadan kaldırır. \`uvm_event\`, nesne yönelimli, kalıcı tetikleme durumunu (\`persistent trigger\`) takip edebilen ve olayla birlikte nesne iletebilen gelişmiş bir senkronizasyon aracıdır.`,
      },
      {
        title: "2. `uvm_event` Temel Metotları ve Görevleri",
        content: `\`uvm_event\` sınıfı aşağıdaki temel metotları sağlar:

- **\`trigger(uvm_object data = null)\`**: Olayı tetikler. İsteğe bağlı olarak bir veri nesnesi (\`data\`) iliştirilebilir.
- **\`wait_trigger()\`**: Olayın tetiklenmesini bekleyen görevdir (\`task\`).
- **\`wait_ptrigger()\`**: **Kalıcı tetikleme beklemesi (persistent trigger).** Olay mevcut delta döngüsünde zaten tetiklenmişse beklemeden derhal döner; yarış durumlarını engeller.
- **\`wait_on()\`**: Olayın simülasyon boyunca en az bir kez tetiklenmiş olmasını bekler. Eğer olay daha önce tetiklenmişse ve sıfırlanmamışsa hemen döner.
- **\`wait_off()\`**: Olayın sıfırlanmasını (\`reset()\`) bekler.
- **\`reset()\`**: Olayın tetiklenme durumunu temizler (off durumuna getirir).
- **\`is_on()\`**: Olayın şu an tetiklenmiş durumda olup olmadığını sorgulayan fonksiyondur.
- **\`get_num_waiters()\`**: Bu olayı bekleyen aktif süreçlerin sayısını döndürür.`,
      },
      {
        title: "3. Senkronizasyon Senaryosu 1: Normal Sıralama (`wait_trigger` -> `trigger`)",
        content: `En ideal senaryoda dinleyici süreç önceden dinlemeye başlar ve tetikleyici süreç daha sonra olayı ateşler:

\`\`\`systemverilog
class test1 extends uvm_test;
  \`uvm_component_utils(test1)
  uvm_event m_event;

  function new(string name, uvm_component parent);
    super.new(name, parent);
    m_event = new("m_event");
  endfunction

  task process_a();
    #50;
    \`uvm_info("PROC_A", "Olay tetikleniyor...", UVM_LOW)
    m_event.trigger();
  endtask

  task process_b();
    \`uvm_info("PROC_B", "Olay bekleniyor...", UVM_LOW)
    m_event.wait_trigger();
    \`uvm_info("PROC_B", "Olay alindi, surec devam ediyor!", UVM_LOW)
  endtask

  virtual task run_phase(uvm_phase phase);
    phase.raise_objection(this);
    fork
      process_a();
      process_b();
    join
    phase.drop_objection(this);
  endtask
endclass
\`\`\`

Konsol Çıktısı:
\`\`\`text
UVM_INFO @ 0: uvm_test_top [PROC_B] Olay bekleniyor...
UVM_INFO @ 50: uvm_test_top [PROC_A] Olay tetikleniyor...
UVM_INFO @ 50: uvm_test_top [PROC_B] Olay alindi, surec devam ediyor!
\`\`\``,
      },
      {
        title: "4. Senkronizasyon Senaryosu 2: Tetikleme Önce, Bekleme Sonra (`wait_ptrigger` Gücü)",
        content: `Eğer tetikleyici süreç \`#10\` zamanında olayı ateşlerse, ancak dinleyici süreç bir gecikme nedeniyle \`#20\` zamanında dinlemeye başlarsa ne olur?

Eğer klasik \`wait_trigger()\` kullanılırsa: Dinleyici sonsuza kadar bekler ve simülasyon kilitlenir!
Ancak \`wait_ptrigger()\` veya \`wait_on()\` kullanılırsa:

\`\`\`systemverilog
task process_a();
  #10;
  \`uvm_info("PROC_A", "Tetikleme yapildi (t=10)", UVM_LOW)
  m_event.trigger();
endtask

task process_b();
  #20; // Tetikleme coktan gerceklesti!
  \`uvm_info("PROC_B", "Gecikmeli dinleme basladi (t=20)", UVM_LOW)
  // wait_on() olayin zaten aktif oldugunu gorup ANINDA doner:
  m_event.wait_on();
  \`uvm_info("PROC_B", "Gecikmeye ragmen olay yakalandi!", UVM_LOW)
endtask
\`\`\`

Bu yetenek, reset bırakma (reset deassertion) veya PLL kilitlenme gibi tek seferlik global olayların yakalanmasında vazgeçilmezdir.`,
      },
      {
        title: "5. Senkronizasyon Senaryosu 3: Sıfır-Zaman (Zero-Delta) Yarış Durumu",
        content: `Aynı simülasyon zamanında (\`#0\`) iki süreç çalıştığında, simülatörün zamanlayıcısı (scheduler) hangi sürecin önce çalışacağını garanti etmez:
- Eğer Süreç A önce çalışıp \`trigger()\` yaparsa,
- Ardından Süreç B aynı zaman adımında \`wait_trigger()\` çağırırsa tetiklemeyi kaçırabilir!

İşte \`wait_ptrigger()\` tam olarak bu sıfır-zaman delta döngüsü yarışlarını önlemek için tasarlanmıştır. \`wait_ptrigger()\`, mevcut simülasyon zaman damgasında olayın tetiklenip tetiklenmediğini kontrol eder.`,
      },
      {
        title: "6. Olay Üzerinden Veri Paylaşımı (`trigger(data)` ve `get_trigger_data()`)",
        content: `\`uvm_event\`, tetikleme esnasında bir \`uvm_object\` taşıyabilir:

\`\`\`systemverilog
// Surec 1: Paketi olaya ekleyerek tetikle
my_packet pkt = my_packet::type_id::create("pkt");
pkt.addr = 8'h55;
m_event.trigger(pkt);

// Surec 2: Olayi bekle ve tasiyici veriyi cek
uvm_object tmp_obj;
my_packet  rcv_pkt;

m_event.wait_trigger();
tmp_obj = m_event.get_trigger_data();
$cast(rcv_pkt, tmp_obj);
\`uvm_info("RCV", $sformatf("Olaydan alinan paket: addr=0x%02h", rcv_pkt.addr), UVM_LOW)
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Olayları (\`uvm_event\`) ve Süreçler Arası Senkronizasyon** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-event.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Declare handle for uvm_event
uvm_event    <inst_name>

// Instantiate uvm_event in build_phase of component
// or within an object
<inst_name> = new();`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Olayları (`uvm_event`) ve Süreçler Arası Senkronizasyon",
      initialCode: `// Declare handle for uvm_event
uvm_event    <inst_name>

// Instantiate uvm_event in build_phase of component
// or within an object
<inst_name> = new();`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Olayları (\`uvm_event\`) ve Süreçler Arası Senkronizasyon doğrulaması başarıyla tamamlandı.",
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
      question: "Bir UVM sürecinde olayın tetiklenmesi (trigger) aynı zaman adımında dinleyiciden hemen önce gerçekleşmişse, sürecin sonsuza kadar kilitlenmesini (deadlock) önlemek için standart wait_trigger() yerine hangi metot kullanılmalıdır?",
      options: ["wait_ptrigger()", "wait_off()", "reset()", "get_num_waiters()"],
      correctIndex: 0,
      explanation: "wait_ptrigger() (persistent trigger beklemesi), olay mevcut zaman adımının bir önceki delta döngüsünde tetiklenmiş olsa bile bunu algılar ve sürecin kilitlenmesini önleyerek hemen geri döner.",
    },
  },
  "uvm-event-pool": {
    id: "uvm-event-pool",
    badge: "Modül 10 • Geri Çağırmalar (Callbacks) ve Olaylar",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "UVM Olay Havuzu (`uvm_event_pool`) ile Global Senkronizasyon",
    subtitle: "Hiyerarşik referanslara ihtiyaç duymadan, dizge (string) tabanlı anahtarlarla bileşenler arası olay paylaşımı.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uml_uvm_event_pool.svg)`,
      },
      {
        title: "1. `uvm_event_pool` Nedir ve Neden Kullanılır?",
        content: `Büyük SoC doğrulama ortamlarında iki farklı bileşenin senkronize olması gerektiğinde (örneğin hiyerarşinin çok derinlerindeki bir \`reset_monitor\` ile test seviyesinde koşan bir \`virtual_sequence\`), nesne referanslarını elden ele geçirmek (\`handle passing\`) modülerliği bozar.

Her bileşenin diğer bileşenin tam hiyerarşik yolunu bilmesi gerekirse bileşenlerin bağımsızlığı ve yeniden kullanılabilirliği (reusability) yok olur.

\`uvm_event_pool\`, **dizge tabanlı anahtarlarla (string keys) erişilen merkezi bir \`uvm_event\` deposudur**. İki bağımsız bileşen yalnızca ortak bir isim (örneğin \`"RESET_DEASSERTED"\`) üzerinde anlaşarak birbirlerinin varlığından habersiz şekilde senkronize olabilir.`,
      },
      {
        title: "2. Tekil (Singleton) Global Havuz Erişimi",
        content: `UVM, tüm testbench ortamında paylaşılan tekil bir global havuz sunar:

\`\`\`systemverilog
uvm_event_pool global_pool = uvm_event_pool::get_global_pool();
\`\`\`

Bu global havuza herhangi bir bileşenden, diziden veya modülden doğrudan erişilebilir.`,
      },
      {
        title: "3. Temel Havuz Metotları: `get()`, `exists()`, `delete()`",
        content: `\`uvm_event_pool\` sınıfının en sık kullanılan metotları:

- **\`get(string key)\`**: En kritik fonksiyondur. Belirtilen isimdeki \`uvm_event\` nesnesini döndürür. **Eğer o isimde bir olay havuzda henüz yoksa, havuz otomatik olarak yeni bir \`uvm_event\` oluşturur, havuza ekler ve onun referansını döndürür! (Lazy Initialization)**
- **\`exists(string key)\`**: Belirtilen anahtarın havuzda kayıtlı olup olmadığını kontrol eder (1 veya 0 döner).
- **\`delete(string key)\`**: Belirtilen olayı havuzdan siler.
- **\`add(string key, uvm_event item)\`**: Elle oluşturulmuş bir \`uvm_event\` nesnesini havuza ekler.`,
      },
      {
        title: "4. Temel Olay Havuzu Uygulama Örneği",
        content: `Aşağıdaki örnekte havuz üzerinden dinamik olay yönetimi gösterilmektedir:

\`\`\`systemverilog
module tb_top;
  initial begin
    uvm_event_pool ep = uvm_event_pool::get_global_pool();
    uvm_event e1, e2;

    // "EV_INIT" olayi ilk kez isteniyor -> Otomatik yaratilir:
    e1 = ep.get("EV_INIT");

    // Baska bir modul ayni ismi istediginde ayni nesne referansi doner:
    e2 = ep.get("EV_INIT");

    if (e1 == e2) begin
      $display("Basarili: e1 ve e2 ayni global nesneye isaret ediyor!");
    end
  end
endmodule
\`\`\``,
      },
      {
        title: "5. Gerçek Hayat Senaryosu: Reset Monitörü ile Dizi Senkronizasyonu",
        content: `Gerçek bir doğrulama projesinde reset monitörünün reset bitişini duyurması ve bir dizinin bunu beklemesi:

\`\`\`systemverilog
// 1. Bilesen: Reset Monitor
class reset_monitor extends uvm_monitor;
  \`uvm_component_utils(reset_monitor)
  virtual rst_if vif;

  // ... constructor ...

  virtual task run_phase(uvm_phase phase);
    uvm_event ev_rst_done;
    ev_rst_done = uvm_event_pool::get_global_pool().get("RESET_DONE");

    @(negedge vif.rst_n); // Reset basladi
    @(posedge vif.rst_n); // Reset bitti!
    \`uvm_info("RST_MON", "Reset birakildi (Deasserted). Olay tetikleniyor!", UVM_LOW)
    ev_rst_done.trigger();
  endtask
endclass

// 2. Bilesen: Konfigurasyon Dizisi (Test seviyesinde calisir)
class cfg_seq extends uvm_sequence;
  \`uvm_object_utils(cfg_seq)

  virtual task body();
    uvm_event ev_rst_done;
    ev_rst_done = uvm_event_pool::get_global_pool().get("RESET_DONE");

    \`uvm_info("CFG_SEQ", "Resetin bitmesi bekleniyor...", UVM_LOW)
    // Olay tetiklenene kadar bekle:
    ev_rst_done.wait_on();

    \`uvm_info("CFG_SEQ", "Reset bitti! Konfigurasyon islemleri baslatiliyor...", UVM_LOW)
    // Register yazma islemlerini yurut...
  endtask
endclass
\`\`\`

Bu mimaride \`cfg_seq\` dizisinin \`reset_monitor\`'ün ortamdaki konumunu veya varlığını bilmesine gerek yoktur. Her iki bileşen de tamamen bağımsız ve modülerdir.`,
      },
      {
        title: "6. Olay Havuzu Kullanımında En İyi Pratikler ve İsimlendirme Kuralları",
        content: `1. **İsim Çakışmalarını (Name Collisions) Önleme:**
   Büyük ekiplerde string anahtarlar çakışabilir. Bu yüzden anahtar isimlerine hiyerarşik önekler eklenmelidir (ör. \`"CHIP_TOP.RESET_DONE"\`, \`"PCIE_EP0.LINK_UP"\`).

2. **\`wait_on()\` Tercih Edin:**
   Reset gibi durum bildirimlerinde \`wait_trigger()\` yerine \`wait_on()\` kullanın. Böylece dizi monitörden birkaç simülasyon adımı sonra başlasa bile kilitlenme yaşanmaz.

3. **Fazlar Arası Temizlik:**
   Tekrarlanan veya döngüsel testlerde olayların durumunu sıfırlamak için \`reset()\` metodunu çağırmayı unutmayın.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Olay Havuzu (\`uvm_event_pool\`) ile Global Senkronizasyon** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-event-pool.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class uvm_object_string_pool #(type T=uvm_object) extends uvm_pool #(string,T);

typedef uvm_object_string_pool #(uvm_event#(uvm_object)) uvm_event_pool;`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Olay Havuzu (`uvm_event_pool`) ile Global Senkronizasyon",
      initialCode: `class uvm_object_string_pool #(type T=uvm_object) extends uvm_pool #(string,T);

typedef uvm_object_string_pool #(uvm_event#(uvm_object)) uvm_event_pool;`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Olay Havuzu (\`uvm_event_pool\`) ile Global Senkronizasyon doğrulaması başarıyla tamamlandı.",
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
      question: "`uvm_event_pool::get_global_pool().get(\"my_sync_event\")` çağrısı yapıldığında \"my_sync_event\" isimli olay havuzda henüz mevcut değilse ne olur?",
      options: ["UVM_FATAL hatası oluşur ve simülasyon çöker.", "Null referans döner.", "Havuz otomatik olarak bu isimle yeni bir uvm_event nesnesi yaratır, havuza ekler ve referansını döndürür.", "İşlem bloklanır ve başka bir bileşen olayı ekleyene kadar bekler."],
      correctIndex: 2,
      explanation: "uvm_event_pool sınıfının get() fonksiyonu talep üzerine oluşturma (lazy initialization) prensibiyle çalışır; anahtar mevcut değilse otomatik olarak yeni bir uvm_event nesnesi yaratıp kaydeder ve döndürür.",
    },
  },
  "uvm-register-layer": {
    id: "uvm-register-layer",
    badge: "Modül 11 • Yazmaç Soyutlama Katmanı (RAL / Register Layer)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM Yazmaç Soyutlama Katmanı (RAL) Mimarisi ve Temelleri",
    subtitle: "Donanım yazmaçlarının ve bellek haritalarının nesne yönelimli modellenmesi, ön/arka kapı erişimleri ve doğrulama faydaları.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm_ral_reg_file_example.svg)
![UVM Mimari Şeması](/images/uvm/memory_map-002.jpg)`,
      },
      {
        title: "1. Donanım Tasarımında Yazmaçlar ve Doğrulama Zorlukları",
        content: `Sayısal entegre devrelerde (ASIC, FPGA, SoC) yazmaçlar (registers), donanımın beynidir. Tasarımın çalışma modlarını belirleyen kontrol yazmaçları (\`control registers\`), donanımın anlık durumunu bildiren durum yazmaçları (\`status registers\`), kesme bayrakları (\`interrupt registers\`) ve sayaçlar donanım yazmaçlarına örnektir.

RAL (Register Abstraction Layer) öncesinde geleneksel doğrulama yönteminde mühendisler yazmaçlara erişmek için doğrudan veri yolu işlem paketleri oluşturmak zorundaydı:
\`\`\`systemverilog
// Geleneksel Yontem (RAL OLMADAN):
apb_seq_item req = apb_seq_item::type_id::create("req");
req.addr = 32'h4000_1004; // Sabit donanim adresi
req.data = 32'h0000_0001; // Kontrol biti
start_item(req);
finish_item(req);
\`\`\`

Bu geleneksel yaklaşımın ölümcül kusurları:
1. **Adres Değişikliği Kırılganlığı:** Tasarımcı RTL kodunda adres haritasını değiştirdiğinde, testbench içinde yazılmış yüzlerce test dizisi çöker.
2. **Durum Takipsizliği:** Testbench, donanım yazmaçlarının o anki değerini bilmez. Bir bitin değerini kontrol etmek için her seferinde fiziksel okuma yapılması gerekir.
3. **Protokol Bağımlılığı:** Testler doğrudan APB veya AXI paketlerine bağımlıdır. Tasarım başka bir veri yoluna taşındığında testler yeniden yazılamaz.`,
      },
      {
        title: "2. Yazmaç Bloğu (`register block`) ve Bellek Haritası (`memory map`) Kavramları",
        content: `UVM RAL mimarisini anlamak için üç temel kavram bilinmelidir:

- **Yazmaç (\`uvm_reg\`)**: Genellikle 8, 16, 32 veya 64 bit genişliğinde olan tek bir donanım yazmacıdır. İçerisinde farklı işlevlere sahip bit alanları (\`uvm_reg_field\`) barındırır.
- **Yazmaç Bloğu (\`uvm_reg_block\`)**: Bir IP bloğuna (örneğin bir UART, SPI veya DMA denetleyicisine) ait tüm yazmaçların, belleklerin ve alt blokların toplandığı mantıksal yapıdır.
- **Bellek Haritası (\`uvm_reg_map\`)**: Yazmaçların fiziksel adres uzayındaki dizilimini, taban adres ofsetlerini (\`base address\`), veri yolu genişliğini (bayt cinsinden) ve erişim haklarını tanımlayan yapıdır.`,
      },
      {
        title: "3. UVM RAL (Register Abstraction Layer) Nedir?",
        content: `UVM RAL, donanımdaki tüm fiziksel yazmaçların ve bellek haritalarının nesne yönelimli bir **dijital ikizini (digital twin / shadow model)** oluşturan güçlü bir soyutlama katmanıdır.

RAL sayesinde doğrulama mühendisi adreslerle veya veri yolu sinyalleriyle uğraşmaz. Yalnızca nesne metotlarını çağırır:
\`\`\`systemverilog
// RAL ile Yazmac Erisimi:
reg_model.uart_ctrl.write(status, 32'h01); // Yazma islemi
reg_model.uart_status.read(status, rdata);  // Okuma islemi
\`\`\`

RAL motoru; bu soyut çağrıyı otomatik olarak donanımın bellek haritasındaki adrese eşler, veri yolu bağdaştırıcısı (\`adapter\`) üzerinden ilgili protokol paketine (APB/AXI) dönüştürür ve fiziksel pinlere sürer!`,
      },
      {
        title: "4. Neden RAL Kullanmalıyız? (Sağladığı Mimari Avantajlar)",
        content: `RAL kullanmanın sağladığı başlıca avantajlar şunlardır:

1. **Protokolden Tamamen Bağımsızlık:** Bir test senaryosu UART kontrol yazmacını yapılandırırken alt veri yolunun APB mi, AXI mi yoksa Wishbone mu olduğunu bilmek zorunda değildir. Veri yolu değiştiğinde yalnızca adaptör (\`adapter\`) değiştirilir; tüm test senaryoları %100 yeniden kullanılır.
2. **Çift Kapı Erişimi (Frontdoor & Backdoor):** Aynı yazmaç API'si ile hem fiziksel veri yolu pinleri üzerinden (Frontdoor - zaman tüketen) hem de simülatör veritabanı üzerinden sıfır zamanda (Backdoor - anlık) erişim yapılabilir.
3. **Otomatik Kapsama (Coverage) ve Kısıtlar:** Yazmaçların alanları rastgele testler için kısıtlanabilir ve yazmaç okuma/yazma kapsamı otomatik toplanabilir.
4. **Hiyerarşik Yeniden Kullanılabilirlik:** Blok seviyesinde oluşturulan bir \`uart_reg_block\`, üst düzey SoC yazmaç bloğunun içine bir alt blok (\`sub-block\`) olarak doğrudan eklenebilir.`,
      },
      {
        title: "5. Değer Takip Mimarisi: Desired, Mirrored ve Actual Hardware Değerleri",
        content: `UVM RAL mimarisinin en dahi yönlerinden biri üçlü değer takip modelidir:

- **Fiziksel Değer (Actual Hardware Value):** DUT içerisindeki flip-flop'ların fiziksel olarak sahip olduğu gerçek değerdir.
- **Aynalanan Değer (Mirrored Value):** UVM modelinin, donanımda olduğuna inandığı son geçerli tahmini değerdir. Donanıma yapılan her başarılı okuma/yazma işleminde veya monitör gözleminde güncellenir.
- **İstenen Değer (Desired Value):** Doğrulama mühendisinin testbench içinde yazmaçta olmasını hedeflediği değerdir. \`reg.set()\` ile ayarlanır, ancak henüz donanıma yazılmamıştır. \`reg.update()\` çağrıldığında fiziksel olarak donanıma aktarılır.`,
      },
      {
        title: "6. RAL ile Otomatik Testler (Built-in Sequences)",
        content: `Bir yazmaç modeli kurulduğunda UVM, tek bir satır testbench kodu yazmadan çalıştırılabilecek hazır regresyon test dizileri sunar:

- **\`uvm_reg_hw_reset_seq\`**: Tasarımdaki tüm yazmaçları okur ve sıfırlama (reset) anındaki fabrika çıkış değerlerinin veri sayfasındaki (datasheet) değerlerle tam uyuştuğunu doğrular.
- **\`uvm_reg_bit_bash_seq\`**: Tüm yazmaç alanlarındaki her bir biti (0 ve 1 olarak) sırayla yazar ve okur; donanımda kısa devre, takılı kalma (stuck-at) veya komşu bit kaçaklarını tespit eder.
- **\`uvm_reg_access_seq\`**: Salt-okunur (RO), yazma-temizleme (W1C), salt-yazılır (WO) gibi erişim haklarının donanımda doğru uygulandığını doğrular.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM Yazmaç Soyutlama Katmanı (RAL) Mimarisi ve Temelleri** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-register-layer.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// RTL representation

module reg_block (...);
	wire [31:0]     reg_ctl;
	
	// Declare reg variables to store register field values
	reg             ctl_en;      // Enable for the module
	reg [2:0]       ctl_mode;    // Mode 
	reg             ctl_halt;    // Halt 
	reg             ctl_auto;    // Auto shutdown 
	reg [4:0]       ctl_speed;   // Speed control
	
	assign reg_ctl = {16'b0, ctl_speed, 5'b0, ctl_auto, ctl_halt, ctl_mode, ctl_en};
	
	// Logic for getting individual fields from the bus
	...
endmodule`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM Yazmaç Soyutlama Katmanı (RAL) Mimarisi ve Temelleri",
      initialCode: `// RTL representation

module reg_block (...);
	wire [31:0]     reg_ctl;
	
	// Declare reg variables to store register field values
	reg             ctl_en;      // Enable for the module
	reg [2:0]       ctl_mode;    // Mode 
	reg             ctl_halt;    // Halt 
	reg             ctl_auto;    // Auto shutdown 
	reg [4:0]       ctl_speed;   // Speed control
	
	assign reg_ctl = {16'b0, ctl_speed, 5'b0, ctl_auto, ctl_halt, ctl_mode, ctl_en};
	
	// Logic for getting individual fields from the bus
	...
endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM Yazmaç Soyutlama Katmanı (RAL) Mimarisi ve Temelleri doğrulaması başarıyla tamamlandı.",
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
      question: "UVM RAL (Register Abstraction Layer) mimarisinde \"Aynalanan Değer\" (Mirrored Value) neyi ifade eder?",
      options: ["RTL kodunun sentezlenmiş netlist kopyasını.", "UVM yazmaç modelinin, fiziksel donanım yazmacında bulunduğunu öngördüğü/takip ettiği son güncel gölge değeri.", "Testbench tarafından donanıma bir sonraki işlemde yazılması hedeflenen istenen değeri.", "Donanım yazmacının fabrika çıkışındaki kalıcı ROM değerini."],
      correctIndex: 1,
      explanation: "Aynalanan Değer (Mirrored Value), UVM modelinin donanım yazmacındaki gerçek değerle senkronize tuttuğu gölge değerdir. İstenen değer ise 'Desired Value' olarak adlandırılır.",
    },
  },
  "uvm-register-model": {
    id: "uvm-register-model",
    badge: "Modül 11 • Yazmaç Soyutlama Katmanı (RAL / Register Layer)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM RAL Sınıf Mimarisi: `uvm_reg_field`, `uvm_reg` ve `uvm_reg_block`",
    subtitle: "Yazmaç alanlarının (field), yazmaçların ve yazmaç bloklarının nesne yönelimli modellenmesi ve değer takibi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uml_uvm_ral_hier.svg)
![UVM Mimari Şeması](/images/uvm/uml_uvm_reg_field.png)`,
      },
      {
        title: "1. Yazmaç Modeli Sınıf Hiyerarşisine Genel Bakış",
        content: `UVM RAL, donanım yazmaç hiyerarşisini modellemek için nesne yönelimli bir sınıf ağacı tanımlar:

- **\`uvm_reg_field\`**: En küçük yapı taşıdır. Bir yazmaç içerisindeki bağımsız tek bir biti veya bit grubunu modeller (örneğin 1-bitlik enable biti veya 4-bitlik mod seçici).
- **\`uvm_reg\`**: Bir veya daha fazla \`uvm_reg_field\` içeren bağımsız bir yazmaçtır (örneğin 32-bitlik \`CTRL\` yazmacı).
- **\`uvm_reg_block\`**: Birden çok yazmacı, bellek yapısını (\`uvm_mem\`) ve alt blokları içeren en üst düzey kapsayıcıdır.
- **\`uvm_reg_map\`**: Blok içerisindeki yazmaçların adres ofsetlerini ve veri yolu özelliklerini yöneten adres haritasıdır.`,
      },
      {
        title: "2. `uvm_reg_field`: Anatomisi ve Yapılandırması",
        content: `Bir alan (\`uvm_reg_field\`), \`configure()\` metodu çağrılarak yapılandırılır:

\`\`\`systemverilog
field.configure(
  parent,                  // Bu alanın ait olduğu uvm_reg nesnesi
  size,                    // Bit genişliği (ör. 1, 4, 8)
  lsb_pos,                 // Yazmaç içindeki en anlamsız bit konumu (LSB)
  access,                  // Erişim hakkı ("RW", "RO", "WO", "W1C", vb.)
  volatile,                // Donanım tarafından kendiliğinden değişebilir mi? (1: Evet)
  reset,                   // Sıfırlama (reset) anındaki başlangıç değeri
  has_reset,               // Reset değeri tanımlı mı? (1: Evet)
  is_rand,                 // Randomizasyona dahil edilsin mi? (1: Evet)
  individually_accessible  // Veri yolundan tek başına adreslenebilir mi?
);
\`\`\`

UVM'de Desteklenen Başlıca Erişim Politikaları:
- **\`"RW"\`**: Okunabilir ve Yazılabilir (Read/Write).
- **\`"RO"\`**: Salt Okunur (Read Only) - Donanım durum bayrakları için.
- **\`"WO"\`**: Salt Yazılır (Write Only).
- **\`"W1C"\`**: 1 Yazıldığında Temizlenir (Write 1 to Clear) - Kesme (Interrupt) bayrakları için endüstri standardıdır.`,
      },
      {
        title: "3. `uvm_reg`: Yazmaç Sınıfı ve Temel Metotları",
        content: `Bir yazmaç sınıfı \`uvm_reg\`'den türetilir ve \`build()\` metodu içerisinde alanlarını yaratıp yapılandırır:

\`\`\`systemverilog
class reg_ctrl extends uvm_reg;
  \`uvm_object_utils(reg_ctrl)

  rand uvm_reg_field enable;
  rand uvm_reg_field mode;

  function new(string name = "reg_ctrl");
    super.new(name, 32, UVM_NO_COVERAGE); // 32-bit genislik
  endfunction

  virtual function void build();
    enable = uvm_reg_field::type_id::create("enable");
    enable.configure(this, 1, 0, "RW", 0, 1'b0, 1, 1, 0);

    mode = uvm_reg_field::type_id::create("mode");
    mode.configure(this, 2, 1, "RW", 0, 2'b00, 1, 1, 0);
  endfunction
endclass
\`\`\`

En Sık Kullanılan Yazmaç Metotları:
- **\`write(status, value)\`**: Fiziksel veri yolu üzerinden donanıma yazar ve aynalanan değeri günceller.
- **\`read(status, value)\`**: Donanımdan okur ve aynalanan değeri okunan değerle eşitler.
- **\`set(value)\`**: Donanıma erişmeden SADECE modeldeki istenen (\`desired\`) değeri günceller.
- **\`get()\`**: Modeldeki istenen değeri döndürür.
- **\`get_mirrored_value()\`**: Modeldeki aynalanan değeri döndürür.`,
      },
      {
        title: "4. `uvm_reg_block`: Blok ve Harita (`uvm_reg_map`) Yapılandırması",
        content: `Yazmaç bloğu yazmaçları örnekler ve bir bellek haritası (\`uvm_reg_map\`) oluşturarak yazmaçları adreslere yerleştirir:

\`\`\`systemverilog
class my_reg_block extends uvm_reg_block;
  \`uvm_object_utils(my_reg_block)

  rand reg_ctrl   ctrl;
  rand reg_status stat;

  function new(string name = "my_reg_block");
    super.new(name, UVM_NO_COVERAGE);
  endfunction

  virtual function void build();
    // 1. Harita olustur (Ad: "default_map", Taban: 0x0, Genislik: 4 bayt/32-bit)
    default_map = create_map("default_map", 'h0, 4, UVM_LITTLE_ENDIAN);

    // 2. Yazmaclari uret ve yapilandir
    ctrl = reg_ctrl::type_id::create("ctrl");
    ctrl.configure(this, null, "");
    ctrl.build();

    stat = reg_status::type_id::create("stat");
    stat.configure(this, null, "");
    stat.build();

    // 3. Yazmaclari adres ofsetleri ile haritaya ekle
    default_map.add_reg(ctrl, 'h00, "RW"); // Adres: 0x00
    default_map.add_reg(stat, 'h04, "RO"); // Adres: 0x04

    // 4. Modeli kilitle (degisikliklere kapat)
    lock_model();
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. İstenen (Desired) ve Aynalanan (Mirrored) Değer Senkronizasyonu",
        content: `Model ile donanım arasındaki senkronizasyonu yöneten üç kritik metot vardır:

1. **\`predict(value)\`**:
   Monitör veri yolunda bir işlem gördüğünde çağrılır. Modeldeki aynalanan değeri fiziksel işlem yapmadan günceller.
2. **\`update(status)\`**:
   İstenen değer ile aynalanan değeri karşılaştırır. Eğer aralarında fark varsa donanıma fiziksel \`write\` işlemi göndererek donanımı istenen seviyeye getirir; fark yoksa gereksiz veri yolu işlemi yapmaz!
3. **\`mirror(status, UVM_CHECK)\`**:
   Donanımdan fiziksel okuma yapar. Okunan değeri modeldeki aynalanan değerle karşılaştırır (\`UVM_CHECK\`). Uyuşmazlık varsa \`UVM_ERROR\` fırlatır ve modeli donanımla eşitler.`,
      },
      {
        title: "6. Otomatik Model Üretim Akışları (RAL Generators)",
        content: `Gerçek endüstriyel çip tasarımlarında binlerce yazmaç bulunur. Bu sınıfları elle yazmak imkansızdır.

Bunun yerine sistem mimarları yazmaçları **IP-XACT (IEEE 1685)**, **SystemRDL** veya Excel/CSV formatında tanımlar. EDA araçları (Synopsys \`ralgen\`, Cadence veya açık kaynak scriptler) bu dosyalardan hatasız UVM SystemVerilog kodlarını otomatik üretir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM RAL Sınıf Mimarisi: \`uvm_reg_field\`, \`uvm_reg\` ve \`uvm_reg_block\`** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-register-model.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Sample IPXACT register specification

<spirit:usage>register</spirit:usage>
	<spirit:register>
    	<spirit:name>REG_CTL</spirit:name>
      	<spirit:addressOffset>0x0</spirit:addressOffset>
      	<spirit:size>32</spirit:size>
      	<spirit:reset>
         	<spirit:value>0x2A</spirit:value>
      	</spirit:reset>
      	<spirit:access>read-write</spirit:access>
      	<spirit:field>
          <spirit:name>EN</spirit:name>
          <spirit:description>Enable the module</spirit:description>
          <spirit:bitOffset>0</spirit:bitOffset>
          <spirit:bitWidth>1</spirit:bitWidth>
          <spirit:access>read-write</spirit:access>
      </spirit:field>

      ...`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM RAL Sınıf Mimarisi: `uvm_reg_field`, `uvm_reg` ve `uvm_reg_block`",
      initialCode: `// Sample IPXACT register specification

<spirit:usage>register</spirit:usage>
	<spirit:register>
    	<spirit:name>REG_CTL</spirit:name>
      	<spirit:addressOffset>0x0</spirit:addressOffset>
      	<spirit:size>32</spirit:size>
      	<spirit:reset>
         	<spirit:value>0x2A</spirit:value>
      	</spirit:reset>
      	<spirit:access>read-write</spirit:access>
      	<spirit:field>
          <spirit:name>EN</spirit:name>
          <spirit:description>Enable the module</spirit:description>
          <spirit:bitOffset>0</spirit:bitOffset>
          <spirit:bitWidth>1</spirit:bitWidth>
          <spirit:access>read-write</spirit:access>
      </spirit:field>

      ...`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM RAL Sınıf Mimarisi: \`uvm_reg_field\`, \`uvm_reg\` ve \`uvm_reg_block\` doğrulaması başarıyla tamamlandı.",
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
      question: "Bir UVM yazmaç modelinde `my_reg.set(32'hA5A5)` metodunun çağrılmasının ardından fiziksel donanıma ne olur?",
      options: ["Veri yolu üzerinden derhal bir yazma paketi gönderilir.", "Fiziksel donanıma hiçbir erişim yapılmaz; yalnızca model içerisindeki istenen (desired) değer güncellenir.", "Donanımdaki değer sıfırlanır.", "Model kilitlenir ve başka yazma işlemine izin vermez."],
      correctIndex: 1,
      explanation: "set() metodu donanıma fiziksel erişim yapmaz; yalnızca UVM modelinin içindeki istenen (desired) değeri günceller. Değeri donanıma fiziksel olarak yazmak için update() veya write() çağrılmalıdır.",
    },
  },
  "uvm-register-environment": {
    id: "uvm-register-environment",
    badge: "Modül 11 • Yazmaç Soyutlama Katmanı (RAL / Register Layer)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM RAL Ortamı: Yazmaç Bağdaştırıcı (`uvm_reg_adapter`) ve Öngörücü (`uvm_reg_predictor`)",
    subtitle: "Soyut yazmaç komutlarının fiziksel veri yolu işlemlerine dönüştürülmesi ve monite edilen verilerle modelin güncellenmesi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/regmodel_predictor_role.png)
![UVM Mimari Şeması](/images/uvm/regmodel_env.png)`,
      },
      {
        title: "1. RAL Çalışma Akışı ve Entegrasyon Mimarisi",
        content: `UVM RAL mimarisi soyut yazmaç komutları (\`reg.read()\` / \`reg.write()\`) ile fiziksel pin sinyalleri arasında köprü kurar. Bu köprü iki ana bileşenden oluşur:

1. **Yazmaç Bağdaştırıcısı (\`uvm_reg_adapter\`)**: Soyut UVM yazmaç komutlarını (\`uvm_reg_bus_op\`), hedef veri yolunun (örneğin APB veya AXI) somut işlem paketine (\`uvm_sequence_item\`) çeviren iki yönlü tercümandır.
2. **Yazmaç Öngörücüsü (\`uvm_reg_predictor\`)**: Veri yolunu dinleyen monitörden gelen paketleri alıp, yazmaç modelindeki gölge değerleri (\`mirrored value\`) güncel tutan gözetmendir.`,
      },
      {
        title: "2. `uvm_reg_adapter`: `reg2bus()` ve `bus2reg()` Metotları",
        content: `Her veri yolu protokolü için bir \`uvm_reg_adapter\` sınıfı yazılır. Bu sınıfta iki temel metot override edilmelidir:

\`\`\`systemverilog
class reg2apb_adapter extends uvm_reg_adapter;
  \`uvm_object_utils(reg2apb_adapter)

  function new(string name = "reg2apb_adapter");
    super.new(name);
    // Yanit paketleri ayri mi geliyor? (APB'de ayni islem icinde gelir -> 0)
    provides_responses = 0;
    supports_byte_enable = 0;
  endfunction

  // 1. reg2bus: Soyut yazmac operasyonunu fiziksel APB paketine cevirir
  virtual function uvm_sequence_item reg2bus(const ref uvm_reg_bus_op rw);
    apb_seq_item apb = apb_seq_item::type_id::create("apb");
    apb.write = (rw.kind == UVM_WRITE);
    apb.addr  = rw.addr;
    apb.data  = rw.data;
    return apb;
  endfunction

  // 2. bus2reg: Monitorden gelen fiziksel APB paketini soyut rw yapisina cevirir
  virtual function void bus2reg(uvm_sequence_item bus_item, ref uvm_reg_bus_op rw);
    apb_seq_item apb;
    if (!$cast(apb, bus_item)) begin
      \`uvm_fatal("ADAPT_ERR", "Gelen paket apb_seq_item tipinde degil!")
      return;
    end
    rw.kind   = apb.write ? UVM_WRITE : UVM_READ;
    rw.addr   = apb.addr;
    rw.data   = apb.data;
    rw.status = UVM_IS_OK;
  endfunction
endclass
\`\`\``,
      },
      {
        title: "3. Otomatik Öngörü (Auto-Prediction) vs Açık Öngörücü (`uvm_reg_predictor`)",
        content: `Yazmaç modelindeki aynalanan değerlerin güncellenmesi için iki yol mevcuttur:

### A. Otomatik Öngörü (\`auto_predict = 1\`)
\`\`\`systemverilog
reg_model.default_map.set_auto_predict(1);
\`\`\`
- Yazmaç işlemi diziciye gönderildiği anda model kendini anında günceller.
- **Dezavantajı:** Sadece testbench'in başlattığı yazmaları yakalar. Eğer DUT içerisinde bir DMA denetleyicisi, gömülü bir işlemci veya donanım durum makinesi yazmaç değerini değiştirirse, model bunu **asla göremez**!

### B. Açık Öngörücü (\`uvm_reg_predictor\`) - Endüstri Standardı
- Veri yolu monitörünün \`analysis_port\` çıkışına bağlanır.
- Veri yolundan fiziksel olarak geçen tüm trafiği bağımsızca gözlemler.
- Başka master'ların veya donanımın yaptığı tüm değişiklikleri tam zamanında yakalayarak modeli günceller.`,
      },
      {
        title: "4. Açık Bir Öngörücü Entegrasyonunun Dört Adımı",
        content: `Bir \`uvm_reg_predictor\` entegrasyonu şu adımlardan oluşur:

1. **Deklarasyon:** Hedef veri yolu paketi tipiyle parametrelenir:
   \`\`\`systemverilog
   uvm_reg_predictor #(apb_seq_item) m_apb_predictor;
   \`\`\`
2. **Yaratım (\`build_phase\`):**
   \`\`\`systemverilog
   m_apb_predictor = uvm_reg_predictor#(apb_seq_item)::type_id::create("m_apb_predictor", this);
   \`\`\`
3. **Harita ve Adaptör Bağlantısı (\`connect_phase\`):**
   \`\`\`systemverilog
   m_apb_predictor.map     = reg_model.default_map;
   m_apb_predictor.adapter = m_adapter;
   \`\`\`
4. **Monitör Port Bağlantısı (\`connect_phase\`):**
   \`\`\`systemverilog
   m_apb_agent.m_mon.item_collected_port.connect(m_apb_predictor.bus_in);
   \`\`\``,
      },
      {
        title: "5. Yeniden Kullanılabilir Yazmaç Ortamı (`reg_env`) Mimarisi",
        content: `Büyük projelerde yazmaç modeli, adaptör ve predictor tek bir \`reg_env\` bileşeni içinde kapsüllenir:

\`\`\`systemverilog
class reg_env extends uvm_env;
  \`uvm_component_utils(reg_env)

  my_reg_block                      m_ral_model;
  reg2apb_adapter                   m_adapter;
  uvm_reg_predictor #(apb_seq_item) m_predictor;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    m_ral_model = my_reg_block::type_id::create("m_ral_model");
    m_ral_model.build();
    m_adapter   = reg2apb_adapter::type_id::create("m_adapter");
    m_predictor = uvm_reg_predictor#(apb_seq_item)::type_id::create("m_predictor", this);
  endfunction

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Explicit prediction icin predictor baglantilari:
    m_predictor.map     = m_ral_model.default_map;
    m_predictor.adapter = m_adapter;
    // Not: auto_predict = 0 olarak birakilir!
    m_ral_model.default_map.set_auto_predict(0);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "6. Doğrulama Performansı ve Yaygın Yapılandırma Hataları",
        content: `1. **\`provides_responses\` Yanılgısı:**
   Eğer veri yolu protokolü ayrık okuma yanıtları üretiyorsa (ör. AXI okuma kanalında \`RVALID\`/\`RREADY\`), \`provides_responses = 1\` yapılmalıdır. Basit APB gibi tek çevrimli el sıkışmalarda \`0\` bırakılmalıdır.

2. **Monitör Portunun Bağlanmaması:**
   Predictor'ın \`bus_in\` portu monitöre bağlanmazsa, model aynalanan değerleri güncellemez ve \`mirror()\` çağrıları sahte hatalar üretir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM RAL Ortamı: Yazmaç Bağdaştırıcı (\`uvm_reg_adapter\`) ve Öngörücü (\`uvm_reg_predictor\`)** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-register-environment.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class reg_ctl extends uvm_reg;
	...
endclass

m_reg_ctl.write (status, addr, wdata); 		// Write wdata to addr
m_reg_ctl.read  (status, addr, rdata); 		// Read rdata from addr`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM RAL Ortamı: Yazmaç Bağdaştırıcı (`uvm_reg_adapter`) ve Öngörücü (`uvm_reg_predictor`)",
      initialCode: `class reg_ctl extends uvm_reg;
	...
endclass

m_reg_ctl.write (status, addr, wdata); 		// Write wdata to addr
m_reg_ctl.read  (status, addr, rdata); 		// Read rdata from addr`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM RAL Ortamı: Yazmaç Bağdaştırıcı (\`uvm_reg_adapter\`) ve Öngörücü (\`uvm_reg_predictor\`) doğrulaması başarıyla tamamlandı.",
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
      question: "UVM RAL bağdaştırıcısında (`uvm_reg_adapter`) `bus2reg()` fonksiyonunun temel teknik işlevi nedir?",
      options: ["Soyut yazmaç operasyonunu fiziksel pin sinyallerine çevirmek.", "Veri yolu monitörü tarafından yakalanan fiziksel işlem paketini (bus_item), modelin anlayacağı jenerik uvm_reg_bus_op formatına dönüştürmek.", "Sürücüyü uyandırmak için kesme üretmek.", "Adres çakışması olan yazmaçları hafızadan silmek."],
      correctIndex: 1,
      explanation: "bus2reg() metodu, monitörün veri yolunda yakaladığı protokole özel paketi (örn. apb_seq_item) genel uvm_reg_bus_op yapısına dönüştürerek öngörücünün (predictor) yazmaç modelini güncellemesini sağlar.",
    },
  },
  "connecting-register-env": {
    id: "connecting-register-env",
    badge: "Modül 11 • Yazmaç Soyutlama Katmanı (RAL / Register Layer)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM RAL Ortamının Bağlanması: Adapter, Predictor ve Sequencer Entegrasyonu",
    subtitle: "UVM test ortamının connect_phase aşamasında yazmaç modeli, veri yolu aracısı, bağdaştırıcı ve öngörücünün uçtan uca kablolanması.",
    sections: [
      {
        title: "1. RAL Bağlantı Mimarisi ve `connect_phase` Aşaması",
        content: `Universal Verification Methodology (UVM) standartlarında bir Yazmaç Modeli (\`uvm_reg_block\`), tek başına soyut bir veri yapısından ibarettir. Modelin simülasyondaki fiziksel Donanım Tasarımı (DUT) ile haberleşebilmesi ve donanımla senkronize olabilmesi için UVM ortamının \`connect_phase\` aşamasında üç ana hat birbirine bağlanmalıdır:

1. **Komut Hattı (Command Path - Frontdoor):** Modelden (\`reg.write()\` / \`reg.read()\`) başlayan isteklerin veri yolu adaptörü (\`uvm_reg_adapter\`) üzerinden fiziksel aracı dizicisine (\`agent.sequencer\`) aktarılması.
2. **Öngörü Hattı (Prediction Path):** Veri yolu monitörünün (\`agent.monitor\`) yakaladığı işlemlerin açık öngörücüye (\`uvm_reg_predictor\`) ve oradan modelin haritasına (\`default_map\`) beslenmesi.
3. **Temel Adres ve Harita Koordinasyonu:** Adres haritalarının çoklu arayüzlü (multi-bus) sistemlerde doğru alt haritalarla ilişkilendirilmesi.

Bu mimari doğru bağlandığında test dizisi sadece \`reg.write()\` veya \`reg.read()\` çağırır; arkadaki karmaşık dönüşümler tamamen şeffaf gerçekleşir.`,
      },
      {
        title: "2. Haritaya Dizici ve Bağdaştırıcı Atama (`default_map.set_sequencer`)",
        content: `Frontdoor yazmaç erişimlerinin çalışabilmesi için yazmaç bloğunun adres haritasına (\`default_map\`) iki nesne tanıtılmalıdır:
- İşlemleri tüketecek fiziksel dizici (\`m_seqr\`).
- Soyut işlemleri protokole dönüştürecek bağdaştırıcı (\`m_adapter\`).

Bu işlem \`set_sequencer()\` metodu ile tek satırda yapılır:

\`\`\`systemverilog
// default_map'e hem diziciyi hem adaptoru tanit:
reg_model.default_map.set_sequencer(
  .sequencer(m_apb_agent.m_seqr), 
  .adapter(m_apb_adapter)
);
\`\`\`

Bu bağlantı yapıldıktan sonra bir dizide \`reg_model.ctrl.write(status, 32'h01)\` çağrıldığında UVM:
1. \`ctrl\` yazmacının adresini (\`0x00\`) bulur.
2. \`m_apb_adapter.reg2bus()\` metodunu çağırarak bir \`apb_seq_item\` üretir.
3. Bu paketi otomatik olarak \`m_apb_agent.m_seqr\` kuyruğuna koyar ve sürücünün yürütmesini bekler.`,
      },
      {
        title: "3. Açık Öngörücü (Predictor) Bağlantıları ve Kablolama",
        content: `Üretim ortamlarında (production testbenches) modelin donanımla tam senkron kalması için açık öngörücü (\`uvm_reg_predictor\`) kablolanmalıdır.

Predictor'ın çalışması için 3 bağlantı şarttır:
1. **Harita Bağlantısı:** \`m_predictor.map = reg_model.default_map;\`
2. **Adaptör Bağlantısı:** \`m_predictor.adapter = m_apb_adapter;\`
3. **Monitör Portu Bağlantısı:** \`m_apb_agent.m_mon.item_collected_port.connect(m_predictor.bus_in);\`

Tam \`connect_phase\` Örneği:
\`\`\`systemverilog
class top_env extends uvm_env;
  \`uvm_component_utils(top_env)

  traffic_reg_block                 m_regmodel;
  reg2apb_adapter                   m_adapter;
  uvm_reg_predictor #(apb_seq_item) m_predictor;
  apb_agent                         m_apb_agent;

  // ... build_phase ...

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);

    // 1. Frontdoor Erisim Hatti:
    m_regmodel.default_map.set_sequencer(m_apb_agent.m_seqr, m_adapter);

    // 2. Predictor Referanslari:
    m_predictor.map     = m_regmodel.default_map;
    m_predictor.adapter = m_adapter;

    // 3. Monitor Analysis Port -> Predictor bus_in Baglantisi:
    m_apb_agent.m_mon.item_collected_port.connect(m_predictor.bus_in);

    // 4. Otomatik ongoru Kapatilir (Explicit Prediction devrede oldugu icin):
    m_regmodel.default_map.set_auto_predict(0);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "4. `set_auto_predict(1)` Kullanımı ve Açık Predictor ile Karşılaştırma",
        content: `| Kriter | Otomatik Öngörü (\`auto_predict=1\`) | Açık Öngörücü (\`uvm_reg_predictor\`) |
|---|---|---|
| **Ek Bileşen İhtiyacı** | Yok (Kod daha kısadır). | \`uvm_reg_predictor\` bileşeni gerekir. |
| **Monitör Bağımlılığı** | Monitöre bağlanmaz. | Monitörün analiz portuna bağlanır. |
| **Donanım Durumu Yakalama** | Donanımın kendi kendine değişen durumlarını veya kesmelerini **yakalayamaz**. | Veri yolundaki tüm trafiği fiziksel olarak yakalar. |
| **Çoklu Master (Multi-Master)** | Yalnızca kendi dizisinin yazdıklarını günceller; harici CPU veya DMA yazmalarını **kaçırır**. | Veri yolundaki tüm harici master yazmalarını eksiksiz yakalar. |
| **Kullanım Yeri** | Basit birim testleri (unit tests). | **Endüstriyel SoC ve IP doğrulama ortamları.** |`,
      },
      {
        title: "5. Çoklu Arayüzlü (Multi-Bus) Sistemlerde Alt Haritalar ve Taban Adres Bağlantısı",
        content: `Karmaşık bir SoC'de yazmaç bloğunun bir kısmı APB üzerinden, yüksek hızlı arabelleği (buffer RAM) ise AXI üzerinden erişilebilir.

Bu durumda model birden fazla harita tanımlar:
\`\`\`systemverilog
virtual function void connect_phase(uvm_phase phase);
  super.connect_phase(phase);

  // APB Haritasini APB dizicisine bagla:
  m_regmodel.apb_map.set_sequencer(m_apb_agent.m_seqr, m_apb_adapter);

  // AXI Haritasini AXI dizicisine bagla:
  m_regmodel.axi_map.set_sequencer(m_axi_agent.m_seqr, m_axi_adapter);
endfunction
\`\`\`

Ayrıca bir alt blok üst düzey bir bloğa eklenirken taban adres ofseti verilir:
\`\`\`systemverilog
// Top-level haritaya alt blogun haritasini 0x4000_0000 taban adresiyle bagla:
top_map.add_submap(sub_block.default_map, 'h4000_0000);
\`\`\``,
      },
      {
        title: "6. Adım Adım Entegrasyon Kontrol Listesi (Checklist)",
        content: `RAL ortamınızı simülasyona sokmadan önce şu 5 maddeyi mutlaka kontrol edin:

1. \`build_phase\`'de \`regmodel.build()\` ve ardından \`regmodel.lock_model()\` çağrıldı mı?
2. \`default_map.set_sequencer(seqr, adapter)\` bağlantısı yapıldı mı?
3. Predictor kullanılıyorsa \`predictor.map\` ve \`predictor.adapter\` atandı mı?
4. Monitör analiz portu \`predictor.bus_in\` export portuna bağlandı mı?
5. Predictor açıkken \`default_map.set_auto_predict(0)\` yapılarak çift güncelleme engellendi mi?`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM RAL Ortamının Bağlanması: Adapter, Predictor ve Sequencer Entegrasyonu** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "connecting-register-env.sv - Örnek UVM Doğrulama Kodu",
          snippet: `class my_env extends uvm_env;
   \`uvm_component_utils (my_env)
   
   my_agent       m_agent;   
   reg_env        m_reg_env;
   
   function new (string name = "my_env", uvm_component parent);
      super.new (name, parent);
   endfunction
   
   virtual function void build_phase (uvm_phase phase);
      super.build_phase (phase);
      m_agent = my_agent::type_id::create ("m_agent", this);
      m_reg_env = reg_env::type_id::create ("m_reg_env", this);
   endfunction

   virtual function void connect_phase (uvm_phase phase);
      super.connect_phase (phase);
      m_agent.m_mon.mon_ap.connect (m_reg_env.m_apb2reg_predictor.bus_in);
      m_reg_env.m_ral_model.default_map.set_sequencer (m_agent.m_seqr, m_reg_env.m_reg2apb);
   endfunction
   
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM RAL Ortamının Bağlanması: Adapter, Predictor ve Sequencer Entegrasyonu",
      initialCode: `class my_env extends uvm_env;
   \`uvm_component_utils (my_env)
   
   my_agent       m_agent;   
   reg_env        m_reg_env;
   
   function new (string name = "my_env", uvm_component parent);
      super.new (name, parent);
   endfunction
   
   virtual function void build_phase (uvm_phase phase);
      super.build_phase (phase);
      m_agent = my_agent::type_id::create ("m_agent", this);
      m_reg_env = reg_env::type_id::create ("m_reg_env", this);
   endfunction

   virtual function void connect_phase (uvm_phase phase);
      super.connect_phase (phase);
      m_agent.m_mon.mon_ap.connect (m_reg_env.m_apb2reg_predictor.bus_in);
      m_reg_env.m_ral_model.default_map.set_sequencer (m_agent.m_seqr, m_reg_env.m_reg2apb);
   endfunction
   
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM RAL Ortamının Bağlanması: Adapter, Predictor ve Sequencer Entegrasyonu doğrulaması başarıyla tamamlandı.",
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
      question: "Açık öngörü (explicit prediction) mimarisine sahip bir UVM RAL ortamında, `predictor.bus_in` analiz kancası testbench içerisinde nereye bağlanmalıdır?",
      options: ["Veri yolu sürücüsünün (driver) seq_item_port çıkışına.", "Veri yolu monitörünün (monitor) analiz portuna (analysis port / item_collected_port).", "Doğrudan DUT'un saat sinyaline.", "Sanal dizicinin (virtual sequencer) export portuna."],
      correctIndex: 1,
      explanation: "Açık öngörücü (uvm_reg_predictor), fiziksel veri yolundaki gerçek pin hareketlerini gözlemleyen monitörün analiz portuna bağlanır; böylece veri yolundan başarıyla geçen işlemler modele iletilir.",
    },
  },
  "uvm-register-backdoor-access": {
    id: "uvm-register-backdoor-access",
    badge: "Modül 11 • Yazmaç Soyutlama Katmanı (RAL / Register Layer)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "UVM RAL Arka Kapı (Backdoor) Erişimi ve HDL Yolu Tanımlama",
    subtitle: "Fiziksel veri yolu simülasyon döngülerini beklemeden, simülatör DPI/VPI veritabanı üzerinden sıfır zamanda yazmaç erişimi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/uvm-register-backdoor-access.png)
![UVM Mimari Şeması](/images/uvm/uvm-register-backdoor-access-wave.png)`,
      },
      {
        title: "1. Ön Kapı (Frontdoor) ve Arka Kapı (Backdoor) Erişimleri Arasındaki Farklar",
        content: `UVM Register Abstraction Layer (RAL), donanım yazmaçlarına erişmek için iki temel yol sunar:

### A. Ön Kapı Erişimi (Frontdoor Access)
- Yazmaç erişimi fiziksel veri yolu pinleri (saat sinyali, el sıkışma, \`PSEL\`, \`PENABLE\`, \`PREADY\` vb.) üzerinden gerçekleşir.
- Simülasyon zamanı tüketir (örneğin tipik bir APB transferi 2-3 saat çevrimi sürer).
- Veri yolu protokolünü, arayüz zamanlamasını ve aradaki köprü mantığını (interconnect) doğrular.

### B. Arka Kapı Erişimi (Backdoor Access)
- Fiziksel pinler kesinlikle sürülmez.
- Simülatörün DPI (Direct Programming Interface) veya VPI arayüzü kullanılarak, hedef flip-flop sinyallerine **sıfır simülasyon zamanında (\`#0\`)** doğrudan değer yazılır (\`$deposit\` / put_value) veya okunur.
- Simülasyon döngüsü tüketmez; milyonlarca baytlık bellek ve tablo başlatmalarını anında gerçekleştirir.`,
      },
      {
        title: "2. HDL Yolu (HDL Path) Kavramı ve Hiyerarşik Yol Tanımlama",
        content: `Simülatörün arka kapıdan hangi RTL flip-flop'una erişeceğini bilmesi için yazmaç modelinde **HDL Yolları (HDL Paths)** tanımlanmalıdır.

UVM'de hiyerarşik HDL yolları iki seviyede kurulur:

1. **Kök Yol (HDL Path Root):** Yazmaç bloğu seviyesinde DUT'un testbench içindeki hiyerarşik konumu belirlenir:
   \`\`\`systemverilog
   m_regmodel.set_hdl_path_root("tb_top.dut");
   \`\`\`
2. **Dilim Yolu (HDL Path Slice):** Her yazmaç veya yazmaç alanı için ilgili RTL register sinyalinin adı ve bit dilimleri eklenir:
   \`\`\`systemverilog
   // ctrl yazmacina ait RTL sinyali "ctrl_reg" olarak tanimlanir:
   ctrl.add_hdl_path_slice(.name("ctrl_reg"), .offset(0), .size(32));
   \`\`\``,
      },
      {
        title: "3. Arka Kapı Erişim Metotları: `peek()`, `poke()`, `read()`, `write()`",
        content: `UVM RAL arka kapı erişimi için iki grup metot sunar:

### Doğrudan Donanım Erişimleri (\`poke\` ve \`peek\`)
- **\`poke(status, value)\`**: Simülatör üzerinden hedef RTL sinyaline doğrudan \`value\` değerini zorlar. Modeldeki aynalanan değeri de otomatik eşitler.
- **\`peek(status, value)\`**: RTL sinyalinin o anki anlık değerini okur ve \`value\` değişkenine döndürür.

### Mod Bayrağı ile Standart Metotlar (\`read\` ve \`write\`)
Standart \`read()\` ve \`write()\` metotlarına \`UVM_BACKDOOR\` argümanı geçilerek arka kapı modu tetiklenir:
\`\`\`systemverilog
uvm_status_e status;
uvm_reg_data_t rdata;

// Arka kapi uzerinden sifir zamanda yaz:
reg_model.ctrl.write(status, 32'h0000_0001, UVM_BACKDOOR);

// Arka kapi uzerinden sifir zamanda oku:
reg_model.ctrl.read(status, rdata, UVM_BACKDOOR);
\`\`\``,
      },
      {
        title: "4. Trafik Denetleyicisi Örneği Üzerinde Arka Kapı Entegrasyonu",
        content: `Aşağıdaki örnekte bir trafik lambası kontrolcüsünün yazmaç modeline HDL yolları eklenmiş ve test dizisi içerisinden arka kapı erişimi yapılmıştır:

\`\`\`systemverilog
class traffic_reg_block extends uvm_reg_block;
  \`uvm_object_utils(traffic_reg_block)
  rand reg_ctrl  ctrl;
  rand reg_timer timer;

  virtual function void build();
    default_map = create_map("default_map", 'h0, 4, UVM_LITTLE_ENDIAN);

    ctrl = reg_ctrl::type_id::create("ctrl");
    ctrl.configure(this, null, "");
    ctrl.build();
    // HDL Yolunu tanimla (RTL icindeki 'r_ctrl' register'i):
    ctrl.add_hdl_path_slice("r_ctrl", 0, 32);
    default_map.add_reg(ctrl, 'h00, "RW");

    timer = reg_timer::type_id::create("timer");
    timer.configure(this, null, "");
    timer.build();
    // timer yazmaci icin HDL yolu:
    timer.add_hdl_path_slice("r_timer", 0, 32);
    default_map.add_reg(timer, 'h04, "RW");

    lock_model();
  endfunction
endclass

class backdoor_test_seq extends uvm_sequence;
  \`uvm_object_utils(backdoor_test_seq)
  traffic_reg_block regmodel;

  virtual task body();
    uvm_status_e status;
    uvm_reg_data_t val;

    \`uvm_info("BACKDOOR", "Arka kapi yazma islemi baslatiliyor...", UVM_LOW)
    // Sifir simülasyon zamaninda (#0) poke islemi:
    regmodel.timer.poke(status, 32'h0000_FF00);

    \`uvm_info("BACKDOOR", "Arka kapi okuma (peek) yapiliyor...", UVM_LOW)
    regmodel.timer.peek(status, val);
    \`uvm_info("BACKDOOR", $sformatf("Peek sonucu okunan deger = 0x%08h", val), UVM_LOW)
  endtask
endclass
\`\`\``,
      },
      {
        title: "5. Simülasyon Hızlandırma Senaryoları (RAL Backdoor Kullanım Alanları)",
        content: `Arka kapı erişiminin en yaygın ve faydalı kullanım senaryoları:

1. **Büyük Belleklerin ve Tabloların Başlatılması (Preloading):**
   Bir DSP veya GPU doğrulamasında megabaytlarca katsayı veya bellenim (firmware) görüntüsü bulunur. Bu verileri veri yolundan yazmak saatlerce simülasyon çevrimi sürerken, backdoor \`poke\` ile **sıfır saniyede** yüklenir.
2. **Karmaşık Test Ön Koşulları Hazırlama (Fast Setup):**
   Testin 100 farklı yazmaç ayarına ihtiyacı varsa, bunlar backdoor ile saniyeler içinde yazılıp asıl test senaryosuna hızla geçilebilir.
3. **Müdahalesiz Durum Gözlemi (Non-Intrusive Sniffing):**
   Veri yolunda trafik yoğunluğu yaratmadan donanımın iç flip-flop değerleri anlık olarak sorgulanabilir.`,
      },
      {
        title: "6. Arka Kapı Erişiminin Riskleri ve En İyi Pratikler",
        content: `Uyarılar:
- **Veri Yolu Mantığını Test Etmez:** Backdoor erişimi pinleri sürmediği için adres kod çözücü (address decoder), bus arbiter veya zamanlama hatalarını **yakalayamaz**.
- **Donanım Yan Etkileri (Side-Effects):** Bir yazmaca yazıldığında donanımın bir sayacı sıfırlaması veya durum makinesini tetiklemesi gerekiyorsa, backdoor doğrudan flip-flop'u değiştirdiği için bu tetikleyici mantık saat darbesi almayabilir.
- **RTL Hiyerarşi Bağımlılığı:** RTL tasarımcısı bir modülün veya sinyalin adını değiştirdiğinde arka kapı string yolları geçersiz kalır.

Altın Kural: Başlatma ve hızlı denetim için Backdoor; nihai protokol ve donanım doğrulaması için Frontdoor tercih edilmelidir.`,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **UVM RAL Arka Kapı (Backdoor) Erişimi ve HDL Yolu Tanımlama** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-register-backdoor-access.sv - Örnek UVM Doğrulama Kodu",
          snippet: `// Assume that ral_cfg_ctl and other "uvm_reg" classes are already
// defined as in the frontdoor example

class ral_block_traffic_cfg extends uvm_reg_block;
	rand ral_cfg_ctl    ctrl;       // RW
	rand ral_cfg_timer  timer[2];   // RW
       ral_cfg_stat   stat;       // RO

	\`uvm_object_utils(ral_block_traffic_cfg)

	function new(string name = "traffic_cfg");
		super.new(name, build_coverage(UVM_NO_COVERAGE));
	endfunction

  virtual function void build();
    default_map = create_map("", 0, 4, UVM_LITTLE_ENDIAN, 0);
    ctrl = ral_cfg_ctl::type_id::create("ctrl",,get_full_name());
    ctrl.configure(this, null, "");
    ctrl.build();
    
    // HDL path to this instance is "tb.DUT.ctl_reg"
    ctrl.add_hdl_path_slice("ctl_reg", 0, ctrl.get_n_bits());
    default_map.add_reg(this.ctrl, \`UVM_REG_ADDR_WIDTH'h0, "RW", 0);
    
    timer[0] = ral_cfg_timer::type_id::create("timer[0]",,get_full_name());
    timer[0].configure(this, null, "");
    timer[0].build();
    
    // HDL path to this instance is "tb.DUT.timer_0"
    timer[0].add_hdl_path_slice("timer_0", 0, timer[0].get_n_bits());
    default_map.add_reg(this.timer[0], \`UVM_REG_ADDR_WIDTH'h4, "RW", 0);

    timer[1] = ral_cfg_timer::type_id::create("timer[1]",,get_full_name());
    timer[1].configure(this, null, "");
    timer[1].build();
    
    // HDL path to this instance is "tb.DUT.timer_1"
    timer[1].add_hdl_path_slice("timer_1", 0, timer[1].get_n_bits());
    default_map.add_reg(this.timer[1], \`UVM_REG_ADDR_WIDTH'h8, "RW", 0);

    stat = ral_cfg_stat::type_id::create("stat",,get_full_name());
    stat.configure(this, null, "");
    stat.build();
    
    // HDL path from DUT to the status register will now be 
    // "tb.DUT.stat_reg" after the previous hierarchies are used 
    // for path concatenation
    stat.add_hdl_path_slice("stat_reg", 0, stat.get_n_bits());
    default_map.add_reg(this.stat, \`UVM_REG_ADDR_WIDTH'hc, "RO", 0);
    add_hdl_path("DUT");
  endfunction 
endclass 

class ral_sys_traffic extends uvm_reg_block;
  rand ral_block_traffic_cfg cfg;

	\`uvm_object_utils(ral_sys_traffic)
	function new(string name = "traffic");
		super.new(name);
	endfunction

	function void build();
    default_map = create_map("", 0, 4, UVM_LITTLE_ENDIAN, 0);
    cfg = ral_block_traffic_cfg::type_id::create("cfg",,get_full_name());
    
    // Since registers exist at the DUT level in our design, configure
    // "cfg" class to have an HDL path called "DUT". So complete path to 
    // DUT is now "tb.DUT"
    cfg.configure(this, "DUT");
    cfg.build();
    
    // Path to this top level regblock in our testbench environment is "tb"
    add_hdl_path("tb");
    default_map.add_submap(this.cfg.default_map, \`UVM_REG_ADDR_WIDTH'h0);
	endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: UVM RAL Arka Kapı (Backdoor) Erişimi ve HDL Yolu Tanımlama",
      initialCode: `// Assume that ral_cfg_ctl and other "uvm_reg" classes are already
// defined as in the frontdoor example

class ral_block_traffic_cfg extends uvm_reg_block;
	rand ral_cfg_ctl    ctrl;       // RW
	rand ral_cfg_timer  timer[2];   // RW
       ral_cfg_stat   stat;       // RO

	\`uvm_object_utils(ral_block_traffic_cfg)

	function new(string name = "traffic_cfg");
		super.new(name, build_coverage(UVM_NO_COVERAGE));
	endfunction

  virtual function void build();
    default_map = create_map("", 0, 4, UVM_LITTLE_ENDIAN, 0);
    ctrl = ral_cfg_ctl::type_id::create("ctrl",,get_full_name());
    ctrl.configure(this, null, "");
    ctrl.build();
    
    // HDL path to this instance is "tb.DUT.ctl_reg"
    ctrl.add_hdl_path_slice("ctl_reg", 0, ctrl.get_n_bits());
    default_map.add_reg(this.ctrl, \`UVM_REG_ADDR_WIDTH'h0, "RW", 0);
    
    timer[0] = ral_cfg_timer::type_id::create("timer[0]",,get_full_name());
    timer[0].configure(this, null, "");
    timer[0].build();
    
    // HDL path to this instance is "tb.DUT.timer_0"
    timer[0].add_hdl_path_slice("timer_0", 0, timer[0].get_n_bits());
    default_map.add_reg(this.timer[0], \`UVM_REG_ADDR_WIDTH'h4, "RW", 0);

    timer[1] = ral_cfg_timer::type_id::create("timer[1]",,get_full_name());
    timer[1].configure(this, null, "");
    timer[1].build();
    
    // HDL path to this instance is "tb.DUT.timer_1"
    timer[1].add_hdl_path_slice("timer_1", 0, timer[1].get_n_bits());
    default_map.add_reg(this.timer[1], \`UVM_REG_ADDR_WIDTH'h8, "RW", 0);

    stat = ral_cfg_stat::type_id::create("stat",,get_full_name());
    stat.configure(this, null, "");
    stat.build();
    
    // HDL path from DUT to the status register will now be 
    // "tb.DUT.stat_reg" after the previous hierarchies are used 
    // for path concatenation
    stat.add_hdl_path_slice("stat_reg", 0, stat.get_n_bits());
    default_map.add_reg(this.stat, \`UVM_REG_ADDR_WIDTH'hc, "RO", 0);
    add_hdl_path("DUT");
  endfunction 
endclass 

class ral_sys_traffic extends uvm_reg_block;
  rand ral_block_traffic_cfg cfg;

	\`uvm_object_utils(ral_sys_traffic)
	function new(string name = "traffic");
		super.new(name);
	endfunction

	function void build();
    default_map = create_map("", 0, 4, UVM_LITTLE_ENDIAN, 0);
    cfg = ral_block_traffic_cfg::type_id::create("cfg",,get_full_name());
    
    // Since registers exist at the DUT level in our design, configure
    // "cfg" class to have an HDL path called "DUT". So complete path to 
    // DUT is now "tb.DUT"
    cfg.configure(this, "DUT");
    cfg.build();
    
    // Path to this top level regblock in our testbench environment is "tb"
    add_hdl_path("tb");
    default_map.add_submap(this.cfg.default_map, \`UVM_REG_ADDR_WIDTH'h0);
	endfunction
endclass`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] UVM RAL Arka Kapı (Backdoor) Erişimi ve HDL Yolu Tanımlama doğrulaması başarıyla tamamlandı.",
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
      question: "UVM RAL'de `poke()` ve `peek()` arka kapı (backdoor) metotlarının ön kapı (frontdoor) metotlarına kıyasla en belirgin avantajı nedir?",
      options: ["Veri yolu protokolü el sıkışmalarını ve köprü gecikmelerini kapsamlı test etmesi.", "Fiziksel veri yolu pinlerini sürmeden, simülatör veritabanı üzerinden doğrudan donanım flip-flop'larına sıfır simülasyon zamanında (`#0`) anında erişebilmesi.", "Sentezlenebilir olması ve çip içine gömülebilmesi.", "Yalnızca salt-okunur (RO) yazmaçlarda çalışabilmesi."],
      correctIndex: 1,
      explanation: "Arka kapı (backdoor) erişimleri, veri yolu sinyallerini sürmeden ve simülasyon zamanı harcamadan doğrudan simülatör veritabanı (VPI/DPI) ile RTL kayıtlarına sıfır zamanda erişir; bu sayede bellek doldurma ve hızlı başlatma sağlar.",
    },
  },
  "uvm-register-model-example": {
    id: "uvm-register-model-example",
    badge: "Modül 11 • Yazmaç Soyutlama Katmanı (RAL / Register Layer)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Uçtan Uca UVM RAL Uygulama Örneği: APB Veri Yolu ile Trafik Denetleyicisi",
    subtitle: "RTL tasarımından UVM arayüzüne, yazmaç modelinden APB aracısına, testbench ortamından test dizisine eksiksiz bir endüstriyel vaka analizi.",
    sections: [
      {
        title: "Mimari Şema & Blok Diyagramı",
        content: `![UVM Mimari Şeması](/images/uvm/reg_model_example_wave1.png)
![UVM Mimari Şeması](/images/uvm/design.png)`,
      },
      {
        title: "1. Donanım Tasarımı (DUT) Mimarisi ve Yazmaç Haritası",
        content: `Bu derste uçtan uca eksiksiz bir endüstriyel UVM RAL mimarisi incelenecektir. Tasarımımız (DUT), bir APB kölesi (slave) olarak çalışan bir **Trafik Lambası Denetleyicisidir (Traffic Light Controller)**.

### Yazmaç Haritası
| Adres | Yazmaç Adı | Bitler | Erişim | Açıklama |
|---|---|---|---|---|
| **\`0x00\`** | \`CTRL\` | \`[0]\` | RW | \`start\`: Modülü başlatır (1: Aktif, 0: Durdur). |
| | | \`[1]\` | RW | \`blink_en\`: Yanıp sönme modunu açar. |
| | | \`[3:2]\` | RW | \`mode\`: Çalışma modu (Normal, Gece, Acil Durum). |
| **\`0x04\`** | \`TIMER\` | \`[7:0]\` | RW | \`red_time\`: Kırmızı ışık süresi (saniye). |
| | | \`[15:8]\` | RW | \`green_time\`: Yeşil ışık süresi (saniye). |
| **\`0x08\`** | \`STAT\` | \`[1:0]\` | RO | \`state\`: Anlık durum (Kırmızı, Sarı, Yeşil). |
| | | \`[2]\` | W1C | \`err_flag\`: Arıza bayrağı (1 yazılınca temizlenir). |`,
      },
      {
        title: "2. APB Arayüzü (`apb_if`)",
        content: `DUT ile testbench arasındaki fiziksel AMBA APB sinyallerini taşıyan SystemVerilog arayüzü:

\`\`\`systemverilog
interface apb_if (input logic pclk, input logic presetn);
  logic [31:0] paddr;
  logic        pwrite;
  logic        psel;
  logic        penable;
  logic [31:0] pwdata;
  logic [31:0] prdata;
  logic        pready;
  logic        pslverr;
endinterface
\`\`\``,
      },
      {
        title: "3. UVM RAL Yazmaç Modelinin (`traffic_reg_block`) Tanımlanması",
        content: `Yazmaç modeli; alanlar (\`uvm_reg_field\`), yazmaçlar (\`uvm_reg\`) ve kapsayıcı bloktan (\`uvm_reg_block\`) oluşur:

\`\`\`systemverilog
// 1. CTRL Yazmaci
class reg_ctrl extends uvm_reg;
  \`uvm_object_utils(reg_ctrl)
  rand uvm_reg_field start;
  rand uvm_reg_field blink_en;
  rand uvm_reg_field mode;

  function new(string name = "reg_ctrl");
    super.new(name, 32, UVM_NO_COVERAGE);
  endfunction

  virtual function void build();
    start = uvm_reg_field::type_id::create("start");
    start.configure(this, 1, 0, "RW", 0, 1'b0, 1, 1, 0);

    blink_en = uvm_reg_field::type_id::create("blink_en");
    blink_en.configure(this, 1, 1, "RW", 0, 1'b0, 1, 1, 0);

    mode = uvm_reg_field::type_id::create("mode");
    mode.configure(this, 2, 2, "RW", 0, 2'b00, 1, 1, 0);
  endfunction
endclass

// 2. TIMER Yazmaci
class reg_timer extends uvm_reg;
  \`uvm_object_utils(reg_timer)
  rand uvm_reg_field red_time;
  rand uvm_reg_field green_time;

  function new(string name = "reg_timer");
    super.new(name, 32, UVM_NO_COVERAGE);
  endfunction

  virtual function void build();
    red_time = uvm_reg_field::type_id::create("red_time");
    red_time.configure(this, 8, 0, "RW", 0, 8'd30, 1, 1, 0);

    green_time = uvm_reg_field::type_id::create("green_time");
    green_time.configure(this, 8, 8, "RW", 0, 8'd25, 1, 1, 0);
  endfunction
endclass

// 3. STAT Yazmaci
class reg_stat extends uvm_reg;
  \`uvm_object_utils(reg_stat)
  rand uvm_reg_field state;
  rand uvm_reg_field err_flag;

  function new(string name = "reg_stat");
    super.new(name, 32, UVM_NO_COVERAGE);
  endfunction

  virtual function void build();
    state = uvm_reg_field::type_id::create("state");
    state.configure(this, 2, 0, "RO", 1, 2'b00, 1, 0, 0);

    err_flag = uvm_reg_field::type_id::create("err_flag");
    err_flag.configure(this, 1, 2, "W1C", 0, 1'b0, 1, 1, 0);
  endfunction
endclass

// 4. Kapsayici Yazmac Blogu
class traffic_reg_block extends uvm_reg_block;
  \`uvm_object_utils(traffic_reg_block)
  rand reg_ctrl  ctrl;
  rand reg_timer timer;
  rand reg_stat  stat;

  function new(string name = "traffic_reg_block");
    super.new(name, UVM_NO_COVERAGE);
  endfunction

  virtual function void build();
    default_map = create_map("default_map", 'h0, 4, UVM_LITTLE_ENDIAN);

    ctrl = reg_ctrl::type_id::create("ctrl");
    ctrl.configure(this, null, "");
    ctrl.build();
    default_map.add_reg(ctrl, 'h00, "RW");

    timer = reg_timer::type_id::create("timer");
    timer.configure(this, null, "");
    timer.build();
    default_map.add_reg(timer, 'h04, "RW");

    stat = reg_stat::type_id::create("stat");
    stat.configure(this, null, "");
    stat.build();
    default_map.add_reg(stat, 'h08, "RO");

    lock_model();
  endfunction
endclass
\`\`\``,
      },
      {
        title: "4. APB Veri Yolu Adaptörü (`reg2apb_adapter`)",
        content: `RAL çağrılarını APB paketlerine çeviren adaptör sınıfı:

\`\`\`systemverilog
class reg2apb_adapter extends uvm_reg_adapter;
  \`uvm_object_utils(reg2apb_adapter)

  function new(string name = "reg2apb_adapter");
    super.new(name);
  endfunction

  virtual function uvm_sequence_item reg2bus(const ref uvm_reg_bus_op rw);
    apb_seq_item apb = apb_seq_item::type_id::create("apb");
    apb.write = (rw.kind == UVM_WRITE);
    apb.addr  = rw.addr;
    apb.data  = rw.data;
    return apb;
  endfunction

  virtual function void bus2reg(uvm_sequence_item bus_item, ref uvm_reg_bus_op rw);
    apb_seq_item apb;
    if (!$cast(apb, bus_item)) return;
    rw.kind   = apb.write ? UVM_WRITE : UVM_READ;
    rw.addr   = apb.addr;
    rw.data   = apb.data;
    rw.status = UVM_IS_OK;
  endfunction
endclass
\`\`\``,
      },
      {
        title: "5. Üst Düzey Ortam (`tb_env`) ve Entegrasyon",
        content: `Ortam sınıfı içerisinde APB aracısı, yazmaç modeli, adaptör ve predictor bir araya getirilir:

\`\`\`systemverilog
class tb_env extends uvm_env;
  \`uvm_component_utils(tb_env)

  apb_agent                         m_apb_agent;
  traffic_reg_block                 m_regmodel;
  reg2apb_adapter                   m_adapter;
  uvm_reg_predictor #(apb_seq_item) m_predictor;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  virtual function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    m_apb_agent = apb_agent::type_id::create("m_apb_agent", this);
    m_regmodel  = traffic_reg_block::type_id::create("m_regmodel");
    m_regmodel.build();
    m_adapter   = reg2apb_adapter::type_id::create("m_adapter");
    m_predictor = uvm_reg_predictor#(apb_seq_item)::type_id::create("m_predictor", this);
  endfunction

  virtual function void connect_phase(uvm_phase phase);
    super.connect_phase(phase);
    // Dizici ve adaptor baglantisi:
    m_regmodel.default_map.set_sequencer(m_apb_agent.m_seqr, m_adapter);

    // Predictor baglantisi:
    m_predictor.map     = m_regmodel.default_map;
    m_predictor.adapter = m_adapter;
    m_apb_agent.m_mon.item_collected_port.connect(m_predictor.bus_in);
    m_regmodel.default_map.set_auto_predict(0);
  endfunction
endclass
\`\`\``,
      },
      {
        title: "6. Test Senaryosu: Frontdoor Yazmaç Doğrulama Dizisi",
        content: `Artık test dizisi içerisinde adres bilmeden doğrudan yazmaç nesneleriyle doğrulama yapılabilir:

\`\`\`systemverilog
class traffic_test_seq extends uvm_sequence;
  \`uvm_object_utils(traffic_test_seq)
  traffic_reg_block regmodel;

  virtual task body();
    uvm_status_e status;
    uvm_reg_data_t rdata;

    \`uvm_info("TEST_SEQ", "Trafik Denetleyicisi yapilandiriliyor...", UVM_LOW)

    // 1. TIMER yazmacina sureleri yaz (Kirmizi = 45s, Yesil = 60s)
    regmodel.timer.write(status, {8'd60, 8'd45}); // Adres: 0x04

    // 2. CTRL yazmacini baslat (start = 1, mode = 1)
    regmodel.ctrl.write(status, 32'h0000_0005);   // Adres: 0x00

    // 3. STAT yazmacini oku ve donanim durumunu kontrol et
    regmodel.stat.read(status, rdata);
    \`uvm_info("TEST_SEQ", $sformatf("Okunan Durum = 0x%02h", rdata), UVM_LOW)

    // 4. Aynalanan degerin dogrulugunu mirror() ile denetle:
    regmodel.timer.mirror(status, UVM_CHECK);
    \`uvm_info("TEST_SEQ", "Yazmac dogrulama testi basariyla tamamlandi!", UVM_LOW)
  endtask
endclass
\`\`\``,
      },
      {
        title: "Örnek UVM Kod Bloğu",
        content: `Aşağıdaki kod parçası **Uçtan Uca UVM RAL Uygulama Örneği: APB Veri Yolu ile Trafik Denetleyicisi** konusunun pratik SystemVerilog UVM uygulamasını göstermektedir:`,
        callout: {
          type: "tip",
          title: "UVM Doğrulama İpucu",
          message: "UVM bileşenlerinde `super.build_phase(phase)` çağrısını ve fabrika kaydını (`uvm_component_utils`) asla atlamayınız.",
        },
        code: {
          language: "systemverilog",
          caption: "uvm-register-model-example.sv - Örnek UVM Doğrulama Kodu",
          snippet: `module traffic (  input          pclk,
                  input          presetn,
                  input [31:0]   paddr,
                  input [31:0]   pwdata,
                  input          psel,
                  input          pwrite,
                  input          penable,

                  // Outputs
                  output [31:0]  prdata);

   reg [3:0]      ctl_reg;    // profile, blink_red, blink_yellow, mod_en RW
   reg [1:0]      stat_reg;   // state[1:0] 
   reg [31:0]     timer_0;    // timer_g2y[31:20], timer_r2g[19:8], timer_y2r[7:0] RW
   reg [31:0]     timer_1;    // timer_g2y[31:20], timer_r2g[19:8], timer_y2r[7:0] RW

   reg [31:0]     data_in;
   reg [31:0]     rdata_tmp;

   // Set all registers to default values
   always @ (posedge pclk) begin
      if (!presetn) begin
         data_in <= 0;
         ctl_reg  <= 0; 
         stat_reg <= 0; 
         timer_0  <= 32'hcafe_1234; 
         timer_1  <= 32'hface_5678;
      end
   end

   // Capture write data
   always @ (posedge pclk) begin
      if (presetn & psel & penable) 
         if (pwrite) 
            case (paddr)
               'h0   : ctl_reg <= pwdata;
               'h4   : timer_0 <= pwdata;
               'h8   : timer_1 <= pwdata;
               'hc   : stat_reg <= pwdata;
            endcase
   end

   // Provide read data
   always @ (penable) begin
      if (psel & !pwrite) 
         case (paddr)
            'h0 : rdata_tmp <= ctl_reg;
            'h4 : rdata_tmp <= timer_0;
            'h8 : rdata_tmp <= timer_1;
            'hc : rdata_tmp <= stat_reg;
         endcase
   end

   assign prdata = (psel & penable & !pwrite) ? rdata_tmp : 'hz;

endmodule`,
        },
      },
    ],
    playground: {
      title: "UVM Doğrulama Simülatörü: Uçtan Uca UVM RAL Uygulama Örneği: APB Veri Yolu ile Trafik Denetleyicisi",
      initialCode: `module traffic (  input          pclk,
                  input          presetn,
                  input [31:0]   paddr,
                  input [31:0]   pwdata,
                  input          psel,
                  input          pwrite,
                  input          penable,

                  // Outputs
                  output [31:0]  prdata);

   reg [3:0]      ctl_reg;    // profile, blink_red, blink_yellow, mod_en RW
   reg [1:0]      stat_reg;   // state[1:0] 
   reg [31:0]     timer_0;    // timer_g2y[31:20], timer_r2g[19:8], timer_y2r[7:0] RW
   reg [31:0]     timer_1;    // timer_g2y[31:20], timer_r2g[19:8], timer_y2r[7:0] RW

   reg [31:0]     data_in;
   reg [31:0]     rdata_tmp;

   // Set all registers to default values
   always @ (posedge pclk) begin
      if (!presetn) begin
         data_in <= 0;
         ctl_reg  <= 0; 
         stat_reg <= 0; 
         timer_0  <= 32'hcafe_1234; 
         timer_1  <= 32'hface_5678;
      end
   end

   // Capture write data
   always @ (posedge pclk) begin
      if (presetn & psel & penable) 
         if (pwrite) 
            case (paddr)
               'h0   : ctl_reg <= pwdata;
               'h4   : timer_0 <= pwdata;
               'h8   : timer_1 <= pwdata;
               'hc   : stat_reg <= pwdata;
            endcase
   end

   // Provide read data
   always @ (penable) begin
      if (psel & !pwrite) 
         case (paddr)
            'h0 : rdata_tmp <= ctl_reg;
            'h4 : rdata_tmp <= timer_0;
            'h8 : rdata_tmp <= timer_1;
            'hc : rdata_tmp <= stat_reg;
         endcase
   end

   assign prdata = (psel & penable & !pwrite) ? rdata_tmp : 'hz;

endmodule`,
      language: "systemverilog",
      terminalTitle: "UVM EDA Simülatörü",
      expectedOutput: [
        "[INFO:EDA] Compiling testbench.sv and uvm_pkg...",
        "[INFO:SIM] Starting UVM simulation at 0.00ns (Time precision: 1ps)",
        "UVM_INFO @ 0: reporter [RNTST] Running test...",
        "UVM_INFO @ 0: uvm_test_top [TEST] Testbench bileşenleri build_phase aşamasında oluşturuldu.",
        "UVM_INFO @ 10: uvm_test_top [RUN] Uçtan Uca UVM RAL Uygulama Örneği: APB Veri Yolu ile Trafik Denetleyicisi doğrulaması başarıyla tamamlandı.",
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
      question: "Uçtan uca bir UVM RAL test senaryosunda `regmodel.timer.mirror(status, UVM_CHECK)` satırı çalıştırıldığında UVM hangi işlemleri yürütür?",
      options: ["Yalnızca modeldeki istenen (desired) değeri sıfırlar.", "Fiziksel yazmacı veri yolu üzerinden okur, okunan değeri modeldeki aynalanan (mirrored) değer ile karşılaştırır; uyuşmazlık varsa hata raporlar ve modeli donanımla eşitler.", "Donanım yazmacına reset darbesi gönderir.", "Yazmaç adresini geçersiz kılar."],
      correctIndex: 1,
      explanation: "mirror(status, UVM_CHECK) fonksiyonu, fiziksel donanımdan güncel değeri okur, okunan bu değeri modelin kendi takip ettiği aynalanan değer ile karşılaştırıp doğruluk denetimi yapar (UVM_CHECK) ve modeli günceller.",
    },
  },
};
