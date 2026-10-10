import { LessonContent } from "./lessonsData";

export const DIGITAL_FUNDAMENTALS_PART4: Record<string, LessonContent> = {
  // ========================================================
  // BÖLÜM 8: İLETKENLER, GECİKME VE SİNYAL BÜTÜNLÜĞÜ (TIMING & INTERCONNECT)
  // ========================================================
  "df-rc-wire-delay": {
    id: "df-rc-wire-delay",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "16 dk okuma",
    level: "İleri Seviye",
    title: "İletken Tel Gecikmesi ve Dağıtık RC Modeli (Elmore Delay)",
    subtitle:
      "Parazitik direnç ve kapasitans, pi-modeli, Elmore gecikme formülü, L² parabolik artışı ve tampon (buffer) ekleme.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Modern nanometre çiplerde transistörlerden daha yavaş olan metal ara bağlantı telleri (Interconnects):
- Eski mikrometre çağında neden tel gecikmesinin ihmal edildiği ve günümüzde neden toplam gecikmenin **%70'inden fazlasını** oluşturduğu.
- Metal hatların parazitik Direnci ($R$) ve Kapasitansı ($C$).
- Toplu (Lumped) vs Dağıtık (Distributed) iletim hattı modelleri ($\pi$-modeli).
- **Elmore Gecikme Formülü:** $t_{delay} \\approx 0.5 \\cdot R \\cdot C \\cdot L^2$.
- Uzunlukla gecikmenin karesel ($L^2$) artışı problemi.
- **Teknolojik Çözüm:** Araya belirli aralıklarla tampon (Repeater / Buffer) ekleyerek gecikmeyi doğrusala ($L$) düşürme.`,
      },
      {
        title: "2. Çiplerde Neden Tel Gecikmesi Kapı Gecikmesini Geçti?",
        content: `![Dağıtılmış RC iletim hattı modeli](/images/digital/7.1-wire-distributed-rc-model.svg)

1990'larda (mikrometre teknolojileri) transistörler yavaştı; transistörleri birbirine bağlayan metal alüminyum teller ise geniş ve kalındı. Bu nedenle tel gecikmesi yok denecek kadar azdı.

Ancak nanometre ($65\\text{nm} \\rightarrow 3\\text{nm}$) çağına gelindiğinde:
1. Transistörler inanılmaz derecede hızlandı (gecikmeleri pikosaniyelere indi).
2. Ancak milyarlarca transistörü aynı alana sığdırmak için metal hatlar aşırı derecede inceltildi ve sıklaştırıldı!
3. Metal hat inceldikçe kesit alanı ($A$) küçüldü ve **direnci ($R = \\rho L / A$) fırladı!**
4. Hatlar birbirine yaklaştıkça aralarındaki **parazitik kapasitans ($C$) fırladı!**

Bugün 5 GHz'lik modern bir CPU'da saat periyodunun büyük kısmı kapılarda değil, o kapıları bağlayan **metal tellerin içinden elektronların geçişinde** harcanır!`,
      },
      {
        title: "3. Dağıtık RC Modeli ve Elmore Gecikmesi",
        content: `Bir kablonun direnci ve kapasitansı tek bir noktada toplanmış değildir; tel boyunca santimetrelerce eşit olarak dağılmıştır (Distributed RC).

Telin bir ucundan gerilim verildiğinde, tel boyunca her küçük direnç adımı kendi kapasitansını doldurmak zorundadır:
$$t_{delay} = \\int_0^L r \\cdot c \\cdot x \\, dx = \\frac{1}{2} R_{birim} C_{birim} L^2$$

![Tel uzunluğuna göre gecikmenin karesel artışı grafiği](/images/digital/7.1-wire-delay-vs-length.svg)

**Korkunç Sonuç: $L^2$ Parabolik Artışı!**
Telin uzunluğunu 2 katına çıkarırsanız, gecikme 2 kat değil **4 KAT ARTAR!**
Telin uzunluğunu 4 katına çıkarırsanız, gecikme **16 KAT ARTAR!**
Çipin bir ucundan diğer ucuna (örneğin 5 mm) giden düz bir kablo hiçbir kapı olmasa bile saat döngüsünü tamamen felç eder.`,
      },
      {
        title: "4. Çözüm: Araya Tampon (Repeater / Buffer) Ekleme",
        content: `Tasarımcılar uzun hatların arasına düzenli mesafelerle CMOS inverter veya buffer (Repeater) serpiştirir.
- Bir buffer konulduğunda hat iki bağımsız parçaya bölünür.
- İki parçanın gecikmesi:
$$t_{new} = 2 \\times \\left(\\frac{L}{2}\\right)^2 + t_{buffer} = \\frac{L^2}{2} + t_{buffer}$$
- Hat $K$ parçaya bölündüğünde gecikme $L^2$ karesel artıştan kurtulur ve **doğrusal ($L$) artışa** dönüşür! Modern bir işlemcideki standart hücrelerin %20'si sadece bu iş için konulmuş repeater tamponlarıdır.`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Gecikmeyi düşürmek için telin arasına sınırsız sayıda buffer eklemek.**
  *Doğrusu:* Her buffer'ın kendi kapı gecikmesi ve güç tüketimi vardır. Fazla buffer eklemek toplam gecikmeyi tekrar artırır ve silikon alanı ile pili tüketir; optimal bir mesafe ($L_{opt}$) seçilmelidir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir çip içi metal hattın uzunluğu 3 katına çıkarsa düz hattın gecikmesi kaç katına çıkar?**
*Cevap:* $3^2 = \\mathbf{9\\text{ katına}}$ çıkar!

**S2: Repeater tamponları hattın hangi özelliğini sıfırlar?**
*Cevap:* Hattı bölerek direnç ve kapasitans birikimini sıfırlar, sinyalin kenar dikliğini (slew rate) yeniler.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Nanometre çiplerde gecikmenin %70'i metal hatlardan (RC interconnect) kaynaklanır.
- Dağıtık RC gecikmesi tel uzunluğunun karesiyle ($L^2$) artar.
- Karesel artış, araya tampon (repeater) eklenerek doğrusal ($L$) gecikmeye dönüştürülür.`,
      },
    ],
    playground: {
      title: "Uzun Metal Hat vs Buffer Eklenmiş Hat Gecikme Kıyaslaması",
      filename: "tb_wire_delay.v",
      language: "verilog",
      initialCode: `module tb_wire_delay;
  real R_per_mm, C_per_mm;
  real L_mm;
  real delay_duz_ps, delay_buffered_ps;

  initial begin
    R_per_mm = 50.0;  // 50 Ohm/mm
    C_per_mm = 0.20;  // 0.20 pF/mm (200 fF)
    L_mm = 4.0;       // 4 mm uzunluğunda çip içi hat

    // 1. Düz hat gecikmesi (0.5 * R * C * L^2)
    delay_duz_ps = 0.5 * R_per_mm * C_per_mm * (L_mm * L_mm) * 1000.0;

    // 2. Araya 4 adet buffer konulduğunda (L parçalanır):
    delay_buffered_ps = 4.0 * (0.5 * R_per_mm * C_per_mm * (1.0 * 1.0)) * 1000.0 + (3 * 20.0); // + Buffer gecikmeleri

    $display("=== 4mm Çip İçi Metal Hat Gecikme Analizi ===");
    $display("Tamponsuz Düz Hat Gecikmesi     : %5.1f ps", delay_duz_ps);
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
      question: "Modern bir çipte uzun bir metal iletken hattın gecikmesinin hat uzunluğunun karesiyle (L²) artmasının temel fiziksel sebebi nedir?",
      options: [
        "A) Sinyalin ışıktan hızlı gitmeye çalışması",
        "B) Hattın direnci ve kapasitansının tek bir noktada değil, hat boyunca eşit dağılmış olması (Dağıtık RC modeli) ve her direnç adımının hattın kalan kapasitansını şarj etmek zorunda kalması",
        "C) Manyetik alanın sıfırlanması",
        "D) Transistörün doyumda kalması",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Dağıtık RC iletim hattı modelinde toplam gecikme direnç ve kapasitansın integraliyle hesaplanır ve Elmore formülü gereği tel uzunluğunun karesiyle (L²) parabolik olarak fırlar.",
    },
  },

  // ========================================================
  // BÖLÜM 8: FANOUT & LOADING
  // ========================================================
  "df-fanout-loading": {
    id: "df-fanout-loading",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Fanout ve Yükleme Kapasitansı (Fanout & Loading)",
    subtitle:
      "Dallanma katsayısı (Fan-out), kapasitif yükleme, sinyal eğimi (Slew Rate) bozulması ve yüksek fanout'lu tampon ağaçları (High-Fanout Buffer Trees).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bir mantık kapısının çıkışına kaç kapı bağlanabileceğini belirleyen kurallar:
- **Fanout (Dallanma Katsayısı)** nedir?
- DC fanout (TTL çağı akım sınırlaması) vs AC fanout (CMOS çağı kapasitans sınırlaması).
- Yüksek fanout'un sinyal yükselme eğimine (**Slew Rate**) etkisi.
- Ağır yük altındaki bir kapının gecikmesinin lineer artışı ($t_{pd} = t_0 + k \\cdot C_L$).
- Yüksek fanout hatları (Reset, Clock, Enable) için **Tampon Ağacı Sentezi (Buffer Tree Synthesis)**.`,
      },
      {
        title: "2. Fanout Nedir ve Neden Sınırlıdır?",
        content: `![Yüksek fan-out tampon ağacı mimarisi](/images/digital/7.2-high-fanout-buffer-tree.svg)

**Fanout:** Tek bir mantık kapısının çıkışına bağlanan alıcı kapı girişlerinin toplam sayısıdır.
- CMOS kapılarında girişten DC akım akmaz ($I_{gate} \\approx 0$). Dolayısıyla teoride bir kapı 1000 kapıyı sürebilir gibi görünür.
- Ancak her kapı girişi bir **kondansatördür ($C_{in} = C_{ox} W L$)!**
- Bir kapının çıkışına 20 kapı bağlarsanız, o kapının çıkışındaki toplam yük kapasitansı 20 katına çıkar ($C_{total} = 20 \\times C_{in}$).
- Kapı bu devasa kapasitansı şarj etmekte zorlanır; çıkış sinyalinin dikliği bozulur (Slew rate yavaşlar), yayılma gecikmesi tavan yapar ve devre zamanlama ihlali (timing violation) verir!`,
      },
      {
        title: "3. Yüksek Fan-Out Çözümü: Tampon Ağaçları (Buffer Trees)",
        content: `Bir mikroişlemcide genel bir **Reset** sinyali veya **Saat (Clock)** sinyali aynı anda 100.000 flip-flop'a gitmek zorundadır!
Tek bir kapının 100.000 flop'u sürmesi imkansızdır.

**Mühendislik Çözümü (Buffer Tree Synthesis):**
Sinyal hiyerarşik bir ağaç yapısına bölünür:
1. Ana sinyal 4 adet birinci kademe tamponu sürer (Fanout = 4).
2. Bu 4 tamponun her biri 4 adet ikinci kademe tamponu sürer (Toplam 16 tampon).
3. Bu kademeli dallanma devam ederek sonunda 100.000 flop'a eşit gecikmeyle ulaşılır.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: RTL yazarken tek bir \`wire\` sinyalini yüzlerce modüle dağıtıp sentezleyicinin bunu sihirli şekilde düzelteceğini sanmak.**
  *Doğrusu:* Sentez araçları tampon ağaçları eklese de aşırı yüksek fanout yönlendirme (routing) tıkanıklığına yol açar; tasarımcı kritik sinyalleri register kopyalama (register replication) ile bölmelidir.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Standart bir CMOS kütüphanesinde bir kapı için önerilen maksimum pratik fanout kaçtır?**
*Cevap:* Tipik olarak **Fanout = 4** (FO4 kuralı). Fanout 10'u aştığında gecikme aşırı derecede artar.

**S2: Bir kapının yük kapasitansı 4 katına çıkarsa düşme süresi (tfall) nasıl değişir?**
*Cevap:* Deşarj süresi $t = C \\cdot \\Delta V / I$ formülü gereği yaklaşık **4 kat uzar!**`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- Fanout kapının sürdüğü giriş sayısıdır.
- CMOS'ta fanout DC akımla değil, toplam kapasitans yükü ile sınırlıdır.
- Yüksek fanout sinyali yavaşlatır ve gecikmeyi artırır.
- Yüksek fanout'lu sinyaller için hiyerarşik Tampon Ağaçları (Buffer Trees) inşa edilir.`,
      },
    ],
    playground: {
      title: "Verilog Fanout Kapasitans Gecikme Simülasyonu",
      filename: "tb_fanout.v",
      language: "verilog",
      initialCode: `// Fanout Yükleme ve Sinyal Gecikmesi Analizi
module tb_fanout;
  real t_icsel_ps, k_ps_per_fF;
  real C_in_fF;
  integer fanout;
  real toplam_gecikme_ps;

  initial begin
    t_icsel_ps = 15.0;   // Kapının kendi iç gecikmesi (15 ps)
    k_ps_per_fF = 1.2;   // Her fF yük başına 1.2 ps gecikme artışı
    C_in_fF = 2.0;       // Her alıcı kapının giriş kapasitansı (2 fF)

    $display("=== Fanout Yükleme Gecikme Analizi ===");
    for (fanout = 1; fanout <= 16; fanout = fanout * 2) begin
      toplam_gecikme_ps = t_icsel_ps + (k_ps_per_fF * (fanout * C_in_fF));
      $display("Fanout: %2d Kapı | Yük: %4.1f fF | Toplam Gecikme: %5.1f ps", 
               fanout, fanout * C_in_fF, toplam_gecikme_ps);
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Fanout Yükleme Gecikme Analizi ===",
        "Fanout:  1 Kapı | Yük:  2.0 fF | Toplam Gecikme:  17.4 ps",
        "Fanout:  2 Kapı | Yük:  4.0 fF | Toplam Gecikme:  19.8 ps",
        "Fanout:  4 Kapı | Yük:  8.0 fF | Toplam Gecikme:  24.6 ps",
        "Fanout:  8 Kapı | Yük: 16.0 fF | Toplam Gecikme:  34.2 ps",
        "Fanout: 16 Kapı | Yük: 32.0 fF | Toplam Gecikme:  53.4 ps",
      ],
    },
    quiz: {
      question: "CMOS devrelerinde bir kapının çıkışına çok sayıda kapı (yüksek fanout) bağlandığında devrenin yavaşlamasının ana fiziksel sebebi nedir?",
      options: [
        "A) Transistörlerin erimesi",
        "B) Çıkışa bağlanan her kapının kapı oksit kapasitansının (Cin) birbirine paralel eklenerek toplam yük kapasitansını (CL) büyütmesi ve bu devasa yükün şarj edilmesinin uzun sürmesi",
        "C) Toprak voltajının yükselmesi",
        "D) Frekansın iki katına çıkması",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! CMOS transistörler DC akım çekmez ancak girişleri kondansatördür. Çok sayıda kapı bağlandığında paralel kapasitanslar toplanır ve kapının bu yükü doldurup boşaltma süresi uzar.",
    },
  },

  // ========================================================
  // BÖLÜM 8: NOISE MARGINS & VOLTAGE LEVELS
  // ========================================================
  "df-noise-margins": {
    id: "df-noise-margins",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Gürültü Payları ve Gerilim Seviyeleri (Noise Margins & Levels)",
    subtitle:
      "VOH, VOL, VIH, VIL gerilim seviyeleri, Yüksek ve Düşük Gürültü Marjı (NMH, NML), mantık aileleri ve voltaj uyumsuzlukları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital sinyallerin gürültülü gerçek dünyada hatasız iletilmesini garanti eden **Gürültü Payları (Noise Margins)**:
- 4 Kritik Gerilim Seviyesi: **$V_{OH}, V_{OL}, V_{IH}, V_{IL}$**.
- Yüksek Mantık Gürültü Marjı ($NMH$) ve Düşük Mantık Gürültü Marjı ($NML$).
- Yasak Bölge (Forbidden / Undefined Region).
- Farklı mantık ailelerinin (TTL 5V, LVCMOS 3.3V, 1.8V, 1.2V, 0.8V) birbirine bağlanması ve Seviye Dönüştürücüler (Level Shifters).`,
      },
      {
        title: "2. Dört Kritik Gerilim Seviyesi",
        content: `![LVCMOS mantık gerilim seviyeleri ve gürültü payları](/images/digital/7.3-noise-margins-lvcmos.svg)

Bir mantık ailesinde voltajlar 4 kritik eşikle tanımlanır:
1. **$V_{OH}$ (Voltage Output High):** Verici kapının Mantık 1 çıkarırken garanti ettiği **MİNİMUM** gerilimdir.
2. **$V_{OL}$ (Voltage Output Low):** Verici kapının Mantık 0 çıkarırken garanti ettiği **MAKSİMUM** gerilimdir.
3. **$V_{IH}$ (Voltage Input High):** Alıcı kapının bir sinyali Mantık 1 olarak kabul etmesi için gereken **MİNİMUM** gerilimdir.
4. **$V_{IL}$ (Voltage Input Low):** Alıcı kapının bir sinyali Mantık 0 olarak kabul etmesi için gereken **MAKSİMUM** gerilimdir.`,
      },
      {
        title: "3. Gürültü Marjı (Noise Margin) Hesaplama",
        content: `Sinyal iletim hattı üzerinde manyetik gürültüye maruz kaldığında sinyalin bozulmaması için verici çıkışı ile alıcı girişi arasında bir güvenlik payı olmalıdır:

- **Yüksek Seviye Gürültü Payı (NMH):**
  $$NMH = V_{OH} - V_{IH}$$
  (Vericinin 1'i ile alıcının 1 eşiği arasındaki güvenlik tamponu).
- **Düşük Seviye Gürültü Payı (NML):**
  $$NML = V_{IL} - V_{OL}$$
  (Alıcının 0 eşiği ile vericinin 0'ı arasındaki güvenlik tamponu).

Eğer gürültü voltajı $V_{noise} > NM$ olursa, alıcı kapı 1 sinyalini 0 sanabilir veya tam tersi! Bu da işlemcide bit hatalarına (Bit Flip) yol açar.`,
      },
      {
        title: "4. Mantık Aileleri Arası Uyumsuzluk ve Level Shifter",
        content: `Bir 3.3V FPGA ile 1.8V bir sensörü doğrudan bağlayamazsınız:
- 3.3V'luk bir çıkış, 1.8V'luk transistörün incecik kapı oksidini delip yakabilir!
- 1.8V'luk bir çıkış ise 3.3V'luk bir alıcının $V_{IH}$ eşiğini aşamayabilir ve alıcı kapı sinyali algılayamaz.
Bu gibi durumlarda iki çip arasına iki yönlü voltaj çevirici **Seviye Dönüştürücü (Level Shifter)** entegreleri yerleştirilir.`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: VOH ile VIH'i birbiriyle karıştırmak.**
  *Doğrusu:* OH ve OL verici (Output) özellikleridir; IH ve IL alıcı (Input) özellikleridir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: VOH = 2.4V ve VIH = 2.0V ise yüksek seviye gürültü payı nedir?**
*Cevap:* $NMH = 2.4V - 2.0V = \\mathbf{0.4\\text{ V}}$ ($400\\text{ mV}$).

**S2: Sinyal voltajı VIL ile VIH arasında kalırsa alıcı ne yapar?**
*Cevap:* Bu bölge Yasak Bölgedir (Forbidden Region); kapı kararsızlığa düşer, aşırı akım çeker veya çıkışı rastgele salınır.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- 4 gerilim seviyesi: VOH, VOL, VIH, VIL.
- Gürültü payları $NMH = V_{OH} - V_{IH}$ ve $NML = V_{IL} - V_{OL}$ ile hesaplanır.
- Seviyeler arasındaki fark sinyali dış gürültüye karşı korur.
- Farklı voltaj aileleri Level Shifter ile bağlanmalıdır.`,
      },
    ],
    playground: {
      title: "Gürültü Marjı Hesaplama Simülasyonu",
      filename: "tb_noise_margins.v",
      language: "verilog",
      initialCode: `// LVCMOS 3.3V Gürültü Marjı Hesabı
module tb_noise_margins;
  real VOH, VOL, VIH, VIL;
  real NMH, NML;

  initial begin
    // LVCMOS 3.3V Standart Değerleri
    VOH = 2.80; // Verici min 2.80V çıkarır
    VOL = 0.40; // Verici max 0.40V çıkarır
    VIH = 2.00; // Alıcı min 2.00V bekler
    VIL = 0.80; // Alıcı max 0.80V bekler

    NMH = VOH - VIH;
    NML = VIL - VOL;

    $display("=== LVCMOS 3.3V Gürültü Marjı Analizi ===");
    $display("VOH: %4.2f V | VIH: %4.2f V -> NMH (Yüksek Gürültü Marjı): %4.2f V", VOH, VIH, NMH);
    $display("VOL: %4.2f V | VIL: %4.2f V -> NML (Düşük Gürültü Marjı) : %4.2f V", VOL, VIL, NML);
    if (NMH >= 0.4 && NML >= 0.4)
      $display("Sonuç: Güvenli ve Kararlı İletim Standardı!");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== LVCMOS 3.3V Gürültü Marjı Analizi ===",
        "VOH: 2.80 V | VIH: 2.00 V -> NMH (Yüksek Gürültü Marjı): 0.80 V",
        "VOL: 0.40 V | VIL: 0.80 V -> NML (Düşük Gürültü Marjı) : 0.40 V",
        "Sonuç: Güvenli ve Kararlı İletim Standardı!",
      ],
    },
    quiz: {
      question: "Bir dijital devrede VOH = 2.7V ve VIH = 2.0V ise Yüksek Seviye Gürültü Marjı (NMH) kaç volttur?",
      options: [
        "A) 4.7 V",
        "B) 0.7 V (NMH = VOH - VIH)",
        "C) 1.35 V",
        "D) 0.35 V",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Yüksek seviye gürültü marjı NMH = VOH - VIH = 2.7V - 2.0V = 0.7V (700 mV)'dur. Bu hatta 700 mV'a kadar olan pozitif gürültüler tolere edilebilir.",
    },
  },

  // ========================================================
  // BÖLÜM 8: CROSSTALK & SIGNAL INTEGRITY
  // ========================================================
  "df-crosstalk-coupling": {
    id: "df-crosstalk-coupling",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "15 dk okuma",
    level: "İleri Seviye",
    title: "Çapraz Karışma ve Sinyal Kuplajı (Crosstalk & Coupling)",
    subtitle:
      "Saldırgan (Aggressor) ve Kurban (Victim) hatlar, parazitik karşılıklı kapasitans (Cc), Miller etkisi ve ekranlama (Shielding).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Modern çok katmanlı çiplerde komşu metal hatların birbirini bozması (**Crosstalk**):
- Çapraz Karışma nedir? **Saldırgan (Aggressor)** ve **Kurban (Victim)** hat kavramları.
- Karşılıklı Kapasitans ($C_c$) ve Karşılıklı Endüktans ($M$).
- **Gecikme Çapraz Karışması (Delay Crosstalk - Miller Etkisi):** İki hat zıt yönde anahtarlarsa ($0\\rightarrow 1$ ve $1\\rightarrow 0$) gecikmenin 2 katına çıkması!
- **Glitch Çapraz Karışması (Glitch Crosstalk):** Durgun hatta sahte saat darbesi enjekte edilmesi.
- Fiziksel Çözümler: Hatlar arası mesafeyi açma, araya Toprak Hattı çekme (**Shielding**) ve tampon ekleme.`,
      },
      {
        title: "2. Crosstalk Mekanizması: Aggressor ve Victim",
        content: `![Çapraz karışma kuplaj modeli](/images/digital/7.4-crosstalk-aggressor-victim.svg)

Nanometre çiplerde metal hatlar birbirine birkaç nanometre mesafede yan yana paralel uzanır.
Bu iki tel arasında fiziksel bir **Kuplaj Kapasitansı ($C_c$)** oluşur:
- **Aggressor (Saldırgan):** 0'dan 1'e hızla geçiş yapan aktif hat.
- **Victim (Kurban):** Sabit 0'da veya 1'de durmaya çalışan komşu hat.

Saldırgan hat hızla $0\\rightarrow 1$ yaparken, $C_c$ kapasitansı üzerinden kurban hatta bir akım pompalar ($I = C_c \\, dV/dt$).
Kurban hatta anlık bir sahte voltaj sıçraması (Glitch) belirir. Eğer bu glitch alıcının eşiğini aşarsa hafızaya yanlış veri yazılır!`,
      },
      {
        title: "3. Miller Etkisi ve Gecikme Patlaması",
        content: `İki komşu hat aynı anda anahtarlarken davranış kuplaja bağlıdır:
1. **Aynı Yönde Anahtarlama (Even Mode):** İkisi de aynı anda $0\\rightarrow 1$ olursa aralarındaki voltaj farkı değişmez; kuplaj kapasitansı sıfırlanır ve hatlar **hızlanır!**
2. **Zıt Yönde Anahtarlama (Odd Mode / Miller Etkisi):** Biri $0\\rightarrow 1$ olurken diğeri $1\\rightarrow 0$ olursa, aralarındaki voltaj farkı $2 \\times V_{DD}$ olur!
   Etkin kapasitans:
   $$C_{eff} = C_{ground} + 2 \\cdot C_c$$
   Kapasitans iki katına çıktığı için hattın gecikmesi aniden fırlar! Bu durum çipte beklenmedik **Setup Zamanlama İhlallerine** yol açar.`,
      },
      {
        title: "4. Fiziksel Çözümler: Shielding ve Spacing",
        content: `- **Spacing (Aralığı Açma):** Kritik sinyallerin arasına normal aralığın 2 katı boşluk bırakılır ($C_c \\propto 1/d$).
- **Shielding (Ekranlama):** Saat sinyali (Clock) gibi en kritik hatların sağ ve soluna sabit GND veya VDD hatları çekilir. Böylece komşu sinyallerin gürültüsü doğrudan toprağa akar ve saat hattına dokunamaz.`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Statik zamanlama analizinde crosstalk'u ihmal etmek.**
  *Doğrusu:* Modern STA araçları (PrimeTime) crosstalk kaynaklı gecikme sapmalarını (Noise Delta Delay) mutlaka hesaplamak zorundadır.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Zıt yönde anahtarlayan iki komşu hatta Miller etkisi kapasitansı ne yapar?**
*Cevap:* Karşılıklı kapasitansı 2 katına çıkararak hattı ciddi şekilde yavaşlatır.

**S2: Saat hattının etrafına neden GND koruma teli (Shield) çekilir?**
*Cevap:* Komşu hatlardaki sinyal sıçramalarının saat hattına sızıp sahte saat darbesi üretmesini önlemek için.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Crosstalk komşu metal hatlar arasındaki parazitik kapasitanstan kaynaklanır.
- Kurban hatta sahte glitch veya gecikme artışı yaratır.
- Miller etkisi zıt anahtarlamalarda gecikmeyi katlar.
- Ekranlama (Shielding) ve hat aralama (Spacing) ile çözülür.`,
      },
    ],
    playground: {
      title: "Verilog Crosstalk Gecikme Sapması Simülasyonu",
      filename: "tb_crosstalk.v",
      language: "verilog",
      initialCode: `// Crosstalk Miller Etkisi Gecikme Analizi
module tb_crosstalk;
  real C_gnd, C_c;
  real C_tek, C_ayni, C_zit;

  initial begin
    C_gnd = 10.0; // 10 fF toprağa kapasitans
    C_c   = 15.0; // 15 fF komşu tele kuplaj kapasitansı (modern çipte Cc > Cgnd!)

    // 1. Komşu Durgun İken
    C_tek = C_gnd + C_c;

    // 2. Komşu Aynı Yönde Anahtarlarken (Even Mode)
    C_ayni = C_gnd; // Cc şarj olmaz

    // 3. Komşu Zıt Yönde Anahtarlarken (Odd Mode - Miller Etkisi)
    C_zit = C_gnd + 2.0 * C_c;

    $display("=== Crosstalk Efektif Kapasitans Analizi ===");
    $display("Komşu Durgun        : %5.1f fF (Standart)", C_tek);
    $display("Aynı Yönde Geçiş    : %5.1f fF (Hızlanma!)", C_ayni);
    $display("Zıt Yönde Geçiş     : %5.1f fF (%%60 GECİKME ARTIŞI!)", C_zit);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Crosstalk Efektif Kapasitans Analizi ===",
        "Komşu Durgun        :  25.0 fF (Standart)",
        "Aynı Yönde Geçiş    :  10.0 fF (Hızlanma!)",
        "Zıt Yönde Geçiş     :  40.0 fF (%60 GECİKME ARTIŞI!)",
      ],
    },
    quiz: {
      question: "Çip içinde yan yana paralel uzanan iki iletken hattan biri 0'dan 1'e geçerken diğeri aynı anda 1'den 0'a geçerse (zıt yönlü anahtarlama) ne gerçekleşir?",
      options: [
        "A) Hatlar birbirini çeker ve temas eder",
        "B) Miller etkisi nedeniyle karşılıklı kuplaj kapasitansı etkin olarak 2 katına çıkar ve her iki hattın da yayılma gecikmesi ciddi şekilde artar",
        "C) Çip kendiliğinden kapanır",
        "D) Frekans sıfırlanır",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Zıt yönlü geçişte iki tel arasındaki voltaj farkı iki katına çıkar (2·VDD); bu durum Miller etkisi yaratarak etkin kapasitansı Cgnd + 2·Cc yapar ve gecikmeyi fırlatır.",
    },
  },

  // ========================================================
  // BÖLÜM 8: IR DROP & POWER INTEGRITY
  // ========================================================
  "df-ir-drop": {
    id: "df-ir-drop",
    badge: "Bölüm 8 • Sinyal Bütünlüğü",
    readingTime: "15 dk okuma",
    level: "İleri Seviye",
    title: "IR Drop ve Güç Bütünlüğü (IR Drop & Power Integrity)",
    subtitle:
      "Statik ve Dinamik IR Drop, L di/dt ground bounce, güç dağıtım ağı (PDN) ve dekuplaj kondansatörleri (Decap Cells).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Milyarlarca transistör aynı anda anahtarladığında besleme geriliminin çökmesi (**IR Drop**):
- **Statik IR Drop:** Güç dağıtım raylarındaki ($V_{DD}, GND$) metal omik dirençler ($V = I \\cdot R$).
- **Dinamik IR Drop ($L \\, di/dt$):** Saat kenarında aynı anda milyonlarca kapı açıldığında akımın anlık patlaması ve endüktif sıçrama (**Ground Bounce**).
- Gerilim çökmesinin transistör gecikmesine yıkıcı etkisi (Düşük voltaj = Yavaş kapı = Zamanlama çöküşü).
- **Güç Dağıtım Ağı (Power Distribution Network - PDN):** Güç halkaları ve metal ızgaralar.
- **Dekuplaj Kondansatörleri (Decoupling Capacitors - Decap Cells):** Çipin içine serpiştirilen yerel enerji depoları.`,
      },
      {
        title: "2. IR Drop Nedir? Voltaj Neden Çöker?",
        content: `![Güç rayında direnç ve endüktans kaynaklı IR-Drop voltaj çöküşü](/images/digital/7.5-ir-drop-power-rail.svg)

Çipin güç pinlerinden ($1.0\\text{ V}$) giren elektrik, silikonun ortasındaki bir transistöre ulaşana kadar santimetrelerce metal hattan geçer.
Metal hatların direnci sıfır değildir ($R_{wire} > 0$).

1. **Statik IR Drop:** Çip ortalama $I_{avg}$ akımı çekerken:
   $$V_{transistor} = V_{DD} - (I_{avg} \\cdot R_{grid})$$
   Örneğin $1.0\\text{ V}$ beslemede ortadaki transistörün eline sadece $0.85\\text{ V}$ geçebilir!
2. **Dinamik IR Drop ($L \\, di/dt$):** Saat sinyali her yükselen kenara vurduğunda, 50 milyon flip-flop aynı anda akım çeker. Akım aniden 10 amperden 100 ampere fırlar ($di/dt$ devasadır!).
   Paket bacaklarındaki parazitik endüktans ($L$) nedeniyle gerilim aniden $0.7\\text{ V}$'a çöker (**Voltage Droop**) ve toprak hattı sıçrar (**Ground Bounce**).`,
      },
      {
        title: "3. Mühendislik Çözümü: Decap Hücreleri",
        content: `ASIC yerleşiminde (Placement) standart hücrelerin aralarında kalan tüm boşluklara **Dekuplaj Kondansatörü (Decap)** hücreleri yerleştirilir.
- Decap hücreleri aslında kapısı VDD'ye, gövdesi GND'ye bağlanmış devasa transistörlerdir (MOS Kondansatör).
- Saat kenarında transistörler aniden akım istediğinde, akımı uzak güç pinlerinden değil doğrudan dibindeki bu Decap kondansatörlerinden çekerler!
- Böylece akım tellerin içinden uzun yol katetmez ve IR drop önlenir.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Çipte her yere aşırı Decap hücresi doldurmak.**
  *Doğrusu:* Decap hücreleri kapı oksit kaçağı içerir; aşırı Decap koymak çipin bekleme modundaki statik güç tüketimini katlar.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir transistörün besleme voltajı IR drop ile %10 düşerse transistör nasıl etkilenir?**
*Cevap:* Efektif kapı voltajı ($V_{GS}-V_t$) azalacağı için transistör akımı düşer ve yayılma gecikmesi %15-%25 oranında artarak zamanlama ihlali yaratır.

**S2: Ground Bounce nedir?**
*Cevap:* Yüksek $di/dt$ nedeniyle toprak hattının endüktans üzerinde gerilim oluşturup 0V'tan 0.3V'a sıçramasıdır.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- IR Drop güç hatlarındaki direnç ve akım çarpımıdır ($V = IR$).
- Dinamik IR drop $L \\, di/dt$ endüktif sıçramasından doğar.
- Düşük voltaj transistörleri yavaşlatıp saat hatalarına yol açar.
- Güç ızgaraları (Power grid) ve Decap kondansatörleri ile çözülür.`,
      },
    ],
    playground: {
      title: "Verilog IR Drop Voltaj Çöküşü ve Gecikme Simülasyonu",
      filename: "tb_ir_drop.v",
      language: "verilog",
      initialCode: `// IR Drop Voltaj Çöküşü ve Transistör Gecikmesi Analizi
module tb_ir_drop;
  real VDD_ideal, R_grid, I_peak;
  real VDD_efektif, IR_drop;
  real gecikme_ideal_ps, gecikme_gercek_ps;

  initial begin
    VDD_ideal = 1.00; // 1.0V Nominal
    R_grid    = 0.05; // 0.05 Ohm şebeke direnci
    I_peak    = 3.0;  // 3.0 Amper anlık tepe akımı

    IR_drop = I_peak * R_grid; // 0.15V çöküş
    VDD_efektif = VDD_ideal - IR_drop; // 0.85V

    gecikme_ideal_ps  = 20.0;
    // Gecikme voltaj düşüşüyle ters orantılı artar
    gecikme_gercek_ps = gecikme_ideal_ps * (VDD_ideal / VDD_efektif)**1.4;

    $display("=== IR Drop ve Kapı Gecikmesi Analizi ===");
    $display("Nominal Besleme       : %4.2f V -> Gecikme: %4.1f ps", VDD_ideal, gecikme_ideal_ps);
    $display("IR Drop Voltaj Çöküşü : %4.2f V (Kayıp: %4.2f V)", VDD_efektif, IR_drop);
    $display("Efektif Kapı Gecikmesi: %4.1f ps (%%26 YAVAŞLAMA -> ZAMANLAMA HATASI!)", gecikme_gercek_ps);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== IR Drop ve Kapı Gecikmesi Analizi ===",
        "Nominal Besleme       : 1.00 V -> Gecikme: 20.0 ps",
        "IR Drop Voltaj Çöküşü : 0.85 V (Kayıp: 0.15 V)",
        "Efektif Kapı Gecikmesi: 25.1 ps (%26 YAVAŞLAMA -> ZAMANLAMA HATASI!)",
      ],
    },
    quiz: {
      question: "Bir mikroişlemcide saat kenarında aynı anda milyonlarca kapı anahtarladığında besleme voltajının anlık olarak çökmesini (Dinamik IR Drop) engellemek için silikon üzerine ne yerleştirilir?",
      options: [
        "A) Küçük dirençler",
        "B) Dekuplaj Kondansatörleri (Decap Cells) yerleştirilerek yerel yük deposu oluşturulur",
        "C) Fan hızlandırılır",
        "D) Bütün kapılar kapatılır",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Decap hücreleri, anahtarlama anındaki ani akım ihtiyacını yerel olarak karşılayan MOS kondansatörleridir; bu sayede akım uzun güç kablolarından çekilmez ve voltaj çöküşü önlenir.",
    },
  },

  // ========================================================
  // BÖLÜM 9: SEQUENTIAL LOGIC & MEMORY ELEMENTS
  // ========================================================
  "df-sequential-logic": {
    id: "df-sequential-logic",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "15 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Ardışıl Mantığa Giriş ve Bellek Elemanları (Sequential Logic)",
    subtitle:
      "Durum (State) kavramı, iki kararlı (Bistable) devreler, geri besleme ile veri saklama ve saat sinyali senkronizasyonu.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Zamanı ve geçmişi hatırlayan dijital sistemler: **Ardışıl Mantık (Sequential Logic)**:
- Kombinasyonel mantığın sınırları: Neden hafıza olmadan sayaç, CPU veya bilgisayar yapılamaz?
- **Durum (State)** ve **Hafıza** kavramları.
- İki Kararlı Devre (Bistable Element): Birbirini besleyen iki inverter ile 1-bit bilginin kilitlenmesi.
- Asenkron vs Senkron Ardışıl Mantık farkları.
- Saat sinyalinin (Clock) orkestra şefi rolü.`,
      },
      {
        title: "2. Neden Ardışıl Mantık?",
        content: `Kombinasyonel bir devrede çıkış yalnızca girişlerin o anki durumudur.
Örneğin bir sayacı düşünün: Bir sonraki sayının ne olacağını bilmek için **mevcut sayının kaç olduğunu hatırlamak** zorundasınız!
Bu durum bir **Hafıza Elemanı** gerektirir.
Ardışıl devrede çıkış:
$$\\text{Çıkış} = f(\\text{Mevcut Girişler}, \\text{Geçmiş Durum})$$`,
      },
      {
        title: "3. En Basit Bellek: İki Kararlı (Bistable) Halka",
        content: `İki adet CMOS inverter'ı düşünün. Birincisinin çıkışını ikincisinin girişine, ikincisinin çıkışını da birincisinin girişine bağlayın (Çapraz Bağlı / Cross-Coupled Inverters).
- Eğer düğüm A = 1 ise $\\rightarrow$ Inverter 1 çıkışı B = 0 yapar.
- Düğüm B = 0 ise $\\rightarrow$ Inverter 2 çıkışı A = 1 yapar!
Devre sonsuza kadar bu durumu korur! Eğer A'yı zorla 0 yaparsanız bu kez B = 1 olur ve sonsuza kadar 0'da kilitli kalır.
İşte tarihteki ilk 1-bitlik statik bellek hücresi (SRAM hücresi) bu şekilde doğmuştur!`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Latch ile Flip-Flop'u aynı şey sanmak.**
  *Doğrusu:* Latch seviye tetiklemelidir (Enable 1 iken şeffaftır); Flip-Flop ise kenar tetiklemelidir (Yalnızca saatin 0'dan 1'e çıktığı anlık geçişte okur).`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir ardışıl devrenin kombinasyonel devreden en kritik farkı nedir?**
*Cevap:* Çıkıştan girişe geri besleme (Feedback) içermesi ve geçmiş durumu saklayan bellek elemanlarına sahip olmasıdır.

**S2: Senkron devrede saat sinyali (Clock) ne işe yarar?**
*Cevap:* Tüm bellek elemanlarının aynı anda veri güncellemesini sağlayarak devre genelinde zamanlama kaosunu ve yarış koşullarını önler.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- Ardışıl mantık geçmiş durumları hatırlar.
- Çapraz bağlı inverter halkası 1-bitlik veriyi kilitler (Bistable).
- Saat sinyali tüm güncellemeleri senkronize eder.`,
      },
    ],
    playground: {
      title: "Verilog Ardışıl Sayıcı Mantığı Testi",
      filename: "tb_seq.v",
      language: "verilog",
      initialCode: `// Senkron 4-Bit Ardışıl Sayıcı
module counter_4bit (
  input wire clk,
  input wire rst_n,
  output reg [3:0] q
);
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) q <= 4'b0000;
    else        q <= q + 1;
  end
endmodule

module tb_counter;
  reg clk, rst_n;
  wire [3:0] q;

  counter_4bit uut (.clk(clk), .rst_n(rst_n), .q(q));

  always #5 clk = ~clk;

  initial begin
    clk = 0; rst_n = 0;
    #12 rst_n = 1;
    $display("=== Senkron Ardışıl Sayıcı Testi ===");
    repeat (5) begin
      @(posedge clk);
      $display("Zaman: %t | Sayıcı Durumu (State Q): %d", $time, q);
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Senkron Ardışıl Sayıcı Testi ===",
        "Zaman:                15000 | Sayıcı Durumu (State Q):  1",
        "Zaman:                25000 | Sayıcı Durumu (State Q):  2",
        "Zaman:                35000 | Sayıcı Durumu (State Q):  3",
        "Zaman:                45000 | Sayıcı Durumu (State Q):  4",
        "Zaman:                55000 | Sayıcı Durumu (State Q):  5",
      ],
    },
    quiz: {
      question: "Ardışıl (Sequential) mantık devrelerinin çalışması için kombinasyonel devrelere ek olarak hangi temel yapıya ihtiyaç duyulur?",
      options: [
        "A) Daha kalın iletken tellere",
        "B) Geçmiş durum bilgisini saklayabilen bellek elemanlarına (Flip-Flop / Latch) ve geri besleme (feedback) yoluna",
        "C) Analog yükselteçlere",
        "D) Sadece OR kapılarına",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Ardışıl mantığın tanımlayıcı özelliği geçmiş durumu hatırlamasıdır; bu da flip-flop veya mandal gibi bellek elemanları ve geri besleme ağlarıyla sağlanır.",
    },
  },

  // ========================================================
  // BÖLÜM 9: SR LATCH CIRCUIT
  // ========================================================
  "df-sr-latch": {
    id: "df-sr-latch",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "15 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "SR Mandal Devresi ve Yasaklı Durum (SR Latch Circuit)",
    subtitle:
      "Çapraz bağlı NOR ve NAND mandalları, Set, Reset, Tutma (Hold) ve S=R=1 yarış koşulu (Race Condition).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bellek devrelerinin atası olan **SR Mandal Devresi (Set-Reset Latch)**:
- İki adet NOR kapısının çapraz bağlanmasıyla kurulan temel mandal.
- 4 Temel Çalışma Modu: **Set (Kur)**, **Reset (Sıfırla)**, **Hold (Tut/Hafıza)** ve **Geçersiz Durum (Forbidden State)**.
- $S=1, R=1$ durumundan çıkarken yaşanan **Yarış Koşulu (Race Condition)** ve meta-kararsızlık.
- NAND tabanlı SR Mandalının ($\overline{S}\overline{R}$ Latch) aktif-düşük çalışma mantığı.`,
      },
      {
        title: "2. NOR Tabanlı SR Mandalının Çalışması",
        content: `![NOR tabanlı SR Latch devre şeması](/images/digital/sr_latch_circuit.png)

İki adet NOR kapısının çıkışları çaprazlama birbirinin girişine bağlandığında devre şu doğruluk tablosunu üretir:

| $S$ (Set) | $R$ (Reset) | $Q$ | $\overline{Q}$ | Çalışma Durumu |
| :---: | :---: | :---: | :---: | :--- |
| 0 | 0 | **Önceki Durum** | **Önceki Durum** | **TUTMA (Hold / Memory)** |
| 0 | 1 | **0** | **1** | **RESET (Sıfırlandı)** |
| 1 | 0 | **1** | **0** | **SET (Bire Kuruldu)** |
| 1 | 1 | **0** | **0** | **YASAKLI / GEÇERSİZ DURUM!** |`,
      },
      {
        title: "3. Yasaklı Durum ($S=R=1$) ve Yarış Koşulu",
        content: `Neden $S=1$ ve $R=1$ yasaktır?
1. Tanım gereği çıkışlar birbirinin tersi olmalıdır ($Q$ ve $\\overline{Q}$). Ancak $S=R=1$ yapıldığında her iki çıkış da aynı anda 0 olmaya zorlanır ($Q = \\overline{Q} = 0$).
2. Asıl felaket bu durumdan çıkarken yaşanır: Eğer iki giriş aynı anda $1 \\rightarrow 0$ yapılırsa, her iki NOR kapısı da aynı anda çıkışını 1 yapmaya çalışır.
3. Kapılardan hangisi 1 pikosaniye bile daha hızlıysa o kazanır; devre rastgele bir duruma kilitlenir veya $V_{DD}/2$ seviyesinde osilasyona düşer! Bu duruma **Yarış Koşulu (Race Condition)** denir.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: NOR tabanlı mandal ile NAND tabanlı mandalın girişlerini aynı sanmak.**
  *Doğrusu:* NOR mandalı aktif-yüksektir ($S=1$ Set eder); NAND mandalı ise aktif-düşüktür ($\\overline{S}=0$ Set eder).`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: S=0, R=0 durumunda SR mandalı ne yapar?**
*Cevap:* Hafıza modundadır; içindeki 1 veya 0 bilgisini sonsuza kadar korur.

**S2: Mekanik butonlardaki ark sıçramasını (Switch Bouncing) önlemek için neden SR mandalı kullanılır?**
*Cevap:* Buton ilk temas ettiği anda mandal Set veya Reset konumuna kilitlenir; butonun mekanik olarak yaylanıp ayrılması mandalın durumunu bozamaz (Donanımsal Debounce).`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- SR mandalı çapraz bağlı kapılarla 1 bit saklar.
- S=1 Q'yu 1 yapar, R=1 Q'yu 0 yapar, S=R=0 durumu korur.
- S=R=1 yasaklı durumdur ve yarış koşuluna yol açar.`,
      },
    ],
    playground: {
      title: "Verilog SR Latch Modellemesi ve Testi",
      filename: "tb_sr_latch.v",
      language: "verilog",
      initialCode: `// NOR Tabanlı SR Mandal Devresi
module sr_latch (
  input wire s, r,
  output wire q, q_b
);
  assign q   = ~(r | q_b);
  assign q_b = ~(s | q);
endmodule

module tb_sr;
  reg s, r;
  wire q, q_b;

  sr_latch uut (.s(s), .r(r), .q(q), .q_b(q_b));

  initial begin
    $display("=== SR Latch Testi ===");
    s=1; r=0; #10; $display("S=1, R=0 -> Q=%b, ~Q=%b (SET Edildi)", q, q_b);
    s=0; r=0; #10; $display("S=0, R=0 -> Q=%b, ~Q=%b (HOLD: Durum Korundu!)", q, q_b);
    s=0; r=1; #10; $display("S=0, R=1 -> Q=%b, ~Q=%b (RESET Edildi)", q, q_b);
    s=0; r=0; #10; $display("S=0, R=0 -> Q=%b, ~Q=%b (HOLD: 0 Korundu)", q, q_b);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== SR Latch Testi ===",
        "S=1, R=0 -> Q=1, ~Q=0 (SET Edildi)",
        "S=0, R=0 -> Q=1, ~Q=0 (HOLD: Durum Korundu!)",
        "S=0, R=1 -> Q=0, ~Q=1 (RESET Edildi)",
        "S=0, R=0 -> Q=0, ~Q=1 (HOLD: 0 Korundu)",
      ],
    },
    quiz: {
      question: "NOR kapılarıyla kurulmuş bir SR Mandal (SR Latch) devresinde S=1 ve R=1 uygulandığında neden 'Yasaklı / Geçersiz Durum' oluşur?",
      options: [
        "A) Transistörler patlayacağı için",
        "B) Her iki çıkış da aynı anda 0 olmaya zorlandığı ve bu durumdan çıkarken yarış koşulu (race condition) nedeniyle kararsızlık doğduğu için",
        "C) Devre aşırı hızlandığı için",
        "D) Frekans sıfırlandığı için",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Normalde birbirinin tersi olması gereken Q ve ~Q çıkışları aynı anda 0 olur ve girişler aniden 0'a çekildiğinde devre hangi duruma kilitleneceğini bilemeyerek meta-kararsızlığa düşer.",
    },
  },

  // ========================================================
  // BÖLÜM 9: D FLIP-FLOP (EDGE TRIGGERED)
  // ========================================================
  "df-d-flip-flop": {
    id: "df-d-flip-flop",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "16 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "D Flip-Flop ve Master-Slave Mimarisi (D Flip-Flop)",
    subtitle:
      "D Latch şeffaflık (transparency) problemi, Master-Slave mimarisi, pozitif saat kenarı (Clock Edge) ve Verilog senkron modelleme.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital mantığın en yaygın kullanılan bellek elemanı olan **D Flip-Flop (Data Flip-Flop)**:
- Seviye Tetiklemeli (Level-Sensitive) D Latch'in **Şeffaflık (Transparency)** problemi.
- Kenar Tetikleme (Edge-Triggering) neden modern saatli sistemlerin kurtarıcısıdır?
- **Master-Slave Mimarisi:** İki zıt mandalın arka arkaya bağlanmasıyla yarış koşulunun sıfırlanması.
- Kurulum Süresi ($T_{setup}$) ve Tutma Süresi ($T_{hold}$) fiziksel temelleri.
- Verilog \`always @(posedge clk)\` yapısı ve non-blocking (\`<=\`) atama kuralı.`,
      },
      {
        title: "2. Latch Şeffaflık Problemi vs Kenar Tetiklemeli Flop",
        content: `- **D Latch (Seviye Tetiklemeli):** Clock = 1 olduğu SÜRECE şeffaftır (Transparent). Saat 1 kaldığı sürece girişteki veri değiştikçe çıkış da fırıl fırıl değişir. Bu durum saat döngüsü içinde verinin istemeden çok sayıda kapıdan akıp gitmesine (Yarış koşulu) sebep olur.
- **D Flip-Flop (Kenar Tetiklemeli):** Girişi YALNIZCA saatin 0'dan 1'e fırladığı o anlık mikrosaniyelik kenar geçişinde (**Posedge**) örnekler ve bir sonraki saat kenarına kadar çıkışı kilitler! Saat 1'de beklerken girişte ne olursa olsun çıkış asla etkilenmez!`,
      },
      {
        title: "3. Master-Slave D Flip-Flop İç Mimarisi",
        content: `![D Flip-Flop iç kapı yapısı ve Master-Slave mimarisi](/images/digital/d_flip_flop_circuit.png)

Kenar tetikleme fiziksel olarak iki adet D Latch'in (Master ve Slave) arka arkaya zıt saatlerle sürülmesiyle kurulur:
1. **Clock = 0 İken:**
   - Master Latch AÇIKTIR; girişteki $D$ verisini içine alır.
   - Slave Latch KAPALIDIR (kilitli); çıkış $Q$ eski veriyi tutar.
2. **Saat Kenarı ($0 \\rightarrow 1$) Geldiği An:**
   - Master Latch anında KAPANIR ve o andaki $D$ verisini kilitler.
   - Slave Latch anında AÇILIR ve Master'ın kilitlediği veriyi çıkışa ($Q$) aktarır!
3. **Clock = 1 İken:**
   - Master kilitli olduğu için giriş değişse bile Slave'e ulaşamaz.

Bu mükemmel kilit mekanizması sayesinde veri asla aynı döngüde kontrolsüzce akamaz!`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Verilog'da flip-flop yazarken blocking (\`=\`) atama kullanmak.**
  *Doğrusu:* Ardışıl mantıkta daima non-blocking (\`<=\`) kullanılmalıdır; aksi takdirde ardışık flip-flop'lar arasında yarış koşulu doğar ve simülasyon bozulur.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir D Flip-Flop'un D girişine 1 verilip saat darbesi beklenmezse çıkış ne olur?**
*Cevap:* Çıkış değişmez; eski durumunu korur. Veri ancak saat kenarında (posedge clk) içeri alınır.

**S2: Asenkron Reset ile Senkron Reset arasındaki fark nedir?**
*Cevap:* Asenkron reset saat kenarını beklemeden anında çıkışı sıfırlar; senkron reset ise sıfırlama komutunu saat kenarında uygular.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- D Latch seviye duyarlıdır (saat 1 iken şeffaftır).
- D Flip-Flop Master-Slave mimarisiyle kenar tetiklemelidir.
- Sadece yükselen (veya düşen) saat kenarında veriyi kilitler.
- Modern senkron sayısal devrelerin temel yapı taşıdır.`,
      },
    ],
    playground: {
      title: "Verilog Asenkron Resetli D Flip-Flop Simülasyonu",
      filename: "tb_dff.v",
      language: "verilog",
      initialCode: `// Asenkron Resetli Pozitif Kenar Tetiklemeli D Flip-Flop
module d_flip_flop (
  input wire clk,
  input wire rst_n,
  input wire d,
  output reg q
);
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) q <= 1'b0;
    else        q <= d;
  end
endmodule

module tb_dff_test;
  reg clk, rst_n, d;
  wire q;

  d_flip_flop uut (.clk(clk), .rst_n(rst_n), .d(d), .q(q));

  always #5 clk = ~clk;

  initial begin
    clk = 0; rst_n = 0; d = 0;
    #12 rst_n = 1;
    
    // Saat kenarından önce D=1 yapıyoruz
    d = 1;
    $display("Zaman %t: D=1 yapıldı (Saat henüz gelmedi) -> Çıkış Q: %b", $time, q);
    @(posedge clk); #1;
    $display("Zaman %t: SAAT KENARI GELDİ! -> Çıkış Q: %b (Veri Alındı)", $time, q);
    
    d = 0;
    @(posedge clk); #1;
    $display("Zaman %t: İkinci Saat Kenarı (D=0) -> Çıkış Q: %b", $time, q);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "Zaman                12000: D=1 yapıldı (Saat henüz gelmedi) -> Çıkış Q: 0",
        "Zaman                16000: SAAT KENARI GELDİ! -> Çıkış Q: 1 (Veri Alındı)",
        "Zaman                26000: İkinci Saat Kenarı (D=0) -> Çıkış Q: 0",
      ],
    },
    quiz: {
      question: "D Flip-Flop devresinin D Latch devresine göre en kritik avantajı nedir?",
      options: [
        "A) Daha az transistör harcaması",
        "B) Enable sinyali 1 olduğu sürece şeffaf olmak yerine, Master-Slave mimarisi sayesinde veriyi YALNIZCA saatin yükselen kenarında örnekleyip yarış koşullarını (race conditions) tamamen engellemesi",
        "C) Analog çalışabilmesi",
        "D) Asla güç tüketmemesi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Latch saat 1 iken girişteki her gürültüyü ve değişimi çıkışa sızdırır (şeffaflık problemi). Flip-flop ise sadece saat kenarındaki mikrosaniyelik anlık veriyi kilitler.",
    },
  },

  // ========================================================
  // BÖLÜM 9: JK AND T FLIP-FLOPS
  // ========================================================
  "df-jk-t-flip-flop": {
    id: "df-jk-t-flip-flop",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "JK ve T Flip-Flop Devreleri (JK & T Flip-Flops)",
    subtitle:
      "SR yasaklı durumunun çözümü (Toggle), T Flip-Flop ile frekans bölücüler (Frequency Dividers) ve ikili asenkron sayıcılar.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Evrensel ve sayıcı tasarımlarında vazgeçilmez olan **JK** ve **T (Toggle) Flip-Flop** mimarileri:
- JK Flip-Flop (Jack Kilby): SR mandalındaki yasaklı durumun ($11$) geri besleme ile **Tersleme (Toggle)** moduna çevrilmesi.
- JK Flip-Flop doğruluk tablosu ve çalışma modları.
- **T (Toggle) Flip-Flop:** Her saat darbesinde çıkışını tersleyen frekans bölücü bellek.
- T Flip-Flop ile saat frekansını ikiye ($f/2$), dörde ($f/4$) ve sekize ($f/8$) bölme.
- Asenkron Dalga Sayıcı (Ripple Counter) mimarisi.`,
      },
      {
        title: "2. JK Flip-Flop Devresi",
        content: `![JK Flip-Flop devre şeması](/images/digital/jk_flip_flop_circuit.png)

SR mandalında $S=R=1$ durumu bir felaketti. JK Flip-Flop'ta çıkışlar giriş kapılarına çapraz geri beslenir:
- $J=0, K=0$: **Tutma (Hold)** $\\rightarrow Q_{next} = Q$.
- $J=0, K=1$: **Reset** $\\rightarrow Q_{next} = 0$.
- $J=1, K=0$: **Set** $\\rightarrow Q_{next} = 1$.
- $J=1, K=1$: **TERSLEME (Toggle / Devrilme)** $\\rightarrow Q_{next} = \\overline{Q}$!
Yasaklı durum ortadan kalkmış, yerini her saat darbesinde durumu tersleyen harika bir fonksiyona bırakmıştır!`,
      },
      {
        title: "3. T (Toggle) Flip-Flop ve Frekans Bölücüler",
        content: `![T Flip-Flop devre şeması](/images/digital/t_flip_flop_circuit.png)

JK Flip-Flop'un $J$ ve $K$ girişleri birbirine bağlanırsa tek girişli **T Flip-Flop** elde edilir:
- $T = 0$: Durum korunur ($Q$).
- $T = 1$: Her saat darbesinde çıkış yön değiştirir ($0 \\rightarrow 1 \\rightarrow 0 \\rightarrow 1$).

**Frekans Bölme Mucizesi ($f / 2$):**
Çıkışın bir tam periyot (0 ve 1) tamamlaması için **iki adet saat darbesi** gerekir!
Dolayısıyla T Flip-Flop'un çıkış frekansı, giriş saat frekansının tam olarak **YARISIDIR ($f_{out} = f_{in} / 2$)!**
Arka arkaya bağlanan $N$ adet T flip-flop frekansı $2^N$ oranında böler.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: T flip-flop'un seviye tetiklemeli çalışabileceğini sanmak.**
  *Doğrusu:* Seviye tetiklemeli bir devrede Toggle modu yapılamaz; saat 1 kaldığı sürece devre çılgınca osilasyon yapar (Race-around condition). Toggle ancak ve ancak kenar tetiklemeli (Edge-triggered) çalışabilir.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 100 MHz saat sinyali alan bir T Flip-Flop'un (T=1) çıkış frekansı nedir?**
*Cevap:* $100\\text{ MHz} / 2 = \\mathbf{50\\text{ MHz}}$.

**S2: 3 adet T Flip-Flop arka arkaya bağlanırsa saat frekansı kaça bölünür?**
*Cevap:* $2^3 = 8$'e bölünür ($f / 8$).`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- JK Flip-Flop 11 girişinde Toggle yapar; yasaklı durumu yoktur.
- T Flip-Flop T=1 iken her saat kenarında durumu tersler.
- Dijital saat üreticilerinde frekans bölücü ($f/2^N$) olarak kullanılır.`,
      },
    ],
    playground: {
      title: "Verilog T Flip-Flop ile Saat Frekansı Bölücü Testi",
      filename: "tb_tff.v",
      language: "verilog",
      initialCode: `// T Flip-Flop Frekans Bölücü Modülü
module t_flip_flop (
  input wire clk,
  input wire rst_n,
  input wire t,
  output reg q
);
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) q <= 1'b0;
    else if (t) q <= ~q;
  end
endmodule

module tb_tff_test;
  reg clk, rst_n, t;
  wire q;

  t_flip_flop uut (.clk(clk), .rst_n(rst_n), .t(t), .q(q));

  always #5 clk = ~clk; // 10ns Saat Periyodu (100 MHz)

  initial begin
    clk = 0; rst_n = 0; t = 1; // Sürekli Toggle modunda
    #12 rst_n = 1;
    $display("=== T-FF Frekans Bölücü Testi (Saat Periyodu: 10ns) ===");
    repeat (6) begin
      @(posedge clk);
      $display("Saat Kenarı Zamanı: %t | Çıkış Q: %b", $time, q);
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== T-FF Frekans Bölücü Testi (Saat Periyodu: 10ns) ===",
        "Saat Kenarı Zamanı:                15000 | Çıkış Q: 1",
        "Saat Kenarı Zamanı:                25000 | Çıkış Q: 0",
        "Saat Kenarı Zamanı:                35000 | Çıkış Q: 1",
        "Saat Kenarı Zamanı:                45000 | Çıkış Q: 0",
        "Saat Kenarı Zamanı:                55000 | Çıkış Q: 1",
        "Saat Kenarı Zamanı:                65000 | Çıkış Q: 0",
      ],
    },
    quiz: {
      question: "Girişi sürekli mantık 1'e (T=1) bağlanmış bir T Flip-Flop devresinin saat girişine 50 MHz sinyal uygulandığında çıkış frekansı kaç MHz olur?",
      options: [
        "A) 100 MHz",
        "B) 25 MHz (Frekans yarıya bölünür)",
        "C) 50 MHz",
        "D) 0 MHz",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! T Flip-Flop her saat kenarında yön değiştirir; yani tam bir periyodu (0 ve 1) tamamlaması için 2 saat darbesi gerekir. Çıkış frekansı fin / 2 = 50 / 2 = 25 MHz olur.",
    },
  },

  // ========================================================
  // BÖLÜM 9: SHIFT REGISTERS
  // ========================================================
  "df-shift-registers": {
    id: "df-shift-registers",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Kaydırmalı Kaydediciler (Shift Registers: SISO, SIPO, PISO, PIPO)",
    subtitle:
      "Seri ve paralel veri dönüşümleri, SISO gecikme hattı, SIPO/PISO seri haberleşme (UART/SPI) ve PIPO CPU register'ları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Seri ve paralel dünyalar arasındaki köprü olan **Kaydırmalı Kaydediciler (Shift Registers)**:
- Bir dizi flip-flop'un zincirleme bağlanmasıyla verinin saat darbeleriyle kaydırılması.
- 4 Temel Kaydırmalı Kaydedici Tipi:
  1. **SISO (Serial-In Serial-Out):** Sayısal gecikme hatları.
  2. **SIPO (Serial-In Parallel-Out):** Seri gelen veriyi paralel bayta çevirme (Alıcı).
  3. **PISO (Parallel-In Serial-Out):** Paralel veriyi tek bir kabloya seri basma (Verici).
  4. **PIPO (Parallel-In Parallel-Out):** Standart CPU kaydedicileri.
- UART, SPI ve I2C gibi seri haberleşme protokollerinin donanım temeli.`,
      },
      {
        title: "2. Dört Temel Kaydedici Mimarisi",
        content: `1. **SISO (Seri Giriş Seri Çıkış):**
   ![SISO Kaydırmalı Kaydedici](/images/digital/siso_circuit.png)
   Veri tek bir telden bit bit girer, $N$ saat döngüsü sonra tek bir telden çıkar ($N$ döngülük dijital gecikme hattı).

2. **SIPO (Seri Giriş Paralel Çıkış):**
   ![SIPO Kaydırmalı Kaydedici](/images/digital/sipo_circuit.png)
   Tek bir telden gelen 8 biti 8 saat döngüsünde içeri kaydırıp, 8 bitlik paralel bir bayt olarak CPU veriyoluna sunar (Örn: UART Alıcısı).

3. **PISO (Paralel Giriş Seri Çıkış):**
   ![PISO Kaydırmalı Kaydedici](/images/digital/piso_circuit.png)
   CPU'dan gelen 8 bitlik baytı tek hamlede paralel yükler (Load), ardından her saat darbesinde tek bir iletim kablosuna bit bit seri basar (Örn: UART Vericisi).

4. **PIPO (Paralel Giriş Paralel Çıkış):**
   Tüm bitler aynı anda girer, saat kenarında kilitlenir ve aynı anda çıkar (CPU genel amaçlı register'ları: \`RAX, RBX\`).`,
      },
      {
        title: "3. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: PISO devresinde Shift ve Load kontrol sinyallerini çakıştırmak.**
  *Doğrusu:* Load sinyali aktifken paralel veri içeri kilitlenmeli, ardından Shift moduna geçilerek kaydırma yapılmalıdır.`,
      },
      {
        title: "4. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 8 bitlik bir SIPO kaydedicinin bir baytı tamamen doldurması kaç saat döngüsü sürer?**
*Cevap:* Tam olarak **8 saat döngüsü** sürer.

**S2: SPI protokolünde MOSI hattı hangi tür kaydediciye veri basar?**
*Cevap:* Alıcı çipin içindeki bir SIPO (Serial-In Parallel-Out) kaydedicisine basar.`,
      },
      {
        title: "5. Özet ve Temel Çıkarımlar",
        content: `- Shift register'lar veriyi sağa veya sola kaydırır.
- SISO gecikme hattıdır, SIPO seri-paralel, PISO paralel-seri dönüştürücüdür.
- UART, SPI gibi tüm seri haberleşme donanımlarının çekirdeğidir.`,
      },
    ],
    playground: {
      title: "Verilog 4-Bit SIPO Kaydırmalı Kaydedici Testi",
      filename: "tb_sipo.v",
      language: "verilog",
      initialCode: `// 4-Bit SIPO (Seri Giriş -> Paralel Çıkış) Kaydedici
module sipo_4bit (
  input wire clk,
  input wire rst_n,
  input wire s_in,
  output reg [3:0] p_out
);
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) p_out <= 4'b0000;
    else        p_out <= {p_out[2:0], s_in}; // Sola kaydır ve yeni biti ekle
  end
endmodule

module tb_sipo_test;
  reg clk, rst_n, s_in;
  wire [3:0] p_out;

  sipo_4bit uut (.clk(clk), .rst_n(rst_n), .s_in(s_in), .p_out(p_out));

  always #5 clk = ~clk;

  initial begin
    clk = 0; rst_n = 0; s_in = 0;
    #12 rst_n = 1;
    $display("=== SIPO Seri -> Paralel Dönüşüm Testi ===");
    
    // Sırayla 1, 0, 1, 1 bitlerini seri gönderiyoruz
    s_in = 1; @(posedge clk); #1; $display("Darbe 1 (Bit 1) -> Paralel Çıkış: %b", p_out);
    s_in = 0; @(posedge clk); #1; $display("Darbe 2 (Bit 0) -> Paralel Çıkış: %b", p_out);
    s_in = 1; @(posedge clk); #1; $display("Darbe 3 (Bit 1) -> Paralel Çıkış: %b", p_out);
    s_in = 1; @(posedge clk); #1; $display("Darbe 4 (Bit 1) -> Paralel Çıkış: %b (4 Bit Tamamlandı!)", p_out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== SIPO Seri -> Paralel Dönüşüm Testi ===",
        "Darbe 1 (Bit 1) -> Paralel Çıkış: 0001",
        "Darbe 2 (Bit 0) -> Paralel Çıkış: 0010",
        "Darbe 3 (Bit 1) -> Paralel Çıkış: 0101",
        "Darbe 4 (Bit 1) -> Paralel Çıkış: 1011 (4 Bit Tamamlandı!)",
      ],
    },
    quiz: {
      question: "UART veya SPI gibi seri haberleşme hatlarından tek bir tel üzerinden gelen bitleri toplayıp işlemcinin okuyabileceği 8-bitlik paralel bayta çeviren devre hangisidir?",
      options: [
        "A) PISO",
        "B) SIPO (Serial-In Parallel-Out)",
        "C) SISO",
        "D) MUX",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! SIPO kaydedicisi veriyi seri hattan tek tek içeri kaydırır ve 8 bit dolduğunda paralel çıkış portlarından işlemciye tek hamlede sunar.",
    },
  },

  // ========================================================
  // BÖLÜM 9: CLOCK TREE & SKEW
  // ========================================================
  "df-clock-tree-skew": {
    id: "df-clock-tree-skew",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "16 dk okuma",
    level: "İleri Seviye",
    title: "Saat Dağıtım Ağı ve Saat Eğrilmesi (Clock Tree Synthesis & Skew)",
    subtitle:
      "Clock Skew, Clock Jitter, Pozitif/Negatif Skew, Setup/Hold ihlalleri ve simetrik H-Tree saat dağıtım mimarisi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bir mikroçipteki milyarlarca flip-flop'un aynı anda tetiklenmesini sağlayan **Saat Ağacı Sentezi (CTS - Clock Tree Synthesis)**:
- **Saat Eğrilmesi (Clock Skew)** nedir? Saat sinyalinin iki farklı flop'a farklı anlarda varması.
- **Saat Titremesi (Clock Jitter):** Termal gürültü nedeniyle saat periyodunun zaman içinde dalgalanması.
- Pozitif Skew vs Negatif Skew ve zamanlamaya etkileri.
- Hold zamanı ihlali (Hold Violation) tehlikesi: Saat frekansını düşürseniz bile çipin çalışamaması!
- **H-Tree Mimarisi:** Fraktal simetri ile tüm çipe eşit gecikmeyle saat ulaştırma.`,
      },
      {
        title: "2. Clock Skew ve Setup / Hold İhlali",
        content: `![Saat eğikliği setup ve hold zamanlaması](/images/digital/8.5-clock-skew-setup-hold.svg)

Kaynak Flop ($FF_1$) ile Hedef Flop ($FF_2$) arasında saat varış zamanı farkı:
$$T_{skew} = T_{clk2} - T_{clk1}$$

- **Pozitif Skew ($T_{clk2} > T_{clk1}$):** Saat hedef flop'a daha geç varır.
  - Setup süresine yardım eder ($T_{clk} + T_{skew} \\ge T_{cq} + T_{comb} + T_{setup}$).
  - Ancak **Hold Süresini Mahveder!** Eğer $FF_1$'den çıkan veri çok hızlıysa ($T_{cq} + T_{comb} < T_{hold} + T_{skew}$), yeni veri $FF_2$'ye saat henüz vurmadan ulaşıp eski veriyi ezer! Bu bir **Hold İhlalidir** ve çipi kalıcı olarak öldürür!
- **Negatif Skew ($T_{clk2} < T_{clk1}$):** Saat hedef flop'a erken varır; Setup süresini daraltarak çipi yavaşlatır.`,
      },
      {
        title: "3. Saat Ağacı Sentezi (CTS) ve H-Tree Mimarisi",
        content: `![H-Tree simetrik saat dağıtım ağı mimarisi](/images/digital/8.5-h-tree-clock-distribution.svg)

Saat sinyalini tek bir telden sırayla dağıtamazsınız; sondaki flop'lar devasa skew yer.

**H-Tree Mimarisi:**
Saat kaynağı çipin tam merkezindedir.
- Merkezden 'H' şeklinde 4 kola ayrılır.
- Her kolun ucundan daha küçük bir 'H' daha çizilir.
- Fraktal şekilde dallanarak çipin her köşesindeki flip-flop'a giden metal yolun **FİZİKSEL UZUNLUĞU, DİRENCİ VE KAPASİTANSI TAMAMEN EŞİTLENİR!**
Böylece çip genelinde Clock Skew sıfıra yakın tutulur.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Hold zamanı ihlalini saat frekansını düşürerek çözmeye çalışmak.**
  *Doğrusu:* Setup ihlalleri frekansı düşürerek çözülebilir; ancak Hold zamanı formülünde saat periyodu ($T_{clk}$) YOKTUR! Hold ihlali olan bir çip 1 Hz frekansta bile çalışmaz; çip silikon çöpü olur! Araya gecikme tamponu konulmalıdır.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Clock Jitter ile Clock Skew arasındaki fark nedir?**
*Cevap:* Skew iki farklı konum arasındaki uzamsal gecikme farkıdır (Spatial). Jitter ise aynı saat hattının zaman içindeki periyot titremesidir (Temporal).

**S2: Hold zamanı ihlali neden ölümcüldür?**
*Cevap:* Saat periyodundan bağımsız olduğu için yazılımla veya frekans kısılarak düzeltilemez; tek çare silikonu yeniden üretmektir.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- Clock Skew saat sinyalinin varış zamanı farkıdır.
- Pozitif skew Hold ihlali, negatif skew Setup ihlali riski doğurur.
- H-Tree simetrik fraktal mimarisiyle skew minimuma indirilir.`,
      },
    ],
    playground: {
      title: "Clock Skew Setup ve Hold Zamanlama Analizi",
      filename: "tb_clock_skew.v",
      language: "verilog",
      initialCode: `// Clock Skew Setup ve Hold Marjı (Slack) Hesabı
module tb_clock_skew;
  real T_clk, T_cq, T_comb, T_setup, T_hold;
  real T_skew;
  real setup_slack, hold_slack;

  initial begin
    T_clk   = 2.00; // 2.0 ns (500 MHz)
    T_cq    = 0.20; // 200 ps
    T_setup = 0.15; // 150 ps
    T_hold  = 0.10; // 100 ps
    T_comb  = 0.05; // 50 ps (Çok hızlı kısa yol!)

    // Pozitif Skew: Hedef flop'a saat 250 ps geç varıyor
    T_skew = 0.25;

    // Hold Kontrolü: T_cq + T_comb >= T_hold + T_skew olmalı
    hold_slack = (T_cq + T_comb) - (T_hold + T_skew);

    $display("=== Clock Skew ve Hold İhlali Analizi ===");
    $display("Veri Varış Zamanı : %4.2f ns", T_cq + T_comb);
    $display("Hold Gereksinimi  : %4.2f ns", T_hold + T_skew);
    $display("Hold Slack Marjı  : %4.2f ns", hold_slack);

    if (hold_slack < 0)
      $display("DİKKAT: HOLD ZAMANLAMA İHLALİ! Yeni veri eski veriyi ezdi!");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Clock Skew ve Hold İhlali Analizi ===",
        "Veri Varış Zamanı : 0.25 ns",
        "Hold Gereksinimi  : 0.35 ns",
        "Hold Slack Marjı  : -0.10 ns",
        "DİKKAT: HOLD ZAMANLAMA İHLALİ! Yeni veri eski veriyi ezdi!",
      ],
    },
    quiz: {
      question: "Çip üretiminden sonra ortaya çıkan bir Hold Zamanı İhlalini (Hold Time Violation) saat frekansını düşürerek çözmek neden imkansızdır?",
      options: [
        "A) Transistörlerin frekansı bilmemesi nedeniyle",
        "B) Hold zamanı denkleminin (Tcq + Tcomb >= Thold + Tskew) saat periyodundan (Tclk) tamamen bağımsız olması ve verinin saat periyodu ne olursa olsun aynı döngüde erken yarışarak hedefi bozması nedeniyle",
        "C) Voltajın yükselmesi nedeniyle",
        "D) Sadece geceleri çalıştığı için",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Hold ihlali iki flop arasındaki kısa yolun çok hızlı akmasından kaynaklanır. Saat frekansını 1 Hz'e bile düşürseniz veri yine aynı pikosaniyede erken varıp hedefi bozar. Çözüm araya gecikme tamponu eklemektir.",
    },
  },

  // ========================================================
  // BÖLÜM 9: SYNCHRONIZERS & CDC
  // ========================================================
  "df-cdc-synchronizers": {
    id: "df-cdc-synchronizers",
    badge: "Bölüm 9 • Ardışıl Mantık",
    readingTime: "17 dk okuma",
    level: "İleri Seviye",
    title: "Saat Alanı Geçişi ve Senkronizörler (Clock Domain Crossing - CDC)",
    subtitle:
      "Metastabilite (Metastability), MTBF formülü, 2-FF senkronizörü ve asenkron FIFO ile Gray kodlu güvenli veri aktarımı.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Farklı saat frekanslarıyla çalışan bağımsız blokların haberleşmesi (**CDC - Clock Domain Crossing**):
- **Metastabilite (Meta-kararsızlık):** Flip-flop'un kurulum/tutma süresi ihlal edildiğinde çıkışın $V_{DD}/2$ geriliminde asılı kalması.
- **MTBF (Mean Time Between Failures):** Hata oluşma aralığı formülü.
- **2-FF Senkronizörü (Double Flop Synchronizer):** Tek bitlik asenkron sinyalleri güvenle yakalama.
- Neden çok bitlik veri yollarında (Bus) 2-FF senkronizörü kullanılamaz?
- **Asenkron FIFO:** Çok bitlik verilerin Gray kodlu işaretçilerle farklı saat alanları arasında kayıpsız aktarılması.`,
      },
      {
        title: "2. Metastabilite Felaketi: 0 veya 1 Olamamak!",
        content: `Bir flip-flop'un veri girişi, saat kenarının tam vurduğu anda ($T_{setup}$ ve $T_{hold}$ penceresi içinde) değişirse:
- İçteki Master mandal ne 0'a ne de 1'e karar verebilir!
- Çıkış voltajı tam ortada ($V_{DD}/2$) asılı kalır ve çıkışta kontrolsüz salınımlar (osilasyon) başlar.
- Flip-flop kararlı bir duruma oturana kadar geçen süre rastgeledir. Eğer bu kararsız sinyal çipin diğer kapılarına dağılırsa, bazı kapılar onu 0 bazıları 1 görerek işlemciyi kilitler!`,
      },
      {
        title: "3. Çözüm: İki Aşamalı Flop Senkronizörü (2-FF Synchronizer)",
        content: `![İki Flip-Flop'lu asenkron saat alanı senkronizörü](/images/digital/8.6-two-flop-synchronizer.svg)

Tek bitlik asenkron sinyaller için standart çözüm iki adet D Flip-Flop'u arka arkaya bağlamaktır:
- Birinci flop metastabiliteye düşebilir.
- Ancak ikinci flop bir tam saat periyodu ($T_{clk}$) sonra tetiklenir!
- Bir saat periyodu boyunca birinci flop'un kararlı bir duruma (0 veya 1'e) oturma olasılığı üstel olarak artar.
Bu basit iki flop mimarisi sistemin hata aralığını (**MTBF**) birkaç saniyeden **milyonlarca yıla** çıkarır!`,
      },
      {
        title: "4. Asenkron FIFO ve Gray Kodu ile Çok Bitlik Veri Aktarımı",
        content: `![Asenkron FIFO'da Gray kodu ile saat alanı geçişi](/images/digital/8.6-async-fifo-gray-pointers.svg)

Çok bitlik bir veri yolu (örneğin 32-bit veri) doğrudan 2-FF senkronizörlerine sokulamaz! Çünkü her bitin kablo gecikmesi farklıdır; bazı bitler 1. döngüde bazıları 2. döngüde karşıya geçer ve veri tamamen bozulur (Data Coherency hatası).

**Asenkron FIFO Çözümü:**
- Veriler çift portlu bir SRAM belleğe yazılır (Yazma Saati ile).
- Veriler bellekten Okuma Saati ile okunur.
- Belleğin doluluk işaretçileri (Write Pointer, Read Pointer) karşı tarafa aktarılırken **MUTLAKA Gray Kodu** ile aktarılır!
Tek bir bit değiştiği için metastabilite olsa bile sayaç asla saçma bir adrese atlayamaz.`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: İki bağımsız saatle çalışan modülü araya senkronizör koymadan doğrudan tel ile bağlamak.**
  *Doğrusu:* Bu durum çipin sahada rastgele kilitlenmesine ve açıklanamayan donma hatalarına yol açar. Her saat alanı geçişi CDC analitiğine tabidir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 2-FF senkronizörü metastabiliteyi %100 yok eder mi?**
*Cevap:* Fiziksel olarak metastabilite olasılığı asla sıfır olamaz; ancak hata oluşma süresini (MTBF) binlerce yıla çıkararak pratik olarak imkansız kılar.

**S2: Neden asenkron FIFO işaretçileri ikili yerine Gray kodu ile aktarılır?**
*Cevap:* Sayaç her arttığında sadece tek bir bitin değişmesini sağlayarak çoklu bit yarış koşulunu engellemek için.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Setup/Hold ihlalleri metastabiliteye yol açar.
- 2-FF senkronizörü tek bitlik kontrol sinyallerini kararlı kılar.
- Çok bitlik veri yolları Asenkron FIFO ve Gray kodlu işaretçilerle aktarılır.`,
      },
    ],
    playground: {
      title: "Verilog 2-FF Asenkron Saat Alanı Senkronizörü Testi",
      filename: "tb_cdc_sync.v",
      language: "verilog",
      initialCode: `// 2-FF Senkronizör Modülü
module synchronizer_2ff (
  input wire clk_hedef,
  input wire rst_n,
  input wire async_in,
  output reg sync_out
);
  reg q1;

  always @(posedge clk_hedef or negedge rst_n) begin
    if (!rst_n) begin
      q1       <= 1'b0;
      sync_out <= 1'b0;
    end else begin
      q1       <= async_in; // 1. Flop (Metastabiliteyi soğurur)
      sync_out <= q1;       // 2. Flop (Temiz kararlı çıkış)
    end
  end
endmodule

module tb_cdc;
  reg clk_dst, rst_n, async_sig;
  wire sync_sig;

  synchronizer_2ff uut (.clk_hedef(clk_dst), .rst_n(rst_n), .async_in(async_sig), .sync_out(sync_sig));

  always #5 clk_dst = ~clk_dst; // 10ns Hedef Saat

  initial begin
    clk_dst = 0; rst_n = 0; async_sig = 0;
    #12 rst_n = 1;

    // Saatten tamamen bağımsız asenkron bir anda sinyal yükseliyor
    #3 async_sig = 1;
    $display("Zaman %t: Asenkron Sinyal Geldi (1)", $time);

    @(posedge clk_dst); #1;
    $display("Zaman %t: Hedef Saat Kenarı 1 -> 1. Flop Doldu, Çıkış: %b", $time, sync_sig);

    @(posedge clk_dst); #1;
    $display("Zaman %t: Hedef Saat Kenarı 2 -> 2. Flop Çıkışı: %b (GÜVENLE YAKALANDI!)", $time, sync_sig);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "Zaman                15000: Asenkron Sinyal Geldi (1)",
        "Zaman                25000: Hedef Saat Kenarı 1 -> 1. Flop Doldu, Çıkış: 0",
        "Zaman                35000: Hedef Saat Kenarı 2 -> 2. Flop Çıkışı: 1 (GÜVENLE YAKALANDI!)",
      ],
    },
    quiz: {
      question: "Farklı frekansta çalışan iki bağımsız saat alanı arasında (Clock Domain Crossing) tek bitlik asenkron kontrol sinyallerini metastabilite tehlikesinden koruyarak güvenle yakalamak için hangi mimari kullanılır?",
      options: [
        "A) Araya basit bir direnç koymak",
        "B) Hedef saat ile çalışan iki adet D Flip-Flop'u arka arkaya bağlamak (2-FF Senkronizörü)",
        "C) Sinyali topraklamak",
        "D) Frekansı iki katına çıkarmak",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 2-FF senkronizöründe birinci flop olası metastabiliteyi soğurur; bir sonraki saat kenarında ikinci flop kararlı hale gelmiş veriyi sisteme temiz bir şekilde sunar.",
    },
  },

  // ========================================================
  // BÖLÜM 10: FINITE STATE MACHINES (FSM)
  // ========================================================
  "df-finite-state-machines": {
    id: "df-finite-state-machines",
    badge: "Bölüm 10 • FSM ve Mimari",
    readingTime: "16 dk okuma",
    level: "Orta Seviye",
    title: "Sonlu Durum Makineleri Mimarisi (Finite State Machines - FSM)",
    subtitle:
      "Durum geçiş diyagramları, durum tablosu, Gelecek Durum Mantığı, Durum Kaydedicisi ve Çıkış Mantığı.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital kontrol birimlerinin ve işlemci yönetim ünitelerinin beyni olan **Sonlu Durum Makineleri (FSM)**:
- FSM nedir? Sonlu sayıda durum arasında saat darbeleriyle geçiş yapan kontrol mimarisi.
- 3 Temel Donanım Bloğu:
  1. **Gelecek Durum Mantığı (Next-State Logic - Kombinasyonel)**.
  2. **Durum Kaydedicisi (State Register - Ardışıl Flip-Flop'lar)**.
  3. **Çıkış Mantığı (Output Logic - Kombinasyonel)**.
- Durum Kodlama Türleri: İkili Kodlama (Binary) vs Tek Sıcaklık Kodlaması (**One-Hot**).
- Durum geçiş diyagramı (State Transition Diagram) ve durum tablosu.`,
      },
      {
        title: "2. FSM Donanım Blok Mimarisi",
        content: `![FSM durum geçiş diyagramı örneği](/images/digital/fsm_state_transition.png)

Her FSM silikon üzerinde istisnasız şu 3 bloktan oluşur:
1. **State Register:** O andaki durumu ($Current\\_State$) saklayan Flip-Flop kümesidir.
2. **Next-State Logic:** Mevcut duruma ve dış girişlere bakarak bir sonraki durumun ($Next\\_State$) ne olması gerektiğini hesaplayan kombinasyonel lojik devredir.
3. **Output Logic:** Sistemin dış dünyaya ürettiği kontrol sinyallerini hesaplayan devredir.`,
      },
      {
        title: "3. Durum Kodlama Yöntemleri: Binary vs One-Hot",
        content: `4 durumlu bir FSM ($S_0, S_1, S_2, S_3$) düşünün:

- **İkili Kodlama (Binary / Gray Encoding):**
  - $N$ durum için $\\log_2(N)$ adet flip-flop gerekir (4 durum için 2 flop: \`00, 01, 10, 11\`).
  - Flop sayısı azdır ancak durumları çözmek için karmaşık kombinasyonel kapılar gerekir.
  - ASIC çiplerinde silikon alanını korumak için tercih edilir.
- **One-Hot Kodlama:**
  - Her durum için ayrı bir flip-flop ayrılır ($N$ durum için $N$ flop: \`0001, 0010, 0100, 1000\`).
  - Her anda sadece tek bir flop 1'dir!
  - Çözücü kapıya gerek kalmaz; durum doğrudan ilgili flop'un çıkışıdır. Çok hızlıdır!
  - **FPGA mimarilerinde** flip-flop bol, kombinasyonel kapı pahalı olduğu için daima One-Hot tercih edilir!`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: FSM kodlarken tanımlanmamış durumlara \`default\` düşüşü eklememek.**
  *Doğrusu:* Eğer kozmik ışın veya gürültü ile flop'lar geçersiz bir duruma sıçrarsa FSM kilitlenir; daima \`default: next_state = IDLE;\` güvenliği eklenmelidir.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 8 duruma sahip bir FSM One-Hot kodlanırsa kaç flip-flop gerekir?**
*Cevap:* Tam olarak **8 flip-flop** gerekir.

**S2: Binary kodlanırsa kaç flip-flop gerekir?**
*Cevap:* $2^3 = 8$ olduğundan **3 flip-flop** yeterlidir.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- FSM sonlu durumlardan oluşur ve 3 donanım bloğuna ayrılır.
- Gelecek durum ve çıkış kombinasyoneldir, durum register'ı ardışıldır.
- Binary kodlama az flop harcar (ASIC), One-Hot hızlıdır (FPGA).`,
      },
    ],
    playground: {
      title: "Verilog 3-Aşamalı Standart FSM Mimarisi Testi",
      filename: "tb_fsm.v",
      language: "verilog",
      initialCode: `// Standart 3-Bloklu FSM Şablonu
module simple_fsm (
  input wire clk, rst_n, in,
  output reg out
);
  localparam S0 = 2'b00, S1 = 2'b01, S2 = 2'b10;
  reg [1:0] state, next_state;

  // Blok 1: Durum Register'ı (Ardışıl)
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) state <= S0;
    else        state <= next_state;
  end

  // Blok 2: Gelecek Durum Mantığı (Kombinasyonel)
  always @(*) begin
    case (state)
      S0: next_state = in ? S1 : S0;
      S1: next_state = in ? S2 : S0;
      S2: next_state = in ? S2 : S0;
      default: next_state = S0;
    endcase
  end

  // Blok 3: Çıkış Mantığı
  always @(*) begin
    out = (state == S2);
  end
endmodule

module tb_fsm_test;
  reg clk, rst_n, in;
  wire out;

  simple_fsm uut (.clk(clk), .rst_n(rst_n), .in(in), .out(out));
  always #5 clk = ~clk;

  initial begin
    clk = 0; rst_n = 0; in = 1;
    #12 rst_n = 1;
    $display("=== FSM Durum Geçiş Testi ===");
    @(posedge clk); #1; $display("Darbe 1 -> State S1, Çıkış: %b", out);
    @(posedge clk); #1; $display("Darbe 2 -> State S2, Çıkış: %b (HEDEF DURUM!)", out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== FSM Durum Geçiş Testi ===",
        "Darbe 1 -> State S1, Çıkış: 0",
        "Darbe 2 -> State S2, Çıkış: 1 (HEDEF DURUM!)",
      ],
    },
    quiz: {
      question: "FPGA çiplerinde FSM durumları kodlanırken neden ikili kodlama (Binary) yerine çoğunlukla One-Hot kodlama tercih edilir?",
      options: [
        "A) FPGA'lerin saat sinyali olmaması nedeniyle",
        "B) FPGA mimarilerinde flip-flop kaynaklarının çok bol olması ve One-Hot kodlamanın gelecek durum mantığını çözmek için gereken kombinasyonel gecikmeyi en aza indirerek devreyi çok hızlandırması",
        "C) Sadece tek bir kapı çalıştığı için",
        "D) Verilog kuralları öyle emrettiği için",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! FPGA mimarilerinde her mantık hücresinde (LE / Slice) flip-flop bulunur. One-Hot kodlama durumları çözmek için karmaşık kod çözücülere ihtiyaç bırakmaz; her durum tek bir bit olduğu için devre inanılmaz hızlı çalışır.",
    },
  },

  // ========================================================
  // BÖLÜM 10: MEALY FSM
  // ========================================================
  "df-mealy-fsm": {
    id: "df-mealy-fsm",
    badge: "Bölüm 10 • FSM ve Mimari",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Mealy Durum Makinesi (Mealy FSM)",
    subtitle:
      "Girişlere anlık bağımlı çıkışlar, durum sayısı tasarrufu, asenkron tepki ve glitch yayılım riski.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `George H. Mealy (1955) tarafından geliştirilen **Mealy Sonlu Durum Makinesi**:
- Mealy FSM'in kesin kuralı: **Çıkış HEM mevcut duruma HEM DE o andaki girişlere doğrudan bağlıdır!**
  $$\\text{Çıkış} = f(\\text{Mevcut Durum}, \\text{Mevcut Girişler})$$
- Moore makinesine göre daha az durumla (daha az flip-flop) tasarlanabilme avantajı.
- Giriş değiştiğinde saat darbesini beklemeden anında (aynı saat döngüsünde) tepki verebilme yeteneği.
- **Tehlikesi:** Giriş sinyalindeki parazit ve glitch'lerin doğrudan çıkışa sızması.
- Mealy '110' Dizi Tanıyıcı (Sequence Detector) örneği.`,
      },
      {
        title: "2. Mealy FSM Blok Diyagramı ve Çalışma Mantığı",
        content: `![Mealy Durum Makinesi blok diyagramı](/images/digital/mealy-machine-block-diagram.svg)

![Mealy '110' dizi tanıyıcı durum diyagramı](/images/digital/mealy-seq-detector-110.svg)

Blok diyagramına dikkatle bakın:
Giriş sinyali ($Inputs$), Durum Kaydedicisini (State Register) atlayarak **doğrudan Çıkış Mantığına (Output Logic)** bağlanır!
Bu sayede:
- Giriş hattı 1 olduğu anda, saat kenarını beklemeden çıkış o anda 1 olabilir.
- Tipik olarak bir dizi tanıyıcıda Moore makinesinden 1 durum daha az durumla çözülür.`,
      },
      {
        title: "3. Mealy Makinesinin Riskleri",
        content: `1. **Glitch Sızıntısı:** Giriş kablosunda oluşan 10 pikosaniyelik bir voltaj sıçraması anında FSM çıkışına yansır; çıkış saat senkronizasyonunu kaybeder.
2. **Zamanlama Analizi Zorluğu:** İki Mealy makinesi arka arkaya bağlanırsa, kombinasyonel yollar birbirine eklenerek kritik yolu uzatır ($T_{comb} = T_{comb1} + T_{comb2}$).`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Mealy FSM çıkışını doğrudan saat hattına veya asenkron reset'e bağlamak.**
  *Doğrusu:* Girişteki glitch çıkışa aktığı için bu işlem sahte saat darbeleri üretip tüm çipi çökertebilir; çıkış bir register ile filtrelenmelidir (Registered Mealy).`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Mealy FSM'de giriş değişirse saat kenarı olmadan çıkış değişebilir mi?**
*Cevap:* Evet! Çıkış doğrudan girişin kombinasyonel fonksiyonudur.

**S2: Mealy neden Moore'dan daha az durum kullanır?**
*Cevap:* Son durumu beklemek yerine, o duruma geçişi tetikleyen giriş anında çıkışı verebildiği için.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- Mealy FSM'de $\text{Çıkış} = f(Durum, Girişler)$.
- Daha az durumla tasarlanır ve daha hızlı tepki verir.
- Giriş gürültüsünü doğrudan çıkışa sızdırabilir.`,
      },
    ],
    playground: {
      title: "Verilog Mealy '11' Dizi Tanıyıcı Testi",
      filename: "tb_mealy.v",
      language: "verilog",
      initialCode: `// Mealy '11' Dizi Tanıyıcı (Girişte arka arkaya iki '1' gelince anında çıkış=1)
module mealy_11_detector (
  input wire clk, rst_n, in,
  output reg out
);
  localparam S0 = 1'b0, S1 = 1'b1;
  reg state, next_state;

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) state <= S0;
    else        state <= next_state;
  end

  always @(*) begin
    case (state)
      S0: next_state = in ? S1 : S0;
      S1: next_state = in ? S1 : S0;
    endcase
  end

  // Mealy Çıkışı: HEM mevcut duruma (S1) HEM DE girişe (in) bağlı!
  always @(*) begin
    out = (state == S1) && (in == 1'b1);
  end
endmodule

module tb_mealy_test;
  reg clk, rst_n, in;
  wire out;

  mealy_11_detector uut (.clk(clk), .rst_n(rst_n), .in(in), .out(out));
  always #5 clk = ~clk;

  initial begin
    clk = 0; rst_n = 0; in = 0;
    #12 rst_n = 1;
    $display("=== Mealy '11' Dizi Tanıyıcı ===");
    in = 1; @(posedge clk); #1; $display("Darbe 1 (İlk 1 Geldi) -> State S1, Çıkış: %b", out);
    in = 1; #2; $display("Saat Gelmeden Giriş 1 Oldu -> Mealy Çıkışı ANINDA: %b!", out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Mealy '11' Dizi Tanıyıcı ===",
        "Darbe 1 (İlk 1 Geldi) -> State S1, Çıkış: 0",
        "Saat Gelmeden Giriş 1 Oldu -> Mealy Çıkışı ANINDA: 1!",
      ],
    },
    quiz: {
      question: "Bir Mealy durum makinesinde (Mealy FSM) çıkış sinyali neye bağlıdır?",
      options: [
        "A) Yalnızca geçmiş durumlara",
        "B) HEM o andaki mevcut duruma (Current State) HEM DE o andaki giriş sinyallerine (Inputs)",
        "C) Yalnızca saat frekansına",
        "D) Sadece besleme voltajına",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Mealy FSM'in belirleyici özelliği çıkışın f(State, Inputs) olmasıdır. Giriş değiştiğinde saat darbesi beklenmeden çıkış anlık tepki verebilir.",
    },
  },

  // ========================================================
  // BÖLÜM 10: MOORE FSM
  // ========================================================
  "df-moore-fsm": {
    id: "df-moore-fsm",
    badge: "Bölüm 10 • FSM ve Mimari",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Moore Durum Makinesi ve Güvenli Çıkışlar (Moore FSM)",
    subtitle:
      "Yalnızca duruma bağımlı çıkışlar, glitch izolasyonu, saat senkronizasyonu ve trafik ışığı denetleyicisi tasarımı.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Edward F. Moore (1956) tarafından geliştirilen ve kritik çip tasarımlarında tercih edilen **Moore Durum Makinesi**:
- Moore FSM'in kesin kuralı: **Çıkış YALNIZCA VE YALNIZCA mevcut duruma bağlıdır!**
  $$\\text{Çıkış} = f(\\text{Mevcut Durum})$$
- Giriş sinyallerinin çıkışa doğrudan hiçbir yolu yoktur.
- **Glitch İzolasyonu:** Giriş hattında ne kadar gürültü olursa olsun çıkışa sızamaz; çıkış yalnızca saat kenarında durum değiştiğinde güncellenir.
- Neden mikroişlemci ve ASIC tasarımcıları kritik kontrol yollarında daima Moore FSM tercih eder?
- Trafik Işığı Kontrolörü (Traffic Light Controller) durum makinesi.`,
      },
      {
        title: "2. Moore FSM Blok Diyagramı ve Mimarisi",
        content: `![Moore Durum Makinesi blok diyagramı](/images/digital/moore-machine-block-diagram.svg)

![Moore dizi tanıyıcı durum diyagramı](/images/digital/moore-seq-detector-state-diagram.svg)

Blok diyagramını inceleyin:
Girişler ($Inputs$) yalnızca Gelecek Durum Mantığına gider.
Çıkış Mantığı ($Output Logic$) ise girişleri **asla görmez; yalnızca State Register'ın çıkışını dinler!**
Bu yapı sayesinde çıkışlar saatle mükemmel senkronizedir ve sinyal bütünlüğü kusursuzdur.`,
      },
      {
        title: "3. Gerçek Dünya Tasarımı: Trafik Işığı Denetleyicisi",
        content: `![Moore trafik ışığı denetleyicisi FSM durum mimarisi](/images/digital/moore-traffic-controller-fsm.svg)

Trafik ışığı kontrolü hayati güvenlik gerektirir:
- Durumlar: \`RED\` (Kırmızı), \`GREEN\` (Yeşil), \`YELLOW\` (Sarı).
- Çıkış lambaları yalnızca mevcut duruma göre yanar. Sensör hattında (örneğin yaya butonunda) bir gürültü sıçraması olsa bile kırmızı yanan lamba anında yeşile dönemez; saat sayacı süreyi doldurup bir sonraki duruma geçene kadar kilitli kalır.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Moore FSM'in çıkış lojiğinde giriş sinyallerini kullanmak.**
  *Doğrusu:* Eğer çıkış lojiğinde tek bir giriş sinyali bile \`if(in)\` şeklinde kullanılırsa, devre artık Moore olmaktan çıkar ve bir Mealy makinesine dönüşür!`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Moore FSM'in Mealy'ye göre en büyük mühendislik avantajı nedir?**
*Cevap:* Giriş hattındaki gürültü ve glitch'leri tamamen filtrelemesi ve çıkışın saat kenarıyla mükemmel senkronize olması.

**S2: Mealy vs Moore karşılaştırmasında hangisinin zamanlama analizi (STA) daha kolaydır?**
*Cevap:* Moore FSM'in zamanlama analizi çok daha kolaydır çünkü kombinasyonel yollar durum register'ı tarafından bloklanmıştır.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- Moore FSM'de $\text{Çıkış} = f(Durum)$.
- Girişler çıkışı doğrudan etkileyemez; glitch koruması sağlar.
- Kritik çip kontrol yollarında ve güvenlik sistemlerinde endüstri standardıdır.`,
      },
    ],
    playground: {
      title: "Verilog Moore Trafik Işığı Denetleyicisi Testi",
      filename: "tb_moore.v",
      language: "verilog",
      initialCode: `// Moore Trafik Işığı Denetleyicisi
module traffic_moore (
  input wire clk, rst_n,
  output reg [2:0] lights // [2]=Red, [1]=Yellow, [0]=Green
);
  localparam S_RED = 2'b00, S_GREEN = 2'b01, S_YELLOW = 2'b10;
  reg [1:0] state, next_state;

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) state <= S_RED;
    else        state <= next_state;
  end

  always @(*) begin
    case (state)
      S_RED:    next_state = S_GREEN;
      S_GREEN:  next_state = S_YELLOW;
      S_YELLOW: next_state = S_RED;
      default:  next_state = S_RED;
    endcase
  end

  // Moore Çıkışı: YALNIZCA mevcut duruma bağlı!
  always @(*) begin
    case (state)
      S_RED:    lights = 3'b100; // Kırmızı
      S_GREEN:  lights = 3'b001; // Yeşil
      S_YELLOW: lights = 3'b010; // Sarı
      default:  lights = 3'b100;
    endcase
  end
endmodule

module tb_moore_test;
  reg clk, rst_n;
  wire [2:0] lights;

  traffic_moore uut (.clk(clk), .rst_n(rst_n), .lights(lights));
  always #5 clk = ~clk;

  initial begin
    clk = 0; rst_n = 0;
    #12 rst_n = 1;
    $display("=== Moore Trafik Işığı Döngü Testi ===");
    @(posedge clk); #1; $display("Durum 1 -> Işıklar: %b (Kırmızı)", lights);
    @(posedge clk); #1; $display("Durum 2 -> Işıklar: %b (Yeşil)", lights);
    @(posedge clk); #1; $display("Durum 3 -> Işıklar: %b (Sarı)", lights);
    @(posedge clk); #1; $display("Durum 4 -> Işıklar: %b (Tekrar Kırmızı)", lights);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Moore Trafik Işığı Döngü Testi ===",
        "Durum 1 -> Işıklar: 001 (Yeşil)",
        "Durum 2 -> Işıklar: 010 (Sarı)",
        "Durum 3 -> Işıklar: 100 (Kırmızı)",
        "Durum 4 -> Işıklar: 001 (Yeşil)",
      ],
    },
    quiz: {
      question: "Çip tasarımcılarının kritik kontrol ve güvenlik birimlerinde Mealy yerine Moore durum makinesini (Moore FSM) tercih etmelerinin temel sebebi nedir?",
      options: [
        "A) Moore makinelerinin daha az transistör kaplaması",
        "B) Çıkışların girişlerden tamamen izole olması sayesinde giriş hattındaki gürültü ve glitch'lerin çıkışa sızamaması ve zamanlama kapanışının (timing closure) çok daha güvenli olması",
        "C) Moore makinelerinin saat sinyali gerektirmemesi",
        "D) Sadece tek bir durum içermesi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Moore FSM'de çıkış yalnızca durum flip-flop'larına bağlıdır. Girişteki parazitler çıkışa asla doğrudan yansımaz, bu da kritik kontrol yollarında sıfır hata güvenliği sağlar.",
    },
  },

  // ========================================================
  // BÖLÜM 10: THE 6T SRAM CELL
  // ========================================================
  "df-sram-cell": {
    id: "df-sram-cell",
    badge: "Bölüm 10 • FSM ve Mimari",
    readingTime: "16 dk okuma",
    level: "İleri Seviye",
    title: "6T SRAM Bellek Hücresi (The 6T SRAM Cell)",
    subtitle:
      "Statik RAM mimarisi, çapraz bağlı inverter çekirdeği, Wordline ve Bitline hatları, Okuma ve Yazma marjları (SNM).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `CPU'ların L1, L2, L3 önbelleklerinde (Cache) kullanılan ultra hızlı **6-Transistörlü SRAM (Statik RAM)** hücresi:
- SRAM nedir? Güç kesilmediği sürece veriyi yenileme (Refresh) ihtiyacı olmadan saklayan statik bellek.
- **6T Mimarisi:** İki adet CMOS inverter (4 transistör) ve iki adet erişim transistörü (Pass-gate NMOS).
- **Wordline (WL)** ve diferansiyel **Bitline (BL, BLB)** hatları.
- **Okuma İşlemi (Read Cycle):** Bitline'ların ön şarjı (Precharge) ve Algılama Yükselteci (Sense Amplifier).
- **Yazma İşlemi (Write Cycle):** Hücrenin zorla devrilmesi (Overwriting the latch).
- Statik Gürültü Marjı (SNM - Static Noise Margin) ve transistör boyutlandırma dengesi (Cell Ratio, Pull-up Ratio).`,
      },
      {
        title: "2. 6T SRAM Hücre Mimarisi",
        content: `![6-Transistörlü SRAM bellek hücresi mimarisi](/images/digital/9.4-6t-sram-cell.svg)

Her bir SRAM hücresi 1 bit veri saklar ve tam olarak 6 transistörden oluşur:
1. **Çekirdek (Bistable Latch - 4 Transistör):** Birbirini çapraz besleyen iki adet standart CMOS inverter ($M_1, M_2, M_3, M_4$). Veriyi statik olarak kilitler.
2. **Erişim Transistörleri (Access Gates - 2 Transistör):** Hücreyi harici bit hatlarına bağlayan iki adet NMOS transistör ($M_5, M_6$).
   - Kapıları **Wordline (WL)** satır seçici hattına bağlıdır.
   - Savakları ise zıt çalışan **Bitline ($BL$)** ve **Bitline-Bar ($BLB$)** sütun hatlarına bağlıdır.`,
      },
      {
        title: "3. Okuma ve Yazma Operasyonları",
        content: `1. **Okuma İşlemi (Read):**
   - $BL$ ve $BLB$ hatları önce $V_{DD}$ voltajına önceden şarj edilir (Precharge).
   - $WL = 1$ yapılarak erişim transistörleri açılır.
   - Hücrenin '0' olan tarafı bağlı olduğu bitline hattını hafifçe deşarj eder ($\Delta V \approx 100\text{ mV}$).
   - Sütunun altındaki **Algılama Yükselteci (Sense Amplifier)** bu minik voltaj farkını anında tam mantık seviyesine ($0$ ve $1$) yükselterek okur!
2. **Yazma İşlemi (Write):**
   - Harici sürücüler $BL$'yi 1'e, $BLB$'yi güçlüce 0'a çeker.
   - $WL = 1$ yapılır. Dışarıdan gelen güçlü 0, hücre içindeki zayıf inverter'ı yener ve kilidi ters yöne devirir!`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Okuma sırasında hücrenin yanlışlıkla yazılıp bozulabileceğini (Read Disturbance) unutmak.**
  *Doğrusu:* Okuma anında bitline voltajı hücreye sızıp iç düğümü yükseltir; eğer Pull-down NMOS yeterince güçlü değilse hücre devrilip verisini kaybeder! Bu yüzden $M_1$ transistörü $M_5$'ten güçlü yapılmalıdır (Cell Ratio > 1.2).`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: SRAM neden DRAM'den çok daha hızlıdır?**
*Cevap:* SRAM doğrudan transistörlerle sürülür ve anında tepki verir; periyodik yenileme (refresh) döngüleriyle bekleme yapmaz.

**S2: Bir CPU'da neden tüm RAM SRAM yapılmaz?**
*Cevap:* 6 transistör çok fazla silikon alanı kaplar; gigabaytlarca SRAM üretmek devasa maliyet gerektirir.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- 6T SRAM 4 çekirdek ve 2 erişim transistöründen oluşur.
- Güç kesilmediği sürece veriyi yenileme olmadan saklar.
- İşlemci L1/L2 önbelleklerinin temelidir.`,
      },
    ],
    playground: {
      title: "Verilog SRAM Hücre Mantıksal Davranış Modeli",
      filename: "tb_sram.v",
      language: "verilog",
      initialCode: `// 1-Bit 6T SRAM Hücresi Mantık Modeli
module sram_cell (
  input wire wl,
  input wire we, // Yazma yetkisi
  inout wire bl, bl_b
);
  reg q;

  // Yazma Operasyonu
  always @(*) begin
    if (wl && we) q = bl;
  end

  // Okuma Operasyonu (Sense Amp sürüşü)
  assign bl   = (wl && !we) ? q  : 1'bz;
  assign bl_b = (wl && !we) ? ~q : 1'bz;
endmodule

module tb_sram_test;
  reg wl, we;
  reg bl_surucu;
  wire bl, bl_b;

  assign bl = we ? bl_surucu : 1'bz;

  sram_cell uut (.wl(wl), .we(we), .bl(bl), .bl_b(bl_b));

  initial begin
    $display("=== SRAM Hücresi Yazma ve Okuma Testi ===");
    // 1. Hücreye 1 Yazma
    wl = 1; we = 1; bl_surucu = 1; #10;
    $display("WL=1, WE=1, BL=1 -> Hücreye 1 Yazıldı");
    
    // 2. Hattı boşa alma ve Okuma
    we = 0; bl_surucu = 0; #10;
    $display("WL=1, WE=0 (Okuma) -> BL: %b, BLB: %b (1 Okundu!)", bl, bl_b);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== SRAM Hücresi Yazma ve Okuma Testi ===",
        "WL=1, WE=1, BL=1 -> Hücreye 1 Yazıldı",
        "WL=1, WE=0 (Okuma) -> BL: 1, BLB: 0 (1 Okundu!)",
      ],
    },
    quiz: {
      question: "Modern işlemcilerin L1/L2 önbelleklerinde kullanılan standart 6T SRAM hücresinde toplam kaç transistör bulunur ve hücre çekirdeğini ne oluşturur?",
      options: [
        "A) 1 transistör ve 1 kapasitör",
        "B) Toplam 6 transistör bulunur; çekirdeği birbirini çapraz besleyen 2 CMOS inverter (4 transistör), erişimi ise 2 NMOS transistör sağlar",
        "C) 6 adet diyot",
        "D) 6 adet kondansatör",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 6T SRAM hücresi birbirini besleyen iki adet inverter (2 PMOS + 2 NMOS = 4T) ve Wordline ile kontrol edilen iki adet erişim transistöründen (2 NMOS) oluşur.",
    },
  },

  // ========================================================
  // BÖLÜM 10: DRAM CELL & REFRESH
  // ========================================================
  "df-dram-cell": {
    id: "df-dram-cell",
    badge: "Bölüm 10 • FSM ve Mimari",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "1T-1C DRAM Bellek Hücresi ve Yenileme (DRAM Cell & Refresh)",
    subtitle:
      "Dinamik RAM mimarisi, 1T-1C hücre yapısı, yıkıcı okuma (Destructive Read), yük paylaşımı ve periyodik yenileme (Refresh).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bilgisayarların ana belleği olan (DDR4, DDR5) **DRAM (Dinamik RAM)** teknolojisi:
- **1T-1C Mimarisi:** Yalnızca tek bir transistör ve tek bir minik kapasitör ($C_s$).
- Neden DRAM bellekler SRAM'e göre 6 kat daha yoğun ve ucuzdur?
- **Yıkıcı Okuma (Destructive Read):** Kapasitörün yükünü okurken boşaltması ve Write-Back zorunluluğu.
- Kaçak akımlar nedeniyle kapasitör yükünün sızması ve **Periyodik Yenileme (Refresh - tREFI)**.
- Algılama Yükselteçleri (Sense Amplifiers) ve Yük Paylaşımı (Charge Sharing) fiziği.`,
      },
      {
        title: "2. 1T-1C Hücre Yapısı",
        content: `![1T-1C DRAM bellek hücresi](/images/digital/9.5-1t1c-dram-cell.svg)

DRAM'in inanılmaz başarısının sırrı sadeliğindedir:
- **1 Transistör (Access NMOS):** Wordline ile açılıp kapanan anahtar.
- **1 Kapasitör (Storage Capacitor - $\\sim 25\\text{ fF}$):** Yükü saklayan 3D derin siper (Trench / Stack) kondansatörü.
SRAM 6 transistör harcarken, DRAM yalnızca 1 transistör ve 1 kondansatör harcar! Bu sayede tek bir silikon çipe 16-32 Gigabayt bellek sığdırılabilir.`,
      },
      {
        title: "3. Yıkıcı Okuma (Destructive Read) ve Yenileme (Refresh)",
        content: `DRAM'in iki büyük cilvesi vardır:
1. **Yıkıcı Okuma:** Kapasitördeki yükü okumak için Wordline açıldığında, kapasitördeki elektronlar Bitline teline boşalır. Veri okunur ancak **kapasitör boşalmış olur!** Bu yüzden her okuma işleminden hemen sonra Algılama Yükselteci veriyi kapasitöre geri yazmak (Restore / Write-back) zorundadır.
2. **Periyodik Yenileme (Refresh):** Kapasitör o kadar küçüktür ki ($25\\text{ fF}$), P-N birleşimlerindeki kaçak akımlar nedeniyle içindeki yük birkaç milisaniye içinde sızıp yok olur. Bellek denetleyicisi (Memory Controller), veriyi kaybetmemek için her **64 milisaniyede bir** tüm satırları sırayla okuyup yeniden şarj etmek (Auto-Refresh) zorundadır!`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: DRAM'in güç kesilse bile veriyi saklayacağını sanmak.**
  *Doğrusu:* DRAM uçucu (volatile) bir bellektir; güç kesildiği anda kapasitörler anında boşalır.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bilgisayar boştayken bile RAM neden ısınır ve elektrik harcar?**
*Cevap:* Kapasitörlerdeki kaçak yükü tazelemek için her 64 ms'de bir sürekli Refresh döngüleri çalıştığı için.

**S2: DRAM'de Yıkıcı Okuma ne anlama gelir?**
*Cevap:* Veri okunurken kapasitörün bitline'a deşarj olup boşalması demektir.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- DRAM 1T-1C yapısıyla ultra yoğun ve ucuzdur.
- Okuma işlemi kapasitörü boşalttığı için Write-Back gerektirir.
- Kaçak akımları önlemek için her 64 ms'de bir Refresh yapılmalıdır.`,
      },
    ],
    playground: {
      title: "Verilog DRAM Kapasitör Sızıntı ve Yenileme Simülasyonu",
      filename: "tb_dram.v",
      language: "verilog",
      initialCode: `// DRAM Hücresi Yük Sızıntısı ve Refresh Modeli
module tb_dram;
  real V_kapasitor;
  integer ms_gecen;

  initial begin
    V_kapasitor = 1.20; // 1.2V Tam Dolu (Mantık 1)
    $display("=== DRAM Kapasitör Kaçak ve Yenileme Analizi ===");
    $display("Başlangıç Voltajı: %4.2f V (Dolu 1)", V_kapasitor);

    for (ms_gecen = 10; ms_gecen <= 70; ms_gecen = ms_gecen + 10) begin
      V_kapasitor = V_kapasitor - 0.12; // Her 10 ms'de 120 mV sızıntı
      $display("%2d ms Sonra -> Kapasitör Voltajı: %4.2f V", ms_gecen, V_kapasitor);
      if (ms_gecen == 60) begin
        $display("--> 64 ms Sınırı: REFRESH ZAMANI! Kapasitör Tekrar 1.2V'a Şarj Edildi!");
        V_kapasitor = 1.20;
      end
    end
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== DRAM Kapasitör Kaçak ve Yenileme Analizi ===",
        "Başlangıç Voltajı: 1.20 V (Dolu 1)",
        "10 ms Sonra -> Kapasitör Voltajı: 1.08 V",
        "20 ms Sonra -> Kapasitör Voltajı: 0.96 V",
        "30 ms Sonra -> Kapasitör Voltajı: 0.84 V",
        "40 ms Sonra -> Kapasitör Voltajı: 0.72 V",
        "50 ms Sonra -> Kapasitör Voltajı: 0.60 V",
        "60 ms Sonra -> Kapasitör Voltajı: 0.48 V",
        "--> 64 ms Sınırı: REFRESH ZAMANI! Kapasitör Tekrar 1.2V'a Şarj Edildi!",
        "70 ms Sonra -> Kapasitör Voltajı: 1.08 V",
      ],
    },
    quiz: {
      question: "DRAM bellek hücrelerinin (1T-1C) içindeki veriyi kaybetmemek için neden periyodik olarak yenilenmesi (Refresh) gerekir?",
      options: [
        "A) Transistörün soğuması için",
        "B) Veriyi saklayan minik kapasitörün (Cs ≈ 25 fF) içindeki elektrik yükünün yarı iletken kaçak akımları nedeniyle birkaç milisaniye içinde sızıp yok olması sebebiyle",
        "C) Saat frekansını artırmak için",
        "D) Verileri şifrelemek için",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! DRAM kapasitörleri mikroskobik boyutlardadır ve silikon birleşim kaçakları nedeniyle şarjlarını hızla kaybederler. Bellek denetleyicisi verinin silinmemesi için periyodik olarak hücreleri okuyup yeniden şarj eder.",
    },
  },

  // ========================================================
  // BÖLÜM 10: THE RTL TO GDSII FLOW
  // ========================================================
  "df-rtl-to-gdsii": {
    id: "df-rtl-to-gdsii",
    badge: "Bölüm 10 • FSM ve Mimari",
    readingTime: "17 dk okuma",
    level: "İleri Seviye",
    title: "ASIC Tasarım Akışı: RTL'den Silikona (The RTL to GDSII Flow)",
    subtitle:
      "Sentez (Synthesis), DFT, Taban Planlama (Floorplanning), Yerleşim (Placement), CTS, Yönlendirme (Routing) ve Tape-out.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bir satır Verilog kodunun gerçek bir silikon mikroçipe dönüşme yolculuğu (**ASIC Tasarım Akışı**):
- Koddan Çipe: Ön Uç (Front-End) vs Arka Uç (Back-End / Physical Design) aşamaları.
- **Mantıksal Sentez (Synthesis):** RTL kodunun standart kapı netlist'ine dönüştürülmesi.
- **DFT (Design for Testability):** Fabrikada üretim hatalarını yakalamak için Scan Chain ekleme.
- **Floorplanning & Power Plan:** Çip boyutları ve güç hatlarının (Power Grid) planlanması.
- **Placement & CTS (Clock Tree Synthesis):** Kapıların silikona dizilmesi ve saat ağacı inşası.
- **Routing:** Metal kablolarla kapıların bağlanması.
- **Sign-off:** DRC, LVS ve STA onayları sonrası fabrikaya **GDSII / OASIS** maske teslimi (**Tape-out**).`,
      },
      {
        title: "2. Bir Çip Nasıl Üretilir? (ASIC Akışının 7 Temel Adımı)",
        content: `![RTL'den Silikona ASIC tasarım akışı](/images/digital/9.6-rtl-to-gdsii-flow.svg)

1. **RTL Tasarımı & Doğrulama:** Mimari SystemVerilog ile yazılır ve UVM testbench'ler ile %100 kapsama (coverage) sağlanana kadar simüle edilir.
2. **Mantıksal Sentez (Synthesis):** Synopsys Design Compiler gibi araçlar Verilog kodunu hedef fabrikanın (TSMC) standart hücrelerine eşler (*Gate-level Netlist* üretir).
3. **Taban Planlama (Floorplanning):** Çipin çekirdek alanı, bellek bloklarının yerleri, I/O bacakları ve VDD/GND güç halkaları çizilir.
4. **Yerleşim (Placement):** Milyarlarca transistör hücresi silikon ızgarasına optimum gecikmeyle yerleştirilir.
5. **Saat Ağacı Sentezi (CTS):** Eşit gecikmeli dengeli saat tampon ağaçları (H-Tree) inşa edilir.
6. **Yönlendirme (Routing):** Kapılar arasındaki metal sinyal telleri katman katman çizilir.
7. **Fiziksel Doğrulama & Tape-Out:** DRC (Tasarım Kuralı Kontrolü) ve LVS (Netlist-Layout Uyumu) sıfır hatayla geçtiğinde **GDSII dosyası** fabrikaya gönderilir (**Tape-out**)!`,
      },
      {
        title: "3. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Yazılan her kodun sentezlenebilir olduğunu sanmak.**
  *Doğrusu:* \`#10\` gibi gecikmeler veya \`initial\` blokları gerçek donanımda kapılara dönüşemez; yalnızca simülasyon içindir.`,
      },
      {
        title: "4. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Tape-out ne demektir?**
*Cevap:* Çip tasarımının tüm doğrulama testlerini tamamlayıp üretim maskeleri için fabrikaya teslim edilmesidir.

**S2: GDSII dosyası ne içerir?**
*Cevap:* Çipin silikon üzerindeki tüm difüzyon, polisilikon ve metal katmanlarının 2 boyutlu geometrik poligonlarını içerir.`,
      },
      {
        title: "5. Özet ve Temel Çıkarımlar",
        content: `- ASIC akışı RTL kodundan GDSII maske dosyasına kadar olan 7 aşamadır.
- Sentez kodu kapılara, Floorplan/Placement/Routing ise fiziksel geometriye dönüştürür.
- Tape-out çip üretiminin miladıdır.`,
      },
    ],
    playground: {
      title: "Verilog Sentezlenebilir RTL vs Simülasyon Modeli Farkı",
      filename: "tb_synth.v",
      language: "verilog",
      initialCode: `// Sentezlenebilir RTL Tasarım Kuralı
module synth_dff (
  input wire clk, rst_n, d,
  output reg q
);
  // Sentezlenebilir donanım bloğu
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) q <= 1'b0;
    else        q <= d;
  end
endmodule

module tb_synth_demo;
  reg clk, rst_n, d;
  wire q;

  synth_dff uut (.clk(clk), .rst_n(rst_n), .d(d), .q(q));

  initial begin
    $display("=== Sentezlenebilir RTL Modeli Başlatıldı ===");
    $display("Donanım kapı seviyesi netlist'e başarıyla dönüştürülebilir.");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Sentezlenebilir RTL Modeli Başlatıldı ===",
        "Donanım kapı seviyesi netlist'e başarıyla dönüştürülebilir.",
      ],
    },
    quiz: {
      question: "ASIC çip tasarım akışında 'Tape-out' terimi ne anlama gelir?",
      options: [
        "A) Kaset çalara müzik kaydetmek",
        "B) Tasarımın tüm mantıksal, zamanlama ve fiziksel kontrolleri (DRC, LVS, STA) tamamlayıp nihai maske üretim dosyasının (GDSII) silikon fabrikasına teslim edilmesi",
        "C) Testbench'in durdurulması",
        "D) Çipin lehimlenmesi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Tape-out, çip tasarımının tamamlanıp fotolitografi maskelerinin basılması için TSMC veya Intel gibi silikon fabrikalarına gönderildiği resmi dönüm noktasıdır.",
    },
  },

  // ========================================================
  // BÖLÜM 10: VLSI LEARNING ROADMAP
  // ========================================================
  "df-vlsi-roadmap": {
    id: "df-vlsi-roadmap",
    badge: "Bölüm 10 • FSM ve Mimari",
    readingTime: "17 dk okuma",
    level: "İleri Seviye",
    title: "VLSI Mühendisliği Yol Haritası ve Kariyer (VLSI Roadmap)",
    subtitle:
      "RTL Tasarım, Tasarım Doğrulama (DV - UVM), Fiziksel Tasarım (PD), DFT ve nanometre çip mimarileri rehberi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Çip sektöründe profesyonel mühendislik kariyeri ve uzmanlaşma yolları:
- İki Büyük Kariyer Yolu: **Ön Uç (Front-End)** vs **Arka Uç (Back-End / PD)**.
- **RTL Tasarım Mühendisliği:** Verilog, SystemVerilog, mikro-mimari ve synthesizable kodlama.
- **Tasarım Doğrulama (DV) Mühendisliği:** UVM (Universal Verification Methodology), Constrained Random Testing ve SystemVerilog OOP.
- **Fiziksel Tasarım (Physical Design - PD):** P&R, CTS, STA ve nanometre optimizasyonu.
- Açık kaynaklı silikon devrimi: **OpenLane**, **SkyWater 130nm** ve **Tiny Tapeout**.`,
      },
      {
        title: "2. VLSI Öğrenme ve Kariyer Yol Haritası",
        content: `![VLSI öğrenme ve nanometre çip mimarileri yol haritası](/images/digital/9.7-learning-roadmap.svg)

Çip endüstrisinde başarılı olmak için önerilen adım adım öğrenme piramidi:
1. **Temeller (Bu Eğitim!):** İkili mantık, Boole cebri, CMOS transistör fiziği, zamanlama.
2. **HDLs (Donanım Tanımlama Dilleri):** Verilog ve SystemVerilog ile sentezlenebilir mimariler.
3. **Doğrulama (DV):** Testbench mimarisi, assertions (SVA), UVM altyapısı.
4. **Bilgisayar Mimarisi:** RISC-V CPU tasarımı, boru hattı (Pipelining), önbellekler.
5. **Fiziksel Tasarım:** Sentez kısıtları (SDC), Statik Zamanlama Analizi (STA) ve P&R.`,
      },
      {
        title: "3. Hangi Alanda Uzmanlaşmalısınız?",
        content: `- **RTL Tasarımcı:** Mimarileri ve algoritmaları en düşük güç ve alanda kodlar.
- **Doğrulama Mühendisi (DV):** Çipin ilk seferde hatasız üretilmesini garanti eder (sektörde en çok iş ilanı olan alan!).
- **Fiziksel Tasarımcı (PD):** Transistörleri nanometre silikona yerleştirip zamanlama kapanışını (Timing Closure) sağlar.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Çip tasarımını sıradan yazılım geliştirmek (C++/Python) gibi görmek.**
  *Doğrusu:* Donanım yazılım gibi sonradan yamalanamaz; bir çipin tek bir maske seti milyonlarca dolardır. Bu yüzden "First-Time-Right" (İlk Seferde Doğru) kültürü ve doğrulama her şeydir.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir çip projesinde çalışan mühendislerin kaçı tasarımcı, kaçı doğrulama (DV) mühendisidir?**
*Cevap:* Tipik olarak her 1 RTL tasarımcısına karşılık **2 ila 3 Tasarım Doğrulama (DV) mühendisi** çalışır!

**S2: RISC-V mimarisi neden açık kaynaklı donanım için bir dönüm noktasıdır?**
*Cevap:* Lisans ücreti ödemeden herkesin kendi özelleştirilmiş işlemcisini tasarlayıp üretmesini sağladığı için.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- VLSI sektörü RTL Tasarım, Doğrulama ve Fiziksel Tasarım olarak uzmanlaşır.
- UVM ve SystemVerilog çip doğrulamasının endüstri standardıdır.
- Tebrikler! Digital Fundamentals serisini tamamlayarak çip dünyasına ilk sağlam adımınızı attınız!`,
      },
    ],
    playground: {
      title: "İlk Mikroişlemci Tasarımına Adım: RISC-V ALU Modülü",
      filename: "tb_riscv_alu.v",
      language: "verilog",
      initialCode: `// Temel RISC-V RV32I ALU Çekirdeği
module riscv_alu (
  input wire [31:0] a, b,
  input wire [3:0] alu_ctrl,
  output reg [31:0] result,
  output wire zero
);
  always @(*) begin
    case (alu_ctrl)
      4'b0000: result = a + b;       // ADD
      4'b1000: result = a - b;       // SUB
      4'b0111: result = a & b;       // AND
      4'b0110: result = a | b;       // OR
      4'b0100: result = a ^ b;       // XOR
      4'b0001: result = a << b[4:0]; // SLL
      4'b0101: result = a >> b[4:0]; // SRL
      4'b0010: result = ($signed(a) < $signed(b)) ? 32'd1 : 32'd0; // SLT
      default: result = 32'h0;
    endcase
  end

  assign zero = (result == 32'b0);
endmodule

module tb_riscv;
  reg [31:0] a, b;
  reg [3:0] ctrl;
  wire [31:0] res;
  wire z;

  riscv_alu uut (.a(a), .b(b), .alu_ctrl(ctrl), .result(res), .zero(z));

  initial begin
    $display("=== Tebrikler! Digital Fundamentals Tamamlandı ===");
    a = 32'd100; b = 32'd25; ctrl = 4'b0000; #10;
    $display("RISC-V ADD (100 + 25) = %d", res);
    ctrl = 4'b1000; #10;
    $display("RISC-V SUB (100 - 25) = %d", res);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Tebrikler! Digital Fundamentals Tamamlandı ===",
        "RISC-V ADD (100 + 25) = 125",
        "RISC-V SUB (100 - 25) =  75",
      ],
    },
    quiz: {
      question: "Modern çip geliştirme takımlarında bir donanımın üretim öncesinde sıfır bug ile çalıştığını garantilemek için en çok kullanılan evrensel doğrulama metodolojisi hangisidir?",
      options: [
        "A) Excel tabloları",
        "B) UVM (Universal Verification Methodology) ve SystemVerilog Constrained Random Verification",
        "C) Sadece elle kod inceleme",
        "D) C dili ile print etmek",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! UVM (Universal Verification Methodology), karmaşık mikroişlemcilerin ve SoC'lerin üretim öncesinde rastgele kısıtlı testlerle sıfır hata kalana kadar doğrulanmasını sağlayan evrensel endüstri standardıdır.",
    },
  },
};
