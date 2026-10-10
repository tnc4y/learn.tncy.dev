import { LessonContent } from "./lessonsData";

export const DIGITAL_FUNDAMENTALS_PART2: Record<string, LessonContent> = {
  // ========================================================
  // BÖLÜM 4: CMOS MANTIK KAPILARI (GATE INTERNALS)
  // ========================================================
  "df-cmos-inverter": {
    id: "df-cmos-inverter",
    badge: "Bölüm 4 • CMOS Kapıları",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "CMOS İnverter (Evirici) Mimarisi ve VTC Eğrisi",
    subtitle: "Pull-Up PMOS, Pull-Down NMOS, gerilim transfer karakteristiği (VTC), gürültü marjları ve geçiş noktası (VM).",
    sections: [
      {
        title: "1. CMOS (Complementary MOS) Kavramı",
        content: `**CMOS**, bir PMOS ve bir NMOS transistörün tamamlayıcı (biri açıkken diğerinin kapalı olduğu) şekilde bağlanmasıdır.
Bir **CMOS İnverter** devresinde:
- Giriş (Vin) = 0V (LOW) iken: Üstteki PMOS iletime geçer, alttaki NMOS kesimdedir. Çıkış VDD'ye bağlanır -> **Vout = 1 (HIGH)**.
- Giriş (Vin) = VDD (HIGH) iken: Üstteki PMOS kesime gider, alttaki NMOS iletime geçer. Çıkış GND'ye bağlanır -> **Vout = 0 (LOW)**.

**Sıfır Statik Güç:** Kararlı durumda VDD ile GND arasında hiçbir zaman doğrudan bir kısa devre yolu yoktur! Güç yalnızca çıkış 0'dan 1'e veya 1'den 0'a geçerken harcanır.`,
      },
      {
        title: "2. Gerilim Transfer Karakteristiği (VTC Eğrisi)",
        content: `VTC eğrisi giriş voltajına (Vin) karşılık çıkış voltajını (Vout) gösteren grafiktir:
- **VM (Switching Threshold / Mantıksal Eşik):** \`Vin = Vout\` olduğu simetri noktasıdır. İdeal bir tasarımda \`VM = VDD / 2\` olmalıdır.
- **Wp / Wn Oranı:** Elektronlar deliklerden 2-3 kat hızlı olduğu için PMOS'un NMOS ile aynı akımı vermesi ve VM'nin tam ortada kalması için PMOS'un genişliği **\`Wp ≈ 2 ila 3 · Wn\`** seçilir.`,
      },
    ],
    playground: {
      title: "CMOS İnverter Davranışsal ve Mantık Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_cmos_inverter;
  reg in;
  wire out;

  // İdeal CMOS İnverter: out = ~in
  assign out = ~in;

  initial begin
    $display("=== CMOS İnverter Doğruluk Tablosu ===");
    $display("Vin (Gate) | Vout (Drain) | PMOS Durumu | NMOS Durumu");

    in = 0; #10;
    $display("   0 (GND) |   1 (VDD)    | İletimde    | Kesimde");

    in = 1; #10;
    $display("   1 (VDD) |   0 (GND)    | Kesimde     | İletimde");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== CMOS İnverter Doğruluk Tablosu ===",
        "Vin (Gate) | Vout (Drain) | PMOS Durumu | NMOS Durumu",
        "   0 (GND) |   1 (VDD)    | İletimde    | Kesimde",
        "   1 (VDD) |   0 (GND)    | Kesimde     | İletimde",
      ],
    },
    quiz: {
      question: "CMOS inverter hücresinde geçiş eşik gerilimini (VM) tam olarak besleme geriliminin yarısında (VDD/2) simetrik tutmak için hangi boyutlandırma kuralı uygulanır?",
      options: [
        "A) PMOS genişliği (Wp), NMOS genişliğinin (Wn) yaklaşık 2-3 katı yapılır",
        "B) NMOS genişliği PMOS'un 10 katı yapılır",
        "C) İki transistörün uzunlukları (L) birbirinden farklı seçilir",
        "D) NMOS transistör devreden çıkarılır",
      ],
      correctIndex: 0,
      explanation: "Doğru! Deliklerin hareketliliği (mobility) elektronlardan 2-3 kat düşük olduğundan, akımları eşitlemek ve simetrik VTC eğrisi elde etmek için PMOS transistör NMOS'tan 2-3 kat daha geniş (W) yapılır.",
    },
  },

  "df-cmos-nand": {
    id: "df-cmos-nand",
    badge: "Bölüm 4 • CMOS Kapıları",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "CMOS NAND Kapısı Mimarisi",
    subtitle: "Paralel PMOS Pull-Up, Seri NMOS Pull-Down ağı ve neden silikonda NAND NOR'dan daha hızlıdır.",
    sections: [
      {
        title: "1. CMOS NAND Kapısının Transistör Topolojisi",
        content: `İki girişli (A ve B) bir CMOS NAND kapısında:
- **Pull-Down Ağı (NMOS):** A ve B transistörleri **SERİ** bağlıdır. Çıkışın 0V'a çekilmesi için hem A'nın **VE** hem de B'nin 1 olması gerekir.
- **Pull-Up Ağı (PMOS):** A ve B transistörleri **PARALEL** bağlıdır. A veya B'den biri bile 0 olursa ilgili PMOS açılır ve çıkış 1'e çekilir.
Toplamda 2 adet NMOS ve 2 adet PMOS olmak üzere **4 transistör** kullanılır.`,
      },
      {
        title: "2. Neden Çiplerde NAND Kapısı NOR'dan Daha Hızlıdır?",
        content: `NAND kapısında yavaş olan PMOS transistörler paraleldir (dirençleri yarıya iner); seri olanlar ise hızlı olan NMOS transistörlerdir.
Buna karşılık NOR kapısında yavaş PMOS'lar seri bağlanır. Bu yüzden silikon üzerinde **NAND kapısı NOR kapısına kıyasla çok daha küçük alan kaplar ve belirgin şekilde daha hızlıdır**. Modern standart hücre kütüphanelerinde NAND kapısı temel yapı taşıdır.`,
      },
    ],
    playground: {
      title: "CMOS NAND Kapısı Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_cmos_nand;
  reg a, b;
  wire out;

  // 2-Girişli NAND
  assign out = ~(a & b);

  initial begin
    $display("=== 2-Girişli CMOS NAND Testi ===");
    $display("A | B | Çıkış (~(A & B))");
    
    a = 0; b = 0; #10; $display("%b | %b |   %b", a, b, out);
    a = 0; b = 1; #10; $display("%b | %b |   %b", a, b, out);
    a = 1; b = 0; #10; $display("%b | %b |   %b", a, b, out);
    a = 1; b = 1; #10; $display("%b | %b |   %b (Yalnızca her ikisi 1 iken 0)", a, b, out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 2-Girişli CMOS NAND Testi ===",
        "A | B | Çıkış (~(A & B))",
        "0 | 0 |   1",
        "0 | 1 |   1",
        "1 | 0 |   1",
        "1 | 1 |   0 (Yalnızca her ikisi 1 iken 0)",
      ],
    },
    quiz: {
      question: "2-girişli bir CMOS NAND kapısında NMOS ve PMOS transistörler sırasıyla nasıl bağlanır?",
      options: [
        "A) NMOS'lar seri, PMOS'lar paralel",
        "B) NMOS'lar paralel, PMOS'lar seri",
        "C) Hepsi birbirine seri",
        "D) Hepsi birbirine paralel",
      ],
      correctIndex: 0,
      explanation: "Doğru! NAND mantığında çıkışı 0'a çekmek için iki girişin de 1 olması gerektiğinden NMOS'lar seri bağlanır; çıkışı 1 yapmak için girişlerden birinin 0 olması yettiğinden PMOS'lar paralel bağlanır.",
    },
  },

  "df-cmos-nor": {
    id: "df-cmos-nor",
    badge: "Bölüm 4 • CMOS Kapıları",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "CMOS NOR Kapısı Mimarisi",
    subtitle: "Seri PMOS Pull-Up, Paralel NMOS Pull-Down ağı ve seri PMOS direnç cezası.",
    sections: [
      {
        title: "1. CMOS NOR Kapısının Yapısı",
        content: `İki girişli (A ve B) CMOS NOR kapısı NAND'ın tam simetrik tersidir:
- **Pull-Down Ağı (NMOS):** A ve B transistörleri **PARALEL** bağlıdır. Girişlerden biri bile 1 olursa çıkış 0V'a (GND) çekilir.
- **Pull-Up Ağı (PMOS):** A ve B transistörleri **SERİ** bağlıdır. Çıkışın 1 olması için A'nın **VE** B'nin her ikisinin birden 0 olması şarttır.`,
      },
      {
        title: "2. Seri PMOS Direnç Cezası",
        content: `Zaten elektronlara göre 3 kat yavaş olan boşlukları taşıyan iki PMOS transistör seri bağlandığında, yukarı çekme direnci ikiye katlanır (\`2 · Rp\`). Bu gecikmeyi telafi etmek için PMOS transistörlerin kanal genişliklerinin (W) devasa boyutlara çıkarılması gerekir; bu da kapının giriş kapasitansını artırır ve çip alanını şişirir.`,
      },
    ],
    playground: {
      title: "CMOS NOR Kapısı Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_cmos_nor;
  reg a, b;
  wire out;

  // 2-Girişli NOR
  assign out = ~(a | b);

  initial begin
    $display("=== 2-Girişli CMOS NOR Testi ===");
    $display("A | B | Çıkış (~(A | B))");
    
    a = 0; b = 0; #10; $display("%b | %b |   %b (Yalnızca her ikisi 0 iken 1)", a, b, out);
    a = 0; b = 1; #10; $display("%b | %b |   %b", a, b, out);
    a = 1; b = 0; #10; $display("%b | %b |   %b", a, b, out);
    a = 1; b = 1; #10; $display("%b | %b |   %b", a, b, out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 2-Girişli CMOS NOR Testi ===",
        "A | B | Çıkış (~(A | B))",
        "0 | 0 |   1 (Yalnızca her ikisi 0 iken 1)",
        "0 | 1 |   0",
        "1 | 0 |   0",
        "1 | 1 |   0",
      ],
    },
    quiz: {
      question: "CMOS NOR kapısının Pull-Up ağında seri bağlı PMOS transistörlerin bulunmasının devredeki olumsuz etkisi nedir?",
      options: [
        "A) Çıkışın 1'e yükselme süresinin (rise time) uzaması ve PMOS boyutlandırma zorunluluğu nedeniyle alanın büyümesi",
        "B) Kapının asla 0 üretememesi",
        "C) Devrenin statik kaçak akımının sıfır olması",
        "D) Frekansın sonsuza çıkması",
      ],
      correctIndex: 0,
      explanation: "Doğru! İki PMOS'un seri bağlanması çekme direncini katlar; bu da çıkış kapasitansının VDD'ye şarj olma süresini (yükselme gecikmesini) ciddi şekilde artırır.",
    },
  },

  "df-gate-sizing": {
    id: "df-gate-sizing",
    badge: "Bölüm 4 • CMOS Kapıları",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Kapı Boyutlandırma ve Sürüş Gücü (Gate Sizing & Logical Effort)",
    subtitle: "W/L kanal oranları, standart hücre sürücü güçleri (1X, 2X, 4X) ve Logical Effort teorisi.",
    sections: [
      {
        title: "1. Transistör Boyutlandırma Mantığı (W/L)",
        content: `Bir transistörün direnci kanal genişliğiyle ters orantılıdır (\`R ∝ 1/W\`).
Seri bağlı transistörlerin eşdeğer direnci artacağından:
- NAND kapısında seri 2 NMOS'un direnci \`2R\` olur; standart inverter gücüne ulaşmak için genişlikleri iki katına (\`2W\`) çıkarılır.
- Bir standart hücre kütüphanesinde kapıların yanında gördüğümüz **INV_X1, INV_X2, INV_X4** etiketleri, transistörlerin kanal genişliklerinin katlarını yani **Sürüş Gücünü (Drive Strength)** belirtir.`,
      },
      {
        title: "2. Mantıksal Çaba (Logical Effort - LE) Teorisi",
        content: `Sutherland ve Sproull tarafından geliştirilen **Logical Effort** teorisi, bir mantık kapısının bir invertere kıyasla ne kadar 'zor' akım verdiğini ölçer:
- **İnverter LE:** 1 (Referans)
- **2-Girişli NAND LE:** 4/3 ≈ 1.33
- **2-Girişli NOR LE:** 5/3 ≈ 1.67 (NOR'un NAND'dan daha verimsiz olduğunun matematiksel ispatı!)`,
      },
    ],
    playground: {
      title: "Kapı Sürüş Gücü (1X vs 4X) Gecikme Hesaplayıcısı",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_gate_sizing;
  // Gecikme = R_etkin * C_yuk
  real C_yuk_fF; // 50 fF yük kapasitansı
  real R_inverter_X1, R_inverter_X4;
  real gecikme_X1_ps, gecikme_X4_ps;

  initial begin
    C_yuk_fF = 50.0;
    R_inverter_X1 = 2000.0; // 1X kapı direnci: 2000 Ohm
    R_inverter_X4 = 500.0;  // 4X kapı direnci (4 kat geniş transistör): 500 Ohm

    gecikme_X1_ps = R_inverter_X1 * C_yuk_fF * 0.001;
    gecikme_X4_ps = R_inverter_X4 * C_yuk_fF * 0.001;

    $display("=== Sürücü Gücü vs Gecikme (C_load = 50 fF) ===");
    $display("Hücre Tipi | Etkin Direnç | Gecikme (ps)");
    $display("INV_X1     |   %4.0f Ohm   |  %5.1f ps", R_inverter_X1, gecikme_X1_ps);
    $display("INV_X4     |   %4.0f Ohm   |  %5.1f ps (4 kat daha hızlı sürdü!)", R_inverter_X4, gecikme_X4_ps);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Sürücü Gücü vs Gecikme (C_load = 50 fF) ===",
        "Hücre Tipi | Etkin Direnç | Gecikme (ps)",
        "INV_X1     |   2000 Ohm   |  100.0 ps",
        "INV_X4     |    500 Ohm   |   25.0 ps (4 kat daha hızlı sürdü!)",
      ],
    },
    quiz: {
      question: "Bir standart hücre kütüphanesinde 'NAND2_X4' hücresinin 'NAND2_X1' hücresine göre temel farkı nedir?",
      options: [
        "A) Transistör genişliklerinin yaklaşık 4 kat daha büyük olması, daha yüksek akım verip büyük yük kapasitanslarını daha hızlı sürebilmesi",
        "B) 4 kat daha fazla mantık girişi alması",
        "C) 4 farklı voltajda çalışabilmesi",
        "D) Yalnızca 4 bitlik veri taşıması",
      ],
      correctIndex: 0,
      explanation: "Doğru! 'X4' eki transistör kanal genişliğinin 4 kat artırıldığını belirtir; bu da çıkış empedansını düşürür ve ağır yükleri (büyük fanout) hızla sürmesini sağlar.",
    },
  },

  "df-cmos-power": {
    id: "df-cmos-power",
    badge: "Bölüm 4 • CMOS Kapıları",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "CMOS Güç Tüketimi Bileşenleri (Dynamic, Short-Circuit, Static)",
    subtitle: "Dinamik güç formülü (P = α·C·V²·f), kısa devre akımı ve kaçak (leakage) gücü.",
    sections: [
      {
        title: "1. CMOS Güç Tüketiminin Üç Bileşeni",
        content: `Bir dijital çipteki toplam güç tüketimi üç parçadan oluşur:
\`P_toplam = P_dinamik + P_kisa_devre + P_statik\`
1. **Dinamik Anahtarlama Gücü (Dynamic Power - %70-80):** Kapı 0'dan 1'e veya 1'den 0'a geçerken parazitik yük kapasitansını doldurup boşaltırken harcanan güç:
   \`P_dinamik = α · C_L · VDD² · f\`
   (\`α\`: Aktivite faktörü, \`C_L\`: Yük kapasitansı, \`VDD\`: Besleme voltajı, \`f\`: Çalışma frekansı).
   **Altın Kural:** Voltajın karesine (\`VDD²\`) bağlıdır! Bu yüzden çiplerin voltajını %10 düşürmek gücü %19 azaltır.
2. **Kısa Devre Gücü (Short-Circuit Power):** Giriş sinyalinin geçişi sırasında hem PMOS'un hem NMOS'un aynı anda açık kaldığı anlık nanosaniyede VDD'den GND'ye akan doğrudan akım.
3. **Statik Kaçak Gücü (Static / Leakage Power):** Çip hiç saat sinyali almazken bile kuantum tünelleme ve eşikaltı sızıntıyla harcanan güç (\`P = VDD · I_leak\`).`,
      },
    ],
    playground: {
      title: "Dinamik ve Statik Güç Tüketimi Hesaplayıcısı",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_cmos_power;
  real Vdd, freq_GHz, C_total_nF, alpha;
  real P_dinamik_W;
  real I_leak_A, P_statik_W;

  initial begin
    alpha = 0.15;      // %15 aktivite faktörü
    C_total_nF = 20.0; // 20 nF toplam anahtarlama kapasitansı
    freq_GHz = 3.5;    // 3.5 GHz saat frekansı
    I_leak_A = 4.0;    // 4 Amper toplam statik kaçak

    $display("=== Modern İşlemci Güç Dağılım Analizi ===");
    
    // Senaryo 1: Standart Voltaj (Vdd = 1.0 V)
    Vdd = 1.0;
    P_dinamik_W = alpha * (C_total_nF * 1e-9) * (Vdd * Vdd) * (freq_GHz * 1e9);
    P_statik_W = Vdd * I_leak_A;
    $display("1. Vdd = 1.0V, 3.5 GHz:");
    $display("   Dinamik Güç: %5.1f W", P_dinamik_W);
    $display("   Statik Güç : %5.1f W", P_statik_W);
    $display("   TOPLAM GÜÇ : %5.1f W", P_dinamik_W + P_statik_W);

    // Senaryo 2: Düşük Voltaj (Vdd = 0.8 V)
    Vdd = 0.8;
    P_dinamik_W = alpha * (C_total_nF * 1e-9) * (Vdd * Vdd) * (freq_GHz * 1e9);
    P_statik_W = Vdd * I_leak_A;
    $display("\\n2. Undervolt (Vdd = 0.8V, 3.5 GHz):");
    $display("   Dinamik Güç: %5.1f W (%%36 Tasarruf!)", P_dinamik_W);
    $display("   TOPLAM GÜÇ : %5.1f W", P_dinamik_W + P_statik_W);

    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Modern İşlemci Güç Dağılım Analizi ===",
        "1. Vdd = 1.0V, 3.5 GHz:",
        "   Dinamik Güç:  10.5 W",
        "   Statik Güç :   4.0 W",
        "   TOPLAM GÜÇ :  14.5 W",
        "2. Undervolt (Vdd = 0.8V, 3.5 GHz):",
        "   Dinamik Güç:   6.7 W (%36 Tasarruf!)",
        "   TOPLAM GÜÇ :   9.9 W",
      ],
    },
    quiz: {
      question: "CMOS devrelerinde dinamik anahtarlama gücünü azaltmanın en etkili yolu nedir ve neden?",
      options: [
        "A) Besleme gerilimini (VDD) düşürmek; çünkü dinamik güç gerilimin karesiyle (VDD²) orantılıdır",
        "B) Frekansı sonsuza kadar artırmak",
        "C) Çipin üzerine daha fazla metal kablo çekmek",
        "D) Tüm NMOS transistörleri kapatmak",
      ],
      correctIndex: 0,
      explanation: "Doğru! P_dinamik = α·C·VDD²·f formülüne göre gerilim ikinci dereceden kuvvete sahip olduğundan, VDD'deki küçük bir düşüş güç tüketimini muazzam oranda azaltır.",
    },
  },

  "df-aoi-oai-gates": {
    id: "df-aoi-oai-gates",
    badge: "Bölüm 4 • CMOS Kapıları",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "Karmaşık Mantık Kapıları: AOI ve OAI (Complex Gates)",
    subtitle: "AND-OR-Invert ve OR-AND-Invert topolojileri ile transistör sayısını ve gecikmeyi yarıya indirme.",
    sections: [
      {
        title: "1. Standart Kapılar vs Karmaşık Kapılar (AOI / OAI)",
        content: `Örneğin \`Y = ~((A & B) | (C & D))\` fonksiyonunu ayrı kapılarla yaparsanız:
- 2 adet 2-girişli AND kapısı (6+6 = 12 transistör)
- 1 adet 2-girişli NOR kapısı (4 transistör)
- Toplam **16 transistör** ve 2 kademeli kapı gecikmesi gerekir.

Bunun yerine doğrudan tek bir **AOI22 (AND-OR-Invert)** CMOS hücresi tasarlanırsa:
- Pull-Down ağında iki seri kol paralel bağlanır.
- Pull-Up ağında iki paralel kol seri bağlanır.
- Yalnızca **8 transistörle** ve tek bir kapı gecikmesiyle aynı mantık gerçeklenir!`,
      },
    ],
    playground: {
      title: "AOI22 Karmaşık Kapı Mantık Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_aoi22;
  reg a, b, c, d;
  wire y_aoi;

  // AOI22: Y = ~((A & B) | (C & D))
  assign y_aoi = ~((a & b) | (c & d));

  initial begin
    $display("=== AOI22 Karmaşık Kapı Testi ===");
    $display("A B C D | Çıkış Y");

    a = 0; b = 0; c = 0; d = 0; #10; $display("%b %b %b %b |   %b", a, b, c, d, y_aoi);
    a = 1; b = 1; c = 0; d = 0; #10; $display("%b %b %b %b |   %b (A&B aktif -> Çıkış 0)", a, b, c, d, y_aoi);
    a = 0; b = 0; c = 1; d = 1; #10; $display("%b %b %b %b |   %b (C&D aktif -> Çıkış 0)", a, b, c, d, y_aoi);
    a = 1; b = 0; c = 0; d = 1; #10; $display("%b %b %b %b |   %b", a, b, c, d, y_aoi);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== AOI22 Karmaşık Kapı Testi ===",
        "A B C D | Çıkış Y",
        "0 0 0 0 |   1",
        "1 1 0 0 |   0 (A&B aktif -> Çıkış 0)",
        "0 0 1 1 |   0 (C&D aktif -> Çıkış 0)",
        "1 0 0 1 |   1",
      ],
    },
    quiz: {
      question: "Standart mantık kapıları yerine AOI (AND-OR-Invert) gibi karmaşık CMOS hücreleri kullanmanın ana faydası nedir?",
      options: [
        "A) Transistör sayısını ve sinyal gecikmesini (delay) ciddi oranda azaltması",
        "B) Kapının sadece geceleri çalışması",
        "C) Dijital devreyi analog radyoya çevirmesi",
        "D) Giriş sayısını 1'e düşürmesi",
      ],
      correctIndex: 0,
      explanation: "Doğru! Karmaşık kapılar birden fazla Boole işlemini tek bir CMOS kademesinde birleştirerek hem transistör alanından tasarruf eder hem de kapı gecikmesini azaltır.",
    },
  },

  // ========================================================
  // BÖLÜM 5: SAYI SİSTEMLERİ & VERİ GÖSTERİMİ
  // ========================================================
  "df-binary-decimal": {
    id: "df-binary-decimal",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İkilik, Onluk ve Onaltılık Sayı Sistemleri (Radix Systems)",
    subtitle: "Taban dönüşümleri (Base-2, Base-8, Base-10, Base-16), basamak ağırlıkları ve bit dizilimleri.",
    sections: [
      {
        title: "1. Sayı Tabanları Mantığı (Positional Number Systems)",
        content: `Günlük hayatta 10 parmağımız olduğu için 10'luk tabanı (Decimal) kullanırız. Bilgisayarlar ise iki voltaj seviyesine sahip olduğu için 2'lik tabanı (Binary) kullanır:
- **İkilik (Binary - Taban 2):** Yalnızca 0 ve 1 rakamları vardır. Basamak ağırlıkları: \`2^0 = 1\`, \`2^1 = 2\`, \`2^2 = 4\`, \`2^3 = 8\`, \`2^4 = 16\`, vb.
- **Onaltılık (Hexadecimal - Taban 16):** Uzun ikilik sayıları insan için okunabilir kılmak amacıyla kullanılır. 4 adet binary bit tam olarak 1 adet hex basamağına eşittir! (0-9 ve A=10, B=11, C=12, D=13, E=14, F=15).`,
        code: {
          language: "verilog",
          caption: "numbers.v - Verilog Sayı Gösterimleri",
          snippet: `// Verilog Taban Belirtimleri: <bit_sayisi>'<taban><deger>
wire [7:0] a = 8'd42;        // Onluk (Decimal) 42
wire [7:0] b = 8'b0010_1010; // İkilik (Binary) 42
wire [7:0] c = 8'h2A;        // Onaltılık (Hex) 42 (Tümü birbirine eşittir!)`,
        },
      },
    ],
    playground: {
      title: "Taban Dönüştürücü Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_radix;
  reg [7:0] sayi;

  initial begin
    $display("=== Taban Dönüşüm Eşdeğerlik Tablosu ===");
    $display("Decimal | Binary     | Hexadecimal | Octal");

    sayi = 8'd13;
    $display("  %3d   | %b   |     0x%h    |  %o", sayi, sayi, sayi, sayi);

    sayi = 8'd42;
    $display("  %3d   | %b   |     0x%h    |  %o", sayi, sayi, sayi, sayi);

    sayi = 8'd255;
    $display("  %3d   | %b   |     0x%h    |  %o", sayi, sayi, sayi, sayi);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Taban Dönüşüm Eşdeğerlik Tablosu ===",
        "Decimal | Binary     | Hexadecimal | Octal",
        "   13   | 00001101   |     0x0d    |  015",
        "   42   | 00101010   |     0x2a    |  052",
        "  255   | 11111111   |     0xff    |  377",
      ],
    },
    quiz: {
      question: "İkilik tabandaki (1101_0110)2 sayısının Onaltılık (Hexadecimal) karşılığı nedir?",
      options: ["A) 0xD6", "B) 0xA4", "C) 0xC6", "D) 0xEE"],
      correctIndex: 0,
      explanation: "Doğru! 4'erli ayırırsak: (1101)2 = 13 = D, (0110)2 = 6. Dolayısıyla sonuç 0xD6'dır.",
    },
  },

  "df-signed-unsigned": {
    id: "df-signed-unsigned",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İşaretli ve İşaretsiz Sayı Gösterimi (Signed vs Unsigned)",
    subtitle: "MSB işaret biti, Sign-Magnitude yöntemi, aralık hesapları ve donanımda taşma (overflow).",
    sections: [
      {
        title: "1. İşaretsiz (Unsigned) Sayılar",
        content: `N bitlik işaretsiz bir sayıda tüm bitler mutlak büyüklüğü temsil eder.
- **Aralık:** \`0\` ile \`2^N - 1\` arası.
- Örneğin 8 bit için: \`0\` ile \`255\` arası.`,
      },
      {
        title: "2. İşaretli Sayılar ve Sign-Magnitude Problemi",
        content: `Negatif sayıları göstermenin en ilkel yolu en soldaki biti (**MSB - Most Significant Bit**) işaret biti (0: Pozitif, 1: Negatif) yapmaktır.
Ancak bu yöntemin iki devasa kusuru vardır:
1. **İki Adet Sıfır Vardır:** Pozitif sıfır (\`+0 = 0000\`) ve Negatif sıfır (\`-0 = 1000\`). Mantık devrelerinde eşitlik kontrolünü zorlaştırır.
2. Basit bir toplama devresiyle negatif sayılar doğrudan toplanamaz; karmaşık işaret kontrol devreleri gerekir. Bu yüzden donanımda Two's Complement tercih edilir.`,
      },
    ],
    playground: {
      title: "İşaretli vs İşaretsiz Karşılaştırma Testi",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_signed;
  reg [7:0] u_val;
  reg signed [7:0] s_val;

  initial begin
    $display("=== 8-Bit Sayı Yorumlama Farkı ===");
    // 8'b1111_1111
    u_val = 8'b1111_1111;
    s_val = 8'b1111_1111;

    $display("Bit Deseni: 11111111");
    $display("İşaretsiz (Unsigned) Değeri : %d (255)", u_val);
    $display("İşaretli   (Signed) Değeri   : %d (-1)", s_val);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 8-Bit Sayı Yorumlama Farkı ===",
        "Bit Deseni: 11111111",
        "İşaretsiz (Unsigned) Değeri : 255 (255)",
        "İşaretli   (Signed) Değeri   :   -1 (-1)",
      ],
    },
    quiz: {
      question: "8-bitlik işaretsiz (unsigned) bir değişkenin alabileceği maksimum pozitif değer nedir?",
      options: ["A) 127", "B) 255", "C) 256", "D) 512"],
      correctIndex: 1,
      explanation: "Doğru! 8-bit işaretsiz sayı 0 ile (2^8 - 1) yani 0 ile 255 arasındaki değerleri alabilir.",
    },
  },

  "df-twos-complement": {
    id: "df-twos-complement",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "1'e ve 2'ye Tümleyen (Two's Complement) Aritmetiği",
    subtitle: "2'ye tümleyen alma algoritması, çıkarma işlemini toplamaya dönüştürme ve taşma (overflow) tespiti.",
    sections: [
      {
        title: "1. 2'ye Tümleyen (Two's Complement) Neden Evrenseldir?",
        content: `Dünyadaki tüm modern işlemciler negatif tam sayıları **Two's Complement** formatında saklar:
1. Tek bir sıfır (\`00000000\`) vardır.
2. **Çıkarma işlemi donanıma ek bir devre gerektirmez!** \`A - B\` işlemi doğrudan \`A + (~B + 1)\` şeklinde standart bir toplayıcıyla (Adder) yapılır!`,
      },
      {
        title: "2. 2'ye Tümleyen Nasıl Hesaplanır?",
        content: `Pozitif bir sayının negatif karşılığını bulmak için:
1. Tüm bitleri tersle (1'e tümleyenini al: 0'lar 1, 1'ler 0 olur).
2. Sonuca **\`+1\`** ekle!
- **Aralık:** N bit için \`-2^(N-1)\` ile \`+2^(N-1) - 1\` arasıdır (8-bit için: -128 ile +127).`,
      },
    ],
    playground: {
      title: "2'ye Tümleyen ile Çıkarma İşlemi Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_twos_comp;
  reg signed [7:0] a, b, sonuc;

  initial begin
    $display("=== Two's Complement Aritmetik Testi ===");
    a = 8'd25;
    b = 8'd10;
    
    // a - b = a + (-b)
    sonuc = a - b;
    $display("%d - %d = %d", a, b, sonuc);

    // Negatif sonuç: 10 - 25 = -15
    sonuc = b - a;
    $display("%d - %d = %d (Bit: %b)", b, a, sonuc, sonuc);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Two's Complement Aritmetik Testi ===",
        " 25 -  10 =  15",
        " 10 -  25 = -15 (Bit: 11110001)",
      ],
    },
    quiz: {
      question: "4 bitlik '0101' (+5) sayısının 2'ye tümleyen (Two's Complement) karşılığı yani -5 nedir?",
      options: ["A) 1010", "B) 1011", "C) 1101", "D) 0011"],
      correctIndex: 1,
      explanation: "Doğru! 0101'in bitleri terslenirse 1010 olur. 1 eklenirse 1011 (-5) elde edilir.",
    },
  },

  "df-character-encoding": {
    id: "df-character-encoding",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Karakter Kodlama Sistemleri (ASCII & UTF-8)",
    subtitle: "Karakterlerin sayılara haritalanması, 7-bit ASCII standardı ve değişken uzunluklu UTF-8 mimarisi.",
    sections: [
      {
        title: "1. ASCII Standardı",
        content: `Donanım yalnızca sayıları anlar. Metinleri saklamak için her harfe bir sayı atanır:
- **ASCII (American Standard Code for Information Interchange):** 7 bitlik (0-127) standarttır.
  - \`'A'\` = 65 (\`8'h41\`)
  - \`'a'\` = 97 (\`8'h61\` - büyük harften 32 fazladır; 5. biti 1 yapılırsa küçük harfe döner!)
  - \`'0'\` rakamı = 48 (\`8'h30\`).`,
      },
      {
        title: "2. Unicode ve UTF-8",
        content: `ASCII Türkçe (ç, ğ, ş), Arapça, Çince veya emojileri desteklemez. **UTF-8**, geriye dönük ASCII uyumlu, 1 ila 4 bayt arasında değişken uzunluklu evrensel karakter kodlama standardıdır.`,
      },
    ],
    playground: {
      title: "Verilog ASCII Karakter Dönüşüm Testi",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_ascii;
  reg [7:0] karakter;

  initial begin
    $display("=== ASCII Karakter ve Hex Kodları ===");
    karakter = "A";
    $display("Karakter '%c' -> Onluk: %d | Hex: 0x%h | Binary: %b", karakter, karakter, karakter, karakter);

    karakter = "a";
    $display("Karakter '%c' -> Onluk: %d | Hex: 0x%h | Binary: %b", karakter, karakter, karakter, karakter);

    // Küçük harfe çevirme hilesi: bit 5'i 1 yap (karakter | 8'h20)
    karakter = "B" | 8'h20;
    $display("Büyük 'B' | 0x20 -> '%c'", karakter);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== ASCII Karakter ve Hex Kodları ===",
        "Karakter 'A' -> Onluk: 65 | Hex: 0x41 | Binary: 01000001",
        "Karakter 'a' -> Onluk: 97 | Hex: 0x61 | Binary: 01100001",
        "Büyük 'B' | 0x20 -> 'b'",
      ],
    },
    quiz: {
      question: "Standart ASCII tablosunda büyük 'A' harfi ile küçük 'a' harfi arasındaki sayısal fark kaçtır?",
      options: ["A) 1", "B) 16", "C) 32 (tek bir bit farkı)", "D) 64"],
      correctIndex: 2,
      explanation: "Doğru! 'A' = 65 ve 'a' = 97'dir; aralarındaki fark 32'dir (ikilik tabanda 5. bit olan 2^5). Bu sayede donanımda büyük/küçük harf dönüşümü tek bir bit işlemiyle yapılır.",
    },
  },

  "df-floating-point": {
    id: "df-floating-point",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "IEEE 754 Kayan Noktalı Sayılar (Floating-Point)",
    subtitle: "İşaret (Sign), Üs (Exponent) ve Kesir (Mantissa) alanları, 32-bit tek ve 64-bit çift duyarlık.",
    sections: [
      {
        title: "1. Kayan Nokta Formatı Anatomisi (IEEE 754)",
        content: `Çok büyük veya çok küçük kesirli sayıları (ör. \`6.022 x 10^23\` veya \`1.6 x 10^-19\`) saklamak için **IEEE 754** standardı kullanılır.
32-Bit Tek Duyarlık (Single Precision - \`float\`):
1. **Sign (1 bit):** İşaret (0: +, 1: -).
2. **Exponent (8 bit):** Üs kısmı. Negatif üsleri saklayabilmek için **+127 bias** eklenir.
3. **Mantissa / Fraction (23 bit):** Sayının anlamlı kesir kısmı (Gizli \`1.f\` biti varsayılır).`,
      },
    ],
    playground: {
      title: "IEEE 754 Kayan Noktalı Sayı Çözümleme",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_float;
  // +1.5 sayısının IEEE 754 32-bit karşılığı:
  // 1.5 = +1.1_bin * 2^0 -> Sign=0, Exp = 0+127 = 127 (01111111), Mantissa = 100...
  // Hex: 0x3FC00000
  reg [31:0] f_val;
  wire sign;
  wire [7:0] exp;
  wire [22:0] mantissa;

  assign sign     = f_val[31];
  assign exp      = f_val[30:23];
  assign mantissa = f_val[22:0];

  initial begin
    f_val = 32'h3FC00000; // 1.5
    $display("=== IEEE 754 32-Bit Float Çözümleme (0x%h) ===", f_val);
    $display("İşaret (Sign)     : %b (Pozitif)", sign);
    $display("Üs (Exponent)     : %b (%d - Bias 127 = 0)", exp, exp);
    $display("Mantissa (Kesir)  : %b", mantissa[22:19]);
    $display("Sonuç Değeri      : +1.5");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== IEEE 754 32-Bit Float Çözümleme (0x3fc00000) ===",
        "İşaret (Sign)     : 0 (Pozitif)",
        "Üs (Exponent)     : 01111111 (127 - Bias 127 = 0)",
        "Mantissa (Kesir)  : 1000",
        "Sonuç Değeri      : +1.5",
      ],
    },
    quiz: {
      question: "32-bitlik standart bir IEEE 754 kayan noktalı (float) sayıda Exponent (Üs) alanı kaç bittir?",
      options: ["A) 1 bit", "B) 8 bit", "C) 23 bit", "D) 16 bit"],
      correctIndex: 1,
      explanation: "Doğru! 32-bit formatında 1 bit işaret, 8 bit üs (exponent) ve 23 bit mantissa (kesir) yer alır.",
    },
  },

  "df-binary-arithmetic": {
    id: "df-binary-arithmetic",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "İkilik Aritmetik (Binary Arithmetic)",
    subtitle: "Elde (Carry) ile toplama, borç (Borrow) ile çıkarma, çarpma ve bit kaydırma.",
    sections: [
      {
        title: "1. İkilik Toplama Kuralları",
        content: `- \`0 + 0 = 0\`
- \`0 + 1 = 1\`
- \`1 + 0 = 1\`
- \`1 + 1 = 0\` (Elde: 1)
- \`1 + 1 + 1 = 1\` (Elde: 1)`,
      },
      {
        title: "2. 2 ile Çarpma ve Bölme: Bit Kaydırma (Shift)",
        content: `Donanımda çarpma işlemi çok pahalı bir devredir. Ancak bir sayıyı 2, 4, 8 gibi 2'nin kuvvetleriyle çarpmak veya bölmek için toplayıcı gerekmez!
- **Sola Kaydırma (\`<< 1\`):** Sayıyı 2 ile çarpar.
- **Sağa Kaydırma (\`>> 1\`):** Sayıyı 2'ye böler.`,
      },
    ],
    playground: {
      title: "Bit Kaydırma ile Donanım Çarpma ve Bölme",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_arithmetic;
  reg [7:0] val;

  initial begin
    val = 8'd20;
    $display("=== Bit Shift ile Çarpma / Bölme ===");
    $display("Başlangıç Değeri       : %d (00010100)", val);
    $display("val << 1 (2 ile çarp)  : %d (00101000)", val << 1);
    $display("val << 2 (4 ile çarp)  : %d (01010000)", val << 2);
    $display("val >> 1 (2'ye böl)    : %d (00001010)", val >> 1);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Bit Shift ile Çarpma / Bölme ===",
        "Başlangıç Değeri       :  20 (00010100)",
        "val << 1 (2 ile çarp)  :  40 (00101000)",
        "val << 2 (4 ile çarp)  :  80 (01010000)",
        "val >> 1 (2'ye böl)    :  10 (00001010)",
      ],
    },
    quiz: {
      question: "Bir ikilik (binary) sayıyı donanımda 8 ile çarpmak için en verimli yöntem nedir?",
      options: [
        "A) Sayıyı sola 3 bit kaydırmak (<< 3)",
        "B) Sayıyı 8 kere kendisiyle toplamak",
        "C) Sayıyı sağa 3 bit kaydırmak",
        "D) Sayının tersini almak",
      ],
      correctIndex: 0,
      explanation: "Doğru! 8 = 2^3 olduğundan, sayıyı sola 3 bit kaydırmak (shift left by 3) hiçbir mantık kapısı harcamadan doğrudan 8 ile çarpar.",
    },
  },

  "df-gray-code": {
    id: "df-gray-code",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Gray Kodu ve Asenkron FIFO Tasarımındaki Önemi",
    subtitle: "Tek bit değişimi (Unit Distance), ikilikten Gray'e dönüşüm ve asenkron saat alanları.",
    sections: [
      {
        title: "1. Gray Kodu Nedir?",
        content: `Standart ikilik sayımda 3'ten 4'e geçerken (\`011 -> 100\`) **3 bit birden aynı anda değişir**. Fiziksel donanımda bu 3 bitin kablo gecikmeleri eşit olamayacağından geçiş anında mikrosaniyelik yanlış ara değerler (glitch) oluşur.
**Gray Kodu**, ardışık her sayı geçişinde **YALNIZCA TEK BİR BİTİN** değiştiği özel bir kodlama sistemidir.`,
      },
      {
        title: "2. Neden Asenkron FIFO'larda Gray Kodu Kullanılır?",
        content: `Farklı saat frekanslarıyla çalışan modüller arasında veri aktaran Asenkron FIFO'larda okuma ve yazma göstergeleri (pointer) saat alanları arasından aktarılır. Standart ikilik sayaç kullanılırsa ara değerler yanlış okunup FIFO'nun taşmasına (overflow) yol açabilir. Gray kodu tek bit değiştirdiği için metastability riskini asgariye indirir.`,
      },
    ],
    playground: {
      title: "Binary -> Gray Kodu Dönüştürücü Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_gray;
  reg [3:0] bin;
  wire [3:0] gray;

  // İkilikten Gray'e dönüşüm formülü: gray = bin ^ (bin >> 1)
  assign gray = bin ^ (bin >> 1);

  initial begin
    $display("=== 4-Bit Binary vs Gray Kodu Karşılaştırması ===");
    $display("Decimal | Binary | Gray Kodu");

    for (bin = 0; bin < 8; bin = bin + 1) begin
      #5;
      $display("   %d    |  %b  |   %b", bin, bin, gray);
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 4-Bit Binary vs Gray Kodu Karşılaştırması ===",
        "Decimal | Binary | Gray Kodu",
        "   0    |  0000  |   0000",
        "   1    |  0001  |   0001",
        "   2    |  0010  |   0011",
        "   3    |  0011  |   0010",
        "   4    |  0100  |   0110",
        "   5    |  0101  |   0111",
        "   6    |  0110  |   0101",
        "   7    |  0111  |   0100",
      ],
    },
    quiz: {
      question: "Gray kodunun sayısal donanım tasarımındaki (özellikle Asenkron FIFO göstergelerinde) en hayati özelliği nedir?",
      options: [
        "A) Ardışık sayılar arasında her adımda sadece tek bir bitin değişmesi",
        "B) Sadece tek sayıları sayabilmesi",
        "C) 16'lık tabanda yazılması",
        "D) Sayıları ikiye bölmesi",
      ],
      correctIndex: 0,
      explanation: "Doğru! Gray kodunda ardışık değerler arasında yalnızca tek bir bit değişir (unit distance); bu da farklı saat alanları arasında sayaç aktarırken glitch ve metastability hatalarını önler.",
    },
  },

  "df-fixed-point": {
    id: "df-fixed-point",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Donanımda Sabit Noktalı Aritmetik (Fixed-Point: Qm.n)",
    subtitle: "DSP ve FPGA'de kayan nokta yerine sabit nokta, Q formatı ve ölçekleme prensipleri.",
    sections: [
      {
        title: "1. Neden Kayan Nokta (Float) Yerine Sabit Nokta (Fixed-Point)?",
        content: `FPGA ve ASIC tasarımlarında IEEE 754 kayan noktalı toplama ve çarpma birimleri devasa silikon alanı kaplar ve yüksek gecikmeye sahiptir.
Sayısal Sinyal İşleme (DSP), ses/video filtreleri ve sinir ağlarında (AI/ML) kesirli sayılar standart tam sayı toplayıcılarıyla işlenebilen **Sabit Noktalı (Fixed-Point)** formatta tutulur.`,
      },
      {
        title: "2. Qm.n Formatı ve Bit Yerleşimi",
        content: `![Q-Format bit yerleşimi: İşaret biti, tam sayı kısmı ve kesir basamakları](/images/digital/4.5-q-format-bit-layout.svg)

- **m:** Tam kısım bit sayısı.
- **n:** Kesirli kısım bit sayısı.
Örneğin **Q4.4** formatında 8 bitlik bir sayıda en soldaki bit işaret, sonraki 3 bit tam kısım, en sağdaki 4 bit ise kesirdir. Her bir kesir bitinin ağırlığı sırasıyla \`2^-1 = 0.5\`, \`2^-2 = 0.25\`, \`2^-3 = 0.125\`, \`2^-4 = 0.0625\` olarak hesaplanır. Standart bir tam sayı DSP bloğu ile yüksek hızlı kesirli aritmetik bu sayede gerçekleştirilir.`,
      },
    ],
    playground: {
      title: "Q4.4 Sabit Noktalı Sayı Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_fixed_point;
  // Q4.4 formatında: 8'b0011_1000 -> Tam kısım: 3, Kesir: 8 * (1/16) = 0.5 -> Değer: 3.5
  reg [7:0] q_val;
  real gercek_deger;

  initial begin
    q_val = 8'b0011_1000;
    // Donanımsal dönüşüm: Tam sayı değerini 2^4 = 16'ya böl
    gercek_deger = q_val / 16.0;

    $display("=== Q4.4 Sabit Noktalı Sayı Gösterimi ===");
    $display("Bit Deseni    : %b", q_val);
    $display("Tam Sayı Kayıt: %d", q_val);
    $display("Gerçek Değer  : %4.2f (Standart tamsayı toplayıcı ile kesirli işlem yapıldı!)", gercek_deger);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Q4.4 Sabit Noktalı Sayı Gösterimi ===",
        "Bit Deseni    : 00111000",
        "Tam Sayı Kayıt:  56",
        "Gerçek Değer  : 3.50 (Standart tamsayı toplayıcı ile kesirli işlem yapıldı!)",
      ],
    },
    quiz: {
      question: "Q4.4 sabit noktalı (fixed-point) formatındaki bir sayıda en küçük kesir basamağının (LSB) çözünürlüğü nedir?",
      options: ["A) 1/2 = 0.5", "B) 1/16 = 0.0625", "C) 1/4 = 0.25", "D) 1/10 = 0.1"],
      correctIndex: 1,
      explanation: "Doğru! Kesirli kısım 4 bit olduğundan en düşük basamak 2^(-4) = 1/16 = 0.0625 değerini temsil eder.",
    },
  },
};
