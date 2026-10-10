import { LessonContent } from "./lessonsData";

export const VERILOG_PART4: Record<string, LessonContent> = {
  "verilog-gate-level-modeling": {
    id: "verilog-gate-level-modeling",
    badge: "Bölüm 21 • Kapı Seviyesi Modelleme (Gate-Level)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 21: Kapı Seviyesi Modelleme (Gate-Level). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Genel Bakış & Kapı Seviyesi Modelleme İlkeleri",
        content: `Sayısal devre tasarımlarının büyük bölümü günümüzde RTL (Register Transfer Level) gibi yüksek soyutlama seviyelerinde gerçekleştirilse de, bazı kritik durumlarda temel mantık elemanlarını doğrudan kapı seviyesinde (gate-level) kurgulamak donanım mimarisi açısından çok daha sezgisel ve deterministiktir. Kapı seviyesi modelleme, şematik mantık diyagramı ile Verilog HDL kodu arasında birebir (1-to-1) donanımsal karşılık sunar.

Verilog, dilin içine gömülü olarak gelen ve harici bir modül bildirimi gerektirmeden doğrudan örneklenebilen (instantiation) temel mantık primitiflerini (gate primitives) destekler. Bu primitifler şunlardır:
- \`and\`: 2 veya daha fazla girişe sahip VE kapısı (\`and u0(out, i1, i2, ...);\`)
- \`or\`: 2 veya daha fazla girişe sahip VEYA kapısı (\`or u0(out, i1, i2, ...);\`)
- \`xor\`: 2 veya daha fazla girişe sahip ÖZEL VEYA kapısı (\`xor u0(out, i1, i2, ...);\`)
- \`nand\`: VE-DEĞİL kapısı (\`nand u0(out, i1, i2, ...);\`)
- \`nor\`: VEYA-DEĞİL kapısı (\`nor u0(out, i1, i2, ...);\`)
- \`xnor\`: ÖZEL VEYA-DEĞİL kapısı (\`xnor u0(out, i1, i2, ...);\`)
- \`buf\`: Skaler girişi değiştirmeden bir veya birden fazla çıkışa aktaran tampon (\`buf u0(out1, out2, in);\`)
- \`not\`: Giriş sinyalini tersleyen DEĞİL kapısı (\`not u0(out, in);\`)
- \`bufif1\` / \`bufif0\`: Üç durumlu (tri-state) tamponlar. \`bufif1\`, kontrol ucu 1 olduğunda; \`bufif0\`, kontrol ucu 0 olduğunda çıkışı sürer. Aksi halde yüksek empedans (\`z\`) üretir.
- \`notif1\` / \`notif0\`: Üç durumlu tersleyiciler. İlgili kontrol şartında terslenmiş çıkışı sürer, aksi takdirde \`z\` durumuna geçer.

Daha karmaşık mantıksal davranışlar için Kullanıcı Tanımlı Primitifler (User Defined Primitives - UDP) kullanılır.`,
      },
      {
        title: "2. Temel Mantık Kapıları: and, or ve xor Primitifleri",
        content: `\`and\`, \`or\` ve \`xor\` primitifleri çok sayıda skaler girişi alarak tek bir skaler çıkış üretir. Port bağlantı listesinde ilk terminal DAİMA çıkış (output) terminalidir; sonraki tüm terminaller ise giriş (input) sinyalleridir. Girişlerden herhangi biri değiştiğinde çıkış anında güncellenir.

Örnek Modül ve Doğrulama Kodu (Testbench):
\`\`\`verilog
module gates (
  input a, b,
  output c, d, e
);
  and (c, a, b); // c çıkış, a ve b giriş
  or  (d, a, b); // d çıkış, a ve b giriş
  xor (e, a, b); // e çıkış, a ve b giriş
endmodule

module tb;
  reg a, b;
  wire c, d, e;
  integer i;

  gates u0 (
    .a(a), .b(b),
    .c(c), .d(d), .e(e)
  );

  initial begin
    {a, b} = 0;
    $monitor("[T=%0t] a=%0b b=%0b c(and)=%0b d(or)=%0b e(xor)=%0b", $time, a, b, c, d, e);
    for (i = 0; i < 10; i = i + 1) begin
      #1 a <= $random; b <= $random;
    end
  end
endmodule
\`\`\`

Simülasyon Çıktısı:
\`\`\`text
[T=0] a=0 b=0 c(and)=0 d(or)=0 e(xor)=0
[T=1] a=0 b=1 c(and)=0 d(or)=1 e(xor)=1
[T=2] a=1 b=1 c(and)=1 d(or)=1 e(xor)=0
[T=4] a=1 b=0 c(and)=0 d(or)=1 e(xor)=1
[T=5] a=1 b=1 c(and)=1 d(or)=1 e(xor)=0
[T=6] a=0 b=1 c(and)=0 d(or)=1 e(xor)=1
[T=7] a=1 b=0 c(and)=0 d(or)=1 e(xor)=1
[T=10] a=1 b=1 c(and)=1 d(or)=1 e(xor)=0
\`\`\``,
      },
      {
        title: "3. Ters Mantık Kapıları: nand, nor ve xnor ile Çok Girişli Yapılar",
        content: `Temel mantık kapılarının tersleyen türevleri \`nand\`, \`nor\` ve \`xnor\` olarak adlandırılır. Bu kapılar CMOS teknolojisinde doğrudan transistör seviyesinde daha az transistörle üretildikleri için fiziksel tasarımda sıklıkla tercih edilir.

\`\`\`verilog
module gates (
  input a, b,
  output c, d, e
);
  nand (c, a, b); // c = ~(a & b)
  nor  (d, a, b); // d = ~(a | b)
  xnor (e, a, b); // e = ~(a ^ b)
endmodule
\`\`\`

Verilog mantık primitifleri ikiden fazla girişi doğrudan destekler:
\`\`\`verilog
module multi_input_gates (
  input a, b, c, d,
  output x, y, z
);
  and (x, a, b, c, d); // 4 girişli AND: x = a & b & c & d
  or  (y, a, b, c, d); // 4 girişli OR:  y = a | b | c | d
  nor (z, a, b, c, d); // 4 girişli NOR: z = ~(a | b | c | d)
endmodule
\`\`\`
Primitif çağrısında ilk argüman çıkış (\`x\`, \`y\`, \`z\`), geriye kalan tüm argümanlar (\`a, b, c, d\`) ise giriş sinyallerini temsil eder.`,
      },
      {
        title: "4. Tampon ve Tersleyici: buf ve not Primitifleri",
        content: `\`buf\` ve \`not\` primitifleri tek bir skaler girişe ve bir veya birden fazla çıkışa sahiptir. \`buf\` sinyali polariteyi değiştirmeden iletirken (örneğin sinyal fan-out'unu artırmak veya gecikme eklemek için), \`not\` sinyalin mantıksal tersini alır.

Port Sözdizimi Kuralı:
\`buf\` ve \`not\` primitiflerinde son argüman DAİMA giriştir! Ondan önceki tüm argümanlar çıkış terminalleridir.
\`\`\`verilog
module gates (
  input a,
  output c, d
);
  buf (c, a);    // c çıkış, a giriş
  not (d, a);    // d çıkış, a giriş
endmodule

// Çoklu çıkışlı kullanım örneği:
module multi_out (
  input a,
  output c, d
);
  not (c, d, a); // c ve d çıkış, a giriştir!
endmodule
\`\`\`
Giriş \`a = 0\` olduğunda \`c = 1\` ve \`d = 1\` olur; \`a = 1\` olduğunda \`c = 0\` ve \`d = 0\` olur.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-gate-level-modeling.v - Örnek Donanım Modülü",
          snippet: `module gates (	input a, b, 
				output c, d, e);

	and (c, a, b); 	// c is the output, a and b are inputs
	or  (d, a, b);	// d is the output, a and b are inputs
	xor (e, a, b); 	// e is the output, a and b are inputs
endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-gate-level-modeling_tb.v - Simülasyon Testbench",
          snippet: `module tb;
	reg a, b;
	wire c, d, e;
	integer i;
	
	gates u0 ( .a(a), .b(b), .c(c), .d(d), .e(e));
	
	initial begin
		{a, b} = 0;
		
      $monitor ("[T=%0t a=%0b b=%0b c(and)=%0b d(or)=%0b e(xor)=%0b", $time, a, b, c, d, e);
		
		for (i = 0; i < 10; i = i+1) begin
			#1 	a <= $random;
				b <= $random;
		end
	end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module gates (	input a, b, 
				output c, d, e);

	and (c, a, b); 	// c is the output, a and b are inputs
	or  (d, a, b);	// d is the output, a and b are inputs
	xor (e, a, b); 	// e is the output, a and b are inputs
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-gate-level-examples": {
    id: "verilog-gate-level-examples",
    badge: "Bölüm 21 • Kapı Seviyesi Modelleme (Gate-Level)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 21: Kapı Seviyesi Modelleme (Gate-Level). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Kapı Seviyesi Modelleme ile Devre Tasarımına Giriş",
        content: `Temel mantık primitiflerini kullanarak pratik donanım devrelerinin modellenmesi, donanım mühendisinin sinyal ara bağlantılarını doğrudan kontrol etmesini sağlar. Davranışsal (behavioral) RTL modellemede sentez araçları mimariyi kapılara otomatik eşlerken, kapı seviyesinde modellemede mühendis hangi kapıların kullanılacağını ve ara bağlantı tellerini (\`wire\`) bizzat belirler. Bu yaklaşım özellikle ASIC standart hücre kütüphanesi (standard cell library) eşlemelerinde, netlist doğrulamasında ve mikro mimari optimizasyonlarında kritiktir.`,
      },
      {
        title: "2. Örnek 1: Kapı Seviyesinde 2x1 Çoklayıcı (Multiplexer)",
        content: `2x1 Çoklayıcı mantığı \`out = (a & sel) | (b & ~sel)\` şeklinde ifade edilir. Kapı seviyesinde bunu \`not\`, \`and\` ve \`or\` primitifleriyle kurmak için ara sinyaller \`wire\` olarak tanımlanmalıdır:

\`\`\`verilog
module mux_2x1 (
  input a, b, sel,
  output out
);
  wire sel_n;
  wire out_0, out_1;

  not (sel_n, sel);
  and (out_0, a, sel);
  and (out_1, b, sel_n);
  or  (out, out_0, out_1);
endmodule

module tb;
  reg a, b, sel;
  wire out;
  integer i;

  mux_2x1 u0 (
    .a(a), .b(b), .sel(sel), .out(out)
  );

  initial begin
    {a, b, sel} <= 0;
    $monitor("T=%0t a=%0b b=%0b sel=%0b out=%0b", $time, a, b, sel, out);
    for (i = 0; i < 10; i = i + 1) begin
      #1 a <= $random; b <= $random; sel <= $random;
    end
  end
endmodule
\`\`\`
Simülasyonda \`sel = 1\` iken \`out = a\` sinyalini, \`sel = 0\` iken \`out = b\` sinyalini çıkışa aktarır.`,
      },
      {
        title: "3. Örnek 2: Kapı Seviyesinde 1-Bit Tam Toplayıcı (Full Adder)",
        content: `1-bit Tam Toplayıcı (Full Adder) üç giriş (\`a\`, \`b\`, \`cin\`) ve iki çıkış (\`sum\`, \`cout\`) içerir. Mantıksal denklemler:
- \`sum = a ^ b ^ cin\`
- \`cout = (a & b) | ((a ^ b) & cin)\`

\`\`\`verilog
module fa (
  input a, b, cin,
  output sum, cout
);
  wire s1, net1, net2;

  xor (s1, a, b);
  and (net1, a, b);
  xor (sum, s1, cin);
  and (net2, s1, cin);
  or  (cout, net1, net2);
endmodule

module tb;
  reg a, b, cin;
  wire sum, cout;
  integer i;

  fa u0 (
    .a(a), .b(b), .cin(cin), .sum(sum), .cout(cout)
  );

  initial begin
    {a, b, cin} <= 0;
    $monitor("T=%0t a=%0b b=%0b cin=%0b cout=%0b sum=%0b", $time, a, b, cin, cout, sum);
    for (i = 0; i < 10; i = i + 1) begin
      #1 a <= $random; b <= $random; cin <= $random;
    end
  end
endmodule
\`\`\`
Doğrulama ortamında giriş kombinasyonları tarandığında aritmetik toplamın tam olarak sağlandığı gözlemlenir.`,
      },
      {
        title: "4. Örnek 3: Etkinleştirme Girişli 2x4 Kod Çözücü (Decoder)",
        content: `2x4 Kod çözücü (decoder), 2 bitlik adresi çözerek 4 çıkıştan birini aktif hale getirir. \`en\` (enable) girişi 0 olduğunda tüm çıkışlar 0 kalır.

\`\`\`verilog
module dec_2x4 (
  input x, y, en,
  output a, b, c, d
);
  wire x_n, y_n;

  not (x_n, x);
  not (y_n, y);

  and (a, x,   y,   en); // x=1, y=1 -> a=en
  and (b, x,   y_n, en); // x=1, y=0 -> b=en
  and (c, x_n, y,   en); // x=0, y=1 -> c=en
  and (d, x_n, y_n, en); // x=0, y=0 -> d=en
endmodule
\`\`\`
Bu kapı seviyesi tasarım bellek adresleme bloklarında satır ve sütun seçim mimarilerinin temelini oluşturur.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-gate-level-examples.v - Örnek Donanım Modülü",
          snippet: `module mux_2x1 ( input a, b, sel,
				 output out);
	wire sel_n;
	wire out_0;
	wire out_1;
	
	not (sel_n, sel);
	
	and (out_0, a, sel);
	and (out_1, b, sel_n);
	
	or (out, out_0, out_1);
endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-gate-level-examples_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg a, b, sel;
  wire out;
  integer i;
  
  mux_2x1 u0 ( 	.a(a), .b(b), .sel(sel), .out(out));
  
  initial begin
    {a, b, sel} <= 0;
    
    $monitor ("T=%0t a=%0b b=%0b sel=%0b out=%0b", $time, a, b, sel, out);
    
	for (int i = 0; i < 10; i = i+1) begin
    	#1 	a <= $random;
      		b <= $random;
			sel <= $random;
    end
  end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module mux_2x1 ( input a, b, sel,
				 output out);
	wire sel_n;
	wire out_0;
	wire out_1;
	
	not (sel_n, sel);
	
	and (out_0, a, sel);
	and (out_1, b, sel_n);
	
	or (out, out_0, out_1);
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-gate-delay": {
    id: "verilog-gate-delay",
    badge: "Bölüm 21 • Kapı Seviyesi Modelleme (Gate-Level)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Kapı Seviyesinde Yükselme, Düşme ve Kapanma Gecikmeleri",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 21: Kapı Seviyesi Modelleme (Gate-Level). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Donanımsal Yayılım Gecikmesi ve Kapı Gecikmeleri (Gate Delay)",
        content: `Sayısal mantık teorisinde sinyaller anlık olarak 0 ve 1 değerini alır gibi düşünülse de, fiziksel silisyum üzerinde transistörlerin parazitik kapasitansları şarj ve deşarj etmesi zaman alır. Bu süreye yayılım gecikmesi (propagation delay) denir. Verilog, simülasyon ortamında hem işlevsel doğrulamayı hem de zamansal davranışı modelleyebilmek için kapı primitiflerine gecikme değerleri (\`#\`) atamaya izin verir.`,
      },
      {
        title: "2. Neler Öğreneceksiniz: Gecikme Tipleri ve Sentez Davranışı",
        content: `Bu derste şunları öğreneceksiniz:
- Yükselme (rise), düşme (fall) ve kapanma (turn-off) gecikmeleri arasındaki farklar
- Primitiflerde 1, 2 veya 3 gecikme parametresi tanımlama kuralları
- \`min:typ:max\` gecikme üçlüleri ile PVT (Process, Voltage, Temperature) köşelerinin modellenmesi
- Kısa palslerin (glitch) atalet gecikmesi (inertial delay) nedeniyle elenmesi
- Sentez araçlarının neden tüm \`#\` gecikme ifadelerini göz ardı ettiği (ignore)`,
      },
      {
        title: "3. Yükselme, Düşme ve Kapanma Gecikmeleri (Rise, Fall, Turn-Off Delays)",
        content: `Fiziksel kapılarda PMOS yukarı çekme ağı (pull-up) ile NMOS aşağı çekme ağı (pull-down) farklı sürüş güçlerine sahiptir. Bu nedenle sinyalin 0'dan 1'e çıkma süresi ile 1'den 0'a inme süresi genellikle eşit değildir.

Verilog Gecikme Formatları:
1. **Tek Gecikme**: \`and #(2) g1 (out, in1, in2);\` -> Yükselme, düşme ve turn-off gecikmelerinin tümü 2 zaman birimidir.
2. **İki Gecikme**: \`and #(2, 3) g1 (out, in1, in2);\` -> Yükselme gecikmesi 2, düşme gecikmesi 3 zaman birimidir.
3. **Üç Gecikme**: \`bufif1 #(2, 3, 4) g1 (out, in, ctrl);\` -> Yükselme = 2, Düşme = 3, Turn-off (0 veya 1'den z'ye geçiş) = 4 zaman birimidir.
4. **Belirsizlik (x) Durumu**: Çıkış \`x\` değerine geçerken tanımlı gecikmelerin en küçüğü kullanılır (en kötü senaryonun en erken tespiti kuralı).

**ÖNEMLİ (Sentez Kuralı)**:
RTL sentez araçları (Design Compiler, Vivado vb.) kod içindeki \`#\` gecikmelerini tamamen yoksayar (ignore eder). Gerçek donanım gecikmeleri hedef kütüphaneden ve yerleşim-yönlendirme (Place & Route) sonrası parazitik çıkartımlardan (SDF dosyası) gelir.`,
      },
      {
        title: "4. Gerçek Zamanlamalı Kapı Seviyesi Simülasyon (Gate-Level Simulation - GLS)",
        content: `Fiziksel yerleşim ve yönlendirme (P&R) tamamlandıktan sonra statik zamanlama analizi (STA) araçları her bir hücre ve metal hattın gerçek gecikmelerini hesaplayarak Standard Delay Format (SDF) dosyasına yazar. Doğrulama mühendisleri bu SDF dosyasını kapı seviyesi simülasyona yükler (\`$sdf_annotate\`). Böylece sıfır gecikmeli (zero-delay) RTL simülasyonlarında yakalanamayan reset senkronizasyon hataları, asenkron hatlardaki glitch'ler ve setup/hold ihlalleri silisyuma gitmeden önce tespit edilir.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Kapı Seviyesinde Yükselme, Düşme ve Kapanma Gecikmeleri** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-gate-delay.v - Örnek Donanım Modülü",
          snippet: `// Single delay specified - used for all three types of transition delays
or #(<delay>) o1 (out, a, b);

// Two delays specified - used for Rise and Fall transitions
or #(<rise>, <fall>) o1 (out, a, b);

// Three delays specified - used for Rise, Fall and Turn-off transitions
or #(<rise>, <fall>, <turn_off>) o1 (out, a, b);`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-gate-delay_tb.v - Simülasyon Testbench",
          snippet: `module des (  input  a, b,
              output out1, out2);

  // AND gate has 2 time unit gate delay
  and    #(2) o1 (out1, a, b);

  // BUFIF0 gate has 3 time unit gate delay
  bufif0 #(3) b1 (out2, a, b);

endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// Single delay specified - used for all three types of transition delays
or #(<delay>) o1 (out, a, b);

// Two delays specified - used for Rise and Fall transitions
or #(<rise>, <fall>) o1 (out, a, b);

// Three delays specified - used for Rise, Fall and Turn-off transitions
or #(<rise>, <fall>, <turn_off>) o1 (out, a, b);`,
      language: "verilog",
    },
    quiz: {
      question: "Kapı Seviyesinde Yükselme, Düşme ve Kapanma Gecikmeleri ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-switch-level-modeling": {
    id: "verilog-switch-level-modeling",
    badge: "Bölüm 21 • Kapı Seviyesi Modelleme (Gate-Level)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Switch Level Modeling",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 21: Kapı Seviyesi Modelleme (Gate-Level). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Transistör ve Anahtar Seviyesi Modelleme (Switch-Level Modeling)",
        content: `Verilog, kapı seviyesinin de altına inerek doğrudan MOS transistör seviyesinde modelleme yapmayı sağlayan anahtar seviyesi (switch-level) primitiflerini destekler. Günümüzde dijital tasarımlar ağırlıklı olarak RTL seviyesinde yapılsa da; özel bellek hücreleri (SRAM bitcell), çift yönlü veri yolları ve iletim kapıları (transmission gates) için switch-level primitifler dil standardında tanımlıdır.`,
      },
      {
        title: "2. NMOS ve PMOS Anahtarları: nmos ve pmos Primitifleri",
        content: `\`nmos\` ve \`pmos\` primitifleri ideal MOS transistörleri modeller:
- \`nmos (out, data, control);\`: \`control = 1\` olduğunda anahtar iletir (\`out = data\`), \`control = 0\` olduğunda çıkış yüksek empedans (\`z\`) durumuna geçer.
- \`pmos (out, data, control);\`: \`control = 0\` olduğunda anahtar iletir (\`out = data\`), \`control = 1\` olduğunda çıkış \`z\` olur.

\`\`\`verilog
module des (input d, ctrl, output outn, outp);
  nmos (outn, d, ctrl);
  pmos (outp, d, ctrl);
endmodule

module tb;
  reg d, ctrl;
  wire outn, outp;
  des u0 (.d(d), .ctrl(ctrl), .outn(outn), .outp(outp));
  initial begin
    {d, ctrl} <= 0;
    $monitor ("T=%0t d=%0b ctrl=%0b outn=%0b outp=%0b", $time, d, ctrl, outn, outp);
    #10 d <= 1;
    #10 ctrl <= 1;
    #10 ctrl <= 0;
    #10 d <= 0;
  end
endmodule
\`\`\`
Simülasyon çıktısında \`ctrl=1\` iken \`outn\` değeri sürülürken \`outp\` z durumuna geçer; \`ctrl=0\` iken tersi gerçekleşir.`,
      },
      {
        title: "3. CMOS İletim Kapısı: cmos Primitifi",
        content: `CMOS iletim kapısı (transmission gate), paralel bağlı bir NMOS ve bir PMOS transistöründen oluşur ve \`cmos\` primitifi ile modellenir:
\`cmos (out, data, nctrl, pctrl);\`

Burada \`nctrl\` NMOS kapısını, \`pctrl\` PMOS kapısını kontrol eder. Her iki transistör de iletimde olduğunda (\`nctrl=1\` ve \`pctrl=0\`), \`data\` girişi tam mantık seviyesiyle (rail-to-rail) çıkışa iletilir. İkisi de kesimde olduğunda çıkış \`z\` olur.

\`\`\`verilog
module des (input d, nctrl, pctrl, output out);
  cmos (out, d, nctrl, pctrl);
endmodule
\`\`\``,
      },
      {
        title: "4. Çift Yönlü İletim Anahtarı: tran Primitifi",
        content: `\`tran\`, iki yönlü (bidirectional) iletken bir anahtarı modeller. Sinyal yönü sabit değildir; iki uç (\`io1\` ve \`io2\`) arasında çift yönlü yük akışına izin verir.
Sözdizimi: \`tran (io1, io2);\`

Kontrollü versiyonları \`tranif1 (io1, io2, ctrl);\` ve \`tranif0 (io1, io2, ctrl);\` şeklindedir. Özellikle I2C, SPI çift yönlü veri hatları veya bellek veri yolları gibi hatların simülasyonunda kullanılır.

\`\`\`verilog
module des (input io1, ctrl, output io2);
  tran (io1, io2);
endmodule
\`\`\``,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Switch Level Modeling** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-switch-level-modeling.v - Örnek Donanım Modülü",
          snippet: `module des (input d, ctrl,
			output outn, outp);
			
  nmos (outn, d, ctrl);
  pmos (outp, d, ctrl);
endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-switch-level-modeling_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg d, ctrl;
  wire outn, outp;
  
  des u0 (.d(d), .ctrl(ctrl), .outn(outn), .outp(outp));
  
  initial begin
    {d, ctrl} <= 0;
    
    $monitor ("T=%0t d=%0b ctrl=%0b outn=%0b outp=%0b", $time, d, ctrl, outn, outp);
    
    #10 d <= 1;
    #10 ctrl <= 1;
    #10 ctrl <= 0;
    #10 d <= 0;
  end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module des (input d, ctrl,
			output outn, outp);
			
  nmos (outn, d, ctrl);
  pmos (outp, d, ctrl);
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Switch Level Modeling ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-delay-control": {
    id: "verilog-delay-control",
    badge: "Bölüm 22 • Zamanlama Kontrolü, Gecikmeler & Timescale",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Verilog Delay Control",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 22: Zamanlama Kontrolü, Gecikmeler & Timescale. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Verilog Zamanlama Denetimleri: Gecikme ve Olay Kontrolleri",
        content: `Verilog'da simülasyon zamanının ilerlemesini denetleyen iki temel mekanizma vardır:
1. **Gecikme Denetimi (Delay Control - \`#\`)**: İfadenin işletilmesini belirli bir simülasyon zaman birimi kadar öteler.
2. **Olay Denetimi (Event Control - \`@\`)**: İfadenin yürütülmesini belirli bir sinyaldeki değer değişimine (örtük olay) veya tetiklenen isimlendirilmiş bir olaya (named event) kadar askıya alır.

Simülasyon zamanı bu gecikmeler veya iç gecikmeye sahip kapı/hat modelleri üzerinden ilerler.`,
      },
      {
        title: "2. Gecikme Denetimi Kuralları (Delay Control Semantics)",
        content: `- Eğer gecikme ifadesi (\`#expr\`) \`x\` (belirsiz) veya \`z\` (yüksek empedans) değerine çözümlenirse, simülatör bunu 0 gecikme (zero delay) olarak yorumlar.
- Eğer gecikme ifadesi negatif bir sayıya çözümlenirse, 2'ye tümleyen (two's complement) işaretsiz tamsayı olarak ele alınır ve çok büyük bir pozitif zamana dönüşür. Bu nedenle gecikme ifadelerinin negatif olmamasına dikkat edilmelidir.`,
      },
      {
        title: "3. Örtük Olay Denetimi: posedge, negedge ve Seviye Değişimleri",
        content: `Bir sinyaldeki değişim örtük (implicit) bir olay oluşturur:
- \`posedge\`: Mantıksal 1'e geçiş (0 -> 1, 0 -> X/Z, X/Z -> 1).
- \`negedge\`: Mantıksal 0'a geçiş (1 -> 0, 1 -> X/Z, X/Z -> 0).
- Aynı durumdan aynı duruma geçişler (örn. 1 -> 1) kenar olayı sayılmaz.
- Vektör sinyallerde \`posedge\` veya \`negedge\` tespiti yalnızca sinyalin en önemsiz biti (LSB) üzerinde yapılır.

\`\`\`verilog
module tb;
  reg a, b;
  initial begin
    a <= 0;
    #10 a <= 1;
    #10 b <= 1;
    #10 a <= 0;
    #15 a <= 1;
  end

  initial begin
    @(posedge a);
    $display ("T=%0t a için 0->1 yükselen kenar algılandı", $time);
    @(posedge b);
    $display ("T=%0t b için X->1 yükselen kenar algılandı", $time);
  end
endmodule
\`\`\``,
      },
      {
        title: "4. İsimlendirilmiş Olaylar (Named Events: event, -> ve @)",
        content: `\`event\` anahtar sözcüğü ile kullanıcı tanımlı bir olay bildirilebilir. Bu olaylar veri taşımaz, hafıza tutmaz ve sürekliliği yoktur; yalnızca anlık bir tetikleme darbesidir.
- Tetikleme: \`-> event_name;\`
- Bekleme: \`@(event_name);\`

Eşzamanlı yürütülen iki ayrı prosedürel bloğun (\`always\` veya \`initial\`) senkronizasyonunda kullanılır:
\`\`\`verilog
module tb;
  event a_event;
  event b_event[5]; // Olay dizisi

  initial begin
    #20 -> a_event;
    #30 -> a_event;
    #50 -> a_event;
    #10 -> b_event[3];
  end

  always @ (a_event)
    $display ("T=%0t [always] a_event tetiklendi", $time);

  initial begin
    #25;
    @(a_event) $display ("T=%0t [initial] a_event yakalandı", $time);
    #10 @(b_event[3]) $display ("T=%0t [initial] b_event[3] yakalandı", $time);
  end
endmodule
\`\`\``,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Delay Control** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-delay-control.v - Örnek Donanım Modülü",
          snippet: `\`timescale 1ns/1ps

module tb;
  reg [3:0] a, b;
  
  initial begin
    {a, b} <= 0;
    $display ("T=%0t a=%0d b=%0d", $realtime, a, b);
    
    #10;
    a <= $random;
    $display ("T=%0t a=%0d b=%0d", $realtime, a, b);
    
    #10 b <= $random;
    $display ("T=%0t a=%0d b=%0d", $realtime, a, b);
    
    #(a) $display ("T=%0t After a delay of a=%0d units", $realtime, a);
    #(a+b) $display ("T=%0t After a delay of a=%0d + b=%0d = %0d units", $realtime, a, b, a+b);
    #((a+b)*10ps) $display ("T=%0t After a delay of %0d * 10ps", $realtime, a+b);
    
    #(b-a) $display ("T=%0t Expr evaluates to a negative delay", $realtime);
    #('h10) $display ("T=%0t Delay in hex", $realtime);
    
    a = 'hX;
    #(a) $display ("T=%0t Delay is unknown, taken as zero a=%h", $realtime, a);
    
    a = 'hZ;
    #(a) $display ("T=%0t Delay is in high impedance, taken as zero a=%h", $realtime, a);
    
    #1ps $display ("T=%0t Delay of 1ps", $realtime);
  end
  
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-delay-control_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg a, b;

  initial begin
    a <= 0;
    
    #10 a <= 1;
    #10 b <= 1;

    #10 a <= 0;
    #15 a <= 1; 
  end

  // Start another procedural block that waits for an update to
  // signals made in the above procedural block
  
  initial begin 
    @(posedge a); 
    $display ("T=%0t Posedge of a detected for 0->1", $time); 
    @(posedge b); 
    $display ("T=%0t Posedge of b detected for X->1", $time);
  end 
  
  initial begin
    @(posedge (a + b)) $display ("T=%0t Posedge of a+b", $time);

    @(a) $display ("T=%0t Change in a found", $time);
  end
endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-delay-control_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg a, b;

  initial begin
    a <= 0;
    
    #10 a <= 1;
    #10 b <= 1;

    #10 a <= 0;
    #15 a <= 1; 
  end

  // Start another procedural block that waits for an update to
  // signals made in the above procedural block
  
  initial begin 
    @(posedge a); 
    $display ("T=%0t Posedge of a detected for 0->1", $time); 
    @(posedge b); 
    $display ("T=%0t Posedge of b detected for X->1", $time);
  end 
  
  initial begin
    @(posedge (a + b)) $display ("T=%0t Posedge of a+b", $time);

    @(a) $display ("T=%0t Change in a found", $time);
  end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `\`timescale 1ns/1ps

module tb;
  reg [3:0] a, b;
  
  initial begin
    {a, b} <= 0;
    $display ("T=%0t a=%0d b=%0d", $realtime, a, b);
    
    #10;
    a <= $random;
    $display ("T=%0t a=%0d b=%0d", $realtime, a, b);
    
    #10 b <= $random;
    $display ("T=%0t a=%0d b=%0d", $realtime, a, b);
    
    #(a) $display ("T=%0t After a delay of a=%0d units", $realtime, a);
    #(a+b) $display ("T=%0t After a delay of a=%0d + b=%0d = %0d units", $realtime, a, b, a+b);
    #((a+b)*10ps) $display ("T=%0t After a delay of %0d * 10ps", $realtime, a+b);
    
    #(b-a) $display ("T=%0t Expr evaluates to a negative delay", $realtime);
    #('h10) $display ("T=%0t Delay in hex", $realtime);
    
    a = 'hX;
    #(a) $display ("T=%0t Delay is unknown, taken as zero a=%h", $realtime, a);
    
    a = 'hZ;
    #(a) $display ("T=%0t Delay is in high impedance, taken as zero a=%h", $realtime, a);
    
    #1ps $display ("T=%0t Delay of 1ps", $realtime);
  end
  
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Delay Control ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-inter-and-intra-assignment-delay": {
    id: "verilog-inter-and-intra-assignment-delay",
    badge: "Bölüm 22 • Zamanlama Kontrolü, Gecikmeler & Timescale",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Verilog Inter and Intra Assignment Delay",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 22: Zamanlama Kontrolü, Gecikmeler & Timescale. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste Verilog atama gecikmelerini (Inter-Assignment ve Intra-Assignment Delays) teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- Atama operatörünün solunda (\`#delay a = b\`) ve sağında (\`a = #delay b\`) tanımlanan gecikmelerin çalışma mekanizmaları
- Sağ tarafın (RHS) hesaplanma zamanı ile sol tarafa (LHS) yazılma zamanı arasındaki farklar
- Bloklayan (\`=\`) ve bloklamayan (\`<=\`) atamalarla gecikme kombinasyonlarının dalga biçimi üzerindeki etkileri
- Sentezlenebilir RTL kuralları ve simülasyondaki yarış durumlarını (race condition) önleme yöntemleri`,
      },
      {
        title: "2. Atama Gecikmesi Türleri ve Çalışma Mantığı",
        content: `Verilog gecikme ifadelerinde gecikme parametresi atama operatörünün sol tarafına ya da sağ tarafına yerleştirilebilir:
- **Inter-assignment Delay**: \`#<delay> <LHS> = <RHS>;\` (Gecikme sol tarafta)
- **Intra-assignment Delay**: \`<LHS> = #<delay> <RHS>;\` veya \`<LHS> <= #<delay> <RHS>;\` (Gecikme sağ tarafta)

Bu iki yaklaşım, sinyallerin ne zaman örneklendiği (sampling) ve çıkışa ne zaman aktarıldığı konusunda temelden farklıdır.`,
      },
      {
        title: "3. İşlem Öncesi Gecikme (Inter-assignment Delay)",
        content: `İşlem öncesi gecikmede (Inter-assignment Delay), gecikme atama operatörünün solundadır. İfadenin kendisi ancak gecikme süresi dolduktan sonra yürütülür:
\`\`\`verilog
#<delay> <LHS> = <RHS>;
\`\`\`

\`\`\`verilog
module tb;
  reg a, b, c, q;
  initial begin
    $monitor("[%0t] a=%0b b=%0b c=%0b q=%0b", $time, a, b, c, q);
    a <= 0; b <= 0; c <= 0; q <= 0;

    // 5 zaman birimi bekle, sonra a ve c sinyallerine 1 ata
    #5 a <= 1; c <= 1;

    // 5 zaman birimi daha bekle, sonra o anki RHS değerini q'ya ata
    #5 q <= a & b | c;
    #20;
  end
endmodule
\`\`\`
Burada t=10 anında \`a & b | c\` hesaplanır ve 1 sonucu elde edilir. Testbench'lerde adım adım uyarıcı üretmek için en sık kullanılan yöntemdir.`,
      },
      {
        title: "4. Değer Yakalama Sonrası Gecikme (Intra-assignment Delay)",
        content: `Intra-assignment gecikmede gecikme atama operatörünün sağındadır. İfadeye gelindiği an (\`t=current\`) sağ taraftaki (\`RHS\`) tüm sinyallerin değerleri derhal yakalanır (örneklenir). Ardından belirtilen gecikme kadar beklenir ve bu sürenin sonunda yakalanan değer sol tarafa (\`LHS\`) atanır:
\`\`\`verilog
<LHS> = #<delay> <RHS>;
// veya bloklamayan atamayla:
<LHS> <= #<delay> <RHS>;
\`\`\`

\`\`\`verilog
module tb;
  reg a, b, c, q;
  initial begin
    $monitor("[%0t] a=%0b b=%0b c=%0b q=%0b", $time, a, b, c, q);
    a = 0; b = 0; c = 0; q = 0;
    #5 a = 1; c = 1;
    q <= #5 (a & b | c); // a ve c o an 1'dir; yakalanır ve 5 birim sonra (t=10) q'ya aktarılır
    #20;
  end
endmodule
\`\`\`
Bu yapı donanım flip-flop'larındaki çıkış gecikmelerini (clock-to-Q delay) testbench seviyesinde gerçekçi şekilde modellemek için kullanılır.`,
      },
      {
        title: "5. Örnek Verilog RTL & Doğrulama Kodu Analizi",
        content: `Sayısal donanım tasarımında sentez araçları hem inter hem de intra gecikme ifadelerini yoksayar. Gerçek donanım sentezinde zamanlama kütüphanelerden gelir. Ancak doğrulama mühendisliğinde intra-assignment bloklamayan atamalar (\`q <= #5 d;\`), testbench saat kenarı ile veri değişimleri arasındaki yarış durumlarını (race conditions) ortadan kaldırmak için kritik bir tekniktir.`,
      },
{
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Inter and Intra Assignment Delay** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-inter-and-intra-assignment-delay.v - Örnek Donanım Modülü",
          snippet: `// Delay is specified on the left side
	#<delay> <LHS> = <RHS>`,
        },
      },
{
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-inter-and-intra-assignment-delay_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg  a, b, c, q;
  
  initial begin
    $monitor("[%0t] a=%0b b=%0b c=%0b q=%0b", $time, a, b, c, q);
    
    // Initialize all signals to 0 at time 0
    a <= 0;
    b <= 0;
    c <= 0;
    q <= 0;
    
    // Inter-assignment delay: Wait for #5 time units
    // and then assign a and c to 1. Note that 'a' and 'c'
    // gets updated at the end of current timestep
    #5  a <= 1;
    	c <= 1;
    
    // Inter-assignment delay: Wait for #5 time units
    // and then assign 'q' with whatever value RHS gets
    // evaluated to
    #5 q <= a & b | c;

    #20;
  end
  
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// Delay is specified on the left side
	#<delay> <LHS> = <RHS>`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Inter and Intra Assignment Delay ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-timescale": {
    id: "verilog-timescale",
    badge: "Bölüm 22 • Zamanlama Kontrolü, Gecikmeler & Timescale",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "\`timescale Direktifi: Zaman Birimi ve Hassasiyet Ayarı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 22: Zamanlama Kontrolü, Gecikmeler & Timescale. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Simülasyon Zaman Birimi ve Hassasiyeti (\`timescale Direktifi)",
        content: `Verilog simülasyonlarında \`#1\`, \`#5\` veya \`#10\` gibi gecikme ifadelerinin gerçek zaman karşılığı \`\` \`timescale \`\` derleyici direktifi ile belirlenir.

Sözdizimi:
\`\`\`verilog
\`timescale <time_unit> / <time_precision>
\`\`\`
- **time_unit (Zaman Birimi)**: \`#1\` gecikmesinin temsil ettiği süredir (örn. \`1ns\`, \`10ps\`).
- **time_precision (Zaman Hassasiyeti)**: Simülatörün zamanı takip ettiği en küçük duyarlılık adımı ve yuvarlama tabanıdır.
- **Kural**: \`time_precision\` değeri daima \`time_unit\` değerine eşit veya ondan küçük olmalıdır.

Geçerli birimler: \`s\` (saniye), \`ms\` (milisaniye), \`us\` (mikrosaniye), \`ns\` (nanosaniye), \`ps\` (pikosaniye), \`fs\` (femtosecond). Çarpanlar yalnızca 1, 10 veya 100 olabilir.`,
      },
      {
        title: "2. Örnek 1: \`timescale 1ns/1ns ile Yuvarlama Davranışı",
        content: `\`\`\`verilog
\`timescale 1ns / 1ns

module tb;
  reg clk;
  initial begin
    clk = 0;
    forever #2.4 clk = ~clk;
  end
endmodule
\`\`\`
Burada zaman birimi 1ns, hassasiyet 1ns'dir. \`#2.4\` gecikmesi verildiğinde, simülatörün hassasiyeti 1ns olduğundan 2.4 değeri en yakın tamsayı olan 2ns'ye yuvarlanır. Saat sinyali 2.4ns yerine 2ns periyot yarılanmasıyla çalışır.`,
      },
      {
        title: "3. Örnek 2: \`timescale 10ns/1ns ile Boyutlandırma ve Hassasiyet",
        content: `\`\`\`verilog
\`timescale 10ns / 1ns

module tb;
  reg clk;
  initial begin
    clk = 0;
    forever #1.5 clk = ~clk;
  end
endmodule
\`\`\`
Bu örnekte zaman birimi 10ns ve hassasiyet 1ns'dir:
- \`#1.5\` gecikmesi: \`1.5 * 10ns = 15ns\` gecikme anlamına gelir.
- Hassasiyet 1ns olduğundan 15ns tam olarak temsil edilir ve hiçbir yuvarlama hatası oluşmaz.
- Hassasiyet ne kadar küçük seçilirse (örn. \`1ps\` veya \`1fs\`), simülatörün zaman kuyruğu hesaplama yükü o kadar artar ve simülasyon yavaşlar.`,
      }

    ],
    playground: {
      initialCode: `\`timescale <time_unit>/<time_precision>

// Example
\`timescale 1ns/1ps
\`timescale 10us/100ns
\`timescale 10ns/1ns`,
      language: "verilog",
    },
    quiz: {
      question: "\`timescale Direktifi: Zaman Birimi ve Hassasiyet Ayarı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-timescale-scope": {
    id: "verilog-timescale-scope",
    badge: "Bölüm 22 • Zamanlama Kontrolü, Gecikmeler & Timescale",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Verilog Timescale Scope",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 22: Zamanlama Kontrolü, Gecikmeler & Timescale. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Varsayılan Zaman Ölçeği ve $printtimescale Görevi",
        content: `Bir Verilog modülünden önce \`\` \`timescale \`\` tanımlanmamışsa simülasyon aracı varsayılan bir zaman ölçeği atar (genellikle 1ns/1ns). Bir modülün veya hiyerarşik kapsamın geçerli zaman ölçeğini öğrenmek için \`$printtimescale\` sistem görevi kullanılır:

\`\`\`verilog
module tb;
  initial begin
    $printtimescale(tb);
  end
endmodule
\`\`\`
Konsol çıktısı: \`Time scale of (tb) is 1ns / 1ns\`.`,
      },
      {
        title: "2. Dosyalar Arası \`timescale Kapsam Kuralları",
        content: `Verilog'da \`\` \`timescale \`\` dosya bazlı değil, derleme akışı (compilation order) bazlıdır! Bir kaynak dosyada belirtilen \`\` \`timescale \`\`, derleyici başka bir \`\` \`timescale \`\` görene kadar kendisinden sonra derlenen tüm modüllerde geçerliliğini sürdürür. Bu durum farklı ekiplerin veya IP sağlayıcılarının modülleri birleştirildiğinde beklenmedik zamanlama sapmalarına neden olabilir.`,
      },
      {
        title: "3. Çok Dosyalı Projelerde ve \`include Kullanımında En İyi Pratikler",
        content: `Zaman ölçeği uyumsuzluklarını önlemek için:
1. Her bağımsız Verilog dosyasının en başına açıkça \`\` \`timescale \`\` direktifi eklenmelidir.
2. Simülatör derleme komutunda küresel bir varsayılan belirlenmelidir (örn. \`-timescale=1ns/1ps\`).
3. Dosya eklemelerinde (\`\` \`include \`\`) dahil edilen dosyanın zaman ölçeğini değiştirmemesine özen gösterilmelidir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Timescale Scope** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-timescale-scope.v - Örnek Donanım Modülü",
          snippet: `module tb;
	initial begin
		// Print timescale of this module
		$printtimescale(tb);
		// $printtimescale($root);
	end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module tb;
	initial begin
		// Print timescale of this module
		$printtimescale(tb);
		// $printtimescale($root);
	end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Timescale Scope ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-timeformat": {
    id: "verilog-timeformat",
    badge: "Bölüm 22 • Zamanlama Kontrolü, Gecikmeler & Timescale",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Verilog Timeformat",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 22: Zamanlama Kontrolü, Gecikmeler & Timescale. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Zaman Çıktı Formatlama: $timeformat Sistem Görevi",
        content: `Verilog \`\` \`timescale \`\` direktifi simülasyon birim ve hassasiyetini belirlerken; \`$timeformat\` sistem görevi, \`$display\`, \`$monitor\` ve \`$strobe\` komutlarındaki \`%t\` format belirtecinin zamanı nasıl yazdıracağını küresel olarak biçimlendirir.`,
      },
      {
        title: "2. $timeformat Sözdizimi ve Parametreleri",
        content: `Sözdizimi:
\`\`\`verilog
$timeformat(<unit_number>, <precision>, <suffix_string>, <min_field_width>);
\`\`\`
- \`unit_number\`: Zaman biriminin üssü (0: 1s, -3: 1ms, -6: 1us, -9: 1ns, -12: 1ps, -15: 1fs).
- \`precision\`: Ondalık noktadan sonra gösterilecek basamak sayısı.
- \`suffix_string\`: Değerin yanına eklenecek birim etiketi (örn. \`" ns"\`, \`" ps"\`).
- \`min_field_width\`: Çıktının minimum karakter genişliği (hizalama boşlukları ekler).`,
      },
      {
        title: "3. Örnek 1: $timeformat ile 1ns / 1ps Çıktı Biçimlendirme",
        content: `\`\`\`verilog
\`timescale 1ns / 1ps

module tb;
  initial begin
    $timeformat(-9, 2, " ns", 10);
    #10.555;
    $display("[%t] Simülasyon zamanı", $realtime);
  end
endmodule
\`\`\`
Bu komut sayesinde zaman çıktıları standart mühendislik formatında (örn. \`  10.56 ns\`) hizalı ve okunaklı biçimde günlüklere (log) basılır.`,
      },
      {
        title: "4. Örnek 2: Testbench Günlüklerinde Birim Standardizasyonu",
        content: `Farklı modüllerin farklı \`timescale\` direktiflerine sahip olduğu karmaşık SoC tasarımlarında, en üst düzey testbench'in başında tek bir \`$timeformat\` çağrısı yapmak tüm log dosyalarında tek tip bir zaman gösterimi (örneğin nanosecond cinsinden) sağlar ve dalga biçimi incelemelerinde karışıklığı önler.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Timeformat** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-timeformat.v - Örnek Donanım Modülü",
          snippet: `$timeformat(<unit_number>, <precision>, <suffix_string>, <minimum field width>);`,
        },
      }

    ],
    playground: {
      initialCode: `$timeformat(<unit_number>, <precision>, <suffix_string>, <minimum field width>);`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Timeformat ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-testbench": {
    id: "verilog-testbench",
    badge: "Bölüm 23 • Testbench & Temel Simülasyon",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Testbench Mimarisi ve DUT Sinyal Sürme",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 23: Testbench & Temel Simülasyon. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Verilog Testbench Nedir ve Neden Gereklidir?",
        content: `Verilog Testbench, donanım tanım diliyle (HDL) yazılmış bir sayısal tasarımın (RTL) işlevsel doğruluğunu ve zamanlama davranışını doğrulamak için kurulan simülasyon ortamıdır.
Testbench'in temel amacı; entegre devre fiziksel olarak silisyumda üretilmeden (tapeout) veya FPGA'ya yüklenmeden önce tüm çalışma koşullarını, köşe durumları (corner cases) ve giriş senaryolarını test etmektir. Fiziksel prototipleme aylar süren maliyetli bir süreç olduğundan, tasarım hatalarının simülasyon aşamasında yakalanması çip tasarımının en kritik adımıdır.`,
      },
      {
        title: "2. Testbench Mimarisinin Temel Bileşenleri",
        content: `Modern bir testbench aşağıdaki temel bileşenlerden oluşur:
1. **DUT (Design Under Test / Tasarım Modülü)**: Test edilecek asıl donanım modülü (örn. sayaç, ALU, FIFO, mikroişlemci çekirdeği).
2. **Top-Level TB Modülü**: Giriş ve çıkış portu bulunmayan, tüm test altyapısını kapsayan en üst düzey modül.
3. **Uyarıcı Üreteci (Stimulus Generator)**: DUT girişlerini besleyen saat (clock), reset ve kontrol sinyalleri. Prosedürel bloklar (\`initial\`, \`always\`), görevler (\`task\`) ve fonksiyonlar (\`function\`) ile kurgulanır.
4. **DUT Örneklemesi (Instantiation)**: DUT portlarının testbench sinyallerine (\`reg\` ve \`wire\`) bağlanması.
5. **Yanıt Denetleyici (Response Checker)**: DUT çıkışlarını beklenen referans değerlerle karşılaştıran ve uyumsuzluk durumunda hata (\`$error\`, \`$display\`) üreten mantık.

**ÖNEMLİ NOT**: Testbench kodları sentezlenmez (non-synthesizable). Bu nedenle \`initial\`, \`#delay\`, \`$display\`, \`$random\` gibi sentez araçlarının kabul etmediği zengin dil özellikleri doğrulama amacıyla serbestçe kullanılır.`,
      },
      {
        title: "3. Adım Adım Kapsamlı Testbench Geliştirme Örneği",
        content: `Aşağıda asenkron resetli bir D-Latch için adım adım testbench geliştirme adımları gösterilmiştir:

\`\`\`verilog
// DUT Modülü
module d_latch (
  input d, en, rstn,
  output reg q
);
  always @ (en or rstn or d) begin
    if (!rstn)
      q <= 0;
    else if (en)
      q <= d;
  end
endmodule

// Testbench Modülü
module tb_latch;
  // 1. Sinyal Tanımlamaları: DUT girişlerine 'reg', çıkışlarına 'wire'
  reg d, en, rstn;
  wire q;
  reg prev_q;
  integer i;

  // 2. DUT Örneklemesi
  d_latch dut (
    .d(d), .en(en), .rstn(rstn), .q(q)
  );

  // 3. Başlangıç Değerleri ve Uyarıcı Üretimi
  initial begin
    d = 0; en = 0; rstn = 0;
    #10 rstn = 1; // Reset bırakıldı

    // 4. Rastgele Uyarıcı ve Denetim Döngüsü
    for (i = 0; i < 5; i = i + 1) begin
      #5 en <= ~en;
      #5 d <= $random;
      #1 check_output(d, en, rstn, q);
      prev_q <= q;
    end
    #20 $finish;
  end

  // 5. Doğrulama Görevi (Checker Task)
  task check_output(input td, ten, trstn, tq);
    if (!trstn && tq !== 0)
      $error("HATA: Reset durumunda Q sıfırlanmadı!");
    else if (trstn && ten && (tq !== td))
      $error("HATA: Latch açıkken Q, D girişini takip etmedi!");
  endtask
endmodule
\`\`\``,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Testbench Mimarisi ve DUT Sinyal Sürme** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-testbench.v - Örnek Donanım Modülü",
          snippet: `module d_latch (  input d,           
                  input en,          
                  input rstn,        
                  output reg q);     
 
   always @ (en or rstn or d) begin
      if (!rstn) begin
         q <= 0;
      end else begin
         if (en) begin
            q <= d;
		 end
	  end
   end 
endmodule`,
        },
      },
{
        title: "5. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-testbench_tb.v - Simülasyon Testbench",
          snippet: `// Note that top level testbench module does not need any IO ports and 
// hence can be empty and is usually called "tb" or "tb_top", but it can be 
// named anything.

module tb_latch;

	// All testbench code goes inside this module

endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module d_latch (  input d,           
                  input en,          
                  input rstn,        
                  output reg q);     
 
   always @ (en or rstn or d) begin
      if (!rstn) begin
         q <= 0;
      end else begin
         if (en) begin
            q <= d;
		 end
	  end
   end 
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Testbench Mimarisi ve DUT Sinyal Sürme ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-testbench-simulation": {
    id: "verilog-testbench-simulation",
    badge: "Bölüm 23 • Testbench & Temel Simülasyon",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Testbench Mimarisi ve DUT Sinyal Sürme",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 23: Testbench & Temel Simülasyon. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Simülasyon Kavramı ve Ayrık Olay Yürütme Modeli",
        content: `Verilog bir donanım tanımlama dilidir ve RTL kodunun sentezlenip kapılara dönüştürülmesi için simülasyon zorunlu değildir. Ancak simülasyon olmadan tasarımın istenen spesifikasyonları karşılayıp karşılamadığını bilmek imkansızdır. Simülasyon, donanıma farklı zamanlarda uyarıcı sinyaller uygulayarak çıkış yanıtlarını inceleme sürecidir.

Verilog, ayrık olay yürütme modeline (discrete event execution model) dayanır. Simülatör tüm kod bloklarını (\`always\`, \`initial\`, \`assign\`) eşzamanlı çalışan iş parçacıkları olarak değerlendirir ve bunları olay kuyruğuna (event queue) göre planlar.`,
      },
      {
        title: "2. Temel Testbench ve Simülasyon Çalıştırma Örneği",
        content: `Saat ve uyarıcı sinyal üretimini gösteren temel bir testbench örneği:

\`\`\`verilog
module tb;
  reg clk;
  reg sig;

  // Saat Üretimi: Her 5ns'de terslenir (10ns periyot -> 100MHz)
  always #5 clk = ~clk;

  initial begin
    clk = 0;
    sig = 0;
    $monitor("T=%0t | clk=%0b | sig=%0b", $time, clk, sig);

    #15 sig = 1;
    #20 sig = 0;
    #15 sig = 1;
    #10 sig = 0;
    #20 $finish; // Simülasyonu sonlandır
  end
endmodule
\`\`\`

Simülatör bu testbench'i çalıştırdığında \`$monitor\` sinyal değiştikçe ekrana çıktı basar ve 80ns civarında \`$finish\` ile simülasyonu tamamlar.`,
      },
      {
        title: "3. Simülasyon Dalga Biçimi (Waveform) ve Olay Kuyruğu",
        content: `Simülasyon sırasında sinyallerin zamana bağlı durumları bir dalga biçimi dosyasına (VCD, FSDB, WLF) dökülür ve dalga biçimi görüntüleyicilerde (GTKWave, SimVision vb.) grafiksel olarak analiz edilir.
- **Güncelleme Olayı (Update Event)**: Bir register veya telin değer değiştirmesi.
- **Değerlendirme Olayı (Evaluation Event)**: Sinyal değiştiğinde ona duyarlı proseslerin (\`always\`, \`assign\`) yeniden hesaplanması.
- **Zamanlama (Scheduling)**: Olayların simülasyon zaman kuyruğuna sırayla eklenmesi.`,
      },
      {
        title: "4. Olay Kuyruğunun Katmanlı Bölgeleri (Stratified Event Queue)",
        content: `IEEE Verilog standardı simülasyon olay kuyruğunu beş temel bölgeye ayırır:

| Bölge | Açıklama |
| :--- | :--- |
| **Active (Aktif)** | O anki simülasyon zamanında işletilen olaylar (bloklayan atamalar, \`assign\` hesaplamaları, \`$display\`). |
| **Inactive (İnaktif)** | \`#0\` gecikmeli ifadeler. Aktif bölge bittikten hemen sonra işlenir. |
| **Nonblocking (NBA)** | Bloklamayan atamaların (\`<=\`) güncelleme fazı. Değerler aktif bölgede yakalanır, atama burada gerçekleşir. |
| **Monitor** | \`$monitor\` ve \`$strobe\` görevleri. Tüm güncellemeler bittikten sonra en son kararlı değeri okur. |
| **Future (Gelecek)** | Gelecek zaman adımlarına (\`#delay\`) planlanmış olaylar. |

Bir zaman adımındaki tüm aktif olaylar işlendiğinde bir simülasyon çevrimi tamamlanmış olur.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Testbench Mimarisi ve DUT Sinyal Sürme** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-testbench-simulation.v - Örnek Donanım Modülü",
          snippet: `module tb;
  reg clk;
  reg sig;
 
  // Clock generation 
  // Process starts at time 0ns and loops after every 5ns
  always #5 clk = ~clk;   
 
  // Initial block : Process starts at time 0ns
  initial begin            
    // This system task will print out the signal values everytime they change
    $monitor("Time = %0t clk = %0d sig = %0d", $time, clk, sig);
    
    // Also called stimulus, we simply assign different values to the variables
    // after some simulation "delay"
    sig = 0;
    #5 clk = 0;        // Assign clk to 0 at time 5ns
    #15  sig = 1;      // Assign sig to 1 at time 20ns (#5 + #15)
    #20  sig = 0;      // Assign sig to 0 at time 40ns (#5 + #15 + #20)
    #15  sig = 1;      // Assign sig to 1 at time 55ns (#5 + #15 + #20 + #15)
    #10  sig = 0;      // Assign sig to 0 at time 65ns (#5 + #15 + #20 + #15 + #10)
    #20 $finish;       // Finish simulation at time 85ns
  end
endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-testbench-simulation_tb.v - Simülasyon Testbench",
          snippet: `module des;
	wire abc;
	wire a, b, c;
	
	assign abc = a & b | c;  // abc is updated via the assign statement (process) whenever a, b or c change -> update event
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module tb;
  reg clk;
  reg sig;
 
  // Clock generation 
  // Process starts at time 0ns and loops after every 5ns
  always #5 clk = ~clk;   
 
  // Initial block : Process starts at time 0ns
  initial begin            
    // This system task will print out the signal values everytime they change
    $monitor("Time = %0t clk = %0d sig = %0d", $time, clk, sig);
    
    // Also called stimulus, we simply assign different values to the variables
    // after some simulation "delay"
    sig = 0;
    #5 clk = 0;        // Assign clk to 0 at time 5ns
    #15  sig = 1;      // Assign sig to 1 at time 20ns (#5 + #15)
    #20  sig = 0;      // Assign sig to 0 at time 40ns (#5 + #15 + #20)
    #15  sig = 1;      // Assign sig to 1 at time 55ns (#5 + #15 + #20 + #15)
    #10  sig = 0;      // Assign sig to 0 at time 65ns (#5 + #15 + #20 + #15 + #10)
    #20 $finish;       // Finish simulation at time 85ns
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Testbench Mimarisi ve DUT Sinyal Sürme ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-display-tasks": {
    id: "verilog-display-tasks",
    badge: "Bölüm 23 • Testbench & Temel Simülasyon",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Görevleri (task ... endtask) ve Zaman Gecikmeleri",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 23: Testbench & Temel Simülasyon. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Ekrana Yazdırma Sistem Görevleri ($display, $write, $strobe, $monitor)",
        content: `Verilog, simülasyon akışını izlemek, değişken durumlarını loglamak ve hata ayıklamayı hızlandırmak için zengin ekran yazdırma sistem görevleri sunar. Bu görevler C dilindeki \`printf\` benzeri format belirteçleri (\`%d\`, \`%b\`, \`%h\`, \`%s\`, \`%t\`) kullanır.`,
      },
      {
        title: "2. $display ve $write Sözdizimi ve Aralarındaki Fark",
        content: `Sözdizimi:
\`\`\`verilog
$display(<arguman_listesi>);
$write(<arguman_listesi>);
\`\`\`

Temel Fark:
\`$display\`, yazdırdığı metnin sonuna otomatik olarak yeni satır (\`\\n\`) ekler. \`$write\` ise yeni satır eklemez; peş peşe çağrılan \`$write\` ifadeleri aynı satırda yazmaya devam eder. Satır atlamak için \`$write\` içinde açıkça \`\\n\` belirtilmelidir.`,
      },
      {
        title: "3. $display ve $write Uygulama Örneği",
        content: `\`\`\`verilog
module tb;
  initial begin
    $display("Bu metin yeni satır ile biter.");
    $write("Bu ise bitmez, ");
    $write("aynı satırdan devam eder.\\n");
    $display("Tekrar yeni bir satır başladı.");
  end
endmodule
\`\`\`

Konsol Çıktısı:
\`\`\`text
Bu metin yeni satır ile biter.
Bu ise bitmez, aynı satırdan devam eder.
Tekrar yeni bir satır başladı.
\`\`\``,
      },
      {
        title: "4. Kararlı Değerleri Okuma: $strobe Sistem Görevi",
        content: `\`$strobe\`, o anki simülasyon zaman adımındaki (delta cycle) tüm bloklamayan atamalar (\`<=\`) tamamlandıktan sonra, yani olay kuyruğunun Monitor bölgesinde çalışır.

\`\`\`verilog
module tb;
  reg [7:0] a, b;
  initial begin
    a = 8'h2D; b = 8'h2D;
    #10;
    b <= a + 1; // Bloklamayan atama (NBA)
    $display("[$display] T=%0t b=0x%0h", $time, b); // Eski değer: 0x2D
    $strobe ("[$strobe]  T=%0t b=0x%0h", $time, b); // Güncel nihai değer: 0x2E
  end
endmodule
\`\`\`
\`$display\`, bloklamayan atama henüz aktif fazdayken çalıştığı için eski değeri okur; \`$strobe\` ise atama bittikten sonra çalıştığı için güncel nihai değeri (0x2E) hatasız raporlar.`,
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
          caption: "verilog-display-tasks.v - Örnek Donanım Modülü",
          snippet: `$display(<list_of_arguments>);
$write(<list_of_arguments>);`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-display-tasks_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  initial begin
    $display ("This ends with a new line ");
    $write ("This does not,");
    $write ("like this. To start new line, use newline char\\n like this");
    $display ("This continues from where it was left off !");
    $display ("And now we get a new line again");
  end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `$display(<list_of_arguments>);
$write(<list_of_arguments>);`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Görevleri (task ... endtask) ve Zaman Gecikmeleri ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-stop-finish": {
    id: "verilog-stop-finish",
    badge: "Bölüm 23 • Testbench & Temel Simülasyon",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Simülasyon Kontrolü: $stop ve $finish Sistem Görevleri",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 23: Testbench & Temel Simülasyon. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Simülasyon Denetim Görevleri: $stop ve $finish",
        content: `Verilog'da simülasyonun akışını ve sonlanmasını yönetmek için \`$stop\` ve \`$finish\` sistem görevleri kullanılır. Özellikle \`forever\` döngüsü veya duyarlılık listesi bulunmayan \`always\` blokları gibi sonsuz döngüler içeren testbench'lerde simülasyonun istenen zamanda durdurulması bu görevlerle sağlanır.`,
      },
      {
        title: "2. $stop Görevi ile Simülasyonu Duraklatma (Breakpoint)",
        content: `Sözdizimi: \`$stop([N]);\`
(N: 0 = bilgi basma, 1 = zaman ve konum bas, 2 = zaman, konum ve CPU/bellek istatistiklerini bas).

\`$stop\`, simülasyonu tamamen kapatmaz; bir kesme noktası (breakpoint) gibi davranarak duraklatır. Kullanıcı simülatör arayüzünden sinyalleri inceledikten sonra simülasyonu kaldığı yerden sürdürebilir:

\`\`\`verilog
module tb;
  reg [3:0] counter;
  initial begin
    counter = 0;
    #10 counter = counter + 1;
    $display("Durdurma öncesi sayaç: %b", counter);
    $stop; // Simülasyon burada duraklar
    #10 counter = counter + 1;
    $display("Devam sonrası sayaç: %b", counter);
  end
endmodule
\`\`\``,
      },
      {
        title: "3. $finish Görevi ile Simülasyonu Tamamen Sonlandırma",
        content: `Sözdizimi: \`$finish([N]);\`

\`$finish\`, simülasyonu tamamen sonlandırır, simülasyon motorunu kapatır ve kontrolü işletim sistemine geri verir. Başarılı bir testbench tamamlandığında veya giderilemez bir hata oluştuğunda çağrılır:

\`\`\`verilog
module tb;
  initial begin
    #100 $display("Test başarıyla tamamlandı.");
    $finish(1); // Simülasyon biter
    #50; // Bu satır asla çalıştırılmaz
  end
endmodule
\`\`\``,
      },
      {
        title: "4. $stop ve $finish Karşılaştırması ve Kullanım Kriterleri",
        content: `| Kriter | $stop | $finish |
| :--- | :--- | :--- |
| **İşlev** | Simülasyonu duraklatır (kesme noktası / breakpoint). | Simülasyonu tamamen bitirir ve kapatır. |
| **Devam Edebilirlik** | Simülatör komutlarıyla kaldığı yerden sürdürülebilir. | Devam edilemez; baştan başlatılması gerekir. |
| **EDA Lisansı** | Simülatör açık kalır, lisansı bırakmaz. | Simülatör kapanır, araç lisansını serbest bırakır. |
| **Tipik Kullanım** | İnteraktif hata ayıklama (debug). | Regresyon testleri ve CI/CD otomasyonları. |`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Simülasyon Kontrolü: $stop ve $finish Sistem Görevleri** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-stop-finish.v - Örnek Donanım Modülü",
          snippet: `$stop([N]);

  // where N is
  // 0   :   Prints nothing
  // 1   :   Prints simulation time and location
  // 2   :   Prints simulation time, location, and statistics about the memory
  //         and central processing unit (CPU) time used in simulation`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-stop-finish_tb.v - Simülasyon Testbench",
          snippet: `module tb;

reg [3:0] counter;

initial begin
    counter = 0;
    #10 counter = counter + 1; // Increment after 10 time units
    $display("Counter value before stop: %b", counter);
    
    $stop; // Simulation pauses here

    // This line will not execute until the simulation is resumed
    #10 counter = counter + 1;
    $display("Counter value after stop: %b", counter);
end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `$stop([N]);

  // where N is
  // 0   :   Prints nothing
  // 1   :   Prints simulation time and location
  // 2   :   Prints simulation time, location, and statistics about the memory
  //         and central processing unit (CPU) time used in simulation`,
      language: "verilog",
    },
    quiz: {
      question: "Simülasyon Kontrolü: $stop ve $finish Sistem Görevleri ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-vcd": {
    id: "verilog-vcd",
    badge: "Bölüm 24 • İleri Testbench: VCD, Rastgelelik & Dosya I/O",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 24: İleri Testbench: VCD, Rastgelelik & Dosya I/O. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Değer Değişim Dökümü (Value Change Dump - VCD) Temelleri",
        content: `VCD (Value Change Dump), sayısal simülasyon sırasında değişken ve sinyal değerlerindeki değişimleri zaman damgasıyla kaydeden standartlaştırılmış bir ASCII dosya formatıdır (IEEE 1364 standardı). Simülasyon araçları tarafından üretilen bu veri, GTKWave, ModelSim, QuestaSim veya Vivado gibi dalga biçimi görüntüleyicilerinde (waveform viewer) açılarak donanımın zamana bağlı sinyal geçişlerinin grafiksel olarak analiz edilmesini ve mantıksal hataların tespit edilmesini sağlar.`,
      },
      {
        title: "2. VCD Dosya Türleri: Dört Durumlu ve Genişletilmiş Format",
        content: `VCD sistem görevleri ile kaydedilen simülasyon verileri iki temel formatta tutulur:
1. **Four-state VCD (4 Durumlu VCD)**: Standart formattır. Sinyalleri \`0\`, \`1\`, \`x\` (bilinmeyen) ve \`z\` (yüksek empedans) mantık durumlarıyla kaydeder; sürüş gücü (strength) bilgisini içermez. Çoğu işlevsel doğrulama için yeterlidir ve dosya boyutu daha küçüktür.
2. **Extended VCD (Genişletilmiş VCD)**: Mantık seviyelerinin yanı sıra sinyallerin sürüş güçlerini (drive strength) ve yük kapasitelerini de kaydeder. Özellikle çift yönlü hatlar ve birden fazla sürücülü veri yolları analiz edilirken kullanılır.`,
      },
      {
        title: "3. VCD Başlık Bölümü (Header Section) ve Meta Veriler",
        content: `VCD dosyası simülasyon ortamına ilişkin meta verileri içeren bir başlık (header) bölümüyle başlar. Bu bölüm \`$<anahtar_kelime> ... $end\` yapısıyla tanımlanır:
- \`$date\`: VCD dosyasının oluşturulduğu tarih ve saat.
- \`$version\`: Dökümü üreten simülasyon aracının adı ve versiyonu.
- \`$timescale\`: Simülasyonda kullanılan zaman ölçeği (örn. \`1 ns\`).
- \`$comment\`: Dosyaya eklenen açıklama metinleri.
- \`$enddefinitions\`: Başlık bölümünün bittiğini ve sinyal tanımlarının tamamlandığını belirtir.

Örnek Başlık:
\`\`\`text
$date April 11, 2026 10:05:41 $end
$version ICARUS-VERILOG 12.0 $end
$timescale 1 ns $end
$enddefinitions $end
\`\`\``,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-vcd.v - Örnek Donanım Modülü",
          snippet: `$date April 11, 2021 10:05:41
$end
$version ICARUS-VERILOG 2.5
$end
$timescale 1 ns
$end`,
        },
      },
{
        title: "5. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-vcd_tb.v - Simülasyon Testbench",
          snippet: `$comment
List all signals to be monitored next
$end

$scope module logic $end
$var wire 1 a signal_a $end
$var wire 1 b signal_b $end
$var wire 1 c signal_c $end
$upscope $end
$enddefinitions $end`,
        },
      }

    ],
    playground: {
      initialCode: `$date April 11, 2021 10:05:41
$end
$version ICARUS-VERILOG 2.5
$end
$timescale 1 ns
$end`,
      language: "verilog",
    },
    quiz: {
      question: "VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-dump-vcd": {
    id: "verilog-dump-vcd",
    badge: "Bölüm 24 • İleri Testbench: VCD, Rastgelelik & Dosya I/O",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 24: İleri Testbench: VCD, Rastgelelik & Dosya I/O. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. VCD Dalga Biçimi Döküm Görevleri (VCD Dump Tasks)",
        content: `Verilog, testbench içerisinden VCD dosyalarının oluşturulmasını, isimlendirilmesini ve hangi sinyallerin kaydedileceğini yönetmek için bir dizi sistem görevi sağlar. Bu görevler sayesinde simülasyon sırasında tüm sinyaller yerine yalnızca incelenmek istenen modüller seçilerek disk alanı ve simülasyon süresi optimize edilir.`,
      },
      {
        title: "2. $dumpfile ile Çıktı Dosyasını Belirleme",
        content: `Sözdizimi: \`$dumpfile("dosya_adi.vcd");\`

Oluşturulacak VCD dosyasının adını tanımlar. Dosya adı belirtilmezse simülatör varsayılan olarak \`dump.vcd\` dosyasını oluşturur:
\`\`\`verilog
module tb;
  initial begin
    $dumpfile("wave1.vcd"); // Dalga biçimlerini wave1.vcd dosyasına döker
  end
endmodule
\`\`\``,
      },
      {
        title: "3. $dumpvars ile Kaydedilecek Sinyalleri ve Seviyeleri Seçme",
        content: `Sözdizimi:
\`\`\`verilog
$dumpvars(derinlik_seviyesi, [modul_veya_sinyal_listesi]);
\`\`\`
- Hiçbir argüman verilmezse (\`$dumpvars;\`), tasarımdaki tüm modüller ve değişkenler döküme dahil edilir.
- İlk argüman (\`derinlik_seviyesi\`) incelenecek hiyerarşi derinliğini belirler:
  - \`0\`: Belirtilen modülün kendisini ve altındaki TÜM hiyerarşik alt modülleri kaydeder.
  - \`1\`: Yalnızca belirtilen modülün kendi yerel sinyallerini kaydeder, alt modüllere inmez.

\`\`\`verilog
module tb;
  initial begin
    $dumpvars(0); // Tüm tasarımdaki tüm değişkenleri döker
    $dumpvars(0, tb); // tb modülü ve altındaki tüm modülleri döker
    $dumpvars(1, tb); // Sadece tb modülündeki sinyalleri döker, alt modülleri atlar
    $dumpvars(0, tb.ram_ctrl, tb.alu2.a); // ram_ctrl hiyerarşisinin tümünü ve alu2 içindeki 'a' sinyalini döker
  end
endmodule
\`\`\``,
      },
      {
        title: "4. $dumpon ve $dumpoff ile Seçici Döküm Yönetimi",
        content: `\`$dumpvars\` çağrıldığında simülatör sinyal değişimlerini kaydetmeye başlar. Büyük karmaşık tasarımlarda tüm simülasyon boyunca sinyal kaydetmek disk boyutunu şişirir ve simülasyonu aşırı yavaşlatır. \`$dumpoff\` dökümü duraklatır; \`$dumpon\` ise tekrar başlatır:

\`\`\`verilog
module tb;
  initial begin
    $dumpvars;
    #100ns  $dumpoff; // 100ns anında kaydı duraklat
    #2000ns $dumpon;  // 2000ns anında ilgilenilen bölgede kaydı tekrar başlat
  end
endmodule
\`\`\`
\`$dumpoff\` çalıştığında değişkenler döküm dosyasında \`x\` olarak işaretlenir; \`$dumpon\` çağrıldığında ise o anki gerçek değerleriyle döküm sürdürülür.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-dump-vcd.v - Örnek Donanım Modülü",
          snippet: `$dumpfile(<filename>);`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-dump-vcd_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  initial begin
    $dumpfile();                // default "dump.vcd"
    $dumpfile("wave1.vcd");     // dumps into "wave1.vcd"
  end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `$dumpfile(<filename>);`,
      language: "verilog",
    },
    quiz: {
      question: "VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-random": {
    id: "verilog-random",
    badge: "Bölüm 24 • İleri Testbench: VCD, Rastgelelik & Dosya I/O",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Rastgele Test Uyaranı: $random Sistem Fonksiyonu",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 24: İleri Testbench: VCD, Rastgelelik & Dosya I/O. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Rastgele Test Uyaranı: $random Sistem Fonksiyonu** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Rastgele Test Uyaranı: $random Sistem Fonksiyonu** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
    ],
    playground: {
      initialCode: `// Rastgele Test Uyaranı: $random Sistem Fonksiyonu
module verilog_random (
    input wire clk,
    input wire rst_n,
    output wire out_sig
);
    assign out_sig = 1'b1;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Rastgele Test Uyaranı: $random Sistem Fonksiyonu ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-file-io-operations": {
    id: "verilog-file-io-operations",
    badge: "Bölüm 24 • İleri Testbench: VCD, Rastgelelik & Dosya I/O",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Dosya İşlemleri: $fopen, $fdisplay ve $fscanf ile Veri Okuma",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 24: İleri Testbench: VCD, Rastgelelik & Dosya I/O. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Verilog Dosya Giriş/Çıkış (File I/O) İşlemlerine Genel Bakış",
        content: `Karmaşık testbench mimarilerinde simülasyon uyarıcılarını harici metin dosyalarından okumak (örn. test vektörleri, bellek başlangıç dosyaları) ve simülasyon sonuçlarını diske kaydetmek için Verilog Dosya Giriş/Çıkış (File I/O) sistem görevleri ve fonksiyonları kullanılır.`,
      },
      {
        title: "2. Dosya Açma ve Kapatma: $fopen ve $fclose",
        content: `Bir dosyayı açmak için \`$fopen\`, kapatmak için \`$fclose\` kullanılır. Dosya tanıtıcısı (file descriptor) 32-bit \`integer\` türünde bir değişkende saklanır:

\`\`\`verilog
module tb;
  integer fd; // Dosya tanıtıcı değişkeni

  initial begin
    // 'my_file.txt' dosyasını yazma modunda aç ve işaretçiyi 'fd' içinde sakla
    fd = $fopen("my_file.txt", "w");

    // İşlem tamamlandığında dosya tanıtıcısını kapat
    $fclose(fd);
  end
endmodule
\`\`\``,
      },
      {
        title: "3. Dosya Erişim Modları (File Access Modes)",
        content: `| Mod | Açıklama |
| :--- | :--- |
| \`"r"\` veya \`"rb"\` | Okuma modunda açar (dosya mevcut olmalıdır). |
| \`"w"\` veya \`"wb"\` | Yazma modunda yeni dosya oluşturur; dosya varsa içeriğini siler (truncate). |
| \`"a"\` veya \`"ab"\` | Ekleme (append) modunda açar; dosya sonuna yazar. |
| \`"r+"\`, \`"r+b"\`, \`"rb+"\` | Hem okuma hem yazma için açar. |
| \`"w+"\`, \`"w+b"\`, \`"wb+"\` | Okuma ve yazma için sıfırlayarak (truncate) açar. |
| \`"a+"\`, \`"a+b"\`, \`"ab+"\` | Okuma ve dosya sonuna ekleme için açar. |`,
      },
      {
        title: "4. Dosyaya Yazma Görevleri: $fdisplay, $fwrite, $fstrobe ve Sayı Tabanları",
        content: `Konsola yazdıran fonksiyonların dosyaya yazan türevleri şunlardır:
- \`$fdisplay(fd, ...)\`: Dosyaya yazar ve satır sonu (\`\\n\`) ekler.
- \`$fwrite(fd, ...)\`: Dosyaya satır sonu eklemeden yazar.
- \`$fstrobe(fd, ...)\`: Delta adımı sonunda NBA atamaları bittikten sonra kararlı değeri yazar.
- \`$fmonitor(fd, ...)\`: Değişken değiştikçe dosyaya yazar.

Sayı tabanı türevleri:
- Onluk (varsayılan): \`$fdisplay\`
- İkili (Binary): \`$fdisplayb\`
- Sekizli (Octal): \`$fdisplayo\`
- Onaltılık (Hexadecimal): \`$fdisplayh\`

\`\`\`verilog
module tb;
  integer fd, i;
  reg [7:0] my_var;

  initial begin
    fd = $fopen("my_file.txt", "w");
    my_var = 8'h1A;
    $fdisplay(fd, "Onaltılık: %0h | İkili: %0b", my_var, my_var);
    $fclose(fd);
  end
endmodule
\`\`\``,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Dosya İşlemleri: $fopen, $fdisplay ve $fscanf ile Veri Okuma** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-file-io-operations.v - Örnek Donanım Modülü",
          snippet: `module tb;
	// Declare a variable to store the file handler
	integer fd;
	
	initial begin
		// Open a new file by the name "my_file.txt" 
		// with "write" permissions, and store the file
		// handler pointer in variable "fd"
		fd = $fopen("my_file.txt", "w");
		
		// Close the file handle pointed to by "fd"
		$fclose(fd);
	end
endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-file-io-operations_tb.v - Simülasyon Testbench",
          snippet: `module tb;
	integer  	fd;
	integer 	i;
	reg [7:0] 	my_var;
	
	initial begin
		// Create a new file
		fd = $fopen("my_file.txt", "w");
		my_var = 0;
		
      $fdisplay(fd, "Value displayed with $fdisplay");
		#10 my_var = 8'h1A;
		$fdisplay(fd, my_var);      // Displays in decimal
		$fdisplayb(fd, my_var); 	// Displays in binary
		$fdisplayo(fd, my_var); 	// Displays in octal
		$fdisplayh(fd, my_var); 	// Displays in hex
		
	  // $fwrite does not print the newline char '
' automatically at 
	  // the end of each line; So we can predict all the values printed
	  // below to appear on the same line
      $fdisplay(fd, "Value displayed with $fwrite");
		#10 my_var = 8'h2B;
		$fwrite(fd, my_var);
		$fwriteb(fd, my_var);
		$fwriteo(fd, my_var);
		$fwriteh(fd, my_var);
		
     
      // Jump to new line with '
', and print with strobe which takes
      // the final value of the variable after non-blocking assignments
      // are done
      $fdisplay(fd, "
Value displayed with $fstrobe");
		#10 my_var <= 8'h3C;
		$fstrobe(fd, my_var);
		$fstrobeb(fd, my_var);
		$fstrobeo(fd, my_var);
		$fstrobeh(fd, my_var);
		
      #10 $fdisplay(fd, "Value displayed with $fmonitor");
	  $fmonitor(fd, my_var);
		
		for(i = 0; i < 5; i= i+1) begin
			#5 my_var <= i;
		end
      
      #10 $fclose(fd);
	end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module tb;
	// Declare a variable to store the file handler
	integer fd;
	
	initial begin
		// Open a new file by the name "my_file.txt" 
		// with "write" permissions, and store the file
		// handler pointer in variable "fd"
		fd = $fopen("my_file.txt", "w");
		
		// Close the file handle pointed to by "fd"
		$fclose(fd);
	end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Dosya İşlemleri: $fopen, $fdisplay ve $fscanf ile Veri Okuma ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-compiler-directives": {
    id: "verilog-compiler-directives",
    badge: "Bölüm 25 • Derleyici Direktifleri (\`define, \`ifdef)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Derleyici Direktifleri (\`timescale, \`include, \`resetall)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 25: Derleyici Direktifleri (\`define, \`ifdef). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Verilog Derleyici Direktiflerine (Compiler Directives) Giriş",
        content: `Derleyici direktifleri, kaynak kodun derleyici tarafından nasıl işleneceğini, hangi bölümlerin dahil edilip edilmeyeceğini denetleyen özel ön işlemci (preprocessor) talimatlarıdır. Ters kesme işareti / grave accent (\`\` \` \`\`) ile başlarlar ve C dilindeki önişlemci komutlarına benzer şekilde derleme öncesinde yorumlanırlar.`,
      },
      {
        title: "2. Metin Makroları Tanımlama: \`define",
        content: `\`\` \`define \`\` direktifi metin makroları ve sabitler tanımlamak için kullanılır. C dilindeki \`#define\` ile aynı amaca hizmet eder. Tanımlanan makro kodun her yerinde önüne ters kesme işareti konularak çağrılabilir:

\`\`\`verilog
\`define DATA_WIDTH 32
\`define CLK_PERIOD 10
\`\`\``,
      },
      {
        title: "3. Harici Dosya Ekleme: \`include",
        content: `\`\` \`include \`\` direktifi, harici bir Verilog dosyasının içeriğini derleme anında doğrudan kaynak koda dahil eder. Kod tekrarını önler ve modülerliği artırır:

\`\`\`verilog
\`include "header_definitions.v"
\`include "timescale.vh"
\`\`\``,
      },
      {
        title: "4. Koşullu Derleme: \`ifdef ve \`ifndef",
        content: `Belirli bir makronun tanımlı olup olmadığını denetleyerek kod bloklarını seçici olarak derler:

\`\`\`verilog
\`ifdef SYNTHESIS
  // Yalnızca ASIC/FPGA donanım sentezinde derlenecek kodlar
\`elsif SIMULATION
  // Yalnızca doğrulama ve simülasyonda derlenecek test kodları
\`else
  // Varsayılan durum
\`endif
\`\`\``,
      }

    ],
    playground: {
      initialCode: `\`define CLK_PERIOD 20`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Derleyici Direktifleri (\`timescale, \`include, \`resetall) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-define-macros": {
    id: "verilog-define-macros",
    badge: "Bölüm 25 • Derleyici Direktifleri (\`define, \`ifdef)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "\`define Makro Tanımları ve Metin İkamesi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 25: Derleyici Direktifleri (\`define, \`ifdef). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Verilog Makrolarının Doğası ve Çalışma Mantığı",
        content: `Verilog makroları, kod derlenmeden önceki ön işleme (preprocessing) aşamasında tam metin ikamesi (textual substitution) yapar. Veri tipi veya donanımsal kaynak tüketmezler. Sabit değerler, parametreli matematiksel ifadeler veya sık kullanılan kod kalıpları için yüksek okunabilirlik ve sürdürülebilirlik sağlarlar.`,
      },
      {
        title: "2. \`define Sözdizimi ve Parametreli Makro Kuralları",
        content: `Sözdizimi:
\`\`\`verilog
\`define MAKRO_ADI deger
\`define PARAMETRELI_MAKRO(a, b) ((a) + (b))
\`\`\`
Çok satırlı makrolar ters bölü işareti (\`\\\`) ile bir sonraki satıra bağlanır:
\`\`\`verilog
\`define ASSERT_CLK(clk_sig) \\
  always @(posedge clk_sig) \\
    $display("Saat vurdu: %0t", $time);
\`\`\``,
      },
      {
        title: "3. Parametreli Makro ve Fonksiyonel Tasarım Örnekleri",
        content: `\`\`\`verilog
\`define ADD(x, y) ((x) + (y))
\`define MAX(a, b) ((a) > (b) ? (a) : (b))

module tb;
  initial begin
    int sum = \`ADD(15, 25); // 40 olarak genişletilir
    int buyuk = \`MAX(50, 100); // 100
    $display("Toplam=%0d, Buyuk=%0d", sum, buyuk);
  end
endmodule
\`\`\`
Ön işlemci bu makroları derleme aşamasında doğrudan karşılık gelen matematiksel ifadelere dönüştürür.`,
      }

    ],
    playground: {
      initialCode: `\`define MACRO_NAME [ (arguments) ] macro_body`,
      language: "verilog",
    },
    quiz: {
      question: "\`define Makro Tanımları ve Metin İkamesi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-ifdef-conditional-compilation": {
    id: "verilog-ifdef-conditional-compilation",
    badge: "Bölüm 25 • Derleyici Direktifleri (\`define, \`ifdef)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "\`ifdef ve \`ifndef ile Koşullu Derleme Yönetimi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 25: Derleyici Direktifleri (\`define, \`ifdef). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Koşullu Derleme Sözdizimi ve Çoklu Dal Yönetimi (\`elsif)",
        content: `Koşullu derleme blokları, tasarım kodunun hedef donanıma (ASIC vs FPGA) veya çalışma moduna (Sentez vs Simülasyon) göre otomatik uyarlanmasını sağlar:

\`\`\`verilog
\`ifdef ASIC_FLOW
  // ASIC hücre kütüphanesi bellek modeli
  tsmc28_sram u_mem (.clk(clk), .addr(addr), .dout(dout));
\`elsif FPGA_FLOW
  // Xilinx / Intel FPGA Block RAM modeli
  xilinx_bram u_mem (.clk(clk), .addr(addr), .dout(dout));
\`else
  // Genel simülasyon davranışı
  reg [31:0] mem [0:1023];
  always @(posedge clk) dout <= mem[addr];
\`endif
\`\`\`
Komut satırından \`+define+FPGA_FLOW\` bayrağı verilerek istenen donanım dalı kolayca etkinleştirilir.`,
      }

    ],
    playground: {
      initialCode: `// Style #1: Only single \`ifdef
\`ifdef <FLAG>
	// Statements
\`endif

// Style #2: \`ifdef with \`else part
\`ifdef <FLAG>
	// Statements
\`else
	// Statements
\`endif

// Style #3: \`ifdef with additional ifdefs
\`ifdef <FLAG1>
	// Statements
\`elsif <FLAG2>
	// Statements
\`elsif <FLAG3>
	// Statements
\`else
	// Statements
\`endif`,
      language: "verilog",
    },
    quiz: {
      question: "\`ifdef ve \`ifndef ile Koşullu Derleme Yönetimi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-udp": {
    id: "verilog-udp",
    badge: "Bölüm 26 • İleri Konular (UDP, specify, strength)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog User Defined Primitives",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 26: İleri Konular (UDP, specify, strength). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Kullanıcı Tanımlı Primitifler (User-Defined Primitives - UDP)",
        content: `Standart Verilog mantık kapıları (\`and\`, \`or\`, \`nand\` vb.) karmaşık özel hücreleri veya doğruluk tablolarını doğrudan modellemek için yetersiz kalabilir. Verilog, tasarımcının doğruluk tablosu (truth table) formatında kendi kombinasyonel veya ardışıl mantık elemanlarını oluşturabilmesi için UDP (User-Defined Primitive) mekanizmasını sunar.

UDP Kuralları:
1. UDP'ler DAİMA tam olarak 1 adet skaler çıkışa sahiptir. Çıkış yalnızca \`0\`, \`1\` veya \`x\` olabilir; \`z\` (yüksek empedans) alamaz.
2. Girişler skaler (1-bit) olmalıdır ve çift yönlü (\`inout\`) port desteklenmez. Girişteki herhangi bir \`z\` değeri simülatör tarafından \`x\` olarak işlenir.
3. UDP tanımı modüllerle aynı hiyerarşi seviyesinde yapılır; bir \`module ... endmodule\` bloğunun içine yazılamaz.`,
      },
      {
        title: "2. UDP Tablo Sembolleri ve Geçiş Gösterimleri",
        content: `UDP mantığı \`table ... endtable\` bloğu içinde durum tablosu olarak yazılır. Kullanılan temel semboller:

| Sembol | Anlamı |
| :--- | :--- |
| \`0\`, \`1\` | Mantıksal 0 ve Mantıksal 1 |
| \`x\` | Bilinmeyen (Unknown) durum |
| \`?\` | Don't Care (0, 1 veya x fark etmez - yalnızca girişte kullanılır) |
| \`-\` | Durum değişimi yok (No change - yalnızca ardışıl UDP çıkışında kullanılır) |
| \`ab\` | a değerinden b değerine geçiş (örn. \`01\` yükselen kenar) |
| \`r\` | Yükselen kenar (\`01\`) |
| \`f\` | Düşen kenar (\`10\`) |
| \`p\` | Olası pozitif kenar (\`0->1\`, \`0->x\`, \`x->1\`) |
| \`n\` | Olası negatif kenar (\`1->0\`, \`1->x\`, \`x->0\`) |
| \`*\` | Girişteki herhangi bir değişim (\`??\`) |`,
      },
      {
        title: "3. Kombinasyonel UDP Örneği (2x1 MUX)",
        content: `Port listesinde ilk sinyal DAİMA çıkış olmalıdır:

\`\`\`verilog
primitive mux (out, sel, a, b);
  output out;
  input sel, a, b;

  table
    // sel a b : out
       0   1 ? : 1;
       0   0 ? : 0;
       1   ? 0 : 0;
       1   ? 1 : 1;
       x   0 0 : 0; // İki giriş de 0 ise sel=x olsa bile çıkış 0'dır
       x   1 1 : 1; // İki giriş de 1 ise sel=x olsa bile çıkış 1'dir
  endtable
endprimitive
\`\`\`

Testbench'te kullanımı:
\`\`\`verilog
module tb;
  reg sel, a, b;
  wire out;
  // UDP örneklendiğinde isimli port (.out(out)) desteklenmez; sırayla bağlanmalıdır:
  mux u_mux (out, sel, a, b);
  // ...
endmodule
\`\`\``,
      },
      {
        title: "4. Ardışıl UDP Örneği (D-Flip-Flop ve Latch Modelleri)",
        content: `Ardışıl UDP'ler seviye duyarlı (level-sensitive) veya kenar duyarlı (edge-sensitive) bellek elemanlarını modeller. Çıkış portu UDP içinde \`reg\` olarak bildirilir ve isteğe bağlı \`initial\` bloğuyla sıfırlanabilir.
Tabloda girişler ile çıkış arasında geçerli durumu (current state) temsil eden iki nokta üst üste (\`:\`) ile ayrılmış ek bir sütun bulunur:
\`<girişler> : <mevcut_durum> : <sonraki_durum>;\`

\`\`\`verilog
primitive d_ff (q, clk, d);
  output q;
  reg q;
  input clk, d;
  table
    // clk   d  : q_mevcut : q_sonraki
       (01)  0  :    ?     :    0;
       (01)  1  :    ?     :    1;
       (?0)  ?  :    ?     :    -;
  endtable
endprimitive
\`\`\``,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog User Defined Primitives** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-udp.v - Örnek Donanım Modülü",
          snippet: `// Output should always be the first signal in port list
primitive mux (out, sel, a, b);
	output 	out;
	input 	sel, a, b;
	
	table
		// sel 	a 	b 		out
			0 	1 	? 	: 	1;
			0 	0 	? 	: 	0;
			1 	? 	0 	: 	0;
			1 	? 	1 	: 	1;
			x 	0 	0 	: 	0;
			x 	1 	1 	: 	1;
	endtable
endprimitive`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-udp_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg 	sel, a, b;
  reg [2:0] dly;
  wire 	out;
  integer i;
  
  // Instantiate the UDP - note that UDPs cannot
  // be instantiated with port name connection
  mux u_mux ( out, sel, a, b);
  
  initial begin
    a <= 0;
    b <= 0;
    
    $monitor("[T=%0t] a=%0b b=%0b sel=%0b out=%0b", $time, a, b, sel, out);
    
    // Drive a, b, and sel after different random delays
    for (i = 0; i < 10; i = i + 1) begin
      	dly = $random;
      #(dly) a <= $random;
      	dly = $random;
      #(dly) b <= $random;
      	dly = $random;
      #(dly) sel <= $random;
    end
  end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `// Output should always be the first signal in port list
primitive mux (out, sel, a, b);
	output 	out;
	input 	sel, a, b;
	
	table
		// sel 	a 	b 		out
			0 	1 	? 	: 	1;
			0 	0 	? 	: 	0;
			1 	? 	0 	: 	0;
			1 	? 	1 	: 	1;
			x 	0 	0 	: 	0;
			x 	1 	1 	: 	1;
	endtable
endprimitive`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog User Defined Primitives ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-specify-block": {
    id: "verilog-specify-block",
    badge: "Bölüm 26 • İleri Konular (UDP, specify, strength)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Specify Block",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 26: İleri Konular (UDP, specify, strength). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. specify Bloğu Nedir ve ASIC Hücre Zamanlaması",
        content: `ASIC standart hücre kütüphanelerinde kapı içi gecikmeler ve pinler arası yol gecikmeleri (pin-to-pin module path delays) \`specify\` blokları ile modellenir. \`specify ... endspecify\` bloğu, bir modülün giriş portlarından çıkış portlarına sinyalin ne kadar sürede ulaşacağını tanımlar ve kurulum/tutma (setup/hold) zamanlama kontrollerini gerçekleştirir.`,
      },
      {
        title: "2. specify Bloğu Sözdizimi, specparam ve Yol Tanımları",
        content: `Sözdizimi:
\`\`\`verilog
specify
  // 1. specparam ile zamanlama parametreleri
  specparam TRise = 5, TFall = 3;

  // 2. Yol gecikmeleri (Path Delays)
  (a => out) = TRise;    // a girişinden out çıkışına yol gecikmesi
  (b => out) = TFall;    // b girişinden out çıkışına yol gecikmesi

  // 3. Zamanlama denetimleri (System Timing Checks)
  $setup(a, posedge clk, 10); // 10 zaman birimi kurulum kontrolü
endspecify
\`\`\``,
      },
      {
        title: "3. Tam Kapsamlı specify Bloğu Uygulama Örneği",
        content: `\`\`\`verilog
module example_module (
  input wire a,
  input wire b,
  output wire out
);
  specify
    specparam TRise = 5;
    specparam TFall = 3;

    (a => out) = TRise;
    (b => out) = TFall;

    $setup(a, out, 10);
  endspecify

  assign out = a & b;
endmodule
\`\`\`
Simülatör bu modülü çalıştırdığında \`a\` ve \`b\` girişlerindeki değişiklikleri \`TRise\` ve \`TFall\` gecikmeleriyle çıkışa yansıtır; böylece silisyum seviyesindeki fiziksel gecikmeler simülasyonda modellenmiş olur.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Specify Block** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-specify-block.v - Örnek Donanım Modülü",
          snippet: `specify

// Checks and Statements

endspecify`,
        },
      },
{
        title: "5. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-specify-block_tb.v - Simülasyon Testbench",
          snippet: `module example_module (
    input wire a,
    input wire b,
    output wire out
);

specify
    // Specparam declaration to define timing parameters
    specparam TRise = 5; // Rise time delay
    specparam TFall = 3; // Fall time delay

    // Path declarations to specify delays between signals
    (a => out) = TRise;   // Delay from input 'a' to output 'out'
    (b => out) = TFall;   // Delay from input 'b' to output 'out'

    // System timing check for setup time
    $setup(a, out, 10);   // Check setup time for signal 'a' relative to 'out'
endspecify

// Logic for the output
assign out = a & b; // Example combinational logic

endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `specify

// Checks and Statements

endspecify`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Specify Block ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-strength": {
    id: "verilog-strength",
    badge: "Bölüm 26 • İleri Konular (UDP, specify, strength)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Strength",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 26: İleri Konular (UDP, specify, strength). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Verilog Sinyal Sürüş Gücü (Signal Strength) İlkeleri",
        content: `Verilog'da bir sinyal hattını (net) birden fazla sürücü aynı anda kontrol etmeye çalıştığında hangi sürücünün baskın geleceği sinyal sürüş gücü (drive strength) ile belirlenir. Bu mekanizma, açık kolektörlü (open-collector) hatlar, kablolu-VE (wired-AND/OR) yapıları ve çift yönlü veri yollarındaki çekme/itme kuvvetlerini fiziksel seviyede modeller.`,
      },
      {
        title: "2. Yük Gücü (Charge Strength) ve trireg Hatları",
        content: `Yük gücü (charge strength), kapasitif yük depolayabilen \`trireg\` netleri için kullanılır. Bu netler aktif olarak sürülmediğinde üzerindeki yükü belirli bir süre korur ve ardından sönümlenir (decay).
- Güç seviyeleri: \`small\`, \`medium\` (varsayılan), \`large\`.
- Örnek: \`trireg (large) #(0, 0, 100) cap1;\` (100 zaman birimi sönümlenme süresi).`,
      },
      {
        title: "3. Sürüş Gücü Seviyeleri ve assign Bildirimi",
        content: `Sürüş güçleri hiyerarşisi en güçlüden en zayıfa doğru:
1. \`supply\`: Besleme gücü (en yüksek - VDD / GND)
2. \`strong\`: Standart kapı çıkışı gücü (varsayılan)
3. \`pull\`: Yukarı çekme / aşağı çekme direnci gücü (pull-up/pull-down)
4. \`large\`: Büyük kapasitans deşarj gücü
5. \`weak\`: Zayıf direnç seviyesi
6. \`medium\`: Orta boy kapasitans gücü
7. \`small\`: Küçük kapasitans gücü
8. \`highz\`: Yüksek empedans (sürüş yok)

Sözdizimi: \`assign (strength1, strength0) out = expr;\`
\`\`\`verilog
wire out;
assign (strong1, weak0) out = a & b; // 1'e kuvvetli, 0'a zayıf çeker
\`\`\`
Farklı güçteki iki sürücü çakıştığında güçlü olan kazanır; eşit güçte zıt değerler sürüldüğünde ise çıkış \`x\` olur.`,
      },
      {
        title: "4. supply0 ve supply1 Netleri ile Besleme Modellemesi",
        content: `\`supply0\` ve \`supply1\` netleri sırasıyla mantıksal 0 (GND) ve mantıksal 1 (VDD/VCC) hatlarını temsil eder. Sistemdeki en yüksek sürüş gücüne sahiptirler ve başka hiçbir zayıf sürücü bu hatların değerini değiştiremez. Çip seviyesi güç adası (power gating) ve statik polarizasyon testlerinde kullanılır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Strength** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-strength.v - Örnek Donanım Modülü",
          snippet: `trireg                          a_net;    // strength medium by default
trireg   (medium) #(0, 0, 100)  cap1;     // strength medium, charge decay time of 100 time units
trireg   (large)  [3:0]         cap2;     // strength large, no decay time`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-strength_tb.v - Simülasyon Testbench",
          snippet: `assign  (strength1, strength0) net = expression;`,
        },
      }

    ],
    playground: {
      initialCode: `trireg                          a_net;    // strength medium by default
trireg   (medium) #(0, 0, 100)  cap1;     // strength medium, charge decay time of 100 time units
trireg   (large)  [3:0]         cap2;     // strength large, no decay time`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Strength ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-namespace": {
    id: "verilog-namespace",
    badge: "Bölüm 26 • İleri Konular (UDP, specify, strength)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Namespace",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 26: İleri Konular (UDP, specify, strength). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Verilog İsim Alanları (Namespaces) ve Tanımlayıcı Yönetimi",
        content: `Verilog'da isim alanları (namespaces), modüller, değişkenler, görevler ve makrolar gibi tanımlayıcıların (identifiers) isim çakışmalarını önlemek ve kod modülerliğini korumak için sınırlarını belirler. Verilog standardı iki genel (global) ve birden fazla yerel (local) isim alanı tanımlar.`,
      },
      {
        title: "2. Küresel İsim Alanı (Global Namespaces)",
        content: `Küresel isim alanları tüm tasarım dosyaları genelinde geçerlidir:
1. **Tanımlar İsim Alanı (Definitions Namespace)**: Modül (\`module\`), primitif (\`primitive\`) ve yapılandırma (\`config\`) isimlerini içerir. Aynı isimde iki modül tanımlanamaz.
2. **Metin Makroları İsim Alanı (Text Macro Namespace)**: \`\` \`define \`\` ile tanımlanan tüm makrolar küreseldir ve derleme süresince tüm dosyalarda geçerlidir.`,
      },
      {
        title: "3. Yerel İsim Alanları (Local Namespaces)",
        content: `Yerel isim alanları belirli yapılarla sınırlıdır:
- **Modül İsim Alanı**: Modül içindeki tel (\`wire\`), değişken (\`reg\`), parametre ve port isimleri.
- **Port İsim Alanı**: Modül port listesi.
- **Blok İsim Alanı**: İsimlendirilmiş bloklar (\`begin : block_name\`), görevler (\`task\`) ve fonksiyonlar (\`function\`).
- **Specify İsim Alanı**: \`specify\` bloğu içindeki \`specparam\` parametreleri.`,
      },
      {
        title: "4. Blok İsim Alanı ve Kapsam İzolasyonu (Block Namespace)",
        content: `İsimlendirilmiş bir \`begin ... end\` bloğu veya bir \`task\`/\`function\`, kendi yerel değişkenlerini tanımlayabileceği izole bir isim alanı oluşturur:

\`\`\`verilog
module example;
  reg signal; // Modül seviyesinde 'signal'

  task myTask;
    reg signal; // myTask kapsamına özel 'signal'
    begin : inner_block
      reg signal; // inner_block kapsamına özel 'signal'
    end
  endtask
endmodule
\`\`\`
Her bir \`signal\` değişkeni kendi yerel kapsamında geçerlidir ve birbirinin değerini ezmez.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Namespace** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-namespace.v - Örnek Donanım Modülü",
          snippet: `module A;
  // Statements
endmodule

// cannot use 'module A' because it is already declared in global namespace
module B;  
  // Statements
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module A;
  // Statements
endmodule

// cannot use 'module A' because it is already declared in global namespace
module B;  
  // Statements
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Namespace ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-hierarchical-reference-scope": {
    id: "verilog-hierarchical-reference-scope",
    badge: "Bölüm 26 • İleri Konular (UDP, specify, strength)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Hierarchical Reference Scope",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 26: İleri Konular (UDP, specify, strength). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Hiyerarşik Başvuru Kapsamı (Hierarchical Reference Scope)",
        content: `Verilog'da her modül örneği (\`instance\`), görev, fonksiyon ve isimlendirilmiş blok hiyerarşik bir ağaç yapısı oluşturur. Nokta (\`.\`) operatörü kullanılarak tasarımın herhangi bir noktasındaki sinyale veya göreve tam hiyerarşik yol (full hierarchical path) ile erişilebilir.`,
      },
      {
        title: "2. Aşağı Doğru Hiyerarşik Erişim (Downward Referencing)",
        content: `En üst düzey modülden (top-level) alt modüllere doğru erişimdir:

\`\`\`verilog
module tb;
  A uA();
  B uB();

  initial begin : TB_INITIAL
    reg signal;
    #10 $display("signal=%0d", signal);
  end

  initial begin
    TB_INITIAL.signal = 0;
    uA.display();
    uB.B_INITIAL.B_INITIAL_BLOCK1.b_signal_1 = 1;
    uB.B_INITIAL.B_INITIAL_BLOCK2.b_signal_2 = 0;
  end
endmodule
\`\`\`
Bu yöntem testbench ortamında alt blokların dahili durumlarını gözlemlemek ve hata enjekte etmek (white-box verification) için çok yaygın kullanılır.`,
      },
      {
        title: "3. Yukarı Doğru İsim Çözümleme (Upward Referencing)",
        content: `Bir alt modül veya yaprak hücre, kendisini çevreleyen üst hiyerarşideki bir değişkene veya fonksiyona doğrudan ismiyle erişebilir. Simülatör önce geçerli blokta arar; bulamazsa bir üst modüle, ardından ana modülün en dış kapsamına doğru yukarı çıkarak değişkeni çözümler:

\`\`\`verilog
module A;
  task display();
    $display("A modülü çalışıyor");
    #5 TB_INITIAL.signal = 1; // Üst hiyerarşideki TB_INITIAL bloğuna erişim
  endtask
endmodule
\`\`\``,
      },
      {
        title: "4. Hiyerarşik Başvuru ve Kapsam İpuçları (Tasarım ve Doğrulama Pratikleri)",
        content: `Sayısal tasarım ve doğrulama mühendisliğinde hiyerarşik referans kullanımı için kritik kurallar:
1. **Sentezlenebilir RTL Kuralı**: Sentezlenebilir RTL kodları içinde ASLA çapraz modül hiyerarşik referansı (\`u_top.u_sub.sig\`) kullanılmamalıdır! Sentez araçları çapraz modül hiyerarşik yollarını donanıma dönüştüremez; bu yapılar kesinlikle testbench doğrulaması ile sınırlandırılmalıdır.
2. **Doğrulama İzolasyonu**: Testbench'te doğrudan alt modül sinyallerine bağlanmak (white-box) yerine mümkün olduğunca standart arayüzler ve portlar üzerinden (black-box) doğrulama tercih edilmelidir; aksi takdirde alt modüldeki en ufak bir sinyal adı değişikliği testbench'i kırar.
3. **Dalga Biçimi ve Hata Ayıklama**: \`$dumpvars\` ve SVA (SystemVerilog Assertions) tanımlarında hedef sinyal yolunu netleştirmek ve log çıktılarında tam sinyal adını görmek için hiyerarşik yollar vazgeçilmez bir araçtır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Hierarchical Reference Scope** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-hierarchical-reference-scope.v - Örnek Donanım Modülü",
          snippet: `module tb;
	reg signal;
	
	// Another variable cannot be declared with
	// an already existing name in the same scope
	reg signal;
	
	// However, the name 'signal' can be reused inside
	// a task because it belongs to a different scope.
	task display();
		reg signal = 1;
		$display("signal = %0b", signal);
	endtask
	
endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-hierarchical-reference-scope_tb.v - Simülasyon Testbench",
          snippet: `module tb;

	// Create two instances of different modules
	A uA();
	B uB();
	
	// Create a named block that declares a signal and 
	// prints the value at 10ns from simulation start
	initial begin : TB_INITIAL
		reg signal;
      #10 $display("signal=%0d", signal);      
	end
  
  	// We'll try to access other scopes using hierarchical
  	// references from this initial block
  	initial begin
  	  TB_INITIAL.signal = 0;
      uA.display();
      
      uB.B_INITIAL.B_INITIAL_BLOCK1.b_signal_1 = 1;
      uB.B_INITIAL.B_INITIAL_BLOCK2.b_signal_2 = 0;
    end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module tb;
	reg signal;
	
	// Another variable cannot be declared with
	// an already existing name in the same scope
	reg signal;
	
	// However, the name 'signal' can be reused inside
	// a task because it belongs to a different scope.
	task display();
		reg signal = 1;
		$display("signal = %0b", signal);
	endtask
	
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Hierarchical Reference Scope ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-scheduling-semantics": {
    id: "verilog-scheduling-semantics",
    badge: "Bölüm 26 • İleri Konular (UDP, specify, strength)",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Scheduling Semantics",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 26: İleri Konular (UDP, specify, strength). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Verilog Zamanlama Anlambilimi (Scheduling Semantics)",
        content: `Verilog, donanımın doğası gereği paralel çalışan milyarlarca transistörü ve kapıyı tek çekirdekli veya çok çekirdekli bir bilgisayar üzerinde simüle edebilmek için katı bir zamanlama anlambilimine (scheduling semantics) sahiptir. Prosedürel bloklar (\`always\`, \`initial\`) ve sürekli atamalar (\`assign\`) simülasyon zamanı boyunca olaylar oluştukça yürütülür.`,
      },
      {
        title: "2. Olay Türleri: Güncelleme ve Değerlendirme Olayları",
        content: `- **Güncelleme Olayı (Update Event)**: Bir register veya telin mantık değerinin değişmesi (örn. saat sinyalinin 0'dan 1'e geçmesi).
- **Değerlendirme Olayı (Evaluation Event)**: Değeri güncellenen sinyale duyarlı olan süreçlerin (\`always @(posedge clk)\` veya \`assign out = in1 & in2\`) çalıştırılarak yeni sonuçların hesaplanması.

Bu iki olay tipi simülasyon zaman adımı içinde ardışık döngüler halinde birbirini tetikler ve olay kuyruğuna (event queue) yerleştirilir.`,
      },
      {
        title: "3. Olay Kuyruğu Mimarisi ve Simülasyon Zamanı İlerlemesi",
        content: `Simülatör, bir zaman diliminde (time slot) gerçekleşecek tüm olayları kuyruğa yerleştirir. O anki zaman adımındaki tüm aktif, inaktif ve bloklamayan atama olayları tükendiğinde simülatör zamanı bir sonraki olayın gerçekleşeceği simülasyon anına ilerletir.`,
      },
      {
        title: "4. Aktif Bölge Yürütme Kuralları ve Yarış Durumları (Race Conditions)",
        content: `Aktif bölgedeki olaylar simülatör tarafından rastgele bir sırada işlenebilir. Bu durum bloklayan atamalar (\`=\`) kullanıldığında yarış durumlarına (race condition) neden olabilir:

\`\`\`verilog
// YARIŞ DURUMU (HATALI KOD):
always @(posedge clk) a = b;
always @(posedge clk) b = a;
\`\`\`
Hangi \`always\` bloğunun önce çalışacağı standart tarafından garanti edilmez; dolayısıyla simülatörden simülatöre sonuç değişebilir.

**ÇÖZÜM**: Ardışıl mantıkta (sequential logic) DAİMA bloklamayan atama (\`<=\`) kullanılmalıdır! Bloklamayan atamaların sağ tarafı Aktif bölgede hesaplanır, ataması ise NBA bölgesine ertelenir; böylece yarış durumları tamamen ortadan kalkar.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Scheduling Semantics** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-scheduling-semantics.v - Örnek Donanım Modülü",
          snippet: `module tb;
	reg a, b, c;
	wire d;
	
	// 'always' is a process that gets evaluated when either 'a' or 'b' is updated. 
	// When 'a' or 'b' changes in value it is called an 'update event'. When 'always'
	// block is triggered because of a change in 'a' or 'b' it is called an evaluation
	// event
	always @ (a or b) begin
		c = a & b;
	end
	
	// Here 'assign' is a process which is evaluated when either 'a' or 'b' or 'c'
	// gets updated
	assign d = a | b ^ c;
endmodule`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-scheduling-semantics_tb.v - Simülasyon Testbench",
          snippet: `module tb;
	reg x, y, z
	
	initial begin
		#1 	x = 1;
			y = 1;
		#1 	z = 0;
	end
endmodule`,
        },
      }

    ],
    playground: {
      initialCode: `module tb;
	reg a, b, c;
	wire d;
	
	// 'always' is a process that gets evaluated when either 'a' or 'b' is updated. 
	// When 'a' or 'b' changes in value it is called an 'update event'. When 'always'
	// block is triggered because of a change in 'a' or 'b' it is called an evaluation
	// event
	always @ (a or b) begin
		c = a & b;
	end
	
	// Here 'assign' is a process which is evaluated when either 'a' or 'b' or 'c'
	// gets updated
	assign d = a | b ^ c;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Scheduling Semantics ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
};
