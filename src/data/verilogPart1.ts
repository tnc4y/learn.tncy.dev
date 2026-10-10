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
        title: "1. Genel Bakış & Giriş: Verilog'a Başlarken",
        content: `Cebinizdeki akıllı telefon, dizüstü bilgisayarınızdaki işlemci ve otomobilinizdeki kontrol ünitesi; bunların tümü aslında donanım tanımlama kodlarından oluşan metin dosyaları olarak geliştirilmeye başlandı. Verilog, donanım mühendislerinin bu çipleri ve dijital devreleri modellemek için yazdığı temel dillerden biridir; çip tasarımı (ASIC) veya FPGA programlama ve doğrulama (verification) alanında çalışmak isteyen herkes için vazgeçilmez bir yetkinliktir. Bu eğitim serisinde, ilk temel modülünüzden başlayarak sayaçlar (counters), sonlu durum makineleri (FSM), bellek blokları (memories) ve test ortamlarına (testbenches) kadar adım adım ilerleyeceksiniz. Verilog; sayısal (dijital) devreleri metin tabanlı olarak tanımlamak, simüle etmek ve sentezlemek (synthesis) için kullanılan standart bir dildir. Bu bölümde Verilog'un ne olduğu, tarihsel gelişimi, geleneksel yazılım dillerinden temel farkları ve donanım tasarımındaki kritik rolü kapsamlı biçimde ele alınmaktadır.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Verilog'un ne olduğunu ve dijital devre tasarımında nasıl bir devrim yarattığını kavrayacaksınız.
• Verilog ile C/C++, Python gibi geleneksel yazılım dilleri arasındaki temel kavramsal farkları (eşzamanlılık, zamanlama ve donanım modelleme) öğreneceksiniz.
• Donanım soyutlama seviyelerini (abstraction layers) ve davranışsal modelleme (behavioral modeling) mantığını özümseyeceksiniz.
• Doğru sözdizimi (syntax), port tanımları ve modül yapısını kullanarak ilk Verilog modülünüzü tasarlayacaksınız.`,
      },
      {
        title: "3. Verilog Nedir? (Donanım Tanımlama Dili - HDL)",
        content: `Verilog, bir Donanım Tanımlama Dilidir (Hardware Description Language - HDL). Kapılar (logic gates), flip-flop'lar, sayaçlar, karmaşık işlemciler ve tümleşik devrelerin (chip) metin tabanlı kodlarla tanımlanmasını sağlar. 1983-1984 yıllarında Gateway Design Automation bünyesinde mantıksal simülatörler için geliştirilmiştir. 1990 civarında Cadence tarafından satın alındıktan sonra kamuya açılmış, 1995'te IEEE 1364 standardı haline gelmiş ve 2001 ile 2005 yıllarında güncellenmiştir. 2009 yılında ise tüm Verilog özelliklerini kapsayan SystemVerilog (IEEE 1800) standardı ile birleştirilmiştir.

Verilog hem ASIC (özel entegre devre) hem de FPGA (sahada programlanabilir kapı dizisi) tasarımlarında kullanılır. Yazılan kod iki temel amaca hizmet eder:
1. Simülasyon (Simulation): Mantıksal simülatör, devrenin zamanlama ve işlevsel olarak beklenen mantıkta çalışıp çalışmadığını test eder.
2. Sentez (Synthesis): Mantıksal sentez aracı (synthesis tool), bu kodu gerçek mantık kapıları ve flip-flop'lardan oluşan bir ağ listesine (gate-level netlist) dönüştürür.

Verilog çeşitli soyutlama düzeylerini destekler: Kapı seviyesinde yapısal (structural) bağlantılar kurabilir, veri akışını ve saat darbelerine bağlı kayıt aktarımını RTL (Register Transfer Level) düzeyinde modelleyebilir veya devrenin üst düzey işlevini davranışsal (behavioral) olarak ifade edebilirsiniz. Büyük çipler hiyerarşik olarak tasarlanır; toplayıcı ve saklayıcı gibi küçük alt modüller birleştirilerek devasa mikroişlemciler inşa edilir.`,
      },
      {
        title: "4. Gerçek Dünya Uygulamaları ve Endüstriyel Kullanım",
        content: `Günümüzde mikroişlemciler, grafik işlemcileri (GPU), ağ anahtarlayıcıları (network switches), SSD/bellek denetleyicileri ve otomotiv elektroniğindeki güvenlik kontrol üniteleri Verilog veya onun gelişmiş standardı olan SystemVerilog ile tasarlanmaktadır. Tipik bir ticari ASIC çip projesi, yüzlerce mühendisin ayrı modüller halinde geliştirdiği ve hiyerarşik olarak birleştirdiği yüz binlerce, hatta milyonlarca satırlık RTL kodundan oluşur. Aynı Verilog altyapısı, bir hobi kartında veya endüstriyel sürücüde çalışan motor kontrolörleri ve video arayüzleri gibi FPGA projelerinde de birebir kullanılır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Genel Bakış & Giriş: Verilog Diline Giriş",
        content: `Verilog, mühendislerin kapı seviyesinde şematik (schematic) devre çizimleri yapmak yerine sayısal devre davranışlarını metin tabanlı kodlarla tanımlamasını sağlayan standart bir Donanım Tanımlama Dilidir (HDL). Bu sayede otomatik sentez araçları (synthesis tools), yazılan davranışsal veya RTL tanımlarını ASIC ve FPGA çiplerinde fiziksel silikon karşılığı olan gerçek mantık bloklarına dönüştürür.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Verilog'un ne olduğunu ve HDL'lerin donanım tasarım süreçlerini manuel şematik çizimlerden çıkarıp nasıl devrimsel biçimde hızlandırdığını öğreneceksiniz.
• Verilog'un kapı seviyesindeki karmaşık şematikleri davranışsal ve RTL kodlama ile nasıl soyutladığını göreceksiniz.
• Portlar, sinyal tipleri ve yordamsal blokları (always, initial) içeren temel Verilog modül mimarisini inceleyeceksiniz.
• Tasarımların simülasyon ortamında doğrulanmasını sağlayan testbench (test ortamı) mantığını kavrayacaksınız.`,
      },
      {
        title: "3. Mantık Kapılarından Donanım Tanımlamaya",
        content: `Flip-flop gibi sıralı (ardışıl) bir sayısal eleman, NAND ve NOR gibi temel kombinasyonel mantık kapılarıyla oluşturulabilir. Bir flip-flop'un istenen işlevi yerine getirmesi, bu kapıların belirli bir topolojide geri beslemeli olarak bağlanmasıyla sağlanır. Geleneksel dijital tasarımda bu bağlantılar, doğruluk tablosundan (truth table) elde edilen Karnaugh haritaları (K-map) ve Boole cebri sadeleştirmeleriyle hesaplanırdı. Doğruluk tablosu, hangi giriş kombinasyonlarının hangi çıkış değerlerini ürettiğini belirler. Örneğin D tipi bir flip-flop devresinde, aktif-düşük sıfırlama (rstn) ve veri (d) girişlerinin durumuna göre çıkış (q) değeri belirlenir; rstn=1 ve d=1 olduğunda saat darbesiyle q çıkışı 1 olur. Donanım dilleri, tasarımcıyı bu kapıları tek tek birbirine bağlama zorunluluğundan kurtarır.`,
      },
      {
        title: "4. Donanım Şematiği ve Kara Kutu (Black-Box) Soyutlaması",
        content: `Donanım şematiği (hardware schematic), istenen bir donanım işlevselliğini elde etmek için lojik kapıların ve elemanların elektriksel olarak nasıl bağlanması gerektiğini gösteren ayrıntılı bir devre şemasıdır. Ancak giriş-çıkış transfer fonksiyonunu ve davranışını bildiğimiz bir yapının iç bağlantı detaylarını gizleyerek onu bir 'kara kutu' (black-box) olarak paketleyebiliriz. Verilog tam olarak bunu sağlar: Giriş ve çıkış portlarını tanımlar, devrenin iç mantığını ise ister kapı seviyesinde ister davranışsal kodlarla tanımlayarak modüler ve yeniden kullanılabilir bir yapı sunar.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog ile İlk Adım: Hello World Simülasyonu",
        content: `Yeni bir programlama veya donanım dilini öğrenirken en klasik ve etkili başlangıç her zaman bir 'Hello World' örneğidir. Verilog'da tüm kodlar modüller (module ... endmodule) içerisine yazılır ve her modül belirli bir donanım bloğunu veya simülasyon ortamını temsil eder.

// Tek satırlı yorumlar çift eğik çizgi '//' ile başlar
// Test ortamı modülü: giriş-çıkış portu olmayan bağımsız tepe modül
module tb;
  // initial bloğu simülasyon zamanı 0 anında başlar ve bir kez çalıştırılır
  initial begin
    // $display bir Verilog sistem görevidir (system task) ve konsola çıktı basar
    $display("Hello World !");
  end
endmodule

Yukarıdaki örnekte tb adındaki modül, harici giriş-çıkış portu bulundurmadığı için bir tepe simülasyon modülü (top-level testbench) olarak görev yapar. initial bloğu, simülasyon başladığında (zaman 0) tetiklenir. $display ifadesi ise C dilindeki printf benzeri bir sistem görevidir; donanıma sentezlenemez (non-synthesizable), yalnızca simülasyon ortamında tasarımcıya hata ayıklama (debug) ve konsol mesajı sunma amacıyla kullanılır.`,
      },
      {
        title: "2. Sentezlenebilirlik İpucu: Simülasyon ve Donanım Ayrımı",
        content: `Donanım tasarımında en kritik prensiplerden biri, simülasyona özgü yapılar ile sentezlenebilir (synthesizable) RTL yapıları arasındaki ayrımdır. $display, $monitor, $finish gibi sistem görevleri ve initial blokları (genel ASIC tasarımında) doğrudan mantık kapılarına dönüştürülemez; bunlar yalnızca testbench ortamında devrenin çalışmasını doğrulamak için kullanılır. Gerçek bir silikon çipte veya FPGA lojik hücrelerinde hayat bulacak devreler için always, assign ve uygun donanım veri tipleri (wire, reg) kullanılmalıdır.`,
      },
{
        title: "3. Örnek Verilog RTL & Doğrulama Kodu",
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
      }

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
        title: "1. ASIC & SoC Çip Tasarım Akışı (Design Flow)",
        content: `ASIC (Uygulamaya Özel Entegre Devre) ve SoC (Sistem Çipi) tasarım akışı; bir çip fikrinin ilk sistem gereksinimlerinden başlayarak mimari modelleme, RTL kodlama, işlevsel doğrulama (verification), mantıksal sentez (logic synthesis), fiziksel yerleşim (physical design / layout), zamanlama analizi ve üretim sonrası doğrulamaya (post-silicon validation) kadar uzanan sistematik mühendislik metodolojisidir. Yarı iletken endüstrisinde akıllı telefonlardan süper bilgisayarlara kadar tüm özel silikon çipler bu çok aşamalı akış takip edilerek üretilir.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Müşteri gereksinimlerinden çipin fabrikadan çıkıp test edilmesine kadar uzanan uçtan uca ASIC tasarım akışını öğreneceksiniz.
• RTL tasarımı, işlevsel doğrulama ve mantıksal sentezin Verilog kodlarını fiziksel silikon transistörlerine nasıl dönüştürdüğünü kavrayacaksınız.
• Çip geliştirme sürecinde mimari, RTL tasarım, doğrulama (DV), DFT ve fiziksel tasarım (PD) mühendislik ekiplerinin rollerini anlayacaksınız.
• NVIDIA, Apple, Intel ve Qualcomm gibi küresel yarı iletken devlerinin modern işlemcileri geliştirirken uyguladığı endüstri standardı pratikleri inceleyeceksiniz.`,
      },
      {
        title: "3. VLSI Nedir? (Çok Geniş Ölçekli Tümleşim)",
        content: `VLSI (Very Large Scale Integration - Çok Geniş Ölçekli Tümleşim), milyonlarca veya milyarlarca transistörün tek bir silikon yarı iletken pul (die) üzerinde birleştirilerek entegre devreler (IC) oluşturulmasını sağlayan üretim ve tasarım teknolojisidir. VLSI; modern mikroişlemcilerin, grafik kartlarının, bellek çiplerinin ve yapay zeka hızlandırıcılarının küçük boyutlarda, yüksek hızlarda ve düşük maliyetle üretilebilmesini sağlamıştır. Güncel VLSI süreçleri nanometre altı ölçeklerde çalışmaktadır. TSMC, Samsung ve Intel gibi yarı iletken dökümhaneleri (foundries), 5nm, 3nm ve 2nm sınıfı ileri üretim düğümlerinde tek bir çip üzerinde onlarca milyar transistörü bir araya getirerek rekor düzeyde enerji verimliliği ve hesaplama performansı sunmaktadır.`,
      },
      {
        title: "4. Gerçek Dünya Örneği: İleri Düğüm Entegrasyonu",
        content: `Apple M3 veya NVIDIA Blackwell mimarileri gibi gelişmiş işlemciler, TSMC'nin 3nm/4nm teknolojisiyle tek bir silikon kalıp üzerinde 25 milyardan 200 milyara kadar transistör barındırmaktadır. Bu yongalar; CPU çekirdekleri, çok çekirdekli GPU blokları, derin öğrenme hızlandırıcıları (NPU/Neural Engine), PCIe/DDR bellek kontrolcüleri ve yüksek hızlı I/O arayüzlerini tek bir SoC üzerinde birleştirmektedir. Milyarlarca transistörün kusursuz çalışması, ancak disiplinli bir RTL tasarımı ve katı doğrulama akışları sayesinde mümkündür.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Donanım Tasarımında Soyutlama Seviyeleri (Abstraction Layers)",
        content: `Milyarlarca transistörden oluşan karmaşık bir dijital çipi doğrudan transistör veya fiziksel yerleşim seviyesinde tasarlamak insan zihni ve mühendislik araçları için imkansızdır. Bu karmaşıklığı yönetebilmek için donanım tasarımı hiyerarşik soyutlama seviyelerine (abstraction layers) bölünür. Bu bölümde sistem mimarisinden fiziksel maskeye kadar uzanan tasarım düzeyleri ele alınmaktadır.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Sayısal tasarımın beş temel soyutlama katmanını (Sistem/Mimari, RTL, Kapı/Şematik, Transistör ve Fiziksel Yerleşim) öğreneceksiniz.
• Yukarıdan-aşağıya (top-down) ve aşağıdan-yukarıya (bottom-up) tasarım metodolojileri arasındaki farkları kavrayacaksınız.
• Karmaşık bir çip tasarımında mimari gereksinimleri RTL kodlarına bölme stratejilerini öğreneceksiniz.
• Hangi donanım mühendisliği görevi için hangi soyutlama seviyesinin en uygun olduğunu ayırt edebileceksiniz.`,
      },
      {
        title: "3. Endüstriyel İş Bölümü ve Ekipler Arası Entegrasyon",
        content: `Modern SoC (System-on-Chip) projelerinde yüzlerce mühendis aynı anda farklı soyutlama katmanlarında çalışır. Sistem mimarları C++/Python ile performans modelleri geliştirip spesifikasyonları belirler; RTL tasarım mühendisleri Verilog/SystemVerilog ile mantıksal mimariyi yazar; mantıksal doğrulama (DV) mühendisleri UVM ile işlevselliği test eder; sentez mühendisleri RTL kodunu standart hücre kütüphanelerine (gate-level netlist) eşler; fiziksel tasarım (PD) ekipleri ise saat ağacı sentezi (CTS), yerleşim ve yönlendirme (place & route) yaparak silikon maskelerini hazırlar. Bu soyutlama disiplini, milyarlarca transistörün hatasız üretilmesini mümkün kılan temel unsurdur.`,
      },
      {
        title: "4. Tasarım Soyutlama Katmanlarının Detayları",
        content: `Tasarım soyutlama katmanları, bir donanım sisteminin tanımlanabileceği farklı ayrıntı düzeylerini ifade eder. Bu katmanlar, tasarımcıların alt düzey silikon veya fiziksel detaylarda boğulmadan doğrudan sistem fonksiyonelliğine ve mimariye odaklanmasını sağlar:
1. Sistem Seviyesi (System / Architectural Level): İşlemci komut seti (ISA), veri yolu protokolleri ve bellek mimarisinin tanımlandığı en üst seviye.
2. RTL Seviyesi (Register Transfer Level): Verilerin saat darbeleriyle yazmaçlar (registers) arasında nasıl aktarıldığını ve kombinasyonel lojikle nasıl işlendiğini Verilog ile tanımlayan ana seviye.
3. Kapı Seviyesi (Gate Level): AND, OR, XOR gibi mantık kapılarından ve flip-flop'lardan oluşan netlist seviyesi.
4. Devre / Transistör Seviyesi (Switch / Transistor Level): NMOS ve PMOS transistör modellerinin elektriksel seviyede ele alındığı katman.
5. Fiziksel Seviye (Physical / Layout Level): Çipin silikon üzerindeki difüzyon, polikristal ve metal katmanlarının geometrik çizimleri (GDSII/OASIS).`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-design-abstraction-layers_tb.v - Simülasyon Testbench",
          snippet: `// WRONG - Structurally instantiating individual gates at RTL
and a1 (n1, a, b);
and a2 (n2, c, d);
or  o1 (out, n1, n2);`,
        },
      }

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
        title: "1. Geliştirme Ortamı: Simülasyon ve Sentez Araçları",
        content: `Sayısal tasarım öğrenirken, yazdığınız Verilog kodlarını hayata geçiren EDA (Electronic Design Automation) yazılım araçlarını tanımak, dilin sözdizimini öğrenmek kadar kritiktir. İlk testbench'inizi yazıp dalga formlarını (waveforms) incelemekten, karmaşık tasarımları gerçek FPGA veya ASIC donanımlarında sentezlemeye kadar ihtiyaç duyacağınız tüm temel araç zinciri bu bölümde ele alınmaktadır.`,
      },
      {
        title: "2. Tasarım Akışında EDA Araçlarının Rolü",
        content: `Verilog ile kod yazdığınızda aslında bir yazılım değil, dijital donanımın mimari bir tarifini oluşturursunuz. Ancak bu donanım tarifinin beklendiği gibi çalıştığını doğrulamak ve silikon üzerinde fiziksel kapılara dönüştürmek için özelleşmiş EDA araçlarına ihtiyaç duyulur. Bu araçları, kodunuzu doğrulayan (simülatörler) ve onu çalışan fiziksel devrelere çeviren (sentezleyiciler) yüksek teknolojili derleyiciler ve dönüştürücüler olarak düşünebilirsiniz.`,
      },
      {
        title: "3. Sayısal Simülatörler (Logic Simulators)",
        content: `Simülasyon, bir donanım mühendisinin geliştirme sürecinde en çok vakit geçirdiği alandır. Devrenizi pahalı silikon üretimine göndermeden veya FPGA'e programlamadan önce sanal bir laboratuvar ortamında mantıksal ve zamanlamasal olarak test etmenizi sağlar. Endüstride Synopsys VCS, Cadence Xcelium ve Siemens Questa/ModelSim gibi ticari simülatörlerin yanı sıra açık kaynaklı Icarus Verilog (iverilog) ve Verilator araçları yaygın olarak kullanılır. Simülasyon sonuçları genellikle VCD veya FSDB formatında dalga formu dosyalarına kaydedilir ve GTKWave gibi dalga formu görüntüleyicilerinde incelenir.`,
      },
      {
        title: "4. Çevrim İçi ve Bulut Tabanlı Simülasyon Ortamları",
        content: `Modern öğrenme süreçlerinde EDA araçlarının karmaşık kurulumlarıyla uğraşmadan tarayıcı üzerinden Verilog/SystemVerilog kodu yazmayı, simüle etmeyi ve dalga formlarını analiz etmeyi sağlayan bulut tabanlı geliştirme ortamları (IDE) mevcuttur. Bu platformlar sayesinde mühendisler ve öğrenciler, hızlı prototipleme yapabilir, testbench çalıştırabilir ve donanım mantığını anında interaktif olarak doğrulayabilir.`,
      }

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
        title: "1. Verilog Temel Sözdizimi ve Yapısal Kurallar",
        content: `Verilog sözdizimi (syntax); donanım tanımlama kodlarının yazımında uyulması gereken leksikal kuralları, belirteç (token) yapısını ve yapısal standartları belirler. Sayı formatları, tanımlayıcılar (identifiers), anahtar kelimeler (keywords) ve operatörler gibi temel kuralları doğru kavramak; hem simülasyonda beklenen sonucu veren hem de sentez araçları tarafından hatasız donanıma dönüştürülen temiz RTL tasarımları yazmanın temel şartıdır.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Tek ve çok satırlı yorum standartlarını ve Verilog'da boşluk (whitespace) kurallarını öğreneceksiniz.
• Sayı sabitlerini farklı tabanlarda (ikili/binary, onaltılı/hex, sekizli/octal, onlu/decimal) bit genişliği belirterek doğru tanımlamayı kavrayacaksınız.
• Tanımlayıcı (identifier) isimlendirme kurallarını ve rezerve anahtar kelimelerden (reserved keywords) kaçınma yollarını öğreneceksiniz.
• İfadeler içerisinde birli (unary), ikili (binary) ve üçlü (ternary / koşullu) operatörleri doğru kullanmayı öğreneceksiniz.`,
      },
      {
        title: "3. Leksikal Kurallar ve Büyük/Küçük Harf Duyarlılığı",
        content: `Verilog'un leksikal kuralları büyük ölçüde C programlama diline benzer; kaynak kod bir belirteç (token) dizisi olarak işlenir. Bu belirteçler yorumlar, anahtar sözcükler, sayılar, dizgiler veya boşluk karakterleri olabilir. Verilog'da her ifade ve bildirim noktalı virgül (;) ile sonlandırılmalıdır.

Önemli Kural: Verilog büyük/küçük harfe duyarlıdır (case-sensitive). Örneğin data_out ile DATA_OUT veya var_a ile var_A birbirinden tamamen farklı iki sinyal olarak değerlendirilir. Harf uyumsuzlukları, simülasyon ve sentez aşamalarında en sık karşılaşılan tanımsız sinyal hatalarının başında gelir.`,
      },
      {
        title: "4. Yorum Satırları (Comments) ve Kullanım Pratikleri",
        content: `Verilog'da açıklama satırları iki farklı şekilde yazılır:
1. Tek satırlık yorumlar: // ile başlar ve satır sonuna kadar derleyici tarafından yok sayılır.
2. Çok satırlık blok yorumlar: /* ile başlar ve */ ile biter. Çok satırlı blok yorumlar iç içe yerleştirilemez (nested comments geçersizdir); çünkü ilk karşılaşılan */ işareti tüm blok yorumu kapatır ve sözdizimi hatasına yol açar. Ancak blok yorumların içinde // tek satır yorumları yer alabilir.

// Tek satırlık açıklama
integer a; // Bu noktadan satır sonuna kadar olan kısım derleyici tarafından yok sayılır

/*
  Çok satırlı blok açıklama:
  Burası büyük kod bloklarını geçici olarak devre dışı bırakmak veya
  ayrıntılı modül dokümantasyonu yazmak için idealdir.
*/

Pratik İpucu: Hızlı açıklamalar için //, hata ayıklama sırasında geniş kod parçalarını geçici olarak kapatmak için /* ... */ kullanılması tavsiye edilir.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Modül Yapısı (Modules)",
        content: `Modül (module), Verilog'da belirli bir donanım işlevini yerine getiren temel yapı taşıdır. Sayısal devre tasarımının en temel yapı birimi olan modüller; diğer modüllerin içine hiyerarşik olarak yerleştirilebilir (instantiation) ve üst seviyedeki bir modül, alt seviyedeki modüllerle giriş ve çıkış portları (ports) üzerinden haberleşir. Bu yapı modüler, yeniden kullanılabilir ve ölçeklenebilir bir donanım mimarisi kurmayı sağlar.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Verilog modül sözdizimini, port tanımlama standartlarını ve modül çağırma (instantiation) tekniklerini öğreneceksiniz.
• Alt modülleri bir araya getirerek hiyerarşik ve karmaşık sayısal sistemler inşa etmeyi kavrayacaksınız.
• Tasarım (RTL) modülleri ile portsuz tepe simülasyon modülleri (testbench) arasındaki farkı anlayacaksınız.
• Modül sınırları ötesindeki dahili sinyallere simülasyonda erişmek için hiyerarşik isimlendirme kurallarını kullanmayı öğreneceksiniz.`,
      },
      {
        title: "3. Modül Sözdizimi ve Yapısal Özellikler",
        content: `Her modül module anahtar kelimesi ile başlar ve endmodule ile biter. Modül ismi anahtar kelimeden hemen sonra belirtilir ve ardından opsiyonel port listesi parantez içinde tanımlanır:

// Temel ANSI stili modül sözdizimi
module modul_adi (
  input  wire clk,
  input  wire rst_n,
  input  wire data_in,
  output reg  data_out
);
  // Dahili sinyal bildirimleri (wire, reg, integer vb.)
  // Veri akışı ifadeleri (assign)
  // Yordamsal bloklar (always, initial)
  // Alt modül çağrıları (instantiations)
endmodule

Temel Kurallar ve Özellikler:
• Kapsam (Scope): Tüm yürütülebilir donanım tanımları module ... endmodule blokları arasında yer almalıdır. Dışarıda kod bulunamaz.
• Birden Fazla Modül: Tek bir kaynak dosyasında birden fazla modül yer alabilir ve herhangi bir sırada tanımlanabilir; simülatör ve sentezleyiciler bağımlılıkları isim üzerinden çözer.
• Port Listesi: Testbench modüllerinde port listesi boş bırakılabilir (module tb; ... endmodule).
• Yeniden Kullanılabilirlik (Reusability): Bir modül tasarlandıktan sonra aynı veya farklı projelerde benzersiz örnek isimleriyle (instance name) defalarca çağrılabilir.`,
      },
      {
        title: "4. Örnek: D Tipi Flip-Flop (DFF) Modülü",
        content: `Aşağıdaki örnekte üç giriş (d, clk, rstn) ve bir çıkış (q) portuna sahip senkron sıfırlamalı bir D Flip-Flop (DFF) modülü tanımlanmıştır. rstn pini aktif-düşük (active-low) sıfırlama görevi görür; saat sinyalinin yükselen kenarında (posedge clk) rstn sıfır ise çıkış 0 yapılır, aksi takdirde d girişi çıkışa (q) aktarılır:

module dff (
  input      d,     // Veri girişi
  input      clk,   // Saat sinyali
  input      rstn,  // Aktif-düşük senkron reset
  output reg q      // Saklayıcı çıkışı (prosedürel blokta sürüldüğü için reg)
);
  // Sıralı (ardışıl) mantık bloğu: Her pozitif saat darbesinde tetiklenir
  always @ (posedge clk) begin
    if (!rstn)
      q <= 1'b0; // Non-blocking atama: çıkış sıfırlanır
    else
      q <= d;    // Non-blocking atama: veri çıkışa aktarılır
  end
endmodule

Burada sıralı lojik tasarlandığı için atamalarda mutlaka bloklamayan (<= / non-blocking) atama operatörü kullanılmıştır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Port Yapısı ve Giriş-Çıkış Arayüzleri",
        content: `Portlar, bir modülün dış dünyayla ve diğer modüllerle haberleşmesini sağlayan giriş, çıkış ve iki yönlü sinyal terminalleridir. Bir modülü baskılı devre kartı (PCB) üzerine yerleştirilmiş fiziksel bir entegre devre gibi düşündüğünüzde; çipin iç mantığıyla iletişim kurmanın tek yolu onun harici bacaklarıdır (pins). Verilog'daki portlar tam olarak bu fiziksel pinlere karşılık gelir ve modülün sinyal alıp göndermesini sağlar.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Üç temel port yönünü (input, output, inout) ve her birinin donanımdaki karşılığını öğreneceksiniz.
• Geleneksel Verilog-1995 tarzı ile modern ANSI-C (Verilog-2001) port bildirim sözdizimini kavrayacaksınız.
• Aritmetik işlemlerde taşma ve işaret hatalarını önlemek için işaretli (signed) ve işaretsiz port tanımlarını öğreneceksiniz.
• Port tanımlarında sık yapılan geçersiz yeniden bildirim (illegal redeclaration) ve sürücü çakışması hatalarını önlemeyi öğreneceksiniz.`,
      },
      {
        title: "3. Port Türleri ve Yön Bildirimleri",
        content: `Verilog, modüller arası haberleşme için üç temel port yönü sunar:

1. input (Giriş Portu): Modül dışından sadece veri alır, modül içinden sürülemez. Saat sinyalleri, sıfırlama (reset), kontrol sinyalleri ve giriş verileri için kullanılır.
2. output (Çıkış Portu): Modül içinde üretilen sonuçları dış dünyaya aktarır. Durum bayrakları, hesaplanan veri yolları ve kontrol çıkışları için kullanılır.
3. inout (İki Yönlü Port - Bidirectional): Hem veri alabilir hem de veri gönderebilir. Tristate (üç durumlu) tamponlar aracılığıyla çift yönlü veri hatları (örneğin I2C SDA hattı, bellek veri yolları) için kullanılır.

Varsayılan Veri Tipi Kuralı: Portlar varsayılan olarak wire tipindedir. Eğer bir çıkış portu modül içindeki bir yordamsal bloktan (always veya initial) doğrudan sürülecekse, açıkça output reg olarak bildirilmelidir.`,
      },
      {
        title: "4. Port Bildirim Sözdizimi",
        content: `Portlar; yönü, veri tipi, işaret durumu ve bit genişliği belirtilerek tanımlanır:

// ANSI Verilog-2001 Stili (Modern ve Önerilen):
module ornek_modul (
  input  wire       clk,        // 1-bit saat girişi (wire)
  input  wire [7:0] data_in,    // 8-bit veri girişi
  inout  wire [7:0] data_bus,   // 8-bit iki yönlü veri yolu
  output wire       ready,      // wire tipi kombinasyonel çıkış
  output reg  [7:0] data_out    // always bloğunda sürülen reg tipi çıkış
);
  // Modül gövdesi
endmodule

Not: Modern tasarımlarda sinyalin yönünü, tipini ve bit aralığını tek satırda belirten ANSI-C stili bildirim, kod karmaşasını ve hata riskini ortadan kaldırdığı için endüstri standardıdır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Hiyerarşik Tasarım ve Modül Çağırma (Instantiation)",
        content: `Karmaşık sayısal sistemler, daha küçük ve doğrulanmış alt modüllerin hiyerarşik bir ağaç yapısında bir araya getirilmesiyle inşa edilir. Bir modülün başka bir modül içerisinde çağrılıp donanım kopyasının oluşturulmasına modül örnekleme (instantiation) adı verilir. Üst modülün içindeki sinyaller, alt modülün portlarına iki yöntemle bağlanabilir: Sıralı liste yöntemi (by position / ordered list) veya isme göre bağlantı yöntemi (by name).`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Modül çağırma (instantiation) mantığını ve hiyerarşik donanım tasarımındaki kritik rolünü öğreneceksiniz.
• İsimle port bağlama (.port(sinyal)) ile sırayla port bağlama yöntemlerini ve aralarındaki farkları kavrayacaksınız.
• Gerçek projelerde modül örnekleme pratiklerini ve kod örneklerini inceleyeceksiniz.
• Port eşleşmelerinde yapılan yaygın hataları ve endüstri standardı en iyi uygulamaları öğreneceksiniz.`,
      },
      {
        title: "3. Modül Örnekleme Sözdizimi ve Yöntemleri",
        content: `Bir modülü çağırmak için önce modülün tipi, ardından o örneğe verilecek benzersiz isim (instance name) ve port bağlantıları yazılır:

// 1. İsme Göre Bağlantı (Bağlantı İsimle - Şiddetle Tavsiye Edilen Yöntem):
modul_adi u_ornek_adi (
  .port1 (baglanacak_sinyal1),
  .port2 (baglanacak_sinyal2),
  .cikis (baglanacak_cikis)
);

// 2. Sıralı Liste ile Bağlantı (Pozisyonel - Hata Riskine Açık):
modul_adi u_ornek_adi (baglanacak_sinyal1, baglanacak_sinyal2, baglanacak_cikis);

Endüstriyel Tasarım Kuralı: Gerçek projelerde her zaman isme göre bağlantı (.port_name(signal_name)) tercih edilmelidir. Sıralı bağlantıda alt modüldeki portların sırası değiştiğinde sinyaller yanlış eşleşebilir ve bu durum simülasyonda veya silikonda tespit edilmesi son derece güç donanım felaketlerine yol açabilir.`,
      },
      {
        title: "4. Sıralı Liste Yöntemi ve Riskleri",
        content: `Sıralı liste (ordered list) yönteminde, üst modüldeki sinyaller alt modülün tanımlandığı orijinal port sırasına göre virgülle ayrılarak yazılır. Sözdizimi daha kısa görünse de, port sayısı arttıkça yanlış bağlantı yapma riski katlanarak büyür. Bir portun atlanması veya yerinin kayması halinde derleyici her zaman hata vermez ve hatalı sinyaller birbiriyle eşleşir. Bu nedenle basit testbench'ler haricinde endüstriyel tasarımlarda sıralı liste bağlantısı önerilmez.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Veri Tipleri ve 4 Seviyeli Mantık Sistemi",
        content: `Verilog'da veri tiplerinin temel amacı, fiziksel devrelerdeki iki ana unsuru modellemektir: Kapılar ve modüller arasında elektriksel sinyali ileten fiziksel bağlantılar (nets / wires) ile saat darbeleri arasında veriyi saklayan hafıza elemanları (variables / regs / flip-flops). Bu veri tipleri, dijital dünyadaki mantıksal ve elektriksel durumları birebir temsil eder.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Verilog'un 4 değerli mantık sistemini (0, 1, X, Z) ve bunların donanımdaki fiziksel anlamlarını kavrayacaksınız.
• Ağ tipleri (wire) ile değişken tipleri (reg) arasındaki kritik farkları ve ne zaman kullanılacaklarını öğreneceksiniz.
• Test ortamlarında (testbench) kullanılan integer, time, real gibi ek veri tiplerinin işlevini anlayacaksınız.
• Hangi veri tiplerinin donanıma sentezlenebilir (synthesizable), hangilerinin yalnızca simülasyona özgü olduğunu ayırt edeceksiniz.`,
      },
      {
        title: "3. Verilog 4 Seviyeli Mantık Değerleri (0, 1, X, Z)",
        content: `Verilog'daki çoğu veri tipi (real ve event hariç) 4 seviyeli lojik sistemdeki şu değerlerden birini alabilir:

• 0 (Lojik Sıfır): Düşük gerilim seviyesi (GND / Ground), yanlış (false) durumu.
• 1 (Lojik Bir): Yüksek gerilim seviyesi (Vdd / Besleme voltajı), doğru (true) durumu.
• x veya X (Bilinmeyen - Unknown): Değerin 0 mı 1 mi olduğunun belirsiz olduğu durum (başlatılmamış flip-flop'lar veya sürücü çakışmaları).
• z veya Z (Yüksek Empedans - High Impedance): Giriş veya hattın elektriksel olarak boşa çıkarıldığı, hiçbir aktif sürücüye bağlı olmadığı durum (tristate/açık devre).

Dalga formu görüntüleyicilerde (waveform viewer) genellikle 0 ve 1 seviyeleri çizgiyle, X kırmızı renkle (hata/belirsizlik uyarısı), Z ise ortada düz turuncu/mavi çizgiyle gösterilir.`,
      },
      {
        title: "4. Mantık Değerlerinin Donanımsal Karşılığı ve 'X' Yayılımı",
        content: `Verilog donanım modelleme dili olduğu için değer kümesi gerçek silikon fiziğine dayanır. Lojik 1 seviyesi, kullanılan üretim düğümüne bağlı olarak 0.8V ile 3.3V arasındaki besleme gerilimini (Vdd), Lojik 0 ise 0V toprak seviyesini (GND) temsil eder.

Donanım Mühendisliği Notu: Boole cebirindeki 'fark etmez' (don't care - X) kavramı ile Verilog simülasyonundaki X tamamen farklıdır! Verilog'da X, mantıksal değerin bilinmediğini (örneğin güç verildiğinde henüz reset sinyali almamış bir flip-flop içeriğini veya aynı hatta iki zıt sürücünün aynı anda 0 ve 1 basmasını) ifade eder. X değeri girdiği mantık kapılarının çıkışını da X yaparak devrede yayılan bir belirsizliğe dönüşebilir. Bir pine hiçbir sürücü bağlı değilse, hat yüksek empedansta kalır ve Z değeri alır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Skaler ve Vektör Veri Tanımları (Scalar & Vector)",
        content: `Sayısal sistemlerde hem tek bir kontrol biti (örneğin bir flip-flop veya bayrak sinyali) hem de çok bitlik veri yolları (örneğin 32-bitlik bir işlemci veri yolu veya 16-bitlik bir saklayıcı) modellenmelidir. Bu amaçla Verilog; tek bitlik sinyalleri skaler (scalar), çok bitlik gruplanmış sinyalleri ise vektör (vector) olarak adlandırılan net ve reg tipleriyle tanımlar.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Skaler ve vektör kavramlarını, ne zaman tek bit ne zaman çok bitlik vektör tanımlanacağını öğreneceksiniz.
• Vektör tanımlama sözdizimini, MSB/LSB aralık kurallarını ([msb:lsb]) kavrayacaksınız.
• Vektörler üzerinde tek bit seçimi (bit-select) ve parça seçimi (part-select) operasyonlarını inceleyeceksiniz.
• Aralık taşmaları, indeksleme hataları ve sentezlenebilir veri yolu pratiklerini öğreneceksiniz.`,
      },
      {
        title: "3. Skaler ve Vektör Tanımlama Kuralları",
        content: `Köşeli parantez içinde bit aralığı belirtilmeyen bir wire veya reg bildirimi tek bitliktir ve skaler (scalar) olarak adlandırılır. Köşeli parantez ile aralık ([msb:lsb]) belirtildiğinde ise çok bitlik bir vektör (vector) oluşturulur:

wire        ready;      // 1-bit skaler net
wire [7:0]  data_bus;   // 8-bit vektör net (bit 7 en anlamlı, bit 0 en anlamsız)
reg         parity;     // 1-bit skaler reg
reg  [31:0] addr;       // 32-bit vektör reg (adres veri yolu)

Kritik Kurallar:
• Bit Aralığı: Genellikle sol taraftaki değer en anlamlı biti (MSB - Most Significant Bit), sağ taraftaki değer ise en anlamsız biti (LSB - Least Significant Bit) belirtir (ör. [7:0]). Bu küçükten-büyüğe (little-endian) standart biçimdir.
• Sabit İfade Zorunluluğu: Vektör aralığındaki MSB ve LSB değerleri derleme zamanında bilinen sabit ifadeler (constant expressions veya parametreler) olmalıdır. Değişkenler aralık sınırlarında kullanılamaz (ör. wire [my_var:0] a; geçersizdir).`,
      },
      {
        title: "4. Bit Seçimi (Bit-Select) ve Aralık Kuralları",
        content: `Çok bitlik bir vektörün belirli bir tek bitine erişmek veya atama yapmak için indeksleme işlemi yapılır; buna bit seçimi (bit-select) denir:

reg [7:0] addr; // 8-bitlik reg: bit indisleri 7, 6, 5, 4, 3, 2, 1, 0

addr[0] = 1'b1; // 0. bite (LSB) 1 atanır
addr[3] = 1'b0; // 3. bite 0 atanır
// addr[8] = 1'b1; // HATA: 8. bit mevcut değildir (out-of-bounds)

Simülasyon Davranışı: Tanımlı aralığın dışındaki bir bite (out-of-bounds) erişilmeye çalışıldığında veya indeks değeri x veya z olduğunda, okunan değer x (bilinmeyen) olarak döner. Bu durum tasarımcıların indeks taşmalarını ve mantık hatalarını tespit etmesine yardımcı olur.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
        content: `Tasarımın doğru çalıştığını teyit etmek için girişlere uyaran (stimulus) uygulayan testbench modülü:`,
        code: {
          language: "verilog",
          caption: "verilog-scalar-vector_tb.v - Simülasyon Testbench",
          snippet: `wire [msb:lsb] name;
	integer my_msb;
	
	wire [15:0] priority; // msb = 15, lsb = 0
	wire [my_msb: 2] prior; // illegal`,
        },
      }

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
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Verilog'daki fiziksel ağ tiplerini (net types), donanımsal karşılıklarını ve kullanım senaryolarını öğreneceksiniz.
• wire, tri, wand, wor gibi farklı net tiplerinin sözdizimini ve çözümleme kurallarını kavrayacaksınız.
• Çoklu sürücü (multiple drivers), kablolu mantık (wired-logic) ve tristate hat modelleme örneklerini inceleyeceksiniz.
• Sürücü çakışması (contention), X yayılımı ve sentezlenebilirlik açısından en iyi pratikleri öğreneceksiniz.`,
      },
      {
        title: "2. Verilog Fiziksel Ağ Tipleri (Net Types Tablosu)",
        content: `Verilog'da net tipleri, sayısal devrelerdeki elemanlar arasındaki fiziksel elektriksel bağlantıları modeller. Net'ler kendi içlerinde değer saklamaz; aldıkları değer o hatta bağlı sürücülerin (drivers) anlık durumuna göre belirlenir ve bağlantısız kaldıklarında varsayılan değerleri z (yüksek empedans) olur:

• wire: En yaygın net tipi; sürekli atama (assign) ve modül bağlantılarında tekil sürücülü hatları modeller.
• tri: Çoklu sürücüye (tristate) sahip paylaşımlı veri yollarını modeller (wire ile aynı sözdizimine sahiptir).
• wand / triand: Kablolu VE (wired-AND) mantığını modeller; hatta bağlı birden fazla sürücünün değerleri mantıksal VE işlemine tabi tutulur (açık kolektör hatları gibi).
• wor / trior: Kablolu VEYA (wired-OR) mantığını modeller; sürücüler mantıksal VEYA işlemine tabi tutulur.
• tri0 / tri1: Entegre üzerinde indirme (pull-down) veya çekme (pull-up) direnci olan hatları modeller; sürücü olmadığında sırasıyla 0 veya 1 değerini alırlar.
• supply0 / supply1: Sırasıyla sabit mantıksal toprak (GND - 0) ve besleme (Vdd - 1) gerilim hatlarını modeller.
• uwire: SystemVerilog/Verilog-2005 ile gelen, hata önleme amacıyla birden fazla sürücüye izin vermeyen (unresolved wire) tiptir.`,
      },
      {
        title: "3. Wire ve Tri Ağları Arasındaki Farklar ve Çakışma Yönetimi",
        content: `wire ve tri, Verilog'da tamamen aynı sözdizimine ve simülasyon çözümleme tablosuna sahip iki net tipidir. Farklı isimlendirilmelerinin temel amacı, tasarımcının kodun amacını net bir şekilde belgelemesidir:

• wire: Genellikle tek bir kaynak (tek mantık kapısı veya tek bir assign ifadesi) tarafından sürülen tek yönlü standart bağlantılar için kullanılır.
• tri (Tristate): Aynı hatta birden fazla sürücünün bağlı olduğu, farklı zaman dilimlerinde farklı bileşenlerin hattı aktif olarak sürdüğü paylaşımlı veri yollarını (bus) ve tristate yapıları modellemek için kullanılır.

Sürücü Çakışması (Bus Contention): Hem wire hem de tri ağlarında eşit elektriksel kuvvete sahip iki farklı sürücü aynı anda zıt değerler basarsa (biri 1, diğeri 0), hatta kısa devre benzeri bir çakışma meydana gelir ve Verilog simülatörü bu sinyalin değerini anında x (bilinmeyen) olarak çözümler.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Operatörleri ve Donanım Sentezi Karşılıkları",
        content: `Verilog operatörleri; matematiksel hesaplamaları, mantıksal karşılaştırmaları ve bit seviyesinde manipülasyonları gerçekleştirerek dijital devre davranışını tanımlamamızı sağlar. Bir RTL tasarımcısı için en kritik yetkinlik, yazdığı her operatörün mantıksal sentez aracı tarafından fiziksel olarak hangi kapılara, toplayıcılara (adders), karşılaştırıcılara (comparators) veya kaydırıcılara (shifters) dönüştürüleceğini tam olarak öngörebilmektir. Bu bölümde temel operatörler ve donanımsal karşılıkları ayrıntılı olarak incelenmektedir.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Aritmetik operatörleri (+, -, *, /, %, **) ve bunların donanım sentezindeki alan/gecikme maliyetlerini öğreneceksiniz.
• Mantıksal operatörler (&&, ||, !) ile bit düzeyinde operatörler (&, |, ^, ~) arasındaki farkı kavrayacaksınız.
• Eşitlik operatörlerini (==, !=) ve simülasyonda X/Z karşılaştırması yapan vaka eşitlik operatörlerini (===, !==) doğru kullanmayı öğreneceksiniz.
• Mantıksal ve aritmetik kaydırma operatörleriyle (<<, >>, <<<, >>>) 2'nin kuvvetleriyle hızlı çarpma/bölme işlemlerini donanımda en az maliyetle gerçekleştirmeyi öğreneceksiniz.`,
      },
      {
        title: "3. Aritmetik Operatörler ve Sentezlenebilirlik Analizi",
        content: `Aritmetik operatörler matematiksel işlemleri yürütür ve sentez araçları tarafından toplayıcı (adder), çıkarıcı (subtractor), çarpıcı (multiplier) gibi donanım devrelerine dönüştürülür:

• + / -: Toplayıcı ve çıkarıcı devrelerine (carry-lookahead veya ripple-carry) sentezlenir.
• *: Kombinasyonel veya ardışıl donanımsal çarpıcı bloklarına (FPGA DSP dilimleri veya ASIC MAC üniteleri) sentezlenir.
• / ve %: Bölme ve mod operatörleri son derece büyük, yavaş ve pahalı kombinasyonel mantık devreleri üretir. Bölen 2'nin bir kuvveti olmadığı sürece sentezlenebilir RTL'de doğrudan bölme operatörü kullanmaktan kaçınılmalı, bunun yerine kaydırma (>>) veya ardışıl durum makineleri tercih edilmelidir. Sıfıra bölme durumunda sonuç X olur.
• **: Üs alma operatörü yalnızca simülasyon içindir, donanıma sentezlenemez.

Sonuç Bit Genişliği Dikkat Uyarısı: İki adet 8-bitlik sayının çarpımı 16-bitlik bir sonuç üretir (45 x 9 = 405 = 0x195). Eğer sonuç 8-bitlik bir değişkene atanırsa üst bitler budanır (truncation) ve hatalı sonuç (0x95 = 149) elde edilir. RTL tasarımında hedef yazmacın bit genişliği taşmaları karşılayacak şekilde tanımlanmalıdır.`,
      },
      {
        title: "4. Endüstriyel Uygulama: DSP ve Aritmetik Hızlandırıcılar",
        content: `Sayısal İşaret İşleme (DSP) ve Yapay Zeka Hızlandırıcıları: Modern donanımlarda en kritik aritmetik işlem Sonuc = Sonuc + (a * b) formülüne dayanan Çarpma-Biriktirme (MAC - Multiply-Accumulate) işlemidir. AMD/Xilinx ve Intel gibi FPGA üreticileri, yongalarının içine 18x25 veya 27x27 bit donanımsal çarpıcılar ve 48-bit akümülatörler içeren sertleştirilmiş özel DSP blokları yerleştirir. Bu bloklar FIR filtreleri, FFT algoritmaları ve derin öğrenme matris çarpımlarında Verilog aritmetik operatörlerinin en yüksek saat frekansında çalışmasını sağlar.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. İkili ve Birli Aritmetik Operatörlerin Donanımsal Karşılıkları",
        content: `Verilog aritmetik operatörlerinin gerçek donanım bileşenlerine nasıl dönüştüğünü tam olarak kavramak, yüksek performanslı ve verimli sentezlenebilir kod yazmanın temel anahtarıdır. C programlama diline benzer bir sözdizimi sunan Verilog aritmetik operatörleri; iki işlenen üzerinde çalışan ikili (binary) ve tek bir işlenen üzerinde çalışan birli (unary) operatörler olarak iki ana gruba ayrılır.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• İkili ve birli aritmetik operatörlerin donanım sentez mekanizmasını öğreneceksiniz.
• reg ve integer tipleri üzerinde aritmetik işlemlerin donanım devrelerine nasıl eşlendiğini kavrayacaksınız.
• İşaretli (signed) ve işaretsiz (unsigned) aritmetik hesaplamalarda ikiye tümleyen (two's complement) mantığını öğreneceksiniz.
• Gerçek sayılar (real), tanımsız durumlar (X, Z) ve sentezlenemeyen yapılarla ilgili kritik kuralları özümseyeceksiniz.`,
      },
      {
        title: "3. İkili (Binary) Aritmetik Operatörler ve Donanım Karşılıkları",
        content: `Sentezlenebilirlik ilkesine göre, bir işlemin donanıma aktarılabilmesi için ayrık ikili değerler (0 ve 1) üzerinde çalışan fiziksel devre elemanlarına doğrudan eşlenebilmesi gerekir. reg, wire ve integer tipleri üzerindeki standart aritmetik operatörler sentez araçları tarafından şu devrelere dönüştürülür:

• + (Toplama): Carry-lookahead veya ripple-carry toplayıcı devreleri.
• - (Çıkarma): İkiye tümleyen (two's complement) mantığıyla çalışan toplayıcı/çıkarıcı devreleri.
• * (Çarpma): Giriş boyutuna göre dizi çarpıcı (array multiplier) veya Wallace-tree çarpıcı blokları.
• / (Bölme) & % (Mod Alma): Ardışıl veya kombinasyonel bölücü mantık devreleri; çok fazla lojik alan kapladığı için genellikle sentezlenebilir RTL'de kaçınılır. Bölen sıfır ise sonuç x olur.
• ** (Üs Alma): Genellikle sentezlenemez (yalnızca simülasyona özgüdür).

Önemli X ve Z Değeri Kuralı: Bir aritmetik operatörün işlenenlerindeki herhangi bir bit x (bilinmeyen) veya z (yüksek empedans) değerine sahipse, simülasyonda tüm işlemin sonucu doğrudan x haline gelir. Bu nedenle gerçek donanım tasarımlarında bilinmeyen durumların aritmetik bloklara sızmaması için uygun sıfırlama (reset) mekanizmaları kurulmalıdır.`,
      },
      {
        title: "4. Birli (Unary) Aritmetik Operatörler ve Kayan Nokta Kısıtlamaları",
        content: `Birli (unary) aritmetik operatörler tek bir işlenen üzerinde çalışır:
• +m: İşlenenin değerini değiştirmez; doğrudan sinyalin kendisi olarak sentezlenir.
• -m: İşlenenin aritmetik işaretini tersine çevirir. İşaretli (signed) tipler için donanımda ikiye tümleyen (two's complement: ~m + 1) devresi oluşturur.

Kayan Nokta (real) ve Sentez Kısıtlaması: Verilog'da kayan noktalı (floating-point) sayıları temsil eden real ve realtime veri tipleri bulunur. Standart mantıksal sentez araçları, bu tipler üzerindeki temel aritmetik operatörlerden karmaşık IEEE-754 kayan nokta donanımları (FPU) çıkaramaz! Bu nedenle, real veya realtime işlenen içeren hiçbir aritmetik ifade sentezlenemez (non-synthesizable); bu tür yapılar yalnızca simülasyon ve testbench modellemesinde kullanılır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Birleştirme Operatörü (Concatenation \`{}\`)",
        content: `Verilog'da birden fazla tek bitlik veya çok bitlik sinyal, küme parantezleri { ve } ile aralarına virgül konularak daha geniş bir veri yolu veya yazmaç oluşturacak şekilde uç uca birleştirilebilir. Bu işleme birleştirme (concatenation) adı verilir. Birleştirme işleminde sinyallerin yanı sıra ifadeler ve bit genişliği açıkça belirtilmiş sabitler (sized constants) de kullanılabilir. Birleştirmenin toplam bit genişliğinin sentez aracı tarafından hesaplanabilmesi için birleştirilen her bir parçanın bit genişliği derleme anında kesin olarak bilinmelidir.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Birleştirme operatörünün ({}) donanım tasarımındaki rolünü ve veri yolu oluşturma tekniklerini öğreneceksiniz.
• Boyutsuz sabitlerin (unsized constants) oluşturduğu riskleri ve boyutlandırma kurallarını kavrayacaksınız.
• Tekrarlama operatörü ({N{...}}) ile bit çoğaltma ve işaret uzatma (sign-extension) yöntemlerini inceleyeceksiniz.
• Atamanın sol ve sağ tarafında birleştirme kullanımına dair sentezlenebilir pratikleri öğreneceksiniz.`,
      },
      {
        title: "3. Birleştirme Operatörü Kod Örnekleri ve Çalışma Mantığı",
        content: `Birleştirme operatöründe parçalar en soldan en sağa doğru sırayla yerleştirilir. En soldaki eleman en anlamlı bitleri (MSB), en sağdaki ise en anlamsız bitleri (LSB) oluşturur:

wire a, b;              // 1-bitlik teller
wire [1:0] res;         // 2-bitlik sonuç teli
assign res = {a, b};    // res[1] = a, res[0] = b

wire [2:0] c;
wire [7:0] res1;
// 1-bit b, 1-bit a, 2-bit c[1:0], 2-bit 00, 1-bit c[2] -> Toplam 8 bit
assign res1 = {b, a, c[1:0], 2'b00, c[2]};

Sol Tarafta (LHS) Birleştirme: Birleştirme operatörü atamanın sol tarafında da kullanılabilir! Örneğin bir toplayıcıda elde (carry) bitini ve toplamı tek işlemde yakalamak için:

wire [7:0] a, b;
wire [7:0] sum;
wire       cout;
assign {cout, sum} = a + b; // 9-bitlik toplama sonucu elde bitiyle birlikte ayrıştırılır`,
      },
      {
        title: "4. Tekrarlama Operatörü (\`{N{...}}\`) ve İşaret Uzatma",
        content: `Bir sinyalin veya bit örüntüsünün belirli sayıda tekrarlanması gerektiğinde tekrarlama operatörü (replication operator) kullanılır. Sözdizimi {N{ifade}} biçimindedir; burada N negatif olmayan bir tamsayı sabiti olmalıdır (X, Z veya değişken olamaz):

wire        a;
wire [6:0]  res;
assign res = {7{a}}; // 'a' biti 7 kez tekrarlanır (örneğin a=1 ise 7'b1111111)

// 8-bitlik bir sinyali 16 bite işaret uzatma (sign-extension) örneği:
wire signed [7:0]  veri_8bit;
wire signed [15:0] veri_16bit;
assign veri_16bit = {{8{veri_8bit[7]}}, veri_8bit};

Kritik Kural: Tekrarlama ifadesi atamanın sol tarafında (LHS) yer alamaz ve output ya da inout portlarına doğrudan bağlanamaz.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Dizileri ve Bellek Modelleme (Arrays & Memories)",
        content: `Sayısal sistemlerde RAM, ROM, yazmaç öbekleri (register files) ve FIFO kuyrukları gibi veri depolama yapılarını modellemek için çok elemanlı dizilere (arrays) ihtiyaç duyulur. Verilog; reg, wire ve integer veri tipleri için çok boyutlu dizi tanımlamayı destekleyerek donanımsal belleklerin ve lookup tablolarının kolayca modellenmesini sağlar.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Verilog dizilerinin ve bellek yapılarının tanımlanma kurallarını öğreneceksiniz.
• Vektör (vector reg) ile dizi belleği (array of regs / memory) arasındaki temel farkları kavrayacaksınız.
• Çok boyutlu dizilere (multi-dimensional arrays) erişim ve indeksleme pratiklerini göreceksiniz.
• Bellek bloklarının FPGA Block RAM (BRAM) veya dağıtık RAM olarak sentezlenmesindeki en iyi yöntemleri öğreneceksiniz.`,
      },
      {
        title: "3. Dizi ve Bellek Tanımlama Sözdizimi",
        content: `Bir değişken veya net tanımlanırken tanımlayıcı isminden sonra bir adres aralığı belirtilirse bir dizi (array) oluşturulur. reg, wire, integer ve real tiplerinde diziler tanımlanabilir:

reg        y1 [11:0];         // 12 elemanlı, her biri 1-bit skaler reg dizisi
wire [7:0] y2 [3:0];          // 4 elemanlı, her biri 8-bit vektör net dizisi
reg  [7:0] ram [0:1023];      // 1024 derinliğinde, her biri 8-bitlik bellek (RAM)
reg  [7:0] y3 [0:1][0:3];     // 2 satır x 4 sütunluk 2 boyutlu 8-bit reg dizisi

Kritik Fark (Vektör vs. Bellek): N-bitlik tek bir vektör (reg [N-1:0] r;) ile her biri 1-bit olan N elemanlı bir dizi (reg r [0:N-1];) aynı şey DEĞİLDİR! Vektörler tek bir saat darbesinde bütünüyle okunup yazılabilir ve mantıksal işlemlere girebilir; ancak dizilerde aynı anda yalnızca adreslenen tek bir elemana erişilebilir.`,
      },
      {
        title: "4. Dizilere Değer Atama ve İndeksleme Kuralları",
        content: `Standart Verilog-2001'de bir dizinin tüm elemanlarına tek bir atama ile değer verilemez (y1 = 0; geçersizdir). Her elemana kendi indeks numarası belirtilerek ayrı ayrı atanmalıdır:

// Geçerli eleman atamaları:
y2[0]       = 8'ha2; // 0. indekse 0xA2 atanır
y2[2]       = 8'h1c; // 2. indekse 0x1C atanır
y3[1][2]    = 8'hdd; // 2D dizide 1. satır, 2. sütuna 0xDD atanır

Tüm belleği sıfırlamak veya dosyadan yüklemek için simülasyonda for döngüleri ya da $readmemb / $readmemh sistem görevleri kullanılır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Parametrelerin (parameter, localparam) modüler ve yeniden kullanılabilir donanım tasarımındaki rolünü öğreneceksiniz.
• Modül çağrımı sırasında parametre ezme (parameter override - defparam ve #()) yöntemlerini kavrayacaksınız.
• ANSI stili parametrelendirilmiş modül şablonlarını ve kod örneklerini inceleyeceksiniz.
• Derleme zamanı sabitleri ile çalışma zamanı değişkenleri arasındaki farkı anlayarak sık yapılan hataları önleyeceksiniz.`,
      },
      {
        title: "2. Verilog Parametreleri Nedir? (Derleme Zamanı Sabitleri)",
        content: `Parametreler, bir modülün farklı özellik ve boyutlarla (örneğin farklı veri yolu genişlikleri veya FIFO derinlikleri) yeniden kullanılmasını sağlayan derleme zamanı sabitleridir. Örneğin parametrik olarak tasarlanmış bir toplayıcı, modül örneklendiğinde tek bir parametre değeri değiştirilerek 4-bit, 8-bit, 16-bit veya 64-bitlik bir toplayıcıya dönüştürülebilir:

parameter DATA_WIDTH = 32;          // Varsayılan değeri 32 olan parametre
parameter FIFO_DEPTH = 256;         // FIFO derinlik parametresi
parameter [7:0] CONST_VAL = 8'h5A;  // Bit genişliği tanımlanmış parametre

Temel Kural: Parametreler derleme/sentez zamanı sabitleridir. Simülasyonun veya donanımın çalışma zamanında (runtime) değerleri değiştirilemez. Sinyal isimleriyle çakışamazlar.`,
      },
      {
        title: "3. Modül Parametre Bildirimi ve Ezme (Override) Yöntemleri",
        content: `Parametreler modül tanımlanırken varsayılan değerlerle belirtilir ve modül örneklendiğinde istenen yeni değerlerle ezilebilir (override):

// Modern ANSI Stili Parametrik Modül Bildirimi:
module fifo_buffer #(
  parameter DATA_WIDTH = 32,
  parameter FIFO_DEPTH = 512
) (
  input  wire                  clk,
  input  wire                  rst_n,
  input  wire [DATA_WIDTH-1:0] wdata,
  output wire [DATA_WIDTH-1:0] rdata
);
  // Dahili bellek ve kontrol mantığı
endmodule

// Üst Modülde Çağrılırken Parametre Ezme:
fifo_buffer #(
  .DATA_WIDTH(64),  // 32 yerine 64-bit olarak özelleştirildi
  .FIFO_DEPTH(1024) // 512 yerine 1024 derinlik olarak özelleştirildi
) u_fifo_custom (
  .clk   (clk),
  .rst_n (rst_n),
  .wdata (veri_yolu),
  .rdata (okunan_veri)
);

En İyi Pratik: Eski defparam kullanımı hiyerarşik belirsizliklere yol açabildiği için modern standartlarda önerilmez. Her zaman #(.PARAM(deger)) biçimindeki doğrudan örnekleme sözdizimi kullanılmalıdır.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog \`initial\` Bloğu ve Simülasyon Başlatma",
        content: `Verilog'da initial bloğu, simülasyon başladığında (zaman 0) yalnızca bir kez çalışan temel bir yordamsal (procedural) bloktur. Testbench ortamlarında sinyalleri başlangıç durumuna getirmek (initialization), saat ve reset uyarımlarını (stimulus) sürmek ve test senaryolarını sırayla yürütmek için kullanılır. Sürekli tekrarlanan always bloklarının aksine, initial blokları ASIC tasarımlarında genellikle donanıma sentezlenemez (non-synthesizable) ve yalnızca simülasyona özgüdür.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Testbench başlatma ve uyarım üretimi için initial bloğunun ne zaman ve nasıl kullanılacağını öğreneceksiniz.
• Gecikme ifadeleriyle (#zaman) sıralı test senaryoları ve zamanlama dalgaları oluşturmayı kavrayacaksınız.
• Simülasyon zamanı 0'da eşzamanlı başlayan birden fazla initial bloğunun paralel çalışma dinamiğini öğreneceksiniz.
• ASIC sentezi ile FPGA başlatma değerleri arasındaki initial davranış farklarını kavrayacaksınız.`,
      },
      {
        title: "3. İşlev ve Sentezlenebilirlik Sınırları",
        content: `initial bloğu içerisindeki ifadeler sırayla yürütülür ve blok sonlandığında tekrar çalıştırılmaz:

module tb;
  reg clk;
  reg rst_n;

  // Simülasyon uyarımı üretimi
  initial begin
    clk = 0;
    rst_n = 0;   // Reset aktif
    #20 rst_n = 1; // 20 zaman birimi sonra reset kaldırılır
    #100 $finish; // Simülasyonu sonlandır
  end

  // Saat sinyali üretimi
  always #5 clk = ~clk; // 10 zaman birimi periyotlu saat
endmodule

Sentezlenebilirlik Notu: Standart ASIC tasarım akışında initial blokları sentez araçları tarafından tamamen yok sayılır (veya hata verir). FPGA'lerde ise bazı sentezleyiciler FPGA konfigürasyon anında (power-up / bitstream yüklemesi) register'lara başlangıç değeri atamak için initial bloğunu desteklese de, taşınabilir ve güvenilir RTL tasarımı için devre sıfırlaması her zaman açıkça bir reset pini üzerinden yapılmalıdır.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog \`always\` Bloğu ve Yordamsal Mantık",
        content: `always bloğu, Verilog'un hem kombinasyonel hem de ardışıl (sıralı / sequential) mantık devrelerini tanımlamak için kullanılan en güçlü ve en temel yordamsal bloğudur. Blok içindeki ifadeler prosedürel olarak yürütülür, ancak blok bir bütün olarak duyarlılık listesindeki (sensitivity list) olaylara bağlı olarak sürekli ve eşzamanlı olarak tetiklenir.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Duyarlılık listelerini (sensitivity list) ve olay tabanlı (event-driven) yürütme mantığını öğreneceksiniz.
• Seviye duyarlı (level-sensitive) kombinasyonel bloklar ile kenar duyarlı (edge-sensitive) ardışıl bloklar arasındaki farkı kavrayacaksınız.
• İstenmeyen latch (yetkisiz mandal) oluşumunu engelleyen sentez şablonlarını öğreneceksiniz.
• always bloklarında bloklayan (=) ve bloklamayan (<=) atamaların ne zaman kullanılacağını özümseyeceksiniz.`,
      },
      {
        title: "3. Sözdizimi ve Duyarlılık Listesi Belirteçleri",
        content: `Bir always bloğu, @ operatörünü takip eden parantez içindeki olaya göre tetiklenir. Birden fazla ifade varsa begin ... end bloğu arasına alınmalıdır:

// Tek satırlık ifade
always @ (olay)
  ifade;

// Çok satırlı yordamsal blok
always @ (olay) begin
  ifade1;
  ifade2;
end

Olay (Event), sinyallerin değer değişimini (@ (a or b) veya modern sözdiziminde @ (*)) ya da saat sinyalinin yükselen/düşen kenarını (@ (posedge clk) / @ (negedge rst_n)) ifade eder.`,
      },
      {
        title: "4. Duyarlılık Listesi (Sensitivity List) ve Latch Oluşumu",
        content: `Duyarlılık listesi, always bloğunun ne zaman tetikleneceğini belirleyen sinyal grubudur:

1. Seviye Duyarlı (Kombinasyonel Mantık): Girdilerden herhangi biri değiştiğinde çalışır. Verilog-2001 ile gelen @(*) tüm okunan sinyalleri otomatik listeye ekler ve eksik sinyal kaynaklı simülasyon-sentez uyuşmazlıklarını önler:

always @ (*) begin
  out = a & b;
end

2. Kenar Duyarlı (Ardışıl Mantık - Flip-Flop): Yalnızca saat veya asenkron resetin yükselen/düşen kenarında tetiklenir:

always @ (posedge clk or negedge rst_n) begin
  if (!rst_n) q <= 1'b0;
  else        q <= d;
end

Kritik Uyarı: Kombinasyonel bir always bloğunda bir çıkış tüm koşullarda (if-else dallarının tamamında) atanmazsa, sentez aracı değerin korunması gerektiğini varsayar ve istenmeyen bir mandal (inferred latch) üretir; bu da zamanlama analizinde ciddi hatalara yol açar.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Kontrol Blokları ve Akış Denetimi",
        content: `Sayısal devrelerin davranışı; koşullu durumlar, çoklu yol seçicileri (multiplexers) ve kontrol mantığı olmadan modellenemez. Verilog; donanım akışını kontrol etmek ve karar mekanizmaları kurmak için if-else, case, for ve forever gibi prosedürel kontrol blokları sunar.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• if-else-if karar bloklarını ve donanımdaki öncelikli kodlayıcı (priority encoder / mux) karşılıklarını öğreneceksiniz.
• Eksik else durumlarının yol açtığı yetkisiz latch tuzaklarını ve bunlardan kaçınma yollarını kavrayacaksınız.
• forever, repeat, while ve for döngü yapılarının simülasyon ve sentezdeki yerini öğreneceksiniz.
• Donanıma sentezlenebilir kontrol akışı yazmanın temel kurallarını inceleyeceksiniz.`,
      },
      {
        title: "3. \`if-else-if\` Koşul Yapısı ve Donanımsal Öncelik Mantığı",
        content: `if-else-if blokları, belirli koşulların doğruluğuna göre kararlar üretmek için kullanılır. C dilindeki yapıya çok benzemekle birlikte donanımda çok önemli bir mimari anlama sahiptir: if-else-if zinciri bir öncelik yapısı (priority logic) oluşturur. İlk koşul en yüksek önceliğe sahiptir ve sonraki koşullar ancak önceki koşullar sağlanmadığında değerlendirilir; bu da donanımda kaskat bağlı çoklayıcılar (multiplexers) veya öncelikli kodlayıcılar (priority encoders) üretir:

if (kosul_1) begin
  // En yüksek öncelikli durum
end else if (kosul_2) begin
  // İkinci öncelikli durum
end else begin
  // Varsayılan (default) durum
end

Latch Uyarısı: Kombinasyonel lojik tanımlarken tüm olası durumların son bir else bloğu ile kapsandığından emin olunmalıdır; aksi halde devre mevcut durumu hafızada tutmaya çalışarak istenmeyen bir latch sentezler.`,
      },
      {
        title: "4. \`forever\` Döngüsü ve Testbench Saat Üretimi",
        content: `forever döngüsü, içindeki ifadeleri simülasyon boyunca sonsuza kadar kesintisiz olarak yürütür:

initial begin
  clk = 0;
  forever #5 clk = ~clk; // Her 5 zaman biriminde saat sinyalini tersle
end

Kritik Sentez Kuralı: forever döngüsü kesinlikle sentezlenemez (non-synthesizable). İçinde zaman gecikmesi (#delay) olmayan bir forever döngüsü simülatörün zaman ilerlemeden sonsuz döngüye girmesine (hang) sebep olur. Bu nedenle yalnızca testbench'lerde ve mutlaka bir gecikme ifadesiyle birlikte kullanılmalıdır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Blok İfadeleri: Sıralı ve Paralel Yürütme",
        content: `Birden fazla yordamsal ifadeyi tek bir sözdizimsel blok halinde gruplamak için blok ifadeleri (block statements) kullanılır. Verilog'da iki temel blok yapısı bulunur: İfadelerin sırayla yürütüldüğü sıralı bloklar (begin ... end) ve ifadelerin eşzamanlı olarak paralel başlatıldığı paralel bloklar (fork ... join). Blok ifadeleri; yapılandırılmış akış kontrolü, yerel değişken kapsamı (scoping) ve eşzamanlı donanım modelleme olanağı sağlar.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Sıralı bloklarda (begin-end) kümülatif zamanlama ve adımlı yürütme mantığını öğreneceksiniz.
• Paralel bloklarda (fork-join) eşzamanlı iş parçacıklarını ve bağımsız zamanlamayı kavrayacaksınız.
• İsimlendirilmiş blokların (begin : blok_adi) yerel değişken tanımlama ve disable komutuyla döngü kırma amaçlı kullanımını göreceksiniz.
• Sıralı bloklardaki bağıl (relative) gecikmeler ile paralel bloklardaki mutlak (absolute) gecikme anlambilimini ayırt edeceksiniz.`,
      },
      {
        title: "3. Sıralı Bloklar (\`begin ... end\`) ve Kümülatif Gecikme",
        content: `begin ve end anahtar sözcükleri arasına sarılan ifadeler yazılış sırasına göre birbiri ardına yürütülür. Blok içerisindeki gecikme değerleri bir önceki ifadenin tamamlandığı zamana göre kümülatif (birikimli / relative) olarak işlenir:

initial begin
  #10 a = 1; // Zaman 10 anında a = 1
  #20 b = 2; // Zaman 10+20 = 30 anında b = 2
  #5  c = 3; // Zaman 30+5 = 35 anında c = 3
end

Tüm ifadeler sırayla icra edildikten sonra yürütme akışı bir sonraki bloğa geçer. Sentezlenebilir RTL kodlarında tüm prosedürel bloklar begin-end yapısını kullanır.`,
      },
      {
        title: "4. İsimlendirilmiş Bloklar (Named Blocks) ve Yerel Değişken Kapsamı",
        content: `Sıralı bloklar iki şekilde yazılabilir:

// 1. Temel Sıralı Blok:
begin
  ifade1;
  ifade2;
end

// 2. İsimlendirilmiş Sıralı Blok (Named Block):
begin : my_block
  integer i; // Yalnızca bu bloğa özgü yerel değişken tanımlanabilir
  for (i = 0; i < 8; i = i + 1) begin
    if (kosul) disable my_block; // C'deki 'break' gibi bloğu terk eder
  end
end

İsimlendirilmiş bloklar, simülatörde hiyerarşik erişim yolu (scope) oluşturur ve disable ifadesiyle belirli bir bloğu erken sonlandırma olanağı sunar.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Verilog Atama Türleri (Assignments) ve Temel İlkeler",
        content: `Sinyallere (nets) ve değişkenlere (variables) değer aktarma işlemlerine atama (assignment) adı verilir. Farklı atama türlerini ve hangisinin nerede kullanılması gerektiğini tam olarak anlamak, doğru ve güvenilir Verilog kodu yazmanın temel direğidir. Yanlış atama türünün seçilmesi; simülasyon ile donanım arasında uyuşmazlıklara (simulation-synthesis mismatch), yarış koşullarına (race conditions) ve hatalı devre sentezine yol açar.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Üç temel atama formunu (yordamsal / procedural, sürekli / continuous ve yordamsal sürekli) öğreneceksiniz.
• Her bir atama tipinin sol tarafında (LHS) yasal olarak hangi veri tipinin (wire vs reg) yer alabileceğini kavrayacaksınız.
• Bloklayan (=) ve bloklamayan (<=) atamaların donanım mantığındaki ayrımını öğreneceksiniz.
• İleri düzey testbench hata ayıklama işlemlerinde kullanılan force ve release komutlarını tanıyacaksınız.`,
      },
      {
        title: "3. Üç Temel Atama Mekanizması",
        content: `Verilog üç temel atama mekanizması sunar:

1. Sürekli Atamalar (Continuous Assignments): assign anahtar kelimesiyle wire türündeki ağlara yapılır. Kombinasyonel mantığı modeller ve sağ taraftaki herhangi bir sinyal değiştiği anda sürekli olarak sol tarafa yansıtılır.
2. Yordamsal Atamalar (Procedural Assignments): always, initial, görev (task) ve fonksiyon (function) blokları içerisinde yapılır. Sol tarafında mutlaka reg veya integer gibi değişken tipleri yer almalıdır.
3. Yordamsal Sürekli Atamalar (Procedural Continuous Assignments): assign/deassign ve force/release yapılarıdır. Genellikle simülasyon ve testbench ortamlarında belirli sinyalleri geçici olarak ezmek (override) için kullanılır, sentezlenemez.`,
      },
      {
        title: "4. Atama Yapısı: Sol Taraf (LHS) ve Sağ Taraf (RHS)",
        content: `Bir atama ifadesi sol taraf (LHS - Left-Hand Side) ve sağ taraf (RHS - Right-Hand Side) olmak üzere iki ana kısımdan oluşur:

• assign LHS = RHS; -> Sürekli atama (LHS mutlaka wire türünde bir net olmalıdır).
• LHS = RHS; -> Bloklayan prosedürel atama (LHS mutlaka reg türünde bir değişken olmalıdır).
• LHS <= RHS; -> Bloklamayan prosedürel atama (LHS mutlaka reg türünde bir değişken olmalıdır).

Sağ taraf (RHS) bir değere indirgenebilen herhangi bir operatör veya sinyal kombinasyonunu içerebilir. Sol taraf (LHS) ise bu sonucun aktarılacağı hedef donanım sinyalini gösterir.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• assign ifadesiyle sürekli atama (continuous assignment) yaparak kombinasyonel mantık modellemeyi öğreneceksiniz.
• wire (sürekli atanan ağ) ile reg (prosedürel atanan değişken) arasındaki temel farkı kavrayacaksınız.
• assign ifadelerinde birleştirme ({}), parça seçimi ([msb:lsb]) ve tekrarlama operatörlerini kullanmayı öğreneceksiniz.
• Çoklu sürücü çakışmalarını ve boşta kalan hatlardaki yüksek empedans (Z) durumlarını analiz edebileceksiniz.

Fiziksel Benzetim: Breadboard üzerindeki elektriksel bir kabloyu düşünün; kablonun bir ucuna +5V uygulandığı sürece diğer uca bağlı lamba yanacaktır. Verilog'daki assign ifadesi tam olarak bu fiziksel kabloyu temsil eder; sağ taraftaki mantık ifadesinin değeri sürekli olarak sol taraftaki wire teline aktarılır.`,
      },
      {
        title: "2. Sürekli Atama Sözdizimi ve Gecikme Modellemesi",
        content: `Sürekli atama sözdizimi assign anahtar kelimesi ile başlar:

assign <net_ifadesi> = [surucu_kuvveti] [gecikme] <ifade_veya_sabit>;

// Örnekler:
assign out = a & b;              // Temel VE kapısı
assign #5 out_delayed = a ^ b;   // 5 zaman birimi gecikmeli XOR (simülasyon için)
assign {cout, sum} = a + b + cin;// Elde bitli toplayıcı

Gecikme (#delay) parametresi, mantık kapılarının yayılım gecikmesini (propagation delay) simülasyon ortamında modellemek için kullanılır; sentez araçları bu gecikme değerlerini fiziksel kütüphane gecikmeleriyle değiştirdiği için genellikle RTL'de gecikme yazılmaz.`,
      },
      {
        title: "3. \`assign\` İfadelerinde Katı Kurallar ve Özellikler",
        content: `assign ifadelerini kullanırken uyulması gereken kesin kurallar:

1. Sol Taraf (LHS): Her zaman bir wire (skaler, vektör veya bunların birleştirmesi) olmalıdır. Kesinlikle bir reg tipi sol tarafta yer alamaz!
2. Sağ Taraf (RHS): wire, reg, sabitler, operatörler ve fonksiyon çağrılarını içerebilir.
3. Sürekli Aktiflik: Sağ taraftaki (RHS) herhangi bir işlenenin değeri değiştiği anda ifade anında yeniden hesaplanır ve sol taraftaki net güncellenir.
4. Eşzamanlılık (Concurrency): Modül içerisindeki tüm assign satırları birbirine paralel olarak aynı anda çalışır; kod satırlarının alt alta yazılma sırası devrenin işleyişini değiştirmez.`,
      },
{
        title: "4. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "5. Simülasyon ve Testbench Kodu",
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
      }

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
        title: "1. Bloklayan (\`=\`) ve Bloklamayan (\`<=\`) Atamalar",
        content: `Bloklayan (=) ve bloklamayan (<=) atamalar arasındaki farkı ve zamanlama anlambilimini kavramak, doğru ve güvenilir Verilog kodu yazmanın en temel kuralıdır. Yanlış atama operatörünün seçilmesi; simülasyon ile sentezlenmiş netlist arasında uyumsuzluklara, yarış koşullarına (race conditions) ve testbench ortamında kusursuz görünen devrenin gerçek silikon çipte veya FPGA üzerinde tamamen çökmesine yol açar.`,
      },
      {
        title: "2. Bu Bölümde Neler Öğreneceksiniz?",
        content: `• Bloklayan (=) ve bloklamayan (<=) atamaların yürütme anlambilimini (semantics) öğreneceksiniz.
• Verilog simülatör olay kuyruğunda zaman adımı değerlendirme sırasını kavrayacaksınız.
• Kombinasyonel mantık, ardışıl (saatli) mantık ve testbench'ler için doğru atama kurallarını öğreneceksiniz.
• Atama türlerinin yanlış karıştırılmasından kaynaklanan yarış koşullarını tespit edip önleyebileceksiniz.`,
      },
      {
        title: "3. Atama Türleri Karşılaştırması ve Altın Kurallar",
        content: `Donanım Tasarımının İki Altın Kuralı:
1. Kombinasyonel mantık bloklarında (always @(*)) her zaman BLOKLAYAN (=) atama kullanın.
2. Sıralı/Ardışıl mantık bloklarında (always @(posedge clk)) her zaman BLOKLAMAYAN (<=) atama kullanın!

| Özellik | Bloklayan (=) | Bloklamayan (<=) |
| :--- | :--- | :--- |
| Yürütme Sırası | Sıralı (Bir sonraki satırı bloke eder) | Eşzamanlı (Zaman adımının sonuna ertelenir) |
| RHS Değerlendirme | Anında satır başında hesaplanır | İfade çalıştırıldığında anlık örneklenir |
| LHS Güncellenme | Hemen o anda güncellenir | Simülasyon zaman adımının sonunda güncellenir |
| Temel Kullanım | Kombinasyonel lojik, testbench'ler | Ardışıl lojik (Flip-flop, saklayıcılar) |
| Sentez Karşılığı | Mantık kapıları (registersız) | Kaydediciler (Flip-Flop dizileri) |
| Yarış Riski | Ardışıl lojikte kullanılırsa yüksek | Düşük (deterministik saat kenarı davranışı) |`,
      },
      {
        title: "4. Bloklayan Atama Dinamiği ve Simülasyon Sırası",
        content: `Bloklayan atamalar (=), prosedürel bir blok içinde yazıldıkları sırayla birbiri ardına icra edilir. Bir satırdaki atama tamamen bitmeden altındaki satıra geçilmez (yani sonraki ifadeleri 'bloke eder'). Ancak bu durum, başka bir paralel blokta (initial veya always) eşzamanlı çalışan kodları durdurmaz.

Simülasyon Çıktısı Analizi: Testbench ortamında zaman 0 anında paralel başlayan iki initial bloğunda, ilk blokta 'a' atandıktan hemen sonra display çağrıldığında, henüz 'b' ve 'c' atanmadığı için ekranda 0xXX görülür. Ardından gelen atamalar adım adım sırayla yürütülür.

Ardışıl Devrelerde Bloklayan Atama Tehlikesi: Eğer bir shift register (kaydırmalı saklayıcı) zincirinde q2 = q1; q1 = d; şeklinde bloklayan atama kullanılırsa, tek bir saat darbesinde veri doğrudan en başından en sonuna kadar akar ve zincirleme flip-flop davranışı kaybolur! İşte bu yüzden saatli devrelerde her zaman bloklamayan (<=) atama kullanılmalıdır.`,
      },
{
        title: "5. Örnek Verilog RTL & Doğrulama Kodu",
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
        title: "6. Simülasyon ve Testbench Kodu",
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
      }

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
