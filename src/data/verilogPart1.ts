import { LessonContent } from "./lessonsData";

export const VERILOG_PART1: Record<string, LessonContent> = {
  "verilog": {
    id: "verilog",
    badge: "Bölüm 1 • Verilog'a Giriş & Temeller",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog HDL Eğitimi: Temellerden Donanım Tasarımına",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 1: Verilog'a Giriş & Temeller. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog HDL Eğitimi: Temellerden Donanım Tasarımına** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog HDL Eğitimi: Temellerden Donanım Tasarımına** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Getting Started with Verilog Verilog Tutorial Verilog Tutorial Why Learn Verilog? The phone in your pocket, the processor in your laptop and the controller in your car all started as text files of hardware description code. Verilog is one of the languages engineers use to write that code, and it is a core skill for anyone who wants to design or verify chips or FPGAs. In this tutorial series, you'll go from your first module to counters, state machines, memories and testbenches, one short article at a time. Verilog is a text-based language used to describe, simulate and synthesize digital circuits. This page explains what Verilog is, where it came from, how it differs from software languages, and how this tutorial is organized, so that you know what to expect before you write your first line of code. 12 min read | Beginner Level`,
      },
      {
        title: "3. What You'll Learn",
        content: `Understand what Verilog is and how it revolutionized digital circuit design Learn the key differences between Verilog and software programming languages Master the concept of hardware abstraction and behavioral modeling Write your first Verilog module with proper syntax and structure`,
      },
      {
        title: "4. What is Verilog ?",
        content: `Verilog is a hardware description language (HDL): a language for describing digital systems such as gates, flip-flops, counters, processors and complete chips as text. It was created in 1983 and 1984 at Gateway Design Automation as a language for its logic simulator. Cadence acquired Gateway around 1990 and soon after made the language public, and it was standardized as IEEE 1364 in 1995, with revisions in 2001 and 2005. In 2009 it was merged into the SystemVerilog standard, IEEE 1800, which still contains all of Verilog. Verilog is used to design both ASICs (custom chips) and FPGAs (programmable chips). The same code serves two purposes: Simulation: a simulator runs the code to check that the circuit behaves as intended Synthesis: a synthesis tool converts the code into a netlist of real gates and flip-flops Verilog supports several levels of description. You can describe a circuit structurally by connecting gates and smaller blocks, at the register transfer level (RTL) by describing how data moves between registers on each clock edge, or behaviorally by describing what the circuit does. Large designs are built hierarchically: small modules such as adders and flip-flops are combined into bigger blocks, which are combined into a complete chip. You can read more about these levels in Design Abstraction Layers .`,
      },
      {
        title: "5. Real-World Application",
        content: `Processors, graphics chips, network switches, storage controllers and the chips inside phones, cars and home appliances are designed with Verilog or its successor SystemVerilog. A typical chip project has hundreds of thousands of lines of RTL code, written by many engineers as separate modules and then connected into one design. The same language is used for small FPGA projects such as a motor controller or a video interface on a hobby board.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog HDL Eğitimi: Temellerden Donanım Tasarımına** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog.v - Örnek Donanım Modülü",
          snippet: `// and_gate.v
module and_gate (input A, B, output Y);
  assign Y = A & B;
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog_tb.v - Simülasyon Testbench",
          snippet: `module ctr (input             up_down,
                              clk,
                              rstn,
            output reg [2:0]  out);

  always @ (posedge clk)
    if (!rstn)
      out <= 0;
    else begin
      if (up_down)
        out <= out + 1;
      else
        out <= out - 1;
    end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `// and_gate.v
module and_gate (input A, B, output Y);
  assign Y = A & B;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog HDL Eğitimi: Temellerden Donanım Tasarımına ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-introduction": {
    id: "verilog-introduction",
    badge: "Bölüm 1 • Verilog'a Giriş & Temeller",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog HDL'e Giriş ve Donanım Modelleme Felsefesi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 1: Verilog'a Giriş & Temeller. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog HDL'e Giriş ve Donanım Modelleme Felsefesi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog HDL'e Giriş ve Donanım Modelleme Felsefesi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog HDL'e Giriş ve Donanım Modelleme Felsefesi Şeması](/images/verilog/intro-verilog-flash-1.PNG)

![Verilog HDL'e Giriş ve Donanım Modelleme Felsefesi Şeması](/images/verilog/intro-verilog-flash2.PNG)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Getting Started with Verilog Introduction to Verilog Introduction to Verilog Verilog is a Hardware Description Language (HDL) that allows engineers to describe digital circuit behavior using text-based code instead of drawing gate-level schematics, enabling automated synthesis tools to convert behavioral descriptions into actual hardware implementations used in ASICs and FPGAs. 12 min read | Beginner`,
      },
      {
        title: "4. What You'll Learn",
        content: `What Verilog is and why hardware description languages revolutionized digital design How Verilog abstracts gate-level schematics into behavioral code The basic structure of a Verilog module including ports, signals, and behavioral blocks How testbenches verify hardware designs through simulation`,
      },
      {
        title: "5. From Gates to Hardware Description",
        content: `A digital element such as a flip-flop can be represented with combinational gates like NAND and NOR. The functionality of a flip-flop is achieved by the connection of a certain set of gates in a particular manner. How the gates have to be connected is usually figured out by solving K-map from the truth table. The truth table is nothing but a table that tells us what inputs combine together to give what values of output. Shown in the image below is an electronic circuit that represents a D-flip flop and the corresponding truth table. The output q becomes 1 only when rstn and d are both having a value of 1.`,
      },
      {
        title: "6. What is a hardware schematic ?",
        content: `A hardware schematic is a diagram that shows how the combinational gates should be connected to achieve a particular hardware functionality. In this case, it is the set of NAND gates connected like shown towards the left in the image above. However, if we know what values of inputs contribute to make the output have a value of 1, then we can essentially hide the internal details of the connections and encapsulate it into a black-box. This block provides us with certain inputs and outputs that is similar to the hardware schematic made up of combinational gates.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog HDL'e Giriş ve Donanım Modelleme Felsefesi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-introduction.v - Örnek Donanım Modülü",
          snippet: `module [design_name] ( [port_list] );

	[list_of_input_ports]
	[list_of_output_ports]

	[declaration_of_other_signals]

	[other_module_instantiations_if_required]

	[behavioral_code_for_this_module]
endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-introduction_tb.v - Simülasyon Testbench",
          snippet: `// "dff" is the name of this module 

module dff ( 	input 		d, 			// Inputs to the design should start with "input"
							rstn,
							clk,
				output reg	q); 		// Outputs of the design should start with "output"				
	
	always @ (posedge clk) begin 	// This block is executed at the positive edge of clk 0->1
		if (!rstn) 				// At the posedge, if rstn is 0 then q should get 0
			q <= 0;
		else 
			q <= d; 				// At the posedge, if rstn is 1 then q should get d
	end
endmodule 							// End of module`,
        },
      },
    ],
    playground: {
      initialCode: `module [design_name] ( [port_list] );

	[list_of_input_ports]
	[list_of_output_ports]

	[declaration_of_other_signals]

	[other_module_instantiations_if_required]

	[behavioral_code_for_this_module]
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog HDL'e Giriş ve Donanım Modelleme Felsefesi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-hello-world": {
    id: "verilog-hello-world",
    badge: "Bölüm 1 • Verilog'a Giriş & Temeller",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Hello World: İlk Modül ve Simülasyon Çıktısı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 1: Verilog'a Giriş & Temeller. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Hello World: İlk Modül ve Simülasyon Çıktısı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Hello World: İlk Modül ve Simülasyon Çıktısı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Getting Started with Verilog Verilog Hello World Verilog Hello World It's always best to get started using a very simple example, and none serves the purpose best other than "Hello World !". // Single line comments start with double forward slash "//" // Verilog code is always written inside modules, and each module represents a digital block with some functionality module tb; // Initial block is another construct typically used to initialize signal nets and variables for simulation initial // Verilog supports displaying signal values to the screen so that designers can debug whats wrong with their circuit // For our purposes, we'll simply display "Hello World" $display ("Hello World !"); endmodule A module called tb with no input-output ports act as the top module for the simulation. The initial block starts and executes the first statement at time 0 units. $display is a Verilog system task used to display a formatted string to the console and cannot be synthesized into hardware. Its primarily used to help with testbench and design debug. In this case, the text message displayed onto the screen is "Hello World !". Output $ /usr/bin/vvp simulation Hello World !  `,
      },
      {
        title: "3. Quiz",
        content: `No quiz questions available for this article. &nbsp;&nbsp;Prev Article Next Article&nbsp;&nbsp;`,
      },
      {
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Hello World: İlk Modül ve Simülasyon Çıktısı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-hello-world.v - Örnek Donanım Modülü",
          snippet: `// Single line comments start with double forward slash "//"
// Verilog code is always written inside modules, and each module represents a digital block with some functionality
module tb;

  // Initial block is another construct typically used to initialize signal nets and variables for simulation
	initial
		// Verilog supports displaying signal values to the screen so that designers can debug whats wrong with their circuit
		// For our purposes, we'll simply display "Hello World" 
		$display ("Hello World !");
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `// Single line comments start with double forward slash "//"
// Verilog code is always written inside modules, and each module represents a digital block with some functionality
module tb;

  // Initial block is another construct typically used to initialize signal nets and variables for simulation
	initial
		// Verilog supports displaying signal values to the screen so that designers can debug whats wrong with their circuit
		// For our purposes, we'll simply display "Hello World" 
		$display ("Hello World !");
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Hello World: İlk Modül ve Simülasyon Çıktısı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "asic-soc-chip-design-flow": {
    id: "asic-soc-chip-design-flow",
    badge: "Bölüm 1 • Verilog'a Giriş & Temeller",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "ASIC ve SoC Çip Tasarım Akışı (Fikirden Silikona)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 1: Verilog'a Giriş & Temeller. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **ASIC ve SoC Çip Tasarım Akışı (Fikirden Silikona)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **ASIC ve SoC Çip Tasarım Akışı (Fikirden Silikona)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![ASIC ve SoC Çip Tasarım Akışı (Fikirden Silikona) Şeması](/images/verilog/design_flow.png)

![ASIC ve SoC Çip Tasarım Akışı (Fikirden Silikona) Şeması](/images/verilog/soc_architecture_diagram.svg)

![ASIC ve SoC Çip Tasarım Akışı (Fikirden Silikona) Şeması](/images/verilog/uvm_scoreboard.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Getting Started with Verilog ASIC Design Flow ASIC Design Flow ASIC design flow is the systematic methodology for transforming a chip concept from initial requirements through architecture, RTL design, verification, synthesis, physical implementation, and validation--a multi-stage process used by semiconductor companies to develop custom integrated circuits for applications ranging from smartphones to data centers. 15 min read | Beginner to Intermediate`,
      },
      {
        title: "4. What You'll Learn",
        content: `The complete ASIC design flow from requirements gathering through post-silicon validation How RTL design, verification, and synthesis transform HDL code into physical chips The roles of different engineering teams (architects, designers, verification, physical design) in chip development Industry practices used by companies like Intel, NVIDIA, and Qualcomm to develop modern processors`,
      },
      {
        title: "5. What is VLSI?",
        content: `VLSI stands for Very Large Scale Integration, a technology used to create integrated circuits (ICs) by combining millions or billions of transistors into a single chip. VLSI technology revolutionized electronics by enabling compact, powerful, and cost-effective microprocessors, memory chips, digital signal processors, and advanced electronic devices. Modern VLSI processes operate at nanometer-scale nodes. As of 2024, leading-edge processes have reached 3nm technology nodes, with feature sizes enabling the integration of tens of billions of transistors on a single chip. Companies like TSMC, Samsung, and Intel manufacture processors using 5nm, 3nm, and emerging 2nm process nodes, delivering unprecedented performance and power efficiency.`,
      },
      {
        title: "6. Real-World Application",
        content: `Apple M3 Processor: Apple's M3 processor, manufactured on TSMC's 3nm process, integrates over 25 billion transistors on a single die. This includes CPU cores, GPU cores, neural engine, memory controllers, and I/O interfaces--demonstrating the massive integration density enabled by modern VLSI technology.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **ASIC ve SoC Çip Tasarım Akışı (Fikirden Silikona)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "asic-soc-chip-design-flow.v - Örnek Donanım Modülü",
          snippet: `module ram_single_port
#(
 parameter ADDR_WIDTH = 16, // 64K addresses
 parameter DATA_WIDTH = 32 // 32-bit data bus
)
(
 input wire clk, // Clock input
 input wire we, // Write enable (1=write, 0=read)
 input wire [ADDR_WIDTH-1:0] addr, // Address input
 input wire [DATA_WIDTH-1:0] din, // Data input (for writes)
 output wire [DATA_WIDTH-1:0] dout // Data output (for reads)
);

 // Memory array: 2^16 locations, each 32 bits wide
 reg [DATA_WIDTH-1:0] mem [2**ADDR_WIDTH-1:0];

 // Synchronous write operation
 always @(posedge clk) begin
 if (we == 1'b1)
 mem[addr] <= din; // Write data to address 'addr' on clock edge
 end

 // Asynchronous read operation (combinational)
 assign dout = mem[addr]; // Read data from current address

endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "asic-soc-chip-design-flow_tb.v - Simülasyon Testbench",
          snippet: `// Synthesized netlist from RTL (partial example)
and_2_0 u_and2_0 (
 .in_a (_net_112), // Input A connected to net 112
 .in_b (_net_56), // Input B connected to net 56
 .out (_net_222) // Output connected to net 222
);

ff_lt u_ff_lt_122 (
 .d (_net_222), // Data input from AND gate output
 .clk (_net_11), // Clock signal
 .q (_net_76) // Flip-flop output
);`,
        },
      },
    ],
    playground: {
      initialCode: `module ram_single_port
#(
 parameter ADDR_WIDTH = 16, // 64K addresses
 parameter DATA_WIDTH = 32 // 32-bit data bus
)
(
 input wire clk, // Clock input
 input wire we, // Write enable (1=write, 0=read)
 input wire [ADDR_WIDTH-1:0] addr, // Address input
 input wire [DATA_WIDTH-1:0] din, // Data input (for writes)
 output wire [DATA_WIDTH-1:0] dout // Data output (for reads)
);

 // Memory array: 2^16 locations, each 32 bits wide
 reg [DATA_WIDTH-1:0] mem [2**ADDR_WIDTH-1:0];

 // Synchronous write operation
 always @(posedge clk) begin
 if (we == 1'b1)
 mem[addr] <= din; // Write data to address 'addr' on clock edge
 end

 // Asynchronous read operation (combinational)
 assign dout = mem[addr]; // Read data from current address

endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "ASIC ve SoC Çip Tasarım Akışı (Fikirden Silikona) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-design-abstraction-layers": {
    id: "verilog-design-abstraction-layers",
    badge: "Bölüm 1 • Verilog'a Giriş & Temeller",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Donanım Tasarımında Soyutlama Seviyeleri (Davranışsal, RTL, Kapı)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 1: Verilog'a Giriş & Temeller. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Donanım Tasarımında Soyutlama Seviyeleri (Davranışsal, RTL, Kapı)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Donanım Tasarımında Soyutlama Seviyeleri (Davranışsal, RTL, Kapı)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Donanım Tasarımında Soyutlama Seviyeleri (Davranışsal, RTL, Kapı) Şeması](/images/verilog/if_else_if_schematic.png)

![Donanım Tasarımında Soyutlama Seviyeleri (Davranışsal, RTL, Kapı) Şeması](/images/verilog/4x2_encoder_truth_table.png)

![Donanım Tasarımında Soyutlama Seviyeleri (Davranışsal, RTL, Kapı) Şeması](/images/verilog/dal_transistor_view.svg)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Getting Started with Verilog Design Abstraction Layers Design Abstraction Layers 5 min read | Beginner`,
      },
      {
        title: "4. What You'll Learn",
        content: `Understand the five abstraction layers in digital design: architecture, RTL, schematic, transistor, and physical Recognize the differences between top-down and bottom-up design methodologies Apply abstraction concepts to organize complex chip designs Identify which abstraction level is appropriate for different design tasks Before we look at more details of the Verilog language, it would be good to understand the different layers of abstraction in chip design. Design abstraction enables engineers to manage complexity by working at different levels of detail.`,
      },
      {
        title: "5. Real-World Application",
        content: `In modern SoC design, different teams work at different abstraction layers simultaneously. Architecture teams define system-level specifications, RTL designers write Verilog code, synthesis engineers optimize gate-level netlists, and physical design teams create layouts--all working on the same chip but at different abstraction levels. This division of labor enables teams of hundreds of engineers to collaborate on billion-transistor designs.`,
      },
      {
        title: "6. Design Abstraction",
        content: `Design abstraction layers refer to the different levels of detail at which a hardware system can be described. These layers facilitate the design process by allowing designers to focus on specific aspects of the system without getting bogged down by lower-level details.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Donanım Tasarımında Soyutlama Seviyeleri (Davranışsal, RTL, Kapı)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-design-abstraction-layers.v - Örnek Donanım Modülü",
          snippet: `module alu_32b (a, b, operation, result);
	input [31:0] 		a;
	input [31:0] 		b;
	input [1:0] 		operation;
	output reg [31:0] 	result;

	always@(a or b or operation) begin
		case (operation)
			2'b00: result = a & b; 		// AND
			2'b01: result = a | b; 	// OR
			2'b10: result = a + b; 	// Addition
			2'b11: result = a - b; 		// Subtraction
		endcase
	end

endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-design-abstraction-layers_tb.v - Simülasyon Testbench",
          snippet: `// WRONG - Structurally instantiating individual gates at RTL
and a1 (n1, a, b);
and a2 (n2, c, d);
or  o1 (out, n1, n2);`,
        },
      },
    ],
    playground: {
      initialCode: `module alu_32b (a, b, operation, result);
	input [31:0] 		a;
	input [31:0] 		b;
	input [1:0] 		operation;
	output reg [31:0] 	result;

	always@(a or b or operation) begin
		case (operation)
			2'b00: result = a & b; 		// AND
			2'b01: result = a | b; 	// OR
			2'b10: result = a + b; 	// Addition
			2'b11: result = a - b; 		// Subtraction
		endcase
	end

endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Donanım Tasarımında Soyutlama Seviyeleri (Davranışsal, RTL, Kapı) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "simulation-synthesis-tools": {
    id: "simulation-synthesis-tools",
    badge: "Bölüm 2 • Geliştirme Araçları & Simülatörler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Simülasyon ve Mantıksal Sentez Araçları",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 2: Geliştirme Araçları & Simülatörler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Simülasyon ve Mantıksal Sentez Araçları** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Simülasyon ve Mantıksal Sentez Araçları** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Simülasyon ve Mantıksal Sentez Araçları Şeması](/images/verilog/cv-lab-sim.png)

![Verilog Simülasyon ve Mantıksal Sentez Araçları Şeması](/images/verilog/edaplayground.png)

![Verilog Simülasyon ve Mantıksal Sentez Araçları Şeması](/images/verilog/cv-lab-synth.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Tools & Environment Simulation & Synthesis Tools Simulation & Synthesis Tools As a student learning digital design, understanding the tools that bring your Verilog code to life is just as important as mastering the language itself. This guide will walk you through the essential tools you'll encounter in your digital design journey, from writing your first testbench to implementing complex designs on actual hardware.`,
      },
      {
        title: "4. Getting Started",
        content: `When you write Verilog code, you're creating a description of digital hardware. But to verify that your design works correctly and eventually implement it on real chips, you need specialized tools. Think of these tools as translators and validators that transform your code into working digital circuits.`,
      },
      {
        title: "5. Simulation Tools",
        content: `Simulation is where you'll spend most of your time as a student. It's like having a virtual laboratory where you can test the functionality of your digital circuits before converting them into hardware.`,
      },
      {
        title: "6. ChipVerify Lab",
        content: `ChipVerify Lab is a web-based integrated development environment (IDE) that allows users to write, simulate, and verify Verilog/SystemVerilog code directly in their browser without any installation. It is a cloud-based platform designed for engineers to practice digital design, and analyze waveforms, making it a comprehensive tool for learning and testing.`,
      },
    ],
    playground: {
      initialCode: `// Verilog Simülasyon ve Mantıksal Sentez Araçları
module simulation_synthesis_tools (
    input wire clk,
    input wire rst_n,
    output wire out_sig
);
    assign out_sig = 1'b1;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Simülasyon ve Mantıksal Sentez Araçları ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-syntax": {
    id: "verilog-syntax",
    badge: "Bölüm 3 • Temel Sözdizimi & Modül Yapısı",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Sözdizimi, Tanımlayıcılar ve Kod Standartları",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 3: Temel Sözdizimi & Modül Yapısı. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Sözdizimi, Tanımlayıcılar ve Kod Standartları** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Sözdizimi, Tanımlayıcılar ve Kod Standartları** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Sözdizimi, Tanımlayıcılar ve Kod Standartları Şeması](/images/verilog/verilog_keywords_2.png)

![Verilog Sözdizimi, Tanımlayıcılar ve Kod Standartları Şeması](/images/verilog/verilog_keywords.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Basic Syntax & Structure Verilog Syntax Verilog Syntax Verilog syntax defines the lexical conventions and structural rules for writing hardware description code. Understanding these fundamental elements--from operators and number formats to identifiers and keywords--is essential for writing correct, readable RTL designs that synthesize properly. 10 min read | Beginner`,
      },
      {
        title: "4. What You'll Learn",
        content: `Use proper commenting styles and understand whitespace handling in Verilog Specify numbers in different bases (binary, hex, octal) with correct sizing Follow identifier naming rules and avoid reserved keywords Apply unary, binary, and ternary operators correctly in expressions`,
      },
      {
        title: "5. Lexical Conventions",
        content: `Lexical conventions in Verilog are similar to C in the sense that it contains a stream of tokens. A lexical token may consist of one or more characters and tokens can be comments, keywords, numbers, strings or white space. All lines should be terminated by a semi-colon ; . Verilog is case-sensitive , so var_a and var_A are different identifiers. This is a common source of bugs when referencing signals.`,
      },
      {
        title: "6. Comments",
        content: `There are two ways to write comments in Verilog: A single line comment starts with // and tells Verilog compiler to treat everything after this point to the end of the line as a comment. A multiple-line comment starts with /* and ends with */ and cannot be nested. However, single line comments can be nested in a multiple line comment. // This is a single line comment // Creates an int variable called a integer a; // Everything to the right of // is ignored by compiler /* This is a multiple-line or block comment All of this text is ignored by the compiler */ /* This is /* an invalid nested block comment */ // ERROR: The first */ closes the comment */ // This becomes a syntax error /* However, // single-line comments inside block comments are okay // because // doesn't end the block comment */ // This is also okay ///////////// Still a valid comment - multiple // in a row Use single-line comments ( // ) for brief explanations and block comments ( /* */ ) for disabling large sections of code during debugging.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Sözdizimi, Tanımlayıcılar ve Kod Standartları** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-syntax.v - Örnek Donanım Modülü",
          snippet: `// This is a single line comment

// Creates an int variable called a
integer a; // Everything to the right of // is ignored by compiler

/*
This is a
multiple-line or
block comment
All of this text is ignored by the compiler
*/

/* This is /*
an invalid nested
block comment */ // ERROR: The first */ closes the comment
*/ // This becomes a syntax error

/* However,
// single-line comments inside block comments are okay
// because // doesn't end the block comment
*/

// This is also okay
///////////// Still a valid comment - multiple // in a row`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-syntax_tb.v - Simülasyon Testbench",
          snippet: `module dut; // 'module' is a keyword, 'dut' is an identifier
 reg [8*6:1] name = "Hello!"; // The 2 spaces at the start are ignored (indentation)

 // Multiple spaces between tokens are treated as single space
 wire a; // Same as: wire a;
 wire b; // Same as: wire b;
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `// This is a single line comment

// Creates an int variable called a
integer a; // Everything to the right of // is ignored by compiler

/*
This is a
multiple-line or
block comment
All of this text is ignored by the compiler
*/

/* This is /*
an invalid nested
block comment */ // ERROR: The first */ closes the comment
*/ // This becomes a syntax error

/* However,
// single-line comments inside block comments are okay
// because // doesn't end the block comment
*/

// This is also okay
///////////// Still a valid comment - multiple // in a row`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Sözdizimi, Tanımlayıcılar ve Kod Standartları ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-modules": {
    id: "verilog-modules",
    badge: "Bölüm 3 • Temel Sözdizimi & Modül Yapısı",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Modül Mimarisi (module ... endmodule)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 3: Temel Sözdizimi & Modül Yapısı. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Modül Mimarisi (module ... endmodule)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Modül Mimarisi (module ... endmodule)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Modül Mimarisi (module ... endmodule) Şeması](/images/verilog/dff_module.png)

![Verilog Modül Mimarisi (module ... endmodule) Şeması](/images/verilog/dff_sync_reset_schematic.png)

![Verilog Modül Mimarisi (module ... endmodule) Şeması](/images/verilog/dff_shift_reg_schematic.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Basic Syntax & Structure Verilog Module Verilog Module A module is a block of Verilog code that implements a certain functionality. Modules can be embedded within other modules and a higher level module can communicate with its lower level modules using their input and output ports. They are the fundamental building blocks of digital hardware design, enabling modular, reusable, and hierarchical design methodologies.`,
      },
      {
        title: "4. What You'll Learn",
        content: `Understand Verilog module syntax, port declarations, and instantiation techniques Build hierarchical designs by nesting modules to create complex systems Differentiate between top-level and sub-modules in design and testbench contexts Use hierarchical naming conventions to access signals across module boundaries`,
      },
      {
        title: "5. Syntax",
        content: `A module should be enclosed within module and endmodule keywords. Name of the module should be given right after the module keyword and an optional list of ports may be declared as well. Note that ports declared in the list of port declarations cannot be redeclared within the body of the module. // Basic module syntax with port list module <name> ([port_list]); // Variable declarations (wires, regs, integers, etc.) // Dataflow statements (assign, always, initial blocks) // Function and task definitions // Sub-module instantiations endmodule // A module can have an empty portlist (typically for testbenches) module testbench_top; // Testbench logic without external ports endmodule All variable declarations, dataflow statements, functions or tasks and lower module instances if any, must be defined within the module and endmodule keywords. There can be multiple modules with different names in the same file and can be defined in any order. Aspect Module Characteristics Notes Scope All code must be within module...endmodule No executable code allowed outside modules Multiple Modules One file can contain multiple modules Defined in any order; simulator resolves dependencies Port List Optional (can be empty for testbenches) Declared ports cannot be redeclared in module body Reusability Same module can be instantiated multiple times Each instance has unique identifier Hierarchy Modules can contain sub-module instances Forms tree structure with top-level root`,
      },
      {
        title: "6. Example",
        content: `The module dff represents a D flip flop which has three input ports d , clk , rstn and one output port q . Contents of the module describe how a D flip flop should behave for different combinations of inputs. Here, input d is always assigned to output q at positive edge of clock if rstn is high because it is an active low reset. // Module called "dff" has 3 inputs and 1 output port module dff ( input d, // Data input input clk, // Clock signal input rstn, // Active-low synchronous reset output reg q); // Registered output (must be 'reg' for sequential logic) // Sequential logic block: executes on every positive clock edge always @ (posedge clk) begin if (!rstn) // Reset condition (active-low: rstn=0 triggers reset) q <= 0; // Non-blocking assignment: reset output to 0 else q <= d; // Non-blocking assignment: capture input data end endmodule `,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Modül Mimarisi (module ... endmodule)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-modules.v - Örnek Donanım Modülü",
          snippet: `// Basic module syntax with port list
	module <name> ([port_list]);
		// Variable declarations (wires, regs, integers, etc.)
		// Dataflow statements (assign, always, initial blocks)
		// Function and task definitions
		// Sub-module instantiations
	endmodule

	// A module can have an empty portlist (typically for testbenches)
	module testbench_top;
		// Testbench logic without external ports
	endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-modules_tb.v - Simülasyon Testbench",
          snippet: `// Module called "dff" has 3 inputs and 1 output port
module dff (  input 			d,       // Data input
              input 			clk,     // Clock signal
              input 			rstn,    // Active-low synchronous reset
              output reg	q);      // Registered output (must be 'reg' for sequential logic)

	// Sequential logic block: executes on every positive clock edge
	always @ (posedge clk) begin
		if (!rstn)             // Reset condition (active-low: rstn=0 triggers reset)
			q <= 0;              // Non-blocking assignment: reset output to 0
		else
			q <= d;              // Non-blocking assignment: capture input data
	end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `// Basic module syntax with port list
	module <name> ([port_list]);
		// Variable declarations (wires, regs, integers, etc.)
		// Dataflow statements (assign, always, initial blocks)
		// Function and task definitions
		// Sub-module instantiations
	endmodule

	// A module can have an empty portlist (typically for testbenches)
	module testbench_top;
		// Testbench logic without external ports
	endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Modül Mimarisi (module ... endmodule) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-ports": {
    id: "verilog-ports",
    badge: "Bölüm 3 • Temel Sözdizimi & Modül Yapısı",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Port Bildirimleri (input, output, inout)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 3: Temel Sözdizimi & Modül Yapısı. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Port Bildirimleri (input, output, inout)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Port Bildirimleri (input, output, inout)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Port Bildirimleri (input, output, inout) Şeması](/images/verilog/verilog-ports.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Basic Syntax & Structure Verilog Ports Verilog Ports Ports are a set of signals that act as inputs and outputs to a particular module and are the primary way of communicating with it. Think of a module as a fabricated chip placed on a PCB and it becomes quite obvious that the only way to communicate with the chip is through its pins. Ports are like pins and are used by the design to send and receive signals from the outside world. 7 min read | Beginner`,
      },
      {
        title: "4. What You'll Learn",
        content: `Understand the three port types (input, output, inout) and when to use each Master port declaration syntax from Verilog 1995 and ANSI-C 2001 styles Apply signed and unsigned port attributes correctly to avoid arithmetic bugs Recognize common port declaration pitfalls and illegal redeclaration patterns`,
      },
      {
        title: "5. Types of Ports",
        content: `Verilog provides three fundamental port types for module communication: Port Type Description Use Cases input The design module can only receive values from outside using its input ports Clock signals, data inputs, control signals, reset output The design module can only send values to the outside using its output ports Computed results, status flags, data outputs inout The design module can either send or receive values using its inout ports (bidirectional) Memory data buses, I2C/SPI data lines, tri-state buses Default Port Type: Ports are by default considered as nets of type wire . If you need an output port to be driven by a register (from an always block), you must explicitly declare it as output reg .`,
      },
      {
        title: "6. Syntax",
        content: `Ports can be declared with various attributes specifying their direction, data type, and bit width: input [net_type] [range] list_of_names; // Input port inout [net_type] [range] list_of_names; // Input & Output port (bidirectional) output [net_type] [range] list_of_names; // Output port driven by a wire output [var_type] [range] list_of_names; // Output port driven by a variable (reg)`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Port Bildirimleri (input, output, inout)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-ports.v - Örnek Donanım Modülü",
          snippet: `input  [net_type] [range] list_of_names;    // Input port
inout  [net_type] [range] list_of_names;    // Input & Output port (bidirectional)
output [net_type] [range] list_of_names;    // Output port driven by a wire
output [var_type] [range] list_of_names;    // Output port driven by a variable (reg)`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-ports_tb.v - Simülasyon Testbench",
          snippet: `module my_design (
  input wire        clk,        // Clock input (explicit wire type)
  input             en,         // Enable input (implicit wire type)
  input             rw,         // Read/Write control (implicit wire)
  inout [15:0]      data,       // 16-bit bidirectional data bus
  output            int         // Interrupt output (implicit wire)
);

  // Design behavior as Verilog code

endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `input  [net_type] [range] list_of_names;    // Input port
inout  [net_type] [range] list_of_names;    // Input & Output port (bidirectional)
output [net_type] [range] list_of_names;    // Output port driven by a wire
output [var_type] [range] list_of_names;    // Output port driven by a variable (reg)`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Port Bildirimleri (input, output, inout) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-module-instantiations": {
    id: "verilog-module-instantiations",
    badge: "Bölüm 3 • Temel Sözdizimi & Modül Yapısı",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Modül Örnekleme ve Hiyerarşik Donanım Tasarımı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 3: Temel Sözdizimi & Modül Yapısı. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Modül Örnekleme ve Hiyerarşik Donanım Tasarımı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Modül Örnekleme ve Hiyerarşik Donanım Tasarımı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Modül Örnekleme ve Hiyerarşik Donanım Tasarımı Şeması](/images/verilog/shift_reg_floating_ports_schematic.png)

![Modül Örnekleme ve Hiyerarşik Donanım Tasarımı Şeması](/images/verilog/unconnected_port.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Basic Syntax & Structure Verilog Module Instantiations Verilog Module Instantiations As we saw in a previous article , bigger and complex designs are built by integrating multiple modules in a hierarchical manner. Modules can be instantiated within other modules and ports of these instances can be connected with other signals inside the parent module. These port connections can be done via an ordered list or by name.`,
      },
      {
        title: "4. What You'll Learn",
        content: `What Verilog Module Instantiations is and when to use it Syntax and usage patterns for Verilog Module Instantiations Practical examples with code demonstrations Common mistakes and best practices`,
      },
      {
        title: "5. Syntax",
        content: `The basic syntax for Verilog Module Instantiations: // Basic form Instantiations parameters; // Example usage // See code examples below for detailed usage Parameters: Specific parameters depend on the context. See examples for common usage patterns.`,
      },
      {
        title: "6. Port Connection by ordered list",
        content: `One method of making the connection between the port expressions listed in a module instantiation with the signals inside the parent module is by the ordered list .`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Modül Örnekleme ve Hiyerarşik Donanım Tasarımı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-module-instantiations.v - Örnek Donanım Modülü",
          snippet: `// Basic form
Instantiations parameters;

// Example usage
// See code examples below for detailed usage`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-module-instantiations_tb.v - Simülasyon Testbench",
          snippet: `module mydesign ( input x, y, z, // x is at position 1, y at 2, x at 3 and
	 output o); // o is at position 4
	 
	endmodule

	module tb_top;
		wire [1:0] a;
		wire b, c;
		
		mydesign d0 (a[0], b, a[1], c); // a[0] is at position 1 so it is automatically connected to x
		 // b is at position 2 so it is automatically connected to y
		 // a[1] is at position 3 so it is connected to z
		 // c is at position 4, and hence connection is with o
	endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `// Basic form
Instantiations parameters;

// Example usage
// See code examples below for detailed usage`,
      language: "verilog",
    },
    quiz: {
      question: "Modül Örnekleme ve Hiyerarşik Donanım Tasarımı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-data-types": {
    id: "verilog-data-types",
    badge: "Bölüm 4 • Veri Tipleri & Operatörler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Veri Tipleri: wire, reg ve integer Farkı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 4: Veri Tipleri & Operatörler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Veri Tipleri: wire, reg ve integer Farkı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Veri Tipleri: wire, reg ve integer Farkı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Veri Tipleri: wire, reg ve integer Farkı Şeması](/images/verilog/values.svg)

![Verilog Veri Tipleri: wire, reg ve integer Farkı Şeması](/images/verilog/nets_variables.png)

![Verilog Veri Tipleri: wire, reg ve integer Farkı Şeması](/images/verilog/wire.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Data Types & Operators Verilog Data Types Verilog Data Types 8 min read | Beginner The primary intent of data-types in the Verilog language is to represent data storage elements like bits in a flip-flop and transmission elements like wires that connect between logic gates and sequential structures.`,
      },
      {
        title: "4. What You'll Learn",
        content: `Understand Verilog's 4-value logic system (0, 1, X, Z) and its hardware implications Master the difference between nets (wire) and variables (reg) for proper hardware modeling Use integer, time, real, and string data types for testbench and modeling tasks Recognize when each data type is appropriate for synthesis vs simulation`,
      },
      {
        title: "5. What values do variables hold ?",
        content: `Almost all data-types can only have one of the four different values as given below except for real and event data types. 0 represents a logic zero, or a false condition 1 represents a logic one, or a true condition x represents an unknown logic value (can be zero or one) z represents a high-impedance state The following image shows how these values are represented in timing diagrams and simulation waveforms. Most simulators use this convention where red stands for X and orange in the middle stands for high-impedance or Z .`,
      },
      {
        title: "6. What does the verilog value-set imply ?",
        content: `Since Verilog is essentially used to describe hardware elements like flip-flops and combinational logic like NAND and NOR, it has to model the value system found in hardware. A logic one would represent the voltage supply V dd which can range anywhere between 0.8V to more than 3V based on the fabrication technology node. A logic zero would represent ground and hence a value of 0V. X or x means that the value is simply unknown at the time, and could be either 0 or 1. This is quite different from the way X is treated in boolean logic, where it means "don't care". As with any incomplete electric circuit, the wire that is not connected to anything will have a high-impedance at that node and is represented by Z or z . Even in verilog, any unconnected wire will result in a high impedance.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Veri Tipleri: wire, reg ve integer Farkı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-data-types.v - Örnek Donanım Modülü",
          snippet: `wire [3:0] 	n0; 		// 4-bit wire -> this is a vector`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-data-types_tb.v - Simülasyon Testbench",
          snippet: `module design;
	wire abc;
	wire 	a;
	wire 	b;
	wire 	c;
	
	wire abc; // Error: Identifier "abc" previously declared
	
	assign abc = a & b | c;
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `wire [3:0] 	n0; 		// 4-bit wire -> this is a vector`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Veri Tipleri: wire, reg ve integer Farkı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-scalar-vector": {
    id: "verilog-scalar-vector",
    badge: "Bölüm 4 • Veri Tipleri & Operatörler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Skaler ve Vektör Veri Hatları (Veri Yolları)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 4: Veri Tipleri & Operatörler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Skaler ve Vektör Veri Hatları (Veri Yolları)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Skaler ve Vektör Veri Hatları (Veri Yolları)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Skaler ve Vektör Veri Hatları (Veri Yolları) Şeması](/images/verilog/scalar-vector.png)

![Skaler ve Vektör Veri Hatları (Veri Yolları) Şeması](/images/verilog/bit-select.png)

![Skaler ve Vektör Veri Hatları (Veri Yolları) Şeması](/images/verilog/part-select.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Data Types & Operators Verilog Scalar and Vector Verilog Scalar and Vector Verilog needs to represent individual bits as well as groups of bits. For example, a single bit sequential element is a flip-flop. However a 16-bit sequential element is a register that can hold 16 bits. For this purpose, Verilog has scalar and vector nets and variables.`,
      },
      {
        title: "4. What You'll Learn",
        content: `What Verilog scalar and vector is and when to use it Syntax and usage patterns for Verilog scalar and vector Practical examples with code demonstrations Common mistakes and best practices`,
      },
      {
        title: "5. Scalar and Vector",
        content: `A net or reg declaration without a range specification is considered 1-bit wide and is a scalar . If a range is specified, then the net or reg becomes a multibit entity known as a vector . wire o_nor; // single bit scalar net wire [7:0] o_flop; // 8-bit vector net reg parity; // single bit scalar variable reg [31:0] addr; // 32 bit vector variable to store address The code examples shown above are synthesizable and can be implemented in hardware. Always simulate your design before synthesis to verify correct functionality. The range gives the ability to address individual bits in a vector. The most significant bit of the vector should be specified as the left hand value in the range while the least significant bit of the vector should be specified on the right. wire [msb:lsb] name; integer my_msb; wire [15:0] priority; // msb = 15, lsb = 0 wire [my_msb: 2] prior; // illegal A 16 bit wide net called priority will be created in the example above. Note that the msb and lsb should be a constant expression and cannot be substituted by a variable. But they can be any integer value - positive, negative or zero; and the lsb value can be greater than, equal to or less than msb value.`,
      },
      {
        title: "6. Bit-selects",
        content: `Any bit in a vectored variable can be individually selected and assigned a new value as shown below. This is called as a bit-select . If the bit-select is out of bounds or the bit-select is x or z , then the value returned will be x . reg [7:0] addr; // 8-bit reg variable [7, 6, 5, 4, 3, 2, 1, 0] addr [0] = 1; // assign 1 to bit 0 of addr addr [3] = 0; // assign 0 to bit 3 of addr addr [8] = 1; // illegal : bit8 does not exist in addr`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Skaler ve Vektör Veri Hatları (Veri Yolları)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-scalar-vector.v - Örnek Donanım Modülü",
          snippet: `wire 	 o_nor; // single bit scalar net
	wire [7:0] o_flop; // 8-bit vector net
	reg parity; // single bit scalar variable
	reg [31:0] addr; // 32 bit vector variable to store address`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-scalar-vector_tb.v - Simülasyon Testbench",
          snippet: `wire [msb:lsb] name;
	integer my_msb;
	
	wire [15:0] priority; // msb = 15, lsb = 0
	wire [my_msb: 2] prior; // illegal`,
        },
      },
    ],
    playground: {
      initialCode: `wire 	 o_nor; // single bit scalar net
	wire [7:0] o_flop; // 8-bit vector net
	reg parity; // single bit scalar variable
	reg [31:0] addr; // 32 bit vector variable to store address`,
      language: "verilog",
    },
    quiz: {
      question: "Skaler ve Vektör Veri Hatları (Veri Yolları) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-net-types": {
    id: "verilog-net-types",
    badge: "Bölüm 4 • Veri Tipleri & Operatörler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Net Tipleri: wire, wand, wor ve tri Yapıları",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 4: Veri Tipleri & Operatörler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Net Tipleri: wire, wand, wor ve tri Yapıları** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Net Tipleri: wire, wand, wor ve tri Yapıları** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Net Tipleri: wire, wand, wor ve tri Yapıları Şeması](/images/verilog/wire_tri_truth_table.png)

![Verilog Net Tipleri: wire, wand, wor ve tri Yapıları Şeması](/images/verilog/wor_trior_truth_table.png)

![Verilog Net Tipleri: wire, wand, wor ve tri Yapıları Şeması](/images/verilog/wand_triand_truth_table.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Data Types & Operators Verilog Net Types Verilog Net Types `,
      },
      {
        title: "4. What You'll Learn",
        content: `What Verilog Net Types is and when to use it Syntax and usage patterns for Verilog Net Types Practical examples with code demonstrations Common mistakes and best practices`,
      },
      {
        title: "5. Net Types",
        content: `In Verilog, net types are used to model physical connections between components in digital circuits. They do not store values, its value is determined by the values of its drivers and the default value of a net is typically 'z' (high impedance) when left unconnected. Net Type Description wire Connects elements with continuous assignment tri Connects elements with multiple drivers wor Creates wired OR configurations wand Creates wired AND configurations trior Creates wired OR configurations with multiple drivers triand Creates wired AND configurations with multiple drivers tri0 Models nets with resistive pulldown devices tri1 Models nets with resistive pullup devices trireg Stores a value and is used to model charge storage nodes uwire Models nets that can should be driven only by a single driver supply0 Models power supply with a low level of strength supply1 Models power supply with a high level of strength`,
      },
      {
        title: "6. Wire and tri nets",
        content: `Wire and tri are two types of nets in Verilog that serve as connections between elements in a digital circuit model. While they are functionally identical and share the same syntax, they are given different names to help designers convey the intended purpose of the net within the model. Wire nets: Typically used for connections driven by a single source Ideal for representing nets controlled by one gate or one continuous assignment The name "wire" suggests a simple, unidirectional connection Tri (short for tristate) nets: Commonly used for nets that may have multiple drivers Suitable for modeling buses or other shared connections where different components might drive the net at different times The name tri implies the possibility of multiple drivers and the potential use of high-impedance states When multiple drivers of the same strength drive conflicting values on a wire or tri net in Verilog, the result is indeed an unknown (x) value.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Net Tipleri: wire, wand, wor ve tri Yapıları** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-net-types.v - Örnek Donanım Modülü",
          snippet: `module tb;
  wor  		wor_net;
  wand 		wand_net;
  trior 	trior_net;
  triand 	triand_net;
  
  wire      normal_net;
  
  reg 		driver_1;
  reg 		driver_2;
  reg [3:0] values;
  
  assign wor_net = driver_1;
  assign wor_net = driver_2;
  
  assign trior_net = driver_1;
  assign trior_net = driver_2;
  
  assign wand_net = driver_1;
  assign wand_net = driver_2;
  
  assign triand_net = driver_1;
  assign triand_net = driver_2;
  
  assign normal_net = driver_1;
  assign normal_net = driver_2;
    
  initial
      $monitor("[%0t] driver_1=%0b driver_2=%0b normal=%0b wor=%0b wand=%0b trior=%0b triand=%0b", $time, driver_1, driver_2, normal_net, wor_net, wand_net, trior_net, triand_net);
    
  initial begin
    values = {1'bZ, 1'bX, 1'b1, 1'b0};   
      
    for (integer i = 0; i < 4; i+=1) begin
      for (integer j = 0; j < 4; j+=1) begin      
      
        driver_1 = values[i];
        driver_2 = values[j];     
        #10;
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
          caption: "verilog-net-types_tb.v - Simülasyon Testbench",
          snippet: `module tb;
    tri0 		tri0_net;
    tri1 		tri1_net;

    wire normal_net;

    reg 		driver_1;
    reg 		driver_2;
    reg [3:0] values;

    assign tri0_net = driver_1;
    assign tri0_net = driver_2;

    assign tri1_net = driver_1;
    assign tri1_net = driver_2;

    assign normal_net = driver_1;
    assign normal_net = driver_2;

    initial
        $monitor("[%0t] driver_1=%0b driver_2=%0b normal=%0b tri0=%0b tri1=%0b", $time, driver_1, driver_2, normal_net, tri0_net, tri1_net);

        initial begin
        values = {1'bZ, 1'bX, 1'b1, 1'b0};

        for (integer i = 0; i < 4; i+=1) begin
            for (integer j = 0; j < 4; j+=1) begin

                driver_1 = values[i];
                driver_2 = values[j];
                #10;
            end
        end
    end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module tb;
  wor  		wor_net;
  wand 		wand_net;
  trior 	trior_net;
  triand 	triand_net;
  
  wire      normal_net;
  
  reg 		driver_1;
  reg 		driver_2;
  reg [3:0] values;
  
  assign wor_net = driver_1;
  assign wor_net = driver_2;
  
  assign trior_net = driver_1;
  assign trior_net = driver_2;
  
  assign wand_net = driver_1;
  assign wand_net = driver_2;
  
  assign triand_net = driver_1;
  assign triand_net = driver_2;
  
  assign normal_net = driver_1;
  assign normal_net = driver_2;
    
  initial
      $monitor("[%0t] driver_1=%0b driver_2=%0b normal=%0b wor=%0b wand=%0b trior=%0b triand=%0b", $time, driver_1, driver_2, normal_net, wor_net, wand_net, trior_net, triand_net);
    
  initial begin
    values = {1'bZ, 1'bX, 1'b1, 1'b0};   
      
    for (integer i = 0; i < 4; i+=1) begin
      for (integer j = 0; j < 4; j+=1) begin      
      
        driver_1 = values[i];
        driver_2 = values[j];     
        #10;
      end
    end
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Net Tipleri: wire, wand, wor ve tri Yapıları ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-operators": {
    id: "verilog-operators",
    badge: "Bölüm 4 • Veri Tipleri & Operatörler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Operatörleri: Mantıksal, Bitsel ve Karşılaştırma",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 4: Veri Tipleri & Operatörler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Operatörleri: Mantıksal, Bitsel ve Karşılaştırma** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Operatörleri: Mantıksal, Bitsel ve Karşılaştırma** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Data Types & Operators Verilog Operators Verilog Operators Verilog operators enable mathematical computations, logical comparisons, and bit manipulations essential for describing digital circuit behavior. Understanding how synthesis tools translate these operators into hardware gates, comparators, adders, and shifters is fundamental to writing efficient RTL code. Data that cannot be processed is quite useless, there'll always be some form of calculation required in digital circuits and computer systems. Let's look at some of the operators in Verilog that would enable synthesis tools realize appropriate hardware elements. 15 min read | Beginner to Intermediate`,
      },
      {
        title: "3. What You'll Learn",
        content: `Apply arithmetic operators (+, -, *, /, %, **) and understand their hardware synthesis implications Distinguish between logical operators (&&, ||, !) and bitwise operators (&, |, ^, ~) Use equality operators (==, !=, ===, !==) correctly for X/Z handling in verification Implement shift operations (<<, >>, <<<, >>>) for efficient multiplication/division by powers of 2`,
      },
      {
        title: "4. Verilog Arithmetic Operators",
        content: `Arithmetic operators perform mathematical computations and synthesize into adders, subtractors, multipliers, and dividers. If the second operand of a division or modulus operator is zero, then the result will be X. If either operand of the power operator is real, then the result will also be real. The result will be 1 if the second operand of a power operator is 0 (a 0 ). Operator Description Synthesis Hardware a + b a plus b Adder (ripple-carry or carry-lookahead) a - b a minus b Subtractor (two's complement adder) a * b a multiplied by b Multiplier (combinational or pipelined) a / b a divided by b Divider (expensive, avoid in RTL if possible) a % b a modulo b (remainder) Divider with remainder output a ** b a to the power of b Not synthesizable (simulation only) Division and Modulus: Division ( / ) and modulus ( % ) operators create large, slow combinational logic. Avoid in synthesizable RTL unless b is a power of 2 (use shifts instead). The power operator ( ** ) is for simulation only and does not synthesize. An example of how arithmetic operators are used is given below. module des; reg [7:0] data1; reg [7:0] data2; initial begin data1 = 45; // 8-bit value data2 = 9; // 8-bit value $display ("Add + = %d", data1 + data2); // 45 + 9 = 54 $display ("Sub - = %d", data1 - data2); // 45 - 9 = 36 $display ("Mul * = %d", data1 * data2); // 45 * 9 = 405, truncated to 8 bits = 149 $display ("Div / = %d", data1 / data2); // 45 / 9 = 5 (integer division) $display ("Mod %% = %d", data1 % data2); // 45 % 9 = 0 (no remainder) $display ("Pow ** = %d", data2 ** 2); // 9^2 = 81 (simulation only) end endmodule Output ncsim> run Add + = 54 Sub - = 36 Mul * = 149 Div / = 5 Mod % = 0 Pow ** = 81 ncsim: *W,RNQUIE: Simulation is complete. Result Width: Multiplication of 8-bit x 8-bit produces up to 16-bit result (45 x 9 = 405 = 0x195). When stored in 8-bit register, upper bits are truncated, giving 0x95 = 149.`,
      },
      {
        title: "5. Real-World Application",
        content: `DSP Arithmetic Units: Companies like Texas Instruments and Analog Devices design DSP processors with dedicated MAC (Multiply-Accumulate) units that execute result = result + (a * b) in a single cycle. Modern FPGAs from Xilinx and Intel have hard DSP blocks containing 18x25 or 27x27 multipliers with 48-bit accumulators, optimized for the arithmetic operators used in FIR filters, FFTs, and matrix operations.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Operatörleri: Mantıksal, Bitsel ve Karşılaştırma** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-operators.v - Örnek Donanım Modülü",
          snippet: `module des;
 reg [7:0] data1;
 reg [7:0] data2;

 initial begin
 data1 = 45; // 8-bit value
 data2 = 9; // 8-bit value

 $display ("Add + = %d", data1 + data2); // 45 + 9 = 54
 $display ("Sub - = %d", data1 - data2); // 45 - 9 = 36
 $display ("Mul * = %d", data1 * data2); // 45 * 9 = 405, truncated to 8 bits = 149
 $display ("Div / = %d", data1 / data2); // 45 / 9 = 5 (integer division)
 $display ("Mod %% = %d", data1 % data2); // 45 % 9 = 0 (no remainder)
 $display ("Pow ** = %d", data2 ** 2); // 9^2 = 81 (simulation only)
 end
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-operators_tb.v - Simülasyon Testbench",
          snippet: `module des;
 reg [7:0] data1;
 reg [7:0] data2;

 initial begin
 data1 = 45;
 data2 = 9;
 $display ("Result for data1 >= data2 : %0d", data1 >= data2); // 45 >= 9 -> 1 (true)

 data1 = 45;
 data2 = 45;
 $display ("Result for data1 <= data2 : %0d", data1 <= data2); // 45 <= 45 -> 1 (true)

 data1 = 9;
 data2 = 8;
 $display ("Result for data1 > data2 : %0d", data1 > data2); // 9 > 8 -> 1 (true)

 data1 = 22;
 data2 = 22;
 $display ("Result for data1 < data2 : %0d", data1 < data2); // 22 < 22 -> 0 (false)
 end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module des;
 reg [7:0] data1;
 reg [7:0] data2;

 initial begin
 data1 = 45; // 8-bit value
 data2 = 9; // 8-bit value

 $display ("Add + = %d", data1 + data2); // 45 + 9 = 54
 $display ("Sub - = %d", data1 - data2); // 45 - 9 = 36
 $display ("Mul * = %d", data1 * data2); // 45 * 9 = 405, truncated to 8 bits = 149
 $display ("Div / = %d", data1 / data2); // 45 / 9 = 5 (integer division)
 $display ("Mod %% = %d", data1 % data2); // 45 % 9 = 0 (no remainder)
 $display ("Pow ** = %d", data2 ** 2); // 9^2 = 81 (simulation only)
 end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Operatörleri: Mantıksal, Bitsel ve Karşılaştırma ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-arithmetic-operators": {
    id: "verilog-arithmetic-operators",
    badge: "Bölüm 4 • Veri Tipleri & Operatörler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Aritmetik Operatörleri ve İşaretli Sayılar",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 4: Veri Tipleri & Operatörler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Aritmetik Operatörleri ve İşaretli Sayılar** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Aritmetik Operatörleri ve İşaretli Sayılar** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Data Types & Operators Verilog Arithmetic Operators Verilog Arithmetic Operators Understanding how Verilog's arithmetic operators translate into actual hardware is crucial for writing efficient and synthesizable code. Verilog provides a set of arithmetic operators similar to those found in C programming, categorized as binary (operating on two operands) and unary (operating on a single operand).`,
      },
      {
        title: "3. What You'll Learn",
        content: `What Verilog Arithmetic Operators is and when to use it Syntax and usage patterns for Verilog Arithmetic Operators Practical examples with code demonstrations Common mistakes and best practices`,
      },
      {
        title: "4. Binary Arithmetic Operators",
        content: `The core principle for synthesizability is that the operation must map directly to physical hardware components that operate on discrete binary values (0s and 1s). In Verilog, this generally means operations on reg and integer data types are synthesizable. When you use these operators with reg or integer types, synthesis tools infer standard digital circuits. Operator Description Synthesis + Performs addition Adder circuits (e.g., ripple-carry adders, carry-lookahead adders) - Performs subtraction Subtractor circuits, often implemented using adders and two's complement for the subtrahend * Performs multiplication Depending on the size of the operands, this can be a simple array multiplier or a more complex Wallace tree multiplier / Performs division Divider circuits and may use iterative algorithms. Integer division truncates any fractional part towards zero. % Modulus - returns the remainder of a division Synthesizes alongside a divider or as part of a specialized remainder circuit. The sign of the result matches the sign of the first operand ** Raises the first operand to the power of the second Generally not synthesizable. If the second operand (divisor) is zero, the result is x. Hardware implementation must handle this (e.g., a division-by-zero flag). Important Note on X and Z Values: For any arithmetic operator, if any bit of an operand holds an unknown (x) or high-impedance (z) value, the entire result will be x. While this is a Verilog simulation behavior, in hardware, 'x' and 'z' values often represent undefined states, and their propagation can lead to unexpected synthesis results or warnings. Good design practice involves avoiding 'x' and 'z' states in critical logic. module arithmetic(input [7:0] data1, data2, output reg [7:0] sum ,diff, product, div, modulus); always @ (data1, data2) begin sum = data1 + data2; diff = data1 - data2; product = data1 * data2; div = data1 / data2; modulus = data1 % data2; end endmodule`,
      },
      {
        title: "5. Unary Arithmetic Operators",
        content: `Operator Description Synthesis +m Essentially m, it has no effect on the operand's value This is trivial and synthesizes directly as the operand itself -m Performs negation on the operand For signed integer or signed reg types, this implies a two's complement negation The primary distinction for non-synthesizable arithmetic operators lies in the data types they operate on. Verilog includes real and realtime data types, which represent floating-point numbers. Standard hardware synthesis tools generally cannot infer complex floating-point units from basic arithmetic operators when applied to real or realtime operands. Such operations are primarily for simulation and verification purposes, where the simulator can perform the floating-point calculations. So, all binary and unary arithmetic operators (+, -, *, /, +m, -m) become non-synthesizable if any operand is a real or realtime type.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Aritmetik Operatörleri ve İşaretli Sayılar** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-arithmetic-operators.v - Örnek Donanım Modülü",
          snippet: `module arithmetic(input [7:0] data1, data2, output reg [7:0] sum ,diff, product, div, modulus);
 
 always @ (data1, data2) begin 
 sum = data1 + data2;
 diff = data1 - data2;
 product = data1 * data2;
 div = data1 / data2;
 modulus = data1 % data2;
 end
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-arithmetic-operators_tb.v - Simülasyon Testbench",
          snippet: `reg [15:0] a, b, answer; // Declare 16-bit registers

initial begin
 a = 16'hFFFF; // Assign 'a' the maximum 16-bit unsigned value
 b = 16'h0001; // Assign 'b' the value 1

 // The intent is to add 'a' and 'b', which can result in an overflow,
 // and then shift the result right by 1 bit to get the carry
 answer = (a + b) >> 1;
 $display("Result with truncation: answer = %h", answer);
end`,
        },
      },
    ],
    playground: {
      initialCode: `module arithmetic(input [7:0] data1, data2, output reg [7:0] sum ,diff, product, div, modulus);
 
 always @ (data1, data2) begin 
 sum = data1 + data2;
 diff = data1 - data2;
 product = data1 * data2;
 div = data1 / data2;
 modulus = data1 % data2;
 end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Aritmetik Operatörleri ve İşaretli Sayılar ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-concatenation": {
    id: "verilog-concatenation",
    badge: "Bölüm 4 • Veri Tipleri & Operatörler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Birleştirme (Concatenation) ve Çoğaltma ({})",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 4: Veri Tipleri & Operatörler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Birleştirme (Concatenation) ve Çoğaltma ({})** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Birleştirme (Concatenation) ve Çoğaltma ({})** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Data Types & Operators Verilog Concatenation Verilog Concatenation Multi-bit Verilog wires and variables can be clubbed together to form a bigger multi-net wire or variable using concatenation operators { and } separated by commas. Concatenation is also allowed to have expressions and sized constants as operands in addition to wires and variables. Size of each operand must be known in order to calculate the complete size of concatenation.`,
      },
      {
        title: "3. What You'll Learn",
        content: `What Verilog Concatenation is and when to use it Syntax and usage patterns for Verilog Concatenation Practical examples with code demonstrations Common mistakes and best practices`,
      },
      {
        title: "4. Verilog Concatenation Example",
        content: `wire a, b; // 1-bit wire wire [1:0] res; // 2-bit wire to store a and b // res[1] follows a, and res[0] follows b assign res = {a, b}; wire [2:0] c; wire [7:0] res1; // res[0] follows c[2] // res[2:1] is always 0 // res[4:3] follows c[1:0] // res[5] follows a // res[6] follows b assign res1 = {b, a, c[1:0], 2'b00, c[2]}; Here is a working design example of concatenation of inputs to form different outputs. Concatenated expressions can be simply displayed or assigned to any wire or variable, not necessarily outputs. module des (input [1:0] a, input [2:0] b, output [4:0] out1, output [3:0] out2 ); assign out1 = {a, b}; assign out2 = {a[1], 2'b01, b[2]}; endmodule module tb; reg [1:0] a; reg [2:0] b; wire [4:0] out1; wire [3:0] out2; des u0 (a, b, out1, out2); initial begin a <= 0; b <= 0; $monitor("[%0t] a=%b b=%b, out1=%b out2=%b", $time, a, b, out1, out2); #10 a <= 3; #5 b <= 5; #10 a <= 2; #5 b <= 1; #10 $finish; end endmodule Note that out2[2:1] is always a constant 2'b01. Output xcelium> run [0] a=00 b=000, out1=00000 out2=0010 [10] a=11 b=000, out1=11000 out2=1010 [15] a=11 b=101, out1=11101 out2=1011 [25] a=10 b=101, out1=10101 out2=1011 [30] a=10 b=001, out1=10001 out2=1010 Simulation complete via $finish(1) at time 40 NS + 0 `,
      },
      {
        title: "5. Replication Operator",
        content: `When the same expression has to be repeated for a number of times, a replication constant is used which needs to be a non-negative number and cannot be X, Z or any variable. This constant number is also enclosed within braces along with the original concatenation operator and indicates the total number of times the expression will be repeated. wire a; wire [6:0] res; assign res = {7{a}}; {2'bz{2'b0}} // Illegal to have Z as replication constant {2'bx{2'b0}} // Illegal to have X as replication constant Replication expressions cannot appear on the left hand side of any assignment and cannot be connected to output or inout ports. module des; reg [1:0] a; reg [2:0] b; initial begin a <= 2; b <= 4; #10; $display("a=%b b=%b res=%b", a, b, {{2{a}}, {3{b}}}); end endmodule Note that a got repeated twice and b got repeated thrice. Output xcelium> run a=10 b=100 res= 1010 100100100 xmsim: *W,RNQUIE: Simulation is complete. Operands will be evaluated only once when the replication expression is executed even if the constant is zero. The Verilog replication operator {} is commonly used in digital design to create bit patterns for initializing registers, memory arrays, or lookup tables. Here is an example: Suppose we want to initialize a 16-bit register counter to count from 0 to 15 in a clock cycle. We can use the replication operator to create a bit pattern that represents the binary values 0 to 15, and assign it to the counter register: module counter(input clk, output reg [15:0] counter); always @(posedge clk) begin counter <= counter + 1; end // Initialize counter to 0 on reset initial begin counter <= {16{1'b0}}; end endmodule`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Birleştirme (Concatenation) ve Çoğaltma ({})** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-concatenation.v - Örnek Donanım Modülü",
          snippet: `wire 		a, b; 		// 1-bit wire
	wire [1:0] res; 		// 2-bit wire to store a and b
	
	// res[1] follows a, and res[0] follows b
	assign res = {a, b}; 	
	
	
	wire [2:0] c;
	wire [7:0] 	res1;
	
	// res[0] follows c[2]
	// res[2:1] is always 0
	// res[4:3] follows c[1:0]
	// res[5] follows a
	// res[6] follows b
	assign res1 = {b, a, c[1:0], 2'b00, c[2]};`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-concatenation_tb.v - Simülasyon Testbench",
          snippet: `module des (input [1:0] 	a,
 input [2:0] 	b,
 output [4:0]	out1,
 output [3:0] 	out2 
 );
 
 assign out1 = {a, b};
 assign out2 = {a[1], 2'b01, b[2]};
 
endmodule 

module tb;
 reg [1:0] a;
 reg [2:0] b;
 wire [4:0] out1;
 wire [3:0] out2;
 
 des u0 (a, b, out1, out2);
 
 initial begin
 a <= 0;
 b <= 0;
 
 $monitor("[%0t] a=%b b=%b, out1=%b out2=%b", $time, a, b, out1, out2);
 
 #10 a <= 3;
 #5 b <= 5;
 #10 a <= 2;
 #5 b <= 1;
 
 #10 $finish;
 end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `wire 		a, b; 		// 1-bit wire
	wire [1:0] res; 		// 2-bit wire to store a and b
	
	// res[1] follows a, and res[0] follows b
	assign res = {a, b}; 	
	
	
	wire [2:0] c;
	wire [7:0] 	res1;
	
	// res[0] follows c[2]
	// res[2:1] is always 0
	// res[4:3] follows c[1:0]
	// res[5] follows a
	// res[6] follows b
	assign res1 = {b, a, c[1:0], 2'b00, c[2]};`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Birleştirme (Concatenation) ve Çoğaltma ({}) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-arrays-memories": {
    id: "verilog-arrays-memories",
    badge: "Bölüm 5 • Diziler, Bellekler & Parametreler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Dizileri ve Bellek Modelleme (RAM & ROM)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 5: Diziler, Bellekler & Parametreler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Dizileri ve Bellek Modelleme (RAM & ROM)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Dizileri ve Bellek Modelleme (RAM & ROM)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Dizileri ve Bellek Modelleme (RAM & ROM) Şeması](/images/verilog/memory.png)

![Verilog Dizileri ve Bellek Modelleme (RAM & ROM) Şeması](/images/verilog/verilog_arrays_register_schematic.png)

![Verilog Dizileri ve Bellek Modelleme (RAM & ROM) Şeması](/images/verilog/verilog_array_schematic.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Arrays Memories & Parameters Verilog Arrays and Memories Verilog Arrays and Memories `,
      },
      {
        title: "4. What You'll Learn",
        content: `What Verilog Arrays and Memories is and when to use it Syntax and usage patterns for Verilog Arrays and Memories Practical examples with code demonstrations Common mistakes and best practices`,
      },
      {
        title: "5. What is a Verilog array ?",
        content: `An array declaration of a net or variable can be either scalar or vector. Any number of dimensions can be created by specifying an address range after the identifier name and is called a multi-dimensional array. Arrays are allowed in Verilog for reg , wire , integer and real data types. reg y1 [11:0]; // y is a scalar reg array of depth=12, each 1-bit wide wire [0:7] y2 [3:0] // y is an 8-bit vector net with a depth of 4 reg [7:0] y3 [0:1][0:3]; // y is a 2D array rows=2,cols=4 each 8-bit wide An index for every dimension has to be specified to access a particular element of an array and can be an expression of other variables. An array can be formed for any of the different data-types supported in Verilog. Note that a memory of n 1-bit reg is not the same as an n-bit vector reg.`,
      },
      {
        title: "6. Array Assignment",
        content: `y1 = 0; // Illegal - All elements can't be assigned in a single go y2[0] = 8'ha2; // Assign 0xa2 to index=0 y2[2] = 8'h1c; // Assign 0x1c to index=2 y3[1][2] = 8'hdd; // Assign 0xdd to rows=1 cols=2 y3[0][0] = 8'haa; // Assign 0xaa to rows=0 cols=0`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Dizileri ve Bellek Modelleme (RAM & ROM)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-arrays-memories.v - Örnek Donanım Modülü",
          snippet: `reg y1 [11:0]; // y is a scalar reg array of depth=12, each 1-bit wide
	wire [0:7] y2 [3:0] // y is an 8-bit vector net with a depth of 4
	reg [7:0] y3 [0:1][0:3]; // y is a 2D array rows=2,cols=4 each 8-bit wide`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-arrays-memories_tb.v - Simülasyon Testbench",
          snippet: `y1 = 0; 						// Illegal - All elements can't be assigned in a single go
	
	y2[0] = 8'ha2; 			// Assign 0xa2 to index=0 
	y2[2] = 8'h1c; 			// Assign 0x1c to index=2
	y3[1][2] = 8'hdd; 	// Assign 0xdd to rows=1 cols=2
	y3[0][0] = 8'haa; 	// Assign 0xaa to rows=0 cols=0`,
        },
      },
    ],
    playground: {
      initialCode: `reg y1 [11:0]; // y is a scalar reg array of depth=12, each 1-bit wide
	wire [0:7] y2 [3:0] // y is an 8-bit vector net with a depth of 4
	reg [7:0] y3 [0:1][0:3]; // y is a 2D array rows=2,cols=4 each 8-bit wide`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Dizileri ve Bellek Modelleme (RAM & ROM) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-parameters": {
    id: "verilog-parameters",
    badge: "Bölüm 5 • Diziler, Bellekler & Parametreler",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Parametrik Modül Tasarımı (parameter ve defparam)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 5: Diziler, Bellekler & Parametreler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Parametrik Modül Tasarımı (parameter ve defparam)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Parametrik Modül Tasarımı (parameter ve defparam)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Parametrik Modül Tasarımı (parameter ve defparam) Şeması](/images/verilog/2bit_up_counter_schematic.png)

![Parametrik Modül Tasarımı (parameter ve defparam) Şeması](/images/verilog/4bit_down_counter_schematic.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Arrays Memories & Parameters Verilog Parameters Verilog Parameters `,
      },
      {
        title: "4. What You'll Learn",
        content: `What Verilog Parameters is and when to use it Syntax and usage patterns for Verilog Parameters Practical examples with code demonstrations Common mistakes and best practices`,
      },
      {
        title: "5. What are Verilog Parameters ?",
        content: `Parameters are Verilog constructs that allow a module to be reused with a different specification. For example, a 4-bit adder can be parameterized to accept a value for the number of bits and new parameter values can be passed in during module instantiation. So, an N-bit adder can become a 4-bit, 8-bit or 16-bit adder. They are like arguments to a function that are passed in during a function call. parameter MSB = 7; // MSB is a parameter with a constant value 7 parameter REAL = 4.5; // REAL holds a real number parameter FIFO_DEPTH = 256, MAX_WIDTH = 32; // Declares two parameters parameter [7:0] f_const = 2'd3; // 2 bit value is converted to 8 bits; 8'd3 Parameters are basically constants and hence it's illegal to modify their value at runtime. It is illegal to redeclare a name that is already used by a net, variable or another parameter. There are two major types of parameters, module and specify and both accepts a range specification. But, they are normally made as wide as the value to be stored requires them to be and hence a range specification is not necessary.`,
      },
      {
        title: "6. Module Parameters",
        content: `Module parameters can be used to override parameter definitions within a module and this makes the module have a different set of parameters at compile time. A parameter can be modified with the defparam statement or in the module instance statement. It is a common practice to use uppercase letters in names for the parameter to make them instantly noticeable. The module shown below uses parameters to specify the bus width, data width and the depth of FIFO within the design, and can be overriden with new values when the module is instantiated or by using defparam statements. // Verilog 1995 style port declaration module design_ip ( addr, wdata, write, sel, rdata); parameter BUS_WIDTH = 32, DATA_WIDTH = 64, FIFO_DEPTH = 512; input addr; input wdata; input write; input sel; output rdata; wire [BUS_WIDTH-1:0] addr; wire [DATA_WIDTH-1:0] wdata; reg [DATA_WIDTH-1:0] rdata; reg [7:0] fifo [FIFO_DEPTH]; // Design code goes here ... endmodule In the new ANSI style of Verilog port declaration, you may declare parameters as show below. module design_ip #(parameter BUS_WIDTH=32, parameter DATA_WIDTH=64) ( input [BUS_WIDTH-1:0] addr, // Other port declarations );`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Parametrik Modül Tasarımı (parameter ve defparam)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-parameters.v - Örnek Donanım Modülü",
          snippet: `parameter MSB = 7; // MSB is a parameter with a constant value 7
	parameter REAL = 4.5; // REAL holds a real number
	
	parameter FIFO_DEPTH = 256, 
	 MAX_WIDTH = 32; // Declares two parameters
	 
	parameter [7:0] f_const = 2'd3; // 2 bit value is converted to 8 bits; 8'd3`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-parameters_tb.v - Simülasyon Testbench",
          snippet: `// Verilog 1995 style port declaration
	module design_ip ( addr, 
	 wdata,
	 write,
	 sel,
	 rdata);
	 
	 parameter BUS_WIDTH = 32, 
	 DATA_WIDTH = 64,
	 FIFO_DEPTH = 512;
	 
	 input addr;
	 input wdata;
	 input write;
	 input sel;
	 output rdata;
	 
	 wire [BUS_WIDTH-1:0] addr;
	 wire [DATA_WIDTH-1:0] wdata;
	 reg [DATA_WIDTH-1:0] rdata;
	 
	 reg [7:0] fifo [FIFO_DEPTH];
	 
	 // Design code goes here ...
	endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `parameter MSB = 7; // MSB is a parameter with a constant value 7
	parameter REAL = 4.5; // REAL holds a real number
	
	parameter FIFO_DEPTH = 256, 
	 MAX_WIDTH = 32; // Declares two parameters
	 
	parameter [7:0] f_const = 2'd3; // 2 bit value is converted to 8 bits; 8'd3`,
      language: "verilog",
    },
    quiz: {
      question: "Parametrik Modül Tasarımı (parameter ve defparam) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-initial-block": {
    id: "verilog-initial-block",
    badge: "Bölüm 6 • Yordamsal initial & always Blokları",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog initial Block",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 6: Yordamsal initial & always Blokları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog initial Block** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog initial Block** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog initial Block Şeması](/images/verilog/initial-flash-1.PNG)

![Verilog initial Block Şeması](/images/verilog/initial-flash-3.png)

![Verilog initial Block Şeması](/images/verilog/initial-flash-2.PNG)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Procedural Blocks Verilog initial Block Verilog initial Block The Verilog initial block executes once at the start of simulation (time 0) and is essential for testbench initialization, setting up test scenarios, and driving stimulus. Unlike always blocks which run continuously, initial blocks are strictly for simulation and do not synthesize into hardware. 8 min read | Beginner`,
      },
      {
        title: "4. What You'll Learn",
        content: `Understand when and why to use initial blocks for testbench initialization Apply delays within initial blocks to create sequential stimulus Use multiple initial blocks running in parallel for complex test scenarios Recognize that initial blocks are simulation-only and non-synthesizable A set of Verilog statements are usually executed sequentially in a simulation. These statements are placed inside a procedural block. There are mainly two types of procedural blocks in Verilog - initial and always .`,
      },
      {
        title: "5. Syntax",
        content: `// Single statement (no begin/end needed) initial [single statement] // Multiple statements (requires begin/end) initial begin [statement 1] [statement 2] ... [statement N] end`,
      },
      {
        title: "6. What is the initial block used for?",
        content: `An initial block is not synthesizable and hence cannot be converted into a hardware schematic with digital elements. Hence initial blocks do not serve much purpose than to be used in simulations. These blocks are primarily used to initialize variables and drive design ports with specific values. Non-Synthesizable: initial blocks are for simulation only. Synthesis tools ignore them completely. Use initial in testbenches for initialization and stimulus, not in RTL design modules.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog initial Block** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-initial-block.v - Örnek Donanım Modülü",
          snippet: `// Single statement (no begin/end needed)
initial
    [single statement]

// Multiple statements (requires begin/end)
initial begin
    [statement 1]
    [statement 2]
    ...
    [statement N]
end`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-initial-block_tb.v - Simülasyon Testbench",
          snippet: `module tb;
    reg [1:0] a, b;

    initial begin
        a = 2'b10;              // Time 0: a assigned immediately
        #10 b = 2'b00;          // Time 10: b assigned after 10-unit delay
        #20 a = 2'b01;          // Time 30: a reassigned after additional 20 units
        #5 $display("Time=%0t a=%b b=%b", $time, a, b); // Time 35: display values
    end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `// Single statement (no begin/end needed)
initial
    [single statement]

// Multiple statements (requires begin/end)
initial begin
    [statement 1]
    [statement 2]
    ...
    [statement N]
end`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog initial Block ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-always-block": {
    id: "verilog-always-block",
    badge: "Bölüm 6 • Yordamsal initial & always Blokları",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog always Block",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 6: Yordamsal initial & always Blokları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog always Block** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog always Block** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog always Block Şeması](/images/verilog/assign-combo.PNG)

![Verilog always Block Şeması](/images/verilog/assign-combo-wave.PNG)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Procedural Blocks Verilog always Block Verilog always Block An always block is one of the procedural blocks in Verilog. Statements inside an always block are executed sequentially.`,
      },
      {
        title: "4. What You'll Learn",
        content: `Master sensitivity lists and event-driven execution for combinational and sequential logic Understand the critical difference between level-sensitive and edge-sensitive always blocks Apply synthesis templates to avoid latches and ensure proper hardware inference Recognize when to use blocking ( = ) vs nonblocking ( <= ) assignments in always blocks`,
      },
      {
        title: "5. Syntax",
        content: `always @ (event) [statement] always @ (event) begin [multiple statements] end The always block is executed at some particular event. The event is defined by a sensitivity list.`,
      },
      {
        title: "6. What is the sensitivity list ?",
        content: `A sensitivity list is the expression that defines when the always block should be executed and is specified after the @ operator within parentheses ( ) . This list may contain either one or a group of signals whose value change will execute the always block. In the code shown below, all statements inside the always block get executed whenever the value of signals a or b change. // Level-sensitive: Execute always block whenever value of "a" or "b" change // This is used for combinational logic always @ (a or b) begin [statements] end`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog always Block** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-always-block.v - Örnek Donanım Modülü",
          snippet: `always @ (event)
	[statement]
	
always @ (event) begin
	[multiple statements]
end`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-always-block_tb.v - Simülasyon Testbench",
          snippet: `// Level-sensitive: Execute always block whenever value of "a" or "b" change
// This is used for combinational logic
always @ (a or b) begin
	[statements]
end`,
        },
      },
    ],
    playground: {
      initialCode: `always @ (event)
	[statement]
	
always @ (event) begin
	[multiple statements]
end`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog always Block ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-control-block": {
    id: "verilog-control-block",
    badge: "Bölüm 6 • Yordamsal initial & always Blokları",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Yordamsal Kontrol Blokları",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 6: Yordamsal initial & always Blokları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Yordamsal Kontrol Blokları** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Yordamsal Kontrol Blokları** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Procedural Blocks Verilog Control Blocks Verilog Control Blocks Hardware behavior cannot be implemented without conditional statements and other ways to control the flow of logic. Verilog has a set of control flow blocks and mechanisms to achieve the same.`,
      },
      {
        title: "3. What You'll Learn",
        content: `What Verilog Control Blocks is and when to use it Syntax and usage patterns for Verilog Control Blocks Practical examples with code demonstrations Common mistakes and best practices`,
      },
      {
        title: "4. if-else-if",
        content: `This conditional statement is used to make a decision about whether certain statements should be executed or not. This is very similar to the if-else-if statements in C. If the expression evaluates to true, then the first statement will be executed. If the expression evaluates to false and if an else part exists, the else part will be executed. Syntax // if statement without else part if (expression) [statement] // if statment with an else part if (expression) [statement] else [statement] // if else for multiple statements should be // enclosed within "begin" and "end" if (expression) begin [multiple statements] end else begin [multiple statements] end // if-else-if statement if (expression) [statement] else if (expression) [statement] else [statement] The code examples shown above are synthesizable and can be implemented in hardware. Always simulate your design before synthesis to verify correct functionality. The else part of an if-else is optional and can cause a confusion if an else is omitted in a nested if sequence. To avoid this confusion, it's easier to always associate the else to the previous if that lacks an else. Another way is to enclose statements within a begin-end block. The last else part handles none-of-the-above or default case where none of the other conditions were satisfied. Click here to read more about if-else-if Loops provide a way of executing single or multiple statements within a block one or more number of times. There are four different types of looping statements in Verilog.`,
      },
      {
        title: "5. forever loop",
        content: `This will continuously execute the statements within the block. forever [statement] forever begin [multiple statements] end`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Yordamsal Kontrol Blokları** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-control-block.v - Örnek Donanım Modülü",
          snippet: `// if statement without else part
	if (expression) 
		[statement]
	
	// if statment with an else part
	if (expression) 
		[statement]
	else 
		[statement]
	
	// if else for multiple statements should be
	// enclosed within "begin" and "end"
	if (expression) begin
		[multiple statements]
	end else begin
		[multiple statements]
	end
	
	// if-else-if statement
	if (expression)
		[statement]
	else if (expression)
		[statement]
	else 
		[statement]`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-control-block_tb.v - Simülasyon Testbench",
          snippet: `forever 
		[statement]

	forever begin
		[multiple statements]
	end`,
        },
      },
    ],
    playground: {
      initialCode: `// if statement without else part
	if (expression) 
		[statement]
	
	// if statment with an else part
	if (expression) 
		[statement]
	else 
		[statement]
	
	// if else for multiple statements should be
	// enclosed within "begin" and "end"
	if (expression) begin
		[multiple statements]
	end else begin
		[multiple statements]
	end
	
	// if-else-if statement
	if (expression)
		[statement]
	else if (expression)
		[statement]
	else 
		[statement]`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Yordamsal Kontrol Blokları ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-block-statements": {
    id: "verilog-block-statements",
    badge: "Bölüm 6 • Yordamsal initial & always Blokları",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Blok İfadeleri: begin-end ve fork-join Paralel Çalışma",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 6: Yordamsal initial & always Blokları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Blok İfadeleri: begin-end ve fork-join Paralel Çalışma** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Blok İfadeleri: begin-end ve fork-join Paralel Çalışma** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Blok İfadeleri: begin-end ve fork-join Paralel Çalışma Şeması](/images/verilog/initial-begin-end-verilog.png)

![Blok İfadeleri: begin-end ve fork-join Paralel Çalışma Şeması](/images/verilog/fork-join-verilog.png)

![Blok İfadeleri: begin-end ve fork-join Paralel Çalışma Şeması](/images/verilog/fork-join2-verilog.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Procedural Blocks Verilog Block statements Verilog Block statements There are ways to group a set of statements together that are syntactically equivalent to a single statement and are known as block statements . There are two kinds of block statements: sequential ( begin-end ) and parallel ( fork-join ). Block statements enable structured control flow, scoped variable declarations, and concurrent execution modeling.`,
      },
      {
        title: "4. What You'll Learn",
        content: `Master sequential blocks ( begin-end ) for ordered statement execution with cumulative delays Understand parallel blocks ( fork-join ) for concurrent execution with independent timing Apply named blocks for hierarchical references, disabling, and local variable scoping Differentiate delay semantics: relative delays in sequential vs. absolute delays in parallel blocks`,
      },
      {
        title: "5. Sequential Blocks",
        content: `Statements are wrapped using begin and end keywords and will be executed sequentially in the given order, one after the other. Delay values are treated relative to the time of execution of the previous statement (cumulative delays). After all the statements within the block are executed, control may be passed elsewhere.`,
      },
      {
        title: "6. Syntax",
        content: `// Basic begin-end block begin statement1; // Executes first statement2; // Executes after statement1 completes statement3; // Executes after statement2 completes end // Named begin-end block (for hierarchical access and disable) begin : block_name [local variable declarations] // Optional: variables scoped to this block [statements] // Executed sequentially end`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Blok İfadeleri: begin-end ve fork-join Paralel Çalışma** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-block-statements.v - Örnek Donanım Modülü",
          snippet: `// Basic begin-end block
	begin
		statement1;     // Executes first
		statement2;     // Executes after statement1 completes
		statement3;     // Executes after statement2 completes
	end

	// Named begin-end block (for hierarchical access and disable)
	begin : block_name
		[local variable declarations]  // Optional: variables scoped to this block
		[statements]                   // Executed sequentially
	end`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-block-statements_tb.v - Simülasyon Testbench",
          snippet: `module design0;
	bit [31:0] data;            // SystemVerilog 2-state data type

	// "initial" block starts at time 0
	initial begin
		// Statement 1: Executes at time 0 + 10 = 10 time units
		#10 data = 8'hfe;         // Wait 10 time units, then assign 0xfe
		$display ("[Time=%0t] data=0x%0h", $time, data);

		// Statement 2: Executes at time 10 + 20 = 30 time units (relative delay)
		#20 data = 8'h11;         // Wait 20 MORE time units (cumulative: 30 total)
		$display ("[Time=%0t] data=0x%0h", $time, data);
	end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `// Basic begin-end block
	begin
		statement1;     // Executes first
		statement2;     // Executes after statement1 completes
		statement3;     // Executes after statement2 completes
	end

	// Named begin-end block (for hierarchical access and disable)
	begin : block_name
		[local variable declarations]  // Optional: variables scoped to this block
		[statements]                   // Executed sequentially
	end`,
      language: "verilog",
    },
    quiz: {
      question: "Blok İfadeleri: begin-end ve fork-join Paralel Çalışma ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-assignments": {
    id: "verilog-assignments",
    badge: "Bölüm 7 • Atama İfadeleri & Blocking/Non-Blocking",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Verilog Atama Mekanizmaları: Sürekli ve Yordamsal",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 7: Atama İfadeleri & Blocking/Non-Blocking. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Atama Mekanizmaları: Sürekli ve Yordamsal** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Atama Mekanizmaları: Sürekli ve Yordamsal** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Assignments Verilog Assignments Verilog Assignments Placing values onto nets and variables are called assignments. Understanding the different assignment types and when to use each is fundamental to writing correct Verilog code. Choosing the wrong assignment type can lead to synthesis errors, simulation mismatches, or incorrect hardware behavior. 8 min read | Beginner to Intermediate`,
      },
      {
        title: "3. What You'll Learn",
        content: `Master the three assignment forms: procedural, continuous, and procedural continuous Understand what can legally appear on the left-hand side (LHS) of each assignment type Apply blocking ( = ) and non-blocking ( <= ) assignments correctly in procedural blocks Recognize when to use assign/deassign and force/release for advanced testbench control`,
      },
      {
        title: "4. Three Basic Assignment Forms",
        content: `Verilog provides three fundamental assignment mechanisms: Procedural - Used in always , initial , tasks, and functions Continuous - Used with assign keyword for combinational logic Procedural Continuous - Used with assign/deassign and force/release for overriding assignments`,
      },
      {
        title: "5. Assignment Structure",
        content: `An assignment has two parts - right-hand side (RHS) and left-hand side (LHS) with an equal symbol ( = ) or a less than-equal symbol ( <= ) in between: LHS = RHS; // Blocking assignment LHS <= RHS; // Non-blocking assignment assign LHS = RHS; // Continuous assignment The RHS can contain any expression that evaluates to a final value, while the LHS indicates a net or a variable to which the value in RHS is being assigned.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Atama Mekanizmaları: Sürekli ve Yordamsal** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-assignments.v - Örnek Donanım Modülü",
          snippet: `LHS = RHS;     // Blocking assignment
LHS <= RHS;    // Non-blocking assignment
assign LHS = RHS;  // Continuous assignment`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-assignments_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg clk;
  wire a, b, c, d, e, f;
  reg z, y;

  // clk is on the LHS and the not of clk forms RHS
  always #10 clk = ~clk;

  // y is the LHS and the constant 1 is RHS (ERROR: can't assign to wire in continuous assignment)
  // This should be: assign y = 1; (but y should be wire, not reg)

  // f is the LHS, and the expression of a,b,d,e forms the RHS
  assign f = (a | b) ^ (d & e);

  always @ (posedge clk) begin
    // z is the LHS, and the expression of a,b,c,d forms the RHS
    z <= a + b + c + d;
  end

  initial begin
    // Variable names on the left form LHS while 0 is RHS
    a <= 0; b <= 0; c <= 0; d <= 0; e <= 0;   // ERROR: can't assign to wires in initial block
    clk <= 0;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `LHS = RHS;     // Blocking assignment
LHS <= RHS;    // Non-blocking assignment
assign LHS = RHS;  // Continuous assignment`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Atama Mekanizmaları: Sürekli ve Yordamsal ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-assign-statement": {
    id: "verilog-assign-statement",
    badge: "Bölüm 7 • Atama İfadeleri & Blocking/Non-Blocking",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "assign İfadeleri ile Sürekli Atama (Continuous Assignment)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 7: Atama İfadeleri & Blocking/Non-Blocking. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **assign İfadeleri ile Sürekli Atama (Continuous Assignment)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **assign İfadeleri ile Sürekli Atama (Continuous Assignment)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![assign İfadeleri ile Sürekli Atama (Continuous Assignment) Şeması](/images/verilog/assign-flash-1.PNG)

![assign İfadeleri ile Sürekli Atama (Continuous Assignment) Şeması](/images/verilog/and_schematic.png)

![assign İfadeleri ile Sürekli Atama (Continuous Assignment) Şeması](/images/verilog/assign-combo.PNG)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Assignments Verilog assign statement Verilog assign statement `,
      },
      {
        title: "4. What You'll Learn",
        content: `Master continuous assignments with assign for modeling combinational logic Understand the critical difference between wire (continuous) and reg (procedural) assignments Apply concatenation, part-select, and replication operators in assign statements Recognize multiple driver conflicts and high-impedance (Z) states from undriven nets Signals of type wire or a similar wire like data type requires the continuous assignment of a value. For example, consider an electrical wire used to connect pieces on a breadboard. As long as the +5V battery is applied to one end of the wire, the component connected to the other end of the wire will get the required voltage. In Verilog, this concept is realized by the assign statement where any wire or other similar wire like data-types can be driven continuously with a value. The value can either be a constant or an expression comprising of a group of signals.`,
      },
      {
        title: "5. Assign Syntax",
        content: `The assignment syntax starts with the keyword assign followed by the signal name which can be either a single signal or a concatenation of different signal nets. The drive strength and delay are optional and are mostly used for dataflow modeling than synthesizing into real hardware. The expression or signal on the right hand side is evaluated and assigned to the net or expression of nets on the left hand side. assign <net_expression> = [drive_strength] [delay] <expression of different signals or constant value> Delay values are useful for specifying delays for gates and are used to model timing behavior in real hardware because the value dictates when the net should be assigned with the evaluated value.`,
      },
      {
        title: "6. Rules",
        content: `There are some rules that need to be followed when using an assign statement: LHS should always be a scalar or vector net or a concatenation of scalar or vector nets and never a scalar or vector register. RHS can contain scalar or vector registers and function calls. Whenever any operand on the RHS changes in value, LHS will be updated with the new value. assign statements are also called continuous assignments and are always active`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **assign İfadeleri ile Sürekli Atama (Continuous Assignment)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-assign-statement.v - Örnek Donanım Modülü",
          snippet: `assign <net_expression> = [drive_strength] [delay] <expression of different signals or constant value>`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-assign-statement_tb.v - Simülasyon Testbench",
          snippet: `module xyz (input [3:0] 	x,		// x is a 4-bit vector net
						input 				y, 		// y is a scalar net (1-bit)
						output [4:0] 	z ); 	// z is a 5-bit vector net (output)

wire [1:0] 	a;  // Internal 2-bit wire
wire 				b;  // Internal 1-bit wire

// ========== DEMONSTRATION OF ASSIGN FEATURES ==========
// Test case: Assume x=4'hC (4'b1100) and y=1'b1
// NOTE: Only ONE case should be active in real design!

// ===== Case #1: Full Concatenation =====
// Concatenation {x, y} combines 4-bit x and 1-bit y -> 5-bit result
// Result: z = {4'b1100, 1'b1} = 5'b11001 = 5'h19
assign z = {x, y};

// ===== Case #2: Partial Assignment (creates high-impedance) =====
// Only z[3:1] is driven, z[4] and z[0] are undriven -> high-impedance (Z)
// z[3:1] = {x[0], y} = {1'b1100, 1'b1}[2:0] = 3'b001
// Result: z = 5'bZ001Z (bit 4 and bit 0 are undriven)
assign z[3:1] = {x, y};

// ===== Case #3: Multiple Assign on Different Bits =====
// z[3:1] assigned from concatenation, z[4] driven separately
// Now only z[0] remains undriven
// Result: z = 5'b1001Z (bit 0 still undriven)
assign z[3:1] = {x, y};
assign z[4] = 1;

// ===== Case #4: Multiple Drivers, Same Value (No Conflict) =====
// z[3] is driven TWICE: First from z[3:1], second from explicit assign
// Both drive bit3 with same value (0), so no contention
// x[3] = 1'b1, but explicit assign z[3]=0 creates multiple drivers
// Result: z = 5'bZ001Z (bit 3 has two drivers with same value)
assign z[3:1] = {x, y};
assign z[3] = 0;

// ===== Case #5: Multiple Drivers, Different Values (CONFLICT!) =====
// z[3] is driven with DIFFERENT values: x[3]=1'b1 vs explicit 1'b1
// Creates driver conflict -> result is X (unknown)
// Result: z = 5'bZX01Z (bit 3 is X due to conflicting drivers)
assign z[3:1] = {x, y};
assign z[3] = 1;

// ===== Case #6: Part-Select on RHS =====
// Only x[1:0] used (not full x), concatenated with y
// {x[1:0], y} = {2'b00, 1'b1} = 3'b001
// z is 5-bit, so padded with zeros: z = 5'b00001
assign z = {x[1:0], y};

/
// ... (testbench devamı)`,
        },
      },
    ],
    playground: {
      initialCode: `assign <net_expression> = [drive_strength] [delay] <expression of different signals or constant value>`,
      language: "verilog",
    },
    quiz: {
      question: "assign İfadeleri ile Sürekli Atama (Continuous Assignment) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-blocking-non-blocking-statements": {
    id: "verilog-blocking-non-blocking-statements",
    badge: "Bölüm 7 • Atama İfadeleri & Blocking/Non-Blocking",
    readingTime: "8 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Kritik Fark: Engelleyen (=) ve Engellemeyen (<=) Atamalar",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 7: Atama İfadeleri & Blocking/Non-Blocking. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Kritik Fark: Engelleyen (=) ve Engellemeyen (<=) Atamalar** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Kritik Fark: Engelleyen (=) ve Engellemeyen (<=) Atamalar** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Assignments Verilog Blocking & Non-Blocking Verilog Blocking & Non-Blocking Understanding the difference between blocking ( = ) and non-blocking ( <= ) assignments is critical for writing correct Verilog code. The wrong choice can lead to simulation mismatches, race conditions, and synthesized hardware that behaves differently than your testbench. 8 min read | Beginner to Intermediate`,
      },
      {
        title: "3. What You'll Learn",
        content: `Master the execution semantics of blocking ( = ) versus non-blocking ( <= ) assignments Understand time-step evaluation and how assignments are scheduled in Verilog simulators Apply the correct assignment type for combinational logic, sequential logic, and testbenches Recognize and avoid race conditions caused by improper mixing of assignment types`,
      },
      {
        title: "4. Assignment Types Comparison",
        content: `Aspect Blocking ( = ) Non-Blocking ( <= ) Execution Order Sequential - blocks until complete Concurrent - schedules for end of time-step When RHS Evaluated Immediately before assignment At statement execution, assigned later When LHS Updated Immediately At end of current time-step Primary Use Case Combinational logic, testbenches Sequential (clocked) logic Synthesis Result Combinational logic (no registers) Registers (flip-flops) Race Condition Risk High if mixed with non-blocking Low - deterministic scheduling`,
      },
      {
        title: "5. Blocking Assignments",
        content: `Blocking assignment statements are assigned using = and are executed one after the other in a procedural block. Each statement must complete before the next one executes. However, this will not prevent execution of statements that run in a parallel block. module tb; reg [7:0] a, b, c, d, e; initial begin a = 8'hDA; // Execute first $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c); // Then display (b, c still unassigned) b = 8'hF1; // Then assign b $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c); // Display again (c still unassigned) c = 8'h30; // Finally assign c $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c); // Display all assigned values end initial begin // This block runs in parallel with the first block d = 8'hAA; // Execute first in this block $display ("[%0t] d=0x%0h e=0x%0h", $time, d, e); // Display (e still unassigned) e = 8'h55; // Then assign e $display ("[%0t] d=0x%0h e=0x%0h", $time, d, e); // Display both assigned end endmodule Note that there are two initial blocks which are executed in parallel when simulation starts. Statements are executed sequentially in each block and both blocks finish at time 0ns. To be more specific, variable a gets assigned first, followed by the display statement which is then followed by all other statements. This is visible in the output where variables b and c are 8'hxx in the first display statement because their assignments have not been executed yet when the first $display is called. Output ncsim> run [0] a=0xda b=0xx c=0xx [0] a=0xda b=0xf1 c=0xx [0] a=0xda b=0xf1 c=0x30 [0] d=0xaa e=0xx [0] d=0xaa e=0x55 ncsim: *W,RNQUIE: Simulation is complete.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Kritik Fark: Engelleyen (=) ve Engellemeyen (<=) Atamalar** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-blocking-non-blocking-statements.v - Örnek Donanım Modülü",
          snippet: `module tb;
  reg [7:0] a, b, c, d, e;

  initial begin
    a = 8'hDA;                                            // Execute first
    $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c);  // Then display (b, c still unassigned)
    b = 8'hF1;                                            // Then assign b
    $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c);  // Display again (c still unassigned)
    c = 8'h30;                                            // Finally assign c
    $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c);  // Display all assigned values
  end

  initial begin                                          // This block runs in parallel with the first block
    d = 8'hAA;                                           // Execute first in this block
    $display ("[%0t] d=0x%0h e=0x%0h", $time, d, e);     // Display (e still unassigned)
    e = 8'h55;                                           // Then assign e
    $display ("[%0t] d=0x%0h e=0x%0h", $time, d, e);     // Display both assigned
  end
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-blocking-non-blocking-statements_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg [7:0] a, b, c, d, e;

  initial begin
    a = 8'hDA;                                            // Execute at time 0
    $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c);
    #10 b = 8'hF1;                                        // Wait 10ns, then execute
    $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c);  // Execute at time 10
    c = 8'h30;                                            // Execute immediately after b
    $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c);  // Still at time 10
  end

  initial begin
    #5 d = 8'hAA;                                         // Wait 5ns, then execute
    $display ("[%0t] d=0x%0h e=0x%0h", $time, d, e);      // Execute at time 5
    #5 e = 8'h55;                                         // Wait another 5ns (total 10ns)
    $display ("[%0t] d=0x%0h e=0x%0h", $time, d, e);      // Execute at time 10
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module tb;
  reg [7:0] a, b, c, d, e;

  initial begin
    a = 8'hDA;                                            // Execute first
    $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c);  // Then display (b, c still unassigned)
    b = 8'hF1;                                            // Then assign b
    $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c);  // Display again (c still unassigned)
    c = 8'h30;                                            // Finally assign c
    $display ("[%0t] a=0x%0h b=0x%0h c=0x%0h", $time, a, b, c);  // Display all assigned values
  end

  initial begin                                          // This block runs in parallel with the first block
    d = 8'hAA;                                           // Execute first in this block
    $display ("[%0t] d=0x%0h e=0x%0h", $time, d, e);     // Display (e still unassigned)
    e = 8'h55;                                           // Then assign e
    $display ("[%0t] d=0x%0h e=0x%0h", $time, d, e);     // Display both assigned
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Kritik Fark: Engelleyen (=) ve Engellemeyen (<=) Atamalar ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
};
