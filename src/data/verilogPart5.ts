import { LessonContent } from "./lessonsData";

export const VERILOG_PART5: Record<string, LessonContent> = {
  "verilog-synthesis": {
    id: "verilog-synthesis",
    badge: "Bölüm 27 • Mantıksal Sentez & Kodlama Kuralları",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mantıksal Sentez Temelleri: RTL'den Kapı Netlistine",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 27: Mantıksal Sentez & Kodlama Kuralları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mantıksal Sentez Temelleri: RTL'den Kapı Netlistine** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mantıksal Sentez Temelleri: RTL'den Kapı Netlistine** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Mantıksal Sentez Temelleri: RTL'den Kapı Netlistine Şeması](/images/verilog/verilog-synthesis.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Synthesis Verilog Synthesis Verilog Synthesis `,
      },
      {
        title: "4. What is synthesis ?",
        content: `Verilog synthesis is the process of transforming high-level Verilog code, which describes digital circuits, into a lower-level representation that can be implemented in hardware. This transformation typically results in a netlist, which consists of logical components like gates and flip-flops that can be physically realized in an FPGA or ASIC. Synthesis converts abstract descriptions of designs (written in Verilog) into a format that can be mapped to physical hardware components. The synthesis process optimizes the design for various constraints such as area, timing, and power consumption.`,
      },
      {
        title: "5. How is synthesis done ?",
        content: `The process begins with a synthesizable subset of Verilog code, typically written at the Register Transfer Level (RTL). The synthesis tool applies algorithms to optimize the logic, reducing the number of gates and improving performance. Specify timing constraints to guide the synthesis tool in optimizing for speed and performance.The final output is a netlist that describes the circuit in terms of basic logic gates and flip-flops. Various tools are available for Verilog synthesis, including Synopsys Design Compiler, Cadence Genus, Xilinx Vivado, etc. Different synthesis tools may interpret Verilog code differently, leading to variations in synthesized output.`,
      },
      {
        title: "6. What is a synthesis constraint file ?",
        content: `A Synthesis Constraint File is typically written in the Synopsys Design Constraints (SDC) format, which is used to specify timing, area, and power constraints for digital designs. During synthesis, the SDC file guides tools like Synopsys Design Compiler to optimize the logic based on specified constraints. # Set the version of the SDC file set_version 2.1 # Define the clock create_clock -period 10 [get_ports clk] ; # 100 MHz clock # Set input delay constraints set_input_delay -max 2 [get_ports data_in[*]] -clock [get_clocks clk] set_input_delay -min 1 [get_ports data_in[*]] -clock [get_clocks clk] # Set output delay constraints set_output_delay -max 3 [get_ports data_out[*]] -clock [get_clocks clk] set_output_delay -min 1 [get_ports data_out[*]] -clock [get_clocks clk] # Set load capacitance on output ports set_load 0.01 [get_ports data_out[*]] # Define false paths (if any) set_false_path -from [get_ports reset] -to [get_ports data_out[*]] # Set maximum fanout for specific ports set_max_fanout 10 [get_ports data_in[*]]`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mantıksal Sentez Temelleri: RTL'den Kapı Netlistine** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-synthesis.v - Örnek Donanım Modülü",
          snippet: `# Set the version of the SDC file
set_version 2.1

# Define the clock
create_clock -period 10 [get_ports clk]  ; # 100 MHz clock

# Set input delay constraints
set_input_delay -max 2 [get_ports data_in[*]] -clock [get_clocks clk]
set_input_delay -min 1 [get_ports data_in[*]] -clock [get_clocks clk]

# Set output delay constraints
set_output_delay -max 3 [get_ports data_out[*]] -clock [get_clocks clk]
set_output_delay -min 1 [get_ports data_out[*]] -clock [get_clocks clk]

# Set load capacitance on output ports
set_load 0.01 [get_ports data_out[*]]

# Define false paths (if any)
set_false_path -from [get_ports reset] -to [get_ports data_out[*]]

# Set maximum fanout for specific ports
set_max_fanout 10 [get_ports data_in[*]]`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-synthesis_tb.v - Simülasyon Testbench",
          snippet: `module compare_xz (
    input wire b,
    output reg a
);
    always @(*) begin
        if ((b == 1'bz) || (b == 1'bx)) begin
            a = 1; // Set a to 1 if b is high impedance or unknown
        end else begin
            a = 0; // Set a to 0 otherwise
        end
    end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `# Set the version of the SDC file
set_version 2.1

# Define the clock
create_clock -period 10 [get_ports clk]  ; # 100 MHz clock

# Set input delay constraints
set_input_delay -max 2 [get_ports data_in[*]] -clock [get_clocks clk]
set_input_delay -min 1 [get_ports data_in[*]] -clock [get_clocks clk]

# Set output delay constraints
set_output_delay -max 3 [get_ports data_out[*]] -clock [get_clocks clk]
set_output_delay -min 1 [get_ports data_out[*]] -clock [get_clocks clk]

# Set load capacitance on output ports
set_load 0.01 [get_ports data_out[*]]

# Define false paths (if any)
set_false_path -from [get_ports reset] -to [get_ports data_out[*]]

# Set maximum fanout for specific ports
set_max_fanout 10 [get_ports data_in[*]]`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mantıksal Sentez Temelleri: RTL'den Kapı Netlistine ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-coding-style-effect": {
    id: "verilog-coding-style-effect",
    badge: "Bölüm 27 • Mantıksal Sentez & Kodlama Kuralları",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Kodlama Tarzının Sentez Sonucuna ve Alan/Gecikmeye Etkisi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 27: Mantıksal Sentez & Kodlama Kuralları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Kodlama Tarzının Sentez Sonucuna ve Alan/Gecikmeye Etkisi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Kodlama Tarzının Sentez Sonucuna ve Alan/Gecikmeye Etkisi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Kodlama Tarzının Sentez Sonucuna ve Alan/Gecikmeye Etkisi Şeması](/images/verilog/3modcnt_andbits.png)

![Kodlama Tarzının Sentez Sonucuna ve Alan/Gecikmeye Etkisi Şeması](/images/verilog/3modcnt_eq3.png)

![Kodlama Tarzının Sentez Sonucuna ve Alan/Gecikmeye Etkisi Şeması](/images/verilog/3modcnt_reduction_and.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Synthesis Verilog Coding Style Effect Verilog Coding Style Effect Verilog is a hardware description language (HDL) used for designing digital circuits and systems. Writing Verilog code with a consistent and organized style is important to make the code maintainable, readable, and error-free. Verilog coding style can have a significant impact on the synthesis process, where your high-level Verilog code is converted into a gate-level netlist that can be implemented on an FPGA or ASIC. A well-structured and organized Verilog codebase can lead to more efficient synthesis with less hardware, and save area and power. Consider the following three implementations of a Mod-3 counter that results in hardware circuits with different logic elements. An adder to increment and flops to store the counter value are the two must-have elements to implement a counter. The difference lies in how the synthesis tool uses the hardware description to implement the reset logic. Its worthwhile to remember that there are trade-offs for each approach like area over power and reusability.`,
      },
      {
        title: "4. Example #1",
        content: `module cntr_mod3 (input clk, rstn, output reg [1:0] out); always @(posedge clk) begin if (!rstn | out[1] & out[0]) out <= 0; else out <= out + 1; end endmodule Note that the synthesis tool implemented the hardware logic exactly as described using an AND and OR gate.`,
      },
      {
        title: "5. Example #2",
        content: `module cntr_mod3 (input clk, rstn, output reg [1:0] out); always @(posedge clk) begin if (!rstn) out <= 0; else if (out == 3) out <= 0; else out <= out + 1; end endmodule Note that synthesis resulted in two multiplexer circuit which has a lot more gates than the previous result, and thereby have higher area and power.`,
      },
      {
        title: "6. Example #3",
        content: `module cntr_mod3 (input clk, rstn, output reg [1:0] out); always @(posedge clk) begin if (!rstn) out <= 0; else if (&out) out <= 0; else out <= out + 1; end endmodule Note that synthesis resulted in a single MUX and a reduction AND element as described by the Verilog RTL code. `,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Kodlama Tarzının Sentez Sonucuna ve Alan/Gecikmeye Etkisi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-coding-style-effect.v - Örnek Donanım Modülü",
          snippet: `module cntr_mod3 (input clk, rstn, output reg [1:0] out);
  always @(posedge clk) begin
    if (!rstn | out[1] & out[0])
      out <= 0;
    else
      out <= out + 1;
  end 
endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-coding-style-effect_tb.v - Simülasyon Testbench",
          snippet: `module cntr_mod3 (input clk, rstn, output reg [1:0] out);
  always @(posedge clk) begin
    if (!rstn)
      out <= 0;
    else
      if (out == 3) 
        out <= 0;
      else  
        out <= out + 1;
  end 
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module cntr_mod3 (input clk, rstn, output reg [1:0] out);
  always @(posedge clk) begin
    if (!rstn | out[1] & out[0])
      out <= 0;
    else
      out <= out + 1;
  end 
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Kodlama Tarzının Sentez Sonucuna ve Alan/Gecikmeye Etkisi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-timing-checks": {
    id: "verilog-timing-checks",
    badge: "Bölüm 28 • Zamanlama Analizi & SDF Açıklamaları",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Statik Zamanlama Kontrolleri: $setup, $hold, $recovery, $removal",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 28: Zamanlama Analizi & SDF Açıklamaları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Statik Zamanlama Kontrolleri: $setup, $hold, $recovery, $removal** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Statik Zamanlama Kontrolleri: $setup, $hold, $recovery, $removal** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Statik Zamanlama Kontrolleri: $setup, $hold, $recovery, $removal Şeması](/images/verilog/sta_timing.svg)

![Statik Zamanlama Kontrolleri: $setup, $hold, $recovery, $removal Şeması](/images/verilog/sta_setup.svg)

![Statik Zamanlama Kontrolleri: $setup, $hold, $recovery, $removal Şeması](/images/verilog/timing_check_setup.svg)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Timing Analysis Verilog Timing Checks Verilog Timing Checks `,
      },
      {
        title: "4. What are timing checks ?",
        content: `Timing checks in digital design are critical for ensuring that a circuit meets its specified timing requirements. They help verify that signals propagate through the circuit within the allowed time constraints, preventing issues such as setup and hold time violations. Timing checks must be placed inside a specify block in a Verilog module. specify // Timing check statements endspecify Note! Timing checks are not system tasks although they begin with $ .`,
      },
      {
        title: "5. What are reference and data events ?",
        content: `All timing checks involve a reference event and a data event, each of which can be associated with boolean conditions. The reference event is a signal transition that establishes a point in time for measuring other events. It is typically associated with clock edges (e.g., posedge or negedge) or other significant control signals. For example, in a setup time check, the reference event would be the rising edge of a clock signal. The data event is the signal whose timing is being monitored relative to the reference event. This signal typically represents data inputs to registers or flip-flops. For instance, in a hold time check, the data event would be the stable state of a data signal immediately following the clock edge defined by the reference event. specify $setup(data_signal, posedge clk, setup_time_limit); // posedge clk is reference event $hold(posedge clk, data_signal, hold_time_limit); // data_signal is the data event endspecify Timing checks will only detect reference and data events when their corresponding conditions are satisfied.`,
      },
      {
        title: "6. What are timestamp and timecheck events ?",
        content: `The evaluation of timing checks relies on the times of two events, referred to as the timestamp event and the timecheck event. When there is a transition on the timestamp event signal, the simulator records (or "stamps") the time of that transition for later use in assessing the timing check. Conversely, a transition on the timecheck event signal prompts the simulator to evaluate the timing check to determine if a violation has occurred.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Statik Zamanlama Kontrolleri: $setup, $hold, $recovery, $removal** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-timing-checks.v - Örnek Donanım Modülü",
          snippet: `specify
  // Timing check statements
endspecify`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-timing-checks_tb.v - Simülasyon Testbench",
          snippet: `specify
    $setup(data_signal, posedge clk, setup_time_limit);     // posedge clk is reference event
    $hold(posedge clk, data_signal, hold_time_limit);       // data_signal is the data event
endspecify`,
        },
      },
    ],
    playground: {
      initialCode: `specify
  // Timing check statements
endspecify`,
      language: "verilog",
    },
    quiz: {
      question: "Statik Zamanlama Kontrolleri: $setup, $hold, $recovery, $removal ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-sdf": {
    id: "verilog-sdf",
    badge: "Bölüm 28 • Zamanlama Analizi & SDF Açıklamaları",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Standart Gecikme Formatı (SDF) ve $sdf_annotate ile Doğrulama",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 28: Zamanlama Analizi & SDF Açıklamaları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Standart Gecikme Formatı (SDF) ve $sdf_annotate ile Doğrulama** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Standart Gecikme Formatı (SDF) ve $sdf_annotate ile Doğrulama** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Standart Gecikme Formatı (SDF) ve $sdf_annotate ile Doğrulama Şeması](/images/verilog/sdf-example.svg)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Timing Analysis Standard Delay Format (SDF) Standard Delay Format (SDF) `,
      },
      {
        title: "4. What is SDF ?",
        content: `Standard Delay Format (SDF) is an IEEE standard (IEEE 1497) used extensively in electronic design automation (EDA) for representing timing information associated with digital circuits. It is in ASCII format and includes path and interconnect delays and timing constraint checks.`,
      },
      {
        title: "5. What is it used for ?",
        content: `SDF serves as a bridge between dynamic and static timing analysis, allowing for accurate representation of delays within digital circuits. It is widely used in various stages of the design flow to ensure that timing requirements are met. Timing Representation : SDF provides a standardized way to describe delays associated with digital components, including gates, flip-flops, and interconnects. This is essential for ensuring that the design meets its timing requirements. Interoperability : By using a common format, SDF facilitates communication between different EDA tools. This allows designers to use various tools for synthesis, simulation, and timing analysis without worrying about compatibility issues. Back-Annotation : SDF is often used for back-annotation, where timing data calculated during the post-layout phase is added to the simulation environment. This helps ensure that simulations reflect the actual delays present in the physical implementation of the design. Forward Annotation : In some cases, SDF can also be used for forward annotation, where timing information is provided to tools before synthesis to guide optimization processes.`,
      },
      {
        title: "6. Structure of SDF",
        content: `An SDF file consists of several key sections:`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Standart Gecikme Formatı (SDF) ve $sdf_annotate ile Doğrulama** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-sdf.v - Örnek Donanım Modülü",
          snippet: `(SDFVERSION "3.10")
(DESIGN "PROTOTYPE")
(DATE "October 27, 2009 12:31")
(VENDOR "SOME_EDA")
(VOLTAGE 1.1:0.9:0.8)
(PROCESS "min:typ:max")
(TEMPERATURE -40:25:125)
(TIMESCALE 1ns)`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-sdf_tb.v - Simülasyon Testbench",
          snippet: `(CELL (CELLTYPE "AND2")
      (INSTANCE "U1")
      (DELAY (ABSOLUTE
          (INTERCONNECT (0.1::0.2) (0.3::0.4))
          (CELL (0.5::0.6) (0.7::0.8)))))`,
        },
      },
    ],
    playground: {
      initialCode: `(SDFVERSION "3.10")
(DESIGN "PROTOTYPE")
(DATE "October 27, 2009 12:31")
(VENDOR "SOME_EDA")
(VOLTAGE 1.1:0.9:0.8)
(PROCESS "min:typ:max")
(TEMPERATURE -40:25:125)
(TIMESCALE 1ns)`,
      language: "verilog",
    },
    quiz: {
      question: "Standart Gecikme Formatı (SDF) ve $sdf_annotate ile Doğrulama ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-sdf-annotate": {
    id: "verilog-sdf-annotate",
    badge: "Bölüm 28 • Zamanlama Analizi & SDF Açıklamaları",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog sdf_annotate",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 28: Zamanlama Analizi & SDF Açıklamaları. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog sdf_annotate** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog sdf_annotate** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Timing Analysis Verilog sdf_annotate Verilog sdf_annotate `,
      },
      {
        title: "3. What is SDF Backannotation ?",
        content: `SDF backannotation refers to the process of incorporating timing information like path delays, specparam values, timing constraint values and interconnect delays from a Standard Delay Format (SDF) file into a netlist during simulation. This technique is crucial for ensuring that the timing characteristics of a digital design are accurately represented, particularly after synthesis and layout. During simulation, each cell in the netlist retrieves its corresponding delay values from the SDF file. These delays are then annotated to the relevant instances or paths in the netlist, effectively replacing or modifying the default timing values that were initially assigned during synthesis.`,
      },
      {
        title: "4. $sdf_annotate",
        content: `The $sdf_annotate system task in Verilog is commonly used to implement backannotation. This command tells the simulator to read the specified SDF file and apply its timing information to the designated instance of the design. initial begin $sdf_annotate("/path/to/timing_data.sdf", top_level_instance); end`,
      },
      {
        title: "5. SDF Annotator",
        content: `An SDF annotator is any tool that can back-annotate SDF data to a Verilog simulator. It should issue a warning if it encounters data that it cannot annotate. elab: *W, SBNFSDF: Attempt to annotate specify block data of instance tb.DUT.path_to_cell of module example, which has no specify block <path/to/timing_data.sdf>, line 56531> An SDF file may include various constructs that are unrelated to specify path delays, specparam values, timing check constraints, or interconnect delays. All constructs not relevant to Verilog timing should be ignored without warnings. If the SDF file lacks a value for a specific Verilog timing parameter, that parameter should remain unmodified during back-annotation, retaining its pre-backannotation value. Annotating SDF timing data: Compiled SDF file: /path/to/timing_data.sdf Backannotation scope: tb.DUT.path_to_module_inst // Other info SDF statistics: No of Pathdelays = 12412 ... Annotated = 100.0% Total Annotated Path Delays 12412 12412 $period 113 0 $width 1214 0 $setup 63234 62412 $hold 63234 62412 Always review the SDF annotator tool log to ensure simulations are conducted with a high percentage of annotations.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog sdf_annotate** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-sdf-annotate.v - Örnek Donanım Modülü",
          snippet: `initial begin
    $sdf_annotate("/path/to/timing_data.sdf", top_level_instance);
end`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-sdf-annotate_tb.v - Simülasyon Testbench",
          snippet: `elab: *W, SBNFSDF: Attempt to annotate specify block data of instance tb.DUT.path_to_cell of module example, which has no specify block <path/to/timing_data.sdf>, line 56531>`,
        },
      },
    ],
    playground: {
      initialCode: `initial begin
    $sdf_annotate("/path/to/timing_data.sdf", top_level_instance);
end`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog sdf_annotate ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-math-functions": {
    id: "verilog-math-functions",
    badge: "Bölüm 29 • Yardımcı Fonksiyonlar & Matematik",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Fonksiyonları (function ... endfunction)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 29: Yardımcı Fonksiyonlar & Matematik. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
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
        content: `Utility Functions Verilog Math Functions Verilog Math Functions Verilog math functions can be used in place of constant expressions and supports both integer and real maths.`,
      },
      {
        title: "3. Integer Math Functions",
        content: `The function $clog2 returns the ceiling of log 2 of the given argument. This is typically used to calculate the minimum width required to address a memory of given size. For example, if the design has 7 parallel adders, then the minimum number of bits required to represent all 7 adders is $clog2 of 7 that yields 3. module des #(parameter NUM_UNITS = 7) // Use of this system function helps to reduce the // number of input wires to this module (input [$clog2(NUM_UNITS)-1:0] active_unit); initial $monitor("active_unit = %d", active_unit); endmodule \`define NUM_UNITS 5 module tb; integer i; reg [\`NUM_UNITS-1:0] active_unit; des #(.NUM_UNITS(\`NUM_UNITS)) u0(active_unit); initial begin active_unit = 1; #10 active_unit = 7; #10 active_unit = 8; end endmodule Note that the signal active_unit has 3-bits to store total 5 units. Output xcelium> run active_unit = 001 active_unit = 111 active_unit = 000 xmsim: *W,RNQUIE: Simulation is complete. `,
      },
      {
        title: "4. Real Math Functions",
        content: `These system functions accept real arguments and return a real number. Function Description $ln(x) Natural logarithm log(x) $log10(x) Decimal Logarithm log10(x) $exp(x) Exponential of x (e x ) where e=2.718281828... $sqrt(x) Square root of x $pow(x, y) x y $floor(x) Floor x $ceil(x) Ceiling x $sin(x) Sine of x where x is in radians $cos(x) Cosine of x where x is in radians $tan(x) Tangent of x where x is in radians $asin(x) Arc-Sine of x $acos(x) Arc-Cosine of x $atan(x) Arc-tangent of x $atan2(x, y) Arc-tangent of x/y $hypot(x, y) Hypotenuse of x and y : sqrt(x x + y y ) $sinh(x) Hyperbolic Sine of x $cosh(x) Hyperbolic-Cosine of x $tanh(x) Hyperbolic-Tangent of x $asinh(x) Arc-hyperbolic Sine of x $acosh(x) Arc-hyperbolic Cosine of x $atanh(x) Arc-hyperbolic tangent of x module tb; real x, y; initial begin x = 10000; $display("$log10(%0.3f) = %0.3f", x, $log10(x)); x = 1; $display("$ln(%0.3f) = %0.3f", x, $ln(x)); x = 2; $display("$exp(%0.3f) = %0.3f", x, $exp(x)); x = 25; $display("$sqrt(%0.3f) = %0.3f", x, $sqrt(x)); x = 5; y = 3; $display("$pow(%0.3f, %0.3f) = %0.3f", x, y, $pow(x, y)); x = 2.7813; $display("$floor(%0.3f) = %0.3f", x, $floor(x)); x = 7.1111; $display("$ceil(%0.3f) = %0.3f", x, $ceil(x)); x = 30 * (22.0/7.0) / 180; // convert 30 degrees to radians $display("$sin(%0.3f) = %0.3f", x, $sin(x)); x = 90 * (22.0/7.0) / 180; $display("$cos(%0.3f) = %0.3f", x, $cos(x)); x = 45 * (22.0/7.0) / 180; $display("$tan(%0.3f) = %0.3f", x, $tan(x)); x = 0.5; $display("$asin(%0.3f) = %0.3f rad, %0.3f deg", x, $asin(x), $asin(x) * 7.0/22.0 * 180); x = 0; $display("$acos(%0.3f) = %0.3f rad, %0.3f deg", x, $acos(x), $acos(x) * 7.0/22.0 * 180); x = 1; $display("$atan(%0.3f) = %0.3f rad, %f deg", x, $atan(x), $atan(x) * 7.0/22.0 * 180); end endmodule Output xcelium> run $log10(10000.000) = 4.000 $ln(1.000) = 0.000 $exp(2.000) = 7.389 $sqrt(25.000) = 5.000 $pow(5.000, 3.000) = 125.000 $floor(2.781) = 2.000 $ceil(7.111) = 8.000 $sin(0.524) = 0.500 $cos(1.571) = -0.001 $tan(0.786) = 1.001 $asin(0.500) = 0.524 rad, 29.988 deg $acos(0.000) = 1.571 rad, 89.964 deg $atan(1.000) = 0.785 rad, 44.981895 deg xmsim: *W,RNQUIE: Simulation is complete.  `,
      },
      {
        title: "5. Quiz",
        content: `No quiz questions available for this article. &nbsp;&nbsp;Prev Article Next Article&nbsp;&nbsp;`,
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
          caption: "verilog-math-functions.v - Örnek Donanım Modülü",
          snippet: `module des 
  #(parameter NUM_UNITS = 7) 
  
  // Use of this system function helps to reduce the 
  // number of input wires to this module
  (input [$clog2(NUM_UNITS)-1:0] active_unit);
  
  initial 
    $monitor("active_unit = %d", active_unit);
endmodule

\`define NUM_UNITS 5

module tb;
  integer i;
  reg [\`NUM_UNITS-1:0] 	active_unit;
  
  des #(.NUM_UNITS(\`NUM_UNITS)) u0(active_unit);
  
  initial begin
    active_unit     = 1;     
	#10 active_unit = 7;
    #10 active_unit = 8;    
  end
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-math-functions_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  real x, y;
  
  initial begin
    x = 10000;
    $display("$log10(%0.3f) = %0.3f", x, $log10(x));
    
    x = 1;
    $display("$ln(%0.3f) = %0.3f", x, $ln(x));
    
    x = 2;
    $display("$exp(%0.3f) = %0.3f", x, $exp(x));
    
    x = 25;
    $display("$sqrt(%0.3f) = %0.3f", x, $sqrt(x));
    
    x = 5;
    y = 3;
    $display("$pow(%0.3f, %0.3f) = %0.3f", x, y, $pow(x, y));
    
    x = 2.7813;
    $display("$floor(%0.3f) = %0.3f", x, $floor(x));
    
    x = 7.1111;
    $display("$ceil(%0.3f) = %0.3f", x, $ceil(x));
    
    x = 30 * (22.0/7.0) / 180;   // convert 30 degrees to radians
    $display("$sin(%0.3f) = %0.3f", x, $sin(x));
    
    x = 90 * (22.0/7.0) / 180;
    $display("$cos(%0.3f) = %0.3f", x, $cos(x));
    
    x = 45 * (22.0/7.0) / 180;
    $display("$tan(%0.3f) = %0.3f", x, $tan(x));
    
    x = 0.5;
    $display("$asin(%0.3f) = %0.3f rad, %0.3f deg", x, $asin(x), $asin(x) * 7.0/22.0 * 180);
    
    x = 0;
    $display("$acos(%0.3f) = %0.3f rad, %0.3f deg", x, $acos(x), $acos(x) * 7.0/22.0 * 180);
    
    x = 1;
    $display("$atan(%0.3f) = %0.3f rad, %f deg", x, $atan(x), $atan(x) * 7.0/22.0 * 180);    
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module des 
  #(parameter NUM_UNITS = 7) 
  
  // Use of this system function helps to reduce the 
  // number of input wires to this module
  (input [$clog2(NUM_UNITS)-1:0] active_unit);
  
  initial 
    $monitor("active_unit = %d", active_unit);
endmodule

\`define NUM_UNITS 5

module tb;
  integer i;
  reg [\`NUM_UNITS-1:0] 	active_unit;
  
  des #(.NUM_UNITS(\`NUM_UNITS)) u0(active_unit);
  
  initial begin
    active_unit     = 1;     
	#10 active_unit = 7;
    #10 active_unit = 8;    
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Fonksiyonları (function ... endfunction) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-conversion-functions": {
    id: "verilog-conversion-functions",
    badge: "Bölüm 29 • Yardımcı Fonksiyonlar & Matematik",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Fonksiyonları (function ... endfunction)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 29: Yardımcı Fonksiyonlar & Matematik. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
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
        content: `Utility Functions Verilog Conversion Functions Verilog Conversion Functions In Verilog, conversion functions are used to convert data between different formats, specifically between integers, real numbers, and bit representations. These functions facilitate the manipulation and representation of data types within a simulation environment.`,
      },
      {
        title: "3. $rtoi",
        content: `Converts a real number to an integer. This function is used when you want to truncate the fractional part of a real number and obtain its integer representation. integer $rtoi(real_val); // For example, 192.15 becomes 192`,
      },
      {
        title: "4. $itor",
        content: `Converts an integer to a real number. This function is used when you want to perform calculations involving real numbers but start with an integer value. real $itor(int_val); // For example, 192 becomes 192.0`,
      },
      {
        title: "5. $realtobits",
        content: `Converts a real number to its binary (bit) equivalent. This function is helpful when you need to represent floating-point values in binary form for storage or transmission. [63:0] $realtobits(real_val);`,
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
          caption: "verilog-conversion-functions.v - Örnek Donanım Modülü",
          snippet: `integer     $rtoi(real_val);   // For example, 192.15 becomes 192`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-conversion-functions_tb.v - Simülasyon Testbench",
          snippet: `real        $itor(int_val);    // For example, 192 becomes 192.0`,
        },
      },
    ],
    playground: {
      initialCode: `integer     $rtoi(real_val);   // For example, 192.15 becomes 192`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Fonksiyonları (function ... endfunction) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-examples": {
    id: "verilog-examples",
    badge: "Bölüm 30 • Örnek Projeler & Pratik Devreler",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Examples",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 30: Örnek Projeler & Pratik Devreler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Examples** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Examples** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Examples & Practice Verilog Examples Verilog Examples Hello World! Flip-Flops and Latches JK Flip Flop D Flip-Flop Async Reset Verilog T Flip Flop D Latch Counters 4-bit counter Ripple Counter Straight Ring Counter Johnson Counter Mod-N Counter Gray Counter Digital Elements n-bit Shift Register Binary to Gray Converter Priority Encoder 4x1 multiplexer Full adder Misc Single Port RAM Verilog Pattern Detector Verilog Sequence Detector Synchronous FIFO Verilog Stack or LIFO `,
      },
      {
        title: "3. Quiz",
        content: `No quiz questions available for this article. &nbsp;&nbsp;Prev Article Next Article&nbsp;&nbsp;`,
      },
    ],
    playground: {
      initialCode: `// Verilog Examples
module verilog_examples (
    input wire clk,
    input wire rst_n,
    output wire out_sig
);
    assign out_sig = 1'b1;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Examples ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-1": {
    id: "verilog-interview-questions-set-1",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 1)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 1)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 1)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 1 Verilog Interview Questions Set 1 `,
      },
      {
        title: "3. Write Verilog code to swap contents of two registers with and without a temporary register?",
        content: `Swapping Contents of Two Registers using a Temporary Register: always @(posedge clk) begin temp = b; b = a; a = temp; end Swapping contents of two registers without a temporary register: always @(posedge clk) begin a <= b; b <= a; end This is because a non-blocking assignment captures the RHS of all statements in a given delta cycle and assigns them at the end of the cycle. Read more on Verilog Blocking & Non-Blocking statements.`,
      },
      {
        title: "4. Elaborate on the file operation support in Verilog.",
        content: `Verilog supports file I/O operations - reading from and writing into files. Verilog file operations work very similar to those of C programming language. Some of the commonly used Verilog system tasks are $fopen , $fscanf , $fdisplay , $fwrite , $fclose . Read more on Verilog File IO Operations .`,
      },
      {
        title: "5. Difference between inter statement and intra statement delay?",
        content: `Inter statement delay refers to the delay between two statements. It represents the time difference between the completion of one statement and the start of another statement. Intra statement delay refers to the delay within a single statement. It represents the time difference between the start of a statement and the execution of a specific operation within that statement. Read more on Verilog Inter and Intra Assignment Delay .`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 1)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-1.v - Örnek Donanım Modülü",
          snippet: `always @(posedge clk) begin
	temp = b;
	b = a;
	a = temp;
end`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-1_tb.v - Simülasyon Testbench",
          snippet: `always @(posedge clk) begin
	a <= b;
    b <= a;
end`,
        },
      },
    ],
    playground: {
      initialCode: `always @(posedge clk) begin
	temp = b;
	b = a;
	a = temp;
end`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 1) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-2": {
    id: "verilog-interview-questions-set-2",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 2)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 2)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 2)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 2 Verilog Interview Questions Set 2 `,
      },
      {
        title: "3. What are HDL simulators ?",
        content: `HDL (Hardware Description Language) simulators are software tools used in the design and testing of digital hardware. They simulate the behavior of digital circuits written in hardware description languages such as Verilog and VHDL. HDL simulators allow designers to test the functionality, timing, and performance of their designs before they are implemented in physical hardware. They are essential tools in the design and verification of complex digital systems such as microprocessors, FPGAs, and ASICs. HDL simulators come in different forms, including standalone software tools, integrated development environments (IDEs), and cloud-based platforms.`,
      },
      {
        title: "4. What do you understand by continuous assignment ?",
        content: `In Verilog, a continuous assignment statement allows the designer to assign a value to a signal or a wire continuously as long as the input changes. Unlike procedural assignments, which assign values to signals triggered by an event or a condition, continuous assignments are always active and assign values to signals based on their inputs. A continuous assignment statement in Verilog is represented by the keyword assign followed by the expression that describes the signal. A continuous assignment is typically used with combinational logic circuits where the output depends solely on the input. // Assigns the logical OR of (a and b) and c to the signal "out" assign out = (a & b) | c; // Assigns the logical AND of reset_n and enable_i to "enable" assign enable = (reset_n & enable_i); Read more on Verilog assign statement .`,
      },
      {
        title: "5. Can \`define be used for text substitution through variable instead of literal substitution ?",
        content: `Unfortunately, no, the \`define directive in Verilog does not allow for text substitution through variables. The \`define directive is used in Verilog to define a macro, which is a piece of code that is replaced with a predefined value or string of text during compilation. The \`define macro can be used for literal substitutions only, where the pre-defined text is replaced with the actual text value defined. For example, the following code defines a macro named "DATA_WIDTH" with the value "32": \`define DATA_WIDTH 32 This macro can be used in the Verilog source code to specify a data width of 32 bits, as shown below: wire [\`DATA_WIDTH-1:0] data_bus; During compilation, the \`define macro is replaced with the pre-defined value "32", resulting in the following code: wire [32-1:0] data_bus; However, the \`define directive does not allow for variable substitution, and it cannot be used to replace text with variables. Therefore, the pre-defined text value cannot be replaced with variables during compilation. Also read on Verilog \`ifdef Conditional Compilation .`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 2)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-2.v - Örnek Donanım Modülü",
          snippet: `// Assigns the logical OR of (a and b) and c to the signal "out"
assign out = (a & b) | c;

// Assigns the logical AND of reset_n and enable_i to "enable"
assign enable = (reset_n & enable_i);`,
        },
      },
    ],
    playground: {
      initialCode: `// Assigns the logical OR of (a and b) and c to the signal "out"
assign out = (a & b) | c;

// Assigns the logical AND of reset_n and enable_i to "enable"
assign enable = (reset_n & enable_i);`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 2) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-3": {
    id: "verilog-interview-questions-set-3",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 3)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 3)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 3)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
    ],
    playground: {
      initialCode: `// Verilog Mülakat Soruları ve Çözümleri (Soru Seti 3)
module verilog_interview_questions_set_3 (
    input wire clk,
    input wire rst_n,
    output wire out_sig
);
    assign out_sig = 1'b1;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 3) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-4": {
    id: "verilog-interview-questions-set-4",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 4)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 4)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 4)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
    ],
    playground: {
      initialCode: `// Verilog Mülakat Soruları ve Çözümleri (Soru Seti 4)
module verilog_interview_questions_set_4 (
    input wire clk,
    input wire rst_n,
    output wire out_sig
);
    assign out_sig = 1'b1;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 4) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-5": {
    id: "verilog-interview-questions-set-5",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 5)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 5)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 5)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 5 Verilog Interview Questions Set 5 `,
      },
      {
        title: "3. Illustrate a few important considerations in Verilog simulation regressions.",
        content: `Simulation regressions are a vital part of the design cycle for digital circuits. Simulation regressions involve running a wide range of tests on a circuit design to determine how it behaves under different conditions. There are several important considerations to keep in mind when executing simulation regressions, including: Test Coverage : The goal of a simulation regression is to test the circuit design thoroughly to ensure that it meets the required specifications. Therefore, test coverage is crucial to ensure that all the possible scenarios are simulated. Scalability : As the design of a digital circuit becomes more complex, the number of tests required to verify its functionality increases. Therefore, it is essential to ensure that simulation regressions are scalable, and the testbench can be easily modified as per the design. Debugging Capabilities : It is essential to have a comprehensive debugging capability to identify the faults encountered during simulation regression. Simulation Accuracy : The accuracy of the simulation directly impacts the breadth and depth of test coverage.`,
      },
      {
        title: "4. Illustrate the side effect of specifying delays in assign statements.",
        content: `Delays are not synthesizable and synthesis tools ignore any kind of delays specified in assignment, blocking or non-blocking procedural statements. If the functionality depends upon the presence of the delay, then a mismatch in functional simulation will be seen between the model and the synthesized netlist. z <= #5 x; // #5 will be ignored #10 z <= x; // #10 will be ignored`,
      },
      {
        title: "5. Illustrate the side effects of multiple processes writing to the same variable.",
        content: `Some potential side effects of multiple processes writing to the same variable include: Data Races : Concurrent access to the same variable without proper synchronization can lead to data races. A data race occurs when two or more processes access the same shared variable and at least one of the processes modifies the variable. This can result in unpredictable output or program crashes. Inconsistent Values : Multiple updates to the same variable by different processes can result in inconsistent data values. For example, one process might read the variable before another process has finished modifying it, resulting in the use of an outdated value. Non-Atomic Updates : Updating a shared variable is not necessarily an atomic operation, meaning that the update can require several steps to complete. If two or more processes try to update the same variable simultaneously, this can result in partial updates, corrupt data, or race conditions in simulations. Deadlocks : When multiple processes try to update the same variable in a circular manner, it can result in a deadlock. Deadlock is a situation where two or more processes are waiting for each other to release a resource, but neither process can make any progress. Most of the linting and synthesis tools can detect this and throw an error.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 5)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-5.v - Örnek Donanım Modülü",
          snippet: `z <= #5 x; 		// #5 will be ignored
#10 z <= x;     // #10 will be ignored`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-5_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  	integer i; // Same variable updated by different initial blocks

  	initial begin
		for (i = 0; i < 5; i = i+1) begin
        	#5 $display("Loop#1 : i=%0d", i);
		end 
	end
                          
  	initial begin
		for (i = 0; i < 10; i = i+1) begin
        	#10 $display("Loop#2 : i=%0d", i);
		end 
	end                          
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `z <= #5 x; 		// #5 will be ignored
#10 z <= x;     // #10 will be ignored`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 5) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-6": {
    id: "verilog-interview-questions-set-6",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 6)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 6)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 6)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 6 Verilog Interview Questions Set 6 `,
      },
      {
        title: "3. What are the main data types in Verilog ?",
        content: `In Verilog, there are several data types that can be used to represent different types of data. The main data types in Verilog include: Wire : A wire is used for simple connectivity between Verilog modules. It represents a net that can only have one driver and will be used as an output from one module and input to another. Reg : A reg is used to represent registers or memory elements in a Verilog design. It is used to store and manipulate data within a Verilog module. Integer : An integer is a data type used to represent signed integers in Verilog. It has a range of -2147483648 to 2147483647. Read more on Verilog Data Types .`,
      },
      {
        title: "4. What is Verilog used for?",
        content: `Verilog is a hardware description language (HDL) used to design, model, and simulate digital circuits and systems. It is commonly used in the design and verification of integrated circuits (ICs) and field programmable gate arrays (FPGAs) for various applications in communications, consumer electronics, automotive and industrial automation. Check out Verilog Tutorial .`,
      },
      {
        title: "5. What software is used to simulate Verilog code?",
        content: `There are several software tools that can be used to simulate Verilog code. Some of the most popular Verilog simulation software tools include: ModelSim : ModelSim is a popular Verilog simulation and debugging tool developed by Mentor Graphics. It offers a comprehensive solution for designing and verifying digital designs and offers both GUI-based and command-line interfaces. Xcelium : Xcelium is yet another popular Verilog simulator from Cadence which has a suite of other debugging tools as well. VCS : VCS is another popular Verilog simulator developed by Synopsys. It offers high-performance simulation and is widely used for complex designs and verification of ICs and FPGAs. Icarus Verilog : Icarus Verilog is a free and open-source simulator for Verilog designs. It offers fast and efficient simulations and supports both Verilog and SystemVerilog languages. Xilinx Vivado : Vivado is a popular Verilog simulator and synthesis tool developed by Xilinx (now part of AMD, which acquired Xilinx in 2022). It offers a comprehensive solution for designing and verifying complex digital circuits and systems. Quartus II : Quartus II is a popular Verilog simulator and synthesis tool developed by Intel (formerly Altera). It offers a comprehensive solution for designing, simulating, and implementing digital circuits and systems using Verilog and VHDL languages. Overall, the choice of Verilog simulator depends on the specific requirements of the design, such as simulation speed, complexity, and tool compatibility.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 6)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-6.v - Örnek Donanım Modülü",
          snippet: `module latch(input enable, input data, output reg q);
always @ (enable, data)
begin
    if(enable)
        q <= data;
end
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-6_tb.v - Simülasyon Testbench",
          snippet: `module flipflop(input clk, input data, output reg q);
always @(posedge clk) begin
    q <= data;
end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module latch(input enable, input data, output reg q);
always @ (enable, data)
begin
    if(enable)
        q <= data;
end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 6) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-7": {
    id: "verilog-interview-questions-set-7",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 7)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 7)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 7)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Verilog Mülakat Soruları ve Çözümleri (Soru Seti 7) Şeması](/images/verilog/dff_using_mux.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 7 Verilog Interview Questions Set 7 `,
      },
      {
        title: "4. Difference between $stop and $finish.",
        content: `$stop is used to suspend the simulation at the point where it is called, simulator license is not released and still runs as a process in host operating system. User has to restart it, typically by manually resuming the simulation from the paused point. $finish immediately terminates the simulation process and passes control back to the operating system, and license is released because simulation has exited. $stop is useful for debugging and inspection of intermediate results in the design, allowing designers to examine signals, waveforms, or variables at a specific point in execution, while $finish is used at the end of the simulation, indicating that the design has completed its operation.`,
      },
      {
        title: "5. Design frequency/2 circuit using D flip flop",
        content: `A frequency divider by 2 can be designed using a D flip-flop as follows: _________________ | ________ | | | | | '--->|D Q'|---' | | | Q |---- clk/2 |___^____| | clk _______| The input clock signal Clk is connected to the D input of the D flip-flop. The output of the flip-flop, Q, is connected back to the D input through an inverter to create a divide-by-2 circuit. When the clock rises from low to high, the D flip-flop captures the value of the D input and outputs it on Q. At the same time, the inverted output Q' feeds it back to the D input. Thus, the output Q changes state on every positive edge of the clock, resulting in a frequency that is half of the input frequency. Note that the input clock signal should have a duty cycle close to 50% to ensure reliable operation of the flip-flop. It is also important to ensure that the setup and hold times of the flip-flop are met to avoid timing errors.`,
      },
      {
        title: "6. What is $random in Verilog ?",
        content: `$random is a system task that generates a new 32-bit random integer on every call with a seed value of 0 by default. The optional seed value is used to specify the starting point for the random number generator, and if specified, $random generates the same sequence of random numbers every time it is called with the same seed value. It has the following syntax: $random(seed);`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 7)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-7.v - Örnek Donanım Modülü",
          snippet: `assign #5 a = b;`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-7_tb.v - Simülasyon Testbench",
          snippet: `initial
begin
    @(posedge clk) // This waits for a positive clock edge with a delay of 1 unit
    a = b;
    #2          // This introduces an inter-assignment delay of 2 time units
    a = c;
end`,
        },
      },
    ],
    playground: {
      initialCode: `assign #5 a = b;`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 7) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-8": {
    id: "verilog-interview-questions-set-8",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 8)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 8)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 8)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 8 Verilog Interview Questions Set 8 `,
      },
      {
        title: "3. Give the code for a mod-3 counter",
        content: `A modulo-3 counter has 3 states (0, 1, 2) and requires 2 flip-flops. module cntr_mod3 (input clk, rstn, output reg [1:0] out); always @(posedge clk) begin if (!rstn) out <= 0; else if (&out) out <= 0; else out <= out + 1; end endmodule`,
      },
      {
        title: "4. How can you override the existing parameter value?",
        content: `In Verilog, you can override the existing parameter value in two ways: In module instantiation module abc (input ..., output ...); parameter RESET_VAL = 4; endmodule module xyz (); abc u_abc #(.RESET_VAL (10)) ( ... ); endmodule Using defparam module abc (input ..., output ...); parameter RESET_VAL = 4; endmodule module xyz (); abc u_abc ( ... ); defparam u_abc.RESET_VAL = 10; endmodule Read more on Verilog Parameters .`,
      },
      {
        title: "5. What is Synthesis?",
        content: `Synthesis is the process of converting a high-level hardware description language (HDL) code, such as Verilog or VHDL, into a gate-level netlist that can be used for physical implementation of a digital circuit on an integrated circuit (IC) or field-programmable gate array (FPGA). The synthesis process involves analyzing the HDL code to determine the intended functionality of the circuit, optimizing the design for the desired performance and resource utilization, and generating a gate-level netlist that describes the circuit in terms of logic gates and flip-flops. The synthesis tool analyzes the HDL code and performs a series of transformations to optimize the design. This can involve simplifying logic expressions, removing redundant logic, optimizing resource usage, and mapping the design to a specific target technology, such as an FPGA or ASIC. The synthesis tool then generates a gate-level netlist that can be processed by other tools to perform place-and-route, to create a physical layout of the circuit, and finally to generate the programming files that can be used to program the target device. Read more on ASIC Design Flow .`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 8)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-8.v - Örnek Donanım Modülü",
          snippet: `module cntr_mod3 (input clk, rstn, output reg [1:0] out);
  always @(posedge clk) begin
    if (!rstn)
      out <= 0;
    else 
      if (&out)
        out <= 0;
      else
      	out <= out + 1;
  end 
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-8_tb.v - Simülasyon Testbench",
          snippet: `module abc (input ..., output ...);
  	parameter RESET_VAL = 4;
  endmodule
  
  module xyz ();
  	abc 	u_abc #(.RESET_VAL (10)) ( ... );
  endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module cntr_mod3 (input clk, rstn, output reg [1:0] out);
  always @(posedge clk) begin
    if (!rstn)
      out <= 0;
    else 
      if (&out)
        out <= 0;
      else
      	out <= out + 1;
  end 
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 8) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-9": {
    id: "verilog-interview-questions-set-9",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 9)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 9)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 9)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 9 Verilog Interview Questions Set 9 `,
      },
      {
        title: "3. What are all different applications of FIFO?",
        content: `FIFOs (First-In-First-Out) are used in a wide range of applications where data needs to be buffered or stored temporarily. Some of the most common applications of FIFOs include: Memory and data buffering : FIFOs are commonly used for buffering data in memory or I/O controllers to ensure a smooth flow of data between different systems or devices. Network routing and switching : In networking equipment such as routers and switches, FIFOs are used to store packets of data from different sources and route them to their destination in the correct order. Multimedia applications : In multimedia applications such as audio and video processing, FIFOs are used to buffer data streams to ensure smooth playback without any glitches or interruptions. Real-time applications : In real-time systems such as industrial automation and control systems, FIFOs are used to synchronize the flow of data and ensure that it is processed in real-time without any delays. Data acquisition : FIFOs are used in data acquisition systems to temporarily store data from sensors, ADCs, and other data sources before it is processed or transmitted. Graphics processing : In graphics processing units (GPUs), FIFOs are used to temporarily store data such as rendering commands and pixel data before it is processed and displayed on a screen. Overall, FIFOs have a wide range of applications in different fields where data needs to be stored and processed in a controlled and efficient manner.`,
      },
      {
        title: "4. How can you define strength in Verilog",
        content: `In Verilog, strength is a measure of the signal's electrical characteristics. It indicates how strongly the signal is driven or resisted by the driver. Verilog defines two types of signal strengths, which are: Charge Strength : This is used only with trireg nets and is used to model charge storage which specifies the relative size of the capacitance i.e. small, medium or large. Drive Strength : This indicates the strength of the logic values on the output terminals of the gate instance, and can be of strength1 specified by supply1 , strong1 , pull1 and weak1 or strength0 specified by supply0 , strong0 , pull0 and weak0 .`,
      },
      {
        title: "5. Design divide-by-5 module.",
        content: `A divide-by-5 module takes an input clock signal and produces an output that is 1/5th the frequency of the input signal. Design a mod-5 counter, and take the output from the flop that is high for 2 clocks and feed it to a negative edge triggered FF. Then do a logical OR of the delayed version with the original to get the required clock output. module clk_div5 (input clk, rstn, output clk50); wire clkA; reg clkB; reg [2:0] count; always @(posedge clk or negedge rstn) begin if (!rstn) count <= 0; else if (count == 4) count <= 0; else count <= count + 1; end assign clkA = count[1]; always@(negedge clk) clkB <= clkA; assign clk50 = clkA | clkB; endmodule`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 9)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-9.v - Örnek Donanım Modülü",
          snippet: `module clk_div5 (input clk, rstn, output clk50);
  wire clkA;
  reg clkB;
  reg [2:0] count;
  
  always @(posedge clk or negedge rstn) begin
    if (!rstn)
			count <= 0;
    else if (count == 4)
			count <= 0;
		else
			count <= count + 1;
  	end
  
	assign clkA = count[1];

	always@(negedge clk)
		clkB <= clkA;

	assign clk50 = clkA | clkB;
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-9_tb.v - Simülasyon Testbench",
          snippet: `module mux_5to1 (input [4:0] data, input [2:0] sel, output reg out);
  
  always @ (data, sel) begin
    case (sel)
      3'h0 		: out = data[0];
      3'h1 		: out = data[1];
      3'h2 		: out = data[2];
      3'h3 		: out = data[3];
      default 	: out = data[4];
    endcase
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module clk_div5 (input clk, rstn, output clk50);
  wire clkA;
  reg clkB;
  reg [2:0] count;
  
  always @(posedge clk or negedge rstn) begin
    if (!rstn)
			count <= 0;
    else if (count == 4)
			count <= 0;
		else
			count <= count + 1;
  	end
  
	assign clkA = count[1];

	always@(negedge clk)
		clkB <= clkA;

	assign clk50 = clkA | clkB;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 9) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-10": {
    id: "verilog-interview-questions-set-10",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 10)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 10)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 10)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 10 Verilog Interview Questions Set 10 `,
      },
      {
        title: "3. What logic is inferred when there are multiple assign statements targeting the same wire for synthesis ?",
        content: `The synthesis tool will give a syntax error for a wire that is an output port of a module if it is driven by more than one source. wire out; assign out = a & b; // Elsewhere in the code, another assign to // the same wire will cause multiple driver error assign out = a | b; However, it is okay to drive a 3-state wire by multiple assign statements. wire out; // sel1 and sel2 cannot be 1 at the same time assign out = sel1 ? a & b : 1'bz; assign out = sel2 ? a | b : 1'bz;`,
      },
      {
        title: "4. What do conditional assignments get inferred into?",
        content: `Conditional assignments ? : in Verilog get inferred into multiplexers during synthesis. A multiplexer selects one of a number of inputs based on the values of the select inputs. // Assign in0 to out if sel = 1 else in1 assign out = sel ? in0 : in1;`,
      },
      {
        title: "5. What is the logic that gets synthesized when conditional operators in a single continuous assignment are nested?",
        content: `In Verilog, when conditional operators in a single continuous assignment are nested, the synthesis tool will infer a hierarchy of multiplexers. assign out = sel1 ? (sel2 ? in3 : in4) : (sel3 ? in5 : in6); // Which is the same as wire net1, net2; assign net1 = sel2 ? in3 : in4; assign net2 = sel3 ? in5 : in6; assign out = sel1 ? net1 : net2;`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 10)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-10.v - Örnek Donanım Modülü",
          snippet: `wire out;

assign out = a & b; 

// Elsewhere in the code, another assign to 
// the same wire will cause multiple driver error
assign out = a | b;`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-10_tb.v - Simülasyon Testbench",
          snippet: `wire out;

// sel1 and sel2 cannot be 1 at the same time
assign out = sel1 ? a & b : 1'bz;
assign out = sel2 ? a | b : 1'bz;`,
        },
      },
    ],
    playground: {
      initialCode: `wire out;

assign out = a & b; 

// Elsewhere in the code, another assign to 
// the same wire will cause multiple driver error
assign out = a | b;`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 10) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-11": {
    id: "verilog-interview-questions-set-11",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 11)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 11)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 11)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
    ],
    playground: {
      initialCode: `// Verilog Mülakat Soruları ve Çözümleri (Soru Seti 11)
module verilog_interview_questions_set_11 (
    input wire clk,
    input wire rst_n,
    output wire out_sig
);
    assign out_sig = 1'b1;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 11) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-12": {
    id: "verilog-interview-questions-set-12",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 12)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 12)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 12)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 12 Verilog Interview Questions Set 12 `,
      },
      {
        title: "3. Explain the differences and advantages of casex and casez over the case statement?",
        content: `casex has to be used when both X and Z needs to be treated as don't care for comparisons with the case item. casez on the other hand only treats Z as don't care. casex (abc) 3'bx00 : out = a & b; // same as 3'b000 and 3'b100 3'b10x : out = a | b; // same as 3'b100 and 3'b101 default : out = ~(a & b); // for cases where bits in abc can be X or Z endcase Here are a couple of advantages: Synthesis optimization : casex and casez can be optimized more effectively by synthesis tools than the case statement. This is because casex and casez allow for more efficient encoding of the match conditions, reducing the number of gates required to implement the logic. Code readability : casex and casez can make Verilog code more readable and concise. This is because they allow for more complex matching logic to be expressed in a single statement, rather than requiring multiple if-else statements.`,
      },
      {
        title: "4. What are the differences between synchronous and asynchronous state machines?",
        content: `Synchronous state machines have a clock input that triggers state transitions at specific times. When the clock signal rises, the state machine updates its output values and transitions to the next state based on its current state and input values. Asynchronous state machines do not require a clock signal as they are triggered by input signals that are not synchronized in time. Each input signal can trigger a state transition at any time, independent of any clock signal. Asynchronous state machines can be more complex to design and test due to the possibility of race conditions and glitches, but they can be more efficient and consume less power compared to synchronous state machines.`,
      },
      {
        title: "5. Illustrate the differences between Mealy and Moore state machines.",
        content: `Mealy State Machine: Outputs are a function of both current state and inputs. Output may not be stable for one clock cycle as it is a function of input and current state. Output is prone to glitches. State transitions are based on both the current state and input signals. If inputs are not registered, combinational paths could potentially be larger than Moore machine, less operating frequency. Moore State Machine: Output is based solely on the current state Output is stable for one clock cycle. Output is not prone to glitches. State transitions are based solely on the current state. Combinational paths are typically shorter with no involvement of inputs.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 12)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-12.v - Örnek Donanım Modülü",
          snippet: `casex (abc)
	3'bx00  : out = a & b; 		// same as 3'b000 and 3'b100
	3'b10x  : out = a | b; 		// same as 3'b100 and 3'b101
	default : out = ~(a & b); 	// for cases where bits in abc can be X or Z
endcase`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-12_tb.v - Simülasyon Testbench",
          snippet: `// 4-bit variable to store 4 states in one-hot encoding
reg [3:0] cur_state, next_state;

case (1'b1)
	cur_state[0] : // Assign next state 
	cur_state[1] : // Assign next state
	cur_state[2] : // Assign next state
	cur_state[3] : // Assign next state
endcase`,
        },
      },
    ],
    playground: {
      initialCode: `casex (abc)
	3'bx00  : out = a & b; 		// same as 3'b000 and 3'b100
	3'b10x  : out = a | b; 		// same as 3'b100 and 3'b101
	default : out = ~(a & b); 	// for cases where bits in abc can be X or Z
endcase`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 12) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-13": {
    id: "verilog-interview-questions-set-13",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 13)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 13)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 13)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Interview Preparation Verilog Interview Questions Set 13 Verilog Interview Questions Set 13 `,
      },
      {
        title: "3. What are a few considerations while partitioning large designs?",
        content: `Size and complexity of the design : A large design will need to be partitioned into a number of smaller designs. This can affect how the design is divided into different sections and the size of each partition. Clock Domains : It is recommended to group logic belonging to same clock domain in a single block, and clock domain crossings done thorugh a synchronizer. Specific design requirements : Specific design requirements, such as timing or power constraints, will affect how the design is partitioned. Vendor's requirements : The vendor's requirements must also be considered as the partitioning of designs will be determined largely by their manufacturing capabilities.`,
      },
      {
        title: "4. How can I reliably convey control information across clock domains?",
        content: `Use a two-flop synchronizer : A two-flop synchronizer is a common technique used to safely transfer data between clock domains. It consists of two registers placed in series, one in each clock domain, to ensure reliable transfer of data across domains. Be aware of clock skew : Clock skew can occur between different clock domains and can adversely affect the timing of the control signal. To mitigate this, compensate for the clock skew by adding a delay buffer. Consider using asynchronous FIFOs : Asynchronous FIFOs are used to transfer data between clock domains that have different clock frequencies. By implementing flow control and arbitration logic, asynchronous FIFOs can help avoid data loss, blocking, or lock-up. Simulate and verify : Always simulate and verify the design with all possible corner-case scenarios to ensure that control information is reliably transferred across different clock domains.`,
      },
      {
        title: "5. What is a safe strategy to transfer data of different buswidths and across different clock domains?",
        content: `An asymmetrical FIFO is an ideal component for this purpose where the bus width between the write side and the read sides are different. Read more on Synchronous FIFO .`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 13)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-13.v - Örnek Donanım Modülü",
          snippet: `// A simple example shown below has output depedent on itself
// However, it can be complex with more logic in between but ultimately 
// feeding back to the same signal without any flops in between
assign out = out & in;`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-13_tb.v - Simülasyon Testbench",
          snippet: `// A normal sensitivity list should include all signals that affect output
always @ (a, b, c, d) begin
	out = (a & b) ^ (c | d);
end

// Use * to let tool automatically add such signals into the sensitivity list
always @ (*) begin
	out = (a & b) ^ (c | d);
end

// SystemVerilog has another keyword
always_comb begin
	out = (a & b) ^ (c | d);
end`,
        },
      },
    ],
    playground: {
      initialCode: `// A simple example shown below has output depedent on itself
// However, it can be complex with more logic in between but ultimately 
// feeding back to the same signal without any flops in between
assign out = out & in;`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 13) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-14": {
    id: "verilog-interview-questions-set-14",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 14)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 14)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 14)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
    ],
    playground: {
      initialCode: `// Verilog Mülakat Soruları ve Çözümleri (Soru Seti 14)
module verilog_interview_questions_set_14 (
    input wire clk,
    input wire rst_n,
    output wire out_sig
);
    assign out_sig = 1'b1;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 14) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-interview-questions-set-15": {
    id: "verilog-interview-questions-set-15",
    badge: "Bölüm 31 • Verilog Mülakat Soruları & Çözümleri",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 15)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 31: Verilog Mülakat Soruları & Çözümleri. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 15)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Verilog Mülakat Soruları ve Çözümleri (Soru Seti 15)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
    ],
    playground: {
      initialCode: `// Verilog Mülakat Soruları ve Çözümleri (Soru Seti 15)
module verilog_interview_questions_set_15 (
    input wire clk,
    input wire rst_n,
    output wire out_sig
);
    assign out_sig = 1'b1;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Verilog Mülakat Soruları ve Çözümleri (Soru Seti 15) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
};
