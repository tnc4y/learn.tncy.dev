import { LessonContent } from "./lessonsData";

export const LINUX_PART1: Record<string, LessonContent> = {
  "linux-intro": {
    "id": "linux-intro",
    "badge": "Module 1 • Linux & Shell",
    "readingTime": "10 min read",
    "level": "Beginner",
    "title": "Introduction to Linux Operating System",
    "subtitle": "Complete Linux guide to Introduction to Linux Operating System — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Linux OS Architecture](/images/linux/linux-architecture.svg)\n\n- Linux is based on the UNIX operating system, a multi-user and multitasking platform developed in the 1970s at AT&T Bell Labs that became the foundation for many modern operating systems. Linux is free and open-source, encouraging global collaboration and innovation while providing strong security, flexibility, and reliable performance across different devices and industries.\n\n- Provides strong security and stability, making it suitable for servers and development environments.\n- Allows users to freely use, modify, and distribute the operating system.\n- Supports customization for different user requirements and industry applications.\n- Backed by a large global community and a wide range of software tools.Linux combines a wide range of open-source tools and components to form a complete computing environment. These components include file systems, user interfaces, system utilities and application programs, all working together to manage hardware and enable users to interact with their computer systems.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Introduction to Linux Operating System."
        }
      },
      {
        "title": "2. Distributions in Linux",
        "content": "A Linux distribution (distro) is a complete operating system built around the Linux kernel along with system tools, libraries, and applications. Different distributions are designed for various purposes such as desktops, servers, cybersecurity, and development.\n\n- Ubuntu is a beginner-friendly Linux distribution used for desktops, servers, and cloud computing.\n- Debian is a stable and reliable Linux distribution widely used for servers.\n- Kali Linux is a security-focused Linux distribution used for ethical hacking and penetration testing.\n- MX Linux is a lightweight Linux distribution suitable for older hardware.\n- Manjaro is a user-friendly Arch-based Linux distribution with rolling updates.\n- Linux Mint is a simple and beginner-friendly Linux distribution for Windows users.\n- Solus is a modern Linux distribution focused on desktop performance and simplicity.\n- Fedora is a developer-focused Linux distribution with the latest technologies.\n- openSUSE is a powerful Linux distribution used for development and enterprise environments.\n- Deepin is a visually attractive Linux distribution with an easy-to-use interface."
      },
      {
        "title": "3. Architecture",
        "content": "Linux architecture is the layered structure of the Linux operating system that defines how components like the kernel, shell, system libraries, and hardware interact to manage resources and run programs efficiently. It consists of the following components:\n\nLayers of a working computer\n- **Kernel:** Core component of Linux that manages hardware resources, processes, and system operations.\n- **System Libraries:** System libraries provide functions that help applications interact with the Linux kernel.\n- **Shell:** It is the command-line interface that interprets and executes user commands.\n- **Hardware Layer:** Hardware layer includes physical components like CPU, RAM, storage, and input/output devices.\n- **System Utilities:** System utilities are built-in tools used for system management, configuration, and maintenance."
      },
      {
        "title": "4. Applications",
        "content": "The Linux operating system is widely used across multiple domains due to its flexibility, strong security, and open-source nature. It supports a wide range of applications across different industries, as outlined below.\n\nuses of linux OS\n- **Servers and Hosting:** Powers web servers, cloud platforms, and data centers with high stability and security.\n- **Development:** Provides useful tools and environments for coding, testing, and debugging applications.\n- **Desktop and Personal Use:** Offers secure and customizable desktop environments for everyday computing tasks.\n- **Cybersecurity:** Widely used for ethical hacking, penetration testing, and security analysis.\n- **Embedded Systems:** Runs efficiently on IoT devices, routers, and other low-resource systems.\n- **Supercomputers:** Powers most supercomputers for scientific computing and large-scale simulations.\n- **Education:** Helps students learn programming, networking, and system administration at low cost."
      },
      {
        "title": "5. Installing Linux",
        "content": "Selecting an Ubuntu, Fedora or Linux Mint distribution which suits your needs is the initial step in the straightforward procedure for installing Linux.\n\n- Choose a Linux distribution like Ubuntu, Fedora, or Linux Mint.\n- Download the ISO file and create a bootable USB.\n- Restart the system and boot from the USB drive.\n- Follow the installation steps to set language, disk, and user account.\n- Complete the installation and reboot the system.\n- Install software using package managers like `apt` or `dnf`.**Note:** For a detailed guide on installing Linux using a virtual machine, refer to this article : Installing Linux Using a Virtual Machine\n\nComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Introduction to Linux Operating System",
      "initialCode": "#!/usr/bin/env bash\n# Introduction to Linux Operating System\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Introduction to Linux Operating System",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Introduction to Linux Operating System?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Introduction to Linux Operating System",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Introduction to Linux Operating System is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-install-vm": {
    "id": "linux-install-vm",
    "badge": "Module 1 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Installing Linux Using a Virtual Machine",
    "subtitle": "Complete Linux guide to Installing Linux Using a Virtual Machine — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Installing Linux on a Virtual Machine (VM) allows users to explore Linux’s power and flexibility without modifying their main operating system. Virtual machines enable running multiple operating systems simultaneously on a single computer.\n\n- They provide a safe and isolated environment ideal for testing, development, and learning purposes.\n- This guide will walk you through the process of installing Linux on a virtual machine for a smooth and efficient setup.\n- We will focus on installing Ubuntu, one of the most popular Linux distributions.These instructions are also applicable to other Linux distributions with minor adjustments.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Installing Linux Using a Virtual Machine."
        }
      },
      {
        "title": "2. Steps to Install Linux on a Virtual Machine",
        "content": "The first step is to choose the right virtualization program for you. Here are some popular choices:\n\n- VirtualBox (Available for free and open-source)\n- VMware Workstation Player (Free for individual download only)\n- Hyper-V (Included in Windows professional and enterprise editions)"
      },
      {
        "title": "3. Installation of Oracle VirtualBox",
        "content": "Oracle VirtualBox is a virtualization tool that allows users to run other operating systems on a host OS. For example, you can install Ubuntu on your Windows 11 system virtually using VirtualBox.\n\n**Step 1 : **To download VirtualBox, visit the Virtualbox website and choose the right version for your OS.\n\nInstallling Oracle Virtual BoxChoose the correct package to download VirtualBox based on your primary OS (Operating System). Here we are using windows operating system so will choose **Windows Hosts **package to download.\n\n**Step 2 : **Run the downloaded setup or exe file. If it asks for making changes on your device, click **Yes.**\n\n**Step 3: ** Click **Next **on setup wizard. It will redirect you to \"custom setup\" dialog box where you can choose or change the features that will be going to installed on you system.\n\nHere, we will not make any changes. Click on ** Next, **it will ask \"**Proceed with the installation ?\", **Click **yes **to go to next menu. Then, click on install. It will take some time to install on your system, basically depends on system to system. After that, click on finish."
      },
      {
        "title": "4. Step 4: Launch VirtualBox and Create a New VM",
        "content": "After installing VirtualBox on your system, open the application. The VirtualBox Manager window will appear. From here, you can view any previously created virtual machines and create new ones.\n\nClick on New to start creating a new virtual machine. You will be asked to enter:\n\n- A name for your VM\n- The location/path where the VM files will be saved\n- The type of operating system (Windows, macOS, or Linux)\n- The version of the operating system (for example, Ubuntu or Debian)."
      },
      {
        "title": "5. Step 5: Select Operating System and ISO",
        "content": "- Click on New and provide the required details. You will also need to choose the ISO image of the operating system you want to install.\n- We are using Ubuntu (a Linux distribution), but you can choose any other Linux distribution as well.\n- Download the latest Ubuntu LTS version. At the time of writing, Ubuntu 24.04 LTS is the latest release.\n- Select the downloaded ISO file. VirtualBox will automatically detect the OS type and version.\n- Click Next to continue."
      },
      {
        "title": "6. Step 6: Configure User Settings",
        "content": "For Ubuntu, VirtualBox allows you to define:\n\n- Username\n- Password\n- HostnameYou can either customize these settings or use the default values. After that, click Next."
      },
      {
        "title": "7. Step 7: Allocate Memory and CPU",
        "content": "Now, allocate system resources for your VM:\n\n- Assign around half of your system’s RAM to the VM.\n- **For example,** if your system has 16 GB RAM, allocate 8 GB to the virtual machine.\n- Choose the number of CPU cores as per your system capability.Click Next once done."
      },
      {
        "title": "8. Step 8: Allocate Virtual Hard Disk",
        "content": "- Allocate storage for your virtual machine. It is recommended to provide at least 20 GB of space for Ubuntu to run smoothly.\n- Click Next to proceed."
      },
      {
        "title": "9. Step 9: Review and Finalize",
        "content": "- Review all the configurations you’ve made on the summary screen.\n- If everything looks correct, click Finish to create the virtual machine and begin the installation process.\n- Ubuntu will now start installing automatically. Wait a few minutes while the files are copied and the system is set up."
      },
      {
        "title": "10. Step 10: Final Setup Inside Ubuntu",
        "content": "During installation, you will be asked to:\n\n- Set a password for your Ubuntu user account.\n- Optionally enable automatic login if you don’t want to enter a password every time.Click Continue.\n\nIAfter this, a welcome screen will appear. The system may take some time to complete the setup as it configures essential files. You will also be guided through first-time Ubuntu settings like:\n\n- Ubuntu Pro subscription (optional)\n- Privacy settings\n- Other personalization optionsNo need to worry - the process is smooth and user-friendly.\n\nAnd that’s it. You’re all set!"
      },
      {
        "title": "11. Enable Fullscreen and Clipboard Support",
        "content": "The Linux VM might not resize to full screen automatically. To fix this:\n\n**Step 1**: Open Terminal and run:\n\n**Step 2**: Then install the required packages:\n\n**Step 3:** In VirtualBox menu, go to Devices > Insert Guest Additions CD image.\n\n**Step 4:** If it doesn’t autorun, open the disk, right-click -> Open in Terminal.\n\n**Step 5**: Enter your password and press Enter and after completion, reboot your VM.\n\nOnce rebooted, resizing the window will now adjust the display properly.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Enable Fullscreen and Clipboard Support",
          "snippet": "sudo apt update"
        }
      },
      {
        "title": "12. Benefits of Using a Virtual Machine",
        "content": "Virtual machines provide a flexible, secure, and cost-effective way to run multiple operating systems and applications on a single physical computer."
      },
      {
        "title": "1. Better Resource Utilization",
        "content": "- Allows multiple virtual machines to run on a single physical system.\n- Maximizes the use of CPU, RAM, and storage without wasting hardware."
      },
      {
        "title": "2. Enhanced Security and Stability",
        "content": "- Each VM runs in an isolated environment, so failures don’t affect others.\n- Improves system reliability by containing crashes and malware within one VM."
      },
      {
        "title": "3. Scalability",
        "content": "- VMs can be easily created, deleted, or resized as per system requirements.\n- Helps in quickly scaling resources up or down without hardware changes."
      },
      {
        "title": "4. Cost Effectiveness",
        "content": "- Reduces the need for multiple physical machines, saving hardware costs.\n- Lowers power consumption and maintenance expenses."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Installing Linux Using a Virtual Machine",
      "initialCode": "sudo apt update",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Installing Linux Using a Virtual Machine",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Installing Linux Using a Virtual Machine?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Installing Linux Using a Virtual Machine",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Installing Linux Using a Virtual Machine is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-distributions": {
    "id": "linux-distributions",
    "badge": "Module 1 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Linux Distributions (Distros) Explained",
    "subtitle": "Complete Linux guide to Linux Distributions (Distros) Explained — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A Linux distribution is an operating system built on the Linux kernel, bundled with essential software, tools, and package managers, customized to serve different users like developers, enterprises, cybersecurity professionals, and general users.\n\n- Includes the Linux kernel, system tools, package manager, and optional desktop environment.\n- Comes with pre-installed tools, reducing manual setup.\n- Built for different purposes like hacking, servers, development, or desktop use.\n- Offers flexibility and customization based on user needs.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Linux Distributions (Distros) Explained."
        }
      },
      {
        "title": "2. Top Linux Distributions",
        "content": "Estimated Users of Linux Distributions by 2025"
      },
      {
        "title": "1. Ubuntu",
        "content": "- Ubuntu is one of the most widely used Linux distributions, especially for beginners. It is user-friendly, has strong community support, and is widely supported by major software vendors and cloud platforms, making it suitable for both desktop and server environments.\n- **Features**: Easy installation, long-term support (LTS) versions, and a large software repository.\n- **Audience**: Beginners and general users"
      },
      {
        "title": "2. Kali Linux",
        "content": "- Kali Linux is specifically designed for cybersecurity tasks such as penetration testing, digital forensics, and ethical hacking. It comes preloaded with more than 600 security tools and is widely used by cybersecurity learners and professionals.\n- **Features:** Pre-installed tools (Nmap, Metasploit, Wireshark, Burp Suite), rolling release updates, customized for security and network testing.\n- **Audience:** Ethical hackers, cybersecurity professionals, penetration testers"
      },
      {
        "title": "3. Debian",
        "content": "- Debian is known for its stability and is often used as the base for other distros, like Ubuntu. It’s a great choice for those who want a solid, secure system and don’t need the latest bleeding-edge features.\n- **Features**: Reliable, secure, and versatile.\n- **Audience**: Advanced users and developers"
      },
      {
        "title": "4. Fedora",
        "content": "- Fedora is known for always having the latest software and technologies. It’s backed by Red Hat, a major player in the enterprise Linux world, and is often used by developers who want to work with cutting-edge technologies.\n- **Features**: Newest software, excellent for development, supported by Red Hat.\n- **Audience**: Developers and enthusiasts"
      },
      {
        "title": "5. Arch Linux",
        "content": "- Arch Linux is for those who want to fully customize their system. It’s a rolling release distro, meaning it’s constantly updated, and it gives users complete control over what gets installed on their system.\n- **Features**: Minimalist, highly customizable, rolling releases.\n- **Audience**: Advanced users and tinkerers"
      },
      {
        "title": "6. CentOS Stream",
        "content": "- CentOS Stream serves as the upstream development platform for Red Hat Enterprise Linux (RHEL). It sits ahead of RHEL in the development cycle, providing a continuous delivery stream of upcoming features and updates.\n- **Features:** Midstream development model, early access to upcoming RHEL features, continuous delivery.\n- **Audience:** Developers, CI/CD environments, and partners testing for future RHEL releases."
      },
      {
        "title": "7. Linux Mint",
        "content": "- Linux Mint is an easy-to-use distribution that looks and feels similar to Windows. It’s a good choice for users who are new to Linux and want something familiar.\n- **Features**: Simple, user-friendly, and ready-to-use out of the box.\n- **Audience**: Beginners and those transitioning from Windows"
      },
      {
        "title": "10. Components of a Linux Distribution",
        "content": "Every Linux distribution is built from essential components that work together to create a fully functional operating system. These components ensure the system can manage hardware, run software, and provide a seamless user experience -"
      },
      {
        "title": "1. Linux Kernel",
        "content": "The Linux kernel is the core of the operating system. It manages hardware resources, controls system processes, handles memory management, and provides device drivers. It acts as a bridge between the hardware and user applications, ensuring smooth communication and operation."
      },
      {
        "title": "2. System Libraries and Utilities",
        "content": "System libraries, such as the GNU C Library (glibc), play a crucial role in providing standard functions and APIs that applications use to interact with the kernel. These libraries are essential for running programs and executing system calls effectively."
      },
      {
        "title": "3. User Interface (UI)",
        "content": "Linux distributions offer two primary types of user interfaces -\n\n- **Graphical User Interfaces (GUIs)**: Popular GUIs like GNOME, KDE, and Xfce provide a user-friendly visual environment for interacting with the system.\n- **Command-Line Interface (CLI)**: For more advanced users, the CLI offers direct control of the system through terminal commands."
      },
      {
        "title": "4. Software Packages",
        "content": "Distributions come preloaded with various software packages tailored for specific use cases. These include -\n\n- Productivity tools (e.g., LibreOffice)\n- Web browsers (e.g., Firefox, Chromium)\n- Media players (e.g., VLC)\n- Development tools (e.g., compilers, IDEs)"
      },
      {
        "title": "5. Package Management System",
        "content": "Package managers streamline the installation, update, and removal of software. Each distribution uses its own package manager, such as -\n\n- APT for Debian-based distros like Ubuntu.\n- YUM/DNF for Red Hat-based distros like Fedora and CentOS.\n- Pacman for Arch Linux."
      },
      {
        "title": "6. Configuration and Customization",
        "content": "Linux distributions provide extensive tools to configure and personalize the system. Users can adjust network settings, user accounts, security policies, and display preferences. This flexibility allows Linux to be tailored for everything from personal use to enterprise-level deployments."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Linux Distributions (Distros) Explained",
      "initialCode": "#!/usr/bin/env bash\n# Linux Distributions (Distros) Explained\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Linux Distributions (Distros) Explained",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Linux Distributions (Distros) Explained?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Linux Distributions (Distros) Explained",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Linux Distributions (Distros) Explained is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-architecture": {
    "id": "linux-architecture",
    "badge": "Module 1 • Linux & Shell",
    "readingTime": "30 min read",
    "level": "Beginner",
    "title": "Architecture of Linux Operating System",
    "subtitle": "Complete Linux guide to Architecture of Linux Operating System — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Linux OS Architecture](/images/linux/linux-architecture.svg)\n\n- The Linux operating system architecture defines how different components of the system interact with each other to manage hardware resources, run applications, and provide a stable and secure computing environment. Linux follows a layered architecture, where each layer has a specific role and responsibility.\n\nLayersThe main components of Linux operating system are:\n\n- Application\n- Shell\n- Kernel\n- Hardware\n- UtilitiesEach layer communicates with the one below it, creating a structured and efficient operating system design:",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Architecture of Linux Operating System."
        }
      },
      {
        "title": "2. Kernel",
        "content": "Kernel is the core component of the Linux operating system that sits between the hardware and user space, managing system resources and ensuring smooth communication between software and hardware. It controls how processes are executed, scheduled, and isolated to maintain system stability and security.\n\nThe kernel is responsible for:\n\n- **Memory management – **Allocates and manages system memory efficiently\n- **Process management – **Schedules processes and controls execution using queues\n- **Resource allocation – **Distributes CPU, memory, and I/O resources among processes\n- **Device management – **Controls hardware devices through device drivers\n- **Application interaction –** Acts as a bridge between applications and hardware\n- **Security –** Enforces access control and system-level security mechanisms"
      },
      {
        "title": "3. Types of Kernel",
        "content": "**1. Monolithic Kernel**\n\n- A Monolithic kernel Offers high performance due to direct communication between components, but the large kernel size makes it more complex and harder to maintain\n- All core operating system services such as process management, memory management, device drivers, and file systems run in kernel space, sharing the same memory**2. Microkernel**\n\n- Only essential services like process scheduling and memory management run in kernel space, while other services execute in user space\n- Microkernel provides better security and modularity, but may suffer from performance overhead due to frequent inter-process communication**3. Exokernel**\n\n- Exokernel exposes hardware resources directly to applications, allowing them to manage resources at a low level\n- Enables high flexibility and performance, but increases application complexity due to minimal abstraction provided by the kernel**4. Hybrid kernel**\n\n- Combines features of monolithic and microkernel architectures, keeping critical services in kernel space while supporting modular components\n- Delivers balanced performance and flexibility, making it suitable for modern systems that require both speed and stability"
      },
      {
        "title": "4. Main Subsystems of kernel",
        "content": "- **Process scheduler: **Responsible for fairly distributing the processing time among all the concurrently running process\n- **Memory management unit**: This kernel sub unit is responsible for proper distribution of memory resources among the concurrently running process\n- **Virtual file system**: This subsystem provides interface to access stored data across different file system and different physical media\n- **Networking Subsystem:** Responsible for handling all network communication, including data transmission, routing, and network protocols\n- **Inter-Process Communication (IPC) Unit:** Enables communication and synchronization between multiple running processes within the system"
      },
      {
        "title": "5. System Libraries",
        "content": "System libraries provide predefined functions that allow application programs and system utilities to access kernel features without interacting with the kernel directly. They form the foundation for software development by offering reusable, standardized interfaces for system operations.\n\nCommon system libraries include:\n\n- **GNU C Library (glibc):** Provides core system calls and built-in functions required for executing C programs\n- **libpthread (POSIX Threads):** Enables creation and management of multithreaded applications\n- **libdl (Dynamic Linker):** Supports dynamic loading and linking of shared libraries at runtime\n- **libm (Math Library): **Offers mathematical functions such as trigonometry, logarithms, and exponentiation\n- **Other libraries:** librt (Real-Time operations), libcrypt (Cryptographic functions), libnss (Name Service Switch), libstdc++ (C++ Standard Library)"
      },
      {
        "title": "6. Shell",
        "content": "The shell is a software interface to the kernel. It takes commands from the user and interprets them. The shell transmits these commands to the kernel, which then performs the requested operations. Users can just enter the command and using the kernel's function that specific task is performed accordingly."
      },
      {
        "title": "7. Different types of shell",
        "content": "Each shell offers unique features and user experiences for interacting with Unix/Linux systems, from basic scripting to advanced customization."
      },
      {
        "title": "1. Bourne Shell (sh)",
        "content": "- One of the earliest Unix shells, providing basic command execution and simple scripting capabilities\n- Reliable and lightweight, still widely used for system scripts and compatibility purposes"
      },
      {
        "title": "2. C Shell (csh)",
        "content": "- Designed with a syntax similar to the C programming language, making it familiar to C developers\n- Introduced features like command history, but is less suitable for complex scripting"
      },
      {
        "title": "3. Korn Shell (ksh)",
        "content": "- Combines features of the Bourne Shell and C Shell while maintaining backward compatibility\n- Widely used in enterprise environments for its powerful scripting and stability"
      },
      {
        "title": "4. Bash (Bourne Again Shell)",
        "content": "- An enhanced version of the Bourne Shell with features like command history, tab completion, and scripting improvements\n- The default shell on most Linux distributions and widely used due to being free and flexible"
      },
      {
        "title": "5. Z Shell (zsh)",
        "content": "- A highly customizable shell that integrates features from Bash, ksh, and csh\n- Popular among developers for its themes, plugins, and advanced auto-completion"
      },
      {
        "title": "6. Fish (Friendly Interactive Shell)",
        "content": "- Designed for ease of use with features like syntax highlighting, command suggestions, and simple configuration\n- Ideal for interactive use, though less commonly used for complex scripting"
      },
      {
        "title": "14. Hardware Layer",
        "content": "The hardware layer is the lowest level of the Linux operating system and forms the foundation on which all other components operate. It consists of physical devices and low-level controls that allow the system to function efficiently and reliably.\n\n- Includes physical components such as CPU, memory, storage, and I/O devices\n- Works with device drivers to enable hardware communication\n- Supports memory access, CPU control, and I/O operations\n- Ensures stable and efficient interaction between hardware and the operating system"
      },
      {
        "title": "15. System utilities",
        "content": "System utilities are command-line tools that help users and administrators manage, configure, and monitor the Linux system. They simplify system administration by providing ready-to-use commands for common tasks.\n\n- Perform file and directory management operations\n- Monitor system performance and resource usage\n- Manage users, groups, and permissions\n- Configure and troubleshoot network settingsComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Architecture of Linux Operating System",
      "initialCode": "#!/usr/bin/env bash\n# Architecture of Linux Operating System\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Architecture of Linux Operating System",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Architecture of Linux Operating System?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Architecture of Linux Operating System",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Architecture of Linux Operating System is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-vs-unix": {
    "id": "linux-vs-unix",
    "badge": "Module 1 • Linux & Shell",
    "readingTime": "12 min read",
    "level": "Beginner",
    "title": "Difference Between Linux and UNIX",
    "subtitle": "Complete Linux guide to Difference Between Linux and UNIX — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Unix and Linux are operating systems designed for multitasking and multi-user environments. They share similar concepts and commands but differ in licensing, development model, and usage.\n\n- **Unix:** A proprietary operating system developed in the 1970s, mainly used in enterprise servers and known for stability and vendor-controlled systems.\n- **Linux:** An open-source operating system developed in the 1990s, widely used across servers, desktops, and embedded systems with strong community support.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Difference Between Linux and UNIX."
        }
      },
      {
        "title": "2. Linux Vs Unix",
        "content": "**Feature****Linux****Unix****Origin**1991 (Linus Torvalds/Community)1969 (AT&T Bell Labs)**Licensing**Open-source (GPL)Proprietary (Various licenses)**Development**Community-driven global developmentVendor-driven (IBM, Oracle, HP)**Kernel Type**Monolithic (Modular)Monolithic (Traditional)**Architecture**Near-universal (x86, ARM, RISC-V, etc.)Specific (PA-RISC, Itanium, Sparc)**Default Shell**Bash (Bourne Again Shell)Bourne Shell (sh) or Korn Shell (ksh)**File Systems**Ext4, XFS, Btrfs, ZFSUFS, JFS, ZFS, HFS**GUI**Diverse (GNOME, KDE, XFCE)Limited (Common Desktop Environment)**Hardware**Anything from a watch to a supercomputerSpecific high-end servers/workstations"
      },
      {
        "title": "3. Applications of Linux",
        "content": "- **Cloud & Server Infrastructure:** Powers most web servers and major cloud platforms like AWS and Google Cloud.\n- **DevOps and Containers**: Forms the base for Docker, Kubernetes, and modern container systems.\n- **Mobile & Embedded Systems:** Runs Android and many smart devices like TVs and cars.\n- **Cybersecurity**: Widely used for penetration testing and digital forensics with distros like Kali Linux.\n- **Supercomputing**: Used in nearly all top supercomputers due to high customization and performance."
      },
      {
        "title": "4. Applications of Unix",
        "content": "- **Legacy Enterprise Systems:** Trusted in banking and stock exchanges for high stability and uptime.\n- **Critical Telecommunications:** Powers telecom infrastructure for reliable switching and routing systems."
      },
      {
        "title": "5. Unix in Enterprise Systems",
        "content": "As of 2025, Unix drives around 69.5% of mission-critical systems of legacy-heavy industries including:\n\n- Mainframes and ultra-security transaction systems.\n- Backbone systems for call switching and network routing.\n- Scientific Research & Academia For its stability, deterministic behavior, and strong handling of memory.**Note**: Unix is expected to decline slowly, retained only where legacy compliance or hardware restrictions exist."
      },
      {
        "title": "6. Linux Growth (Fast, Flexible, and Everywhere)",
        "content": "In 2018, Linux adoption has increased, especially in:\n\n- Cloud-native development (e.g., AWS, GCP, Azure — all default to running Linux).\n- Container orchestration (Kubernetes and Docker are founded on Linux).\n- IoT, embedded systems, and mobile devices (Android is built on Linux kernel).\n- Web hosting and DevOps pipelines (Linux dominates more than 90% of top 1 million web servers, reports W3Techs).**Note: **Linux will likely dominate all new deployments, especially with AI/ML, DevOps, Cloud, and Edge Computing continuing to surge.\n\nComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Difference Between Linux and UNIX",
      "initialCode": "#!/usr/bin/env bash\n# Difference Between Linux and UNIX\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Difference Between Linux and UNIX",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Difference Between Linux and UNIX?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Difference Between Linux and UNIX",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Difference Between Linux and UNIX is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-file-system": {
    "id": "linux-file-system",
    "badge": "Module 2 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Linux File System Internals",
    "subtitle": "Complete Linux guide to Linux File System Internals — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Linux FHS Hierarchy](/images/linux/linux-fhs-tree.svg)\n\n- The Linux File System is a structured method of storing and organizing data on a Linux machine. It arranges files in a hierarchical directory format starting from the root directory (`/)`.\n\n- All files and directories in Linux originate from a single root directory (/).\n- It follows a hierarchical tree structure, making navigation simple and logical.\n- Different directories like /home, /etc, /bin and /var serve specific system purposes.\n- Linux supports multiple file system types like ext4, XFS, Btrfs, each offering different features.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Linux File System Internals."
        }
      },
      {
        "title": "2. Linux File System Structure",
        "content": "The Linux file system architecture is organized into three important layers, each responsible for different functionalities. These layers work together to provide smooth file access, storage and management.\n\nArchitecture"
      },
      {
        "title": "1. Logical File System",
        "content": "Ensures applications interact with files in a simple and consistent way, without worrying about storage details.\n\n- Acts as the interface between user applications and the file system.\n- Handles key operations like open, read, write and close.\n- Provides security checks, such as permissions and file access control."
      },
      {
        "title": "2. Virtual File System (VFS)",
        "content": "Makes file operations uniform and compatible, regardless of the underlying file system format.\n\n- Provides a common interface for different file systems (ext4, XFS, FAT32, NTFS, etc.).\n- Allows Linux to use multiple file system types at the same time.\n- Acts as an abstraction layer, hiding the internal complexities of each file system."
      },
      {
        "title": "3. Physical File System",
        "content": "Ensures reliable storage, error handling and low-level data management.\n\n- Directly interacts with the hardware and disk storage.\n- Manages data blocks, nodes and physical memory allocation.\n- Responsible for writing data to the disk and retrieving it efficiently."
      },
      {
        "title": "6. Characteristics of a File System",
        "content": "A file system defines the structure, rules and methods for how data is organized, stored, accessed and managed on a storage device.\n\n- **Space Management**: Manages block allocation, free-space tracking and fragmentation control to optimize storage efficiency.\n- **Filename**: Enforces naming rules including character sets, length limits and case sensitivity for file identification.\n- **Directory**: Implements hierarchical indexing structures to organize and locate files efficiently.\n- **Metadata**: Stores file attributes such as ownership, permissions, timestamps, size and file type information.\n- **Utilities**: Provides system-level operations for file creation, deletion, backup, recovery and access management.\n- **Design**: Defines architectural limits and mechanisms that determine file system scalability, reliability and performance."
      },
      {
        "title": "7. Linux Directory Structure",
        "content": "- Linux directory structure follows a hierarchical, tree-like structure that starts from the root directory (/).\n- All files, directories, devices and system resources are organized under the root directory.\n- This standardized organization makes it easier to manage, access and maintain files and system resources in Linux.For a detailed understanding of the Linux directory structure and the purpose of each directory, you can refer to the Filesystem Hierarchy Standard (FHS)."
      },
      {
        "title": "1. Journaling",
        "content": "Journaling file systems maintain a special log called a journal that records file system changes before they are permanently written to disk. This helps restore data in case of unexpected shutdowns or crashes."
      },
      {
        "title": "9. Working of Journaling",
        "content": "- Changes are first logged in the journal.\n- Then they are written to the actual disk.\n- Finally, they are marked as completed."
      },
      {
        "title": "10. Journaling Modes",
        "content": "Journaling can operate in three different modes, each offering a balance between speed and data safety:\n\n- **Journal Mode (Highest Safety):** Journals both file data and metadata to provide maximum crash consistency and data integrity.\n- **Ordered Mode (Balanced):** Journals only metadata while enforcing data writes before metadata commits to prevent stale data exposure.\n- **Writeback Mode (Fastest):** Journals only metadata without write-order guarantees, maximizing performance at the cost of crash consistency."
      },
      {
        "title": "2. Versioning",
        "content": "Versioning file systems keep track of previous versions of a file, allowing users to recover older copies when needed.\n\n- Stores earlier states of files based on commits, time intervals (minute/hour) or system events.\n- Useful for backup, history tracking and accidental deletion recovery."
      },
      {
        "title": "3. Inode",
        "content": "An inode (index node) is a data structure that stores important information about files and directories. Inodes act as the internal identity of files in Linux file systems.\n\n- File size, permissions and ownership details.\n- Storage location (pointers to actual data blocks on disk)."
      },
      {
        "title": "13. File System Implementations",
        "content": "Here are some linux file systems:\n\nFile System Implementations**Note**: Cluster and distributed file systems will not be included for simplicity."
      },
      {
        "title": "1. ext (Extended File System)",
        "content": "- Introduced in 1992 as the first file system created specifically for Linux.\n- Marked the beginning of the ext family, laying the foundation for ext2, ext3 and ext4."
      },
      {
        "title": "2. ext2",
        "content": "- Developed in 1993 as a non-journaling file system.\n- Improved timestamp handling and file attribute management compared to ext.\n- Lacks journaling, making boot-time recovery slower after improper shutdowns."
      },
      {
        "title": "3. Xiafs",
        "content": "- Created in 1993 as an alternative to ext2.\n- Had limited features and poor scalability, making it less reliable.\n- Eventually discontinued and no longer used in modern systems."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Linux File System Internals",
      "initialCode": "sudo apt install xfsprogs",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Linux File System Internals",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Linux File System Internals?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Linux File System Internals",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Linux File System Internals is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-fhs": {
    "id": "linux-fhs",
    "badge": "Module 2 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Linux File Hierarchy Structure (FHS)",
    "subtitle": "Complete Linux guide to Linux File Hierarchy Structure (FHS) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Linux FHS Hierarchy](/images/linux/linux-fhs-tree.svg)\n\n- The Linux File Hierarchy Structure or the Filesystem Hierarchy Standard (FHS) defines the directory structure and directory contents in Unix-like operating systems. It is maintained by the Linux Foundation.\n\n- In the FHS, all files and directories appear under the root directory /, even if they are stored on different physical or virtual devices\n- Some of these directories only exist on a particular system if certain subsystems, such as the X Window System, are installed\n- Most of these directories exist in all UNIX operating systems and are generally used in much the same way\n- However, the descriptions here are those used specifically for the FHS and are not considered authoritative for platforms other than Linux",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Linux File Hierarchy Structure (FHS)."
        }
      },
      {
        "title": "1. / (Root)",
        "content": "At the top of every Linux file system is the root directory represented by a forward slash /. It’s the base point, and no directory exists above it.\n\n- If you look at the file system graphically, you’ll see all other directories branching from this root directory\n- Only the root user has permission to modify contents inside this directory.\n- Regular users cannot make changes here. For example, if you attempt to create a file in / as a non-root user, you’ll encounter a \"Permission Denied\" errorroot-linux-directory"
      },
      {
        "title": "2. /bin",
        "content": "The /bin directory contains essential commands and binaries needed by all users, including cp, ls, ssh, and kill. These commands are universally available across user types.\n\n- Contains binary executables\n- Common linux commands you need to use in single-user modes are located under this directory\n- Commands used by all the users of the system are located here e.g. ps, ls, ping, grep, cp bin-linux-directory"
      },
      {
        "title": "3. /boot",
        "content": "This directory stores all files required for booting the system. It includes the GRUB bootloader configuration and essential kernel files that are loaded during startup.\n\n- Kernel initrd, vmlinux, grub files are located under /boot\n- **Example**: initrd.img-2.6.32-24-generic, vmlinuz-2.6.32-24-genericboot-linux-directory"
      },
      {
        "title": "4. /dev",
        "content": "Device files in Linux are stored in the /dev directory. These are special files that act as interfaces between hardware and software. Device files are of two types: block devices (e.g., hard drives) and character devices (e.g., microphones and speakers). Examples include /dev/sda1 for disk partitions.\n\n- These include terminal devices, USB, or any device attached to the system\n- **Example**: /dev/tty1, /dev/usbmon0dev-linux-directory"
      },
      {
        "title": "5. /etc",
        "content": "Short for \"Editable Text Configuration,\" /etc contains configuration files for system applications, users, services, and tools or it contains the Host-specific system-wide configuration files. For example, user details like UID and local addresses are defined here.\n\n- This also contains startup and shutdown shell scripts used to start/stop individual programs\n- **Example**: /etc/resolv.conf, /etc/logrotate.confetc-linux-directory"
      },
      {
        "title": "6. /home",
        "content": "Every non-root user has a personal directory inside /home. For example, if your username is anshu, your personal directory would be /home/anshu. Each user can create, delete, or modify files only in their own home directory and access of another user's home depends on security configuration.\n\n- Home directories for all users to store their personal files, containing saved files, personal settings, etc\n- **Example**: /home/kishlay, /home/kvhome-linux-directoryhome-linux-directory"
      },
      {
        "title": "7. /lib",
        "content": "Applications require shared libraries to run, which are stored in /lib. These include dynamic libraries needed during runtime. For example, Apache server libraries are available here.\n\n- Library filenames are either ld* or lib*.so.*\n- **Example**: ld-2.11.1.so, libncurses.so.5.7lib-linux-directory"
      },
      {
        "title": "8. /media",
        "content": "Devices like USBs, CDs, and pen drives are mounted under /media. For example, when a CD-ROM is inserted (appeared in FHS-2.3), its details will appear here.\n\n- Temporary mount directory for removable devices\n- **Examples**: /media/cdrom for CD-ROM; /media/floppy for floppy drives; /media/cdrecorder for CD writermedia-linux-directory"
      },
      {
        "title": "9. /mnt",
        "content": "When external drives are connected, they are temporarily mounted in /mnt. This is where their contents become accessible to the system.\n\n- Temporary mount directory where sysadmins can mount filesystemsmnt-linux-directory"
      },
      {
        "title": "10. /opt",
        "content": "Third-party software and packages not part of the default system installation are stored in /opt. It includes their configuration and data files.\n\n- Contains add-on applications from individual vendors\n- Add-on applications should be installed under either /opt/ or /opt/subdirectoryopt-linux-directory."
      },
      {
        "title": "11. /sbin",
        "content": "This directory holds administrative binaries like iptables, firewall management tools, fsck, init, route etc. These binaries are primarily for system administrators and typically require root privileges to execute.\n\n- Just like /bin, /sbin also contains binary executables\n- The linux commands located under this directory are used typically by system administrators, for system maintenance purposes\n- **Example: **iptables, reboot, fdisk, ifconfig, swaponsbin-linux-directory"
      },
      {
        "title": "12. /srv",
        "content": "Site-specific data served by this system, such as data and scripts for web servers, data offered by FTP servers, and repositories for version control systems.\n\n- srv stands for service\n- Contains server specific services related data\n- **Example:** /srv/cvs contains CVS related datasrv-linux-directory"
      },
      {
        "title": "13. /tmp",
        "content": "Programs create temporary files during execution, and these are stored in /tmp. These files are deleted automatically after the program finishes or when the system is restarted.\n\n- Directory that contains temporary files created by system and users\n- Files under this directory are deleted when the system is rebootedtmp-linux-directory"
      },
      {
        "title": "14. /usr",
        "content": "Secondary hierarchy for read-only user data; contains the majority of (multi-)user utilities and applications.\n\n- Contains binaries, libraries, documentation, and source-code for second level programs\n- /usr/bin contains binary files for user programs. If you can’t find a user binary under /bin, look under /usr/bin.** For example: **at, awk, cc, less, scp\n- /usr/sbin contains binary files for system administrators. If you can’t find a system binary under /sbin, look under /usr/sbin. **For example: **atd, cron, sshd, useradd, userdel\n- /usr/lib contains libraries for /usr/bin and /usr/sbin\n- /usr/local contains user programs that you install from source. For example, when you install apache from source, it goes under /usr/local/apache2\n- /usr/src holds the Linux kernel sources, header-files and documentation."
      },
      {
        "title": "15. /proc",
        "content": "The /proc directory provides detailed information about system processes. Each process is assigned a unique ID and represented as a directory inside /proc. For example, /proc/meminfo gives real-time data about memory usage including total, free, buffer, and cache statistics.\n\n- Contains information about system processes\n- This is a pseudo filesystem that contains information about running processes. For example: /proc/{pid} directory contains information about the process with that particular pid\n- This is a virtual filesystem with text information about system resources. For example: /proc/uptimeComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Linux File Hierarchy Structure (FHS)",
      "initialCode": "#!/usr/bin/env bash\n# Linux File Hierarchy Structure (FHS)\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Linux File Hierarchy Structure (FHS)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Linux File Hierarchy Structure (FHS)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Linux File Hierarchy Structure (FHS)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Linux File Hierarchy Structure (FHS) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-directory-structure": {
    "id": "linux-directory-structure",
    "badge": "Module 2 • Linux & Shell",
    "readingTime": "18 min read",
    "level": "Beginner",
    "title": "Linux Directory Structure Explained",
    "subtitle": "Complete Linux guide to Linux Directory Structure Explained — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Linux FHS Hierarchy](/images/linux/linux-fhs-tree.svg)\n\n- In Linux, everything is treated as a file even if it is a normal file, a directory, or even a device such as a printer or keyboard. All the directories and files are stored under one root directory which is represented by a forward slash /.\n\n- The Linux directory layout follows the Filesystem Hierarchy Standard (FHS).\n- This standard defines how directories are organized and what types of files should be stored in each.\n- Since Linux is based on UNIX, it inherits many of UNIX filesystem conventions.\n- Similar directory structures are also found in other UNIX like operating systems such as BSD and macOS.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Linux Directory Structure Explained."
        }
      },
      {
        "title": "2. Types of files in the Linux system",
        "content": "Linux categorizes files into different types based on their purpose, such as general data storage, system structure, or device representation.\n\n- **General Files**: They are also called ordinary files. It may be an image, video, program, or simple text file. These types of files can be in ASCII or Binary format.\n- **Directory Files:** These types of files are a warehouse for other file types. It may be a directory file within a directory (subdirectory).\n- **Device Files:** In a Windows like operating system, devices like CD-ROM and hard drives are represented as drive letters like F: G: H, whereas in the Linux system, devices are represented as files. For example, /dev/sda1, /dev/sda2, and so on.We know that in a Windows like operating system, files are stored in different folders on different data drives like C: D: E:, whereas in the Linux/Unix operating system, files are stored in a tree like structure starting with the root directory, as shown in the diagram below.\n\nThe Linux/Unix file system hierarchy base begins at the root and everything starts with the root directory."
      },
      {
        "title": "3. Top level directories associated with the root directory",
        "content": "These top level directories under the root (`/`) form the foundation of the Linux file system, each serving a specific role in organizing system files, user data, and configurations."
      },
      {
        "title": "4. Steps to Check Linux Directories from Root (/)",
        "content": "- **Open the terminal:** Launch the terminal from the application menu or by using a keyboard shortcut.\n- **Switch to root user: **Execute the command sudo -s and enter the system password to gain root privileges.\n- **Move to the root directory: **Change the current working directory to the root (/) directory.\n- **List all directories in the root directory:** Display all available directories present in the base directory.\n- **Review the directory structure: **Observe the listed directories such as system, user, configuration, and virtual directories."
      },
      {
        "title": "5. Exploring directories and their usability",
        "content": "In the Linux system some well defined configuration files, binaries, manual pages information files are available for every process.\n\nLinux Kernel File:\n\n- **/boot/vmlinux : **The Linux kernel file.\n- **/boot/grub/grub.cfg : **the main generated configuration file actually used at boot time for GRUBDevice Files:\n\n- **/dev/hda :** Device file for the first IDE HDD.\n- **/dev/null : **A pseudo device (character device) that discards all data written to it and returns end-of-file (EOF) when read from."
      },
      {
        "title": "6. System Configuration Files",
        "content": "System configuration files are essential files stored in the /etc directory that define system behavior, user access, boot settings, network rules, and service management in Linux.\n\n- **/etc/bashrc :** Contains system wide default settings and aliases for the Bash shell.\n- **/etc/crontab : **Used to schedule commands or scripts to run automatically at predefined time intervals.\n- **/etc/fstab : **Contains details about disk drives and their mount points.\n- **/etc/group :** Stores information about system groups and group memberships.\n- **/etc/default/grub** : stores user-defined settings (like timeout, default kernel, boot options)\n- **/etc/init.d :** Contains service startup and shutdown scripts.\n- **/etc/hosts :** Maps IP addresses to corresponding hostnames.\n- **/etc/hosts.allow :** Specifies which hosts are allowed to access services on the local machine.\n- **/etc/hosts.deny :** Lists hosts that are denied access to services on the local machine.\n- **/etc/modules.conf :** Contains configuration settings for system kernel modules.\n- **/etc/mtab : **Provides information about currently mounted file systems.\n- **/etc/passwd :** Contains user account information such as usernames and user IDs (passwords are stored in the shadow file).\n- **/etc/profile :** Defines system wide environment settings for the Bash shell.\n- **/etc/profile.d : **Contains additional scripts executed automatically after user login.\n- **/etc/resolv.conf :** Stores DNS configuration used by the system.\n- **/etc/security :** Contains security related configuration files, including login access controls.\n- **/etc/termcap : **ASCII file defining behavior and capabilities of different terminal types.\n- **/etc/X11 : **Directory containing configuration files for the X Window System."
      },
      {
        "title": "7. User Related Files",
        "content": "A top-level directory in Linux that contains user-space programs, libraries, documentation, and shared data. Below are some examples :\n\n- **/usr/bin : **Contains most of the user level executable programs and commands.\n- **/usr/include :** Stores standard header files used by C and other programming languages.\n- **/usr/share :** Contains architecture independent, shareable data such as documentation and text files.\n- **/usr/lib :** Holds object files and shared libraries required by programs in /usr/bin.\n- **/usr/sbin :** Contains administrative commands used by the system administrator (superuser)."
      },
      {
        "title": "8. Virtual and Pseudo Process Related Files",
        "content": "These /proc files provide real time system and process information generated dynamically by the Linux kernel.\n\n- **/proc/cpuinfo :** Provides detailed information about the CPU, such as processor type, model, and speed.\n- **/proc/filesystems : **Displays the file systems supported and currently available in the system.\n- **/proc/interrupts :** Shows information about the number of interrupts handled by each IRQ.\n- **/proc/ioports :** Contains details of input and output addresses used by hardware devices.\n- **/proc/meminfo :** Reports detailed information about system memory usage.\n- **/proc/modules :** Lists the kernel modules that are currently loaded in the system.\n- **/proc/mounts : **Displays information about all mounted file systems.\n- **/proc/stat : **Provides detailed statistics about system activity and performance.\n- **/proc/swaps :** Contains information about swap space and swap files in use.\n- **/proc/version :** Contains the Linux version information."
      },
      {
        "title": "9. Log Files",
        "content": "These files record crucial system events, logins, and activity history for monitoring and troubleshooting.\n\n- **/var/log/lastlog :** Stores information about the last login of each user.\n- **/var/log/messages :** Contains general system activity and global log messages, though on modern systemd-based systems logging may instead be handled by journald\n- **/var/log/wtmp :** Maintains a history of user login and logout sessions.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Linux Directory Structure Explained",
      "initialCode": "#!/usr/bin/env bash\n# Linux Directory Structure Explained\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Linux Directory Structure Explained",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Linux Directory Structure Explained?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Linux Directory Structure Explained",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Linux Directory Structure Explained is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-fs-navigation": {
    "id": "linux-fs-navigation",
    "badge": "Module 2 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "File System Navigation Commands (pwd, cd, ls)",
    "subtitle": "Complete Linux guide to File System Navigation Commands (pwd, cd, ls) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux file system navigation commands are used to move through directories and explore the file structure using the command line. They help users locate, access, and manage files and folders efficiently within the Linux operating system.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for File System Navigation Commands (pwd, cd, ls)."
        }
      },
      {
        "title": "2. Commonly Used File System Navigation Commands",
        "content": "These commands help you navigate, organize, and manage files and directories within the Linux file system."
      },
      {
        "title": "1. pwd (print working directory)",
        "content": "The pwd command shows the current location in the system. It tells you which folder you're currently in.\n\n- The current directory is /home/kali/Templates"
      },
      {
        "title": "2. ls (list files and directories)",
        "content": "The ls command is used to list the files and directories in the current directory. It provides an overview of what is inside a folder.\n\n- All the files and folders present inside the current folder are listed."
      },
      {
        "title": "3. cd (change directory)",
        "content": "The cd command is used to move between folders. You can tell it exactly which folder you want to go to (like giving it an address), or you can use shortcuts to get around. Let's look into both the methods."
      },
      {
        "title": "6. moving to a nearby folder",
        "content": "If you want to move into a folder that's within the one you're already in, you can just use its name. For instance, if you're in your home directory and want to reach downloads.\n\n- Checking the current directory\n- Using cd command to change the directory\n- Observe the updated directory",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. moving to a nearby folder",
          "snippet": "cd [directory name]"
        }
      },
      {
        "title": "7. Going to a Specific Folder",
        "content": "Imagine telling someone the full address to find your house. Similarly, you can do the same by giving the complete path to the folder. For example, you want to access the documents folder inside the username folder.\n\nDirectory Structure\n- Considering the above directory structure, the active directory was changed from Downloads to Documents by traversing from the home directory.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Going to a Specific Folder",
          "snippet": "cd  [directory path]cd  /home/username/documents"
        }
      },
      {
        "title": "4. mkdir (make directory)",
        "content": "The mkdir command, an abbreviation for \"make directory,\" allows you to create new folders within your existing file system. This provides a structured way to categorize and store your files.\n\n**Syntax:**\n\n**Command:**\n\n- User tried to create a new folder named GeeksForGeeks\n- Changed the directory to newly created directory\n- The active directory is updated",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. mkdir (make directory)",
          "snippet": "mkdir [directory name]"
        }
      },
      {
        "title": "5. rmdir (remove empty directory)",
        "content": "The rmdir command, short for \"remove directory,\" enables you to delete empty directories. This is useful for cleaning up unused folders and maintaining a streamlined file system.\n\n**Syntax:**\n\n**Command:**\n\n- Observe that the empty directory was removed.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. rmdir (remove empty directory)",
          "snippet": "rmdir [directory_name]"
        }
      },
      {
        "title": "6. cp (copy)",
        "content": "The cp command in Linux is used to copy files and directories from one location to another.\n\n**Syntax:**\n\n**Command:**\n\n- Here, copy \"image.jpg\" from Downloads to Pictures while keeping the original.\n- Executing the copying command.\n- Changing the current active directory for checking.\n- Using the list command, we can observe that the image.jpg was copied.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. cp (copy)",
          "snippet": "cp [source_file] [location]"
        }
      },
      {
        "title": "7. mv (move)",
        "content": "The mv command in Linux is used to move or rename files and directories from one location to another.\n\n**Syntax:**\n\nFor instance, to move a file named \"image.jpg\" from your Downloads folder to Documents, you'd use\n\n- Executing the mv (move) command.\n- Changing the current active directory.\n- After executing ls (list) command, we can observe that the file has been transferred.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. mv (move)",
          "snippet": "mv [source_file] [location]"
        }
      },
      {
        "title": "12. Difference between Windows and Linux File System",
        "content": "Windows and Linux differ significantly in how they organize, access, and manage files within their operating systems."
      },
      {
        "title": "13. Windows File System",
        "content": "- Uses a drive-based structure such as C:, D:, and E:, where each drive is treated separately.\n- File names are not case-sensitive, meaning File.txt and file.txt are considered the same.\n- Provides simpler file permission management, mainly based on user accounts.\n- Primarily uses the NTFS file system for storing and managing data.\n- Designed to be user-friendly and easy to use, especially for beginners."
      },
      {
        "title": "14. Linux File System",
        "content": "- Follows a single, unified directory tree structure starting from the root directory (/).\n- File names are case-sensitive, so File.txt and file.txt are treated as different files.\n- Offers advanced and granular permission control for users, groups, and others.\n- Commonly uses the Ext4 file system, along with support for many other file systems.\n- Highly flexible and powerful, making it suitable for advanced users and system administrators."
      },
      {
        "title": "15. Additional Shortcut Tips",
        "content": "These quick symbols help you navigate the Linux file system more efficiently."
      },
      {
        "title": "1. ~ (tilde)",
        "content": "This symbol is like a shortcut to your home base. No matter where you are, typing tilde will always bring you back to your home folder.\n\n- The active directory was updated to home."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: File System Navigation Commands (pwd, cd, ls)",
      "initialCode": "cd [directory name]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: File System Navigation Commands (pwd, cd, ls)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of File System Navigation Commands (pwd, cd, ls)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to File System Navigation Commands (pwd, cd, ls)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "File System Navigation Commands (pwd, cd, ls) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-pathnames": {
    "id": "linux-pathnames",
    "badge": "Module 2 • Linux & Shell",
    "readingTime": "24 min read",
    "level": "Beginner",
    "title": "Absolute and Relative Pathnames in Linux/UNIX",
    "subtitle": "Complete Linux guide to Absolute and Relative Pathnames in Linux/UNIX — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In Linux, a path is used to specify the exact location of a file or directory inside the filesystem. Since Linux follows a hierarchical directory structure starting from the root (/), paths play a crucial role in file navigation, command execution, scripting and system administration. Linux mainly uses two types of paths:",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Absolute and Relative Pathnames in Linux/UNIX."
        }
      },
      {
        "title": "2. Absolute Path",
        "content": "An absolute path is the complete and exact location of a file or directory starting from the root directory (/). It clearly defines where a file exists in the filesystem, independent of the user’s current directory.\n\n- Linux does not depend on the current working directory when an absolute path is used\n- The system starts searching from the root directory (/)\n- Each directory in the path is followed step by step\n- The search continues until the target file or folder is reached\n- This approach makes absolute paths reliable and unambiguous\n- Works from any location in the system\n- Does not change based on the current directory"
      },
      {
        "title": "3. Example",
        "content": "This command tells the OS to print the content written inside the file notes.txt\n\nThis path tells Linux:\n\n- Start from /(root)\n- Go to home\n- Enter User\n- Move to projects/linux\n- Access the file notes.txt",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example",
          "snippet": "cat /home/user/projects/linux/notes.txt"
        }
      },
      {
        "title": "4. Practical Uses",
        "content": "- Used in shell scripts to avoid path confusion\n- Common in cron jobs and system services\n- Preferred in system configuration files"
      },
      {
        "title": "5. Relative Path",
        "content": "A relative path defines the location of a file or directory with respect to the current working directory. It does not start from the root directory.\n\n- Does not begin with a slash ('/')\n- Dependent on the current directory\n- Shorter and easier to type\n- Changes meaning when the current directory changes"
      },
      {
        "title": "6. Example",
        "content": "If the current directory is:\n\nThen the relative path:\n\nMoves to:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Example",
          "snippet": "/home/user"
        }
      },
      {
        "title": "7. Special Symbols in Relative Paths",
        "content": "Linux provides special symbols to simplify relative paths:\n\n- **`.**`** (dot)** : Refers to the current directory\n- **`..**`** (double dot)** : Refers to the parent directory"
      },
      {
        "title": "8. Examples",
        "content": "- Runs script.sh in the current directory\n\n- Moves the current working directory to 2 directories up and then into backup\n- These symbols make navigation faster and reduce the need for long paths",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Examples",
          "snippet": "./script.sh"
        }
      },
      {
        "title": "9. Common Mistakes to Avoid",
        "content": "- Using relative paths in scripts that run automatically\n- Forgetting the current directory while using relative paths\n- Mixing absolute and relative paths incorrectly\n- Assuming Linux paths behave like Windows paths"
      },
      {
        "title": "10. When to Use Absolute or Relative Path",
        "content": "Follow the instructions below to understand when to use absolute paths and relative paths"
      },
      {
        "title": "11. Use absolute paths when",
        "content": "- Writing shell scripts\n- Running background jobs\n- Editing system configuration files\n- When accuracy is critical"
      },
      {
        "title": "12. Use relative paths when",
        "content": "- Navigating directories manually\n- Working within a known project structure\n- Performing quick file operationsComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Absolute and Relative Pathnames in Linux/UNIX",
      "initialCode": "cat /home/user/projects/linux/notes.txt",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Absolute and Relative Pathnames in Linux/UNIX",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Absolute and Relative Pathnames in Linux/UNIX?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Absolute and Relative Pathnames in Linux/UNIX",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Absolute and Relative Pathnames in Linux/UNIX is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-basic-commands": {
    "id": "linux-basic-commands",
    "badge": "Module 3 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Basic Linux Commands for Beginners",
    "subtitle": "Complete Linux guide to Basic Linux Commands for Beginners — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux commands are used to interact with the operating system through the terminal and perform tasks like file management, navigation, and system monitoring. Learning basic Linux commands helps beginners understand how Linux works and use it efficiently for daily tasks.\n\n- Helps beginners understand and use the Linux terminal effectively\n- Covers commonly used commands for files, directories, and system tasks\n- Useful for students, developers, and system administrators\n- Builds a strong foundation for advanced Linux and server management25 Basic Linux Commands25 Basic Linux commands to help beginners start working with Linux confidently.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Basic Linux Commands for Beginners."
        }
      },
      {
        "title": "1. ls",
        "content": "The ls command in Linux is used to list files and directories present in the current working directory.\n\n- Helps users quickly understand directory contents.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The ls command lists all the directories and files available in the current working directory.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. ls",
          "snippet": "ls [options] [directory]"
        }
      },
      {
        "title": "2. pwd",
        "content": "The pwd command in Linux is used to display the full path of the current directory.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The pwd command prints the absolute path of the current working directory."
      },
      {
        "title": "3. mkdir",
        "content": "The mkdir command in Linux is used to create new directories or folders.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The mkdir command creates a new directory named GeeksforGeeks.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. mkdir",
          "snippet": "mkdir directory_name"
        }
      },
      {
        "title": "4. cd",
        "content": "The cd command in Linux is used to change the current working directory.\n\n- Allows navigation between directories.\n- Moves the user to the home directory when used without arguments.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The cd command changes the current working directory to GeeksforGeeks.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. cd",
          "snippet": "cd directory_name"
        }
      },
      {
        "title": "5. rmdir",
        "content": "The rmdir command in Linux is used to delete empty directories.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The rmdir command deletes the empty directory TestFolder.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. rmdir",
          "snippet": "rmdir directory_name"
        }
      },
      {
        "title": "6. cat",
        "content": "The cat command in Linux is used to display file contents and combine multiple files.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The cat command displays the content of the file.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. cat",
          "snippet": "cat file_name"
        }
      },
      {
        "title": "7. cp",
        "content": "The cp command in Linux is used to copy files or directories.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The cp command copies the contents of file1.txt into file2.txt.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. cp",
          "snippet": "cp source destination"
        }
      },
      {
        "title": "8. mv",
        "content": "The mv command in Linux is used to move or rename files and directories.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The mv command renames the file old.txt to new.txt.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. mv",
          "snippet": "mv old_name new_name"
        }
      },
      {
        "title": "9. rm",
        "content": "The rm command in Linux is used to delete files permanently.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The rm command deletes the file demo.txt.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. rm",
          "snippet": "rm file_name"
        }
      },
      {
        "title": "10. uname",
        "content": "The uname command in Linux is used to display system information.\n\n- Shows operating system details.\n- Helps identify the system.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The uname command displays the operating system name.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. uname",
          "snippet": "uname [OPTIONS]"
        }
      },
      {
        "title": "11. locate",
        "content": "The locate command in Linux is used to find files using a database.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The locate command shows the path of the searched file.\n- Requires updatedb database",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. locate",
          "snippet": "locate file_name"
        }
      },
      {
        "title": "12. touch",
        "content": "The touch command in Linux is used to create empty files and updates file timestamps.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The touch command creates an empty file named test.txt.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. touch",
          "snippet": "touch file_name"
        }
      },
      {
        "title": "13. ln",
        "content": "The ln command in Linux is used to create links between files.\n\n- Supports hard and soft links.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The ln command creates a symbolic link.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. ln",
          "snippet": "ln -s source link_name"
        }
      },
      {
        "title": "14. clear",
        "content": "The clear command in Linux is used to clear the terminal screen.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The terminal screen is cleared."
      },
      {
        "title": "15. ps",
        "content": "The ps command in Linux is used to display running processes.\n\n- Helps monitor system activity.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput\n- The ps command displays currently running processes.\n- commonly used as \"ps aux\""
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Basic Linux Commands for Beginners",
      "initialCode": "ls [options] [directory]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Basic Linux Commands for Beginners",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Basic Linux Commands for Beginners?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Basic Linux Commands for Beginners",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Basic Linux Commands for Beginners is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-complete-commands": {
    "id": "linux-complete-commands",
    "badge": "Module 3 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Complete Linux Commands Reference",
    "subtitle": "Complete Linux guide to Complete Linux Commands Reference — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux commands allow users to control and manage the system using the terminal, which works similarly to the Command Prompt in Windows.\n\n- Used to manage files and directories, such as creating, deleting, copying, and organizing data.\n- Helps monitor and control system resources including processes, memory, and CPU usage.\n- Allows administrators to manage users, permissions, software packages, and system services.\n- Supports networking, automation, and troubleshooting through powerful command-line tools.Here is a list of Linux operations divided under broad categories:",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Complete Linux Commands Reference."
        }
      },
      {
        "title": "1. File Operations Commands",
        "content": "File operations commands are used to manage files within a computer system. They allow users to create, access, modify, organize, and remove files efficiently, ensuring smooth handling of data.\n\n- These commands help in generating new files and making changes to the content of existing files.\n- Users can display file data in readable, paged, or formatted output without modifying the file.\n- Files can be removed from the system, either normally or in a way that prevents recovery."
      },
      {
        "title": "2. Directory Operations Commands",
        "content": "Directory operations commands are used to manage folders within the filesystem. They help users navigate, organize, and maintain the directory structure efficiently.\n\n- They display the contents of directories in various formats for better understanding.\n- They help analyze directory size and storage usage."
      },
      {
        "title": "3. File Permission and Ownership Commands",
        "content": "File permission and ownership commands control access to files and directories. They ensure that only authorized users can access or modify data.\n\n- These commands define read, write, and execute permissions for files.\n- Ownership of files can be assigned to specific users.\n- Group ownership can be managed for shared access.\n- Sensitive files can be protected from unauthorized access."
      },
      {
        "title": "4. User Management Commands",
        "content": "User management commands are used to handle user accounts in a multi-user system. They help administrators manage access and authentication.\n\n- New user accounts can be created and removed when required.\n- Existing user details and privileges can be modified.\n- Password policies and expiration can be controlled.\n- User identity and login details can be viewed.\n- Active users on the system can be monitored."
      },
      {
        "title": "5. Group Management Commands",
        "content": "Group management commands organize users into groups. They simplify permission handling and improve collaboration.\n\n- New groups can be created for users with similar roles.\n- Users can be added to or removed from groups.\n- Group-level permissions can be managed efficiently.\n- Group configuration integrity can be verified.\n- Membership details of users can be displayed."
      },
      {
        "title": "6. Process Management Commands",
        "content": "Process management commands monitor and control running programs. They help maintain system performance and stability.\n\n- Running processes can be viewed and analyzed.\n- Processes can be started, paused, or terminated.\n- CPU and memory usage can be monitored.\n- System performance issues can be identified."
      },
      {
        "title": "7. Terminal and Session Management Commands",
        "content": "Terminal and session management commands are used to control and manage terminal sessions and their input/output behavior. They help users handle multiple sessions efficiently and adjust terminal settings for smooth interaction.\n\n- These commands allow users to create, switch, and manage multiple terminal sessions.\n- User input and output behavior can be controlled for better usability.\n- Terminal sessions can be reset or restored when issues occur."
      },
      {
        "title": "8. Job Scheduling Commands",
        "content": "Job scheduling commands automate task execution. They reduce manual effort and improve efficiency.\n\n- Tasks can be scheduled to run at a specific time.\n- Repetitive jobs can be automated.\n- System maintenance can be automated."
      },
      {
        "title": "9. Disk and File System Commands",
        "content": "Disk and file system commands manage storage devices and data organization. They ensure disk health and reliability.\n\n- Disk partitions can be created and modified.\n- File systems can be mounted or unmounted.\n- Disk space usage can be checked.\n- File system errors can be detected and repaired.\n- Data can be backed up and restored."
      },
      {
        "title": "10. Hardware and System Information Commands",
        "content": "Hardware and System Information Commands display information about system hardware and resources. They help in monitoring and troubleshooting.\n\n- CPU, memory, and storage details can be viewed.\n- Connected hardware devices can be identified.\n- System performance statistics can be monitored.\n- Kernel and boot messages can be examined.\n- Hardware health can be analyzed."
      },
      {
        "title": "11. Networking Commands",
        "content": "Networking commands manage network configuration and communication. They help troubleshoot connectivity issues.\n\n- Network interface status can be checked.\n- Connectivity between systems can be tested.\n- Data can be transferred across networks.\n- Network traffic can be monitored.\n- Routing and firewall rules can be managed."
      },
      {
        "title": "12. Package Management Commands",
        "content": "Package management commands manage software installation and updates. They simplify application handling.\n\n- Software packages can be installed or removed.\n- System packages can be updated.\n- Dependency issues can be resolved.\n- Available software can be searched.\n- System consistency can be maintained."
      },
      {
        "title": "13. Compression and Archiving Commands",
        "content": "Compression and Archiving Commands reduce file size and bundle multiple files. They improve storage and transfer efficiency.\n\n- Files can be compressed to save space.\n- Archived files can be created.\n- Compressed data can be extracted.\n- Archived files can be compared.\n- Backup storage can be optimized."
      },
      {
        "title": "14. Text Processing and Formatting Commands",
        "content": "Text processing commands are used to manipulate, filter, and analyze text data in files or command output. They are essential tools in scripting and automation, helping users extract meaningful information and transform data efficiently.\n\n- Search, filter, and modify text data\n- Process file contents line by line\n- Combine with pipes for powerful automation\n- Widely used in log analysis and data processing"
      },
      {
        "title": "15. Checksum and File Integrity Commands",
        "content": "Checksum and file integrity commands are used to verify the accuracy and consistency of files using hash values. They help detect file corruption, accidental changes, or unauthorized modifications to ensure data security and reliability.\n\n- These commands generate unique hash values for files based on their content.\n- They help verify whether a file has been altered or damaged during transfer or storage.\n- File authenticity can be confirmed by comparing checksum values.\n- They assist in detecting unauthorized or malicious changes to files.\n- They are widely used to ensure secure file downloads and data integrity."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Complete Linux Commands Reference",
      "initialCode": "#!/usr/bin/env bash\n# Complete Linux Commands Reference\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Complete Linux Commands Reference",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Complete Linux Commands Reference?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Complete Linux Commands Reference",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Complete Linux Commands Reference is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-file-management": {
    "id": "linux-file-management",
    "badge": "Module 3 • Linux & Shell",
    "readingTime": "22 min read",
    "level": "Beginner",
    "title": "File Management in Linux",
    "subtitle": "Complete Linux guide to File Management in Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- File management in Linux involves handling files and directories through various operations such as creation, modification, organization and access control within the filesystem.\n\n- Linux treats everything as a file, including devices and system configurations.\n- Ensures efficient data organization and accessibility.\n- Common commands include cp, mv, rm, ls and cat.Linux categorizes files into three main types, each serving a specific purpose in the system:",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for File Management in Linux."
        }
      },
      {
        "title": "1. General Files",
        "content": "These are the most common file types that store user data such as text files, images, and binaries.\n\n- Represent regular data like documents, programs, or scripts.\n- Form the majority of files in Linux/UNIX systems.\n- May contain human-readable text (ASCII), executable binaries, or program data."
      },
      {
        "title": "2. Directories:",
        "content": "These act as containers that organize files and other directories hierarchically.\n\n- Similar to folders in Windows.\n- Store lists of file names and their related metadata.Important directories include:\n\n- /: Root directory (base of the system)\n- /home/:User home directories\n- /bin/: Essential user binaries\n- /boot/: Static boot files"
      },
      {
        "title": "3. Device Files:",
        "content": "These files represent hardware devices and handle input/output (I/O) operations.\n\n- Used to interact with physical devices like printers, disks, or terminals.\n- Found mostly in the /dev/ directory.\n- Allow the operating system to treat hardware as if it were a regular file."
      },
      {
        "title": "1. Listing Files",
        "content": "- To list files and directories in Linux, the ls command is used. It provides a quick view of the contents of a directory, including files, subdirectories, and optional details like permissions, ownership, and timestamps.\n\n- Lists all files and directories in the current directory.\n- Each type of file is displayed with a different color for easy identification.\n- Directories are typically shown in blue if you are on the default theme.Running ls -l returns a detailed listing of files and directories in the current directory.\n\n**Command:**\n\n**Output:**\n\nDisplays important information such as:\n\n- File permissions (who can read, write, or execute).\n- Owner and group of each file.\n- File size and last modification date.\n- Helps determine which users or groups can access or manage each file, providing insights into system security and file management."
      },
      {
        "title": "2. Creating Files",
        "content": "- The touch command is used to create a new file in Linux.\n- If the specified file does not exist, touch creates a new blank file.\n- If the file already exists, its contents remain unaffected, and only the file’s timestamp may be updated.**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Creating Files",
          "snippet": "touch filename"
        }
      },
      {
        "title": "3. Displaying File Contents",
        "content": "- The cat command is used to display the contents of a file in the terminal.\n- For large files, the output may scroll past the screen too quickly; in such cases, commands like more or less can be used to view the content page by page.**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Displaying File Contents",
          "snippet": "cat filename"
        }
      },
      {
        "title": "4. Copying a File",
        "content": "- The cp command is used to create a copy of a file in Linux.\n- It copies the contents of the source file to a new file at the specified destination.\n- The new file will have the same name and content as the original, unless a different name is specified.**Syntax:**\n\n**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Copying a File",
          "snippet": "cp source/filename destination/"
        }
      },
      {
        "title": "5. Moving a File",
        "content": "- The mv command is used to move a file from one location to another in Linux.\n- It moves the file from the source directory and places it in the destination directory with the same name and content.**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Moving a File",
          "snippet": "mv source/filename destination/"
        }
      },
      {
        "title": "6. Renaming a File",
        "content": "- The mv command can also be used to rename a file in Linux.\n- It changes the file name from filename to new_filename while retaining the file’s content.\n- Essentially, the original file is replaced with a file of the new name without altering the data.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Renaming a File",
          "snippet": "mv filename new_filename"
        }
      },
      {
        "title": "7. Deleting a File",
        "content": "- The rm command is used to delete a file in Linux.\n- It permanently removes the specified file from the directory.\n- Use this command carefully, as deleted files cannot be easily recovered.\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Deleting a File",
          "snippet": "rm filename"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: File Management in Linux",
      "initialCode": "touch filename",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: File Management in Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of File Management in Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to File Management in Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "File Management in Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-directory-management": {
    "id": "linux-directory-management",
    "badge": "Module 3 • Linux & Shell",
    "readingTime": "16 min read",
    "level": "Beginner",
    "title": "Directory Management in Linux (mkdir, rmdir, cp, mv)",
    "subtitle": "Complete Linux guide to Directory Management in Linux (mkdir, rmdir, cp, mv) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Directories in Linux are special types of files that store metadata mappings to other files and directories, organizing the filesystem in a hierarchical structure.\n\n- Directories act as containers for files and subdirectories.\n- The root directory (/) is the top-level directory in Linux.\n- Special directories like . (current directory) and .. (parent directory) are used for navigation.\n- Each directory can contain multiple files and subdirectories.To manage directories in Linux based system, follow the given steps carefully :",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Directory Management in Linux (mkdir, rmdir, cp, mv)."
        }
      },
      {
        "title": "2. Step 1. Creating Directories",
        "content": "- To create a directory in Linux use the mkdir command which stands for make directory.\ncreating directory named 'GFG'",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Step 1. Creating Directories",
          "snippet": "mkdir directory_name"
        }
      },
      {
        "title": "3. Step 2. Listing Directories",
        "content": "- To list directories use the ls command. Adding the -l flag provides detailed information about each item, including whether it’s a file or directory. In the detailed output, entries that start with a ‘d’ (e.g., drwxrwxr-x) indicate directories.**Commands:**\n\nor\n\nList Directory\n- You can also list a directory's content by using ls command\nList inside contents of Directory"
      },
      {
        "title": "4. Step 3. Removing Directories",
        "content": "- To remove a directory you can use 'rmdir' but for that the directory must be empty\n\n- To remove a directory which has contents in it use 'rm' with recursive flags '-r' or '-rf'\nRemoving a directory and its content\n- This will delete the directory with all its content inside it.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step 3. Removing Directories",
          "snippet": "rmdir directory_name"
        }
      },
      {
        "title": "5. Step 4. Changing Directories",
        "content": "- To change directories you have 'cd' with various attributes.\n\n- If directory is somewhere else then give the path also with directory name.\nChanging Directory\n- To move back to last directory you were in\n\n- To move to the parent directory of your current directory use\n\n- To move back to the default directory use\n\n- To check in current directory use (while it has no much use case other than scripting but it is still useful to know it)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Step 4. Changing Directories",
          "snippet": "cd Directory_name"
        }
      },
      {
        "title": "6. Step 5. Copying Directories",
        "content": "- To copy a directory, use the cp command with the -r (recursive) flag to ensure all contents inside the directory are copied as well.\n- You can copy a directory from any location by providing the full path of both the source and destination.\n- This command works even if you’re not in the parent directory of the directory being copied.\n- Make sure you have the required permissions to access and copy the directory.\nCopying Directory",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Step 5. Copying Directories",
          "snippet": "cp -r source_dir destination_dir"
        }
      },
      {
        "title": "7. Step 6. Moving or Renaming Directories",
        "content": "- To move or rename a directory, for both 'mv' command is used.\n- To move a directory provide the path of source directory and destination path. You can move a directory from and to anywhere, you just need to provide correct path with directory name which you want to move and the destination where you want to move, required you have permission to do so.\nMoving Directory\n- To rename a directory you need to be present in the parent directory. just provide the old name and followed by new name.\nRenaming Directory from 'GFG' to 'gfg'",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Step 6. Moving or Renaming Directories",
          "snippet": "mv source_dir /path/to/destination"
        }
      },
      {
        "title": "8. Step 7. Checking Directory Size",
        "content": "- To check a directory/files size use 'du' command and to get in human readable format (KB,MB,GB) use '-h' with it.\nCheck Size Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Directory Management in Linux (mkdir, rmdir, cp, mv)",
      "initialCode": "mkdir directory_name",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Directory Management in Linux (mkdir, rmdir, cp, mv)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Directory Management in Linux (mkdir, rmdir, cp, mv)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Directory Management in Linux (mkdir, rmdir, cp, mv)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Directory Management in Linux (mkdir, rmdir, cp, mv) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-permissions": {
    "id": "linux-permissions",
    "badge": "Module 3 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Permissions in Linux (rwx, User, Group, Others)",
    "subtitle": "Complete Linux guide to Permissions in Linux (rwx, User, Group, Others) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Linux Permissions rwx](/images/linux/linux-permissions-rwx.svg)\n\n- Linux file permissions form the foundation of the system’s security model. They define who can read, write, or execute files and directories.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Permissions in Linux (rwx, User, Group, Others)."
        }
      },
      {
        "title": "1. The Three Basic Permissions",
        "content": "Every file or directory has three types of permissions:"
      },
      {
        "title": "2. Ownership and Permission Groups",
        "content": "Permissions are assigned to three categories of users:"
      },
      {
        "title": "4. File Permission: Operation Chart",
        "content": "**Operators****Definition****`+`**Add permissions**`-`**Remove permissions**`=`**Set the permissions to the specified values**Note: **All these permissions are being granted at three different levels based on their group."
      },
      {
        "title": "5. Permission Groups in Linux",
        "content": "First, Permissions are represented as nine characters. Each of the three \"rwx\" characters refers to a different operation you can perform on the file.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Permission Groups in Linux",
          "snippet": "---     ---     ---rwx     rwx     rwxuser    group   other"
        }
      },
      {
        "title": "6. User, Group, and Others Option in Linux File Permission",
        "content": "Reference Class   Description**`u`**userThe user permissions apply only to the owner of the file or directory, they will not impact the actions of other users. `g`groupThe group permissions apply only to the group that has been assigned to the file or directory, they will not affect the actions of other users. `o`othersThe other permissions apply to all other users on the system, this is the permission group that you want to watch the most. `a`All threeAll three (owner, groups, others)"
      },
      {
        "title": "7. Checking Permission of Files in Linux",
        "content": "Let's dive in to understand the possible methods to check all the desired details of a file including \"File Permission\""
      },
      {
        "title": "8. The 'ls' Command",
        "content": "Here's the command to execute it within the terminal. Let's show you with an example:\n\n**Input:**\n\nWe're taking 'NarX' as a default file name:\n\n**Output:**\n\nThe above command represent the following information:\n\n- The first character '-' indicates a file, if 'd' indicates a directory\n- The next nine characters = (rw-r--r--) show the security\n- The next column shows the owner of the file.\n- The next column shows the group owner of the file. (which has special access to these files)\n- The next column shows the size of the file in bytes.\n- The next column shows the date and time the file was last modified.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. The 'ls' Command",
          "snippet": "ls -l NarX.txt"
        }
      },
      {
        "title": "9. The 'namei' Command",
        "content": "The 'namei' command is used to check the file path through each component of the file path. Here's the command to execute it within Terminal:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. The 'namei' Command",
          "snippet": "namei -l /path/to/your/file"
        }
      },
      {
        "title": "10. The 'stat' Command",
        "content": "Unlike 'ls -l' command, the \"stat\" command is used to pin point the file location. Here's how you can do it:\n\nWe're taking file name as \"example.txt\"\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. The 'stat' Command",
          "snippet": "stat example.txt"
        }
      },
      {
        "title": "11. Permissions in Linux",
        "content": "The command you use to change the security permissions on files is called \"chmod\", which stands for \"change mode\" because the nine security characters are collectively called the security \"mode\" of the file. You can modify permissions using symbolic notation or octal notation."
      },
      {
        "title": "12. Symbolic Notation",
        "content": "Symbolic notation allows you to add, remove, or set permissions for specific users. Let's understand this using different example below:\n\n**Example 1**: To Change File Permission in Linux\n\nIf you want to give \"execute\" permission to the world (\"other\") for file \"xyz.txt\", you will start by typing.\n\nNow you would type a '+' to say that you are \"adding\" permission.\n\nThen you would type an 'x' to say that you are adding \"execute\" permission.\n\nFinally, specify which file you are changing.\n\nYou can see the change in the picture below.\n\nYou can also change multiple permissions at once. For example, if you want to take all permissions away from everyone, you would type.\n\nThe code above revokes all the read(r), write(w), and execute(x) permission from all user(u), group(g), and others(o) for the file xyz.txt which results in this.\n\nchmod ugo**Example 2**:\n\nThe code adds read(r) and write(w) permission to both user(u) and group(g) and revoke execute(x) permission from others(o) for the file abc.mp4.\n\nSomething like this:\n\n- Assigns read(r) and execute(x) permission to both user(u) and group(g) and add read permission to others for the file abc.c.\n- There can be numerous combinations of file permissions you can invoke revoke and assign. You can try some on your Linux system."
      },
      {
        "title": "13. Octal Notations Permissions in Linux",
        "content": "The octal notation is used to represent file permission in Linux by using three user group by denoting 3 digits i.e.\n\n- user\n- group\n- other usersHere's how to permissions are mapped:\n\n- Read (r) = 4\n- Write (w) = 2\n- Execute (x) = 1Permissions for owner, group, and others are represented by a three-digit octal value. The sum of permissions for each group gives the corresponding number.\n\n**Reference:**\n\nNow you would type a '+' to say that you are \"adding\" permission.\n\nThen you would type an 'x' to say that you are adding \"execute\" permission.\n\nFinally, specify which file you are changing.\n\nYou can see the change in the picture below.\n\nOctal Notations Permissions in Linux**Example:**\n\nThe code adds read(r) and write(w) permission to both user(u) and group(g) and revoke execute(x) permission from others(o) for the file abc.mp4.\n\nYou can also use octal notations like this.\n\noctal notationsUsing the octal notations table instead of 'r', 'w', and 'x'. Each digit octal notation can be used for either of the group 'u', 'g', or' o'."
      },
      {
        "title": "14. Security Permissions in Linux",
        "content": "The combination for the permissions are r,w,x, and -. Let's understand this briefly:\n\nFor example:  \"rw-  r-x  r--\"\n\n- **\"rw-\"**: the first three characters `rw-`. This means that the owner of the file can \"read\" it (look at its contents) and \"write\" it (modify its contents). We cannot execute it because it is not a program but a text file.\n- **\"r-x\"**: the second set of three characters \"r-x\". This means that the members of the group can only read and execute the files.\n- **\"r--\"**: The final three characters \"r--\" show the permissions allowed to other users who have a UserID on this Linux system. This means anyone in our Linux world can read but cannot modify or execute the files' contents."
      },
      {
        "title": "15. Special Permissions in Linux",
        "content": "Besides usual methods, Linux also offers special permission types to have more complex control over files."
      },
      {
        "title": "1. The 'setuid' Command",
        "content": "The SET User ID permission allows user to execute programs with the privileges of its owner. Below is the example for the same:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. The 'setuid' Command",
          "snippet": "chmod u+s program"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Permissions in Linux (rwx, User, Group, Others)",
      "initialCode": "---     ---     ---rwx     rwx     rwxuser    group   other",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Permissions in Linux (rwx, User, Group, Others)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Permissions in Linux (rwx, User, Group, Others)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Permissions in Linux (rwx, User, Group, Others)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Permissions in Linux (rwx, User, Group, Others) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-chmod": {
    "id": "linux-chmod",
    "badge": "Module 3 • Linux & Shell",
    "readingTime": "30 min read",
    "level": "Beginner",
    "title": "chmod Command in Linux with Examples",
    "subtitle": "Complete Linux guide to chmod Command in Linux with Examples — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Linux Permissions rwx](/images/linux/linux-permissions-rwx.svg)\n\n- The chmod (change mode) command in Linux/UNIX is used to modify file and directory permissions. It controls who can read, write, or execute a file by setting access rights for the owner, group, and others. Let’s use the chmod command to set the permission to 745.\n\n**Command:**\n\n**Output:**\n\nBreakdown of -rwxr--r-x:\n\n- Owner (7): rwx : read, write, execute\n- Group (4): r-- : read only\n- Others (5): r-x : read & executeHere, the file is:\n\n- Fully accessible (read/write/execute) by the owner\n- Read-only for the group\n- Read + execute for others",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Overview & Syntax",
          "snippet": "chmod 745 newfile.txt"
        },
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for chmod Command in Linux with Examples."
        }
      },
      {
        "title": "2. Options Available in chmod Command",
        "content": "ModeOwnerGroupOthersTypical use for scripts700rwx------Private script (only you can run/edit).711rwx--x--xExecutable/traverse only; contents not readable.744rwxr--r--You edit & run; others can read (not execute).750rwxr-x---Team-only executable; hidden from others.754rwxr-xr--Exec for group, read-only for others.755rwxr-xr-xCommon: everyone can run, only you edit.775rwxrwxr-xShared within a group (both owner & group can edit/run).**Note: **Options in `chmod` are basically used for modifying permissions across multiple files or directories at once."
      },
      {
        "title": "3. Syntax:",
        "content": "Here:\n\n- **Options:** Optional flags that modify the behavior of the `chmod` command.\n- **Mode:** The permissions to be set, represented by a three-digit octal number or symbolic notation (e.g., u=rw,go=rx).\n- **File_name:** The name of the file or directory for which the permissions are to be changed.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax:",
          "snippet": "chmod [options] [mode] [File_name]"
        }
      },
      {
        "title": "4. Permission Types",
        "content": "In Linux, permissions determine who has control over a file or directory. These permissions specify who can read (access), write (edit or delete), or execute (run) a file, based on user roles: owner, group, and others.\n\n- **Read (****`r**`**): **Allows viewing the contents of the file.\n- **Write (****`w**`**):** Allows modifying the file or directory.\n- **Execute (****`x**`**):** Allows running the file as a program or entering the directory."
      },
      {
        "title": "1. Examples of Using Octal mode",
        "content": "Suppose we want to give read and write permissions to the file owner, read, write, and execute permissions to the group, and read-only permission to others. Then the command would be:\n\n- 6 represent permission of file Owner which are (rw-).\n- 7 represent permission of Group which are (rwx).\n- 4 represent permission of Other which is (r--). Here, we use a calculator to view the permissions. For example, the owner has read, write, and execute permissions, while the group and others (public) have only read and write permissions, but cannot execute the file.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Examples of Using Octal mode",
          "snippet": "chmod 674 [file_name]"
        }
      },
      {
        "title": "2. Equivalent Numeric Permission",
        "content": "**Syntax:**\n\n**Table:**\n\nUser TypePermissionsBinaryValueOwner`rwx`1117Group`rw-`1106Others`rw-`1106",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Equivalent Numeric Permission",
          "snippet": "chmod 766 filename"
        }
      },
      {
        "title": "3. Example of Reverting Changes Made by \"chmod\" Command",
        "content": "To undo or revert changes made by the chmod command in Linux, you simply need to run the chmod command again and specify the correct permissions you want."
      },
      {
        "title": "8. Steps to revert permission changes:",
        "content": "- Decide the correct permission you want to restore.\n- Use the chmod command again with the appropriate octal value."
      },
      {
        "title": "9. Example",
        "content": "If you want to revert the permissions to rw-r--r--\n\n- Owner: read + write\n- Group: read-only\n- Others: read-onlyThe corresponding octal value is 644. (read = 4, write = 2).\n\n**Command:**\n\nReplace file_or_directory_name with the actual name of your file or directory.\n\n**Example with a file:**\n\nIf the file name is a.txt, run:\n\n**Result:**\n\n- **Before reverting: **permissions were modifiedls -l a.txt   (used to display all the permission a.txt has)\n- **After reverting:** permissions are restored to rw-r--r--Here we can see that changes has be done",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Example",
          "snippet": "chmod 644 file_or_directory_name"
        }
      },
      {
        "title": "10. Making a script executable in Linux",
        "content": "In Linux, scripts are typically written in languages like Bash, Python, or Perl. While the script's content is crucial, ensuring it has executable permissions is equally important. Without execution permissions, Linux won't allow the script to run."
      },
      {
        "title": "11. Step 1: Navigate to the Script's Directory",
        "content": "Open the terminal and use the cd command to navigate to the directory where your script is located.\n\n**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Step 1: Navigate to the Script's Directory",
          "snippet": "cd /path/to/your/script"
        }
      },
      {
        "title": "12. Step 2: Check Current Permissions",
        "content": "Use the `ls` command with the `-l` option to list the files in the directory along with their permissions. This step helps you identify the current permissions of your script:\n\nchecking current permission"
      },
      {
        "title": "13. Step 3: Make the Script Executable",
        "content": "To make a script executable, you need to use the `chmod` command. Assuming your script is named `example.sh`, you can make it executable with the following command:\n\nThis command adds the execute (+x) permission to the script.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Step 3: Make the Script Executable",
          "snippet": "chmod +x example.sh"
        }
      },
      {
        "title": "14. Step 4: Verify Changes",
        "content": "Run the `ls -l` command again to verify that the script now has execute permissions. You should see an 'x' in the permission field for the script:\n\nverifying changes after making script executable"
      },
      {
        "title": "15. Step 5: Execute the Script",
        "content": "Now that your script has executable permissions, you can run it using the `./` notation followed by the script's name. For example:\n\nexecute the scriptThis notation tells Linux to look in the current directory (.) for the script named example.sh.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 15. Step 5: Execute the Script",
          "snippet": "./example.sh"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: chmod Command in Linux with Examples",
      "initialCode": "chmod 745 newfile.txt",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: chmod Command in Linux with Examples",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of chmod Command in Linux with Examples?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to chmod Command in Linux with Examples",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "chmod Command in Linux with Examples is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-chown": {
    "id": "linux-chown",
    "badge": "Module 3 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "chown Command: Changing Ownership in Linux",
    "subtitle": "Complete Linux guide to chown Command: Changing Ownership in Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The chown command in Linux allows modifying the ownership of files or directories. It can assign a new user, group, or both, either individually or simultaneously. only root or privileged user (via sudo) can change ownership.\n\n- Supports recursive changes with the -R option for directories.\n- Can change ownership of single or multiple files at once.\n- Offers verbose reporting and conditional ownership change using options.\n- Works with symbolic links using dedicated options (-h, -H, -L, -P).",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for chown Command: Changing Ownership in Linux."
        }
      },
      {
        "title": "2. Syntax",
        "content": "Here's a breakdown of the components:\n\n- **chown:** The base command.\n- **[options]:** Optional flags that control the behavior of the command.\n- **new_owner:** Specifies the user who will become the new owner of the file.\n- **[:new_group]:** Specifies the group to be assigned. This part is optional and must be preceded by a colon (:).\n- **file(s):** One or more files or directories whose ownership will be modified.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax",
          "snippet": "chown [options] new_owner[:new_group] file(s)"
        }
      },
      {
        "title": "3. Understanding User Ownership and Permissions in Linux",
        "content": "Different users in the operating system have ownership and permission to ensure that the files are secure and put restrictions on who can modify the contents of the files. In Linux, different users use the system:\n\n- **Root User:** It is a superuser who has access to all the directories and files in our system, and it can perform any operation. An important thing to note is that only the root user can perform changing of permissions or ownership of the files that are not owned by them.\n- **Regular User:** These users have limited access to files and directories and can only modify the files that they own."
      },
      {
        "title": "4. Ownership and Permissions",
        "content": "To protect and secure files and directories in Linux we use permissions to control what a user can do with a file or directory. Linux uses three types of permissions:\n\n- **Read:** This permission allows the user to read files in directories, it lets the user read directories and subdirectories stored in it.\n- **Write:** This permission allows a user to modify and delete a file. Also, it allows a user to modify its contents (create, delete, and rename files in it) for the directories.\n- **Execute:** This permission on a file allows it to get executed. For example, if we have a file named php.sh unless it is given execute permission it won't run."
      },
      {
        "title": "1. Change the Owner of a File",
        "content": "To Change the owner of a file in Linux. Update file ownership when responsibility or access needs to be transferred to another user, such as after file creation by root or file migration between users.\n\n**Syntax:**\n\n**Command:**\n\nThis designates the user \"master\" as the new owner of file1.txt.\n\nchown master file1.txt",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Change the Owner of a File",
          "snippet": "chown owner_name file_name"
        }
      },
      {
        "title": "2. Change the Group of a File",
        "content": "Modify the group associated with a file so that users belonging to a specific group can access or manage it according to group permission rules, without altering the file owner.\n\n**Command:**\n\n- **':'** specifies that only the group ownership is updated\n- **group1:** becomes the new group owner\n- The existing file owner remains unchangedIn this scenario, the group \"group1\" is assigned as the new group for the file 'file1.txt'. This operation is handy for managing access permissions within specific groups.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Change the Group of a File",
          "snippet": "chown :group1 file1.txt"
        }
      },
      {
        "title": "3. Change Owner and Group of a File",
        "content": "Perform a simultaneous change of both the file owner and the group to ensure correct ownership and group association in a single operation.\n\n**Command:**\n\n- **master:** becomes the new file owner\n- **group1:** is assigned as the new group\n- Both ownership attributes are updated togetherHere, greek1 is a file.\n\nchown master:group1 greek1",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Change Owner and Group of a File",
          "snippet": "chown master:group1 file1.txt"
        }
      },
      {
        "title": "4. Change Owner Only if Current Owner Matches (--from)",
        "content": "Update file ownership only when the current owner matches a specific user, adding a layer of control to prevent unintended changes.\n\n**Command:**\n\n- **--from=master:** ensures the change occurs only if the current owner is master\n- **root:** becomes the new owner if the condition is met\n- **greek1:** is the target fileThis command ensures that ownership is changed from \"master\" to \"root\" only when the current owner is \"master.\" It adds an additional layer of control to ownership modifications.\n\nchown --from=master root greek1",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Change Owner Only if Current Owner Matches (--from)",
          "snippet": "chown --from=master root greek1"
        }
      },
      {
        "title": "5. Change Group Only if Current Group Matches (--from)",
        "content": "Update the group ownership of a file only when the current group matches a specified value, preventing accidental changes to unrelated files.\n\n**Command:**\n\n- **--from=:group1:** ensures the group is changed only if it is currently group1\n- **root:** becomes the new group owner\n- **greek1:** is the target fileThis command specifically changes the group of greek1 from \"group1\" to \"root.\" It is useful when refining group associations.\n\nchown --from=:group1 root greek1Here, the group of greek1 is changed to root.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Change Group Only if Current Group Matches (--from)",
          "snippet": "chown --from=:group1 root greek1'"
        }
      },
      {
        "title": "6. Copy Ownership from One File to Another (--reference)",
        "content": "Duplicate the ownership (user and group) from one file to another, ensuring consistent permissions and simplifying bulk ownership management.\n\n**Command:**\n\n- **--reference=greek1:** uses the ownership of greek1 as the source\n- **greek2:** inherits both the user and group from greek1\n- Useful for applying the same ownership to multiple files without manually specifying owner and groupThis command copies the ownership details from \"greek1\" to \"greek2,\" ensuring consistency in ownership between the two files.\n\nchown --reference=greek1 greek2",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Copy Ownership from One File to Another (--reference)",
          "snippet": "chown --reference=greek1 greek2"
        }
      },
      {
        "title": "7. Change Owner and Group of Multiple Files",
        "content": "Apply ownership changes to several files in a single command, streamlining management of multiple files without repeating the command for each file individually.\n\n**Command:**\n\n- **master:** becomes the owner of both files\n- **group:** is assigned as the new group for both filesMultiple files are listed after the owner:group specification",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Change Owner and Group of Multiple Files",
          "snippet": "chown master:group greek2 greek3"
        }
      },
      {
        "title": "12. Options available in 'chown' command in Linux",
        "content": "Here are common options for change owner of file in Linux:"
      },
      {
        "title": "1. Using '-c' Option in 'chown' to Change File Ownership",
        "content": "The '-c' option in the 'chown' command is utilized to report when a file change is made. This option is beneficial when you want to receive notifications about ownership alterations.\n\n**Example:**\n\nThis command notifies you when the ownership of 'file1.txt' is changed, providing valuable feedback for tracking modifications.\n\nchown -c master file1.txt",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Using '-c' Option in 'chown' to Change File Ownership",
          "snippet": "chown -c master file1.txt"
        }
      },
      {
        "title": "2. Using '-v' Option in 'chown' to Change File Ownership",
        "content": "The '-v' option enhances the verbosity of the 'chown' command by showing detailed information for every processed file. This is particularly useful when you want a comprehensive log of ownership changes.\n\n**Example:**\n\nBy using this command, you get a verbose output, displaying information about each file processed during the ownership change.\n\nchown -v master file1.txt",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Using '-v' Option in 'chown' to Change File Ownership",
          "snippet": "chown -v master file1.txt"
        }
      },
      {
        "title": "3. '-f' Option in 'chown' to File Ownership in Linux.",
        "content": "The '-f' option in the chown command serves to suppress most error messages\n\nIn this case, the command attempts to change ownership, and any error messages are suppressed, allowing for a more seamless execution.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. '-f' Option in 'chown' to File Ownership in Linux.",
          "snippet": "chown -f master file1.txt"
        }
      },
      {
        "title": "16. Additional Useful Options in chown",
        "content": "Here are more options when managing file ownership across different files, directories, and symbolic links.\n\n- **-h:** Modifies ownership of a symbolic link instead of its referenced file.\n- **--reference=FILE :** Uses another file as a reference to copy ownership.\n- **--from=OWNER:GROUP** : Changes ownership only if file’s current ownership matches given values.\n- **-R :** Recursively change ownership of all files and subdirectories.\n- **-H, -L, -P :** Control how symbolic links are handled during recursive changes.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: chown Command: Changing Ownership in Linux",
      "initialCode": "chown [options] new_owner[:new_group] file(s)",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: chown Command: Changing Ownership in Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of chown Command: Changing Ownership in Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to chown Command: Changing Ownership in Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "chown Command: Changing Ownership in Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-tar": {
    "id": "linux-tar",
    "badge": "Module 4 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "tar Command: Creating and Extracting Archives",
    "subtitle": "Complete Linux guide to tar Command: Creating and Extracting Archives — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The tar command in Linux (short for Tape Archive) is a powerful tool used to create, view, extract, and manage archive files. It allows you to bundle multiple files and directories into a single archive while preserving permissions and directory structure. Tar can also compress archives using gzip, bzip2, or xz.\n\n- Used to create backups and archive files.\n- Supports compression using gzip (-z), bzip2 (-j), or xz (-J).\n- Preserves file permissions and structure.\n- Works with single or multiple files and directories.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for tar Command: Creating and Extracting Archives."
        }
      },
      {
        "title": "2. Example 1: Create a simple tar archive",
        "content": "**Command:**\n\n**Output:**\n\nCreate tar archive",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example 1: Create a simple tar archive",
          "snippet": "tar -cvf file.tar *.c"
        }
      },
      {
        "title": "3. Example 2: Extract a tar Archive",
        "content": "Command examples and usage details for **Example 2: Extract a tar Archive**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example 2: Extract a tar Archive",
          "snippet": "tar -xvf file.tar"
        }
      },
      {
        "title": "4. Syntax:",
        "content": "- tar: The command itself.\n- [options]: Flags to control behavior (create, extract, list, compress etc.)\n- [archive-file]: Name of tar archive file.\n- [file or directory to be archived]: The file or directory you want to include in the archive.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Syntax:",
          "snippet": "tar [options] [archive-file] [file or directory to be archived]"
        }
      },
      {
        "title": "1. Creating an uncompressed tar Archive using option -cvf",
        "content": "This tar command creates a tar file called file.tar which is the archive of all .c files in the current directory\n\n- **'-c':** Creates a new archive.\n- **'-v':** Displays verbose output, showing the progress of the archiving process.\n- **'-f':** Specifies the filename of the archive**Output: **\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Creating an uncompressed tar Archive using option -cvf",
          "snippet": "tar -cvf file.tar *.c"
        }
      },
      {
        "title": "2. Extracting files from Archive using option -xvf",
        "content": "This Linux tar command extracts files from archives.\n\n- **'-x': **Extracts files from an archive.\n- **'-v':** Displays verbose output during the extraction process.\n- **'-f':** Specifies the filename of the archive.**Output:  **\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Extracting files from Archive using option -xvf",
          "snippet": "tar -xvf file.tar"
        }
      },
      {
        "title": "3. Using gzip compression with tar",
        "content": "The -z option in the tar command is used to create a gzip-compressed archive. This command creates a compressed file named file.tar.gz containing all .c files from the current directory.\n\n- **-c: **Creates a new archive\n- **-v: **Displays the archiving process\n- **-z:** Applies gzip compression\n- **-f:** Specifies the name of the archive fileOutput:\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Using gzip compression with tar",
          "snippet": "tar -cvzf file.tar.gz *.c"
        }
      },
      {
        "title": "4. Extracting a gzip tar Archive *.tar.gz using option -xvzf:",
        "content": "This tar command extracts files from tar.gz archive.\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Extracting a gzip tar Archive *.tar.gz using option -xvzf:",
          "snippet": "tar -xvzf file.tar.gz"
        }
      },
      {
        "title": "5. Creating compressed tar archive file in Linux using option -j",
        "content": "This Linux tar command compresses and creates a bzip2-compressed tar archive, which is generally smaller than a gzip-compressed archive. Bzip2 provides better compression than gzip, though both compression and decompression take more time than gzip.\n\nAfter creating the archive, you can verify its content using the -tvf option:\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Creating compressed tar archive file in Linux using option -j",
          "snippet": "tar -cvjf file.tar.tbz example.cpp"
        }
      },
      {
        "title": "6. Untar single tar file or specified directory in Linux:",
        "content": "This tar command extracts a bzip2-compressed tar archive (.tar.tbz) into the current directory or into a specified directory using the -C option.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Untar single tar file or specified directory in Linux:",
          "snippet": "tar -xvjf file.tar.tbz\nor \ntar -xvjf file.tar.tbz -C /path/to/directory"
        }
      },
      {
        "title": "7. Untar multiple .tar, .tar.gz, .tar.tbz file in Linux:",
        "content": "This tar command in Linux is used to extract specific files from different types of archive files such as .tar, .tar.gz, and .tar.tbz. In the following examples, we are extracting os1.c and os2.c from the respective archives.\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Untar multiple .tar, .tar.gz, .tar.tbz file in Linux:",
          "snippet": "tar -xvf file.tar os1.c os2.c\nor \ntar -zxvf file.tar.gz os1.c os2.c\nor \ntar -jxvf file.tar.tbz os1.c os2.c"
        }
      },
      {
        "title": "8. Check size of existing tar, tar.gz, tar.tbz file in Linux:",
        "content": "This tar command will display the size of an archive file in bytes.\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Check size of existing tar, tar.gz, tar.tbz file in Linux:",
          "snippet": "wc -c file.tar\nor \nwc -c file.tar.gz\nor \nwc -c file.tar.tbz"
        }
      },
      {
        "title": "9. Update existing tar file in Linux",
        "content": "This Linux tar command updates an existing archive.\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Update existing tar file in Linux",
          "snippet": "tar -rvf file.tar *.c"
        }
      },
      {
        "title": "10. List the contents and specify the tarfile using option -tf",
        "content": "This tar command Linux will list the contents in a tar file.\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. List the contents and specify the tarfile using option -tf",
          "snippet": "tar -tf file.tar"
        }
      },
      {
        "title": "11. Using pipe with grep command to find what we are looking for",
        "content": "This tar command in Linux will list only the mentioned text or image in grep from an archived file.\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Using pipe with grep command to find what we are looking for",
          "snippet": "tar -tvf file.tar | grep \"text to find\" \nor\ntar -tvf file.tar | grep \"filename.file extension\""
        }
      },
      {
        "title": "12. Viewing the Archive using option -tvf",
        "content": "This tar command displays the archive contents.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Viewing the Archive using option -tvf",
          "snippet": "tar -tvf file.tar"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: tar Command: Creating and Extracting Archives",
      "initialCode": "tar -cvf file.tar *.c",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: tar Command: Creating and Extracting Archives",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of tar Command: Creating and Extracting Archives?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to tar Command: Creating and Extracting Archives",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "tar Command: Creating and Extracting Archives is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-gzip": {
    "id": "linux-gzip",
    "badge": "Module 4 • Linux & Shell",
    "readingTime": "18 min read",
    "level": "Intermediate",
    "title": "gzip Command: Compressing Files in Linux",
    "subtitle": "Complete Linux guide to gzip Command: Compressing Files in Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The gzip command in Linux is used to compress files efficiently, reducing their size to save disk space and speed up file transfers without data loss. It is widely used for compressing log files, backups, and large text files. By default, gzip compresses a file and replaces it with a .gz version of the same name.\n\n- Uses the DEFLATE algorithm (LZ77 + Huffman coding) for speed and efficiency.\n- Supports decompression using the -d option or the gunzip command.\n- Maintains original file metadata such as timestamp and name (unless modified).",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for gzip Command: Compressing Files in Linux."
        }
      },
      {
        "title": "2. Example 1: Compress a File Using gzip",
        "content": "Compress a file to reduce its size. Creates mydoc.txt.gz in the same directory and removes mydoc.txt by default.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example 1: Compress a File Using gzip",
          "snippet": "gzip mydoc.txt"
        }
      },
      {
        "title": "3. Example 2: Decompress a .gz File",
        "content": "Restore the original file from a compressed .gz file. This command decompresses the specified gzip file, leaving the original uncompressed file intact.\n\n**Command:**\n\n**Output:**\n\nHere,\n\n- **touch mydoc.txt: **Creates an empty file.\n- **gzip mydoc.txt:** Compresses it into mydoc.txt.gz and deletes the original.\n- **gzip -d mydoc.txt.gz:** Decompresses it back to mydoc.txt and deletes the .gz file.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example 2: Decompress a .gz File",
          "snippet": "gzip -d mydoc.txt.gz"
        }
      },
      {
        "title": "4. Syntax",
        "content": "- **gzip:** Command used to compress files in Linux.\n- **[options]:** Optional flags that modify the behavior of the command (e.g., -d, -k, -v).\n- **[file**s**]:** Name of the file to be compressed.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Syntax",
          "snippet": "gzip [Options] [files]"
        }
      },
      {
        "title": "1. -k: Keep the Original File",
        "content": "By default, gzip deletes the original file after compression. The -k option keeps the original file along with the compressed .gz file.\n\n**Command:**\n\nThis command compresses \"example.txt\" and keeps the original file intact.\n\n**Output:**\n\nHere,\n\n- **touch example.txt: **Creates an empty file named example.txt.\n- **gzip -k example.txt:** Compresses it into example.txt.gz while keeping the original file.\n- **ls:** Shows both files 'example.txt' (original) and 'example.txt.gz' (compressed).",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -k: Keep the Original File",
          "snippet": "gzip -k example.txt"
        }
      },
      {
        "title": "2. -v: Verbose Mode",
        "content": "Displays detailed information during compression or decompression. Shows file name, original size, compressed size, and compression ratio.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -v: Verbose Mode",
          "snippet": "gzip -v example1.txt"
        }
      },
      {
        "title": "3. -f: Force Compression",
        "content": "In cases where the compressed file already exists, the `-f` option forcefully overwrites it. Forces compression and overwrites the existing .gz file without prompting. Useful when a compressed file with the same name already exists.\n\n**Command:**\n\n**Output:**\n\n**Note:** Compresses \"example.txt\" and overwrites any existing \"example.txt.gz\" file",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -f: Force Compression",
          "snippet": "gzip -f example2.txt"
        }
      },
      {
        "title": "4. Compress Multiple Files",
        "content": "gzip can compress multiple files in a single command. Each file is compressed separately into its own .gz file.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Compress Multiple Files",
          "snippet": "gzip file1.txt file2.txt file3.txt"
        }
      },
      {
        "title": "9. gzip vs zip Commands: When to Use",
        "content": "The `gzip` and `zip` commands are both used for file compression in Linux, but they differ in functionality, compression method, and usage scenarios.\n\nFeatureGzip\n\nZip\n\n**Compression Algorithm**\n\nUses the DEFLATE algorithm.\n\nUses various compression algorithms, including DEFLATE, LZ77, and others.\n\n**File Format**\n\nTypically appends \".gz\" to compressed files.\n\nUses \".zip\" extension for compressed archives.\n\n**Archiving Approach**\n\nCommon practice is to use tarball (.tar) before compression.\n\nCompresses individual files and then adds them to the archive.\n\n**File Extraction**\n\nRequires decompression of the entire file before extracting specific files.\n\nAllows direct extraction of individual files without full decompression.\n\n**Compression Efficiency**\n\nGenerally offers better compression, especially for a large number of files.\n\nCompression efficiency may vary, and it might be less effective than Gzip for certain scenarios.\n\n**Extraction Time**\n\nTakes longer to extract a specific file from a compressed archive.\n\nAllows quicker extraction of individual files from the archive.\n\n**Ideal Use Case**\n\nWell-suited for compressing a large number of files into a single archive.\n\nSuitable for compressing and archiving individual files with a focus on easy extraction.\n\n**Redundancy Utilization**\n\nEfficiently utilizes redundancy in files to reduce overall file size.\n\nMay result in larger archive sizes, especially when compressing identical files multiple times.\n\nComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: gzip Command: Compressing Files in Linux",
      "initialCode": "gzip mydoc.txt",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: gzip Command: Compressing Files in Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of gzip Command: Compressing Files in Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to gzip Command: Compressing Files in Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "gzip Command: Compressing Files in Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-gunzip": {
    "id": "linux-gunzip",
    "badge": "Module 4 • Linux & Shell",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "gunzip Command: Decompressing .gz Archives",
    "subtitle": "Complete Linux guide to gunzip Command: Decompressing .gz Archives — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The gunzip command in Linux is used to decompress files that were compressed using the gzip command, restoring them to their original form.\n\n- It automatically removes the .gz extension after decompression.\n- Can decompress multiple files at once.\n- Supports options like -k,-f, and -r for flexibility.\n- Useful for extracting logs, backups, and archives compressed with gzip.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for gunzip Command: Decompressing .gz Archives."
        }
      },
      {
        "title": "2. Example: Decompress a Single .gz File",
        "content": "Extracts example.txt.gz and restores it as example.txt, deleting the .gz file after decompression.\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Decompress a Single .gz File",
          "snippet": "gunzip example.txt.gz"
        }
      },
      {
        "title": "3. Syntax",
        "content": "- **gunzip:** Command used to decompress .gz (gzip) compressed files.\n- **[options]:** Optional flags that modify the behavior of the command.\n- **archive_name.gz:** The compressed file to be decompressed.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "gunzip [options] archivename.gz"
        }
      },
      {
        "title": "1. '-c': Write output to standard output (stdout)",
        "content": "Displays decompressed content directly on the terminal instead of saving it. Useful for viewing file content without extracting to disk.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. '-c': Write output to standard output (stdout)",
          "snippet": "gunzip -c geeksforgeeks.txt.tar.gz"
        }
      },
      {
        "title": "2. '-k': Keep original compressed file",
        "content": "Decompresses the .gz file but retains the original file.txt.gz. Handy when you want both compressed and uncompressed versions.\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. '-k': Keep original compressed file",
          "snippet": "gunzip -k example1.txt.gz"
        }
      },
      {
        "title": "3. '-f': Force decompression",
        "content": "Automatically overwrites existing files without prompting for confirmation. Useful in scripts or batch operations where manual confirmation isn’t possible.\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. '-f': Force decompression",
          "snippet": "gunzip -f example1.txt.gz"
        }
      },
      {
        "title": "4. '-r': Recursive decompression",
        "content": "Decompresses all .gz files within the specified directory and its subdirectories. Saves time when handling multiple compressed files in nested folders.\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. '-r': Recursive decompression",
          "snippet": "gunzip -r /home/vboxuser/gfg/"
        }
      },
      {
        "title": "5. '-v': Verbose mode",
        "content": "Displays detailed information while decompressing each file. Helps monitor the progress and confirms which files are being processed.\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. '-v': Verbose mode",
          "snippet": "gunzip -v file1.txt.gz"
        }
      },
      {
        "title": "6. '-t': Test integrity of file",
        "content": "Verifies whether a .gz file is valid and not corrupted. Does not decompress the file; only checks its consistency.\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. '-t': Test integrity of file",
          "snippet": "gunzip -t example2.txt.gz"
        }
      },
      {
        "title": "7. '-l': List compression details",
        "content": "Displays compression statistics like original size, ratio, and name. Useful for checking space savings and compression efficiency.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. '-l': List compression details",
          "snippet": "gunzip -l example2.txt.gz"
        }
      },
      {
        "title": "8. '-h': Display Help",
        "content": "Shows help information and exits. Lists available options for the gunzip command.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. '-h': Display Help",
          "snippet": "gunzip -help"
        }
      },
      {
        "title": "12. Some Other Options:",
        "content": "- **-n**: This option does not save or restore the original name and time stamp while decompressing a file.\n- **-N**: This option saves or restore the original name and time stamp while decompression.\n- **-q**: This option suppresses all the warnings that arise during the execution of the command.\n- **-s**: This option use suffix SUF on compressed files.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: gunzip Command: Decompressing .gz Archives",
      "initialCode": "gunzip example.txt.gz",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: gunzip Command: Decompressing .gz Archives",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of gunzip Command: Decompressing .gz Archives?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to gunzip Command: Decompressing .gz Archives",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "gunzip Command: Decompressing .gz Archives is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-zip-unzip": {
    "id": "linux-zip-unzip",
    "badge": "Module 4 • Linux & Shell",
    "readingTime": "22 min read",
    "level": "Intermediate",
    "title": "zip and unzip Commands in Linux",
    "subtitle": "Complete Linux guide to zip and unzip Commands in Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The zip command is a command-line utility used to compress one or more files or directories into a single .zip archive file. This utility helps optimize disk space, keeps data well organized, and makes it easy to transfer or back up files across multi-platform networks.\n\n- Compresses large files and directories to reduce their storage footprint.\n- Groups multiple files or directory structures into a single file for seamless sharing and backups.\n- Supports native encryption options to protect sensitive archive content with passwords.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for zip and unzip Commands in Linux."
        }
      },
      {
        "title": "2. Syntax of zip Command",
        "content": "The standard syntax of the zip command in Linux is structured as follows:\n\n- **zip:** The base command-line utility used to invoke the compression engine.\n- **[options]:** Optional command-line flags to modify compression behaviours (e.g., recursive, update, or delete).\n- **archive_name.zip:** The target output filename of the compressed archive file.\n- **file1 file2 folder/:** The target files or directory paths to compress and include within the archive.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax of zip Command",
          "snippet": "zip [options] archive_name.zip file1 file2 folder/"
        }
      },
      {
        "title": "3. Basic Compression Examples",
        "content": "To compress multiple individual files into a single ZIP archive, execute the following command:\n\nFile compression output using the default zip command",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Basic Compression Examples",
          "snippet": "zip myfiles.zip file1 file2 file3"
        }
      },
      {
        "title": "4. Commonly Used Options",
        "content": "The zip command offers several operational flags to manage files inside archives directly:"
      },
      {
        "title": "1. -d: Delete a File from Archive",
        "content": "The `-d` option is used to remove a specific file from an existing ZIP archive without extracting and repackaging the archive.\n\nExecuting a delete action inside an archive using the -d option**Note:** If you encounter permission errors when modifying protected archive files, prepend the command with sudo.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -d: Delete a File from Archive",
          "snippet": "zip -d myfile.zip hello7.c"
        }
      },
      {
        "title": "2. -u: Update Archive with New Files",
        "content": "The `-u` option updates an existing ZIP archive by adding new files or replacing files if they are modified. This is highly useful for progressive project archiving.\n\nAdding or updating archive records using the -u option",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -u: Update Archive with New Files",
          "snippet": "zip -u myfile.zip hello9.c"
        }
      },
      {
        "title": "3. -m: Move Files into Archive",
        "content": "The `-m` option compresses specified target files and then deletes them from their original location on disk. It acts as a \"cut and zip\" operation.\n\nUsing the -m option to automatically clear local storage after packaging",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -m: Move Files into Archive",
          "snippet": "zip -m myfile.zip *.c"
        }
      },
      {
        "title": "4. -r: Recursively Zip a Directory",
        "content": "The `-r` option traverses and compresses an entire directory, including all nested subdirectories and files.\n\nRecursively packaging directory structures using the -r option",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -r: Recursively Zip a Directory",
          "snippet": "zip -r myfile.zip jkj_gfg/"
        }
      },
      {
        "title": "5. -x: Exclude Files from Archive",
        "content": "The `-x` option allows you to exclude specific files or extension patterns from being compressed during archive creation.\n\nFiltering specific records out of compression using the -x option",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. -x: Exclude Files from Archive",
          "snippet": "zip -r myfile.zip . -x a.txt"
        }
      },
      {
        "title": "6. -v: Verbose Mode",
        "content": "The `-v` option runs the command in verbose mode, outputting progress bars, diagnostic information, and individual compression ratios.\n\nExecuting verbose commands to check diagnostic details",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. -v: Verbose Mode",
          "snippet": "zip -v myfile.zip b.txt"
        }
      },
      {
        "title": "11. Extraction with unzip Command",
        "content": "The unzip command is used to extract contents from an archive into the target environment.\n\nExtracting a zip archive back into raw files using the unzip commandYou can run the ls command immediately afterward to verify that the extracted files now exist in the target working directory.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Extraction with unzip Command",
          "snippet": "unzip jayesh_gfg.zip"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: zip and unzip Commands in Linux",
      "initialCode": "zip [options] archive_name.zip file1 file2 folder/",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: zip and unzip Commands in Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of zip and unzip Commands in Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to zip and unzip Commands in Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "zip and unzip Commands in Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-bzip2": {
    "id": "linux-bzip2",
    "badge": "Module 4 • Linux & Shell",
    "readingTime": "16 min read",
    "level": "Intermediate",
    "title": "bzip2 High-Compression Archiving Tool",
    "subtitle": "Complete Linux guide to bzip2 High-Compression Archiving Tool — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The bzip2 command is used to compress and decompress files in Linux. It reduces file size by creating compressed .bz2 files, which take less storage than the original files. Uses the Burrows–Wheeler block-sorting algorithm and Huffman coding for compression.\n\n- Replaces the original file with a .bz2 version by default.\n- Slower decompression time and higher memory usage compared to gzip.\n- Can retain the original file using the -k option.\n- Suitable for storage optimization and data transfer.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for bzip2 High-Compression Archiving Tool."
        }
      },
      {
        "title": "2. Example: Compressing a File While Keeping the Original",
        "content": "**Command:**\n\n- **-k:** Keeps the original file intact. Without -k, file1.txt would be removed.**Output:**\n\nCompressing a File While Keeping the Original",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Compressing a File While Keeping the Original",
          "snippet": "​bzip2 -k file1.txt"
        }
      },
      {
        "title": "3. Syntax",
        "content": "- **filenames:** One or more files to compress individually.\n- Compressed files are named <original>.bz2.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "bzip2 [OPTIONS] filenames ..."
        }
      },
      {
        "title": "1. Compress a File (-z Option)",
        "content": "The -z option forces compression, though it is the default action of the bzip2 command. When you run this command, the original file is replaced by the compressed version.\n\n**Command:**\n\n**Output:**\n\nCompress a File",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Compress a File (-z Option)",
          "snippet": "bzip2 -z input.txt"
        }
      },
      {
        "title": "2. Decompress a File (-d Option)",
        "content": "The -d option is used for decompressing files that were previously compressed using bzip2.\n\n**Command:**\n\n**Output:**\n\nDecompress a File",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Decompress a File (-d Option)",
          "snippet": "bzip2 -d input.txt.bz2"
        }
      },
      {
        "title": "3. Integrity Check (-t Option)",
        "content": "If you want to check whether a .bz2 file is corrupted without decompressing it, the -t option comes in handy. It checks the integrity of the file and informs you if it's corrupted.\n\n**Command:**\n\n**Output:**\n\nIntegrity Check",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Integrity Check (-t Option)",
          "snippet": "bzip2 -t input.txt.bz2"
        }
      },
      {
        "title": "4. Verbose Mode (-v Option)",
        "content": "The -v option enables verbose mode, where the command shows additional information, such as compression ratios and other diagnostics, during the compression process.\n\n**Command:**\n\n**Output:**\n\nVerbose Mode",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Verbose Mode (-v Option)",
          "snippet": "bzip2 -v input.txt"
        }
      },
      {
        "title": "8. Other Available Options",
        "content": "OptionDescription-h, --helpDisplays the help message and exits.-L, --licenseDisplays the software version, license terms, and conditions.-V, --versionDisplays the software version and exits.-q, --quietSuppresses non-essential warning messages. Critical messages like I/O errors are still displayed.-f, --forceForces overwriting of output files without confirmation.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: bzip2 High-Compression Archiving Tool",
      "initialCode": "​bzip2 -k file1.txt",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: bzip2 High-Compression Archiving Tool",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of bzip2 High-Compression Archiving Tool?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to bzip2 High-Compression Archiving Tool",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "bzip2 High-Compression Archiving Tool is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-xz": {
    "id": "linux-xz",
    "badge": "Module 4 • Linux & Shell",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "xz Lossless Data Compression Tool",
    "subtitle": "Complete Linux guide to xz Lossless Data Compression Tool — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- XZ is a data compression tool in Linux that helps reduce the size of files using the efficient LZMA2 compression algorithm. It is commonly used to save space or for distributing software packages.\n\n- Achieves high compression ratios (smaller file sizes).\n- Useful for saving disk space and archiving large files.\n- Supports both compression and decompression.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for xz Lossless Data Compression Tool."
        }
      },
      {
        "title": "2. Example: Compressing a file",
        "content": "The following command is used to compress the example.txt to example.txt.xz\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Compressing a file",
          "snippet": "xz example.txt"
        }
      },
      {
        "title": "3. Syntax:",
        "content": "- **xz:** The command used for compression or decompression.\n- **[options]:** Flags or parameters that modify the command’s behavior (e.g., -d, -k, -v).\n- **[file_name]:** The name of the file you want to compress or decompress.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax:",
          "snippet": "xz [options] file_name"
        }
      },
      {
        "title": "4. Examples of xz Command",
        "content": "Here are some practical examples of using the xz command with different options in Linux."
      },
      {
        "title": "1. Compressing files using xz",
        "content": "Compression can be performed by specifying the file name directly with the xz command:\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Compressing files using xz",
          "snippet": "xz filename"
        }
      },
      {
        "title": "2. Decompressing Files Using xz",
        "content": "Compressed .xz files can be decompressed using either of the following methods:\n\n**Method 1: Using the -d Option**\n\nThe -d (decompress) option with the xz command can be used to decompress the file\n\n**Command:**\n\n**Output:**\n\n**Method 2: Using the unxz Command**\n\nThe unxz command can be used to decompress the file:\n\n**Command:**\n\n**Output:**\n\nAfter decompression the .xz file is replaced with the original uncompressed file. By default, the compressed file is removed once extraction is complete.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Decompressing Files Using xz",
          "snippet": "xz -d filename.xz"
        }
      },
      {
        "title": "3. Creating a Compressed File Without Deleting the Original File Using xz",
        "content": "By default, the xz command removes the original file after compression. To retain the original file, use the -k (keep) option.\n\n**Command:**\n\n**Output:**\n\n- We can see that in the above image that the original file size is 70 MB and the size of the compressed file is 69MB.\n- We can see that there is no significant difference in the size of the original file and compressed file. But what if we want more small compressed file? Let's see how to can we do that.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Creating a Compressed File Without Deleting the Original File Using xz",
          "snippet": "xz -k filename"
        }
      },
      {
        "title": "4. Controlling the Compression Level in xz",
        "content": "The xz utility allows control over the compression level to balance speed and compression ratio. Compression levels range from 0 to 9, with the default level set to 6.\n\n- **Level 0 (--fast):** Provides the fastest compression with a lower compression ratio.\n- **Levels 1–8:** Offer a balance between speed and compression efficiency.\n- **Level 9 (--best):** Produces maximum compression but requires more time and system resources.**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Controlling the Compression Level in xz",
          "snippet": "xz -8 filename"
        }
      },
      {
        "title": "5. Reducing RAM Usage in xz",
        "content": "The xz utility provides the --memlimit-compress option to limit memory usage during compression. This is particularly useful when working on systems with limited RAM. The --memlimit-compress option allows you to specify the maximum amount of memory that xz can use, either as a percentage of total system RAM or as a fixed size.\n\n**Command:**\n\n- xz is restricted to using 20% of the total system memory for compression.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Reducing RAM Usage in xz",
          "snippet": "xz --memlimit-compress=20% filename"
        }
      },
      {
        "title": "6. Monitoring Progress During Compression and Decompression",
        "content": "The xz utility provides a verbose mode to monitor the progress of compression or decompression operations. This can be enabled using the -v option.\n\n**Command:**\n\n**Output:**\n\nFor more detailed information about the xz utility and its options, you can consult the manual page. This will display the complete documentation for xz, including advanced options and usage examples.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Monitoring Progress During Compression and Decompression",
          "snippet": "xz -v filename"
        }
      },
      {
        "title": "11. Difference between tar xz and zip",
        "content": "The following are the differences between tar xz and zip tools:\n\nFeaturetar xzzip**Compression Algorithm**It uses `xz` (LZMA2 algorithm)It uses `deflate` algorithm**File Handling**it combines multiple files into a single archive before compressingIt compresses files individually within a single archive**Compression Ratio**it generally offers higher compression ratiosTypically lower compression ratios compared to `xz`**Compatibility**Commonly used in Unix/Linux environments; requires additional tools on WindowsIt is widely supported across all major operating systems including Windows, macOS, and Linux**File Extension**It commonly results in `.tar.xz` filesIt results in `.zip` files"
      },
      {
        "title": "12. Use Cases of XZ Command",
        "content": "- **Archiving Log Files:** It useful for compressing the large files to save the disk space.\n- **Distributing Software Packages:** It used for reducing download times and bandwidth usage by compressing the software packages.\n- **Backup and Restore:** It useful for minimizing the storage needs and to improve the transfer speeds for backups.\n- **Embedded Systems:** It is helps for optimizing the storage and performance by compressing the firmware and application files.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: xz Lossless Data Compression Tool",
      "initialCode": "xz example.txt",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: xz Lossless Data Compression Tool",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of xz Lossless Data Compression Tool?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to xz Lossless Data Compression Tool",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "xz Lossless Data Compression Tool is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-pkg-overview": {
    "id": "linux-pkg-overview",
    "badge": "Module 5 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Understanding Package Managers & Repositories",
    "subtitle": "Complete Linux guide to Understanding Package Managers & Repositories — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Package managers and systemctl are essential tools in Linux used to manage software and control system services. Together, they help users install applications, handle dependencies and start, stop or monitor services efficiently.\n\n- Installs software packages along with required dependencies.\n- Automatically detects and installs needed packages.\n- Update software to newer versions for security and stability.\n- Safely uninstalls software and removes unused dependencies.\n- Shows all installed packages, updates and package details.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Understanding Package Managers & Repositories."
        }
      },
      {
        "title": "2. Package Manager Architecture",
        "content": "A package manager interacts with the user system, repositories, packages, metadata and dependencies to install and manage software.\n\nPackage Manager Working"
      },
      {
        "title": "1. User System",
        "content": "The user system is where commands are executed by the user.\n\n- The user runs commands like apt install, yum install or dnf install.\n- Requests are sent to the package manager for software installation or updates."
      },
      {
        "title": "2. Package Manager",
        "content": "The package manager acts as the central controller.\n\n- It processes user commands and communicates with repositories.\n- It manages installation, updates, removal and dependency handling.\n- **Examples:** apt, dnf, pacman, zypper"
      },
      {
        "title": "3. Repository",
        "content": "A repository is a remote or local storage location that contains software packages.\n\n- Stores packages and their related metadata.\n- The package manager fetches required data from repositories.\n- **Examples:** Ubuntu repositories, Red Hat repositories."
      },
      {
        "title": "4. Metadata",
        "content": "Metadata contains information about the packages.\n\n- Includes package name, version, size, dependencies and description.\n- Helps the package manager decide which packages and dependencies are required."
      },
      {
        "title": "5. Packages",
        "content": "Packages are the actual software files.\n\n- Contain application binaries, configuration files and documentation.\n- Downloaded and installed on the user system.\n- **Examples: **nginx, apache2, vim."
      },
      {
        "title": "6. Package Dependencies",
        "content": "Dependencies are additional packages required for software to work properly.\n\n- Some software depends on libraries or other tools\n- The package manager automatically installs these dependencies"
      },
      {
        "title": "1. APT (Advanced Package Tool)",
        "content": "APT (Advanced Package Tool) is a powerful and widely used package manager in the Linux world. It's the default package manager for Debian-based distributions, including Debian itself, Ubuntu and Linux Mint.\n\n- **Repository Management: **APT connects to online repositories where software packages are hosted. Users can configure which repositories to use, allowing them to install software from official sources.\n- **Package Management: **It allows users to manage packages on the system, including installation, upgrading, downgrading and removal.\n- **Cache Management:** APT maintains a local cache of package information. This cache helps in faster package searches and updates. Users can update this cache using the apt update command."
      },
      {
        "title": "10. Basic commands in APT",
        "content": "1. Installing a package:\n\n2. Updating the package list:\n\n3. Upgrading packages:\n\n4. Removing a package:\n\n5. Searching for packages:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Basic commands in APT",
          "snippet": "sudo apt install package-name"
        }
      },
      {
        "title": "2. DNF (Dandified YUM) Package Manager",
        "content": "DNF is the successor to YUM and is now the recommended package manager for Red Hat based distributions. It provides a more modern and user-friendly experience. The syntax and commands for dnf are similar to yum.\n\n- **Dependency Resolution:** DNF automatically resolves dependencies while installing or updating packages, ensuring all required libraries and components are installed without conflicts.\n- **Improved Performance:** Compared to YUM, DNF uses optimized algorithms and better memory handling, making package operations faster and more efficient.\n- **Repository Management:** DNF connects to configured repositories to fetch and install packages. Users can easily enable, disable and manage repositories.\n- **Automatic Updates Support:** DNF supports automatic updates, allowing systems to stay up-to-date with minimal manual intervention.\n- **Plugin Support:** DNF supports plugins that extend its functionality, such as version locking, system upgrades and additional repository tools."
      },
      {
        "title": "12. Basic commands in DNF",
        "content": "1. Installing a package:\n\n2. Updating packages**: **\n\n3. removing packages**: **\n\n4. searching for a package**: **",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Basic commands in DNF",
          "snippet": "sudo dnf install <package-name>"
        }
      },
      {
        "title": "3. Pacman",
        "content": "Pacman is the package manager used in Arch Linux and its derivatives, such as Manjaro. Arch Linux is known for its simplicity, flexibility and rolling-release model and Pacman is a vital component that makes managing software on Arch-based systems efficient.\n\n- **Simplicity and Transparency: **It doesn't hide the details and allows users to understand precisely what's happening during package installation, upgrade and removal.\n- **Rolling Release:** Pacman plays a crucial role in keeping the system up-to-date with the latest software versions.\n- **User-Managed Configuration:** It provides options to save, overwrite or merge configuration files during package upgrades, ensuring that the system stays tailored to the user's preferences.\n- **AUR Support:** The Arch User Repository (AUR) is a community-driven repository for additional software not available in the official repositories."
      },
      {
        "title": "14. Basic commands in Pacman",
        "content": "1. Installing a package:\n\n2. Updating the package list and upgrading packages:\n\n3. Removing a package:\n\n4. Querying package information:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Basic commands in Pacman",
          "snippet": "sudo pacman -S package-name"
        }
      },
      {
        "title": "4. Zypper",
        "content": "Zypper is the default package manager used in openSUSE and its derivatives. It plays a critical role in managing software packages on these Linux distributions. Zypper is known for its efficiency and robust dependency resolution capabilities.\n\n- **Repository Management:** Zypper interacts with software repositories, making it easy to fetch and install packages. openSUSE provides a wide range of official and community repositories, giving users access to a vast selection of software.\n- **Package Management:** Zypper offers a range of package management commands, including installation, upgrading, downgrading and removal. It provides users with control over their software packages.\n- **Transaction Safety:** Zypper is designed with a focus on transaction safety. This means it will attempt to maintain a consistent system state by either completing a transaction successfully or rolling back changes in the event of an error, avoiding a partially updated system."
      },
      {
        "title": "16. Basic commands in Zypper",
        "content": "1. Installing a package:\n\n2. Updating packages:\n\n3. Removing a package:\n\n4. Searching for packages:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 16. Basic commands in Zypper",
          "snippet": "sudo zypper in package-name"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Understanding Package Managers & Repositories",
      "initialCode": "sudo apt install package-name",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Understanding Package Managers & Repositories",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Understanding Package Managers & Repositories?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Understanding Package Managers & Repositories",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Understanding Package Managers & Repositories is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-apt-get": {
    "id": "linux-apt-get",
    "badge": "Module 5 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "apt-get & apt Package Manager (Debian/Ubuntu)",
    "subtitle": "Complete Linux guide to apt-get & apt Package Manager (Debian/Ubuntu) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The apt-get command is a command-line package management tool used in Debian-based Linux distributions such as Ubuntu and Debian. It allows users to install, update, upgrade and remove software packages easily by fetching them from configured repositories.\n\n- Used to manage software packages from the terminal\n- Automatically handles package dependencies\n- Works with online repositories and local packages\n- Essential tool for system administrators and Linux users",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for apt-get & apt Package Manager (Debian/Ubuntu)."
        }
      },
      {
        "title": "1. Update Package Index",
        "content": "This command updates the local package list from the configured repositories. It does not install or upgrade any software but ensures the system has the latest package information.\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Update Package Index",
          "snippet": "sudo apt-get update"
        }
      },
      {
        "title": "2. Upgrade Installed Packages",
        "content": "This command upgrades all installed packages to their latest available versions. An update should be performed before running this command.\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Upgrade Installed Packages",
          "snippet": "sudo apt-get upgrade"
        }
      },
      {
        "title": "3. Dselect Upgrade",
        "content": "This command upgrades the system based on selections made using the dselect tool. It installs and removes packages according to those selections.\n\n**Command:**\n\n**Output:**\n\nOutput**NOTE : **dselect-upgrade is Rarely used in practice; mainly for legacy dselect tool",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Dselect Upgrade",
          "snippet": "sudo apt-get dselect-upgrade"
        }
      },
      {
        "title": "4. Distribution Upgrade",
        "content": "This command performs an advanced upgrade. It handles changing dependencies and may install or remove packages to complete the upgrade.\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Distribution Upgrade",
          "snippet": "sudo apt-get dist-upgrade"
        }
      },
      {
        "title": "5. Install Packages",
        "content": "This command installs one or more packages and automatically installs their dependencies.\n\n**Command:**\n\n**Note**: You can also specify package versions or target distributions, but this should be done carefully as it may downgrade packages.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Install Packages",
          "snippet": "sudo apt-get install vim"
        }
      },
      {
        "title": "6. Reinstall Packages",
        "content": "This command reinstalls a package that is already installed, restoring it to its default state.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Reinstall Packages",
          "snippet": "sudo apt-get install --reinstall firefox"
        }
      },
      {
        "title": "7. Remove Packages",
        "content": "This command removes a package but keeps its configuration files.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Remove Packages",
          "snippet": "sudo apt-get remove vim"
        }
      },
      {
        "title": "8. Purge Packages",
        "content": "This command removes a package along with its configuration files.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Purge Packages",
          "snippet": "sudo apt-get purge vim"
        }
      },
      {
        "title": "9. Check for Broken Dependencies",
        "content": "This command checks the system for broken dependencies and looks for inconsistencies in the package system.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Check for Broken Dependencies",
          "snippet": "sudo apt-get check"
        }
      },
      {
        "title": "10. Download Packages",
        "content": "This command downloads a package without installing it.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Download Packages",
          "snippet": "sudo apt-get download firefox"
        }
      },
      {
        "title": "11. Clean Package Cache",
        "content": "This command removes all downloaded package files stored in the local cache.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Clean Package Cache",
          "snippet": "sudo apt-get clean"
        }
      },
      {
        "title": "12. Remove Unused Dependencies",
        "content": "This command removes packages that were installed automatically as dependencies and are no longer needed.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Remove Unused Dependencies",
          "snippet": "sudo apt-get autoremove"
        }
      },
      {
        "title": "13. Download Source Code",
        "content": "This command downloads the source code of a package in tarball format.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Download Source Code",
          "snippet": "sudo apt-get source firefox"
        }
      },
      {
        "title": "14. Show Package Information",
        "content": "This command displays detailed information about a package, including version, dependencies, and description.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Show Package Information",
          "snippet": "sudo apt-get show firefox"
        }
      },
      {
        "title": "16. Syntax",
        "content": "- **sudo: **The sudo command is used to execute apt-get with administrative (root) privileges. Since package management involves system-level changes, administrative access is required.\n- **apt-get: **The package management command itself.\n- **[options]:** Options modify the behavior of the command. For example, -y automatically answers “yes” to prompts, and -s simulates the operation without making changes.\n- **[package(s)]:** Specifies the package name or names to be installed, removed, or upgraded. Multiple packages can be specified by separating them with spaces.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 16. Syntax",
          "snippet": "sudo apt-get [options] [command] [package(s)]"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: apt-get & apt Package Manager (Debian/Ubuntu)",
      "initialCode": "sudo apt-get update",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: apt-get & apt Package Manager (Debian/Ubuntu)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of apt-get & apt Package Manager (Debian/Ubuntu)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to apt-get & apt Package Manager (Debian/Ubuntu)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "apt-get & apt Package Manager (Debian/Ubuntu) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-dpkg": {
    "id": "linux-dpkg",
    "badge": "Module 5 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "dpkg: Low-Level Debian Package Manager",
    "subtitle": "Complete Linux guide to dpkg: Low-Level Debian Package Manager — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Debian Software Package Management(dpkg) is the low-level package management system used in Debian-based Linux operating systems. It installs, removes, configures, and manages software packages in the .deb format without handling dependencies automatically.\n\n- Command-line tool for managing Debian (.deb) packages.\n- Installs and configures software directly on the filesystem.\n- Maintains a local database of installed packages.\n- Acts as the backend for higher-level tools like apt.**Example: **Listing the debian packages\n\nThis command displays a list of all installed Debian packages on the system.\n\n**Output:**",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for dpkg: Low-Level Debian Package Manager."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **options: **optional tags that modify the behavior of dpkg.\n- **action:** specifies what dpkg should do.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax",
          "snippet": "dpkg [options] action"
        }
      },
      {
        "title": "1. Low-Level Package Control",
        "content": "- Directly installs, removes, and configures .deb packages.\n- Provides fine-grained control over individual package operations."
      },
      {
        "title": "2. Package Database Management",
        "content": "- Maintains a local record of installed packages.\n- Tracks the current state of each package on the system."
      },
      {
        "title": "3. System-Level Operation",
        "content": "- Interacts directly with the Linux filesystem.\n- Manages package-related configuration files and scripts."
      },
      {
        "title": "4. Backend for Higher-Level Tools",
        "content": "- Acts as the core engine for apt and similar tools.\n- Executes actual package installation and removal tasks."
      },
      {
        "title": "1. Installing a standalone package",
        "content": "To install a package, -i flag is used. To install a standalone package using the Debian package.\n\n**Syntax:**\n\n**Command:**\n\nThis command installs a standalone .deb package for Atom, an open-source text editor.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Installing a standalone package",
          "snippet": "sudo dpkg -i name_of_package.deb"
        }
      },
      {
        "title": "2. Removing a package",
        "content": "To remove a package, the -r flag is used with the dpkg command.\n\n**Syntax:**\n\n**Command:**\n\nThis command is used to remove the Atom text editor package from the system while keeping its configuration files intact.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Removing a package",
          "snippet": "sudo dpkg -r name_of_package"
        }
      },
      {
        "title": "3. Purging a Package",
        "content": "The -P (purge) flag removes the package along with all configuration files.\n\n**Command:**\n\nThis command completely removes the package and its configuration files from the system.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Purging a Package",
          "snippet": "sudo dpkg -P googler"
        }
      },
      {
        "title": "4. Finding a Specific Installed Package",
        "content": "To search for a particular package, the output of dpkg -l can be filtered using the grep command.\n\n**Command:**\n\nThis command displays information only about the specified package if it is installed on the system.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Finding a Specific Installed Package",
          "snippet": "dpkg -l | grep atom"
        }
      },
      {
        "title": "5. Listing All Available dpkg Commands",
        "content": "To list all available options and commands supported by dpkg, the --help option is used.\n\n**Command:**\n\nThis command displays a help menu containing all available dpkg commands and options.\n\n**Output:**\n\n- a few more options of dpkg:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Listing All Available dpkg Commands",
          "snippet": "dpkg -–help"
        }
      },
      {
        "title": "6. View the content of a particular package",
        "content": "To view the content of the particular package -c flag is used\n\n**Command:**\n\nThis command lists all files that will be installed by the specified Debian package.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. View the content of a particular package",
          "snippet": "dpkg -c flashplugin-nonfree_3.2_i386.deb"
        }
      },
      {
        "title": "7. Printing the System Architecture",
        "content": "The --print-architecture option displays the system architecture\n\n**Command:**\n\nThis command outputs the system architecture, such as amd64, i386, or arm64.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Printing the System Architecture",
          "snippet": "dpkg --print-architecture"
        }
      },
      {
        "title": "8. Unpacking a Package",
        "content": "To unpack a package without configuring it, the --unpack flag is used.\n\n**Command:**\n\nThis command extracts the package files but does not configure the package.\n\n**Output:**\n\n- To configure it later:**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Unpacking a Package",
          "snippet": "dpkg --unpack flashplugin-nonfree_3.2_i386.deb"
        }
      },
      {
        "title": "9. Checking Whether a Package Is Installed",
        "content": "To check if a particular package is installed or not -s flag is used.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Checking Whether a Package Is Installed",
          "snippet": "dpkg -s git"
        }
      },
      {
        "title": "10. Reconfigure the installed package",
        "content": "To reconfigure the already installed package dpkg-reconfigure command is used\n\n**Command:**\n\nThis command re-runs the configuration process for the specified package.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Reconfigure the installed package",
          "snippet": "dpkg-reconfigure [package-name]"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: dpkg: Low-Level Debian Package Manager",
      "initialCode": "dpkg [options] action",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: dpkg: Low-Level Debian Package Manager",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of dpkg: Low-Level Debian Package Manager?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to dpkg: Low-Level Debian Package Manager",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "dpkg: Low-Level Debian Package Manager is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-dnf": {
    "id": "linux-dnf",
    "badge": "Module 5 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "dnf Package Manager (Fedora & RHEL 8+)",
    "subtitle": "Complete Linux guide to dnf Package Manager (Fedora & RHEL 8+) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- DNF (Dandified YUM) is the default package manager used in Fedora to install, update, remove and manage software packages. RPM installs local packages and does not resolve dependencies automatically and dependency handling is done by DNF.\n\n- DNF provides a command-line interface to manage RPM packages efficiently in Fedora-based Linux distributions.\n- It improves performance and dependency handling compared to older tools like YUM.\n- DNF supports features such as package groups, repositories, and transaction history.\n- It helps keep the system secure and up to date by managing software updates and patches.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for dnf Package Manager (Fedora & RHEL 8+)."
        }
      },
      {
        "title": "2. Example: Searching for Packages",
        "content": "To search for a package, you need to Use the dnf search command with the package that you want and it will show you all available packages matching that query:\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Searching for Packages",
          "snippet": "dnf search vlc"
        }
      },
      {
        "title": "3. DNF vs RPM",
        "content": "RPM is the low-level package management system used in Fedora, while DNF works on top of RPM.\n\n- RPM installs local packages but does not resolve dependencies automatically\n- DNF automatically finds, installs, and manages dependencies\n- Fedora documentation recommends DNF over direct RPM usage\n- RPM acts as the backend engine, while DNF is the user-facing tool"
      },
      {
        "title": "1. High-Level Package Management",
        "content": "- Installs, removes, updates, and reinstalls packages easily\n- Handles dependency resolution automatically"
      },
      {
        "title": "2. Repository Management",
        "content": "- Uses online repositories to fetch packages\n- Supports official and third-party repositories"
      },
      {
        "title": "3. Transaction History",
        "content": "- Maintains a history of package operations\n- Allows tracking and rollback of changes"
      },
      {
        "title": "4. Security and Updates",
        "content": "- Applies security patches and system updates\n- Keeps the system stable and up to date"
      },
      {
        "title": "8. Syntax",
        "content": "- **options:** Modify the behavior of the command\n- **COMMAND:** Specifies the action DNF should perform",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Syntax",
          "snippet": "dnf [options] COMMAND"
        }
      },
      {
        "title": "1. Installing Packages",
        "content": "To install software packages from repositories, the install command is used. This command requires sudo privileges.\n\n**Command:**\n\nusing DNF to install one package**Command**: To install multiple packages\n\n**Output:**\n\nInstalling multiple packages using DNF",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Installing Packages",
          "snippet": "sudo dnf install package_name"
        }
      },
      {
        "title": "2. Upgrading Packages and System",
        "content": "To update all installed packages along with the system, the upgrade command is used.\n\n**Command:**\n\n**Output:**\n\nUpgrading using DNF",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Upgrading Packages and System",
          "snippet": "sudo dnf upgrade"
        }
      },
      {
        "title": "3. Upgrading a Specific Package",
        "content": "To update a single package:\n\n**Command:**\n\n**Output:**\n\nUpgrading individual package using DNF",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Upgrading a Specific Package",
          "snippet": "sudo dnf upgrade firefox.x86_64"
        }
      },
      {
        "title": "4. Listing Available Updates",
        "content": "To check available updates without installing them:\n\n**Command:**\n\n**Output:**\n\nChecking for updates using DNF",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Listing Available Updates",
          "snippet": "dnf check-update"
        }
      },
      {
        "title": "5. Removing a Package",
        "content": "To uninstall a package from the system, the remove command is used.\n\n**Output:**\n\nRemoving packages using DNF",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Removing a Package",
          "snippet": "sudo dnf remove firefox.x86_64"
        }
      },
      {
        "title": "6. Removing Multiple Packages",
        "content": "To remove more than one package:\n\n**Syntax:**\n\n**Output:**\n\nRemoving multiple packages using DNF",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Removing Multiple Packages",
          "snippet": "sudo dnf remove package1 package2 package3"
        }
      },
      {
        "title": "7. Removing Unused Dependencies",
        "content": "To clean up unused dependencies left after package removal:\n\n**Command:**\n\n**Output:**\n\nAuto-removing leftover dependencies using DNF",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Removing Unused Dependencies",
          "snippet": "sudo dnf autoremove"
        }
      },
      {
        "title": "8. Reinstalling a Package",
        "content": "If a package is corrupted or not functioning properly, it can be reinstalled.\n\n**Command:**\n\n**Output:**\n\nReinstalling using DNF",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Reinstalling a Package",
          "snippet": "sudo dnf reinstall firefox.x86_64"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: dnf Package Manager (Fedora & RHEL 8+)",
      "initialCode": "dnf search vlc",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: dnf Package Manager (Fedora & RHEL 8+)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of dnf Package Manager (Fedora & RHEL 8+)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to dnf Package Manager (Fedora & RHEL 8+)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "dnf Package Manager (Fedora & RHEL 8+) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-yum": {
    "id": "linux-yum",
    "badge": "Module 5 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "yum Package Manager (CentOS & RHEL)",
    "subtitle": "Complete Linux guide to yum Package Manager (CentOS & RHEL) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux YUM Package Management is a package management system used on older RPM-based Linux distributions to install, update, remove, and manage software packages efficiently. It automatically resolves dependencies and simplifies software maintenance on Linux systems.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for yum Package Manager (CentOS & RHEL)."
        }
      },
      {
        "title": "2. Syntax of YUM",
        "content": "Here,\n\n- **[options]** are optional flags that modify the behaviour of the command.\n- **[command]** is the YUM operation you want to perform (e.g., install, update, remove).\n- **[package(s)]** specify the package(s) you want to work with.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax of YUM",
          "snippet": "yum [options] [command] [package(s)]"
        }
      },
      {
        "title": "3. Installing and Managing a Package Using YUM",
        "content": "Suppose you want to install a web server package on an RPM-based Linux system."
      },
      {
        "title": "4. Step 1: Search for a Package",
        "content": "Before installing, you can check whether the package is available:\n\nThis searches the configured repositories for the Apache web server package.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step 1: Search for a Package",
          "snippet": "yum search httpd"
        }
      },
      {
        "title": "5. Step 2: Install the Package",
        "content": "To install the package along with all required dependencies:\n\nYUM automatically downloads and installs the package and its dependencies.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Step 2: Install the Package",
          "snippet": "yum install httpd"
        }
      },
      {
        "title": "6. Step 3: Verify Installation",
        "content": "After installation, you can confirm that the package is installed:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Step 3: Verify Installation",
          "snippet": "yum list installed httpd"
        }
      },
      {
        "title": "7. Step 4: Update the Package",
        "content": "To update the installed package to the latest version:\n\nThis ensures security patches and bug fixes are applied.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Step 4: Update the Package",
          "snippet": "yum update httpd"
        }
      },
      {
        "title": "8. Working of YUM",
        "content": "YUM works as an automated package manager that installs, updates, and removes software on RPM-based Linux systems by communicating with software repositories.\n\n- **User Requests an Action: **The user initiates an operation such as install, update, or remove a package using YUM.\n- **Repository Check:** YUM reads repository configuration files and contacts enabled repositories to fetch package metadata.\n- **Dependency Resolution:** YUM automatically identifies all required dependencies for the requested package.\n- **Package Download:** Required RPM packages and dependencies are downloaded from the repository.\n- **Installation or Update: **Packages are installed or updated in the correct order to avoid conflicts.\n- **Database Update: **YUM updates the local RPM database to keep track of installed software."
      },
      {
        "title": "1. Installing Packages",
        "content": "This command is used to install packages on your system using YUM. Replace package-name with the name of the package you want to install. YUM will automatically handle dependencies and download the necessary files from repositories.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nInstalling Packages",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Installing Packages",
          "snippet": "sudo yum install package-name"
        }
      },
      {
        "title": "2. Updating Packages",
        "content": "This command updates all installed packages to their latest available versions.\n\n**Command:**\n\n**Output:**\n\nUpdating Packages",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Updating Packages",
          "snippet": "sudo yum update"
        }
      },
      {
        "title": "3. Removing Packages",
        "content": "Use this command to remove an installed package.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nRemoving Packages",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Removing Packages",
          "snippet": "sudo yum remove package-name"
        }
      },
      {
        "title": "4. Searching for Packages",
        "content": "This command searches for packages using a keyword.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nSearching for Packages",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Searching for Packages",
          "snippet": "yum search keyword"
        }
      },
      {
        "title": "5. Listing Installed Packages",
        "content": "This command lists all packages currently installed on the system.\n\n**Command:**\n\n**Output:**\n\nListing Installed Packages",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Listing Installed Packages",
          "snippet": "yum list installed"
        }
      },
      {
        "title": "6. Display Package Information",
        "content": "Use this command to get detailed information about a specific package, including its description, version, dependencies, and more.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nDisplay Package Information",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Display Package Information",
          "snippet": "yum info package-name"
        }
      },
      {
        "title": "7. Cleaning YUM Cache",
        "content": "Over time, YUM accumulates cache data that can take up disk space. Running this command clears the YUM cache, helping to free up space on your system.\n\n**Command:**\n\n**Output:**\n\nCleaning YUM Cache",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Cleaning YUM Cache",
          "snippet": "sudo yum clean all"
        }
      },
      {
        "title": "8. Enabling and Disabling Repositories",
        "content": "YUM uses repositories to fetch packages. You can enable or disable specific repositories as needed, allowing you to control which packages are available for installation or updates.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Enabling and Disabling Repositories",
          "snippet": "sudo yum-config-manager --enable repository"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: yum Package Manager (CentOS & RHEL)",
      "initialCode": "yum [options] [command] [package(s)]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: yum Package Manager (CentOS & RHEL)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of yum Package Manager (CentOS & RHEL)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to yum Package Manager (CentOS & RHEL)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "yum Package Manager (CentOS & RHEL) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-user-mgmt": {
    "id": "linux-user-mgmt",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "User Management in Linux (/etc/passwd & /etc/shadow)",
    "subtitle": "Complete Linux guide to User Management in Linux (/etc/passwd & /etc/shadow) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- User management is a core function of Linux system administration. Linux supports multi-user environments, making it ideal for everything from personal laptops to large enterprise systems. Efficient user management:\n\n- Secures the system from unauthorized access.\n- Ensures users can perform their roles without interfering with others.\n- Helps in auditing and tracking user activity.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for User Management in Linux (/etc/passwd & /etc/shadow)."
        }
      },
      {
        "title": "2. Understanding Linux User IDs (UIDs)",
        "content": "Linux systems typically support up to 1,000+ users, making them suitable for large-scale use.\n\nUser - IDsAdmins manage users by creating, modifying and deleting accounts, setting permissions and enforcing access policies. This ensures users can perform tasks without compromising system integrity."
      },
      {
        "title": "3. Types of Users in Linux",
        "content": "Linux is a multi-user operating system, meaning multiple users can access and operate the system simultaneously. Each user type serves a specific purpose and has different levels of access and control. Below are the main types of users you will encounter in Linux:\n\n- **Root (Superuser): **Full system control. Can install software, change config files and delete anything. Powerful but risky.\n- **Regular User:** Limited access. Can create files, run applications, but not modify system-level settings.\n- **Sudo User: **Regular user with temporary admin rights via the sudo command. Common in modern systems.\n- **System/Service Account: **Non-human accounts used by services (e.g., mysql, nginx). Limited privileges.\n- **Guest User: **Temporary users with minimal privileges. Changes are not saved after logout. (desktop environment specific)"
      },
      {
        "title": "4. User Groups",
        "content": "A user group is a collection of users. If you give permission to a group, all users in that group get the same access. This makes it easier to manage file and system permissions for many users at once."
      },
      {
        "title": "1. Primary Group (Default for files)",
        "content": "- Every Linux user is assigned one primary group.\n- When a user creates a file, the group ownership of that file is automatically set to their primary group.\n- By default, this group usually has the same name as the user.\n- It helps manage file ownership cleanly without much extra configuration.**Example: **Check Primary Group\n\n**Output:**\n\nOutputHere, gid=1000(raj) means the primary group of user raj is raj."
      },
      {
        "title": "2. Secondary Group(Additional Permissions)",
        "content": "- A user can be a part of multiple secondary groups.\n- These groups provide extra access to files, folders or services.\n- They are commonly used for team-based access or system-level permissions (e.g., accessing Docker, video devices or running sudo).**Example: **Add User to a Secondary Group. This adds raj to the developers group.\n\n**Check Group Memberships:**\n\n**Output:**\n\nOutputThis shows that user raj is part of two groups:\n\n- **Primary: **raj\n- **Secondary:** developers",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Secondary Group(Additional Permissions)",
          "snippet": "sudo usermod -aG developers raj"
        }
      },
      {
        "title": "7. User Management Files",
        "content": "These files are essential for managing users, groups and permissions on a Linux system and they play a key role in ensuring security and efficient system administration.\n\nUser management files in linuxThe following are different user management files in linux:"
      },
      {
        "title": "1. User Information",
        "content": "**/etc/passwd: **Stores basic details of all user accounts including:\n\n- Username\n- User ID (UID)\n- Primary Group ID (GID)\n- Home directory\n- Default shell\n- Full name of the user**/etc/shadow: **Stores encrypted user passwords and password-related settings:\n\n- Encrypted passwords\n- Last password change date\n- Password expiration and inactivity rules\n- Account expiration settings"
      },
      {
        "title": "2. Group Management",
        "content": "**/etc/group: **Defines all groups in the system and user memberships:\n\n- Group name\n- Group ID (GID)\n- List of users in each group**/etc/gshadow:** Secure counterpart to /etc/group, storing:\n\n- Encrypted group passwords\n- Group administrators\n- Group members"
      },
      {
        "title": "3. Privilege Control",
        "content": "**/etc/sudoers:** Manages sudo access for users and groups:\n\n- Who can use the sudo command\n- What commands they can run\n- From which terminals/systems"
      },
      {
        "title": "4. User Home Directory Setup",
        "content": "**/etc/skel/:** Directory containing default configuration files copied to a new user’s home directory:\n\n- Typically includes .bashrc, .profile, etc.\n- Used to provide default shell settings and environment"
      },
      {
        "title": "5. Logs and Auditing",
        "content": "**/var/log/auth.log: **Records authentication-related events:\n\n- Successful and failed login attempts\n- Usage of the sudo command\n- Account lock and unlock events\n- Other security-related activities**Note:**\n\n- On Debian-based systems (Kali, Ubuntu), authentication logs are in /var/log/auth.log\n- On RHEL/CentOS/Fedora systems, they are stored in /var/log/secure\n- On modern systemd systems, logs can also be viewed using journalctl"
      },
      {
        "title": "1. List all users",
        "content": "To list all the users in Linux, use the awk command with the -F option. This will access the /etc/passwd file and print only the first column, which contains the usernames.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. List all users",
          "snippet": "awk -F':' '{ print $1}' /etc/passwd"
        }
      },
      {
        "title": "2. Get User ID",
        "content": "The id command provides the user with user ID (UID) and group ID (GID) of the username by default.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Get User ID",
          "snippet": "id username"
        }
      },
      {
        "title": "3. Add a User",
        "content": "The useradd command creates a new user in the system. The user will be assigned an automatic ID based on the system's settings\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Add a User",
          "snippet": "sudo useradd geeks"
        }
      },
      {
        "title": "4. Assign a Password",
        "content": "The passwd command is used to assign a password to the user. After entering the command, you will be prompted to input a new password for the user.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Assign a Password",
          "snippet": "sudo passwd geeks"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: User Management in Linux (/etc/passwd & /etc/shadow)",
      "initialCode": "sudo usermod -aG developers raj",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: User Management in Linux (/etc/passwd & /etc/shadow)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of User Management in Linux (/etc/passwd & /etc/shadow)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to User Management in Linux (/etc/passwd & /etc/shadow)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "User Management in Linux (/etc/passwd & /etc/shadow) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-useradd": {
    "id": "linux-useradd",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "22 min read",
    "level": "Intermediate",
    "title": "useradd Command: Creating Users in Linux",
    "subtitle": "Complete Linux guide to useradd Command: Creating Users in Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Creating user accounts is a fundamental responsibility of a Linux system administrator, enabling secure access control and proper permission management. Linux provides powerful tools to create and manage users efficiently, especially in multi-user and server environments.\n\n- Provide system access to new users such as developers or team members.\n- Create service accounts for applications like web servers or databases.\n- Isolate tasks and improve system security through permission separation.\n- Manage system resources by assigning users specific roles.Let us consider a command to add a user named test_user to the system. This command creates a new user account without additional customization.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Overview & Syntax",
          "snippet": "sudo useradd test_user"
        },
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for useradd Command: Creating Users in Linux."
        }
      },
      {
        "title": "2. Working with the useradd Command",
        "content": "**Syntax:**\n\n- **useradd** – Command used to create a new user account\n- **options** – Optional flags to customize the user (UID, home directory, shell, etc.)\n- **username** – Name of the user account to be created",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Working with the useradd Command",
          "snippet": "useradd [options] [user_name]"
        }
      },
      {
        "title": "1. Create a User with a Custom Home Directory",
        "content": "This creates a new user and assigns a specific directory as the user’s home directory.\n\n**Command:**\n\n**Output:**\n\n- User test_user is created\n- Home directory is set to /home/test_user (directory may need to be created manually unless -m is used)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Create a User with a Custom Home Directory",
          "snippet": "sudo useradd -d /home/test_user test_user"
        }
      },
      {
        "title": "2. Create a User with a Specific User ID (UID)",
        "content": "This creates a user with a custom user ID instead of an automatically assigned one.\n\n**Command:**\n\n**Output:**\n\n- User test_user is created with UID 1234\n- UID is recorded in /etc/passwd",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Create a User with a Specific User ID (UID)",
          "snippet": "sudo useradd -u 1234 test_user"
        }
      },
      {
        "title": "3. Create a User with a Specific Group ID (GID)",
        "content": "This assigns the user to an existing group using its group ID.\n\n**Command:**\n\n**Output:**\n\n- User test_user is created\n- Primary group is set to GID 1000",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Create a User with a Specific Group ID (GID)",
          "snippet": "sudo useradd -g 1000 test_user"
        }
      },
      {
        "title": "4. Create a User Without a Home Directory",
        "content": "This creates a user account without creating a home directory.\n\n**Command:**\n\n**Output:**\n\n- User test_user is created\n- No home directory is assigned or created",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Create a User Without a Home Directory",
          "snippet": "sudo useradd -M test_user"
        }
      },
      {
        "title": "5. Create a User with an Account Expiry Date",
        "content": "This creates a user account that automatically expires on a specific date.\n\n**Command:**\n\n**Output:**\n\n- User test_user is created\n- Account expires on 30 May 2020\n- After expiry, login is disabled",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Create a User with an Account Expiry Date",
          "snippet": "sudo useradd -e 2020-05-30 test_user"
        }
      },
      {
        "title": "7. Create a User with a Specific Login Shell",
        "content": "This sets a custom default shell for the user.\n\n**Command:**\n\n**Output:**\n\n- User test_user is created\n- Default login shell is set to /bin/sh",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Create a User with a Specific Login Shell",
          "snippet": "sudo useradd -s /bin/sh test_user"
        }
      },
      {
        "title": "8. Display Help for the useradd Command",
        "content": "This displays all available options and usage information for useradd.\n\n**Command:**\n\n**Output:**\n\n- Displays a list of all useradd options\n- Shows syntax and flag descriptions",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Display Help for the useradd Command",
          "snippet": "sudo useradd --help"
        }
      },
      {
        "title": "10. Files Modified by useradd",
        "content": "When you run useradd, it's the command edits a set of system files to register the new user.\n\n- **/etc/passwd: **Stores user information like the username, UID, GID, home directory path, and default shell.\n- **/etc/shadow: **Stores the user's encrypted password. This is why useradd alone can't set a password.\n- **/etc/group: **Stores information about user groups.\n- **/etc/gshadow: **Stores secure information for groups.\n- **/home/[username]: **(If created) This is the user's personal directory. The initial files in it are copied from /etc/skel."
      },
      {
        "title": "11. adduser vs useradd",
        "content": "- adduser is an interactive, user-friendly tool commonly used on Debian/Ubuntu systems. It creates the user, home directory, password, and prompts for additional details.\n- useradd is a low-level, non-interactive command designed for scripting and automation, commonly used on RHEL, CentOS, and Fedora systems.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: useradd Command: Creating Users in Linux",
      "initialCode": "sudo useradd test_user",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: useradd Command: Creating Users in Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of useradd Command: Creating Users in Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to useradd Command: Creating Users in Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "useradd Command: Creating Users in Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-adduser": {
    "id": "linux-adduser",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "16 min read",
    "level": "Intermediate",
    "title": "adduser Command: Interactive User Creation",
    "subtitle": "Complete Linux guide to adduser Command: Interactive User Creation — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- adduser is a Linux command used to create new user accounts on the system in an interactive and user-friendly way. It automatically handles home directory creation, default settings, and basic user configuration.\n\n- Creates a new user along with a home directory and default files\n- Prompts interactively for password and user details\n- Automatically assigns a primary group to the user\n- Simplifies user management compared to the low-level useradd command",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for adduser Command: Interactive User Creation."
        }
      },
      {
        "title": "2. Installing adduser command",
        "content": "To install adduser tool use the following commands as per your Linux distribution.\n\n1. In case of Debian/Ubuntu\n\n2. In case of CentOS/RedHat\n\n3. In case of Fedora OS",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Installing adduser command",
          "snippet": "sudo apt-get install adduser"
        }
      },
      {
        "title": "1. To add a new user",
        "content": "**Command:**\n\nThis command will add a new user to your Linux system. It will ask for some details and after entering those details a new user account would be created.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. To add a new user",
          "snippet": "adduser username"
        }
      },
      {
        "title": "2. To add a user with a different shell.",
        "content": "**Command:**\n\nThis command will change the default shell for the new user to /bin/sh.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. To add a user with a different shell.",
          "snippet": "sudo adduser username --shell /bin/sh"
        }
      },
      {
        "title": "3. To add a new user with a different configuration file.",
        "content": "**Command:**\n\nThis command will take the configurations from the custom_config file and will create the new as per custom_config filename configurations.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. To add a new user with a different configuration file.",
          "snippet": "adduser username --conf custom_config.conf"
        }
      },
      {
        "title": "4. To add a user with different home directory.",
        "content": "Command examples and usage details for **4. To add a user with different home directory.**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. To add a user with different home directory.",
          "snippet": "adduser username --home /home/manav/"
        }
      },
      {
        "title": "5. To get the version of the adduser command.",
        "content": "**Command:**\n\nThis command will print the version details of the adduser command.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. To get the version of the adduser command.",
          "snippet": "adduser --version"
        }
      },
      {
        "title": "6. To display the help section of the adduser command",
        "content": "**Command:**\n\nThis command will display the help section of the adduser command.\n\n**Output:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. To display the help section of the adduser command",
          "snippet": "adduser -h"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: adduser Command: Interactive User Creation",
      "initialCode": "sudo apt-get install adduser",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: adduser Command: Interactive User Creation",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of adduser Command: Interactive User Creation?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to adduser Command: Interactive User Creation",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "adduser Command: Interactive User Creation is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-userdel": {
    "id": "linux-userdel",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "14 min read",
    "level": "Intermediate",
    "title": "userdel Command: Deleting User Accounts",
    "subtitle": "Complete Linux guide to userdel Command: Deleting User Accounts — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The userdel command is used to remove user accounts from the system. It helps administrators delete unused or unauthorized users, ensuring proper access control and maintaining overall system security.\n\n- Removes unused or inactive user accounts\n- Revokes access for users who no longer require it\n- Helps maintain system security and compliance\n- Keeps the system clean and well organized**Example: To delete a user account, open the terminal and run:**\n\n**Command:**\n\nReplace \"username\" with the actual username you want to remove. The 'sudo' command is used to execute the userdel command with administrative privileges.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Overview & Syntax",
          "snippet": "sudo userdel username"
        },
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for userdel Command: Deleting User Accounts."
        }
      },
      {
        "title": "2. Syntax:",
        "content": "Here,\n\n- **'options':** Various command options can be used to customize the behavior of user deletion.\n- **'username':** Specifies the name of the user account to be deleted.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax:",
          "snippet": "userdel [options] [username]"
        }
      },
      {
        "title": "1. userdel -f",
        "content": "Forcefully deletes a user account, even if the user is currently logged in.\n\n**Command:**\n\n**\n\nOutput:**\n\nNote: If no output is displayed, it indicates that the command executed successfully.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. userdel -f",
          "snippet": "sudo userdel -f neuser"
        }
      },
      {
        "title": "2. userdel -r",
        "content": "Deletes the user account along with the user’s home directory and mail spool. Files outside the home directory must be removed manually.\n\n**Command:**\n\nThis will delete the user’s account along with all files in their home directory.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. userdel -r",
          "snippet": "sudo userdel -r newuser2"
        }
      },
      {
        "title": "3. userdel -h",
        "content": "Displays the help message with command syntax and available options.\n\n**Command:**\n\nThis will provide a quick reference to the command’s syntax and available options.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. userdel -h",
          "snippet": "userdel -h"
        }
      },
      {
        "title": "4. userdel -R",
        "content": "Applies changes inside the specified CHROOT_DIR and uses configuration files from that directory. Useful in chroot or isolated environments.\n\n**Command:**\n\nThis is useful when managing user accounts in isolated environments, such as containers or recovery environments.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. userdel -R",
          "snippet": "sudo userdel -R /path/to/chroot newuser2"
        }
      },
      {
        "title": "5. userdel -Z",
        "content": "Removes SELinux user mappings associated with the user account.\n\n**Command:**\n\nThis ensures the SELinux mapping for the user is also removed from the system.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. userdel -Z",
          "snippet": "sudo userdel -Z newuser2"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: userdel Command: Deleting User Accounts",
      "initialCode": "sudo userdel username",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: userdel Command: Deleting User Accounts",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of userdel Command: Deleting User Accounts?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to userdel Command: Deleting User Accounts",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "userdel Command: Deleting User Accounts is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-passwd": {
    "id": "linux-passwd",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "20 min read",
    "level": "Intermediate",
    "title": "passwd Command: Managing User Passwords",
    "subtitle": "Complete Linux guide to passwd Command: Managing User Passwords — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The passwd command is used to manage user passwords and account access. It allows users to change their own passwords, while administrators can reset passwords, lock or unlock accounts, and enforce password expiration policies.\n\n- Allows secure password changes for users and administrators.\n- Helps enforce password policies and expiration rules.\n- Enables locking and unlocking of user accounts.\n- Improves system security and access control.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for passwd Command: Managing User Passwords."
        }
      },
      {
        "title": "2. Example: To change your own password, run",
        "content": "**Command:**\n\n**Output:**\n\nhow to change user password in Linux\n- If you are not the root user, you will be prompted to enter your current password to proceed.\n- You will then be prompted to enter the new password. Type the new password and press Enter.\n- Retype the new password when prompted to confirm.\n- The password for the specified user account is now changed.**Note: **Linux does not display any characters on the screen while you type the password for security reasons."
      },
      {
        "title": "3. Syntax:",
        "content": "Here,\n\n- **[options] :** include various parameters to customize the password-changing process.\n- **[username] :** the target user account for which you want to change the password.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax:",
          "snippet": "passwd [options] [username]"
        }
      },
      {
        "title": "4. 'passwd' Command Table",
        "content": "**Command****Description****passwd**Change your own password (interactive).**sudo passwd [user]**Change another user's password (admin only).**-l [user]**Locks the specified user's account.**-u [user]**Unlocks the specified user's account.**-e [user]**Expires the user's password, forcing a change on next login.**-S [user]**Shows the Status of the account (very useful).**-x [days] [user]**Sets the maximum number of days a password is valid.**-n [days] [user]**Sets the minimum number of days between password changes.**-w [days] [user]**Sets the number of warning days before a password expires."
      },
      {
        "title": "1. To Change Another User's Password",
        "content": "As a system administrator (using sudo or as the root user), you can change the password for any user. This is commonly used to reset a forgotten or compromised password.\n\n**Command:**\n\n**Output:**\n\nHow to change another user passwordIf you are not logged in as the root user, you will be prompted to enter your own password to gain administrative privileges. After that, you must enter and confirm the new password for the target user.\n\n**Note: **Linux does not display any characters while typing passwords for security reasons.\n\nYou can also change the root user’s password:\n\n**Command:**\n\n**Output:**\n\n**Note:** Use the above command with caution",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. To Change Another User's Password",
          "snippet": "sudo passwd user1"
        }
      },
      {
        "title": "2. To Force a User to Change Password on Next Login",
        "content": "This option expires the user’s password immediately and forces them to set a new password at their next login.\n\n**Command:**\n\n**Output:**\n\nchanging the user password forcefullyOnce executed, the user will be required to change their password before accessing the system",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. To Force a User to Change Password on Next Login",
          "snippet": "passwd -e user1"
        }
      },
      {
        "title": "3. To Lock and Unlock a User Account",
        "content": "Locking a user account disables login access (user may still be able to login using other options like SSH key), while unlocking restores it.\n\n**To lock the account:**\n\nThe password for the user \"user2\" is now locked, preventing login.\n\n**To unlock the account:**\n\nThe password for the user \"user2\" is now unlocked, allowing login again.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. To Lock and Unlock a User Account",
          "snippet": "sudo passwd -l user2"
        }
      },
      {
        "title": "4. To Set Password Expiry (Maximum Password Age)",
        "content": "The -x option sets the maximum number of days a password remains valid.\n\n**Command:**\n\nThis means the user must change their password every 30 days.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. To Set Password Expiry (Maximum Password Age)",
          "snippet": "sudo passwd -x 30 user3"
        }
      },
      {
        "title": "9. Working of passwd",
        "content": "The passwd command safely modifies the /etc/shadow file, which stores encrypted passwords and password aging information. This file should never be edited manually."
      },
      {
        "title": "10. Example:",
        "content": "**Output:**\n\n**Field Explanation:**\n\n- **User name:** user1\n- **Encrypted Password:** $6$x8wA...an/ (If this starts with ! or *, the account is locked).\n- **Last Change: **The date the password was last changed.\n- **Min Age: **Minimum number of days before a password can be changed (default 0).\n- **Max Age: **Maximum number of days a password is valid (default 99999, meaning never expires).\n- **Warn Days: **Number of days before expiration to warn the user.\n- **Inactive Days:** Number of days after expiration before the account is fully disabled.\n- **Expire Date:** A specific date when the account is disabled.\n- **Reserved: **Unused.Comment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Example:",
          "snippet": "user1:$6$x8wAJRpP$EWC97sXW5tqac10Q2TQyXkR.1l1jdK4VLK1pkZKmA2mbA6UnSGyo94Pis074viWBA3sVbkCptSZzuP2K.y.an/:17887:0:99999:7:::"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: passwd Command: Managing User Passwords",
      "initialCode": "passwd [options] [username]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: passwd Command: Managing User Passwords",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of passwd Command: Managing User Passwords?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to passwd Command: Managing User Passwords",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "passwd Command: Managing User Passwords is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-id-cmd": {
    "id": "linux-id-cmd",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "id Command: Viewing UID, GID & User Identity",
    "subtitle": "Complete Linux guide to id Command: Viewing UID, GID & User Identity — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The id command in Linux is used to display a user’s identity information, including the user name, User ID (UID), Group ID (GID), and group memberships. It is commonly used by system administrators to verify user permissions, troubleshoot access issues, and audit user accounts.\n\n- Displays the UID and GID of a user\n- Shows all groups a user belongs to (primary and secondary)\n- Helps verify user permissions and security context\n- Useful for debugging permission-related problems",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for id Command: Viewing UID, GID & User Identity."
        }
      },
      {
        "title": "2. Example: Display Identity of the Current User",
        "content": "**Command:**\n\n- Shows the UID, primary GID, and all group memberships of the current user\n- Most commonly used command for quick identity checks**Output:**\n\n**Note:** Without any options, it prints all identity information (UID, GID, and groups)"
      },
      {
        "title": "3. Syntax:",
        "content": "**Options:**\n\n- **-g :** Prints only the effective group ID of the user.\n- **-G :** Prints all group IDs associated with the user.\n- **-n : **Displays names instead of numeric IDs.\n- **-r :** Shows the real ID instead of the effective one.\n- **-u : **Prints only the effective user ID.\n- **--help :** Displays help messages for the id command and exits.\n- **--version **: Shows the version information and exits.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax:",
          "snippet": "id [OPTION]… [USER]"
        }
      },
      {
        "title": "1. To find a specific user's GID",
        "content": "**Command:**\n\nAgain assuming to find GID of master. This option will show the effective group ID of the user.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. To find a specific user's GID",
          "snippet": "id -g master"
        }
      },
      {
        "title": "2. List All Groups a User Belongs To",
        "content": "**Command:**\n\n- Prints all group IDs associated with the user.\n- Useful when checking access to shared files or directories.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. List All Groups a User Belongs To",
          "snippet": "id -G master"
        }
      },
      {
        "title": "3. Find the UID of a Specific User",
        "content": "**Command:**\n\n- Displays only the User ID (UID) of the user master.\n- Useful when checking ownership or permission mappings.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Find the UID of a Specific User",
          "snippet": "id -u master"
        }
      },
      {
        "title": "4. To find out UID and all groups associated with a username",
        "content": "In this case we will use the user \"master\" to find UID and all groups associated with it.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. To find out UID and all groups associated with a username",
          "snippet": "id master"
        }
      },
      {
        "title": "5. To display a name instead of numbers",
        "content": "By default the 'id' command shows us the UID and GID in numbers which a user may not understand, with use of '-n' option with '-u', '-g' and '-G'.\n\n- This makes output more human-readable.\n- Preferred when explaining permissions or auditing users.**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. To display a name instead of numbers",
          "snippet": "id -ng master orid -nu masterorid -nG master"
        }
      },
      {
        "title": "6. To display real id instead of effective id",
        "content": "To show the real id with the use of '-r' option with '-g', '-u' and '-G'.\n\n**Syntax:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. To display real id instead of effective id",
          "snippet": "id -r -g masterid -r -u masterid -r -G master"
        }
      },
      {
        "title": "10. Differences Between id and groups Command",
        "content": "Both id and groups are used to check user and group information in Linux, but they serve different purposes:\n\nAspectid Commandgroups CommandPurposeDisplays complete user identity informationDisplays group memberships onlyOutputUID, GID, all groups (numeric or names)Group names onlyUser DetailsShows user ID and group IDsDoes not show UID or GIDReal vs Effective IDsSupports real and effective IDs (-r)Not supportedScript UsageBetter for scripting and auditsBetter for quick checksOutput FormatStructured and detailedSimple and readable"
      },
      {
        "title": "11. When to Use id",
        "content": "- When you need UID, GID, and group details together.\n- When troubleshooting permission or access issues.\n- When working with scripts, automation, or security checks.\n- When checking real vs effective IDs (sudo/SUID cases).**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. When to Use id",
          "snippet": "id username"
        }
      },
      {
        "title": "12. When to Use groups",
        "content": "- When you only need to know which groups a user belongs to\n- For quick, human-readable output\n- During basic administration or learning**Example:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. When to Use groups",
          "snippet": "groups username"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: id Command: Viewing UID, GID & User Identity",
      "initialCode": "id [OPTION]… [USER]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: id Command: Viewing UID, GID & User Identity",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of id Command: Viewing UID, GID & User Identity?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to id Command: Viewing UID, GID & User Identity",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "id Command: Viewing UID, GID & User Identity is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-group-mgmt": {
    "id": "linux-group-mgmt",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "Group Management in Linux (/etc/group)",
    "subtitle": "Complete Linux guide to Group Management in Linux (/etc/group) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Group management in Linux is used to organize users and control access to files, directories, and system resources. Each user belongs to at least one group, and permissions are often assigned to groups instead of individual users. Linux mainly supports Primary and Secondary groups for managing user access efficiently.\n\n- Organize users based on roles and responsibilities\n- Controls access to files and directories through group ownership\n- Simplify access management for multiple users\n- Improves system security and access control\n- Helps administrators manage shared resources efficiently and support collaborative work environments",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Group Management in Linux (/etc/group)."
        }
      },
      {
        "title": "2. Types of Groups in Linux",
        "content": "In Linux , groups are classified into Primary and Secondary groups based on their purpose and usage. Proper understanding of these groups helps in managing permissions accurately."
      },
      {
        "title": "1. Primary Group",
        "content": "A Primary Group is the default group assigned to a user when the account is created.\n\n- Automatically created during user creation\n- Usually has the same Group ID (GID) as the User ID (UID) but may vary as both are different identifiers\n- Each user can have only one primary group\n- All files created by the user belong to this group by default\n- Cannot be removed while the user account exists but can be reassigned to other"
      },
      {
        "title": "2. Secondary Group",
        "content": "A secondary group is created separately and used to grant additional permissions. Users can belong to multiple secondary groups at the same time.\n\n- Created manually by administrators\n- Used to provide extra access rights\n- Allows shared access to resources\n- A user can belong to multiple secondary groups"
      },
      {
        "title": "5. Creating a Secondary Group (groupadd)",
        "content": "The groupadd command is used to create new groups in Linux. When a group is created, the system automatically assigns it a unique Group ID (GID). All group information is stored in the /etc/group file.\n\n- Creates a new group entry in /etc/group\n- Automatically assigns a unique GID\n- Requires administrative privileges\n- Used before adding users to the group**Syntax:**\n\n**Example: Create a New Group**\n\nTo create a new secondary group for organizing users.\n\n**Command:**\n\n**Note:** Verifying group creation using tail -3 /etc/group",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Creating a Secondary Group (groupadd)",
          "snippet": "groupadd group_name"
        }
      },
      {
        "title": "6. Setting the Password for a Group (gpasswd)",
        "content": "The gpasswd command is used to manage group passwords and membership. It allows administrators to assign a password to a group for controlled access.\n\n- Sets or updates the password of a group\n- Stores password information in /etc/gshadow\n- Requires administrative privileges**Syntax:**\n\n**Example: Assign a Group Password**\n\nTo set a password for a group.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Setting the Password for a Group (gpasswd)",
          "snippet": "gpasswd group_name"
        }
      },
      {
        "title": "7. Viewing Group Password Information (/etc/gshadow)",
        "content": "Group security information, including encrypted passwords and administrators, is stored in the /etc/gshadow file. This file is used by the system for secure group management.\n\n- Stores encrypted group passwords\n- Contains group administrators and members details\n- Accessible only by root users\n- Used for security auditing and administration**Syntax:**\n\n- **cat:** Displays file contents\n- **/etc/gshadow:** Secure group information file",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Viewing Group Password Information (/etc/gshadow)",
          "snippet": "cat /etc/gshadow"
        }
      },
      {
        "title": "8. Adding a User to an Existing Group",
        "content": "The usermod command is used to modify user account settings in Linux. It allows administrators to add users to secondary groups for permission management. The -G option assigns a user to specified secondary groups.\n\n- Modifies existing user accounts\n- Assigns user to one or more secondary groups\n- Replaces all previous secondary groups\n- Requires administrative privileges**Syntax:**\n\n**Example: Add User to a Group (Replace Existing Groups)**\n\nTo add a user to a new group while replacing all previous secondary groups.\n\n**Command:**\n\n**Note:** If we add a user to a group then it automatically gets removed from the previous groups, we can prevent this by the command given below.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Adding a User to an Existing Group",
          "snippet": "usermod -G group_name  username"
        }
      },
      {
        "title": "9. Adding User Without Removing Existing Groups (usermod -aG)",
        "content": "The -aG options with usermod are used to append a user to additional groups. This method preserves existing group memberships.\n\n- Appends new groups without removing old ones\n- Maintains existing secondary groups\n- Recommended for routine administration\n- Requires administrative privileges**Syntax:**\n\n**Example: Add User Without Removing Existing Groups**\n\nTo add a user to a group while keeping current group memberships.\n\n**Command:**\n\n**Note:**\n\n- Always use -a with -G,\n- Missing -a replaces group list\n- Changes apply after re-login",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Adding User Without Removing Existing Groups (usermod -aG)",
          "snippet": "usermod -aG group_name username"
        }
      },
      {
        "title": "10. Adding Multiple Users to a Group (gpasswd -M)",
        "content": "The gpasswd command with the -M option is used to assign multiple users to a group at once. It replaces the existing member list of a group with a new list. This method is useful for bulk user management.\n\n- Assigns multiple users in a single command\n- Replaces current group members\n- Accepts comma-separated and space separated usernames\n- Requires administrative privileges**Syntax:**\n\n**Example: Add Multiple Users**\n\nTo assign several users to a group simultaneously.\n\n**Command:**\n\n**Notes:** No spaces allowed between usernames",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Adding Multiple Users to a Group (gpasswd -M)",
          "snippet": "gpasswd -M user_name1,user_name2,user_name3... group_name"
        }
      },
      {
        "title": "11. Removing a User from a Group (gpasswd -d)",
        "content": "The gpasswd command with the -d option is used to remove a user from a specific group. This operation does not delete the user account from the system. It only revokes the user’s membership from the selected group.\n\n- Removes user from a specific group\n- Keeps the user account active\n- Preserves other group memberships\n- Requires administrative privileges**Syntax:**\n\n**Example: Remove a User from a Group**\n\nTo delete a user from a specific group.\n\n**Command:**\n\n**Note:** Primary group is not affected, user remains in other groups",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Removing a User from a Group (gpasswd -d)",
          "snippet": "gpasswd -d username group_name"
        }
      },
      {
        "title": "12. Deleting a Group (groupdel)",
        "content": "The groupdel command is used to permanently remove a group from the Linux system. When a group is deleted, users are not removed, but they lose membership in that group. If the deleted group was their only secondary group, they continue with their primary group.\n\n- Removes group from /etc/group and /etc/gshadow\n- Keeps user accounts active\n- Reverts users to their primary groups if required\n- Requires administrative privileges**Syntax:**\n\n**Example: Delete a Group**\n\nTo permanently remove a group from the system.\n\n**Command:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Deleting a Group (groupdel)",
          "snippet": "groupdel group_name"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Group Management in Linux (/etc/group)",
      "initialCode": "groupadd group_name",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Group Management in Linux (/etc/group)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Group Management in Linux (/etc/group)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Group Management in Linux (/etc/group)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Group Management in Linux (/etc/group) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-groups-cmd": {
    "id": "linux-groups-cmd",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "20 min read",
    "level": "Intermediate",
    "title": "groups Command: Checking Group Memberships",
    "subtitle": "Complete Linux guide to groups Command: Checking Group Memberships — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The groups command in Linux is used to display the group memberships of a user. It shows the primary group and all supplementary groups associated with a user account. This command is mainly used for permission verification, access control checks and troubleshooting user-related issues.\n\n- Displays primary and supplementary groups of a user.\n- Shows groups of the current user if no username is provided.\n- Accepts multiple usernames as arguments.\n- Useful for checking permission and access configuration.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for groups Command: Checking Group Memberships."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **groups:** Command to display group memberships.\n- **[OPTION]:** Optional flags (e.g., --help, --version).\n- **[USERNAME]:** Name of the user whose group membership you want to check.\n- **... :** Indicates multiple options or usernames can be provided.**Note:** If no username is specified, the command displays groups of the current logged-in user.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax",
          "snippet": "groups [OPTION]... [USERNAME]..."
        }
      },
      {
        "title": "1. `--help`",
        "content": "It displays usage information and basic details about the command. Use it when you want to understand the correct syntax or available options.\n\n**Command:**\n\n**Output:**\n\n--help",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. `--help`",
          "snippet": "groups --help"
        }
      },
      {
        "title": "2. `--version`",
        "content": "It Displays the installed version of the groups command. It useful for debugging or verifying the installed core utilities version.\n\n**Command:**\n\n**Output:**\n\n--version",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. `--version`",
          "snippet": "groups --version"
        }
      },
      {
        "title": "5. Examples and Implementation of groups Command",
        "content": "Here are some common ways to use the 'groups' command to view user group memberships:"
      },
      {
        "title": "6. Example 1: Viewing Group Memberships of a Specific User",
        "content": "The most common use of the groups command is to check a specific user’s group memberships.\n\n**Syntax:**\n\n**Command:**\n\n**Output:**\n\ngroups demon",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Example 1: Viewing Group Memberships of a Specific User",
          "snippet": "groups [username]"
        }
      },
      {
        "title": "7. Example 2: Display Group Membership of Current User",
        "content": "Here the current user is a demon. So, when we give \"groups\" command we only get groups in which 'demon' is a user.\n\n**Command:**\n\n**Output:**\n\ngroups"
      },
      {
        "title": "8. Example 3: Display Group Membership of root User",
        "content": "This example shows how to check the group memberships of the root user account. The root user is the superuser in Linux and typically has full system privileges.\n\n**Command:**\n\n**Output:**\n\ngroups root",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Example 3: Display Group Membership of root User",
          "snippet": "groups root"
        }
      },
      {
        "title": "9. Example 4: Checking Multiple Users at Once",
        "content": "The groups command allows you to pass multiple usernames in a single execution. This helps administrators verify group memberships of several users quickly without running the command repeatedly.\n\n**Syntax:**\n\n- **user1 user2 user3:** Multiple usernames separated by spaces.\n- The command will display group memberships for each user sequentially.**Command:**\n\n**Output:**\n\nChecking Multiple Users at Once",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Example 4: Checking Multiple Users at Once",
          "snippet": "groups user1 user2 user3"
        }
      },
      {
        "title": "10. Important Note on Primary and Supplementary Groups",
        "content": "- Every Linux process inherits its group memberships from its parent process, including the primary group (usually the first in the list) and supplementary groups (additional groups).\n- Once you log in, your session “locks in” your group memberships.\n- If you modify the system group database after logging in (for example, using usermod -aG groupname username), these changes will not appear in your current session.\n- To see updated groups, either log out and log back in, or use the newgrp command to switch to a new group within the current session:\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Important Note on Primary and Supplementary Groups",
          "snippet": "newgrp groupname"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: groups Command: Checking Group Memberships",
      "initialCode": "groups [OPTION]... [USERNAME]...",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: groups Command: Checking Group Memberships",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of groups Command: Checking Group Memberships?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to groups Command: Checking Group Memberships",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "groups Command: Checking Group Memberships is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-groupadd": {
    "id": "linux-groupadd",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "groupadd Command: Creating User Groups",
    "subtitle": "Complete Linux guide to groupadd Command: Creating User Groups — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- User management is an essential part of system administration. One key task is creating and managing user groups. Groups help organize multiple users and simplify permission management for files and resources. The groupadd command allows administrators to create new groups efficiently.\n\n- Supports assigning a specific group ID (GID)\n- Allows creation of system groups\n- Provides options for setting encrypted group passwords\n- Can override default system configurations for group creation",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for groupadd Command: Creating User Groups."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **[options]:** Optional flags like -g or -r\n- **group_name:** Name of the group to create",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax",
          "snippet": "groupadd [options] group_name"
        }
      },
      {
        "title": "3. Creating a New Group (Step-by-Step)",
        "content": "Follow these steps to create a new group in Linux using the groupadd command:"
      },
      {
        "title": "1. Open a terminal",
        "content": "Launch a terminal on your Linux system. This can usually be done by pressing `Ctrl + Alt + T` or searching for \"Terminal\" in the application menu."
      },
      {
        "title": "2. Run the groupadd command",
        "content": "**Example:**\n\nCreate a group named \"developers\".\n\n**Command:**\n\n- Uses sudo for administrative privileges",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Run the groupadd command",
          "snippet": "sudo groupadd developers"
        }
      },
      {
        "title": "3. Verify Group Creation",
        "content": "Every new group created is registered in the file \"/etc/group\".\n\n**Command:**\n\n**Output:**\n\nsudo tail /etc/group\n- The file shows group information in the following format:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Verify Group Creation",
          "snippet": "sudo tail /etc/group"
        }
      },
      {
        "title": "1. -f, --force",
        "content": "Forces command to exit silently if group already exists.\n\n**Syntax:**\n\n**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -f, --force",
          "snippet": "groupadd -f group_name"
        }
      },
      {
        "title": "2. -g GID, --gid GID",
        "content": "Assigns a specific numeric GID.\n\n**Syntax:**\n\n- **<GID>:** Numeric Group ID (must be non-negative).Example\n\n**Verify:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -g GID, --gid GID",
          "snippet": "sudo groupadd -g <GID> group_name"
        }
      },
      {
        "title": "3. -o, --non-unique",
        "content": "Allows duplicate GID. Used when multiple groups must share same GID and it requires -g option.\n\n**Syntax:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -o, --non-unique",
          "snippet": "sudo groupadd -o -g 2000 testgroup"
        }
      },
      {
        "title": "4. -r, --system",
        "content": "Creates a system group.\n\n**Syntax:**\n\n**Output:**\n\n**Notes:**\n\n- GID assigned within SYS_GID_MIN and SYS_GID_MAX.\n- Used for services and system processes.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -r, --system",
          "snippet": "sudo groupadd -r sysgroup"
        }
      },
      {
        "title": "5. -p PASSWORD, --password PASSWORD",
        "content": "Sets encrypted password for the group. Password must be encrypted (generated using openssl passwd). Stored in /etc/gshadow. Rarely used in modern systems.\n\n**Syntax:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. -p PASSWORD, --password PASSWORD",
          "snippet": "sudo groupadd -p encrypted_password finance"
        }
      },
      {
        "title": "6. -K KEY=VALUE, --key KEY=VALUE",
        "content": "Overrides default values from /etc/login.defs. Useful in custom environment setups.\n\n**Syntax:**\n\n- **GID_MIN:** Minimum allowed GID.\n- **GID_MAX:** Maximum allowed GID.\n- **-K:** Override default configuration temporarily.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. -K KEY=VALUE, --key KEY=VALUE",
          "snippet": "sudo groupadd -K GID_MIN=500 -K GID_MAX=700 tester"
        }
      },
      {
        "title": "7. -R CHROOT_DIR, --root CHROOT_DIR",
        "content": "Applies changes inside a chroot environment. Useful in container or recovery environments.\n\n**Syntax:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. -R CHROOT_DIR, --root CHROOT_DIR",
          "snippet": "sudo groupadd -R /mnt/chroot devgroup"
        }
      },
      {
        "title": "8. -h, --help",
        "content": "Command examples and usage details for **8. -h, --help**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. -h, --help",
          "snippet": "groupadd --help"
        }
      },
      {
        "title": "1. Force Create Without Error",
        "content": "**Syntax:**\n\n**Output:**\n\ngroupadd -f developers",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Force Create Without Error",
          "snippet": "groupadd -f developers"
        }
      },
      {
        "title": "2. Create Group with Specific GID",
        "content": "The -g option allows you to assign a specific numeric GID (Group ID) to the new group instead of letting the system auto-assign one. This is useful when you need consistent GIDs across multiple servers or shared file systems.\n\n**Syntax:**\n\n**Example:**\n\nIf you want to create a group developers with GID 2000:\n\nThis command will create a new group named \"developer\" with a GID of 2000. Specifying group ID is useful in case when we need to maintain consistency across systems.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Create Group with Specific GID",
          "snippet": "sudo groupadd -g <GID> group_name"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: groupadd Command: Creating User Groups",
      "initialCode": "groupadd [options] group_name",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: groupadd Command: Creating User Groups",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of groupadd Command: Creating User Groups?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to groupadd Command: Creating User Groups",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "groupadd Command: Creating User Groups is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-groupdel": {
    "id": "linux-groupdel",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "20 min read",
    "level": "Intermediate",
    "title": "groupdel Command: Removing Groups",
    "subtitle": "Complete Linux guide to groupdel Command: Removing Groups — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The groupdel command in Linux is used to delete an existing group from the system. It removes the group entry from system group files, but does not delete users belonging to that group. This command is commonly used during cleanup, project removal, or restructuring of user permissions.\n\n- Deletes an existing group from the system.\n- Removes the group entry from /etc/group.\n- Does not delete users associated with the group.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for groupdel Command: Removing Groups."
        }
      },
      {
        "title": "2. Example 1: Delete an Existing Group",
        "content": "**Syntax:**\n\n**Command:**\n\n**Output:**\n\n- (No output if successful)**Verify Deletion:**\n\n**Output:**\n\n- (No output)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example 1: Delete an Existing Group",
          "snippet": "sudo groupdel group_name"
        }
      },
      {
        "title": "3. Example 2: Attempt to Delete Non-Existing Group",
        "content": "**Command:**\n\n**Output:**\n\n**Notes:** Helps identify incorrect group names.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example 2: Attempt to Delete Non-Existing Group",
          "snippet": "sudo groupdel nonexistinggroup"
        }
      },
      {
        "title": "4. Example 3: Delete Group Used as Primary Group",
        "content": "If a group is set as the primary group of a user:\n\n**Command:**\n\n**Check exit code:**\n\n**Output:**\n\n**Notes:**\n\n- You must first change the user's primary group.\n- Use usermod -g newgroup username.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Example 3: Delete Group Used as Primary Group",
          "snippet": "sudo groupdel primarygrp"
        }
      },
      {
        "title": "5. Syntax of `groupdel` Command",
        "content": "**Files Used:**\n\n- **/etc/group:** Stores group account information.\n- **/etc/gshadow** : Stores secure group account information (passwords and administrators).**Exit values:**\n\ngroupdel command exits with the following status codes:\n\n- **0: **Success\n- **2: **Invalid Command Syntax.\n- **6: **Specified group doesn't exist.\n- **8: **Can't remove users primary group.\n- **10: **Can't update group file.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Syntax of `groupdel` Command",
          "snippet": "groupdel [options] group_name"
        }
      },
      {
        "title": "1. -h, --help",
        "content": "Displays the help message for the groupdel command and exits. It provides usage syntax and a list of available options. This option does not modify the system.\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -h, --help",
          "snippet": "groupdel --help"
        }
      },
      {
        "title": "2. -R, --root CHROOT_DIR",
        "content": "Deletes a group inside a specified chroot environment. Instead of modifying the current system’s /etc/group, it operates inside the provided directory. This is commonly used when repairing or managing another Linux installation mounted inside a directory.\n\n**Syntax:**\n\n- **-R:** Specifies alternate root directory.\n- **CHROOT_DIR:** Directory to act as root.\n- **group_name:** Name of the group to delete.**Example: Deleting a Group Inside a Chroot Environment**\n\nDeletes a group named developers from a mounted Linux system located at /mnt/chroot.\n\n**Command:**\n\n**Output:**\n\n- (No output if successful)**Verification**:\n\n- (No output if deletion was successful)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -R, --root CHROOT_DIR",
          "snippet": "sudo groupdel -R CHROOT_DIR group_name"
        }
      },
      {
        "title": "3. -P, --prefix PREFIX_DIR",
        "content": "Specifies a directory prefix where /etc/* files are located. Unlike -R, this does not perform a full chroot, but simply works relative to the given directory. Useful when managing system images or container filesystems.\n\n**Syntax:**\n\n- **-P:** Defines alternate path to configuration files.\n- **PREFIX_DIR:** Directory containing /etc/group.\n- **group_name:** Group to delete.**Example: Deleting a Group Using Custom Prefix Directory**\n\nDeletes the group developers from a system image stored in /mnt/customroot.\n\n**Command:**\n\n**Output:**\n\n- (No output if successful)**Verification:**\n\n- (No output if deleted)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -P, --prefix PREFIX_DIR",
          "snippet": "sudo groupdel -P PREFIX_DIR group_name"
        }
      },
      {
        "title": "4. -f, --force",
        "content": "Forces deletion of a group even if it is the primary group of an existing user. Normally, groupdel prevents deleting such groups to protect user configuration. This option overrides that protection.\n\n**Syntax:**\n\n**Example: Force Deleting a Primary Group**\n\nDeletes a group named alice even if it is set as the primary group of a user.\n\n- Assume developers is primary group of user alice.\n**Output:**\n\n- (No output if successful)**Without -f, You Would be:**\n\n**Notes:** May cause user account inconsistencies. Recommended only in controlled environments.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -f, --force",
          "snippet": "sudo groupdel -f group_name"
        }
      },
      {
        "title": "5. --extrausers",
        "content": "Deletes a group from the extra users database instead of /etc/group. Used in systems configured with libnss-extrausers.\n\n**Group data is stored in:**\n\n- This option ensures groupdel operates on that database.**Syntax:**\n\n**Example: Deleting a Group from Extra Users Database**\n\nDeletes the group tempgroup from the extra users database.\n\n**Output:**\n\n- (No output if successful)**Verification:**\n\n- (No output if deleted)**Notes:**\n\n- Used mainly in embedded systems.\n- Common in containerized or minimal installations.\n- Has no effect if extrausers is not configured.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. --extrausers",
          "snippet": "/var/lib/extrausers/group"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: groupdel Command: Removing Groups",
      "initialCode": "sudo groupdel group_name",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: groupdel Command: Removing Groups",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of groupdel Command: Removing Groups?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to groupdel Command: Removing Groups",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "groupdel Command: Removing Groups is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-check-groups": {
    "id": "linux-check-groups",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "12 min read",
    "level": "Intermediate",
    "title": "How to Check All Groups a User Belongs To",
    "subtitle": "Complete Linux guide to How to Check All Groups a User Belongs To — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux is a multi-user operating system that allows multiple users to work on the same system securely and efficiently. User groups in Linux make it easier to manage permissions by applying access rules to multiple users at once.\n\n- A user group is a collection of users managed together for permission and access control.\n- Groups simplify administration by allowing permissions to be assigned once and applied to all group members.\n- System administrators use groups to manage files, directories, and system resources efficiently.\n- When a new user is created, Linux automatically creates a primary group with the same name as the user.\n- Group-based management reduces manual configuration and improves system security.**Example: **Create a user named demoUser3 to demonstrate how user groups can be checked in Linux.\n\n**Commands:**\n\nWhen a new user is created, a new group with the same name is created and the user is added to it. This group is called the primary group of the user.\n\n**Output:**\n\nCreating a group, a user, and adding the user to the group.\n- A new group demo_group is created, then a user demo_user is added to the system using administrative (sudo) privileges.\n- The user demo_user is added to demo_group as a secondary group using the groupmod -a -U command.\n- The groups demo_user command confirms that demo_user belongs to both its default group and demo_group, verifying successful group assignment.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Overview & Syntax",
          "snippet": "sudo groupadd demo_groupsudo useradd demo_usersudo groupmod -a -U demo_user demo_groupgroups demo_user"
        },
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for How to Check All Groups a User Belongs To."
        }
      },
      {
        "title": "2. Method 1: The \"groups\" command",
        "content": "The groups command is the simplest and most commonly used way to list all groups (both primary and secondary) that a user belongs to.\n\n- It is part of GNU coreutils\n- It comes pre-installed on almost all Linux systems\n- No setup or configuration is requiredYou can start using it immediately from the terminal.\n\n**Command:**\n\n**Output:**\n\nThis command prints version information, it confirms that groups is installed and working correctly.\n\n**Syntax:**\n\n- If you provide a username, it shows the groups for that user\n- If you do not provide a username, it shows the groups of the currently logged-in user**Example 1: Check groups for a specific user**\n\nIt is used to display all the groups that the user liveuser belongs to.\n\n**Command:**\n\n**Output:**\n\nGroups to which the user liveuser belongs.This means:\n\n- liveuser is the user\n- wheel is a secondary group (often used for sudo/admin access)**Example 2: Check groups for another user**\n\n**Command:**\n\nThis shows that demoUser1 belongs to multiple groups, which is common in real systems.\n\n**Output:**\n\nUsing groups command with username, example 2**Example 3: Check groups for the current user**\n\n**Command:**\n\n- This displays the groups of the user currently logged into the terminal.\n- This is very useful when debugging permission issues for yourself.**Output:**\n\nUsing groups command without a username.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Method 1: The \"groups\" command",
          "snippet": "groups --version"
        }
      },
      {
        "title": "3. Method 2: The \"id\" command",
        "content": "The id command is another built-in Linux command that shows user identity information, including user ID (UID), group ID (GID), and group memberships. It is especially useful when you want structured output or are writing scripts.\n\n**Syntax:**\n\n- -G: The -G flag retrieves all the group IDs of the user and\n- -n: The -n flag tells to output the names of groups (otherwise it would output group IDs).**Example:**\n\nThis confirms all groups associated with the user.\n\n**Output:**\n\nUsing the id command to retrieve the groups a user belongs to.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Method 2: The \"id\" command",
          "snippet": "id -G -n username"
        }
      },
      {
        "title": "4. Method 3: Using the /etc/group File",
        "content": "The /etc/group file stores all group information on the system. Every group has an entry in this file.\n\n**1. Entry format in /etc/group file**\n\n- **group_name:** Name of the group\n- **group_id:** Numeric group ID (GID)\n- **user list:** Users who belong to this group**2. Manually searching /etc/group file**\n\nContents of /etc/group file.However, manual searching is not recommended on production systems because the file can be very large.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Method 3: Using the /etc/group File",
          "snippet": "group_name:x:group_id:user1,user2,user3"
        }
      },
      {
        "title": "5. Better approach: Use grep to filter results",
        "content": "Instead of scrolling, you can search only the lines that contain a specific username.\n\n**Syntax:**\n\n- The -w flag ensures an exact match for the username**Example: Using the grep command for searching**\n\nEven the grep command is pre-installed hence no installation is required. grep command is used for pattern matching in strings. We use it here to print only those lines from the /etc/group file where our concerned username appears.\n\n**Command:**\n\nThis is used to see all groups the user belongs to.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Better approach: Use grep to filter results",
          "snippet": "grep -w username /etc/group"
        }
      },
      {
        "title": "6. Method 4: The \"getent\" command",
        "content": "The getent command retrieves information from system databases such as:\n\n- /etc/group\n- LDAP\n- NISThis makes it very useful in enterprise environments where users and groups may not be stored locally.\n\n**Basic command:**\n\nThis prints all group entries, which can be large and hard to read.\n\n**Recommended approach: Combine getent with grep**\n\n**Syntax:**\n\n**Example:**\n\nThis displays only the groups where `demoUser1` is a member.\n\nUsing intent and grep commands together to retrieve the groups to which the user belongs.Comment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Method 4: The \"getent\" command",
          "snippet": "getent group"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: How to Check All Groups a User Belongs To",
      "initialCode": "sudo groupadd demo_groupsudo useradd demo_usersudo groupmod -a -U demo_user demo_groupgroups demo_user",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: How to Check All Groups a User Belongs To",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of How to Check All Groups a User Belongs To?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to How to Check All Groups a User Belongs To",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "How to Check All Groups a User Belongs To is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-sudo": {
    "id": "linux-sudo",
    "badge": "Module 6 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "sudo Command & /etc/sudoers Administrative Access",
    "subtitle": "Complete Linux guide to sudo Command & /etc/sudoers Administrative Access — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The sudo (Superuser Do) command allows an authorized user to execute commands with administrative (superuser) privileges in Linux. It is commonly used to run system-level commands that require higher permissions, without logging in directly as the root user.\n\n- Execute commands that require administrative permissions\n- Avoid direct login as the root user\n- Provide controlled access to system-level operations\n- Log all privileged commands for auditing and security\n- Allow administrators to define user-specific command permissions",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for sudo Command & /etc/sudoers Administrative Access."
        }
      },
      {
        "title": "2. Example 1: Run a Command with Administrative Privileges",
        "content": "To execute a system command that requires administrator-level permissions.\n\n**Command:**\n\n- **sudo:** grants temporary administrative privileges\n- **ls:** lists directory contents\n- **/root:** Is accessible only to the administrator, so sudo is required**Output:**\n\nGrants temporary administrative privileges",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example 1: Run a Command with Administrative Privileges",
          "snippet": "sudo ls /root"
        }
      },
      {
        "title": "3. Example 2: Edit a System File Using sudo",
        "content": "To modify a system configuration file that is protected and cannot be edited by normal users.\n\n**Command:**\n\n- sudo allows the editor to run with administrative privileges\n- nano is a command-line text editor\n- /etc/hosts is owned by the administrator, so editing it requires elevated permissions**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example 2: Edit a System File Using sudo",
          "snippet": "sudo nano /etc/hosts"
        }
      },
      {
        "title": "4. Example 3: Run a Command as Another User",
        "content": "To execute a command as a user other than the default administrative user.\n\n**Command:**\n\n- **-u nobody:** tells sudo to run the command as the user nobody\n- **whoami** displays the name of the current effective user\n- By default, sudo runs commands with elevated privileges unless another user is specified**Output:**\n\nExecute a command as aother user",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Example 3: Run a Command as Another User",
          "snippet": "sudo -u nobody whoami"
        }
      },
      {
        "title": "5. Syntax",
        "content": "- **sudo:** Invokes the command with elevated (administrative) privileges.\n- **[options]:** Optional flags that modify how sudo behaves, such as selecting a user or changing authentication behavior.\n- **command:** The actual command to be executed with elevated permissions.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Syntax",
          "snippet": "sudo [options] command"
        }
      },
      {
        "title": "6. Difference Between sudo and su",
        "content": "Understanding the difference between sudo and su is crucial for secure Linux administration."
      },
      {
        "title": "7. su (Substitute User):",
        "content": "- The su command is used to switch from your current user account to another user account, most commonly the root user. Once switched, you have the full privileges of that user until you exit the session.\n- **Password Required:** You must enter the password of the target user (for example, the root password). This means that every user who wants administrative access must know the root password.\n- **Drawback:** Sharing the root password with multiple users is insecure because anyone with the password can perform any action on the system. There is no audit trail for who ran which commands, making it hard to track administrative activity."
      },
      {
        "title": "8. sudo (Superuser Do):",
        "content": "- The sudo command allows you to run individual commands with administrative privileges without switching to another user account. This makes it easier to perform system tasks safely while remaining in your own user session.\n- **Password Required:** You only need to enter your own user password. The system checks if your account is authorized to use sudo, reducing the risk associated with sharing the root password.\n- **Advantages:** The root password is never shared, so administrative access can be controlled on a per-user basis. All commands run with sudo are logged in system files (usually /var/log/auth.log), allowing administrators to audit who ran what command and when. Allows fine-grained control, so users can be given permission to run only specific commands, instead of full root access."
      },
      {
        "title": "1. -l: List Allowed Commands",
        "content": "The -l option shows which commands the current user is allowed or forbidden to run with sudo. It is useful for checking your privileges without executing any command.\n\n**Command:**\n\n**Output:**\n\nCommands the current user is allowed or forbidden"
      },
      {
        "title": "2. -v: Validate Credentials",
        "content": "The -v option updates your sudo timestamp without running a command. It is useful to extend your sudo session timeout so you don’t need to enter your password for a while.\n\n**Command:**\n\n**Example:**\n\nExtend sudo timeout before running multiple administrative commands:\n\n**Output:**\n\nExtend sudo session timeout"
      },
      {
        "title": "3. -k: Invalidate Timestamp",
        "content": "The -k option forces sudo to ask for a password the next time it is used. It is useful for revoking sudo access temporarily after finishing tasks.\n\n**Command:**\n\n**Example:**\n\nForce password prompt before giving system access to another user:\n\n**Output:**\n\nRevoking sudo access temporarily"
      },
      {
        "title": "4. -u: Run Command as Another User",
        "content": "The -u option allows you to run a command as a user other than root. It is useful when you need to execute commands as a specific user, like www-data or nobody.\n\n**Command:**\n\n**Example:**\n\nCheck permissions of the web server user:\n\n**Output:**\n\nExecute commands as a www-data",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -u: Run Command as Another User",
          "snippet": "sudo -u www-data whoami"
        }
      },
      {
        "title": "5. -s: Run a Shell as Root",
        "content": "The -s option runs a shell with root privileges. It is useful when you need to run multiple administrative commands in sequence without prefixing each with sudo.\n\n**Command:**\n\n**Example:**\n\nList root directory contents after switching to root shell:\n\n**Output:**"
      },
      {
        "title": "6. -H: Set HOME Environment Variable",
        "content": "The -H option sets the HOME environment variable to the target user’s home directory. It is useful to avoid permission issues when running commands that write to configuration files in the user’s home directory.\n\n**Command:**\n\n**Example:**\n\nEdit root’s bash configuration safely:\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. -H: Set HOME Environment Variable",
          "snippet": "sudo -H nano /root/.bashrc"
        }
      },
      {
        "title": "7. -b: Run Command in Background",
        "content": "The -b option runs a command in the background. It is useful for long-running administrative tasks that you don’t want to block the terminal.\n\n**Command:**\n\n**Example:**\n\nStart a 60-second sleep process in the background and confirm that it is running using ps:\n\n**Output:**\n\n60-second sleep process in the background",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. -b: Run Command in Background",
          "snippet": "sudo -b sleep 60"
        }
      },
      {
        "title": "8. -p: Customize Password Prompt",
        "content": "The -p option allows you to display a custom message when sudo asks for a password. It is useful in scripts or automated tasks where you want a clear prompt.\n\n**Command:**\n\n**Example:**\n\nRun a command with a friendly password prompt:\n\n**Output:**\n\nFriendly password prompt",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. -p: Customize Password Prompt",
          "snippet": "sudo -p \"custom_message\" ls /root"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: sudo Command & /etc/sudoers Administrative Access",
      "initialCode": "sudo ls /root",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: sudo Command & /etc/sudoers Administrative Access",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of sudo Command & /etc/sudoers Administrative Access?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to sudo Command & /etc/sudoers Administrative Access",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "sudo Command & /etc/sudoers Administrative Access is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-ifconfig": {
    "id": "linux-ifconfig",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "ifconfig Command: Configuring Network Interfaces",
    "subtitle": "Complete Linux guide to ifconfig Command: Configuring Network Interfaces — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The ifconfig (interface configuration) command is a Linux networking utility used to view and configure network interfaces. It allows administrators to inspect interface details such as IP addresses, MAC addresses, packet statistics and link status.\n\n- Displays network interface details such as IP address, MAC address, MTU and packet statistics\n- Allows administrators to enable or disable network interfaces\n- Helps in monitoring interface activity and diagnosing network problems\n- Can assign IP addresses, netmasks and broadcast addresses\n- Part of the net-tools package, commonly used in traditional Linux systems",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for ifconfig Command: Configuring Network Interfaces."
        }
      },
      {
        "title": "2. Example: Finding Your IP Address in Linux",
        "content": "To view information about all network interfaces on your Linux system\n\n**Command:**\n\n- **ifconfig:** Without arguments displays all active network interfaces\n- Shows important networking information such as IPv4 and IPv6 addresses, MAC address, MTU size, Packet transmission statistics**Output:**\n\nHere,"
      },
      {
        "title": "1. eno1 (Wired / Ethernet Network Interface)",
        "content": "- **eno1:** Your wired LAN (Ethernet) card\n- **UP: **Interface is enabled\n- **RUNNING:** Cable is connected & link is active\n- **BROADCAST: **Can send broadcast packets\n- **MULTICAST: **Supports multicast traffic\n- **mtu 1500: **Maximum data size per packet**Practical use:**\n\n- Used when your laptop is connected via LAN cable\n- MTU value is important for VPN connections, corporate networks and performance tuning**IPv4 Address Information:**\n\n- **inet:** IPv4 address assigned to the interface\n- **netmask: **Defines network range\n- **broadcast: **Address used to communicate with all devices in the network**Practical use:**\n\n- Helps identify which network you are connected to\n- Used while configuring routers, DHCP, static IPs**IPv6 Address:**\n\n- Automatically assigned IPv6 link-local address**Practical use:**\n\n- Required for IPv6 communication\n- Common in modern networks, cloud environments and IoT devices**MAC Address:**\n\n- Hardware address of the network interface.**Practical use:**\n\n- MAC filtering in routers\n- Network access control\n- Device identification**Packet Statistics:**\n\n- **RX (Receive):** Data packets received\n- **TX (Transmit):** Data packets sent**Practical use:**\n\n- Monitor network traffic usage\n- Diagnose network performance issues**Error Indicators:**\n\n- **errors:** Packet errors detected\n- **dropped:** Packets discarded\n- **overruns:** Buffer overflow\n- **frame:** Frame alignment errors**Practical use:**\n\n- Detect faulty cables\n- Identify driver problems\n- Diagnose hardware interference",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. eno1 (Wired / Ethernet Network Interface)",
          "snippet": "eno1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500"
        }
      },
      {
        "title": "2. lo (Loopback Interface)",
        "content": "- **lo: **Loopback interface\n- Used for internal system communication\n- 127.0.0.1 refers to localhost**Practical use:**\n\n- Test services locally\n- Run applications or servers on the same machine",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. lo (Loopback Interface)",
          "snippet": "lo: flags=73<UP,LOOPBACK,RUNNING> mtu 65536inet 127.0.0.1"
        }
      },
      {
        "title": "3. wlp0s20f3 (Wireless / Wi-Fi Interface)",
        "content": "Wireless network interface used for Wi-Fi connections\n\n- Your Wi-Fi adapter\n- Active and connected**Practical use:**\n\n- Provides wireless internet connectivity\n- Often used in Kali Linux for wireless penetration testing",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. wlp0s20f3 (Wireless / Wi-Fi Interface)",
          "snippet": "wlp0s20f3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>inet 10.143.75.50"
        }
      },
      {
        "title": "6. Syntax",
        "content": "- **interface:** Name of the network interface you want to configure or display information for (e.g., eth0, wlan0).\n- **options:** Various command-line options that can be used to modify the behavior of ifconfig.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Syntax",
          "snippet": "ifconfig [interface] [options]"
        }
      },
      {
        "title": "7. Installing ifconfig (net-tools)",
        "content": "Many modern Linux distributions do not include ifconfig by default. If you see the error. You need to install the net-tools package."
      },
      {
        "title": "8. For Debian, Ubuntu and related Linux distributions.",
        "content": "Command examples and usage details for **For Debian, Ubuntu and related Linux distributions.**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. For Debian, Ubuntu and related Linux distributions.",
          "snippet": "sudo apt install net-tools"
        }
      },
      {
        "title": "9. For RHEL (Red Hat Enterprise Linux) based Distributions",
        "content": "Command examples and usage details for **For RHEL (Red Hat Enterprise Linux) based Distributions**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. For RHEL (Red Hat Enterprise Linux) based Distributions",
          "snippet": "dnf install net-tools"
        }
      },
      {
        "title": "10. Options available in `ifconfig` Command",
        "content": "Option\n\nDescription\n\nSyntax\n\n-a\n\nDisplay all interfaces, including those that are down\n\nifconfig -a\n\n-s\n\nDisplay a short list, instead of details\n\nifconfig -s\n\n-v\n\nRun the command in verbose mode\n\nifconfig -v\n\nup\n\nActivate the driver for the given interface\n\nifconfig interface up\n\ndown\n\nDeactivate the driver for the given interface\n\nifconfig interface down\n\nadd addr/prefixlen\n\nAdd an IPv6 address to an interface\n\nifconfig interface add addr/prefixlen\n\ndel addr/prefixlen\n\nRemove an IPv6 address from an interface\n\nifconfig interface del addr/prefixlen\n\n[-]arp\n\nEnable/disable the use of ARP protocol on an interface\n\nifconfig interface [-]arp\n\n[-]promisc\n\nEnable/disable promiscuous mode on an interface\n\nifconfig interface [-]promisc\n\n[-]allmulti\n\nEnable/disable all-multicast mode for an interface\n\nifconfig interface [-]allmulti\n\nmtu N\n\nSet the Maximum Transfer Unit (MTU)\n\nifconfig interface mtu size\n\n--help\n\nDisplay help related to the ifconfig command\n\nifconfig --help"
      },
      {
        "title": "11. Public IP Address in Linux",
        "content": "A public IP address is a globally unique identifier assigned to a device that is directly connected to the internet. It enables other devices and services on the internet to locate and communicate with that device. Public IP addresses are assigned by the Internet Assigned Numbers Authority (IANA) through Internet Service Providers (ISPs) and are globally route table across the internet.\n\nPublic IPs are commonly required for:\n\n- Web servers and website hosting services\n- Cloud servers, APIs and online applications\n- Systems that need to be accessed from outside a local network"
      },
      {
        "title": "12. Example: Viewing the Public IP Address in Linux",
        "content": "Linux systems can retrieve the public IP address by querying external web services using command-line tools.\n\n**Command:**\n\n- This command retrieves your public IP address from a web service.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Example: Viewing the Public IP Address in Linux",
          "snippet": "curl ifconfig.me"
        }
      },
      {
        "title": "13. Methods to Display the Public IP Address",
        "content": "**1. Using wget with ifconfig.me**\n\n**Command:**\n\n**Output:**\n\nUsing `wget` with `ifconfig.me` to Find Your IP Address in Linux**2. Using dig with OpenDNS**\n\nThis command uses the OpenDNS resolver to query your public IP address.\n\n**Command:**\n\n**Output:**\n\nUsing `dig` with `resolver1.opendns.com` to Find Your IP Address in Linux**3. Using curl with icanhazip.com**\n\nThis command queries the icanhazip.com service to obtain your public IP address.\n\n**Command:**\n\n**Output:**\n\nUsing `curl` with `icanhazip.com`to Find Your IP Address in Linux**4. Using wget with icanhazip.com**\n\nSimilar to the curl command, this uses the icanhazip.com service to fetch your public IP address.\n\n**Command:**\n\n**Output:**\n\nUsing `wget` with `icanhazip.com` to Find Your IP Address in Linux**5. Using Google/OpenDNS resolver**\n\nThis command utilizes the DNS service provided by Google to resolve your public IP address.\n\n**Command:**\n\n**Output:**\n\nUsing host with dns.google to Find Your IP Address in Linux",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Methods to Display the Public IP Address",
          "snippet": "wget -qO- ifconfig.me"
        }
      },
      {
        "title": "14. Private IP Address in Linux",
        "content": "A private IP address is used within a local network such as a home, office or organizational intranet. These addresses are not directly accessible from the internet. Private IP addresses are defined by the Internet Engineering Task Force (IETF) in RFC 1918 and are reserved exclusively for internal networking."
      },
      {
        "title": "15. Private IP Address Ranges",
        "content": "- 10.0.0.0 – 10.255.255.255 (10.0.0.0/8)\n- 172.16.0.0 – 172.31.255.255 (172.16.0.0/12)\n- 192.168.0.0 – 192.168.255.255 (192.168.0.0/16)Devices inside the same private network can communicate directly using these addresses. To access the internet, private IPs rely on Network Address Translation (NAT), which maps them to a shared public IP."
      },
      {
        "title": "16. Example: Viewing Private IP Addresses in Linux",
        "content": "Linux provides multiple tools to display private IP addresses assigned to network interfaces.\n\n**Command:**\n\nor"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: ifconfig Command: Configuring Network Interfaces",
      "initialCode": "eno1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: ifconfig Command: Configuring Network Interfaces",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of ifconfig Command: Configuring Network Interfaces?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to ifconfig Command: Configuring Network Interfaces",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "ifconfig Command: Configuring Network Interfaces is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-ip-cmd": {
    "id": "linux-ip-cmd",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "ip Command: Managing IP Addresses, Routes & Links",
    "subtitle": "Complete Linux guide to ip Command: Managing IP Addresses, Routes & Links — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The ip command in Linux is used to configure and manage network interfaces, IP addresses, and routing. It is part of the iproute2 package and replaces older networking tools like ifconfig and route.\n\n- Displays and manages IP addresses and network interfaces.\n- Used to configure routing tables and network rules.\n- Supports both IPv4 and IPv6 networking.\n- Provides detailed and real-time network information.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for ip Command: Managing IP Addresses, Routes & Links."
        }
      },
      {
        "title": "2. [Example]: Displaying Network Interfaces and IP Addresses",
        "content": "**Command:**\n\n**Output:**\n\ndisplaying network interface This command displays details such as interface names (`eth0`, `wlan0`), MAC addresses, IPv4 and IPv6 addresses, subnet masks, and more.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. [Example]: Displaying Network Interfaces and IP Addresses",
          "snippet": "ip addr show"
        }
      },
      {
        "title": "3. Syntax",
        "content": "**Where:**\n\n- **OPTIONS:** Additional options that modify the behavior of the command.\n- **OBJECT**: The networking component you want to interact with (e.g., link, address, route).\n- **COMMAND: **The action you want to perform on the specified object.\n- **help:** Displays help information about the specified object or command.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "ip [OPTIONS] OBJECT {COMMAND | help}"
        }
      },
      {
        "title": "4. [Approach 1]: Configuring Network Interfaces",
        "content": "**For example: to set the IP address of an interface:**\n\nThe IP address `192.168.1.100` with a subnet mask of `24` (equivalent to 255.255.255.0) to the eth0 interface.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. [Approach 1]: Configuring Network Interfaces",
          "snippet": "sudo ip addr add 192.168.1.100/24 dev eth0"
        }
      },
      {
        "title": "5. [Approach 2]: Managing Routing Tables Using 'ip' Command",
        "content": "**Example 1: Deleting a Route**\n\nThis command removes the route to the `10.0.0.0/24` network via the gateway `192.168.1.1` through the `eth0` interface.\n\n**Example 2: Changing the Default Gateway**\n\nThis command sets `192.168.1.254` as the new default gateway through the `eth0` interface.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. [Approach 2]: Managing Routing Tables Using 'ip' Command",
          "snippet": "sudo ip route delete 10.0.0.0/24 via 192.168.1.1 dev eth0"
        }
      },
      {
        "title": "6. [Approach 3]: Changing Interface State",
        "content": "**Example 1: Bringing an Interface Up**\n\nThis command brings the `eth0` interface up, enabling it to send and receive network traffic.\n\n**Example 2: Changing MTU (Maximum Transmission Unit)**\n\nThis command sets the MTU of the `eth0` interface to `1500` bytes.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. [Approach 3]: Changing Interface State",
          "snippet": "sudo ip link set eth0 up"
        }
      },
      {
        "title": "7. [Approach 4]: Displaying Detailed Interface Statistics",
        "content": "**Example 1: Monitoring Interface Traffic**\n\nThis command continuously monitors the receive (RX) traffic on the `eth0` interface, updating every second.\n\n**Example 2: Displaying Interface Errors**\n\nThis command shows statistics related to packet errors and dropped packets on the eth0 interface.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. [Approach 4]: Displaying Detailed Interface Statistics",
          "snippet": "watch -n 1 \"ip -s link show eth0 | grep 'RX bytes'\""
        }
      },
      {
        "title": "8. Options available in the IP command",
        "content": "Options\n\nDescription\n\nExample Usage\n\naddress\n\nShow all IP addresses associated with all network devices.\n\nip address\n\nShow information related to a specific interface.\n\nip address show (interface)\n\nlink\n\nDisplay link layer information, including characteristics of link layer devices currently available.\n\nip link\n\nShow statistics of various network interfaces.\n\nip -s link\n\nShow statistics of a specific network interface.\n\nip -s link show (interface)\n\nroute\n\nDisplay routing table, showing the route packets your network will take.\n\nip route\n\nadd\n\nAssign an IP address to an interface.\n\nip a add (ip_address) dev (interface)\n\ndel\n\nDelete an assigned IP address from an interface.\n\nip a del (ip_address) dev (interface)\n\nup\n\nEnable a network interface.\n\nip link set (interface) up\n\ndown\n\nDisable a network interface.\n\nip link set (interface) down\n\nmonitor\n\nMonitor and display the state of devices, addresses, and routes continuously.\n\nip monitor\n\nhelp\n\nDisplay help information about the `ip` command.\n\nip help\n\nneighbour\n\nView MAC address of devices connected to the system.\n\nip neighbour"
      },
      {
        "title": "1. address",
        "content": "This option is used to show all IP addresses associated with all network devices.\n\n**Command:**\n\n**Output:**\n\nip addressThis will show the information related to all interfaces available on our system.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. address",
          "snippet": "ip address"
        }
      },
      {
        "title": "2. link",
        "content": "It is used to display link layer information; it will fetch characteristics of the link layer devices currently available. Any networking device which has a driver loaded can be classified as an available device.\n\n**Command:**\n\n**Output:**\n\nip link This link option when used with -s option is used to show the statistics of the various network interfaces.\n\n**Command:**\n\n**Output:**\n\nip -s link And, to get information about a particular network interface, add an option show followed by the name of the particular network interface.\n\n**For Example:**\n\n**Output:**\n\nip -s link show enp3s0"
      },
      {
        "title": "3. monitor",
        "content": "This command can monitor and display the state of devices, addresses and routes continuously.\n\n**Command:**\n\n**Output:**\n\nip monitor",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. monitor",
          "snippet": "ip monitor"
        }
      },
      {
        "title": "4. neighbour",
        "content": "This command is used to view the MAC address of the devices connected to your system.\n\n**Command:**\n\n**Output:**\n\nip neighbour\n- **STABLE: **This means that the neighbor is valid, but is probably already unreachable, so the kernel will try to check it at the first transmission.\n- **REACHABLE:** This means that the neighbor is valid and reachable.\n- **DELAY: **This means that a packet has been sent to the stable neighbor and the kernel is waiting for confirmation.Delete an ARP entry:\n\n**For Example:**\n\n**Add an ARP entry:**\n\n**For Example:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. neighbour",
          "snippet": "ip neighbour"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: ip Command: Managing IP Addresses, Routes & Links",
      "initialCode": "ip addr show",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: ip Command: Managing IP Addresses, Routes & Links",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of ip Command: Managing IP Addresses, Routes & Links?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to ip Command: Managing IP Addresses, Routes & Links",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "ip Command: Managing IP Addresses, Routes & Links is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-nmcli": {
    "id": "linux-nmcli",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "26 min read",
    "level": "Intermediate",
    "title": "nmcli Command: NetworkManager CLI Control",
    "subtitle": "Complete Linux guide to nmcli Command: NetworkManager CLI Control — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Network connectivity is a fundamental requirement for any Linux system, especially in servers and headless environments where graphical tools are not available. The nmcli (Network Manager Command-Line Interface) is a command-line utility used to manage network connections through the terminal.\n\n- Manage network connections (create, modify, delete, activate, deactivate)\n- Display detailed status of network devices and connections\n- Works without a graphical interface (ideal for servers and headless systems)\n- Supports automation and scripting for network management tasks\n- Provides flexible and structured control over NetworkManager operations",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for nmcli Command: NetworkManager CLI Control."
        }
      },
      {
        "title": "2. Example 1: List All Network Connections",
        "content": "Displays all saved network configurations on the system. Helps identify available connections along with details like name, UUID, type, and associated device.\n\n**Command:**\n\n- **nmcli:** Invokes the NetworkManager command-line tool\n- **connection:** Targets saved network connections\n- **show:** Displays details of all connections**Output:**\n\nViewing connections",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example 1: List All Network Connections",
          "snippet": "nmcli connection show"
        }
      },
      {
        "title": "3. Example 2: Check Device Status",
        "content": "Shows the current state of all network devices. Helps identify whether devices are connected or disconnected along with additional information like the device type and the connection type it is associated with.\n\n**Command:**\n\n- **nmcli:** Runs the NetworkManager CLI tool\n- **dev:** Refers to network devices\n- **status:** Shows current device state**Output:**\n\ncheck device status",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example 2: Check Device Status",
          "snippet": "nmcli dev status"
        }
      },
      {
        "title": "4. Example 3: Display Device Details",
        "content": "Shows detailed information about a specific network device. Useful for checking IP address, MAC address, driver details, and other configuration data.\n\n**Command:**\n\n- **nmcli:** Runs the NetworkManager CLI tool\n- **device:** Targets network devices\n- **show:** Displays detailed information\n- **eno1:** Specifies the device name (replace with your actual interface)**Output:**\n\nDisplay Device Details",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Example 3: Display Device Details",
          "snippet": "nmcli device show eno1"
        }
      },
      {
        "title": "5. Example 4: Add a New Ethernet Connection",
        "content": "Creates a new network connection for a specified interface. Useful for setting up a new network or configuring additional interfaces on the system.\n\n**Syntax:**\n\n- **connection_type:** Specifies the type of connection (e.g., ethernet, wifi)\n- **interface_name:** Name of the network interface\n- **connection_name:** User-defined name for the connection**Command:**\n\n- **nmcli:** Invokes the NetworkManager CLI tool\n- **connection:** Targets connection management\n- **add:** Creates a new connection\n- **type ethernet:** Specifies connection type\n- **ifname eth1:** Defines the network interface\n- **con-name my_eth_connection:** Assigns a custom name**Output:**\n\nAdding new ethernet connection\n- This command creates a new Ethernet connection named \"my_eth_connection\" associated with the network interface \"eth1\". Adjust the interface name and connection name as needed.**Verification Command:**\n\n**Output:**\n\nnmcli connection show",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Example 4: Add a New Ethernet Connection",
          "snippet": "nmcli connection add type <connection_type> ifname <interface_name> con-name <connection_name>"
        }
      },
      {
        "title": "6. Example 5: Modify Connection Settings",
        "content": "Modifies the settings of an existing network connection. Commonly used to configure static IP addresses, gateway, and other network parameters.\n\n**Syntax:**\n\n- **connection_name:** Name of the connection to modify\n- **setting_name:** Network parameter to change (e.g., ipv4.addresses)\n- **setting_value:** New value for the specified setting**Command:**\n\n- **nmcli:** Invokes the NetworkManager CLI tool\n- **connection:** Targets connection management\n- **modify:** Updates an existing connection\n- **my_eth_connection:** Specifies the connection name\n- **ipv4.addresses \"192.168.1.2/24\":** Sets static IP with subnet mask\n- **ipv4.gateway \"192.168.1.1\":** Defines the gateway address**Note:** Changes may require reactivating the connection to take effect\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Example 5: Modify Connection Settings",
          "snippet": "nmcli connection modify <connection_name> <setting_name> <setting_value>"
        }
      },
      {
        "title": "7. Syntax",
        "content": "- **OPTIONS:** Modify the behavior of the command or the format of its output\n- **OBJECT:** Specifies the target for the operation.\n- **COMMAND:** Defines the action to perform on the specified object, for example show, add, or modify**Common OBJECT Values**\n\n- **nm:** Shows NetworkManager status\n- **connection or con:** Manages network connections\n- **device or dev:** Manages network devices",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Syntax",
          "snippet": "nmcli [OPTIONS] OBJECT { COMMAND | help }"
        }
      },
      {
        "title": "1. -t, --terse",
        "content": "Displays output in a compact, machine-readable format by removing headers and formatting.\n\n- Useful for scripting and automation where clean, parseable output is required\n- Reduces unnecessary text and presents data in a simple delimiter-based format\n- Commonly used in shell scripts for extracting values**Syntax:**\n\n**Example: Display Device Status in Pretty Format**\n\nShows formatted output with headings and aligned columns.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -t, --terse",
          "snippet": "nmcli -t <object> <command>"
        }
      },
      {
        "title": "2. -p, --pretty",
        "content": "Displays output in a well-structured and human-readable format with headings and spacing.\n\n- Improves readability when working directly in the terminal\n- Adds formatting such as section headers and aligned columns\n- Useful for manual inspection of network details**Syntax:**\n\n**Example: Display Device Status in Pretty Format**\n\nShows formatted output with headings and aligned columns.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -p, --pretty",
          "snippet": "nmcli -p <object> <command>"
        }
      },
      {
        "title": "3. -m, --mode {tabular | multiline}",
        "content": "Controls how output is displayed by switching between tabular (default) and multiline formats.\n\n- **tabular:** shows data in rows and columns\n- **multiline:** shows each field on a separate line for detailed viewing\n- Useful when working with detailed device or connection information**Syntax:**\n\n**Example: Display Device Details in Multiline Format**\n\nShows detailed information where each field is printed on a separate line.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -m, --mode {tabular | multiline}",
          "snippet": "nmcli -m {tabular | multiline} <object> <command>"
        }
      },
      {
        "title": "4. -f, --fields",
        "content": "Displays only selected fields from the output instead of showing all available information.\n\n- Helps in filtering specific data fields\n- Reduces clutter when only limited information is required\n- Can use all to display all fields or common for commonly used fields**Syntax:**\n\n**Example: Display Only General Device Information**\n\nShows only GENERAL fields for each device.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -f, --fields",
          "snippet": "nmcli -f <field_names> <object> <command>"
        }
      },
      {
        "title": "5. -v, --version",
        "content": "Displays the installed version of the nmcli tool.\n\n- Useful for checking compatibility and debugging issues\n- Helps verify installed NetworkManager version**Syntax:**\n\n**Output:**"
      },
      {
        "title": "6. -h, --help",
        "content": "Displays help information about nmcli commands and usage.\n\n- Provides a quick reference for syntax and available options\n- Useful for beginners and troubleshooting command usage**Syntax:**\n\n**Output:**\n\nComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: nmcli Command: NetworkManager CLI Control",
      "initialCode": "nmcli connection show",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: nmcli Command: NetworkManager CLI Control",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of nmcli Command: NetworkManager CLI Control?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to nmcli Command: NetworkManager CLI Control",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "nmcli Command: NetworkManager CLI Control is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-ping": {
    "id": "linux-ping",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "ping Command: Testing Network Connectivity",
    "subtitle": "Complete Linux guide to ping Command: Testing Network Connectivity — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The ping command is a network utility used to test the reachability of a host and measure the time it takes for packets to travel to and from that host. It helps diagnose network connectivity issues by sending ICMP Echo Request packets and analyzing the responses.\n\n- Sends ICMP Echo Requests to check if a system or server is reachable.\n- Measures round-trip time (RTT) for packets to travel between devices.\n- Helps identify packet loss, network delays, or connection failures.\n- Commonly used for troubleshooting DNS, routing, and basic network health.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for ping Command: Testing Network Connectivity."
        }
      },
      {
        "title": "2. Example: Checking Internet Connection in Linux",
        "content": "To check internet connection, this command sends ICMP echo requests to google.com to check if the website is reachable and displays the response time for each packet.\n\n**Command:**\n\n**Output:**\n\nThe internet connection to www.google.com is working correctly with 0% packet loss, successful transmission and reception of 4 packets, and low round-trip time (RTT) values averaging 1.264 ms, indicating a responsive and stable connection.\n\ntesting internet connection using ping command\n- **min:** minimum time to get a response\n- **avg:** average time to get responses\n- **max:** maximum time to get a response",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Checking Internet Connection in Linux",
          "snippet": "ping www.google.com"
        }
      },
      {
        "title": "3. Syntax",
        "content": "- **[options]:** Flags to control behavior (number of packets, timeout, interval, etc.)\n- **destination:** The hostname or IP address of the target system you want to ping.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "ping [OPTION] <destination>"
        }
      },
      {
        "title": "1. -c COUNT: Specifying the Number of Pings",
        "content": "Specifies the number of ICMP packets to send before stopping.\n\n- By default, ping runs continuously.\n- This option is useful when you want limited output or quick testing.**Example: Send 2 ping requests**\n\n**Command:**\n\n**Output:**\n\nSpecify the number of pings in Linux",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -c COUNT: Specifying the Number of Pings",
          "snippet": "ping -c 2 www.geeksforgeeks.org"
        }
      },
      {
        "title": "2. -s SIZE: Controlling Packet Size",
        "content": "Sets the size of the packet payload to be sent.\n\n- Useful for testing network performance and packet fragmentation.\n- Helps simulate different traffic conditions.**Example: Send packets of size 40 bytes**\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -s SIZE: Controlling Packet Size",
          "snippet": "ping -s 40 -c 5 www.geeksforgeeks.org"
        }
      },
      {
        "title": "3. -i INTERVAL: Changing the Time Interval Between Pings",
        "content": "Modifies the delay (in seconds) before sending the next packet.\n\n- Default interval is 1 second.\n- Useful for slowing down or speeding up ping requests.**Example: Set interval to 2 seconds**\n\n**Command:**\n\n**Output:**\n\nChanging time interval in Ping Command",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -i INTERVAL: Changing the Time Interval Between Pings",
          "snippet": "ping -i 2 www.geeksforgeeks.org"
        }
      },
      {
        "title": "4. -q: Showing Only Summary Output",
        "content": "Displays only the summary of the ping results.\n\n- Hides individual packet responses.\n- Useful for getting a quick overview of packet loss and statistics.**Example: Show summary for 5 packets**\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -q: Showing Only Summary Output",
          "snippet": "ping -c 5 -q www.geeksforgeeks.org"
        }
      },
      {
        "title": "5. -w DEADLINE: Setting a Ping Timeout",
        "content": "Sets the total time (in seconds) ping should run.\n\n- Ping stops automatically after the specified duration.\n- Useful for time-based network testing.**Example: Run ping for 3 seconds**\n\nThis command instructs the system to stop pinging the specified website (www.geeksforgeeks.org) after waiting for 3 seconds.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. -w DEADLINE: Setting a Ping Timeout",
          "snippet": "ping -w 3 www.geeksforgeeks.org"
        }
      },
      {
        "title": "6. -f: Flood Ping",
        "content": "Enables flood ping mode.\n\n- Sends packets as fast as possible.\n- Useful for stress testing network performance (requires root privileges).**Example: Flood ping a host**\n\nThis command floods the network with PING packets directed at www.geeksforgeeks.org, providing a means to assess and test network performance.\n\n**Command:**\n\n**Output:**\n\nflooding with ping",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. -f: Flood Ping",
          "snippet": "ping -f www.geeksforgeeks.org"
        }
      },
      {
        "title": "7. -W TIMEOUT: Setting Maximum Wait Time for a Response",
        "content": "Sets the maximum time to wait for each reply.\n\n- If no response is received within the given time, the packet is considered lost.\n- Useful for slow or unstable networks.**Example: Wait 3 seconds for each reply**\n\nThis command configures the system to wait for a response for a maximum of 3 seconds while sending 5 PING requests to `www.geeksforgeeks.org`.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. -W TIMEOUT: Setting Maximum Wait Time for a Response",
          "snippet": "ping -c 5 -W 3 www.geeksforgeeks.org"
        }
      },
      {
        "title": "8. -p PATTERN: Filling Packets with Custom Data",
        "content": "Fills packets with a specific hexadecimal pattern.\n\n- Useful for debugging and detecting data-dependent issues.\n- Helps identify transmission errors.**Example: Fill packets with ff**\n\nThis command fills PING packets sent to `www.geeksforgeeks.org` with the specified data, in this case, ones (represented by `ff`).\n\n**Command:**\n\n**Output:**\n\nFill Packet with Data",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. -p PATTERN: Filling Packets with Custom Data",
          "snippet": "ping -c 5 -p ff www.geeksforgeeks.org"
        }
      },
      {
        "title": "9. -M OPTION: Enabling Path MTU Discovery",
        "content": "Controls Path MTU Discovery behavior.\n\n- Helps determine the maximum packet size that can travel without fragmentation.\n- Useful for diagnosing MTU-related issues.**Options:**\n\n- **do:** prohibit fragmentation\n- **want:** allow fragmentation if needed\n- **dont:** disable MTU discovery**Example: Enable PMTU discovery**\n\nThis command initiates Path MTU Discovery for the specified website (`www.geeksforgeeks.org`) with the option to either prohibit fragmentation (`do`), perform PMTU discovery with local fragmentation when needed (`want`), or not set the DF flag (`dont`).\n\n**Command:**\n\n**Output:**\n\nPath Mtu Discovery",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. -M OPTION: Enabling Path MTU Discovery",
          "snippet": "ping -c 5 -M want www.geeksforgeeks.org"
        }
      },
      {
        "title": "13. Other Examples",
        "content": "Here are a few more examples to help you thoroughly understand the ping command and verify network connectivity:"
      },
      {
        "title": "1. Ping an IP Address",
        "content": "- This checks basic network connectivity to Google’s public DNS server using its IP address.\n- If this works but ping google.com fails, it usually means DNS (name resolution) is the problem, not the internet.**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Ping an IP Address",
          "snippet": "ping 8.8.8.8"
        }
      },
      {
        "title": "2. Ping a Host Only Once",
        "content": "- Sends just one request to check if the host is reachable.\n- Useful for quick checks in scripts or automation without flooding the network.**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Ping a Host Only Once",
          "snippet": "ping -c 1 google.com"
        }
      },
      {
        "title": "3. Ping with Audible Alerts",
        "content": "- Plays a beep sound whenever a reply is received (or sometimes on changes).\n- Useful when you want to monitor connectivity while doing other work, without staring at the screen.**Command:**\n\n**Note :** Beep may not be supported on all devices and Distributions\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Ping with Audible Alerts",
          "snippet": "ping -a google.com"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: ping Command: Testing Network Connectivity",
      "initialCode": "ping www.google.com",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: ping Command: Testing Network Connectivity",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of ping Command: Testing Network Connectivity?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to ping Command: Testing Network Connectivity",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "ping Command: Testing Network Connectivity is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-netstat": {
    "id": "linux-netstat",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "30 min read",
    "level": "Intermediate",
    "title": "netstat Command: Monitoring Network Connections",
    "subtitle": "Complete Linux guide to netstat Command: Monitoring Network Connections — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The netstat command stands for network statistics. It is used to display various network-related information such as active connections, listening ports, routing tables, and interface statistics. System administrators commonly use netstat to monitor network activity and diagnose networking issues.\n\n- Find the process (PID) using a particular network port.\n- Monitor protocol statistics for TCP, UDP, and other protocols.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for netstat Command: Monitoring Network Connections."
        }
      },
      {
        "title": "2. Example 1: Display All Network Connections",
        "content": "To list all active network connections and listening ports on the system.\n\n**Command:**\n\n- -a Displays all sockets, including listening and non-listening connections.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example 1: Display All Network Connections",
          "snippet": "netstat -a"
        }
      },
      {
        "title": "3. Example 2: Display Listening TCP and UDP Ports",
        "content": "Displays all TCP and UDP ports that are currently in the LISTEN state. It is commonly used by system administrators to quickly identify which services are accepting incoming network connections on the system.\n\n**Command:**\n\n- **-t:** Displays TCP connections.\n- **-u:** Displays UDP connections.\n- **-l:** Shows only listening sockets.\n- **-n:** Displays addresses and port numbers in numeric format instead of resolving service names.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example 2: Display Listening TCP and UDP Ports",
          "snippet": "netstat -tuln"
        }
      },
      {
        "title": "4. Syntax",
        "content": "- **netstat:** The command used to display network-related information.\n- **[options]:** Optional flags that modify the output. Multiple options can be combined to filter or refine results.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Syntax",
          "snippet": "netstat [options]"
        }
      },
      {
        "title": "1. -a: Display All Connections and Listening Ports",
        "content": "The -a option displays all network sockets, including both listening ports and established connections. Use this option when you need a complete overview of network activity on the system.\n\n**Command:**\n\n**Output:**\n\n**Example: Get Port on Which a Program is Running**\n\nTo find the port on which a specific program, in this case, SSH, is running, use this command.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -a: Display All Connections and Listening Ports",
          "snippet": "netstat -a"
        }
      },
      {
        "title": "2. -t: Display TCP Connections",
        "content": "The -t option displays only TCP connections. This option is useful when troubleshooting services that use the TCP protocol, such as SSH, HTTP, and FTP.\n\n**Syntax:**\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -t: Display TCP Connections",
          "snippet": "netstat -t"
        }
      },
      {
        "title": "3. -u: Display UDP Connections",
        "content": "The -u option displays only UDP connections. This is helpful when monitoring services such as DNS or DHCP that use the UDP protocol.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -u: Display UDP Connections",
          "snippet": "netstat -au"
        }
      },
      {
        "title": "4. -l : Display Listening Ports",
        "content": "The -l option displays only the ports that are currently listening for incoming connections. This helps administrators identify active services on the system.\n\n**Command:**\n\n**Output:**\n\n**Example 1: List Only Listening TCP Ports**\n\nNarrowing it down further, this command specifically lists the TCP ports that are in a listening state.\n\n**Command:**\n\n**Output:**\n\n**Example 2: List Only Listening UDP Ports**\n\nSimilarly, this command focuses on displays only the UDP ports that are actively listening.\n\n**Command:**\n\nTo list only the listening udp ports.\n\n**Output:**\n\n**Example 3: List Only Listening UNIX Ports**\n\nFor those working with UNIX systems, this option shows only the UNIX ports that are in a listening state.\n\n**Command:**\n\nTo list only the listening UNIX ports.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -l : Display Listening Ports",
          "snippet": "netstat -l"
        }
      },
      {
        "title": "5. -p: Display Process ID and Program Name",
        "content": "The -p option displays the Process ID (PID) and program name associated with each network connection. Root privileges are usually required to view this information.\n\n**Syntax:**\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. -p: Display Process ID and Program Name",
          "snippet": "netstat -p"
        }
      },
      {
        "title": "6. -n : Display Numerical Addresses",
        "content": "The -n option displays IP addresses and port numbers in numeric form instead of resolving them to hostnames. This speeds up the command output and avoids DNS lookups.\n\n**Syntax:**\n\n**Example: Identify Process Using a Particular Port**\n\nThis command helps identify the process associated with a given port, such as port 80 in this example.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. -n : Display Numerical Addresses",
          "snippet": "netstat -n"
        }
      },
      {
        "title": "7. -r: Display Kernel Routing Table",
        "content": "The -r option displays the kernel routing table, showing the destination network, gateway, and network interface.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. -r: Display Kernel Routing Table",
          "snippet": "netstat -r"
        }
      },
      {
        "title": "8. -i : Display Network Interfaces",
        "content": "The -i option displays information about network interfaces configured on the system.\n\n**Command:**\n\n**Output:**\n\n**Example: Display Extended Information on Interfaces**\n\nFor extended information on interfaces, similar to the output of the ifconfig command, use this option to gain comprehensive insights.\n\n**Command:**\n\nTo display extended information on the interfaces\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. -i : Display Network Interfaces",
          "snippet": "netstat -i"
        }
      },
      {
        "title": "9. -s : Display Network Statistics",
        "content": "The -s option displays detailed network statistics for each protocol, including TCP, UDP, and IP.\n\n**Command:**\n\n**Output:**\n\n**Example 1: List Statistics for TCP Ports**\n\nFor a more specific breakdown, this command displays statistics exclusively for TCP ports.\n\n**Command:**\n\nTo list the statistics for TCP ports.\n\n**Output:**\n\n**Example 2: List Statistics for UDP Ports**\n\nSimilarly, this command focuses on the statistical information related to UDP ports.\n\n**Command:**\n\nList the statistics for UDP ports.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. -s : Display Network Statistics",
          "snippet": "netstat -s"
        }
      },
      {
        "title": "10. -c : Continuous Network Monitoring",
        "content": "The -c option continuously refreshes the netstat output, displays updated network information at regular intervals.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. -c : Continuous Network Monitoring",
          "snippet": "netstat -c"
        }
      },
      {
        "title": "11. --verbose : Display Unsupported Address Families",
        "content": "The --verbose option displays additional information about address families that are not supported by the kernel.\n\n**Command:**\n\nTo get the non-supportive address families in the system.\n\n**Output:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. --verbose : Display Unsupported Address Families",
          "snippet": "netstat --verbose"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: netstat Command: Monitoring Network Connections",
      "initialCode": "netstat -tuln",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: netstat Command: Monitoring Network Connections",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of netstat Command: Monitoring Network Connections?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to netstat Command: Monitoring Network Connections",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "netstat Command: Monitoring Network Connections is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-ss-cmd": {
    "id": "linux-ss-cmd",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "ss Command: Inspecting Socket Statistics",
    "subtitle": "Complete Linux guide to ss Command: Inspecting Socket Statistics — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The ss command (Socket Statistics) is an important Linux utility used to display detailed information about network sockets. It helps analyze network connections, monitor open ports and troubleshoot connectivity issues efficiently. The command provides details about TCP, UDP and other socket types, including their states and associated processes. Due to its speed and efficiency, it is widely used as a modern replacement for netstat.\n\n- Displays detailed information about network sockets\n- Shows TCP, UDP, RAW and other connection types\n- Helps analyze active connections and listening ports\n- Useful for debugging network and performance issues\n- Faster and more efficient than older tools like netstat",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for ss Command: Inspecting Socket Statistics."
        }
      },
      {
        "title": "2. Example: List All Sockets",
        "content": "The ss command without any options displays a list of all sockets along with their connection details.\n\n**Command:**\n\n**Output:**\n\n- **State:** Indicates the current status of the socket, such as LISTEN (waiting for connections) or ESTABLISHED (active communication between systems)\n- **Recv-Q / Send-Q:** Shows the amount of data queued for receiving or sending, which helps identify delays or bottlenecks in communication\n- **Local Address:Port:** Displays the IP address and port number on your system where the socket is created or listening for connections\n- **Peer Address:Port -** Represents the remote system’s IP address and port number connected to your machine\n- **Protocol Type:** Specifies the communication protocol used by the socket, such as TCP (connection-oriented) or UDP (connectionless"
      },
      {
        "title": "3. Syntax",
        "content": "- **[options]:** Flags that modify the output, such as filtering by protocol, state or address",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "ss [options]"
        }
      },
      {
        "title": "4. Options Available in the `ss` command Linux",
        "content": "Options\n\nDescription\n\n-t\n\nDisplay TCP sockets\n\n-u\n\nDisplay UDP sockets\n\n-l\n\nDisplay listening sockets\n\n-a\n\nDisplay all sockets (listening and non-listening)\n\n-e\n\nDisplay detailed information (including users)\n\n-i\n\nDisplay internal information\n\n-n\n\nShow numerical addresses instead of resolving\n\n-r\n\nDisplay the routing table\n\n-s\n\nDisplay summary statistics\n\n-4\n\nDisplay only IPv4 sockets\n\n-6\n\nDisplay only IPv6 sockets\n\n-o\n\nShow timers\n\n-p\n\nShow process information\n\n-P\n\nShow process statistics\n\n--timewait\n\nDisplay TIME-WAIT sockets\n\n--listening\n\nDisplay listening sockets\n\n--all\n\nDisplay all sockets (listening and non-listening)\n\n--numeric\n\nShow numerical addresses instead of resolving\n\n--extended\n\nDisplay extended socket information\n\n--resolve\n\nResolve hostnames\n\n--processes\n\nDisplay process information\n\n--processes-raw\n\nDisplay process information in raw format\n\n--summary\n\nDisplay summary statistics"
      },
      {
        "title": "1. -t: Display TCP Sockets",
        "content": "Shows only TCP (Transmission Control Protocol) sockets, which are connection-oriented and ensure reliable data transfer. This is particularly useful for monitoring web servers, SSH sessions or other services that require a stable connection.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "2. -u: Display UDP Sockets",
        "content": "Displays only UDP (User Datagram Protocol) sockets, which are connectionless and used for applications like DNS, streaming, or VoIP. Useful for identifying open UDP ports, monitoring traffic patterns or troubleshooting packet loss in services that don’t require a connection handshake.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "3. -l: Display Listening Sockets",
        "content": "Shows sockets that are actively listening for incoming connections. Helps you identify which services or applications are available on your system and which ports they are using.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "4. -a: Display All Sockets",
        "content": "Displays both listening and non-listening sockets, giving a complete view of all network connections. Useful when you need an overall picture of network activity, including established sessions and passive listening ports. It can help diagnose network congestion or unexpected connections.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "5. -n: Show Numerical Output",
        "content": "Displays IP addresses and port numbers numerically without resolving hostnames. This speeds up the command output, avoids DNS lookup delays and is useful for quick scripting or when monitoring high-traffic servers. Also makes it easier to match sockets to firewall rules or IP-based configurations.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "6. -e: Extended Information",
        "content": "Displays additional details about each socket, including user ID, inode and other internal flags. Useful for auditing which users or processes own specific connections and for diagnosing security or permission issues.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "7. -i: Internal Information",
        "content": "Shows internal TCP information, such as retransmissions, congestion window size and timer data. Helpful for debugging TCP performance issues, slow connections or packet loss.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "8. -p: Show Process Information",
        "content": "Displays the process name and PID associated with each socket. Useful for identifying which applications are using network connections, aiding in monitoring or troubleshooting.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "9. -s: Summary Statistics",
        "content": "Provides a concise summary of all socket types, including counts of TCP, UDP and RAW sockets along with their states. Helps quickly assess the network load or detect abnormal connection patterns.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "10. -r: Display Routing Table",
        "content": "Shows the kernel routing table, including destination, gateway and interface information. Useful for verifying network routes, diagnosing connectivity issues and checking default gateways.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "15. Advanced Filtering and Display Options:",
        "content": "The 'ss' command offers more advanced options for filtering and customizing the displayed socket information."
      },
      {
        "title": "1. Filter by Port",
        "content": "To display sockets for a specific source port (e.g., port 80)\n\n**Command:**\n\n- This command, for example, displays sockets with a source port of 80. It's useful for pinpointing connections related to a particular service or port.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Filter by Port",
          "snippet": "ss sport = :80"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: ss Command: Inspecting Socket Statistics",
      "initialCode": "ss [options]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: ss Command: Inspecting Socket Statistics",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of ss Command: Inspecting Socket Statistics?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to ss Command: Inspecting Socket Statistics",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "ss Command: Inspecting Socket Statistics is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-traceroute": {
    "id": "linux-traceroute",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "traceroute Command: Tracing Packet Routes",
    "subtitle": "Complete Linux guide to traceroute Command: Tracing Packet Routes — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The `traceroute` command in Linux is a network diagnostic tool used to track the path that data packets take from your computer to a destination. It sends packets across the internet and shows you every \"hop\" (router or server) it passes through along the way, as well as how long each step takes.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for traceroute Command: Tracing Packet Routes."
        }
      },
      {
        "title": "2. Syntax of Traceroute",
        "content": "The basic syntax of the `**`traceroute`**`he command is as follows:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax of Traceroute",
          "snippet": "traceroute [options] destination"
        }
      },
      {
        "title": "3. Examples of Traceroute Command",
        "content": "Traceroute is not installed by default in many Linux distributions, but you can easily install it. To use Traceroute, you need to install the Traceroute package. Here's how you can do it:\n\nWhen we executed the `traceroute` command it provides a detailed output that reveals the path taken by packets to reach the destination. Each line in the output represents a hop along the route, displaying the IP address of the router, its hostname (if available), and the round-trip time (RTT) for the probe.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Examples of Traceroute Command",
          "snippet": "sudo apt install traceroute"
        }
      },
      {
        "title": "1. Basic Traceroute Usage",
        "content": "To perform a basic traceroute operation to a destination, simply execute the following command:\n\nThis command traces the route to the `google.com` domain, displaying the IP addresses and round-trip times for each hop along the path.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Basic Traceroute Usage",
          "snippet": "traceroute google.com"
        }
      },
      {
        "title": "2. Using IPv4 With Traceroute",
        "content": "The `-4` option allows users to specify the use of IPv4 when performing a traceroute operation. This is particularly useful when troubleshooting connectivity or network issues related to IPv4 addresses.\n\n**Syntax:**\n\n**Explanation:** By using the `**`-4`**` option, traceroute exclusively employs IPv4 addresses to trace the route to the destination `**`google.com`**`",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Using IPv4 With Traceroute",
          "snippet": "traceroute -4 google.com"
        }
      },
      {
        "title": "3. Using IPv6 With Traceroute",
        "content": "Conversely, the `**`-6`**` option instructs traceroute to use IPv6 addresses for the traceroute operation. This option is essential when dealing with networks that primarily utilize IPv6 addressing.\n\n**Syntax:**\n\n**Explanation:** By specifying the `**`-6`**`** **option, traceroute utilizes IPv6 addresses to trace the route to the destination `**`google.com`**`.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Using IPv6 With Traceroute",
          "snippet": "traceroute -6 google.com"
        }
      },
      {
        "title": "4. Do Not Fragment Packet",
        "content": "The `**`-F`**` option prevents packet fragmentation during the traceroute operation. This can be beneficial when troubleshooting network connectivity issues related to packet fragmentation.\n\n**Syntax:**\n\n**Explanation:** By using the `**`-F`**` option, traceroute ensures that packets are not fragmented during the traceroute process to the destination `**`google.com`**`.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Do Not Fragment Packet",
          "snippet": "traceroute -F google.com"
        }
      },
      {
        "title": "5. Starting From a Specific TTL (Time To Live)",
        "content": "The `**`-f`**`** **option allows users to specify the starting TTL (Time To Live) value for the traceroute operation. This option is helpful when you want to start tracing the route from a specific hop rather than the default starting point.\n\n**Syntax:**\n\n**Explanation:** By providing the `**`-f`**` option followed by the TTL value (e.g., 10), traceroute initiates the traceroute operation from the specified hop to the destination `**`google.com`**`.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Starting From a Specific TTL (Time To Live)",
          "snippet": "traceroute -f 10 google.com"
        }
      },
      {
        "title": "6. Routing the Packet Through a Gate",
        "content": "The `-g` option enables users to route the packet through a specific gateway during the traceroute operation. This is useful for directing traffic through a specific network path for diagnostic purposes.\n\n**Syntax:**\n\n**Explanation:** By using the `**`-g`**` option followed by the gateway IP address, traceroute routes the packet through the specified gateway to reach the destination `**`google.com`**`.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Routing the Packet Through a Gate",
          "snippet": "traceroute -g 192.168.43.45 google.com"
        }
      },
      {
        "title": "7. Setting Maximum Number of Hops",
        "content": "The `-m` option allows users to set the maximum number of hops for the packet to reach the destination. By default, the maximum Timt to Live (TTL) value is set to 30.\n\n**Syntax:**\n\n**Explanation:** By specifying the `**`-m`**` option followed by the desired TTL value (e.g., 5), traceroute limits the traceroute operation to a maximum of 5 hops to the destination `**`google.com`**`.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Setting Maximum Number of Hops",
          "snippet": "traceroute  -m 5 google.com"
        }
      },
      {
        "title": "8. Disabling IP Address Resolution",
        "content": "The `**`-n`**` option instructs traceroute not to resolve IP addresses to their corresponding domain names. This can speed up the traceroute operation by skipping the Domain Name Server (DNS) resolution process.\n\n**Syntax:**\n\n**Explanation:** By using the `**`-n`**` option, traceroute displays IP addresses instead of resolving them to domain names during the traceroute operation to the destination `**`google.com`**`.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Disabling IP Address Resolution",
          "snippet": "traceroute -n google.com"
        }
      },
      {
        "title": "9. Setting Destination Port",
        "content": "The `-p` option allows users to specify the destination port to use during the traceroute operation. By default, the destination port is set to 33434. **Syntax:**\n\n**Explanation:** By providing the `**`-p`**` option followed by the desired port number (e.g., 20292), traceroute uses the specified port for the traceroute operation to the destination `**`google.com`**`.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Setting Destination Port",
          "snippet": "traceroute  -p 20292 google.com"
        }
      },
      {
        "title": "10. Setting Number of Probes per Hop",
        "content": "The `-q` option enables users to set the number of probes sent to each hop during the traceroute operation. By default, three probes are sent per hop.\n\n**Syntax:**\n\n**Explanation:** By using the `**`-q`**` option followed by the desired number of probes (e.g., 1), traceroute sends the specified number of probes per hop during the traceroute operation to the destination `**`google.com`**`.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Setting Number of Probes per Hop",
          "snippet": "traceroute -q 1 google.com"
        }
      },
      {
        "title": "11. Setting Packet Length",
        "content": "Users can specify the full packet length using the `**`packetlen`**` option. By default, traceroute uses 60-byte packets.\n\n**Syntax:**\n\n**Explanation:** By providing the packet length value (e.g., 100), traceroute utilizes packets with the specified length during the traceroute operation to the destination `**`google.com`**`.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Setting Packet Length",
          "snippet": "traceroute  google.com 100"
        }
      },
      {
        "title": "12. Displaying Help Messages",
        "content": "The `--help` option displays help messages and exits, providing users with information about the usage and available options of the traceroute command.\n\n**Syntax:**\n\ndisplaying help of traceroute**Explanation:** By executing the** `****`traceroute --help`**` command, traceroute displays help messages that detail the usage and available options of the traceroute command.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Displaying Help Messages",
          "snippet": "traceroute --help"
        }
      },
      {
        "title": "16. Options Available in Traceroute",
        "content": "Here are some options use with Traceroute\n\nOption\n\nDescription\n\n**-4**\n\nUse IPv4\n\n**-6**\n\nUse IPv6\n\n**-F**\n\nDo not fragment packet\n\n**-f first_ttl**\n\nStart from the first TTL hop\n\n**-g gate**\n\nRoute the packet through gate\n\n**-m max_ttl**\n\nSet the max number of hops\n\n**-n**\n\nDo not resolve IP addresses to domain names\n\n**-p port**\n\nSet the destination port**-q nqueries**\n\nSet the number of probes per each hop\n\n**packetlen**\n\nThe full packet length\n\n**--help**\n\nDisplay help messages and exit\n\n`traceroute` sends small test packets from your machine to the target destination. These packets are designed to expire quickly. When each packet expires, the router it passed through sends back a message. `traceroute` uses these messages to list all the routers along the path, along with how long each step takes."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: traceroute Command: Tracing Packet Routes",
      "initialCode": "traceroute [options] destination",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: traceroute Command: Tracing Packet Routes",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of traceroute Command: Tracing Packet Routes?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to traceroute Command: Tracing Packet Routes",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "traceroute Command: Tracing Packet Routes is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-dhcp": {
    "id": "linux-dhcp",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "30 min read",
    "level": "Intermediate",
    "title": "Dynamic Host Configuration Protocol (DHCP)",
    "subtitle": "Complete Linux guide to Dynamic Host Configuration Protocol (DHCP) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Seamless network connectivity is achieved by automatically assigning IP addresses and configuration settings to devices using the Dynamic Host Configuration Protocol (DHCP).\n\n- Assigns a unique IP address to each device.\n- Provides the subnet mask to define the local network range.\n- Configures the default gateway for communication outside the local network.\n- Supplies DNS server addresses for domain name resolution.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Dynamic Host Configuration Protocol (DHCP)."
        }
      },
      {
        "title": "2. Components",
        "content": "DHCP works using a client–server model where the client requests network setting, the server allocates them from an address pool, and the settings are delivered as options for a fixed lease time.\n\n- **DHCP Server:** The device (router/server) that manages the DHCP service, keeps the IP pool, and assigns IP addresses + configuration to clients.\n- **DHCP Relay:** A router/switch feature that forwards DHCP requests and replies between clients and the server when they are in different networks (different subnets).\n- **DHCP Client:** Any device (PC, mobile, printer, IoT) that requests an IP address and settings from the DHCP server.\n- **IP Address Pool:** The range of IP addresses available for allocation to clients (often with exclusions/reservations).\n- **Lease:** The time period for which an assigned IP address is valid; the client must renew the lease to keep using it.\n- **DHCP Options:** Additional configuration parameters provided by the DHCP server along with the IP address, such as DNS servers, domain name, NTP servers, and other network-specific settings.\n- **Default Gateway:** The router IP given to the client so it can communicate outside the local network (reach the internet/other networks).\n- **DNS Servers:** DNS addresses provided to the client so it can convert domain names (like google.com) into IP addresses."
      },
      {
        "title": "3. DHCP Renewal: Lease renewal process",
        "content": "- **Failover:** Two DHCP servers share leasing; if one fails, the other continues service.\n- **Dynamic Updates:** DHCP auto-updates DNS (A/PTR) when a client IP is assigned or changes.\n- **Audit Logging:** Logs lease events (assign/renew/release) for tracking, troubleshooting, and audits."
      },
      {
        "title": "4. Packet Format",
        "content": "DHCP Packet Format\n- **Hardware Length (8 bits):** Length of MAC address (e.g., 6 for Ethernet).\n- **Hop Count :** Maximum number of hops the packet can travel.\n- **Transaction ID (32 bits):** Set by client, used to match requests and replies.\n- **Number of Seconds (16 bits):** Time elapsed since the client started booting.\n- **Flags (16 bits):** Leftmost bit indicates broadcast reply requirement.\n- **Client IP Address (4 bytes):** Filled if the client already has an IP, else 0.\n- **Your IP Address (4 bytes):** Client IP assigned by the server.\n- **Server IP Address (4 bytes):** IP address of the responding DHCP server.\n- **Gateway IP Address (4 bytes):** Stores the IP of the DHCP relay agent, not the client’s default gateway.\n- **Client Hardware Address:** The device’s MAC address.\n- **Server Name (64 bytes):** Optional server hostname.\n- **Boot Filename (128 bytes):** Pathname of boot file (for diskless clients).\n- **Options (variable):** Vendor-specific or additional configuration."
      },
      {
        "title": "5. Working",
        "content": "DHCP operates at the Application Layer and uses UDP ports 67 (server) and 68 (client) to automatically assign network configuration through a client-server communication process called DORA (Discover, Offer, Request, Acknowledge). The process involves the following steps:"
      },
      {
        "title": "1. DHCP Discover Message",
        "content": "DHCP Discover is the first message sent by a DHCP client to check whether any DHCP server is available on the network and to start getting an IP address.\n\nClient broadcasts to discover available DHCP servers on the network.\n- **Triggered when:** A device connects to a network or boots up with no valid IP configuration.\n- **Transmission type: **Broadcast, because the client does not know the DHCP server’s address.\n- **Purpose:** Identify DHCP server(s) capable of assigning an IP and network parameters."
      },
      {
        "title": "2. DHCP Offer Message",
        "content": "A DHCP server replies with an offer that includes an available IP address and configuration options (like subnet mask, gateway, DNS, and lease time).\n\nDHCP Offer: Server offers an IP address to the client.\n- Can be broadcast or unicast (depends on client/network behavior)\n- Includes Server Identifier so the client knows which server sent the offer\n- The offered IP is carried in yiaddr (“your IP address” field)"
      },
      {
        "title": "3. DHCP Request Message",
        "content": "DHCP Request is the message where the client confirms one chosen offer and asks the selected DHCP server to allocate that IP officially. It also tells other DHCP servers not to keep their offered IP reserved.\n\nClient requests a specific IP address from the DHCP server.\n- **Sent by:** DHCP client\n- **When it is sent:** After the client receives one or more DHCP Offe**r** messages\n- It accepts one offered IP address and identify the selected server\n- Prevent multiple servers from assigning different IPs to the same client"
      },
      {
        "title": "4. DHCP Acknowledgment Message",
        "content": "DHCP ACK is the final confirmation sent by the selected DHCP server after it receives the client’s DHCP Request. This message officially assigns the IP address to the client and provides the full set of network configuration parameters.\n\nDHCP ACK: Server confirms and assigns the IP address.\n- **Sent by:** DHCP server\n- **When it is sent:** After the server accepts the client’s DHCP Request\n- **Purpose:** Confirm the lease and deliver final configuration so the client can start network communication."
      },
      {
        "title": "5. DHCP Negative Acknowledgment Message",
        "content": "- DHCP NAK is sent by the server to notify the client that the requested IP configuration is invalid and cannot be assigned.\n- **Sent by:** DHCP server\n- **Purpose:** Reject the client’s DHCP Request\n- Requested IP is outside the configured scope\n- IP is already allocated to another device\n- Client has moved to a different network\n- Client must restart the DHCP process from Discover"
      },
      {
        "title": "6. DHCP Decline",
        "content": "- DHCP Decline is sent by the client when it detects that the offered IP address is already in use on the network.\n- **Sent by:** DHCP client\n- **Purpose:** Inform the server that the offered IP is not safe to use\n- **Typical trigger:** Client detects an IP conflict using an ARP probe / gratuitous ARP\n- **Result:** Server marks the IP as unavailable and selects another address for future allocation."
      },
      {
        "title": "7. DHCP Release",
        "content": "DHCP Release allows a client to return its assigned IP address to the server before the lease expires.\n\n- **Sent by:** DHCP client\n- **Purpose:** Free the IP for reuse\n- Occurs when a device disconnects, shuts down, or disables the interface\n- Helps maintain efficient IP address utilization"
      },
      {
        "title": "8. DHCP Inform",
        "content": "- DHCP Inform is used when a client already has a manually configured (static) IP but needs additional network settings from the DHCP server.\n- **Sent by:** DHCP client\n- **Purpose:** Request configuration parameters like DNS, domain name, NTP, etc., without obtaining a new IP.\n- **Server response:** Sends a DHCP ACK containing only configuration options.\n- **Delivery:** Typically **unicast**, since the client already has a valid IP."
      },
      {
        "title": "14. Security Concerns with DHCP",
        "content": "DHCP has no built-in authentication, so attackers on the same LAN can misuse it to disrupt service or redirect traffic.\n\n- **DHCP Starvation (IP Pool Exhaustion):** Floods DHCP requests with spoofed MACs to consume all available leases, blocking legitimate clients.\n- **Rogue DHCP Server:** A fake server gives clients incorrect IP settings (gateway/DNS), taking control of their network path.\n- **Man-in-the-Middle:** Done by pushing attacker-controlled gateway/DNS via rogue DHCP to intercept or alter traffic.\n- **DNS Misuse:** Malicious DHCP options can point clients to unauthorized DNS servers for redirection/phishing."
      },
      {
        "title": "15. Protection Against DHCP Attacks",
        "content": "- Enable DHCP Snooping on switches and allow DHCP replies only on trusted ports.\n- Apply Port Security or rate-limiting to reduce spoofed requests and prevent starvation.\n- Use IP/MAC filtering + monitoring/log analysis to detect and block abnormal lease activity.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Dynamic Host Configuration Protocol (DHCP)",
      "initialCode": "#!/usr/bin/env bash\n# Dynamic Host Configuration Protocol (DHCP)\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Dynamic Host Configuration Protocol (DHCP)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Dynamic Host Configuration Protocol (DHCP)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Dynamic Host Configuration Protocol (DHCP)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Dynamic Host Configuration Protocol (DHCP) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-dns": {
    "id": "linux-dns",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Domain Name System (DNS) Resolution",
    "subtitle": "Complete Linux guide to Domain Name System (DNS) Resolution — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Translation of human-readable domain names into IP addresses enables computers to communicate over the internet, a function performed by the Domain Name System (DNS), which operates in a hierarchical and distributed manner while improving performance through caching.\n\n- Provides name-to-address resolution using a hierarchical system (Root, TLD, Authoritative servers) to locate domain information.\n- Improves performance by using caching mechanisms, reducing lookup time for repeated requests. **Example:** When you enter a website name like google.com in your browser, the system does not understand the name directly. DNS translates it into an IP address of the server hosting the website. This allows your browser to connect to the correct server and load the webpage.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Domain Name System (DNS) Resolution."
        }
      },
      {
        "title": "2. Working",
        "content": "DNS process can be broken down into several steps, ensuring that users can access websites by simply typing a domain name into their browser.\n\n- **User Input:** The user enters a domain name (e.g., www.geeksforgeeks.org) in the browser.\n- **Local Cache Check:** The browser or OS checks its cache for a stored IP address.\n- **DNS Resolver Query:** If not found, the request is sent to a DNS resolver (usually by ISP).\n- **Root Server Query:** The resolver queries a root server, which points to the correct TLD server.\n- **TLD Server Response:** The TLD server directs the resolver to the domain’s authoritative server.\n- **Authoritative Server Response:** The authoritative server returns the actual IP address.\n- **Final Response:** The resolver sends the IP back to the user, and the browser connects to the server."
      },
      {
        "title": "3. Structure of DNS",
        "content": "The structure of DNS is hierarchical in nature, enabling scalable and organized domain name resolution across the global Internet."
      },
      {
        "title": "1. Root",
        "content": "The topmost level of the DNS hierarchy.\n\n- Represented by a dot (.) at the end of a domain name\n- Acts as the starting point of domain resolution"
      },
      {
        "title": "2. Top-Level Domains (TLDs)",
        "content": "The level directly below the root that defines domain extensions.\n\n- Includes extensions like .com, .org, .net, .edu\n- Helps categorize domains by purpose or region"
      },
      {
        "title": "3. Second-Level Domains",
        "content": "The main domain name registered by an organization.\n\n- Appears before the TLD (e.g., \"example\" in example.com)\n- Uniquely identifies a domain under a TLD"
      },
      {
        "title": "4. Subdomains",
        "content": "Extensions of the main domain used for organization.\n\n- Examples: www, mail, blog\n- Helps structure different parts of a website"
      },
      {
        "title": "5. Hostnames",
        "content": "Identifies specific servers or devices within a domain.\n\n- Examples: web1, mailserver, ftp\n- Maps to actual IP addresses using DNS records"
      },
      {
        "title": "9. Types of Domains",
        "content": "DNS categorizes domain names into different types to organize the global naming system and support both forward and reverse resolution.\n\nTypes of Domains"
      },
      {
        "title": "1. Generic Domains (gTLDs)",
        "content": "These domains are used for general purposes and are not tied to any country.\n\n- Include extensions like .com, .org, .net.\n- Not restricted to any specific country\n- Used for commercial, organizational, and educational purposes"
      },
      {
        "title": "2. Country Code Domains (ccTLDs)",
        "content": "These domains represent specific countries or geographic regions.\n\n- Examples: .in (India), .us (USA), .uk (UK), .jp (Japan)\n- Managed by respective national authorities"
      },
      {
        "title": "3. Reverse DNS",
        "content": "These domains are used to map IP addresses back to domain names.\n\n- Used for reverse lookup (IP address -> domain name)\n- IPv4 uses in-addr.arpa\n- IPv6 uses ip6.arpa\n- Uses PTR (Pointer) records"
      },
      {
        "title": "13. Domain Name Server",
        "content": "Responsible for storing DNS records and answering queries to resolve domain names into IP addresses, this function is performed by a Domain Name Server.\n\n- Stores DNS records such as A, AAAA, MX, CNAME, NS, and PTR.\n- Responds to queries from clients or other DNS servers.\n- Operates within the hierarchical DNS structure.\n- Can perform either recursive or authoritative functions.\n- Enables communication between users and web servers by supplying necessary DNS data."
      },
      {
        "title": "14. DNS Lookup",
        "content": "Also known as DNS Resolution, is the process of converting a domain name into its corresponding IP address so that a device can establish communication with the target server."
      },
      {
        "title": "15. Key Components",
        "content": "The key components of DNS work together to resolve domain names into IP addresses efficiently.\n\n**1. DNS Resolver**: Starts the DNS lookup process and acts as an intermediary between client and DNS servers.\n\n- Initiates the DNS query from the client side.\n- Forwards requests to appropriate DNS servers to get the IP address. **2. Recursive Query**: A query where the resolver fetches the complete answer on behalf of the client.\n\n- Resolver performs full lookup across multiple DNS servers if needed.\n- Returns the final IP address or an error to the client. **3. Iterative Query**: A query where the server provides the best information it has or a referral.\n\n- Returns partial response or points to another DNS server.\n- Helps the resolver move step-by-step toward the final answer. **4. Non-Recursive Query**: A query where the answer is already available in cache or authoritative server.\n\n- Response is returned immediately without further lookup.\n- No additional DNS server communication is required."
      },
      {
        "title": "16. DNS Caching",
        "content": "Technique that temporarily stores DNS records to reduce repeated queries and improve resolution efficiency.\n\n- Stores previously resolved domain records locally.\n- Reduces response time for future requests.\n- Minimizes load on external DNS servers.\n- Improves overall network performance."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Domain Name System (DNS) Resolution",
      "initialCode": "#!/usr/bin/env bash\n# Domain Name System (DNS) Resolution\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Domain Name System (DNS) Resolution",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Domain Name System (DNS) Resolution?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Domain Name System (DNS) Resolution",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Domain Name System (DNS) Resolution is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-ftp": {
    "id": "linux-ftp",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "File Transfer Protocol (FTP) in Linux",
    "subtitle": "Complete Linux guide to File Transfer Protocol (FTP) in Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- File Transfer Protocol (FTP) is an application-layer protocol that is used to transfer files between a client and a server over a TCP/IP network. It provides a standardized method for file exchange across different systems.\n\n- Supports text, binary, image, and program files.\n- Enables uploading, downloading, and remote file management.\n- Uses TCP to ensure reliable communication.FTP",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for File Transfer Protocol (FTP) in Linux."
        }
      },
      {
        "title": "2. Working and Uses",
        "content": "FTP follows a client–server model and uses two connections:\n\n- Control connection (Port 21) for commands\n- Data connection (Port 20) for file transfer\n- Users connect to the server using login credentials.\n- Users navigate directories using commands ls and cd.\n- For transferring files, it uses get and put.\n- Supports both active and passive modes for communication."
      },
      {
        "title": "3. Types of Connection",
        "content": "FTP uses two separate TCP connections to handle communication—one dedicated to control information and another dedicated to actual data transfer. This separation makes FTP an out-of-band protocol."
      },
      {
        "title": "1. Control Connection",
        "content": "This connection is used to exchange commands and responses between the client and server.\n\n- Established on TCP port 21.\n- Transfers user authentication details (username and password).\n- Sends commands for directory navigation and file operations.\n- Remains active for the entire FTP session."
      },
      {
        "title": "2. Data Connection",
        "content": "This is used to transfer the actual file content and directory listings.\n\n- Traditionally uses TCP port 20 (in active mode).\n- Created separately for each file transfer.\n- Transfers files and directory information.\n- Closes automatically after data transmission completes."
      },
      {
        "title": "6. FTP Data Types",
        "content": "FTP data types define how file contents are represented and transmitted between the client and server during file transfer.\n\n- **ASCII:** This data type is used for transferring text files with character encoding based on the ASCII standard.\n- **EBCDIC:** This data type is used for transferring text files encoded in IBM’s Extended Binary Coded Decimal Interchange Code.\n- **Image (Binary): **This data type transfers files as a continuous stream of bytes without any modification.\n- **Local: **This data type is used for transferring files that contain data stored in logical bytes of a specified bit length."
      },
      {
        "title": "7. FTP Clients",
        "content": "An FTP client is a software application that enables a user to connect to an FTP server, authenticate, and perform file transfer operations over a network using the client–server model.\n\n- Establishes a connection with the FTP server.\n- Sends commands to retrieve or store files.\n- Provides either command-line or graphical user interface (GUI) support."
      },
      {
        "title": "8. Common FTP Commands",
        "content": "- **get filename** – Downloads a single file from the server.\n- **mget filename** – Downloads multiple files from the server.\n- **ls** – Displays the list of files in the current server directory."
      },
      {
        "title": "9. FTP Replies",
        "content": "These are the three-digit status codes sent by the server to inform the client about the result of a command.\n\n- **200** – Command executed successfully.\n- **221** – Service closing control connection.\n- **331** – Username accepted; password required.\n- **502** – Command not implemented.\n- **503** – Incorrect sequence of commands.\n- **504** – Command not supported for that parameter.\n- **530** – User not logged in (authentication failed).\n- **551** – Requested action aborted: page type unknown."
      },
      {
        "title": "10. Characteristics",
        "content": "FTP is a connection-oriented file transfer protocol that operates over TCP and supports reliable data transmission.\n\n- Uses TCP as its transport layer protocol.\n- Establishes separate control and data connections.\n- Suitable for general-purpose file transfer over networks.\n- Provides authentication-based access control."
      },
      {
        "title": "11. Types of FTP",
        "content": "There are different ways through which a server and a client do a file transfer using FTP. Some of them are mentioned below:"
      },
      {
        "title": "1. Anonymous FTP",
        "content": "It is a file transfer method that allows users to access publicly available files on a server without requiring a personal user account.\n\n- Users log in using the username “anonymous”.\n- Usually provides read-only access.\n- Does not allow modification of server directories.\n- Commonly used for distributing public software and documents."
      },
      {
        "title": "2. Password-Protected FTP",
        "content": "This is a secure access method that requires valid user credentials to access and manage files on an FTP server.\n\n- Requires username and password authentication.\n- Access permissions are controlled by the administrator.\n- Supports file upload, download, and modification.\n- Suitable for private or organizational file sharing."
      },
      {
        "title": "3. FTPS (FTP Secure)",
        "content": "FTPS is an extension of FTP that adds SSL/TLS encryption to secure data transmission between client and server.\n\n- Encrypts login credentials and transfers data.\n- Operates over TCP (commonly port 21).\n- Supports implicit and explicit encryption modes.\n- Maintains compatibility with standard FTP commands."
      },
      {
        "title": "4. SFTP (SSH File Transfer Protocol)",
        "content": "This is a secure file transfer protocol that operates over the SSH protocol and provides encrypted communication for file management.\n\n- Uses port 22 for communication.\n- Encrypts both authentication and file data.\n- Uses a single secure connection (no separate data channel).\n- Provides secure remote file access and management."
      },
      {
        "title": "16. Security Issues",
        "content": "- Transmits data and credentials in plain text, making interception easy.\n- Vulnerable to attacks such as sniffing, spoofing, brute force, and port scanning.\n- Does not provide built-in encryption for secure communication.\n- If intercepted, attackers can read or modify transferred data."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: File Transfer Protocol (FTP) in Linux",
      "initialCode": "#!/usr/bin/env bash\n# File Transfer Protocol (FTP) in Linux\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: File Transfer Protocol (FTP) in Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of File Transfer Protocol (FTP) in Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to File Transfer Protocol (FTP) in Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "File Transfer Protocol (FTP) in Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-firewall-intro": {
    "id": "linux-firewall-intro",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Linux Firewall Architecture (Netfilter)",
    "subtitle": "Complete Linux guide to Linux Firewall Architecture (Netfilter) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux Firewall is a security system that monitors and controls incoming and outgoing network traffic based on predefined rules. It protects your system from unauthorized access, malicious traffic, and potential attacks. The two most commonly used firewall tools in modern Linux distributions are firewalld (default in RHEL, CentOS, Fedora) and iptables (traditional, widely used).\n\n- Controls inbound and outbound network traffic.\n- Allows or blocks traffic based on IP addresses, ports, protocols, and services.\n- Supports dynamic rule management without restarting the service.\n- Works with zones (firewalld) and chains/tables (iptables).\n- Helps secure servers, desktops, and embedded Linux systems.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Linux Firewall Architecture (Netfilter)."
        }
      },
      {
        "title": "2. Dynamic Firewall Management in Linux",
        "content": "firewalld is a dynamic firewall management tool in Linux that uses the concept of zones to define trust levels for network connections. Zones can represent different environments, such as public, home, work, or internal. Each zone has its own set of rules, and firewalld allows real-time changes without interrupting existing connections.\n\n- **Zone-Based Management:** Assign different rules to different network zones based on trust level.\n- **Dynamic Updates:** Modify firewall rules on the fly without restarting services.\n- **Service and Port Control:** Open or close ports and services per zone.\n- **Rich Rules Support:** Advanced rules for specific IP addresses or protocols."
      },
      {
        "title": "3. Checking firewalld Status",
        "content": "**Command:**\n\n- Checks whether firewalld is running**If inactive need to start it using:**\n\n**Command:**\n\n**Output:**\n\nCommand to check the running status of our Firewalld services.Here is the output showing services actively running",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Checking firewalld Status",
          "snippet": "sudo systemctl status firewalld"
        }
      },
      {
        "title": "4. Example 1: Allowing SSH (Secure Shell or Secure Socket Shell) traffic",
        "content": "SSH (Secure Shell) is a protocol used to securely access and manage remote servers over an encrypted connection. Enabling SSH in the firewall ensures administrators can remotely log in to the system safely.\n\n- This command adds a firewall rule to allow incoming SSH traffic in the public zone by enabling the predefined SSH service (port 22/tcp).**Command:**\n\n- **firewall-cmd:** The command-line utility to configure firewalld.\n- **--zone=public:** Specifies the network zone to apply the rule (e.g., public, home, work).\n- **--add-service=ssh:** Adds the predefined ssh service, which automatically opens port 22/tcp.\n- **--permanent:** Makes the rule persist across reboots.\n- **--reload:** Applies the changes immediately without restarting firewalld.**Output:**\n\nAs we can see it is done successfully",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Example 1: Allowing SSH (Secure Shell or Secure Socket Shell) traffic",
          "snippet": "sudo firewall-cmd --zone=public --add-service=ssh --permanentsudo firewall-cmd --reload"
        }
      },
      {
        "title": "5. Example 2: Allowing incoming traffic on a specific port",
        "content": "Some applications run on non-standard ports instead of predefined services. Allowing a specific port enables external users to access such applications while keeping other ports restricted.\n\n- This command creates a firewall rule to allow incoming TCP traffic on port 8080 in the public zone.\n- Commonly used for web apps, dashboards, or test servers running on custom ports.**Command:**\n\n- **--add-port=8080/tcp:** Opens TCP traffic on port 8080.\n- **8080:** The port number to open.\n- **tcp:** Specifies the protocol (TCP or UDP).\n- Useful when deploying applications using non-standard ports, like internal dashboards or testing servers.**Output:**\n\nBoth the command showed success",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Example 2: Allowing incoming traffic on a specific port",
          "snippet": "sudo firewall-cmd --zone=public --add-port=8080/tcp --permanentsudo firewall-cmd --reload"
        }
      },
      {
        "title": "6. Example 3: Blocking incoming traffic on a specific IP address",
        "content": "Blocking a specific IP address helps prevent unauthorized access or mitigate malicious activity such as brute-force attacks. firewalld uses rich rules for advanced filtering based on IP, protocol, or other conditions.\n\n- This command adds a rich rule to block all incoming IPv4 traffic from a specific IP address.**Command:**\n\n- **--add-rich-rule:** Adds a detailed rule with multiple conditions.\n- **rule family=\"ipv4\":** Specifies the IP version (IPv4 or IPv6).\n- **source address=\"192.168.52.1\":** The IP address to block.\n- **reject:** Denies access and optionally sends a rejection notice.**Output:**\n\nwe have also mentioned family of IP (ipv4)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Example 3: Blocking incoming traffic on a specific IP address",
          "snippet": "sudo firewall-cmd --zone=public --add-rich-rule='rule family=\"ipv4\" source address=\"192.168.52.1\" reject' --permanentsudo firewall-cmd --reload"
        }
      },
      {
        "title": "7. Example 4: Remove a Rule",
        "content": "Removing unnecessary rules keeps your firewall clean and reduces security risks. It also helps avoid conflicts if services change over time.\n\n- This command removes an existing firewall rule that allows SSH traffic in the public zone.\n- It is used to revoke previously granted access.**Commands:**\n\n- **--remove-service=ssh:** Deletes the predefined SSH service rule.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Example 4: Remove a Rule",
          "snippet": "sudo firewall-cmd --zone=public --remove-service=ssh --permanentsudo firewall-cmd --reload"
        }
      },
      {
        "title": "8. Example 5: View Active Rules",
        "content": "Verifying active firewall rules is crucial to ensure security policies are correctly applied. This command provides a summary of all ports, services, and rich rules in a specific zone.\n\n- This command displays all currently active firewall rules for the default zone.\n- Useful for auditing firewall settings and confirming that rules are correctly applied.**Command:**\n\n- **--list-all:** Displays all current services, ports, and rich rules for the selected zone.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Example 5: View Active Rules",
          "snippet": "sudo firewall-cmd --list-all"
        }
      },
      {
        "title": "9. Types of Linux Firewalls",
        "content": "Linux provides several firewall solutions, each with different levels of complexity and usability.\n\n- **firewalld:** A modern, dynamic firewall management tool that uses zones to manage trust levels. It allows real-time rule updates without restarting the service and is the default in RHEL, CentOS, and Fedora.\n- **iptables:** A traditional and powerful firewall utility based on rules, tables, and chains. It provides fine-grained control over network traffic and is widely used in servers and legacy systems.\n- **UFW (Uncomplicated Firewall):** A simplified frontend for iptables, designed to make firewall configuration easier. Commonly used in Ubuntu and beginner-friendly environments.\n- **nftables:** A newer firewall framework that replaces iptables. It offers improved performance, simplified syntax, and better integration with modern Linux kernels."
      },
      {
        "title": "10. iptables Traditional Firewall",
        "content": "iptables is a Linux software utility used for controlling network traffic. It performs packet filtering, NAT (Network Address Translation), and packet manipulation, allowing administrators to define rules for incoming and outgoing traffic.\n\n**Working of iptables**\n\nWhen a packet reaches a Linux system, it passes through a structured framework of tables, chains, and rules\n\n- A packet enters the system.\n- It is processed by a table, depending on the type of operation.\n- Within the table, it passes through a chain (stage of processing).\n- Matching rules determine whether the packet is accepted, dropped, or modified.**Predefined tables in iptables**\n\n- **Security Table:** The security table integrates with security frameworks like SELinux to enforce system security. It applies MAC (Mandatory Access Control) rules and access control policies, helping administrators manage permissions and security labels. Its built-in chains are INPUT, OUTPUT, FORWARD, and SECMARK.\n- **Mangle Table:** The mangle table is used to modify packet headers and set packet marks. It supports advanced traffic management, routing decisions, and Quality of Service (QoS) features such as ToS and DSCP. Its built-in chains include PREROUTING, INPUT, FORWARD, OUTPUT, and POSTROUTING.\n- **NAT Table:** The NAT (Network Address Translation) table allows multiple devices to share a single public IP address by translating source or destination addresses. It is commonly used in routers and gateway systems. Its built-in chains are PREROUTING, POSTROUTING, and OUTPUT.\n- **Raw Table:** The raw table processes packets before connection tracking begins. It is used for low-level packet handling and creating exceptions to standard tracking rules. Its built-in chains are PREROUTING and OUTPUT.\n- **Filter Table:** The filter table is the default table for packet filtering, controlling traffic flow to and from the system. It evaluates rules based on source and destination IP, port, and protocol. Its built-in chains include INPUT, OUTPUT, and FORWARD."
      },
      {
        "title": "11. Chains in iptables",
        "content": "chains define the stage at which packets are processed within a table. Each chain consists of a series of rules that determine how matching packets are handled. The three main built-in chains are INPUT, OUTPUT, and FORWARD, each serving a distinct purpose in packet filtering and traffic control.\n\n- **INPUT:** The INPUT chain handles all incoming packets destined for the local system. Rules in this chain determine whether external traffic is allowed to reach the server or is blocked, providing a first line of defense for system security.\n- **OUTPUT:** The OUTPUT chain processes packets generated by the local system. Rules here control what outgoing traffic can leave the system, ensuring sensitive data or system communications follow defined security policies.\n- **FORWARD:** The FORWARD chain is used when the system routes packets between networks. Packets that pass through the system to another network interface are evaluated against rules in this chain, which is particularly important for systems functioning as routers or gateways.**Note:** Each chain uses rules specifying source/destination IP, protocol, and port, with actions like ACCEPT (allow), DROP (discard), or REJECT (block with notification)."
      },
      {
        "title": "12. Installation and Configuration of a Firewall",
        "content": "Before using iptables or switching firewall tools, ensure the required packages are installed and properly configured."
      },
      {
        "title": "13. Install iptables",
        "content": "**For RHEL / CentOS / Fedora:**\n\n- Installs iptables along with service management utilities.**For Ubuntu / Debian:**\n\n- Installs iptables package for Debian-based systems.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Install iptables",
          "snippet": "sudo dnf install iptables iptables-services"
        }
      },
      {
        "title": "14. Start and Enable iptables Service (RHEL-based systems)",
        "content": "- Starts the iptables service\n- Ensures it runs automatically after reboot",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Start and Enable iptables Service (RHEL-based systems)",
          "snippet": "sudo systemctl start iptablessudo systemctl enable iptables"
        }
      },
      {
        "title": "15. Disable firewalld (If Using iptables)",
        "content": "Avoid conflicts between firewalld and iptables, as both manage firewall rules.\n\n- Stops the firewalld service\n- Prevents it from starting on boot**Notes:**\n\n- Do not run firewalld and iptables together, as they can overwrite each other’s rules.\n- On modern systems, firewalld or nftables is recommended over raw iptables.\n- Always ensure SSH access is allowed before applying restrictive rules.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 15. Disable firewalld (If Using iptables)",
          "snippet": "sudo systemctl stop firewalldsudo systemctl disable firewalld"
        }
      },
      {
        "title": "16. Example 1: Allow ICMP (Ping) Traffic",
        "content": "Allow ICMP traffic so the server can respond to ping requests for connectivity testing and network diagnostics.\n\n**Syntax:**\n\n**Example Command:**\n\n- **iptables:** Command-line utility to configure firewall rules\n- **-A INPUT:** Appends the rule to the INPUT chain (incoming traffic)\n- **-p icmp:** Matches ICMP protocol (used by ping)\n- **-j ACCEPT:** Allows the matching packets**Output:**\n\nCREATE FIRST RULE iptables",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 16. Example 1: Allow ICMP (Ping) Traffic",
          "snippet": "sudo iptables -I/-A chain_name -s source_ip -p protocol --dport port_number -j action"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Linux Firewall Architecture (Netfilter)",
      "initialCode": "sudo systemctl status firewalld",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Linux Firewall Architecture (Netfilter)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Linux Firewall Architecture (Netfilter)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Linux Firewall Architecture (Netfilter)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Linux Firewall Architecture (Netfilter) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-ufw-iptables": {
    "id": "linux-ufw-iptables",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Setting Up Firewalls with UFW and iptables",
    "subtitle": "Complete Linux guide to Setting Up Firewalls with UFW and iptables — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- UFW (Uncomplicated Firewall) simplifies complex iptables commands into easy-to-use syntax. It is ideal for quickly securing a system while keeping essential ports open.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Setting Up Firewalls with UFW and iptables."
        }
      },
      {
        "title": "2. Step 1: Install and check status",
        "content": "**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Step 1: Install and check status",
          "snippet": "sudo apt updatesudo apt install -y ufwsudo ufw status verbose"
        }
      },
      {
        "title": "3. Step 2: Allow SSH and web traffic before enabling the firewall",
        "content": "**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Step 2: Allow SSH and web traffic before enabling the firewall",
          "snippet": "sudo ufw allow 22/tcp comment 'SSH'sudo ufw allow 80/tcp  comment 'HTTP'sudo ufw allow 443/tcp comment 'HTTPS'"
        }
      },
      {
        "title": "4. Step 3: Enable UFW",
        "content": "Command examples and usage details for **Step 3: Enable UFW**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step 3: Enable UFW",
          "snippet": "sudo ufw enable"
        }
      },
      {
        "title": "5. Step 4: Add a useful examples",
        "content": "Allow a port range (e.g., passive FTP 40000–50000)\n\n**Syntax:**\n\n**Output:**\n\nOutputThis command tells the UFW firewall to allow TCP traffic on ports 40000 to 50000, which are commonly used for passive FTP data transfers. It adds a descriptive comment \"Passive-FTP\" so you can easily identify the rule later. The message confirms that the rule was successfully applied for both IPv4 and IPv6 traffic.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Step 4: Add a useful examples",
          "snippet": "sudo ufw allow 40000:50000/tcp comment 'Passive-FTP'"
        }
      },
      {
        "title": "6. Step 5: Enable logging",
        "content": "Command examples and usage details for **Step 5: Enable logging**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Step 5: Enable logging",
          "snippet": "sudo ufw logging medium"
        }
      },
      {
        "title": "7. Step 6: Verify Rules",
        "content": "**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Step 6: Verify Rules",
          "snippet": "sudo ufw status numberedsudo ufw show added"
        }
      },
      {
        "title": "8. Step 7: Rollback / reset",
        "content": "Command examples and usage details for **Step 7: Rollback / reset**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Step 7: Rollback / reset",
          "snippet": "sudo ufw disableorsudo ufw reset"
        }
      },
      {
        "title": "9. iptables",
        "content": "\"iptables\" is a command-line utility in Linux used to configure the kernel built-in firewall. It works by defining rules that control how network traffic is handled—whether it’s allowed, blocked, or modified—based on criteria like IP address, port, or protocol."
      },
      {
        "title": "10. Step 1: Set default policies (deny inbound & forward, allow outbound)",
        "content": "**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Step 1: Set default policies (deny inbound & forward, allow outbound)",
          "snippet": "sudo iptables -P INPUT DROPsudo iptables -P FORWARD DROPsudo iptables -P OUTPUT ACCEPT"
        }
      },
      {
        "title": "11. Step 2: Allow loopback and established traffic",
        "content": "**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Step 2: Allow loopback and established traffic",
          "snippet": "sudo iptables -A INPUT -i lo -j ACCEPTsudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT"
        }
      },
      {
        "title": "12. Step 3: Allow SSH before you lock yourself out",
        "content": "**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Step 3: Allow SSH before you lock yourself out",
          "snippet": "sudo iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -j ACCEPT"
        }
      },
      {
        "title": "13. Step 4: Add a logging-and-drop tail rule",
        "content": "**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Step 4: Add a logging-and-drop tail rule",
          "snippet": "sudo iptables -N LOGGINGsudo iptables -A INPUT -j LOGGINGsudo iptables -A LOGGING -m limit --limit 2/min -j LOG --log-prefix \"iptables dropped: \" --log-level 7sudo iptables -A LOGGING -j DROP"
        }
      },
      {
        "title": "14. Step 5: Verify current rules",
        "content": "**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Step 5: Verify current rules",
          "snippet": "sudo iptables -L -n -v --line-numbers"
        }
      },
      {
        "title": "15. Step 6: Make it persistent across reboots",
        "content": "**Syntax:**\n\n**Output:**\n\nOutput**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 15. Step 6: Make it persistent across reboots",
          "snippet": "sudo apt install -y iptables-persistent"
        }
      },
      {
        "title": "16. Step 7: Test Connectivity",
        "content": "Command examples and usage details for **Step 7: Test Connectivity**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 16. Step 7: Test Connectivity",
          "snippet": "curl -I http://127.0.0.1"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Setting Up Firewalls with UFW and iptables",
      "initialCode": "sudo apt updatesudo apt install -y ufwsudo ufw status verbose",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Setting Up Firewalls with UFW and iptables",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Setting Up Firewalls with UFW and iptables?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Setting Up Firewalls with UFW and iptables",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Setting Up Firewalls with UFW and iptables is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  }
};
