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
        title: "1. 4-Bit Sayıcı (Counter) Mimarisi ve Çalışma Prensibi",
        content: `4-bit binary sayıcı (counter), 4'b0000 (0) değerinden başlayarak her aktif saat darbesinde (clock edge) birer birer artarak 4'b1111 (15) değerine kadar sayar ve ardından tekrar 4'b0000 değerine dönerek başa sarar (rollover). Aktif bir saat sinyali (clk) sağlandığı ve aktif-düşük reset (active-low reset, rstn) lojik 1 seviyesinde tutulduğu sürece sayma işlemi kesintisiz devam eder.

Başa sarma (rollover) mekanizması, sayıcı maksimum değeri olan 4'b1111 seviyesine ulaştığında ve bir sonraki artırma işlemi geldiğinde gerçekleşir: Toplam sonucu 5'b10000 (16) olmaya çalışır; ancak tasarım yalnızca 4-bit çıkış desteklediğinden en anlamlı bit (MSB - 5. bit) taşma nedeniyle kırpılır (discard edilir) ve geriye kalan 4 bit 4'b0000 değerini üretir.
Sayma dizisi: 0000 -> 0001 -> 0010 -> ... -> 1110 -> 1111 -> (rollover) -> 0000 -> 0001 -> ...

Tasarım temel olarak iki giriş sinyaline sahiptir: Senkron tetiklemeyi sağlayan saat sinyali (clk) ve devreyi sıfırlayan aktif-düşük sıfırlama sinyali (rstn). Aktif-düşük reset, pin lojik 0 (1'b0) olduğunda devrenin sıfırlandığı anlamına gelir. Devrenin 4-bitlik out çıkışı ise güncel sayıcı değerini dış dünyaya sunar.`,
      },
      {
        title: "2. Verilog ile 4-Bit Sayıcı Tasarımı",
        content: `module counter (
    input clk,            // Sayıcının yukarı saymasını sağlayan saat girişi
    input rstn,           // Gerektiğinde sayıcıyı 0'a sıfırlayan aktif-düşük reset girişi
    output reg [3:0] out  // Sayıcı değerini veren 4-bit çıkış portu
);

    // clk sinyalinin yükselen kenarında (0->1) tetiklenen ardışıl always bloğu
    always @ (posedge clk) begin
        if (!rstn)
            out <= 4'b0000;  // Reset aktif (0) ise çıkışı sıfırla
        else
            out <= out + 1;  // Reset pasif (1) ise sayıcıyı 1 artır
    end

endmodule

counter modülü giriş olarak clk ve aktif-düşük reset (rstn, adındaki 'n' harfi active-low olduğunu simgeler) pinlerine; çıkış olarak ise 4-bitlik out kaydına (reg) sahiptir.

always @ (posedge clk) bloğu, saat sinyalinin her 0 -> 1 geçişinde (yükselen kenar / rising edge) tetiklenen ardışıl (sequential) bir lojik bloğudur. Blok içerisinde öncelikli olarak senkron reset kontrolü (if (!rstn)) yapılır: Eğer rstn lojik 0 ise out çıkışı 0 değerine çekilir. Reset sinyali de-assert edildiğinde (lojik 1 olduğunda) ise else dalı çalışarak her saat darbesinde out değerine 1 eklenir. Ardışıl lojikte yarış durumlarını (race condition) önlemek için mutlaka non-blocking atama (<=) operatörü kullanılmalıdır.`,
      },
      {
        title: "3. 4-Bit Sayıcı Testbench Simülasyonu ve Çıktı Analizi",
        content: `Tasarımın beklendiği gibi saydığını doğrulamak için bir testbench modülü oluşturulur. Testbench modülü tb_counter olarak adlandırılır ve simülasyonda en üst modül (top-module) olduğu için herhangi bir port giriş/çıkışına ihtiyaç duymaz. Ancak clk ve rstn sinyallerini üretmek için reg tipinde değişkenler, tasarımın out çıkışını gözlemlemek için ise wire tipinde bağlantı tanımlanır.

module tb_counter;
    reg clk;          // Tasarımın saat girişini sürmek için iç reg sinyali
    reg rstn;         // Tasarıma aktif-düşük reset sürmek için iç reg sinyali
    wire [3:0] out;   // Tasarımın çıkışına bağlanacak wire net

    // Sayıcı tasarımının örneğe dönüştürülmesi (instantiation)
    counter c0 (
        .clk  (clk),
        .rstn (rstn),
        .out  (out)
    );

    // 100 MHz saat sinyali üretimi (periyot = 10ns, yarı periyot #5)
    always #5 clk = ~clk;

    // Test uyaranlarının (stimulus) sürüldüğü initial bloğu
    initial begin
        // 1. Simülasyon başlangıcında sinyalleri başlat
        clk <= 0;
        rstn <= 0;

        // 2. Belirli aralıklarla reset sinyalini uygula ve kaldır
        #20 rstn <= 1;
        #80 rstn <= 0;
        #50 rstn <= 1;

        // 3. 170ns sonunda simülasyonu sonlandır
        #20 $finish;
    end
endmodule

Simülasyon Çıktısı (Waveform / Console Log):
ncsim> run
[0ns]   clk=0 rstn=0 out=0xx
[5ns]   clk=1 rstn=0 out=0x0
[10ns]  clk=0 rstn=0 out=0x0
[15ns]  clk=1 rstn=0 out=0x0
[20ns]  clk=0 rstn=1 out=0x0
[25ns]  clk=1 rstn=1 out=0x1
[30ns]  clk=0 rstn=1 out=0x1
[35ns]  clk=1 rstn=1 out=0x2
[40ns]  clk=0 rstn=1 out=0x2
[45ns]  clk=1 rstn=1 out=0x3
[50ns]  clk=0 rstn=1 out=0x3
[55ns]  clk=1 rstn=1 out=0x4
[60ns]  clk=0 rstn=1 out=0x4
[65ns]  clk=1 rstn=1 out=0x5
[70ns]  clk=0 rstn=1 out=0x5
[75ns]  clk=1 rstn=1 out=0x6
[80ns]  clk=0 rstn=1 out=0x6
[85ns]  clk=1 rstn=1 out=0x7
[90ns]  clk=0 rstn=1 out=0x7
[95ns]  clk=1 rstn=1 out=0x8
[100ns] clk=0 rstn=0 out=0x8
[105ns] clk=1 rstn=0 out=0x0
[110ns] clk=0 rstn=0 out=0x0
...
[150ns] clk=0 rstn=1 out=0x0
[155ns] clk=1 rstn=1 out=0x1
[160ns] clk=0 rstn=1 out=0x1
[165ns] clk=1 rstn=1 out=0x2
Simulation complete via $finish(1) at time 170 NS

Analiz: Testbench çıktısı incelendiğinde; aktif-düşük reset sıfır olduğunda sayıcı 0 değerine sıfırlanır. Yaklaşık 150ns anında rstn sinyali de-assert edildiğinde (1 olduğunda), sayıcı takip eden ilk yükselen saat kenarından itibaren 0'dan yukarı doğru artmaya devam eder.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Asenkron Ripple Counter Mimarisi ve D Tipi Flip-Flop Yapısı",
        content: `Ripple counter (dalgalı sayıcı), ilk flip-flop haricindeki tüm flip-flop'ların bir önceki flip-flop'un çıkışı (genellikle Q veya Q_bar) tarafından tetiklendiği asenkron (asynchronous) bir sayıcı mimarisidir. Senkron sayıcıların aksine ortak bir global saat sinyali (common clock) kullanılmaz; her basamak bir öncekinin çıkışındaki durum değişimini saat darbesi olarak algılar. Bu mimaride saat sinyali zincirleme bir şekilde ilk basamaktan son basamağa doğru 'dalgalanarak' (ripple) yayıldığı için devre bu ismi almıştır.`,
      },
      {
        title: "2. Asenkron Ripple Counter Tasarım İpuçları ve Zamanlama Kısıtları",
        content: `Mühendislik İpucu & Zamanlama Analizi:
1. Birikimli Yayılım Gecikmesi (Accumulated Propagation Delay): Ripple counter yapılarında her flip-flop'un yayılım gecikmesi (t_pd) bir sonraki katın saat girişi üzerinde gecikmeye yol açar. N bitlik bir sayıcıda toplam gecikme N x t_pd olur. Bu durum, yüksek saat frekanslarında son basamağın saatinde ciddi kaymalara (clock skew) sebep olur.
2. Glitch ve Geçersiz Ara Durumlar: Basamaklar aynı anda güncellenmediği için geçiş anlarında çıkışlarda nanosaniyeler mertebesinde geçersiz ara kodlar (glitch / sahte durumlar) oluşur. Eğer bu çıkışlar kombinasyonel bir kod çözücüye (decoder) bağlıysa sistemde hatalı tetiklemeler meydana gelebilir.
3. Tasarım Tercihi: Modern FPGA ve ASIC mimarilerinde ripple counter kullanımı önerilmez. Bunun yerine global clock ağını (BUFG / clock tree) kullanan ve tüm flip-flop'ların aynı saat kenarında tetiklendiği senkron binary counter mimarileri tercih edilmelidir.`,
      },
{
        title: "3. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "4. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Mod-N Sayıcı (Modulo-N Counter) Nedir?",
        content: `Temel binary sayıcılar 0 ile 2^N - 1 arasında sayarak doğal olarak başa sararlar; bu durum çok daha geniş ve esnek bir kavramın özel bir halidir. Bir Mod-N sayıcı (modulo-N counter), sıfıra sıfırlanmadan önce tam olarak N adet durumdan (state) geçen bir sayıcıdır. Buradaki N değerine sayıcının modülü (modulus) denir.

Örneğin, 4-bitlik bir binary sayıcı 16 durumlu bir Mod-16 sayıcı, 3-bitlik bir sayıcı ise Mod-8 sayıcıdır. Ancak Mod-N sayıcıları dijital tasarımda bu kadar kritik ve ilginç kılan asıl senaryo, N değerinin ikinin kuvveti olmadığı (non-power of two) durumlardır. Gerçek dijital sistemlerde Mod-5, Mod-6, Mod-10 (onluk sayıcı), Mod-12 (saat sistemleri) ve Mod-60 (dakika/saniye sayıcıları) gibi yapılar her yerde karşımıza çıkar. Bu tür sayıcıları tasarlamak, yalnızca register genişliğini seçmenin ötesinde bilinçli mimari kararlar almayı gerektirir.`,
      },
      {
        title: "2. Sayma Dizisi ve Frekans Bölme (Frequency Division) Özelliği",
        content: `Bir Mod-N sayıcının sayma dizisi oldukça basittir: Sayıcı her aktif saat darbesinde değerini 1 artırır ve N-1 değerine ulaştığında, bir sonraki aktif saat darbesinde doğal olarak değil, devre mantığıyla zorlanarak tekrar 0'a döner.
Tam sayma döngüsü şöyledir:
0 -> 1 -> 2 -> 3 -> ... -> (N-1) -> 0 -> 1 -> ...

Sayıcı tam bir döngüde tam olarak N farklı durumu ziyaret eder. Bu durum sayıcıya olağanüstü bir frekans bölme yeteneği kazandırır. Giriş saat frekansı f_clk olan bir Mod-N sayıcının çıkış periyodik darbe frekansı:
f_out = f_clk / N
şeklinde hesaplanır. Örneğin 1 MHz saat sinyali ile sürülen bir Mod-10 sayıcı, her 10 çevrimde bir çıkış darbesi üreterek 100 kHz frekansında bir sinyal elde edilmesini sağlar. Bu özellik; UART baud rate üretimi, gerçek zamanlı saat (RTC) tasarımı ve saat bölücü (clock divider) mantıklarının temel yapı taşıdır.`,
      },
      {
        title: "3. Sıfırlama Mimarisi: Senkron ve Asenkron Reset Yaklaşımları",
        content: `N değeri 2'nin kuvveti olmadığında, sayıcı register bitlerinin dolmasıyla doğal olarak (rollover) sıfırlanamaz. Bu nedenle sıfırlama işlemini donanımsal mantık ile sizin kontrol etmeniz gerekir. Dijital tasarımda bu kontrolü sağlamak için iki temel yaklaşım bulunur:

1. Senkron Karşılaştırıcı Yaklaşımı (Tavsiye Edilen): always @(posedge clk) bloğu içinde sayıcı değeri kontrol edilir. Sayıcı N-1 değerine ulaştığında, bir sonraki yükselen saat kenarında değer 0'a yüklenir. Bu yöntem tamamen saat senkronudur ve yarış durumları (glitch) oluşturmaz.
2. Kombinasyonel Asenkron Reset Yaklaşımı: Sayıcı N değerine ulaştığı anda kombinasyonel kapılarla flip-flop'ların asenkron reset pinleri tetiklenir. Ancak bu yaklaşım, dar glitch'lere ve kararsızlıklara yol açtığı için modern FPGA ve ASIC sentezleme araçlarında kesinlikle kaçınılması gereken tehlikeli bir yöntemdir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Halka Sayıcı (Ring Counter) Mimarisi ve Çalışma Mantığı",
        content: `Halka sayıcı (ring counter), kapalı döngü (closed-loop) şeklinde birbirine bağlanmış bir kaydırmalı kaydedicidir (shift register). Bir dizi flip-flop uç uca eklenir ve son flip-flop'un çıkışı doğrudan ilk flip-flop'un veri girişine bağlanır.

Her saat kenarında, her flip-flop solundaki komşusunun değerini kopyalar ve dizinin en sağındaki bit doğrudan en sol başa geri beslenir. Geri besleme yolunda hiçbir tersleyici (inverter), XOR kapısı veya karşılaştırıcı lojiği bulunmaz; yalnızca son çıkışı ilk girişe bağlayan yalın bir iletken hat (wire) vardır. Bu basit mimari sayesinde tek bir aktif bit (lojik 1), bir ray üzerinde dönen bilye gibi her saat darbesinde bir basamak ilerleyerek kaydedici içinde sonsuz bir döngüde dolaşır. Diğer tüm bitler lojik 0 seviyesindedir. N adet flip-flop ile, aktif bitin bulunabileceği her konuma karşılık gelen tam olarak N adet farklı çıkış durumu elde edilir.`,
      },
      {
        title: "2. 4-Bit Halka Sayıcı Çalışma Adımları ve One-Hot Kodlama",
        content: `Halka sayıcının davranışını netleştirmek için 4-bitlik bir örneği adım adım inceleyelim. Kaydedici en soldaki bitte tek bir '1' olacak şekilde başlatılır:

Saat Çevrimi | Q3 | Q2 | Q1 | Q0 | Durum Tanımı
Reset        | 1  | 0  | 0  | 0  | Başlangıç Durumu
1            | 0  | 1  | 0  | 0  | 1 Sağa Kaydı
2            | 0  | 0  | 1  | 0  | 1 Sağa Kaydı
3            | 0  | 0  | 0  | 1  | 1 Sağa Kaydı
4 (= Reset)  | 1  | 0  | 0  | 0  | Başa Geri Döndü

Görüldüğü gibi tek bir '1' biti Q3'ten Q0'a doğru ilerler ve dördüncü saat kenarında tekrar Q3'e döner. 4 flip-flop, 4 durum ve periyot 4'tür. Bu sayıcı türü one-hot kodlamalı (one-hot encoding) bir Mod-N sayıcıdır: Her an yalnızca tek bir flip-flop '1' durumundadır. One-hot kodlama; FSM (Sonlu Durum Makineleri) tasarımlarında kod çözme mantığına (decoder) ihtiyaç duymadan doğrudan durum çıkışlarını kontrol etmeyi sağladığı için yüksek hızlı dijital tasarımda son derece yaygın kullanılır.`,
      },
      {
        title: "3. Kaydırma Yönü ve Kritik Başlatma (Initialization) Gereksinimi",
        content: `Halka sayıcı, flip-flop'ların bağlantı sırasına göre sağa veya sola doğru kayacak şekilde tasarlanabilir. Sağa kaydırmada i konumundaki flip-flop, solundaki i+1 konumundaki değeri alır; sola kaydırmada ise tam tersidir. İki yön de geçerli tasarımlardır ve seçim genellikle sonraki kod çözme mantığının gereksinimine göre yapılır.

Ancak başlatma (initialization) mekanizması son derece kritiktir ve üzerinde titizlikle durulmalıdır. Halka sayıcı mutlaka kaydedicide tam olarak tek bir 1 ve diğer tüm bitler 0 olacak şekilde başlatılmalıdır. Gerçek donanımda güç verildiğinde (power-up) tüm flip-flop'lar 0 olarak başlarsa, sıfırlar halka içinde sonsuza kadar dolaşır ve sayıcı hiçbir zaman aktif duruma geçemez (patolojik kilitlenme durumu). Benzer şekilde birden fazla '1' biti yüklenirse, tüm bu bitler döngüde dolaşır ve one-hot özelliği tamamen bozulur. Bu nedenle tasarımda kendi kendini düzelten (self-correcting) mantık veya güvenilir bir reset yapısı zorunludur.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Johnson Sayıcı (Twisted Ring Counter) Mimarisi",
        content: `Dijital tasarım ve Verilog öğrenirken temel binary sayıcılardan sonra karşılaşacağınız en zarif devrelerden biri Johnson sayıcıdır (bazen burulmuş halka sayıcı / twisted ring counter veya sürünen kod sayıcı / creeping code counter olarak da adlandırılır). Sıralı mantık devreleri için mükemmel bir tasarım sezgisi kazandıran bu devre, donanım kaynaklarını en verimli şekilde kullanan mimarilerden biridir.

Johnson sayıcı, özünde bir geri besleme döngüsüne sahip kaydırmalı kaydedicidir; ancak çok kritik bir farkla: Son flip-flop'un çıkışı doğrudan ilk flip-flop'a bağlanmak yerine, son flip-flop'un terslenmiş (complemented) çıkışı ilk flip-flop'un girişine geri beslenir. Geri besleme yolundaki bu tek lojik NOT işlemi, devrenin tüm çalışma dinamiğini baştan sona değiştirir.`,
      },
      {
        title: "2. Halka Sayıcı ile Johnson Sayıcı Karşılaştırması",
        content: `Johnson sayıcıyı tam anlamak için onu yakın akrabası olan standart halka sayıcı ile karşılaştırmak büyük fayda sağlar:
- Standart Halka Sayıcı: N adet flip-flop ile yalnızca N adet benzersiz durum (state) üretebilir. Geri besleme doğrudan bağlanır ve tek bir '1' biti halkada döner.
- Johnson Sayıcı: Aynı N adet flip-flop zincirini kullanır ancak geri besleme sinyalini tersler. Böylece önce zincirin başından birler girmeye başlar ve tüm flip-flop'ları doldurur; ardından sıfırlar girerek kaydediciyi temizler. Sonuç olarak tam 2N adet benzersiz durum elde edilir.

Bu, Johnson sayıcının en büyük avantajıdır: Aynı sayıda flip-flop kullanarak standart halka sayıcının iki katı kadar durum elde edersiniz (örneğin 4 flip-flop ile 8 durum).`,
      },
      {
        title: "3. 4-Bit Johnson Sayıcı Çalışma Prensibi ve Durum Tablosu",
        content: `4-bitlik bir Johnson sayıcının çalışma adımlarını inceleyelim. Tüm flip-flop'ların reset durumunda 0 olduğunu varsayalım (Q = 4'b0000). Her yükselen saat kenarındaki durum geçişleri şöyledir:

Saat Çevrimi | Q3 | Q2 | Q1 | Q0 | Açıklama
Reset        | 0  | 0  | 0  | 0  | Başlangıç Durumu
1            | 1  | 0  | 0  | 0  | ~Q0 (1) Q3'e girdi
2            | 1  | 1  | 0  | 0  | 1'ler sağa kayıyor
3            | 1  | 1  | 1  | 0  | 1'ler yayılıyor
4            | 1  | 1  | 1  | 1  | Tümü 1 oldu
5            | 0  | 1  | 1  | 1  | ~Q0 (0) Q3'e girdi
6            | 0  | 0  | 1  | 1  | 0'lar sağa kayıyor
7            | 0  | 0  | 0  | 1  | 0'lar yayılıyor
8 (= Reset)  | 0  | 0  | 0  | 0  | Tümü 0 oldu (Döngü Başa Döndü)

Her çevrimde kaydedici sağa bir basamak kayar ve en sola giren yeni bit, en sağdaki bitin tersidir (~Q0). Q0 sıfır olduğu sürece sola 1 girer; Q0 bir olduğunda ise sola 0 girmeye başlar. Sadece 4 flip-flop ile 8 durum üretilir. Ayrıca ardışık her geçişte yalnızca tek bir bit değiştiği için Johnson sayıcı durumları kod çözerken glitch oluşturmaz.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Gray Kodlu Sayıcı (Gray Counter) Nedir?",
        content: `Yansıtılmış ikili sayıcı (reflected binary counter) veya kısaca Gray sayıcı, ilk bakışta büyüleyici bir özelliğe sahip olan özel bir ardışıl devredir: Standart binary sayıcılar gibi 2^N adet durumun tamamını sayar, ancak kritik bir farkla — her saat çevriminde durumlardan yalnızca tek bir bit değişir (Hamming mesafesi = 1).`,
      },
      {
        title: "2. Binary Geçiş Glitch'leri ve Gray Kodunun Çözümü",
        content: `Gray sayıcının mantığını kavramak için öncelikle çözdüğü temel donanım problemini anlamak gerekir: Binary sayıcılardaki geçiş glitch'leri (transition glitches).

Standart 3-bit binary bir sayıcı düşünelim. Sayıcı 011 (desimal 3) değerinden 100 (desimal 4) değerine geçerken her üç bit aynı anda değişmek zorundadır: Bit 0 (1->0), Bit 1 (1->0) ve Bit 2 (0->1). Teoride her üç flip-flop aynı saat kenarında anında güncellenir. Ancak gerçek silikon donanımda her flip-flop ve mantık kapısının fiziksel yayılım gecikmesi (propagation delay) ve hat uzunlukları birbirinden farklıdır. Bu nedenle üç bit kesinlikle aynı anda değişemez; biri diğerinden birkaç pikosaniye önce değişebilir.

Bu mikroskobik zaman aralığında sayıcı çıkışı amaçlanmayan sahte ara durumlardan geçer. Örneğin 011 -> 100 geçişinde çıkışta çok kısa bir an için 111, 000 veya 110 gibi hayalet durumlar (ghost states) parlayabilir. Eğer bu çıkışa bağlı bir kombinasyonel kod çözücü (decoder), durum makinesi (FSM) veya çoklayıcı (MUX) varsa, bu sahte ara durumları algılayarak sisteme istenmeyen sahte darbeler (glitch) üretir. Yüksek hızlı veya gürültüye duyarlı tasarımlarda bu durum ölümcül fonksiyonel hatalara yol açar.

Gray sayıcı bu sorunu kökünden çözer: Hangi geçiş olursa olsun her saat darbesinde daima ve yalnızca tek bir bit değiştiği için hiçbir ara durum, hayalet kod veya glitch oluşamaz.`,
      },
      {
        title: "3. Asenkron FIFO'larda Gray Kod Kullanımı ve Saat Alanı Geçişi (CDC)",
        content: `Gray sayıcıların ileri seviye dijital tasarımdaki en kritik ve yaygın kullanım alanı Asenkron FIFO'lardır (Async FIFO). Asenkron FIFO, yazma portu bir saat alanında (örneğin 100 MHz write clock), okuma portu ise tamamen bağımsız ve asenkron başka bir saat alanında (örneğin 33 MHz read clock) çalışan çift saatli bir bellek tamponudur.

Buradaki en büyük mühendislik zorluğu, yazma ve okuma işaretçilerinin (pointers) saat alanı sınırından (Clock Domain Crossing - CDC) karşı tarafa güvenli bir şekilde aktarılmasıdır. Eğer ikili (binary) bir sayıcı işaretçi olarak kullanılırsa; örneğin 0111 değerinden 1000 değerine geçiş anında (4 bitin birden değiştiği an) hedef saat alanı sinyali örneklerse, sinyallerin farklı gecikmelerinden dolayı tamamen bozuk ve anlamsız bir değer okuyabilir. Bu da FIFO'nun taşmasına (overflow) veya boşken okunmasına (underflow) neden olarak veri kaybına yol açar.

Buna karşılık Gray kodunda her adımda yalnızca tek bir bit değiştiği için hedef saat alanı sinyali geçiş anında yakalasa bile ya eski değeri ya da yeni değeri doğru olarak okur; asla bozulmuş bir ara değer okuyamaz. Bu nedenle profesyonel tüm Asenkron FIFO tasarımlarında Gray işaretçiler endüstri standardıdır.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
{
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. N-Bit Çift Yönlü Kaydırmalı Kaydedici (Bidirectional Shift Register)",
        content: `Dijital elektronikte kaydırmalı kaydedici (shift register), bir flip-flop'un q çıkışının bir sonraki flip-flop'un d veri girişine seri olarak bağlandığı ardışıl bir flip-flop zinciridir. Tüm flip-flop'lar aynı saat sinyali ile tetiklendiğinden, kaydedicide tutulan bit dizisi her saat darbesinde bir konum kaydırılır.

Örneğin, 5-bitlik sağa kaydırmalı bir kaydedicinin başlangıç değeri 10110 ise ve seri veri girişine sürekli 0 verilirse:
- 1. saat darbesinde: 01011
- 2. saat darbesinde: 00101
- 3. saat darbesinde: 00010
değerleri elde edilir.`,
      },
      {
        title: "2. Parametrik Çift Yönlü Kaydırmalı Kaydedici Verilog Tasarımı",
        content: `module shift_reg #(parameter MSB=8) (
    input d,                      // Kaydırmalı kaydediciye giren seri veri
    input clk,                    // Tüm flip-flop'ları tetikleyen saat sinyali
    input en,                     // Kaydırma işlemini aktif/pasif yapan enable sinyali
    input dir,                    // Kaydırma yönü (0: sola kaydır, 1: sağa kaydır)
    input rstn,                   // Aktif-düşük sıfırlama (reset) girişi
    output reg [MSB-1:0] out      // Kaydedicideki tüm bitlerin paralel çıkışı
);

    // Saat sinyalinin yükselen kenarında tetiklenen ardışıl blok
    always @ (posedge clk) begin
        if (!rstn)
            out <= 0;             // Reset aktifse çıkışı sıfırla
        else begin
            if (en) begin
                case (dir)
                    1'b0 : out <= {out[MSB-2:0], d};  // Sola kaydır, en sağa yeni bit ekle
                    1'b1 : out <= {d, out[MSB-1:1]};  // Sağa kaydır, en sola yeni bit ekle
                endcase
            end else
                out <= out;       // Enable pasifse mevcut değeri koru
        end
    end

endmodule

Açıklama: Bu tasarım MSB parametresi ile bit genişliği dinamik olarak ayarlanabilen esnek bir mimaridir (MSB=8 ise 8-bit, MSB=16 ise 16-bit). Verilog'un bitiştirme operatörü (concatenation, {}) kullanılarak kaydırma işlemi donanımsal düzeyde çok verimli şekilde gerçekleştirilmiştir:
- Sola kaydırmada (dir = 0): Çıkışın en anlamlı biti atılır, diğer bitler bir sola kayar ve en anlamsız bite giriş pini d eklenir ({out[MSB-2:0], d}).
- Sağa kaydırmada (dir = 1): Çıkışın en anlamsız biti atılır, bitler sağa kayar ve en anlamlı bite d yerleştirilir ({d, out[MSB-1:1]}).`,
      },
      {
        title: "3. Shift Register Testbench Doğrulaması ve Dalga Biçimi Analizi",
        content: `module tb_sr;
    parameter MSB = 16;      // 16-bit genişlik parametresi
    reg data, clk, en, dir, rstn;
    wire [MSB-1:0] out;

    // 16-bit shift register örneği oluşturuluyor
    shift_reg #(MSB) sr0 (
        .d    (data),
        .clk  (clk),
        .en   (en),
        .dir  (dir),
        .rstn (rstn),
        .out  (out)
    );

    // 50 MHz saat üretimi (T = 20ns)
    always #10 clk = ~clk;

    initial begin
        clk <= 0; en <= 0; dir <= 0; rstn <= 0; data <= 'h1;
    end

    initial begin
        // 1. Reset uygula ve kaldır
        rstn <= 0;
        #20 rstn <= 1; en <= 1;

        // 2. 7 saat çevrimi boyunca veri pinine alternatif değerler sür
        repeat (7) @ (posedge clk) data <= ~data;

        // 3. Kaydırma yönünü değiştir (sağa kaydırma) ve 7 çevrim veri sür
        #10 dir <= 1;
        repeat (7) @ (posedge clk) data <= ~data;

        // 4. Veri sürmeden 7 çevrim serbest kaydırmaya izin ver
        repeat (7) @ (posedge clk);

        $finish;
    end

    initial $monitor ("rstn=%0b data=%b, en=%0b, dir=%0b, out=%b", rstn, data, en, dir, out);
endmodule

Simülasyon Log Özeti:
Log çıktısında görüldüğü üzere, rstn=1 ve en=1 yapıldıktan sonra sola kaydırma modunda (dir=0) data pininden giren bitler sırayla sağdan girerek sola doğru ilerler. dir=1 yapıldığında ise bitler soldan girip sağa doğru kayarak tüm register içeriğini dönüştürür. en=0 durumunda ise kaydedici mevcut durumunu korur.`,
      },
      {
        title: "4. Kaydırmalı Kaydedici (Shift Register) Tasarım ve Donanım İpuçları",
        content: `Mühendislik İpuçları & Uygulama Alanları:
1. Seri-Paralel ve Paralel-Seri Dönüşüm: Shift register'lar SPI, I2C ve UART gibi seri haberleşme protokollerinde gelen seri veri akışını paralel byte'lara dönüştürmek (SIPO - Serial-In Parallel-Out) veya paralel veriyi seri hatta aktarmak (PISO - Parallel-In Serial-Out) için temel donanım bloğudur.
2. Gecikme Hatları (Delay Lines): Dijital sinyal işleme (DSP) ve ardışıl lojikte bir veri akışını tam N saat çevrimi geciktirmek için basit shift register yapıları kullanılır.
3. FPGA SRL Mimarisi: Modern FPGA'lerde (örneğin Xilinx/AMD UltraScale mimarisi) shift register'lar ayrı ayrı flip-flop'lar yerine özel LUT donanımları (SRL16E / SRL32E) içinde sentezlenerek çok büyük alan ve güç tasarrufu sağlar.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Sonlu Durum Makinesi (FSM) Türleri ve Durum Kodlama Yöntemleri",
        content: `Dijital tasarımda sonlu durum makineleri (Finite State Machine - FSM), çıkışların üretilme şekline ve durumların binary olarak nasıl kodlandığına göre sınıflandırılır:

1. Çıkış Üretim Yöntemine Göre FSM Türleri:
- Moore FSM: Çıkışlar yalnızca mevcut duruma (current state) bağlıdır. Girişlerdeki anlık değişimler çıkışa doğrudan yansımaz; bu nedenle Moore makineleri glitch'lere karşı çok daha kararlıdır ve çıkış zamanlaması daha öngörülebilirdir.
- Mealy FSM: Çıkışlar hem mevcut duruma hem de o anki giriş sinyallerine bağlıdır. Mealy makineleri genellikle Moore makinelerine kıyasla daha az sayıda durumla tasarlanabilir ve girişlere anında tepki verir; ancak giriş hattındaki glitch'ler doğrudan çıkışa yansıyabilir.

2. Durum Kodlama (State Encoding) Yöntemleri:
- Binary Encoding: Durumlar standart binary sayılarla temsil edilir (00, 01, 10, 11). N adet durum için ceil(log2(N)) adet flip-flop yeterlidir. Kaynak tasarrufu sağlar ancak durum geçiş lojiği daha karmaşık olabilir.
- One-Hot Encoding: Her duruma bir flip-flop ayrılır ve her an yalnızca bir flip-flop '1' (hot) olur (örneğin 0001, 0010, 0100, 1000). FPGA mimarilerinde flip-flop sayısı bol ve kombinasyonel kod çözme lojiği çok hızlı olduğu için genellikle one-hot kodlama tercih edilir.`,
      },
      {
        title: "2. Verilog ile FSM Kodlama Şablonu (1-Always vs 2-Always Yaklaşımı)",
        content: `Verilog'da FSM tasarımları tek bir always bloğu veya iki ayrı always bloğu kullanılarak kodlanabilir. Endüstri standardı ve en çok tavsiye edilen yöntem İki Always Bloklu (2-Always Block) Yapıdır:

1. Ardışıl (Clocked) Always Bloğu: Sadece mevcut durumun (cur_state) saat kenarında güncellenmesini ve senkron/asenkron reset mantığını yönetir (cur_state <= next_state).
2. Kombinasyonel Always Bloğu: Mevcut duruma ve giriş sinyallerine bakarak bir sonraki durumu (next_state) hesaplayan case yapısını barındırır.

Çıkış Lojiğinin Yönetimi: Çıkışlar, kombinasyonel blok içinde hesaplanabileceği gibi, daha temiz bir mimari için ayrı assign ifadeleriyle veya kayıtlı çıkış (registered output) sağlamak adına üçüncü bir ardışıl blok ile de atanabilir.`,
      },
      {
        title: "3. Ardışıl Always Bloğu ve Non-Blocking Atama Kuralları",
        content: `Bir FSM'de durum geçişleri yalnızca aktif saat kenarında gerçekleşir. Standart ardışıl durum bloğu şu şekildedir:

always @ (posedge clk or negedge resetn) begin
    if (!resetn) begin
        cur_state <= IDLE;       // Reset anında başlangıç durumuna dön
    end else begin
        cur_state <= next_state; // Saat kenarında bir sonraki duruma geç
    end
end

Kritik Kural: Ardışıl (sequential / clocked) always blokları içerisinde daima ve istisnasız non-blocking atama (<=) kullanılmalıdır!
Non-blocking atamalar, donanımdaki eşzamanlı flip-flop kayıt davranışını birebir modeller. Eşzamanlı çalışan bloklar arasındaki yarış durumlarını (race conditions) ortadan kaldırır ve simülasyon-donanım uyumsuzluğunu önler.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Dizi Dedektörü (Sequence Detector) Mimarisi ve FSM Tabanı",
        content: `FSM tasarımlarının dijital elektronikteki en klasik ve temel örneklerinden biri dizi dedektörleridir (sequence detector). Dizi dedektörü, seri olarak gelen bir ikili bit akışı (bit stream) içerisinde önceden tanımlanmış belirli bir deseni (örneğin 1011 dizisini) arayan ve bu desen yakalandığında çıkışında lojik 1 darbesi üreten ardışıl bir devredir.`,
      },
      {
        title: "2. 1011 Dizi Dedektörü Testbench Simülasyonu ve Hata Analizi",
        content: `module tb;
    reg clk, in, rstn;
    wire out;
    reg [1:0] l_dly;
    reg tb_in;
    integer i;
    integer loop = 1;

    always #10 clk = ~clk;

    // 1011 dedektör örneği
    det_1011 u0 (
        .clk  (clk),
        .rstn (rstn),
        .in   (in),
        .out  (out)
    );

    initial begin
        clk <= 0; rstn <= 0; in <= 0;
        repeat (5) @ (posedge clk);
        rstn <= 1;

        // Belirli test paterni uygulanıyor
        @(posedge clk) in <= 1;
        @(posedge clk) in <= 0;
        @(posedge clk) in <= 1;
        @(posedge clk) in <= 1; // 1011 tamamlandı -> out=1 beklenir
        @(posedge clk) in <= 0;
        @(posedge clk) in <= 0;
        @(posedge clk) in <= 1;
        @(posedge clk) in <= 1;
        @(posedge clk) in <= 0;
        @(posedge clk) in <= 1;
        @(posedge clk) in <= 1; // 1011 tekrar tamamlandı -> out=1 beklenir

        // Rastgele uyarım döngüsü
        for (i = 0 ; i < loop; i = i + 1) begin
            l_dly = $random;
            repeat (l_dly) @ (posedge clk);
            tb_in = $random;
            in <= tb_in;
        end

        #100 $finish;
    end
endmodule

Simülasyon Çıktısı Analizi:
Simülasyon çıktısında T=190 ve T=330 anlarında out=1 üretilmektedir. Ancak tasarımdaki yaygın hata (bug): Dizi tespit edildikten sonra durum makinesinin sonraki duruma geçişidir. Özellikle örtüşen (overlapping) dizi tespitinde 1011 dizisinin sonundaki '1', bir sonraki olası 1011 dizisinin ilk biti olarak kabul edilmelidir. Eğer FSM doğrudan IDLE durumuna dönerse örtüşen dizileri kaçırır.`,
      },
      {
        title: "3. Dizi Dedektörlerinde Örtüşme (Overlapping) ve FSM Durum Tasarımı",
        content: `Mühendislik İpuçları & Tasarım Kriterleri:
1. Örtüşen (Overlapping) vs Örtüşmeyen (Non-overlapping) Tasarım:
- Örtüşmeyen (Non-overlapping) dedektörlerde 1011 dizisi bulunduktan sonra durum makinesi sıfırlanır ve yeni dizi için 4 yeni bit beklenir (1011011 akışında yalnızca 1 kez çıkış verir).
- Örtüşen (Overlapping) dedektörlerde dizinin son biti, yeni bir dizinin başlangıcı olabilir (1011011 akışında iki kez 1011 tespit edilir ve 2 kez çıkış verir).
2. Mealy vs Moore Çıkış Zamanlaması:
- Mealy dedektöründe son bit geldiği anda saat çevrimi içinde anında out=1 üretilir (0 çevrim gecikme).
- Moore dedektöründe ise FSM başarı durumuna bir sonraki saat darbesinde geçtiği için çıkış bir saat çevrimi gecikmeyle üretilir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Gelişmiş Örüntü Dedektörü (Pattern Detector) Mimarisi",
        content: `Örüntü dedektörleri (pattern detectors), seri bit dizilerinde belirli bit şablonlarını yakalamak için optimize edilmiş durum makineleridir. Basit dizi dedektörlerine kıyasla daha uzun veya karmaşık bit desenlerini tespit etmek için tasarlanırlar ve telekomünikasyon çerçeveleme (framing), paket başlığı senkronizasyonu (preamble/sync word detection) gibi kritik donanım bloklarında kullanılırlar.`,
      },
      {
        title: "2. Örüntü Dedektörlerinde Durum Sayısı Optimizasyonu ve Glitch Koruması",
        content: `Mühendislik İpuçları:
1. Paket Başlığı Senkronizasyonu (Frame Sync): Ethernet (0x55 ön eki), PCIe veya UART gibi protokollerde gelen veri akışının nerede başladığını anlamak için 8, 16 veya 32-bit uzunluğundaki benzersiz örüntüler dedektörler ile yakalanır.
2. Durum Patlamasını Önleme: Çok uzun dizilerde (örneğin 32-bit sync word) geleneksel FSM yerine kaydırmalı kaydedici + karşılaştırıcı (shift register + comparator) mimarisi kullanmak donanım kaynaklarını ve lojik karmaşıklığını ciddi oranda azaltır.`,
      },
{
        title: "3. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "4. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Yükselen Kenar Dedektörü (Positive Edge Detector) Nedir?",
        content: `Yükselen kenar dedektörü (positive edge detector), izlediği giriş sinyali 0'dan 1'e geçtiğinde (yükselen kenar / positive edge anında) tam olarak bir saat çevrimi genişliğinde temiz bir lojik 1 darbesi (pulse) üreten temel bir dijital lojik devresidir.`,
      },
      {
        title: "2. Geciktirme ve Mantıksal VE Tabanlı Kenar Dedektörü Tasarımı",
        content: `module pos_edge_det (
    input clk,        // Devrenin saat sinyali
    input sig,        // Yükselen kenarı tespit edilecek giriş sinyali
    output pe         // Yükselen kenar oluştuğunda 1 saat çevrimi '1' olan çıkış
);

    reg sig_dly;      // Giriş sinyalinin 1 saat çevrimi gecikmiş halini tutan flip-flop

    // sig_dly sinyalinin sig'den tam 1 saat çevrimi geride kalmasını sağlayan blok
    always @ (posedge clk) begin
        sig_dly <= sig;
    end

    // Kombinasyonel lojik: Mevcut sinyal İLE gecikmiş sinyalin tersi
    assign pe = sig & ~sig_dly;

endmodule

Açıklama:
Pozitif kenar yakalama mantığı iki adımdan oluşur:
1. Giriş sinyali (sig), bir D flip-flop (sig_dly) üzerinden geçirilerek tam 1 saat çevrimi geciktirilir.
2. Kombinasyonel olarak mevcut sinyal ile geciktirilmiş sinyalin tersi VE (AND) işlemine tabi tutulur: pe = sig & ~sig_dly.
Sinyal 0 -> 1 geçişi yaptığı anda sig = 1 olurken, gecikmiş sinyal henüz önceki değerinde (sig_dly = 0) kalır. Bu sayede ~sig_dly = 1 olur ve pe = 1 & 1 = 1 çıkar. Bir sonraki saat kenarında sig_dly de 1 olacağı için ~sig_dly = 0 olur ve çıkış tekrar 0 seviyesine düşer.`,
      },
      {
        title: "3. Kenar Dedektörü Testbench Simülasyonu",
        content: `module tb;
    reg sig;
    reg clk;
    wire pe;

    // Kenar dedektörü tasarımı bağlanıyor
    pos_edge_det ped0 (
        .sig (sig),
        .clk (clk),
        .pe  (pe)
    );

    // 100 MHz saat sinyali (Periyot = 10ns)
    always #5 clk = ~clk;

    initial begin
        clk <= 0;
        sig <= 0;
        #15 sig <= 1;
        #20 sig <= 0;
        #15 sig <= 1;
        #10 sig <= 0;
        #20 $finish;
    end
endmodule

Açıklama: Testbench içerisinde sig sinyali belirli aralıklarla 0 ve 1 seviyelerine sürülür. sig sinyalinin her 0 -> 1 geçişinde çıkışta tam bir saat periyodu (10ns) boyunca yüksek seviyede kalan bir darbe (pe = 1) gözlemlenir. 1 -> 0 düşen kenar geçişlerinde ise çıkış kesinlikle 0 kalır.`,
      },
      {
        title: "4. Sentezlenen Donanım Şematiği ve Kapı Seviyesi Analiz",
        content: `Bu davranışsal Verilog modeli Xilinx Vivado FPGA tasarım aracıyla sentezlendiğinde donanım şematiği şu elemanlardan oluşur:
- 1 saat çevrimlik gecikmeyi oluşturan bir adet D Tipi Flip-Flop (FDRE).
- Flip-flop çıkışına bağlı bir evirici (inverter / NOT kapısı).
- Orijinal giriş ile evirici çıkışını birleştiren bir VE (AND) kapısı.

Modern FPGA mimarilerinde bu kombinasyonel yapı (NOT + AND kapıları) doğrudan 1 adet LUT (Look-Up Table) hücresine eşlenir ve minimum yayılım gecikmesiyle çalışır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. İkiliden Gray Koda Dönüşüm (Binary to Gray Code Conversion)",
        content: `Gray kodu, ardışık her iki değer arasında yalnızca tek bir bitin değiştiği (Hamming mesafesi = 1) özel bir ikili kodlama sistemidir. Standart binary veriyi Gray koda dönüştürmek, özellikle asenkron FIFO işaretçilerinde ve döner enkoder (rotary encoder) arabirimlerinde veri bütünlüğünü sağlamak için en sık kullanılan dijital lojik işlemlerinden biridir.`,
      },
      {
        title: "2. Donanım Şematiği ve Kaydırma Operatörü (>>) Sentez Analizi",
        content: `Binary'den Gray koda dönüşüm mantıksal olarak gray = bin ^ (bin >> 1) bağıntısıyla ifade edilir.

Donanım ve Sentez Analizi:
Sağa kaydırma (>>) operatörü sabit bir kaydırma (constant shift) olduğu için donanımda aktif bir shift register veya çoklayıcı üretmez; sadece iletken hatların (routing/wiring) bir bit kaydırılarak XOR kapılarına bağlanması şeklinde sentezlenir.
Ancak değişken bir kaydırma operatörü kullanılırsa donanımda çok katmanlı MUX ağları ve kaydırmalı kaydedici yapıları sentezlenebilir, bu da gereksiz alan ve güç tüketimine yol açar. Bu nedenle dönüşümün doğrudan bit düzeyinde XOR kapıları (bin[N-1] ^ bin[N-2]) ile yazılması en temiz ve öngörülebilir donanım sentezini garanti eder.`,
      },
{
        title: "3. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "4. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-binary-to-gray_tb.v - Simülasyon Testbench",
          snippet: `module bin2gray #(parameter N=4) ( input  [N-1:0] bin, 
                                   output [N-1:0] gray);
                                   
  assign gray = bin ^ (bin >> 1);
  
endmodule`,
        },
      }

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
        title: "1. Tek Portlu RAM (Single-Port RAM) Nedir ve Nasıl Çalışır?",
        content: `Tek portlu RAM (Single-Port Random Access Memory), aynı anda yalnızca tek bir bellek adresine erişilmesine (okuma veya yazma) izin veren temel bir dijital bellek bileşenidir. Dijital sistemlerde veri depolamak için kullanılan en yalın ve en yaygın bellek bloklarından biridir.

Tek portlu bir RAM'de her bellek hücresi sabit sayıda bit saklar (genellikle 8, 16, 32 veya 64 bit gibi ikinin kuvveti genişlikte kelimeler - word).
- Okuma İşlemi (Read): Belirtilen adreste depolanan veri bellek çıkış hattına aktarılır.
- Yazma İşlemi (Write): Giriş hattındaki yeni veri belirtilen adrese yazılarak önceki verinin üzerine kaydedilir.`,
      },
      {
        title: "2. Neden 'Tek Portlu' Olarak Adlandırılır?",
        content: `Tek portlu RAM olarak adlandırılmasının nedeni, bellek dizisine erişen yalnızca tek bir adres ve veri yolu (port) bulunmasıdır. Bu mimari kısıt nedeniyle okuma ve yazma işlemleri aynı saat çevriminde farklı adreslerde eşzamanlı olarak gerçekleştirilemez.

Eğer bir yazma işlemi yapılıyorsa okuma işlemi beklemek zorundadır; tersi durumda okuma yapılıyorsa yazma işlemi gerçekleştirilemez. Eşzamanlı okuma ve yazma ihtiyacı olan yüksek bant genişlikli tasarımlarda bunun yerine Çift Portlu RAM (Dual-Port RAM) mimarileri tercih edilir.`,
      },
      {
        title: "3. Tek Portlu RAM Arayüz Sinyalleri ve Kontrol Hatları",
        content: `Tek portlu bir RAM modülü aşağıdaki temel sinyal gruplarından oluşur:
1. Adres Hatları (addr): Erişilmek istenen bellek hücresini seçer. Adres hattının bit genişliği (K), RAM'in adresleyebileceği maksimum derinliği (2^K kelime) belirler.
2. Veri Hatları (data_in / data_out): Belleğe yazılacak veya bellekten okunacak gerçek veriyi taşır.
3. Kontrol Sinyalleri:
   - Saat (clk): Senkron bellek işlemlerini tetikler.
   - Yazma Yetkilendirme (we - Write Enable): Bu sinyal lojik 1 olduğunda yazma işlemi tetiklenir; lojik 0 olduğunda bellek okuma modundadır.
   - Yonga Seçimi (cs - Chip Select): Bellek bloğunu bütünüyle aktif veya pasif hale getirir.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Senkron FIFO (Synchronous FIFO) Mimarisi ve Çalışma Prensibi",
        content: `Senkron FIFO (First-In, First-Out), verilerin yazıldığı sıra ile okunduğu, tek bir saat alanı (single clock domain) altında çalışan bir tampon bellek (buffer) mimarisidir. Hem okuma hem de yazma işlemleri aynı saat sinyali ile senkronize olarak gerçekleştirilir.

'Senkron' olarak adlandırılmasının temel sebebi; okuma ve yazma işaretçilerinin (read/write pointers), durum bayraklarının (full/empty) ve bellek veri transferlerinin tamamının tek bir ortak saat sinyalinin aktif kenarında güncellenmesidir. Senkron FIFO'lar temel olarak veri üretim hızı ile veri işleme hızı arasındaki anlık farkları tolere etmek (rate-mismatch buffering) amacıyla kullanılır. Örneğin bir kaynaktan ani paket patlamaları (burst traffic) geldiğinde sistem bu veriyi FIFO'da depolar ve tüketici birim kendi hızında güvenle okur.`,
      },
      {
        title: "2. FIFO Derinliği (Depth) ve Genişliği (Width) Nasıl Hesaplanır?",
        content: `Bir FIFO'nun boyutlandırılması iki temel parametreye dayanır:
- FIFO Genişliği (Width): FIFO'nun her bir hücresinde saklanan veri bit sayısını (veri yolu genişliğini, örneğin 8-bit, 32-bit, 64-bit) ifade eder. Tek bir işlemde ne kadar bit yazılıp okunacağını belirler.
- FIFO Derinliği (Depth): FIFO'nun aynı anda saklayabileceği toplam kelime (girdi) sayısını temsil eder.

Derinlik Hesaplama Formülü:
Veri patlaması (burst) sırasında veri kaybı yaşanmaması için gereken minimum derinlik:
Derinlik = ((Yazma Hızı - Okuma Hızı) * Patlama Süresi) / Saat Periyodu
Doğru boyutlandırılmamış bir FIFO, taşma (overflow) nedeniyle kritik veri kayıplarına sebep olur.`,
      },
      {
        title: "3. Temel FIFO Giriş/Çıkış Portları ve Durum Bayrakları",
        content: `Bir senkron FIFO'nun ana arayüz bileşenleri şunlardır:
1. Veri Portları: Belleğe yeni veri yazmak için wr_data ve bellekten veri okumak için rd_data portları.
2. İşaretçiler (Pointers):
   - Yazma İşaretçisi (wr_ptr): Yeni verinin yazılacağı sonraki boş adresi takip eder.
   - Okuma İşaretçisi (rd_ptr): Okunacak sonraki geçerli verinin adresini takip eder.
3. Kontrol Sinyalleri: Yazma isteği (wr_en) ve okuma isteği (rd_en).
4. Durum Bayrakları (Status Flags):
   - Dolu Bayrağı (full): FIFO tamamen dolduğunda lojik 1 olur ve veri okunana kadar yeni yazma işlemlerini engeller.
   - Boş Bayrağı (empty): FIFO'da okunacak veri kalmadığında lojik 1 olur ve yeni veri yazılana kadar okuma işlemlerini durdurur.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Yığın (Stack / LIFO) Bellek Mimarisi Nedir?",
        content: `LIFO (Last In, First Out - Son Giren İlk Çıkar), verilerin eklenme sırasının tersi yönde işlendiği temel bir bellek organizasyon prensibidir. LIFO mimarisine göre depolanan en son veri elemanı, ilk çıkartılacak olan elemandır.

Bu konsept üst üste dizilmiş tabaklara benzer: En son konulan tabak en üsttedir ve ilk olarak o alınır; en alttaki ilk tabağa ulaşmak için ise üstteki tüm tabakların sırayla kaldırılması gerekir.`,
      },
      {
        title: "2. Push ve Pop İşlemleri ile Yığın İşaretçisi (SP) Mantığı",
        content: `LIFO prensibi donanımsal bir yığın (stack) veri yapısı olarak şu temel operasyonlarla çalışır:
- Push (Ekleme): Yeni bir veri elemanı yığının en üstüne eklenir. Bu işlem sırasında Yığın İşaretçisi (Stack Pointer - sp) bir basamak güncellenir.
- Pop (Çıkarma): Yığının en üstündeki eleman bellekten okunur ve yığından çıkarılır. Stack Pointer güncellenir.
- Tepe Elemanı (Top of Stack): Yığına en son eklenen eleman daima tepede yer alır ve doğrudan erişilebilen tek elemandır.

Donanımda yığın kapasitesi aşıldığında overflow, boşken çekilmeye çalışıldığında underflow bayrakları üretilerek sistem kilitlenmeleri önlenir.`,
      },
      {
        title: "3. Yığın Yapısının Donanım ve İşlemci Mimarilerindeki Kullanım Alanları",
        content: `Yığın mimarisi bilgisayar mimarisinde ve gömülü işlemcilerde (CPU/MCU) hayati fonksiyonlara sahiptir:
1. Fonksiyon Çağrıları ve Dönüş Adresleri: Bir alt program veya fonksiyon çağrıldığında (call), program sayacının dönüş adresi (return address) ve işlemci yazmaçları yığına itilir (push). Fonksiyon tamamlandığında (ret) bu değerler yığından çekilerek (pop) ana programa sorunsuz dönülür.
2. Kesme (Interrupt) Yönetimi: Bir donanım kesmesi meydana geldiğinde işlemcinin o anki durumu (context - PSR, PC, genel amaçlı yazmaçlar) donanımsal yığına yedeklenir.
3. Özyinelemeli (Recursive) İşlemler ve İfade Ayrıştırma: Derleyicilerde ve matematiksel işlem birimlerinde parantez ve işlem önceliklerinin çözülmesinde LIFO yapıları kullanılır.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Saat Sinyali (Clock) ve Dijital Devrelerdeki Senkronizasyon",
        content: `Saat sinyali (clock), ardışıl dijital devrelerin kalbidir. Bir devredeki tüm flip-flop'ların, durum makinelerinin ve veri yollarının birbiriyle kusursuz bir senkronizasyon içinde ve öngörülebilir zamanlamayla çalışmasını sağlayan periyodik bir kare dalgadır.`,
      },
      {
        title: "2. Dijital Saat Sinyalinin Temel Özellikleri",
        content: `Bir dijital saat sinyalinin davranışını ve performansını tanımlayan temel parametreler:
- Frekans (f): Sinyalin birim zamandaki (genellikle 1 saniye) çevrim sayısı.
- Periyot (T): Tek bir saat çevriminin tamamlanması için geçen süre.
- Görev Döngüsü (Duty Cycle): Sinyalin bir periyot içinde lojik 1 seviyesinde kaldığı sürenin yüzdesi.
- Saat Fazı (Clock Phase) ve Kayması (Skew): Saat sinyalinin diğer referans saatlere göre zaman düzlemindeki göreli konumu ve gecikmesi.`,
      },
      {
        title: "3. Saat Periyodu ve Frekans Bağıntısı (T = 1/f)",
        content: `Frekans, belirli bir zaman aralığında kaç çevrim gerçekleştiğini belirtir (Hz). Saat periyodu (T) ise tam 1 çevrimin (yükselen kenardan bir sonraki yükselen kenara kadar) tamamlanması için geçen süredir.
Aralarındaki temel ilişki:
T = 1 / f
Örneğin 100 MHz frekansındaki bir saat sinyalinin periyodu:
T = 1 / (100 * 10^6 Hz) = 10 ns
olarak hesaplanır. Verilog testbench'lerinde always #5 clk = ~clk; ifadesi her 5 ns'de bir sinyali tersleyerek 10 ns periyotlu (100 MHz) bir saat sinyali üretir.`,
      },
      {
        title: "4. Görev Döngüsü (Duty Cycle) ve Zamanlama Bütçesi",
        content: `Görev döngüsü (Duty Cycle), saat sinyalinin bir periyot boyunca lojik 1 (yüksek seviye / T_high) seviyesinde kaldığı sürenin toplam periyoda (T_total) oranıdır ve genellikle yüzde (%) olarak ifade edilir:
Duty Cycle = (T_high / T_total) * 100%
İdeal bir dijital saat sinyalinde bu oran %50'dir (T_high = T_low). Ancak saat ağlarındaki gecikmeler, PLL/DLL jitter'ı veya asimetrik sürücüler bu oranı bozabilir. Çift kenar tetiklemeli (DDR) sistemlerde %50 görev döngüsü, hem yükselen hem düşen kenarda veri transferi yapıldığı için son derece kritik bir zamanlama gereksinimidir.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
{
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Buton Sıçraması Önleme (Debounce) Devresi Mimarisi",
        content: `Debounce (sıçrama önleme) devresi; mekanik butonlar, anahtarlar veya rölelerden gelen gürültülü kontak sinyallerini filtreleyerek her bir fiziksel basış için dijital sisteme tam olarak tek bir temiz geçiş ileten kritik bir arayüz devresidir. Verilog ile yazılmış bir debouncer, öncelikle ham giriş sinyalini sistem saatine senkronize eder (metastability koruması), ardından giriş sinyali sabit bir süre boyunca (genellikle 5ms - 20ms) kararlı bir seviyede kaldığında çıkış durumunu günceller.`,
      },
      {
        title: "2. Debounce Tasarımında Öğrenilecek Temel Konular",
        content: `Bu bölümde öğreneceğiniz temel mühendislik ilkeleri:
- Mekanik kontak sıçramasının (mechanical bounce) fiziksel nedenleri ve dijital devreler üzerindeki yıkıcı etkileri.
- İki kademeli senkronizör (input synchronizer) içeren Sayıcı Tabanlı Debounce (Counter-Based Debouncer) devresinin Verilog ile tasarımı.
- Kaydırmalı Kaydedici Tabanlı Debounce (Shift Register Debouncer) devresi ile karşılaştırma ve kaynak tüketimi analizi.
- Gerçek donanım için sıçrama süresinin doğru boyutlandırılması ve simülasyonda bekleme sürelerini kısaltarak hızlı test etme stratejileri.`,
      },
      {
        title: "3. Mekanik Kontak Sıçraması Nedir ve Neden Filtrelenmelidir?",
        content: `Mekanik buton ve anahtarlar basıldığında 0'dan 1'e anında ve pürüzsüz bir geçiş yapamazlar. Metal kontaklar birbirine çarptığında mekanik esneklik nedeniyle oturana kadar mikrosaniyelik aralıklarla defalarca temas eder ve ayrılır (bounce).

Tipik bir sıçrama süresi 5 ms ile 20 ms arasında sürer. 50 MHz saat frekansında çalışan bir dijital sistem için 10 ms'lik bir süre, tam 500.000 saat çevrimine karşılık gelir!

Debounce devresi kullanılmadığında, dijital lojik her bir sıçramayı ayrı bir kenar geçişi olarak algılar. Sonuç olarak kullanıcı butona tek bir kez bastığında:
- Sayıcılar onlarca kez artabilir,
- Durum makineleri istenmeyen durumlara atlayabilir,
- Menüler kontrolsüz şekilde kayabilir.

Debounce işlemi, bu sahte darbe fırtınasını tek ve temiz bir lojik seviye değişimine dönüştürür.`,
      },
      {
        title: "4. Sayıcı Tabanlı Debounce Mantığı ve Zamanlayıcı Boyutlandırma",
        content: `En güvenilir ve yaygın kullanılan yöntem Sayıcı Tabanlı Debounce (Counter-Based Debouncer) mimarisidir.

Çalışma Mantığı:
1. Buton sinyali önce 2 kademeli D flip-flop senkronizörü ile sistem saatine senkronize edilir (metastabiliteyi önlemek için).
2. Giriş seviyesinde bir değişiklik algılandığında bir dahili sayaç sıfırlanır ve saymaya başlar.
3. Giriş sinyali belirlenen eşik süresi (örneğin 10 ms) boyunca kesintisiz olarak aynı seviyede kalırsa, sayaç hedefe ulaşır ve çıkış pini yeni seviyeye güncellenir.
4. Eğer eşik süresi dolmadan giriş tekrar değişirse (sıçrama gürültüsü), sayaç sıfırlanır ve kararlı durum yeniden beklenir.

Bu sayede tüm yüksek frekanslı mekanik gürültü donanımsal olarak elenir.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
