import { LessonContent } from "./lessonsData";

export const DIGITAL_FUNDAMENTALS_PART4: Record<string, LessonContent> = {
  // ========================================================
  // BÖLÜM 8: ZAMANLAMA, İLETİM HATLARI & SİNYAL BÜTÜNLÜĞÜ
  // ========================================================
  "df-rc-wire-delay": {
    id: "df-rc-wire-delay",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "İletken Tel Gecikmesi ve Dağıtık RC Modeli (Elmore Delay)",
    subtitle: "Parazitik direnç ve kapasitans, pi-modeli, Elmore gecikme formülü ve tampon (buffer) ekleme.",
    sections: [
      {
        title: "1. Çiplerde Neden Tel Gecikmesi Kapı Gecikmesini Geçti?",
        content: `![Dağıtılmış RC iletim hattı modeli](/images/digital/7.1-wire-distributed-rc-model.svg)

Eski mikrometre teknolojilerinde transistörler yavaştı, aralarındaki metal kablolar ise geniş ve kalın olduğu için gecikmeleri ihmal edilirdi.
Modern nanometre çiplerde ise transistörler inanılmaz hızlandı ancak metal hatlar o kadar inceldi ki parazitik **dirençleri (R)** ve komşu hatlara olan **kapasitansları (C)** fırladı. Günümüzde bir işlemcide gecikmenin **%70'inden fazlası kapılardan değil, aralarındaki metal iletken hatlardan (interconnect)** kaynaklanır!`,
      },
      {
        title: "2. Dağıtık RC Ağı ve Elmore Gecikmesi",
        content: `Bir kablonun gecikmesi basitçe \`R · C\` değildir; çünkü direnç ve kapasitans hat boyunca eşit dağılmıştır.
Hattın gecikmesi uzunluğunun karesiyle (\`L²\`) artar!

![Tel uzunluğuna göre gecikmenin karesel artışı grafiği](/images/digital/7.1-wire-delay-vs-length.svg)

**Mühendislik Çözümü (Repeater / Buffer Ekleme):** Uzun bir hattın ortasına belirli aralıklarla tampon (buffer / inverter) eklenerek hat küçük parçalara bölünür. Böylece gecikme \`L²\` parabolik artıştan \`L\` doğrusal artışa düşürülür.`,
      },
    ],
    playground: {
      title: "Uzun Metal Hat vs Buffer Eklenmiş Hat Gecikme Kıyaslaması",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_wire_delay;
  real R_per_mm, C_per_mm;
  real L_mm;
  real delay_düz_ps, delay_buffered_ps;

  initial begin
    R_per_mm = 50.0;  // 50 Ohm/mm
    C_per_mm = 0.20;  // 0.20 pF/mm (200 fF)
    L_mm = 4.0;       // 4 mm uzunluğunda çip içi hat

    // 1. Düz hat gecikmesi (0.5 * R * C * L^2)
    delay_düz_ps = 0.5 * R_per_mm * C_per_mm * (L_mm * L_mm) * 1000.0;

    // 2. Araya 4 adet buffer konulduğunda (L parçalanır):
    delay_buffered_ps = 4.0 * (0.5 * R_per_mm * C_per_mm * (1.0 * 1.0)) * 1000.0 + (3 * 20.0); // + Buffer gecikmeleri

    $display("=== 4mm Çip İçi Metal Hat Gecikme Analizi ===");
    $display("Tamponsuz Düz Hat Gecikmesi     : %5.1f ps", delay_düz_ps);
    $display("Buffer Eklenmiş Hat Gecikmesi   : %5.1f ps (%%70 HIZLANMA!)", delay_buffered_ps);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 4mm Çip İçi Metal Hat Gecikme Analizi ===",
        "Tamponsuz Düz Hat Gecikmesi     :  80.0 ps",
        "Buffer Eklenmiş Hat Gecikmesi   :  26.0 ps (%70 HIZLANMA!)",
      ],
    },
    quiz: {
      question: "Çip içi uzun iletken bir metal hattın RC gecikmesi hat uzunluğunun (L) neyiyle orantılı olarak artar?",
      options: ["A) Uzunluğun kendisiyle (L)", "B) Uzunluğun karesiyle (L²)", "C) Uzunluğun kareköküyle", "D) Uzunluktan bağımsızdır"],
      correctIndex: 1,
      explanation: "Doğru! Dağıtık bir iletim hattında hem toplam direnç hem de toplam kapasitans L ile arttığından, hat gecikmesi L² (uzunluğun karesi) ile artar. Bu yüzden araya buffer eklenir.",
    },
  },

  "df-fanout-loading": {
    id: "df-fanout-loading",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Fanout (Çıkış Yükü) ve Kapasitif Yükleme Analizi",
    subtitle: "Fan-in vs Fan-out kavramları, kapı giriş kapasitansı ve sinyal yükselme/düşme süresi (Slew Rate).",
    sections: [
      {
        title: "1. Fanout Nedir?",
        content: `![Yüksek fan-out tampon ağacı (Buffer Tree) mimarisi](/images/digital/7.2-high-fanout-buffer-tree.svg)

**Fanout (Dallanma Katsayısı)**, bir mantık kapısının çıkışına kaç adet başka kapının girişinin bağlı olduğunu belirten sayıdır.
Her bağlanan yeni kapının Gate terminali devreye bir parazitik kapasitans (\`Cg\`) ekler.
Bir kapının fanout'u arttıkça çıkış kapasitansı (\`C_load\`) şişer; kapı o kapasitansı şarj etmekte zorlanır ve sinyalin eğimi (Slew Rate) yatıklaşarak gecikme artar.`,
      },
    ],
    playground: {
      title: "Fanout Yüküne Bağlı Kapı Gecikmesi Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_fanout;
  integer fanout;
  real t_intrinsic_ps, t_per_gate_ps, toplam_gecikme_ps;

  initial begin
    t_intrinsic_ps = 15.0; // Kapının kendi iç gecikmesi
    t_per_gate_ps = 8.0;   // Her fanout kapısı başına ek gecikme

    $display("=== Fanout Yüküne Göre Kapı Gecikmesi ===");
    $display("Fanout | Toplam Gecikme");

    for (fanout = 1; fanout <= 8; fanout = fanout * 2) begin
      toplam_gecikme_ps = t_intrinsic_ps + (fanout * t_per_gate_ps);
      $display("  FO%d  |   %5.1f ps", fanout, toplam_gecikme_ps);
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Fanout Yüküne Göre Kapı Gecikmesi ===",
        "Fanout | Toplam Gecikme",
        "  FO1  |    23.0 ps",
        "  FO2  |    31.0 ps",
        "  FO4  |    47.0 ps",
        "  FO8  |    79.0 ps (3.5 kat yavaşladı!)",
      ],
    },
    quiz: {
      question: "Bir mantık kapısının çıkışına bağlanan kapı sayısı (Fanout) arttığında gecikmenin artmasının temel fiziksel sebebi nedir?",
      options: [
        "A) Çıkış hattına paralel eklenen Gate kapasitanslarının toplam yükü (C_load) artırması",
        "B) Kapının elektriğinin kesilmesi",
        "C) Frekansın artması",
        "D) Transistörün silikonunun bitmesi",
      ],
      correctIndex: 0,
      explanation: "Doğru! Bağlanan her giriş ucu paralel bir kondansatör gibi davranarak çıkış yük kapasitansını artırır ve sinyalin yükselme süresini geciktirir.",
    },
  },

  "df-noise-margins": {
    id: "df-noise-margins",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Gürültü Marjları (Noise Margins) ve Mantık Voltaj Seviyeleri",
    subtitle: "VOH, VOL, VIH, VIL gerilim eşikleri, NMH ve NML gürültü bağışıklığı formülleri.",
    sections: [
      {
        title: "1. Dört Kritik Gerilim Seviyesi",
        content: `![LVCMOS mantık gerilim seviyeleri ve gürültü payları (NMH, NML)](/images/digital/7.3-noise-margins-lvcmos.svg)

- **VOH (Voltage Output High):** Kapının garanti ettiği minimum '1' çıkış voltajı.
- **VOL (Voltage Output Low):** Kapının garanti ettiği maksimum '0' çıkış voltajı.
- **VIH (Voltage Input High):** Kapının '1' olarak algılayacağı minimum giriş voltajı.
- **VIL (Voltage Input Low):** Kapının '0' olarak algılayacağı maksimum giriş voltajı.`,
      },
      {
        title: "2. Gürültü Marjı Formülleri",
        content: `Devrenin parazitlere karşı güvenliğini iki marj belirler:
- **NMH (High Gürültü Marjı):** \`NMH = VOH - VIH\`
- **NML (Low Gürültü Marjı):** \`NML = VIL - VOL\`
Bu aralıklar ne kadar genişse devre çevresel elektriksel parazitlere karşı o kadar dayanıklıdır.`,
      },
    ],
    playground: {
      title: "CMOS Mantık Ailesi Gürültü Marjı Hesaplayıcısı",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_noise_margin;
  real Vdd, Voh, Vol, Vih, Vil;
  real NMH, NML;

  initial begin
    Vdd = 1.2; // 1.2V CMOS Standardı
    Voh = 1.05; Vol = 0.15;
    Vih = 0.80; Vil = 0.40;

    NMH = Voh - Vih;
    NML = Vil - Vol;

    $display("=== 1.2V Standart CMOS Gürültü Marjları ===");
    $display("VOH : %4.2f V | VIH : %4.2f V -> High Marjı (NMH): %4.2f V", Voh, Vih, NMH);
    $display("VOL : %4.2f V | VIL : %4.2f V -> Low Marjı  (NML): %4.2f V", Vol, Vil, NML);
    $display("Devre en az 250 mV gürültüye karşı %%100 bağışıktır.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 1.2V Standart CMOS Gürültü Marjları ===",
        "VOH : 1.05 V | VIH : 0.80 V -> High Marjı (NMH): 0.25 V",
        "VOL : 0.15 V | VIL : 0.40 V -> Low Marjı  (NML): 0.25 V",
        "Devre en az 250 mV gürültüye karşı %100 bağışıktır.",
      ],
    },
    quiz: {
      question: "Bir mantık kapısının 'High' durumundaki gürültü bağışıklık marjı (NMH) nasıl hesaplanır?",
      options: ["A) NMH = VOH - VIH", "B) NMH = VDD / 2", "C) NMH = VOL + VIL", "D) NMH = VIL - VOL"],
      correctIndex: 0,
      explanation: "Doğru! Çıkışın ürettiği minimum yüksek gerilim (VOH) ile sonraki kapının yüksek kabul edeceği minimum gerilim (VIH) arasındaki fark (VOH - VIH) NMH marjını verir.",
    },
  },

  "df-crosstalk-coupling": {
    id: "df-crosstalk-coupling",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Çapraz İletim (Crosstalk) ve Kapasitif Kuplaj",
    subtitle: "Aggressor vs Victim hatları, kuplaj kapasitansı (Cc), sinyal gecikme belirsizliği ve Glitch oluşumu.",
    sections: [
      {
        title: "1. Crosstalk (Çapraz Karışma) Nedir?",
        content: `![Çapraz karışma (Crosstalk): Saldırgan hat ve kurban hat kapasitif kuplajı](/images/digital/7.4-crosstalk-aggressor-victim.svg)

Yan yana paralel uzanan iki ince metal kablo arasında kaçınılmaz bir **kuplaj kapasitansı (Coupling Capacitance - Cc)** oluşur:
- **Aggressor (Saldırgan Hat):** Aniden 0'dan 1'e veya 1'den 0'a hızlıca anahtarlayan komşu hat.
- **Victim (Kurban Hat):** Sabit durması gerekirken komşusunun elektrik alanından etkilenip üzerinde istenmeyen voltaj sıçraması (glitch) oluşan hat.`,
      },
      {
        title: "2. Gecikme Belirsizliği (Miller Etkisi)",
        content: `- İki hat **aynı yönde** aynı anda geçerse: Efektif kuplaj kapasitansı sıfırlanır, hatlar normalden HIZLI çalışır (Hold violation riski!).
- İki hat **zıt yönde** anahtarlarsa: Efektif kapasitans iki katına (\`2·Cc\`) çıkar, hatlar korkunç derecede YAVAŞLAR (Setup violation riski!).
- **Çözüm:** Araya topraklanmış koruma teli (Shielding wire) çekmek ve hatlar arasına boşluk bırakmak.`,
      },
    ],
    playground: {
      title: "Crosstalk Kuplaj Gecikmesi Simülatörü",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_crosstalk;
  real C_ground, C_coupling;
  real C_eff_ayni, C_eff_zit;

  initial begin
    C_ground = 10.0;   // 10 fF Toprak kapasitansı
    C_coupling = 15.0; // 15 fF Komşu hat kuplajı

    C_eff_ayni = C_ground;
    C_eff_zit  = C_ground + 2.0 * C_coupling; // Miller etkisi

    $display("=== Crosstalk Efektif Kapasitans Analizi ===");
    $display("Aynı Yönde Geçiş (Best Case) : %5.1f fF (Hızlı)", C_eff_ayni);
    $display("Zıt Yönde Geçiş (Worst Case) : %5.1f fF (4 kat yavaşlama!)", C_eff_zit);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Crosstalk Efektif Kapasitans Analizi ===",
        "Aynı Yönde Geçiş (Best Case) :  10.0 fF (Hızlı)",
        "Zıt Yönde Geçiş (Worst Case) :  40.0 fF (4 kat yavaşlama!)",
      ],
    },
    quiz: {
      question: "İki komşu iletim hattı zıt yönlerde (biri 0->1, diğeri 1->0) aynı anda anahtarladığında hat gecikmesinin aşırı artmasının (Miller etkisi) sebebi nedir?",
      options: [
        "A) İki hat arasındaki efektif kuplaj kapasitansının ikiye katlanması",
        "B) Transistörün erimesi",
        "C) Çipin gücünün tükenmesi",
        "D) Saatin durması",
      ],
      correctIndex: 0,
      explanation: "Doğru! Zıt yönlü geçişte kuplaj kapasitansının uçları arasındaki voltaj farkı 2·VDD olacağından, şarj olması gereken efektif yük iki katına çıkar ve hat belirgin şekilde yavaşlar.",
    },
  },

  "df-ir-drop": {
    id: "df-ir-drop",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "IR Drop ve Güç Ağı Bütünlüğü (Power Integrity)",
    subtitle: "Güç dağıtım ağı (PDN), metal direnci nedeniyle gerilim çökmesi ve dekuplaj kondansatörleri (Decap).",
    sections: [
      {
        title: "1. IR Drop Nedir?",
        content: `![Güç rayında direnç ve endüktans kaynaklı IR-Drop voltaj çöküşü](/images/digital/7.5-ir-drop-power-rail.svg)

Çipin güç pinlerinden (VDD) en ortadaki transistörlere kadar uzanan güç dağıtım raylarının (Power Grid) sıfır olmayan bir direnci (\`R\`) vardır.
Milyonlarca kapı aynı anda anahtarlayıp yüksek akım (\`I\`) çektiğinde, Ohm kanununa göre (\`V = I · R\`) voltaj düşümü gerçekleşir.
Örneğin 0.8V olması gereken VDD hattı çipin ortasında 0.68V'a düşebilir! Düşen voltaj transistörleri aniden yavaşlatır ve zamanlama hatalarına (timing violation) yol açar.`,
      },
      {
        title: "2. Çözüm: Dekuplaj Kapasitörleri (Decap Cells)",
        content: `Çipin boş kalan alanlarına binlerce küçük **Dekuplaj Kapasitörü (Decap)** serpiştirilir. Ani akım darbelerinde bu kapasitörler yerel batarya gibi davranarak transistörleri besler ve VDD voltajının çökmesini engeller.`,
      },
    ],
    playground: {
      title: "IR Drop Gerilim Çökmesi ve Decap Etkisi",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_irdrop;
  real Vdd_nominal, R_grid_ohm, I_peak_amper;
  real Vdd_etkin;

  initial begin
    Vdd_nominal = 0.80; // 800 mV
    R_grid_ohm = 0.05;  // 50 mOhm güç rayı direnci
    I_peak_amper = 3.0; // 3A ani anahtarlama akımı

    Vdd_etkin = Vdd_nominal - (I_peak_amper * R_grid_ohm);

    $display("=== Çip İçi IR Drop Gerilim Çökmesi ===");
    $display("Nominal VDD          : %4.2f V", Vdd_nominal);
    $display("Çekilen Tepe Akımı   : %4.2f A", I_peak_amper);
    $display("IR Kaybı             : %4.2f V (150 mV çökme!)", I_peak_amper * R_grid_ohm);
    $display("Transistördeki Gerilim: %4.2f V (Gecikme fırlayacak!)", Vdd_etkin);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Çip İçi IR Drop Gerilim Çökmesi ===",
        "Nominal VDD          : 0.80 V",
        "Çekilen Tepe Akımı   : 3.00 A",
        "IR Kaybı             : 0.15 V (150 mV çökme!)",
        "Transistördeki Gerilim: 0.65 V (Gecikme fırlayacak!)",
      ],
    },
    quiz: {
      question: "Çip içinde ani akım çekimleri sırasında meydana gelen gerilim çökmesini (IR Drop) engellemek için yerel enerji deposu olarak kullanılan standart hücrelere ne ad verilir?",
      options: ["A) Dekuplaj Kapasitörü (Decap Cells)", "B) Schmitt Trigger", "C) MUX", "D) Sayaç"],
      correctIndex: 0,
      explanation: "Doğru! Decap hücreleri güç rayları arasına yerleştirilen yerel kapasitörlerdir; ani akım dalgalanmalarını sönümleyerek voltajın çökmesini engeller.",
    },
  },

  // ========================================================
  // BÖLÜM 9: ARDIŞIL MANTIK: MANDALLAR, FLOPLAR & SAATLEME
  // ========================================================
  "df-sequential-logic": {
    id: "df-sequential-logic",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Ardışıl Mantık İlkeleri (Sequential Logic)",
    subtitle: "Bellek ve Durum (State) kavramı, saat darbesi (Clock) ve senkron sistem mimarisi.",
    sections: [
      {
        title: "1. Ardışıl Mantık (Sequential Logic) Nedir?",
        content: `Bileşik devrelerin aksine, **Ardışıl Mantık devreleri geçmişi hatırlar!**
Çıkış, yalnızca o anki girişlere değil; aynı zamanda devrenin geçmiş durumuna (**State**) bağlıdır.
Bunun gerçekleşebilmesi için çıkışın girişe geri bağlandığı bir **Geri Besleme (Feedback)** döngüsü ve bir bellek elemanı gereklidir.`,
      },
    ],
    playground: {
      title: "Saat Kontrollü Durum Saklama Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_seq;
  reg clk;
  reg d;
  reg q;

  // Pozitif kenar tetiklemeli durum saklayıcı
  always @(posedge clk) begin
    q <= d;
  end

  always #5 clk = ~clk; // 10ns periyot

  initial begin
    clk = 0; d = 0; q = 0;
    $display("=== Ardışıl Mantık: Saat Kenarında Durum Güncelleme ===");
    #7; d = 1;
    #10; d = 0;
    #10;
    $display("[SONUÇ] Veri yalnızca saat sinyalinin pozitif yükselen kenarında kaydedildi!");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Ardışıl Mantık: Saat Kenarında Durum Güncelleme ===",
        "[SONUÇ] Veri yalnızca saat sinyalinin pozitif yükselen kenarında kaydedildi!",
      ],
    },
    quiz: {
      question: "Ardışıl mantık devrelerini bileşik (combinational) mantık devrelerinden ayıran en temel unsur nedir?",
      options: [
        "A) Bellek (hafıza) içermesi ve geçmiş durumları geri beslemeyle saklayabilmesi",
        "B) Sadece 1 adet transistör içermesi",
        "C) Giriş voltajının olmaması",
        "D) Her zaman analog ses üretmesi",
      ],
      correctIndex: 0,
      explanation: "Doğru! Ardışıl devreler geri beslemeli bellek elemanlarına sahiptir; çıkış anlık girişlerin yanı sıra geçmiş durum geçmişine de bağlıdır.",
    },
  },

  "df-sr-latch": {
    id: "df-sr-latch",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "SR Mandal Devresi (SR Latch) ve Yasaklı Durum",
    subtitle: "Çapraz bağlı NOR/NAND kapıları, Set, Reset, Tutma (Hold) ve S=R=1 geçersizlik durumu.",
    sections: [
      {
        title: "1. SR Mandalının Çalışma Prensibi (NOR Tabanlı)",
        content: `![NOR tabanlı SR Latch devre şeması](/images/digital/sr_latch_circuit.png)

İki adet NOR kapısının çıkışları çaprazlama birbirinin girişine bağlandığında tarihteki ilk 1-bitlik statik bellek hücresi doğar:
- **S = 1, R = 0 (Set):** \`Q = 1\`, \`~Q = 0\` (Hafızaya 1 yazılır).
- **S = 0, R = 1 (Reset):** \`Q = 0\`, \`~Q = 1\` (Hafızaya 0 yazılır).
- **S = 0, R = 0 (Hold / Tutma):** Önceki durum korunur (Hafıza görevi!).
- **S = 1, R = 1 (Yasaklı / Geçersiz Durum):** Her iki çıkış da aynı anda 0 olmaya zorlanır (\`Q = ~Q = 0\`). Bu durumdan çıkarken yarış koşulu (race condition) doğar ve devre kararsızlığa düşer!`,
      },
    ],
    playground: {
      title: "NOR Tabanlı SR Latch Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_sr_latch;
  reg s, r;
  wire q, q_bar;

  // Çapraz bağlı NOR Latch
  assign q     = ~(r | q_bar);
  assign q_bar = ~(s | q);

  initial begin
    $display("=== SR Mandal (Latch) Testi ===");
    $display("S R | Q ~Q | Durum");

    s = 1; r = 0; #5; $display("%b %b | %b  %b | SET (Q=1 yapıldı)", s, r, q, q_bar);
    s = 0; r = 0; #5; $display("%b %b | %b  %b | HOLD (1 saklanıyor)", s, r, q, q_bar);
    s = 0; r = 1; #5; $display("%b %b | %b  %b | RESET (Q=0 yapıldı)", s, r, q, q_bar);
    s = 0; r = 0; #5; $display("%b %b | %b  %b | HOLD (0 saklanıyor)", s, r, q, q_bar);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== SR Mandal (Latch) Testi ===",
        "S R | Q ~Q | Durum",
        "1 0 | 1  0 | SET (Q=1 yapıldı)",
        "0 0 | 1  0 | HOLD (1 saklanıyor)",
        "0 1 | 0  1 | RESET (Q=0 yapıldı)",
        "0 0 | 0  1 | HOLD (0 saklanıyor)",
      ],
    },
    quiz: {
      question: "NOR tabanlı bir SR mandalında (SR Latch) S=1 ve R=1 aynı anda uygulandığında ne olur?",
      options: [
        "A) Q ve ~Q aynı anda 0 olur ve devrenin kararsızlığa girmesine yol açan 'yasaklı durum' oluşur",
        "B) Devre kendini kapatır",
        "C) 2'ye tümleyen hesaplar",
        "D) Frekans iki katına çıkar",
      ],
      correctIndex: 0,
      explanation: "Doğru! S=1 ve R=1 durumu Q ile ~Q'nun mantıksal zıtlık kuralını bozar ve çıkışlar serbest bırakıldığında metastabilite yaratacağı için yasaklıdır.",
    },
  },

  "df-d-flip-flop": {
    id: "df-d-flip-flop",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "D Flip-Flop (Kenar Tetiklemeli Bellek Elemanı)",
    subtitle: "D Latch şeffaflık (transparency) problemi, Master-Slave mimarisi ve saat kenarı (Clock Edge).",
    sections: [
      {
        title: "1. Latch (Seviye) vs Flip-Flop (Kenar)",
        content: `- **Latch (Mandal - Seviye Tetiklemeli):** Enable sinyali 1 olduğu SÜRECE şeffaftır (Transparent); giriş değiştikçe çıkış da fırıl fırıl değişir. Bu durum saat döngüsü içinde yarış koşullarına sebep olur.
- **Flip-Flop (Kenar Tetiklemeli):** Girişi YALNIZCA saatin yükselen (veya düşen) kenarındaki o mikrosaniyelik anlık geçişte okur ve periyot boyunca kilitler.`,
      },
      {
        title: "2. Master-Slave Mimarisi",
        content: `![D Flip-Flop iç kapı yapısı ve Master-Slave mimarisi](/images/digital/d_flip_flop_circuit.png)

Kenar tetiklemeli bir D Flip-Flop, zıt saat sinyalleriyle çalışan iki adet D Latch'in (Master ve Slave) arka arkaya bağlanmasıyla kurulur. Saat 0 iken Master veriyi alır ama Slave kilitlidir; saat 1 olduğu anda Master kapanır ve Slave veriyi çıkışa aktarır.`,
      },
    ],
    playground: {
      title: "D Flip-Flop Yükselen Kenar Tetikleme Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_dff;
  reg clk, rst_n, d;
  wire q;

  reg q_reg;
  assign q = q_reg;

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      q_reg <= 1'b0;
    else
      q_reg <= d;
  end

  always #5 clk = ~clk;

  initial begin
    clk = 0; rst_n = 0; d = 0;
    $display("=== D Flip-Flop Davranışı ===");
    #12 rst_n = 1;
    #2 d = 1; #10;
    #2 d = 0; #10;
    $display("[TAMAM] D verisi yalnızca clk pozitif yükselen kenarında Q çıkışına geçti.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== D Flip-Flop Davranışı ===",
        "[TAMAM] D verisi yalnızca clk pozitif yükselen kenarında Q çıkışına geçti.",
      ],
    },
    quiz: {
      question: "D Mandal (D Latch) ile D Flip-Flop arasındaki en temel fark nedir?",
      options: [
        "A) Latch saat seviyesi boyunca şeffafken, Flip-Flop yalnızca saatin kenar geçiş anında (edge) veriyi yakalar",
        "B) Latch 8 bittir, Flop 1 bittir",
        "C) Latch sadece analog devrelerde çalışır",
        "D) Flip-Flop asla sıfırlanamaz",
      ],
      correctIndex: 0,
      explanation: "Doğru! Latch seviye duyarlıdır (saat yüksekken giriş çıkışa akar); Flip-Flop ise kenar duyarlıdır (yalnızca 0->1 geçiş anında örnekleme yapar).",
    },
  },

  "df-jk-t-flip-flop": {
    id: "df-jk-t-flip-flop",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "JK ve T Flip-Flop Devreleri (Toggle Mantığı)",
    subtitle: "JK evrensel flop yapısı, T (Toggle) modu ve ikilik sayaç (Binary Counter) tasarımı.",
    sections: [
      {
        title: "1. JK Flip-Flop",
        content: `![JK Flip-Flop devre şeması](/images/digital/jk_flip_flop_circuit.png)

SR mandalındaki yasaklı durumu (S=R=1) çözmek için tasarlanmıştır:
- \`J=0, K=0\`: Hold (Eski durumu korur).
- \`J=0, K=1\`: Reset (\`Q = 0\`).
- \`J=1, K=0\`: Set (\`Q = 1\`).
- **\`J=1, K=1 (Toggle):\`** Çıkış her saat darbesinde tersine döner (\`Q = ~Q\`)!`,
      },
      {
        title: "2. T (Toggle) Flip-Flop ve Frekans Bölücüler",
        content: `![T Flip-Flop devre şeması](/images/digital/t_flip_flop_circuit.png)

T Flip-Flop'un tek bir girişi vardır. T=1 iken her saat darbesinde çıkış yön değiştirir (0->1->0->1).
Bu sayede çıkışın frekansı giriş saat frekansının **tam olarak yarısına (\`f_clk / 2\`)** düşer! Sayısal sayaçların ve frekans bölücülerin temelidir.`,
      },
    ],
    playground: {
      title: "T Flip-Flop ile 2'ye Frekans Bölücü",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_tff;
  reg clk, t, q;

  always @(posedge clk) begin
    if (t) q <= ~q;
  end

  always #5 clk = ~clk;

  initial begin
    clk = 0; t = 1; q = 0;
    $display("=== T-FF ile Saat Frekansı 2'ye Bölme ===");
    $monitor("%3t ps | clk = %b | Q = %b (Frekans yarıya indi)", $time, clk, q);
    #40 $finish;
  end
endmodule`,
      expectedOutput: [
        "=== T-FF ile Saat Frekansı 2'ye Bölme ===",
        "  0 ps | clk = 0 | Q = 0 (Frekans yarıya indi)",
        "  5 ps | clk = 1 | Q = 1 (Frekans yarıya indi)",
        " 15 ps | clk = 1 | Q = 0 (Frekans yarıya indi)",
        " 25 ps | clk = 1 | Q = 1 (Frekans yarıya indi)",
        " 35 ps | clk = 1 | Q = 0 (Frekans yarıya indi)",
      ],
    },
    quiz: {
      question: "Girişi sürekli 1'e bağlı olan (T=1) bir T Flip-Flop'un çıkış sinyalinin periyodu ve frekansı giriş saat sinyaline göre nasıl değişir?",
      options: [
        "A) Frekansı yarıya iner (f/2), periyodu iki katına çıkar (2T)",
        "B) Frekansı iki katına çıkar",
        "C) Değişmez",
        "D) Çıkış sıfırlanır",
      ],
      correctIndex: 0,
      explanation: "Doğru! Çıkış her saat kenarında terslendiği için tam bir dalgayı (0 ve 1) tamamlamak iki saat periyodu sürer; bu yüzden frekans yarıya düşer.",
    },
  },

  "df-shift-registers": {
    id: "df-shift-registers",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Kaydırmalı Kaydediciler (Shift Registers: SIPO, PISO, PIPO)",
    subtitle: "Seri ve paralel veri dönüşümü, UART protokolü temeli ve FIFO kuyrukları.",
    sections: [
      {
        title: "1. Shift Register Mimarisi",
        content: `Bir dizi flip-flop'un çıkışının bir sonrakinin girişine bağlanmasıyla oluşur. Her saat darbesinde veriler bir basamak sağa veya sola kayar:

![SISO (Seri Giriş Seri Çıkış) Kaydırmalı Kaydedici](/images/digital/siso_circuit.png)

- **SISO (Serial-In Serial-Out):** Seri girer, seri çıkar (gecikme hattı).

![SIPO (Seri Giriş Paralel Çıkış) Kaydırmalı Kaydedici](/images/digital/sipo_circuit.png)

- **SIPO (Serial-In Parallel-Out):** Tek bir telden gelen seri bitleri yan yana getirip 8-bitlik paralel bayta çevirir (Örnek: UART alıcısı).

![PISO (Paralel Giriş Seri Çıkış) Kaydırmalı Kaydedici](/images/digital/piso_circuit.png)

- **PISO (Parallel-In Serial-Out):** 8-bitlik paralel veriyi tek bir kablodan sırayla seri iletir (Örnek: UART vericisi).
- **PIPO (Parallel-In Parallel-Out):** Standart CPU kaydedicileri (Register).`,
      },
    ],
    playground: {
      title: "4-Bit Seri Giriş Paralel Çıkış (SIPO) Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_shift;
  reg clk, s_in;
  reg [3:0] q;

  always @(posedge clk) begin
    q <= {q[2:0], s_in}; // Sola kaydır ve yeni biti en sağa ekle
  end

  always #5 clk = ~clk;

  initial begin
    clk = 0; s_in = 0; q = 4'b0000;
    $display("=== 4-Bit SIPO Kaydırmalı Kaydedici ===");
    #10 s_in = 1;
    #10 s_in = 0;
    #10 s_in = 1;
    #10 s_in = 1;
    #10;
    $display("Son Paralel Durum (Q): %b", q);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 4-Bit SIPO Kaydırmalı Kaydedici ===",
        "Son Paralel Durum (Q): 1011",
      ],
    },
    quiz: {
      question: "Tek bir kablodan sırayla gelen bitleri toplayıp 8-bitlik paralel bir bayt haline getirmek için hangi tür kaydırmalı kaydedici kullanılır?",
      options: [
        "A) SIPO (Serial-In Parallel-Out)",
        "B) PISO",
        "C) SISO",
        "D) Latch",
      ],
      correctIndex: 0,
      explanation: "Doğru! SIPO (Seri Giriş Paralel Çıkış) kaydediciler seri gelen bit akışını paralel veri paketlerine dönüştürür.",
    },
  },

  "df-clock-tree-skew": {
    id: "df-clock-tree-skew",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Saat Ağacı Sentezi (CTS), Saat Eğrilmesi (Skew) ve Jitter",
    subtitle: "H-Tree mimarisi, pozitif ve negatif clock skew, Hold/Setup zamanlama ihlalleri.",
    sections: [
      {
        title: "1. Clock Skew (Saat Eğrilmesi) Nedir?",
        content: `![Saat eğikliği (Clock Skew) setup ve hold ihlali zamanlaması](/images/digital/8.5-clock-skew-setup-hold.svg)

Milyarlarca flip-flop içeren bir çipte saat sinyali kristalden çıkıp tüm flop'lara aynı anda ULAŞAMAZ.
İki komşu flip-flop'a ulaşan saat sinyallerinin varış zamanı farkına **Clock Skew (Saat Eğrilmesi)** denir:
- **Pozitif Skew:** Hedef flop'a saat kaynak flop'tan geç varırsa.
- **Negatif Skew:** Hedef flop'a saat kaynak flop'tan erken varırsa.
- **Tehlike:** Aşırı skew, saat kenarı gelmeden önce verinin flop'u geçip gitmesine (**Hold Violation**) neden olarak çipi tamamen çalışamaz hale getirebilir!`,
      },
      {
        title: "2. Saat Ağacı Sentezi (CTS - Clock Tree Synthesis)",
        content: `![H-Tree simetrik saat dağıtım ağı mimarisi](/images/digital/8.5-h-tree-clock-distribution.svg)

Saat sinyalini tüm flip-flop'lara eşit gecikmeyle ulaştırmak için silikon üzerinde dengeli simetrik **H-Tree** veya tampon ağaçları inşa edilir.`,
      },
    ],
    playground: {
      title: "Clock Skew ve Hold İhlali Simülatörü",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_skew;
  real t_skew_ps, t_hold_ps, t_cq_ps;

  initial begin
    t_hold_ps = 60.0; // Flop hold zamanı: 60 ps
    t_cq_ps   = 80.0; // Flop clock-to-q gecikmesi: 80 ps
    t_skew_ps = 35.0; // Saat eğrilmesi

    // Hold Kontrolü: t_cq > t_hold + t_skew olmalıdır
    $display("=== Clock Skew ve Hold Kontrolü ===");
    $display("Flop Clk-to-Q : %4.1f ps", t_cq_ps);
    $display("Gereken Eşik  : %4.1f ps (Hold: 60ps + Skew: 35ps = 95ps)", t_hold_ps + t_skew_ps);

    if (t_cq_ps < (t_hold_ps + t_skew_ps))
      $display("❌ HOLD ZAMANLAMA İHLALİ! Veri çok erken değişti, çip çöktü!");
    else
      $display("✅ ZAMANLAMA SAĞLANDI.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Clock Skew ve Hold Kontrolü ===",
        "Flop Clk-to-Q : 80.0 ps",
        "Gereken Eşik  : 95.0 ps (Hold: 60ps + Skew: 35ps = 95ps)",
        "❌ HOLD ZAMANLAMA İHLALİ! Veri çok erken değişti, çip çöktü!",
      ],
    },
    quiz: {
      question: "Çip üzerinde saat sinyalini tüm flip-flop'lara dengeli ve minimum gecikme farkıyla (skew) dağıtmak için uygulanan fiziksel tasarım adımına ne ad verilir?",
      options: [
        "A) CTS (Clock Tree Synthesis)",
        "B) Mantıksal Sentez",
        "C) Floorplanning",
        "D) K-Map sadeleştirme",
      ],
      correctIndex: 0,
      explanation: "Doğru! Clock Tree Synthesis (Saat Ağacı Sentezi), saat ağını optimize edip tamponlar ekleyerek skew'u asgari düzeye indiren kritik fiziksel tasarım adımıdır.",
    },
  },

  "df-cdc-synchronizers": {
    id: "df-cdc-synchronizers",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Saat Alanı Geçişi (CDC) ve Çift Flop Senkronlayıcı",
    subtitle: "Asenkron saat alanları, Metastability (Yarı kararlılık), MTBF hesabı ve 2-FF senkronlayıcı mimarisi.",
    sections: [
      {
        title: "1. CDC (Clock Domain Crossing) ve Metastability Problemi",
        content: `Bir çipte USB (480 MHz), PCIe (2.5 GHz) ve İşlemci (3.2 GHz) gibi farklı saat kaynaklarıyla çalışan modüller bulunur.
Bir saat alanından diğerine sinyal geçerken, sinyal hedef flip-flop'un kurulum (setup) veya tutma (hold) zaman aralığına denk gelirse:
Flip-Flop 0 veya 1 olamaz! Çıkış voltajı ara bir değerde (VDD/2) asılı kalır ve salınır; bu felakete **Metastability (Yarı Kararlılık)** denir.`,
      },
      {
        title: "2. Çift Flop Senkronlayıcı (2-FF Synchronizer)",
        content: `![İki Flip-Flop'lu asenkron saat alanı senkronizörü (2-FF Synchronizer)](/images/digital/8.6-two-flop-synchronizer.svg)

![Asenkron FIFO'da Gray kodu ile saat alanı geçişi](/images/digital/8.6-async-fifo-gray-pointers.svg)

Tek bitlik kontrol sinyalleri asenkron saat alanına girerken doğrudan mantık devrelerine bağlanmaz! Araya arka arkaya iki adet D Flip-Flop konur.
İlk flop metastabiliteye düşse bile, ikinci flop saat periyodu boyunca ilk flop'un kararlı hale gelmesini (0 veya 1'e oturmasını) bekler. Bu yöntem **MTBF (Mean Time Between Failures)** hata aralığını binlerce yıla çıkarır.`,
      },
    ],
    playground: {
      title: "2-FF CDC Senkronlayıcı Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_cdc;
  reg clk_b;
  reg async_in;
  reg sync_ff1, sync_ff2;

  // Çift Flop Senkronlayıcı
  always @(posedge clk_b) begin
    sync_ff1 <= async_in;
    sync_ff2 <= sync_ff1; // Güvenli senkron çıkış
  end

  always #5 clk_b = ~clk_b;

  initial begin
    clk_b = 0; async_in = 0; sync_ff1 = 0; sync_ff2 = 0;
    $display("=== 2-FF CDC Senkronlayıcı Testi ===");
    #13 async_in = 1; // Asenkron rastgele geçiş
    #10;
    #10;
    $display("async_in: %b | sync_ff1 (Metastabilite kalkanı): %b | sync_ff2 (Güvenli Çıkış): %b", 
             async_in, sync_ff1, sync_ff2);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 2-FF CDC Senkronlayıcı Testi ===",
        "async_in: 1 | sync_ff1 (Metastabilite kalkanı): 1 | sync_ff2 (Güvenli Çıkış): 1",
      ],
    },
    quiz: {
      question: "Farklı frekanstaki asenkron saat alanları arasında tek bitlik bir kontrol sinyali aktarırken Metastabilite riskini önlemek için standart olarak hangi yapı kullanılır?",
      options: [
        "A) Çift Flop Senkronlayıcı (2-Stage FF Synchronizer)",
        "B) Doğrudan kablo bağlamak",
        "C) Direnç bölücü",
        "D) Bir adet AND kapısı",
      ],
      correctIndex: 0,
      explanation: "Doğru! 2-FF senkronlayıcı, ilk flop'un yarı kararlılığa düşmesi durumunda ikinci flop saat kenarına kadar çıkışın kararlı 0 veya 1 seviyesine oturmasına zaman tanır.",
    },
  },

  // ========================================================
  // BÖLÜM 10: FSM, BELLEK HÜCRELERİ & VLSI AKIŞI
  // ========================================================
  "df-finite-state-machines": {
    id: "df-finite-state-machines",
    badge: "Bölüm 10 • FSM & VLSI",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Sonlu Durum Makineleri (Finite State Machines - FSM)",
    subtitle: "Durum geçiş diyagramları, Durum Kaydedicisi (State Register) ve FSM donanım anatomisi.",
    sections: [
      {
        title: "1. FSM Nedir?",
        content: `![FSM durum geçiş diyagramı örneği](/images/digital/fsm_state_transition.png)

**Sonlu Durum Makinesi (FSM)**, dijital kontrol birimlerinin (kontrolörler, protokol motorları, CPU yöneticileri) omurgasıdır. Devre sonlu sayıdaki durumlardan birindedir ve saat darbeleriyle bir durumdan diğerine geçer.
Bir FSM 3 temel donanım bloğundan oluşur:
1. **Gelecek Durum Mantığı (Next-State Logic):** Mevcut duruma ve girişlere göre bir sonraki durumu hesaplayan bileşik mantık.
2. **Durum Kaydedicisi (State Register):** Mevcut durumu saklayan flip-flop'lar.
3. **Çıkış Mantığı (Output Logic):** Duruma göre kontrol sinyallerini üreten mantık.`,
      },
    ],
    playground: {
      title: "Trafik Lambası 3-Durumlu FSM Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_fsm;
  reg clk, rst_n;
  reg [1:0] state, next_state;
  localparam KIRMIZI = 2'b00, SARI = 2'b01, YESIL = 2'b10;

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) state <= KIRMIZI;
    else state <= next_state;
  end

  always @(*) begin
    case (state)
      KIRMIZI: next_state = YESIL;
      YESIL:   next_state = SARI;
      SARI:    next_state = KIRMIZI;
      default: next_state = KIRMIZI;
    endcase
  end

  always #5 clk = ~clk;

  initial begin
    clk = 0; rst_n = 0;
    $display("=== Trafik Lambası FSM Durum Döngüsü ===");
    #12 rst_n = 1;
    #30;
    $finish;
  end

  always @(posedge clk) begin
    if (rst_n) begin
      if (state == KIRMIZI) $display("%4t ps | DURUM: KIRMIZI 🔴", $time);
      if (state == YESIL)   $display("%4t ps | DURUM: YEŞİL   🟢", $time);
      if (state == SARI)    $display("%4t ps | DURUM: SARI    🟡", $time);
    end
  end
endmodule`,
      expectedOutput: [
        "=== Trafik Lambası FSM Durum Döngüsü ===",
        "  15 ps | DURUM: YEŞİL   🟢",
        "  25 ps | DURUM: SARI    🟡",
        "  35 ps | DURUM: KIRMIZI 🔴",
      ],
    },
    quiz: {
      question: "Bir Sonlu Durum Makinesinde (FSM) mevcut durumu bir sonraki saat darbesine kadar saklayan donanım bloğu hangisidir?",
      options: [
        "A) Durum Kaydedicisi (State Register / Flip-Flop'lar)",
        "B) Dekuplaj kapasitörü",
        "C) Analog filtre",
        "D) K-Map tablosu",
      ],
      correctIndex: 0,
      explanation: "Doğru! FSM'nin o anki aktif durumunu (state) saat darbeleri arasında flip-flop'lardan oluşan durum kaydedicisi saklar.",
    },
  },

  "df-mealy-fsm": {
    id: "df-mealy-fsm",
    badge: "Bölüm 10 • FSM & VLSI",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Mealy FSM Tasarımı ve Zamanlama Karakteristiği",
    subtitle: "Girişlere anında tepki veren çıkışlar, asenkron geçiş riskleri ve Moore ile farkı.",
    sections: [
      {
        title: "1. Mealy FSM Mimarisi",
        content: `![Mealy Durum Makinesi blok diyagramı: Çıkış hem duruma hem de girdiye bağlıdır](/images/digital/mealy-machine-block-diagram.svg)

![Mealy '110' dizi tanıyıcı durum diyagramı](/images/digital/mealy-seq-detector-110.svg)

Mealy FSM'de çıkışlar **HEM mevcut duruma HEM DE o andaki girişlere** doğrudan bağlıdır (\`Çıkış = f(State, Inputs)\`).
- **Avantajı:** Genellikle Moore makinesine göre daha az durumla (daha az flip-flop) tasarlanabilir; giriş değiştiğinde saat darbesini beklemeden anında tepki verebilir.
- **Dezavantajı:** Giriş hattındaki gürültü ve glitch'ler anında çıkışa sızabilir; saat kenarı beklenmediği için zamanlama analizi daha zordur.`,
      },
    ],
    playground: {
      title: "Mealy FSM Giriş Duyarlı Çıkış Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_mealy;
  reg clk, in;
  reg state;
  wire mealy_out;

  // Mealy: Çıkış doğrudan 'in' girişine bağlıdır
  assign mealy_out = state & in;

  always @(posedge clk) state <= in;
  always #5 clk = ~clk;

  initial begin
    clk = 0; state = 1; in = 0;
    $display("=== Mealy FSM Giriş Duyarlılık Testi ===");
    #7 in = 1; #1;
    $display("Giriş 1 olduğu anda çıkış anında değişti (Saat kenarı beklenmedi): %b", mealy_out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Mealy FSM Giriş Duyarlılık Testi ===",
        "Giriş 1 olduğu anda çıkış anında değişti (Saat kenarı beklenmedi): 1",
      ],
    },
    quiz: {
      question: "Mealy FSM'nin çıkışları neye bağlıdır?",
      options: [
        "A) Hem mevcut duruma (State) hem de o anki girişlere (Inputs)",
        "B) Yalnızca mevcut duruma",
        "C) Yalnızca saat frekansına",
        "D) Sıcaklığa",
      ],
      correctIndex: 0,
      explanation: "Doğru! Mealy makinesinde çıkış mantığı mevcut durum ile anlık girişlerin bir fonksiyonudur.",
    },
  },

  "df-moore-fsm": {
    id: "df-moore-fsm",
    badge: "Bölüm 10 • FSM & VLSI",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Moore FSM Tasarımı ve Güvenli Çıkış Mimarisi",
    subtitle: "Yalnızca duruma bağlı çıkışlar, glitch izolasyonu ve çip tasarımında neden Moore tercih edilir.",
    sections: [
      {
        title: "1. Moore FSM Mimarisi",
        content: `![Moore Durum Makinesi blok diyagramı: Çıkış yalnızca mevcut duruma bağlıdır](/images/digital/moore-machine-block-diagram.svg)

![Moore dizi tanıyıcı durum diyagramı](/images/digital/moore-seq-detector-state-diagram.svg)

![Moore trafik ışığı denetleyicisi FSM durum mimarisi](/images/digital/moore-traffic-controller-fsm.svg)

Moore FSM'de çıkışlar **YALNIZCA mevcut duruma** bağlıdır (\`Çıkış = f(State)\`). Girişler çıkışı doğrudan etkileyemez!
- **Neden Güvenlidir?** Giriş hattında ne kadar gürültü veya glitch olursa olsun çıkışa yansımaz; çıkış yalnızca saat kenarında durum değiştiğinde güncellenir.
- Çip tasarımcıları kritik kontrol yollarında daima **Moore FSM** tercih eder çünkü saat senkronizasyonu ve zamanlama kapanışı (timing closure) çok daha kolaydır.`,
      },
    ],
    playground: {
      title: "Moore FSM Durum Tabanlı Çıkış Simülasyonu",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_moore;
  reg clk, in;
  reg state;
  wire moore_out;

  // Moore: Çıkış YALNIZCA state'e bağlıdır, 'in' ile doğrudan bağı yoktur
  assign moore_out = state;

  always @(posedge clk) state <= in;
  always #5 clk = ~clk;

  initial begin
    clk = 0; state = 0; in = 0;
    $display("=== Moore FSM Güvenli Çıkış Testi ===");
    #7 in = 1; #1;
    $display("in=1 oldu ancak çıkış saat kenarına kadar DEĞİŞMEDİ: %b (Glitch Koruması!)", moore_out);
    #5;
    $display("Saat kenarı geldi, durum güncellendi -> Çıkış: %b", moore_out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Moore FSM Güvenli Çıkış Testi ===",
        "in=1 oldu ancak çıkış saat kenarına kadar DEĞİŞMEDİ: 0 (Glitch Koruması!)",
        "Saat kenarı geldi, durum güncellendi -> Çıkış: 1",
      ],
    },
    quiz: {
      question: "Moore tipi bir FSM'nin Mealy tipine kıyasla en büyük tasarım avantajı nedir?",
      options: [
        "A) Çıkışların girişlerdeki anlık parazit ve glitch'lerden tamamen izole olması ve güvenli zamanlama sağlaması",
        "B) Daha az transistör kullanması",
        "C) Analog çalışabilmesi",
        "D) Sıfır gecikmeli olması",
      ],
      correctIndex: 0,
      explanation: "Doğru! Moore FSM'de çıkışlar sadece kaydedilmiş duruma bağlı olduğundan, giriş hattındaki gürültüler çıkışa sızamaz.",
    },
  },

  "df-sram-cell": {
    id: "df-sram-cell",
    badge: "Bölüm 10 • FSM & VLSI",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "6T SRAM Bellek Hücresi (Static RAM)",
    subtitle: "İki çapraz bağlı inverter, 2 erişim transistörü, Wordline, Bitline ve okuma/yazma kararlılığı (SNM).",
    sections: [
      {
        title: "1. 6T SRAM Mimarisi",
        content: `![6-Transistörlü (6T) SRAM bellek hücresi mimarisi](/images/digital/9.4-6t-sram-cell.svg)

İşlemcilerin L1, L2, L3 önbelleklerinde (Cache) kullanılan **SRAM (Statik RAM)**, gücü kesilmediği sürece veriyi yenileme (refresh) ihtiyacı olmadan saklar:
- **Çekirdek:** Birbirini besleyen 2 adet CMOS inverter (4 transistör).
- **Erişim:** Hücreye erişimi kontrol eden 2 adet NMOS transistör (Pass-gate).
Toplamda **6 Transistör (6T)** içerir:
- **Wordline (WL):** Satırı seçer ve erişim transistörlerini açar.
- **Bitline (BL ve BL_bar):** Veriyi diferansiyel olarak okuyan ve yazan hatlar.`,
      },
    ],
    playground: {
      title: "6T SRAM Hücresi Okuma ve Yazma Mantığı",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_sram;
  reg wl;
  reg bl, bl_bar;
  reg q, q_bar;

  initial begin
    $display("=== 6T SRAM Hücre Çalışma Modeli ===");
    q = 0; q_bar = 1; // Hücrede başlangıçta 0 var

    // YAZMA İŞLEMİ (WL=1 yap, BL=1 sür)
    wl = 1; bl = 1; bl_bar = 0;
    q = bl; q_bar = bl_bar; #10;
    $display("Yazma: WL=1, BL=1 -> Hücreye 1 yazıldı (Q=%b)", q);

    // TUTMA / STANDBY (WL=0)
    wl = 0; bl = 1; bl_bar = 1; #10;
    $display("Standby: WL=0 -> Hücre veriyi statik koruyor (Q=%b)", q);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 6T SRAM Hücre Çalışma Modeli ===",
        "Yazma: WL=1, BL=1 -> Hücreye 1 yazıldı (Q=1)",
        "Standby: WL=0 -> Hücre veriyi statik koruyor (Q=1)",
      ],
    },
    quiz: {
      question: "Standart bir statik bellek (SRAM) hücresi 1 bitlik veriyi saklamak için kaç adet transistör içerir?",
      options: ["A) 1 transistör", "B) 6 transistör (6T)", "C) 16 transistör", "D) 32 transistör"],
      correctIndex: 1,
      explanation: "Doğru! Standart bir SRAM hücresi iki çapraz bağlı inverter (4T) ve iki erişim transistörü (2T) olmak üzere toplam 6 transistörden oluşur.",
    },
  },

  "df-dram-cell": {
    id: "df-dram-cell",
    badge: "Bölüm 10 • FSM & VLSI",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "DRAM Bellek Hücresi ve Periyodik Yenileme (Refresh)",
    subtitle: "1T-1C hücresi, minik kapasitör yükü, sızıntı akımları ve yıkıcı okuma (Destructive Read).",
    sections: [
      {
        title: "1. 1T-1C DRAM Mimarisi",
        content: `![1-Transistör 1-Kapasitör (1T-1C) DRAM bellek hücresi](/images/digital/9.5-1t1c-dram-cell.svg)

Bilgisayarların ana belleği (DDR4, DDR5 RAM) **DRAM (Dinamik RAM)** teknolojisidir:
- Yalnızca **1 Transistör ve 1 Kapasitör (1T-1C)** içerir!
- 6T SRAM'e göre 6 kat daha az yer kapladığı için gigabaytlarca bellek tek bir çipe sığdırılabilir.`,
      },
      {
        title: "2. Neden 'Dinamik'tir? (Yenileme - Refresh Şartı)",
        content: `Veri minik bir kapasitörde (~20-30 fF) elektrik yükü olarak saklanır. Ancak transistörlerin kaçak akımı yüzünden bu yük birkaç milisaniye içinde sızıp kaybolur!
Bu yüzden bir DRAM denetleyicisi her 64 milisaniyede bir tüm hücreleri baştan sona okuyup yeniden şarj etmek (**Periyodik Yenileme - Refresh**) zorundadır.`,
      },
    ],
    playground: {
      title: "DRAM Kapasitör Yük Sızıntısı ve Refresh Modeli",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_dram;
  real V_cap;
  integer ms;

  initial begin
    V_cap = 1.0; // Kapasitör tam dolu (1.0V = Logic 1)
    $display("=== DRAM Kapasitör Kaçak Sızıntısı Analizi ===");
    
    for (ms = 0; ms <= 64; ms = ms + 16) begin
      $display("Zaman: %2d ms | Kapasitör Gerilimi: %4.2f V", ms, V_cap);
      V_cap = V_cap - 0.12; // Kaçak nedeniyle voltaj düşüyor
    end

    $display("🚨 64 ms doldu! REFRESH YAPILDI -> Voltaj tekrar 1.0V'a şarj edildi.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== DRAM Kapasitör Kaçak Sızıntısı Analizi ===",
        "Zaman:  0 ms | Kapasitör Gerilimi: 1.00 V",
        "Zaman: 16 ms | Kapasitör Gerilimi: 0.88 V",
        "Zaman: 32 ms | Kapasitör Gerilimi: 0.76 V",
        "Zaman: 48 ms | Kapasitör Gerilimi: 0.64 V",
        "Zaman: 64 ms | Kapasitör Gerilimi: 0.52 V",
        "🚨 64 ms doldu! REFRESH YAPILDI -> Voltaj tekrar 1.0V'a şarj edildi.",
      ],
    },
    quiz: {
      question: "DRAM belleklerin SRAM'e kıyasla çok daha yüksek kapasitelerde (GB seviyesinde) üretilebilmesinin temel sebebi nedir?",
      options: [
        "A) Hücre başına yalnızca 1 transistör ve 1 kapasitör (1T-1C) kullanması ve çok küçük alan kaplaması",
        "B) Hiç elektrik tüketmemesi",
        "C) Daha yavaş olması",
        "D) İçinde sıvı bulunması",
      ],
      correctIndex: 0,
      explanation: "Doğru! 1T-1C yapısı sayesinde DRAM hücreleri 6T SRAM'e göre devasa alan tasarrufu sağlar; bu da milyarlarca bitin tek silikon parçasına sığmasını sağlar.",
    },
  },

  "df-rtl-to-gdsii": {
    id: "df-rtl-to-gdsii",
    badge: "Bölüm 10 • FSM & VLSI",
    readingTime: "9 dk okuma",
    level: "İleri Seviye",
    title: "RTL'den GDSII'ye Çip Tasarım Akışı (ASIC Design Flow)",
    subtitle: "RTL kodlama, Mantıksal Sentez, Floorplanning, CTS, Routing, DRC/LVS ve Tapeout.",
    sections: [
      {
        title: "1. Bir Çip Nasıl Üretilir? (ASIC Akışının 7 Adımı)",
        content: `![RTL'den Silikona ASIC / VLSI tasarım akışı (Sentez, DFT, P&R, STA, DRC/LVS, Maske)](/images/digital/9.6-rtl-to-gdsii-flow.svg)

1. **RTL Tasarımı & Doğrulama:** İşlemci Verilog/SystemVerilog ile yazılır ve UVM testbench'lerle simüle edilir.
2. **Mantıksal Sentez (Synthesis):** RTL kodu hedef teknolojinin (TSMC, Intel) standart kapı kütüphanesine (NAND, NOR, DFF) dönüştürülür (*Gate-level Netlist* üretilir).
3. **Taban Planlama (Floorplanning):** Çipin fiziksel boyutları, I/O pin yerleri ve güç hatları (Power Ring) planlanır.
4. **Yerleşim (Placement):** Milyarlarca standart kapı hücresi silikon yüzeyine yerleştirilir.
5. **Saat Ağacı Sentezi (CTS):** Skew'u sıfıra yaklaştıran H-Tree saat dağıtım şebekesi örülür.
6. **Yönlendirme (Routing):** Kapılar arasındaki metal bağlantı yolları (Metal 1 - Metal 15) döşenir.
7. **Fiziksel Doğrulama (Signoff DRC/LVS):** Dökümhane kurallarına uygunluk (DRC) ve şematik uyumu (LVS) test edilir; **GDSII** formatında fabrikaya üretime gönderilir (**Tapeout**).`,
      },
    ],
    playground: {
      title: "RTL to GDSII ASIC Akışı Aşamaları",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_asic_flow;
  initial begin
    $display("=== ASIC Tasarım Akışı (RTL to Tapeout) ===");
    $display("Adım 1: RTL Kodlama (SystemVerilog)");
    $display("Adım 2: Mantıksal Sentez (Synopsys Design Compiler)");
    $display("Adım 3: Floorplanning & Power Mesh");
    $display("Adım 4: Standart Hücre Yerleşimi (Placement)");
    $display("Adım 5: Clock Tree Synthesis (CTS)");
    $display("Adım 6: Detaylı Metal Yönlendirme (Routing)");
    $display("Adım 7: DRC & LVS Signoff -> GDSII Tapeout! 🚀");
  end
endmodule`,
      expectedOutput: [
        "=== ASIC Tasarım Akışı (RTL to Tapeout) ===",
        "Adım 1: RTL Kodlama (SystemVerilog)",
        "Adım 2: Mantıksal Sentez (Synopsys Design Compiler)",
        "Adım 3: Floorplanning & Power Mesh",
        "Adım 4: Standart Hücre Yerleşimi (Placement)",
        "Adım 5: Clock Tree Synthesis (CTS)",
        "Adım 6: Detaylı Metal Yönlendirme (Routing)",
        "Adım 7: DRC & LVS Signoff -> GDSII Tapeout! 🚀",
      ],
    },
    quiz: {
      question: "Tüm fiziksel tasarım ve doğrulama aşamaları tamamlandıktan sonra çipin silikon dökümhanesine (fab) gönderilmeye hazır nihai geometrik maske dosya formatı nedir?",
      options: ["A) GDSII (veya OASIS)", "B) .exe", "C) .docx", "D) MP3"],
      correctIndex: 0,
      explanation: "Doğru! GDSII (Graphic Database System II) ve yeni nesil OASIS formatı, çipteki tüm transistör ve metal katmanlarının mikroskobik geometrik çizimlerini dökümhaneye ileten endüstri standardı maskedir.",
    },
  },

  "df-vlsi-roadmap": {
    id: "df-vlsi-roadmap",
    badge: "Bölüm 10 • FSM & VLSI",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Sayısal Tasarımcı & Doğrulama Mühendisi VLSI Yol Haritası",
    subtitle: "RTL Tasarımcısı vs DV (Doğrulama) Mühendisi, SystemVerilog, UVM ve FPGA kariyer rehberi.",
    sections: [
      {
        title: "1. İki Büyük Kariyer Yolu",
        content: `![VLSI öğrenme ve nanometre çip mimarileri yol haritası](/images/digital/9.7-learning-roadmap.svg)

- **RTL Tasarım Mühendisi (ASIC/FPGA Design Engineer):** Mimarileri ve algoritmaları en düşük güç, en yüksek hız ve en küçük alanda sentezlenebilir Verilog/SystemVerilog ile yazar.
- **Doğrulama Mühendisi (Design Verification - DV Engineer):** Çip üretilmeden önce sıfır bug kalmasını garantilemek için SystemVerilog OOP, UVM (Universal Verification Methodology) ve rastgele kısıtlı testbench'ler (Constrained Random Testing) yazar.`,
      },
      {
        title: "2. Önerilen Öğrenme Sıralaması",
        content: `1. **Dijital Mantık Temelleri (Şu an tamamladığınız bu kurs!)**
2. **Verilog & RTL Tasarım İlkeleri**
3. **SystemVerilog ile İleri RTL & FSM Tasarımı**
4. **FPGA Geliştirme (Xilinx/AMD Vivado & Zynq SoC)**
5. **SystemVerilog OOP, SVA ve UVM Doğrulama Metodolojisi**`,
      },
    ],
    playground: {
      title: "VLSI Mühendislik Becerileri ve Yetkinlik Matrisi",
      filename: "testbench.v",
      language: "verilog",
      initialCode: `module tb_roadmap;
  initial begin
    $display("=== Tebrikler! Dijital Temeller Kursunu Başarıyla Tamamladınız ===");
    $display("Öğrenilen Temel Beceriler:");
    $display("- Yarı iletken fiziği ve MOSFET anahtarlama dinamikleri");
    $display("- CMOS Inverter, NAND, NOR ve AOI/OAI kapı mimarileri");
    $display("- İkilik aritmetik, Two's complement ve Gray kodu");
    $display("- Boole sadeleştirme, K-Map ve Glitch önleme");
    $display("- MUX, Decoder, Full Adder ve ALU bileşenleri");
    $display("- Interconnect RC gecikmesi, Crosstalk ve IR Drop");
    $display("- Latch, Flip-Flop, CTS saat ağacı ve CDC senkronlayıcılar");
    $display("- FSM, 6T SRAM, 1T-1C DRAM ve RTL-to-GDSII ASIC akışı");
    $display("\\nSıradaki Adım: Verilog & SystemVerilog kurslarımızla kendi işlemcinizi yazmaya başlayın! 🚀");
  end
endmodule`,
      expectedOutput: [
        "=== Tebrikler! Dijital Temeller Kursunu Başarıyla Tamamladınız ===",
        "Öğrenilen Temel Beceriler:",
        "- Yarı iletken fiziği ve MOSFET anahtarlama dinamikleri",
        "- CMOS Inverter, NAND, NOR ve AOI/OAI kapı mimarileri",
        "- İkilik aritmetik, Two's complement ve Gray kodu",
        "- Boole sadeleştirme, K-Map ve Glitch önleme",
        "- MUX, Decoder, Full Adder ve ALU bileşenleri",
        "- Interconnect RC gecikmesi, Crosstalk ve IR Drop",
        "- Latch, Flip-Flop, CTS saat ağacı ve CDC senkronlayıcılar",
        "- FSM, 6T SRAM, 1T-1C DRAM ve RTL-to-GDSII ASIC akışı",
      ],
    },
    quiz: {
      question: "Modern çip geliştirme takımlarında bir çip üretilmeden önce (tapeout öncesi) sıfır mantıksal hata kalmasını sağlamak için SystemVerilog ve UVM kullanan uzmanlık alanına ne denir?",
      options: [
        "A) Tasarım Doğrulama Mühendisliği (Design Verification - DV)",
        "B) Grafik Tasarımı",
        "C) Teknik Yazarlık",
        "D) Ağ Yöneticiliği",
      ],
      correctIndex: 0,
      explanation: "Doğru! DV (Design Verification) mühendisleri, çip üretim maliyetleri milyonlarca doları bulduğu için simülasyon aşamasında donanımın tüm kural ve protokollerini UVM ile test eder.",
    },
  },
};
