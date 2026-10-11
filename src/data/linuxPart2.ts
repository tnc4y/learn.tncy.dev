import { LessonContent } from "./lessonsData";

export const LINUX_PART2: Record<string, LessonContent> = {
  "linux-iptables-cmd": {
    "id": "linux-iptables-cmd",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "iptables Command: Chains, Tables & Packet Rules",
    "subtitle": "Complete Linux guide to iptables Command: Chains, Tables & Packet Rules — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- iptables is a Linux command-line firewall tool used to control and secure network traffic by defining packet-filtering rules. It works with the Netfilter framework in the Linux kernel to decide whether packets are accepted, dropped, or forwarded.\n\n- Controls incoming, outgoing, and forwarded traffic based on IP addresses, ports, and protocols.\n- Uses tables, chains, and rules to define how network packets should be handled.\n- Performs actions such as ACCEPT, DROP, REJECT, or FORWARD when packets match rules.\n- Helps protect servers and networks by allowing trusted traffic and blocking unauthorized access.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for iptables Command: Chains, Tables & Packet Rules."
        }
      },
      {
        "title": "2. Core Components of iptables",
        "content": "iptables works using a structured model consisting of tables, chains, rules, and targets."
      },
      {
        "title": "3. Tables in Iptables",
        "content": "Tables are collections of chains that define how packets should be processed for specific purposes, iptables uses different tables for handling various types of packet processing.\n\n- **filter:** Default used table for packet filtering. It includes chains like INPUT, OUTPUT and FORWARD.\n- **nat:** Related to Network Address Translation. It includes PREROUTING and POSTROUTING chains.\n- **mangle:** For specialised packet alteration. Inbuilt chains include PREROUTING and OUTPUT.\n- **raw:** Configures exemptions from connection tracking. Built-in chains are PREROUTING and OUTPUT.\n- **security:** Used for Mandatory Access Control"
      },
      {
        "title": "4. Built-in Chains of Tables in Iptables",
        "content": "Chains are ordered lists of rules that determine what action should be taken when a packet matches certain conditions. Each table contains predefined chains\n\n- **INPUT:** A set of rules for packets destined to localhost sockets.\n- **FORWARD:** For packets routed through the device.\n- **OUTPUT:** It is locally generated packets, meant to be transmitted outside.\n- **PREROUTING:** It is used for modifying packets as they arrive.\n- **POSTROUTING:** IIt helps in modifying packets as they are leaving."
      },
      {
        "title": "5. Rules",
        "content": "Rules are the conditions applied to packets within chains. A rule matches a packet if it meets certain criteria. Common criteria include:\n\n- **Source IP address:** Blocks or allows traffic coming from a specific computer or device. Example: Stop all traffic from 192.168.1.100.\n- **Destination IP address:** Blocks or allows traffic going to a specific computer or device. Example: Allow traffic only to 10.0.0.5.\n- **Protocol type:** Filters traffic based on the type of communication, like TCP (web), UDP, or ICMP (ping).\n- **Port number:** Controls access to certain services or programs on a computer. Example: Allow web traffic on port 80 but block SSH on port 22."
      },
      {
        "title": "6. Targets (Actions)",
        "content": "Targets specify what happens when a packet matches a rule:\n\n- **ACCEPT:** Allow the packet to continue its path.\n- **DROP:** Silently discard the packet with no response.\n- **REJECT:** Discard the packet but send an error response to the sender.\n- **QUEUE:** Send the packet to userspace for custom processing.\n- **RETURN:** Stop processing the current chain and resume at the previous chain.**Example:**\n\nImagine you want to block SSH from a specific IP but allow all other traffic:\n\n- **Chain:** INPUT\n- **Protocol:** TCP\n- **Destination Port:** 22 (SSH)\n- **Source IP:** 192.168.1.100\n- **Target:** DROP**Output:**\n\nThis rule drops incoming SSH connections from 192.168.1.100 while letting other traffic pass normally.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Targets (Actions)",
          "snippet": "iptables -A INPUT -p tcp --dport 22 -s 192.168.1.100 -j DROP"
        }
      },
      {
        "title": "7. Syntax",
        "content": "- **options:** Specifies the action to perform (like adding, deleting, or listing rules)\n- **chain:** Defines where the rule is applied (INPUT, OUTPUT, FORWARD)\n- **rule specification:** Conditions to match packets (protocol, port, IP address, etc.)\n- **target:** Action to take on matched packets (ACCEPT, DROP, REJECT)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Syntax",
          "snippet": "iptables [options] [chain] [rule specification] [target]"
        }
      },
      {
        "title": "8. User-Defined Chain Operations",
        "content": "User-defined chains can also be created. The following are the some of the possible one with examples:"
      },
      {
        "title": "1. -A, --append : Add a rule to a chain",
        "content": "Add a rule to a chain\n\n**Syntax:**\n\n**Example:**\n\nThis command drops all the traffic coming on any port.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -A, --append : Add a rule to a chain",
          "snippet": "iptables [-t table] --append [chain] [parameters]"
        }
      },
      {
        "title": "2. -D, --delete : Remove a rule from a chain",
        "content": "Remove a rule from a chain\n\n**Syntax:**\n\n**Example:**\n\nThis command deletes the rule 2 from INPUT chain.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -D, --delete : Remove a rule from a chain",
          "snippet": "iptables [-t table] --delete [chain] [rule_number]"
        }
      },
      {
        "title": "3. -C, --check: Check if a rule exists",
        "content": "Check if a rule is present in the chain or not.\n\n**Syntax:**\n\n- Returns 0 if rule exists\n- Returns 1 if rule does not exist**Example:**\n\nThis command checks whether the specified rule is present in the INPUT chain.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -C, --check: Check if a rule exists",
          "snippet": "iptables [-t table] --check [chain] [parameters]"
        }
      },
      {
        "title": "12. Common Parameters in iptables",
        "content": "The iptables command uses parameters to define which packets to match and what actions to take. These parameters help you control traffic precisely. One of the most important parameters is -p (or --proto), which specifies the protocol of the packet, such as TCP, UDP, or ICMP. This allows you to filter traffic based on how the data is being sent."
      },
      {
        "title": "1. -p, --proto: Protocol",
        "content": "Is the protocol that the packet follows. Possible values maybe: tcp, udp, icmp, etc.\n\n**Syntax:**\n\n**Example:**\n\nThis command appends a rule in the INPUT chain to drop all udp packets.\n\n- **-t filter:** Use the default filter table\n- **-A INPUT:** Append this rule to the INPUT chain\n- **-p udp:** Match packets using the UDP protocol\n- **-j DROP:** Drop matching packets silently**Output:**\n\nThis command does not produce a visible output. After running it, all incoming UDP traffic will be blocked according to the rule.\n\n**Verifying Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -p, --proto: Protocol",
          "snippet": "iptables [-t table] -A [chain] -p {protocol_name} -j {target}"
        }
      },
      {
        "title": "2. -s, --source: Source Address",
        "content": "Is used to match with the source address of the packet.\n\n**Syntax:**\n\n**Example: Accept all packets from 192.168.1.230**\n\nThis command appends a rule in the INPUT chain to accept all packets originating from 192.168.1.230.\n\n- **-t filter:** Use the default filter table\n- **-A INPUT:** Add the rule to the INPUT chain\n- **-s 192.168.1.230:** Match packets from this source IP\n- **-j ACCEPT:** Allow matching packets**Output:**\n\n- No visible output**Verifying Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -s, --source: Source Address",
          "snippet": "iptables [-t table] -A [chain] -s {source_address} [target]"
        }
      },
      {
        "title": "3. -d, --destination: Destination Address",
        "content": "Matches packets going to a specific IP address.\n\n**Syntax:**\n\n**Example: Drop all packets going to 192.168.1.123**\n\nThis command appends a rule in the OUTPUT chain to drop all packets destined for 192.168.1.123.\n\n- **-A OUTPUT:** Add the rule to the OUTPUT chain\n- **-d 192.168.1.123:** Match packets destined for this IP\n- **-j DROP:** Silently discard matching packets**Output:**\n\n- No visible output**Verifying Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -d, --destination: Destination Address",
          "snippet": "iptables [-t table] -A [chain] -d {destination_address} [target]"
        }
      },
      {
        "title": "4. -i, --in-interface: Input Interface",
        "content": "Matches packets with the specified in-interface and takes the action.\n\n**Syntax:**\n\n**Example: Drop all packets coming from the wireless interface wlan0**\n\nThis command appends a rule in the INPUT chain to drop all packets destined for wireless interface.\n\n- **-i wlan0:** Match packets coming in through this interface\n- **-j DROP:** Block these packets**Output:**\n\n- No visible output**Verifying Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -i, --in-interface: Input Interface",
          "snippet": "iptables [-t table] -A [chain] -i {interface} [target]"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: iptables Command: Chains, Tables & Packet Rules",
      "initialCode": "iptables -A INPUT -p tcp --dport 22 -s 192.168.1.100 -j DROP",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: iptables Command: Chains, Tables & Packet Rules",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of iptables Command: Chains, Tables & Packet Rules?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to iptables Command: Chains, Tables & Packet Rules",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "iptables Command: Chains, Tables & Packet Rules is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-firewall-setup": {
    "id": "linux-firewall-setup",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Managing Firewall Configuration in Linux",
    "subtitle": "Complete Linux guide to Managing Firewall Configuration in Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A Linux firewall is a critical security layer that monitors and controls network traffic, protecting your system from unauthorized access and potential threats. By defining rules, it ensures only legitimate traffic passes while blocking harmful connections. Linux provides tools like iptables and firewalld to effectively manage and secure network communications.\n\n- Acts as a barrier between internal networks and external connections.\n- Filters incoming and outgoing traffic based on predefined rules.\n- Restricts unauthorized access and prevents data breaches.\n- Supports both software and hardware based implementations.\n- Ensures legitimate communication without compromising security.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Managing Firewall Configuration in Linux."
        }
      },
      {
        "title": "2. Working of Linux Firewall",
        "content": "A Linux firewall monitors network traffic by inspecting each packet that enters or leaves the system. It applies predefined rules to decide whether the traffic should be allowed, blocked, or redirected, ensuring that only legitimate connections pass through while protecting the system from unauthorized access and attacks. The packet filtering process follows these steps:\n\n- **Packet Arrival:** A packet enters the system from an external network or is generated internally.\n- **Rule Evaluation:** The firewall checks the packet against its rules, considering the IP address (source or destination), port number (like 80 for HTTP, 22 for SSH), protocol (TCP, UDP, ICMP, etc.), and connection state (new or established).\n- **Decision Making:** The firewall decides the packet’s handling, if it matches an allow rule, it passes or if it matches a deny rule, it is blocked.\n- **Traffic Forwarding:** Allowed packets are delivered to their destination, while blocked packets are discarded or recorded in a log.**Note:** Running firewall commands usually requires sudo privileges."
      },
      {
        "title": "3. Method 1: Configuring Firewall with iptables",
        "content": "iptables is a powerful Linux utility for managing network traffic. It allows system administrators to filter packets, block unwanted connections, and define custom security rules. This method is best suited for advanced users or those managing complex networks."
      },
      {
        "title": "4. How iptables Works",
        "content": "iptables operates using a three-tier structure"
      },
      {
        "title": "1. Tables",
        "content": "Tables are logical groupings of chains in iptables. Each table is designed for a specific type of packet processing, which allows precise control over network traffic. There are four commonly used tables:\n\n- **Filter (default table):** Handles general packet filtering like blocking or allowing traffic. It contains the default chains INPUT, OUTPUT, and FORWARD.\n- **NAT (Network Address Translation):** Changes packet source or destination addresses for port forwarding, masquerading, or mapping internal to public IPs. Its default chains are PREROUTING, POSTROUTING, and OUTPUT.\n- **Mangle:** Performs advanced packet modifications, such as changing the Type of Service (TOS), Time To Live (TTL), or Quality of Service (QoS). Its chains include PREROUTING, POSTROUTING, INPUT, OUTPUT, and FORWARD.\n- **Raw:** Pre-processes packets before connection tracking. This is useful to bypass tracking for certain packets from being tracked. Its chains are PREROUTING and OUTPUT."
      },
      {
        "title": "2. Chains",
        "content": "Chains are ordered sequences of rules within a table. Each chain processes packets in a specific direction or scenario. In the filter table, there are three default chains:\n\n- **INPUT:** Handles packets destined for the local machine, such as SSH connections from a remote system.\n- **OUTPUT:** Handles packets originating from the local machine, for example, HTTP requests sent to external servers.\n- **FORWARD:** Handles packets passing through the system that are not intended for local delivery, such as traffic routed through a Linux server acting as a gateway."
      },
      {
        "title": "3. Rules",
        "content": "Rules are the instructions in iptables that determine how packets should be handled. Each rule contains conditions (criteria) and an action (target). Common actions include:\n\n- **ACCEPT:** Allows the packet to continue to its destination. For example, permitting SSH traffic on port 22.\n- **DROP:** Silently discards the packet without sending a response. This is commonly used to block all traffic from a malicious IP.\n- **REJECT:** Blocks the packet and sends an error message to the sender, useful when you want the sender to know the traffic is denied.\n- **LOG:** Records packet details in system logs for monitoring or troubleshooting. For example, logging unauthorized connection attempts.\n- **JUMP:** Redirects the packet to another chain, which can be built-in or user-defined, allowing for modular rule organization.**Note:** Rules are evaluated from top to bottom in a chain. Once a packet matches a rule, the corresponding action is applied, and remaining rules are skipped. Proper ordering is crucial; for instance, an ACCEPT rule must come before a DROP rule for the same IP or port, otherwise the packet may be blocked prematurely."
      },
      {
        "title": "8. Step 1: Check Current Rules",
        "content": "Before modifying your firewall, it’s important to see the rules currently in place. Most Linux systems start with no predefined rules, but checking ensures you know the current state.\n\n**Command:**\n\n- **-L :** Lists all rules in each chain.**Output:**\n\n- **Target:** Action applied to matching packets (ACCEPT, DROP, REJECT).\n- **Prot:** Protocol used (TCP, UDP, ICMP, etc.).\n- **Source:** IP address where the packet originates.\n- **Destination:** IP address where the packet is going.\n- **Packets/Bytes:** Counters showing how many packets/bytes matched the rule.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Step 1: Check Current Rules",
          "snippet": "sudo iptables -L"
        }
      },
      {
        "title": "9. Step 2: Clear Existing Rules",
        "content": "Before creating new rules, it’s best to flush existing ones to avoid conflicts. This step resets the chains to a clean state.\n\n**Command:**\n\n- **-F :** Flushes all rules from all chains, removing them completely.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Step 2: Clear Existing Rules",
          "snippet": "sudo iptables -F"
        }
      },
      {
        "title": "10. Step 3: Set Default Policies",
        "content": "Default policies define what happens to packets that do not match any rule in a chain. Setting strict defaults ensures unrecognized traffic is handled safely.\n\n**Command:**\n\n- **-P <CHAIN> <POLICY>:** Sets the default policy for the chain.\n- **INPUT DROP:** Blocks all incoming traffic by default.\n- **FORWARD DROP:** Blocks forwarded packets by default.\n- **OUTPUT ACCEPT:** Allows outgoing traffic from the system.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Step 3: Set Default Policies",
          "snippet": "sudo iptables -P INPUT DROPsudo iptables -P FORWARD DROPsudo iptables -P OUTPUT ACCEPT"
        }
      },
      {
        "title": "11. Step 4: Allow Essential Traffic (ACCEPT Rule)",
        "content": "To allow essential traffic (such as SSH) while blocking others, you must explicitly accept packets before DROP rules. This ensures important traffic is processed first.\n\n**Syntax:**\n\n- **-A <chain_name>:** Append the rule to the end of the specified chain (INPUT, OUTPUT, FORWARD).\n- **-I <chain_name>:** Insert the rule at the beginning of the specified chain.\n- **-s <source_ip>:** Matches packets originating from this IP address.\n- **-p <protocol_name>:** Specifies the protocol to match (like tcp, udp).\n- **--dport <port_number>:** Specifies the destination port. This is valid only with -p <protocol_name>.\n- **-j <target_action>:** Defines the action for matching packets (like ACCEPT, DROP, REJECT).**Note:** Always insert ACCEPT rules before DROP rules, otherwise they may be blocked.\n\n**Example: Allow SSH Traffic from a Specific IP**\n\nSuppose we want to allow SSH traffic (default port 22) only from the network 192.168.1.3 while other traffic from this IP is blocked.\n\n**Command:**\n\nThis command checks for packets:\n\n- Originating from 192.168.1.3\n- Using the TCP protocol\n- Targeting port 22 on your machine\n- If all conditions match, the packet is accepted.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Step 4: Allow Essential Traffic (ACCEPT Rule)",
          "snippet": "sudo iptables [-A | -I] <chain_name> -s <source_ip> -p <protocol_name> --dport <port_number> -j <target_action>"
        }
      },
      {
        "title": "12. Troubleshooting ACCEPT Rules",
        "content": "Sometimes, the above command may not allow the packets.\n\n- iptables rules are processed from top to bottom.\n- Once a packet matches a rule, it does not continue to the lower rules.\n- In our scenario, if a DROP rule for 192.168.1.3 is above the ACCEPT rule, the packet is dropped before it reaches the ACCEPT rule."
      },
      {
        "title": "13. Fix: Insert Rule at the Top",
        "content": "**Command:**\n\n- **-I:** Inserts the rule at the beginning of the chain\n- This ensures packets from 192.168.1.3 destined for port 22 are checked first and allowed.Check the iptables configuration:\n\n**Command:**\n\n**Output:**\n\n- Now, any packet from 192.168.1.3 going to port 22 is accepted, while other packets follow the remaining rules.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Fix: Insert Rule at the Top",
          "snippet": "sudo iptables -I INPUT -s 192.168.1.3 -p tcp --dport 22 -j ACCEPT"
        }
      },
      {
        "title": "14. Step 5: Block Unwanted IPs",
        "content": "To protect your system, you can deny access from known malicious or unwanted IP addresses.\n\n**Syntax:**\n\n- **-A <chain_name>:** Append the rule to the end of the chain (INPUT, OUTPUT, FORWARD).\n- **-I <chain_name>:** Insert the rule at the beginning of the chain.\n- **-s <source_ip>:** The source IP address to match and block.\n- **-j <target_action>:** Action to take on matching packets (e.g., DROP, REJECT, LOG).**Example: Block a Specific IP**\n\nLet's assume we want to block the traffic coming from an IP address 192.168.1.3.\n\n**Command:**\n\n- **-A INPUT :** Append this rule to the end of the INPUT chain.\n- **-s 192.168.1.3 :** Source IP address to block.\n- **-j DROP :** Action to silently discard packets.**Optional: Logging Before Dropping**\n\nIt’s often useful to log traffic before dropping it to monitor potential attacks:\n\n- **--log-prefix:** Adds a prefix to syslog messages.\n- Useful for debugging or monitoring potential attacks.**Verify Command:**\n\n**Output:**\n\n- All traffic from 192.168.1.3 is now blocked without notifying the sender.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Step 5: Block Unwanted IPs",
          "snippet": "sudo iptables [-A | -I] <chain_name> -s <source_ip> -j <target_action>"
        }
      },
      {
        "title": "15. Step 6: Deleting a Rule (Optional)",
        "content": "If you want to delete the rule which accepts the traffic, Please follow the below example to understand it properly:\n\n**Syntax:**\n\n**Example:**\n\nDelete the rule that accepts traffic to port 22\n\n**Command:**\n\n**Note:** Rule numbers start from 1 in the iptables -L --line-numbers listing.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 15. Step 6: Deleting a Rule (Optional)",
          "snippet": "sudo iptables -D chain_name rule_number"
        }
      },
      {
        "title": "16. Step 7: Saving your Configuration",
        "content": "Saving your iptables configuration is optional on a personal computer, but it is highly recommended on a server. If the server restarts or crashes, unsaved rules will be lost, potentially leaving your system unprotected. The easiest way to persist your firewall rules is by using the iptables-persistent package.\n\n**Install iptables-persistent**\n\nYou can install it from Ubuntu’s default repositories:\n\n**Command:**\n\n- During installation, you may be prompted to save your current IPv4 and IPv6 rules. Choose “Yes” to save them.**Save Your Configuration**\n\nOnce installed, save your current iptables rules with:\n\n- This ensures that your firewall rules are automatically restored after a reboot.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 16. Step 7: Saving your Configuration",
          "snippet": "sudo apt-get updatesudo apt-get install iptables-persistent"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Managing Firewall Configuration in Linux",
      "initialCode": "sudo iptables -L",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Managing Firewall Configuration in Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Managing Firewall Configuration in Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Managing Firewall Configuration in Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Managing Firewall Configuration in Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-centos-net": {
    "id": "linux-centos-net",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Configuring Network Interfaces in CentOS/RHEL",
    "subtitle": "Complete Linux guide to Configuring Network Interfaces in CentOS/RHEL — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A network interface is a connection point between a computer and a network (private or public). It is typically implemented using a Network Interface Card (NIC), which can be physical hardware or software-based. For example, loopback addresses like 127.0.0.1 (IPv4) and ::1 (IPv6) are virtual interfaces used internally by the system.\n\n- Network interfaces can be physical (hardware NIC) or virtual (loopback, VLAN, etc.)\n- CentOS 9 uses NetworkManager with keyfile format instead of older ifcfg files\n- Interfaces can be configured using Static IP (manual) or DHCP (automatic)\n- Interface names are based on hardware location and type, making them predictable\n- Configuration can be done via CLI (nmcli) or GUI (nmtui) tools",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Configuring Network Interfaces in CentOS/RHEL."
        }
      },
      {
        "title": "2. Network Interface naming",
        "content": "Network interface names are assigned based on both their physical and virtual characteristics."
      },
      {
        "title": "1. Physical Interfaces",
        "content": "Physical interfaces are associated with actual hardware (NICs) installed in the system. Their names are based on the slot number and port number of the adapter.\n\n**Format:**\n\n**Examples:**\n\n- **e0, e1:** Single-port adapters\n- **e0c, e0d:** Multi-port adapters",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Physical Interfaces",
          "snippet": "e<slot_number><port_number>"
        }
      },
      {
        "title": "2. Virtual Interfaces",
        "content": "Virtual interfaces are software-based and do not correspond to physical hardware. These are commonly used for internal communication or advanced networking setups like VLANs.\n\n**VLAN Interface Format**\n\n- VLAN interfaces are created by combining a base interface name with a VLAN ID.**Examples:**\n\n- e7-2\n- ifgrp1-2",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Virtual Interfaces",
          "snippet": "<physical_interface>-<vlan_id><interface_group>-<vlan_id>"
        }
      },
      {
        "title": "3. Interface group names",
        "content": "Interface groups are user-defined and must follow these rules:\n\n- Must begin with a letter\n- Spaces are not allowed\n- Maximum length is 15 characters\n- Must be unique (not already in use)**Examples:**\n\n- web_ifgrp\n- ifgrp3"
      },
      {
        "title": "6. Method 1: Network Configuration via Command Line (CentOS 9)",
        "content": "We will configure network interfaces for Static IP and DHCP using the command line. It is important to note that in older versions of CentOS (below 9), network configuration files used the ifcfg format, which is now deprecated.\n\n- CentOS 9 uses the keyfile format, managed by NetworkManager."
      },
      {
        "title": "7. Step 1: List Available Network Devices",
        "content": "Before configuring the network, you need to identify available network interfaces.\n\n**Command:**\n\n- **nmcli:** Command-line tool for NetworkManager\n- **d:** Displays all network devices**Output:**\n\n**Note:** Before configuring the network, you need to identify available network interfaces."
      },
      {
        "title": "8. Step 2: Locate Network Configuration Files",
        "content": "Access existing network configuration files stored by NetworkManager. There you can see the current information about your network.\n\n**Command:**\n\n- **/etc/NetworkManager/system-connections:** Directory where keyfile-based configurations are stored\n- **ls:** Lists available configuration files**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Step 2: Locate Network Configuration Files",
          "snippet": "cd /etc/NetworkManager/system-connectionsls"
        }
      },
      {
        "title": "9. Step 3: Configure Network Interface",
        "content": "In this step, we configure key network parameters such as IP address, gateway, DNS, and interface mode.\n\n**Example 1: Set Static IP Address (IPv4 Address)**\n\nAssign a fixed IP address to the interface\n\n**Command:**\n\n- **connection modify:** Modifies an existing connection\n- **enp0s3:** Interface name (may vary on your system)\n- **ipv4.addresses:** Sets the IP address\n- **/24:** Subnet mask (equivalent to 255.255.255.0)**Output:**\n\n**Example 2: Set Gateway**\n\nDefine the default gateway for outbound traffic\n\n**Command:**\n\n**Output:**\n\n**Example 3: Configure DNS Server**\n\nSet DNS server for domain name resolution\n\n**Command:**\n\n**For multiple DNS:**\n\n- **ipv4.dns:** Specifies DNS server(s)\n- Multiple DNS values are separated by space**\n\nExample 4: Set Interface Mode (Static or DHCP)**\n\nDefine whether IP configuration is manual or automatic\n\n**Static IP (Manual) Command:**\n\n**DHCP (Automatic) Command:**\n\n- **manual:** Requires IP, gateway, DNS to be set manually\n- **auto:** Uses DHCP to automatically assign network settings**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Step 3: Configure Network Interface",
          "snippet": "nmcli connection modify enp0s3 ipv4.addresses 10.0.2.15/24"
        }
      },
      {
        "title": "10. Step 4: Restart Network Connection",
        "content": "Apply the changes by restarting the connection.\n\n**Command:**\n\n- **connection down:** Deactivates the network connection\n- **connection up:** Reactivates it with updated settings**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Step 4: Restart Network Connection",
          "snippet": "nmcli connection down enp0s3nmcli connection up enp0s3"
        }
      },
      {
        "title": "11. Step 5: Verify the Configuration",
        "content": "Ensure that the network settings have been applied correctly\n\n**Command:**\n\n- Displays detailed information about the interface**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Step 5: Verify the Configuration",
          "snippet": "nmcli device show enp0s3"
        }
      },
      {
        "title": "12. Method 2: GUI( Graphical user interface way)",
        "content": "CentOS also allows network configuration using a graphical interface through the nmtui tool. This is a terminal-based text GUI that simplifies setting IP addresses, gateways, DNS, and switching between static and DHCP modes."
      },
      {
        "title": "13. Install NetworkManager TUI (if not installed)",
        "content": "Ensure the GUI tool is available for configuration\n\n**Command:**\n\n- Installs the nmtui tool via the YUM package manager\n- Now that the Network Manager tool is installed follow the below steps to set the interface through GUI.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Install NetworkManager TUI (if not installed)",
          "snippet": "sudo yum -y install NetworkManager-tui"
        }
      },
      {
        "title": "14. Step 1: Open Network Manager (nmtui)",
        "content": "Open the text-based GUI interface for network management\n\n**Command:**\n\n- nmtui launches a terminal-based GUI for NetworkManager\n- Provides menus to edit connections, activate interfaces, and set system hostname**Output:**"
      },
      {
        "title": "15. Step 2: Choose “Edit a Connection”",
        "content": "- Select “Edit a connection” and press Enter\n- Choose your network interface (like enp0s3)\n- Press Enter to edit**Output:**\n\n**Note:** Interface names may vary depending on your system. This menu allows configuration of IP address, gateway, DNS, and connection method (Static or DHCP)"
      },
      {
        "title": "16. Step 3: Configure Network Interface",
        "content": "Set IP address, gateway, DNS, and connection method through GUI\n\n**For Static IP:**\n\n- **Set IPv4 Configuration:** Manual**Enter:**\n\n- IP Address (with subnet, like 10.0.2.15/24)\n- Gateway (like 10.0.2.2)\n- DNS servers (like 8.8.8.8, 8.8.4.4)**Output:**\n\n**DHCP Configuration:**\n\n- Set IPv4 Configuration: Automatic\n- No need to manually enter IP, gateway, or DNS**Output:**\n\n**Note:** Make sure to select the correct method depending on whether you want manual or automatic IP assignment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Configuring Network Interfaces in CentOS/RHEL",
      "initialCode": "e<slot_number><port_number>",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Configuring Network Interfaces in CentOS/RHEL",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Configuring Network Interfaces in CentOS/RHEL?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Configuring Network Interfaces in CentOS/RHEL",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Configuring Network Interfaces in CentOS/RHEL is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-net-troubleshooting": {
    "id": "linux-net-troubleshooting",
    "badge": "Module 7 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Network Configuration & Troubleshooting Commands",
    "subtitle": "Complete Linux guide to Network Configuration & Troubleshooting Commands — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Networks allow computers to communicate by sending data packets between a source and a destination. Linux provides a set of commands to configure network interfaces, test connectivity and troubleshoot network issues. These commands help verify connections, analyze network behavior and manage interfaces efficiently, making network administration easier and more reliable.\n\n- Verify network connectivity between systems.\n- Manage and configure network interfaces.\n- Analyze routing paths and identify network delays.\n- Troubleshoot DNS or IP related issues.\n- Monitor network traffic and interface statistics.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Network Configuration & Troubleshooting Commands."
        }
      },
      {
        "title": "1. Using Ping (Packet Internet Groper) Command",
        "content": "The ping command is used to check whether a computer can communicate with a specified device over the network. It sends ICMP (Internet Control Message Protocol) Echo Request packets to the destination and waits for replies, measuring the round-trip time.\n\n- Verify connectivity to another host or server.\n- Measure the time taken for packets to travel to the destination and back.\n- Identify packet loss in the network.\n- Test network speed and reliability."
      },
      {
        "title": "3. Example 1: Ping a domain",
        "content": "Verify network connectivity to Google's server. Sends continuous ICMP packets to the domain until interrupted with Ctrl+C.\n\n**Command:**\n\n**Output:**\n\n- Shows packets transmitted, packets received, packet loss percentage and round-trip times.ping google.com",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example 1: Ping a domain",
          "snippet": "ping google.com"
        }
      },
      {
        "title": "4. Example 2: Ping an IP address",
        "content": "Test connectivity using a direct IP address, bypassing DNS.\n\n**Command:**\n\n**Output:**\n\nping an IP",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Example 2: Ping an IP address",
          "snippet": "ping 216.58.203.142"
        }
      },
      {
        "title": "2. Using nslookup Command",
        "content": "The nslookup command is used to query DNS (Domain Name System) records. It helps retrieve the IP address associated with a domain name or find the domain name associated with an IP address. This command is commonly used for DNS troubleshooting.\n\n- Retrieve IP addresses for domain names.\n- Find the domain name associated with an IP address.\n- Diagnose DNS resolution issues.\n- Verify DNS server responses."
      },
      {
        "title": "6. Example: Query a domain",
        "content": "Retrieve the IP address of a domain for troubleshooting or verification. Sends a DNS query to the system’s configured DNS server and displays the response.\n\n**Command:**\n\n**Output:**\n\n- Shows the DNS server used, the queried domain and its IP address.nslookup facebook.com",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Example: Query a domain",
          "snippet": "nslookup facebook.com"
        }
      },
      {
        "title": "3. Using traceroute Command",
        "content": "The traceroute command is used to determine the path packets take from the source computer to a destination host. It shows each intermediate router (hop) the packets pass through and the time taken for each hop.\n\n- Identify the route taken by packets to reach a destination.\n- Detect network delays or bottlenecks.\n- Troubleshoot connectivity issues along the path.\n- Verify network routing and hop counts."
      },
      {
        "title": "8. Example: Trace route to a domain",
        "content": "Understand the path and delays between your system and Google’s server. Sends packets with incrementally increasing TTL (Time To Live) values to reveal each hop along the route.\n\n**Command:**\n\n**Output:**\n\ntraceroute www.google.com",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Example: Trace route to a domain",
          "snippet": "traceroute www.google.com"
        }
      },
      {
        "title": "4. Using host Command",
        "content": "The host command is used to perform DNS lookups. It can resolve a domain name to an IP address or find the domain name associated with an IP address. The returned IP address may be IPv4 or IPv6.\n\n- Perform simple DNS lookups.\n- Convert a domain name to an IP address.\n- Convert an IP address to a domain name.\n- Quickly troubleshoot DNS issues."
      },
      {
        "title": "10. Example 1: Domain to IP lookup",
        "content": "Find the IP address associated with a domain. Queries the DNS system and returns the corresponding IP address.\n\n**Command:**\n\n**Output:**\n\nhost google.com",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Example 1: Domain to IP lookup",
          "snippet": "host google.com"
        }
      },
      {
        "title": "11. Example 2: IP to Domain lookup",
        "content": "Find the domain associated with a specific IP address.\n\n**Command:**\n\n**Output:**\n\nhost 31.13.78.35",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Example 2: IP to Domain lookup",
          "snippet": "host 31.13.78.35"
        }
      },
      {
        "title": "5. Using netstat Command",
        "content": "The netstat (Network Statistics) command displays information about network connections, routing tables, interface statistics and port status. It provides insights into the Linux networking subsystem, often using data from /proc/net.\n\n- Monitor active network connections.\n- View routing tables for packet paths.\n- Check interface statistics like packets sent/received.\n- Inspect port usage and listening services."
      },
      {
        "title": "13. Example 1: Display all network connections",
        "content": "See active TCP/UDP connections and listening ports. Shows protocol, local and remote addresses, connection state and PID/Program name.\n\n**Command:**\n\n**Output:**\n\nnetstat"
      },
      {
        "title": "14. Example 2: Display routing table",
        "content": "Inspect how network packets are routed through the system.\n\n**Command:**\n\n- **-r:** Displays the routing table, showing destination, gateway, netmask, flags and interface.**Output:**\n\nnetstat -r**Note:** netstat has been deprecated use ss instead",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Example 2: Display routing table",
          "snippet": "netstat -r"
        }
      },
      {
        "title": "6. Using arp Command",
        "content": "The arp (Address Resolution Protocol) command is used to view and manage the ARP cache, which stores mappings of IP addresses to MAC addresses. The system uses ARP to identify the hardware address associated with an IP address on the local network.\n\n- Display ARP cache entries.\n- Troubleshoot IP-to-MAC address mapping issues.\n- Add or remove static ARP entries if needed.\n- Verify local network connectivity at the link layer."
      },
      {
        "title": "16. Example 1: Display ARP cache",
        "content": "View current IP-to-MAC mappings on the system. Lists the IP addresses, their corresponding MAC addresses and the interface through which they were learned.\n\n**Command:**\n\n**Output:**\n\narp"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Network Configuration & Troubleshooting Commands",
      "initialCode": "ping google.com",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Network Configuration & Troubleshooting Commands",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Network Configuration & Troubleshooting Commands?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Network Configuration & Troubleshooting Commands",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Network Configuration & Troubleshooting Commands is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-ps-cmd": {
    "id": "linux-ps-cmd",
    "badge": "Module 8 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "ps Command: Viewing Running Processes",
    "subtitle": "Complete Linux guide to ps Command: Viewing Running Processes — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The ps command in Linux is used to display information about currently running processes. It provides a snapshot of processes at the time the command is executed. System administrators commonly use it to monitor processes, troubleshoot issues, and identify resource usage.\n\n- Display currently running processes on a Linux system\n- Identify process IDs (PIDs) for management tasks like stopping processes\n- View process ownership, CPU usage, and memory consumption\n- Inspect background processes and system services\n- Filter processes based on users, IDs, terminals, or command names",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for ps Command: Viewing Running Processes."
        }
      },
      {
        "title": "2. Example: Display Processes in the Current Terminal",
        "content": "This command displays the processes running in the current shell session. When executed without options, the ps command only shows processes associated with the current terminal.\n\n**Command:**\n\n**Output:**\n\n- **PID:** the unique process ID\n- **TTY:** terminal type controlling the particular process\n- **TIME:** amount of CPU in minutes and seconds that the process has been running\n- **CMD:** name of the command that launched the process"
      },
      {
        "title": "3. Syntax",
        "content": "- **ps:** The command used to display process information\n- **[options]:** Optional flags that modify how process information is displayed**Note:** Without any options, ps displays information about the processes associated with the current terminal session.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "ps [options]"
        }
      },
      {
        "title": "1. -e : Display All Running Processes",
        "content": "The -e option displays all running processes on the system. Use this option when you need a complete list of system processes, including background services and processes from other users.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "2. -f : Display Full Process Format",
        "content": "The -f option displays full-format listing, including additional columns like parent process ID. Use this option when you want detailed process information, such as process hierarchy and user ID.\n\n**Example:**\n\n**Output:**"
      },
      {
        "title": "3. -u : Display Processes for a Specific User",
        "content": "The -u option filters processes based on the user who started them. This option is useful when monitoring the activity of a particular user on a multi-user system.\n\n**Syntax:**\n\n- **username:** Replace with the name of the user whose processes you want to view.**Example: View processes owned by the root user**\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -u : Display Processes for a Specific User",
          "snippet": "ps -u username"
        }
      },
      {
        "title": "4. -x : Show Processes Without a Controlling Terminal",
        "content": "The -x option displays processes that do not have a controlling terminal (TTY). These processes usually run in the background and include system services and daemons.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "5. -a : Display Processes for All Users With a Terminal",
        "content": "The -a option lists processes for all users that are associated with a terminal, except session leaders.\n\n**Syntax:**\n\n**Command:**\n\n**Output:**\n\n**Note:** A session leader is the first process in a session that starts other processes. Its process ID (PID) is usually the same as the session ID (SID)."
      },
      {
        "title": "6. -p : Display Process by Process ID",
        "content": "Every process in Linux has a unique Process ID (PID). The -p option allows users to display information about specific processes using their Process IDs (PIDs). Multiple PIDs can be provided as a space-separated or comma-separated list.\n\n**Syntax:**\n\n**Multiple PIDs:**\n\n**Example: Display Specific Processes**\n\n**Command:**\n\n- **ps -p \"1 2\":** Displays information for PID 1 and PID 2.\n- **ps -p 3,4:** Demonstrates that comma-separated PIDs can also be used.\n- **ps -p \"5 6\" -p 7,8:** Shows that the -p option can be used multiple times, and ps will combine all specified PIDs into a single result.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. -p : Display Process by Process ID",
          "snippet": "ps -p process_id"
        }
      },
      {
        "title": "7. --forest : Display Process Tree Structure",
        "content": "The --forest option displays processes in a hierarchical tree format, showing parent-child relationships between processes.\n\n**Syntax**\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. --forest : Display Process Tree Structure",
          "snippet": "ps -ef --forest"
        }
      },
      {
        "title": "8. -A : View All Running Processes in Linux",
        "content": "The -A option displays all running processes on the Linux system. It is similar to the -e option and shows processes from all users including system services and background tasks.\n\n**Syntax:**\n\n**Output:**"
      },
      {
        "title": "9. -d : List All Processes Except Session Leaders",
        "content": "The -d option lists all processes except session leaders. This helps filter out top-level processes when analyzing system activity.\n\n**Syntax:**\n\n**Output:**"
      },
      {
        "title": "10. -N or --deselect : Exclude Specific Processes",
        "content": "The -N (or --deselect) option negates the selection criteria. Instead of showing matching processes, it shows all processes except those that match the given condition.\n\n**Syntax:**\n\nor\n\n**Example: Display Only Session Leaders and Processes Without a Terminal**\n\n**Command:**\n\n**Output:**\n\n- Lists processes that do not match the selection criteria.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. -N or --deselect : Exclude Specific Processes",
          "snippet": "ps [selection_option] -N"
        }
      },
      {
        "title": "11. aux : Detailed Snapshot of All Running Processes",
        "content": "The ps aux format displays a detailed view of all running processes including user processes, system services, and background tasks. It provides information such as CPU usage, memory usage, process owner, start time, command name.\n\n**Syntax:**\n\n**Output:**\n\n- Displays a detailed list of all system processes."
      },
      {
        "title": "12. -T : List Processes Associated With the Current Terminal",
        "content": "The -T option displays all processes associated with the current terminal session. This helps users identify commands running within their terminal.\n\n**Syntax:**\n\n**Output:**\n\n- Shows processes linked to the current terminal."
      },
      {
        "title": "13. -C: Select Processes by Command Name",
        "content": "The -C option filters processes based on the command name (executable name). This is useful when you know the program name but not its PID.\n\n**Syntax:**\n\n**Example: View Processes for systemd**\n\n**Command:**\n\n**Output:**\n\n- Displays processes whose executable name matches the specified command.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. -C: Select Processes by Command Name",
          "snippet": "ps -C command_name"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: ps Command: Viewing Running Processes",
      "initialCode": "ps [options]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: ps Command: Viewing Running Processes",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of ps Command: Viewing Running Processes?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to ps Command: Viewing Running Processes",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "ps Command: Viewing Running Processes is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-top-cmd": {
    "id": "linux-top-cmd",
    "badge": "Module 8 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "top Command: Real-Time Process Monitoring",
    "subtitle": "Complete Linux guide to top Command: Real-Time Process Monitoring — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The top command is a real-time system monitoring utility available on Linux systems. It presents a continuously updated view of running processes along with overall system resource usage such as CPU load, memory consumption, and system uptime.\n\n- Displays a live list of running processes with resource consumption details\n- Shows overall CPU usage, memory usage, and load averages\n- Allows interactive process management from the terminal\n- Updates system statistics continuously without restarting the command",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for top Command: Real-Time Process Monitoring."
        }
      },
      {
        "title": "2. Example: Run top Without Any Options",
        "content": "**Command:**\n\nlive view of system activityRunning top without options starts the interactive monitoring interface. The display refreshes automatically and lists active processes along with CPU usage, memory usage, load averages, and system uptime. Press q to exit the interface.\n\nHere,\n\n- **PID:** Shows task’s unique process id.\n- **USER:** User name of owner of task.\n- **PR: **The process’s priority. The lower the number, the higher the priority.\n- **NI:** Represents a Nice Value of task. A Negative nice value implies higher priority, and positive Nice value means lower priority.\n- **VIRT:** Total virtual memory used by the task.\n- **RES:** How much physical RAM the process is using, measured in kilobytes.\n- **SHR:** Represents the Shared Memory size (kb) used by a task.\n- **%CPU: **Represents the CPU usage.\n- **%MEM: **Shows the Memory usage of task.\n- **TIME+:** CPU Time, the same as ‘TIME’, but reflecting more granularity through hundredths of a second.\n- **COMMAND:** The name of the command that started the process."
      },
      {
        "title": "3. Syntax:",
        "content": "- **top:** Starts the system monitoring utility in interactive mode.\n- **[options]:** Represents optional flags that modify the behavior or output of the command. These flags control aspects such as refresh behavior, process selection, and display format.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax:",
          "snippet": "top [options]"
        }
      },
      {
        "title": "4. Interpreting top Command Output",
        "content": "The top command output is divided into several sections, each with specific information about system performance and processes. This section provides a breakdown of the output based on the information it shows."
      },
      {
        "title": "1. Uptime / Summary",
        "content": "When you first open the top command, the initial line, often referred to as the header or summary line, displays information similar to what you see when you use the uptime command. It shows:\n\n- **System Time:** The current time on the system.\n- **Uptime:** How long the system has been running since the last boot.\n- **Users:** The number of users currently logged into the system.\n- **Load Average:** This is shown in three numbers separated by commas. These numbers represent the average number of processes waiting for CPU time over the last 1 minute, 5 minutes, and 15 minutes, respectively. A value of 1.0 means the system's CPU is fully utilized for a single core ; higher values indicate potential overloading."
      },
      {
        "title": "2. Tasks",
        "content": "The Tasks section provides an overview of all processes currently managed by the system. It categorizes them based on their state.\n\n- **total:** Indicates the total count of processes currently being tracked by the system.\n- **running:** Represents the number of processes currently actively using CPU time.\n- **sleeping:** Refers to processes that are currently idle and waiting for a signal to wake up.\n- **stopped:** Denotes processes that have been manually stopped, typically through a signal.\n- **zombie:** Indicates processes that have completed execution but still have an entry in the process table."
      },
      {
        "title": "3. %Cpu(s)",
        "content": "The %CPU line shows how the CPU time is distributed across different types of tasks. This helps in identifying which activities are consuming CPU resources.\n\n- **us:** Percentage of CPU time spent running user processes.\n- **sy:** Percentage of CPU time spent running kernel (system) processes.\n- **ni:** Percentage of CPU time spent running processes with a nice value (priority adjusted).\n- **id:** Percentage of CPU time spent idle (no work being done).\n- **wa:** Percentage of CPU time spent waiting for I/O operations to complete.\n- **hi:** Percentage of CPU time spent servicing hardware interrupts.\n- **si:** Percentage of CPU time spent servicing software interrupts.\n- **st:** Percentage of CPU time stolen from this virtual machine by the hypervisor (if virtualized)."
      },
      {
        "title": "4. Memory (MiB Mem)",
        "content": "The MiB Mem line provides detailed information about the system's physical memory (RAM) usage. It helps in understanding how memory is allocated and used by processes and the system.\n\n- **total:** Total amount of physical memory (RAM) available in MiB.\n- **used:** Amount of RAM currently in use by processes and the kernel.\n- **free:** Amount of RAM not in use.\n- **buff/cache:** Amount of memory used for buffering data and caching filesystems."
      },
      {
        "title": "5. Swap (MiB Swap)",
        "content": "The MiB Swap line shows information about swap space usage, which acts as overflow memory when RAM is full. Monitoring swap helps identify memory pressure on the system.\n\n- **total:** Total amount of swap space available in MiB.\n- **used:** Amount of swap space currently in use.\n- **free:** Amount of swap space that is not being used.\n- **available:** Estimate of how much memory is available for starting new applications without swapping."
      },
      {
        "title": "10. -v (Display Version Information)",
        "content": "The -v option prints the installed version of the top utility and exits immediately.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. -v (Display Version Information)",
          "snippet": "top -v\nor\ntop --version"
        }
      },
      {
        "title": "11. -p (Monitor a Specific Process by PID)",
        "content": "The -p option limits the display to only the process or processes you choose by their Process ID (PID). Other running processes will not appear.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. -p (Monitor a Specific Process by PID)",
          "snippet": "top -p <PID>"
        }
      },
      {
        "title": "12. -M (Set Memory Display Unit)",
        "content": "The -M option changes the unit used to display memory in top. By default, memory may be shown in kilobytes, but this option allows switching between kilobytes, megabytes, or gigabytes.\n\n**Syntax:**\n\n- **-M:** selects the memory unit\n- **m:** displays memory in megabytes\n- **k:** displays memory in KB\n- **g:** displays memory in GB**Example:**\n\nDisplays memory usage in kilobytes\n\n**Note: **The -M option is available in some versions of top, particularly in older or alternative implementations (like on BSD or in older procps versions)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. -M (Set Memory Display Unit)",
          "snippet": "top -M [k or m or g]"
        }
      },
      {
        "title": "13. -b (Batch Mode for Logging or Scripts)",
        "content": "The -b option runs top in batch mode, which outputs the data in a plain text format instead of the interactive interface. This is useful for saving or processing the output in scripts.\n\n**Syntax:**\n\n**Example:**\n\n- **-b:** Enables batch mode\n- **-n 1:** Tells top to update only once and then exit**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. -b (Batch Mode for Logging or Scripts)",
          "snippet": "top -b [options]"
        }
      },
      {
        "title": "14. -1 (Show CPU Usage Per Core)",
        "content": "The -1 option displays CPU usage for each individual core instead of showing an overall average.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "15. -h (Display Help Information)",
        "content": "The -h option prints help information about top options and usage, then exits.\n\n**Syntax:**\n\n**Example: **\n\n**Output:**\n\nOutput"
      },
      {
        "title": "16. Interactive Keys in top",
        "content": "The top command supports several interactive keys to manage processes, adjust display, and sort information while it is running. These keys allow real-time control without restarting the command."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: top Command: Real-Time Process Monitoring",
      "initialCode": "top [options]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: top Command: Real-Time Process Monitoring",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of top Command: Real-Time Process Monitoring?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to top Command: Real-Time Process Monitoring",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "top Command: Real-Time Process Monitoring is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-htop-cmd": {
    "id": "linux-htop-cmd",
    "badge": "Module 8 • Linux & Shell",
    "readingTime": "26 min read",
    "level": "Advanced",
    "title": "htop Command: Interactive Process Viewer",
    "subtitle": "Complete Linux guide to htop Command: Interactive Process Viewer — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The htop command is an interactive process monitoring tool in Linux used to view and manage system resources in real time. It is an improved version of the top command, offering a more user-friendly interface with better visualization and control.\n\n- Monitor CPU, memory, and swap usage in real time\n- View and manage running processes interactively\n- Sort, filter, and search processes easily\n- Display process hierarchy (tree view)\n- Support keyboard and mouse interactionsTo open the interactive process monitoring interface.\n\n**Command:**\n\n**Output:**\n\nsystem stats",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for htop Command: Interactive Process Viewer."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **htop:** Command name\n- **[options]:** Optional flags to modify behavior",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax",
          "snippet": "htop [options]"
        }
      },
      {
        "title": "1. -d: Set Update Delay",
        "content": "Sets the delay between screen updates (in tenths of a second), which helps reduce frequent refreshes and makes the display easier to read while lowering CPU usage.\n\n**Command:**\n\n- **-d:** Specifies update interval\n- **10:** 1.0 second delay (value is in tenths)**Output:**\n\nBefore adding delayAfter adding delay of 30",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -d: Set Update Delay",
          "snippet": "htop -d 10"
        }
      },
      {
        "title": "2. -u: Display Processes of a Specific User",
        "content": "Displays only the processes owned by a specific user, which is useful when monitoring or troubleshooting activity related to a particular account.\n\n**Syntax:**\n\n- **<user>:** Username whose processes will be displayed**Example Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -u: Display Processes of a Specific User",
          "snippet": "htop -u <user>"
        }
      },
      {
        "title": "3. -p: Display Specific Process IDs",
        "content": "Shows only the specified process IDs, allowing you to focus on monitoring selected processes instead of the entire system.\n\n**Syntax:**\n\n- **<pid1,pid2>:** One or more process IDs, specified as a comma-separated list.**Example:**\n\n**Output:**\n\nhtop -p 369",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -p: Display Specific Process IDs",
          "snippet": "htop -p <pid1,pid2>"
        }
      },
      {
        "title": "4. -s: Sort Processes by Column",
        "content": "Sorts processes based on a specified column, helping quickly identify processes consuming high CPU, memory, or other resources.\n\n**Syntax:**\n\n- **<column>:** Column name (e.g., PERCENT_CPU, PERCENT_MEM)**Example Command:**\n\n**Output:**\n\nhtop -s PRIORITY",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -s: Sort Processes by Column",
          "snippet": "htop -s <column>"
        }
      },
      {
        "title": "5. -t: Display Process Tree View",
        "content": "Displays processes in a hierarchical tree view, making it easier to understand parent-child relationships between processes.\n\n**Example: Display Process Tree View**\n\nTo visualize parent-child relationships between processes.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "6. --no-color: Disable Colored Output",
        "content": "Runs htop in monochrome mode by disabling colored output, which is useful in terminals that do not support colors.\n\n**Command:**\n\n**Output:**\n\n--no-color",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. --no-color: Disable Colored Output",
          "snippet": "htop --no-color"
        }
      },
      {
        "title": "7. -v / --version: Display Version Information",
        "content": "Displays the installed version of htop, which is useful for verifying compatibility or troubleshooting.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. -v / --version: Display Version Information",
          "snippet": "htop --version"
        }
      },
      {
        "title": "10. Interactive Controls in htop",
        "content": "htop provides keyboard shortcuts for easy navigation and process management."
      },
      {
        "title": "11. Navigation Keys:",
        "content": "- **Arrow Keys:** Move through process list\n- **Page Up / Page Down:** Scroll pages\n- **Home / End:** Jump to start or end"
      },
      {
        "title": "12. Process Selection:",
        "content": "- **Space:** Tag or untag a process\n- **U:** Untag all processes\n- **s:** Trace system calls of a process"
      },
      {
        "title": "13. Function Keys:",
        "content": "- **F1:** Help\n- **F2:** Setup (customize display)\n- **F3:** Search process\n- **F4:** Filter processes\n- **F5:** Tree view\n- **F6:** Sort processes\n- **F7:** Increase priority (nice value)\n- **F8:** Decrease priority\n- **F9:** Kill process\n- **F10:** Quit**Output:**\n\nComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: htop Command: Interactive Process Viewer",
      "initialCode": "htop [options]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: htop Command: Interactive Process Viewer",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of htop Command: Interactive Process Viewer?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to htop Command: Interactive Process Viewer",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "htop Command: Interactive Process Viewer is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-kill-cmd": {
    "id": "linux-kill-cmd",
    "badge": "Module 8 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "kill Command & POSIX Signals (SIGTERM, SIGKILL)",
    "subtitle": "Complete Linux guide to kill Command & POSIX Signals (SIGTERM, SIGKILL) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The kill command in Linux is used to send signals to processes in order to control their execution. It is commonly used to terminate processes, but it can also pause, resume, or perform other actions depending on the signal sent. The kill command sends signals to processes using their Process ID (PID).\n\n- Located in /bin/kill , it’s a built-in Linux command.\n- Sends specific signals to processes using their Process ID (PID).\n- By default, it sends the SIGTERM (15) signal to terminate a process.\n- Can use other signals like SIGKILL (9) or SIGSTOP (19) for different actions.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for kill Command & POSIX Signals (SIGTERM, SIGKILL)."
        }
      },
      {
        "title": "2. Example: Killing the Mozilla Firefox Process",
        "content": "Terminate the Mozilla Firefox browser process when it becomes unresponsive or needs to be closed from the terminal."
      },
      {
        "title": "3. Step 1: Identify the Firefox PID",
        "content": "Check the running Firefox processes and their PIDs.\n\n**Command:**\n\n- **ps aux:** Lists all running processes with details.\n- **grep firefox:** Filters processes related to Firefox.**Output:**\n\n- **22673:** Is the main Firefox process PID. Other Firefox processes listed are child processes associated with it.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Step 1: Identify the Firefox PID",
          "snippet": "ps aux | grep firefox"
        }
      },
      {
        "title": "4. Step 2: Gracefully Terminate Firefox",
        "content": "Send the SIGTERM (15) signal to allow Firefox to close properly.\n\n**Command:**\n\n**Explanation:**\n\n- 22673 is the PID of the main Firefox process.\n- The default SIGTERM signal requests a graceful shutdown.\n- Child processes may terminate automatically along with the parent process.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step 2: Gracefully Terminate Firefox",
          "snippet": "kill 22673"
        }
      },
      {
        "title": "5. Step 3: Force Kill Firefox (if it doesn’t close)",
        "content": "If Firefox is unresponsive, use SIGKILL (9) to terminate it immediately.\n\n**Command:**\n\n- **-9:** Sends the SIGKILL signal. Forces the process to stop immediately without cleanup.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Step 3: Force Kill Firefox (if it doesn’t close)",
          "snippet": "kill -9 22673"
        }
      },
      {
        "title": "6. Step 4: Verify Firefox Termination",
        "content": "Check that no Firefox processes remain:\n\nCommand:\n\n**Output:**\n\n- Only the grep command appears. No active Firefox processes remain, confirming termination.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Step 4: Verify Firefox Termination",
          "snippet": "ps aux | grep firefox"
        }
      },
      {
        "title": "7. Syntax",
        "content": "- **[-signal]: **Optional signal specifying the action by either a number (like -9, -15) or a name (like -KILL, -TERM, -STOP).\n- **PID:** The Process ID of the target process.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Syntax",
          "snippet": "kill [-signal] <PID>"
        }
      },
      {
        "title": "8. Common Signals Used with the kill Command",
        "content": "Some frequently used signals in the kill command are:\n\n- **SIGHUP Hangup (1):** Sent when the controlling terminal is closed or the parent process ends. Often used to make a process reload its configuration without stopping it.\n- **SIGINT Signal Interrupt (2):** Sent when you press Ctrl+C in the terminal. It interrupts a running process and asks it to stop gracefully.\n- **SIGKILL Kill Signal (9):** Forcefully terminates a process immediately. The process cannot ignore this signal. Used when a program is unresponsive.\n- **SIGTERM Terminate Signal (15):** Requests a process to terminate gracefully, allowing it to clean up resources such as open files. This is the default signal used by the kill command.\n- **SIGCONT Continue Signal (18):** Resumes a paused process that was previously stopped using SIGSTOP.\n- **SIGSTOP Stop Signal (19):** Pauses or suspends a process temporarily without terminating it. Can be resumed later with SIGCONT."
      },
      {
        "title": "9. Different Ways to Send Signals with kill",
        "content": "Signals can be specified in three ways; they are as follows:"
      },
      {
        "title": "1. Using Signal Number",
        "content": "We can specify a signal using a number. For example, we have a PID `1212` and want to send a `SIGKILL` signal to kill this PID. SIGKILL has a signal number of `9` (To find signal numbers run `kill -l` command).\n\n**Syntax:**\n\n- **-9:** Signal number for SIGKILL (force termination).\n- **<PID>:** Process ID of the target process.**Command Example:**\n\n**Expected Output:**\n\n**Note:** SIGKILL immediately stops the process. The process cannot ignore or handle this signal.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Using Signal Number",
          "snippet": "kill -9 <PID>"
        }
      },
      {
        "title": "2. Using Signal Names with SIG Prefix",
        "content": "We can also specify signal using SIG prefix. For example, we need to send a signal `SIGTERM` and PID is `1432`. To just check signal number of `SIGTERM` signal we can use `kill -l` command.\n\n**Syntax:**\n\n- **-SIGTERM:** Signal name with SIG prefix.\n- **<PID>:** Process ID of the target process.**Command Example:**\n\n**Expected Output:**\n\n**Notes:** SIGTERM allows the process to clean up resources before exiting. This is the default signal used by kill.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Using Signal Names with SIG Prefix",
          "snippet": "kill -SIGTERM <PID>"
        }
      },
      {
        "title": "3. Using Signal Names Without SIG Prefix",
        "content": "We can also specify signals without using SIG prefix. For example, if you want to send signal `TERM` and PID `1234`. To just check signal number of `TERM` signal we can use `kill -l` command.\n\n**Syntax:**\n\n- **-TERM:** Signal name without SIG prefix.\n- **<PID>:** Process ID of the target process.**Command Example:**\n\n**Expected Output:**\n\n**Notes:** Linux allows both -SIGTERM and -TERM formats. Both commands send the same signal.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Using Signal Names Without SIG Prefix",
          "snippet": "kill -TERM <PID>"
        }
      },
      {
        "title": "13. Options in kill Command",
        "content": "There are different types of options used in the kill command."
      },
      {
        "title": "1. kill -l",
        "content": "The kill -l command lists all available signals that can be used with the kill command.\n\n**Syntax:**\n\n**Output:**\n\nkill -l"
      },
      {
        "title": "15. Finding Process ID (PID)",
        "content": "The kill command is used when we know the process ID (PID) of a running process. To use kill, we must first find the PID of the process we want to stop or control. This can be done using commands like ps, pidof, or top."
      },
      {
        "title": "16. Method 1. Using ps command",
        "content": "By using ps command to find the process ID.\n\n**Syntax:**\n\n**Output:**\n\nps"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: kill Command & POSIX Signals (SIGTERM, SIGKILL)",
      "initialCode": "ps aux | grep firefox",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: kill Command & POSIX Signals (SIGTERM, SIGKILL)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of kill Command & POSIX Signals (SIGTERM, SIGKILL)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to kill Command & POSIX Signals (SIGTERM, SIGKILL)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "kill Command & POSIX Signals (SIGTERM, SIGKILL) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-nice-renice": {
    "id": "linux-nice-renice",
    "badge": "Module 8 • Linux & Shell",
    "readingTime": "18 min read",
    "level": "Advanced",
    "title": "nice and renice: Controlling Process Priority",
    "subtitle": "Complete Linux guide to nice and renice: Controlling Process Priority — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In Linux, the nice and renice commands are used to manage process priorities, controlling how much CPU time each process receives. These commands help optimize system performance when multiple processes compete for resources.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for nice and renice: Controlling Process Priority."
        }
      },
      {
        "title": "1. nice Command",
        "content": "- Nice values range from -20 to +19\n- A lower nice value means higher scheduling priority\n- A higher nice value means lower scheduling priority**Note:** The nice value influences scheduler priority; it is not the actual scheduler priority itself"
      },
      {
        "title": "2. renice Command",
        "content": "- Used to change the priority of an already running process.\n- Helps dynamically adjust system performance based on current CPU usage."
      },
      {
        "title": "1. To check the nice value of a process",
        "content": "To check the current nice value of a specific process, you can use the 'ps' command combined with 'grep':\n\n**Command:**\n\n**Output:**\n\n**The sixth column (NI) represents the nice value\n\nNote:** ps -el lists processes system-wide. Using ps -o pid,ni,cmd alone would show only the current shell’s processes unless combined with -e.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. To check the nice value of a process",
          "snippet": "ps -el | grep terminal"
        }
      },
      {
        "title": "2. To set the priority of a process",
        "content": "To start a new process with a specific nice value\n\n**Command:**\n\n**Output:**\n\nThis sets the nice value of the gnome-terminal process to '10', lowering its priority compared to processes with a nice value closer to '0' or negative values.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. To set the priority of a process",
          "snippet": "nice -n 10 gnome-terminal"
        }
      },
      {
        "title": "3. To set the negative priority for a process",
        "content": "To give a process higher priority by assigning a negative nice value, use:\n\n**Command:**\n\n**Output:**\n\nNegative nice values increase the process's priority, allowing it to receive more CPU time. This is especially useful for critical tasks that need to run faster.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. To set the negative priority for a process",
          "snippet": "sudo nice --10 gnome-terminal"
        }
      },
      {
        "title": "4. Changing priority of the running process",
        "content": "To modify the priority of an already running process, use the 'renice' command with the process ID (PID):\n\n**Command:**\n\n**Output:**\n\nThis will change the priority of the process with pid 77982.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Changing priority of the running process",
          "snippet": "sudo renice -n 15 -p 77982"
        }
      },
      {
        "title": "5. To change the priority of all processes of a specific group",
        "content": "You can also adjust the priority of all processes within a specific group by specifying the group ID (GID):\n\n**Command:**\n\n**Output:**\n\nThis command will set all the processes of gid 4 priority to 10, reducing their CPU time allocation.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. To change the priority of all processes of a specific group",
          "snippet": "renice -n 10 -g 4"
        }
      },
      {
        "title": "6. To change the priority of all processes of a specific user",
        "content": "To change the priority of all processes belonging to a specific user, use the renice command with the user ID (UID):\n\n**Command:**\n\n**Output:**\n\nThis will set all the processes of user 2 to 10, making them lower priority.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. To change the priority of all processes of a specific user",
          "snippet": "sudo renice -n 10 -u 2"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: nice and renice: Controlling Process Priority",
      "initialCode": "ps -el | grep terminal",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: nice and renice: Controlling Process Priority",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of nice and renice: Controlling Process Priority?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to nice and renice: Controlling Process Priority",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "nice and renice: Controlling Process Priority is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-bg-cmd": {
    "id": "linux-bg-cmd",
    "badge": "Module 8 • Linux & Shell",
    "readingTime": "10 min read",
    "level": "Advanced",
    "title": "bg Command: Running Jobs in Background",
    "subtitle": "Complete Linux guide to bg Command: Running Jobs in Background — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The bg command in Linux is used to resume a suspended job and run it in the background. It allows processes to continue execution without blocking the terminal.\n\n- Moves a stopped (suspended) job to the background\n- Works with job control in the shell (like Bash)\n- Requires a job ID (e.g., bg %1) to resume a specific job\n- Commonly used after suspending a process using Ctrl + Z\n- Allows the terminal to be used for other commands while the job runs",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for bg Command: Running Jobs in Background."
        }
      },
      {
        "title": "2. Example",
        "content": "**Step 1:** Start a long-running process (e.g., sleep 60).\n\n**Step 2:** Suspend the process by pressing Ctrl + Z.\n\n**Output:**\n\n**Step 3:** Resume the suspended process in the background using bg.\n\n**Output:**\n\nOutput\n- The process sleep 60 resumes execution in the background.\n- You can verify it by running the jobs command:"
      },
      {
        "title": "3. Syntax",
        "content": "where,\n\n- job_spec: This is used to identify the job you want to move to the background. It can be specified in several formats:\n- %n: Refers to job number n.\n- %str: Refers to a job that was started by a command beginning with str.\n- %?str: Refers to a job that was started by a command containing str.\n- %% or %+: Refers to the current job. Both fg and bg commands will operate on this job if no job_spec is provided.\n- %-: Refers to the previous job.If no job_spec is provided, the most recent job is resumed in the background.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "bg [job_spec ...]"
        }
      },
      {
        "title": "1. bg [JOB_SPEC]:",
        "content": "This command is used to run the mentioned job in the background.\n\nCommand:\n\n**Output:**\n\nThe command sleep 500 creates a foreground job.\n\n- We use jobs command to list all jobs\n- We create a process using sleep command, we get its ID as 1.\n- We move it to the background using its job ID with bg",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. bg [JOB_SPEC]:",
          "snippet": "jobssleep 500# Press: Ctrl + Z   (to suspend the process)jobsbg %1jobs"
        }
      },
      {
        "title": "2. bg --help:",
        "content": "Displays the help information for the bg command. This is useful if you need more information.\n\nCommand:\n\n**Output:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. bg --help:",
          "snippet": "bg --help"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: bg Command: Running Jobs in Background",
      "initialCode": "[1]+  Stopped                 sleep 60",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: bg Command: Running Jobs in Background",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of bg Command: Running Jobs in Background?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to bg Command: Running Jobs in Background",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "bg Command: Running Jobs in Background is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-fg-cmd": {
    "id": "linux-fg-cmd",
    "badge": "Module 8 • Linux & Shell",
    "readingTime": "10 min read",
    "level": "Advanced",
    "title": "fg Command: Bringing Jobs to Foreground",
    "subtitle": "Complete Linux guide to fg Command: Bringing Jobs to Foreground — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The `fg` command in Linux is used to bring a background job to the foreground. It allows you to interact with the process directly through the terminal.\n\n- Resumes a background or stopped job in the foreground.\n- Useful for switching back to a process that was sent to the background with bg or &.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for fg Command: Bringing Jobs to Foreground."
        }
      },
      {
        "title": "2. Example:",
        "content": "**Command:**\n\n**Output:**\n\nOutput\n- **sleep 60 &:** starts the process in the background with job ID [3]\n- **fg %3:** brings job 3 to the foreground and continues its execution",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example:",
          "snippet": "sleep 60 &fg %3"
        }
      },
      {
        "title": "3. Syntax",
        "content": "The job_spec is a way to refer to the background jobs that are currently running or suspended.\n\n- **%n:** Refers to job number n.\n- **%str:** Refers to a job that was started by a command beginning with str.\n- **%?str:** Refers to a job that was started by a command containing str.\n- **%% or %+: **Refers to the current job (this is the default job operated on by fg if no job_spec is provided).\n- **%-: **Refers to the previous job.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "fg [job_spec]"
        }
      },
      {
        "title": "1. fg [JOB_SPEC]:",
        "content": "This is the primary use of the fg command, bringing a specified job running in the background back to the foreground. For example, if you create a dummy job using sleep 500, you can bring it back to the foreground by referencing its job number:\n\n**Command:**\n\n**Output:**\n\n\"sleep 500\" is a command which is used to create a dummy job which runs for 500 seconds.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. fg [JOB_SPEC]:",
          "snippet": "jobssleep 500# Press: Ctrl + Zjobsbg %1jobsfg %1"
        }
      },
      {
        "title": "2. fg --help:",
        "content": "This option displays help information for the fg command, explaining usage and available options.\n\n**Command:**\n\n**Output:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. fg --help:",
          "snippet": "fg --help"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: fg Command: Bringing Jobs to Foreground",
      "initialCode": "sleep 60 &fg %3",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: fg Command: Bringing Jobs to Foreground",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of fg Command: Bringing Jobs to Foreground?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to fg Command: Bringing Jobs to Foreground",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "fg Command: Bringing Jobs to Foreground is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-du-cmd": {
    "id": "linux-du-cmd",
    "badge": "Module 8 • Linux & Shell",
    "readingTime": "20 min read",
    "level": "Advanced",
    "title": "du Command: Monitoring Directory Disk Usage",
    "subtitle": "Complete Linux guide to du Command: Monitoring Directory Disk Usage — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The du (Disk Usage) command in Linux is used to estimate and display file and directory space usage. It helps users identify which files or directories consume the most disk space. This command is essential for system monitoring and storage management. By default, it shows usage recursively for directories.\n\n- Displays disk usage of files and directories\n- Helps identify large files or space-heavy directories\n- Supports human-readable output formats\n- Allows limiting output depth for better readability\n- Useful for disk cleanup and system maintenance",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for du Command: Monitoring Directory Disk Usage."
        }
      },
      {
        "title": "2. Example: Display Disk Usage of a Directory",
        "content": "Command examples and usage details for **Example: Display Disk Usage of a Directory**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Display Disk Usage of a Directory",
          "snippet": "du /home/gfg0913/Downloads"
        }
      },
      {
        "title": "3. Syntax",
        "content": "- **[options]:** Optional flags that modify command behavior\n- **[FILE/DIRECTORY]:** The target file or directory path to analyze, if no file or directory is specified, du uses the current directory (.)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "du [OPTIONS] [FILE/DIRECTORY]"
        }
      },
      {
        "title": "4. Options available in du command in Linux",
        "content": "The du command provides several options to customize output and control how disk usage is calculated and displayed.\n\n- **-a, --all:** Display disk usage for all files and directories, including hidden ones.\n- **-s, --summarize:** Provide only a summary of the specified directory or file, without listing subdirectory details.\n- **-d, –-max-depth=N:** Print usage totals only for directories that are N or fewer levels below the specified directory.\n- **-S, –separate-dirs:** For directories, do not include the size of subdirectories in the total.\n- **-h, –-human-readable:** Show sizes in a human-readable format (KB, MB, GB).\n- **-B, –-block-size=SIZE:** Scale sizes to the specified SIZE before printing (e.g., KB, MB).\n- **–-apparent-size:** Show the apparent size of files rather than the actual disk space they occupy.\n- **-0, –-null:** End each output line with a NULL character instead of a newline.\n- **-c, –-total:** Display a grand total of disk usage in addition to individual files and directories.\n- **–-exclude:** Exclude files that match a specific pattern from the output.\n- **–-time:** Show the time of the last modification of files or directories."
      },
      {
        "title": "1. -h (Human Readable)",
        "content": "Displays file and directory sizes in human-readable format (KB, MB, GB). This is useful when default block-size output is hard to interpret.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -h (Human Readable)",
          "snippet": "du -h Downloads"
        }
      },
      {
        "title": "2. -a (All Files)",
        "content": "Shows disk usage for all files along with directories. Use this when you need detailed file-level disk usage instead of only directory summaries.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -a (All Files)",
          "snippet": "du -a -h Downloads"
        }
      },
      {
        "title": "3. -c (Total)",
        "content": "Displays a grand total of disk usage along with individual entries. This is useful when you want an overall usage summary in the same output.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -c (Total)",
          "snippet": "du -c -h /home/gfg0913/Pictures/"
        }
      },
      {
        "title": "4. -d (Max Depth)",
        "content": "Shows disk usage only up to a specific directory level. This prevents too much detailed output from deeply nested folders.\n\n**Command:**\n\n**Output:**\n\n- Now try with level 2, you will get some extra directories**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -d (Max Depth)",
          "snippet": "du -h -d 1 Pictures/"
        }
      },
      {
        "title": "5. -s (Summary)",
        "content": "Displays only the total disk usage of the specified directory without showing subdirectory details. Useful for quick checks.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. -s (Summary)",
          "snippet": "du -s /home/gfg0913/Downloads"
        }
      },
      {
        "title": "6. --time (Last Modified Time)",
        "content": "Shows the last modification time of files and directories along with their disk usage. Useful for identifying recently changed data.\n\n**Command:**\n\n**Output:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. --time (Last Modified Time)",
          "snippet": "du --time -h /home/gfg0913/Downloads"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: du Command: Monitoring Directory Disk Usage",
      "initialCode": "du /home/gfg0913/Downloads",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: du Command: Monitoring Directory Disk Usage",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of du Command: Monitoring Directory Disk Usage?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to du Command: Monitoring Directory Disk Usage",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "du Command: Monitoring Directory Disk Usage is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-systemd-intro": {
    "id": "linux-systemd-intro",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "10 min read",
    "level": "Advanced",
    "title": "systemd Architecture and Components",
    "subtitle": "Complete Linux guide to systemd Architecture and Components — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Systemd is a system and service manager for modern Linux operating systems. It initializes the system, manages services, and controls system resources during startup and runtime. Systemd replaces the traditional SysV init system and runs as the first process with Process ID (PID) 1.\n\n- Initialize the system during boot\n- Manage and control system services\n- Replace the traditional SysV init system\n- Improve boot speed and performance\n- Provide centralized system management tools",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for systemd Architecture and Components."
        }
      },
      {
        "title": "2. Managing Services with systemd",
        "content": "Systemd provides a unified framework to manage services, system resources, and configurations efficiently. Services are organized into units, and systemctl is the main utility to control them."
      },
      {
        "title": "3. Primary Utilities:",
        "content": "- **systemctl:** Controls services and units (start, stop, enable, disable, status). Central for service management.\n- **journalctl:** Accesses system logs maintained by systemd. Supports filtering by service, time, or priority.\n- **hostnamectl:** Configures system hostname dynamically.\n- **localectl:** Sets system locale and keyboard layout.\n- **timedatectl:** Manages system time, date, and timezone settings.\n- **systemd-cgls:** Displays the hierarchy of cgroups for running processes.\n- **systemadm:** Provides a graphical or simplified interface to manage services using systemctl commands."
      },
      {
        "title": "4. Service Management Commands:",
        "content": "**1. List all services (active and inactive):**\n\nDisplays all services, including their current state, description, and whether they are loaded.\n\n**Command:**\n\n**2. Start a service:**\n\nLaunches the service immediately but does not enable it on boot.\n\n**Command:**\n\n**3. Stop a service:**\n\nStops the service immediately.\n\n**Command:**\n\n**4. Restart a service:**\n\nStops and starts the service in one step. Useful after configuration changes.\n\n**Command:**\n\n- **Service status codes:** 0 indicates running, 1 indicates inactive.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Service Management Commands:",
          "snippet": "systemctl list-units --type service --all"
        }
      },
      {
        "title": "5. System Power Management Commands:",
        "content": "systemd also provides commands for managing system power operations.\n\n**Halt the system:**\n\n**Power off the system:**\n\n**Reboot the system:**\n\n**Note:**\n\n- Combining systemctl with journalctl -u [service-name] allows troubleshooting without leaving the terminal.\n- systemd-cgls is useful for monitoring resources used by services and processes.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. System Power Management Commands:",
          "snippet": "systemctl halt"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: systemd Architecture and Components",
      "initialCode": "systemctl list-units --type service --all",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: systemd Architecture and Components",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of systemd Architecture and Components?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to systemd Architecture and Components",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "systemd Architecture and Components is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-boot-process": {
    "id": "linux-boot-process",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "24 min read",
    "level": "Advanced",
    "title": "Linux Boot Process with systemd (BIOS/UEFI to Target)",
    "subtitle": "Complete Linux guide to Linux Boot Process with systemd (BIOS/UEFI to Target) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Systemd is the first user-space process started by the Linux kernel and runs with PID 1. It handles system initialization, service management, and controls the entire boot process in modern Linux systems.\n\n- Starts after the kernel and becomes the parent of all user-space processes\n- Manages system services using parallel startup and dependency resolution\n- Replaces traditional SysVinit-based boot mechanisms\n- Uses targets instead of runlevels to define system states",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Linux Boot Process with systemd (BIOS/UEFI to Target)."
        }
      },
      {
        "title": "2. Linux Boot Process",
        "content": "The Linux boot process is a sequence of stages that prepare the system from power-on to a usable state. Each stage performs a specific task, and control is gradually handed over from firmware to the operating system and finally to systemd."
      },
      {
        "title": "3. Boot Process Stages",
        "content": "- **BIOS/UEFI:** Performs Power-On Self Test (POST) and initializes hardware components\n- **Boot Loader:** Loads the Linux kernel and allows OS or kernel selection\n- **Kernel:** Initializes hardware, mounts the root filesystem, and starts the first user-space process\n- **systemd:** Started by the kernel as PID 1; initializes services and reaches the target system state"
      },
      {
        "title": "4. Role of systemd in the Boot Process",
        "content": "After the kernel finishes hardware and memory initialization, systemd is launched as the first user-space process with PID 1. It takes full control of system management , orchestrating the initialization of all services, devices, and resources to bring the system into a usable state efficiently."
      },
      {
        "title": "5. systemd Responsibilities During Boot",
        "content": "- Reads unit files that define services, mounts, sockets, timers, and device configurations\n- Resolves dependencies between units to ensure correct startup order and avoid conflicts\n- Starts independent services in parallel, minimizing overall boot time\n- Activates services on demand, conserving CPU and memory resources\n- Transitions the system to the configured target, such as multi-user, graphical, or rescue mode\n- Monitors service status and can automatically restart failed units to maintain system stability"
      },
      {
        "title": "6. systemd Targets",
        "content": "Systemd uses targets to define system states, replacing traditional runlevels. Targets group services, sockets, and other units required to reach a specific operating mode."
      },
      {
        "title": "7. Common systemd Targets",
        "content": "- **multi-user.target:** Non-graphical system with networking and standard services\n- **graphical.target:** Full graphical environment with display manager\n- **rescue.target:** Single-user mode for system recovery or maintenance\n- **emergency.target:** Minimal environment for critical fixes, with only essential services"
      },
      {
        "title": "8. Boot Performance Analysis with systemd-analyze",
        "content": "systemd-analyze measures and examines system boot performance, helping identify services or processes that delay startup. It provides detailed insights into the time taken by the kernel, user-space, and individual units, allowing optimization of boot speed.\n\n- Identifies slow-starting services or units\n- Measures total boot time for comparison and monitoring\n- Helps optimize system startup for performance and efficiency\n- Supports troubleshooting of boot delays and dependency issues"
      },
      {
        "title": "9. Example 1: Check Total Boot Time",
        "content": "Determining total boot time helps monitor system performance and identify unusually slow startups.\n\n**Command:**\n\n- Measures the time spent in firmware, bootloader, kernel, and user-space\n- Useful for detecting delays in overall system initialization**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Example 1: Check Total Boot Time",
          "snippet": "systemd-analyze time"
        }
      },
      {
        "title": "10. Example 2: View Service Dependency Chain",
        "content": "Analyzing the service dependency chain shows the order in which critical services start and how they depend on each other.\n\n**Command:**\n\n- Displays the boot sequence timeline with service dependencies\n- The value after @ indicates when a service is activated (time since boot began)\n- The value after + shows how long the service took to start\n- Helps pinpoint services that delay reaching the target system state**Output:**\n\nprocesses chain summary**Note:** This output visualizes which services are critical in the boot process and highlights any potential bottlenecks.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Example 2: View Service Dependency Chain",
          "snippet": "systemd-analyze critical-chain"
        }
      },
      {
        "title": "11. Example 3: Identify Slow Services",
        "content": "Listing slow-starting services helps pinpoint units that delay the boot process, allowing administrators to optimize or disable them.\n\n**Command:**\n\n- Lists all system services in descending order of startup time\n- Shows the duration each service took to start, making it easy to identify performance bottlenecks\n- Useful for optimizing boot by targeting unnecessary or slow services**Output:**\n\nlist of services**Note:** The output highlights which services consumed the most time during startup, providing actionable insights for system optimization.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Example 3: Identify Slow Services",
          "snippet": "systemd-analyze blame"
        }
      },
      {
        "title": "12. Example 4: Generate a Graphical Boot Chart",
        "content": "A graphical boot chart provides a visual timeline of the boot process, showing how long each service or device took to start.\n\n**Command:**\n\n- Creates a graphical representation of the boot sequence in an SVG file\n- Each horizontal bar represents a service, mount, or device unit\n- Longer bars indicate units that delayed the boot process\n- Helps quickly identify performance bottlenecks and resource-intensive services**Output:**\n\nplot > boot.svg\n- A file named boot.svg is created in the current working directory where the command is run\n- Visualization shows startup duration of services like systemd-journald.service and disk devicesboot.svg image, plotted with time vs process**Note:** Open boot.svg in a browser or image viewer to see the graphical boot timeline.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Example 4: Generate a Graphical Boot Chart",
          "snippet": "systemd-analyze plot > boot.svg"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Linux Boot Process with systemd (BIOS/UEFI to Target)",
      "initialCode": "systemd-analyze time",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Linux Boot Process with systemd (BIOS/UEFI to Target)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Linux Boot Process with systemd (BIOS/UEFI to Target)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Linux Boot Process with systemd (BIOS/UEFI to Target)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Linux Boot Process with systemd (BIOS/UEFI to Target) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-systemd-remote": {
    "id": "linux-systemd-remote",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "16 min read",
    "level": "Advanced",
    "title": "Controlling systemd Services on Remote Servers",
    "subtitle": "Complete Linux guide to Controlling systemd Services on Remote Servers — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- systemd is a modern system and service manager for Linux that handles service startup, process tracking, and resource management. It replaces traditional SysVinit scripts with a unified, dependency-based approach to controlling system services and resources.\n\n- Provides parallelized system startup for faster boot times.\n- Supports on-demand activation of daemons and background services.\n- Tracks and manages processes using Linux control groups (cgroups).\n- Maintains mount and automount points.\n- Uses unit files to define and control services, sockets, mounts, and other system resources.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Controlling systemd Services on Remote Servers."
        }
      },
      {
        "title": "2. Controlling systemd Services on a Remote Linux Server",
        "content": "systemd allows administrators to manage services on a remote Linux server using SSH-based connections. Follow the steps below to configure and control systemd services remotely."
      },
      {
        "title": "3. Step 1: Create a dedicated systemd management user on the remote server",
        "content": "Log in to the remote server and create a user that will be used to manage systemd services:\n\n**Command:**\n\n- (Optional but recommended) Set a password or configure SSH key-based authentication for this user.Output",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Step 1: Create a dedicated systemd management user on the remote server",
          "snippet": "sudo useradd --create-home systemd-manager"
        }
      },
      {
        "title": "4. Step 2: Prepare SSH key-based authentication",
        "content": "Create the .ssh directory for the new user and set proper permissions:\n\n**Copy your public SSH key into the following file on the remote server:**\n\n**Set correct permissions:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step 2: Prepare SSH key-based authentication",
          "snippet": "sudo mkdir /home/systemd-manager/.sshsudo chmod 700 /home/systemd-manager/.sshsudo chown systemd-manager:systemd-manager /home/systemd-manager/.ssh"
        }
      },
      {
        "title": "5. Step 3: Configure authorization using PolicyKit (polkit)",
        "content": "systemd relies on PolicyKit (polkit) to authorize privileged operations. Ensure polkit is installed on the remote server:\n\n**Command:**\n\n- To allow the systemd-manager user to manage systemd services, appropriate polkit rules must be configured. This step is required for starting, stopping, or reloading services remotely.Output",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Step 3: Configure authorization using PolicyKit (polkit)",
          "snippet": "sudo apt install policykit-1"
        }
      },
      {
        "title": "6. Step 4: Remotely manage systemd services",
        "content": "Once SSH access and authorization are configured, use the systemctl command with the --host (or -H) option to manage services on the remote server.\n\n**For example, to check the status of the nginx service:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Step 4: Remotely manage systemd services",
          "snippet": "systemctl --host systemd-manager@server.example.org status nginx"
        }
      },
      {
        "title": "7. Step 5: Perform additional systemd operations",
        "content": "You can perform other systemd actions remotely in the same way. For example, to reload systemd configuration files on the remote host:\n\n**Command:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Step 5: Perform additional systemd operations",
          "snippet": "systemctl --host systemd-manager@server.example.org daemon-reload"
        }
      },
      {
        "title": "8. Step 6: End the Remote Session",
        "content": "Each systemctl --host command uses a separate SSH connection. Once your commands are complete, simply exit the terminal or press Ctrl+C if a command is running interactively.\n\n**For more information, consult the manual page:**\n\nOutputComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Step 6: End the Remote Session",
          "snippet": "man systemctl"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Controlling systemd Services on Remote Servers",
      "initialCode": "sudo useradd --create-home systemd-manager",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Controlling systemd Services on Remote Servers",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Controlling systemd Services on Remote Servers?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Controlling systemd Services on Remote Servers",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Controlling systemd Services on Remote Servers is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-systemctl": {
    "id": "linux-systemctl",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "systemctl Command: Managing Daemons & Units",
    "subtitle": "Complete Linux guide to systemctl Command: Managing Daemons & Units — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Systemd is a modern system and service manager for Linux that serves as the core initialization process (PID 1). It controls system startup, manages background services, and ensures efficient system operation.\n\n- Starts automatically as the first process when the Linux kernel boots.\n- Manages all other processes during system runtime.\n- Uses parallelization to launch multiple services simultaneously, speeding up boot time.\n- Organizes system components into “units” such as services, sockets, devices, mounts, and timers.\n- Controlled via the systemctl command-line tool (start, stop, enable, disable, and check services).",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for systemctl Command: Managing Daemons & Units."
        }
      },
      {
        "title": "2. Example: Starting and Stopping a System Service in Linux:",
        "content": "**Syntax:**\n\n**Example with Apache Web Server**\n\n**Commands:**\n\n**Output:**\n\nOutput\n- The command systemctl start apache2 starts the Apache web server service.\n- The command systemctl status apache2 displays the current status of the Apache service.**Command:**\n\n**Output:**\n\n- The command systemctl stop apache2 is used to stop the Apache web server.\n- The command systemctl status apache2 then checks whether the service is still running or stopped.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Starting and Stopping a System Service in Linux:",
          "snippet": "systemctl start [service_name]systemctl stop [service_name]systemctl status [service_name]"
        }
      },
      {
        "title": "3. Syntax of `systemctl` command in Unix",
        "content": "- **[command] **= The action we want to perform (start, stop, enable, disable, etc.)\n- **[service]** = The name of the service we want to perform the action on.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax of `systemctl` command in Unix",
          "snippet": "systemctl [command] [service]"
        }
      },
      {
        "title": "4. Options available in `systemctl` command in Unix",
        "content": "OptionDescriptionExample--typeFilter output by unit type (service, socket, timer)systemctl --type=service--allLists all units including inactive onessystemctl --all--failedLists all units that have failedsystemctl --failed--stateFilter output by unit state (active, inactive, failed)systemctl list-units --state=failed--userManage user services instead of system servicessystemctl --user-q, --quietSuppress output messagessystemctl daemon-reload --quiet"
      },
      {
        "title": "1. Enabling and Disabling Services",
        "content": "Enabling a Service\n\n- Enables the Apache web server to start automatically at system boot.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput**Disabling a Service**\n\n- Disables the Apache web server, preventing it from starting automatically at boot.**Syntax:**\n\n**Example:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Enabling and Disabling Services",
          "snippet": "systemctl enable [service]"
        }
      },
      {
        "title": "2. Viewing the Status of a Service",
        "content": "- Displays the \"current status\" of Apache (whether it’s _active_, _inactive_, _running_, or _failed_).**Syntax:**\n\n**Example:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Viewing the Status of a Service",
          "snippet": "systemctl status [service]"
        }
      },
      {
        "title": "3. Restarting and Reloading Services",
        "content": "Restarting a Service\n\n- Restarts the Apache web server, applying any configuration or update changes.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutputReloading a Service\n\n- Reloads Apache configuration without completely stopping the service, useful after minor config edits.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Restarting and Reloading Services",
          "snippet": "systemctl restart [service]"
        }
      },
      {
        "title": "4. Masking and Unmasking Services",
        "content": "Masking a Service\n\n- Prevents the Apache service from being started manually or automatically, even if required by other services.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nUnmasking a Service\n\n- Allows the Apache service to be started or enabled again.**Syntax:**\n\n**Example:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Masking and Unmasking Services",
          "snippet": "systemctl mask [service]"
        }
      },
      {
        "title": "5. Changing the Default Target",
        "content": "- Sets the system to boot into the graphical (GUI) mode by default instead of command-line mode.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Changing the Default Target",
          "snippet": "systemctl set-default [target]"
        }
      },
      {
        "title": "6. Listing Unit Files",
        "content": "- Lists all available unit files on the system, showing which are enabled, disabled, or static.**Syntax:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Listing Unit Files",
          "snippet": "systemctl list-unit-files"
        }
      },
      {
        "title": "11. Also Check:",
        "content": "- How to Start, Stop and Restart Services in Linux Using systemctl Command\n- How to mask a systemd unit in Linux?Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: systemctl Command: Managing Daemons & Units",
      "initialCode": "systemctl start [service_name]systemctl stop [service_name]systemctl status [service_name]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: systemctl Command: Managing Daemons & Units",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of systemctl Command: Managing Daemons & Units?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to systemctl Command: Managing Daemons & Units",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "systemctl Command: Managing Daemons & Units is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-journalctl": {
    "id": "linux-journalctl",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "30 min read",
    "level": "Advanced",
    "title": "journalctl Command: Querying systemd Logs",
    "subtitle": "Complete Linux guide to journalctl Command: Querying systemd Logs — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- journalctl is a Linux command used to view and manage system logs maintained by the systemd-journald service. It provides a centralized and efficient way to access and analyze log data.\n\n- Displays system, service, and kernel logs in a structured format.\n- Helps in monitoring and troubleshooting system issues.\n- Stores logs in a binary format for better performance and querying.\n- Commonly used in systemd-based distributions like Ubuntu, Debian, and Kali Linux.Let us consider an example to display all logs by journalctl command:\n\n**Command: **\n\n**Output:**\n\nDisplay all Logs\n- This command will display the recent log messages from all units in reverse chronological order, starting from the most recent entries.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Overview & Syntax",
          "snippet": "journalctl"
        },
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for journalctl Command: Querying systemd Logs."
        }
      },
      {
        "title": "2. Syntax:",
        "content": "- **[options] **= The various command-line options available to customize the output.\n- **[unit] **= The specific system unit or log source to query. If no unit is specified, `journalctl` will display the message from all available units.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax:",
          "snippet": "journalctl [options] [unit]"
        }
      },
      {
        "title": "1. Reversing the log order",
        "content": "- To reverse the order or to display the new entries first. **Command:**\n\n**Output:**\n\nReversing Logs",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Reversing the log order",
          "snippet": "journalctl -r"
        }
      },
      {
        "title": "2. Limiting the number of log entries",
        "content": "If you only want to display a specific number of log entries, you can use the -n option followed by the desired number\n\nLimiting the number This will display just 2 log entries.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Limiting the number of log entries",
          "snippet": "journalctl -n 2"
        }
      },
      {
        "title": "3. Filtering logs by keyword",
        "content": "To retrieve log entries containing a specific keyword or phrase, you can use the grep command in combination with journalctl.\n\nFiltering Logs by keyword This will display all the entries containing the word Centaur in them.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Filtering logs by keyword",
          "snippet": "journalctl | grep Centaur"
        }
      },
      {
        "title": "4. View Logs for a Specific Service",
        "content": "- To display logs for a specific systemd unit or service:**Command:**\n\n**Output:**\n\nView Logs\n- Shows complete log history for apache2 service from all boot sessions\n- Displays timestamps, process IDs, and detailed messages about service starts, stops, and errors\n- Useful for tracking service behavior over time and diagnosing recurring issuesYou can also check recent logs only:\n\n**Command:**\n\n**Output:**\n\nView Logs\n- Displays only the last 20 log entries for apache2 service\n- Limits output to most recent events, making it easier to check latest activity\n- Combines service filtering with line limit for quick troubleshooting",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. View Logs for a Specific Service",
          "snippet": "sudo journalctl -u apache2"
        }
      },
      {
        "title": "7. Options of journalctl Command in Linux",
        "content": "The journalctl command provides several useful options to refine log queries and retrieve specific information. Below are some commonly used options with examples and sample outputs"
      },
      {
        "title": "1. Filtering logs by priority level",
        "content": "- To display log entries based on their priority level, you can use the -p option followed by the desired level (e.g., emerg, alert, crit, err, warning, notice, info, or debug). For instance**Command:**\n\n**Output:**\n\nFiltering logs by priorty\n- It displays all log entries with priority as a warning.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Filtering logs by priority level",
          "snippet": "journalctl -p warning"
        }
      },
      {
        "title": "2. Customizing output format",
        "content": "- You can change how logs are displayed using the -o option. For example, use the verbose mode to show detailed log information.\ncustomizing output\n- Displays log entries with maximum detail, showing all fields and metadata for each record\n- Includes detailed information like timestamps, PIDs, hostnames, and internal journal fields\n- Helpful when deep analysis is needed to understand complete log context",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Customizing output format",
          "snippet": "journalctl -o verbose"
        }
      },
      {
        "title": "3. Listing system boots",
        "content": "- To view information about previous system boots, you can use the --list-boots option.\nlistning system boots\n- Lists all system boot sessions with boot IDs, dates, and times\n- Shows boot reference numbers (0 for current boot, negative numbers for previous boots)\n- Enables viewing logs from specific past boots using their boot ID",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Listing system boots",
          "snippet": "journalctl --list-boots"
        }
      },
      {
        "title": "4. Accessing help documentation",
        "content": "- To access the journalctl command's help section, you can use the --help option.\nAccessing Help\n- This command displays detailed information about the command's usage, options, and functionalities.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Accessing help documentation",
          "snippet": "journalctl --help"
        }
      },
      {
        "title": "12. Setting the System Time",
        "content": "To set the system time using timedatectl and view the changes with journalctl, follow these steps:\n\n- **Set the System Time**:\n\n- **Verify the System Time**:\n\n- **View Journal Logs**: Use journalctl to see logs, including those around the time change.\nReplace YYYY-MM-DD HH:MM:SS with the appropriate time range.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Setting the System Time",
          "snippet": "sudo timedatectl set-time 'YYYY-MM-DD HH:MM:SS'"
        }
      },
      {
        "title": "13. Example:",
        "content": "Here is an example to set the time step by step in Linux"
      },
      {
        "title": "14. Step 1: Set the System Time",
        "content": "**Command:**\n\n**Output:**\n\n- Your system clock is now manually updated.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Step 1: Set the System Time",
          "snippet": "sudo timedatectl set-time '2025-11-11 10:45:00'"
        }
      },
      {
        "title": "15. Step 2: Verify the Change",
        "content": "Check the current system time:\n\n**Output:**\n\nVerify the Change\n- The line “NTP service: inactive” confirms that automatic time sync is disabled and your manual time is applied.Comment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 15. Step 2: Verify the Change",
          "snippet": "timedatectl status"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: journalctl Command: Querying systemd Logs",
      "initialCode": "journalctl [options] [unit]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: journalctl Command: Querying systemd Logs",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of journalctl Command: Querying systemd Logs?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to journalctl Command: Querying systemd Logs",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "journalctl Command: Querying systemd Logs is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-df-cmd": {
    "id": "linux-df-cmd",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "28 min read",
    "level": "Advanced",
    "title": "df Command: Checking Filesystem Disk Space",
    "subtitle": "Complete Linux guide to df Command: Checking Filesystem Disk Space — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The df command in Linux is used to display disk space usage of mounted file systems. It provides information about total space, used space, available space, and the percentage of usage for each file system.\n\n- Can display output in human-readable format.\n- Useful for system monitoring and storage management.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for df Command: Checking Filesystem Disk Space."
        }
      },
      {
        "title": "2. Example 1: Display Disk Usage of All Mounted File Systems",
        "content": "**Command:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "3. Example 2: Check Disk Usage of a Specific Directory",
        "content": "**Command:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "4. Syntax:",
        "content": "- **OPTION:** mandatory arguments compatible with df command.\n- **FILE:** specific filename in case you want to know the disk space usage of a particular file system only.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Syntax:",
          "snippet": "df [OPTION]...[FILE]..."
        }
      },
      {
        "title": "5. Using df for a Specific File",
        "content": "Suppose we have a file named sample.txt and want to check its file system usage:\n\n**Command:**\n\n**Output:**\n\nOutput\n- Displays only the file system containing the file.\n- Without specifying a file, df displays all mounted file systems.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Using df for a Specific File",
          "snippet": "df sample.txt"
        }
      },
      {
        "title": "1. -a, --all",
        "content": "Displays all file systems, including special or dummy file systems that have zero block sizes (e.g., proc, sysfs).\n\n- used to see everything, including virtual or hidden file systems.\n- Normally, these zero-size file systems are not shown in the default df output.**Syntax:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "2. -h, --human-readable",
        "content": "Displays disk usage in human-readable format (KB, MB, GB) instead of default 1K blocks, making it easier to understand.\n\n- Converts large numbers into friendly units like MB or GB.\n- Useful for quickly checking disk usage without calculating large numbers manually.**Syntax:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "3. -i, --inodes",
        "content": "Displays inode usage instead of disk space. Inodes are data structures that store information about files (like metadata).\n\n- used when a file system runs out of inodes, even if there is free disk space.**Syntax:**\n\n**Output:**\n\nOutput\n- **Inodes:** Total inodes on the file system\n- **IUsed:** Inodes currently in use\n- **IFree:** Inodes still available\n- **IUse%:** Percentage of used inodes"
      },
      {
        "title": "4. --total",
        "content": "Displays a grand total of disk space for all listed file systems. Adds an extra row at the bottom summarizing total size, used space, and available space.\n\n- Useful for getting an overall view of disk usage across multiple file systems.**Syntax:**\n\n**Output:**\n\nOutput\n- Can be combined with other options like -h for human-readable totals.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. --total",
          "snippet": "df --total"
        }
      },
      {
        "title": "5. -t TYPE",
        "content": "Displays disk usage only for file systems of a specific type. Filters output by file system type, such as ext4, xfs, tmpfs, or squashfs.\n\n- used to focus on a particular type of storage.**Syntax:**\n\n**Example:**\n\nDisplay Only tmpfs File Systems\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. -t TYPE",
          "snippet": "df -t TYPE"
        }
      },
      {
        "title": "6. -x TYPE",
        "content": "Excludes file systems of a specific type from the output. Opposite of -t.\n\n- used to ignore certain file systems like virtual or temporary ones (tmpfs, squashfs) in the listing.**Syntax:**\n\n**Example:**\n\nExclude tmpfs File Systems\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. -x TYPE",
          "snippet": "df -x TYPE"
        }
      },
      {
        "title": "7. --sync",
        "content": "Ensures that df reports up-to-date disk usage by running the sync system call before gathering information.\n\n- By default, df uses --no-sync, which may not reflect recent changes immediately.\n- used when files were recently added, deleted, or modified and you need accurate disk usage.**Syntax:**\n\n**Example:**\n\nDisplay Disk Usage with Sync\n\n**Command:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. --sync",
          "snippet": "df --sync"
        }
      },
      {
        "title": "8. -l, --local",
        "content": "Displays only local file systems, excluding network-mounted file systems like NFS or Samba. Used to focus on disks physically attached to the system.\n\n- Helps avoid clutter from temporary or remote mounts.**Syntax:**\n\n**Example:**\n\nDisplay Only Local File Systems\n\n**Command:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "9. -T, --print-type",
        "content": "Displays the type of each file system along with disk usage. Shows whether a file system is ext4, xfs, tmpfs, squashfs, etc.\n\n- Useful for identifying file system types on different disks or partitions.**Syntax:**\n\n**Output:**\n\nOutputComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: df Command: Checking Filesystem Disk Space",
      "initialCode": "df [OPTION]...[FILE]...",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: df Command: Checking Filesystem Disk Space",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of df Command: Checking Filesystem Disk Space?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to df Command: Checking Filesystem Disk Space",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "df Command: Checking Filesystem Disk Space is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-free-cmd": {
    "id": "linux-free-cmd",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "free Command: Monitoring RAM & Swap Memory",
    "subtitle": "Complete Linux guide to free Command: Monitoring RAM & Swap Memory — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The free command in Linux is used to display information about system memory usage. It reports the total amount of physical RAM and swap memory, along with how much is used, free, shared, buffered, and cached. This command is commonly used for system monitoring, performance troubleshooting, and resource planning.\n\n- Displays total, used, and free memory\n- Shows RAM and swap memory statistics\n- Includes buffer and cache memory usage\n- Lightweight and safe monitoring utility",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for free Command: Monitoring RAM & Swap Memory."
        }
      },
      {
        "title": "2. Example 1: Display Memory Usage (Default)",
        "content": "**Syntax:**\n\n**Command:**\n\n**Output:**\n\n- **total:** Total installed memory\n- **used:** Memory in use, excluding buffers and cache in some explanations; in practice, free output should be read together with buff/cache because Linux can reclaim cache anytime\n- **free:** Completely unallocated memory\n- **shared:** Memory used by tmpfs\n- **buffers:** Memory used by kernel buffers\n- **cached:** Memory used for file caching (reclaimable)\n- **available:** Estimated memory available for new applications**Notes:** Default unit is KiB (1024 bytes)"
      },
      {
        "title": "3. Syntax",
        "content": "Command examples and usage details for **Syntax**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "free [OPTION]"
        }
      },
      {
        "title": "1. -h, --human",
        "content": "Displays memory in a human-readable format.\n\n**Command:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "2. -b (Displaying Output in Bytes)",
        "content": "It just displays the output in unit bytes.\n\n**Command:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "3. -k (Displaying Output in Kilobytes)",
        "content": "This option displays the result in kilobytes.\n\n**Command:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "4. -m (Displaying Output in Megabytes)",
        "content": "This option displays the result in megabytes.\n\n**Command:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "5. -g (Displaying Output in Gigabytes)",
        "content": "This option displays the result in gigabytes.\n\n**Command:**\n\n**Output:**"
      },
      {
        "title": "6. -t (Displaying Totals)",
        "content": "This option displays an additional line containing the sum of the total, used and free columns.\n\n**Command:**\n\n**Output:**\n\nOutput"
      },
      {
        "title": "7. -s and -c (Continuously Monitoring Memory Usage)",
        "content": "The -s option allows the free command to display memory usage repeatedly at a specified time interval. You must provide a numeric value representing the delay (in seconds) between each update. The -c option is used together with -s to specify how many times the output should be displayed.\n\n**Command:**\n\n- **-s 3:** Refresh the output every 3 seconds\n- **-c 3:** Display the output 3 times**Output:**\n\n- This command will show memory usage every 3 seconds and stop automatically after 3 updates.**Note:** If you use -s without -c, the output will continue refreshing indefinitely until you manually stop it (for example, by pressing Ctrl + C).",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. -s and -c (Continuously Monitoring Memory Usage)",
          "snippet": "free -s 3 -c 3"
        }
      },
      {
        "title": "11. Importance of Linux free Command",
        "content": "- **Real-time Memory Monitoring:** Provides the immediate insight regarding the system memory usage. It helps the administrators and users in monitoring the resource allocation.\n- **Performance Optimization:** Allows the users for proactive management by identifying memory-intensive processes or applications, enabling timely adjustments to improve overall system performance.\n- **Resource Planning:** Efficient resource planning and allocation decisions based on accurate data about available, used, and cached memory, ensuring optimal utilization of system resources.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: free Command: Monitoring RAM & Swap Memory",
      "initialCode": "free [OPTION]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: free Command: Monitoring RAM & Swap Memory",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of free Command: Monitoring RAM & Swap Memory?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to free Command: Monitoring RAM & Swap Memory",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "free Command: Monitoring RAM & Swap Memory is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-lscpu": {
    "id": "linux-lscpu",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "lscpu Command: Viewing CPU Architecture & Cores",
    "subtitle": "Complete Linux guide to lscpu Command: Viewing CPU Architecture & Cores — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The `lscpu` command in Linux is used to display detailed information about the CPU (Central Processing Unit) architecture of the system. It provides an overview of processor configuration such as CPU family, model, cores, threads, cache sizes, architecture type and other hardware characteristics.\n\n- Displays CPU architecture information.\n- Shows number of cores, threads and sockets.\n- Provides cache and NUMA details.\n- Useful for hardware inspection and system analysis.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for lscpu Command: Viewing CPU Architecture & Cores."
        }
      },
      {
        "title": "2. Install the lscpu command",
        "content": "The lscpu command is part of the util-linux package and is usually pre-installed. If it is missing, install it using your distribution’s package manager."
      },
      {
        "title": "1. Debian/Ubuntu-based Systems",
        "content": "Use the following command to install the util-Linux package, which includes lscpu:\n\n**Command:**\n\n**Output:**\n\nInstallation on Debian based system",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Debian/Ubuntu-based Systems",
          "snippet": "sudo apt install util-linux"
        }
      },
      {
        "title": "2. Red Hat/CentOS-based systems (yum or dnf):",
        "content": "Use one of the following commands depending on your package manager:\n\n- For systems using yum:**Command:**\n\n- For systems using dnf:**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Red Hat/CentOS-based systems (yum or dnf):",
          "snippet": "sudo yum install util-linux"
        }
      },
      {
        "title": "3. openSUSE (zypper):",
        "content": "Command examples and usage details for **3. openSUSE (zypper):**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. openSUSE (zypper):",
          "snippet": "sudo zypper install util-linux"
        }
      },
      {
        "title": "6. Syntax",
        "content": "Command examples and usage details for **Syntax**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Syntax",
          "snippet": "lscpu [options]"
        }
      },
      {
        "title": "1. --bytes",
        "content": "Displays cache sizes and other size-related values in bytes instead of human-readable units like KB or MB.\n\n**Syntax:**\n\n**Example: Display sizes in bytes**\n\nThe command in Linux displays CPU information with sizes, such as cache sizes, represented in bytes instead of more human-readable units like kilobytes or megabytes. This option provides detailed and precise numerical values for CPU attributes.\n\n**Command:**\n\n**Output:**\n\nDisplay size in bytes",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. --bytes",
          "snippet": "lscpu --bytes"
        }
      },
      {
        "title": "2. -e, --extended",
        "content": "Displays CPU information in an extended table format, including details such as CPU ID, core, socket, node and online status.\n\n**Syntax:**\n\n**Example: Display Extended CPU Information**\n\nThis command displays CPU information in a human-readable table format, including details about the architecture, model name and various CPU features.\n\n**Command:**\n\n**Output:**\n\nDisplaying CPU information in human- readable format"
      },
      {
        "title": "3. -p, --parse",
        "content": "Displays output in a parsable (CSV-like) format suitable for scripting and automation.\n\n**Syntax:**\n\n**Example: Display CPU Information in Parsable Format**\n\nThis command extracts and displays the CPU topology from the lscpu output in a parsable format.\n\n**Command:**\n\n**Output:**\n\nDisplaying CPU information in parse format"
      },
      {
        "title": "4. -a, --all",
        "content": "Displays both online and offline CPUs. This option must be used with -e or -p.\n\n**Syntax:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -a, --all",
          "snippet": "lscpu -a -e"
        }
      },
      {
        "title": "11. Example: Display Both Online and Offline CPUs",
        "content": "-a or --all option is used to display both online and offline CPUs in the output. You can only use this option with -e or -p.\n\n**Command:**\n\n**Output:**\n\nDisplaying both online and offline CPUs",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Example: Display Both Online and Offline CPUs",
          "snippet": "lscpu --all -e"
        }
      },
      {
        "title": "5. -b, --online",
        "content": "Displays only online CPUs that are currently active.\n\n**Example: Display Only Online CPUs**\n\nUsing the --online option with lscpu displays information only about online CPUs, which are actively in use.\n\n**Command:**\n\n**Output:**\n\nDisplaying only online CPUs",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. -b, --online",
          "snippet": "lscpu --online -e"
        }
      },
      {
        "title": "6. -c, --offline",
        "content": "Displays only offline CPUs that are currently disabled.\n\n**Syntax:**\n\n**Example: Display Only Offline CPUs**\n\nThe --offline option allows you to view information about CPUs that are currently offline.\n\n**Command:**\n\n**Output:**\n\nDisplaying only offline CPUs",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. -c, --offline",
          "snippet": "lscpu -c -e"
        }
      },
      {
        "title": "7. --json",
        "content": "Displays CPU information in JSON format for programmatic access.\n\n**Syntax:**\n\n**Example: Display CPU Information in JSON Format**\n\nThis command presents CPU information in JSON format, making it easier for programmatic access or integration with other tools.\n\n**Command:**\n\n**Output:**\n\nDisplaying CPU information in JSON Format",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. --json",
          "snippet": "lscpu --json"
        }
      },
      {
        "title": "8. --caches",
        "content": "Displays detailed information about CPU caches including L1, L2 and L3 cache sizes.\n\n**Syntax:**\n\n**Example: Display Cache Information**\n\nThe --caches option in lscpu displays information about CPU caches, including data, instruction, unified caches, their sizes and more.\n\n**Command:**\n\n**Output:**\n\nDisplaying information about caches",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. --caches",
          "snippet": "lscpu --caches"
        }
      },
      {
        "title": "9. -x, --hex",
        "content": "Displays CPU masks in hexadecimal format.\n\n**Syntax:**\n\n**Example: Display Hexadecimal CPU Masks**\n\nThis command extracts the hexadecimal masks of the CPU's available resources, which can be useful for specific system configuration or analysis.\n\n**Command:**\n\nUse hexadecimal masks"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: lscpu Command: Viewing CPU Architecture & Cores",
      "initialCode": "sudo apt install util-linux",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: lscpu Command: Viewing CPU Architecture & Cores",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of lscpu Command: Viewing CPU Architecture & Cores?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to lscpu Command: Viewing CPU Architecture & Cores",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "lscpu Command: Viewing CPU Architecture & Cores is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-uptime": {
    "id": "linux-uptime",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "uptime Command: System Load Averages Explained",
    "subtitle": "Complete Linux guide to uptime Command: System Load Averages Explained — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The uptime command in Linux is used to display how long the system has been running. It also shows the current time, the number of users logged in, and the system load averages for the past 1, 5, and 15 minutes.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for uptime Command: System Load Averages Explained."
        }
      },
      {
        "title": "2. Example 1: Basic Usage",
        "content": "**Command:**\n\n**Output:**\n\nOutput\n- **Current time:** 15:02:08\n- **Uptime:** 20:47 (system has been running for 20 hours, 47 minutes)\n- **Number of users:** 1 user\n- **Load averages:** 0.22, 0.25, 0.27 (over the last 1, 5, and 15 minutes)"
      },
      {
        "title": "3. Example 2: Human-Readable Format",
        "content": "Just to make sure you get the uptime in human-readable format.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example 2: Human-Readable Format",
          "snippet": "uptime -p"
        }
      },
      {
        "title": "4. Example 3: Checking Load Averages Only",
        "content": "**Command:**\n\n**Output:**\n\nOutput\n- Extracts only the 1, 5, and 15-minute load averages.\n- Useful for monitoring scripts.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Example 3: Checking Load Averages Only",
          "snippet": "uptime | awk -F'[a-z]:' '{ print $2 }'"
        }
      },
      {
        "title": "5. Syntax",
        "content": "Command examples and usage details for **Syntax**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Syntax",
          "snippet": "uptime [options]"
        }
      },
      {
        "title": "1. -h, --help",
        "content": "Displays the help message for the uptime command and exits. It shows usage syntax and available options. This option does not modify the system.\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -h, --help",
          "snippet": "uptime --help"
        }
      },
      {
        "title": "2. -p, --pretty",
        "content": "Shows the uptime in a human-readable format.\n\n**Syntax:**\n\n**Output:**\n\n- Makes uptime easier to read at a glance.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -p, --pretty",
          "snippet": "uptime -p"
        }
      },
      {
        "title": "3. -s, --since",
        "content": "Displays the date and time when the system was last booted.\n\n**Syntax:**\n\n**Output:**\n\n- Useful for tracking how long the system has been running since boot.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -s, --since",
          "snippet": "uptime -s"
        }
      },
      {
        "title": "4. -V, --version",
        "content": "Shows version information of the uptime command.\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -V, --version",
          "snippet": "uptime -V"
        }
      },
      {
        "title": "10. Linux uptime Command Examples",
        "content": "The uptime command in Linux provides information about how long the system has been running, along with the number of users and the system load averages. Here are some examples of using the uptime command:\n\n- Checking System Load Average: This command extracts and displays only the load averages for the last 1, 5, and 15 minutes using awk.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Linux uptime Command Examples",
          "snippet": "uptime | awk -F'[a-z]:' '{ print $2 }'"
        }
      },
      {
        "title": "11. Alternatives to uptime",
        "content": "While the uptime command in Linux is useful for checking system uptime and load averages, there are several alternatives that provide similar or more detailed information."
      },
      {
        "title": "1. top",
        "content": "Provides a real-time view of processes, CPU/memory usage, uptime, and load averages.\n\n**Command:**\n\n**Output:**\n\n- Uptime is shown at the top of the output."
      },
      {
        "title": "2. htop",
        "content": "Interactive process viewer with a color-coded display of system stats, including uptime.\n\n**Command:**\n\n- Easier to read than top, useful for monitoring in real time."
      },
      {
        "title": "3. w",
        "content": "Displays logged-in users, login times, uptime, and load averages.\n\n**Command:**\n\n**Output:**\n\n- Provides additional details about active users."
      },
      {
        "title": "4. /proc/uptime",
        "content": "Shows uptime and idle time in seconds.\n\n**Command:**\n\n**Output:**\n\nOutput\n- First number = total uptime (seconds)\n- Second number = idle time (seconds)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. /proc/uptime",
          "snippet": "cat /proc/uptime"
        }
      },
      {
        "title": "5. systemd-analyze",
        "content": "Provides boot performance statistics and uptime on systemd-based systems.\n\n**Command:**\n\n**Output:**\n\n- Useful for detailed boot and performance analysis.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. systemd-analyze",
          "snippet": "systemd-analyze"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: uptime Command: System Load Averages Explained",
      "initialCode": "uptime | awk -F'[a-z]:' '{ print $2 }'",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: uptime Command: System Load Averages Explained",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of uptime Command: System Load Averages Explained?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to uptime Command: System Load Averages Explained",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "uptime Command: System Load Averages Explained is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-iostat": {
    "id": "linux-iostat",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "iostat Command: Monitoring CPU and Disk I/O",
    "subtitle": "Complete Linux guide to iostat Command: Monitoring CPU and Disk I/O — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The iostat command in Linux is used to monitor CPU usage and input/output (I/O) statistics for devices and partitions. It helps administrators understand how storage devices are performing and whether the system is experiencing disk bottlenecks.\n\n- Monitors CPU utilization.\n- Tracks disk read/write activity.\n- Displays I/O transfer rates.\n- Reports on device utilization.**Note:** The iostat command is part of the sysstat package. If it is not installed on your system, you'll need to install it first.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for iostat Command: Monitoring CPU and Disk I/O."
        }
      },
      {
        "title": "1. On Red Hat / CentOS / Fedora:",
        "content": "Command examples and usage details for **1. On Red Hat / CentOS / Fedora:**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. On Red Hat / CentOS / Fedora:",
          "snippet": "sudo yum install sysstat"
        }
      },
      {
        "title": "2. On Debian / Ubuntu / Linux Mint:",
        "content": "Command examples and usage details for **2. On Debian / Ubuntu / Linux Mint:**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. On Debian / Ubuntu / Linux Mint:",
          "snippet": "sudo apt-get install sysstat"
        }
      },
      {
        "title": "4. Example: Displaying Basic CPU and Device Statistics",
        "content": "**Command:**\n\n- The output is divided into two main sections:**Output:**"
      },
      {
        "title": "1. CPU Report (avg-cpu Section)",
        "content": "The avg-cpu section gives us an overview of CPU utilization:\n\n- **%user:** Represents the percentage of CPU time spent on user processes (non-kernel). In the example, it's 2.97%.\n- **%nice:** Shows the percentage of CPU time spent on processes with a \"nice\" value, which affects the priority of the process. In the example, it's 0.00%, meaning no process is running with an adjusted priority.\n- **%system:** Percentage of CPU time spent on system (kernel) processes. In the example, it's 0.69%.\n- **%iowait:** Time spent by the CPU waiting for I/O operations to complete. The example shows 0.21%, indicating a minimal amount of I/O wait time.\n- **%steal:** The percentage of time the CPU spends waiting for resources from a hypervisor in a virtualized environment. In this example, it's 0.00%, meaning no significant virtualization wait.\n- **%idle:** The percentage of time the CPU is idle and there are no pending I/O operations. Here, it's 96.13%, indicating the system is mostly idle."
      },
      {
        "title": "2. Device Utilization Report",
        "content": "The device section provides information about I/O operations for each disk device:\n\n- **Device:** The name of the device or partition. In the example, you can see loop0, loop1, etc., and a physical disk nvme0n1.\n- **tps:** The number of transfers per second to the device. nvme0n1 shows 9.18 tps, meaning it is actively transferring data.\n- **kB_read/s:** The amount of data read from the device per second in kilobytes. For nvme0n1, it's 72.57 kB/s.\n- **kB_wrtn/s:** The amount of data written to the device per second in kilobytes. nvme0n1 shows 247.92 kB/s.\n- **kB_dscd/s:** The amount of discarded data (if any) per second. In the example, there is no discarded data, so it's 0.00 kB/s.\n- **kB_read:** Total kilobytes read from the device.\n- **kB_wrtn:** Total kilobytes written to the device.\n- **kB_dscd:** Total kilobytes discarded."
      },
      {
        "title": "7. Syntax",
        "content": "- **options:** Optional flags to customize the output.\n- **device_name:** Specific device or partition name (e.g., /dev/sda). If omitted, iostat reports on all devices.\n- **interval:** Time delay (in seconds) between each report. If omitted, it reports statistics once.\n- **count:** Number of reports to generate. If omitted, iostat will continue indefinitely.**Note: **If interval and count are not specified, iostat displays a single report.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Syntax",
          "snippet": "iostat [options] [device_name] [interval] [count]"
        }
      },
      {
        "title": "1. -h, --help",
        "content": "Displays the help message and exits. This option provides usage syntax and a list of available options.\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -h, --help",
          "snippet": "iostat --help"
        }
      },
      {
        "title": "2. -x: Extended Statistics",
        "content": "Displays detailed (extended) I/O statistics for devices. This option provides deeper insight into disk performance and is useful for troubleshooting and performance analysis.\n\n**Syntax:**\n\n**Output:**\n\n- **avg-cpu:** Shows CPU utilization statistics.\n- **Device:** Lists the block devices being monitored.\n- **%util:** Percentage of time the device was busy handling I/O requests.\n- **await:** Average time (in milliseconds) for I/O requests to be completed (includes queue time and service time).\n- **svctm:** Average service time (in milliseconds) for I/O requests.\n- **avgqu-sz:** Average queue length (number of requests waiting).\n- **avgrq-sz:** Average size of I/O requests.\n- **r/s, w/s:** Number of read and write requests per second.\n- **rsec/s, wsec/s:** Number of sectors read/written per second.\n- **rrqm/s, wrqm/s:** Number of merged read/write requests per second.**Example: -xd: Extended Statistics for Devices Only**\n\nWhen -x is combined with -d, the command shows extended statistics for devices only (excluding CPU statistics).\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -x: Extended Statistics",
          "snippet": "iostat -x"
        }
      },
      {
        "title": "3. -c: CPU Statistics Only",
        "content": "Displays only CPU statistics. Provides CPU utilization metrics, including %user, %system, %idle, etc..\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -c: CPU Statistics Only",
          "snippet": "iostat -c"
        }
      },
      {
        "title": "4. -d: Device Statistics Only",
        "content": "Displays only device (disk) statistics without CPU information.\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -d: Device Statistics Only",
          "snippet": "iostat -d"
        }
      },
      {
        "title": "5. -k: Kilobytes",
        "content": "Displays statistics in kilobytes per second instead of the default block units.\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. -k: Kilobytes",
          "snippet": "iostat -k"
        }
      },
      {
        "title": "6. -m: Megabytes",
        "content": "Displays statistics in megabytes per second, making the output easier to read for high-throughput systems.\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. -m: Megabytes",
          "snippet": "iostat -m"
        }
      },
      {
        "title": "7. -j: Persistent Device Names",
        "content": "Displays statistics using persistent device names instead of standard /dev/sdX names. This is useful when device names change after reboot.\n\n**Syntax:**\n\n- Here, ID specifies the type of persistent name.**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. -j: Persistent Device Names",
          "snippet": "iostat -j ID mmcbkl0 sda6 -x -m 2 2"
        }
      },
      {
        "title": "8. -p: Partitions",
        "content": "Displays statistics for block devices and all their partitions automatically. If a specific device is provided, it shows statistics for that device and its partitions.\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. -p: Partitions",
          "snippet": "iostat -p"
        }
      },
      {
        "title": "9. -N: LVM / Device Mapper Names",
        "content": "Displays registered device-mapper names (such as LVM logical volumes) instead of underlying physical device names.\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. -N: LVM / Device Mapper Names",
          "snippet": "iostat -N"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: iostat Command: Monitoring CPU and Disk I/O",
      "initialCode": "sudo yum install sysstat",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: iostat Command: Monitoring CPU and Disk I/O",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of iostat Command: Monitoring CPU and Disk I/O?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to iostat Command: Monitoring CPU and Disk I/O",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "iostat Command: Monitoring CPU and Disk I/O is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-lsof": {
    "id": "linux-lsof",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "lsof Command: Listing Open Files & Network Descriptors",
    "subtitle": "Complete Linux guide to lsof Command: Listing Open Files & Network Descriptors — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The lsof command in Linux stands for List Open Files. It provides a list of files that are currently opened and the processes that are using them. This command is extremely useful for monitoring file usage, network connections, and process activity.\n\n- Lists open files and the processes using them\n- Displays PID, user, file descriptor, file type, and file path\n- Supports files, directories, devices, pipes, sockets, and network connections\n- Commonly used for debugging file locks, process activity, and network usage",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for lsof Command: Listing Open Files & Network Descriptors."
        }
      },
      {
        "title": "2. Example: List All Open Files",
        "content": "This command lists out all the files that are opened by any process in the system.\n\n**Command:**\n\n**Output:**\n\n**File Descriptor (FD) Types:**\n\n- **cwd:** Current working directory.\n- **txt:** Text file or executable file.\n- **mem:** Memory file.\n- **mmap:** Memory mapped device.\n- **REG / DIR / CHR / IPv4 / IPv6:** File or network types"
      },
      {
        "title": "3. Syntax",
        "content": "- **lsof:** Command itself, used to list open files.\n- **[options]:** Flags to filter and customize output.**Files that can be listed include:**\n\n- Regular files (e.g., text or binary files)\n- Directories\n- Block special files (e.g., devices)\n- Character special files\n- Pipes\n- Sockets (both UNIX and internet)\n- Network connections (TCP and UDP)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "lsof [option]"
        }
      },
      {
        "title": "1. -u: List Files Opened by a Specific User",
        "content": "Each user on a system runs processes that may open different files such as configuration files, logs, devices, or network sockets. The -u option allows you to filter the output and display only the files opened by a particular user.\n\n**Syntax:**\n\n- **username:** Replace with the desired username.**Example: Lists out all the files opened by ubuntu user**\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -u: List Files Opened by a Specific User",
          "snippet": "lsof -u username"
        }
      },
      {
        "title": "2. -u ^user: Exclude a Specific User",
        "content": "The caret symbol (^) is used to exclude a user from the results. This option lists files opened by all users except the specified user.\n\n**Syntax:**\n\n**Command:**\n\nThis command lists files opened by all users except the specified user.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -u ^user: Exclude a Specific User",
          "snippet": "lsof -u ^root"
        }
      },
      {
        "title": "3. -c: List Files Opened by a Command Name",
        "content": "The -c option filters the output based on the process (command) name. It displays files opened by processes whose names match the given string. This is useful when troubleshooting a specific application or service.\n\n**Syntax:**\n\n**Example: Files opened by Mysql process**\n\nThe files and their description opened by Mysql process\n\n**Command:**\n\n**Output:**\n\n**Example 2: Files opened by the apache process**\n\nThe files that are opened by the apache process\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -c: List Files Opened by a Command Name",
          "snippet": "lsof -c process_name"
        }
      },
      {
        "title": "4. -p: List Files Opened by a Process ID",
        "content": "Every running process in Linux has a unique Process ID (PID). The -p option allows you to check all files opened by a specific process using its PID.\n\n**Syntax:**\n\n**Output:**\n\n**Exclude a Specific PID**\n\nLists files opened by all processes except the specified PID\n\n**Syntax:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -p: List Files Opened by a Process ID",
          "snippet": "lsof -p process ID"
        }
      },
      {
        "title": "5. -R : Show Parent Process IDs",
        "content": "Processes in Linux have parent-child relationships. The -R option displays the Parent Process ID (PPID) along with the standard output columns.\n\n**Syntax:**\n\n**Output:**"
      },
      {
        "title": "6. +D: List Files Opened in a Specific Directory",
        "content": "Lists files opened by processes within a specified directory.\n\nSyntax:\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. +D: List Files Opened in a Specific Directory",
          "snippet": "lsof +D /directory/path"
        }
      },
      {
        "title": "7. -i: List Open Network Connections",
        "content": "In Linux, network connections (TCP/UDP sockets) are treated similarly to files. The -i option displays all open network connections along with the processes using them.\n\n**Syntax:**\n\n**To filter:**\n\n**Output:**"
      },
      {
        "title": "8. Manual Page",
        "content": "To view detailed documentation and all available options\n\n**Command:**\n\n**Output:**\n\nComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: lsof Command: Listing Open Files & Network Descriptors",
      "initialCode": "lsof [option]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: lsof Command: Listing Open Files & Network Descriptors",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of lsof Command: Listing Open Files & Network Descriptors?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to lsof Command: Listing Open Files & Network Descriptors",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "lsof Command: Listing Open Files & Network Descriptors is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-sys-monitoring": {
    "id": "linux-sys-monitoring",
    "badge": "Module 9 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Linux System Monitoring Commands & Tools Overview",
    "subtitle": "Complete Linux guide to Linux System Monitoring Commands & Tools Overview — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux provides a variety of commands and tools that allow administrators to track key metrics in real-time or over time. These tools help analyze CPU, memory, disk I/O, network activity and processes to ensure efficient system operation.\n\n- Track system resource usage (CPU, memory, disk, network).\n- Identify processes consuming high resources.\n- Detect bottlenecks and potential system issues.\n- Monitor system performance trends over time.\n- Facilitate proactive troubleshooting and optimization.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Linux System Monitoring Commands & Tools Overview."
        }
      },
      {
        "title": "1. top command",
        "content": "The top command is used to display real-time information about running processes and system resource usage. It provides a dynamic, continuously updating view of CPU, memory and process activity, making it one of the most commonly used monitoring tools in Linux.\n\n- Monitor CPU and memory usage in real time.\n- Identify resource-intensive processes.\n- Track system load and uptime.\n- View process details such as PID, user and command."
      },
      {
        "title": "3. Example: Monitor real-time processes",
        "content": "Monitor system processes and resource usage in real time. Displays a continuously updating table of processes sorted by CPU usage by default.\n\n**Command:**\n\n**Output:**\n\nSystem Activity and Running Process & Their Up-time"
      },
      {
        "title": "2. vmstat command",
        "content": "The vmstat (Virtual Memory Statistics) command is used to monitor system performance related to memory, CPU, processes and I/O activity. It provides snapshots of system statistics and helps identify performance bottlenecks over time.\n\n- Monitor memory and swap usage.\n- Analyze CPU activity and idle time.\n- Detect disk I/O bottlenecks.\n- Observe system performance trends over intervals."
      },
      {
        "title": "5. Example: View system memory and CPU snapshots",
        "content": "View a snapshot of system performance metrics. Displays information about processes, memory usage, swap, I/O, system interrupts and CPU activity.\n\n**Command:**\n\n**Output:**\n\nChecking System Activity using vmstat Command"
      },
      {
        "title": "3. free command",
        "content": "The free command is used to display information about system memory usage, including total, used and free physical memory, as well as swap memory. It provides a quick overview of how memory is being utilized.\n\n- Check total and available system memory.\n- Monitor used and free RAM.\n- View swap memory usage.\n- Quickly diagnose memory-related issues."
      },
      {
        "title": "7. Example: Check current memory usage",
        "content": "Display current memory usage of the system. Shows memory statistics in a tabular format, including RAM and swap details.\n\n**Command:**\n\n**Output:**\n\nSystem's available Space and Cache Using free Command"
      },
      {
        "title": "4. iostat command",
        "content": "The iostat (Input/Output Statistics) command is used to monitor CPU utilization and disk I/O performance. It helps identify disk bottlenecks and understand how efficiently the system is handling read/write operations.\n\n- Monitor disk read/write activity.\n- Analyze CPU utilization along with I/O.\n- Detect disk performance bottlenecks.\n- Evaluate system throughput and device load."
      },
      {
        "title": "9. Example: Analyze CPU and disk I/O statistics",
        "content": "View CPU and disk I/O statistics. Displays CPU usage and statistics for each disk device, including read/write rates and utilization.\n\n**Command:**\n\n**Output:**\n\nDisk Performance and Activity using iostat Command"
      },
      {
        "title": "5. netstat command",
        "content": "The netstat (Network Statistics) command is used to monitor network connections, routing tables, interface statistics and port usage. It helps administrators understand network activity and diagnose network-related issues.\n\n- View active network connections.\n- Check open and listening ports.\n- Monitor network interface statistics.\n- Analyze routing tables and network traffic."
      },
      {
        "title": "11. Example: List active network connections and ports",
        "content": "Display active network connections and listening services. Shows protocol type, local and remote addresses, connection states and associated processes.\n\n**Command:**\n\n**Output:**\n\nNetwork Connections, Open Ports, Packets & Protocols using netstat Command**Note: **netstat has been deprecated use ss instead"
      },
      {
        "title": "6. iotop command",
        "content": "The iotop command is used to monitor disk I/O usage in real time. It displays the processes that are performing the most read and write operations, helping identify disk-heavy applications that may slow down the system.\n\n- Monitor real-time disk I/O usage by processes.\n- Identify processes causing high disk activity.\n- Analyze read/write bandwidth usage.\n- Troubleshoot disk performance issues."
      },
      {
        "title": "13. Example: Track real-time disk I/O by process",
        "content": "View processes consuming disk I/O resources. Requires root privileges to display all process activity. Shows real-time disk read/write usage per process.\n\n**Command:**\n\n**Output:**\n\nDisplay columns with the I/O bandwidth used by Each System Process",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Example: Track real-time disk I/O by process",
          "snippet": "sudo iotop"
        }
      },
      {
        "title": "7. htop command",
        "content": "The htop command is an interactive process monitoring tool that provides an enhanced and user-friendly version of the top command. It displays real-time system metrics with better visualization and allows easier interaction with running processes.\n\n- Monitor CPU and memory usage interactively.\n- View processes with color-coded output.\n- Navigate and scroll through process lists.\n- Manage processes (kill, renice) directly from the interface.\n- Visualize parent-child process relationships (tree view)."
      },
      {
        "title": "15. Example: Interactively monitor processes and resources",
        "content": "Monitor system performance with an interactive interface. Opens a dynamic interface showing CPU, memory usage bars and a detailed process list. Requires installation on some systems.\n\n**Command:**\n\n**Output:**\n\nRunning processes with their CPU and memory usage",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 15. Example: Interactively monitor processes and resources",
          "snippet": "sudo htop"
        }
      },
      {
        "title": "8. atop command",
        "content": "The atop command is an advanced system monitoring tool that provides detailed information about system performance over time. It tracks CPU, memory, disk I/O, network usage and processes and also supports historical logging for later analysis.\n\n- Monitor overall system performance in real time.\n- Analyze historical resource usage trends.\n- Identify performance spikes and bottlenecks.\n- Track CPU, memory, disk and network activity together."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Linux System Monitoring Commands & Tools Overview",
      "initialCode": "sudo iotop",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Linux System Monitoring Commands & Tools Overview",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Linux System Monitoring Commands & Tools Overview?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Linux System Monitoring Commands & Tools Overview",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Linux System Monitoring Commands & Tools Overview is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-shell-intro": {
    "id": "linux-shell-intro",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "28 min read",
    "level": "Advanced",
    "title": "Introduction to Linux Shell and Shell Scripting",
    "subtitle": "Complete Linux guide to Introduction to Linux Shell and Shell Scripting — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In Linux systems, users communicate with the operating system through a shell, which interprets and executes commands entered in a terminal. The shell acts as an intermediary between the user and the kernel, ensuring that instructions are processed correctly. Building on this interaction model, shell scripting allows users to combine multiple commands into a single file and execute them as a program, enabling structured task automation and system control.\n\n- Forms the foundation of command-line interaction in Unix/Linux systems\n- Enables automation of repetitive administrative tasks\n- Supports batch execution of multiple commands\n- Widely used in system administration and DevOps environments",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Introduction to Linux Shell and Shell Scripting."
        }
      },
      {
        "title": "2. Core Components of the Linux Environment",
        "content": "Before starting with shell scripting, it is important to understand the main components of a Linux system. These components work together in layers, where user input passes through multiple stages before reaching the hardware.\n\n- **Terminal:** Interface used to access the shell\n- **Shell:** Command interpreter that processes user input\n- **Kernel:** Core of the operating system that manages hardware and system resources\n- **GNU Utilities & Libraries:** Provide essential commands and system functions"
      },
      {
        "title": "3. Terminal",
        "content": "The terminal is a program that provides a text-based interface for users to interact with the system. It allows users to enter commands and displays the output generated by those commands. The terminal itself does not interpret commands, it simply provides an environment in which the shell runs.\n\n- To access the terminal, simply search in the search box \"terminal\" and double-click it.open terminal\n- Here you can see how the terminal looks of Red Hat Linux.terminal"
      },
      {
        "title": "4. Shell",
        "content": "The shell is a command-line interpreter that acts as a bridge between the user and the kernel. It receives commands from the terminal, interprets them and translates them into instructions that the operating system can execute. Without the shell, the system cannot understand human-readable commands.\n\n- Interprets and validates user commands\n- Converts commands into system calls\n- Executes built-in and external programs\n- Displays output or error messages\n- Provides scripting capabilitiesLinux Shell"
      },
      {
        "title": "5. Shell is broadly classified into two categories:",
        "content": "- Command Line Shell\n- Graphical shell"
      },
      {
        "title": "6. Command Line Shell (CLI-Based Shell)",
        "content": "Shell can be accessed by users using a command line interface. A special program called Terminal in Linux/macOS or Command Prompt in Windows OS is provided to type in the human-readable commands such as \"cat\", \"ls\" etc. and then it is being executed. The result is then displayed on the terminal to the user. A terminal in Ubuntu system looks like this:\n\nlinux command line\n- In the above screenshot, the ls -l command is executed. This command lists all files and directories in the current working directory in a long listing format, displaying detailed information such as permissions, ownership, file size and modification date.\n- Working with the command-line interface (CLI) can be challenging for beginners since it requires memorizing numerous commands. However, it is an incredibly powerful tool — it allows users to store multiple commands in a file and execute them together, enabling automation of repetitive tasks. These files are known as batch files in Windows and shell scripts in Linux and macOS systems"
      },
      {
        "title": "7. Graphical Shells",
        "content": "A Graphical Shell allows users to interact with the system through a Graphical User Interface (GUI). Instead of typing commands, users perform actions by clicking icons, opening windows and using menus.\n\n- Window-based program management\n- Drag-and-drop file handling\n- Mouse-driven navigation\n- Visual system settings configuration**A typical GUI in the Ubuntu system:**\n\nGUI Shell"
      },
      {
        "title": "8. Common Shell Programs in Linux",
        "content": "Linux supports multiple shell programs. Each shell performs the same core task but differs in syntax, features and built-in functionality.\n\n- **Bash (Bourne Again Shell):** The most widely used Linux shell and the default login shell on most Linux systems.\n- **Csh (C Shell):** The C shell's syntax and its usage are very similar to the C programming language.\n- **Ksh (Korn Shell):** The Korn Shell was also the base for the POSIX Shell standard specifications."
      },
      {
        "title": "9. Kernel",
        "content": "The kernel is the core component of the operating system. It directly interacts with the computer hardware and manages all critical system resources. While the shell interprets user commands, the kernel is responsible for actually executing them at the hardware level.\n\n- Process Management\n- Memory Management\n- File System Management\n- Device Management\n- Input/Output (I/O) ManagementComplete Linux system = Kernel + GNU system utilities and libraries + other management scripts + installation scripts."
      },
      {
        "title": "10. Getting Started with Shell Scripting",
        "content": "Shell scripting allows users to automate repetitive tasks by combining multiple commands into a single file. Instead of typing each command manually, a shell script executes a sequence of commands automatically, saving time and reducing errors. This is particularly useful in system administration, DevOps and repetitive workflow management."
      },
      {
        "title": "11. Shell Script",
        "content": "A shell script is essentially a text file containing a series of commands that the shell can interpret and execute. These files typically have a .sh extension, such as:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Shell Script",
          "snippet": "myscript.sh"
        }
      },
      {
        "title": "12. Uses and Advantages of Shell Scripts",
        "content": "Shell scripts are widely used in Linux and Unix-based systems because they provide a simple yet powerful way to automate tasks and manage systems efficiently. Their flexibility makes them essential for IT professionals, system administrators and DevOps engineers.\n\n**1. Automate Repetitive Tasks**\n\nShell scripts turn routine jobs like file cleanup, backups or server updates into one-click actions, saving time and reducing manual effort\n\n**2. Reliable and Consistent**\n\nShell scripts run the exact same steps every time, without mistakes. Once you write and test a script, you can count on it to perform tasks consistently whether it's setting up servers, cleaning up files or running a deployment. This removes human error and ensures predictable results.\n\n**3. Native Support on Unix/Linux Systems**\n\nShell scripting is natively supported on Unix-based systems, requiring no additional installations. The shell environment (like Bash or Zsh) is pre-installed, allowing scripts to run seamlessly across most Linux distributions and Unix-like operating systems.\n\n**4. Great for Linking Commands to Work Together**\n\nShell scripts make it easy to link different commands together. You can pass the output of one command into another, filter data or run tasks step by step all in one script. This helps automate complex jobs using simple building blocks.\n\n**5. Ideal for IT, DevOps & Monitoring**\n\nShell scripts help automate important tasks like checking system health, setting up servers and scheduling jobs to run at specific times (using tools like cron). In DevOps, they are widely used to speed up deployments and manage infrastructure without doing everything manually.\n\n**6. Lightweight and Easy to Write**\n\nThey are interpreted, so there is no compile step. You can write a useful script in minutes and test it instantly perfect for quick fixes and small tasks."
      },
      {
        "title": "13. Shell Script Structure, Syntax",
        "content": "A shell script is essentially a sequence of commands stored in a text file, which the shell executes in order. Understanding the structure and syntax of shell scripts is essential to write efficient and error-free scripts.\n\n**Shebang (#!):**\n\n- The first line in a shell script typically starts with #!/bin/bash\n- Specifies which shell should interpret the script**Comments:**\n\n- Lines starting with # are comments and are ignored during execution\n- Useful for documenting the script**Commands:**\n\n- Shell commands like ls, cd, echo, pwd are executed sequentially**Variables:**\n\n- Used to store values or user input for reuse in commands\n- **Example:** MYDIR=\"/home/user/projects\"**Control Structures:**\n\n- **Conditional statements:** if...then...else, case\n- **Loops:** for, while, until**Functions:**\n\n- Reusable blocks of code that can be called multiple times within a script**Example:** A simple shell script to displays the current directory and lists all files\n\n- **#!/bin/bash:** Uses Bash shell to run the script\n- **echo:** Prints text to the terminal\n- **pwd:** Prints the current working directory\n- **ls -l:** Lists files in long format, showing permissions, size and modification date**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Shell Script Structure, Syntax",
          "snippet": "#!/bin/bash# This script displays the current directory and lists all filesecho \"Current Directory:\"pwdecho \"Files in Directory:\"ls -l"
        }
      },
      {
        "title": "14. Practical Shell Script Example: Directory Jump Script",
        "content": "When working deep inside nested directories, repeatedly typing cd ../ to move up can be time-consuming. A shell script can automate this process, allowing you to jump directly to a desired directory level.\n\nget to the “python” directory:**Script: jump.sh**\n\n**Making the Script Executable**\n\nBy default, scripts do not have execution permissions. To make it executable:\n\n**Command:**\n\n**Integrating with .bashrc for Persistent Availability**\n\nTo make the jump function available in every terminal session:\n\n**Command:**\n\n- After restarting the terminal, you can use the script**Command:**\n\n**Output:**\n\njump dir_name\n- This command will move directly to the specified directory from any location within your filesystem.Comment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Practical Shell Script Example: Directory Jump Script",
          "snippet": "#!/bin/bash# A simple bash script to move up to desired directory level directlyfunction jump(){    # original value of Internal Field Separator    OLDIFS=$IFS    # setting field separator to \"/\"    IFS=/    # converting working path into array of directories in path    # eg. /my/path/is/like/this    # into [, my, path, is, like, this]    path_arr=($PWD)    # setting IFS to original value    IFS=$OLDIFS    local pos=-1    # ${path_arr[@]} gives all the values in path_arr    for dir in \"${path_arr[@]}\"    do        # find the number of directories to move up to        # reach at target directory        pos=$[$pos+1]        if [ \"$1\" = \"$dir\" ];then            # length of the path_arr            dir_in_path=${#path_arr[@]}            #current working directory            cwd=$PWD            limit=$[$dir_in_path-$pos-1]            for ((i=0; i<limit; i++))            do                cwd=$cwd/..            done            cd $cwd            break        fi    done}"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Introduction to Linux Shell and Shell Scripting",
      "initialCode": "myscript.sh",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Introduction to Linux Shell and Shell Scripting",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Introduction to Linux Shell and Shell Scripting?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Introduction to Linux Shell and Shell Scripting",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Introduction to Linux Shell and Shell Scripting is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-kernel": {
    "id": "linux-kernel",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "28 min read",
    "level": "Advanced",
    "title": "The Linux Kernel: Subsystems & System Calls",
    "subtitle": "Complete Linux guide to The Linux Kernel: Subsystems & System Calls — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Linux OS Architecture](/images/linux/linux-architecture.svg)\n\n- The Linux Kernel is the core part of the Linux operating system that connects software with hardware. It manages system resources and allows applications to function properly. Linux is open-source, which means anyone can view, modify and distribute its source code.\n\n- The Linux Kernel acts as a bridge between hardware and software.\n- Open-source and freely available to everyone.\n- Developed by Linus Torvalds in 1991 as a personal project.\n- Continuous community contributions made it powerful and popular.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for The Linux Kernel: Subsystems & System Calls."
        }
      },
      {
        "title": "2. Role of the Kernel in Resource Management",
        "content": "In a general-purpose computer, multiple processes run simultaneously. To manage these processes efficiently, a special software layer is required. This layer is known as the kernel.\n\n- Allocates CPU time to processes\n- Manages system memory\n- Controls access to hardware devices\n- Prevents conflicts between processes\n- Provides virtual resources to applicationsKernel working"
      },
      {
        "title": "3. Core Subsystems of the Linux Kernel",
        "content": "The Linux kernel is composed of several subsystems that work together to manage system resources."
      },
      {
        "title": "4. Major Subsystems",
        "content": "- The Process Scheduler\n- The Memory Management (MM)\n- The Virtual File System (VFS)\n- The Networking Subsystem\n- Inter-Process Communication (IPC) UnitSubsystems of the linux kernel"
      },
      {
        "title": "1. Process Scheduler",
        "content": "The Process Scheduler is responsible for distributing CPU time fairly among all running processes. It decides which process should run and for how long.\n\n- Controls process execution order\n- Ensures fair CPU usage\n- Supports multitasking\n- Improves system responsiveness"
      },
      {
        "title": "2. Memory Management",
        "content": "The Memory Management manages system memory and allocates it to different processes. It provides each process with its own virtual address space.\n\n- Allocates and frees memory\n- Handles paging and swapping\n- Provides memory protection\n- Improves memory efficiency"
      },
      {
        "title": "3. Virtual File System (VFS)",
        "content": "The Virtual File System provides a unified interface for accessing different types of file systems. It hides the details of physical storage from applications.\n\n- Supports multiple file systems\n- Provides a standard file interface\n- Improves portability\n- Simplifies file access"
      },
      {
        "title": "4. Networking Subsystem",
        "content": "The networking subsystem manages network communication, including protocols such as TCP/IP, socket interfaces and packet routing.\n\n- Handles network packets\n- Manages sockets and connection\n- Supports multiple network protocols\n- Enables communication between systems"
      },
      {
        "title": "5. Inter-Process Communication (IPC)",
        "content": "IPC mechanisms allow processes to communicate and synchronize with each other.\n\n**Common IPC methods:**\n\n- Pipes\n- Message queues\n- Shared memory\n- Signals\n- Semaphores"
      },
      {
        "title": "10. Basic Linux Commands for Kernel Work",
        "content": "To work effectively with Linux and the kernel, you should be familiar with some basic terminal commands."
      },
      {
        "title": "1. ls: List Files and Directories",
        "content": "Displays the contents of a directory.\n\n**Syntax:**\n\n**Example:**\n\nTo list all the file and directories in our current location\n\nls command",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. ls: List Files and Directories",
          "snippet": "ls [OPTION] [FILE]"
        }
      },
      {
        "title": "2. mkdir: Create a Directory",
        "content": "To creates a new directory we use mkdir (make directory) command.\n\n**Syntax:**\n\n**Example:**\n\nTo make a directory name `test` and to check it we can use command `ls`.\n\n**Output:**\n\nmkdir command",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. mkdir: Create a Directory",
          "snippet": "mkdir [OPTION] DIRECTORY"
        }
      },
      {
        "title": "3. cat: Display File Content",
        "content": "Prints the contents of a file to the terminal.\n\n**Syntax:**\n\n**Example:**\n\nPrinting a content inside a text file name `example`.\n\ncat command",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. cat: Display File Content",
          "snippet": "cat [OPTION] [FILE]"
        }
      },
      {
        "title": "4. pwd: Show Current Directory",
        "content": "Displays the full path of the current working directory.\n\n**Syntax:**\n\n**Example:**\n\npwd commandComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: The Linux Kernel: Subsystems & System Calls",
      "initialCode": "ls [OPTION] [FILE]",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: The Linux Kernel: Subsystems & System Calls",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of The Linux Kernel: Subsystems & System Calls?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to The Linux Kernel: Subsystems & System Calls",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "The Linux Kernel: Subsystems & System Calls is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-different-shells": {
    "id": "linux-different-shells",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Different Shells in Linux (bash, zsh, fish, ksh, sh)",
    "subtitle": "Complete Linux guide to Different Shells in Linux (bash, zsh, fish, ksh, sh) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A shell is a program that acts as an interface between the user and the Linux operating system. It allows users to interact with the system by accepting commands and executing them. When a user logs in, the operating system automatically starts a shell session. The shell works with the kernel, which manages hardware, processes, memory and system resources.\n\n- Provides a command-line interface for user interaction\n- Acts as a bridge between users and the kernel\n- Executes system commands and user programs\n- Supports scripting and automation\n- Manages environment variables and processes",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Different Shells in Linux (bash, zsh, fish, ksh, sh)."
        }
      },
      {
        "title": "2. Shell and Kernel Relationship",
        "content": "In Linux, the operating system mainly consists of two core components: the kernel and the shell. Both work together to allow users to interact with the system."
      },
      {
        "title": "3. Kernel",
        "content": "The kernel is the core part of the operating system. It is responsible for:\n\n- Controlling access to hardware devices\n- Managing CPU, memory and storage resources\n- Handling process scheduling and execution\n- Enforcing security and access permissions**Note:** Users cannot directly communicate with the kernel."
      },
      {
        "title": "4. Shell",
        "content": "The shell acts as an interface between the user and the kernel. Its main functions are:\n\n- Accepting commands from the user\n- Interpreting command syntax\n- Sending instructions to the kernel\n- Displaying output on the screen"
      },
      {
        "title": "5. Working Flow",
        "content": "The interaction between the user, shell and kernel follows this sequence:\n\n- The user enters a command.\n- The shell processes and interprets it.\n- The kernel executes the request.\n- The result is returned to the user.This structure ensures secure and efficient system operation.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Working Flow",
          "snippet": "User > Shell > Kernel > Hardware"
        }
      },
      {
        "title": "6. Types of Shells in Linux",
        "content": "Linux provides multiple shells, each designed with different features and usage purposes. These shells vary in terms of performance, scripting capability and user interaction. Some shells focus on simplicity and portability, while others emphasize advanced customization and productivity."
      },
      {
        "title": "7. Commonly Used Linux Shells",
        "content": "The most widely used shells in Linux systems are:\n\n- Bourne Shell (sh)\n- C Shell (csh)\n- Korn Shell (ksh)\n- GNU Bourne-Again Shell (bash)\n- T Shell (tcsh)\n- Z Shell (zsh)**Note:** This order follows a logical progression based on historical development and feature evolution"
      },
      {
        "title": "8. Bourne Shell (sh)",
        "content": "The Bourne Shell was developed by Steve Bourne at AT&T Bell Labs. It is the original UNIX shell and forms the foundation for many modern shells. It is designed to be fast, lightweight and suitable for system-level scripting.\n\n- First widely used UNIX shell\n- Simple and efficient design\n- Suitable for portable shell scripts\n- Limited interactive features\n- No built-in arithmetic support**Denoted As:**\n\n**Path:**\n\n**Non-root Prompt:**\n\n**Root Prompt:**"
      },
      {
        "title": "9. C Shell (csh)",
        "content": "The C Shell was developed by Bill Joy at the University of California, Berkeley. It introduced several interactive features that were not available in the original Bourne shell. It is known for its C-like syntax and user-friendly command-line behavior.\n\n- Supports C-style programming syntax\n- Provides command history and aliases\n- Includes built-in arithmetic operation\n- Improves interactive command usage\n- Suitable for users familiar with C language**Denoted As:**\n\n**Path:**\n\n**Non-root Prompt:**\n\n**Root Prompt:**"
      },
      {
        "title": "10. Korn Shell (ksh)",
        "content": "The Korn Shell was developed by David Korn at AT&T Bell Labs. It is a superset of the Bourne shell, meaning it supports all features of sh and adds advanced capabilities. It combines scripting power with strong interactive features.\n\n- Fully compatible with Bourne shell scripts\n- Supports arrays, functions and variables\n- Provides built-in arithmetic operations\n- Offers command history and job control\n- Faster and more efficient than C Shell**Denoted As:**\n\n**Path:**\n\n**Non-root Prompt:**\n\n**Root Prompt:**"
      },
      {
        "title": "11. GNU Bourne-Again Shell (bash)",
        "content": "The GNU Bourne-Again Shell (Bash) is the most widely used shell in Linux systems. It is compatible with the Bourne shell and also includes features from the Korn shell. Bash is the default shell in most Linux distributions.\n\n- Default shell in most Linux environments\n- Supports command history and auto-completion\n- Provides job control and signal handling\n- Powerful scripting and debugging features\n- Highly compatible with POSIX standards**Denoted As:**\n\n**Path:**\n\n**Non-root Prompt:**\n\n**Root Prompt:**"
      },
      {
        "title": "12. T Shell (tcsh)",
        "content": "The T Shell (tcsh) is an enhanced and backward-compatible version of the C Shell. It was originally developed on BSD Unix systems and later ported to Linux and other platforms. Tcsh improves the usability of C Shell by adding modern interactive features.\n\n- Compatible with C Shell syntax\n- Provides advanced command-line editing\n- Supports improved history handling\n- Includes programmable auto-completion\n- Better error reporting than C Shell**Denoted As:**\n\n**Path:**\n\n**Non-root Prompt:**\n\n**Root Prompt:**"
      },
      {
        "title": "13. Z Shell (zsh)",
        "content": "The Z Shell (zsh) is an extended and highly customizable shell based on Bash and Korn shell features. It was created by Paul Falstad in 1990 while he was a student at Princeton University. Zsh is popular among advanced users due to its flexibility and rich plugin ecosystem.\n\n- Advanced auto-completion and globbing\n- Plugin and theme support through frameworks\n- Powerful scripting capabilities\n- Highly customizable prompt system\n- Better handling of long commands**Denoted As:**\n\n**Path:**\n\n**Non-root Prompt:**\n\n**Root Prompt:**"
      },
      {
        "title": "14. Comparison of Common Linux Shells",
        "content": "The major Linux shells differ in terms of origin, usability, scripting power and customization."
      },
      {
        "title": "1. Based On / Origin",
        "content": "- **sh (Bourne Shell):** The original UNIX shell and the base for most modern shells.\n- **csh (C Shell):** Developed independently with C-like syntax.\n- **ksh (Korn Shell):** Built as an extension of the Bourne shell.\n- **bash (Bourne-Again Shell):** Based on Bourne shell and influenced by Korn shell.\n- **tcsh (T Shell):** An improved version of C Shell.\n- **zsh (Z Shell):** Inspired by Bash and Korn shell with added features."
      },
      {
        "title": "2. Interactive Features",
        "content": "- **sh:** Provides very limited interactive support.\n- **csh:** Offers basic command history and aliases.\n- **ksh:** Supports advanced job control and history.\n- **bash:** Includes strong interactive features and auto-completion.\n- **tcsh:** Improves C Shell with better editing and completion.\n- **zsh:** Provides the most advanced interactive environment."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Different Shells in Linux (bash, zsh, fish, ksh, sh)",
      "initialCode": "User > Shell > Kernel > Hardware",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Different Shells in Linux (bash, zsh, fish, ksh, sh)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Different Shells in Linux (bash, zsh, fish, ksh, sh)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Different Shells in Linux (bash, zsh, fish, ksh, sh)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Different Shells in Linux (bash, zsh, fish, ksh, sh) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-shell-vs-kernel": {
    "id": "linux-shell-vs-kernel",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "20 min read",
    "level": "Advanced",
    "title": "Difference Between Shell and Kernel",
    "subtitle": "Complete Linux guide to Difference Between Shell and Kernel — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In computing, the operating system (OS) acts as a bridge between computer hardware and the user. Two important components of an operating system are the shell and the kernel. Both work together to ensure smooth interaction between users, applications and hardware. Understanding the difference between the shell and the kernel helps in learning how operating systems function internally.\n\n- The shell provides a user interface for interacting with the operating system\n- The kernel manages hardware and system resources\n- Both components work together to execute user commands\n- The shell operates at a higher level than the kernel\n- The kernel interacts directly with computer hardware",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Difference Between Shell and Kernel."
        }
      },
      {
        "title": "2. Role of Shell and Kernel",
        "content": "In an operating system, the shell and the kernel perform different but connected functions. Each component has a specific responsibility in handling user requests and system operations."
      },
      {
        "title": "3. Shell",
        "content": "The shell is a user-level program that provides a command-line interface (CLI) for interacting with the operating system. It allows users to enter commands, run programs and control system behavior. Instead of communicating directly with hardware, the shell passes user requests to the kernel for execution.\n\n**Main Functions of Shell**\n\n- Accepts commands and input from the user\n- Interprets command syntax and options\n- Converts user commands into system calls\n- Sends execution requests to the kernel\n- Displays command output and error messages\n- Maintains command history and aliases\n- Supports shell scripting for automation**Additional Responsibilities of Shell**\n\n- Manages environment variables\n- Controls foreground and background processes\n- Provides tab completion and command editing\n- Handles input/output redirection and pipelines"
      },
      {
        "title": "4. Kernel",
        "content": "The kernel is the central and most important part of the operating system. It runs in privileged mode and has complete access to system hardware and memory. All system programs, including the shell, depend on the kernel to perform actual operations.\n\n**Main Functions of Kernel**\n\n- Manages CPU scheduling and multitasking\n- Controls memory allocation and virtual memory\n- Handles process creation and termination\n- Manages file systems and disk access\n- Controls input/output devices\n- Provides hardware drivers\n- Enforces system security and permissions**Additional Responsibilities of Kernel**\n\n- Handles interrupts and system calls\n- Prevents unauthorized hardware access\n- Maintains system stability\n- Optimizes resource utilization\n- Supports communication between processes"
      },
      {
        "title": "5. Advantages and Disadvantages of Shell and Kernel",
        "content": "Both the shell and the kernel have their own strengths and limitations. Understanding these helps users choose the right tools and use the system efficiently."
      },
      {
        "title": "6. Advantages of Shell",
        "content": "- Enables fast and efficient command execution\n- Supports scripting for task automation\n- Allows remote system management\n- Provides flexible command handling\n- Helps in managing files and processes easily"
      },
      {
        "title": "7. Disadvantages of Shell",
        "content": "- Limited graphical visualization\n- Requires learning command syntax\n- Can be difficult for beginners\n- Mistyped commands may cause errors\n- Less user-friendly than GUI-based tools"
      },
      {
        "title": "8. Advantages of Kernel",
        "content": "- Efficiently manages system resources\n- Ensures smooth multitasking\n- Provides hardware abstraction\n- Improves system stability and performance\n- Controls access permissions and security"
      },
      {
        "title": "9. Disadvantages of Kernel",
        "content": "- Limited flexibility for user-level customization\n- Highly dependent on hardware compatibility\n- Errors in kernel code may affect the entire system\n- Difficult to modify without technical expertise"
      },
      {
        "title": "10. Shell vs Kernel",
        "content": "ShellKernelShell allows users to communicate with the kernelKernel controls all tasks of the systemIt is the interface between the user and the operating systemIt is the core component of the operating systemIt is a command line interpreter (CLI).It is low-level system softwareIt interprets user commands and sends requests to the kernelExecutes system callsIt does not directly interact with hardwareDirectly interacts with hardwareSends requests to the kernelManages hardware resourcesIt provides features like command history, tab completion and scriptingManages CPU, memory and devicesInitiates/launches programs (on user request)Schedules and manages execution of those programsShell commands like ls, mkdir are used by usersPerforms memory and process managementIt is the outer layer of the operating systemIt is the inner layer of the operating system**Types:** Bourne Shell, C Shell, Korn Shell, Bash\n\n**Types:** Monolithic, Microkernel, Hybrid Kernel Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Difference Between Shell and Kernel",
      "initialCode": "#!/usr/bin/env bash\n# Difference Between Shell and Kernel\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Difference Between Shell and Kernel",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Difference Between Shell and Kernel?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Difference Between Shell and Kernel",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Difference Between Shell and Kernel is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-terminal-console": {
    "id": "linux-terminal-console",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Terminal vs Console vs Shell vs Kernel",
    "subtitle": "Complete Linux guide to Terminal vs Console vs Shell vs Kernel — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The terminal, console, shell and kernel are fundamental components of an operating system that help users interact with a computer. Together, they connect user commands to system hardware through layers of software and interfaces.\n\n- **Terminal:** A text-based interface where users type commands and receive output from the system.\n- **Console:** The physical or virtual device that provides access for input and output operations.\n- **Shell:** A command-line interpreter that translates user commands into actions performed by the operating system.\n- **Kernel:** The core part of the operating system that manages hardware resources like memory, CPU and devices.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Terminal vs Console vs Shell vs Kernel."
        }
      },
      {
        "title": "2. Terminal",
        "content": "The Linux terminal is a command-line interface that lets users interact with the system using text commands. It is used for file management, running programs, system administration and automation, offering precise control and flexibility.\n\n- Executes commands and manages processes\n- Supports scripting for automation\n- Aids in system monitoring and troubleshooting\n- Provides access to system settings and administrationThe terminal is just an interface that accepts user input and displays output. It does not understand commands itself, so it relies on another program - usually the shell - to interpret and execute them"
      },
      {
        "title": "3. Key Functions",
        "content": "- Takes user input in the form of commands\n- Displays output and system responses\n- Helps in automation and scripting\n- Provides deep control over system resources"
      },
      {
        "title": "4. Console",
        "content": "The console is the primary interface that allows users to directly interact with the operating system through input and output devices. It can be a physical screen/keyboard or a virtual interface.\n\n- Acts as a low-level communication interface with the OS\n- Can work without a graphical environment\n- Used during system boot and recovery scenarios\n- Supports multiple virtual terminalsIn Windows, the Command Prompt opens a console window, which works similarly to the Linux terminal. However, the console is the underlying system interface, while the command prompt is the program running inside it."
      },
      {
        "title": "5. Shell",
        "content": "The shell is a command-line interpreter that acts as a bridge between the user and the kernel. When you press Enter after typing a command, the terminal sends it to the shell for processing."
      },
      {
        "title": "6. The shell performs the following functions",
        "content": "- Interprets user commands\n- Checks command syntax and correctness\n- Converts valid commands into a format understood by the kernel\n- Forwards those commands to the kernel\n- Displays errors if the command is incorrect\n- Displays a new prompt for the next command"
      },
      {
        "title": "7. Examples of shell programs include",
        "content": "- **Bash:** The most widely used Linux shell, known for scripting, automation and default availability on most systems.\n- **Zsh:** An advanced shell with powerful customization, better autocomplete and plugin support.\n- **Ksh:** A Unix shell optimized for scripting with enhanced programming features.\n- **Tcsh:** An improved version of the C Shell with command-line editing and history features.\n- **Fish Shell:** A user-friendly shell with syntax highlighting, auto suggestions and easy configuration.**Note:** Default shell varies according to your Linux distribution (commonly Bash; some use Zsh)."
      },
      {
        "title": "8. Kernel",
        "content": "The kernel is the core component of the operating system responsible for managing system resources and hardware communication. It executes the commands passed by the shell and interacts directly with hardware components."
      },
      {
        "title": "9. Core Components of Kernel Interaction",
        "content": "- **OS Libraries:** Provide functions such as read() and write() that applications use to request kernel services.\n- **Device Drivers:** Allow communication with hardware like keyboard, disk and display"
      },
      {
        "title": "10. Kernel Responsibilities",
        "content": "The kernel handles most of the core system operations and manages hardware and system resources; some of its major responsibilities are listed below.\n\nKernel Responsibilities"
      },
      {
        "title": "1. Memory Management",
        "content": "- Allocates and deallocates system memory(RAM)\n- Ensures efficient use of RAM and prevents memory conflicts"
      },
      {
        "title": "2. CPU (Process) Scheduling",
        "content": "- Manages process execution and task switching\n- Allocates CPU time between running processes"
      },
      {
        "title": "3. Device Management",
        "content": "- Controls communication with hardware devices\n- Manages device drivers and hardware interrupts"
      },
      {
        "title": "4. File System Management",
        "content": "- Organizes and manages data storage on disks\n- Handles file access permissions and security"
      },
      {
        "title": "5. Input/Output Handling",
        "content": "- Manages communication between software and hardware\n- Handles data transfer between input and output devices"
      },
      {
        "title": "16. Interaction Flow Between Terminal, Shell and Kernel",
        "content": "The communication between these components follows a layered execution model. Each layer has a specific responsibility in processing user commands."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Terminal vs Console vs Shell vs Kernel",
      "initialCode": "#!/usr/bin/env bash\n# Terminal vs Console vs Shell vs Kernel\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Terminal vs Console vs Shell vs Kernel",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Terminal vs Console vs Shell vs Kernel?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Terminal vs Console vs Shell vs Kernel",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Terminal vs Console vs Shell vs Kernel is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-create-script": {
    "id": "linux-create-script",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "16 min read",
    "level": "Advanced",
    "title": "How to Create and Execute a Shell Script",
    "subtitle": "Complete Linux guide to How to Create and Execute a Shell Script — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A shell script is a collection of commands written in a scripting language that is interpreted by a shell in an operating system such as Linux. The shell acts as a command-line interface (CLI), allowing users to interact with the operating system by executing commands.\n\nShell scripts are commonly used to:\n\n- Automate repetitive tasks\n- Execute a sequence of commands\n- Simplify system administration\n- Improve efficiency and consistency",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for How to Create and Execute a Shell Script."
        }
      },
      {
        "title": "2. Step 1: Choose a Text Editor",
        "content": "Before you start writing your shell script, you need a text editor. Popular choices include Nano, Vim, and Emacs. For beginners, Nano is user-friendly and easy to use.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Step 1: Choose a Text Editor",
          "snippet": "nano myscript.sh"
        }
      },
      {
        "title": "3. Step 2: Write Your Script",
        "content": "Let's create a simple script that prints \"Hello, World!\" to the terminal.\n\n**Script:**\n\n**\n\nExplanation:**\n\n- The first line (#!/bin/bash) is called the shebang. It specifies the shell that should be used to interpret the script.\n- Lines starting with # are comments. They are ignored by the shell and help improve readability.\n- The echo command prints text to the terminal.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Step 2: Write Your Script",
          "snippet": "#!/bin/bash# This is a simple shell scriptecho \"Hello, World!\""
        }
      },
      {
        "title": "4. Step 3: Save and Exit",
        "content": "Save the script in Nano editor by pressing Ctrl + O, then Enter to confirm, and finally Ctrl + X to exit."
      },
      {
        "title": "5. Step 4: Make the Script Executable",
        "content": "To run the script, you need to make it executable:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Step 4: Make the Script Executable",
          "snippet": "chmod +x myscript.sh"
        }
      },
      {
        "title": "6. Running the Script",
        "content": "Now that your script is executable, you can run it by typing.\n\n**Command:**\n\n- The ./ indicates that the script is located in the current directory.**Output:**\n\n**Alternative Method (Without Changing Permissions)**\n\nA script can also be executed by explicitly specifying the interpreter:\n\n**Command:**\n\n- In this case, execute permission is not required.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Running the Script",
          "snippet": "./myscript.sh"
        }
      },
      {
        "title": "7. Variables and Input",
        "content": "Shell scripts can use variables to store and manipulate data. Here's an example:\n\n**Script:**\n\n- **read:** Stores user input in the variable name\n- $name retrieves the value of the variable\n- Run the script, and it will prompt you to enter your name.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Variables and Input",
          "snippet": "#!/bin/bash# Get user inputecho \"Enter your name:\"read name# Print a greetingecho \"Hello, $name!\""
        }
      },
      {
        "title": "8. Control Flow",
        "content": "Shell scripts support basic control flow structures like if statements, case statements, and loops.\n\n**Example:**\n\nThis script checks whether the entered number is even or odd.\n\n**Script:**\n\n**Output:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Control Flow",
          "snippet": "#!/bin/bashecho \"Enter a number:\"read numif [ $((num % 2)) -eq 0 ]; then  echo \"$num is even.\"else  echo \"$num is odd.\"fi"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: How to Create and Execute a Shell Script",
      "initialCode": "nano myscript.sh",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: How to Create and Execute a Shell Script",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of How to Create and Execute a Shell Script?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to How to Create and Execute a Shell Script",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "How to Create and Execute a Shell Script is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-script-comments": {
    "id": "linux-script-comments",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "Single-Line and Multi-Line Comments in Shell Scripts",
    "subtitle": "Complete Linux guide to Single-Line and Multi-Line Comments in Shell Scripts — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Comments in shell scripts are used to explain code and improve readability. They are ignored by the shell during execution and do not affect the program output. Comments are mainly used for documentation and code maintenance. They help developers understand the purpose and logic of commands, especially when scripts become long or complex.\n\n- Comments are ignored by the shell interpreter.\n- They improve script readability and maintainability.\n- Comments help explain logic, variables, and script purpose.\n- Shell scripting mainly supports single-line comments.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Single-Line and Multi-Line Comments in Shell Scripts."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **#:** Indicates the start of a comment\n- **comment text:** Any explanatory text ignored by the shell",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Syntax",
          "snippet": "# comment text"
        }
      },
      {
        "title": "3. Shebang Line (Interpreter Directive)",
        "content": "The shebang line is a special comment placed at the very beginning of a shell script. It indicates the interpreter that should execute the script.\n\n**Format:**\n\n- Begins with #! followed by the absolute path of the interpreter.\n- Required for direct script execution**Note:** Although it starts with #, it is handled specially by the operating system.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Shebang Line (Interpreter Directive)",
          "snippet": "#!/bin/bash"
        }
      },
      {
        "title": "4. Common Pitfalls and Misconceptions",
        "content": "- **Expectation of multi-line comments:** Shell scripting does not provide native multi-line comment syntax.\n- **Missing space in inline comments:** The # must have a space before it; otherwise, the shell may treat it as part of the command or argument.\n- **Excessive commenting:** Redundant comments reduce clarity instead of improving it.\n- **Replacing clean code with comments:** Clear naming and structure should reduce the need for explanations.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Single-Line and Multi-Line Comments in Shell Scripts",
      "initialCode": "# This script displays the current user and working directoryecho \"Current User:\"whoami   # Displays the usernameecho \"Current Directory:\"pwd      # Prints the present working directory",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Single-Line and Multi-Line Comments in Shell Scripts",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Single-Line and Multi-Line Comments in Shell Scripts?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Single-Line and Multi-Line Comments in Shell Scripts",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Single-Line and Multi-Line Comments in Shell Scripts is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-script-messages": {
    "id": "linux-script-messages",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "24 min read",
    "level": "Advanced",
    "title": "Displaying and Broadcasting Messages in Shell Scripts",
    "subtitle": "Complete Linux guide to Displaying and Broadcasting Messages in Shell Scripts — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Broadcasting a message in a shell script allows system-wide communication with all logged-in users. This technique is useful for administrators to send notifications, warnings, or maintenance alerts. Shell scripts automate this process, making it easier to ensure that messages reach the intended users quickly.\n\n- Messages can be sent to all logged-in users simultaneously\n- Commonly used for system alerts and administrative notifications\n- Requires appropriate user permissions to broadcast messages\n- Uses standard Linux utilities available on most distributions\n- Can be automated using shell scripts for repeated use",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Displaying and Broadcasting Messages in Shell Scripts."
        }
      },
      {
        "title": "2. Example: Broadcasting a Message Using wall",
        "content": "Demonstrates how to send a message to all logged-in users using a shell script.\n\n**Script:**\n\n- The wall command sends the specified message to all logged-in users’ terminals.\n- The message will appear on every active terminal session of logged-in users**Output:**\n\nScript to broadcast a system maintenance notification.Maintenance message displayed on all active user terminals",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Broadcasting a Message Using wall",
          "snippet": "#!/bin/bash# Broadcasting a maintenance notification to all userswall \"System maintenance will begin in 10 minutes. Please save your work.\""
        }
      },
      {
        "title": "3. Syntax",
        "content": "- **\"Your message here\":** The text to broadcast to all users.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "wall \"Your message here\""
        }
      },
      {
        "title": "4. Step-by-Step Guide to Broadcast a Message",
        "content": "**Script (broadcast_message.sh):**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step-by-Step Guide to Broadcast a Message",
          "snippet": "#!/bin/bash# Send a message to all userswall \"System maintenance will begin in 10 minutes. Please save your work.\""
        }
      },
      {
        "title": "5. Steps to Run",
        "content": "**1. Create the script file:**\n\n**2. Paste the script into the file and save it.**\n\n- In nano, press CTRL+O to save and CTRL+X to exit.**3. Make the script executable:**\n\n**4. Run the script:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Steps to Run",
          "snippet": "nano broadcast_message.sh"
        }
      },
      {
        "title": "6. Message to a Specific User",
        "content": "The write command allows sending a message to a specific user’s terminal. This is useful for direct communication without notifying all users.\n\n**Syntax:**\n\n- **username:** Name of the target user.\n- **tty:** Terminal session of the user (optional).",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Message to a Specific User",
          "snippet": "write username [tty]"
        }
      },
      {
        "title": "7. Example: Sending a Message to a Specific User",
        "content": "**Script:**\n\n- **echo:** Generates the message.\n- **write:** Sends the message directly to the specified user (captain-levi).**Output:**\n\nScript for specific userMessage sent to user terminal",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Example: Sending a Message to a Specific User",
          "snippet": "#!/bin/bash# Send a message to the user \"captain-levi\" on their terminalecho \"Hello, Captain Levi ! System maintenance starts in 10 minutes.\" | write captain-levi"
        }
      },
      {
        "title": "8. Broadcasting a Message to All Users",
        "content": "The wall command broadcasts a message to all logged-in users. This method is useful for system-wide alerts and notifications."
      },
      {
        "title": "9. Example: Broadcasting a System Alert",
        "content": "Script:\n\n- **wall:** sends the specified message to every active terminal session.**Output:**\n\nScript to broadcast message to all user terminalsBroadcast message displayed on all user terminals",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Example: Broadcasting a System Alert",
          "snippet": "#!/bin/bash# Send a system update message to all userswall \"Scheduled system reboot at midnight. Please save your work.\""
        }
      },
      {
        "title": "10. Broadcasting a Message to a User Group",
        "content": "Messages can also be sent to a specific group of users using the -g option of the wall command. This is useful for team-specific notifications.\n\n**Syntax:**\n\n- **groupname:** Name of the target user group.\n- **\"Your message here\":** Message to broadcast.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Broadcasting a Message to a User Group",
          "snippet": "wall -g groupname \"Your message here\""
        }
      },
      {
        "title": "11. Example: Broadcasting a Message to a Specific User Group",
        "content": "**Script:**\n\n- **wall -g developers:** sends the message to all members of the developers group.\n- The message appears on the active terminals of all group members.**Output:**\n\nScript intended to send a message to users in the ‘developers’ groupBroadcast message displayed to all logged-in users in the ‘developers’ group**Important Note (Distribution Limitation): **\n\n- On some Linux distributions (including certain Ubuntu/Debian systems), the -g option may not correctly restrict the message to the specified group.\n- In such cases, the message may be broadcast to all logged-in users, even those not in the target group.\n- If this happens, use the reliable method below.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Example: Broadcasting a Message to a Specific User Group",
          "snippet": "#!/bin/bash# Send a message to all users in the \"developers\" groupwall -g developers \"Reminder: Daily build process starts in 5 minutes.\""
        }
      },
      {
        "title": "12. Manually Target Group Members",
        "content": "This method ensures the message is sent only to logged-in users who belong to the specified group.\n\n**Script:**\n\n- getent group retrieves members of the group.\n- who checks which users are currently logged in.\n- write sends the message only to active terminals of those users.**Output:**\n\nScript to send a message to all logged-in users in the ‘developers’ groupReminder message displayed on terminals of logged-in users in the ‘developers’ groupComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Manually Target Group Members",
          "snippet": "#!/bin/bash# Send a message to all users in the developers groupfor user in $(getent group developers | awk -F: '{print $4}' | tr ',' ' '); do    # send message to all terminals of that user    for tty in $(who | awk -v u=\"$user\" '$1==u {print $2}'); do        echo \"Reminder: Daily build process starts in 5 minutes.\" | write \"$user\" \"$tty\"    donedone"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Displaying and Broadcasting Messages in Shell Scripts",
      "initialCode": "#!/bin/bash# Broadcasting a maintenance notification to all userswall \"System maintenance will begin in 10 minutes. Please save your work.\"",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Displaying and Broadcasting Messages in Shell Scripts",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Displaying and Broadcasting Messages in Shell Scripts?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Displaying and Broadcasting Messages in Shell Scripts",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Displaying and Broadcasting Messages in Shell Scripts is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-save-output": {
    "id": "linux-save-output",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "18 min read",
    "level": "Advanced",
    "title": "Redirecting & Saving Command Output to Files (> , >> , tee)",
    "subtitle": "Complete Linux guide to Redirecting & Saving Command Output to Files (> , >> , tee) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux provides a powerful Command-Line Interface (CLI) for executing commands efficiently. Command output can be stored in files for logging, analysis, debugging or documentation. Saving output is especially useful when working with large results or generating system reports.\n\n- Redirect command output to a file\n- Overwrite or append data safely\n- Automatically create files if they do not exist\n- Display output on the terminal while saving it\n- Useful for logs, scripts and automation tasks",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Redirecting & Saving Command Output to Files (> , >> , tee)."
        }
      },
      {
        "title": "2. Using Redirection Operators",
        "content": "We can use redirection operators to save command output to files. Redirection operators redirect the output of a command to a file rather than the terminal.\n\n**Two primary operators are:**\n\n- **>:** Overwrite mode\n- **>>:** Append mode"
      },
      {
        "title": "3. Example 1: Using > (Overwrite Mode)",
        "content": "Store command output in a file and remove any existing content.\n\n**Command:**\n\n- **ls:** lists files and directories.\n- **>:** redirects standard output to sample.txt.\n- Existing file content is erased.**Note:** If the file does not exist, it is created automatically.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example 1: Using > (Overwrite Mode)",
          "snippet": "ls > sample.txt"
        }
      },
      {
        "title": "4. Example 2: Using >> (Append Mode)",
        "content": "Add new output to the end of a file without deleting existing content.\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Example 2: Using >> (Append Mode)",
          "snippet": "date >> sample.txt"
        }
      },
      {
        "title": "5. Syntax of Redirection",
        "content": "- **command:** Any executable Linux command\n- **>:** Redirect and overwrite\n- **>>:** Redirect and append\n- **filename:** Target file for storing output**Note:** If the file does not exist, Linux creates it automatically.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Syntax of Redirection",
          "snippet": "command > filenamecommand >> filename"
        }
      },
      {
        "title": "6. Using the tee Command",
        "content": "Redirection operators send output only to a file. To display output on the terminal and save it simultaneously, use the tee command. tee reads standard input and writes it to both the terminal and a file.\n\n**Syntax:**\n\n- **| (pipe):** passes the output from the command to tee.\n- **filename:** is the target file where the output is saved.**Note:** Existing file content is overwritten unless the append option is used.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Using the tee Command",
          "snippet": "command | tee filename"
        }
      },
      {
        "title": "7. Example 1: Using tee",
        "content": "Display command output on the terminal while saving it to a file at the same time.\n\n**Command:**\n\n- **ls:** Lists files and directories.\n- **| (pipe):** Passes the output to tee.\n- **tee:** Writes the output to sample.txt and also prints it on the terminal.\n- Existing content in the file is overwritten.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Example 1: Using tee",
          "snippet": "ls | tee sample.txt"
        }
      },
      {
        "title": "8. Example 2: Using tee -a (Append Mode)",
        "content": "Append command output to a file while displaying it on the terminal.\n\n**Command:**\n\n- **echo \"Hello Linux\":** Generates text output.\n- **-a:** Option tells tee to append to the file instead of overwriting it.\n- Existing content in sample.txt remains intact.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Example 2: Using tee -a (Append Mode)",
          "snippet": "echo \"Hello Linux\" | tee -a sample.txt"
        }
      },
      {
        "title": "9. Also Check",
        "content": "- How to View the Content of File in Linux | cat Command\n- Export command in Linux with Examples\n- How to Create a Text File Using the Command Line in LinuxComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Redirecting & Saving Command Output to Files (> , >> , tee)",
      "initialCode": "ls > sample.txt",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Redirecting & Saving Command Output to Files (> , >> , tee)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Redirecting & Saving Command Output to Files (> , >> , tee)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Redirecting & Saving Command Output to Files (> , >> , tee)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Redirecting & Saving Command Output to Files (> , >> , tee) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-exit-codes": {
    "id": "linux-exit-codes",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "Exit Codes ($?) and Error Handling in Bash Scripts",
    "subtitle": "Complete Linux guide to Exit Codes ($?) and Error Handling in Bash Scripts — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Bash scripts often perform multiple system tasks and errors are inevitable. Proper error handling ensures that your scripts exit gracefully and provide meaningful feedback to users, preventing unexpected behaviour or system issues.\n\n- Ensures scripts stop execution upon errors.\n- Helps provide informative error messages to users.\n- Reduces risk of incomplete operations or data corruption.\n- Enables debugging and easier maintenance.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Exit Codes ($?) and Error Handling in Bash Scripts."
        }
      },
      {
        "title": "2. Understanding Exit Codes",
        "content": "Exit codes indicate the result of a command or script execution in Bash.\n\n- **0:** Indicates successful execution.\n- **1 - 255:** Error or specific conditions.\n- **$?:** Special variable storing the exit code of the last executed command.Scripts can check exit codes to determine if a command succeeded and act accordingly."
      },
      {
        "title": "3. Example: Checking Exit Status",
        "content": "**Script:**\n\n**Output (Successful Case):**\n\n- The directory is created successfully, the exit code is 0.**Output (Failure Case):**\n\n- The command fails (for example, the directory already exists), the exit code will be non-zero.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example: Checking Exit Status",
          "snippet": "#!/bin/bashmkdir /tmp/exampleecho $?"
        }
      },
      {
        "title": "1. Using the exit Command and Exit Codes",
        "content": "The exit command is the most direct way to stop a Bash script when an error occurs. It terminates the script immediately and returns a numeric exit status to the shell.\n\n**Example: Exit When a Command Fails**\n\nStop the script if directory creation fails.\n\n**Script:**\n\n- **mkdir /tmp/example: **Attempts to create a directory.\n- **$?:** Stores the exit status of mkdir.\n- **-ne 0:** Checks if the exit code is not equal to 0 (meaning failure).\n- **exit 1:** Stops the script and returns status code 1.**Output (Failure Case):**\n\n- The script exits immediately after the failure.**Example with Error Message:**\n\nProvide user-friendly feedback before exiting.\n\n**Script:**\n\n- If the command fails (for example, due to permission denied),\n- The script prints an error message.\n- Then exits with status code 1.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Using the exit Command and Exit Codes",
          "snippet": "#!/bin/bashmkdir /tmp/exampleif [ $? -ne 0 ]; then  exit 1fi"
        }
      },
      {
        "title": "2. Using set -e to Exit Automatically on Errors",
        "content": "The set -e option instructs Bash to exit the script immediately if any command returns a non-zero exit status. This removes the need to manually check $? after every command.\n\n- Automatically stops script execution on error.\n- Reduces repetitive conditional checks.\n- Suitable for scripts where any failure is critical.\n- Improves readability in short automation scripts.**Note:** set -e applies to the entire script. If a command fails inside a function or subshell, the script will also exit.\n\n**Example: Immediate Exit on Failure**\n\nStop execution as soon as a command fails.\n\n**Script:**\n\n**Output:**\n\n- The script terminates after the error.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Using set -e to Exit Automatically on Errors",
          "snippet": "#!/bin/bashset -els /nonexistent_directoryecho \"This line will not be executed\""
        }
      },
      {
        "title": "3. Using trap Command for Cleanup and Error Handling",
        "content": "The trap command allows you to specify commands to be executed when a script exits, regardless of whether it exits successfully or due to an error. This is particularly useful for cleanup tasks like removing temporary files or undoing operations.\n\n- Ensures specific actions are performed when the script terminates.\n- Useful for cleanup operations (e.g., removing temporary files).\n- Works for both normal exits and error-triggered exits.\n- Enhances script reliability and safety.**Example: Cleanup on Exit**\n\nRemove a temporary directory when the script exits.\n\n**Script:**\n\n- trap 'rm -rf /tmp/example' EXIT sets up a cleanup command that runs when the script exits.\n- Whether the script exits successfully (exit 0) or due to an error, the rm command will be triggered to delete the /tmp/example directory.**Output:**\n\n- The script will create the directory /tmp/example, run some commands and then clean up by removing the directory.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Using trap Command for Cleanup and Error Handling",
          "snippet": "#!/bin/bashtrap 'rm -rf /tmp/example' EXITmkdir /tmp/example# other script operationsexit 0"
        }
      },
      {
        "title": "4. Command Substitution for Error Handling",
        "content": "Command substitution allows you to capture the output of a command and store it in a variable. This is useful when you want to display meaningful error messages or process command results before deciding whether to exit the script.\n\n- Captures command output using $(...).\n- Allows custom error reporting.\n- Can combine standard output and error output.\n- Useful for logging and debugging purposes.**Example: Capture Output and Check Failure**\n\nStore the result of a command and exit if it fails.\n\n**Script:**\n\n- **$(...):** Executes the command inside and stores its output in result.\n- **2>&1:** Redirects standard error (2) to standard output (1), ensuring error messages are captured.\n- **$?:** Checks the exit status of the mkdir command.\n- If the command fails, the script prints the captured error message and exits.**Output (Failure Case):**\n\nIn this example, if the mkdir command fails to create the directory, the error message will be assigned to the \"result\" variable and displayed on the console.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Command Substitution for Error Handling",
          "snippet": "#!/bin/bashresult=$(mkdir /root/protected_dir 2>&1)if [ $? -ne 0 ]; then  echo \"Error: $result\"  exit 1fi"
        }
      },
      {
        "title": "5. Suppressing Error Messages",
        "content": "In some cases, a command may fail but the error message is not important for the user. Bash allows you to suppress error output while still checking whether the command succeeded or failed.\n\n**Example: Suppress Standard Error**\n\nHide error messages but exit if the command fails.\n\n**Script:**\n\n- **2>:** redirects standard error (file descriptor 2).\n- **/dev/null:** is a special file that discards all data written to it, means send error messages to nowhere.\n- $? still stores the actual exit status of the command.**Output:**\n\n- permission is denied, no error message is displayed, the script exits with status code 1.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Suppressing Error Messages",
          "snippet": "#!/bin/bashmkdir /root/protected_dir 2> /dev/nullif [ $? -ne 0 ]; then  exit 1fi"
        }
      },
      {
        "title": "6. Exit When Any Command Fails",
        "content": "Sometimes, you want a script to stop immediately if any command fails, not just specific ones. Bash provides multiple ways to achieve this, including set -e, the || operator and manual exit status checks.\n\n- Ensures critical scripts don’t continue after failures.\n- Can be applied globally (set -e) or per command (|| exit 1).\n- $? allows manual verification of command success.\n- Provides more control over error handling compared to suppressing messages.**Using || exit 1:**\n\nExit only if a specific command fails.\n\n**Script:**\n\n- The || operator executes the command on its right only if the previous command fails.\n- Here, exit 1 runs when ls fails, stopping the script.**Output:**\n\n**Using $? with an if Condition**\n\nCheck the last command’s exit status and decide whether to exit.\n\n**Script:**\n\n**Output:**\n\n**Important Notes:**\n\n- set -e exits on failures inside functions or subshells by default.\n- To temporarily allow failures in a specific block:\n\n- The || exit 1 method stops the script only if a specific command fails.\n- Using $? manually provides flexibility for logging, messaging, or conditional actions.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Exit When Any Command Fails",
          "snippet": "#!/bin/bashls /nonexistent_directory || exit 1echo \"This line will not be executed\""
        }
      },
      {
        "title": "7. Exit Only When Specific Commands Fail",
        "content": "In some cases, you might not want to stop the entire script if just one command fails. Instead, you can choose to exit only when specific commands fail, allowing other commands to continue executing.\n\n- Exit only when important commands fail.\n- Allows flexibility to skip errors for non-critical operations.\n- Use the || operator or $? for selective error handling.**Using || exit 1 for Specific Commands**\n\nStop the script when a particular (critical) command fails, but continue executing other non-critical commands.\n\n**Script:**\n\n**Output:**\n\n**Using $? to Check Exit Status**\n\nManually check whether a command succeeded or failed before deciding to exit.\n\n**Script:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Exit Only When Specific Commands Fail",
          "snippet": "#!/bin/bash# Non-critical command (allowed to fail)rm /nonexistent_file || trueecho \"Script continues after rm failure\"# Critical command (must succeed)ls /nonexistent_directory || exit 1echo \"This line will NOT run if ls fails\""
        }
      },
      {
        "title": "11. Practical Tips for Handling Script Failures",
        "content": "Handling errors effectively in Bash scripts ensures reliability, readability and easier maintenance. Here are some best practices and tips:\n\n- **Always check exit status:** Use $? or || exit 1 to handle critical commands.\n- **Use set -e for critical scripts:** Automatically stops the script if any command fails.\n- **Combine trap with cleanup tasks:** Always clean up temporary files or undo partial operations.\n- **Suppress non-critical errors:** Use 2> /dev/null or || true to ignore harmless failures.\n- **Provide clear messages:** Inform the user when a command fails to aid debugging.\n- **Be selective:** Not every failure requires the script to exit, handle important commands explicitly.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Exit Codes ($?) and Error Handling in Bash Scripts",
      "initialCode": "#!/bin/bashmkdir /tmp/exampleecho $?",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Exit Codes ($?) and Error Handling in Bash Scripts",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Exit Codes ($?) and Error Handling in Bash Scripts?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Exit Codes ($?) and Error Handling in Bash Scripts",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Exit Codes ($?) and Error Handling in Bash Scripts is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-shell-variables": {
    "id": "linux-shell-variables",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Shell Variables (Environment vs Local Variables)",
    "subtitle": "Complete Linux guide to Shell Variables (Environment vs Local Variables) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A shell variable is a named container used to store data in memory while a shell script is running. Think of it as a labelled box that holds data during script execution. The stored value can be a string, number, filename or even the output of a command. Variables make shell scripts dynamic and flexible instead of hard-coded and static.\n\n- Store temporary data during script execution\n- Accept and process user input\n- Store the output of commands\n- Control decision-making in loops and conditionals\n- Pass arguments between scripts and processes",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Shell Variables (Environment vs Local Variables)."
        }
      },
      {
        "title": "2. Types of Shell Variables",
        "content": "Shell variables can be categorized based on their scope, availability and purpose."
      },
      {
        "title": "1. Local Variables",
        "content": "Local variables are variables that are defined inside a shell or script and exist only for the duration of that shell session or script execution. Once the script finishes or the shell exits, these variables are automatically destroyed.\n\n- Accessible only inside the script or shell where they are defined\n- Not available to child processes\n- Most commonly used in shell scripts for temporary data"
      },
      {
        "title": "2. Environment Variables",
        "content": "Environment variables are special variables that are stored in the shell environment and are automatically passed to child processes created from that shell. They are used to configure system behavior and application settings.\n\n- Accessible by all child shells and programs\n- Usually written in uppercase by convention\n- Used to control the behavior of the shell and applications**Examples:** PATH, HOME, USER, PWD"
      },
      {
        "title": "3. Built-in Shell Variables",
        "content": "Built-in shell variables are predefined variables that are automatically created and managed by the shell to provide information about the system, shell environment and script execution state.\n\n- Provided by the shell itself\n- Used to access system and script-related information\n- Often used for scripting logic and debugging**Examples:**\n\n- **$SHELL:** Path to the current shell (e.g., /bin/bash).\n- **$HOSTNAME:** The name of the host machine.\n- **$?:** The exit status (0-255) of the last command (0 indicates success).\n- **$1, $2:** Positional parameters (arguments passed to your script)."
      },
      {
        "title": "6. Rules for Defining Variables",
        "content": "When creating shell variables, you must follow certain rules to ensure your script runs correctly. Incorrect definitions can cause errors or unexpected behavior."
      },
      {
        "title": "1. No Spaces Around =",
        "content": "The equals sign (=) must not have spaces on either side.\n\n**Note:** Shell treats spaces as command separators, so spaces around = break the assignment.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. No Spaces Around =",
          "snippet": "VAR=\"Hello\""
        }
      },
      {
        "title": "2. Use the Assignment Operator =",
        "content": "- Use = to assign a value to a variable.\n- Do not include $ when defining a variable.**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Use the Assignment Operator =",
          "snippet": "name=\"John\""
        }
      },
      {
        "title": "3. Variable Naming Rules",
        "content": "- Names can contain letters (a-z, A-Z), numbers (0-9) and underscores (_)\n- Names must start with a letter or underscore\n- Avoid special characters and punctuation**Conventions:**\n\n- **Local variables:** lowercase or mixed case (user_name, filePath)\n- **Environment variables:** ALL_CAPS (PATH, HOME, USER)"
      },
      {
        "title": "4. Case Sensitivity",
        "content": "- Shell variable names are case-sensitive.\n- Var and var are considered different variables."
      },
      {
        "title": "11. Accessing Variables",
        "content": "Once a variable is defined, you can use its value in a script by prefixing the variable name with $. This tells the shell to replace the variable name with its stored value."
      },
      {
        "title": "1. Basic Access",
        "content": "Display or use the value of a variable.\n\n**Script:**\n\n**Output:**\n\nExample of Accessing variable\n- Using quotes (\"$VAR_1\") ensures spaces and special characters are handled safely.\n- Without quotes, the shell may split words or misinterpret special characters.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Basic Access",
          "snippet": "#!/bin/bashVAR_1=\"Devil\"VAR_2=\"OWL\"echo \"$VAR_1$VAR_2\""
        }
      },
      {
        "title": "2. Read only Variables.",
        "content": "These variables are read only i.e., their values could not be modified later in the script. Following is an example:\n\n**Output:**\n\nExample of Read only Variables.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Read only Variables.",
          "snippet": "#!/bin/bashvar1=\"Devil\"var2=23readonly var1echo $var1 $var2var1=23echo $var1 $var2"
        }
      },
      {
        "title": "3. Unsetting Variables",
        "content": "Remove a variable from memory.\n\n**Output:**\n\nExample of Unsetting Variables**Note:** The unset command cannot be used to unset read-only variables.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Unsetting Variables",
          "snippet": "#!/bin/bashvar1=\"Devil\"var2=23echo $var1 $var2unset var1echo $var1 $var2"
        }
      },
      {
        "title": "1. Store User Input and Calculate Area",
        "content": "Use variables to take input from the user and perform calculations.\n\n- **read:** Stores user input into variables length and width\n- **$(( )):** Evaluates arithmetic expressions\n- **area:** Holds the calculated resultGiving input to the variable",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Store User Input and Calculate Area",
          "snippet": "#!/bin/bashecho \"Enter the length of the rectangle:\"read lengthecho \"Enter the width of the rectangle:\"read widtharea=$((length * width))echo \"The area of the rectangle is: $area\""
        }
      },
      {
        "title": "2. Display Message Based on Time",
        "content": "Store command output in a variable and use it to control logic.\n\n- **$(date +%H):** Stores the current hour in time\n- **if statements:** Decide the message based on the hour\n- **message:** Variable holds the greetingGetting output based on the time of the day.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Display Message Based on Time",
          "snippet": "#!/bin/bashtime=$(date +%H)if [ $time -lt 12 ]; then    message=\"Good Morning User\"elif [ $time -lt 18 ]; then    message=\"Good Afternoon User\"else    message=\"Good Evening User\"fiecho \"$message\""
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Shell Variables (Environment vs Local Variables)",
      "initialCode": "VAR=\"Hello\"",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Shell Variables (Environment vs Local Variables)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Shell Variables (Environment vs Local Variables)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Shell Variables (Environment vs Local Variables)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Shell Variables (Environment vs Local Variables) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-variable-rules": {
    "id": "linux-variable-rules",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "14 min read",
    "level": "Advanced",
    "title": "Rules for Naming and Defining Variables in Shell",
    "subtitle": "Complete Linux guide to Rules for Naming and Defining Variables in Shell — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Variables are fundamental in shell scripting and are used to store and manage data within a script. Proper variable naming ensures correct execution and improves readability. In Shell/Bash scripting, variable names must follow specific rules. Ignoring these rules can lead to syntax errors or unexpected behavior.\n\n- Prevent syntax and assignment errors\n- Avoid conflicts with reserved keywords\n- Ensure compatibility with the shell interpreter\n- Improve script readability\n- Make scripts easier to maintain and debug",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Rules for Naming and Defining Variables in Shell."
        }
      },
      {
        "title": "2. Rule 1: A variable name can have letters, numbers, and underscores",
        "content": "A variable name in Shell/Bash can include alphabets (both lowercase and uppercase), numbers, and the underscore (_) character. These are the only characters allowed for defining valid variable names.\n\n- Letters (a–z, A–Z) are allowed.\n- Numbers (0–9) are allowed.\n- Underscore (_) is allowed at any position.\n- Variable names are case-sensitive (var and VAR are different).**Examples:**\n\n**Output:**\n\n**Note:**\n\n- Avoid using _ alone as a variable name.\n- The shell uses $_ to reference the last argument of the previous command. Using _ as a variable name may cause unexpected behavior.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Rule 1: A variable name can have letters, numbers, and underscores",
          "snippet": "var_name=\"value\"X2=10user1_name=\"John\"DATA_FILE_01=\"file.txt\""
        }
      },
      {
        "title": "3. Rule 2: Do Not Use Whitespace Around the Assignment Operator (=)",
        "content": "In Shell/Bash scripting, there must be no spaces before or after the assignment operator (=) when assigning a value to a variable. Adding whitespace causes the shell to misinterpret the statement and produce errors.\n\n- No space is allowed before =.\n- No space is allowed after =.\n- The shell may treat the variable name as a command if spaces are used.\n- Incorrect spacing leads to syntax errors.**Incorrect Examples:**\n\n- These are invalid because spaces break the assignment syntax.**Output:**\n\n**Correct Example:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Rule 2: Do Not Use Whitespace Around the Assignment Operator (=)",
          "snippet": "name = \"John\"name= \"John\"name =\"John\""
        }
      },
      {
        "title": "4. Rule 3: Variable Names Cannot Contain Special Characters",
        "content": "In Shell/Bash scripting, variable names cannot include special characters except for the underscore (_). Special characters have predefined meanings in the shell and are used for operations such as variable expansion, pattern matching, and command control.\n\n- Only the underscore (_) is allowed as a special character.\n- Characters like $, #, *, &, @, !, and - are not allowed.\n- Using special characters can cause syntax errors or unexpected behavior.\n- Many special characters have operational meanings in the shell.**Invalid Examples:**\n\n**Output:**\n\n**Meaning of Special Characters in Linux:**\n\n- **$:** is used to access variable values.\n- ***:** is used for wildcard matching.\n- **#:** is used in parameter expansion and comments.\n- **&:** is used to run processes in the background.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Rule 3: Variable Names Cannot Contain Special Characters",
          "snippet": "user-name=\"Sam\"total$=100price#=50value@=10"
        }
      },
      {
        "title": "5. Rule 4: The First Character Cannot Be a Number",
        "content": "In Shell/Bash scripting, a variable name may contain numbers, but it cannot begin with a number. The first character must always be a letter or an underscore.\n\n- Numbers are allowed after the first character.\n- The variable name must start with a letter or underscore.\n- Starting with a number makes the name invalid.\n- This rule prevents ambiguity during shell interpretation.**Invalid Examples:**\n\n**Output:**\n\n**Valid Examples:**\n\n- The shell parser expects variable names to begin with a letter or underscore. Starting with a number can cause parsing errors or misinterpretation.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Rule 4: The First Character Cannot Be a Number",
          "snippet": "2X=101st_name=\"Sam\"6_gate=\"open\""
        }
      },
      {
        "title": "6. Rule 5: Variable Names Should Not Be Reserved Words",
        "content": "In Shell/Bash scripting, reserved words (keywords) are part of the shell’s syntax and control structures. Using these keywords as variable names is not recommended because it can reduce readability and may cause logical confusion or unexpected behavior.\n\n- Reserved words are used to control script flow.\n- Using them as variable names can make scripts confusing.\n- It is considered bad practice even if no error occurs.\n- Avoiding keywords improves script clarity and maintainability.**Common Reserved Words:**\n\n- **if:** Starts a conditional statement.\n- **elif:** Specifies an additional condition in an if statement.\n- **else:** Executes when previous conditions are false.\n- **then:** Marks the beginning of commands after a condition.\n- **while:** Starts a loop that runs while a condition is true.\n- **do:** Begins the body of a loop.\n- **done:** Ends a loop block.\n- **for:** Starts a loop that iterates over a list of values.\n- **until:** Runs a loop until a condition becomes true.\n- **case:** Starts a multi-condition selection block.\n- **esac:** Ends a case block.\n- **break:** Exits a loop immediately.\n- **continue:** Skips the current loop iteration.\n- **function:** Defines a function in Bash.**Bad Practice Examples:**\n\n**Output:**\n\n**Note:** Although these may not always produce errors, they make the script difficult to read and understand.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Rule 5: Variable Names Should Not Be Reserved Words",
          "snippet": "if=\"value\"for=10case=\"test\""
        }
      },
      {
        "title": "7. Rule 6: Variable Names Cannot Contain Spaces",
        "content": "In Shell/Bash scripting, variable names must not contain spaces. The shell treats spaces as separators between commands and arguments, so including a space inside a variable name will cause an error.\n\n- Spaces are not allowed inside variable names.\n- The shell interprets space as a command separator.\n- Use underscore (_) instead of spaces for multi-word names.\n- Avoiding spaces prevents syntax errors.**Incorrect Example:**\n\n- This generates an error because the shell treats first as a command.**Correct Example:**\n\n- Using an underscore improves readability while keeping the name valid.\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Rule 6: Variable Names Cannot Contain Spaces",
          "snippet": "first name=\"John\""
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Rules for Naming and Defining Variables in Shell",
      "initialCode": "var_name=\"value\"X2=10user1_name=\"John\"DATA_FILE_01=\"file.txt\"",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Rules for Naming and Defining Variables in Shell",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Rules for Naming and Defining Variables in Shell?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Rules for Naming and Defining Variables in Shell",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Rules for Naming and Defining Variables in Shell is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-bash-intro": {
    "id": "linux-bash-intro",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Bash Scripting Fundamentals",
    "subtitle": "Complete Linux guide to Bash Scripting Fundamentals — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Bash scripting is the process of writing a sequence of commands in a file and executing them together to perform tasks automatically. Instead of running commands one by one in the terminal, a script allows you to execute them in a single step.\n\n- Automates repetitive and time-consuming tasks.\n- Executes multiple commands in a single run.\n- Saves time and reduces manual effort.\n- Helps manage system operations efficiently.\n- Makes workflows consistent and repeatable.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Bash Scripting Fundamentals."
        }
      },
      {
        "title": "2. Writing Your First Bash Script",
        "content": "A Bash script is a simple text file containing commands that the shell can execute. Creating and running a script allows you to automate tasks instead of typing commands manually."
      },
      {
        "title": "3. Step 1: Create a Script File",
        "content": "Open the terminal and create a file, this creates a file named hello.sh.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Step 1: Create a Script File",
          "snippet": "nano hello.sh"
        }
      },
      {
        "title": "4. Step 2: Add Script Code",
        "content": "Add the following lines to the file:\n\n**Command:**\n\n- **#!/bin/bash**: tells the system to use the Bash interpreter.\n- **echo**: prints text to the terminal.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step 2: Add Script Code",
          "snippet": "#!/bin/bashecho \"Hello, World!\""
        }
      },
      {
        "title": "5. Step 3: Save and Exit (Nano Editor)",
        "content": "After typing the code:\n\n- **Press CTRL + O:** save the file\n- **Press Enter:** confirm filename\n- **Press CTRL + X:** exit nano"
      },
      {
        "title": "6. Step 4: Make the Script Executable",
        "content": "By default, scripts do not have execute permission.\n\n**Command:**\n\n- This command gives permission to run the script.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Step 4: Make the Script Executable",
          "snippet": "chmod +x hello.sh"
        }
      },
      {
        "title": "7. Step 5: Run the Script",
        "content": "Execute the script using\n\n**Command:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Step 5: Run the Script",
          "snippet": "./hello.sh"
        }
      },
      {
        "title": "8. Variables in bash",
        "content": "Variables in Bash are used to store data that can be reused throughout a script. They make scripts flexible and allow dynamic behavior based on stored values.\n\n- Store text, numbers or other values.\n- Declared using VariableName=Value format.\n- Accessed using $VariableName.**Example Script:**\n\n- **Name=\"Sahil Kamali\" and Age=23:** Declare two variables.\n- **$Name and $Age:** Used to access their stored values.\n- **echo:** Prints the values to the terminal.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Variables in bash",
          "snippet": "#!/bin/bashName=\"Sahil Kamali\"Age=23echo \"The name is $Name and age is $Age\""
        }
      },
      {
        "title": "9. Global and Local Variables in Bash",
        "content": "In Bash scripting, variables can be global or local depending on where they are declared and where they can be accessed."
      },
      {
        "title": "10. Global Variables",
        "content": "A global variable is declared outside any function and can be accessed anywhere in the script, including inside functions.\n\n- Accessible throughout the script\n- Can be used inside and outside functions\n- Useful for sharing values between functions**Example Script:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Global Variables",
          "snippet": "#!/bin/bashtotal=100   # global variableshowTotal() {  echo \"Total inside function: $total\"}echo \"Total outside function: $total\"showTotal"
        }
      },
      {
        "title": "11. Local Variables",
        "content": "A local variable is declared inside a function using the local keyword and is only accessible within that function.\n\n- Accessible only inside the function\n- Prevents conflicts with variables outside the function\n- Helps keep scripts organized**Example:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Local Variables",
          "snippet": "#!/bin/bashshowValue() {  local value=50  echo \"Value inside function: $value\"}showValueecho \"Value outside function: $value\""
        }
      },
      {
        "title": "12. Decision Making in Bash",
        "content": "Decision making allows a Bash script to execute different blocks of code based on conditions. This helps scripts behave dynamically instead of running the same commands every time. Conditional statements are essential for automation, validation and logical operations in scripts.\n\n- Executes commands based on conditions\n- Helps validate user input\n- Enables dynamic script behavior\n- Supports multiple execution paths\n- Improves script flexibility"
      },
      {
        "title": "1. If–Else Statement",
        "content": "The if statement evaluates a condition. If the condition is true, a block of code executes. Otherwise, an alternate block runs (if defined).\n\n**Types of If Statements:**\n\n- if-fi\n- if-else-fi\n- if-elif-else-fi\n- Nested if statements**Example: Simple If–Else Script**\n\n- **Age=17:** Stores value in a variable\n- **[ \"$Age\" -ge 18 ]:** Checks if Age is greater than or equal to 18\n- **-ge:** Numeric comparison operator (greater than or equal)\n- **then:** Executes if condition is true\n- **else:** Executes if condition is false\n- **fi:** Ends the if block**Output:**\n\n- Since 17 is less than 18, the condition is false and the else block executes.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. If–Else Statement",
          "snippet": "#!/bin/bashAge=17if [ \"$Age\" -ge 18 ]; then    echo \"You can vote\"else    echo \"You cannot vote\"fi"
        }
      },
      {
        "title": "2. Case Statement",
        "content": "The case statement is used when checking multiple possible values of a variable. It works similar to a switch statement in other programming languages. It is cleaner and more readable than multiple if conditions when handling many cases.\n\n**Example: Case Statement Script**\n\n- **case \"$Name\" in:** Starts case evaluation\n- Each pattern is followed by )\n- **;;:** Ends a pattern block\n- **esac:** Ends the case statement**Output:**\n\n- The matching pattern executes and prints the corresponding message.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Case Statement",
          "snippet": "#!/bin/bashName=\"Sahil\"case \"$Name\" in    \"Gulfam\") echo \"Profession : Software Engineer\" ;;    \"Sujal\") echo \"Profession : Web Developer\" ;;    \"Sahil\") echo \"Profession : Technical Content Writer Linux\" ;;esac"
        }
      },
      {
        "title": "15. Input and Output in Bash",
        "content": "Input and Output (I/O) are fundamental concepts in Bash scripting. A script can accept input from users, files or other programs and produce output to the terminal or files. Understanding I/O helps in building interactive and automated scripts.\n\n- Allows user interaction with scripts\n- Enables reading data from files\n- Supports writing output to files\n- Helps handle errors properly\n- Makes scripts dynamic and flexible"
      },
      {
        "title": "16. Taking User Input",
        "content": "Bash uses the read command to accept input from the user.\n\n**Example: Reading Input and Handling Files**\n\n- **echo \"Enter filename\":** Displays a prompt\n- **read filename:** Stores user input in variable filename\n- **-e:** Checks if the file exists\n- **cat \"$filename\":** Displays file content\n- **cat > \"$filename\":** Redirects output to create/write file\n- **>:** Redirects standard output (stdout) to a file**Note: **Quotes around \"$filename\" prevent errors if the filename contains spaces.\n\n**First Execution Output (File Does Not Exist):**\n\n- File did not exist\n- else block executed\n- File was created and content was written**Note:**\n\n- When cat > \"$filename\" executes, the terminal enters input mode.\n- Type the content you want to write into the file.\n- Press Enter to move to a new line.\n- Press CTRL + D to save the file and exit input mode. The file is saved only after pressing CTRL + D.\n- Press CTRL + C to cancel without saving.\n\n**Second Execution Output (File Exists)**\n\n- File exists\n- if block executed\n- File content displayed",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 16. Taking User Input",
          "snippet": "#!/bin/bashecho \"Enter filename\"read filenameif [ -e \"$filename\" ]then    echo \"$filename exists in the directory\"    cat \"$filename\"else    cat > \"$filename\"    echo \"File created\"fi"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Bash Scripting Fundamentals",
      "initialCode": "nano hello.sh",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Bash Scripting Fundamentals",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Bash Scripting Fundamentals?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Bash Scripting Fundamentals",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Bash Scripting Fundamentals is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-bash-variables": {
    "id": "linux-bash-variables",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Defining Bash Variables and Data Types",
    "subtitle": "Complete Linux guide to Defining Bash Variables and Data Types — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Bash variables are used to store data that scripts can access and manipulate during execution. They can hold different types of values including text, numbers, command output and arrays. Variables make scripts dynamic and reusable by allowing values to change based on input or conditions, rather than being hardcoded. Without them, handling user input, storing intermediate results, or controlling script behavior would be significantly harder to manage.\n\n- No explicit type declaration required (untyped by default)\n- Scopes include local, global, environment and special variables\n- Values are referenced by prefixing the variable name with a dollar sign ($)\n- Enable dynamic behavior through parameter expansion and substitution",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Defining Bash Variables and Data Types."
        }
      },
      {
        "title": "2. Working of Bash variables",
        "content": "In Bash scripting, variables act as placeholders for data that can be accessed and modified during script execution. When a script runs, the shell handles variables in the following way:\n\n- **Read the script line by line:** Bash interprets each line sequentially.\n- **Identify defined variables:** It detects any variable names and their assigned values.\n- **Substitute values:** Variable names are replaced with their current values wherever they are used.\n- **Execute commands:** Commands are run using the substituted values.\n- **Repeat the process:** Bash continues this process until the end of the script.\n- To access a variable’s value, use the $ symbol before its name."
      },
      {
        "title": "3. Example",
        "content": "- **$myvar:** Retrieves the value stored in the variable myvar.\n- Without $, Bash would treat myvar as a literal string instead of a variable.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example",
          "snippet": "#!/bin/bashmyvar=\"Gfg\"echo $myvar"
        }
      },
      {
        "title": "4. Naming Rules for Bash Variables",
        "content": "Proper naming of variables is essential to avoid errors and ensure clarity in scripts. Bash enforces the following rules for variable names:\n\n- **Start with a letter or underscore (_):** Variables cannot begin with a number.\n- **Can include letters, numbers and underscores:** No other special characters are allowed.\n- **Case-sensitive:** gfg, Gfg and GFG are considered different variables.\n- **Avoid special characters:** Characters like @, !, *, or spaces are invalid in names."
      },
      {
        "title": "5. Examples of Valid Variable Names",
        "content": "Command examples and usage details for **Examples of Valid Variable Names**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Examples of Valid Variable Names",
          "snippet": "#!/bin/bash#Valid Variable Examplesgfg=\"Value-1\"GFG=\"Value-2\"_gfg=\"Value-3\"g_f_g=\"Value-4\"March6=\"Value-5\"echo $gfgecho $GFGecho $_gfgecho $g_f_gecho $March6"
        }
      },
      {
        "title": "6. Examples of Invalid Variable Names",
        "content": "**Output:**\n\n**Note:** Using lowercase letters for user-defined variables is recommended to avoid conflicts with system-defined variables.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Examples of Invalid Variable Names",
          "snippet": "#!/bin/bash#Invalid Variable Examples6March!gfggfg*GFg@Gfg"
        }
      },
      {
        "title": "7. Declaring and Assigning Variables",
        "content": "Creating a variable in Bash is straightforward. You simply assign a value to a name using the = sign. Bash variables do not require explicit datatype declaration, making them flexible but untyped by default."
      },
      {
        "title": "8. Basic Syntax",
        "content": "- No spaces around the = sign.\n- If the value contains spaces, enclose it in quotes (\" or ').**Correct assignment:**\n\n**Incorrect assignment (causes error):**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Basic Syntax",
          "snippet": "variableName=value"
        }
      },
      {
        "title": "9. Using declare to Define Variables",
        "content": "The declare command allows optional enforcement of variable properties such as read-only, integer, or array types.\n\n- Useful when you want to explicitly mark a variable’s purpose or data type.\n- Supports flags for integers (-i), arrays (-a) and associative arrays (-A).",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Using declare to Define Variables",
          "snippet": "declare myvar=\"geeks\""
        }
      },
      {
        "title": "10. Local and Global Variables",
        "content": "In Bash, variable scope determines where a variable can be accessed within a script. If scope is not handled properly, it may lead to unexpected behavior, especially when functions are involved."
      },
      {
        "title": "11. Global Variables",
        "content": "A global variable is defined outside any function. It is accessible throughout the script, including inside functions (unless a local variable with the same name overrides it).\n\n**Example:**\n\n- The variable myvar is defined globally.\n- It can be accessed both inside and outside the function.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Global Variables",
          "snippet": "#!/bin/bashmyvar=5   # Global variablefunction show() {    echo \"Inside function: $myvar\"}showecho \"Outside function: $myvar\""
        }
      },
      {
        "title": "12. Local Variables",
        "content": "A local variable is declared inside a function using the local keyword. It exists only during the execution of that function. Using local variable helps to prevent accidental modification of global variables.\n\n**Example:**\n\n- The local variable myvar exists only inside calc.\n- The global variable remains unchanged.\n- Once the function finishes execution, the local variable is destroyed.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Local Variables",
          "snippet": "#!/bin/bashmyvar=5   # Global variablefunction calc() {    local myvar=10   # Local variable    (( myvar = myvar * 2 ))    echo \"Inside function (local): $myvar\"}calcecho \"Outside function (global): $myvar\""
        }
      },
      {
        "title": "1. System-Defined (Environment) Variables",
        "content": "These variables are predefined and maintained by the Bash shell. They are automatically loaded whenever a new shell session starts and are generally written in uppercase letters. They store important system-related information such as user details, paths and shell configuration.\n\n- **BASH_VERSION:** Displays the current Bash version\n- **PWD:** Present Working Directory\n- **HOME:** Home directory of the current user\n- **USER:** Current logged-in user\n- **HOSTNAME:** Name of the system\n- **PATH:** Directories where executable programs are searched\n- **LANG:** System language setting**Viewing Environment Variables**\n\n**Command:**\n\nor\n\n**Output:**\n\n- These commands display all environment variables available in the current session."
      },
      {
        "title": "2. User-Defined Variables",
        "content": "These variables are created by the user inside a shell session or script.\n\n- Exist only during the session or script execution\n- Are deleted once the script finishes (unless exported)\n- Should preferably be written in lowercase to avoid conflicts with system variables**Syntax:**\n\n**Example:**\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. User-Defined Variables",
          "snippet": "variable_name=value"
        }
      },
      {
        "title": "15. Built-in Special Variables",
        "content": "Bash provides several predefined special variables that store important runtime information. These variables are automatically managed by the shell and are mainly used for scripting, debugging and handling command-line arguments."
      },
      {
        "title": "16. Common Special Variables",
        "content": "- **$$:** Process ID (PID) of the current shell\n- **$?:** Exit status of the last executed command\n- **$0:** Name of the script being executed\n- **$1 – $9:** First to ninth command-line arguments\n- **${10} – ${n}:** Tenth to nth argument\n- **$#:** Total number of arguments passed\n- **$@ or $*:** All arguments passed to the script"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Defining Bash Variables and Data Types",
      "initialCode": "#!/bin/bashmyvar=\"Gfg\"echo $myvar",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Defining Bash Variables and Data Types",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Defining Bash Variables and Data Types?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Defining Bash Variables and Data Types",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Defining Bash Variables and Data Types is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-bash-working": {
    "id": "linux-bash-working",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "18 min read",
    "level": "Advanced",
    "title": "How Bash Scripting Works Under the Hood",
    "subtitle": "Complete Linux guide to How Bash Scripting Works Under the Hood — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Bash scripting automates tasks in Linux by letting you write and execute multiple commands from a single script file. These scripts are plain text files interpreted by the Bash shell, commonly used for file management, backups, system monitoring, and configuration.\n\n- Automates repetitive command-line tasks\n- Allows execution of multiple commands in a single file\n- Can be scheduled or executed automatically\n- Works on any system that supports the Bash shell",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for How Bash Scripting Works Under the Hood."
        }
      },
      {
        "title": "2. Bash Scripting and Bash Shell",
        "content": "The Bash shell is a command-line interpreter used to interact with the Linux operating system. It reads commands entered by the user or stored in scripts and executes them sequentially. Bash is the default shell in many Linux distributions and provides important scripting capabilities.\n\n- Provides command-line access to the Linux system\n- Interprets and executes shell commands and scripts\n- Allows automation of complex administrative tasks\n- Commonly used on servers without GUI environments\n- Supports configuration through startup files"
      },
      {
        "title": "3. Example prompt for a normal user",
        "content": "Command examples and usage details for **Example prompt for a normal user**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example prompt for a normal user",
          "snippet": "[username@host ~]$"
        }
      },
      {
        "title": "4. Example prompt for the root user",
        "content": "- The behavior of the Bash shell can be customized using configuration files that run automatically when a new shell session begins.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Example prompt for the root user",
          "snippet": "[root@host ~]#"
        }
      },
      {
        "title": "5. Common startup configuration files include",
        "content": "- .bashrc\n- .bash_profile\n- Commands added to these files execute automatically whenever a new terminal session is opened, allowing users to configure environment variables, aliases, or startup scripts."
      },
      {
        "title": "6. Example of editing the .bashrc configuration file",
        "content": "Command examples and usage details for **Example of editing the .bashrc configuration file**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Example of editing the .bashrc configuration file",
          "snippet": "nano .bashrc"
        }
      },
      {
        "title": "7. Working of Bash Script",
        "content": "In Linux systems, programs stored on disk are executed as processes when they run in memory. When a command or script is executed, the operating system loads the program into RAM and allocates the required resources for its execution. Each time a Bash script is executed, the shell starts a separate process for that script. This process contains its own execution environment, including variables, memory allocation, and runtime instructions. Once the script finishes executing all commands, the process ends and the allocated resources are released by the system.\n\n- A running instance of a program in Linux is called a process\n- Each script execution creates a separate process environment\n- Memory is allocated for variables and temporary runtime data\n- Multiple instances of the same program can run simultaneously\n- Processes terminate automatically after completing execution**Note:** When a Bash script starts, the shell creates a new process to run that script. This separation ensures that variables and operations inside the script do not interfere with the current shell session."
      },
      {
        "title": "8. Identifying a Bash Script File",
        "content": "A Bash script is usually saved with the .sh extension, although the extension is optional. The first line of a script normally contains the Shebang, which tells the system which interpreter should execute the script.\n\n- Indicates the shell interpreter used for execution\n- Written at the very first line of the script file\n- Ensures the script runs using the correct shell\n- Prevents conflicts with other available shells\n- Improves script portability across systems**Example of a Bash Shebang line:**\n\n**Another valid format:**\n\n**Note:** The sequence #! is called the Shebang, and it defines the path of the shell program used to execute the script.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Identifying a Bash Script File",
          "snippet": "#!/bin/bash"
        }
      },
      {
        "title": "9. Creating and Running a Simple Bash Script",
        "content": "A Bash script can be created using any text editor available in Linux. Commands that normally run in the terminal can be written inside the script file and executed together. When the script runs, the shell reads the commands line by line and executes them in sequence.\n\n- Scripts are stored as plain text files\n- Common editors include Nano, Vim, or graphical text editors\n- Commands inside scripts run exactly like terminal commands\n- Scripts improve productivity by grouping operations\n- Execution requires either the Bash interpreter or executable permission**Create a script file using Nano:**\n\n**Example Script:**\n\n**Output:**\n\n**Running the Script:**\n\nThe script can be executed using the Bash interpreter.\n\n**Command:**\n\n- The script can also run directly if it has executable permission.**Command:**\n\n- If the file is not executable, permission can be added using**Command:**\n\n- Executable files often appear in green color when listed using the ls command, indicating that they can be executed directly from the terminal.**Output:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Creating and Running a Simple Bash Script",
          "snippet": "nano hello.sh"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: How Bash Scripting Works Under the Hood",
      "initialCode": "[username@host ~]$",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: How Bash Scripting Works Under the Hood",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of How Bash Scripting Works Under the Hood?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to How Bash Scripting Works Under the Hood",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "How Bash Scripting Works Under the Hood is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-run-bash": {
    "id": "linux-run-bash",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "14 min read",
    "level": "Advanced",
    "title": "Different Ways to Run a Bash Script in Linux",
    "subtitle": "Complete Linux guide to Different Ways to Run a Bash Script in Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Bash scripts, also called shell scripts, are programs that help automate tasks by storing a series of commands that are commonly executed together, such as system updates or backups. Instead of typing each command manually in the terminal, you can store them in a script and run them whenever needed.\n\n- Automates multiple commands in a single execution.\n- Saves time when performing repetitive system tasks.\n- Helps manage system administration and maintenance operations.\n- Can be executed using several methods in the terminal.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Different Ways to Run a Bash Script in Linux."
        }
      },
      {
        "title": "2. The Shebang Line",
        "content": "Before running a Bash script, it's important to understand the shebang line also known as hashbang or pound-bang. The shebang is the first line of a script and specifies which interpreter should be used to execute the script. Although some scripts may run without a shebang, including it is considered best practice because it ensures the script runs with the correct interpreter across different systems.\n\n**Example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. The Shebang Line",
          "snippet": "#!/bin/bash"
        }
      },
      {
        "title": "3. Structure of the Shebang Line",
        "content": "- **#! :** Indicates the start of the shebang line.\n- **/path/to/interpreter:** The full path to the interpreter that will execute the script, such as /bin/bash or /usr/bin/env python3.\n- **[optional-arguments]:** Optional flags or arguments passed to the interpreter.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Structure of the Shebang Line",
          "snippet": "#! /path/to/interpreter [optional-arguments]"
        }
      },
      {
        "title": "4. Method 1: Running a Script Using the bash Command",
        "content": "The most common way to run a Bash script is by explicitly calling the Bash interpreter and passing the script file as an argument.\n\n**Syntax:**\n\n- **bash:** The Bash interpreter used to execute the script.\n- **filename.sh:** The name of the Bash script file.**Example:**\n\n**Output:**\n\nUsing the bash command to run the script.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Method 1: Running a Script Using the bash Command",
          "snippet": "bash filename.sh"
        }
      },
      {
        "title": "5. Method 2: Running a Script Using the sh Command",
        "content": "The sh command runs the script using the system's default shell interpreter. In many Linux systems, sh is linked to Bash, but it may behave differently depending on the system configuration.\n\n**Syntax:**\n\n- **sh:** Refers to the system’s default shell interpreter.\n- **filename.sh:** The Bash script file to execute.**Example:**\n\n**Output:**\n\nUsing the sh command to run the bash script.**Running Scripts from Another Directory:**\n\nIf the script is located in a different directory, you must provide the relative or absolute path to the script.\n\n**Example:**\n\nor",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Method 2: Running a Script Using the sh Command",
          "snippet": "sh filename.sh"
        }
      },
      {
        "title": "6. Method 3: Running a Script Using the source Command",
        "content": "The source command is another way to execute a Bash script. This method runs the script within the current shell environment instead of starting a new shell.\n\n**Syntax:**\n\n- **source:** Executes the script in the current shell session.\n- **filename.sh:** The script file to be executed.**Example:**\n\n**Output:**\n\nUsing Source to run a bash script**Note:** When a script is sourced, all commands inside the script run in the current shell environment. This means any variables or environment changes made by the script will remain active after the script finishes executing.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Method 3: Running a Script Using the source Command",
          "snippet": "source filename.sh"
        }
      },
      {
        "title": "7. Method 4: Making a Script Executable Using chmod",
        "content": "This method allows you to run a Bash script as an executable instead of explicitly passing it to the bash command. To do this, you change the file’s permissions using the chmod command. Once the execute permission is added, the script can be run directly from the terminal.\n\n**Step 1: Give Execute Permission**\n\nNavigate to the directory where your script is located and run:\n\n**Command:**\n\n- **chmod:** Command used to change file permissions.\n- **+x:** Adds execute permission to the file.\n- **filename.sh:** The script file.**Note:** If you do not have sufficient permissions, you may need to run the command with sudo.\n\n**Step 2: Run the Script**\n\nAfter you've granted execution permission, you can run the script, assuming you are in the same directory as the script\n\n**Syntax:**\n\n- **./:** Refers to the current directory.\n- **filename.sh:** The executable Bash script.**Command:**\n\n**Output:**\n\n**Running Executable Scripts from Another Directory:**\n\nIf you are not on the same path as the bash script, make sure you provide the relative path to the file or the bash script.\n\n**Syntax:**\n\n**Example:**\n\n**Output:**\n\nExecuting a script from a relative path.Comment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Method 4: Making a Script Executable Using chmod",
          "snippet": "chmod +x filename.sh"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Different Ways to Run a Bash Script in Linux",
      "initialCode": "#!/bin/bash",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Different Ways to Run a Bash Script in Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Different Ways to Run a Bash Script in Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Different Ways to Run a Bash Script in Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Different Ways to Run a Bash Script in Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-bash-functions": {
    "id": "linux-bash-functions",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "24 min read",
    "level": "Advanced",
    "title": "Functions, Arguments & Return Values in Bash",
    "subtitle": "Complete Linux guide to Functions, Arguments & Return Values in Bash — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A Bash script is a plain text file that contains a sequence of commands executed step by step. Instead of repeatedly typing multiple commands in the terminal, they can be stored in a script and executed whenever required.\n\n- Functions allow commands to be grouped into reusable blocks.\n- They help improve script modularity and readability.\n- Functions can accept arguments to process different inputs.\n- Bash functions can return status values to indicate execution results.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Functions, Arguments & Return Values in Bash."
        }
      },
      {
        "title": "2. Example: Simple Function in Bash",
        "content": "- **myFunction():** Defines a function named myFunction.\n- The commands inside { } form the body of the function.\n- Calling myFunction executes the commands inside the function.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Simple Function in Bash",
          "snippet": "#!/bin/bash# It is a functionmyFunction() {    echo Hello World from GeeksforGeeks}# Function callmyFunction"
        }
      },
      {
        "title": "3. Syntax of a Bash Function",
        "content": "- **function_name():** Name of the function being defined.\n- **{ }:** Curly braces contain the commands executed by the function.\n- **commands:** The operations or instructions the function performs.\n- **function_name:** Calling the function executes its commands.**Note:** A function must be defined before it is called in a Bash script.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax of a Bash Function",
          "snippet": "# Function definitionfunction_name(){    commands    ...}# Function callfunction_name"
        }
      },
      {
        "title": "4. Functions with Passing Arguments",
        "content": "Bash functions can accept arguments (parameters) when they are called. These arguments allow the function to work with different inputs each time it is executed. In Bash scripting, arguments passed to functions are accessed using positional parameters such as $1, $2, $3 and so on."
      },
      {
        "title": "5. Syntax of Functions with Passing Arguments",
        "content": "- **$1:** First argument\n- **$2:** Second argument\n- **$n:** nth argument**Example: Function with Arguments**\n\n- **add_two_num():** Defines a function to add two numbers.\n- **$1 and $2:** Represent the numbers passed to the function.\n- **$(($1 + $2)):** Performs arithmetic addition.\n- **local sum:** Stores the result inside the function.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Syntax of Functions with Passing Arguments",
          "snippet": "# Function definitionfunction_name(){    parameter_1=$1    parameter_2=$2    ...    parameter_n=$n    commands}# Function callfunction_name p1 p2 ... pn"
        }
      },
      {
        "title": "6. Functions with Return Values",
        "content": "A function can return a value after completing its execution. In Bash scripting, the return value is stored in a special variable called $?, which represents the exit status of the most recently executed command. Return values are often used to indicate whether a function executed successfully or to return a small numeric result."
      },
      {
        "title": "7. Example: Function with Return Value",
        "content": "- **return 7:** Sends the value 7 back to the calling script.\n- **$?:** Stores the returned value from the last executed function.**Note:** Bash return only supports integer values between 0 and 255. Attempting to return a string or a number outside this range will produce unexpected results.\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Example: Function with Return Value",
          "snippet": "#!/bin/bashmyfun(){    return 7}myfunecho The return value is $?"
        }
      },
      {
        "title": "8. Example: Function with Parameters and Return Value",
        "content": "**Output:**\n\n- The function receives 2 and 3 as arguments.\n- The numbers are added using arithmetic expansion.\n- The result is returned and accessed using $?. **Note:** In Bash, return does not return arbitrary values like in other programming languages. It only sets the function’s exit status, which is limited to the range 0–255.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Example: Function with Parameters and Return Value",
          "snippet": "#!/bin/bashadd_two_num(){    return $(($1 + $2))}add_two_num 2 3echo The sum is $?"
        }
      },
      {
        "title": "9. Variable Scope",
        "content": "In programming, scope refers to the region of a program where a variable is accessible. In Bash scripting, variables behave slightly differently compared to many programming languages. By default, variables defined inside or outside a function are global unless explicitly declared as local.\n\n- Variables declared outside functions are global.\n- Variables inside functions are also global unless declared local.\n- The local keyword creates variables that exist only inside a function.\n- Using local variables prevents accidental modification of global variables."
      },
      {
        "title": "10. Example: Variable Scope in Bash",
        "content": "- **var1:** is a global variable, accessible everywhere.\n- **var2:** is declared using local, so it is only accessible inside the function.\n- **var3:** is declared inside the function but without local, so it becomes a global variable.**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Example: Variable Scope in Bash",
          "snippet": "#!/bin/bashvar1=\"Apple\"   # global variablemyfun(){    local var2=\"Banana\"   # local variable    var3=\"Cherry\"         # global variable    echo \"The name of first fruit is $var1\"    echo \"The name of second fruit is $var2\"}myfunecho \"The name of first fruit is $var1\"echo \"The name of second fruit is $var2\"echo \"The name of third fruit is $var3\""
        }
      },
      {
        "title": "11. Overriding Commands",
        "content": "Bash allows defining functions with the same name as existing commands. When this happens, the function overrides the original command behavior. This technique is useful when customizing command behavior or applying predefined options automatically."
      },
      {
        "title": "12. Example: Overriding the echo Command",
        "content": "- A function named echo() overrides the default echo command.\n- builtin echo ensures the original echo command is still used internally.\n- The function automatically adds \"The name is :\" before the provided text.**Output:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Example: Overriding the echo Command",
          "snippet": "#!/bin/bash#overriding commandecho(){    builtin echo \"The name is : $1\"}echo \"Satyajit Ghosh\""
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Functions, Arguments & Return Values in Bash",
      "initialCode": "#!/bin/bash# It is a functionmyFunction() {    echo Hello World from GeeksforGeeks}# Function callmyFunction",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Functions, Arguments & Return Values in Bash",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Functions, Arguments & Return Values in Bash?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Functions, Arguments & Return Values in Bash",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Functions, Arguments & Return Values in Bash is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-sh-vs-bash": {
    "id": "linux-sh-vs-bash",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "16 min read",
    "level": "Advanced",
    "title": "Difference Between sh (Bourne Shell) and Bash",
    "subtitle": "Complete Linux guide to Difference Between sh (Bourne Shell) and Bash — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In Linux and Unix-like systems, sh and bash are command-line shells used to execute commands and run scripts. A shell acts as an interface between the user and the operating system, allowing users to interact with the system through commands. sh was developed by Stephen R. Bourne, while bash was later developed by Brian Fox as an enhanced replacement.\n\n- sh is the original Bourne Shell and follows POSIX standards.\n- bash (Bourne Again Shell) is an extended version of sh with more features.\n- sh focuses on portability and minimalism.\n- bash provides advanced scripting and interactive capabilities.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Difference Between sh (Bourne Shell) and Bash."
        }
      },
      {
        "title": "2. Shell",
        "content": "A shell is a command-line interface that acts as an intermediary between the user and the operating system. It interprets textual input and executes commands, enabling interaction with system resources and processes. Different shell flavors include sh, bash, ksh, csh, and zsh, each offering unique features while maintaining core command-line functionality.\n\n- **Command Execution:** Runs system commands and programs.\n- **Script Execution:** Interprets and runs shell scripts.\n- **Process and File Management:** Handles file operations and process control.\n- **Automation:** Facilitates repetitive tasks through scripting."
      },
      {
        "title": "3. sh (Bourne Shell)",
        "content": "sh is the original Bourne Shell, developed by Stephen R. Bourne. It is defined by the POSIX standard and serves as a specification for shell behavior, making it highly portable across Unix and Unix-like systems. Most modern implementations of /bin/sh are symbolic links to shells like dash, ksh, or the original Bourne shell.\n\n- Predecessor of bash\n- POSIX-compliant and highly portable\n- Commonly implemented as /bin/sh linked to dash, ksh, or Bourne shell\n- Scripts written for sh are generally compatible with bash due to backward compatibility**Shebang Example:**\n\n**Notes:** Specifies that the script should run using the sh interpreter.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. sh (Bourne Shell)",
          "snippet": "#!/bin/sh"
        }
      },
      {
        "title": "4. bash (Bourne Again Shell)",
        "content": "bash is an enhanced version of sh, developed by Brian Fox as part of the GNU Project. It is the default shell on most Linux distributions and provides extended scripting capabilities, interactive features, and better usability compared to sh.\n\n- Successor and superset of sh\n- Includes advanced scripting features and interactive capabilities\n- Supports job control, command history, aliases, arrays, and extended test conditions\n- Scripts written for sh usually run on bash without modification**Shebang Example:**\n\n**Notes:** Specifies that the script should run using the bash interpreter.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. bash (Bourne Again Shell)",
          "snippet": "#!/bin/bash"
        }
      },
      {
        "title": "5. Difference between sh and bash",
        "content": "The table highlights the key differences between bash (Bourne Again SHell) and sh (Bourne Shell), comparing their features, functionality, portability, and scripting capabilities.\n\nBashshBourne Again SHellSHellDeveloped by Brian FoxDeveloped by Stephen R. BourneSuccessor of shPredecessor of bashDefault shellNot the default shellShebang: #!/bin/bashShebang: #!/bin/shMore functionality with upgradesLess functionalitySupports job controlDoes not support job controlNot a valid POSIX shellValid POSIX shellEasy to useNot as easy as BashLess portableMore portableExtended version of languageOriginal languageBash scripting (specific to Bash)Shell scripting (any shell)Supports command historyDoes not support command history\n- SH is lightweight and highly portable, whereas Bash is feature rich and suitable for complex scripts.\n- SH focuses on compatibility across systems, while Bash allows advanced features such as arrays, aliases, and interactive commands.\n- Bash provides job control, command history, and enhanced string and file manipulation, which SH does not support."
      },
      {
        "title": "1. Portable Scripts Across Unix Systems",
        "content": "sh is ideal for scripts that must run on multiple Unix/Linux systems without modification.\n\n**Script:**\n\n- Ensures compatibility with minimal Unix environments\n- Useful for system initialization scripts or installer scripts",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Portable Scripts Across Unix Systems",
          "snippet": "#!/bin/shecho \"Running a portable shell script\""
        }
      },
      {
        "title": "2. Advanced Automation and Interactive Tasks",
        "content": "bash is preferred when scripts require advanced features such as arrays, command history, or job control.\n\n**Script:**\n\n- Automates repetitive tasks efficiently\n- Ideal for Linux system administration, DevOps scripts, and cron jobs",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Advanced Automation and Interactive Tasks",
          "snippet": "#!/bin/bashfor i in {1..5}; do  echo \"Task $i completed\"done"
        }
      },
      {
        "title": "3. System Administration and User Environments",
        "content": "Most Linux distributions use bash as the default login shell:\n\n- Interactive command-line sessions with history and tab completion\n- Running complex scripts for backups, monitoring, and user management\n- Facilitates easier debugging and developmentComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Difference Between sh (Bourne Shell) and Bash",
      "initialCode": "#!/bin/bash",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Difference Between sh (Bourne Shell) and Bash",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Difference Between sh (Bourne Shell) and Bash?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Difference Between sh (Bourne Shell) and Bash",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Difference Between sh (Bourne Shell) and Bash is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-shell-operators": {
    "id": "linux-shell-operators",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "Arithmetic, Relational, Boolean & File Test Operators",
    "subtitle": "Complete Linux guide to Arithmetic, Relational, Boolean & File Test Operators — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In shell scripting, operators are special symbols used to perform operations on variables and values. They allow scripts to perform calculations, compare values, evaluate logical conditions, and test file properties. Bash provides several types of operators that help automate tasks and make scripts more powerful and flexible.\n\n- Perform arithmetic calculations and logical comparisons.\n- Evaluate file properties for automated scripts.\n- Enable bitwise and boolean operations in scripts.\n- Simplify decision-making and control flow in shell programs.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Arithmetic, Relational, Boolean & File Test Operators."
        }
      },
      {
        "title": "1. Arithmetic Operators",
        "content": "Arithmetic operators are used to perform mathematical calculations in shell scripts. These operations include addition, subtraction, multiplication, division, and more.\n\n- **Addition (+):** Adds two operands.\n- **Subtraction (-):** Subtracts second operand from first.\n- **Multiplication (*):** Multiplies two operands.\n- **Division (/):** Divides first operand by second.\n- **Modulus (%):** Returns remainder of division of first operand by second.\n- **Increment (++):** Increases operand value by 1 (unary operator).\n- **Decrement (--):** Decreases operand value by 1 (unary operator)."
      },
      {
        "title": "3. Example: Arithmetic Operators in Bash",
        "content": "This example demonstrates basic arithmetic operations in Bash using user input. It covers addition, subtraction, multiplication, division, modulus, and shows how to use increment and decrement operators.\n\nC\n\n`\n`\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Example: Arithmetic Operators in Bash",
          "snippet": "//Driver Code Starts\n#!/bin/bash\n# This script demonstrates arithmetic operations in Bash using user input\n\n//Driver Code Ends\n\n# Reading two numbers from the user\nread -r -p \"Enter a: \" a\n# -r prevents backslash escapes from being interpreted\n# -p displays a prompt message\n\nread -r -p \"Enter b: \" b\n\n# Addition\nadd=$((a + b))\n# $(( )) is used for arithmetic evaluation\n# The result of a + b is stored in variable 'add'\necho \"Addition of a and b is: ${add}\"\n\n# Subtraction\nsub=$((a - b))\necho \"Subtraction of a and b is: ${sub}\"\n\n# Multiplication\nmul=$((a * b))\necho \"Multiplication of a and b is: ${mul}\"\n\n# Division\ndiv=$((a / b))\necho \"Division of a and b is: ${div}\"\n\n//Driver Code Starts\n\n# Modulus (remainder)\nmod=$((a % b))\necho \"Modulus of a and b is: ${mod}\"\n\n# Increment operator\n((++a))\n# Increments value of 'a' by 1\necho \"Increment operator applied on a results in: ${a}\"\n\n# Decrement operator\n((--b))\n# Decrements value of 'b' by 1\necho \"Decrement operator applied on b results in: ${b}\"\n//Driver Code Ends"
        }
      },
      {
        "title": "2. Relational Operators",
        "content": "Relational operators in Bash are used to compare two numeric values. They return true (1) if the condition is satisfied or false (0) if it is not. These operators are commonly used in if statements and loops to make decisions based on numeric comparisons.\n\n- **'==' Operator**: Double equal to operator compares the two operands. Its returns true is they are equal otherwise returns false.\n- **'!=' Operator**: Not Equal to operator return true if the two operands are not equal otherwise it returns false.\n- **'<' Operator**: Less than operator returns true if first operand is less than second operand otherwise returns false.\n- **'<=' Operator**: Less than or equal to operator returns true if first operand is less than or equal to second operand otherwise returns false\n- **'>' Operator**: Greater than operator return true if the first operand is greater than the second operand otherwise return false.\n- **'>=' Operator**: Greater than or equal to operator returns true if first operand is greater than or equal to second operand otherwise returns false"
      },
      {
        "title": "5. Example: Relational Operators in Bash",
        "content": "This example demonstrates how to compare two numbers using relational operators and print the results.\n\nC\n\n`\n`\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Example: Relational Operators in Bash",
          "snippet": "//Driver Code Starts\n#!/bin/bash\n# Script to demonstrate relational operators\n\n# Reading two numbers from the user\nread -r -p \"Enter a: \" a\nread -r -p \"Enter b: \" b\n//Driver Code Ends\n\n\n# Check if a is equal to b\nif (( a == b )); then\n    echo \"a is equal to b\"\nelse\n    echo \"a is not equal to b\"\nfi\n\n# Check if a is not equal to b\nif (( a != b )); then\n    echo \"a is not equal to b\"\nelse\n    echo \"a is equal to b\"\nfi\n\n# Check if a is less than b\nif (( a < b )); then\n    echo \"a is less than b\"\nelse\n    echo \"a is not less than b\"\nfi\n\n# Check if a is less than or equal to b\nif (( a <= b )); then\n    echo \"a is less than or equal to b\"\nelse\n    echo \"a is not less than or equal to b\"\nfi\n\n# Check if a is greater than b\nif (( a > b )); then\n    echo \"a is greater than b\"\nelse\n    echo \"a is not greater than b\"\nfi\n\n# Check if a is greater than or equal to b\nif (( a >= b )); then\n    echo \"a is greater than or equal to b\"\nelse\n    echo \"a is not greater than or equal to b\"\n\n//Driver Code Starts\nfi\n//Driver Code Ends"
        }
      },
      {
        "title": "3. Logical (Boolean) Operators",
        "content": "Logical operators (also called Boolean operators) are used to combine or invert conditions in shell scripting. They are essential for making decisions based on multiple conditions in if statements or loops.\n\n- **(&&) Logical AND **: Returns true if both conditions are true.\n- **(||) Logical OR **: Returns true if either one or both conditions are true. It returns false only if both operands are false.\n- **(!) Logical NOT**: Inverts the truth value; returns true if the condition is false, and false if the condition is true.**Note:** Logical operators are usually used with (( )) for numeric expressions or [[ ]] for conditional tests."
      },
      {
        "title": "7. Example: Logical Operators in Bash",
        "content": "This example demonstrates AND, OR, and NOT operations using numeric comparisons.\n\nC\n\n`\n`\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Example: Logical Operators in Bash",
          "snippet": "//Driver Code Starts\n#!/bin/bash\n\n# reading data from the user\nread -p \"Enter a (true/false): \" a\nread -p \"Enter b (true/false): \" b\n\n//Driver Code Ends\n\n# Both true\nif [[ \"$a\" == \"true\" && \"$b\" == \"true\" ]]; then\n    echo \"Both are true.\"\nelse\n    echo \"Both are not true.\"\nfi\n\n# At least one true\nif [[ \"$a\" == \"true\" || \"$b\" == \"true\" ]]; then\n    echo \"At least one of them is true.\"\nelse\n    echo \"None of them is true.\"\nfi\n\n# a is false\nif [[ \"$a\" != \"true\" ]]; then\n    echo \"a was initially false.\"\nelse\n    echo \"a was initially true.\"\nfi"
        }
      },
      {
        "title": "4. Bitwise Operators",
        "content": "Bitwise operators perform operations directly on binary representations (bits) of numbers. These are mainly used in low-level programming or performance-sensitive tasks.\n\n- **(&) Bitwise AND**: Performs AND on each bit of two numbers.\n- **(|) Bitwise OR**: Performs OR on each bit of two numbers.\n- **(^) Bitwise XOR**: Performs XOR on each bit; result is 1 if bits are different.\n- **(~) Bitwise NOT**: Inverts all bits of a number.\n- **(<<) Left Shift**: Shifts bits of the first operand to the left by the number of positions specified by the second operand.\n- **(>>) Right Shift**: Shifts bits of the first operand to the right by the number of positions specified by the second operand."
      },
      {
        "title": "9. Example: Bitwise Operators in Bash",
        "content": "This example demonstrates all basic bitwise operations using two numeric inputs.\n\nC\n\n`\n`\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Example: Bitwise Operators in Bash",
          "snippet": "//Driver Code Starts\n#!/bin/bash\n# Script to demonstrate bitwise operators\n\n# Reading two numbers from the user\nread -r -p \"Enter a: \" a\nread -r -p \"Enter b: \" b\n//Driver Code Ends\n\n\n# Bitwise AND\nand=$((a & b))\necho \"Bitwise AND of a and b: $and\"\n\n# Bitwise OR\nor=$((a | b))\necho \"Bitwise OR of a and b: $or\"\n\n# Bitwise XOR\nxor=$((a ^ b))\necho \"Bitwise XOR of a and b: $xor\"\n\n# Bitwise NOT (on a)\nnot_a=$((~a))\necho \"Bitwise NOT of a: $not_a\"\n\n//Driver Code Starts\n\n# Left Shift a by 1\nleft_shift=$((a << 1))\necho \"Left shift a by 1: $left_shift\"\n\n# Right Shift a by 1\nright_shift=$((a >> 1))\necho \"Right shift a by 1: $right_shift\"\n//Driver Code Ends"
        }
      },
      {
        "title": "5. File Test Operators",
        "content": "File test operators in Bash are used to check properties of files and directories. They return true (0) if the condition is satisfied, or false (1) if not. These operators are commonly used in scripts to verify file existence, permissions, or types before performing operations.\n\n- **-b:** Checks whether a file is a block special file (used for block-based devices like disks). Returns true if it is, otherwise false.\n- **-c:** Checks whether a file is a character special file (used for character-based devices like terminals). Returns true if it is, otherwise false.\n- **-d:** Checks whether a given path is an existing directory. Returns true if the directory exists, otherwise false.\n- **-e:** Checks whether a file or directory exists at the specified path. Returns true if found, otherwise false.\n- **-r:** Checks whether the file has read permission for the current user. Returns true if readable, otherwise false.\n- **-w:** Checks whether the file has write permission for the current user. Returns true if writable, otherwise false.\n- **-x:** Checks whether the file has execute permission for the current user. Returns true if executable, otherwise false.\n- **-s:** Checks whether a file exists and has a size greater than zero (i.e., it is not empty)."
      },
      {
        "title": "11. Example: File Test Operators in Bash",
        "content": "This example demonstrates checking various file properties using different file test operators.\n\nC\n\n`\n`\n**Output:**\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Example: File Test Operators in Bash",
          "snippet": "//Driver Code Starts\n#!/bin/bash\n# Script to demonstrate file test operators\n\n//Driver Code Ends\n\n# Reading file/directory name from user\nread -r -p \"Enter file or directory name: \" file\n\n# Check if it is a block special file\nif [ -b \"$file\" ]; then\n    echo \"$file is a block special file\"\nelse\n    echo \"$file is not a block special file\"\nfi\n\n# Check if it is a character special file\nif [ -c \"$file\" ]; then\n    echo \"$file is a character special file\"\nelse\n    echo \"$file is not a character special file\"\nfi\n\n# Check if it is a directory\nif [ -d \"$file\" ]; then\n    echo \"$file is a directory\"\nelse\n    echo \"$file is not a directory\"\nfi\n\n# Check if file exists\nif [ -e \"$file\" ]; then\n    echo \"$file exists\"\nelse\n    echo \"$file does not exist\"\nfi\n\n# Check read permission\nif [ -r \"$file\" ]; then\n    echo \"$file has read permission\"\nelse\n    echo \"$file does not have read permission\"\n\n//Driver Code Starts\nfi\n\n# Check write permission\nif [ -w \"$file\" ]; then\n    echo \"$file has write permission\"\nelse\n    echo \"$file does not have write permission\"\nfi\n\n# Check execute permission\nif [ -x \"$file\" ]; then\n    echo \"$file has execute permission\"\nelse\n    echo \"$file does not have execute per"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Arithmetic, Relational, Boolean & File Test Operators",
      "initialCode": "//Driver Code Starts\n#!/bin/bash\n# This script demonstrates arithmetic operations in Bash using user input\n\n//Driver Code Ends\n\n# Reading two numbers from the user\nread -r -p \"Enter a: \" a\n# -r prevents backslash escapes from being interpreted\n# -p displays a prompt message\n\nread -r -p \"Enter b: \" b\n\n# Addition\nadd=$((a + b))\n# $(( )) is used for arithmetic evaluation\n# The result of a + b is stored in variable 'add'\necho \"Addition of a and b is: ${add}\"\n\n# Subtraction\nsub=$((a - b))\necho \"Subtraction of a and b is: ${sub}\"\n\n# Multiplication\nmul=$((a * b))\necho \"Multiplication of a and b is: ${mul}\"\n\n# Division\ndiv=$((a / b))\necho \"Division of a and b is: ${div}\"\n\n//Driver Code Starts\n\n# Modulus (remainder)\nmod=$((a % b))\necho \"Modulus of a and b is: ${mod}\"\n\n# Increment operator\n((++a))\n# Increments value of 'a' by 1\necho \"Increment operator applied on a results in: ${a}\"\n\n# Decrement operator\n((--b))\n# Decrements value of 'b' by 1\necho \"Decrement operator applied on b results in: ${b",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Arithmetic, Relational, Boolean & File Test Operators",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Arithmetic, Relational, Boolean & File Test Operators?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Arithmetic, Relational, Boolean & File Test Operators",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Arithmetic, Relational, Boolean & File Test Operators is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-custom-shell-c": {
    "id": "linux-custom-shell-c",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Making Your Own Linux Shell in C (fork, execvp, wait)",
    "subtitle": "Complete Linux guide to Making Your Own Linux Shell in C (fork, execvp, wait) — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A shell acts as an interface between the user and the operating system, translating user commands into actions the system can perform. Tools like Bash do much more than just run commands, they manage processes, handle input/output redirection and support advanced features like piping. To better understand these internals, we’ll build a minimal Linux shell in C, focusing on how commands are interpreted and executed at a low level.\n\n- Parses raw user input into commands and arguments\n- Differentiates between built-in functions and external programs\n- Uses system calls like fork(), exec() and wait() for process control\n- Implements inter-process communication through pipes (|)\n- Integrates command history and line editing via GNU Readline",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Making Your Own Linux Shell in C (fork, execvp, wait)."
        }
      },
      {
        "title": "2. Working of Shell (Step-by-Step)",
        "content": "When a user enters a command, the shell performs the following operations:"
      },
      {
        "title": "1. Input Handling",
        "content": "- The shell first reads the user’s input using functions like readline().\n- If the input is not empty, it is stored in the command history so it can be reused later (e.g., using arrow keys)."
      },
      {
        "title": "2. Parsing",
        "content": "- The entered command is broken into smaller components called tokens.\n- This helps the shell understand the command and its arguments.\n- **Example:** ls -l becomes [\"ls\", \"-l\"]."
      },
      {
        "title": "3. Pipe Detection",
        "content": "- The shell checks whether the command contains a pipe (|).\n- If a pipe is found, the command is split into multiple parts so that the output of one command can be passed as input to another."
      },
      {
        "title": "4. Built-in Command Check",
        "content": "- The shell checks if the command is a built-in function like cd, exit or echo.\n- If it matches a built-in command, it is executed directly by the shell without creating a new process."
      },
      {
        "title": "5. Execution",
        "content": "- If it is not a built-in command, the shell creates a new child process using fork().\n- The child process replaces itself with the required program using execvp(), which runs the actual command."
      },
      {
        "title": "6. Waiting",
        "content": "- The parent process waits for the child process to complete using wait().\n- This ensures the shell does not move to the next command until the current one finishes execution."
      },
      {
        "title": "7. Loop Continuation",
        "content": "- After the command execution finishes, the shell refreshes the interface by displaying the current working directory and showing the prompt again."
      },
      {
        "title": "8. Ready for Next Command",
        "content": "- The shell returns to an idle state, waiting for the user to enter the next command and the cycle repeats continuously."
      },
      {
        "title": "1. Installing Required Library",
        "content": "To enable input handling features like command history and line editing, install the GNU Readline library:\n\n**Command:**\n\n**Note:** Enter your system password when prompted and confirm the installation by pressing y.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Installing Required Library",
          "snippet": "sudo apt-get install libreadline-dev"
        }
      },
      {
        "title": "2. Displaying System Information",
        "content": "- The current working directory is displayed using getcwd().\n- The username of the logged-in user is retrieved using getenv(\"USER\")."
      },
      {
        "title": "3. Input Parsing",
        "content": "User input is processed using strsep(), which splits the command into tokens based on spaces. Empty tokens are ignored to avoid storing unnecessary spaces and ensure clean parsing."
      },
      {
        "title": "4. Built-in Command Handling",
        "content": "- Built-in commands are stored in an array of strings.\n- Each input command is compared using strcmp().\n- If a match is found, the shell executes it internally.**Special Case:**\n\n- The cd command cannot be executed using execvp().\n- It is handled separately using the chdir() system call."
      },
      {
        "title": "5. Executing System Commands",
        "content": "If the command is not built-in:\n\n- A child process is created using fork().\n- The command is executed using execvp() inside the child process.\n- The parent process waits for completion using wait() before continuing."
      },
      {
        "title": "6. Pipe Handling",
        "content": "Pipes (|) are detected using strsep(\"|\"), which splits the command into two parts:\n\n- Left side command\n- Right side commandEach part is parsed separately and executed using two different child processes. A pipe allows the output of the first command to become the input of the second command."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Making Your Own Linux Shell in C (fork, execvp, wait)",
      "initialCode": "sudo apt-get install libreadline-dev",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Making Your Own Linux Shell in C (fork, execvp, wait)",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Making Your Own Linux Shell in C (fork, execvp, wait)?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Making Your Own Linux Shell in C (fork, execvp, wait)",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Making Your Own Linux Shell in C (fork, execvp, wait) is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-script-examples": {
    "id": "linux-script-examples",
    "badge": "Module 10 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Practical Linux Shell Script Examples",
    "subtitle": "Complete Linux guide to Practical Linux Shell Script Examples — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Shell scripting in Linux allows users to automate tasks by writing a sequence of commands in a script file. It helps reduce manual effort, improve efficiency and ensure consistency in repetitive operations. Scripts can handle file management, system monitoring and process automation with minimal user interaction. This makes shell scripting an essential skill for system administrators, developers and anyone working with Linux environments.\n\n- Executes commands in a defined sequence, ensuring consistent results\n- Allows interaction with users through input and output\n- Supports scripting for file handling, process control and text processing\n- Enables use of command-line arguments for dynamic script behavior\n- Provides built-in support for functions to organize and reuse code",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Practical Linux Shell Script Examples."
        }
      },
      {
        "title": "2. Basic Concepts of Shell Scripting",
        "content": "Shell scripts are plain text files containing a series of commands executed by a shell interpreter such as Bash. Each script follows a structured format, starting with the interpreter declaration and followed by executable commands. Understanding these foundational elements is important before moving to practical examples.\n\n- **Shebang (#!):** Specifies which interpreter should execute the script\n- **Commands:** Standard Linux commands written in sequence\n- **Variables:** Used to store and reuse values\n- **Input/Output:** Handled using commands like read and echo\n- **Execution Permission:** Required to run scripts directly"
      },
      {
        "title": "1. Shebang (#!) in Shell Script",
        "content": "The shebang (#!) defines the interpreter that will execute the script. Without it, the system may not know which shell to use, leading to unexpected behavior.\n\n**Example:**\n\n- **#!/bin/bash**: Instructs the system to use the Bash shell. Ensures consistent execution regardless of user’s default shell\n- **echo:** Prints output to the terminal**Output:**\n\nScript of shebang exampleOutput of script",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Shebang (#!) in Shell Script",
          "snippet": "#!/bin/bashecho \"Hello World\""
        }
      },
      {
        "title": "2. Running a Shell Script",
        "content": "A script must have executable permissions before it can be run directly. Without execute permission, the script will fail with a permission error\n\n**Example:**\n\n- **chmod +x:** Grants execute permission\n- **./:** Runs the script from the current directory**Note:** Replace \"myscript.sh\" with your script name.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Running a Shell Script",
          "snippet": "chmod +x myscript.sh./myscript.sh"
        }
      },
      {
        "title": "3. Printing Output Using echo",
        "content": "The echo command is used to display text or variable values on the terminal.\n\n**Script:**\n\n- **#!/bin/bash:** Ensures the script runs using the Bash interpreter\n- **echo:** Prints the given string to standard output**Output:**\n\nmyscript.sh",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Printing Output Using echo",
          "snippet": "vim myscript.sh"
        }
      },
      {
        "title": "4. Explain the purpose of the echo command in shell scripting.",
        "content": "The echo command is used to display text or variables on the terminal. It is commonly used for printing messages, variable values and generating program output.\n\n**Output:**\n\necho GFG"
      },
      {
        "title": "5. Variables in Shell Scripting",
        "content": "Variables are used to store data such as strings, numbers or command outputs. They allow reuse of values throughout the script without repeating them. In shell scripting, variables do not require explicit data type declaration.\n\n**Example:**\n\n- **name=\"Sam\":** Stores a string value in a variable\n- **age=24:** Stores a numeric value in a variable\n- **$name, $age:** Used to access stored values\n- No spaces are allowed around = during assignment**Output:**\n\nVariables in script",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Variables in Shell Scripting",
          "snippet": "#!/bin/bash# Assigning a value to a variablename=\"Sam\"age=24echo $nameecho $age"
        }
      },
      {
        "title": "6. Taking User Input Using read",
        "content": "The read command is used to accept input from the user during script execution. The entered value is stored in a variable and can be used later in the script.\n\n**Example:** Shell script that takes a user name as input and greets the user.\n\n- **read name:** Takes input from the user and stores it in the variable name.\n- **$name:** Retrieves the value stored in the variable and prints it on the screen.\n- **echo:** Used to display messages to the user.**Output:**\n\nUser Input Using read command",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Taking User Input Using read",
          "snippet": "#!/bin/bash# Prompt the user to enter their nameecho \"Enter your name:\"# Read user input and store it in the variable 'name'read name# Display a greeting message using the stored inputecho \"Hello, $name! Nice to meet you.\""
        }
      },
      {
        "title": "8. Conditional Statements (if-else)",
        "content": "Conditional statements in Bash are used to execute different blocks of code depending on whether a given condition evaluates to true or false. They are essential for controlling the flow of a script and making decisions based on input or variable values.\n\n**Example 1.** Shell script that checks whether a number is greater than 5\n\n- **num=10:** Assigns the value 10 to the variable num.\n- **if [ $num -gt 5 ]:** Checks whether the value stored in num is greater than 5. (-gt means greater than)\n- **then:** Starts the block of code that runs if the condition is true.\n- **else:** Runs the block of code if the condition is false.\n- **fi:** Marks the end of the if-else statement.**Output:**\n\nChecks whether a number is greater than 5**\n\nExample 2.** Shell script that checks if a file exists in the current directory.\n\nThis script checks whether a file named example.txt exists in the current directory and prints a message accordingly.\n\n- **file=\"example.txt\":** Stores the file name in a variable\n- **if [ -e \"$file\" ]; then:** Checks whether the file exists. The -e flag returns true if the file (or directory) exists.\n- **else:** Runs if the condition is false\n- **fi:** Ends the if-else block**Output:**\n\nChecks if a file exists in the current directory",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Conditional Statements (if-else)",
          "snippet": "#!/bin/bash# Assign a value to the variable 'num'num=10# Check if the value of num is greater than 5if [ $num -gt 5 ]; then    echo \"Number is greater than 5\"else    echo \"Number is 5 or less\"fi"
        }
      },
      {
        "title": "9. Single Quotes vs Double Quotes",
        "content": "Quotes are used to define string values in shell scripting, but they behave differently based on how Bash interprets them. Understanding this difference is important for correct output in scripts.\n\n- **Single quotes (' '):** Treat text as literal; no variable expansion or command substitution happens, so output is printed exactly as written.\n- **Double quotes (\" \"):** Allow variable expansion and command substitution; variables are evaluated and replaced with their values before printing.**Script:**\n\n- **var=\"Linux\":** Stores the value Linux in a variable\n- **echo '$var':** Prints $var as plain text (no expansion)\n- **echo \"$var\":** Expands the variable and prints its value (Linux)**Output:**\n\nSingle Quotes vs Double Quotes",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Single Quotes vs Double Quotes",
          "snippet": "#!/bin/bashvar=\"Linux\"# Single quotes: literal outputecho '$var'# Double quotes: variable gets expandedecho \"$var\""
        }
      },
      {
        "title": "10. Command-Line Arguments in Shell Script",
        "content": "Command-line arguments allow users to pass values to a shell script at runtime. These values are accessed using positional parameters such as $0, $1, $2, etc., which represent the script name and the arguments provided.\n\n**Example:**\n\n- **$0:** Name of the script being executed\n- **$1:** First argument passed to the script\n- **$2:** Second argument passed to the script**Run:**\n\n**Output:**\n\nCommand-Line Arguments",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Command-Line Arguments in Shell Script",
          "snippet": "#!/bin/bashecho \"Script name: $0\"echo \"First argument: $1\"echo \"Second argument: $2\""
        }
      },
      {
        "title": "11. for Loop in Shell Scripting",
        "content": "The for loop is used to iterate over a list of values or array elements. It executes a block of commands repeatedly for each item in the list.\n\n**Example:** Loop through a list of fruits\n\n- **fruits=(\"apple\" \"banana\" \"cherry\"):** Defines an array\n- **for fruit in \"${fruits[@]}\":** Iterates through each array element\n- **$fruit:** Holds current element in each iteration\n- **do ... done:** Defines the block of commands to repeat**Output:**\n\nfor Loop",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. for Loop in Shell Scripting",
          "snippet": "#!/bin/bash# Define an array of fruitsfruits=(\"apple\" \"banana\" \"cherry\")# Loop through each element in the arrayfor fruit in \"${fruits[@]}\"; do    echo \"Fruit: $fruit\"done"
        }
      },
      {
        "title": "12. Shell Script to Calculate Sum from 1 to N Using a Loop",
        "content": "This script calculates the sum of all integers from 1 to a user-provided number N using a for loop.\n\n**Example:** Sum of First N Numbers\n\n- **echo \"Enter a number (N):\":** Prompts the user to enter a value for N\n- **read N:** Stores the input value in variable N\n- **sum=0:** Initializes sum variable to 0 for accumulation\n- **for (( i=1; i<=$N; i++ )):** Loop runs from 1 to N\n- **sum=$((sum + i)):** Adds current value of i to sum in each iteration\n- **done:** Ends the loop**Output:**\n\nCalculating sum from 1 to N using a loop",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Shell Script to Calculate Sum from 1 to N Using a Loop",
          "snippet": "#!/bin/bash# Ask user for inputecho \"Enter a number (N):\"read N# Initialize sum variablesum=0# Loop from 1 to Nfor (( i=1; i<=N; i++ )); do    sum=$((sum + i))done# Display final resultecho \"Sum of integers from 1 to $N is: $sum\""
        }
      },
      {
        "title": "13. while Loop in Shell Scripting",
        "content": "A while loop is used in shell scripting to repeatedly execute a set of commands as long as a specified condition is true. The loop continues executing the commands until the condition becomes false.\n\n**Syntax of while loop:**\n\n- The condition is checked before each iteration\n- If the condition is true: loop runs\n- If the condition becomes false: loop stops\n- do ... done defines the block of repeated commands**Example:** Print Numbers from 1 to 5\n\n- **counter=1:** Starts counting from 1\n- **[ $counter -le 5 ]:** Runs loop while counter is ≤ 5\n- **echo \"Number: $counter\":** Prints current value\n- **counter=$((counter + 1)):** Increases counter by 1 each time\n- **done:** Ends the loop**Output:**\n\nwhile loop",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. while Loop in Shell Scripting",
          "snippet": "while [ condition ]; do    # commands to executedone"
        }
      },
      {
        "title": "14. Standard Output vs Standard Error",
        "content": "Shell scripting uses different output streams to separate normal output and error messages. This helps in debugging and redirecting outputs efficiently.\n\n- **Standard Output (stdout):** This is the default stream for normal output of a command. It is shown on the terminal by default and can be redirected to a file using >.\n- **Standard Error (stderr):** This stream is used for error messages and warnings. It is also shown on the terminal by default but can be redirected separately using 2>.**Example:**\n\n**Output:**\n\nStandard Output vs Standard Error",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Standard Output vs Standard Error",
          "snippet": "#!/bin/bashecho \"This is normal output\"ls invalid_file"
        }
      },
      {
        "title": "15. Conditional Statements in Shell Scripting",
        "content": "Conditional statements allow a shell script to make decisions and control the flow of execution based on whether certain conditions are true or false. They help run different commands depending on the situation.\n\n**Basic Structure:**\n\n- **[ condition ]:** Tests a condition and returns a status (0 means true, non-zero means false).\n- **then:** Starts the block of commands to execute if the condition is true.\n- **elif:** Checks additional conditions if the previous condition is false (optional).\n- **else:** Runs when none of the conditions are true (optional).\n- **fi:** Ends the conditional statement block.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 15. Conditional Statements in Shell Scripting",
          "snippet": "if [ condition ]; then    # commands if condition is trueelif [ another_condition ]; then    # commands if another condition is true (optional)else    # commands if all conditions are false (optional)fi"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Practical Linux Shell Script Examples",
      "initialCode": "#!/bin/bashecho \"Hello World\"",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Practical Linux Shell Script Examples",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Practical Linux Shell Script Examples?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Practical Linux Shell Script Examples",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Practical Linux Shell Script Examples is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-enable-ssh": {
    "id": "linux-enable-ssh",
    "badge": "Module 11 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Enabling and Hardening OpenSSH on Ubuntu/Linux",
    "subtitle": "Complete Linux guide to Enabling and Hardening OpenSSH on Ubuntu/Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SSH (Secure Shell) allows secure remote access to a system over a network. It is commonly used to manage servers, execute remote commands and transfer files securely. Ubuntu supports SSH through the OpenSSH server package, which can be installed and configured directly from the terminal.\n\n- Securely connect to remote systems over a network\n- Manage servers and execute administrative commands remotely\n- Configure authentication and access settings\n- Allow SSH traffic through the firewall when required",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Enabling and Hardening OpenSSH on Ubuntu/Linux."
        }
      },
      {
        "title": "2. Step 1: Update Repository",
        "content": "**Command:**\n\n**Output:**\n\nsudo apt update**Note:** While updating the repository it will ask your password enter the password to complete the process",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Step 1: Update Repository",
          "snippet": "sudo apt update"
        }
      },
      {
        "title": "3. Step 2: Check OpenSSH Server Status",
        "content": "After updating use the following command to verify OpenSSH status\n\n**Command:**\n\n**Output:**\n\nsudo apt\n- If SSH is already installed in your system then output will look similar to**Output:**\n\n- If it's not installed then you can install using the following command:**Command:**\n\n**Output:**\n\ninstall openssh server**Note:** Once the installation process ends the SSH service will start automatically.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Step 2: Check OpenSSH Server Status",
          "snippet": "sudo apt list openssh-server"
        }
      },
      {
        "title": "4. Step 3: Start and Enable SSH Service",
        "content": "Although the SSH service starts automatically after installation. But if the SSH server is not started then by using the following command you can start the SSH server.\n\n**Command:**\n\n**Output:**\n\nStart and Enable SSH Service\n- To ensure it starts on boot, enable the service using following command**Command:**\n\n**Output:**\n\nEnable SSH Service",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step 3: Start and Enable SSH Service",
          "snippet": "sudo service ssh start"
        }
      },
      {
        "title": "5. Step 4: Check SSH Status",
        "content": "After enable the SSH server now check the SSH server status to ensure the SSH service are running.\n\n**Command:**\n\n**Output:**\n\nCheck SSH Status\n- SSH is now enabled on your Ubuntu system.**Note:** Press Q to return to the command prompt.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Step 4: Check SSH Status",
          "snippet": "sudo service ssh status"
        }
      },
      {
        "title": "6. Step 1: Open SSH Configuration File",
        "content": "Open the SSH configuration file using a text editor.\n\n**Command:**\n\n**Output:**\n\nOpen SSH Config File",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Step 1: Open SSH Configuration File",
          "snippet": "sudo nano /etc/ssh/sshd_config"
        }
      },
      {
        "title": "7. Step 2: Modify Root Login (If Required)",
        "content": "Locate the line #PermitRootLogin prohibit-password and uncomment it by removing the # at the beginning then save and exit.\n\n**Note:** Incorrect SSH configuration can lock you out of the server. Keep an active session open and ensure you have alternative access before making changes.\n\n**Uncomment:**\n\n**Output:**\n\n- Restart the SSH service to apply the changes.**Command:**\n\n**Output:**\n\nRestart SSH Service",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 7. Step 2: Modify Root Login (If Required)",
          "snippet": "#PermitRootLogin prohibit-password"
        }
      },
      {
        "title": "8. Step 1: Allow SSH Through UFW (Uncomplicated Firewall)",
        "content": "If we have a firewall turned on, we can allow SSH traffic. If we are using UFW, we can allow SSH by executing the following command:\n\n**Command:**\n\n**Output:**\n\nConfiguration firewall",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Step 1: Allow SSH Through UFW (Uncomplicated Firewall)",
          "snippet": "sudo ufw allow ssh"
        }
      },
      {
        "title": "9. Step 2: Enable UFW (Uncomplicated Firewall)",
        "content": "Enable UFW to start at boot.\n\n**Command:**\n\n**Output:**\n\nEnable UFW",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Step 2: Enable UFW (Uncomplicated Firewall)",
          "snippet": "sudo ufw enable"
        }
      },
      {
        "title": "10. Step 3: Verify Firewall Status",
        "content": "Now Verify the status of UFW to confirm that SSH is allowed.\n\n**Command:**\n\n**Output:**\n\nCheck UFW StatusNow, as you can see the SSH is enabled and UFW is configured to allow SSH traffic.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Step 3: Verify Firewall Status",
          "snippet": "sudo ufw status"
        }
      },
      {
        "title": "11. Step 4: Access SSH",
        "content": "Now this is final steps to check the Access of SSH whether it is Enabled or not. We can also access our Ubuntu machine via SSH using its IP address or hostname.\n\n- Use the following command from another system:**Command:**\n\n**Output:**\n\nAccess SSH",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Step 4: Access SSH",
          "snippet": "ssh username@your_ubuntu_ip"
        }
      },
      {
        "title": "1. Check SSH Service",
        "content": "Run the following command to restart or check the status:\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Check SSH Service",
          "snippet": "sudo systemctl status sshsudo systemctl restart ssh"
        }
      },
      {
        "title": "2. Allow SSH in Firewall",
        "content": "If your Firewall is blocking, run the following command:\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Allow SSH in Firewall",
          "snippet": "sudo ufw allow ssh"
        }
      },
      {
        "title": "3. Fix Permission Denied Issue",
        "content": "If SSH key is properly not set, ensure to allow the permission by using the following command:\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Fix Permission Denied Issue",
          "snippet": "chmod 600 ~/.ssh/authorized_keys"
        }
      },
      {
        "title": "4. Connection Timeout",
        "content": "This might occur due to network issues or a misconfigured firewall. Try fixing any blockage between client and the server."
      },
      {
        "title": "16. Also Check",
        "content": "- How to use SSH to connect to a remote server in Linux\n- Difference between SSH and SSLComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Enabling and Hardening OpenSSH on Ubuntu/Linux",
      "initialCode": "sudo apt update",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Enabling and Hardening OpenSSH on Ubuntu/Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Enabling and Hardening OpenSSH on Ubuntu/Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Enabling and Hardening OpenSSH on Ubuntu/Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Enabling and Hardening OpenSSH on Ubuntu/Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-scp-cmd": {
    "id": "linux-scp-cmd",
    "badge": "Module 11 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "scp Command: Secure File & Directory Transfer over SSH",
    "subtitle": "Complete Linux guide to scp Command: Secure File & Directory Transfer over SSH — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The scp (Secure Copy Protocol) command is used to securely transfer files and directories between systems over a network. It works over SSH, which means all transferred data is encrypted. It is commonly used by system administrators to move backup files, fetch logs, copy configuration files, and transfer data between servers safely and quickly.\n\n- Transfers files securely using SSH encryption\n- Supports copying between local and remote systems\n- Allows directory transfer using recursive mode\n- Provides options for custom ports, metadata preservation, and quiet mode",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for scp Command: Secure File & Directory Transfer over SSH."
        }
      },
      {
        "title": "2. Example: Copy File from Local to Remote",
        "content": "To copy a file named file.txt from your local machine to a remote server\n\n**Command:**\n\n- file.txt is the local file\n- username@192.168.1.2 is the remote server and user\n- /home/username/ is the destination directory on the remote server.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Example: Copy File from Local to Remote",
          "snippet": "scp file.txt username@192.168.1.2:/home/username/"
        }
      },
      {
        "title": "3. Syntax",
        "content": "- **options:** Modify command behavior (-P, -r, -p, -q, etc.)\n- **[[user@]host1:]:** Represents the source system.\n- **user:** Username on the remote system\n- **host1:** IP address or hostname of the remote system\n- **The :** - indicates that the source is on a remote machine If omitted, the source is assumed to be local\n- **source:** File or directory to be copied (can be local or remote)\n- **[[user@]host2:]:** Represents the destination system.\n- **user:** Username on the destination system\n- **host2:** IP address or hostname\n- **The : -** indicates that the destination is remote If omitted, the destination is assumed to be local\n- **... :** Multiple source files can be specified before the destination",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Syntax",
          "snippet": "scp [options] [[user@]host1:]source_file_or_directory ... [[user@]host2:]destination"
        }
      },
      {
        "title": "1. Securely Copying Files from Local to Remote Machine",
        "content": "**Syntax:**\n\nHere,\n\n- **file_name:** The name of the file that needs to be copied.\n- **remoteuser:**The username of the remote host.\n- **remotehost:** The IP address or hostname of the remote host.\n- **/remote/directory:** The directory where the file should be copied on the remote machine.**Example:**\n\nSuppose we want to copy a file named test.txt from your local system to a remote machine with the following details:\n\n- **Remote user:** jayesh\n- **Remote host:** 10.143.90.2\n- **Destination directory:** /home/jayesh/**Command:**\n\ncopied file from local system to remote system\n- **To Verify:** Use `ls` command in the location we copied file.File that we have copied",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Securely Copying Files from Local to Remote Machine",
          "snippet": "scp [file_name]  remoteuser@remotehost:/remote/directory"
        }
      },
      {
        "title": "2. Securely Copying Files From Remote Machine to Local Machine",
        "content": "To copy a file from a remote machine to your local system, you just reverse the source and destination, let's check out the syntax below:\n\n**Syntax:**\n\nHere,\n\n- **\"user\":** username of remote system.\n- **\"remotehost\":** IP address (or hostname) of remote system.\n- **\"/home/user/file_name\":** path of file that has to be copied.\n- **\".\":** this means that we are copying that file in current location in local system.**Example:**\n\nSuppose the remote system details are as follows:\n\n- **User:** jayesh\n- **Remote host:** 10.143.90.2\n- **Remote file path:** /home/jayesh/test1.txtTo copy this file from the remote machine to your current local directory, run:\n\n**Command:**\n\n- **`.`** : Current directory (local system)**Output:**\n\ncopied file from remote system to local system using scp**Note:** If . is not specified, SCP will fail because destination is mandatory.\n\n- **To verify:** use dir (in windows cmd)test1.txt successfully copied",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Securely Copying Files From Remote Machine to Local Machine",
          "snippet": "scp user@remotehost:/home/user/file_name"
        }
      },
      {
        "title": "1. -P (Specify Custom SSH Port)",
        "content": "It is used to Securely Copy File to a Remote Machine on a Non-Standard SSH Port and specify the port to connect on the remote host. It is useful when our SSH server is listening on a non-standard port.\n\n**Syntax:**\n\n**Example:**\n\nSuppose you want to copy a file named test2.txt from your local system to a remote machine with the following details:\n\n- **User:** jayesh\n- **Remote host:** 10.143.90.2\n- **SSH port:** 2222\n- **Destination directory:** /home/jayesh/**Command:**\n\n**Output:**\n\ncopying file from local system to remote using -P option in scp\n- **To Verify:** Use `ls` command in remote system in the location we have copied the file.test2.txt successfully copied",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. -P (Specify Custom SSH Port)",
          "snippet": "scp -P port source_file user@hostname:destination_file"
        }
      },
      {
        "title": "2. -p (Preserve File Metadata)",
        "content": "This option is used when we want the original metadata of the file that has been transferred. Basically, it preserves modification time, access time, and modes from the original file.\n\n**Syntax:**\n\n**Example:**\n\nSuppose you want to copy a file named test3.txt from your local system to a remote machine with the following details:\n\n- **User:** jayesh\n- **Remote host:** 10.143.90.2\n- **Destination directory:** /home/jayesh/**Command:**\n\n**Output:**\n\ncopying file from local system to remote using -p option in scp",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. -p (Preserve File Metadata)",
          "snippet": "scp -p source_file user@hostname:destination_file"
        }
      },
      {
        "title": "3. -q (Quiet Mode)",
        "content": "It Securely Copy File with Quiet Mode - Disabling Progress Meter .This option hides the progress of the file transfer on the terminal.\n\n**Syntax:**\n\n**Example:**\n\nSuppose you want to copy a file named test4.txt from your local system to a remote machine with the following details:\n\n- **User:** jayesh\n- **Remote host:** 10.143.90.2\n- **Destination directory:** /home/jayesh/**Command:**\n\n**Output:**\n\nAs we can see there is no progress shown\n- **To Verify:** Use `ls` command in remote system in the location we have copied the file.test4.txt successfully copied",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. -q (Quiet Mode)",
          "snippet": "scp -q source_file user@hostname:destination_file"
        }
      },
      {
        "title": "4. -r (Copy Directory Recursively)",
        "content": "This option is used when we want to copy an entire directory and its contents. Which basically means copying entire directory recursively.\n\n**Syntax:**\n\n**Example:**\n\nSuppose you want to copy a directory named new from your local system to a remote machine with the following details:\n\n- **User:** jayesh\n- **Remote host:** 10.143.90.2\n- **Destination directory:** /home/jayesh/new1/**Command:**\n\n**Output:**\n\ncopying entire directory and its file recursively using `-r` in scp\n- **To Verify:** Use `ls` command in remote system in the location we have copied the file.new directory successfully copied.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. -r (Copy Directory Recursively)",
          "snippet": "scp -r Directory_name user@hostname:destination_file"
        }
      },
      {
        "title": "10. Other Secure File Transfer Alternatives",
        "content": "While SCP is useful for direct secure file transfers, there are other powerful tools available in Linux depending on your requirements."
      },
      {
        "title": "1. SFTP (SSH File Transfer Protocol)",
        "content": "SFTP is a secure file transfer tool that works over SSH and provides an interactive session for managing remote files. It allows users to browse directories, upload and download files, rename files, and manage folders directly from the terminal. SFTP also supports resuming interrupted transfers, making it reliable for unstable connections.\n\n- Provides interactive file management over SSH\n- Supports upload and download operations\n- Allows directory navigation and file management\n- Supports resuming interrupted transfers**Example:**\n\nConnect to a remote system:\n\n**Command:**\n\nAfter connecting, you can use:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. SFTP (SSH File Transfer Protocol)",
          "snippet": "sftp user@remotehost"
        }
      },
      {
        "title": "12. Rsync (Remote Synchronization)",
        "content": "Rsync is a powerful file synchronization tool used for copying and syncing files or directories between systems. It transfers only the changed portions of files (delta transfer), which makes it efficient for backups and repeated transfers. Rsync also supports compression and resume functionality.\n\n- Efficient directory synchronization\n- Transfers only modified file portions\n- Suitable for backups and large data transfers\n- Supports compression and resume capability**Example:**\n\nSync a local file to a remote system:\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Rsync (Remote Synchronization)",
          "snippet": "rsync -avz file user@remotehost:/destination"
        }
      },
      {
        "title": "13. Improve the Security of SCP File Transfer",
        "content": "You must follow these practices to ensure that you're performing a secure file transfer using the SCP:\n\n- Ensure to use a strong and unique SSH key to authenticate file transfers.\n- Always ensure that you're transferring files to a trusted remote hosts by checking its fingerprints.\n- Ensure that you're using a non-default SSH port (if possible) to prevent from any attacks.\n- Cross verify that you're only transferring files to directories with limited access."
      },
      {
        "title": "14. Troubleshooting While Copying Files in Linux: SCP Command",
        "content": "While performing this action, there are certain challenges that you might face, let's address them for better clarity:"
      },
      {
        "title": "1. Permission Denied Error",
        "content": "If such issue persists, ensure that all the permissions to read/write to both source and destination (or directories) are correct. Here's how you can check it:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 1. Permission Denied Error",
          "snippet": "transferring"
        }
      },
      {
        "title": "2. Issue While Transferring Files",
        "content": "Check if the source file exists and is accessible, also ensure to have sufficient storage disk space on the remote server so that the files can be stored."
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: scp Command: Secure File & Directory Transfer over SSH",
      "initialCode": "scp file.txt username@192.168.1.2:/home/username/",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: scp Command: Secure File & Directory Transfer over SSH",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of scp Command: Secure File & Directory Transfer over SSH?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to scp Command: Secure File & Directory Transfer over SSH",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "scp Command: Secure File & Directory Transfer over SSH is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-nginx-source": {
    "id": "linux-nginx-source",
    "badge": "Module 11 • Linux & Shell",
    "readingTime": "28 min read",
    "level": "Advanced",
    "title": "Installing and Configuring Nginx from Source on Linux",
    "subtitle": "Complete Linux guide to Installing and Configuring Nginx from Source on Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Nginx is a free and open-source web server and reverse proxy designed to handle a large number of simultaneous connections efficiently. It is widely used for web serving, load balancing and media streaming. Known for high performance and scalability, Nginx is commonly deployed in production environments to manage traffic and improve reliability.\n\n- Supports reverse proxy with caching\n- Provides load balancing and fault tolerance\n- Handles static files and auto-indexing\n- Supports SSL and virtual server configuration\n- Includes FastCGI support with caching",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Installing and Configuring Nginx from Source on Linux."
        }
      },
      {
        "title": "2. Step 1: Download Nginx Source Archive",
        "content": "Download the Nginx archive from this link and save the archive file on your desktop.\n\nNginx Download page\n- Or, you can download the Nginx web server archive file by running the following command in the terminal, wget will fetch the archive file and save it to the location where you have opened the terminal.**Command:**\n\n**Output:**\n\nDownloading the Nginx server",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. Step 1: Download Nginx Source Archive",
          "snippet": "wget http://nginx.org/download/nginx-1.21.1.tar.gz"
        }
      },
      {
        "title": "3. Step 2: Extract the Archive",
        "content": "After downloading the archive, we need to navigate the folder where we have downloaded that archive and have to extract the archive using any archive utility. You can run the following command to extract the Nginx archive file.\n\n- The folder structure should look like this.Nginx folder",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 3. Step 2: Extract the Archive",
          "snippet": "tar -xf nginx-1.21.1.tar.gz"
        }
      },
      {
        "title": "4. Step 3: Configure and Build Nginx",
        "content": "To begin the installation of Nginx, navigate to the extracted folder and open the terminal here, then run the following command.\n\n- Navigate to the directory**Command:**\n\n- Start the configuration installer of the Nginx.**Command:**\n\nHere below is a summary of the configuration file:\n\n- Build the Nginx package from the source using the make command.**Command:**\n\n- Command to install the built package.**Command:**\n\nThis command will install Nginx in the /usr/local/nginx directory.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step 3: Configure and Build Nginx",
          "snippet": "cd ~/Desktop/nginx-1.21.1"
        }
      },
      {
        "title": "5. Step 4: Verify Installation",
        "content": "Confirm the installation and check the installed version of Nginx, navigate to /usr/local/nginx using the cd command (change directory)\n\n**Command:**\n\n- To check the current installed version of the Nginx.**Command:**\n\n**Output:**\n\nSuccessfully installed Nginx",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Step 4: Verify Installation",
          "snippet": "cd /usr/local/nginx/sbin"
        }
      },
      {
        "title": "6. Starting the Nginx server",
        "content": "Navigate to the default location where Nginx is installed\n\n**Command:**\n\n- Now, start the Nginx server**Command:**\n\n- Open localhost in a browser to verify the server is running.**Output:**\n\nNginx start (Welcome page)",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Starting the Nginx server",
          "snippet": "cd /usr/local/nginx/sbin"
        }
      },
      {
        "title": "7. Change the default Nginx Listening port",
        "content": "By default, the Nginx is configured to listen on port 80. If you want to change the default Nginx listening port, you can do that by reconfiguring the nginx.conf file located under /usr/local/nginx/conf."
      },
      {
        "title": "8. Step 1: Open Configuration File",
        "content": "Open the nginx.conf file\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Step 1: Open Configuration File",
          "snippet": "sudo nano /usr/local/nginx/conf/nginx.conf"
        }
      },
      {
        "title": "9. Step 2: Modify Port",
        "content": "After opening, the nginx.conf file should look like this:\n\nconfiguring listen port**Change it to your desired port. For example:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Step 2: Modify Port",
          "snippet": "listen 5555;"
        }
      },
      {
        "title": "10. Step 3: Save the File",
        "content": "- Press CTRL + O to save\n- Press Enter to confirm\n- Press CTRL + X to exit"
      },
      {
        "title": "11. Step 4: Test and Restart Nginx",
        "content": "Before restarting, it’s a good practice to test the configuration:\n\n- If the test is successful, restart Nginx:\n\n- If systemctl is not available, use: sudo service nginx restart",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. Step 4: Test and Restart Nginx",
          "snippet": "sudo nginx -t"
        }
      },
      {
        "title": "12. Step 5: Verify the Change",
        "content": "Open your browser and visit:\n\n- If everything is configured correctly, Nginx should now be running on the new port.custom listen port",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. Step 5: Verify the Change",
          "snippet": "http://localhost:5555"
        }
      },
      {
        "title": "13. Stopping the Nginx server",
        "content": "To stop the Nginx server, we just need to add the flag -s  to stop the Nginx.\n\n**Command:**\n\nThis will stop the Nginx server, you can refresh the localhost page and see.\n\n**Output:**\n\nNginx stop",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. Stopping the Nginx server",
          "snippet": "sudo ./nginx -s stop"
        }
      },
      {
        "title": "14. Uninstalling the Nginx server",
        "content": "To uninstall Nginx, run the command in the terminal with superuser permissions\n\n**Command:**\n\n- **sudo:** Executes the command with superuser (administrative) privileges.\n- **rm:** Removes files and directories.\n- **-f:** Forces removal without prompting for confirmation.\n- **-R:** Recursively removes directories and their contents.\n- **&&:** Executes the second command only if the first command completes successfully.\n- **/usr/local/nginx:** Directory where Nginx is installed, including its configuration files and related resources.\n- **/usr/local/sbin/nginx:** Location of the Nginx executable (binary) file.**Note: **Ensure correct path before deletion as rm -f -R permanently removes files\n\nComment",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 14. Uninstalling the Nginx server",
          "snippet": "sudo rm -f -R /usr/local/nginx && rm -f /usr/local/sbin/nginx"
        }
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Installing and Configuring Nginx from Source on Linux",
      "initialCode": "wget http://nginx.org/download/nginx-1.21.1.tar.gz",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Installing and Configuring Nginx from Source on Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Installing and Configuring Nginx from Source on Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Installing and Configuring Nginx from Source on Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Installing and Configuring Nginx from Source on Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-install-jdk": {
    "id": "linux-install-jdk",
    "badge": "Module 11 • Linux & Shell",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "Installing Java Development Kit (JDK) on Linux",
    "subtitle": "Complete Linux guide to Installing Java Development Kit (JDK) on Linux — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Java Virtual Machine (JVM) is the essential component that allows any Java program to be executed. Unlike Python, Java is not preinstalled on Ubuntu, so it must be installed before running Java applications or developing Java programs. Ubuntu provides repository-based packages for quick installation, and it also allows installing specific Oracle Java versions when required. The installation can be completed directly from the terminal using simple commands.\n\n- Default JDK and JRE packages are available in Ubuntu repositories.\n- Specific Oracle Java versions can be installed when required.\n- Installation is performed using terminal commands.\n- Java version can be verified after installation.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Installing Java Development Kit (JDK) on Linux."
        }
      },
      {
        "title": "2. Installing Java in Ubuntu",
        "content": "To Install Java on Ubuntu, We're going to see the following 2 methods:"
      },
      {
        "title": "3. Method 1: Install Java Using Default Repository (Automatic Method)",
        "content": "This method installs the default JDK and JRE available in Ubuntu’s repository."
      },
      {
        "title": "4. Step 1: Install JDK",
        "content": "Command examples and usage details for **Step 1: Install JDK**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 4. Step 1: Install JDK",
          "snippet": "sudo apt install default-jdk"
        }
      },
      {
        "title": "5. Step 2: Install JRE",
        "content": "Command examples and usage details for **Step 2: Install JRE**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 5. Step 2: Install JRE",
          "snippet": "sudo apt install default-jre"
        }
      },
      {
        "title": "6. Step 3: Verify Installation",
        "content": "If installed successfully, the system will display the installed Java version.\n\n**Command:**\n\n- Hooray! Java is now present on the Ubuntu system.",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 6. Step 3: Verify Installation",
          "snippet": "java -version"
        }
      },
      {
        "title": "7. Method 2: Install Oracle Java Manually (Specific Version)",
        "content": "This method allows installation of a specific Java version."
      },
      {
        "title": "8. Step 1: Add the Java Repository",
        "content": "Command examples and usage details for **Step 1: Add the Java Repository**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 8. Step 1: Add the Java Repository",
          "snippet": "sudo add-apt-repository ppa:linuxuprising/java -y"
        }
      },
      {
        "title": "9. Step 2: Update the System",
        "content": "Command examples and usage details for **Step 2: Update the System**:",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. Step 2: Update the System",
          "snippet": "sudo apt-get update"
        }
      },
      {
        "title": "10. Step 3: Install Desired Java Version",
        "content": "**Command:**\n\n- **<version>:** The required version number (for example, 13).",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. Step 3: Install Desired Java Version",
          "snippet": "sudo apt install oracle-java<version>-installer"
        }
      },
      {
        "title": "11. Step 4: Accept License Agreement",
        "content": "During installation, use the TAB key to select Yes and press Enter to continue.\n\nComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Installing Java Development Kit (JDK) on Linux",
      "initialCode": "sudo apt install default-jdk",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Installing Java Development Kit (JDK) on Linux",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Installing Java Development Kit (JDK) on Linux?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Installing Java Development Kit (JDK) on Linux",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Installing Java Development Kit (JDK) on Linux is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-cloud-devops": {
    "id": "linux-cloud-devops",
    "badge": "Module 11 • Linux & Shell",
    "readingTime": "26 min read",
    "level": "Advanced",
    "title": "Role of Linux in Cloud Computing and DevOps",
    "subtitle": "Complete Linux guide to Role of Linux in Cloud Computing and DevOps — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux is essential in today’s and future cloud computing and DevOps world. Its open-source nature, flexibility and scalability make it popular for building cloud infrastructure and automating software development and deployment\n\n- Linux is the foundation of modern cloud computing and DevOps, powering virtual machines, distributed systems and container orchestration platforms.\n- Most public cloud workloads run on Linux due to its stability, scalability and flexibility in hyperscale environments.\n- Its open-source nature, strong command-line tools and seamless integration with automation make it ideal for cloud-native development.",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Role of Linux in Cloud Computing and DevOps."
        }
      },
      {
        "title": "1. Kernel-Level Capabilities",
        "content": "Linux provides advanced kernel features that directly power cloud environments:\n\n- **Namespaces:** Provide isolation by separating processes into distinct environments (PID, network, mount, etc.), forming the core foundation of containers.\n- **cgroups (Control Groups):** Limit and manage resource usage like CPU, memory and I/O for groups of processes to ensure fair allocation and prevent resource exhaustion.\n- **Process scheduling:** The Linux kernel decides which process runs and for how long, optimizing CPU utilization and system responsiveness.\n- **Efficient networking stack:** Linux offers a high-performance TCP/IP stack with advanced routing, filtering and traffic control capabilities for scalable networking.\n- **Security modules:** Add mandatory access controls to enforce strict security policies and restrict application capabilities beyond standard permissions.These features enable secure multi-tenancy and resource isolation - both critical for cloud platforms."
      },
      {
        "title": "2. Cloud Provider Adoption",
        "content": "Major cloud providers rely heavily on Linux infrastructure:\n\n- Amazon Web Services\n- Microsoft Azure\n- Google Cloud PlatformMost cloud services, including virtual machines and Kubernetes clusters, run on Linux-based systems due to its lightweight and scalable nature."
      },
      {
        "title": "3. Virtualization & Hypervisors",
        "content": "Linux plays a central role in virtualization technologies such as:\n\n- KVM (Kernel-based Virtual Machine) is a Linux kernel module that turns the Linux kernel into a Type-1 (bare-metal) hypervisor.\n- Xen Hypervisor is a Type-1 (bare metal) hypervisor that runs directly on hardware.These hypervisors allow cloud providers to run multiple isolated virtual machines on shared physical hardware - a fundamental principle of cloud computing."
      },
      {
        "title": "5. Setting up Environment",
        "content": "Setting up a Linux environment for cloud computing and DevOps typically involves the following steps:\n\n- **Choose a Linux distribution: **Some of the most popular Linux distributions among power users are Ubuntu, CentOS and Debian, mainly due to their differing features and levels of community support.\n- **Install virtualization software: **You can avoid the \"dual boot\" scenario and opt for tools such as VirtualBox or VMware to run Linux as a virtual machine on your local system.\n- **Configure cloud instances:** Large cloud providers, for instance, Amazon Web Services, Google Cloud Platform and Microsoft Azure, provide Linux accessed through the virtual machines and container services that are easy to deploy.\n- **Install DevOps tools: **Utilize software tools such as Git, Jenkins, Docker, Kubernetes and Ansible on your Linux system to support development and deployment tasks."
      },
      {
        "title": "1. Virtualization and Infrastructure",
        "content": "- Linux is widely used as the operating system for virtual machines in cloud environments.\n- Major cloud providers like Amazon Web Services (AWS), Microsoft Azure and Google Cloud Platform rely on Linux at the core of their infrastructure.\n- It provides a stable and efficient foundation for building cloud platforms and services."
      },
      {
        "title": "2. Container Technologies",
        "content": "- Linux serves as the base for container technologies like Docker and Kubernetes.\n- These tools are widely used for deploying and managing applications in the cloud.\n- It enables lightweight, portable and efficient application environments."
      },
      {
        "title": "3. Scalability and Open-Source Ecosystem",
        "content": "- Linux offers high scalability and flexibility to match changing cloud demands.\n- Its customisation nature makes it ideal for dynamic cloud environments.\n- The open-source ecosystem allows seamless integration with various cloud tools and services."
      },
      {
        "title": "1. Automation and Scripting",
        "content": "Linux excels in automation through:\n\n- Bash scripting.\n- Cron jobs.\n- SSH-based remote execution.\n- Python automation.This makes infrastructure repeatable and predictable - a core DevOps principle.."
      },
      {
        "title": "2. CI/CD",
        "content": "- Linux supports automation tools like Ansible, Puppet and Chef for configuration management.\n- Popular CI/CD tools such as Jenkins, GitLab CI/CD and Travis CI run efficiently on Linux.\n- It helps streamline continuous integration and deployment pipelines."
      },
      {
        "title": "3. Cloud-Native Development and Scripting",
        "content": "- Cloud-native applications rely on the Linux kernel as their core operating system.\n- Linux provides a powerful command-line interface for system control.\n- Scripting languages like Bash and Python make automation easier in DevOps workflows."
      },
      {
        "title": "12. Practical Linux Command Examples in Cloud & DevOps",
        "content": "Linux is the operating system that supplies users with a great variety of commands for different purposes, such as file handling or running administration processes. Here are a few examples:\n\n**Package management:**\n\n- Installing and managing software packages is essential when configuring servers or preparing deployment environments\n- sudo yum install nginx (Redhat-based systems)- install nginx.**Process management:**\n\n- ps aux lists all running processes along with detailed information such as user, PID, CPU and memory usage.\n- kill <pid> terminates a specific process by using its Process ID (PID), allowing you to stop unwanted or unresponsive programs.**File operations: **\n\n- cp file1.txt file2.txt command is used to copy a file.\n- rm file.txt command is used to remove (delete) a file.**User management:**\n\n- useradd newuser creates a new user account in the system.\n- chmod 755 file.sh gives the owner read, write and execute permissions, while group and others get read and execute permissions."
      },
      {
        "title": "13. Applications",
        "content": "- **Cloud infrastructure:** Leading cloud service providers, i.e. AWS, GCP and Azure, keep getting used for their Linux-based virtualized environments and containers.\n- **Web servers:** Web servers based on Linux kernel such as Apache and Nginx remain at the heart of the contemporary cloud hosting of the websites and applications.\n- **DevOps tooling:** Utilities that are deployed on Linux systems as an expedient of continuous integration continuous deployment and infrastructure as code approach includes Git, Jenkins and Ansible and Docker.\n- **Big data and analytics: **On the basis of such platforms as Hadoop, Spark and Kafka, which are usually used for big data analytics at the operational (operational) level, the bulk of work is carried out on Linux systems\n- **Scientific computing: **Linux have spread consequently for its stability, speed and efficiency in scientific computing and High-Performance Computing because it can be customized.Comment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Role of Linux in Cloud Computing and DevOps",
      "initialCode": "#!/usr/bin/env bash\n# Role of Linux in Cloud Computing and DevOps\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Role of Linux in Cloud Computing and DevOps",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Role of Linux in Cloud Computing and DevOps?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Role of Linux in Cloud Computing and DevOps",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Role of Linux in Cloud Computing and DevOps is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-devops-commands": {
    "id": "linux-devops-commands",
    "badge": "Module 11 • Linux & Shell",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Essential Linux Commands for DevOps Engineers",
    "subtitle": "Complete Linux guide to Essential Linux Commands for DevOps Engineers — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Linux commands are the foundation of DevOps operations used for system administration, automation and troubleshooting. They help engineers manage files, processes, users, networks and system resources efficiently. These commands are widely used in servers, cloud environments and CI/CD pipelines.\n\n- Manage and control running processes and services\n- Automate repetitive tasks using shell scripting\n- Debug issues using logs and system monitoring tools\n- Enable secure remote server access (e.g., SSH)\n- Configure system components like permissions, storage and networks",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Essential Linux Commands for DevOps Engineers."
        }
      },
      {
        "title": "1. pwd",
        "content": "The pwd command helps you identify your current location in the file system:\n\nThe pwd command is used to display the current working directory.\n\n**Command:**\n\npwd"
      },
      {
        "title": "2. ls",
        "content": "The ls command is used to list files and directories in the current location.\n\n**Command:**\n\nCommand\n\nDescription\n\nls <Path Name>\n\nLists all files and directories in the specified path.\n\nls -l\n\nLists directory contents in long format with details like permissions, owner, size and modification time.\n\nls -a\n\nShows all files and folders, including hidden files (dotfiles).\n\nList Files and DirectoriesDisplay hidden filepermission of all file",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 2. ls",
          "snippet": "ls - List Files and Directories"
        }
      },
      {
        "title": "3. uname",
        "content": "The uname command is used to display system information.\n\n**Command:**\n\nuname**Note: **uname -r shows the kernel release version.\n\n**Command:**\n\nuname -r"
      },
      {
        "title": "4. cd",
        "content": "The cd command is used to change the current directory.\n\n**Command:**\n\nCd"
      },
      {
        "title": "5. clear",
        "content": "The clear command clears the terminal screen, providing a clean workspace.\n\n**Command:**\n\nclear"
      },
      {
        "title": "6. whoami",
        "content": "The whoami command displays the current logged-in user.\n\n**Command:**\n\nwhoami"
      },
      {
        "title": "7. history",
        "content": "The history command shows previously executed commands.\n\n**Command:**\n\nHistory"
      },
      {
        "title": "8. free",
        "content": "The free command is used to check memory usage.\n\n**Command:**\n\nfree"
      },
      {
        "title": "9. nslookup",
        "content": "nslookup is used to obtain information for DNS server. It stands for Name Server Lookup.\n\n**Command:**\n\nnslookup",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 9. nslookup",
          "snippet": "nslookup <domain name>"
        }
      },
      {
        "title": "10. ssh-keygen",
        "content": "The ssh-keygen command generates SSH public/private key pairs.\n\n**Command:**",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 10. ssh-keygen",
          "snippet": "ssh-keygen -t rsa"
        }
      },
      {
        "title": "11. curl",
        "content": "The curl command is used to transfer data from or to a server.\n\n**Syntax:**\n\ncurl",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 11. curl",
          "snippet": "curl [options] [URL]"
        }
      },
      {
        "title": "12. curl -o",
        "content": "curl -o flag saves the data into a file on the local machine.\n\n**Syntax:**\n\nstore response on local machine",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 12. curl -o",
          "snippet": "curl -o [file_name] [URL...]"
        }
      },
      {
        "title": "13. apt-get",
        "content": "apt-get command used to manage packages in the linux. APT stand for the Advanced Packaging Tool and its main used of install, update, upgrade and remove the packages.\n\n**Syntax:**\n\napt",
        "code": {
          "language": "bash",
          "caption": "Terminal / Shell — 13. apt-get",
          "snippet": "apt-get [options] command"
        }
      },
      {
        "title": "14. du",
        "content": "du command is used to check disk usage space.\n\n**Command:**\n\ndu"
      },
      {
        "title": "15. df",
        "content": "df command is used to check the available disk space in system.\n\n**Command:**\n\ndf"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Essential Linux Commands for DevOps Engineers",
      "initialCode": "ls - List Files and Directories",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Essential Linux Commands for DevOps Engineers",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Essential Linux Commands for DevOps Engineers?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Essential Linux Commands for DevOps Engineers",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Essential Linux Commands for DevOps Engineers is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  },
  "linux-cloud-deploy": {
    "id": "linux-cloud-deploy",
    "badge": "Module 11 • Linux & Shell",
    "readingTime": "30 min read",
    "level": "Advanced",
    "title": "Deploying and Managing Linux Instances in the Cloud",
    "subtitle": "Complete Linux guide to Deploying and Managing Linux Instances in the Cloud — syntax, command flags, practical terminal examples, and administration best practices.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Deploying and managing Linux in the cloud involves running Linux-based systems on cloud platforms to build scalable, secure and highly available infrastructure. It combines Linux administration skills with cloud services to efficiently deploy, monitor and maintain applications.\n\n- Linux is the preferred operating system for cloud servers and infrastructure\n- Cloud platforms provide on-demand resources and scalability\n- Effective management ensures security, performance and reliability\n- Automation and monitoring are essential for cloud-based Linux systems",
        "callout": {
          "type": "info",
          "title": "Linux System Reference",
          "message": "Practical command syntax, flags, and administration examples for Deploying and Managing Linux Instances in the Cloud."
        }
      },
      {
        "title": "2. Deploying Linux in the Cloud",
        "content": "Deploying Linux in the cloud means creating and running Linux-based servers on cloud platforms to host applications, services and infrastructure in a scalable and on-demand environment."
      },
      {
        "title": "3. Phase 1: Select a Cloud Provider",
        "content": "Choose a cloud provider based on your requirements, such as cost, geographic presence and available services. The major cloud providers offer Linux support, so you can deploy Linux virtual machines (VMs) easily.\n\n- **Amazon Web Services (AWS):** Amazon Web Services (AWS) is a leading cloud provider that offers highly scalable, reliable and secure Linux virtual machines with a wide range of compute, storage and networking services.\n- **Microsoft Azure:** Microsoft Azure is a global cloud platform that provides strong Linux support with seamless integration into enterprise and hybrid cloud environments.\n- **Alibaba cloud: **Alibaba Cloud is a major cloud provider, especially popular in Asia, offering cost-effective Linux virtual machines and robust cloud services for large-scale applications."
      },
      {
        "title": "4. Phase 2: Create an Account",
        "content": "To deploy Linux in the cloud, a cloud account must be created with the selected provider."
      },
      {
        "title": "5. Step 1: Sign Up for an AWS Account",
        "content": "**1. Visit the AWS Website:**\n\n- Go to the AWS website at [https://aws.amazon.com/%5D(https://aws.amazon.com/).**2. Click \"Create an AWS Account\":**\n\n- You'll find this option in the top-right corner of the AWS homepage. Click it to start the registration process.**3. Enter Your Information:**\n\n- Provide your email address and choose a password for your AWS account.\n- Click \"Next.\"**4. Contact Information:**\n\n- Enter your contact information, including your name, address and phone number.\n- Click \"Next.\"**5. Payment Information:**\n\n- Enter your payment details. AWS requires a valid credit card to verify your identity and for billing purposes. Don't worry; they offer a free tier with limited resources for the first 12 months.\n- Click \"Verify and Add.\"**6. Identity Verification:**\n\n- AWS will attempt to verify your identity. You may be asked to enter a phone number for identity verification.\n- Follow the instructions provided to complete this step.**7. Choose a Support Plan (Optional):**\n\n- You can choose between a free support plan or a paid support plan depending on your needs. The free plan is typically sufficient for beginners.\n- Click \"Continue.\"**8. Review and Confirm:**\n\n- Review your account information, including the terms and conditions.\n- Click \"Create Account.\"**9. Confirmation Email:**\n\n- You'll receive a confirmation email from AWS. Follow the link in the email to verify your email address and activate your AWS account."
      },
      {
        "title": "6. Step 2: Sign In to Your AWS Account",
        "content": "**1. Once your account is activated, go back to the AWS website:**\n\n- Visit [https://aws.amazon.com/%5D(https://aws.amazon.com/).**2. Click \"Sign In to the Console\":**\n\n- Use the email address and password you provided during the registration process to sign in to the AWS Management Console."
      },
      {
        "title": "7. Step 3: Access and Manage Linux Instances",
        "content": "Now that you have an AWS account, you can proceed to deploy and manage Linux instances (virtual machines) in the AWS cloud:\n\n**1. Launch an EC2 Instance:**\n\n- In the AWS Management Console, search for \"EC2\" and select it under \"Compute.\"**2. Launch an Instance:**\n\n- Click the \"Launch Instance\" button to create a new virtual machine (EC2 instance).**3. Follow the steps to configure your Linux instance:**\n\n- Choose an Amazon Machine Image (AMI).\n- Choose an instance type.\n- Configure instance details.\n- Add storage.\n- Configure security groups (firewall rules).\n- Review and launch the instance.**4. Access and manage your Linux instance using SSH:**\n\n- Once your instance is running, use an SSH client to connect to it using the public IP address or DNS name provided in the AWS Management Console.**5. Manage your Linux instance as needed:**\n\n- You can install software, configure services and deploy applications on your Linux instance in the AWS cloud."
      },
      {
        "title": "8. Phase 3: Choose a Linux Distribution",
        "content": "Decide on the Linux distribution that suits your needs. Popular choices include Ubuntu, CentOS, Debian and Red Hat Enterprise Linux (RHEL). Most cloud providers offer a variety of pre-configured Linux images.\n\nHere are a few popular Linux distributions and their common use cases.\n\n- **Ubuntu**: Known for its ease of use and extensive community support, Ubuntu is a popular choice for general-purpose cloud deployments and development environments.\n- **Kali: **Kali Linux is a security-focused Linux distribution designed for penetration testing, digital forensics and ethical hacking.\n- **Arch Linux: **Arch Linux is a lightweight and flexible Linux distribution that follows a rolling-release model, allowing users to build and customize their system from the ground up.\n- **CentOS (or its successor, AlmaLinux)**: CentOS is known for its stability and compatibility with Red Hat Enterprise Linux (RHEL). It has been widely used in enterprise environments. After CentOS 8, the community project shifted to CentOS Stream and many users migrated to alternatives like AlmaLinux."
      },
      {
        "title": "9. Phase 4: Launch a Virtual Machine",
        "content": "Deploy a virtual machine instance with your chosen Linux distribution. You can typically do this through the cloud provider's web console or command-line tools like AWS CLI, Azure CLI or gcloud.\n\nTo launch a virtual machine (VM) when deploying and managing Linux in the cloud, follow these steps:\n\n**1. Sign In:**\n\n- Log in to your cloud provider's web console (e.g., AWS, Azure, GCP) with your credentials.**2. Access Compute Services:**\n\n- Navigate to the compute services section (e.g., AWS EC2, Azure Virtual Machines).**3. Create Instance:**\n\n- Click \"Launch Instance\" or its equivalent.\n- Choose a Linux-based virtual machine image (AMI) or template.**4. Configure Instance:**\n\n- Select the instance type (hardware configuration).\n- Configure networking, storage and any additional settings.**5. real time:**\n\n- Define security groups or firewall rules to control inbound and outbound traffic.**6. Review & Launch**:\n\n- Review your configuration settings.\n- Click \"Launch\" or similar.**7. Key Pair (SSH Key):**\n\n- Choose an existing SSH key pair or create a new one.\n- Save the private key for future SSH access.**8. Launch Instance:**\n\n- Click \"Launch Instance\" to create the VM.**9. Access VM:**\n\n- Once the VM is running, access it via SSH using the key pair and the public IP/DNS provided.**10. Manage Your VM:**\n\n- Install software, configure services and deploy applications as needed.**11. Monitor & Secure:**\n\n- Monitor the VM's performance, apply security best practices and manage it according to your requirements."
      },
      {
        "title": "10. Managing Linux in the Cloud",
        "content": "Managing Linux in the cloud focuses on keeping systems secure, stable and scalable after deployment. Below are four essential sections commonly followed in real-world cloud environments."
      },
      {
        "title": "1. Monitoring and Performance Management",
        "content": "Monitoring ensures Linux servers are running efficiently and issues are detected early.\n\n- Track CPU, memory, disk and network usage\n- Monitor service health and application performance\n- Set alerts for failures or resource thresholdsEffective monitoring helps prevent downtime and performance bottlenecks."
      },
      {
        "title": "2. Security and Access Management",
        "content": "Security is a critical responsibility when managing Linux in the cloud.\n\n- Use SSH key-based authentication instead of passwords\n- Apply firewall rules and security groups\n- Enforce least-privilege access and audit logs\n- Keep systems patched with security updatesStrong security practices protect systems from unauthorized access."
      },
      {
        "title": "3. Automation and Configuration Management",
        "content": "Automation reduces manual effort and ensures consistency.\n\n- Automate system configuration and deployments\n- Use scripts or configuration management tools\n- Standardize server setups across environmentsAutomation improves reliability and minimizes human error."
      },
      {
        "title": "4. Backup, Scaling and Maintenance",
        "content": "Ongoing maintenance ensures long-term stability and availability.\n\n- Perform regular backups and test recovery\n- Scale resources based on workload demand\n- Review logs, usage and costs periodicallyThis ensures Linux systems remain resilient and cost-effective."
      },
      {
        "title": "15. Also Check",
        "content": "- Introduction to Linux System Administration\n- The Role of Linux in Cloud Computing and DevOpsComment"
      }
    ],
    "playground": {
      "title": "Linux Bash Terminal: Deploying and Managing Linux Instances in the Cloud",
      "initialCode": "#!/usr/bin/env bash\n# Deploying and Managing Linux Instances in the Cloud\n\nuname -a\nwhoami\npwd\nls -la",
      "expectedOutput": [
        "tncy@linux-lab:~$ # Topic: Deploying and Managing Linux Instances in the Cloud",
        "Linux lab-node 6.8.0-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "[OK] Command executed with exit code 0."
      ],
      "language": "bash",
      "engineBadge": "GNU Bash 5.2 • Linux Kernel 6.8"
    },
    "quiz": {
      "question": "In a Linux environment, what is the primary purpose of Deploying and Managing Linux Instances in the Cloud?",
      "options": [
        "Modifying BIOS/UEFI firmware voltages directly without kernel intervention",
        "Managing, configuring, or inspecting system resources and operations related to Deploying and Managing Linux Instances in the Cloud",
        "Compiling Windows Registry DLLs inside kernel space",
        "Disabling POSIX file descriptors permanently"
      ],
      "correctIndex": 1,
      "explanation": "Deploying and Managing Linux Instances in the Cloud is used by Linux system administrators, DevOps engineers, and developers to manage and automate UNIX/Linux systems."
    }
  }
};
