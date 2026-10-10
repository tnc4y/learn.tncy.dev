import { LessonContent } from "./lessonsData";

export const VERILOG_PART2: Record<string, LessonContent> = {
  "verilog-combinational-logic-assign": {
    id: "verilog-combinational-logic-assign",
    badge: "Bölüm 8 • Kombinasyonel Mantık Tasarımı",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "assign ile Kombinasyonel Devre Tasarımı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 8: Kombinasyonel Mantık Tasarımı. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### \`assign\` ile Kombinasyonel Mantık (Combinational Logic)

Neden \`assign\` ile kombinasyonel mantık öğrenmelisiniz? Intel Core işlemcilerinden NVIDIA GPU'larına kadar tüm modern sayısal entegre devreler; aritmetik işlemler, veri yönlendirme ve sinyal işleme için kombinasyonel mantık (combinational logic) bloklarına dayanır. Verilog'daki \`assign\` ifadesi, girişlerdeki değişimlerin doğrudan ve anlık olarak çıkışlara yansıdığı sıfır gecikmeli (zero-latency) mantıksal devreleri modellemenin temel yapı taşıdır. Modern işlemcilerin omurgasını oluşturan veriyolu (datapath) mimarilerini, ALU (Aritmetik Mantık Birimi), çoklayıcı (multiplexer) ve kod çözücü (decoder) devrelerini verimli bir şekilde tasarlamak için \`assign\` ifadesine tam anlamıyla hakim olmak kritik öneme sahiptir.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- \`wire\` veri tipindeki sinyaller için \`assign\` ifadesi kullanarak kombinasyonel mantık tasarlamayı
- \`assign\` ile toplayıcı (adder), çoklayıcı (multiplexer), kod çözücü (decoder) ve kod dağıtıcı (demultiplexer) gibi pratik sayısal devreler geliştirmeyi
- \`assign\` ifadelerinin sentezleme (synthesis) araçları tarafından sıfır gecikmeli kombinasyonel kapılara nasıl dönüştürüldüğünü
- Temiz, anlaşılır ve sentezlenebilir kombinasyonel mantık yazımının en iyi pratiklerini

Verilog'da \`assign\` ifadesi, \`wire\` veri tipindeki bir sinyali sürekli olarak sürmek (continuous assignment) için kullanılır ve doğrudan kombinasyonel mantık olarak sentezlenir. Ardışıl mantığın (sequential logic) aksine, kombinasyonel mantıkta hafıza elemanı (flip-flop/latch) bulunmaz; çıkışlar yalnızca o anki giriş değerlerine bağlıdır. Bu özellik, \`assign\` ifadesini Boole denklemleri, aritmetik işlemler ve veri yönlendirme devreleri için ideal kılar.`,
      },
      {
        title: "3. Endüstriyel Uygulama: Modern ALU Tasarımı",
        content: `Intel ALU Tasarımı: Intel'in Alder Lake gibi modern mikroişlemcilerinde, aritmetik işlemler için continuous assignment (\`assign\`) ile modellenmiş binlerce kombinasyonel mantık bloğu kullanılır. Bir ALU'nun toplayıcı devreleri, bit düzeyinde mantıksal işlemler ve karşılaştırıcı mantıkları tek bir saat çevrimi (clock cycle) içerisinde icra edilen kombinasyonel bloklardır. Optimize edilmiş kapı seviyesi sentez (gate-level synthesis) sayesinde bu devrelerde nanosaniye altı (sub-nanosecond) yayılım gecikmeleri (propagation delay) elde edilir.`,
      },
      {
        title: "4. Örnek 1: Temel Kombinasyonel Mantık Devresi",
        content: `Aşağıdaki kod, \`z\` çıkış telinin mantıksal bir denklemi gerçekleştirmek üzere \`assign\` ifadesiyle sürekli sürüldüğü basit bir kombinasyonel mantık devresini göstermektedir:

\`\`\`verilog
module combo (
    input  a, b, c, d, e,
    output z
);
    // Sürekli atama (Continuous assignment): Girişler değiştiği anda çıkış anında güncellenir
    // Gerçeklenen denklem: z = ((a AND b) OR (c XOR d)) AND (NOT e)
    // Sentez aracı bu ifadeyi AND, OR, XOR ve NOT kapılarına dönüştürür
    assign z = ((a & b) | (c ^ d) & ~e);
endmodule
\`\`\`

\`combo\` modülü sentez araçları tarafından işlendiğinde doğrudan temel sayısal mantık kapılarına dönüştürülür. Burada \`assign\` ifadesi ardışıl değil, tamamen kombinasyonel bir mantık oluşturur; devrede hiçbir flip-flop veya bellek elemanı bulunmaz, yalnızca mantık kapıları yer alır. Girişlerden herhangi biri değiştiğinde \`z\` çıkışı (yalnızca kapı yayılım gecikmeleri dahilinde) anında tepki verir.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **assign ile Kombinasyonel Devre Tasarımı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-combinational-logic-assign.v - Örnek Donanım Modülü",
          snippet: `module combo ( 	input 	a, b, c, d, e,
								output 	z);

	// Continuous assignment: output changes immediately when inputs change
	// Implements: z = ((a AND b) OR (c XOR d)) AND (NOT e)
	// Synthesizes to AND, OR, XOR, and NOT gates
	assign z = ((a & b) | (c ^ d) & ~e);

endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-combinational-logic-assign_tb.v - Simülasyon Testbench",
          snippet: `module tb;
	// Declare testbench variables
	reg a, b, c, d, e; // Use 'reg' for variables you assign in procedural blocks
	wire z; // Use 'wire' for outputs from modules under test
	integer i;

	// Instantiate the design and connect design inputs/outputs with
	// testbench variables
	combo u0 ( .a(a), .b(b), .c(c), .d(d), .e(e), .z(z));

	initial begin
		// At the beginning of time, initialize all inputs of the design
		// to a known value, in this case we have chosen it to be 0.
		a = 0;
		b = 0;
		c = 0;
		d = 0;
		e = 0;

		// Use a $monitor task to print any change in the signal to
		// simulation console
		$monitor ("a=%0b b=%0b c=%0b d=%0b e=%0b z=%0b",
		 a, b, c, d, e, z);

		// Because there are 5 inputs, there can be 32 different input combinations
		// So use an iterator "i" to increment from 0 to 32 and assign the value
		// to testbench variables so that it drives the design inputs
		for (i = 0; i < 32; i = i + 1) begin
			{a, b, c, d, e} = i; // Concatenation assigns bits from i to inputs
			#10; // Wait 10 time units between test vectors
		end
	end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module combo ( 	input 	a, b, c, d, e,
								output 	z);

	// Continuous assignment: output changes immediately when inputs change
	// Implements: z = ((a AND b) OR (c XOR d)) AND (NOT e)
	// Synthesizes to AND, OR, XOR, and NOT gates
	assign z = ((a & b) | (c ^ d) & ~e);

endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "assign ile Kombinasyonel Devre Tasarımı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-combinational-logic-always": {
    id: "verilog-combinational-logic-always",
    badge: "Bölüm 8 • Kombinasyonel Mantık Tasarımı",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "always @(*) ile Kombinasyonel Devre Tasarımı ve Latch Önleme",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 8: Kombinasyonel Mantık Tasarımı. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### \`always\` Bloğu ile Kombinasyonel Mantık Tasarımı

Verilog'da \`always\` prosedürel bloğu hem ardışıl (sequential) hem de kombinasyonel (combinational) mantık devrelerini tanımlamak için kullanılabilir. Daha önceki konularda \`assign\` ifadesiyle ele alınan kombinasyonel tasarımlar, bu bölümde prosedürel \`always\` blokları kullanılarak incelenecektir. \`always\` bloğu, özellikle karmaşık \`if-else\` ve \`case\` yapıları gerektiren durumlarda esnek ve okunabilir kombinasyonel mantık modelleri kurmayı sağlar.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- Eksiksiz duyarlılık listeleri (sensitivity list) oluşturarak \`always\` bloğu ile doğru kombinasyonel mantık yazmayı
- Kombinasyonel mantık modellemesinde engellemeli atamaların (blocking assignment, \`=\`) ne zaman ve neden zorunlu olduğunu
- Toplayıcılar, çoklayıcılar ve kod çözücüler gibi temel sayısal devreleri \`always\` bloğu ile tasarlamayı
- \`assign\` ve \`always\` yaklaşımlarını karşılaştırarak donanım sentezindeki eşdeğerliklerini kavramayı`,
      },
      {
        title: "3. Sözdizimi ve Sentez Kuralları",
        content: `\`always\` blokları ile kombinasyonel mantık tanımlarken kullanılan temel sözdizimi:

\`\`\`verilog
// Eksiksiz duyarlılık listesi - Bloğun okuduğu tüm giriş sinyalleri listelenmelidir
always @ (input1 or input2 or input3) begin
    output = expression; // Kombinasyonel mantık için blocking atama (=) kullanılır
end

// SystemVerilog / Verilog-2001 kısayolu (duyarlılık listesindeki tüm sinyalleri otomatik algılar)
always @* begin
    output = expression;
end
\`\`\`

**Önemli Donanım Kuralı:** Bir \`always\` bloğu içinde kombinasyonel mantık modellerken simülasyon ve sentez uyumsuzluklarını (mismatch) ve yarış durumlarını (race condition) engellemek için daima engellemeli atama (blocking assignment, \`=\`) kullanılmalıdır. Ayrıca istenmeyen bellek çıkarımlarını (inferred latch) önlemek için her koşulda çıkışın değer aldığından emin olunmalıdır.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **always @(*) ile Kombinasyonel Devre Tasarımı ve Latch Önleme** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-combinational-logic-always.v - Örnek Donanım Modülü",
          snippet: `// Complete sensitivity list - all inputs must be included
always @ (input1 or input2 or input3) begin
 output = expression; // Use blocking assignment (=)
end

// SystemVerilog shorthand (use @* or always_comb)
always @* begin
 output = expression;
end`,
        },
      },
{
        title: "5. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-combinational-logic-always_tb.v - Simülasyon Testbench",
          snippet: `module combo ( 	input 	a, b, c, d, e,
								output 	reg z);

	// Sensitivity list contains ALL inputs
	// Logic updates whenever any input changes
	always @ ( a or b or c or d or e) begin
		// Blocking assignment (=) for combinational logic
		// Implements: z = (a AND b) OR ((c XOR d) AND (NOT e))
		z = ((a & b) | (c ^ d) & ~e);
	end

endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// Complete sensitivity list - all inputs must be included
always @ (input1 or input2 or input3) begin
 output = expression; // Use blocking assignment (=)
end

// SystemVerilog shorthand (use @* or always_comb)
always @* begin
 output = expression;
end`,
      language: "verilog",
    },
    quiz: {
      question: "always @(*) ile Kombinasyonel Devre Tasarımı ve Latch Önleme ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-full-adder": {
    id: "verilog-full-adder",
    badge: "Bölüm 9 • Temel Sayısal Devreler (Toplayıcı, Mux, Kodlayıcı)",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "1-Bit ve Çok Bitli Tam Toplayıcı (Full Adder) Tasarımı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 9: Temel Sayısal Devreler (Toplayıcı, Mux, Kodlayıcı). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog ile Tam Toplayıcı (Full Adder) Tasarımı

Neden Tam Toplayıcı (Full Adder) Öğrenmelisiniz? Bir işlemcinin program sayacını (PC) artırdığı, bir bellek adresini hesapladığı veya bir sayısal filtre katsayısını topladığı her an, bu işlemi bir tam toplayıcı zinciri gerçekleştirir. Tam toplayıcı, üç adet 1-bitlik girişi (\`a\`, \`b\` ve elde girişi \`cin\`) toplayarak bir toplam (\`sum\`) ve bir elde çıkışı (\`cout\`) üreten temel bir kombinasyonel mantık devresidir. Bu toplayıcılar ardışık bağlandığında, her mikroişlemcinin ALU çekirdeğinde yer alan N-bitlik toplayıcıları oluşturur.

Verilog'da 1-bitlik tam toplayıcıyı tanımlamanın en hızlı yolu tek satırlık bir sürekli atamadır:
\`\`\`verilog
// Tek satırda 1-bit tam toplayıcı: {elde, toplam} = a + b + cin
assign {cout, sum} = a + b + cin;
\`\`\``,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- Doğruluk tablosundan (truth table) tam toplayıcının toplam (\`sum\`) ve elde (\`cout\`) denklemlerini türetmeyi
- Bir tam toplayıcıyı kapı seviyesinde (gate-level), veri akışı (dataflow - \`assign\`) ve davranışsal (behavioral - \`always\`) seviyede modellemeyi
- 1-bitlik tam toplayıcı modüllerini hiyerarşik bağlayarak 4-bitlik bir dalgalı elde toplayıcısı (ripple-carry adder) inşa etmeyi
- Farklı yazım stillerinin donanımda hangi kapılara dönüştüğünü ve elde yayılım gecikmesinin (carry propagation) devre hızını nasıl sınırladığını anlamayı`,
      },
      {
        title: "3. Doğruluk Tablosu (Truth Table)",
        content: `Tam toplayıcı üç adet 1-bitlik sinyali toplar; bu nedenle sonuç 0 ile 3 (ikilik tabanda 00 ile 11) arasında değişir ve 2 çıkış bitine ihtiyaç duyar. Burada \`sum\` en anlamsız biti (LSB), \`cout\` ise en anlamlı biti (MSB) temsil eder. Başka bir deyişle \`{cout, sum}\` ikilisi, girişlerde '1' olan bitlerin 2-bitlik sayım sonucudur.

| A | B | Cin | Cout | Sum |
|---|---|-----|------|-----|
| 0 | 0 |  0  |  0   |  0  |
| 0 | 0 |  1  |  0   |  1  |
| 0 | 1 |  0  |  0   |  1  |
| 0 | 1 |  1  |  1   |  0  |
| 1 | 0 |  0  |  0   |  1  |
| 1 | 0 |  1  |  1   |  0  |
| 1 | 1 |  0  |  1   |  0  |
| 1 | 1 |  1  |  1   |  1  |`,
      },
      {
        title: "4. Boole Denklemleri ve Mantıksal Yapı",
        content: `Doğruluk tablosu için Karnaugh haritaları (K-map) çözüldüğünde iki temel Boole denklemi elde edilir:

\`\`\`verilog
sum  = a ^ b ^ cin;                 // Girişlerdeki '1' sayısı tek olduğunda 1 (3-girişli XOR / tek parite)
cout = (a & b) | (cin & (a ^ b));  // En az iki giriş 1 olduğunda 1 (çoğunluk fonksiyonu)
\`\`\`

Elde denklemi geleneksel olarak \`(a & b) | (b & cin) | (a & cin)\` biçiminde de yazılabilir. Ancak yukarıdaki form tercih edilir çünkü toplam (\`sum\`) ifadesinde zaten hesaplanan \`a ^ b\` terimini yeniden kullanarak kapı tasarrufu sağlar:
- \`a & b\`: Üretim (Generate - G) sinyalidir; bu bit kendi başına yeni bir elde üretir.
- \`a ^ b\`: Yayılım (Propagate - P) sinyalidir; bu bit gelen eldeyi bir sonraki basamağa aktarır.

Hızlı toplayıcı mimarileri (örneğin Carry-Lookahead Adder - CLA) doğrudan bu iki sinyal üzerine inşa edilir.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **1-Bit ve Çok Bitli Tam Toplayıcı (Full Adder) Tasarımı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-full-adder.v - Örnek Donanım Modülü",
          snippet: `// 1-bit full adder in one line: {carry, sum} = a + b + cin
assign {cout, sum} = a + b + cin;`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-full-adder_tb.v - Simülasyon Testbench",
          snippet: `// 1-bit full adder built from gate primitives
module full_adder_gate (
  input  a,      // First operand bit
  input  b,      // Second operand bit
  input  cin,    // Carry in from the less significant stage
  output sum,    // Sum bit
  output cout    // Carry out to the more significant stage
);

  wire p;        // Propagate: a ^ b
  wire g;        // Generate:  a & b
  wire t;        // Carry passed through this stage: cin & p

  xor x1 (p,    a, b);     // p    = a ^ b
  xor x2 (sum,  p, cin);   // sum  = a ^ b ^ cin
  and a1 (g,    a, b);     // g    = a & b
  and a2 (t,    p, cin);   // t    = (a ^ b) & cin
  or  o1 (cout, g, t);     // cout = generated OR propagated carry

endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// 1-bit full adder in one line: {carry, sum} = a + b + cin
assign {cout, sum} = a + b + cin;`,
      language: "verilog",
    },
    quiz: {
      question: "1-Bit ve Çok Bitli Tam Toplayıcı (Full Adder) Tasarımı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-4to1-mux": {
    id: "verilog-4to1-mux",
    badge: "Bölüm 9 • Temel Sayısal Devreler (Toplayıcı, Mux, Kodlayıcı)",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "4'e 1 Çoğullayıcı (Multiplexer - MUX) Tasarımı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 9: Temel Sayısal Devreler (Toplayıcı, Mux, Kodlayıcı). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog 4'e 1 Çoklayıcı (4 to 1 Multiplexer / Mux)

Verilog'da 4'e 1 çoklayıcı (mux), 2-bitlik bir seçici (\`sel\`) sinyaline dayanarak dört veri girişinden birini tek bir çıkışa yönlendiren kombinasyonel bir devredir. RTL tasarımında bir çoklayıcıyı \`assign\` ifadesi (üçlü koşul operatörü), \`case\` ifadesi, \`if-else-if\` zinciri veya indeksli kısmi seçim (indexed part-select) ile modelleyebilirsiniz; tüm bu yazım tarzları sentez araçları tarafından aynı donanımsal seçim mantığına dönüştürülür.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- 4'e 1 çoklayıcının veriyi nasıl yönlendirdiğini ve Boole denklemlerinin yapısını
- Verilog'da 4x1 çoklayıcı tasarlamanın dört farklı yolunu ve her birinin kullanım alanlarını
- Farklı RTL kodlama stillerinin sentez sonrasında donanımda nasıl fiziksel kapılara dönüştüğünü
- Testbench ile çoklayıcıyı doğrulamayı, istenmeyen mandal (latch) çıkarımlarını ve seçici bit genişliği hatalarını önlemeyi`,
      },
      {
        title: "3. Çoklayıcı (Multiplexer / Mux) Nedir?",
        content: `Çoklayıcı (multiplexer veya kısaca mux), N adet giriş hattından seçilen birini tek bir çıkış hattına aktaran kombinasyonel bir devredir. 4'e 1 çoklayıcı 4 veri girişine sahip olduğundan, aralarında seçim yapabilmek için 2-bitlik ($2^2 = 4$) bir seçici (\`sel\`) sinyaline ihtiyaç duyar.

Giriş sinyalleri tek bit olabileceği gibi çok bitli bir veriyolu (bus) da olabilir. Örneğin 4-bit genişliğindeki bir 4'e 1 çoklayıcı, dört adet 4-bitlik girişe (\`a, b, c, d\`) ve bir adet 4-bitlik çıkışa (\`out\`) sahiptir. Dahili olarak bu yapı, aynı \`sel\` hatlarını paylaşan dört adet özdeş 1-bitlik çoklayıcıdan oluşur.

Aşağıdaki tabloda \`sel\` değerlerine karşılık hangi girişin çıkışa aktarıldığı gösterilmiştir:

| sel | Çıkış (out) |
|---|---|
| \`2'b00\` | a |
| \`2'b01\` | b |
| \`2'b10\` | c |
| \`2'b11\` | d |

Her çıkış biti için çoklayıcı şu çarpımlar toplamı (sum-of-products) denklemini gerçekler:
\`out = (~sel[1] & ~sel[0] & a) | (~sel[1] & sel[0] & b) | (sel[1] & ~sel[0] & c) | (sel[1] & sel[0] & d)\`

Her bir çarpım terimi \`sel\` sinyalinin çözülmüş (decoded) bir durumuna karşılık gelir. Aynı anda yalnızca tek bir terim doğru olabileceğinden, OR kapısı asla iki farklı girişi çakıştırmaz. Bu karşılıklı dışlama (mutual exclusivity), saf bir çoklayıcıyı öncelik mantığından (priority logic) ayıran en temel farktır.`,
      },
      {
        title: "4. Sözdizimi ve Kodlama Stilleri",
        content: `Verilog dilinde çoklayıcıya özel bir anahtar kelime bulunmaz. Donanım seçim davranışını aşağıdaki yapılardan biriyle tanımlarsınız ve sentez aracı bu yapıyı otomatik olarak bir çoklayıcı devresi olarak tanır:

\`\`\`verilog
// 1. İç içe koşul operatörü (ternary) ile sürekli atama (Continuous assignment)
assign out = sel[1] ? (sel[0] ? d : c) : (sel[0] ? b : a);

// 2. Kombinasyonel always bloğu içinde case ifadesi
always @(*) begin
    case (sel)
        2'b00 : out = a;
        2'b01 : out = b;
        2'b10 : out = c;
        2'b11 : out = d;
    endcase
end

// 3. Paketlenmiş giriş veriyolu üzerinde indeksli kısmi seçim (Indexed part-select)
assign out = in_bus[sel*4 +: 4];
\`\`\`

**Devre Bileşenleri:**
- \`sel\`: Seçici giriş; N adet giriş için $\\lceil\\log_2(N)\\rceil$ bit genişliğindedir.
- \`a, b, c, d\`: Veri girişleri; tamamı \`out\` ile aynı bit genişliğinde olmalıdır.
- \`out\`: \`assign\` ile sürüldüğünde \`wire\`, \`always\` bloğunda atandığında ise \`reg\` olarak tanımlanır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **4'e 1 Çoğullayıcı (Multiplexer - MUX) Tasarımı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-4to1-mux.v - Örnek Donanım Modülü",
          snippet: `// 1. Continuous assignment with nested conditional (ternary) operator
assign out = sel[1] ? (sel[0] ? d : c) : (sel[0] ? b : a);

// 2. case statement inside a combinational always block
always @(*) begin
  case (sel)
    2'b00 : out = a;
    2'b01 : out = b;
    2'b10 : out = c;
    2'b11 : out = d;
  endcase
end

// 3. Indexed part-select on a packed input bus
assign out = in_bus[sel*4 +: 4];`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-4to1-mux_tb.v - Simülasyon Testbench",
          snippet: `module mux_4to1_assign (
  input  [3:0] a,     // Data input, selected when sel = 2'b00
  input  [3:0] b,     // Data input, selected when sel = 2'b01
  input  [3:0] c,     // Data input, selected when sel = 2'b10
  input  [3:0] d,     // Data input, selected when sel = 2'b11
  input  [1:0] sel,   // 2-bit select: 4 combinations for 4 inputs
  output [3:0] out    // Selected data; a wire because assign drives it
);

  // Outer ternary: sel[1] chooses the upper pair (c/d) or the lower pair (a/b)
  // Inner ternaries: sel[0] chooses one input within the chosen pair
  assign out = sel[1] ? (sel[0] ? d : c)
                      : (sel[0] ? b : a);

endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// 1. Continuous assignment with nested conditional (ternary) operator
assign out = sel[1] ? (sel[0] ? d : c) : (sel[0] ? b : a);

// 2. case statement inside a combinational always block
always @(*) begin
  case (sel)
    2'b00 : out = a;
    2'b01 : out = b;
    2'b10 : out = c;
    2'b11 : out = d;
  endcase
end

// 3. Indexed part-select on a packed input bus
assign out = in_bus[sel*4 +: 4];`,
      language: "verilog",
    },
    quiz: {
      question: "4'e 1 Çoğullayıcı (Multiplexer - MUX) Tasarımı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-priority-encoder": {
    id: "verilog-priority-encoder",
    badge: "Bölüm 9 • Temel Sayısal Devreler (Toplayıcı, Mux, Kodlayıcı)",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Öncelikli Kodlayıcı (Priority Encoder) Devresi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 9: Temel Sayısal Devreler (Toplayıcı, Mux, Kodlayıcı). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog Öncelikli Kodlayıcı (Priority Encoder)

Verilog'da öncelikli kodlayıcı (priority encoder), birden fazla istek (request) girişini alıp aktif olan girişler arasından en yüksek önceliğe sahip olanın ikilik (binary) indeksini çıkış olarak üreten devredir. Standart bir kodlayıcının aksine, aynı anda birden fazla giriş '1' olduğunda belirsizlik yaratmaz ve kararlı bir sonuç üretir. Ayrıca \`valid\` çıkışı, girişlerden herhangi birinin aktif olup olmadığını açıkça belirtir.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- Öncelikli kodlayıcının çakışan istekleri doğruluk tablosu ve mantık denklemleriyle nasıl çözdüğünü
- Bir öncelikli kodlayıcıyı tasarlamanın üç farklı yolunu: \`if-else-if\`, \`casez\` ve parametrik \`for\` döngüsü
- Bir \`if-else-if\` zincirinin burada öncelik mantığına (priority logic) sentezlenirken başka yerlerde neden paralel bir çoklayıcıya dönüştüğünü
- Kapsamlı bir testbench ile tüm giriş kombinasyonlarını doğrulamayı`,
      },
      {
        title: "3. Öncelikli Kodlayıcı (Priority Encoder) Mimarisi",
        content: `Normal bir kodlayıcı (encoder), N adet giriş hattını $\\log_2(N)$ bitlik ikilik koda dönüştürür ve aynı anda yalnızca tek bir girişin aktif olduğunu varsayar. Eğer iki giriş aynı anda aktif olursa, çıkış her iki kodun OR'lanmış anlamsız bir bileşimi olur. Öncelikli kodlayıcı girişlere bir hiyerarşi/öncelik atayarak bu sorunu çözer. Birden fazla giriş aktif olduğunda çıkış, en yüksek öncelikli girişin adresini gösterir ve düşük öncelikli girişler yok sayılır.

4'e 2 bir öncelikli kodlayıcıda dört istek girişi (\`req[3:0]\`), 2-bitlik indeks çıkışı (\`idx\`) ve bir \`valid\` çıkışı bulunur. Bu tasarımda \`req[3]\` en yüksek önceliğe sahiptir:

| req[3] | req[2] | req[1] | req[0] | idx | valid |
|---|---|---|---|---|---|
| 1 | x | x | x | 2'd3 | 1 |
| 0 | 1 | x | x | 2'd2 | 1 |
| 0 | 0 | 1 | x | 2'd1 | 1 |
| 0 | 0 | 0 | 1 | 2'd0 | 1 |
| 0 | 0 | 0 | 0 | 2'd0 | 0 |

Tablodaki 'x' (don't care) durumları, yüksek öncelikli bir giriş aktif olduğunda düşük önceliklilerin sonucu etkilemediğini gösterir. Bu tablodan çıkarılan mantık denklemleri:
\`\`\`verilog
idx[1] = req[3] | req[2];
idx[0] = req[3] | (~req[2] & req[1]);
valid  = req[3] | req[2] | req[1] | req[0];
\`\`\`

\`valid\` çıkışı donanım için hayati önem taşır; çünkü \`idx = 0\` durumu hem "sadece \`req[0]\` aktif" hem de "hiçbir istek aktif değil" anlamına gelebilir. \`valid\` sinyali olmadan bu iki durum ayırt edilemez.`,
      },
      {
        title: "4. Sözdizimi ve RTL Modelleme Yöntemleri",
        content: `Verilog dilinde öncelikli kodlayıcı için özel bir anahtar kelime yoktur; bu hiyerarşik davranış kombinasyonel bir \`always @(*)\` bloğu içerisinde şu yapılardan biriyle modellenir:

\`\`\`verilog
// 1. if-else-if zinciri: İlk doğru koşul önceliği alır
always @(*) begin
    if (req[3])       idx = 2'd3; // En yüksek öncelik, ilk kontrol edilir
    else if (req[2])  idx = 2'd2;
    else if (req[1])  idx = 2'd1;
    else              idx = 2'd0;
end

// 2. Joker karakterli casez: '?' karakteri 0 veya 1 ile eşleşir
always @(*) begin
    casez (req)
        4'b1??? : idx = 2'd3;
        4'b01?? : idx = 2'd2;
        4'b001? : idx = 2'd1;
        default : idx = 2'd0;
    endcase
end

// 3. Parametrik for döngüsü: Döngüdeki son geçerli atama kazanır
always @(*) begin
    idx = 0;
    for (i = 0; i < N; i = i + 1)
        if (req[i]) idx = i;
end
\`\`\`

**Bileşenler:**
- \`req\`: N-bit genişliğinde istek girişleri
- \`idx\`: En yüksek öncelikli aktif isteğin indeksi ($\\$clog2(N)$ bit)
- \`valid\`: En az bir istek aktif olduğunda 1 olan doğrulama bayrağı`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Öncelikli Kodlayıcı (Priority Encoder) Devresi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-priority-encoder.v - Örnek Donanım Modülü",
          snippet: `// 1. if-else-if chain: the first true condition wins
always @(*) begin
  if      (req[3]) idx = 2'd3;    // Highest priority, checked first
  else if (req[2]) idx = 2'd2;
  else if (req[1]) idx = 2'd1;
  else             idx = 2'd0;    // Final else: idx is always assigned
end

// 2. casez with wildcards: ? matches either 0 or 1
always @(*) begin
  casez (req)
    4'b1??? : idx = 2'd3;
    4'b01?? : idx = 2'd2;
    4'b001? : idx = 2'd1;
    default : idx = 2'd0;
  endcase
end

// 3. for loop: the last assignment in the loop wins
always @(*) begin
  idx = 0;
  for (i = 0; i < N; i = i + 1)
    if (req[i]) idx = i;
end`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-priority-encoder_tb.v - Simülasyon Testbench",
          snippet: `module pr_en_4to2 (
  input      [3:0] req,     // Request inputs; req[3] has the highest priority
  output reg [1:0] idx,     // Index of the highest-priority active request
  output reg       valid    // 1 when any request is active
);

  always @(*) begin
    valid = 1'b1;                       // Assume a request is present
    if      (req[3]) idx = 2'd3;        // Checked first, so req[3] always wins
    else if (req[2]) idx = 2'd2;        // Reached only when req[3] is 0
    else if (req[1]) idx = 2'd1;        // Reached only when req[3:2] are 0
    else if (req[0]) idx = 2'd0;
    else begin                          // No request at all
      idx   = 2'd0;                     // Assign idx here too, or a latch is inferred
      valid = 1'b0;
    end
  end

endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// 1. if-else-if chain: the first true condition wins
always @(*) begin
  if      (req[3]) idx = 2'd3;    // Highest priority, checked first
  else if (req[2]) idx = 2'd2;
  else if (req[1]) idx = 2'd1;
  else             idx = 2'd0;    // Final else: idx is always assigned
end

// 2. casez with wildcards: ? matches either 0 or 1
always @(*) begin
  casez (req)
    4'b1??? : idx = 2'd3;
    4'b01?? : idx = 2'd2;
    4'b001? : idx = 2'd1;
    default : idx = 2'd0;
  endcase
end

// 3. for loop: the last assignment in the loop wins
always @(*) begin
  idx = 0;
  for (i = 0; i < N; i = i + 1)
    if (req[i]) idx = i;
end`,
      language: "verilog",
    },
    quiz: {
      question: "Öncelikli Kodlayıcı (Priority Encoder) Devresi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-sequential-logic-always": {
    id: "verilog-sequential-logic-always",
    badge: "Bölüm 10 • Ardışıl Mantık (Sequential Logic)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "always @(posedge clk) ile Ardışıl Devre Modelleme",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 10: Ardışıl Mantık (Sequential Logic). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### \`always\` Bloğu ile Ardışıl Mantık (Sequential Logic) Tasarımı

Neden Ardışıl Mantıkta Uzmanlaşmalısınız? Hafıza ve durum (state) barındıran ardışıl mantık devreleri, dünyadaki tüm bilgi işlem sistemlerinin temelidir. Apple M3 işlemcisindeki milyarlarca flip-flop'tan Tesla otopilot sistemlerini yöneten sonlu durum makinelerine (FSM) kadar tüm akıllı sistemler ardışıl mantıkla çalışır. Intel mühendisleri yüzlerce ardışıl aşamadan oluşan işlemci boru hatları (pipeline) tasarlarken; Samsung mühendisleri bellek denetleyicilerini nanosaniye hassasiyetinde optimize eder. Verilog'da ardışıl mantığı doğru modellemek; işlemciler, bellek denetleyicileri, haberleşme arayüzleri ve zaman içinde bilgi saklaması gereken tüm sayısal sistemleri tasarlamanın temel şartıdır.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- \`always\` blokları ile flip-flop, sayaç (counter) ve kaydırmalı kaydedici (shift register) gibi ardışıl devreleri tasarlamayı
- Kombinasyonel ve ardışıl \`always\` blokları arasındaki kritik farkları ve her birinin doğru kullanım yerlerini
- Saat (clock) ve sıfırlama (reset) sinyallerini doğru yönetmeyi, eşzamansız (asynchronous) ve eşzamanlı (synchronous) reset stratejilerini
- Fiziksel flip-flop'lara sorunsuz eşleşen ve zamanlama (timing) kısıtlarını karşılayan sentezlenebilir ardışıl RTL yazmayı`,
      },
      {
        title: "3. Endüstriyel Uygulama: Mikroişlemci Boru Hattı Kaydedicileri",
        content: `Intel CPU Boru Hattı Kaydedicileri (Pipeline Registers): Intel'in modern işlemcilerinde (Raptor Lake, Meteor Lake vb.) komut işleme hattı 15-20 aşamadan oluşur ve her aşama arasında ara sonuçları tutan flip-flop dizileri (pipeline registers) yer alır. Her saat çevriminde veriler bir aşamadan diğerine bu ardışıl elemanlar üzerinden akar. Bu boru hattı kaydedicileri; saat kenarına duyarlı \`always\` blokları, senkron resetler ve kontrollü veri akışı ile modellenir. Tek bir Core i9 işlemcisi 5+ GHz frekansta senkronize çalışan 1 milyardan fazla flip-flop içerir.`,
      },
      {
        title: "4. Ardışıl ve Kombinasyonel Mantık Karşılaştırması",
        content: `**Temel Mimari Farklar:**
- **Kombinasyonel Mantık (Combinational Logic):** Çıkış yalnızca anlık giriş değerlerine bağlıdır (hafıza yoktur). Örnek: toplayıcılar, çoklayıcılar, kod çözücüler. \`always @(*)\` veya \`assign\` ile modellenir.
- **Ardışıl Mantık (Sequential Logic):** Çıkış, anlık girişlerin yanı sıra devrenin geçmiş durumuna da bağlıdır (hafıza elemanı içerir). Örnek: flip-flop'lar, sayaçlar, kaydırmalı kaydediciler, durum makineleri. \`always @(posedge clk)\` ile modellenir.

**Sentez Açısından Önemi:**
Ardışıl \`always\` blokları sentez araçları tarafından fiziksel flip-flop ve kaydedicilere dönüştürülürken, kombinasyonel bloklar temel mantık kapılarına (AND, OR, MUX vb.) dönüştürülür. \`always @(posedge clk)\` yazdığınızda sentez aracına "burada flip-flop üret" talimatı verirsiniz. Bu iki mantık türünü doğru ayırmak, donanım zamanlaması ve kaynak tüketimi açısından en temel kuraldır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **always @(posedge clk) ile Ardışıl Devre Modelleme** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-sequential-logic-always.v - Örnek Donanım Modülü",
          snippet: `// JK Flip-Flop with asynchronous active-low reset
module jk_ff (
 	input j, 			// Input J: when high with K low, sets Q to 0
 	input k,  			// Input K: when high with J low, sets Q to 1
 	input rstn, 		// Active-low async reset: immediately clears Q
 	input clk,  		// Clock: triggers state changes on rising edge
 	output reg q  		// Output Q: stored state value
);

 	// Sequential logic: sensitive to clock edge and reset edge
 	always @ (posedge clk or negedge rstn) begin
 		if (!rstn) begin
 			// Asynchronous reset: Q becomes 0 immediately when rstn goes low
 			// This happens independent of clock edge
 			q <= 0;
 		end else begin
			// JK flip-flop logic (evaluated only on rising clock edge):
			// j=0,k=0: hold current value (q unchanged)
			// j=0,k=1: reset Q to 1
			// j=1,k=0: set Q to 0
			// j=1,k=1: toggle Q
			// Boolean expression: Q_next = (J & ~Q) | (~K & Q)
			q <= (j & ~q) | (~k & q);
 		end
 	end
endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-sequential-logic-always_tb.v - Simülasyon Testbench",
          snippet: `module tb;
	// Declare testbench variables
	reg j, k, rstn, clk;
	wire q; 				// Output from DUT (must be wire)
	integer i;
	reg [2:0] dly;

	// Generate clock: 50% duty cycle, 20ns period (50 MHz)
	always #10 clk = ~clk;

	// Instantiate the JK flip-flop design under test
	jk_ff u0 (
		.j(j),
		.k(k),
		.clk(clk),
		.rstn(rstn),
		.q(q)
	);

	// Stimulus generation
	initial begin
		// Initialize all inputs to zero at time 0
		{j, k, rstn, clk} <= 0;

		// Release reset after 10ns to start operation
		#10 rstn <= 1;

		// Apply random stimulus: 10 iterations
		for (i = 0; i < 10; i = i+1) begin
			dly = $random; // Random delay (0-7 ns)
			#(dly) j <= $random; // Random J input
			#(dly) k <= $random; // Random K input
		end

		// Let simulation run a bit longer, then finish
		#20 $finish;
	end

	// Monitor output changes
	initial begin
		$monitor("Time=%0t | rstn=%b j=%b k=%b q=%b",
		$time, rstn, j, k, q);
	end

	// Waveform dumping for analysis
	initial begin
		$dumpfile("jk_ff.vcd");
		$dumpvars(0, tb);
	end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// JK Flip-Flop with asynchronous active-low reset
module jk_ff (
 	input j, 			// Input J: when high with K low, sets Q to 0
 	input k,  			// Input K: when high with J low, sets Q to 1
 	input rstn, 		// Active-low async reset: immediately clears Q
 	input clk,  		// Clock: triggers state changes on rising edge
 	output reg q  		// Output Q: stored state value
);

 	// Sequential logic: sensitive to clock edge and reset edge
 	always @ (posedge clk or negedge rstn) begin
 		if (!rstn) begin
 			// Asynchronous reset: Q becomes 0 immediately when rstn goes low
 			// This happens independent of clock edge
 			q <= 0;
 		end else begin
			// JK flip-flop logic (evaluated only on rising clock edge):
			// j=0,k=0: hold current value (q unchanged)
			// j=0,k=1: reset Q to 1
			// j=1,k=0: set Q to 0
			// j=1,k=1: toggle Q
			// Boolean expression: Q_next = (J & ~Q) | (~K & Q)
			q <= (j & ~q) | (~k & q);
 		end
 	end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "always @(posedge clk) ile Ardışıl Devre Modelleme ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-d-latch": {
    id: "verilog-d-latch",
    badge: "Bölüm 11 • Flip-Floplar & Mandallar (Latches)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "D Tipi Mandal (D Latch) ve Şeffaf Seviye Tetikleme",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 11: Flip-Floplar & Mandallar (Latches). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog D Tipi Mandal (D Latch) Tasarımı

Neden D Latch Öğrenmelisiniz? Çoğu kenar tetiklemeli flip-flop dahili olarak iki adet latch yapısından oluşur ve modern SoC'lerde dinamik güç tüketimini azaltan saat kapılama hücreleri (clock-gating cells) parazitsiz (glitch-free) çalışmak için mandallara dayanır. Ayrıca latch'ler, kombinasyonel kodlamada bir çıkışın atanmamış bırakılması sonucu istenmeyen bir şekilde de devrede ortaya çıkabilir. D latch, seviye duyarlı (level-sensitive) bir saklama elemanıdır: yetkilendirme (enable) girişi '1' olduğu sürece çıkış girişi takip eder (şeffaf durum); enable '0' olduğunda ise çıkış son değerini korur (tutma durumu).`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- Bir D latch'in şeffaf (transparent) ve tutma (hold) durumlarındaki elektriksel davranışını
- Verilog'da eşzamansız (asynchronous) resetli bir D latch modellemeyi
- Latch kodunun sentezde nasıl çıkarıldığını ve istenmeyen mandalların (inferred latch) nasıl oluştuğunu
- Mandal (latch) ile flip-flop arasındaki farkları ve testbench ile doğrulama adımlarını`,
      },
      {
        title: "3. D Latch Nedir? Çalışma Prensibi",
        content: `Bir D latch; veri girişi (\`d\`), yetkilendirme girişi (\`en\`) ve çıkışa (\`q\`) sahiptir. Bu tasarıma aktif-düşük bir sıfırlama (\`rstn\`) sinyali de eklenmiştir. Devre iki temel çalışma moduna sahiptir:
- **Şeffaf Mod (Transparent, en = 1):** \`q\` çıkışı doğrudan \`d\` girişini takip eder. \`d\` üzerindeki her değişim kısa bir yayılım gecikmesinin ardından \`q\` çıkışına yansır.
- **Tutma Modu (Hold, en = 0):** \`q\` çıkışı, \`en\` sinyalinin '0'a düştüğü andaki değerini saklar. \`d\` üzerindeki değişimler çıkışı etkilemez.

| rstn | en | d | q (sonraki) | Çalışma Durumu |
|---|---|---|---|---|
| 0 | x | x | 0 | Reset |
| 1 | 1 | 0 | 0 | Şeffaf (Transparent) |
| 1 | 1 | 1 | 1 | Şeffaf (Transparent) |
| 1 | 0 | x | q | Tutma (Hold - Değişim yok) |

Buradaki anahtar kavram **seviye duyarlılığıdır (level-sensitive)**. Latch, saat kenarında değil, yetkilendirme sinyali yüksek kaldığı tüm süre boyunca girişe tepki verir. Oysa flip-flop kenar tetiklemelidir (edge-triggered) ve veriyi yalnızca saat darbesinin yükselen veya düşen kenarında örnekler.`,
      },
      {
        title: "4. Sözdizimi ve İstenmeyen Latch Çıkarımı",
        content: `Verilog'da latch tanımlamak için özel bir anahtar kelime yoktur. Sentez araçları; kenar tetiklemeli olmayan bir \`always\` bloğunda, bir sinyalin bazı koşullarda atanıp bazı koşullarda atanmadığını tespit ettiğinde otomatik olarak bir latch çıkarır (infer). Çünkü atanmayan durumlarda sinyal eski değerini saklamak zorundadır.

\`\`\`verilog
// Temel D Latch Modeli (Seviye Duyarlı)
always @(*) // posedge veya negedge yoktur
    if (en)  // Sadece en yüksekken q'ya değer atanır...
        q <= d; // ...dolayısıyla en düşükken q eski değerini korumak zorundadır (Latch!)

// Eşzamansız aktif-düşük resetli D Latch
always @(*)
    if (!rstn)
        q <= 0;
    else if (en)
        q <= d;
\`\`\`

**Tasarım Uyarısı:** Kombinasyonel mantık tasarlarken \`if\` veya \`case\` bloklarında tüm olasılıkları tanımlamazsanız (örneğin eksik \`else\` veya \`default\`), sentez aracı istemediğiniz bir latch çıkarır. Bu durum sayısal devrelerde zamanlama ihlallerine ve test edilebilirlik sorunlarına yol açar.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **D Tipi Mandal (D Latch) ve Şeffaf Seviye Tetikleme** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-d-latch.v - Örnek Donanım Modülü",
          snippet: `always @(*)        // Level-sensitive: no posedge or negedge
  if (en)          // Assign q only when en is high...
    q <= d;        // ...so q must hold its value when en is low`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-d-latch_tb.v - Simülasyon Testbench",
          snippet: `// 1. With asynchronous active-low reset (used in this article)
always @(*)
  if (!rstn)    q <= 0;
  else if (en)  q <= d;

// 2. Negative-level latch: transparent while en is low
always @(*)
  if (!en)      q <= d;`,
        },
      }

    ],
    playground: {
      initialCode: `always @(*)        // Level-sensitive: no posedge or negedge
  if (en)          // Assign q only when en is high...
    q <= d;        // ...so q must hold its value when en is low`,
      language: "verilog",
    },
    quiz: {
      question: "D Tipi Mandal (D Latch) ve Şeffaf Seviye Tetikleme ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-d-flip-flop": {
    id: "verilog-d-flip-flop",
    badge: "Bölüm 11 • Flip-Floplar & Mandallar (Latches)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "D Tipi Flip-Flop: Kenar Tetikleme ve Asenkron Reset",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 11: Flip-Floplar & Mandallar (Latches). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog D Tipi Flip-Flop (D Flip-Flop) Tasarımı

Eşzamansız (asynchronous) resetli bir D flip-flop, veri girişini (\`d\`) saatin yükselen kenarında (\`posedge clk\`) örnekleyerek çıkışa aktarır ve reset sinyali geldiği anda saat darbesini beklemeden çıkışını anında temizler. Sayısal tasarımda en yaygın kullanılan bellek elemanı olan D flip-flop, Verilog'da \`always @(posedge clk or negedge rstn)\` bloğu içinde önce reset koşulu kontrol edilerek modellenir.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- D flip-flop'un veriyi saat kenarında nasıl yakaladığını, eşzamansız ve eşzamanlı reset farklarını
- Her iki reset yaklaşımını sentezlenebilir Verilog standardında kodlamayı
- Her iki yaklaşımın donanımda hangi hücrelere sentezlendiğini ve doğru reset stratejisini seçmeyi
- Bir testbench ile zamanlama ve reset davranışını doğrulamayı, yaygın kodlama hatalarından kaçınmayı`,
      },
      {
        title: "3. D Flip-Flop Çalışma Mantığı ve Zamanlama",
        content: `D flip-flop kenar tetiklemeli (edge-triggered) bir saklama elemanıdır. Saatin (\`clk\`) her yükselen kenarında \`d\` veri girişindeki değeri \`q\` çıkışına kopyalar. Saat kenarları arasında \`d\` ne kadar değişirse değişsin \`q\` değerini korur. Bu özellik, seviye yüksek olduğu sürece veriyi geçiren seviye duyarlı D latch'ten en büyük farkıdır.

Sıfırlama (reset) girişi, devrenin bilinen kararlı bir durumda başlaması için \`q\` çıkışını 0'a zorlar. Aşağıdaki tabloda aktif-düşük (\`rstn\`) reset davranışı gösterilmiştir:

| rstn | clk | d | q (sonraki) | Davranış |
|---|---|---|---|---|
| 0 | x | x | 0 | Reset (Eşzamansız: anında; Eşzamanlı: ilk saat kenarında) |
| 1 | Yükselen Kenar | 0 | 0 | d yakalanır (0) |
| 1 | Yükselen Kenar | 1 | 1 | d yakalanır (1) |
| 1 | Kenar Yok | x | q | Değer korunur (Hold) |

**Zamanlama Kısıtları (Timing Constraints):** Verinin hatasız yakalanabilmesi için \`d\` sinyali saat kenarından önce belirli bir kurulum süresi (setup time, $t_{su}$) ve kenardan sonra belirli bir tutma süresi (hold time, $t_h$) boyunca kararlı kalmalıdır.`,
      },
      {
        title: "4. Sözdizimi ve Reset Stratejileri",
        content: `**Eşzamansız Aktif-Düşük Resetli D Flip-Flop (Standart ASIC/FPGA Deseni):**
\`\`\`verilog
always @(posedge clk or negedge rstn) begin
    if (!rstn)          // Reset daima ilk olarak kontrol edilmelidir
        q <= 1'b0;      // Sıfırlama değeri
    else
        q <= d;         // Normal çalışma: d verisi saat kenarında yakalanır
end
\`\`\`

**Kodlama Varyasyonları:**
\`\`\`verilog
// 1. Senkron (Eşzamanlı) Reset: Reset duyarlılık listesinde yer almaz
always @(posedge clk) begin
    if (!rstn)
        q <= 1'b0;
    else
        q <= d;
end

// 2. Çok Bitli Kaydedici (Register): Vektör portlar için aynı yapı uygulanır
// input [7:0] d; output reg [7:0] q;
always @(posedge clk or negedge rstn) begin
    if (!rstn) q <= 8'h00;
    else       q <= d;
end
\`\`\`

**Önemli Kural:** Ardışıl mantıkta yarış durumlarını (race condition) önlemek için daima engellemesiz atama (non-blocking assignment, \`<=\`) kullanılmalıdır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **D Tipi Flip-Flop: Kenar Tetikleme ve Asenkron Reset** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-d-flip-flop.v - Örnek Donanım Modülü",
          snippet: `always @(posedge clk or negedge rstn)   // Wake up on a clock edge OR on reset assertion
  if (!rstn)                            // Reset is checked first
    q <= 0;                             // Reset value
  else
    q <= d;                             // Normal operation: capture d`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-d-flip-flop_tb.v - Simülasyon Testbench",
          snippet: `// 1. Synchronous reset: reset is not in the sensitivity list
always @(posedge clk)
  if (!rstn) q <= 0;
  else       q <= d;

// 2. Asynchronous active-high reset: posedge rst, test if (rst)
always @(posedge clk or posedge rst)
  if (rst) q <= 0;
  else     q <= d;

// 3. Multi-bit register: the same code, with vector ports
//    input [7:0] d; output reg [7:0] q;  ->  q <= 8'h00 on reset`,
        },
      }

    ],
    playground: {
      initialCode: `always @(posedge clk or negedge rstn)   // Wake up on a clock edge OR on reset assertion
  if (!rstn)                            // Reset is checked first
    q <= 0;                             // Reset value
  else
    q <= d;                             // Normal operation: capture d`,
      language: "verilog",
    },
    quiz: {
      question: "D Tipi Flip-Flop: Kenar Tetikleme ve Asenkron Reset ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-tff": {
    id: "verilog-tff",
    badge: "Bölüm 11 • Flip-Floplar & Mandallar (Latches)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "T Tipi Flip-Flop (TFF) ile Frekans Bölme",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 11: Flip-Floplar & Mandallar (Latches). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog T Tipi Flip-Flop (T Flip-Flop / Toggle) Tasarımı

Verilog'da T tipi flip-flop (toggle flip-flop), \`t\` kontrol girişi '1' olduğu sürece her aktif saat kenarında çıkışını tersleyen (toggle), \`t\` '0' olduğunda ise mevcut durumunu koruyan bir ardışıl devre elemanıdır. Sayısal tasarımda T flip-flop, saat bölücüler (clock divider) ve ikilik sayaçlar (binary counter) oluşturmak için temel yapı taşıdır. Verilog'da \`t\` yüksekken \`q <= ~q\` ataması yapan saat duyarlı bir \`always\` bloğu ile modellenir.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- T flip-flop'un tersleme (toggle) ve saklama (hold) davranışını, karakteristik denklemini
- Eşzamanlı (synchronous) resetli bir T flip-flop'u sentezlenebilir Verilog ile tasarlamayı
- Standart hücre kütüphanelerinde (standard cell library) bağımsız T flip-flop hücresi bulunmadığında sentez aracının bu yapıyı D flip-flop ve XOR kapısıyla nasıl oluşturduğunu
- T flip-flop kullanarak 2'ye bölücü saat devreleri ve sayaçlar geliştirmeyi`,
      },
      {
        title: "3. T Flip-Flop Çalışma Mantığı ve Frekans Bölme",
        content: `T flip-flop; saat (\`clk\`), tersleme kontrol girişi (\`t\`) ve çıkışa (\`q\`) sahiptir. Devreye aktif-düşük senkron bir reset (\`rstn\`) eşlik eder. Saatin her yükselen kenarında:
- \`t = 0\`: \`q\` mevcut durumunu korur (Hold).
- \`t = 1\`: \`q\` değerini tersler (Toggle, $0 \\to 1$ veya $1 \\to 0$).

| rstn | t | q (mevcut) | q (sonraki) | Davranış |
|---|---|---|---|---|
| 0 | x | x | 0 | Senkron Reset |
| 1 | 0 | 0 | 0 | Tutma (Hold) |
| 1 | 0 | 1 | 1 | Tutma (Hold) |
| 1 | 1 | 0 | 1 | Tersleme (Toggle) |
| 1 | 1 | 1 | 0 | Tersleme (Toggle) |

Bu tablo T flip-flop'un karakteristik denklemini verir:
\`q(sonraki) = t ^ q\`

\`t\` girişi sürekli '1' seviyesinde tutulduğunda, çıkış her saat darbesinde terslenir; böylece çıkış sinyali saat frekansının tam yarısında ($f_{clk}/2$) bir kare dalga üretir. Bu 2'ye bölme (divide-by-2) özelliği, T flip-flop'ların sayaçlarda ve frekans bölücülerde yaygın kullanılmasının ana nedenidir.`,
      },
      {
        title: "4. Sözdizimi ve Donanım Gerçeklemesi",
        content: `**Senkron Resetli T Flip-Flop Sözdizimi:**
\`\`\`verilog
always @(posedge clk) begin
    if (!rstn)      // Önce senkron reset kontrolü
        q <= 1'b0;
    else if (t)     // t=1 ise çıkışı tersle
        q <= ~q;
    // else durumuna gerek yoktur: t=0 iken q değerini korur
end
\`\`\`

**Karakteristik Denklem ve Asenkron Reset Varyasyonları:**
\`\`\`verilog
// 1. Asenkron resetli T flip-flop
always @(posedge clk or negedge rstn) begin
    if (!rstn) q <= 1'b0;
    else if (t) q <= ~q;
end

// 2. Karakteristik denklem formu (XOR mantığı): Sentez aracı aynı donanımı üretir
always @(posedge clk) begin
    if (!rstn) q <= 1'b0;
    else       q <= t ^ q;
end

// 3. Sürekli Tersleme (2'ye Saat Bölücü): t sinyali doğrudan 1'e bağlıdır
always @(posedge clk or negedge rstn) begin
    if (!rstn) q <= 1'b0;
    else       q <= ~q;
end
\`\`\``,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **T Tipi Flip-Flop (TFF) ile Frekans Bölme** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-tff.v - Örnek Donanım Modülü",
          snippet: `always @(posedge clk)
  if (!rstn)        // Reset first
    q <= 0;
  else if (t)       // Toggle when t is 1
    q <= ~q;
  // No else needed: q holds its value when t is 0`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-tff_tb.v - Simülasyon Testbench",
          snippet: `// 1. Asynchronous reset: add the reset edge to the sensitivity list
always @(posedge clk or negedge rstn)
  if (!rstn)  q <= 0;
  else if (t) q <= ~q;

// 2. Equation form: same hardware, written from the characteristic equation
always @(posedge clk)
  if (!rstn) q <= 0;
  else       q <= t ^ q;

// 3. Always toggle (divide-by-2): t is effectively tied to 1
always @(posedge clk)
  if (!rstn) q <= 0;
  else       q <= ~q;`,
        },
      }

    ],
    playground: {
      initialCode: `always @(posedge clk)
  if (!rstn)        // Reset first
    q <= 0;
  else if (t)       // Toggle when t is 1
    q <= ~q;
  // No else needed: q holds its value when t is 0`,
      language: "verilog",
    },
    quiz: {
      question: "T Tipi Flip-Flop (TFF) ile Frekans Bölme ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-jk-flip-flop": {
    id: "verilog-jk-flip-flop",
    badge: "Bölüm 11 • Flip-Floplar & Mandallar (Latches)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "JK Tipi Flip-Flop ve Evrensel Durum Değişimi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 11: Flip-Floplar & Mandallar (Latches). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog JK Tipi Flip-Flop (JK Flip-Flop) Tasarımı

JK flip-flop, iki kontrol girişine sahip kenar tetiklemeli bir hafıza elemanıdır: \`j\` çıkışı 1 yapar (set), \`k\` çıkışı 0 yapar (reset), her iki giriş '0' olduğunda mevcut durumu korur (hold), her iki giriş '1' olduğunda ise çıkışı tersler (toggle). Verilog'da JK flip-flop, \`{j, k}\` ikilisi üzerinde bir \`case\` ifadesi çalıştıran saat duyarlı bir \`always\` bloğu ile tanımlanır.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- Dört temel JK işlemini (tutma, sıfırlama, kurma, tersleme) ve karakteristik denklemi
- \`case\` ifadesi kullanarak Verilog'da sentezlenebilir bir JK flip-flop tasarlamayı
- Sentez aracının JK yapısını nasıl ürettiğini ve JK'nin D, T ve SR flip-flop'larla ilişkisini
- Kapsamlı bir testbench ile dört çalışma durumunu simülasyonda doğrulamayı`,
      },
      {
        title: "3. JK Flip-Flop Çalışma Mantığı ve Karakteristik Denklem",
        content: `Bir JK flip-flop; bir saat (\`clk\`), iki kontrol girişi (\`j\` ve \`k\`) ve bir çıkışa (\`q\`) sahiptir. Saatin her yükselen kenarında \`{j, k}\` çifti dört işlemden birini belirler:

| j | k | q (sonraki) | İşlem Modu |
|---|---|---|---|
| 0 | 0 | q | Tutma (Hold) |
| 0 | 1 | 0 | Sıfırlama (Reset) |
| 1 | 0 | 1 | Kurma (Set) |
| 1 | 1 | ~q | Tersleme (Toggle) |

Doğruluk tablosundan çıkarılan çarpımlar toplamı karakteristik denklemi verir:
\`q(sonraki) = (j & ~q) | (~k & q)\`

Bu denklem iki durumu ifade eder: \`q\` 0 olduğunda bir sonraki değer \`j\`ye eşittir; \`q\` 1 olduğunda bir sonraki değer \`~k\`ya eşittir. Saat kenarları arasında girişler değişse bile \`q\` değerini korur.

JK flip-flop, SR flip-flop'un belirsiz (yasak) durumunun ortadan kaldırılmış halidir. SR flip-flop'ta $S=R=1$ durumu tanımsız ve kararsızken, JK flip-flop'ta $j=k=1$ durumu tersleme (toggle) olarak net bir şekilde tanımlanmıştır. Bu sayede JK flip-flop, basit giriş bağlantılarıyla hem D hem de T flip-flop gibi davranabilen genel amaçlı bir elemandır.`,
      },
      {
        title: "4. Sözdizimi ve RTL Modelleme",
        content: `**Temel \`case\` Yapısı ile JK Flip-Flop:**
\`\`\`verilog
always @(posedge clk) begin
    case ({j, k}) // j ve k sinyallerini 2-bitlik bir seçici olarak birleştirir
        2'b00 : q <= q;    // Tutma (Hold)
        2'b01 : q <= 1'b0; // Sıfırlama (Reset)
        2'b10 : q <= 1'b1; // Kurma (Set)
        2'b11 : q <= ~q;   // Tersleme (Toggle - JK'yi SR'dan ayıran temel özellik)
    endcase
end
\`\`\`

**Varyasyonlar ve Alternatif Formlar:**
\`\`\`verilog
// 1. Karakteristik Denklem Formu: Aynı donanımı doğrudan Boole ifadesiyle üretir
always @(posedge clk)
    q <= (j & ~q) | (~k & q);

// 2. Eşzamansız Aktif-Düşük Resetli JK Flip-Flop
always @(posedge clk or negedge rstn) begin
    if (!rstn)
        q <= 1'b0;
    else case ({j, k})
        2'b01 : q <= 1'b0;
        2'b10 : q <= 1'b1;
        2'b11 : q <= ~q;
        default: ; // 2'b00: Tutma durumu, q eski değerini korur
    endcase
end
\`\`\``,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **JK Tipi Flip-Flop ve Evrensel Durum Değişimi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-jk-flip-flop.v - Örnek Donanım Modülü",
          snippet: `always @(posedge clk)
  case ({j, k})           // Concatenate j and k into a 2-bit selector
    2'b00 : q <= q;       // Hold
    2'b01 : q <= 1'b0;    // Reset
    2'b10 : q <= 1'b1;    // Set
    2'b11 : q <= ~q;      // Toggle
  endcase`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-jk-flip-flop_tb.v - Simülasyon Testbench",
          snippet: `// 1. Equation form: same hardware, written from the characteristic equation
always @(posedge clk)
  q <= (j & ~q) | (~k & q);

// 2. With active-low asynchronous reset
always @(posedge clk or negedge rstn)
  if (!rstn) q <= 1'b0;
  else
    case ({j, k})
      2'b01 : q <= 1'b0;
      2'b10 : q <= 1'b1;
      2'b11 : q <= ~q;
      default: ;           // 2'b00: hold, q keeps its value
    endcase`,
        },
      }

    ],
    playground: {
      initialCode: `always @(posedge clk)
  case ({j, k})           // Concatenate j and k into a 2-bit selector
    2'b00 : q <= q;       // Hold
    2'b01 : q <= 1'b0;    // Reset
    2'b10 : q <= 1'b1;    // Set
    2'b11 : q <= ~q;      // Toggle
  endcase`,
      language: "verilog",
    },
    quiz: {
      question: "JK Tipi Flip-Flop ve Evrensel Durum Değişimi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-conditional-statements": {
    id: "verilog-conditional-statements",
    badge: "Bölüm 12 • Koşullu İfadeler (if-else & case)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Verilog Conditional Statements",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 12: Koşullu İfadeler (if-else & case). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog Koşullu İfadeler (Conditional Statements)

Neden Koşullu İfadeleri Öğrenmelisiniz? Bir çipin verdiği her karar — hangi komutun çalıştırılacağı, hangi veri yolu istemcisine erişim verileceği veya bir ağ paketinin düşürülüp düşürülmeyeceği — RTL kodunda koşullu ifadelerle tanımlanır. Seçtiğiniz sözdizimi donanımın fiziksel yapısını doğrudan şekillendirir: aynı karar mantığı üç farklı yazım tarzıyla bir çoklayıcıya (mux), bir öncelik zincirine (priority chain) veya istenmeyen bir mandala (unintended latch) dönüşebilir.

Verilog'da koşullu ifadeler; belirli bir koşula göre hangi değerin atanacağını veya hangi kod bloklarının çalışacağını belirler. Verilog bu amaçla üç temel yapı sunar: üçlü koşul operatörü (\`? :\`), \`if-else\` ifadesi ve \`case\` ifadesi. Sentezlenebilir RTL tasarımında bu yapıların her biri seçim donanımı, çoğunlukla da bir çoklayıcı (multiplexer) oluşturur.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- Koşul operatörü (\`? :\`), \`if-else\` ve \`case\` yapılarının sözdizimini ve geçerli oldukları alanları
- Her bir koşul yapısının sentez araçları tarafından hangi donanıma dönüştürüldüğünü
- Belirli bir mantık devresi için en verimli ve doğru yapıyı seçme kriterlerini
- \`x\` (belirsiz) değerlerinin, çok bitli koşulların ve eksik bırakılan dalların donanım sentezine etkilerini`,
      },
      {
        title: "3. Hızlı Karşılaştırma ve Donanım Eşdeğerleri",
        content: `Üç koşul yapısı da alternatifler arasında seçim yapar; ancak yazıldıkları yerler ve ölçeklenebilirlikleri farklıdır:

| Yapı | Kullanım Yeri | Seçenek Sayısı | Tipik Sentezlenen Donanım |
|---|---|---|---|
| \`? :\` | \`assign\` ve prosedürel bloklar | Operatör başına 2 | 2'ye 1 Mux |
| \`if-else\` | Yalnızca prosedürel bloklar (\`always\`, \`initial\`) | 2 veya \`else if\` ile daha fazla | 2'ye 1 Mux veya Öncelik Zinciri |
| \`case\` | Yalnızca prosedürel bloklar | Çok sayıda | Paralel N'e 1 Mux |

\`\`\`verilog
// Koşul operatörü: sürekli atama içinde
assign y = sel ? a : b;

// if-else: prosedürel always bloğu içinde
always @(*) if (sel) y = a; else y = b;

// case: prosedürel always bloğu içinde
always @(*) case (sel) 1'b1: y = a; default: y = b; endcase
\`\`\`

Bu üç blok da donanımda birebir aynı 2'ye 1 çoklayıcıyı tanımlar. Son iki blokta \`y\` sinyali bir \`always\` bloğunda atandığı için \`reg\` olarak bildirilmelidir.`,
      },
      {
        title: "4. Üçlü Koşul Operatörü (? :)",
        content: `Üçlü operatör (ternary operator) olarak da bilinen \`? :\`, bir koşula göre iki ifadeden birini seçer. Bu yapı bir 'ifade' (expression) olduğundan, bir değerin beklendiği her yerde, özellikle bir \`assign\` ifadesinin sağ tarafında doğrudan kullanılabilir:

\`<hedef_degisken> = <kosul> ? <ifade_1> : <ifade_2>;\`
- \`<kosul>\`: İlk olarak değerlendirilir. Sıfır dışındaki tüm değerler mantıksal DOĞRU (true) kabul edilir.
- \`<ifade_1>\`: Koşul doğru olduğunda atanan değer.
- \`<ifade_2>\`: Koşul yanlış olduğunda atanan değer.

\`\`\`verilog
module max2 (
    input  [7:0] a,
    input  [7:0] b,
    output [7:0] max // assign ile sürüldüğü için wire tipindedir
);
    // a, b'den büyükse a'yı; aksi halde b'yi çıkışa aktar
    assign max = (a > b) ? a : b;
endmodule
\`\`\`

**Sentez Çıktısı:** Her \`? :\` operatörü 2'ye 1 bir çoklayıcıya (mux) dönüşür. Seçici hattı koşul mantığından gelir (burada \`a > b\` karşılaştırmasını yapan 8-bitlik bir büyüklük karşılaştırıcısı).`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Conditional Statements** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-conditional-statements.v - Örnek Donanım Modülü",
          snippet: `// Conditional operator: inside a continuous assignment
assign y = sel ? a : b;

// if-else: inside a procedural block
always @(*)
  if (sel) y = a;
  else     y = b;

// case: inside a procedural block
always @(*)
  case (sel)
    1'b1    : y = a;
    default : y = b;
  endcase`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-conditional-statements_tb.v - Simülasyon Testbench",
          snippet: `<variable> = <condition> ? <expression_1> : <expression_2>;`,
        },
      }

    ],
    playground: {
      initialCode: `// Conditional operator: inside a continuous assignment
assign y = sel ? a : b;

// if-else: inside a procedural block
always @(*)
  if (sel) y = a;
  else     y = b;

// case: inside a procedural block
always @(*)
  case (sel)
    1'b1    : y = a;
    default : y = b;
  endcase`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Conditional Statements ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-if-else-if": {
    id: "verilog-if-else-if",
    badge: "Bölüm 12 • Koşullu İfadeler (if-else & case)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "if-else Karar Yapıları ve Öncelik Zinciri Mantığı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 12: Koşullu İfadeler (if-else & case). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog if-else-if Yapısı ve Öncelik Mantığı

Verilog \`if-else-if\` ifadesi, bir veya daha fazla koşulun doğruluğuna göre hangi işlemlerin yürütüleceğini belirler. Bir \`if\` bloğu koşul doğru (sıfırdan farklı) olduğunda çalışır; isteğe bağlı bir \`else\` koşul yanlış (sıfır, x veya z) olduğunda devreye girer. \`else if\` dalları ise sırayla kontrol edilen ilave koşullar ekler. \`if-else-if\` yapısının ardışık sıralaması, sentez aracına girişler arasında doğal bir öncelik (priority) ilişkisi tanımlar.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- \`if\`, \`if-else\` ve \`if-else-if\` sözdizimini, \`begin\` / \`end\` bloklarının ne zaman zorunlu olduğunu
- Her bir yapının donanımda neye dönüştüğünü: mandal (latch), flip-flop, clock enable veya öncelik mantığı
- \`else if\` sıralamasının önceliği nasıl belirlediğini ve sentez araçlarının bu önceliği ne zaman kaldırdığını
- Askıda kalan else (dangling-else), ulaşılamayan dallar ve istenmeyen latch hatalarını önlemeyi`,
      },
      {
        title: "3. Sözdizimi ve Blok Yapısı",
        content: `Her \`if\` veya \`else\` dalı varsayılan olarak yalnızca tek bir ifadeyi denetler. Bir dala birden fazla ifade yerleştirmek için \`begin\` ve \`end\` anahtar kelimeleri ile gruplanmalıdır. Tüm prosedürel yapılar gibi \`if-else\` de yalnızca bir \`always\` veya \`initial\` bloğu içinde kullanılabilir:

\`\`\`verilog
// Tek ifadeli basit if
if ([kosul]) ifade;

// Birden fazla ifade için begin-end kullanımı
if ([kosul]) begin
    ifade_1;
    ifade_2;
end else begin
    ifade_3;
    ifade_4;
end

// Öncelikli if-else-if zinciri
if ([kosul_1])
    ifade_1;
else if ([kosul_2]) begin
    ifade_2;
end else
    ifade_varsayilan;
\`\`\`

**Çalışma Mantığı:** Koşullar yukarıdan aşağıya doğru sırayla değerlendirilir ve yalnızca doğru olan İLK dal çalıştırılır. Sonraki koşullar doğru olsa bile atlanır. Bu sıralı değerlendirme mantığı, \`if-else-if\` yapısına öncelik karakteristiğini kazandırır.`,
      },
      {
        title: "4. Donanım Gerçeklemesi ve Sentez Kuralları",
        content: `Bir \`if\` ifadesinin donanımda neye dönüşeceği iki temel faktöre bağlıdır: \`always\` bloğunun türü (kombinasyonel mi yoksa saat tetiklemeli mi) ve çıkış sinyaline her yürütme yolunda bir değer atanıp atanmadığı:

| Blok Türü | Tüm Yollarda Çıkış Atanmış mı? | Sentezlenen Donanım Yapısı |
|---|---|---|
| \`always @(*)\` (Kombinasyonel) | Evet | Kombinasyonel Çoklayıcı (Mux) |
| \`always @(*)\` (Kombinasyonel) | Hayır | **İstenmeyen Mandal (Inferred Latch)** |
| \`always @(posedge clk)\` (Ardışıl) | Evet | D girişinde Mux bulunan Flip-Flop |
| \`always @(posedge clk)\` (Ardışıl) | Hayır | Değerini koruyan Flip-Flop (Clock Enable devresi) |

Kombinasyonel bloklarda eksik bırakılan dallar devrenin eski değerini tutmasını gerektirdiği için istenmeyen latch oluşturur; ardışıl bloklarda ise bu durum doğal olarak bir saat yetkilendirme (clock enable) girişine dönüşür.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **if-else Karar Yapıları ve Öncelik Zinciri Mantığı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-if-else-if.v - Örnek Donanım Modülü",
          snippet: `if ([expression])
	Single statement

// Use "begin" and "end" blocks for more than 1 statements
if ([expression]) begin
	Multiple statements
end

// Use else to execute statements for which expression is false
if ([expression]) begin
	Multiple statements
end else begin
	Multiple statements
end

// if-else-if style to check for more expressions if the previous one doesn't match
if ([expression 1])
	Single statement
else if ([expression 2]) begin
	Multiple Statements
end else
	Single statement`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-if-else-if_tb.v - Simülasyon Testbench",
          snippet: `module des (  input en,
              input d,
              output reg q);

    // Level-sensitive block: runs whenever en or d changes
    always @ (en or d)
        if (en)          // When en is 1, q follows d
            q = d;
        // No else: when en is 0, q is not assigned and keeps its value,
        // so synthesis infers a latch

endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `if ([expression])
	Single statement

// Use "begin" and "end" blocks for more than 1 statements
if ([expression]) begin
	Multiple statements
end

// Use else to execute statements for which expression is false
if ([expression]) begin
	Multiple statements
end else begin
	Multiple statements
end

// if-else-if style to check for more expressions if the previous one doesn't match
if ([expression 1])
	Single statement
else if ([expression 2]) begin
	Multiple Statements
end else
	Single statement`,
      language: "verilog",
    },
    quiz: {
      question: "if-else Karar Yapıları ve Öncelik Zinciri Mantığı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-case-statement": {
    id: "verilog-case-statement",
    badge: "Bölüm 12 • Koşullu İfadeler (if-else & case)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "case, casex ve casez İfadeleri ile Çok Yollu Seçim",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 12: Koşullu İfadeler (if-else & case). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog case İfadesi ile Paralel Çoklayıcı Tasarımı

Verilog \`case\` ifadesi, bir seçici ifadeyi bir liste dolusu alternatif durumla karşılaştırır ve eşleşen ilk durumun altındaki kodları çalıştırır. RTL tasarımında çoklayıcı (multiplexer) ve kod çözücü (decoder) tanımlamanın standart ve en temiz yoludur. Çakışan koşullara sahip uzun bir \`if-else-if\` zinciri basamaklı bir öncelik mantığı (priority logic) kurarken; ayrık sabit durumlara sahip bir \`case\` ifadesi paralel, dengeli bir çoklayıcı (parallel mux) sentezler.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- \`case\` sözdizimini, tek bir dalda virgülle ayrılmış birden çok değeri ve \`default\` durumunun önemini
- Bir \`case\` ifadesinin donanımda neye dönüştüğünü ve \`if-else\` yapısından yapısal farklarını
- \`case\` yapısının \`x\` ve \`z\` değerlerini nasıl eşleştirdiğini, \`casez\` ve \`casex\` farklarını
- İstenmeyen mandal (latch), bit genişliği uyuşmazlığı ve ulaşılamayan durum hatalarından kaçınmayı`,
      },
      {
        title: "3. Sözdizimi ve Temel Kurallar",
        content: `Bir \`case\` bloğu \`case\` anahtar kelimesiyle başlar ve \`endcase\` ile biter. Prosedürel bir ifade olduğundan bir \`always\` veya \`initial\` bloğu içinde bulunmalıdır:

\`\`\`verilog
case (<ifade>)
    durum_1             : <tek ifade>;
    durum_2, durum_3    : <tek ifade>; // Virgülle ayrılmış çoklu durumlar aynı bloğu paylaşır
    durum_4             : begin
                              <coklu ifadeler>;
                          end
    default             : <varsayilan ifade>; // Hiçbir durum eşleşmediğinde çalışır
endcase
\`\`\`

**Temel Kurallar:**
- C dilindekinin aksine Verilog'da durumlar arasında geçiş (fall-through) yoktur; \`break\` komutuna gerek kalmadan eşleşen dal bittiğinde bloktan çıkılır.
- Hiçbir durum eşleşmezse ve \`default\` tanımlanmamışsa hiçbir işlem yürütülmez; kombinasyonel bir blokta bu durum çıkışın eski değerini tutmasını gerektireceğinden istenmeyen bir latch oluşturur.
- \`case\` ifadeleri diğer \`case\` veya \`if\` blokları içinde iç içe (nested) kullanılabilir.`,
      },
      {
        title: "4. Örnek: 3 Girişli Çoklayıcı Tasarımı ve Simülasyonu",
        content: `Aşağıdaki örnekte 2-bitlik \`sel\` sinyali ile üç adet 3-bitlik giriş arasından seçim yapan bir çoklayıcı görülmektedir. \`sel\` sinyali 4 farklı değere sahip olabileceğinden, \`sel = 3\` durumu için \`default\` dalı çıkışı 0'a çekmektedir:

\`\`\`verilog
module my_mux (
    input      [2:0] a, b, c, // Üç adet 3-bitlik veri girişi
    input      [1:0] sel,     // 2-bitlik seçici sinyal
    output reg [2:0] out      // 3-bitlik çıkış (always bloğunda sürüldüğü için reg)
);
    // Girişlerden veya sel sinyalinden biri değiştiğinde tetiklenir
    always @ (a, b, c, sel) begin
        case (sel)
            2'b00   : out = a; // sel=0 ise çıkış a
            2'b01   : out = b; // sel=1 ise çıkış b
            2'b10   : out = c; // sel=2 ise çıkış c
            default : out = 3'b000; // sel=3 veya tanımsızsa çıkış 0
        endcase
    end
endmodule
\`\`\`

Simülasyon çıktısında görüldüğü gibi, \`sel\` 1 iken çıkış \`b\` değerini, 2 iken \`c\` değerini alır; \`sel\` 3 olduğunda ise hiçbir durumla eşleşmediği için \`default\` devreye girerek çıkışı güvenli şekilde 0 yapar.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **case, casex ve casez İfadeleri ile Çok Yollu Seçim** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-case-statement.v - Örnek Donanım Modülü",
          snippet: `// Here 'expression' should match one of the items (item 1,2,3 or 4)
case (<expression>)
	case_item1 : 	<single statement>
	case_item2,
	case_item3 : 	<single statement>
	case_item4 : 	begin
	          			<multiple statements>
	        			end
	default 	 : <statement>
endcase`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-case-statement_tb.v - Simülasyon Testbench",
          snippet: `module my_mux (input       [2:0] 	a, b, c, 		// Three 3-bit inputs
               input       [1:0]	sel, 			  // 2-bit select signal to choose from a, b, c
               output reg  [2:0] 	out); 			// Output 3-bit signal

  // This always block is executed whenever a, b, c or sel changes in value
  always @ (a, b, c, sel) begin
    case(sel)
      2'b00    : out = a; 		// If sel=0, output is a
      2'b01    : out = b; 		// If sel=1, output is b
      2'b10    : out = c; 		// If sel=2, output is c
      default  : out = 0; 		// If sel is anything else, out is always 0
    endcase
  end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// Here 'expression' should match one of the items (item 1,2,3 or 4)
case (<expression>)
	case_item1 : 	<single statement>
	case_item2,
	case_item3 : 	<single statement>
	case_item4 : 	begin
	          			<multiple statements>
	        			end
	default 	 : <statement>
endcase`,
      language: "verilog",
    },
    quiz: {
      question: "case, casex ve casez İfadeleri ile Çok Yollu Seçim ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-for-loop": {
    id: "verilog-for-loop",
    badge: "Bölüm 13 • Döngüler & Donanım Generate Blokları",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Verilog for Döngüsü: Sentezlenebilir Donanım Üretimi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 13: Döngüler & Donanım Generate Blokları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog for Döngüsü: Sentezlenebilir Donanım Üretimi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog for Döngüsü: Sentezlenebilir Donanım Üretimi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog for Döngüsü: Sentezlenebilir Donanım Üretimi Şeması](/images/verilog/shift_reg_for_loop_schematic.png)

![Verilog for Döngüsü: Sentezlenebilir Donanım Üretimi Şeması](/images/verilog/shift_reg_wave.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış ve Giriş",
        content: `### Verilog for Döngüsü: Sentezlenebilir Donanım Üretimi

Verilog'da \`for\` döngüsü, bir döngü değişkeninin başlangıç değerinden bitiş değerine doğru adım adım ilerlediği ve belirli bir koşul sağlandığı sürece ifadeleri tekrarlayan prosedürel bir yapıdır. Yazılım dillerinde döngüler zamana yayılmış olarak (ardışık adımlarla) yürütülürken; sentezlenebilir Verilog'da \`for\` döngüsü **donanımı mekansal olarak çoğaltmanın (hardware replication)** kestirme yoludur. Sentez aracı döngünün her bir adımını açar (unroll eder) ve donanımda o mantığın paralel kopyalarını oluşturur.`,
      },
      {
        title: "4. Neler Öğreneceksiniz?",
        content: `- \`for\` döngüsünün Verilog sözdizimini ve klasik yazılım döngülerinden donanımsal farklarını
- Sentez araçlarının bir döngüyü paralel donanıma nasıl açtığını (loop unrolling)
- Saatli ve kombinasyonel bloklarda \`for\` döngüleri ile kompakt ve parametrik devreler tasarlamayı
- Döngü tuzaklarından kaçınmayı: sabit olmayan sınırlar, yetersiz döngü değişkeni genişliği ve yanlış atama türleri`,
      },
      {
        title: "5. Sözdizimi ve Yürütme Mantığı",
        content: `Bir \`for\` döngüsü başlığında üç temel bileşen yer alır: başlangıç ataması, her adımdan önce kontrol edilen koşul ve her adımdan sonra çalışan artırma ifadesi. Diğer prosedürel yapılar gibi bir \`always\` veya \`initial\` bloğu içinde yer almalıdır:

\`\`\`verilog
for (<baslangic_atamasi>; <kosul>; <adim_atamasi>) begin
    // İfadeler
end
\`\`\`

- \`<baslangic_atamasi>\`: Döngü değişkeninin ilk değeri (örn. \`i = 0\`).
- \`<kosul>\`: Döngünün devam etmesi için sağlanan mantıksal şart (örn. \`i < 10\`).
- \`<adim_atamasi>\`: Her iterasyondan sonra değişkenin güncellenmesi (örn. \`i = i + 1\`).

\`\`\`verilog
module my_design;
    integer i;
    initial begin
        // Verilog'da ++ operatörü yoktur, bu nedenle i = i + 1 yazılır
        for (i = 0; i < 10; i = i + 1) begin
            $display("Geçerli döngü adımı: %0d", i);
        end
    end
endmodule
\`\`\`

Döngü değişkeni modül içerisinde genellikle \`integer\` olarak tanımlanır. Verilog-1995/2001 standardında \`++\` operatörü bulunmadığından artırma işlemi \`i = i + 1\` biçiminde açıkça yazılır.`,
      },
      {
        title: "6. Sentez Aracı for Döngüsünü Nasıl İşler?",
        content: `Fiziksel donanımda "bir döngüyü zamana yayarak çalıştırmak" gibi bir kavram yoktur. Sentez araçları döngüyü tamamen açar (loop unrolling): döngü değişkeninin alacağı her bir değeri derleme zamanında hesaplar ve sanki elle her adımı tek tek yazmışsınız gibi döngü gövdesini kopyalar. Tüm bu donanım kopyaları silikon üzerinde yan yana yer alır ve aynı anda paralel olarak çalışır.

**Bu Çalışma Şeklinin İki Temel Sonucu Vardır:**
1. **Döngü Sınırları Sabit Olmalıdır:** Döngü sınırları derleme zamanında bilinen bir sabit (sayı veya parametre) olmalıdır; böylece sentez aracı kaç kopya donanım üreteceğini bilebilir.
2. **Döngü Zaman Tüketmez:** Tüm iterasyonlar \`always\` bloğunun tek bir değerlendirme adımında gerçekleşir; dolayısıyla saat kenarına bağlı bir bloktaki \`for\` döngüsü her iterasyon için bir saat çevrimi harcamaz, tek bir saat çevriminde tamamlanır.

*Not:* Modül örneklemelerini ve \`assign\` ifadelerini çoğaltmak için \`generate\` bloğu içindeki \`for\` döngüsü kullanılır; bu farklı bir yapıdır.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog for Döngüsü: Sentezlenebilir Donanım Üretimi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
      },
{
        title: "8. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog for Döngüsü: Sentezlenebilir Donanım Üretimi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-for-loop.v - Örnek Donanım Modülü",
          snippet: `for (<initial_condition>; <condition>; <step_assignment>) begin
	// Statements
end`,
        },
      },
{
        title: "9. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-for-loop_tb.v - Simülasyon Testbench",
          snippet: `module my_design;
	integer i;

	initial begin
		// Note that ++ operator does not exist in Verilog !
		for (i = 0; i < 10; i = i + 1) begin
			$display ("Current loop#%0d ", i);
		end
	end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `for (<initial_condition>; <condition>; <step_assignment>) begin
	// Statements
end`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog for Döngüsü: Sentezlenebilir Donanım Üretimi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-generate-block": {
    id: "verilog-generate-block",
    badge: "Bölüm 13 • Döngüler & Donanım Generate Blokları",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "generate for / if Blokları ile Tekrarlı Donanım Replikasyonu",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 13: Döngüler & Donanım Generate Blokları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **generate for / if Blokları ile Tekrarlı Donanım Replikasyonu** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **generate for / if Blokları ile Tekrarlı Donanım Replikasyonu** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![generate for / if Blokları ile Tekrarlı Donanım Replikasyonu Şeması](/images/verilog/generate_block_for_loop_ha_schematic.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış ve Giriş",
        content: `### Verilog generate Blokları ile Donanım Çoğaltma ve Koşullu Örnekleme

Verilog \`generate\` bloğu; modül örneklemelerini parametrik olarak çoğaltmayı veya parametrelere bağlı olarak koşullu modül yerleşimi yapmayı sağlayan güçlü bir RTL yapılandırma aracıdır. Tasarımın Verilog parametrelerine göre derleme aşamasında (elaboration time) esnek bir şekilde inşa edilmesini sağlar. Aynı mantık bloğunun defalarca tekrarlandığı durumlarda veya mimarinin belirli koşullara göre seçilmesi gerektiğinde kod tekrarını önler.

Bir \`generate\` bloğu doğrudan port veya parametre bildirimi içeremez; ancak modül örneklemeleri, sürekli atamalar (\`assign\`), \`always\` veya \`initial\` blokları içerebilir. İki temel \`generate\` türü bulunur:
- **generate for:** Döngü ile donanım çoğaltma
- **generate if-else / case:** Parametrelere bağlı koşullu donanım yerleşimi`,
      },
      {
        title: "4. generate for Döngüsü ile Donanım Çoğaltma",
        content: `Aşağıdaki örnekte bir yarım toplayıcı (\`ha\`), üst modülde bir \`generate for\` döngüsü kullanılarak N kez örneklenmektedir. Döngü değişkeni, sentez aracına bu değişkenin yalnızca derleme/oluşturma (elaboration) aşamasında kullanılacağını belirten \`genvar\` anahtar kelimesiyle tanımlanmalıdır:

\`\`\`verilog
// Yarım toplayıcı (Half Adder) alt modülü
module ha (
    input  a, b,
    output sum, cout
);
    assign sum  = a ^ b;
    assign cout = a & b;
endmodule

// N adet yarım toplayıcı içeren parametrik üst modül
module my_design #(parameter N = 4) (
    input  [N-1:0] a, b,
    output [N-1:0] sum, cout
);
    // Yalnızca derleme zamanında kullanılan genvar değişkeni
    genvar i;

    // N adet yarım toplayıcıyı donanımda paralel olarak üretir
    generate
        for (i = 0; i < N; i = i + 1) begin : gen_ha
            ha u0 (
                .a(a[i]),
                .b(b[i]),
                .sum(sum[i]),
                .cout(cout[i])
            );
        end
    endgenerate
endmodule
\`\`\``,
      },
      {
        title: "5. Testbench ve Simülasyon Doğrulaması",
        content: `Testbench parametresi, tasarım içindeki yarım toplayıcı modül kopyalarının sayısını kontrol etmek için kullanılır. \`N = 2\` olarak atandığında \`my_design\` modülü donanımda iki bağımsız yarım toplayıcı kopyası oluşturur:

\`\`\`verilog
module tb;
    parameter N = 2;
    reg  [N-1:0] a, b;
    wire [N-1:0] sum, cout;

    // N=2 parametresi ile üst tasarımı örneklendir
    my_design #(.N(N)) md (
        .a(a),
        .b(b),
        .sum(sum),
        .cout(cout)
    );

    initial begin
        a <= 0; b <= 0;
        $monitor("a=0x%0h b=0x%0h sum=0x%0h cout=0x%0h", a, b, sum, cout);
        #10 a <= 'h2; b <= 'h3;
        #20 b <= 'h4;
        #10 a <= 'h5;
    end
endmodule
\`\`\`

\`a[0]\` ve \`b[0]\` girişleri \`sum[0]\` ve \`cout[0]\` çıkışlarını üretirken; \`a[1]\` ve \`b[1]\` girişleri bağımsız olarak \`sum[1]\` ve \`cout[1]\` çıkışlarını sürer. Sentezlenmiş şemada \`generate\` bloğu tarafından oluşturulan iki bağımsız toplayıcı açıkça görülür.`,
      },
      {
        title: "6. generate if ile Koşullu Modül Örnekleme",
        content: `Aşağıdaki örnekte \`generate if-else\` yapısı kullanılarak iki farklı çoklayıcı tasarımından biri derleme zamanında seçilmektedir. İlk tasarım \`assign\` ifadesiyle, ikinci tasarım ise \`case\` ifadesiyle modellenmiştir. Üst modüldeki \`USE_CASE\` parametresi hangi tasarımın fiziksel silikona dahil edileceğini belirler:

\`\`\`verilog
// 1. Tasarım: assign ile modellenen çoklayıcı
module mux_assign (input a, b, sel, output out);
    assign out = sel ? a : b;
    initial $display("mux_assign örneklendi");
endmodule

// 2. Tasarım: case ile modellenen çoklayıcı
module mux_case (input a, b, sel, output reg out);
    always @ (a or b or sel) begin
        case (sel)
            0 : out = a;
            1 : out = b;
        endcase
    end
    initial $display("mux_case örneklendi");
endmodule

// Üst Tasarım: Parametreye göre modül seçimi
module my_design (
    input  a, b, sel,
    output out
);
    parameter USE_CASE = 0;

    generate
        if (USE_CASE)
            mux_case mc (.a(a), .b(b), .sel(sel), .out(out));
        else
            mux_assign ma (.a(a), .b(b), .sel(sel), .out(out));
    endgenerate
endmodule
\`\`\`

Bu yöntem sayesinde seçilmeyen modül derleme aşamasında elenir ve donanımda gereksiz alan harcanmaz.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **generate for / if Blokları ile Tekrarlı Donanım Replikasyonu** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
      },
{
        title: "8. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **generate for / if Blokları ile Tekrarlı Donanım Replikasyonu** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-generate-block.v - Örnek Donanım Modülü",
          snippet: `// Design for a half-adder
module ha ( input   a, b,
            output  sum, cout);
 
  assign sum  = a ^ b;
  assign cout = a & b;
endmodule

// A top level design that contains N instances of half adder
module my_design 
	#(parameter N=4) 
		(	input [N-1:0] a, b,
			output [N-1:0] sum, cout);
			
	// Declare a temporary loop variable to be used during
	// generation and won't be available during simulation
	genvar i;
	
	// Generate for loop to instantiate N times
	generate 
		for (i = 0; i < N; i = i + 1) begin
          ha u0 (a[i], b[i], sum[i], cout[i]);
		end
	endgenerate
endmodule`,
        },
      },
{
        title: "9. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-generate-block_tb.v - Simülasyon Testbench",
          snippet: `module tb;
	parameter N = 2;
  reg  [N-1:0] a, b;
  wire [N-1:0] sum, cout;
  
  // Instantiate top level design with N=2 so that it will have 2
  // separate instances of half adders and both are given two separate
  // inputs
  my_design #(.N(N)) md( .a(a), .b(b), .sum(sum), .cout(cout));
  
  initial begin
    a <= 0;
    b <= 0;
    
    $monitor ("a=0x%0h b=0x%0h sum=0x%0h cout=0x%0h", a, b, sum, cout);
    
    #10 a <= 'h2;
    		b <= 'h3;
    #20 b <= 'h4;
    #10 a <= 'h5;
  end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// Design for a half-adder
module ha ( input   a, b,
            output  sum, cout);
 
  assign sum  = a ^ b;
  assign cout = a & b;
endmodule

// A top level design that contains N instances of half adder
module my_design 
	#(parameter N=4) 
		(	input [N-1:0] a, b,
			output [N-1:0] sum, cout);
			
	// Declare a temporary loop variable to be used during
	// generation and won't be available during simulation
	genvar i;
	
	// Generate for loop to instantiate N times
	generate 
		for (i = 0; i < N; i = i + 1) begin
          ha u0 (a[i], b[i], sum[i], cout[i]);
		end
	endgenerate
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "generate for / if Blokları ile Tekrarlı Donanım Replikasyonu ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-functions": {
    id: "verilog-functions",
    badge: "Bölüm 14 • Fonksiyonlar & Görevler (Functions & Tasks)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Verilog Fonksiyonları (function ... endfunction)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 14: Fonksiyonlar & Görevler (Functions & Tasks). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog Fonksiyonları (Functions) ve Kombinasyonel Hesaplama

Neden Fonksiyonları Öğrenmelisiniz? Sağlama toplamı (checksum) hesaplama, Gray kodu dönüşümü, parite kontrolleri ve bit alanı kod çözme gibi algoritmalar genellikle tek bir tasarımın birden çok yerinde tekrarlanır. Aynı mantıksal ifadeyi her yere kopyalamak kodun boyutunu artırır ve olası bir hata düzeltmesini zahmetli bir işe dönüştürür. Bir Verilog fonksiyonu bu hesaplamayı tek bir yerde tanımlar ve ihtiyaç duyulan her noktada çağrılmasına olanak tanır.

Verilog fonksiyonu; bir veya daha fazla giriş alan, bir sonuç hesaplayan ve C dilindeki fonksiyonlara benzer şekilde **tek bir değer döndüren** yeniden kullanılabilir bir kod bloğudur. Fonksiyonlar sıfır simülasyon zamanında (\`zero simulation time\`) çalışır: gecikme (\`#\`) veya olay kontrolü (\`@\`, \`wait\`) içeremezler. Bu nedenle tekrarlanan kombinasyonel hesaplamalar için idealdirler.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- Verilog fonksiyonlarını tanımlamayı, değer döndürmeyi ve modül içinde çağırmayı
- Bir fonksiyonun donanımda hangi kombinasyonel mantık kapılarına sentezlendiğini
- Sentezlenebilir fonksiyon kurallarını ve özyineleme (recursion) için \`automatic\` anahtar kelimesinin rolünü
- Sabit fonksiyonları (constant functions) kullanarak parametrik port genişlikleri tanımlamayı`,
      },
      {
        title: "3. Fonksiyon Sözdizimi ve Kuralları",
        content: `\`\`\`verilog
function [automatic] [donus_tipi] fonksiyon_adi ([giris_listesi]);
    // Bildirimler ve prosedürel ifadeler
    fonksiyon_adi = ifade; // Dönüş değeri fonksiyon adına atanır
endfunction
\`\`\`

- \`automatic\`: Her çağrıya fonksiyon değişkenlerinin bağımsız bir kopyasını tahsis eder; özyinelemeli (recursive) fonksiyonlar için zorunludur.
- \`donus_tipi\`: \`[7:0]\` gibi bir bit aralığı veya \`integer\` gibi bir veri tipidir. Belirtilmezse varsayılan olarak 1-bit döner.
- \`fonksiyon_adi\`: Fonksiyonun adıdır; aynı zamanda dönüş değerini tutan bir değişken gibi davranır.
- \`giris_listesi\`: Fonksiyonun aldığı bir veya daha fazla giriş argümanıdır (en az bir giriş zorunludur; \`output\` veya \`inout\` barındıramaz).

Fonksiyonlar bir modülün içinde, herhangi bir \`always\` veya \`initial\` bloğunun dışında tanımlanır ve modülün herhangi bir yerinden çağrılabilir.`,
      },
      {
        title: "4. Giriş Bildirim Stilleri ve Örnek Fonksiyon",
        content: `Fonksiyon girişlerini tanımlamanın iki eşdeğer yolu vardır. Birinci stilde (Verilog-1995) girişler gövde içinde satır satır bildirilir. İkinci stilde (Verilog-2001) ise modül portları gibi parantez içinde port listesi olarak tanımlanır:

\`\`\`verilog
// Stil 1: Geleneksel Verilog-1995 Sözdizimi
function [7:0] sum;
    input [7:0] a, b;
    begin
        sum = a + b;
    end
endfunction

// Stil 2: Modern ANSI Verilog-2001 Sözdizimi
function [7:0] sum (input [7:0] a, b);
    begin
        sum = a + b;
    end
endfunction
\`\`\`

Her iki sürüm de aynı işlevi gerçekleştirir: iki adet 8-bitlik giriş alır ve bunların 8-bitlik toplamını döndürür. Dönüş tipi \`[7:0]\` olduğundan 7. bitten taşan elde (carry) göz ardı edilir.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Fonksiyonları (function ... endfunction)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-functions.v - Örnek Donanım Modülü",
          snippet: `function [automatic] [return_type] name ([port_list]);
	[statements]
endfunction`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-functions_tb.v - Simülasyon Testbench",
          snippet: `function [7:0] sum;
	input [7:0] a, b;
	begin
		sum = a + b;
	end
endfunction

function [7:0] sum (input [7:0] a, b);
	begin
		sum = a + b;
	end
endfunction`,
        },
      }

    ],
    playground: {
      initialCode: `function [automatic] [return_type] name ([port_list]);
	[statements]
endfunction`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Fonksiyonları (function ... endfunction) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-task": {
    id: "verilog-task",
    badge: "Bölüm 14 • Fonksiyonlar & Görevler (Functions & Tasks)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Verilog Görevleri (task ... endtask) ve Zaman Gecikmeleri",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 14: Fonksiyonlar & Görevler (Functions & Tasks). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış ve Giriş",
        content: `### Verilog Görevleri (Tasks) ve Testbench Modellemesi

Verilog görevi (\`task\`), girişler alabilen, \`output\` ve \`inout\` argümanları aracılığıyla birden çok sonuç döndürebilen ve en önemlisi fonksiyonların aksine \`#\` gecikmeleri, \`@\` olay kontrolleri ve \`wait\` gibi zamanlama kontrolleri barındırabilen prosedürel bir kod bloğudur. Görevler çoğunlukla testbench ortamlarında kullanılır; bir veri yolu protokolünü yürütmek, belirli bir sıfırlama (reset) sekansını uygulamak veya simülasyon zamanı harcayan karmaşık senaryoları paketlemek için vazgeçilmezdir.`,
      },
      {
        title: "2. Neler Öğreneceksiniz?",
        content: `- Giriş, çıkış ve zamanlama kontrolleri içeren bir \`task\` tanımlamayı ve çağırmayı
- Eşzamanlı çağrılarda statik (\`static\`) ve dinamik (\`automatic\`) görevlerin bellek davranışlarını
- Bir \`task\` ile \`function\` arasındaki temel farkları ve sentezlenebilirlik sınırlarını
- Çalışan bir görevi \`disable\` komutuyla sonlandırmayı ve yaygın testbench hatalarını önlemeyi`,
      },
      {
        title: "3. Görev Sözdizimi ve Argüman Yapısı",
        content: `Bir görev argümanlarını gövde içinde (Stil 1) veya adından sonra bir port listesinde (Stil 2) bildirebilir. Argümanlar \`input\`, \`output\` veya \`inout\` olabilir; ayrıca argümansız bir görev de tanımlanabilir:

\`\`\`verilog
// Stil 1: Gövde İçi Bildirim
task gorev_adi;
    input  [7:0] data_in;
    output [7:0] data_out;
    begin
        #10 data_out = data_in + 1;
    end
endtask

// Stil 2: ANSI Port Listesi Bildirimi
task gorev_adi (input [7:0] data_in, output [7:0] data_out);
    begin
        #10 data_out = data_in + 1;
    end
endtask
\`\`\`

**Önemli Kurallar:**
- \`task\` bağımsız bir ifade (statement) olarak çağrılır; bir değer döndürmediği için (\`return\` mantığı yoktur) matematiksel bir ifadenin parçası olarak kullanılamaz.
- Çıkış değerleri, görev tamamlandığında çağıran değişkenlere kopyalanır.
- Gövde içerisinde gecikme (\`#10\`), saat kenarı bekleme (\`@(posedge clk)\`) ve diğer görev çağrıları serbestçe yer alabilir.`,
      },
      {
        title: "4. Statik ve Otomatik Görev Davranışı",
        content: `Varsayılan olarak Verilog'daki bir görev **statiktir (static)**: argümanları ve dahili değişkenleri bellekte tek bir paylaşılan alana sahiptir ve her çağrı bu aynı kopyayı kullanır. İki farklı \`initial\` bloğu aynı anda statik bir görevi çağırdığında değişkenler çakışır:

\`\`\`verilog
module tb;
    initial display();
    initial display();
    initial display();
    initial display();

    // Statik Görev: 'i' değişkeni tüm çağrılar arasında paylaşılır
    task display();
        integer i = 0;
        i = i + 1;
        $display("i = %0d", i);
    endtask
endmodule
\`\`\`

Simülasyon Çıktısı:
\`i = 1\`, \`i = 2\`, \`i = 3\`, \`i = 4\`

Dört çağrının tamamı bellekteki aynı \`i\` değişkenini paylaşır. Statik bir görevde \`integer i = 0\` ilk değer ataması yalnızca simülasyonun başında bir kez yapılır; bu nedenle her çağrı bir önceki çağrının bıraktığı değere 1 ekler. Bağımsız değişken kopyaları için \`task automatic\` tanımı kullanılmalıdır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Görevleri (task ... endtask) ve Zaman Gecikmeleri** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-task.v - Örnek Donanım Modülü",
          snippet: `// Style 1
task [name];
	input  [port_list];
	inout  [port_list];
	output [port_list];
	begin
		[statements]
	end
endtask

// Style 2
task [name] (input [port_list], inout [port_list], output [port_list]);
	begin
		[statements]
	end
endtask

// Empty port list
task [name] ();
	begin
		[statements]
	end
endtask`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-task_tb.v - Simülasyon Testbench",
          snippet: `task sum (input [7:0] a, b, output [7:0] c);
		begin
			c = a + b;
		end
	endtask
// or
	task sum;
		input  [7:0] a, b;
		output [7:0] c;
		begin
			c = a + b;
		end
	endtask

	reg [7:0] x, y, z;

	initial begin
		x = 3;
		y = 4;
		sum (x, y, z);    // After the call, z = 7
	end`,
        },
      }

    ],
    playground: {
      initialCode: `// Style 1
task [name];
	input  [port_list];
	inout  [port_list];
	output [port_list];
	begin
		[statements]
	end
endtask

// Style 2
task [name] (input [port_list], inout [port_list], output [port_list]);
	begin
		[statements]
	end
endtask

// Empty port list
task [name] ();
	begin
		[statements]
	end
endtask`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Görevleri (task ... endtask) ve Zaman Gecikmeleri ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
};
