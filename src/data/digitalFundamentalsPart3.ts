import { LessonContent } from "./lessonsData";

export const DIGITAL_FUNDAMENTALS_PART3: Record<string, LessonContent> = {
  // ========================================================
  // BÖLÜM 6: BOOLEAN MANTIĞI & SADELEŞTİRME
  // ========================================================
  "df-boolean-logic": {
    id: "df-boolean-logic",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Boole Mantığı ve De Morgan Teoremleri",
    subtitle: "Boole cebri aksiyomları, mantıksal eşitlikler, De Morgan kuralları ve kapı dönüşümleri.",
    sections: [
      {
        title: "1. Boole Cebri Temel Teoremleri",
        content: `Boole cebri (George Boole, 1854), yalnızca 0 ve 1 değerleriyle çalışan mantıksal matematik sistemidir:
- **Etkisiz Eleman:** \`A & 1 = A\` , \`A | 0 = A\`
- **Yutan Eleman:** \`A & 0 = 0\` , \`A | 1 = 1\`
- **Tersleme:** \`A & ~A = 0\` , \`A | ~A = 1\`
- **İdempotentlik:** \`A & A = A\` , \`A | A = A\`
- **Dağılma Özelliği:** \`A & (B | C) = (A & B) | (A & C)\``,
      },
      {
        title: "2. Hayati De Morgan Teoremleri",
        content: `Çip tasarımında en çok kullanılan dönüşüm kurallarıdır:
1. **~(A & B) = ~A | ~B** (NAND işlemi, girişleri terslenmiş OR işlemine eşittir).
2. **~(A | B) = ~A & ~B** (NOR işlemi, girişleri terslenmiş AND işlemine eşittir).
Bu kural sayesinde tüm mantık kapıları yalnızca NAND veya yalnızca NOR kullanılarak birbirine dönüştürülebilir.`,
      },
    ],
    playground: {
      title: "De Morgan Teoremi Eşdeğerlik Doğrulaması",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_demorgan;
  reg a, b;
  wire sol_taraf, sag_taraf;

  // De Morgan 1: ~(A & B) == ~A | ~B
  assign sol_taraf = ~(a & b);
  assign sag_taraf = ~a | ~b;

  initial begin
    $display("=== De Morgan 1. Teorem Doğrulama ===");
    $display("A B | ~(A & B) | ~A | ~B | Eşit mi?");

    a = 0; b = 0; #5; $display("%b %b |    %b     |    %b   | %s", a, b, sol_taraf, sag_taraf, (sol_taraf == sag_taraf) ? "EVET ✅" : "HAYIR");
    a = 0; b = 1; #5; $display("%b %b |    %b     |    %b   | %s", a, b, sol_taraf, sag_taraf, (sol_taraf == sag_taraf) ? "EVET ✅" : "HAYIR");
    a = 1; b = 0; #5; $display("%b %b |    %b     |    %b   | %s", a, b, sol_taraf, sag_taraf, (sol_taraf == sag_taraf) ? "EVET ✅" : "HAYIR");
    a = 1; b = 1; #5; $display("%b %b |    %b     |    %b   | %s", a, b, sol_taraf, sag_taraf, (sol_taraf == sag_taraf) ? "EVET ✅" : "HAYIR");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== De Morgan 1. Teorem Doğrulama ===",
        "A B | ~(A & B) | ~A | ~B | Eşit mi?",
        "0 0 |    1     |    1   | EVET ✅",
        "0 1 |    1     |    1   | EVET ✅",
        "1 0 |    1     |    1   | EVET ✅",
        "1 1 |    0     |    0   | EVET ✅",
      ],
    },
    quiz: {
      question: "De Morgan kuralına göre ~(A | B) ifadesinin eşdeğeri aşağıdakilerden hangisidir?",
      options: ["A) ~A & ~B", "B) ~A | ~B", "C) A & B", "D) ~(A & B)"],
      correctIndex: 0,
      explanation: "Doğru! De Morgan teoremine göre bir VEYA (OR) işleminin değili, bileşenlerin değillerinin VE (AND) işlemine eşittir: ~(A | B) = ~A & ~B.",
    },
  },

  "df-karnaugh-maps": {
    id: "df-karnaugh-maps",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Karnaugh Haritaları (K-Map) ile Sadeleştirme",
    subtitle: "Gray kodu dizilimi, 2-3-4 değişkenli K-Map tabloları, 2'nin kuvvetleri şeklinde gruplama ve Don't Care durumları.",
    sections: [
      {
        title: "1. K-Map Mantığı ve Gray Kodu Düzeni",
        content: `Karnaugh Haritası (K-Map), Boole cebirsel ifadelerini görsel bir ızgara üzerinde en az sayıda kapıyla gerçeklemek için sadeleştirme tekniğidir.
Tablonun satır ve sütunları **Gray Kodu (00, 01, 11, 10)** şeklinde sıralanır. Bu sayede komşu hücreler arasında yalnızca tek bir değişkenin değeri değişir.`,
      },
      {
        title: "2. Gruplama Kuralları ve Don't Care (X)",
        content: `- Gruplar mutlaka **1, 2, 4, 8, 16 (2'nin kuvveti)** boyutunda dikdörtgen veya kareler olmalıdır.
- Gruplar mümkün olduğunca BÜYÜK seçilmelidir (Grup ne kadar büyükse ifade o kadar sadeleşir).
- Tablo kenarları birbiriyle bitişiktir (Toroid yapısı: En sağdaki sütun en soldaki sütunla komşudur!).
- **Don't Care (X - Farketmez):** Devrenin normal çalışmasında asla gelmeyecek durumlar 1 veya 0 kabul edilerek grupları büyütmek için joker olarak kullanılır.`,
      },
    ],
    playground: {
      title: "K-Map Sadeleştirilmiş Mantık Eşdeğerlik Testi",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_kmap;
  reg a, b, c;
  wire ham_ifade, sadelesmis_ifade;

  // Ham İfade: Y = (~A & ~B & C) | (~A & B & C) | (A & B & C)
  assign ham_ifade = (~a & ~b & c) | (~a & b & c) | (a & b & c);
  
  // K-Map Sadeleştirmesi Sonucu: Y = (~A & C) | (B & C) = C & (~A | B)
  assign sadelesmis_ifade = c & (~a | b);

  initial begin
    $display("=== K-Map Sadeleştirme Eşdeğerlik Testi ===");
    $display("A B C | Ham İfade | K-Map Sonucu | Eşit mi?");

    for (integer i = 0; i < 8; i = i + 1) begin
      {a, b, c} = i[2:0]; #5;
      $display("%b %b %b |     %b     |      %b       | %s", 
               a, b, c, ham_ifade, sadelesmis_ifade, 
               (ham_ifade == sadelesmis_ifade) ? "TAM UYUMLU ✅" : "HATA");
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== K-Map Sadeleştirme Eşdeğerlik Testi ===",
        "A B C | Ham İfade | K-Map Sonucu | Eşit mi?",
        "0 0 0 |     0     |      0       | TAM UYUMLU ✅",
        "0 0 1 |     1     |      1       | TAM UYUMLU ✅",
        "0 1 0 |     0     |      0       | TAM UYUMLU ✅",
        "0 1 1 |     1     |      1       | TAM UYUMLU ✅",
        "1 0 0 |     0     |      0       | TAM UYUMLU ✅",
        "1 0 1 |     0     |      0       | TAM UYUMLU ✅",
        "1 1 0 |     0     |      0       | TAM UYUMLU ✅",
        "1 1 1 |     1     |      1       | TAM UYUMLU ✅",
      ],
    },
    quiz: {
      question: "Karnaugh Haritasında (K-Map) satır ve sütun başlıkları neden standart ikilik sıra (00, 01, 10, 11) yerine Gray koduyla (00, 01, 11, 10) dizilir?",
      options: [
        "A) Komşu hücreler arasında yalnızca tek bir değişkenin değişmesini sağlayıp ortak paranteze almayı mümkün kılmak için",
        "B) Tabloyu daha estetik göstermek için",
        "C) 3'lük tabana geçmek için",
        "D) 0 sayısını ortadan kaldırmak için",
      ],
      correctIndex: 0,
      explanation: "Doğru! Gray kodu dizilimi sayesinde fiziksel olarak yan yana olan her iki hücre arasında yalnızca 1 bit değişir; bu sayede 1'ler gruplandığında o değişken sadeleşerek yok olur.",
    },
  },

  "df-universal-gates": {
    id: "df-universal-gates",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Evrensel Kapılar: Yalnızca NAND ve NOR ile Tasarım",
    subtitle: "Universal Gates kavramı; yalnızca NAND kullanarak NOT, AND, OR, XOR kapılarını türetme.",
    sections: [
      {
        title: "1. Neden NAND ve NOR 'Evrensel' (Universal) Kapıdır?",
        content: `Dijital elektronikte bir kapı ailesiyle diğer TÜM mantık fonksiyonları (NOT, AND, OR, XOR) üretilebiliyorsa o kapıya **Evrensel Kapı (Universal Gate)** denir.
Çip fabrikalarında (foundry) tek tip bir NAND kapısı şablonu kullanılarak devasa entegre devreler üretilebilir.`,
      },
      {
        title: "2. NAND Kapısından Diğer Kapıların Türetilmesi",
        content: `- **NOT Kapısı:** Girişleri birbirine bağla -> \`~(A & A) = ~A\`.
- **AND Kapısı:** NAND çıkışına bir NOT (NAND) bağla -> \`~(~(A & B)) = A & B\`.
- **OR Kapısı:** De Morgan kuralı ile girişlerin değillerini alıp NAND'e ver -> \`~(~A & ~B) = A | B\`.`,
      },
    ],
    playground: {
      title: "Yalnızca NAND ile OR ve AND Kapısı Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_universal;
  reg a, b;
  wire and_nand, or_nand;

  // Yalnızca NAND ile AND: ~( ~(A & B) & ~(A & B) )
  wire nand_ab = ~(a & b);
  assign and_nand = ~(nand_ab & nand_ab);

  // Yalnızca NAND ile OR: ~( ~A & ~B )
  wire not_a = ~(a & a);
  wire not_b = ~(b & b);
  assign or_nand = ~(not_a & not_b);

  initial begin
    $display("=== Yalnızca NAND ile Türetilen Kapılar ===");
    $display("A B | OR (~( ~A & ~B )) | AND (~(NAND & NAND))");

    a = 0; b = 0; #5; $display("%b %b |         %b        |         %b", a, b, or_nand, and_nand);
    a = 0; b = 1; #5; $display("%b %b |         %b        |         %b", a, b, or_nand, and_nand);
    a = 1; b = 0; #5; $display("%b %b |         %b        |         %b", a, b, or_nand, and_nand);
    a = 1; b = 1; #5; $display("%b %b |         %b        |         %b", a, b, or_nand, and_nand);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Yalnızca NAND ile Türetilen Kapılar ===",
        "A B | OR (~( ~A & ~B )) | AND (~(NAND & NAND))",
        "0 0 |         0        |         0",
        "0 1 |         1        |         0",
        "1 0 |         1        |         0",
        "1 1 |         1        |         1",
      ],
    },
    quiz: {
      question: "Tek bir NAND kapısının iki giriş ucu birbirine kısa devre edilip tek bir giriş haline getirilirse hangi mantık kapısı elde edilir?",
      options: ["A) AND", "B) NOT (İnverter)", "C) OR", "D) XOR"],
      correctIndex: 1,
      explanation: "Doğru! Girişler birleştirildiğinde çıkış ~(A & A) = ~A olur; yani kapı bir NOT (inverter) eviricisine dönüşür.",
    },
  },

  "df-sop-pos": {
    id: "df-sop-pos",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "SOP vs POS ve Gerçek Silikon Karşılıkları",
    subtitle: "Minterm (SOP - Sum of Products), Maxterm (POS - Product of Sums) ve iki kademeli mantık ağları.",
    sections: [
      {
        title: "1. SOP (Sum of Products - Çarpımlar Toplamı)",
        content: `Doğruluk tablosunda çıkışı **1** olan durumların (Mintermlerin) AND kapılarıyla çarpılıp, sonuçların tek bir OR kapısında toplanmasıdır (\`Y = (A & B) | (~A & C)\`).
Silikonda iki kademeli **NAND-NAND** mantığı doğrudan SOP formuna eşittir.`,
      },
      {
        title: "2. POS (Product of Sums - Toplamlar Çarpımı)",
        content: `Doğruluk tablosunda çıkışı **0** olan durumların (Maxtermlerin) OR kapılarıyla toplanıp, sonuçların tek bir AND kapısında çarpılmasıdır (\`Y = (A | B) & (~A | C)\`).
Silikonda iki kademeli **NOR-NOR** mantığı doğrudan POS formuna eşittir.`,
      },
    ],
    playground: {
      title: "SOP ve POS Mantıksal Eşdeğerlik Doğrulaması",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_sop_pos;
  reg a, b;
  wire y_sop, y_pos;

  // XOR fonksiyonu örneği
  // SOP: (A & ~B) | (~A & B)
  assign y_sop = (a & ~b) | (~a & b);
  // POS: (A | B) & (~A | ~B)
  assign y_pos = (a | b) & (~a | ~b);

  initial begin
    $display("=== SOP vs POS Eşdeğerlik Testi (XOR) ===");
    $display("A B | SOP | POS | Eşit mi?");

    a = 0; b = 0; #5; $display("%b %b |  %b  |  %b  | %s", a, b, y_sop, y_pos, (y_sop == y_pos) ? "EVET ✅" : "HAYIR");
    a = 0; b = 1; #5; $display("%b %b |  %b  |  %b  | %s", a, b, y_sop, y_pos, (y_sop == y_pos) ? "EVET ✅" : "HAYIR");
    a = 1; b = 0; #5; $display("%b %b |  %b  |  %b  | %s", a, b, y_sop, y_pos, (y_sop == y_pos) ? "EVET ✅" : "HAYIR");
    a = 1; b = 1; #5; $display("%b %b |  %b  |  %b  | %s", a, b, y_sop, y_pos, (y_sop == y_pos) ? "EVET ✅" : "HAYIR");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== SOP vs POS Eşdeğerlik Testi (XOR) ===",
        "A B | SOP | POS | Eşit mi?",
        "0 0 |  0  |  0  | EVET ✅",
        "0 1 |  1  |  1  | EVET ✅",
        "1 0 |  1  |  1  | EVET ✅",
        "1 1 |  0  |  0  | EVET ✅",
      ],
    },
    quiz: {
      question: "İki kademeli bir NAND-NAND mantık devresi Boole cebrinde hangi kanonik forma doğrudan denktir?",
      options: ["A) SOP (Sum of Products)", "B) POS (Product of Sums)", "C) Yalnızca XOR", "D) Flip-Flop"],
      correctIndex: 0,
      explanation: "Doğru! De Morgan teoremine göre iki kademeli NAND-NAND mantığı doğrudan AND-OR yani Çarpımların Toplamı (SOP) mimarisine eşittir.",
    },
  },

  "df-hazards-glitches": {
    id: "df-hazards-glitches",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Mantık Tehlikeleri (Hazards) ve Glitch Önleme",
    subtitle: "Statik-1 ve Statik-0 tehlikeleri, kapı gecikmesi uyumsuzlukları ve K-Map konsensus terimi ekleme.",
    sections: [
      {
        title: "1. Glitch ve Hazard Nedir?",
        content: `İdeal matematikte \`A\` ile \`~A\` anında zıt değerdedir. Ancak gerçek silikonda bir sinyalin tersini üreten inverter kapısının birkaç pikosaniyelik bir **gecikmesi (propagation delay)** vardır.
Giriş değiştiğinde çıkışın sabit kalması gerekirken anlık olarak zıt değere sıçrayıp geri dönmesine **Glitch (Kısa Darbe)**, bu duruma yol açan devre zafiyetine ise **Hazard (Tehlike)** denir:
- **Statik-1 Tehlikesi:** Çıkışın 1 kalması gerekirken anlık 0'a düşmesi.
- **Statik-0 Tehlikesi:** Çıkışın 0 kalması gerekirken anlık 1'e fırlaması.`,
      },
      {
        title: "2. K-Map Konsensus Terimi ile Çözüm",
        content: `Bir K-Map'te iki ayrı grup birbirine teğet geçtiğinde, bir gruptan diğerine atlama anında glitch oluşur. Çözüm, bu iki grubu birbirine bağlayan fazladan bir örtüşme grubu (**Konsensus Terimi**) eklemektir.`,
      },
    ],
    playground: {
      title: "Gecikmeli İnverter Kaynaklı Glitch Simülatörü",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `\`timescale 1ns/1ps
module tb_glitch;
  reg a;
  wire not_a;
  wire glitch_out;

  // İnverter kapısına 2ns yayılma gecikmesi veriyoruz
  assign #2 not_a = ~a;
  // A | ~A teoride her zaman 1 olmalı!
  assign glitch_out = a | not_a;

  initial begin
    $display("=== Kapı Gecikmeli Glitch Simülasyonu ===");
    a = 1; #10;
    
    // a 1'den 0'a düşüyor: a anında 0 olur ama not_a 2ns sonra 1 olacak!
    // Bu 2ns aralıkta ikisi de 0 kalır ve çıkış 0'a çöker (Glitch)!
    a = 0; #1;
    $display("Zaman: %0t ps | a=%b, not_a=%b -> GLITCH ÇIKIŞI: %b (1 olması gerekirken 0 oldu!)", 
             $time, a, not_a, glitch_out);
    #5;
    $display("Zaman: %0t ps | not_a güncellendi -> Çıkış düzeldi: %b", $time, glitch_out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Kapı Gecikmeli Glitch Simülasyonu ===",
        "Zaman: 11000 ps | a=0, not_a=0 -> GLITCH ÇIKIŞI: 0 (1 olması gerekirken 0 oldu!)",
        "Zaman: 16000 ps | not_a güncellendi -> Çıkış düzeldi: 1",
      ],
    },
    quiz: {
      question: "Bileşik mantık devrelerinde çıkışın sabit 1 kalması gerekirken kapı gecikmesi uyumsuzluğu nedeniyle anlık olarak 0'a düşüp geri gelmesine ne ad verilir?",
      options: ["A) Statik-1 Tehlikesi (Static-1 Hazard)", "B) Statik-0 Tehlikesi", "C) Saat eğrilmesi", "D) Metastability"],
      correctIndex: 0,
      explanation: "Doğru! Çıkışın 1 olması gereken bir durumda geçici olarak 0 glitch'i üretilmesine 'Statik-1 Tehlikesi' denir.",
    },
  },

  // ========================================================
  // BÖLÜM 7: BİLEŞİK MANTIK BLOKLARI (COMBINATIONAL LOGIC)
  // ========================================================
  "df-combinational-logic": {
    id: "df-combinational-logic",
    badge: "Bölüm 7 • Bileşik Mantık",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Bileşik Mantık İlkeleri ve Doğruluk Tabloları",
    subtitle: "Hafızasız (Memoryless) devreler, geri beslemesiz akış ve doğruluk tablosundan devre sentezi.",
    sections: [
      {
        title: "1. Bileşik Mantık (Combinational Logic) Nedir?",
        content: `Bir devrenin çıkışları **YALNIZCA o andaki girişlerin durumuna bağlıysa**, geçmişteki durumları hatırlamıyorsa buna **Bileşik Mantık** denir:
- Bellek elemanı (Flip-Flop, Latch) içermez.
- Saat sinyali (Clock) kullanmaz.
- Geri besleme (Feedback) döngüsü yoktur.
- **Örnekler:** Toplayıcılar, Multiplexer'lar, Kod çözücüler, Karşılaştırıcılar.`,
      },
    ],
    playground: {
      title: "Bileşik Mantık Fonksiyon Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_comb;
  reg [2:0] in;
  wire out;

  // Çoğunluk Fonksiyonu (Majority Logic): 3 bitten en az 2'si 1 ise çıkış 1
  assign out = (in[0] & in[1]) | (in[1] & in[2]) | (in[0] & in[2]);

  initial begin
    $display("=== 3-Girişli Çoğunluk Oylama Devresi ===");
    $display("Giriş (A B C) | Çıkış (En az iki 1 var mı?)");

    for (integer i = 0; i < 8; i = i + 1) begin
      in = i[2:0]; #5;
      $display("    %b        |   %b", in, out);
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 3-Girişli Çoğunluk Oylama Devresi ===",
        "Giriş (A B C) | Çıkış (En az iki 1 var mı?)",
        "    000       |   0",
        "    001       |   0",
        "    010       |   0",
        "    011       |   1",
        "    100       |   0",
        "    101       |   1",
        "    110       |   1",
        "    111       |   1",
      ],
    },
    quiz: {
      question: "Bileşik mantık (Combinational Logic) devrelerinin en ayırt edici özelliği nedir?",
      options: [
        "A) Çıkışın yalnızca mevcut girişlere bağlı olması ve hiçbir bellek/saat elemanı içermemesi",
        "B) Mutlaka bir saat (clock) kristaliyle çalışması",
        "C) Önceki durumları RAM'de saklaması",
        "D) Sadece analog ses üretmesi",
      ],
      correctIndex: 0,
      explanation: "Doğru! Bileşik devreler hafızasızdır (memoryless); çıkış doğrudan anlık giriş kombinasyonunun mantıksal sonucudur.",
    },
  },

  "df-decoders": {
    id: "df-decoders",
    badge: "Bölüm 7 • Bileşik Mantık",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Sayısal Kod Çözücüler (Decoders: 2-to-4, 3-to-8)",
    subtitle: "N-to-2^N kod çözücü mimarisi, Enable pini ve bellek adres çözme donanımı.",
    sections: [
      {
        title: "1. Kod Çözücü (Decoder) Nedir ve Nerede Kullanılır?",
        content: `Bir kod çözücü, \`N\` bitlik ikilik giriş kodunu alır ve \`2^N\` adet çıkış hattından **yalnızca bir tanesini aktif (1)** yapar.
En yaygın kullanım alanı **Bellek Adres Çözümlemedir (Address Decoding)**: İşlemci 10 bitlik bir bellek adresi verdiğinde, bir kod çözücü 1024 bellek satırından tam olarak istenen satırın \`Wordline\` kablosunu aktif hale getirir.`,
      },
    ],
    playground: {
      title: "2-to-4 Enable Destekli Kod Çözücü Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_decoder;
  reg [1:0] in;
  reg en;
  wire [3:0] out;

  // 2-to-4 Decoder with Enable
  assign out = en ? (1'b1 << in) : 4'b0000;

  initial begin
    $display("=== 2-to-4 Kod Çözücü Testi ===");
    $display("EN | IN | ÇIKIŞLAR (Y3 Y2 Y1 Y0)");

    en = 0; in = 2'b10; #5; $display("%b  | %b | %b (Enable kapalı, çıkış yok)", en, in, out);
    en = 1; in = 2'b00; #5; $display("%b  | %b | %b (Hat 0 seçildi)", en, in, out);
    en = 1; in = 2'b01; #5; $display("%b  | %b | %b (Hat 1 seçildi)", en, in, out);
    en = 1; in = 2'b10; #5; $display("%b  | %b | %b (Hat 2 seçildi)", en, in, out);
    en = 1; in = 2'b11; #5; $display("%b  | %b | %b (Hat 3 seçildi)", en, in, out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 2-to-4 Kod Çözücü Testi ===",
        "EN | IN | ÇIKIŞLAR (Y3 Y2 Y1 Y0)",
        "0  | 10 | 0000 (Enable kapalı, çıkış yok)",
        "1  | 00 | 0001 (Hat 0 seçildi)",
        "1  | 01 | 0010 (Hat 1 seçildi)",
        "1  | 10 | 0100 (Hat 2 seçildi)",
        "1  | 11 | 1000 (Hat 3 seçildi)",
      ],
    },
    quiz: {
      question: "3 bitlik giriş adresine sahip standart bir kod çözücünün (3-to-8 Decoder) kaç adet çıkış hattı bulunur?",
      options: ["A) 3", "B) 6", "C) 8 (2^3)", "D) 16"],
      correctIndex: 2,
      explanation: "Doğru! N girişli bir decoder 2^N adet çıkışa sahiptir; 3 girişli bir decoder 2^3 = 8 çıkış hattı barındırır.",
    },
  },

  "df-encoders": {
    id: "df-encoders",
    badge: "Bölüm 7 • Bileşik Mantık",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Kodlayıcılar ve Öncelikli Kodlayıcı (Priority Encoders)",
    subtitle: "2^N-to-N kodlayıcı mimarisi ve birden fazla kesme (interrupt) geldiğinde öncelik yönetimi.",
    sections: [
      {
        title: "1. Öncelikli Kodlayıcı (Priority Encoder) Neden Gereklidir?",
        content: `Standart bir kodlayıcıda aynı anda birden fazla giriş 1 olursa çıkış anlamsızlaşır.
İşlemcilerde birden fazla donanım aynı anda kesme (Interrupt) talep edebilir. **Öncelikli Kodlayıcı (Priority Encoder)**, aynı anda birden fazla giriş aktif olduğunda **en yüksek öncelikli olanın (en büyük indeksin)** kodunu çıkışa verir.`,
      },
    ],
    playground: {
      title: "4-to-2 Öncelikli Kodlayıcı Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_encoder;
  reg [3:0] in;
  reg [1:0] out;
  reg valid;

  always @(*) begin
    valid = 1;
    if (in[3])      out = 2'b11; // En yüksek öncelik
    else if (in[2]) out = 2'b10;
    else if (in[1]) out = 2'b01;
    else if (in[0]) out = 2'b00;
    else begin
      out = 2'b00;
      valid = 0;
    end
  end

  initial begin
    $display("=== 4-to-2 Priority Encoder Testi ===");
    $display("Giriş (D3 D2 D1 D0) | Kod | Valid");

    in = 4'b0000; #5; $display("     %b          |  %b |   %b (Aktif giriş yok)", in, out, valid);
    in = 4'b0010; #5; $display("     %b          |  %b |   %b", in, out, valid);
    // Hem D1 hem D3 aktif: D3 kazanmalı!
    in = 4'b1010; #5; $display("     %b          |  %b |   %b (D3 öncelikli kazandı!)", in, out, valid);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 4-to-2 Priority Encoder Testi ===",
        "Giriş (D3 D2 D1 D0) | Kod | Valid",
        "     0000          |  00 |   0 (Aktif giriş yok)",
        "     0010          |  01 |   1",
        "     1010          |  11 |   1 (D3 öncelikli kazandı!)",
      ],
    },
    quiz: {
      question: "Bir işlemcinin kesme kontrol biriminde (Interrupt Controller) aynı anda gelen birden fazla donanım kesmesini yönetmek için hangi devre kullanılır?",
      options: ["A) Öncelikli Kodlayıcı (Priority Encoder)", "B) Tam Toplayıcı", "C) Sayaç", "D) Latch"],
      correctIndex: 0,
      explanation: "Doğru! Öncelikli kodlayıcı aynı anda birden fazla hat aktif olduğunda en yüksek önceliğe sahip hattın ikilik kodunu belirler.",
    },
  },

  "df-multiplexers": {
    id: "df-multiplexers",
    badge: "Bölüm 7 • Bileşik Mantık",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Çoklayıcılar (Multiplexers - MUX: 2:1, 4:1)",
    subtitle: "Sayısal veri yönlendirme vanası, seçim hatları (Select lines) ve MUX ile Boole fonksiyonu üretme.",
    sections: [
      {
        title: "1. Çoklayıcı (Multiplexer - MUX) Nedir?",
        content: `**MUX**, birden fazla veri girişinden bir tanesini seçici sinyallere (\`sel\`) göre seçip tek bir çıkış hattına ileten sayısal bir döner anahtardır (vanadır):
- \`2^N\` adet veri girişini seçmek için **\`N\` adet seçim hattı** gerekir (örneğin 4:1 MUX için 2 bit seçim hattı).
- Modern işlemcilerin veri yollarında (ALU girişleri, register yönlendirmeleri) en çok kullanılan devredir.`,
      },
    ],
    playground: {
      title: "4:1 MUX Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_mux;
  reg [3:0] in;
  reg [1:0] sel;
  wire out;

  // 4:1 MUX Mantığı
  assign out = in[sel];

  initial begin
    $display("=== 4:1 Çoklayıcı (MUX) Testi ===");
    in = 4'b1010; // D3=1, D2=0, D1=1, D0=0
    $display("Girişler: D3=1, D2=0, D1=1, D0=0");

    sel = 2'b00; #5; $display("Sel = 00 -> Çıkış: %b (D0)", out);
    sel = 2'b01; #5; $display("Sel = 01 -> Çıkış: %b (D1)", out);
    sel = 2'b10; #5; $display("Sel = 10 -> Çıkış: %b (D2)", out);
    sel = 2'b11; #5; $display("Sel = 11 -> Çıkış: %b (D3)", out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 4:1 Çoklayıcı (MUX) Testi ===",
        "Girişler: D3=1, D2=0, D1=1, D0=0",
        "Sel = 00 -> Çıkış: 0 (D0)",
        "Sel = 01 -> Çıkış: 1 (D1)",
        "Sel = 10 -> Çıkış: 0 (D2)",
        "Sel = 11 -> Çıkış: 1 (D3)",
      ],
    },
    quiz: {
      question: "8 farklı veri girişinden birini seçip tek bir hatta aktarmak için (8:1 MUX) kaç adet seçim (Select) hattı gereklidir?",
      options: ["A) 2", "B) 3 (2^3 = 8)", "C) 4", "D) 8"],
      correctIndex: 1,
      explanation: "Doğru! 8 girişi adreslemek için 2^N = 8 eşitliğinden N = 3 adet seçim hattı gerekir.",
    },
  },

  "df-demultiplexers": {
    id: "df-demultiplexers",
    badge: "Bölüm 7 • Bileşik Mantık",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Tekleyiciler (Demultiplexers - DEMUX)",
    subtitle: "1-to-N dağıtıcı mimarisi, MUX ile simetri ve haberleşme veri dağıtımı.",
    sections: [
      {
        title: "1. DEMUX Nedir?",
        content: `DEMUX, MUX'un tam tersidir: Tek bir veri girişini (\`Din\`), seçim sinyallerine (\`sel\`) bağlı olarak \`2^N\` adet çıkış hattından seçilen birine aktarır, diğer çıkışları 0 yapar.`,
      },
    ],
    playground: {
      title: "1-to-4 DEMUX Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_demux;
  reg din;
  reg [1:0] sel;
  wire [3:0] dout;

  // 1-to-4 DEMUX
  assign dout = din ? (1'b1 << sel) : 4'b0000;

  initial begin
    $display("=== 1-to-4 DEMUX Dağıtıcı Testi ===");
    din = 1;
    sel = 2'b00; #5; $display("Din=1, Sel=00 -> Çıkış: %b", dout);
    sel = 2'b01; #5; $display("Din=1, Sel=01 -> Çıkış: %b", dout);
    sel = 2'b10; #5; $display("Din=1, Sel=10 -> Çıkış: %b", dout);
    sel = 2'b11; #5; $display("Din=1, Sel=11 -> Çıkış: %b", dout);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 1-to-4 DEMUX Dağıtıcı Testi ===",
        "Din=1, Sel=00 -> Çıkış: 0001",
        "Din=1, Sel=01 -> Çıkış: 0010",
        "Din=1, Sel=10 -> Çıkış: 0100",
        "Din=1, Sel=11 -> Çıkış: 1000",
      ],
    },
    quiz: {
      question: "Bir MUX ile DEMUX arasındaki temel işlevsel fark nedir?",
      options: [
        "A) MUX çok girişi tek çıkışa yönlendirirken, DEMUX tek girişi çok çıkıştan birine yönlendirir",
        "B) DEMUX sadece geceleri çalışır",
        "C) MUX bellektir, DEMUX ekrandır",
        "D) Hiçbir farkları yoktur",
      ],
      correctIndex: 0,
      explanation: "Doğru! MUX (Multiplexer) çoktan bire seçici iken, DEMUX (Demultiplexer) birden çoğa dağıtıcıdır.",
    },
  },

  "df-half-full-adder": {
    id: "df-half-full-adder",
    badge: "Bölüm 7 • Bileşik Mantık",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Yarım Toplayıcı (Half Adder) ve Tam Toplayıcı (Full Adder)",
    subtitle: "Sum ve Carry denklemleri, Ripple Carry Adder mimarisi ve Carry Lookahead (CLA) farkı.",
    sections: [
      {
        title: "1. Yarım Toplayıcı (Half Adder)",
        content: `İki adet 1-bitlik sayıyı (A ve B) toplar:
- **Sum (Toplam):** \`S = A ^ B\` (XOR Kapısı)
- **Carry (Elde):** \`C = A & B\` (AND Kapısı)
Önceki basamaktan gelen bir elde (Cin) girişini kabul edemediği için 'yarım' olarak adlandırılır.`,
      },
      {
        title: "2. Tam Toplayıcı (Full Adder)",
        content: `Üç adet 1-bitlik sayıyı (A, B ve önceki basamağın eldesi Cin) toplar:
- **Sum:** \`S = A ^ B ^ Cin\`
- **Cout:** \`Cout = (A & B) | (Cin & (A ^ B))\`
İki adet Half Adder ve bir OR kapısıyla kurulabilir. Çok bitlik toplayıcıların (ör. 32-bit Ripple Carry Adder) yapı taşıdır.`,
      },
    ],
    playground: {
      title: "1-Bit Full Adder Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_full_adder;
  reg a, b, cin;
  wire sum, cout;

  assign sum  = a ^ b ^ cin;
  assign cout = (a & b) | (cin & (a ^ b));

  initial begin
    $display("=== 1-Bit Full Adder Testi ===");
    $display("A B Cin | SUM COUT");

    a=0; b=0; cin=0; #5; $display("%b %b  %b  |  %b    %b", a, b, cin, sum, cout);
    a=0; b=1; cin=0; #5; $display("%b %b  %b  |  %b    %b", a, b, cin, sum, cout);
    a=1; b=1; cin=0; #5; $display("%b %b  %b  |  %b    %b (1+1 = 2 -> Sum:0 Cout:1)", a, b, cin, sum, cout);
    a=1; b=1; cin=1; #5; $display("%b %b  %b  |  %b    %b (1+1+1=3 -> Sum:1 Cout:1)", a, b, cin, sum, cout);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 1-Bit Full Adder Testi ===",
        "A B Cin | SUM COUT",
        "0 0  0  |  0    0",
        "0 1  0  |  1    0",
        "1 1  0  |  0    1 (1+1 = 2 -> Sum:0 Cout:1)",
        "1 1  1  |  1    1 (1+1+1=3 -> Sum:1 Cout:1)",
      ],
    },
    quiz: {
      question: "Tam Toplayıcı (Full Adder) devresinin Yarım Toplayıcıdan (Half Adder) temel farkı nedir?",
      options: [
        "A) Önceki basamaktan gelen bir elde (Cin) girişine sahip olması",
        "B) Sadece çıkarma yapabilmesi",
        "C) Analog çalışması",
        "D) Çıkışında elde üretmemesi",
      ],
      correctIndex: 0,
      explanation: "Doğru! Full Adder, alt basamaktan taşan elde girişini (Cin) hesaba katar; böylece yan yana bağlanarak 32-bit veya 64-bit toplayıcılar oluşturulabilir.",
    },
  },

  "df-comparators-alu": {
    id: "df-comparators-alu",
    badge: "Bölüm 7 • Bileşik Mantık",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Karşılaştırıcılar (Comparators) ve ALU Mimarisi",
    subtitle: "Büyüktür, Küçüktür, Eşittir devreleri ve mikroişlemcinin beyni Aritmetik Mantık Birimi (ALU).",
    sections: [
      {
        title: "1. Sayısal Karşılaştırıcı (Magnitude Comparator)",
        content: `İki ikilik sayıyı (A ve B) karşılaştırarak 3 bayrak üretir:
- \`A == B\`: Karşılıklı tüm bitlerin XNOR (\`~(A ^ B)\`) sonuçlarının AND'lenmesidir.
- \`A > B\` ve \`A < B\`: MSB'den başlayarak ilk farklılaşan bitin incelenmesiyle belirlenir.`,
      },
      {
        title: "2. Aritmetik Mantık Birimi (ALU)",
        content: `ALU, CPU'nun tüm matematiksel ve mantıksal hesaplamalarını yapan merkezidir. Bir kontrol kodu (\`Opcode\`) ile toplayıcı, çıkarıcı, AND, OR, XOR veya kaydırma operasyonlarından hangisinin çalıştırılacağını seçer.`,
      },
    ],
    playground: {
      title: "Mini 4-İşlemli ALU Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_alu;
  reg [3:0] a, b;
  reg [1:0] op; // 00: TOPLA, 01: ÇIKAR, 10: AND, 11: OR
  reg [3:0] res;

  always @(*) begin
    case (op)
      2'b00: res = a + b;
      2'b01: res = a - b;
      2'b10: res = a & b;
      2'b11: res = a | b;
    endcase
  end

  initial begin
    a = 4'd9; b = 4'd3;
    $display("=== Mini ALU Testi (A = %d, B = %d) ===", a, b);

    op = 2'b00; #5; $display("Op=00 (Topla) -> Sonuç: %d", res);
    op = 2'b01; #5; $display("Op=01 (Çıkar) -> Sonuç: %d", res);
    op = 2'b10; #5; $display("Op=10 (AND)   -> Sonuç: %b", res);
    op = 2'b11; #5; $display("Op=11 (OR)    -> Sonuç: %b", res);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Mini ALU Testi (A =  9, B =  3) ===",
        "Op=00 (Topla) -> Sonuç: 12",
        "Op=01 (Çıkar) -> Sonuç:  6",
        "Op=10 (AND)   -> Sonuç: 0001",
        "Op=11 (OR)    -> Sonuç: 1011",
      ],
    },
    quiz: {
      question: "İki n-bitlik sayının (A ve B) birbirine tam eşit olduğunu (A == B) doğrulamak için hangi mantık kapısı kullanılır?",
      options: ["A) XNOR kapısı", "B) Yalnızca OR kapısı", "C) Yalnızca NOT kapısı", "D) Latch"],
      correctIndex: 0,
      explanation: "Doğru! XNOR kapısı iki giriş birbirine eşit olduğunda 1 üretir; tüm basamakların XNOR çıkışları AND'lendiğinde tam eşitlik doğrulanır.",
    },
  },

  "df-propagation-delay": {
    id: "df-propagation-delay",
    badge: "Bölüm 7 • Bileşik Mantık",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Yayılma Gecikmesi (Propagation Delay) ve Kritik Yol",
    subtitle: "tpd, tcd (contamination delay), kritik yol (Critical Path) ve işlemcinin maksimum saat frekansı (Fmax).",
    sections: [
      {
        title: "1. Yayılma Gecikmesi (Propagation Delay - tpd) Nedir?",
        content: `Bir mantık kapısının girişindeki sinyal değiştiği anda çıkış anında değişemez; transistörlerin dirençleri ve kablo kapasitansları nedeniyle çıkışın %50 seviyesine ulaşması belirli bir zaman alır.
- **\`tpd\` (Propagation Delay):** Giriş %50 olduktan sonra çıkışın kararlı hale gelmesine kadar geçen maksimum süre.
- **\`tcd\` (Contamination Delay):** Giriş değiştikten sonra çıkışın değişmeye başladığı ilk minimum süre.`,
      },
      {
        title: "2. Kritik Yol (Critical Path) ve Fmax",
        content: `İki flip-flop arasındaki en uzun gecikmeli bileşik mantık yoluna **Kritik Yol (Critical Path)** denir.
Çipin maksimum çalışabileceği saat frekansı (\`Fmax\`) doğrudan bu en yavaş yolun süresiyle sınırlandırılır:
\`T_clock ≥ t_clk_to_q + t_kritik_yol + t_setup\`
\`Fmax = 1 / T_clock\`
Çipi hızlandırmak isteyen bir mühendis kritik yoldaki en yavaş mantık kapılarını optimize eder veya araya pipeline kaydedicileri ekler!`,
      },
    ],
    playground: {
      title: "Kritik Yol Gecikmesi ve Maksimum Frekans (Fmax) Hesabı",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_timing;
  real t_clk_q_ns, t_setup_ns, t_logic_ns;
  real t_cycle_min_ns, f_max_MHz;

  initial begin
    t_clk_q_ns = 0.15; // 150 ps Flop çıkış gecikmesi
    t_setup_ns = 0.10; // 100 ps Kurulum kısıtı
    t_logic_ns = 0.75; // 750 ps Kritik yol mantık gecikmesi

    t_cycle_min_ns = t_clk_q_ns + t_logic_ns + t_setup_ns; // 1.0 ns
    f_max_MHz = (1.0 / t_cycle_min_ns) * 1000.0;

    $display("=== Statik Zamanlama Analizi (STA) ===");
    $display("t_clk_q : %5.2f ns", t_clk_q_ns);
    $display("t_logic : %5.2f ns (Kritik Yol)", t_logic_ns);
    $display("t_setup : %5.2f ns", t_setup_ns);
    $display("--------------------------------");
    $display("Minimum Saat Periyodu : %5.2f ns", t_cycle_min_ns);
    $display("Maksimum Frekans (Fmax): %5.0f MHz (1 GHz!)", f_max_MHz);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Statik Zamanlama Analizi (STA) ===",
        "t_clk_q :  0.15 ns",
        "t_logic :  0.75 ns (Kritik Yol)",
        "t_setup :  0.10 ns",
        "--------------------------------",
        "Minimum Saat Periyodu :  1.00 ns",
        "Maksimum Frekans (Fmax):  1000 MHz (1 GHz!)",
      ],
    },
    quiz: {
      question: "Bir dijital işlemcinin çalışabileceği maksimum saat frekansını (Fmax) doğrudan sınırlayan faktör nedir?",
      options: [
        "A) İki kaydedici arasındaki en uzun gecikmeye sahip yol (Kritik Yol)",
        "B) Ekran parlaklığı",
        "C) Monitörün yenileme hızı",
        "D) Güç kablosunun uzunluğu",
      ],
      correctIndex: 0,
      explanation: "Doğru! Saat periyodu en azından en uzun gecikmeli yolun (Kritik Yol) hesaplamayı bitirip bir sonraki flip-flop'un kurulum zamanını karşılayacağı kadar uzun olmak zorundadır.",
    },
  },
};
