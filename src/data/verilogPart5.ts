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
        title: "1. Sentez (Synthesis) Nedir?",
        content: `Verilog sentezi (synthesis); dijital devreleri ve sistemleri tanımlayan üst düzey Verilog kodunun, donanım düzeyinde fiziksel olarak gerçeklenebilecek alt düzey bir devre gösterimine dönüştürülmesi sürecidir. Bu dönüşümün sonucunda genellikle kapı seviyesinde bir netlist (gate-level netlist) elde edilir. Netlist; hedef donanımda (FPGA veya ASIC) fiziksel olarak eşlenebilen mantık kapıları (logic gates) ve flip-flop'lar gibi temel donanım bileşenlerinin ara bağlantılarını içerir. Sentez araçları sadece soyut RTL kodunu dönüştürmekle kalmaz, aynı zamanda tasarımı alan (area), zamanlama (timing) ve güç tüketimi (power consumption) gibi kısıtlara göre optimize eder.`,
      },
      {
        title: "2. Sentez İşlemi Nasıl Gerçekleştirilir?",
        content: `Sentez süreci, kural olarak yazmaç aktarım düzeyinde (Register Transfer Level - RTL) yazılmış ve sentezlenebilir (synthesizable) Verilog alt kümesine uyan kodlarla başlar. Sentez aracı; mantık optimizasyonu algoritmaları uygulayarak kapı sayısını azaltır ve performansı artırır. Tasarımcının belirlediği zamanlama kısıtları (timing constraints), sentez aracına hız ve başarım optimizasyonunda rehberlik eder. Son çıktı, devreyi temel mantık kapıları ve flip-flop'lar cinsinden tanımlayan kapı seviyesi bir netlist'tir. Sektörde Synopsys Design Compiler, Cadence Genus, Xilinx/AMD Vivado ve Intel Quartus gibi sentez araçları kullanılır. Farklı sentez araçları RTL kodunu farklı optimizasyon stratejileriyle yorumlayabileceğinden, sentezlenmiş netlist sonuçları araçtan araca değişiklik gösterebilir.`,
      },
      {
        title: "3. Sentez Kısıt Dosyası (SDC) Nedir ve Nasıl Kullanılır?",
        content: `Sentez Kısıt Dosyası (Synthesis Constraint File), dijital tasarımlarda zamanlama, alan ve güç hedeflerini tanımlamak için endüstri standardı olan Synopsys Design Constraints (SDC) formatında yazılır. Sentez aşamasında SDC dosyası, Synopsys Design Compiler gibi araçlara optimizasyon hedeflerini bildirir. Örnek bir SDC kısıt dosyası yapısı: # SDC dosya sürümü: set_version 2.1 # Saat tanımı (100 MHz clock): create_clock -period 10 [get_ports clk] # Giriş gecikme kısıtları: set_input_delay -max 2 [get_ports data_in[*]] -clock [get_clocks clk] ; set_input_delay -min 1 [get_ports data_in[*]] -clock [get_clocks clk] # Çıkış gecikme kısıtları: set_output_delay -max 3 [get_ports data_out[*]] -clock [get_clocks clk] ; set_output_delay -min 1 [get_ports data_out[*]] -clock [get_clocks clk] # Çıkış yük kapasitansı: set_load 0.01 [get_ports data_out[*]] # Yanlış yollar (false path): set_false_path -from [get_ports reset] -to [get_ports data_out[*]] # Maksimum fanout sınırı: set_max_fanout 10 [get_ports data_in[*]] Bu kısıtlar olmadan sentez aracı devreyi hedeflenen zamanlama toleranslarına (setup ve hold) göre optimize edemez.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Kodlama Tarzının Senteze Etkisi (Coding Style Effect)",
        content: `Verilog, dijital devreleri ve sistemleri tasarlamak için kullanılan bir donanım açıklama dilidir (HDL). Verilog kodunu tutarlı ve modüler bir tarzda yazmak; kodun okunabilirliğini, bakım kolaylığını ve hatasız olmasını sağlamak açısından son derece önemlidir. Daha da önemlisi, kodlama tarzı sentez sürecini doğrudan etkiler. Üst düzey Verilog kodunun kapı seviyesinde bir netlist'e dönüştürülme biçimi, RTL'deki ifade şekline bağlıdır. İyi yapılandırılmış bir kodlama tarzı; daha az donanım kaynağı, daha küçük silikon alanı (area) ve daha düşük güç tüketimi sağlar. Aynı Mod-3 sayıcı (counter) işlevini gerçekleştiren farklı yazım şekilleri, sentez aracının reset ve karşılaştırma mantığını sentezlemesinde belirgin donanım farklılıklarına yol açar. Alan, güç ve yeniden kullanılabilirlik arasında mühendislik dengeleri (trade-offs) mevcuttur.`,
      },
      {
        title: "2. Örnek 1: Boole Mantık İfadeleriyle Mod-3 Sayıcı",
        content: `module cntr_mod3 (input clk, rstn, output reg [1:0] out); always @(posedge clk) begin if (!rstn | out[1] & out[0]) out <= 0; else out <= out + 1; end endmodule Sentez Analizi: Sentez aracı bu yapıyı doğrudan tanımlandığı gibi tek bir AND ve tek bir OR kapısı kullanarak gerçekler. Minimum kapı sayısı ve basit bir lojik yapı elde edilir.`,
      },
      {
        title: "3. Örnek 2: Öncelikli if-else İfadeleriyle Mod-3 Sayıcı",
        content: `module cntr_mod3 (input clk, rstn, output reg [1:0] out); always @(posedge clk) begin if (!rstn) out <= 0; else if (out == 3) out <= 0; else out <= out + 1; end endmodule Sentez Analizi: Sentez aracı bu yapıyı öncelik mantığı (priority logic) içeren iki kademeli çoklayıcı (multiplexer) devresi olarak sentezler. Karşılaştırıcı (comparator) ve iki MUX kullanımı, ilk yaklaşıma göre daha fazla kapı, dolayısıyla daha yüksek alan ve güç tüketimi anlamına gelir.`,
      },
      {
        title: "4. Örnek 3: İndirgeme Operatörü (Reduction Operator) ile Mod-3 Sayıcı",
        content: `module cntr_mod3 (input clk, rstn, output reg [1:0] out); always @(posedge clk) begin if (!rstn) out <= 0; else if (&out) out <= 0; else out <= out + 1; end endmodule Sentez Analizi: Sentez aracı tek bir MUX ve tek bir indirgeme AND bileşeni sentezler. RTL kodundaki küçük bir operatör tercihinin bile kapı seviyesinde mimariyi ve zamanlama yollarını nasıl doğrudan etkilediği açıkça görülmektedir.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Zamanlama Denetimleri (Timing Checks) Nedir?",
        content: `Dijital devre tasarımında zamanlama denetimleri (timing checks), devrenin hedeflenen zamanlama gereksinimlerini karşıladığını garanti altına almak için vazgeçilmezdir. Bu denetimler, sinyallerin izin verilen zaman sınırları içinde yayıldığını doğrulayarak kurulum zamanı (setup time) ve tutma zamanı (hold time) ihlallerini tespit eder. Zamanlama denetimleri bir Verilog modülü içinde mutlaka specify bloğu içerisine yerleştirilmelidir: specify // Zamanlama denetim ifadeleri endspecify Önemli Not: Zamanlama denetimleri $ karakteriyle başlasa da klasik simülatör sistem görevleri (system tasks) değildir; simülatörün zamanlama motoruna doğrudan bağlı özel specify yönergeleridir.`,
      },
      {
        title: "2. Referans ve Veri Olayları (Reference and Data Events)",
        content: `Tüm zamanlama denetimleri iki temel olaya dayanır: Referans Olayı (Reference Event) ve Veri Olayı (Data Event). Her iki olay da Boole koşullarıyla sınırlandırılabilir. Referans Olayı: Diğer olayları ölçmek için bir zaman referans noktası belirleyen sinyal geçişidir. Genellikle saat kenarları (posedge clk veya negedge clk) gibi kritik kontrol sinyalleridir. Örneğin kurulum zamanı denetiminde referans olayı saatin yükselen kenarıdır. Veri Olayı: Referans olayına göre zamanlaması izlenen sinyaldir; tipik olarak yazmaç veya flip-flop'ların veri girişleridir. Örneğin tutma zamanı denetiminde veri olayı, saat kenarını takip eden veri sinyali geçişidir. specify $setup(data_signal, posedge clk, setup_time_limit); // posedge clk referans olayıdır $hold(posedge clk, data_signal, hold_time_limit); // data_signal veri olayıdır endspecify Zamanlama denetimleri yalnızca koşullar sağlandığında ihlalleri raporlar.`,
      },
      {
        title: "3. Zaman Damgası ve Denetim Olayları (Timestamp and Timecheck Events)",
        content: `Zamanlama denetimlerinin simülasyon ortamında değerlendirilmesi iki olayın zamanına dayanır: Zaman Damgası Olayı (Timestamp Event) ve Zaman Denetimi Olayı (Timecheck Event). Timestamp sinyalinde bir mantıksal geçiş gerçekleştiğinde, simülatör bu geçişin tam simülasyon anını kaydeder (damgalar). Timecheck sinyalinde bir geçiş meydana geldiğinde ise simülatör kaydedilen zaman damgasını mevcut zamanla karşılaştırarak ihlalin (setup veya hold violation) gerçekleşip gerçekleşmediğini değerlendirir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-timing-checks_tb.v - Simülasyon Testbench",
          snippet: `specify
    $setup(data_signal, posedge clk, setup_time_limit);     // posedge clk is reference event
    $hold(posedge clk, data_signal, hold_time_limit);       // data_signal is the data event
endspecify`,
        },
      }

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
        title: "1. Standart Gecikme Formatı (SDF) Nedir?",
        content: `Standart Gecikme Formatı (SDF - Standard Delay Format), elektronik tasarım otomasyonunda (EDA) dijital devrelerin zamanlama bilgilerini ifade etmek için geliştirilmiş bir IEEE standardıdır (IEEE 1497). SDF dosyaları ASCII metin formatındadır; mantık kapısı gecikmelerini (cell delays), yol gecikmelerini (path delays), ara bağlantı gecikmelerini (interconnect delays) ve zamanlama kısıt denetimlerini (setup, hold, recovery, removal vb.) içerir.`,
      },
      {
        title: "2. SDF Ne İçin Kullanılır ve Tasarım Akışındaki Yeri Nedir?",
        content: `SDF, statik zamanlama analizi (STA) ile dinamik simülasyon arasında köprü görevi görür ve dijital devrelerdeki gecikmelerin simülasyonda en yüksek doğrulukla modellenmesini sağlar. Zamanlama Gösterimi: Kapıların, flip-flop'ların ve ara bağlantı hatlarının gerçek fiziksel gecikmelerini standart bir formatta sunar. Birlikte Çalışabilirlik (Interoperability): Ortak bir endüstri standardı olduğu için farklı EDA araçları (sentez, yerleşim-yönlendirme P&R, STA ve simülatörler) arasında sorunsuz veri alışverişi sağlar. Geri Besleme (Back-Annotation): Fiziksel yerleşim sonrasında çıkarılan parazitik gecikmeler SDF dosyası aracılığıyla kapı seviyesi netlist simülatörüne aktarılır (gate-level simulation with SDF). Böylece simülasyon, çip üretildiğinde oluşacak gerçek silikon gecikmelerini yansıtır. İleriye Dönük Bilgilendirme (Forward Annotation): Sentez öncesinde veya erken aşamalarda optimizasyon algoritmalarını yönlendirmek amacıyla gecikme tahminleri sağlamak için de kullanılabilir.`,
      },
{
        title: "3. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "4. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. SDF Geri Beslemesi (Back-Annotation) Nedir?",
        content: `SDF Geri Beslemesi (SDF Back-annotation), bir Standard Delay Format (SDF) dosyasındaki yol gecikmeleri (path delays), specparam değerleri, zamanlama kısıt limitleri ve ara bağlantı gecikmelerinin kapı seviyesi netlist simülasyonuna aktarılması işlemidir. Bu teknik, dijital tasarımın zamanlama davranışlarının sentez ve fiziksel yerleşim (layout) sonrasında gerçeğe uygun şekilde doğrulanması için hayati öneme sahiptir. Simülasyon sırasında netlist'teki her bir hücre ve sinyal hattı, varsayılan kütüphane gecikmeleri yerine SDF dosyasından okunan gerçek fiziksel gecikme değerleriyle güncellenir.`,
      },
      {
        title: "2. $sdf_annotate Sistem Görevi",
        content: `Verilog'da SDF dosyasını simülasyona dahil etmek için $sdf_annotate sistem görevi kullanılır. Bu komut, simülatöre belirtilen SDF dosyasını okumasını ve içerisindeki gecikme verilerini hiyerarşide hedeflenen modül örneğine (instance) uygulamasını söyler: initial begin $sdf_annotate("/path/to/timing_data.sdf", top_level_instance); end Bu komut tipik olarak testbench içerisinde initial bloğunun başında çağrılır.`,
      },
      {
        title: "3. SDF Annotator ve Simülasyon Raporlarının İncelenmesi",
        content: `SDF Annotator, SDF zamanlama verilerini ayrıştırıp Verilog simülatörünün veri yapılarına işleyen araç bileşenidir. Eşleşmeyen bir durumla karşılaştığında uyarı (warning) üretir: elab: *W, SBNFSDF: Attempt to annotate specify block data of instance tb.DUT.path_to_cell of module example, which has no specify block <path/to/timing_data.sdf>, line 56531>. SDF dosyası Verilog timing yapısı dışındaki bilgileri de içerebilir; ilgili olmayan yapılar uyarısız göz ardı edilir. SDF dosyasında tanımlanmamış bir zamanlama parametresi varsa simülasyonda önceki varsayılan değerini korur. Örnek SDF istatistik raporu: Compiled SDF file: /path/to/timing_data.sdf, Backannotation scope: tb.DUT.path_to_module_inst, Total Annotated Path Delays = 12412 / 12412 (%100.0). Mühendislik İpucu: Kapı seviyesi simülasyonların doğruluğundan emin olmak için SDF annotator log dosyasını her zaman inceleyin ve ek açıklama oranının (annotation percentage) %100'e yakın olduğunu teyit edin.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-sdf-annotate_tb.v - Simülasyon Testbench",
          snippet: `elab: *W, SBNFSDF: Attempt to annotate specify block data of instance tb.DUT.path_to_cell of module example, which has no specify block <path/to/timing_data.sdf>, line 56531>`,
        },
      }

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
        title: "1. Verilog Matematik Fonksiyonlarına Giriş",
        content: `Verilog matematik fonksiyonları, donanım açıklamalarında ve test ortamlarında sabit ifadeler (constant expressions) yerine kullanılabilen yardımcı sistem fonksiyonlarıdır. Hem tamsayı (integer) hem de gerçel sayı (real/floating-point) tabanlı matematiksel işlemleri destekler.`,
      },
      {
        title: "2. Tamsayı Matematik Fonksiyonları ($clog2)",
        content: `Verilog'daki en kritik tamsayı matematik fonksiyonu $clog2'dir. Verilen argümanın 2 tabanındaki logaritmasının yukarı yuvarlanmış tamsayı değerini (ceiling of log2) döndürür. Dijital tasarımda bu fonksiyon, belirli bir bellek boyutunu, FIFO derinliğini veya modül parametresini adreslemek için gereken minimum adres yolu bit genişliğini otomatik olarak hesaplamada standarttır. Örneğin tasarımda 7 paralel toplayıcı varsa, bunları adreslemek için gereken bit sayısı $clog2(7) = 3 olarak hesaplanır: module des #(parameter NUM_UNITS = 7) (input [$clog2(NUM_UNITS)-1:0] active_unit); initial $monitor("active_unit = %d", active_unit); endmodule. Bu fonksiyonun parametrik port tanımlarında kullanılması kodun genelleştirilebilirliğini ve yeniden kullanılabilirliğini (reusability) artırır.`,
      },
      {
        title: "3. Gerçel Sayı (Real) Matematik Fonksiyonları",
        content: `Verilog; gerçel sayı (real) türündeki argümanları kabul eden ve gerçel sonuç döndüren zengin bir matematiksel fonksiyon kümesine sahiptir. Başlıca fonksiyonlar: $ln(x) doğal logaritma, $log10(x) 10 tabanında logaritma, $exp(x) üstel fonksiyon (e^x), $sqrt(x) karekök, $pow(x, y) üs alma (x^y), $floor(x) tabana yuvarlama, $ceil(x) tavana yuvarlama, $sin(x)/$cos(x)/$tan(x) radyan cinsinden trigonometrik fonksiyonlar, $asin/$acos/$atan ters trigonometrik fonksiyonlar, $hypot(x, y) hipotenüs sqrt(x^2 + y^2), $sinh/$cosh/$tanh hiperbolik fonksiyonlardır. Örnek testbench: module tb; real x, y; initial begin x = 10000; $display("$log10(%0.3f) = %0.3f", x, $log10(x)); x = 25; $display("$sqrt(%0.3f) = %0.3f", x, $sqrt(x)); x = 5; y = 3; $display("$pow(%0.3f, %0.3f) = %0.3f", x, y, $pow(x, y)); end endmodule.`,
      },
      {
        title: "4. Tasarım İpucu: Sentezlenebilirlik ve Matematik Fonksiyonları",
        content: `Donanım Mühendisliği Tasarım İpucu: $clog2 fonksiyonu modern sentez araçları (Vivado, Design Compiler, Quartus vb.) tarafından tam olarak desteklenir ve parametrik port/yazmaç boyutlandırmalarında standart olarak kullanılır. Ancak diğer gerçel sayı ve trigonometrik fonksiyonlar ($sin, $cos, $sqrt, $pow vb.) sentezlenemez (non-synthesizable). Bu fonksiyonlar yalnızca testbench modelleme, analog/karışık sinyal (AMS) simülasyonları veya derleme zamanında arama tabloları (lookup table - LUT) oluşturmak için kullanılır.`,
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
{
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Tür Dönüşüm Fonksiyonlarına Giriş",
        content: `Verilog'da tür dönüşüm fonksiyonları; tamsayılar (integer), gerçel sayılar (real) ve ikili bit temsilleri (bit representations) arasında veri dönüşümü gerçekleştirmek için kullanılır. Bu fonksiyonlar özellikle simülasyon ve testbench ortamlarında farklı veri tiplerinin manipülasyonunu ve temsilini kolaylaştırır.`,
      },
      {
        title: "2. $rtoi Fonksiyonu (Real to Integer)",
        content: `Gerçel bir sayıyı tamsayıya (integer) dönüştürür. Bu fonksiyon, gerçel sayının kesirli kısmını kırparak (truncate ederek) tamsayı kısmını almak istediğinizde kullanılır: integer int_val; int_val = $rtoi(192.15); // int_val değeri 192 olur.`,
      },
      {
        title: "3. $itor Fonksiyonu (Integer to Real)",
        content: `Bir tamsayıyı gerçel sayıya (real) dönüştürür. Tamsayı değerlerle başlayan ancak gerçel sayılar içeren hassas hesaplamalar yapılması gereken durumlarda kullanılır: real real_val; real_val = $itor(192); // real_val değeri 192.0 olur.`,
      },
      {
        title: "4. $realtobits Fonksiyonu (Real to Bits)",
        content: `Gerçel bir sayıyı 64-bit IEEE 754 standartlarındaki ikili (bit) eşdeğerine dönüştürür. Bu fonksiyon, kayan noktalı sayıların (floating-point) belleklerde saklanması, veri yollarında iletilmesi veya ikili formatta paketlenmesi gerektiğinde kullanılır: reg [63:0] bits; bits = $realtobits(real_val);. Ters dönüşüm için ise $bitstoreal fonksiyonu kullanılır.`,
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
          caption: "verilog-conversion-functions.v - Örnek Donanım Modülü",
          snippet: `integer     $rtoi(real_val);   // For example, 192.15 becomes 192`,
        },
      },
{
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-conversion-functions_tb.v - Simülasyon Testbench",
          snippet: `real        $itor(int_val);    // For example, 192 becomes 192.0`,
        },
      }

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
        title: "1. Verilog Uygulama Örnekleri ve Tasarım Modelleri",
        content: `Verilog ile dijital tasarım pratiği için temel yapı taşlarından karmaşık sistem mimarilerine kadar uzanan yaygın örnekler: Temel Elemanlar: Merhaba Dünya (Hello World), JK Flip-Flop, Asenkron Sıfırlamalı D Flip-Flop, T Flip-Flop, D Mandalı (D Latch). Sayıcılar (Counters): 4-bit İleri/Geri Sayıcı, Dalgalı Sayıcı (Ripple Counter), Halka Sayıcı (Straight Ring Counter), Johnson Sayıcı, Mod-N Sayıcı, Gray Sayıcı. Dijital Kombinasyonel ve Ardışıl Bloklar: n-bit Kaydırmalı Yazmaç (Shift Register), İkiliden Gray Koda Dönüştürücü (Binary to Gray Converter), Öncelikli Kodlayıcı (Priority Encoder), 4x1 Çoklayıcı (Multiplexer), Tam Toplayıcı (Full Adder). Bellek ve İletişim Blokları: Tek Portlu RAM (Single Port RAM), Örüntü Dedektörü (Pattern Detector), Sonlu Durum Makineli Dizi Dedektörü (Sequence Detector), Senkron FIFO (Synchronous FIFO), Yığın Bellek (Stack / LIFO).`,
      },
      {
        title: "2. Tasarım Özeti: Donanım Mimarisi ve En İyi Uygulamalar",
        content: `Donanım Mühendisliği Tasarım İlkeleri: 1. Kombinasyonel ve Ardışıl Blok Ayrımı: Kombinasyonel mantık için always @(*), ardışıl mantık için always @(posedge clk) bloklarını net bir şekilde ayırın. 2. Atama Kuralları: Ardışıl mantıkta yarış durumlarını (race conditions) önlemek için mutlaka engellemeyen atama (<=), kombinasyonel bloklarda ise engelleyen atama (=) kullanın. 3. İstenmeyen Mandal (Latch) Çıkarımını Önleme: Kombinasyonel always bloklarında tüm if-else dallarını tamamlayın ve case yapılarında mutlaka bir default kolu tanımlayın; aksi takdirde sentez aracı istem dışı latch üretecektir.`,
      }

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
        title: "1. İki Yazmacın Değerini Geçici Değişken Kullanarak ve Kullanmadan Takas Etme (Swap)",
        content: `1. Geçici Değişken Kullanarak Takas: always @(posedge clk) begin temp = b; b = a; a = temp; end. 2. Geçici Değişken Kullanmadan Takas (Donanım Yaklaşımı): always @(posedge clk) begin a <= b; b <= a; end. Çalışma Mantığı: Engellemeyen atamalar (non-blocking assignment <=) geçerli saat kenarında (delta cycle) tüm ifadelerin sağ tarafındaki (RHS) değerleri örnekler ve döngünün sonunda sol taraflara (LHS) eşzamanlı olarak atar. Donanımda bu durum, çıkışları birbirinin girişine bağlı iki paralel flip-flop'a karşılık gelir ve ek bir saklayıcıya gerek duyulmaz.`,
      },
      {
        title: "2. Verilog'da Dosya Giriş/Çıkış (File I/O) İşlemleri",
        content: `Verilog; simülasyon ve testbench ortamlarında dosyalardan veri okumak ve dosyalara veri yazmak için zengin bir dosya G/Ç altyapısı sunar. Bu işlemler C programlama dilindeki standart dosya işlemlerine benzer. Sık kullanılan sistem görevleri: $fopen (dosya açma), $fclose (dosya kapatma), $fdisplay ve $fwrite (biçimlendirilmiş veri yazma), $fscanf (biçimlendirilmiş veri okuma), $readmemh ve $readmemb (bellek dizilerini hex veya binary dosyalardan doğrudan doldurma). Bu görevler yalnızca simülasyon amaçlıdır ve sentezlenemez.`,
      },
      {
        title: "3. İfadeler Arası (Inter-statement) ve İfade İçi (Intra-statement) Gecikme Farkı",
        content: `İfadeler Arası Gecikme (Inter-statement Delay): Gecikme (#delay) ifadenin en solundadır (#10 a = b;). Simülatör 10 zaman birimi bekler, süre dolduğunda b'nin o anki değerini örnekler ve a'ya atar. İfade İçi Gecikme (Intra-statement Delay): Gecikme atama operatörünün sağındadır (a = #10 b; veya a <= #10 b;). b'nin değeri hemen o an örneklenir, ancak sol taraftaki a değişkenine atanması 10 zaman birimi geciktirilir. Bu fark simülasyonda sinyal örnekleme anını ve yarış durumlarını doğrudan etkiler.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-1_tb.v - Simülasyon Testbench",
          snippet: `always @(posedge clk) begin
	a <= b;
    b <= a;
end`,
        },
      }

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
        title: "1. HDL Simülatörleri Nedir ve Ne İşe Yarar?",
        content: `HDL (Donanım Açıklama Dili) simülatörleri, dijital donanım tasarımı ve doğrulamasında (verification) kullanılan kritik yazılım araçlarıdır. Verilog ve VHDL gibi donanım açıklama dillerinde yazılmış dijital devrelerin mantıksal ve zamana bağlı elektriksel davranışlarını simüle ederler. Simülatörler, tasarımcıların devrelerini fiziksel bir donanıma (FPGA veya ASIC) aktarmadan önce işlevsellik, zamanlama ve performans açısından test etmelerine olanak tanır. Mikroişlemciler, FPGA ve ASIC gibi karmaşık dijital sistemlerin tasarım ve doğrulama süreçlerinde vazgeçilmezdirler. Bağımsız yazılım araçları, grafiksel kullanıcı arayüzlü (GUI) entegre geliştirme ortamları (IDE) veya bulut tabanlı platformlar olarak bulunurlar.`,
      },
      {
        title: "2. Sürekli Atama (Continuous Assignment) Nedir?",
        content: `Verilog'da sürekli atama (continuous assignment), bir tele (wire veya net) girişler değiştikçe sürekli olarak değer atamak için kullanılır. Bir olaya veya koşula bağlı olarak tetiklenen prosedürel atamaların (always blokları içindeki atamalar) aksine, sürekli atamalar daima aktiftir ve giriş ifadelerindeki en ufak bir değişimde çıkışı anında günceller. Sürekli atama assign anahtar kelimesi ve ardından gelen mantıksal ifade ile tanımlanır. Tipik olarak çıkışın yalnızca o anki girişlere bağlı olduğu kombinasyonel mantık devrelerini modellemek için kullanılır: assign out = (a & b) | c; // (a ve b)'nin c ile mantıksal VEYA sonucunu out teline atar. assign enable = (reset_n & enable_i); // reset_n ve enable_i mantıksal VE sonucunu enable teline atar.`,
      },
      {
        title: "3. \`define Direktifi Değişken Tabanlı Metin İkamesi İçin Kullanılabilir mi?",
        content: `Hayır, Verilog'da \`define direktifi değişken tabanlı dinamik metin ikamesi için kullanılamaz; yalnızca derleme öncesi sabit metin (literal text) ikamesi yapabilir. \`define, C dilindeki preprocessor direktiflerine benzer şekilde bir derleyici önişlemci yönergesidir ve simülasyon/derleme öncesi kaynak koddaki metinleri birebir değiştirir. Çalışma zamanı değişkenleri (runtime variables) önişlemci aşamasında henüz var olmadığından bir değişkenin içeriğine göre metin ikamesi yapmak mümkün değildir. Dinamik veya yapılandırılabilir donanım davranışları için önişlemci makroları yerine Verilog modül parametreleri (parameter, localparam) veya SystemVerilog yapıları (generate blokları) tercih edilmelidir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
      }

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
        title: "1. Verilog Simülasyon Regresyonlarında Dikkat Edilmesi Gereken Kritik Noktalar",
        content: `Simülasyon regresyonları (regression testing), dijital devre tasarım doğrulama döngüsünün hayati bir parçasıdır. Tasarımın farklı çalışma koşulları ve parametreler altındaki davranışını belirlemek için yüzlerce veya binlerce test senaryosunun otomatik olarak çalıştırılmasını kapsar. Regresyon yürütülürken dikkat edilmesi gereken temel noktalar: 1. Test Kapsamı (Test Coverage): Devrenin hedeflenen spesifikasyonları eksiksiz karşıladığından emin olmak için tüm olası sınır durumların (corner cases) ve kod dallarının test edilmesi şarttır. 2. Ölçeklenebilirlik (Scalability): Tasarım karmaşıklaştıkça test sayısı hızla artar; regresyon ortamı ve testbench mimarisi sunucu çiftliklerinde paralel koşulabilecek şekilde ölçeklenebilir olmalıdır. 3. Hata Ayıklama Yetenekleri (Debugging Capabilities): Hatalı testlerin hızla tespit edilmesi için kapsamlı loglama, tohum (seed) saklama ve dalga biçimi kaydı sağlanmalıdır. 4. Simülasyon Doğruluğu: Simülasyonun elektriksel ve zamansal doğruluğu, test kapsamının derinliğini ve güvenilirliğini doğrudan belirler.`,
      },
      {
        title: "2. assign ve Prosedürel İfadelerde Gecikme Belirtmenin Yan Etkileri",
        content: `Gecikmeler (#delay) donanımda sentezlenemez (non-synthesizable). Sentez araçları assign, blocking veya non-blocking prosedürel ifadelerde belirtilen tüm gecikme değerlerini tamamen yok sayar. Eğer tasarımın mantıksal işlevselliği bu gecikmelerin varlığına bağımlıysa, RTL simülasyonu ile sentezlenmiş kapı seviyesi netlist arasında fonksiyonel tutarsızlıklar (simulation-synthesis mismatch) ortaya çıkar: z <= #5 x; // #5 gecikmesi sentezde yok sayılır! #10 z <= x; // #10 gecikmesi sentezde yok sayılır!`,
      },
      {
        title: "3. Birden Fazla Sürecin Aynı Değişkene Yazmasının Yan Etkileri (Multi-Driver)",
        content: `Birden fazla sürecin (proses veya always bloğunun) aynı değişkene eşzamanlı yazması dijital tasarımda ciddi yan etkilere yol açar: 1. Yarış Durumları (Data Races): Uygun senkronizasyon olmadan aynı değişkene eşzamanlı erişim belirsizlik yaratır. Simülatörün işletim sırasına göre tahmin edilemeyen sonuçlar doğar. 2. Tutarsız Değerler (Inconsistent Values): Bir süreç değişkeni güncellerken diğeri eski değeri okuyabilir. 3. Atomik Olmayan Güncellemeler: Güncelleme çok adımlı gerçekleştiğinde kısmi güncellemeler ve tanımsız durumlar (X durumu) oluşur. 4. Kilitlenmeler (Deadlocks) ve Sentez Hataları: Çoğu linting ve sentez aracı aynı hatta birden fazla sürücü bağlandığında (multiple driver contention) doğrudan hata verir; donanımda bu durum kısa devre ve aşırı akıma karşılık gelir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog'daki Temel Veri Türleri Nelerdir?",
        content: `Verilog'da donanım öğelerini ve sinyalleri temsil etmek için kullanılan temel veri türleri şunlardır: Wire: Modüller ve mantık kapıları arasındaki fiziksel bağlantı hatlarını temsil eder. Bir telin yalnızca bir sürücüsü olabilir (tri-state durumlar hariç); bir modülden çıkış, diğerine giriş olarak bağlanır. Reg: Verilog tasarımında yazmaçları veya veri saklama öğelerini temsil eder. Yalnızca prosedürel bloklar (always, initial) içerisinde değer atanabilir; duruma göre flip-flop veya kombinasyonel mantık olarak sentezlenir. Integer: 32-bit işaretli tamsayıları temsil eder (-2147483648 ile 2147483647 arası). Genellikle döngü sayaçlarında ve testbench ortamlarında kullanılır.`,
      },
      {
        title: "2. Verilog Ne İçin Kullanılır?",
        content: `Verilog; dijital devreleri ve tümleşik sistemleri tasarlamak, modellemek ve simüle etmek için kullanılan standart bir Donanım Açıklama Dilidir (HDL). Haberleşme, tüketici elektroniği, otomotiv, savunma sanayii ve endüstriyel otomasyon gibi pek çok alanda özel entegre devrelerin (ASIC) ve sahada programlanabilir kapı dizilerinin (FPGA) tasarımı ve doğrulanmasında yaygın olarak kullanılır.`,
      },
      {
        title: "3. Verilog Kodlarını Simüle Etmek İçin Hangi Yazılımlar Kullanılır?",
        content: `Verilog kodlarını simüle etmek için endüstride ve akademide kullanılan başlıca yazılım araçları: ModelSim / Questa (Siemens/Mentor): Yaygın kullanılan güçlü GUI ve hata ayıklama yeteneklerine sahip simülatör. Xcelium (Cadence): Çok çekirdekli yüksek hızlı simülasyon ve gelişmiş doğrulama paketi. VCS (Synopsys): Büyük ölçekli karmaşık ASIC/SoC doğrulamalarında endüstri standardı derleyici tabanlı yüksek performanslı simülatör. Icarus Verilog: Açık kaynaklı, hızlı ve ücretsiz Verilog simülatörü. Xilinx/AMD Vivado: Xilinx FPGA tasarımları için yerleşik simülatör ve sentez ortamı. Intel Quartus Prime: Intel/Altera FPGA aileleri için entegre simülasyon ve sentez ortamı. Simülatör seçimi projenin karmaşıklığına, simülasyon hızına ve lisans bütçesine göre belirlenir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. $stop ve $finish Sistem Görevleri Arasındaki Farklar",
        content: `$stop, simülasyonu çağrıldığı noktada askıya alır (duraklatır). Simülatör işletim sisteminde arka planda çalışmaya devam eder ve araç lisansı serbest bırakılmaz. Tasarımcı sinyalleri ve dalga biçimlerini inceledikten sonra simülasyonu kaldığı yerden sürdürebilir; bu nedenle hata ayıklamada (debugging) tercih edilir. $finish ise simülasyon sürecini derhal ve tamamen sonlandırır, kontrolü işletim sistemine devreder ve simülasyon lisansını serbest bırakır. Test senaryosu tamamlandığında testbench'in en sonunda kullanılır.`,
      },
      {
        title: "2. D Flip-Flop ile Frekans Bölücü (f/2) Devresi Tasarımı",
        content: `D flip-flop kullanılarak bir saat frekansını ikiye bölen (divide-by-2) devre, ters çıkışın (Q') doğrudan veri girişine (D) geri bağlanmasıyla gerçekleştirilir: Giriş saati (clk) D flip-flop'un saat girişine bağlanır. Flip-flop'un ters çıkışı Q', D girişine geri beslenir. Saatin her yükselen kenarında flip-flop D girişindeki terslenmiş değeri örnekleyerek Q çıkışına aktarır. Böylece çıkış her saat darbesinde durum değiştirir ve giriş frekansının yarısı (f/2) frekansında, %50 doluluk oranına sahip yeni bir saat sinyali elde edilir. Güvenilir çalışma için giriş saatinin doluluk oranının dengeli olması ve flip-flop kurulum/tutma (setup/hold) zamanlarının karşılanması şarttır.`,
      },
      {
        title: "3. Verilog'da $random Sistem Görevi Nedir ve Nasıl Çalışır?",
        content: `$random, her çağrıldığında 32-bit işaretli sözde rastgele (pseudo-random) bir tamsayı üreten yerleşik bir sistem fonksiyonudur. Sözdizimi: $random(seed);. Belirli bir seed (tohum) değeri verilirse, aynı tohum her simülasyon koşumunda birebir aynı rastgele sayı dizisini üretir; bu özellik hata ayıklamada hataların tekrarlanabilir (reproducible) olmasını sağlar. Pozitif bir aralıkta sayı üretmek için mutlak değer veya modülo operatörleri ({$random} % N) ile birlikte kullanılır.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Mod-3 Sayıcı (Modulo-3 Counter) Verilog Kodu",
        content: `Bir Mod-3 sayıcı 3 duruma (0, 1, 2) sahiptir ve en az 2 flip-flop gerektirir (2^2 = 4 > 3). Sayıcı 2 değerine ulaştığında veya rstn sinyali aktif olduğunda sıfırlanmalıdır: module cntr_mod3 (input clk, rstn, output reg [1:0] out); always @(posedge clk) begin if (!rstn) out <= 0; else if (&out) out <= 0; else out <= out + 1; end endmodule. Burada &out (indirgeme AND operatörü), out[1] ve out[0] aynı anda 1 olduğunda aktif olur; alternatif olarak out == 2 koşulu da doğrudan kullanılabilir.`,
      },
      {
        title: "2. Var Olan Parametre Değerlerini Ezme (Override) Yöntemleri",
        content: `Verilog'da alt modüllerde tanımlı parameter değerleri iki farklı şekilde ezilebilir: 1. Modül Örneklemesi Sırasında (Önerilen Yöntem): module abc #(parameter RESET_VAL = 4) (input ..., output ...); endmodule module xyz (); abc #(.RESET_VAL(10)) u_abc (...); endmodule. 2. defparam Anahtar Kelimesi ile: module xyz (); abc u_abc (...); defparam u_abc.RESET_VAL = 10; endmodule. Not: Modern tasarım standartlarında defparam kullanımı derleyici taşınabilirliği sorunları nedeniyle tavsiye edilmez; doğrudan modül örnekleme sözdizimi (#) tercih edilmelidir.`,
      },
      {
        title: "3. Sentez (Synthesis) Nedir ve Tasarım Akışındaki Yeri Nedir?",
        content: `Sentez, üst düzey donanım açıklama dili (HDL - Verilog/VHDL) kodunun, hedef teknolojiye (ASIC standart hücre kütüphanesi veya FPGA mimarisi) uygun mantık kapıları ve flip-flop'lardan oluşan kapı seviyesinde bir netlist'e dönüştürülmesi sürecidir. Sentez aracı; RTL kodunun işlevselliğini analiz eder, Boole mantığı indirgemeleriyle alanı ve gecikmeyi optimize eder ve devreyi hedef kütüphanedeki gerçek hücrelere eşler (technology mapping). Üretilen netlist daha sonra yerleşim ve yönlendirme (Place & Route) araçları tarafından fiziksel yerleşimde kullanılır.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. FIFO'ların (First-In-First-Out) Farklı Uygulama Alanları",
        content: `FIFO (İlk Giren İlk Çıkar) bellekler dijital tasarımlarda yaygın olarak kullanılır: 1. Bellek ve Veri Tamponlama: Bellek denetleyicileri ve I/O arayüzlerinde veri akış hızını dengelemek için kullanılır. 2. Ağ Yönlendirme ve Anahtarlama (Routers & Switches): Paketlerin sıralı depolanması ve iletilmesi için anahtarlarda kullanılır. 3. Saat Alanı Geçişleri (Clock Domain Crossing - CDC): Farklı saat frekanslarında veya fazlarında çalışan bağımsız saat alanları arasında veri kaybı olmadan güvenli aktarım sağlamak için asenkron FIFO'lar esastır. 4. Multimedya Uygulamaları: Ses ve video işleme hatlarında kesintisiz veri akışı sağlamak için tampon görevi görür. 5. Gerçek Zamanlı Sistemler ve Veri Toplama: Sensörlerden veya ADC'lerden gelen verilerin gecikmesiz işlenmesini sağlar. 6. Grafik İşleme (GPU): Piksel ve çizim komutlarının boru hattında (pipeline) düzenli aktarılmasını sağlar.`,
      },
      {
        title: "2. Verilog'da Sinyal Gücü (Signal Strength) Nasıl Tanımlanır?",
        content: `Verilog'da sinyal gücü, hattın elektriksel sürüş kabiliyetini modellemek için kullanılır. Birden fazla sürücü aynı hatta bağlandığında hangi mantıksal değerin baskın olacağını belirler. İki tür güç tanımlanır: 1. Sürüş Gücü (Drive Strength): Mantık kapılarının ve atamaların çıkışlarındaki elektriksel seviyeyi belirtir. Seviyeler en güçlüden zayıfa: Lojik 1 için supply1 (besleme), strong1 (güçlü - varsayılan), pull1 (çekme), weak1 (zayıf); Lojik 0 için supply0, strong0, pull0, weak0'dır. Yüksek empedans durumları highz1 ve highz0'dır. 2. Yük Gücü (Charge Strength): Yalnızca trireg net türlerinde kapasitif yük depolamasını modeller (small, medium, large).`,
      },
      {
        title: "3. %50 Doluluk Oranına Sahip 5'e Bölücü Saat Devresi Tasarımı",
        content: `Tek sayılı bir saat bölücüde (divide-by-5) %50 doluluk oranı (duty cycle) elde etmek için hem yükselen hem de düşen saat kenarları birlikte kullanılır: 1. Mod-5 sayıcı (0'dan 4'e) tasarlanır. 2. Sayıcının belirli bir bitinden yükselen kenarda çalışan bir clkA sinyali elde edilir. 3. Bu sinyal düşen kenarda tetiklenen bir flip-flop ile yarım periyot geciktirilerek clkB sinyali oluşturulur. 4. clkA ve clkB mantıksal VEYA (|) işlemine tabi tutularak %50 doluluk oranına sahip clk50 çıkışı elde edilir: module clk_div5 (input clk, rstn, output clk50); wire clkA; reg clkB; reg [2:0] count; always @(posedge clk or negedge rstn) begin if (!rstn) count <= 0; else if (count == 4) count <= 0; else count <= count + 1; end assign clkA = count[1]; always @(negedge clk) clkB <= clkA; assign clk50 = clkA | clkB; endmodule`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Aynı Tele Birden Fazla assign Yapıldığında Sentezlenen Mantık Nedir?",
        content: `Standart bir lojik tel (wire) birden fazla assign ifadesiyle sürülmeye çalışıldığında, sentez aracı birden fazla sürücü hatası (multiple driver contention error) verir; çünkü iki kapı çıkışını birbirine bağlamak fiziksel kısa devre oluşturur: wire out; assign out = a & b; assign out = a | b; // Hata: multiple drivers. Ancak üç durumlu (tri-state, 1'bz) tamponlarla sürülen bir veri yolunda birden fazla assign ifadesi geçerlidir; aynı anda yalnızca bir sürücünün etkin olması koşuluyla geçerli bir çift yönlü/ortak veri yolu (tri-state bus) sentezlenir: wire out; assign out = sel1 ? (a & b) : 1'bz; assign out = sel2 ? (a | b) : 1'bz;`,
      },
      {
        title: "2. Koşullu Atamalar (? :) Sentezde Ne Şekilde Çıkarılır?",
        content: `Verilog'daki üçlü koşul operatörü (? :), sentez araçları tarafından doğrudan bir Çoklayıcı (Multiplexer - MUX) olarak çıkarılır (infer edilir). Bir çoklayıcı, seçme girişinin (sel) mantıksal değerine göre girişlerden birini çıkışa aktarır: assign out = sel ? in0 : in1; // sel 1 ise in0, 0 ise in1 seçilir.`,
      },
      {
        title: "3. İç İçe Koşul Operatörlerinde Sentezlenen Donanım Mimarisi",
        content: `Tek bir sürekli atamada birden fazla koşul operatörü iç içe (nested) kullanıldığında, sentez aracı hiyerarşik (kademeli) bir çoklayıcı ağacı (multiplexer hierarchy) sentezler: assign out = sel1 ? (sel2 ? in3 : in4) : (sel3 ? in5 : in6);. Bu ifade donanımsal olarak şu yapıya eşdeğerdir: wire net1, net2; assign net1 = sel2 ? in3 : in4; assign net2 = sel3 ? in5 : in6; assign out = sel1 ? net1 : net2;. Sentez aracı zamanlama kısıtlarına göre bu MUX ağacını optimize eder.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-interview-questions-set-10_tb.v - Simülasyon Testbench",
          snippet: `wire out;

// sel1 and sel2 cannot be 1 at the same time
assign out = sel1 ? a & b : 1'bz;
assign out = sel2 ? a | b : 1'bz;`,
        },
      }

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
        title: "1. casex ve casez İfadelerinin Standart case'e Göre Farkları ve Avantajları",
        content: `Standart case ifadesinde bitlerin kesin olarak (0, 1, X, Z) eşleşmesi gerekir. casez: Yalnızca Z ve ? (soru işareti) bitlerini önemsiz (don't care) olarak kabul eder. casex: Hem X (tanımsız) hem de Z (yüksek empedans) bitlerini don't care kabul eder: casex (abc) 3'bx00: out = a & b; 3'b10x: out = a | b; default: out = ~(a & b); endcase. Avantajları: 1. Sentez Optimizasyonu: Öncelikli kodlayıcılarda gereksiz karşılaştırma mantıklarını eleyerek daha az kapı ve daha küçük alan sağlar. 2. Kod Okunabilirliği: Karmaşık bit maskelemelerini tek bir tabloda temiz şekilde ifade eder. Dikkat: casex simülasyonda beklenmeyen X yayılımlarını don't care sayarak gerçek donanım hatalarını maskeleyebileceği için endüstride çoğunlukla casez tercih edilir.`,
      },
      {
        title: "2. Senkron ve Asenkron Durum Makineleri (FSM) Arasındaki Farklar",
        content: `Senkron Durum Makineleri (Synchronous FSM): Durum geçişleri ortak bir saat sinyalinin kenarı (posedge clk) ile tetiklenir. Saat yükseldiğinde makine mevcut duruma ve girişlere göre bir sonraki duruma geçer ve çıkışları günceller. Tasarımı, zamanlama analizi (STA) ve doğrulaması güvenli ve öngörülebilirdir. Asenkron Durum Makineleri (Asynchronous FSM): Ortak bir saat sinyali kullanmaz; durum geçişleri giriş sinyallerindeki seviye veya kenar değişimleriyle doğrudan tetiklenir. Saat ağına ihtiyaç duymadıkları için daha hızlı tepki verebilir ve saat dinamik gücü harcamazlar; ancak yarış durumları (race conditions), tehlikeler (hazards) ve parazitlere (glitches) karşı son derece hassas olduklarından tasarımı ve zamanlama garantisi oldukça zordur.`,
      },
      {
        title: "3. Mealy ve Moore Durum Makineleri Arasındaki Mimari Farklar",
        content: `Moore Durum Makinesi: Çıkışlar yalnızca mevcut duruma (current state) bağlıdır. Çıkış bir saat çevrimi boyunca kararlıdır ve girişlerdeki parazitlerden (glitches) etkilenmez. Durum geçişleri mevcut durum ve girişlere göre belirlenir. Kombinasyonel yollar genellikle daha kısadır, bu da yüksek çalışma frekanslarına olanak tanır. Mealy Durum Makinesi: Çıkışlar hem mevcut duruma hem de o anki giriş sinyallerine bağlıdır. Girişteki anlık değişimler durum geçişini beklemeden doğrudan çıkışa yansıyabileceği için çıkışlar glitch oluşumuna daha yatkındır. Genellikle Moore makinesine göre daha az sayıda durumla gerçeklenebilir. Ancak girişten çıkışa uzanan doğrudan kombinasyonel yol nedeniyle kritik yol uzayabilir ve çalışma frekansı düşebilir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Büyük Tasarımları Bölümleme (Partitioning) Sırasında Dikkat Edilmesi Gerekenler",
        content: `Karmaşık bir SoC veya FPGA tasarımını hiyerarşik bloklara bölerken göz önünde bulundurulması gereken faktörler: 1. Tasarım Boyutu ve Karmaşıklığı: Modüller bağımsız olarak sentezlenebilecek, simüle edilebilecek ve yönetilebilecek makul boyutlara bölünmelidir. 2. Saat Alanları (Clock Domains): Aynı saat alanına ait mantık blokları tek bir modül altında toplanmalı, saat alanı geçişleri (CDC) açıkça belirlenmiş senkronizatör bloklarıyla izole edilmelidir. 3. Kritik Zamanlama Yolları: Zamanlama kapanışını (timing closure) kolaylaştırmak için kritik kombinasyonel yollar modül sınırlarını geçmemeli ve modül çıkışları kaydedilmelidir (registered outputs). 4. Üretici ve Fiziksel Kısıtlar: Hedef ASIC teknolojisi veya FPGA katman sınırları (SLR die boundaries) fiziksel yerleşimde gözetilmelidir.`,
      },
      {
        title: "2. Farklı Saat Alanları Arasında Kontrol Bilgisini Güvenli Aktarma (CDC Senkronizasyonu)",
        content: `Farklı saat alanları arasında kontrol sinyallerini aktarırken yarı kararlılık (metastability) ve veri kaybını önlemek için şu yöntemler uygulanır: 1. İki Kademeli Flip-Flop Senkronizatörü (2-FF Synchronizer): Tek bitlik kontrol sinyalleri için hedef saat alanında ardışık iki flip-flop kullanılarak yarı kararlılık olasılığı kabul edilebilir MTBF seviyelerine indirilir. 2. Saat Çarpıklığı (Clock Skew) ve Veri Kararlılığı: Sinyalin hedef saat kenarı tarafından güvenilir yakalanabilmesi için yeterince uzun süre kararlı tutulması sağlanmalıdır (darbe uzatma veya el sıkışma / handshake protokolü). 3. Asenkron FIFO: Çok bitlik veri veya kontrol bilgileri için Gray kodlu işaretçilere sahip asenkron FIFO kullanılmalıdır. 4. Simülasyon ve Kapsamlı Doğrulama: SpyGlass CDC veya Questa CDC gibi araçlarla yapısal CDC kontrolleri yapılmalı ve köşe senaryolar simüle edilmelidir.`,
      },
      {
        title: "3. Farklı Veri Genişlikleri ve Saat Alanları Arasında Güvenli Veri Aktarımı",
        content: `Farklı saat alanlarında çalışan ve farklı veri yolu genişliklerine (örneğin 64-bit yazma, 16-bit okuma) sahip mimariler arasında veri aktarımı için en güvenli bileşen Asimetrik Asenkron FIFO'dur (Asymmetric Dual-Clock FIFO). Bu yapı sayesinde bağımsız yazma ve okuma saatleri arasında CDC güvenliği sağlanırken, veri yolu genişliği dönüşümü (gearbox) FIFO bellek dizisi içinde donanım seviyesinde şeffaf ve güvenilir şekilde gerçekleştirilir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
