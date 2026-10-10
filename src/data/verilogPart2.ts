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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **assign ile Kombinasyonel Devre Tasarımı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **assign ile Kombinasyonel Devre Tasarımı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![assign ile Kombinasyonel Devre Tasarımı Şeması](/images/verilog/simple_combo_with_assign.png)

![assign ile Kombinasyonel Devre Tasarımı Şeması](/images/verilog/simple_combo_with_assign_wave.png)

![assign ile Kombinasyonel Devre Tasarımı Şeması](/images/verilog/2x1_mux_with_assign.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Combinational Logic Combinational Logic with assign Combinational Logic with assign Why Learn Combinational Logic with assign? Every digital chip--from Intel's Core processors to NVIDIA's GPUs--relies on combinational logic blocks for arithmetic operations, data routing, and signal processing. The assign statement is the foundation for building these zero-latency circuits where outputs respond instantly to input changes. Mastering assign is essential for designing efficient ALUs, multiplexers, decoders, and data path logic that form the backbone of modern processors. 8 min read | Beginner to Intermediate`,
      },
      {
        title: "4. What You'll Learn",
        content: `How to implement combinational logic using the assign statement for wire-type signals Design practical circuits: adders, multiplexers, decoders, and demultiplexers using assign Understand how assign statements synthesize to combinational gates with zero latency Apply best practices for writing clean, maintainable combinational logic The Verilog assign statement is used to continuously drive a signal of wire datatype and synthesizes as combinational logic. Unlike sequential logic , combinational logic has no memory elements--the output depends only on the current input values. This makes assign perfect for implementing Boolean equations, arithmetic operations, and data routing circuits.`,
      },
      {
        title: "5. Real-World Application",
        content: `Intel's ALU Design: Modern processors like Intel's Alder Lake use thousands of combinational logic blocks implemented with continuous assignments for arithmetic operations. The ALU's adder circuits, bitwise operations, and comparison logic are all combinational blocks that execute in a single clock cycle, achieving sub-nanosecond propagation delays through optimized gate-level synthesis.`,
      },
      {
        title: "6. Example #1 : Simple Combinational Logic",
        content: `The code shown below implements a simple digital combinational logic which has an output wire z that is driven continuously with an assign statement to realize the digital equation. module combo ( input a, b, c, d, e, output z); // Continuous assignment: output changes immediately when inputs change // Implements: z = ((a AND b) OR (c XOR d)) AND (NOT e) // Synthesizes to AND, OR, XOR, and NOT gates assign z = ((a & b) | (c ^ d) & ~e); endmodule The module combo gets elaborated into the following hardware schematic using synthesis tools and can be seen that the combinational logic is implemented with digital gates. The assign statement creates combinational logic , not sequential. There are no flip-flops--only gates. Output z updates immediately (within gate delays) when any input changes.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **always @(*) ile Kombinasyonel Devre Tasarımı ve Latch Önleme** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **always @(*) ile Kombinasyonel Devre Tasarımı ve Latch Önleme** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![always @(*) ile Kombinasyonel Devre Tasarımı ve Latch Önleme Şeması](/images/verilog/simple_combo_with_assign.png)

![always @(*) ile Kombinasyonel Devre Tasarımı ve Latch Önleme Şeması](/images/verilog/simple_combo_with_assign_wave.png)

![always @(*) ile Kombinasyonel Devre Tasarımı ve Latch Önleme Şeması](/images/verilog/2x1_mux_with_assign.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Combinational Logic Combinational Logic with always Combinational Logic with always The verilog always block can be used for both sequential and combinational logic. A few design examples were shown using an assign statement in a previous article. The same set of designs will be explored next using an always block. 12 min read | Beginner to Intermediate`,
      },
      {
        title: "4. What You'll Learn",
        content: `Write combinational logic using always blocks with proper sensitivity lists Apply blocking assignments ( = ) for combinational logic modeling Implement digital circuits (adders, muxes, decoders) using always blocks Compare assign vs always approaches for identical hardware synthesis`,
      },
      {
        title: "5. Syntax",
        content: `Basic syntax for combinational logic with always blocks: // Complete sensitivity list - all inputs must be included always @ (input1 or input2 or input3) begin output = expression; // Use blocking assignment (=) end // SystemVerilog shorthand (use @* or always_comb) always @* begin output = expression; end Use blocking assignments ( = ) when modeling combinational logic with an always block to avoid simulation/synthesis mismatches`,
      },
      {
        title: "6. assign vs always Block Comparison",
        content: `Feature assign Statement always Block Output Type wire only reg only Sensitivity Automatic (continuous) Manual (requires sensitivity list) Assignment Continuous assignment Blocking ( = ) recommended Procedural Code No (single expression only) Yes (if/case statements allowed) Synthesis Result Identical hardware gates`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **1-Bit ve Çok Bitli Tam Toplayıcı (Full Adder) Tasarımı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **1-Bit ve Çok Bitli Tam Toplayıcı (Full Adder) Tasarımı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Basic Digital Circuits Verilog Full Adder Verilog Full Adder Why Learn the Full Adder? Every time a processor increments its program counter, computes a memory address, or accumulates a filter tap, a chain of full adders does the work. In this tutorial, you'll write a full adder in Verilog, chain it into a multi-bit adder, and see what synthesis builds from it in under 10 minutes. A Verilog full adder is a combinational circuit that adds three 1-bit inputs ( a , b and a carry-in cin ) and produces a sum and a carry-out cout . Chained together, full adders form the N-bit adders at the core of every ALU. The quickest way to describe one in Verilog is a single continuous assignment: // 1-bit full adder in one line: {carry, sum} = a + b + cin assign {cout, sum} = a + b + cin; 10 min read | Beginner Level`,
      },
      {
        title: "3. What You'll Learn",
        content: `Derive the full adder's sum and carry equations from its truth table Model a full adder in gate-level, dataflow and behavioral Verilog Build a 4-bit ripple-carry adder by instantiating 1-bit full adders Understand what each style synthesizes into and why carry propagation limits speed`,
      },
      {
        title: "4. Truth Table",
        content: `A full adder adds three bits, so the result ranges from 0 to 3 and needs two output bits. sum is the LSB and cout is the MSB. Put another way, {cout, sum} is the 2-bit count of how many inputs are 1. A B Cin Cout Sum 0 0 0 0 0 0 0 1 0 1 0 1 0 0 1 0 1 1 1 0 1 0 0 0 1 1 0 1 1 0 1 1 0 1 0 1 1 1 1 1`,
      },
      {
        title: "5. Full Adder Equations",
        content: `Solving the K-maps for the truth table gives two Boolean equations: sum = a ^ b ^ cin // 1 when an odd number of inputs are 1 cout = (a & b) | (cin & (a ^ b)) // 1 when at least two inputs are 1 sum is a 3-input XOR (odd parity). cout is a majority function. The carry is often written as (a & b) | (b & cin) | (a & cin) . The form above is preferred because it reuses the a ^ b term that the sum already needs. a & b is the generate signal (this bit creates a carry on its own). a ^ b is the propagate signal (this bit passes an incoming carry through). Faster adders such as carry-lookahead are built from these two terms.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **4'e 1 Çoğullayıcı (Multiplexer - MUX) Tasarımı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **4'e 1 Çoğullayıcı (Multiplexer - MUX) Tasarımı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![4'e 1 Çoğullayıcı (Multiplexer - MUX) Tasarımı Şeması](/images/verilog/4x1_mux.png)

![4'e 1 Çoğullayıcı (Multiplexer - MUX) Tasarımı Şeması](/images/verilog/4x1_mux_schematic.png)

![4'e 1 Çoğullayıcı (Multiplexer - MUX) Tasarımı Şeması](/images/verilog/4x1-mux-wave.PNG)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Basic Digital Circuits Verilog 4 to 1 Multiplexer/Mux Verilog 4 to 1 Multiplexer/Mux A 4 to 1 multiplexer (mux) in Verilog routes one of four data inputs to a single output based on a 2-bit select signal. You can write it with an assign statement, a case statement, an if-else-if chain, or an indexed part-select, and every form synthesizes into the same selection hardware. 10 min read | Beginner Level`,
      },
      {
        title: "4. What You'll Learn",
        content: `How a 4 to 1 mux selects data and what its Boolean equation looks like Four ways to write a 4x1 mux in Verilog and when to use each What each coding style becomes after synthesis How to verify the mux with a testbench and avoid latch and select-width bugs`,
      },
      {
        title: "5. What is a mux or multiplexer?",
        content: `A multiplexer, or mux , is a combinational circuit that passes one of N inputs to its output. A 4 to 1 mux has four data inputs, so it needs a 2-bit select signal ( sel ) to pick between them, since 2 2 = 4. Each input can be more than one bit wide. A 4-bit, 4 to 1 mux has four 4-bit inputs ( a , b , c , d ) and one 4-bit output ( out ). Internally this is four identical 1-bit muxes that share the same sel lines. The table below shows which input reaches out for each value of sel , using example values a = 3, b = 7, c = 1 and d = 9. sel a b c d out 2'b00 3 7 1 9 3 (a) 2'b01 3 7 1 9 7 (b) 2'b10 3 7 1 9 1 (c) 2'b11 3 7 1 9 9 (d) For each output bit, the mux implements this sum-of-products equation: out = (~sel[1] & ~sel[0] & a) | (~sel[1] & sel[0] & b) | ( sel[1] & ~sel[0] & c) | ( sel[1] & sel[0] & d) Each product term is one decoded value of sel . Only one term can be true at a time, so the OR gate never combines two inputs. This mutual exclusivity is what separates a mux from priority logic.`,
      },
      {
        title: "6. Syntax: Quick Reference",
        content: `A mux has no dedicated Verilog keyword. You describe the selection behavior with one of these constructs and the synthesis tool recognizes the pattern. Basic Forms: // 1. Continuous assignment with nested conditional (ternary) operator assign out = sel[1] ? (sel[0] ? d : c) : (sel[0] ? b : a); // 2. case statement inside a combinational always block always @(*) begin case (sel) 2'b00 : out = a; 2'b01 : out = b; 2'b10 : out = c; 2'b11 : out = d; endcase end // 3. Indexed part-select on a packed input bus assign out = in_bus[sel*4 +: 4]; Components: sel - Select input, $clog2(N) bits wide for N inputs (required) a, b, c, d - Data inputs, all the same width as out (required) out - Declared as wire for assign , and as reg when driven from an always block`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Öncelikli Kodlayıcı (Priority Encoder) Devresi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Öncelikli Kodlayıcı (Priority Encoder) Devresi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Basic Digital Circuits Verilog Priority Encoder Verilog Priority Encoder A priority encoder in Verilog takes several request inputs and outputs the binary index of the highest-priority input that is active. Unlike a plain encoder, it gives a defined answer when more than one input is high at the same time, and a valid output tells you whether any input was active at all. 10 min read | Beginner Level`,
      },
      {
        title: "3. What You'll Learn",
        content: `How a priority encoder resolves multiple active inputs, with its truth table and equations Three ways to write a priority encoder: if-else-if , casez and a parameterized for loop Why an if-else-if chain synthesizes into priority logic here but into a plain mux elsewhere How to verify every input pattern with a self-checking testbench`,
      },
      {
        title: "4. What is a Priority Encoder?",
        content: `An encoder converts N input lines into a log 2 (N)-bit binary code. A plain encoder assumes that only one input is active at a time. If two inputs go high together, its output is the OR of both codes, which is meaningless. A priority encoder fixes this by ranking the inputs. When several inputs are active, the output is the index of the one with the highest priority, and lower-priority inputs are ignored. A 4 to 2 priority encoder has four request inputs ( req[3:0] ), a 2-bit index output ( idx ) and a valid output. In this article, req[3] has the highest priority. req[3] req[2] req[1] req[0] idx valid 1 x x x 2'd3 1 0 1 x x 2'd2 1 0 0 1 x 2'd1 1 0 0 0 1 2'd0 1 0 0 0 0 2'd0 0 An x in the table means "don't care": once a higher-priority input is 1, the lower ones have no effect. Reading the table row by row gives these equations: idx[1] = req[3] | req[2] idx[0] = req[3] | (~req[2] & req[1]) valid = req[3] | req[2] | req[1] | req[0] The valid output is required because idx = 0 has two meanings: "only req[0] is active" and "nothing is active". Without valid , the logic that uses the encoder cannot tell them apart.`,
      },
      {
        title: "5. Syntax",
        content: `Verilog has no priority encoder keyword. You describe the ranking with one of these constructs inside a combinational always @(*) block. Basic Forms: // 1. if-else-if chain: the first true condition wins always @(*) begin if (req[3]) idx = 2'd3; // Highest priority, checked first else if (req[2]) idx = 2'd2; else if (req[1]) idx = 2'd1; else idx = 2'd0; // Final else: idx is always assigned end // 2. casez with wildcards: ? matches either 0 or 1 always @(*) begin casez (req) 4'b1??? : idx = 2'd3; 4'b01?? : idx = 2'd2; 4'b001? : idx = 2'd1; default : idx = 2'd0; endcase end // 3. for loop: the last assignment in the loop wins always @(*) begin idx = 0; for (i = 0; i < N; i = i + 1) if (req[i]) idx = i; end Components: req - Request inputs, N bits wide (required) idx - Index of the highest-priority active request, $clog2(N) bits wide (required) valid - High when at least one request is active (strongly recommended)`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **always @(posedge clk) ile Ardışıl Devre Modelleme** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **always @(posedge clk) ile Ardışıl Devre Modelleme** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![always @(posedge clk) ile Ardışıl Devre Modelleme Şeması](/images/verilog/jk-ff-wave.png)

![always @(posedge clk) ile Ardışıl Devre Modelleme Şeması](/images/verilog/mod10-counter-wave.png)

![always @(posedge clk) ile Ardışıl Devre Modelleme Şeması](/images/verilog/4b_lshift_wave.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Sequential Logic Sequential Logic with always Sequential Logic with always Why Master Sequential Logic? Sequential logic--circuits with memory and state--is the backbone of every computing system on the planet. From the billions of flip-flops in Apple's M3 processor to the state machines controlling Tesla's autopilot systems, sequential logic is what transforms static gates into intelligent machines. Engineers at Intel design CPU pipelines with hundreds of sequential stages; at Samsung, they optimize memory controller state machines for nanosecond-level timing. Understanding how to implement sequential logic in Verilog isn't just a classroom exercise--it's the foundation for designing CPUs, memory systems, communication interfaces, and every digital system that needs to remember information or sequence operations over time. 18 min read | Beginner to Intermediate`,
      },
      {
        title: "4. What You'll Learn",
        content: `How to implement sequential logic circuits like flip-flops, counters, and shift registers using always blocks The critical difference between combinational and sequential always blocks and when to use each How to properly handle clock signals, reset signals, and asynchronous vs. synchronous reset strategies How to write synthesizable sequential logic that correctly maps to hardware flip-flops and meets timing requirements A previous article showed different examples of using an always block to implement combinational logic. An always block is also mainly used to implement sequential logic which has memory elements like flip flops that can hold values.`,
      },
      {
        title: "5. Real-World Application",
        content: `Intel's CPU Pipeline Registers: In Intel's latest processors (Raptor Lake, Meteor Lake), the instruction execution pipeline has 15-20 stages, and between every stage are banks of flip-flops (pipeline registers) that hold intermediate results. Each clock cycle, data flows from one stage to the next through these sequential elements. These pipeline registers are implemented using the exact sequential logic patterns you'll learn here--always blocks sensitive to clock edges, synchronous resets, and carefully controlled data flow. A single Core i9 processor contains over 1 billion flip-flops, all working in concert at 5+ GHz. Understanding sequential logic is understanding how modern CPUs work at their most fundamental level.`,
      },
      {
        title: "6. Sequential vs. Combinational Logic",
        content: `Key Differences: Combinational Logic : Output depends only on current inputs (no memory). Examples: adders, multiplexers, decoders. Implemented with always @(*) or assign . Sequential Logic : Output depends on current inputs AND past history (has memory). Examples: flip-flops, counters, shift registers, state machines. Implemented with always @(posedge clk) . Synthesis Insight: Sequential logic always blocks synthesize to flip-flops and registers, while combinational always blocks synthesize to gates (AND, OR, NOT, MUX). When you write always @(posedge clk) , you're telling the synthesis tool "create flip-flops here." This is why understanding the difference is critical--it directly affects your hardware implementation and timing behavior.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **D Tipi Mandal (D Latch) ve Şeffaf Seviye Tetikleme** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **D Tipi Mandal (D Latch) ve Şeffaf Seviye Tetikleme** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![D Tipi Mandal (D Latch) ve Şeffaf Seviye Tetikleme Şeması](/images/verilog/latch1.png)

![D Tipi Mandal (D Latch) ve Şeffaf Seviye Tetikleme Şeması](/images/verilog/d_latch_schematic.png)

![D Tipi Mandal (D Latch) ve Şeffaf Seviye Tetikleme Şeması](/images/verilog/latch2.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Flip-Flops & Latches D Latch D Latch Why Learn D Latches? Most edge-triggered flip-flops are built from two latches, and the clock-gating cells that cut dynamic power in modern SoCs rely on a latch to stay glitch-free. Latches also appear in designs uninvited, whenever combinational code leaves an output unassigned. In this tutorial, you'll write a D latch, see what synthesis builds from it, and learn to recognize latches you never meant to create. A D latch is a level-sensitive storage element. While its enable input is high, the output follows the data input; when the enable goes low, the output holds its last value. In Verilog, a D latch is described with an always block that assigns the output only when the enable is active. 10 min read | Beginner Level`,
      },
      {
        title: "4. What You'll Learn",
        content: `How a D latch behaves in its transparent and hold states Write a D latch with an asynchronous reset in Verilog What synthesis builds from latch code, and how unintended latches get inferred How a latch differs from a flip-flop, and how to verify one with a testbench`,
      },
      {
        title: "5. What is a D Latch?",
        content: `A D latch has a data input ( d ), an enable input ( en ) and an output ( q ). The design in this article also has an active-low reset ( rstn ). The latch works in two states: Transparent (en = 1): q follows d . Any change on d appears on q after a short propagation delay. Hold (en = 0): q keeps the value d had at the moment en went low. Changes on d are ignored. rstn en d q (next) State 0 x x 0 Reset 1 1 0 0 Transparent 1 1 1 1 Transparent 1 0 x q (no change) Hold The key word is level-sensitive . A latch responds for the whole time the enable is high, not just at one instant. A flip-flop is edge-triggered and samples its input only at a clock edge.`,
      },
      {
        title: "6. Syntax",
        content: `Verilog has no latch keyword. Synthesis infers a latch when an always block assigns a signal under some conditions but not others, and the block is not edge-triggered. The signal must then keep its old value in the unassigned cases, which requires storage. Basic Form: always @(*) // Level-sensitive: no posedge or negedge if (en) // Assign q only when en is high... q <= d; // ...so q must hold its value when en is low Components: always @(*) - Level-sensitive block; must include d and en so q tracks d while transparent (required) if (en) - The enable condition, with no else branch for q (required) q - Declared as reg because it is assigned in a procedural block (required) Variations: // 1. With asynchronous active-low reset (used in this article) always @(*) if (!rstn) q <= 0; else if (en) q <= d; // 2. Negative-level latch: transparent while en is low always @(*) if (!en) q <= d;`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **D Tipi Flip-Flop: Kenar Tetikleme ve Asenkron Reset** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **D Tipi Flip-Flop: Kenar Tetikleme ve Asenkron Reset** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![D Tipi Flip-Flop: Kenar Tetikleme ve Asenkron Reset Şeması](/images/verilog/dff_async_reset_schematic.png)

![D Tipi Flip-Flop: Kenar Tetikleme ve Asenkron Reset Şeması](/images/verilog/dff_sync_reset_schematic.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Flip-Flops & Latches Verilog D Flip-Flop Verilog D Flip-Flop A D flip-flop with asynchronous reset captures its data input on the rising edge of the clock and clears its output the moment reset is asserted, without waiting for a clock edge. In Verilog, you write it with an always @(posedge clk or negedge rstn) block that checks reset first. 12 min read | Beginner Level`,
      },
      {
        title: "4. What You'll Learn",
        content: `How a D flip-flop captures data on a clock edge, and how asynchronous and synchronous resets differ Write both reset styles in Verilog What each style synthesizes into, and when to choose one over the other How to verify reset behavior with a testbench and avoid common reset coding errors`,
      },
      {
        title: "5. What is a D Flip-Flop?",
        content: `A D flip-flop is an edge-triggered storage element. At each rising edge of clk , it copies its data input d to its output q . Between edges, q holds its value no matter how d changes. This is the key difference from a level-sensitive D latch , which follows its input for as long as its enable is high. A reset input forces q to a known value, usually 0, so the design starts in a defined state. The designs in this article use an active-low reset, rstn , where 0 means "reset". rstn clk d q (next) Behavior 0 x x 0 Reset (async: immediately; sync: at next rising edge) 1 Rising edge 0 0 Capture d 1 Rising edge 1 1 Capture d 1 No edge x q (no change) Hold For correct capture, d must be stable for a short setup time before the clock edge and a hold time after it. Static timing analysis checks these requirements; see Verilog Timing Checks .`,
      },
      {
        title: "6. Syntax",
        content: `Basic Form (asynchronous active-low reset): always @(posedge clk or negedge rstn) // Wake up on a clock edge OR on reset assertion if (!rstn) // Reset is checked first q <= 0; // Reset value else q <= d; // Normal operation: capture d Components: posedge clk - The clock edge that captures data (required) negedge rstn - Makes the reset asynchronous; the edge must match the reset's active level, so an active-low reset uses negedge (required for async reset) if (!rstn) - Reset test, which must be the first statement in the block (required) <= - Non-blocking assignment, the standard for sequential logic (required) Variations: // 1. Synchronous reset: reset is not in the sensitivity list always @(posedge clk) if (!rstn) q <= 0; else q <= d; // 2. Asynchronous active-high reset: posedge rst, test if (rst) always @(posedge clk or posedge rst) if (rst) q <= 0; else q <= d; // 3. Multi-bit register: the same code, with vector ports // input [7:0] d; output reg [7:0] q; -> q <= 8'h00 on reset`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **T Tipi Flip-Flop (TFF) ile Frekans Bölme** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **T Tipi Flip-Flop (TFF) ile Frekans Bölme** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Flip-Flops & Latches Verilog T Flip Flop Verilog T Flip Flop A T flip-flop (toggle flip-flop) inverts its output on every active clock edge while its t input is 1, and holds its output while t is 0. In Verilog, you write it as a clocked always block that assigns q <= ~q when t is high. 10 min read | Beginner Level`,
      },
      {
        title: "3. What You'll Learn",
        content: `How a T flip-flop toggles and holds, and its characteristic equation Write a T flip-flop with a synchronous reset in Verilog What synthesis builds from it, since standard cell libraries have no T flip-flop cell Use T flip-flops for divide-by-2 and counter logic, and verify one with a testbench`,
      },
      {
        title: "4. What is a T Flip-Flop?",
        content: `A T flip-flop has a clock ( clk ), a toggle input ( t ) and an output ( q ). The design in this article also has an active-low synchronous reset ( rstn ). At each rising edge of clk : t = 0: q holds its current value. t = 1: q toggles to the opposite value. rstn t q (current) q (next) Behavior 0 x x 0 Reset 1 0 0 0 Hold 1 0 1 1 Hold 1 1 0 1 Toggle 1 1 1 0 Toggle The table reduces to the characteristic equation of a T flip-flop: q(next) = t ^ q When t is held at 1, the output toggles on every rising edge, so q is a square wave at half the clock frequency . This divide-by-2 behavior is the main reason T flip-flops appear in counters and clock dividers.`,
      },
      {
        title: "5. Syntax",
        content: `Basic Form: always @(posedge clk) if (!rstn) // Reset first q <= 0; else if (t) // Toggle when t is 1 q <= ~q; // No else needed: q holds its value when t is 0 Components: posedge clk - Clock edge at which q may change (required) if (!rstn) - Reset to a known value; without it, q stays unknown in simulation (strongly recommended) q <= ~q - Toggle: the new value is the inverse of the current value (required) Variations: // 1. Asynchronous reset: add the reset edge to the sensitivity list always @(posedge clk or negedge rstn) if (!rstn) q <= 0; else if (t) q <= ~q; // 2. Equation form: same hardware, written from the characteristic equation always @(posedge clk) if (!rstn) q <= 0; else q <= t ^ q; // 3. Always toggle (divide-by-2): t is effectively tied to 1 always @(posedge clk) if (!rstn) q <= 0; else q <= ~q;`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **JK Tipi Flip-Flop ve Evrensel Durum Değişimi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **JK Tipi Flip-Flop ve Evrensel Durum Değişimi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![JK Tipi Flip-Flop ve Evrensel Durum Değişimi Şeması](/images/verilog/jk_ff_schematic.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Flip-Flops & Latches JK Flip Flop JK Flip Flop A JK flip-flop is an edge-triggered storage element with two control inputs: j sets the output, k resets it, both low holds it, and both high toggles it. In Verilog, you write it as a clocked always block with a case statement on {j, k} . 10 min read | Beginner Level`,
      },
      {
        title: "4. What You'll Learn",
        content: `The four JK operations (hold, reset, set, toggle) and the characteristic equation Write a JK flip-flop in Verilog using a case statement What synthesis builds from it, and how JK relates to D, T and SR flip-flops Verify all four operations with a self-checking testbench`,
      },
      {
        title: "5. What is a JK Flip-Flop?",
        content: `A JK flip-flop has a clock ( clk ), two inputs ( j and k ) and an output ( q ). At each rising edge of clk , the pair {j, k} selects one of four operations: j k q (next) Operation 0 0 q Hold 0 1 0 Reset 1 0 1 Set 1 1 ~q Toggle Writing the table as a sum of products gives the characteristic equation : q(next) = (j & ~q) | (~k & q) Read it as two cases. When q is 0, the next value is j . When q is 1, the next value is ~k . Between clock edges, q holds its value no matter how j and k change. A JK flip-flop is an SR flip-flop with the forbidden state removed. On an SR flip-flop, S = R = 1 is invalid; on a JK flip-flop, j = k = 1 is defined as toggle. This makes JK a general-purpose element that can act as a D or T flip-flop with simple input wiring.`,
      },
      {
        title: "6. Syntax",
        content: `Basic Form: always @(posedge clk) case ({j, k}) // Concatenate j and k into a 2-bit selector 2'b00 : q <= q; // Hold 2'b01 : q <= 1'b0; // Reset 2'b10 : q <= 1'b1; // Set 2'b11 : q <= ~q; // Toggle endcase Components: posedge clk - Clock edge at which q may change (required) {j, k} - Concatenation with j as the upper bit, so 2'b10 means j = 1, k = 0 (required); see Verilog Concatenation 2'b11 : q <= ~q - The toggle case that distinguishes JK from SR (required) Variations: // 1. Equation form: same hardware, written from the characteristic equation always @(posedge clk) q <= (j & ~q) | (~k & q); // 2. With active-low asynchronous reset always @(posedge clk or negedge rstn) if (!rstn) q <= 1'b0; else case ({j, k}) 2'b01 : q <= 1'b0; 2'b10 : q <= 1'b1; 2'b11 : q <= ~q; default: ; // 2'b00: hold, q keeps its value endcase`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Conditional Statements** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Conditional Statements** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Conditional Statements Verilog Conditional Statements Verilog Conditional Statements Why Learn Conditional Statements? Every decision a chip makes, such as which instruction to run, which bus master gets access or whether a packet is dropped, is described in RTL with a conditional statement. The construct you pick also shapes the hardware: the same choice written three ways can become a mux, a priority chain or an unintended latch. In this tutorial, you'll learn the three conditional constructs in Verilog and what each one builds. Verilog conditional statements select which value is assigned, or which statements run, based on a condition. Verilog has three of them: the conditional operator ? : , the if-else statement and the case statement. In synthesizable RTL, each one describes selection hardware, usually a multiplexer. 12 min read | Beginner Level`,
      },
      {
        title: "3. What You'll Learn",
        content: `The syntax of the conditional operator, if-else and case , and where each can be used What hardware each construct synthesizes into How to choose the right construct for a given piece of logic How x values, multi-bit conditions and missing branches affect the result`,
      },
      {
        title: "4. Quick Reference",
        content: `All three constructs choose between alternatives. They differ in where you can write them and how many alternatives they handle well. Construct Where it can be used Choices Typical hardware ? : assign statements and procedural blocks 2 per operator 2 to 1 mux if-else Procedural blocks only ( always , initial ) 2, or more with else if 2 to 1 mux, or a priority chain case Procedural blocks only Many Parallel N to 1 mux // Conditional operator: inside a continuous assignment assign y = sel ? a : b; // if-else: inside a procedural block always @(*) if (sel) y = a; else y = b; // case: inside a procedural block always @(*) case (sel) 1'b1 : y = a; default : y = b; endcase These three blocks all describe the same 2 to 1 mux. In the last two, y must be declared as reg because it is assigned in an always block.`,
      },
      {
        title: "5. Conditional Operator",
        content: `The conditional operator ? : , also called the ternary operator, picks one of two expressions based on a condition. It is an expression, not a statement, so it can appear anywhere a value is expected, including the right-hand side of an assign statement . <variable> = <condition> ? <expression_1> : <expression_2>; <condition> - Evaluated first. Any non-zero value counts as true (required) <expression_1> - Result when the condition is true (required) <expression_2> - Result when the condition is false (required) module max2 ( input [7:0] a, input [7:0] b, output [7:0] max // Driven by assign, so it stays a wire ); // If a is greater than b, output a; otherwise output b assign max = (a > b) ? a : b; endmodule Synthesis result: Each ? : becomes a 2 to 1 mux . Its select line comes from the condition logic, here an 8-bit magnitude comparator for a > b .`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-conditional-statements_tb.v - Simülasyon Testbench",
          snippet: `<variable> = <condition> ? <expression_1> : <expression_2>;`,
        },
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **if-else Karar Yapıları ve Öncelik Zinciri Mantığı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **if-else Karar Yapıları ve Öncelik Zinciri Mantığı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![if-else Karar Yapıları ve Öncelik Zinciri Mantığı Şeması](/images/verilog/if_statement_latch.png)

![if-else Karar Yapıları ve Öncelik Zinciri Mantığı Şeması](/images/verilog/dff_sync_reset_schematic.png)

![if-else Karar Yapıları ve Öncelik Zinciri Mantığı Şeması](/images/verilog/if_else_if_schematic.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Conditional Statements Verilog if-else-if Verilog if-else-if The Verilog if-else-if statement decides which statements run based on one or more conditions. An if runs its block when its condition is true (non-zero), an optional else runs when it is false (zero, x or z), and else if adds further conditions that are checked in order until one is true. 12 min read | Beginner Level`,
      },
      {
        title: "4. What You'll Learn",
        content: `The syntax of if , if-else and if-else-if , and when begin / end is needed What each form synthesizes into: latch, flip-flop, enable or priority logic Why the order of an else if chain sets the priority, and when synthesis removes it How to avoid dangling-else, unreachable-branch and latch bugs`,
      },
      {
        title: "5. Syntax",
        content: `Each if or else branch controls exactly one statement. To put more than one statement in a branch, group them with begin and end . Like all procedural statements, if-else can only be used inside an always or initial block. See Verilog Conditional Statements for how it compares with the conditional operator and case . if ([expression]) Single statement // Use "begin" and "end" blocks for more than 1 statements if ([expression]) begin Multiple statements end // Use else to execute statements for which expression is false if ([expression]) begin Multiple statements end else begin Multiple statements end // if-else-if style to check for more expressions if the previous one doesn't match if ([expression 1]) Single statement else if ([expression 2]) begin Multiple Statements end else Single statement Components: [expression] - Any expression. A non-zero value is true; zero, x and z are false (required) begin ... end - Groups several statements into one branch; optional for a single statement else if - Checked only when every earlier condition was false; any number can be chained (optional) else - Runs when no earlier condition was true (optional) Conditions are evaluated from top to bottom, and only the first true branch runs. Every later branch is skipped, even if its condition is also true. This is what gives an if-else-if chain its priority.`,
      },
      {
        title: "6. Hardware Implementation",
        content: `What an if statement synthesizes into depends on two things: whether the always block is combinational or clocked, and whether every path assigns the output. Block type Every path assigns the output? Hardware always @(*) or level-sensitive Yes Combinational mux always @(*) or level-sensitive No Latch always @(posedge clk) Yes Flip-flop with a mux on D always @(posedge clk) No Flip-flop that holds, usually with a clock enable`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **case, casex ve casez İfadeleri ile Çok Yollu Seçim** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **case, casex ve casez İfadeleri ile Çok Yollu Seçim** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![case, casex ve casez İfadeleri ile Çok Yollu Seçim Şeması](/images/verilog/4x1_sel_mux_schematic.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Conditional Statements Verilog case statement Verilog case statement The Verilog case statement compares one expression against a list of case items and runs the statements of the first item that matches. It is the standard way to describe a multiplexer or decoder in RTL. A long if-else-if chain on overlapping conditions builds priority logic, while a case on distinct constant items builds a parallel mux. 12 min read | Beginner Level`,
      },
      {
        title: "4. What You'll Learn",
        content: `The syntax of case , including multiple values per item and the default item What a case statement synthesizes into, and how it differs from if-else How case matches x and z values, and how casez and casex differ How to avoid latch, width and unreachable-item bugs`,
      },
      {
        title: "5. Syntax",
        content: `A case statement starts with case and ends with endcase . Like if-else , it is a procedural statement, so it must be inside an always or initial block. // Here 'expression' should match one of the items (item 1,2,3 or 4) case (<expression>) case_item1 : <single statement> case_item2, case_item3 : <single statement> case_item4 : begin <multiple statements> end default : <statement> endcase Components: <expression> - Evaluated once, then compared against each case item in the order they are written (required) case_item - A value to compare against. Several values separated by commas share one branch, as with case_item2, case_item3 (at least one required) begin ... end - Groups multiple statements into one branch default - Runs when no item matches. Optional, and at most one is allowed Rules to remember: Only the first matching item runs. There is no fall-through to the next item, so no break is needed as in C. If no item matches and there is no default , no statement runs, and any signal assigned in the case keeps its old value. case statements can be nested inside other case or if branches.`,
      },
      {
        title: "6. Example",
        content: `This 3-input mux selects one of three 3-bit inputs with a 2-bit sel . Since sel has four possible values, the default item drives out to 0 when sel is 3. module my_mux (input [2:0] a, b, c, // Three 3-bit inputs input [1:0] sel, // 2-bit select signal to choose from a, b, c output reg [2:0] out); // Output 3-bit signal // This always block is executed whenever a, b, c or sel changes in value always @ (a, b, c, sel) begin case(sel) 2'b00 : out = a; // If sel=0, output is a 2'b01 : out = b; // If sel=1, output is b 2'b10 : out = c; // If sel=2, output is c default : out = 0; // If sel is anything else, out is always 0 endcase end endmodule Output ncsim> run [0] a=0x4 b=0x1 c=0x1 sel=0b11 out=0x0 [10] a=0x5 b=0x5 c=0x5 sel=0b10 out=0x5 [20] a=0x1 b=0x5 c=0x6 sel=0b01 out=0x5 [30] a=0x5 b=0x4 c=0x1 sel=0b10 out=0x1 [40] a=0x5 b=0x2 c=0x5 sel=0b11 out=0x0 ncsim: *W,RNQUIE: Simulation is complete. At 20 ns, sel is 1, so out takes b (5). At 30 ns, sel is 2, so out takes c (1). At 0 ns and 40 ns, sel is 3, which matches no item, so the default sets out to 0. `,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "3. Genel Bakış & Giriş",
        content: `Loops & Generate Verilog for Loop Verilog for Loop A Verilog for loop repeats a group of statements while a condition holds, with a loop variable that steps from a start value to an end value. In software, a loop runs its iterations one after another in time. In synthesizable Verilog, a for loop is a shorthand for replicating hardware : the synthesis tool unrolls every iteration into its own copy of the logic. 12 min read | Beginner Level`,
      },
      {
        title: "4. What You'll Learn",
        content: `The syntax of the for loop and how it differs from a software loop How synthesis unrolls a loop into parallel hardware Write compact, parameterized designs with for loops in clocked and combinational blocks Avoid loop bugs: non-constant bounds, narrow loop variables and wrong assignment types`,
      },
      {
        title: "5. Syntax",
        content: `A for loop has three parts in its header: an initial assignment, a condition checked before each iteration, and a step assignment that runs after each iteration. Like other procedural statements, it must be inside an always or initial block. for (<initial_condition>; <condition>; <step_assignment>) begin // Statements end <initial_condition> - Sets the loop variable's starting value, such as i = 0 (required) <condition> - The loop runs while this is true, such as i < 10 (required) <step_assignment> - Updates the loop variable after each iteration, such as i = i + 1 (required) begin ... end - Groups several statements in the loop body; optional for a single statement The loop variable is usually declared as an integer in the module. A while loop is more general, since it only needs a condition. A for loop is the better fit when there is a clear start, end and step, which is almost always the case in RTL. module my_design; integer i; initial begin // Note that ++ operator does not exist in Verilog ! for (i = 0; i < 10; i = i + 1) begin $display ("Current loop#%0d ", i); end end endmodule Output ncsim> run Current loop#0 Current loop#1 Current loop#2 Current loop#3 Current loop#4 Current loop#5 Current loop#6 Current loop#7 Current loop#8 Current loop#9 ncsim: *W,RNQUIE: Simulation is complete. The loop starts at i = 0 and stops when i reaches 10, so the body runs 10 times. Verilog has no ++ operator, so the step is written as i = i + 1 . The ++ operator was added in SystemVerilog.`,
      },
      {
        title: "6. How Synthesis Handles a for Loop",
        content: `Hardware has no notion of "running a loop". A synthesis tool unrolls the loop: it calculates every value the loop variable takes, then writes out the loop body once for each value, as if you had typed every iteration by hand. All the copies exist side by side in the hardware and work at the same time. This has two consequences: The loop bounds must be constants at compile time, such as numbers or parameters. The tool must know how many copies to build. The loop takes no time. All iterations happen within one evaluation of the always block, so a loop inside a clocked block finishes in a single clock cycle, not one iteration per clock. For loops are also used inside generate blocks to replicate module instances and assign statements, using a genvar loop variable. That is a different construct; see Verilog generate block .`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "3. Genel Bakış & Giriş",
        content: `Loops & Generate Verilog generate block Verilog generate block A generate block allows to multiply module instances or perform conditional instantiation of any module. It provides the ability for the design to be built based on Verilog parameters. These statements are particularly convenient when the same operation or module instance needs to be repeated multiple times or if certain code has to be conditionally included based on given Verilog parameters. A generate block cannot contain port, parameter, specparam declarations or specify blocks. However, other module items and other generate blocks are allowed. All generate instantiations are coded within a module and between the keywords generate and endgenerate . Generated instantiations can have either modules, continuous assignments, always or initial blocks and user defined primitives. There are two types of generate constructs - loops and conditionals. Generate for loop Generate if else Generate case`,
      },
      {
        title: "4. Generate for loop",
        content: `A half adder will be instantiated N times in another top level design module called my_design using a generate for loop construct. The loop variable has to be declared using the keyword genvar which tells the tool that this variable is to be specifically used during elaboration of the generate block. // Design for a half-adder module ha ( input a, b, output sum, cout); assign sum = a ^ b; assign cout = a & b; endmodule // A top level design that contains N instances of half adder module my_design #(parameter N=4) ( input [N-1:0] a, b, output [N-1:0] sum, cout); // Declare a temporary loop variable to be used during // generation and won't be available during simulation genvar i; // Generate for loop to instantiate N times generate for (i = 0; i < N; i = i + 1) begin ha u0 (a[i], b[i], sum[i], cout[i]); end endgenerate endmodule`,
      },
      {
        title: "5. Testbench",
        content: `The testbench parameter is used to control the number of half adder instances in the design. When N is 2, my_design will have two instances of half adder. module tb; parameter N = 2; reg [N-1:0] a, b; wire [N-1:0] sum, cout; // Instantiate top level design with N=2 so that it will have 2 // separate instances of half adders and both are given two separate // inputs my_design #(.N(N)) md( .a(a), .b(b), .sum(sum), .cout(cout)); initial begin a <= 0; b <= 0; $monitor ("a=0x%0h b=0x%0h sum=0x%0h cout=0x%0h", a, b, sum, cout); #10 a <= 'h2; b <= 'h3; #20 b <= 'h4; #10 a <= 'h5; end endmodule a[0] and b[0] gives the output sum[0] and cout[0] while a[1] and b[1] gives the output sum[1] and cout[1] . Output ncsim> run a=0x0 b=0x0 sum=0x0 cout=0x0 a=0x2 b=0x3 sum=0x1 cout=0x2 a=0x2 b=0x0 sum=0x2 cout=0x0 a=0x1 b=0x0 sum=0x1 cout=0x0 ncsim: *W,RNQUIE: Simulation is complete. ncsim> exit  See that elaborated RTL does indeed have two half adder instances generated by the generate block.`,
      },
      {
        title: "6. Generate if",
        content: `Shown below is an example using an if else inside a generate construct to select between two different multiplexer implementations. The first design uses an assign statement to implement a mux while the second design uses a case statement. A parameter called USE_CASE is defined in the top level design module to select between the two choices. // Design #1: Multiplexer design uses an "assign" statement to assign // out signal module mux_assign ( input a, b, sel, output out); assign out = sel ? a : b; // The initial display statement is used so that // we know which design got instantiated from simulation // logs initial $display ("mux_assign is instantiated"); endmodule // Design #2: Multiplexer design uses a "case" statement to drive // out signal module mux_case (input a, b, sel, output reg out); always @ (a or b or sel) begin case (sel) 0 : out = a; 1 : out = b; endcase end // The initial display statement is used so that // we know which design got instantiated from simulation // logs initial $display ("mux_case is instantiated"); endmodule // Top Level Design: Use a parameter to choose either one module my_design ( input a, b, sel, output out); parameter USE_CASE = 0; // Use a "generate" block to instantiate either mux_case // or mux_assign using an if else construct with generate generate if (USE_CASE) mux_case mc (.a(a), .b(b), .sel(sel), .out(out)); else mux_assign ma (.a(a), .b(b), .sel(sel), .out(out)); endgenerate endmodule`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "8. Simülasyon ve Testbench Kodu",
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
      },
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
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Fonksiyonları (function ... endfunction)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Fonksiyonları (function ... endfunction)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Functions & Tasks Verilog Functions Verilog Functions Why Learn Functions? Checksum logic, Gray-code conversion, parity checks and bit-field decoding often appear in several places in one design. Copying the same expression into each place makes the code longer and every bug fix a search-and-replace job. A function describes the computation once and lets you call it wherever you need it. In this tutorial, you'll learn to write Verilog functions, what hardware they create, and the rules that keep them synthesizable. A Verilog function is a reusable block of code that takes one or more inputs, computes a result and returns a single value, much like a function in C. Functions run in zero simulation time: they cannot contain delays or wait for events, so they are used for combinational computations that would otherwise be repeated in several places. 12 min read | Beginner Level`,
      },
      {
        title: "3. What You'll Learn",
        content: `How to declare, return a value from and call a Verilog function What hardware a function synthesizes into The rules functions must follow, and when to use automatic How to use recursive and constant functions, and avoid common function bugs`,
      },
      {
        title: "4. Syntax",
        content: `function [automatic] [return_type] name ([port_list]); [statements] endfunction automatic - Gives every call its own copy of the function's variables, which is required for recursion (optional) return_type - A range such as [7:0] , or a type such as integer . If left out, the function returns a single bit (optional) name - The function name, which also acts as the variable that holds the return value (required) port_list - One or more input arguments (at least one required) statements - The body; use begin ... end to group several statements Functions are declared inside a module, outside any always or initial block, and can be called from anywhere in that module.`,
      },
      {
        title: "5. Function declarations",
        content: `There are two equivalent ways to declare a function's inputs. In the first, the inputs are declared inside the function body, one declaration per line. In the second, which is more common in newer code, they are declared in a port list after the name, like the ports of a module. function [7:0] sum; input [7:0] a, b; begin sum = a + b; end endfunction function [7:0] sum (input [7:0] a, b); begin sum = a + b; end endfunction Both versions describe the same function: it takes two 8-bit inputs and returns their 8-bit sum. Since the return type is [7:0] , any carry out of bit 7 is dropped.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
        content: `Functions & Tasks Verilog Task Verilog Task A Verilog task is a named, reusable block of procedural code that can take inputs, return any number of results through output and inout arguments, and, unlike a function, contain timing controls such as # delays, @ event controls and wait . Tasks are used mostly in testbenches, to package sequences that take simulation time, such as driving a bus transaction or applying a reset. 12 min read | Beginner Level`,
      },
      {
        title: "3. What You'll Learn",
        content: `How to declare and call a task, with inputs, outputs and timing controls How static and automatic tasks differ when calls overlap When to use a task instead of a function, and what tasks synthesize into How to stop a running task with disable , and avoid common task bugs`,
      },
      {
        title: "4. Syntax",
        content: `A task can declare its arguments in the body (Style 1) or in a port list after the name (Style 2). Arguments can be input , output or inout , and a task can also have no arguments at all. // Style 1 task [name]; input [port_list]; inout [port_list]; output [port_list]; begin [statements] end endtask // Style 2 task [name] (input [port_list], inout [port_list], output [port_list]); begin [statements] end endtask // Empty port list task [name] (); begin [statements] end endtask name - The task name, used to call it (required) input - Values copied into the task when it is called output - Values copied out to the caller's variables when the task finishes inout - Copied in at the call and copied out at the end statements - The task body; it may contain delays, event controls and calls to other tasks and functions The empty parentheses in task name (); are SystemVerilog syntax. In Verilog, a task without arguments is declared as task name; and called as name; . Most simulators accept both. A task is called as a statement on its own, not as part of an expression, because it does not return a value. Each argument in the call is matched to the task's arguments in the order they were declared.`,
      },
      {
        title: "5. Static Task",
        content: `This task adds two 8-bit values and returns the result through an output argument. Both declaration styles below describe the same task. task sum (input [7:0] a, b, output [7:0] c); begin c = a + b; end endtask // or task sum; input [7:0] a, b; output [7:0] c; begin c = a + b; end endtask reg [7:0] x, y, z; initial begin x = 3; y = 4; sum (x, y, z); // After the call, z = 7 end By default, a Verilog task is static : there is only one copy of its arguments and internal variables, and every call uses that same copy. If two calls of the same task run at the same time, for example from two initial blocks, they read and write the same variables. This example shows the effect: module tb; initial display(); initial display(); initial display(); initial display(); // This is a static task task display(); integer i = 0; i = i + 1; $display("i=%0d", i); endtask endmodule Output xcelium> run i=1 i=2 i=3 i=4 xmsim: *W,RNQUIE: Simulation is complete. All four calls share one variable i . In a static task, the initial value = 0 is applied only once, at the start of simulation, so each call adds 1 to the value left by the previous call.`,
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
        title: "7. Simülasyon ve Testbench Kodu",
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
      },
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
