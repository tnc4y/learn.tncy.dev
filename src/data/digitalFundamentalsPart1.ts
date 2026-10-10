import { LessonContent } from "./lessonsData";

export const DIGITAL_FUNDAMENTALS_PART1: Record<string, LessonContent> = {
  // ========================================================
  // BÖLÜM 1: SAYISAL TASARIMA GİRİŞ
  // ========================================================
  "df-intro": {
    id: "df-intro",
    badge: "Bölüm 1 • Giriş",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Sayısal Tasarım Nedir? (What is Digital Design?)",
    subtitle: "Analog vs Dijital sinyaller, bit kavramı, anahtarlar ile mantıksal kararlar ve bir çipin soyutlama katmanları.",
    sections: [
      {
        title: "1. Analog ve Dijital Dünyanın Karşılaştırması",
        content: `Doğadaki neredeyse tüm fiziksel büyüklükler (sıcaklık, ses, ışık şiddeti, basınç) **analog** yani sürekli ve kesintisizdir. Bir reosta (dimmer) lambanın parlaklığını sonsuz ara değerde ayarlayabilir. Ancak analog sinyallerin en büyük zayıflığı **gürültüdür (noise)**: iletim hatlarındaki en ufak bir elektromanyetik dalgalanma analog veriyi bozar ve her kopyalamada hata katlanarak artar.

Buna karşılık **dijital (sayısal) sistemler** yalnızca iki kesin durumu tanır: **0 (LOW)** ve **1 (HIGH)**. Sinyal voltajındaki küçük dalgalanmalar (örneğin 1.0V yerine 0.92V gelmesi) anlamı değiştirmez; devre bunu yine "1" olarak yorumlar. Bu gürültü bağışıklığı sayesinde dijital veri milyonlarca kez mükemmel ve hatasız kopyalanabilir.`,
      },
      {
        title: "2. Anahtarlar Nasıl Mantıksal Kararlar Alır?",
        content: `Bir pili, bir lambayı ve iki adet mekanik anahtarı (A ve B) düşünün:
- **Seri Bağlantı (AND Mantığı):** Akımın lambaya ulaşması için hem A'nın **VE** hem de B'nin kapalı olması gerekir. Biri bile açıksa lamba yanmaz.
- **Paralel Bağlantı (OR Mantığı):** Akım iki koldan birinden geçebilir; lambanın yanması için A'nın **VEYA** B'nin kapalı olması yeterlidir.

İşte modern bilgisayarların tüm zekası bu basit prensibe dayanır! Mekanik anahtarlar yerine elektrik voltajıyla açılıp kapanan minik anahtarlar yani **transistörler** kullanılır.`,
        code: {
          language: "verilog",
          caption: "seatbelt_logic.v - Temel Karar Mantığı",
          snippet: `// Emniyet kemeri uyarısı: Koltukta oturan var VE kemer takılı DEĞİL ise alarm çal
module seatbelt_logic (
    input  wire seat_occupied, // 1: Koltuk dolu
    input  wire belt_buckled,  // 1: Kemer takılı
    output wire alarm          // 1: Alarm çalar
);
    // & = AND, ~ = NOT kapısı
    assign alarm = seat_occupied & ~belt_buckled;
endmodule`,
        },
      },
      {
        title: "3. Bir Çipin Soyutlama Katmanları (Abstraction Layers)",
        content: `Modern bir GPU veya işlemci milyarlarca transistör içerir. Hiçbir mühendis bu transistörleri tek tek elle çizmez. Çip tasarımı bir piramit gibi katmanlara ayrılmıştır:
1. **Katı Hal Fiziği:** Silikonun iletkenliği ve elektron hareketleri.
2. **MOSFET Transistörler:** Voltaj kontrollü nano-ölçekli anahtarlar.
3. **Standart Mantık Kapıları:** NOT, AND, OR, NAND, NOR hücreleri.
4. **Bileşik & Ardışıl Bloklar:** Toplayıcılar, multiplexer'lar, kaydediciler.
5. **RTL & Mimariler:** Verilog/SystemVerilog ile yazılan işlemciler ve veri yolları.`,
      },
    ],
    playground: {
      title: "Temel Mantık Kapıları ve Emniyet Kemeri Uyarısı",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_seatbelt;
  reg seat_occupied;
  reg belt_buckled;
  wire alarm;

  // Tasarım Mantığı: Koltuk dolu VE kemer takılı DEĞİL ise alarm
  assign alarm = seat_occupied & ~belt_buckled;

  initial begin
    $display("=== Emniyet Kemeri Mantık Testi ===");
    $display("Zaman | Koltuk | Kemer | ALARM");
    $monitor("%4t |   %b    |   %b   |   %b", $time, seat_occupied, belt_buckled, alarm);

    seat_occupied = 0; belt_buckled = 0; #10;
    seat_occupied = 1; belt_buckled = 0; #10; // Alarm çalmalı (1 & ~0 = 1)
    seat_occupied = 1; belt_buckled = 1; #10; // Kemer takıldı, alarm susmalı (1 & ~1 = 0)
    seat_occupied = 0; belt_buckled = 1; #10;
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Emniyet Kemeri Mantık Testi ===",
        "Zaman | Koltuk | Kemer | ALARM",
        "   0 |   0    |   0   |   0",
        "  10 |   1    |   0   |   1 (ALARM ÇALDI!)",
        "  20 |   1    |   1   |   0 (Kemer takıldı, sustu)",
        "  30 |   0    |   1   |   0",
      ],
    },
    quiz: {
      question: "Analog sinyaller yerine dijital (sayısal) sinyallerin kullanılmasının en büyük mühendislik avantajı nedir?",
      options: [
        "A) Analog sinyallerin asla kablodan geçememesi",
        "B) Gürültüye (noise) karşı yüksek bağışıklık ve bilginin hatasız kopyalanabilmesi",
        "C) Dijital devrelerin hiç elektrik enerjisi tüketmemesi",
        "D) Dijital sinyallerin ışık hızından hızlı hareket etmesi",
      ],
      correctIndex: 1,
      explanation: "Doğru! Dijital sinyaller yalnızca iki voltaj aralığını (0 ve 1) baz aldığı için küçük voltaj parazitleri veriyi bozmaz ve veri sonsuz kez kusursuz kopyalanabilir.",
    },
  },

  // ========================================================
  // BÖLÜM 2: KATI HAL FİZİĞİ & YARI İLETKENLER
  // ========================================================
  "df-semiconductors": {
    id: "df-semiconductors",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İletkenler, Yalıtkanlar ve Yarı İletkenler (Semiconductors)",
    subtitle: "Enerji bant aralığı (Bandgap), Silikon (Si) kristal kafesi ve kovalent bağ mimarisi.",
    sections: [
      {
        title: "1. Enerji Bantları: Değerlik (Valence) ve İletim (Conduction) Bandı",
        content: `Katı maddelerdeki elektronların bulunabileceği enerji seviyeleri bantlar halindedir:
- **Değerlik Bandı (Valence Band):** Atom çekirdeğine bağlı, kovalent bağları oluşturan elektronların bulunduğu alt enerji bandı.
- **İletim Bandı (Conduction Band):** Bağlardan kopup madde içinde serbestçe hareket edebilen ve elektrik akımını ileten elektronların bandı.
- **Bant Aralığı (Bandgap - Eg):** Bu iki seviye arasındaki yasak enerji bölgesidir.
  - **İletkenler (Metaller):** Bantlar birbiriyle örtüşür (Eg = 0 eV); oda sıcaklığında sayısız serbest elektron bulunur.
  - **Yalıtkanlar (Kuvars, Cam):** Bant aralığı çok geniştir (Eg > 5 eV); elektronların iletim bandına atlaması imkansıza yakındır.
  - **Yarı İletkenler (Silikon, Germanyum):** Orta büyüklükte bir aralığa sahiptir (Silikon için Eg ≈ 1.12 eV). Dışarıdan küçük bir enerji verildiğinde veya katkılandığında kontrollü iletken olurlar.`,
      },
      {
        title: "2. Neden Silikon (Silicon)?",
        content: `Silikon periyodik tablonun IV. grubunda yer alır; 4 değerlik elektronuna sahiptir ve elmas kristal kafes yapısında komşu 4 silikon atomuyla kovalent bağ kurar.
Silikonun mikroçip endüstrisinin temeli olmasının 3 ana sebebi vardır:
1. Yerkabuğunda kum (SiO2) olarak bolca bulunur ve ucuzdur.
2. Yüksek sıcaklıklarda dahi kararlı kristal kafes yapısını korur.
3. Havayla veya oksijenle temas ettiğinde yüzeyinde mükemmel bir yalıtkan olan silikon dioksit (SiO2) cam tabakası kendiliğinden oluşur.`,
      },
    ],
    playground: {
      title: "Sıcaklığa Bağlı Silikon İletkenlik Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_semiconductor;
  // Saf silikonda sıcaklık arttıkça kırılan kovalent bağ ve iletkenlik artışı modeli
  integer sicaklik_kelvin;
  real termal_gerilim_mV; // Vt = k*T/q

  initial begin
    $display("=== Silikon Termal Gerilim (Vt) Analizi ===");
    $display("T (Kelvin) | T (C) | Vt = kT/q (mV)");
    
    for (sicaklik_kelvin = 250; sicaklik_kelvin <= 400; sicaklik_kelvin = sicaklik_kelvin + 50) begin
      // Boltzmann sabiti k/q ≈ 0.08617 mV/K
      termal_gerilim_mV = sicaklik_kelvin * 0.08617;
      $display("  %4d K   | %3d C |   %5.2f mV", 
               sicaklik_kelvin, sicaklik_kelvin - 273, termal_gerilim_mV);
    end
    $display("[SONUÇ] 300K oda sıcaklığında termal voltaj standart 25.85 mV civarındadır.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Silikon Termal Gerilim (Vt) Analizi ===",
        "T (Kelvin) | T (C) | Vt = kT/q (mV)",
        "   250 K   | -23 C |   21.54 mV",
        "   300 K   |  27 C |   25.85 mV (Oda sıcaklığı)",
        "   350 K   |  77 C |   30.16 mV",
        "   400 K   | 127 C |   34.47 mV",
        "[SONUÇ] 300K oda sıcaklığında termal voltaj standart 25.85 mV civarındadır.",
      ],
    },
    quiz: {
      question: "Saf bir silikon (Si) atomunun değerlik yörüngesinde kaç elektron bulunur ve komşu atomlarla kaç kovalent bağ kurar?",
      options: [
        "A) 2 elektron, 2 bağ",
        "B) 4 elektron, 4 bağ",
        "C) 8 elektron, 8 bağ",
        "D) 3 elektron, 6 bağ",
      ],
      correctIndex: 1,
      explanation: "Doğru! Silikon IV. grup elementi olduğundan en dış yörüngesinde 4 değerlik elektronu vardır ve 4 komşu atomla kovalent bağ oluşturur.",
    },
  },

  "df-doping": {
    id: "df-doping",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Katkılama (Doping) Nedir? (N-Tipi ve P-Tipi Yarı İletkenler)",
    subtitle: "Saf silikona yabancı atom enjeksiyonu: Fosfor (Donor) ile N-tipi, Bor (Akseptör) ile P-tipi oluşumu.",
    sections: [
      {
        title: "1. Neden Katkılama (Doping) Yaparız?",
        content: `Saf (intrensek) silikon oda sıcaklığında çok az serbest elektrona sahiptir ve neredeyse yalıtkan gibidir. İletkenliğini trilyonlarca kat artırmak ve akım türünü kontrol etmek için kristal kafese milyonda bir oranında yabancı atomlar eklenir; bu işleme **Doping (Katkılama)** denir.`,
      },
      {
        title: "2. N-Tipi Yarı İletken (Elektron Fazlası - Donörler)",
        content: `Silikona V. gruptan 5 değerlik elektronu olan bir atom (örneğin **Fosfor - P** veya **Arsenik - As**) eklendiğinde:
- 4 elektron silikonla kovalent bağ kurar.
- 5. elektron boşa çıkar ve çok az enerjiyle serbest kalıp kafeste serbestçe dolaşır.
- Bu atomlara elektron bağışladıkları için **Donör (Verici)** denir.
- **N-tipi** yarı iletkende çoğunluk taşıyıcıları **elektronlar (negatif yük)**, azınlık taşıyıcıları ise boşluklardır (holler).`,
      },
      {
        title: "3. P-Tipi Yarı İletken (Boşluk Fazlası - Akseptörler)",
        content: `Silikona III. gruptan 3 değerlik elektronu olan bir atom (örneğin **Bor - B**) eklendiğinde:
- 3 elektron silikonla bağ kurar, 4. bağda bir elektron eksik kalır!
- Bu eksik bağa **Boşluk (Hole)** denir. Komşu bir elektron bu boşluğu doldurduğunda boşluk yer değiştirir; adeta pozitif yüklü bir parçacık gibi davranır.
- Bu atomlara elektron kabul ettikleri için **Akseptör (Alıcı)** denir.
- **P-tipi** yarı iletkende çoğunluk taşıyıcıları **boşluklar (pozitif yük)**, azınlık taşıyıcıları ise elektronlardır.`,
      },
    ],
    playground: {
      title: "N-Tipi ve P-Tipi Taşıyıcı Yoğunluğu Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_doping;
  // Kütle Etkisi Yasası: n * p = ni^2 (Oda sıcaklığında ni ≈ 1.5e10 cm^-3)
  real Nd; // Donor yoğunluğu (cm^-3)
  real Na; // Akseptör yoğunluğu (cm^-3)
  real n, p; // Elektron ve delik yoğunlukları

  initial begin
    $display("=== Katkılama (Doping) Taşıyıcı Analizi ===");
    
    // 1. N-Tipi Silikon (Nd = 1e16 cm^-3 Fosfor)
    Nd = 1.0e16;
    n = Nd; // Çoğunluk elektronlar
    p = (2.25e20) / n; // Azınlık delikler = ni^2 / n
    $display("1. N-Tipi (Fosfor Katkılı, Nd = 1e16):");
    $display("   Elektron Yoğunluğu (n) = %e cm^-3 (ÇOĞUNLUK)", n);
    $display("   Boşluk Yoğunluğu   (p) = %e cm^-3 (AZINLIK)", p);

    // 2. P-Tipi Silikon (Na = 1e17 cm^-3 Bor)
    Na = 1.0e17;
    p = Na; // Çoğunluk boşluklar
    n = (2.25e20) / p; // Azınlık elektronlar
    $display("\\n2. P-Tipi (Bor Katkılı, Na = 1e17):");
    $display("   Boşluk Yoğunluğu   (p) = %e cm^-3 (ÇOĞUNLUK)", p);
    $display("   Elektron Yoğunluğu (n) = %e cm^-3 (AZINLIK)", n);

    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Katkılama (Doping) Taşıyıcı Analizi ===",
        "1. N-Tipi (Fosfor Katkılı, Nd = 1e16):",
        "   Elektron Yoğunluğu (n) = 1.000000e+16 cm^-3 (ÇOĞUNLUK)",
        "   Boşluk Yoğunluğu   (p) = 2.250000e+04 cm^-3 (AZINLIK)",
        "2. P-Tipi (Bor Katkılı, Na = 1e17):",
        "   Boşluk Yoğunluğu   (p) = 1.000000e+17 cm^-3 (ÇOĞUNLUK)",
        "   Elektron Yoğunluğu (n) = 2.250000e+03 cm^-3 (AZINLIK)",
      ],
    },
    quiz: {
      question: "Saf silikona Bor (B) atomu eklendiğinde hangi tip yarı iletken oluşur ve çoğunluk yük taşıyıcısı ne olur?",
      options: [
        "A) N-tipi oluşur, çoğunluk elektronlardır",
        "B) P-tipi oluşur, çoğunluk pozitif yüklü boşluklardır (holler)",
        "C) İletken metal oluşur",
        "D) Tam yalıtkan cam oluşur",
      ],
      correctIndex: 1,
      explanation: "Doğru! Bor 3 değerlik elektronuna sahip bir III. grup elementi olduğundan silikon kafesinde elektron eksikliği yani 'boşluk' (hole) yaratır ve P-tipi yarı iletken oluşturur.",
    },
  },

  "df-pn-junction": {
    id: "df-pn-junction",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "PN Eklemi ve Diyot Mimarisi (The PN Junction)",
    subtitle: "Fakirleşmiş bölge (Depletion Region), dahili elektrik alanı (Vbi) ve ileri/ters kutuplama mekanizması.",
    sections: [
      {
        title: "1. PN Eklemi Bir Araya Geldiğinde Ne Olur?",
        content: `P-tipi ve N-tipi iki yarı iletken parça tek bir kristal üzerinde birleştiğinde temas yüzeyinde inanılmaz bir fiziksel olay gerçekleşir:
1. **Difüzyon:** N bölgesindeki bol elektronlar P bölgesine doğru, P bölgesindeki bol boşluklar N bölgesine doğru akmaya başlar.
2. **Yük Tutulması:** N tarafından ayrılan elektronlar geride pozitif donör iyonları (\`+\`), P tarafından ayrılan boşluklar geride negatif akseptör iyonları (\`-\`) bırakır.
3. **Fakirleşmiş Bölge (Depletion Region):** Arayüzde hareketli yüklerden arınmış sabit iyon tabakası oluşur. Bu iyonlar N'den P'ye doğru bir **dahili elektrik alanı (Built-in Potential - Vbi)** üretir (Silikon için yaklaşık 0.7V).
4. Bu elektrik alanı difüzyonu dengeler ve akış durur.`,
      },
      {
        title: "2. İleri Kutuplama (Forward Bias) vs Ters Kutuplama (Reverse Bias)",
        content: `- **İleri Kutuplama (P'ye +, N'ye -):** Dış voltaj dahili elektrik alanını zayıflatır, fakirleşmiş bölge daralır. Gerilim 0.7V eşiğini aştığı anda çığ gibi akım akar (Diyot iletime geçer).
- **Ters Kutuplama (P'ye -, N'ye +):** Dış voltaj dahili elektrik alanını destekler, fakirleşmiş bölge daha da genişler! Akım geçişi engellenir (Yalnızca piko-amper seviyesinde minik bir kaçak akım akar). Bu, tek yönlü akım vanasıdır (diyot).`,
      },
    ],
    playground: {
      title: "PN Eklemi Akım-Gerilim (I-V) Eğrisi Simülatörü",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_pn_junction;
  // Shockley Diyot Denklemi: Id = Is * (e^(Vd / Vt) - 1)
  real Vd; // Diyot gerilimi (Volt)
  real Is; // Doyum akımı (10^-14 Amper)
  real Vt; // Termal gerilim (0.026 V)
  real Id_mA; // Diyot akımı (miliamper)

  initial begin
    Is = 1.0e-14;
    Vt = 0.026;
    $display("=== PN Eklemi (Diyot) I-V Karakteristiği ===");
    $display("Vd (Volt) | Akım Durumu");

    // Ters Kutuplama
    Vd = -2.0;
    $display("%7.2f V | ~0 mA (Ters Kutuplama - İletim YOK, Blokaj)", Vd);

    Vd = 0.0;
    $display("%7.2f V |  0.0 mA (Denge Durumu)", Vd);

    Vd = 0.5;
    $display("%7.2f V |  0.002 mA (Eşik altı, sızıntı)", Vd);

    Vd = 0.7;
    $display("%7.2f V |  5.0 mA (EŞİK AŞILDI! Üstel İletim Başladı)", Vd);

    Vd = 0.75;
    $display("%7.2f V | 34.2 mA (Tam İletken)", Vd);
    
    $display("\\n[ÖZET] Silikon PN eklemi ~0.7V eşiğinde aniden tam iletime geçer.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== PN Eklemi (Diyot) I-V Karakteristiği ===",
        "Vd (Volt) | Akım Durumu",
        "  -2.00 V | ~0 mA (Ters Kutuplama - İletim YOK, Blokaj)",
        "   0.00 V |  0.0 mA (Denge Durumu)",
        "   0.50 V |  0.002 mA (Eşik altı, sızıntı)",
        "   0.70 V |  5.0 mA (EŞİK AŞILDI! Üstel İletim Başladı)",
        "   0.75 V | 34.2 mA (Tam İletken)",
        "[ÖZET] Silikon PN eklemi ~0.7V eşiğinde aniden tam iletime geçer.",
      ],
    },
    quiz: {
      question: "Silikon bir PN ekleminde serbest yüklerden arınmış 'fakirleşmiş bölge' (depletion region) tarafından oluşturulan dahili gerilim eşiği oda sıcaklığında yaklaşık kaç volttur?",
      options: ["A) 0.1 V", "B) 0.7 V", "C) 3.3 V", "D) 5.0 V"],
      correctIndex: 1,
      explanation: "Doğru! Silikon PN ekleminin dahili potansiyeli (built-in voltage) oda sıcaklığında yaklaşık 0.65V - 0.7V arasındadır; diyot bu voltaj aşıldığında iletime geçer.",
    },
  },

  "df-carriers-temperature": {
    id: "df-carriers-temperature",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Yük Taşıyıcıları, Akım & Sıcaklık Bağımlılığı",
    subtitle: "Sürüklenme (Drift) vs Difüzyon akımı, elektron hareketliliği (Mobility μ) ve ısınan çiplerin yavaşlama sebebi.",
    sections: [
      {
        title: "1. İki Temel Akım Mekanizması: Sürüklenme ve Difüzyon",
        content: `Bir yarı iletkende akım iki farklı itici güçle akar:
- **Sürüklenme Akımı (Drift Current):** Elektrik alanının (\`E\`) etkisiyle yüklerin voltaj yönünde sürüklenmesidir (\`J_drift = q · n · μ · E\`).
- **Difüzyon Akımı (Diffusion Current):** Yüksek yoğunluklu bölgeden düşük yoğunluklu bölgeye doğru yoğunluk gradyanı sebebiyle rastgele yayılmadır (\`J_diff = q · D · dn/dx\`).`,
      },
      {
        title: "2. Taşıyıcı Hareketliliği (Mobility - μ) ve Sıcaklık Etkisi",
        content: `Elektronlar kafes içinde serbestçe akarken silikon atomlarının termal titreşimlerine çarparlar.
- **Elektron vs Boşluk:** Elektronların hareketliliği (\`μn ≈ 1400 cm²/V·s\`), boşlukların hareketliliğinden (\`μp ≈ 450 cm²/V·s\`) yaklaşık **2.5 ila 3 kat daha fazladır**! Bu yüzden NMOS transistörler PMOS'tan çok daha hızlıdır.
- **Sıcaklık Artarsa Ne Olur?** Sıcaklık arttıkça kristal kafes atomları daha şiddetli titrer ve elektronlara daha sık çarpar. Sonuç olarak **hareketlilik (mobility) düşer ve çip yavaşlar!** Yüksek sıcaklıkta çalışan işlemcilerin frekans düşürmesinin (thermal throttling) temel fiziksel nedeni budur.`,
      },
    ],
    playground: {
      title: "Sıcaklığa Bağlı Elektron Hareketliliği (Mobility) Hesabı",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_mobility;
  // Kafes saçılması modeli: mu(T) = mu0 * (T / 300)^(-1.5)
  integer T;
  real mu_elektron;
  real mu_delik;

  initial begin
    $display("=== Sıcaklığa Göre Taşıyıcı Hareketliliği (cm^2/V*s) ===");
    $display("Sıcaklık | Elektron Hızı (μn) | Delik Hızı (μp) | Oran (μn/μp)");

    for (T = 300; T <= 420; T = T + 30) begin
      // T=300K'de mu_n=1400, mu_p=450
      mu_elektron = 1400.0 * ( (300.0 / T) ** 1.5 );
      mu_delik    = 450.0  * ( (300.0 / T) ** 1.5 );
      $display(" %3d K   |    %6.1f cm^2/Vs   |  %6.1f cm^2/Vs  |   %4.2f", 
               T, mu_elektron, mu_delik, mu_elektron / mu_delik);
    end

    $display("\\n[FİZİKSEL GERÇEK] Çip 300K'den 420K'e (147 C) ısındığında hız %%40 düşer!");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Sıcaklığa Göre Taşıyıcı Hareketliliği (cm^2/V*s) ===",
        "Sıcaklık | Elektron Hızı (μn) | Delik Hızı (μp) | Oran (μn/μp)",
        " 300 K   |    1400.0 cm^2/Vs   |   450.0 cm^2/Vs  |   3.11",
        " 330 K   |    1214.3 cm^2/Vs   |   390.3 cm^2/Vs  |   3.11",
        " 360 K   |    1065.7 cm^2/Vs   |   342.5 cm^2/Vs  |   3.11",
        " 390 K   |     944.3 cm^2/Vs   |   303.5 cm^2/Vs  |   3.11",
        " 420 K   |     843.4 cm^2/Vs   |   271.1 cm^2/Vs  |   3.11",
        "[FİZİKSEL GERÇEK] Çip 300K'den 420K'e (147 C) ısındığında hız %40 düşer!",
      ],
    },
    quiz: {
      question: "Silikonda elektron hareketliliğinin (mobility) pozitif delik (hole) hareketliliğinden yaklaşık 3 kat daha fazla olmasının dijital devre tasarımındaki doğrudan sonucu nedir?",
      options: [
        "A) PMOS transistörlerin NMOS'tan daha hızlı olması",
        "B) Eşit akım ve hız elde etmek için PMOS transistörlerin NMOS'tan 2-3 kat daha geniş (W) tasarlanması gerekmesi",
        "C) Deliklerin akım taşımaktan vazgeçmesi",
        "D) Tüm çiplerin yalnızca tek bir transistörle üretilmesi",
      ],
      correctIndex: 1,
      explanation: "Doğru! Boşluklar daha yavaş hareket ettiği için, CMOS kapılarında yükselme ve düşme sürelerini dengelemek amacıyla PMOS transistörün kanal genişliği (W) NMOS'un yaklaşık 2-3 katı yapılır.",
    },
  },

  // ========================================================
  // BÖLÜM 3: THE MOSFET (TRANSİSTÖR MİMARİSİ)
  // ========================================================
  "df-mosfet-anatomy": {
    id: "df-mosfet-anatomy",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "MOSFET Anatomisi (Metal-Oxide-Semiconductor Field-Effect Transistor)",
    subtitle: "Gate, Drain, Source, Body terminalleri, dielektrik oksit tabakası ve 4-uçlu transistör yapısı.",
    sections: [
      {
        title: "1. MOSFET Nedir?",
        content: `**MOSFET**, modern işlemcilerin ve çiplerin en temel yapı taşıdır. Voltaj kontrollü bir anahtardır: Kapı (Gate) ucuna uygulanan bir elektrik alanı ile Kaynak (Source) ve Savak (Drain) uçları arasında bir iletim kanalı açar veya kapatır.`,
      },
      {
        title: "2. 4 Terminalin Anatomisi",
        content: `- **Gate (Kapı - G):** Kontrol terminalidir. Altındaki kanaldan ince bir yalıtkan oksit tabakasıyla (SiO2 veya High-k dielektrik) tamamen izole edilmiştir; bu yüzden Gate içine neredeyse hiç DC akım akmaz!
- **Source (Kaynak - S):** Kanal içine akacak yük taşıyıcılarının girdiği kaynak terminali.
- **Drain (Savak - D):** Kanalı geçen yük taşıyıcılarının çıktığı terminal.
- **Body / Substrate (Gövde - B):** Transistörün üzerine inşa edildiği ana silikon tabaka. Genellikle parazitik diyotların iletime geçmesini engellemek için en düşük voltaja (GND) veya en yüksek voltaja (VDD) bağlanır.`,
      },
      {
        title: "3. Kanal Uzunluğu (L) ve Genişliği (W)",
        content: `- **L (Channel Length):** Source ile Drain arasındaki mesafedir. Yarı iletken teknolojisi "3nm, 5nm" derken bu kritik boyutu kasteder. L ne kadar küçükse elektronlar o kadar hızlı geçer ve transistör o kadar az güçle hızlı anahtarlar.
- **W (Channel Width):** Kanalın genişliğidir. W büyüdükçe transistörden akan akım artar ve kapının sürüş gücü (drive strength) yükselir.`,
      },
    ],
    playground: {
      title: "MOSFET Terminal Durumları ve Anahtarlama Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_mosfet;
  // NMOS Anahtarlama Modeli: Vgs > Vth ise iletir, değilse kesimdedir
  reg Vg, Vs, Vd;
  wire kanal_acik;
  wire Vout;

  // Gate yüksek ise Source ile Drain birbirine bağlanır
  assign kanal_acik = (Vg == 1'b1);
  assign Vout = kanal_acik ? Vs : 1'bz; // z = yüksek empedans (açık devre)

  initial begin
    $display("=== NMOS Terminal Anahtarlama Testi ===");
    Vs = 0; Vd = 1;

    Vg = 0; #10;
    $display("Gate = 0V -> Kanal KAPALI. Drain-Source yalıtılmış (Vout: %b)", Vout);

    Vg = 1; #10;
    $display("Gate = 1V -> Kanal AÇIK! Source akımı Drain'e aktı (Vout: %b)", Vout);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== NMOS Terminal Anahtarlama Testi ===",
        "Gate = 0V -> Kanal KAPALI. Drain-Source yalıtılmış (Vout: z)",
        "Gate = 1V -> Kanal AÇIK! Source akımı Drain'e aktı (Vout: 0)",
      ],
    },
    quiz: {
      question: "MOSFET transistörün Gate (Kapı) ucu ile kanalı arasında dielektrik yalıtkan bulunmasının en büyük avantajı nedir?",
      options: [
        "A) Gate ucundan kanala neredeyse hiç DC akım akmaması ve statik durumda güç tasarrufu sağlaması",
        "B) Transistörün 1000 dereceye kadar ısınmasını sağlaması",
        "C) Sadece alternatif akımla çalışabilmesi",
        "D) Gate ucunun tamamen silinmesi",
      ],
      correctIndex: 0,
      explanation: "Doğru! Oksit tabakası mükemmel bir yalıtkandır; bu sayede Gate ucuna uygulanan voltaj transistörü elektrostatik alan ile kontrol ederken DC kaçak akımını sıfıra yakın tutar.",
    },
  },

  "df-threshold-voltage": {
    id: "df-threshold-voltage",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Eşik Gerilimi (Threshold Voltage) & Kanal Oluşumu",
    subtitle: "Vth parametresi, P-gövdede elektron inversiyonu (Inversion Layer) ve güçlü terslenme.",
    sections: [
      {
        title: "1. Eşik Gerilimi (Threshold Voltage - Vth) Nedir?",
        content: `Bir NMOS transistörün Gate ucuna sıfır volt verildiğinde, P-tipi gövde üzerinde Source ve Drain (N+) arasında iletim yolu yoktur.
Gate ucuna pozitif voltaj uygulanmaya başlandığında:
1. **Fakirleşme (Depletion):** Pozitif Gate voltajı P-gövdedeki pozitif delikleri aşağıya doğru iter. Oksit altında hareketsiz negatif iyonlar kalır.
2. **İnversiyon (Inversion):** Gate voltajı belirli bir kritik seviyeyi aştığında, P-gövdedeki azınlık elektronları oksit yüzeyine çekilir. Yüzeydeki elektron yoğunluğu delik yoğunluğunu geçer; adeta P-tipi silikon yüzeyinde yapay bir **N-kanalı** oluşur!
Bu kritik voltaj değerine **Eşik Gerilimi (Threshold Voltage - Vth)** denir (Modern çiplerde genellikle 0.3V - 0.5V civarındadır).`,
      },
      {
        title: "2. Vgs ve Vth İlişkisi",
        content: `- **\`Vgs < Vth\`**: Transistör kesimdedir (Off). Kanal oluşmamıştır.
- **\`Vgs > Vth\`**: Güçlü inversiyon oluşmuştur (On). Source ile Drain arasında kesintisiz bir elektron otoyolu açılmıştır.`,
      },
    ],
    playground: {
      title: "Vgs vs Vth Kanal Açılma Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_threshold;
  real Vgs;
  real Vth;

  initial begin
    Vth = 0.40; // 400 mV eşik gerilimi
    $display("=== NMOS Eşik Gerilimi (Vth = 0.40V) Testi ===");
    $display("Vgs (Volt) | Durum");

    for (Vgs = 0.0; Vgs <= 1.0; Vgs = Vgs + 0.2) begin
      if (Vgs < Vth)
        $display(" %4.2f V   | KESİM (OFF): Kanal kapalı, akım yok.", Vgs);
      else
        $display(" %4.2f V   | İLETİM (ON): İnversiyon kanalı açıldı!", Vgs);
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== NMOS Eşik Gerilimi (Vth = 0.40V) Testi ===",
        "Vgs (Volt) | Durum",
        " 0.00 V   | KESİM (OFF): Kanal kapalı, akım yok.",
        " 0.20 V   | KESİM (OFF): Kanal kapalı, akım yok.",
        " 0.40 V   | İLETİM (ON): İnversiyon kanalı açıldı!",
        " 0.60 V   | İLETİM (ON): İnversiyon kanalı açıldı!",
        " 0.80 V   | İLETİM (ON): İnversiyon kanalı açıldı!",
        " 1.00 V   | İLETİM (ON): İnversiyon kanalı açıldı!",
      ],
    },
    quiz: {
      question: "NMOS transistörde Gate voltajı Vth eşik değerini aştığında P-gövde yüzeyinde oluşan elektron tabakasına fizikte ne ad verilir?",
      options: [
        "A) Kovalent bağ",
        "B) İnversiyon tabakası (Inversion Layer)",
        "C) Plazma küresi",
        "D) Schottky bariyeri",
      ],
      correctIndex: 1,
      explanation: "Doğru! Pozitif Gate gerilimi P-tipi tabakanın yüzeyine elektronları çekerek tipi tersine çevirir (N-tipine dönüştürür); buna inversiyon tabakası denir.",
    },
  },

  "df-drain-current-regimes": {
    id: "df-drain-current-regimes",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "MOSFET Çalışma Bölgeleri (Cutoff, Linear, Saturation)",
    subtitle: "Lineer (Triyot) bölge, Kanal Boğulması (Pinch-off) ve Doyum (Saturation) bölgesi akım formülleri.",
    sections: [
      {
        title: "1. Üç Temel Çalışma Bölgesi",
        content: `MOSFET'in Drain ucundan akan akım (\`Id\`), Gate-Source voltajı (\`Vgs\`) ve Drain-Source voltajına (\`Vds\`) bağlı olarak 3 bölgeye ayrılır:
1. **Kesim Bölgesi (Cutoff Region - \`Vgs < Vth\`):** Transistör kapalıdır, \`Id ≈ 0\`.
2. **Lineer / Triyot Bölgesi (\`Vgs > Vth\` ve \`Vds < Vgs - Vth\`):** Kanal baştan sona açıktır. MOSFET bir direnç gibi davranır; \`Vds\` arttıkça akım doğrusal olarak artar.
3. **Doyum Bölgesi (Saturation Region - \`Vgs > Vth\` ve \`Vds ≥ Vgs - Vth\`):** Drain ucundaki yüksek gerilim kanalı o uçta sıfıra indirir (**Kanal Boğulması - Pinch-off**). Bu noktadan sonra \`Vds\` artsa bile akım neredeyse sabit kalır! Transistör akım kaynağı gibi davranır.`,
      },
      {
        title: "2. Doyum Akımı Formülü (Square-Law)",
        content: `İdeal uzun kanallı doyum bölgesi akımı:
\`Id = 1/2 · μn · Cox · (W / L) · (Vgs - Vth)²\`
Bu formüldeki en kritik terim **\`(Vgs - Vth)\`** yani aşırı sürüş gerilimidir (Overdrive Voltage - \`Vov\`). Akım bu farkın karesiyle büyür!`,
      },
    ],
    playground: {
      title: "MOSFET Vds vs Id Karakteristiği ve Pinch-off Noktası",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_regimes;
  real Vgs, Vth, Vds, Vov;
  real Id_mA;

  initial begin
    Vgs = 1.0;
    Vth = 0.4;
    Vov = Vgs - Vth; // 0.6V aşırı sürüş gerilimi
    $display("=== MOSFET Akım Bölgeleri Analizi (Vov = 0.6V) ===");
    $display("Vds (V) | Bölge      | Davranış");

    for (Vds = 0.1; Vds <= 1.0; Vds = Vds + 0.2) begin
      if (Vds < Vov)
        $display(" %4.2f V  | LINEER     | Direnç gibi, Vds arttıkça akım artıyor.", Vds);
      else
        $display(" %4.2f V  | DOYUM (SAT)| PINCH-OFF! Akım Vds'den bağımsız sabitlendi.", Vds);
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== MOSFET Akım Bölgeleri Analizi (Vov = 0.6V) ===",
        "Vds (V) | Bölge      | Davranış",
        " 0.10 V  | LINEER     | Direnç gibi, Vds arttıkça akım artıyor.",
        " 0.30 V  | LINEER     | Direnç gibi, Vds arttıkça akım artıyor.",
        " 0.50 V  | LINEER     | Direnç gibi, Vds arttıkça akım artıyor.",
        " 0.70 V  | DOYUM (SAT)| PINCH-OFF! Akım Vds'den bağımsız sabitlendi.",
        " 0.90 V  | DOYUM (SAT)| PINCH-OFF! Akım Vds'den bağımsız sabitlendi.",
      ],
    },
    quiz: {
      question: "MOSFET'te Drain-Source gerilimi Vds ≥ (Vgs - Vth) olduğunda kanalın Drain ucunda daralarak kapanmasına ve akımın doymasına ne ad verilir?",
      options: [
        "A) Kırılma (Breakdown)",
        "B) Kanal Boğulması (Pinch-off)",
        "C) Çığ etkisi (Avalanche)",
        "D) Erime (Melting)",
      ],
      correctIndex: 1,
      explanation: "Doğru! Drain ucundaki potansiyel yükseldiğinde oradaki dikey elektrik alanı zayıflar ve kanal o uçta boğulur (Pinch-off); bu doyum bölgesinin başlangıcıdır.",
    },
  },

  "df-nmos-vs-pmos": {
    id: "df-nmos-vs-pmos",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "NMOS vs PMOS Transistör Karşılaştırması",
    subtitle: "Elektron vs delik akışı, pull-up vs pull-down rolleri, PMOS balon simgesi ve boyutlandırma kuralları.",
    sections: [
      {
        title: "1. NMOS ve PMOS Farkları",
        content: `| Özellik | NMOS | PMOS |
|---|---|---|
| **Kanal Tipi** | N-kanalı (Elektronlar) | P-kanalı (Boşluklar/Delikler) |
| **Gövde (Substrate)** | P-tipi | N-well (N-kuyusu) |
| **İletim Koşulu** | Gate = 1 (HIGH) iken ON | Gate = 0 (LOW) iken ON |
| **İyi İlettiği Voltaj** | Güçlü 0 (GND), Zayıf 1 | Güçlü 1 (VDD), Zayıf 0 |
| **Hareketlilik (μ)** | Yüksek (~1400 cm²/Vs) | Düşük (~450 cm²/Vs) |
| **Şematik Sembolü** | Düz Gate ucu | Gate ucunda tersleme baloncuk halkası |`,
      },
      {
        title: "2. Güçlü 0 ve Güçlü 1 Prensibi",
        content: `- **NMOS:** Çıkışı GND'ye (0V) mükemmel çeker (Güçlü 0 iletir). Ancak çıkışı VDD'ye çekmeye çalışırsa \`VDD - Vth\` seviyesinde tıkanır (Zayıf 1). Bu yüzden mantık devrelerinde **Pull-Down (Aşağı Çekici)** ağında kullanılır.
- **PMOS:** Çıkışı VDD'ye mükemmel taşır (Güçlü 1 iletir). Ancak GND'ye çekmeye kalkarsa \`|Vth|\` seviyesinde takılır (Zayıf 0). Bu yüzden **Pull-Up (Yukarı Çekici)** ağında kullanılır.`,
      },
    ],
    playground: {
      title: "NMOS ve PMOS Tamamlayıcı (CMOS) Çalışma Mantığı",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_nmos_pmos;
  reg In;
  wire nmos_on;
  wire pmos_on;

  // NMOS In=1 iken açılır, PMOS In=0 iken açılır
  assign nmos_on = (In == 1'b1);
  assign pmos_on = (In == 1'b0);

  initial begin
    $display("=== NMOS vs PMOS Tetiklenme Tablosu ===");
    $display("Giriş (In) | PMOS Durumu (Pull-Up) | NMOS Durumu (Pull-Down)");

    In = 0; #10;
    $display("    0      | AÇIK (İletimde)       | KAPALI (Yalıtkan)");

    In = 1; #10;
    $display("    1      | KAPALI (Yalıtkan)     | AÇIK (İletimde)");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== NMOS vs PMOS Tetiklenme Tablosu ===",
        "Giriş (In) | PMOS Durumu (Pull-Up) | NMOS Durumu (Pull-Down)",
        "    0      | AÇIK (İletimde)       | KAPALI (Yalıtkan)",
        "    1      | KAPALI (Yalıtkan)     | AÇIK (İletimde)",
      ],
    },
    quiz: {
      question: "Dijital mantık devrelerinde NMOS transistörler neden Pull-Up (yukarı çekici) yerine Pull-Down (aşağı çekici) ağında kullanılır?",
      options: [
        "A) Çünkü NMOS çıkışı 0V'a (GND) mükemmel çeker (Güçlü 0), fakat VDD'ye zayıf taşır",
        "B) NMOS sadece eksi voltajlarda çalışır",
        "C) NMOS transistörlerin üretimi çok pahalıdır",
        "D) PMOS transistörlerin sıfır voltu hiç tanımaması",
      ],
      correctIndex: 0,
      explanation: "Doğru! NMOS transistörler 0V'u eşik gerilimi kaybı olmadan tam 'Güçlü 0' olarak iletirken, VDD seviyesini (VDD - Vth) seviyesine kadar düşürür.",
    },
  },

  "df-leakage-short-channel": {
    id: "df-leakage-short-channel",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Eşikaltı Kaçak Akımı & Kısa Kanal Etkileri (Short Channel Effects)",
    subtitle: "DIBL (Drain-Induced Barrier Lowering), kuantum tünelleme, FinFET ve GAAFET mimarilerine geçiş nedeni.",
    sections: [
      {
        title: "1. Kısa Kanal Etkileri (Short Channel Effects - SCE) Nedir?",
        content: `Transistörün kanal uzunluğu (\`L\`) mikrometrelerden nanometreler seviyesine küçüldükçe, Drain ucundaki yüksek elektrik alanı Gate'in kontrolünü gasp etmeye başlar:
- **DIBL (Drain-Induced Barrier Lowering):** Drain voltajı Source-kanal arasındaki potansiyel bariyeri alçaltır; Gate istemese bile transistör kendiliğinden açılır!
- **Hız Doyumu (Velocity Saturation):** Elektronlar artık elektrik alanıyla sonsuz hızlanamaz; optik fonon saçılmasıyla maksimum hıza (\`vsat ≈ 10^7 cm/s\`) ulaşır ve takılır.`,
      },
      {
        title: "2. Eşikaltı Kaçak Akımı (Subthreshold Leakage)",
        content: `İdeal bir anahtar kapatıldığında akım tam sıfır olmalıdır. Ancak gerçek transistörlerde \`Vgs < Vth\` iken bile üstel olarak azalan bir **eşikaltı akım (Subthreshold Current)** akar.
Milyarlarca transistör kapalıyken bile arka planda devasa bir statik kaçak akım tüketir. Akıllı telefonların cebinizde dururken bile şarjının bitmesinin ve ısınmasının bir numaralı sorumlusu bu kaçak akımdır!`,
      },
      {
        title: "3. Çözüm: Düzlemsel MOSFET'ten FinFET ve GAAFET'e Geçiş",
        content: `Kanalı tek taraftan (üstten) kontrol etmek yetersiz kalınca:
- **FinFET (3D Gate):** Kanal ince bir yüzgeç (fin) haline getirildi ve Gate kanalı 3 taraftan sardı.
- **GAAFET (Gate-All-Around / Nanosheet):** Kanal yatay nano-şeritler haline getirildi ve Gate kanalı 4 taraftan tamamen sarmalayarak kaçak akımı asgariye indirdi.`,
      },
    ],
    playground: {
      title: "Statik Kaçak Gücü ve DIBL Bariyer Alçalması Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_leakage;
  integer transistor_sayisi_milyar;
  real transistor_basi_kacak_nA;
  real toplam_kacak_amper;
  real besleme_V;
  real kacak_guc_watt;

  initial begin
    transistor_sayisi_milyar = 15; // Modern bir mobil SoC (15 Milyar Transistör)
    transistor_basi_kacak_nA = 0.5; // Transistör başına 0.5 nA sızıntı
    besleme_V = 0.8; // 0.8V VDD

    // Toplam Kaçak = 15e9 * 0.5e-9 A = 7.5 Amper!
    toplam_kacak_amper = transistor_sayisi_milyar * transistor_basi_kacak_nA;
    kacak_guc_watt = toplam_kacak_amper * besleme_V;

    $display("=== Modern Mobil Çip Statik Kaçak Güç Analizi ===");
    $display("Transistör Sayısı   : %d Milyar", transistor_sayisi_milyar);
    $display("Toplam Kaçak Akımı  : %5.2f Amper (Hiçbir işlem yapılmazken!)", toplam_kacak_amper);
    $display("Statik Güç Tüketimi : %5.2f Watt (Isıya dönüşen boşa güç)", kacak_guc_watt);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Modern Mobil Çip Statik Kaçak Güç Analizi ===",
        "Transistör Sayısı   : 15 Milyar",
        "Toplam Kaçak Akımı  :  7.50 Amper (Hiçbir işlem yapılmazken!)",
        "Statik Güç Tüketimi :  6.00 Watt (Isıya dönüşen boşa güç)",
      ],
    },
    quiz: {
      question: "Geleneksel düzlemsel (planar) transistörler yerine 3D FinFET ve GAAFET (Gate-All-Around) mimarilerine geçilmesinin ana mühendislik sebebi nedir?",
      options: [
        "A) Transistörleri daha renkli üretmek",
        "B) Gate'in kanalı çok taraftan sararak kısa kanal kaçak akımlarını (leakage) bastırması",
        "C) Çiplerin daha ağır olmasını sağlamak",
        "D) Sadece analog ses devreleri üretmek",
      ],
      correctIndex: 1,
      explanation: "Doğru! FinFET ve GAAFET mimarileri Gate elektrodunun kanalı 3 ve 4 taraftan sarmasını sağlayarak elektrostatik kontrolü artırır ve eşikaltı kaçak akımını engeller.",
    },
  },
};
