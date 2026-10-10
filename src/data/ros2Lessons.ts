import { LessonContent } from "./lessonsData";

export const ROS2_LESSONS: Record<string, LessonContent> = {
  // ========================================================
  // 1. ROS 2 MİMARİSİ & DDS TEMELLERİ
  // ========================================================
  "ros2-intro": {
    id: "ros2-intro",
    badge: "Modül 1 • ROS 2 Mimarisi",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "ROS 2 Nedir? ROS 1 vs ROS 2 Mimarisi & Gerçek Zamanlılık",
    subtitle: "Merkezi roscore mimarisinden dağıtık DDS ağına, mikrodenetleyiciden süper bilgisayarlara uzanan yeni nesil robotik omurgası.",
    sections: [
      {
        title: "1. Robotik Dünyasının İşletim Sistemi Neden Değişti?",
        content: `Robot Operating System (ROS), klasik anlamda Windows veya Linux gibi donanımı yöneten bir çekirdek (kernel) değildir. ROS; heterojen donanımları, sensörleri, motor sürücülerini ve karmaşık algoritmaları birbirine bağlayan **dağıtık bir ara yazılımdır (Middleware)**.

2007'de geliştirilen **ROS 1**, akademik araştırmalarda çığır açmış olsa da endüstriyel ve ticari otonom sistemlerde şu kritik eksikliklerle karşılaştı:
- **Tek Hata Noktası (Single Point of Failure):** Tüm düğümlerin birbirini bulması için \`roscore\` adı verilen merkezi bir sunucu zorunluydu. \`roscore\` çöktüğünde tüm robot kör ve sağır kalıyordu.
- **Gerçek Zamanlı (Real-Time) Desteğinin Yokluğu:** Standart TCP/UDP soketleri kullanıldığı için deterministik (zaman gecikmesi garantili) motor veya fren kontrolü yapılamıyordu.
- **Zayıf Ağ ve Güvenlik:** Wi-Fi kopmalarında bağlantı kurtarılamıyor, şifrelenmemiş açık mesajlaşma siber saldırılara zemin hazırlıyordu.

İşte bu kısıtları ortadan kaldırmak için **ROS 2**, endüstri standardı **DDS (Data Distribution Service)** omurgası üzerine sıfırdan inşa edildi.`,
        callout: {
          type: "info",
          title: "Temel Fark: ROS 2'de 'roscore' Yoktur",
          message: "ROS 2'de merkezi bir sunucu bulunmaz. Düğümler (Nodes), DDS protokolü sayesinde yerel ağda birbirlerini otomatik keşfeder (Peer-to-Peer Auto-Discovery). Bir düğüm kapansa veya çökse bile ağın geri kalanı kesintisiz çalışmaya devam eder.",
        },
      },
      {
        title: "2. ROS 1 vs ROS 2 Mimari Karşılaştırması",
        content: `ROS 1 ile ROS 2 arasındaki temel mimari farklar aşağıda özetlenmiştir:

- **Merkeziyet:** ROS 1 merkezi \`roscore\` kullanırken, ROS 2 tamamen dağıtık DDS (Peer-to-Peer) mimarisine sahiptir.
- **İletişim Protokolü:** ROS 1'de TCPROS / UDPROS kullanılırken, ROS 2'de endüstriyel OMG standardı DDS / RTPS kullanılır.
- **Gerçek Zamanlılık (Real-Time):** ROS 1 gerçek zamanlı çalışamaz; ROS 2 ise RT-PREEMPT Linux çekirdeği ile gerçek zamanlı motor kontrolünü destekler.
- **Mikrodenetleyici Desteği:** ROS 1 için hantal \`rosserial\` gerekirken, ROS 2'de doğrudan ESP32/STM32 üzerinde \`micro-ROS\` koşar.
- **Güvenlik (Security):** ROS 1'de şifreleme yoktur; ROS 2'de **SROS2** ile TLS tabanlı kimlik doğrulama, erişim denetimi ve uçtan uca şifreleme yerleşiktir.`,
        code: {
          language: "bash",
          caption: "ROS 2 Ortamını Yükleme & Düğüm Listeleme",
          snippet: `# ROS 2 Humble veya Jazzy ortam değişkenlerini yükleyin
source /opt/ros/humble/setup.bash

# Ağdaki aktif düğümleri (nodes) listeleyin
ros2 node list

# Yayınlanan konuları (topics) canlı izleyin
ros2 topic list
ros2 topic echo /chatter`,
        },
      },
      {
        title: "3. ROS 2 Sürümleri: LTS Kavramı (Humble & Jazzy)",
        content: `ROS 2 sürümleri Ubuntu LTS sürümlerine paralel olarak çift yıllarda çıkar ve 5 yıl boyunca resmi güvenlik ve hata desteği alır (LTS - Long Term Support):
- **ROS 2 Humble Hawksbill (2022):** Ubuntu 22.04 LTS üzerinde çalışır. Günümüzde endüstride ve robotik şirketlerinde en yaygın kullanılan kararlı sürümdür.
- **ROS 2 Jazzy Jalisco (2024):** Ubuntu 24.04 LTS üzerinde çalışır. Gelişmiş donanım hızlandırma ve güncel C++20 / Python 3.12 standartlarını içerir.`,
      },
    ],
    quiz: {
      question: "ROS 2'de merkezi 'roscore' sunucusunun kaldırılmasını ve düğümlerin birbirini otomatik keşfetmesini sağlayan temel katman hangisidir?",
      options: [
        "TCPROS Soket Mimarisi",
        "DDS (Data Distribution Service)",
        "Gazebo Simülasyon Motoru",
        "Python GIL (Global Interpreter Lock)",
      ],
      correctIndex: 1,
      explanation: "ROS 2, OMG standardı olan DDS (Data Distribution Service) katmanını kullanır. Bu sayede merkezi sunucu olmadan düğümler yerel ağda birbirlerini peer-to-peer olarak otomatik keşfeder.",
    },
  },

  "ros2-architecture": {
    id: "ros2-architecture",
    badge: "Modül 1 • ROS 2 Mimarisi",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "DDS (Data Distribution Service) & QoS (Quality of Service)",
    subtitle: "CycloneDDS, FastDDS ve robotik ağ gecikmelerini yönetmek için Hizmet Kalitesi (QoS) politikaları.",
    sections: [
      {
        title: "1. DDS Nedir ve Robotikte Neden Hayatidir?",
        content: `DDS (Data Distribution Service), havacılık, askeri savunma sistemleri ve finans borsaları gibi sıfır hata toleranslı alanlar için geliştirilmiş uluslararası bir veri dağıtım standardıdır.

ROS 2'de düğümler arasındaki veri akışını DDS yönetir. ROS 2 kodu yazdığınızda alttaki DDS sağlayıcısından bağımsız çalışırsınız (RMW - ROS Middleware Interface):
- **eProsima FastDDS:** ROS 2'nin varsayılan DDS motorlarından biridir. C++ ile optimize edilmiştir.
- **Eclipse CycloneDDS:** Özellikle otonom araçlarda ve yüksek paket trafiğinde düşük gecikmesiyle tercih edilir.
- **GurumDDS:** Endüstriyel gömülü sistemler için optimize edilmiş ticari/açık alternatif.`,
        callout: {
          type: "info",
          title: "DDS Motorunu Değiştirmek Tek Bir Çevre Değişkenine Bakar",
          message: "Kodunuzu yeniden derlemeden `export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp` komutu ile ağ motorunu anında değiştirebilirsiniz.",
        },
      },
      {
        title: "2. QoS (Quality of Service) Politikaları",
        content: `Robotikte her veri aynı öneme sahip değildir. Örneğin:
- **LiDAR veya Kamera Görüntüsü (30 FPS):** Bir kare paket kaybolursa tekrar gönderilmesini (retransmit) beklemek anlamsızdır; çünkü robot zaten bir sonraki kareye geçmiştir. Burada **hız** önemlidir.
- **Acil Durum Fren Sinyali (E-Stop):** Tek bir paketin bile kaybolması ölümcül kazaya yol açar. Burada **%100 güvenilirlik** şarttır.

QoS, bu farklı gereksinimleri şu politikalarla yönetir:
1. **Reliability (Güvenilirlik):**
   - \`Reliable\`: TCP gibi kaybolan paketi tekrar ister.
   - \`Best Effort\`: UDP gibi hızlıca yollar, kaybolanı umursamaz (sensörler için idealdir).
2. **Durability (Dayanıklılık):**
   - \`Volatile\`: Yayın anında abone yoksa veri kaybolur.
   - \`Transient Local\`: Son yayınlanan veriyi bellekte tutar; yeni bağlanan bir abone eski veriyi anında alır (örneğin harita veya robot boyutları).
3. **History & Depth (Geçmiş Kuyruğu):**
   - \`Keep Last (Depth=10)\`: Kuyrukta en son 10 mesajı saklar, eskileri düşürür.`,
        code: {
          language: "python",
          caption: "Python'da Özel QoS Profili ile Sensör Yayıncısı",
          snippet: `from rclpy.node import Node
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy, DurabilityPolicy
from sensor_msgs.msg import LaserScan

class LidarPublisher(Node):
    def __init__(self):
        super().__init__('lidar_publisher_node')
        
        # Sensörler için optimize edilmiş Best-Effort QoS Profili
        sensor_qos = QoSProfile(
            reliability=ReliabilityPolicy.BEST_EFFORT, # Paket kaybına toleranslı, sıfır gecikme
            history=HistoryPolicy.KEEP_LAST,
            depth=5,                                   # Kuyrukta en fazla 5 tarama tut
            durability=DurabilityPolicy.VOLATILE
        )
        
        self.publisher_ = self.create_publisher(LaserScan, '/scan', sensor_qos)
        self.get_logger().info('LiDAR QoS Yayını Başlatıldı!')`,
        },
      },
    ],
    quiz: {
      question: "Saniyede 30 kare yayınlanan yüksek çözünürlüklü bir robot kamerasında gecikmeyi (latency) en aza indirmek için hangi QoS Reliability politikası seçilmelidir?",
      options: [
        "ReliabilityPolicy.RELIABLE",
        "ReliabilityPolicy.BEST_EFFORT",
        "DurabilityPolicy.TRANSIENT_LOCAL",
        "HistoryPolicy.KEEP_ALL",
      ],
      correctIndex: 1,
      explanation: "Yüksek frekanslı sensörlerde (Kamera, LiDAR) paket kaybında bekleme yapmamak ve gecikmeyi önlemek için Best Effort politikası kullanılır.",
    },
  },

  "ros2-install-workspace": {
    id: "ros2-install-workspace",
    badge: "Modül 1 • ROS 2 Mimarisi",
    readingTime: "7 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Colcon Çalışma Alanı (Workspace), Paketler & Kurulum",
    subtitle: "src dizini yapısı, ament_cmake, ament_python, colcon build ve setup.bash overlay mekanizması.",
    sections: [
      {
        title: "1. Colcon Çalışma Alanı (Workspace) Anatomisi",
        content: `ROS 2 projeleri **çalışma alanları (workspaces)** içinde yönetilir. Standart bir çalışma alanı şu 4 dizinden oluşur:
- **\`src/\` (Source):** Kendi yazdığınız veya GitHub'dan klonladığınız tüm ROS 2 paketlerinin kaynak kodlarının bulunduğu dizin.
- **\`build/\`:** Derleme sırasında ara nesne dosyalarının (\`.o\`, CMake önbelleği) depolandığı yer.
- **\`install/\`:** Paketler derlendikten sonra çalıştırılabilir ikililerin, Python scriptlerinin ve \`setup.bash\` dosyasının yerleştiği nihai dizin.
- **\`log/\`:** Derleme sırasında oluşan hata ve log kayıtları.`,
      },
      {
        title: "2. Paket Türleri: Python vs C++ (ament_python vs ament_cmake)",
        content: `ROS 2'de iki tür paket oluşturabilirsiniz:
- **\`ament_python\`:** Hızlı prototipleme, üst seviye karar mekanizmaları ve yapay zeka entegrasyonu için. \`setup.py\` ve \`package.xml\` kullanır.
- **\`ament_cmake\`:** Yüksek performans, determinizm, donanım sürücüleri ve LiDAR/Görüntü işleme algoritmaları için. \`CMakeLists.txt\` ve \`package.xml\` kullanır.`,
        code: {
          language: "bash",
          caption: "Sıfırdan Çalışma Alanı & Paket Oluşturma Adımları",
          snippet: `# 1. Çalışma alanı klasörünü oluşturun
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src

# 2. Yeni bir Python paketi oluşturun
ros2 pkg create --build-type ament_python my_robot_controller --dependencies rclpy std_msgs sensor_msgs

# 3. Kök dizine dönüp paketi derleyin
cd ~/ros2_ws
colcon build --symlink-install

# 4. Ortam değişkenlerini kabuğa tanıtın (Underlay üzerine Overlay)
source install/setup.bash`,
        },
        callout: {
          type: "tip",
          title: "İpucu: --symlink-install Parametresi",
          message: "Python paketleri geliştirirken her dosya değişikliğinde yeniden `colcon build` yazmamak için `--symlink-install` bayrağını kullanın. Bu sayede .py dosyalarınız sembolik linklenir ve anında güncellenir.",
        },
      },
    ],
    quiz: {
      question: "Python tabanlı bir ROS 2 paketinde kod değişikliklerinin her seferinde colcon build çalıştırmadan anında etkili olması için hangi derleme bayrağı kullanılır?",
      options: [
        "--packages-select",
        "--symlink-install",
        "--cmake-clean-cache",
        "--continue-on-error",
      ],
      correctIndex: 1,
      explanation: "--symlink-install bayrağı, Python scriptlerini install dizinine kopyalamak yerine kaynak koda sembolik bağlantı (symlink) oluşturur.",
    },
  },

  // ========================================================
  // 2. İLETİŞİM PARADİGMALARI
  // ========================================================
  "ros2-nodes-topics": {
    id: "ros2-nodes-topics",
    badge: "Modül 2 • İletişim Paradigmaları",
    readingTime: "9 dk okuma",
    level: "Başlangıç Seviyesi",
    title: "Düğümler (Nodes) ve Konular (Topics): rclpy / rclcpp ile Veri Yayını",
    subtitle: "Düğümler arası periyodik sensör yayını, abone callback fonksiyonları ve CLI analiz araçları.",
    sections: [
      {
        title: "1. Publisher / Subscriber (Yayıncı / Abone) Modeli",
        content: `ROS 2'de robotun her işlevi tek bir **Düğüm (Node)** olarak kodlanır. Örneğin:
- \`lidar_driver_node\`: LiDAR sensöründen veriyi okur ve \`/scan\` konusuna (topic) basar.
- \`obstacle_detector_node\`: \`/scan\` konusunu dinler, önünde engel varsa hesaplar.
- \`motor_controller_node\`: \`/cmd_vel\` konusundan gelen hız komutlarıyla tekerlekleri çevirir.

Bu yapı düğümlerin birbirini tanımasını gerektirmez; tek sözleşme **konunun adı** ve **mesaj tipidir** (Örn: \`geometry_msgs/msg/Twist\`).`,
      },
      {
        title: "2. Örnek: Python (rclpy) ile Hız Komutu Yayıncısı",
        content: `Aşağıdaki düğüm, robota ileri gitmesi için saniyede 10 kez (10 Hz) \`/cmd_vel\` topic'i üzerinden hız komutu yayınlar:`,
        code: {
          language: "python",
          caption: "robot_velocity_publisher.py",
          snippet: `import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class VelocityPublisher(Node):
    def __init__(self):
        super().__init__('velocity_publisher_node')
        
        # /cmd_vel konusuna Twist mesajı basan yayıncı
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)
        
        # 10 Hz (0.1 saniye) zamanlayıcı
        self.timer = self.create_timer(0.1, self.timer_callback)
        self.get_logger().info('Robot hız yayıncısı hazır!')

    def timer_callback(self):
        msg = Twist()
        msg.linear.x = 0.5   # 0.5 m/s ileri hız
        msg.angular.z = 0.1  # 0.1 rad/s hafif sola dönüş
        
        self.publisher_.publish(msg)
        self.get_logger().info(f'Hız Gönderildi: Lineer={msg.linear.x}, Açısal={msg.angular.z}')

def main(args=None):
    rclpy.init(args=args)
    node = VelocityPublisher()
    try:
        rclpy.spin(node) # Olay döngüsünü canlı tut
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()`,
        },
      },
      {
        title: "3. CLI ile Canlı Ağ Analizi Komutları",
        content: `Bir robot çalışırken ağdaki konuları ve veri frekansını terminalden şu komutlarla anında teşhis edebilirsiniz:
- \`ros2 topic hz /cmd_vel\`: Mesajın saniyede kaç kez yayınlandığını (frekansını) ölçer.
- \`ros2 topic echo /cmd_vel\`: Konuya düşen verileri canlı olarak terminale yazdırır.
- \`ros2 topic info /cmd_vel\`: Kaç yayıncı ve abone olduğunu gösterir.`,
      },
    ],
    quiz: {
      question: "Mobil robotların tekerlek hızlarını (lineer x ve açısal z) kontrol etmek için standart ROS 2 mesaj tipi hangisidir?",
      options: [
        "std_msgs/msg/String",
        "sensor_msgs/msg/Imu",
        "geometry_msgs/msg/Twist",
        "nav_msgs/msg/Odometry",
      ],
      correctIndex: 2,
      explanation: "geometry_msgs/msg/Twist mesajı, 3 eksende lineer hızları (x, y, z) ve 3 eksende açısal dönüş hızlarını (roll, pitch, yaw) barındıran standart robot hareket mesajıdır.",
    },
  },

  "ros2-services-actions": {
    id: "ros2-services-actions",
    badge: "Modül 2 • İletişim Paradigmaları",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Servisler (Services) ve Eylemler (Actions): Goal & Feedback",
    subtitle: "Senkron istek-yanıt (Service) ile uzun süren görevlerde (Navigasyon, Kol Hareketi) Action Goal, Feedback ve Cancel yönetimi.",
    sections: [
      {
        title: "1. Topic vs Service vs Action: Hangi Durumda Hangisi?",
        content: `ROS 2'de iletişim için 3 temel mekanizma vardır:
1. **Topic (Sürekli Akış):** Sensör verileri, kamera, motor hızları. Yanıt beklenmez (Yangın hortumu gibi akar).
2. **Service (Kısa İstek - Yanıt):** Hızlı ve anlık işlemler. Örneğin: Haritayı sıfırla, motorları kilitle, LED'i yak. İstemci istek atar, sunucu yanıt dönene kadar bekler.
3. **Action (Uzun Süreli Görevler):** Zaman alan ve iptal edilebilen görevler. Örneğin: "Banyoya 10 metre sür", "Manipülatör kolu 90 derece bük". İstemci hedef (Goal) yollar, robot ilerlerken canlı geri bildirim (Feedback) verir ve görev bitince sonuç (Result) döner. Görev esnasında iptal (Cancel) edilebilir.`,
      },
      {
        title: "2. Action Mimarisi: 3 Mesaj Bir Arada",
        content: `Bir Action tanımı (\`.action\` dosyası) 3 bölümden oluşur:
- **Goal (Hedef):** Görevin parametreleri (Örn: Hedef x, y koordinatı).
- **Result (Nihai Sonuç):** Görev bittiğinde dönen veri (Örn: Hedefe varıldı mı, kaç saniye sürdü).
- **Feedback (Canlı İlerleme):** Görev sürerken periyodik yayınlanan durum (Örn: Kalan mesafe, batarya durumu).`,
        code: {
          language: "text",
          caption: "NavigateToPose.action (Örnek Action Tanımı)",
          snippet: `# 1. GOAL (Hedef)
geometry_msgs/PoseStamped target_pose
string behavior_tree
---
# 2. RESULT (Sonuç)
std_msgs/Empty result
int16 error_code
---
# 3. FEEDBACK (Canlı İlerleme)
geometry_msgs/PoseStamped current_pose
builtin_interfaces/Duration navigation_time
int16 number_of_recoveries
float32 distance_remaining`,
        },
      },
    ],
    quiz: {
      question: "Bir robotun 20 metre ötedeki hedefe gitmesi gibi uzun süren ve yolda iptal edilmesi gerekebilecek bir görev için hangi iletişim türü tercih edilmelidir?",
      options: [
        "Tek yönlü Topic yayını",
        "Senkron Service çağrısı",
        "Action (Hedef, Feedback ve Sonuç mekanizmalı)",
        "Parametre sunucusu",
      ],
      correctIndex: 2,
      explanation: "Uzun süren, ara süreçte ilerleme bildirimi (Feedback) gerektiren ve iptal edilebilmesi (Preempt/Cancel) gereken görevler için Action kullanılır.",
    },
  },

  "ros2-launch-params": {
    id: "ros2-launch-params",
    badge: "Modül 2 • İletişim Paradigmaları",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "ROS 2 Parametreleri & Python Launch Dosyaları",
    subtitle: "Birden çok robot düğümünü tek komutla ayağa kaldırma, YAML yapılandırması ve dinamik parametreler.",
    sections: [
      {
        title: "1. Python Tabanlı Launch Dosyaları",
        content: `ROS 1'de XML formatında yazılan launch dosyaları, ROS 2'de **tamamen Python kodu** haline gelmiştir. Bu sayede launch aşamasında \`if/else\` koşulları, döngüler ve sistem kontrolleri çalıştırılabilir.

Bir launch dosyası ile aynı anda:
- LiDAR sürücüsünü,
- Odometri hesaplayıcısını,
- RViz2 görselleştirme aracını,
- Motor kontrol kartını tek bir \`ros2 launch\` komutuyla başlatabilirsiniz.`,
        code: {
          language: "python",
          caption: "robot_bringup.launch.py",
          snippet: `from launch import LaunchDescription
from launch_ros.actions import Node
import os
from ament_index_python.packages import get_package_share_directory

def generate_launch_description():
    pkg_share = get_package_share_directory('my_robot_bringup')
    params_file = os.path.join(pkg_share, 'config', 'robot_params.yaml')

    return LaunchDescription([
        # 1. Motor Kontrol Düğümü
        Node(
            package='my_robot_controller',
            executable='motor_driver',
            name='motor_driver_node',
            parameters=[params_file],
            output='screen'
        ),
        # 2. LiDAR Sürücü Düğümü
        Node(
            package='sllidar_ros2',
            executable='sllidar_node',
            name='rplidar_node',
            parameters=[{
                'serial_port': '/dev/rplidar',
                'serial_baudrate': 115200,
                'frame_id': 'laser_frame'
            }],
            output='screen'
        )
    ])`,
        },
      },
    ],
    quiz: {
      question: "ROS 2'de birden fazla düğümü, YAML parametrelerini ve donanım sürücülerini tek komutla ayağa kaldırmak için hangi mekanizma kullanılır?",
      options: [
        "ros2 run",
        "Python Launch Dosyaları (ros2 launch)",
        "ros2 bag record",
        "colcon test",
      ],
      correctIndex: 1,
      explanation: "ROS 2 Python Launch dosyaları (`.launch.py`), sistemdeki tüm düğümleri yapılandırma dosyalarıyla birlikte tek komutla organize biçimde başlatır.",
    },
  },

  "ros2-urdf-tf2": {
    id: "ros2-urdf-tf2",
    badge: "Modül 2 • İletişim Paradigmaları",
    readingTime: "9 dk okuma",
    level: "İleri Seviye",
    title: "URDF, Xacro ve TF2 (Transform) Koordinat Ağacı",
    subtitle: "Robot kinematiği, tekerlekten sensöre (base_link -> laser_frame -> odom -> map) uzaysal koordinat dönüşümleri.",
    sections: [
      {
        title: "1. TF2 (Transform) Koordinat Ağacı Neden Gereklidir?",
        content: `Bir robot üzerinde sensörler farklı noktalara monte edilmiştir:
- Robotun fiziksel merkezi: \`base_link\`
- Yere temas eden izdüşümü: \`base_footprint\`
- 20 cm yukarıda ve 10 cm önde duran LiDAR: \`laser_frame\`
- Kameranın merceği: \`camera_optical_frame\`

LiDAR bir engel gördüğünde mesafeyi *kendisine göre* ölçer. Ancak navigasyon algoritmasının engelin *robotun gövdesine göre* nerede olduğunu bilmesi gerekir. İşte **TF2**, tüm bu koordinat sistemlerini 3 boyutlu uzayda anlık olarak birbirine dönüştüren zaman damgalı dönüşüm ağacıdır.`,
      },
      {
        title: "2. Standart Koordinat Hiyerarşisi",
        content: `Mobil robotikte standart ROS TF ağacı şu şekildedir:
\`map\` → (Haritalama / SLAM düzeltmesi) → \`odom\` → (Tekerlek odometrisi) → \`base_link\` → (Sensör montajları) → \`laser_frame\`.`,
        code: {
          language: "bash",
          caption: "Canlı TF Ağacını İnceleme Komutları",
          snippet: `# Ağdaki tüm aktif dönüşümleri görüntüleyin
ros2 run tf2_ros tf2_echo odom base_link

# PDF olarak tüm TF ağacı şemasını çıkartın
ros2 run tf2_tools view_frames`,
        },
      },
    ],
    quiz: {
      question: "ROS 2 robotik standartlarında robotun fiziksel geometrik merkezini temsil eden ana koordinat çerçevesi (frame_id) hangisidir?",
      options: [
        "map",
        "odom",
        "base_link",
        "world",
      ],
      correctIndex: 2,
      explanation: "`base_link`, robotun gövde merkezini temsil eden standart koordinat çerçevesidir. Tüm sensörler (LiDAR, kamera vb.) `base_link` referansına bağlanır.",
    },
  },

  // ========================================================
  // 3. DONANIM, RASPBERRY PI & SENSÖRLER
  // ========================================================
  "ros2-rpi-setup": {
    id: "ros2-rpi-setup",
    badge: "Modül 3 • Donanım Entegrasyonu",
    readingTime: "9 dk okuma",
    level: "Orta Seviye",
    title: "Raspberry Pi Üzerinde ROS 2 Humble/Jazzy Kurulumu & Headless Yönetim",
    subtitle: "Ubuntu 22.04/24.04 Server ve Pi OS üzerinde minimal ROS 2 ortamı, Wi-Fi DDS yapılandırması ve SSH terminal yönetimi.",
    sections: [
      {
        title: "1. Raspberry Pi'de ROS 2 İçin Neden Ubuntu Server Tercih Edilir?",
        content: `Raspberry Pi 4 veya Raspberry Pi 5 üzerinde robot koştururken masaüstü arayüzü (GUI) çalıştırmak değerli RAM ve CPU kaynaklarını tüketir. Bu nedenle robotik projelerinde **Ubuntu Server 64-bit (Headless)** kurulması önerilir:
- **Resmi ROS 2 Depoları:** Ubuntu LTS sürümlerinde \`apt install ros-humble-ros-base\` komutuyla tek adımda binary olarak kurulur.
- **Düşük Kaynak Tüketimi:** Boşta sadece ~200 MB RAM kullanır, geri kalan 4GB veya 8GB RAM SLAM ve Nav2 haritalama algoritmalarına kalır.`,
        code: {
          language: "bash",
          caption: "Raspberry Pi Üzerinde Minimal ROS 2 Kurulumu",
          snippet: `# 1. Paket depolarını güncelleyin ve ROS 2 anahtarını ekleyin
sudo apt update && sudo apt install -y locales curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 2. Minimal Base Paketini Kurun (GUI gereksiz)
sudo apt update
sudo apt install -y ros-humble-ros-base python3-colcon-common-extensions python3-rosdep

# 3. .bashrc dosyasına ekleyin
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc`,
        },
      },
    ],
    quiz: {
      question: "Raspberry Pi üzerinde robot koştururken masaüstü arayüzü (GUI) içermeyen minimal ve hafif ROS 2 paket grubu hangisidir?",
      options: [
        "ros-humble-desktop-full",
        "ros-humble-desktop",
        "ros-humble-ros-base",
        "ros-humble-simulator",
      ],
      correctIndex: 2,
      explanation: "`ros-humble-ros-base`, masaüstü arayüzü (RViz, GUI vb.) içermeyen, gömülü SBC'ler için optimize edilmiş hafif çekirdek pakettir.",
    },
  },

  "ros2-lidar-sensor": {
    id: "ros2-lidar-sensor",
    badge: "Modül 3 • Donanım Entegrasyonu",
    readingTime: "9 dk okuma",
    level: "Orta Seviye",
    title: "2D RPLIDAR Entegrasyonu ve LaserScan Mesajları",
    subtitle: "RPLIDAR A1/A2/S1 serisi USB UART bağlantısı, udev alias kuralı ve 360 derece mesafe verisini /scan topic'inde işleme.",
    sections: [
      {
        title: "1. 2D LiDAR Çalışma Mantığı ve LaserScan Mesajı",
        content: `2D Lidar, saniyede binlerce kez dönerek çevresine kızılötesi lazer ışınları fırlatır ve geri yansıma süresini (ToF - Time of Flight) ölçerek 360 derecelik 2 boyutlu mesafe kesiti üretir.

ROS 2'de bu veri \`sensor_msgs/msg/LaserScan\` formatında yayınlanır:
- \`angle_min\` & \`angle_max\`: Taramanın başlangıç ve bitiş açıları (-π ile +π).
- \`angle_increment\`: Her iki lazer ışını arasındaki açısal adım (örn: 1 derece).
- \`ranges[]\`: Metre cinsinden ölçülen mesafeler dizisi. Sonsuzda veya menzil dışındakiler \`inf\` olarak görünür.`,
      },
      {
        title: "2. Sabit Port İçin Linux udev Kuralı",
        content: `Raspberry Pi'ye hem LiDAR hem motor kontrol kartı (STM32/Arduino) bağlandığında, yeniden başlatmada port isimleri (\`/dev/ttyUSB0\` ile \`/dev/ttyUSB1\`) yer değiştirebilir. Bu karmaşayı engellemek için USB Vendor/Product ID ile sabit sembolik link (udev rule) tanımlanır:`,
        code: {
          language: "bash",
          caption: "/etc/udev/rules.d/99-rplidar.rules",
          snippet: `# RPLIDAR için kalıcı takma ad (alias) kuralı
KERNEL=="ttyUSB*", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea60", MODE:="0777", SYMLINK+="rplidar"

# Kuralı uygulamak için:
# sudo udevadm control --reload-rules && sudo udevadm trigger
# Artık port daima: /dev/rplidar`,
        },
      },
    ],
    quiz: {
      question: "2D LiDAR sensörlerinin 360 derecelik mesafe ölçümlerini taşıyan standart ROS 2 mesaj tipi hangisidir?",
      options: [
        "sensor_msgs/msg/Image",
        "sensor_msgs/msg/LaserScan",
        "sensor_msgs/msg/PointCloud2",
        "geometry_msgs/msg/Polygon",
      ],
      correctIndex: 1,
      explanation: "2D LiDAR tarama verileri ROS 2'de `sensor_msgs/msg/LaserScan` mesaj tipi ile taşınır.",
    },
  },

  "ros2-camera-opencv": {
    id: "ros2-camera-opencv",
    badge: "Modül 3 • Donanım Entegrasyonu",
    readingTime: "8 dk okuma",
    level: "Orta Seviye",
    title: "Robot Kamerası, Image Transport & OpenCV Entegrasyonu",
    subtitle: "Kamera modüllerinden /image_raw yayını, cv_bridge ile OpenCV matrisine dönüştürme ve nesne tespiti.",
    sections: [
      {
        title: "1. cv_bridge Köprüsü: ROS 2'den OpenCV'ye Geçiş",
        content: `ROS 2 kamera görüntüsünü \`sensor_msgs/msg/Image\` formatında taşırken, görüntü işleme kütüphanesi OpenCV ise veriyi \`numpy.ndarray\` (BGR matrisi) olarak işler.

Bu iki format arasındaki köprüyü **\`cv_bridge\`** paketi kurar.`,
        code: {
          language: "python",
          caption: "Kamera Görüntüsünü OpenCV ile İşleyen Düğüm",
          snippet: `from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2

class CameraSubscriber(Node):
    def __init__(self):
        super().__init__('camera_subscriber_node')
        self.subscription = self.create_subscription(Image, '/camera/image_raw', self.image_callback, 10)
        self.bridge = CvBridge()

    def image_callback(self, msg):
        # ROS 2 Image mesajını OpenCV BGR formatına çevir
        cv_image = self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')
        
        # Basit kenar bulma (Canny Edge Detection)
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150)
        
        self.get_logger().info(f'Kare İşlendi: {cv_image.shape}')`,
        },
      },
    ],
    quiz: {
      question: "ROS 2'deki sensor_msgs/msg/Image mesajını OpenCV'nin kullanabileceği bir matrise dönüştüren kütüphane hangisidir?",
      options: [
        "image_pipeline",
        "cv_bridge",
        "tf2_ros",
        "nav2_util",
      ],
      correctIndex: 1,
      explanation: "`cv_bridge`, ROS ve OpenCV görüntü formatları arasında iki yönlü hızlı veri dönüşümü sağlayan resmi köprü kütüphanesidir.",
    },
  },

  "ros2-micro-ros": {
    id: "ros2-micro-ros",
    badge: "Modül 3 • Donanım Entegrasyonu",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "micro-ROS: ESP32 ve STM32 ile Mikrodenetleyici Seviyesinde ROS 2",
    subtitle: "Linux SBC olmadan doğrudan RTOS mikrodenetleyicilerde düğüm koşturma, micro-ROS Agent ve XRCE-DDS iletişimi.",
    sections: [
      {
        title: "1. micro-ROS Neden Devrimseldir?",
        content: `Geleneksel robotik tasarımlarında mikrodenetleyiciler (MCU), Linux bilgisayara (SBC) tescilli bir seri protokol (UART / binary paket) ile bağlanırdı. Bu durum her proje için özel ayrıştırıcı (parser) yazmayı gerektirirdi.

**micro-ROS**, ROS 2 API'sini doğrudan **FreeRTOS / Zephyr** koşan mikrodenetleyicilere (ESP32, STM32, Raspberry Pi Pico) taşır. Mikrodenetleyici doğrudan bir ROS 2 Node'u olur; \`/cmd_vel\` dinler ve enkoder verisini \`/odom\` olarak yayınlar.`,
      },
      {
        title: "2. micro-ROS Mimarisi & Agent",
        content: `Mikrodenetleyicilerin RAM'i (örneğin 512 KB) standart DDS kütüphanelerini kaldırmaya yetmez. Bu nedenle **Micro XRCE-DDS Client** kullanılır.

Linux bilgisayar üzerinde koşan **micro-ROS Agent**, mikrodenetleyiciden gelen hafif paketleri alır ve standart ROS 2 DDS ağına dönüştürür.`,
        code: {
          language: "bash",
          caption: "micro-ROS Agent'ı Başlatma Komutu",
          snippet: `# ESP32 UART üzerinden bağlıysa Agent'ı ayağa kaldırın:
ros2 run micro_ros_agent micro_ros_agent serial --dev /dev/ttyUSB0 -b 115200

# ESP32 Wi-Fi üzerinden bağlıysa UDP Agent:
ros2 run micro_ros_agent micro_ros_agent udp4 --port 8888`,
        },
      },
    ],
    quiz: {
      question: "micro-ROS mimarisinde düşük bellekli mikrodenetleyiciler ile ana ROS 2 DDS ağı arasındaki veri köprüsünü kuran aracı bileşen hangisidir?",
      options: [
        "roscore",
        "micro-ROS Agent",
        "Gazebo Bridge",
        "rosbridge_suite",
      ],
      correctIndex: 1,
      explanation: "`micro-ROS Agent`, Micro XRCE-DDS protokolü ile mikrodenetleyiciden gelen verileri ana ROS 2 DDS ağına bağlayan köprü yazılımdır.",
    },
  },

  // ========================================================
  // 4. SİMÜLASYON, SLAM & NAV2 OTONOM NAVİGASYON
  // ========================================================
  "ros2-gazebo-simulation": {
    id: "ros2-gazebo-simulation",
    badge: "Modül 4 • Otonom Navigasyon",
    readingTime: "9 dk okuma",
    level: "Orta Seviye",
    title: "Gazebo Simülasyonu ile Sanal Robot & Çevre Modellemesi",
    subtitle: "Fiziksel donanıma ihtiyaç duymadan diferansiyel sürüşlü robotu (Diff-Drive) Gazebo dünyasında canlandırma.",
    sections: [
      {
        title: "1. Neden Simülasyon Önce Gelir?",
        content: `Otonom robot geliştirmede algoritmayı doğrudan gerçek donanımda denemek zaman alıcı ve pahalıdır; tekerlek kayabilir, robot duvara çarpabilir veya donanım hasar görebilir.

**Gazebo (Gazebo Sim / Ignition)**, kütleçekim, sürtünme, atalet ve çarpışma gibi fizik kurallarını simüle eder. Robota eklenen eklentiler (plugins) sayesinde sanal LiDAR ve sanal motor kontrolü tıpkı gerçek robot gibi \`/scan\` ve \`/cmd_vel\` topic'leri üretir.`,
      },
    ],
    quiz: {
      question: "Gazebo simülasyonunda diferansiyel sürüşlü (iki tekerlekli) bir robotun motor hareketini ve odometrisini simüle eden eklenti hangisidir?",
      options: [
        "gazebo_ros_diff_drive",
        "gazebo_ros_laser",
        "gazebo_ros_camera",
        "gazebo_ros_imu",
      ],
      correctIndex: 0,
      explanation: "`gazebo_ros_diff_drive`, /cmd_vel hız komutlarını alıp sanal tekerlekleri döndüren ve sanal odometri (/odom) üreten standart Gazebo eklentisidir.",
    },
  },

  "ros2-slam-cartographer": {
    id: "ros2-slam-cartographer",
    badge: "Modül 4 • Otonom Navigasyon",
    readingTime: "10 dk okuma",
    level: "İleri Seviye",
    title: "SLAM ile Canlı Haritalama: Cartographer ve Slam Toolbox",
    subtitle: "Bilinmeyen bir odada robotu gezdirerek LiDAR ve odometri ile 2D grid haritası (.yaml/.pgm) üretme.",
    sections: [
      {
        title: "1. SLAM (Simultaneous Localization and Mapping) Nedir?",
        content: `SLAM (Eşzamanlı Konumlandırma ve Haritalama), robotik dünyasının yumurta-tavuk problemidir:
- Bir robotun nerede olduğunu bilmesi için bir **haritaya** ihtiyacı vardır.
- Bir robotun harita çıkarabilmesi için ise harita üzerinde **nerede olduğunu** bilmesi gerekir.

SLAM algoritmaları (özellikle **Slam Toolbox** ve Google **Cartographer**), LiDAR ışınlarının duvarlardan yansımasını odometri verisiyle birleştirerek ve döngü kapanımı (Loop Closure) uygulayarak bu iki problemi eşzamanlı çözer.`,
      },
      {
        title: "2. Haritayı Kaydetme ve Çıktı Formatı",
        content: `Robot odayı tamamen gezdikten sonra harita iki dosyayla kaydedilir:
1. **\`my_map.pgm\`:** Haritanın piksel piksel gri tonlamalı resmidir (Siyah = Duvar/Engel, Beyaz = Boş/Gidilebilir alan, Gri = Bilinmeyen bölge).
2. **\`my_map.yaml\`:** Haritanın çözünürlüğü (piksel başına kaç metre) ve başlangıç koordinatlarıdır (origin).`,
        code: {
          language: "bash",
          caption: "Haritalamayı Başlatma & Kaydetme Komutu",
          snippet: `# 1. Slam Toolbox haritalama düğümünü başlatın
ros2 launch slam_toolbox online_async_launch.py

# 2. Robotu klavyeyle sürün (Teleop)
ros2 run teleop_twist_keyboard teleop_twist_keyboard

# 3. Haritayı diske kaydedin
ros2 run nav2_map_server map_saver_cli -f ~/my_room_map`,
        },
      },
    ],
    quiz: {
      question: "ROS 2'de kaydedilen bir 2D doluluk ızgara haritasında (Occupancy Grid) beyaz pikseller neyi temsil eder?",
      options: [
        "Aşılmaz duvar ve engelleri",
        "Sensörün henüz görmediği bilinmeyen alanları",
        "Robotun serbestçe gidebileceği boş ve güvenli alanları",
        "Robotun başlangıç koordinatını",
      ],
      correctIndex: 2,
      explanation: "Standart ROS haritalarında beyaz alanlar boş/serbest (free space), siyah alanlar duvar/engel (occupied), gri alanlar ise henüz taranmamış (unknown) bölgelerdir.",
    },
  },

  "ros2-nav2-stack": {
    id: "ros2-nav2-stack",
    badge: "Modül 4 • Otonom Navigasyon",
    readingTime: "11 dk okuma",
    level: "İleri Seviye",
    title: "Nav2 (Navigation 2): Costmaps, Global Planner & Local Planner",
    subtitle: "A* / Dijkstra algoritmalarıyla global yol bulma, DWB controller ile dinamik engellerden kaçma ve hedefe otonom sürüş.",
    sections: [
      {
        title: "1. Nav2 (Navigation 2) Mimarisi",
        content: `Nav2, bir mobil robotun bilinen bir harita üzerinde A noktasından B noktasına **tamamen otonom olarak ve çarpmadan** gitmesini sağlayan sistemdir.

Nav2 üç temel bileşenden oluşur:
1. **Costmap (Maliyet Haritaları):** Statik haritanın üzerine robotun fiziksel boyutlarını (footprint) ekler ve LiDAR ile anlık çıkan insan/eşya gibi dinamik engelleri canlı olarak maliyet katmanına (inflation layer) işler.
2. **Global Planner (Küresel Planlayıcı):** Haritanın tamamına bakarak A noktasından B noktasına en kısa yolu çizer (A* veya NavFn algoritmaları).
3. **Local Controller (Yerel Sürücü):** Robot hedefe doğru ilerlerken önüne aniden birisi çıktığında global rotadan sapıp engelin etrafından dolanır (DWB / TEB Controller).`,
      },
      {
        title: "2. RViz2 Üzerinden 'Nav2 Goal' Verme",
        content: `Nav2 başlatıldığında RViz2 arayüzündeki **"Nav2 Goal"** aracına tıklanıp harita üzerinde herhangi bir nokta ve varış açısı seçildiğinde, robot otonom olarak hareket etmeye başlar.`,
        code: {
          language: "bash",
          caption: "Nav2 Yığınını Başlatma",
          snippet: `# Harita ile birlikte Nav2 otonom navigasyonunu başlatın
ros2 launch nav2_bringup bringup_launch.py map:=/path/to/my_room_map.yaml`,
        },
      },
    ],
    quiz: {
      question: "Nav2 mimarisinde robotun gövdesinin duvarlara sürtünmesini engellemek için engellerin etrafına güvenlik marjı (güvenlik tamponu) ekleyen katman hangisidir?",
      options: [
        "Voxel Layer",
        "Inflation Layer (Şişirme Katmanı)",
        "Global Costmap Plugin",
        "Static Map Server",
      ],
      correctIndex: 1,
      explanation: "Inflation Layer (Şişirme Katmanı), engellerin etrafına robotun yarıçapı kadar maliyetli bir güvenlik zonu ekleyerek robotun duvara sıfır yanaşıp sürtünmesini engeller.",
    },
  },

  "ros2-autonomous-mission": {
    id: "ros2-autonomous-mission",
    badge: "Modül 4 • Otonom Navigasyon",
    readingTime: "9 dk okuma",
    level: "İleri Seviye",
    title: "Otonom Görev Yönetimi: Waypoint Navigasyon & Behavior Trees",
    subtitle: "Sıralı nokta navigasyonu (Waypoints), devriye robotu mantığı ve Davranış Ağaçları (BehaviorTree.CPP) ile karar mekanizması.",
    sections: [
      {
        title: "1. Çoklu Nokta (Waypoint) Devriye Robotu",
        content: `Gerçek hayatta robotlar sadece tek bir noktaya gitmez; depoda rafları gezer, hastanede odaları dolaşır veya fabrikada devriye atar.

Python \`nav2_simple_commander\` API'si, tek satır kodla robota sırayla ziyaret edeceği hedef koordinat listesini (Waypoint List) vermeyi sağlar:`,
        code: {
          language: "python",
          caption: "patrol_robot_waypoints.py",
          snippet: `from nav2_simple_commander.robot_navigator import BasicNavigator
from geometry_msgs.msg import PoseStamped
import rclpy

def main():
    rclpy.init()
    navigator = BasicNavigator()

    # Nav2'nin hazır olmasını bekle
    navigator.waitUntilNav2Active()

    # Ziyaret edilecek hedef noktalar (Waypoints)
    goal_poses = []
    
    # 1. Nokta: Mutfak
    goal1 = PoseStamped()
    goal1.header.frame_id = 'map'
    goal1.pose.position.x = 2.5
    goal1.pose.position.y = 1.0
    goal1.pose.orientation.w = 1.0
    goal_poses.append(goal1)

    # 2. Nokta: Salon
    goal2 = PoseStamped()
    goal2.header.frame_id = 'map'
    goal2.pose.position.x = 0.0
    goal2.pose.position.y = 3.2
    goal2.pose.orientation.w = 1.0
    goal_poses.append(goal2)

    # Otonom devriyeyi başlat
    navigator.followWaypoints(goal_poses)

    while not navigator.isTaskComplete():
        feedback = navigator.getFeedback()
        if feedback:
            print(f'Mevcut hedef nokta indeksi: {feedback.current_waypoint}')

    print('Devriye başarıyla tamamlandı!')
    rclpy.shutdown()

if __name__ == '__main__':
    main()`,
        },
      },
    ],
    quiz: {
      question: "Nav2'de bir robotun karmaşık karar verme süreçlerini (hedefe git, engel varsa geri çekil, batarya azsa şarja dön) modelleyen ve XML ile yapılandırılan modern karar mimarisi nedir?",
      options: [
        "Finite State Machine (FSM)",
        "Behavior Trees (Davranış Ağaçları)",
        "Neural Network Weight Matrix",
        "PID Controller",
      ],
      correctIndex: 1,
      explanation: "Nav2, geleneksel durum makinelerinin (FSM) karmaşıklığını ve kırılganlığını aşmak için modüler Davranış Ağaçları (Behavior Trees) mimarisini kullanır.",
    },
  },
};
