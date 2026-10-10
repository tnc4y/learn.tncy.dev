import { LessonContent } from "./lessonsData";

export const DIGITAL_FUNDAMENTALS_PART1: Record<string, LessonContent> = {
  // ========================================================
  // BÖLÜM 1: SAYISAL TASARIMA GİRİŞ (CHIPVERIFY DIGITAL FUNDAMENTALS)
  // ========================================================
  "df-intro": {
    id: "df-intro",
    badge: "Bölüm 1 • Giriş",
    readingTime: "12 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Sayısal Tasarım Nedir? (What is Digital Design?)",
    subtitle:
      "Analog ve dijital sinyaller, bit kavramı, anahtarlar ile mantıksal kararlar, transistörler, mantık kapıları ve bir çipin soyutlama katmanları.",
    sections: [
      {
        title: "1. Neden Dijital Tasarım Öğrenmelisiniz?",
        content: `Cebinizdeki akıllı telefon, saniyede milyarlarca kez açılıp kapanan milyarlarca minik anahtar (transistör) içeren gelişmiş bir silikon çipe sahiptir. Bu anahtarlar kameranızı, mesajlarınızı, müziğinizi ve açtığınız her uygulamayı çalıştırır.

**Dijital tasarım**, bu anahtarları faydalı işler yapacak şekilde düzenleme sanatıdır ve mühendisliğidir. Henüz elektronik bilmenize gerek yok: Bu eğitim serisi sıradan bir lamba anahtarından başlayarak gerçek bir çipin nasıl bir araya getirildiğinin net bir resmini sunar.

Dijital tasarım, yalnızca iki değerle (**0** ve **1**) çalışan elektronik devreler kurma zanaatıdır. Bir bilgisayarın yaptığı her şey — bir fotoğrafı ekranda göstermek, sayıları toplamak, bir şarkıyı çalmak — transistör adı verilen mikroskobik anahtarlar tarafından taşınan ve birleştirilen bu basit değerlere indirgenir.`,
        callout: {
          type: "info",
          title: "Neden Dijital Tasarım?",
          message:
            "Telefonunuzdaki işlemcide saniyede milyarlarca kez anahtarlanan 15+ milyar transistör bulunur. Dijital tasarım, bu devasa transistör denizini organize ederek güvenilir işlemciler, GPU'lar ve donanımlar üretmenizi sağlar.",
        },
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `Bu kapsamlı giriş dersini tamamladığınızda:
- **"Dijital" kavramının gerçek anlamını** ve bilgisayarların neden yalnızca 0 ve 1 kullandığını kavrayacaksınız.
- **Basit anahtarların seri ve paralel bağlanarak** nasıl AND (VE) ve OR (VEYA) gibi mantıksal kararlar alabildiğini göreceksiniz.
- **Transistörün** ve **mantık kapısının (logic gate)** en temel fiziksel çalışma prensibini anlayacaksınız.
- Bir silikon çipin **katı hal fiziğinden sistem seviyesine kadar katmanlar halinde nasıl inşa edildiğini** (soyutlama piramidi) öğreneceksiniz.`,
      },
      {
        title: "3. Analog vs. Dijital: İki Temel Felsefe",
        content: `Bir odayı aydınlatmanın iki yolunu düşünün:
1. Bir **reosta (dimmer)** düğmesi, parlaklığı pürüzsüz bir aralıkta herhangi bir seviyeye ayarlayabilir (az, çok veya aradaki sonsuz sayıda değer).
2. Standart bir **lamba anahtarının** ise yalnızca iki konumu vardır: **AÇIK (ON)** veya **KAPALI (OFF)**.

Elektronik dünyası da aynı iki temel tarza ayrılır:

| Özellik | Analog | Dijital |
| :--- | :--- | :--- |
| **Günlük Hayat Örneği** | Dimmer düğmesi, vinil plak, cıvalı termometre | Normal lamba anahtarı, MP3 müzik dosyası, dijital saat |
| **İzin Verilen Değerler** | Pürüzsüz sürekli bir aralıktaki herhangi bir değer | Yalnızca iki kesin değer: **0** ve **1** |
| **Gürültünün (Noise) Etkisi** | Değeri doğrudan bozar, hatalar katlanarak birikir | Genellikle hiçbir etkisi yoktur (gürültü marjı) |
| **Kopyalama Kararlılığı** | Her kopya bir öncekinden biraz daha bozuktur | Kopyalar %100 mükemmeldir, bozulmaz |

![Analog ve dijital sinyallerin karşılaştırması: Analog sinyal pürüzsüz bir aralıkta herhangi bir değeri alırken, dijital sinyal yalnızca net bir LOW (0) veya HIGH (1) bandındadır; küçük gürültü dalgalanmaları anlamını bozmaz.](/images/digital/0.1-analog-vs-digital.svg)

Dijital mimarinin en büyük süper gücü tablonun üçüncü satırındadır: Dijital bir devre, yalnızca "net olarak YÜKSEK" ile "net olarak DÜŞÜK" seviyelerini ayırt etmek zorundadır. Voltajdaki küçük bir çalkantı (örneğin 1.0 V yerine 0.92 V gelmesi) bir 1'i 0'a dönüştürmez. Böylece bilgi bozulmadan milyonlarca kez iletilebilir, saklanabilir ve kopyalanabilir.`,
      },
      {
        title: "4. Bitler: 0'lar ve 1'ler Dünyası",
        content: `Tek bir 0 veya 1 değerine **bit** (binary digit - ikili basamak) denir. Gerçek bir elektronik devre içinde bit, bir tel üzerindeki elektriksel voltajdır:
- **0 (LOW):** Sıfır volta yakın bir voltaj (genellikle 0.0V - 0.2V arası).
- **1 (HIGH):** Besleme voltajına ($V_{DD}$) yakın bir voltaj (modern gelişmiş bir çip içinde ~0.8V - 1.0V; birçok mikrodeneleyicide veya devre kartında 3.3V veya 5V).

Tek bir bit yalnızca EVET/HAYIR veya AÇIK/KAPALI diyebilir. Ancak bit grupları bir araya geldiğinde çok daha fazlasını ifade edebilir; çünkü her eklenen bit, olası kombinasyon sayısını **ikiye katlar**:

| Bit Sayısı ($N$) | Olası Durum Sayısı ($2^N$) | Ne İçin Yeterlidir? |
| :---: | :---: | :--- |
| **1 bit** | $2^1 = 2$ | Evet / Hayır, Açık / Kapalı |
| **2 bit** | $2^2 = 4$ | Dört mevsim (İlkbahar, Yaz, Sonbahar, Kış) |
| **8 bit (1 Bayt)** | $2^8 = 256$ | Alfabedeki bir harf (ASCII) veya bir rengin tonu |
| **24 bit (3 Bayt)** | $2^{24} \approx 16.7\text{ Milyon}$ | Ekranınızdaki tek bir pikselin rengi (Kırmızı, Yeşil, Mavi için 8'er bit) |

\`\`\`
3 Bit ile Sayma: Her kombinasyon farklı bir sayısal değerdir:

  000    001    010    011    100    101    110    111
   0      1      2      3      4      5      6      7

3 bit -> 2 x 2 x 2 = 8 farklı durum (0'dan 7'ye kadar)
\`\`\`

> **Hızlı Soru-Cevap:** 4 bit kaç farklı durum oluşturabilir?  
> **Cevap:** 16 ($2 \times 2 \times 2 \times 2 = 16$; 0000'dan 1111'e kadar olan 16 farklı desen).`,
      },
      {
        title: "5. Anahtarlar Mantıksal Kararlar Alabilir",
        content: `İşte tüm dijital elektroniğin ve bilgisayar biliminin temel çekirdek fikri: **Birlikte bağlanan anahtarlar mantıksal kararlar alabilir.**

Bir pil, bir lamba ve iki anahtar (A ve B) düşünün:

![İki sıradan mekanik anahtar doğrudan mantıksal karar üretir. Seri bağlantıda akım yalnızca her iki anahtar da kapalıyken akar (AND). Paralel bağlantıda ise herhangi biri kapalıysa akar (OR).](/images/digital/0.1-switches-series-and-parallel.svg)

- **Seri Bağlantı (Biri diğerinin ardında):** Akım ancak A **VE** B anahtarlarının her ikisi de kapalı olduğunda lambaya ulaşabilir. Lamba yalnızca A AND B devredeyken yanar.
- **Paralel Bağlantı (Yan yana kollar):** Akım kollardan herhangi birinden akabilir. Lambanın yanması için A **VEYA** B anahtarından birinin kapalı olması yeterlidir.

"Kapalı anahtar" ve "lamba yanıyor" durumuna **1**, "açık anahtar" ve "lamba sönük" durumuna **0** dersek, tüm olasılıkları bir **doğruluk tablosunda (truth table)** listeleyebiliriz:

| A Girişi | B Girişi | Seri Bağlantı (A AND B) | Paralel Bağlantı (A OR B) |
| :---: | :---: | :---: | :---: |
| 0 | 0 | **0** | **0** |
| 0 | 1 | **0** | **1** |
| 1 | 0 | **0** | **1** |
| 1 | 1 | **1** | **1** |`,
        callout: {
          type: "tip",
          title: "Bunu Günlük Hayatta Nerede Görüyorsunuz?",
          message:
            "Aynı anda iki anahtarın çevrilmesini gerektiren bir banka kasası bir AND (VE) mantığıdır. Merdivenin hem altından hem üstünden açılabilen aydınlatma devresi bir OR (VEYA) mantığıdır. Kapağı kapalı VE başlat düğmesine basılmış olduğunda çalışan bir mikrodalga fırın da mantıktır. Çip içinde bu kararlar elle değil, transistörlerle alınır.",
        },
      },
      {
        title: "6. Transistörler: Elektrikle Kontrol Edilen Minik Anahtarlar",
        content: `Mekanik bir lamba anahtarını açıp kapatmak için bir parmağa ihtiyaç vardır. **Transistör** ise bir parmak yerine **voltaj ile açılıp kapatılan** elektronik bir anahtardır.

Kontrol girişine (Gate) YÜKSEK (HIGH) bir voltaj uygulandığında anahtar kapanır ve akım iletir; DÜŞÜK (LOW) bir voltaj uygulandığında ise anahtar açılır ve devreyi keser.

Bu tek özellik çip dünyasındaki her şeyi değiştirir:
Bir transistör bir voltaj ile kontrol edildiği için ve kendi çıkışı da bir voltaj ürettiği için, **bir transistör doğrudan diğer bir transistörü kontrol edebilir!**

Böylece birbirine bağlanan transistör zincirleri, hiçbir insan müdahalesi olmadan saniyede milyonlarca veya milyarlarca kez kendi kendine karmaşık mantıksal kararlar alabilir.

Modern transistörlerin hareketli hiçbir mekanik parçası yoktur ve boyutları inanılmaz derecede küçüktür. Tek bir insan saçı teli kalınlığına yan yana **1000'den fazla modern transistör** sığabilir! Tırnak büyüklüğündeki küçük bir silikon parçasına 15-20 milyar transistörün sığabilmesinin sırrı budur.`,
      },
      {
        title: "7. Mantık Kapıları: Belirli Bir Görevi Olan Küçük Devreler",
        content: `Belirli bir mantıksal kararı yürütmek üzere birbirine bağlanmış birkaç transistörden oluşan temel devreye **mantık kapısı (logic gate)** adı verilir. Başlangıç için üç temel kapı yeterlidir:

![Üç temel mantık kapısı: NOT, AND ve OR. Bir hesap makinesinden en güçlü yapay zeka işlemcisine kadar her dijital devre bu kapıların kombinasyonlarıyla inşa edilir.](/images/digital/0.1-basic-logic-gates.svg)

| Kapı | Mantıksal Kural | Günlük Hayat Karşılığı |
| :--- | :--- | :--- |
| **NOT (Değil)** | Çıkış, girişin tam tersidir (0 ise 1, 1 ise 0) | "Kapı kapalı DEĞİL ise uyarı lambasını yak" |
| **AND (Ve)** | Çıkış, yalnızca tüm girişler 1 ise 1 olur | İki anahtarlı banka kasası |
| **OR (Veya)** | Çıkış, girişlerden en az biri 1 ise 1 olur | İki düğmeli merdiven aydınlatması |

Bu kapıları birbirine bağlayarak akla gelebilecek her şey inşa edilebilir: Sayıları toplayan devreler (toplayıcılar), sinyaller arasında seçim yapan çoğullayıcılar (multiplexer) ve bir biti hafızasında tutan bellek elemanları (flip-flop).

Bellek devreleri ile **saat (clock)** adı verilen düzenli ritmik bir sinyal birleştiğinde, çip adım adım komutları yürüten bir işlemciye (CPU) dönüşür.

> **Hızlı Soru-Cevap:** Bir otomobilin emniyet kemeri uyarısı: Koltukta oturan varsa (1) VE emniyet kemeri takılı DEĞİLSE (0) alarm çalmalıdır. Hangi kapılara ihtiyacınız vardır?  
> **Cevap:** Emniyet kemeri sinyalinin tersini almak için bir **NOT kapısı**, ardından bu sonucu koltuk sensörüyle birleştirmek için bir **AND kapısı**. Alarm = \`koltuk & ~kemer\`.`,
      },
      {
        title: "8. Donanımı Kod ile Tanımlamak (HDL & Verilog)",
        content: `Günümüzde hiçbir donanım mühendisi milyarlarca transistörü tek tek elle çizmez. Tasarımcılar, devrenin yapmasını istedikleri davranışı **Verilog** veya **SystemVerilog** gibi bir Donanım Tanımlama Dili (HDL) ile kod olarak tarif ederler:`,
        code: {
          language: "verilog",
          caption: "seatbelt_alarm.v - Donanım Tanımlama Dili (HDL) Örneği",
          snippet: `// Emniyet kemeri uyarısı: Koltuk dolu VE kemer takılı değilse alarm çal
module seatbelt_alarm (
    input  wire seat_taken,   // 1: Koltukta oturan var
    input  wire belt_on,      // 1: Kemer takılı
    output wire alarm         // 1: Alarm uyarı sesi çalmalı
);
    // & mantıksal AND (VE) demektir, ~ mantıksal NOT (Tersleme) demektir
    assign alarm = seat_taken & ~belt_on;
endmodule`,
        },
        callout: {
          type: "success",
          title: "Sentez Araçları (Synthesis Tools) Ne Yapar?",
          message:
            "Bir sentez yazılımı (Synopsys Design Compiler, Vivado vb.) bu Verilog kodunu okur ve silikon dökümhanesinin kütüphanesinden uygun fiziksel kapıları (bir NOT kapısı ve bir AND kapısı) otomatik olarak yerleştirip bağlar.",
        },
      },
      {
        title: "9. Büyük Resim: Bir Çip Katmanlar Halinde İnşa Edilir",
        content: `Karmaşık bir çipi anlamanın en kolay yolu onu bir soyutlama piramidi (katmanlar bütünü) olarak görmektir. Her katman bir altındakinin detaylarını gizler; böylece bir mimar tek tek elektronları veya transistörleri düşünmek yerine bloklar ve veri yolları düzeyinde tasarım yapabilir:

![Bir dijital çipin soyutlama katmanları: Katı hal fiziğinden transistörlere, mantık kapılarından sistem bloklarına kadar her katman bir altındakinin detaylarını gizler.](/images/digital/0.1-chip-abstraction-layers.svg)

| Katman | Cevapladığı Temel Mühendislik Sorusu |
| :--- | :--- |
| **Malzemeler & Katı Hal Fiziği** | Bir parça saf silikon nasıl elektrik iletebilir ve anahtar gibi davranabilir? |
| **Transistörler (MOSFET)** | Bir voltaj anahtarı nasıl açıp kapatır ve bu anahtarlama ne kadar hızlıdır? |
| **Mantık Kapıları (Logic Gates)** | NOT, AND, OR hücrelerini oluşturmak için transistörler nasıl bağlanır? |
| **Yapı Taşları (Building Blocks)** | Kapılar toplayıcılar, seçiciler (MUX), kaydediciler ve sayaçlara nasıl dönüşür? |
| **Sistemler & Çipler (VLSI & SoC)** | Bloklar, saat ağaçları, veri yolları ve güç dağıtım hatları üretilebilir bir çipe nasıl evrilir? |

Bu eğitim serisi, işte bu merdiveni en alt basamağından başlayarak tırmanır: Silikonun fiziğinden başlar, transistörler ve kapılar üzerinden geçerek Verilog kodunu gerçek bir fiziksel çipe dönüştüren adımlara kadar uzanır.`,
        callout: {
          type: "warning",
          title: "Alt Katmanlar Neden Hayatidir?",
          message:
            "Çoğu çip tasarımcısı günlerini üst katmanlarda Verilog yazarak geçirir. Ancak bir çipin ne kadar hızlı çalışacağını, ne kadar ısınacağını ve pilinin ne kadar dayanacağını alt katmanlardaki fizik belirler. Alttaki fiziksel gerçekliği bilen mühendisler, en yüksek performanslı ve verimli çipleri tasarlayanlardır.",
        },
      },
      {
        title: "10. Sayısal Tasarımda En Sık Yapılan Yanılgılar",
        content: `Dijital mantığa yeni başlayanların sıklıkla düştüğü kritik yanılgılar:

1. **Yanılgı #1: "Dijital voltajlar tam olarak 0.0V veya tam olarak besleme voltajıdır."**  
   Gerçek fizikte voltajlar asla kusursuz değildir. "0" demek "yeterince düşük bir voltaj aralığı", "1" ise "yeterince yüksek bir voltaj aralığı" demektir. Bu tolerans payı (gürültü marjı), dijital devreleri gürültüye karşı bağışık kılan şeydir.
2. **Yanılgı #2: "Bir çip, bilgisayar programı gibi satır satır çalışır."**  
   Yazılım programları işlemcide komutları sırayla çalıştırır. Donanım ise tamamen farklıdır: Bir devredeki her kapı **aynı anda, paralel olarak** çalışır. Kodla tarif edilse bile yazılan her satır fiziksel olarak sürekli devrededir.
3. **Yanılgı #3: "Analog artık önemsizdir."**  
   Gigahertz frekanslarına çıkıldığında iletim telleri, endüktans ve kapasitans nedeniyle analog davranmaya başlar. Dijital soyutlama mükemmeldir ancak altında her zaman fizik kuralları yatar.`,
      },
      {
        title: "11. Uygulama Alıştırması & Mühendislik Zorlukları",
        content: `Kendinizi test edin: Aşağıdaki iki günlük hayat devresinin doğruluk tablolarını çıkarın ve seri mi yoksa paralel anahtarlarla mı kurulacağını belirleyin:

1. **Araç Tavan Lambası:** Sürücü kapısı açık (1) VEYA yolcu kapısı açık (1) olduğunda tavan lambası yanmalıdır (1).
2. **Kasa Güvenlik Kilidi:** Kasa ancak Anahtar A çevrilmiş (1) VE Anahtar B çevrilmiş (1) olduğunda açılmalıdır (1).

| Giriş A | Giriş B | Tavan Lambası (OR) | Kasa Kilidi (AND) |
| :---: | :---: | :---: | :---: |
| 0 (Kapalı/Çevrilmemiş) | 0 (Kapalı/Çevrilmemiş) | **0** | **0** |
| 0 | 1 | **1** | **0** |
| 1 | 0 | **1** | **0** |
| 1 | 1 | **1** | **1** |

- **Tavan Lambası:** **Paralel anahtarlar** gerektirir (akım herhangi bir koldan geçebilir).
- **Kasa Kilidi:** **Seri anahtarlar** gerektirir (akımın geçmesi için her iki anahtarın da kapalı olması zorunludur).`,
      },
      {
        title: "12. Özet ve Sonraki Adım",
        content: `Bu temel giriş bölümünde öğrendikleriniz:
- Dijital devreler yalnızca iki değer (0 ve 1) kullanır; bu sayede gürültüye dayanıklıdır ve kusursuz kopyalanır.
- Bir bit, bir kablo üzerindeki DÜŞÜK veya YÜKSEK voltajdır. Bitler gruplanarak sayılar, harfler ve renkler kodlanır.
- Seri bağlı anahtarlar bir **AND** kararı; paralel bağlı anahtarlar bir **OR** kararı üretir.
- Transistör voltajla kontrol edilen bir anahtardır; bu sayede bir transistör diğerini tetikleyebilir.
- Mantık kapıları (NOT, AND, OR) transistör kümeleridir ve tüm işlemcilerin yapı taşıdır.
- Donanım tasarımı fizik, transistörler, kapılar ve sistemler olarak katmanlar halinde inşa edilir.

Bir sonraki derste bu piramidin en temeline iniyoruz: **Katı Hal Fiziği, Yarı İletkenler ve Silikon Kristalleri!**`,
      },
    ],
    playground: {
      title: "Verilog ile Emniyet Kemeri Uyarı Mantığı ve Testbench",
      filename: "tb_seatbelt.v",
      language: "verilog",
      initialCode: `// Emniyet Kemeri Mantık Modülü ve Testbench
module seatbelt_logic (
    input  wire seat_taken, // 1: Koltukta oturan var
    input  wire belt_on,    // 1: Emniyet kemeri takılı
    output wire alarm       // 1: Uyarı sesi çalmalı
);
    // Koltuk dolu VE kemer takılı DEĞİLSE alarm çal:
    assign alarm = seat_taken & ~belt_on;
endmodule

module tb_seatbelt;
  reg  seat;
  reg  belt;
  wire alarm;

  // Tasarım birimini (DUT) bağla:
  seatbelt_logic dut (
    .seat_taken(seat),
    .belt_on(belt),
    .alarm(alarm)
  );

  initial begin
    $display("==================================================");
    $display("   EMNİYET KEMERİ DİJİTAL MANTIK TESTİ (VERILOG)  ");
    $display("==================================================");
    $display(" Zaman | Koltuk (seat) | Kemer (belt) | ALARM ");
    $monitor(" %4t  |      %b        |      %b       |   %b   ", $time, seat, belt, alarm);

    // Test Senaryoları:
    seat = 0; belt = 0; #10; // Koltuk boş -> Alarm yok (0)
    seat = 1; belt = 0; #10; // Biri oturdu, kemer takılı değil -> ALARM ÇALMALI (1)
    seat = 1; belt = 1; #10; // Kemer takıldı -> Alarm susmalı (0)
    seat = 0; belt = 1; #10; // Koltuk boşaldı, kemer takılı -> Alarm yok (0)
    $finish;
  end
endmodule`,
      expectedOutput: [
        "==================================================",
        "   EMNİYET KEMERİ DİJİTAL MANTIK TESTİ (VERILOG)  ",
        "==================================================",
        " Zaman | Koltuk (seat) | Kemer (belt) | ALARM ",
        "    0  |      0        |      0       |   0   ",
        "   10  |      1        |      0       |   1   ",
        "   20  |      1        |      1       |   0   ",
        "   30  |      0        |      1       |   0   ",
      ],
    },
    quiz: {
      question:
        "İki mekanik anahtarın bir lambaya SERİ olarak bağlanması hangi temel mantık kapısına karşılık gelir ve lamba ne zaman yanar?",
      options: [
        "A) OR (Veya) Kapısı — Anahtarlardan herhangi biri kapalı olduğunda lamba yanar.",
        "B) AND (Ve) Kapısı — Yalnızca her iki anahtar da kapalı olduğunda lamba yanar.",
        "C) NOT (Değil) Kapısı — Anahtarlar açık olduğunda lamba kendiliğinden yanar.",
        "D) XOR Kapısı — Anahtarlardan yalnızca biri kapalı olduğunda lamba yanar.",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Seri bağlantıda akım bir anahtardan çıkıp diğerine girmek zorundadır. Devrenin tamamlanması için hem birinci VE hem de ikinci anahtarın kapalı (1) olması şarttır; bu da doğrudan AND mantığıdır.",
    },
  },

  // ========================================================
  // BÖLÜM 2: KATI HAL FİZİĞİ & YARI İLETKENLER
  // ========================================================
  "df-semiconductors": {
    id: "df-semiconductors",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "10 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Yarı İletken Fiziği: İletkenler, Yalıtkanlar ve Silikon",
    subtitle:
      "Valans ve iletim bantları, enerji aralığı (bandgap), silikon kristal yapısı ve içsel (intrinsic) taşıyıcı yoğunluğu.",
    sections: [
      {
        title: "1. Elektrik Akımının Temeli: Elektronlar Nasıl Hareket Eder?",
        content: `Elektrik akımı, yüklü parçacıkların (elektronların) bir iletken boyunca net hareketidir. Ancak bir malzemenin elektriği ne kadar iyi ileteceği, atomik düzeydeki enerji bant yapısı tarafından belirlenir:
- **Valans Bandı (Valence Band):** Atom çekirdeğine bağlı, kovalent bağları oluşturan elektronların bulunduğu alt enerji seviyesidir.
- **İletim Bandı (Conduction Band):** Çekirdekten serbest kalmış, kristal örgü içinde özgürce hareket ederek akım taşıyabilen elektronların bulunduğu üst enerji seviyesidir.
- **Yasak Enerji Aralığı (Bandgap - $E_g$):** Elektronların bulunamayacağı enerji boşluğudur. Bir elektronun akım taşıyabilmesi için valans bandından iletim bandına sıçraması gerekir.`,
      },
      {
        title: "2. Malzemelerin Enerji Aralığına Göre Sınıflandırılması",
        content: `Doğadaki katı malzemeler yasak enerji aralığına ($E_g$) göre üçe ayrılır:

| Malzeme Türü | Enerji Aralığı ($E_g$) | Davranış & Özellik | Örnekler |
| :--- | :---: | :--- | :--- |
| **İletkenler (Conductors)** | $\\sim 0\\text{ eV}$ (Bantlar çakışır) | Oda sıcaklığında trilyonlarca serbest elektron vardır; küçük bir voltajla devasa akım akar. | Bakır (Cu), Alüminyum (Al), Altın (Au) |
| **Yalıtkanlar (Insulators)** | $> 5 - 9\\text{ eV}$ (Çok geniş) | Valans elektronları çekirdeğe çok sıkı bağlıdır; oda sıcaklığında iletim bandına elektron geçemez. | Silikon dioksit ($SiO_2$), Cam, Elmas |
| **Yarı İletkenler (Semiconductors)** | $\\sim 1.1\\text{ eV}$ (Orta aralık) | Ne tam iletken ne tam yalıtkandır; iletkenliği sıcaklıkla veya katkılama ile trilyon kat değiştirilebilir! | Silikon (Si), Germanyum (Ge), Galyum Arsenür (GaAs) |`,
      },
      {
        title: "3. Silikon (Si): Modern Dünyanın Kalbi",
        content: `Periyodik cetvelin 4. grubunda yer alan **Silikon (Si)**, dış kabuğunda 4 valans elektronuna sahiptir. Kusursuz bir silikon kristalinde her silikon atomu, komşu dört atomla kovalent bağ kurarak bir elmas kristal örgüsü oluşturur.

Mutlak sıfır noktasında ($0\\text{ K} = -273.15^\\circ\\text{C}$) tüm elektronlar kovalent bağlara kilitlidir; silikon mükemmel bir yalıtkandır.

Ancak oda sıcaklığında ($300\\text{ K} \\approx 27^\\circ\\text{C}$) ortamdaki termal enerji, bazı kovalent bağları koparır. Bağdan kurtulan elektron iletim bandına geçerek **serbest elektron** haline gelir. Geride bıraktığı boşluğa ise pozitif yüklü bir parçacık gibi davranan **delik (hole)** denir.

İçsel (katkısız) silikonda elektron sayısı delik sayısına eşittir:
$$n = p = n_i$$
Oda sıcaklığında silikonun içsel taşıyıcı yoğunluğu $n_i \\approx 1.5 \\times 10^{10}\\text{ cm}^{-3}$'tür. Saf silikonun bir santimetreküpünde yaklaşık $5 \\times 10^{22}$ silikon atomu olduğu düşünülürse, her trilyon atomdan yalnızca birkaçı serbest elektron üretir. Bu nedenle saf silikon bir çip yapmak için yetersizdir.`,
      },
    ],
    playground: {
      title: "Yarı İletken Termal Taşıyıcı Yoğunluğu Simülasyonu",
      filename: "tb_semiconductors.v",
      language: "verilog",
      initialCode: `// Sıcaklıkla İçsel Taşıyıcı Üretimi (n_i) Prensibi
module tb_semiconductor;
  integer sicaklik_kelvin;
  real termal_enerji_eV;
  real k_boltzmann;

  initial begin
    k_boltzmann = 8.617e-5; // eV/K
    $display("=== Silikon Termal Enerji Analizi ===");
    $display("Sıcaklık (K) | Ortam Sıcaklığı (°C) | Termal Voltaj (kT/q) | Durum");

    sicaklik_kelvin = 77; // Sıvı Azot
    termal_enerji_eV = k_boltzmann * sicaklik_kelvin;
    $display("%7d K   |      -196 °C         |      %5.3f V         | Taşıyıcılar Donuk (Yalıtkan)", sicaklik_kelvin, termal_enerji_eV);

    sicaklik_kelvin = 300; // Oda Sıcaklığı
    termal_enerji_eV = k_boltzmann * sicaklik_kelvin;
    $display("%7d K   |       +27 °C         |      %5.3f V         | Yarı İletken Aktif (n_i)", sicaklik_kelvin, termal_enerji_eV);

    sicaklik_kelvin = 400; // Çalışan Sıcak Bir Çip (127 °C)
    termal_enerji_eV = k_boltzmann * sicaklik_kelvin;
    $display("%7d K   |      +127 °C         |      %5.3f V         | Kaçak Akım Artışı!", sicaklik_kelvin, termal_enerji_eV);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Silikon Termal Enerji Analizi ===",
        "Sıcaklık (K) | Ortam Sıcaklığı (°C) | Termal Voltaj (kT/q) | Durum",
        "     77 K   |      -196 °C         |      0.007 V         | Taşıyıcılar Donuk (Yalıtkan)",
        "    300 K   |       +27 °C         |      0.026 V         | Yarı İletken Aktif (n_i)",
        "    400 K   |      +127 °C         |      0.034 V         | Kaçak Akım Artışı!",
      ],
    },
    quiz: {
      question: "Silikonun iletkenler ve yalıtkanlardan en kritik farkı nedir?",
      options: [
        "A) Silikonun elektriği hiçbir zaman iletmemesi",
        "B) Yasak enerji aralığının (~1.1 eV) orta büyüklükte olması sayesinde iletkenliğinin katkılama ve voltajla kontrol edilebilmesi",
        "C) Silikonun oda sıcaklığında sıvı olması",
        "D) Sadece manyetik alan üretmesi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Silikonun ~1.1 eV bandgap'e sahip olması, atomik düzeyde kontrollü katkılama (doping) yapılarak iletkenliğinin trilyonlarca kat hassasiyetle ayarlanabilmesini sağlar.",
    },
  },

  // ========================================================
  // BÖLÜM 2: WHAT IS DOPING ? (KATKILAMA)
  // ========================================================
  "df-doping": {
    id: "df-doping",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "11 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Katkılama Nedir? (What is Doping? N-Tipi ve P-Tipi)",
    subtitle:
      "N-tipi (donör) ve P-tipi (akseptör) yarı iletkenler, çoğunluk ve azınlık taşıyıcıları, oran kuralı ve Multi-Threshold kütüphaneleri.",
    sections: [
      {
        title: "1. Saf Silikon Neden Yetersizdir?",
        content: `Saf (içsel) silikonda oda sıcaklığında serbest elektron sayısı son derece azdır ($n_i \\approx 1.5 \\times 10^{10}\\text{ cm}^{-3}$). Akım taşımak için yeterli yük taşıyıcısı bulunmadığından saf silikon pratik bir transistör yapmaya yetmez.

Silikonun iletkenliğini trilyonlarca kat artırmanın yolu **katkılama (doping)** işlemidir: Silikon kristal örgüsü içerisine milyonda bir oranında yabancı atomlar (safsızlıklar) enjekte edilir.`,
      },
      {
        title: "2. N-Tipi Katkılama: Fazladan Elektron Eklemek",
        content: `Periyodik cetvelin 5. grubunda yer alan elementler (örneğin **Fosfor - P** veya **Arsenik - As**) dış kabuklarında 5 valans elektronuna sahiptir.

Silikon kafesindeki bir Si atomunun yerine bir Fosfor atomu yerleştiğinde:
- Fosforun 4 elektronu komşu silikon atomlarıyla kovalent bağ kurar.
- 5. elektron ise hiçbir bağa katılmaz, çekirdeğe çok zayıf bağlıdır ve oda sıcaklığındaki termal enerjiyle kolayca serbest kalır!

Bu tip yabancı atomlara elektron bağışladıkları için **Donör (Verici)** atomlar ($N_D$) denir. Serbest negatif elektronların çoğunlukta olduğu bu malzemeye **N-Tipi Yarı İletken** denir.
- **Çoğunluk Taşıyıcıları (Majority Carriers):** Negatif elektronlar ($n$).
- **Azınlık Taşıyıcıları (Minority Carriers):** Termal olarak üretilen pozitif delikler ($p$).`,
      },
      {
        title: "3. P-Tipi Katkılama: Delikler (Boşluklar) Yaratmak",
        content: `Periyodik cetvelin 3. grubunda yer alan elementler (örneğin **Bor - B**) dış kabuklarında yalnızca 3 valans elektronuna sahiptir.

Silikon kafesine bir Bor atomu yerleştiğinde:
- Bor komşu 4 silikon atomuyla bağ kurmak ister ama elinde 3 elektron vardır; 4. bağda bir elektron eksik kalır!
- Bu eksiklik bir **delik (hole)** oluşturur. Komşu bir kovalent bağdan elektron bu deliğe atlayabilir, bu da deliğin kristal içinde pozitif bir parçacık gibi serbestçe hareket etmesini sağlar.

Bu atomlara dışarıdan elektron kabul edebildikleri için **Akseptör (Alıcı)** atomlar ($N_A$) denir. Pozitif deliklerin çoğunlukta olduğu bu malzemeye **P-Tipi Yarı İletken** denir.
- **Çoğunluk Taşıyıcıları:** Pozitif delikler ($p$).
- **Azınlık Taşıyıcıları:** Negatif serbest elektronlar ($n$).`,
      },
      {
        title: "4. Kütle Hareketi Kanunu ve Taşıyıcı Dengesi",
        content: `Termodinamik dengede bir yarı iletkende elektron ve delik yoğunluklarının çarpımı daima sabittir:
$$n \\cdot p = n_i^2$$

Eğer silikona yüksek oranda donör katkılanırsa ($N_D = 10^{17}\\text{ cm}^{-3}$):
$$n \\approx N_D = 10^{17}\\text{ cm}^{-3}$$
$$p = \\frac{n_i^2}{n} = \\frac{(1.5 \\times 10^{10})^2}{10^{17}} = 2.25 \\times 10^3\\text{ cm}^{-3}$$
Görüldüğü üzere çoğunluk taşıyıcıları (elektronlar) azınlık taşıyıcılarına (delikler) kıyasla trilyonlarca kat daha fazladır!`,
      },
      {
        title: "5. Çip Tasarımında Nerede Kullanılır? Multi-Threshold Kütüphaneleri",
        content: `Modern bir CMOS çipinde transistörlerin eşik gerilimi ($V_{th}$) doğrudan kanal altındaki katkılama konsantrasyonuyla ayarlanır:
- **LVT (Low-Vth Cells):** Düşük katkılama -> Hızlı anahtarlar ama yüksek sızıntı/kaçak akım (Kritik yollarda kullanılır).
- **SVT (Standard-Vth Cells):** Standart hız ve dengeli güç.
- **HVT (High-Vth Cells):** Yüksek katkılama -> Yavaş anahtarlar ama mikroskobik kaçak akım (Pil tasarrufu için kritik olmayan bloklarda kullanılır).`,
      },
    ],
    playground: {
      title: "Katkılama Taşıyıcı Yoğunluğu ve n*p = n_i^2 Doğrulama Testi",
      filename: "tb_doping.v",
      language: "verilog",
      initialCode: `module tb_doping;
  real ni;
  real Nd;
  real n;
  real p;

  initial begin
    ni = 1.5e10; // Silikon ni = 1.5e10 cm^-3
    Nd = 1.0e17; // Donör katkılama yoğunluğu

    n = Nd;
    p = (ni * ni) / n;

    $display("=== N-Tipi Silikon Taşıyıcı Analizi ===");
    $display("İçsel Yoğunluk (ni)     : %e cm^-3", ni);
    $display("Donör Katkısı (Nd)      : %e cm^-3", Nd);
    $display("Çoğunluk (Elektronlar n): %e cm^-3", n);
    $display("Azınlık (Delikler p)    : %e cm^-3", p);
    $display("n * p Çarpımı           : %e (ni^2 = 2.25e20 olmalı)", n * p);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== N-Tipi Silikon Taşıyıcı Analizi ===",
        "İçsel Yoğunluk (ni)     : 1.500000e+10 cm^-3",
        "Donör Katkısı (Nd)      : 1.000000e+17 cm^-3",
        "Çoğunluk (Elektronlar n): 1.000000e+17 cm^-3",
        "Azınlık (Delikler p)    : 2.250000e+03 cm^-3",
        "n * p Çarpımı           : 2.250000e+20 (ni^2 = 2.25e20 olmalı)",
      ],
    },
    quiz: {
      question: "Saf silikona 5 valans elektronlu Fosfor atomu eklendiğinde ne oluşur?",
      options: [
        "A) P-Tipi yarı iletken ve serbest delikler",
        "B) N-Tipi yarı iletken ve serbest elektronlar",
        "C) Silikon tamamen yalıtkan hale gelir",
        "D) Silikon erir",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 5 valans elektronlu Fosforun 4 elektronu kovalent bağ kurarken 5. elektronu serbest kalarak N-Tipi (Negatif yüklü taşıyıcı zengini) yarı iletken oluşturur.",
    },
  },

  // ========================================================
  // BÖLÜM 2: THE PN JUNCTION (PN EKLEMİ)
  // ========================================================
  "df-pn-junction": {
    id: "df-pn-junction",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "11 dk okuma",
    level: "Orta Seviye",
    title: "PN Eklemi ve Diyot Karakteristiği (The PN Junction)",
    subtitle:
      "Tüketim bölgesi (depletion region), dahili potansiyel (Vbi), ileri/ters kutuplama ve CMOS çiplerindeki parazitik eklemler.",
    sections: [
      {
        title: "1. P-Tipi ve N-Tipi Karşılaştığında Ne Olur?",
        content: `P-tipi ve N-tipi yarı iletkenler aynı kristal yapı içinde bir araya getirildiğinde sınır bölgesinde muazzam bir taşıyıcı yoğunluğu farkı oluşur:
- N tarafındaki serbest elektronlar difüzyonla P tarafına doğru akar.
- P tarafındaki delikler ise N tarafına doğru difüze olur.

Elektronlar ve delikler sınırda karşılaştıklarında birbirlerini nötrlerler (rekombinasyon). Ancak bu durum sınırda geride iyonlaşmış hareketsiz atom çekirdekleri bırakır:
- N tarafında elektronunu kaybeden donör atomlar pozitif yüklü iyonlar ($N_D^+$) olarak kalır.
- P tarafında delik kaybeden akseptör atomlar negatif yüklü iyonlar ($N_A^-$) olarak kalır.`,
      },
      {
        title: "2. Tüketim Bölgesi (Depletion Region) ve Dahili Potansiyel ($V_{bi}$)",
        content: `Bu hareketsiz iyonlar sınırda serbest taşıyıcılardan arındırılmış bir bölge meydana getirir: Buna **tüketim bölgesi (depletion region)** veya boşalmış bölge denir.

Pozitif iyonlardan negatif iyonlara doğru yönelen dahili bir elektrik alan oluşur. Bu elektrik alan daha fazla elektronun karşıya geçmesini engeller ve denge kurulur. Bu potansiyel bariyerine **Dahili Potansiyel (Built-in Potential - $V_{bi}$)** denir:
$$V_{bi} = \\frac{kT}{q} \\ln\\left(\\frac{N_A N_D}{n_i^2}\\right)$$
Silikon için oda sıcaklığında $V_{bi}$ tipik olarak **0.6 V - 0.8 V** arasındadır.`,
      },
      {
        title: "3. İleri ve Ters Kutuplama (Forward vs Reverse Bias)",
        content: `| Kutuplama Türü | Uygulanan Voltaj | Tüketim Bölgesi | Akım Durumu |
| :--- | :--- | :--- | :--- |
| **Denge (Sıfır Voltaj)** | $V = 0\\text{ V}$ | Kararlı genişlik | Net akım sıfırdır. |
| **İleri Kutuplama (Forward Bias)** | $P > N$ ($V > 0.7\\text{ V}$) | Daralır ve bariyer çöker | Devasa difüzyon akımı akar (AÇIK). |
| **Ters Kutuplama (Reverse Bias)** | $N > P$ ($V < 0\\text{ V}$) | Genişler | Akım akmaz, sadece pikoamper seviyesinde kaçak akım akar (KAPALI). |

> **CMOS Çiplerinde PN Eklemleri Nerededir?**  
> Her MOSFET transistörünün Source ve Drain bölgeleri gövdeyle (Body/Substrate) birer PN eklemi oluşturur! Bir NMOS transistöründe N+ Source/Drain ile P-Substrate her zaman **Ters Kutuplanmış** tutulur; aksi takdirde çipin tüm besleme akımı gövdeye akarak çipi yakar!`,
      },
    ],
    playground: {
      title: "PN Eklem Dahili Potansiyel (Vbi) Hesaplayıcı",
      filename: "tb_pn_junction.v",
      language: "verilog",
      initialCode: `module tb_pn_junction;
  real Vt;  // Termal voltaj kT/q (~0.0259V)
  real Na;  // P-tarafı akseptör
  real Nd;  // N-tarafı donör
  real ni;  // İçsel taşıyıcı
  real Vbi; // Dahili potansiyel

  initial begin
    Vt = 0.0259;
    ni = 1.5e10;
    Na = 1.0e17;
    Nd = 1.0e17;

    // Vbi = Vt * ln(Na*Nd / ni^2)
    Vbi = Vt * $ln((Na * Nd) / (ni * ni));

    $display("=== PN Eklemi Dahili Potansiyel (Vbi) ===");
    $display("Na Katkısı       : %e cm^-3", Na);
    $display("Nd Katkısı       : %e cm^-3", Nd);
    $display("Dahili Bariyer Vbi: %5.3f Volt (Tipik silikon eşiği: ~0.7V)", Vbi);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== PN Eklemi Dahili Potansiyel (Vbi) ===",
        "Na Katkısı       : 1.000000e+17 cm^-3",
        "Nd Katkısı       : 1.000000e+17 cm^-3",
        "Dahili Bariyer Vbi: 0.814 Volt (Tipik silikon eşiği: ~0.7V)",
      ],
    },
    quiz: {
      question: "Bir PN eklemine TERS kutuplama uygulandığında tüketim bölgesine ne olur?",
      options: [
        "A) Tüketim bölgesi tamamen yok olur",
        "B) Tüketim bölgesi genişler ve akım akışı engellenir",
        "C) Diyot patlar",
        "D) Doğru akım sonsuza gider",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Ters kutuplama (N tarafına pozitif voltaj) uygulandığında dış voltaj dahili elektrik alanla aynı yönde etki ederek taşıyıcıları sınırdan uzaklaştırır ve tüketim bölgesini daha da genişletir.",
    },
  },

  // ========================================================
  // BÖLÜM 2: CARRIERS, CURRENT & TEMPERATURE
  // ========================================================
  "df-carriers-temperature": {
    id: "df-carriers-temperature",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Taşıyıcı İletimi ve Sıcaklık Etkileri (Carriers & Temperature)",
    subtitle:
      "Sürüklenme (drift), difüzyon, Einstein ilişkisi, sıcaklıkla azalan mobilite ve termal kaçak (thermal runaway).",
    sections: [
      {
        title: "1. Taşıyıcı İletiminin İki Mekanizması: Drift ve Difüzyon",
        content: `Yarı iletkende akım iki temel fiziksel kuvvetle taşınır:
1. **Sürüklenme (Drift):** Elektrik alanın ($E$) yüklü parçacıklara uyguladığı elektrostatik kuvvet sonucu oluşan hareket:
   $$v_d = \\mu \\cdot E$$
   Burada $\\mu$ (mobilite), elektronların veya deliklerin kristal içinde ne kadar kolay hızlandığını belirtir.
2. **Difüzyon (Diffusion):** Taşıyıcıların yoğun bölgeden seyrek bölgeye doğru rastgele termal saçılmayla yayılması:
   $$J_{diff} = q D_n \\frac{dn}{dx}$$

Bu iki mekanizma **Einstein İlişkisi** ile birbirine bağlıdır:
$$\\frac{D}{\\mu} = \\frac{kT}{q} = V_t$$`,
      },
      {
        title: "2. Sıcaklığın İki Zıt Etkisi",
        content: `Bir çip ısındığında (örneğin $25^\\circ\\text{C}$'den $105^\\circ\\text{C}$'ye çıktığında) transistörlerde iki büyük değişim gerçekleşir:

1. **Taşıyıcı Mobilitesi Düşer (Çip Yavaşlar!):** Kristal kafes atomları yüksek sıcaklıkta şiddetle titreşir (fonon saçılması). Elektronlar atomlara çarpmaktan hızlanamaz; mobilite $\\mu(T) \\propto T^{-1.5}$ ile düşer. Bu yüzden sıcak bir çip daha yavaş çalışır ve maksimum frekansı düşer!
2. **Termal Kaçak Akım Katlanarak Artar:** İçsel taşıyıcı üretimi $n_i$ sıcaklıkla üssel artar. Bu durum transistör kapalıyken bile akmasına sebep olan **eşikaltı kaçak akımını (subthreshold leakage)** dramatik biçimde artırır!`,
      },
    ],
    playground: {
      title: "Sıcaklıkla Mobilite Düşüşü ve Çip Frekans Kaybı",
      filename: "tb_temp_mobility.v",
      language: "verilog",
      initialCode: `module tb_temp;
  real T_oda;
  real T_sicak;
  real mu_oda;
  real mu_sicak;

  initial begin
    T_oda = 300.0;   // 27 °C
    T_sicak = 398.0; // 125 °C (Zorlu çalışma ortamı)
    mu_oda = 1400.0; // Elektron mobilitesi cm^2/Vs

    // mu(T) = mu0 * (T/300)^(-1.5)
    mu_sicak = mu_oda * $pow(T_sicak / T_oda, -1.5);

    $display("=== Sıcaklık ve Mobilite Kaybı Analizi ===");
    $display("Oda Sıcaklığı (27 °C)   : Mobilite = %5.1f cm^2/Vs (Hızlı)", mu_oda);
    $display("Yüksek Sıcaklık (125 °C): Mobilite = %5.1f cm^2/Vs (Yavaş!)", mu_sicak);
    $display("Mobilite Kaybı Oranı    : %%%4.1f yavaşlama", (1.0 - mu_sicak/mu_oda)*100.0);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Sıcaklık ve Mobilite Kaybı Analizi ===",
        "Oda Sıcaklığı (27 °C)   : Mobilite = 1400.0 cm^2/Vs (Hızlı)",
        "Yüksek Sıcaklık (125 °C): Mobilite =  915.2 cm^2/Vs (Yavaş!)",
        "Mobilite Kaybı Oranı    : %34.6 yavaşlama",
      ],
    },
    quiz: {
      question: "Bir bilgisayar işlemcisi ısındığında saat frekansının düşmesinin (termal throttling) fiziksel sebebi nedir?",
      options: [
        "A) Sıcaklık arttıkça atomların titreşmesi (fonon saçılması) yüzünden elektron mobilitesinin düşmesi ve kapıların yavaşlaması",
        "B) Isınan çiplerin boyutlarının iki katına çıkması",
        "C) Kabloların kopması",
        "D) Verilog kodunun silinmesi",
      ],
      correctIndex: 0,
      explanation:
        "Doğru! Fonon saçılması nedeniyle sıcaklıkla mobilite $\\mu$ azalır, drenaj akımı düşer, kapı gecikmeleri uzar ve işlemci kararlı kalabilmek için frekansını kısmak zorunda kalır.",
    },
  },

  // ========================================================
  // BÖLÜM 3: THE MOSFET (MOSFET ANATOMİSİ)
  // ========================================================
  "df-mosfet-anatomy": {
    id: "df-mosfet-anatomy",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "11 dk okuma",
    level: "Orta Seviye",
    title: "MOSFET Anatomisi: Gate Oksit, Kanal ve Terminaller",
    subtitle:
      "Dört terminalli MOS yapısı, Gate oksit kapasitansı (Cox), kanal genişlik/uzunluk (W/L) oranı ve Verilog seviyesi modelleme.",
    sections: [
      {
        title: "1. MOSFET'in Dört Terminali",
        content: `MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor), dijital çağın temel anahtarlama birimidir. Dört terminale sahiptir:
1. **Gate (Kapı - G):** Kontrol terminalidir. Yalıtkan bir oksit tabakasının üzerine oturur; içeriye doğru DC akım akmaz!
2. **Drain (Drenaj - D):** Akımın aktığı ana kutuplardan biridir.
3. **Source (Kaynak - S):** Taşıyıcıların kanala girdiği kutuptur.
4. **Body / Bulk (Gövde - B):** Transistörün inşa edildiği yarı iletken tabandır.`,
      },
      {
        title: "2. Gate Oksit: Neden Gate'ten DC Akım Akmaz?",
        content: `Gate elektrodu ile silikon kanal arasında son derece ince bir yalıtkan katman (**Gate Oksit - $SiO_2$** veya modern çiplerde **High-k HfO2**) bulunur.

Oksit mükemmel bir yalıtkan olduğu için Gate içine doğru hiçbir doğru akım (DC) akmaz. Gate tam bir kondansatör gibi davranır:
$$C_{ox} = \\frac{\\epsilon_{ox}}{t_{ox}}$$
Gate'e uygulanan voltaj, elektrostatik alan oluşturarak oksitin altındaki silikon yüzeyinde taşıyıcıları toplar ve **iletken bir kanal** açar.`,
      },
      {
        title: "3. Kanal Boyutları: Genişlik (W) ve Uzunluk (L)",
        content: `Kanalın iki temel boyutu vardır:
- **Uzunluk ($L$):** Source ile Drain arasındaki mesafedir. Teknoloji düğümünü (örneğin 5nm, 7nm, 28nm) belirleyen asıl parametredir. $L$ ne kadar kısa olursa elektronlar kanalı o kadar hızlı geçer (daha yüksek frekans).
- **Genişlik ($W$):** Kanalın enidir. $W$ ne kadar geniş olursa o kadar çok paralel akım yolu açılır ve transistörün sürüş gücü (drive strength) artar.`,
      },
    ],
    playground: {
      title: "Verilog Switch-Level NMOS ve PMOS Transistör Modeli",
      filename: "tb_mosfet_switch.v",
      language: "verilog",
      initialCode: `// Verilog dahili switch-level nmos ve pmos primitifleri
module cmos_inverter (
    input  wire in,
    output wire out
);
    supply1 VDD;
    supply0 GND;

    // pmos (out, source, gate)
    pmos p1 (out, VDD, in);
    // nmos (out, source, gate)
    nmos n1 (out, GND, in);
endmodule

module tb_mosfet;
  reg in;
  wire out;

  cmos_inverter inv (.in(in), .out(out));

  initial begin
    $display("=== Transistör Seviyesi Inverter Testi ===");
    in = 0; #10;
    $display("Giriş in = %b -> Çıkış out = %b (PMOS açık, NMOS kapalı)", in, out);
    in = 1; #10;
    $display("Giriş in = %b -> Çıkış out = %b (NMOS açık, PMOS kapalı)", in, out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Transistör Seviyesi Inverter Testi ===",
        "Giriş in = 0 -> Çıkış out = 1 (PMOS açık, NMOS kapalı)",
        "Giriş in = 1 -> Çıkış out = 0 (NMOS açık, PMOS kapalı)",
      ],
    },
    quiz: {
      question: "Bir transistörün Gate terminali silikon kanaldan ne ile ayrılır?",
      options: [
        "A) Bakır bir telle",
        "B) Son derece ince yalıtkan bir Gate Oksit (Dielektrik) tabakası ile",
        "C) Su damlasıyla",
        "D) Hiçbir şeyle ayrılmaz",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Gate elektrodu kanaldan dielektrik bir oksit tabakasıyla izole edilmiştir; böylece Gate içine DC akım akmaz, sadece elektrostatik alan ile kanal kontrol edilir.",
    },
  },

  // ========================================================
  // BÖLÜM 3: THRESHOLD VOLTAGE (EŞİK GERİLİMİ)
  // ========================================================
  "df-threshold-voltage": {
    id: "df-threshold-voltage",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "10 dk okuma",
    level: "Orta Seviye",
    title: "Eşik Gerilimi (Threshold Voltage - Vth) ve Kanal Oluşumu",
    subtitle:
      "Terslenme katmanı (inversion layer), yüzey potansiyeli, fermi seviyesi ve Gövde Etkisi (Body Effect).",
    sections: [
      {
        title: "1. Eşik Gerilimi ($V_{th}$) Nedir?",
        content: `Bir NMOS transistöründe Gate'e pozitif voltaj uygulandığında, oksit altındaki P-tipi gövdeden delikler itilir ve pozitif donör iyonları kalır (tüketim).

Gate voltajı artırılmaya devam edildiğinde, gövdedeki azınlık elektronları yüzeye çekilir. Yüzeydeki elektron yoğunluğu, gövdenin kendi delik yoğunluğunu aştığında yüzey artık N-tipi davranmaya başlar: Buna **Güçlü Terslenme (Strong Inversion)** denir.

Güçlü terslenmenin başladığı Gate-Source voltajına **Eşik Gerilimi ($V_{th}$)** denir:
- $V_{GS} < V_{th}$ ise iletken kanal yoktur; transistör KAPALIDIR (Cutoff).
- $V_{GS} \\ge V_{th}$ ise Source ile Drain arasında kesintisiz bir iletim kanalı oluşur; transistör AÇIKTIR.`,
      },
      {
        title: "2. Gövde Etkisi (Body Effect): Kaynak Gövdeden Yüksekte Olursa",
        content: `Normalde Source ve Body aynı voltajdadır ($V_{SB} = 0$). Ancak seri bağlı transistörlerde üstteki transistörün Source voltajı gövdeden daha yüksek olabilir ($V_{SB} > 0$).

Bu durum tüketim bölgesini genişletir ve kanalı açmak için Gate'in daha yüksek voltaj uygulaması gerekir. Yani eşik gerilimi artar:
$$V_{th} = V_{th0} + \\gamma \\left(\\sqrt{2\\phi_F + V_{SB}} - \\sqrt{2\\phi_F}\\right)$$
Burada $\\gamma$ (gamma) gövde etkisi katsayısıdır. Gövde etkisi seri transistörlerin (örneğin NAND kapısındaki pull-down zinciri) yavaşlamasına sebep olur.`,
      },
    ],
    playground: {
      title: "Gövde Etkisi (Body Effect) ve Eşik Gerilimi Artışı",
      filename: "tb_body_effect.v",
      language: "verilog",
      initialCode: `module tb_body_effect;
  real Vth0;
  real gamma;
  real phi_f;
  real Vsb;
  real Vth;

  initial begin
    Vth0 = 0.35; // Temel Vth (0.35V)
    gamma = 0.4; // Gövde katsayısı
    phi_f = 0.35; // 2*phi_f = 0.7V

    $display("=== Gövde Etkisi (Body Effect) Analizi ===");
    $display("Vsb (Volt) | Eşik Gerilimi Vth (Volt) | Etki");

    Vsb = 0.0;
    Vth = Vth0 + gamma * ($sqrt(2*phi_f + Vsb) - $sqrt(2*phi_f));
    $display("  %4.2f V   |        %5.3f V          | Normal (Vsb=0)", Vsb, Vth);

    Vsb = 0.4;
    Vth = Vth0 + gamma * ($sqrt(2*phi_f + Vsb) - $sqrt(2*phi_f));
    $display("  %4.2f V   |        %5.3f V          | Vth Yükseldi (Seri Kapı)", Vsb, Vth);

    Vsb = 0.8;
    Vth = Vth0 + gamma * ($sqrt(2*phi_f + Vsb) - $sqrt(2*phi_f));
    $display("  %4.2f V   |        %5.3f V          | Ciddi Hız Kaybı!", Vsb, Vth);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Gövde Etkisi (Body Effect) Analizi ===",
        "Vsb (Volt) | Eşik Gerilimi Vth (Volt) | Etki",
        "  0.00 V   |        0.350 V          | Normal (Vsb=0)",
        "  0.40 V   |        0.435 V          | Vth Yükseldi (Seri Kapı)",
        "  0.80 V   |        0.505 V          | Ciddi Hız Kaybı!",
      ],
    },
    quiz: {
      question: "Source ile Body arasında pozitif bir voltaj ($V_{SB} > 0$) olduğunda transistörün eşik gerilimine ne olur?",
      options: [
        "A) Eşik gerilimi yükselir (Gövde Etkisi) ve transistör daha zor açılır",
        "B) Eşik gerilimi sıfıra düşer",
        "C) Transistör tersine döner",
        "D) Transistör daha hızlı açılır",
      ],
      correctIndex: 0,
      explanation:
        "Doğru! $V_{SB} > 0$ olduğunda ters kutuplanan gövde tüketim bölgesini genişletir ve kanalı açmak için daha yüksek $V_{GS}$ gerekir ($V_{th}$ yükselir).",
    },
  },

  // ========================================================
  // BÖLÜM 3: MOSFET DRAIN CURRENT REGIMES
  // ========================================================
  "df-drain-current-regimes": {
    id: "df-drain-current-regimes",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "11 dk okuma",
    level: "Orta Seviye",
    title: "Drenaj Akımı Çalışma Bölgeleri: Kesim, Triyot ve Doyum",
    subtitle:
      "Kanal sıkışması (pinch-off), Shichman akım formülleri, transkondüktans ve kanal boyu modülasyonu.",
    sections: [
      {
        title: "1. Üç Temel Çalışma Bölgesi",
        content: `Bir MOSFET transistörünün Drain'inden Source'una akan akım ($I_{DS}$), $V_{GS}$ ve $V_{DS}$ gerilimlerine bağlı olarak üç farklı bölgede incelenir:

1. **Kesim Bölgesi (Cutoff):**  
   $V_{GS} < V_{th}$  
   Kanal oluşmamıştır. İdealde akım sıfırdır (pratikte minik bir eşikaltı kaçak akım akar). Transistör açık bir devre gibidir.
2. **Triyot / Lineer Bölge (Triode / Linear):**  
   $V_{GS} \\ge V_{th}$ ve $V_{DS} < V_{GS} - V_{th}$  
   Kanal boyunca kesintisiz taşıyıcı yolu vardır. Transistör Gate voltajıyla değeri değişen bir direnç gibi davranır:
   $$I_{DS} = \\mu C_{ox} \\frac{W}{L} \\left( (V_{GS} - V_{th})V_{DS} - \\frac{V_{DS}^2}{2} \\right)$$
3. **Doyum Bölgesi (Saturation):**  
   $V_{GS} \\ge V_{th}$ ve $V_{DS} \\ge V_{GS} - V_{th}$  
   Drain ucunda kanal kalınlığı sıfıra iner (**Pinch-off / Kanal Sıkışması**). $V_{DS}$ ne kadar artarsa artsın akım doyuma ulaşır ve neredeyse sabit kalır:
   $$I_{DS} = \\frac{1}{2} \\mu C_{ox} \\frac{W}{L} (V_{GS} - V_{th})^2 (1 + \\lambda V_{DS})$$`,
      },
    ],
    playground: {
      title: "MOSFET Akım-Gerilim (I-V) Çalışma Bölgesi Tespiti",
      filename: "tb_mosfet_iv.v",
      language: "verilog",
      initialCode: `module tb_iv;
  real Vgs, Vds, Vth;
  real Vov; // Aşırı sürüş gerilimi (Vgs - Vth)

  initial begin
    Vth = 0.4;
    $display("=== MOSFET Çalışma Bölgesi Belirleme (Vth = 0.4V) ===");

    // Senaryo 1:
    Vgs = 0.2; Vds = 0.8;
    $display("Vgs=%3.1fV, Vds=%3.1fV -> %s", Vgs, Vds, (Vgs < Vth) ? "KESİM (Cutoff - Akım Yok)" : "Açık");

    // Senaryo 2:
    Vgs = 0.9; Vds = 0.2; Vov = Vgs - Vth; // Vov = 0.5V
    $display("Vgs=%3.1fV, Vds=%3.1fV -> %s (Vds < Vov)", Vgs, Vds, (Vds < Vov) ? "TRİYOT (Lineer - Direnç gibi)" : "Doyum");

    // Senaryo 3:
    Vgs = 0.9; Vds = 0.8; Vov = Vgs - Vth; // Vov = 0.5V
    $display("Vgs=%3.1fV, Vds=%3.1fV -> %s (Vds >= Vov)", Vgs, Vds, (Vds >= Vov) ? "DOYUM (Saturation - Sabit Akım Kaynağı)" : "Triyot");
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== MOSFET Çalışma Bölgesi Belirleme (Vth = 0.4V) ===",
        "Vgs=0.2V, Vds=0.8V -> KESİM (Cutoff - Akım Yok)",
        "Vgs=0.9V, Vds=0.2V -> TRİYOT (Lineer - Direnç gibi) (Vds < Vov)",
        "Vgs=0.9V, Vds=0.8V -> DOYUM (Saturation - Sabit Akım Kaynağı) (Vds >= Vov)",
      ],
    },
    quiz: {
      question: "Doyum (Saturation) bölgesinde Drain ucunda kanal kalınlığının sıfıra inmesi olayına ne denir?",
      options: [
        "A) Kırılma (Breakdown)",
        "B) Kanal sıkışması (Pinch-off)",
        "C) Erime",
        "D) Doping",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! $V_{DS} \\ge V_{GS} - V_{th}$ olduğunda Drain tarafındaki yerel Gate-Kanal voltajı $V_{th}$ seviyesine iner ve kanal ucu sıkışır (Pinch-off).",
    },
  },

  // ========================================================
  // BÖLÜM 3: NMOS VS PMOS
  // ========================================================
  "df-nmos-vs-pmos": {
    id: "df-nmos-vs-pmos",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "9 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "NMOS ve PMOS Karşılaştırması: Elektron vs Delik Hızı",
    subtitle:
      "Elektron ve delik mobilitesi farkı, W_p / W_n kapı boyutlandırma oranı ve N-Well / P-Well yapıları.",
    sections: [
      {
        title: "1. NMOS ve PMOS Fiziksel Mimarisi",
        content: `| Parametre | NMOS Transistör | PMOS Transistör |
| :--- | :--- | :--- |
| **Gövde (Substrate/Well)** | P-Tipi Silikon Gövde | N-Well (N-Kuyusu) |
| **Source / Drain Katkısı** | N+ (Fosfor/Arsenik zengin) | P+ (Bor zengin) |
| **Kanal Taşıyıcıları** | Serbest Elektronlar | Pozitif Delikler |
| **Açılma Şartı** | $V_{GS} > +V_{thn}$ (Yüksek Gate voltajı) | $V_{GS} < -|V_{thp}|$ (Düşük Gate voltajı) |
| **En İyi İlettiği Seviye** | **Güçlü '0' (GND)**, zayıf '1' | **Güçlü '1' ($V_{DD}$)**, zayıf '0' |`,
      },
      {
        title: "2. Neden NMOS PMOS'tan ~2.5 Kat Daha Hızlıdır?",
        content: `Elektronlar silikon kristal örgüsünde serbestçe akar (mobilite $\\mu_n \\approx 1400\\text{ cm}^2/\\text{V}\\cdot\\text{s}$).

Delikler ise elektronların kovalent bağlar arasında adım adım yer değiştirmesiyle ilerler; bu yüzden mobiliteleri çok daha düşüktür ($\\mu_p \\approx 450\\text{ cm}^2/\\text{V}\\cdot\\text{s}$).

Elektronlar deliklerden yaklaşık **2 ila 3 kat daha hızlıdır** ($\mu_n / \mu_p \approx 2.5$).

Bu nedenle bir CMOS kapısında yükselme süresi ($t_{rise}$) ile düşme süresini ($t_{fall}$) eşitlemek için PMOS transistörün kanal genişliği ($W_p$), NMOS'tan 2 - 2.5 kat daha geniş üretilir:
$$W_p \\approx 2.5 \\times W_n$$`,
      },
    ],
    playground: {
      title: "Simetrik CMOS Kapı Boyutlandırma Oranı Simülasyonu",
      filename: "tb_sizing_ratio.v",
      language: "verilog",
      initialCode: `module tb_sizing;
  real mu_n, mu_p;
  real W_n, W_p;
  real R_n, R_p;

  initial begin
    mu_n = 1200.0; // cm^2/Vs
    mu_p = 480.0;  // cm^2/Vs
    W_n = 100.0;   // nm

    // Eşit direnç (Rn = Rp) için Wp ne olmalı?
    // Rn ~ 1 / (mu_n * Wn), Rp ~ 1 / (mu_p * Wp)
    W_p = W_n * (mu_n / mu_p);

    $display("=== Simetrik CMOS Boyutlandırma Analizi ===");
    $display("Elektron Mobilitesi mu_n: %4.0f cm^2/Vs", mu_n);
    $display("Delik Mobilitesi mu_p   : %4.0f cm^2/Vs", mu_p);
    $display("Mobilite Oranı (mu_n/mu_p): %4.2f kat", mu_n / mu_p);
    $display("NMOS Genişliği W_n      : %4.0f nm", W_n);
    $display("Gerekli PMOS Genişliği W_p: %4.0f nm (Simetrik Yükselme/Düşme Süresi için)", W_p);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Simetrik CMOS Boyutlandırma Analizi ===",
        "Elektron Mobilitesi mu_n: 1200 cm^2/Vs",
        "Delik Mobilitesi mu_p   :  480 cm^2/Vs",
        "Mobilite Oranı (mu_n/mu_p): 2.50 kat",
        "NMOS Genişliği W_n      :  100 nm",
        "Gerekli PMOS Genişliği W_p:  250 nm (Simetrik Yükselme/Düşme Süresi için)",
      ],
    },
    quiz: {
      question: "CMOS devrelerinde PMOS transistörlerin kanal genişliğinin (Wp) NMOS'tan (Wn) daha büyük seçilmesinin sebebi nedir?",
      options: [
        "A) PMOS transistörlerin rengini ayırt etmek için",
        "B) Deliklerin elektronlara göre daha yavaş (düşük mobilite) olması yüzünden sürüş akımlarını dengelemek",
        "C) PMOS'un daha ucuz olması",
        "D) Sadece saat devrelerinde kullanılması",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Delik mobilitesi elektron mobilitesinden ~2.5 kat düşük olduğundan, simetrik anahtarlama ve eşit gecikme sağlamak için PMOS transistörler daha geniş ($W_p \\approx 2.5 W_n$) yapılır.",
    },
  },

  // ========================================================
  // BÖLÜM 3: SUBTHRESHOLD LEAKAGE & SHORT CHANNEL EFFECTS
  // ========================================================
  "df-leakage-short-channel": {
    id: "df-leakage-short-channel",
    badge: "Bölüm 3 • MOSFET",
    readingTime: "11 dk okuma",
    level: "İleri Seviye",
    title: "Kısa Kanal Etkileri (SCE) ve Eşikaltı Kaçak Akımları",
    subtitle:
      "DIBL (Drain-Induced Barrier Lowering), hız doyumu, alt-eşik salınımı (subthreshold swing) ve FinFET/GAA mimarileri.",
    sections: [
      {
        title: "1. Nanometre Ölçeğinde Ne Bozulur?",
        content: `Kanal uzunluğu ($L$) onlarca nanometrenin altına indiğinde, Gate elektrodu kanal üzerindeki elektrostatik kontrolünü kaybetmeye başlar. Drain voltajı doğrudan kanal bariyerini etkiler:
1. **DIBL (Drain-Induced Barrier Lowering):** Yüksek Drain voltajı Source-Kanal potansiyel bariyerini aşağı çeker; Gate sıfırken bile transistörün eşik gerilimi düşer ve akım sızar!
2. **Hız Doyumu (Velocity Saturation):** Çok yüksek elektrik alan altında elektronlar sonsuza kadar hızlanamaz; optik fonon saçılması nedeniyle silikonda doygunluk hızına ($v_{sat} \\approx 10^7\\text{ cm/s}$) ulaşırlar. Akım artık $V_{GS}^2$ ile değil lineer ($V_{GS}$) artar.
3. **Eşikaltı Sızıntısı (Subthreshold Leakage):** $V_{GS} < V_{th}$ iken akım tam sıfır olmaz; difüzyon nedeniyle üssel bir sızıntı akar:
   $$I_{sub} \\propto 10^{\\frac{V_{GS} - V_{th}}{S}}$$
   Burada $S$ (Subthreshold Swing) tipik olarak $60 - 90\\text{ mV/decade}$'dir.`,
      },
      {
        title: "2. Çözüm: 3D FinFET ve GAAFET (Gate-All-Around) Devrimi",
        content: `Geleneksel düzlemsel (planar) transistörlerde Gate sadece kanalın üst yüzeyindeydi. Kaçak akımları önlemek için çip endüstrisi 3D mimarilere geçti:
- **FinFET (Intel 22nm, TSMC 16nm-3nm):** Silikon kanal ince bir yüzgeç (fin) gibi dikey yükseltilir. Gate yüzgeci 3 taraftan sarar.
- **GAAFET / Nanosheet (Samsung 3nm, TSMC 2nm, Intel 20A):** Kanal yatay nanoyapraklar (nanosheets) haline getirilir. Gate kanalı **4 taraftan tamamen çevreler**. Bu sayede kısa kanal kaçak akımları neredeyse tamamen hapsedilir.`,
      },
    ],
    playground: {
      title: "Milyarlarca Transistörlü Mobil SoC Kaçak Güç Analizi",
      filename: "tb_leakage.v",
      language: "verilog",
      initialCode: `module tb_leakage;
  integer transistor_milyar;
  real transistor_basi_kacak_nA;
  real vdd_volt;
  real toplam_kacak_amper;
  real statik_guc_watt;

  initial begin
    transistor_milyar = 16;       // 16 Milyar Transistör
    transistor_basi_kacak_nA = 0.5; // Transistör başına 0.5 nA kaçak
    vdd_volt = 0.8;               // 0.8V Besleme

    // Toplam Kaçak = 16e9 * 0.5e-9 A = 8.0 Amper!
    toplam_kacak_amper = transistor_milyar * transistor_basi_kacak_nA;
    statik_guc_watt = toplam_kacak_amper * vdd_volt;

    $display("=== Mobil Çip Statik Kaçak Güç Analizi ===");
    $display("Transistör Sayısı   : %d Milyar", transistor_milyar);
    $display("Transistör Başı Kaçak: %3.1f nA", transistor_basi_kacak_nA);
    $display("Toplam Kaçak Akımı  : %4.2f Amper (Telefon beklemedeyken!)", toplam_kacak_amper);
    $display("Statik Güç Tüketimi : %4.2f Watt (Isıya dönüşen kayıp)", statik_guc_watt);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Mobil Çip Statik Kaçak Güç Analizi ===",
        "Transistör Sayısı   : 16 Milyar",
        "Transistör Başı Kaçak: 0.5 nA",
        "Toplam Kaçak Akımı  : 8.00 Amper (Telefon beklemedeyken!)",
        "Statik Güç Tüketimi : 6.40 Watt (Isıya dönüşen kayıp)",
      ],
    },
    quiz: {
      question: "Planar transistörler yerine 3D FinFET ve GAAFET mimarilerine geçilmesinin temel mühendislik sebebi nedir?",
      options: [
        "A) Çiplerin daha büyük ve ağır olması için",
        "B) Gate elektrodunun kanalı 3 veya 4 taraftan sararak elektrostatik kontrolü artırması ve kısa kanal sızıntılarını engellemesi",
        "C) Daha ucuz plastik kullanabilmek için",
        "D) Sadece ses devrelerinde kullanılabilmesi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! FinFET ve GAAFET mimarileri Gate elektrodunun kanalı çok yönden sarmasını sağlayarak Drain'in bariyeri delmesini (DIBL) engeller ve eşikaltı kaçak akımını radikal biçimde düşürür.",
    },
  },
};
