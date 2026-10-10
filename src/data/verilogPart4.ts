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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri Şeması](/images/verilog/gate_io_table_1.png)

![Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri Şeması](/images/verilog/gate_io_table_2.png)

![Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri Şeması](/images/verilog/gate_io_table_3.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Gate Level Modeling Gate Level Modeling Gate Level Modeling Most digital designs are done at a higher level of abstraction like RTL, although at times it becomes intuitive to build smaller deterministic circuits at a lower level by using combinational elements like and and or . Modeling done at this level is usually called gate level modeling as it involves gates and has a one to one relation between a hardware schematic and the Verilog code. Verilog supports a few basic logic gates known as primitives as they can be instantiated like modules since they are already predefined. Other complex behavior can be defined under Verilog User Defined Primitives . Gate Types Syntax Description and and u0(out, i1, i2, …) Performs AND operation on two or more inputs or or u0(out, i1, i2, …) Performs OR operation on two or more inputs xor xor u0(out, i1, i2, …) Performs XOR operation on two or more inputs nand nand u0(out, i1, i2, …) Performs NAND operation on two or more inputs nor nor u0(out, i1, i2, …) Performs NOR operation on two or more inputs xnor xnor u0(out, i1, i2, …) Performs XNOR operation on two or more inputs buf buf u0(out, in) The buffer (buf) passes input to the output as it is. It has only one scalar input and one or more scalar outputs. not not u0(out, in) The not passes input to the output as an inverted version. It has only one scalar input and one or more scalar outputs. bufif1 bufif1 u0(out, in, control) It is the same as buf with additional control over the buf gate and drives input signal only when a control signal is 1. notif1 notif1 u0(out, in, control) It is the same as not having additional control over the not gate and drives input signal only when a control signal is 1. bufif0 bufif0 u0(out, in, control) It is the same as buf with additional inverted control over the buf gate and drives input signal only when a control signal is 0 notif0 notif0 u0(out, in, control) It is the same as not with additional inverted control over the not gate and drives input signal only when a control signal is 0.`,
      },
      {
        title: "4. And/Or/Xor Gates",
        content: `These primitives implement an AND and an OR gate which takes many scalar inputs and provide a single scalar output. The first terminal in the list of arguments to these primitives is the output which gets updated whenever any of the inputs change. module gates ( input a, b, output c, d, e); and (c, a, b); // c is the output, a and b are inputs or (d, a, b); // d is the output, a and b are inputs xor (e, a, b); // e is the output, a and b are inputs endmodule module tb; reg a, b; wire c, d, e; integer i; gates u0 ( .a(a), .b(b), .c(c), .d(d), .e(e)); initial begin {a, b} = 0; $monitor ("[T=%0t a=%0b b=%0b c(and)=%0b d(or)=%0b e(xor)=%0b", $time, a, b, c, d, e); for (i = 0; i < 10; i = i+1) begin #1 a <= $random; b <= $random; end end endmodule Output $ /usr/bin/vvp simulation +random_seed+1492585514 [T=0 a=0 b=0 c(and)=0 d(or)=0 e(xor)=0 [T=1 a=0 b=1 c(and)=0 d(or)=1 e(xor)=1 [T=2 a=1 b=1 c(and)=1 d(or)=1 e(xor)=0 [T=4 a=1 b=0 c(and)=0 d(or)=1 e(xor)=1 [T=5 a=1 b=1 c(and)=1 d(or)=1 e(xor)=0 [T=6 a=0 b=1 c(and)=0 d(or)=1 e(xor)=1 [T=7 a=1 b=0 c(and)=0 d(or)=1 e(xor)=1 [T=10 a=1 b=1 c(and)=1 d(or)=1 e(xor)=0 `,
      },
      {
        title: "5. Nand/Nor/Xnor Gates",
        content: `The inverse of all the above gates are also available in the forms of nand , nor and xnor . The same design from above is reused with the exception that the primitives are switched with their inverse versions. module gates ( input a, b, output c, d, e); // Use nand, nor, xnor instead of and, or and xor // in this example nand (c, a, b); // c is the output, a and b are inputs nor (d, a, b); // d is the output, a and b are inputs xnor (e, a, b); // e is the output, a and b are inputs endmodule module tb; reg a, b; wire c, d, e; integer i; gates u0 ( .a(a), .b(b), .c(c), .d(d), .e(e)); initial begin {a, b} = 0; $monitor ("[T=%0t a=%0b b=%0b c(nand)=%0b d(nor)=%0b e(xnor)=%0b", $time, a, b, c, d, e); for (i = 0; i < 10; i = i+1) begin #1 a <= $random; b <= $random; end end endmodule Output $ /usr/bin/vvp simulation +random_seed+622900489 [T=0 a=0 b=0 c(nand)=1 d(nor)=1 e(xnor)=1 [T=1 a=0 b=1 c(nand)=1 d(nor)=0 e(xnor)=0 [T=2 a=1 b=1 c(nand)=0 d(nor)=0 e(xnor)=1 [T=4 a=1 b=0 c(nand)=1 d(nor)=0 e(xnor)=0 [T=5 a=1 b=1 c(nand)=0 d(nor)=0 e(xnor)=1 [T=6 a=0 b=1 c(nand)=1 d(nor)=0 e(xnor)=0 [T=7 a=1 b=0 c(nand)=1 d(nor)=0 e(xnor)=0 [T=10 a=1 b=1 c(nand)=0 d(nor)=0 e(xnor)=1 These gates can have more than two inputs. module gates ( input a, b, c, d, output x, y, z); and (x, a, b, c, d); // x is the output, a, b, c, d are inputs or (y, a, b, c, d); // y is the output, a, b, c, d are inputs nor (z, a, b, c, d); // z is the output, a, b, c, d are inputs endmodule module tb; reg a, b, c, d; wire x, y, z; integer i; gates u0 ( .a(a), .b(b), .c(c), .d(d), .x(x), .y(y), .z(z)); initial begin {a, b, c, d} = 0; $monitor ("[T=%0t a=%0b b=%0b c=%0b d=%0b x=%0b y=%0b z=%0b", $time, a, b, c, d, x, y, z); for (i = 0; i < 10; i = i+1) begin #1 a <= $random; b <= $random; c <= $random; d <= $random; end end endmodule Output $ /usr/bin/vvp simulation +random_seed+1394207508 [T=0 a=0 b=0 c=0 d=0 x=0 y=0 x=1 [T=1 a=0 b=1 c=1 d=1 x=0 y=1 x=0 [T=2 a=1 b=1 c=1 d=0 x=0 y=1 x=0 [T=3 a=1 b=1 c=0 d=1 x=0 y=1 x=0 [T=4 a=1 b=0 c=1 d=0 x=0 y=1 x=0 [T=5 a=1 b=0 c=1 d=1 x=0 y=1 x=0 [T=6 a=0 b=1 c=0 d=0 x=0 y=1 x=0 [T=7 a=0 b=1 c=0 d=1 x=0 y=1 x=0 [T=8 a=1 b=1 c=1 d=0 x=0 y=1 x=0 [T=9 a=0 b=0 c=0 d=1 x=0 y=1 x=0 [T=10 a=0 b=1 c=1 d=1 x=0 y=1 x=0 `,
      },
      {
        title: "6. Buf/Not Gates",
        content: `These gates have only one scalar input and one or more outputs. buf stands for a buffer and simply transfer the value from input to the output without any change in polarity. not stands for an inverter which inverts the polarity of the signal at its input. So a 0 at its input will yield a 1 and vice versa. module gates ( input a, output c, d); buf (c, a); // c is the output, a is input not (d, a); // d is the output, a is input endmodule module tb; reg a; wire c, d; integer i; gates u0 ( .a(a), .c(c), .d(d)); initial begin a = 0; $monitor ("[T=%0t a=%0b c(buf)=%0b d(not)=%0b", $time, a, c, d); for (i = 0; i < 10; i = i+1) begin #1 a <= $random; end end endmodule Output $ /usr/bin/vvp simulation +random_seed+1384864616 [T=0 a=0 c(buf)=0 d(not)=1 [T=2 a=1 c(buf)=1 d(not)=0 [T=8 a=0 c(buf)=0 d(not)=1 [T=9 a=1 c(buf)=1 d(not)=0  The last terminal in the port list connects to the input of the gate and all other terminals connect to the output port of the gate. Here is an example of a multiple output buffer, although it is rarely used. module gates ( input a, output c, d); not (c, d, a); // c,d is the output, a is input endmodule Output xcelium> run [T=0 a=0 c=1 d=1 [T=2 a=1 c=0 d=0 [T=8 a=0 c=1 d=1 [T=9 a=1 c=0 d=0 xmsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Kapı Seviyesi Modelleme: and, or, nand, xor, not Primitifleri** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Gate Level Modeling Verilog Gate Level Examples Verilog Gate Level Examples Some of the main built-in primitives were discussed in the previous article and it would be good to see some practical examples of using simple and , nor and not gates. Note that in order to write the Verilog code using gates, it is necessary for you to know how to connect the elements. This is very different from a behavioral description in which case the selection and connection of elements is left upto the synthesis tools.`,
      },
      {
        title: "3. Example #1: 2x1 Multiplexer",
        content: `Output of module has to be of type wire in order to connect with the output port of a primitive. module mux_2x1 ( input a, b, sel, output out); wire sel_n; wire out_0; wire out_1; not (sel_n, sel); and (out_0, a, sel); and (out_1, b, sel_n); or (out, out_0, out_1); endmodule module tb; reg a, b, sel; wire out; integer i; mux_2x1 u0 ( .a(a), .b(b), .sel(sel), .out(out)); initial begin {a, b, sel} <= 0; $monitor ("T=%0t a=%0b b=%0b sel=%0b out=%0b", $time, a, b, sel, out); for (int i = 0; i < 10; i = i+1) begin #1 a <= $random; b <= $random; sel <= $random; end end endmodule Output ncsim> run T=0 a=0 b=0 sel=0 out=0 T=1 a=0 b=1 sel=1 out=0 T=2 a=1 b=1 sel=1 out=1 T=3 a=1 b=0 sel=1 out=1 T=6 a=0 b=1 sel=0 out=1 T=7 a=1 b=1 sel=0 out=1 T=8 a=1 b=0 sel=0 out=0 T=9 a=0 b=1 sel=0 out=1 T=10 a=1 b=1 sel=1 out=1 ncsim: *W,RNQUIE: Simulation is complete.`,
      },
      {
        title: "4. Full Adder",
        content: `module fa ( input a, b, cin, output sum, cout); wire s1, net1, net2; xor (s1, a, b); and (net1, a, b); xor (sum, s1, cin); and (net2, s1, cin); or (cout, net1, net2); endmodule module tb; reg a, b, cin; wire sum, cout; integer i; fa u0 ( .a(a), .b(b), .cin(cin), .sum(sum), .cout(cout)); initial begin {a, b, cin} <= 0; $monitor ("T=%0t a=%0b b=%0b cin=%0b cout=%0b sum=%0b", $time, a, b, cin, cout, sum); for (i = 0; i < 10; i = i+1) begin #1 a <= $random; b <= $random; cin <= $random; end end endmodule Output ncsim> run T=0 a=0 b=0 cin=0 cout=0 sum=0 T=1 a=0 b=1 cin=1 cout=1 sum=0 T=2 a=1 b=1 cin=1 cout=1 sum=1 T=3 a=1 b=0 cin=1 cout=1 sum=0 T=6 a=0 b=1 cin=0 cout=0 sum=1 T=7 a=1 b=1 cin=0 cout=1 sum=0 T=8 a=1 b=0 cin=0 cout=0 sum=1 T=9 a=0 b=1 cin=0 cout=0 sum=1 T=10 a=1 b=1 cin=1 cout=1 sum=1 ncsim: *W,RNQUIE: Simulation is complete.`,
      },
      {
        title: "5. 2x4 Decoder",
        content: `module dec_2x4 ( input x, y, en, output a, b, c, d); wire x_n, y_n; not (x_n, x); not (y_n, y); and (a, x, y, en); and (b, x, y_n, en); and (c, x_n, y, en); and (d, x_n, y_n, en); endmodule module tb; reg x, y, en; wire a, b, c, d; integer i; dec_2x4 u0 ( .x(x), .y(y), .en(en), .a(a), .b(b), .c(c), .d(d)); initial begin {x, y, en} <= 0; $monitor ("T=%0t x=%0b y=%0b en=%0b a=%0b b=%0b c=%0b d=%0b", $time, x, y, en, a, b, c, d); en <= 1; for (i = 0; i < 10; i = i+1) begin #1 x <= $random; y <= $random; end end endmodule Output ncsim> run T=0 x=0 y=0 en=1 a=0 b=0 c=0 d=1 T=1 x=0 y=1 en=1 a=0 b=0 c=1 d=0 T=2 x=1 y=1 en=1 a=1 b=0 c=0 d=0 T=4 x=1 y=0 en=1 a=0 b=1 c=0 d=0 T=5 x=1 y=1 en=1 a=1 b=0 c=0 d=0 T=6 x=0 y=1 en=1 a=0 b=0 c=1 d=0 T=7 x=1 y=0 en=1 a=0 b=1 c=0 d=0 T=10 x=1 y=1 en=1 a=1 b=0 c=0 d=0 ncsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Kapı Seviyesinde Yükselme, Düşme ve Kapanma Gecikmeleri** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Kapı Seviyesinde Yükselme, Düşme ve Kapanma Gecikmeleri** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Kapı Seviyesinde Yükselme, Düşme ve Kapanma Gecikmeleri Şeması](/images/verilog/verilog_gate_delays.png)

![Kapı Seviyesinde Yükselme, Düşme ve Kapanma Gecikmeleri Şeması](/images/verilog/gate-delay-three-delay-timing.svg)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Gate Level Modeling Verilog Gate Delay Verilog Gate Delay Digital signals are treated as 0s and 1s, but in real hardware a gate output does not change at the same instant its inputs do. Transistors need time to charge and discharge the output, so every gate has a propagation delay . Verilog lets you attach these delays to gate primitives , so that a simulation shows not only what a circuit computes, but also when each output changes. 10 min read | Beginner Level`,
      },
      {
        title: "4. What You'll Learn",
        content: `The difference between rise, fall and turn-off delays How to specify one, two or three delays on a primitive, and which delay applies to each transition How min:typ:max delays model the spread between fast and slow chips Why short pulses can disappear, and why synthesis ignores all of these delays`,
      },
      {
        title: "5. Rise, Fall and Turn-Off Delays",
        content: `An output can change in different directions, and real gates are usually faster in one direction than the other. Verilog therefore lets you give each kind of transition its own delay: Delay Transition Meaning Rise delay 0, x or z to 1 Time for the output to rise to 1 Fall delay 1, x or z to 0 Time for the output to fall to 0 Turn-off delay 0, 1 or x to z Time for a tri-state output to stop driving and go to high impedance A transition to x uses the smallest of the delays given, because the simulator reports an unknown value as early as it could possibly appear. Delays can be applied to nets as well as gate outputs, but this article focuses on primitives. Synthesis result: None. Synthesis tools ignore every # delay in the design, usually with a warning. The real delays of the synthesized circuit come from the target library and from the placed and routed layout, not from numbers in the Verilog code. Gate delays are a simulation feature: they are used in testbench models, in gate-level netlists that carry timing, and to make waveforms easier to read.`,
      },
      {
        title: "6. Gate-Level Simulation with Real Timing",
        content: `After layout, timing tools calculate the actual delay of every cell and wire in the chip and write them to a delay file. Verification engineers load that file into a gate-level simulation of the netlist, which replaces the delays of each cell instance with these real values. This catches problems that zero-delay RTL simulation cannot show, such as a reset that arrives too late or a glitch on an asynchronous signal.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Switch Level Modeling** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Switch Level Modeling** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Gate Level Modeling Switch Level Modeling Switch Level Modeling Verilog also provides support for transistor level modeling although it is rarely used by designers these days as the complexity of circuits have required them to move to higher levels of abstractions rather than use switch level modeling.`,
      },
      {
        title: "3. NMOS/PMOS",
        content: `module des (input d, ctrl, output outn, outp); nmos (outn, d, ctrl); pmos (outp, d, ctrl); endmodule module tb; reg d, ctrl; wire outn, outp; des u0 (.d(d), .ctrl(ctrl), .outn(outn), .outp(outp)); initial begin {d, ctrl} <= 0; $monitor ("T=%0t d=%0b ctrl=%0b outn=%0b outp=%0b", $time, d, ctrl, outn, outp); #10 d <= 1; #10 ctrl <= 1; #10 ctrl <= 0; #10 d <= 0; end endmodule Output ncsim> run T=0 d=0 ctrl=0 outn=z outp=0 T=10 d=1 ctrl=0 outn=z outp=1 T=20 d=1 ctrl=1 outn=1 outp=z T=30 d=1 ctrl=0 outn=z outp=1 T=40 d=0 ctrl=0 outn=z outp=0 ncsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "4. CMOS Switches",
        content: `module des (input d, nctrl, pctrl, output out); cmos (out, d, nctrl, pctrl); endmodule module tb; reg d, nctrl, pctrl; wire out; des u0 (.d(d), .nctrl(nctrl), .pctrl(pctrl), .out(out)); initial begin {d, nctrl, pctrl} <= 0; $monitor ("T=%0t d=%0b nctrl=%0b pctrl=%0b out=%0b", $time, d, nctrl, pctrl, out); #10 d <= 1; #10 nctrl <= 1; #10 pctrl <= 1; #10 nctrl <= 0; #10 pctrl <= 0; #10 d <= 0; #10; end endmodule Output ncsim> run T=0 d=0 nctrl=0 pctrl=0 out=0 T=10 d=1 nctrl=0 pctrl=0 out=1 T=20 d=1 nctrl=1 pctrl=0 out=1 T=30 d=1 nctrl=1 pctrl=1 out=1 T=40 d=1 nctrl=0 pctrl=1 out=z T=50 d=1 nctrl=0 pctrl=0 out=1 T=60 d=0 nctrl=0 pctrl=0 out=0 ncsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "5. tran",
        content: `module des (input io1, ctrl, output io2); tran (io1, io2); endmodule module tb; reg io1, ctrl; wire io2; des u0 (.io1(io1), .ctrl(ctrl), .io2(io2)); initial begin {io1, ctrl} <= 0; $monitor ("T=%0t io1=%0b ctrl=%0b io2=%0b", $time, io1, ctrl, io2); #10 io1 <= 1; #10 ctrl <= 1; #10 ctrl <= 0; #10 io1 <= 0; end endmodule Output ncsim> run T=0 io1=0 ctrl=0 io2=0 T=10 io1=1 ctrl=0 io2=1 T=20 io1=1 ctrl=1 io2=1 T=30 io1=1 ctrl=0 io2=1 T=40 io1=0 ctrl=0 io2=0 ncsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Delay Control** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Delay Control** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Timing & Delays Verilog Delay Control Verilog Delay Control There are two types of timing controls in Verilog - delay and event expressions. The delay control is just a way of adding a delay between the time the simulator encounters the statement and when it actually executes it. The event expression allows the statement to be delayed until the occurrence of some simulation event which can be a change of value on a net or variable ( implicit event ) or an explicitly named event that is triggered in another procedure. Simulation time can be advanced by one of the following methods. Gates and nets that have been modeled to have internal delays also advance simulation time.`,
      },
      {
        title: "3. Delay Control",
        content: `If the delay expression evaluates to an unknown or high-impedance value it will be interpreted as zero delay. If it evaluates to a negative value, it will be interpreted as a 2's complement unsigned integer of the same size as a time variable. \`timescale 1ns/1ps module tb; reg [3:0] a, b; initial begin {a, b} <= 0; $display ("T=%0t a=%0d b=%0d", $realtime, a, b); #10; a <= $random; $display ("T=%0t a=%0d b=%0d", $realtime, a, b); #10 b <= $random; $display ("T=%0t a=%0d b=%0d", $realtime, a, b); #(a) $display ("T=%0t After a delay of a=%0d units", $realtime, a); #(a+b) $display ("T=%0t After a delay of a=%0d + b=%0d = %0d units", $realtime, a, b, a+b); #((a+b)*10ps) $display ("T=%0t After a delay of %0d * 10ps", $realtime, a+b); #(b-a) $display ("T=%0t Expr evaluates to a negative delay", $realtime); #('h10) $display ("T=%0t Delay in hex", $realtime); a = 'hX; #(a) $display ("T=%0t Delay is unknown, taken as zero a=%h", $realtime, a); a = 'hZ; #(a) $display ("T=%0t Delay is in high impedance, taken as zero a=%h", $realtime, a); #1ps $display ("T=%0t Delay of 1ps", $realtime); end endmodule Note that the precision of timescale is in 1ps and hence $realtime is required to display the precision value for the statement with a delay expression (a+b)*10ps. Output xcelium> run T=0 a=x b=x T=10000 a=0 b=0 T=20000 a=4 b=0 T=24000 After a delay of a=4 units T=29000 After a delay of a=4 + b=1 = 5 units T=29050 After a delay of 5 * 10ps T=42050 Expr evaluates to a negative delay T=58050 Delay in hex T=58050 Delay is unknown, taken as zero a=x T=58050 Delay is in high impedance, taken as zero a=z T=58051 Delay of 1ps xmsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "4. Event Control",
        content: `Value changes on nets and variables can be used as a synchronization event to trigger execution other procedural statements and is an implicit event. The event can also be based on the direction of change like towards 0 which makes it a negedge and a change towards 1 makes it a posedge . A negedge is when there is a transition from 1 to X, Z or 0 and from X or Z to 0 A posedge is when there is a transition from 0 to X, Z or 1 and from X or Z to 1 A transition from the same state to the same state is not considered as an edge. An edge event like posedge or negedge can be detected only on the LSB of a vector signal or variable. If an expression evaluates to the same result it cannot be considered as an event. module tb; reg a, b; initial begin a <= 0; #10 a <= 1; #10 b <= 1; #10 a <= 0; #15 a <= 1; end // Start another procedural block that waits for an update to // signals made in the above procedural block initial begin @(posedge a); $display ("T=%0t Posedge of a detected for 0->1", $time); @(posedge b); $display ("T=%0t Posedge of b detected for X->1", $time); end initial begin @(posedge (a + b)) $display ("T=%0t Posedge of a+b", $time); @(a) $display ("T=%0t Change in a found", $time); end endmodule Output ncsim> run T=10 Posedge of a detected for 0->1 T=20 Posedge of b detected for X->1 T=30 Posedge of a+b T=45 Change in a found ncsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "5. Named Events",
        content: `The keyword event can be used to declare a named event which can be triggered explicitly. An event cannot hold any data, has no time duration and can be made to occur at any particular time. A named event is triggered by the -> operator by prefixing it before the named event handle. A named event can be waited upon by using the @ operator described above. module tb; event a_event; event b_event[5]; initial begin #20 -> a_event; #30; ->a_event; #50 ->a_event; #10 ->b_event[3]; end always @ (a_event) $display ("T=%0t [always] a_event is triggered", $time); initial begin #25; @(a_event) $display ("T=%0t [initial] a_event is triggered", $time); #10 @(b_event[3]) $display ("T=%0t [initial] b_event is triggered", $time); end endmodule Named events can be used to synchronize two or more concurrently running processes. For example, the always block and the second initial block are synchronized by a_event . Events can be declared as arrays like in the case of b_event which is an array of size 5 and the index 3 is used for trigger and wait purpose. Output ncsim> run T=20 [always] a_event is triggered T=50 [always] a_event is triggered T=50 [initial] a_event is triggered T=100 [always] a_event is triggered T=110 [initial] b_event is triggered ncsim: *W,RNQUIE: Simulation is complete.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        content: `Bu derste **Verilog Inter and Intra Assignment Delay** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Inter and Intra Assignment Delay** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Timing & Delays Verilog Inter and Intra Assignment Delay Verilog Inter and Intra Assignment Delay Verilog delay statements can have delays specified either on the left hand side or the right hand side of the assignment operator.`,
      },
      {
        title: "3. Inter-assignment Delays",
        content: `// Delay is specified on the left side #<delay> <LHS> = <RHS> An inter-assignment delay statement has delay value on the LHS of the assignment operator. This indicates that the statement itself is executed after the delay expires, and is the most commonly using form of delay control. module tb; reg a, b, c, q; initial begin $monitor("[%0t] a=%0b b=%0b c=%0b q=%0b", $time, a, b, c, q); // Initialize all signals to 0 at time 0 a <= 0; b <= 0; c <= 0; q <= 0; // Inter-assignment delay: Wait for #5 time units // and then assign a and c to 1. Note that 'a' and 'c' // gets updated at the end of current timestep #5 a <= 1; c <= 1; // Inter-assignment delay: Wait for #5 time units // and then assign 'q' with whatever value RHS gets // evaluated to #5 q <= a & b | c; #20; end endmodule Note that q becomes 1 at time 10 units because the statement gets evaluated at 10 time units and RHS which is a combination of a , b and c evaluates to 1. Output xcelium> run [0] a=0 b=0 c=0 q=0 [5] a=1 b=0 c=1 q=0 [10] a=1 b=0 c=1 q=1 xmsim: *W,RNQUIE: Simulation is complete.`,
      },
      {
        title: "4. Intra-assignment Delays",
        content: `// Delay is specified on the right side <LHS> = #<delay> <RHS> An intra-assignment delay is one where there is a delay on the RHS of the assignment operator. This indicates that the statement is evaluated and values of all signals on the RHS is captured first. Then it is assigned to the resultant signal only after the delay expires. module tb; reg a, b, c, q; initial begin $monitor("[%0t] a=%0b b=%0b c=%0b q=%0b", $time, a, b, c, q); // Initialize all signals to 0 at time 0 a <= 0; b <= 0; c <= 0; q <= 0; // Inter-assignment delay: Wait for #5 time units // and then assign a and c to 1. Note that 'a' and 'c' // gets updated at the end of current timestep #5 a <= 1; c <= 1; // Intra-assignment delay: First execute the statement // then wait for 5 time units and then assign the evaluated // value to q q <= #5 a & b | c; #20; end endmodule Note that the assignment to q is missing in the log ! Output xcelium> run [0] a=0 b=0 c=0 q=0 [5] a=1 b=0 c=1 q=0 xmsim: *W,RNQUIE: Simulation is complete. This is because at 5 time units, a and c are assigned using non-blocking statements. And the behavior of non-blocking statements is such that RHS is evaluated, but gets assigned to the variable only at the end of that time step. So value of a and c is evaluated to 1 but not yet assigned when the next non-blocking statement which is that of q is executed. So when RHS of q is evaluated, a and c still has old value of 0 and hence $monitor does not detect a change to display the statement. To observe the change, let us change assignment statements to a and c from non-blocking to blocking. ... // Non-blocking changed to blocking and rest of the // code remains the same #5 a = 1; c = 1; q <= #5 a & b | c; ... Output xcelium> run [0] a=0 b=0 c=0 q=0 [5] a=1 b=0 c=1 q=0 [10] a=1 b=0 c=1 q=1 xmsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **\`timescale Direktifi: Zaman Birimi ve Hassasiyet Ayarı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **\`timescale Direktifi: Zaman Birimi ve Hassasiyet Ayarı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![\`timescale Direktifi: Zaman Birimi ve Hassasiyet Ayarı Şeması](/images/verilog/timescale_1ns_1ns.png)

![\`timescale Direktifi: Zaman Birimi ve Hassasiyet Ayarı Şeması](/images/verilog/timescale_10ns_1ns.png)

![\`timescale Direktifi: Zaman Birimi ve Hassasiyet Ayarı Şeması](/images/verilog/timescale_1ns_1ps.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Timing & Delays Verilog Timescale Verilog Timescale Verilog simulation depends on how time is defined because the simulator needs to know what a #1 means in terms of time. The \`timescale compiler directive specifies the time unit and precision for the modules that follow it.`,
      },
      {
        title: "4. Syntax",
        content: `\`timescale <time_unit>/<time_precision> // Example \`timescale 1ns/1ps \`timescale 10us/100ns \`timescale 10ns/1ns The time_unit is the measurement of delays and simulation time while the time_precision specifies how delay values are rounded before being used in simulation. Use the following timescale constructs to use different time units in the same design. Remember that delay specifications in the design are not synthesizable and cannot be converted to hardware logic. \`timescale for base unit of measurement and precision of time $printtimescale system task to display time unit and precision $time and $realtime system functions return the current time and the default reporting format can be changed with another system task $timeformat . Character Unit s seconds ms milliseconds us microseconds ns nanoseconds ps picoseconds fs femtoseconds The integers in these specifications can be either 1, 10 or 100 and the character string that specifies the unit can take any value mentioned in the table above.`,
      },
      {
        title: "5. Example #1: 1ns/1ns",
        content: `// Declare the timescale where time_unit is 1ns // and time_precision is also 1ns \`timescale 1ns/1ns module tb; // To understand the effect of timescale, let us // drive a signal with some values after some delay reg val; initial begin // Initialize the signal to 0 at time 0 units val <= 0; // Advance by 1 time unit, display a message and toggle val #1 $display ("T=%0t At time #1", $realtime); val <= 1; // Advance by 0.49 time unit and toggle val #0.49 $display ("T=%0t At time #0.49", $realtime); val <= 0; // Advance by 0.50 time unit and toggle val #0.50 $display ("T=%0t At time #0.50", $realtime); val <= 1; // Advance by 0.51 time unit and toggle val #0.51 $display ("T=%0t At time #0.51", $realtime); val <= 0; // Let simulation run for another 5 time units and exit #5 $display ("T=%0t End of simulation", $realtime); end endmodule The first delay statement uses #1 which makes the simulator wait for exactly 1 time unit which is specified to be 1ns with \`timescale directive. The second delay statement uses 0.49 which is less than half a time unit. However the time precision is specified to be 1ns and hence the simulator cannot go smaller than 1 ns which makes it to round the given delay statement and yields 0ns. So the second delay fails to advance the simulation time. The third delay statement uses exactly half the time unit #0.5 and again the simulator will round the value to get #1 which represents one whole time unit. So this gets printed at T=2ns. The fourth delay statement uses a value more than half the time unit and gets rounded as well making the display statement to be printed at T=3ns. Output ncsim> run T=1 At time #1 T=1 At time #0.49 T=2 At time #0.50 T=3 At time #0.51 T=8 End of simulation ncsim: *W,RNQUIE: Simulation is complete. The simulation runs for 8ns as expected, but notice that the waveform does not have smaller divisions between each nanosecond. This is because the precision of time is the same as the time unit.`,
      },
      {
        title: "6. Example #2: 10ns/1ns",
        content: `The only change made in this example compared to the previous one is that the timescale has been changed from 1ns/1ns to 10ns/1ns. So the time unit is 10ns and precision is at 1ns. // Declare the timescale where time_unit is 10ns // and time_precision is 1ns \`timescale 10ns/1ns // NOTE: Testbench is the same as in previous example module tb; // To understand the effect of timescale, let us // drive a signal with some values after some delay reg val; initial begin // Initialize the signal to 0 at time 0 units val <= 0; // Advance by 1 time unit, display a message and toggle val #1 $display ("T=%0t At time #1", $realtime); val <= 1; // Advance by 0.49 time unit and toggle val #0.49 $display ("T=%0t At time #0.49", $realtime); val <= 0; // Advance by 0.50 time unit and toggle val #0.50 $display ("T=%0t At time #0.50", $realtime); val <= 1; // Advance by 0.51 time unit and toggle val #0.51 $display ("T=%0t At time #0.51", $realtime); val <= 0; // Let simulation run for another 5 time units and exit #5 $display ("T=%0t End of simulation", $realtime); end endmodule Actual simulation time is obtained by multiplying the delay specified using # with the time unit and then it is rounded off based on precision. The first delay statement will then yield 10ns and the second one gives 14.9 which gets rounded to become 15ns. The third statement similarly adds 5ns (0.5 * 10ns) and the total time becomes 20ns. The fourth one adds another 5ns (0.51 * 10) to advance total time to 25ns. Output ncsim> run T=10 At time #1 T=15 At time #0.49 T=20 At time #0.50 T=25 At time #0.51 T=75 End of simulation ncsim: *W,RNQUIE: Simulation is complete. Note that the base unit in waveform is in tens of nanoseconds with a precision of 1ns.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **\`timescale Direktifi: Zaman Birimi ve Hassasiyet Ayarı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-timescale.v - Örnek Donanım Modülü",
          snippet: `\`timescale <time_unit>/<time_precision>

// Example
\`timescale 1ns/1ps
\`timescale 10us/100ns
\`timescale 10ns/1ns`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-timescale_tb.v - Simülasyon Testbench",
          snippet: `// Declare the timescale where time_unit is 1ns
// and time_precision is also 1ns
\`timescale 1ns/1ns

module tb;
	// To understand the effect of timescale, let us 
	// drive a signal with some values after some delay
  reg val;
  
  initial begin
  	// Initialize the signal to 0 at time 0 units
    val <= 0;
    
    // Advance by 1 time unit, display a message and toggle val
    #1 		$display ("T=%0t At time #1", $realtime);
    val <= 1;
    
    // Advance by 0.49 time unit and toggle val
    #0.49 	$display ("T=%0t At time #0.49", $realtime);
    val <= 0;
    
    // Advance by 0.50 time unit and toggle val
    #0.50 	$display ("T=%0t At time #0.50", $realtime);
    val <= 1;
    
    // Advance by 0.51 time unit and toggle val
    #0.51 	$display ("T=%0t At time #0.51", $realtime);
    val <= 0;

		// Let simulation run for another 5 time units and exit
    #5 $display ("T=%0t End of simulation", $realtime);
  end
endmodule`,
        },
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Timescale Scope** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Timescale Scope** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Timing & Delays Verilog Timescale Scope Verilog Timescale Scope `,
      },
      {
        title: "3. Default timescale",
        content: `Although Verilog modules are expected to have a timescale defined before the module, simulators may insert a default timescale. The actual timescale that gets applied at any scope in a Verilog elaborated hierarchy can be printed using the system task $printtimescale which accepts the scope as an argument. module tb; initial begin // Print timescale of this module $printtimescale(tb); // $printtimescale($root); end endmodule See that even though a timescale directive was not placed before this module, simulator ended up applying a 1ns/1ns timescale value. Output xcelium> run Time scale of (tb) is 1ns / 1ns xmsim: *W,RNQUIE: Simulation is complete.`,
      },
      {
        title: "4. Standard timescale scope",
        content: `By default a timescale directive placed in a file is applied to all modules that follow the directive until the definition of another timescale directive. \`timescale 1ns/1ps module tb; des m_des(); alu m_alu(); initial begin $printtimescale(tb); $printtimescale(tb.m_alu); $printtimescale(tb.m_des); end endmodule module alu; endmodule \`timescale 1ns/10ps module des; endmodule In the above example, tb and alu end up with a timescale of 1ns/1ns while des gets a timescale of 1ns/10ps because of the placement of directive before module definition of des Output xcelium> run Time scale of (tb) is 1ns / 1ps Time scale of (tb.m_alu) is 1ns / 1ps Time scale of (tb.m_des) is 1ns / 10ps xmsim: *W,RNQUIE: Simulation is complete.`,
      },
      {
        title: "5. Scope between Verilog files",
        content: `Other files can be included into the current file using a \`include directive which is a pre-processor directive and makes the compiler place contents of the included file before compilation. So, this is equivalent to simply pasting the entire contents of the other file in this main file. // main.v \`timescale 1ns/1ps module tb; des m_des(); alu m_alu(); initial begin $printtimescale(tb); $printtimescale(tb.m_alu); $printtimescale(tb.m_des); end endmodule \`include "file_alu.v" \`include "file_des.v" // file_alu.v module alu; endmodule // file_des.v \`timescale 1ns/10ps module des; endmodule See that results are exactly the same as in previous example. alu gets a timescale of 1ns/1ps because it was last directive that stayed valid until the compiler found alu definition inspite of placing it in a different file. des gets a timescale of 1ns/10ps because the directive was replaced before its definition. Output xcelium> run Time scale of (tb) is 1ns / 1ps Time scale of (tb.m_alu) is 1ns / 1ps Time scale of (tb.m_des) is 1ns / 10ps xmsim: *W,RNQUIE: Simulation is complete.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-timescale-scope_tb.v - Simülasyon Testbench",
          snippet: `\`timescale 1ns/1ps

module tb;
  des m_des();
  alu m_alu();
  
  initial begin
    $printtimescale(tb);
    $printtimescale(tb.m_alu);
	$printtimescale(tb.m_des);
  end
endmodule

module alu;
  
endmodule

\`timescale 1ns/10ps

module des;
  
endmodule`,
        },
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Timeformat** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Timeformat** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Timing & Delays Verilog Timeformat Verilog Timeformat Verilog timescale directive specifies time unit and precision for simulations. Verilog $timeformat system function specifies %t format specifier reporting style in display statements like $display and $strobe .`,
      },
      {
        title: "3. Syntax",
        content: `$timeformat(<unit_number>, <precision>, <suffix_string>, <minimum field width>); unit_number is the smallest time precision out of all \`timescale directives used in source code precision represents the number of fractional digits for the current timescale suffix_string is an option to display the scale alongside the real time values Unit number Time unit -3 1ms -6 1us -9 1ns -12 1ps -15 1fs`,
      },
      {
        title: "4. Example #1: 1ns/1ps",
        content: `Here is an example of how $timeformat affects the format of time unit display. \`timescale 1ns/1ps module tb; bit a; initial begin // Wait for some time - note that because precision is 1/1000 of // the main scale (1ns), this delay will be truncated by the 3rd // position #10.512351; // Display current time with default timeformat parameters $display("[T=%0t] a=%0b", $realtime, a); // Change timeformat parameters and display again $timeformat(-9, 2, " ns"); $display("[T=%0t] a=%0b", $realtime, a); // Remove the space in suffix, and extend fractional digits to 5 $timeformat(-9, 5, "ns"); $display("[T=%0t] a=%0b", $realtime, a); // Here suffix is wrong, it should not be "ns" because we are // setting display in "ps" (-12) $timeformat(-12, 3, " ns"); $display("[T=%0t] a=%0b", $realtime, a); // Correct the suffix to ps $timeformat(-12, 2, " ps"); $display("[T=%0t] a=%0b", $realtime, a); end endmodule Output xcelium> run [T=10512] a=0 [T=10.51 ns] a=0 [T=10.51200ns] a=0 [T=10512.000 ns] a=0 [T=10512.00 ps] a=0 xmsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "5. Example #2: 1ns/100ps",
        content: `Here is the same example from above with a different timescale. \`timescale 1ns/100ps Output xcelium> run [T=105] a=0 [T=10.50 ns] a=0 [T=10.50000ns] a=0 [T=10500.000 ns] a=0 [T=10500.00 ps] a=0 xmsim: *W,RNQUIE: Simulation is complete.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-timeformat_tb.v - Simülasyon Testbench",
          snippet: `\`timescale 1ns/1ps

module tb;
  bit 	a;
  
  initial begin
    
    // Wait for some time - note that because precision is 1/1000 of
    // the main scale (1ns), this delay will be truncated by the 3rd
    // position
    #10.512351;
    
    // Display current time with default timeformat parameters
    $display("[T=%0t] a=%0b", $realtime, a);
    
    // Change timeformat parameters and display again
    $timeformat(-9, 2, " ns");
    $display("[T=%0t] a=%0b", $realtime, a);
    
    // Remove the space in suffix, and extend fractional digits to 5
    $timeformat(-9, 5, "ns");
    $display("[T=%0t] a=%0b", $realtime, a);
    
    // Here suffix is wrong, it should not be "ns" because we are
    // setting display in "ps" (-12) 
    $timeformat(-12, 3, " ns");
    $display("[T=%0t] a=%0b", $realtime, a);
    
    // Correct the suffix to ps
    $timeformat(-12, 2, " ps");
    $display("[T=%0t] a=%0b", $realtime, a);
  end
endmodule`,
        },
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Testbench Mimarisi ve DUT Sinyal Sürme** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Testbench Mimarisi ve DUT Sinyal Sürme** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Testbench Mimarisi ve DUT Sinyal Sürme Şeması](/images/verilog/ped0-tb.png)

![Verilog Testbench Mimarisi ve DUT Sinyal Sürme Şeması](/images/verilog/latch2.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Testbench & Simulation Verilog Testbench Verilog Testbench `,
      },
      {
        title: "4. What is a Verilog testbench ?",
        content: `A Verilog testbench is a simulation environment used to verify the functionality and correctness of a digital design described in the Verilog hardware description language (HDL). The purpose of a testbench is to provide a way to simulate the behavior of the design under various conditions, inputs, and scenarios before actually fabricating the physical hardware. It allows designers to catch bugs, validate functionality, and optimize designs without the cost and time associated with physical prototyping.`,
      },
      {
        title: "5. Verilog Testbench Components",
        content: `DUT or Design Under Test is the Verilog module or design that you want to test. It could be a simple component like an adder or a more complex design like a microprocessor. The testbench itself is implemented as a separate top-level Verilog module . This module is responsible for generating input stimuli for the DUT, capturing its output, and comparing it with expected outputs. The testbench generates different input patterns and sequences to test different scenarios and edge cases of the design and can be coded using functions and tasks and forms the test stimulus . Some examples are the different input patterns, clock signals, reset signals, and other control signals to test various aspects of the DUT's behavior. Testbench signals are connected to the ports of the DUT instantiation , and are monitored by different tasks to check design functionality. NOTE! Testbenches are used only for simulation purposes and not for synthesis. Hence the full range of Verilog constructs like initial and system tasks like $display can be used to help with simulation and debug.`,
      },
      {
        title: "6. Verilog Testbench Example",
        content: `Lets assume that we want to test the functionality of a latch which is described by the module shown below. module d_latch ( input d, input en, input rstn, output reg q); always @ (en or rstn or d) begin if (!rstn) begin q <= 0; end else begin if (en) begin q <= d; end end end endmodule A Verilog testbench can be written by the following steps: 1. Declare top-level testbench module // Note that top level testbench module does not need any IO ports and // hence can be empty and is usually called "tb" or "tb_top", but it can be // named anything. module tb_latch; // All testbench code goes inside this module endmodule 2. Declare signals for DUT connection The latch design contains 3 inputs and 1 output. Inputs are declared of type reg so that it can be driven from a procedural block such as initial . Outputs are declared as type wire so that it is visible in the testbench module and can be monitored to check design behavior. reg d; // To drive input "d" of the DUT reg en; // To drive input "en" of the DUT reg rstn; // To drive input "rstn" of the DUT reg prev_q; // To ensure q has not changed when en=0 wire q; // To tap output "q" from DUT 3. Instantiate DUT Create a module instantiation of the DUT verilog module and connect testbench signals to the DUT ports. dut u0 ( .d (d), .clk (clk), .rstn (rstn), .q (q) ); 4. Initialize testbench variables Note that all reg variables have an uninitialized value of X and can be initialized to some value inside an initial block. initial begin d <= 0; en <= 0; rstn <= 0; end It can also be written inside a function which can be called inside the initial block. Note that functions cannot have simulation delays using # operator. function void init(); d <= 0; en <= 0; rstn <= 0; endfunction initial begin init(); #10; // Wait for 10 time units end 5. Write test stimulus. For our case, we have to release reset and drive some random combination of inputs to see what values the design provides on its output port q for each change in input. task reset_release(); // 2. Release reset #10 rstn <= 1; endtask task test_1(); // 3. Randomly change d and enable for (i = 0; i < 5; i=i+1) begin delay = $random; delay2 = $random; #(delay2) en <= ~en; #(delay) d <= i; // Check output value for given inputs #1; checker(d, en, rstn, q); prev_q <= q; end endtask initial begin // As shown in step 4 init(); reset_release(); test_1(); end 6. Write checker code The checker, depending on the complexity of the design can be written in multiple functions and tasks and called at different points in a simulation. For our purposes of a simple design such as a latch in this example, it can be coded entirely in a single function and called just after driving inputs to the design as shown in step 5. function checker (input d, en, rstn, q); if (!rstn) begin if (q != 0) $error("Q is not 0 during resetn !"); end else begin if (en) begin if (q != d) $error ("Q does not follow D when EN is high !"); end else begin if (q != prev_q) $error ("Q does not get latched !"); end end endfunction Hence by running simulations using the testbench, designers can catch design flaws, validate the functionality of the DUT, and refine the design before moving on to the physical implementation stage. Testbenches are a crucial part of the digital design and verification process, ensuring that the resulting hardware behaves as intended. See other examples like 4-bit counter , Full Adder or Single Port RAM ! `,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Testbench Mimarisi ve DUT Sinyal Sürme** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Testbench Mimarisi ve DUT Sinyal Sürme** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Testbench Mimarisi ve DUT Sinyal Sürme Şeması](/images/verilog/ped0-tb.png)

![Verilog Testbench Mimarisi ve DUT Sinyal Sürme Şeması](/images/verilog/simulation1.png)

![Verilog Testbench Mimarisi ve DUT Sinyal Sürme Şeması](/images/verilog/simulation-ex1.PNG)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Testbench & Simulation Verilog Testbench Simulation Verilog Testbench Simulation Verilog is a hardware description language and there is no requirement for designers to simulate their RTL designs to be able to convert them into logic gates. So what is the need to simulate? Simulation is a technique of applying different input stimulus to the design at different times to check if the RTL code behaves the intended way. Essentially, simulation is a well-followed technique to verify the robustness of the design. It is also similar to how a fabricated chip will be used in the real world and how it reacts to different inputs. For example, the design above represents a positive edge detector with inputs clock and signal which are evaluated at periodic intervals to find the output pe as shown. Simulation allows us to view the timing diagram of related signals to understand how the design description in Verilog actually behaves. There are several EDA companies that develop simulators capable of figuring out the outputs for various inputs to the design. Verilog is defined in terms of a discrete event execution model and different simulators are free to use different algorithms to provide the user with a consistent set of results. The Verilog code is divided into multiple processes and threads and may be evaluated at different times in the course of a simulation, which will be touched upon later.`,
      },
      {
        title: "4. Example",
        content: `The testbench called tb is a container to hold a design module. However, in this example we have not used any design instances. There are two variables or signals that can be assigned certain values at specific times. clk represents a clock which is generated within the testbench. This is done by the always statement by alternating the clock's value after every 5ns. The initial block contains a set of statements that assign different values to both the signals at different times. module tb; reg clk; reg sig; // Clock generation // Process starts at time 0ns and loops after every 5ns always #5 clk = ~clk; // Initial block : Process starts at time 0ns initial begin // This system task will print out the signal values everytime they change $monitor("Time = %0t clk = %0d sig = %0d", $time, clk, sig); // Also called stimulus, we simply assign different values to the variables // after some simulation "delay" sig = 0; #5 clk = 0; // Assign clk to 0 at time 5ns #15 sig = 1; // Assign sig to 1 at time 20ns (#5 + #15) #20 sig = 0; // Assign sig to 0 at time 40ns (#5 + #15 + #20) #15 sig = 1; // Assign sig to 1 at time 55ns (#5 + #15 + #20 + #15) #10 sig = 0; // Assign sig to 0 at time 65ns (#5 + #15 + #20 + #15 + #10) #20 $finish; // Finish simulation at time 85ns end endmodule The simulator provides the following output after execution of the above testbench. Output ncsim> run Time = 0 clk = x sig = 0 Time = 5 clk = 0 sig = 0 Time = 10 clk = 1 sig = 0 Time = 15 clk = 0 sig = 0 Time = 20 clk = 1 sig = 1 Time = 25 clk = 0 sig = 1 Time = 30 clk = 1 sig = 1 Time = 35 clk = 0 sig = 1 Time = 40 clk = 1 sig = 0 Time = 45 clk = 0 sig = 0 Time = 50 clk = 1 sig = 0 Time = 55 clk = 0 sig = 1 Time = 60 clk = 1 sig = 1 Time = 65 clk = 0 sig = 0 Time = 70 clk = 1 sig = 0 Time = 75 clk = 0 sig = 0 Time = 80 clk = 1 sig = 0 Simulation complete via $finish(1) at time 85 NS + 0 `,
      },
      {
        title: "5. What is a simulation waveform ?",
        content: `Simulations allow us to dump design and testbench signals into a waveform that can be graphically represented to analyze and debug functionality of the RTL design. The waveform shown below is obtained from an EDA tool and shows the progress of each signal with respect to time and is same as the timing diagram shown before. Every change in the value of a variable or net is called an update event . And processes are sensitive to update events such that these processes are evaluated whenever the update event happens and is called an evaluation event . Because of the possibility of having multiple processes being evaluated arbitrarily, the order of changes has to be tracked in something called as an event queue . Naturally, they are ordered by the simulation time. Placement of a new event on the queue is called scheduling . Simulation time is used to refer to the time value maintained by the simulator to model the actual time it would take for the circuit being simulated. The time values for the example above are shown in nanoseconds ns in the timing diagram. module des; wire abc; wire a, b, c; assign abc = a & b | c; // abc is updated via the assign statement (process) whenever a, b or c change -> update event endmodule Refresh Verilog and see an example !`,
      },
      {
        title: "6. Regions in event queue",
        content: `The Verilog event queue is logically divided into five regions, and events can be added to any of them. However, it can be removed only from the active region. Events Description Active Occur at the current simulation time, and can be processed in any order Inactive Occur at the current simulation time, but is processed after all active events are done Nonblocking Evaluated at some previous time, but assignment is done in the current simulation time after active and inactive events are done Monitor Processed after all the active, inactive and non-blocking events are done Future Occur at some future simulation time A simulation cycle is where all active events are processed. The standard guarantees a certain scheduling order except for a few cases and. For example, statements inside a begin-end block will only be executed in the order in which they appear. module tb; reg [3:0] a; reg [3:0] b; initial begin // Statements are executed one after the other at appropriate simulation times a = 5; // At time 0ns, a is assigned 5 b = 2; // In the same simulation step (time 0ns), b is assigned 2 #10 a = 7; // When simulation advances to 10ns, a is assigned 7 end endmodule The event queue defines that assignment to b should happen after assignment to a . `,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Görevleri (task ... endtask) ve Zaman Gecikmeleri** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Görevleri (task ... endtask) ve Zaman Gecikmeleri** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Testbench & Simulation Verilog Display Tasks Verilog Display Tasks Display system tasks are mainly used to display informational and debug messages to track the flow of simulation from log files and also helps to debug faster. There are different groups of display tasks and formats in which they can print values.`,
      },
      {
        title: "3. Syntax",
        content: `Both $display and $write display arguments in the order they appear in the argument list. $display(<list_of_arguments>); $write(<list_of_arguments>); $write does not append the newline character to the end of its string, while $display does and can be seen from the example shown below.`,
      },
      {
        title: "4. Example",
        content: `module tb; initial begin $display ("This ends with a new line "); $write ("This does not,"); $write ("like this. To start new line, use newline char\\n like this"); $display ("This continues from where it was left off !"); $display ("And now we get a new line again"); end endmodule Output $ /usr/bin/vvp simulation +random_seed+379947390 This ends with a new line This does not,like this. To start new line, use newline char like thisThis continues from where it was left off ! And now we get a new line again `,
      },
      {
        title: "5. Verilog Strobes",
        content: `$strobe prints the final values of variables at the end of the current delta time-step and has a similar format like $display . module tb; initial begin reg [7:0] a; reg [7:0] b; a = 8'h2D; b = 8'h2D; #10; // Wait till simulation reaches 10ns b <= a + 1; // Assign a+1 value to b $display ("[$display] time=%0t a=0x%0h b=0x%0h", $time, a, b); $strobe ("[$strobe] time=%0t a=0x%0h b=0x%0h", $time, a, b); #1; $display ("[$display] time=%0t a=0x%0h b=0x%0h", $time, a, b); $strobe ("[$strobe] time=%0t a=0x%0h b=0x%0h", $time, a, b); end endmodule Note that $strobe shows the final updated value of the variable b at time 10ns which is 0x2E , and $display picks that up only in the next simulation delta at 11ns. Output ncsim> run [$display] time=10 a=0x2d b=0x2d [$strobe] time=10 a=0x2d b=0x2e [$display] time=11 a=0x2d b=0x2e [$strobe] time=11 a=0x2d b=0x2e ncsim: *W,RNQUIE: Simulation is complete. ncsim> exit`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Simülasyon Kontrolü: $stop ve $finish Sistem Görevleri** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Simülasyon Kontrolü: $stop ve $finish Sistem Görevleri** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Testbench & Simulation Verilog $stop $finish Verilog $stop $finish In Verilog, the $stop and $finish system tasks are both used to end the simulation, but they serve different purposes. These are called simulation control system tasks and is typically used in a testbench to end advancement of time, especially if there is an infinite loop by a forever loop or an always block with no sensitivity list. Note that initial blocks exit automatically after executing all statements within it.`,
      },
      {
        title: "3. $stop",
        content: `$stop([N]); // where N is // 0 : Prints nothing // 1 : Prints simulation time and location // 2 : Prints simulation time, location, and statistics about the memory // and central processing unit (CPU) time used in simulation The $stop task is used to pause the simulation at a specific point. When invoked, it effectively acts like a breakpoint, allowing the user to inspect the current state of the simulation without terminating it. You can resume the simulation manually after examining the state. To resume the simulation, you will use specific commands provided by your simulation tool. The exact command may vary depending on the simulator you are using (e.g., ModelSim, VCS, or other tools). module tb; reg [3:0] counter; initial begin counter = 0; #10 counter = counter + 1; // Increment after 10 time units $display("Counter value before stop: %b", counter); $stop; // Simulation pauses here // This line will not execute until the simulation is resumed #10 counter = counter + 1; $display("Counter value after stop: %b", counter); end endmodule In this example: The simulation increments counter and displays its value. The $stop task is called, pausing execution. After resuming, it increments counter again and displays the new value.`,
      },
      {
        title: "4. $finish",
        content: `$finish([N]); // where N is // 0 : Prints nothing // 1 : Prints simulation time and location // 2 : Prints simulation time, location, and statistics about the memory // and central processing unit (CPU) time used in simulation The $finish task is used to terminate the simulation entirely. When this task is encountered, it stops all simulation processes and returns control to the operating system. This task is typically used when the simulation completes successfully or when an unrecoverable error occurs. module tb; initial begin // Some simulation code... #10 $display("Waited to 10 units"); // Terminate simulation and print a diagnostic message $finish(1); // This delay will never be executed in simulation because it will be // terminated by the line before #100; end endmodule In this example: The $finish task is called, which ends the simulation immediately. Any code following $finish will not execute.`,
      },
      {
        title: "5. Difference between $stop and $finish",
        content: `These distinctions make $stop useful for debugging scenarios while $finish is appropriate for concluding a testbench or simulation run. $stop $finish Functionality Pauses the simulation, allowing for inspection and debugging Ends the simulation completely Resumption After $stop, you can continue from where you left off After $finish, you must restart the entire simulation to run it again Tool License Does not release any licenses, allowing for a continued session. Releases licenses and exits the simulator environment. By understanding how to utilize $stop effectively and knowing the commands specific to your simulator, you can enhance your debugging and simulation control capabilities significantly. `,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Advanced Testbench Features Verilog VCD Verilog VCD VCD files, or Value Change Dump files, are a standardized ASCII format used to store simulation data from Verilog and other hardware description languages. They are primarily utilized for recording and analyzing the changes in values of variables during a simulation. VCD files are generated by simulation tools to capture the state changes of signals over time. This data can be visualized using waveform viewers, allowing designers to analyze the behavior of their digital designs.`,
      },
      {
        title: "3. VCD Types",
        content: `A VCD file contains data regarding changes in values for selected variables within a design, which are recorded by VCD system tasks. There are two types of VCD files: Four-state: This type represents variable changes in the states 0, 1, x, and z without including strength information. Extended: This type captures variable changes across all states and includes strength information.`,
      },
      {
        title: "4. VCD Structure",
        content: `A VCD file consists of several key sections.`,
      },
      {
        title: "5. Header Section",
        content: `It contains metadata such as the date of creation, version of the simulator, and timescale information and is specified within $<keyword> and $end . Keyword Description $comment Inserts a comment in the VCD file $date Indicates the date on which the VCD file was generated $enddefinitions Marks the end of the file's header section $timescale Specifies what timescale was used for the simulation $version Indicates which version of the VCD writer was used to produce the VCD file For example, the following header section contains the date, version and timescale meta-information of the VCD file. $date April 11, 2021 10:05:41 $end $version ICARUS-VERILOG 2.5 $end $timescale 1 ns $end`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **VCD (Value Change Dump) ile Dalga Biçimi Kaydetme ($dumpfile)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Advanced Testbench Features Verilog VCD Dump Verilog VCD Dump A VCD file is an ASCII file that includes header information, definitions of variables, and the value changes for all variables specified in the task calls. Various system tasks can be incorporated into the source description to create and manage the VCD file. Read more on Value Change Dump (VCD) ! Simulation variables can be dumped into a VCD file using the following tasks:`,
      },
      {
        title: "3. $dumpfile",
        content: `The $dumpfile task is used to specify the name of the VCD file. $dumpfile(<filename>); The filename is optional and defaults to the string "dump.vcd" if it is not provided. module tb; initial begin $dumpfile(); // default "dump.vcd" $dumpfile("wave1.vcd"); // dumps into "wave1.vcd" end endmodule`,
      },
      {
        title: "4. $dumpvars",
        content: `The $dumpvars task is used to specify which variables should be recorded in the file indicated by $dumpfile . This task can be called multiple times throughout the model (for instance, within different blocks), but all instances of $dumpvars will execute at the same simulation time. $dumpvars(levels, [list_of_modules_or_variables]); $dumpvars will dump all variables to the VCD file if no arguments are given, else the first argument specifies the number of hierarchy levels below each designated module instance to include in the VCD file. The following arguments indicate which scopes of the model should be recorded in the VCD file. module tb; initial begin $dumpvars (0); // Dumps all variables from all module instances $dumpvars (0, tb); // Dumps all variables within module 'tb' and in all sub-modules $dumpvars (1, tb); // Dumps all variables within module 'tb', not in any sub-modules $dumpvars (0, tb.ram_ctrl, tb.alu2.a); // Dumps all variables in 'tb.ram_ctrl' and in all its sub-modules, and the variable 'tb.alu2.a' in module 'alu2' end endmodule Note that the argument 0 applies only to subsequent arguments that specify module instances, and not to individual variables. For instance, 0 is applied only to 'tb.ram_ctrl' and not to the individual net 'tb.alu2.a' in the example shown above.`,
      },
      {
        title: "5. $dumpon, $dumpoff",
        content: `Executing the $dumpvars task initiates value change dumping at the end of the current simulation time unit. To pause the dumping process, the $dumpoff task can be called. To resume dumping, the $dumpon task can be invoked. module tb; initial begin $dumpvars; #100ns $dumpoff; // Stop dump of all vars at 100ns #2000ns $dumpon; // Resume dump of all vars at 2000ns end endmodule When $dumpoff is executed by the simulator, all selected variables will be dumped with the value X and the actual value of the variable when $dumpon is called later to resume. The idea is to pause dumping of signal change values in between. Dumping of signal values for large designs causes simulation to take a longer wall-clock time to finish, and these tasks help to selectively dump variables within regions of interest.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Dosya İşlemleri: $fopen, $fdisplay ve $fscanf ile Veri Okuma** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Dosya İşlemleri: $fopen, $fdisplay ve $fscanf ile Veri Okuma** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Advanced Testbench Features Verilog File IO Operations Verilog File IO Operations Verilog has system tasks and functions that can open files, output values into files, read values from files and load into other variables and close files.`,
      },
      {
        title: "3. Opening and closing files",
        content: `module tb; // Declare a variable to store the file handler integer fd; initial begin // Open a new file by the name "my_file.txt" // with "write" permissions, and store the file // handler pointer in variable "fd" fd = $fopen("my_file.txt", "w"); // Close the file handle pointed to by "fd" $fclose(fd); end endmodule`,
      },
      {
        title: "4. Opening file modes",
        content: `Argument Description "r" or "rb" Open for reading "w" or "wb" Create a new file for writing. If the file exists, truncate it to zero length and overwrite it "a" or "ab" If file exists, append (open for writing at EOF), else create a new file "r+", "r+b" or "rb+" Open for both reading and writing "w+", "w+b" or "wb+" Truncate or create for update "a+", "a+b", or "ab+" Append, or create new file for update at EOF`,
      },
      {
        title: "5. How to write files",
        content: `Function Description $fdisplay Similar to $display, writes out to file instead $fwrite Similar to $write, writes out to file instead $fstrobe Similar to $strobe, writes out to file instead $fmonitor Similar to $monitor, writes out to file instead Each of the above system functions print values in radix decimal. They also have three other versions to print values in binary, octal and hexadecimal. Function Description $fdisplay() Prints in decimal by default $fdisplayb() Prints in binary $fdisplayo() Prints in octal $fdisplayh() Prints in hexadecimal module tb; integer fd; integer i; reg [7:0] my_var; initial begin // Create a new file fd = $fopen("my_file.txt", "w"); my_var = 0; $fdisplay(fd, "Value displayed with $fdisplay"); #10 my_var = 8'h1A; $fdisplay(fd, my_var); // Displays in decimal $fdisplayb(fd, my_var); // Displays in binary $fdisplayo(fd, my_var); // Displays in octal $fdisplayh(fd, my_var); // Displays in hex // $fwrite does not print the newline char ' ' automatically at // the end of each line; So we can predict all the values printed // below to appear on the same line $fdisplay(fd, "Value displayed with $fwrite"); #10 my_var = 8'h2B; $fwrite(fd, my_var); $fwriteb(fd, my_var); $fwriteo(fd, my_var); $fwriteh(fd, my_var); // Jump to new line with ' ', and print with strobe which takes // the final value of the variable after non-blocking assignments // are done $fdisplay(fd, " Value displayed with $fstrobe"); #10 my_var <= 8'h3C; $fstrobe(fd, my_var); $fstrobeb(fd, my_var); $fstrobeo(fd, my_var); $fstrobeh(fd, my_var); #10 $fdisplay(fd, "Value displayed with $fmonitor"); $fmonitor(fd, my_var); for(i = 0; i < 5; i= i+1) begin #5 my_var <= i; end #10 $fclose(fd); end endmodule Output Value displayed with $fdisplay 26 00011010 032 1a Value displayed with $fwrite 43001010110532b Value displayed with $fstrobe 60 00111100 074 3c Value displayed with $fmonitor 60 0 1 2 3 4 `,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Derleyici Direktifleri (\`timescale, \`include, \`resetall)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Derleyici Direktifleri (\`timescale, \`include, \`resetall)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Compiler Directives Verilog Compiler Directives Verilog Compiler Directives Compiler directives in Verilog are special instructions that control how the Verilog compiler processes the code. They start with a grave accent (\`) and do not require a semicolon at the end. These directives can affect the compilation process across multiple files and are not limited to a single module. Compiler directives should ideally be placed outside of module declarations for clarity and better organization. They remain effective from their declaration point until overridden by another directive or until the end of the file.`,
      },
      {
        title: "3. \`define",
        content: `Used to define text macros. This is similar to #define in C. The defined macro can be used throughout the code. \`define CLK_PERIOD 20`,
      },
      {
        title: "4. \`include",
        content: `Includes the contents of another Verilog file into the current file during compilation, allowing for modular design and code reuse. \`include "definitions.v"`,
      },
      {
        title: "5. \`ifdef and \`ifndef",
        content: `These directives check if a macro is defined \`ifdef or not defined \`ifndef . They allow conditional compilation of code. \`ifdef DEBUG $display("Debug mode is on"); \`endif Read more on Verilog \`ifdef Conditional Compilation .`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Derleyici Direktifleri (\`timescale, \`include, \`resetall)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-compiler-directives.v - Örnek Donanım Modülü",
          snippet: `\`define CLK_PERIOD 20`,
        },
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **\`define Makro Tanımları ve Metin İkamesi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **\`define Makro Tanımları ve Metin İkamesi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Compiler Directives Verilog \`define Macro Verilog \`define Macro `,
      },
      {
        title: "3. What are Verilog Macros ?",
        content: `Verilog macros allow you to define a piece of code that can be reused throughout your design. When a macro is invoked, it gets replaced by its defined content during compilation. This capability is especially useful for defining constants, parameterized expressions, or frequently used code snippets.`,
      },
      {
        title: "4. Syntax",
        content: `The basic syntax for defining a macro is as follows: \`define MACRO_NAME [ (arguments) ] macro_body MACRO_NAME : The name of the macro. arguments : Optional parameters that can be passed to the macro. macro_body : The code or expression that replaces the macro when it is invoked.`,
      },
      {
        title: "5. Macro Example",
        content: `In this example, the ADD macro is defined to compute the sum of two numbers. When invoked, it expands to the addition operation. \`define ADD(a, b) ((a) + (b)) module example; initial begin $display("Sum: %d", \`ADD(5, 3)); // Expands to ((5) + (3)) end endmodule`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **\`define Makro Tanımları ve Metin İkamesi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-define-macros.v - Örnek Donanım Modülü",
          snippet: `\`define MACRO_NAME [ (arguments) ] macro_body`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-define-macros_tb.v - Simülasyon Testbench",
          snippet: `\`define ADD(a, b) ((a) + (b))

module example;
    initial begin
        $display("Sum: %d", \`ADD(5, 3)); // Expands to ((5) + (3))
    end
endmodule`,
        },
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **\`ifdef ve \`ifndef ile Koşullu Derleme Yönetimi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **\`ifdef ve \`ifndef ile Koşullu Derleme Yönetimi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Compiler Directives Verilog \`ifdef Conditional Compilation Verilog \`ifdef Conditional Compilation Verilog supports a few compiler directives that essentially direct the compiler to treat the code in a certain way. For example, a portion of the code may represent an implementation of a certain feature and there should be some way to not include the code in the design if the feature is not used. This can be solved with conditional compilation where the designer can wrap the code within compiler directives which tell the compiler to either include or exclude the code for compilation when the given named flag is set.`,
      },
      {
        title: "3. Syntax",
        content: `Conditional compilation can be achieved with Verilog \`ifdef and \`ifndef keywords. These keywords can appear anywhere in the design and can be nested one inside the other. The keyword \`ifdef simply tells the compiler to include the piece of code until the next \`else or \`endif if the given macro called FLAG is defined using a \`define directive. // Style #1: Only single \`ifdef \`ifdef <FLAG> // Statements \`endif // Style #2: \`ifdef with \`else part \`ifdef <FLAG> // Statements \`else // Statements \`endif // Style #3: \`ifdef with additional ifdefs \`ifdef <FLAG1> // Statements \`elsif <FLAG2> // Statements \`elsif <FLAG3> // Statements \`else // Statements \`endif The keyword \`ifndef simply tells the compiler to include the piece of code until the next \`else or \`endif if the given macro called FLAG is not defined using a \`define directive.`,
      },
      {
        title: "4. Design Example with \`ifdef",
        content: `module my_design (input clk, d, \`ifdef INCLUDE_RSTN input rstn, \`endif output reg q); always @ (posedge clk) begin \`ifdef INCLUDE_RSTN if (!rstn) begin q <= 0; end else \`endif begin q <= d; end end endmodule`,
      },
      {
        title: "5. Testbench",
        content: `module tb; reg clk, d, rstn; wire q; reg [3:0] delay; my_design u0 ( .clk(clk), .d(d), \`ifdef INCLUDE_RSTN .rstn(rstn), \`endif .q(q)); always #10 clk = ~clk; initial begin integer i; {d, rstn, clk} <= 0; #20 rstn <= 1; for (i = 0 ; i < 20; i=i+1) begin delay = $random; #(delay) d <= $random; end #20 $finish; end endmodule Note that by default, rstn will not be included during compilation of the design and hence it will not appear in the portlist. However if a macro called INCLUDE_RSTN is either defined in any Verilog file that is part of the compilation list of files or passed through the command line to the compiler, rstn will be included in compilation and the design will have it. Experiment by adding and removing +define+INCLUDE_RSTN from 'Compile & Run Options' on the left pane to know the difference. `,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **\`ifdef ve \`ifndef ile Koşullu Derleme Yönetimi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-ifdef-conditional-compilation.v - Örnek Donanım Modülü",
          snippet: `// Style #1: Only single \`ifdef
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
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-ifdef-conditional-compilation_tb.v - Simülasyon Testbench",
          snippet: `module my_design (input clk, d, 
\`ifdef INCLUDE_RSTN
                  input rstn,
\`endif                  
                  output reg q);
  
  always @ (posedge clk) begin
\`ifdef INCLUDE_RSTN
    if (!rstn) begin
      q <= 0;
    end else 
\`endif
    begin
      q <= d;
    end
  end
endmodule`,
        },
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog User Defined Primitives** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog User Defined Primitives** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog User Defined Primitives Şeması](/images/verilog/verilog-udp-mux.png)

![Verilog User Defined Primitives Şeması](/images/verilog/verilog-udp-latch.png)

![Verilog User Defined Primitives Şeması](/images/verilog/verilog-udp-dflop.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Advanced Topics Verilog User Defined Primitives Verilog User Defined Primitives Standard Verilog primitives like nand and not may not always be easy or sufficient to represent complex logic. New primitive elements called UDP or user-defined primitives can be defined to model combinational or sequential logic. All UDPs have exactly one output that can be either 0, 1 or X and never Z (not supported). Any input that has the value Z will be treated as X.`,
      },
      {
        title: "4. Verilog UDP Symbols",
        content: `Verilog user defined primitives can be written at the same level as module definitions, but never between module and endmodule . They can have many input ports but always one output port, and bi-directional ports are not valid. All port signals have to be scalar which means they have to be 1-bit wide. Hardware behavior is described as a primitive state table which lists out different possible combination of inputs and their corresponding output within table and endtable . Values of input and output signals are indicated using the following symbols. Symbol Comments 0 Logic 0 1 Logic 1 x Unknown, can be either logic 0 or 1. Can be used as input/output or current state of sequential UDPs ? Logic 0, 1 or x. Cannot be output of any UDP - No change, only allowed in output of a UDP ab Change in value from a to b where a or b is either 0, 1, or x * Same as ??, indicates any change in input value r Same as 01 -> rising edge on input f Same as 10 -> falling edge on input p Potential positive edge on input; either 0->1, 0->x, or x->1 n Potential falling edge on input; either 1->0, x->0, 1->x`,
      },
      {
        title: "5. Combinational UDP Example",
        content: `// Output should always be the first signal in port list primitive mux (out, sel, a, b); output out; input sel, a, b; table // sel a b out 0 1 ? : 1; 0 0 ? : 0; 1 ? 0 : 0; 1 ? 1 : 1; x 0 0 : 0; x 1 1 : 1; endtable endprimitive A ? indicates that the signal can be either 0, 1 or x and does not matter in deciding the final output. Shown below is a testbench module that instantiates the UDP and applies input stimuli to it. module tb; reg sel, a, b; reg [2:0] dly; wire out; integer i; // Instantiate the UDP - note that UDPs cannot // be instantiated with port name connection mux u_mux ( out, sel, a, b); initial begin a <= 0; b <= 0; $monitor("[T=%0t] a=%0b b=%0b sel=%0b out=%0b", $time, a, b, sel, out); // Drive a, b, and sel after different random delays for (i = 0; i < 10; i = i + 1) begin dly = $random; #(dly) a <= $random; dly = $random; #(dly) b <= $random; dly = $random; #(dly) sel <= $random; end end endmodule Output xcelium> run [T=0] a=0 b=0 sel=x out=0 [T=4] a=1 b=0 sel=x out=x [T=5] a=1 b=1 sel=x out=1 [T=10] a=1 b=1 sel=1 out=1 [T=15] a=0 b=1 sel=1 out=1 [T=28] a=0 b=0 sel=1 out=0 [T=33] a=0 b=0 sel=0 out=0 [T=38] a=1 b=0 sel=0 out=1 [T=40] a=1 b=1 sel=0 out=1 [T=51] a=1 b=1 sel=1 out=1 [T=54] a=0 b=0 sel=1 out=0 [T=62] a=1 b=0 sel=1 out=0 [T=67] a=1 b=1 sel=1 out=1 [T=72] a=0 b=1 sel=1 out=1 [T=80] a=0 b=1 sel=0 out=0 [T=84] a=0 b=0 sel=0 out=0 [T=85] a=1 b=0 sel=0 out=1 xmsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "6. Sequential UDP Example",
        content: `Sequential logic can be either level-sensitive or edge-sensitive and hence there are two kinds of sequential UDPs. Output port should also be declared as reg type within the UDP definition and can be optionally initialized within an initial statement. Sequential UDPs have an additional field in between the input and output field which is delimited by a : which represents the current state.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Specify Block** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Specify Block** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Advanced Topics Verilog Specify Block Verilog Specify Block `,
      },
      {
        title: "3. What is a specify block ?",
        content: `Two types of HDL constructs are commonly employed to define delays in structural models, such as ASIC cells. Distributed Delays : These delays specify the time it takes for events to propagate through gates and interconnecting nets within a module. Module Path Delays : These delays describe the time required for an event at a source (such as an input or inout port) to propagate to a destination (like an output or inout port). The specify block in Verilog is a specialized construct used to define timing characteristics and delays for signals within a module. It allows designers to specify delays across a module and perform timing checks, such as setup and hold times.`,
      },
      {
        title: "4. Syntax",
        content: `It begins with the specify keyword and ends with endspecify . specify // Checks and Statements endspecify Inside this block, you can include: specparam declarations to define delays and timing parameters. Path declarations to describe the timing paths between input and output signals, assigning delays to these paths. System timing checks to enforce timing constraints on signal transitions.`,
      },
      {
        title: "5. Specify Example",
        content: `module example_module ( input wire a, input wire b, output wire out ); specify // Specparam declaration to define timing parameters specparam TRise = 5; // Rise time delay specparam TFall = 3; // Fall time delay // Path declarations to specify delays between signals (a => out) = TRise; // Delay from input 'a' to output 'out' (b => out) = TFall; // Delay from input 'b' to output 'out' // System timing check for setup time $setup(a, out, 10); // Check setup time for signal 'a' relative to 'out' endspecify // Logic for the output assign out = a & b; // Example combinational logic endmodule`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Strength** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Strength** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Advanced Topics Verilog Strength Verilog Strength In Verilog, the strength of driving a net refers to the relative power or capability of a driver to influence the value of a net. Two types of strengths can be specified in a net declaration`,
      },
      {
        title: "3. Charge Strength",
        content: `Charge strength is specifically used with trireg nets to model charge storage. It indicates the relative size of the capacitance associated with the net indicated by either small , medium or large . This strength determines how quickly a charge can decay on the net when it is not actively driven, allowing for more accurate simulation of real-world behavior in circuits that involve capacitive elements. The default charge strength of a trireg net is medium . The simulation time for charge decay should be defined in the delay specification for the trireg net. trireg a_net; // strength medium by default trireg (medium) #(0, 0, 100) cap1; // strength medium, charge decay time of 100 time units trireg (large) [3:0] cap2; // strength large, no decay time`,
      },
      {
        title: "4. Drive Strength",
        content: `Drive strength refers to the capability of a driver to influence the value of a net. It indicates how strongly a signal is driven on the output terminals of a gate or net. Drive strength is crucial in resolving conflicts when multiple drivers attempt to control a net. The net will take on the value from the strongest driver, and if there are conflicting values from drivers of the same strength, the result will be unknown (x). When using the assign statement, you can specify the driving strength explicitly. The syntax for this is: assign (strength1, strength0) net = expression; strength1 : The strength when the net is driven to logic 1. strength0 : The strength when the net is driven to logic 0. If no strengths are specified, the default drive strength is typically strong, which means that the net will take on the value from a strong driver if multiple drivers are present. If multiple drivers with different strengths attempt to drive a net, the net will take on the value of the strongest driver. If two or more drivers have the same strength but different values, the result will be unknown (x). wire out; assign (strong1, weak0) out = a & b; // Drives 'out' with strong1 when true In this example, if a & b evaluates to 1, out will be driven with a strong signal; if it evaluates to 0, it will be driven weakly.`,
      },
      {
        title: "5. supply0",
        content: `The supply0 net is a net that is always driven to a logic low (0) value. It is typically used to represent a ground connection or a negative power supply in a circuit. When connected to other components, it ensures that those components see a consistent low voltage level. If no other driver is present, the value of a supply0 net remains 0. It can be used in simulations to model scenarios where certain parts of the circuit are grounded.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-strength_tb.v - Simülasyon Testbench",
          snippet: `assign  (strength1, strength0) net = expression;`,
        },
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Namespace** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Namespace** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Advanced Topics Verilog Namespace Verilog Namespace In Verilog, namespaces are a way to organize and manage identifiers (such as variables, types, tasks, and functions) to avoid naming conflicts and improve code modularity. There are multiple namespaces; two are classified as global, while the others are local. The global namespaces consist of definitions and text macros.`,
      },
      {
        title: "3. Global Namespace",
        content: `The definitions namespace consolidates all module and primitive definitions. Once a name is assigned to a module or primitive, it cannot be reused to declare another module or primitive. module A; // Statements endmodule // cannot use 'module A' because it is already declared in global namespace module B; // Statements endmodule The text macros names are global and utilized with a leading backtick (\`) character, they are clearly distinct from names in other namespaces. Text macro names are defined in the order they appear in the input files that comprise the design unit. Any subsequent definitions of the same name will override previous definitions for the remainder of the input files. // file1.v \`define ADDR_WIDTH 32 // file2.v \`define ADDR_WIDTH 16 // Redefined to 16 when file2.v is compiled after file1.v`,
      },
      {
        title: "4. Local Namespace",
        content: `The local namespaces include block, module, generate block, port, specify block, and attribute. Once a name is defined within any of these namespaces—block, module, port, generate block, or specify block—it cannot be redefined in that same namespace, regardless of whether it is the same or a different type.`,
      },
      {
        title: "5. Block Namespace",
        content: `The block namespace is established by named blocks, functions, and tasks. It consolidates the definitions of named blocks, functions, tasks, parameters, named events, and variable type declarations. The variable type declarations include reg, integer, time, real, and realtime. module example; reg signal; task myTask; reg signal; // This 'signal' is local to myTask begin reg signal; // This 'signal' is local to this begin-end block end endtask endmodule`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-namespace_tb.v - Simülasyon Testbench",
          snippet: `// file1.v
\`define   ADDR_WIDTH    32  

// file2.v
\`define   ADDR_WIDTH    16   // Redefined to 16 when file2.v is compiled after file1.v`,
        },
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Hierarchical Reference Scope** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Hierarchical Reference Scope** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Advanced Topics Verilog Hierarchical Reference Scope Verilog Hierarchical Reference Scope Most programming languages have a characteristic feature called scope which defines the visibility of certain sections of code to variables and methods. The scope defines a namespace to avoid collision between different object names within the same namespace. Verilog defines a new scope for modules, functions, tasks, named blocks and generate blocks. module tb; reg signal; // Another variable cannot be declared with // an already existing name in the same scope reg signal; // However, the name 'signal' can be reused inside // a task because it belongs to a different scope. task display(); reg signal = 1; $display("signal = %0b", signal); endtask endmodule An identifier, like a signal name, can be used to declare only one type of item in a given scope. This means that two variables of different or same data types cannot have the same name, or a task and a variable of the same name, or even a net and gate instance with the same name in the same scope. Every identifier in Verilog has a unique hierarchical path name, where each module instance, task, function or named begin end or fork join block defines a new level or scope.`,
      },
      {
        title: "3. Hierarchical Reference Example",
        content: `module tb; // Create two instances of different modules A uA(); B uB(); // Create a named block that declares a signal and // prints the value at 10ns from simulation start initial begin : TB_INITIAL reg signal; #10 $display("signal=%0d", signal); end // We'll try to access other scopes using hierarchical // references from this initial block initial begin TB_INITIAL.signal = 0; uA.display(); uB.B_INITIAL.B_INITIAL_BLOCK1.b_signal_1 = 1; uB.B_INITIAL.B_INITIAL_BLOCK2.b_signal_2 = 0; end endmodule module A; task display(); $display("Hello, this is A"); endtask endmodule module B; initial begin : B_INITIAL #50; begin : B_INITIAL_BLOCK1 reg b_signal_1; #10 $display("signal_1=%0d", b_signal_1); end #50; begin : B_INITIAL_BLOCK2 reg b_signal_2; #10 $display("signal_2=%0d", b_signal_2); end end endmodule Output xcelium> run Hello, this is A TB signal=0 signal_1=1 signal_2=0 xmsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "4. Upwards Name Referencing",
        content: `A lower level module can reference items in a module above it in the hierarchy. For example, signal in TB_INITIAL block would be visible from the display task in A. module A; task display(); $display("Hello, this is A"); // Upward referencing, TB_INITIAL is visible in this module #5 TB_INITIAL.signal = 1; endtask endmodule Note that TB signal is now 1 instead of 0, because of the upward referencing change made to the signal by module A. Output xcelium> run Hello, this is A TB signal=1 signal_1=1 signal_2=0 xmsim: *W,RNQUIE: Simulation is complete. Here is another example with multiple nested modules and the leaf node can directly access members from above nodes through upward hierarchical reference. module tb; A a(); function display(); $display("Hello, this is TB"); endfunction endmodule module A; B b(); function display(); $display("Hello, this is A"); endfunction endmodule module B; C c(); function display(); $display("Hello, this is B"); endfunction endmodule module C; D d(); function display(); $display("Hello, this is C"); endfunction endmodule module D; initial begin a.display(); // or A.display() b.display(); // or B.display() c.display(); // or C.display() a.b.c.display(); end endmodule Output xcelium> run Hello, this is A Hello, this is B Hello, this is C Hello, this is C xmsim: *W,RNQUIE: Simulation is complete. When compiler finds b.display() , It looks in the current scope within module D to see if b is defined. If it does not exist, then it looks for the name in the enclosing scope and moves upward until the module scope is reached. If the name is still not found, it goes to the next step. It looks in the parent module's outermost scope and if it is not found, it keeps going up the hierarchy. `,
      },
      {
        title: "5. Quiz",
        content: `No quiz questions available for this article. &nbsp;&nbsp;Prev Article Next Article&nbsp;&nbsp;`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Scheduling Semantics** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Scheduling Semantics** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Advanced Topics Verilog Scheduling Semantics Verilog Scheduling Semantics Verilog design and testbench typically have many lines of code comprising of always or initial blocks, continuous assignments and other procedural statements which become active at different times in the course of a simulation.`,
      },
      {
        title: "3. Event Types",
        content: `Update Events : Triggered by changes in signal values. Evaluation Events : Occur when processes like always or assign blocks are evaluated due to update events in any arbitrary order. Since these events can happen at different times, they are better managed and ensured of their correct order of execution by scheduling them into event queues that are arranged by simulation time. module tb; reg a, b, c; wire d; // 'always' is a process that gets evaluated when either 'a' or 'b' is updated. // When 'a' or 'b' changes in value it is called an 'update event'. When 'always' // block is triggered because of a change in 'a' or 'b' it is called an evaluation // event always @ (a or b) begin c = a & b; end // Here 'assign' is a process which is evaluated when either 'a' or 'b' or 'c' // gets updated assign d = a | b ^ c; endmodule`,
      },
      {
        title: "4. Event Queue",
        content: `A simulation step can be segmented into four different regions. An active event queue is just a set of processes that need to execute at the current time which can result in more processes to be scheduled into active or other event queues. Events can be added to any of the regions, but always removed from the active region. When all events in the active queue for the current time step has been executed, the simulator advances time to the next time step and executes its active queue.`,
      },
      {
        title: "5. Active Region",
        content: `Contains events that are currently being processed. These events can be executed in any order. All active events occur at the current simulation time.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
