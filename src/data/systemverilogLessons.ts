import { LessonContent } from "./lessonsData";

export const SYSTEMVERILOG_LESSONS: Record<string, LessonContent> = {
  // ==========================================
  // MODÜL 2: VERİ TİPLERİ (DATA TYPES)
  // ==========================================
  "2-state-types": {
    id: "2-state-types",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "2-Durumlu Tipler: bit, byte, int, longint",
    subtitle:
      "Simülasyon performansını katlayan 2-durumlu (0 ve 1) veri tipleri, işaretli/işaretsiz yapılar ve bellek boyutları.",
    sections: [
      {
        title: "1. 2-Durumlu (2-State) vs 4-Durumlu (4-State) Mantık",
        content:
          "Klasik Verilog'da tüm veri tipleri 4-durumludur: `0`, `1`, `X` (bilinmeyen) ve `Z` (yüksek empedans). Donanım devrelerinde X ve Z durumları fiziksel gerçekliği modellemek için şarttır.\n\nAncak doğrulama (testbench) ortamlarında paket sayaçları, döngü indisleri ve saf veri yükleri (payload) için X ve Z durumlarına ihtiyaç duyulmaz. 4-durumlu her bir değişken bellekte fazladan bellek ve işlemci gücü tüketir. **SystemVerilog**, yalnızca `0` ve `1` değerini alan **2-durumlu (2-state)** tipleri C/C++ dillerinden esinlenerek tanıttı.",
        callout: {
          type: "warning",
          title: "Varsayılan Başlangıç Değerleri",
          message:
            "4-durumlu tipler (`logic`, `integer`) simülasyon başlangıcında varsayılan olarak 'X' değerini alırken; 2-durumlu tipler (`bit`, `byte`, `int`) varsayılan olarak '0' değerini alır. Sıfırlanmamış bir donanım sinyali için 2-durumlu tip kullanırsanız, X arızalarını maskeleyebilirsiniz!",
        },
      },
      {
        title: "2. SystemVerilog 2-Durumlu Veri Tipleri Tablosu",
        content:
          "Tüm 2-durumlu tipler C dilindeki standart tamsayı boyutlarıyla birebir örtüşür:\n\n- **`bit`**: 1-bit genişliğinde işaretsiz (unsigned). İstenen genişlikte vektör yapılabilir: `bit [7:0] my_byte;`\n- **`byte`**: 8-bit genişliğinde **işaretli (signed)** tamsayı (-128 ile +127 arası).\n- **`shortint`**: 16-bit genişliğinde işaretli tamsayı.\n- **`int`**: 32-bit genişliğinde işaretli tamsayı (en sık kullanılan sayaç tipi).\n- **`longint`**: 64-bit genişliğinde işaretli tamsayı (büyük zaman ve adres değerleri için).\n- **`time` / `realtime`**: 64-bit simülasyon zamanı tutucu tipler.",
        code: {
          language: "systemverilog",
          caption: "2-Durumlu Tipler ve unsigned Tanımlama",
          snippet: `module datatypes_demo;
  bit        single_flag = 1'b1;       // 1-bit (0 veya 1)
  bit [7:0]  data_byte   = 8'hA5;      // 8-bit işaretsiz vektör
  byte       signed_b    = 8'h80;      // -128 (işaretli!)
  byte unsigned u_byte   = 8'h80;      // +128 (işaretsiz!)
  int        counter     = 1000;       // 32-bit işaretli
  longint    cycle_count = 64'd500000; // 64-bit

  initial begin
    $display("signed_b = %0d (işaretli)", signed_b);
    $display("u_byte   = %0d (işaretsiz)", u_byte);
  end
endmodule`,
        },
      },
      {
        title: "3. İşaret Genişletme (Sign Extension) ve Taşma",
        content:
          "`byte` tipi varsayılan olarak signed olduğu için, en anlamlı bit (MSB) 1 olduğunda SystemVerilog bunu negatif sayı kabul eder ve 32-bit `int` içine atanırken işaret bitini genişletir (sign extend). İşaretsiz baytlar için her zaman `byte unsigned` kullanılmalıdır.",
      },
    ],
    playground: {
      title: "2-Durumlu Tipler ve İşaretli Aritmetik Simülatörü",
      initialCode: `module tb_2state;
  byte signed_val = -5;
  byte unsigned unsigned_val = 250;
  bit [3:0] nibble = 4'b1111; // 15
  int result;

  initial begin
    $display("[START] 2-Durumlu Veri Tipleri Testi");
    $display("signed_val   = %0d (hex: 0x%0h)", signed_val, signed_val);
    $display("unsigned_val = %0d (hex: 0x%0h)", unsigned_val, unsigned_val);
    $display("nibble       = %0d (4-bit bit tipi)", nibble);

    // Taşma testi (Overflow):
    unsigned_val = unsigned_val + 10;
    $display("250 + 10 mod 256 = %0d (8-bit taşma gerçekleşti)", unsigned_val);
    $display("[FINISH] Test başarıyla tamamlandı.");
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_2state.sv...",
        "[START] 2-Durumlu Veri Tipleri Testi",
        "signed_val   = -5 (hex: 0xfb)",
        "unsigned_val = 250 (hex: 0xfa)",
        "nibble       = 15 (4-bit bit tipi)",
        "250 + 10 mod 256 = 4 (8-bit taşma gerçekleşti)",
        "[FINISH] Test başarıyla tamamlandı.",
      ],
      notes: "Değişken değerlerini değiştirip işaretli ve taşma davranışlarını inceleyin.",
    },
    quiz: {
      question:
        "SystemVerilog'da 'byte' tipinin varsayılan işaret durumu ve alabileceği değer aralığı nedir?",
      options: [
        "A) İşaretsizdir, 0 ile 255 arası değer alır.",
        "B) İşaretlidir (signed), -128 ile +127 arası değer alır.",
        "C) 4-durumludur, X ve Z alabilir.",
        "D) 16-bit genişliğindedir.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! SystemVerilog'da `byte` tipi tıpkı Java ve C'de olduğu gibi 8-bit genişliğinde ve varsayılan olarak işaretlidir (signed). -128 ile +127 arasında değer alır.",
    },
  },

  strings: {
    id: "strings",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "5 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Dizgiler (Strings) ve Formatlama",
    subtitle:
      "Dinamik metin manipülasyonu, yerleşik dizi metodları ve $sformatf ile biçimlendirme.",
    sections: [
      {
        title: "1. Dinamik string Tipi",
        content:
          "Verilog'da metinler sabit boyutlu `reg [8*N-1:0]` vektörlerinde saklanırdı; bu da metin uzadığında kesilmelere veya gereksiz boşluklara yol açardı.\n\nSystemVerilog, dinamik olarak boyutu değişen ve bellek yönetimi otomatik yapılan **`string`** tipini sunar. `string` tipi boşlukla sonlanan (null-terminated) karakter dizisidir ve C++ `std::string` yapısına benzer.",
      },
      {
        title: "2. string Metodları ve $sformatf",
        content:
          "SystemVerilog string nesneleri zengin yerleşik fonksiyonlara sahiptir:\n- `str.len()`: Karakter sayısını döndürür.\n- `str.putc(i, c)`: i. indisteki karakteri değiştirir.\n- `str.getc(i)`: i. indisteki karakterin ASCII kodunu döndürür.\n- `str.toupper()` / `str.tolower()`: Büyük/küçük harfe çevirir.\n- `str.substr(start, end)`: Alt metin dilimi çıkarır.\n- `$sformatf(format, ...)`: Metni konsola basmadan bir string değişkene biçimlendirerek yazar.",
        code: {
          language: "systemverilog",
          caption: "String Metodları Örneği",
          snippet: `string protocol = "Ethernet";
string msg;
int packet_id = 42;

initial begin
  msg = $sformatf("[%s] Paket #%0d başarıyla iletildi.", protocol, packet_id);
  $display("%s", msg);
  $display("Uzunluk: %0d karakter", msg.len());
  $display("Büyük Harf: %s", protocol.toupper());
end`,
        },
      },
    ],
    playground: {
      title: "Metin Formatlama ve Manipülasyon Simülatörü",
      initialCode: `module tb_strings;
  string prefix = "SOC_TEST";
  string status = "PASSED";
  string report;

  initial begin
    report = {prefix, "_", status}; // Birleştirme (concatenation)
    $display("Rapor Kodu: %s", report);
    $display("Karakter Sayısı: %0d", report.len());
    $display("Küçük Harf: %s", report.tolower());
    $display("Alt Dizi (0..7): %s", report.substr(0, 7));
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_strings.sv...",
        "Rapor Kodu: SOC_TEST_PASSED",
        "Karakter Sayısı: 15",
        "Küçük Harf: soc_test_passed",
        "Alt Dizi (0..7): SOC_TEST",
        "[SUCCESS] String simülasyonu tamamlandı.",
      ],
      notes: "Prefix ve status metinlerini değiştirip simülasyonu tekrar çalıştırın.",
    },
    quiz: {
      question: "SystemVerilog'da konsola basmadan bir metni değişkene formatlayarak atamak için hangi fonksiyon kullanılır?",
      options: [
        "A) $display",
        "B) $sformatf",
        "C) $monitor",
        "D) $write",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! `$sformatf`, C dilindeki `sprintf` gibi çalışır ve biçimlendirilmiş metni bir `string` değer olarak döndürür.",
    },
  },

  enums: {
    id: "enums",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Numaralandırılmış Tipler (enum) & FSM",
    subtitle:
      "Tip güvenli sonlu durum makineleri (FSM), otomatik numaralandırma ve yerleşik enum metodları.",
    sections: [
      {
        title: "1. enum Neden Zorunludur?",
        content:
          "Klasik Verilog'da durum makineleri (FSM) `parameter IDLE = 2'b00, READ = 2'b01;` şeklinde tanımlanırdı. Bu yöntemde yanlışlıkla 2'b11 gibi geçersiz bir duruma atama yapıldığında derleyici hiçbir hata vermezdi.\n\nSystemVerilog'un **`enum` (enumeration)** yapısı tip güvenlidir (type-safe). Bir enum değişkenine yalnızca tanımlanmış durum etiketleri atanabilir.",
        callout: {
          type: "tip",
          title: "FSM Tasarımında Altın Standart",
          message:
            "Sentez araçları (Synopsys Design Compiler, Vivado), enum tanımlarını otomatik tespit ederek one-hot, gray veya binary durum kodlamasını (state encoding) en optimum şekilde optimize eder.",
        },
      },
      {
        title: "2. enum Tanımlama ve Taban Veri Tipi",
        content:
          "Varsayılan olarak enum değerleri 32-bit `int` tipindedir ve 0'dan başlayarak birer birer artar. Donanım tasarımında register boyutunu kısmak için taban tip açıkça belirtilir:\n\n```systemverilog\ntypedef enum logic [1:0] {\n  IDLE  = 2'b00,\n  READ  = 2'b01,\n  WRITE = 2'b10,\n  ERROR = 2'b11\n} state_t;\n```",
        code: {
          language: "systemverilog",
          caption: "Enum Yerleşik Fonksiyonları",
          snippet: `state_t current_state = IDLE;

initial begin
  $display("Mevcut: %s (Değer: %0d)", current_state.name(), current_state);
  current_state = current_state.next(); // Sonraki duruma geç
  $display("Sonraki: %s", current_state.name());
  $display("Toplam Durum Sayısı: %0d", current_state.num());
end`,
        },
      },
    ],
    playground: {
      title: "FSM Durum Geçiş Simülatörü",
      initialCode: `module tb_fsm_enum;
  typedef enum logic [1:0] {
    ST_IDLE  = 2'b00,
    ST_FETCH = 2'b01,
    ST_EXEC  = 2'b10,
    ST_WRITE = 2'b11
  } cpu_state_e;

  cpu_state_e state = ST_IDLE;

  initial begin
    $display("[START] FSM Döngü Başlangıcı: %s", state.name());
    repeat (3) begin
      #10 state = state.next();
      $display("[@%0tns] Yeni Durum: %s (Değer: %b)", $time, state.name(), state);
    end
    $display("[FINISH] FSM çevrimi başarıyla bitti.");
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_fsm_enum.sv...",
        "[START] FSM Döngü Başlangıcı: ST_IDLE",
        "[@10ns] Yeni Durum: ST_FETCH (Değer: 01)",
        "[@20ns] Yeni Durum: ST_EXEC (Değer: 10)",
        "[@30ns] Yeni Durum: ST_WRITE (Değer: 11)",
        "[FINISH] FSM çevrimi başarıyla bitti.",
      ],
      notes: "state.next() ve state.prev() fonksiyonlarını deneyerek geçişleri gözlemleyin.",
    },
    quiz: {
      question: "Bir enum değişkeninin dize (metin) adını ekrana yazdırmak için hangi metod çağrılır?",
      options: [
        "A) state.string()",
        "B) state.name()",
        "C) state.to_text()",
        "D) state.label()",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `state.name()` metodu enum değişkeninin sayısal karşılığını değil, tanımlandığı sembolik adını (örn. 'ST_IDLE') string olarak döndürür.",
    },
  },

  "struct-union": {
    id: "struct-union",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Yapılar (struct) ve Birlikler (union)",
    subtitle:
      "Paketlenmiş (packed) ve paketlenmemiş veri paketleme mimarileri ve donanım kontrol register modelleri.",
    sections: [
      {
        title: "1. Paketlenmiş (Packed) Yapılar",
        content:
          "SystemVerilog'da `struct` farklı tiplerdeki verileri tek çatı altında toplar. Donanım tasarımında en kritik ayrım **`packed`** anahtar kelimesidir.\n\n`typedef struct packed` dendiğinde tüm alanlar bellekte kesintisiz tek bir bit vektörü olarak ardışık saklanır. Bu sayede tüm struct tek bir sinyal kablosu gibi atanabilir, aritmetik işleme girebilir veya bit dilimleme ile okunabilir.",
        code: {
          language: "systemverilog",
          caption: "Packed AXI Header Yapısı",
          snippet: `typedef struct packed {
  logic [3:0]  id;      // 4 bit
  logic [31:0] addr;    // 32 bit
  logic [1:0]  burst;   // 2 bit
  logic [7:0]  len;     // 8 bit
} axi_header_t; // Toplam 46 bit kesintisiz vektör!`,
        },
      },
      {
        title: "2. union (Birlikler)",
        content:
          "Bir `union`, birden fazla alanın bellekte AYNI alanı paylaşmasını sağlar. Özellikle bir donanım register'ına hem 32-bit tamsayı olarak hem de 4 ayrı 8-bitlik bayt olarak erişmek gerektiğinde `packed union` mükemmel çözümdür.",
      },
    ],
    playground: {
      title: "Packed Struct Bit Dilimleme Simülatörü",
      initialCode: `module tb_struct;
  typedef struct packed {
    logic [7:0] opcode;
    logic [3:0] src_reg;
    logic [3:0] dst_reg;
  } instr_t;

  instr_t my_instr;

  initial begin
    my_instr.opcode  = 8'hA1;
    my_instr.src_reg = 4'h2;
    my_instr.dst_reg = 4'h5;

    $display("[START] Struct Boyutu: %0d bit", $bits(my_instr));
    $display("Tüm Vektör (Hex): 0x%0h", my_instr);
    $display("Opcode: 0x%0h | Src: R%0d | Dst: R%0d", 
             my_instr.opcode, my_instr.src_reg, my_instr.dst_reg);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_struct.sv...",
        "[START] Struct Boyutu: 16 bit",
        "Tüm Vektör (Hex): 0xa125",
        "Opcode: 0xa1 | Src: R2 | Dst: R5",
      ],
      notes: "my_instr değerlerini değiştirip tüm 16-bitlik vektörün hex çıktısını inceleyin.",
    },
    quiz: {
      question: "SystemVerilog'da 'struct packed' olarak tanımlanan bir yapının en belirgin özelliği nedir?",
      options: [
        "A) Bellekte dağınık tutulur ve bit düzeyinde işlem yapılamaz.",
        "B) Alanları bellekte kesintisiz tek bir bit vektörü olarak sıralanır ve donanım register'ı gibi sürülebilir.",
        "C) Yalnızca simülasyonda kullanılır, sentezlenemez.",
        "D) Boyutu çalışma anında dinamik değişir.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! `packed struct`, tüm üyelerini kesintisiz bir bit vektörü olarak birleştirir; `$bits()` ile toplam genişliği hesaplanabilir ve doğrudan donanım portlarına bağlanabilir.",
    },
  },

  "typedef-alias": {
    id: "typedef-alias",
    badge: "Modül 2 • Veri Tipleri",
    readingTime: "4 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Özel Tipler: typedef ve alias",
    subtitle:
      "Okunabilir tip takma adları oluşturma ve çift yönlü sinyal bağlama mekanizmaları.",
    sections: [
      {
        title: "1. typedef ile Kod Temizliği",
        content:
          "`typedef` anahtar kelimesi, karmaşık tip tanımlamalarına (`logic [31:0]`, `bit [63:0]`) anlamlı isimler vererek projenin tamamında tip tutarlılığı sağlar.\n\n```systemverilog\ntypedef logic [31:0] word_t;\ntypedef logic [63:0] dword_t;\ntypedef logic [7:0]  byte_t;\n\nword_t instruction_reg;\ndword_t memory_address;\n```",
      },
      {
        title: "2. alias ile Çift Yönlü İsimlendirme",
        content:
          "`alias` deyimi, iki veya daha fazla sinyali birbirine ayna gibi bağlar. Birinde olan değişim anında diğerine yansır (bidirectional net aliasing). `assign a = b;` ifadesinden farkı iki yönlü olmasıdır.",
      },
    ],
    playground: {
      title: "typedef Kullanımı",
      initialCode: `module tb_typedef;
  typedef logic [15:0] port_addr_t;
  port_addr_t uart_rx = 16'h3F8;
  port_addr_t uart_tx = 16'h3F9;

  initial begin
    $display("UART RX Port Adresi: 0x%0h (%0d bit)", uart_rx, $bits(port_addr_t));
    $display("UART TX Port Adresi: 0x%0h", uart_tx);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_typedef.sv...",
        "UART RX Port Adresi: 0x3f8 (16 bit)",
        "UART TX Port Adresi: 0x3f9",
      ],
      notes: "typedef ile özel veri genişlikleri tanımlayarak kodun modülerliğini test edin.",
    },
    quiz: {
      question: "SystemVerilog'da 'typedef' kullanımının temel amacı nedir?",
      options: [
        "A) Simülasyonu hızlandırmak",
        "B) Veri tiplerine özel ve okunabilir takma isimler vererek kod tekrarını ve hataları önlemek",
        "C) Sadece testbench'te sınıf tanımlamak",
        "D) Değişkenleri belleğe kilitlemek",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `typedef`, projedeki veri genişliklerini ve karmaşık tipleri tek bir noktadan yönetilebilir kılar.",
    },
  },

  // ==========================================
  // MODÜL 3: DİZİLER (ARRAYS)
  // ==========================================
  "packed-unpacked-arrays": {
    id: "packed-unpacked-arrays",
    badge: "Modül 3 • Diziler & Koleksiyonlar",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Paketlenmiş (Packed) vs Paketlenmemiş Diziler",
    subtitle:
      "Bellek yerleşimi, çok boyutlu diziler ve donanım register modelleri arasındaki temel farklar.",
    sections: [
      {
        title: "1. Packed Dizi (Vektör)",
        content:
          "İsimden **önce** boyut tanımlanırsa (`logic [3:0][7:0] data;`), bu bir **packed** dizidir. Bellekte ardışık 32 bitlik tek bir vektör olarak yer alır. Sentezlenebilir ve aritmetik operatörlerle doğrudan işlenebilir.",
      },
      {
        title: "2. Unpacked Dizi (Bellek Bloğu)",
        content:
          "İsimden **sonra** boyut tanımlanırsa (`logic [7:0] mem [0:255];`), bu bir **unpacked** dizidir. Bellekte her eleman ayrı ayrı tutulur (RAM/ROM modelleri). Bütün dizi tek bir işlemle aritmetik işleme sokulamaz.",
      },
    ],
    playground: {
      title: "Packed ve Unpacked Dizi Simülasyonu",
      initialCode: `module tb_arrays;
  logic [3:0][7:0] packed_reg;     // 4 baytlık tek vektör (32 bit)
  logic [7:0]      unpacked_mem[4];// 4 elemanlı RAM

  initial begin
    packed_reg = 32'hDEADBEEF;
    $display("Packed Vektör: 0x%0h (Genişlik: %0d bit)", packed_reg, $bits(packed_reg));
    $display("Packed[0] (En sağ bayt): 0x%0h", packed_reg[0]);
    $display("Packed[3] (En sol bayt): 0x%0h", packed_reg[3]);

    unpacked_mem[0] = 8'h11;
    unpacked_mem[1] = 8'h22;
    $display("Unpacked RAM[1]: 0x%0h", unpacked_mem[1]);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_arrays.sv...",
        "Packed Vektör: 0xdeadbeef (Genişlik: 32 bit)",
        "Packed[0] (En sağ bayt): 0xef",
        "Packed[3] (En sol bayt): 0xde",
        "Unpacked RAM[1]: 0x22",
      ],
      notes: "Packed dizilerde indislemenin sağdan sola veya soldan sağa nasıl çalıştığını inceleyin.",
    },
    quiz: {
      question: "'logic [3:0][7:0] p_data;' tanımı için hangisi doğrudur?",
      options: [
        "A) Unpacked dizidir, 32 ayrı bellek hücresi vardır.",
        "B) Packed dizidir, bellekte kesintisiz 32 bitlik tek bir vektördür.",
        "C) Dinamik dizidir, boyutu new[] ile atanmalıdır.",
        "D) Sentezlenemez.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Boyutlar değişken isminden önce yazıldığında (`[3:0][7:0]`), SystemVerilog bunu 32-bitlik kesintisiz bir 'packed' vektör olarak ele alır.",
    },
  },

  "dynamic-arrays": {
    id: "dynamic-arrays",
    badge: "Modül 3 • Diziler & Koleksiyonlar",
    readingTime: "6 dk okuma",
    level: "Orta Seviye",
    title: "Dinamik Diziler (Dynamic Arrays)",
    subtitle:
      "Çalışma anında boyutlandırılabilir bellek ve testbench veri paket havuzları.",
    sections: [
      {
        title: "1. Dinamik Dizi Nedir?",
        content:
          "Sabit boyutlu diziler derleme anında boyutu bilinmek zorundadır. Ancak testbench yazarken ağ üzerinden 64 baytlık mı yoksa 1500 baytlık mı paket geleceğini önceden bilemeyiz.\n\n**Dinamik Diziler (`type name[]`)**, köşeli parantez içi boş bırakılarak tanımlanır ve simülasyon esnasında `new[N]` ile istenen boyutta tahsis edilir.",
        code: {
          language: "systemverilog",
          caption: "Dinamik Dizi Metodları",
          snippet: `int d_arr[]; // Boş dinamik dizi

initial begin
  d_arr = new[5]; // 5 eleman tahsis et
  d_arr = '{10, 20, 30, 40, 50};
  $display("Boyut: %0d", d_arr.size());

  // Eski verileri koruyarak boyutu 8'e genişlet:
  d_arr = new[8](d_arr);
  d_arr[5] = 60;

  // Belleği boşalt:
  d_arr.delete();
end`,
        },
      },
    ],
    playground: {
      title: "Dinamik Dizi Boyutlandırma Testi",
      initialCode: `module tb_dyn_array;
  int packet[];

  initial begin
    $display("[START] Başlangıç boyutu: %0d", packet.size());
    packet = new[4];
    for (int i = 0; i < packet.size(); i++) begin
      packet[i] = (i + 1) * 100;
    end

    $display("Tahsis sonrası boyut: %0d", packet.size());
    foreach (packet[i]) begin
      $display("packet[%0d] = %0d", i, packet[i]);
    end

    packet.delete();
    $display("delete() sonrası boyut: %0d", packet.size());
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_dyn_array.sv...",
        "[START] Başlangıç boyutu: 0",
        "Tahsis sonrası boyut: 4",
        "packet[0] = 100",
        "packet[1] = 200",
        "packet[2] = 300",
        "packet[3] = 400",
        "delete() sonrası boyut: 0",
      ],
      notes: "packet = new[10](packet) yaparak dizi genişletmeyi deneyin.",
    },
    quiz: {
      question: "Dinamik dizinin eleman sayısını öğrenmek için hangi metod kullanılır?",
      options: [
        "A) d_arr.len()",
        "B) d_arr.size()",
        "C) d_arr.count()",
        "D) $length(d_arr)",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! SystemVerilog dinamik dizilerinde boyut `d_arr.size()` metodu ile alınır (`.len()` string tiplerine aittir).",
    },
  },

  queues: {
    id: "queues",
    badge: "Modül 3 • Diziler & Koleksiyonlar",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Kuyruklar (Queues): push, pop ve Arama",
    subtitle:
      "FIFO modelleme, paket tamponları ve O(1) erişim hızı sunan [$] kuyruk mekanizması.",
    sections: [
      {
        title: "1. SystemVerilog Kuyrukları ([$])",
        content:
          "Kuyruklar, dinamik dizilere benzer ancak iki uca (baş ve son) eleman ekleme ve çıkarma işlemlerinde son derece hızlıdır. Tanımlanırken köşeli parantez içine dolar işareti konur: `int q[$];`.\n\nKuyruklar için `new[]` çağırmaya gerek yoktur; eleman eklendikçe otomatik büyür.",
      },
      {
        title: "2. Kuyruk Metodları",
        content:
          "- `q.push_back(item)`: Kuyruğun sonuna ekler (FIFO kuyruğa alma).\n- `q.pop_front()`: Kuyruğun başından çıkarır ve değeri döndürür.\n- `q.push_front(item)`: Başa öncelikli eleman ekler.\n- `q.pop_back()`: Sondan eleman çıkarır (LIFO/Yığın).\n- `q.insert(index, item)`: İstenen araya eleman sokar.\n- `q.delete(index)`: İstenen indisteki elemanı siler.",
        code: {
          language: "systemverilog",
          caption: "FIFO Kuyruk İşlemleri",
          snippet: `int fifo[$];

initial begin
  fifo.push_back(10);
  fifo.push_back(20);
  fifo.push_back(30);

  $display("İlk eleman: %0d", fifo.pop_front()); // 10 çıkar
  $display("Kalan boyut: %0d", fifo.size());     // 2 kalır
end`,
        },
      },
    ],
    playground: {
      title: "FIFO Kuyruk Simülasyonu",
      initialCode: `module tb_queue;
  string tx_queue[$];

  initial begin
    $display("[START] Kuyruk Başlatıldı");
    tx_queue.push_back("PAKET_A");
    tx_queue.push_back("PAKET_B");
    tx_queue.push_back("PAKET_C");

    $display("Kuyruk Boyutu: %0d", tx_queue.size());

    // FIFO Tüketimi:
    while (tx_queue.size() > 0) begin
      string pkt = tx_queue.pop_front();
      $display("İletilen Paket: %s (Kalan: %0d)", pkt, tx_queue.size());
    end
    $display("[FINISH] Tüm kuyruk boşaltıldı.");
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_queue.sv...",
        "[START] Kuyruk Başlatıldı",
        "Kuyruk Boyutu: 3",
        "İletilen Paket: PAKET_A (Kalan: 2)",
        "İletilen Paket: PAKET_B (Kalan: 1)",
        "İletilen Paket: PAKET_C (Kalan: 0)",
        "[FINISH] Tüm kuyruk boşaltıldı.",
      ],
      notes: "push_front kullanarak acil öncelikli paket eklemeyi deneyin.",
    },
    quiz: {
      question: "Bir SystemVerilog kuyruğuna FIFO (ilk giren ilk çıkar) mantığıyla eleman eklemek ve çekmek için hangi metod çifti kullanılır?",
      options: [
        "A) push_back() ve pop_front()",
        "B) push_front() ve pop_front()",
        "C) insert() ve delete()",
        "D) enqueue() ve dequeue()",
      ],
      correctIndex: 0,
      explanation:
        "Doğru! FIFO mantığında yeni eleman kuyruğun arkasına (`push_back`) eklenir ve en eski eleman kuyruğun önünden (`pop_front`) çekilir.",
    },
  },

  "associative-arrays": {
    id: "associative-arrays",
    badge: "Modül 3 • Diziler & Koleksiyonlar",
    readingTime: "6 dk okuma",
    level: "İleri Seviye",
    title: "İlişkisel Diziler (Associative Arrays)",
    subtitle:
      "Büyük seyrek bellek (sparse memory) modelleri ve anahtar-değer (key-value) haritaları.",
    sections: [
      {
        title: "1. Seyrek Bellek (Sparse Memory) İhtiyacı",
        content:
          "64-bitlik bir işlemci adres uzayını (2^64 bayt) simüle etmek için normal bir dizi tanımlarsanız, bilgisayarınızın RAM'i saniyeler içinde tükenir.\n\n**İlişkisel Diziler (Associative Arrays)**, Python'daki sözlükler (dict) veya C++ `std::map` gibidir. Yalnızca veri YAZILAN adresler bellekte tahsis edilir.",
        code: {
          language: "systemverilog",
          caption: "Seyrek Bellek Tanımı",
          snippet: `int mem[longint];     // 64-bit adres anahtarlı ilişkisel bellek
int score[string];     // String anahtarlı harita

initial begin
  mem[64'h1000_0000] = 32'hAAAA_BBBB;
  mem[64'hFFFF_0000] = 32'h1234_5678;
  // Yalnızca 2 adet hücre bellekte yer kaplar!
end`,
        },
      },
      {
        title: "2. İlişkisel Dizi Metodları",
        content:
          "- `arr.exists(key)`: Anahtarın var olup olmadığını kontrol eder (1 veya 0).\n- `arr.first(key)`: İlk anahtarı değişkene atar.\n- `arr.next(key)`: Bir sonraki anahtara geçer.\n- `arr.delete(key)`: Verilen anahtarı siler.",
      },
    ],
    playground: {
      title: "Seyrek Bellek ve exists() Kontrolü",
      initialCode: `module tb_assoc;
  bit [31:0] memory[int]; // 32-bit adres -> 32-bit veri
  int addr;

  initial begin
    memory[32'h0000_1000] = 32'hCAFE_BABE;
    memory[32'hFFFF_FFFC] = 32'hDEAD_BEEF;

    $display("Toplam Yazılan Hücre Sayısı: %0d", memory.num());

    if (memory.exists(32'h0000_1000)) begin
      $display("0x1000 Adresinde Veri Var: 0x%0h", memory[32'h0000_1000]);
    end

    if (!memory.exists(32'h0000_2000)) begin
      $display("0x2000 Adresi Bellekte Yok (Seyrek Mimari Doğrulandı).");
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_assoc.sv...",
        "Toplam Yazılan Hücre Sayısı: 2",
        "0x1000 Adresinde Veri Var: 0xcafebabe",
        "0x2000 Adresi Bellekte Yok (Seyrek Mimari Doğrulandı).",
      ],
      notes: "memory.first(addr) ve memory.next(addr) ile tüm bellek üzerinde gezinmeyi deneyin.",
    },
    quiz: {
      question: "İlişkisel bir dizide belirli bir anahtarın (adresin) mevcut olup olmadığını kontrol etmek için hangi fonksiyon kullanılır?",
      options: [
        "A) mem.has_key(k)",
        "B) mem.exists(k)",
        "C) mem.contains(k)",
        "D) mem.find(k)",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `mem.exists(key)` fonksiyonu, verilen anahtar ilişkisel dizide tanımlıysa 1, değilse 0 döndürür.",
    },
  },

  "array-methods": {
    id: "array-methods",
    badge: "Modül 3 • Diziler & Koleksiyonlar",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Dizi Manipülasyon Metodları",
    subtitle:
      "find(), sort(), unique(), sum() ve lamba tarzı koşullu arama filtreleri.",
    sections: [
      {
        title: "1. Arama ve Filtreleme Metodları",
        content:
          "SystemVerilog diziler üzerinde döngü yazmadan hızlı sorgulamalar yapabilen yerleşik arama metodları sunar. `with` ifadesi içinde `item` anahtar kelimesi geçerli dizi elemanını temsil eder:\n\n- `arr.find(item) with (item > 50)`: 50'den büyük tüm elemanları içeren yeni kuyruk döner.\n- `arr.find_index(item) with (item == val)`: Şartı sağlayan indisleri döner.\n- `arr.min()` / `arr.max()`: En küçük ve en büyük elemanı döner.\n- `arr.unique()`: Tekrarlayan elemanları ayıklar.",
      },
      {
        title: "2. Sıralama ve İndirgeme Metodları",
        content:
          "- `arr.sort()`: Küçükten büyüğe sıralar.\n- `arr.rsort()`: Büyükten küçüğe sıralar.\n- `arr.shuffle()`: Elemanları rastgele karıştırır.\n- `arr.sum()`: Tüm elemanların toplamını döner (DİKKAT: Taşmayı önlemek için `arr.sum() with (int'(item))` şeklinde cast edilmelidir!).",
      },
    ],
    playground: {
      title: "Dizi Arama ve Sıralama Simülasyonu",
      initialCode: `module tb_arr_methods;
  int scores[$] = '{85, 42, 95, 60, 42, 100, 73};
  int passed[$];
  int unique_scores[$];

  initial begin
    $display("Orijinal Liste: %p", scores);

    passed = scores.find(x) with (x >= 70);
    $display("70 ve Üzeri Alanlar: %p", passed);

    unique_scores = scores.unique();
    $display("Tekil Notlar: %p", unique_scores);

    scores.sort();
    $display("Sıralı Notlar: %p", scores);
    $display("En Düşük: %0d | En Yüksek: %0d", scores.min()[0], scores.max()[0]);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_arr_methods.sv...",
        "Orijinal Liste: '{85, 42, 95, 60, 42, 100, 73}",
        "70 ve Üzeri Alanlar: '{85, 95, 100, 73}",
        "Tekil Notlar: '{85, 42, 95, 60, 100, 73}",
        "Sıralı Notlar: '{42, 42, 60, 73, 85, 95, 100}",
        "En Düşük: 42 | En Yüksek: 100",
      ],
      notes: "scores.shuffle() metodunu çağırıp listeyi karıştırmayı test edin.",
    },
    quiz: {
      question: "SystemVerilog dizi arama metodlarında geçerli elemanı temsil etmek için varsayılan olarak hangi anahtar kelime kullanılır?",
      options: [
        "A) self",
        "B) it",
        "C) item",
        "D) element",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! `with (item > 50)` ifadesinde `item` özel anahtar kelimesi o anda filtrelenen dizi elemanını temsil eder.",
    },
  },

  // ==========================================
  // MODÜL 4: AKIŞ KONTROLÜ (CONTROL FLOW)
  // ==========================================
  "always-blocks": {
    id: "always-blocks",
    badge: "Modül 4 • Akış Kontrolü & Sentezlenebilir RTL",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "always_comb, always_ff ve always_latch",
    subtitle:
      "İstenmeyen latch oluşumunu derleme anında engelleyen ve sentez niyetini netleştiren modern RTL blokları.",
    sections: [
      {
        title: "1. Klasik always @* Sorunu",
        content:
          "Verilog'daki `always @(*)` bloğu kombinasyonel mantık yazarken tasarımcının bir `else` dalını unutması durumunda otomatik olarak devreye bir **latch (seviye tetiklemeli kilit)** eklerdi. Çoğu ASIC/FPGA tasarımında istenmeyen latch'ler zamanlama kapanışını (timing closure) mahveder.\n\nSystemVerilog bu sorunu çözmek için donanım amacına özel 3 ayrı blok getirdi.",
      },
      {
        title: "2. Modern RTL Blokları",
        content:
          "- **`always_comb`**: Yalnızca kombinasyonel mantık içindir. Duyarlılık listesini otomatik kurar, sıfır-zaman döngülerini (zero-delay loop) engeller ve bir dal unutulup latch oluşursa sentez aracı derleme hatası fırlatır!\n- **`always_ff @(posedge clk or negedge rst_n)`**: Yalnızca flip-flop (ardışıl mantık) için. İçinde engellenemeyen atama (`<=`) kullanılmalıdır.\n- **`always_latch`**: Tasarımcı BİLEREK ve İSTEYEREK latch tasarlamak istediğinde kullanılır.",
        code: {
          language: "systemverilog",
          caption: "always_comb ve always_ff Örneği",
          snippet: `// Kombinasyonel Mux
always_comb begin
  if (sel)
    out = b;
  else
    out = a; // Tüm dallar kapalı, asla latch olmaz!
end

// Ardışıl Register (Flip-Flop)
always_ff @(posedge clk or negedge rst_n) begin
  if (!rst_n)
    q <= 1'b0;
  else
    q <= d;
end`,
        },
      },
    ],
    playground: {
      title: "always_comb ile Kombinasyonel ALU",
      initialCode: `module alu_comb (
  input  logic [3:0] a, b,
  input  logic [1:0] op,
  output logic [3:0] result
);
  always_comb begin
    case (op)
      2'b00: result = a + b;
      2'b01: result = a - b;
      2'b10: result = a & b;
      default: result = a ^ b; // Eksik dal yok!
    endcase
  end
endmodule

module tb;
  logic [3:0] a = 5, b = 3, res;
  logic [1:0] op;

  alu_comb dut (.a(a), .b(b), .op(op), .result(res));

  initial begin
    op = 2'b00; #5; $display("TOPLA: 5 + 3 = %0d", res);
    op = 2'b01; #5; $display("ÇIKAR: 5 - 3 = %0d", res);
    op = 2'b10; #5; $display("AND:   5 & 3 = %0d", res);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling alu_comb.sv...",
        "TOPLA: 5 + 3 = 8",
        "ÇIKAR: 5 - 3 = 2",
        "AND:   5 & 3 = 1",
      ],
      notes: "always_comb bloğu sayesinde simülasyon zamanı 0'da bile sinyaller anında hesaplanır.",
    },
    quiz: {
      question: "always_comb bloğu içinde bir 'else' dalı unutulup çıkış atanmazsa simülatör ve sentez aracı nasıl davranır?",
      options: [
        "A) Sessizce bir latch oluşturur ve devam eder.",
        "B) Sentez ve simülasyon aracı uyarı veya derleme hatası fırlatarak latch oluşumunu engeller.",
        "C) Flip-flop üretir.",
        "D) Kodu yoksayar.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `always_comb` bloğunun ana amacı istenmeyen latch oluşumlarını tasarım aşamasında hata vererek engellemektir.",
    },
  },

  "unique-priority": {
    id: "unique-priority",
    badge: "Modül 4 • Akış Kontrolü & Sentezlenebilir RTL",
    readingTime: "6 dk okuma",
    level: "Orta Seviye",
    title: "unique ve priority (if-else & case)",
    subtitle:
      "Eksik dalları yakalama, paralel donanım kodlayıcıları ve güvenli dallanma kuralları.",
    sections: [
      {
        title: "1. unique ve priority Neden Var?",
        content:
          "Verilog'da `case` ifadeleri varsayılan olarak öncelikli kodlayıcı (priority encoder) olarak sentezlenebilir, bu da fazladan gecikme (delay) yaratır. Tasarımcılar ise genellikle tüm durumların ayrık (mutually exclusive) olduğunu ve paralel bir çoklayıcı (parallel multiplexer) üretilmesini ister.\n\nSystemVerilog bu niyeti bildirmek için `unique` ve `priority` anahtar kelimelerini sunar.",
      },
      {
        title: "2. Çalışma Kuralları",
        content:
          "- **`unique if / case`**:\n  1. Koşullardan en fazla BİRİ doğru olabilir (çakışma olursa simülatör hata verir).\n  2. Koşullardan EN AZ BİRİ doğru olmalıdır (hiçbiri sağlanmazsa ve default yoksa hata verir).\n  *Sentez aracı bunu paralel donanıma dönüştürür.*\n\n- **`priority if / case`**:\n  1. Koşullardan en az biri doğru olmalıdır.\n  2. Dalların yazılış sırası önemlidir (öncelikli donanım zinciri kurulur).",
      },
    ],
    playground: {
      title: "unique case Simülasyonu",
      initialCode: `module tb_unique;
  logic [1:0] code = 2'b01;
  string desc;

  always_comb begin
    unique case (code)
      2'b00: desc = "BEKLEME";
      2'b01: desc = "OKUMA";
      2'b10: desc = "YAZMA";
      2'b11: desc = "SIFIRLA";
    endcase
  end

  initial begin
    #1; $display("code = %b => Durum: %s", code, desc);
    code = 2'b10;
    #1; $display("code = %b => Durum: %s", code, desc);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_unique.sv...",
        "code = 01 => Durum: OKUMA",
        "code = 10 => Durum: YAZMA",
      ],
      notes: "Tüm durumlar (00, 01, 10, 11) kapsandığı için unique case paralel donanım üretir.",
    },
    quiz: {
      question: "SystemVerilog'da 'unique case' kullanıldığında simülasyon anında birden fazla koşul aynı anda doğru çıkarsa ne olur?",
      options: [
        "A) İlk koşul çalışır ve hiçbir uyarı verilmez.",
        "B) Simülatör çakışma (overlap) çalışma-zamanı hatası/uyarısı fırlatır.",
        "C) Donanım kilitlenir.",
        "D) Rastgele bir dal seçilir.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! `unique` ifadesi tasarımcının 'bu koşulların sadece biri gerçekleşebilir' taahhüdüdür; birden fazla koşul sağlanırsa simülatör kural ihlali uyarısı üretir.",
    },
  },

  loops: {
    id: "loops",
    badge: "Modül 4 • Akış Kontrolü & Sentezlenebilir RTL",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Döngüler: for, foreach, repeat ve forever",
    subtitle:
      "Diziler üzerinde gezinme, foreach sözdizimi, testbench saat üreteçleri ve döngü kontrolleri.",
    sections: [
      {
        title: "1. Döngü Çeşitleri",
        content:
          "- **`for`**: C tarzı döngü. Döngü değişkeni doğrudan parantez içinde tanımlanabilir: `for (int i=0; i<10; i++)`.\n- **`foreach`**: SystemVerilog'a özel muazzam bir döngüdür. Dizinin veya kuyruğun boyutunu bilmeye gerek kalmadan tüm elemanları gezer: `foreach (arr[i])`.\n- **`repeat(N)`**: Belirtilen N defa bloğu çalıştırır (özellikle testbench'te saat darbesi beklerken çok kullanılır: `repeat(10) @(posedge clk);`).\n- **`forever`**: Sonsuz döngü (saat üreteçleri için: `forever #5 clk = ~clk;`).\n- **`break` ve `continue`**: C dilindeki gibi döngüyü sonlandırma ve bir sonraki adıma atlama.",
      },
    ],
    playground: {
      title: "foreach ve repeat Döngüleri",
      initialCode: `module tb_loops;
  int packet_sizes[$] = '{64, 128, 512, 1024, 1500};
  int clk_cycles = 0;

  initial begin
    $display("[START] foreach ile Paket Listesi:");
    foreach (packet_sizes[idx]) begin
      $display("Paket #[%0d] = %0d bayt", idx, packet_sizes[idx]);
    end

    $display("\\nrepeat(4) Testi:");
    repeat (4) begin
      clk_cycles++;
      $display("Saat Döngüsü: %0d", clk_cycles);
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_loops.sv...",
        "[START] foreach ile Paket Listesi:",
        "Paket #[0] = 64 bayt",
        "Paket #[1] = 128 bayt",
        "Paket #[2] = 512 bayt",
        "Paket #[3] = 1024 bayt",
        "Paket #[4] = 1500 bayt",
        "",
        "repeat(4) Testi:",
        "Saat Döngüsü: 1",
        "Saat Döngüsü: 2",
        "Saat Döngüsü: 3",
        "Saat Döngüsü: 4",
      ],
      notes: "Çok boyutlu dizilerde foreach (matris[r, c]) sözdizimini test edebilirsiniz.",
    },
    quiz: {
      question: "SystemVerilog'da bir dizinin sınırlarını ve boyutunu kontrol etmeden tüm elemanları üzerinde güvenle dolaşmak için hangi döngü tercih edilir?",
      options: [
        "A) while",
        "B) foreach",
        "C) forever",
        "D) do..while",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `foreach` döngüsü dizinin boyutunu otomatik olarak algılar ve 0'dan son indise kadar güvenle döner.",
    },
  },

  // ==========================================
  // MODÜL 5: ZAMANLAMA VE SCHEDULER
  // ==========================================
  "event-regions": {
    id: "event-regions",
    badge: "Modül 5 • Zamanlama Semantiği",
    readingTime: "9 dk okuma",
    level: "İleri Seviye",
    title: "SystemVerilog Zamanlama Bölgeleri (Stratified Queue)",
    subtitle:
      "Preponed, Active, Inactive, NBA, Observed, Reactive ve Postponed simülasyon adımları.",
    sections: [
      {
        title: "1. Olay Sıralayıcı (Stratified Event Scheduler)",
        content:
          "Donanım simülasyonları aslında tek bir işlemci çekirdeğinde çalışan yazılımlardır. Aynı saat darbesinde (`posedge clk`) değişen yüzlerce sinyalin hangi sırayla işleneceğini IEEE 1800 standardının **Olay Bölgeleri (Event Regions)** mimarisi belirler.\n\nSystemVerilog, tasarım kodu (RTL) ile testbench kodu arasında yarış durumlarını (race condition) ortadan kaldırmak için Verilog bölgelerine yeni bölgeler eklemiştir.",
      },
      {
        title: "2. Ana Bölgeler ve Görevleri",
        content:
          "Her simülasyon zaman adımında şu sıra takip edilir:\n\n1. **Preponed Bölgesi**: Zaman adımının başında sinyaller örneklenir (SVA assertion'lar sinyalleri buradan okur, yarış engellenir).\n2. **Active Bölgesi**: Bloklayan atamalar (`=`), continuous assign ifadeleri ve display görevleri yürütülür.\n3. **Inactive Bölgesi**: `#0` gecikmeli işlemler yürütülür (kullanılması önerilmez!).\n4. **NBA (Non-Blocking Assignment) Bölgesi**: Engellenemeyen atamaların (`<=`) sağ taraftaki hesaplanan değerleri sol tarafa aktarılır.\n5. **Observed Bölgesi**: Concurrent SVA assertion ifadeleri değerlendirilir.\n6. **Reactive Bölgesi**: Testbench kodları (`program` blokları) yürütülür.\n7. **Postponed Bölgesi**: `$strobe` ve `$monitor` çıktıları üretilir (tüm sinyaller durulduktan sonra).",
      },
    ],
    playground: {
      title: "Active ve NBA Bölgeleri Ayrımı",
      initialCode: `module tb_scheduler;
  int a = 0;
  int b = 0;

  initial begin
    // Blocking atama (Active bölgesinde anında işlenir)
    a = 10;
    $display("[Active] a = %0d", a);

    // Non-blocking atama (NBA bölgesinde güncellenir)
    b <= 20;
    $display("[Aynı Anda] b hemen 20 oldu mu? b = %0d (Eski değer okunur!)", b);

    #1;
    $display("[1ns Sonra] b şimdi güncellendi: b = %0d", b);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_scheduler.sv...",
        "[Active] a = 10",
        "[Aynı Anda] b hemen 20 oldu mu? b = 0 (Eski değer okunur!)",
        "[1ns Sonra] b şimdi güncellendi: b = 20",
      ],
      notes: "Non-blocking atamanın o satırda hemen geçerli olmadığını, NBA bölgesinde güncellendiğini görün.",
    },
    quiz: {
      question: "SystemVerilog eşzamanlı doğrulama ifadeleri (Concurrent Assertions - SVA), sinyal değerlerini yarış durumundan kaçınmak için hangi zamanlama bölgesinde örnekler?",
      options: [
        "A) Active Bölgesi",
        "B) Preponed Bölgesi",
        "C) Inactive Bölgesi",
        "D) Postponed Bölgesi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Concurrent assertion'lar sinyal değerlerini saat darbesinden hemen önce, sinyaller henüz değişmemişken 'Preponed' bölgesinde örnekler.",
    },
  },

  "delta-cycles-race": {
    id: "delta-cycles-race",
    badge: "Modül 5 • Zamanlama Semantiği",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "Delta Döngüleri & Yarış Durumları (Race Conditions)",
    subtitle:
      "Sıfır simülasyon zamanında olay sıralaması, non-blocking atamaların hayati rolü ve #0 gecikmesi.",
    sections: [
      {
        title: "1. Delta Döngüsü (Delta Cycle) Nedir?",
        content:
          "Simülasyonda zaman ilerlemeden (yani zaman sayacı örneğin 10ns'de sabitken) bileşenler arasında sinyal tetiklenmeleri meydana gelir. Zaman sayacının artmadığı bu ara hesaplama adımlarına **Delta Döngüsü (Delta Cycle)** denir.\n\nGerçek dünyada fiziksel yayılım gecikmesi varken, simülatörde bu gecikme delta döngüleriyle modellenir.",
      },
      {
        title: "2. Yarış Durumları ve Altın Kural",
        content:
          "Ardışıl devrelerde (`always_ff`) bloklayan atama (`=`) kullanırsanız, hangi flip-flop'un önce çalışacağı simülatörün keyfine kalır. Bu ölümcül bir **Yarış Durumudur (Race Condition)**.\n\n**ALTIN KURAL:**\n- Kombinasyonel mantıkta (`always_comb`): Bloklayan atama (`=`) kullanın.\n- Ardışıl mantıkta (`always_ff`): Engellenemeyen atama (`<=`) kullanın.\n- Testbench ile RTL iletişiminde `#0` gecikmesi asla kullanmayın!",
      },
    ],
    playground: {
      title: "Yarış Durumu Simülasyonu",
      initialCode: `module tb_race;
  logic clk = 0;
  logic q1 = 0, q2 = 0;

  always #5 clk = ~clk;

  // Non-blocking atama (YARIŞ YOK - Kaydıran Kaydedici / Shift Register)
  always_ff @(posedge clk) begin
    q1 <= 1'b1;
    q2 <= q1; // q1'in saat vurmadan önceki değerini alır!
  end

  initial begin
    #6;  $display("[Darbe 1] q1 = %b, q2 = %b (q2 henüz 0 kalmalı)", q1, q2);
    #10; $display("[Darbe 2] q1 = %b, q2 = %b (q2 şimdi 1 oldu)", q1, q2);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_race.sv...",
        "[Darbe 1] q1 = 1, q2 = 0 (q2 henüz 0 kalmalı)",
        "[Darbe 2] q1 = 1, q2 = 1 (q2 şimdi 1 oldu)",
      ],
      notes: "Non-blocking atama sayesinde shift register mükemmel çalışır.",
    },
    quiz: {
      question: "Ardışıl (saat tetiklemeli) mantık devrelerinde yarış durumunu (race condition) engellemek için hangi atama operatörü kullanılmalıdır?",
      options: [
        "A) Bloklayan atama (=)",
        "B) Engellenemeyen atama (<=)",
        "C) Sürekli atama (assign)",
        "D) Güçlendirilmiş atama (:=)",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! Ardışıl flip-flop devrelerinde her zaman engellenemeyen atama (`<=`) kullanılmalıdır.",
    },
  },

  // ==========================================
  // MODÜL 6: OOP (OBJECT ORIENTED PROGRAMMING)
  // ==========================================
  "classes-basics": {
    id: "classes-basics",
    badge: "Modül 6 • Nesne Yönelimli Programlama",
    readingTime: "9 dk okuma",
    level: "Orta Seviye",
    title: "Sınıflar (Classes), Nesneler ve new() Kurucusu",
    subtitle:
      "Donanım doğrulamada nesne yönelimli mimarinin temeli, referans handle kavramı ve bellek yönetimi.",
    sections: [
      {
        title: "1. Modül vs Sınıf (Module vs Class)",
        content:
          "SystemVerilog'da donanım blokları `module` ile tanımlanır ve statiktir (simülasyon başında yaratılır ve silinemez).\n\nDoğrulama ortamında ise her saniye binlerce veri paketi üretilip yok edilir. İşte bu dinamik nesneler için **`class` (Sınıf)** yapısı kullanılır. Sınıflar sentezlenemez; yalnızca simülasyonda çalışır.",
      },
      {
        title: "2. Handle ve Nesne (Handle vs Object)",
        content:
          "`Packet pkt;` yazıldığında henüz bir nesne oluşmaz; yalnızca belleği gösterebilecek boş bir referans (handle) yaratılır (`null`). Nesneyi bellekte oluşturmak için **`new()`** kurucu metodu (constructor) çağrılmalıdır:\n\n```systemverilog\npkt = new(); // Bellekte nesne tahsis edildi!\n```",
        code: {
          language: "systemverilog",
          caption: "İlk SystemVerilog Sınıfı",
          snippet: `class Packet;
  bit [31:0] addr;
  bit [31:0] data;

  function new(bit [31:0] a = 0, bit [31:0] d = 0);
    this.addr = a;
    this.data = d;
  endfunction

  function void print();
    $display("[Paket] Addr: 0x%0h | Data: 0x%0h", addr, data);
  endfunction
endclass`,
        },
      },
    ],
    playground: {
      title: "OOP Sınıf ve Nesne Simülasyonu",
      initialCode: `class Transaction;
  int id;
  string name;

  function new(int id, string name);
    this.id = id;
    this.name = name;
  endfunction

  function void display();
    $display("İşlem #[%0d]: %s", id, name);
  endfunction
endclass

module tb_class;
  Transaction t1, t2;

  initial begin
    t1 = new(101, "BELLEK_OKUMA");
    t2 = new(102, "BELLEK_YAZMA");

    t1.display();
    t2.display();
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_class.sv...",
        "İşlem #[101]: BELLEK_OKUMA",
        "İşlem #[102]: BELLEK_YAZMA",
      ],
      notes: "Yeni bir değişken ekleyip sınıfa constructor üzerinden aktarın.",
    },
    quiz: {
      question: "SystemVerilog'da 'Packet p;' ifadesi çalıştırıldığında bellekte ne oluşur?",
      options: [
        "A) Tüm değişkenleriyle eksiksiz bir Packet nesnesi oluşur.",
        "B) Henüz hiçbir nesne oluşmaz; 'null' değerine sahip bir handle (işaretçi) oluşur.",
        "C) Statik bir donanım modülü örneği oluşur.",
        "D) Derleme hatası verir.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Tanımlama yalnızca boş bir handle oluşturur. Gerçek nesne bellekte `p = new()` çağrıldığında tahsis edilir.",
    },
  },

  "inheritance-polymorphism": {
    id: "inheritance-polymorphism",
    badge: "Modül 6 • Nesne Yönelimli Programlama",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Kalıtım, Polimorfizm & Sanal Metodlar (virtual)",
    subtitle:
      "Genişletilebilir testbench sınıfları, super anahtar kelimesi ve çalışma-zamanı çok biçimliliği.",
    sections: [
      {
        title: "1. Kalıtım (Inheritance - extends)",
        content:
          "Mevcut bir `Packet` sınıfını bozmadan hatalı paketler (ErrorPacket) üretmek istediğimizde kalıtım kullanırız. Alt sınıf üst sınıfın tüm alanlarını ve metodlarını devralır:\n\n```systemverilog\nclass ErrorPacket extends Packet;\n  bit has_crc_error;\n  function new();\n    super.new(); // Üst sınıfın kurucusunu çağır\n    this.has_crc_error = 1;\n  endfunction\nendclass\n```",
      },
      {
        title: "2. Polimorfizm ve virtual Metodlar",
        content:
          "Üst sınıf referansı (`Packet p`), alt sınıf nesnesini (`ErrorPacket ep`) tutabilir. Eğer üst sınıftaki metod **`virtual`** olarak tanımlanmışsa, SystemVerilog çalışma anında nesnenin gerçek tipine bakar ve alt sınıftaki ezilmiş (overridden) metodu çalıştırır! Bu mekanizma UVM kütüphanesinin temel taşıdır.",
      },
    ],
    playground: {
      title: "Polimorfizm ve Sanal Metod Simülasyonu",
      initialCode: `class BasePacket;
  virtual function void send();
    $display("[BasePacket] Standart paket iletildi.");
  endfunction
endclass

class BadPacket extends BasePacket;
  function void send();
    $display("[BadPacket] Kasıtlı bozuk CRC'li paket iletildi!");
  endfunction
endclass

module tb_poly;
  BasePacket pkt;
  BadPacket  bad;

  initial begin
    bad = new();
    pkt = bad; // Polimorfik atama!

    // virtual sayesinde BadPacket'in send() metodu çalışır:
    pkt.send();
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_poly.sv...",
        "[BadPacket] Kasıtlı bozuk CRC'li paket iletildi!",
      ],
      notes: "BasePacket'teki 'virtual' kelimesini kaldırıp ne olduğunu gözlemleyin.",
    },
    quiz: {
      question: "SystemVerilog'da bir alt sınıfın ezdiği metodun üst sınıf handle'ı üzerinden doğru çağrılabilmesi için üst sınıftaki metod hangi anahtar kelimeyle tanımlanmalıdır?",
      options: [
        "A) static",
        "B) virtual",
        "C) extern",
        "D) local",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `virtual` anahtar kelimesi dinamik geç bağlamayı (dynamic dispatch) etkinleştirir ve polimorfizmi mümkün kılar.",
    },
  },

  casting: {
    id: "casting",
    badge: "Modül 6 • Nesne Yönelimli Programlama",
    readingTime: "6 dk okuma",
    level: "İleri Seviye",
    title: "Tip Dönüşümü: Statik vs $cast Dinamik Dönüşüm",
    subtitle:
      "Üst sınıf ve alt sınıf handle'ları arasında güvenli geçiş ve çalışma anı tip doğrulaması.",
    sections: [
      {
        title: "1. Statik Dönüşüm ('())",
        content:
          "Temel veri tipleri arasında derleme anında dönüşüm yapmak için `type'(deger)` sözdizimi kullanılır: `int'(2.75)` veya `signed'(u_val)`.",
      },
      {
        title: "2. Dinamik Sınıf Dönüşümü ($cast)",
        content:
          "Polimorfizmde bir üst sınıf handle'ı aslında bir alt sınıf nesnesini gösteriyor olabilir. Ancak derleyici bunu garanti edemediği için doğrudan atamaya izin vermez (`child = parent; // HATA!`).\n\nGüvenli aşağı dönüşüm (downcasting) için **`$cast(child, parent)`** kullanılır. Eğer nesne gerçekten o alt sınıfa aitse `$cast` 1 döner; değilse 0 döner ve simülasyon çökmez.",
      },
    ],
    playground: {
      title: "$cast Dinamik Tip Dönüşüm Testi",
      initialCode: `class Animal; endclass
class Dog extends Animal; 
  function void bark(); $display("Hav hav!"); endfunction
endclass

module tb_cast;
  Animal a;
  Dog d, d2;

  initial begin
    d = new();
    a = d; // Yukarı dönüşüm (Upcast - serbest)

    // Aşağı dönüşüm ($cast ile güvenli):
    if ($cast(d2, a)) begin
      $display("[BAŞARILI] $cast tamamlandı, köpek havlıyor:");
      d2.bark();
    end else begin
      $display("[HATA] Geçersiz tip dönüşümü!");
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_cast.sv...",
        "[BAŞARILI] $cast tamamlandı, köpek havlıyor:",
        "Hav hav!",
      ],
      notes: "a nesnesine doğrudan 'new()' atayıp $cast'in nasıl başarısız olduğunu test edin.",
    },
    quiz: {
      question: "SystemVerilog'da bir üst sınıf referansını güvenle alt sınıf referansına dönüştürmek için hangi fonksiyon kullanılır?",
      options: [
        "A) $dynamic_cast",
        "B) $cast",
        "C) $convert",
        "D) (type)cast",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! `$cast(hedef, kaynak)` fonksiyonu çalışma anında tipleri denetleyerek güvenli dönüşüm sağlar.",
    },
  },

  // ==========================================
  // MODÜL 7: KISITLI RASTGELELEŞTİRME (CRV)
  // ==========================================
  "rand-variables": {
    id: "rand-variables",
    badge: "Modül 7 • Rastgeleleştirme & Kısıtlar (CRV)",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "rand ve randc Değişkenleri",
    subtitle:
      "Kısıtlı rastgele testbench (Constrained Random Verification - CRV) temelleri ve randomize() metodu.",
    sections: [
      {
        title: "1. Kısıtlı Rastgele Doğrulama (CRV)",
        content:
          "Geleneksel testlerde mühendisler elle belirli test senaryoları (directed tests) yazardı. Ancak milyarlarca kapılı bir çipte akla gelmeyen köşe durumları (corner cases) elle test etmek imkansızdır.\n\nSystemVerilog, nesnelerin değişkenlerini otomatik olarak rastgele sayılarla doldurabilen yerleşik bir kısıt çözücü motoruna sahiptir.",
      },
      {
        title: "2. rand vs randc Farkı",
        content:
          "- **`rand`**: Standart rastgele değişken. Her `randomize()` çağrısında önceki değerlerden bağımsız yeni bir rastgele değer alır (zar atmak gibi, aynı sayı üst üste gelebilir).\n- **`randc` (Random-Cyclic)**: Döngüsel rastgele değişken. Olası tüm değerler bir kez üretilmeden hiçbir değer TEKRARLANMAZ (iskambil destesinden kart çekmek gibi).",
        code: {
          language: "systemverilog",
          caption: "rand ve randomize() Kullanımı",
          snippet: `class Packet;
  rand  bit [7:0] data;
  randc bit [1:0] channel; // 0, 1, 2, 3 permütasyonunu tekrarsız gezer!
endclass

Packet pkt = new();
initial begin
  if (!pkt.randomize()) begin
    $error("Rastgeleleştirme başarısız!");
  end
end`,
        },
      },
    ],
    playground: {
      title: "rand ve randc Simülasyonu",
      initialCode: `class DiceRoll;
  rand  bit [2:0] regular_rand; // 0..7
  randc bit [2:0] cyclic_rand;  // 0..7 tekrarsız!
endclass

module tb_rand;
  DiceRoll d = new();

  initial begin
    $display("[START] 8 Kez randomize() Testi:");
    repeat (8) begin
      void'(d.randomize());
      $display("rand: %0d  |  randc (Tekrarsız): %0d", 
               d.regular_rand, d.cyclic_rand);
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_rand.sv...",
        "[START] 8 Kez randomize() Testi:",
        "rand: 3  |  randc (Tekrarsız): 0",
        "rand: 7  |  randc (Tekrarsız): 4",
        "rand: 2  |  randc (Tekrarsız): 1",
        "rand: 2  |  randc (Tekrarsız): 7",
        "rand: 5  |  randc (Tekrarsız): 3",
        "rand: 0  |  randc (Tekrarsız): 6",
        "rand: 3  |  randc (Tekrarsız): 2",
        "rand: 6  |  randc (Tekrarsız): 5",
      ],
      notes: "randc sütununun 0'dan 7'ye kadar tüm sayıları tam olarak 1 kez ürettiğine dikkat edin.",
    },
    quiz: {
      question: "SystemVerilog'da olası tüm değer uzayı tükenmeden hiçbir değeri ikinci kez üretmeyen rastgele değişken türü hangisidir?",
      options: [
        "A) rand",
        "B) randc",
        "C) random",
        "D) static rand",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `randc` (cyclic), tüm olası değerleri bir permütasyon halinde tüketene kadar aynı değeri asla tekrar üretmez.",
    },
  },

  "constraint-blocks": {
    id: "constraint-blocks",
    badge: "Modül 7 • Rastgeleleştirme & Kısıtlar (CRV)",
    readingTime: "9 dk okuma",
    level: "Orta Seviye",
    title: "Kısıt Blokları (constraint): inside, dist, implication",
    subtitle:
      "Protokol uyumlu veri paketleri üretmek için kısıt kuralları, dağılımlar ve mantıksal ima operatörleri.",
    sections: [
      {
        title: "1. Kısıt (Constraint) Blokları",
        content:
          "Rastgele sayılar tamamen sınırsız üretilirse çoğu değer donanım protokollerine aykırı (geçersiz) olur. Kısıt blokları (`constraint c_name { ... }`), rastgele çözücünün uyması gereken matematiksel kuralları tanımlar.",
      },
      {
        title: "2. Önemli Kısıt Operatörleri",
        content:
          "- **`inside`**: Değer aralıklarını sınırlar: `addr inside {[16'h1000 : 16'h2000], 16'hFFFF};`\n- **`dist`**: Ağırlıklı olasılık dağılımı: `len dist { 64 := 70, [128:512] := 30 };` (yüzde 70 ihtimalle 64 bayt).\n- **İma Operatörü (`->`)**: Şarta bağlı kısıt: `is_write -> (data != 0);`\n- **`solve A before B`**: Bağımlı değişkenlerde çözücünün öncelik sırasını belirler.",
        code: {
          language: "systemverilog",
          caption: "Kapsamlı Kısıt Bloğu",
          snippet: `class EthPacket;
  rand bit [15:0] len;
  rand bit [7:0]  payload[];

  constraint c_len {
    len inside {[64 : 1518]};
    payload.size() == len;
  }
endclass`,
        },
      },
    ],
    playground: {
      title: "Kısıtlı Rastgele Paket Üretimi",
      initialCode: `class MemoryAccess;
  rand bit [15:0] addr;
  rand bit [31:0] data;
  rand bit        is_read;

  constraint c_addr_align {
    addr inside {[16'h1000 : 16'h1020]};
    addr % 4 == 0; // 4-Bayt hizalı adresler!
  }

  constraint c_read_rule {
    is_read -> data == 0; // Okuma işleminde data önemsiz/sıfır olsun
  }
endclass

module tb_constraints;
  MemoryAccess ma = new();

  initial begin
    repeat (5) begin
      void'(ma.randomize());
      $display("İşlem: %s | Adres: 0x%0h | Veri: 0x%0h",
               ma.is_read ? "OKU " : "YAZ ", ma.addr, ma.data);
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_constraints.sv...",
        "İşlem: YAZ  | Adres: 0x1004 | Veri: 0xa8f302b1",
        "İşlem: OKU  | Adres: 0x101c | Veri: 0x0",
        "İşlem: OKU  | Adres: 0x1008 | Veri: 0x0",
        "İşlem: YAZ  | Adres: 0x1014 | Veri: 0x4f12e89a",
        "İşlem: OKU  | Adres: 0x1000 | Veri: 0x0",
      ],
      notes: "Adreslerin her zaman 4'e bölünebildiğini ve OKU işlemlerinde verinin 0 olduğunu doğrulayın.",
    },
    quiz: {
      question: "SystemVerilog kısıtlarında bir değişkenin belirli bir aralıkta kalmasını sağlamak için hangi operatör kullanılır?",
      options: [
        "A) in_range",
        "B) inside",
        "C) between",
        "D) within",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! `inside {[min : max]}` operatörü değişkenin belirtilen sınırlar içinde üretilmesini şart koşar.",
    },
  },

  // ==========================================
  // MODÜL 8: SVA (ASSERTIONS)
  // ==========================================
  "immediate-assertions": {
    id: "immediate-assertions",
    badge: "Modül 8 • İfadeler (SVA - SystemVerilog Assertions)",
    readingTime: "6 dk okuma",
    level: "Orta Seviye",
    title: "Anlık İfadeler (Immediate Assertions)",
    subtitle:
      "Prosedürel bloklar içinde anlık durum doğrulama, assert, assume, cover ve şiddet mesajları.",
    sections: [
      {
        title: "1. Anlık Assertion Nedir?",
        content:
          "SystemVerilog Assertions (SVA), tasarımın uyması gereken kuralları kod içine yerleştiren denetçilerdir.\n\n**Immediate Assertions (Anlık İfadeler)**, normal bir `if` koşulu gibi o anki simülasyon anında değerlendirilir:\n\n```systemverilog\nassert (ack == 1'b1) else $error(\"ACK sinyali gelmedi!\");\n```",
      },
      {
        title: "2. Mesaj Şiddetleri (Severity Levels)",
        content:
          "Kural ihlal edildiğinde `else` dalında şu sistem fonksiyonları çağrılır:\n- `$fatal`: Simülasyonu anında durdurur ve hata koduyla çıkar.\n- `$error`: Kırmızı hata mesajı basar ama simülasyonu sürdürür.\n- `$warning`: Sarı uyarı mesajı basar.\n- `$info`: Bilgilendirme mesajı basar.",
      },
    ],
    playground: {
      title: "Anlık Assertion Hata Yakalama",
      initialCode: `module tb_assert;
  logic fifo_full = 1;
  logic push_req  = 1;

  always_comb begin
    // Dolu FIFO'ya yazma denemesi kural ihlalidir:
    assert (!(fifo_full && push_req)) 
      else $error("[SVA:HATA] Dolu FIFO'ya push yapılmaya çalışıldı!");
  end

  initial begin
    #10;
    $display("[TEST] Assertion testi tamamlandı.");
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_assert.sv...",
        "[SVA:HATA] Dolu FIFO'ya push yapılmaya çalışıldı!",
        "[TEST] Assertion testi tamamlandı.",
      ],
      notes: "fifo_full değerini 0 yaparak assertion hatasının nasıl kaybolduğunu görün.",
    },
    quiz: {
      question: "SystemVerilog assertion başarısız olduğunda simülasyonu anında sonlandıran en şiddetli hata fonksiyonu hangisidir?",
      options: [
        "A) $display",
        "B) $error",
        "C) $fatal",
        "D) $abort",
      ],
      correctIndex: 2,
      explanation:
        "Tebrikler! `$fatal`, simülasyonu anında durdurur ve simülatörden hata koduyla çıkar.",
    },
  },

  "concurrent-assertions": {
    id: "concurrent-assertions",
    badge: "Modül 8 • İfadeler (SVA - SystemVerilog Assertions)",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Eşzamanlı İfadeler: property ve sequence",
    subtitle:
      "Zamanla değişen protokol kurallarını (|->, |=>) saat darbeleriyle (##) doğrulama.",
    sections: [
      {
        title: "1. Eşzamanlı (Concurrent) SVA Mantığı",
        content:
          "Birçok donanım kuralı tek bir anda değil, birden fazla saat darbesi boyunca geçerlidir: *'İstek (req) geldikten 1 ila 3 saat darbesi sonra onay (ack) gelmelidir.'*\n\nBu tür zaman tabanlı kuralları doğrulamak için **Concurrent Assertions** kullanılır. `sequence` ve `property` blokları ile saat tabanlı kurallar yazılır.",
      },
      {
        title: "2. İma (Implication) Operatörleri",
        content:
          "- **`##N`**: N saat darbesi gecikme.\n- **`|->` (Overlapped Implication)**: Öncül doğruysa, şart AYNI saat darbesinde test edilir.\n- **`|=>` (Non-overlapped Implication)**: Öncül doğruysa, şart BİR SONRAKİ saat darbesinde test edilir.\n- **`disable iff (!rst_n)`**: Reset anında assertion'ı geçici olarak devre dışı bırakır.",
        code: {
          language: "systemverilog",
          caption: "Acknowledge Protokol Doğrulaması",
          snippet: `property p_req_ack;
  @(posedge clk) disable iff (!rst_n)
  req |=> ##[1:3] ack; // req geldikten 1..3 döngü sonra ack gelmeli!
endproperty

assert property (p_req_ack)
  else $error("Protokol Hatası: ACK gecikti!");`,
        },
      },
    ],
    playground: {
      title: "Concurrent SVA Simülasyonu",
      initialCode: `module tb_concurrent_sva;
  logic clk = 0;
  logic rst_n = 1;
  logic req = 0;
  logic ack = 0;

  always #5 clk = ~clk;

  // Kural: req yükseldikten tam 1 döngü sonra ack 1 olmalı
  property p_handshake;
    @(posedge clk) req |=> ack;
  endproperty

  assert property (p_handshake)
    else $error("[SVA:HATA] req sonrası beklenen ack sinyali gelmedi!");

  initial begin
    #10; req = 1; // İstek yapıldı
    #10; req = 0; ack = 1; // Onay 1 döngü sonra verildi (KURAL GEÇTİ)
    #10; ack = 0;
    
    // Şimdi kasıtlı hata senaryosu:
    #10; req = 1;
    #10; req = 0; ack = 0; // HATA! ack verilmedi!
    #10;
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_concurrent_sva.sv...",
        "[SVA:HATA] req sonrası beklenen ack sinyali gelmedi!",
        "[FINISH] Simülasyon bitti.",
      ],
      notes: "Kasıtlı hata anında SVA'nın nasıl tetiklendiğini inceleyin.",
    },
    quiz: {
      question: "SystemVerilog SVA'da '|=>' (çakışmayan ima operatörü) ne anlama gelir?",
      options: [
        "A) Tetikleyici koşul doğruysa, beklenen sonuç aynı saat darbesinde kontrol edilir.",
        "B) Tetikleyici koşul doğruysa, beklenen sonuç bir sonraki (next) saat darbesinde kontrol edilir.",
        "C) Koşul asla gerçekleşmemelidir.",
        "D) Sinyalleri tersler.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! `|=>` (non-overlapped implication), öncül sinyal 1 olduğunda hedefin tam bir saat döngüsü sonra kontrol edilmesini sağlar.",
    },
  },

  // ==========================================
  // MODÜL 9: ARAYÜZLER (INTERFACES)
  // ==========================================
  "interface-modport": {
    id: "interface-modport",
    badge: "Modül 9 • Arayüzler & Modportlar",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Arayüzler (interface) ve modport Kavramı",
    subtitle:
      "Sinyal karmaşasını sonlandırma, modüler protokol kablolaması ve port yönlendirmesi.",
    sections: [
      {
        title: "1. Arayüz (interface) Devrimi",
        content:
          "Büyük bir SoC tasarımında AXI veya PCIe gibi protokoller 50'den fazla sinyal teline sahiptir. Her bir modüle bu 50 teli tek tek bağlamak yüzlerce satır kod karmaşası ve hata demektir.\n\n`interface`, bir protokole ait tüm sinyalleri tek bir demet halinde paketler. Modüle 50 ayrı tel yerine tek bir interface nesnesi bağlanır.",
      },
      {
        title: "2. modport ile Yön Belirleme",
        content:
          "Aynı sinyal demetine bağlanan modüllerden biri USTA (Master) iken diğeri KÖLE (Slave) olabilir. `modport`, interface içindeki sinyallerin hangi modül için giriş (input), hangi modül için çıkış (output) olduğunu belirler.",
        code: {
          language: "systemverilog",
          caption: "Basit Bellek Arayüzü",
          snippet: `interface mem_if (input logic clk);
  logic        wr_en;
  logic [15:0] addr;
  logic [31:0] wdata;
  logic [31:0] rdata;

  // Tasarım (DUT) yönleri:
  modport dut_mp (
    input clk, wr_en, addr, wdata,
    output rdata
  );

  // Testbench yönleri:
  modport tb_mp (
    input clk, rdata,
    output wr_en, addr, wdata
  );
endinterface`,
        },
      },
    ],
    playground: {
      title: "Interface ve Modport Bağlantı Simülatörü",
      initialCode: `interface bus_if;
  logic [7:0] data;
  logic       valid;
endinterface

module producer (bus_if.data bus);
  // Producer veri üretir
endmodule

module tb_if;
  bus_if my_bus();

  initial begin
    my_bus.valid = 1;
    my_bus.data  = 8'h55;
    $display("Arayüz Sinyalleri: valid=%b, data=0x%0h", 
             my_bus.valid, my_bus.data);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_if.sv...",
        "Arayüz Sinyalleri: valid=1, data=0x55",
      ],
      notes: "Tüm protokol sinyallerinin tek bir çatı altında toplandığını görün.",
    },
    quiz: {
      question: "SystemVerilog 'interface' yapısında sinyallerin farklı modüllere göre giriş veya çıkış yönlerini tanımlayan yapı hangisidir?",
      options: [
        "A) portgroup",
        "B) modport",
        "C) direction",
        "D) wiremap",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `modport`, interface içindeki sinyallerin master, slave veya testbench tarafından hangi yönde (input/output) kullanılacağını belirler.",
    },
  },

  "virtual-interface": {
    id: "virtual-interface",
    badge: "Modül 9 • Arayüzler & Modportlar",
    readingTime: "9 dk okuma",
    level: "İleri Seviye",
    title: "Sanal Arayüzler (virtual interface) & Clocking Block",
    subtitle:
      "OOP tabanlı testbench sınıfları ile fiziksel donanım sinyallerini bağlama ve yarış önleme.",
    sections: [
      {
        title: "1. Sanal Arayüz (Virtual Interface) Köprüsü",
        content:
          "SystemVerilog'da `class` (dinamik yazılım nesnesi) doğrudan bir donanım `interface` teline dokunamaz. Donanım ile OOP sınıfları (Driver, Monitor) arasındaki bu köprüyü kuran mekanizmaya **`virtual interface`** denir.\n\nSınıfın içine bir `virtual bus_if vif;` konur ve başlangıçta fiziksel arayüz bu değişkene atanır.",
      },
      {
        title: "2. Saat Blokları (Clocking Block)",
        content:
          "Testbench'in donanım sinyallerini tam saat vurduğu anda okuması yarış durumuna (setup/hold violation) sebep olur. **`clocking block`**, sinyallerin saat darbesinden biraz önce (setup) okunmasını ve biraz sonra (hold) sürülmesini garanti ederek simülasyondaki tüm yarışları yok eder.",
      },
    ],
    playground: {
      title: "Virtual Interface ile Sürücü (Driver) Sınıfı",
      initialCode: `interface dut_if (input logic clk);
  logic [7:0] data;
  logic       ready;
endinterface

class Driver;
  virtual dut_if vif; // Sanal arayüz köprüsü

  function new(virtual dut_if vif);
    this.vif = vif;
  endfunction

  task send_data(bit [7:0] val);
    @(posedge vif.clk);
    vif.data <= val;
    vif.ready <= 1'b1;
    $display("[Driver] Veri sürüldü: 0x%0h", val);
  endtask
endclass

module tb_vif;
  logic clk = 0;
  always #5 clk = ~clk;

  dut_if physical_if(clk); // Fiziksel arayüz
  Driver drv;

  initial begin
    drv = new(physical_if); // Bağlantı kuruldu
    drv.send_data(8'hFE);
    #10;
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_vif.sv...",
        "[Driver] Veri sürüldü: 0xfe",
      ],
      notes: "Driver sınıfının fiziksel telleri virtual interface aracılığıyla nasıl sürdüğünü inceleyin.",
    },
    quiz: {
      question: "SystemVerilog OOP sınıflarının fiziksel donanım sinyallerine erişmesini sağlayan referans türü hangisidir?",
      options: [
        "A) dynamic interface",
        "B) virtual interface",
        "C) static interface",
        "D) class port",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! `virtual interface`, sınıflar ile donanım modülleri arasında köprü görevi gören işaretçi yapısıdır.",
    },
  },

  // ==========================================
  // MODÜL 10: THREADS & IPC
  // ==========================================
  "fork-join": {
    id: "fork-join",
    badge: "Modül 10 • İş Parçacıkları & IPC",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Paralel Süreçler: fork..join, join_any, join_none",
    subtitle:
      "Aynı anda birden fazla donanım aktörünü, zaman aşımlarını ve paralel iş parçacıklarını çalıştırma.",
    sections: [
      {
        title: "1. Paralel Süreçler (Fork-Join Ailesi)",
        content:
          "SystemVerilog testbench'lerinde aynı anda veri göndermek, yanıt beklemek ve zaman aşımını (timeout) izlemek gerekir. `fork..join` bloğu içine yazılan her prosedür paralel birer iş parçacığı (thread) olarak başlar:\n\n- **`fork .. join`**: İçindeki TÜM işlemler bitene kadar ana akış durur.\n- **`fork .. join_any`**: İçindeki işlemlerden İLK BİTEN tamamlandığında ana akış devam eder.\n- **`fork .. join_none`**: İşlemleri arkaplanda başlatır ve HİÇ BEKLEMEDEN hemen bir sonraki satıra geçer.",
      },
      {
        title: "2. disable fork ve wait fork",
        content:
          "`join_any` ile ilk işlem bittiğinde geride kalan diğer işlemleri iptal etmek için **`disable fork;`** kullanılır. Tüm arkaplan işlemlerinin bitmesini beklemek içinse **`wait fork;`** çağrılır.",
      },
    ],
    playground: {
      title: "fork..join_any ile Zaman Aşımı (Timeout) Kontrolü",
      initialCode: `module tb_fork;
  initial begin
    $display("[START] Zaman Aşımı Testi Başlatıldı");

    fork
      begin
        // Normal İşlem: 15ns sürer
        #15 $display("[@%0tns] Yanıt başarıyla alındı!", $time);
      end
      begin
        // Zaman Aşımı Bekçisi (Watchdog): 30ns
        #30 $display("[@%0tns] HATA: Zaman aşımı!", $time);
      end
    join_any // İlk biten (15ns) akışı serbest bırakır

    disable fork; // 30ns bekçisini sonlandır!
    $display("[@%0tns] join_any tamamlandı, simülasyon devam ediyor.", $time);
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_fork.sv...",
        "[START] Zaman Aşımı Testi Başlatıldı",
        "[@15ns] Yanıt başarıyla alındı!",
        "[@15ns] join_any tamamlandı, simülasyon devam ediyor.",
      ],
      notes: "15ns'yi 40ns yaparak watchdog'un nasıl tetiklendiğini test edin.",
    },
    quiz: {
      question: "SystemVerilog'da başlatılan paralel süreçlerden herhangi biri (ilki) tamamlandığında ana kodun devam etmesini sağlayan yapı hangisidir?",
      options: [
        "A) fork .. join",
        "B) fork .. join_any",
        "C) fork .. join_none",
        "D) fork .. join_first",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `fork..join_any`, dallardan en az biri bittiğinde ana süreci serbest bırakır (watchdog/timeout için idealdir).",
    },
  },

  "ipc-primitives": {
    id: "ipc-primitives",
    badge: "Modül 10 • İş Parçacıkları & IPC",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Süreçler Arası İletişim: mailbox, semaphore, event",
    subtitle:
      "Thread-safe veri kuyrukları (mailbox), paylaşımlı kaynak kilitleme (semaphore) ve olay tetikleme.",
    sections: [
      {
        title: "1. mailbox (Posta Kutusu)",
        content:
          "Farklı iş parçacıkları (örneğin Generator ile Driver) arasında güvenli işlem paketleri taşımak için kullanılır. İçinde `put()` (kutuya at) ve `get()` (kutudan al) metodları vardır. Kutu boşsa `get()` beklemeye geçer.",
      },
      {
        title: "2. semaphore (Semafor)",
        content:
          "Paylaşılan bir kaynağa (örneğin tek bir hafıza portuna) aynı anda iki thread'in erişmesini önler (Mutual Exclusion). `sem.get(1)` ile anahtar alınır, işlem bittiğinde `sem.put(1)` ile anahtar iade edilir.",
      },
      {
        title: "3. event (Olay)",
        content:
          "İki süreç arasında basit bir sinyal bayrağı tetiklemek için `event e;` kullanılır. Bir süreç `->e;` ile tetiklerken diğeri `@e` veya `wait(e.triggered)` ile bekler.",
      },
    ],
    playground: {
      title: "Mailbox ile Generator-Driver İletişimi",
      initialCode: `module tb_mailbox;
  mailbox #(int) mbox = new(2); // 2 eleman kapasiteli mailbox

  // Üretici (Generator) Süreci
  initial begin
    for (int i = 1; i <= 3; i++) begin
      #10;
      mbox.put(i * 10);
      $display("[@%0tns Generator] Paket kutuya kondu: %0d", $time, i * 10);
    end
  end

  // Tüketici (Driver) Süreci
  initial begin
    int data;
    repeat (3) begin
      mbox.get(data);
      $display("[@%0tns Driver]    Paket kutudan alındı: %0d", $time, data);
    end
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_mailbox.sv...",
        "[@10ns Generator] Paket kutuya kondu: 10",
        "[@10ns Driver]    Paket kutudan alındı: 10",
        "[@20ns Generator] Paket kutuya kondu: 20",
        "[@20ns Driver]    Paket kutudan alındı: 20",
        "[@30ns Generator] Paket kutuya kondu: 30",
        "[@30ns Driver]    Paket kutudan alındı: 30",
      ],
      notes: "Mailbox'ın iki paralel süreç arasında senkronizasyonu nasıl sağladığını inceleyin.",
    },
    quiz: {
      question: "SystemVerilog'da paylaşılan kısıtlı bir kaynağa (örneğin tek bir bus hattı) aynı anda yalnızca belirli sayıda thread'in erişmesini denetlemek için hangi yapı kullanılır?",
      options: [
        "A) mailbox",
        "B) semaphore",
        "C) event",
        "D) trigger",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! `semaphore`, anahtar mekanizması (`get` / `put`) ile paylaşımlı kaynakların yarışa girmeden kilitlenmesini sağlar.",
    },
  },

  // ==========================================
  // MODÜL 11: MÜLAKAT SORULARI
  // ==========================================
  "interview-prep": {
    id: "interview-prep",
    badge: "Modül 11 • Mülakat Soru Bankası",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "En Popüler 30+ SystemVerilog Mülakat Sorusu",
    subtitle:
      "Teknik iş görüşmelerinde sorulan tuzak sorular, kod parçaları ve mülakatçıların beklediği yanıtlar.",
    sections: [
      {
        title: "1. Sıkça Sorulan Mülakat Soruları ve Yanıtları",
        content:
          "Aşağıdaki sorular Apple, Intel, NVIDIA, Qualcomm, ASELSAN ve Baykar gibi çip tasarım ve savunma sanayii firmalarının iş görüşmelerinde en sık karşılaşılan konulardır:\n\n" +
          "**S1: logic ile wire/reg arasındaki fark nedir?**\n" +
          "*Yanıt:* Verilog'da `wire` sadece sürekli atama (`assign`) ile, `reg` ise sadece prosedürel bloklar (`always`, `initial`) içinde sürülebilirdi. SystemVerilog'un `logic` tipi ise her ikisinin yerini alır; hem `assign` ile hem de `always` içinde tek bir sürücü tarafından sürülebilir.\n\n" +
          "**S2: $cast neden gereklidir? Doğrudan atama neden yetersizdir?**\n" +
          "*Yanıt:* Polimorfizmde alt sınıf üst sınıfa atanabilir (Upcasting). Ancak üst sınıf handle'ı alt sınıfa atanırken (Downcasting), nesnenin çalışma anında gerçekten o alt sınıf olup olmadığı bilinmez. `$cast` runtime tip kontrolü yaparak güvenli geçiş sağlar ve geçersizse 0 dönerek simülasyonun çökmesini önler.\n\n" +
          "**S3: Non-blocking (<=) ile Blocking (=) atama arasındaki fark nedir?**\n" +
          "*Yanıt:* Blocking atama Active bölgesinde o anda işlenir ve sonraki satırı bloke eder. Non-blocking atama ise sağ tarafı Active bölgesinde hesaplar ancak sol taraftaki değişkeni NBA bölgesinde günceller. Ardışıl flip-flop devrelerinde yarış durumunu önlemek için mutlaka `<=` kullanılmalıdır.\n\n" +
          "**S4: rand ile randc arasındaki fark nedir?**\n" +
          "*Yanıt:* `rand` tamamen bağımsız rastgele üretir (aynı değer ardışık gelebilir). `randc` ise döngüseldir (cyclic); olası tüm değer uzayı tükenene kadar hiçbir değeri ikinci kez üretmez.\n\n" +
          "**S5: Virtual Interface neden zorunludur?**\n" +
          "*Yanıt:* SystemVerilog'da sınıflar (`class`) dinamik yazılım yapılarıdır, donanım telleri (`interface`) ise statik donanım yapılarıdır. Sınıfın fiziksel bir donanım teline referans verebilmesi için `virtual interface` köprüsü zorunludur.",
      },
      {
        title: "2. Sık Yapılan Kod Hataları",
        content:
          "- `always_comb` içinde blocking (`=`) yerine non-blocking (`<=`) kullanmak (gecikmelere yol açar).\n- `new()` çağırmadan sınıftaki bir değişkene erişmeye çalışmak (`Null pointer dereference`).\n- `$random` yerine modern `std::randomize()` veya `class` kısıt çözücüsünü tercih etmemek.\n- Saat periyodu tanımlarken zaman birimini (`timescale 1ns/1ps`) belirtmeyi unutmak.",
      },
    ],
    playground: {
      title: "Mülakat Klasik: Saat Üreteci ve Reset Sıralayıcı",
      initialCode: `// Mülakatlarda sık sorulan temiz saat ve reset şablonu
module tb_interview_template;
  logic clk = 0;
  logic rst_n = 0;

  // 100 MHz Saat (10ns Periyot)
  always #5 clk = ~clk;

  initial begin
    $display("[0ns] Simülasyon başladı, Reset aktif (LOW).");
    #20 rst_n = 1; // 2 saat darbesi sonra reset bırakıldı
    $display("[20ns] Reset bırakıldı, sistem normal çalışmaya geçti.");
    #50;
    $display("[70ns] Test tamamlandı.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_interview_template.sv...",
        "[0ns] Simülasyon başladı, Reset aktif (LOW).",
        "[20ns] Reset bırakıldı, sistem normal çalışmaya geçti.",
        "[70ns] Test tamamlandı.",
      ],
      notes: "Bu kalıp endüstrideki tüm SystemVerilog testbench'lerinin temel başlangıç omurgasıdır.",
    },
    quiz: {
      question: "SystemVerilog mülakatlarında: 'always_ff bloğunda hangi atama operatörü kullanılmalıdır ve neden?' sorusuna en doğru yanıt hangisidir?",
      options: [
        "A) Blocking (=), çünkü simülasyonu hızlandırır.",
        "B) Non-blocking (<=), çünkü flip-flop'lar arasındaki yarış durumunu (race condition) engeller.",
        "C) assign, çünkü sürekli atama gereklidir.",
        "D) Her ikisi de farksızdır.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! Ardışıl mantıkta (flip-flop) non-blocking (`<=`) atama kullanmak simülasyon zamanlama bölgelerinde yarış durumlarını önleyen temel kuraldır.",
    },
  },

  // ==========================================
  // MODÜL: FONKSİYONEL KAPSAMA (COVERAGE)
  // ==========================================
  "covergroup-coverpoint": {
    id: "covergroup-coverpoint",
    badge: "Modül 8 • Fonksiyonel Kapsama (Coverage)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "covergroup ve coverpoint Temelleri",
    subtitle:
      "Kod kapsaması (Code Coverage) vs Fonksiyonel Kapsama, covergroup tanımları ve örnekleme metodları.",
    sections: [
      {
        title: "1. Kod Kapsaması vs Fonksiyonel Kapsama",
        content:
          "- **Kod Kapsaması (Code Coverage):** Simülatörün otomatik topladığı metriklerdir: Hangi satırlar (Line), dallar (Branch), durumlar (FSM) çalıştı?\n- **Fonksiyonel Kapsama (Functional Coverage):** Tasarımcının/Doğrulayıcının bilerek tanımladığı işlevsel hedeflerdir: *'FIFO hem boşken hem doluyken aynı anda okuma ve yazma denendi mi? 64 bayttan 1518 bayta kadar tüm paket tipleri test edildi mi?'*\n\nKod kapsaması %100 olsa bile, spesifikasyonda yazan kritik bir senaryoyu hiç test etmemiş olabilirsiniz. İşte bu güvenceyi **Fonksiyonel Kapsama** sağlar.",
      },
      {
        title: "2. covergroup ve coverpoint Sözdizimi",
        content:
          "`covergroup` bir sınıf içinde veya modül içinde tanımlanabilir. İçindeki her `coverpoint`, incelenmek istenen bir değişkeni veya sinyali temsil eder:\n\n```systemverilog\ncovergroup cg_bus @(posedge clk);\n  cp_addr: coverpoint addr;\n  cp_cmd:  coverpoint cmd;\nendgroup\n```\nÖrnekleme ya saat darbesiyle (`@(posedge clk)`) otomatik yapılır ya da testbench içinden `cg_inst.sample()` ile manuel tetiklenir.",
      },
    ],
    playground: {
      title: "covergroup Örnekleme Simülasyonu",
      initialCode: `module tb_coverage;
  logic clk = 0;
  logic [1:0] mode;

  always #5 clk = ~clk;

  // Fonksiyonel Kapsama Grubu
  covergroup cg_mode @(posedge clk);
    cp_m: coverpoint mode;
  endgroup

  cg_mode cg = new();

  initial begin
    mode = 2'b00; #10;
    mode = 2'b01; #10;
    mode = 2'b10; #10;
    mode = 2'b11; #10;

    $display("[KAPSAMA] Örnekleme tamamlandı.");
    $display("Ulaşılan Kapsama: %0.2f%%", cg.get_coverage());
    $finish;
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_coverage.sv...",
        "[KAPSAMA] Örnekleme tamamlandı.",
        "Ulaşılan Kapsama: 100.00%",
      ],
      notes: "mode değişkeninin 0, 1, 2, 3 durumlarının hepsine ulaşıldığında kapsama %100 olur.",
    },
    quiz: {
      question: "Kod Kapsaması (Code Coverage) %100 olduğunda testlerin eksiksiz bittiği söylenebilir mi?",
      options: [
        "A) Evet, tüm kod çalıştığı için hiçbir açık kalmamıştır.",
        "B) Hayır, kodda hiç yazılmamış olan eksik özellikler ve senaryolar yalnızca Fonksiyonel Kapsama (Functional Coverage) ile tespit edilebilir.",
        "C) Evet, IEEE standardı bunu garanti eder.",
        "D) Yalnızca FPGA tasarımlarında söylenebilir.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Kod kapsaması sadece yazılan satırların üzerinden geçilip geçilmediğini ölçer; tasarlanması gerekip de hiç yazılmayan özellikleri yakalayamaz.",
    },
  },

  "coverage-bins-cross": {
    id: "coverage-bins-cross",
    badge: "Modül 8 • Fonksiyonel Kapsama (Coverage)",
    readingTime: "9 dk okuma",
    level: "İleri Seviye",
    title: "Bins Tanımları ve Çapraz Kapsama (cross)",
    subtitle:
      "Açık tanımlı bins, ignore_bins, illegal_bins ve çok boyutlu cross coverage matrisleri.",
    sections: [
      {
        title: "1. Kapsama Kutuları (Bins)",
        content:
          "Varsayılan olarak simülatör tüm olası değerleri otomatik kutulara böler. Ancak doğrulayıcı özel aralıklar tanımlayabilir:\n\n- `bins low = {[0:15]};`: 0..15 arası tek bir başarı kutusudur.\n- `bins high = {[240:255]};`: Üst sınır kutusu.\n- `ignore_bins bad = {8'hFF};`: Kapsama hesabına dahil edilmeyecek değerler.\n- `illegal_bins err = {8'h00};`: Görülürse simülatörün anında hata vereceği yasaklı değerler.",
      },
      {
        title: "2. Çapraz Kapsama (Cross Coverage)",
        content:
          "İki farklı coverpoint'in kartezyen çarpımını (tüm kombinasyonlarını) ölçer:\n\n```systemverilog\ncovergroup cg_axi;\n  cp_burst: coverpoint burst_type; // 3 tip\n  cp_size:  coverpoint burst_size; // 4 boyut\n  cx_all:   cross cp_burst, cp_size; // 3 x 4 = 12 kombinasyon!\nendgroup\n```",
      },
    ],
    playground: {
      title: "Özel Bins ve Çapraz Kapsama Testi",
      initialCode: `module tb_bins;
  bit [2:0] opcode;
  bit       is_secure;

  covergroup cg_security;
    cp_op: coverpoint opcode {
      bins read  = {3'b001};
      bins write = {3'b010};
      bins reset = {3'b111};
    }
    cp_sec: coverpoint is_secure;
    cx_sec_op: cross cp_op, cp_sec;
  endgroup

  cg_security cg = new();

  initial begin
    opcode = 3'b001; is_secure = 1; cg.sample();
    opcode = 3'b010; is_secure = 0; cg.sample();
    opcode = 3'b111; is_secure = 1; cg.sample();

    $display("Kapsama Örneklemesi Alındı: %0.2f%%", cg.get_coverage());
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_bins.sv...",
        "Kapsama Örneklemesi Alındı: 50.00%",
      ],
      notes: "Eksik kalan cross kombinasyonlarını sample() ile besleyerek kapsamayı %100 yapmayı deneyin.",
    },
    quiz: {
      question: "SystemVerilog covergroup içinde 'illegal_bins' olarak tanımlanan bir değer simülasyonda örneklenirse ne olur?",
      options: [
        "A) Kapsama yüzdesini %0 yapar ama devam eder.",
        "B) Simülatör çalışma anı hatası üretir ve bu durumun yasaklı olduğunu raporlar.",
        "C) Değeri otomatik olarak ignore eder.",
        "D) Değeri sıfırlar.",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `illegal_bins`, donanımın asla girmemesi gereken ölümcül durumları denetlemek için kullanılır ve tetiklendiğinde hata üretir.",
    },
  },

  // ==========================================
  // MODÜL: DOĞRULAMA MİMARİSİ (UVM FOUNDATION)
  // ==========================================
  "tb-components": {
    id: "tb-components",
    badge: "Modül 12 • Testbench Mimarisi",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "Transactor Mimarisi: Generator, Driver, Monitor, Scoreboard",
    subtitle:
      "Modern çip doğrulamada katmanlı testbench mimarisi, transactor sınıfları ve UVM altyapısı.",
    sections: [
      {
        title: "1. Katmanlı Testbench Mimarisi (Layered Testbench)",
        content:
          "Profesyonel testbench'ler monolitik `initial` blokları halinde yazılmaz. Bunun yerine her biri tek bir sorumluluğa sahip transactor sınıflarına ayrılır:\n\n" +
          "1. **Transaction (İşlem Nesnesi):** Bus üzerinde taşınan saf veri paketi (`addr`, `data`, `parity`).\n" +
          "2. **Generator (Üreteç):** Kısıtlı rastgele (CRV) paketler üretir ve Mailbox'a koyar.\n" +
          "3. **Driver (Sürücü):** Mailbox'tan paketi alır, saat vuruşlarıyla fiziksel interface sinyallerine dönüştürür (pin-wiggling).\n" +
          "4. **Monitor (İzleyici):** Fiziksel arayüzdeki pinleri pasif olarak dinler, paketleri birleştirir ve Scoreboard'a iletir.\n" +
          "5. **Scoreboard (Karşılaştırıcı):** DUT'tan çıkan gerçek sonuçlar ile referans modelin (Golden Model) beklenen sonuçlarını karşılaştırır; eşleşmeyen her durumda hata basar.\n" +
          "6. **Environment (Ortam):** Tüm bu aktörleri bağlayan ve başlatan kapsayıcı sınıf.",
      },
      {
        title: "2. UVM (Universal Verification Methodology) Temeli",
        content:
          "Endüstride ASIC doğrulamada kullanılan UVM kütüphanesi tam olarak bu mimari üzerine inşa edilmiştir (`uvm_driver`, `uvm_monitor`, `uvm_scoreboard`). SystemVerilog ile bu mimariyi kavrayan bir mühendis, doğrudan UVM projelerine başlayabilir.",
      },
    ],
    playground: {
      title: "Mini Transactor Testbench İskeleti",
      initialCode: `// Mini Transactor Doğrulama Çatısı
class Packet;
  rand bit [7:0] data;
endclass

class Driver;
  mailbox #(Packet) mbx;
  function new(mailbox #(Packet) mbx); this.mbx = mbx; endfunction
  task run();
    Packet p;
    repeat (3) begin
      mbx.get(p);
      $display("[DRIVER] Fiziksel hatta sürüldü: Data = 0x%0h", p.data);
    end
  endtask
endclass

class Generator;
  mailbox #(Packet) mbx;
  function new(mailbox #(Packet) mbx); this.mbx = mbx; endfunction
  task run();
    repeat (3) begin
      Packet p = new();
      void'(p.randomize());
      mbx.put(p);
      $display("[GENERATOR] Yeni işlem üretildi.");
    end
  endtask
endclass

module tb_arch;
  mailbox #(Packet) m = new();
  Generator gen = new(m);
  Driver    drv = new(m);

  initial begin
    fork
      gen.run();
      drv.run();
    join
    $display("[FINISH] Testbench döngüsü tamamlandı.");
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_arch.sv...",
        "[GENERATOR] Yeni işlem üretildi.",
        "[DRIVER] Fiziksel hatta sürüldü: Data = 0x3f",
        "[GENERATOR] Yeni işlem üretildi.",
        "[DRIVER] Fiziksel hatta sürüldü: Data = 0x8a",
        "[GENERATOR] Yeni işlem üretildi.",
        "[DRIVER] Fiziksel hatta sürüldü: Data = 0xd1",
        "[FINISH] Testbench döngüsü tamamlandı.",
      ],
      notes: "Generator ve Driver'ın mailbox üzerinden eşzamanlı nasıl çalıştığını inceleyin.",
    },
    quiz: {
      question: "Katmanlı bir SystemVerilog testbench mimarisinde fiziksel sinyal pinlerini pasif olarak dinleyip işlemleri Scoreboard'a ileten bileşen hangisidir?",
      options: [
        "A) Driver",
        "B) Monitor",
        "C) Generator",
        "D) Sequencer",
      ],
      correctIndex: 1,
      explanation:
        "Tebrikler! `Monitor`, hat üzerindeki sinyalleri asla sürmez; sadece pasif dinleyerek paketleri toplar ve kontrol için Scoreboard'a iletir.",
    },
  },

  "dpi-c-packages": {
    id: "dpi-c-packages",
    badge: "Modül 12 • Testbench Mimarisi",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "C/C++ Entegrasyonu (DPI-C) ve Paketler (Packages)",
    subtitle:
      "DPI-C (Direct Programming Interface) ile C/C++ fonksiyonlarını doğrudan çağırma ve package modülleri.",
    sections: [
      {
        title: "1. Paketler (Packages) ve İsim Alanları",
        content:
          "Büyük projelerde `typedef`, `class` ve `function` tanımları modüllerin içine sıkıştırılmaz. **`package`** bloğu içinde tanımlanır ve istenen yerde `import my_pkg::*;` ile içeri aktarılır:\n\n```systemverilog\npackage cpu_pkg;\n  typedef logic [31:0] word_t;\n  typedef enum { ADD, SUB, AND_OP } alu_op_e;\nendpackage\n```",
      },
      {
        title: "2. DPI-C (Direct Programming Interface)",
        content:
          "Eski Verilog PLI/VPI arayüzleri son derece hantal ve zordu. SystemVerilog'un **DPI-C** arayüzü sayesinde C veya C++ dilinde yazılmış bir fonksiyonu tek satırla çağırabilirsiniz:\n\n```systemverilog\nimport \"DPI-C\" function int c_sha256(input string text);\nimport \"DPI-C\" context task c_gui_update(input int status);\n```\nBu sayede C dilinde yazılmış hızlı referans algoritmalar (Golden Model) SystemVerilog Scoreboard'larına doğrudan bağlanabilir.",
      },
    ],
    playground: {
      title: "SystemVerilog Package Kullanımı",
      initialCode: `package math_pkg;
  function automatic int square(int x);
    return x * x;
  endfunction
endpackage

module tb_dpi;
  import math_pkg::*; // Paketi içe aktar

  initial begin
    int val = 12;
    $display("math_pkg::square(%0d) = %0d", val, square(val));
    $display("[BAŞARILI] Paket fonksiyonu başarıyla yürütüldü.");
  end
endmodule`,
      expectedOutput: [
        "[INFO:EDA] Compiling tb_dpi.sv...",
        "math_pkg::square(12) = 144",
        "[BAŞARILI] Paket fonksiyonu başarıyla yürütüldü.",
      ],
      notes: "math_pkg içine yeni fonksiyonlar ekleyip içe aktarmayı test edin.",
    },
    quiz: {
      question: "SystemVerilog'da C/C++ dilinde yazılmış bir algoritmayı testbench içinde doğrudan yerel bir fonksiyon gibi çağırmayı sağlayan standart arayüz hangisidir?",
      options: [
        "A) PLI 1.0",
        "B) VPI 2.0",
        "C) DPI-C (Direct Programming Interface)",
        "D) JNI",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! DPI-C (Direct Programming Interface), SystemVerilog ile C/C++ arasında sıfır ara katmanla en hızlı veri alışverişini sağlayan modern standarttır.",
    },
  },
};

