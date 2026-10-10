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
  // ========================================================
  // BÖLÜM 2: YARI İLETKEN FİZİĞİ VE SİLİKON (CONDUCTORS, INSULATORS & SEMICONDUCTORS)
  // ========================================================
  "df-semiconductors": {
    id: "df-semiconductors",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "14 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İletkenler, Yalıtkanlar ve Yarı İletkenler (Conductors, Insulators & Semiconductors)",
    subtitle:
      "Bant teorisi, valans ve iletim bantları, enerji aralığı (bandgap), silikon kristal kafesi ve serbest elektron-delik çifti oluşumu.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bu derste mikroçiplerin temel fiziksel yapıtaşını oluşturan katı hal elektroniğinin temellerini öğreneceksiniz:
- Malzemelerin elektrik iletme yeteneklerine göre neden 3 ana gruba ayrıldığı (İletken, Yalıtkan, Yarı İletken).
- Valans bandı (Valence Band), İletim bandı (Conduction Band) ve Yasak Enerji Aralığı ($E_g$) kavramları.
- Silikon (Si) atomunun kovalent bağ yapısı ve elmas kübik kristal kafes düzeni.
- Termal enerjiyle kovalent bağların kopması ve elektron-delik çifti (electron-hole pair) oluşumu.
- Saf (intrinzik) silikonun neden tek başına bir mikroişlemci yapmaya yetmediği.`,
      },
      {
        title: "2. Enerji Bantları: Elektronlar Neden ve Nasıl Hareket Eder?",
        content: `![Silisyum Kristal Kafesi ve Kovalent Bağlar](/images/digital/1.1-silicon-lattice-intrinsic.svg)

Tek bir izole atomda elektronlar Bohr modeline göre belirli ayrık enerji seviyelerinde döner. Ancak katı bir kristalde trilyonlarca atom bir araya geldiğinde Pauli dışlama ilkesi gereği atomik orbitaller üst üste binerek sürekli enerji bantlarını oluşturur:

- **Valans Bandı (Valence Band):** Atom çekirdeğine bağlı olan ve kovalent bağları oluşturan elektronların bulunduğu en yüksek dolu enerji bandıdır. Buradaki elektronlar kristal boyunca serbestçe gezemez.
- **İletim Bandı (Conduction Band):** Çekirdeğin bağından kurtulmuş, kristal kafesi içinde elektrik alan etkisiyle serbestçe akabilen hareketli elektronların bulunduğu enerji bandıdır.
- **Yasak Enerji Aralığı (Bandgap - $E_g$):** Valans bandının tavanı ($E_v$) ile iletim bandının tabanı ($E_c$) arasındaki boşluktur ($E_g = E_c - E_v$). Elektronların kuantum mekaniği kurallarına göre bu boşlukta bulunması kesinlikle yasaktır; akım oluşabilmesi için elektronun bu enerji engelini aşması şarttır.`,
      },
      {
        title: "3. Üç Malzeme Sınıfının Karşılaştırmalı Analizi",
        content: `Doğadaki katı cisimler enerji aralığına ($E_g$) göre sınıflandırılır:

| Malzeme Türü | Enerji Aralığı ($E_g$) | Tipik Malzemeler | Oda Sıcaklığında Davranış | Mikroçipteki Kullanım Alanı |
| :--- | :---: | :--- | :--- | :--- |
| **İletkenler (Conductors)** | $\\approx 0\\text{ eV}$ (Bantlar çakışık) | Bakır (Cu), Alüminyum (Al), Altın (Au), Gümüş (Ag) | Valans ve iletim bantları iç içe geçmiştir. Trilyonlarca serbest elektron hazır bekler; mikrovolt düzeyinde bile devasa akım akar. | Metal katmanları, ara bağlantı telleri (Interconnects), güç hatları (Power Rails). |
| **Yalıtkanlar (Insulators)** | $> 5 - 9\\text{ eV}$ (Devasa aralık) | Silikon Dioksit ($SiO_2$), Silikon Nitrit ($Si_3N_4$), Cam, Elmas | Kovalent bağlar o kadar güçlüdür ki termal enerji elektronları iletim bandına sıçratamaz. İletkenlik sıfıra yakındır. | Transistör kapı oksidi (Gate Dielectric), metal hatlar arası yalıtım (Inter-layer Dielectric). |
| **Yarı İletkenler (Semiconductors)** | $0.6 - 1.5\\text{ eV}$ (Orta aralık) | Silikon (Si: $1.12\\text{ eV}$), Germanyum (Ge: $0.66\\text{ eV}$), Galyum Arsenür (GaAs: $1.42\\text{ eV}$) | Ne tam iletkendir ne de tam yalıtkan. Oda sıcaklığında az sayıda elektron sıçrar; ancak katkılama veya voltajla iletkenliği **trilyon kat** kontrol edilebilir! | Transistörlerin kaynak (Source), savak (Drain) ve kanalları (Channel). |`,
      },
      {
        title: "4. Silikon (Si) Kristal Yapısı ve Kovalent Bağlar",
        content: `Periyodik tablonun IV. grubunda yer alan **Silikon (Atom Numarası: 14)**, en dış yörüngesinde 4 valans elektronuna sahiptir ($3s^2 3p^2$). Kararlı bir soy gaz (Neon/Argon) konfigürasyonuna (8 elektron) ulaşmak için her silikon atomu, etrafındaki komşu 4 silikon atomu ile birer elektronunu ortaklaşa kullanarak **kovalent bağ** kurar.

Bu yapı üç boyutta **Elmas Kübik (Diamond Cubic)** kristal kafesini oluşturur:
- **$0\\text{ K}$ (Mutlak Sıfır):** Hiçbir termal enerji yoktur ($kT = 0$). Bütün elektronlar kovalent bağların içine hapsolmuştur. İletim bandı bomboştur. Saf silikon **mükemmel bir yalıtkandır**.
- **$300\\text{ K}$ (Oda Sıcaklığı - $\\approx 27^\\circ\\text{C}$):** Termal titreşim enerjisi ($kT \\approx 25.9\\text{ meV}$) nedeniyle kristaldeki kovalent bağların küçük bir kısmı rastgele kopar. Bağdan kurtulan elektron iletim bandına fırlar ve serbest kalır.`,
      },
      {
        title: "5. Elektronlar ve Delikler (Electron-Hole Pairs)",
        content: `Bir elektron kovalent bağı terk edip serbest kaldığında, geride kovalent bağda doldurulmamış bir boşluk bırakır. Katı hal fiziğinde bu boşluğa **Delik (Hole)** adı verilir.

- **Delik Nasıl Hareket Eder?** Komşu bir kovalent bağdaki elektron bu boşluğu doldurmak için sıçradığında, delik zıt yönde hareket etmiş olur. Bu nedenle delik, kütlesi ve pozitif elektrik yükü ($+q = +1.6 \\times 10^{-19}\\text{ C}$) olan bağımsız bir parçacık gibi davranır.
- Saf (katkısız / intrinzik) silikonda her serbest elektron mutlaka geride bir delik bıraktığı için elektron yoğunluğu ($n$) daima delik yoğunluğuna ($p$) eşittir:
$$n = p = n_i$$
- **İntrinzik Taşıyıcı Yoğunluğu ($n_i$):**
$$n_i(T) = B \\cdot T^{3/2} \\exp\\left(-\\frac{E_g}{2kT}\\right)$$
Oda sıcaklığında ($300\\text{ K}$) silikon için $n_i \\approx 1.5 \\times 10^{10}\\text{ cm}^{-3}$'tür. Bir santimetreküp silikonda yaklaşık $5 \\times 10^{22}$ silikon atomu bulunduğu düşünülürse, kabaca **her 3.3 trilyon silikon atomundan sadece 1 tanesi** serbest elektron üretir!`,
      },
      {
        title: "6. Endüstri Gerçeği: Saf Silikon Neden Çip Yapmak İçin Yetersizdir?",
        content: `Saf silikonun iki temel sorunu vardır:
1. **Yetersiz Akım:** $10^{10}\\text{ cm}^{-3}$ taşıyıcı yoğunluğu bir transistörden mikroamperler veya miliamperler düzeyinde akım geçirmek için fazlasıyla azdır; direnci devasa boyutlardadır.
2. **Kontrol Edilemezlik:** Taşıyıcı sayısı tamamen ortam sıcaklığına ($T$) bağlıdır. Sıcaklık $27^\\circ\\text{C}$'den $125^\\circ\\text{C}$'ye çıktığında taşıyıcı sayısı binlerce kat artar ve devre kontrolden çıkar.

Mühendislerin transistör yapabilmesi için taşıyıcı yoğunluğunu sıcaklıktan bağımsız olarak milyarlarca kat artırabilmesi ve hangi taşıyıcının (elektron mu delik mi) baskın olacağını seçebilmesi gerekir. İşte bu mucizevi işlem bir sonraki dersimizde göreceğimiz **Katkılama (Doping)** işlemidir!`,
      },
      {
        title: "7. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Deliğin gerçek bir fiziksel atom veya pozitron olduğunu sanmak.**
  *Doğrusu:* Delik bağımsız bir parçacık değil; kovalent bağlar arasında elektronun eksikliğinden kaynaklanan boşluğun kolektif kuantum hareketidir. Ancak hesaplamalarda pozitif yüklü sanal bir parçacık olarak ele alınması matematiği mükemmel şekilde basitleştirir.
- **Hata #2: İletkenlerin elektrik akımını depoladığını düşünmek.**
  *Doğrusu:* Bir iletkene akım girdiğinde aynı anda diğer ucundan elektronlar çıkar. İletken bir boru gibidir; içi zaten elektronla doludur, gerilim sadece onları iter.
- **Hata #3: Silikonun oda sıcaklığında metal gibi iletken olduğunu varsaymak.**
  *Doğrusu:* Saf silikon oda sıcaklığında neredeyse bir cam (yalıtkan) kadar zayıf iletkendir. İletken hale gelmesi kontrollü kimyasal safsızlıklar eklenerek sağlanır.`,
      },
      {
        title: "8. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir yarı iletkenin sıcaklığı arttığında direnci neden metallerin aksine azalır?**
*Cevap:* Metallerde sıcaklık arttıkça kafes titreşimleri (fononlar) serbest elektronları saçar ve direnç artar. Yarı iletkenlerde ise sıcaklık arttıkça enerji aralığını ($E_g$) aşan serbest elektron-delik çifti sayısı üstel olarak ($e^{-E_g/2kT}$) artar; bu yeni taşıyıcı patlaması direnci hızla düşürür (Negatif Sıcaklık Katsayısı - NTC).

**S2: Silikon ($E_g = 1.12\\text{ eV}$) yerine Elmas ($E_g = 5.5\\text{ eV}$) kullanılabilir mi?**
*Cevap:* Elmasın $5.5\\text{ eV}$'lik devasa enerji aralığı, oda sıcaklığında hiçbir elektronun iletim bandına geçememesine neden olur. Bu nedenle elmas mükemmel bir yalıtkandır; transistör yapmak için aşırı yüksek voltajlar veya sıcaklıklar gerektirir.`,
      },
      {
        title: "9. Özet ve Temel Çıkarımlar",
        content: `- Elektrik akımı, iletim bandındaki serbest elektronlar ve valans bandındaki delikler tarafından taşınır.
- İletkenlerde enerji aralığı sıfırdır, yalıtkanlarda $5\\text{ eV}$'den büyüktür, yarı iletkenlerde ise yaklaşık $1.1\\text{ eV}$ seviyesindedir.
- Silikon 4 valans elektronlu elmas kübik kafes yapısına sahiptir.
- Termal enerji kovalent bağları kopararak elektron-delik çiftleri ($n = p = n_i$) üretir.
- Saf silikon ($n_i \\approx 1.5 \\times 10^{10}\\text{ cm}^{-3}$) tek başına transistör üretmek için yetersizdir; kontrollü katkılama şarttır.`,
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
    readingTime: "16 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Katkılama Nedir? N-Tipi ve P-Tipi Yarı İletkenler (What is Doping?)",
    subtitle:
      "Fosfor ve Bor katkılama, donör ve akseptör atomlar, çoğunluk/azınlık taşıyıcıları, kütle etkisi kanunu ve çoklu eşik gerilimi (Multi-Vt) kütüphaneleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `**Katkılama (Doping)**, saf silikon kristaline kontrollü miktarda yabancı atom ekleyerek serbest yük taşıyıcılarının türünü ve sayısını belirleme işlemidir:
- Saf silikonun neden devre tasarlamak için yetersiz kaldığı ve katkılamanın bunu nasıl çözdüğü.
- Fosfor (P) veya Arsenik (As) ile **N-Tipi**, Bor (B) ile **P-Tipi** silikonun nasıl üretildiği.
- Donör (Donor) ve Akseptör (Acceptor) enerji seviyeleri (~0.045 eV).
- Kütle Etkisi Kanunu ($n \\cdot p = n_i^2$) ve çoğunluk/azınlık taşıyıcı dengesi.
- Çip üretiminde katkılama yoğunluğu seviyeleri (Well, Channel, Source/Drain $10^{15} - 10^{20}\\text{ cm}^{-3}$).
- Modern CMOS standart hücre kütüphanelerinde çoklu eşik gerilimli (HVT, SVT, LVT, ULVT) hücrelerin doping ile nasıl oluşturulduğu.`,
      },
      {
        title: "2. N-Tipi Katkılama: Fazladan Elektron Eklemek",
        content: `![Yarıiletken Katkılama: N-Tipi vs P-Tipi](/images/digital/1.2-doping-n-type-p-type.svg)

Silikon 4 valans elektronuna sahiptir. Periyodik tablonun V. grubunda yer alan **Fosfor (P)** veya **Arsenik (As)** ise 5 valans elektronuna sahiptir.

Silikon kristalindeki bir Si atomunun yerine bir Fosfor atomu girdiğinde:
1. Fosforun 4 elektronu komşu 4 silikon atomu ile kovalent bağ kurar.
2. **Beşinci elektron** bağlanacak bir bağ bulamaz ve açıkta kalır!
3. Bu beşinci elektron çekirdeğe çok zayıf bir elektrostatik kuvvetle bağlıdır; serbest kalması için yalnızca **$\\approx 0.045\\text{ eV}$** enerji gerekir (saf silikondaki $1.12\\text{ eV}$ ile kıyaslayın!).
4. Oda sıcaklığındaki termal enerji ($kT \\approx 0.026\\text{ eV}$) bu elektronların neredeyse tamamını anında serbest bırakır.

Fosfor atomu kristale serbest bir elektron bağışladığı için **Donör (Verici - $N_D$)** olarak adlandırılır. Serbest kalan elektron negatif yüklü olduğu için bu malzemeye **N-Tipi Silikon** denir. Geride kalan fosfor çekirdeği ise kristal kafesine kilitli **pozitif bir iyon ($P^+$)** haline gelir.`,
      },
      {
        title: "3. P-Tipi Katkılama: Delik (Hole) Yaratmak",
        content: `Periyodik tablonun III. grubunda yer alan **Bor (B)** atomu ise yalnızca 3 valans elektronuna sahiptir.

Silikon kafesine bir Bor atomu yerleştiğinde:
1. Bor'un 3 elektronu 3 komşu silikon ile bağ kurar.
2. Dördüncü komşu silikon atomuyla olan bağda **bir elektron eksik kalır** (bir delik oluşur!).
3. Komşu bir silikon kovalent bağındaki elektron, yalnızca **$\\approx 0.045\\text{ eV}$** gibi çok küçük bir enerji harcayarak bu boşluğu doldurabilir.
4. Elektron bu boşluğa geçtiğinde, Bor atomu negatif yüklü hareketsiz bir iyon ($B^-$) olur ve kristal kafesinde serbestçe dolaşabilen pozitif yüklü bir **delik (hole)** açılır!

Bor atomu dışarıdan bir elektron kabul ettiği için **Akseptör (Alıcı - $N_A$)** olarak adlandırılır. Pozitif taşıyıcılar baskın olduğu için bu malzemeye **P-Tipi Silikon** denir.`,
      },
      {
        title: "4. Kütle Etkisi Kanunu (Mass-Action Law)",
        content: `Termal dengedeki herhangi bir yarı iletkende, katkılama miktarı ne olursa olsun serbest elektron yoğunluğu ($n$) ile delik yoğunluğunun ($p$) çarpımı sabittir ve sıcaklığa bağlıdır:

$$n \\cdot p = n_i^2$$

- **N-Tipi Silikonda ($N_D \\gg n_i$):**
  - Çoğunluk taşıyıcısı elektronlardır: $n \\approx N_D$
  - Azınlık taşıyıcısı deliklerdir: $p = \\frac{n_i^2}{N_D}$
  *Örnek:* $N_D = 10^{16}\\text{ cm}^{-3}$ katkılarsak; $n = 10^{16}\\text{ cm}^{-3}$ olurken delik sayısı $p = \\frac{(1.5 \\times 10^{10})^2}{10^{16}} = 2.25 \\times 10^4\\text{ cm}^{-3}$ seviyesine çöker!
- **P-Tipi Silikonda ($N_A \\gg n_i$):**
  - Çoğunluk taşıyıcısı deliklerdir: $p \\approx N_A$
  - Azınlık taşıyıcısı elektronlardır: $n = \\frac{n_i^2}{N_A}$`,
      },
      {
        title: "5. Elektron ve Delik Hareketliliği (Mobility): Eşit Değiller!",
        content: `Elektronlar ve delikler silikon içinde aynı hızda hareket etmezler:

- **Elektron Hareketliliği (Mobility - $\\mu_n$):** $\\approx 1350 - 1400\\text{ cm}^2 / (\\text{V} \\cdot \\text{s})$
- **Delik Hareketliliği (Mobility - $\\mu_p$):** $\\approx 450 - 500\\text{ cm}^2 / (\\text{V} \\cdot \\text{s})$

Elektronlar iletim bandındaki boş uzayda hareket ederken, delikler kovalent bağlar arasında elektronların ardışık el değiştirmesiyle ilerler. Bu nedenle **elektronlar deliklerden yaklaşık 2.5 - 3 kat daha hızlıdır!**

**Devasa VLSI Sonucu:**
CMOS kapılarında PMOS transistörler akımı deliklerle, NMOS transistörler ise elektronlarla taşır. Bir PMOS transistörün bir NMOS transistör kadar güçlü akım çekebilmesi ve simetrik yükselme/düşme zamanları ($t_{rise} \\approx t_{fall}$) sağlayabilmesi için **PMOS kanal genişliği ($W$) daima NMOS kanal genişliğinin 2 ila 3 katı ($W_p \\approx 2-3 \\cdot W_n$) tasarlanır!**`,
      },
      {
        title: "6. Bir CMOS Çipinde Katkılama Yoğunlukları ve Multi-Vt Kütüphaneleri",
        content: `Gerçek bir entegre devrede silikonun her yerine aynı oranda katkılama yapılmaz:

| Bölge | Katkılama Türü & Seviyesi | Taşıyıcı Yoğunluğu | İşlev |
| :--- | :--- | :---: | :--- |
| **Kuyu (N-Well / P-Well)** | Hafif ($N_D$ veya $N_A$) | $10^{15} - 10^{17}\\text{ cm}^{-3}$ | Transistörlerin gövdesini (Body/Substrate) oluşturur. |
| **Kanal (Channel Implant)** | Hassas Kontrollü | $10^{17} - 10^{18}\\text{ cm}^{-3}$ | Eşik gerilimini ($V_t$) ayarlamak için iyon implantasyonu. |
| **Kaynak / Savak ($N^+ / P^+$)** | Çok Ağır (Heavy Doping) | $10^{20}\\text{ cm}^{-3}$ ($N^+$ / $P^+$) | Neredeyse metalik iletkenlik sağlayarak parazitik direnci sıfıra yaklaştırır. |

**Multi-Threshold (Multi-Vt) Hücre Kütüphaneleri:**
Modern ASIC sentezinde EDA araçları zamanlama ve güç optimizasyonu için farklı katkılama seviyelerine sahip standart hücreler seçer:
- **LVT / ULVT (Low / Ultra-Low Vt):** Kanal daha hafif katkılanır $\\rightarrow V_t$ düşüktür $\\rightarrow$ Transistör süper hızlı açılır ama devasa statik kaçak akım (leakage) tüketir (Kritik zamanlama yollarında kullanılır).
- **HVT (High Vt):** Kanala daha yoğun katkılama yapılır $\\rightarrow V_t$ yüksektir $\\rightarrow$ Transistör daha yavaş açılır ama kaçak akımı 50 kat daha azdır (Zamanlama açısından acelesi olmayan yollarda pil ömrü korumak için kullanılır).`,
      },
      {
        title: "7. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: N-tipi silikonun negatif, P-tipi silikonun pozitif elektrik yüküne sahip olduğunu sanmak.**
  *Doğrusu:* Hem N-tipi hem de P-tipi silikon elektriksel olarak **tamamen NÖTRDÜR!** Her donör atomunun serbest bıraktığı negatif elektronun karşılığında çekirdeğinde pozitif bir protonu vardır. Kristal dışarıdan net bir yüke sahip değildir.
- **Hata #2: Katkılama maddelerinin silikon kristalini bozduğunu düşünmek.**
  *Doğrusu:* Katkılama oranları atom başına $10^{-6}$ ile $10^{-3}$ düzeyindedir. Yani her milyon silikon atomundan sadece 1 tanesi bor veya fosfordur; kristal kafes düzeni bozulmadan korunur.
- **Hata #3: Kütle etkisi kanununu ($n \\cdot p = n_i^2$) unutmak.**
  *Doğrusu:* N-tipi katkılama yapıldığında sadece elektron sayısı artmaz; delik sayısı da rekombinasyon nedeniyle dramatik şekilde azalır.`,
      },
      {
        title: "8. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Silikona fosfor eklediğimizde neden N-tipi malzeme elde ederiz?**
*Cevap:* Fosforun 5 valans elektronu vardır; 4'ü silikonla bağ kurar, 5. elektron serbest kalarak negatif yük taşıyıcısı olur.

**S2: Bir çip tasarımcısı kritik yolda neden LVT hücreleri, kritik olmayan yolda HVT hücreleri kullanır?**
*Cevap:* LVT hücreleri düşük eşik voltajı sayesinde çok hızlı anahtarlar ve gecikmeyi (delay) minimuma indirir. HVT hücreleri ise yavaş fakat statik kaçak akımı çok düşüktür; çipin aşırı ısınmasını ve pil tüketmesini engeller.`,
      },
      {
        title: "9. Özet ve Temel Çıkarımlar",
        content: `- Katkılama, saf silikonun iletkenliğini trilyonlarca kat artırır.
- Grup V elementleri (Fosfor, Arsenik) Donör olup N-Tipi silikon oluşturur (Çoğunluk: Elektronlar).
- Grup III elementleri (Bor) Akseptör olup P-Tipi silikon oluşturur (Çoğunluk: Delikler).
- Kütle etkisi kanununa göre $n \\cdot p = n_i^2$ daima korunur.
- Elektron hareketliliği delik hareketliliğinden 2.5-3 kat fazladır; bu yüzden CMOS tasarımında PMOS genişliği NMOS'un 2-3 katı yapılır.
- Multi-Vt kütüphaneleri çipin hız ve güç tüketimi dengesini sağlamak için kanal katkılamasını kullanır.`,
      },
    ],
    playground: {
      title: "N-Tipi ve P-Tipi Taşıyıcı Yoğunluğu Hesabı",
      filename: "tb_doping.v",
      language: "verilog",
      initialCode: `// Katkılama Taşıyıcı Yoğunluğu ve Kütle Etkisi Kanunu (n * p = n_i^2)
module tb_doping;
  real ni, ni_kare;
  real Nd, n_majority, p_minority;
  real Na, p_majority, n_minority;

  initial begin
    ni = 1.5e10; // cm^-3 (300K Silikon)
    ni_kare = ni * ni; // 2.25e20

    $display("=== Yarı İletken Katkılama Taşıyıcı Konsantrasyonları ===");
    
    // 1. N-Tipi Fosfor Katkılama (Nd = 1e16 cm^-3)
    Nd = 1.0e16;
    n_majority = Nd;
    p_minority = ni_kare / Nd;
    $display("1. N-Tipi Silikon (Nd = 1.0e16 cm^-3):");
    $display("   - Çoğunluk Taşıyıcı (Elektron n) : %1.2e cm^-3", n_majority);
    $display("   - Azınlık Taşıyıcı  (Delik p)     : %1.2e cm^-3", p_minority);

    // 2. P-Tipi Bor Katkılama (Na = 5e17 cm^-3)
    Na = 5.0e17;
    p_majority = Na;
    n_minority = ni_kare / Na;
    $display("2. P-Tipi Silikon (Na = 5.0e17 cm^-3):");
    $display("   - Çoğunluk Taşıyıcı (Delik p)     : %1.2e cm^-3", p_majority);
    $display("   - Azınlık Taşıyıcı  (Elektron n) : %1.2e cm^-3", n_minority);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Yarı İletken Katkılama Taşıyıcı Konsantrasyonları ===",
        "1. N-Tipi Silikon (Nd = 1.0e16 cm^-3):",
        "   - Çoğunluk Taşıyıcı (Elektron n) : 1.00e+16 cm^-3",
        "   - Azınlık Taşıyıcı  (Delik p)     : 2.25e+04 cm^-3",
        "2. P-Tipi Silikon (Na = 5.0e17 cm^-3):",
        "   - Çoğunluk Taşıyıcı (Delik p)     : 5.00e+17 cm^-3",
        "   - Azınlık Taşıyıcı  (Elektron n) : 4.50e+02 cm^-3",
      ],
    },
    quiz: {
      question: "CMOS devrelerinde bir PMOS transistörün kanal genişliği (W) neden aynı akımı veren bir NMOS transistörden 2-3 kat daha büyük yapılır?",
      options: [
        "A) PMOS transistörlerin daha yüksek gerilimde çalışması gerektiği için",
        "B) Silikonda elektron hareketliliğinin (mobility) delik hareketliliğinden yaklaşık 2.5-3 kat daha yüksek olması nedeniyle",
        "C) PMOS transistörlerin üretim maliyetini düşürmek için",
        "D) Bor atomlarının fosfor atomlarından daha ağır olması sebebiyle",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Elektron hareketliliği (μn ≈ 1400) delik hareketliliğinden (μp ≈ 450) yaklaşık 3 kat daha fazladır. Akım taşıyıcı hızına bağlı olduğundan, PMOS'un NMOS ile aynı açma/kapama akımını verebilmesi için kanalı 2-3 kat daha geniş yapılmalıdır.",
    },
  },

  // ========================================================
  // BÖLÜM 2: THE PN JUNCTION (PN BİRLEŞİMİ)
  // ========================================================
  "df-pn-junction": {
    id: "df-pn-junction",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "16 dk okuma",
    level: "Orta Seviye",
    title: "P-N Birleşimi ve Diyot Davranışı (The PN Junction)",
    subtitle:
      "Tükenim bölgesi (Depletion Region), dahili elektrik alanı, ileri ve ters kutuplama, birleşim kapasitansı ve CMOS içindeki parazitik diyotlar.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `P-tipi ve N-tipi silikon tek bir monolitik kristal kafeste yan yana geldiğinde modern elektroniğin kalbi olan **P-N Birleşimi (P-N Junction)** doğar:
- P ve N bölgeleri temas ettiğinde difüzyon ve rekombinasyon ile **Tükenim Bölgesi (Depletion Region)** nasıl oluşur?
- Dahili Potansiyel ($V_{bi}$ - Built-in Potential) ve denge durumu nasıl kurulur?
- **İleri Kutuplama (Forward Bias):** Potansiyel engelinin aşılması ve üstel akım akışı.
- **Ters Kutuplama (Reverse Bias):** Tükenim bölgesinin genişlemesi ve pikoamper seviyesinde kaçak akım.
- Birleşim Kapasitansı ($C_j$) ve ters gerilime bağımlılığı.
- CMOS standart hücrelerinde transistör kaynak/savak (Source/Drain) bölgelerindeki parazitik P-N diyotları.`,
      },
      {
        title: "2. P ve N Bir Araya Geldiğinde Ne Olur? (Denge Durumu)",
        content: `![PN Jonksiyonu ve Tükenim Bölgesi](/images/digital/1.3-pn-junction-depletion.svg)

P bölgesinde trilyonlarca delik, N bölgesinde ise trilyonlarca serbest elektron vardır. Birleşme sınırında devasa bir konsantrasyon farkı oluşur:

1. **Difüzyon (Yayılma):** Elektronlar çok oldukları N bölgesinden P bölgesine doğru yayılır. Delikler ise P bölgesinden N bölgesine doğru yayılır.
2. **Rekombinasyon (Yeniden Birleşme):** Sınırı geçen elektronlar deliklerle karşılaşır ve kovalent bağlara oturarak her iki serbest taşıyıcı da birbirini nötrler (yok olur).
3. **Sabit İyonlar Kalır:**
   - N tarafındaki fosfor atomları elektronlarını kaybettiği için sınırda **pozitif sabit iyonlar ($P^+$)** kalır.
   - P tarafındaki bor atomları elektron kazandığı için sınırda **negatif sabit iyonlar ($B^-$)** kalır.
4. **Tükenim Bölgesi (Depletion Region):** Bu sınır hattında hiç serbest yük taşıyıcısı kalmaz; bölge taşıyıcılardan "tükenmiştir".
5. **Dahili Elektrik Alanı ($E_{bi}$) ve Sürüklenme (Drift):** Sabit pozitif iyonlardan negatif iyonlara doğru (N'den P'ye) güçlü bir elektrik alanı doğar. Bu alan, difüzyon akımını tam tersi yönde dengeleyen bir sürüklenme akımı oluşturur.

Termal dengede net akım sıfırdır ($I_{net} = I_{diff} - I_{drift} = 0$).`,
      },
      {
        title: "3. Dahili Potansiyel Engel (Built-in Potential - $V_{bi}$)",
        content: `Tükenim bölgesindeki elektrik alan, elektronların P tarafına geçmesini engelleyen bir potansiyel bariyer oluşturur:

$$V_{bi} = \\frac{kT}{q} \\ln\\left(\\frac{N_A \\cdot N_D}{n_i^2}\\right) = V_T \\ln\\left(\\frac{N_A \\cdot N_D}{n_i^2}\\right)$$

Burada:
- $V_T = \\frac{kT}{q} \\approx 25.9\\text{ mV}$ (Oda sıcaklığındaki termal voltaj)
- $N_A, N_D$: Katkılama yoğunlukları ($10^{16} - 10^{18}\\text{ cm}^{-3}$)
- $n_i$: İntrinzik taşıyıcı yoğunluğu ($1.5 \\times 10^{10}\\text{ cm}^{-3}$)

Oda sıcaklığında silikon bir P-N birleşimi için $V_{bi}$ tipik olarak **$0.6\\text{ V} - 0.75\\text{ V}$** arasındadır. Bir elektronun N tarafından P tarafına geçebilmesi için dışarıdan bu engeli aşacak bir enerji verilmelidir.`,
      },
      {
        title: "4. İleri Kutuplama vs Ters Kutuplama Karşılaştırması",
        content: `P-N birleşimine dışarıdan gerilim uygulandığında davranış tamamen asimetriktir:

| Durum | Harici Bağlantı | Tükenim Bölgesi Genişliği ($W$) | Potansiyel Engeli | Akım Davranışı |
| :--- | :--- | :---: | :---: | :--- |
| **Denge (Sıfır Bias)** | Gerilim yok ($V = 0$) | Doğal Denge Genişliği ($W_0$) | $V_{bi} \\approx 0.7\\text{ V}$ | Net akım sıfırdır ($I = 0$). |
| **İleri Kutuplama (Forward Bias)** | P ucuna $+$, N ucuna $-$ gerilim ($V_F > 0$) | Daralır ($W \\downarrow$) | Azalır ($V_{bi} - V_F$) | $V_F > 0.6-0.7\\text{ V}$ olduğunda bariyer çöker ve üstel olarak devasa akım akar ($I \\propto e^{V_F / V_T}$). |
| **Ters Kutuplama (Reverse Bias)** | P ucuna $-$, N ucuna $+$ gerilim ($V_R < 0$) | Genişler ($W \\uparrow$) | Artar ($V_{bi} + V_R$) | Akım tamamen kesilir; yalnızca pikoamper ($10^{-12}\\text{ A}$) düzeyinde küçük bir azınlık kaçak akımı ($I_0$) akar. |`,
      },
      {
        title: "5. Birleşim Kapasitansı ($C_j$): Çip Hızını Belirleyen Görünmez Yük",
        content: `Tükenim bölgesi içinde serbest taşıyıcı bulunmayan bir yalıtkan gibidir; iki yanında ise iletken P ve N bölgeleri yer alır. Bu yapı tam anlamıyla bir **Paralel Plakalı Kondansatördür!**

$$C_j = \\frac{\\varepsilon_{si} \\cdot A}{W_{dep}} = \\frac{C_{j0}}{\\sqrt{1 + \\frac{V_R}{V_{bi}}}}$$

- **Ters Gerilim Arttıkça ($V_R \\uparrow$):** Tükenim bölgesi ($W_{dep}$) genişler; plakalar birbirinden uzaklaştığı için birleşim kapasitansı ($C_j$) **azalır**.
- **Ters Gerilim Azaldıkça:** Kapasitans büyür.

**VLSI Önemi:**
Bir CMOS transistörün kaynak (Source) ve savak (Drain) bölgeleri alt tabaka (Substrate) ile P-N birleşimi oluşturur. Çip çalışırken bu bölgeler ters kutuplanır. İşte bu P-N birleşimlerinin parazitik kapasitansı ($C_j$), saat sinyali her vurduğunda şarj ve deşarj edilmek zorundadır; bu da hem **gecikmeye (propagation delay)** hem de **dinamik güç tüketimine ($P = C V^2 f$)** doğrudan neden olur!`,
      },
      {
        title: "6. CMOS İçinde P-N Birleşimleri Nerede Gizlidir?",
        content: `Bir CMOS entegre devresinde hiçbir zaman ayrık (discrete) iki bacaklı bir diyot görmezsiniz; ancak her transistör P-N birleşimleriyle doludur:

1. **NMOS Kaynak ve Savak:** P-Tipi alt tabaka (P-Substrate) içine açılmış iki adet ağır katkılı $N^+$ bölgesidir.
   - P-Substrate daima devrenin en düşük voltajına ($GND = 0\\text{ V}$) bağlanır.
   - Böylece $N^+$ kaynak ve savak ile P-Substrate arasındaki P-N birleşimleri daima **TERS KUTUPLANMIŞ** kalır! Bu sayede transistörler birbirinden elektriksel olarak izole edilir.
2. **PMOS Kaynak ve Savak:** N-Kuyu (N-Well) içine açılmış iki adet $P^+$ bölgesidir.
   - N-Well daima devrenin en yüksek voltajına ($V_{DD}$) bağlanır.
   - Bu sayede $P^+$ bölgeleri ile N-Well arasındaki P-N birleşimleri de daima **TERS KUTUPLANMIŞ** kalır.

Eğer bu kural çiğnenir ve bir P-N birleşimi ileri kutuplanırsa (örneğin aşırı gürültü veya ESD şoku ile), çipte **Latch-up** adı verilen ölümcül kısa devre felaketi yaşanır!`,
      },
      {
        title: "7. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Tükenim bölgesinin boşluk (vakum) olduğunu düşünmek.**
  *Doğrusu:* Tükenim bölgesi silikon atomları ve iyonize olmuş bor/fosfor atomlarıyla doludur; sadece hareketli serbest elektron ve deliklerden arınmıştır.
- **Hata #2: Bir P-N diyotunun ters kutuplamada sıfır akım geçirdiğini varsaymak.**
  *Doğrusu:* Termal olarak üretilen azınlık taşıyıcıları nedeniyle pikoamper düzeyinde bir ters doyma akımı ($I_S$) daima akar. Yüksek sıcaklıklarda bu akım mikroamperlere çıkarak çipte statik kaçak oluşturur.
- **Hata #3: Diyotun her iki yönde de aynı kapasitansa sahip olduğunu düşünmek.**
  *Doğrusu:* Birleşim kapasitansı uygulanan ters gerilime bağlı olarak dinamik olarak değişir.`,
      },
      {
        title: "8. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: P-N birleşiminde N tarafındaki serbest elektronlar neden P tarafına geçmeyi bir noktada durdurur?**
*Cevap:* Elektronlar geçtikçe sınırda sabit pozitif iyonlar kalır ve ters yönde güçlü bir elektrik alanı ($E_{bi}$) oluşturur. Bu alan difüzyonu durduracak kadar güçlendiğinde denge kurulur.

**S2: Bir CMOS devresinde P-Substrate neden daima GND'ye, N-Well neden daima VDD'ye bağlanır?**
*Cevap:* Transistörlerin kaynak ve savak P-N birleşimlerinin daima ters kutuplanmış kalmasını sağlamak ve silikon içindeki kaçak akımları ile Latch-up riskini önlemek için.`,
      },
      {
        title: "9. Özet ve Temel Çıkarımlar",
        content: `- P-N birleşimi sınırında serbest taşıyıcısı olmayan nötrlenmiş bir Tükenim Bölgesi ve $\\approx 0.7\\text{ V}$'luk dahili gerilim ($V_{bi}$) oluşur.
- İleri kutuplama ($V > 0.7\\text{ V}$) bariyeri düşürerek üstel akım akıtır.
- Ters kutuplama bariyeri yükselterek akımı keser; sadece minik bir kaçak akım bırakır.
- Tükenim bölgesi bir plaka kapasitörü gibi davranır ($C_j$); ters gerilim arttıkça kapasitans küçülür.
- CMOS entegre devrelerinde tüm transistör gövdeleri, parazitik P-N birleşimlerini ters kutuplu tutacak şekilde polarize edilir.`,
      },
    ],
    playground: {
      title: "P-N Diyot İleri ve Ters Kutuplama Akım Simülasyonu",
      filename: "tb_pn_junction.v",
      language: "verilog",
      initialCode: `// Shockley Diyot Denklemi Simülasyonu: I = Is * (exp(V / (n*Vt)) - 1)
module tb_pn_junction;
  real Is; // Ters doyma akımı (1 pA = 1e-12 A)
  real Vt; // Termal voltaj (26 mV = 0.026 V)
  real V_anot, I_diyot;

  initial begin
    Is = 1.0e-12; // 1 pA
    Vt = 0.026;   // 26 mV

    $display("=== P-N Birleşimi Shockley Akım-Gerilim Analizi ===");
    $display("Uygulanan Gerilim (V) | Durum            | Diyot Akımı");

    // 1. Ters Kutuplama (-2.0V)
    V_anot = -2.0;
    I_diyot = -Is;
    $display("     %5.2f V         | Ters Kutuplama   | %9.3e A (Kaçak Akım)", V_anot, I_diyot);

    // 2. Sıfır Bias (0.0V)
    V_anot = 0.0;
    I_diyot = 0.0;
    $display("      0.00 V         | Denge (Sıfır)    |  0.000 A");

    // 3. Eşik Altı İleri Kutuplama (+0.3V)
    V_anot = 0.3;
    I_diyot = Is * 1.02e5; // Yaklaşık üstel artış
    $display("     +0.30 V         | Eşik Altı İleri  | %9.3e A", V_anot, I_diyot);

    // 4. İletim Bölgesi (+0.7V)
    V_anot = 0.7;
    I_diyot = 5.0e-3; // 5 mA tipik iletim
    $display("     +0.70 V         | Tam İletim       | %9.3e A (5.0 mA)", V_anot, I_diyot);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== P-N Birleşimi Shockley Akım-Gerilim Analizi ===",
        "Uygulanan Gerilim (V) | Durum            | Diyot Akımı",
        "     -2.00 V         | Ters Kutuplama   | -1.000e-12 A (Kaçak Akım)",
        "      0.00 V         | Denge (Sıfır)    |  0.000 A",
        "     +0.30 V         | Eşik Altı İleri  | 1.020e-07 A",
        "     +0.70 V         | Tam İletim       | 5.000e-03 A (5.0 mA)",
      ],
    },
    quiz: {
      question: "P-N birleşimi ters kutuplandığında (P negatif, N pozitif) tükenim bölgesinde ne gerçekleşir?",
      options: [
        "A) Tükenim bölgesi tamamen yok olur ve devasa akım akar",
        "B) Tükenim bölgesi genişler, dahili potansiyel engeli artar ve akım pikoamper seviyesine düşer",
        "C) Delikler N bölgesine doğru hücum eder",
        "D) Birleşim kapasitansı sonsuza gider",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Ters kutuplamada dış gerilim dahili elektrik alanıyla aynı yönde etki ederek taşıyıcıları sınırdan daha da uzaklaştırır; tükenim bölgesi genişler ve akım sadece ihmal edilebilir azınlık kaçak akımından ibaret kalır.",
    },
  },

  // ========================================================
  // BÖLÜM 2: CARRIERS, CURRENT & TEMPERATURE
  // ========================================================
  "df-carriers-temperature": {
    id: "df-carriers-temperature",
    badge: "Bölüm 2 • Katı Hal Fiziği",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Taşıyıcılar, Akım Mekanizmaları ve Sıcaklık Etkisi (Carriers, Current & Temperature)",
    subtitle:
      "Sürüklenme (Drift) ve Yayılma (Diffusion) akımları, Einstein bağıntısı, fonon saçılması, termal kaçak (thermal runaway) ve sıcaklığa bağlı hız kaybı.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Yarı iletkenlerde akımın nasıl aktığını ve sıcaklığın bir çipi nasıl etkilediğini anlamak:
- İki temel akım iletim mekanizması: **Sürüklenme (Drift)** ve **Yayılma (Diffusion)**.
- Elektrik alan altında taşıyıcı hızı ve Doyma Hızı ($v_{sat}$).
- Einstein Bağıntısı ($D / \\mu = kT / q$).
- Sıcaklık artışının zıt iki etkisi: Taşıyıcı sayısının artması vs Hareketliliğin (Mobility) düşmesi.
- Çalışan sıcak bir işlemcinin neden soğuk bir işlemciden daha yavaş çalıştığı (Temperature Inversion istisnasıyla).
- **Termal Kaçak (Thermal Runaway)** tehlikesi ve çip güç bütçelemesi.`,
      },
      {
        title: "2. Akım Nasıl Akar? İki Temel Mekanizma",
        content: `![Taşıyıcı Yoğunluğu vs Sıcaklık ve Fermi Seviyesi](/images/digital/1.4-carrier-concentration-temp.svg)

Bir yarı iletkende akım iki farklı fiziksel kuvvetle taşınır:

1. **Sürüklenme Akımı (Drift Current):**
   - Kristale bir harici elektrik alanı ($E$) uygulandığında, yüklü parçacıklar bu alanın kuvvetiyle sürüklenir.
   - Elektronlar elektrik alanına zıt yönde, delikler ise alan yönünde hareket eder.
   - Düşük elektrik alanlarında sürüklenme hızı alanla orantılıdır: $v_d = \\mu \\cdot E$.
   - Toplam sürüklenme akım yoğunluğu:
   $$J_{drift} = q (n \\mu_n + p \\mu_p) E$$

2. **Yayılma Akımı (Diffusion Current):**
   - Elektrik alan olmasa bile, eğer taşıyıcılar bir bölgede yoğun diğer bölgede seyrekse, termal rastgele hareket sonucunda çok oldukları yerden az oldukları yere doğru yayılırlar (tıpkı bir bardak suya damlatılan mürekkep gibi!).
   - Yayılma akım yoğunluğu konsantrasyon gradyanı ile orantılıdır:
   $$J_{diff} = q D_n \\frac{dn}{dx} - q D_p \\frac{dp}{dx}$$
   (Burada $D_n$ ve $D_p$ difüzyon katsayılarıdır).`,
      },
      {
        title: "3. Einstein Bağıntısı (Einstein Relation)",
        content: `Sürüklenme ve yayılma tamamen bağımsız süreçler değildir; her ikisi de taşıyıcının kristal atomlarıyla yaptığı termal çarpışmalara dayanır. Albert Einstein (1905), bu iki katsayı arasındaki evrensel bağıntıyı kanıtlamıştır:

$$\\frac{D_n}{\\mu_n} = \\frac{D_p}{\\mu_p} = \\frac{kT}{q} = V_T$$

Oda sıcaklığında ($300\\text{ K}$) termal voltaj $V_T \\approx 25.9\\text{ mV}$'tur. Bu muazzam bağıntı sayesinde bir malzemenin elektron hareketliliğini ($\\mu$) bildiğiniz anda difüzyon hızını ($D$) doğrudan hesaplayabilirsiniz!`,
      },
      {
        title: "4. Sıcaklığın İki Zıt Etkisi: Bir Çip Isınınca Ne Olur?",
        content: `Bir mikroişlemci $25^\\circ\\text{C}$'den $105^\\circ\\text{C}$'ye ısındığında fizikte iki zıt olay aynı anda gerçekleşir:

1. **Etki #1: Kaçak Taşıyıcı Sayısı Patlar (Kötü Haber!):**
   - Termal enerji kovalent bağları daha çok koparır. İntrinzik taşıyıcı sayısı $n_i(T)$ üstel olarak fırlar.
   - P-N birleşimlerindeki azınlık kaçak akımları ve transistör alt-eşik kaçak akımları (subthreshold leakage) sıcaklıkla **üstel olarak katlanır!**
2. **Etki #2: Kafes Titreşimleri (Fononlar) Artar ve Hareketlilik Düşer (Yavaşlama!):**
   - Sıcaklık arttıkça silikon atomları kristal kafesinde çılgınca titreşmeye başlar (termal fononlar).
   - İletim bandında hızla ilerlemek isteyen elektronlar bu titreşen atomlara sürekli çarparak saçılır (Lattice Scattering).
   - Sonuç olarak taşıyıcı hareketliliği sıcaklıkla azalır: $\\mu(T) \\propto T^{-3/2}$.
   - Hareketlilik düştüğü için transistörün çekebileceği akım ($I_{on}$) düşer; kapıların gecikmesi artar ve **işlemci yavaşlar!**`,
      },
      {
        title: "5. Termal Kaçak (Thermal Runaway) Felaketi",
        content: `Modern nanometre çiplerde statik kaçak akım ile sıcaklık arasında ölümcül bir pozitif geri besleme (positive feedback loop) döngüsü vardır:

$$\\text{İşlemci Yük Altında Isınır} \\rightarrow \\text{Kaçak Akım Üstel Artar} \\rightarrow \\text{Güç Tüketimi Katlanır} \\rightarrow \\text{Daha Çok Isı Üretilir} \\rightarrow \\dots$$

Eğer soğutucu (heatsink / fan) bu ısıyı yeterince hızlı tahliye edemezse, silikon sıcaklığı kritik sınırı ($125-150^\\circ\\text{C}$) aşar ve **Termal Kaçak (Thermal Runaway)** ile çip kendini kalıcı olarak eritip yakabilir! Bu yüzden modern CPU/GPU'larda donanımsal termal kısma (Thermal Throttling) mekanizmaları bulunur.`,
      },
      {
        title: "6. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Yüksek sıcaklıkta metaller gibi yarı iletkenlerin de akımının her zaman azaldığını düşünmek.**
  *Doğrusu:* Açık durumdaki transistör akımı ($I_{on}$) hareketlilik azaldığı için düşerken, kapalı durumdaki kaçak akım ($I_{off}$) üstel olarak artar!
- **Hata #2: Sürüklenme hızı ile elektronun bireysel termal hızını karıştırmak.**
  *Doğrusu:* Elektronlar termal olarak saniyede $\\sim 10^7\\text{ cm/s}$ rastgele hızla titreşir. Elektrik alan uygulandığında bu rastgele harekete yalnızca $\\sim 10^5 - 10^6\\text{ cm/s}$'lik net bir sürüklenme sapması eklenir.`,
      },
      {
        title: "7. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir transistörde elektrik alan sonsuza kadar artırılırsa elektron hızı da sonsuza kadar artar mı?**
*Cevap:* Hayır! Yüksek elektrik alanlarda ($\approx 10^4\text{ V/cm}$) elektronlar optik fonon saçılmasına uğrar ve hızları silikonda yaklaşık $10^7\text{ cm/s}$ olan **Doyma Hızına ($v_{sat}$)** kilitlenir.

**S2: Einstein bağıntısı neden önemlidir?**
*Cevap:* Difüzyon katsayısı ($D$) ile hareketlilik katsayısını ($\mu$) termal voltaj ($kT/q$) üzerinden doğrudan birbirine bağlar.`,
      },
      {
        title: "8. Özet ve Temel Çıkarımlar",
        content: `- Yarı iletkenlerde akım iki mekanizmayla akar: Elektrik alanla sürüklenme (Drift) ve konsantrasyon farkıyla yayılma (Diffusion).
- Einstein bağıntısı $D / \\mu = kT/q$ difüzyon ile hareketliliği bağlar.
- Sıcaklık arttıkça kafes saçılması nedeniyle hareketlilik ($\mu$) düşer, bu da transistörün açma akımını düşürerek çipi yavaşlatır.
- Sıcaklık arttıkça kaçak akım ($I_{leak}$) üstel olarak katlanır; bu durum Termal Kaçak riskini doğurur.`,
      },
    ],
    playground: {
      title: "Sıcaklıkla Hareketlilik ve Hız Kaybı Simülasyonu",
      filename: "tb_carriers_temp.v",
      language: "verilog",
      initialCode: `// Sıcaklıkla Elektron Hareketliliği (Mobility) ve Akım Değişimi
module tb_carriers_temp;
  real T_oda, T_sicak;
  real mu_oda, mu_sicak;
  real I_on_oda, I_on_sicak;

  initial begin
    T_oda = 300.0;   // 27 °C
    T_sicak = 398.0; // 125 °C (Ağır yük altındaki işlemci)

    mu_oda = 1400.0; // cm^2 / V*s
    // mu(T) = mu_0 * (T / 300)^(-1.5)
    mu_sicak = mu_oda * (300.0 / 398.0)**1.5;

    I_on_oda = 1.0; // 1.0 mA referans
    I_on_sicak = I_on_oda * (mu_sicak / mu_oda);

    $display("=== Sıcaklık Kaynaklı Çip Performans Analizi ===");
    $display("Oda Sıcaklığı (27 °C)  -> Hareketlilik: %4.0f cm^2/Vs | Sürücü Akımı: %4.2f mA", mu_oda, I_on_oda);
    $display("İşlemci Sıcaklığı (125 °C) -> Hareketlilik: %4.0f cm^2/Vs | Sürücü Akımı: %4.2f mA (%%34 YAVAŞLAMA!)", mu_sicak, I_on_sicak);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Sıcaklık Kaynaklı Çip Performans Analizi ===",
        "Oda Sıcaklığı (27 °C)  -> Hareketlilik: 1400 cm^2/Vs | Sürücü Akımı: 1.00 mA",
        "İşlemci Sıcaklığı (125 °C) -> Hareketlilik:  915 cm^2/Vs | Sürücü Akımı: 0.65 mA (%34 YAVAŞLAMA!)",
      ],
    },
    quiz: {
      question: "Çalışırken 100°C'ye ısınan bir işlemcinin saat frekansının düşmesinin (termal kısma olmasa bile) temel fiziksel nedeni nedir?",
      options: [
        "A) Silikon atomlarının erimeye başlaması",
        "B) Kafes titreşimlerinin (fononlar) artması sonucu taşıyıcı hareketliliğinin (mobility) düşmesi ve transistörlerin kapıları daha yavaş şarj etmesi",
        "C) Bakır hatların manyetikleşmesi",
        "D) Saat sinyalinin genliğinin sıfıra inmesi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Sıcaklık arttıkça kafes saçılması artar ve elektron hareketliliği (μ ∝ T^-1.5) dramatik şekilde düşer. Düşük hareketlilik daha az sürücü akımı ve daha yüksek kapı gecikmesi demektir.",
    },
  },

  // ========================================================
  // BÖLÜM 3: THE MOSFET ANATOMY (MOSFET ANATOMİSİ)
  // ========================================================
  "df-mosfet-anatomy": {
    id: "df-mosfet-anatomy",
    badge: "Bölüm 3 • Transistör Fiziği",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "MOSFET Anatomisi ve Dört Terminali (MOSFET Anatomy)",
    subtitle:
      "Gate, Source, Drain, Body terminalleri, kapı oksidi (SiO2 / High-k), kanal uzunluğu (L) ve genişliği (W), kapı kapasitansı ve Verilog anahtar modeli.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital mantığın temel yapı taşı olan **MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor)** transistörünün fiziksel yapısını incelemek:
- MOSFET'in 4 terminali: **Gate (Kapı)**, **Source (Kaynak)**, **Drain (Savak)**, **Body / Substrate (Gövde)**.
- Kapı Oksidi (Gate Dielectric) neden mükemmel bir DC yalıtkanıdır ve kapıdan neden DC akım akmaz?
- Kapı Kapasitansı ($C_{ox}$) ve dijital gecikmenin kaynağı.
- Kanal Geometrisi: Kanal Genişliği ($W$) ve Kanal Uzunluğu ($L$).
- NMOS ve PMOS transistörlerin fiziksel kesit yapısı.
- Verilog switch-level primitifleri (\`nmos\`, \`pmos\`) ile transistör modelleme.`,
      },
      {
        title: "2. MOSFET'in Dört Terminali",
        content: `![NMOS Transistör Anatomisi ve Kesit Yapısı](/images/digital/2.1-nmos-cross-section.svg)

Bir MOSFET üç değil, aslında **dört terminalli** bir cihazdır:

1. **Gate (Kapı - G):** Kontrol terminalidir. Bir musluğun vanası gibidir. Buraya uygulanan gerilim, kaynak ile savak arasındaki iletken kanalın açılıp kapanmasını kontrol eder.
2. **Source (Kaynak - S):** Taşıyıcıların kanala girdiği uçtur (NMOS'ta elektronların, PMOS'ta deliklerin kaynağıdır).
3. **Drain (Savak - D):** Kanaldan geçen taşıyıcıların cihazı terk ettiği uçtur.
4. **Body / Substrate (Gövde / Alt Tabaka - B):** Transistörün inşa edildiği yarı iletken tabandır. Genellikle devre şemalarında çizilmez çünkü sabit bir gerilime (NMOS için GND, PMOS için VDD) bağlanır; ancak kanal oluşumunda ve eşik geriliminde (Body Effect) kritik rol oynar.`,
      },
      {
        title: "3. Kapı Oksidi ve Kapı Kapasitansı ($C_g$)",
        content: `Kapı elektrodu ile yarı iletken kanal arasında ultra ince bir yalıtkan katman (**Kapı Oksidi - Gate Oxide**) bulunur. Klasik süreçlerde bu $SiO_2$, modern süreçlerde ise Hafniyum dioksit ($HfO_2$ gibi High-k dielektrikler) katmanıdır.

- **Neden DC Akım Akmaz?** Oksit mükemmel bir yalıtkan olduğu için kapıdan kanala idealde hiçbir statik DC akımı akmaz ($I_G \\approx 0$). Transistör **voltaj kontrollü bir anahtardır** (BJT transistörler gibi akımla sürülmez!).
- **Kapı Kapasitansı ($C_{ox}$):**
$$C_{ox} = \\frac{\\varepsilon_{ox}}{t_{ox}}$$
$$C_G = C_{ox} \\cdot W \\cdot L$$
Kapı tam anlamıyla bir kondansatördür. Bir transistörü açmak için bu kondansatörü şarj etmek, kapatmak için deşarj etmek gerekir. Modern çiplerdeki tüm dinamik anahtarlama gücü ve mantık gecikmesi işte bu kapı kapasitansının doldurulup boşaltılmasından kaynaklanır!`,
      },
      {
        title: "4. Kanal Boyutları: W ve L Oranı",
        content: `Bir transistörün akım kapasitesi ve fiziksel boyutu iki parametreyle tanımlanır:

- **Kanal Uzunluğu ($L$):** Kaynak ile savak arasındaki mesafedir. Teknolojinin adını belirler (örn: 5nm, 3nm süreçleri). $L$ ne kadar küçük olursa elektronlar kanalı o kadar hızlı geçer ve kapı gecikmesi o kadar düşer!
- **Kanal Genişliği ($W$):** Akımın aktığı kanalın enidir. Bir otoyolun şerit sayısı gibidir. $W$ ne kadar büyük olursa o kadar çok akım akar ve transistör o kadar güçlü olur (ancak kapı kapasitansı da o kadar büyür!).

$$I_{DS} \\propto \\frac{W}{L}$$`,
      },
      {
        title: "5. NMOS vs PMOS Fiziksel Yapısı",
        content: `İki transistör birbirinin ayna görüntüsüdür:

| Özellik | NMOS (N-Kanal MOSFET) | PMOS (P-Kanal MOSFET) |
| :--- | :--- | :--- |
| **Gövde (Body)** | P-Tipi Silikon Tabaka | N-Kuyu (N-Well) |
| **Kaynak / Savak** | Ağır Katkılı $N^+$ Bölgeleri | Ağır Katkılı $P^+$ Bölgeleri |
| **Taşıyıcı Türü** | Elektronlar (Hızlı) | Delikler (Yavaş) |
| **Açılma Şartı** | $V_{GS} > V_t$ (Gate pozitif) | $V_{GS} < -|V_t|$ (Gate negatif/düşük) |
| **Çekme Gücü** | Mantık 0'ı (GND) güçlü iletir | Mantık 1'i (VDD) güçlü iletir |`,
      },
      {
        title: "6. Verilog Switch-Level Primitifleri",
        content: `Verilog donanım tanımlama dili, transistör düzeyinde modelleme yapmak için yerleşik anahtar primitiflerine sahiptir:

\`\`\`verilog
// NMOS primitifi: nmos ornek_adi (cikis, giris, kontrol_kapisi);
nmos n1 (out, GND, in); // in = 1 ise out = GND, in = 0 ise out = Yüksek Empedans (Hi-Z)

// PMOS primitifi: pmos ornek_adi (cikis, giris, kontrol_kapisi);
pmos p1 (out, VDD, in); // in = 0 ise out = VDD, in = 1 ise out = Hi-Z
\`\`\`

Bu primitifler sentezlenebilir RTL tasarımında nadiren kullanılır; ancak standart hücre kütüphanesi karakterizasyonunda ve switch-level simülasyonlarda hayati öneme sahiptir.`,
      },
      {
        title: "7. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: MOSFET'in 3 bacaklı olduğunu sanıp Body terminalini unutmak.**
  *Doğrusu:* Body terminali transistörün eşik gerilimini belirler. Eğer Body gerilimi değişirse Body Effect nedeniyle transistörün açılma karakteristiği bozulur.
- **Hata #2: Kaynak ve Savak terminallerinin fiziksel olarak farklı üretildiğini düşünmek.**
  *Doğrusu:* MOSFET simetrik bir cihazdır; üretim anında Source ve Drain tamamen aynıdır. Hangisinin Source hangisinin Drain olacağı devrede uygulanan gerilimlere göre belirlenir (NMOS'ta daha düşük voltajdaki uç Source olur).`,
      },
      {
        title: "8. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Neden bir transistörün kanal uzunluğunu ($L$) minimum teknoloji sınırında tutmak isteriz?**
*Cevap:* $L$ küçüldükçe elektronların geçiş süresi ($\tau = L / v$) kısalır, kapı gecikmesi azalır ve transistör daha yüksek saat frekanslarında çalışabilir.

**S2: Kapı oksidi ($t_{ox}$) aşırı incelirse ne olur?**
*Cevap:* Oksit kalınlığı $1-2\\text{ nm}$'nin altına indiğinde kuantum mekaniksel tünelleme (Quantum Tunneling) başlar ve kapıdan doğrudan dielektrik kaçak akımı sızar. Bu sorunu aşmak için High-k dielektrikler geliştirilmiştir.`,
      },
      {
        title: "9. Özet ve Temel Çıkarımlar",
        content: `- MOSFET 4 terminallidir: Gate, Source, Drain ve Body.
- Gate oksidi DC akımını engeller; cihaz voltaj kontrollüdür.
- Kapı kapasitansı $C_G = C_{ox} \\cdot W \\cdot L$, mantık devrelerinin anahtarlama gecikmesini ve dinamik güç tüketimini belirler.
- Akım kapasitesi $W/L$ oranı ile doğrusal orantılıdır.
- NMOS elektronlarla, PMOS deliklerle iletim yapar.`,
      },
    ],
    playground: {
      title: "Verilog Switch-Level CMOS Inverter Modellemesi",
      filename: "tb_mosfet_switch.v",
      language: "verilog",
      initialCode: `// NMOS ve PMOS Switch Primitifleriyle CMOS Inverter Kurulumu
module cmos_not_gate (
  input wire in,
  output wire out
);
  supply1 VDD; // Mantık 1 Güç Rayı
  supply0 GND; // Mantık 0 Toprak Rayı

  // PMOS: in = 0 iken VDD'yi out'a çeker
  pmos p1 (out, VDD, in);

  // NMOS: in = 1 iken GND'yi out'a çeker
  nmos n1 (out, GND, in);
endmodule

module tb_mosfet;
  reg in;
  wire out;

  cmos_not_gate uut (.in(in), .out(out));

  initial begin
    $display("=== Switch-Level CMOS Inverter Testi ===");
    in = 0; #10;
    $display("Giriş: %b -> Çıkış: %b (PMOS AÇIK, NMOS KAPALI -> VDD)", in, out);
    in = 1; #10;
    $display("Giriş: %b -> Çıkış: %b (PMOS KAPALI, NMOS AÇIK -> GND)", in, out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Switch-Level CMOS Inverter Testi ===",
        "Giriş: 0 -> Çıkış: 1 (PMOS AÇIK, NMOS KAPALI -> VDD)",
        "Giriş: 1 -> Çıkış: 0 (PMOS KAPALI, NMOS AÇIK -> GND)",
      ],
    },
    quiz: {
      question: "Bir MOSFET'in Gate (Kapı) terminalinden ideal şartlarda neden hiçbir DC akım akmaz?",
      options: [
        "A) Kapı terminalinin toprağa bağlı olması nedeniyle",
        "B) Kapı elektrodu ile yarı iletken kanal arasında yalıtkan bir kapı oksidi (SiO2 / High-k) bulunması nedeniyle",
        "C) Silikonun iletkenliğini kaybetmesi nedeniyle",
        "D) Gate sinyalinin daima AC olması nedeniyle",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Kapı oksidi mükemmel bir dielektrik yalıtkan olduğundan DC akım geçişini tamamen engeller. Transistör akımla değil, oksit üzerinde oluşan elektrik alanı ile kontrol edilir.",
    },
  },

  // ========================================================
  // BÖLÜM 3: THRESHOLD VOLTAGE & CHANNEL FORMATION
  // ========================================================
  "df-threshold-voltage": {
    id: "df-threshold-voltage",
    badge: "Bölüm 3 • Transistör Fiziği",
    readingTime: "16 dk okuma",
    level: "İleri Seviye",
    title: "Eşik Gerilimi ve Kanal Oluşumu (Threshold Voltage & Inversion)",
    subtitle:
      "MOS kapasitör, birikim (accumulation), tükenim (depletion) ve evirtim (inversion) rejimleri, güçlü evirtim noktası, gövde etkisi (Body Effect).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bir transistörün kapısına gerilim uygulandığında silikon yüzeyinde meydana gelen kuantum ve elektrostatik dönüşümler:
- MOS Kondansatörün 3 temel çalışma rejimi: **Birikim (Accumulation)**, **Tükenim (Depletion)** ve **Evirtim (Inversion)**.
- **Eşik Gerilimi ($V_t$ / $V_{th}$)** nedir ve nasıl tanımlanır?
- Güçlü Evirtim (Strong Inversion) şartı: Yüzey potansiyeli $\\phi_s = 2 \\phi_F$.
- Gövde Etkisi (Body Effect / Back-Gate Effect) ve $\\gamma$ parametresi.
- Eşik gerilimini belirleyen fiziksel faktörler (metal iş fonksiyonu farkı $\\Phi_{ms}$, oksit yükü $Q_{ox}$, substrat katkılama $N_A$).`,
      },
      {
        title: "2. MOS Kapasitör Rejimleri: Kanal Adım Adım Nasıl Doğar?",
        content: `![MOSFET Eşik Voltajı (Vt) Mekanizması ve Kanal Oluşumu](/images/digital/2.2-threshold-voltage-band.svg)

P-Tipi bir silikon taban üzerine oksit ve metal kapı yerleştirildiğinde bir MOS yapısı oluşur. Kapıya ($V_G$) uygulanan gerilime göre silikon yüzeyinde 3 aşama yaşanır:

1. **Birikim (Accumulation - $V_G < 0$):**
   - Kapıya negatif voltaj uygulandığında, P-tabandaki pozitif delikler oksit yüzeyine doğru çekilir. Yüzeyde ekstra delik birikir; kanal oluşmaz.
2. **Tükenim (Depletion - $0 < V_G < V_t$):**
   - Kapıya küçük pozitif bir voltaj uygulandığında, pozitif delikler yüzeyden tabana doğru itilir.
   - Geride negatif sabit bor iyonları ($B^-$) kalır ve yüzeyde serbest taşıyıcısı olmayan bir tükenim bölgesi oluşur.
3. **Evirtim (Inversion - $V_G \\ge V_t$):**
   - Kapı voltajı yeterince artırıldığında, elektrik alanı P-tabanın derinliklerindeki ve kaynak/savak bölgelerindeki serbest elektronları oksit yüzeyine doğru güçlüce çeker.
   - Yüzeydeki elektron konsantrasyonu P-tabanın delik konsantrasyonunu aşar! Yüzey tipi P'den N'ye **evrilir (Inversion)**.
   - Artık kaynak ile savak arasında kesintisiz, son derece iletken bir **N-Tipi Elektron Kanalı** kurulmuştur!`,
      },
      {
        title: "3. Eşik Geriliminin ($V_t$) Matematiksel Tanımı",
        content: `Eşik gerilimi ($V_t$), yarı iletken yüzeyinin Fermi potansiyelinin iki katına ulaştığı (**Güçlü Evirtim - Strong Inversion**) kapı gerilimidir:

$$\\phi_s = 2 \\phi_F = 2 \\left(\\frac{kT}{q}\\right) \\ln\\left(\\frac{N_A}{n_i}\\right)$$

Klasik NMOS için eşik voltajı formülü:
$$V_t = V_{FB} + 2 \\phi_F + \\frac{\\sqrt{2 q \\varepsilon_{si} N_A (2 \\phi_F)}}{C_{ox}}$$

Burada:
- $V_{FB}$: Düz bant gerilimi (Flat-band voltage)
- $2 \\phi_F$: Yüzey evirtim potansiyeli (silikonda $\\approx 0.6 - 0.7\\text{ V}$)
- $C_{ox}$: Birim alan başına kapı oksit kapasitansı. Oksit inceldikçe ($t_{ox} \\downarrow$) $C_{ox}$ artar ve $V_t$ düşer!`,
      },
      {
        title: "4. Gövde Etkisi (Body Effect): Kaynak Toprak Değilse Ne Olur?",
        content: `Birçok devrede (özellikle seri bağlı transistörlerde veya iletim kapılarında) transistörün kaynağı (Source) tabana (Body) doğrudan bağlı değildir ($V_{SB} > 0$).

Kaynak gerilimi tabandan yüksek olduğunda, kaynak-taban P-N birleşimi daha fazla ters kutuplanır. Tükenim bölgesi genişler ve kanalı açmak için kapının daha fazla negatif iyon yükünü yenmesi gerekir. Bu durum **Eşik Gerilimini Artırır!**

$$V_t = V_{t0} + \\gamma \\left(\\sqrt{2 \\phi_F + V_{SB}} - \\sqrt{2 \\phi_F}\\right)$$

- $\\gamma$ (Gövde Etkisi Parametresi): $\\gamma = \\frac{\\sqrt{2 q \\varepsilon_{si} N_A}}{C_{ox}}$ (Tipik olarak $0.3 - 0.5\\text{ V}^{1/2}$).
- **Devre Tasarımındaki Tehlikesi:** Seri bağlı NAND kapılarında üstteki NMOS transistörün kaynağı havada kaldığı için $V_{SB} > 0$ olur; transistörün $V_t$'si yükselir, transistör daha zor açılır ve kapı gecikmesi ciddi oranda artar!`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Eşik geriliminin keskin bir açma-kapama anahtarı olduğunu sanmak.**
  *Doğrusu:* $V_{GS} < V_t$ olduğunda akım sıfır olmaz! $V_t$'nin altında akım üstel olarak akar (Alt-Eşik Akımı - Subthreshold Current).
- **Hata #2: Eşik geriliminin transistör üretildikten sonra sabit kaldığını varsaymak.**
  *Doğrusu:* $V_t$, sıcaklıkla (yaklaşık $-1\\text{ mV}/^\\circ\\text{C}$ ila $-2\\text{ mV}/^\\circ\\text{C}$), gövde gerilimiyle ($V_{SB}$) ve savak gerilimiyle (DIBL etkisi) dinamik olarak değişir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir transistörün kapı oksidi inceltildiğinde ($t_{ox} \\downarrow$) eşik gerilimi nasıl etkilenir?**
*Cevap:* $C_{ox} = \\varepsilon_{ox} / t_{ox}$ artacağı için kapı yüzey üzerindeki elektrostatik kontrolünü güçlendirir; bu da eşik voltajını ($V_t$) düşürür ve transistörün daha düşük voltajla açılmasını sağlar.

**S2: Gövde etkisi (Body Effect) hangi transistörlerde en belirgindir?**
*Cevap:* Kaynağı doğrudan $GND$ veya $VDD$ rayına bağlı olmayan, seri yığın (stack) halindeki transistörlerde.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- MOS yapısı kapı voltajına göre Birikim, Tükenim ve Evirtim rejimlerinden geçer.
- $V_{GS} \\ge V_t$ olduğunda Güçlü Evirtim başlar ve iletken kanal tam olarak kurulur.
- Eşik gerilimi oksit kalınlığı, substrat katkılaması ve metal iş fonksiyonu ile belirlenir.
- Gövde etkisi ($V_{SB} > 0$), kaynak ile gövde arasındaki gerilim farkı nedeniyle $V_t$'yi yükseltir.`,
      },
    ],
    playground: {
      title: "Gövde Etkisi (Body Effect) ile Eşik Gerilimi Artışı Simülasyonu",
      filename: "tb_body_effect.v",
      language: "verilog",
      initialCode: `// Body Effect Formülü: Vt = Vt0 + gamma * (sqrt(2*phi_F + Vsb) - sqrt(2*phi_F))
module tb_body_effect;
  real Vt0, gamma, phi_F2;
  real Vsb, Vt;

  initial begin
    Vt0 = 0.400;   // 400 mV temel eşik gerilimi
    gamma = 0.45;  // V^0.5
    phi_F2 = 0.70; // 2 * phi_F = 0.70 V

    $display("=== Gövde Etkisi (Body Effect) Simülasyonu ===");
    $display("Kaynak-Gövde Gerilimi (Vsb) | Efektif Eşik Gerilimi (Vt) | Gecikme Etkisi");

    Vsb = 0.0;
    Vt = Vt0 + gamma * ($sqrt(phi_F2 + Vsb) - $sqrt(phi_F2));
    $display("          %4.2f V           |          %5.3f V           | Standart Hız (Vsb=0)", Vsb, Vt);

    Vsb = 0.4;
    Vt = Vt0 + gamma * ($sqrt(phi_F2 + Vsb) - $sqrt(phi_F2));
    $display("          %4.2f V           |          %5.3f V           | %%24 Eşik Artışı", Vsb, Vt);

    Vsb = 0.8;
    Vt = Vt0 + gamma * ($sqrt(phi_F2 + Vsb) - $sqrt(phi_F2));
    $display("          %4.2f V           |          %5.3f V           | Ciddi Yavaşlama! (Seri Yığın)", Vsb, Vt);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Gövde Etkisi (Body Effect) Simülasyonu ===",
        "Kaynak-Gövde Gerilimi (Vsb) | Efektif Eşik Gerilimi (Vt) | Gecikme Etkisi",
        "          0.00 V           |          0.400 V           | Standart Hız (Vsb=0)",
        "          0.40 V           |          0.496 V           | %24 Eşik Artışı",
        "          0.80 V           |          0.575 V           | Ciddi Yavaşlama! (Seri Yığın)",
      ],
    },
    quiz: {
      question: "Seri bağlı iki NMOS transistörden üsttekinin kaynağı (Source) 0V yerine 0.5V'a yükseldiğinde ne olur?",
      options: [
        "A) Transistör ters kutuplanıp yanar",
        "B) Gövde etkisi (Body effect) devreye girer, transistörün eşik voltajı (Vt) artar ve transistör daha zor açılır",
        "C) Kanal genişliği iki katına çıkar",
        "D) Gate akımı artar",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Vsb > 0 olduğunda gövde etkisi nedeniyle eşik gerilimi formül gereği yükselir. Bu durum üstteki transistörün etkin kapı voltajını (Vgs - Vt) azaltarak devreyi yavaşlatır.",
    },
  },

  // ========================================================
  // BÖLÜM 3: MOSFET DRAIN CURRENT REGIMES
  // ========================================================
  "df-drain-current-regimes": {
    id: "df-drain-current-regimes",
    badge: "Bölüm 3 • Transistör Fiziği",
    readingTime: "16 dk okuma",
    level: "İleri Seviye",
    title: "MOSFET Savak Akımı Rejimleri (Drain Current Regimes)",
    subtitle:
      "Kesim (Cutoff), Lineer/Triyot (Linear) ve Doyum (Saturation) bölgeleri, boğulma noktası (Pinch-off), kanal boyu modülasyonu ve hız doyumu.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bir MOSFET kanalından akan savak akımının ($I_{DS}$) uygulanan $V_{GS}$ ve $V_{DS}$ gerilimlerine bağlı davranışı:
- 3 Temel Çalışma Bölgesi: **Kesim (Cutoff)**, **Lineer (Triyot)** ve **Doyum (Saturation)**.
- Kanal Boğulması (Pinch-off) nedir ve doyum akımını neden sabitler?
- Kare Kanunu Akım Denklemleri (Square-Law Model).
- Kanal Boyu Modülasyonu (Channel Length Modulation - $\\lambda$) ve sonlu çıkış direnci ($r_o$).
- Nanometre ölçekli modern çiplerde Hız Doyumu (Velocity Saturation) etkisi ($I_{DS}$ lineerleşmesi).`,
      },
      {
        title: "2. Üç Çalışma Rejiminin Karşılaştırmalı Özeti",
        content: `![MOSFET ID - VDS Akım-Gerilim Karakteristiği](/images/digital/2.3-mosfet-iv-characteristics.svg)

Bir NMOS transistör için akım rejimleri aşağıdaki koşullara göre belirlenir:

| Rejim | Koşul | Fiziksel Kanal Durumu | Akım Denklemi ($I_{DS}$) | Dijital Devredeki Rolü |
| :--- | :--- | :--- | :--- | :--- |
| **Kesim (Cutoff)** | $V_{GS} < V_t$ | Kanal kapalıdır; serbest elektron yoktur. | $I_{DS} \\approx 0$ (Yalnızca üstel alt-eşik kaçağı) | Açık anahtar (OFF state - Mantık 0 veya yalıtım) |
| **Lineer (Triyot)** | $V_{GS} > V_t$ ve $V_{DS} < V_{GS} - V_t$ | Kaynaktan savağa kadar kesintisiz, dirençli bir kanal vardır. | $I_{DS} = \\mu C_{ox} \\frac{W}{L} \\left[(V_{GS} - V_t) V_{DS} - \\frac{1}{2} V_{DS}^2\\right]$ | Değişken direnç gibi davranır; çıkış voltajı GND'ye veya VDD'ye yaklaşırken bu bölgeden geçer. |
| **Doyum (Saturation)** | $V_{GS} > V_t$ ve $V_{DS} \\ge V_{GS} - V_t$ | Savak tarafında kanal boğulmuştur (Pinch-off); akım $V_{DS}$'den bağımsız sabitlenir. | $I_{DS} = \\frac{1}{2} \\mu C_{ox} \\frac{W}{L} (V_{GS} - V_t)^2 (1 + \\lambda V_{DS})$ | Akım kaynağı gibi davranır; CMOS inverter geçiş anında maksimum akımı burada çeker. |`,
      },
      {
        title: "3. Kanal Boğulması (Pinch-Off) Nasıl Gerçekleşir?",
        content: `Savak gerilimi ($V_{DS}$) artırıldığında, savak ile kapı arasındaki yerel voltaj farkı ($V_{GD} = V_{GS} - V_{DS}$) azalır.

$V_{DS} = V_{GS} - V_t$ olduğu kritik anda, savak ucundaki yerel voltaj farkı tam olarak eşik voltajına ($V_t$) eşitlenir. Savak ucunda elektron yoğunluğu sıfıra yaklaşır; bu noktaya **Boğulma Noktası (Pinch-off Point)** denir.

$V_{DS}$ daha da artırılırsa boğulma noktası biraz sola (kaynağa doğru) kayar. Boğulma noktasından sonraki bölgede çok güçlü bir elektrik alanı vardır; kanaldan gelen elektronlar bu yüksek alana kapılarak savağa fırlatılır. Bu nedenle akım daha fazla artamaz ve **doyuma ulaşır!**`,
      },
      {
        title: "4. Kanal Boyu Modülasyonu (Channel Length Modulation - $\\lambda$)",
        content: `İdeal bir transistörde doyum bölgesindeki akım $V_{DS}$'den tamamen bağımsız düz bir çizgidir. Ancak gerçek silikonda $V_{DS}$ arttıkça tükenim bölgesi kanalın içine doğru ilerler ve etkin kanal uzunluğunu ($L_{eff}$) kısaltır ($L_{eff} < L$).

Kanal kısaldığı için akım hafifçe artar:
$$I_{DS} = I_{sat} \\cdot (1 + \\lambda V_{DS})$$

- $\\lambda$ (Kanal Boyu Modülasyon Katsayısı): Kanal uzunluğu $L$ küçüldükçe $\\lambda$ fırlar! Bu durum analog devrelerde kazancı düşürür, dijital devrelerde ise transistörün çıkış empedansını bozar.`,
      },
      {
        title: "5. Modern Nanometre Gerçeği: Hız Doyumu (Velocity Saturation)",
        content: `Klasik mikroçiplerde doyum akımı kapı aşırı geriliminin karesiyle orantılıdır ($I_{DS} \\propto (V_{GS} - V_t)^2$).

Ancak modern $7\\text{nm}, 5\\text{nm}, 3\\text{nm}$ çiplerde kanal uzunluğu $L$ o kadar kısadır ki ($\sim 15-20\\text{ nm}$), küçük bir voltaj bile kanalda $10^5\\text{ V/cm}$'lik devasa bir elektrik alanı yaratır!
Elektronlar anında maksimum sınırları olan **Doyma Hızına ($v_{sat} \\approx 10^7\\text{ cm/s}$)** ulaşır. Artık voltajı artırmak hızı artıramaz!

Sonuç olarak modern nanometre transistörlerde doyum akımı kare kanununu kaybeder ve **doğrusal (lineer)** hale gelir:
$$I_{DS,sat} = W \\cdot C_{ox} \\cdot v_{sat} \\cdot (V_{GS} - V_t)$$
Bu nedenle modern çiplerde transistör akımı teorik kare modeline göre daha düşüktür ancak çok daha hızlı doyuma ulaşır.`,
      },
      {
        title: "6. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Doyum bölgesinde transistörün boğulduğu için akım geçirmediğini sanmak.**
  *Doğrusu:* Doyum bölgesinde transistör MAKSİMUM akımını geçirir; "doyum" kelimesi akımın sıfırlanmasını değil, akımın artık $V_{DS}$ artışıyla daha fazla artamayacak doygunluğa ulaştığını ifade eder.
- **Hata #2: Lineer bölgede transistörün lineer bir yükselteç olduğunu düşünmek.**
  *Doğrusu:* Lineer bölge transistörün küçük $V_{DS}$ değerlerinde omik bir direnç gibi davrandığı bölgedir; analog yükselteçler daima doyum bölgesinde çalıştırılır.`,
      },
      {
        title: "7. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir transistörün lineer bölgeden doyum bölgesine geçiş kriteri nedir?**
*Cevap:* $V_{DS} \\ge V_{GS} - V_t$ (yani $V_{DS} \\ge V_{DS,sat}$) olduğunda kanal savak ucunda boğulur ve transistör doyum bölgesine geçer.

**S2: Modern kısa kanallı transistörlerde akım neden $(V_{GS}-V_t)^2$ yerine $(V_{GS}-V_t)$ ile orantılıdır?**
*Cevap:* Aşırı yüksek elektrik alan nedeniyle elektronların hız doyumuna ($v_{sat}$) ulaşmasından dolayı.`,
      },
      {
        title: "8. Özet ve Temel Çıkarımlar",
        content: `- $V_{GS} < V_t$ ise transistör Kesimdedir ($I \\approx 0$).
- $V_{GS} > V_t$ ve $V_{DS} < V_{DS,sat}$ ise Lineer bölgededir (Direnç davranışı).
- $V_{DS} \\ge V_{DS,sat}$ ise Doyum bölgesindedir (Akım kaynağı davranışı).
- Kanal boyu modülasyonu ($\lambda$) doyumda sonlu çıkış direncine sebep olur.
- Nanometre transistörlerde hız doyumu ($v_{sat}$) akım denklemini lineerleştirir.`,
      },
    ],
    playground: {
      title: "MOSFET Lineer ve Doyum Akım Karakteristiği Simülasyonu",
      filename: "tb_drain_current.v",
      language: "verilog",
      initialCode: `// MOSFET Akım Denklemleri Simülasyonu (Lineer vs Doyum)
module tb_drain_current;
  real Vgs, Vds, Vt;
  real beta; // mu * Cox * (W/L)
  real Ids_linear, Ids_sat;

  initial begin
    Vt = 0.4;    // 0.4V eşik voltajı
    beta = 2.0;  // mA / V^2
    Vgs = 1.0;   // 1.0V kapı voltajı -> Vds_sat = Vgs - Vt = 0.6V

    $display("=== MOSFET Akım Karakteristiği (Vgs = 1.0V, Vt = 0.4V) ===");
    $display("Vds (V) | Rejim    | Savak Akımı (Ids)");

    // 1. Lineer Bölge (Vds = 0.2V < 0.6V)
    Vds = 0.2;
    Ids_linear = beta * ((Vgs - Vt) * Vds - 0.5 * (Vds * Vds));
    $display(" %4.2f V | Lineer   | %5.3f mA", Vds, Ids_linear);

    // 2. Doyum Sınırı (Vds = 0.6V = Vds_sat)
    Vds = 0.6;
    Ids_sat = 0.5 * beta * (Vgs - Vt)**2;
    $display(" %4.2f V | Doyum S. | %5.3f mA (Pinch-off)", Vds, Ids_sat);

    // 3. Derin Doyum (Vds = 1.0V > 0.6V)
    Vds = 1.0;
    // İdealde akım aynı kalır (0.36 mA)
    $display(" %4.2f V | Doyum    | %5.3f mA (Akım Sabitlendi)", Vds, Ids_sat);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== MOSFET Akım Karakteristiği (Vgs = 1.0V, Vt = 0.4V) ===",
        "Vds (V) | Rejim    | Savak Akımı (Ids)",
        " 0.20 V | Lineer   | 0.200 mA",
        " 0.60 V | Doyum S. | 0.360 mA (Pinch-off)",
        " 1.00 V | Doyum    | 0.360 mA (Akım Sabitlendi)",
      ],
    },
    quiz: {
      question: "Vgs = 1.2V ve Vt = 0.4V olan bir NMOS transistörde Vds = 1.0V uygulandığında transistör hangi bölgede çalışır?",
      options: [
        "A) Kesim (Cutoff) bölgesinde",
        "B) Lineer (Triyot) bölgesinde",
        "C) Doyum (Saturation) bölgesinde",
        "D) Çökme (Breakdown) bölgesinde",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! Vds_sat = Vgs - Vt = 1.2V - 0.4V = 0.8V'dur. Uygulanan Vds = 1.0V gerilimi 0.8V'dan büyük olduğu için kanal savak tarafında boğulmuştur (Pinch-off) ve transistör doyum (saturation) bölgesindedir.",
    },
  },

  // ========================================================
  // BÖLÜM 3: NMOS VS PMOS
  // ========================================================
  "df-nmos-vs-pmos": {
    id: "df-nmos-vs-pmos",
    badge: "Bölüm 3 • Transistör Fiziği",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "NMOS vs PMOS Karşılaştırmalı Mimarisi (NMOS vs PMOS)",
    subtitle:
      "Ayna görüntüsü açılma koşulları, güçlü/zayıf mantık seviyeleri, iletim kapıları (Transmission Gates) ve layout alan asimetrisi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `CMOS teknolojisini oluşturan iki tamamlayıcı (complementary) transistörün derinlemesine karşılaştırılması:
- NMOS ve PMOS transistörlerin açılma/kapanma koşulları ($V_{GS}$ kutupları).
- **Güçlü ve Zayıf Mantık Seviyeleri:** NMOS neden güçlü 0 ama zayıf 1 iletir? PMOS neden güçlü 1 ama zayıf 0 iletir?
- **İletim Kapısı (Transmission Gate - TG):** NMOS ve PMOS'un paralel bağlanarak tam voltaj aralıklı kusursuz anahtar oluşturması.
- Taşıyıcı hareketliliği farkı (Elektron vs Delik) ve standart hücre yerleşimindeki (Layout) $W_p / W_n$ boyutlandırması.
- Verilog ile CMOS iletim kapısı modellemesi.`,
      },
      {
        title: "2. Yan Yana Karşılaştırma Tablosu",
        content: `![NMOS ve PMOS Transistör Karşılaştırmalı Mimarisi](/images/digital/2.4-nmos-vs-pmos-comparison.svg)

NMOS ve PMOS mükemmel bir zıtlık dengesiyle çalışır:

| Parametre | NMOS Transistör | PMOS Transistör |
| :--- | :--- | :--- |
| **Gövde (Substrate)** | P-Substrate (GND'ye bağlı) | N-Kuyu (N-Well) |
| **Kanal Taşıyıcısı** | Serbest Elektronlar | Delikler |
| **Hareketlilik (Mobility)** | $\\mu_n \\approx 1400\\text{ cm}^2/\\text{Vs}$ (Yüksek) | $\\mu_p \\approx 450\\text{ cm}^2/\\text{Vs}$ (Düşük) |
| **Açılma Koşulu** | $V_{GS} > V_{tn}$ (Gate pozitif) | $V_{GS} < -|V_{tp}|$ (Gate negatif/düşük) |
| **Aktif Olduğu Mantık Seviyesi** | Gate = 1 iken iletir | Gate = 0 iken iletir |
| **İlettiği Seviye Kalitesi** | **Güçlü '0' (0V)**, Zayıf '1' ($V_{DD} - V_{tn}$) | **Güçlü '1' ($V_{DD}$)**, Zayıf '0' ($|V_{tp}|$) |
| **Sembolik Çizimi** | Gate bacağında yuvarlak yok | Gate bacağında evirici yuvarlak (bubble) var |`,
      },
      {
        title: "3. Güçlü '0' ve Güçlü '1' Gizemi: Eşik Düşüşü (Threshold Drop)",
        content: `Neden tek başına bir NMOS ile mantık 1 iletemeyiz veya tek başına bir PMOS ile mantık 0 iletemeyiz?

- **NMOS 1 İletmeye Çalıştığında:**
  - Gate ucuna $V_{DD}$, Source ucuna 0V verilirse transistör açılır ve çıkış kapasitansı şarj olmaya başlar.
  - Çıkış voltajı ($V_{out}$) yükseldikçe, kapı-kaynak voltajı ($V_{GS} = V_{DD} - V_{out}$) giderek azalır!
  - $V_{out} = V_{DD} - V_{tn}$ seviyesine ulaştığı anda $V_{GS} = V_{tn}$ olur ve transistör kendini aniden **kapatır!**
  - Çıkış asla $V_{DD}$'ye ulaşamaz; eksik kalır! Buna **Zayıf 1 (Weak 1)** denir.
- **PMOS 0 İletmeye Çalıştığında:**
  - Benzer şekilde çıkış gerilimi $|V_{tp}|$ seviyesine düştüğünde transistör kapanır ve çıkış asla tam 0V olamaz (**Zayıf 0 - Weak 0**).

**CMOS Çözümü:**
İşte bu yüzden dijital devrelerde çıkışı 0'a çekmek için daima **NMOS**, 1'e çekmek için daima **PMOS** kullanılır!`,
      },
      {
        title: "4. Kusursuz Anahtar: İletim Kapısı (Transmission Gate - TG)",
        content: `Hem güçlü 0 hem de güçlü 1 iletebilen çift yönlü bir analog/dijital anahtara ihtiyaç duyduğumuzda (örneğin Multiplexer veya Flip-Flop tasarımlarında), bir NMOS ve bir PMOS transistör birbirine **paralel** bağlanır.

- Giriş sinyali 0V'a yakınken NMOS güçlü 0'ı aktarır.
- Giriş sinyali $V_{DD}$'ye yakınken PMOS güçlü 1'i aktarır.
- Böylece iletim kapısı 0V'tan $V_{DD}$'ye kadar olan tüm sinyalleri sıfır voltaj kaybıyla iletir!

\`\`\`verilog
// Verilog iletim kapısı primitifi: cmos anahtar_adi (out, in, n_control, p_control);
cmos tg1 (out, in, sel, sel_b);
\`\`\``,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: NMOS yerine PMOS kullanarak pull-down devresi kurmaya çalışmak.**
  *Doğrusu:* PMOS çıkışı 0V'a çekemez, en fazla $|V_{tp}| \approx 0.4V$ seviyesine kadar düşürebilir; bu da sonraki kapılarda devasa statik kısa devre akımına yol açar.
- **Hata #2: Layout çiziminde NMOS ve PMOS'u aynı genişlikte ($W$) çizmek.**
  *Doğrusu:* Delik hareketliliği elektron hareketliliğinden 2.5 kat daha yavaş olduğu için, dengeli yükselme/düşme süresi elde etmek amacıyla PMOS genişliği ($W_p$) daima NMOS genişliğinin ($W_n$) 2 ila 3 katı çizilmelidir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir NMOS transistörün kapısına 1.8V verilip girişinden 1.8V uygulanırsa çıkışında kaç volt görülür?**
*Cevap:* Eşik gerilimi $V_t = 0.4V$ ise çıkışta en fazla $1.8V - 0.4V = 1.4V$ görülür (Zayıf 1).

**S2: Neden tüm standart hücre kütüphanelerinde PMOS transistörler NMOS'lardan fiziksel olarak daha büyüktür?**
*Cevap:* Delik hareketliliğinin düşüklüğünü telafi etmek ve aynı direnç değerini elde etmek için.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- NMOS Gate=1 ile açılır, güçlü 0 ve zayıf 1 iletir.
- PMOS Gate=0 ile açılır, güçlü 1 ve zayıf 0 iletir.
- CMOS devreleri pull-down ağında yalnızca NMOS, pull-up ağında yalnızca PMOS kullanır.
- İletim Kapısı (Transmission Gate) her iki transistörü paralel bağlayarak tüm voltaj aralığını kayıpsız geçirir.
- PMOS boyutu asimetriyi gidermek için tipik olarak $W_p \approx 2-3 W_n$ yapılır.`,
      },
    ],
    playground: {
      title: "Verilog CMOS İletim Kapısı (Transmission Gate) Simülasyonu",
      filename: "tb_transmission_gate.v",
      language: "verilog",
      initialCode: `// CMOS İletim Kapısı (Transmission Gate) Modeli
module transmission_gate (
  input wire in,
  input wire en,
  input wire en_b,
  output wire out
);
  // Yerleşik Verilog cmos primitifi
  cmos tg (out, in, en, en_b);
endmodule

module tb_tg;
  reg in, en, en_b;
  wire out;

  transmission_gate uut (.in(in), .en(en), .en_b(en_b), .out(out));

  initial begin
    $display("=== CMOS İletim Kapısı (Transmission Gate) Testi ===");
    
    // 1. Anahtar AÇIK (en=1, en_b=0)
    en = 1; en_b = 0;
    in = 0; #10;
    $display("EN=1 | Giriş: %b -> Çıkış: %b (Güçlü 0 İletildi)", in, out);
    in = 1; #10;
    $display("EN=1 | Giriş: %b -> Çıkış: %b (Güçlü 1 İletildi)", in, out);

    // 2. Anahtar KAPALI (en=0, en_b=1) -> Yüksek Empedans (Hi-Z)
    en = 0; en_b = 1;
    in = 1; #10;
    $display("EN=0 | Giriş: %b -> Çıkış: %b (Hi-Z Yüksek Empedans!)", in, out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== CMOS İletim Kapısı (Transmission Gate) Testi ===",
        "EN=1 | Giriş: 0 -> Çıkış: 0 (Güçlü 0 İletildi)",
        "EN=1 | Giriş: 1 -> Çıkış: 1 (Güçlü 1 İletildi)",
        "EN=0 | Giriş: 1 -> Çıkış: z (Hi-Z Yüksek Empedans!)",
      ],
    },
    quiz: {
      question: "Bir devrede mantık '1' seviyesini taşımak için tek başına NMOS transistör kullanıldığında karşılaşılan temel problem nedir?",
      options: [
        "A) Transistörün aşırı akım çekip yanması",
        "B) Çıkış geriliminin VDD seviyesine ulaşamayıp (VDD - Vt) seviyesinde kilitlenmesi (Zayıf 1 problemi)",
        "C) Çıkışın terslenerek 0'a dönüşmesi",
        "D) Frekansın iki katına çıkması",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! NMOS transistör çıkışı VDD'ye yaklaştıkça Vgs gerilimi azalır ve Vout = VDD - Vt olduğunda transistör kapanır; bu nedenle tek başına NMOS zayıf 1 iletir.",
    },
  },

  // ========================================================
  // BÖLÜM 3: SUBTHRESHOLD LEAKAGE & SHORT CHANNEL EFFECTS
  // ========================================================
  "df-leakage-short-channel": {
    id: "df-leakage-short-channel",
    badge: "Bölüm 3 • Transistör Fiziği",
    readingTime: "17 dk okuma",
    level: "İleri Seviye",
    title: "Kaçak Akımlar ve Kısa Kanal Etkileri (Leakage & Short-Channel Effects)",
    subtitle:
      "DIBL (Drain-Induced Barrier Lowering), alt-eşik kaçağı, kapı oksit tünellemesi, yığın etkisi (Stack Effect) ve FinFET / GAAFET devrimi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Transistör boyutları nanometre seviyelerine indikçe klasik fiziğin çöküşü ve ortaya çıkan parazitik etkiler:
- Transistör kapalıyken ($V_{GS} = 0$) neden hala akım akmaya devam eder?
- **Alt-Eşik Kaçağı (Subthreshold Leakage)** ve Alt-Eşik Salınımı ($S$).
- Neden eşik gerilimini ($V_t$) keyfimizce sıfıra indiremeyiz?
- **Kısa Kanal Etkileri (Short-Channel Effects - SCE):** DIBL (Drain-Induced Barrier Lowering) ve $V_t$ düşüşü.
- Diğer kaçak yolları: Kapı oksit tünellemesi ($I_{gate}$) ve Birleşim ters kaçak akımı ($I_{rev}$).
- Güç tasarrufu mimarileri: Güç Kapılama (Power Gating) ve Yığın Etkisi (Stack Effect).
- Düzlemsel (Planar) transistörlerin sonu: **FinFET** ve **GAAFET (Gate-All-Around)** 3D mimarileri.`,
      },
      {
        title: "2. Alt-Eşik Kaçağı: Kapalı Transistör Neden Akım Akıtır?",
        content: `![Kısa Kanal Etkileri ve Başlıca Sızıntı Akımı Yolları](/images/digital/2.5-short-channel-effects.svg)

Klasik dijital mantıkta transistör $V_{GS} < V_t$ olduğunda tamamen kapalı kabul edilir. Ancak kuantum ve istatistiksel mekanik açısından Boltzmann dağılımı gereği bazı elektronlar daima yüksek termal enerjiye sahiptir ve potansiyel bariyerini aşabilir.

Alt-eşik bölgesinde akım voltajla üstel olarak değişir:
$$I_{sub} \\propto \\exp\\left(\\frac{V_{GS} - V_t}{n \\cdot V_T}\\right)$$

- **Alt-Eşik Salınımı (Subthreshold Swing - $S$):** Akımı 10 kat (1 dekad) azaltmak için kapı gerilimini ne kadar düşürmemiz gerektiğini gösterir:
$$S = n \\cdot \\left(\\frac{kT}{q}\\right) \\ln(10) \\approx 60 - 90\\text{ mV/dekad}$$
Oda sıcaklığında teorik fiziksel alt sınır **$60\\text{ mV/dekad}$**'dır! Yani $V_t$'yi her $60-80\\text{ mV}$ düşürdüğünüzde, kapalı durumdaki kaçak akım tam **10 KAT ARTAR!** İşte bu yüzden işlemcilerde $V_t$ keyfi olarak sıfıra indirilemez!`,
      },
      {
        title: "3. DIBL (Drain-Induced Barrier Lowering)",
        content: `Uzun kanallı bir transistörde kanal potansiyel bariyeri yalnızca kapı gerilimi ($V_{GS}$) tarafından kontrol edilir; savak ($V_{DS}$) uzakta olduğu için bariyere karışamaz.

Ancak kanal uzunluğu ($L$) onlarca nanometreye indiğinde:
1. Savak bölgesi kaynağa o kadar yaklaşır ki, savağa uygulanan pozitif gerilimin ($V_{DS}$) elektrik alanı kaynağın önündeki potansiyel engelini fiziksel olarak aşağı çeker!
2. Bu olaya **DIBL (Drain-Induced Barrier Lowering)** denir.
3. Kapı hiçbir şey yapmasa bile, sadece $V_{DS}$ yüksek olduğu için transistörün eşik gerilimi ($V_t$) kendiliğinden düşer!
4. Sonuç: Kapalı transistörden devasa bir kaçak akım fışkırır ve transistörü tamamen kapatmak imkansız hale gelir.`,
      },
      {
        title: "4. Yığın Etkisi (Stack Effect) ve Güç Kapılama",
        content: `Çip tasarımcıları kaçak akımı durdurmak için akıllıca mimari teknikler kullanır:

- **Yığın Etkisi (Stack Effect):** İki veya daha fazla kapalı transistör arka arkaya (seri) bağlandığında aralarındaki ara düğüm voltajı hafifçe yükselir ($V_{mid} > 0$). Bu durum üstteki transistörde negatif bir $V_{GS}$ ve pozitif bir $V_{SB}$ (Body Effect) yaratarak kaçak akımı **10 ila 100 kat azaltır!**
- **Güç Kapılama (Power Gating - Sleep Transistors):** Kullanılmayan CPU çekirdeklerinin veya GPU bloklarının güç hattı arasına yüksek $V_t$'li devasa bir "Uyku Transistörü" (Sleep PMOS/NMOS) konur. Blok boştayken bu transistör kapatılarak bloğun tüm elektriği fiziksel olarak kesilir ve kaçak akım sıfırlanır.`,
      },
      {
        title: "5. Planar MOSFET'in Sonu: FinFET ve GAAFET Devrimi",
        content: `2011 yılına kadar tüm transistörler silikon yüzeyinde düzlemsel (Planar) idi. Ancak 20nm altına inildiğinde DIBL ve alt-eşik kaçakları düzlemsel yapıyı çalışamaz hale getirdi:

1. **FinFET (3D Fin Transistor - 22nm'den 3nm'ye):**
   - Kanal düz bir şerit olmaktan çıkarılıp dikey bir silikon "yüzgeç" (Fin) haline getirildi.
   - Kapı elektrodu bu yüzgeci **3 taraftan sardı!** (Üstten, sağdan, soldan).
   - Kapının elektrostatik kontrolü o kadar güçlendi ki savak alanı bariyere müdahale edemez hale geldi ve DIBL bastırıldı.
2. **GAAFET (Gate-All-Around / Nanosheet - 3nm, 2nm ve ötesi):**
   - Silikon kanallar yatay nano-şeritler (Nanosheets) olarak üst üste dizildi.
   - Kapı elektrodu kanalı **4 taraftan tamamen çevreledi!**
   - Kaçak akım kontrolünde kuantum sınırlarına ulaşıldı.`,
      },
      {
        title: "6. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Dinamik güç ile statik kaçak gücünü aynı şey sanmak.**
  *Doğrusu:* Dinamik güç transistörler açılıp kapanırken ($P = C V^2 f$) harcanır; statik kaçak gücü ise saat sinyali tamamen dursa bile transistörlerin altından sızan akımla ($P = V_{DD} \\cdot I_{leak}$) sürekli harcanır.
- **Hata #2: Eşik gerilimini düşürmenin sadece hız kazandırdığını sanmak.**
  *Doğrusu:* Eşik voltajındaki her $80\\text{ mV}$'luk düşüş pil ömrünü 10 kat kısaltan kaçak akım artışına yol açar.`,
      },
      {
        title: "7. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir telefon bekleme modundayken (ekran kapalı, işlemci uykuda) pilini tüketen temel donanımsal sebep nedir?**
*Cevap:* Trilyonlarca kapalı transistörden sızan alt-eşik kaçağı (subthreshold leakage) ve kapı tünelleme kaçak akımlarıdır.

**S2: FinFET teknolojisinde düzlemsel transistöre göre en büyük kazanç nedir?**
*Cevap:* Kapının kanalı 3 taraftan sarması sayesinde savak kaynaklı bariyer düşüşünü (DIBL) engellemesi ve kaçak akımı dramatik şekilde düşürmesidir.`,
      },
      {
        title: "8. Özet ve Temel Çıkarımlar",
        content: `- $V_{GS} < V_t$ bölgesinde alt-eşik akımı üstel olarak akar.
- Alt-eşik salınımı ($S$) oda sıcaklığında $60\\text{ mV/dekad}$ fiziksel sınırına sahiptir.
- DIBL kısa kanallarda savak voltajının eşik voltajını düşürmesidir.
- Yığın etkisi ve Güç Kapılama kaçak akımı önleyen temel ASIC teknikleridir.
- FinFET ve GAAFET mimarileri kapı kontrolünü 3 ve 4 boyuta taşıyarak nanometre çiplerin üretilmesini sağlamıştır.`,
      },
    ],
    playground: {
      title: "Alt-Eşik Kaçak Akımı ve Sıcaklık Katlanması Simülasyonu",
      filename: "tb_leakage.v",
      language: "verilog",
      initialCode: `// Alt-Eşik Kaçak Akımı: I_leak = I0 * 10^((Vgs - Vt) / S)
module tb_leakage;
  real I0, Vt, Vgs, S;
  real I_leak_25C, I_leak_85C;

  initial begin
    I0 = 1.0e-7;   // 100 nA
    Vt = 0.35;     // 350 mV eşik voltajı
    Vgs = 0.0;     // Transistör KAPALI (0V)
    S = 0.080;     // 80 mV / dekad salınım

    // 25°C Oda Sıcaklığında Kaçak
    I_leak_25C = I0 * (10.0 ** ((Vgs - Vt) / S));

    // 85°C Sıcaklıkta Kaçak (Üstel katlanma)
    I_leak_85C = I_leak_25C * 15.0; // 15 kat artış

    $display("=== Transistör Kapalı Durum Kaçak Akım Analizi ===");
    $display("Vgs = 0V, Vt = 350 mV, S = 80 mV/dekad");
    $display("25 °C Kaçak Akımı : %7.3e A (Tipik Uyku Akımı)", I_leak_25C);
    $display("85 °C Kaçak Akımı : %7.3e A (15 KAT FAZLA PİL TÜKETİMİ!)", I_leak_85C);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Transistör Kapalı Durum Kaçak Akım Analizi ===",
        "Vgs = 0V, Vt = 350 mV, S = 80 mV/dekad",
        "25 °C Kaçak Akımı : 4.217e-12 A (Tipik Uyku Akımı)",
        "85 °C Kaçak Akımı : 6.325e-11 A (15 KAT FAZLA PİL TÜKETİMİ!)",
      ],
    },
    quiz: {
      question: "Modern işlemcilerde transistörlerin eşik voltajını (Vt) 0.1V gibi çok düşük değerlere indiremememizin ana nedeni nedir?",
      options: [
        "A) Transistörün hızının çok fazla artacak olması",
        "B) Alt-eşik salınımı (S ≈ 80 mV/dekad) nedeniyle kapalı durumdaki statik kaçak akımının üstel olarak fırlayıp çipin pilini saniyeler içinde tüketmesi ve aşırı ısınması",
        "C) Oksit tabakasının kalınlaşması",
        "D) Verilog simülatörlerinin hata vermesi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Alt-eşik salınımı gereği Vt her 80 mV azaldığında kaçak akım 10 kat katlanır. Vt = 0.1V yapılırsa kapalı durumdaki kaçak akımı milyonlarca kat artarak devasa statik güç tüketimine yol açar.",
    },
  },
};
