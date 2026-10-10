import { LessonContent } from "./lessonsData";

export const DIGITAL_FUNDAMENTALS_PART3: Record<string, LessonContent> = {
  // ========================================================
  // BÖLÜM 6: BOOLEAN MANTIĞI VE ENKODLAR (BOOLEAN LOGIC)
  // ========================================================
  "df-boolean-logic": {
    id: "df-boolean-logic",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "16 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Boole Cebri ve Mantık Teoremleri (Boolean Logic)",
    subtitle:
      "George Boole aksiyomları, De Morgan yasaları, yutma ve özdeşlik teoremleri, doğruluk tabloları ve minterm/maksterm analizi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital tasarımın matematiksel temeli olan **Boole Cebri (Boolean Algebra)**:
- Mantıksal VE (AND), VEYA (OR) ve DEĞİL (NOT) işlemlerinin cebirsel kuralları.
- Temel Boole Teoremleri: Özdeşlik (Identity), Sıfır/Birim Eleman (Null/Dominance), İdempotans (Idempotence) ve Çift Tümleyen (Involution).
- Dağılma (Distributive) ve Yutma (Absorption) teoremleri ile devre sadeleştirme.
- **De Morgan Yasaları:** Terslemenin çarpım ve toplama dağıtılması ($(\\overline{A \\cdot B}) = \\overline{A} + \\overline{B}$).
- Doğruluk tablolarından fonksiyon çıkarma: **Minterm** (Çarpımların Toplamı - SOP) ve **Maksterm** (Toplamların Çarpımı - POS).`,
      },
      {
        title: "2. Mantık Kapıları ve Boole Sembolleri",
        content: `![Temel mantık kapıları ve simgeleri](/images/digital/logic-gates.png)

Boole cebri yalnızca iki değerle çalışır: \`0\` (Yanlış / Low) ve \`1\` (Doğru / High). Üç temel matematiksel işlem:
- **VE (AND - Çarpma):** $Y = A \\cdot B$. Çıkış yalnızca her iki giriş de 1 iken 1'dir.
- **VEYA (OR - Toplama):** $Y = A + B$. Girişlerden en az biri 1 ise çıkış 1'dir.
- **DEĞİL (NOT - Tümleme):** $Y = \\overline{A}$ veya $Y = A'$. Girişin tersini alır ($0 \\rightarrow 1, 1 \\rightarrow 0$).`,
      },
      {
        title: "3. Temel Boole Aksiyomları ve Teoremleri",
        content: `Devrelerde gereksiz transistörleri elemek için kullanılan altın kurallar:

| Teorem Adı | VE (AND) Formu | VEYA (OR) Formu | Anlamı & Açıklama |
| :--- | :---: | :---: | :--- |
| **Özdeşlik (Identity)** | $A \\cdot 1 = A$ | $A + 0 = A$ | 1 ile AND'lemek veya 0 ile OR'lamak sinyali etkilemez. |
| **Yutma / Hükmetme (Null)** | $A \\cdot 0 = 0$ | $A + 1 = 1$ | 0 AND'i, 1 ise OR'u anında kilitler (Kapılama mantığı). |
| **Tekil Kuvvet (Idempotence)** | $A \\cdot A = A$ | $A + A = A$ | Aynı sinyali kendisiyle çarpmak veya toplamak sonucu değiştirmez. |
| **Tümleme (Complement)** | $A \\cdot \\overline{A} = 0$ | $A + \\overline{A} = 1$ | Bir sinyal ile tersi asla aynı anda 1 olamaz; biri mutlaka 1'dir. |
| **Çift Tümleme (Involution)** | $\\overline{\\overline{A}} = A$ | $\\overline{\\overline{A}} = A$ | İki kez tersini almak orijinal sinyali verir. |
| **Yutma (Absorption)** | $A \\cdot (A + B) = A$ | $A + (A \\cdot B) = A$ | $B$ terimi tamamen yok edilir (Kritik sadeleştirme kuralı!). |`,
      },
      {
        title: "4. De Morgan Yasaları: Mantığın En Güçlü Silahı",
        content: `Augustus De Morgan (1806-1871) tarafından keşfedilen bu iki yasa, mantık kapılarının birbirine dönüştürülmesini sağlar:

1. **Birinci Yasa (NAND Dönüşümü):**
   $$\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$$
   *Anlamı:* İki girişin VE'sinin tersi, terslerinin VEYA'sına eşittir! (NAND kapısı, girişleri terslenmiş OR kapısına eşdeğerdir).
2. **İkinci Yasa (NOR Dönüşümü):**
   $$\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$$
   *Anlamı:* İki girişin VEYA'sının tersi, terslerinin VE'sine eşittir! (NOR kapısı, girişleri terslenmiş AND kapısına eşdeğerdir).`,
      },
      {
        title: "5. Minterm, Maksterm ve Standart Formlar",
        content: `Bir doğruluk tablosundaki veriler iki farklı cebirsel formda yazılabilir:
- **Minterm ($m_i$ - Çarpım Terimi):** Çıkışın \`1\` olduğu satırları temsil eden VE (çarpım) terimleridir. Değişken 1 ise düz ($A$), 0 ise tümleyen ($\\overline{A}$) alınır. Fonksiyon tüm minterm'lerin toplamı olarak yazılır (**SOP - Sum of Products**, $\\sum m$).
- **Maksterm ($M_i$ - Toplam Terimi):** Çıkışın \`0\` olduğu satırları temsil eden VEYA (toplam) terimleridir. Değişken 0 ise düz ($A$), 1 ise tümleyen ($\\overline{A}$) alınır. Fonksiyon tüm maksterm'lerin çarpımı olarak yazılır (**POS - Product of Sums**, $\\prod M$).`,
      },
      {
        title: "6. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: $A + A \\cdot B$ ifadesini sadeleştiremeyip devasa kapılar kurmak.**
  *Doğrusu:* Yutma teoremi gereği $A + A \\cdot B = A(1 + B) = A(1) = A$'dır; $B$ girişine ve ekstra kapılara hiç gerek yoktur!
- **Hata #2: De Morgan uygularken parantez dışı terslemeyi unutmak.**
  *Doğrusu:* $\\overline{A + B} \\neq \\overline{A} + \\overline{B}$; işlem tipi mutlaka zıttına (toplamadan çarpmaya) dönmelidir.`,
      },
      {
        title: "7. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: $Y = A \\cdot \\overline{B} + A \\cdot B$ ifadesinin en sade hali nedir?**
*Cevap:* $A$ parantezine alınırsa: $Y = A(\\overline{B} + B) = A(1) = A$.

**S2: Bir NAND kapısının girişlerine A ve B bağlandığında çıkışı De Morgan ile nasıl yazılır?**
*Cevap:* $\\overline{A} + \\overline{B}$.`,
      },
      {
        title: "8. Özet ve Temel Çıkarımlar",
        content: `- Boole cebri dijital devrelerin basitleştirilmesini ve transistör tasarrufunu sağlar.
- De Morgan yasaları kapı tipleri arasında dönüşüm sağlar.
- Yutma kuralı $A + AB = A$ mantık devrelerini ciddi oranda küçültür.
- Doğruluk tabloları minterm'ler ile SOP ($\Sigma m$) veya maksterm'ler ile POS ($\Pi M$) olarak modellenir.`,
      },
    ],
    playground: {
      title: "Verilog De Morgan Eşdeğerlik Doğrulaması",
      filename: "tb_demorgan.v",
      language: "verilog",
      initialCode: `// De Morgan Kuralı Doğrulama Testi: ~(A & B) == (~A | ~B)
module tb_demorgan;
  reg a, b;
  wire sol_taraf, sag_taraf;

  // De Morgan 1: ~(a & b)
  assign sol_taraf = ~(a & b);
  // De Morgan 1 Eşdeğeri: ~a | ~b
  assign sag_taraf = ~a | ~b;

  initial begin
    $display("=== De Morgan 1. Yasa Testi ===");
    a=0; b=0; #10; $display("A=%b, B=%b -> ~(A&B)=%b | ~A|~B=%b (Eşit)", a, b, sol_taraf, sag_taraf);
    a=0; b=1; #10; $display("A=%b, B=%b -> ~(A&B)=%b | ~A|~B=%b (Eşit)", a, b, sol_taraf, sag_taraf);
    a=1; b=0; #10; $display("A=%b, B=%b -> ~(A&B)=%b | ~A|~B=%b (Eşit)", a, b, sol_taraf, sag_taraf);
    a=1; b=1; #10; $display("A=%b, B=%b -> ~(A&B)=%b | ~A|~B=%b (Eşit)", a, b, sol_taraf, sag_taraf);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== De Morgan 1. Yasa Testi ===",
        "A=0, B=0 -> ~(A&B)=1 | ~A|~B=1 (Eşit)",
        "A=0, B=1 -> ~(A&B)=1 | ~A|~B=1 (Eşit)",
        "A=1, B=0 -> ~(A&B)=1 | ~A|~B=1 (Eşit)",
        "A=1, B=1 -> ~(A&B)=0 | ~A|~B=0 (Eşit)",
      ],
    },
    quiz: {
      question: "Boole cebrinde Y = A + A·B ifadesinin en sade eşdeğeri aşağıdakilerden hangisidir?",
      options: [
        "A) A + B",
        "B) A (Yutma Teoremi gereği)",
        "C) B",
        "D) A · B",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Yutma (Absorption) kuralına göre Y = A(1 + B) = A(1) = A'dır. B değişkeni sonucu asla etkileyemez.",
    },
  },

  // ========================================================
  // BÖLÜM 6: KARNAUGH MAPS (K-MAP)
  // ========================================================
  "df-karnaugh-maps": {
    id: "df-karnaugh-maps",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "17 dk okuma",
    level: "Orta Seviye",
    title: "Karnaugh Haritaları ile Mantık Sadeleştirme (Karnaugh Maps)",
    subtitle:
      "Gray kodu dizilimi, 2-3-4 değişkenli K-Map tabloları, 2'nin kuvvetleri şeklinde gruplama, Don't Care durumları ve kapı sentezi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Karmaşık Boole ifadelerini görsel desen tanıma ile en sade formuna indirgeme sanatı:
- Maurice Karnaugh (1953) tarafından geliştirilen K-Map mantığı.
- Neden satır ve sütun başlıklarında standart ikilik sıra yerine **Gray Kodu (00, 01, 11, 10)** kullanılır?
- Doğruluk tablosundan K-Map ızgarasına değer aktarımı.
- Altın Gruplama Kuralları: Dikdörtgenler, 2'nin kuvvetleri ($1, 2, 4, 8, 16$) ve Toroid (Kenar) komşuluğu.
- **Farketmez Durumları (Don't Care - X):** Grupları büyüterek kapı tasarrufu sağlama.
- Sadeleştirilmiş formun dijital mantık kapılarına dönüştürülmesi.`,
      },
      {
        title: "2. K-Map Mantığı ve Gray Kodu Düzeni",
        content: `![Karnaugh haritası ile mantık sadeleştirme genel görünümü](/images/digital/kmap-example.png)

![Karnaugh haritası genel yapısı ve ızgara düzeni](/images/digital/k-maps.png)

Bir K-Map tablosunda hücreler öyle bir sırayla dizilir ki, yan yana veya alt alta olan her iki komşu hücre arasında **yalnızca tek bir değişkenin değeri değişir** ($A$ ile $\\overline{A}$).
Bu nedenle sütun başlıkları standart sıra (\`00, 01, 10, 11\`) yerine mutlaka **Gray Kodu (\`00, 01, 11, 10\`)** ile dizilmelidir!
Eğer iki komşu hücrede '1' varsa, değişen o tek değişken birbirini nötrler ($A + \\overline{A} = 1$) ve denklemden tamamen düşer!`,
      },
      {
        title: "3. Doğruluk Tablosundan K-Map'e Aktarım Örneği",
        content: `![Doğruluk tablosundan K-Map'e aktarım örneği](/images/digital/example-truth-table.png)

![3-Değişkenli Karnaugh haritası yerleşimi](/images/digital/3var-kmap.png)

![K-Map hücrelerine doğruluk tablosu çıkışlarının yerleştirilmesi](/images/digital/kmap-entry.png)

3 değişkenli ($A, B, C$) bir fonksiyonda:
- Satırlar $A$ değişkenini ($0$ ve $1$), sütunlar ise $BC$ değişkenlerini ($00, 01, 11, 10$) temsil eder.
- Doğruluk tablosundaki her '1' çıkışı tablodaki ilgili adrese yerleştirilir.`,
      },
      {
        title: "4. Gruplama Kuralları (Grouping Rules)",
        content: `![K-Map hücre doldurma ve 1'leri 2'nin kuvvetleri şeklinde gruplama](/images/digital/fill-kmap.png)

K-Map üzerinde 1'leri gruplarken 4 altın kurala uyulmalıdır:
1. **2'nin Kuvveti Kuralı:** Gruplar kesinlikle **1, 2, 4, 8 veya 16** adet komşu 1 içermelidir! (3'lü veya 5'li grup yapılamaz).
2. **Maksimum Boyut Kuralı:** Grup ne kadar büyük olursa o kadar çok değişken yok olur:
   - 2'li grup 1 değişkeni eler.
   - 4'lü grup 2 değişkeni eler.
   - 8'li grup 3 değişkeni eler!
3. **Toroid Yapısı (Kenar Bitişikliği):** Tablonun en sol sütunu ile en sağ sütunu, en üst satırı ile en alt satırı komşudur (silindir/küre gibi katlanır!).
4. **Örtüşme (Overlap):** Bir '1' başka bir grubu büyütmek için birden fazla grupta yer alabilir.`,
      },
      {
        title: "5. Don't Care (Farketmez - X) Durumları",
        content: `Bazı sistemlerde belirli giriş kombinasyonları fiziksel olarak asla gerçekleşmez (örneğin BCD kodlamasında $1010$ ile $1111$ arasındaki 6 kombinasyon geçersizdir) veya devrenin çıkışının ne olduğu önemli değildir.
Bu durumlar tabloda **X (Don't Care)** ile gösterilir.
- **Tasarımcının Avantajı:** X'i işinize geliyorsa bir grubu 2'den 4'e veya 4'ten 8'e büyütmek için '1' gibi kabul edebilirsiniz! Eğer grubu büyütmüyorsa '0' sayıp görmezden gelebilirsiniz. Bu serbestlik devre alanını muazzam küçültür!`,
      },
      {
        title: "6. Sadeleştirilmiş Devrenin Sentezlenmesi",
        content: `![Sadeleştirilmiş K-Map sonucunun mantık kapılarıyla sentezlenmiş hali](/images/digital/kmap-logic-gates.png)

Gruplar belirlendikten sonra her grup için sabit kalan değişkenler yazılır ve VEYA (OR) kapısıyla birleştirilir:
$$Y = \\overline{A}\\overline{C} + \\overline{A}\\overline{B}$$
Bu ifade doğrudan 2 adet AND kapısı, 1 adet OR kapısı ve inverter'lar ile silikona sentezlenir.`,
      },
      {
        title: "7. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Başlıkları 00, 01, 10, 11 şeklinde standart ikili sıra ile yazmak.**
  *Doğrusu:* Bu durumda 01 ile 10 arasında iki bit birden değişir ve komşuluk kuralı çöker; K-Map geçersiz olur.
- **Hata #2: 3'lü veya 6'lı gruplar oluşturmak.**
  *Doğrusu:* Gruplar yalnızca $2^k$ (1, 2, 4, 8) boyutunda olabilir.
- **Hata #3: Köşelerdeki 4 adet 1'i görmeyip ayrı ayrı 2'li gruplar yapmak.**
  *Doğrusu:* Tablonun 4 köşesi toroid geometrisi gereği birbirine komşudur ve 4'lü tek bir süper grup oluşturur!`,
      },
      {
        title: "8. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 4 değişkenli bir K-Map'te 8 adet 1'den oluşan bir grup kaç değişkeni denklemden eler?**
*Cevap:* $2^3 = 8$ olduğu için tam **3 değişkeni eler**; geriye yalnızca tek bir değişken kalır!

**S2: Don't Care (X) içeren bir hücre tek başına grup yapılmalı mıdır?**
*Cevap:* Asla! Don't Care hücreleri yalnızca 1'leri büyütmek için kullanılır; tek başlarına veya sadece X'lerden oluşan bir grup yapılmaz.`,
      },
      {
        title: "9. Özet ve Temel Çıkarımlar",
        content: `- K-Map Boole ifadelerini görsel olarak indirger.
- Sütun ve satırlar Gray kodu (00, 01, 11, 10) ile dizilir.
- Gruplar daima 2'nin kuvvetleri (1, 2, 4, 8, 16) boyutunda ve dikdörtgen olmalıdır.
- Kenarlar ve köşeler birbirine bitişiktir (Toroid yapısı).
- Don't Care (X) durumları grupları büyütmek için 1 kabul edilebilir.`,
      },
    ],
    playground: {
      title: "K-Map Sadeleştirilmiş Mantık Eşdeğerlik Testi",
      filename: "tb_kmap.v",
      language: "verilog",
      initialCode: `// K-Map Sadeleştirme Eşdeğerlik Testi
module tb_kmap;
  reg a, b, c;
  wire ham_ifade, sadelesmis_ifade;

  // Ham İfade: Y = (~A & ~B & C) | (~A & B & C) | (A & B & C)
  assign ham_ifade = (~a & ~b & c) | (~a & b & c) | (a & b & c);
  
  // K-Map Sadeleştirmesi Sonucu: Y = (~A & C) | (B & C) = C & (~A | B)
  assign sadelesmis_ifade = c & (~a | b);

  initial begin
    $display("=== K-Map Sadeleştirme Eşdeğerlik Testi ===");
    a=0; b=0; c=1; #10; $display("A=%b,B=%b,C=%b -> Ham: %b | Sade: %b (Eşit)", a, b, c, ham_ifade, sadelesmis_ifade);
    a=0; b=1; c=1; #10; $display("A=%b,B=%b,C=%b -> Ham: %b | Sade: %b (Eşit)", a, b, c, ham_ifade, sadelesmis_ifade);
    a=1; b=1; c=1; #10; $display("A=%b,B=%b,C=%b -> Ham: %b | Sade: %b (Eşit)", a, b, c, ham_ifade, sadelesmis_ifade);
    a=1; b=0; c=0; #10; $display("A=%b,B=%b,C=%b -> Ham: %b | Sade: %b (Eşit)", a, b, c, ham_ifade, sadelesmis_ifade);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== K-Map Sadeleştirme Eşdeğerlik Testi ===",
        "A=0,B=0,C=1 -> Ham: 1 | Sade: 1 (Eşit)",
        "A=0,B=1,C=1 -> Ham: 1 | Sade: 1 (Eşit)",
        "A=1,B=1,C=1 -> Ham: 1 | Sade: 1 (Eşit)",
        "A=1,B=0,C=0 -> Ham: 0 | Sade: 0 (Eşit)",
      ],
    },
    quiz: {
      question: "Karnaugh haritasında satır ve sütun başlıkları yazılırken neden 00, 01, 10, 11 sırası yerine Gray Kodu (00, 01, 11, 10) kullanılır?",
      options: [
        "A) İkili sayı sisteminin yetersiz olması nedeniyle",
        "B) Yan yana veya alt alta komşu olan iki hücre arasında yalnızca tek bir değişkenin değişmesini (A ve ~A) sağlayarak komşu 1'lerin birbirini sadeleştirebilmesi için",
        "C) Tabloyu daha küçük yapmak için",
        "D) Sadece çift sayıları gruplamak için",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Gray kodunda her adımda yalnızca 1 bit değişir. Bu sayede komşu hücreler tek bir değişken farkına sahip olur; iki komşu hücre gruplandığında değişen o değişken elenir.",
    },
  },

  // ========================================================
  // BÖLÜM 6: UNIVERSAL GATES (NAND & NOR)
  // ========================================================
  "df-universal-gates": {
    id: "df-universal-gates",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "15 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Evrensel Kapılar: Yalnızca NAND veya NOR ile Tasarım (Universal Gates)",
    subtitle:
      "Evrensellik kanıtı, NAND ile NOT/AND/OR/XOR kurulumu, NOR ile fonksiyon sentezi ve çip üretim maliyeti standardizasyonu.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Elektronik üretiminde milyarlarca kapı üretirken fabrikaları tek tipe indirgeyen **Evrensel Kapılar (Universal Gates)**:
- Neden **NAND** ve **NOR** kapılarına "Evrensel Kapı" denir?
- Bir mantık kapısının evrensel sayılması için hangi temel işlemleri yapabilmesi gerekir?
- **Yalnızca NAND Kapıları Kullanarak:** NOT, AND, OR, NOR, XOR ve XNOR kapılarının kurulması.
- **Yalnızca NOR Kapıları Kullanarak:** Temel mantık kapılarının kurulması.
- Entegre devre üretiminde tek bir kapı tipi kullanmanın ekonomik ve teknolojik faydaları.`,
      },
      {
        title: "2. Evrensellik (Universality) Nedir?",
        content: `Bir mantık kapısı seti ile dünyadaki TÜM Boole fonksiyonları ve dijital devreler kurulabiliyorsa o set evrenseldir.
Boole cebri bir devrenin kurulabilmesi için üç temel işleme ihtiyaç duyar: **VE (AND)**, **VEYA (OR)** ve **DEĞİL (NOT)**.
Eğer tek bir kapı türü bu üç işlemi de kendi başına yapabiliyorsa, o kapı tek başına bir bilgisayar inşa etmeye yeterlidir!
İşte **NAND** ve **NOR** bu güce tek başlarına sahiptir.`,
      },
      {
        title: "3. Yalnızca NAND Kapısıyla Tüm Kapıların Kurulması",
        content: `1. **NOT Kapısı:** İki girişi birbirine bağlayın!
   $$Y = \\overline{A \\cdot A} = \\overline{A}$$
2. **AND Kapısı:** NAND çıkışına bir NAND inverter bağlayın!
   $$Y = \\overline{\\overline{A \\cdot B}} = A \\cdot B$$
3. **OR Kapısı:** De Morgan kuralı! Girişleri önce ayrı ayrı NAND inverter'larla tersleyin, sonra NAND'a sokun:
   $$Y = \\overline{\\overline{A} \\cdot \\overline{B}} = A + B$$
4. **XOR Kapısı:** Yalnızca 4 adet NAND kapısıyla kurulur!
   $$Y = A \\oplus B = (A \\cdot \\overline{A \\cdot B}) \\text{ NAND } (B \\cdot \\overline{A \\cdot B})$$`,
      },
      {
        title: "4. Yalnızca NOR Kapısıyla Tüm Kapıların Kurulması",
        content: `1. **NOT Kapısı:** İki girişi birbirine bağlayın:
   $$Y = \\overline{A + A} = \\overline{A}$$
2. **OR Kapısı:** NOR çıkışına bir NOR inverter bağlayın:
   $$Y = \\overline{\\overline{A + B}} = A + B$$
3. **AND Kapısı:** Girişleri tersleyip NOR'a sokun:
   $$Y = \\overline{\\overline{A} + \\overline{B}} = A \\cdot B$$`,
      },
      {
        title: "5. Fabrika Gerçeği: Neden Evrensel Kapılar?",
        content: `Bir yarı iletken fabrikasında 20 farklı transistör maskesi ve kapı tipi üretmek kalite kontrol ve hata payını (defect density) artırır.
Erken dönem süper bilgisayarlar (örneğin Apollo Guidance Computer - AGC) **YALNIZCA 3 girişli NOR kapıları** kullanılarak üretilmiştir! Tüm işlemci tek bir çip tipinin yüzlerce kez tekrarıyla inşa edilmiştir. Modern ASIC'lerde de NAND standardizasyonu benzer bir üretim kolaylığı sağlar.`,
      },
      {
        title: "6. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: AND veya OR kapısının da evrensel olduğunu sanmak.**
  *Doğrusu:* AND ve OR asla tek başlarına evrensel olamaz çünkü bir girişin tersini (NOT) üretemezler! Evrensellik için bünyesinde mutlaka bir evirici (inverter) bulunmalıdır.`,
      },
      {
        title: "7. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir XOR kapısını yalnızca NAND kapılarıyla yapmak için en az kaç NAND gerekir?**
*Cevap:* Tam olarak **4 adet NAND kapısı** yeterlidir.

**S2: Tek girişli bir NAND kapısı neye dönüşür?**
*Cevap:* Girişleri birleştirilmiş bir NAND kapısı standart bir **NOT (Evirici)** kapısına dönüşür.`,
      },
      {
        title: "8. Özet ve Temel Çıkarımlar",
        content: `- NAND ve NOR evrensel kapılardır; tek başlarına tüm dijital mantığı kurabilirler.
- Girişleri birleştirmek inverter üretir.
- De Morgan kuralı sayesinde NAND OR'a, NOR ise AND'e dönüştürülür.
- Üretim standardizasyonu ve maliyet optimizasyonu sağlar.`,
      },
    ],
    playground: {
      title: "Verilog Sadece NAND Kapılarıyla XOR Devresi Simülasyonu",
      filename: "tb_nand_xor.v",
      language: "verilog",
      initialCode: `// Yalnızca 4 Adet NAND Kapısı Kullanılarak Yapılan XOR Kapısı
module xor_from_nand (
  input wire a,
  input wire b,
  output wire y
);
  wire n1, n2, n3;

  assign n1 = ~(a & b);
  assign n2 = ~(a & n1);
  assign n3 = ~(b & n1);
  assign y  = ~(n2 & n3);
endmodule

module tb_xor;
  reg a, b;
  wire y;

  xor_from_nand uut (.a(a), .b(b), .y(y));

  initial begin
    $display("=== 4 NAND ile XOR Testi ===");
    a=0; b=0; #10; $display("%b XOR %b = %b", a, b, y);
    a=0; b=1; #10; $display("%b XOR %b = %b", a, b, y);
    a=1; b=0; #10; $display("%b XOR %b = %b", a, b, y);
    a=1; b=1; #10; $display("%b XOR %b = %b", a, b, y);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 4 NAND ile XOR Testi ===",
        "0 XOR 0 = 0",
        "0 XOR 1 = 1",
        "1 XOR 0 = 1",
        "1 XOR 1 = 0",
      ],
    },
    quiz: {
      question: "Aşağıdaki kapı türlerinden hangisi tek başına tüm dijital mantık kapılarını (NOT, AND, OR, XOR) kurabilme yeteneğine sahip evrensel (universal) bir kapıdır?",
      options: [
        "A) Yalnızca AND kapısı",
        "B) Yalnızca OR kapısı",
        "C) NAND kapısı",
        "D) XOR kapısı",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! NAND ve NOR kapıları evrensel kapılardır. Girişleri birleştirilerek NOT, De Morgan ile OR ve terslenerek AND elde edilebilir.",
    },
  },

  // ========================================================
  // BÖLÜM 6: SOP VS POS IN REAL SILICON
  // ========================================================
  "df-sop-pos": {
    id: "df-sop-pos",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Gerçek Silikonda SOP vs POS ve NAND-NAND Dönüşümü (SOP vs POS)",
    subtitle:
      "Çarpımların Toplamı (AND-OR), Toplamların Çarpımı (OR-AND), De Morgan ile iki kademeli NAND-NAND ve NOR-NOR eşdeğerliği.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Teorik Boole ifadelerinin silikon fabrikasında fiziksel kapılara dönüştürülme stratejisi:
- **SOP (Sum of Products - AND-OR yapısı)** ve **POS (Product of Sums - OR-AND yapısı)**.
- Neden gerçek entegre devrelerde AND-OR kapıları doğrudan kullanılmaz?
- **NAND-NAND Eşdeğerliği:** İki kademeli AND-OR devresinin De Morgan ile birebir iki kademeli NAND-NAND devresine dönüşmesi.
- **NOR-NOR Eşdeğerliği:** İki kademeli OR-AND devresinin NOR-NOR yapısına dönüşmesi.
- Silikonda neden SOP $\\rightarrow$ NAND-NAND dönüşümünün POS $\\rightarrow$ NOR-NOR dönüşümüne ezici üstünlük sağladığı.`,
      },
      {
        title: "2. SOP (AND-OR) ve İki Kademeli Mantık",
        content: `Standart bir Boole ifadesi çarpımların toplamı (SOP) olarak yazıldığında:
$$Y = (A \\cdot B) + (C \\cdot D)$$
Bu devre teoride 1. kademede iki adet **AND** kapısı, 2. kademede ise bir adet **OR** kapısı gerektirir.
Ancak hatırlayın: CMOS teknolojisinde tek bir aşamada AND veya OR üretilemez; her biri için arkasına bir inverter koymak gerekir (AND = NAND + NOT). Bu da toplam 4 transistör kademesi ve gecikme demektir!`,
      },
      {
        title: "3. Sihirli Dönüşüm: NAND-NAND Eşdeğerliği",
        content: `AND-OR devresine De Morgan uygulayalım:
$$Y = (A \\cdot B) + (C \\cdot D)$$
Çift tümleme uygulayalım:
$$Y = \\overline{\\overline{(A \\cdot B) + (C \\cdot D)}}$$
İçteki ifadeye De Morgan uygulayalım:
$$Y = \\overline{\\overline{(A \\cdot B)} \\cdot \\overline{(C \\cdot D)}}$$

**Muazzam Sonuç:**
- 1. Kademe: $A \\cdot B$'yi alan bir **NAND** kapısı ve $C \\cdot D$'yi alan bir **NAND** kapısı!
- 2. Kademe: Bu iki çıkışı alan ikinci bir **NAND** kapısı!

Yani standart bir AND-OR devresi, hiçbir mantık değişikliği olmadan **TAMAMEN NAND KAPILARINDAN OLUŞAN BİR DEVREYE (NAND-NAND)** dönüşür!
Tek bir fazladan inverter gerekmez; devre hem daha hızlıdır hem de çok daha az transistör harcar!`,
      },
      {
        title: "4. POS (OR-AND) ve NOR-NOR Eşdeğerliği",
        content: `Benzer şekilde toplamların çarpımı (POS) biçimindeki bir ifade:
$$Y = (A + B) \\cdot (C + D)$$
Çift tümleme ve De Morgan ile:
$$Y = \\overline{\\overline{(A + B)} + \\overline{(C + D)}}$$
tamamen **NOR-NOR** kapılarına dönüşür.
Ancak daha önce gördüğümüz gibi NOR kapıları CMOS'ta yavaş seri PMOS'lar içerdiği için, modern ASIC sentez araçları devreleri daima **SOP $\\rightarrow$ NAND-NAND** yönünde sentezlemeyi tercih eder!`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: NAND-NAND dönüşümünde aralara fazladan NOT kapısı eklemek.**
  *Doğrusu:* İlk kademedeki NAND'ların çıkışındaki evirici baloncuklar ile ikinci kademedeki NAND'ın De Morgan eşdeğer girişindeki baloncuklar birbirini tamamen iptal eder; araya hiçbir NOT kapısı eklenmez!`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 2 kademeli bir AND-OR devresindeki tüm kapılar aynı girişlerle NAND kapısına dönüştürülürse fonksiyon değişir mi?**
*Cevap:* Hayır! Çıkış fonksiyonu matematiksel olarak birebir aynı kalır.

**S2: Neden FPGA'lerde bu dönüşüm kritik değildir?**
*Cevap:* FPGA'ler kapılar yerine LUT (Look-Up Table) SRAM bellek hücreleri kullandığı için fonksiyonun SOP veya POS olması donanım hızını değiştirmez; ancak ASIC standart hücrelerinde bu dönüşüm hayati önem taşır.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- SOP ifadeleri doğal olarak AND-OR mimarisidir.
- De Morgan kuralları sayesinde AND-OR yapısı doğrudan NAND-NAND yapısına denktir.
- OR-AND yapısı ise NOR-NOR yapısına denktir.
- CMOS fiziğinde NAND hızlı ve küçük olduğu için SOP $\rightarrow$ NAND-NAND dönüşümü endüstri standardıdır.`,
      },
    ],
    playground: {
      title: "Verilog AND-OR vs NAND-NAND Eşdeğerlik Simülasyonu",
      filename: "tb_sop_nand.v",
      language: "verilog",
      initialCode: `// AND-OR vs NAND-NAND Devre Eşdeğerliği
module tb_sop_nand;
  reg a, b, c, d;
  wire and_or_out, nand_nand_out;

  // 1. Klasik AND-OR Yapısı: Y = (A & B) | (C & D)
  assign and_or_out = (a & b) | (c & d);

  // 2. Tamamen NAND Kapılarıyla Kurulan Yapı:
  wire n1, n2;
  assign n1 = ~(a & b);
  assign n2 = ~(c & d);
  assign nand_nand_out = ~(n1 & n2);

  initial begin
    $display("=== AND-OR vs NAND-NAND Eşdeğerlik Testi ===");
    a=1; b=1; c=0; d=0; #10;
    $display("A=1,B=1 -> AND-OR: %b | NAND-NAND: %b (EŞİT)", and_or_out, nand_nand_out);
    a=0; b=1; c=1; d=1; #10;
    $display("C=1,D=1 -> AND-OR: %b | NAND-NAND: %b (EŞİT)", and_or_out, nand_nand_out);
    a=0; b=0; c=0; d=0; #10;
    $display("Hepsi 0 -> AND-OR: %b | NAND-NAND: %b (EŞİT)", and_or_out, nand_nand_out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== AND-OR vs NAND-NAND Eşdeğerlik Testi ===",
        "A=1,B=1 -> AND-OR: 1 | NAND-NAND: 1 (EŞİT)",
        "C=1,D=1 -> AND-OR: 1 | NAND-NAND: 1 (EŞİT)",
        "Hepsi 0 -> AND-OR: 0 | NAND-NAND: 0 (EŞİT)",
      ],
    },
    quiz: {
      question: "İki kademeli bir AND-OR (SOP) mantık devresi De Morgan kuralları uygulandığında doğrudan hangi kapı yapısına dönüştürülebilir?",
      options: [
        "A) İki kademeli NOR-NOR devresine",
        "B) İki kademeli NAND-NAND devresine",
        "C) Sadece XOR kapılarına",
        "D) Inverter gerektiren bir OR-AND devresine",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Çift tümleme ve De Morgan teğetleri uygulandığında birinci kademedeki AND kapıları NAND'a, ikinci kademedeki OR kapısı da NAND'a dönüşür; yani devre doğrudan iki kademeli NAND-NAND devresi olur.",
    },
  },

  // ========================================================
  // BÖLÜM 6: HAZARDS & GLITCHES
  // ========================================================
  "df-hazards-glitches": {
    id: "df-hazards-glitches",
    badge: "Bölüm 6 • Boole Mantığı",
    readingTime: "16 dk okuma",
    level: "İleri Seviye",
    title: "Statik ve Dinamik Tehlikeler (Hazards & Glitches)",
    subtitle:
      "Statik-1 ve Statik-0 tehlikeleri, dinamik tehlikeler, K-Map mutabakat (consensus) terimi ile tehlike eleme ve glitch gücü.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Zamanlama gecikmeleri nedeniyle mantık devrelerinde oluşan sahte sinyal sıçramaları (**Glitch / Hazard**):
- Boole cebrinin "kapı gecikmesi sıfırdır" varsayımının gerçek silikonda çöküşü.
- **Statik-1 Tehlikesi (Static-1 Hazard):** Çıkışın 1 kalması gerekirken anlık olarak 0'a çöküp geri gelmesi ($1 \\rightarrow 0 \\rightarrow 1$).
- **Statik-0 Tehlikesi (Static-0 Hazard):** Çıkışın 0 kalması gerekirken anlık olarak 1'e fırlaması ($0 \\rightarrow 1 \\rightarrow 0$).
- **Dinamik Tehlikeler (Dynamic Hazards):** Çıkış bir seviyeden diğerine geçerken birden fazla kez salınması ($0 \\rightarrow 1 \\rightarrow 0 \\rightarrow 1$).
- K-Map üzerinde komşu gruplar arasındaki boşlukların **Konsensüs (Consensus / Redundant) Terimi** eklenerek kapatılması.
- Glitch'lerin çipte yarattığı sahte saat darbeleri ve %20-%30 gereksiz dinamik güç israfı.`,
      },
      {
        title: "2. Statik-1 Tehlikesi Zamanlama Analizi",
        content: `![Statik-1 hazard dalga biçimi ve glitch oluşumu](/images/digital/5.5-static-1-hazard-timing.svg)

Örnek devre: $Y = A \\cdot B + \\overline{A} \\cdot C$
$B = 1$ ve $C = 1$ iken çıkış teoride:
$$Y = A \\cdot 1 + \\overline{A} \\cdot 1 = A + \\overline{A} = 1$$
Yani $A$ girişi 0 veya 1 ne olursa olsun çıkış **daima 1 kalmalıdır!**

Ancak gerçek silikonda:
- $A$ sinyali 1'den 0'a geçerken, üstteki AND kapısına doğrudan gider.
- Alttaki AND kapısına ise bir **inverter (NOT)** üzerinden gecikmeyle gider!
- İnverter'ın gecikmesi ($t_{inv}$) süresince:
  - Üstteki kapı $A=0$ olduğu için kapanır ($0$).
  - Alttaki kapı henüz $\\overline{A}=1$ bilgisini almadığı için o da $0$'dır!
- Sonuç: Çıkış birkaç pikosaniyeliğine aniden **0'a çöker ve tekrar 1'e fırlar!** İşte bu mikro darbe bir **Glitch**'tir!`,
      },
      {
        title: "3. K-Map ile Tehlikeyi Yok Etme: Konsensüs Terimi",
        content: `![K-Map hazard analizi ve konsensüs terimi ekleme](/images/digital/5.5-kmap-hazard-consensus.svg)

K-Map tablosuna baktığınızda bu tehlikenin neden doğduğu açıkça görülür:
- $A \\cdot B$ grubu ile $\\overline{A} \\cdot C$ grubu yan yanadır ancak **birbirine temas eden sınırları ortak bir döngüyle sarılmamıştır!**
- Giriş bir gruptan diğerine atlarken arada bir mikro boşluk kalır.

**Mühendislik Çözümü (Konsensüs Terimi):**
İki grubun kesiştiği komşu 1'lerin üzerine fazladan (redundant) üçüncü bir grup çizilir:
$$Y = A \\cdot B + \\overline{A} \\cdot C + \\mathbf{B \\cdot C}$$
Buradaki $\\mathbf{B \\cdot C}$ terimi mantıksal olarak gereksiz gibi görünür; ancak $A$ sinyali geçiş yaparken $B=1, C=1$ olduğu sürece çıkışı sımsıkı 1'de tutar ve glitch'i **tamamen yok eder!**`,
      },
      {
        title: "4. Alıştırma ve Çözüm",
        content: `![K-Map hazard alıştırması ve konsensüs grubu çözümü](/images/digital/5.5-exercise-kmap-solution.svg)

Konsensüs terimi eklemek mantık minimizasyonunu (en az kapı kuralını) bozar; fazladan bir AND kapısı ekletir.
Ancak kritik kontrol sinyallerinde (örneğin bir asenkron Reset veya Write Enable hattında) tek bir glitch bile belleğe yanlış veri yazılmasına veya işlemcinin kilitlenmesine yol açabileceği için bu fazladan kapı hayati bir sigortadır!`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Glitch'lerin senkron saatli flip-flop devrelerinde her zaman felakete yol açacağını sanmak.**
  *Doğrusu:* İki flip-flop arasındaki saf kombinasyonel mantıktaki glitch'ler, saat kenarı (Clock Edge) gelmeden önce oturup söndüğü sürece flip-flop tarafından yutulur ve devreye zarar vermez. Ancak saat kenarına yakın oluşan glitch'ler Setup/Hold ihlali yapar; asenkron hatlardaki glitch'ler ise ölümcüldür.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Dinamik tehlike (Dynamic Hazard) nedir?**
*Cevap:* Çıkışın 0'dan 1'e geçerken tek bir geçiş yapmak yerine çoklu farklı gecikme yolları nedeniyle $0 \\rightarrow 1 \\rightarrow 0 \\rightarrow 1$ şeklinde salınarak geçmesidir.

**S2: Kombinasyonel devredeki gereksiz glitch'ler ne tür bir zarara yol açar?**
*Cevap:* Çıkış kapasitanslarını gereksiz yere şarj/deşarj ederek çipin dinamik güç tüketimini %20-%30 oranında boş yere artırır.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Gerçek kapı gecikmeleri Statik-1, Statik-0 ve Dinamik tehlikelere yol açar.
- Statik-1 tehlikesi 1 kalması gereken çıkışın anlık 0 olmasıdır.
- K-Map'te komşu gruplar arasına Konsensüs terimi eklenerek tehlikeler donanımdan temizlenir.
- Asenkron kontrol hatlarında glitch'ler ölümcüldür; senkron tasarımlarda ise gereksiz güç harcar.`,
      },
    ],
    playground: {
      title: "Verilog Glitch ve Tehlike (Hazard) Zamanlama Simülasyonu",
      filename: "tb_hazards.v",
      language: "verilog",
      initialCode: `\`timescale 1ns/1ps
module tb_hazards;
  reg a, b, c;
  wire a_inv;
  wire kol1, kol2, tehlikeli_cikis, guvenli_cikis;

  // İnverter gecikmesi simülasyonu (#1 ns)
  assign #1 a_inv = ~a;

  // 1. Tehlikeli Devre: Y = (A & B) | (~A & C)
  assign kol1 = a & b;
  assign kol2 = a_inv & c;
  assign tehlikeli_cikis = kol1 | kol2;

  // 2. Güvenli Devre (Konsensüs Terimli): Y = (A & B) | (~A & C) | (B & C)
  assign guvenli_cikis = kol1 | kol2 | (b & c);

  initial begin
    $display("=== Glitch ve Hazard Simülasyonu ===");
    b = 1; c = 1; a = 1;
    #5;
    $display("Zaman %t: A=1, B=1, C=1 -> Tehlikeli Çıkış: %b", $time, tehlikeli_cikis);
    
    // A sinyali 1'den 0'a düşüyor
    a = 0;
    #0.5; // İnverter henüz tepki vermedi (a_inv hala 0!)
    $display("Zaman %t: GEÇİŞ ANI! -> Tehlikeli Çıkış: %b (GLITCH!), Güvenli Çıkış: %b", $time, tehlikeli_cikis, guvenli_cikis);
    #1.0; // İnverter oturdu
    $display("Zaman %t: Kararlı Durum -> Tehlikeli Çıkış: %b, Güvenli Çıkış: %b", $time, tehlikeli_cikis, guvenli_cikis);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Glitch ve Hazard Simülasyonu ===",
        "Zaman                 5000: A=1, B=1, C=1 -> Tehlikeli Çıkış: 1",
        "Zaman                 5500: GEÇİŞ ANI! -> Tehlikeli Çıkış: 0 (GLITCH!), Güvenli Çıkış: 1",
        "Zaman                 6500: Kararlı Durum -> Tehlikeli Çıkış: 1, Güvenli Çıkış: 1",
      ],
    },
    quiz: {
      question: "Bir kombinasyonel devrede Statik-1 tehlikesini (Static-1 Hazard) K-Map üzerinde gidermek için uygulanan yöntem nedir?",
      options: [
        "A) Kapıları devreden çıkarmak",
        "B) K-Map'te yan yana duran fakat birbirini kapsamayan komşu grupların arasına örtüşen bir Konsensüs (Redundant) terimi grubu eklemek",
        "C) Saat frekansını düşürmek",
        "D) Bütün kapıları NOR kapısına çevirmek",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Giriş değişkeni bir gruptan diğerine atlarken arada oluşan gecikme boşluğu, iki grubu birbirine bağlayan fazladan bir konsensüs terimi eklenerek tamamen kapatılır.",
    },
  },

  // ========================================================
  // BÖLÜM 7: COMBINATIONAL LOGIC
  // ========================================================
  "df-combinational-logic": {
    id: "df-combinational-logic",
    badge: "Bölüm 7 • Kombinasyonel Mantık",
    readingTime: "15 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Kombinasyonel Mantık Devreleri (Combinational Logic)",
    subtitle:
      "Hafızasız (memoryless) devreler, geri beslemesiz (feedforward) ağlar, doğruluk tabloları ve yayılma gecikmesi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital mantığın iki ana kolundan ilki olan **Kombinasyonel Mantık (Combinational Logic)**:
- Kombinasyonel devrenin kesin tanımı: **Hafızasız (Memoryless)** çalışma prensibi.
- Neden çıkış yalnızca ve yalnızca o anki girişlerin fonksiyonudur? ($Y = f(\\text{Girişler})$).
- Geri besleme (Feedback) yasağı: Neden kombinasyonel devrede çıkış girişe bağlanamaz?
- Tasarım Akışı: Sözel problem $\\rightarrow$ Doğruluk tablosu $\\rightarrow$ K-Map sadeleştirme $\\rightarrow$ Kapı netlist'i.
- Kombinasyonel mantığın ardışıl mantıktan (Sequential Logic) temel farkları.`,
      },
      {
        title: "2. Kombinasyonel Mantığın Temel İlkeleri",
        content: `Bir devrenin kombinasyonel sayılabilmesi için 3 temel şartı sağlaması gerekir:
1. **Hafızasızlık:** Devre geçmişte ne olduğunu, az önce hangi verinin geldiğini kesinlikle hatırlamaz. Girişler ne ise çıkış anında onu üretir.
2. **Geri Besleme Döngüsü Yoktur (No Feedback Loops):** Sinyal daima girişlerden çıkışlara doğru tek yönlü (Directed Acyclic Graph - DAG) akar. Bir kapının çıkışı önceki bir kapının girişine geri dönemez!
3. **Zaman Bağımsızlığı:** Devrede bir saat sinyali (Clock) veya tetikleme kenarı yoktur; giriş değiştiği anda kapı gecikmesi ($t_{pd}$) sonrasında çıkış güncellenir.`,
      },
      {
        title: "3. Standart Kombinasyonel Yapı Taşları",
        content: `Tüm bilgisayarlar bu temel kombinasyonel blokların bir araya gelmesiyle kurulur:
- **Kod Çözücüler (Decoders):** $N$ bitlik ikili kodu $2^N$ adet tekil çıkış hattına açar.
- **Kodlayıcılar (Encoders):** $2^N$ hattan gelen sinyali $N$ bitlik ikili koda sıkıştırır.
- **Çoklayıcılar (Multiplexers - MUX):** Çok sayıda veri girişinden birini seçip tek bir çıkışa yönlendirir.
- **Demultiplexer (DEMUX):** Tek bir veriyi seçilen çıkış hattına dağıtır.
- **Toplayıcılar ve ALU:** İkili toplama, çıkarma ve mantık işlemlerini anlık olarak hesaplar.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Verilog'da kombinasyonel \`always @(*)\` bloğu içinde eksik atanmış \`if\` veya \`case\` bırakmak.**
  *Doğrusu:* Eğer tüm giriş durumları için bir çıkış değeri belirlenmezse (örneğin \`else\` unutulursa), sentez aracı devrenin eski durumu hatırlaması gerektiğini sanarak istenmeyen parazitik bir **LATCH (Mandal)** üretir! Bu en yaygın donanım hatasıdır.`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Bir kombinasyonel devrenin girişleri sabit kaldığı sürece çıkışı kendiliğinden değişebilir mi?**
*Cevap:* Hayır; çıkış tamamen o andaki girişlerin anlık matematiksel fonksiyonudur.

**S2: Kombinasyonel devrede geri besleme döngüsü (feedback) yapılırsa ne olur?**
*Cevap:* Devre hafıza özelliği kazanarak ardışıl mantığa (Latch / Flip-Flop) dönüşür veya kararsız osilasyon (halka osilatörü) üretir.`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- Kombinasyonel devreler hafızasızdır ve geri besleme içermez.
- Çıkış yalnızca mevcut girişlerin fonksiyonudur ($Y = f(X)$).
- Temel bloklar: Decoder, Encoder, MUX, DEMUX, Adder, ALU.
- RTL tasarımında eksik şartlar istenmeyen Latch oluşumuna yol açar.`,
      },
    ],
    playground: {
      title: "Verilog Kombinasyonel Parite Üreteci Testi",
      filename: "tb_comb.v",
      language: "verilog",
      initialCode: `// 4-Bit Çift Parite (Even Parity) Kombinasyonel Devresi
module parity_generator (
  input wire [3:0] veri,
  output wire parite_biti
);
  // Girişteki 1'lerin sayısı tek ise parite=1, çift ise parite=0
  assign parite_biti = veri[3] ^ veri[2] ^ veri[1] ^ veri[0];
endmodule

module tb_comb;
  reg [3:0] veri;
  wire parite;

  parity_generator uut (.veri(veri), .parite_biti(parite));

  initial begin
    $display("=== Kombinasyonel Parite Testi ===");
    veri = 4'b0000; #10; $display("Veri: %b -> Parite: %b", veri, parite);
    veri = 4'b0001; #10; $display("Veri: %b -> Parite: %b (1 Adet 1)", veri, parite);
    veri = 4'b0011; #10; $display("Veri: %b -> Parite: %b (2 Adet 1)", veri, parite);
    veri = 4'b0111; #10; $display("Veri: %b -> Parite: %b (3 Adet 1)", veri, parite);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Kombinasyonel Parite Testi ===",
        "Veri: 0000 -> Parite: 0",
        "Veri: 0001 -> Parite: 1 (1 Adet 1)",
        "Veri: 0011 -> Parite: 0 (2 Adet 1)",
        "Veri: 0111 -> Parite: 1 (3 Adet 1)",
      ],
    },
    quiz: {
      question: "Kombinasyonel bir mantık devresini ardışıl (sequential) bir mantık devresinden ayıran en temel fark nedir?",
      options: [
        "A) Daha yüksek gerilimle çalışması",
        "B) Geçmiş durumları saklayan bir hafıza elemanı ve geri besleme (feedback) içermemesi; çıkışın yalnızca o anki girişlere bağlı olması",
        "C) Sadece AND kapılarından oluşması",
        "D) Sadece saat sinyaliyle (clock) çalışması",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Kombinasyonel devreler tamamen hafızasızdır (memoryless). Çıkış o anki girişlerin saf fonksiyonudur; saat darbesi veya geçmiş durum geçmişi tutulmaz.",
    },
  },

  // ========================================================
  // BÖLÜM 7: DIGITAL DECODER CIRCUIT
  // ========================================================
  "df-decoders": {
    id: "df-decoders",
    badge: "Bölüm 7 • Kombinasyonel Mantık",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Sayısal Kod Çözücüler (Digital Decoder Circuit)",
    subtitle:
      "2-to-4 ve 3-to-8 decoder mimarisi, yetkilendirme (Enable) pini, aktif-düşük çıkışlar ve bellek adres çözümleme.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Mikroişlemcilerin bellek yönetim birimlerinde ve komut çözücülerinde hayati önem taşıyan **Kod Çözücüler (Decoders)**:
- Kod çözücünün temel görevi: $N$ bitlik kodu $2^N$ tekil hattan birine dönüştürmek (One-Hot kodlama).
- **2'den 4'e (2-to-4) Decoder** blok şeması, doğruluk tablosu ve iç kapı devresi.
- **Yetkilendirme Girişi (Enable - EN):** Çipi uykuya alma veya çoklu decoder'ları birleştirme anahtarı.
- Aktif-Yüksek (Active-High) vs Aktif-Düşük (Active-Low) çıkış farkı.
- Bellek adres çözümleme (Memory Address Decoding) ve çevre birimi seçimi (Chip Select - CS).`,
      },
      {
        title: "2. 2-to-4 Decoder Blok Diyagramı ve Doğruluk Tablosu",
        content: `![2-to-4 Decoder blok diyagramı](/images/digital/2x4-decoder-block.png)

![2-to-4 Decoder doğruluk tablosu](/images/digital/2x4-decoder-truth-table.png)

2 girişli ($A, B$) ve 4 çıkışlı ($Y_0, Y_1, Y_2, Y_3$) bir kod çözücüde:
- Giriş \`00\` ise: Yalnızca $Y_0 = 1$ olur.
- Giriş \`01\` ise: Yalnızca $Y_1 = 1$ olur.
- Giriş \`10\` ise: Yalnızca $Y_2 = 1$ olur.
- Giriş \`11\` ise: Yalnızca $Y_3 = 1$ olur.
Her anda çıkışlardan **yalnızca 1 tanesi aktiftir** (One-Hot mantığı).`,
      },
      {
        title: "3. İç Kapı Devresi (Gate-Level Implementation)",
        content: `![2-to-4 Decoder iç kapı devresi](/images/digital/2x4-decoder-circuit.png)

Her çıkış, girişlerin bir minterm'ini temsil eden 3 girişli bir AND kapısından ibarettir:
- $Y_0 = EN \\cdot \\overline{A} \\cdot \\overline{B}$
- $Y_1 = EN \\cdot \\overline{A} \\cdot B$
- $Y_2 = EN \\cdot A \\cdot \\overline{B}$
- $Y_3 = EN \\cdot A \\cdot B$

Eğer $EN = 0$ ise tüm AND kapıları kilitlenir ve girişler ne olursa olsun tüm çıkışlar 0 kalır!`,
      },
      {
        title: "4. Gerçek Dünya Kullanımı: Bellek Adresleme (Chip Select)",
        content: `Bir CPU'nun 16 bitlik adres yolu olduğunu düşünün. CPU'ya 4 farklı RAM/ROM çipi bağlamak istediğinizde:
- Adres yolunun en üst iki biti ($A_{15}, A_{14}$) bir 2-to-4 decoder'a verilir.
- Decoder'ın 4 çıkışı, 4 farklı bellek çipinin **Çip Seçim (Chip Select - CS#)** bacağına bağlanır.
- Böylece CPU adresi değiştirdiğinde hangi bellek çipiyle konuşacağını decoder otomatik olarak seçer!`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Aktif-düşük (Active-Low) çıkışlı decoder'da çıkışı 1 aramak.**
  *Doğrusu:* Birçok endüstriyel decoder (örn: 74HC138) aktif-düşüktür; yani seçilen hat 0V olur, seçilmeyen hatlar 1 kalır.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 4 bitlik bir ikili girişi çözmek için kaç çıkışlı bir decoder gerekir?**
*Cevap:* $2^4 = 16$ çıkışlı (4-to-16 decoder).

**S2: Enable girişi 0 yapıldığında ne olur?**
*Cevap:* Decoder tamamen devre dışı kalır ve tüm çıkışlar pasifleşir.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Decoder $N$ girişten $2^N$ çıkış üretir (One-Hot).
- İç devresi minterm üreten AND kapılarından oluşur.
- Enable pini ile kontrol edilir ve daha büyük decoder'lara basamaklandırılabilir.
- Bellek adresleme ve CPU komut çözümlemenin temelidir.`,
      },
    ],
    playground: {
      title: "Verilog 2-to-4 Decoder Doğrulama Testi",
      filename: "tb_decoder.v",
      language: "verilog",
      initialCode: `// 2-to-4 Decoder Modülü (Enable Girişli)
module decoder_2to4 (
  input wire en,
  input wire [1:0] sel,
  output wire [3:0] y
);
  assign y = en ? (4'b0001 << sel) : 4'b0000;
endmodule

module tb_dec;
  reg en;
  reg [1:0] sel;
  wire [3:0] y;

  decoder_2to4 uut (.en(en), .sel(sel), .y(y));

  initial begin
    $display("=== 2-to-4 Decoder Testi ===");
    en=0; sel=2'b11; #10; $display("EN=0, SEL=%b -> Çıkış: %b (Devre Dışı)", sel, y);
    en=1; sel=2'b00; #10; $display("EN=1, SEL=%b -> Çıkış: %b (Y0 Aktif)", sel, y);
    en=1; sel=2'b01; #10; $display("EN=1, SEL=%b -> Çıkış: %b (Y1 Aktif)", sel, y);
    en=1; sel=2'b10; #10; $display("EN=1, SEL=%b -> Çıkış: %b (Y2 Aktif)", sel, y);
    en=1; sel=2'b11; #10; $display("EN=1, SEL=%b -> Çıkış: %b (Y3 Aktif)", sel, y);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 2-to-4 Decoder Testi ===",
        "EN=0, SEL=11 -> Çıkış: 0000 (Devre Dışı)",
        "EN=1, SEL=00 -> Çıkış: 0001 (Y0 Aktif)",
        "EN=1, SEL=01 -> Çıkış: 0010 (Y1 Aktif)",
        "EN=1, SEL=10 -> Çıkış: 0100 (Y2 Aktif)",
        "EN=1, SEL=11 -> Çıkış: 1000 (Y3 Aktif)",
      ],
    },
    quiz: {
      question: "3 bitlik bir adresi tamamen çözmek için kaç çıkışlı bir kod çözücüye (decoder) ihtiyaç vardır?",
      options: [
        "A) 3 çıkışlı",
        "B) 6 çıkışlı",
        "C) 8 çıkışlı (3-to-8 decoder)",
        "D) 16 çıkışlı",
      ],
      correctIndex: 2,
      explanation:
        "Doğru! N bitlik bir giriş 2^N farklı durum üretir. 3 bit giriş için 2^3 = 8 adet tekil çıkış hattı gerekir.",
    },
  },

  // ========================================================
  // BÖLÜM 7: DIGITAL ENCODER CIRCUIT
  // ========================================================
  "df-encoders": {
    id: "df-encoders",
    badge: "Bölüm 7 • Kombinasyonel Mantık",
    readingTime: "15 dk okuma",
    level: "Orta Seviye",
    title: "Sayısal Kodlayıcılar ve Öncelikli Kodlayıcı (Digital Encoder & Priority Encoder)",
    subtitle:
      "4-to-2 ve 8-to-3 encoder mimarisi, çoklu basma sorunu, Öncelikli Kodlayıcı (Priority Encoder) ve geçerlilik biti (Valid Bit).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Kod çözücünün tam tersi işlemi yapan **Kodlayıcılar (Encoders)**:
- Kodlayıcının görevi: $2^N$ giriş hattından aktif olanı $N$ bitlik ikili koda dönüştürmek.
- 4-to-2 Standart Kodlayıcı blok şeması ve iç devresi.
- Standart kodlayıcının zayıflığı: Aynı anda iki tuşa basılırsa ne olur?
- **Öncelikli Kodlayıcı (Priority Encoder):** En yüksek ağırlıklı girişe öncelik verme kuralı.
- **Geçerlilik Biti (Valid / Active Flag):** Hiçbir tuşa basılmadığı anı temsil eden bayrak.
- Kesme Denetleyicileri (Interrupt Controller - NVIC) mimarisinde kullanımı.`,
      },
      {
        title: "2. 4-to-2 Encoder Devresi",
        content: `![4-to-2 Encoder blok diyagramı](/images/digital/4x2_encoder_bd.png)

![4-to-2 Encoder doğruluk tablosu](/images/digital/4x2_encoder_truth_table.png)

![4-to-2 Encoder iç kapı devresi](/images/digital/4x2_encoder_circuit.png)

Standart bir 4-to-2 kodlayıcıda 4 girişten yalnızca 1 tanesinin 1 olduğu varsayılır:
- $Y_1 = D_3 + D_2$
- $Y_0 = D_3 + D_1$
İç devresi yalnızca iki adet basit OR kapısından ibarettir!`,
      },
      {
        title: "3. Öncelikli Kodlayıcı (Priority Encoder): Neden Zorunludur?",
        content: `Standart kodlayıcı gerçek hayatta kullanılamaz; çünkü:
1. Eğer aynı anda hem $D_1$ hem $D_2$ aktif olursa çıkış $Y=11$ ($3$) üretir; yani basılmayan sahte bir tuş algılanır!
2. Hiçbir tuşa basılmadığında çıkış \`00\` olur; bu da $D_0$'a basılmış gibi algılanır!

**Priority Encoder Çözümü:**
Girişlere hiyerarşik bir öncelik atanır ($D_3 > D_2 > D_1 > D_0$).
Eğer en yüksek öncelikli $D_3$ aktifse, altındaki $D_2, D_1, D_0$ ne olursa olsun (Don't Care - X) çıkış doğrudan \`11\` olur!
Ayrıca devrenin çıkışına bir **Valid (Geçerli - V)** biti eklenir:
- En az bir giriş aktifse $V = 1$.
- Hiçbir giriş aktif değilse $V = 0$ (Böylece boşta bekleme ile $D_0$ birbirinden ayırt edilir!).`,
      },
      {
        title: "4. Gerçek Dünya Kullanımı: Mikroişlemci Kesmeleri (Interrupts)",
        content: `Bir CPU'ya bağlı 8 farklı donanım birimi (klavye, timer, ethernet, disk) aynı anda kesme (interrupt) isteği gönderebilir.
İşlemcinin Kesme Denetleyicisi (Örn: ARM NVIC), gelen 8 kesme hattını bir **Priority Encoder**'a sokar. En acil olan donanımın (örneğin güç kesintisi veya saat) ikili kodunu anında CPU'ya ileterek o servisin çalıştırılmasını sağlar.`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Standart kodlayıcıda birden fazla girişin 1 olabileceğini varsaymak.**
  *Doğrusu:* Standart kodlayıcı kesinlikle One-Hot çalışmak zorundadır; çoklu giriş ihtimali varsa mutlaka Priority Encoder kullanılmalıdır.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 4-to-2 Priority Encoder'da hem D3 hem D1 aktifse çıkış ne olur?**
*Cevap:* D3 daha yüksek öncelikli olduğu için çıkış \`11\` (3) olur; D1 tamamen görmezden gelinir.

**S2: Valid biti neden gereklidir?**
*Cevap:* Hiçbir girişe basılmadığı durum (V=0) ile en düşük öncelikli D0 girişine basıldığı durumu (V=1, Çıkış=00) birbirinden ayırmak için.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Encoder $2^N$ girişten $N$ bit kod üretir.
- Priority Encoder çoklu giriş çakışmalarını öncelik hiyerarşisiyle çözer.
- Valid biti geçerli veri varlığını bildirir.
- CPU kesme denetleyicilerinde (Interrupt Controller) kullanılır.`,
      },
    ],
    playground: {
      title: "Verilog 4-to-2 Öncelikli Kodlayıcı (Priority Encoder) Testi",
      filename: "tb_priority_encoder.v",
      language: "verilog",
      initialCode: `// 4-to-2 Öncelikli Kodlayıcı Modülü (Valid Bitli)
module priority_encoder_4to2 (
  input wire [3:0] in,
  output reg [1:0] code,
  output wire valid
);
  assign valid = |in; // Herhangi bir bit 1 ise valid=1

  always @(*) begin
    if (in[3])      code = 2'b11; // En yüksek öncelik
    else if (in[2]) code = 2'b10;
    else if (in[1]) code = 2'b01;
    else if (in[0]) code = 2'b00;
    else            code = 2'b00;
  end
endmodule

module tb_enc;
  reg [3:0] in;
  wire [1:0] code;
  wire valid;

  priority_encoder_4to2 uut (.in(in), .code(code), .valid(valid));

  initial begin
    $display("=== Priority Encoder Testi ===");
    in = 4'b0000; #10; $display("Giriş: %b -> Kod: %b | Valid: %b (Tuş Yok)", in, code, valid);
    in = 4'b0001; #10; $display("Giriş: %b -> Kod: %b | Valid: %b (D0 Basıldı)", in, code, valid);
    in = 4'b0101; #10; $display("Giriş: %b -> Kod: %b | Valid: %b (D2 ve D0 -> D2 Kazandı!)", in, code, valid);
    in = 4'b1111; #10; $display("Giriş: %b -> Kod: %b | Valid: %b (D3 En Yüksek!)", in, code, valid);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Priority Encoder Testi ===",
        "Giriş: 0000 -> Kod: 00 | Valid: 0 (Tuş Yok)",
        "Giriş: 0001 -> Kod: 00 | Valid: 1 (D0 Basıldı)",
        "Giriş: 0101 -> Kod: 10 | Valid: 1 (D2 ve D0 -> D2 Kazandı!)",
        "Giriş: 1111 -> Kod: 11 | Valid: 1 (D3 En Yüksek!)",
      ],
    },
    quiz: {
      question: "Öncelikli bir kodlayıcıda (Priority Encoder) Valid (Geçerli) bayrak çıkışının temel varlık sebebi nedir?",
      options: [
        "A) Devrenin saat frekansını artırmak",
        "B) Hiçbir girişin aktif olmadığı durum ile en düşük öncelikli (00) girişin aktif olduğu durumu birbirinden ayırt edebilmek",
        "C) Çıkışı terslemek",
        "D) Veriyolunu kapatmak",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Hiçbir giriş aktif değilken de kod çıkışı '00' olabilir, D0 basıldığında da '00' olur. Valid pini 0 olduğunda sistem hiçbir tuşa basılmadığını anlar.",
    },
  },

  // ========================================================
  // BÖLÜM 7: DIGITAL MULTIPLEXER (MUX)
  // ========================================================
  "df-multiplexers": {
    id: "df-multiplexers",
    badge: "Bölüm 7 • Kombinasyonel Mantık",
    readingTime: "15 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Sayısal Çoklayıcılar (Digital Multiplexer - MUX)",
    subtitle:
      "2-to-1 ve 4-to-1 MUX mimarisi, Shannon açılımı ile mantık fonksiyonu gerçekleme ve FPGA LUT yapısı.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Dijital veri yönlendirmenin omurgası olan **Çoklayıcılar (Multiplexers - MUX)**:
- MUX nedir? Çok sayıda girişten tek bir çıkışı seçen dijital veri anahtarı.
- **2'den 1'e (2-to-1) MUX** ve **4'ten 1'e (4-to-1) MUX** devre yapıları.
- Seçim hatları sayısı formülü ($2^S = N$).
- **Shannon Açılımı Teoremi:** Herhangi bir Boole fonksiyonunun HİÇBİR kapı kullanmadan YALNIZCA MUX'lar ile kurulabilmesi!
- FPGA mimarisinin kalbi: **LUT (Look-Up Table)** hücrelerinin aslında birer MUX olması.`,
      },
      {
        title: "2. 2-to-1 ve 4-to-1 MUX Devre Yapısı",
        content: `![2-to-1 MUX mantık devresi](/images/digital/2x1_mux_logic.png)

![4-to-1 MUX mantık devresi](/images/digital/4x1_mux_logic.png)

1. **2-to-1 MUX ($S$ 1 bit):**
   $$Y = \\overline{S} \\cdot I_0 + S \\cdot I_1$$
   - $S=0$ ise $Y = I_0$.
   - $S=1$ ise $Y = I_1$.
2. **4-to-1 MUX ($S_1, S_0$ 2 bit):**
   $$Y = \\overline{S_1}\\overline{S_0} I_0 + \\overline{S_1} S_0 I_1 + S_1 \\overline{S_0} I_2 + S_1 S_0 I_3$$`,
      },
      {
        title: "3. Shannon Açılımı: MUX ile Evrensel Mantık",
        content: `Claude Shannon (1949), herhangi bir $f(A, B, C)$ Boole fonksiyonunun seçim hatları üzerinden açılabileceğini kanıtlamıştır:
$$f(A, B) = \\overline{A} \\cdot f(0, B) + A \\cdot f(1, B)$$

Bu muazzam teorem sayesinde:
Tek bir 4-to-1 MUX kullanarak VE, VEYA, XOR, NAND dahil **DÜNYADAKİ TÜM 2 DEĞİŞKENLİ MANTIK FONKSİYONLARINI** tek kuruş ekstra kapı harcamadan gerçekleyebilirsiniz! Giriş pinlerine sabit 0, 1 veya değişkenleri bağlamanız yeterlidir.
İşte FPGA çiplerinin içine binlerce minik 4-to-1 ve 6-to-1 MUX (LUT) konulmasının sırrı budur!`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Seçim biti sayısını yanlış hesaplamak.**
  *Doğrusu:* $N$ girişli bir MUX için $\\log_2(N)$ adet seçim biti gerekir (örn: 8 giriş için 3 seçim biti).`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 8'den 1'e bir MUX (8-to-1) kaç seçim hattına ihtiyaç duyar?**
*Cevap:* $2^3 = 8$ olduğu için **3 adet seçim hattı** ($S_2, S_1, S_0$) gerekir.

**S2: 2-to-1 MUX ile bir NOT kapısı nasıl yapılır?**
*Cevap:* $I_0 = 1$, $I_1 = 0$ bağlanır ve giriş $S$ seçicisine verilir. $S=0$ iken çıkış 1, $S=1$ iken çıkış 0 olur!`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- MUX çoklu girişlerden birini seçer.
- $N$ giriş için $\log_2(N)$ seçim biti gerekir.
- Shannon açılımı sayesinde her mantık fonksiyonu MUX ile kurulabilir.
- FPGA çiplerinin temel lojik yapı taşıdır.`,
      },
    ],
    playground: {
      title: "Verilog 4-to-1 MUX Veri Yönlendirme Simülasyonu",
      filename: "tb_mux.v",
      language: "verilog",
      initialCode: `// 4-to-1 Çoklayıcı (MUX) Modülü
module mux_4to1 (
  input wire [3:0] in,
  input wire [1:0] sel,
  output reg out
);
  always @(*) begin
    case (sel)
      2'b00: out = in[0];
      2'b01: out = in[1];
      2'b10: out = in[2];
      2'b11: out = in[3];
    endcase
  end
endmodule

module tb_mux;
  reg [3:0] in;
  reg [1:0] sel;
  wire out;

  mux_4to1 uut (.in(in), .sel(sel), .out(out));

  initial begin
    in = 4'b1010; // in[3]=1, in[2]=0, in[1]=1, in[0]=0
    $display("=== 4-to-1 MUX Testi (Girişler: %b) ===", in);
    sel = 2'b00; #10; $display("SEL=00 -> Çıkış in[0]: %b", out);
    sel = 2'b01; #10; $display("SEL=01 -> Çıkış in[1]: %b", out);
    sel = 2'b10; #10; $display("SEL=10 -> Çıkış in[2]: %b", out);
    sel = 2'b11; #10; $display("SEL=11 -> Çıkış in[3]: %b", out);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 4-to-1 MUX Testi (Girişler: 1010) ===",
        "SEL=00 -> Çıkış in[0]: 0",
        "SEL=01 -> Çıkış in[1]: 1",
        "SEL=10 -> Çıkış in[2]: 0",
        "SEL=11 -> Çıkış in[3]: 1",
      ],
    },
    quiz: {
      question: "16 farklı veri hattı arasından tek bir hattı seçip çıkışa aktarmak için tasarlanacak bir MUX kaç adet seçim (Select) bitine ihtiyaç duyar?",
      options: [
        "A) 2",
        "B) 4 (çünkü 2^4 = 16)",
        "C) 8",
        "D) 16",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! 2^S = N kuralına göre 16 giriş için 2^4 = 16 olduğundan 4 adet seçim biti gerekir.",
    },
  },

  // ========================================================
  // BÖLÜM 7: DIGITAL DEMULTIPLEXER (DEMUX)
  // ========================================================
  "df-demultiplexers": {
    id: "df-demultiplexers",
    badge: "Bölüm 7 • Kombinasyonel Mantık",
    readingTime: "14 dk okuma",
    level: "Orta Seviye",
    title: "Sayısal Veri Dağıtıcılar (Digital Demultiplexer - DEMUX)",
    subtitle:
      "1-to-2 ve 1-to-4 DEMUX devreleri, veri dağıtımı, MUX-DEMUX haberleşme çifti ve decoder ile yapısal farklar.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Çoklayıcının tam zıttı olan **Veri Dağıtıcılar (Demultiplexers - DEMUX)**:
- DEMUX nedir? Tek bir veri hattını seçim bitlerine göre çok sayıda çıkıştan birine yönlendiren devre.
- **1'den 2'ye (1-to-2)** ve **1'den 4'e (1-to-4)** DEMUX iç mantığı.
- MUX ve DEMUX ikilisinin haberleşme hatlarında tek tel üzerinden çoklu kanal iletimi (TDM - Zaman Bölmeli Çoğullama).
- DEMUX ile Decoder arasındaki şaşırtıcı benzerlik.`,
      },
      {
        title: "2. 1-to-2 ve 1-to-4 DEMUX Devre Yapısı",
        content: `![1-to-2 DEMUX mantık devresi](/images/digital/1x2_demux_logic.png)

![1-to-4 DEMUX mantık devresi](/images/digital/1x4_demux_logic.png)

1. **1-to-2 DEMUX:** Tek veri girişi ($D$), tek seçim biti ($S$) ve 2 çıkış ($Y_0, Y_1$):
   - $Y_0 = D \\cdot \\overline{S}$
   - $Y_1 = D \\cdot S$
2. **1-to-4 DEMUX:** 2 seçim biti ($S_1, S_0$) ile veri $Y_0, Y_1, Y_2, Y_3$ hatlarından birine akar; seçilmeyen diğer tüm hatlar 0 kalır.`,
      },
      {
        title: "3. DEMUX vs Decoder: Aradaki Fark Nedir?",
        content: `Aslında bir DEMUX ile Enable pinine sahip bir Decoder **TAMAMEN AYNI DEVREDİR!**
- Decoder'ın Enable (EN) pinine sabit bir güç vermek yerine **Veri Sinyalini ($D$)** bağlarsanız, decoder anında bir DEMUX'a dönüşür!
- Decoder adresi çözer (One-Hot üretir); DEMUX ise gelen veri sinyalini seçilen o hatta pompalar.`,
      },
      {
        title: "4. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Seçilmeyen DEMUX çıkışlarının havada (Hi-Z) kaldığını sanmak.**
  *Doğrusu:* Standart kombinasyonel DEMUX çıkışları seçilmediğinde 0 üretir; havada kalmaz (Tri-state değildir).`,
      },
      {
        title: "5. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: 1-to-8 DEMUX kaç seçim bitine ihtiyaç duyar?**
*Cevap:* $2^3 = 8$ olduğundan 3 bit.

**S2: MUX ve DEMUX birlikte nasıl kullanılır?**
*Cevap:* Verici tarafındaki MUX 4 farklı sensör verisini sırayla tek bir kabloya basar; alıcı tarafındaki DEMUX aynı kablodan gelen veriyi sırayla 4 farklı ekrana dağıtır (Serileştirme/Paralelleştirme).`,
      },
      {
        title: "6. Özet ve Temel Çıkarımlar",
        content: `- DEMUX tek bir girişi çoklu çıkışlardan birine yönlendirir.
- MUX'un tam ayna görüntüsüdür.
- Enable pinli bir Decoder devresiyle birebir aynı donanımdır.`,
      },
    ],
    playground: {
      title: "Verilog 1-to-4 DEMUX Dağıtım Testi",
      filename: "tb_demux.v",
      language: "verilog",
      initialCode: `// 1-to-4 DEMUX Modülü
module demux_1to4 (
  input wire d,
  input wire [1:0] sel,
  output reg [3:0] y
);
  always @(*) begin
    y = 4'b0000;
    y[sel] = d;
  end
endmodule

module tb_demux;
  reg d;
  reg [1:0] sel;
  wire [3:0] y;

  demux_1to4 uut (.d(d), .sel(sel), .y(y));

  initial begin
    d = 1; // İletilecek veri
    $display("=== 1-to-4 DEMUX Testi (Veri D = 1) ===");
    sel = 2'b00; #10; $display("SEL=00 -> Çıkışlar: %b (Y0'a Dağıtıldı)", y);
    sel = 2'b01; #10; $display("SEL=01 -> Çıkışlar: %b (Y1'e Dağıtıldı)", y);
    sel = 2'b10; #10; $display("SEL=10 -> Çıkışlar: %b (Y2'ye Dağıtıldı)", y);
    sel = 2'b11; #10; $display("SEL=11 -> Çıkışlar: %b (Y3'e Dağıtıldı)", y);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 1-to-4 DEMUX Testi (Veri D = 1) ===",
        "SEL=00 -> Çıkışlar: 0001 (Y0'a Dağıtıldı)",
        "SEL=01 -> Çıkışlar: 0010 (Y1'e Dağıtıldı)",
        "SEL=10 -> Çıkışlar: 0100 (Y2'ye Dağıtıldı)",
        "SEL=11 -> Çıkışlar: 1000 (Y3'e Dağıtıldı)",
      ],
    },
    quiz: {
      question: "Bir Demultiplexer (DEMUX) devresi ile Enable girişine sahip bir Decoder devresi arasındaki donanımsal ilişki nasıldır?",
      options: [
        "A) Birbirleriyle hiçbir alakaları yoktur",
        "B) Decoder'ın Enable girişine veri sinyali bağlandığında devre birebir bir DEMUX devresine dönüşür; yapısal olarak tamamen aynıdırlar",
        "C) Biri analog diğeri dijitaldir",
        "D) DEMUX'un çıkışları daima hafızalıdır",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Enable pinli bir kod çözücünün Enable bacağına veri sinyali uygulandığında devre tam anlamıyla bir 1-to-N Demultiplexer gibi çalışır.",
    },
  },

  // ========================================================
  // BÖLÜM 7: HALF-ADDER & FULL-ADDER
  // ========================================================
  "df-half-full-adder": {
    id: "df-half-full-adder",
    badge: "Bölüm 7 • Kombinasyonel Mantık",
    readingTime: "16 dk okuma",
    level: "Orta Seviye",
    title: "Yarım ve Tam Toplayıcılar (Half-Adder & Full-Adder)",
    subtitle:
      "XOR toplamı, AND eldesi, iki yarım toplayıcıdan tam toplayıcı kurma, Ripple Carry Adder (RCA) ve Carry Lookahead (CLA) gecikmesi.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Mikroişlemcilerin kalbi olan ALU'nun en temel yapı taşları:
- **Yarım Toplayıcı (Half-Adder):** İki biti toplayan XOR + AND yapısı.
- Yarım toplayıcının kısıtı: Neden alt basamaktan gelen eldeyi ($C_{in}$) toplayamaz?
- **Tam Toplayıcı (Full-Adder):** 3 biti ($A, B, C_{in}$) toplayıp Toplam ($Sum$) ve Elde ($C_{out}$) üreten devre.
- İki adet Yarım Toplayıcı ve bir OR kapısı ile Tam Toplayıcı sentezi.
- Çok bitlik **Ripple Carry Adder (RCA)** ve $O(N)$ gecikme darboğazı.
- Çözüm: **Carry Lookahead Adder (CLA)** ile eldenin anında paralel hesaplanması.`,
      },
      {
        title: "2. Yarım Toplayıcı (Half-Adder)",
        content: `![Yarım Toplayıcı devre şeması](/images/digital/half_adder.png)

![Yarım Toplayıcı doğruluk tablosu](/images/digital/half_adder_truth_table.png)

İki adet 1-bitlik sayıyı ($A, B$) toplar:
- **Toplam (Sum - $S$):** $S = A \\oplus B$ (Farklı iken 1, aynı iken 0).
- **Elde (Carry - $C$):** $C = A \\cdot B$ (Yalnızca her ikisi de 1 iken elde 1 oluşur).
Eksik Yönü: Alt basamaktan gelebilecek bir elde girişine ($C_{in}$) sahip DEĞİLDİR! Bu yüzden tek başına çok bitlik sayılarda kullanılamaz.`,
      },
      {
        title: "3. Tam Toplayıcı (Full-Adder)",
        content: `![Tam toplayıcı I/O portları](/images/digital/full-adder-io.png)

![Tam toplayıcı K-Map sadeleştirmesi](/images/digital/full_adder_kmap.png)

![Tam toplayıcının iki yarım toplayıcı ile kurulması](/images/digital/full-adder-with-ha.png)

![Tam toplayıcı iç mantık kapıları](/images/digital/full-adder-logic-gates.png)

Tam toplayıcı alt basamağın eldesini de ($C_{in}$) hesaba katar:
$$Sum = A \\oplus B \\oplus C_{in}$$
$$C_{out} = (A \\cdot B) + (C_{in} \\cdot (A \\oplus B))$$

İki yarım toplayıcı arka arkaya bağlanıp eldeleri OR kapısına verildiğinde tam toplayıcı kusursuz şekilde kurulur!`,
      },
      {
        title: "4. Ripple Carry Adder (RCA) Gecikme Darboğazı",
        content: `32 bitlik iki sayıyı toplamak için 32 adet Tam Toplayıcı yan yana bağlanır.
Her toplayıcının $C_{out}$ çıkışı bir sonrakinin $C_{in}$ girişine bağlanır.
**Kritik Yol Darboğazı:**
32. toplayıcı, 1. toplayıcının ürettiği eldenin tüm toplayıcıların içinden dalga dalga (ripple) geçmesini beklemek zorundadır!
Gecikme bit sayısı ile doğrusal artar: $t_{delay} = N \\times t_{carry}$.
Modern işlemciler bu darboğazı kırmak için eldenin önceden paralel hesaplandığı **Carry Lookahead Adder (CLA)** toplayıcılarını kullanır.`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: İki yarım toplayıcının eldelerini toplarken OR yerine XOR kapısı aramak.**
  *Doğrusu:* İki yarım toplayıcı aynı anda asla elde üretemez; bu nedenle çıkıştaki OR kapısı aslında bir XOR gibi davranır ve güvenle OR kullanılabilir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: A=1, B=1, Cin=1 iken Full Adder çıkışları ne olur?**
*Cevap:* Toplam 3 ettiği için ($11_2$): $Sum = 1$ ve $C_{out} = 1$.

**S2: 64 bitlik bir toplayıcıda RCA neden tercih edilmez?**
*Cevap:* Elde yayılma gecikmesi 64 kapı boyunca uzayarak saat frekansını çok düşürür.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Half Adder 2 biti toplar (XOR + AND), Cin girişi yoktur.
- Full Adder 3 biti toplar ($A, B, C_{in}$).
- İki Half Adder + bir OR kapısı = Full Adder.
- RCA eldenin yayılmasını beklediği için yavaştır; hızlı toplayıcılar CLA kullanır.`,
      },
    ],
    playground: {
      title: "Verilog 4-Bit Ripple Carry Adder Testi",
      filename: "tb_adder.v",
      language: "verilog",
      initialCode: `// 1-Bit Full Adder
module full_adder (
  input wire a, b, cin,
  output wire sum, cout
);
  assign sum  = a ^ b ^ cin;
  assign cout = (a & b) | (cin & (a ^ b));
endmodule

// 4-Bit Ripple Carry Adder
module rca_4bit (
  input wire [3:0] a, b,
  input wire cin,
  output wire [3:0] sum,
  output wire cout
);
  wire c1, c2, c3;
  full_adder fa0 (a[0], b[0], cin, sum[0], c1);
  full_adder fa1 (a[1], b[1], c1,  sum[1], c2);
  full_adder fa2 (a[2], b[2], c2,  sum[2], c3);
  full_adder fa3 (a[3], b[3], c3,  sum[3], cout);
endmodule

module tb_add;
  reg [3:0] a, b;
  reg cin;
  wire [3:0] sum;
  wire cout;

  rca_4bit uut (.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));

  initial begin
    $display("=== 4-Bit RCA Toplayıcı Testi ===");
    a = 4'd5; b = 4'd3; cin = 0; #10;
    $display("%d + %d + Cin(%b) = %d (Cout: %b)", a, b, cin, sum, cout);
    a = 4'd12; b = 4'd7; cin = 0; #10;
    $display("%d + %d + Cin(%b) = %d (Cout: %b -> Toplam 19!)", a, b, cin, sum, cout);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 4-Bit RCA Toplayıcı Testi ===",
        " 5 +  3 + Cin(0) =  8 (Cout: 0)",
        "12 +  7 + Cin(0) =  3 (Cout: 1 -> Toplam 19!)",
      ],
    },
    quiz: {
      question: "Tam Toplayıcı (Full-Adder) devresi, Yarım Toplayıcı (Half-Adder) devresinden hangi kritik özelliği ile ayrılır?",
      options: [
        "A) Çıkarma yapabilmesiyle",
        "B) Alt basamaktan gelen elde girişini (Cin) de hesaba katarak 3 biti aynı anda toplayabilmesiyle",
        "C) Sadece çift sayıları toplamasıyla",
        "D) Kayan noktalı çalışmasıyla",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Yarım toplayıcı yalnızca 2 biti toplar ve Cin girişi yoktur. Tam toplayıcı ise alt basamaktan devreden eldeyi (Cin) de toplayarak zincirleme çok bitlik toplamayı mümkün kılar.",
    },
  },

  // ========================================================
  // BÖLÜM 7: COMPARATORS & ALUS
  // ========================================================
  "df-comparators-alu": {
    id: "df-comparators-alu",
    badge: "Bölüm 7 • Kombinasyonel Mantık",
    readingTime: "16 dk okuma",
    level: "İleri Seviye",
    title: "Karşılaştırıcılar ve Aritmetik Mantık Birimi (Comparators & ALUs)",
    subtitle:
      "Eşitlik ve büyüklük karşılaştırıcıları (Magnitude Comparator), paylaşımlı toplayıcı mimarisi, bayraklar (Zero, Negative, Carry, Overflow).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `CPU'ların hesaplama beyni olan **ALU (Aritmetik Mantık Birimi)** ve **Karşılaştırıcılar (Comparators)**:
- Eşitlik Karşılaştırıcısı ($A == B$) ve XNOR kapıları.
- Büyüklük Karşılaştırıcısı ($A > B, A < B$) ve MSB öncelikli karar mimarisi.
- Birleşik ALU Tasarımı: Toplama, çıkarma, AND, OR, XOR işlemlerini tek çatı altında toplama.
- **Paylaşımlı Donanım (Shared Adder):** Çıkarma ve karşılaştırma için ayrı devre kurmayıp toplayıcıyı yeniden kullanma.
- İşlemci Durum Bayrakları: **Z (Zero)**, **N (Negative)**, **C (Carry)**, **V (Overflow)**.`,
      },
      {
        title: "2. Sayısal Karşılaştırıcılar (Comparators)",
        content: `1. **Eşitlik ($A == B$):** İki bit aynı olduğunda 1 üreten kapı **XNOR**'dur ($A \\odot B$). Çok bitlik iki sayının eşit olması için tüm bitlerin XNOR çıkışları bir AND kapısında birleştirilir:
   $$\\text{Eşit} = (A_3 \\odot B_3) \\cdot (A_2 \\odot B_2) \\cdot (A_1 \\odot B_1) \\cdot (A_0 \\odot B_0)$$
2. **Büyüklük ($A > B$):** En yüksek basamaktan (MSB) başlanır. Eğer $A_{MSB} = 1$ ve $B_{MSB} = 0$ ise anında $A > B$'dir. Eğer eşitlerse bir alt basamağa bakılır.`,
      },
      {
        title: "3. ALU Blok Mimarisi ve Paylaşımlı Toplayıcı",
        content: `![ALU paylaşımlı toplayıcı blok şeması](/images/digital/6.7-alu-shared-adder-block-diagram.svg)

Modern bir ALU ayrı bir çıkarıcı veya ayrı bir büyüklük karşılaştırıcısı içermez!
- $A - B$ için toplayıcı $A + \\overline{B} + 1$ modunda çalıştırılır.
- $A < B$ karşılaştırması ($A - B < 0$) için yine toplayıcıda çıkarma yapılır ve sonucun negatiflik bayrağı ($N$) veya taşma ($V$) incelenir!
Çıkışta bir Multiplexer bulunur; Opcode kontrol sinyaline göre Aritmetik, Mantıksal veya Kaydırma sonucunu işlemci veriyoluna sürer.`,
      },
      {
        title: "4. CPU Durum Bayrakları (ALU Flags)",
        content: `Her ALU işlemi sonucunda 4 kritik bayrak güncellenir:
- **Z (Zero):** Sonucun tüm bitleri sıfırsa 1 olur (Dallanma komutları için: \`BEQ\`).
- **N (Negative):** Sonucun MSB biti 1 ise (negatifse) 1 olur (\`BLT\`).
- **C (Carry):** İşaretsiz toplama taşmışsa 1 olur.
- **V (Overflow):** İşaretli toplama taşmışsa 1 olur.`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: Her işlem için ayrı donanım bloğu sentezlemek.**
  *Doğrusu:* Donanım paylaşımı (resource sharing) yapılarak alan ve güç optimize edilmelidir.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: ALU'da A == B kontrolü en hızlı nasıl yapılır?**
*Cevap:* $A - B$ çıkarma işlemi yapılır; eğer Zero bayrağı ($Z=1$) kalkarsa sayılar eşittir!

**S2: 8 bitlik bir ALU'da Opcode 3 bit ise kaç farklı komut desteklenebilir?**
*Cevap:* $2^3 = 8$ farklı aritmetik ve mantıksal işlem.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Karşılaştırıcılar XNOR ve çıkarma ile çalışır.
- ALU tek bir paylaşımlı toplayıcı etrafında çoklu işlem yürütür.
- Z, N, C, V bayrakları işlemci dallanmalarını (if/else) yönetir.`,
      },
    ],
    playground: {
      title: "Verilog 8-Bit Çok Fonksiyonlu ALU Testi",
      filename: "tb_alu.v",
      language: "verilog",
      initialCode: `// 8-Bit Aritmetik Mantık Birimi (ALU)
module alu_8bit (
  input wire [7:0] a, b,
  input wire [2:0] opcode,
  output reg [7:0] out,
  output wire zero, neg
);
  always @(*) begin
    case (opcode)
      3'b000: out = a + b;       // Topla
      3'b001: out = a - b;       // Çıkar
      3'b010: out = a & b;       // VE
      3'b011: out = a | b;       // VEYA
      3'b100: out = a ^ b;       // XOR
      3'b101: out = ~a;          // DEĞİL
      3'b110: out = a << 1;      // Sola Kaydır
      3'b111: out = (a < b) ? 8'd1 : 8'd0; // SLT
    endcase
  end

  assign zero = (out == 8'b0);
  assign neg  = out[7];
endmodule

module tb_alu_test;
  reg [7:0] a, b;
  reg [2:0] op;
  wire [7:0] out;
  wire z, n;

  alu_8bit uut (.a(a), .b(b), .opcode(op), .out(out), .zero(z), .neg(n));

  initial begin
    $display("=== 8-Bit ALU Testi ===");
    a = 20; b = 20; op = 3'b001; #10; // Çıkar (20 - 20 = 0)
    $display("20 - 20 = %d | Zero Bayrağı: %b (Eşitlik Doğrulandı)", out, z);
    a = 15; b = 25; op = 3'b000; #10; // Topla (15 + 25 = 40)
    $display("15 + 25 = %d | Zero: %b", out, z);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== 8-Bit ALU Testi ===",
        "20 - 20 =   0 | Zero Bayrağı: 1 (Eşitlik Doğrulandı)",
        "15 + 25 =  40 | Zero: 0",
      ],
    },
    quiz: {
      question: "Bir işlemcinin ALU biriminde 'A == B' eşitlik karşılaştırması en az donanım harcayarak nasıl gerçekleştirilir?",
      options: [
        "A) Belleğe yazıp tekrar okuyarak",
        "B) A'dan B'yi çıkarıp (A - B) sonucun Zero (Sıfır) bayrağını kontrol ederek",
        "C) Sayıları çarparak",
        "D) Sayıları kaydırarak",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Zaten ALU içinde var olan çıkarma devresi kullanılır. A - B = 0 ise Zero bayrağı 1 olur ve işlemci iki sayının eşit olduğunu anlar.",
    },
  },

  // ========================================================
  // BÖLÜM 7: PROPAGATION DELAY & CRITICAL PATH
  // ========================================================
  "df-propagation-delay": {
    id: "df-propagation-delay",
    badge: "Bölüm 7 • Kombinasyonel Mantık",
    readingTime: "17 dk okuma",
    level: "İleri Seviye",
    title: "Yayılma Gecikmesi ve Kritik Yol Analizi (Propagation Delay & Critical Path)",
    subtitle:
      "Tpd ve Tcd gecikmeleri, en uzun zamanlama yolu (Kritik Yol), saat periyodu bütçesi, maksimum frekans (Fmax) ve Statik Zamanlama Analizi (STA).",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Learning Objectives)",
        content: `Bir çipin kaç GHz hızında çalışabileceğini belirleyen zamanlama sınırları:
- **Yayılma Gecikmesi (Propagation Delay - $t_{pd}$)** ve **Kirlenme Gecikmesi (Contamination Delay - $t_{cd}$)**.
- **Kritik Yol (Critical Path):** Giriş register'ından çıkış register'ına kadar en uzun gecikmeye sahip mantık yolu.
- Saat Periyodu Bütçesi ($T_{clk}$): Flop gecikmesi ($T_{cq}$), Mantık gecikmesi ($T_{comb}$) ve Kurulum zamanı ($T_{setup}$).
- Maksimum Saat Frekansı Formülü ($F_{max} = 1 / T_{clk,min}$).
- **Statik Zamanlama Analizi (STA):** Çip sentezinde zamanlama kapanışı (Timing Closure).`,
      },
      {
        title: "2. Gecikme Türleri: tpd vs tcd",
        content: `Bir mantık kapısının girişindeki geçiş anından çıkışındaki tepkiye kadar geçen süre:
- **Propagation Delay ($t_{pd}$ - En Kötü Durum):** Giriş %50 seviyesine ulaştıktan sonra çıkışın kararlı hale gelip %50 seviyesini geçtiği **MAKSİMUM** süredir.
- **Contamination Delay ($t_{cd}$ - En İyi Durum):** Giriş değiştikten sonra çıkışın değişmeye başladığı **MİNİMUM** süredir.`,
      },
      {
        title: "3. Kritik Yol (Critical Path) Mimarisi",
        content: `![Zamanlama yolları ve kritik yol diyagramı](/images/digital/6.8-timing-paths-critical-path.svg)

Bir çipte trilyonlarca mantık yolu vardır. Ancak çipin saat frekansını bu yollardan **EN YAVAŞ OLANI (Kritik Yol)** belirler!
Kritik yol üzerindeki tek bir kapının gecikmesi bile tüm işlemcinin saat frekansını düşürür. Tasarımcılar zamanlamayı tutturmak için kritik yoldaki mantığı sadeleştirir veya araya ekstra Flip-Flop koyarak boru hattına (Pipeline) böler.`,
      },
      {
        title: "4. Saat Periyodu Bütçesi ve Fmax Hesabı",
        content: `![Saat periyodu bütçelemesi](/images/digital/6.8-clock-period-budget.svg)

İki ardışık Flip-Flop arasındaki saat periyodu bütçesi şu eşitsizliği sağlamalıdır:
$$T_{clk} \\ge T_{cq} + T_{comb,max} + T_{setup} + T_{skew}$$

Burada:
- $T_{cq}$: Saat vurduktan sonra flop'un veriyi çıkarması için geçen süre (Clock-to-Q).
- $T_{comb,max}$: Kritik yoldaki mantık kapıları ve metal tellerin toplam gecikmesi.
- $T_{setup}$: Sonraki flop'un saat vurmadan önce veriyi sabit tutmasını istediği süre (Setup Time).
- $T_{skew}$: Saat sinyalinin iki flop arasındaki varış zamanı farkı.

$$F_{max} = \\frac{1}{T_{clk,min}}$$`,
      },
      {
        title: "5. Sık Yapılan Acemi Hataları",
        content: `- **Hata #1: İki flop arasına 30 kademe kombinasyonel kapı koyup çipin 3 GHz çalışmasını beklemek.**
  *Doğrusu:* Her kapı kademesi gecikme ekler; yüksek saat frekansı için iki flop arasına en fazla 15-20 FO4 gecikmesi kadar mantık sığdırılabilir. Fazlası için Pipelining yapılmalıdır.`,
      },
      {
        title: "6. Hızlı Soru & Cevap (Quick Checks)",
        content: `**S1: Tcq = 0.2 ns, Tcomb = 1.5 ns ve Tsetup = 0.3 ns ise çip maksimum kaç MHz çalışabilir?**
*Cevap:* $T_{clk} = 0.2 + 1.5 + 0.3 = 2.0\\text{ ns}$. $F_{max} = 1 / 2.0\\text{ ns} = \\mathbf{500\\text{ MHz}}$.

**S2: Pipelining tekniği kritik yol gecikmesini nasıl çözer?**
*Cevap:* Uzun kombinasyonel yolu ortadan ikiye bölüp araya bir register koyarak periyodu yarıya indirir ve frekansı iki katına çıkarır.`,
      },
      {
        title: "7. Özet ve Temel Çıkarımlar",
        content: `- Kritik yol en uzun gecikmeye sahip mantık yoludur ve çipin maksimum frekansını ($F_{max}$) belirler.
- Saat periyodu $T_{cq} + T_{comb} + T_{setup}$ toplamından büyük olmak zorundadır.
- Pipelining uzun yolları bölerek saat frekansını katlar.`,
      },
    ],
    playground: {
      title: "Verilog Kritik Yol ve Maksimum Frekans Hesaplama Simülasyonu",
      filename: "tb_timing.v",
      language: "verilog",
      initialCode: `// Statik Zamanlama Analizi (STA) Kritik Yol Bütçe Hesabı
module tb_timing;
  real T_cq, T_comb, T_setup, T_skew;
  real T_clk_min, F_max_MHz;

  initial begin
    T_cq    = 0.15; // 150 ps
    T_setup = 0.10; // 100 ps
    T_skew  = 0.05; // 50 ps

    // 1. Durum: Ağır Kombinasyonel Mantık (T_comb = 1.70 ns)
    T_comb = 1.70;
    T_clk_min = T_cq + T_comb + T_setup + T_skew;
    F_max_MHz = 1000.0 / T_clk_min;
    $display("=== Çip Zamanlama ve Maksimum Frekans Analizi ===");
    $display("Durum 1 (Boru Hatsız) : T_clk = %4.2f ns -> F_max = %5.1f MHz", T_clk_min, F_max_MHz);

    // 2. Durum: Pipelining ile Yol İkiye Bölündü (T_comb = 0.85 ns)
    T_comb = 0.85;
    T_clk_min = T_cq + T_comb + T_setup + T_skew;
    F_max_MHz = 1000.0 / T_clk_min;
    $display("Durum 2 (Pipelined)    : T_clk = %4.2f ns -> F_max = %5.1f MHz (%%74 HIZ ARTIŞI!)", T_clk_min, F_max_MHz);
    $finish;
  end
endmodule`,
      expectedOutput: [
        "=== Çip Zamanlama ve Maksimum Frekans Analizi ===",
        "Durum 1 (Boru Hatsız) : T_clk = 2.00 ns -> F_max = 500.0 MHz",
        "Durum 2 (Pipelined)    : T_clk = 1.15 ns -> F_max = 869.6 MHz (%74 HIZ ARTIŞI!)",
      ],
    },
    quiz: {
      question: "Bir dijital devrede Kritik Yol (Critical Path) ne anlama gelir?",
      options: [
        "A) Güç kaynağından toprağa giden en kısa yol",
        "B) İki ardışık bellek elemanı (Flip-Flop) arasında en yüksek yayılma gecikmesine sahip olan ve çipin maksimum çalışma frekansını sınırlayan en yavaş mantık yolu",
        "C) En az transistör içeren yol",
        "D) Sadece saat hattı",
      ],
      correctIndex: 1,
      explanation:
        "Doğru! Kritik yol, çip içindeki en yavaş mantık yoludur. Bir saat periyodu en az bu yolun gecikmesi kadar uzun olmak zorunda olduğu için çipin maksimum saat frekansını doğrudan kritik yol belirler.",
    },
  },
};
