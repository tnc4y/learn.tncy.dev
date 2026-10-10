import { LessonContent } from "./lessonsData";

export const DIGITAL_FUNDAMENTALS_PART2: Record<string, LessonContent> = {
  // ========================================================
  // BÖLÜM 4: CMOS MANTIĞI VE KAPILAR (CMOS LOGIC GATES)
  // ========================================================
  "df-cmos-inverter": {
    id: "df-cmos-inverter",
    badge: "Bölüm 4 • CMOS Mantığı",
    readingTime: "15 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "CMOS Evirici (The CMOS Inverter)",
    subtitle:
      "Pull-Up ve Pull-Down ağları, geçiş anı ve kısa devre akımı, yükselme/düşme zamanları (tr/tf) ve boyutlandırma dengesi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `CMOS teknolojisinin temel taşı olan **CMOS Evirici (Inverter)** devresinin iç yapısı ve çalışma dinamiği:
- Bir PMOS ve bir NMOS'un nasıl bir araya gelerek kusursuz bir mantık kapısı oluşturduğu.
- **Pull-Up Network (PUN)** ve **Pull-Down Network (PDN)** mimarisi.
- Statik güç tüketiminin neden sıfıra yakın olduğu.
- Giriş geçiş anında ($V_{in} \\approx V_{DD}/2$) iki transistörün aynı anda açılması ve **Kısa Devre Akımı ($I_{sc}$)**.
- Yükselme süresi ($t_{rise}$), Düşme süresi ($t_{fall}$) ve $W_p / W_n$ boyutlandırma dengesi.
- Inverter'ların çip içinde neden tampon (Buffer) ve saat sürücüsü olarak kullanıldığı.`,
      },
      {
        title: "2. Pull-Up ve Pull-Down Yapısı",
        content: `CMOS (Complementary Metal-Oxide-Semiconductor) kelimesi "tamamlayıcı" anlamına gelir. Devre iki zıt kutuptan oluşur:

1. **Pull-Up Ağı (PUN):** VDD güç rayı ile çıkış arasına yerleştirilmiş **PMOS** transistör. Çıkışı Mantık 1'e ($V_{DD}$) çeker.
2. **Pull-Down Ağı (PDN):** Çıkış ile GND toprak rayı arasına yerleştirilmiş **NMOS** transistör. Çıkışı Mantık 0'a ($0\\text{ V}$) çeker.

| Giriş ($V_{in}$) | PMOS Durumu | NMOS Durumu | Çıkış Bağlantısı | Çıkış Gerilimi ($V_{out}$) | Mantık Seviyesi |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **0 (0V)** | **AÇIK (İletimde)** | **KAPALI (Yalıtımda)** | VDD'ye bağlı | $V_{DD}$ (Tam Gerilim) | **1** |
| **1 ($V_{DD}$)** | **KAPALI (Yalıtımda)** | **AÇIK (İletimde)** | GND'ye bağlı | $0\\text{ V}$ (Tam Toprak) | **0** |

**Sıfır Statik Güç:**
Devre kararlı bir durumda (0 veya 1) beklerken, transistörlerden biri daima tamamen kapalıdır. VDD'den GND'ye doğrudan hiçbir yol yoktur; bu nedenle CMOS inverter statik durumda neredeyse **SIFIR güç tüketir!**`,
      },
      {
        title: "3. Geçiş Anı: Kısa Devre ve Dinamik Güç",
        content: `Giriş 0'dan 1'e veya 1'den 0'a geçerken, ara voltaj seviyesinde ($V_{in} \\approx V_{DD}/2$):
- Hem PMOS hem de NMOS aynı anda doyum bölgesinde açık kalır!
- VDD güç rayından doğrudan GND rayına birkaç yüz pikosaniyelik anlık bir akım darbesi akar. Buna **Kısa Devre Akımı (Short-Circuit Current - $I_{sc}$)** denir.

Ayrıca çıkışa bağlı yük kapasitansı ($C_L$), PMOS üzerinden VDD'den şarj edilir ve sonraki döngüde NMOS üzerinden toprağa deşarj edilir. Bir saat periyodunda harcanan dinamik enerji:
$$P_{dynamic} = C_L \\cdot V_{DD}^2 \\cdot f$$`,
      },
      {
        title: "4. Yükselme ve Düşme Zamanları: Wp / Wn Boyutlandırması",
        content: `Bir inverter'ın çıkışının 0'dan 1'e çıkma süresine **$t_{rise}$**, 1'den 0'a inme süresine **$t_{fall}$** denir.
- Çıkışı 1'e çeken PMOS transistördür: Direnci $R_p \\propto 1 / (\\mu_p W_p)$.
- Çıkışı 0'a çeken NMOS transistördür: Direnci $R_n \\propto 1 / (\\mu_n W_n)$.

Silikonda elektron hareketliliği delik hareketliliğinden 2.5 kat büyüktür ($\mu_n \approx 2.5 \mu_p$).
Eğer PMOS ve NMOS aynı genişlikte yapılırsa ($W_p = W_n$), PMOS'un direnci 2.5 kat büyük olur ve çıkışın yükselmesi düşmesinden 2.5 kat daha yavaş sürer ($t_{rise} \\gg t_{fall}$).

**Simetri Çözümü:**
Eşit yükselme ve düşme süresi ($t_{rise} \\approx t_{fall}$) ve simetrik anahtarlama eşiği ($V_M = V_{DD}/2$) elde etmek için standart hücre kütüphanelerinde daima:
$$\\frac{W_p}{W_n} \\approx 2 - 2.5$$
oranı uygulanır!`,
      },
      {
        title: "5. Tamponlar (Buffers): Neden İki Inverter Arka Arkaya Konur?",
        content: `Çip tasarımında bir sinyalin mantıksal değerini değiştirmeden akım sürme gücünü artırmak için **Tampon (Buffer)** kullanılır.
Tek bir non-inverting mantık hücresi üretmek CMOS fiziğinde mümkün değildir; çünkü tek bir CMOS aşaması doğal olarak daima eviricidir (Inverting).
Bu nedenle her dijital buffer hücresi, arka arkaya bağlanmış **iki adet CMOS inverter'dan** oluşur ($(\\overline{\\overline{A}}) = A$). İkinci inverter ilkinden 3-4 kat daha büyük yapılarak yüksek fan-out hatlarını sürmesi sağlanır.`,
      },
      {
        title: "6. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Inverter çıkışının boşta iken havada (Hi-Z) kaldığını sanmak.**
  *Doğrusu:* Inverter çıkışı daima ya düşük dirençli bir PMOS ile VDD'ye ya da düşük dirençli bir NMOS ile GND'ye sımsıkı bağlıdır; asla havada kalmaz.
- **Hata #2: CMOS inverter'ın hiç güç tüketmediğini düşünmek.**
  *Doğrusu:* Statik durumda güç sıfıra yakındır; ancak yüksek frekanslarda saat sinyaliyle açılıp kapandıkça dinamik güç ($C V^2 f$) harcar.`,
      },
      {
        title: "7. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir inverter'ın girişine tam VDD/2 voltajı uygulanırsa ne olur?**
*Cevap:* Hem PMOS hem NMOS transistör aynı anda tam iletime geçer ve VDD'den GND'ye sürekli bir kısa devre akımı akarak çipin aşırı ısınmasına yol açar (Analog meta-kararsızlık durumu).

**S2: Wp/Wn oranı neden 1 yapılmaz?**
*Cevap:* Delik hareketliliği elektron hareketliliğinden ~2.5 kat yavaş olduğu için yükselme süresi düşme süresinden çok daha uzun olur ve sinyal simetrisi bozulur.`,
      },
      {
        title: "8. Özet ve Temel Çıkarımlar",
        content: `- CMOS Inverter, VDD'ye bağlı PMOS (Pull-up) ve GND'ye bağlı NMOS (Pull-down) ikilisinden oluşur.
- Statik güç tüketimi sıfıra yakındır çünkü iki transistör aynı anda asla sürekli açık kalmaz.
- Simetrik gecikme ($t_r = t_f$) için $W_p / W_n \approx 2$ ile $2.5$ arasında boyutlandırılır.
- Mantık tamponları (Buffers), iki inverter'ın ardışık bağlanmasıyla inşa edilir.`,
      },
    ],
    playground: {
      title: "CMOS Inverter Sentezlenebilir Davranış Testi",
      filename: "tb_inverter.v",
      language: "verilog",
      initialCode: `// CMOS Inverter RTL ve Testbench
module cmos_inverter (
  input wire a,
  output wire y
);
  assign y = ~a;
endmodule

module tb_inv;
  reg a;
  wire y;

  cmos_inverter uut (.a(a), .y(y));

  initial begin
    $display("=== CMOS Inverter Doğruluk Testi ===");
    a = 0; #10;
    $display("Giriş: %b -> Çıkış: %b (PMOS VDD İletimi)", a, y);
    a = 1; #10;
    $display("Giriş: %b -> Çıkış: %b (NMOS GND İletimi)", a, y);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== CMOS Inverter Doğruluk Testi ===",
        "Giriş: 0 -> Çıkış: 1 (PMOS VDD İletimi)",
        "Giriş: 1 -> Çıkış: 0 (NMOS GND İletimi)",
      ],
    },
    quiz: {
      question: "CMOS devresinde statik (bekleme durumundaki) güç tüketiminin ihmal edilecek kadar küçük olmasının temel sebebi nedir?",
      options: [
        "A) Transistörlerin süperiletken malzemeden yapılması",
        "B) Kararlı durumlarda Pull-Up (PMOS) ve Pull-Down (NMOS) ağlarından en az birinin tamamen kapalı olması ve VDD-GND arası doğrudan yol bulunmaması",
        "C) Kapı kapasitansının sıfır olması",
        "D) Giriş geriliminin daima 0V olması",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Giriş 0 iken NMOS kapalıdır, giriş 1 iken PMOS kapalıdır. Bu sayede VDD rayı ile GND arasında hiçbir zaman doğrudan DC akım yolu oluşmaz.",
    },
  },

  // ========================================================
  // BÖLÜM 4: CMOS NAND GATE
  // ========================================================
  "df-cmos-nand": {
    id: "df-cmos-nand",
    badge: "Bölüm 4 • CMOS Mantığı",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "CMOS NAND Kapısı (CMOS NAND Gate)",
    subtitle:
      "Seri NMOS pull-down, paralel PMOS pull-up, NAND2 transistör boyutlandırması ve CMOS'ta NAND'ın neden NOR'a üstün olduğu.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital tasarımda en çok kullanılan evrensel kapı olan **2-Girişli CMOS NAND (NAND2)** kapısının transistör mimarisi:
- İki girişli NAND kapısının transistör bağlantı şeması: **Paralel PMOS** pull-up ve **Seri NMOS** pull-down.
- De Morgan kuralının silikon transistör seviyesindeki fiziksel karşılığı.
- Transistör boyutlandırma (Sizing): İki seri NMOS'un direncini kompanse etmek için $2X$ boyutlandırma kuralı.
- Silikon fiziğinde **NAND kapısının neden daima NOR kapısından daha hızlı ve küçük olduğu**.
- Verilog switch-level ve RTL modellemesi.`,
      },
      {
        title: "2. NAND2 Devre Yapısı ve Çalışma Prensibi",
        content: `NAND mantığı: Çıkış Yalnızca $A=1$ VE $B=1$ olduğunda 0 olur; diğer tüm durumlarda 1'dir ($Y = \\overline{A \\cdot B}$).

1. **Pull-Down Ağı (NMOS):** Çıkışı 0'a çekmek için HEM $A$ HEM DE $B$ açık olmalıdır. Bu yüzden iki NMOS transistör **SERİ (Series)** bağlanır!
2. **Pull-Up Ağı (PMOS):** Çıkışı 1'e çekmek için $A=0$ VEYA $B=0$ olması yeterlidir. Bu yüzden iki PMOS transistör **PARALEL (Parallel)** bağlanır!

| Giriş A | Giriş B | PMOS A | PMOS B | NMOS A | NMOS B | Çıkış ($Y$) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | AÇIK | AÇIK | KAPALI | KAPALI | **1** |
| 0 | 1 | AÇIK | KAPALI | KAPALI | AÇIK | **1** |
| 1 | 0 | KAPALI | AÇIK | AÇIK | KAPALI | **1** |
| 1 | 1 | KAPALI | KAPALI | AÇIK | AÇIK | **0** |`,
      },
      {
        title: "3. Transistör Boyutlandırması (Sizing): 2X Kuralı",
        content: `İki direnç seri bağlandığında eşdeğer direnç iki katına çıkar ($R_{total} = R_1 + R_2 = 2R$).
NAND2 kapısında iki NMOS transistör seri bağlı olduğu için, standart bir inverter ile aynı düşme süresini ($t_{fall}$) yakalayabilmek için her iki NMOS'un genişliği **2 katına ($W_n = 2$)** çıkarılmalıdır!

PMOS transistörler ise paralel bağlıdır; en kötü durumda sadece biri açık kalarak çıkışı şarj eder. Bu nedenle PMOS genişliği standart inverter ile aynı kalabilir ($W_p = 2$).
- NAND2 Transistör Boyutları: $W_{n1} = W_{n2} = 2$, $W_{p1} = W_{p2} = 2$.
Toplam transistör genişliği: $2 + 2 + 2 + 2 = 8$ birim.`,
      },
      {
        title: "4. Neden CMOS'ta NAND Kapısı NOR Kapısından Çok Daha İyidir?",
        content: `Tüm ASIC ve standart hücre kütüphanelerinde kapıların ezici çoğunluğu NAND tabanlıdır. Bunun nedeni katı hal elektroniği fiziğidir:
- **NAND:** Hızlı elektronlarla çalışan **NMOS'lar seridir** ($2X$ büyütmek yeterlidir); yavaş deliklerle çalışan PMOS'lar paraleldir.
- **NOR:** Yavaş deliklerle çalışan **PMOS'lar seridir!** İki PMOS'u seri bağlarsanız ve delikler zaten 2.5 kat yavaşsa, PMOS'ları **$4X - 5X$** devasa boyutlara büyütmeniz gerekir!
Sonuç: CMOS NOR kapısı, CMOS NAND kapısına göre hem **daha yavaştır** hem de silikonda **çok daha fazla alan kaplar!**`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: NAND kapısında PMOS'ları seri bağlamaya çalışmak.**
  *Doğrusu:* PMOS'ları seri bağlarsanız NOR kapısı elde edersiniz; NAND için pull-up paralel olmak zorundadır.
- **Hata #2: Seri bağlı NMOS'ların boyutunu artırmayı unutmak.**
  *Doğrusu:* Seri bağlı transistörler boyutlandırılmazsa pull-down direnci iki katına çıkar ve kapının yayılma gecikmesi iki kat yavaşlar.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 3 girişli bir NAND kapısında (NAND3) kaç transistör bulunur?**
*Cevap:* 3 paralel PMOS ve 3 seri NMOS olmak üzere toplam **6 transistör** bulunur.

**S2: NAND kapısının girişlerinden biri 0'a çekilirse çıkış ne olur?**
*Cevap:* Diğer giriş ne olursa olsun çıkış anında 1 olur (NAND kontrol kapılama özelliği).`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- NAND2 kapısı 2 paralel PMOS ve 2 seri NMOS içerir (toplam 4 transistör).
- Seri NMOS dirençlerini dengelemek için NMOS genişlikleri 2 katına çıkarılır.
- CMOS'ta elektronların deliklerden hızlı olması nedeniyle NAND kapıları NOR kapılarından daha küçük ve hızlıdır.`,
      },
    ],
    playground: {
      title: "Verilog CMOS NAND2 Davranış Doğrulaması",
      filename: "tb_nand2.v",
      language: "verilog",
      initialCode: `// 2-Girişli CMOS NAND Kapısı
module cmos_nand2 (
  input wire a,
  input wire b,
  output wire y
);
  assign y = ~(a & b);
endmodule

module tb_nand;
  reg a, b;
  wire y;

  cmos_nand2 uut (.a(a), .b(b), .y(y));

  initial begin
    $display("=== CMOS NAND2 Doğruluk Tablosu ===");
    a=0; b=0; #10; $display("%b NAND %b = %b", a, b, y);
    a=0; b=1; #10; $display("%b NAND %b = %b", a, b, y);
    a=1; b=0; #10; $display("%b NAND %b = %b", a, b, y);
    a=1; b=1; #10; $display("%b NAND %b = %b (Sadece İkisi 1 İken 0)", a, b, y);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== CMOS NAND2 Doğruluk Tablosu ===",
        "0 NAND 0 = 1",
        "0 NAND 1 = 1",
        "1 NAND 0 = 1",
        "1 NAND 1 = 0 (Sadece İkisi 1 İken 0)",
      ],
    },
    quiz: {
      question: "2 girişli bir CMOS NAND kapısında Pull-Down (GND'ye çeken) ağındaki transistörlerin bağlantı şekli nasıldır?",
      options: [
        "A) İki PMOS transistör seri bağlıdır",
        "B) İki NMOS transistör birbirine seri bağlıdır",
        "C) İki NMOS transistör birbirine paralel bağlıdır",
        "D) Bir NMOS ve bir PMOS paralel bağlıdır",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Çıkışın 0 olması için hem A hem de B girişinin 1 olması gerekir; bu mantıksal VE koşulu iki NMOS transistörün seri bağlanmasıyla sağlanır.",
    },
  },

  // ========================================================
  // BÖLÜM 4: CMOS NOR GATE
  // ========================================================
  "df-cmos-nor": {
    id: "df-cmos-nor",
    badge: "Bölüm 4 • CMOS Mantığı",
    readingTime: "14 dk okuma",
    level: "Orta Seviye",
    title: "CMOS NOR Kapısı ve Seri PMOS Cezası (CMOS NOR Gate)",
    subtitle:
      "Paralel NMOS pull-down, seri PMOS pull-up, delik hareketliliği nedeniyle boyutlandırma cezası ve silikon alanı maliyeti.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `CMOS mantığının diğer temel evrensel kapısı olan **2-Girişli CMOS NOR (NOR2)** devresinin fiziksel mimarisi:
- NOR2 kapısının transistör bağlantı şeması: **Seri PMOS** pull-up ve **Paralel NMOS** pull-down.
- NOR kapısında neden PMOS'ların seri bağlanmak zorunda olduğu ($Y = \\overline{A + B} = \\overline{A} \\cdot \\overline{B}$).
- **Seri PMOS Cezası:** Yavaş delikler nedeniyle PMOS genişliklerinin $4X$ büyütülme zorunluluğu.
- Neden mikroişlemci mimarlarının 3 veya 4 girişli NOR kapılarından kaçındığı.
- Verilog RTL ve testbench doğrulaması.`,
      },
      {
        title: "2. NOR2 Devre Yapısı ve Çalışma Prensibi",
        content: `NOR mantığı: Girişlerden HERHANGİ BİRİ 1 olduğunda çıkış 0 olur; çıkış yalnızca her iki giriş de 0 iken 1'dir ($Y = \\overline{A + B}$).

1. **Pull-Down Ağı (NMOS):** $A=1$ VEYA $B=1$ olduğunda çıkış 0'a çekilmelidir. Bu nedenle iki NMOS transistör **PARALEL** bağlanır.
2. **Pull-Up Ağı (PMOS):** Çıkışı 1'e çekmek için HEM $A=0$ HEM DE $B=0$ olmalıdır. Bu nedenle iki PMOS transistör **SERİ** bağlanır!

| Giriş A | Giriş B | NMOS Durumu | PMOS Durumu | Çıkış ($Y$) |
| :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | İkisi de KAPALI | İkisi de AÇIK (Seri İletim) | **1** |
| 0 | 1 | B AÇIK (GND'ye çeker) | B KAPALI | **0** |
| 1 | 0 | A AÇIK (GND'ye çeker) | A KAPALI | **0** |
| 1 | 1 | İkisi de AÇIK | İkisi de KAPALI | **0** |`,
      },
      {
        title: "3. Boyutlandırma Cezası: Seri PMOS Neden Pahalıdır?",
        content: `Hatırlayın: Delik hareketliliği zayıftır ($\mu_p \approx 0.4 \mu_n$). Tek bir PMOS zaten eşdeğer bir NMOS'tan 2 kat geniştir ($W_p = 2$).

NOR2 kapısında iki PMOS transistör birbirine **seri** bağlanmıştır!
İki seri direnç toplandığı için ($R_p + R_p = 2 R_p$), inverter ile aynı yükselme süresini elde etmek için her bir PMOS'un genişliği **iki kat daha büyütülmelidir:**
$$W_{p1} = W_{p2} = 2 \\times 2 = 4$$
- NMOS genişlikleri: Paralel oldukları için $W_{n1} = W_{n2} = 1$.
- Toplam transistör genişliği: $4 + 4 + 1 + 1 = 10$ birim! (NAND2'nin 8 birimine karşılık %25 daha büyük ve devasa giriş kapasitansı).

Eğer 3 girişli bir NOR kapısı (NOR3) yapmaya kalkarsanız, 3 seri PMOS için genişlikleri $6X$ yapmanız gerekir; bu da silikon alanını ve giriş gecikmesini mahveder! Bu yüzden standart hücre kütüphanelerinde NOR3 veya NOR4 neredeyse hiç kullanılmaz.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: NAND ve NOR kapılarının aynı hız ve alana sahip olduğunu varsaymak.**
  *Doğrusu:* CMOS teknolojisinde NAND daima NOR'dan daha hızlı ve daha küçüktür.
- **Hata #2: Seri bağlı PMOS'ların eşik düşüşü (Body Effect) yaşamadığını sanmak.**
  *Doğrusu:* Üstteki PMOS transistörün kaynağı VDD'de değil ara düğümdedir; bu durum gövde etkisi yaratarak PMOS'u daha da yavaşlatır.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir çip tasarımcısı lojik sentez yaparken neden öncelikle NAND kapılarını tercih eder?**
*Cevap:* NAND kapısında seri transistörler hızlı elektronlarla çalışan NMOS'lardır; bu da daha az silikon alanı ve daha yüksek anahtarlama hızı sağlar.

**S2: NOR2 kapısında her iki giriş de 1 iken çıkış neden 0'a çok hızlı düşer?**
*Cevap:* Her iki paralel NMOS transistör de aynı anda iletime geçerek toprağa iki kat daha düşük dirençli çift paralel yol açar.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- NOR2 kapısı 2 seri PMOS ve 2 paralel NMOS transistörden oluşur.
- Seri PMOS bağlantısı zayıf delik hareketliliği nedeniyle büyük alan cezası ($W_p \\approx 4$) getirir.
- Çok girişli NOR kapıları (NOR3, NOR4) aşırı yavaş oldukları için modern kütüphanelerde tercih edilmez.`,
      },
    ],
    playground: {
      title: "Verilog CMOS NOR2 Davranış Doğrulaması",
      filename: "tb_nor2.v",
      language: "verilog",
      initialCode: `// 2-Girişli CMOS NOR Kapısı
module cmos_nor2 (
  input wire a,
  input wire b,
  output wire y
);
  assign y = ~(a | b);
endmodule

module tb_nor;
  reg a, b;
  wire y;

  cmos_nor2 uut (.a(a), .b(b), .y(y));

  initial begin
    $display("=== CMOS NOR2 Doğruluk Tablosu ===");
    a=0; b=0; #10; $display("%b NOR %b = %b (Sadece İkisi 0 İken 1)", a, b, y);
    a=0; b=1; #10; $display("%b NOR %b = %b", a, b, y);
    a=1; b=0; #10; $display("%b NOR %b = %b", a, b, y);
    a=1; b=1; #10; $display("%b NOR %b = %b", a, b, y);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== CMOS NOR2 Doğruluk Tablosu ===",
        "0 NOR 0 = 1 (Sadece İkisi 0 İken 1)",
        "0 NOR 1 = 0",
        "1 NOR 0 = 0",
        "1 NOR 1 = 0",
      ],
    },
    quiz: {
      question: "CMOS NOR kapılarının silikon üzerinde CMOS NAND kapılarına göre daha büyük alan kaplamasının ve daha yavaş olmasının temel nedeni nedir?",
      options: [
        "A) Giriş voltajının daha yüksek olması",
        "B) Yavaş delik hareketliliğine sahip PMOS transistörlerin Pull-Up ağında seri bağlanmak zorunda olması ve direnci telafi etmek için kanal genişliklerinin (Wp) çok büyütülmesi",
        "C) Toprak hattının dirençli olması",
        "D) NMOS transistörlerin paralel bağlanamaması",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! NOR kapısında PMOS'lar seridir. Delikler elektronlardan 2.5 kat yavaş olduğundan iki seri PMOS devasa direnç oluşturur; bunu telafi etmek için transistörler çok geniş (Wp ≈ 4) yapılmalıdır, bu da alanı ve giriş kapasitansını artırır.",
    },
  },

  // ========================================================
  // BÖLÜM 4: GATE SIZING & DRIVE STRENGTH
  // ========================================================
  "df-gate-sizing": {
    id: "df-gate-sizing",
    badge: "Bölüm 4 • CMOS Mantığı",
    readingTime: "15 dk okuma",
    level: "İleri Seviye",
    title: "Kapı Boyutlandırma ve Sürüş Gücü (Gate Sizing & FO4 Delay)",
    subtitle:
      "Sürüş gücü (1X, 2X, 4X, 8X hücreler), FO4 (Fanout-of-4) gecikme metriği, konik tamponlama (Tapered Buffer Trees) ve mantıksal efor.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Standart hücre kütüphanelerinde (Standard Cell Libraries) kapı boyutlandırma prensipleri:
- Sürüş Gücü (Drive Strength - 1X, 2X, 4X, 8X, 16X) nedir ve neyi ifade eder?
- Daha büyük transistör kullanmanın maliyeti: Giriş kapasitansının artması!
- **FO4 (Fanout-of-4) Gecikmesi:** Süreç teknolojilerinin hızını karşılaştırmak için kullanılan evrensel altın standart metrik.
- Büyük yük kapasitanslarını (uzun teller, saat ağları) sürmek için **Konik Tampon Zincirleri (Tapered Buffers)**.
- Optimal kademe ölçekleme katsayısı ($e \\approx 2.718$ veya $\\sim 3 - 4$).`,
      },
      {
        title: "2. Sürüş Gücü (Drive Strength: 1X, 2X, 4X) Nedir?",
        content: `Bir standart hücre kütüphanesinde aynı mantığı yapan (örneğin INV veya NAND2) farklı boyutlarda hücreler bulunur:
- \`INV_X1\` (1X): Minimum boyutlu hücre. En az akımı çeker, çıkışı yavaş doldurur ama giriş kapasitansı çok küçüktür.
- \`INV_X4\` (4X): Kanal genişliği ($W$) 4 kat büyüktür. Direnci $1/4$'e iner; çıkışındaki yükü 4 kat daha hızlı şarj eder.
- \`INV_X16\` (16X): Devasa akım sürer; çip dışı pinleri veya devasa saat hatlarını sürmek için kullanılır.

**Tasarımcının Ödünleşimi (Trade-off):**
Transistörü büyütürseniz çıkışı sürme yeteneği artar; ancak transistörün kapı alanı ($W \\cdot L$) büyüdüğü için **Giriş Kapasitansı ($C_{in}$) da katlanır!** Yani bir kapıyı büyütmek, onu süren bir önceki kapıya daha büyük yük bindirir!`,
      },
      {
        title: "3. FO4 (Fanout-of-4) Gecikme Standardı",
        content: `Bir yarı iletken fabrikasının (TSMC, Intel, Samsung) sürecinin ne kadar hızlı olduğunu anlamak için evrensel bir ölçüt kullanılır: **FO4 Gecikmesi**.

**FO4 Tanımı:** Bir inverter'ın, kendisiyle tamamen aynı boyuttaki **4 adet inverter'ı** sürdüğü durumdaki yayılma gecikmesidir ($t_{pd}$).
- 180nm sürecinde: $FO4 \\approx 90\\text{ ps}$
- 65nm sürecinde: $FO4 \\approx 30\\text{ ps}$
- 7nm FinFET sürecinde: $FO4 \\approx 8 - 10\\text{ ps}$

Bir işlemcinin bir saat döngüsünde yapabileceği mantık derinliği doğrudan FO4 cinsinden hesaplanır (Örneğin modern bir 5 GHz işlemcinin bir saat periyodu sadece 15-20 FO4 gecikmesine eşittir!).`,
      },
      {
        title: "4. Devasa Yükleri Sürmek: Konik Tamponlar (Tapered Buffers)",
        content: `Küçük bir mantık kapısı doğrudan devasa bir kapasitansı (örneğin 1000fF'lik uzun bir metal hattı) sürmeye kalkarsa çıkış voltajı dakikalarca yükselemez ve korkunç bir gecikme oluşur.

Tek bir devasa inverter koymak da işe yaramaz çünkü bu devasa inverter'ın giriş kapasitansı önceki küçük kapıyı boğar!

**Optimal Çözüm: Kademeli (Konik) Tampon Zinciri:**
Araya her biri bir öncekinden $f$ kat (tipik olarak $f \\approx 3 - 4$) daha büyük olan ardışık inverter'lar zincir halinde dizilir:
$$f = \\sqrt[N]{\\frac{C_{load}}{C_{in}}}$$
Her kademe yükü adım adım büyütür. Bu yöntem toplam gecikmeyi minimuma indirir!`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Hızı artırmak için devredeki TÜM kapıları X16 veya X32 boyutuna çekmek.**
  *Doğrusu:* Tüm kapıları büyütürseniz giriş kapasitansları tavan yapar, birbirlerini süremez hale gelirler, çip devasa güç tüketir ve aşırı ısınır!
- **Hata #2: Sadece kritik yoldaki kapıları büyütüp önceki kapının gecikmesini hesaba katmamak.**
  *Doğrusu:* Bir kapıyı büyütmek önceki kapının gecikmesini artırır; sentez araçları bu dengeyi bulmak için otomatik optimizasyon algoritmaları kullanır.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir kütüphanede NAND2_X2 hücresi ne anlama gelir?**
*Cevap:* Standart 1X referans NAND2 hücresine göre 2 kat daha geniş transistörlere sahip, dolayısıyla 2 kat daha fazla akım sürebilen hücredir.

**S2: Büyük bir yükü tek adımda sürmek yerine neden kademeli inverter zinciri kullanılır?**
*Cevap:* Toplam gecikmeyi minimize etmek ve ilk kapının aşırı yüklenmesini önlemek için.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Sürüş gücü transistör genişliği ile artar ancak giriş kapasitansı cezasını beraberinde getirir.
- FO4 gecikmesi süreç hızını karşılaştırmak için teknoloji bağımsız evrensel metriktir.
- Konik tamponlama (Tapered buffer trees) kademeli ölçekleme ($f \\approx 3-4$) ile büyük yükleri minimum gecikmeyle sürer.`,
      },
    ],
    playground: {
      title: "Konik Tampon (Tapered Buffer) Gecikme Simülasyonu",
      filename: "tb_gate_sizing.v",
      language: "verilog",
      initialCode: `// Konik Tampon Gecikme Analizi: Tek Kademe vs 3 Kademeli Zincir
module tb_gate_sizing;
  real C_in, C_load;
  real gecikme_tek_kademe, gecikme_kademeli;

  initial begin
    C_in = 1.0;     // 1 fF giriş kapasitansı
    C_load = 64.0;  // 64 fF büyük hat yükü

    // 1. Tek kademe ile sürme: Gecikme orantılıdır C_load / C_in = 64 birim
    gecikme_tek_kademe = C_load / C_in;

    // 2. 3 kademeli zincir (Ölçek f = 4 -> 1X -> 4X -> 16X -> 64X Yük)
    // Her kademe f gecikmesi üretir: Toplam = 3 * 4 = 12 birim!
    gecikme_kademeli = 3.0 * 4.0;

    $display("=== Büyük Yük Sürme Gecikme Karşılaştırması (Yük: 64X) ===");
    $display("Tek Inverter ile Doğrudan Sürme : %5.1f birim gecikme (AŞIRI YAVAŞ!)", gecikme_tek_kademe);
    $display("3 Kademeli Konik Tampon Zinciri : %5.1f birim gecikme (%%81 HIZLANMA!)", gecikme_kademeli);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Büyük Yük Sürme Gecikme Karşılaştırması (Yük: 64X) ===",
        "Tek Inverter ile Doğrudan Sürme :  64.0 birim gecikme (AŞIRI YAVAŞ!)",
        "3 Kademeli Konik Tampon Zinciri :  12.0 birim gecikme (%81 HIZLANMA!)",
      ],
    },
    quiz: {
      question: "FO4 (Fanout-of-4) gecikme metriği nedir ve yarı iletken endüstrisinde neden kullanılır?",
      options: [
        "A) Çipin içindeki 4 fan motorunun soğutma süresidir",
        "B) Bir inverter'ın kendisiyle aynı boyuttaki 4 adet inverter'ı sürerken gösterdiği yayılma gecikmesidir ve süreç teknolojilerinin saf hızını kıyaslamak için kullanılır",
        "C) 4 girişli bir NAND kapısının alanıdır",
        "D) 4 bitlik toplayıcının saat periyodudur",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! FO4 gecikmesi, teknoloji süreçlerini kıyaslamada kullanılan altın standarttır. Bir inverter'ın 4 eşdeğer inverter yükünü şarj etme süresini ölçer.",
    },
  },

  // ========================================================
  // BÖLÜM 4: CMOS POWER DISSIPATION
  // ========================================================
  "df-cmos-power": {
    id: "df-cmos-power",
    badge: "Bölüm 4 • CMOS Mantığı",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "CMOS Güç Tüketimi (Dynamic, Short-Circuit & Static Power)",
    subtitle:
      "Dinamik anahtarlama gücü (C·V²·f), geçiş kısa devre gücü, statik kaçak gücü, saat kapılama (Clock Gating) ve DVFS.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Modern bir çipin güç tüketimini oluşturan 3 ana bileşen:
- **Dinamik Anahtarlama Gücü ($P_{dyn} = \\alpha C V_{DD}^2 f$):** Kapasitansların şarj/deşarj edilmesi.
- **Kısa Devre Gücü ($P_{sc}$):** Geçiş anında PMOS ve NMOS'un aynı anda açık kalması.
- **Statik Kaçak Gücü ($P_{stat} = V_{DD} \\cdot I_{leak}$):** Saat dursa bile transistörlerden sızan akım.
- Güç azaltma stratejileri: **Saat Kapılama (Clock Gating)** ve **DVFS (Dinamik Voltaj ve Frekans Ölçekleme)**.`,
      },
      {
        title: "2. Dinamik Anahtarlama Gücü ($P_{dyn}$)",
        content: `Bir CMOS kapısının çıkışı 0'dan 1'e geçerken, VDD güç kaynağından bir enerji çekilir ve yük kondansatörü ($C_L$) şarj edilir. Çıkış 1'den 0'a geçerken bu enerji NMOS üzerinden toprağa ısı olarak atılır.

$$P_{dyn} = \\alpha \\cdot C_L \\cdot V_{DD}^2 \\cdot f$$

Burada:
- $\\alpha$ (Aktivite Faktörü): Kapının her saat döngüsünde 0'dan 1'e geçme olasılığı (tipik olarak $\\alpha \\approx 0.1$).
- $C_L$: Toplam yük kapasitansı (kapı girişi + metal tel kapasitansı).
- $V_{DD}$: Çipin besleme voltajı (**Karesiyle orantılıdır!**). Voltajı %20 düşürmek gücü %36 azaltır!
- $f$: Saat frekansı. Frekans iki katına çıkarsa güç iki katına çıkar.`,
      },
      {
        title: "3. Kısa Devre ve Statik Kaçak Gücü",
        content: `Toplam çip gücü 3 bileşenin toplamıdır:
$$P_{total} = P_{dyn} + P_{sc} + P_{stat}$$

1. **Kısa Devre Gücü ($P_{sc}$):** Giriş sinyalinin yükselme/düşme süresi ($t_r, t_f$) boyunca her iki transistör açık kaldığı için harcanır (Toplam dinamik gücün yaklaşık %5 - %10'unu oluşturur).
2. **Statik Kaçak Gücü ($P_{stat}$):**
$$P_{stat} = V_{DD} \\cdot I_{leakage}$$
Çip hiçbir işlem yapmasa, saat tamamen dursa bile subthreshold ve gate kaçakları nedeniyle pilden sürekli akım çeker. Modern 3nm çiplerde statik güç toplam gücün **%30 - %50'sine** kadar ulaşabilir!`,
      },
      {
        title: "4. Düşük Güç Tasarım Teknikleri (Low-Power ASIC)",
        content: `Çip tasarımcıları gücü düşürmek için iki temel silah kullanır:

- **Saat Kapılama (Clock Gating):** Eğer bir register grubu o döngüde yeni veri yazmayacaksa, o bloğa giden saat sinyali bir AND/latch kapısıyla kesilir. Böylece $f=0$ olur ve dinamik anahtarlama gücü sıfırlanır! Modern CPU'larda güç tüketimini %40 azaltır.
- **DVFS (Dynamic Voltage and Frequency Scaling):** İşlemci ağır yük altında değilken işletim sistemi saat frekansını düşürür ve buna paralel olarak besleme voltajını ($V_{DD}$) da düşürür ($V_{DD}^2$ etkisiyle devasa pil tasarrufu sağlanır).`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Saat frekansını yarıya düşürünce toplam enerjinin yarıya ineceğini sanmak.**
  *Doğrusu:* Frekansı yarıya düşürürseniz saniyedeki güç ($P$) yarıya iner ancak görevin tamamlanma süresi iki katına çıkar; dolayısıyla o iş için harcanan dinamik enerji ($E = P \\cdot t$) aynı kalır! Enerjiyi gerçekten düşürmek için voltajı ($V_{DD}$) düşürmek şarttır.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir çipin voltajı 1.2V'tan 0.9V'a düşürülürse dinamik güç tüketimi ne kadar azalır?**
*Cevap:* Güç voltajın karesiyle orantılıdır: $(0.9 / 1.2)^2 = (0.75)^2 \\approx 0.56$. Güç **%44 azalır!**

**S2: Saat kapılama (Clock Gating) statik kaçak gücünü azaltır mı?**
*Cevap:* Hayır! Saat kapılama sadece dinamik anahtarlamayı ($f=0$) durdurur; transistörler açık VDD altında kaldığı için kaçak akım sızmaya devam eder. Kaçak akımı durdurmak için Güç Kapılama (Power Gating) gerekir.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Dinamik güç $P = \\alpha C V_{DD}^2 f$ formülüyle yönetilir; en etkili azaltma yöntemi voltajı düşürmektir.
- Statik güç voltaj ve kaçak akımın çarpımıdır ($V_{DD} \\cdot I_{leak}$).
- Saat kapılama dinamik gücü, güç kapılama statik gücü keser.
- DVFS modern işlemcilerde dinamik güç yönetiminin omurgasıdır.`,
      },
    ],
    playground: {
      title: "DVFS ile Güç Tasarrufu Hesaplama Simülasyonu",
      filename: "tb_cmos_power.v",
      language: "verilog",
      initialCode: `// CMOS Dinamik Güç Hesabı: P = C * V^2 * f
module tb_cmos_power;
  real C_load;
  real V_normal, f_normal, P_normal;
  real V_dvfs, f_dvfs, P_dvfs;

  initial begin
    C_load = 5.0e-9; // 5 nF çip kapasitansı

    // 1. Standart Yüksek Performans Modu (1.2V @ 2.0 GHz)
    V_normal = 1.2;
    f_normal = 2.0e9;
    P_normal = C_load * (V_normal * V_normal) * f_normal;

    // 2. DVFS Güç Tasarrufu Modu (0.8V @ 1.0 GHz)
    V_dvfs = 0.8;
    f_dvfs = 1.0e9;
    P_dvfs = C_load * (V_dvfs * V_dvfs) * f_dvfs;

    $display("=== DVFS Güç Tüketimi Analizi ===");
    $display("Normal Mod (1.2V, 2.0 GHz) : %5.2f Watt", P_normal);
    $display("DVFS Modu  (0.8V, 1.0 GHz) : %5.2f Watt (%%78 GÜÇ TASARRUFU!)", P_dvfs);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== DVFS Güç Tüketimi Analizi ===",
        "Normal Mod (1.2V, 2.0 GHz) : 14.40 Watt",
        "DVFS Modu  (0.8V, 1.0 GHz) :  3.20 Watt (%78 GÜÇ TASARRUFU!)",
      ],
    },
    quiz: {
      question: "Bir işlemcide besleme gerilimi (VDD) %20 oranında düşürüldüğünde dinamik güç tüketimi yaklaşık yüzde kaç azalır?",
      options: [
        "A) %20 azalır",
        "B) %36 azalır (çünkü güç voltajın karesiyle V² orantılıdır)",
        "C) %10 azalır",
        "D) Değişmez",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Dinamik güç formülü P = C · V² · f olduğundan, yeni güç (0.8)² = 0.64 katına iner. Yani güç tüketimi %36 oranında dramatik bir düşüş gösterir.",
    },
  },

  // ========================================================
  // BÖLÜM 4: AOI AND OAI COMPLEX GATES
  // ========================================================
  "df-aoi-oai-gates": {
    id: "df-aoi-oai-gates",
    badge: "Bölüm 4 • CMOS Mantığı",
    readingTime: "14 dk okuma",
    level: "Orta Seviye",
    title: "AOI ve OAI Karmaşık Kapıları (Complex CMOS Gates)",
    subtitle:
      "AND-OR-Invert ve OR-AND-Invert mimarisi, tek kademeli mantık sentezi, Euler yolu ve standart hücre yerleşim optimizasyonu.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Ayrık kapılar yerine tek bir CMOS hücresinde çoklu mantık fonksiyonu gerçekleştiren karmaşık kapılar:
- **AOI (AND-OR-Invert)** ve **OAI (OR-AND-Invert)** fonksiyonları.
- Bir Boole ifadesinin tek bir CMOS hücresinde doğrudan transistör ağına dönüştürülmesi ($Y = \\overline{AB + CD}$).
- Neden ayrık AND + OR + NOT kapıları yerine tek bir AOI hücresi kullanılır? (Gecikme ve alan kazancı).
- Pull-Up ve Pull-Down ağlarının ikilik (Duality) kuralı.`,
      },
      {
        title: "2. AOI22 Örneği: Y = ~( (A·B) + (C·D) )",
        content: `Klasik tasarımda $Y = \\overline{A B + C D}$ ifadesini yapmak için iki adet AND kapısı, bir adet OR kapısı ve bir adet NOT kapısı gerekir (Toplam 4 kapı, onlarca transistör ve 3 kademeli gecikme!).

Oysa CMOS mantığında bu ifade **TEK BİR HÜCREDE (AOI22)** yalnızca 8 transistörle çözülür:

1. **Pull-Down Ağı (NMOS):**
   - İfadenin tersi doğrudan NMOS ağını verir: $(A \\cdot B) + (C \\cdot D)$.
   - $A$ ve $B$ seri bağlanır.
   - $C$ ve $D$ seri bağlanır.
   - Bu iki seri kol birbirine **PARALEL** bağlanır!
2. **Pull-Up Ağı (PMOS):** İkilik (Duality) kuralı uygulanır:
   - Seri olanlar paralel, paralel olanlar seri yapılır!
   - $A$ ve $B$ paralel bağlanır.
   - $C$ ve $D$ paralel bağlanır.
   - Bu iki paralel grup birbirine **SERİ** bağlanır!`,
      },
      {
        title: "3. Standart Hücre Kazancı: Neden AOI/OAI?",
        content: `- **Hız (Gecikme):** Ayrık kapılarda sinyal 3 farklı kapının içinden geçer ($3 \\times t_{pd}$). AOI hücresinde sinyal tek bir transistör kademesinden geçer ($1 \\times t_{pd}$); gecikme yarı yarıya iner!
- **Silikon Alanı:** Transistör sayısı 16'dan 8'e düşer (%50 alan tasarrufu).
- **Güç:** Ara düğümlerdeki metal tel ve kapı kapasitansları yok olduğu için dinamik güç harcaması yarıya iner. Modern lojik sentez araçları (Synopsys Design Compiler) Boole ifadelerini daima AOI/OAI hücrelerine eşlemeye çalışır.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Pull-up ağını çizerken De Morgan kuralını yanlış uygulamak.**
  *Doğrusu:* NMOS ağında seri olan her şey PMOS ağında paralel, paralel olan her şey seri olmak zorundadır.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: AOI21 hücresinin lojik fonksiyonu nedir?**
*Cevap:* $Y = \\overline{(A \\cdot B) + C}$ (2 girişli bir VE ile 1 girişin VEYA'lanıp terslenmesi).

**S2: Bir CMOS hücresinin çıkışında doğal olarak neden daima bir tersleme (Invert) bulunur?**
*Cevap:* NMOS transistörler giriş 1 iken çıkışı 0'a, PMOS transistörler giriş 0 iken çıkışı 1'e çektiği için tüm temel CMOS aşamaları doğal olarak eviricidir.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- AOI ve OAI hücreleri karmaşık mantık ifadelerini tek bir transistör kademesinde çözer.
- Pull-down ağında VE=Seri, VEYA=Paralel NMOS yapılır.
- Pull-up ağında ikilik kuralıyla tam tersi PMOS ağı kurulur.
- Ayrık kapılara kıyasla %50 alan tasarrufu ve yarı yarıya gecikme kazancı sağlar.`,
      },
    ],
    playground: {
      title: "AOI22 Karmaşık Kapı Mantık Testi",
      filename: "tb_aoi22.v",
      language: "verilog",
      initialCode: `// AOI22 Kapısı: Y = ~((A & B) | (C & D))
module aoi22 (
  input wire a, b, c, d,
  output wire y
);
  assign y = ~((a & b) | (c & d));
endmodule

module tb_aoi;
  reg a, b, c, d;
  wire y;

  aoi22 uut (.a(a), .b(b), .c(c), .d(d), .y(y));

  initial begin
    $display("=== AOI22 Fonksiyon Testi ===");
    a=0; b=0; c=0; d=0; #10; $display("A=0,B=0,C=0,D=0 -> Y = %b", y);
    a=1; b=1; c=0; d=0; #10; $display("A=1,B=1 (Kol 1 Aktif) -> Y = %b (GND'ye Çekildi)", y);
    a=0; b=1; c=1; d=1; #10; $display("C=1,D=1 (Kol 2 Aktif) -> Y = %b (GND'ye Çekildi)", y);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== AOI22 Fonksiyon Testi ===",
        "A=0,B=0,C=0,D=0 -> Y = 1",
        "A=1,B=1 (Kol 1 Aktif) -> Y = 0 (GND'ye Çekildi)",
        "C=1,D=1 (Kol 2 Aktif) -> Y = 0 (GND'ye Çekildi)",
      ],
    },
    quiz: {
      question: "Y = ~((A & B) | C) mantık fonksiyonunu tek bir CMOS AOI hücresinde kurmak için Pull-Down ağında transistörler nasıl bağlanmalıdır?",
      options: [
        "A) A, B ve C hepsi birbirine seri bağlanır",
        "B) A ve B birbirine seri bağlanır; bu seri grup C transistörüne paralel bağlanır",
        "C) A ve B paralel bağlanır, C ile seri yapılır",
        "D) Sadece PMOS kullanılır",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Fonksiyondaki VE işlemi (A & B) seri NMOS bağlantısı, VEYA işlemi (| C) ise paralel kol bağlantısı demektir. Dolayısıyla seri bağlı A-B ikilisi, C transistörüne paralel bağlanır.",
    },
  },

  // ========================================================
  // BÖLÜM 5: BINARY AND DECIMAL SYSTEM
  // ========================================================
  "df-binary-decimal": {
    id: "df-binary-decimal",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "15 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İkili ve Onlu Sayı Sistemleri (Binary & Decimal Systems)",
    subtitle:
      "Basamak ağırlıkları, taban dönüşümleri (Base-2, Base-10, Base-16), bit, nibble, bayt ve donanım register bit genişlikleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital elektroniğin dili olan sayı sistemlerinin temelleri:
- Neden insanlar 10'luk (Decimal), bilgisayarlar ise 2'lik (Binary) sayı sistemi kullanır?
- Konumsal Değer Sistemi (Positional Number System) ve basamak ağırlıkları ($2^n$).
- İkilik (Binary) $\\leftrightarrow$ Onluk (Decimal) $\\leftrightarrow$ Onaltılık (Hexadecimal) dönüşümleri.
- Temel veri birimleri: **Bit**, **Nibble (4-bit)**, **Bayt (8-bit)**, **Word (32-bit / 64-bit)**.
- Donanım register'larında bit dizilimleri (MSB ve LSB).`,
      },
      {
        title: "2. Konumsal Notasyon ve Basamak Ağırlıkları",
        content: `Her sayı sisteminde bir sayının değeri basamakların ağırlıkları toplamıdır:
$$\\text{Sayı} = \\sum_{i=0}^{n-1} d_i \\cdot B^i$$
(Burada $B$ tabandır).

- **Onluk Taban ($B=10$):** Rakamlar $\\{0, 1, 2, \\dots, 9\\}$. Basamak ağırlıkları: $10^0=1, 10^1=10, 10^2=100, \\dots$
- **İkilik Taban ($B=2$):** Rakamlar yalnızca $\\{0, 1\\}$. Basamak ağırlıkları 2'nin kuvvetleridir:
$$2^0=1, \\; 2^1=2, \\; 2^2=4, \\; 2^3=8, \\; 2^4=16, \\; 2^5=32, \\; 2^6=64, \\; 2^7=128$$

*Örnek:* İkilik \`10110010_2\` sayısı onluğa nasıl çevrilir?
$$1\\cdot 128 + 0\\cdot 64 + 1\\cdot 32 + 1\\cdot 16 + 0\\cdot 8 + 0\\cdot 4 + 1\\cdot 2 + 0\\cdot 1 = 128 + 32 + 16 + 2 = 178_{10}$$`,
      },
      {
        title: "3. Onaltılık (Hexadecimal - Base-16) Sistem: Mühendisin Kurtarıcısı",
        content: `32-bit veya 64-bitlik ikilik sayıları (\`1101011110100101...\`) okumak ve yazmak insanlar için imkansızdır ve hata doludur.
Bu sorunu çözmek için **Hexadecimal (Base-16)** sistemi kullanılır. 16 tabanı $2^4$'e eşit olduğu için **her 4 ikilik bit (1 nibble) tam olarak tek bir hex karakterine karşılık gelir!**

| Hex | İkilik | Onluk | Hex | İkilik | Onluk |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 0000 | 0 | 8 | 1000 | 8 |
| 1 | 0001 | 1 | 9 | 1001 | 9 |
| 2 | 0010 | 2 | A | 1010 | 10 |
| 3 | 0011 | 3 | B | 1011 | 11 |
| 4 | 0100 | 4 | C | 1100 | 12 |
| 5 | 0101 | 5 | D | 1101 | 13 |
| 6 | 0110 | 6 | E | 1110 | 14 |
| 7 | 0111 | 7 | F | 1111 | 15 |

*Örnek:* \`1111_1010_1100_0101_2\` sayısı doğrudan \`0xFAC5\` olarak yazılır!`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: MSB ve LSB kavramlarını karıştırmak.**
  *Doğrusu:* **LSB (Least Significant Bit):** En sağdaki en düşük değerli bittir ($2^0$). **MSB (Most Significant Bit):** En soldaki en yüksek ağırlıklı bittir ($2^{n-1}$).
- **Hata #2: N-bitlik bir sayının maksimum değerinin $2^N$ olduğunu sanmak.**
  *Doğrusu:* $N$ bit ile $2^N$ farklı sayı ifade edilir ancak 0 dahil olduğu için maksimum değer **$2^N - 1$**'dir (örn: 8 bit $\\rightarrow 0$ ile $255$).`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 10 bitlik bir ADC (Analog-to-Digital Converter) kaç farklı gerilim seviyesini ayırt edebilir?**
*Cevap:* $2^{10} = 1024$ farklı seviye.

**S2: 0x3F hex sayısı ikilikte ve onlukta kaça eşittir?**
*Cevap:* İkilikte \`0011_1111_2\`, onlukta $32 + 16 + 8 + 4 + 2 + 1 = 63_{10}$.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- İkili sistem 2 tabanındadır ($2^n$ ağırlıkları).
- Hexadecimal sistem ikili sayıları 4'erli gruplayarak insan gözü için okunabilir kılar.
- $N$ bitlik işaretsiz bir sayı $0$ ile $2^N - 1$ arasındaki değerleri alır.`,
      },
    ],
    playground: {
      title: "Verilog Taban Dönüşüm Simülasyonu",
      filename: "tb_number_systems.v",
      language: "verilog",
      initialCode: `// Verilog Taban Formatlama: %b (Binary), %d (Decimal), %h (Hex)
module tb_number_systems;
  reg [7:0] sayi;

  initial begin
    sayi = 8'b1011_0010; // İkilik 10110010

    $display("=== Sayı Formatları Dönüşüm Testi ===");
    $display("İkilik Format (Binary) : %b", sayi);
    $display("Onaltılık Format (Hex) : 0x%h", sayi);
    $display("Onluk Format (Decimal) : %d", sayi);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Sayı Formatları Dönüşüm Testi ===",
        "İkilik Format (Binary) : 10110010",
        "Onaltılık Format (Hex) : 0xb2",
        "Onluk Format (Decimal) : 178",
      ],
    },
    quiz: {
      question: "8 bitlik bir işaretsiz (unsigned) ikili kaydedicinin (register) alabileceği maksimum onluk değer kaçtır?",
      options: [
        "A) 256",
        "B) 255",
        "C) 128",
        "D) 512",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 8 bit ile 2^8 = 256 farklı değer temsil edilir. Değerler 0'dan başladığı için maksimum değer 2^8 - 1 = 255'tir.",
    },
  },

  // ========================================================
  // BÖLÜM 5: SIGNED AND UNSIGNED BINARY
  // ========================================================
  "df-signed-unsigned": {
    id: "df-signed-unsigned",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "İşaretli ve İşaretsiz Sayılar (Signed vs Unsigned Binary)",
    subtitle:
      "İşaret biti (Sign Bit), Sign-Magnitude, One's Complement ve modern donanımların standardı Two's Complement.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Donanımda negatif sayıların nasıl temsil edildiği:
- **İşaretsiz (Unsigned)** ve **İşaretli (Signed)** sayı formatları arasındaki farklar.
- Sayı formatlarının değer aralıkları (Dynamic Range).
- Tarihsel gösterimler: **İşaret-Büyüklük (Sign-Magnitude)** ve **Bire Tümleyen (One's Complement)**.
- Bu eski sistemlerin neden terk edildiği (+0 ve -0 çift sıfır sorunu, karmaşık toplama donanımı).
- Modern CPU'ların vazgeçilmezi: **İkiye Tümleyen (Two's Complement)**.`,
      },
      {
        title: "2. Sayı Temsil Formatlarının Karşılaştırması (8-Bit)",
        content: `8 bitlik bir donanım register'ında aynı bit deseni (\`1111_1111\`) hangi formatta yorumlandığına göre bambaşka anlamlara gelir:

| Format | MSB Anlamı | Değer Aralığı (8-Bit) | Sayı 0 Temsili | \`1111_1111\` Değeri |
| :--- | :--- | :---: | :---: | :---: |
| **Unsigned** | $2^7 = 128$ ağırlıklı pozitif bit | $0 \\text{ ile } +255$ | Tek Sıfır (\`0000_0000\`) | $+255$ |
| **Sign-Magnitude** | İşaret biti ($0=+, 1=-$) | $-127 \\text{ ile } +127$ | Çift Sıfır ($+0$ ve $-0$) | $-127$ |
| **One's Complement** | Tersi alınmış bitler | $-127 \\text{ ile } +127$ | Çift Sıfır ($+0$ ve $-0$) | $-0$ |
| **Two's Complement** | Negatif ağırlıklı bit ($-2^7 = -128$) | **$-128 \\text{ ile } +127$** | **Tek Sıfır (\`0000_0000\`)** | **$-1$** |`,
      },
      {
        title: "3. Sign-Magnitude Sisteminin Çöküşü",
        content: `Sign-Magnitude yönteminde en sol bit (MSB) sadece işarettir ($0=+$, $1=-$), geri kalan bitler sayının büyüklüğünü verir.
Bu sistem insan mantığına çok yatkındır ancak dijital donanım için bir kabustur:
1. **Çift Sıfır:** \`00000000\` ($+0$) ve \`10000000\` ($-0$). Bilgisayar $A == B$ karşılaştırması yaparken iki farklı sıfır için ekstra kapılar harcamak zorunda kalır.
2. **Karmaşık Aritmetik:** Pozitif bir sayıyla negatif bir sayıyı toplamak için ayrı bir çıkarma devresi ve büyüklük karşılaştırıcısı gerekir.`,
      },
      {
        title: "4. Two's Complement'ın Zaferi",
        content: `Two's Complement sisteminde MSB biti basit bir bayrak değildir; negatif bir basamak ağırlığına sahiptir:
$$\\text{Değer} = -b_{n-1} \\cdot 2^{n-1} + \\sum_{i=0}^{n-2} b_i \\cdot 2^i$$

8 bitlik bir sistemde MSB'nin ağırlığı **$-128$**'dir!
- \`1000_0000\` $= -128$
- \`1111_1111\` $= -128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = -1$
- Tek bir sıfır vardır (\`0000_0000\`).
- En önemlisi: **Toplama ve çıkarma aynı donanımla yapılır!** İşlemcinin çıkarma yapmak için ayrı bir devreye ihtiyacı yoktur; $A - B = A + (-B)$ olarak standart toplayıcıda çözülür!`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: İki işaretli sayıyı toplarken elde taşmasını (Carry) ile taşmayı (Overflow) aynı şey sanmak.**
  *Doğrusu:* Unsigned sayılarda taşma Carry bayrağı ile izlenir; Signed sayılarda ise sonucun işaretinin bozulması Overflow (V) bayrağı ile izlenir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 16-bit Two's Complement formatında bir sayının alabileceği en küçük negatif değer kaçtır?**
*Cevap:* $-2^{15} = -32768$.

**S2: Neden Two's Complement'ta pozitif sayılar $+127$'ye kadar giderken negatif sayılar $-128$'e kadar gider?**
*Cevap:* Sıfır pozitif tarafa dahil kabul edildiği için pozitif tarafta 1 eksik yer kalır; negatif tarafta asimetrik olarak 1 fazla sayı bulunur.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Unsigned sayılar yalnızca pozitif değerleri ($0$ ile $2^N-1$) alır.
- Two's Complement modern donanımlarda tek sıfır barındırması ve toplama devresiyle çıkarma yapabilmesi nedeniyle evrensel standarttır.
- $N$ bitlik Two's complement aralığı $-2^{N-1}$ ile $+2^{N-1}-1$'dir.`,
      },
    ],
    playground: {
      title: "Verilog İşaretli ve İşaretsiz Sayı Yorumlama Testi",
      filename: "tb_signed.v",
      language: "verilog",
      initialCode: `// Verilog Signed vs Unsigned Yorumlama
module tb_signed;
  reg [7:0] unsigned_val;
  reg signed [7:0] signed_val;

  initial begin
    unsigned_val = 8'b1111_1111;
    signed_val   = 8'b1111_1111;

    $display("=== Aynı Bit Deseni (11111111) İki Farklı Yorum ===");
    $display("İşaretsiz (Unsigned) Değeri : %d", unsigned_val);
    $display("İşaretli (Signed Two's Comp): %d", signed_val);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Aynı Bit Deseni (11111111) İki Farklı Yorum ===",
        "İşaretsiz (Unsigned) Değeri : 255",
        "İşaretli (Signed Two's Comp):  -1",
      ],
    },
    quiz: {
      question: "8 bitlik '1111_1111' bit deseni Two's Complement formatında yorumlandığında hangi onluk sayıya eşittir?",
      options: [
        "A) +255",
        "B) -1",
        "C) -127",
        "D) 0",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Two's Complement formatında en sol bit -128 ağırlığındadır. -128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = -1 eder.",
    },
  },

  // ========================================================
  // BÖLÜM 5: ONE'S AND TWO'S COMPLEMENTS
  // ========================================================
  "df-twos-complement": {
    id: "df-twos-complement",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "İkiye Tümleyen Matematiği ve İşaret Uzatma (Two's Complement & Sign Extension)",
    subtitle:
      "Tümleyen alma algoritması, bitleri tersleyip 1 ekleme, işaret uzatma (Sign Extension) ve donanımsal taşma (Overflow).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `İkiye tümleyen matematiğinin donanımsal incelikleri:
- Bir sayının ikiye tümleyeni ($ -A $) pratikte nasıl alınır? (Bitleri tersle ve 1 ekle kuralı).
- Sayıyı sağdan tarayarak ilk 1'den sonrasını tersleme kısayolu.
- **İşaret Uzatma (Sign Extension):** 8-bitlik bir sayıyı değerini bozmadan 16 veya 32 bite genişletme.
- Aritmetik Taşma (Overflow) koşulları: Pozitif + Pozitif = Negatif olduğunda donanım nasıl alarm verir?`,
      },
      {
        title: "2. İkiye Tümleyen Alma Algoritması",
        content: `Bir pozitif sayının negatifini bulmak için standart iki adımlı kural uygulanır:
1. **Adım 1:** Tüm bitleri tersle (1'ler 0, 0'lar 1 olur - One's complement).
2. **Adım 2:** Sonuca 1 ekle (+1).

*Örnek:* $+5_{10}$ sayısının $-5_{10}$ karşılığını 8 bitte bulalım:
- $+5$ ikilikte: \`0000_0101\`
- Bitleri tersle: \`1111_1010\`
- 1 ekle: \`1111_1011\` ($-5_{10}$ elde edildi!).

**Donanım Kısayolu:** Sayıyı en sağdan (LSB) sola doğru okuyun. İlk '1' bitini görene kadar tüm sıfırları ve o '1'i aynen bırakın; o '1'den sonraki tüm sol bitleri tersleyin!`,
      },
      {
        title: "3. İşaret Uzatma (Sign Extension)",
        content: `İşlemcilerde sıkça 8-bitlik bir sayıyı (örneğin \`signed char\`), 32-bitlik bir kaydediciye (\`int\`) yüklemeniz gerekir.
- Sayı işaretsiz (unsigned) ise sol tarafa basitçe sıfırlar eklenir (**Zero Extension**).
- Ancak sayı işaretli (signed) ise sayının işaretini ve değerini korumak için en sol bit (MSB) ne ise tüm üst bitlere o kopyalanmalıdır (**Sign Extension**)!

*Örnek:*
- $+5$ (8-bit): \`0000_0101\` $\\rightarrow$ 16-bit: \`0000_0000_0000_0101\` (MSB 0 kopyalandı).
- $-5$ (8-bit): \`1111_1011\` $\\rightarrow$ 16-bit: \`1111_1111_1111_1011\` (MSB 1 kopyalandı; değer hala $-5$!).`,
      },
      {
        title: "4. Donanımsal Taşma (Arithmetic Overflow) Nedir?",
        content: `İki $N$-bitlik sayıyı topladığınızda sonuç $N$ bitlik register'a sığmayabilir:
- İki pozitif sayıyı toplayıp negatif sonuç alırsanız $\\rightarrow$ **OVERFLOW!** (örn: $+100 + +50 = +150 > +127$).
- İki negatif sayıyı toplayıp pozitif sonuç alırsanız $\\rightarrow$ **OVERFLOW!** (örn: $-100 + -50 = -150 < -128$).
- Zıt işaretli iki sayının toplamı asla taşma üretemez!

**Donanım Formülü:**
Son basamağa gelen elde ($C_{in}$) ile son basamaktan çıkan elde ($C_{out}$) birbirinden farklıysa taşma gerçekleşmiştir:
$$V = C_{in, MSB} \\oplus C_{out, MSB}$$`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Negatif sayıyı genişletirken soluna sıfır eklemek.**
  *Doğrusu:* $-5$ (\`1111_1011\`) sayısının soluna sıfır eklerseniz \`0000_0000_1111_1011\` olur ve sayı pozitif $+251$'e dönüşür! Negatif sayılarda daima 1 uzatılmalıdır.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir sayının iki kez ikiye tümleyeni alınırsa ne olur?**
*Cevap:* $-(-A) = A$ olacağından sayının orijinal hali elde edilir.

**S2: 8 bitte en küçük sayı olan -128'in negatifini (+128) almaya kalkarsanız ne olur?**
*Cevap:* 8 bitte +128 temsil edilemediği için donanım taşma (overflow) üretir ve sonuç hatalı şekilde tekrar -128 olarak kalır!`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- İkiye tümleyen: Bitleri tersle ve 1 ekle.
- İşaret uzatma (Sign extension), sayının MSB bitini üst basamaklara kopyalar.
- İki aynı işaretli sayının toplamı zıt işaret verirse aritmetik taşma (Overflow) oluşur.`,
      },
    ],
    playground: {
      title: "Verilog İşaret Uzatma ve Taşma Testi",
      filename: "tb_twos_comp.v",
      language: "verilog",
      initialCode: `// İşaret Uzatma ve Taşma (Overflow) Testi
module tb_twos_comp;
  reg signed [7:0] a, b;
  reg signed [7:0] toplam;
  reg signed [15:0] genis_sayi;
  wire overflow;

  assign overflow = (a[7] == b[7]) && (toplam[7] != a[7]);

  initial begin
    // 1. İşaret Uzatma Testi
    a = -5; // 8-bit -5
    genis_sayi = a; // 16-bit'e işaret uzatma
    $display("=== İşaret Uzatma ===");
    $display("8-bit: %d (0x%h) -> 16-bit: %d (0x%h)", a, a, genis_sayi, genis_sayi);

    // 2. Taşma (Overflow) Testi: 100 + 50 = 150 (8-bit max 127!)
    a = 100;
    b = 50;
    toplam = a + b;
    $display("=== Taşma (Overflow) Testi ===");
    $display("%d + %d = %d | Taşma Bayrağı: %b (POZİTİFLER NEGATİF ÇIKTI!)", a, b, toplam, overflow);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== İşaret Uzatma ===",
        "8-bit:   -5 (0xfb) -> 16-bit:   -5 (0xfffb)",
        "=== Taşma (Overflow) Testi ===",
        " 100 +  50 = -106 | Taşma Bayrağı: 1 (POZİTİFLER NEGATİF ÇIKTI!)",
      ],
    },
    quiz: {
      question: "İki adet 8-bitlik pozitif işaretli sayı olan +100 ile +50 toplandığında sonucun -106 çıkmasının sebebi nedir?",
      options: [
        "A) Toplayıcının bozuk olması",
        "B) Sonucun (+150) 8-bit işaretli sayının maksimum sınırı olan +127'yi aşarak işaret biti olan MSB'ye taşması (Aritmetik Overflow)",
        "C) Verilog dilinin çıkarma yapması",
        "D) Sayıların terslenmesi",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 8-bit işaretli aralık -128 ile +127 arasındadır. +150 bu aralığa sığmaz; 8. bit olan işaret bitine 1 taşar ve sayı negatif (-106) olarak yanlış yorumlanır. Bu duruma Aritmetik Taşma (Overflow) denir.",
    },
  },

  // ========================================================
  // BÖLÜM 5: CHARACTER ENCODING SYSTEMS
  // ========================================================
  "df-character-encoding": {
    id: "df-character-encoding",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "14 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Karakter Kodlama Sistemleri (ASCII, UTF-8 & Unicode)",
    subtitle:
      "ASCII tablosu, kontrol karakterleri, çok baytlı UTF-8 mimarisi, donanım UART haberleşmesinde metin iletimi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bilgisayarların harfleri ve sembolleri ikilik sayılarla nasıl temsil ettiği:
- **ASCII (American Standard Code for Information Interchange)** standardı.
- 7-bit standart ve 8-bit genişletilmiş ASCII.
- Yazdırılamayan Kontrol Karakterleri (\`CR\`, \`LF\`, \`NUL\`, \`ESC\`).
- ASCII'nin yetersizliği ve küresel standart **Unicode (UTF-8, UTF-16)** devrimi.
- FPGA ve gömülü sistemlerde UART seri konsoluna karakter gönderme.`,
      },
      {
        title: "2. Standart ASCII Tablosu Yapısı",
        content: `ASCII, 1963 yılında 7 bitlik (128 karakter) bir kodlama olarak doğmuştur:
- **0 - 31 (0x00 - 0x1F):** Kontrol Karakterleri (Yazdırılamaz; teletip ve terminalleri yönetir).
  - \`0x00\` (\`NUL\`): Dize sonlandırıcı (Null terminator).
  - \`0x0A\` (\`LF\`): Satır besleme (Line Feed / Newline '\\n').
  - \`0x0D\` (\`CR\`): Satır başı (Carriage Return '\\r').
- **32 - 47 (0x20 - 0x2F):** Boşluk ve noktalama işaretleri (\`SPACE\`, \`!\`, \`"\`, \`#\`).
- **48 - 57 (0x30 - 0x39):** Rakamlar (\`'0'\` ile \`'9'\` arası). *İpucu:* Rakam karakterinden \`0x30\` çıkarırsanız sayının kendi değerini bulursunuz!
- **65 - 90 (0x41 - 0x5A):** Büyük harfler (\`'A'\` ile \`'Z'\` arası).
- **97 - 122 (0x61 - 0x7A):** Küçük harfler (\`'a'\` ile \`'z'\` arası). *İpucu:* Büyük harften küçük harfe geçmek için sadece 5. biti 1 yapmanız (veya \`+32\` eklemeniz) yeterlidir!`,
      },
      {
        title: "3. Unicode ve UTF-8: Tüm Dünyanın Dilleri",
        content: `ASCII yalnızca İngiliz alfabesini barındırır; Türkçe karakterler (\`ç, ğ, ı, ö, ş, ü\`), Arapça, Çince veya emojiler ASCII'ye sığmaz.

Bu sorunu çözmek için **Unicode** oluşturulmuştur. Unicode'un en popüler biçimi olan **UTF-8 (Değişken Uzunluklu Kodlama)**:
- Standart ASCII karakterlerini yine **tek bayt (8-bit)** olarak saklar (geriye dönük tam uyumluluk!).
- Türkçe gibi Latin eklerini **2 bayt** olarak saklar.
- Çince, Japonca ve emojileri **3 veya 4 bayt** olarak saklar.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: '5' karakteri ile 5 sayısını aynı şey sanmak.**
  *Doğrusu:* Sayısal 5 değeri \`0x05\` (\`0000_0101\`) iken, metin karakteri olan '5' ASCII tablosunda \`0x35\` (\`0011_0101\`) değerine sahiptir.
- **Hata #2: UART üzerinden gönderilen her baytın sayı olarak algılanacağını düşünmek.**
  *Doğrusu:* Seri terminale \`5\` göndermek isterseniz ekranda '5' görünmesi için ASCII \`0x35\` göndermeniz gerekir.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Büyük 'A' (0x41) karakteri nasıl küçük 'a' (0x61) yapılır?**
*Cevap:* Sayıya onluk 32 (hex 0x20) ekleyerek ya da 5. biti Mantık 1 yaparak (\`char | 8'h20\`).

**S2: Bir string'in sonunu belirten NULL karakterinin ASCII değeri nedir?**
*Cevap:* \`0x00\` (sıfır).`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- ASCII 7-bit (128 karakter) kodlama sistemidir.
- Rakamlar 0x30, büyük harfler 0x41, küçük harfler 0x61'den başlar.
- UTF-8 değişken uzunluklu (1-4 bayt) yapısıyla evrensel Unicode standardıdır.`,
      },
    ],
    playground: {
      title: "Verilog Karakter ve Büyük/Küçük Harf Dönüşüm Testi",
      filename: "tb_ascii.v",
      language: "verilog",
      initialCode: `// ASCII Karakter İşleme ve Büyük Harf -> Küçük Harf Dönüşümü
module tb_ascii;
  reg [7:0] buyuk_harf;
  wire [7:0] kucuk_harf;

  // 5. biti 1 yaparak küçük harfe çevirme (a = A | 0x20)
  assign kucuk_harf = buyuk_harf | 8'h20;

  initial begin
    buyuk_harf = "A"; // 0x41 (65)
    #10;
    $display("=== ASCII Karakter Analizi ===");
    $display("Büyük Harf: %c (Hex: 0x%h, Dec: %d)", buyuk_harf, buyuk_harf, buyuk_harf);
    $display("Küçük Harf: %c (Hex: 0x%h, Dec: %d)", kucuk_harf, kucuk_harf, kucuk_harf);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== ASCII Karakter Analizi ===",
        "Büyük Harf: A (Hex: 0x41, Dec:  65)",
        "Küçük Harf: a (Hex: 0x61, Dec:  97)",
      ],
    },
    quiz: {
      question: "ASCII tablosunda '0' rakam karakterinin onaltılık (hex) değeri kaçtır?",
      options: [
        "A) 0x00",
        "B) 0x30",
        "C) 0x41",
        "D) 0x20",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! '0' karakterinin ASCII kodu 0x30 (onluk 48)'dur. '9' karakterine kadar 0x39 şeklinde ardışık devam eder.",
    },
  },

  // ========================================================
  // BÖLÜM 5: FLOATING POINT NUMBERS (IEEE-754)
  // ========================================================
  "df-floating-point": {
    id: "df-floating-point",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "17 dk okuma",
    level: "İleri Seviye",
    title: "Kayan Noktalı Sayılar ve IEEE-754 Standardı (Floating-Point Numbers)",
    subtitle:
      "İşaret (Sign), Üs (Exponent), Kesir/Mantissa (Fraction), Bias 127 mekanizması, normal/subnormal sayılar ve FPU donanımı.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Çok büyük veya çok küçük kesirli sayıların donanımda temsil edilmesini sağlayan **IEEE-754 Kayan Nokta (Floating-Point)** standardı:
- Sabit noktalı (Fixed-point) sayılar neden astronomik veya atomik ölçeklerde yetersiz kalır?
- IEEE-754 32-bit Tek Duyarlıklı (Single Precision - \`float\`) formatın yapısı.
- 3 Temel Alan: **Sign (1 bit)**, **Exponent (8 bit)**, **Mantissa / Fraction (23 bit)**.
- Neden Exponent için Two's complement yerine **Bias (+127)** yöntemi kullanılır?
- Gizli Bit (Hidden Bit / Implicit Leading 1) kuralı.
- Özel değerler: $+0, -0, +\\infty, -\\infty, \\text{NaN}$ (Not a Number).
- FPU (Floating Point Unit) donanımının karmaşıklığı.`,
      },
      {
        title: "2. IEEE-754 Tek Duyarlıklı (Single Precision) Formatı",
        content: `32 bitlik standart bir \`float\` sayısı bellekte tam olarak 3 alana bölünür:

$$\\text{Değer} = (-1)^S \\times 1.F \\times 2^{E - 127}$$

- **1. İşaret Biti (Sign - 1 bit):**
  - Bit 31: $S=0$ ise pozitif, $S=1$ ise negatif.
- **2. Üs Alanı (Exponent - 8 bit):**
  - Bit [30:23]: 2'nin kuvvetini belirler.
  - Değerler doğrudan yazılmaz; **Bias = 127** eklenir ($E_{saklanan} = E_{gercek} + 127$). Böylece negatif üsler bile işaretsiz pozitif sayılar olarak saklanır; bu sayede donanım karşılaştırma yaparken sayıları standart işaretsiz tamsayılar gibi sıralayabilir!
- **3. Kesir / Mantis Alanı (Fraction - 23 bit):**
  - Bit [22:0]: Sayının virgülden sonraki ikilik kesir kısmıdır.
  - Normal sayılarda virgülden önce daima gizli bir '1' olduğu varsayılır ($1.F$); bu sayede 1 bit ekstra hassasiyet bedavaya kazanılır!`,
      },
      {
        title: "3. Örnek: -9.75 Sayısını IEEE-754 Formatına Dönüştürme",
        content: `Adım adım dönüştürelim:
1. **İşaret:** Sayı negatiftir $\\rightarrow S = 1$.
2. **İkilik Kesre Çevir:**
   - Tamsayı: $9_{10} = 1001_2$
   - Kesir: $0.75_{10} = 0.5 + 0.25 = 0.11_2$
   - Birleştir: $9.75_{10} = 1001.11_2$
3. **Normalize Et:** Virgülü ilk 1'in sağına kaydır:
   $$1001.11_2 = 1.00111_2 \\times 2^3$$
4. **Exponent Hesabı:** Gerçek üs $3$'tür. Bias (127) ekle:
   $$E = 3 + 127 = 130_{10} = 10000010_2$$
5. **Mantissa:** $1.00111$ sayısındaki gizli 1 atılır, geri kalan 23 bite sıfırlarla tamamlanır:
   $$F = 00111000000000000000000_2$$
6. **32-Bit Bit Deseni:**
   \`1 | 10000010 | 00111000000000000000000\`
   Hex karşılığı: **\`0xC11C0000\`**!`,
      },
      {
        title: "4. Özel Durumlar: Sıfır, Sonsuz ve NaN",
        content: `Exponent alanının uç değerleri özel durumlar için rezerve edilmiştir:

| Exponent ($E$) | Fraction ($F$) | Anlamı |
| :---: | :---: | :--- |
| \`00000000\` (0) | \`000...00\` (0) | **Sıfır ($+0$ veya $-0$)** |
| \`00000000\` (0) | Sıfırdan farklı | **Subnormal Sayılar** (Çok küçük sayılarda gizli 1 kalkar) |
| \`11111111\` (255) | \`000...00\` (0) | **Sonsuz ($+\\infty$ veya $-\\infty$)** (Sıfıra bölme sonucu) |
| \`11111111\` (255) | Sıfırdan farklı | **NaN (Not a Number)** ($0/0$ veya $\\sqrt{-1}$ tanımsızlıkları) |`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: İki float sayının birebir eşitliğini ($a == b$) donanımda sorgulamak.**
  *Doğrusu:* İkili kayan nokta hassasiyet yuvarlama hataları nedeniyle asla $a == b$ yapılmaz; daima mutlak farkın küçük bir eşikten ufak olup olmadığına bakılır ($|a - b| < \\varepsilon$).
- **Hata #2: FPU donanımının tamsayı ALU kadar basit olduğunu sanmak.**
  *Doğrusu:* Kayan noktalı toplama işlemi üsleri eşitleme (shifter), mantisleri toplama, normalizasyon ve yuvarlama gibi 4 ayrı karmaşık kademe gerektirir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Neden Exponent'a 127 sayısı (Bias) eklenir?**
*Cevap:* Exponent'ın negatif değerler (örn: $2^{-5}$) de alabilmesini sağlamak ancak bunu işaretli bit yerine pozitif tam sayılar gibi saklayarak donanım karşılaştırmasını hızlandırmak için.

**S2: 0.1 onluk sayısı IEEE-754 formatında kusursuz saklanabilir mi?**
*Cevap:* Hayır! Tıpkı 1/3'ün onlukta $0.3333...$ devretmesi gibi, 0.1 sayısı da ikilikte devirli bir sayıdır ($0.0001100110011...$) ve virgülden sonra yuvarlama hatası içerir.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- IEEE-754 tek duyarlıklı format 32 bittir: 1 bit Sign, 8 bit Exponent (Bias 127), 23 bit Mantissa.
- Normal sayılarda mantisin başında gizli bir '1' vardır.
- Exponent 255 sonsuz ($\infty$) ve NaN için rezerve edilmiştir.
- FPU donanımı karmaşıktır; bu nedenle basit gömülü işlemciler kayan nokta yerine Sabit Nokta (Fixed-Point) tercih eder.`,
      },
    ],
    playground: {
      title: "Verilog Gerçek Sayı (Real/Float) Bit Deseni İnceleme Testi",
      filename: "tb_float.v",
      language: "verilog",
      initialCode: `// IEEE-754 Kayan Noktalı Sayı Gösterimi
module tb_float;
  real r_sayi;
  reg [31:0] float_bits;

  initial begin
    r_sayi = -9.75;
    // $shortrealtobits: 32-bit IEEE-754 tek duyarlıklı bit desenini verir
    float_bits = $shortrealtobits(r_sayi);

    $display("=== IEEE-754 Float Dönüşüm Testi ===");
    $display("Gerçek Sayı       : %f", r_sayi);
    $display("32-Bit Hex Kodu   : 0x%h", float_bits);
    $display("Sign Biti [31]    : %b (1 = Negatif)", float_bits[31]);
    $display("Exponent  [30:23] : %b (Dec: %d, Bias 127 ile Gerçek Üs: %d)", 
             float_bits[30:23], float_bits[30:23], float_bits[30:23] - 127);
    $display("Fraction  [22:0]  : %b", float_bits[22:0]);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== IEEE-754 Float Dönüşüm Testi ===",
        "Gerçek Sayı       : -9.750000",
        "32-Bit Hex Kodu   : 0xc11c0000",
        "Sign Biti [31]    : 1 (1 = Negatif)",
        "Exponent  [30:23] : 10000010 (Dec: 130, Bias 127 ile Gerçek Üs: 3)",
        "Fraction  [22:0]  : 00111000000000000000000",
      ],
    },
    quiz: {
      question: "IEEE-754 tek duyarlıklı (32-bit single precision) formatında Exponent alanına neden 127 (Bias) değeri eklenir?",
      options: [
        "A) Bellekte yer kazanmak için",
        "B) Negatif üs değerlerini de pozitif tamsayı aralığına kaydırarak donanımın işaret bitiyle uğraşmadan hızlı büyüklük karşılaştırması yapabilmesini sağlamak için",
        "C) Sayıyı ikiye katlamak için",
        "D) Karakter dönüşümü yapmak için",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Biaslama sayesinde üs değerleri daima pozitif işaretsiz sayılar gibi dizilir. Böylece iki float sayıyı büyüklük-küçüklük açısından kıyaslarken karmaşık işaretli aritmetik yerine standart düz tamsayı karşılaştırıcıları kullanılabilir.",
    },
  },

  // ========================================================
  // BÖLÜM 5: BINARY ARITHMETIC
  // ========================================================
  "df-binary-arithmetic": {
    id: "df-binary-arithmetic",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "15 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "İkili Aritmetik: Toplama, Çıkarma ve Elde (Binary Arithmetic)",
    subtitle:
      "Bit düzeyinde toplama kuralları, elde (Carry) ve borç (Borrow) yayılımı, Two's complement ile çıkarma, çarpma ve bölme temelleri.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bir mikroişlemcinin ALU (Arithmetic Logic Unit) biriminde aritmetik işlemlerin donanımsal mantığı:
- İkili Toplama Kuralları ($0+0, 0+1, 1+0, 1+1$).
- Elde (Carry) biti oluşumu ve sonraki basamağa aktarılması.
- Çıkarma işleminin Two's complement yardımıyla **Toplama İşlemine** dönüştürülmesi ($A - B = A + \\sim B + 1$).
- İkili Çarpma: Kaydır ve Topla (Shift and Add) mantığı.
- İkili Bölme: Geri yüklemeli / geri yüklemesiz bölme algoritmaları.`,
      },
      {
        title: "2. İkili Toplama Kuralları",
        content: `Tek basamaklı iki bitin toplanmasında 4 temel kural geçerlidir:
- $0 + 0 = 0$ (Elde = 0)
- $0 + 1 = 1$ (Elde = 0)
- $1 + 0 = 1$ (Elde = 0)
- $1 + 1 = 0$ (Elde = **1** - Sayı 2'ye ulaştığı için bir üst basamağa taşar!)
- Eğer alt basamaktan da elde ($C_{in} = 1$) gelmişse:
  $1 + 1 + 1 = 1$ (Elde = **1** - Sayı 3'tür; yani $11_2$).`,
      },
      {
        title: "3. Donanımda Çıkarma: Çıkarıcıya Gerek Yok!",
        content: `Mühendislik zekası: Bir mikroişlemciye ayrı bir "Çıkarma Devresi" tasarlamak silikon alanını ve maliyeti iki katına çıkarır.
Oysa $A - B$ işlemi matematikte şuna eşittir:
$$A - B = A + (-B)$$
İkiye tümleyen kuralına göre $-B = \\overline{B} + 1$'dir.
Dolayısıyla çıkarma işlemi:
$$A - B = A + \\overline{B} + 1$$
**Donanım Uygulaması:**
Standart bir toplayıcı devresinin $B$ girişine bir dizi XOR kapısı konur:
- Toplama yapılacaksa kontrol sinyali $SUB=0$ yapılır $\\rightarrow$ XOR $B$'yi aynen geçirir, alt eldeden $0$ girer.
- Çıkarma yapılacaksa $SUB=1$ yapılır $\\rightarrow$ XOR $B$'nin tüm bitlerini tersler ($\\overline{B}$) ve toplayıcının en alt basamağına $C_{in} = 1$ verilir! Tek bir toplayıcı her iki işi de mükemmel şekilde yapar!`,
      },
      {
        title: "4. İkili Çarpma ve Kaydırma (Shift & Add)",
        content: `İkilik tabanda bir sayıyı 2 ile çarpmak, sayıyı **1 bit sola kaydırmaktır** (\`<< 1\`).
Bir sayıyı 2'ye bölmek ise sayıyı **1 bit sağa kaydırmaktır** (\`>> 1\`).

Çok bitlik çarpma işlemi ilkokuldaki alt alta çarpma gibidir: Çarpanın her biti için sayı kaydırılır ve toplanır (Shift and Add). Modern işlemciler bu işlemi tek saat döngüsünde bitirmek için donanımsal **Booth Çarpıcıları** ve **Wallace Tree** toplayıcı ağaçları kullanır.`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Negatif sayıları sağa kaydırırken mantıksal kaydırma (Logical Shift) kullanmak.**
  *Doğrusu:* Negatif bir işaretli sayı sağa kaydırılırken sol tarafa 0 değil işaret biti (1) doldurulmalıdır (**Aritmetik Kaydırma - \`>>>\`**); aksi takdirde sayının işareti bozulur.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 1011 (11) ile 0101 (5) ikilik sayılarının toplamı nedir?**
*Cevap:* $1011 + 0101 = 10000_2$ ($16_{10}$).

**S2: Bir tamsayıyı 8 ile çarpmak için Verilog'da en az donanım harcayan yol nedir?**
*Cevap:* Sayıyı 3 bit sola kaydırmak (\`sayi << 3\`). Bu işlem sıfır mantık kapısı harcar; sadece iletken tellerin sırasını kaydırır!`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- İkili toplama bit düzeyinde elde üretimiyle ilerler.
- Çıkarma işlemi $A + \\overline{B} + 1$ formülüyle doğrudan toplayıcı devresinde yapılır.
- 2'nin kuvvetleriyle çarpma ve bölme sola/sağa kaydırma ile bedavaya yapılır.`,
      },
    ],
    playground: {
      title: "Verilog Toplayıcı / Çıkarıcı Birleşik Devre Testi",
      filename: "tb_arithmetic.v",
      language: "verilog",
      initialCode: `// Birleşik Toplayıcı/Çıkarıcı (Adder/Subtractor) Donanım Modeli
module adder_subtractor (
  input wire [7:0] a,
  input wire [7:0] b,
  input wire sub, // 0 = Topla, 1 = Çıkar
  output wire [7:0] sonuc,
  output wire carry_out
);
  wire [7:0] b_islenmis;
  assign b_islenmis = b ^ {8{sub}}; // sub=1 ise B bitleri terslenir
  assign {carry_out, sonuc} = a + b_islenmis + sub;
endmodule

module tb_arith;
  reg [7:0] a, b;
  reg sub;
  wire [7:0] sonuc;
  wire c_out;

  adder_subtractor uut (.a(a), .b(b), .sub(sub), .sonuc(sonuc), .carry_out(c_out));

  initial begin
    $display("=== Birleşik Toplayıcı/Çıkarıcı Testi ===");
    a = 25; b = 10; sub = 0; #10;
    $display("Toplama: %d + %d = %d", a, b, sonuc);
    a = 25; b = 10; sub = 1; #10;
    $display("Çıkarma: %d - %d = %d (Aynı Toplayıcı Donanımıyla!)", a, b, sonuc);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Birleşik Toplayıcı/Çıkarıcı Testi ===",
        "Toplama:  25 +  10 =  35",
        "Çıkarma:  25 -  10 =  15 (Aynı Toplayıcı Donanımıyla!)",
      ],
    },
    quiz: {
      question: "Donanımda bir çıkarma işlemi (A - B) ayrı bir çıkarıcı devre kurmadan standart bir ikili toplayıcı ile nasıl gerçekleştirilir?",
      options: [
        "A) A'nın tersi alınıp B ile çarpılarak",
        "B) B'nin tüm bitleri terslenip (NOT) toplayıcının alt elde girişine (Cin) 1 verilerek (A + ~B + 1)",
        "C) Sayılar sağa kaydırılarak",
        "D) Frekans iki katına çıkarılarak",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! İkiye tümleyen kuralına göre -B = ~B + 1'dir. B girişinin bitleri XOR ile terslenip toplayıcının elde girişine Cin=1 verildiğinde toplayıcı otomatik olarak çıkarma yapar.",
    },
  },

  // ========================================================
  // BÖLÜM 5: GRAY CODE
  // ========================================================
  "df-gray-code": {
    id: "df-gray-code",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Gray Kodu ve Tek-Bit Geçiş Güvenliği (Gray Code)",
    subtitle:
      "Yansıtılmış ikili kod (Reflected Binary), asenkron saat alanları (CDC), asenkron FIFO işaretçileri ve optik enkoderler.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital donanım güvenliğinde hayati rol oynayan **Gray Kodu (Yansıtılmış İkili Kod)** mimarisi:
- Standart ikili (Binary) sayma sırasında oluşan çoklu bit geçiş tehlikesi ve glitch'ler.
- Gray Kodunun Altın Kuralı: **Her adımdan diğerine geçerken YALNIZCA TEK BİR BİT DEĞİŞİR!**
- Karnaugh Haritalarında (K-Map) Gray kodunun zorunlu rolü.
- **Asenkron FIFO ve CDC (Clock Domain Crossing):** Farklı saat alanları arasında veri aktarırken Gray kodu neden hayat kurtarır?
- İkilikten Gray Koduna ve Gray Kodundan İkiliğe dönüştürme algoritmaları (XOR mantığı).`,
      },
      {
        title: "2. Standart Binary Neden Tehlikelidir?",
        content: `Standart ikili saymada bir sayıdan diğerine geçerken aynı anda birden fazla bit değişebilir:
- $3_{10}$'ten $4_{10}$'e geçiş: \`011_2 \\rightarrow 100_2\` (Aynı anda **3 bit birden** yön değiştirir!).
- Fiziksel silikonda hiçbir iki telin ve transistörün gecikmesi birbirine milisaniyenin binde biri kadar bile eşit değildir.
- Tellerden biri diğerinden 50 pikosaniye önce değişirse, alıcı devre ara değerde anlık olarak sahte bir sayı okur:
\`011 \\rightarrow 010 \\rightarrow 000 \\rightarrow 100\`!
Bu sahte ara durumlar (Glitch), asenkron saat alanlarında veya yüksek hızlı şaft enkoderlerinde **felaket boyutunda veri bozulmalarına** yol açar!`,
      },
      {
        title: "3. Gray Kodunun Gücü ve Tablosu",
        content: `Frank Gray (1953) tarafından patentlenen Gray kodunda ardışık her iki sayı arasında daima **yalnızca 1 bit** değişir:

| Onluk | Standart İkilik (Binary) | Gray Kodu | Değişen Bit Sayısı |
| :---: | :---: | :---: | :---: |
| 0 | 0000 | **0000** | Başlangıç |
| 1 | 0001 | **0001** | 1 bit değişti |
| 2 | 0010 (2 bit değişir!) | **0011** | **1 bit değişti** |
| 3 | 0011 | **0010** | **1 bit değişti** |
| 4 | 0100 (3 bit değişir!) | **0110** | **1 bit değişti** |
| 5 | 0101 | **0111** | **1 bit değişti** |
| 6 | 0110 | **0101** | **1 bit değişti** |
| 7 | 0111 | **0100** | **1 bit değişti** |`,
      },
      {
        title: "4. Donanımsal Dönüşüm Algoritmaları",
        content: `1. **Binary'den Gray Koduna Dönüşüm:**
   Sayıyı 1 bit sağa kaydırıp kendisiyle XOR'layın!
   $$\\text{Gray} = \\text{Binary} \\oplus (\\text{Binary} \\gg 1)$$
   \`\`\`verilog
   assign gray = bin ^ (bin >> 1);
   \`\`\`

2. **Gray Kodundan Binary'ye Dönüşüm:**
   Kümülatif XOR zinciri uygulanır:
   $$\\text{Bin}[n-1] = \\text{Gray}[n-1]$$
   $$\\text{Bin}[i] = \\text{Bin}[i+1] \\oplus \\text{Gray}[i]$$`,
      },
      {
        title: "5. Asenkron FIFO'larda Gray Kodu",
        content: `Bir çipte 1 GHz ile çalışan bir bloktan 100 MHz ile çalışan bir bloğa veri aktarılırken araya **Asenkron FIFO** konur.
Yazma ve okuma adres işaretçileri (Write Pointer, Read Pointer) karşı saat alanına aktarılırken **MUTLAKA Gray Kodu** ile aktarılır! Çünkü adres sayarken tek bir bit değiştiği için metastabilite riski yalnızca o tek bit üzerinde sınırlı kalır; sayacın asla saçma sapan bir adrese sıçraması mümkün olmaz.`,
      },
      {
        title: "6. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Gray kodlu sayılarla doğrudan toplama/çıkarma yapmaya çalışmak.**
  *Doğrusu:* Gray kodu konumsal ağırlıklı bir sistem değildir (basamakların $2^n$ ağırlığı yoktur); aritmetik işlem yapılamaz! Aritmetik yapabilmek için önce standart binary'ye çevrilmeli, işlem yapılıp tekrar Gray koduna dönüştürülmelidir.`,
      },
      {
        title: "7. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Gray kodunda 7'den 8'e geçerken kaç bit değişir?**
*Cevap:* Tanım gereği her adımda yalnızca **1 bit** değişir!

**S2: Binary'den Gray koduna dönüştürücü devrenin donanım maliyeti nedir?**
*Cevap:* N-bitlik bir sayı için yalnızca $N-1$ adet iki girişli XOR kapısı harcar; son derece ucuz ve hızlıdır.`,
      },
      {
        title: "8. Özet ve Temel Çıkarımlar",
        content: `- Gray kodunda ardışık adımlar arasında yalnızca 1 bit değişir.
- Çoklu bit geçiş gecikmelerinden doğan glitch ve sahte ara değerleri önler.
- Asenkron FIFO işaretçilerinde ve döner şaft enkoderlerinde standarttır.
- \`gray = bin ^ (bin >> 1)\` formülüyle donanımda anında üretilir.`,
      },
    ],
    playground: {
      title: "Verilog Binary <-> Gray Kodu Çift Yönlü Dönüşüm Testi",
      filename: "tb_gray_code.v",
      language: "verilog",
      initialCode: `// Binary <-> Gray Dönüştürücü Modülü
module gray_converter (
  input wire [3:0] bin_in,
  output wire [3:0] gray_out,
  output wire [3:0] bin_geri
);
  // Binary -> Gray
  assign gray_out = bin_in ^ (bin_in >> 1);

  // Gray -> Binary
  assign bin_geri[3] = gray_out[3];
  assign bin_geri[2] = bin_geri[3] ^ gray_out[2];
  assign bin_geri[1] = bin_geri[2] ^ gray_out[1];
  assign bin_geri[0] = bin_geri[1] ^ gray_out[0];
endmodule

module tb_gray;
  reg [3:0] bin;
  wire [3:0] gray, geri;

  gray_converter uut (.bin_in(bin), .gray_out(gray), .bin_geri(geri));

  initial begin
    $display("=== Binary -> Gray -> Binary Doğrulama ===");
    bin = 4'd2; #10; $display("Dec: %2d | Bin: %b -> Gray: %b -> Geri: %b", bin, bin, gray, geri);
    bin = 4'd3; #10; $display("Dec: %2d | Bin: %b -> Gray: %b -> Geri: %b (1 Bit Değişti!)", bin, bin, gray, geri);
    bin = 4'd4; #10; $display("Dec: %2d | Bin: %b -> Gray: %b -> Geri: %b", bin, bin, gray, geri);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Binary -> Gray -> Binary Doğrulama ===",
        "Dec:  2 | Bin: 0010 -> Gray: 0011 -> Geri: 0010",
        "Dec:  3 | Bin: 0011 -> Gray: 0010 -> Geri: 0011 (1 Bit Değişti!)",
        "Dec:  4 | Bin: 0100 -> Gray: 0110 -> Geri: 0100",
      ],
    },
    quiz: {
      question: "Asenkron FIFO işaretçilerinde (pointers) saat alanları arasında adres aktarılırken standart ikili sayıcı yerine neden Gray kodu kullanılır?",
      options: [
        "A) Gray kodunun daha az bit kullanması nedeniyle",
        "B) Sayma sırasında ardışık sayılar arasında aynı anda yalnızca tek bir bitin değişmesi sayesinde ara durumlarda sahte değer okunmasını ve metastabilite hatasını önlemek için",
        "C) Daha yüksek voltajla çalışabilmesi için",
        "D) Sayıcının yönünü tersine çevirmek için",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Standart binary saymada örneğin 3'ten 4'e geçerken (011 -> 100) 3 bit aynı anda değişir ve ara anlarda sahte değerler okunabilir. Gray kodunda ise her adımda yalnızca tek bir bit değiştiği için bu geçiş hatası imkansız hale gelir.",
    },
  },

  // ========================================================
  // BÖLÜM 5: FIXED-POINT ARITHMETIC IN HARDWARE
  // ========================================================
  "df-fixed-point": {
    id: "df-fixed-point",
    badge: "Bölüm 5 • Sayı Sistemleri",
    readingTime: "16 dk okuma",
    level: "İleri Seviye",
    title: "Donanımda Sabit Noktalı Aritmetik ve Q-Formatı (Fixed-Point Arithmetic)",
    subtitle:
      "Qm.n gösterimi, sanal ikili virgül (Binary Point), hassasiyet vs dinamik aralık dengesi, kırpma (truncation) ve yuvarlama.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `DSP (Dijital Sinyal İşleme), FPGA ve derin öğrenme hızlandırıcılarında kayan nokta (Floating Point) yerine kullanılan **Sabit Noktalı Aritmetik (Fixed-Point)**:
- Neden FPGA ve ASIC tasarımcıları kesirli sayılar için Floating Point yerine Fixed-Point tercih eder?
- **Q-Formatı (Qm.n)** yapısı: Tam kısım ($m$ bit) ve Kesir kısmı ($n$ bit).
- Sanal İkili Virgül (Binary Point) kavramı.
- Sabit Noktalı Toplama: Noktaları hizalama ve koruma biti (Guard Bit).
- Sabit Noktalı Çarpma: Bit genişliğinin iki katına çıkması ($2N$) ve kırpma (Truncation/Rounding).`,
      },
      {
        title: "2. Q-Formatı: İkili Virgül Nerede Yaşar?",
        content: `![Q-Format bit yapısı ve tamsayı/kesir ayrımı](/images/digital/4.5-q-format-bit-layout.svg)

Donanımda "virgül" diye fiziksel bir tel veya kapı yoktur; donanım için tüm register'lar sıradan düz tamsayılardır. Virgülün nerede olduğunu **yalnızca mimar (tasarımcı)** bilir!

Bir sabit noktalı sayı **$Q_{m.n}$** formatıyla tanımlanır:
- **$m$:** Tamsayı basamak sayısı (İşaret biti dahil).
- **$n$:** Kesirli basamak sayısı.
- Toplam bit genişliği: $N = m + n$.
- Kesirli basamak ağırlıkları: $2^{-1} = 0.5$, $2^{-2} = 0.25$, $2^{-3} = 0.125$, $2^{-n} = 1/2^n$.

*Örnek: $Q_{4.4}$ formatında (Toplam 8 bit, 4 tamsayı, 4 kesir):*
\`0101.1100_2\` sayısı:
$$4 + 1 + 0.5 + 0.25 = 5.75_{10}$$
En küçük hassasiyet (Resolution): $2^{-4} = 0.0625$.`,
      },
      {
        title: "3. Sabit Noktalı Toplama ve Çarpma Kuralları",
        content: `1. **Toplama ($A + B$):**
   - Toplanacak iki sayının **kesirli bit sayıları ($n$) eşit olmalıdır!** (Virgüller alt alta hizalanmalıdır).
   - Taşmayı önlemek için sonuca daima **1 bit koruma biti (Guard bit)** eklenmelidir ($N+1$ bit).
2. **Çarpma ($A \\times B$):**
   - $Q_{m1.n1}$ ile $Q_{m2.n2}$ çarpıldığında sonuç:
   $$Q_{(m1+m2).(n1+n2)}$$
   - Bit genişliği iki katına çıkar! Örneğin iki adet 8-bitlik $Q_{4.4}$ sayısı çarpıldığında sonuç **16-bitlik $Q_{8.8}$** olur!
   - Sonucu tekrar 8 bite indirmek için en alt kesir bitleri atılır (Kırpma - Truncation) veya en yakın değere yuvarlanır (Rounding).`,
      },
      {
        title: "4. Neden Floating-Point Yerine Fixed-Point?",
        content: `- **Silikon Alanı:** 32-bitlik bir IEEE-754 FPU toplayıcısı yüzlerce mantık hücresi kaplarken, 16-bitlik sabit noktalı toplayıcı standart basit bir tamsayı toplayıcısıdır (10 kat daha küçük!).
- **Güç Tüketimi:** Fixed-point işlemler %80 daha az güç harcar.
- **Gecikme (Saat Hızı):** Fixed-point çarpma ve toplama tek saat döngüsünde 500+ MHz saat hızında çalışabilir. Bu nedenle modern AI NPU (Neural Processing Unit) çipleri kayan nokta yerine **INT8 ve FP8/Q-format** sabit nokta mimarisi kullanır!`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Kesir noktaları farklı iki sayıyı hizalamadan doğrudan toplamak.**
  *Doğrusu:* $Q_{4.4}$ bir sayı ile $Q_{2.6}$ bir sayıyı toplayamazsınız; önce birini kaydırarak kesir basamak sayılarını eşitlemeniz gerekir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Q1.15 formatında bir ses sinyalinin alabileceği değer aralığı nedir?**
*Cevap:* $-1.0$ ile $+0.999969$ arasındadır (Normalize ses örnekleri için endüstri standardıdır).

**S2: İki Q8.8 sayısı çarpıldığında sonucun formatı ne olur?**
*Cevap:* Q16.16 formatında 32 bitlik bir sayı oluşur.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Fixed-point sanal ikili virgül ile tamsayı donanımında kesirli sayı işlemeyi sağlar.
- Toplamada virgüller hizalanır, çarpmada bit genişlikleri toplanır ($N_1 + N_2$).
- FPU'ya kıyasla muazzam alan, güç ve hız avantajı sağlar; DSP ve yapay zeka çiplerinin temelidir.`,
      },
    ],
    playground: {
      title: "Verilog Q4.4 Sabit Noktalı Çarpma ve Kırpma Simülasyonu",
      filename: "tb_fixed_point.v",
      language: "verilog",
      initialCode: `// Q4.4 Sabit Noktalı Çarpıcı (4 tamsayı, 4 kesir)
module fixed_mult (
  input wire [7:0] a, // Q4.4 (Gerçek değer = a / 16.0)
  input wire [7:0] b, // Q4.4 (Gerçek değer = b / 16.0)
  output wire [7:0] sonuc // Q4.4 kırpılmış sonuç
);
  wire [15:0] tam_carpim;
  assign tam_carpim = a * b; // Q8.8 (16 bit)
  // [11:4] bitlerini alarak tekrar Q4.4'e indirgiyoruz
  assign sonuc = tam_carpim[11:4];
endmodule

module tb_fixed;
  reg [7:0] a, b;
  wire [7:0] sonuc;

  fixed_mult uut (.a(a), .b(b), .sonuc(sonuc));

  initial begin
    // 1.5 (Q4.4: 1.5 * 16 = 24 = 8'h18)
    a = 8'd24;
    // 2.0 (Q4.4: 2.0 * 16 = 32 = 8'h20)
    b = 8'd32;
    #10;
    $display("=== Q4.4 Sabit Noktalı Çarpma Testi ===");
    $display("A = 1.5 (Ham: %d) * B = 2.0 (Ham: %d)", a, b);
    $display("Sonuç Ham: %d -> Gerçek Değer: %f (Beklenen: 3.0)", sonuc, sonuc / 16.0);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Q4.4 Sabit Noktalı Çarpma Testi ===",
        "A = 1.5 (Ham: 24) * B = 2.0 (Ham: 32)",
        "Sonuç Ham: 48 -> Gerçek Değer: 3.000000 (Beklenen: 3.0)",
      ],
    },
    quiz: {
      question: "Q4.4 formatında (4 bit tamsayı, 4 bit kesir) tanımlanmış bir sabit noktalı sayıda en küçük kesir adımı (çözünürlük) kaçtır?",
      options: [
        "A) 0.1",
        "B) 0.0625 (2^-4)",
        "C) 0.5",
        "D) 0.001",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 4 bit kesir olduğunda en küçük basamağın ağırlığı 2^-4 = 1/16 = 0.0625'tir.",
    },
  },
};
