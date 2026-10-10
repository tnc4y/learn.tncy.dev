import { LessonContent } from "./lessonsData";

export const SYSTEMVERILOG_PART2: Record<string, LessonContent> = {
  // ==========================================
  // MODÜL 3: DİZİLER & KOLEKSİYONLAR
  // ==========================================
  "packed-unpacked-arrays": {
    id: "packed-unpacked-arrays",
    badge: "Modül 3 • Diziler",
    readingTime: "12 dk okuma",
    level: "Orta Seviye",
    title: "Paketlenmiş (Packed) vs Paketlenmemiş (Unpacked) Diziler",
    subtitle:
      "Bit düzeyinde bitişik bellek yerleşimi, çok boyutlu diziler, donanım register modelleri ve sentez kuralları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste donanım tasarımının en kritik bellek yapılarından biri olan dizi türlerini öğreneceksiniz:
- **Paketlenmiş (Packed)** diziler ile **Paketlenmemiş (Unpacked)** diziler arasındaki donanımsal farklar.
- Bellek yerleşimi: Bitişik (contiguous) bitler vs ayrık bellek blokları.
- Çok boyutlu paketlenmiş ve paketlenmemiş dizilerin tanımlanması.
- Vektör dilimleme, aritmetik işlemler ve atama kuralları.
- Sentez araçlarının (Vivado, Design Compiler) dizi mimarilerine bakışı.`,
      },
      {
        title: "2. Dizi Türlerine Genel Bakış",
        content: `![SystemVerilog Dizi Türleri Genel Bakış](/images/systemverilog/systemverilog-array-types-at-a-glance.svg)

SystemVerilog, C dilinin esnekliği ile donanımın bit düzeyindeki hassasiyetini birleştiren gelişmiş bir dizi sistemine sahiptir. Yukarıdaki diyagramda görüldüğü gibi diziler statik ve dinamik olarak ikiye ayrılır.`,
      },
      {
        title: "3. Paketlenmiş (Packed) Dizi Bellek Mimarisi",
        content: `Paketlenmiş bir dizi, değişken adının **sol tarafında** boyutlandırılır: \`bit [3:0][7:0] my_data;\`
Bu dizi bellekte tek bir **32-bitlik kesintisiz bit akışı** olarak depolanır!

![Paketlenmiş Dizi Bellek Yerleşimi](/images/systemverilog/packed-array-memory-layout.svg)

Paketlenmiş dizilerin özellikleri:
- Tek bir vektör gibi davranır; tüm diziye tek seferde tamsayı atanabilir (\`my_data = 32'hDEADBEEF;\`).
- Aritmetik ve mantıksal işlemlere (\`+\`, \`-\`, \`&\`, \`|\`) doğrudan girebilir.
- Sadece 2-durumlu veya 4-durumlu skaler tiplerden (\`bit\`, \`logic\`, \`byte\`) oluşturulabilir.`,
        callout: {
          type: "tip",
          title: "Sentez İpucu",
          message:
            "Bir donanım yazmacı (register) veya veri yolu (bus) modelliyorsanız, daima packed dizi kullanın. Böylece donanım sentezleyicisi bunu tek bir fiziksel kablo demeti olarak tanır.",
        },
      },
      {
        title: "4. Paketlenmemiş (Unpacked) Dizi Boyutlandırması",
        content: `Paketlenmemiş bir dizi, değişken adının **sağ tarafında** boyutlandırılır: \`int mem [0:7];\` veya \`logic [7:0] ram [0:1023];\`
Unpacked diziler bellekte ayrık adreslerde saklanır; her bir eleman ayrı bir bellek gözüdür (RAM modeli).

![Paketlenmemiş Dizi Boyut Sıralaması](/images/systemverilog/unpacked-array-dimension-order.svg)`,
      },
      {
        title: "5. ChipVerify Örneği: Çok Boyutlu Packed ve Unpacked Dizi",
        content: `Aşağıdaki kodda hem sol taraf (packed) hem de sağ taraf (unpacked) boyutlandırmanın nasıl birlikte kullanıldığını görebilirsiniz:`,
        code: {
          language: "systemverilog",
          caption: "Karışık (Packed + Unpacked) Dizi Örneği",
          snippet: `module tb_arrays_demo;
  // 4 elemanlı unpacked dizi; her eleman 2x8-bit (16-bit) packed vektördür
  logic [1:0][7:0] memory [0:3];

  initial begin
    memory[0] = 16'hAABB;
    memory[1] = 16'hCCDD;
    memory[2] = 16'h1122;
    memory[3] = 16'h3344;

    $display("memory[0] tam vektör: 0x%04h", memory[0]);
    $display("memory[0][1] (Üst Bayt): 0x%02h", memory[0][1]);
    $display("memory[0][0] (Alt Bayt): 0x%02h", memory[0][0]);
    $display("memory[0][0][3:0] (Alt Nibble): 0x%01h", memory[0][0][3:0]);
  end
endmodule`,
        },
      },
      {
        title: "6. Sık Yapılan Hatalar & Özet",
        content: `* **Unpacked Diziye Doğrudan Vektör Atamak:** \`memory = 64'h0;\` şeklindeki atamalar derleme hatası verir. Unpacked diziler \`'{default: 0}\` sözdizimiyle veya döngüyle sıfırlanmalıdır.
* **Boyut Sıralamasını Karıştırmak:** Packed dizilerde ilk indeks en dış vektör grubunu temsil eder.`,
      },
    ],
    playground: {
      title: "Packed ve Unpacked Dizi Simülatörü",
      initialCode: `module tb_array_sim;
  logic [3:0][7:0] packed_reg; // 32-bit packed
  logic [7:0]      ram [0:3];  // 4 elemanlı unpacked byte dizisi

  initial begin
    packed_reg = 32'h12345678;
    $display("Packed Reg [1] = 0x%02h (Beklenen: 0x56)", packed_reg[1]);

    ram = '{8'hAA, 8'hBB, 8'hCC, 8'hDD};
    $display("RAM[2] = 0x%02h (Beklenen: 0xCC)", ram[2]);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_array_sim.sv...",
        "Packed Reg [1] = 0x56 (Beklenen: 0x56)",
        "RAM[2] = 0xcc (Beklenen: 0xCC)",
      ],
      notes: "packed_reg[1] ifadesinin 8-bitlik ikinci baytı (56) nasıl getirdiğine dikkat edin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'logic [3:0][7:0] data;' şeklinde tanımlanmış bir değişken için hangisi DOĞRUDUR?",
      options: [
        "A) Bu 4 elemanlı bir unpacked dizidir.",
        "B) Bellekte 32 bitlik tek ve bitişik bir vektör olarak yerleşen packed dizidir.",
        "C) Sentezlenemez, yalnızca simülasyonda kullanılır.",
        "D) Her elemanı 32-bit olan 8 elemanlı bir dizidir.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Boyutlar değişken adının solunda tanımlandığında dizi 'packed' (paketlenmiş) olur. 4 x 8 = 32 bit kesintisiz bir vektördür.",
    },
  },

  "dynamic-arrays": {
    id: "dynamic-arrays",
    badge: "Modül 3 • Diziler",
    readingTime: "11 dk okuma",
    level: "Orta Seviye",
    title: "Dinamik Diziler (Dynamic Arrays)",
    subtitle:
      "Çalışma anında boyutlandırılabilir bellek, new[] kurucusu, size() metodu ve testbench veri havuzları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste doğrulama ortamlarının vazgeçilmezi olan dinamik dizileri öğreneceksiniz:
- Statik dizilerin doğrulama ortamlarındaki bellek israfı ve kısıtları.
- Dinamik dizi tanımlama sözdizimi (\`[]\`).
- Çalışma anında boyutlandırma: \`new[boyut]\` kurucusu.
- Mevcut veriyi koruyarak büyütme: \`new[yeni_boyut](eski_dizi)\`.
- Metotlar: \`size()\` ve bellek boşaltma (\`delete()\`).`,
      },
      {
        title: "2. Dinamik Dizi Büyüme Mimarisi",
        content: `![SystemVerilog Dinamik Dizi Büyümesi](/images/systemverilog/dynamic-array-growth.svg)

Sabit boyutlu dizilerde boyut derleme (compile) anında bilinmelidir (\`int arr[100];\`). Ancak Ethernet paketleri veya PCIe paketleri gibi protokollerde veri paketlerinin uzunluğu 64 bayt ile 1500 bayt arasında rastgele değişebilir.
SystemVerilog dinamik dizileri, simülasyon koşarken tam olarak gereken bayt kadar bellek ayırmanızı sağlar!`,
      },
      {
        title: "3. Boyutlandırma ve new[] Mekanizması",
        content: `Dinamik dizi boş köşeli parantezlerle tanımlanır:
\`\`\`systemverilog
int dyn_arr []; // Başlangıçta boştur, boyutu 0'dır

initial begin
  dyn_arr = new[5]; // 5 elemanlık bellek tahsis edilir
  $display("Boyut: %0d", dyn_arr.size());

  // Eski verileri koruyarak boyutu 10'a büyütme
  dyn_arr = new[10](dyn_arr);

  // Belleği tamamen serbest bırakma
  dyn_arr.delete();
end
\`\`\``,
        callout: {
          type: "info",
          title: "Bellek Tasarrufu",
          message:
            "dyn_arr.delete() çağrıldığında tahsis edilen bellek simülatörün çöp toplayıcısına iade edilir ve size() değeri 0 olur.",
        },
      },
      {
        title: "4. ChipVerify Örneği: Dinamik Dizi Yönetimi",
        content: `Aşağıdaki kapsamlı ChipVerify örneğinde dinamik dizinin oluşturulmasını ve genişletilmesini inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Dinamik Dizi Genişletme ve Yönetim Örneği",
          snippet: `module tb_dyn_array;
  int d_arr [];

  initial begin
    // 1. Adım: 3 eleman tahsis et
    d_arr = new[3];
    d_arr[0] = 10; d_arr[1] = 20; d_arr[2] = 30;
    $display("Adım 1 Boyutu: %0d", d_arr.size());

    // 2. Adım: 5 elemana büyüt ve eski verileri kopyala
    d_arr = new[5](d_arr);
    d_arr[3] = 40; d_arr[4] = 50;
    
    $display("Genişletilmiş Dizi Elemanları:");
    foreach (d_arr[i]) begin
      $display("  d_arr[%0d] = %0d", i, d_arr[i]);
    end

    // 3. Adım: Belleği sil
    d_arr.delete();
    $display("Silme Sonrası Boyut: %0d", d_arr.size());
  end
endmodule`,
        },
      },
      {
        title: "5. Sık Yapılan Hatalar",
        content: `* **new[] Çağırmadan Elemana Erişmek:** Boş bir dinamik diziye \`d_arr[0] = 5;\` ataması yapmak çalışma zamanı ölümcül hatası (Fatal Null Pointer / Out of Bounds) verir.
* **Eski Verileri Korurken (d_arr) Argümanını Unutmak:** \`d_arr = new[10];\` derseniz eski 3 eleman silinir ve tüm elemanlar 0 ile başlar! Eski veriyi saklamak için parantez içinde \`new[10](d_arr)\` yazılmalıdır.`,
      },
    ],
    playground: {
      title: "Dinamik Dizi Çalışma Alanı",
      initialCode: `module tb_dynamic_sim;
  int numbers [];

  initial begin
    numbers = new[4];
    for (int i = 0; i < numbers.size(); i++) begin
      numbers[i] = (i + 1) * 100;
    end

    $display("Dizi Boyutu: %0d", numbers.size());
    $display("İlk Eleman: %0d, Son Eleman: %0d", numbers[0], numbers[3]);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_dynamic_sim.sv...",
        "Dizi Boyutu: 4",
        "İlk Eleman: 100, Son Eleman: 400",
      ],
      notes: "numbers = new[8](numbers); ekleyerek diziyi büyütmeyi deneyin.",
    },
    quiz: {
      question:
        "Mevcut 5 elemanlı bir dinamik diziyi 10 elemana büyütürken içindeki eski verileri KORUMAK için hangi sözdizimi kullanılır?",
      options: [
        "A) arr = new[10];",
        "B) arr.resize(10);",
        "C) arr = new[10](arr);",
        "D) arr.expand(5);",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! 'arr = new[10](arr);' sözdizimi, yeni 10 elemanlık bellek tahsis eder ve parantez içindeki mevcut dizinin eski elemanlarını yeni belleğin başına kopyalar.",
    },
  },

  "queues": {
    id: "queues",
    badge: "Modül 3 • Diziler",
    readingTime: "13 dk okuma",
    level: "Orta Seviye",
    title: "Kuyruklar (Queues): push, pop ve Arama",
    subtitle:
      "FIFO ve LIFO paket kuyruklama, sınırlı/sınırsız kuyruklar, push_back, pop_front ve dinamik dizi kuyrukları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog testbench mimarilerinin en popüler veri yapısı olan kuyrukları (queues) öğreneceksiniz:
- Kuyruk tanımlama sözdizimi: \`[$]\` (sınırsız) ve \`[$:N]\` (sınırlı).
- FIFO (First-In First-Out) kuyruk mimarisi: \`push_back()\` ve \`pop_front()\`.
- LIFO (Yığın / Stack) mimarisi: \`push_front()\` ve \`pop_front()\`.
- Araya eleman ekleme ve silme: \`insert()\` ve \`delete()\`.
- Gelişmiş veri yapıları: Dinamik dizilerden oluşan kuyruklar (queue of dynamic arrays).`,
      },
      {
        title: "2. Sınırsız (Unbounded) Kuyruk Mimarisi",
        content: `![SystemVerilog Sınırsız Kuyruk Mimarisi](/images/systemverilog/systemverilog-unbounded-queue.png)

Kuyruklar dinamik dizilere benzer; ancak en büyük avantajları **\`new[]\` çağırma zorunluluğunun olmamasıdır!**
Bir kuyruğa eleman eklediğinizde SystemVerilog arka planda belleği otomatik olarak genişletir. Tanımlarken dolar işareti (\`[$]\`) kullanılır:
\`\`\`systemverilog
int q [$]; // Sınırsız tamsayı kuyruğu
\`\`\``,
      },
      {
        title: "3. Sınırlı (Bounded) Kuyruklar",
        content: `Donanım FIFO'ları sonsuz derinlikte değildir (örneğin 16 elemanlık bir donanım kuyruğu). Donanımın dolma davranışını simüle etmek için sınırlı kuyruk tanımlanır:

![SystemVerilog Sınırlı Kuyruk Mimarisi](/images/systemverilog/systemverilog-bounded-queue.png)

\`\`\`systemverilog
int bounded_q [$:15]; // En fazla 16 eleman (0-15) alabilen sınırlı kuyruk
\`\`\`
Sınırlı kuyruk dolduğunda yeni eleman eklemeye çalışırsanız simülatör uyarı üretir ve ekleme reddedilir.`,
      },
      {
        title: "4. Temel Kuyruk Metotları Tablosu",
        content: `| Metot | Açıklama |
| :--- | :--- |
| **\`q.push_back(val)\`** | Kuyruğun sonuna eleman ekler (FIFO girişi) |
| **\`val = q.pop_front()\`** | Kuyruğun başındaki elemanı çıkarır ve döner (FIFO çıkışı) |
| **\`q.push_front(val)\`** | Kuyruğun başına eleman ekler |
| **\`val = q.pop_back()\`** | Kuyruğun sonundaki elemanı çıkarır ve döner |
| **\`q.insert(index, val)\`** | Belirtilen indekse araya eleman sıkıştırır |
| **\`q.delete(index)\`** | Belirtilen indeksteki elemanı siler (\`q.delete()\` tüm kuyruğu boşaltır) |
| **\`q.size()\`** | Kuyruktaki eleman sayısını döner |`,
      },
      {
        title: "5. Gelişmiş: Dinamik Dizilerden Oluşan Kuyruklar",
        content: `Modern testbench mimarilerinde birden çok Ethernet paketi biriktirmek için dinamik dizilerden oluşan kuyruklar kullanılır:

![Dinamik Dizilerden Oluşan Kuyruk Mimarisi](/images/systemverilog/queue_of_dynamic_arrays.png)

\`\`\`systemverilog
byte packet_q [$][]; // Her elemanı dinamik byte[] dizisi olan kuyruk
\`\`\``,
      },
      {
        title: "6. ChipVerify Örneği: FIFO Simülasyonu",
        content: `Aşağıdaki kodda tipik bir FIFO testbench kuyruk akışını inceleyebilirsiniz:`,
        code: {
          language: "systemverilog",
          caption: "FIFO Kuyruk push_back ve pop_front Örneği",
          snippet: `module tb_queue_fifo;
  int fifo [$];
  int popped_item;

  initial begin
    // Kuyruğa veri ekleme (Enqueue)
    fifo.push_back(100);
    fifo.push_back(200);
    fifo.push_back(300);
    $display("Kuyruk Boyutu: %0d", fifo.size());

    // Kuyruktan veri çekme (Dequeue)
    popped_item = fifo.pop_front();
    $display("Kuyruktan Çekilen İlk Eleman: %0d", popped_item);

    popped_item = fifo.pop_front();
    $display("Kuyruktan Çekilen İkinci Eleman: %0d", popped_item);

    $display("Kalan Eleman Sayısı: %0d", fifo.size());
  end
endmodule`,
        },
      },
      {
        title: "7. Sık Yapılan Hatalar",
        content: `* **Boş Kuyruktan pop Yapmak:** Kuyruk boşken (\`size() == 0\`) \`pop_front()\` çağrılırsa varsayılan tip değeri (0) döner ve simülatör uyarı verir. Her zaman \`if (q.size() > 0)\` kontrolü yapılmalıdır.
* **Kuyruk ile Dinamik Diziyi Karıştırmak:** Kuyruk için \`new[]\` kullanılmaz!`,
      },
    ],
    playground: {
      title: "Kuyruk (Queue) FIFO Simülatörü",
      initialCode: `module tb_queue_play;
  string jobs [$];

  initial begin
    jobs.push_back("İş-1 (Veri Oku)");
    jobs.push_back("İş-2 (Filtrele)");
    jobs.push_back("İş-3 (Yaz)");

    $display("Kuyruktaki Görev Sayısı: %0d", jobs.size());
    while (jobs.size() > 0) begin
      $display("İşleniyor: %s", jobs.pop_front());
    end
    $display("Tüm görevler tamamlandı, Boyut: %0d", jobs.size());
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_queue_play.sv...",
        "Kuyruktaki Görev Sayısı: 3",
        "İşleniyor: İş-1 (Veri Oku)",
        "İşleniyor: İş-2 (Filtrele)",
        "İşleniyor: İş-3 (Yaz)",
        "Tüm görevler tamamlandı, Boyut: 0",
      ],
      notes: "jobs.insert(1, 'Acil İş'); ekleyerek araya görev eklemeyi test edin.",
    },
    quiz: {
      question:
        "Standart bir FIFO (İlk Giren İlk Çıkar) kuyruk modelinde eleman eklemek ve çıkarmak için hangi iki metot çifti kullanılır?",
      options: [
        "A) push_front() ve pop_front()",
        "B) push_back() ve pop_front()",
        "C) push_back() ve pop_back()",
        "D) insert() ve delete()",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! FIFO modelinde yeni elemanlar kuyruğun arkasına eklenir (push_back) ve ilk eklenen eleman en önden çıkarılır (pop_front).",
    },
  },

  "associative-arrays": {
    id: "associative-arrays",
    badge: "Modül 3 • Diziler",
    readingTime: "11 dk okuma",
    level: "İleri Seviye",
    title: "İlişkisel Diziler (Associative Arrays)",
    subtitle:
      "Büyük seyrek bellek (sparse memory) modelleri, anahtar-değer haritaları ve gezinme fonksiyonları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste devasa adres uzaylarını modellemek için kullanılan ilişkisel dizileri (associative arrays) öğreneceksiniz:
- Neden 64-bitlik bir işlemci belleği için \`bit [7:0] mem [longint];\` gerekir?
- Seyrek bellek (Sparse memory) mimarisinin RAM tüketimini nasıl kurtardığı.
- Anahtar türleri: Tamsayı indisler vs Metin indisler (\`int hash [string];\`).
- Varlık kontrolü: \`exists(key)\`.
- Gezinme metotları: \`first()\`, \`last()\`, \`next()\`, \`prev()\` ve \`delete()\`.`,
      },
      {
        title: "2. İlişkisel Dizi ve İterasyon Sırası",
        content: `![İlişkisel Dizi İterasyon Sırası](/images/systemverilog/associative-array-iteration-order.svg)

32-bit veya 64-bitlik bir işlemcinin tüm adres haritasını statik bir diziyle modellemeye çalışırsanız, simülatör gigabaytlarca boş belleği RAM'e yüklemeye çalışıp çöker.
İlişkisel dizi ise bir **Hash Map / Ağaç** veri yapısıdır. Yalnızca yazılan adresler için dinamik bellek tahsis eder; erişilmeyen milyonlarca adres fiziksel bellekte 0 bayt yer kaplar!`,
      },
      {
        title: "3. Tanımlama ve exists() Metodu",
        content: `Köşeli parantez içine anahtar tipi yazılır:
\`\`\`systemverilog
int mem [int];           // Anahtarı 32-bit int olan dizi
int score [string];      // Anahtarı string olan ilişkisel dizi

initial begin
  score["Ahmet"] = 95;
  score["Zeynep"] = 100;

  if (score.exists("Mehmet"))
    $display("Mehmet bulundu!");
  else
    $display("Mehmet henüz dizide yok!");
end
\`\`\``,
      },
      {
        title: "4. ChipVerify Örneği: Seyrek Bellek Gezinmesi",
        content: `Aşağıdaki kodda \`first()\` ve \`next()\` metotlarıyla ayrık adreslerde nasıl gezildiğini inceleyebilirsiniz:`,
        code: {
          language: "systemverilog",
          caption: "İlişkisel Dizi İterasyon Örneği",
          snippet: `module tb_assoc_array;
  int sparse_mem [int];
  int addr;

  initial begin
    // Dağınık uzak adreslere yazma
    sparse_mem[32'h0000_1000] = 32'hAAAA;
    sparse_mem[32'h000F_0000] = 32'hBBBB;
    sparse_mem[32'hFFFF_0000] = 32'hCCCC;

    $display("Toplam Yazılan Adres Sayısı: %0d", sparse_mem.num());

    // Sırayla gezme
    if (sparse_mem.first(addr)) begin
      do begin
        $display("Adres: 0x%08h -> Veri: 0x%04h", addr, sparse_mem[addr]);
      end while (sparse_mem.next(addr));
    end
  end
endmodule`,
        },
      },
      {
        title: "5. Sık Yapılan Hatalar",
        content: `* **Var Olmayan Elemanı exists() ile Kontrol Etmeden Okumak:** Dizide olmayan bir anahtara doğrudan erişildiğinde tipin varsayılan değeri döner; ancak yazılımsal hataları gizleyebilir.
* **Sentezlenebilir Sanmak:** İlişkisel diziler dinamik hash tablolarıdır; FPGA veya ASIC kapılarına sentezlenemez.`,
      },
    ],
    playground: {
      title: "İlişkisel Dizi (Map) Simülatörü",
      initialCode: `module tb_assoc_play;
  int user_id [string];
  string key;

  initial begin
    user_id["admin"] = 1;
    user_id["guest"] = 999;
    user_id["engineer"] = 42;

    $display("Kayıtlı Kullanıcı Sayısı: %0d", user_id.num());
    
    if (user_id.first(key)) begin
      do begin
        $display("Kullanıcı: %s, ID: %0d", key, user_id[key]);
      end while (user_id.next(key));
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_assoc_play.sv...",
        "Kayıtlı Kullanıcı Sayısı: 3",
        "Kullanıcı: admin, ID: 1",
        "Kullanıcı: engineer, ID: 42",
        "Kullanıcı: guest, ID: 999",
      ],
      notes: "String anahtarların alfabetik sıraya göre gezildiğine dikkat edin.",
    },
    quiz: {
      question:
        "SystemVerilog ilişkisel dizilerinde belirli bir anahtarın dizide mevcut olup olmadığını kontrol etmek için hangi metot kullanılır?",
      options: [
        "A) contains(key)",
        "B) has_key(key)",
        "C) exists(key)",
        "D) find(key)",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! 'arr.exists(key)' metodu, verilen anahtar ilişkisel dizide mevcutsa 1, mevcut değilse 0 döndürür.",
    },
  },

  "array-methods": {
    id: "array-methods",
    badge: "Modül 3 • Diziler",
    readingTime: "11 dk okuma",
    level: "Orta Seviye",
    title: "Dizi Manipülasyon Metodları",
    subtitle:
      "Arama (find/min/max), sıralama (sort/reverse/shuffle) ve indirgeme (sum/product) yerleşik metotları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog'un yerleşik dizi arama ve işleme fonksiyonlarını öğreneceksiniz:
- **Konumlandırıcı (Locator) Metotlar:** \`find()\`, \`find_index()\`, \`min()\`, \`max()\`, \`unique()\`.
- **Sıralama (Ordering) Metotları:** \`sort()\`, \`rsort()\`, \`reverse()\`, \`shuffle()\`.
- **İndirgeme (Reduction) Metotları:** \`sum()\`, \`product()\`, \`and()\`, \`or()\`, \`xor()\`.
- Koşullu aramalarda \`with\` ifadesi ve \`item\` anahtar sözcüğü.`,
      },
      {
        title: "2. Dizi Manipülasyon Metotları Şeması",
        content: `![SystemVerilog Dizi Manipülasyon Metotları Genel Bakış](/images/systemverilog/array-manipulation-methods-overview.svg)

SystemVerilog, modern dillerdeki (Python list comprehension, JS map/filter) gibi güçlü dizi sorgulama araçlarına sahiptir. \`with\` ifadesi ile döngü yazmadan tek satırda filtreleme yapabilirsiniz.`,
      },
      {
        title: "3. Konumlandırıcı ve Filtreleme Metotları",
        content: `\`find()\` metotları sonuçları her zaman **bir kuyruk (queue)** olarak döndürür:

\`\`\`systemverilog
int arr [] = '{2, 5, 8, 11, 14, 17};
int res [$];

// 10'dan büyük elemanları bul
res = arr.find(x) with (x > 10); // res = '{11, 14, 17}

// En küçük eleman
res = arr.min(); // res = '{2}

// Çift sayıların indekslerini bul
res = arr.find_index with (item % 2 == 0);
\`\`\``,
      },
      {
        title: "4. İndirgeme ve Taşma (Overflow) Tehlikesi",
        content: `\`arr.sum()\` metodu dizideki tüm elemanları toplar. Ancak dikkat: **Dönüş değeri dizinin kendi eleman tipinin genişliğindedir!**
Eğer 8-bitlik byte dizisi topluyorsanız, toplam 255'i aştığında taşma olur. Taşmayı önlemek için \`with\` içinde tip dönüşümü yapılmalıdır:
\`\`\`systemverilog
byte b_arr [] = '{200, 100, 50};
int total;

// Yanlış: 8-bit toplar ve taşar
total = b_arr.sum(); 

// Doğru: 32-bit int olarak toplar
total = b_arr.sum() with (int'(item));
\`\`\``,
      },
      {
        title: "5. ChipVerify Örneği: Sıralama ve Karıştırma",
        content: `Aşağıdaki örnekte \`sort()\`, \`rsort()\` ve \`shuffle()\` metotlarının kullanımını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Dizi Sıralama ve Karıştırma Örneği",
          snippet: `module tb_array_methods;
  int data [] = '{9, 3, 7, 1, 5};

  initial begin
    $display("Orijinal: %p", data);

    data.sort();
    $display("Küçükten Büyüğe (sort): %p", data);

    data.rsort();
    $display("Büyükten Küçüğe (rsort): %p", data);

    data.reverse();
    $display("Ters Çevrilmiş (reverse): %p", data);

    data.shuffle();
    $display("Rastgele Karıştırılmış (shuffle): %p", data);
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* \`find()\` sonuçları daima kuyruk olarak döner.
* \`shuffle()\` rastgele test uyarımı üretmek için çok kullanışlıdır.
* \`sum()\` kullanılırken taşmaya karşı \`with (int'(item))\` unutulmamalıdır.`,
      },
    ],
    playground: {
      title: "Dizi Metotları Simülatörü",
      initialCode: `module tb_methods_play;
  int scores [] = '{45, 88, 92, 60, 75, 95};
  int high_scores [$];

  initial begin
    high_scores = scores.find with (item >= 80);
    $display("80 Üzeri Notlar: %p", high_scores);
    
    scores.sort();
    $display("Sıralı Notlar: %p", scores);
    $display("En Düşük: %0d, En Yüksek: %0d", scores[0], scores[scores.size()-1]);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_methods_play.sv...",
        "80 Üzeri Notlar: '{88, 92, 95}",
        "Sıralı Notlar: '{45, 60, 75, 88, 92, 95}",
        "En Düşük: 45, En Yüksek: 95",
      ],
      notes: "scores.sum() metodunu ekleyerek sınıf ortalamasını hesaplamayı deneyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'arr.find with (item > 10)' ifadesi arama sonucunu hangi veri tipinde döndürür?",
      options: [
        "A) Statik dizi",
        "B) Kuyruk (Queue)",
        "C) Tek bir tamsayı",
        "D) Dinamik dizi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! SystemVerilog dizi konumlandırıcı metotları (find, find_index, min, max, unique) sonuçları her zaman bir kuyruk (queue) olarak döndürür.",
    },
  },

  // ==========================================
  // MODÜL 4: AKIŞ KONTROLÜ & SENTEZLENEBİLİR RTL
  // ==========================================
  "always-blocks": {
    id: "always-blocks",
    badge: "Modül 4 • Akış Kontrolü",
    readingTime: "12 dk okuma",
    level: "Orta Seviye",
    title: "always_comb, always_ff ve always_latch",
    subtitle:
      "Latch oluşumunu engelleyen, sentez niyetini belirten ve duyarlılık listesini otomatik yöneten modern RTL blokları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste donanım tasarımında devrim yaratan modern always bloklarını öğreneceksiniz:
- Klasik Verilog \`always @(*)\` bloğunun tehlikeleri ve simülasyon uyumsuzlukları.
- **\`always_comb\`**: Kombinasyonel mantık, sıfır-zamanlı simülasyon tetiklemesi ve otomatik duyarlılık listesi.
- **\`always_ff\`**: Flip-Flop ve ardışıl (sequential) mantık modelleme; saat/reset kenarları.
- **\`always_latch\`**: İstenen mandal (latch) devrelerini açıkça bildirme.
- Çoklu sürücü engeli ve sentez niyetinin (synthesis intent) derleyici tarafından denetlenmesi.`,
      },
      {
        title: "2. Modern Always Blokları Mimarisi",
        content: `![SystemVerilog Modern Always Blokları](/images/systemverilog/sv-always-blocks.svg)

Klasik Verilog'da her şey için tek bir \`always\` bloğu vardı. Tasarımcının amacı (kombinasyonel mi yoksa flip-flop mu yapmak istediği) kodun içindeki karmaşık \`if-else\` yapısına bakılarak tahmin edilmeye çalışılırdı.
SystemVerilog ise **sentez niyetini (design intent)** açıkça bildiren üç uzmanlaşmış blok getirdi.`,
      },
      {
        title: "3. always_comb: Kusursuz Kombinasyonel Mantık",
        content: `\`always_comb\` kombinasyonel mantık devreleri için tasarlanmıştır:
- Duyarlılık listesi (\`@(...)\`) yazılmaz; blok içinde okunan tüm sinyalleri otomatik izler.
- Fonksiyon çağrılarının içindeki sinyalleri de duyarlılık listesine otomatik ekler (klasik \`always @*\` bunu yapamazdı!).
- Simülasyonun başında T=0 anında otomatik olarak 1 kez çalışır; böylece başlangıç uyumsuzlukları önlenir.
- Blok içindeki bir sinyal başka bir bloktan sürülemez (tek sürücü kuralı).`,
        callout: {
          type: "warning",
          title: "İstenmeyen Latch Uyarısı",
          message:
            "always_comb içinde bir 'if' dalının 'else' kısmını veya 'case' içinde bir durumu unutursanız, sentez aracı derleme anında 'Inferred latch in always_comb' hatası vererek ölümcül donanım hatalarını anında yakalar!",
        },
      },
      {
        title: "4. always_ff: Güvenli Ardışıl (Sequential) Mantık",
        content: `Flip-Flop ve yazmaç (register) mantığı için kullanılır:
- Duyarlılık listesinde kesinlikle kenar duyarlılığı (\`posedge\` veya \`negedge\`) bulunmalıdır.
- Blok içinde bloklayan atama (\`=\`) yapılmamalı, daima **bloklamayan atama (\`<=\`)** kullanılmalıdır.`,
      },
      {
        title: "5. ChipVerify Örneği: ALU ve Register Tasarımı",
        content: `Aşağıdaki örnekte \`always_comb\` ve \`always_ff\` bloklarının birlikte kullanımını inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "ALU (Kombinasyonel) ve Çıkış Kaydı (Ardışıl)",
          snippet: `module alu_reg (
  input  logic        clk,
  input  logic        rst_n,
  input  logic [1:0]  op,
  input  logic [7:0]  a, b,
  output logic [7:0]  alu_out_q
);
  logic [7:0] alu_comb;

  // 1. Kombinasyonel Mantık
  always_comb begin
    case (op)
      2'b00:   alu_comb = a + b;
      2'b01:   alu_comb = a - b;
      2'b10:   alu_comb = a & b;
      default: alu_comb = a ^ b;
    endcase
  end

  // 2. Ardışıl Mantık (Flip-Flop)
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      alu_out_q <= 8'h00;
    else
      alu_out_q <= alu_comb;
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Kombinasyonel için \`always_comb\` kullanın.
* Flip-Flop için \`always_ff\` ve \`<=\` kullanın.
* Asla istemeden latch oluşturmayın; tüm dalları kapsayın.`,
      },
    ],
    playground: {
      title: "Modern Always Blokları Simülatörü",
      initialCode: `module tb_always_sim;
  logic clk = 0;
  logic [3:0] d = 4'h0;
  logic [3:0] q;

  always #5 clk = ~clk;

  // Flip-Flop
  always_ff @(posedge clk) begin
    q <= d;
  end

  initial begin
    #12 d = 4'hA;
    #10 d = 4'h5;
    #10;
    $display("[@%0tns] Son Çıkış Q = 0x%0h", $time, q);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_always_sim.sv...",
        "[@32ns] Son Çıkış Q = 0x5",
      ],
      notes: "Saat darbesinin yükselen kenarında d değerinin q çıkışına nasıl aktarıldığını gözlemleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'always_comb' bloğu kullanmanın klasik Verilog 'always @(*)' bloğuna göre en büyük avantajı nedir?",
      options: [
        "A) always_comb içinde #delay kullanılabilmesi.",
        "B) T=0 anında otomatik tetiklenmesi, fonksiyon içi sinyalleri izlemesi ve eksik dalda sentezleyicinin latch uyarısı vermesi.",
        "C) always_comb bloğunun flip-flop üretmesi.",
        "D) Simülasyon hızını 100 kat artırması.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! always_comb T=0 anında otomatik çalışarak simülasyon-sentez uyumsuzluğunu önler ve eksik bırakılan durumlarda istenmeyen latch oluşumunu derleme anında yakalar.",
    },
  },

  "unique-priority": {
    id: "unique-priority",
    badge: "Modül 4 • Akış Kontrolü",
    readingTime: "11 dk okuma",
    level: "Orta Seviye",
    title: "unique ve priority (if-else & case)",
    subtitle:
      "Eksik dalları yakalama, paralel donanım kodlayıcıları, öncelik mantığı ve simülasyon ikazları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste SystemVerilog'un donanım sentezinde ve simülasyon denetiminde çığır açan \`unique\` ve \`priority\` niteleyicilerini öğreneceksiniz:
- Klasik Verilog \`parallel_case\` ve \`full_case\` sentez pragma'larının ölümcül riskleri.
- **\`unique\`**: Dalların kesinlikle örtüşmediğini (paralel) ve tam olarak bir dalın eşleştiğini bildirme.
- **\`unique0\`**: En fazla bir dalın eşleşebileceğini (hiçbiri eşleşmese de hata vermemesini) bildirme.
- **\`priority\`**: Dalların sırayla (öncelikli) değerlendirildiğini ve en az bir dalın eşleşmesi gerektiğini bildirme.
- Simülasyon çalışma anı ihlal uyarıları.`,
      },
      {
        title: "2. Unique vs Priority Donanım Mimarisi",
        content: `![SystemVerilog Unique ve Priority Mimarisi](/images/systemverilog/sv-unique-priority.svg)

Yukarıdaki diyagramda görüldüğü gibi:
- **\`unique case\`**: Paralel donanım oluşturur (MUX veya tek seviyeli kod çözücü). İki durum aynı anda aktif olamaz.
- **\`priority if-else\`**: Öncelikli kodlayıcı (Priority Encoder) zinciri oluşturur.`,
      },
      {
        title: "3. unique case ve İhlal Kontrolleri",
        content: `Bir \`case\` ifadesinin başına \`unique\` eklendiğinde simülatör iki kuralı denetler:
1. **Çakışma Kontrolü:** İki farklı \`case\` maddesi aynı anda eşleşirse simülatör çalışma zamanı uyarısı (Run-time Warning) fırlatır.
2. **Kapsama Kontrolü:** Değer hiçbir maddeyle eşleşmezse ve \`default\` dalı yoksa simülatör uyarı verir.

\`\`\`systemverilog
unique case (sel)
  2'b00: out = in0;
  2'b01: out = in1;
  2'b10: out = in2;
  // sel = 2'b11 gelirse simülatör "None of the branches matched" uyarısı verir!
endcase
\`\`\``,
      },
      {
        title: "4. unique0: İsteğe Bağlı Eşleşme",
        content: `Eğer durumların hiçbiri gerçekleşmediğinde devrenin hiçbir şey yapmaması normal bir durumsa (uyarı verilmesini istemiyorsanız) \`unique0\` kullanılır:
\`\`\`systemverilog
unique0 case (request)
  4'b0001: grant = 4'b0001;
  4'b0010: grant = 4'b0010;
  // İstek yoksa (0000) sessizce geçer, hata basmaz!
endcase
\`\`\``,
      },
      {
        title: "5. ChipVerify Örneği: Priority Encoder",
        content: `Aşağıdaki kodda \`priority if\` yapısının öncelikli kesme yönetimini inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "Priority ile Öncelikli Kesme Kodlayıcı",
          snippet: `module tb_priority;
  logic [2:0] irq;
  int handled;

  initial begin
    irq = 3'b110; // Hem IRQ 2 hem IRQ 1 aktif

    priority if (irq[2]) begin
      handled = 2; // En yüksek öncelik
    end else if (irq[1]) begin
      handled = 1;
    end else if (irq[0]) begin
      handled = 0;
    end else begin
      handled = -1;
    end

    $display("İşlenen Kesme: %0d (Beklenen: 2)", handled);
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Sentezleyiciye paralel mantık üretmesini söylemek için \`unique case\` kullanın.
* Öncelik sırası kritikse \`priority if\` kullanın.
* Simülasyonda beklenmeyen durumları anında yakalamak için eşsiz bir güvenlik ağıdır.`,
      },
    ],
    playground: {
      title: "Unique Case Simülatörü",
      initialCode: `module tb_unique_play;
  logic [1:0] code = 2'b01;
  string desc;

  always_comb begin
    unique case (code)
      2'b00: desc = "Durum 0";
      2'b01: desc = "Durum 1";
      2'b10: desc = "Durum 2";
      default: desc = "Bilinmeyen";
    endcase
  end

  initial begin
    #1;
    $display("Açıklama: %s", desc);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_unique_play.sv...",
        "Açıklama: Durum 1",
      ],
      notes: "code değişkenini 2'b11 yaparak default dalını test edin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'unique case' ifadesinde giriş değeri hiçbir dal ile eşleşmezse ve default dalı yoksa ne olur?",
      options: [
        "A) Hiçbir şey olmaz, sessizce devam eder.",
        "B) Simülatör çalışma zamanında 'No condition matched in unique case' uyarısı verir.",
        "C) Simülasyon çöker ve program kapanır.",
        "D) Otomatik olarak ilk dal çalıştırılır.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 'unique', tüm olasılıkların kapsandığını varsayar. Hiçbir dal eşleşmezse simülatör çalışma zamanında bir kural ihlali uyarısı üretir.",
    },
  },

  "loops": {
    id: "loops",
    badge: "Modül 4 • Akış Kontrolü",
    readingTime: "11 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Döngüler: for, foreach, repeat ve forever",
    subtitle:
      "Diziler üzerinde gezinme, foreach indeks kuralları, break/continue kontrolleri ve testbench saat/uyaran üreteçleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste donanım tasarımında ve doğrulamada kullanılan döngü mekanizmalarını öğreneceksiniz:
- **\`for\`** döngüsü ve yerel sayaç tanımlama (\`for (int i=0; ...)\`).
- **\`foreach\`**: Çok boyutlu diziler üzerinde indeks sınırlarını bilmeden otomatik gezinme.
- **\`repeat\`**: Sabit sayıda saat darbesi veya işlem tekrarlama.
- **\`forever\`**: Testbench saat üreteçlerinde sonsuz döngü kurma.
- Akış kontrolleri: **\`break\`** ve **\`continue\`**.`,
      },
      {
        title: "2. Döngü Akış Şeması ve While / Do-While",
        content: `![SystemVerilog While ve Do-While Döngü Akışı](/images/systemverilog/systemverilog-while-do-while-flow.svg)

SystemVerilog döngüleri C dilinin zenginliğini taşır. Ancak döngülerin sentezlenebilirliği çok önemlidir:
- **RTL Sentezinde:** Yalnızca sınırları derleme anında sabit olan \`for\` döngüleri sentezlenebilir (donanım unroll edilerek paralel kopyalara açılır).
- **Testbench'te:** \`forever\`, \`repeat\`, \`while\` gibi tüm döngüler serbestçe kullanılır.`,
      },
      {
        title: "3. foreach: Diziler İçin Otomatik İndeksleme",
        content: `SystemVerilog'un en pratik döngüsü \`foreach\` dir. Dizinin boyutunu bilmenize gerek yoktur:
\`\`\`systemverilog
int matrix [2][3];

// 2 boyutlu dizi üzerinde gezinme:
foreach (matrix[row, col]) begin
  matrix[row][col] = row * 10 + col;
  $display("matrix[%0d][%0d] = %0d", row, col, matrix[row][col]);
end
\`\`\``,
      },
      {
        title: "4. break ve continue Akış Kontrolleri",
        content: `![SystemVerilog Break ve Continue Akışı](/images/systemverilog/systemverilog-break-continue-flow.svg)

Klasik Verilog'da \`break\` ve \`continue\` yoktu; döngüyü erken bitirmek için hantal bayraklar (flags) gerekirdi. SystemVerilog ile arama işlemlerinde aranan eleman bulunduğu anda \`break\` ile döngüden çıkılabilir.`,
      },
      {
        title: "5. ChipVerify Örneği: Testbench Saat ve Repeat Döngüsü",
        content: `Aşağıdaki örnekte saat üretimi ve uyaran bekletme döngülerini inceleyin:`,
        code: {
          language: "systemverilog",
          caption: "forever ve repeat Kullanımı",
          snippet: `module tb_loops_demo;
  logic clk = 0;
  int packet_count = 0;

  // Sonsuz Saat Üreteci
  initial begin
    forever #5 clk = ~clk;
  end

  // Testbench Uyaranı
  initial begin
    // Tam 5 saat darbesi bekle
    repeat (5) @(posedge clk);
    $display("[@%0tns] 5 saat darbesi geçti, işlemler başlıyor...", $time);

    repeat (3) begin
      @(posedge clk);
      packet_count++;
      $display("[@%0tns] Paket %0d gönderildi.", $time, packet_count);
    end

    $finish;
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Diziler için daima \`foreach\` kullanın.
* Saat sinyali için \`forever #period clk = ~clk;\` standarttır.
* Sabit çevrim beklemeleri için \`repeat (N) @(posedge clk);\` en temiz yoldur.`,
      },
    ],
    playground: {
      title: "Foreach ve Break Simülatörü",
      initialCode: `module tb_loop_play;
  int numbers [] = '{10, 25, 42, 77, 99};

  initial begin
    $display("Dizi taranıyor...");
    foreach (numbers[i]) begin
      if (numbers[i] == 42) begin
        $display("Hedef sayı (42) bulundu! İndeks: %0d", i);
        break;
      end
      $display("İncelenen: %0d", numbers[i]);
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_loop_play.sv...",
        "Dizi taranıyor...",
        "İncelenen: 10",
        "İncelenen: 25",
        "Hedef sayı (42) bulundu! İndeks: 2",
      ],
      notes: "42 bulunduktan sonra break çağrıldığı için 77 ve 99 elemanları taranmaz.",
    },
    quiz: {
      question:
        "SystemVerilog'da çok boyutlu bir dizi üzerinde (int arr [4][8];) gezinmek için en pratik döngü hangisidir?",
      options: [
        "A) repeat (32)",
        "B) forever",
        "C) foreach (arr[i, j])",
        "D) while (!done)",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! 'foreach (arr[i, j])' sözdizimi, çok boyutlu dizinin tüm satır ve sütun indekslerini otomatik belirleyerek temiz ve hatasız bir gezinme sağlar.",
    },
  },

  // ==========================================
  // MODÜL 5: ZAMANLAMA SEMANTİĞİ
  // ==========================================
  "event-regions": {
    id: "event-regions",
    badge: "Modül 5 • Zamanlama",
    readingTime: "14 dk okuma",
    level: "İleri Seviye",
    title: "SystemVerilog Zamanlama Bölgeleri (Stratified Queue)",
    subtitle:
      "Preponed, Active, Inactive, Observed, Reactive ve Postponed olay bölgeleri ile deterministik simülasyon.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste donanım simülatörlerinin kalbi olan olay zamanlama motorunu öğreneceksiniz:
- Bir simülasyon zaman adımında ($t$) aynı anda gerçekleşen olaylar nasıl sıralanır?
- Klasik Verilog'daki yarış durumlarının (Race Condition) arkasındaki olay bölgesi eksiklikleri.
- **IEEE 1800 Stratified Event Queue** mimarisi:
  - **Preponed**: Sinyal örnekleme bölgesi (Assertion ve Clocking Block girişleri).
  - **Active / Inactive / NBA**: Tasarım (RTL) olayları ve non-blocking atamalar.
  - **Observed**: Eşzamanlı assertion değerlendirmeleri.
  - **Reactive**: Testbench olayları (program block / reactive region).
  - **Postponed**: $monitor ve $strobe ile nihai kararlı durum okuması.`,
      },
      {
        title: "2. SystemVerilog Zamanlama Bölgeleri Mimarisi",
        content: `![SystemVerilog Zamanlama Bölgeleri (Event Regions)](/images/systemverilog/systemverilog-scheduling-regions.svg)

Bir simülatör zamanı ($10\text{ns}$ gibi) dondurduğunda, o mikro saniye içinde onlarca farklı kod parçası çalışır. SystemVerilog bu işlemleri belirli katmanlara (bölgelere) ayırarak testbench ile RTL arasındaki yarış durumlarını tamamen çözer.`,
      },
      {
        title: "3. Preponed Bölgesi: Temiz Örnekleme",
        content: `![Preponed Bölgesi Örnekleme Mimarisi](/images/systemverilog/preponed-region.png)

Saat yükselmeden hemen önceki kararlı durumu görmek için **Preponed** bölgesi kullanılır:
- Saat darbesinin tetiklediği flip-flop'lar henüz çıkışlarını değiştirmemiştir.
- SVA assertion'ları girişleri bu bölgede örnekler. Bu sayede donanım gibi kusursuz kurulum/tutma (setup/hold) zamanı simüle edilir.`,
      },
      {
        title: "4. Active, NBA ve Reactive Bölgeleri",
        content: `* **Active Bölgesi:** Tasarım içindeki bloklayan atamalar (\`=\`), \`always_comb\` değerlendirmeleri ve \`$display\` komutları burada koşar.
* **NBA (Non-Blocking Assignment) Bölgesi:** Flip-Flop'ların \`<=\` atamalarının güncellendiği bölgedir. Tüm Active hesaplamaları bittikten sonra saat kenarı çıkışları buraya yansır.
* **Reactive Bölgesi:** Testbench uyaranları ve \`program\` blokları bu bölgede çalışır; böylece tasarımın NBA çıkışları kararlı hale geldikten sonra testbench kararlarını verir.`,
      },
      {
        title: "5. Sık Yapılan Hatalar & Özet",
        content: `* RTL sinyallerini testbench içinden bloklayan (\`=\`) atamayla ve saat kenarında sürmek yarış durumu yaratır.
* Testbench sinyalleri clocking block üzerinden sürülmeli veya reactive mantığına uygun tasarlanmalıdır.`,
      },
    ],
    playground: {
      title: "Zamanlama Bölgeleri Simülatörü",
      initialCode: `module tb_regions_demo;
  logic clk = 0;
  int a = 0;
  int b = 0;

  always #5 clk = ~clk;

  // Active vs NBA güncellemesi
  always_ff @(posedge clk) begin
    a <= a + 1; // NBA bölgesinde güncellenir
  end

  initial begin
    @(posedge clk);
    #0; // Delta cycle
    $display("[@%0tns] clk yükseldi, a değeri: %0d", $time, a);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_regions_demo.sv...",
        "[@5ns] clk yükseldi, a değeri: 1",
      ],
      notes: "a değerinin NBA bölgesinde güncellendikten sonra okunduğunu gözlemleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da eşzamanlı assertion (SVA) ifadeleri sinyal değerlerini simülasyon zaman adımının hangi bölgesinde örnekler?",
      options: [
        "A) Postponed",
        "B) Active",
        "C) Preponed",
        "D) Reactive",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! Preponed bölgesi, zaman adımında hiçbir sinyal değişmeden hemen önceki kararlı durumu temsil eder ve SVA ifadeleri sinyalleri daima Preponed bölgesinde örnekler.",
    },
  },

  "delta-cycles-race": {
    id: "delta-cycles-race",
    badge: "Modül 5 • Zamanlama",
    readingTime: "12 dk okuma",
    level: "İleri Seviye",
    title: "Delta Döngüleri & Yarış Durumları (Race Conditions)",
    subtitle:
      "Delta döngüsü (Delta Cycle) mantığı, #0 gecikmesinin tehlikeleri, bloklayan vs bloklamayan atamalar.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste donanım simülatörlerinin en gizemli kavramı olan Delta Döngülerini öğreneceksiniz:
- **Delta Döngüsü (Delta Cycle)** nedir? Simülasyon zamanı ($t$) ilerlemeden gerçekleşen mikroskobik adımlar.
- Bloklayan (\`=\`) vs Bloklamayan (\`<=\`) atama yarış durumları (Race Conditions).
- \`#0\` gecikmesinin simülatör olay kuyruğundaki etkisi ve neden kötü bir kodlama alışkanlığı olduğu.
- Simülasyon ile gerçek donanım (silikon) arasındaki davranış farklarının (mismatch) önlenmesi.`,
      },
      {
        title: "2. Delta Döngüsü Mimarisi",
        content: `![Delta Döngüleri ve Yarış Durumları Mimarisi](/images/systemverilog/sv-delta-cycles.svg)

Simülasyon zamanı (örneğin $10\text{ns}$) tek bir andır; ancak o anda peş peşe tetiklenen kapılar vardır. Simülatör zamanı $10\text{ns}$ olarak sabit tutarken olaylar durulana kadar sırayla iterasyon yapar. Her bir iç iterasyona **Delta Döngüsü** denir.`,
      },
      {
        title: "3. Klasik Yarış Durumu: İki Flip-Flop Birbirine Bağlandığında",
        content: `Aşağıdaki kodda bloklayan atama (\`=\`) kullanılırsa ölümcül bir yarış durumu doğar:
\`\`\`systemverilog
// YANLIŞ: Yarış Durumu (Race Condition)!
always @(posedge clk) q1 = d;
always @(posedge clk) q2 = q1;
\`\`\`
Hangi \`always\` bloğunun önce çalışacağı simülatör üreticisine göre değişir!
- Eğer 1. blok önce çalışırsa \`q2\` hemen yeni \`d\` değerini alır (HATA!).
- Eğer 2. blok önce çalışırsa \`q2\` eski \`q1\` değerini alır (DOĞRU).

**Çözüm:** Daima bloklamayan atama (\`<=\`) kullanmaktır:
\`\`\`systemverilog
// DOĞRU: Deterministik Ardışıl Mantık
always_ff @(posedge clk) q1 <= d;
always_ff @(posedge clk) q2 <= q1;
\`\`\``,
        callout: {
          type: "warning",
          title: "Altın Donanım Kuralı",
          message:
            "Ardışıl mantıkta (saat kenarında) DAİMA '<=' kullanın. Kombinasyonel mantıkta DAİMA '=' kullanın. İkisini asla aynı always bloğunda karıştırmayın!",
        },
      },
      {
        title: "4. #0 Gecikmesinin Tehlikesi",
        content: `Bazı mühendisler bir sinyali o anki olayların sonrasına ertelemek için \`#0 a = b;\` yazar. Bu, olayı Inactive bölgesine atar. Ancak kod büyüdükçe birden fazla \`#0\` birbiriyle yarışmaya başlar ve simülasyonu öngörülemez hale getirir. SystemVerilog'un clocking block ve program blokları varken \`#0\` kullanılmamalıdır.`,
      },
      {
        title: "5. ChipVerify Örneği: İki Kaydırmalı Yazmaç (Shift Register)",
        content: `Aşağıdaki kodda bloklamayan atamanın nasıl deterministik bir 2-aşamalı shift register ürettiğini görün:`,
        code: {
          language: "systemverilog",
          caption: "Deterministik Kaydırmalı Yazmaç",
          snippet: `module tb_shift_reg;
  logic clk = 0;
  logic d = 1;
  logic q1, q2;

  always #5 clk = ~clk;

  always_ff @(posedge clk) begin
    q1 <= d;
    q2 <= q1; // q1'in ESKİ değerini alır!
  end

  initial begin
    @(posedge clk);
    #1;
    $display("[@%0tns] 1. Vuruş Sonrası: q1=%b, q2=%b", $time, q1, q2);
    @(posedge clk);
    #1;
    $display("[@%0tns] 2. Vuruş Sonrası: q1=%b, q2=%b", $time, q1, q2);
    $finish;
  end
endmodule`,
        },
      },
      {
        title: "6. Hızlı Kontrol & Özet",
        content: `* Delta döngüsü zaman ilerlemeden ($+0\text{ns}$) donanım kararlılığına ulaşmak için koşar.
* \`<=\` atamaları NBA bölgesinde aynı anda güncellenerek yarış durumlarını engeller.`,
      },
    ],
    playground: {
      title: "Delta Döngüsü ve Shift Register Simülatörü",
      initialCode: `module tb_delta_sim;
  logic clk = 0;
  int r1 = 10, r2 = 20;

  always #5 clk = ~clk;

  always_ff @(posedge clk) begin
    r1 <= 50;
    r2 <= r1; // r1'in bir önceki çevrimdeki değeri (10) aktarılır
  end

  initial begin
    @(posedge clk);
    #1;
    $display("İlk Saat Vuruşu: r1 = %0d, r2 = %0d", r1, r2);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_delta_sim.sv...",
        "İlk Saat Vuruşu: r1 = 50, r2 = 10",
      ],
      notes: "r2 değerinin 50 değil, r1'in önceki değeri olan 10 olduğuna dikkat edin.",
    },
    quiz: {
      question:
        "Ardışıl donanım (Flip-Flop) tasarımında bloklayan (=) yerine bloklamayan (<=) atama kullanılmasının temel sebebi nedir?",
      options: [
        "A) Kodun daha hızlı derlenmesini sağlamak.",
        "B) Simülasyonda bloklar arasındaki yürütme sırasına bağlı yarış durumlarını (race conditions) önlemek ve gerçek donanımla birebir uyumlu olmak.",
        "C) Sentezleyicinin daha az kapı kullanmasını sağlamak.",
        "D) <= operatörünün sadece tamsayıları desteklemesi.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Bloklamayan (<=) atamalar değerleri NBA bölgesinde eşzamanlı olarak günceller; böylece blokların simülatördeki çalışma sırasına bağlı yarış durumları tamamen ortadan kalkar.",
    },
  },
};
