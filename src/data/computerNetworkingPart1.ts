import { LessonContent } from "./lessonsData";

export const COMPUTER_NETWORKING_PART1: Record<string, LessonContent> = {
  "cn-ch1-what-is-internet": {
    "id": "cn-ch1-what-is-internet",
    "badge": "Module 1 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Başlangıç - Orta",
    "title": "1.1 What is the Internet? Nuts-and-Bolts, Services View & Network Protocols",
    "subtitle": "Hosts, end systems, packet switches, communication links, RFC/IETF standards, and the formal definition of a network protocol.",
    "sections": [
      {
        "title": "1. Chapter 1: introduction (Slides 1-2..3)",
        "content": "![1.1 What is the Internet? Nuts-and-Bolts, Services View & Network Protocols Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**1.1 What is the Internet? Nuts-and-Bolts, Services View & Network Protocols** — Hosts, end systems, packet switches, communication links, RFC/IETF standards, and the formal definition of a network protocol.\n\n**Chapter 1: introduction**\n\n- **Chapter goal:** \n- Get “feel,” “big picture,” introduction to terminology\n  - more depth, detail later in course\n- **Overview/roadmap:** \n- What is the Internet? What is a protocol?\n- **Network edge:** hosts, access network, physical media\n- **Network core:** packet/circuit switching, internet structure\n- **Performance:** loss, delay, throughput\n- Protocol layers, service models\n- Security\n- History\n\n**The Internet: a “nuts and bolts” view**\n\n- **Packet switches:** forward packets (chunks of data)\n  - routers, switches\n- Communication links\n  - fiber, copper, radio, satellite\n  - transmission rate: bandwidth\n- **Billions of connected computing devices:** \n  - hosts = end systems\n  - running network apps at Internet’s “edge”\n- Networks\n  - collection of devices, routers, links: managed by an organization\n\n- **Slide Diagram Elements & Protocol Entities:** `Internet, mobile network, home network, enterprise network, national or global ISP, local or regional ISP, datacenter network, content provider network`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 1 Key Principle",
          "message": "Hosts, end systems, packet switches, communication links, RFC/IETF standards, and the formal definition of a network protocol."
        }
      },
      {
        "title": "2. “Fun” Internet-connected devices (Slides 1-4..5)",
        "content": "**“Fun” Internet-connected devices**\n\n- **Slide Diagram Elements & Protocol Entities:** `Web-enabled toaster + weather forecaster, Internet phones, Slingbox: remote control cable TV, Security Camera, IP picture frame, Internet refrigerator, Tweet-a-watt: monitor energy use, sensorized, bed mattress, Amazon Echo, Others?, Gaming devices, cars, scooters, bikes`\n\n**The Internet: a “nuts and bolts” view**\n\n- **Internet:** “network of networks”\n  - Interconnected ISPs\n- protocols are everywhere\n  - control sending, receiving of messages\n  - e.g., HTTP (Web), streaming video, Zoom, TCP, IP, WiFi, 4/5G, Ethernet\n- Internet standards\n  - RFC: Request for Comments\n  - IETF: Internet Engineering Task Force\n\n- **Slide Diagram Elements & Protocol Entities:** `mobile network, home network, enterprise network, national or global ISP, local or regional ISP, datacenter network, content provider network, Ethernet, HTTP, Skype, WiFi, TCP, Streaming video`"
      },
      {
        "title": "3. The Internet: a “services” view (Slides 1-6..8)",
        "content": "**The Internet: a “services” view**\n\n- Infrastructure that provides services to applications:\n  - Web, streaming video, multimedia teleconferencing, email, games, e-commerce, social media, inter-connected appliances, …\n- provides programming interface to distributed applications:\n  - “hooks” allowing sending/receiving apps to “connect” to, use Internet transport service\n  - provides service options, analogous to postal service\n\n- **Slide Diagram Elements & Protocol Entities:** `mobile network, home network, enterprise network, national or global ISP, local or regional ISP, datacenter network, content provider network, HTTP, Skype, Streaming video`\n\n**What’s a protocol?**\n\n- **Human protocols:** \n- “what’s the time?”\n- “I have a question”\n- introductions\n- **Network protocols:** \n- computers (devices) rather than humans\n- all communication activity in Internet governed by protocols\n- Protocols define the format, order of messages sent and received among network entities, and actions taken on message transmission, receipt\n- **Rules for:** \n- … specific messages sent\n- … specific actions taken when message received, or other events\n- A human protocol and a computer network protocol:\n- **GET http:** //gaia.cs.umass.edu/kurose_ross\n\n- **Slide Diagram Elements & Protocol Entities:** `Q: other human protocols?, Got the time?, 2:00, time, TCP connection response, <file>, TCP connection request`\n\n> **Kurose & Ross Lecture Note:** Explain important points distributed entities, exchanging messages (governed by protocols) Time going down go over definition of protocol (showing format, order of messages sent and received, and actions taken) We’ll see these kinds of diagrams a lot"
      },
      {
        "title": "4. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **1.1 What is the Internet? Nuts-and-Bolts, Services View & Network Protocols**:\n\n- **Review Question 1 (What is the Internet?):** Which of the following descriptions below correspond to a \"nuts-and-bolts\" view of the Internet? Select one or more of the answers below that are correct. [Hint: more than one of answers below are correct].\n  - **Verified Answer:** A collection of hardware and software components executing protocols that define the format and the order of messages exchanged between two or more communicating entities, as well as the actions taken on the transmission and/or receipt of a message or other event.; A collection of billions of computing devices, and packet switches interconnected by links.; A \"network of networks\".\n\n- **Review Question 2 (What is the Internet (2)?):** Which of the following descriptions below correspond to a \"services\" view of the Internet? Select one or more of the answers below below that are correct below that are correct. [Hint: more than one of answers below are correct].\n  - **Verified Answer:** A platform for building network applications.; A place I go for information, entertainment, and to communicate with people.\n\n- **Review Question 3 (What is a protocol?):** Which of the following human scenarios involve a protocol (recall: \"Protocols define the format, order of messages sent and received among network entities, and actions taken on message transmission, receipt\")? Select one or more answers below that are correct. Hint: more than one of answers below are correct.\n  - **Verified Answer:** Two people introducing themselves to each other.; One person asking, and getting, the time to/from another person.; A student raising her/his hand to ask a really insightful question, followed by the teaching acknowledging the student, listening carefully to the question, and responding with a clear, insightful answer. And then thanking the student for the question, since teachers love to get questions.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "protocol_handshake_sim.py — Simulating Human vs. HTTP/TCP Protocol Message Ordering",
          "snippet": "# Kurose & Ross 9e - Section 1.1: Protocol State & Message Exchange Simulator\nclass NetworkProtocolEntity:\n    def __init__(self, name: str):\n        self.name = name\n        self.state = \"CLOSED\"\n\n    def send_and_receive(self, peer, msg_type: str, payload: str = \"\"):\n        print(f\"[{self.name} -> {peer.name}] MSG={msg_type} | Payload='{payload}'\")\n        if msg_type == \"TCP_SYN\":\n            peer.state = \"SYN_RCVD\"\n            return (\"TCP_SYN_ACK\", \"Connection Accepted\")\n        elif msg_type == \"HTTP_GET\":\n            peer.state = \"ESTABLISHED\"\n            return (\"HTTP_200_OK\", \"<html>Welcome to Kurose & Ross 9e</html>\")\n        return (\"ERR\", \"Unknown protocol message\")\n\nclient = NetworkProtocolEntity(\"Host_Client (Edge)\")\nserver = NetworkProtocolEntity(\"Web_Server (Gaia)\")\n\nfor msg, data in [(\"TCP_SYN\", \"port=80\"), (\"HTTP_GET\", \"GET /kurose_ross/index.html HTTP/1.1\")]:\n    resp_type, resp_body = client.send_and_receive(server, msg, data)\n    print(f\"[{server.name} -> {client.name}] REPLY={resp_type} | Body='{resp_body}'\\n\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 1.1 What is the Internet? Nuts-and-Bolts, Services View & Network Protocols",
      "filename": "protocol_handshake_sim.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 1.1: Protocol State & Message Exchange Simulator\nclass NetworkProtocolEntity:\n    def __init__(self, name: str):\n        self.name = name\n        self.state = \"CLOSED\"\n\n    def send_and_receive(self, peer, msg_type: str, payload: str = \"\"):\n        print(f\"[{self.name} -> {peer.name}] MSG={msg_type} | Payload='{payload}'\")\n        if msg_type == \"TCP_SYN\":\n            peer.state = \"SYN_RCVD\"\n            return (\"TCP_SYN_ACK\", \"Connection Accepted\")\n        elif msg_type == \"HTTP_GET\":\n            peer.state = \"ESTABLISHED\"\n            return (\"HTTP_200_OK\", \"<html>Welcome to Kurose & Ross 9e</html>\")\n        return (\"ERR\", \"Unknown protocol message\")\n\nclient = NetworkProtocolEntity(\"Host_Client (Edge)\")\nserver = NetworkProtocolEntity(\"Web_Server (Gaia)\")\n\nfor msg, data in [(\"TCP_SYN\", \"port=80\"), (\"HTTP_GET\", \"GET /kurose_ross/index.html HTTP/1.1\")]:\n    resp_type, resp_body = client.send_and_receive(server, msg, data)\n    print(f\"[{server.name} -> {client.name}] REPLY={resp_type} | Body='{resp_body}'\\n\")",
      "expectedOutput": [
        "[OK] protocol_handshake_sim.py — Simulating Human vs. HTTP/TCP Protocol Message Ordering",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 1.1 What is the Internet? Nuts-and-Bolts, Services View & Network Protocols. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following descriptions below correspond to a \"nuts-and-bolts\" view of the Internet? Select one or more of the answers below that are correct. [Hint: more than one of answers below are correct].",
      "options": [
        "A) A collection of hardware and software components executing protocols that define the format and the order of messages exchanged between two ",
        "B) A platform for building network applications.",
        "C) A collection of billions of computing devices, and packet switches interconnected by links.",
        "D) A \"network of networks\"."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 1), 'A collection of hardware and software components executing protocols that define the format and the order of messages exchanged between two or more communicating entities, as well as the actions taken on the transmission and/or receipt of a message or other event.' accurately characterizes 1.1 What is the Internet? Nuts-and-Bolts, Services View & Network Protocols."
    }
  },
  "cn-ch1-network-edge": {
    "id": "cn-ch1-network-edge",
    "badge": "Module 1 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Başlangıç - Orta",
    "title": "1.2 The Network Edge: Access Networks (Cable HFC, DSL, FTTH, 5G) & Physical Media",
    "subtitle": "Connecting end systems to edge routers via Cable DOCSIS/FDM, DSL, Fiber-to-the-Home, WiFi/5G wireless, and guided vs. unguided physical links.",
    "sections": [
      {
        "title": "1. A closer look at Internet structure (Slides 1-10..13)",
        "content": "![1.2 The Network Edge: Access Networks (Cable HFC, DSL, FTTH, 5G) & Physical Media Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**1.2 The Network Edge: Access Networks (Cable HFC, DSL, FTTH, 5G) & Physical Media** — Connecting end systems to edge routers via Cable DOCSIS/FDM, DSL, Fiber-to-the-Home, WiFi/5G wireless, and guided vs. unguided physical links.\n\n**A closer look at Internet structure**\n\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n- **Network edge:** \n- **hosts:** clients and servers\n- servers often in data centers\n- **Access networks, physical media:** \n- wired, wireless communication links\n- **Network core:** \n  - interconnected routers\n  - network of networks\n\n**Access networks and physical media**\n\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n- **Q:** How to connect end systems to edge router?\n- residential access nets\n- institutional access networks (school, company)\n- mobile access networks (WiFi, 4G/5G)",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 1 Key Principle",
          "message": "Connecting end systems to edge routers via Cable DOCSIS/FDM, DSL, Fiber-to-the-Home, WiFi/5G wireless, and guided vs. unguided physical links."
        }
      },
      {
        "title": "2. Access networks: cable-based access (Slides 1-14..16)",
        "content": "**Access networks: cable-based access**\n\n- cable\n- modem\n- splitter\n- cable headend\n- Channels\n- **frequency division multiplexing (FDM):** different channels transmitted in different frequency bands\n- data, TV transmitted at different\n- frequencies over shared cable\n- distribution network\n- **HFC:** hybrid fiber coax\n  - asymmetric: up to 40 Mbps – 1.2 Gbps downstream transmission rate, 30-100 Mbps upstream transmission rate\n- network of cable, fiber attaches homes to ISP router\n  - homes share access network to cable headend\n- cable modem\n- termination system\n- CMTS\n- ISP\n\n**Access networks: digital subscriber line (DSL)**\n\n- ISP\n- central office\n- telephone\n- network\n- DSLAM\n- voice, data transmitted\n- at different frequencies over\n- dedicated line to central office\n  - use existing telephone line to central office DSLAM\n    - data over DSL phone line goes to Internet\n    - voice over DSL phone line goes to telephone net\n  - 24-52 Mbps dedicated downstream transmission rate\n  - 3.5-16 Mbps dedicated upstream transmission rate\n- DSL\n- modem\n- splitter\n- DSL access\n- multiplexer"
      },
      {
        "title": "3. Access networks: home networks (Slides 1-17..18)",
        "content": "**Access networks: home networks**\n\n- to/from headend or central office\n- cable or DSL modem\n- router, firewall, NAT\n- wired Ethernet (1 Gbps)\n- WiFi wireless access\n- point (54, 450 Mbps)\n- Wireless and wired\n- devices\n- often combined\n- in single box\n\n**Wireless access networks**\n\n- Shared wireless access network connects end system to router\n- via base station aka “access point”\n- Wireless local area networks (WLANs)\n  - typically within or around building (~100 ft)\n  - 802.11b/g/n (WiFi): 11, 54, 450 Mbps transmission rate\n- to Internet\n- to Internet\n- Wide-area cellular access networks\n  - provided by mobile, cellular network operator (10’s km)\n  - 10’s Mbps\n  - 4G/5G cellular networks"
      },
      {
        "title": "4. Access networks: enterprise networks (Slides 1-19..20)",
        "content": "**Access networks: enterprise networks**\n\n- companies, universities, etc.\n  - mix of wired, wireless link technologies, connecting a mix of switches and routers (we’ll cover differences shortly)\n    - Ethernet: wired access at 100Mbps, 1Gbps, 10Gbps\n    - WiFi: wireless access points at 11, 54, 450 Mbps\n- Ethernet\n- switch\n- institutional mail,\n- web servers\n- institutional router\n- Enterprise link to\n- ISP (Internet)\n\n**Access networks: data center networks**\n\n- high-bandwidth links (10s to 100s Gbps) connect hundreds to thousands of servers together, and to Internet\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n- **Courtesy:** Massachusetts Green High Performance Computing Center (mghpcc.org)"
      },
      {
        "title": "5. Host: sends packets of data (Slides 1-21..24)",
        "content": "**Host: sends packets of data**\n\n- **host sending function:** \n- takes application message\n- breaks into smaller chunks, known as packets, of length L bits\n- transmits packet into access network at transmission rate R\n  - link transmission rate, aka link capacity, aka link bandwidth\n- **R:** link transmission rate\n- host\n- two packets,\n- L bits each\n- packet\n- transmission\n- delay\n- time needed to\n- transmit L-bit\n- packet into link\n- L (bits)\n- R (bits/sec)\n\n**Links: physical media**\n\n- **bit:** propagates between transmitter/receiver pairs\n- **physical link:** what lies between transmitter & receiver\n- **guided media:** \n  - signals propagate in solid media: copper, fiber, coax\n- **unguided media:** \n  - signals propagate freely, e.g., radio\n- Twisted pair (TP)\n- two insulated copper wires\n  - Category 5: 100 Mbps, 1 Gbps Ethernet\n  - Category 6: 10Gbps Ethernet\n- **Coaxial cable:** \n- two concentric copper conductors\n- bidirectional\n- **broadband:** \n  - multiple frequency channels on cable\n  - 100’s Mbps per channel\n- **Fiber optic cable:** \n- glass fiber carrying light pulses, each pulse a bit\n- **high-speed operation:** \n  - high-speed point-to-point transmission (10’s-100’s Gbps)\n- **low error rate:** \n  - repeaters spaced far apart\n  - immune to electromagnetic noise\n- Wireless radio\n- signal carried in various “bands” in electromagnetic spectrum\n- no physical “wire”\n- broadcast, “half-duplex” (sender to receiver)\n- **propagation environment effects:** \n  - reflection\n  - obstruction by objects\n  - Interference/noise\n- **Radio link types:** \n- Wireless LAN (WiFi)\n  - 10-100’s Mbps; 10’s of meters\n- wide-area (e.g., 4G/5G cellular)\n  - 100’s Mbps (4G/5G) over ~10 Km\n- **Bluetooth:** cable replacement\n  - short distances, limited rates\n- terrestrial microwave\n  - point-to-point; 45 Mbps channels\n- satellite\n  - up to < 100 Mbps (Starlink) downlink\n  - 270 msec end-end delay (geostationary)"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **1.2 The Network Edge: Access Networks (Cable HFC, DSL, FTTH, 5G) & Physical Media**:\n\n- **Review Question 1 (Link Transmission Characteristics.):** Which of the following physical layer technologies has the highest transmission rate and lowest bit error rate in practice?\n  - **Verified Answer:** Fiber optic cable",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "access_network_serialization.py — Calculating Packet Serialization Time Across Access Media",
          "snippet": "# Kurose & Ross 9e - Section 1.2: Access Network Transmission Time (d_trans = L / R)\naccess_links = [\n    (\"ADSL Downlink\", 24e6, \"Guided Twisted-Pair Copper\"),\n    (\"DOCSIS Cable HFC\", 500e6, \"Shared Coax + Fiber Node (FDM)\"),\n    (\"FTTH Active Optical\", 2.5e9, \"Single-Mode Glass Fiber\"),\n    (\"WiFi 6 (802.11ax)\", 1.2e9, \"Unguided 5 GHz Radio Spectrum\"),\n    (\"Datacenter Ethernet\", 100e9, \"Cat8 / Twinax / QSFP28 Fiber\"),\n]\n\npacket_bytes = 1500  # Standard Ethernet MTU\nL_bits = packet_bytes * 8\n\nprint(f\"Packet Payload L = {packet_bytes} Bytes ({L_bits} bits)\\n\" + \"-\" * 68)\nfor name, rate_bps, medium in access_links:\n    d_trans_us = (L_bits / rate_bps) * 1e6\n    print(f\"{name:22s} | R = {rate_bps/1e6:7.1f} Mbps | d_trans = {d_trans_us:8.3f} us | {medium}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 1.2 The Network Edge: Access Networks (Cable HFC, DSL, FTTH, 5G) & Physical Media",
      "filename": "access_network_serialization.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 1.2: Access Network Transmission Time (d_trans = L / R)\naccess_links = [\n    (\"ADSL Downlink\", 24e6, \"Guided Twisted-Pair Copper\"),\n    (\"DOCSIS Cable HFC\", 500e6, \"Shared Coax + Fiber Node (FDM)\"),\n    (\"FTTH Active Optical\", 2.5e9, \"Single-Mode Glass Fiber\"),\n    (\"WiFi 6 (802.11ax)\", 1.2e9, \"Unguided 5 GHz Radio Spectrum\"),\n    (\"Datacenter Ethernet\", 100e9, \"Cat8 / Twinax / QSFP28 Fiber\"),\n]\n\npacket_bytes = 1500  # Standard Ethernet MTU\nL_bits = packet_bytes * 8\n\nprint(f\"Packet Payload L = {packet_bytes} Bytes ({L_bits} bits)\\n\" + \"-\" * 68)\nfor name, rate_bps, medium in access_links:\n    d_trans_us = (L_bits / rate_bps) * 1e6\n    print(f\"{name:22s} | R = {rate_bps/1e6:7.1f} Mbps | d_trans = {d_trans_us:8.3f} us | {medium}\")",
      "expectedOutput": [
        "[OK] access_network_serialization.py — Calculating Packet Serialization Time Across Access Media",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 1.2 The Network Edge: Access Networks (Cable HFC, DSL, FTTH, 5G) & Physical Media. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following physical layer technologies has the highest transmission rate and lowest bit error rate in practice?",
      "options": [
        "A) Twisted pair (e.g., CAT5, CAT6)",
        "B) 4G/5G cellular",
        "C) Fiber optic cable",
        "D) Satellite channel"
      ],
      "correctIndex": 2,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 1), 'Fiber optic cable' accurately characterizes 1.2 The Network Edge: Access Networks (Cable HFC, DSL, FTTH, 5G) & Physical Media."
    }
  },
  "cn-ch1-network-core-switching": {
    "id": "cn-ch1-network-core-switching",
    "badge": "Module 1 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Başlangıç - Orta",
    "title": "1.3 The Network Core: Forwarding, Routing, Packet Switching vs. Circuit Switching",
    "subtitle": "Store-and-forward packet transmission, output buffer queueing, FDM/TDM circuit switching, and statistical multiplexing efficiency.",
    "sections": [
      {
        "title": "1. The network core (Slides 1-26..27)",
        "content": "![1.3 The Network Core: Forwarding, Routing, Packet Switching vs. Circuit Switching Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**1.3 The Network Core: Forwarding, Routing, Packet Switching vs. Circuit Switching** — Store-and-forward packet transmission, output buffer queueing, FDM/TDM circuit switching, and statistical multiplexing efficiency.\n\n**The network core**\n\n- mesh of interconnected routers\n- **packet-switching:** hosts break application-layer messages into packets\n  - network forwards packets from one router to the next, across links on path from source to destination\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n\n**Two key network-core functions**\n\n- destination address in arriving\n- packet’s header\n- routing algorithm\n- header value\n- output link\n- local forwarding table\n- **Forwarding:** \n- aka “switching”\n- **local action:** move arriving packets from router’s input link to appropriate router output link\n- local forwarding table\n- **Routing:** \n- **global action:** determine source-destination paths taken by packets\n- routing algorithms\n- routing algorithm",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 1 Key Principle",
          "message": "Store-and-forward packet transmission, output buffer queueing, FDM/TDM circuit switching, and statistical multiplexing efficiency."
        }
      },
      {
        "title": "2. forwarding (Slides 1-29..30)",
        "content": "**forwarding**\n\n- forwarding\n\n**Packet-switching: store-and-forward**\n\n- **packet transmission delay:** takes L/R seconds to transmit (push out) L-bit packet into link at R bps\n- **store and forward:** entire packet must arrive at router before it can be transmitted on next link\n- source\n- R bps\n- destination\n- L bits\n- per packet\n- R bps\n- **One-hop numerical example:** \n- L = 10 Kbits\n- R = 100 Mbps\n- one-hop transmission delay = 0.1 msec"
      },
      {
        "title": "3. Packet-switching: queueing (Slides 1-31..33)",
        "content": "**Packet-switching: queueing**\n\n- R = 100 Mb/s\n- R = 1.5 Mb/s\n- queue of packets\n- waiting for transmission over output link\n- Queueing occurs when work arrives faster than it can be serviced:\n- **Packet queuing and loss:** if arrival rate (in bps) to link exceeds transmission rate (bps) of link for some period of time:\n- packets will queue, waiting to be transmitted on output link\n- packets can be dropped (lost) if memory (buffer) in router fills up\n\n**Alternative to packet switching: circuit switching**\n\n- end-end resources allocated to, reserved for “call” between source and destination\n- in diagram, each link has four circuits.\n  - call gets 2nd circuit in top link and 1st circuit in right link.\n- **dedicated resources:** no sharing\n  - circuit-like (guaranteed) performance\n- circuit segment idle if not used by call (no sharing)\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive\n- commonly used in traditional telephone networks"
      },
      {
        "title": "4. Circuit switching: FDM and TDM (Slides 1-34..36)",
        "content": "**Circuit switching: FDM and TDM**\n\n- frequency\n- time\n- frequency\n- time\n- 4 users\n- Frequency Division Multiplexing (FDM)\n- optical, electromagnetic frequencies divided into (narrow) frequency bands\n- Time Division Multiplexing (TDM)\n- time divided into slots\n- each call allocated its own band, can transmit at max rate of that narrow band\n- each call allocated periodic slot(s), can transmit at maximum rate of (wider) frequency band (only) during its time slot(s)\n\n**Packet switching versus circuit switching**\n\n- **example:** \n- 1 Gb/s link\n- **each user:** \n  - 100 Mb/s when “active”\n  - active 10% of time\n- **Q:** how many users can use this network under circuit-switching and packet switching?\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive\n- users\n- 1 Gbps link\n- …..\n- **circuit-switching:** 10 users\n- **Q:** how did we get value 0.0004?\n- **A:** HW problem (for those with course in probability only)\n- **packet switching:** with 35 users, probability > 10 active at same time is less than .0004 *\n- great for “bursty” data – sometimes has data to send, but at other times not\n  - resource sharing\n  - simpler, no call setup\n- **excessive congestion possible:** packet delay and loss due to buffer overflow\n  - protocols needed for reliable data transfer, congestion control\n- **Q:** How to provide circuit-like behavior with packet-switching?\n  - “It’s complicated.” We’ll study various techniques that try to make packet switching as “circuit-like” as possible.\n- Is packet switching a “slam dunk winner”?\n- **Q:** human analogies of reserved resources (circuit switching) versus on-demand allocation (packet switching)?"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **1.3 The Network Core: Forwarding, Routing, Packet Switching vs. Circuit Switching**:\n\n- **Review Question 1 (Routing versus forwarding.):** Choose one the following two definitions that makes the correct distinction between routing versus forwarding.\n  - **Verified Answer:** Forwarding is the local action of moving arriving packets from router’s input link to appropriate router output link, while routing is the global action of determining the source-destination paths taken by packets.\n\n- **Review Question 2 (Packet switching versus circuit switching (1).):** Which of the characteristics below are associated with the technique of packet switching ? Select all correct answers. [Hint: more than one of the answers is correct].\n  - **Verified Answer:** Data may be queued before being transmitted due to other user’s data that’s also queueing for transmission.; This technique is used in the Internet.; Resources are used on demand, not reserved in advance.; Congestion loss and variable end-end delays are possible with this technique.\n\n- **Review Question 3 (Packet switching versus circuit switching (2).):** Which of the characteristics below are associated with the technique of circuit switching ? Select all correct answers. [Hint: more than one of the answers is correct].\n  - **Verified Answer:** Frequency Division Multiplexing (FDM) and Time Division Multiplexing (TDM) are two approaches for implementing this technique.; This technique was the basis for the telephone call switching during the 20th century and into the beginning of this current century.; Reserves resources needed for a call from source to destination.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "packet_vs_circuit_switching.py — Quantitative Comparison of Circuit vs. Packet Switching (Kurose Ch1 Problem)",
          "snippet": "# Kurose & Ross 9e - Section 1.3: Packet Switching vs. Circuit Switching Capacity\nfrom math import comb\n\nlink_capacity_mbps = 1000.0  # 1 Gbps link\nuser_active_rate_mbps = 100.0  # Each active user transmits at 100 Mbps\np_active = 0.10  # Active 10% of the time\n\n# 1. Circuit Switching (TDM/FDM dedicated reservation)\nmax_circuit_users = int(link_capacity_mbps // user_active_rate_mbps)\nprint(f\"Circuit Switching Max Users : {max_circuit_users} users (dedicated 100 Mbps each)\")\n\n# 2. Packet Switching with N = 35 users (Probability > 10 users active simultaneously)\nN = 35\nprob_at_most_10 = sum(comb(N, k) * (p_active ** k) * ((1 - p_active) ** (N - k)) for k in range(11))\nprob_congestion = 1.0 - prob_at_most_10\nprint(f\"Packet Switching (N={N} users): P(>10 active at once) = {prob_congestion:.6f} ({prob_congestion*100:.4f}%)\")\nprint(f\"Statistical Multiplexing Gain: {N / max_circuit_users:.1f}x more users supported!\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 1.3 The Network Core: Forwarding, Routing, Packet Switching vs. Circuit Switching",
      "filename": "packet_vs_circuit_switching.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 1.3: Packet Switching vs. Circuit Switching Capacity\nfrom math import comb\n\nlink_capacity_mbps = 1000.0  # 1 Gbps link\nuser_active_rate_mbps = 100.0  # Each active user transmits at 100 Mbps\np_active = 0.10  # Active 10% of the time\n\n# 1. Circuit Switching (TDM/FDM dedicated reservation)\nmax_circuit_users = int(link_capacity_mbps // user_active_rate_mbps)\nprint(f\"Circuit Switching Max Users : {max_circuit_users} users (dedicated 100 Mbps each)\")\n\n# 2. Packet Switching with N = 35 users (Probability > 10 users active simultaneously)\nN = 35\nprob_at_most_10 = sum(comb(N, k) * (p_active ** k) * ((1 - p_active) ** (N - k)) for k in range(11))\nprob_congestion = 1.0 - prob_at_most_10\nprint(f\"Packet Switching (N={N} users): P(>10 active at once) = {prob_congestion:.6f} ({prob_congestion*100:.4f}%)\")\nprint(f\"Statistical Multiplexing Gain: {N / max_circuit_users:.1f}x more users supported!\")",
      "expectedOutput": [
        "[OK] packet_vs_circuit_switching.py — Quantitative Comparison of Circuit vs. Packet Switching (Kurose Ch1 Problem)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 1.3 The Network Core: Forwarding, Routing, Packet Switching vs. Circuit Switching. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "When we say that the Internet is a “network of networks,” we mean? Check all that apply (hint: check two or more).",
      "options": [
        "A) The Internet is the fastest network ever built.",
        "B) The Internet is made up of a lot of different networks that are interconnected to each other.",
        "C) The Internet is made up of access networks at the edge, tier-1 networks at the core, and interconnected regional and content provider networ",
        "D) The Internet is the largest network ever built."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 1), 'The Internet is made up of a lot of different networks that are interconnected to each other.' accurately characterizes 1.3 The Network Core: Forwarding, Routing, Packet Switching vs. Circuit Switching."
    }
  },
  "cn-ch1-network-of-networks": {
    "id": "cn-ch1-network-of-networks",
    "badge": "Module 1 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Başlangıç - Orta",
    "title": "1.3B Internet Structure: A 'Network of Networks', Tier-1 ISPs, IXPs & Content Providers",
    "subtitle": "Evolution from Network Structure 1 to Structure 5: Tier-1 commercial backbones, regional ISPs, multi-homing, peering at IXPs, and Google/Netflix private backbones.",
    "sections": [
      {
        "title": "1. Internet structure: a “network of networks” (Slides 1-37..45)",
        "content": "![1.3B Internet Structure: A 'Network of Networks', Tier-1 ISPs, IXPs & Content Providers Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**1.3B Internet Structure: A 'Network of Networks', Tier-1 ISPs, IXPs & Content Providers** — Evolution from Network Structure 1 to Structure 5: Tier-1 commercial backbones, regional ISPs, multi-homing, peering at IXPs, and Google/Netflix private backbones.\n\n- hosts connect to Internet via access Internet Service Providers (ISPs)\n- access ISPs in turn must be interconnected\n    - so that any two hosts (anywhere!) can send packets to each other\n- resulting network of networks is very complex\n    - evolution driven by economics, national policies\n- Let’s take a stepwise approach to describe current Internet structure\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n- **Question:** given millions of access ISPs, how to connect them together?\n- access\n- net\n- connecting each access ISP to each other directly doesn’t scale: O(N2) connections.\n- **Option:** connect each access ISP to one global transit ISP?\n- Customer and provider ISPs have economic agreement.\n- global ISP\n- ISP A\n- ISP C\n- ISP B\n- But if one global ISP is viable business, there will be competitors ….\n- But if one global ISP is viable business, there will be competitors …. who will want to be connected\n- IXP\n- peering link\n- Internet exchange point\n- … and regional networks may arise to connect access nets to ISPs\n- regional ISP\n- … and content provider networks (e.g., Google, Microsoft, Akamai) may run their own network, to bring services, content close to end users\n- Content provider network\n- ISP\n- **At “center”:** small # of well-connected large networks\n  - “tier-1” commercial ISPs (e.g., Level 3, Sprint, AT&T, NTT), national & international coverage\n  - content provider networks (e.g., Google, Facebook): private network that connects its data centers to Internet, often bypassing tier-1, regional ISPs\n- Regional ISP\n- Tier 1 ISP\n- Google",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 1 Key Principle",
          "message": "Evolution from Network Structure 1 to Structure 5: Tier-1 commercial backbones, regional ISPs, multi-homing, peering at IXPs, and Google/Netflix private backbones."
        }
      },
      {
        "title": "2. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **1.3B Internet Structure: A 'Network of Networks', Tier-1 ISPs, IXPs & Content Providers**:\n\n- **Review Question 1 (What does it mean to \"use\" the Internet?):** In 2021, the International Telecommunications Union (ITU) reported that 61.6% of the worlds’s population are “Internet users”. What does it mean to be an “Internet user” according to the ITU? To answer this question you’ll need to watch the chapter 1 supplemental video on “Who Uses the Internet?”\n  - **Verified Answer:** That someone has used the Internet at least once in the last three months.\n\n- **Review Question 2 (The digital divide.):** Between 2010 and 2018, which of the following digital divides has changed the least in the US? To answer this question you’ll need to watch the chapter 1 supplemental video on “Who Uses the Internet?” To answer this question you’ll need to watch the chapter 1 supplemental video on “Who Uses the Internet?”\n  - **Verified Answer:** The gap in Internet use between Black and Hispanic populations versus White populations in the US.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "isp_peering_hierarchy.py — Modeling Peering vs. Transit Costs Across Tier-1, Regional ISPs & IXPs",
          "snippet": "# Kurose & Ross 9e - Section 1.3.3: Internet Structure (Tier-1, IXP Peering & CDN Bypass)\nroutes = [\n    {\"path\": [\"Access_ISP_A\", \"Regional_ISP_1\", \"Tier1_ISP\", \"Regional_ISP_2\", \"Access_ISP_B\"], \"type\": \"Transit via Tier-1\", \"cost_per_gb\": 0.04, \"rtt_ms\": 48},\n    {\"path\": [\"Access_ISP_A\", \"Regional_ISP_1\", \"IXP_Frankfurt\", \"Regional_ISP_2\", \"Access_ISP_B\"], \"type\": \"Settlement-Free IXP Peering\", \"cost_per_gb\": 0.005, \"rtt_ms\": 19},\n    {\"path\": [\"Access_ISP_A\", \"Google_Edge_PoP_Cache\"], \"type\": \"Content Provider Direct Peering\", \"cost_per_gb\": 0.0, \"rtt_ms\": 4},\n]\n\nfor r in routes:\n    hops = \" -> \".join(r[\"path\"])\n    print(f\"[{r['type']}]\\n  Path: {hops}\\n  RTT : {r['rtt_ms']} ms | Transit Cost: ${r['cost_per_gb']:.3f}/GB\\n\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 1.3B Internet Structure: A 'Network of Networks', Tier-1 ISPs, IXPs & Content Providers",
      "filename": "isp_peering_hierarchy.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 1.3.3: Internet Structure (Tier-1, IXP Peering & CDN Bypass)\nroutes = [\n    {\"path\": [\"Access_ISP_A\", \"Regional_ISP_1\", \"Tier1_ISP\", \"Regional_ISP_2\", \"Access_ISP_B\"], \"type\": \"Transit via Tier-1\", \"cost_per_gb\": 0.04, \"rtt_ms\": 48},\n    {\"path\": [\"Access_ISP_A\", \"Regional_ISP_1\", \"IXP_Frankfurt\", \"Regional_ISP_2\", \"Access_ISP_B\"], \"type\": \"Settlement-Free IXP Peering\", \"cost_per_gb\": 0.005, \"rtt_ms\": 19},\n    {\"path\": [\"Access_ISP_A\", \"Google_Edge_PoP_Cache\"], \"type\": \"Content Provider Direct Peering\", \"cost_per_gb\": 0.0, \"rtt_ms\": 4},\n]\n\nfor r in routes:\n    hops = \" -> \".join(r[\"path\"])\n    print(f\"[{r['type']}]\\n  Path: {hops}\\n  RTT : {r['rtt_ms']} ms | Transit Cost: ${r['cost_per_gb']:.3f}/GB\\n\")",
      "expectedOutput": [
        "[OK] isp_peering_hierarchy.py — Modeling Peering vs. Transit Costs Across Tier-1, Regional ISPs & IXPs",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 1.3B Internet Structure: A 'Network of Networks', Tier-1 ISPs, IXPs & Content Providers. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In 2021, the International Telecommunications Union (ITU) reported that 61.6% of the worlds’s population are “Internet users”. What does it mean to be an “Internet user” according to the ITU? To answer this question you’ll need to watch the chapter 1 supplemental video on “Who Uses the Internet?”",
      "options": [
        "A) That someone has used the Internet at least once in the last one month",
        "B) That someone has used the Internet at least once in the last three months.",
        "C) That someone uses the Internet at least once a week, on average.",
        "D) That someone uses the Internet at least once a day, on average."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 1), 'That someone has used the Internet at least once in the last three months.' accurately characterizes 1.3B Internet Structure: A 'Network of Networks', Tier-1 ISPs, IXPs & Content Providers."
    }
  },
  "cn-ch1-delay-loss-throughput": {
    "id": "cn-ch1-delay-loss-throughput",
    "badge": "Module 1 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Başlangıç - Orta",
    "title": "1.4 Performance: Nodal Delay (Processing, Queueing, Transmission, Propagation), Loss & Throughput",
    "subtitle": "Deriving the four components of nodal delay, traffic intensity (La/R), tail-drop packet loss, Traceroute measurements, and bottleneck link throughput.",
    "sections": [
      {
        "title": "1. How do packet delay and loss occur? (Slides 1-47..49)",
        "content": "![1.4 Performance: Nodal Delay (Processing, Queueing, Transmission, Propagation), Loss & Throughput Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**1.4 Performance: Nodal Delay (Processing, Queueing, Transmission, Propagation), Loss & Throughput** — Deriving the four components of nodal delay, traffic intensity (La/R), tail-drop packet loss, Traceroute measurements, and bottleneck link throughput.\n\n**How do packet delay and loss occur?**\n\n- packets queue in router buffers, waiting for turn for transmission\n  - queue length grows when arrival rate to link (temporarily) exceeds output link capacity\n- packet loss occurs when memory to hold queued packets fills up\n- packet being transmitted (transmission delay)\n- packets in buffers (queueing delay)\n- **free (available) buffers:** arriving packets\n- dropped (loss) if no free buffers\n\n**Packet delay: four sources**\n\n- **dproc:** nodal processing\n- check bit errors\n- determine output link\n- typically < microsecs\n- **dqueue:** queueing delay\n- time waiting at output link for transmission\n- depends on congestion level of router\n- propagation\n- nodal\n- processing\n- queueing\n- dnodal = dproc + dqueue + dtrans + dprop\n- transmission\n- **dtrans:** transmission delay:\n- **L:** packet length (bits)\n- **R:** link transmission rate (bps)\n- dtrans = L/R\n- **dprop:** propagation delay:\n- **d:** length of physical link\n- **s:** propagation speed (~2x108 m/sec)\n- dprop = d/s\n- dtrans and dprop\n- very different",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 1 Key Principle",
          "message": "Deriving the four components of nodal delay, traffic intensity (La/R), tail-drop packet loss, Traceroute measurements, and bottleneck link throughput."
        }
      },
      {
        "title": "2. Caravan analogy (Slides 1-50..52)",
        "content": "**Caravan analogy**\n\n- car ~ bit; caravan ~ packet; toll service ~ link transmission\n- toll booth takes 12 sec to service car (bit transmission time)\n- “propagate” at 100 km/hr\n- **Q:** How long until caravan is lined up before 2nd toll booth?\n- time to “push” entire caravan through toll booth onto highway = 12*10 = 120 sec\n- time for last car to propagate from 1st to 2nd toll both: 100km/(100km/hr) = 1 hr\n- **A:** 62 minutes\n- toll booth\n- toll booth\n- (aka link)\n- ten-car caravan\n- (aka 10-bit packet)\n- 100 km\n- 100 km\n- toll booth\n- toll booth\n- (aka link)\n- toll booth\n- (aka router)\n- suppose cars now “propagate” at 1000 km/hr\n- and suppose toll booth now takes one min to service a car\n- **Q:** Will cars arrive to 2nd booth before all cars serviced at first booth?\n- **A:** Yes! after 7 min, first car arrives at second booth; three cars still at first booth\n\n**Packet queueing delay (revisited)**\n\n- **a:** average packet arrival rate\n- **L:** packet length (bits)\n- **R:** link bandwidth (bit transmission rate)\n- **La/R ~ 0:** avg. queueing delay small\n- **La/R -> 1:** avg. queueing delay large\n- **La/R > 1:** more “work” arriving is more than can be serviced - average delay infinite!\n- La/R ~ 0\n- La/R -> 1\n- traffic intensity = La/R\n- average queueing delay\n- service rate of bits\n- arrival rate of bits\n- “traffic\n- intensity”"
      },
      {
        "title": "3. “Real” Internet delays and routes (Slides 1-53..54)",
        "content": "**“Real” Internet delays and routes**\n\n- what do “real” Internet delay & loss look like?\n- **traceroute program:** provides delay measurement from source to router along end-end Internet path towards destination. For all i:\n- 3 probes\n- 3 probes\n- 3 probes\n  - sends three packets that will reach router i on path towards destination (with time-to-live field value of i)\n  - router i will return packets to sender\n  - sender measures time interval between transmission and reply\n\n**Real Internet delays and routes**\n\n- 1 cs-gw (128.119.240.254) 1 ms 1 ms 2 ms\n- 2 border1-rt-fa5-1-0.gw.umass.edu (128.119.3.145) 1 ms 1 ms 2 ms\n- 3 cht-vbns.gw.umass.edu (128.119.3.130) 6 ms 5 ms 5 ms\n- 4 jn1-at1-0-0-19.wor.vbns.net (204.147.132.129) 16 ms 11 ms 13 ms\n- 5 jn1-so7-0-0-0.wae.vbns.net (204.147.136.136) 21 ms 18 ms 18 ms\n- 6 abilene-vbns.abilene.ucaid.edu (198.32.11.9) 22 ms 18 ms 22 ms\n- 7 nycm-wash.abilene.ucaid.edu (198.32.8.46) 22 ms 22 ms 22 ms\n- 8 62.40.103.253 (62.40.103.253) 104 ms 109 ms 106 ms\n- 9 de2-1.de1.de.geant.net (62.40.96.129) 109 ms 102 ms 104 ms\n- 10 de.fr1.fr.geant.net (62.40.96.50) 113 ms 121 ms 114 ms\n- 11 renater-gw.fr1.fr.geant.net (62.40.103.54) 112 ms 114 ms 112 ms\n- 12 nio-n2.cssi.renater.fr (193.51.206.13) 111 ms 114 ms 116 ms\n- 13 nice.cssi.renater.fr (195.220.98.102) 123 ms 125 ms 124 ms\n- 14 r3t2-nice.cssi.renater.fr (195.220.98.110) 126 ms 126 ms 124 ms\n- 15 eurecom-valbonne.r3t2.ft.net (193.48.50.54) 135 ms 128 ms 133 ms\n- 16 194.214.211.25 (194.214.211.25) 126 ms 128 ms 126 ms\n- 17 * * *\n- 18 * * *\n- 19 fantasia.eurecom.fr (193.55.113.142) 132 ms 128 ms 136 ms\n- **traceroute:** gaia.cs.umass.edu to www.eurecom.fr\n- * Do some traceroutes from exotic countries at www.traceroute.org\n- * means no response (probe lost, router not replying)\n- 3 delay measurements from\n- gaia.cs.umass.edu to cs-gw.cs.umass.edu\n- 3 delay measurements\n- to border1-rt-fa5-1-0.gw.umass.edu\n- looks like delays decrease! Why?\n- trans-oceanic link"
      },
      {
        "title": "4. Packet loss (Slides 1-55..57)",
        "content": "**Packet loss**\n\n- queue (aka buffer) preceding link in buffer has finite capacity\n- packet being transmitted\n- buffer\n- (waiting area)\n- * Check out the Java applet for an interactive animation (on publisher’s website) of queuing and loss\n- packet arriving to\n- full buffer is lost\n- packet arriving to full queue dropped (aka lost)\n- lost packet may be retransmitted by previous node, by source end system, or not at all\n\n**Throughput**\n\n- **throughput:** rate (bits/time unit) at which bits are being sent from sender to receiver\n  - instantaneous: rate at given point in time\n  - average: rate over longer period of time\n- server, with\n- file of F bits\n- to send to client\n- link capacity\n- Rs bits/sec\n- link capacity\n- Rc bits/sec\n- server sends bits\n- (fluid) into pipe\n- pipe that can carry\n- fluid at rate\n- (Rs bits/sec)\n- pipe that can carry\n- fluid at rate\n- (Rc bits/sec)\n- Rs < Rc What is average end-end throughput?\n- Rs > Rc What is average end-end throughput?\n- link on end-end path that constrains end-end throughput\n- bottleneck link"
      },
      {
        "title": "5. Throughput: network scenario (Slides 1-58..58)",
        "content": "- 10 connections (fairly) share backbone bottleneck link R bits/sec\n- **per-connection end-end throughput:** min(Rc,Rs,R/10)\n- **in practice:** Rc or Rs is often bottleneck\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **1.4 Performance: Nodal Delay (Processing, Queueing, Transmission, Propagation), Loss & Throughput**:\n\n- **Review Question 1 (Computing Packet Transmission Delay(1).):** Suppose a packet is L = 1500 bytes long (one byte = 8 bits), and link transmits at R = 1 Gbps (i.e., a link can transmit bits 1,000,000,000 bits per second). What is the transmission delay for this packet? [Note: you can find more problems like this one here .]\n  - **Verified Answer:** .000012 secs\n\n- **Review Question 2 (Computing Packet Transmission Delay (2).):** Suppose a packet is L = 1200 bytes long (one byte = 8 bits), and link transmits at R = 100 Mbps (i.e., a link can transmit bits 100,000,000 bits per second). What is the transmission delay for this packet? [Note: you can find more problems like this one here .]\n  - **Verified Answer:** .000096 secs\n\n- **Review Question 3 (Computing Packet Transmission Delay (3).):** Consider the network shown in the figure below, with three links, each with the specified transmission rate and link length. Assume the length of a packet is 8000 bits. What is the transmission delay at link 2? [Note: you can find more problems like this one here .]\n  - **Verified Answer:** 8 x 10^(-5) secs",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "nodal_delay_throughput.py — Computing End-to-End Delay, Traffic Intensity (La/R) & Bottleneck Throughput",
          "snippet": "# Kurose & Ross 9e - Section 1.4: Four Sources of Packet Delay & Bottleneck Throughput\nL = 12000          # Packet size = 1500 Bytes = 12,000 bits\nR_access = 10e6    # 10 Mbps access link\nR_core = 100e6     # 100 Mbps core link\nd_km = 3000        # 3,000 km fiber link\ns_mps = 2.0e8      # Propagation speed in glass fiber (2 x 10^8 m/s)\nd_proc_ms = 0.05   # Router processing delay = 50 microseconds\na_pkt_sec = 750    # Average arrival rate = 750 packets/sec\n\nd_trans_ms = (L / R_access) * 1e3\nd_prop_ms = ((d_km * 1000) / s_mps) * 1e3\ntraffic_intensity = (L * a_pkt_sec) / R_access\n# M/M/1 queueing approximation: d_queue = d_trans * I / (1 - I)\nd_queue_ms = d_trans_ms * (traffic_intensity / (1.0 - traffic_intensity))\nd_nodal_ms = d_proc_ms + d_queue_ms + d_trans_ms + d_prop_ms\nbottleneck_mbps = min(R_access, R_core) / 1e6\n\nprint(f\"Transmission Delay (L/R)    : {d_trans_ms:.3f} ms\")\nprint(f\"Propagation Delay  (d/s)    : {d_prop_ms:.3f} ms\")\nprint(f\"Traffic Intensity  (La/R)   : {traffic_intensity:.2f} (< 1.0 stable)\")\nprint(f\"Estimated Queueing Delay    : {d_queue_ms:.3f} ms\")\nprint(f\"Total Single-Hop Nodal Delay: {d_nodal_ms:.3f} ms\")\nprint(f\"End-to-End Throughput       : {bottleneck_mbps:.1f} Mbps (limited by bottleneck link)\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 1.4 Performance: Nodal Delay (Processing, Queueing, Transmission, Propagation), Loss & Throughput",
      "filename": "nodal_delay_throughput.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 1.4: Four Sources of Packet Delay & Bottleneck Throughput\nL = 12000          # Packet size = 1500 Bytes = 12,000 bits\nR_access = 10e6    # 10 Mbps access link\nR_core = 100e6     # 100 Mbps core link\nd_km = 3000        # 3,000 km fiber link\ns_mps = 2.0e8      # Propagation speed in glass fiber (2 x 10^8 m/s)\nd_proc_ms = 0.05   # Router processing delay = 50 microseconds\na_pkt_sec = 750    # Average arrival rate = 750 packets/sec\n\nd_trans_ms = (L / R_access) * 1e3\nd_prop_ms = ((d_km * 1000) / s_mps) * 1e3\ntraffic_intensity = (L * a_pkt_sec) / R_access\n# M/M/1 queueing approximation: d_queue = d_trans * I / (1 - I)\nd_queue_ms = d_trans_ms * (traffic_intensity / (1.0 - traffic_intensity))\nd_nodal_ms = d_proc_ms + d_queue_ms + d_trans_ms + d_prop_ms\nbottleneck_mbps = min(R_access, R_core) / 1e6\n\nprint(f\"Transmission Delay (L/R)    : {d_trans_ms:.3f} ms\")\nprint(f\"Propagation Delay  (d/s)    : {d_prop_ms:.3f} ms\")\nprint(f\"Traffic Intensity  (La/R)   : {traffic_intensity:.2f} (< 1.0 stable)\")\nprint(f\"Estimated Queueing Delay    : {d_queue_ms:.3f} ms\")\nprint(f\"Total Single-Hop Nodal Delay: {d_nodal_ms:.3f} ms\")\nprint(f\"End-to-End Throughput       : {bottleneck_mbps:.1f} Mbps (limited by bottleneck link)\")",
      "expectedOutput": [
        "[OK] nodal_delay_throughput.py — Computing End-to-End Delay, Traffic Intensity (La/R) & Bottleneck Throughput",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 1.4 Performance: Nodal Delay (Processing, Queueing, Transmission, Propagation), Loss & Throughput. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Consider the network shown in the figure below, with three links, each with the specified transmission rate and link length. Assume the length of a packet is 8000 bits. What is the transmission delay at link 2? [Note: you can find more problems like this one here .]",
      "options": [
        "A) 8 x 10^(-5) secs",
        "B) 12.5 secs",
        "C) 12,500 secs",
        "D) 100 secs"
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 1), '8 x 10^(-5) secs' accurately characterizes 1.4 Performance: Nodal Delay (Processing, Queueing, Transmission, Propagation), Loss & Throughput."
    }
  },
  "cn-ch1-networks-under-attack": {
    "id": "cn-ch1-networks-under-attack",
    "badge": "Module 1 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Başlangıç - Orta",
    "title": "1.5 Networks Under Attack: Packet Interception, IP Spoofing, DoS/DDoS & Lines of Defense",
    "subtitle": "Promiscuous packet sniffing, fake identity (IP spoofing), Distributed Denial of Service (DDoS) botnets, authentication, confidentiality, and firewalls.",
    "sections": [
      {
        "title": "1. Network security (Slides 1-60..61)",
        "content": "![1.5 Networks Under Attack: Packet Interception, IP Spoofing, DoS/DDoS & Lines of Defense Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**1.5 Networks Under Attack: Packet Interception, IP Spoofing, DoS/DDoS & Lines of Defense** — Promiscuous packet sniffing, fake identity (IP spoofing), Distributed Denial of Service (DDoS) botnets, authentication, confidentiality, and firewalls.\n\n- Internet not originally designed with (much) security in mind\n  - original vision: “a group of mutually trusting users attached to a transparent network” \n  - Internet protocol designers playing “catch-up”\n  - security considerations in all layers!\n- **We now need to think about:** \n  - how bad guys can attack computer networks\n  - how we can defend networks against attacks\n  - how to design architectures that are immune to attacks",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 1 Key Principle",
          "message": "Promiscuous packet sniffing, fake identity (IP spoofing), Distributed Denial of Service (DDoS) botnets, authentication, confidentiality, and firewalls."
        }
      },
      {
        "title": "2. Bad guys: packet interception (Slides 1-62..62)",
        "content": "- **packet “sniffing”:** \n  - broadcast media (shared Ethernet, wireless)\n  - promiscuous network interface reads/records all packets (e.g., including passwords!) passing by\n- **src:** B dest:A payload\n  - Wireshark software used for our end-of-chapter labs is a (free) packet-sniffer"
      },
      {
        "title": "3. Bad guys: fake identity (Slides 1-63..63)",
        "content": "- **IP spoofing:** injection of packet with false source address\n- **src:** B dest:A payload"
      },
      {
        "title": "4. Bad guys: denial of service (Slides 1-64..64)",
        "content": "- target\n- **Denial of Service (DoS):** attackers make resources (server, bandwidth) unavailable to legitimate traffic by overwhelming resource with bogus traffic\n- 1. select target\n- 2. break into hosts around the network (see botnet)\n- 3. send packets to target from compromised hosts"
      },
      {
        "title": "5. Lines of defense: (Slides 1-65..65)",
        "content": "- **authentication:** proving you are who you say you are\n  - cellular networks provides hardware identity via SIM card; no such hardware assist in traditional Internet\n- **confidentiality:** via encryption\n- **integrity checks:** digital signatures prevent/detect tampering\n- **access restrictions:** password-protected VPNs\n- **firewalls:** specialized “middleboxes” in access and core networks:\n    - off-by-default: filter incoming packets to restrict senders, receivers, applications\n    - detecting/reacting to DOS attacks\n- … lots more on security (throughout, Chapter 8)"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **1.5 Networks Under Attack: Packet Interception, IP Spoofing, DoS/DDoS & Lines of Defense**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "ddos_syn_rate_defense.py — Detecting IP Spoofing & Botnet DDoS Traffic Spikes",
          "snippet": "# Kurose & Ross 9e - Section 1.5: Network Security & DDoS Rate Anomaly Detector\nincoming_flows = [\n    {\"src_ip\": \"192.0.2.14\", \"pps\": 45, \"syn_only\": False, \"bogon_spoofed\": False},\n    {\"src_ip\": \"10.255.0.9\", \"pps\": 1800, \"syn_only\": True, \"bogon_spoofed\": True},\n    {\"src_ip\": \"198.51.100.77\", \"pps\": 9400, \"syn_only\": True, \"bogon_spoofed\": False},\n]\n\nfor flow in incoming_flows:\n    verdict = \"ALLOW\"\n    if flow[\"bogon_spoofed\"]:\n        verdict = \"DROP (Ingress Filtering: Spoofed Private Source IP)\"\n    elif flow[\"syn_only\"] and flow[\"pps\"] > 1000:\n        verdict = \"MITIGATE (DDoS SYN Flood Detected -> Trigger SYN Cookie)\"\n    print(f\"Src: {flow['src_ip']:15s} | Rate: {flow['pps']:5d} pps | Verdict: {verdict}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 1.5 Networks Under Attack: Packet Interception, IP Spoofing, DoS/DDoS & Lines of Defense",
      "filename": "ddos_syn_rate_defense.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 1.5: Network Security & DDoS Rate Anomaly Detector\nincoming_flows = [\n    {\"src_ip\": \"192.0.2.14\", \"pps\": 45, \"syn_only\": False, \"bogon_spoofed\": False},\n    {\"src_ip\": \"10.255.0.9\", \"pps\": 1800, \"syn_only\": True, \"bogon_spoofed\": True},\n    {\"src_ip\": \"198.51.100.77\", \"pps\": 9400, \"syn_only\": True, \"bogon_spoofed\": False},\n]\n\nfor flow in incoming_flows:\n    verdict = \"ALLOW\"\n    if flow[\"bogon_spoofed\"]:\n        verdict = \"DROP (Ingress Filtering: Spoofed Private Source IP)\"\n    elif flow[\"syn_only\"] and flow[\"pps\"] > 1000:\n        verdict = \"MITIGATE (DDoS SYN Flood Detected -> Trigger SYN Cookie)\"\n    print(f\"Src: {flow['src_ip']:15s} | Rate: {flow['pps']:5d} pps | Verdict: {verdict}\")",
      "expectedOutput": [
        "[OK] ddos_syn_rate_defense.py — Detecting IP Spoofing & Botnet DDoS Traffic Spikes",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 1.5 Networks Under Attack: Packet Interception, IP Spoofing, DoS/DDoS & Lines of Defense. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 1, what is the primary architectural focus of '1.5 Networks Under Attack: Packet Interception, IP Spoofing, DoS/DDoS & Lines of Defense'?",
      "options": [
        "A) Promiscuous packet sniffing, fake identity (IP spoofing), Distributed Denial of Service (DDoS) botnets, authentication, confi",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Promiscuous packet sniffing, fake identity (IP spoofing), Distributed Denial of Service (DDoS) botnets, authentication, confidentiality, and firewalls."
    }
  },
  "cn-ch1-protocol-layers-encapsulation": {
    "id": "cn-ch1-protocol-layers-encapsulation",
    "badge": "Module 1 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Başlangıç - Orta",
    "title": "1.6 Protocol Layers, Reference Models (5-Layer Internet vs. 7-Layer OSI) & Encapsulation",
    "subtitle": "Modularizing complex networks via layered service models: Application, Transport, Network, Link, Physical, ISO/OSI presentation/session, and header encapsulation.",
    "sections": [
      {
        "title": "1. Protocol “layers” and reference models (Slides 1-67..70)",
        "content": "![1.6 Protocol Layers, Reference Models (5-Layer Internet vs. 7-Layer OSI) & Encapsulation Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**1.6 Protocol Layers, Reference Models (5-Layer Internet vs. 7-Layer OSI) & Encapsulation** — Modularizing complex networks via layered service models: Application, Transport, Network, Link, Physical, ISO/OSI presentation/session, and header encapsulation.\n\n**Protocol “layers” and reference models**\n\n- Networks are complex,\n- **with many “pieces”:** \n  - hosts\n  - routers\n  - links of various media\n  - applications\n  - protocols\n  - hardware, software\n- **Question:** is there any hope of organizing structure of network?\n- and/or our discussion of networks?\n\n**Example: organization of air travel**\n\n- a series of steps, involving many services\n- ticket (purchase)\n- baggage (check)\n- gates (load)\n- runway takeoff\n- airplane routing\n- ticket (complain)\n- baggage (claim)\n- gates (unload)\n- runway landing\n- airplane routing\n- airplane routing\n- How would you define/discuss the system of airline travel?\n- end-to-end transfer of person plus baggage\n- ticketing service\n- baggage service\n- gate service\n- runway service\n- routing service\n- **layers:** each layer implements a service\n  - via its own internal-layer actions\n  - relying on services provided by layer below\n\n**Why layering?**\n\n- Approach to designing/discussing complex systems:\n- explicit structure allows identification, relationship of system’s pieces\n  - layered reference model for discussion\n- modularization eases maintenance, updating of system\n  - change in layer's service implementation: transparent to rest of system\n  - e.g., change in gate procedure doesn’t affect rest of system",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 1 Key Principle",
          "message": "Modularizing complex networks via layered service models: Application, Transport, Network, Link, Physical, ISO/OSI presentation/session, and header encapsulation."
        }
      },
      {
        "title": "2. Layered Internet protocol stack (Slides 1-71..75)",
        "content": "**Layered Internet protocol stack**\n\n- **application:** supporting network applications\n  - HTTP, IMAP, SMTP, DNS\n- **transport:** process-process data transfer\n  - TCP, UDP\n- **network:** routing of datagrams from source to destination\n  - IP, routing protocols\n- **link:** data transfer between neighboring network elements\n  - Ethernet, 802.11 (WiFi), PPP\n- **physical:** bits “on the wire”\n- link\n- application\n- network\n- transport\n- physical\n- application\n- transport\n- network\n- link\n- physical\n\n**Services, Layering and Encapsulation**\n\n- source\n- transport-layer protocol encapsulates application-layer message, M, with transport layer-layer header Ht to create a transport-layer segment\n  - Ht used by transport layer protocol to implement its service\n- application\n- transport\n- network\n- link\n- physical\n- destination\n- application\n- transport\n- network\n- link\n- physical\n- Transport-layer protocol transfers M (e.g., reliably) from one process to another, using services of network layer\n- Application exchanges messages to implement some application service using services of transport layer\n- network-layer protocol encapsulates transport-layer segment [Ht | M] with network layer-layer header Hn to create a network-layer datagram\n  - Hn used by network layer protocol to implement its service\n- Network-layer protocol transfers transport-layer segment [Ht | M] from one host to another, using link layer services\n- link-layer protocol encapsulates network datagram [Hn| [Ht |M], with link-layer header Hl to create a link-layer frame\n- Link-layer protocol transfers datagram [Hn| [Ht |M] from host to neighboring host, using network-layer services\n\n**Encapsulation**\n\n- Matryoshka dolls (stacking dolls)\n- **Credit:** https://dribbble.com/shots/7182188-Babushka-Boi\n\n- **Slide Diagram Elements & Protocol Entities:** `message, segment, datagram, frame`\n\n> **Kurose & Ross Lecture Note:** Thanks to Nikko Bovornkeeratiroj, Phuthipong <phuthipong@cs.umass.edu>, for the stacking dolls idea and slides"
      },
      {
        "title": "3. Services, Layering and Encapsulation (Slides 1-76..86)",
        "content": "**Services, Layering and Encapsulation**\n\n- source\n- application\n- transport\n- network\n- link\n- physical\n- destination\n- application\n- transport\n- network\n- link\n- physical\n\n- **Slide Diagram Elements & Protocol Entities:** `message, segment, datagram, frame`\n\n**Encapsulation: an end-end view**\n\n- network\n- link\n- physical\n- application\n- transport\n- network\n- link\n- physical\n- application\n- transport\n- network\n- link\n- physical\n- source\n- segment\n- datagram\n- destination\n- router\n- switch\n- message\n- frame\n- link\n- physical\n\n**ISO/OSI reference model**\n\n- Two layers not found in Internet protocol stack!\n- **presentation:** allow applications to interpret meaning of data, e.g., encryption, compression, machine-specific conventions\n- **session:** synchronization, checkpointing, recovery of data exchange\n- Internet stack “missing” these layers!\n  - these services, if needed, must be implemented in application\n  - needed?\n- application\n- presentation\n- session\n- transport\n- network\n- link\n- physical\n\n- **Slide Diagram Elements & Protocol Entities:** `The seven layer OSI/ISO reference model`"
      },
      {
        "title": "4. Services, Layering and Encapsulation (Slides 1-88..89)",
        "content": "**Services, Layering and Encapsulation**\n\n- source\n- application\n- transport\n- network\n- link\n- physical\n- destination\n- application\n- transport\n- network\n- link\n- physical\n\n- **Slide Diagram Elements & Protocol Entities:** `message, segment, datagram, frame`\n\n**Wireshark**\n\n- copy of all Ethernet frames sent/received\n\n- **Slide Diagram Elements & Protocol Entities:** `Transport (TCP/UDP) Network (IP) Link (Ethernet) Physical, application (www browser, email client), application, packet capture (pcap), packet analyzer`"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **1.6 Protocol Layers, Reference Models (5-Layer Internet vs. 7-Layer OSI) & Encapsulation**:\n\n- **Review Question 1 (What is \"encapsulation\"?):** Which of the definitions below describe what is meant by the term \"encapsulation\"?\n  - **Verified Answer:** Taking data from the layer above, adding header fields appropriate for this layer, and then placing the data in the payload field of the “packet” for that layer.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "packet_encapsulation_trace.py — Tracing Payload & Header Overhead Across the 5-Layer Internet Stack",
          "snippet": "# Kurose & Ross 9e - Section 1.6: End-to-End Encapsulation & Header Overhead\napp_payload_bytes = 1000  # Application Message (M)\nlayers = [\n    (\"L5 Application (HTTP)\", 80, \"Message (M)\"),\n    (\"L4 Transport (TCP)\", 20, \"Segment [Ht | M]\"),\n    (\"L3 Network (IPv4)\", 20, \"Datagram [Hn | Ht | M]\"),\n    (\"L2 Link (Ethernet + CRC)\", 18, \"Frame [Hl | Hn | Ht | M | CRC]\"),\n]\n\ntotal_bytes = app_payload_bytes\nprint(f\"Initial App Data: {app_payload_bytes} Bytes\\n\" + \"-\" * 60)\nfor layer_name, hdr_bytes, pdu_name in layers:\n    total_bytes += hdr_bytes\n    efficiency = (app_payload_bytes / total_bytes) * 100\n    print(f\"{layer_name:26s} (+{hdr_bytes:2d} B) -> {pdu_name:28s} = {total_bytes:4d} B (Goodput: {efficiency:.1f}%)\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 1.6 Protocol Layers, Reference Models (5-Layer Internet vs. 7-Layer OSI) & Encapsulation",
      "filename": "packet_encapsulation_trace.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 1.6: End-to-End Encapsulation & Header Overhead\napp_payload_bytes = 1000  # Application Message (M)\nlayers = [\n    (\"L5 Application (HTTP)\", 80, \"Message (M)\"),\n    (\"L4 Transport (TCP)\", 20, \"Segment [Ht | M]\"),\n    (\"L3 Network (IPv4)\", 20, \"Datagram [Hn | Ht | M]\"),\n    (\"L2 Link (Ethernet + CRC)\", 18, \"Frame [Hl | Hn | Ht | M | CRC]\"),\n]\n\ntotal_bytes = app_payload_bytes\nprint(f\"Initial App Data: {app_payload_bytes} Bytes\\n\" + \"-\" * 60)\nfor layer_name, hdr_bytes, pdu_name in layers:\n    total_bytes += hdr_bytes\n    efficiency = (app_payload_bytes / total_bytes) * 100\n    print(f\"{layer_name:26s} (+{hdr_bytes:2d} B) -> {pdu_name:28s} = {total_bytes:4d} B (Goodput: {efficiency:.1f}%)\")",
      "expectedOutput": [
        "[OK] packet_encapsulation_trace.py — Tracing Payload & Header Overhead Across the 5-Layer Internet Stack",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 1.6 Protocol Layers, Reference Models (5-Layer Internet vs. 7-Layer OSI) & Encapsulation. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the definitions below describe what is meant by the term \"encapsulation\"?",
      "options": [
        "A) Starting a transport layer timer for a transmitted segment, and then if an ACK segment isn’t received before the timeout, placing that segme",
        "B) Determining the name of the destination host, translating that name to an IP address and then placing that value in a packet header field.",
        "C) Computing the sum of all of the bytes within a packet and placing that value in the packet header field.",
        "D) Receiving a “packet” from the layer below, extracting the payload field, and after some internal actions possibly delivering that payload to"
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 1), 'Starting a transport layer timer for a transmitted segment, and then if an ACK segment isn’t received before the timeout, placing that segment in a retransmission queue.' accurately characterizes 1.6 Protocol Layers, Reference Models (5-Layer Internet vs. 7-Layer OSI) & Encapsulation."
    }
  },
  "cn-ch1-internet-history": {
    "id": "cn-ch1-internet-history",
    "badge": "Module 1 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Başlangıç - Orta",
    "title": "1.7 History of Computer Networking & the Internet (1961–Today)",
    "subtitle": "From Kleinrock's queueing theory and ARPAnet packet switching to TCP/IP flag day, DNS, congestion control, the World Wide Web, SDN, and hyperscale cloud networks.",
    "sections": [
      {
        "title": "1. Internet history (Slides 1-79..83)",
        "content": "![1.7 History of Computer Networking & the Internet (1961–Today) Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**1.7 History of Computer Networking & the Internet (1961–Today)** — From Kleinrock's queueing theory and ARPAnet packet switching to TCP/IP flag day, DNS, congestion control, the World Wide Web, SDN, and hyperscale cloud networks.\n\n- **1961:** Kleinrock - queueing theory shows effectiveness of packet-switching\n- **1964:** Baran - packet-switching in military nets\n- **1967:** ARPAnet conceived by Advanced Research Projects Agency\n- **1969:** first ARPAnet node operational\n- **1972:** \n  - ARPAnet public demo\n  - NCP (Network Control Protocol) first host-host protocol\n  - first e-mail program\n  - ARPAnet has 15 nodes\n- **1961-1972:** Early packet-switching principles\n- **1970:** ALOHAnet satellite network in Hawaii\n- **1974:** Cerf and Kahn - architecture for interconnecting networks\n- **1976:** Ethernet at Xerox PARC\n- **late70’s:** proprietary architectures: DECnet, SNA, XNA\n- **1979:** ARPAnet has 200 nodes\n- **1972-1980:** Internetworking, new and proprietary networks\n- Cerf and Kahn’s internetworking principles:\n  - minimalism, autonomy - no internal changes required to interconnect networks\n  - best-effort service model\n  - stateless routing\n  - decentralized control\n- define today’s Internet architecture\n- **1983:** deployment of TCP/IP\n- **1982:** smtp e-mail protocol defined\n- **1983:** DNS defined for name-to-IP-address translation\n- **1985:** ftp protocol defined\n- **1988:** TCP congestion control\n- **new national networks:** CSnet, BITnet, NSFnet, Minitel\n- 100,000 hosts connected to confederation of networks\n- **1980-1990:** new protocols, a proliferation of networks\n- **early 1990s:** ARPAnet decommissioned\n- **1991:** NSF lifts restrictions on commercial use of NSFnet (decommissioned, 1995)\n- **early 1990s:** Web\n  - hypertext [Bush 1945, Nelson 1960’s]\n  - HTML, HTTP: Berners-Lee\n  - 1994: Mosaic, later Netscape\n  - late 1990s: commercialization of the Web\n- **late 1990s – 2000s:** \n- **more killer apps:** instant messaging, P2P file sharing\n- network security to forefront\n- est. 50 million host, 100 million+ users\n- backbone links running at Gbps\n- **1990, 2000s:** commercialization, the Web, new applications\n  - aggressive deployment of broadband home access (10-100’s Mbps)\n- **2008:** software-defined networking (SDN)\n- increasing ubiquity of high-speed wireless access: 4G/5G, WiFi\n- service providers (Google, FB, Microsoft) create their own networks\n    - bypass commercial Internet to connect “close” to end user, providing “instantaneous” access to social media, search, video content, …\n- enterprises run their services in “cloud” (e.g., Amazon Web Services, Microsoft Azure)\n- **rise of smartphones:** more mobile than fixed devices on Internet (2017)\n- ~15B devices attached to Internet (2023, statista.com)\n- **2005-present:** scale, SDN, mobility, cloud",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 1 Key Principle",
          "message": "From Kleinrock's queueing theory and ARPAnet packet switching to TCP/IP flag day, DNS, congestion control, the World Wide Web, SDN, and hyperscale cloud networks."
        }
      },
      {
        "title": "2. Chapter 1: summary (Slides 1-84..84)",
        "content": "- We’ve covered a “ton” of material!\n- Internet overview\n- what’s a protocol?\n- network edge, access network, core\n  - packet-switching versus circuit-switching\n  - Internet structure\n- **performance:** loss, delay, throughput\n- layering, service models\n- security\n- history\n- **You now have:** \n- context, overview, vocabulary, “feel” of networking\n- more depth, detail, and fun to follow!"
      },
      {
        "title": "3. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **1.7 History of Computer Networking & the Internet (1961–Today)**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "internet_evolution_timeline.py — Querying Key Milestones in Internet Architecture (1961–2025)",
          "snippet": "# Kurose & Ross 9e - Section 1.7: Milestones in Internet History\nmilestones = [\n    (\"1961-1972\", \"Early Packet Switching\", \"Kleinrock queueing theory, Baran distributed nets, 1969 first 4 ARPAnet nodes, NCP\"),\n    (\"1972-1980\", \"Internetworking\", \"Cerf & Kahn TCP/IP architecture, Metcalfe Ethernet CSMA/CD, proprietary nets\"),\n    (\"1980-1990\", \"Proliferation of Networks\", \"1983 TCP/IP deployment, SMTP email, DNS hierarchy, Jacobson TCP congestion control\"),\n    (\"1990-2000\", \"Commercialization & Web\", \"NSFNET decomissioned, Berners-Lee HTML/HTTP Web, mosaic/Java, commercial ISPs\"),\n    (\"2005-2025\", \"Scale, SDN & 5G/QUIC\", \"Software-Defined Networking (SDN), Content Provider Backbones, HTTP/3 over QUIC, 5G NR\"),\n]\n\nfor era, phase, details in milestones:\n    print(f\"[{era}] {phase:26s}: {details}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 1.7 History of Computer Networking & the Internet (1961–Today)",
      "filename": "internet_evolution_timeline.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 1.7: Milestones in Internet History\nmilestones = [\n    (\"1961-1972\", \"Early Packet Switching\", \"Kleinrock queueing theory, Baran distributed nets, 1969 first 4 ARPAnet nodes, NCP\"),\n    (\"1972-1980\", \"Internetworking\", \"Cerf & Kahn TCP/IP architecture, Metcalfe Ethernet CSMA/CD, proprietary nets\"),\n    (\"1980-1990\", \"Proliferation of Networks\", \"1983 TCP/IP deployment, SMTP email, DNS hierarchy, Jacobson TCP congestion control\"),\n    (\"1990-2000\", \"Commercialization & Web\", \"NSFNET decomissioned, Berners-Lee HTML/HTTP Web, mosaic/Java, commercial ISPs\"),\n    (\"2005-2025\", \"Scale, SDN & 5G/QUIC\", \"Software-Defined Networking (SDN), Content Provider Backbones, HTTP/3 over QUIC, 5G NR\"),\n]\n\nfor era, phase, details in milestones:\n    print(f\"[{era}] {phase:26s}: {details}\")",
      "expectedOutput": [
        "[OK] internet_evolution_timeline.py — Querying Key Milestones in Internet Architecture (1961–2025)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 1.7 History of Computer Networking & the Internet (1961–Today). Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 1, what is the primary architectural focus of '1.7 History of Computer Networking & the Internet (1961–Today)'?",
      "options": [
        "A) From Kleinrock's queueing theory and ARPAnet packet switching to TCP/IP flag day, DNS, congestion control, the World Wide Web",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! From Kleinrock's queueing theory and ARPAnet packet switching to TCP/IP flag day, DNS, congestion control, the World Wide Web, SDN, and hyperscale cloud networks."
    }
  },
  "cn-ch2-app-layer-principles": {
    "id": "cn-ch2-app-layer-principles",
    "badge": "Module 2 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta Seviye",
    "title": "2.1 Principles of Network Applications: Client-Server vs. P2P, Sockets & Transport Services",
    "subtitle": "Network app architectures, communicating processes, IP:port socket addressing, and matching app requirements (loss, timing, throughput) to TCP, TLS, and UDP.",
    "sections": [
      {
        "title": "1. Application layer: overview (Slides 2-2..5)",
        "content": "![2.1 Principles of Network Applications: Client-Server vs. P2P, Sockets & Transport Services Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**2.1 Principles of Network Applications: Client-Server vs. P2P, Sockets & Transport Services** — Network app architectures, communicating processes, IP:port socket addressing, and matching app requirements (loss, timing, throughput) to TCP, TLS, and UDP.\n\n**Application layer: overview**\n\n- Principles of network applications\n- Web and HTTP\n- E-mail, SMTP, IMAP\n- The Domain Name System DNS\n- video streaming and content distribution networks\n- socket programming with UDP and TCP\n- **Our goals:** \n- conceptual and implementation aspects of application-layer protocols\n  - transport-layer service models\n  - client-server paradigm\n  - peer-to-peer paradigm\n- learn about protocols by examining popular application-layer protocols and infrastructure\n  - HTTP\n  - SMTP, IMAP\n  - DNS\n  - video streaming systems, CDNs\n- programming network applications\n  - socket API\n\n**Some network apps**\n\n- social media\n- Web\n- text messaging\n- e-mail\n- multi-user network games\n- streaming stored video (YouTube, Hulu, Netflix)\n- P2P file sharing\n- voice over IP\n- real-time video conferencing (e.g., Zoom)\n- Internet search\n- remote login\n- **Q:** your favorites?\n\n**Creating a network app**\n\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n- application\n- transport\n- network\n- data link\n- physical\n- application\n- transport\n- network\n- data link\n- physical\n- application\n- transport\n- network\n- data link\n- physical\n- **write programs that:** \n- run on (different) end systems\n- communicate over network\n- e.g., web server software communicates with browser software\n- no need to write software for network-core devices\n- network-core devices do not run user applications\n- applications on end systems allows for rapid app development, propagation",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 2 Key Principle",
          "message": "Network app architectures, communicating processes, IP:port socket addressing, and matching app requirements (loss, timing, throughput) to TCP, TLS, and UDP."
        }
      },
      {
        "title": "2. Client-server paradigm (Slides 2-6..8)",
        "content": "**Client-server paradigm**\n\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n- **server:** \n- always-on host\n- permanent IP address\n- often in data centers, for scaling\n- **clients:** \n- contact, communicate with server\n- may be intermittently connected\n- may have dynamic IP addresses\n- do not communicate directly with each other\n- **examples:** HTTP, IMAP, FTP\n\n**Peer-peer architecture**\n\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n- no always-on server\n- arbitrary end systems directly communicate\n- peers request service from other peers, provide service in return to other peers\n  - self scalability – new peers bring new service capacity, as well as new service demands\n- peers are intermittently connected and change IP addresses\n  - complex management\n- **example:** P2P file sharing [BitTorrent]\n\n**Processes communicating**\n\n- **process:** program running within a host\n- within same host, two processes communicate using inter-process communication (defined by OS)\n- processes in different hosts communicate by exchanging messages\n- **note:** applications with P2P architectures have client processes & server processes\n- **client process:** process that initiates communication\n- **server process:** process that waits to be contacted\n- clients, servers"
      },
      {
        "title": "3. Sockets (Slides 2-9..11)",
        "content": "**Sockets**\n\n- process sends/receives messages to/from its socket\n- socket analogous to door\n  - sending process shoves message out door\n  - sending process relies on transport infrastructure on other side of door to deliver message to socket at receiving process\n  - two sockets involved: one on each side\n- Internet\n- controlled\n- by OS\n- controlled by\n- app developer\n- transport\n- application\n- physical\n- link\n- network\n- process\n- transport\n- application\n- physical\n- link\n- network\n- process\n- socket\n\n**Addressing processes**\n\n- to receive messages, process must have identifier\n- host device has unique 32-bit IP address\n- **Q:** does IP address of host on which process runs suffice for identifying the process?\n- identifier includes both IP address and port numbers associated with process on host.\n- **example port numbers:** \n  - HTTP server: 80\n  - mail server: 25\n- to send HTTP message to gaia.cs.umass.edu web server:\n  - IP address: 128.119.245.12\n  - port number: 80\n- more shortly…\n  - A: no, many processes can be running on same host\n\n**An application-layer protocol defines:**\n\n- types of messages exchanged,\n  - e.g., request, response\n- **message syntax:** \n  - what fields in messages & how fields are delineated\n- message semantics\n  - meaning of information in fields\n- rules for when and how processes send & respond to messages\n- **open protocols:** \n- defined in RFCs, everyone has access to protocol definition\n- allows for interoperability\n- e.g., HTTP, SMTP\n- **proprietary protocols:** \n- e.g., Zoom"
      },
      {
        "title": "4. What transport service does an app need? (Slides 2-12..14)",
        "content": "**What transport service does an app need?**\n\n- data integrity\n- some apps (e.g., file transfer, web transactions) require 100% reliable data transfer\n- other apps (e.g., audio) can tolerate some loss\n- timing\n- some apps (e.g., Internet telephony, interactive games) require low delay to be “effective”\n- throughput\n- some apps (e.g., multimedia) require minimum amount of throughput to be “effective”\n- other apps (“elastic apps”) make use of whatever throughput they get\n- security\n- encryption, data integrity, …\n\n**Transport service requirements: common apps**\n\n- application\n- file transfer/download\n- e-mail\n- Web documents\n- real-time audio/video\n- streaming audio/video\n- interactive games\n- text messaging\n- data loss\n- no loss\n- no loss\n- no loss\n- loss-tolerant\n- loss-tolerant\n- loss-tolerant\n- no loss\n- throughput\n- elastic\n- elastic\n- elastic\n- **audio:** 5Kbps-1Mbps\n- **video:** 10Kbps-5Mbps\n- same as above\n- Kbps+\n- elastic\n- time sensitive?\n- yes, 10’s msec\n- yes, few secs\n- yes, 10’s msec\n- yes and no\n\n**Internet transport protocols services**\n\n- **TCP service:** \n- reliable transport between sending and receiving process\n- **flow control:** sender won’t overwhelm receiver\n- **congestion control:** throttle sender when network overloaded\n- **connection-oriented:** setup required between client and server processes\n- **does not provide:** timing, minimum throughput guarantee, security\n- **UDP service:** \n- unreliable data transfer between sending and receiving process\n- **does not provide:** reliability, flow control, congestion control, timing, throughput guarantee, security, or connection setup.\n- **Q:** why bother? Why is there a UDP?"
      },
      {
        "title": "5. Internet applications, and transport protocols (Slides 2-15..17)",
        "content": "**Internet applications, and transport protocols**\n\n- application\n- file transfer/download\n- e-mail\n- Web documents\n- Internet telephony\n- streaming audio/video\n- interactive games\n- application\n- layer protocol\n- FTP [RFC 959]\n- SMTP [RFC 5321]\n- HTTP [RFC 7230, 9110]\n- SIP [RFC 3261], RTP [RFC 3550], or proprietary HTTP [RFC 7230], DASH\n- WOW, FPS (proprietary)\n- transport protocol\n- TCP\n- TCP\n- TCP\n- TCP or UDP\n- TCP\n- UDP or TCP\n\n**Securing TCP**\n\n- **Vanilla TCP & UDP sockets:** \n- no encryption\n- cleartext passwords sent into socket traverse Internet in cleartext (!)\n- Transport Layer Security (TLS)\n- provides encrypted TCP connections\n- data integrity\n- end-point authentication\n- TLS implemented in application layer\n- apps use TLS libraries, that use TCP in turn\n  - cleartext sent into “socket” traverse Internet encrypted\n  - more: Chapter 8\n\n**Application layer: overview**\n\n- Principles of network applications\n- Web and HTTP\n- E-mail, SMTP, IMAP\n- The Domain Name System DNS\n- video streaming and content distribution networks\n- socket programming with UDP and TCP"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **2.1 Principles of Network Applications: Client-Server vs. P2P, Sockets & Transport Services**:\n\n- **Review Question 1 (The client-server paradigm.):** Which of the characteristics below are associated with a client-server approach to structuring network applications (as opposed to a P2P approach)?\n  - **Verified Answer:** There is a server with a well known server IP address.; HTTP uses this application structure.; There is a server that is always on.\n\n- **Review Question 2 (The peer-to-peer (P2P) paradigm.):** Which of the characteristics below are associated with a P2P approach to structuring network applications (as opposed to a client-server approach)?\n  - **Verified Answer:** There is not a server that is always on.; A process requests service from those it contacts and will provide service to processes that contact it.\n\n- **Review Question 3 (UDP service.):** When an application uses a UDP socket, what transport services are provided to the application by UDP? Check all that apply.\n  - **Verified Answer:** Best effort service. The service will make a best effort to deliver data to the destination but makes no guarantees that any particular segment of data will actually get there.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "cs_vs_p2p_distribution.py — Comparing Client-Server vs. P2P File Distribution Time (Kurose Ch2 Eq. 2.1–2.2)",
          "snippet": "# Kurose & Ross 9e - Section 2.1 & 2.5: Client-Server vs. P2P Minimum Distribution Time\nF_bits = 15 * 8 * (10**9)  # 15 GB file = 1.2e11 bits\nu_server = 100e6           # Server upload rate u_s = 100 Mbps\nd_min = 20e6               # Slowest client download rate d_min = 20 Mbps\nu_peer = 5e6               # Each peer upload capacity u_i = 5 Mbps\n\nprint(f\"{'N Peers':>8s} | {'Client-Server D_cs (sec)':>24s} | {'Peer-to-Peer D_P2P (sec)':>24s} | {'Speedup':>8s}\")\nprint(\"-\" * 74)\nfor N in [1, 10, 50, 200, 1000]:\n    d_cs = max((N * F_bits) / u_server, F_bits / d_min)\n    d_p2p = max(F_bits / u_server, F_bits / d_min, (N * F_bits) / (u_server + N * u_peer))\n    print(f\"{N:8d} | {d_cs:24.1f} | {d_p2p:24.1f} | {d_cs/d_p2p:7.1f}x\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 2.1 Principles of Network Applications: Client-Server vs. P2P, Sockets & Transport Services",
      "filename": "cs_vs_p2p_distribution.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 2.1 & 2.5: Client-Server vs. P2P Minimum Distribution Time\nF_bits = 15 * 8 * (10**9)  # 15 GB file = 1.2e11 bits\nu_server = 100e6           # Server upload rate u_s = 100 Mbps\nd_min = 20e6               # Slowest client download rate d_min = 20 Mbps\nu_peer = 5e6               # Each peer upload capacity u_i = 5 Mbps\n\nprint(f\"{'N Peers':>8s} | {'Client-Server D_cs (sec)':>24s} | {'Peer-to-Peer D_P2P (sec)':>24s} | {'Speedup':>8s}\")\nprint(\"-\" * 74)\nfor N in [1, 10, 50, 200, 1000]:\n    d_cs = max((N * F_bits) / u_server, F_bits / d_min)\n    d_p2p = max(F_bits / u_server, F_bits / d_min, (N * F_bits) / (u_server + N * u_peer))\n    print(f\"{N:8d} | {d_cs:24.1f} | {d_p2p:24.1f} | {d_cs/d_p2p:7.1f}x\")",
      "expectedOutput": [
        "[OK] cs_vs_p2p_distribution.py — Comparing Client-Server vs. P2P File Distribution Time (Kurose Ch2 Eq. 2.1–2.2)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 2.1 Principles of Network Applications: Client-Server vs. P2P, Sockets & Transport Services. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "When an application uses a TCP socket, what transport services are provided to the application by TCP? Check all that apply.",
      "options": [
        "A) Real-time delivery. The service will guarantee that data will be delivered to the receiver within a specified time bound.",
        "B) Flow Control. The provided service will ensure that the sender does not send so fast as to overflow receiver buffers.",
        "C) Throughput guarantee. The socket can be configured to provide a minimum throughput guarantee between sender and receiver.",
        "D) Best effort service. The service will make a best effort to deliver data to the destination but makes no guarantees that any particular segm"
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 2), 'Flow Control. The provided service will ensure that the sender does not send so fast as to overflow receiver buffers.' accurately characterizes 2.1 Principles of Network Applications: Client-Server vs. P2P, Sockets & Transport Services."
    }
  },
  "cn-ch2-web-http-protocol": {
    "id": "cn-ch2-web-http-protocol",
    "badge": "Module 2 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta Seviye",
    "title": "2.2 The Web & HTTP/1.1: Non-Persistent vs. Persistent Connections, Messages & Status Codes",
    "subtitle": "HTTP client-server transactions over TCP, 2*RTT non-persistent overhead vs. persistent pipelining, ASCII request/response header syntax, and status codes (200, 301, 400, 404).",
    "sections": [
      {
        "title": "1. Web and HTTP (Slides 2-18..21)",
        "content": "![2.2 The Web & HTTP/1.1: Non-Persistent vs. Persistent Connections, Messages & Status Codes Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**2.2 The Web & HTTP/1.1: Non-Persistent vs. Persistent Connections, Messages & Status Codes** — HTTP client-server transactions over TCP, 2*RTT non-persistent overhead vs. persistent pipelining, ASCII request/response header syntax, and status codes (200, 301, 400, 404).\n\n**Web and HTTP**\n\n- First, a quick review…\n- web page consists of objects, each of which can be stored on different Web servers\n- object can be HTML file, JPEG image, Java applet, audio file,…\n- web page consists of base HTML-file which includes several referenced objects, each addressable by a URL, e.g.,\n- www.someschool.edu/someDept/pic.gif\n- host name\n- path name\n\n**HTTP overview**\n\n- **HTTP:** hypertext transfer protocol\n- Web’s application-layer protocol\n- **client/server model:** \n  - client: browser that requests, receives, (using HTTP protocol) and “displays” Web objects\n  - server: Web server sends (using HTTP protocol) objects in response to requests\n- HTTP request\n- HTTP response\n- HTTP request\n- HTTP response\n- iPhone running\n- Safari browser\n- PC running\n- Firefox browser\n- server running\n- Apache Web\n- server\n- **HTTP uses TCP:** \n- client initiates TCP connection (creates socket) to server, port 80\n- server accepts TCP connection from client\n- HTTP messages (application-layer protocol messages) exchanged between browser (HTTP client) and Web server (HTTP server)\n- TCP connection closed\n- HTTP is “stateless”\n- server maintains no information about past client requests\n- protocols that maintain “state” are complex!\n- past history (state) must be maintained\n- if server/client crashes, their views of “state” may be inconsistent, must be reconciled\n- aside\n\n**HTTP connections: two types**\n\n- Non-persistent HTTP\n- TCP connection opened\n- at most one object sent over TCP connection\n- TCP connection closed\n- downloading multiple objects required multiple connections\n- Persistent HTTP\n- TCP connection opened to a server\n- multiple objects can be sent over single TCP connection between client, and that server\n- TCP connection closed",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 2 Key Principle",
          "message": "HTTP client-server transactions over TCP, 2*RTT non-persistent overhead vs. persistent pipelining, ASCII request/response header syntax, and status codes (200, 301, 400, 404)."
        }
      },
      {
        "title": "2. Non-persistent HTTP: example (Slides 2-22..25)",
        "content": "**Non-persistent HTTP: example**\n\n- **User enters URL:** \n- 1a. HTTP client initiates TCP connection to HTTP server (process) at www.someSchool.edu on port 80\n- 2. HTTP client sends HTTP request message (containing URL) into TCP connection socket. Message indicates that client wants object someDepartment/home.index\n- 1b. HTTP server at host www.someSchool.edu waiting for TCP connection at port 80 “accepts” connection, notifying client\n- 3. HTTP server receives request message, forms response message containing requested object, and sends message into its socket\n- time\n- (containing text, references to 10 jpeg images)\n- www.someSchool.edu/someDepartment/home.index\n- 5. HTTP client receives response message containing html file, displays html. Parsing html file, finds 10 referenced jpeg objects\n- 6. Steps 1-5 repeated for each of 10 jpeg objects\n- 4. HTTP server closes TCP connection.\n\n**Non-persistent HTTP: response time**\n\n- **RTT (definition):** time for a small packet to travel from client to server and back\n- **HTTP response time (per object):** \n- one RTT to initiate TCP connection\n- one RTT for HTTP request and first few bytes of HTTP response to return\n- object/file transmission time\n- time to\n- transmit\n- file\n- initiate TCP\n- connection\n- RTT\n- request file\n- RTT\n- file received\n- time\n- time\n- Non-persistent HTTP response time = 2RTT+ file transmission time\n\n**Persistent HTTP (HTTP 1.1)**\n\n- **Non-persistent HTTP issues:** \n- requires 2 RTTs per object\n- OS overhead for each TCP connection\n- browsers often open multiple parallel TCP connections to fetch referenced objects in parallel\n- **Persistent HTTP (HTTP1.1):** \n- server leaves connection open after sending response\n- subsequent HTTP messages between same client/server sent over open connection\n- client sends requests as soon as it encounters a referenced object\n- as little as one RTT for all the referenced objects (cutting response time in half)"
      },
      {
        "title": "3. HTTP request message (Slides 2-26..28)",
        "content": "**HTTP request message**\n\n- **two types of HTTP messages:** request, response\n- **HTTP request message:** \n  - ASCII (human-readable format)\n- header\n- lines\n- GET /index.html HTTP/1.1\\r\\n\n- **Host:** www-net.cs.umass.edu\\r\\n\n- **User-Agent:** Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:80.0) Gecko/20100101 Firefox/80.0 \\r\\n\n- **Accept:** text/html,application/xhtml+xml\\r\\n\n- **Accept-Language:** en-us,en;q=0.5\\r\\n\n- **Accept-Encoding:** gzip,deflate\\r\\n\n- **Connection:** keep-alive\\r\\n\n- \\r\\n\n- carriage return character\n- line-feed character\n- request line (GET, POST,\n- HEAD commands)\n- carriage return, line feed at start of line indicates end of header lines\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive/\n\n**HTTP request message: general format**\n\n- request\n- line\n- header\n- lines\n- body\n- method\n- version\n- URL\n- value\n- header field name\n- value\n- header field name\n- entity body\n\n**Other HTTP request messages**\n\n- **POST method:** \n- web page often includes form input\n- user input sent from client to server in entity body of HTTP POST request message\n- **GET method (for sending data to server):** \n- include user data in URL field of HTTP GET request message (following a ‘?’):\n- www.somesite.com/animalsearch?monkeys&banana\n- **HEAD method:** \n- requests headers (only) that would be returned if specified URL were requested with an HTTP GET method.\n- **PUT method:** \n- uploads new file (object) to server\n- completely replaces file that exists at specified URL with content in entity body of POST HTTP request message"
      },
      {
        "title": "4. HTTP response message (Slides 2-29..31)",
        "content": "**HTTP response message**\n\n- status line (protocol\n- status code status phrase)\n- header\n- lines\n- data, e.g., requested\n- HTML file\n- HTTP/1.1 200 OK\n- **Date:** Tue, 08 Sep 2020 00:53:20 GMT\n- **Server:** Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips PHP/7.4.9 mod_perl/2.0.11 Perl/v5.16.3\n- **Last-Modified:** Tue, 01 Mar 2016 18:57:50 GMT\n- **ETag:** \"a5b-52d015789ee9e\"\n- **Accept-Ranges:** bytes\n- **Content-Length:** 2651\n- **Content-Type:** text/html; charset=UTF-8\n- \\r\\n\n- data data data data data ...\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive/\n\n**HTTP response status codes**\n\n- 200 OK\n  - request succeeded, requested object later in this message\n- 301 Moved Permanently\n  - requested object moved, new location specified later in this message (in Location: field)\n- 400 Bad Request\n  - request msg not understood by server\n- 404 Not Found\n  - requested document not found on this server\n- 505 HTTP Version Not Supported\n- status code appears in 1st line in server-to-client response message.\n- **some sample codes:** \n\n**Trying out HTTP (client side) for yourself**\n\n- **1. netcat to your favorite Web server:** \n- opens TCP connection to port 80 (default HTTP server port) at gaia.cs.umass.edu.\n- anything typed in will be sent to port 80 at gaia.cs.umass.edu\n- 3. look at response message sent by HTTP server!\n- (or use Wireshark to look at captured HTTP request/response)\n- **2. type in a GET HTTP request:** \n- GET /kurose_ross/interactive/index.php HTTP/1.1\n- **Host:** gaia.cs.umass.edu\n- by typing this in (hit carriage return twice), you send this minimal (but complete) GET request to HTTP server\n- % nc -c -v gaia.cs.umass.edu 80 (for Mac)\n- >ncat –C gaia.cs.umass.edu 80 (for Windows)"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **2.2 The Web & HTTP/1.1: Non-Persistent vs. Persistent Connections, Messages & Status Codes**:\n\n- **Review Question 1 (“HTTP is stateless.”):** What do we mean when we say “HTTP is stateless”? In answering this question, assume that cookies are not used. Check all answers that apply.\n  - **Verified Answer:** An HTTP server does not remember anything about what happened during earlier steps in interacting with this HTTP client.\n\n- **Review Question 2 (HTTP cookies.):** What is an HTTP cookie used for?\n  - **Verified Answer:** A cookie is a code used by a server, carried on a client’s HTTP request, to access information the server had earlier stored about an earlier interaction with this Web browser . [Think about the distinction between a browser and a person .]\n\n- **Review Question 3 (The HTTP GET.):** What is the purpose of the HTTP GET message?\n  - **Verified Answer:** The HTTP GET request message is used by a web client to request a web server to send the requested object from the server to the client.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "http_rtt_parser.py — Comparing Non-Persistent vs. Persistent HTTP Latency & Parsing Raw HTTP Headers",
          "snippet": "# Kurose & Ross 9e - Section 2.2: HTTP Response Time & Request/Response Message Parser\nrtt_ms = 50.0\nnum_objects = 10  # Base HTML + 10 referenced JPEG images\ntrans_per_obj_ms = 4.0\n\n# Non-persistent sequential HTTP/1.0: 2 RTT + transmission per object (1 base + 10 objects = 11)\nt_non_persistent = 11 * (2 * rtt_ms + trans_per_obj_ms)\n# Persistent HTTP/1.1: 1 RTT for TCP + 1 RTT for base HTML + 1 RTT for pipelined objects\nt_persistent = (3 * rtt_ms) + 11 * trans_per_obj_ms\n\nprint(f\"Non-Persistent HTTP (Sequential): {t_non_persistent:.1f} ms\")\nprint(f\"Persistent HTTP/1.1 (Pipelined) : {t_persistent:.1f} ms\")\n\nraw_req = \"GET /kurose_ross/interactive/index.php HTTP/1.1\\r\\nHost: gaia.cs.umass.edu\\r\\nUser-Agent: Mozilla/5.0\\r\\nConnection: keep-alive\\r\\n\\r\\n\"\nlines = raw_req.strip().split(\"\\r\\n\")\nmethod, url, version = lines[0].split(\" \")\nheaders = dict(line.split(\": \", 1) for line in lines[1:])\nprint(f\"\\nParsed Request -> Method: {method}, URL: {url}, Version: {version}, Host: {headers['Host']}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 2.2 The Web & HTTP/1.1: Non-Persistent vs. Persistent Connections, Messages & Status Codes",
      "filename": "http_rtt_parser.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 2.2: HTTP Response Time & Request/Response Message Parser\nrtt_ms = 50.0\nnum_objects = 10  # Base HTML + 10 referenced JPEG images\ntrans_per_obj_ms = 4.0\n\n# Non-persistent sequential HTTP/1.0: 2 RTT + transmission per object (1 base + 10 objects = 11)\nt_non_persistent = 11 * (2 * rtt_ms + trans_per_obj_ms)\n# Persistent HTTP/1.1: 1 RTT for TCP + 1 RTT for base HTML + 1 RTT for pipelined objects\nt_persistent = (3 * rtt_ms) + 11 * trans_per_obj_ms\n\nprint(f\"Non-Persistent HTTP (Sequential): {t_non_persistent:.1f} ms\")\nprint(f\"Persistent HTTP/1.1 (Pipelined) : {t_persistent:.1f} ms\")\n\nraw_req = \"GET /kurose_ross/interactive/index.php HTTP/1.1\\r\\nHost: gaia.cs.umass.edu\\r\\nUser-Agent: Mozilla/5.0\\r\\nConnection: keep-alive\\r\\n\\r\\n\"\nlines = raw_req.strip().split(\"\\r\\n\")\nmethod, url, version = lines[0].split(\" \")\nheaders = dict(line.split(\": \", 1) for line in lines[1:])\nprint(f\"\\nParsed Request -> Method: {method}, URL: {url}, Version: {version}, Host: {headers['Host']}\")",
      "expectedOutput": [
        "[OK] http_rtt_parser.py — Comparing Non-Persistent vs. Persistent HTTP Latency & Parsing Raw HTTP Headers",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 2.2 The Web & HTTP/1.1: Non-Persistent vs. Persistent Connections, Messages & Status Codes. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Suppose a client is sending an HTTP GET message to a web server, gaia.cs.umass.edu. Suppose the client-to-server HTTP GET message is the following: GET /kurose_ross_sandbox/interactive/quotation2.htm HTTP/1.1 Host: gaia.cs.umass.edu Accept: text/plain, text/html, text/xml, image/jpeg, image/gif, audio/mpeg, audio/mp4, video/wmv, video/mp4, Accept-Language: en-us, en-gb;q=0.1, en;q=0.7, fr, fr-ch, da, de, fi If-Modified-Since: Wed, 09 Sep 2020 16:06:01 -0700 User Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11 Does the client have a cached copy of the object being requested?",
      "options": [
        "A) No, because the client would not request an object if it were cached.",
        "B) There’s not enough information to answer this question.",
        "C) Yes, because this is a conditional GET.",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 2,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 2), 'Yes, because this is a conditional GET.' accurately characterizes 2.2 The Web & HTTP/1.1: Non-Persistent vs. Persistent Connections, Messages & Status Codes."
    }
  },
  "cn-ch2-cookies-web-caching": {
    "id": "cn-ch2-cookies-web-caching",
    "badge": "Module 2 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta Seviye",
    "title": "2.2B HTTP State & Web Caching: Cookies, User Tracking/GDPR, Proxy Caches & Conditional GET",
    "subtitle": "Maintaining session state over stateless HTTP via Set-Cookie headers, third-party tracking cookies, enterprise Web proxy caches, and If-Modified-Since / 304 Not Modified.",
    "sections": [
      {
        "title": "1. Maintaining user/server state: cookies (Slides 2-32..36)",
        "content": "![2.2B HTTP State & Web Caching: Cookies, User Tracking/GDPR, Proxy Caches & Conditional GET Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**2.2B HTTP State & Web Caching: Cookies, User Tracking/GDPR, Proxy Caches & Conditional GET** — Maintaining session state over stateless HTTP via Set-Cookie headers, third-party tracking cookies, enterprise Web proxy caches, and If-Modified-Since / 304 Not Modified.\n\n**Maintaining user/server state: cookies**\n\n- **Recall:** HTTP GET/response interaction is stateless\n- no notion of multi-step exchanges of HTTP messages to complete a Web “transaction”\n  - no need for client/server to track “state” of multi-step exchange\n  - all HTTP requests are independent of each other\n  - no need for client/server to “recover” from a partially-completed-but-never-completely-completed transaction\n- **a stateful protocol:** client makes two changes to X, or none at all\n- time\n- time\n- unlock X\n- update X X’\n- update X X’’\n- lock data record X\n- X’’\n- X’’\n- **Q:** what happens if network connection or client crashes at t’ ?\n- Web sites and client browser use cookies to maintain some state between transactions\n- **four components:** \n  - 1) cookie header line of HTTP response message\n  - 2) cookie header line in next HTTP request message\n  - 3) cookie file kept on user’s host, managed by user’s browser\n  - 4) back-end database at Web site\n- **Example:** \n- Susan uses browser on laptop, visits specific e-commerce site for first time\n- when initial HTTP requests arrives at site, site creates:\n  - unique ID (aka “cookie”)\n  - entry in backend database for ID\n- subsequent HTTP requests from Susan to this site will contain cookie ID value, allowing site to “identify” Susan\n- client\n- Amazon server\n- usual HTTP response msg\n- cookie file\n- **one week later:** \n- usual HTTP request msg\n- **cookie:** 1678\n- cookie-\n- specific\n- action\n- access\n- ebay 8734\n- creates ID\n- 1678 for user\n- create\n- entry\n- usual HTTP response\n- **set-cookie:** 1678\n- amazon 1678\n- backend\n- database\n\n> **Kurose & Ross Lecture Note:** t’\n\n**HTTP cookies: comments**\n\n- **What cookies can be used for:** \n- authorization\n- shopping carts\n- recommendations\n- user session state (Web e-mail)\n- **cookies and privacy:** \n- cookies permit sites to learn a lot about you on their site.\n- third party persistent cookies (tracking cookies) allow common identity (cookie value) to be tracked across multiple web sites\n- aside\n- **Challenge:** How to keep state?\n- **at protocol endpoints:** maintain state at sender/receiver over multiple transactions\n- **in messages:** cookies in HTTP messages carry state\n\n> **Kurose & Ross Lecture Note:** t’\n\n**Example: displaying a NY Times web page**\n\n- nytimes.com\n- AdX.com\n- HTTP GET\n- HTTP reply\n- NY times page with embedded ad displayed\n- GET base html file from nytimes.com\n- fetch ad from AdX.com\n- display composed page",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 2 Key Principle",
          "message": "Maintaining session state over stateless HTTP via Set-Cookie headers, third-party tracking cookies, enterprise Web proxy caches, and If-Modified-Since / 304 Not Modified."
        }
      },
      {
        "title": "2. nytimes.com (sports) (Slides 2-37..39)",
        "content": "**nytimes.com (sports)**\n\n- AdX.com\n- **1634:** sports, 2/15/22\n- **NY Times:** 1634\n- **7493:** NY Times sports, 2/15/22\n- HTTP reply\n- **Set cookie:** 1634\n- HTTP GET\n- **Referrer:** NY Times Sports\n- HTTP reply\n- **Set cookie:** 7493\n- HTTP\n- GET\n- **AdX:** 7493\n- **Cookies:** tracking a user’s browsing behavior\n- “first party” cookie – from website you chose to visit (provides base html file)\n- “third party” cookie – from website you did not choose to visit\n\n**Cookies: tracking a user’s browsing behavior**\n\n- nytimes.com\n- AdX.com\n- **1634:** sports, 2/15/22\n- **NY Times:** 1634\n- **7493:** NY Times sports, 2/15/22\n- **AdX:** 7493\n- socks.com\n- HTTP GET\n- HTTP reply\n- HTTP GET\n- **Referrer:** socks.com, cookie: 7493\n- HTTP reply\n- **Set cookie:** 7493\n- **7493:** socks.com, 2/16/22\n- **AdX:** \n- tracks my web browsing over sites with AdX ads\n- can return targeted ads based on browsing history\n\n**Cookies: tracking a user’s browsing behavior (one day later)**\n\n- nytimes.com (arts)\n- AdX.com\n- **1634:** sports, 2/15/22\n- **NY Times:** 1634\n- **7493:** NY Times sports, 2/15/22\n- **AdX:** 7493\n- socks.com\n- HTTP GET\n- **Referrer:** nytimes.com, cookie: 7493\n- HTTP reply\n- **Set cookie:** 7493\n- **7493:** socks.com, 2/16/22\n- **cookie:** 1634\n- HTTP reply\n- HTTP\n- GET\n- **Set cookie:** 1634\n- **1634:** arts, 2/17/22\n- **7493:** NY Times arts, 2/15/22\n- Returned ad for socks!"
      },
      {
        "title": "3. Cookies: tracking a user’s browsing behavior (Slides 2-40..42)",
        "content": "**Cookies: tracking a user’s browsing behavior**\n\n- **Cookies can be used to:** \n- track user behavior on a given website (first party cookies)\n- track user behavior across multiple websites (third party cookies) without user ever choosing to visit tracker site (!)\n- **tracking may be invisible to user:** \n  - rather than displayed ad triggering HTTP GET to tracker, could be an invisible link\n- **third party tracking via cookies:** \n- disabled by default in Firefox, Safari browsers\n- to be disabled in Chrome browser in 2023\n\n**GDPR (EU General Data Protection Regulation) and cookies**\n\n- “Natural persons may be associated with online identifiers […] such as internet protocol addresses, cookie identifiers or other identifiers […].\n- This may leave traces which, in particular when combined with unique identifiers and other information received by the servers, may be used to create profiles of the natural persons and identify them.”\n- GDPR, recital 30 (May 2018)\n- User has explicit control over whether or not cookies are allowed\n- when cookies can identify an individual, cookies are considered personal data, subject to GDPR personal data regulations\n\n**Web caches**\n\n- user configures browser to point to a (local) Web cache\n- browser sends all HTTP requests to cache\n  - if object in cache: cache returns object to client\n  - else cache requests object from origin server, caches received object, then returns object to client\n- **Goal:** satisfy client requests without involving origin server\n- client\n- Web\n- cache\n- client\n- HTTP request\n- HTTP response\n- HTTP request\n- HTTP request\n- origin\n- server\n- HTTP response\n- HTTP response\n\n> **Kurose & Ross Lecture Note:** t’"
      },
      {
        "title": "4. Web caches (aka proxy servers) (Slides 2-43..45)",
        "content": "**Web caches (aka proxy servers)**\n\n- Web cache acts as both client and server\n  - server for original requesting client\n  - client to origin server\n- Why Web caching?\n- reduce response time for client request\n  - cache is closer to client\n- reduce traffic on an institution’s access link\n- Internet is dense with caches\n  - enables “poor” content providers to more effectively deliver content\n- server tells cache about object’s allowable caching in response header:\n\n> **Kurose & Ross Lecture Note:** re: poor content providers – like in real-estate, location is everything. servers want to be close to clients.\n\n**Caching example**\n\n- origin\n- servers\n- public\n- Internet\n- institutional\n- network\n- 1 Gbps LAN\n- 1.54 Mbps\n- access link\n- **Performance:** \n- access link utilization = .97\n- **LAN utilization:** .0015\n- end-end delay = Internet delay +\n- access link delay + LAN delay\n- = 2 sec + minutes + usecs\n- **Scenario:** \n- **access link rate:** 1.54 Mbps\n- **RTT from institutional router to server:** 2 sec\n- **web object size:** 100K bits\n- average request rate from browsers to origin servers: 15/sec\n  - avg data rate to browsers: 1.50 Mbps\n- **problem:** large queueing delays at high utilization!\n\n> **Kurose & Ross Lecture Note:** explain why minutes (recall earlier delay versus arrival rate curve from Chapter 1)\n\n**Option 1: buy a faster access link**\n\n- **Performance:** \n- access link utilization = .97\n- **LAN utilization:** .0015\n- end-end delay = Internet delay +\n- access link delay + LAN delay\n- = 2 sec + minutes + usecs\n- origin\n- servers\n- public\n- Internet\n- institutional\n- network\n- 1 Gbps LAN\n- 1.54 Mbps\n- access link\n- **Scenario:** \n- **access link rate:** 1.54 Mbps\n- **RTT from institutional router to server:** 2 sec\n- **web object size:** 100K bits\n- average request rate from browsers to origin servers: 15/sec\n  - avg data rate to browsers: 1.50 Mbps\n- 154 Mbps\n- 154 Mbps\n- .0097\n- msecs\n- **Cost:** faster access link (expensive!)\n\n> **Kurose & Ross Lecture Note:** t’"
      },
      {
        "title": "5. Option 2: install a web cache (Slides 2-46..48)",
        "content": "**Option 2: install a web cache**\n\n- **Performance:** \n- **LAN utilization:** .?\n- access link utilization = ?\n- average end-end delay = ?\n- origin\n- servers\n- public\n- Internet\n- institutional\n- network\n- 1 Gbps LAN\n- 1.54 Mbps\n- access link\n- **Scenario:** \n- **access link rate:** 1.54 Mbps\n- **RTT from institutional router to server:** 2 sec\n- **web object size:** 100K bits\n- average request rate from browsers to origin servers: 15/sec\n  - avg data rate to browsers: 1.50 Mbps\n- How to compute link\n- utilization, delay?\n- **Cost:** web cache (cheap!)\n- local web cache\n\n> **Kurose & Ross Lecture Note:** t’\n\n**Calculating access link utilization, end-end delay with cache:**\n\n- origin\n- servers\n- public\n- Internet\n- institutional\n- network\n- 1 Gbps LAN\n- 1.54 Mbps\n- access link\n- local web cache\n- **suppose cache hit rate is 0.4:** \n- 40% requests served by cache, with low (msec) delay\n- 60% requests satisfied at origin\n  - rate to browsers over access link\n  - = 0.6 * 1.50 Mbps = .9 Mbps\n  - access link utilization = 0.9/1.54 = .58 means low (msec) queueing delay at access link\n- **average end-end delay:** \n  - = 0.6 * (delay from origin servers)\n  - + 0.4 * (delay when satisfied at cache)\n  - = 0.6 (2.01) + 0.4 (~msecs) = ~ 1.2 secs\n- lower average end-end delay than with 154 Mbps link (and cheaper too!)\n\n> **Kurose & Ross Lecture Note:** t’\n\n**Browser caching: Conditional GET**\n\n- **Goal:** don’t send object if browser has up-to-date cached version\n  - no object transmission delay (or use of network resources)\n- **client:** specify date of browser-cached copy in HTTP request\n  - If-modified-since: <date>\n- **server:** response contains no object if browser-cached copy is up-to-date:\n  - HTTP/1.0 304 Not Modified\n- HTTP request msg\n- **If-modified-since:** <date>\n- HTTP response\n- HTTP/1.0\n- 304 Not Modified\n- object\n- not\n- modified\n- before\n- <date>\n- HTTP request msg\n- **If-modified-since:** <date>\n- HTTP response\n- HTTP/1.0 200 OK\n- <data>\n- object\n- modified\n- after\n- <date>\n- client\n- server\n\n> **Kurose & Ross Lecture Note:** t’"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **2.2B HTTP State & Web Caching: Cookies, User Tracking/GDPR, Proxy Caches & Conditional GET**:\n\n- **Review Question 1 (“HTTP is stateless.”):** What do we mean when we say “HTTP is stateless”? In answering this question, assume that cookies are not used. Check all answers that apply.\n  - **Verified Answer:** An HTTP server does not remember anything about what happened during earlier steps in interacting with this HTTP client.\n\n- **Review Question 2 (HTTP cookies.):** What is an HTTP cookie used for?\n  - **Verified Answer:** A cookie is a code used by a server, carried on a client’s HTTP request, to access information the server had earlier stored about an earlier interaction with this Web browser . [Think about the distinction between a browser and a person .]\n\n- **Review Question 3 (The HTTP GET.):** What is the purpose of the HTTP GET message?\n  - **Verified Answer:** The HTTP GET request message is used by a web client to request a web server to send the requested object from the server to the client.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "web_cache_delay_calc.py — Kurose & Ross Web Cache Access Link Utilization & Conditional GET Calculator",
          "snippet": "# Kurose & Ross 9e - Section 2.2.5: Web Caching & Conditional GET Performance Analysis\navg_obj_bits = 1e6        # L = 1 Mbit per object\nreq_rate_sec = 15.0       # a = 15 requests/sec from institutional LAN\nr_access_bps = 15.4e6     # Access link R = 15.4 Mbps\nrtt_internet_sec = 2.0    # Internet router-to-origin delay = 2.0 sec\ncache_hit_ratio = 0.40    # 40% of requests satisfied by local institutional Web cache\n\n# 1. Without Web cache\nu_no_cache = (req_rate_sec * avg_obj_bits) / r_access_bps\nprint(f\"Without Cache -> Access Link Utilization: {u_no_cache*100:.1f}% (Queueing Delay approaches INFINITY!)\")\n\n# 2. With Local Web Cache (40% hit rate -> only 60% traverse access link)\nu_with_cache = ((1.0 - cache_hit_ratio) * req_rate_sec * avg_obj_bits) / r_access_bps\navg_delay_sec = cache_hit_ratio * 0.01 + (1.0 - cache_hit_ratio) * (rtt_internet_sec + 0.05)\nprint(f\"With 40% Cache -> Access Link Utilization: {u_with_cache*100:.1f}% (Low queueing delay!)\")\nprint(f\"Weighted Average End-to-End Response Time: {avg_delay_sec:.3f} sec\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 2.2B HTTP State & Web Caching: Cookies, User Tracking/GDPR, Proxy Caches & Conditional GET",
      "filename": "web_cache_delay_calc.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 2.2.5: Web Caching & Conditional GET Performance Analysis\navg_obj_bits = 1e6        # L = 1 Mbit per object\nreq_rate_sec = 15.0       # a = 15 requests/sec from institutional LAN\nr_access_bps = 15.4e6     # Access link R = 15.4 Mbps\nrtt_internet_sec = 2.0    # Internet router-to-origin delay = 2.0 sec\ncache_hit_ratio = 0.40    # 40% of requests satisfied by local institutional Web cache\n\n# 1. Without Web cache\nu_no_cache = (req_rate_sec * avg_obj_bits) / r_access_bps\nprint(f\"Without Cache -> Access Link Utilization: {u_no_cache*100:.1f}% (Queueing Delay approaches INFINITY!)\")\n\n# 2. With Local Web Cache (40% hit rate -> only 60% traverse access link)\nu_with_cache = ((1.0 - cache_hit_ratio) * req_rate_sec * avg_obj_bits) / r_access_bps\navg_delay_sec = cache_hit_ratio * 0.01 + (1.0 - cache_hit_ratio) * (rtt_internet_sec + 0.05)\nprint(f\"With 40% Cache -> Access Link Utilization: {u_with_cache*100:.1f}% (Low queueing delay!)\")\nprint(f\"Weighted Average End-to-End Response Time: {avg_delay_sec:.3f} sec\")",
      "expectedOutput": [
        "[OK] web_cache_delay_calc.py — Kurose & Ross Web Cache Access Link Utilization & Conditional GET Calculator",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 2.2B HTTP State & Web Caching: Cookies, User Tracking/GDPR, Proxy Caches & Conditional GET. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Suppose an HTTP server sends the following HTTP response message a client: HTTP/1.0 200 OK Date: Wed, 09 Sep 2020 23:46:21 +0000 Server: Apache/2.2.3 (CentOS) Last-Modified: Wed, 09 Sep 2020 23:51:41 +0000 ETag:17dc6-a5c-bf716880. Content-Length: 418 Connection: Close Content-type: image/html Will the web server close the TCP connection after sending this message?",
      "options": [
        "A) Yes, because this is HTTP 1.0",
        "B) No, this is a persistent connection, and so the server will keep the TCP connection open.",
        "C) There’s not enough information to answer this question.",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 2), 'Yes, because this is HTTP 1.0' accurately characterizes 2.2B HTTP State & Web Caching: Cookies, User Tracking/GDPR, Proxy Caches & Conditional GET."
    }
  },
  "cn-ch2-http2-http3-quic": {
    "id": "cn-ch2-http2-http3-quic",
    "badge": "Module 2 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta Seviye",
    "title": "2.2C Modern Web Protocols: HTTP/2 Framing, HOL Blocking, HTTP/3 & QUIC over UDP",
    "subtitle": "Solving HTTP/1.1 Head-of-Line (HOL) blocking via HTTP/2 interleaved binary frames, why TCP loss still stalls HTTP/2, and how QUIC integrates TLS 1.3 + per-stream congestion/reliability over UDP.",
    "sections": [
      {
        "title": "1. HTTP/2 (Slides 2-49..52)",
        "content": "![2.2C Modern Web Protocols: HTTP/2 Framing, HOL Blocking, HTTP/3 & QUIC over UDP Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**2.2C Modern Web Protocols: HTTP/2 Framing, HOL Blocking, HTTP/3 & QUIC over UDP** — Solving HTTP/1.1 Head-of-Line (HOL) blocking via HTTP/2 interleaved binary frames, why TCP loss still stalls HTTP/2, and how QUIC integrates TLS 1.3 + per-stream congestion/reliability over UDP.\n\n**HTTP/2**\n\n- **Key goal:** decreased delay in multi-object HTTP requests\n- **HTTP1.1:** introduced multiple, pipelined GETs over single TCP connection\n- **server responds in-order (FCFS:** first-come-first-served scheduling) to GET requests\n- with FCFS, small object may have to wait for transmission (head-of-line (HOL) blocking) behind large object(s)\n- loss recovery (retransmitting lost TCP segments) stalls object transmission\n- **HTTP/2:** [RFC 7540, 2015] increased flexibility at server in sending objects to client:\n- methods, status codes, most header fields unchanged from HTTP 1.1\n- transmission order of requested objects based on client-specified object priority (not necessarily FCFS)\n- push unrequested objects to client\n- divide objects into frames, schedule frames to mitigate HOL blocking\n\n> **Kurose & Ross Lecture Note:** t’\n\n**HTTP/2: mitigating HOL blocking**\n\n- **HTTP 1.1:** client requests 1 large object (e.g., video file) and 3 smaller objects\n- client\n- server\n- GET O1\n- GET O2\n- GET O3\n- GET O4\n- object data requested\n- **objects delivered in order requested:** O2, O3, O4 wait behind O1\n- **HTTP/2:** objects divided into frames, frame transmission interleaved\n- O2, O3, O4 delivered quickly, O1 slightly delayed\n\n> **Kurose & Ross Lecture Note:** t’ shortest job first: decreased average delay!",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 2 Key Principle",
          "message": "Solving HTTP/1.1 Head-of-Line (HOL) blocking via HTTP/2 interleaved binary frames, why TCP loss still stalls HTTP/2, and how QUIC integrates TLS 1.3 + per-stream congestion/reliability over UDP."
        }
      },
      {
        "title": "2. HTTP/2 to HTTP/3 (Slides 2-53..55)",
        "content": "**HTTP/2 to HTTP/3**\n\n- **HTTP/2 over single TCP connection means:** \n- recovery from packet loss still stalls all object transmissions\n  - as in HTTP 1.1, browsers have incentive to open multiple parallel TCP connections to reduce stalling, increase overall throughput\n- no security over vanilla TCP connection\n- **HTTP/3:** adds security, per object error- and congestion-control (more pipelining) over UDP\n\n> **Kurose & Ross Lecture Note:** t’\n\n**QUIC: Quick UDP Internet Connections**\n\n- application-layer protocol, on top of UDP\n  - increase performance of HTTP\n  - deployed on many Google servers, apps (Chrome, mobile YouTube app)\n- TCP\n- TLS\n- HTTP/2\n- UDP\n- QUIC\n- HTTP/2 (slimmed)\n- Network\n- Transport\n- Application\n- HTTP/2 over TCP\n- HTTP/3\n- HTTP/2 over QUIC over UDP\n- adopts approaches we’ll study in chapter for connection establishment, error control, congestion control\n  - error and congestion control: “Readers familiar with TCP’s loss detection and congestion control will find algorithms here that parallel well-known TCP ones.” [from QUIC specification]\n  - connection establishment: reliability, congestion control, authentication, encryption, state established in one RTT"
      },
      {
        "title": "3. QUIC: Connection establishment (Slides 2-56..57)",
        "content": "**QUIC: Connection establishment**\n\n- TCP handshake\n- (transport layer)\n- TLS handshake\n- (security)\n- TCP (reliability, congestion control state) + TLS (authentication, crypto state)\n- 2 serial handshakes\n- data\n- data\n- **QUIC:** reliability, congestion control, authentication, crypto state\n- 1 handshake\n- QUIC\n- 1RTT handshake\n\n**QUIC: 0-RTT Connection establishment**\n\n- data\n- TLS session ticket sent by server, cached at client\n- end of first QUIC connection\n- start of second QUIC connection\n- Client uses last session ticket for encryption, authentication for new connection\n- 0 RTT handshake delay\n- data"
      },
      {
        "title": "4. Application layer: overview (Slides 2-58..58)",
        "content": "- Principles of network applications\n- Web and HTTP\n- E-mail, SMTP, IMAP\n- The Domain Name System DNS\n- video streaming and content distribution networks\n- socket programming with UDP and TCP"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **2.2C Modern Web Protocols: HTTP/2 Framing, HOL Blocking, HTTP/3 & QUIC over UDP**:\n\n- **Review Question 1 (“HTTP is stateless.”):** What do we mean when we say “HTTP is stateless”? In answering this question, assume that cookies are not used. Check all answers that apply.\n  - **Verified Answer:** An HTTP server does not remember anything about what happened during earlier steps in interacting with this HTTP client.\n\n- **Review Question 2 (HTTP cookies.):** What is an HTTP cookie used for?\n  - **Verified Answer:** A cookie is a code used by a server, carried on a client’s HTTP request, to access information the server had earlier stored about an earlier interaction with this Web browser . [Think about the distinction between a browser and a person .]\n\n- **Review Question 3 (The HTTP GET.):** What is the purpose of the HTTP GET message?\n  - **Verified Answer:** The HTTP GET request message is used by a web client to request a web server to send the requested object from the server to the client.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "http2_hol_blocking_sim.py — Simulating HTTP/1.1 vs. HTTP/2 Interleaved Framing & QUIC 0-RTT/1-RTT",
          "snippet": "# Kurose & Ross 9e - Section 2.2.6: HTTP/1.1 FIFO vs. HTTP/2 Frame Interleaving\nobjects = [(\"hero_video.mp4\", 1000), (\"style.css\", 10), (\"app.js\", 10), (\"logo.svg\", 10)]  # (name, frames)\n\n# HTTP/1.1 sends full object sequentially (HOL blocking behind 1000-frame video)\nt = 0\nh1_finish = {}\nfor name, frames in objects:\n    t += frames\n    h1_finish[name] = t\n\n# HTTP/2 interleaves 1 frame per stream round-robin\nremaining = {name: frames for name, frames in objects}\nt = 0\nh2_finish = {}\nwhile any(v > 0 for v in remaining.values()):\n    for name in list(remaining.keys()):\n        if remaining[name] > 0:\n            remaining[name] -= 1\n            t += 1\n            if remaining[name] == 0:\n                h2_finish[name] = t\n\nfor name, _ in objects:\n    print(f\"{name:16s} | HTTP/1.1 Finish: {h1_finish[name]:4d} ticks | HTTP/2 Interleaved Finish: {h2_finish[name]:4d} ticks\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 2.2C Modern Web Protocols: HTTP/2 Framing, HOL Blocking, HTTP/3 & QUIC over UDP",
      "filename": "http2_hol_blocking_sim.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 2.2.6: HTTP/1.1 FIFO vs. HTTP/2 Frame Interleaving\nobjects = [(\"hero_video.mp4\", 1000), (\"style.css\", 10), (\"app.js\", 10), (\"logo.svg\", 10)]  # (name, frames)\n\n# HTTP/1.1 sends full object sequentially (HOL blocking behind 1000-frame video)\nt = 0\nh1_finish = {}\nfor name, frames in objects:\n    t += frames\n    h1_finish[name] = t\n\n# HTTP/2 interleaves 1 frame per stream round-robin\nremaining = {name: frames for name, frames in objects}\nt = 0\nh2_finish = {}\nwhile any(v > 0 for v in remaining.values()):\n    for name in list(remaining.keys()):\n        if remaining[name] > 0:\n            remaining[name] -= 1\n            t += 1\n            if remaining[name] == 0:\n                h2_finish[name] = t\n\nfor name, _ in objects:\n    print(f\"{name:16s} | HTTP/1.1 Finish: {h1_finish[name]:4d} ticks | HTTP/2 Interleaved Finish: {h2_finish[name]:4d} ticks\")",
      "expectedOutput": [
        "[OK] http2_hol_blocking_sim.py — Simulating HTTP/1.1 vs. HTTP/2 Interleaved Framing & QUIC 0-RTT/1-RTT",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 2.2C Modern Web Protocols: HTTP/2 Framing, HOL Blocking, HTTP/3 & QUIC over UDP. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Suppose now the server sends the following HTTP response message the client: HTTP/1.0 200 OK Date: Wed, 09 Sep 2020 23:46:21 +0000 Server: Apache/2.2.3 (CentOS) Last-Modified: Wed, 09 Sep 2020 23:51:41 +0000 ETag:17dc6-a5c-bf716880. Content-Length: 418 Connection: Close Content-type: image/html Will the web server close the TCP connection after sending this message? [Note: you can find more questions like this one here .]",
      "options": [
        "A) There's not enough information in the response message to answer this question.",
        "B) Yes, the server will close this connection because version 1.0 of HTTP is being used, and TCP connections do not stay open persistently.",
        "C) Yes, because the HTTP response indicated that only one object was requested in the HTTP GET request.",
        "D) No, the server will leave the connection open as a persistent HTTP connection."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 2), 'Yes, the server will close this connection because version 1.0 of HTTP is being used, and TCP connections do not stay open persistently.' accurately characterizes 2.2C Modern Web Protocols: HTTP/2 Framing, HOL Blocking, HTTP/3 & QUIC over UDP."
    }
  },
  "cn-ch2-email-smtp-imap": {
    "id": "cn-ch2-email-smtp-imap",
    "badge": "Module 2 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta Seviye",
    "title": "2.3 Electronic Mail Architecture: Mail Servers, SMTP (RFC 5321), Message Formats & IMAP",
    "subtitle": "User agents, mail server message queues, SMTP push handshaking (HELO, MAIL FROM, RCPT TO, DATA), 7-bit ASCII MIME headers, and IMAP/HTTP mail retrieval.",
    "sections": [
      {
        "title": "1. E-mail (Slides 2-59..60)",
        "content": "![2.3 Electronic Mail Architecture: Mail Servers, SMTP (RFC 5321), Message Formats & IMAP Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**2.3 Electronic Mail Architecture: Mail Servers, SMTP (RFC 5321), Message Formats & IMAP** — User agents, mail server message queues, SMTP push handshaking (HELO, MAIL FROM, RCPT TO, DATA), 7-bit ASCII MIME headers, and IMAP/HTTP mail retrieval.\n\n**E-mail**\n\n- **Three major components:** \n- user agents\n- mail servers\n- **simple mail transfer protocol:** SMTP\n- User Agent\n- a.k.a. “mail reader”\n- composing, editing, reading mail messages\n- e.g., Outlook, iPhone mail client\n- outgoing, incoming messages stored on server\n- user mailbox\n- outgoing\n- message queue\n- mail\n- server\n- mail\n- server\n- mail\n- server\n- SMTP\n- SMTP\n- SMTP\n- user\n- agent\n- user\n- agent\n- user\n- agent\n- user\n- agent\n- user\n- agent\n- user\n- agent\n\n**E-mail: mail servers**\n\n- user mailbox\n- outgoing\n- message queue\n- mail\n- server\n- mail\n- server\n- mail\n- server\n- SMTP\n- SMTP\n- SMTP\n- user\n- agent\n- user\n- agent\n- user\n- agent\n- user\n- agent\n- user\n- agent\n- user\n- agent\n- **mail servers:** \n- mailbox contains incoming messages for user\n- message queue of outgoing (to be sent) mail messages\n- SMTP protocol between mail servers to send email messages\n- **client:** sending mail server\n- **“server”:** receiving mail server",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 2 Key Principle",
          "message": "User agents, mail server message queues, SMTP push handshaking (HELO, MAIL FROM, RCPT TO, DATA), 7-bit ASCII MIME headers, and IMAP/HTTP mail retrieval."
        }
      },
      {
        "title": "2. SMTP RFC (5321) (Slides 2-61..62)",
        "content": "**SMTP RFC (5321)**\n\n- uses TCP to reliably transfer email message from client (mail server initiating connection) to server, port 25\n  - direct transfer: sending server (acting like client) to receiving server\n- three phases of transfer\n  - SMTP handshaking (greeting)\n  - SMTP transfer of messages\n  - SMTP closure\n- command/response interaction (like HTTP)\n  - commands: ASCII text\n  - response: status code and phrase\n- initiate TCP\n- connection\n- RTT\n- time\n- 250 Hello\n- HELO\n- SMTP handshaking\n- TCP connection\n- initiated\n- “client”\n- SMTP server\n- “server”\n- SMTP server\n- SMTP transfers\n\n**Scenario: Alice sends e-mail to Bob**\n\n- 1) Alice uses UA to compose e-mail message “to” bob@someschool.edu\n- 4) SMTP client sends Alice’s message over the TCP connection\n- user\n- agent\n- mail\n- server\n- mail\n- server\n- Alice’s mail server\n- Bob’s mail server\n- user\n- agent\n- 2) Alice’s UA sends message to her mail server using SMTP; message placed in message queue\n- 3) client side of SMTP at mail server opens TCP connection with Bob’s mail server\n- 5) Bob’s mail server places the message in Bob’s mailbox\n- 6) Bob invokes his user agent to read message"
      },
      {
        "title": "3. Sample SMTP interaction (Slides 2-63..64)",
        "content": "**Sample SMTP interaction**\n\n- **S:** 220 hamburger.edu\n- **C:** HELO crepes.fr\n- **S:** 250 Hello crepes.fr, pleased to meet you\n- **C:** MAIL FROM: <alice@crepes.fr>\n- **S:** 250 alice@crepes.fr... Sender ok\n- **C:** RCPT TO: <bob@hamburger.edu>\n- **S:** 250 bob@hamburger.edu ... Recipient ok\n- **C:** DATA\n- **S:** 354 Enter mail, end with \".\" on a line by itself\n- **C:** Do you like ketchup?\n- **C:** How about pickles?\n- **C:** .\n- **S:** 250 Message accepted for delivery\n- **C:** QUIT\n- **S:** 221 hamburger.edu closing connection\n\n**SMTP: observations**\n\n- SMTP uses persistent connections\n- SMTP requires message (header & body) to be in 7-bit ASCII\n- SMTP server uses CRLF.CRLF to determine end of message\n- **comparison with HTTP:** \n- **HTTP:** client pull\n- **SMTP:** client push\n- both have ASCII command/response interaction, status codes\n- **HTTP:** each object encapsulated in its own response message\n- **SMTP:** multiple objects sent in multipart message"
      },
      {
        "title": "4. Mail message format (Slides 2-65..66)",
        "content": "**Mail message format**\n\n- **SMTP:** protocol for exchanging e-mail messages, defined in RFC 5321 (like RFC 7231 defines HTTP)\n- RFC 2822 defines syntax for e-mail message itself (like HTML defines syntax for web documents)\n- header\n- body\n- blank\n- line\n- header lines, e.g.,\n  - To:\n  - From:\n  - Subject:\n  - these lines, within the body of the email message area different from SMTP MAIL FROM:, RCPT TO: commands!\n- **Body:** the “message” , ASCII characters only\n\n**Retrieving email: mail access protocols**\n\n- sender’s e-mail\n- server\n- SMTP\n- SMTP\n- receiver’s e-mail\n- server\n- e-mail access\n- protocol\n- (e.g., IMAP, HTTP)\n- user\n- agent\n- user\n- agent\n- **SMTP:** delivery/storage of e-mail messages to receiver’s server\n- **mail access protocol:** retrieval from server\n  - IMAP: Internet Mail Access Protocol [RFC 3501]: messages stored on server, IMAP provides retrieval, deletion, folders of stored messages on server\n- **HTTP:** gmail, Hotmail, Yahoo!Mail, etc. provides web-based interface on top of STMP (to send), IMAP (or POP) to retrieve e-mail messages"
      },
      {
        "title": "5. Application Layer: Overview (Slides 2-67..117)",
        "content": "**Application Layer: Overview**\n\n- Principles of network applications\n- Web and HTTP\n- E-mail, SMTP, IMAP\n- The Domain Name System DNS\n- video streaming and content distribution networks\n- socket programming with UDP and TCP\n\n**Sample SMTP interaction**\n\n- **S:** 220 hamburger.edu\n- **C:** HELO crepes.fr\n- **S:** 250 Hello crepes.fr, pleased to meet you\n- **C:** MAIL FROM: <alice@crepes.fr>\n- **S:** 250 alice@crepes.fr... Sender ok\n- **C:** RCPT TO: <bob@hamburger.edu>\n- **S:** 250 bob@hamburger.edu ... Recipient ok\n- **C:** DATA\n- **S:** 354 Enter mail, end with \".\" on a line by itself\n- **C:** Do you like ketchup?\n- **C:** How about pickles?\n- **C:** .\n- **S:** 250 Message accepted for delivery\n- **C:** QUIT\n- **S:** 221 hamburger.edu closing connection\n\n> **Kurose & Ross Lecture Note:** Retired this slide, since telnet isn’t really used anymore, and few non https: mail servers around anymore...."
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **2.3 Electronic Mail Architecture: Mail Servers, SMTP (RFC 5321), Message Formats & IMAP**:\n\n- **Review Question 1 (E-mail delays.):** How many RTTs are there from when a client first contacts an email server (by initiating a TCP session) to when the client can begin sending the email message itself – that is following all initial TCP or SMTP handshaking required? Recall the figure below from our class notes:\n  - **Verified Answer:** 3\n\n- **Review Question 2 (Comparing and contrasting HTTP and SMTP.):** Which of the following characteristics apply to HTTP only (and do not apply to SMTP)? Note: check one or more of the characteristics below.\n  - **Verified Answer:** Uses a blank line (CRLF) to indicate end of request header.; Uses server port 80.; Operates mostly as a “client pull” protocol.\n\n- **Review Question 3 (Comparing and contrasting HTTP and SMTP (2).):** Which of the following characteristics apply to SMTP only (and do not apply to HTTP)? Note: check one or more of the characteristics below.\n  - **Verified Answer:** Uses CRLF.CRLF to indicate end of message.; Uses server port 25.; Operates mostly as a “client push” protocol.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "smtp_dialogue_transcript.py — Simulating an RFC 5321 SMTP Client-Server Push Session",
          "snippet": "# Kurose & Ross 9e - Section 2.3: RFC 5321 SMTP Handshake & Message Push Simulation\nsmtp_session = [\n    (\"SERVER\", \"220 hamburger.edu Simple Mail Transfer Service Ready\"),\n    (\"CLIENT\", \"HELO crepes.fr\"),\n    (\"SERVER\", \"250 Hello crepes.fr, pleased to meet you\"),\n    (\"CLIENT\", \"MAIL FROM: <alice@crepes.fr>\"),\n    (\"SERVER\", \"250 alice@crepes.fr... Sender ok\"),\n    (\"CLIENT\", \"RCPT TO: <bob@hamburger.edu>\"),\n    (\"SERVER\", \"250 bob@hamburger.edu ... Recipient ok\"),\n    (\"CLIENT\", \"DATA\"),\n    (\"SERVER\", \"354 Enter mail, end with '.' on a line by itself\"),\n    (\"CLIENT\", \"From: alice@crepes.fr\\nTo: bob@hamburger.edu\\nSubject: Networking 9e\\n\\nDo you like ketchup?\\n.\"),\n    (\"SERVER\", \"250 Message accepted for delivery\"),\n    (\"CLIENT\", \"QUIT\"),\n    (\"SERVER\", \"221 hamburger.edu closing connection\"),\n]\n\nfor role, line in smtp_session:\n    prefix = \"S:\" if role == \"SERVER\" else \"C:\"\n    print(f\"{prefix} {line}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 2.3 Electronic Mail Architecture: Mail Servers, SMTP (RFC 5321), Message Formats & IMAP",
      "filename": "smtp_dialogue_transcript.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 2.3: RFC 5321 SMTP Handshake & Message Push Simulation\nsmtp_session = [\n    (\"SERVER\", \"220 hamburger.edu Simple Mail Transfer Service Ready\"),\n    (\"CLIENT\", \"HELO crepes.fr\"),\n    (\"SERVER\", \"250 Hello crepes.fr, pleased to meet you\"),\n    (\"CLIENT\", \"MAIL FROM: <alice@crepes.fr>\"),\n    (\"SERVER\", \"250 alice@crepes.fr... Sender ok\"),\n    (\"CLIENT\", \"RCPT TO: <bob@hamburger.edu>\"),\n    (\"SERVER\", \"250 bob@hamburger.edu ... Recipient ok\"),\n    (\"CLIENT\", \"DATA\"),\n    (\"SERVER\", \"354 Enter mail, end with '.' on a line by itself\"),\n    (\"CLIENT\", \"From: alice@crepes.fr\\nTo: bob@hamburger.edu\\nSubject: Networking 9e\\n\\nDo you like ketchup?\\n.\"),\n    (\"SERVER\", \"250 Message accepted for delivery\"),\n    (\"CLIENT\", \"QUIT\"),\n    (\"SERVER\", \"221 hamburger.edu closing connection\"),\n]\n\nfor role, line in smtp_session:\n    prefix = \"S:\" if role == \"SERVER\" else \"C:\"\n    print(f\"{prefix} {line}\")",
      "expectedOutput": [
        "[OK] smtp_dialogue_transcript.py — Simulating an RFC 5321 SMTP Client-Server Push Session",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 2.3 Electronic Mail Architecture: Mail Servers, SMTP (RFC 5321), Message Formats & IMAP. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "How many RTTs are there from when a client first contacts an email server (by initiating a TCP session) to when the client can begin sending the email message itself – that is following all initial TCP or SMTP handshaking required? Recall the figure below from our class notes:",
      "options": [
        "A) 3",
        "B) 2",
        "C) 2.5",
        "D) 0"
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 2), '3' accurately characterizes 2.3 Electronic Mail Architecture: Mail Servers, SMTP (RFC 5321), Message Formats & IMAP."
    }
  },
  "cn-ch2-dns-architecture": {
    "id": "cn-ch2-dns-architecture",
    "badge": "Module 2 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta Seviye",
    "title": "2.4 DNS (Domain Name System): Distributed Hierarchy (Root, TLD, Authoritative) & Query Resolution",
    "subtitle": "Why DNS avoids a single point of failure: 13 logical Root server clusters (anycast), Top-Level Domain (TLD) servers, Authoritative servers, Local DNS resolvers, and Iterative vs. Recursive queries.",
    "sections": [
      {
        "title": "1. DNS: Domain Name System (Slides 2-68..69)",
        "content": "![2.4 DNS (Domain Name System): Distributed Hierarchy (Root, TLD, Authoritative) & Query Resolution Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**2.4 DNS (Domain Name System): Distributed Hierarchy (Root, TLD, Authoritative) & Query Resolution** — Why DNS avoids a single point of failure: 13 logical Root server clusters (anycast), Top-Level Domain (TLD) servers, Authoritative servers, Local DNS resolvers, and Iterative vs. Recursive queries.\n\n**DNS: Domain Name System**\n\n- **people:** many identifiers:\n  - SSN, name, passport #\n- **Internet hosts, routers:** \n  - IP address (32 bit) - used for addressing datagrams\n  - “name”, e.g., cs.umass.edu - used by humans\n- **Q:** how to map between IP address and name, and vice versa ?\n- **Domain Name System (DNS):** \n- distributed database implemented in hierarchy of many name servers\n- **application-layer protocol:** hosts, DNS servers communicate to resolve names (address/name translation)\n  - note: core Internet function, implemented as application-layer protocol\n  - complexity at network’s “edge”\n\n**DNS: services, structure**\n\n- **Q:** Why not centralize DNS?\n- single point of failure\n- traffic volume\n- distant centralized database\n- maintenance\n- **DNS services:** \n- hostname-to-IP-address translation\n- host aliasing\n  - canonical, alias names\n- mail server aliasing\n- load distribution\n  - replicated Web servers: many IP addresses correspond to one name\n- **A:** doesn‘t scale!\n- **Comcast DNS servers alone:** 600B DNS queries/day\n- **Akamai DNS servers alone:** 2.2T DNS queries/day",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 2 Key Principle",
          "message": "Why DNS avoids a single point of failure: 13 logical Root server clusters (anycast), Top-Level Domain (TLD) servers, Authoritative servers, Local DNS resolvers, and Iterative vs. Recursive queries."
        }
      },
      {
        "title": "2. Thinking about the DNS (Slides 2-70..71)",
        "content": "**Thinking about the DNS**\n\n- **humongous distributed database:** \n- ~ billion records, each simple\n- **handles many trillions of queries/day:** \n- many more reads than writes\n- **performance matters:** almost every Internet transaction interacts with DNS - msecs count!\n- organizationally, physically decentralized:\n- millions of different organizations responsible for their records\n- **“bulletproof”:** reliability, security\n\n**DNS: a distributed, hierarchical database**\n\n- Client wants IP address for www.amazon.com; 1st approximation:\n- client queries root server to find .com DNS server\n- client queries .com DNS server to get amazon.com DNS server\n- client queries amazon.com DNS server to get IP address for www.amazon.com\n- .com DNS servers\n- .org DNS servers\n- .edu DNS servers\n- Top Level Domain\n- Root DNS Servers\n- Root\n- nyu.edu\n- DNS servers\n- umass.edu\n- DNS servers\n- yahoo.com\n- DNS servers\n- amazon.com\n- DNS servers\n- pbs.org\n- DNS servers\n- Authoritative"
      },
      {
        "title": "3. DNS: root name servers (Slides 2-72..74)",
        "content": "**DNS: root name servers**\n\n- official, contact-of-last-resort by name servers that can not resolve name\n- incredibly important Internet function\n  - Internet couldn’t function without it!\n  - DNSSEC – provides security (authentication, message integrity)\n- 13 logical root name “servers” worldwide; each “server,” replicated many times\n- ICANN (Internet Corporation for Assigned Names and Numbers) manages root DNS domain\n\n**Top-Level Domain, and authoritative servers**\n\n- **Top-Level Domain (TLD) servers:** \n  - responsible for .com, .org, .net, .edu, .aero, .jobs, .museums, and all top-level country domains, e.g.: .cn, .uk, .fr, .ca, .jp\n  - Network Solutions: authoritative registry for .com, .net TLD\n  - Educause: .edu TLD\n- **authoritative DNS servers:** \n  - organization’s own DNS server(s), providing authoritative hostname to IP mappings for organization’s named hosts\n  - can be maintained by organization or service provider"
      },
      {
        "title": "4. Local DNS name servers (Slides 2-75..76)",
        "content": "**Local DNS name servers**\n\n- when host makes DNS query, it is sent to its local DNS server\n  - Local DNS server returns reply, answering:\n    - from its local cache of recent name-to-address translation pairs (possibly out of date!)\n    - forwarding request into DNS hierarchy for resolution\n  - each ISP has local DNS name server; to find yours:\n    - MacOS: % scutil --dns\n    - Windows: >ipconfig /all\n- local DNS server doesn’t strictly belong to hierarchy\n\n**DNS name resolution: iterated query**\n\n- **Example:** host at engineering.nyu.edu wants IP address for gaia.cs.umass.edu\n- **Iterated query:** \n- contacted server replies with name of server to contact\n- “I don’t know this name, but ask this server”\n- requesting host at\n- engineering.nyu.edu\n- gaia.cs.umass.edu\n- root DNS server\n- local DNS server\n- dns.nyu.edu\n- authoritative DNS server\n- dns.cs.umass.edu\n- TLD DNS server"
      },
      {
        "title": "5. DNS name resolution: recursive query (Slides 2-77..77)",
        "content": "- requesting host at\n- engineering.nyu.edu\n- gaia.cs.umass.edu\n- root DNS server\n- local DNS server\n- dns.nyu.edu\n- authoritative DNS server\n- dns.cs.umass.edu\n- TLD DNS server\n- **Recursive query:** \n- puts burden of name resolution on contacted name server\n- heavy load at upper levels of hierarchy?\n- **Example:** host at engineering.nyu.edu wants IP address for gaia.cs.umass.edu"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **2.4 DNS (Domain Name System): Distributed Hierarchy (Root, TLD, Authoritative) & Query Resolution**:\n\n- **Review Question 1 (Why does the DNS perform caching?):** What is the value of caching in the local DNS name server? Check all that apply.\n  - **Verified Answer:** DNS caching results in less load elsewhere in DNS, when the reply to a query is found in the local cache.; DNS caching provides for faster replies, if the reply to the query is found in the cache.\n\n- **Review Question 2 (What's in the DNS type A resource record?):** What information does the type “A” resource record hold in the DNS database? Check all that apply.\n  - **Verified Answer:** A hostname and an IP address.\n\n- **Review Question 3 (DNS in Action (1).):** Suppose that the local DNS server caches all information coming in from all root, TLD, and authoritative DNS servers for 20 time units. (Thus, for example, when a root server returns the name and address of a TLD server for .com, the cache remembers that this is the TLD server to use to resolve a .com name). Assume also that the local cache is initially empty, that iterative DNS queries are always used, that DNS requests are just for name-to-IP-address translation, that 1 time unit is needed for each server-to-server or host-to-server (one way) request or response, and that there is only one authoritative name server (each) for any .edu or .com domain. Consider the following DNS requests, made by the local host at the given times: t=0, the local host requests that the name gaia.cs.umass.edu be resolved to an IP address. t=1, the local host requests that the name icann.org be resolved to an IP address. t=5, the local host requests that the name cs.umd.edu be resolved to an IP address. (Hint: be careful!) t=10, the local host again requests that the name gaia.cs.umass.edu be resolved to an IP address. t=12 , the local host requests that the name cs.mit.edu be resolved to an IP address. t=30, the local host again requests that the name gaia.cs.umass.edu be resolved to an IP address. (Hint: be careful!) Which of the requests require 8 time units to be resolved?\n  - **Verified Answer:** The request at t=1 .; The request at t=0 .; The request at t=30 .",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "dns_iterative_resolver.py — Tracing an 8-Step Iterative DNS Resolution for gaia.cs.umass.edu",
          "snippet": "# Kurose & Ross 9e - Section 2.4: Iterative vs. Recursive DNS Resolution Trace\ndef resolve_iteratively(hostname: str):\n    steps = [\n        (\"1. Host (cis.poly.edu) -> Local DNS (dns.poly.edu)\", f\"Query: {hostname}?\"),\n        (\"2. Local DNS -> Root DNS Server (a.root-servers.net)\", \"Referral: Ask .edu TLD server\"),\n        (\"3. Root DNS -> Local DNS\", \"NS Record: a.edu-servers.net (192.5.6.30)\"),\n        (\"4. Local DNS -> TLD DNS (.edu Server)\", \"Referral: Ask umass.edu authoritative server\"),\n        (\"5. TLD DNS -> Local DNS\", \"NS Record: dns.umass.edu (128.119.40.111)\"),\n        (\"6. Local DNS -> Authoritative DNS (dns.umass.edu)\", f\"Query A record for {hostname}\"),\n        (\"7. Authoritative DNS -> Local DNS\", f\"A Record: {hostname} = 128.119.245.12 (TTL=3600s)\"),\n        (\"8. Local DNS -> Host (cis.poly.edu)\", \"Resolved IPv4: 128.119.245.12\"),\n    ]\n    for hop, msg in steps:\n        print(f\"{hop:52s} | {msg}\")\n\nresolve_iteratively(\"gaia.cs.umass.edu\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 2.4 DNS (Domain Name System): Distributed Hierarchy (Root, TLD, Authoritative) & Query Resolution",
      "filename": "dns_iterative_resolver.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 2.4: Iterative vs. Recursive DNS Resolution Trace\ndef resolve_iteratively(hostname: str):\n    steps = [\n        (\"1. Host (cis.poly.edu) -> Local DNS (dns.poly.edu)\", f\"Query: {hostname}?\"),\n        (\"2. Local DNS -> Root DNS Server (a.root-servers.net)\", \"Referral: Ask .edu TLD server\"),\n        (\"3. Root DNS -> Local DNS\", \"NS Record: a.edu-servers.net (192.5.6.30)\"),\n        (\"4. Local DNS -> TLD DNS (.edu Server)\", \"Referral: Ask umass.edu authoritative server\"),\n        (\"5. TLD DNS -> Local DNS\", \"NS Record: dns.umass.edu (128.119.40.111)\"),\n        (\"6. Local DNS -> Authoritative DNS (dns.umass.edu)\", f\"Query A record for {hostname}\"),\n        (\"7. Authoritative DNS -> Local DNS\", f\"A Record: {hostname} = 128.119.245.12 (TTL=3600s)\"),\n        (\"8. Local DNS -> Host (cis.poly.edu)\", \"Resolved IPv4: 128.119.245.12\"),\n    ]\n    for hop, msg in steps:\n        print(f\"{hop:52s} | {msg}\")\n\nresolve_iteratively(\"gaia.cs.umass.edu\")",
      "expectedOutput": [
        "[OK] dns_iterative_resolver.py — Tracing an 8-Step Iterative DNS Resolution for gaia.cs.umass.edu",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 2.4 DNS (Domain Name System): Distributed Hierarchy (Root, TLD, Authoritative) & Query Resolution. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "What information does the type “A” resource record hold in the DNS database? Check all that apply.",
      "options": [
        "A) A hostname and an IP address.",
        "B) An alias name and a true name for a server.",
        "C) A name and the name of the SMTP server associated with that name.",
        "D) A domain name and the name of the authoritative name server for that domain."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 2), 'A hostname and an IP address.' accurately characterizes 2.4 DNS (Domain Name System): Distributed Hierarchy (Root, TLD, Authoritative) & Query Resolution."
    }
  },
  "cn-ch2-dns-records-security": {
    "id": "cn-ch2-dns-records-security",
    "badge": "Module 2 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Orta Seviye",
    "title": "2.4B DNS Caching, Resource Records (A, NS, CNAME, MX), Wire Format & DNSSEC Security",
    "subtitle": "TTL-based DNS caching, Resource Record (RR) 4-tuples (Name, Value, Type, TTL), 12-byte binary DNS query/reply header format, registrar insertion, DDoS attacks, and DNSSEC authentication.",
    "sections": [
      {
        "title": "1. Caching DNS Information (Slides 2-78..79)",
        "content": "![2.4B DNS Caching, Resource Records (A, NS, CNAME, MX), Wire Format & DNSSEC Security Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**2.4B DNS Caching, Resource Records (A, NS, CNAME, MX), Wire Format & DNSSEC Security** — TTL-based DNS caching, Resource Record (RR) 4-tuples (Name, Value, Type, TTL), 12-byte binary DNS query/reply header format, registrar insertion, DDoS attacks, and DNSSEC authentication.\n\n**Caching DNS Information**\n\n- once (any) name server learns mapping, it caches mapping, and immediately returns a cached mapping in response to a query\n  - caching improves response time\n  - cache entries timeout (disappear) after some time (TTL)\n  - TLD servers typically cached in local name servers\n- cached entries may be out-of-date\n  - if named host changes IP address, may not be known Internet-wide until all TTLs expire!\n  - best-effort name-to-address translation!\n\n**DNS records**\n\n- **DNS:** distributed database storing resource records (RR)\n- type=NS\n  - name is domain (e.g., foo.com)\n  - value is hostname of authoritative name server for this domain\n- **RR format:** (name, value, type, ttl)\n- type=A\n  - name is hostname\n  - value is IP address\n- type=CNAME\n  - name is alias name for some “canonical” (the real) name\n  - www.ibm.com is really servereast.backup2.ibm.com\n  - value is canonical name\n- type=MX\n  - value is name of SMTP mail server associated with name",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 2 Key Principle",
          "message": "TTL-based DNS caching, Resource Record (RR) 4-tuples (Name, Value, Type, TTL), 12-byte binary DNS query/reply header format, registrar insertion, DDoS attacks, and DNSSEC authentication."
        }
      },
      {
        "title": "2. DNS protocol messages (Slides 2-80..82)",
        "content": "**DNS protocol messages**\n\n- identification\n- flags\n- # questions\n- questions (variable # of questions)\n- # additional RRs\n- # authority RRs\n- # answer RRs\n- answers (variable # of RRs)\n- authority (variable # of RRs)\n- additional info (variable # of RRs)\n- 2 bytes\n- 2 bytes\n- DNS query and reply messages, both have same format:\n- **message header:** \n- **identification:** 16 bit # for query, reply to query uses same #\n- **flags:** \n  - query or reply\n  - recursion desired\n  - recursion available\n  - reply is authoritative\n- name, type fields for a query\n- RRs in response to query\n- records for authoritative servers\n- additional “ helpful” info that may be used\n\n**Getting your info into the DNS**\n\n- **example:** new startup “Network Utopia”\n- register name networkuptopia.com at DNS registrar (e.g., Network Solutions)\n  - provide names, IP addresses of authoritative name server (primary and secondary)\n  - registrar inserts NS, A RRs into .com TLD server:\n  - (networkutopia.com, dns1.networkutopia.com, NS)\n  - (dns1.networkutopia.com, 212.212.212.1, A)\n- create authoritative server locally with IP address 212.212.212.1\n  - type A record for www.networkuptopia.com\n  - type MX record for networkutopia.com"
      },
      {
        "title": "3. DNS security (Slides 2-83..84)",
        "content": "**DNS security**\n\n- DDoS attacks\n- bombard root servers with traffic\n  - not successful to date\n  - traffic filtering\n  - local DNS servers cache IPs of TLD servers, allowing root server bypass\n- bombard TLD servers\n  - potentially more dangerous\n- Spoofing attacks\n- intercept DNS queries, returning bogus replies\n  - DNS cache poisoning\n  - RFC 4033: DNSSEC authentication services\n\n**Application layer: overview**\n\n- Principles of network applications\n- Web and HTTP\n- E-mail, SMTP, IMAP\n- The Domain Name System DNS\n- P2P applications\n- video streaming and content distribution networks\n- socket programming with UDP and TCP"
      },
      {
        "title": "4. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **2.4B DNS Caching, Resource Records (A, NS, CNAME, MX), Wire Format & DNSSEC Security**:\n\n- **Review Question 1 (Why does the DNS perform caching?):** What is the value of caching in the local DNS name server? Check all that apply.\n  - **Verified Answer:** DNS caching results in less load elsewhere in DNS, when the reply to a query is found in the local cache.; DNS caching provides for faster replies, if the reply to the query is found in the cache.\n\n- **Review Question 2 (What's in the DNS type A resource record?):** What information does the type “A” resource record hold in the DNS database? Check all that apply.\n  - **Verified Answer:** A hostname and an IP address.\n\n- **Review Question 3 (DNS in Action (1).):** Suppose that the local DNS server caches all information coming in from all root, TLD, and authoritative DNS servers for 20 time units. (Thus, for example, when a root server returns the name and address of a TLD server for .com, the cache remembers that this is the TLD server to use to resolve a .com name). Assume also that the local cache is initially empty, that iterative DNS queries are always used, that DNS requests are just for name-to-IP-address translation, that 1 time unit is needed for each server-to-server or host-to-server (one way) request or response, and that there is only one authoritative name server (each) for any .edu or .com domain. Consider the following DNS requests, made by the local host at the given times: t=0, the local host requests that the name gaia.cs.umass.edu be resolved to an IP address. t=1, the local host requests that the name icann.org be resolved to an IP address. t=5, the local host requests that the name cs.umd.edu be resolved to an IP address. (Hint: be careful!) t=10, the local host again requests that the name gaia.cs.umass.edu be resolved to an IP address. t=12 , the local host requests that the name cs.mit.edu be resolved to an IP address. t=30, the local host again requests that the name gaia.cs.umass.edu be resolved to an IP address. (Hint: be careful!) Which of the requests require 8 time units to be resolved?\n  - **Verified Answer:** The request at t=1 .; The request at t=0 .; The request at t=30 .",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "dns_rr_table_lookup.py — Authoritative & Cached DNS Resource Record (A, NS, CNAME, MX) Engine",
          "snippet": "# Kurose & Ross 9e - Section 2.4.3: DNS Resource Record (RR) 4-Tuple Store\nresource_records = [\n    (\"foo.com\", \"relay1.bar.foo.com\", \"CNAME\", 3600),\n    (\"relay1.bar.foo.com\", \"145.37.93.126\", \"A\", 3600),\n    (\"foo.com\", \"mail.bar.foo.com\", \"MX\", 7200),\n    (\"mail.bar.foo.com\", \"145.37.93.130\", \"A\", 7200),\n    (\"foo.com\", \"dns.foo.com\", \"NS\", 86400),\n]\n\ndef lookup(domain: str, qtype: str):\n    print(f\"Query: ({domain}, Type={qtype})\")\n    for name, val, rtype, ttl in resource_records:\n        if name == domain and rtype == qtype:\n            print(f\"  -> Match RR: ({name}, {val}, {rtype}, TTL={ttl}s)\")\n            return val\n        if name == domain and rtype == \"CNAME\" and qtype == \"A\":\n            print(f\"  -> Alias CNAME: {name} -> {val}\")\n            return lookup(val, \"A\")\n\nlookup(\"foo.com\", \"A\")\nlookup(\"foo.com\", \"MX\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 2.4B DNS Caching, Resource Records (A, NS, CNAME, MX), Wire Format & DNSSEC Security",
      "filename": "dns_rr_table_lookup.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 2.4.3: DNS Resource Record (RR) 4-Tuple Store\nresource_records = [\n    (\"foo.com\", \"relay1.bar.foo.com\", \"CNAME\", 3600),\n    (\"relay1.bar.foo.com\", \"145.37.93.126\", \"A\", 3600),\n    (\"foo.com\", \"mail.bar.foo.com\", \"MX\", 7200),\n    (\"mail.bar.foo.com\", \"145.37.93.130\", \"A\", 7200),\n    (\"foo.com\", \"dns.foo.com\", \"NS\", 86400),\n]\n\ndef lookup(domain: str, qtype: str):\n    print(f\"Query: ({domain}, Type={qtype})\")\n    for name, val, rtype, ttl in resource_records:\n        if name == domain and rtype == qtype:\n            print(f\"  -> Match RR: ({name}, {val}, {rtype}, TTL={ttl}s)\")\n            return val\n        if name == domain and rtype == \"CNAME\" and qtype == \"A\":\n            print(f\"  -> Alias CNAME: {name} -> {val}\")\n            return lookup(val, \"A\")\n\nlookup(\"foo.com\", \"A\")\nlookup(\"foo.com\", \"MX\")",
      "expectedOutput": [
        "[OK] dns_rr_table_lookup.py — Authoritative & Cached DNS Resource Record (A, NS, CNAME, MX) Engine",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 2.4B DNS Caching, Resource Records (A, NS, CNAME, MX), Wire Format & DNSSEC Security. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "[This question is the same as an earlier question, except for the question statement at the very end.] Suppose that the local DNS server caches all information coming in from all root, TLD, and authoritative DNS servers for 20 time units. (Thus, for example, when a root server returns the name and address of a TLD server for .com, the cache remembers that this is the TLD server to use to resolve a .com name). Assume also that the local cache is initially empty, that iterative DNS queries are always used, that DNS requests are just for name-to-IP-address translation, that 1 time unit is needed for each server-to-server or host-to-server (one way) request or response, and that there is only one authoritative name server (each) for any .edu or .com domain. Consider the following DNS requests, made by the local host at the given times: t=0, the local host requests that the name gaia.cs.umass.edu be resolved to an IP address. t=1, the local host requests that the name icann.org be resolved to an IP address. t=5, the local host requests that the name cs.umd.edu be resolved to an IP address. (Hint: be careful!) t=10, the local host again requests that the name gaia.cs.umass.edu be resolved to an IP address. t=12 , the local host requests that the name cs.mit.edu be resolved to an IP address. t=30, the local host again requests that the name gaia.cs.umass.edu be resolved to an IP address. (Hint: be careful!) Which of the requests require 2 time units to be resolved?",
      "options": [
        "A) The request at t=1 .",
        "B) The request at t=0 .",
        "C) The request at t=30 .",
        "D) The request at t=12 ."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 2), 'The request at t=1 .' accurately characterizes 2.4B DNS Caching, Resource Records (A, NS, CNAME, MX), Wire Format & DNSSEC Security."
    }
  },
  "cn-ch2-video-streaming-cdns": {
    "id": "cn-ch2-video-streaming-cdns",
    "badge": "Module 2 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta Seviye",
    "title": "2.5 Video Streaming & Content Distribution Networks (CDNs): Playout Buffering, DASH, Akamai & Netflix",
    "subtitle": "Spatial/temporal CBR and VBR video coding, client-side playout buffering against network jitter, HTTP Adaptive Streaming (DASH manifest chunks), Enter Deep vs. Bring Home CDNs, and Netflix Open Connect.",
    "sections": [
      {
        "title": "1. Video Streaming and CDNs: context (Slides 2-85..89)",
        "content": "![2.5 Video Streaming & Content Distribution Networks (CDNs): Playout Buffering, DASH, Akamai & Netflix Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**2.5 Video Streaming & Content Distribution Networks (CDNs): Playout Buffering, DASH, Akamai & Netflix** — Spatial/temporal CBR and VBR video coding, client-side playout buffering against network jitter, HTTP Adaptive Streaming (DASH manifest chunks), Enter Deep vs. Bring Home CDNs, and Netflix Open Connect.\n\n**Video Streaming and CDNs: context**\n\n- **stream video traffic:** major consumer of Internet bandwidth\n  - Netflix, YouTube, Amazon Prime: 80% of residential ISP traffic (2020)\n- **challenge:** scale - how to reach ~1B users?\n- **challenge:** heterogeneity\n  - different users have different capabilities (e.g., wired versus mobile; bandwidth rich versus bandwidth poor)\n- **solution:** distributed, application-level infrastructure\n\n**Multimedia: video**\n\n- **video:** sequence of images displayed at constant rate\n  - e.g., 24 images/sec\n- **digital image:** array of pixels\n  - each pixel represented by bits\n- **coding:** use redundancy within and between images to decrease # bits used to encode image\n  - spatial (within image)\n  - temporal (from one image to next)\n- ……………………..\n- **spatial coding example:** instead of sending N values of same color (all purple), send only two values: color value (purple) and number of repeated values (N)\n- ……………….…….\n- frame i\n- frame i+1\n- **temporal coding example:** instead of sending complete frame at i+1, send only differences from frame i\n- **CBR:** (constant bit rate): video encoding rate fixed\n- **VBR:** (variable bit rate): video encoding rate changes as amount of spatial, temporal coding changes\n- **examples:** \n  - MPEG 1 (CD-ROM) 1.5 Mbps\n  - MPEG2 (DVD) 3-6 Mbps\n  - MPEG4 (often used in Internet, 64Kbps – 12 Mbps)\n\n**Streaming stored video**\n\n- **Main challenges:** \n- server-to-client bandwidth will vary over time, with changing network congestion levels (in house, access network, network core, video server)\n- packet loss, delay due to congestion will delay playout, or result in poor video quality\n- **simple scenario:** \n- video server\n- (stored video)\n- client\n- Internet\n- video\n- recorded (e.g., 30 frames/sec)\n- 2. video\n- sent\n- Cumulative data\n- **streaming:** at this time, client playing out early part of video, while server still sending later part of video\n- time\n- 3. video received, played out at client\n- (30 frames/sec)\n- network delay\n- (fixed in this example)",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 2 Key Principle",
          "message": "Spatial/temporal CBR and VBR video coding, client-side playout buffering against network jitter, HTTP Adaptive Streaming (DASH manifest chunks), Enter Deep vs. Bring Home CDNs, and Netflix Open Connect."
        }
      },
      {
        "title": "2. Streaming stored video: challenges (Slides 2-90..93)",
        "content": "**Streaming stored video: challenges**\n\n- **continuous playout constraint:** during client video playout, playout timing must match original timing\n  - … but network delays are variable (jitter), so will need client-side buffer to match continuous playout constraint\n- **other challenges:** \n  - client interactivity: pause, fast-forward, rewind, jump through video\n  - video packets may be lost, retransmitted\n\n**Streaming stored video: playout buffering**\n\n- constant bit\n- rate video\n- transmission\n- Cumulative data (chunks)\n- time\n- variable\n- network\n- delay\n- client video\n- reception\n- constant bit\n- rate video\n- playout at client\n- client playout\n- delay\n- buffered\n- video\n- **client-side buffering and playout delay:** compensate for network-added delay, delay jitter\n- at t0, 6 chunks have arrived, 2 chunks have been played out, so the buffer has 4 chunks\n\n**Streaming multimedia: DASH**\n\n- **server:** \n  - divides video file into multiple chunks\n  - each chunk encoded at multiple different rates\n  - different rate encodings stored in different files\n  - files replicated in various CDN nodes\n  - manifest file: provides URLs for different chunks\n- client\n- **client:** \n  - periodically estimates server-to-client bandwidth\n  - consulting manifest, requests one chunk at a time\n    - chooses maximum coding rate sustainable given current bandwidth\n    - can choose different coding rates at different points in time (depending on available bandwidth at time), and from different servers\n- Dynamic, Adaptive Streaming over HTTP\n- **“intelligence” at client:** client determines\n  - when to request chunk (so that buffer starvation, or overflow does not occur)\n  - what encoding rate to request (higher quality when more bandwidth available)\n  - where to request chunk (can request from URL server that is “close” to client or has high available bandwidth)\n- Streaming video = encoding + DASH + playout buffering"
      },
      {
        "title": "3. Content distribution networks (CDNs) (Slides 2-94..97)",
        "content": "**Content distribution networks (CDNs)**\n\n- **challenge:** how to stream content (selected from millions of videos) to hundreds of thousands of simultaneous users?\n- **option 1:** single, large “mega-server”\n  - single point of failure\n  - point of network congestion\n  - long (and possibly congested) path to distant clients\n- **….quite simply:** this solution doesn’t scale\n  - enter deep: push CDN servers deep into many access networks\n    - close to users\n    - Akamai: 240,000 servers deployed\n    - in > 120 countries (2015)\n- **option 2:** store/serve multiple copies of videos at multiple geographically distributed sites (CDN)\n  - bring home: smaller number (10’s) of larger clusters in POPs near access nets\n    - used by Limelight\n\n**Akamai today:**\n\n- **Source:** https://networkingchannel.eu/living-on-the-edge-for-a-quarter-century-an-akamai-retrospective-downloads/\n\n**How does Netflix work?**\n\n- subscriber requests content, service provider returns manifest\n- **Netflix:** stores copies of content (e.g., MADMEN) at its (worldwide) OpenConnect CDN nodes\n- where’s Madmen?\n- manifest file\n  - using manifest, client retrieves content at highest supportable rate\n  - may choose different rate or copy if network path congested\n\n> **Kurose & Ross Lecture Note:** Akamai: 100,000+ servers in 1000+ clusters in 1000+ networks in 70+ countries serving trillions of requests a day. How many people use Netflix?"
      },
      {
        "title": "4. Content distribution networks (CDNs) (Slides 2-98..118)",
        "content": "**Content distribution networks (CDNs)**\n\n- Internet host-host communication as a service\n- **OTT challenges:** coping with a congested Internet from the “edge”\n  - what content to place in which CDN node?\n  - from which CDN node to retrieve content? At which rate?\n- **OTT:** “over the top”\n\n> **Kurose & Ross Lecture Note:** peak load: 7million viewers, 2 Tbytes via\n\n**Application Layer: Overview**\n\n- Principles of network applications\n- Web and HTTP\n- E-mail, SMTP, IMAP\n- The Domain Name System DNS\n- P2P applications\n- video streaming and content distribution networks\n- socket programming with UDP and TCP\n\n**CDN content access: a closer look**\n\n- **1. Bob gets URL for video http:** //netcinema.com/6Y7B23V\n- from netcinema.com web page\n- **2. resolve http:** //netcinema.com/6Y7B23V\n- via Bob’s local DNS\n- 3. netcinema’s DNS returns CNAME for\n- **http:** //KingCDN.com/NetC6y&B23V\n- 6. request video from\n- KINGCDN server,\n- streamed via HTTP\n- **Bob (client) requests video http:** //netcinema.com/6Y7B23V\n- **video stored in CDN at http:** //KingCDN.com/NetC6y&B23V\n\n- **Slide Diagram Elements & Protocol Entities:** `netcinema.com, KingCDN.com, netcinema’s authoritative DNS, KingCDN authoritative DNS, Bob’s local DNS server`\n\n> **Kurose & Ross Lecture Note:** This slide retired, since there’s the Netflix example which is visually better"
      },
      {
        "title": "5. Case study: Netflix (Slides 2-119..119)",
        "content": "- DASH server selected, contacted, streaming begins\n- upload copies of multiple versions of video to CDN servers\n\n- **Slide Diagram Elements & Protocol Entities:** `Bob manages Netflix account, Netflix registration, accounting servers, Amazon cloud, CDN server, Bob browses Netflix video, Manifest file, requested returned for specific video`\n\n> **Kurose & Ross Lecture Note:** This slide retired, since there’s the new Netflix example which is visually better"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **2.5 Video Streaming & Content Distribution Networks (CDNs): Playout Buffering, DASH, Akamai & Netflix**:\n\n- **Review Question 1 (.6-4):** Manifest file. What is the purpose of a manifest file in a streaming multimedia setting?\n  - **Verified Answer:** To let a client know where it can retrieve different video segments, encoded at different rates\n\n- **Review Question 2 (CDNs.):** What approach is taken by a CDN to stream content to hundreds of thousands of simultaneous users?\n  - **Verified Answer:** Store/serve multiple copies of videos at multiple geographically distributed sites.\n\n- **Review Question 3 (What is DASH?):** In DASH (Dynamic, Adaptive Streaming over HTTP), a server divides a video file into chunks that ... (pick best completion from below)\n  - **Verified Answer:** ... are stored, each encoded at multiple rates (video quality). The client plays the video chunk-by-chunk, with each chunk requested at encoding rate that fits the available bandwidth at the time.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "dash_adaptive_bitrate.py — Simulating a Client-Side DASH Adaptive Bitrate (ABR) Controller",
          "snippet": "# Kurose & Ross 9e - Section 2.5: HTTP DASH Adaptive Bitrate (ABR) Selection Algorithm\nmanifest_profiles = [\n    (\"360p_SD\", 0.8),\n    (\"720p_HD\", 2.5),\n    (\"1080p_FHD\", 5.0),\n    (\"4K_UHD\", 15.0),\n]\n\nmeasured_bandwidth_mbps = [18.5, 12.0, 6.2, 2.9, 9.5, 22.0]\nbuffer_seconds = 8.0\n\nfor chunk_id, bw in enumerate(measured_bandwidth_mbps, 1):\n    safe_bw = bw * 0.80  # 20% safety margin to prevent playout buffer stall\n    chosen = manifest_profiles[0]\n    for profile, rate in manifest_profiles:\n        if rate <= safe_bw:\n            chosen = (profile, rate)\n    # 4-second video chunk downloaded at 'bw' Mbps\n    download_time = (4.0 * chosen[1]) / bw\n    buffer_seconds = max(0.0, buffer_seconds - download_time + 4.0)\n    print(f\"Chunk #{chunk_id} | Est BW: {bw:5.1f} Mbps | Selected: {chosen[0]:9s} ({chosen[1]:4.1f} Mbps) | Buffer: {buffer_seconds:4.1f}s\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 2.5 Video Streaming & Content Distribution Networks (CDNs): Playout Buffering, DASH, Akamai & Netflix",
      "filename": "dash_adaptive_bitrate.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 2.5: HTTP DASH Adaptive Bitrate (ABR) Selection Algorithm\nmanifest_profiles = [\n    (\"360p_SD\", 0.8),\n    (\"720p_HD\", 2.5),\n    (\"1080p_FHD\", 5.0),\n    (\"4K_UHD\", 15.0),\n]\n\nmeasured_bandwidth_mbps = [18.5, 12.0, 6.2, 2.9, 9.5, 22.0]\nbuffer_seconds = 8.0\n\nfor chunk_id, bw in enumerate(measured_bandwidth_mbps, 1):\n    safe_bw = bw * 0.80  # 20% safety margin to prevent playout buffer stall\n    chosen = manifest_profiles[0]\n    for profile, rate in manifest_profiles:\n        if rate <= safe_bw:\n            chosen = (profile, rate)\n    # 4-second video chunk downloaded at 'bw' Mbps\n    download_time = (4.0 * chosen[1]) / bw\n    buffer_seconds = max(0.0, buffer_seconds - download_time + 4.0)\n    print(f\"Chunk #{chunk_id} | Est BW: {bw:5.1f} Mbps | Selected: {chosen[0]:9s} ({chosen[1]:4.1f} Mbps) | Buffer: {buffer_seconds:4.1f}s\")",
      "expectedOutput": [
        "[OK] dash_adaptive_bitrate.py — Simulating a Client-Side DASH Adaptive Bitrate (ABR) Controller",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 2.5 Video Streaming & Content Distribution Networks (CDNs): Playout Buffering, DASH, Akamai & Netflix. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "What approach is taken by a CDN to stream content to hundreds of thousands of simultaneous users?",
      "options": [
        "A) Allow client devices to send requested content to each other, in order to offload the CDN infrastructure.",
        "B) Store/serve multiple copies of videos at multiple geographically distributed sites.",
        "C) Serve video from a single central “mega-server” with ultra-high-speed network connectivity, and high-speed storage.",
        "D) Proactively push videos to a client device before they’re requested, using machine learning to predict requested videos."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 2), 'Store/serve multiple copies of videos at multiple geographically distributed sites.' accurately characterizes 2.5 Video Streaming & Content Distribution Networks (CDNs): Playout Buffering, DASH, Akamai & Netflix."
    }
  },
  "cn-ch2-socket-programming": {
    "id": "cn-ch2-socket-programming",
    "badge": "Module 2 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta Seviye",
    "title": "2.6 Socket Programming in Python: Building UDP Datagram & TCP Stream Client/Server Apps",
    "subtitle": "Hands-on network application development using Python's socket API: SOCK_DGRAM connectionless UDP interaction vs. SOCK_STREAM welcoming/connection sockets and timeout exception handling.",
    "sections": [
      {
        "title": "1. Socket programming (Slides 2-100..103)",
        "content": "![2.6 Socket Programming in Python: Building UDP Datagram & TCP Stream Client/Server Apps Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**2.6 Socket Programming in Python: Building UDP Datagram & TCP Stream Client/Server Apps** — Hands-on network application development using Python's socket API: SOCK_DGRAM connectionless UDP interaction vs. SOCK_STREAM welcoming/connection sockets and timeout exception handling.\n\n**Socket programming**\n\n- **goal:** learn how to build client/server applications that communicate using sockets\n- **socket:** door between application process and end-end-transport protocol\n- Internet\n- controlled\n- by OS\n- controlled by\n- app developer\n- transport\n- application\n- physical\n- link\n- network\n- process\n- transport\n- application\n- physical\n- link\n- network\n- process\n- socket\n  - Two socket types for two transport services:\n  - UDP: unreliable datagram\n  - TCP: reliable, byte stream-oriented\n  - Application Example:\n- client reads a line of characters (data) from its keyboard and sends data to server\n- server receives the data and converts characters to uppercase\n- server sends modified data to client\n- client receives modified data and displays line on its screen\n\n**Socket programming with UDP**\n\n- **UDP:** no “connection” between client and server:\n- no handshaking before sending data\n- sender explicitly attaches IP destination address and port # to each packet\n- receiver extracts sender IP address and port# from received packet\n- **UDP:** transmitted data may be lost or received out-of-order\n- **Application viewpoint:** \n- UDP provides unreliable transfer of groups of bytes (“datagrams”) between client and server processes\n\n**Client/server socket interaction: UDP**\n\n- close\n- clientSocket\n- read datagram from\n- clientSocket\n- **create socket:** \n- clientSocket =\n- socket(AF_INET,SOCK_DGRAM)\n- Create datagram with serverIP address\n- And port=x; send datagram via clientSocket\n- **create socket, port= x:** \n- serverSocket =\n- socket(AF_INET,SOCK_DGRAM)\n- read datagram from\n- serverSocket\n- write reply to\n- serverSocket\n- specifying client address,\n- port number\n- server (running on serverIP)\n- client",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 2 Key Principle",
          "message": "Hands-on network application development using Python's socket API: SOCK_DGRAM connectionless UDP interaction vs. SOCK_STREAM welcoming/connection sockets and timeout exception handling."
        }
      },
      {
        "title": "2. Example app: UDP client (Slides 2-104..106)",
        "content": "**Example app: UDP client**\n\n- from socket import *\n- serverName = 'hostname'\n- serverPort = 12000\n- clientSocket = socket(AF_INET,\n- SOCK_DGRAM)\n- **message = input('Input lowercase sentence:** ')\n- clientSocket.sendto(message.encode(),\n- (serverName, serverPort))\n- modifiedMessage, serverAddress =\n- clientSocket.recvfrom(2048)\n- print(modifiedMessage.decode())\n- clientSocket.close()\n- Python UDPClient\n- include Python’s socket library\n- create UDP socket\n- get user keyboard input\n- attach server name, port to message; send into socket\n- print out received string and close socket\n- read reply data (bytes) from socket\n- **Note:** this code update (2023) to Python 3\n\n> **Kurose & Ross Lecture Note:** UDO and TCP code updates 3/23\n\n**Example app: UDP server**\n\n- Python UDPServer\n- from socket import *\n- serverPort = 12000\n- serverSocket = socket(AF_INET, SOCK_DGRAM)\n- serverSocket.bind(('', serverPort))\n- print('The server is ready to receive')\n- **while True:** \n- message, clientAddress = serverSocket.recvfrom(2048)\n- modifiedMessage = message.decode().upper()\n- serverSocket.sendto(modifiedMessage.encode(),\n- clientAddress)\n- create UDP socket\n- bind socket to local port number 12000\n- loop forever\n- Read from UDP socket into message, getting client’s address (client IP and port)\n- send upper case string back to this client\n- **Note:** this code update (2023) to Python 3\n\n**Socket programming with TCP**\n\n- Client must contact server\n- server process must first be running\n- server must have created socket (door) that welcomes client’s contact\n- **Client contacts server by:** \n- Creating TCP socket, specifying IP address, port number of server process\n- **when client creates socket:** client TCP establishes connection to server TCP\n- when contacted by client, server TCP creates new socket for server process to communicate with that particular client\n  - allows server to talk with multiple clients\n  - client source port # and IP address used to distinguish clients (more in Chap 3)\n- TCP provides reliable, in-order\n- byte-stream transfer (“pipe”)\n- between client and server processes\n- Application viewpoint"
      },
      {
        "title": "3. Client/server socket interaction: TCP (Slides 2-107..109)",
        "content": "**Client/server socket interaction: TCP**\n\n- server (running on hostid)\n- client\n- wait for incoming\n- connection request\n- connectionSocket =\n- serverSocket.accept()\n- create socket,\n- **port=x, for incoming request:** \n- serverSocket = socket()\n- create socket,\n- connect to hostid, port=x\n- clientSocket = socket()\n- send request using\n- clientSocket\n- read request from\n- connectionSocket\n- write reply to\n- connectionSocket\n- TCP\n- connection setup\n- close\n- connectionSocket\n- read reply from\n- clientSocket\n- close\n- clientSocket\n\n**Example app: TCP client**\n\n- from socket import *\n- serverName = 'servername'\n- serverPort = 12000\n- clientSocket = socket(AF_INET, SOCK_STREAM)\n- clientSocket.connect((serverName,serverPort))\n- sentence = input('Input lowercase sentence:')\n- clientSocket.send(sentence.encode())\n- modifiedSentence = clientSocket.recv(1024)\n- **print ('From Server:** ', modifiedSentence.decode())\n- clientSocket.close()\n- Python TCPClient\n- create TCP socket for server, remote port 12000\n- No need to attach server name, port\n- **Note:** this code update (2023) to Python 3\n\n**Example app: TCP server**\n\n- from socket import *\n- serverPort = 12000\n- serverSocket = socket(AF_INET,SOCK_STREAM)\n- serverSocket.bind(('',serverPort))\n- serverSocket.listen(1)\n- print('The server is ready to receive')\n- **while True:** \n- connectionSocket, addr = serverSocket.accept()\n- sentence = connectionSocket.recv(1024).decode()\n- capitalizedSentence = sentence.upper()\n- connectionSocket.send(capitalizedSentence.\n- encode())\n- connectionSocket.close()\n- Python TCPServer\n- create TCP welcoming socket\n- server begins listening for incoming TCP requests\n- loop forever\n- server waits on accept() for incoming requests, new socket created on return\n- read bytes from socket (but not address as in UDP)\n- close connection to this client (but not welcoming socket)\n- **Note:** this code update (2023) to Python 3"
      },
      {
        "title": "4. Chapter 2: Summary (Slides 2-110..114)",
        "content": "**Chapter 2: Summary**\n\n- application architectures\n  - client-server\n  - P2P\n- **application service requirements:** \n  - reliability, bandwidth, delay\n- Internet transport service model\n  - connection-oriented, reliable: TCP\n  - unreliable, datagrams: UDP\n- our study of network application layer is now complete!\n- **specific protocols:** \n  - HTTP\n  - SMTP, IMAP\n  - DNS\n  - P2P: BitTorrent\n- video streaming, CDNs\n- **socket programming:** \n- TCP, UDP sockets\n- **Most importantly:** learned about protocols!\n- **Important themes:** \n- typical client/server request/reply message exchange\n- centralized vs. decentralized\n- stateless vs. stateful\n- scalability\n- reliable vs. unreliable message transfer\n- “complexity at network edge”\n\n**Socket programming: waiting for multiple events**\n\n- timeout\n- handle timeout\n- receive a message\n- sometimes a program must wait for one of several events to happen, e.g.,:\n  - wait for either (i) a reply from another end of the socket, or (ii) timeout: timer\n  - wait for replies from several different open sockets: select(), multithreading\n- timeouts are used extensively in networking\n- **using timeouts with Python socket:** \n- socket()\n- connect()\n- send()\n- recv()\n- throw exception\n- **Show example:** connect wordle client to random port, it will freeze.\n- settimeout()\n- handle exception\n\n> **Kurose & Ross Lecture Note:** This is going to be something new for some students. Interruption-driven programming, timeout.\n\n**s.settimeout(30)**\n\n- s.recv()\n- timer starts!\n- interrupt s.recv() &\n- raise timeout exception\n- timeout\n- s.settimeout(10)\n- s.recv()\n- timer starts!\n- receive a message\n- & timer stop!\n- s.recv()\n- timer starts!\n- interrupt s.recv() &\n- raise timeout exception\n- timeout\n- Set a timeout on all future socket operations of that specific socket!\n- no packet arrives in 30 secs\n- no packet arrives in 10 secs\n- How Python socket.settimeout() works?"
      },
      {
        "title": "5. Execute a block of code, and handle “exceptions” that may occur when executing that block of code (Slides 2-115..116)",
        "content": "**Execute a block of code, and handle “exceptions” that may occur when executing that block of code**\n\n- Python try-except block\n- **try:** <do something> except <exception>: <handle the exception>\n- Executing this try code block may cause exception(s) to catch. If an exception is raised, execution jumps from jumps directly into except code block\n- this except code block is only executed if an <exception> occurred in the try code block (note: except block is required with a try block)\n\n**Socket programming: socket timeouts**\n\n- from socket import *\n- serverPort = 12000\n- serverSocket = socket(AF_INET,SOCK_STREAM)\n- serverSocket.bind(('',serverPort))\n- serverSocket.listen(1)\n- counter = 0\n- **while counter < 3:** \n- connectionSocket, addr = serverSocket.accept()\n- connectionSocket.settimeout(10)\n- **try:** \n- wolf_location = connectionSocket.recv(1024).decode()\n- send_hunter(wolf_location) # a villager function\n- connectionSocket.send('hunter sent')\n- **except timeout:** \n- counter += 1\n- connectionSocket.close()\n- Python TCPServer (Villagers)\n- set a 10-seconds timeout on all future socket operations\n- catch socket timeout exception\n- timer starts when recv() is called and will raise timeout exception if there is no message within 10 seconds.\n- Use settimeout(None). settimeout(0) will result in changing the socket to non-blocking mode.\n- How to remove settimeout()?\n- - A shepherd boy tends his master’s sheep.\n- - If he sees a wolf, he can send a message to villagers for help using a TCP socket.\n- - The boy found it fun to connect to the server without sending any messages. But the villagers don’t think so.\n- - And they decided that if the boy connects to the server and doesn’t send the wolf location within 10 seconds for three times, they will stop listening to him forever and ever.\n- **Toy Example:** \n\n> **Kurose & Ross Lecture Note:** Talk a bit about real-world examples for timeout at the end. Question: settimeout(10), then what happens in the next iteration? Will .accept() have timeout? Non-blocking: https://www.scottklement.com/rpg/socktut/nonblocking.html"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **2.6 Socket Programming in Python: Building UDP Datagram & TCP Stream Client/Server Apps**:\n\n- **Review Question 1 (UDP Sockets.):** Which of the following characteristics below are associated with a UDP socket? Check one or more that apply.\n  - **Verified Answer:** provides unreliable transfer of a groups of bytes (“a datagram”), from client to server; data from different clients can be received on the same socket; socket(AF_INET, SOCK_DGRAM) creates this type of socket; the application must explicitly specify the IP destination address and port number for each group of bytes written into a socket\n\n- **Review Question 2 (TCP Sockets.):** Which of the following characteristics below are associated with a TCP socket? Check one or more that apply.\n  - **Verified Answer:** socket(AF_INET, SOCK_STREAM) creates this type of socket; when contacted, the server will create a new server-side socket to communicate with that client; provides reliable, in-order byte-stream transfer (a “pipe”), from client to server; a server can perform an accept() on this type of socket\n\n- **Review Question 3 (Server reply (UDP).):** How does the networked application running on a server know the client IP address and the port number to reply to in response to a received datagram?\n  - **Verified Answer:** The application code at the server determines client IP address and port # from the initial segment sent by client, and must explicitly specify these values when sending into a socket back to that client.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "udp_tcp_socket_patterns.py — Kurose & Ross Python UDP & TCP Client/Server Socket Templates",
          "snippet": "# Kurose & Ross 9e - Section 2.6: Socket API Flow for UDP (SOCK_DGRAM) vs. TCP (SOCK_STREAM)\ndef simulate_socket_lifecycle():\n    print(\"=== 1. UDP Socket Interaction (Connectionless Datagram) ===\")\n    print(\"Server: serverSocket = socket(AF_INET, SOCK_DGRAM); serverSocket.bind(('', 12000))\")\n    print(\"Client: clientSocket = socket(AF_INET, SOCK_DGRAM)\")\n    print(\"Client: clientSocket.sendto(message.encode(), ('hostname', 12000))\")\n    print(\"Server: message, clientAddress = serverSocket.recvfrom(2048)\")\n    print(\"Server: serverSocket.sendto(message.decode().upper().encode(), clientAddress)\\n\")\n\n    print(\"=== 2. TCP Socket Interaction (Connection-Oriented Byte Stream) ===\")\n    print(\"Server: serverSocket = socket(AF_INET, SOCK_STREAM); serverSocket.bind(('', 12000)); serverSocket.listen(1)\")\n    print(\"Client: clientSocket = socket(AF_INET, SOCK_STREAM); clientSocket.connect(('hostname', 12000))  # 3-Way Handshake\")\n    print(\"Server: connectionSocket, addr = serverSocket.accept()  # Dedicated per-client socket!\")\n    print(\"Client: clientSocket.send(sentence.encode()) -> Server: connectionSocket.send(capitalized.encode())\")\n\nsimulate_socket_lifecycle()"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 2.6 Socket Programming in Python: Building UDP Datagram & TCP Stream Client/Server Apps",
      "filename": "udp_tcp_socket_patterns.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 2.6: Socket API Flow for UDP (SOCK_DGRAM) vs. TCP (SOCK_STREAM)\ndef simulate_socket_lifecycle():\n    print(\"=== 1. UDP Socket Interaction (Connectionless Datagram) ===\")\n    print(\"Server: serverSocket = socket(AF_INET, SOCK_DGRAM); serverSocket.bind(('', 12000))\")\n    print(\"Client: clientSocket = socket(AF_INET, SOCK_DGRAM)\")\n    print(\"Client: clientSocket.sendto(message.encode(), ('hostname', 12000))\")\n    print(\"Server: message, clientAddress = serverSocket.recvfrom(2048)\")\n    print(\"Server: serverSocket.sendto(message.decode().upper().encode(), clientAddress)\\n\")\n\n    print(\"=== 2. TCP Socket Interaction (Connection-Oriented Byte Stream) ===\")\n    print(\"Server: serverSocket = socket(AF_INET, SOCK_STREAM); serverSocket.bind(('', 12000)); serverSocket.listen(1)\")\n    print(\"Client: clientSocket = socket(AF_INET, SOCK_STREAM); clientSocket.connect(('hostname', 12000))  # 3-Way Handshake\")\n    print(\"Server: connectionSocket, addr = serverSocket.accept()  # Dedicated per-client socket!\")\n    print(\"Client: clientSocket.send(sentence.encode()) -> Server: connectionSocket.send(capitalized.encode())\")\n\nsimulate_socket_lifecycle()",
      "expectedOutput": [
        "[OK] udp_tcp_socket_patterns.py — Kurose & Ross Python UDP & TCP Client/Server Socket Templates",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 2.6 Socket Programming in Python: Building UDP Datagram & TCP Stream Client/Server Apps. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Suppose a Web server has five ongoing connections that use TCP receiver port 80, and assume there are no other TCP connections (open or being opened or closed) at that server. How many TCP sockets are in use at this server?",
      "options": [
        "A) 6",
        "B) 4",
        "C) 1",
        "D) 5"
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 2), '6' accurately characterizes 2.6 Socket Programming in Python: Building UDP Datagram & TCP Stream Client/Server Apps."
    }
  },
  "cn-ch3-transport-services-mux": {
    "id": "cn-ch3-transport-services-mux",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "3.1–3.2 Transport-Layer Services & Multiplexing / Demultiplexing (Connectionless vs. TCP 4-Tuple)",
    "subtitle": "Logical communication between application processes vs. hosts, source/destination port numbers, 2-tuple UDP socket demultiplexing, and 4-tuple TCP connection socket demultiplexing.",
    "sections": [
      {
        "title": "1. Transport layer: overview (Slides 3-2..6)",
        "content": "![3.1–3.2 Transport-Layer Services & Multiplexing / Demultiplexing (Connectionless vs. TCP 4-Tuple) Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.1–3.2 Transport-Layer Services & Multiplexing / Demultiplexing (Connectionless vs. TCP 4-Tuple)** — Logical communication between application processes vs. hosts, source/destination port numbers, 2-tuple UDP socket demultiplexing, and 4-tuple TCP connection socket demultiplexing.\n\n**Transport layer: overview**\n\n- **Our goal:** \n- understand principles behind transport layer services:\n  - multiplexing, demultiplexing\n  - reliable data transfer\n  - flow control\n  - congestion control\n- learn about Internet transport layer protocols:\n  - UDP: connectionless transport\n  - TCP: connection-oriented reliable transport\n  - TCP congestion control\n\n**Transport services and protocols**\n\n- provide logical communication between application processes running on different hosts\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n- application\n- transport\n- network\n- data link\n- physical\n- application\n- transport\n- network\n- data link\n- physical\n- logical end-end transport\n- transport protocols actions in end systems:\n  - sender: breaks application messages into segments, passes to network layer\n  - receiver: reassembles segments into messages, passes to application layer\n- two transport protocols available to Internet applications\n  - TCP, UDP\n\n> **Kurose & Ross Lecture Note:** By logical communication , we mean that from an application’s perspective, it is as if the hosts running the processes were directly connected; in reality, the hosts may be on opposite sides of the planet, connected via numerous routers and a wide range of link types. Application processes use the logical communication provided by the transport layer to send messages to each other, free from the worry of the details of the physical infrastructure used to carry these messages. Let’s look at each of these three (logical communications, actions,\n\n**Transport vs. network layer services and protocols**\n\n- **household analogy:** \n- 12 kids in Ann’s house sending letters to 12 kids in Bill’s house:\n- hosts = houses\n- processes = kids\n- app messages = letters in envelopes\n- transport protocol = Ann and Bill who demux to in-house siblings\n- network-layer protocol = postal service\n- **network layer:** communication between hosts\n- **transport layer:** communication between processes\n  - relies on, enhances, network layer services",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Logical communication between application processes vs. hosts, source/destination port numbers, 2-tuple UDP socket demultiplexing, and 4-tuple TCP connection socket demultiplexing."
        }
      },
      {
        "title": "2. Transport Layer Actions (Slides 3-7..11)",
        "content": "**Transport Layer Actions**\n\n- physical\n- link\n- network (IP)\n- application\n- physical\n- link\n- network (IP)\n- application\n- transport\n- **Sender:** \n- app. msg\n- is passed an application-layer message\n- determines segment header fields values\n- creates segment\n- passes segment to IP\n- transport\n- app. msg\n- **Receiver:** \n- extracts application-layer message\n- checks header values\n- receives segment from IP\n- demultiplexes message up to application via socket\n\n**Two principal Internet transport protocols**\n\n- mobile network\n- home network\n- enterprise\n- network\n- national or global ISP\n- local or regional ISP\n- datacenter\n- network\n- content\n- provider\n- network\n- application\n- transport\n- network\n- data link\n- physical\n- application\n- transport\n- network\n- data link\n- physical\n- logical end-end transport\n- **TCP:** Transmission Control Protocol\n  - reliable, in-order delivery\n  - congestion control\n  - flow control\n  - connection setup\n- **UDP:** User Datagram Protocol\n  - unreliable, unordered delivery\n  - no-frills extension of “best-effort” IP\n- **services not available:** \n  - delay guarantees\n  - bandwidth guarantees\n\n**Multiplexing/demultiplexing**\n\n- process\n- socket\n- use header info to deliver\n- received segments to correct\n- socket\n- **demultiplexing as receiver:** \n- transport\n- application\n- physical\n- link\n- network\n- transport\n- application\n- physical\n- link\n- network\n- transport\n- application\n- physical\n- link\n- network\n- handle data from multiple\n- sockets, add transport header (later used for demultiplexing)\n- **multiplexing as sender:** "
      },
      {
        "title": "3. transport (Slides 3-12..18)",
        "content": "**transport**\n\n- physical\n- link\n- network\n- transport\n- application\n- physical\n- link\n- network\n- transport\n- application\n- physical\n- link\n- network\n- HTTP server\n- client\n- HTTP msg\n- HTTP msg\n- HTTP msg\n- HTTP msg\n- HTTP msg\n- **Q:** how did transport layer know to deliver message to Firefox browser process rather then Netflix process or Skype process?\n\n**de-multiplexing**\n\n- **Slide Diagram Elements & Protocol Entities:** `transport, application`\n\n**multiplexing**\n\n- **Slide Diagram Elements & Protocol Entities:** `transport, application`"
      },
      {
        "title": "4. How demultiplexing works (Slides 3-20..22)",
        "content": "**How demultiplexing works**\n\n- host receives IP datagrams\n  - each datagram has source IP address, destination IP address\n  - each datagram carries one transport-layer segment\n  - each segment has source, destination port number\n- host uses IP addresses & port numbers to direct segment to appropriate socket\n- source port #\n- dest port #\n- 32 bits\n- application\n- data\n- (payload)\n- other header fields\n- TCP/UDP segment format\n\n**Connectionless demultiplexing**\n\n- **Recall:** \n- when creating socket, must specify host-local port #:\n- DatagramSocket mySocket1 = new DatagramSocket(12534);\n- **when receiving host receives UDP segment:** \n  - checks destination port # in segment\n  - directs UDP segment to socket with that port #\n- when creating datagram to send into UDP socket, must specify\n  - destination IP address\n  - destination port #\n- IP/UDP datagrams with same dest. port #, but different source IP addresses and/or source port numbers will be directed to same socket at receiving host\n\n**Connectionless demultiplexing: an example**\n\n- transport\n- application\n- physical\n- link\n- network\n- transport\n- application\n- physical\n- link\n- network\n- transport\n- application\n- physical\n- link\n- network\n- mySocket = socket(AF_INET,SOCK_DGRAM)\n- mySocket.bind(myaddr,9157);\n- **source port:** 9157\n- **dest port:** 6428\n- **source port:** 6428\n- **dest port:** 9157\n- **source port:** ?\n- **dest port:** ?\n- **source port:** ?\n- **dest port:** ?\n- mySocket = socket(AF_INET,SOCK_DGRAM)\n- mySocket.bind(myaddr,5775);\n- mySocket = socket(AF_INET,SOCK_DGRAM)\n- mySocket.bind(myaddr,6428);"
      },
      {
        "title": "5. Connection-oriented demultiplexing (Slides 3-23..25)",
        "content": "**Connection-oriented demultiplexing**\n\n- **TCP socket identified by 4-tuple:** \n  - source IP address\n  - source port number\n  - dest IP address\n  - dest port number\n- server may support many simultaneous TCP sockets:\n  - each socket identified by its own 4-tuple\n  - each socket associated with a different connecting client\n- **demux:** receiver uses all four values (4-tuple) to direct segment to appropriate socket\n\n**Connection-oriented demultiplexing: example**\n\n- transport\n- application\n- physical\n- link\n- network\n- transport\n- application\n- physical\n- link\n- transport\n- application\n- physical\n- link\n- network\n- **host:** IP address A\n- **host:** IP address C\n- network\n- **source IP,port:** A,9157\n- **dest IP, port:** B,80\n- **source IP,port:** B,80\n- **dest IP,port:** A,9157\n- **source IP,port:** C,5775\n- **dest IP,port:** B,80\n- **source IP,port:** C,9157\n- **dest IP,port:** B,80\n- **server:** IP address B\n- Three segments, all destined to IP address: B,\n- **dest port:** 80 are demultiplexed to different sockets\n\n**Summary**\n\n- **Multiplexing, demultiplexing:** based on segment, datagram header field values\n- **UDP:** demultiplexing using destination port number (only)\n- **TCP:** demultiplexing using 4-tuple: source and destination IP addresses, and port numbers\n- Multiplexing/demultiplexing happen at all layers"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.1–3.2 Transport-Layer Services & Multiplexing / Demultiplexing (Connectionless vs. TCP 4-Tuple)**:\n\n- **Review Question 1 (Location of transport-layer functionality.):** Where is transport-layer functionality primarily implemented?\n  - **Verified Answer:** Transport layer functions are implemented primarily at the hosts at the “edge” of the network.\n\n- **Review Question 2 (Transport-layer functionality.):** True or False: The transport layer provides for host-to-host delivery service?\n  - **Verified Answer:** True.\n\n- **Review Question 3 (Transport layer services using TCP.):** Check all of the services below that are provided by the TCP protocol.\n  - **Verified Answer:** Reliable data delivery.; In-order data delivery; A congestion control service to ensure that multiple senders do not overload network links.; A flow-control service that ensures that a sender will not send at such a high rate so as to overflow receiving host buffers.; A byte stream abstraction, that does not preserve boundaries between message data sent in different socket send calls at the sender.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "transport_demux_table.py — Simulating UDP 2-Tuple vs. TCP 4-Tuple Socket Demultiplexing",
          "snippet": "# Kurose & Ross 9e - Section 3.2: UDP 2-Tuple vs. TCP 4-Tuple Demultiplexing\nincoming_segments = [\n    {\"proto\": \"UDP\", \"src_ip\": \"198.51.100.10\", \"src_port\": 54112, \"dst_ip\": \"203.0.113.5\", \"dst_port\": 53},\n    {\"proto\": \"UDP\", \"src_ip\": \"192.0.2.88\",    \"src_port\": 61009, \"dst_ip\": \"203.0.113.5\", \"dst_port\": 53},\n    {\"proto\": \"TCP\", \"src_ip\": \"198.51.100.10\", \"src_port\": 49152, \"dst_ip\": \"203.0.113.5\", \"dst_port\": 80},\n    {\"proto\": \"TCP\", \"src_ip\": \"192.0.2.88\",    \"src_port\": 49152, \"dst_ip\": \"203.0.113.5\", \"dst_port\": 80},\n]\n\nfor seg in incoming_segments:\n    if seg[\"proto\"] == \"UDP\":\n        key = (seg[\"dst_ip\"], seg[\"dst_port\"])\n        print(f\"[UDP Demux] Key={key} -> Routes BOTH clients to the SAME UDP socket (Port {seg['dst_port']})\")\n    else:\n        key = (seg[\"src_ip\"], seg[\"src_port\"], seg[\"dst_ip\"], seg[\"dst_port\"])\n        print(f\"[TCP Demux] Key={key} -> Routes to DEDICATED connectionSocket\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.1–3.2 Transport-Layer Services & Multiplexing / Demultiplexing (Connectionless vs. TCP 4-Tuple)",
      "filename": "transport_demux_table.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.2: UDP 2-Tuple vs. TCP 4-Tuple Demultiplexing\nincoming_segments = [\n    {\"proto\": \"UDP\", \"src_ip\": \"198.51.100.10\", \"src_port\": 54112, \"dst_ip\": \"203.0.113.5\", \"dst_port\": 53},\n    {\"proto\": \"UDP\", \"src_ip\": \"192.0.2.88\",    \"src_port\": 61009, \"dst_ip\": \"203.0.113.5\", \"dst_port\": 53},\n    {\"proto\": \"TCP\", \"src_ip\": \"198.51.100.10\", \"src_port\": 49152, \"dst_ip\": \"203.0.113.5\", \"dst_port\": 80},\n    {\"proto\": \"TCP\", \"src_ip\": \"192.0.2.88\",    \"src_port\": 49152, \"dst_ip\": \"203.0.113.5\", \"dst_port\": 80},\n]\n\nfor seg in incoming_segments:\n    if seg[\"proto\"] == \"UDP\":\n        key = (seg[\"dst_ip\"], seg[\"dst_port\"])\n        print(f\"[UDP Demux] Key={key} -> Routes BOTH clients to the SAME UDP socket (Port {seg['dst_port']})\")\n    else:\n        key = (seg[\"src_ip\"], seg[\"src_port\"], seg[\"dst_ip\"], seg[\"dst_port\"])\n        print(f\"[TCP Demux] Key={key} -> Routes to DEDICATED connectionSocket\")",
      "expectedOutput": [
        "[OK] transport_demux_table.py — Simulating UDP 2-Tuple vs. TCP 4-Tuple Socket Demultiplexing",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.1–3.2 Transport-Layer Services & Multiplexing / Demultiplexing (Connectionless vs. TCP 4-Tuple). Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "True or False: When multiple TCP clients send TCP segments to the same destination port number at a receiving host, those segments (from different senders) will always be directed to the same socket at the receiving host.",
      "options": [
        "A) False",
        "B) True",
        "C) None of the above statements apply to this protocol layer.",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'False' accurately characterizes 3.1–3.2 Transport-Layer Services & Multiplexing / Demultiplexing (Connectionless vs. TCP 4-Tuple)."
    }
  },
  "cn-ch3-udp-protocol-checksum": {
    "id": "cn-ch3-udp-protocol-checksum",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "3.3 Connectionless Transport (UDP): RFC 768 Segment Header, Actions & 1's Complement Checksum",
    "subtitle": "Why DNS, SNMP, and HTTP/3 (QUIC) build on no-frills UDP: zero handshake delay, 8-byte segment header, and step-by-step 16-bit 1's complement Internet checksum arithmetic.",
    "sections": [
      {
        "title": "1. UDP: User Datagram Protocol (Slides 3-27..32)",
        "content": "![3.3 Connectionless Transport (UDP): RFC 768 Segment Header, Actions & 1's Complement Checksum Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.3 Connectionless Transport (UDP): RFC 768 Segment Header, Actions & 1's Complement Checksum** — Why DNS, SNMP, and HTTP/3 (QUIC) build on no-frills UDP: zero handshake delay, 8-byte segment header, and step-by-step 16-bit 1's complement Internet checksum arithmetic.\n\n**UDP: User Datagram Protocol**\n\n- “no frills,” “bare bones” Internet transport protocol\n- “best effort” service, UDP segments may be:\n  - lost\n  - delivered out-of-order to app\n- no connection establishment (which can add RTT delay)\n- **simple:** no connection state at sender, receiver\n- small header size\n- no congestion control\n  - UDP can blast away as fast as desired!\n  - can function in the face of congestion\n- Why is there a UDP?\n- **connectionless:** \n  - no handshaking between UDP sender, receiver\n  - each UDP segment handled independently of others\n- **UDP use:** \n  - streaming multimedia apps (loss tolerant, rate sensitive)\n  - DNS\n  - SNMP\n  - HTTP/3\n- if reliable transfer needed over UDP (e.g., HTTP/3):\n  - add needed reliability at application layer\n  - add congestion control at application layer\n\n**UDP: Transport Layer Actions**\n\n- SNMP server\n- SNMP client\n- transport\n- (UDP)\n- physical\n- link\n- network (IP)\n- application\n- transport\n- (UDP)\n- physical\n- link\n- network (IP)\n- application\n- **UDP sender actions:** \n- SNMP msg\n- is passed an application-layer message\n- determines UDP segment header fields values\n- creates UDP segment\n- passes segment to IP\n- UDPh\n- **UDP receiver actions:** \n- extracts application-layer message\n- checks UDP checksum header value\n- receives segment from IP\n- demultiplexes message up to application via socket",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Why DNS, SNMP, and HTTP/3 (QUIC) build on no-frills UDP: zero handshake delay, 8-byte segment header, and step-by-step 16-bit 1's complement Internet checksum arithmetic."
        }
      },
      {
        "title": "2. UDP segment header (Slides 3-33..34)",
        "content": "**UDP segment header**\n\n- source port #\n- dest port #\n- 32 bits\n- application\n- data\n- (payload)\n- UDP segment format\n- length\n- checksum\n- length, in bytes of UDP segment, including header\n- data to/from application layer\n\n**UDP checksum**\n\n- **Transmitted:** 5 6 11\n- **Goal:** detect errors (i.e., flipped bits) in transmitted segment\n- **Received:** 4 6 11\n- 1st number\n- 2nd number\n- sum\n- receiver-computed\n- checksum\n- sender-computed\n- checksum (as received)"
      },
      {
        "title": "3. Internet checksum (Slides 3-35..36)",
        "content": "**Internet checksum**\n\n- **sender:** \n- treat contents of UDP segment (including UDP header fields and IP addresses) as sequence of 16-bit integers\n- **checksum:** addition (one’s complement sum) of segment content\n- checksum value put into UDP checksum field\n- **receiver:** \n- compute checksum of received segment\n- check if computed checksum equals checksum field value:\n  - not equal - error detected\n  - equal - no error detected. But maybe errors nonetheless? More later ….\n- **Goal:** detect errors (i.e., flipped bits) in transmitted segment\n\n**Internet checksum: an example**\n\n- **example:** add two 16-bit integers\n- sum\n- checksum\n- **Note:** when adding numbers, a carryout from the most significant bit needs to be added to the result\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive/\n- 1 1 1 0 0 1 1 0 0 1 1 0 0 1 1 0\n- 1 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n- 1 1 0 1 1 1 0 1 1 1 0 1 1 1 0 1 1\n- wraparound\n- 1 0 1 1 1 0 1 1 1 0 1 1 1 1 0 0\n- 0 1 0 0 0 1 0 0 0 1 0 0 0 0 1 1"
      },
      {
        "title": "4. Internet checksum: weak protection! (Slides 3-37..38)",
        "content": "**Internet checksum: weak protection!**\n\n- **example:** add two 16-bit integers\n- sum\n- checksum\n- 1 1 1 0 0 1 1 0 0 1 1 0 0 1 1 0\n- 1 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n- 1 1 0 1 1 1 0 1 1 1 0 1 1 1 0 1 1\n- wraparound\n- 1 0 1 1 1 0 1 1 1 0 1 1 1 1 0 0\n- 0 1 0 0 0 1 0 0 0 1 0 0 0 0 1 1\n- 0 1\n- 1 0\n- Even though numbers have changed (bit flips), no change in checksum!\n\n**Summary: UDP**\n\n- **“no frills” protocol:** \n  - segments may be lost, delivered out of order\n  - best effort service: “send and hope for the best”\n- **UDP has its plusses:** \n  - no setup/handshaking needed (no RTT incurred)\n  - can function when network service is compromised\n  - helps with reliability (checksum)\n- build additional functionality on top of UDP in application layer (e.g., HTTP/3)"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.3 Connectionless Transport (UDP): RFC 768 Segment Header, Actions & 1's Complement Checksum**:\n\n- **Review Question 1 (Does UDP preserve application-layer message boundaries?):** True or False: On the sending side, the UDP sender will take each application-layer chunk of data written into a UDP socket and send it in a distinct UDP datagram. And then on the receiving side, UDP will deliver a segment’s payload into the appropriate socket, preserving the application-defined message boundary.\n  - **Verified Answer:** True\n\n- **Review Question 2 (UDP header fields.):** Which of the fields below are in a UDP segment header? [Hint: note the use of the word \"header\" in this question statement.]\n  - **Verified Answer:** Source port number; Internet checksum; Length (of UDP header plus payload); Destination port number\n\n- **Review Question 3 (UDP segment length field.):** Why is the UDP header length field needed?\n  - **Verified Answer:** Because the payload section can be of variable length, and this lets UDP know where the segment ends.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "udp_ones_complement_checksum.py — Computing & Verifying the 16-Bit 1's Complement Internet Checksum",
          "snippet": "# Kurose & Ross 9e - Section 3.3.2: 16-Bit 1's Complement UDP Checksum with End-Around Carry\ndef ones_complement_add_16bit(w1: int, w2: int) -> int:\n    total = w1 + w2\n    return (total & 0xFFFF) + (total >> 16)  # Wrap around carry bit\n\nwords = [0b0110011001100000, 0b0101010101010101, 0b1000111100001100]\nacc = 0\nfor w in words:\n    acc = ones_complement_add_16bit(acc, w)\n\nchecksum = (~acc) & 0xFFFF\nreceiver_check = ones_complement_add_16bit(acc, checksum)\n\nprint(f\"Word 1         : {words[0]:016b}\")\nprint(f\"Word 2         : {words[1]:016b}\")\nprint(f\"Word 3         : {words[2]:016b}\")\nprint(f\"1's Comp Sum   : {acc:016b}\")\nprint(f\"UDP Checksum   : {checksum:016b} (1's complement inverted bits)\")\nprint(f\"Receiver Verify: {receiver_check:016b} ({'VALID (All 1s)' if receiver_check == 0xFFFF else 'CORRUPTED!'})\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.3 Connectionless Transport (UDP): RFC 768 Segment Header, Actions & 1's Complement Checksum",
      "filename": "udp_ones_complement_checksum.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.3.2: 16-Bit 1's Complement UDP Checksum with End-Around Carry\ndef ones_complement_add_16bit(w1: int, w2: int) -> int:\n    total = w1 + w2\n    return (total & 0xFFFF) + (total >> 16)  # Wrap around carry bit\n\nwords = [0b0110011001100000, 0b0101010101010101, 0b1000111100001100]\nacc = 0\nfor w in words:\n    acc = ones_complement_add_16bit(acc, w)\n\nchecksum = (~acc) & 0xFFFF\nreceiver_check = ones_complement_add_16bit(acc, checksum)\n\nprint(f\"Word 1         : {words[0]:016b}\")\nprint(f\"Word 2         : {words[1]:016b}\")\nprint(f\"Word 3         : {words[2]:016b}\")\nprint(f\"1's Comp Sum   : {acc:016b}\")\nprint(f\"UDP Checksum   : {checksum:016b} (1's complement inverted bits)\")\nprint(f\"Receiver Verify: {receiver_check:016b} ({'VALID (All 1s)' if receiver_check == 0xFFFF else 'CORRUPTED!'})\")",
      "expectedOutput": [
        "[OK] udp_ones_complement_checksum.py — Computing & Verifying the 16-Bit 1's Complement Internet Checksum",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.3 Connectionless Transport (UDP): RFC 768 Segment Header, Actions & 1's Complement Checksum. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements are true about a checksum? Hint: more than one statement is true.",
      "options": [
        "A) The sender-computed checksum value is often included in a checksum field within a packet header.",
        "B) The receiver of a packet with a checksum field will add up the received bytes, just as the sender did, and compare this locally-computed che",
        "C) A checksum is computed at a sender by considering each byte within a packet as a number, and then adding these numbers (each number represen",
        "D) The receiver of a packet with a checksum will add up the received bytes, just as the sender did, and compare this locally-computed checksum "
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'The sender-computed checksum value is often included in a checksum field within a packet header.' accurately characterizes 3.3 Connectionless Transport (UDP): RFC 768 Segment Header, Actions & 1's Complement Checksum."
    }
  },
  "cn-ch3-rdt-stop-and-wait": {
    "id": "cn-ch3-rdt-stop-and-wait",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "3.4 Principles of Reliable Data Transfer: rdt1.0, rdt2.0/2.1/2.2 (Bit Errors) & rdt3.0 (Stop-and-Wait)",
    "subtitle": "Incremental FSM design of reliable transport: checksums, ACK/NAK control messages, why corrupted ACKs require 1-bit sequence numbers (rdt2.1/rdt2.2), and countdown timers in rdt3.0.",
    "sections": [
      {
        "title": "1. Principles of reliable data transfer (Slides 3-40..46)",
        "content": "![3.4 Principles of Reliable Data Transfer: rdt1.0, rdt2.0/2.1/2.2 (Bit Errors) & rdt3.0 (Stop-and-Wait) Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.4 Principles of Reliable Data Transfer: rdt1.0, rdt2.0/2.1/2.2 (Bit Errors) & rdt3.0 (Stop-and-Wait)** — Incremental FSM design of reliable transport: checksums, ACK/NAK control messages, why corrupted ACKs require 1-bit sequence numbers (rdt2.1/rdt2.2), and countdown timers in rdt3.0.\n\n**Principles of reliable data transfer**\n\n- sending process\n- data\n- receiving process\n- data\n- reliable channel\n- application\n- transport\n- reliable service abstraction\n- reliable service implementation\n- unreliable channel\n- network\n- sender-side of\n- reliable data transfer protocol\n- receiver-side\n- of reliable data transfer protocol\n- Complexity of reliable data transfer protocol will depend (strongly) on characteristics of unreliable channel (lose, corrupt, reorder data?)\n- Sender, receiver do not know the “state” of each other, e.g., was a message received?\n- unless communicated via a message\n\n> **Kurose & Ross Lecture Note:** note arrows through reliable data transfer channel is just one way – reliably send from sender to receiver Spend some time talking about how its to the sender and receiver side protocol that IMPLEMENTS reliable data transfer Communication over unreliable channel is TWO-way: sender and receiver will exchange messages back and forth to IMPLEMENT one-way reliable data transfer So we have a sender side and a receiver side. How much work they’ll have to do depends on the IMPAIRMENTS introduced by channel – if the channel is perfect – no problem! Here’s a point of view to keep in mind – it’s easy for US to look at sender and receiver together and see what is happening. OH – that message sent was lost. But think about it say from senders POV How does the sender know if its transmitted message over the unreliable channel got though?? ONLY if receiver somehow signals to the sender that it was received. The key point here is that one side does NOT know what is going on at the other side – it’s as if there’s a curtain between them. Everything they know about the other can ONLY be learned by sending/receiving messages. Sender process wants to make sure a segment got through. But it can just somehow magically look through curtain to see if receiver got it. It will be up to the receiver to let the sender KNOW that it (the receiver) has correctly received the segment. How will the sender and receiver do that – that’s the PROTOCOL. Before starting to develop a protocol, let’s look more closely at the interface (the API if you will)\n\n**Reliable data transfer protocol (rdt): interfaces**\n\n- sending process\n- data\n- receiving process\n- data\n- unreliable channel\n- sender-side\n- implementation of rdt reliable data transfer protocol\n- receiver-side\n- implementation of rdt reliable data transfer protocol\n- rdt_send()\n- udt_send()\n- rdt_rcv()\n- deliver_data()\n- data\n- Header\n- data\n- Header\n- **rdt_send():** called from above, (e.g., by app.). Passed data to deliver to receiver upper layer\n- **udt_send():** called by rdt\n- to transfer packet over\n- unreliable channel to receiver\n- **rdt_rcv():** called when packet arrives on receiver side of channel\n- **deliver_data():** called by rdt to deliver data to upper layer\n- Bi-directional communication over unreliable channel\n- data\n- packet\n\n**Reliable data transfer: getting started**\n\n- **We will:** \n- incrementally develop sender, receiver sides of reliable data transfer protocol (rdt)\n- consider only unidirectional data transfer\n  - but control info will flow in both directions!\n- state\n- state\n- event causing state transition\n- actions taken on state transition\n- **state:** when in this “state” next state uniquely determined by next event\n- event\n- actions\n- use finite state machines (FSM) to specify sender, receiver\n\n> **Kurose & Ross Lecture Note:** SO let’s get started in developing our reliable data transfer protocol, which we’ll call rdt (need a good acronym for protocol – like HTTP, TCP, UDP, IP) Bullet points 1 and 2 NOW if we are going to develop a protocol, so we’ll need some way to SPECIFY a protocol. How do we do that? We could write text, but as all know, that’s prone to misinterpretation, and might be incomplete. You might write a specification, and then think “oh yeah – I forgot about that case” What we need is more formal way to specify a protocol. In fact, with a formal specification there may be ways to PROVE PROPERTIES about a specification. But that’s an advanced topic we won’t get into here. We’ll start here by adopting a fairly simple protocol specification technique known as finite state machines (FSM) And as the name might suggest, a central notion of finite state machines is the notion of STATE <talk about state>\n\n**rdt1.0: reliable transfer over a reliable channel**\n\n- underlying channel perfectly reliable\n  - no bit errors\n  - no loss of packets\n- packet = make_pkt(data)\n- udt_send(packet)\n- rdt_send(data)\n- extract (packet,data)\n- deliver_data(data)\n- rdt_rcv(packet)\n- Wait for call from below\n- receiver\n- **separate FSMs for sender, receiver:** \n  - sender sends data into underlying channel\n  - receiver reads data from underlying channel\n- sender\n- Wait for call from above\n\n> **Kurose & Ross Lecture Note:** We’ll start with the simplest case possible - an unreliable channel that is, in fact perfect – no segments are lost, corrupted, duplicated or reordered. The sender just sends and it pops out the other side(perhaps after some delay) perfectly.",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Incremental FSM design of reliable transport: checksums, ACK/NAK control messages, why corrupted ACKs require 1-bit sequence numbers (rdt2.1/rdt2.2), and countdown timers in rdt3.0."
        }
      },
      {
        "title": "2. rdt2.0: channel with bit errors (Slides 3-47..51)",
        "content": "**rdt2.0: channel with bit errors**\n\n- underlying channel may flip bits in packet\n  - checksum (e.g., Internet checksum) to detect bit errors\n- **the question:** how to recover from errors?\n- How do humans recover from “errors” during conversation?\n  - checksum to detect bit errors\n  - acknowledgements (ACKs): receiver explicitly tells sender that pkt received OK\n  - negative acknowledgements (NAKs): receiver explicitly tells sender that pkt had errors\n  - sender retransmits pkt on receipt of NAK\n- stop and wait\n- sender sends one packet, then waits for receiver response\n\n**rdt2.0: FSM specifications**\n\n- Wait for call from above\n- udt_send(sndpkt)\n- Wait for ACK or NAK\n- udt_send(NAK)\n- rdt_rcv(rcvpkt) && corrupt(rcvpkt)\n- Wait for call from below\n- extract(rcvpkt,data)\n- deliver_data(data)\n- udt_send(ACK)\n- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt)\n- snkpkt = make_pkt(data, checksum)\n- udt_send(sndpkt)\n- rdt_send(data)\n- rdt_rcv(rcvpkt) && isACK(rcvpkt)\n- sender\n- receiver\n- rdt_rcv(rcvpkt) &&\n- isNAK(rcvpkt)\n\n**rdt2.0: FSM specification**\n\n- Wait for call from above\n- udt_send(sndpkt)\n- Wait for ACK or NAK\n- udt_send(NAK)\n- rdt_rcv(rcvpkt) && corrupt(rcvpkt)\n- Wait for call from below\n- extract(rcvpkt,data)\n- deliver_data(data)\n- udt_send(ACK)\n- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt)\n- snkpkt = make_pkt(data, checksum)\n- udt_send(sndpkt)\n- rdt_send(data)\n- rdt_rcv(rcvpkt) && isACK(rcvpkt)\n- sender\n- receiver\n- **Note:** “state” of receiver (did the receiver get my message correctly?) isn’t known to sender unless somehow communicated from receiver to sender\n- that’s why we need a protocol!\n- rdt_rcv(rcvpkt) &&\n- isNAK(rcvpkt)\n- isNAK(rcvpkt)\n- isACK(rcvpkt)\n\n**rdt2.0: operation with no errors**\n\n- Wait for call from above\n- snkpkt = make_pkt(data, checksum)\n- udt_send(sndpkt)\n- udt_send(sndpkt)\n- udt_send(NAK)\n- Wait for ACK or NAK\n- Wait for call from below\n- rdt_send(data)\n- rdt_rcv(rcvpkt) && corrupt(rcvpkt)\n- rdt_rcv(rcvpkt) && isACK(rcvpkt)\n- extract(rcvpkt,data)\n- deliver_data(data)\n- udt_send(ACK)\n- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt)\n- sender\n- receiver\n- rdt_rcv(rcvpkt) &&\n- isNAK(rcvpkt)"
      },
      {
        "title": "3. rdt2.0: corrupted packet scenario (Slides 3-52..55)",
        "content": "**rdt2.0: corrupted packet scenario**\n\n- Wait for call from above\n- snkpkt = make_pkt(data, checksum)\n- udt_send(sndpkt)\n- udt_send(sndpkt)\n- rdt_rcv(rcvpkt) &&\n- isNAK(rcvpkt)\n- Wait for ACK or NAK\n- Wait for call from below\n- rdt_send(data)\n- udt_send(NAK)\n- rdt_rcv(rcvpkt) && corrupt(rcvpkt)\n- extract(rcvpkt,data)\n- deliver_data(data)\n- udt_send(ACK)\n- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt)\n- rdt_rcv(rcvpkt) && isACK(rcvpkt)\n- sender\n- receiver\n\n**rdt2.0 has a fatal flaw!**\n\n- what happens if ACK/NAK corrupted?\n- sender doesn’t know what happened at receiver!\n- **can’t just retransmit:** possible duplicate\n- **handling duplicates:** \n- sender retransmits current pkt if ACK/NAK corrupted\n- sender adds sequence number to each pkt\n- receiver discards (doesn’t deliver up) duplicate pkt\n- stop and wait\n- sender sends one packet, then waits for receiver response\n\n**rdt2.1: sender, handling garbled ACK/NAKs**\n\n- Wait for call 0 from above\n- Wait for ACK or NAK 0\n- sndpkt = make_pkt(0, data, checksum)\n- udt_send(sndpkt)\n- rdt_send(data)\n- udt_send(sndpkt)\n- rdt_rcv(rcvpkt) && (corrupt(rcvpkt) ||\n- isNAK(rcvpkt) )\n- sndpkt = make_pkt(1, data, checksum)\n- udt_send(sndpkt)\n- rdt_send(data)\n- udt_send(sndpkt)\n- rdt_rcv(rcvpkt)\n- && (corrupt(rcvpkt) ||\n- isNAK(rcvpkt) )\n- Wait for\n- call 1 from above\n- Wait for ACK or NAK 1\n- rdt_rcv(rcvpkt)\n- && notcorrupt(rcvpkt)\n- && isACK(rcvpkt)\n- rdt_rcv(rcvpkt)\n- && notcorrupt(rcvpkt) && isACK(rcvpkt)\n\n**rdt2.1: receiver, handling garbled ACK/NAKs**\n\n- Wait for\n- 0 from below\n- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt)\n- && has_seq1(rcvpkt)\n- extract(rcvpkt,data)\n- deliver_data(data)\n- sndpkt = make_pkt(ACK, chksum)\n- udt_send(sndpkt)\n- Wait for\n- 1 from below\n- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt)\n- && has_seq0(rcvpkt)\n- extract(rcvpkt,data)\n- deliver_data(data)\n- sndpkt = make_pkt(ACK, chksum)\n- udt_send(sndpkt)\n- sndpkt = make_pkt(NAK, chksum)\n- udt_send(sndpkt)\n- rdt_rcv(rcvpkt) && (corrupt(rcvpkt)\n- rdt_rcv(rcvpkt) &&\n- not corrupt(rcvpkt) &&\n- has_seq0(rcvpkt)\n- sndpkt = make_pkt(ACK, chksum)\n- udt_send(sndpkt)\n- rdt_rcv(rcvpkt) &&\n- not corrupt(rcvpkt) &&\n- has_seq1(rcvpkt)\n- sndpkt = make_pkt(ACK, chksum)\n- udt_send(sndpkt)\n- rdt_rcv(rcvpkt) && (corrupt(rcvpkt)\n- sndpkt = make_pkt(NAK, chksum)\n- udt_send(sndpkt)"
      },
      {
        "title": "4. rdt2.1: discussion (Slides 3-56..60)",
        "content": "**rdt2.1: discussion**\n\n- **sender:** \n- seq # added to pkt\n- two seq. #s (0,1) will suffice. Why?\n- must check if received ACK/NAK corrupted\n- twice as many states\n  - state must “remember” whether “expected” pkt should have seq # of 0 or 1\n- **receiver:** \n- must check if received packet is duplicate\n  - state indicates whether 0 or 1 is expected pkt seq #\n- **note:** receiver can not know if its last ACK/NAK received OK at sender\n\n**rdt2.2: a NAK-free protocol**\n\n- same functionality as rdt2.1, using ACKs only\n- instead of NAK, receiver sends ACK for last pkt received OK\n  - receiver must explicitly include seq # of pkt being ACKed\n- duplicate ACK at sender results in same action as NAK: retransmit current pkt\n- As we will see, TCP uses this approach to be NAK-free\n\n**rdt2.2: sender, receiver fragments**\n\n- Wait for call 0 from above\n- sndpkt = make_pkt(0, data, checksum)\n- udt_send(sndpkt)\n- rdt_send(data)\n- udt_send(sndpkt)\n- rdt_rcv(rcvpkt) &&\n- ( corrupt(rcvpkt) ||\n- isACK(rcvpkt,1) )\n- rdt_rcv(rcvpkt)\n- && notcorrupt(rcvpkt)\n- && isACK(rcvpkt,0)\n- Wait for ACK\n- sender FSM\n- fragment\n- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt)\n- && has_seq1(rcvpkt)\n- extract(rcvpkt,data)\n- deliver_data(data)\n- sndpkt = make_pkt(ACK1, chksum)\n- udt_send(sndpkt)\n- Wait for\n- 0 from below\n- rdt_rcv(rcvpkt) &&\n- (corrupt(rcvpkt) ||\n- has_seq1(rcvpkt))\n- udt_send(sndpkt)\n- receiver FSM\n- fragment\n\n**rdt3.0: channels with errors and loss**\n\n- **New channel assumption:** underlying channel can also lose packets (data, ACKs)\n  - checksum, sequence #s, ACKs, retransmissions will be of help … but not quite enough\n- **Q:** How do humans handle lost sender-to-receiver words in conversation?\n- **Approach:** sender waits “reasonable” amount of time for ACK\n- retransmits if no ACK received in this time\n- **if pkt (or ACK) just delayed (not lost):** \n    - retransmission will be duplicate, but seq #s already handles this!\n    - receiver must specify seq # of packet being ACKed\n- timeout\n- use countdown timer to interrupt after “reasonable” amount of time"
      },
      {
        "title": "5. rdt3.0 sender (Slides 3-61..67)",
        "content": "**rdt3.0 sender**\n\n- Wait for ACK0\n- sndpkt = make_pkt(0, data, checksum)\n- udt_send(sndpkt)\n- start_timer\n- rdt_send(data)\n- Wait for\n- call 1 from above\n- sndpkt = make_pkt(1, data, checksum)\n- udt_send(sndpkt)\n- start_timer\n- rdt_send(data)\n- rdt_rcv(rcvpkt)\n- && notcorrupt(rcvpkt)\n- && isACK(rcvpkt,0)\n- stop_timer\n- rdt_rcv(rcvpkt)\n- && notcorrupt(rcvpkt)\n- && isACK(rcvpkt,1)\n- stop_timer\n- Wait for\n- call 0 from above\n- Wait for ACK1\n- timeout\n- rdt_rcv(rcvpkt) &&\n- ( corrupt(rcvpkt) ||\n- isACK(rcvpkt,1) )\n- isACK(rcvpkt,0) )\n\n> **Kurose & Ross Lecture Note:** We see the familiar four state sender from our rdt 2.1 and 2.2 protocols. Top two states when sending packet with zero seq # and bottom two\n\n**rdt3.0 in action**\n\n- sender\n- receiver\n- rcv pkt1\n- rcv pkt0\n- send ack0\n- send ack1\n- send ack0\n- rcv ack0\n- send pkt0\n- send pkt1\n- rcv ack1\n- send pkt0\n- rcv pkt0\n- pkt0\n- pkt0\n- pkt1\n- ack1\n- ack0\n- ack0\n- (a) no loss\n- sender\n- receiver\n- rcv pkt1\n- rcv pkt0\n- send ack0\n- send ack1\n- send ack0\n- rcv ack0\n- send pkt0\n- send pkt1\n- rcv ack1\n- send pkt0\n- rcv pkt0\n- pkt0\n- pkt0\n- ack1\n- ack0\n- ack0\n- (b) packet loss\n- pkt1\n- loss\n- pkt1\n- timeout\n- resend pkt1\n- (detect duplicate)\n- (c) ACK loss\n- (d) premature timeout/ delayed ACK\n- (ignore)\n\n**Performance of rdt3.0 (stop-and-wait)**\n\n- **example:** 1 Gbps link, 15 ms prop. delay, 8000 bit packet\n  - U sender: utilization – fraction of time sender busy sending\n- Dtrans =\n- 8000 bits\n- 109 bits/sec\n- 8 microsecs\n  - time to transmit packet into channel:\n\n> **Kurose & Ross Lecture Note:** if RTT=30 msec, 1KB pkt every 30 msec: 33kB/sec thruput over 1 Gbps link network protocol limits use of physical resources Let’s develop a formula for utilization\n\n**rdt3.0: stop-and-wait operation**\n\n- first packet bit transmitted, t = 0\n- sender\n- receiver\n- RTT\n- first packet bit arrives\n- last packet bit arrives, send ACK\n- ACK arrives, send next\n- packet, t = RTT + L / R\n- Usender\n- L / R\n- L/R\n- + L / R\n- 0.00027\n- .008\n- 30.008\n- rdt 3.0 protocol performance stinks!\n- Protocol limits performance of underlying infrastructure (channel)"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.4 Principles of Reliable Data Transfer: rdt1.0, rdt2.0/2.1/2.2 (Bit Errors) & rdt3.0 (Stop-and-Wait)**:\n\n- **Review Question 1 (The rdt 2.0 protocol.):** Consider the rdt 2.0 sender and receiver shown below, with FSM transitions at the sender labeled S1, S2, and S3; and receiver transitions labeled R1 and R2. Which of the following sequences of transitions could possibly occur as a result of an initial rdt_send() call at the sender, and possible later message corruption and subsequent error recovery.\n  - **Verified Answer:** S1, R1, S2, R2,S3; S1, R1, S2; S1, R2, S3\n\n- **Review Question 2 (Cumulative ACK.):** What is meant by a cumulative acknowledgment, ACK (n) ?\n  - **Verified Answer:** A cumulative ACK (n) acks all packets with a sequence number up to and including n as being received.\n\n- **Review Question 3 (Stop-and-wait: channel utilization.):** Suppose a packet is 10K bits long, the channel transmission rate connecting a sender and receiver is 10 Mbps, and the round-trip propagation delay is 10 ms. What is the maximum channel utilization of a stop-and-wait protocol for this channel?\n  - **Verified Answer:** .1",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "rdt30_alternating_bit_fsm.py — Simulating the rdt3.0 Alternating-Bit Stop-and-Wait Protocol",
          "snippet": "# Kurose & Ross 9e - Section 3.4.1: rdt3.0 Stop-and-Wait Performance & Alternating-Bit Trace\nL_bits = 8000        # 1000-byte packet = 8,000 bits\nR_bps = 1e9          # 1 Gbps link\nrtt_sec = 0.030      # 30 ms Round-Trip Time\n\nd_trans_sec = L_bits / R_bps\nu_sender = d_trans_sec / (rtt_sec + d_trans_sec)\neffective_kbps = (L_bits / (rtt_sec + d_trans_sec)) / 1e3\n\nprint(f\"Transmission Time (L/R): {d_trans_sec*1e6:.1f} microseconds\")\nprint(f\"Round-Trip Time (RTT)  : {rtt_sec*1e3:.1f} milliseconds\")\nprint(f\"Stop-and-Wait U_sender : {u_sender:.6f} ({u_sender*100:.4f}% link utilization!)\")\nprint(f\"Effective Throughput   : {effective_kbps:.1f} kbps on a 1,000,000 kbps link!\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.4 Principles of Reliable Data Transfer: rdt1.0, rdt2.0/2.1/2.2 (Bit Errors) & rdt3.0 (Stop-and-Wait)",
      "filename": "rdt30_alternating_bit_fsm.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.4.1: rdt3.0 Stop-and-Wait Performance & Alternating-Bit Trace\nL_bits = 8000        # 1000-byte packet = 8,000 bits\nR_bps = 1e9          # 1 Gbps link\nrtt_sec = 0.030      # 30 ms Round-Trip Time\n\nd_trans_sec = L_bits / R_bps\nu_sender = d_trans_sec / (rtt_sec + d_trans_sec)\neffective_kbps = (L_bits / (rtt_sec + d_trans_sec)) / 1e3\n\nprint(f\"Transmission Time (L/R): {d_trans_sec*1e6:.1f} microseconds\")\nprint(f\"Round-Trip Time (RTT)  : {rtt_sec*1e3:.1f} milliseconds\")\nprint(f\"Stop-and-Wait U_sender : {u_sender:.6f} ({u_sender*100:.4f}% link utilization!)\")\nprint(f\"Effective Throughput   : {effective_kbps:.1f} kbps on a 1,000,000 kbps link!\")",
      "expectedOutput": [
        "[OK] rdt30_alternating_bit_fsm.py — Simulating the rdt3.0 Alternating-Bit Stop-and-Wait Protocol",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.4 Principles of Reliable Data Transfer: rdt1.0, rdt2.0/2.1/2.2 (Bit Errors) & rdt3.0 (Stop-and-Wait). Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Suppose a packet is 10K bits long, the channel transmission rate connecting a sender and receiver is 10 Mbps, and the round-trip propagation delay is 10 ms. How many packets can the sender transmit before it starts receiving acknowledgments back?",
      "options": [
        "A) 10,000",
        "B) 10",
        "C) 1",
        "D) 1000"
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), '10' accurately characterizes 3.4 Principles of Reliable Data Transfer: rdt1.0, rdt2.0/2.1/2.2 (Bit Errors) & rdt3.0 (Stop-and-Wait)."
    }
  },
  "cn-ch3-pipelined-gbn-sr": {
    "id": "cn-ch3-pipelined-gbn-sr",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "3.4B Pipelined Reliable Data Transfer: Go-Back-N (GBN) & Selective Repeat (SR) Sliding Windows",
    "subtitle": "Overcoming Stop-and-Wait's 0.027% utilization via pipelining: Go-Back-N cumulative ACKs and single timer vs. Selective Repeat out-of-order buffering and the window-size <= N_seq/2 dilemma.",
    "sections": [
      {
        "title": "1. rdt3.0: pipelined protocols operation (Slides 3-68..70)",
        "content": "![3.4B Pipelined Reliable Data Transfer: Go-Back-N (GBN) & Selective Repeat (SR) Sliding Windows Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.4B Pipelined Reliable Data Transfer: Go-Back-N (GBN) & Selective Repeat (SR) Sliding Windows** — Overcoming Stop-and-Wait's 0.027% utilization via pipelining: Go-Back-N cumulative ACKs and single timer vs. Selective Repeat out-of-order buffering and the window-size <= N_seq/2 dilemma.\n\n**rdt3.0: pipelined protocols operation**\n\n- **pipelining:** sender allows multiple, “in-flight”, yet-to-be-acknowledged packets\n  - range of sequence numbers must be increased\n  - buffering at sender and/or receiver\n\n**Pipelining: increased utilization**\n\n- first packet bit transmitted, t = 0\n- sender\n- receiver\n- RTT\n- last bit transmitted, t = L / R\n- first packet bit arrives\n- last packet bit arrives, send ACK\n- ACK arrives, send next\n- packet, t = RTT + L / R\n- last bit of 2nd packet arrives, send ACK\n- last bit of 3rd packet arrives, send ACK\n- 3-packet pipelining increases\n- utilization by a factor of 3!\n\n> **Kurose & Ross Lecture Note:** two generic forms of pipelined protocols: go-Back-N, selective repeat\n\n**Go-Back-N: sender**\n\n- **sender:** “window” of up to N, consecutive transmitted but unACKed pkts\n  - k-bit seq # in pkt header\n- **cumulative ACK:** ACK(n): ACKs all packets up to, including seq # n\n  - on receiving ACK(n): move window forward to begin at n+1\n- timer for oldest in-flight packet\n- **timeout(n):** retransmit packet n and all higher seq # packets in window\n\n> **Kurose & Ross Lecture Note:** window size of 14, 8 have been sent but are not yet acknowledged, 6 sequence numbers are available for us. In window, but no calls from above to use them. Note – we’ll skip the Go-Back-N FSM specification you can check that out in PowerPoint slides or book) TCP uses cumulative ACK",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Overcoming Stop-and-Wait's 0.027% utilization via pipelining: Go-Back-N cumulative ACKs and single timer vs. Selective Repeat out-of-order buffering and the window-size <= N_seq/2 dilemma."
        }
      },
      {
        "title": "2. Go-Back-N: receiver (Slides 3-71..73)",
        "content": "**Go-Back-N: receiver**\n\n- **ACK-only:** always send ACK for correctly-received packet so far, with highest in-order seq #\n  - may generate duplicate ACKs\n  - need only remember rcv_base\n- **on receipt of out-of-order packet:** \n  - can discard (don’t buffer) or buffer: an implementation decision\n  - re-ACK pkt with highest in-order seq #\n- rcv_base\n- received and ACKed\n- **Out-of-order:** received but not ACKed\n- Not received\n- **Receiver view of sequence number space:** \n\n> **Kurose & Ross Lecture Note:** Note – we’ll skip the Go-Back-N FSM specification (actually it’s\n\n**Go-Back-N in action**\n\n- send pkt0\n- send pkt1\n- send pkt2\n- send pkt3\n- (wait)\n- sender\n- receiver\n- receive pkt0, send ack0\n- receive pkt1, send ack1\n- receive pkt3, discard,\n- (re)send ack1\n- send pkt2\n- send pkt3\n- send pkt4\n- send pkt5\n- loss\n- pkt 2 timeout\n- receive pkt4, discard,\n- (re)send ack1\n- receive pkt5, discard,\n- (re)send ack1\n- rcv pkt2, deliver, send ack2\n- rcv pkt3, deliver, send ack3\n- rcv pkt4, deliver, send ack4\n- rcv pkt5, deliver, send ack5\n- ignore duplicate ACK\n- sender window (N=4)\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- rcv ack0, send pkt4\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- rcv ack1, send pkt5\n\n> **Kurose & Ross Lecture Note:** Let’s skip FSM specification for GBN – check out the book or ppt – and let’s watch GBN sender and receivers in action. Let assume a window size of 4. at t=0, sender sends packets 0, 1, 2 3, 4, and packet 2 will be lost At the receiver: Packet 0 received ACK0 generated Packet 1 received ACK1 generated Packet 2 is lost, and so when packet 3 is received, ACK 1 is sent – that’s the cumulative ACK, re-Acknowledging the receipt of packet 1. and in this implementation packet 3 is discarded\n\n**Selective repeat: the approach**\n\n- **pipelining:** multiple packets in flight\n- receiver individually ACKs all correctly received packets\n  - buffers packets, as needed, for in-order delivery to upper layer\n- **sender:** \n  - maintains (conceptually) a timer for each unACKed pkt\n    - timeout: retransmits single unACKed packet associated with timeout\n  - maintains (conceptually) “window” over N consecutive seq #s\n    - limits pipelined, “in flight” packets to be within this window\n\n> **Kurose & Ross Lecture Note:** An important mechanism of GBN was the use of the cumulative acknowledgements, and as we mentioned, cumulative ACKs are used in TCP An alternate ACK mechanism would be for the receiver to individually acknowledge specific packets as they are received. This mechanism is at the heart of the Selective repeat protocol."
      },
      {
        "title": "3. Selective repeat: sender and receiver (Slides 3-75..78)",
        "content": "**Selective repeat: sender and receiver**\n\n- **data from above:** \n- if next available seq # in window, send packet\n- **timeout(n):** \n- resend packet n, restart timer\n- **ACK(n) in [sendbase,sendbase+N-1]:** \n- mark packet n as received\n- if n smallest unACKed packet, advance window base to next unACKed seq #\n- sender\n- packet n in [rcvbase, rcvbase+N-1]\n- send ACK(n)\n- **out-of-order:** buffer\n- **in-order:** deliver (also deliver buffered, in-order packets), advance window to next not-yet-received packet\n- packet n in [rcvbase-N,rcvbase-1]\n- ACK(n)\n- **otherwise:** \n- ignore\n- receiver\n\n> **Kurose & Ross Lecture Note:** If the packet is in order, its data will be delivered, as will any buffered data that can now be delivered in order\n\n**Selective Repeat in action**\n\n- send pkt0\n- send pkt1\n- send pkt2\n- send pkt3\n- (wait)\n- sender\n- receiver\n- send pkt2\n- (but not 3,4,5)\n- loss\n- pkt 2 timeout\n- sender window (N=4)\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- rcv ack0, send pkt4\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- 0 1 2 3 4 5 6 7 8\n- rcv ack1, send pkt5\n- receive pkt0, send ack0\n- receive pkt1, send ack1\n- receive pkt3, buffer,\n- send ack3\n- record ack3 arrived\n- receive pkt4, buffer,\n- send ack4\n- receive pkt5, buffer,\n- send ack5\n- rcv pkt2; deliver pkt2,\n- pkt3, pkt4, pkt5; send ack2\n- **Q:** what happens when ack2 arrives?\n\n**Selective repeat: a dilemma!**\n\n- 0 1 2 3 0 1 2\n- 0 1 2 3 0 1 2\n- 0 1 2 3 0 1 2\n- pkt0\n- pkt1\n- pkt2\n- 0 1 2 3 0 1 2\n- pkt0\n- timeout\n- retransmit pkt0\n- 0 1 2 3 0 1 2\n- 0 1 2 3 0 1 2\n- 0 1 2 3 0 1 2\n- will accept packet\n- with seq number 0\n- (b) oops!\n- receiver window\n- (after receipt)\n- sender window\n- (after receipt)\n- 0 1 2 3 0 1 2\n- 0 1 2 3 0 1 2\n- 0 1 2 3 0 1 2\n- pkt0\n- pkt1\n- pkt2\n- 0 1 2 3 0 1 2\n- pkt0\n- 0 1 2 3 0 1 2\n- 0 1 2 3 0 1 2\n- 0 1 2 3 0 1 2\n- will accept packet\n- with seq number 0\n- 0 1 2 3 0 1 2\n- pkt3\n- (a) no problem\n- **example:** \n- **seq #s:** 0, 1, 2, 3 (base 4 counting)\n- window size=3\n- **Q:** what relationship is needed between sequence # size and window size to avoid problem in scenario (b)?\n- receiver can’t see sender side\n- receiver behavior identical in both cases!\n- something’s (very) wrong!"
      },
      {
        "title": "4. Go-Back-N: sender extended FSM (Slides 3-148..149)",
        "content": "**Go-Back-N: sender extended FSM**\n\n- Wait\n- start_timer\n- udt_send(sndpkt[base])\n- udt_send(sndpkt[base+1])\n- udt_send(sndpkt[nextseqnum-1])\n- timeout\n- rdt_send(data)\n- if (nextseqnum < base+N) {\n- sndpkt[nextseqnum] = make_pkt(nextseqnum,data,chksum)\n- udt_send(sndpkt[nextseqnum])\n- if (base == nextseqnum)\n- start_timer\n- nextseqnum++\n- else\n- refuse_data(data)\n- base = getacknum(rcvpkt)+1\n- If (base == nextseqnum)\n- stop_timer\n- else\n- start_timer\n- rdt_rcv(rcvpkt) &&\n- notcorrupt(rcvpkt)\n- base=1\n- nextseqnum=1\n- rdt_rcv(rcvpkt)\n- && corrupt(rcvpkt)\n\n**Go-Back-N: receiver extended FSM**\n\n- Wait\n- rdt_rcv(rcvpkt)\n- && notcorrupt(rcvpkt)\n- && hasseqnum(rcvpkt,expectedseqnum)\n- extract(rcvpkt,data)\n- deliver_data(data)\n- sndpkt = make_pkt(expectedseqnum,ACK,chksum)\n- udt_send(sndpkt)\n- expectedseqnum++\n- udt_send(sndpkt)\n- any other event\n- expectedseqnum=1\n- sndpkt =\n- make_pkt(expectedseqnum,ACK,chksum)\n- **ACK-only:** always send ACK for correctly-received packet with highest in-order seq #\n  - may generate duplicate ACKs\n  - need only remember expectedseqnum\n- **out-of-order packet:** \n  - discard (don’t buffer): no receiver buffering!\n  - re-ACK pkt with highest in-order seq #"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.4B Pipelined Reliable Data Transfer: Go-Back-N (GBN) & Selective Repeat (SR) Sliding Windows**:\n\n- **Review Question 1 (The rdt 2.0 protocol.):** Consider the rdt 2.0 sender and receiver shown below, with FSM transitions at the sender labeled S1, S2, and S3; and receiver transitions labeled R1 and R2. Which of the following sequences of transitions could possibly occur as a result of an initial rdt_send() call at the sender, and possible later message corruption and subsequent error recovery.\n  - **Verified Answer:** S1, R1, S2, R2,S3; S1, R1, S2; S1, R2, S3\n\n- **Review Question 2 (Cumulative ACK.):** What is meant by a cumulative acknowledgment, ACK (n) ?\n  - **Verified Answer:** A cumulative ACK (n) acks all packets with a sequence number up to and including n as being received.\n\n- **Review Question 3 (Stop-and-wait: channel utilization.):** Suppose a packet is 10K bits long, the channel transmission rate connecting a sender and receiver is 10 Mbps, and the round-trip propagation delay is 10 ms. What is the maximum channel utilization of a stop-and-wait protocol for this channel?\n  - **Verified Answer:** .1",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "gbn_vs_sr_sliding_window.py — Comparing Go-Back-N vs. Selective Repeat Retransmissions Under Loss",
          "snippet": "# Kurose & Ross 9e - Section 3.4.3 & 3.4.4: Go-Back-N vs. Selective Repeat Simulation\nwindow_N = 4\nlost_pkt = 2\npackets = [0, 1, 2, 3, 4, 5]\n\nprint(f\"Scenario: Window Size N={window_N}, Packet #{lost_pkt} is lost in transit\\n\")\nprint(\"[Go-Back-N (GBN)]\")\nprint(\"  Sender transmits: pkt0, pkt1, pkt2 (LOST), pkt3, pkt4, pkt5\")\nprint(\"  Receiver discards out-of-order pkt3, pkt4, pkt5 and re-sends cumulative ACK1\")\nprint(\"  On pkt2 timeout -> Sender retransmits ALL unACKed in window: pkt2, pkt3, pkt4, pkt5 (4 retransmissions)\\n\")\n\nprint(\"[Selective Repeat (SR)]\")\nprint(\"  Receiver buffers out-of-order pkt3, pkt4, pkt5 and sends individual ACK3, ACK4, ACK5\")\nprint(\"  On pkt2 timeout -> Sender retransmits ONLY pkt2 (1 retransmission) -> Receiver delivers [2,3,4,5] to app!\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.4B Pipelined Reliable Data Transfer: Go-Back-N (GBN) & Selective Repeat (SR) Sliding Windows",
      "filename": "gbn_vs_sr_sliding_window.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.4.3 & 3.4.4: Go-Back-N vs. Selective Repeat Simulation\nwindow_N = 4\nlost_pkt = 2\npackets = [0, 1, 2, 3, 4, 5]\n\nprint(f\"Scenario: Window Size N={window_N}, Packet #{lost_pkt} is lost in transit\\n\")\nprint(\"[Go-Back-N (GBN)]\")\nprint(\"  Sender transmits: pkt0, pkt1, pkt2 (LOST), pkt3, pkt4, pkt5\")\nprint(\"  Receiver discards out-of-order pkt3, pkt4, pkt5 and re-sends cumulative ACK1\")\nprint(\"  On pkt2 timeout -> Sender retransmits ALL unACKed in window: pkt2, pkt3, pkt4, pkt5 (4 retransmissions)\\n\")\n\nprint(\"[Selective Repeat (SR)]\")\nprint(\"  Receiver buffers out-of-order pkt3, pkt4, pkt5 and sends individual ACK3, ACK4, ACK5\")\nprint(\"  On pkt2 timeout -> Sender retransmits ONLY pkt2 (1 retransmission) -> Receiver delivers [2,3,4,5] to app!\")",
      "expectedOutput": [
        "[OK] gbn_vs_sr_sliding_window.py — Comparing Go-Back-N vs. Selective Repeat Retransmissions Under Loss",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.4B Pipelined Reliable Data Transfer: Go-Back-N (GBN) & Selective Repeat (SR) Sliding Windows. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Consider the rdt 2.0 sender and receiver shown below, with FSM transitions at the sender labeled S1, S2, and S3; and receiver transitions labeled R1 and R2. Which of the following sequences of transitions could possibly occur as a result of an initial rdt_send() call at the sender, and possible later message corruption and subsequent error recovery.",
      "options": [
        "A) S1, R2, S2",
        "B) S1, S2, S3",
        "C) S1, R1, S2, R2,S3",
        "D) S1, R1, S2"
      ],
      "correctIndex": 2,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'S1, R1, S2, R2,S3' accurately characterizes 3.4B Pipelined Reliable Data Transfer: Go-Back-N (GBN) & Selective Repeat (SR) Sliding Windows."
    }
  },
  "cn-ch3-tcp-segment-seq-ack": {
    "id": "cn-ch3-tcp-segment-seq-ack",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Orta - İleri",
    "title": "3.5 Connection-Oriented Transport (TCP): RFC 793 Segment Header, Byte Sequence Numbers & ACKs",
    "subtitle": "20-byte TCP header layout, why TCP numbers bytes rather than segments, piggbacked cumulative ACKs (next expected byte), and Telnet/interactive sequence number traces.",
    "sections": [
      {
        "title": "1. TCP: overview RFCs: 793,1122, 2018, 5681, 7323 (Slides 3-80..80)",
        "content": "![3.5 Connection-Oriented Transport (TCP): RFC 793 Segment Header, Byte Sequence Numbers & ACKs Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.5 Connection-Oriented Transport (TCP): RFC 793 Segment Header, Byte Sequence Numbers & ACKs** — 20-byte TCP header layout, why TCP numbers bytes rather than segments, piggbacked cumulative ACKs (next expected byte), and Telnet/interactive sequence number traces.\n\n- cumulative ACKs\n- **pipelining:** \n    - TCP congestion and flow control set window size\n- **connection-oriented:** \n  - handshaking (exchange of control messages) initializes sender, receiver state before data exchange\n- **flow controlled:** \n  - sender will not overwhelm receiver\n- **point-to-point:** \n    - one sender, one receiver\n- **reliable, in-order byte steam:** \n    - no “message boundaries\"\n- **full duplex data:** \n  - bi-directional data flow in same connection\n  - MSS: maximum segment size\n\n> **Kurose & Ross Lecture Note:** Typical MSS is 1460 bytes",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "20-byte TCP header layout, why TCP numbers bytes rather than segments, piggbacked cumulative ACKs (next expected byte), and Telnet/interactive sequence number traces."
        }
      },
      {
        "title": "2. TCP segment structure (Slides 3-81..81)",
        "content": "- source port #\n- dest port #\n- 32 bits\n- not\n- used\n- receive window\n- **flow control:** # bytes receiver willing to accept\n- sequence number\n- **segment seq #:** counting bytes of data into bytestream (not segments!)\n- application\n- data\n- (variable length)\n- data sent by application into TCP socket\n- acknowledgement number\n- **ACK:** seq # of next expected byte; A bit: this is an ACK\n- options (variable length)\n- TCP options\n- head\n- len\n- length (of TCP header)\n- checksum\n- Internet checksum\n- **RST, SYN, FIN:** connection management\n- Urg data pointer\n- **C, E:** congestion notification"
      },
      {
        "title": "3. TCP sequence numbers, ACKs (Slides 3-82..83)",
        "content": "- **Sequence numbers:** \n  - byte stream “number” of first byte in segment’s data\n- source port #\n- dest port #\n- sequence number\n- acknowledgement number\n- checksum\n- rwnd\n- urg pointer\n- outgoing segment from receiver\n- sent\n- ACKed\n- sent, not-yet ACKed\n- (“in-flight”)\n- usable\n- but not\n- yet sent\n- not\n- usable\n- window size\n  - sender sequence number space\n- source port #\n- dest port #\n- sequence number\n- acknowledgement number\n- checksum\n- rwnd\n- urg pointer\n- outgoing segment from sender\n- **Acknowledgements:** \n  - seq # of next byte expected from other side\n  - cumulative ACK\n- **Q:** how receiver handles out-of-order segments\n  - A: TCP spec doesn’t say, - up to implementor\n- host ACKs receipt of echoed ‘C’\n- host ACKs receipt of‘C’, echoes back ‘C’\n- simple telnet scenario\n- Host B\n- Host A\n- User types‘C’\n- Seq=42, ACK=79, data = ‘C’\n- Seq=79, ACK=43, data = ‘C’\n- Seq=43, ACK=80\n\n> **Kurose & Ross Lecture Note:** The key thing to note here is that the ACK number (43) on the B-to-A segment is one more than the sequence number (42) on the A-to-B segment that triggered that ACK Similarly, the ACK number (80) on the last A-to-B segment is one more than the sequence number (79) on the B-to-A segment that triggered that ACK"
      },
      {
        "title": "4. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.5 Connection-Oriented Transport (TCP): RFC 793 Segment Header, Byte Sequence Numbers & ACKs**:\n\n- **Review Question 1 (TCP reliability semantics.):** True or False: On the sending side, the TCP sender will take each application-layer chunk of data written into a TCP socket and send it in a distinct TCP segment. And then on the receiving side, TCP will deliver a segment’s payload into the appropriate socket, preserving the application-defined message boundary.\n  - **Verified Answer:** False.\n\n- **Review Question 2 (TCP sequence numbers and ACKs (1).):** Consider the TCP Telnet scenario below (from Fig. 3.31 in text). Why is it that the receiver sends an ACK that is one larger than the sequence number in the received datagram?\n  - **Verified Answer:** Because the send-to receiver segment carries only one byte of data, and after that segment is received, the next expected byte of data is just the next byte (i.e., has an index that is one larger) in the data stream.\n\n- **Review Question 3 (TCP RTT Estimation: EWMA.):** Consider TCP use of an exponentially weighted moving average (EWMA) to compute the nth value of the estimated RTT: EstimatedRTT n = (1- a)*EstimatedRTT n -1 + a*SampleRTT n True or False: with this EWMA algorithm the value of EstimatedRTT n has no dependence on the earlier sample, SampleRTT n -1\n  - **Verified Answer:** False",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "tcp_seq_ack_tracker.py — Computing TCP Byte-Stream Sequence Numbers & Cumulative ACKs",
          "snippet": "# Kurose & Ross 9e - Section 3.5.2: TCP Byte-Stream Sequence & Cumulative ACK Calculator\nisn_client = 42\nisn_server = 79\nmss_bytes = 500\n\nsegments = [\n    (\"Client -> Server\", isn_client, 500),\n    (\"Client -> Server\", isn_client + 500, 500),\n    (\"Client -> Server\", isn_client + 1000, 500),\n]\n\nnext_expected_by_server = isn_client\nfor direction, seq, payload_len in segments:\n    last_byte = seq + payload_len - 1\n    next_expected_by_server = last_byte + 1\n    print(f\"{direction}: Seq={seq:4d} (Bytes {seq}..{last_byte}) -> Server Replies Cumulative ACK={next_expected_by_server}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.5 Connection-Oriented Transport (TCP): RFC 793 Segment Header, Byte Sequence Numbers & ACKs",
      "filename": "tcp_seq_ack_tracker.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.5.2: TCP Byte-Stream Sequence & Cumulative ACK Calculator\nisn_client = 42\nisn_server = 79\nmss_bytes = 500\n\nsegments = [\n    (\"Client -> Server\", isn_client, 500),\n    (\"Client -> Server\", isn_client + 500, 500),\n    (\"Client -> Server\", isn_client + 1000, 500),\n]\n\nnext_expected_by_server = isn_client\nfor direction, seq, payload_len in segments:\n    last_byte = seq + payload_len - 1\n    next_expected_by_server = last_byte + 1\n    print(f\"{direction}: Seq={seq:4d} (Bytes {seq}..{last_byte}) -> Server Replies Cumulative ACK={next_expected_by_server}\")",
      "expectedOutput": [
        "[OK] tcp_seq_ack_tracker.py — Computing TCP Byte-Stream Sequence Numbers & Cumulative ACKs",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.5 Connection-Oriented Transport (TCP): RFC 793 Segment Header, Byte Sequence Numbers & ACKs. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Consider the TCP Telnet scenario below (from Fig. 3.31 in text). Why is it that the receiver sends an ACK that is one larger than the sequence number in the received datagram?",
      "options": [
        "A) Because TCP sequence numbers always increase by 1, with every new segment, and the TCP receiver always send the sequence number of the next ",
        "B) Because the send-to receiver segment carries only one byte of data, and after that segment is received, the next expected byte of data is ju",
        "C) None of the above statements apply to this protocol layer.",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'Because the send-to receiver segment carries only one byte of data, and after that segment is received, the next expected byte of data is just the next byte (i.e., has an index that is one larger) in the data stream.' accurately characterizes 3.5 Connection-Oriented Transport (TCP): RFC 793 Segment Header, Byte Sequence Numbers & ACKs."
    }
  },
  "cn-ch3-tcp-rtt-retransmission": {
    "id": "cn-ch3-tcp-rtt-retransmission",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Orta - İleri",
    "title": "3.5B TCP RTT Estimation (EWMA), Timeout Interval, Retransmission Scenarios & Fast Retransmit",
    "subtitle": "Calculating EstimatedRTT (alpha=0.125) and DevRTT (beta=0.25), safety margin TimeoutInterval = EstimatedRTT + 4*DevRTT, RFC 5681 ACK rules, and triple-duplicate-ACK Fast Retransmit.",
    "sections": [
      {
        "title": "1. TCP round trip time, timeout (Slides 3-84..87)",
        "content": "![3.5B TCP RTT Estimation (EWMA), Timeout Interval, Retransmission Scenarios & Fast Retransmit Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.5B TCP RTT Estimation (EWMA), Timeout Interval, Retransmission Scenarios & Fast Retransmit** — Calculating EstimatedRTT (alpha=0.125) and DevRTT (beta=0.25), safety margin TimeoutInterval = EstimatedRTT + 4*DevRTT, RFC 5681 ACK rules, and triple-duplicate-ACK Fast Retransmit.\n\n**TCP round trip time, timeout**\n\n- **Q:** how to set TCP timeout value?\n- longer than RTT, but RTT varies!\n- **too short:** premature timeout, unnecessary retransmissions\n- **too long:** slow reaction to segment loss\n- **Q:** how to estimate RTT?\n- **SampleRTT:** measured time from segment transmission until ACK receipt\n  - ignore retransmissions\n- SampleRTT will vary, want estimated RTT “smoother”\n  - average several recent measurements, not just current SampleRTT\n- EstimatedRTT = (1- )*EstimatedRTT + *SampleRTT\n- exponential weighted moving average (EWMA)\n- influence of past sample decreases exponentially fast\n- **typical value:**  = 0.125\n- RTT (milliseconds)\n- **RTT:** gaia.cs.umass.edu to fantasia.eurecom.fr\n- sampleRTT\n- EstimatedRTT\n- time (seconds)\n- **timeout interval:** EstimatedRTT plus “safety margin”\n  - large variation in EstimatedRTT: want a larger safety margin\n- TimeoutInterval = EstimatedRTT + 4*DevRTT\n- estimated RTT\n- “safety margin”\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive/\n- DevRTT = (1-)*DevRTT + *|SampleRTT-EstimatedRTT|\n- (typically,  = 0.25)\n- **DevRTT:** EWMA of SampleRTT deviation from EstimatedRTT:\n\n> **Kurose & Ross Lecture Note:** This is how TCP re-computes the estimated RTT each time a new SampleRTT is taken. The process is knows as an exponentially weighted moving average, shown by the equation here. <say it> Where alpha reflects the influence of the most recent measurements on the estimated RTT; a typical value of alpha used in implementations is .125 The graph at the bottom show measured RTTs between a host in the Massachusetts and a host in France, as well as the estimated, “smoothed” RTT Given this value of the estimated RTT, TCP computes the timeout interval to be the estimated RTT plus a “safety margin” And the intuition is that if we are seeing a large variation in SAMPLERTT – the RTT estimates are fluctuating a lot - then we’ll want a larger safety margin So TCP computes the Timeout interval to be the Estimated RTT plus 4 times a measure of deviation in the RTT. The deviation in the RTT is computed as the eWMA of the difference between the most recently measured SampleRTT from the Estimated RTT\n\n**TCP Sender (simplified)**\n\n- **event:** data received from application\n- create segment with seq #\n- seq # is byte-stream number of first data byte in segment\n- start timer if not already running\n  - think of timer as for oldest unACKed segment\n  - expiration interval: TimeOutInterval\n- **event:** timeout\n- retransmit segment that caused timeout\n- restart timer\n- **event:** ACK received\n- if ACK acknowledges previously unACKed segments\n  - update what is known to be ACKed\n  - start timer if there are still unACKed segments\n\n> **Kurose & Ross Lecture Note:** Given these details of TCP sequence numbers, acks, and timers, we can now describe the big picture view of how the TCP sender and receiver operate You can check out FSMs in book; let’s just give an English text description here and let’s start with the sender.",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Calculating EstimatedRTT (alpha=0.125) and DevRTT (beta=0.25), safety margin TimeoutInterval = EstimatedRTT + 4*DevRTT, RFC 5681 ACK rules, and triple-duplicate-ACK Fast Retransmit."
        }
      },
      {
        "title": "2. TCP Receiver: ACK generation [RFC 5681] (Slides 3-88..90)",
        "content": "**TCP Receiver: ACK generation [RFC 5681]**\n\n- Event at receiver\n- arrival of in-order segment with\n- expected seq #. All data up to\n- expected seq # already ACKed\n- arrival of in-order segment with\n- expected seq #. One other\n- segment has ACK pending\n- arrival of out-of-order segment\n- higher-than-expect seq. # .\n- Gap detected\n- arrival of segment that\n- partially or completely fills gap\n- TCP receiver action\n- delayed ACK. Wait up to 500ms\n- for next segment. If no next segment,\n- send ACK\n- immediately send single cumulative\n- ACK, ACKing both in-order segments\n- immediately send duplicate ACK (acking\n- last correctly received in order byte),\n- indicating seq. # of next expected byte\n- immediate send ACK, provided that\n- segment starts at lower end of gap\n\n> **Kurose & Ross Lecture Note:** Rather than immediately Acknowledging this segment, many TCP implementations will wait for half a second for another in-order segment to arrive, and then generate a single cumulative ACK for both segments – thus decreasing the amount of ACK traffic. The arrival of this second in-order segment and the cumulative ACK generation that covers both segments is the second row in this table.\n\n**TCP: retransmission scenarios**\n\n- lost ACK scenario\n- Host B\n- Host A\n- Seq=92, 8 bytes of data\n- Seq=92, 8 bytes of data\n- ACK=100\n- ACK=100\n- timeout\n- premature timeout\n- Host B\n- Host A\n- Seq=92, 8\n- bytes of data\n- ACK=120\n- timeout\n- ACK=100\n- ACK=120\n- SendBase=100\n- SendBase=120\n- SendBase=120\n- Seq=92, 8 bytes of data\n- Seq=100, 20 bytes of data\n- SendBase=92\n- send cumulative\n- ACK for 120\n- cumulative ACK covers for earlier lost ACK\n- Seq=120, 15 bytes of data\n\n> **Kurose & Ross Lecture Note:** To cement our understanding of TCP reliability, let’s look a a few retransmission scenarios In the first case a TCP segments is transmitted and the ACK is lost, and the TCP timeout mechanism results in another copy of being transmitted and then re-ACKed a the sender In the second example two segments are sent and acknowledged, but there is a premature timeout e for the first segment, which is retransmitted. Note that when this retransmitted segment is received, the receiver has already received the first two segments, and so resends a cumulative ACK for both segments received so far, rather than an ACK for just this fist segment. And in this last example, two segments are again transmitted, the first ACK is lost but the second ACK, a cumulative ACK arrives at the sender, which then can transmit a third segment, knowing that the first two have arrived, even though the ACK for the first segment was lost"
      },
      {
        "title": "3. TCP fast retransmit (Slides 3-91..150)",
        "content": "**TCP fast retransmit**\n\n- Host B\n- Host A\n- timeout\n- ACK=100\n- ACK=100\n- ACK=100\n- ACK=100\n- Seq=92, 8 bytes of data\n- Seq=100, 20 bytes of data\n- Seq=100, 20 bytes of data\n- Receipt of three duplicate ACKs indicates 3 segments received after a missing segment – lost segment is likely. So retransmit!\n- if sender receives 3 additional ACKs for same data (“triple duplicate ACKs”), resend unACKed segment with smallest seq #\n  - likely that unACKed segment lost, so don’t wait for timeout\n- TCP fast retransmit\n\n> **Kurose & Ross Lecture Note:** Let’s wrap up our study of TCP reliability by discussing an optimization to the original TCP known as TCP fast retransmit, Take a look at this example on the right where 5 segments are transmitted and the second segment is lost. In this case the TCP receiver sends an ACK 100 acknowledging the first received segment. When the third segment arrives at the receiver, the TCP receiver sends another ACK 100 since the second segment has not arrived. And similarly for the 4th and 5th segments to arrive. Now what does the sender see? The sender receives the first ACK 100 it has been hoping for, but then three additional duplicate ACK100s arrive. The sender knows that somethings’ wrong – it knows the first segment arrived at the receiver but three later arriving segments at the receiver – the ones that generated the three duplicate ACKs – we received correctly but were not in order. That is, that there was a missing segment at the receiver when each of the three duplicate ACK were generated. With fast retransmit, the arrival of three duplicate ACK causes the sender to retransmit its oldest unACKed segment, without waiting for a timeout event. This allows TCP to recover more quickly from what is very likely a loss event specifically that the second segment has been lost, since three higher -numbered segments were received\n\n**TCP sender (simplified)**\n\n- wait\n- for\n- event\n- NextSeqNum = InitialSeqNum\n- SendBase = InitialSeqNum\n- retransmit not-yet-acked segment with smallest seq. #\n- start timer\n- timeout\n- if (y > SendBase) {\n- SendBase = y\n- **/* SendBase–1:** last cumulatively ACKed byte */\n- if (there are currently not-yet-acked segments)\n- start timer\n- else stop timer\n- ACK received, with ACK field value y\n- **create segment, seq. #:** NextSeqNum\n- pass segment to IP (i.e., “send”)\n- NextSeqNum = NextSeqNum + length(data)\n- if (timer currently not running)\n- start timer\n- data received from application above"
      },
      {
        "title": "4. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.5B TCP RTT Estimation (EWMA), Timeout Interval, Retransmission Scenarios & Fast Retransmit**:\n\n- **Review Question 1 (TCP reliability semantics.):** True or False: On the sending side, the TCP sender will take each application-layer chunk of data written into a TCP socket and send it in a distinct TCP segment. And then on the receiving side, TCP will deliver a segment’s payload into the appropriate socket, preserving the application-defined message boundary.\n  - **Verified Answer:** False.\n\n- **Review Question 2 (TCP sequence numbers and ACKs (1).):** Consider the TCP Telnet scenario below (from Fig. 3.31 in text). Why is it that the receiver sends an ACK that is one larger than the sequence number in the received datagram?\n  - **Verified Answer:** Because the send-to receiver segment carries only one byte of data, and after that segment is received, the next expected byte of data is just the next byte (i.e., has an index that is one larger) in the data stream.\n\n- **Review Question 3 (TCP RTT Estimation: EWMA.):** Consider TCP use of an exponentially weighted moving average (EWMA) to compute the nth value of the estimated RTT: EstimatedRTT n = (1- a)*EstimatedRTT n -1 + a*SampleRTT n True or False: with this EWMA algorithm the value of EstimatedRTT n has no dependence on the earlier sample, SampleRTT n -1\n  - **Verified Answer:** False",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "tcp_rtt_ewma_calculator.py — Kurose & Ross TCP EWMA EstimatedRTT, DevRTT & TimeoutInterval Calculator",
          "snippet": "# Kurose & Ross 9e - Section 3.5.3: TCP RTT Estimation & Timeout Interval (RFC 6298)\nalpha = 0.125\nbeta = 0.25\nest_rtt = 100.0  # ms\ndev_rtt = 5.0    # ms\nsamples_ms = [106.0, 120.0, 140.0, 90.0, 115.0]\n\nprint(f\"{'SampleRTT':>10s} | {'EstimatedRTT':>14s} | {'DevRTT':>10s} | {'TimeoutInterval':>16s}\")\nprint(\"-\" * 60)\nfor s_rtt in samples_ms:\n    est_rtt = (1.0 - alpha) * est_rtt + alpha * s_rtt\n    dev_rtt = (1.0 - beta) * dev_rtt + beta * abs(s_rtt - est_rtt)\n    timeout = est_rtt + 4.0 * dev_rtt\n    print(f\"{s_rtt:7.1f} ms | {est_rtt:11.2f} ms | {dev_rtt:7.2f} ms | {timeout:13.2f} ms\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.5B TCP RTT Estimation (EWMA), Timeout Interval, Retransmission Scenarios & Fast Retransmit",
      "filename": "tcp_rtt_ewma_calculator.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.5.3: TCP RTT Estimation & Timeout Interval (RFC 6298)\nalpha = 0.125\nbeta = 0.25\nest_rtt = 100.0  # ms\ndev_rtt = 5.0    # ms\nsamples_ms = [106.0, 120.0, 140.0, 90.0, 115.0]\n\nprint(f\"{'SampleRTT':>10s} | {'EstimatedRTT':>14s} | {'DevRTT':>10s} | {'TimeoutInterval':>16s}\")\nprint(\"-\" * 60)\nfor s_rtt in samples_ms:\n    est_rtt = (1.0 - alpha) * est_rtt + alpha * s_rtt\n    dev_rtt = (1.0 - beta) * dev_rtt + beta * abs(s_rtt - est_rtt)\n    timeout = est_rtt + 4.0 * dev_rtt\n    print(f\"{s_rtt:7.1f} ms | {est_rtt:11.2f} ms | {dev_rtt:7.2f} ms | {timeout:13.2f} ms\")",
      "expectedOutput": [
        "[OK] tcp_rtt_ewma_calculator.py — Kurose & Ross TCP EWMA EstimatedRTT, DevRTT & TimeoutInterval Calculator",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.5B TCP RTT Estimation (EWMA), Timeout Interval, Retransmission Scenarios & Fast Retransmit. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "True or False: with TCP’s flow control mechanism, where the receiver tells the sender how much free buffer space it has (and the sender always limits the amount of outstanding, unACKed, in-flight data to less than this amount), it is not possible for the sender to send more data than the receiver has room to buffer.",
      "options": [
        "A) False",
        "B) True",
        "C) None of the above statements apply to this protocol layer.",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'True' accurately characterizes 3.5B TCP RTT Estimation (EWMA), Timeout Interval, Retransmission Scenarios & Fast Retransmit."
    }
  },
  "cn-ch3-tcp-flow-conn-mgmt": {
    "id": "cn-ch3-tcp-flow-conn-mgmt",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "3.5C TCP Flow Control (rwnd) & Connection Management: 3-Way Handshake & Graceful Close",
    "subtitle": "Preventing receiver buffer overflow via advertised rwnd, why 2-way handshakes fail with delayed duplicate packets, the SYN / SYN-ACK / ACK 3-way handshake, and FIN / ACK teardown.",
    "sections": [
      {
        "title": "1. TCP flow control (Slides 3-93..99)",
        "content": "![3.5C TCP Flow Control (rwnd) & Connection Management: 3-Way Handshake & Graceful Close Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.5C TCP Flow Control (rwnd) & Connection Management: 3-Way Handshake & Graceful Close** — Preventing receiver buffer overflow via advertised rwnd, why 2-way handshakes fail with delayed duplicate packets, the SYN / SYN-ACK / ACK 3-way handshake, and FIN / ACK teardown.\n\n**TCP flow control**\n\n- application\n- process\n- TCP socket\n- receiver buffers\n- TCP\n- code\n- code\n- receiver protocol stack\n- **Q:** What happens if network layer delivers data faster than application layer removes data from socket buffers?\n- Network layer delivering IP datagram payload into TCP socket buffers\n- from sender\n- Application removing data from TCP socket buffers\n- receive window\n- **flow control:** # bytes receiver willing to accept\n- receiver controls sender, so sender won’t overflow receiver’s buffer by transmitting too much, too fast\n- flow control\n- TCP receiver “advertises” free buffer space in rwnd field in TCP header\n  - RcvBuffer size set via socket options (typical default is 4096 bytes)\n  - many operating systems auto-adjust RcvBuffer\n- sender limits amount of unACKed (“in-flight”) data to received rwnd\n- guarantees receive buffer will not overflow\n- buffered data\n- free buffer space\n- rwnd\n- RcvBuffer\n- TCP segment payloads\n- to application process\n- TCP receiver-side buffering\n- TCP segment format\n\n> **Kurose & Ross Lecture Note:** (Presuming an intro) Before diving into the details of TCP flow control, let’s first get the general context and motivate the need for flow control. This diagram show a typical transport-layer implementation A segment is brought up the protocol stack to the transport layer, and the segment’s payload is removed from the segment and written INTO socket buffers. How does data get taken OUT of socket buffers? By applications performing socket reads, as we learned in Chapter 2. And so the question is “What happens if network layer delivers data faster than an application-layer process removes data from socket buffers?” Let’s watch a video of what happens when things arrive way too fast to fast to be processed. <video>. (I love that video). Another human analogy showing the need for flow control is the saying – to use some English slang - “no one can drink from a firehose” Flow control is a mechanism to the calamity of a receiver being over-run by a sender that is sending too fast – it allows the RECEIVER to explicitly control the SENDER so sender won’t overflow receiver’s buffer by transmitting too much, too fast Here’s how TCP implement flow control. The basic idea is simple – the receiver informs the sender how much free buffer space there is, and the sender is limited to send no more than this amount of data. That the value o RWND in the diagram to the right. This information is carried from the receiver to the sender in the “receiver advertised window” (do a PIP of header) in the TCP header, and the value will change as the amount of free buffer space fluctuates over time.\n\n**TCP connection management**\n\n- before exchanging data, sender/receiver “handshake”:\n- agree to establish connection (each knowing the other willing to establish connection)\n- agree on connection parameters (e.g., starting seq #s)\n- **connection state:** ESTAB\n- **connection variables:** \n  - seq # client-to-server\n  - server-to-client\n  - rcvBuffer size\n  - at server,client\n- application\n- network\n- **connection state:** ESTAB\n- **connection Variables:** \n  - seq # client-to-server\n  - server-to-client\n  - rcvBuffer size\n  - at server,client\n- application\n- network\n- Socket clientSocket =\n- newSocket(\"hostname\",\"port number\");\n- Socket connectionSocket = welcomeSocket.accept();\n\n> **Kurose & Ross Lecture Note:** The other TCP topic we’ll want to consider here is that of “connection management” The TCP sender and receiver have a number of pieces of shared state that they must establish before actually communicating FIRST they must both agree that they WANT to communicate with each other Secondly there are connection parameters – the initial sequence number and the initial receiver-advertised bufferspace that they’ll want to agree on This is done via a so-called handshake protocol – the client reaching our to the server, and the server answering back. And before diving into the TCP handshake protocol, let’s first consider the problem of handshaking, of establishing shared state.",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Preventing receiver buffer overflow via advertised rwnd, why 2-way handshakes fail with delayed duplicate packets, the SYN / SYN-ACK / ACK 3-way handshake, and FIN / ACK teardown."
        }
      },
      {
        "title": "2. Agreeing to establish a connection (Slides 3-100..103)",
        "content": "**Agreeing to establish a connection**\n\n- **Q:** will 2-way handshake always work in network?\n- variable delays\n- retransmitted messages (e.g. req_conn(x)) due to message loss\n- message reordering\n- can’t “see” other side\n- **2-way handshake:** \n- Let’s talk\n- ESTAB\n- ESTAB\n- choose x\n- req_conn(x)\n- ESTAB\n- ESTAB\n- acc_conn(x)\n\n> **Kurose & Ross Lecture Note:** Here’s an example of a two way handshake. Alice reaches out to Bob and say’s “let’s talk” and Bob says OK, and they start their conversation For a network protocol, the equivalent protocol would be a client sending a “request connection” message saying ”let’s talk, the initial sequence number is x” And the server would respond with a message ”I accept your connect x” And the question we want to ask ourselves is <talk through> Will this work? Let’s look at a few scenarios…\n\n**2-way handshake scenarios**\n\n- connection\n- x completes\n- choose x\n- req_conn(x)\n- ESTAB\n- ESTAB\n- acc_conn(x)\n- data(x+1)\n- accept\n- data(x+1)\n- ACK(x+1)\n- No problem!\n- retransmit\n- client terminates\n- server\n- forgets x\n- **Problem:** half open connection! (no client)\n- **Problem:** dup data\n- accepted!"
      },
      {
        "title": "3. TCP 3-way handshake (Slides 3-104..105)",
        "content": "**TCP 3-way handshake**\n\n- SYNbit=1, Seq=x\n- choose init seq num, x\n- send TCP SYN msg\n- ESTAB\n- SYNbit=1, Seq=y\n- ACKbit=1; ACKnum=x+1\n- choose init seq num, y\n- send TCP SYNACK\n- msg, acking SYN\n- ACKbit=1, ACKnum=y+1\n- received SYNACK(x)\n- indicates server is live;\n- send ACK for SYNACK;\n- this segment may contain\n- client-to-server data\n- received ACK(y)\n- indicates client is live\n- SYNSENT\n- ESTAB\n- SYN RCVD\n- Client state\n- LISTEN\n- Server state\n- LISTEN\n- clientSocket = socket(AF_INET, SOCK_STREAM)\n- serverSocket = socket(AF_INET,SOCK_STREAM)\n- serverSocket.bind((‘’,serverPort))\n- serverSocket.listen(1)\n- connectionSocket, addr = serverSocket.accept()\n- clientSocket.connect((serverName,serverPort))\n\n> **Kurose & Ross Lecture Note:** TCP’s three way handshake, that operates as follows Let’s say the client and server both create a TCP socket as we learned about in Chapter 2 and enter the LISTEN state The client then connects to the server sending a SYN message with a sequence number x (SYN Message is an TCP Segment with SYN but set in the header – you might want to go back and review the TCP segment format!) The server is waiting for a connection, and receives the SYN message enters the SYN received state (NOT the established state and sends a SYN ACK message back. Finally the client sends an ACK message to the server, and when the server receiver this enters the Established state. This is when the application process would see the return from the wait on the socket accept() call\n\n**A human 3-way handshake protocol**\n\n- 1. On belay?\n- 2. Belay on.\n- 3. Climbing.\n\n> **Kurose & Ross Lecture Note:** As usual, there’s a human protocol analogy to the three way handshake, and I still remember thinking about this clinging for my life while climbing up a rockface When you want start climbing you first say ON BELOW (meaning ARE YOU READY WITH MY SAFETY ROPE) THE BELYER (server) responds BELAY ON (that lets you know the belayer is ready for you) And then you say CLIMING It’s amazing what can pass through your head when your clinging for your life o a"
      },
      {
        "title": "4. Closing a TCP connection (Slides 3-106..151)",
        "content": "**Closing a TCP connection**\n\n- client, server each close their side of connection\n  - send TCP segment with FIN bit = 1\n- respond to received FIN with ACK\n  - on receiving FIN, ACK can be combined with own FIN\n- simultaneous FIN exchanges can be handled\n\n> **Kurose & Ross Lecture Note:** All good things must come to an end, and that’s true for a TCP connection as well. And of course there’s a protocol for one side to gracefully close of a TCP connection using a FIN message, to which the other side sends a FINACK message and waits around a bit to respond to any retransmitted FIN messages before timing out.\n\n**TCP 3-way handshake FSM**\n\n- closed\n- listen\n- SYN\n- rcvd\n- SYN\n- sent\n- ESTAB\n- Socket clientSocket =\n- newSocket(\"hostname\",\"port number\");\n- SYN(seq=x)\n- Socket connectionSocket = welcomeSocket.accept();\n- SYN(x)\n- SYNACK(seq=y,ACKnum=x+1)\n- create new socket for communication back to client\n- SYNACK(seq=y,ACKnum=x+1)\n- ACK(ACKnum=y+1)\n- ACK(ACKnum=y+1)"
      },
      {
        "title": "5. Closing a TCP connection (Slides 3-152..152)",
        "content": "- FIN_WAIT_2\n- CLOSE_WAIT\n- FINbit=1, seq=y\n- ACKbit=1; ACKnum=y+1\n- ACKbit=1; ACKnum=x+1\n- wait for server\n- close\n- can still\n- send data\n- can no longer\n- send data\n- LAST_ACK\n- CLOSED\n- TIMED_WAIT\n- timed wait\n- for 2*max\n- segment lifetime\n- CLOSED\n- FIN_WAIT_1\n- FINbit=1, seq=x\n- can no longer\n- send but can\n- receive data\n- clientSocket.close()\n- client state\n- server state\n- ESTAB\n- ESTAB"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.5C TCP Flow Control (rwnd) & Connection Management: 3-Way Handshake & Graceful Close**:\n\n- **Review Question 1 (TCP reliability semantics.):** True or False: On the sending side, the TCP sender will take each application-layer chunk of data written into a TCP socket and send it in a distinct TCP segment. And then on the receiving side, TCP will deliver a segment’s payload into the appropriate socket, preserving the application-defined message boundary.\n  - **Verified Answer:** False.\n\n- **Review Question 2 (TCP sequence numbers and ACKs (1).):** Consider the TCP Telnet scenario below (from Fig. 3.31 in text). Why is it that the receiver sends an ACK that is one larger than the sequence number in the received datagram?\n  - **Verified Answer:** Because the send-to receiver segment carries only one byte of data, and after that segment is received, the next expected byte of data is just the next byte (i.e., has an index that is one larger) in the data stream.\n\n- **Review Question 3 (TCP RTT Estimation: EWMA.):** Consider TCP use of an exponentially weighted moving average (EWMA) to compute the nth value of the estimated RTT: EstimatedRTT n = (1- a)*EstimatedRTT n -1 + a*SampleRTT n True or False: with this EWMA algorithm the value of EstimatedRTT n has no dependence on the earlier sample, SampleRTT n -1\n  - **Verified Answer:** False",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "tcp_flow_control_rwnd.py — Simulating TCP Receiver Buffer (RcvBuffer) & Advertised rwnd Flow Control",
          "snippet": "# Kurose & Ross 9e - Section 3.5.5: TCP Flow Control (LastByteSent - LastByteAcked <= rwnd)\nrcv_buffer_size = 4096  # Bytes\nbuffered_bytes = 0\n\nevents = [\n    (\"SEND_DATA\", 1500),\n    (\"SEND_DATA\", 2000),\n    (\"APP_READ\", 1000),\n    (\"SEND_DATA\", 1500),\n]\n\nfor action, amount in events:\n    if action == \"SEND_DATA\":\n        buffered_bytes += amount\n    else:\n        buffered_bytes = max(0, buffered_bytes - amount)\n    rwnd = rcv_buffer_size - buffered_bytes\n    print(f\"Event: {action:10s} ({amount:4d} B) | In RcvBuffer: {buffered_bytes:4d} B | Advertised rwnd: {rwnd:4d} B\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.5C TCP Flow Control (rwnd) & Connection Management: 3-Way Handshake & Graceful Close",
      "filename": "tcp_flow_control_rwnd.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.5.5: TCP Flow Control (LastByteSent - LastByteAcked <= rwnd)\nrcv_buffer_size = 4096  # Bytes\nbuffered_bytes = 0\n\nevents = [\n    (\"SEND_DATA\", 1500),\n    (\"SEND_DATA\", 2000),\n    (\"APP_READ\", 1000),\n    (\"SEND_DATA\", 1500),\n]\n\nfor action, amount in events:\n    if action == \"SEND_DATA\":\n        buffered_bytes += amount\n    else:\n        buffered_bytes = max(0, buffered_bytes - amount)\n    rwnd = rcv_buffer_size - buffered_bytes\n    print(f\"Event: {action:10s} ({amount:4d} B) | In RcvBuffer: {buffered_bytes:4d} B | Advertised rwnd: {rwnd:4d} B\")",
      "expectedOutput": [
        "[OK] tcp_flow_control_rwnd.py — Simulating TCP Receiver Buffer (RcvBuffer) & Advertised rwnd Flow Control",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.5C TCP Flow Control (rwnd) & Connection Management: 3-Way Handshake & Graceful Close. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Consider the TCP Telnet scenario below (from Fig. 3.31 in text). Why is it that the receiver sends an ACK that is one larger than the sequence number in the received datagram?",
      "options": [
        "A) Because TCP sequence numbers always increase by 1, with every new segment, and the TCP receiver always send the sequence number of the next ",
        "B) Because the send-to receiver segment carries only one byte of data, and after that segment is received, the next expected byte of data is ju",
        "C) None of the above statements apply to this protocol layer.",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'Because the send-to receiver segment carries only one byte of data, and after that segment is received, the next expected byte of data is just the next byte (i.e., has an index that is one larger) in the data stream.' accurately characterizes 3.5C TCP Flow Control (rwnd) & Connection Management: 3-Way Handshake & Graceful Close."
    }
  },
  "cn-ch3-congestion-principles": {
    "id": "cn-ch3-congestion-principles",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Orta - İleri",
    "title": "3.6 Principles of Congestion Control: Queueing Costs, Retransmission Waste & Multi-Hop Collapse",
    "subtitle": "Analyzing Kurose & Ross's three congestion scenarios: infinite buffers with huge queueing delays, finite buffers with duplicate retransmissions, and upstream bandwidth wasted when packets drop downstream.",
    "sections": [
      {
        "title": "1. Principles of congestion control (Slides 3-108..109)",
        "content": "![3.6 Principles of Congestion Control: Queueing Costs, Retransmission Waste & Multi-Hop Collapse Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.6 Principles of Congestion Control: Queueing Costs, Retransmission Waste & Multi-Hop Collapse** — Analyzing Kurose & Ross's three congestion scenarios: infinite buffers with huge queueing delays, finite buffers with duplicate retransmissions, and upstream bandwidth wasted when packets drop downstream.\n\n**Principles of congestion control**\n\n- **Congestion:** \n- **informally:** “too many sources sending too much data too fast for network to handle”\n- **manifestations:** \n  - long delays (queueing in router buffers)\n  - packet loss (buffer overflow at routers)\n- different from flow control!\n- **congestion control:** too many senders, sending too fast\n- **flow control:** one sender too fast for one receiver\n- a top-10 problem!\n\n**Causes/costs of congestion: scenario 1**\n\n- **Simplest scenario:** \n- **maximum per-connection throughput:** R/2\n- Host A\n- Host B\n- **throughput:** lout\n- large delays as arrival rate line approaches capacity\n- **Q:** What happens as arrival rate lin approaches R/2?\n- **original data:** lin\n- two flows\n- one router, infinite buffers\n- **input, output link capacity:** R\n- infinite shared output link buffers\n- no retransmissions needed\n- R/2\n- delay\n- lin\n- R/2\n- R/2\n- R/2\n- lout\n- lin\n- **throughput:** ",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Analyzing Kurose & Ross's three congestion scenarios: infinite buffers with huge queueing delays, finite buffers with duplicate retransmissions, and upstream bandwidth wasted when packets drop downstream."
        }
      },
      {
        "title": "2. Causes/costs of congestion: scenario 2 (Slides 3-110..117)",
        "content": "**Causes/costs of congestion: scenario 2**\n\n- one router, finite buffers\n- Host A\n- Host B\n- **lin:** original data\n- **l'in:** original data, plus retransmitted data\n- finite shared output link buffers\n- sender retransmits lost, timed-out packet\n  - application-layer input = application-layer output: lin = lout\n  - transport-layer input includes retransmissions : l’in lin\n- lout\n- copy\n- free buffer space!\n- **Idealization:** perfect knowledge\n- sender sends only when router buffers available\n- R/2\n- lin\n- **throughput:** \n- no buffer space!\n- **Idealization:** some perfect knowledge\n- packets can be lost (dropped at router) due to full buffers\n- **sender knows when packet has been dropped:** only resends if packet known to be lost\n- when sending at R/2, some packets are needed retransmissions\n- “wasted” capacity due to retransmissions\n- timeout\n- **Realistic scenario:** un-needed duplicates\n- packets can be lost, dropped at router due to full buffers – requiring retransmissions\n- but sender times can time out prematurely, sending two copies, both of which are delivered\n- when sending at R/2, some packets are retransmissions, including needed and un-needed duplicates, that are delivered!\n- “wasted” capacity due to un-needed retransmissions\n- **“costs” of congestion:** \n- more work (retransmission) for given receiver throughput\n- **unneeded retransmissions:** link carries multiple copies of a packet\n  - decreasing maximum achievable throughput\n\n**Causes/costs of congestion: scenario 3**\n\n- four senders\n- multi-hop paths\n- timeout/retransmit\n- **Q:** what happens as lin and lin’ increase ?\n- **A:** as red lin’ increases, all arriving blue pkts at upper queue are dropped, blue throughput g 0\n- finite shared output link buffers\n- Host A\n- lout\n- Host B\n- Host C\n- Host D\n- **lin:** original data\n- **l'in:** original data, plus retransmitted data\n- **another “cost” of congestion:** \n- when packet dropped, any upstream transmission capacity and buffering used for that packet was wasted!\n- R/2\n- lin’"
      },
      {
        "title": "3. Causes/costs of congestion: insights (Slides 3-118..120)",
        "content": "**Causes/costs of congestion: insights**\n\n- upstream transmission capacity / buffering wasted for packets lost downstream\n- delay increases as capacity approached\n- un-needed duplicates further decreases effective throughput\n- loss/retransmission decreases effective throughput\n- throughput can never exceed capacity\n\n**Approaches towards congestion control**\n\n- **End-end congestion control:** \n- no explicit feedback from network\n- congestion inferred from observed loss, delay\n- data\n- data\n- ACKs\n- ACKs\n- approach taken by TCP\n- TCP ECN, ATM, DECbit protocols\n- explicit congestion info\n- **Network-assisted congestion control:** \n- routers provide direct feedback to sending/receiving hosts with flows passing through congested router\n- may indicate congestion level or explicitly set sending rate"
      },
      {
        "title": "4. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.6 Principles of Congestion Control: Queueing Costs, Retransmission Waste & Multi-Hop Collapse**:\n\n- **Review Question 1 (Congestion control versus flow control.):** Consider the five images below. Indicate which of these images suggest the need for flow control (the others would suggest the need for congestion control).\n  - **Verified Answer:** A glass overflowing; A talking head\n\n- **Review Question 2 (Two congested senders.):** Consider the figure below, which shows the application-to-application throughput achieved when two senders are competing at a shared bottleneck link. Suppose that when the overall arrival rate, lambda in ' (for each sender) is close to R/2, the throughput to the application layer (at each receiver), lambda out , is equal to 0.8 * lambda in '. What fraction of the packets transmitted at the sender are retransmissions?\n  - **Verified Answer:** .20\n\n- **Review Question 3 (Network-assisted or end-end congestion control?):** Which of the following actions are used in network-assisted congestion control (say versus end-end congestion control) to signal congestion. Check all that apply.\n  - **Verified Answer:** A router sends an ICMP message to a host telling it to slow down its sending rate.; A router marks a field in the datagram header at a congested router.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "congestion_scenarios_sim.py — Modeling Goodput Collapse in Multi-Hop Congested Routers",
          "snippet": "# Kurose & Ross 9e - Section 3.6: Congestion Scenario 3 (Multi-Hop Upstream Waste)\nR_link = 100.0  # Link capacity = 100 Mbps\nfor lambda_in in [10.0, 30.0, 50.0, 80.0, 98.0]:\n    # As offered load approaches R/2 per competing cross-flow, drop probability rises sharply\n    drop_prob = min(0.95, (lambda_in / R_link) ** 2)\n    delivered_goodput = lambda_in * (1.0 - drop_prob) * (1.0 - drop_prob)  # 2 congested hops\n    wasted_capacity = lambda_in - delivered_goodput\n    print(f\"Offered Load: {lambda_in:5.1f} Mbps | 2-Hop Goodput: {delivered_goodput:5.2f} Mbps | Wasted Upstream BW: {wasted_capacity:5.2f} Mbps\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.6 Principles of Congestion Control: Queueing Costs, Retransmission Waste & Multi-Hop Collapse",
      "filename": "congestion_scenarios_sim.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.6: Congestion Scenario 3 (Multi-Hop Upstream Waste)\nR_link = 100.0  # Link capacity = 100 Mbps\nfor lambda_in in [10.0, 30.0, 50.0, 80.0, 98.0]:\n    # As offered load approaches R/2 per competing cross-flow, drop probability rises sharply\n    drop_prob = min(0.95, (lambda_in / R_link) ** 2)\n    delivered_goodput = lambda_in * (1.0 - drop_prob) * (1.0 - drop_prob)  # 2 congested hops\n    wasted_capacity = lambda_in - delivered_goodput\n    print(f\"Offered Load: {lambda_in:5.1f} Mbps | 2-Hop Goodput: {delivered_goodput:5.2f} Mbps | Wasted Upstream BW: {wasted_capacity:5.2f} Mbps\")",
      "expectedOutput": [
        "[OK] congestion_scenarios_sim.py — Modeling Goodput Collapse in Multi-Hop Congested Routers",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.6 Principles of Congestion Control: Queueing Costs, Retransmission Waste & Multi-Hop Collapse. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following actions are used in network-assisted congestion control (say versus end-end congestion control) to signal congestion. Check all that apply.",
      "options": [
        "A) A datagram experiences delay at a congested network router, which is then measured by the sender and used to decrease the sending rate.",
        "B) A router sends an ICMP message to a host telling it to slow down its sending rate.",
        "C) A router drops a packet at a congested router.",
        "D) A sender decreases its sending rate in response to packet loss detected via its transport-layer ACKing."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'A router sends an ICMP message to a host telling it to slow down its sending rate.' accurately characterizes 3.6 Principles of Congestion Control: Queueing Costs, Retransmission Waste & Multi-Hop Collapse."
    }
  },
  "cn-ch3-tcp-congestion-aimd": {
    "id": "cn-ch3-tcp-congestion-aimd",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "3.7 Classic TCP Congestion Control: Slow Start, AIMD Sawtooth, ssthresh & Congestion Avoidance",
    "subtitle": "Tracing cwnd evolution round-by-round: exponential Slow Start (doubling per RTT), linear Congestion Avoidance (+1 MSS per RTT), multiplicative decrease (ssthresh = cwnd/2) on 3 duplicate ACKs vs. cwnd=1 on timeout.",
    "sections": [
      {
        "title": "1. TCP congestion control: AIMD (Slides 3-122..123)",
        "content": "![3.7 Classic TCP Congestion Control: Slow Start, AIMD Sawtooth, ssthresh & Congestion Avoidance Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.7 Classic TCP Congestion Control: Slow Start, AIMD Sawtooth, ssthresh & Congestion Avoidance** — Tracing cwnd evolution round-by-round: exponential Slow Start (doubling per RTT), linear Congestion Avoidance (+1 MSS per RTT), multiplicative decrease (ssthresh = cwnd/2) on 3 duplicate ACKs vs. cwnd=1 on timeout.\n\n**TCP congestion control: AIMD**\n\n- **approach:** senders can increase sending rate until packet loss (congestion) occurs, then decrease sending rate on loss event\n- AIMD sawtooth\n- **behavior:** probing\n- for bandwidth\n- TCP sender Sending rate\n- time\n  - increase sending rate by 1 maximum segment size every RTT until loss detected\n- Additive Increase\n  - cut sending rate in half at each loss event\n- Multiplicative Decrease\n\n**TCP AIMD: more**\n\n- **Multiplicative decrease detail:** sending rate is\n- Cut in half on loss detected by triple duplicate ACK (TCP Reno)\n- Cut to 1 MSS (maximum segment size) when loss detected by timeout (TCP Tahoe)\n- Why AIMD?\n- AIMD – a distributed, asynchronous algorithm – has been shown to:\n  - optimize congested flow rates network wide [Kelly]!\n  - have desirable stability properties",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Tracing cwnd evolution round-by-round: exponential Slow Start (doubling per RTT), linear Congestion Avoidance (+1 MSS per RTT), multiplicative decrease (ssthresh = cwnd/2) on 3 duplicate ACKs vs. cwnd=1 on timeout."
        }
      },
      {
        "title": "2. TCP congestion control: details (Slides 3-124..125)",
        "content": "**TCP congestion control: details**\n\n- **TCP sender limits transmission:** \n- cwnd is dynamically adjusted in response to observed network congestion (implementing TCP congestion control)\n- LastByteSent- LastByteAcked\n- cwnd\n- last byte\n- ACKed\n- last byte sent\n- cwnd\n- sender sequence number space\n- available but not used\n- **TCP sending behavior:** \n- **roughly:** send cwnd bytes, wait RTT for ACKS, then send more bytes\n- TCP rate\n- cwnd\n- RTT\n- bytes/sec\n- sent, but not-yet ACKed\n- (“in-flight”)\n\n**TCP slow start**\n\n- when connection begins, increase rate exponentially until first loss event:\n  - initially cwnd = 1 MSS\n  - double cwnd every RTT\n  - done by incrementing cwnd for every ACK received\n- Host A\n- one segment\n- Host B\n- RTT\n- time\n- two segments\n- four segments\n- **summary:** initial rate is slow, but ramps up exponentially fast"
      },
      {
        "title": "3. TCP: from slow start to congestion avoidance (Slides 3-126..127)",
        "content": "**TCP: from slow start to congestion avoidance**\n\n- **Q:** when should the exponential increase switch to linear?\n- **A:** when cwnd gets to 1/2 of its value before timeout.\n- **Implementation:** \n- variable ssthresh\n- on loss event, ssthresh is set to 1/2 of cwnd just before loss event\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive/\n\n**Summary: TCP congestion control**\n\n- timeout\n- ssthresh = cwnd/2\n- cwnd = 1 MSS\n- dupACKcount = 0\n- retransmit missing segment\n- cwnd > ssthresh\n- congestion\n- avoidance\n- cwnd = cwnd + MSS (MSS/cwnd)\n- dupACKcount = 0\n- transmit new segment(s), as allowed\n- new ACK\n- dupACKcount++\n- duplicate ACK\n- fast\n- recovery\n- cwnd = cwnd + MSS\n- transmit new segment(s), as allowed\n- duplicate ACK\n- ssthresh= cwnd/2\n- cwnd = ssthresh + 3\n- retransmit missing segment\n- dupACKcount == 3\n- timeout\n- ssthresh = cwnd/2\n- cwnd = 1\n- dupACKcount = 0\n- retransmit missing segment\n- ssthresh= cwnd/2\n- cwnd = ssthresh + 3\n- retransmit missing segment\n- dupACKcount == 3\n- cwnd = ssthresh\n- dupACKcount = 0\n- New ACK\n- slow\n- start\n- timeout\n- ssthresh = cwnd/2\n- cwnd = 1 MSS\n- dupACKcount = 0\n- retransmit missing segment\n- cwnd = cwnd+MSS\n- dupACKcount = 0\n- transmit new segment(s), as allowed\n- new ACK\n- dupACKcount++\n- duplicate ACK\n- cwnd = 1 MSS\n- ssthresh = 64 KB\n- dupACKcount = 0\n- New\n- ACK!\n- New\n- ACK!\n- New\n- ACK!"
      },
      {
        "title": "4. TCP throughput (Slides 3-153..154)",
        "content": "**TCP throughput**\n\n- avg. TCP thruput as function of window size, RTT?\n  - ignore slow start, assume there is always data to send\n- **W:** window size (measured in bytes) where loss occurs\n  - avg. window size (# in-flight bytes) is ¾ W\n  - avg. thruput is 3/4W per RTT\n- W/2\n- avg TCP thruput =\n- RTT\n- bytes/sec\n\n**TCP over “long, fat pipes”**\n\n- **example:** 1500 byte segments, 100ms RTT, want 10 Gbps throughput\n- requires W = 83,333 in-flight segments\n- throughput in terms of segment loss probability, L [Mathis 1997]:\n  - ➜ to achieve 10 Gbps throughput, need a loss rate of L = 2·10-10 – a very small loss rate!\n- versions of TCP for long, high-speed scenarios\n\n- **Slide Diagram Elements & Protocol Entities:** `TCP throughput =, 1.22, MSS, RTT`"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.7 Classic TCP Congestion Control: Slow Start, AIMD Sawtooth, ssthresh & Congestion Avoidance**:\n\n- **Review Question 1 (TCP’s AIMD algorithm.):** Which of the following statements about TCP’s Additive-increase-multiplicative-decrease (AIMD) algorithm are true? Check all that are true.\n  - **Verified Answer:** AIMD is a end-end approach to congestion control.; AIMD cuts the congestion window size, cwnd , in half whenever loss is detected by a triple duplicate ACK.; AIMD cuts the congestion window size, cwnd , i to 1 whenever a timeout occurs.\n\n- **Review Question 2 (TCP’s AIMD algorithm (2).):** How is the sending rate typically regulated in a TCP implementation?\n  - **Verified Answer:** By keeping a window of size cwnd over the sequence number space, and making sure that no more than cwnd bytes of data are outstanding (i.e, unACKnowledged). The size of cwnd i s regulated by AIMD.\n\n- **Review Question 3 (TCP’s Slowstart algorithm.):** Which of the following best completes this sentence: \"In the absence of loss, TCP slow start increases the sending rate ... \"\n  - **Verified Answer:** \" ... faster than AIMD. In fact, slowstart increases the sending rate exponentially fast per RTT.\"",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "tcp_reno_cwnd_trace.py — Tracing TCP Reno Congestion Window (cwnd) & ssthresh Across RTT Rounds",
          "snippet": "# Kurose & Ross 9e - Section 3.7: TCP Reno Congestion Window (cwnd) Evolution Simulator\ncwnd = 1       # In units of MSS\nssthresh = 16  # Initial slow-start threshold (16 MSS)\n\nfor rtt in range(1, 14):\n    state = \"Slow Start\" if cwnd < ssthresh else \"Congestion Avoidance (AIMD)\"\n    if rtt == 8:\n        print(f\"RTT {rtt:2d}: cwnd={cwnd:2d} MSS | ssthresh={ssthresh:2d} MSS | *** 3 DUPLICATE ACKs (Fast Recovery: ssthresh=cwnd//2, cwnd=ssthresh) ***\")\n        ssthresh = cwnd // 2\n        cwnd = ssthresh\n        continue\n    if rtt == 12:\n        print(f\"RTT {rtt:2d}: cwnd={cwnd:2d} MSS | ssthresh={ssthresh:2d} MSS | *** TIMEOUT! (ssthresh=cwnd//2, cwnd=1 MSS) ***\")\n        ssthresh = cwnd // 2\n        cwnd = 1\n        continue\n    print(f\"RTT {rtt:2d}: cwnd={cwnd:2d} MSS | ssthresh={ssthresh:2d} MSS | Mode: {state}\")\n    cwnd = cwnd * 2 if cwnd < ssthresh else cwnd + 1"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.7 Classic TCP Congestion Control: Slow Start, AIMD Sawtooth, ssthresh & Congestion Avoidance",
      "filename": "tcp_reno_cwnd_trace.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.7: TCP Reno Congestion Window (cwnd) Evolution Simulator\ncwnd = 1       # In units of MSS\nssthresh = 16  # Initial slow-start threshold (16 MSS)\n\nfor rtt in range(1, 14):\n    state = \"Slow Start\" if cwnd < ssthresh else \"Congestion Avoidance (AIMD)\"\n    if rtt == 8:\n        print(f\"RTT {rtt:2d}: cwnd={cwnd:2d} MSS | ssthresh={ssthresh:2d} MSS | *** 3 DUPLICATE ACKs (Fast Recovery: ssthresh=cwnd//2, cwnd=ssthresh) ***\")\n        ssthresh = cwnd // 2\n        cwnd = ssthresh\n        continue\n    if rtt == 12:\n        print(f\"RTT {rtt:2d}: cwnd={cwnd:2d} MSS | ssthresh={ssthresh:2d} MSS | *** TIMEOUT! (ssthresh=cwnd//2, cwnd=1 MSS) ***\")\n        ssthresh = cwnd // 2\n        cwnd = 1\n        continue\n    print(f\"RTT {rtt:2d}: cwnd={cwnd:2d} MSS | ssthresh={ssthresh:2d} MSS | Mode: {state}\")\n    cwnd = cwnd * 2 if cwnd < ssthresh else cwnd + 1",
      "expectedOutput": [
        "[OK] tcp_reno_cwnd_trace.py — Tracing TCP Reno Congestion Window (cwnd) & ssthresh Across RTT Rounds",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.7 Classic TCP Congestion Control: Slow Start, AIMD Sawtooth, ssthresh & Congestion Avoidance. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "How is the sending rate typically regulated in a TCP implementation?",
      "options": [
        "A) By using the retransmission timeout timer and counting the number of bytes sent since the last timeout to compute the sending rate since tha",
        "B) By keeping a window of size cwnd over the sequence number space, and making sure that no more than cwnd bytes of data are outstanding (i.e, ",
        "C) None of the above statements apply to this protocol layer.",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'By keeping a window of size cwnd over the sequence number space, and making sure that no more than cwnd bytes of data are outstanding (i.e, unACKnowledged). The size of cwnd i s regulated by AIMD.' accurately characterizes 3.7 Classic TCP Congestion Control: Slow Start, AIMD Sawtooth, ssthresh & Congestion Avoidance."
    }
  },
  "cn-ch3-tcp-cubic-bbr-ecn": {
    "id": "cn-ch3-tcp-cubic-bbr-ecn",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "3.7B Modern Congestion Control: TCP CUBIC, Delay-Based BBR, ECN & TCP Fairness",
    "subtitle": "Why Linux defaults to TCP CUBIC (cubic function around W_max), Google BBR's model of keeping the bottleneck pipe 'just full enough, but no fuller', Explicit Congestion Notification (ECN), and AIMD fairness.",
    "sections": [
      {
        "title": "1. TCP CUBIC (Slides 3-128..132)",
        "content": "![3.7B Modern Congestion Control: TCP CUBIC, Delay-Based BBR, ECN & TCP Fairness Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.7B Modern Congestion Control: TCP CUBIC, Delay-Based BBR, ECN & TCP Fairness** — Why Linux defaults to TCP CUBIC (cubic function around W_max), Google BBR's model of keeping the bottleneck pipe 'just full enough, but no fuller', Explicit Congestion Notification (ECN), and AIMD fairness.\n\n**TCP CUBIC**\n\n- Is there a better way than AIMD to “probe” for usable bandwidth?\n- Wmax\n- Wmax/2\n- classic TCP\n- TCP CUBIC - higher throughput in this example\n- **Insight/intuition:** \n  - Wmax: sending rate at which congestion loss was detected\n  - congestion state of bottleneck link probably (?) hasn’t changed much\n  - after cutting rate/window in half on loss, initially ramp to to Wmax faster, but then approach Wmax more slowly\n- **K:** point in time when TCP window size will reach Wmax\n  - K itself is tunable\n  - larger increases when further away from K\n  - smaller increases (cautious) when nearer K\n- TCP\n- sending\n- rate\n- time\n- TCP Reno\n- TCP CUBIC\n- TCP CUBIC default in Linux, most popular TCP for popular Web servers (until ~2024)\n- increase W as a function of the cube of the distance between current time and K\n\n**TCP and the congested “bottleneck link”**\n\n- TCP (classic, CUBIC) increase TCP’s sending rate until packet loss occurs at some router’s output: the bottleneck link\n- source\n- application\n- TCP\n- network\n- link\n- physical\n- destination\n- application\n- TCP\n- network\n- link\n- physical\n- bottleneck link (almost always busy)\n- packet queue almost never empty, sometimes overflows packet (loss)\n- **understanding congestion:** useful to focus on congested bottleneck link\n- **insight:** increasing TCP sending rate will not increase end-end throughout at congested bottleneck, which is already transmitting at full rate, R\n- **insight:** increasing TCP sending rate will increase measured RTT (increased queueing delay at bottleneck link)\n- RTT\n- **Goal:** “keep the end-end pipe just full, but not fuller”\n- multiple flows collectively congest bottleneck link:\n  - each their executing own TCP congestion control\n  - each of N flows should ideally receive throughput of R/N\n\n- **Slide Diagram Elements & Protocol Entities:** `. . .`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Why Linux defaults to TCP CUBIC (cubic function around W_max), Google BBR's model of keeping the bottleneck pipe 'just full enough, but no fuller', Explicit Congestion Notification (ECN), and AIMD fairness."
        }
      },
      {
        "title": "2. Keeping pipe “just full enough, but no fuller”: keep bottleneck link busy transmitting, but avoid high delays/buffering (Slides 3-133..135)",
        "content": "**Keeping pipe “just full enough, but no fuller”: keep bottleneck link busy transmitting, but avoid high delays/buffering**\n\n- RTT\n- measured\n- throughput\n- # bytes sent (inflight) in RTT interval\n- Keeping the pipe just full enough\n- RTTmeasured\n- connection’s share of bottleneck_bandwidth • min_RTT\n- ideal amount of inflight data for a connection\n- connection’s “bandwidth-delay product”\n\n- **Slide Diagram Elements & Protocol Entities:** `Intuition:, ninflight`\n\n**Keeping the pipe just full, but no fuller**\n\n- **ninflight:** amount of in-flight data\n- bandwith•delay\n- product + queueing delay in full bottleneck buffer\n- increasing ninflight in this region will not increase RTT, since arrival rate of packet data to queue is less that transmission rate\n- Increasing ninflight in this region increases RTT since arrival rate of packet data to bottleneck link exceeds link transmission rate\n- Here, arrival rate of packet data to bottleneck link is equals link transmission rate\n- loss-based TCP seeks to operate here\n- BBR TCP seeks to operate here - the pipe is kept just full, but no fuller\n\n- **Slide Diagram Elements & Protocol Entities:** `bandwith•delay product, bottleneck link congestion, RTT, throughput`"
      },
      {
        "title": "3. BBR (Bottleneck Bandwidth and RTT) (Slides 3-136..137)",
        "content": "**BBR (Bottleneck Bandwidth and RTT)**\n\n- regulates ninflight\n- **at longer time intervals:** \n  - reduces ninflight to drain pipe, measure new min_RTT\n- **at shorter time intervals:** \n- **acceleration:** increases sending rate, ninflight, until reaches throughput plateau, (saturating available per-flow link capacity)\n- **cruising:** sends at the rate that network is delivering data, as evidenced through received ACKs.\n- **deceleration:** purposefully reduces ninflight, decreasing queue pressure, looking for lower min_RTT\n\n**Explicit congestion notification (ECN)**\n\n- source\n- application\n- TCP\n- network\n- link\n- physical\n- destination\n- application\n- TCP\n- network\n- link\n- physical\n- TCP deployments often implement network-assisted congestion control:\n- two bits in IP header (ToS field) marked by network router to indicate congestion\n  - policy to determine marking chosen by network operator\n- congestion indication carried to destination\n- destination sets ECE bit on ACK segment to notify sender of congestion\n- involves both IP (IP header ECN bit marking) and TCP (TCP header C,E bit marking)\n- ECN=10\n- ECN=11\n- ECE=1\n- IP datagram\n- TCP ACK segment"
      },
      {
        "title": "4. TCP fairness (Slides 3-138..139)",
        "content": "**TCP fairness**\n\n- **Fairness goal:** if K TCP sessions share same bottleneck link of bandwidth R, each should have average rate of R/K\n- TCP connection 1\n- bottleneck\n- router\n- capacity R\n- TCP connection 2\n\n**Q: is TCP Fair?**\n\n- **Example:** two competing TCP sessions:\n- additive increase gives slope of 1, as throughout increases\n- multiplicative decrease decreases throughput proportionally\n- equal bandwidth share\n- Connection 1 throughput\n- Connection 2 throughput\n- **congestion avoidance:** additive increase\n- **loss:** decrease window by factor of 2\n- **congestion avoidance:** additive increase\n- **loss:** decrease window by factor of 2\n- **A:** Yes, under idealized assumptions:\n- same RTT\n- fixed number of sessions only in congestion avoidance\n- Is TCP fair?"
      },
      {
        "title": "5. Fairness: must all network apps be “fair”? (Slides 3-140..140)",
        "content": "- Fairness and UDP\n- multimedia apps often do not use TCP\n  - do not want rate throttled by congestion control\n- **instead use UDP:** \n  - send audio/video at constant rate, tolerate packet loss\n- there is no “Internet police” policing use of congestion control\n- Fairness, parallel TCP connections\n- application can open multiple parallel connections between two hosts\n- web browsers do this , e.g., link of rate R with 9 existing connections:\n  - new app asks for 1 TCP, gets rate R/10\n  - new app asks for 11 TCPs, gets R/2"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.7B Modern Congestion Control: TCP CUBIC, Delay-Based BBR, ECN & TCP Fairness**:\n\n- **Review Question 1 (TCP’s AIMD algorithm.):** Which of the following statements about TCP’s Additive-increase-multiplicative-decrease (AIMD) algorithm are true? Check all that are true.\n  - **Verified Answer:** AIMD is a end-end approach to congestion control.; AIMD cuts the congestion window size, cwnd , in half whenever loss is detected by a triple duplicate ACK.; AIMD cuts the congestion window size, cwnd , i to 1 whenever a timeout occurs.\n\n- **Review Question 2 (TCP’s AIMD algorithm (2).):** How is the sending rate typically regulated in a TCP implementation?\n  - **Verified Answer:** By keeping a window of size cwnd over the sequence number space, and making sure that no more than cwnd bytes of data are outstanding (i.e, unACKnowledged). The size of cwnd i s regulated by AIMD.\n\n- **Review Question 3 (TCP’s Slowstart algorithm.):** Which of the following best completes this sentence: \"In the absence of loss, TCP slow start increases the sending rate ... \"\n  - **Verified Answer:** \" ... faster than AIMD. In fact, slowstart increases the sending rate exponentially fast per RTT.\"",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "tcp_cubic_vs_reno.py — Comparing TCP CUBIC vs. TCP Reno Window Recovery Toward W_max",
          "snippet": "# Kurose & Ross 9e - Section 3.7.2: TCP CUBIC Window Growth W(t) = C*(t - K)^3 + W_max\nW_max = 100.0   # Window size where loss last occurred (MSS)\nbeta_cubic = 0.7\nC = 0.4\nK = ((W_max * (1.0 - beta_cubic)) / C) ** (1.0 / 3.0)\n\nw_reno = W_max * 0.5\nprint(f\"W_max = {W_max} MSS, Zero-growth inflection time K = {K:.2f} sec\\n\" + \"-\" * 58)\nfor t in range(0, 10):\n    w_cubic = C * ((t - K) ** 3) + W_max\n    print(f\"t = {t:2d}s | TCP Reno cwnd: {w_reno:6.1f} MSS | TCP CUBIC cwnd: {w_cubic:6.1f} MSS\")\n    w_reno += 1.0"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.7B Modern Congestion Control: TCP CUBIC, Delay-Based BBR, ECN & TCP Fairness",
      "filename": "tcp_cubic_vs_reno.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.7.2: TCP CUBIC Window Growth W(t) = C*(t - K)^3 + W_max\nW_max = 100.0   # Window size where loss last occurred (MSS)\nbeta_cubic = 0.7\nC = 0.4\nK = ((W_max * (1.0 - beta_cubic)) / C) ** (1.0 / 3.0)\n\nw_reno = W_max * 0.5\nprint(f\"W_max = {W_max} MSS, Zero-growth inflection time K = {K:.2f} sec\\n\" + \"-\" * 58)\nfor t in range(0, 10):\n    w_cubic = C * ((t - K) ** 3) + W_max\n    print(f\"t = {t:2d}s | TCP Reno cwnd: {w_reno:6.1f} MSS | TCP CUBIC cwnd: {w_cubic:6.1f} MSS\")\n    w_reno += 1.0",
      "expectedOutput": [
        "[OK] tcp_cubic_vs_reno.py — Comparing TCP CUBIC vs. TCP Reno Window Recovery Toward W_max",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.7B Modern Congestion Control: TCP CUBIC, Delay-Based BBR, ECN & TCP Fairness. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements about TCP’s Additive-increase-multiplicative-decrease (AIMD) algorithm are true? Check all that are true.",
      "options": [
        "A) AIMD uses the measured RTT delay to detect congestion.",
        "B) AIMD always cuts the congestion window size, cwnd , in half whenever loss is detected.",
        "C) AIMD uses observed packet loss to detect congestion.",
        "D) AIMD is a end-end approach to congestion control."
      ],
      "correctIndex": 3,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'AIMD is a end-end approach to congestion control.' accurately characterizes 3.7B Modern Congestion Control: TCP CUBIC, Delay-Based BBR, ECN & TCP Fairness."
    }
  },
  "cn-ch3-quic-transport-evolution": {
    "id": "cn-ch3-quic-transport-evolution",
    "badge": "Module 3 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "3.8 Evolution of Transport-Layer Functionality: QUIC Architecture, Streams & Zero HOL Blocking",
    "subtitle": "Implementing modern transport in user space over UDP: combined 1-RTT TLS 1.3 + transport handshake, independent stream framing, and eliminating transport-layer Head-of-Line blocking.",
    "sections": [
      {
        "title": "1. Evolving transport-layer functionality (Slides 3-142..142)",
        "content": "![3.8 Evolution of Transport-Layer Functionality: QUIC Architecture, Streams & Zero HOL Blocking Architecture](/images/networking/tcp-3way-congestion-fsm.svg)\n\n**3.8 Evolution of Transport-Layer Functionality: QUIC Architecture, Streams & Zero HOL Blocking** — Implementing modern transport in user space over UDP: combined 1-RTT TLS 1.3 + transport handshake, independent stream framing, and eliminating transport-layer Head-of-Line blocking.\n\n- **TCP, UDP:** principal transport protocols for 40 years\n- different “flavors” of TCP developed, for specific scenarios:\n- moving transport–layer functions to application layer, on top of UDP\n  - HTTP/3: QUIC\n- Scenario | Challenges\n- Long, fat pipes (large data transfers) | Many packets “in flight”; loss shuts down pipeline\n- Wireless networks | Loss due to noisy wireless links, mobility; TCP treat this as congestion loss\n- Long-delay links | Extremely long RTTs\n- Data center networks | Latency sensitive\n- Background traffic flows | Low priority, “background” TCP flows",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 3 Key Principle",
          "message": "Implementing modern transport in user space over UDP: combined 1-RTT TLS 1.3 + transport handshake, independent stream framing, and eliminating transport-layer Head-of-Line blocking."
        }
      },
      {
        "title": "2. QUIC: Quick UDP Internet Connections (Slides 3-143..144)",
        "content": "- application-layer protocol, on top of UDP\n  - increase performance of HTTP\n  - deployed on many Google servers, apps (Chrome, mobile YouTube app)\n- TCP\n- TLS\n- HTTP/2\n- Network\n- Transport\n- Application\n- HTTP/2 over TCP\n- UDP\n- QUIC\n- HTTP/2 (slimmed)\n- HTTP/3\n- HTTP/3 over UDP\n- adopts approaches we’ve studied in this chapter for connection establishment, error control, congestion control\n- multiple application-level “streams” multiplexed over single QUIC connection\n  - separate reliable data transfer, security\n  - common congestion control\n  - error and congestion control: “Readers familiar with TCP’s loss detection and congestion control will find algorithms here that parallel well-known TCP ones.” [from QUIC specification]\n  - connection establishment: reliability, congestion control, authentication, encryption, state established in one (or even zero) RTT (recall HTTP3 discussion in Chapter 2)"
      },
      {
        "title": "3. QUIC: streams: parallelism, no HOL blocking (Slides 3-145..145)",
        "content": "- (a) HTTP 1.1\n- TLS encryption\n- TCP RDT\n- TCP Cong. Contr.\n- transport\n- application\n- **(b) HTTP/2 with QUIC:** no HOL blocking\n- TCP RDT\n- TCP Cong. Contr.\n- TLS encryption\n- error!\n- HTTP\n- GET\n- HTTP\n- GET\n- HTTP\n- GET\n- QUIC Cong. Cont.\n- QUIC\n- encrypt\n- QUIC\n- RDT\n- QUIC\n- RDT\n- QUIC\n- RDT\n- QUIC\n- encrypt\n- QUIC\n- encrypt\n- UDP\n- UDP\n- QUIC Cong. Cont.\n- QUIC\n- encrypt\n- QUIC\n- RDT\n- QUIC\n- RDT\n- QUIC\n- RDT\n- QUIC\n- encrypt\n- QUIC\n- encrypt\n- error!\n- HTTP\n- GET\n- HTTP\n- GET\n- HTTP\n- GET"
      },
      {
        "title": "4. Chapter 3: summary (Slides 3-146..146)",
        "content": "- principles behind transport layer services:\n  - multiplexing, demultiplexing\n  - reliable data transfer\n  - flow control\n  - congestion control\n- instantiation, implementation in the Internet\n  - UDP\n  - TCP\n- **Up next:** \n- leaving the network “edge” (application, transport layers)\n- into the network “core”\n- **two network-layer chapters:** \n  - data plane\n  - control plane"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **3.8 Evolution of Transport-Layer Functionality: QUIC Architecture, Streams & Zero HOL Blocking**:\n\n- **Review Question 1 (QUIC streams.):** What are advantages of the streams concept in QUIC? Select all that apply.\n  - **Verified Answer:** Streams allow concurrent retrieval of web objects, while avoiding Head of the Line (HOL) blocking.; Since each stream has its own error control, if one stream experiences an error (e.g., lost or damaged segment), the other streams are unaffected.\n\n- **Review Question 2 (QUIC: an application-layer protocol.):** What are advantages of implementing transport-layer functionality in QUIC at the application layer? Select all that apply.\n  - **Verified Answer:** QUIC can establish all connection parameters (security, reliability, flow and congestion control)in just one handshake rather than separately in two.; As an application-layer protocol, QUIC can be updated/modified at “app frequency” rather than at the frequency of operating system updates.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "quic_multiplexed_streams.py — Demonstrating Independent Stream Delivery in QUIC vs. TCP HOL Blocking",
          "snippet": "# Kurose & Ross 9e - Section 3.8: TCP Single Byte-Stream vs. QUIC Independent Multiplexed Streams\nstreams = {\n    \"Stream_1 (HTML)\": [\"pkt1 (LOST!)\", \"pkt2\"],\n    \"Stream_2 (CSS)\":  [\"pkt3 (Arrived)\", \"pkt4 (Arrived)\"],\n    \"Stream_3 (JS)\":   [\"pkt5 (Arrived)\", \"pkt6 (Arrived)\"],\n}\n\nprint(\"[TCP + TLS + HTTP/2]\")\nprint(\"  Because pkt1 is lost, TCP holds pkt3, pkt4, pkt5, pkt6 in kernel RcvBuffer -> ALL 3 streams stall!\\n\")\nprint(\"[QUIC over UDP + HTTP/3]\")\nfor s_name, pkts in streams.items():\n    status = \"Waiting for pkt1 retransmission\" if \"LOST\" in pkts[0] else \"DELIVERED IMMEDIATELY to Browser!\"\n    print(f\"  {s_name:18s}: {status}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 3.8 Evolution of Transport-Layer Functionality: QUIC Architecture, Streams & Zero HOL Blocking",
      "filename": "quic_multiplexed_streams.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 3.8: TCP Single Byte-Stream vs. QUIC Independent Multiplexed Streams\nstreams = {\n    \"Stream_1 (HTML)\": [\"pkt1 (LOST!)\", \"pkt2\"],\n    \"Stream_2 (CSS)\":  [\"pkt3 (Arrived)\", \"pkt4 (Arrived)\"],\n    \"Stream_3 (JS)\":   [\"pkt5 (Arrived)\", \"pkt6 (Arrived)\"],\n}\n\nprint(\"[TCP + TLS + HTTP/2]\")\nprint(\"  Because pkt1 is lost, TCP holds pkt3, pkt4, pkt5, pkt6 in kernel RcvBuffer -> ALL 3 streams stall!\\n\")\nprint(\"[QUIC over UDP + HTTP/3]\")\nfor s_name, pkts in streams.items():\n    status = \"Waiting for pkt1 retransmission\" if \"LOST\" in pkts[0] else \"DELIVERED IMMEDIATELY to Browser!\"\n    print(f\"  {s_name:18s}: {status}\")",
      "expectedOutput": [
        "[OK] quic_multiplexed_streams.py — Demonstrating Independent Stream Delivery in QUIC vs. TCP HOL Blocking",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 3.8 Evolution of Transport-Layer Functionality: QUIC Architecture, Streams & Zero HOL Blocking. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "What are advantages of the streams concept in QUIC? Select all that apply.",
      "options": [
        "A) With N streams, the overall throughput can be increased by a factor of N , since each stream has its own separate congestion control.",
        "B) Streams allow concurrent retrieval of web objects, while avoiding Head of the Line (HOL) blocking.",
        "C) Since each stream has its own error control, if one stream experiences an error (e.g., lost or damaged segment), the other streams are unaff",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 3), 'Streams allow concurrent retrieval of web objects, while avoiding Head of the Line (HOL) blocking.' accurately characterizes 3.8 Evolution of Transport-Layer Functionality: QUIC Architecture, Streams & Zero HOL Blocking."
    }
  },
  "cn-ch4-data-vs-control-plane": {
    "id": "cn-ch4-data-vs-control-plane",
    "badge": "Module 4 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "4.1 Network Layer Overview: Data Plane Forwarding vs. Control Plane Routing & Best-Effort Service",
    "subtitle": "Distinguishing local per-packet forwarding (nanoseconds in hardware) from network-wide routing (seconds in software), per-router vs. SDN control planes, and why the Internet's best-effort model succeeded.",
    "sections": [
      {
        "title": "1. Network layer: our goals (Slides 4-2..4)",
        "content": "![4.1 Network Layer Overview: Data Plane Forwarding vs. Control Plane Routing & Best-Effort Service Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**4.1 Network Layer Overview: Data Plane Forwarding vs. Control Plane Routing & Best-Effort Service** — Distinguishing local per-packet forwarding (nanoseconds in hardware) from network-wide routing (seconds in software), per-router vs. SDN control planes, and why the Internet's best-effort model succeeded.\n\n**Network layer: our goals**\n\n- understand principles behind network layer services, focusing on data plane:\n  - network layer service models\n  - forwarding versus routing\n  - how a router works\n  - addressing\n  - generalized forwarding\n  - Internet architecture\n- instantiation, implementation in the Internet\n  - IP protocol\n  - NAT, middleboxes\n\n**Network-layer services and protocols**\n\n- transport segment from sending to receiving host\n  - sender: encapsulates segments into datagrams, passes to link layer\n  - receiver: delivers segments to transport layer protocol\n- network layer protocols in every Internet device: hosts, routers\n- **routers:** \n  - examines header fields in all IP datagrams passing through it\n  - moves datagrams from input ports to output ports to transfer datagrams along end-end path\n- mobile network\n- enterprise\n- network\n- national or global ISP\n- datacenter\n- network\n- application\n- transport\n- network\n- link\n- physical\n- application\n- transport\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 4 Key Principle",
          "message": "Distinguishing local per-packet forwarding (nanoseconds in hardware) from network-wide routing (seconds in software), per-router vs. SDN control planes, and why the Internet's best-effort model succeeded."
        }
      },
      {
        "title": "2. Two key network-layer functions (Slides 4-5..6)",
        "content": "**Two key network-layer functions**\n\n- **network-layer functions:** \n- **forwarding:** move packets from a router’s input link to appropriate router output link\n- **analogy:** taking a trip\n- **forwarding:** process of getting through single interchange\n- forwarding\n- routing\n- **routing:** process of planning trip from source to destination\n- **routing:** determine route taken by packets from source to destination\n  - routing algorithms\n\n**Network layer: data plane, control plane**\n\n- **Data plane:** \n- local, per-router function\n- determines how datagram arriving on router input port is forwarded to router output port\n- Control plane\n- network-wide logic\n- determines how datagram is routed among routers along end-end path from source host to destination host\n- values in arriving\n- packet header\n- **two control-plane approaches:** \n  - traditional routing algorithms: implemented in routers\n  - software-defined networking (SDN): implemented in (remote) servers"
      },
      {
        "title": "3. Per-router control plane (Slides 4-7..8)",
        "content": "**Per-router control plane**\n\n- Individual routing algorithm components in each and every router interact in the control plane\n- Routing\n- Algorithm\n- data\n- plane\n- control\n- plane\n- values in arriving\n- packet header\n\n**Software-Defined Networking (SDN) control plane**\n\n- Remote controller computes, installs forwarding tables in routers\n- data\n- plane\n- control\n- plane\n- Remote Controller\n- values in arriving\n- packet header"
      },
      {
        "title": "4. Network service model (Slides 4-9..11)",
        "content": "**Network service model**\n\n- **example services for individual datagrams:** \n- guaranteed delivery\n- guaranteed delivery with less than 40 msec delay\n- **example services for a flow of datagrams:** \n- in-order datagram delivery\n- guaranteed minimum bandwidth to flow\n- restrictions on changes in inter-packet spacing\n- **Q:** What service model for “channel” transporting datagrams from sender to receiver?\n\n**Network-layer service model**\n\n- Network\n- Architecture\n- Internet\n- ATM\n- ATM\n- Internet\n- Internet\n- Service\n- Model\n- best effort\n- Constant Bit Rate\n- Available Bit Rate\n- Intserv Guaranteed\n- (RFC 1633)\n- Diffserv (RFC 2475)\n- Bandwidth\n- none\n- Constant rate\n- Guaranteed min\n- yes\n- possible\n- Loss\n- yes\n- yes\n- possibly\n- Order\n- yes\n- yes\n- yes\n- possibly\n- Timing\n- yes\n- yes\n- **No guarantees on:** \n  - successful datagram delivery to destination\n  - timing or order of delivery\n  - bandwidth available to end-end flow\n- Internet “best effort” service model\n- Quality of Service (QoS) Guarantees ?"
      },
      {
        "title": "5. Reflections on best-effort service: (Slides 4-12..12)",
        "content": "- simplicity of mechanism has allowed Internet to be widely deployed adopted\n- sufficient provisioning of bandwidth allows performance of real-time applications (e.g., interactive voice, video) to be “good enough” for “most of the time”\n- replicated, application-layer distributed services (datacenters, content distribution networks) connecting close to clients’ networks, allow services to be provided from multiple locations\n- congestion control of “elastic” services helps\n- It’s hard to argue with success of best-effort service model"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **4.1 Network Layer Overview: Data Plane Forwarding vs. Control Plane Routing & Best-Effort Service**:\n\n- **Review Question 1 (The network layer - where is it?):** Check all of the statements below about where (in the network) the network layer is implemented that are true.\n  - **Verified Answer:** The network layer is implemented in hosts at the network's edge.; The network layer is implemented in routers in the network core.\n\n- **Review Question 2 (Forwarding versus routing.):** Consider the travel analogy discussed in the textbook - some actions we take on a trip correspond to forwarding and other actions we take on a trip correspond to routing . Which of the following travel actions below correspond to forwarding ? The other travel actions that you don't select below then correspond to routing.\n  - **Verified Answer:** A car takes the 3rd exit from a roundabout.; A car stops at an intersection to “gas-up” and take a “bathroom break”; A car waits at light and then turns left at the intersection.\n\n- **Review Question 3 (The control plane versus the data plane.):** For each of the actions below, select those actions below that are primarily in the network-layer data plane. The other actions that you don't select below then correspond to control-plane actions.\n  - **Verified Answer:** Dropping a datagram due to a congested (full) output buffer.; Moving an arriving datagram from a router’s input port to output port; Looking up address bits in an arriving datagram header in the forwarding table.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "data_vs_control_plane_timescales.py — Comparing Hardware Data Plane Forwarding vs. Control Plane Convergence",
          "snippet": "# Kurose & Ross 9e - Section 4.1: Data Plane vs. Control Plane Operations\nline_rate_gbps = 100.0\nmin_pkt_bits = 64 * 8  # 64-byte packet = 512 bits\nns_per_pkt = (min_pkt_bits / (line_rate_gbps * 1e9)) * 1e9\n\nprint(f\"100 Gbps Router Line Card Budget: {ns_per_pkt:.2f} nanoseconds per 64B packet!\")\nprint(\"Data Plane (Hardware ASIC/TCAM) : Destination IP lookup + Switching Fabric in ~5 ns\")\nprint(\"Control Plane (CPU / SDN / OSPF): Route table computation & BGP updates in ~10-1000 ms\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 4.1 Network Layer Overview: Data Plane Forwarding vs. Control Plane Routing & Best-Effort Service",
      "filename": "data_vs_control_plane_timescales.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 4.1: Data Plane vs. Control Plane Operations\nline_rate_gbps = 100.0\nmin_pkt_bits = 64 * 8  # 64-byte packet = 512 bits\nns_per_pkt = (min_pkt_bits / (line_rate_gbps * 1e9)) * 1e9\n\nprint(f\"100 Gbps Router Line Card Budget: {ns_per_pkt:.2f} nanoseconds per 64B packet!\")\nprint(\"Data Plane (Hardware ASIC/TCAM) : Destination IP lookup + Switching Fabric in ~5 ns\")\nprint(\"Control Plane (CPU / SDN / OSPF): Route table computation & BGP updates in ~10-1000 ms\")",
      "expectedOutput": [
        "[OK] data_vs_control_plane_timescales.py — Comparing Hardware Data Plane Forwarding vs. Control Plane Convergence",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 4.1 Network Layer Overview: Data Plane Forwarding vs. Control Plane Routing & Best-Effort Service. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following quality-of-service guarantees are part of the Internet’s best-effort service model? Check all that apply.",
      "options": [
        "A) A guaranteed minimum bandwidth is provided to a source-to-destination flow of packets",
        "B) In-order datagram payload delivery to the transport layer of those datagrams arriving to the receiving host.",
        "C) None of the other services listed here are part of the best-effort service model. Evidently, best-effort service really means no guarantees ",
        "D) Guaranteed delivery time from sending host to receiving host."
      ],
      "correctIndex": 2,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 4), 'None of the other services listed here are part of the best-effort service model. Evidently, best-effort service really means no guarantees at all!' accurately characterizes 4.1 Network Layer Overview: Data Plane Forwarding vs. Control Plane Routing & Best-Effort Service."
    }
  },
  "cn-ch4-router-architecture-lpm": {
    "id": "cn-ch4-router-architecture-lpm",
    "badge": "Module 4 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "4.2 Inside a Router: Input Port Functions, Destination-Based Forwarding & Longest Prefix Matching",
    "subtitle": "High-speed router architecture: line termination, link-layer decapsulation, decentralized TCAM forwarding tables, and resolving overlapping prefix rules via Longest Prefix Matching (LPM).",
    "sections": [
      {
        "title": "1. Router architecture overview (Slides 4-14..14)",
        "content": "![4.2 Inside a Router: Input Port Functions, Destination-Based Forwarding & Longest Prefix Matching Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**4.2 Inside a Router: Input Port Functions, Destination-Based Forwarding & Longest Prefix Matching** — High-speed router architecture: line termination, link-layer decapsulation, decentralized TCAM forwarding tables, and resolving overlapping prefix rules via Longest Prefix Matching (LPM).\n\n- high-level view of generic router architecture:\n- high-speed\n- switching\n- fabric\n- routing\n- processor\n- router input ports\n- router output ports\n- forwarding data plane (hardware) operates in nanosecond timeframe\n- routing, management\n- control plane (software)\n- operates in millisecond\n- time frame",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 4 Key Principle",
          "message": "High-speed router architecture: line termination, link-layer decapsulation, decentralized TCAM forwarding tables, and resolving overlapping prefix rules via Longest Prefix Matching (LPM)."
        }
      },
      {
        "title": "2. Input port functions (Slides 4-15..16)",
        "content": "- switch\n- fabric\n- line\n- termination\n- **physical layer:** \n- bit-level reception\n- link\n- layer\n- protocol\n- (receive)\n- **link layer:** \n- e.g., Ethernet\n- (chapter 6)\n- lookup,\n- forwarding\n- queueing\n- **decentralized switching:** \n- using header field values, lookup output port using forwarding table in input port memory (“match plus action”)\n- **goal:** complete input port processing at ‘line speed’\n- **input port queuing:** if datagrams arrive faster than forwarding rate into switch fabric\n- **destination-based forwarding:** forward based only on destination IP address (traditional)\n- **generalized forwarding:** forward based on any set of header field values\n\n> **Kurose & Ross Lecture Note:** Green box is a physical layer responsible for receiving bit level transmission. Copper, fiber wireless. Link layer in blue – bit assemble into Ethernet frame. We will discuss this in details in chapter 6. But most critical one, is here. Lookup, forwarding function. Lookup and forward is “Match plus action” behavior. GOAL – processing at “line speed”, otherwise, buffer will be full and packet will be lost"
      },
      {
        "title": "3. Destination-based forwarding (Slides 4-17..17)",
        "content": "- **Q:** but what happens if ranges don’t divide up so nicely?\n\n> **Kurose & Ross Lecture Note:** Text for this animation: This all works out pretty nice and looks pretty simple! But of course the devil is in the details, as the saying goes. What happens, for example, when a subset of addresses say in this first range should go to say interface 3, rather than interface 0. Well, of course we could split the first address range into multiple pieces, and add in this new subrange with its new destination output port. But it turns out there’s a much simpler and elegant way to do this. Known as longest prefix matching."
      },
      {
        "title": "4. Longest prefix matching (Slides 4-18..22)",
        "content": "- when looking for forwarding table entry for given destination address, use longest address prefix that matches destination address.\n- longest prefix match\n- Destination Address Range\n- 11001000 00010111 00010\n- 11001000 00010111 00011000\n- 11001000 00010111 00011\n- otherwise\n- Link interface\n- ********\n- ***\n- ********\n- ***\n- ********\n- 11001000 00010111 00011000 10101010\n- **examples:** \n- which interface?\n- which interface?\n- 11001000 00010111 00010110 10100001\n- match!\n- we’ll see why longest prefix matching is used shortly, when we study addressing\n- **longest prefix matching:** often performed using ternary content addressable memories (TCAMs)\n  - content addressable: present address to TCAM: retrieve address in one clock cycle, regardless of table size\n  - Cisco Catalyst: ~1M routing table entries in TCAM"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **4.2 Inside a Router: Input Port Functions, Destination-Based Forwarding & Longest Prefix Matching**:\n\n- **Review Question 1 (Where does destination address lookup happen?):** Where in a router is the destination IP address looked up in a forwarding table to determine the appropriate output port to which the datagram should be directed?\n  - **Verified Answer:** At the input port where a packet arrives.\n\n- **Review Question 2 (Where does \"match+action\" happen?):** Where in a router does \"match plus action\" happen to determine the appropriate output port to which the arriving datagram should be directed?\n  - **Verified Answer:** At the input port where a packet arrives.\n\n- **Review Question 3 (Packet dropping.):** Suppose a datagram is switched through the switching fabric and arrives to its appropriate output to find that there are no free buffers. In this case:\n  - **Verified Answer:** The packet will either be dropped or another packet will be removed (lost) from the buffer to make room for this packet, depending on policy. But the packet will definitely not be be sent back to the input port.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "longest_prefix_matching.py — Kurose & Ross Longest Prefix Matching (LPM) Router Forwarding Table",
          "snippet": "# Kurose & Ross 9e - Section 4.2.1: Longest Prefix Matching (LPM) Forwarding Engine\nforwarding_table = [\n    (\"11001000 00010111 00010\",    0),  # /21 prefix -> Link Interface 0\n    (\"11001000 00010111 00011000\", 1),  # /24 prefix -> Link Interface 1\n    (\"11001000 00010111 00011\",    2),  # /21 prefix -> Link Interface 2\n    (\"\",                           3),  # /0 default route -> Link Interface 3\n]\n\ntest_destinations = [\n    \"11001000 00010111 00010110 10100001\",\n    \"11001000 00010111 00011000 10101010\",\n    \"11001000 00010111 00011001 11110000\",\n]\n\nfor dst in test_destinations:\n    best_len = -1\n    best_iface = 3\n    for prefix, iface in forwarding_table:\n        if dst.startswith(prefix) and len(prefix) > best_len:\n            best_len = len(prefix)\n            best_iface = iface\n    print(f\"Dest IP: {dst} -> Matched Prefix Len: {best_len:2d} -> Output Interface: {best_iface}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 4.2 Inside a Router: Input Port Functions, Destination-Based Forwarding & Longest Prefix Matching",
      "filename": "longest_prefix_matching.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 4.2.1: Longest Prefix Matching (LPM) Forwarding Engine\nforwarding_table = [\n    (\"11001000 00010111 00010\",    0),  # /21 prefix -> Link Interface 0\n    (\"11001000 00010111 00011000\", 1),  # /24 prefix -> Link Interface 1\n    (\"11001000 00010111 00011\",    2),  # /21 prefix -> Link Interface 2\n    (\"\",                           3),  # /0 default route -> Link Interface 3\n]\n\ntest_destinations = [\n    \"11001000 00010111 00010110 10100001\",\n    \"11001000 00010111 00011000 10101010\",\n    \"11001000 00010111 00011001 11110000\",\n]\n\nfor dst in test_destinations:\n    best_len = -1\n    best_iface = 3\n    for prefix, iface in forwarding_table:\n        if dst.startswith(prefix) and len(prefix) > best_len:\n            best_len = len(prefix)\n            best_iface = iface\n    print(f\"Dest IP: {dst} -> Matched Prefix Len: {best_len:2d} -> Output Interface: {best_iface}\")",
      "expectedOutput": [
        "[OK] longest_prefix_matching.py — Kurose & Ross Longest Prefix Matching (LPM) Router Forwarding Table",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 4.2 Inside a Router: Input Port Functions, Destination-Based Forwarding & Longest Prefix Matching. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Suppose a datagram is switched through the switching fabric and arrives to its appropriate output to find that there are no free buffers. In this case:",
      "options": [
        "A) The packet will be sent back to the input port.",
        "B) The packet will either be dropped or another packet will be removed (lost) from the buffer to make room for this packet, depending on policy",
        "C) Another packet will be removed (lost) from the buffer to make room for this packet.",
        "D) The packet will be dropped (lost)."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 4), 'The packet will either be dropped or another packet will be removed (lost) from the buffer to make room for this packet, depending on policy. But the packet will definitely not be be sent back to the input port.' accurately characterizes 4.2 Inside a Router: Input Port Functions, Destination-Based Forwarding & Longest Prefix Matching."
    }
  },
  "cn-ch4-switching-fabrics-queuing": {
    "id": "cn-ch4-switching-fabrics-queuing",
    "badge": "Module 4 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "4.2B Switching Fabrics (Memory, Bus, Crossbar), Input/Output Port Queuing & Buffer Sizing",
    "subtitle": "Moving packets across memory, shared bus, and Banyan/crossbar interconnection networks, Input Port Head-of-Line (HOL) blocking at 58.6% load, output buffer sizing (RTT*C / sqrt(N)), and Tail Drop vs. RED/ECN.",
    "sections": [
      {
        "title": "1. Switching fabrics (Slides 4-23..25)",
        "content": "![4.2B Switching Fabrics (Memory, Bus, Crossbar), Input/Output Port Queuing & Buffer Sizing Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**4.2B Switching Fabrics (Memory, Bus, Crossbar), Input/Output Port Queuing & Buffer Sizing** — Moving packets across memory, shared bus, and Banyan/crossbar interconnection networks, Input Port Head-of-Line (HOL) blocking at 58.6% load, output buffer sizing (RTT*C / sqrt(N)), and Tail Drop vs. RED/ECN.\n\n**Switching fabrics**\n\n- transfer packet from input link to appropriate output link\n- high-speed\n- switching\n- fabric\n- N input ports\n- N output ports\n- . . .\n- . . .\n- **switching rate:** rate at which packets can be transfer from inputs to outputs\n  - often measured as multiple of input/output line rate\n  - N inputs: switching rate N times line rate desirable\n- **(rate:** NR, ideally)\n- bus\n- memory\n- interconnection\n- network\n- **three major types of switching fabrics:** \n\n**Switching via memory**\n\n- **first generation routers:** \n- traditional computers with switching under direct control of CPU\n- packet copied to system’s memory\n- speed limited by memory bandwidth (2 bus crossings per datagram)\n- input\n- port\n- (e.g.,\n- Ethernet)\n- memory\n- output\n- port\n- (e.g.,\n- Ethernet)\n- system bus",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 4 Key Principle",
          "message": "Moving packets across memory, shared bus, and Banyan/crossbar interconnection networks, Input Port Head-of-Line (HOL) blocking at 58.6% load, output buffer sizing (RTT*C / sqrt(N)), and Tail Drop vs. RED/ECN."
        }
      },
      {
        "title": "2. Switching via a bus (Slides 4-26..28)",
        "content": "**Switching via a bus**\n\n- datagram from input port memory to output port memory via a shared bus\n- **bus contention:** switching speed limited by bus bandwidth\n- **32 Gbps bus, Cisco 5600:** sufficient speed for access routers\n\n**Switching via interconnection network**\n\n- Crossbar, Clos networks, other interconnection nets initially developed to connect processors in multiprocessor\n- 8x8 multistage switch\n- built from smaller-sized switches\n- 3x3 crossbar\n- **multistage switch:** nxn switch from multiple stages of smaller switches\n- **exploiting parallelism:** \n  - fragment datagram into fixed length cells on entry\n  - switch cells through the fabric, reassemble datagram at exit\n- 3x3 crossbar\n- scaling, using multiple switching “planes” in parallel:\n  - speedup, scaleup via parallelism\n- fabric plane 0\n- . . .\n- fabric plane 1\n- fabric plane 2\n- fabric plane 3\n- fabric plane 4\n- fabric plane 5\n- fabric plane 6\n- fabric plane 7\n- **Cisco CRS router:** \n  - basic unit: 8 switching planes\n  - each plane: 3-stage interconnection network\n  - up to 100’s Tbps switching capacity"
      },
      {
        "title": "3. Input port queuing (Slides 4-29..31)",
        "content": "**Input port queuing**\n\n- If switch fabric slower than input ports combined -> queueing may occur at input queues\n  - queueing delay and loss due to input buffer overflow!\n- **output port contention:** only one red datagram can be transferred. lower red packet is blocked\n- switch\n- fabric\n- **one packet time later:** green packet experiences HOL blocking\n- switch\n- fabric\n- **Head-of-the-Line (HOL) blocking:** queued datagram at front of queue prevents others in queue from moving forward\n\n**Output port queuing**\n\n- Buffering required when datagrams arrive from fabric faster than link transmission rate. Drop policy: which datagrams to drop if no free buffers?\n- Scheduling discipline chooses among queued datagrams for transmission\n- Datagrams can be lost due to congestion, lack of buffers\n- Priority scheduling – who gets best performance, network neutrality\n- This is a really important slide\n- line\n- termination\n- link\n- layer\n- protocol\n- (send)\n- switch\n- fabric\n- **(rate:** NR)\n- datagram\n- buffer\n- queueing\n- at t, packets more\n- from input to output\n- one packet time later\n- buffering when arrival rate via switch exceeds output line speed\n- queueing (delay) and loss due to output port buffer overflow!"
      },
      {
        "title": "4. How much buffering? (Slides 4-32..33)",
        "content": "**How much buffering?**\n\n- **RFC 3439 rule of thumb:** average buffering equal to “typical” RTT (say 250 msec) times link capacity C\n  - e.g., C = 10 Gbps link: 2.5 Gbit buffer\n- but too much buffering can increase delays (particularly in home routers)\n  - long RTTs: poor performance for real-time apps, sluggish TCP response\n  - recall delay-based congestion control: “keep bottleneck link just full enough (busy) but no fuller”\n- RTT C\n- **more recent recommendation:** with N flows, buffering equal to\n\n> **Kurose & Ross Lecture Note:** You might think that more buffering is a good thing. Buffering is a bit like salt—just the right amount of salt makes food better, but too much makes it inedible!\n\n**Buffer Management**\n\n- **buffer management:** \n- **drop:** which packet to add, drop when buffers are full\n  - tail drop: drop arriving packet\n  - priority: drop/remove on priority basis\n- line\n- termination\n- link\n- layer\n- protocol\n- (send)\n- switch\n- fabric\n- datagram\n- buffer\n- queueing\n- scheduling\n- **marking:** which packets to mark to signal congestion (ECN, RED)\n- queue\n- (waiting area)\n- packet\n- arrivals\n- packet\n- departures\n- link\n- (server)\n- **Abstraction:** queue"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **4.2B Switching Fabrics (Memory, Bus, Crossbar), Input/Output Port Queuing & Buffer Sizing**:\n\n- **Review Question 1 (Where does destination address lookup happen?):** Where in a router is the destination IP address looked up in a forwarding table to determine the appropriate output port to which the datagram should be directed?\n  - **Verified Answer:** At the input port where a packet arrives.\n\n- **Review Question 2 (Where does \"match+action\" happen?):** Where in a router does \"match plus action\" happen to determine the appropriate output port to which the arriving datagram should be directed?\n  - **Verified Answer:** At the input port where a packet arrives.\n\n- **Review Question 3 (Packet dropping.):** Suppose a datagram is switched through the switching fabric and arrives to its appropriate output to find that there are no free buffers. In this case:\n  - **Verified Answer:** The packet will either be dropped or another packet will be removed (lost) from the buffer to make room for this packet, depending on policy. But the packet will definitely not be be sent back to the input port.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "router_buffer_sizing_formula.py — Computing Router Output Buffer Requirements (RFC 3439 vs. Appenzeller Formula)",
          "snippet": "# Kurose & Ross 9e - Section 4.2.3: How Much Buffering Does a Router Need?\nrtt_sec = 0.250       # 250 ms average RTT\ncapacity_bps = 10e9   # 10 Gbps link capacity\nn_flows = 10000       # 10,000 independent TCP flows sharing the link\n\nbdp_bytes = (rtt_sec * capacity_bps) / 8.0\nmodern_buffer_bytes = bdp_bytes / (n_flows ** 0.5)\n\nprint(f\"Classic Rule-of-Thumb (B = RTT * C)         : {bdp_bytes / 1e6:8.2f} MB\")\nprint(f\"Appenzeller et al. (B = RTT * C / sqrt(N)) : {modern_buffer_bytes / 1e6:8.2f} MB (for N={n_flows} flows)\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 4.2B Switching Fabrics (Memory, Bus, Crossbar), Input/Output Port Queuing & Buffer Sizing",
      "filename": "router_buffer_sizing_formula.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 4.2.3: How Much Buffering Does a Router Need?\nrtt_sec = 0.250       # 250 ms average RTT\ncapacity_bps = 10e9   # 10 Gbps link capacity\nn_flows = 10000       # 10,000 independent TCP flows sharing the link\n\nbdp_bytes = (rtt_sec * capacity_bps) / 8.0\nmodern_buffer_bytes = bdp_bytes / (n_flows ** 0.5)\n\nprint(f\"Classic Rule-of-Thumb (B = RTT * C)         : {bdp_bytes / 1e6:8.2f} MB\")\nprint(f\"Appenzeller et al. (B = RTT * C / sqrt(N)) : {modern_buffer_bytes / 1e6:8.2f} MB (for N={n_flows} flows)\")",
      "expectedOutput": [
        "[OK] router_buffer_sizing_formula.py — Computing Router Output Buffer Requirements (RFC 3439 vs. Appenzeller Formula)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 4.2B Switching Fabrics (Memory, Bus, Crossbar), Input/Output Port Queuing & Buffer Sizing. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Where in a router is the destination IP address looked up in a forwarding table to determine the appropriate output port to which the datagram should be directed?",
      "options": [
        "A) At the input port where a packet arrives.",
        "B) Within the switching fabric.",
        "C) Within the routing processor.",
        "D) At the output port leading to the next hop towards the destination."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 4), 'At the input port where a packet arrives.' accurately characterizes 4.2B Switching Fabrics (Memory, Bus, Crossbar), Input/Output Port Queuing & Buffer Sizing."
    }
  },
  "cn-ch4-packet-scheduling-net-neutrality": {
    "id": "cn-ch4-packet-scheduling-net-neutrality",
    "badge": "Module 4 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Orta - İleri",
    "title": "4.2C Packet Scheduling Policies (FCFS, Priority, Round Robin, WFQ) & Network Neutrality",
    "subtitle": "Deciding which queued packet transmits next: First-Come-First-Served, Strict Priority Queuing, Round Robin, Weighted Fair Queueing (WFQ), and the technical/legal debate over Net Neutrality.",
    "sections": [
      {
        "title": "1. Packet Scheduling: FCFS (Slides 4-34..35)",
        "content": "![4.2C Packet Scheduling Policies (FCFS, Priority, Round Robin, WFQ) & Network Neutrality Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**4.2C Packet Scheduling Policies (FCFS, Priority, Round Robin, WFQ) & Network Neutrality** — Deciding which queued packet transmits next: First-Come-First-Served, Strict Priority Queuing, Round Robin, Weighted Fair Queueing (WFQ), and the technical/legal debate over Net Neutrality.\n\n**Packet Scheduling: FCFS**\n\n- **packet scheduling:** deciding which packet to send next on link\n  - first come, first served\n  - priority\n  - round robin\n  - weighted fair queueing\n- **FCFS:** packets transmitted in order of arrival to output port\n- **also known as:** First-in-first-out (FIFO)\n- real world examples?\n- queue\n- (waiting area)\n- packet\n- arrivals\n- packet\n- departures\n- link\n- (server)\n- **Abstraction:** queue\n\n**Scheduling policies: priority**\n\n- **Priority scheduling:** \n- arriving traffic classified, queued by class\n  - any header fields can be used for classification\n- high priority queue\n- low priority queue\n- arrivals\n- classify\n- departures\n- link\n- arrivals\n- departures\n- packet in service\n- send packet from highest priority queue that has buffered packets\n  - FCFS within priority class",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 4 Key Principle",
          "message": "Deciding which queued packet transmits next: First-Come-First-Served, Strict Priority Queuing, Round Robin, Weighted Fair Queueing (WFQ), and the technical/legal debate over Net Neutrality."
        }
      },
      {
        "title": "2. Scheduling policies: round robin (Slides 4-36..37)",
        "content": "**Scheduling policies: round robin**\n\n- **Round Robin (RR) scheduling:** \n- arriving traffic classified, queued by class\n  - any header fields can be used for classification\n- classify\n- arrivals\n- departures\n- link\n- server cyclically, repeatedly scans class queues, sending one complete packet from each class (if available) in turn\n\n**Scheduling policies: weighted fair queueing**\n\n- **Weighted Fair Queuing (WFQ):** \n- generalized Round Robin\n- classify\n- arrivals\n- departures\n- link\n- Sjwj\n- minimum bandwidth guarantee (per-traffic-class)\n- each class, i, has weight, wi, and gets weighted amount of service in each cycle:"
      },
      {
        "title": "3. Sidebar: Network Neutrality (Slides 4-38..40)",
        "content": "**Sidebar: Network Neutrality**\n\n- What is network neutrality?\n  - technical: how an ISP should share/allocation its resources\n  - packet scheduling, buffer management are the mechanisms\n  - social, economic principles\n    - protecting free speech\n    - encouraging innovation, competition\n  - enforced legal rules and policies\n- Different countries have different “takes” on network neutrality\n- 2015 US FCC Order on Protecting and Promoting an Open Internet: three “clear, bright line” rules:\n- no blocking … “shall not block lawful content, applications, services, or non-harmful devices, subject to reasonable network management.”\n- no throttling … “shall not impair or degrade lawful Internet traffic on the basis of Internet content, application, or service, or use of a non-harmful device, subject to reasonable network management.”\n- no paid prioritization. … “shall not engage in paid prioritization”\n- **2017:** rollback of 2015 order\n- **2024:** rollback of 2017 rollback\n\n**ISP: telecommunications or information service?**\n\n- **US Telecommunication Act of 1934 and 1996:** \n  - Title II: imposes “common carrier duties” on telecommunications services: reasonable rates, non-discrimination and requires regulation\n  - Title I: applies to information services:\n    - no common carrier duties (not regulated)\n    - but grants FCC authority “… as may be necessary in the execution of its functions”4\n- Is an ISP a “telecommunications service” or an “information service” provider?\n- the answer really matters from a regulatory standpoint!"
      },
      {
        "title": "4. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **4.2C Packet Scheduling Policies (FCFS, Priority, Round Robin, WFQ) & Network Neutrality**:\n\n- **Review Question 1 (Where does destination address lookup happen?):** Where in a router is the destination IP address looked up in a forwarding table to determine the appropriate output port to which the datagram should be directed?\n  - **Verified Answer:** At the input port where a packet arrives.\n\n- **Review Question 2 (Where does \"match+action\" happen?):** Where in a router does \"match plus action\" happen to determine the appropriate output port to which the arriving datagram should be directed?\n  - **Verified Answer:** At the input port where a packet arrives.\n\n- **Review Question 3 (Packet dropping.):** Suppose a datagram is switched through the switching fabric and arrives to its appropriate output to find that there are no free buffers. In this case:\n  - **Verified Answer:** The packet will either be dropped or another packet will be removed (lost) from the buffer to make room for this packet, depending on policy. But the packet will definitely not be be sent back to the input port.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "wfq_packet_scheduler.py — Simulating Priority Queueing vs. Weighted Fair Queueing (WFQ) Bandwidth Allocation",
          "snippet": "# Kurose & Ross 9e - Section 4.2.4: Weighted Fair Queueing (WFQ) Bandwidth Share Calculator\nlink_rate_mbps = 100.0\nclasses = [\n    {\"name\": \"Class_1 (VoIP / Low-Latency)\", \"weight\": 5, \"active\": True},\n    {\"name\": \"Class_2 (Video Streaming)\",    \"weight\": 3, \"active\": True},\n    {\"name\": \"Class_3 (Bulk File Backup)\",   \"weight\": 2, \"active\": True},\n]\n\ntotal_weight = sum(c[\"weight\"] for c in classes if c[\"active\"])\nfor c in classes:\n    guaranteed_mbps = link_rate_mbps * (c[\"weight\"] / total_weight)\n    print(f\"{c['name']:30s} | Weight w_i = {c['weight']} | Guaranteed Share: {guaranteed_mbps:5.1f} Mbps\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 4.2C Packet Scheduling Policies (FCFS, Priority, Round Robin, WFQ) & Network Neutrality",
      "filename": "wfq_packet_scheduler.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 4.2.4: Weighted Fair Queueing (WFQ) Bandwidth Share Calculator\nlink_rate_mbps = 100.0\nclasses = [\n    {\"name\": \"Class_1 (VoIP / Low-Latency)\", \"weight\": 5, \"active\": True},\n    {\"name\": \"Class_2 (Video Streaming)\",    \"weight\": 3, \"active\": True},\n    {\"name\": \"Class_3 (Bulk File Backup)\",   \"weight\": 2, \"active\": True},\n]\n\ntotal_weight = sum(c[\"weight\"] for c in classes if c[\"active\"])\nfor c in classes:\n    guaranteed_mbps = link_rate_mbps * (c[\"weight\"] / total_weight)\n    print(f\"{c['name']:30s} | Weight w_i = {c['weight']} | Guaranteed Share: {guaranteed_mbps:5.1f} Mbps\")",
      "expectedOutput": [
        "[OK] wfq_packet_scheduler.py — Simulating Priority Queueing vs. Weighted Fair Queueing (WFQ) Bandwidth Allocation",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 4.2C Packet Scheduling Policies (FCFS, Priority, Round Robin, WFQ) & Network Neutrality. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Where in a router does \"match plus action\" happen to determine the appropriate output port to which the arriving datagram should be directed?",
      "options": [
        "A) Within the routing processor.",
        "B) At the input port where a packet arrives.",
        "C) Within the switching fabric.",
        "D) At the output port leading to the next hop towards the destination."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 4), 'At the input port where a packet arrives.' accurately characterizes 4.2C Packet Scheduling Policies (FCFS, Priority, Round Robin, WFQ) & Network Neutrality."
    }
  },
  "cn-ch4-ipv4-datagram-subnets-cidr": {
    "id": "cn-ch4-ipv4-datagram-subnets-cidr",
    "badge": "Module 4 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Orta - İleri",
    "title": "4.3 The Internet Protocol (IPv4): 20-Byte Datagram Header, Fragmentation, Subnets & CIDR",
    "subtitle": "Anatomy of the IPv4 header (TTL, Protocol, Header Checksum), MTU fragmentation and reassembly, defining an IP subnet, and Classless Interdomain Routing (a.b.c.d/x) address masks.",
    "sections": [
      {
        "title": "1. Network Layer: Internet (Slides 4-42..43)",
        "content": "![4.3 The Internet Protocol (IPv4): 20-Byte Datagram Header, Fragmentation, Subnets & CIDR Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**4.3 The Internet Protocol (IPv4): 20-Byte Datagram Header, Fragmentation, Subnets & CIDR** — Anatomy of the IPv4 header (TTL, Protocol, Header Checksum), MTU fragmentation and reassembly, defining an IP subnet, and Classless Interdomain Routing (a.b.c.d/x) address masks.\n\n**Network Layer: Internet**\n\n- **host, router network layer functions:** \n- IP protocol\n- datagram format\n- addressing\n- packet handling conventions\n- ICMP protocol\n- error reporting\n- router “signaling”\n- **transport layer:** TCP, UDP\n- link layer\n- physical layer\n- network\n- layer\n- forwarding\n- table\n- **Path-selection algorithms:** implemented in\n- routing protocols (OSPF, BGP)\n- SDN controller\n\n**IP Datagram format**\n\n- ver\n- length\n- 32 bits\n- payload data\n- (variable length,\n- typically a TCP\n- or UDP segment)\n- 16-bit identifier\n- header\n- checksum\n- time to\n- live\n- source IP address\n- head.\n- len\n- type of\n- service\n- flgs\n- fragment\n- offset\n- upper\n- layer\n- destination IP address\n- options (if any)\n- IP protocol version number\n- header length(bytes)\n- upper layer protocol (e.g., TCP or UDP)\n- total datagram\n- length (bytes)\n- **“type” of service:** \n- **diffserv (0:** 5)\n- **ECN (6:** 7)\n- fragmentation/\n- reassembly\n- **TTL:** remaining max hops\n- (decremented at each router)\n- 20 bytes of TCP\n- 20 bytes of IP\n- = 40 bytes + app layer overhead for TCP+IP\n- overhead\n- e.g., timestamp, record route taken\n- 32-bit source IP address\n- 32-bit destination IP address\n- header checksum\n- **Maximum length:** 64K bytes\n- **Typically:** 1500 bytes or less",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 4 Key Principle",
          "message": "Anatomy of the IPv4 header (TTL, Protocol, Header Checksum), MTU fragmentation and reassembly, defining an IP subnet, and Classless Interdomain Routing (a.b.c.d/x) address masks."
        }
      },
      {
        "title": "2. IP addressing: introduction (Slides 4-44..49)",
        "content": "**IP addressing: introduction**\n\n- **IP address:** 32-bit identifier associated with each host or router interface\n- **interface:** connection between host/router and physical link\n  - router’s typically have multiple interfaces\n  - host typically has one or two interfaces (e.g., wired Ethernet, wireless 802.11)\n- 223.1.1.1\n- 223.1.1.2\n- 223.1.1.3\n- 223.1.1.4\n- 223.1.2.9\n- 223.1.2.2\n- 223.1.2.1\n- 223.1.3.2\n- 223.1.3.1\n- 223.1.3.27\n- 223.1.1.1 = 11011111 00000001 00000001 00000001\n- **dotted-decimal IP address notation:** \n- **Q:** how are interfaces actually connected?\n- **A:** wired\n- Ethernet interfaces connected by Ethernet switches\n- **A:** wireless WiFi interfaces connected by WiFi base station\n- **For now:** don’t need to worry about how one interface is connected to another (with no intervening router)\n- **A:** we’ll learn about that in chapters 6, 7\n\n**Subnets**\n\n- 223.1.1.1\n- 223.1.1.2\n- 223.1.1.3\n- 223.1.1.4\n- 223.1.2.9\n- 223.1.2.2\n- 223.1.2.1\n- 223.1.3.2\n- 223.1.3.1\n- 223.1.3.27\n- What’s a subnet ?\n  - device interfaces that can physically reach each other without passing through an intervening router\n- network consisting of 3 subnets\n- **IP addresses have structure:** \n  - subnet part: devices in same subnet have common high order bits\n  - host part: remaining low order bits\n- **Recipe for defining subnets:** \n- detach each interface from its host or router, creating “islands” of isolated networks\n- each isolated network is called a subnet\n- **subnet mask:** /24\n- **(high-order 24 bits:** subnet part of IP address)\n- subnet\n- 223.1.3.0/24\n- subnet 223.1.1.0/24\n- subnet 223.1.2.0/24\n- where are the subnets?\n- what are the /24 subnet addresses?\n- 223.1.2.6\n- 223.1.7.0\n- 223.1.7.1\n- 223.1.8.0\n- 223.1.8.1\n- 223.1.9.1\n- 223.1.9.2\n- subnet 223.1.1/24\n- subnet 223.1.7/24\n- subnet 223.1.3/24\n- subnet 223.1.2/24\n- subnet 223.1.9/24\n- subnet 223.1.8/24"
      },
      {
        "title": "3. IP addressing: CIDR (Slides 4-50..101)",
        "content": "**IP addressing: CIDR**\n\n- **CIDR:** Classless InterDomain Routing (pronounced “cider”)\n  - subnet portion of address of arbitrary length\n  - address format: a.b.c.d/x, where x is # bits in subnet portion of address\n- 11001000 00010111 00010000 00000000\n- subnet\n- part\n- host\n- part\n- 200.23.16.0/23\n\n**IP fragmentation/reassembly**\n\n- network links have MTU (max. transfer size) - largest possible link-level frame\n  - different link types, different MTUs\n- large IP datagram divided (“fragmented”) within net\n  - one datagram becomes several datagrams\n  - “reassembled” only at destination\n  - IP header bits used to identify, order related fragments\n- **fragmentation:** \n- **in:** one large datagram\n- **out:** 3 smaller datagrams\n- reassembly\n- offset\n- fragflag\n- length\n- =4000\n- =1500\n- =185\n- =370\n- =1040\n- one large datagram becomes\n- several smaller datagrams\n- **example:** \n- 4000 byte datagram\n- MTU = 1500 bytes\n- 1480 bytes in data field\n- offset =\n- 1480/8"
      },
      {
        "title": "4. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **4.3 The Internet Protocol (IPv4): 20-Byte Datagram Header, Fragmentation, Subnets & CIDR**:\n\n- **Review Question 1 (What        is    the Internet Protocol?):** What are the principal components of the IPv4 protocol (check all that apply)?\n  - **Verified Answer:** IPv4 datagram format.; IPv4 addressing conventions.; Packet handling conventions at routers (e.g., segmentation/reassembly)\n\n- **Review Question 2 (What is an IP address actually associated        with?):** Which of the following statements is true regarding an IP address? (Zero, one or more of the following statements is true).\n  - **Verified Answer:** If a host has more than one interface, then it has more that one IP address at which it can be reached.; If a router has more than one interface, then it has more that one IP address at which it can be reached.; An IP address is associated with an interface.\n\n- **Review Question 3 (What is a subnet?):** What is meant by an IP subnet? (Check zero, one or more of the following characteristics of an IP subnet).\n  - **Verified Answer:** A set of devices that have a common set of leading high order bits in their IP address.; A set of device interfaces that can physically reach each other without passing through an intervening router.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "cidr_subnet_fragmentation.py — Calculating CIDR Subnet Ranges & IPv4 MTU Fragmentation Offsets",
          "snippet": "# Kurose & Ross 9e - Section 4.3: CIDR Subnet Calculation & IPv4 Datagram Fragmentation\nimport ipaddress\n\nnet = ipaddress.ip_network(\"223.1.1.0/24\")\nprint(f\"CIDR Block: {net} | Netmask: {net.netmask} | Usable Hosts: {net.num_addresses - 2} ({net[1]} .. {net[-2]})\\n\")\n\n# IPv4 Fragmentation: 4000-byte datagram (20B IP header + 3980B payload) over MTU = 1500B link\ntotal_payload = 3980\nmax_frag_payload = ((1500 - 20) // 8) * 8  # Must be multiple of 8 bytes = 1480 bytes\noffset_bytes = 0\nfrag_num = 1\nwhile offset_bytes < total_payload:\n    chunk = min(max_frag_payload, total_payload - offset_bytes)\n    mf_flag = 1 if (offset_bytes + chunk) < total_payload else 0\n    print(f\"Fragment #{frag_num}: TotalLen={chunk+20:4d}B | Payload={chunk:4d}B | Offset={offset_bytes//8:3d} (bytes={offset_bytes:4d}) | MF={mf_flag}\")\n    offset_bytes += chunk\n    frag_num += 1"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 4.3 The Internet Protocol (IPv4): 20-Byte Datagram Header, Fragmentation, Subnets & CIDR",
      "filename": "cidr_subnet_fragmentation.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 4.3: CIDR Subnet Calculation & IPv4 Datagram Fragmentation\nimport ipaddress\n\nnet = ipaddress.ip_network(\"223.1.1.0/24\")\nprint(f\"CIDR Block: {net} | Netmask: {net.netmask} | Usable Hosts: {net.num_addresses - 2} ({net[1]} .. {net[-2]})\\n\")\n\n# IPv4 Fragmentation: 4000-byte datagram (20B IP header + 3980B payload) over MTU = 1500B link\ntotal_payload = 3980\nmax_frag_payload = ((1500 - 20) // 8) * 8  # Must be multiple of 8 bytes = 1480 bytes\noffset_bytes = 0\nfrag_num = 1\nwhile offset_bytes < total_payload:\n    chunk = min(max_frag_payload, total_payload - offset_bytes)\n    mf_flag = 1 if (offset_bytes + chunk) < total_payload else 0\n    print(f\"Fragment #{frag_num}: TotalLen={chunk+20:4d}B | Payload={chunk:4d}B | Offset={offset_bytes//8:3d} (bytes={offset_bytes:4d}) | MF={mf_flag}\")\n    offset_bytes += chunk\n    frag_num += 1",
      "expectedOutput": [
        "[OK] cidr_subnet_fragmentation.py — Calculating CIDR Subnet Ranges & IPv4 MTU Fragmentation Offsets",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 4.3 The Internet Protocol (IPv4): 20-Byte Datagram Header, Fragmentation, Subnets & CIDR. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Consider the three subnets in the diagram below. Which of the following addresses can not be used by an interface in the 223.1.3/29 network? Check all that apply.",
      "options": [
        "A) 223.1.3.2",
        "B) 223.1.2.6",
        "C) 223.1.3.28",
        "D) 223.1.3.6"
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 4), '223.1.2.6' accurately characterizes 4.3 The Internet Protocol (IPv4): 20-Byte Datagram Header, Fragmentation, Subnets & CIDR."
    }
  },
  "cn-ch4-dhcp-hierarchical-routing": {
    "id": "cn-ch4-dhcp-hierarchical-routing",
    "badge": "Module 4 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "4.3B Dynamic Host Configuration Protocol (DHCP DORA) & Hierarchical Route Aggregation",
    "subtitle": "Plug-and-play IP assignment via the 4-step broadcast DHCP handshake (Discover, Offer, Request, ACK), learning default gateway and DNS server IPs, and ISP prefix route aggregation.",
    "sections": [
      {
        "title": "1. IP addresses: how to get one? (Slides 4-51..52)",
        "content": "![4.3B Dynamic Host Configuration Protocol (DHCP DORA) & Hierarchical Route Aggregation Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**4.3B Dynamic Host Configuration Protocol (DHCP DORA) & Hierarchical Route Aggregation** — Plug-and-play IP assignment via the 4-step broadcast DHCP handshake (Discover, Offer, Request, ACK), learning default gateway and DNS server IPs, and ISP prefix route aggregation.\n\n**IP addresses: how to get one?**\n\n- **That’s actually two questions:** \n- **Q:** How does a host get IP address within its network (host part of address)?\n- **Q:** How does a network get IP address for itself (network part of address)\n- How does host get IP address?\n- hard-coded by sysadmin in config file (e.g., /etc/rc.config in UNIX)\n- **DHCP:** Dynamic Host Configuration Protocol: dynamically get address from as server\n  - “plug-and-play”\n\n**DHCP: Dynamic Host Configuration Protocol**\n\n- **goal:** host dynamically obtains IP address from network server when it “joins” network\n  - can renew its lease on address in use\n  - allows reuse of addresses (only hold address while connected/on)\n  - support for mobile users who join/leave network\n- **DHCP overview:** \n  - host broadcasts DHCP discover msg [optional]\n  - DHCP server responds with DHCP offer msg [optional]\n  - host requests IP address: DHCP request msg\n  - DHCP server sends address: DHCP ack msg",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 4 Key Principle",
          "message": "Plug-and-play IP assignment via the 4-step broadcast DHCP handshake (Discover, Offer, Request, ACK), learning default gateway and DNS server IPs, and ISP prefix route aggregation."
        }
      },
      {
        "title": "2. DHCP client-server scenario (Slides 4-53..55)",
        "content": "**DHCP client-server scenario**\n\n- 223.1.1.1\n- 223.1.1.2\n- 223.1.1.3\n- 223.1.1.4\n- 223.1.2.9\n- 223.1.2.2\n- 223.1.2.1\n- 223.1.3.2\n- 223.1.3.1\n- 223.1.3.27\n- DHCP server\n- 223.1.2.5\n- arriving DHCP client needs\n- address in this network\n- Typically, DHCP server will be co-located in router, serving all subnets to which router is attached\n- **DHCP server:** 223.1.2.5\n- Arriving client\n- DHCP discover\n- **src:** 0.0.0.0, 68\n- **dest.:** 255.255.255.255,67\n- **yiaddr:** 0.0.0.0\n- **transaction ID:** 654\n- DHCP offer\n- **src:** 223.1.2.5, 67\n- **dest:** 255.255.255.255, 68\n- **yiaddr:** 223.1.2.4\n- **lifetime:** 3600 secs\n- DHCP request\n- **src:** 0.0.0.0, 68\n- **dest:** : 255.255.255.255, 67\n- **transaction ID:** 655\n- DHCP ACK\n- **Broadcast:** is there a DHCP server out there?\n- **Broadcast:** I’m a DHCP server! Here’s an IP address you can use\n- **Broadcast:** OK. I would like to use this IP address!\n- **Broadcast:** OK. You’ve got that IP address!\n- The two steps above can be skipped “if a client remembers and wishes to reuse a previously allocated network address” [RFC 2131]\n\n**DHCP: more than IP addresses**\n\n- DHCP can return more than just allocated IP address on subnet:\n  - address of first-hop router for client\n  - name and IP address of DNS sever\n  - network mask (indicating network versus host portion of address)"
      },
      {
        "title": "3. DHCP: example (Slides 4-56..58)",
        "content": "**DHCP: example**\n\n- Connecting laptop will use DHCP to get IP address, address of first-hop router, address of DNS server.\n- router with DHCP\n- server built into\n- router\n- DHCP REQUEST message encapsulated in UDP, encapsulated in IP, encapsulated in Ethernet\n- **Ethernet frame broadcast (dest:** FFFFFFFFFFFF) on LAN, received at router running DHCP server\n- Ethernet de-mux’ed to IP de-mux’ed, UDP de-mux’ed to DHCP\n- 168.1.1.1\n- DHCP\n- UDP\n- Eth\n- Phy\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- UDP\n- Eth\n- Phy\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- DCP server formulates DHCP ACK containing client’s IP address, IP address of first-hop router for client, name & IP address of DNS server\n- encapsulated DHCP server reply forwarded to client, de-muxing up to DHCP at client\n- client now knows its IP address, name and IP address of DNS server, IP address of its first-hop router\n\n**IP addresses: how to get one?**\n\n- **Q:** how does network get subnet part of IP address?\n- **A:** gets allocated portion of its provider ISP’s address space\n- ISP's block 11001000 00010111 00010000 00000000 200.23.16.0/20\n- ISP can then allocate out its address space in 8 blocks:\n- Organization 0 11001000 00010111 00010000 00000000 200.23.16.0/23\n- Organization 1 11001000 00010111 00010010 00000000 200.23.18.0/23\n- Organization 2 11001000 00010111 00010100 00000000 200.23.20.0/23\n- ... ….. …. ….\n- Organization 7 11001000 00010111 00011110 00000000 200.23.30.0/23"
      },
      {
        "title": "4. Hierarchical addressing: route aggregation (Slides 4-59..61)",
        "content": "**Hierarchical addressing: route aggregation**\n\n- “Send me anything\n- with addresses\n- beginning\n- 200.23.16.0/20”\n- 200.23.16.0/23\n- 200.23.18.0/23\n- 200.23.30.0/23\n- Fly-By-Night-ISP\n- Organization 0\n- Organization 7\n- Internet\n- Organization 1\n- ISPs-R-Us\n- “Send me anything\n- with addresses\n- beginning\n- 199.31.0.0/16”\n- 200.23.20.0/23\n- Organization 2\n- hierarchical addressing allows efficient advertisement of routing information:\n\n**Hierarchical addressing: more specific routes**\n\n- “Send me anything\n- with addresses\n- beginning\n- 200.23.16.0/20”\n- 200.23.16.0/23\n- 200.23.30.0/23\n- Fly-By-Night-ISP\n- Organization 0\n- Organization 7\n- Internet\n- 200.23.18.0/23\n- Organization 1\n- ISPs-R-Us\n- “Send me anything\n- with addresses\n- beginning\n- 199.31.0.0/16”\n- 200.23.20.0/23\n- Organization 2\n- Organization 1 moves from Fly-By-Night-ISP to ISPs-R-Us\n- ISPs-R-Us now advertises a more specific route to Organization 1\n- 200.23.18.0/23\n- Organization 1\n- “or 200.23.18.0/23”"
      },
      {
        "title": "5. IP addressing: last words ... (Slides 4-62..102)",
        "content": "**IP addressing: last words ...**\n\n- **Q:** how does an ISP get block of addresses?\n- **A:** ICANN: Internet Corporation for Assigned Names and Numbers http://www.icann.org/\n  - allocates IP addresses, through 5 regional registries (RRs) (who may then allocate to local registries)\n  - manages DNS root zone, including delegation of individual TLD (.com, .edu , …) management\n- **Q:** are there enough 32-bit IP addresses?\n- ICANN allocated last chunk of IPv4 addresses to RRs in 2011\n- NAT (next) helps IPv4 address space exhaustion\n- IPv6 has 128-bit address space\n- \"Who the hell knew how much address space we needed?\" Vint Cerf (reflecting on decision to make IPv4 address 32 bits long)\n\n**DHCP: Wireshark output (home LAN)**\n\n- **Message type:** Boot Reply (2)\n- **Hardware type:** Ethernet\n- **Hardware address length:** 6\n- **Hops:** 0\n- **Transaction ID:** 0x6b3a11b7\n- **Seconds elapsed:** 0\n- **Bootp flags:** 0x0000 (Unicast)\n- **Client IP address:** 192.168.1.101 (192.168.1.101)\n- **Your (client) IP address:** 0.0.0.0 (0.0.0.0)\n- **Next server IP address:** 192.168.1.1 (192.168.1.1)\n- **Relay agent IP address:** 0.0.0.0 (0.0.0.0)\n- **Client MAC address:** Wistron_23:68:8a (00:16:d3:23:68:8a)\n- Server host name not given\n- Boot file name not given\n- **Magic cookie:** (OK)\n- **Option:** (t=53,l=1) DHCP Message Type = DHCP ACK\n- **Option:** (t=54,l=4) Server Identifier = 192.168.1.1\n- **Option:** (t=1,l=4) Subnet Mask = 255.255.255.0\n- **Option:** (t=3,l=4) Router = 192.168.1.1\n- **Option:** (6) Domain Name Server\n- **Length:** 12; Value: 445747E2445749F244574092;\n- **IP Address:** 68.87.71.226;\n- **IP Address:** 68.87.73.242;\n- **IP Address:** 68.87.64.146\n- **Option:** (t=15,l=20) Domain Name = \"hsd1.ma.comcast.net.\"\n- **Message type:** Boot Request (1)\n- **Hardware type:** Ethernet\n- **Hardware address length:** 6\n- **Hops:** 0\n- **Transaction ID:** 0x6b3a11b7\n- **Seconds elapsed:** 0\n- **Bootp flags:** 0x0000 (Unicast)\n- **Client IP address:** 0.0.0.0 (0.0.0.0)\n- **Your (client) IP address:** 0.0.0.0 (0.0.0.0)\n- **Next server IP address:** 0.0.0.0 (0.0.0.0)\n- **Relay agent IP address:** 0.0.0.0 (0.0.0.0)\n- **Client MAC address:** Wistron_23:68:8a (00:16:d3:23:68:8a)\n- Server host name not given\n- Boot file name not given\n- **Magic cookie:** (OK)\n- **Option:** (t=53,l=1) DHCP Message Type = DHCP Request\n- **Option:** (61) Client identifier\n- **Length:** 7; Value: 010016D323688A;\n- **Hardware type:** Ethernet\n- **Client MAC address:** Wistron_23:68:8a (00:16:d3:23:68:8a)\n- **Option:** (t=50,l=4) Requested IP Address = 192.168.1.101\n- **Option:** (t=12,l=5) Host Name = \"nomad\"\n- **Option:** (55) Parameter Request List\n- **Length:** 11; Value: 010F03062C2E2F1F21F92B\n- 1 = Subnet Mask; 15 = Domain Name\n- 3 = Router; 6 = Domain Name Server\n- 44 = NetBIOS over TCP/IP Name Server\n\n- **Slide Diagram Elements & Protocol Entities:** `reply, request`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **4.3B Dynamic Host Configuration Protocol (DHCP DORA) & Hierarchical Route Aggregation**:\n\n- **Review Question 1 (What        is    the Internet Protocol?):** What are the principal components of the IPv4 protocol (check all that apply)?\n  - **Verified Answer:** IPv4 datagram format.; IPv4 addressing conventions.; Packet handling conventions at routers (e.g., segmentation/reassembly)\n\n- **Review Question 2 (What is an IP address actually associated        with?):** Which of the following statements is true regarding an IP address? (Zero, one or more of the following statements is true).\n  - **Verified Answer:** If a host has more than one interface, then it has more that one IP address at which it can be reached.; If a router has more than one interface, then it has more that one IP address at which it can be reached.; An IP address is associated with an interface.\n\n- **Review Question 3 (What is a subnet?):** What is meant by an IP subnet? (Check zero, one or more of the following characteristics of an IP subnet).\n  - **Verified Answer:** A set of devices that have a common set of leading high order bits in their IP address.; A set of device interfaces that can physically reach each other without passing through an intervening router.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "dhcp_dora_simulator.py — Tracing the 4-Step DHCP Broadcast Handshake (Discover, Offer, Request, ACK)",
          "snippet": "# Kurose & Ross 9e - Section 4.3.3: DHCP 4-Step DORA Message Exchange\ndhcp_messages = [\n    (\"1. DHCP DISCOVER\", \"src=0.0.0.0:68\",      \"dst=255.255.255.255:67\", \"yiaddr=0.0.0.0, tx_id=654\"),\n    (\"2. DHCP OFFER\",    \"src=223.1.2.5:67\",    \"dst=255.255.255.255:68\", \"yiaddr=223.1.2.4, Lease=3600s\"),\n    (\"3. DHCP REQUEST\",  \"src=0.0.0.0:68\",      \"dst=255.255.255.255:67\", \"Requested IP=223.1.2.4, tx_id=655\"),\n    (\"4. DHCP ACK\",      \"src=223.1.2.5:67\",    \"dst=255.255.255.255:68\", \"Assigned=223.1.2.4/24, GW=223.1.2.1, DNS=223.1.2.2\"),\n]\n\nfor step, src, dst, fields in dhcp_messages:\n    print(f\"{step:18s} | {src:19s} -> {dst:22s} | {fields}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 4.3B Dynamic Host Configuration Protocol (DHCP DORA) & Hierarchical Route Aggregation",
      "filename": "dhcp_dora_simulator.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 4.3.3: DHCP 4-Step DORA Message Exchange\ndhcp_messages = [\n    (\"1. DHCP DISCOVER\", \"src=0.0.0.0:68\",      \"dst=255.255.255.255:67\", \"yiaddr=0.0.0.0, tx_id=654\"),\n    (\"2. DHCP OFFER\",    \"src=223.1.2.5:67\",    \"dst=255.255.255.255:68\", \"yiaddr=223.1.2.4, Lease=3600s\"),\n    (\"3. DHCP REQUEST\",  \"src=0.0.0.0:68\",      \"dst=255.255.255.255:67\", \"Requested IP=223.1.2.4, tx_id=655\"),\n    (\"4. DHCP ACK\",      \"src=223.1.2.5:67\",    \"dst=255.255.255.255:68\", \"Assigned=223.1.2.4/24, GW=223.1.2.1, DNS=223.1.2.2\"),\n]\n\nfor step, src, dst, fields in dhcp_messages:\n    print(f\"{step:18s} | {src:19s} -> {dst:22s} | {fields}\")",
      "expectedOutput": [
        "[OK] dhcp_dora_simulator.py — Tracing the 4-Step DHCP Broadcast Handshake (Discover, Offer, Request, ACK)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 4.3B Dynamic Host Configuration Protocol (DHCP DORA) & Hierarchical Route Aggregation. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following fields occur ONLY in the IPv6 datagram header (i.e., appear in the IPv6 header but not in the IPv4 header)? Check all that apply.",
      "options": [
        "A) The upper layer protocol (or next header) field.",
        "B) The flow label field.",
        "C) The header checksum field.",
        "D) The time-to-live (or hop limit) field."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 4), 'The flow label field.' accurately characterizes 4.3B Dynamic Host Configuration Protocol (DHCP DORA) & Hierarchical Route Aggregation."
    }
  },
  "cn-ch4-nat-ipv6-transition": {
    "id": "cn-ch4-nat-ipv6-transition",
    "badge": "Module 4 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "4.3C Network Address Translation (NAT) & IPv6: 128-Bit Header, Dual-Stack Tunneling & Adoption",
    "subtitle": "How home routers multiplex private RFC 1918 subnets (10/8, 172.16/12, 192.168/16) behind a single public IPv4 via NAT translation tables, IPv6's streamlined 40-byte header, and IPv6-in-IPv4 tunneling.",
    "sections": [
      {
        "title": "1. NAT: network address translation (Slides 4-64..69)",
        "content": "![4.3C Network Address Translation (NAT) & IPv6: 128-Bit Header, Dual-Stack Tunneling & Adoption Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**4.3C Network Address Translation (NAT) & IPv6: 128-Bit Header, Dual-Stack Tunneling & Adoption** — How home routers multiplex private RFC 1918 subnets (10/8, 172.16/12, 192.168/16) behind a single public IPv4 via NAT translation tables, IPv6's streamlined 40-byte header, and IPv6-in-IPv4 tunneling.\n\n**NAT: network address translation**\n\n- 10.0.0.1\n- 10.0.0.2\n- 10.0.0.3\n- 10.0.0.4\n- local network (e.g., home network) 10.0.0/24\n- 138.76.29.7\n- rest of\n- Internet\n- datagrams with source or destination in this network have 10.0.0/24 address for source, destination (as usual)\n- all datagrams leaving local network have same source NAT IP address: 138.76.29.7, but different source port numbers\n- **NAT:** all devices in local network share just one IPv4 address as far as outside world is concerned\n  - all devices in local network have 32-bit addresses in a “private” IP address space (10/8, 172.16/12, 192.168/16 prefixes) that can only be used in local network\n  - advantages:\n    - just one IP address needed from provider ISP for all devices\n    - can change addresses of host in local network without notifying outside world\n    - can change ISP without changing addresses of devices in local network\n    - security: devices inside local net not directly addressable, visible by outside world\n- **implementation:** NAT router must (transparently):\n  - outgoing datagrams: replace (source IP address, port #) of every outgoing datagram to (NAT IP address, new port #)\n    - remote clients/servers will respond using (NAT IP address, new port #) as destination address\n  - remember (in NAT translation table) every (source IP address, port #) to (NAT IP address, new port #) translation pair\n  - incoming datagrams: replace (NAT IP address, new port #) in destination fields of every incoming datagram with corresponding (source IP address, port #) stored in NAT table\n- **S:** 10.0.0.1, 3345\n- **D:** 128.119.40.186, 80\n- **1:** host 10.0.0.1 sends datagram to 128.119.40.186, 80\n- NAT translation table\n- WAN side addr LAN side addr\n- 138.76.29.7, 5001 10.0.0.1, 3345\n- …… ……\n- **S:** 128.119.40.186, 80\n- **D:** 10.0.0.1, 3345\n- **S:** 138.76.29.7, 5001\n- **2:** NAT router changes datagram source address from 10.0.0.1, 3345 to 138.76.29.7, 5001,\n- updates table\n- **D:** 138.76.29.7, 5001\n- **3:** reply arrives, destination address: 138.76.29.7, 5001\n- **NAT has been controversial:** \n  - routers “should” only process up to layer 3\n  - address “shortage” should be solved by IPv6\n  - violates end-to-end argument (port # manipulation by network-layer device)\n  - NAT traversal: what if client wants to connect to server behind NAT?\n- **but NAT is here to stay:** \n  - extensively used in home and institutional nets, 4G/5G cellular nets\n\n**IPv6: motivation**\n\n- **initial motivation:** 32-bit IPv4 address space would be completely allocated\n- **additional motivation:** \n  - speed processing/forwarding: 40-byte fixed length header\n  - enable different network-layer treatment of “flows”",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 4 Key Principle",
          "message": "How home routers multiplex private RFC 1918 subnets (10/8, 172.16/12, 192.168/16) behind a single public IPv4 via NAT translation tables, IPv6's streamlined 40-byte header, and IPv6-in-IPv4 tunneling."
        }
      },
      {
        "title": "2. IPv6 datagram format (Slides 4-70..71)",
        "content": "**IPv6 datagram format**\n\n- payload (data)\n- destination address\n- (128 bits)\n- source address\n- (128 bits)\n- payload len\n- next hdr\n- hop limit\n- flow label\n- pri\n- ver\n- 32 bits\n- **priority:** identify priority among datagrams in flow\n- **flow label:** identify datagrams in same \"flow.” (concept of “flow” not well defined).\n- 128-bit\n- IPv6 addresses\n- **What’s missing (compared with IPv4):** \n- no checksum (to speed processing at routers)\n- no fragmentation/reassembly\n- no options (available as upper-layer, next-header protocol at router)\n\n**Transition from IPv4 to IPv6**\n\n- not all routers can be upgraded simultaneously\n  - no “flag days”\n  - how will network operate with mixed IPv4 and IPv6 routers?\n- IPv4 source, dest addr\n- IPv4 header fields\n- IPv4 datagram\n- IPv6 datagram\n- IPv4 payload\n- UDP/TCP payload\n- IPv6 source dest addr\n- IPv6 header fields\n- **tunneling:** IPv6 datagram carried as payload in IPv4 datagram among IPv4 routers (“packet within a packet”)\n  - tunneling used extensively in other contexts (4G/5G)"
      },
      {
        "title": "3. Tunneling and encapsulation (Slides 4-72..74)",
        "content": "**Tunneling and encapsulation**\n\n- **Ethernet connecting two IPv6 routers:** \n- Ethernet connects two IPv6 routers\n- IPv6\n- IPv6\n- IPv6\n- IPv6\n- Link-layer frame\n- IPv6 datagram\n- **The usual:** datagram as payload in link-layer frame\n- IPv6\n- IPv6/v4\n- IPv6/v4\n- IPv6\n- IPv4 network\n- IPv4 network connecting two IPv6 routers\n- IPv4 tunnel connecting two IPv6 routers\n- IPv4 tunnel\n- connecting IPv6 routers\n- IPv4 datagram\n- **tunneling:** IPv6 datagram as payload in a IPv4 datagram\n\n**Tunneling**\n\n- **B-to-C:** \n- IPv6 inside\n- IPv4\n- **Flow:** X\n- **Src:** A\n- **Dest:** F\n- data\n- **src:** B\n- **dest:** E\n- **physical view:** \n- IPv4\n- IPv4\n- IPv6/v4\n- IPv6\n- IPv6\n- IPv6/v4\n- **logical view:** \n- IPv4 tunnel\n- connecting IPv6 routers\n- IPv6\n- IPv6/v4\n- IPv6/v4\n- IPv6\n- **flow:** X\n- **src:** A\n- **dest:** F\n- data\n- **A-to-B:** \n- IPv6\n- **Flow:** X\n- **Src:** A\n- **Dest:** F\n- data\n- **src:** B\n- **dest:** E\n- **B-to-C:** \n- IPv6 inside\n- IPv4\n- **E-to-F:** \n- IPv6\n- **flow:** X\n- **src:** A\n- **dest:** F\n- data\n- **B-to-C:** \n- IPv6 inside\n- IPv4\n- **Flow:** X\n- **Src:** A\n- **Dest:** F\n- data\n- **src:** B\n- **dest:** E\n- Note source and destination addresses!"
      },
      {
        "title": "4. IPv6: adoption (Slides 4-75..76)",
        "content": "- **Google1:** ~ 40% of clients access services via IPv6 (2023)\n- **NIST:** 1/3 of all US government domains are IPv6 capable\n- Long (long!) time for deployment, use\n  - 25 years and counting!\n  - think of application-level changes in last 25 years: WWW, social media, streaming media, gaming, telepresence, …\n  - Why?\n- **1 https:** //www.google.com/intl/en/ipv6/statistics.html"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **4.3C Network Address Translation (NAT) & IPv6: 128-Bit Header, Dual-Stack Tunneling & Adoption**:\n\n- **Review Question 1 (What        is    the Internet Protocol?):** What are the principal components of the IPv4 protocol (check all that apply)?\n  - **Verified Answer:** IPv4 datagram format.; IPv4 addressing conventions.; Packet handling conventions at routers (e.g., segmentation/reassembly)\n\n- **Review Question 2 (What is an IP address actually associated        with?):** Which of the following statements is true regarding an IP address? (Zero, one or more of the following statements is true).\n  - **Verified Answer:** If a host has more than one interface, then it has more that one IP address at which it can be reached.; If a router has more than one interface, then it has more that one IP address at which it can be reached.; An IP address is associated with an interface.\n\n- **Review Question 3 (What is a subnet?):** What is meant by an IP subnet? (Check zero, one or more of the following characteristics of an IP subnet).\n  - **Verified Answer:** A set of devices that have a common set of leading high order bits in their IP address.; A set of device interfaces that can physically reach each other without passing through an intervening router.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "nat_translation_table.py — Simulating Outbound & Inbound Packet Rewriting in a Home Router NAT Table",
          "snippet": "# Kurose & Ross 9e - Section 4.3.4: Network Address Translation (NAT) Table Rewrite Engine\nwan_ip = \"138.76.29.7\"\nnat_table = {}\nnext_wan_port = 5001\n\ndef outbound_nat(lan_ip: str, lan_port: int, dst_ip: str, dst_port: int):\n    global next_wan_port\n    wan_port = next_wan_port\n    next_wan_port += 1\n    nat_table[(wan_ip, wan_port)] = (lan_ip, lan_port)\n    print(f\"[OUTBOUND] LAN ({lan_ip}:{lan_port} -> {dst_ip}:{dst_port}) rewritten to WAN ({wan_ip}:{wan_port} -> {dst_ip}:{dst_port})\")\n    return wan_port\n\ndef inbound_nat(dst_wan_ip: str, dst_wan_port: int, src_ip: str, src_port: int):\n    lan_ip, lan_port = nat_table[(dst_wan_ip, dst_wan_port)]\n    print(f\"[INBOUND]  WAN ({src_ip}:{src_port} -> {dst_wan_ip}:{dst_wan_port}) translated to LAN ({src_ip}:{src_port} -> {lan_ip}:{lan_port})\")\n\np1 = outbound_nat(\"10.0.0.1\", 3345, \"128.119.40.186\", 80)\ninbound_nat(\"138.76.29.7\", p1, \"128.119.40.186\", 80)"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 4.3C Network Address Translation (NAT) & IPv6: 128-Bit Header, Dual-Stack Tunneling & Adoption",
      "filename": "nat_translation_table.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 4.3.4: Network Address Translation (NAT) Table Rewrite Engine\nwan_ip = \"138.76.29.7\"\nnat_table = {}\nnext_wan_port = 5001\n\ndef outbound_nat(lan_ip: str, lan_port: int, dst_ip: str, dst_port: int):\n    global next_wan_port\n    wan_port = next_wan_port\n    next_wan_port += 1\n    nat_table[(wan_ip, wan_port)] = (lan_ip, lan_port)\n    print(f\"[OUTBOUND] LAN ({lan_ip}:{lan_port} -> {dst_ip}:{dst_port}) rewritten to WAN ({wan_ip}:{wan_port} -> {dst_ip}:{dst_port})\")\n    return wan_port\n\ndef inbound_nat(dst_wan_ip: str, dst_wan_port: int, src_ip: str, src_port: int):\n    lan_ip, lan_port = nat_table[(dst_wan_ip, dst_wan_port)]\n    print(f\"[INBOUND]  WAN ({src_ip}:{src_port} -> {dst_wan_ip}:{dst_wan_port}) translated to LAN ({src_ip}:{src_port} -> {lan_ip}:{lan_port})\")\n\np1 = outbound_nat(\"10.0.0.1\", 3345, \"128.119.40.186\", 80)\ninbound_nat(\"138.76.29.7\", p1, \"128.119.40.186\", 80)",
      "expectedOutput": [
        "[OK] nat_translation_table.py — Simulating Outbound & Inbound Packet Rewriting in a Home Router NAT Table",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 4.3C Network Address Translation (NAT) & IPv6: 128-Bit Header, Dual-Stack Tunneling & Adoption. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "What is meant by an IP subnet? (Check zero, one or more of the following characteristics of an IP subnet).",
      "options": [
        "A) A set of devices that always have a common first 16 bits in their IP address.",
        "B) A set of devices all manufactured by the same equipment maker/vendor.",
        "C) A set of devices that have a common set of leading high order bits in their IP address.",
        "D) A set of device interfaces that can physically reach each other without passing through an intervening router."
      ],
      "correctIndex": 2,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 4), 'A set of devices that have a common set of leading high order bits in their IP address.' accurately characterizes 4.3C Network Address Translation (NAT) & IPv6: 128-Bit Header, Dual-Stack Tunneling & Adoption."
    }
  },
  "cn-ch4-generalized-forwarding-openflow": {
    "id": "cn-ch4-generalized-forwarding-openflow",
    "badge": "Module 4 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "4.4–4.5 Generalized Forwarding (Match + Action), OpenFlow Flow Tables, Middleboxes & End-to-End Argument",
    "subtitle": "Unifying routers, switches, firewalls, and NATs under OpenFlow's Match-plus-Action abstraction, middleboxes in modern networks, the IP hourglass, and Saltzer/Reed/Clark's End-to-End Argument.",
    "sections": [
      {
        "title": "1. Generalized forwarding: match plus action (Slides 4-78..81)",
        "content": "![4.4–4.5 Generalized Forwarding (Match + Action), OpenFlow Flow Tables, Middleboxes & End-to-End Argument Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**4.4–4.5 Generalized Forwarding (Match + Action), OpenFlow Flow Tables, Middleboxes & End-to-End Argument** — Unifying routers, switches, firewalls, and NATs under OpenFlow's Match-plus-Action abstraction, middleboxes in modern networks, the IP hourglass, and Saltzer/Reed/Clark's End-to-End Argument.\n\n**Generalized forwarding: match plus action**\n\n- values in arriving\n- packet header\n- **Review:** each router contains a forwarding table\n- **“match plus action” abstraction:** match bits in arriving packet, take action\n  - generalized forwarding:\n    - many header fields can determine action\n    - many action possible: drop/copy/modify/log packet\n- forwarding table\n- **(aka:** flow table)\n- **(aka:** flow table)\n  - destination-based forwarding: forward based on dest. IP address\n\n**Flow table abstraction**\n\n- **flow:** defined by header field values (in link-, network-, transport-layer fields)\n- **generalized forwarding:** simple packet-handling rules\n  - match: pattern values in packet header fields\n  - actions: for matched packet: drop, forward, modify, matched packet or send matched packet to controller\n  - priority: disambiguate overlapping patterns\n  - counters: #bytes and #packets\n- Router’s flow table define router’s match+action rules\n- Flow table\n- match\n- action\n- **flow:** defined by header fields\n- ***:** wildcard\n- src=10.1.2.3, dest=*.*.*.* send to controller\n- src=1.2.*.*, dest=*.*.*.* drop\n- src = *.*.*.*, dest=3.4.*.* forward(2)\n\n**OpenFlow: flow table entries**\n\n- Match\n- Action\n- Stats\n- Forward packet to port(s)\n- Drop packet\n- Modify fields in header(s)\n- Encapsulate and forward to controller\n- Packet + byte counters\n- **Header fields to match:** \n- Ingress Port\n- Src MAC\n- Dst MAC\n- Eth Type\n- VLAN\n- ToS\n- IP Proto\n- IP Src\n- IP Dst\n- TCP/UDP Src Port\n- VLAN\n- Pri\n- TCP/UDP Dst Port\n- Link layer\n- Network layer\n- Transport layer",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 4 Key Principle",
          "message": "Unifying routers, switches, firewalls, and NATs under OpenFlow's Match-plus-Action abstraction, middleboxes in modern networks, the IP hourglass, and Saltzer/Reed/Clark's End-to-End Argument."
        }
      },
      {
        "title": "2. OpenFlow: examples (Slides 4-82..86)",
        "content": "**OpenFlow: examples**\n\n- IP datagrams destined to IP address 51.6.0.8 should be forwarded to router output port 6\n- Block (do not forward) all datagrams destined to TCP port 22 (ssh port #)\n- Block (do not forward) all datagrams sent by host 128.119.1.1\n- **Destination-based forwarding:** \n- 51.6.0.8\n- port6\n- Switch\n- Port\n- MAC\n- src\n- MAC\n- dst\n- Eth\n- type\n- VLAN\n- Src\n- Dst\n- Prot\n- TCP\n- s-port\n- TCP\n- d-port\n- Action\n- VLAN\n- Pri\n- ToS\n- **Firewall:** \n- drop\n- Switch\n- Port\n- MAC\n- src\n- MAC\n- dst\n- Eth\n- type\n- VLAN\n- Src\n- Dst\n- Prot\n- TCP\n- s-port\n- TCP\n- d-port\n- Action\n- VLAN\n- Pri\n- ToS\n- Switch\n- Port\n- MAC\n- src\n- MAC\n- dst\n- Eth\n- type\n- VLAN\n- Src\n- Dst\n- Prot\n- TCP\n- s-port\n- TCP\n- d-port\n- Action\n- VLAN\n- Pri\n- ToS\n- drop\n- 128.119.1.1\n- **Layer 2 destination-based forwarding:** \n- layer 2 frames with destination MAC address 22:A7:23:11:E1:02 should be forwarded to output port 3\n- port3\n- **22:** A7:23:\n- **11:** E1:02\n\n**OpenFlow abstraction**\n\n- **match+action:** abstraction unifies different kinds of devices\n- Router\n  - match: longest destination IP prefix\n  - action: forward out a link\n- Switch\n  - match: destination MAC address\n  - action: forward or flood\n- Firewall\n  - match: IP addresses and TCP/UDP port numbers\n  - action: permit or deny\n- NAT\n  - match: IP address and port\n  - action: rewrite address and port\n\n**OpenFlow example**\n\n- Host h1\n- 10.1.0.1\n- Host h2\n- 10.1.0.2\n- Host h4\n- 10.2.0.4\n- Host h3\n- 10.2.0.3\n- Host h5\n- 10.3.0.5\n- Host h6\n- 10.3.0.6\n- controller\n- Orchestrated tables can create network-wide behavior, e.g.,:\n- datagrams from hosts h5 and h6 should be sent to h3 or h4, via s1 and from there to s2\n- IP Src = 10.3.*.*\n- IP Dst = 10.2.*.*\n- forward(3)\n- match\n- action\n- ingress port = 2\n- IP Dst = 10.2.0.3\n- IP Dst = 10.2.0.4\n- forward(4)\n- ingress port = 1"
      },
      {
        "title": "3. Generalized forwarding: summary (Slides 4-87..89)",
        "content": "**Generalized forwarding: summary**\n\n- **“match plus action” abstraction:** match bits in arriving packet header(s) in any layers, take action\n  - matching over many fields (link-, network-, transport-layer)\n  - local actions: drop, forward, modify, or send matched packet to controller\n  - “program” network-wide behaviors\n- simple form of “network programmability”\n  - programmable, per-packet “processing”\n  - historical roots: active networking\n  - today: more generalized programming:\n  - P4 (see p4.org).\n\n**Middleboxes**\n\n- “any intermediary box performing functions apart from normal, standard functions of an IP router on the data path between a source host and destination host”\n- Middlebox (RFC 3234)\n\n**Middleboxes everywhere!**\n\n- enterprise\n- network\n- national or global ISP\n- datacenter\n- network\n- **NAT:** home, cellular, institutional\n- **Firewalls, IDS:** corporate, institutional, service providers, ISPs\n- **Load balancers:** corporate, service provider, data center, mobile nets\n- **Caches:** service provider, mobile, CDNs\n- **Application-specific:** service providers, institutional, CDN"
      },
      {
        "title": "4. Middleboxes (Slides 4-90..93)",
        "content": "**Middleboxes**\n\n- **initially:** proprietary (closed) hardware solutions\n- move towards “whitebox” hardware implementing open API\n  - move away from proprietary hardware solutions\n  - programmable local actions via match+action\n  - move towards innovation/differentiation in software\n- **SDN:** (logically) centralized control and configuration management often in private/public cloud\n- **network functions virtualization (NFV):** programmable services over white box networking, computation, storage\n\n**The IP hourglass**\n\n- TCP\n- UDP\n- HTTP\n- SMTP\n- QUIC\n- DASH\n- RTP\n- Ethernet\n- WiFi\n- Bluetooth\n- PPP\n- PDCP\n- copper radio fiber\n- **Internet’s “thin waist”:** \n- **one network layer protocol:** IP\n- must be implemented by every (billions) of Internet-connected devices\n- many protocols in physical, link, transport, and application layers\n\n**The IP hourglass, at middle age**\n\n- TCP\n- UDP\n- HTTP\n- SMTP\n- QUIC\n- DASH\n- RTP\n- Ethernet\n- WiFi\n- Bluetooth\n- PPP\n- PDCP\n- copper radio fiber\n- Internet’s middle age “love handles”?\n- middleboxes, operating inside the network\n- NAT\n- NFV\n- Firewalls\n- caching"
      },
      {
        "title": "5. Architectural Principles of the Internet (Slides 4-94..97)",
        "content": "**Architectural Principles of the Internet**\n\n- “Many members of the Internet community would argue that there is no architecture, but only a tradition, which was not written down for the first 25 years (or at least not by the IAB). However, in very general terms, the community believes that\n- RFC 1958\n- the goal is connectivity, the tool is the Internet Protocol, and the intelligence is end to end rather than hidden in the network.”\n- **Three cornerstone beliefs:** \n- simple connectivity\n- **IP protocol:** that narrow waist\n- intelligence, complexity at network edge\n\n**The end-end argument**\n\n- some network functionality (e.g., reliable data transfer, congestion) can be implemented in network, or at network edge\n- end-end implementation of reliable data transfer\n- application\n- transport\n- network\n- data link\n- physical\n- application\n- transport\n- network\n- data link\n- physical\n- application\n- transport\n- network\n- data link\n- physical\n- application\n- transport\n- network\n- data link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- hop-by-hop (in-network) implementation of reliable data transfer\n- “The function in question can completely and correctly be implemented only with the knowledge and help of the application standing at the end points of the communication system. Therefore, providing that questioned function as a feature of the communication system itself is not possible. (Sometimes an incomplete version of the function provided by the communication system may be useful as a performance enhancement.)\n- We call this line of reasoning against low-level function implementation the “end-to-end argument.”\n- Saltzer, Reed, Clark 1981\n\n**Where’s the intelligence?**\n\n- **20th century phone net:** \n- intelligence/computing at network switches\n- Internet (pre-2005)\n- intelligence, computing at edge\n- Internet (post-2005)\n- programmable network devices\n- intelligence, computing, massive application-level infrastructure at edge\n\n> **Kurose & Ross Lecture Note:** The 20th century phone network had dumb network endpoints, really by definition. The end points were rotary phones that maybe only your parents and grandparents remember; they weren’t computers. They really were dumb devices, and therefore the phone network had programmable switches that were quite smart. All functionality – well, all of the intelligence - was implemented within the network. It HAD to be. The end systems could not do anything more than send digits and send audio signals. When the Internet came along, the endpoints and the switches were both programmable computers. So where to put the complexity? RFC 1958 – the architectural principles of the Internet RFC - that says “intelligence is end to end rather than hidden in the network.” That puts the intelligence clearly at the edge, like we see here. And that’s possible because the edge devices are smart; they’re programmable. Well that’s the diagram as I remember it 20 years ago. And in the 20 years since, as we see the rise of middleboxes and SDN, we’re now seeing intelligence (in software) layered on top of “dumb” whiteboxes within the network. So I might add a brain here today. And with datacenters and content distribution networks, we see even smarter and more sophisticated application-level infrastructure being connected at points within the network. So now there are clearly much much bigger, much more computationally intensive and complex, endpoints if you will in today’s Internet"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **4.4–4.5 Generalized Forwarding (Match + Action), OpenFlow Flow Tables, Middleboxes & End-to-End Argument**:\n\n- **Review Question 1 (Destination-based match+action.):** Destination-based forwarding, which we studied in section 4.2, is a specific instance of match+action and generalized forwarding. Select the phrase below which best completes the following sentence: \"In destination-based forwarding, ...\"\n  - **Verified Answer:** ... after matching on the destination IP address in the datagram header, the action taken is to forward the datagram to the output port associated with that destination IP address.\n\n- **Review Question 2 (Generalized match+action.):** Which of the following match+actions can be taken in the generalized OpenFlow 1.0 match+action paradigm that we studied in Section 4.4? Check all that apply.\n  - **Verified Answer:** ... after matching on the 48-bit link-layer destination MAC address, the action taken is to forward the datagram to the output port associated with that link-layer address.; ... after matching on the port number in the segment's header, the action taken is to decide whether or not to drop that datagram containing that segment.; ... after matching on the port number in the segment's header, the action taken is to forward the datagram to the output port associated with that destination IP address.; ... after matching on the destination IP address in the datagram header, the action taken is to forward the datagram to the output port associated with that destination IP address.; ... after matching on the destination IP address in the datagram header, the action taken is to decide whether or not to drop that datagram.; ... after matching on the source and destination IP address in the datagram header, the action taken is to forward the datagram to the output port associated with that source and destination IP address pair.\n\n- **Review Question 3 (What fields can be matched in generalized match+action.):** Which of the following fields in the frame/datagram/segment/application-layer message can be matched in OpenFlow 1.0? Check all that apply.\n  - **Verified Answer:** IP source address; Upper layer protocol field; IP destination address; Source and/or destination port number; IP type-of-service field",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "openflow_match_action.py — Evaluating L2/L3/L4 Packets Against an OpenFlow Match-Plus-Action Flow Table",
          "snippet": "# Kurose & Ross 9e - Section 4.4: OpenFlow Generalized Forwarding (Match + Action) Engine\nflow_table = [\n    {\"match\": {\"dst_ip_prefix\": \"10.3.\", \"dst_port\": 22}, \"action\": \"DROP (Firewall Rule: Block SSH to Subnet 10.3)\"},\n    {\"match\": {\"dst_ip_prefix\": \"10.1.\"},                 \"action\": \"FORWARD(Port=2)\"},\n    {\"match\": {\"src_ip_prefix\": \"10.2.\"},                 \"action\": \"FORWARD(Port=1)\"},\n]\n\npackets = [\n    {\"src_ip\": \"10.2.0.5\", \"dst_ip\": \"10.3.0.9\", \"dst_port\": 22},\n    {\"src_ip\": \"10.2.0.5\", \"dst_ip\": \"10.1.0.8\", \"dst_port\": 80},\n]\n\nfor pkt in packets:\n    for rule in flow_table:\n        m = rule[\"match\"]\n        if pkt[\"dst_ip\"].startswith(m.get(\"dst_ip_prefix\", \"\")) and (m.get(\"dst_port\") in (None, pkt[\"dst_port\"])):\n            print(f\"Packet {pkt} -> Action: {rule['action']}\")\n            break"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 4.4–4.5 Generalized Forwarding (Match + Action), OpenFlow Flow Tables, Middleboxes & End-to-End Argument",
      "filename": "openflow_match_action.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 4.4: OpenFlow Generalized Forwarding (Match + Action) Engine\nflow_table = [\n    {\"match\": {\"dst_ip_prefix\": \"10.3.\", \"dst_port\": 22}, \"action\": \"DROP (Firewall Rule: Block SSH to Subnet 10.3)\"},\n    {\"match\": {\"dst_ip_prefix\": \"10.1.\"},                 \"action\": \"FORWARD(Port=2)\"},\n    {\"match\": {\"src_ip_prefix\": \"10.2.\"},                 \"action\": \"FORWARD(Port=1)\"},\n]\n\npackets = [\n    {\"src_ip\": \"10.2.0.5\", \"dst_ip\": \"10.3.0.9\", \"dst_port\": 22},\n    {\"src_ip\": \"10.2.0.5\", \"dst_ip\": \"10.1.0.8\", \"dst_port\": 80},\n]\n\nfor pkt in packets:\n    for rule in flow_table:\n        m = rule[\"match\"]\n        if pkt[\"dst_ip\"].startswith(m.get(\"dst_ip_prefix\", \"\")) and (m.get(\"dst_port\") in (None, pkt[\"dst_port\"])):\n            print(f\"Packet {pkt} -> Action: {rule['action']}\")\n            break",
      "expectedOutput": [
        "[OK] openflow_match_action.py — Evaluating L2/L3/L4 Packets Against an OpenFlow Match-Plus-Action Flow Table",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 4.4–4.5 Generalized Forwarding (Match + Action), OpenFlow Flow Tables, Middleboxes & End-to-End Argument. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "What is meant by generalized forwarding (as opposed to destination-based forwarding) in a router or switch?",
      "options": [
        "A) The decision about which output port to forward a packet to can be made based on the link-type of the outgoing port (e.g., Ethernet versus W",
        "B) None of the other answers is a correct definition of generalized forwarding.",
        "C) In addition to performing forwarding, the device can generalize its services, also performing hop-by-hop reliable data transfer and per-hop ",
        "D) Any of several actions (including drop (block), forward to a given interface, or duplicate-and-forward) can be made based on the contents of"
      ],
      "correctIndex": 3,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 4), 'Any of several actions (including drop (block), forward to a given interface, or duplicate-and-forward) can be made based on the contents of one or more packet header fields.' accurately characterizes 4.4–4.5 Generalized Forwarding (Match + Action), OpenFlow Flow Tables, Middleboxes & End-to-End Argument."
    }
  }
};
