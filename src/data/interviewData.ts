export interface InterviewQuestion {
  id: string;
  category: "hardware" | "embedded" | "web" | "languages";
  categoryLabel: string;
  categoryColor: string;
  level: "Junior" | "Mid" | "Senior";
  question: string;
  shortSummary: string;
  keyPoints: string[];
  detailedAnswer: string;
  codeSnippet?: {
    language: string;
    snippet: string;
  };
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // ==========================================
  // 1. DONANIM & SYSTEMVERILOG / VERILOG
  // ==========================================
  {
    id: "sv-blocking-nonblocking",
    category: "hardware",
    categoryLabel: "Donanım & FPGA",
    categoryColor: "badge-primary",
    level: "Junior",
    question: "SystemVerilog'da Bloklayan (=) ile Bloklamayan (<=) Atama Arasındaki Fark Nedir?",
    shortSummary: "Bloklayan atama anında yürütülür (kombinasyonel), bloklamayan atama saat kenarı sonunda paralel olarak güncellenir (ardışıl).",
    keyPoints: [
      "always_comb bloklarında ve kombinasyonel mantıkta daima bloklayan (=) kullanılır.",
      "always_ff @(posedge clk) bloklarında ve flip-flop ardışıl mantıkta daima bloklamayan (<=) kullanılır.",
      "Ardışıl blokta '=' kullanılırsa yarış durumu (race condition) ve hatalı simülasyon davranışı oluşur.",
    ],
    detailedAnswer:
      "Bloklayan atama (=), simülasyon delta döngüsünde satır satır işletilir ve o satır bitmeden altındaki satıra geçilmez. Bu durum kombinasyonel mantık (örneğin ALU, Mux) tasarlamak için uygundur.\n\nBloklamayan atama (<=) ise sağ taraftaki (RHS) tüm ifadeleri mevcut zamanda değerlendirir, ancak sol taraftaki (LHS) değişkenlere atamayı saat periyodunun aktif bölgesinin (Active region) sonundaki NBA (Non-Blocking Assignment) bölgesinde eşzamanlı olarak yapar. Bu sayede donanımdaki fiziksel saat kenarı tetiklemeli flip-flop kayıtlarının paralel davranışı kusursuz modellenir.",
    codeSnippet: {
      language: "systemverilog",
      snippet: `// Ardışıl Devre: Shift Register (Doğru Kullanım: <=)
always_ff @(posedge clk) begin
  q1 <= d;   // d'nin eski değeri q1'e
  q2 <= q1;  // q1'in eski değeri q2'ye geçer (2 Flip-Flop)
end

// Kombinasyonel Mantık (Doğru Kullanım: =)
always_comb begin
  out = in1 & in2;
end`,
    },
  },
  {
    id: "sv-logic-vs-reg-wire",
    category: "hardware",
    categoryLabel: "Donanım & FPGA",
    categoryColor: "badge-primary",
    level: "Junior",
    question: "SystemVerilog'daki 'logic' Veri Tipi ile Klasik Verilog 'reg' ve 'wire' Arasındaki Fark Nedir?",
    shortSummary: "logic, reg ve wire karmaşasını kaldıran 4-durumlu genel tiptir; tek sürücülü hemen hemen tüm yerlerde wire ve reg yerine geçer.",
    keyPoints: [
      "Verilog'da procedural blok içinde (always) 'reg', sürekli atamada (assign) 'wire' gerekirdi.",
      "SystemVerilog 'logic' veri tipi hem procedural (always_ff/always_comb) hem de assign içinde kullanılabilir.",
      "logic birden fazla sürücüyü (multiple driver) desteklemez; çift taraflı veriyolu (inout/tri-state) için yine 'wire' kullanılır.",
    ],
    detailedAnswer:
      "Klasik Verilog'da değişkenin yazıldığı yere göre 'wire' veya 'reg' seçmek gerekirdi ve bu durum özellikle yeni başlayanlar için 'reg' anahtar kelimesinin fiziksel flip-flop zannedilmesine yol açardı.\n\nSystemVerilog, 'logic' tipini getirerek bu kafa karışıklığını çözdü. 'logic' 4 duruma (0, 1, X, Z) sahiptir ve tek bir sürücüsü olan hem kombinasyonel hem ardışıl tüm sinyaller için kullanılabilir. Ancak donanımsal paylaşımlı bir veri yolu (örneğin I2C SDA hattı) gibi birden fazla modülün aynı hatta yazması gerektiğinde çözümlenmiş (resolved) 'wire' tipi kullanılmalıdır.",
  },
  {
    id: "sv-fork-join",
    category: "hardware",
    categoryLabel: "Donanım & FPGA",
    categoryColor: "badge-primary",
    level: "Mid",
    question: "fork..join, fork..join_any ve fork..join_none Arasındaki Farklar Nelerdir?",
    shortSummary: "join tüm süreçlerin bitmesini bekler; join_any en az biri bitince devam eder; join_none hiçbirini beklemeden anında devam eder.",
    keyPoints: [
      "fork..join: Bloktaki TÜM paralel iş parçacıkları tamamlanana kadar ana akışı bekletir.",
      "fork..join_any: İş parçacıklarından HERHANGİ BİRİ tamamlandığı an ana akış ilerler (zaman aşımı kontrollerinde idealdir).",
      "fork..join_none: Paralel süreçleri arka planda başlatır ve ana akış HİÇ BEKLEMEDEN anında bir sonraki satıra geçer.",
    ],
    detailedAnswer:
      "Testbench doğrulamasında birden fazla donanım aktörünü veya uyarısını aynı anda tetiklemek için fork..join yapıları kullanılır:\n\n1. `fork..join`: Tipik senaryo; örneğin AXI veriyolunda hem adres hem veri kanalının ikisi de tamamlandığında bir sonraki adıma geçmek için kullanılır.\n2. `fork..join_any`: Genellikle 'Watchdog / Zaman Aşımı' testlerinde kullanılır. Bir iş parçacığı görevi yürütürken diğeri `#1000ns` sayar; hangisi önce biterse akış devam eder.\n3. `fork..join_none`: Arka planda sürekli çalışması gereken bir monitör veya saat üreteci başlatıldığında ana test senaryosunun bloke olmaması için tercih edilir.",
    codeSnippet: {
      language: "systemverilog",
      snippet: `// Zaman Aşımı (Watchdog) Kontrolü Örneği:
fork
  begin
    wait_for_interrupt();
    $display("Kesme zamanında geldi!");
  end
  begin
    #500ns;
    $error("ZAMAN AŞIMI: 500ns içinde kesme gelmedi!");
  end
join_any
disable fork; // Diğer arka plan sürecini durdur`,
    },
  },
  {
    id: "sv-always-comb-vs-always-star",
    category: "hardware",
    categoryLabel: "Donanım & FPGA",
    categoryColor: "badge-primary",
    level: "Senior",
    question: "SystemVerilog 'always_comb' ile Verilog 'always @(*)' Arasındaki 3 Kritik Fark Nedir?",
    shortSummary: "always_comb simülasyon zamanı 0'da otomatik tetiklenir, fonksiyon içi sinyalleri duyarlılık listesine ekler ve mandal (latch) oluşursa derleyici uyarısı verir.",
    keyPoints: [
      "1. Simülasyon zamanı 0'da otomatik çalışma: always_comb t=0'da bir kez çalışıp başlangıç durumunu günceller.",
      "2. Fonksiyon içi sinyal duyarlılığı: always_comb çağrılan fonksiyonların içindeki değişkenleri de duyarlılık listesine otomatik katar.",
      "3. Latch tespit ve niyet bildirimi: Eğer eksik case/if bırakılırsa simülatör ve linter derleme anında uyarı verir.",
    ],
    detailedAnswer:
      "Verilog 2001 ile gelen `always @(*)` duyarlılık listesindeki eksikleri kapatmış olsa da önemli açıkları vardı. SystemVerilog `always_comb` ile şu avantajlar geldi:\n\n1. Simülasyon başlangıcında (t=0) `always @(*)` sinyaller değişene kadar beklerken, `always_comb` henüz sinyal değişmeden önce sistem başlangıcında bir kez zorunlu tetiklenir; böylece başlangıçtaki X ve Z belirsizlikleri çözülür.\n2. `always_comb` içinde bir fonksiyon çağrıldığında, o fonksiyonun kullandığı tüm argümanlar duyarlılık listesine otomatik dahil edilir.\n3. Tasarımcının niyetini (intent) sentezleyiciye açıkça bildirir. Eğer kodda yanlışlıkla bir latch oluşursa derleyici hata veya uyarı fırlatır.",
  },

  // ==========================================
  // 2. GÖMÜLÜ SİSTEMLER & C
  // ==========================================
  {
    id: "c-volatile-keyword",
    category: "embedded",
    categoryLabel: "Gömülü Sistemler",
    categoryColor: "badge-accent",
    level: "Junior",
    question: "Gömülü C'de 'volatile' Anahtar Kelimesi Ne İşe Yarar ve Hangi 3 Durumda Zorunludur?",
    shortSummary: "Derleyiciye bu değişkenin donanım veya başka bir iş parçacığı tarafından her an değiştirilebileceğini söyler; register önbelleğe almayı (caching) engeller.",
    keyPoints: [
      "Bellek Haritalı Donanım Register'ları (MMIO): Durum registerları donanım tarafından her an değişebilir.",
      "Kesme Servis Rutinleri (ISR): Ana döngü ve kesme arasında paylaşılan küresel bayraklar (flags).",
      "Çok İş Parçacıklı (Multi-threaded / RTOS) Paylaşımlı Değişkenler: Diğer task'ların değiştirdiği veriler.",
    ],
    detailedAnswer:
      "Modern derleyiciler kod hızını artırmak için değişkenlerin değerini RAM'den tekrar tekrar okumak yerine CPU register'larında önbelleğe (cache) alır. Örneğin bir `while(flag == 0)` döngüsünde, döngü içinde `flag` değiştirilmiyorsa derleyici bu değişkenin asla değişmeyeceğini varsayar ve sonsuz döngüye sokar.\n\nAncak gömülü sistemlerde donanım pini (örneğin buton) veya donanım kesmesi (ISR) bu bayrağı arka planda değiştirebilir. `volatile` kullanıldığında derleyici değişkenin değerini önbelleğe alamaz; her okuma ve yazma işleminde fiziksel bellek adresine doğrudan erişmek zorunda kalır.",
    codeSnippet: {
      language: "c",
      snippet: `// Yanlış: Derleyici döngüyü sonsuza kitleyebilir (optimizasyon tuzağı)
uint8_t rx_ready = 0; 

// Doğru: Her kontrolde RAM'deki gerçek adrese bakar
volatile uint8_t rx_ready = 0;

void USART_IRQHandler(void) {
  rx_ready = 1; // Kesme içinde set edilir
}

int main(void) {
  while (!rx_ready); // volatile sayesinde kesmeyi hemen algılar
  return 0;
}`,
    },
  },
  {
    id: "c-isr-rules",
    category: "embedded",
    categoryLabel: "Gömülü Sistemler",
    categoryColor: "badge-accent",
    level: "Mid",
    question: "Kesme Servis Rutini (ISR) Yazarken Uyulması Gereken Altın Kurallar Nelerdir?",
    shortSummary: "ISR olabildiğince kısa ve hızlı olmalıdır; asla delay, printf veya bellek tahsisi (malloc) içermemelidir.",
    keyPoints: [
      "Asla bloke edici fonksiyonlar (delay, sleep, karmaşık döngüler) çalıştırılmamalıdır.",
      "Girdi/Çıktı (I/O) ve konsol yazdırma (printf) gibi yavaş kütüphaneler çağrılmamalıdır.",
      "Dinamik bellek tahsisi (malloc/free) yapılmamalıdır (reentrant değildir).",
      "ISR içinde paylaşılan değişkenler daima 'volatile' tanımlanmalıdır.",
      "En iyi pratik: ISR içinde yalnızca donanım bayrağını temizle, bir bayrak set et ve ana döngüye dön.",
    ],
    detailedAnswer:
      "Bir kesme tetiklendiğinde mikrodenetleyici mevcut CPU bağlamını (context) yığına (stack) kaydeder ve kesme fonksiyonuna atlar. Bu sırada diğer kesmeler veya daha düşük öncelikli kritik görevler askıya alınır.\n\nEğer bir ISR içinde `delay()` veya `printf()` çağrılırsa sistem kilitlenebilir, gerçek zamanlı zamanlama garantileri bozulur ve kesme kaçırma (missed interrupt) sorunları yaşanır. Doğru yaklaşım: Kesme anında donanım durumunu kaydetmek ve ağır veriyi (örneğin gelen 100 byte veriyi işleme) ana döngüdeki veya RTOS görevindeki iş parçacığına devretmektir.",
  },
  {
    id: "c-pointers-const",
    category: "embedded",
    categoryLabel: "Gömülü Sistemler",
    categoryColor: "badge-accent",
    level: "Mid",
    question: "'const int *p', 'int * const p' ve 'const int * const p' Arasındaki Fark Nedir?",
    shortSummary: "const yıldızdan önceyse işaret edilen değer sabittir; yıldızdan sonraysa işaretçinin kendisi (adres) sabittir.",
    keyPoints: [
      "const int *p: İşaret edilen tamsayı sabittir (değer değiştirilemez, ancak p başka adresi gösterebilir).",
      "int * const p: İşaretçinin kendisi sabittir (adres sabittir, ancak gösterdiği değer değiştirilebilir).",
      "const int * const p: Hem adres hem de gösterilen değer tamamen sabittir.",
      "Gömülü Sistemlerde: Donanım register adresleri sabit olduğu için 'int * const' veya 'volatile int * const' kullanılır.",
    ],
    detailedAnswer:
      "Bu ayrım özellikle donanım register haritalamalarında ve güvenli fonksiyon parametresi geçişlerinde hayati önem taşır:\n\n1. `const int *p`: 'Pointer to constant int'. `*p = 20;` derleme hatası verir. Fonksiyonlara salt okunur dizi geçirirken kullanılır.\n2. `int * const p`: 'Constant pointer to int'. İşaretçinin tuttuğu bellek adresi bir kez atanır ve değiştirilemez. Mikrodenetleyicinin sabit bir çevre birimi (örneğin GPIO Port A) register adresine işaret ederken kullanılır.\n3. `volatile uint32_t * const GPIOA_ODR`: Gömülü sistemlerdeki en standart register işaretçi şablonudur; hem adres sabittir hem de derleyici optimizasyonunu önler.",
  },
  {
    id: "c-endianness",
    category: "embedded",
    categoryLabel: "Gömülü Sistemler",
    categoryColor: "badge-accent",
    level: "Senior",
    question: "Little-Endian ile Big-Endian Arasındaki Fark Nedir ve C ile Çalışma Anında Nasıl Tespit Edilir?",
    shortSummary: "Little-Endian en önemsiz baytı (LSB) en düşük adrese koyar; Big-Endian ise en önemli baytı (MSB) en düşük adrese koyar.",
    keyPoints: [
      "ARM Cortex-M ve x86 mimarileri varsayılan olarak Little-Endian kullanır.",
      "Ağ protokolleri (TCP/IP) standart olarak Big-Endian (Network Byte Order) kullanır.",
      "C'de 1 baytlık bir pointer veya union kullanarak işlemcinin endian tipi çalışma anında 2 satırda tespit edilebilir.",
    ],
    detailedAnswer:
      "Örneğin 4 baytlık `0x12345678` 32-bit tamsayısını ele alalım:\n\n- **Big-Endian:** En yüksek anlamlı bayt (0x12) en küçük bellek adresinde (0x00) saklanır. İnsan okumasına benzer (12, 34, 56, 78).\n- **Little-Endian:** En düşük anlamlı bayt (0x78) en küçük bellek adresinde (0x00) saklanır (78, 56, 34, 12).\n\nFarklı mimariler arasında (örneğin ARM Cortex MCU ile PC veya Ağ kartı) SPI, UART veya TCP üzerinden ham struct/bayt dizisi gönderirken endian dönüşümü (`ntohl`, `htons`) yapılmazsa veriler tamamen bozulur.",
    codeSnippet: {
      language: "c",
      snippet: `// Çalışma Anında Endian Tespiti:
uint16_t test = 0x0001;
uint8_t *byte_ptr = (uint8_t *)&test;

if (*byte_ptr == 1) {
    printf("Sistem: Little-Endian (Örn: ARM Cortex, x86)\\n");
} else {
    printf("Sistem: Big-Endian (Örn: Ağ protokolü, Eski MIPS)\\n");
}`,
    },
  },

  // ==========================================
  // 3. WEB GELİŞTİRME (HTML, CSS, JS)
  // ==========================================
  {
    id: "js-event-loop",
    category: "web",
    categoryLabel: "Web Geliştirme",
    categoryColor: "badge-error",
    level: "Mid",
    question: "JavaScript'te Event Loop (Olay Döngüsü) ve Call Stack Nasıl Çalışır?",
    shortSummary: "JS tek iş parçacıklıdır (single-threaded); Call Stack boşalınca Microtask (Promise) ve Macrotask (setTimeout) kuyrukları sırayla yürütülür.",
    keyPoints: [
      "Call Stack: Senkron kodların LIFO (Last In First Out) prensibiyle işletildiği yer.",
      "Web APIs / Node APIs: setTimeout, fetch, DOM olayları gibi işlemler tarayıcı arka planında yürütülür.",
      "Microtask Queue (Yüksek Öncelik): Promise (.then/catch), async/await, queueMicrotask.",
      "Macrotask Queue (Düşük Öncelik): setTimeout, setInterval, setImmediate, I/O.",
    ],
    detailedAnswer:
      "JavaScript motoru tek bir ana iş parçacığına (single-threaded) sahiptir. Senkron fonksiyonlar Call Stack'e eklenir ve hemen çalıştırılır. Asenkron bir işlem (örneğin `setTimeout` veya `fetch`) çağrıldığında, tarayıcının Web API katmanı arka planda zamanlayıcıyı veya ağ isteğini yönetir.\n\nİşlem bittiğinde callback fonksiyonu ilgili kuyruğa atılır. Event Loop sürekli olarak Call Stack'i kontrol eder. Call Stack tamamen boşaldığı anda:\n1. Önce Microtask kuyruğundaki TÜM görevleri (Promise callback'leri) tüketir.\n2. Ardından Macrotask kuyruğundaki İLK görevi (setTimeout callback'i) alır ve Call Stack'e gönderir.",
    codeSnippet: {
      language: "javascript",
      snippet: `console.log("1"); // Senkron

setTimeout(() => console.log("2"), 0); // Macrotask

Promise.resolve().then(() => console.log("3")); // Microtask

console.log("4"); // Senkron

// Konsol Çıktısı Sırası: 1 -> 4 -> 3 -> 2`,
    },
  },
  {
    id: "js-closures",
    category: "web",
    categoryLabel: "Web Geliştirme",
    categoryColor: "badge-error",
    level: "Mid",
    question: "Closure (Kapsama) Nedir ve Hangi Amaçlarla Kullanılır?",
    shortSummary: "Bir iç fonksiyonun, dışındaki üst fonksiyon çalışıp bittikten sonra bile onun değişken kapsamına erişebilme yeteneğidir.",
    keyPoints: [
      "Veri Gizleme (Data Encapsulation): Dışarıdan doğrudan erişilemeyen özel (private) değişkenler üretme.",
      "Durum Koruma (State Persistence): Fonksiyonel fabrikalar (function factories) ve sayıcılar.",
      "Hafıza Sızıntısı Riski: Gereksiz referanslar tutulursa Garbage Collector değişkeni bellekten temizleyemez.",
    ],
    detailedAnswer:
      "JavaScript'te fonksiyonlar leksikal kapsam (lexical scoping) kullanır. Bu sayede bir fonksiyon nerede çağrılırsa çağrılsın, nerede tanımlandıysa o çevredeki değişkenlere erişebilir.\n\nClosure; modül deseni (module pattern), React Custom Hook'ları ve kütüphane geliştirmede değişkenleri küresel alandan izole ederek korumak için en sık başvurulan mekanizmadır.",
  },

  // ==========================================
  // 4. SİSTEM VE PROGRAMLAMA DİLLERİ
  // ==========================================
  {
    id: "cpp-raii-smart-pointers",
    category: "languages",
    categoryLabel: "Programlama Dilleri",
    categoryColor: "badge-info",
    level: "Senior",
    question: "Modern C++'ta RAII Prensibi ve Akıllı İşaretçilerin (unique_ptr, shared_ptr) Farkı Nedir?",
    shortSummary: "RAII, kaynağın ömrünü nesnenin yaşam döngüsüne bağlar; unique_ptr sıfır ek maliyetle tek sahiplik, shared_ptr ise sayaçlı ortak sahiplik sunar.",
    keyPoints: [
      "RAII: Kaynak kurucu (constructor) içinde tahsis edilir, yıkıcı (destructor) içinde otomatik serbest bırakılır.",
      "std::unique_ptr: Kaynak üzerinde TEKİL sahiplik sağlar, kopyalanamaz (yalnızca move edilebilir), ham pointer ile aynı performanstadır.",
      "std::shared_ptr: Referans sayacı (reference counting) tutar; son sahip kapsamdan çıkınca nesne silinir.",
      "std::weak_ptr: shared_ptr arasındaki dairesel referans (circular reference) bellek kilitlenmesini önler.",
    ],
    detailedAnswer:
      "Klasik C++'ta manuel `delete` veya `free()` unutulduğunda bellek sızıntıları (memory leaks), iki kez silme (double free) veya geçersiz bellek erişimi (use-after-free) sıkça yaşanırdı.\n\nRAII prensibi sayesinde kaynak yönetimi nesnelerin kapsamına (scope) bağlanmıştır. Fonksiyondan bir hata (exception) veya erken `return` fırlatılsa bile yığın (stack) temizlenirken akıllı işaretçilerin yıkıcı metotları otomatik çağrılır ve dinamik bellek %100 garantili temizlenir.",
    codeSnippet: {
      language: "cpp",
      snippet: `// Sıfır Maliyetli Güvenli Bellek (unique_ptr)
void islemYap() {
    auto dosya = std::make_unique<DonanimAygiti>();
    dosya->oku();
    // Fonksiyon bitince dosya otomatik silinir (delete gerekmez!)
}`,
    },
  },
  {
    id: "rust-ownership-borrowing",
    category: "languages",
    categoryLabel: "Programlama Dilleri",
    categoryColor: "badge-info",
    level: "Senior",
    question: "Rust Dilinde Sahiplik (Ownership) ve Ödünç Alma (Borrowing) Kuralları Nelerdir?",
    shortSummary: "Her değerin tek bir sahibi vardır; kapsam bitince bellek otomatik boşaltılır. Aynı anda ya birden çok okuma referansı (&) ya da tek bir yazma referansı (&mut) olabilir.",
    keyPoints: [
      "1. Kural: Rust'taki her değerin 'sahibi (owner)' adı verilen tek bir değişkeni vardır.",
      "2. Kural: Bir anda yalnızca bir sahip olabilir (Atama yapıldığında sahiplik devredilir - Move).",
      "3. Kural: Sahip kapsamdan (scope) çıktığında, değer otomatik bellekten atılır (drop).",
      "Ödünç Alma Kuralı: Aynı anda dilediğiniz kadar &T (okuma) referansı VEYA yalnızca tek bir &mut T (yazma) referansı alabilirsiniz. Asla ikisi bir arada olamaz!",
    ],
    detailedAnswer:
      "Rust, garbage collector (çöp toplayıcı) kullanmadan C/C++ hızında bellek güvenliği sağlayan tek modern sistem dilidir. Bu gücünü derleme anında çalışan 'Borrow Checker' mekanizmasından alır.\n\nBirden fazla iş parçacığının aynı anda aynı belleğe yazmasını (data race) ve bir işaretçinin geçersiz adresi göstermesini (dangling pointer) çalışma anında değil, henüz derleme anında hata vererek tamamen engeller.",
  },
];
