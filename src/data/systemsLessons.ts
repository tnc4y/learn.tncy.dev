import { LessonContent } from "./lessonsData";

export const SYSTEMS_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // MODERN C++ (C++20)
  // ========================================================
  "cpp-intro": {
    id: "cpp-intro",
    badge: "Modül 1 • C++ Temelleri",
    readingTime: "7 dk okuma",
    level: "İleri Seviye",
    title: "Modern C++ (C++20) ve RAII Mimarisi",
    subtitle: "Sistem programlama ve yüksek başarım: Akıllı işaretçiler (smart pointers), referanslar ve kaynak yönetimi.",
    sections: [
      {
        title: "1. RAII (Resource Acquisition Is Initialization) İlkesi",
        content: `C dilinde veya eski C++'ta bellek sızıntıları (memory leak) ve serbest bırakılmış belleğe erişim (use-after-free) en yaygın hatalardı.

Modern C++, **RAII** kuralı ile bu sorunu çözer:
- Bir kaynak (bellek, dosya tanıtıcısı, soket, mutex kilidi) **kurucu metot (constructor)** içinde tahsis edilir.
- Nesne kapsamdan (scope) çıktığı anda derleyici tarafından **yıkıcı metot (destructor)** çağrılır ve kaynak istisnasız serbest bırakılır.`,
      },
      {
        title: "2. Akıllı İşaretçiler (std::unique_ptr)",
        content: `Modern C++'ta neredeyse hiçbir zaman çıplak \`new\` ve \`delete\` kullanılmaz:`,
        code: {
          language: "cpp",
          caption: "raii_demo.cpp",
          snippet: `#include <iostream>
#include <memory>

class CihazSurucusu {
public:
    CihazSurucusu()  { std::cout << "Donanım bağlandı ve hafıza açıldı.\\n"; }
    ~CihazSurucusu() { std::cout << "Donanım güvenle kapatıldı (Otomatik RAII).\\n"; }
    void veri_oku()  { std::cout << "Sensör verisi: 42\\n"; }
};

int main() {
    {
        // make_unique ile güvenli nesne oluşturma:
        auto surucu = std::make_unique<CihazSurucusu>();
        surucu->veri_oku();
    } // <-- Scope kapandığı anda yıkıcı (destructor) otomatik tetiklenir!

    std::cout << "Scope bitti, hafıza tamamen temizlendi.\\n";
    return 0;
}`,
        },
      },
    ],
    quiz: {
      question: "Modern C++'ta bir nesnenin sahipliğinin tek olmasını garanti eden ve nesne kapsamdan çıkınca belleği otomatik silen akıllı işaretçi hangisidir?",
      options: ["A) std::shared_ptr", "B) std::unique_ptr", "C) std::weak_ptr", "D) raw pointer (*)"],
      correctIndex: 1,
      explanation: "Doğru! std::unique_ptr tekil sahiplik garantisi sunar ve sıfır ek maliyetle (zero-cost abstraction) çalışır.",
    },
  },

  "cpp-references": {
    id: "cpp-references",
    badge: "Modül 1 • Referanslar & Tipler",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Referanslar, const Doğruluğu ve auto Tipi",
    subtitle: "Gereksiz nesne kopyalamalarından kaçınma (pass-by-reference), lvalue/rvalue temelleri ve tip çıkarımı.",
    sections: [
      {
        title: "1. Referanslar (&) vs İşaretçiler (*)",
        content: `C'deki işaretçilerden (pointer) farklı olarak C++ **referansı (\`&\`)**, mevcut bir değişken için doğrudan bir **takma addır (alias)**:
- Bir referans boş (\`nullptr\`) olamaz.
- Tanımlandığı anda bir değişkene bağlanmalıdır ve sonradan başka bir değişkene yeniden bağlanamaz.
- Ok ve yıldız (\`->\` veya \`*\`) operatörlerine gerek kalmadan doğrudan değişken gibi kullanılır.`,
      },
      {
        title: "2. const Referans ile Performanslı Parametre Aktarımı",
        content: `Büyük bir nesneyi (örneğin 1 milyon elemanlı bir vektörü) bir fonksiyona değer olarak geçerseniz (pass-by-value), tüm bellek kopyalanır ve işlemci yavaşlar. \`const Type&\` ile aktarmak sıfır kopyalama maliyeti sağlar:`,
        code: {
          language: "cpp",
          caption: "const_ref.cpp",
          snippet: `#include <iostream>
#include <vector>
#include <string>

// KÖTÜ: Tüm vektör bellekte kopyalanır!
void yazdir_yavas(std::vector<int> v);

// MÜKEMMEL: Sıfır kopyalama + Fonksiyon içinde değiştirilemezlik garantisi:
void yazdir_hizli(const std::vector<int>& v) {
    for (const auto& item : v) {
        std::cout << item << " ";
    }
    std::cout << "\\n";
}

int main() {
    std::vector<int> veriler = {10, 20, 30, 40, 50};
    yazdir_hizli(veriler);
    return 0;
}`,
        },
      },
    ],
    quiz: {
      question: "C++'ta bir fonksiyon parametresinde 'const std::string& str' kullanımının temel amacı nedir?",
      options: [
        "A) Dizgiyi sayıya çevirmek",
        "B) Büyük dizgiyi bellekte kopyalamadan (sıfır maliyetle) güvenle ve salt-okunur olarak geçirmek",
        "C) Dizgiyi dinamik olarak uzatmak",
        "D) Çok kanallı iş parçacığı oluşturmak",
      ],
      correctIndex: 1,
      explanation: "Doğru! const referans ile parametre aktarımı hem derin kopyalama (deep copy) maliyetini ortadan kaldırır hem de fonksiyonun veriyi yanlışlıkla değiştirmesini engeller.",
    },
  },

  "cpp-classes": {
    id: "cpp-classes",
    badge: "Modül 2 • OOP & Sınıf Tasarımı",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Sınıf Mimarisi, Kurucu / Yıkıcı Metotlar ve Rule of 5",
    subtitle: "Modern nesne yönelimli C++: Kapsülleme, taşıma semantiği (Move Semantics) ve Rule of 3/5/0 ilkeleri.",
    sections: [
      {
        title: "1. Taşıma Semantiği (Move Semantics) ve rvalue (&&)",
        content: `C++11 ile gelen taşıma semantiği, geçici nesnelerin pahalı kopyalamalarını önlemek için kaynağı 'çalmayı' (pointer transferi) sağlar.

**Rule of 5 Kuralı:** Eğer bir sınıf dinamik kaynak yönetiyorsa şu 5 metodu açıkça tanımlamalıdır:
1. Yıkıcı (\`~Destructor\`)
2. Kopyalama Kurucusu (\`Copy Constructor\`)
3. Kopyalama Atama Operatörü (\`Copy Assignment\`)
4. Taşıma Kurucusu (\`Move Constructor\`)
5. Taşıma Atama Operatörü (\`Move Assignment\`)`,
        code: {
          language: "cpp",
          caption: "buffer_rule5.cpp",
          snippet: `#include <iostream>
#include <utility>

class Buffer {
    size_t size;
    int* data;
public:
    Buffer(size_t s) : size(s), data(new int[s]) {}
    ~Buffer() { delete[] data; }

    // Taşıma Kurucusu (Move Constructor): Kaynağı devral, eskisini boşalt
    Buffer(Buffer&& other) noexcept : size(other.size), data(other.data) {
        other.size = 0;
        other.data = nullptr; // Çift delete hatasını önle
    }
};`,
        },
      },
    ],
    quiz: {
      question: "C++11 ile gelen taşıma kurucusunda (Move Constructor) diğer nesnenin işaretçisi devralındıktan sonra eski nesnenin işaretçisine ne atanmalıdır?",
      options: ["A) 0xFF", "B) nullptr", "C) new int", "D) free()"],
      correctIndex: 1,
      explanation: "Doğru! Eski nesnenin veri işaretçisine nullptr atanmalıdır ki kapsamdan çıktığında yıkıcısı (destructor) az önce devredilen belleği yanlışlıkla serbest bırakmasın.",
    },
  },

  "cpp-smart-pointers": {
    id: "cpp-smart-pointers",
    badge: "Modül 2 • Akıllı İşaretçiler",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Akıllı İşaretçiler: unique_ptr, shared_ptr, weak_ptr",
    subtitle: "std::shared_ptr referans sayacı (Control Block), std::weak_ptr ile döngüsel referans (Circular Dependency) sızıntılarını kırma.",
    sections: [
      {
        title: "1. std::shared_ptr ve Ortak Sahiplik",
        content: `Bir nesneye birden fazla bileşenin aynı anda sahip olması gerekiyorsa \`std::shared_ptr\` kullanılır.

Arka planda bir **Kontrol Bloğu (Control Block)** içinde referans sayacı (Reference Count) tutar:
- Yeni bir paylaşılan işaretçi oluşturulduğunda sayaç 1 artar.
- Bir işaretçi kapsamdan çıktığında sayaç 1 azalır.
- Sayaç 0'a ulaştığında yönetilen bellek otomatik silinir.`,
      },
      {
        title: "2. Döngüsel Referans Tehlikesi ve std::weak_ptr",
        content: `İki nesne birbirini \`std::shared_ptr\` ile tutarsa referans sayacı asla sıfıra inemez ve bellek sızıntısı oluşur. Bu döngüyü kırmak için sahiplik iddiası olmayan zayıf referans olan **\`std::weak_ptr\`** kullanılır:`,
        code: {
          language: "cpp",
          caption: "smart_pointers.cpp",
          snippet: `#include <iostream>
#include <memory>

class Dugum {
public:
    std::shared_ptr<Dugum> sonraki;
    std::weak_ptr<Dugum>   onceki; // Döngüyü kırmak için weak_ptr!
    ~Dugum() { std::cout << "Dugum silindi\\n"; }
};

int main() {
    auto d1 = std::make_shared<Dugum>();
    auto d2 = std::make_shared<Dugum>();

    d1->sonraki = d2;
    d2->onceki  = d1; // weak_ptr sahiplik sayacını artırmaz

    return 0; // Her iki düğüm de hatasız temizlenir
}`,
        },
      },
    ],
    quiz: {
      question: "İki nesnenin birbirini işaret ettiği durumlarda std::shared_ptr kaynaklı döngüsel referans (circular reference) sızıntısını önlemek için hangi işaretçi tipi kullanılır?",
      options: ["A) std::weak_ptr", "B) std::unique_ptr", "C) void*", "D) auto_ptr"],
      correctIndex: 0,
      explanation: "Doğru! std::weak_ptr referans sayacını artırmayan gözlemci (non-owning) işaretçidir ve döngüsel bağımlılıkları kırar.",
    },
  },

  "cpp-templates": {
    id: "cpp-templates",
    badge: "Modül 3 • Şablonlar & Jenerik Kod",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Şablonlar (Templates) ve Jenerik Programlama",
    subtitle: "Türden bağımsız yüksek başarımlı kod üretimi: Fonksiyon şablonları, sınıf şablonları ve derleme anı uzmanlaşması (Specialization).",
    sections: [
      {
        title: "1. Fonksiyon ve Sınıf Şablonları",
        content: `C++ şablonları, aynı mantığı farklı veri tipleri (\`int\`, \`float\`, \`std::string\`) için tekrar tekrar yazma zahmetinden kurtarır. Derleyici, şablon kullanılan her tip için derleme anında özelleşmiş saf makine kodu üretir (sıfır çalışma anı maliyeti):`,
        code: {
          language: "cpp",
          caption: "templates_demo.cpp",
          snippet: `#include <iostream>

// Fonksiyon Şablonu:
template <typename T>
T en_buyuk(T a, T b) {
    return (a > b) ? a : b;
}

// Sınıf Şablonu (Konteyner):
template <typename T, size_t KAPASITE>
class SabitDizi {
    T elemanlar[KAPASITE];
public:
    size_t boyut() const { return KAPASITE; }
};

int main() {
    std::cout << en_buyuk<int>(10, 25) << "\\n";         // 25
    std::cout << en_buyuk<double>(3.14, 2.71) << "\\n";   // 3.14
    
    SabitDizi<float, 16> ses_tamponu;
    std::cout << "Tampon Boyutu: " << ses_tamponu.boyut() << "\\n";
    return 0;
}`,
        },
      },
    ],
    quiz: {
      question: "C++ şablonları (Templates) kodun hangi aşamasında çalışır ve özelleşmiş sınıfları üretir?",
      options: [
        "A) Çalışma anında (Runtime)",
        "B) Derleme anında (Compile-time)",
        "C) Linker sonrasında",
        "D) İşletim sistemi önyüklemesinde",
      ],
      correctIndex: 1,
      explanation: "Doğru! C++ şablonları tamamen derleme anında (compile-time) işlenir; her kullanılan veri tipi için ayrı ayrı optimize edilmiş kod üretilir.",
    },
  },

  "cpp-stl": {
    id: "cpp-stl",
    badge: "Modül 3 • Standart Kütüphane (STL)",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Standart Şablon Kütüphanesi (STL: vector, map, algoritmalar)",
    subtitle: "Verimli veri yapıları ve algoritmalar: std::vector, std::unordered_map, std::sort ve lambda ifadeleri.",
    sections: [
      {
        title: "1. STL Konteynerleri ve Algoritmaları",
        content: `C++ Standard Template Library (STL) üç temel ayaktan oluşur:
1. **Konteynerler:** \`std::vector\` (dinamik dizi), \`std::unordered_map\` (O(1) hash tablosu), \`std::deque\`.
2. **Yineleyiciler (Iterators):** Konteynerler üzerinde gezinmeyi sağlayan işaretçi soyutlaması.
3. **Algoritmalar (\`<algorithm>\`):** \`std::sort\`, \`std::find_if\`, \`std::accumulate\`.`,
        code: {
          language: "cpp",
          caption: "stl_algorithms.cpp",
          snippet: `#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>

int main() {
    // 1. Dinamik Dizi ve Sıralama (Lambda ile)
    std::vector<int> sayilar = {42, 12, 88, 5, 23};
    std::sort(sayilar.begin(), sayilar.end(), [](int a, int b) {
        return a < b; // Küçükten büyüğe
    });

    // 2. Hash Map (Sözlük)
    std::unordered_map<std::string, int> envanter;
    envanter["STM32F401"] = 15;
    envanter["ESP32-S3"]  = 30;

    std::cout << "Mevcut ESP32 Adedi: " << envanter["ESP32-S3"] << "\\n";
    return 0;
}`,
        },
      },
    ],
    quiz: {
      question: "C++ STL içinde ortalama O(1) zamanda anahtar-değer (Key-Value) araması yapan hash tablosu konteyneri hangisidir?",
      options: ["A) std::vector", "B) std::list", "C) std::unordered_map", "D) std::set"],
      correctIndex: 2,
      explanation: "Doğru! std::unordered_map bir hash tablosu (hash table) uygulamasıdır ve ortalama O(1) sabit zamanda erişim sağlar.",
    },
  },

  // ========================================================
  // RUST SİSTEM PROGRAMLAMA
  // ========================================================
  "rust-intro": {
    id: "rust-intro",
    badge: "Modül 1 • Rust Mimarisi",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Rust: Sahiplik (Ownership) ve Bellek Güvenliği",
    subtitle: "Çöp toplayıcı (Garbage Collector) olmadan derleme anında bellek güvenliği: Ownership, Borrowing ve Eşzamanlılık.",
    sections: [
      {
        title: "1. Sahiplik (Ownership) Kuralları",
        content: `Rust, C++ performansında çalışırken çöp toplayıcı (GC) kullanmadan bellek güvenliğini garanti eden modern sistem dilidir.

Üç temel kural:
1. Rust'taki her değerin bir **sahibi (owner)** olan bir değişkeni vardır.
2. Bir anda yalnızca **tek bir sahip** bulunabilir.
3. Sahip olan değişken tanımlandığı kapsamdan (scope) çıktığında değer otomatik olarak bellekten silinir (\`drop\`).`,
      },
      {
        title: "2. Move (Taşıma) Mekanizması",
        content: `Dinamik bellek ayıran bir String başka bir değişkene atandığında kopyalanmaz; sahipliği aktarılır (Move):`,
        code: {
          language: "rust",
          caption: "ownership_move.rs",
          snippet: `fn main() {
    let s1 = String::from("Rust Sistemleri");
    let s2 = s1; // Sahiplik s2'ye geçti! s1 artık GEÇERSİZDİR.

    // println!("{}", s1); // <-- DERLEME HATASI! use of moved value: s1
    println!("Geçerli: {}", s2);
}`,
        },
      },
    ],
    quiz: {
      question: "Rust dilinde dinamik bellek kullanan bir String başka bir değişkene atandığında varsayılan olarak ne gerçekleşir?",
      options: [
        "A) Bellek derinlemesine kopyalanır (Deep copy)",
        "B) Sahiplik yeni değişkene taşınır (Move) ve eski değişken geçersiz kalır",
        "C) Çöp toplayıcı devreye girer",
        "D) Program kilitlenir",
      ],
      correctIndex: 1,
      explanation: "Doğru! Rust'ta varsayılan semantik taşımadır (Move); sahiplik yeni değişkene devredilir ve eski değişken kullanım dışı kalır.",
    },
  },

  "rust-basics": {
    id: "rust-basics",
    badge: "Modül 1 • Rust Temelleri",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Cargo Paketi, Değişkenler (let mut) ve Skaler Tipler",
    subtitle: "Rust ekosistemine giriş: Cargo build/run, değişmezlik (immutability varsayılanı) ve katı tip kontrolü.",
    sections: [
      {
        title: "1. Varsayılan Olarak Değişmezlik (Immutability)",
        content: `Rust'ta tanımlanan tüm değişkenler varsayılan olarak **değiştirilemezdir (immutable)**. Bir değişkenin değerini sonradan değiştirmek istiyorsanız açıkça **\`mut\`** anahtar kelimesini eklemek zorundasınız:`,
        code: {
          language: "rust",
          caption: "variables.rs",
          snippet: `fn main() {
    let x = 5;
    // x = 6; // HATA! cannot assign twice to immutable variable

    let mut y = 10;
    y = 15; // Başarılı! mut ile değiştirilebilir yapıldı.

    // Sabitler (Constants): Derleme anı değişmezleri
    const MAX_BAGLANTI: u32 = 100_000;
    println!("y: {}, Max: {}", y, MAX_BAGLANTI);
}`,
        },
      },
    ],
    quiz: {
      question: "Rust'ta bir değişkenin değerinin sonradan değiştirilebilmesi için tanımına hangi anahtar kelime eklenmelidir?",
      options: ["A) var", "B) mut", "C) dynamic", "D) change"],
      correctIndex: 1,
      explanation: "Doğru! 'let mut' ifadesi değişkenin değiştirilebilir (mutable) olduğunu belirtir; aksi halde tüm değişkenler sabittir.",
    },
  },

  "rust-borrowing": {
    id: "rust-borrowing",
    badge: "Modül 2 • Ödünç Alma & Referanslar",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Ödünç Alma (&) ve Değiştirilebilir Referanslar (&mut)",
    subtitle: "Borrow Checker kuralları: Aynı anda birden çok salt-okunur referans VEYA tek bir değiştirilebilir referans.",
    sections: [
      {
        title: "1. Referans Alma (&) ve Borrow Checker Kuralları",
        content: `Bir fonksiyona değişken aktarırken sahipliği tamamen devretmek yerine geçici olarak **ödünç (borrow)** verebiliriz:
- \`&T\` : Salt-okunur (immutable) referans.
- \`&mut T\` : Değiştirilebilir (mutable) referans.

**Rust'ın Altın Kuralı:**
Belirli bir kapsamda ya:
- İstediğiniz kadar **salt-okunur referans** (\`&T\`) alabilirsiniz,
- YA DA yalnızca **tek bir değiştirilebilir referans** (\`&mut T\`) alabilirsiniz!
Aynı anda ikisi birden asla bulunamaz. Bu kural veri yarışlarını (Data Race) derleme anında %100 engeller!`,
        code: {
          language: "rust",
          caption: "borrowing_rules.rs",
          snippet: `fn main() {
    let mut metin = String::from("Merhaba");

    metin_ekle(&mut metin); // &mut ile değiştirilebilir ödünç verdik
    println!("{}", metin); // "Merhaba Dünya"
}

fn metin_ekle(m: &mut String) {
    m.push_str(" Dünya");
}`,
        },
      },
    ],
    quiz: {
      question: "Rust Borrow Checker kuralına göre aynı veri için aynı anda kaç adet değiştirilebilir (&mut) referans var olabilir?",
      options: ["A) Sınırsız", "B) Yalnızca 1 adet", "C) En fazla 2 adet", "D) Hiç olamaz"],
      correctIndex: 1,
      explanation: "Doğru! Veri yarışlarını (Data Race) önlemek için Rust bir anda yalnızca TEK BİR değiştirilebilir (&mut) referansa izin verir.",
    },
  },

  "rust-slices": {
    id: "rust-slices",
    badge: "Modül 2 • Dilimler (Slices)",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Dilimler (Slices) ve Koleksiyon Görünümleri",
    subtitle: "Dizilerin veya dizgilerin kopyalanmadan bir parçasına güvenli pencere açma (&str ve &[T]).",
    sections: [
      {
        title: "1. Dilim (Slice) Nedir?",
        content: `Bir dilim, bir koleksiyonun ardışık bir eleman dizisine başvuran referanstır. Koleksiyonun tamamını kopyalamadan bellekteki başlangıç işaretçisi ve uzunluğunu tutar:`,
        code: {
          language: "rust",
          caption: "slices_demo.rs",
          snippet: `fn main() {
    let mesaj = String::from("Rust ile Guvenli Sistemler");
    
    // String dilimleri (&str):
    let ilk_kelime: &str = &mesaj[0..4]; // "Rust"
    println!("İlk Kelime: {}", ilk_kelime);

    // Dizi dilimleri (&[i32]):
    let sayilar = [10, 20, 30, 40, 50];
    let parca: &[i32] = &sayilar[1..4]; // [20, 30, 40]
    println!("Parça Eleman Sayısı: {}", parca.len());
}`,
        },
      },
    ],
    quiz: {
      question: "Rust'ta '&str' tipi ile 'String' tipi arasındaki temel fark nedir?",
      options: [
        "A) &str dinamik büyüyebilir, String büyüyemez",
        "B) String heap bellekte dinamik boyutludur, &str ise bir dizgiye salt-okunur bakan dilim referansıdır",
        "C) &str sadece sayılar içindir",
        "D) Fark yoktur",
      ],
      correctIndex: 1,
      explanation: "Doğru! String sahibi olunan heap tahsisli dinamik dizgidir; &str ise herhangi bir dizgi verisine işaret eden hafif dilim (slice) referansıdır.",
    },
  },

  "rust-structs-enums": {
    id: "rust-structs-enums",
    badge: "Modül 3 • Veri Yapıları & Desenler",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Yapılar (struct), Numaralandırmalar (enum) ve match Deseni",
    subtitle: "C tipi union'lardan çok daha güçlü cebirsel veri tipleri ve kapsamlı kalıp eşleme (pattern matching).",
    sections: [
      {
        title: "1. Veri Taşıyan Enum'lar ve match Eşleme",
        content: `Rust enum'ları C'den farklı olarak her durumun içinde farklı tipte veriler taşıyabilir:`,
        code: {
          language: "rust",
          caption: "enums_match.rs",
          snippet: `enum AgPaketi {
    BaglantiKesildi,
    MetinMesaji(String),
    HareketKomutu { x: i32, y: i32 },
}

fn isle(paket: AgPaketi) {
    match paket {
        AgPaketi::BaglantiKesildi => println!("Bağlantı koptu!"),
        AgPaketi::MetinMesaji(msg) => println!("Gelen mesaj: {}", msg),
        AgPaketi::HareketKomutu { x, y } => println!("Koordinat: ({}, {})", x, y),
    }
}

fn main() {
    let p = AgPaketi::HareketKomutu { x: 100, y: -45 };
    isle(p);
}`,
        },
      },
    ],
    quiz: {
      question: "Rust'ta bir enum üzerinde 'match' ifadesi kullanılırken tüm olasılıkların (variants) kapsanması zorunlu mudur?",
      options: [
        "A) Hayır, sadece istenilenler yazılabilir",
        "B) Evet, Rust match ifadesi 'exhaustive'dir; tüm durumlar veya bir default/wildcard (_) tanımlanmalıdır",
        "C) Yalnızca sayılar için zorunludur",
        "D) match sadece boolean alır",
      ],
      correctIndex: 1,
      explanation: "Doğru! Rust derleyicisi match bloklarının tüm olası varyantları ele almasını zorunlu tutarak beklenmedik durum açıklarını derleme anında engeller.",
    },
  },

  "rust-error-handling": {
    id: "rust-error-handling",
    badge: "Modül 3 • Hata Yönetimi",
    readingTime: "8 dk okuma",
    level: "İleri Seviye",
    title: "Hata Yönetimi: Option, Result ve ? Operatörü",
    subtitle: "Null pointer konseptinin yokluğu: Option<T>, kurtarılabilir hatalar için Result<T, E> ve hatayı yukarı fırlatan ? operatörü.",
    sections: [
      {
        title: "1. Null Yerine Option<T>",
        content: `Rust'ta \`NULL\` veya \`nullptr\` yoktur. Bir değerin var veya yok olabileceğini belirtmek için **\`Option<T>\`** kullanılır:
- \`Some(T)\`: Değer mevcuttur.
- \`None\`: Değer yoktur.`,
      },
      {
        title: "2. Result<T, E> ve '?' Operatörü",
        content: `Kurtarılabilir işlemler \`Result<T, E>\` döner (\`Ok(T)\` veya \`Err(E)\`). \`?\` operatörü hata durumunda fonksiyondan anında erken çıkış (early return) sağlar:`,
        code: {
          language: "rust",
          caption: "error_handling.rs",
          snippet: `use std::fs::File;
use std::io::{self, Read};

fn dosyadan_metin_oku(dosya_yolu: &str) -> Result<String, io::Error> {
    let mut dosya = File::open(dosya_yolu)?; // Hata varsa anında fırlatır!
    let mut icerik = String::new();
    dosya.read_to_string(&mut icerik)?;
    Ok(icerik)
}

fn main() {
    match dosyadan_metin_oku("config.json") {
        Ok(yazi) => println!("Ayar yüklendi: {}", yazi),
        Err(e)   => eprintln!("Dosya okunamadı: {}", e),
    }
}`,
        },
      },
    ],
    quiz: {
      question: "Rust'ta Result döndüren bir fonksiyon çağrısının sonuna '?' eklendiğinde hata oluşursa ne gerçekleşir?",
      options: [
        "A) Program anında çöker (panic)",
        "B) Hata görmezden gelinir",
        "C) Hata (Err) fonksiyondan yukarıdaki çağırana anında fırlatılarak erken çıkılır (early return)",
        "D) Hata otomatik düzeltilir",
      ],
      correctIndex: 2,
      explanation: "Doğru! '?' operatörü işlem Err ise o hatayı fonksiyondan otomatik olarak return eder; Ok ise içindeki değeri açıp değişkene atar.",
    },
  },

  // ========================================================
  // PYTHON 3 PROGRAMLAMA
  // ========================================================
  "python-intro": {
    id: "python-intro",
    badge: "Modül 1 • Python Temelleri",
    readingTime: "6 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Python 3 Temelleri & Veri Yapıları",
    subtitle: "Temiz sözdizimi, dinamik tipler: Listeler, Sözlükler (Dict) ve List Comprehension.",
    sections: [
      {
        title: "1. Pythonic Kodlama ve Veri Yapıları",
        content: `Python; okunabilirlik, hızlı geliştirme ve zengin kütüphane ekosistemiyle modern yazılım dünyasının en popüler dilidir.`,
        code: {
          language: "python",
          caption: "python_basics.py",
          snippet: `# List Comprehension ile temiz liste üretimi:
kareler = [x**2 for x in range(10) if x % 2 == 0]
print(kareler) # [0, 4, 16, 36, 64]

cihaz = {
    "ad": "ESP32",
    "ram_kb": 520,
    "wifi": True
}
print(f"Cihaz: {cihaz['ad']}, RAM: {cihaz['ram_kb']}KB")`,
        },
      },
    ],
    quiz: {
      question: "Python'da anahtar-değer (Key-Value) çiftlerini depolayan yerleşik veri yapısı hangisidir?",
      options: ["A) list", "B) tuple", "C) dict (Sözlük)", "D) array"],
      correctIndex: 2,
      explanation: "Doğru! dict (dictionary) anahtarlar üzerinden değerleri haritalayan yerleşik hash tablosudur.",
    },
  },

  "python-control-flow": {
    id: "python-control-flow",
    badge: "Modül 1 • Akış Kontrolü",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Koşul İfadeleri, Döngüler (for, while) ve Fonksiyonlar",
    subtitle: "if-elif-else blokları, range() ve enumerate() ile döngüler, def ile fonksiyon tanımı.",
    sections: [
      {
        title: "1. Döngülerde 'enumerate' ve 'zip' Gücü",
        content: `Python döngülerinde indeks sayacı tutmak için manuel sayaç artırmak yerine \`enumerate()\` kullanılır:`,
        code: {
          language: "python",
          caption: "loops_functions.py",
          snippet: `sensorler = ["Sicaklik", "Nem", "Basinc", "Isik"]

# İndeks ve değeri birlikte alma:
for sira, sensor in enumerate(sensorler, start=1):
    print(f"{sira}. Sensör: {sensor}")

# Fonksiyon tanımı (Varsayılan parametreli):
def esik_kontrol(deger, esik=50.0):
    if deger > esik:
        return "TEHLIKE"
    elif deger > esik * 0.8:
        return "UYARI"
    else:
        return "NORMAL"

print(esik_kontrol(55.2)) # TEHLIKE`,
        },
      },
    ],
    quiz: {
      question: "Python'da bir liste üzerinde dönerken hem elemanın sıra numarasını (indeks) hem de kendisini aynı anda elde etmek için hangi yerleşik fonksiyon kullanılır?",
      options: ["A) range()", "B) enumerate()", "C) zip()", "D) count()"],
      correctIndex: 1,
      explanation: "Doğru! enumerate(liste) döngüde hem sırayı (0, 1, 2...) hem de ilgili elemanı demet (tuple) olarak döndürür.",
    },
  },

  "python-functions": {
    id: "python-functions",
    badge: "Modül 2 • Fonksiyonlar & İleri Python",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Gelişmiş Fonksiyonlar, *args/**kwargs ve Lambdalar",
    subtitle: "Esnek argüman listeleri, tek satırlık anonim fonksiyonlar (lambda), map ve filter araçları.",
    sections: [
      {
        title: "1. *args ve **kwargs Nedir?",
        content: `- \`*args\` : Fonksiyona iletilen sınırsız sayıdaki konumsal argümanı bir demet (\`tuple\`) olarak toplar.
- \`**kwargs\`: Fonksiyona iletilen sınırsız sayıdaki isimlendirilmiş anahtar-değer parametresini bir sözlük (\`dict\`) olarak toplar.`,
        code: {
          language: "python",
          caption: "advanced_functions.py",
          snippet: `def robot_komutu(komut_adi, *parametreler, **ayarlar):
    print(f"Komut: {komut_adi}")
    print(f"Parametreler: {parametreler}")
    print(f"Ayarlar: {ayarlar}")

robot_komutu("GIT", 10.5, 20.0, hiz="hizli", lidar_aktif=True)

# Lambda İfadesi:
kare_al = lambda x: x * x
print("7'nin Karesi:", kare_al(7))`,
        },
      },
    ],
    quiz: {
      question: "Python'da bir fonksiyona anahtar kelimeli (keyword) istenilen sayıda argüman geçebilmek için parametre tanımında ne kullanılır?",
      options: ["A) *args", "B) **kwargs", "C) &params", "D) ...params"],
      correctIndex: 1,
      explanation: "Doğru! **kwargs (keyword arguments) fonksiyona isimli olarak gönderilen parametreleri sözlük (dict) olarak yakalar.",
    },
  },

  "python-file-io": {
    id: "python-file-io",
    badge: "Modül 2 • Dosya & JSON Yönetimi",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Dosya Yönetimi (with open) ve JSON Veri Ayrıştırma",
    subtitle: "Güvenli dosya okuma/yazma (Context Manager), JSON serileştirme ve yapılandırılmış veri kaydı.",
    sections: [
      {
        title: "1. 'with open' Context Manager Güvenliği",
        content: `Bir dosyayı açtıktan sonra kapatmayı unutursanız işletim sisteminde dosya tanıtıcıları (file descriptors) tükenir. \`with\` bloğu dosya işlemleri bittiğinde dosyayı istisnasız otomatik kapatır:`,
        code: {
          language: "python",
          caption: "json_file_io.py",
          snippet: `import json

telemetri = {
    "istasyon": "Lab-1",
    "sicaklik": 23.4,
    "olcumler": [22.1, 23.0, 23.4]
}

# 1. JSON Dosyasına Yazma
with open("telemetri.json", "w", encoding="utf-8") as f:
    json.dump(telemetri, f, indent=4)

# 2. JSON Dosyasından Okuma
with open("telemetri.json", "r", encoding="utf-8") as f:
    yuklenen_veri = json.load(f)
    print("Yüklenen İstasyon:", yuklenen_veri["istasyon"])`,
        },
      },
    ],
    quiz: {
      question: "Python'da dosya açarken 'with open(...) as f:' kalıbının kullanılmasının en kritik faydası nedir?",
      options: [
        "A) Dosyayı şifreler",
        "B) İşlem bitince veya hata çıksa dahi dosyayı otomatik ve güvenle kapatması (f.close())",
        "C) Dosyayı iki kat hızlı okuması",
        "D) İnternetten dosya indirmesi",
      ],
      correctIndex: 1,
      explanation: "Doğru! 'with' bağlam yöneticisi (context manager), blok sona erdiğinde dosyanın otomatik olarak kapatılmasını garanti eder.",
    },
  },

  "python-oop": {
    id: "python-oop",
    badge: "Modül 3 • Nesne Yönelimli Programlama",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Python ile Nesne Yönelimli Programlama (OOP)",
    subtitle: "__init__ yapıcısı, self kavramı, kalıtım (inheritance) ve kapsülleme ilkeleri.",
    sections: [
      {
        title: "1. Sınıflar, Nesneler ve Kalıtım",
        content: `Python'da sınıflar \`class\` anahtar kelimesiyle tanımlanır. \`__init__\` kurucu metot olup \`self\` nesnenin kendi örneğini temsil eder:`,
        code: {
          language: "python",
          caption: "oop_robot.py",
          snippet: `class Sensor:
    def __init__(self, isim, port):
        self.isim = isim
        self.port = port

    def veri_oku(self):
        return 0.0

# Kalıtım (Inheritance):
class SicaklikSensoru(Sensor):
    def __init__(self, isim, port, birim="C"):
        super().__init__(isim, port)
        self.birim = birim

    def veri_oku(self):
        return 24.5 # Örnek sıcaklık verisi

sensor = SicaklikSensoru("DHT22", "GPIO4")
print(f"{sensor.isim} Değeri: {sensor.veri_oku()}°{sensor.birim}")`,
        },
      },
    ],
    quiz: {
      question: "Python'da bir sınıfın kurucu (constructor) metodunun özel adı nedir?",
      options: ["A) __new__", "B) __init__", "C) construct()", "D) __start__"],
      correctIndex: 1,
      explanation: "Doğru! Bir sınıftan yeni bir nesne örneği türetildiğinde '__init__' başlatıcı metodu otomatik olarak çağrılır.",
    },
  },

  "python-exceptions": {
    id: "python-exceptions",
    badge: "Modül 3 • Hata Yönetimi",
    readingTime: "7 dk okuma",
    level: "Orta Seviye",
    title: "Hata Yönetimi (try/except) ve Özel İstisnalar",
    subtitle: "try-except-else-finally blokları, raise ile istisna fırlatma ve özel Exception sınıfları oluşturma.",
    sections: [
      {
        title: "1. Sağlam Hata Yakalama Mimarisi",
        content: `Programın beklenmedik durumlarda çökmesini engellemek için istisnalar (Exceptions) yakalanır:`,
        code: {
          language: "python",
          caption: "exceptions_demo.py",
          snippet: `class DonanimHatasi(Exception):
    """Özel Donanım İstisna Sınıfı"""
    pass

def sensor_oku(port):
    if port < 0:
        raise DonanimHatasi(f"Geçersiz port numarası: {port}")
    return 100.0

try:
    deger = sensor_oku(-1)
except DonanimHatasi as e:
    print(f"Hata Yakalandı: {e}")
except Exception as e:
    print(f"Genel Hata: {e}")
finally:
    print("Temizlik işlemi tamamlandı (finally her zaman çalışır).")`,
        },
      },
    ],
    quiz: {
      question: "Python'da 'try-except-finally' yapısında 'finally' bloğu ne zaman çalışır?",
      options: [
        "A) Yalnızca hata oluştuğunda",
        "B) Yalnızca hata oluşmadığında",
        "C) Hata olsun ya da olmasın DAİMA çalışır",
        "D) Sadece kullanıcı onaylarsa",
      ],
      correctIndex: 2,
      explanation: "Doğru! 'finally' bloğu hata fırlatılsın veya fırlatılmasın daima yürütülür; kaynakların (dosya, soket) kapatılması için kullanılır.",
    },
  },
};
