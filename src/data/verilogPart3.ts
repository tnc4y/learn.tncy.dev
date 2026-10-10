import { LessonContent } from "./lessonsData";

export const VERILOG_PART3: Record<string, LessonContent> = {
  "verilog-4-bit-counter": {
    id: "verilog-4-bit-counter",
    badge: "Bölüm 15 • Sayıcı Devreleri (Counters)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "4-Bit İleri/Geri Senkron Sayıcı (Counter) Tasarımı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 15: Sayıcı Devreleri (Counters). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **4-Bit İleri/Geri Senkron Sayıcı (Counter) Tasarımı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **4-Bit İleri/Geri Senkron Sayıcı (Counter) Tasarımı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![4-Bit İleri/Geri Senkron Sayıcı (Counter) Tasarımı Şeması](/images/verilog/4-bit_counter_1.png)

![4-Bit İleri/Geri Senkron Sayıcı (Counter) Tasarımı Şeması](/images/verilog/4-bit_counter_2.png)

![4-Bit İleri/Geri Senkron Sayıcı (Counter) Tasarımı Şeması](/images/verilog/4-bit-counter-wave.PNG)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Counters 4-bit counter 4-bit counter The 4-bit counter starts incrementing from 4'b0000 to 4'b1111 and then rolls over back to 4'b0000. It will keep counting as long as it is provided with a running clock and reset is held high. The rollover happens when the most significant bit of the final addition gets discarded. When counter is at a maximum value of 4'b1111 and gets one more count request, the counter tries to reach 5'b10000 but since it can support only 4-bits, the MSB will be discarded resulting in 0. 0000 0001 0010 ... 1110 1111 rolls over 0000 0001 ... The design contains two inputs one for the clock and another for an active-low reset. An active-low reset is one where the design is reset when the value of the reset pin is 0. There is a 4-bit output called out which essentially provides the counter values.`,
      },
      {
        title: "4. Electronic Counter Design",
        content: `module counter ( input clk, // Declare input port for clock to allow counter to count up input rstn, // Declare input port for reset to allow the counter to be reset to 0 when required output reg[3:0] out); // Declare 4-bit output port to get the counter values // This always block will be triggered at the rising edge of clk (0->1) // Once inside this block, it checks if the reset is 0, if yes then change out to zero // If reset is 1, then design should be allowed to count up, so increment counter always @ (posedge clk) begin if (! rstn) out <= 0; else out <= out + 1; end endmodule The module counter has a clock and active-low reset (denoted by n ) as inputs and the counter value as a 4-bit output. The always block is always executed whenever the clock transitions from 0 to 1 which signifies a rising edge or a positive edge. The output is incremented only if reset is held high or 1, achieved by the if-else block. If reset is found to be low at the positive edge of clock, then output is reset to a default value of 4'b0000.`,
      },
      {
        title: "5. Testbench",
        content: `We can instantiate the design into our testbench module to verify that the counter is counting as expected. The testbench module is named tb_counter and ports are not required since this is the top-module in simulation. However we do need to have internal variables to generate, store and drive clock and reset. For that purpose, we have declared two variables of type reg for clock and reset. We also need a wire type net to make the connection with the design's output, else it will default to a 1-bit scalar net. Clock is generated via always block which will give a period of 10 time units. The initial block is used to set initial values to our internal variables and drive the reset value to the design. The design is instantiated in the testbench and connected to our internal variables, so that it will get the values when we drive them from the testbench. We don't have any $display statements in our testbench and hence we will not see any message in the console. module tb_counter; reg clk; // Declare an internal TB variable called clk to drive clock to the design reg rstn; // Declare an internal TB variable called rstn to drive active low reset to design wire [3:0] out; // Declare a wire to connect to design output // Instantiate counter design and connect with Testbench variables counter c0 ( .clk (clk), .rstn (rstn), .out (out)); // Generate a clock that should be driven to design // This clock will flip its value every 5ns -> time period = 10ns -> freq = 100 MHz always #5 clk = ~clk; // This initial block forms the stimulus of the testbench initial begin // 1. Initialize testbench variables to 0 at start of simulation clk <= 0; rstn <= 0; // 2. Drive rest of the stimulus, reset is asserted in between #20 rstn <= 1; #80 rstn <= 0; #50 rstn <= 1; // 3. Finish the stimulus after 170ns #20 $finish; end endmodule Output ncsim> run [0ns] clk=0 rstn=0 out=0xx [5ns] clk=1 rstn=0 out=0x0 [10ns] clk=0 rstn=0 out=0x0 [15ns] clk=1 rstn=0 out=0x0 [20ns] clk=0 rstn=1 out=0x0 [25ns] clk=1 rstn=1 out=0x1 [30ns] clk=0 rstn=1 out=0x1 [35ns] clk=1 rstn=1 out=0x2 [40ns] clk=0 rstn=1 out=0x2 [45ns] clk=1 rstn=1 out=0x3 [50ns] clk=0 rstn=1 out=0x3 [55ns] clk=1 rstn=1 out=0x4 [60ns] clk=0 rstn=1 out=0x4 [65ns] clk=1 rstn=1 out=0x5 [70ns] clk=0 rstn=1 out=0x5 [75ns] clk=1 rstn=1 out=0x6 [80ns] clk=0 rstn=1 out=0x6 [85ns] clk=1 rstn=1 out=0x7 [90ns] clk=0 rstn=1 out=0x7 [95ns] clk=1 rstn=1 out=0x8 [100ns] clk=0 rstn=0 out=0x8 [105ns] clk=1 rstn=0 out=0x0 [110ns] clk=0 rstn=0 out=0x0 [115ns] clk=1 rstn=0 out=0x0 [120ns] clk=0 rstn=0 out=0x0 [125ns] clk=1 rstn=0 out=0x0 [130ns] clk=0 rstn=0 out=0x0 [135ns] clk=1 rstn=0 out=0x0 [140ns] clk=0 rstn=0 out=0x0 [145ns] clk=1 rstn=0 out=0x0 [150ns] clk=0 rstn=1 out=0x0 [155ns] clk=1 rstn=1 out=0x1 [160ns] clk=0 rstn=1 out=0x1 [165ns] clk=1 rstn=1 out=0x2 Simulation complete via $finish(1) at time 170 NS + 0 Note that the counter resets to 0 when the active-low reset becomes 0, and when reset is de-asserted at around 150ns, the counter starts counting from the next occurence of the positive edge of clock. `,
      },
      {
        title: "6. Hardware Schematic",
        content: ``,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **4-Bit İleri/Geri Senkron Sayıcı (Counter) Tasarımı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-4-bit-counter.v - Örnek Donanım Modülü",
          snippet: `module counter (  input clk,               // Declare input port for clock to allow counter to count up
                  input rstn,              // Declare input port for reset to allow the counter to be reset to 0 when required
                  output reg[3:0] out);    // Declare 4-bit output port to get the counter values

  // This always block will be triggered at the rising edge of clk (0->1)
  // Once inside this block, it checks if the reset is 0, if yes then change out to zero
  // If reset is 1, then design should be allowed to count up, so increment counter
  always @ (posedge clk) begin
    if (! rstn)
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
          caption: "verilog-4-bit-counter_tb.v - Simülasyon Testbench",
          snippet: `module tb_counter;
  reg clk;                     // Declare an internal TB variable called clk to drive clock to the design
  reg rstn;                    // Declare an internal TB variable called rstn to drive active low reset to design
  wire [3:0] out;              // Declare a wire to connect to design output

  // Instantiate counter design and connect with Testbench variables
  counter   c0 ( .clk (clk),
                 .rstn (rstn),
                 .out (out));

  // Generate a clock that should be driven to design
  // This clock will flip its value every 5ns -> time period = 10ns -> freq = 100 MHz
  always #5 clk = ~clk;

  // This initial block forms the stimulus of the testbench
  initial begin
    // 1. Initialize testbench variables to 0 at start of simulation
    clk <= 0;
    rstn <= 0;
    
    // 2. Drive rest of the stimulus, reset is asserted in between
    #20   rstn <= 1;                   
    #80   rstn <= 0;
    #50   rstn <= 1;
    
    // 3. Finish the stimulus after 170ns
    #20 $finish;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module counter (  input clk,               // Declare input port for clock to allow counter to count up
                  input rstn,              // Declare input port for reset to allow the counter to be reset to 0 when required
                  output reg[3:0] out);    // Declare 4-bit output port to get the counter values

  // This always block will be triggered at the rising edge of clk (0->1)
  // Once inside this block, it checks if the reset is 0, if yes then change out to zero
  // If reset is 1, then design should be allowed to count up, so increment counter
  always @ (posedge clk) begin
    if (! rstn)
      out <= 0;
    else 
      out <= out + 1;
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "4-Bit İleri/Geri Senkron Sayıcı (Counter) Tasarımı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-ripple-counter-dff": {
    id: "verilog-ripple-counter-dff",
    badge: "Bölüm 15 • Sayıcı Devreleri (Counters)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Dalgalı Asenkron Sayıcı (Ripple Counter) ve DFF Mimarisi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 15: Sayıcı Devreleri (Counters). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Dalgalı Asenkron Sayıcı (Ripple Counter) ve DFF Mimarisi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Dalgalı Asenkron Sayıcı (Ripple Counter) ve DFF Mimarisi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Dalgalı Asenkron Sayıcı (Ripple Counter) ve DFF Mimarisi Şeması](/images/verilog/ripple-counter.png)

![Dalgalı Asenkron Sayıcı (Ripple Counter) ve DFF Mimarisi Şeması](/images/verilog/ripple_counter_schematic.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Counters Verilog Ripple Counter Verilog Ripple Counter A ripple counter is an asynchronous counter in which all the flops except the first are clocked by the output of the preceding flop.`,
      },
      {
        title: "4. Design",
        content: `module dff ( input d, input clk, input rstn, output reg q, output qn); always @ (posedge clk or negedge rstn) if (!rstn) q <= 0; else q <= d; assign qn = ~q; endmodule module ripple ( input clk, input rstn, output [3:0] out); wire q0; wire qn0; wire q1; wire qn1; wire q2; wire qn2; wire q3; wire qn3; dff dff0 ( .d (qn0), .clk (clk), .rstn (rstn), .q (q0), .qn (qn0)); dff dff1 ( .d (qn1), .clk (q0), .rstn (rstn), .q (q1), .qn (qn1)); dff dff2 ( .d (qn2), .clk (q1), .rstn (rstn), .q (q2), .qn (qn2)); dff dff3 ( .d (qn3), .clk (q2), .rstn (rstn), .q (q3), .qn (qn3)); assign out = {qn3, qn2, qn1, qn0}; endmodule`,
      },
      {
        title: "5. Testbench",
        content: `module tb_ripple; reg clk; reg rstn; wire [3:0] out; ripple r0 ( .clk (clk), .rstn (rstn), .out (out)); always #5 clk = ~clk; initial begin rstn <= 0; clk <= 0; repeat (4) @ (posedge clk); rstn <= 1; repeat (25) @ (posedge clk); $finish; end endmodule `,
      },
      {
        title: "6. Quiz",
        content: `No quiz questions available for this article. &nbsp;&nbsp;Prev Article Next Article&nbsp;&nbsp;`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Dalgalı Asenkron Sayıcı (Ripple Counter) ve DFF Mimarisi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-ripple-counter-dff.v - Örnek Donanım Modülü",
          snippet: `module dff (   input d,
               input clk,
               input rstn,
               output reg q,
               output qn);
   always @ (posedge clk or negedge rstn)
      if (!rstn)
         q <= 0;
      else  
         q <= d;

   assign qn = ~q;
endmodule

module ripple ( input clk,
                input rstn,
                output [3:0] out);
   wire  q0;
   wire  qn0;
   wire  q1;
   wire  qn1;
   wire  q2;
   wire  qn2;
   wire  q3;
   wire  qn3;
   
   dff   dff0 ( .d (qn0), 
                .clk (clk),
                .rstn (rstn),
                .q (q0),
                .qn (qn0));

   dff   dff1 ( .d (qn1), 
                .clk (q0),
                .rstn (rstn),
                .q (q1),
                .qn (qn1));

   dff   dff2 ( .d (qn2), 
                .clk (q1),
                .rstn (rstn),
                .q (q2),
                .qn (qn2));

   dff   dff3 ( .d (qn3), 
                .clk (q2),
                .rstn (rstn),
                .q (q3),
                .qn (qn3));

   assign out = {qn3, qn2, qn1, qn0};

endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-ripple-counter-dff_tb.v - Simülasyon Testbench",
          snippet: `module tb_ripple;
   reg clk;
   reg rstn;
   wire [3:0] out;

   ripple r0   (  .clk (clk),
                  .rstn (rstn),
                  .out (out));

   always #5 clk = ~clk;

   initial begin
      rstn <= 0;
      clk <= 0;

      repeat (4) @ (posedge clk);
      rstn <= 1;

      repeat (25) @ (posedge clk);
      $finish;
   end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module dff (   input d,
               input clk,
               input rstn,
               output reg q,
               output qn);
   always @ (posedge clk or negedge rstn)
      if (!rstn)
         q <= 0;
      else  
         q <= d;

   assign qn = ~q;
endmodule

module ripple ( input clk,
                input rstn,
                output [3:0] out);
   wire  q0;
   wire  qn0;
   wire  q1;
   wire  qn1;
   wire  q2;
   wire  qn2;
   wire  q3;
   wire  qn3;
   
   dff   dff0 ( .d (qn0), 
                .clk (clk),
                .rstn (rstn),
                .q (q0),
                .qn (qn0));

   dff   dff1 ( .d (qn1), 
                .clk (q0),
                .rstn (rstn),
                .q (q1),
                .qn (qn1));

   dff   dff2 ( .d (qn2), 
                .clk (q1),
                .rstn (rstn),
                .q (q2),
                .qn (qn2));

   dff   dff3 ( .d (qn3), 
                .clk (q2),
                .rstn (rstn),
                .q (q3),
                .qn (qn3));

   assign out = {qn3, qn2, qn1, qn0};

endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Dalgalı Asenkron Sayıcı (Ripple Counter) ve DFF Mimarisi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-modn-counter": {
    id: "verilog-modn-counter",
    badge: "Bölüm 15 • Sayıcı Devreleri (Counters)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Mod-N Sayıcı Tasarımı ve Periyodik Kesme Darbesi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 15: Sayıcı Devreleri (Counters). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Mod-N Sayıcı Tasarımı ve Periyodik Kesme Darbesi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Mod-N Sayıcı Tasarımı ve Periyodik Kesme Darbesi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Counters Verilog Mod-N counter Verilog Mod-N counter `,
      },
      {
        title: "3. What Is a Mod-N Counter?",
        content: `If you've already worked with basic binary counters — circuits that count from 0 to 2^N − 1 and roll over — you've been using a specific case of a much broader concept. A Mod-N counter (short for modulo-N counter) is a counter that cycles through exactly N states before resetting back to zero. The value N is called the modulus of the counter. Binary counters are special cases of this: a 4-bit binary counter is a Mod-16 counter, and a 3-bit binary counter is a Mod-8 counter. But what makes Mod-N counters interesting — and what this article is really about — is the case where N is not a power of two. Mod-5, Mod-6, Mod-10, Mod-12, Mod-60: these are everywhere in real digital systems, and implementing them requires deliberate design choices that go beyond simply choosing a register width.`,
      },
      {
        title: "4. Counting Sequence",
        content: `The counting sequence of a Mod-N counter is simple to describe: the counter increments by 1 on each active clock edge, and when it reaches a count of N − 1, the very next clock edge resets it to 0. The full cycle is: 0 → 1 → 2 → 3 → ... → (N−1) → 0 → 1 → ... The counter visits exactly N distinct states per complete cycle. This is why the output frequency of a Mod-N counter, given an input clock of frequency f_clk, is: f_out = f_clk / N This frequency division property is arguably the most useful thing a Mod-N counter does. A Mod-10 counter driven by a 1 MHz clock produces an output pulse every 10 cycles — effectively a 100 kHz signal. That's the heartbeat of real-world timekeeping, baud rate generation, and clock management logic.`,
      },
      {
        title: "5. How to reset",
        content: `Since N is not always a power of two, the counter cannot simply "roll over" naturally. You have to force the reset yourself. There are two main architectural approaches to this, and understanding the difference between them is critical for any Verilog designer.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Mod-N Sayıcı Tasarımı ve Periyodik Kesme Darbesi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-modn-counter.v - Örnek Donanım Modülü",
          snippet: `module modN_ctr 
  # (parameter N = 10,
     parameter WIDTH = 4)
  
  ( input   clk,
    input   rstn,
   	output  reg[WIDTH-1:0] out);
 
  always @ (posedge clk) begin
    if (!rstn) begin
      out <= 0;
    end else begin
      if (out == N-1) 
        out <= 0;
      else
        out <= out + 1;
    end
  end
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-modn-counter_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  parameter N = 10;
  parameter WIDTH = 4;
  
  reg clk;
  reg rstn;
  wire [WIDTH-1:0] out;
  
  modN_ctr u0  ( 	.clk(clk),
                	.rstn(rstn),
                	.out(out));

  always #10 clk = ~clk;
  
  initial begin
    {clk, rstn} <= 0;
    
    $monitor ("T=%0t rstn=%0b out=0x%0h", $time, rstn, out);
    repeat(2) @ (posedge clk);
    rstn <= 1;
    
    repeat(20) @ (posedge clk);
    $finish;  
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module modN_ctr 
  # (parameter N = 10,
     parameter WIDTH = 4)
  
  ( input   clk,
    input   rstn,
   	output  reg[WIDTH-1:0] out);
 
  always @ (posedge clk) begin
    if (!rstn) begin
      out <= 0;
    end else begin
      if (out == N-1) 
        out <= 0;
      else
        out <= out + 1;
    end
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Mod-N Sayıcı Tasarımı ve Periyodik Kesme Darbesi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-ring-counter": {
    id: "verilog-ring-counter",
    badge: "Bölüm 15 • Sayıcı Devreleri (Counters)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Halka Sayıcı (Ring Counter) ve 1-Hot Durum Mantığı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 15: Sayıcı Devreleri (Counters). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Halka Sayıcı (Ring Counter) ve 1-Hot Durum Mantığı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Halka Sayıcı (Ring Counter) ve 1-Hot Durum Mantığı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Halka Sayıcı (Ring Counter) ve 1-Hot Durum Mantığı Şeması](/images/verilog/ring-counter.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Counters Verilog Ring Counter Verilog Ring Counter `,
      },
      {
        title: "4. What Is a Ring Counter?",
        content: `A ring counter is a closed-loop shift register — a chain of flip-flops connected end to end, where the output of the last flip-flop feeds directly back into the input of the first. On every clock edge, each flip-flop copies the value of its neighbor to the left, and the value that "falls off" the right end immediately reappears at the left end. There is no inverter in the feedback path, no XOR logic, no comparator — just a wire looping the last output back to the first input. The result of this simple architecture is elegant: a single active bit (a logic 1) circulates endlessly around the register like a ball rolling around a track, advancing one position per clock cycle. Every other bit in the register holds a 0. With N flip-flops, you get exactly N distinct output states, one for each position the active bit can occupy.`,
      },
      {
        title: "5. How It Works",
        content: `To understand how a ring counter behaves, let's trace a 4-bit example in detail. The register is initialized with a single 1 in the leftmost position: Clock Cycle Q3 Q2 Q1 Q0 Reset 1 0 0 0 1 0 1 0 0 2 0 0 1 0 3 0 0 0 1 4 (= Reset) 1 0 0 0 The single 1 marches from Q3 down to Q0, then wraps back to Q3 on the fourth clock edge. Four flip-flops, four states, period of four. The counter is called a Mod-N counter in one-hot encoding — with N flip-flops, you get N states, and at any given moment exactly one flip-flop holds a 1. That phrase — one-hot — is important and worth locking in. A one-hot encoding is any state representation where exactly one bit is active (high) at a time. Ring counters are the hardware embodiment of one-hot encoding, and one-hot state machines are a major topic in digital design that flows directly from understanding ring counters.`,
      },
      {
        title: "6. Shift Direction & Initialization",
        content: `A ring counter can shift in either direction depending on how you wire the flip-flops. Shifting right means each flip-flop at position i copies the value from position i+1 on the left; shifting left is the reverse. Both directions are valid designs and the choice typically depends on which direction makes the downstream decoding logic most convenient. Initialization is non-negotiable and more nuanced than it first appears. The ring counter must start with exactly one 1 in the register and all other positions at 0. If you power up the circuit and all flip-flops come up as 0 — which is entirely possible in real hardware — you have a pathological state: the all-zeros pattern will circulate forever and the counter produces no useful output at all. Similarly, if two or more 1s are present, they will all circulate and the one-hot property is broken.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Halka Sayıcı (Ring Counter) ve 1-Hot Durum Mantığı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-ring-counter.v - Örnek Donanım Modülü",
          snippet: `module ring_ctr  #(parameter WIDTH=4) 
  (  
	input clk,                
	input rstn,
  	output reg [WIDTH-1:0] out
  );    

  integer i;
 
  always @ (posedge clk) begin
      if (!rstn)
         out <= 1;
      else begin
        out[WIDTH-1] <= out[0];
        for (i = 0; i < WIDTH-1; i=i+1) begin
          out[i] <= out[i+1];
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
          caption: "verilog-ring-counter_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  parameter WIDTH = 4;
  
  reg clk;
  reg rstn;
  wire [WIDTH-1:0] out;
  
  ring_ctr 	u0 (.clk (clk),
                .rstn (rstn),
                .out (out));
  
  always #10 clk = ~clk;
  
  initial begin
    {clk, rstn} <= 0;

    $monitor ("T=%0t out=%b", $time, out);
    repeat (2) @(posedge clk);
    rstn <= 1;
    repeat (15) @(posedge clk);
    $finish;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module ring_ctr  #(parameter WIDTH=4) 
  (  
	input clk,                
	input rstn,
  	output reg [WIDTH-1:0] out
  );    

  integer i;
 
  always @ (posedge clk) begin
      if (!rstn)
         out <= 1;
      else begin
        out[WIDTH-1] <= out[0];
        for (i = 0; i < WIDTH-1; i=i+1) begin
          out[i] <= out[i+1];
        end
      end
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Halka Sayıcı (Ring Counter) ve 1-Hot Durum Mantığı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-johnson-counter": {
    id: "verilog-johnson-counter",
    badge: "Bölüm 15 • Sayıcı Devreleri (Counters)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Johnson (Möbius) Sayıcı ve 2N Durum Mimarisi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 15: Sayıcı Devreleri (Counters). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Johnson (Möbius) Sayıcı ve 2N Durum Mimarisi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Johnson (Möbius) Sayıcı ve 2N Durum Mimarisi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Johnson (Möbius) Sayıcı ve 2N Durum Mimarisi Şeması](/images/verilog/johnson-counter.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Counters Verilog Johnson Counter Verilog Johnson Counter `,
      },
      {
        title: "4. What is a Johnson Counter ?",
        content: `When you start learning digital design and Verilog, one of the first counters you'll encounter after basic binary counters is the Johnson counter — sometimes called a twisted ring counter or creeping code counter. It's an elegant circuit that punches above its weight in terms of usefulness, and understanding it builds solid intuition for sequential logic design. A Johnson counter is a type of shift register connected in a feedback loop, but with a twist — literally. Instead of feeding the output of the last flip-flop back to the first flip-flop directly (as in a standard ring counter), you feed back the inverted (complemented) output. This single inversion changes everything about how the circuit behaves.`,
      },
      {
        title: "5. The Ring Counter vs. The Johnson Counter",
        content: `Before diving deeper, it helps to contrast the Johnson counter with its close cousin, the ring counter. In a standard ring counter with N flip-flops, a single logic 1 bit circulates through the chain. The last flip-flop's output connects directly back to the first flip-flop's input. With 4 flip-flops, a ring counter cycles through 4 unique states before repeating. The Johnson counter takes that same chain of flip-flops but inverts the feedback signal. Instead of a 1 recirculating, a 1 gets shifted in from one end, fills all flip-flops with 1s, then a 0 starts to push through from the other end. The result is a sequence that visits 2N unique states — double what a plain ring counter of the same size can produce. This is the Johnson counter's superpower: you get more states out of fewer flip-flops.`,
      },
      {
        title: "6. How It Works: Step by Step",
        content: `Let's walk through a 4-bit Johnson counter to build up a clear picture. Assume all four flip-flops start at 0 (reset state). Here's the state sequence you'll see on each rising clock edge: Clock Cycle Q3 Q2 Q1 Q0 Reset 0 0 0 0 1 1 0 0 0 2 1 1 0 0 3 1 1 1 0 4 1 1 1 1 5 0 1 1 1 6 0 0 1 1 7 0 0 0 1 8 (= Reset) 0 0 0 0 What's happening here? On each clock cycle, the shift register moves all bits one position to the right. The new bit entering from the left is the inverted value of the rightmost bit (Q0). So when Q0 is 0, a 1 gets inserted on the left. When Q0 eventually becomes 1, a 0 gets inserted. The result: 1s march in from the left, filling up the register, then 0s march in, clearing it out — before the whole cycle repeats. Eight unique states, with only four flip-flops.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Johnson (Möbius) Sayıcı ve 2N Durum Mimarisi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-johnson-counter.v - Örnek Donanım Modülü",
          snippet: `module johnson_ctr #(parameter WIDTH=4) 
  (  
	input clk,                
	input rstn,
  	output reg [WIDTH-1:0] out
  );

  reg [$clog2(WIDTH):0] i;
 
  always @ (posedge clk) begin
      if (!rstn)
         out <= 1;
      else begin
        out[WIDTH-1] <= ~out[0];
        for (i = 0; i < WIDTH-1; i=i+1) begin
          out[i] <= out[i+1];
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
          caption: "verilog-johnson-counter_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  parameter WIDTH = 4;
  
  reg clk;
  reg rstn;
  wire [WIDTH-1:0] out;
  
  johnson_ctr 	u0 (.clk (clk),
                .rstn (rstn),
                .out (out));
  
  always #10 clk = ~clk;
  
  initial begin
    {clk, rstn} <= 0;

    $monitor ("T=%0t out=%b", $time, out);
    repeat (2) @(posedge clk);
    rstn <= 1;
    repeat (15) @(posedge clk);
    $finish;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module johnson_ctr #(parameter WIDTH=4) 
  (  
	input clk,                
	input rstn,
  	output reg [WIDTH-1:0] out
  );

  reg [$clog2(WIDTH):0] i;
 
  always @ (posedge clk) begin
      if (!rstn)
         out <= 1;
      else begin
        out[WIDTH-1] <= ~out[0];
        for (i = 0; i < WIDTH-1; i=i+1) begin
          out[i] <= out[i+1];
        end
      end
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Johnson (Möbius) Sayıcı ve 2N Durum Mimarisi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-gray-counter": {
    id: "verilog-gray-counter",
    badge: "Bölüm 15 • Sayıcı Devreleri (Counters)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Gray Kodlu Sayıcı ve Saat Bölgesi Geçişleri (CDC)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 15: Sayıcı Devreleri (Counters). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Gray Kodlu Sayıcı ve Saat Bölgesi Geçişleri (CDC)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Gray Kodlu Sayıcı ve Saat Bölgesi Geçişleri (CDC)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `Counters Verilog Gray Counter Verilog Gray Counter `,
      },
      {
        title: "3. What is a Gray Counter ?",
        content: `Sometimes called a reflected binary counter or simply a Gray code counter - it's one of those circuits that seems almost magical at first: a counter that counts through all 2^N states like a binary counter, but with a crucial twist — only a single bit changes with every clock cycle.`,
      },
      {
        title: "4. The Problem Gray Code Solves",
        content: `Before understanding the Gray counter, you need to understand the problem it was invented to fix: transition glitches in binary counters. Take a standard 3-bit binary counter. At some point, it needs to transition from 011 (decimal 3) to 100 (decimal 4). All three bits change simultaneously: bit 0 goes from 1 to 0, bit 1 goes from 1 to 0, and bit 2 goes from 0 to 1. In theory, all three flip-flops update at the same clock edge and everything is fine. In practice, however, real flip-flops and gates have slightly different propagation delays. Those three bits don't switch at exactly the same instant — one might change a few picoseconds before another. In that tiny window of time, the counter output passes through intermediate states that were never intended. For example, during the 011 → 100 transition, you might briefly see 111 or 000 or 110 flicker through for nanoseconds. If any combinational logic is watching the counter output — a decoder, a state machine, a multiplexer — it may react to those ghost states and produce unwanted glitches: spurious pulses, incorrect outputs, or in worst cases, actual functional errors. In high-speed or noise-sensitive designs, this is a serious problem. The Gray counter solves this completely by ensuring that no matter what transition occurs, only one bit ever changes at a time. With only one bit changing, there are no intermediate states, no ghost codes, and no glitches. Click here to read more on Gray Code !`,
      },
      {
        title: "5. Asynchronous FIFOs (the most important use case)",
        content: `This is the application you'll encounter most often in advanced digital design. An asynchronous FIFO is a memory buffer that has a write port clocked by one clock domain and a read port clocked by a different, asynchronous clock domain. The challenge is safely passing the read and write pointers across the clock domain boundary. Passing a binary counter across clock domains is dangerous. If the counter transitions from 0111 to 1000 (a 4-bit change) and the receiving clock samples it in the middle of the transition, it may read an entirely wrong value, causing the FIFO to malfunction. Since only one bit changes in Gray code, even if the receiving clock samples at an unfortunate moment, it will read either the old value or the new value — never a corrupted intermediate. Gray pointers in async FIFOs are so standard that you'll almost never see a properly designed async FIFO using binary pointers.`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Gray Kodlu Sayıcı ve Saat Bölgesi Geçişleri (CDC)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-gray-counter.v - Örnek Donanım Modülü",
          snippet: `module gray_ctr
  # (parameter N = 4)
  
  (	input 	clk,
	input 	rstn,
	output reg [N-1:0] out);
  
	reg [N-1:0] q; 	 	
  
	always @ (posedge clk) begin
		if (!rstn) begin
    	q <= 0;
    		out <= 0;
      end else begin
  		q <= q + 1;
        
\`ifdef FOR_LOOP          
    	for (int i = 0; i < N-1; i= i+1) begin
      	out[i] <= q[i+1] ^ q[i];
    	end
    	out[N-1] <= q[N-1];
\`else
			out <= {q[N-1], q[N-1:1] ^ q[N-2:0]};
\`endif
    end
	end
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-gray-counter_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  parameter N = 4;
  
  reg clk;
  reg rstn;
  wire [N-1:0] out;
  
  gray_ctr u0 (	.clk(clk),
               .rstn(rstn),
               .out(out));
  
  always #10 clk = ~clk;
  
  initial begin
    {clk, rstn} <= 0;
    
    $monitor ("T=%0t rstn=%0b out=0x%0h", $time, rstn, out);
    
    repeat(2) @ (posedge clk);
    rstn <= 1;
    repeat(20) @ (posedge clk);
    $finish;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module gray_ctr
  # (parameter N = 4)
  
  (	input 	clk,
	input 	rstn,
	output reg [N-1:0] out);
  
	reg [N-1:0] q; 	 	
  
	always @ (posedge clk) begin
		if (!rstn) begin
    	q <= 0;
    		out <= 0;
      end else begin
  		q <= q + 1;
        
\`ifdef FOR_LOOP          
    	for (int i = 0; i < N-1; i= i+1) begin
      	out[i] <= q[i+1] ^ q[i];
    	end
    	out[N-1] <= q[N-1];
\`else
			out <= {q[N-1], q[N-1:1] ^ q[N-2:0]};
\`endif
    end
	end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Gray Kodlu Sayıcı ve Saat Bölgesi Geçişleri (CDC) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-n-bit-shift-register": {
    id: "verilog-n-bit-shift-register",
    badge: "Bölüm 16 • Kaydırmalı Kaydediciler (Shift Registers)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "N-Bit Çift Yönlü Kaydırmalı Kaydedici (Shift Register)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 16: Kaydırmalı Kaydediciler (Shift Registers). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **N-Bit Çift Yönlü Kaydırmalı Kaydedici (Shift Register)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **N-Bit Çift Yönlü Kaydırmalı Kaydedici (Shift Register)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![N-Bit Çift Yönlü Kaydırmalı Kaydedici (Shift Register) Şeması](/images/verilog/shift-register.png)

![N-Bit Çift Yönlü Kaydırmalı Kaydedici (Shift Register) Şeması](/images/verilog/8b_shift_register_schematic.png)

![N-Bit Çift Yönlü Kaydırmalı Kaydedici (Shift Register) Şeması](/images/verilog/n-bit-shift-register-tb.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Shift Registers Verilog n-bit Bidirectional Shift Register Verilog n-bit Bidirectional Shift Register In digital electronics, a shift register is a cascade of flip-flops where the output pin q of one flop is connected to the data input pin (d) of the next. Because all flops work on the same clock, the bit array stored in the shift register will shift by one position. For example, if a 5-bit right shift register has an initial value of 10110 and the input to the shift register is tied to 0, then the next pattern will be 01011 and the next 00101.`,
      },
      {
        title: "4. Design",
        content: `This shift register design has five inputs and one n-bit output and the design is parameterized using parameter MSB to signify width of the shift register. If n is 4, then it becomes a 4-bit shift register. If n is 8, then it becomes an 8-bit shift register. This shift register has a few key features: Can be enabled or disbled by driving en pin of the design Can shift to the left as well as right when dir is driven If rstn is pulled low, it will reset the shift register and output will become 0 Input data value of the shift register can be controlled by d pin module shift_reg #(parameter MSB=8) ( input d, // Declare input for data to the first flop in the shift register input clk, // Declare input for clock to all flops in the shift register input en, // Declare input for enable to switch the shift register on/off input dir, // Declare input to shift in either left or right direction input rstn, // Declare input to reset the register to a default value output reg [MSB-1:0] out); // Declare output to read out the current value of all flops in this register // This always block will "always" be triggered on the rising edge of clock // Once it enters the block, it will first check to see if reset is 0 and if yes then reset register // If no, then check to see if the shift register is enabled // If no => maintain previous output. If yes, then shift based on the requested direction always @ (posedge clk) if (!rstn) out <= 0; else begin if (en) case (dir) 0 : out <= {out[MSB-2:0], d}; 1 : out <= {d, out[MSB-1:1]}; endcase else out <= out; end endmodule`,
      },
      {
        title: "5. Testbench",
        content: `The testbench is used to verify the functionality of this shift register. The design is instantiated into the top module and the inputs are driven with different values. The design behavior for each of the inputs can be observed at the output pin out . module tb_sr; parameter MSB = 16; // [Optional] Declare a parameter to represent number of bits in shift register reg data; // Declare a variable to drive d-input of design reg clk; // Declare a variable to drive clock to the design reg en; // Declare a variable to drive enable to the design reg dir; // Declare a variable to drive direction of shift registe reg rstn; // Declare a variable to drive reset to the design wire [MSB-1:0] out; // Declare a wire to capture output from the design // Instantiate design (16-bit shift register) by passing MSB and connect with TB signals shift_reg #(MSB) sr0 ( .d (data), .clk (clk), .en (en), .dir (dir), .rstn (rstn), .out (out)); // Generate clock time period = 20ns, freq => 50MHz always #10 clk = ~clk; // Initialize variables to default values at time 0 initial begin clk <= 0; en <= 0; dir <= 0; rstn <= 0; data <= 'h1; end // Drive main stimulus to the design to verify if this works initial begin // 1. Apply reset and deassert reset after some time rstn <= 0; #20 rstn <= 1; en <= 1; // 2. For 7 clocks, drive alternate values to data pin repeat (7) @ (posedge clk) data <= ~data; // 4. Shift direction and drive alternate value to data pin for another 7 clocks #10 dir <= 1; repeat (7) @ (posedge clk) data <= ~data; // 5. Drive nothing for next 7 clocks, allow shift register to simply shift based on dir repeat (7) @ (posedge clk); // 6. Finish the simulation $finish; end // Monitor values of these variables and print them into the logfile for debug initial $monitor ("rstn=%0b data=%b, en=%0b, dir=%0b, out=%b", rstn, data, en, dir, out); endmodule The time when shift register is enabled is highlighted in green in the log given below. The time when it shifts its direction is highlighted in yellow. The time when data input pin remains constant is highlighted in blue. Output ncsim> run rstn=0 data=1, en=0, dir=0, out=xxxxxxxxxxxxxxxx rstn=0 data=1, en=0, dir=0, out=0000000000000000 rstn=1 data=1, en=1, dir=0, out=0000000000000000 rstn=1 data=0, en=1, dir=0, out=0000000000000001 rstn=1 data=1, en=1, dir=0, out=0000000000000010 rstn=1 data=0, en=1, dir=0, out=0000000000000101 rstn=1 data=1, en=1, dir=0, out=0000000000001010 rstn=1 data=0, en=1, dir=0, out=0000000000010101 rstn=1 data=1, en=1, dir=0, out=0000000000101010 rstn=1 data=0, en=1, dir=0, out=0000000001010101 rstn=1 data=0, en=1, dir=1, out=0000000001010101 rstn=1 data=1, en=1, dir=1, out=0000000000101010 rstn=1 data=0, en=1, dir=1, out=1000000000010101 rstn=1 data=1, en=1, dir=1, out=0100000000001010 rstn=1 data=0, en=1, dir=1, out=1010000000000101 rstn=1 data=1, en=1, dir=1, out=0101000000000010 rstn=1 data=0, en=1, dir=1, out=1010100000000001 rstn=1 data=1, en=1, dir=1, out=0101010000000000 rstn=1 data=1, en=1, dir=1, out=1010101000000000 rstn=1 data=1, en=1, dir=1, out=1101010100000000 rstn=1 data=1, en=1, dir=1, out=1110101010000000 rstn=1 data=1, en=1, dir=1, out=1111010101000000 rstn=1 data=1, en=1, dir=1, out=1111101010100000 rstn=1 data=1, en=1, dir=1, out=1111110101010000 Simulation complete via $finish(1) at time 430 NS + 0  `,
      },
      {
        title: "6. Quiz",
        content: `No quiz questions available for this article. &nbsp;&nbsp;Prev Article Next Article&nbsp;&nbsp;`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **N-Bit Çift Yönlü Kaydırmalı Kaydedici (Shift Register)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-n-bit-shift-register.v - Örnek Donanım Modülü",
          snippet: `module shift_reg  #(parameter MSB=8) (  input d,                      // Declare input for data to the first flop in the shift register
                                        input clk,                    // Declare input for clock to all flops in the shift register
                                        input en,                     // Declare input for enable to switch the shift register on/off
                                        input dir,                    // Declare input to shift in either left or right direction
                                        input rstn,                   // Declare input to reset the register to a default value
                                        output reg [MSB-1:0] out);    // Declare output to read out the current value of all flops in this register


   // This always block will "always" be triggered on the rising edge of clock
   // Once it enters the block, it will first check to see if reset is 0 and if yes then reset register
   // If no, then check to see if the shift register is enabled
   // If no => maintain previous output. If yes, then shift based on the requested direction
   always @ (posedge clk)
      if (!rstn)
         out <= 0;
      else begin
         if (en)
            case (dir)
               0 :  out <= {out[MSB-2:0], d};
               1 :  out <= {d, out[MSB-1:1]};
            endcase
         else
            out <= out;
      end
endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-n-bit-shift-register_tb.v - Simülasyon Testbench",
          snippet: `module tb_sr;
   parameter MSB = 16;        // [Optional] Declare a parameter to represent number of bits in shift register

   reg data;                  // Declare a variable to drive d-input of design
   reg clk;                   // Declare a variable to drive clock to the design
   reg en;                    // Declare a variable to drive enable to the design
   reg dir;                   // Declare a variable to drive direction of shift registe
   reg rstn;                  // Declare a variable to drive reset to the design
   wire [MSB-1:0] out;        // Declare a wire to capture output from the design

   // Instantiate design (16-bit shift register) by passing MSB and connect with TB signals
   shift_reg  #(MSB) sr0  (  .d (data),
                             .clk (clk),
                             .en (en),
                             .dir (dir),
                             .rstn (rstn),
                             .out (out));

   // Generate clock time period = 20ns, freq => 50MHz
   always #10 clk = ~clk;

   // Initialize variables to default values at time 0
   initial begin
      clk <= 0;
      en <= 0;
      dir <= 0;
      rstn <= 0;
      data <= 'h1;
   end

   // Drive main stimulus to the design to verify if this works
   initial begin
   
      // 1. Apply reset and deassert reset after some time
      rstn <= 0;
      #20 rstn <= 1;
          en <= 1;
          
	  // 2. For 7 clocks, drive alternate values to data pin
      repeat (7) @ (posedge clk)
         data <= ~data;
   
     // 4. Shift direction and drive alternate value to data pin for another 7 clocks
      #10 dir <= 1;
      repeat (7) @ (posedge clk)
         data <= ~data;

      // 5. Drive nothing for next 7 clocks, allow shift register to simply shift based on dir
      repeat (7) @ (posedge clk);
      
      // 6. Finish the simulation
      $finish;
   end

   // Monitor values of these variables and print them into the logfile f
// ... (testbench devamı)`,
        },
      },
    ],
    playground: {
      initialCode: `module shift_reg  #(parameter MSB=8) (  input d,                      // Declare input for data to the first flop in the shift register
                                        input clk,                    // Declare input for clock to all flops in the shift register
                                        input en,                     // Declare input for enable to switch the shift register on/off
                                        input dir,                    // Declare input to shift in either left or right direction
                                        input rstn,                   // Declare input to reset the register to a default value
                                        output reg [MSB-1:0] out);    // Declare output to read out the current value of all flops in this register


   // This always block will "always" be triggered on the rising edge of clock
   // Once it enters the block, it will first check to see if reset is 0 and if yes then reset register
   // If no, then check to see if the shift register is enabled
   // If no => maintain previous output. If yes, then shift based on the requested direction
   always @ (posedge clk)
      if (!rstn)
         out <= 0;
      else begin
         if (en)
            case (dir)
               0 :  out <= {out[MSB-2:0], d};
               1 :  out <= {d, out[MSB-1:1]};
            endcase
         else
            out <= out;
      end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "N-Bit Çift Yönlü Kaydırmalı Kaydedici (Shift Register) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-fsm": {
    id: "verilog-fsm",
    badge: "Bölüm 17 • Sonlu Durum Makineleri (FSM: Mealy & Moore)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Sonlu Durum Makineleri (FSM: Mealy ve Moore Standart Kodlama)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 17: Sonlu Durum Makineleri (FSM: Mealy & Moore). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Sonlu Durum Makineleri (FSM: Mealy ve Moore Standart Kodlama)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Sonlu Durum Makineleri (FSM: Mealy ve Moore Standart Kodlama)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Sonlu Durum Makineleri (FSM: Mealy ve Moore Standart Kodlama) Şeması](/images/verilog/verilog-fsm.svg)

![Sonlu Durum Makineleri (FSM: Mealy ve Moore Standart Kodlama) Şeması](/images/verilog/verilog-fsm-elab.jpg)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `State Machines Verilog FSM Verilog FSM `,
      },
      {
        title: "4. Types of FSMs",
        content: `There are two classifications of state machines based on the nature of their output generation: Moore : In this type, the outputs depend solely on the current state. Mealy : In contrast, this type generates one or more outputs that are influenced by both the current state and one or more inputs. Beyond categorizing state machines by their output generation methods, they are also frequently classified based on the state encoding used. State encoding refers to how the different states of a state machine are represented in binary form. Binary : Each state is represented using standard binary numbers (e.g., 00, 01, 10, 11). One-Hot : Each state is represented by a binary vector where only one bit is '1' (hot) and all others are '0'.`,
      },
      {
        title: "5. Verilog FSM Structure",
        content: `FSMs in Verilog can be written in either a single always block or two always blocks. The two always block method is most recommended for its straightforward structure and ease of understanding and consists of: A sequential or clocked always block for present state logic A combinational always block for next state logic Output assignments can be handled in two ways: Included within the combinational next-state always block Implemented as separate continuous assignments`,
      },
      {
        title: "6. Sequential Always Block",
        content: `Note that the state of a finite state machine (FSM) changes only at the clock edge. always @ (posedge clk) begin // If reset is asserted, go back to IDLE state if (! resetn) begin cur_state <= IDLE; // Else transition to the next state end else begin cur_state <= next_state; end end Always use only non-blocking assignments in the sequential always block ! Verilog nonblocking assignments emulate the behavior of pipelined registers found in actual hardware, effectively reducing the likelihood of race conditions in Verilog.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Sonlu Durum Makineleri (FSM: Mealy ve Moore Standart Kodlama)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-fsm.v - Örnek Donanım Modülü",
          snippet: `always @ (posedge clk) begin
  // If reset is asserted, go back to IDLE state
  if (! resetn) begin
    cur_state <= IDLE;

  // Else transition to the next state
  end else begin 
    cur_state <= next_state;
  end 
end`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-fsm_tb.v - Simülasyon Testbench",
          snippet: `// Combinational always block for next state logic
always @(*) begin
    // Default next state assignment
    next_state = IDLE; 

    case (state)
        IDLE: begin
                if (input_signal) 
                  next_state = STATE_1; // Transition to STATE_1 on input_signal
              end
        
        STATE_1:  begin
                    if (!input_signal) 
                      next_state = STATE_2; // Transition to STATE_2 if input_signal is low
                  end
        
        STATE_2:  next_state = IDLE; // Transition back to IDLE        
        default:  next_state = IDLE; // Fallback to default state
    endcase
end`,
        },
      },
    ],
    playground: {
      initialCode: `always @ (posedge clk) begin
  // If reset is asserted, go back to IDLE state
  if (! resetn) begin
    cur_state <= IDLE;

  // Else transition to the next state
  end else begin 
    cur_state <= next_state;
  end 
end`,
      language: "verilog",
    },
    quiz: {
      question: "Sonlu Durum Makineleri (FSM: Mealy ve Moore Standart Kodlama) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-sequence-detector": {
    id: "verilog-sequence-detector",
    badge: "Bölüm 17 • Sonlu Durum Makineleri (FSM: Mealy & Moore)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "FSM ile Dizi Algılayıcı (Sequence Detector: 1011 Algılama)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 17: Sonlu Durum Makineleri (FSM: Mealy & Moore). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **FSM ile Dizi Algılayıcı (Sequence Detector: 1011 Algılama)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **FSM ile Dizi Algılayıcı (Sequence Detector: 1011 Algılama)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `State Machines Verilog Sequence Detector Verilog Sequence Detector A very common example of an FSM is that of a sequence detector where the hardware design is expected to detect when a fixed pattern is seen in a stream of binary bits that are input to it.`,
      },
      {
        title: "3. Example",
        content: `module det_1011 ( input clk, input rstn, input in, output out ); parameter IDLE = 0, S1 = 1, S10 = 2, S101 = 3, S1011 = 4; reg [2:0] cur_state, next_state; assign out = cur_state == S1011 ? 1 : 0; always @ (posedge clk) begin if (!rstn) cur_state <= IDLE; else cur_state <= next_state; end always @ (cur_state or in) begin case (cur_state) IDLE : begin if (in) next_state = S1; else next_state = IDLE; end S1: begin if (in) next_state = IDLE; else next_state = S10; end S10 : begin if (in) next_state = S101; else next_state = IDLE; end S101 : begin if (in) next_state = S1011; else next_state = IDLE; end S1011: begin next_state = IDLE; end endcase end endmodule`,
      },
      {
        title: "4. Testbench",
        content: `module tb; reg clk, in, rstn; wire out; reg [1:0] l_dly; reg tb_in; integer i; integer loop = 1; always #10 clk = ~clk; det_1011 u0 ( .clk(clk), .rstn(rstn), .in(in), .out(out) ); initial begin clk <= 0; rstn <= 0; in <= 0; repeat (5) @ (posedge clk); rstn <= 1; // Generate a directed pattern @(posedge clk) in <= 1; @(posedge clk) in <= 0; @(posedge clk) in <= 1; @(posedge clk) in <= 1; // Pattern is completed @(posedge clk) in <= 0; @(posedge clk) in <= 0; @(posedge clk) in <= 1; @(posedge clk) in <= 1; @(posedge clk) in <= 0; @(posedge clk) in <= 1; @(posedge clk) in <= 1; // Pattern completed again // Or random stimulus using a for loop that drives a random // value of input N times for (i = 0 ; i < loop; i = i + 1) begin l_dly = $random; repeat (l_dly) @ (posedge clk); tb_in = $random; in <= tb_in; end // Wait for sometime before quitting simulation #100 $finish; end endmodule Output ncsim> run T=10 in=0 out=0 T=30 in=0 out=0 T=50 in=0 out=0 T=70 in=0 out=0 T=90 in=0 out=0 T=110 in=1 out=0 T=130 in=0 out=0 T=150 in=1 out=0 T=170 in=1 out=0 T=190 in=0 out=1 T=210 in=0 out=0 T=230 in=1 out=0 T=250 in=1 out=0 T=270 in=0 out=0 T=290 in=1 out=0 T=310 in=1 out=0 T=330 in=1 out=1 T=350 in=1 out=0 T=370 in=1 out=0 T=390 in=1 out=0 Simulation complete via $finish(1) at time 410 NS + 0 There is a bug in the design. Can you find it ?  `,
      },
      {
        title: "5. Quiz",
        content: `No quiz questions available for this article. &nbsp;&nbsp;Prev Article Next Article&nbsp;&nbsp;`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **FSM ile Dizi Algılayıcı (Sequence Detector: 1011 Algılama)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-sequence-detector.v - Örnek Donanım Modülü",
          snippet: `module det_1011 ( input clk,
                  input rstn,
                  input in,
                  output out );
  
  parameter IDLE 	= 0,
  			S1 		= 1,
  			S10 	= 2,
  			S101 	= 3,
  			S1011 	= 4;
  
  reg [2:0] cur_state, next_state;
  
  assign out = cur_state == S1011 ? 1 : 0;
  
  always @ (posedge clk) begin
    if (!rstn)
      	cur_state <= IDLE;
     else 
     	cur_state <= next_state;
  end
  
  always @ (cur_state or in) begin
    case (cur_state)
      IDLE : begin
        if (in) next_state = S1;
        else next_state = IDLE;
      end
      
      S1: begin
        if (in) next_state = IDLE;
        else 	next_state = S10;
      end
      
      S10 : begin
        if (in) next_state = S101;
        else 	next_state = IDLE;
      end
      
      S101 : begin
        if (in) next_state = S1011;
        else 	next_state = IDLE;
      end
      
      S1011: begin
        next_state = IDLE;
      end
    endcase
  end
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-sequence-detector_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg 			clk, in, rstn;
  wire 			out;
  reg [1:0] l_dly;
  reg 			tb_in;
  integer 	i;
  integer 	loop = 1;
  
  always #10 clk = ~clk;
  
  det_1011 u0 ( .clk(clk), .rstn(rstn), .in(in), .out(out) );
  
  initial begin
  	clk <= 0;
    rstn <= 0;
    in <= 0;
    
    repeat (5) @ (posedge clk);
    rstn <= 1;

		// Generate a directed pattern
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 0;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 1; 		// Pattern is completed
    @(posedge clk) in <= 0;
    @(posedge clk) in <= 0;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 0;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 1; 	 // Pattern completed again
    
    // Or random stimulus using a for loop that drives a random
    // value of input N times
    for (i = 0 ; i < loop; i = i + 1) begin
      l_dly = $random;
      repeat (l_dly) @ (posedge clk);
      tb_in = $random;
      in <= tb_in;
    end
    
    // Wait for sometime before quitting simulation
    #100 $finish;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module det_1011 ( input clk,
                  input rstn,
                  input in,
                  output out );
  
  parameter IDLE 	= 0,
  			S1 		= 1,
  			S10 	= 2,
  			S101 	= 3,
  			S1011 	= 4;
  
  reg [2:0] cur_state, next_state;
  
  assign out = cur_state == S1011 ? 1 : 0;
  
  always @ (posedge clk) begin
    if (!rstn)
      	cur_state <= IDLE;
     else 
     	cur_state <= next_state;
  end
  
  always @ (cur_state or in) begin
    case (cur_state)
      IDLE : begin
        if (in) next_state = S1;
        else next_state = IDLE;
      end
      
      S1: begin
        if (in) next_state = IDLE;
        else 	next_state = S10;
      end
      
      S10 : begin
        if (in) next_state = S101;
        else 	next_state = IDLE;
      end
      
      S101 : begin
        if (in) next_state = S1011;
        else 	next_state = IDLE;
      end
      
      S1011: begin
        next_state = IDLE;
      end
    endcase
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "FSM ile Dizi Algılayıcı (Sequence Detector: 1011 Algılama) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-pattern-detector": {
    id: "verilog-pattern-detector",
    badge: "Bölüm 17 • Sonlu Durum Makineleri (FSM: Mealy & Moore)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Kayan Pencere ile Desen Dedektörü Devresi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 17: Sonlu Durum Makineleri (FSM: Mealy & Moore). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Kayan Pencere ile Desen Dedektörü Devresi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Kayan Pencere ile Desen Dedektörü Devresi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Genel Bakış & Giriş",
        content: `State Machines Verilog Pattern Detector Verilog Pattern Detector A previous example explored a simple sequence detector. Here is another example for a pattern detector which detects a slightly longer pattern.`,
      },
      {
        title: "3. Design",
        content: `module det_110101 ( input clk, input rstn, input in, output out ); parameter IDLE = 0, S1 = 1, S11 = 2, S110 = 3, S1101 = 4, S11010 = 5, S110101 = 6; reg [2:0] cur_state, next_state; assign out = cur_state == S110101 ? 1 : 0; always @ (posedge clk) begin if (!rstn) cur_state <= IDLE; else cur_state <= next_state; end always @ (cur_state or in) begin case (cur_state) IDLE : begin if (in) next_state = S1; else next_state = IDLE; end S1: begin if (in) next_state = S11; else next_state = IDLE; end S11: begin if (!in) next_state = S110; else next_state = S11; end S110 : begin if (in) next_state = S1101; else next_state = IDLE; end S1101 : begin if (!in) next_state = S11010; else next_state = IDLE; end S11010: begin if (in) next_state = S110101; else next_state = IDLE; end S110101: begin if (in) next_state = S1; else next_state = IDLE; // Bug 2 end endcase end endmodule`,
      },
      {
        title: "4. Testbench",
        content: `module tb; reg clk, in, rstn; wire out; integer l_dly; always #10 clk = ~clk; det_110101 u0 ( .clk(clk), .rstn(rstn), .in(in), .out(out) ); initial begin clk <= 0; rstn <= 0; in <= 0; repeat (5) @ (posedge clk); rstn <= 1; @(posedge clk) in <= 1; @(posedge clk) in <= 1; @(posedge clk) in <= 0; @(posedge clk) in <= 1; @(posedge clk) in <= 0; @(posedge clk) in <= 1; @(posedge clk) in <= 1; @(posedge clk) in <= 1; @(posedge clk) in <= 0; @(posedge clk) in <= 1; @(posedge clk) in <= 0; @(posedge clk) in <= 1; #100 $finish; end endmodule Output ncsim> run T=10 in=0 out=0 T=30 in=0 out=0 T=50 in=0 out=0 T=70 in=0 out=0 T=90 in=0 out=0 T=110 in=1 out=0 T=130 in=1 out=0 T=150 in=0 out=0 T=170 in=1 out=0 T=190 in=0 out=0 T=210 in=1 out=0 T=230 in=1 out=1 T=250 in=1 out=0 T=270 in=0 out=0 T=290 in=1 out=0 T=310 in=0 out=0 T=330 in=1 out=0 T=350 in=1 out=1 T=370 in=1 out=0 T=390 in=1 out=0 T=410 in=1 out=0 Simulation complete via $finish(1) at time 430 NS + 0  `,
      },
      {
        title: "5. Quiz",
        content: `No quiz questions available for this article. &nbsp;&nbsp;Prev Article Next Article&nbsp;&nbsp;`,
      },
      {
        title: "6. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Kayan Pencere ile Desen Dedektörü Devresi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-pattern-detector.v - Örnek Donanım Modülü",
          snippet: `module det_110101 ( input clk,
                  	 input rstn,
                  	 input in,
                  	 output out );
  
  parameter IDLE 	= 0,
  			S1 		= 1,
  			S11 	= 2,
  			S110 	= 3,
  			S1101 	= 4,
  			S11010 	= 5,
  			S110101 = 6;
  
  reg [2:0] cur_state, next_state;
  
  assign out = cur_state == S110101 ? 1 : 0;
  
  always @ (posedge clk) begin
    if (!rstn)
      	cur_state <= IDLE;
     else 
     	cur_state <= next_state;
  end
  
  always @ (cur_state or in) begin
    case (cur_state)
      IDLE : begin
        if (in) next_state = S1;
        else 	next_state = IDLE;
      end
      
      S1: begin
        if (in) next_state = S11;
        else 	next_state = IDLE;
      end

      S11: begin
        if (!in) next_state = S110;
        else 	next_state = S11;
      end
      
      S110 : begin
        if (in) next_state = S1101;
        else 	next_state = IDLE;
      end
      
      S1101 : begin
        if (!in) next_state = S11010;
        else 	next_state = IDLE;
      end
      
      S11010: begin
        if (in) next_state = S110101;
        else 	next_state = IDLE;
      end
      
      S110101: begin
        if (in) next_state = S1;
        else 	next_state = IDLE; 		// Bug 2
      end      
    endcase
  end
endmodule`,
        },
      },
      {
        title: "7. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-pattern-detector_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  reg clk, in, rstn;
  wire out;
  integer l_dly;
  
  always #10 clk = ~clk;
  
  det_110101 u0 ( .clk(clk), .rstn(rstn), .in(in), .out(out) );
  
  initial begin
  	clk <= 0;
    rstn <= 0;
    in <= 0;
    
    repeat (5) @ (posedge clk);
    rstn <= 1;

    @(posedge clk) in <= 1;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 0;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 0;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 0;
    @(posedge clk) in <= 1;
    @(posedge clk) in <= 0;
    @(posedge clk) in <= 1;
    
    #100 $finish;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module det_110101 ( input clk,
                  	 input rstn,
                  	 input in,
                  	 output out );
  
  parameter IDLE 	= 0,
  			S1 		= 1,
  			S11 	= 2,
  			S110 	= 3,
  			S1101 	= 4,
  			S11010 	= 5,
  			S110101 = 6;
  
  reg [2:0] cur_state, next_state;
  
  assign out = cur_state == S110101 ? 1 : 0;
  
  always @ (posedge clk) begin
    if (!rstn)
      	cur_state <= IDLE;
     else 
     	cur_state <= next_state;
  end
  
  always @ (cur_state or in) begin
    case (cur_state)
      IDLE : begin
        if (in) next_state = S1;
        else 	next_state = IDLE;
      end
      
      S1: begin
        if (in) next_state = S11;
        else 	next_state = IDLE;
      end

      S11: begin
        if (!in) next_state = S110;
        else 	next_state = S11;
      end
      
      S110 : begin
        if (in) next_state = S1101;
        else 	next_state = IDLE;
      end
      
      S1101 : begin
        if (!in) next_state = S11010;
        else 	next_state = IDLE;
      end
      
      S11010: begin
        if (in) next_state = S110101;
        else 	next_state = IDLE;
      end
      
      S110101: begin
        if (in) next_state = S1;
        else 	next_state = IDLE; 		// Bug 2
      end      
    endcase
  end
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Kayan Pencere ile Desen Dedektörü Devresi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-positive-edge-detector": {
    id: "verilog-positive-edge-detector",
    badge: "Bölüm 18 • Kenar Dedektörleri & Kod Dönüştürücüler",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Pozitif Kenar Dedektörü (Single-Cycle Strobe Üretimi)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 18: Kenar Dedektörleri & Kod Dönüştürücüler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Pozitif Kenar Dedektörü (Single-Cycle Strobe Üretimi)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Pozitif Kenar Dedektörü (Single-Cycle Strobe Üretimi)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Pozitif Kenar Dedektörü (Single-Cycle Strobe Üretimi) Şeması](/images/verilog/ped-bd2.png)

![Pozitif Kenar Dedektörü (Single-Cycle Strobe Üretimi) Şeması](/images/verilog/ped-bd.png)

![Pozitif Kenar Dedektörü (Single-Cycle Strobe Üretimi) Şeması](/images/verilog/fig1.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Edge Detectors & Converters Verilog Positive Edge Detector Verilog Positive Edge Detector A positive edge detector will send out a pulse whenever the signal it is monitoring changes from 0 to 1 (positive edge).`,
      },
      {
        title: "4. Design",
        content: `The idea behind a positive edge detector is to delay the original signal by one clock cycle, take its inverse and perform a logical AND with the original signal. module pos_edge_det ( input sig, // Input signal for which positive edge has to be detected input clk, // Input signal for clock output pe); // Output signal that gives a pulse when a positive edge occurs reg sig_dly; // Internal signal to store the delayed version of signal // This always block ensures that sig_dly is exactly 1 clock behind sig always @ (posedge clk) begin sig_dly <= sig; end // Combinational logic where sig is AND with delayed, inverted version of sig // Assign statement assigns the evaluated expression in the RHS to the internal net pe assign pe = sig & ~sig_dly; endmodule The module shown above is named pos_edge_det and has two inputs and one output. The design aims to detect the positive edge of input sig , and output pe . So we expect to see a pulse on pe whenever sig changes from value 0 to 1. We create an internal signal called sig_dly of type reg that can store a single clock cycle delayed version of sig , and is achieved by the always block. Output pe is an implicit variable of type wire and can be assigned only by a continous assignment. Hence we have used the assign statement to assign an expression to pe . The expression simply takes sig and does a logical AND with the inversion of sig .`,
      },
      {
        title: "5. Testbench",
        content: `In order to simulate our design, we have to place the module of our verilog code inside a testbench . The testbench simply holds our design and provides us a way to send in signals as inputs and observe the outputs to make sure that it operates as required. module tb; reg sig; // Declare internal TB signal called sig to drive the sig pin of the design reg clk; // Declare internal TB signal called clk to drive clock to the design // Instantiate the design in TB and connect with signals in TB pos_edge_det ped0 ( .sig(sig), .clk(clk), .pe(pe)); // Generate a clock of 100MHz always #5 clk = ~clk; // Drive stimulus to the design initial begin clk <= 0; sig <= 0; #15 sig <= 1; #20 sig <= 0; #15 sig <= 1; #10 sig <= 0; #20 $finish; end endmodule Clock for our design is generated by the always block which toggles clk every 5 time units, there by generating a clock with period = 10 time units. Basic design stimulus is written within the initial block which makes the simulator advance in time and drive the design with specific values appropriately. `,
      },
      {
        title: "6. Hardware Schematic",
        content: `The behavioral model in Verilog was synthesized using Xilinx Vivado FPGA design tool and the hardware schematic has been generated as shown below. It can be seen that the one clock delay is implemented using a DFF and the output of the flip flop is wired to the input of an AND gate through an inverter. These digital elements are substituted with logical cells that belong to a real cell library for a given technology node.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Pozitif Kenar Dedektörü (Single-Cycle Strobe Üretimi)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-positive-edge-detector.v - Örnek Donanım Modülü",
          snippet: `module pos_edge_det ( input sig,            // Input signal for which positive edge has to be detected
                      input clk,            // Input signal for clock
                      output pe);           // Output signal that gives a pulse when a positive edge occurs

    reg   sig_dly;                          // Internal signal to store the delayed version of signal

    // This always block ensures that sig_dly is exactly 1 clock behind sig
	always @ (posedge clk) begin
		sig_dly <= sig;
	end

    // Combinational logic where sig is AND with delayed, inverted version of sig
    // Assign statement assigns the evaluated expression in the RHS to the internal net pe
	assign pe = sig & ~sig_dly;            
endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-positive-edge-detector_tb.v - Simülasyon Testbench",
          snippet: `module tb;
	reg sig;         // Declare internal TB signal called sig to drive the sig pin of the design
	reg clk;         // Declare internal TB signal called clk to drive clock to the design
	
	// Instantiate the design in TB and connect with signals in TB
	pos_edge_det ped0 (  .sig(sig),           
    					 .clk(clk),
 			      		 .pe(pe));

	// Generate a clock of 100MHz
	always #5 clk = ~clk;           
	
	// Drive stimulus to the design
	initial begin
		clk <= 0;
		sig <= 0;
		#15 sig <= 1;
		#20 sig <= 0;
		#15 sig <= 1;
		#10 sig <= 0;
		#20 $finish;
	end	
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module pos_edge_det ( input sig,            // Input signal for which positive edge has to be detected
                      input clk,            // Input signal for clock
                      output pe);           // Output signal that gives a pulse when a positive edge occurs

    reg   sig_dly;                          // Internal signal to store the delayed version of signal

    // This always block ensures that sig_dly is exactly 1 clock behind sig
	always @ (posedge clk) begin
		sig_dly <= sig;
	end

    // Combinational logic where sig is AND with delayed, inverted version of sig
    // Assign statement assigns the evaluated expression in the RHS to the internal net pe
	assign pe = sig & ~sig_dly;            
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Pozitif Kenar Dedektörü (Single-Cycle Strobe Üretimi) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-binary-to-gray": {
    id: "verilog-binary-to-gray",
    badge: "Bölüm 18 • Kenar Dedektörleri & Kod Dönüştürücüler",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "İkili (Binary) - Gray Kod Dönüştürücü Devresi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 18: Kenar Dedektörleri & Kod Dönüştürücüler. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **İkili (Binary) - Gray Kod Dönüştürücü Devresi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **İkili (Binary) - Gray Kod Dönüştürücü Devresi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![İkili (Binary) - Gray Kod Dönüştürücü Devresi Şeması](/images/verilog/verilog_binary_to_gray_xor.png)

![İkili (Binary) - Gray Kod Dönüştürücü Devresi Şeması](/images/verilog/verilog_binary_to_gray_shift.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Edge Detectors & Converters Verilog Binary to Gray Verilog Binary to Gray Gray code is a binary code where each successive value differs from the previous value by only one bit.`,
      },
      {
        title: "4. Implementation #1",
        content: `module bin2gray #(parameter N=4) ( input [N-1:0] bin, output [N-1:0] gray); genvar i; generate for(i = 0; i < N-1; i = i + 1) begin assign gray[i] = bin[i] ^ bin[i+1]; end endgenerate assign gray[N-1] = bin[N-1]; endmodule`,
      },
      {
        title: "5. Implementation #2",
        content: `module bin2gray #(parameter N=4) ( input [N-1:0] bin, output [N-1:0] gray); assign gray = bin ^ (bin >> 1); endmodule`,
      },
      {
        title: "6. Hardware Schematic",
        content: `Note that the second implementation resulted in the synthesis of a shift register as implied by the >> operator and will occupy more area and power. `,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **İkili (Binary) - Gray Kod Dönüştürücü Devresi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-binary-to-gray.v - Örnek Donanım Modülü",
          snippet: `module bin2gray #(parameter N=4) ( input  [N-1:0] bin, 
                                   output [N-1:0] gray);
  
  genvar i;    
  generate
    for(i = 0; i < N-1; i = i + 1) begin
      assign gray[i] = bin[i] ^ bin[i+1];
    end
  endgenerate
  
  assign gray[N-1] = bin[N-1];
endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-binary-to-gray_tb.v - Simülasyon Testbench",
          snippet: `module bin2gray #(parameter N=4) ( input  [N-1:0] bin, 
                                   output [N-1:0] gray);
                                   
  assign gray = bin ^ (bin >> 1);
  
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module bin2gray #(parameter N=4) ( input  [N-1:0] bin, 
                                   output [N-1:0] gray);
  
  genvar i;    
  generate
    for(i = 0; i < N-1; i = i + 1) begin
      assign gray[i] = bin[i] ^ bin[i+1];
    end
  endgenerate
  
  assign gray[N-1] = bin[N-1];
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "İkili (Binary) - Gray Kod Dönüştürücü Devresi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-single-port-ram": {
    id: "verilog-single-port-ram",
    badge: "Bölüm 19 • Bellek Elemanları (RAM, FIFO, LIFO)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Tek Portlu Senkron RAM Bellek Tasarımı",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 19: Bellek Elemanları (RAM, FIFO, LIFO). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Tek Portlu Senkron RAM Bellek Tasarımı** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Tek Portlu Senkron RAM Bellek Tasarımı** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Tek Portlu Senkron RAM Bellek Tasarımı Şeması](/images/verilog/single_port_ram.png)

![Tek Portlu Senkron RAM Bellek Tasarımı Şeması](/images/verilog/single_port_ram_ar_aw.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Memory Elements Verilog Single Port RAM Verilog Single Port RAM `,
      },
      {
        title: "4. What is a single port RAM ?",
        content: `A single-port RAM (Random Access Memory) is a type of digital memory component that allows data to be read from and written to a single memory location (address) at a time. It is a simple form of memory that provides a basic storage mechanism for digital systems. Each memory location in a single-port RAM can store a fixed number of bits (usually a power of 2, such as 8, 16, 32, etc.). During a read operation, the data stored at a specific address is retrieved. During a write operation, new data is stored at a specific address, replacing the previous data.`,
      },
      {
        title: "5. Why is it called single port ?",
        content: `A single-port RAM has only one data port, which means that read and write operations cannot occur simultaneously at different addresses. If a write operation is in progress, a read operation must wait, and vice versa.`,
      },
      {
        title: "6. Signals",
        content: `Single-port RAMs have address lines that are used to select the memory location to be accessed. The number of address lines determines the maximum number of memory locations that the RAM can hold. Data lines are used to carry the actual data to be read from or written to the memory location. Control signals, such as read enable (read request) and write enable (write request), are used to initiate specific memory operations.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Tek Portlu Senkron RAM Bellek Tasarımı** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-single-port-ram.v - Örnek Donanım Modülü",
          snippet: `module single_port_sync_ram 
  # (parameter ADDR_WIDTH = 4,
     parameter DATA_WIDTH = 32,
     parameter DEPTH = 16 
    )
  
  ( 	input 					clk,
   		input [ADDR_WIDTH-1:0]	addr,
   		inout [DATA_WIDTH-1:0]	data,
   		input 					cs,		// Chip Select
   		input 					we,		// Write Enable
   		input 					oe		// Output Enable
  );
  
  reg [DATA_WIDTH-1:0] 	tmp_data;
  reg [DATA_WIDTH-1:0] 	mem [DEPTH];
  
  always @ (posedge clk) begin
    if (cs & we)
      mem[addr] <= data;
  end
  
  always @ (posedge clk) begin
    if (cs & !we)
    	tmp_data <= mem[addr];
  end
  
  assign data = cs & oe & !we ? tmp_data : 'hz;
endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-single-port-ram_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  parameter ADDR_WIDTH = 4;
  parameter DATA_WIDTH = 16;
  parameter DEPTH = 16;
  
  reg clk;
  reg cs;
  reg we;
  reg oe;
  reg [ADDR_WIDTH-1:0] addr;
  wire [DATA_WIDTH-1:0] data;
  reg [DATA_WIDTH-1:0] tb_data;
  
  single_port_sync_ram #(.DATA_WIDTH(DATA_WIDTH)) u0
  ( 	.clk(clk),
                        	.addr(addr),
                        	.data(data),
                        	.cs(cs),
   							.we(we),
   							.oe(oe)
                         );
  
  
  always #10 clk = ~clk;
  assign data = !oe ? tb_data : 'hz;
  
  initial begin
    {clk, cs, we, addr, tb_data, oe} <= 0;
    
    repeat (2) @ (posedge clk);
    
    for (integer i = 0; i < 2**ADDR_WIDTH; i= i+1) begin
      repeat (1) @(posedge clk) addr <= i; we <= 1; cs <=1; oe <= 0; tb_data <= $random;
    end
    
    for (integer i = 0; i < 2**ADDR_WIDTH; i= i+1) begin
      repeat (1) @(posedge clk) addr <= i; we <= 0; cs <= 1; oe <= 1;
    end
    
    #20 $finish;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module single_port_sync_ram 
  # (parameter ADDR_WIDTH = 4,
     parameter DATA_WIDTH = 32,
     parameter DEPTH = 16 
    )
  
  ( 	input 					clk,
   		input [ADDR_WIDTH-1:0]	addr,
   		inout [DATA_WIDTH-1:0]	data,
   		input 					cs,		// Chip Select
   		input 					we,		// Write Enable
   		input 					oe		// Output Enable
  );
  
  reg [DATA_WIDTH-1:0] 	tmp_data;
  reg [DATA_WIDTH-1:0] 	mem [DEPTH];
  
  always @ (posedge clk) begin
    if (cs & we)
      mem[addr] <= data;
  end
  
  always @ (posedge clk) begin
    if (cs & !we)
    	tmp_data <= mem[addr];
  end
  
  assign data = cs & oe & !we ? tmp_data : 'hz;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Tek Portlu Senkron RAM Bellek Tasarımı ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "synchronous-fifo": {
    id: "synchronous-fifo",
    badge: "Bölüm 19 • Bellek Elemanları (RAM, FIFO, LIFO)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Senkron FIFO (First-In First-Out) Kuyruk Belleği Mimarisi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 19: Bellek Elemanları (RAM, FIFO, LIFO). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Senkron FIFO (First-In First-Out) Kuyruk Belleği Mimarisi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Senkron FIFO (First-In First-Out) Kuyruk Belleği Mimarisi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Senkron FIFO (First-In First-Out) Kuyruk Belleği Mimarisi Şeması](/images/verilog/sync_fifo.svg)

![Senkron FIFO (First-In First-Out) Kuyruk Belleği Mimarisi Şeması](/images/verilog/sync_fifo_wave2.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Memory Elements Synchronous FIFO Synchronous FIFO `,
      },
      {
        title: "4. What is a synchronous FIFO ?",
        content: `A synchronous FIFO (First-In-First-Out) is a type of data buffer used in digital systems that operates under a single clock domain, meaning both read and write operations occur using the same clock signal. This design ensures that data is processed in the order it was received, which is critical for maintaining data integrity in various applications. A synchronous FIFO is called "synchronous" because it uses synchronized clocks to control the read and write operations. The read and write pointers of the FIFO are updated synchronously with the clocks, and data is transferred between the FIFO and the external circuit synchronously with the clocks. Synchronous FIFOs are primarily used to buffer data when the rate of data transfer exceeds the rate of data processing. This is particularly important in high-speed systems where timing discrepancies can lead to data loss or corruption.`,
      },
      {
        title: "5. What does depth and width indicate ?",
        content: `The depth of a FIFO refers to the total number of data entries it can hold at any given time. It determines how much data can be buffered between the writing and reading processes. Depth = (Writing Rate - Reading Rate)/Clock Frequency The width of a FIFO refers to the number of bits that can be stored in each entry or slot within the FIFO. It essentially defines how much data can be written or read in one operation.`,
      },
      {
        title: "6. What are the main IO ports ?",
        content: `Data ports : It contains two ports, write and read, where the write port is used to write data into the FIFO, and the read port is used to read data from the FIFO. Pointers : It contains two pointers, write and read, where the write pointer tracks the position where new data will be written and the read pointer tracks the position from where data will be read. Both pointers are updated synchronously with the clock. Status Flags : When full , it indicates that no more data can be written until some is read and ]empty indicates that there is no data available to read.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Senkron FIFO (First-In First-Out) Kuyruk Belleği Mimarisi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "synchronous-fifo.v - Örnek Donanım Modülü",
          snippet: `module sync_fifo #(parameter DEPTH=8, DWIDTH=16) 
( 
        input               	rstn,               // Active low reset                       
                            	clk,                // Clock
                            	wr_en, 				// Write enable
                            	rd_en, 				// Read enable
        input      [DWIDTH-1:0] din, 				// Data written into FIFO
        output reg [DWIDTH-1:0] dout, 				// Data read from FIFO
        output              	empty, 				// FIFO is empty when high
                            	full 				// FIFO is full when high
);
  
  
  reg [$clog2(DEPTH)-1:0]   wptr;
  reg [$clog2(DEPTH)-1:0]   rptr;
  
  reg [DWIDTH-1 : 0]    fifo[DEPTH];
  
  always @ (posedge clk) begin
    if (!rstn) begin
      wptr <= 0;      
    end else begin
      if (wr_en & !full) begin
        fifo[wptr] <= din;
        wptr <= wptr + 1;
      end
    end
  end
  
  initial begin
    $monitor("[%0t] [FIFO] wr_en=%0b din=0x%0h rd_en=%0b dout=0x%0h empty=%0b full=%0b",
             $time, wr_en, din, rd_en, dout, empty, full);
  end
  
  always @ (posedge clk) begin
    if (!rstn) begin
      rptr <= 0;
    end else begin
      if (rd_en & !empty) begin
        dout <= fifo[rptr];
        rptr <= rptr + 1;
      end
    end
  end
  
  assign full  = (wptr + 1'b1) == rptr;
  assign empty = wptr == rptr;
endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "synchronous-fifo_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  
  reg 	 		clk;
  reg [15:0]    din;
  wire [15:0] 	dout;
  reg [15:0] 	rdata;
  wire 			empty;
  reg 			rd_en;
  reg 			wr_en;
  wire 			full;
  reg 			rstn;
  reg 			stop;
  
  sync_fifo u_sync_fifo ( .rstn(rstn),
                         .wr_en(wr_en),
                         .rd_en(rd_en),
                         .clk(clk),
                         .din(din),
                         .dout(dout),
                         .empty(empty),
                         .full(full)
                        );
  
  always #10 clk = ~clk;
  
  initial begin
    clk 	<= 0;
    rstn 	<= 0;
    wr_en 	<= 0;
    rd_en 	<= 0;
    stop  	<= 0;
    
    #50 rstn <= 1;
  end
  
  initial begin
    @(posedge clk);
    
    for (int i = 0; i < 20; i = i+1) begin
      
      // Wait until there is space in fifo
      while (full) begin
      	@(posedge clk);
        $display("[%0t] FIFO is full, wait for reads to happen", $time);
      end;
      
      // Drive new values into FIFO      
      wr_en <= $random;
      din 	<= $random;
      $display("[%0t] clk i=%0d wr_en=%0d din=0x%0h ", $time, i, wr_en, din);
      
      // Wait for next clock edge
      @(posedge clk);
    end
    
    stop = 1;
  end
  
  initial begin
    @(posedge clk);
    
    while (!stop) begin
      // Wait until there is data in fifo
      while (empty) begin
        rd_en <= 0;
        $display("[%0t] FIFO is empty, wait for writes to happen", $time);
        @(posedge clk);
      end;
      
      // Sample new values from FIFO at random pace
      rd_en <= $random;
      @(posedge clk);
      rdata <= dout;
      $display("[%0t] clk rd_en=%0d rdata=0x%0h ", $time, rd_en, rdata);      
    end
    
    #500 $finish;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module sync_fifo #(parameter DEPTH=8, DWIDTH=16) 
( 
        input               	rstn,               // Active low reset                       
                            	clk,                // Clock
                            	wr_en, 				// Write enable
                            	rd_en, 				// Read enable
        input      [DWIDTH-1:0] din, 				// Data written into FIFO
        output reg [DWIDTH-1:0] dout, 				// Data read from FIFO
        output              	empty, 				// FIFO is empty when high
                            	full 				// FIFO is full when high
);
  
  
  reg [$clog2(DEPTH)-1:0]   wptr;
  reg [$clog2(DEPTH)-1:0]   rptr;
  
  reg [DWIDTH-1 : 0]    fifo[DEPTH];
  
  always @ (posedge clk) begin
    if (!rstn) begin
      wptr <= 0;      
    end else begin
      if (wr_en & !full) begin
        fifo[wptr] <= din;
        wptr <= wptr + 1;
      end
    end
  end
  
  initial begin
    $monitor("[%0t] [FIFO] wr_en=%0b din=0x%0h rd_en=%0b dout=0x%0h empty=%0b full=%0b",
             $time, wr_en, din, rd_en, dout, empty, full);
  end
  
  always @ (posedge clk) begin
    if (!rstn) begin
      rptr <= 0;
    end else begin
      if (rd_en & !empty) begin
        dout <= fifo[rptr];
        rptr <= rptr + 1;
      end
    end
  end
  
  assign full  = (wptr + 1'b1) == rptr;
  assign empty = wptr == rptr;
endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Senkron FIFO (First-In First-Out) Kuyruk Belleği Mimarisi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-stack-lifo": {
    id: "verilog-stack-lifo",
    badge: "Bölüm 19 • Bellek Elemanları (RAM, FIFO, LIFO)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Yığın (Stack / LIFO) Donanım Bellek Devresi",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 19: Bellek Elemanları (RAM, FIFO, LIFO). Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Yığın (Stack / LIFO) Donanım Bellek Devresi** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Yığın (Stack / LIFO) Donanım Bellek Devresi** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Yığın (Stack / LIFO) Donanım Bellek Devresi Şeması](/images/verilog/verilog-stack-lifo.svg)

![Yığın (Stack / LIFO) Donanım Bellek Devresi Şeması](/images/verilog/verilog-stack-lifo-wave.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Memory Elements Verilog Stack or LIFO Verilog Stack or LIFO `,
      },
      {
        title: "4. What is a stack or LIFO ?",
        content: `LIFO, which stands for Last In, First Out, is a data organization method commonly used in digital design and computer science. The LIFO principle dictates that the most recently added item is the first one to be removed. This concept is analogous to a stack of plates, where the last plate placed on top is the first one to be taken off.`,
      },
      {
        title: "5. How does it work ?",
        content: `LIFO is the fundamental principle behind the stack data structure: New elements are added to the top (push operation) Elements are removed from the top (pop operation) The most recently added element is always at the top`,
      },
      {
        title: "6. Where is a stack mostly used ?",
        content: `LIFO is used in various aspects of memory management and program execution, but is most often used for function calls. When a function is called, its parameters and return address are pushed onto a stack. When the function returns, these values are popped off.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Yığın (Stack / LIFO) Donanım Bellek Devresi** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-stack-lifo.v - Örnek Donanım Modülü",
          snippet: `module lifo #(parameter WIDTH = 32, parameter DEPTH = 16)(
    input wire              clk,
    input wire              rst,
    input wire              push,
    input wire              pop,
    input wire [WIDTH-1:0]  data_in,
    output reg [WIDTH-1:0]  data_out,
    output reg              empty,
    output reg              full
);

    reg [WIDTH-1:0]        stack [0:DEPTH-1];
    reg [$clog2(DEPTH):0]  stack_ptr;

    always @(posedge clk or posedge rst) begin
        if (rst) begin
            stack_ptr <= 0;
            empty <= 1;
            full <= 0;
              
        end else begin
            if (push && !full) begin
                stack[stack_ptr] <= data_in;
                stack_ptr        <= stack_ptr + 1;
                empty            <= 0;
                  
                if (stack_ptr == DEPTH - 1) begin
                    full <= 1;
                end
                      
            end else if (pop && !empty) begin
                stack_ptr <= stack_ptr - 1;
                full      <= 0;
                  
                if (stack_ptr == 1) begin
                    empty <= 1;
                end
            end
        end
    end

    always @(*) begin
      if (!empty & pop)
            data_out = stack[stack_ptr - 1];
        else
            data_out = {WIDTH{1'b0}};
    end

endmodule`,
        },
      },
      {
        title: "8. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-stack-lifo_tb.v - Simülasyon Testbench",
          snippet: `module lifo_tb;

    // Parameters for the LIFO
    parameter WIDTH = 16;
    parameter DEPTH = 4; // Set a smaller depth for testing

    // Testbench signals
    reg clk;
    reg rst;
    reg push;
    reg pop;
    reg [WIDTH-1:0] data_in;
    wire [WIDTH-1:0] data_out;
    wire empty;
    wire full;

    // Instantiate the LIFO module
    lifo #(
        .WIDTH(WIDTH),
        .DEPTH(DEPTH)
    ) uut (
        .clk(clk),
        .rst(rst),
        .push(push),
        .pop(pop),
        .data_in(data_in),
        .data_out(data_out),
        .empty(empty),
        .full(full)
    );

    // Clock generation
    initial begin
        clk = 0;
        forever #5 clk = ~clk; // 10 ns clock period
    end

    // Test sequence
    initial begin
        // Initialize signals
        rst <= 1;
        push <= 0;
        pop <= 0;
        data_in <= 0;

        // Wait for a few clock cycles
        #10;

        // Release reset
        rst <= 0;
        
      for (integer i = 0; i < 20; i = i + 1) begin
            @(posedge clk);
        	if ($random % 2) begin
        		push <= $random;
              	pop <= 0;
              	data_in <= $random;
            end else begin
        		pop  <= $random;
              	push <= 0;
            end
        
        $display("[%0t] Operation push=%0d pop=%0d data_in=0x%0h empty=%0b full=%0b", $time, push, pop, data_in, empty, full);                        
        end

        #100;
        $finish;
    end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `module lifo #(parameter WIDTH = 32, parameter DEPTH = 16)(
    input wire              clk,
    input wire              rst,
    input wire              push,
    input wire              pop,
    input wire [WIDTH-1:0]  data_in,
    output reg [WIDTH-1:0]  data_out,
    output reg              empty,
    output reg              full
);

    reg [WIDTH-1:0]        stack [0:DEPTH-1];
    reg [$clog2(DEPTH):0]  stack_ptr;

    always @(posedge clk or posedge rst) begin
        if (rst) begin
            stack_ptr <= 0;
            empty <= 1;
            full <= 0;
              
        end else begin
            if (push && !full) begin
                stack[stack_ptr] <= data_in;
                stack_ptr        <= stack_ptr + 1;
                empty            <= 0;
                  
                if (stack_ptr == DEPTH - 1) begin
                    full <= 1;
                end
                      
            end else if (pop && !empty) begin
                stack_ptr <= stack_ptr - 1;
                full      <= 0;
                  
                if (stack_ptr == 1) begin
                    empty <= 1;
                end
            end
        end
    end

    always @(*) begin
      if (!empty & pop)
            data_out = stack[stack_ptr - 1];
        else
            data_out = {WIDTH{1'b0}};
    end

endmodule`,
      language: "verilog",
    },
    quiz: {
      question: "Yığın (Stack / LIFO) Donanım Bellek Devresi ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-clock-generator": {
    id: "verilog-clock-generator",
    badge: "Bölüm 20 • Saat Üreteçleri & Buton Debounce",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Simülasyon İçin Saat Üreteci (Clock Generator) ve Faz Kontrolü",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 20: Saat Üreteçleri & Buton Debounce. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Simülasyon İçin Saat Üreteci (Clock Generator) ve Faz Kontrolü** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Simülasyon İçin Saat Üreteci (Clock Generator) ve Faz Kontrolü** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Simülasyon İçin Saat Üreteci (Clock Generator) ve Faz Kontrolü Şeması](/images/verilog/clk_period.png)

![Simülasyon İçin Saat Üreteci (Clock Generator) ve Faz Kontrolü Şeması](/images/verilog/clk_duty_cycle.png)

![Simülasyon İçin Saat Üreteci (Clock Generator) ve Faz Kontrolü Şeması](/images/verilog/clk_phase.png)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Clock & Timing Verilog Clock Generator Verilog Clock Generator Clocks are fundamental to building digital circuits as it allows different blocks to be in sync with each other.`,
      },
      {
        title: "4. Properties of a clock",
        content: `The key properties of a digital clock are its frequency which determines the clock period , its duty cycle and the clock phase in relation to other clocks.`,
      },
      {
        title: "5. Clock Period",
        content: `The frequency indicates how many cycles can be found in a certain period of time. And hence the clock period is the time taken to complete 1 cycle.`,
      },
      {
        title: "6. Clock Duty Cycle",
        content: `The amount of time the clock is high compared to its time period defines the duty cycle.`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Simülasyon İçin Saat Üreteci (Clock Generator) ve Faz Kontrolü** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-clock-generator.v - Örnek Donanım Modülü",
          snippet: `\`timescale 1ns/1ps

module clock_gen (	input      enable,
  					output reg clk);
  
  parameter FREQ = 100000;  // in kHZ
  parameter PHASE = 0; 		// in degrees
  parameter DUTY = 50;  	// in percentage 
  
  real clk_pd  		= 1.0/(FREQ * 1e3) * 1e9; 	// convert to ns
  real clk_on  		= DUTY/100.0 * clk_pd;
  real clk_off 		= (100.0 - DUTY)/100.0 * clk_pd;
  real quarter 		= clk_pd/4;
  real start_dly     = quarter * PHASE/90;
  
  reg start_clk;
  
  initial begin    
    $display("FREQ      = %0d kHz", FREQ);
    $display("PHASE     = %0d deg", PHASE);
    $display("DUTY      = %0d %%",  DUTY);
    
    $display("PERIOD    = %0.3f ns", clk_pd);    
    $display("CLK_ON    = %0.3f ns", clk_on);
    $display("CLK_OFF   = %0.3f ns", clk_off);
    $display("QUARTER   = %0.3f ns", quarter);
    $display("START_DLY = %0.3f ns", start_dly);
  end
  
  // Initialize variables to zero
  initial begin
    clk <= 0;
    start_clk <= 0;
  end
  
  // When clock is enabled, delay driving the clock to one in order
  // to achieve the phase effect. start_dly is configured to the 
  // correct delay for the configured phase. When enable is 0,
  // allow enough time to complete the current clock period
  always @ (posedge enable or negedge enable) begin
    if (enable) begin
      #(start_dly) start_clk = 1;
    end else begin
      #(start_dly) start_clk = 0;
    end      
  end
  
  // Achieve duty cycle by a skewed clock on/off time and let this
  // run as long as the clocks are turned on.
  always @(posedge start_clk) begin
    if (start_clk) begin
      	clk = 1;
      
      	while (start_clk) begin
      		#(clk_on)  clk = 0;
    		#(clk_off) clk = 1;
        end
      
      	clk = 0;
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
          caption: "verilog-clock-generator_tb.v - Simülasyon Testbench",
          snippet: `module tb;
  wire clk1;
  wire clk2;
  wire clk3;
  wire clk4;
  reg  enable;
  reg [7:0] dly;
  
  clock_gen u0(enable, clk1);
  clock_gen #(.FREQ(200000)) u1(enable, clk2);
  clock_gen #(.FREQ(400000)) u2(enable, clk3);
  clock_gen #(.FREQ(800000)) u3(enable, clk4);
  
  initial begin
    enable <= 0;
    
    for (int i = 0; i < 10; i= i+1) begin
      dly = $random;
      #(dly) enable <= ~enable;      
      $display("i=%0d dly=%0d", i, dly);
      #50;
    end
    
    #50 $finish;
  end
endmodule`,
        },
      },
    ],
    playground: {
      initialCode: `\`timescale 1ns/1ps

module clock_gen (	input      enable,
  					output reg clk);
  
  parameter FREQ = 100000;  // in kHZ
  parameter PHASE = 0; 		// in degrees
  parameter DUTY = 50;  	// in percentage 
  
  real clk_pd  		= 1.0/(FREQ * 1e3) * 1e9; 	// convert to ns
  real clk_on  		= DUTY/100.0 * clk_pd;
  real clk_off 		= (100.0 - DUTY)/100.0 * clk_pd;
  real quarter 		= clk_pd/4;
  real start_dly     = quarter * PHASE/90;
  
  reg start_clk;
  
  initial begin    
    $display("FREQ      = %0d kHz", FREQ);
    $display("PHASE     = %0d deg", PHASE);
    $display("DUTY      = %0d %%",  DUTY);
    
    $display("PERIOD    = %0.3f ns", clk_pd);    
    $display("CLK_ON    = %0.3f ns", clk_on);
    $display("CLK_OFF   = %0.3f ns", clk_off);
    $display("QUARTER   = %0.3f ns", quarter);
    $display("START_DLY = %0.3f ns", start_dly);
  end
  
  // Initialize variables to zero
  initial begin
    clk <= 0;
    start_clk <= 0;
  end
  
  // When clock is enabled, delay driving the clock to one in order
  // to achieve the phase effect. start_dly is configured to the 
  // correct delay for the configured phase. When enable is 0,
  // allow enough time to complete the current clock period
  always @ (posedge enable or negedge enable) begin
    if (enable) begin
      #(start_dly) start_clk = 1;
    end else begin
      #(start_dly) start_clk = 0;
    end      
  end
  
  // Achieve duty cycle by a skewed clock on/off time and let this
  // run as long as the clocks are t`,
      language: "verilog",
    },
    quiz: {
      question: "Simülasyon İçin Saat Üreteci (Clock Generator) ve Faz Kontrolü ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
  "verilog-debounce-circuit": {
    id: "verilog-debounce-circuit",
    badge: "Bölüm 20 • Saat Üreteçleri & Buton Debounce",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Mekanik Buton Titreşim Önleyici (Debounce Circuit)",
    subtitle: "ChipVerify Verilog Tutorial Bölüm 20: Saat Üreteçleri & Buton Debounce. Sentezlenebilir RTL mimarisi, dalga biçimleri ve endüstri standartları.",
    sections: [
      {
        title: "1. Neler Öğreneceksiniz? (Genel Bakış)",
        content: `Bu derste **Mekanik Buton Titreşim Önleyici (Debounce Circuit)** konusunu teorik temelleri, RTL donanım sentezi kuralları ve simülasyon testbench adımlarıyla inceleyeceğiz.

### 📌 Bu Bölümde Öğrenecekleriniz:
- **Mekanik Buton Titreşim Önleyici (Debounce Circuit)** kavramının sayısal çip tasarımındaki (ASIC & FPGA) rolü
- Sentezlenebilir (synthesizable) RTL mimari kuralları ve bellek/kapı çıkarımları
- IEEE 1364 Verilog standartlarına uygun modül ve sinyal tanımlama
- Simülasyon araçlarında sinyal doğrulama ve dalga biçimi analizi`,
      },
      {
        title: "2. Donanım Mimarisi & Devre Şeması",
        content: `![Mekanik Buton Titreşim Önleyici (Debounce Circuit) Şeması](/images/verilog/debounce-bounce-timing.svg)

![Mekanik Buton Titreşim Önleyici (Debounce Circuit) Şeması](/images/verilog/debounce-counter-block.svg)

![Mekanik Buton Titreşim Önleyici (Debounce Circuit) Şeması](/images/verilog/debounce-shift-block.svg)

Yukarıdaki blok diyagramında devrenin donanım yerleşimi, giriş/çıkış portları ve saat darbesi altındaki sinyal geçişleri gösterilmektedir. Fiziksel silikonda her bir blok bağımsız bir mantık öbeğine karşılık gelir.`,
      },
      {
        title: "3. Genel Bakış & Giriş",
        content: `Clock & Timing Verilog Debounce Circuit Verilog Debounce Circuit A debounce circuit filters the noisy signal from a mechanical button or switch so that one press produces exactly one clean transition. In Verilog, a debouncer synchronizes the raw input to the clock, then changes its output only after the input has stayed at a new level for a fixed time, typically a few milliseconds. 12 min read | Beginner Level`,
      },
      {
        title: "4. What You'll Learn",
        content: `Why mechanical contacts bounce, and what bouncing does to digital logic Write a counter-based debouncer with an input synchronizer Write a shift register debouncer and compare the two approaches Size the debounce time for real hardware and test the debouncer efficiently in simulation`,
      },
      {
        title: "5. What is debouncing ?",
        content: `Mechanical buttons and switches do not make a clean transition from 0 to 1. When the contacts close, they bounce against each other, making and breaking contact many times before settling. A typical bounce lasts about 5 to 20 ms, which is hundreds of thousands of cycles of a 50 MHz clock. Digital logic sees every bounce as a separate edge. Without debouncing, one press can register as several presses: a counter increments several times, a state machine skips states, or an action runs repeatedly. Debouncing replaces the burst of edges with a single clean change.`,
      },
      {
        title: "6. Counter Based Debouncer",
        content: `The most common and reliable approach waits until the input has been stable for a set time before passing it on:`,
      },
      {
        title: "7. Örnek Verilog RTL & Doğrulama Kodu",
        content: `Aşağıdaki kod bloğu **Mekanik Buton Titreşim Önleyici (Debounce Circuit)** için sentezlenebilir Verilog modülünü ve sinyal yapısını göstermektedir:`,
        callout: {
          type: "tip",
          title: "Donanım Mühendisliği Altın Kuralı",
          message: "Verilog yazarken C gibi satır satır çalışan bir yazılım değil; paralel çalışan transistör kapıları, registerlar ve iletken yollar tasarladığınızı unutmayınız.",
        },
        code: {
          language: "verilog",
          caption: "verilog-debounce-circuit.v - Örnek Donanım Modülü",
          snippet: `module debouncer #(
    parameter CLK_FREQ = 50_000_000,    // Clock frequency in Hz
    parameter DEBOUNCE_TIME_MS = 20     // Debounce time in milliseconds
)(
    input wire clk,           // System clock
    input wire rst_n,         // Active low reset
    input wire button_in,     // Raw button input (noisy)
    output reg button_out     // Debounced button output
);

    // Calculate counter value for debounce time
    localparam COUNTER_MAX = (CLK_FREQ / 1000) * DEBOUNCE_TIME_MS;
    localparam COUNTER_WIDTH = $clog2(COUNTER_MAX + 1);

    // Internal registers
    reg [COUNTER_WIDTH-1:0] counter;
    reg button_sync_0, button_sync_1;

    // Double-flop synchronizer to avoid metastability
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            button_sync_0 <= 1'b0;
            button_sync_1 <= 1'b0;
        end else begin
            button_sync_0 <= button_in;
            button_sync_1 <= button_sync_0;
        end
    end

    // Debounce logic
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            counter <= 0;
            button_out <= 1'b0;
        end else begin
            if (button_sync_1 != button_out) begin
                // Input differs from output, start/continue counting
                counter <= counter + 1;
                if (counter >= COUNTER_MAX) begin
                    button_out <= button_sync_1;
                    counter <= 0;
                end
            end else begin
                // Input matches output, reset counter
                counter <= 0;
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
          caption: "verilog-debounce-circuit_tb.v - Simülasyon Testbench",
          snippet: `module debouncer_shift #(
    parameter CLK_FREQ = 50_000_000,    // Clock frequency in Hz
    parameter SAMPLE_RATE_MS = 1        // Sample rate in milliseconds
)(
    input wire clk,           // System clock
    input wire rst_n,         // Active low reset
    input wire button_in,     // Raw button input
    output reg button_out     // Debounced output
);

    // Calculate sampling period
    localparam SAMPLE_PERIOD = (CLK_FREQ / 1000) * SAMPLE_RATE_MS;
    localparam SAMPLE_WIDTH = $clog2(SAMPLE_PERIOD + 1);

    reg [SAMPLE_WIDTH-1:0] sample_counter;
    reg sample_tick;
    reg [7:0] shift_reg;  // 8-bit shift register
    reg button_sync_0, button_sync_1;

    // Synchronizer
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            button_sync_0 <= 1'b0;
            button_sync_1 <= 1'b0;
        end else begin
            button_sync_0 <= button_in;
            button_sync_1 <= button_sync_0;
        end
    end

    // Sample rate generator: one-cycle tick every SAMPLE_PERIOD clocks
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            sample_counter <= 0;
            sample_tick <= 0;
        end else begin
            if (sample_counter >= SAMPLE_PERIOD - 1) begin
                sample_counter <= 0;
                sample_tick <= 1;
            end else begin
                sample_counter <= sample_counter + 1;
                sample_tick <= 0;
            end
        end
    end

    // Shift register debouncer
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            shift_reg <= 8'h00;
            button_out <= 1'b0;
        end else if (sample_tick) begin
            shift_reg <= {shift_reg[6:0], button_sync_1};

            // Output is high if all bits are 1, low if all bits are 0
            if (shift_reg == 8'hFF)
                button_out <= 1'b1;
            else if (shift_reg == 8'h00)
                b
// ... (testbench devamı)`,
        },
      },
    ],
    playground: {
      initialCode: `module debouncer #(
    parameter CLK_FREQ = 50_000_000,    // Clock frequency in Hz
    parameter DEBOUNCE_TIME_MS = 20     // Debounce time in milliseconds
)(
    input wire clk,           // System clock
    input wire rst_n,         // Active low reset
    input wire button_in,     // Raw button input (noisy)
    output reg button_out     // Debounced button output
);

    // Calculate counter value for debounce time
    localparam COUNTER_MAX = (CLK_FREQ / 1000) * DEBOUNCE_TIME_MS;
    localparam COUNTER_WIDTH = $clog2(COUNTER_MAX + 1);

    // Internal registers
    reg [COUNTER_WIDTH-1:0] counter;
    reg button_sync_0, button_sync_1;

    // Double-flop synchronizer to avoid metastability
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            button_sync_0 <= 1'b0;
            button_sync_1 <= 1'b0;
        end else begin
            button_sync_0 <= button_in;
            button_sync_1 <= button_sync_0;
        end
    end

    // Debounce logic
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            counter <= 0;
            button_out <= 1'b0;
        end else begin
            if (button_sync_1 != button_out) begin
                // Input differs from output, start/continue counting
                counter <= counter + 1;
                if (counter >= COUNTER_MAX) begin
                    button_out <= button_sync_1;
                    counter <= 0;
                end`,
      language: "verilog",
    },
    quiz: {
      question: "Mekanik Buton Titreşim Önleyici (Debounce Circuit) ile ilgili aşağıdaki ifadelerden hangisi doğrudur?",
      options: ["Verilog'da tasarlanan donanım blokları silikon üzerinde paralel (eşzamanlı) çalışır.", "Verilog kodları işlemci üzerinde satır satır sıralı olarak derlenir ve işletilir.", "Tüm Verilog ifadeleri istisnasız sentezlenebilir donanım kapılarına dönüşür.", "Verilog'da saat darbesi olmadan ardışıl (sequential) flip-flop tasarımı yapılamaz."],
      correctIndex: 0,
      explanation: "Donanım Tanımlama Dillerinde (HDL) modüller fiziksel elektronik devreleri tarif eder ve hepsi aynı anda paralel olarak çalışır.",
    },
  },
};
