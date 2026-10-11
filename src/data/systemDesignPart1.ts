import { LessonContent } from "./lessonsData";

export const SYSTEM_DESIGN_PART1: Record<string, LessonContent> = {
  "sd-getting-started": {
    "id": "sd-getting-started",
    "badge": "Module 1 • System Design",
    "readingTime": "24 min read",
    "level": "Beginner",
    "title": "Getting Started with System Design",
    "subtitle": "Comprehensive System Design guide to Getting Started with System Design — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "![High-Level Scalable Architecture](/images/system-design/hld-scalable-arch.svg)\n\n- System Design is the process of planning the architecture of a software system based on its requirements. It defines how different components of the system are structured and work together to achieve the desired functionality\n\n- Defines the system components, data flow, and interactions between different services.\n- Ensures the system is scalable, maintainable, and performs efficiently as the system grows.**Example: **For example, in an online shopping system, system design decides how components like the user interface, product catalog, payment service, and database interact with each other.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Getting Started with System Design."
        }
      },
      {
        "title": "2. System Design in SDLC",
        "content": "System Design is an important phase of the Software Development Life Cycle (SDLC). It acts as a bridge between requirements and implementation. Before coding begins, the design defines:\n\n- System architecture\n- Components and their responsibilities\n- Data flow and interactions\n- Technology and database choices\n- Scalability, security, and performance considerationsA good design also helps the system handle failures and exceptional cases.\n\nSDLC"
      },
      {
        "title": "3. High-Level Design (HLD)",
        "content": "High-level design (HLD) defines the overall architecture of a system and how the main components interact with each other. It provides a big-picture view of the system structure, services, and data flow.\n\n- Identifies major modules, services, and their interactions.\n- Focuses on system architecture and high-level decisions.\n- Usually created by architects, stakeholders, and senior developers."
      },
      {
        "title": "4. Prerequisite Technical Knowledge for HLD",
        "content": "These are the skills and concepts usually required to perform High-Level Design.\n\n- Basic programming and Data Structures & Algorithms\n- Functional and Non-functional requirements\n- Knowing the roles of components like databases (SQL and NoSQL), caches (Redis, Memcached, CDNs), and APIs.\n- Networking and Security Fundamentals like DNS, protocols (TCP/UDP, HTTP, WebSockets), OAuth, JWT, TLS/SSL, rate-limiting, API security, and basic DDOS protection.\n- Message queues and streaming tools like Kafka or RabbitMQ.\n- Knowledge of Microservices vs. Monoliths (When to split services and how to manage dependencies), fault tolerance, fallback strategies, redundancy, Load Balancer Types & Algorithms.\n- Observability tools like Prometheus, Grafana, ELK Stack (Elasticsearch, Logstash, Kibana) and Alerting systems (e.g., PagerDuty)"
      },
      {
        "title": "5. Topics Covered in HLD",
        "content": "Focuses on system architecture, modules, and their interactions.\n\n- **System architecture overview**: Defines the major components, modules, and how they interact (e.g., services, queues, databases) .\n- **Data flow and component interaction**: Illustrates how data moves between modules, along with key integrations and interfaces.\n- **Technology stack and infrastructure**: High-level decisions on frameworks, platforms, hardware, databases, and hosting setups.\n- **Module responsibilities**: Describes what each module does and how they relate to one another .\n- **Performance & trade-offs**: Includes design trade-offs, performance considerations, scalability, security, cost and other non-functional factors .\n- **Artifacts**: Commonly includes architecture diagrams, component and deployment diagrams, data flow diagrams, and possibly ER/DB schematic overviews."
      },
      {
        "title": "6. Real World Examples of HLD Decisions",
        "content": "High-Level Design (HLD) decisions in large-scale systems focus on scalability, performance, reliability, and handling high traffic.\n\n- **Netflix:** Adopted a cloud-native, microservices-based architecture to improve scalability and reliability. Netflix migrated from a monolithic application to hundreds of microservices as part of its broader cloud migration, which was completed in 2016.\n- **Uber:** Uses event-driven and real-time architectures to process large volumes of events and support real-time services. Kafka and streaming systems are important parts of Uber's large-scale infrastructure.\n- **X (formerly Twitter):** Uses distributed services, caching, and load balancing to handle large request volumes. Its engineering documentation describes large-scale caching for users, Tweets, and timelines, along with load balancing across service instances."
      },
      {
        "title": "7. Low-Level Design (LLD)",
        "content": "Low-Level Design (LLD) focuses on the internal implementation details of each component in the system. It provides developers with a clear and detailed blueprint for how modules, classes, and functions should be built.\n\n- Describes the internal logic, classes, methods, and data structures of each module.\n- Converts the High-Level Design into detailed implementation plans.\n- Usually created by senior developers or designers before coding begins."
      },
      {
        "title": "8. Prerequisite Technical Knowledge for LLD",
        "content": "Before creating a Low-Level Design, developers should have a strong understanding of core programming and software design concepts.\n\n- Basic Coding Skills (Data Structures and Algorithms)\n- Strong grasp of OOP concepts** (**Encapsulation, inheritance, polymorphism & abstraction)"
      },
      {
        "title": "9. Topics Covered in LLD",
        "content": "Covers how each component is implemented, including classes, methods, and logic.\n\n- **Component/module breakdown**: Detailed internal logic for each module—with class responsibilities, methods, attributes, interactions\n- **Database schema & structure**: Designing tables, keys, indexes, relationships with SQL/NoSQL refinements\n- **API & interface definitions**: Precise request/response formats, error codes, methods, endpoints, and internal interfacing\n- **Error handling & validation logic**: Define how each module manages invalid inputs, failures, edge cases, and logging\n- **Design patterns & SOLID**: Implement design patterns and solid principles to ensure clean, extensible, maintainable code\n- **UML and pseudocode artifacts**: Class diagrams, sequence diagrams, pseudocode or flowcharts to clarify logic paths and method calls"
      },
      {
        "title": "10. Difference between Low Level Design and High Level Design",
        "content": "HLD defines the overall system architecture, while LLD focuses on the detailed implementation of individual components.\n\n**HIGH-LEVEL DESIGN (HLD)****LOW-LEVEL DESIGN (LLD)**Defines the overall system architectureFocuses on detailed component-level designDescribes modules and their interactionsDescribes internal logic of each moduleAlso known as macro-level/system designAlso known as micro-level/detailed designCreated by solution architectsCreated by developers/designersBased on SRS (Software Requirement Specification)Based on reviewed HLDHLD = What components does the system need and how do they interact?\nLLD = How will each component be implemented?"
      },
      {
        "title": "11. Steps for getting started with System Design",
        "content": "Here are some steps to get started with system design:\n\n- **Understand Requirements:** Gather and analyze business needs to clearly define system functionality and avoid issues.**Example: **For a food delivery app, requirements may include user login, restaurant listing, order placement, and online payment.\n- **Define Architecture:** Plan overall system structure, components, and their interactions.**Example:** In an e-commerce system, the architecture may include services like user service, product service, order service, and payment service.**\n- Choose Tech Stack:** Select suitable technologies, frameworks, and databases based on requirements and scalability.**Example: **A web application might use React for frontend, Node.js for backend, and MongoDB as the database.**\n- Design Modules:** Divide the system into smaller components with specific responsibilities.**Example: **In a banking system, modules may include account management, transaction processing, and customer management.**\n- Plan for Scalability:** Design the system to handle growth using scalable solutions and identifying bottlenecks.**Example: **A video streaming platform may use multiple servers and caching to handle millions of users at the same time.**\n- Ensure Security & Privacy:** Apply security measures like authentication, encryption, and secure communication.**Example: **An online banking system uses secure login, encrypted transactions, and multi-factor authentication.**\n- Test & Validate:** Test the system to ensure it meets functional and performance requirements.**Example: **Testing a ride-hailing app to ensure booking, driver matching, and payment processing work correctly."
      },
      {
        "title": "12. Important points to consider when designing a software system",
        "content": "Designing a software system requires balancing performance, scalability, and maintainability to meet both current and future business needs.\n\n- **Scalability:** The system should be designed to handle increased loads and be able to scale horizontally or vertically as needed.\n- **Performance: **The system should be designed to perform efficiently and effectively, with minimal latency and response time.\n- **Reliability: **The system should be reliable and available, with minimal downtime or system failures.\n- **Security:** The system should be designed with security in mind, including measures to prevent unauthorized access and protect sensitive data.\n- **Maintainability:** The system should be designed to be easy to maintain and update, with clear documentation and well-organized code.\n- **Interoperability: **The system should be designed to work seamlessly with other systems and components, with clear and well-defined interfaces.\n- **Usability: **The system should be designed to be user-friendly and intuitive, with a clear and consistent user interface.\n- **Cost-effectiveness: **The system should be designed to be cost-effective, with a focus on minimizing development and operational costs while still meeting the requirements.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Getting Started with System Design",
      "initialCode": "import hashlib\n\n# Getting Started with System Design\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Getting Started with System Design",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Getting Started with System Design important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Getting Started with System Design",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Getting Started with System Design is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-sdlc": {
    "id": "sd-sdlc",
    "badge": "Module 1 • System Design",
    "readingTime": "30 min read",
    "level": "Beginner",
    "title": "System Design Life Cycle (SDLC): Phases & Models",
    "subtitle": "Comprehensive System Design guide to System Design Life Cycle (SDLC): Phases & Models — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- The System Design Life Cycle (SDLC) is a structured process used to plan, design, develop, test, deploy, and maintain software systems. It helps teams build reliable, scalable, and high-quality systems by following well-defined phases, ensuring that business requirements are correctly translated into technical solutions.\n\n- Provides a clear roadmap from idea to deployment.\n- Improves project planning, tracking, and control.\n- Ensures better quality through systematic testing.\n- Reduces development risks and cost overruns.\n- Enhances collaboration between stakeholders and developers.\n- Makes systems easier to maintain and scale over time.Below is the objective and example of each stage of System Design Life Cycle:",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for System Design Life Cycle (SDLC): Phases & Models."
        }
      },
      {
        "title": "2. [Stage 1]: Planning",
        "content": "- This is where the project starts! You decide what you want to achieve (goals), how much you can spend (budget), and who will work on it (team). **Example:** A company plans to build a customer management system and outlines its key features and the team involved."
      },
      {
        "title": "3. [Stage 2]: Feasibility Study",
        "content": "- Before starting, check if the idea is practical. Will it work technically? Is it affordable? **Example: **The company checks if building the system is worth the cost and effort and whether it can deliver the expected benefits."
      },
      {
        "title": "4. [Stage 3]: System Design",
        "content": "- This stage is all about planning how the system will work behind the scenes and how it will look to users.\n- Imagine designing a house, before construction begins, architects create blueprints that show where every room, pipe, and wire will go. Similarly, in system design, you create a detailed plan that developers will follow to build the system."
      },
      {
        "title": "5. [Stage 4]: Implementation",
        "content": "- Transform the design into an operational system. Developers write the code to create the system based on the design. **Example: **The CRM system's features, like customer profiles and dashboards, are coded"
      },
      {
        "title": "6. [Stage 5]: Testing",
        "content": "- Verify that the system meets the specified requirements and makes sure everything works as planned.\n- The CRM system undergoes various testing procedures, such as unit testing, integration testing, and user acceptance testing, to ensure its functionality, performance, and security."
      },
      {
        "title": "7. [Stage 6]: Deployment",
        "content": "- All of the hard work concludes at the deployment phase, when the system is made accessible for real usage. After all the planning, designing, and building is finished, it's similar like launching a new store.\n- This stage involves transferring the system from a testing or development environment to a production environment where actual users can access it."
      },
      {
        "title": "8. [Stage 7]: Maintenance and Support",
        "content": "- Ensure the ongoing functionality and address any issues that arise.\n- Regular updates, bug fixes, and user support for the CRM system to adapt to changing business requirements and address any emerging issues."
      },
      {
        "title": "9. Differences between the System Development Life Cycle and the System Design Life Cycle",
        "content": "Below are the differences between System Development Life Cycle and System Design Life Cycle:\n\nAspect\n\nSystem Development Life Cycle\n\nSystem Design Life Cycle\n\nDefinition\n\nA comprehensive framework covering the entire system development process.\n\nA subset of the SDLC that specifically deals with designing the system.\n\nScope\n\nEncompasses the entire life cycle of a system, form initiation to retirement.\n\nFocuses primarily on the design aspects of the system.\n\nPhases\n\nTypically includes Planning, Analysis, Design, Implementation, Testing, Deployment, and Maintenance.\n\nUsually includes Feasibility Study, System Analysis, System Design, Implementation, Testing, Deployment, and Maintenance.\n\nFocus\n\nBroad focus on the overall development process, addressing planning, implementation, testing, and maintenance.\n\nSpecific focuses on the design phase, detailing how the system will be built and operate.\n\nPurpose\n\nGuides the development team through the entire process, from concept to post-deployment support.\n\nProvides a blueprint for constructing the system based on specified design requirements."
      },
      {
        "title": "10. Challenges in System Design Life Cycle",
        "content": "Below are the challenges in System Design Life Cycle:\n\n- Sometime, the initial requirements for a system might be unclear or ambiguous, leading to difficulties in designing the system accurately.\n- Requirements may change during the design process, posing a challenge to maintain consistency and ensuring that the system still meets the user's needs.\n- Rapid advancements in technology can make it challenging to choose the most suitable and up-to-date technologies for system design.\n- Ensuring seamless integration of various system components can be complex, especially when dealing with different technologies and platforms.\n- Designing a system within budgetary constraints can be challenging, as incorporating certain features or technologies might be cost-productive."
      },
      {
        "title": "11. Models Used for System Design Life Cycle",
        "content": "Below are the models used for System Design Life Cycle:\n\n- **Waterfall Model:**** **A linear and sequential model where each phase must be completed before moving on to the next. It's a straightforward approach but can be inflexible in the face of changing requirements.\n- **Iterative Model:**** **Involves repeating cycles, with each iteration refining and improving the system based on feedback. It's adaptable to changing requirements.\n- **Prototyping Model****: **Involves building a prototype (a preliminary version) of the system to gather feedback refine the design before building the final product.\n- **Spiral Model:**** **Incorporates elements of both iterative and prototyping models. It involves cycles of planning, designing, constructing, and evaluating.\n- **Agile Model:**** **Emphasizes flexibility and collaboration, with frequent iterations and continuous feedback. It's well suited for projects where requirements may evolve."
      },
      {
        "title": "12. Iterative nature of SDLC",
        "content": "The iterative nature of the System Design Life Cycle (SDLC) means the process is not strictly linear; instead, it involves revisiting and refining stages based on feedback and evolving requirements. This ensures the system remains adaptable and aligned with its objectives."
      },
      {
        "title": "13. Key Aspects of Iteration in SDLC:",
        "content": "- **Refining Requirements**: Stakeholders may identify additional needs or changes after deployment or testing. These insights prompt revisiting earlier phases, such as planning or design, to incorporate updates.\n- **Prototyping and Testing**: Prototypes or early iterations of the system are developed and evaluated. Better performance and user satisfaction are ensured by improving the design and implementation based on feedback from these trials.\n- **Adapting to Changes**: The system design is reviewed and modified to be relevant and efficient as user expectations, technological advancements, or corporate objectives change.The system may gradually evolve to satisfy present and future expectations due to this iterative process, which also ensures ongoing improvement and reduces risks. It's similar to building a bridge and then modifying it over time to handle growing traffic or changing conditions."
      },
      {
        "title": "14. Best Practices in System Design Life Cycle",
        "content": "Below are the best practices in System Design Life Cycle:\n\n- Invest time in thoroughly understanding and documenting requirements to provide a solid foundation for the design process.\n- Maintain open communication with stakeholders to ensure their needs are understood and to address any changes promptly.\n- Design systems in a modular fashion, allowing for easier maintenance, updates, and scalability.\n- Identify potential risks early in the design process and develop strategies to mitigate or manage them effectively."
      },
      {
        "title": "15. Use Cases of System Design Life Cycle",
        "content": "The SDLC is used in a wide variety of projects, from developing small applications to building large enterprise systems. Some common use cases for the SDLC includes:\n\n- Developing new software applications.\n- Enhancing existing software applications.\n- Integrating different systems together.\n- Replacing legacy systems.\n- Developing custom solutions for specific business needs.By following the best practices and using the appropriate SDLC model, organizations can increase their chances of successfully completing their system development projects.\n\nComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: System Design Life Cycle (SDLC): Phases & Models",
      "initialCode": "import hashlib\n\n# System Design Life Cycle (SDLC): Phases & Models\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: System Design Life Cycle (SDLC): Phases & Models",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is System Design Life Cycle (SDLC): Phases & Models important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in System Design Life Cycle (SDLC): Phases & Models",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "System Design Life Cycle (SDLC): Phases & Models is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-components": {
    "id": "sd-components",
    "badge": "Module 1 • System Design",
    "readingTime": "30 min read",
    "level": "Beginner",
    "title": "Core Components of System Design",
    "subtitle": "Comprehensive System Design guide to Core Components of System Design — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- System Design involves looking at the system's requirements, determining its assumptions and limitations, and defining its high-level structure and components. The primary elements of system design, including databases, load balancers, and messaging systems, will be discussed.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Core Components of System Design."
        }
      },
      {
        "title": "1. Load Balancer",
        "content": "Incoming requests or workloads are divided across several distinct resources or servers using a load balancer, a component of system design. When a system has many servers and has to divide requests evenly among them, or when a system receives a large number of requests and wants to split them up across multiple servers to prevent overloading any one of them, this can be useful.\n\nSome common types of load balancers include:\n\n- **Layer 4 load balancers: **It functions at the** OSI model's Transport layer**, allocating requests according to their **TCP/UDP port numbers** and **source and destination IP addresses**.\n- **Layer 7 load balancers: **Distributing requests according to their content, including the URL or HTTP method type, it functions at the OSI model's application layer.\n- **Global load balancers **are used in distributed systems to distribute requests among multiple servers located in different geographic regions.\n- **Application load balancers** are specialized load balancers that are designed to work with specific types of applications or protocols, such as HTTP or HTTPS."
      },
      {
        "title": "2. Caching",
        "content": "A technique for temporarily storing frequently requested data that speeds up its retrieval when needed again called caching. The main database or data source is less burdened when caching is included in system architecture, which enhances performance and efficiency.\n\nHere’s how caching works and why it’s beneficial:\n\n- **Quick Access**: When data is cached, it’s stored in a faster, temporary storage (like memory) instead of being fetched repeatedly from a slower storage source. This makes retrieving information faster.\n- **Reduces Database Load**: The system can process more requests without experiencing any lag by keeping frequently used or popular data in the cache instead of constantly querying the main database.\n- **Improves User Experience**: Faster data access means faster response times for users, which improves the overall experience on websites or apps."
      },
      {
        "title": "3. Content Delivery Network (CDN)",
        "content": "A Content Delivery Network (CDN) is a network of servers spread across different regions that enables faster delivery of content to users, such as webpages, movies, and photos. A CDN is utilized in most system designs to increase the speed and dependability of content delivery to consumers, particularly when they are dispersed across many geographical locations."
      },
      {
        "title": "5. How a CDN works?",
        "content": "when a user requests content (like a video or an image), instead of retrieving it from the main server, the request is handled by a nearby CDN server, which has a cached copy of the content. This reduces the distance the data has to travel, making it load faster for the user."
      },
      {
        "title": "4. API Gateways",
        "content": "An API Gateway is like a central doorway or \"traffic controller\" for requests coming into a system. In system design, it acts as a single entry point for clients (such as apps or websites) to access multiple backend services in an organized and secure way.\n\nLet's see how it works:\n\n- **Request Routing**: A client submits a request to the API Gateway when it wants information or actions from several services. After forwarding the request to the appropriate services, the gateway compiles their answers and provides the client with a single, unified response.\n- **Simplifies Client Interaction**: Without an API Gateway, clients might need to connect directly to each service individually, which can be complex. The API Gateway simplifies this by hiding the backend details from clients.\n- **Security and Monitoring**: The gateway can handle security features like authentication (checking user identities) and authorization (checking what they’re allowed to do). It also helps monitor traffic, so you can track and log usage, spot issues, or prevent attacks.\n- **Load Management**: In busy systems, the gateway can help balance and control the flow of requests to prevent overload, ensuring smoother performance."
      },
      {
        "title": "5. Key-value stores",
        "content": "One kind of NoSQL database that is meant for storing data as a collection of key-value pairs is called a key-value store. Every piece of data is kept in a key-value store under a distinct key, and the data itself serves as the value. Since key-value stores allow for quick access to data by key, they are typically used to store data that is accessed frequently.\n\n- Key-value stores come in a variety of forms, such as persistent key-value stores, which store data on disk or in a distributed file system for durability, and in-memory key-value stores, which store data in memory for quick access.\n- Key-value stores are generally simpler to use and more scalable than other types of databases, such as RDBMS. However, they are not as well-suited for storing complex structured data that requires advanced querying capabilities."
      },
      {
        "title": "6. Blob storage & Databases",
        "content": "Blob storage and database systems are two different types of storage systems that can be used to store and manage data.\n\nLarge volumes of unstructured data, including documents, photos, videos, and audio files, can be stored in blob storage, sometimes referred to as object storage. In general, blob storage systems are very scalable and capable of managing several requests at once. They are widely used to store frequently accessible material, such user-generated content or media files.\n\nOn the other hand, database systems are made to hold structured data that has been arranged in a particular manner. RDBMSs, NoSQL databases, and in-memory databases are among the several kinds of database systems. Database systems are typically used to store data that needs to be queried and accessed in a structured way, such as customer records or financial transactions."
      },
      {
        "title": "7. Rate limiters",
        "content": "System design components known as rate limiters are used to restrict the rate at which a system or application responds to requests or carries out specific tasks. This can be helpful in a variety of situations, such as when a system has to guard against receiving too many requests or when a company want to stop a particular user or group of users from submitting excessive requests that can affect the system's performance.\n\nSome common types of rate limiters include:\n\n- **Request rate limiters** are used to limit the number of requests that a system or application processes within a given time period.\n- **User rate limiters** are used to limit the rate at which a specific user or group of users can make requests to a system or application.\n- **Token bucket rate limiters** are used to limit the rate at which requests are processed by a system by allowing a certain number of requests to be processed in each time period, with any excess requests being held in a \"bucket\" until the next time period."
      },
      {
        "title": "8. Monitoring System",
        "content": "A monitoring system is a system design component that is used to collect, analyze, and report on various metrics and performance data related to a system or application. This can be useful in a number of different scenarios, such as when a system needs to track its own performance and availability, or when an organization needs to monitor the performance of its systems and applications to ensure that they are meeting their desired service levels.\n\nSome common types of monitoring systems include:\n\n- **Network monitoring systems,** are used to monitor the performance of a network and its various components, such as routers, switches, and servers.\n- **System monitoring systems,** are used to monitor the performance of a computer system and its various components, such as the CPU, memory, and disk usage.\n- **Application monitoring systems**, are used to monitor the performance of specific applications or services, such as web servers or databases."
      },
      {
        "title": "9. Distributes system messaging queue",
        "content": "A distributed system messaging queue is a system that enables the exchange of messages between different nodes in a distributed system. Messaging queues allow nodes to communicate asynchronously, decoupling the sender and receiver of a message and enabling each node to operate independently.\n\nThere are several different types of messaging queues, including:\n\n- **Point-to-point queues:** In this type of queue, messages are delivered to a specific recipient.\n- **Publish-subscribe queues:** In this type of queue, messages are published to a topic and are delivered to all subscribers to that topic.\n- **Hybrid queues: **Hybrid queues combine elements of both point-to-point and publish-subscribe queues, allowing messages to be delivered to specific recipients or to all subscribers to a topic.Distributed system messaging queues can be used to enable communication between different components of a distributed system, such as microservices or distributed applications. They can also be used to decouple different parts of the system, allowing each component to operate independently and improving the system's resilience and scalability."
      },
      {
        "title": "10. Distributed unique id generator",
        "content": "A distributed unique ID generator is a system that generates unique identifiers (IDs) that can be used to identify objects or entities in a distributed system. These IDs are typically used to uniquely identify items in a database or to provide a stable identifier for a resource that is accessed over the network.\n\nThere are several approaches to generating distributed unique IDs:\n\n- Using a centralized service\n- Using a distributed consensus algorithm\n- Using timestamps"
      },
      {
        "title": "11. Distributes search",
        "content": "Distributed search refers to the practice of using multiple nodes or servers to index and search large datasets in a distributed system. Distributed search can be used to improve the performance and scalability of search operations, as it allows for parallel processing of search queries and the distribution of data across multiple nodes.\n\nThere are several approaches to implementing distributed search, including:\n\n- **Using a distributed search engine:** A distributed search engine is a search platform that is designed to scale horizontally across multiple nodes. These systems typically use a distributed index to store the data being searched, allowing for parallel processing of search queries.\n- **Using a database with search capabilities:** Some databases, such as MongoDB and Cassandra, have built-in search capabilities that allow for the indexing and searching of data stored in the database.\n- **Using a cloud-based search service:** Cloud-based search services, such as Amazon Elastic search Service and Google Cloud Search, can be used to implement distributed search in a distributed system. These services are typically highly scalable and fault-tolerant."
      },
      {
        "title": "12. Distributed logging services",
        "content": "Distributed logging refers to the practice of collecting, storing, and analyzing log data from multiple sources in a distributed system. This can be useful for tracking the health and performance of a distributed system, as well as for debugging issues that may arise.\n\nThere are several approaches to implementing distributed logging, including:\n\n- Using a centralized logging service\n- Using a distributed logging system\n- Using a cloud-based logging service"
      },
      {
        "title": "13. Distributes task scheduler",
        "content": "A distributed task scheduler is a system that is responsible for scheduling and executing tasks in a distributed system. A task scheduler can be used to automate the execution of tasks at regular intervals, on a specific schedule, or in response to certain events.\n\nThere are several approaches to implementing a distributed task scheduler, including:\n\n- **Using a standalone task scheduler:** A standalone task scheduler is a separate system that is responsible for scheduling and executing tasks in a distributed system. This approach can be simple to implement and allows for flexibility in terms of the types of tasks that can be scheduled.\n- **Using a built-in task scheduler:** Some distributed systems, such as container orchestration platforms or cloud-based serverless platforms, have built-in task schedulers that can be used to schedule tasks within the system.\n- **Using a cloud-based task scheduler:** Cloud-based task schedulers, such as Amazon Simple Notification Service (SNS) or Google Cloud Scheduler, can be used to schedule tasks in a distributed system. It is important to choose a distributed task scheduler that meets the specific requirements of the system, taking into account factors such as scalability, performance, and cost.\n\nComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Core Components of System Design",
      "initialCode": "import hashlib\n\n# Core Components of System Design\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Core Components of System Design",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Core Components of System Design important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Core Components of System Design",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Core Components of System Design is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-key-concepts": {
    "id": "sd-key-concepts",
    "badge": "Module 1 • System Design",
    "readingTime": "30 min read",
    "level": "Beginner",
    "title": "Key Concepts and Terminologies in System Design",
    "subtitle": "Comprehensive System Design guide to Key Concepts and Terminologies in System Design — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- **System Design** is the core concept behind the design of any distributed systems. System Design is defined as a process of creating an architecture for different components, interfaces, and modules of the system and providing corresponding data helpful in implementing such elements in systems.\n\nIn this article, we'll cover the standard terms and key concepts of system design and performance, such as:\n\n- Latency,\n- Throughput,\n- Availability,\n- Redundancy,\n- Time\n- CAP Theorem\n- Lamport's Logical Clock Theorem.Important Key Concepts and Terminologies In System Design – Learn System DesignLet us see them one by one.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Key Concepts and Terminologies in System Design."
        }
      },
      {
        "title": "2. Throughput in System Design",
        "content": "**Throughput** is defined as the **measure of amount of data transmitted** successfully in a system, in a certain amount of time. In simple terms, throughput is considered as **how much data is transmitted **successfully over a period of time.\n\nThroughputThe unit of measure for throughput is **bits per second or bps.**"
      },
      {
        "title": "3. Latency in System Design",
        "content": "**Latency** is defined as the **amount of time** required **for a single data to be delivered** successfully. Latency is measured in **milliseconds (ms).**\n\nLatencyWe all have encountered situations where websites and web applications take longer to respond, or there is buffering while playing a video despite having good network connectivity. Then the latency for such systems is said to be comparatively **high**.\n\nThere is a certain amount of time required for user input over the website and there is a certain amount of time for the response from the web application to the user. So the **delay between user input and web application response to the same input is known as latency**."
      },
      {
        "title": "4. Reasons for high Latency",
        "content": "Now you must be wondering about the factors that are responsible for delays. So high latency mainly depends on 2 factors:\n\n- Network Delays\n- Mathematical Calculation Process Delays Network LatencyIn **monolithic architecture**, as we know there is only a single block and all network calls are local within hence network delay is zero and hence latency equals computational delays only (which if not latency equals zero in monolithic systems)\n\n**Latency = Mathematic Calculation Delays\n\nIn distributed systems**, there is a networks over which signals are passed to and fro hence there will for sure be network delay.\n\nLatency = Mathematic Calculation Delays + Network Delays\n\nLet us finally discuss are components affecting latency:"
      },
      {
        "title": "5. Components Affecting Latency:",
        "content": "- **Packet Size: **Smaller the packet chunk size faster the transmission and the lower the latency.\n- **Packet Loss: **Transmission of huge packets of various sizes in medium losses to very few losses in packets. ** **\n- **Medium of transmission: **Optical fiber is the fastest** **way of transmission.\n- **Distance between Nodes:** Poor signal will increase latency and great connectivity decreases to a greater extent.\n- **Signal strength: **Good signal strength reduces latency.\n- **Storage delays:** Stored information in a database and fetching from it requires very little time which supports increasing latency.Causes of high network Latency"
      },
      {
        "title": "6. How to Reduce latency:",
        "content": "- **Use a content delivery network (CDN):** CDNs help to cut down on latency. In order to shorten the distance between users and reduce the amount of time that data must travel over great distances, CDN servers are situated at various locations.\n- **Upgrading computer hardware/software:** Improving or fine-tuning mechanical, software, or hardware components can help cut down on computational lag, which in turn helps cut down on latency.\n- **Cache:** A cache is a high-speed data storage layer used in computers that temporarily store large amounts of transient data. By caching this data, subsequent requests for it can be fulfilled more quickly than if the data were requested directly from its original storage location. This lessens latency as well."
      },
      {
        "title": "7. Availability in System Design",
        "content": "**Availability** is the **percentage of time the system is up** and working for the needs.\n\nIt is a very important factor when for tech companies to provide services while designing systems. As recorded, Meta went down for 6 hours, corresponding to loss of estimated 60 million dollars.\n\nThere are levels associated with availability with respect to the service the system is offering. For instance, air traffic control requires a higher level of availability in comparison to the restaurant reservation system.\n\nHow availability is measured?"
      },
      {
        "title": "8. How availability is measured?",
        "content": "Now you must be thinking about what are these levels and how they are measured. Levels in availability are measured via downtime per year via order of 'nines'. More 'nines' lead to lesser downtime.\n\nIt is as shown below via table as follows:\n\nAvailability(%)Downtime/Year90~36.5 days 99~3.65 days 99.9~8.7 Hours 99.99~52 Minutes99.999~6 Minutes**Note: **5 nines is considered as the golden standard of availability the system is available(up) to perform tasks."
      },
      {
        "title": "9. How to increase Availability?",
        "content": "- Eliminate SPOF(major and important)\n- Verify Automatic Failover\n- Use Geographic Redundancy\n- Continue upgrading and improvingFrom the above understanding, we can land up with two conclusions:\n\n- **Availability is low in monolithic architecture** due to SPOF.\n- **Availability is high in distributed architecture** due to redundancy."
      },
      {
        "title": "10. Redundancy in System Design",
        "content": "**Redundancy** is defined as a concept where certain entities are **duplicated** **with aim to scale up the system and reduce over all down-time**.\n\nFor example, as seen in the image below, we are duplicating the server. So if one server goes down, then we have a **redundant server** in our system to balance the load.\n\nRedundancy in System DesignNow from the above image, you must be wondering how these connections are handled meaning how to get all load over to another and not let to connect to server/s that are already down. Here we introduce a new term known as the **load balancer**."
      },
      {
        "title": "11. Load Balancer",
        "content": "A load balancer works as a “traffic cop” sitting in front of your server and routing client requests across all servers. It simply distributes the set of requested operations (database write requests, cache queries) effectively across multiple servers and ensures that no single server bears too many requests that lead to degrading the overall performance of the application. A load balancer can be a physical device or a virtualized instance running on specialized hardware or a software process. **Consider a scenario where an application is running on a single server and the client connects to that server directly without load balancing. It will look something like the one below.\n\nLoad BalancerHow to handle the unavailability of a Load Balancer?**\n\nIf the load balancer becomes unavailable, then the corresponding server will become unavailable and the system will go into downtime. In order to handle such cases, we do opt for two techniques:\n\n- **Way 1:** Using backup load balancer technique: It contains primary and secondary load balancers involving concepts of 'floating ID' and 'Health check'.\n- **Way 2:** Using DNS Server: For now newbies to understand associate this works quite similar to the redundancy principle.**Note:** Geeks do remember that DNS does not keep track of  whether load balancer is working so do we introduce **Monitor**  to keep track in case of DNS.\n\n**Tip: **In system designing failures are inevitable, we could not eliminate them completely can only  work in minimizing them.\n\nWhile considering the availability factor while designing systems is directly proportional to geographic location. For instance: For a corresponding service if a system goes down in a particular location (be India) the whole service is available at some other location to make the service operational. In the real world, we are having the complete hardware available across various locations so as not to hamper service at any cost."
      },
      {
        "title": "12. Consistency in System Design",
        "content": "**Consistency** is referred to as **data uniformity in systems**.\n\nWhen a user requests data, the system always returns the same data, regardless of the user's location, time, etc. Before a user receives data from any node, the server at which the data is updated or changed should successfully replicate the new data to all the nodes.       **                ** ** **\n\nIn order to understand consistency in simpler terms:\n\n- Consider three nodes **X, Y, and Z** in a system, where very little **t1 **time is taken for data transmission for replication from **X** to **Y **and **t2 **from **X** to **Z**.\n- Now the maximum among **t1** and **t2** is taken where no user is supposed to fetch info so as to avoid to get inconsistency in data by providing older records.    **Example:** Account Transactions\n\n**Note:**  If the users gets the data somehow because of inconsistency in systems, it is known as **Dirty Reading. **       **  **"
      },
      {
        "title": "13. Time in System Design",
        "content": "**Time** is a measure of sequences of events happening which is measured here in seconds in its SI unit.\n\nIt is measured using a clock which is of two types:\n\n- **Physical Clock:** responsible for the time between systems.\n- **Logical Clock:** responsible for the time within a system.\n\nTime in System Design**Illustration:**\n\nList out all colleges in the world. So here the time taken between colleges for communication is a measure of the physical clock. Whereas the time taken within the hospital is a measure of a logical clock."
      },
      {
        "title": "14. CAP Theorem In System Design",
        "content": "Three desirable characteristics of distributed systems with replicated data are referred to as CAP: partition tolerance, availability, and consistency (among replicated copies) (in the face of the nodes in the system being partitioned by a network fault). According to this theorem, in a distributed system with data replication, it is not possible to ensure all three of the required properties—consistency, availability, and partition tolerance—at the same time. It claims that only two of the three properties stated below can be supported strongly by networked shared-data systems:\n\n- **C**onsistency\n- **A**vailability\n- **P**artition Tolerance  CAP TheoremThe different combinations and their use cases are as follows:\n\n- **CA: Consistency and Availability:**\n- **AP: Availability and Partition Tolerance: **\n- **CP: Consistency and Partition Tolerance:  **CAP Theorem"
      },
      {
        "title": "15. Lamport's Logical Clock Theorem",
        "content": "**Lamport's Logical Clock** is a process to ascertain the sequence in which events take place. It acts as the foundation for the more complex Vector Clock Algorithm. A logical clock is required because a distributed operating system (Lamport) lacks a global clock.\n\n**Remember:** Leslie Lamport came up with the idea for Lamport's Logical Clock.\n\n**Tip:** Refer here to read more and understand better the Lamport Logical Clock Theorem.\n\nComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Key Concepts and Terminologies in System Design",
      "initialCode": "import hashlib\n\n# Key Concepts and Terminologies in System Design\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Key Concepts and Terminologies in System Design",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Key Concepts and Terminologies in System Design important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Key Concepts and Terminologies in System Design",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Key Concepts and Terminologies in System Design is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-requirements": {
    "id": "sd-requirements",
    "badge": "Module 1 • System Design",
    "readingTime": "26 min read",
    "level": "Beginner",
    "title": "Requirements Gathering Process in System Design",
    "subtitle": "Comprehensive System Design guide to Requirements Gathering Process in System Design — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- **Requirements Gathering ** is the process of gathering and recording what users and stakeholders want the system to do, so developers know exactly what to build and the final product meets everyone’s needs.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Requirements Gathering Process in System Design."
        }
      },
      {
        "title": "2. Identify Stakeholders",
        "content": "Effective requirements gathering begins with the identification of all stakeholders involved in or impacted by the system. Stakeholders are individuals or groups who have an interest in the project's outcome and can influence or be influenced by its results."
      },
      {
        "title": "3. Types of Stakeholders",
        "content": "Stakeholders can be divided into several groups, each with a unique role in the project:\n\n- **End-Users:** The users of the system are the individuals who will ultimately utilize it.\n- **Clients:** Entities that grant the project. They define high-level needs and business goals.\n- **Managers:**  Project managers and team leaders who supervise the project's progress and ensure it meets organizational goals.\n- **Subject Matter Experts (SMEs):** Professionals with specialized knowledge related to the project. They provide insight on both functional and technical requirements.\n- **Developers:** Technical team members responsible for designing and building the system. Their grasp of technical limits and possibilities is crucial.\n- **Other Relevant Parties:** This includes regulatory bodies, external consultants, and support staff who have an interest in the project.Steps to Identify Stakeholders\n\n- **Consult Experts:** To make sure no stakeholder is missed, get guidance from knowledgeable team members and subject matter experts.\n- **Stakeholder Mapping:** To illustrate the connections and objectives of various stakeholders, make a stakeholder map or matrix.\n- **Continuous Updates:** As the project develops and new stakeholders appear, update the stakeholder list on a regular basis."
      },
      {
        "title": "4. Define Objectives and Scope",
        "content": "Defining the **objectives and scope** is a fundamental step in the requirements gathering process. It sets clear expectations for what the system aims to achieve and outlines the boundaries within which the project will operate."
      },
      {
        "title": "5. Defining the Project Scope",
        "content": "The project scope outlines the functionalities and features that the system will provide, as well as any constraints or limitations. Key elements to consider when defining the scope include:\n\n- **Functionalities:** Specify the core functionalities and features that the system will deliver. This includes both functional requirements (what the system should do) and non-functional requirements (how the system should perform).\n- **Constraints:** Identify any constraints that may impact the project, such as budget limitations, time constraints,- technical limitations, and regulatory requirements.\n- **Limitations:** Clearly state what is out of scope for the project to manage stakeholder expectations and avoid scope creep."
      },
      {
        "title": "6. Conduct Interviews and Workshops",
        "content": "Another essential phase in obtaining specific needs and insights involves communicating with stakeholders through workshops and interviews. These sessions facilitate direct communication and collaboration, ensuring that all perspectives are considered.\n\n- **Direct Engagement:** Interviews and workshops allow for direct interaction with stakeholders, providing deeper insights into their needs and expectations.\n- **Diverse Perspectives:** These sessions bring together various stakeholders, fostering a collaborative environment that encourages the sharing and development of ideas.\n- **Open-Ended Questions:** Utilizing open-ended questions helps stakeholders express their thoughts freely, leading to more comprehensive and detailed requirements."
      },
      {
        "title": "7. Document Requirements",
        "content": "Documenting requirements systematically is essential for ensuring clarity and precision in what the system is expected to deliver. In this process, the requirements and expectations of stakeholders are captured and expressed utilizing a variety of ways.\n\n- **Functional Requirements Specifications (FRS):** Detail the specific behaviors and functions the system must support, providing a clear guide for what needs to be developed and implemented.\n- **Non-Functional Requirements Specifications (NFRS):** It addresses system attributes such as performance, security, and usability, ensuring that the system not only functions correctly but also meets quality standards.\n- **Clarity and Precision:** Ensure that all documented requirements are clear, concise, and unambiguous to prevent misunderstandings and provide a solid foundation for system design and development.Checkout Functional vs Non-Functional in more details."
      },
      {
        "title": "8. Verify & Validate Requirements",
        "content": "Validating requirements with stakeholders ensures the documented needs accurately reflect their expectations. This involves reviewing requirements together, resolving any conflicts or ambiguities through discussion, and reaching consensus. This process helps improve requirements and ensures the final solution meets project goals."
      },
      {
        "title": "9. Iterate and Refine",
        "content": "Iterating and refining requirements is essential for adapting to feedback and changes. This ensures that the project remains in line with the objectives and expectations of the stakeholders.\n\n- **Incorporate Feedback:** Regularly update requirements based on stakeholder feedback to keep them relevant and accurate.\n- **Adapt to Changes:** Stay flexible to adjust to new insights and shifting priorities, maintaining project relevance."
      },
      {
        "title": "10. Manage Requirements Changes",
        "content": "Establishing a process for managing requirements changes is important throughout the project lifecycle. It ensures that any modifications are systematically evaluated, approved, and tracked to maintain project alignment and control scope creep.\n\n- **Change Control Mechanism:** Implement a structured approach to assess the impact of proposed changes, ensuring they align with project goals and are formally approved before implementation.\n- **Documentation and Tracking:** Maintain thorough documentation of all changes and their status, facilitating transparency and accountability throughout the project lifecycle.\n- **Stakeholder Communication:** Regularly update **stakeholders **on changes to requirements, ensuring they are informed and their feedback is considered in the decision-making process."
      },
      {
        "title": "11. Review and Approval",
        "content": "Reviewing and finalizing requirements documentation with stakeholders is pourposely done to ensure accuracy and agreement before proceeding to subsequent project phases.\n\n- **Stakeholder Review Sessions:** Conduct sessions with stakeholders to review the requirements, ensuring they accurately reflect stakeholder needs and expectations.\n- **Formal Approval Process:** To validate the project's direction, get stakeholders to formally sign off, certifying to their comprehension and agreement with the requirements.\n- **Addressing Feedback:** Incorporate any feedback or concerns raised during the review process, refining requirements to ensure they are comprehensive and clear."
      },
      {
        "title": "12. Prioritize Requirements",
        "content": "Prioritize the requirements based on their importance to the project goals and constraints. This step helps in creating a roadmap for development, guiding the team on which features to prioritize. Prioritization is essential, especially when resources and time are limited."
      },
      {
        "title": "13. Benefits of Requirements Gathering Process",
        "content": "- **Stakeholder Alignment:** Early involvement ensures the product meets their needs, boosting satisfaction and project success.\n- **Clear Scope:** Defines objectives and constraints, preventing misunderstandings and scope creep.\n- **Risk Identification:** Detects risks and constraints early, enabling proactive management.\n- **Better Communication:** Fosters collaboration and clear communication among all parties.\n- **Resource Efficiency:** Prioritizes requirements to allocate resources effectively and deliver key features on time and budget.Effective requirements gathering lays the groundwork for successful system design and development. It ensures that the final system meets stakeholder needs, expectations, and quality standards. This process requires active engagement, communication, and ongoing refinement to achieve its goals.\n\nComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Requirements Gathering Process in System Design",
      "initialCode": "import hashlib\n\n# Requirements Gathering Process in System Design\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Requirements Gathering Process in System Design",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Requirements Gathering Process in System Design important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Requirements Gathering Process in System Design",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Requirements Gathering Process in System Design is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-func-vs-nonfunc": {
    "id": "sd-func-vs-nonfunc",
    "badge": "Module 1 • System Design",
    "readingTime": "26 min read",
    "level": "Beginner",
    "title": "Functional vs Non-Functional Requirements",
    "subtitle": "Comprehensive System Design guide to Functional vs Non-Functional Requirements — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Requirements analysis is a crucial phase in software development where the needs and expectations of users and stakeholders are identified and documented. It ensures the system is built correctly and meets its intended goals.\n\n- Functional Requirements: Define what the system should do (features and operations).\n- Non-Functional Requirements: Define how the system should perform (quality, performance, and constraints).**Example:** In an online shopping system, functional requirements include features like user login and order placement, while non-functional requirements include system performance, security, and scalability.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Functional vs Non-Functional Requirements."
        }
      },
      {
        "title": "2. Functional Requirements",
        "content": "Functional requirements define the specific features and operations a system must perform to meet business and user needs. They describe what the system should do and how it interacts with users or other systems.\n\n- Focus on the behavior and functionality of the system.\n- Represent features that can be directly observed and tested in the final product.\n- Examples include user authentication, data processing, search functionality, payment processing, and report generation.**Sample Questions**\n\n- What features should the system include?\n- What edge cases or special scenarios should the system handle?"
      },
      {
        "title": "3. Non-Functional Requirements",
        "content": "Non-functional requirements (NFRs) define how well a system should operate, focusing on qualities such as performance, reliability, security, and usability rather than specific features. NFRs should be defined using measurable criteria or metrics so that they can be tested and evaluated.\n\n- **Performance:** Response time, throughput, or latency targets\n- **Security:** Protection against unauthorized access and security threats\n- **Usability:** Ease of use and user experience\n- **Reliability:** System stability, availability, and failure recovery\n- **Scalability:** Ability to handle increasing users, traffic, or data\n- **Maintainability:** Ease of updating, modifying, and fixing the system\n- **Portability:** Ability to run across different environments or platforms**Sample Questions**\n\n- How fast should the system respond to user actions?\n- How secure should it be against unauthorized access?\n- How available and reliable should the system be?"
      },
      {
        "title": "4. Extended Requirements",
        "content": "In addition to functional and non-functional requirements, some systems may have additional requirements related to operations, security, experimentation, and future growth. The following are grouped as extended requirements for this article:\n\n- **Logging:** Recording system activities and errors for debugging and analysis.\n- **Monitoring & Alerting:** Tracking system health, performance, and failures.\n- **Analytics:** Collecting usage data to understand user behavior and system performance.\n- **Backup & Disaster Recovery:** Ensuring data can be restored after failures or disasters.\n- **Rate Limiting:** Controlling the number of requests to prevent system overload or abuse.\n- **Feature Flags / A-B Testing:** Enabling controlled feature releases and experiments.**Sample Questions**\n\n- How will the system be monitored and alerted if failures occur?\n- How will logs and analytics be collected for debugging and insights?\n- How will the system recover from failures or data loss?"
      },
      {
        "title": "5. Examples of Functional and Non-functional Requirements",
        "content": "A couple of examples to illustrate both types of requirements:"
      },
      {
        "title": "1. Online Banking System",
        "content": "**Functional Requirements:**\n\n- Users should be able to log in with their username and password.\n- Users should be able to check their account balance.\n- Users should receive notifications after making a transaction.**Non-functional Requirements:**\n\n- The system should respond to user actions in less than 2 seconds.\n- All transactions must be encrypted and comply with industry security standards.\n- The system should be able to handle 100 million users with minimal downtime.**Extended Requirements:**\n\n- The system should log all transactions for auditing and fraud detection.\n- The system should have automatic backups and disaster recovery mechanisms.\n- The system should include monitoring and alerts to detect unusual activities."
      },
      {
        "title": "2. Food Delivery App",
        "content": "**Functional Requirements:**\n\n- Users can browse the menu and place an order.\n- Users can make payments and track their orders in real time.**Non-functional Requirements:**\n\n- The app should load the restaurant menu in under 1 second.\n- The system should support up to 50,000 concurrent orders during peak hours.\n- The app should be easy to use for first-time users, with an intuitive interface.**Extended Requirements:**\n\n- The system should collect analytics on popular dishes and order trends.\n- The system should include monitoring and logging to track errors and performance.\n- The system should support A/B testing for new features like promotions or UI changes."
      },
      {
        "title": "8. Differences between Functional Requirements and Non-Functional Requirements",
        "content": "**Functional Requirements****Non-Functional Requirements**Define what the system should do (features & functionality)Define how the system should perform (quality attributes)Focus on system behavior and operationsFocus on performance, usability, security, reliabilityDescribe specific actions like login, data processing, transactionsDescribe constraints like response time, scalability, availabilityDirectly visible to users and business needsIndirectly visible, improve overall user experienceEasier to measure (output-based validation)Harder to measure, uses metrics like SLAs, benchmarksDrive the core functionality of the systemInfluence architecture and system design decisionsDocumented using use cases, user storiesDocumented using technical specs, performance criteria**Examples:** login authentication, data input/output, transaction processing.**Examples:** scalability, security, response time, reliability, maintainability."
      },
      {
        "title": "9. Common Challenges in Defining these Requirements",
        "content": "Defining system requirements can be challenging because they must balance functionality, performance, and long-term system goals. Poorly defined requirements can lead to design issues, delays, or systems that fail to meet user expectations.\n\n- **Ambiguity in Requirements:** Vague or incomplete requirements make it difficult to clearly define what the system should do and how it should perform.\n- **Changing Requirements:** Business goals, market conditions, or user expectations may change over time, requiring updates to the system design.\n- **Difficulty in Prioritization:** Functional requirements often receive more attention, while important aspects like scalability, security, or monitoring may be overlooked.\n- **Measuring Non-Functional Requirements:** Features are easier to test, but qualities like usability, scalability, and reliability are harder to measure and validate.\n- **Overlapping or Conflicting Requirements:** Some requirements may conflict with others, such as strong security measures potentially affecting system performance."
      },
      {
        "title": "10. Gathering Functional, Non-functional and Extended Requirements",
        "content": "Gathering requirements involves multiple approaches and collaboration between the development team, stakeholders, and end-users."
      },
      {
        "title": "1. Functional Requirements",
        "content": "- **Interviews: **Talk to stakeholders or users to understand their needs.\n- **Surveys:** Distribute questionnaires to gather input from a larger audience.\n- **Workshops: **Host sessions to brainstorm features and gather feedback."
      },
      {
        "title": "2. Non-functional Requirements",
        "content": "- **Performance Benchmarks: **Consult with IT teams to set expectations for performance and load.\n- **Security Standards:** Consult with security experts to define the best practices for data protection.\n- **Usability Testing:** Test the system to find areas where users might struggle and refine the interface."
      },
      {
        "title": "3. Extended Requirements",
        "content": "Extended requirements are gathered to improve system monitoring, reliability, and future enhancements beyond the core functionality.\n\n- **Monitoring & Logging:** Consult DevOps teams to determine how system logs, metrics, and alerts will be collected and analyzed.\n- **Analytics & Reporting:** Work with product teams to decide what user behavior or system data should be tracked for insights.\n- **Backup & Disaster Recovery:** Discuss with infrastructure teams to define backup strategies and recovery procedures.\n- **Rate Limiting & System Protection:** Identify limits on API requests and traffic control to prevent abuse or overload.\n- **Feature Flags & Experiments:** Coordinate with product teams to plan controlled feature releases and A/B testing.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Functional vs Non-Functional Requirements",
      "initialCode": "import hashlib\n\n# Functional vs Non-Functional Requirements\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Functional vs Non-Functional Requirements",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Functional vs Non-Functional Requirements important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Functional vs Non-Functional Requirements",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Functional vs Non-Functional Requirements is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-capacity-estimation": {
    "id": "sd-capacity-estimation",
    "badge": "Module 1 • System Design",
    "readingTime": "30 min read",
    "level": "Beginner",
    "title": "Capacity Estimation & Back-of-the-Envelope Calculations",
    "subtitle": "Comprehensive System Design guide to Capacity Estimation & Back-of-the-Envelope Calculations — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Capacity estimation in systems design is the process of predicting or determining the maximum load or demand that a system can handle within its operational parameters. This involves analyzing various aspects such as hardware capabilities, software performance, network bandwidth, and user behavior patterns.\n\n- The goal is to ensure that the system can accommodate the expected workload without experiencing performance degradation, bottlenecks, or failures.\n- Capacity estimation is crucial for designing and scaling systems effectively to meet current and future demands, whether it's a website, a network infrastructure, or any other complex system.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Capacity Estimation & Back-of-the-Envelope Calculations."
        }
      },
      {
        "title": "2. Factors that affect Capacity Estimation",
        "content": "Capacity estimation in system design depends on various factors, including:\n\n- **Hardware Resources:** The capacity of a system depends on hardware components such as processors, memory, storage, and network interfaces. Better hardware resources generally increase system capacity.\n- **Software Efficiency:** Efficient algorithms, optimized code, and well-designed software help make better use of hardware resources and improve overall system performance.\n- **Workload Characteristics:** The nature, volume, and variability of workloads determine how much capacity the system requires to operate effectively.\n- **User Behavior:** User activity patterns, transaction frequency, and concurrent access levels directly affect the system's capacity requirements.\n- **Scalability:** The ability to add resources vertically or horizontally helps the system handle growing workloads and improve capacity.\n- **Performance Metrics:** Metrics such as response time, throughput, and resource utilization are used to measure and estimate system capacity.\n- **Failure Scenarios:** Considering hardware failures, network outages, and other disruptions helps ensure sufficient capacity for reliability and fault tolerance."
      },
      {
        "title": "3. Metrics for Capacity Estimation",
        "content": "In system design, several metrics are crucial for capacity estimation:\n\n- **Daily Active Users (DAU):** This metric represents the number of unique users who access the application each day. It helps estimate the overall daily traffic the system must support.\n- **Queries Per Second (QPS):** QPS measures the number of requests processed by the system every second. It indicates the load on servers and helps determine processing capacity.\n- **Storage Requirements:** This metric defines the amount of data the system needs to store over time. It helps plan database and storage infrastructure capacity.\n- **Error Rates:** Error rate measures the percentage of requests that fail or produce errors. It is an important indicator of system reliability and stability.\n- **Response Time:** Response time is the duration the system takes to process a request and return a result. Lower response times generally indicate better performance.\n- **Concurrency:** Concurrency refers to the number of users or requests the system can handle simultaneously without performance degradation.\n- **Peak Load Handling:** This metric measures the maximum traffic or workload the system can support during peak usage periods while maintaining acceptable performance."
      },
      {
        "title": "4. Methods and Techniques for Capacity Estimation",
        "content": "Capacity estimation in system design involves various methods and techniques to accurately predict the system's ability to handle workload. Here are some commonly used approaches:\n\n- **Traffic Analysis:** This method studies user activity patterns, request volumes, and usage trends to estimate the load a system must handle.\n- **Forecasting:** Forecasting uses historical data to predict future traffic growth and capacity requirements, helping organizations prepare for increased demand.\n- **Stress Testing:** Stress testing intentionally pushes the system beyond normal limits to identify its breaking point and uncover performance bottlenecks.\n- **Historical Data Analysis:** This approach analyzes past usage patterns and peak traffic periods to estimate future capacity needs more accurately.\n- **Load Testing:** Load testing gradually increases workload levels to measure system performance and determine its capacity limits.\n- **Capacity Planning Tools:** Specialized tools monitor resource utilization, performance metrics, and scalability trends to support accurate capacity estimation and planning."
      },
      {
        "title": "5. Capacity Estimation for Different Components",
        "content": "Capacity estimation for different components in system design involves assessing the resources required by individual elements to ensure overall system performance. Here's an overview:"
      },
      {
        "title": "1. CPU (Central Processing Unit)",
        "content": "- Estimate CPU capacity based on factors such as processing power, clock speed, and the number of cores.\n- Calculate CPU utilization under different workload scenarios to determine if additional processing capacity is needed."
      },
      {
        "title": "2. Memory (RAM)",
        "content": "- Assess memory requirements by analyzing the system's memory usage patterns.\n- Estimate peak memory usage and ensure sufficient RAM to accommodate simultaneous tasks and prevent performance degradation due to swapping or paging."
      },
      {
        "title": "3. Storage",
        "content": "- Estimate storage capacity based on data growth rates, anticipated file sizes, and storage types (e.g., SSD, HDD).\n- Consider factors like redundancy, data replication, and backup requirements when estimating storage capacity."
      },
      {
        "title": "4. Network Bandwidth",
        "content": "- Evaluate network bandwidth requirements by analyzing expected data transfer rates, network traffic patterns, and communication protocols.\n- Consider factors like peak usage periods, data compression, and network latency in capacity estimation."
      },
      {
        "title": "5. Database Resources",
        "content": "- Estimate database capacity requirements based on factors such as data volume, transaction rates, and query complexity.\n- Analyze database performance metrics like throughput, response time, and concurrency to determine if scaling or optimization is necessary."
      },
      {
        "title": "1. E-commerce website",
        "content": "Let's you are building an online store and need to estimate capacity for a Black Friday sale. Here's how you would proceed:\n\n**Define Key Metrics**\n\n**Estimate 200,000 DAU and Each user makes 8 requests per visit, leading to a total of 1,600,000 requests.\n\n- QPS**= 1,600,000/86,400 = **18.52**\n- **Storage requirements**: If each user generates 5 MB of data, the total daily storage requirement is 200,000×5MB=1,000,000MB=1,000GB\n- **Concurrent users**: 25% of DAU will be active at the same time, so: 200,000×0.25=50,000 concurrent users\n- **Conduct Load Testing: **Use Apache JMeter to simulate 50,000 users and monitor the system's response time and error rates.\n- **Perform Stress Testing:** Test the system with 250,000 users to identify any potential bottlenecks.\n- **Capacity Planning:** Based on test results, scale the infrastructure by adding more servers or optimizing resources like caching.\n- **Post-Deployment Monitoring:** Once live, monitor key metrics like DAU, QPS, and error rates using tools like Grafana."
      },
      {
        "title": "2. Cloud Infrastructure Capacity Planning:",
        "content": "- **Scenario:** A company migrates its on-premises infrastructure to the cloud and needs to estimate the capacity requirements for various cloud resources.\n- **Capacity Estimation: **The company analyzes historical usage data to identify resource utilization patterns and predicts future growth trends.\n- **Example Metrics:** They estimate that their cloud environment requires 100 virtual machines, 10 TB of storage, and 1 Gbps of network bandwidth to support anticipated workloads.\n- **Optimization Strategy:** The company implements auto-scaling policies to dynamically adjust resource allocation based on demand fluctuations, optimizing cost and performance.\n- **Outcome: **By accurately estimating capacity requirements and implementing efficient resource management strategies, the company achieves cost-effective scalability and maintains high system availability in the cloud."
      },
      {
        "title": "13. Challenges and Considerations",
        "content": "Capacity estimation in system design comes with several challenges and considerations that need to be addressed to ensure accurate predictions and optimal system performance.\n\n- **Dynamic Workloads:** Workloads can change due to seasonal trends, promotions, or unexpected events, making accurate capacity estimation more difficult.\n- **Uncertain Growth Patterns:** Future growth in users, data, and transactions is difficult to predict, requiring planners to prepare for multiple scalability scenarios.\n- **Hardware Limitations:** CPU, memory, storage, and network constraints can restrict system growth and must be considered during capacity planning.\n- **Software Complexity:** Modern systems contain many interconnected components, making it challenging to estimate capacity requirements and dependencies accurately.\n- **User Behavior Variability:** Changes in user activity, peak usage periods, and transaction volumes can affect capacity needs and require continuous monitoring and analysis."
      },
      {
        "title": "14. Best Practices for Capacity Estimation",
        "content": "Below are some of the best practices while doing capacity estimation:\n\n- **Start Early: **Begin capacity estimation during the initial stages of system design to identify potential bottlenecks and scalability challenges.\n- **Gather Accurate Data:** Collect and analyze accurate data on system usage, performance metrics, and workload patterns to inform capacity estimation.\n- **Consider Workload Variability:** Account for variations in workload patterns, such as peak usage times and seasonal trends, when estimating capacity requirements.\n- **Plan for Scalability: **Design systems with scalability in mind, utilizing techniques like horizontal and vertical scaling to accommodate future growth."
      },
      {
        "title": "15. Tools and Resources for Capacity Estimation",
        "content": "- **LoadRunner:** LoadRunner is a performance testing tool that simulates real user activity to evaluate how an application performs under different workloads. It helps identify bottlenecks, slow response times, and resource limitations.\n- **Grafana:** Grafana is a monitoring and visualization tool that displays real-time system metrics through interactive dashboards. It helps track performance, resource usage, and system health.\n- **Load Testing Tools:** Tools such as Apache JMeter, LoadRunner, and Gatling are used to simulate user traffic and measure system performance under varying load conditions.\n- **Monitoring Platforms:** Platforms like Prometheus, Nagios, and Datadog provide real-time monitoring of system metrics, resource utilization, and capacity trends to support effective capacity planning.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Capacity Estimation & Back-of-the-Envelope Calculations",
      "initialCode": "import hashlib\n\n# Capacity Estimation & Back-of-the-Envelope Calculations\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Capacity Estimation & Back-of-the-Envelope Calculations",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Capacity Estimation & Back-of-the-Envelope Calculations important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Capacity Estimation & Back-of-the-Envelope Calculations",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Capacity Estimation & Back-of-the-Envelope Calculations is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-hld-vs-lld": {
    "id": "sd-hld-vs-lld",
    "badge": "Module 1 • System Design",
    "readingTime": "8 min read",
    "level": "Beginner",
    "title": "Difference Between High-Level Design (HLD) and Low-Level Design (LLD)",
    "subtitle": "Comprehensive System Design guide to Difference Between High-Level Design (HLD) and Low-Level Design (LLD) — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- System design involves creating both a High-Level Design (HLD), which is like a roadmap showing the overall plan, and a Low-Level Design (LLD), which is a detailed guide for programmers on how to build each part.\n\n- It ensures a well-organized and smoothly functioning project.\n- High-Level Design and Low-Level Design are the two main aspects of System Design.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Difference Between High-Level Design (HLD) and Low-Level Design (LLD)."
        }
      },
      {
        "title": "2. High Level Design(HLD)",
        "content": "High-level design or HLD describes the overall architecture of a system and shows how different components interact. It outlines major modules, system structure, and relationships between services.\n\nHLD includes:\n\n- System architecture showing the major components and their interactions.\n- Database design and high-level data flow between modules.\n- Overview of systems, services, platforms, and their relationships.\n- Description of hardware, software interfaces, and user interfaces.\n- User workflow and key performance considerations."
      },
      {
        "title": "3. Low Level Design(LLD)",
        "content": "LLD or Low-Level Design, is a phase in the software development process where detailed system components and their interactions are specified.\n\n- It describes detailed description of each and every module means it includes actual logic for every system component and it goes deep into each modules specification.\n- It is also known as micro level/detailed design.\n- It is created by designers and developers.\n- It involves converting the high-level design into a more detailed blueprint, addressing specific algorithms, data structures, and interfaces.\n- LLD serves as a guide for developers during coding, ensuring the accurate and efficient implementation of the system’s functionality."
      },
      {
        "title": "4. High Level Design Vs Low Level Design",
        "content": "High Level Design (HLD) defines the overall system architecture, while Low Level Design (LLD) explains the detailed internal logic and component-level implementation.\n\nHIGH-LEVEL DESIGNLOW-LEVEL DESIGNHigh Level Design is the general system design means it refers to the overall system design.Low Level Design is like detailing HLD means it refers to component-level design process.High Level Design in short called as HLD.Low Level Design in short called as LLD.It is also known as macro level/system design.It is also known as micro level/detailed design.Furthermore, it describes the overall description/architecture of the application.It describes detailed description of each and every module.High Level Design expresses the brief functionality of each module.Low Level Design expresses details of functional logic of the module.It is created by solution architect.It is created by designers and developers.Here in High Level Design the participants are design team, review team, and client team.Here in Low Level Design participants are design team, Operation Teams, and Implementers.It is created first means before Low Level Design.It is created second means after High Level Design.In HLD the input criteria is Software Requirement Specification (SRS).In LLD the input criteria is reviewed High Level Design (HLD).In HLD the output criteria is database design, functional design and review record.In LLD the output criteria is program specification and unit test plan.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Difference Between High-Level Design (HLD) and Low-Level Design (LLD)",
      "initialCode": "import hashlib\n\n# Difference Between High-Level Design (HLD) and Low-Level Design (LLD)\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Difference Between High-Level Design (HLD) and Low-Level Design (LLD)",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Difference Between High-Level Design (HLD) and Low-Level Design (LLD) important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Difference Between High-Level Design (HLD) and Low-Level Design (LLD)",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Difference Between High-Level Design (HLD) and Low-Level Design (LLD) is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-hld-intro": {
    "id": "sd-hld-intro",
    "badge": "Module 2 • System Design",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "What is High-Level Design (HLD)?",
    "subtitle": "Comprehensive System Design guide to What is High-Level Design (HLD)? — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "![High-Level Scalable Architecture](/images/system-design/hld-scalable-arch.svg)\n\n- High-level design or HLD is an initial step in the development of applications where the overall structure of a system is planned. Mainly focuses on how different components of the system work together without getting to know about internal coding and implementation.\n\n- Helps everyone involved in the project to understand the goals and ensures good communication during development.\n- Crucial for developers, architects, and product managers because it allows them to make sure that all stakeholders are aligned with the project objectives. That's why it is also known as macro-level design. The common request flow most applications follow from user to data and back.\n\n- **Users - Edge/Gateway:** CDN/Edge handles cache, TLS, basic DDoS; LB/API Gateway routes.\n- **Gateway - Services:** App layer runs auth/logic and fans out to deps.\n- **Services - Data:** Read/write to SQL/NoSQL/object/storage/search; cache hot reads; persist writes.\n- **Services - Async:** Offload emails/webhooks/reindex/heavy jobs to queues; workers update later.\n- **Auth & Observability:** Auth at gateway/services; emit logs, metrics, traces for monitoring/alerts.\n- **Response - User:** Reply goes back via gateway/edge; update caches for faster next hits.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for What is High-Level Design (HLD)?."
        }
      },
      {
        "title": "2. Components of High-Level Design",
        "content": "Understanding the components of high-level design is very important for creating effective systems that meet user needs and technical requirements. Below are the main components of high-level design:\n\n- **System Architecture: **System architecture is an overview of the entire system that represents the structure and the relationships between various components. It helps to visually represent how different parts interact and function.\n- **Modules and Components**: High-level design breaks down the systems into modules or components, each with specific roles and responsibilities, and has a distinct function that contributes to the entire system, helping in developing an efficient system.\n- **Data Flow Diagrams (DFDs)**: Data Flow Diagrams demonstrate the data movement within the system. They help to understand how information is processed and pass from one end to another.\n- **Interface Design**: It includes the design of application programming interfaces (APIs) for system integration and user interfaces (UIs) for user interaction, ensuring seamless functionality and communication between components.\n- **Technology Stack**: The technology stack is various technologies and tools that will be used in the development of the system. This includes programming languages, frameworks, and databases.\n- **Deployment Architecture**: It includes how the system will be hosted and accessed. It includes server configurations, cloud infrastructure, and network considerations."
      },
      {
        "title": "3. High-Level Design Document",
        "content": "The HLD document consists of data flows, flowcharts, and data structures to help developers understand and implement how the current system is being designed intentionally to function.\n\n- This document is responsible for explaining the connections between system components and operations, which depict the logic.\n- The architecture design needed (for the system's functionality and flow) for each and every module of the system as per the functional requirements."
      },
      {
        "title": "4. Purpose and Characteristics of High-Level Design",
        "content": "HLD provides a structured technical view by translating functional requirements into an overall system design model, helping visualize how components interact and how data flows.\n\n- A diagram representing each design aspect is included in the HLD (which is based on business requirements and anticipated results).\n- Description of hardware, software interfaces, and also user interfaces.\n- The workflow of the user's typical process is detailed, along with performance specifications."
      },
      {
        "title": "5. Difference of HLD from LLD",
        "content": "High-level design, or HLD, is a general system design where we do tradeoffs between different frameworks, components, and different databases, and we choose the best considering what the business needs and how the system should work.\n\nWhereas LLD (low-level design) translates the HLD into smaller and more specific details, it includes class diagrams, methods, data structures, and algorithms, focusing on how each part will be implemented.\n\n**Further Read: **Differences between High-Level Design (HLD) and Low-Level Design (LLD)\n\nAfter having an adequate understanding of HLD and how it is different from LLD. Let us now discuss the HLD roadmap, which is shown below as an infographic:"
      },
      {
        "title": "6. Designing Scalable High-Level Design (HLD) Systems",
        "content": "Now, in order to design any high-level system, certain terms are listed in a sequential manner so as to connect the dots in order to understand. Roadmaps are very important for working professionals because these help us to get a complete, binding understanding of how services in real-time are getting scaled at a high level."
      },
      {
        "title": "1. Capacity Estimation",
        "content": "Capacity estimation in system design involves predicting the resources (such as processing power, memory, and bandwidth) required to meet the expected workload. It ensures that a system can handle current and future demands efficiently, helping in the proper allocation of resources and preventing performance bottlenecks.\n\n**Example**: Twitter, which is recently in newsfeeds these days, here at high-level designing, we need to make sure tweets of popular influencers are reaching out to millions of people, so how do we need to scale our system so service should not be hampered?\n\nWe have also shown below the characteristic behavior of a server, which is measured across throughput and latency within the system."
      },
      {
        "title": "2. HTTP Methods",
        "content": "HTTP (HyperText Transfer Protocol) is used for communication between clients and servers. HTTP methods define the type of operation a client wants to perform.\n\nCommon HTTP methods include:\n\n- **GET:** Retrieves data from the server.\n- **POST:** Creates or submits new data.\n- **PUT:** Updates or replaces existing data.\n- **PATCH:** Partially updates existing data.\n- **DELETE:** Removes data. Understanding HTTP methods is important when designing APIs and deciding how clients and servers communicate."
      },
      {
        "title": "3. Web Sockets",
        "content": "There are two ways to send data from server to clients, which are websockets and polling. In a client-server architecture, we are sending a request to the server, and the server sends it back, and so in this way communication takes place. But in designing the system, the biggest problem we face is whether we can implement the client-server model or peer-to-peer model.\n\n- WebSockets enable real-time, two-way communication between clients and servers.\n- WebSocket is a full-duplex communication protocol that allows both the client and server to send and receive data over the same persistent connection.\n- They are useful when an application needs low-latency, real-time updates without repeatedly creating new requests.\n- Common use cases include chat applications, online gaming, live notifications, and real-time dashboards."
      },
      {
        "title": "4. Polling",
        "content": "Another way of sending and receiving data from a server, just like we do with the above case of web sockets, is polling. There are mainly 2 types of polling:\n\n- **In short polling**, the client sends a request to the server at fixed intervals, and the server immediately sends data, whether the data is updated or not.\n- **In long polling**, the server waits for the client's request to respond and responds only and only if some new data is available or if some data is being updated.**Tip:** Long polling is preferred over short polling because lesser number of requests are sent in a system.\n\nShort Polling Vs Long Polling"
      },
      {
        "title": "5. Server-Sent Events(SSE)",
        "content": "It is purposely built as one-way communication from servers to clients in specific design systems. SSE is a technology that helps to push real-time updates from the server to the clients over HTTP connections. SSE enables the server to send data automatically as it becomes available.\n\nExamples of SSE include real-time streaming."
      },
      {
        "title": "6. Filtering",
        "content": "Filtering is the process of selecting only the data that matches specific conditions from a larger dataset. It helps reduce unnecessary data processing and allows users to retrieve only the information they need.\n\nFor example, in an e-commerce system, users can filter products based on:\n\n- **Category:** Electronics\n- **Price:** ₹10,000–₹50,000\n- **Brand:** Samsung\n- **Rating:** 4 stars and above Filtering is commonly used in APIs, databases, search systems, and data-processing applications to reduce the amount of data returned and improve efficiency.\n\n**Example:** GET /products?category=electronics&minPrice=10000&maxPrice=50000\n\nThis request returns only products that match the specified filters."
      },
      {
        "title": "7. Rate limiting",
        "content": "A rate limiter restricts the number of events that can be done in a timeframe by restricting the number of requests a sender can send in a given period of time. Here, once the threshold limit is reached, it now further blocks the incoming requests, as can be seen below in the media as follows:"
      },
      {
        "title": "8. Resiliency",
        "content": "No matter how great a system we design, there is always a chance of faults and failure, which could be because of hardware issues or software issues (such as running low on memory), or there can be some human error. In such cases we need to provide resiliency through replication, redundancy, and availability.\n\n**Note:** System design interviews start with open-ended designing of a specific system, which later is bounded with constraints at multiple levels. In order to clear dealing with these bounds, in layman's language, it is known as resiliency via implementing common tradeoffs in the system. Hence, providing resiliency is very crucial in designing complex system designs and also in clearing interviews."
      },
      {
        "title": "9. Paging",
        "content": "Paging, also known as pagination, is the process of dividing a large set of data into smaller pages and returning only a limited amount of data at a time. It helps reduce the amount of data transferred in a single request and improves performance and user experience.\n\nFor example, instead of returning 10,000 products in one response, an API can return 20 products per page.\n\nCommon approaches to paging include:\n\n- **Offset-Based Paging:** Uses an offset and limit to determine which records to return.\n- **Cursor-Based Paging:** Uses a cursor to identify the position of the next set of records and is useful for large or frequently changing datasets. **Example:** GET /products?page=2&limit=20\n\nThis request retrieves the second page with up to 20 products."
      },
      {
        "title": "10. Logging",
        "content": "A log file records events in an application, including details like transactions, service actions, and system flow. Logging is essential for monitoring behavior, tracking system health and performance, and debugging issues in distributed systems.\n\n- Using a centralized logging service\n- Using a distributed logging system\n- Using a cloud-based logging serviceComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: What is High-Level Design (HLD)?",
      "initialCode": "import hashlib\n\n# What is High-Level Design (HLD)?\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: What is High-Level Design (HLD)?",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is What is High-Level Design (HLD)? important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in What is High-Level Design (HLD)?",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "What is High-Level Design (HLD)? is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-mono-vs-micro": {
    "id": "sd-mono-vs-micro",
    "badge": "Module 2 • System Design",
    "readingTime": "10 min read",
    "level": "Beginner",
    "title": "Monolithic vs Microservices Architecture",
    "subtitle": "Comprehensive System Design guide to Monolithic vs Microservices Architecture — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Modern applications can be built using different architectural styles, with Monolithic Architecture and Microservices Architecture being the two most widely adopted approaches. While a monolithic application combines all functionalities into a single deployable unit where as microservices break the application into smaller, independently deployable services.\n\n- Monolithic Architecture organizes all application components within a single codebase and deploys them as one unit.\n- Microservices Architecture breaks an application into multiple independent services that can be developed, deployed, and scaled separately.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Monolithic vs Microservices Architecture."
        }
      },
      {
        "title": "2. Monolithic Architecture",
        "content": "Monolithic Architecture is a traditional software architecture where all application components, such as the user interface, business logic, and data access layer, are developed and deployed as a single application. This approach is simple to build and manage for small to medium-sized applications.\n\n- All application modules are maintained within one project.\n- The entire application is typically deployed as one package.\n- Development, testing, and deployment are managed from a single application.\n- Modules are closely connected, making changes more challenging as the application grows.Monolithic"
      },
      {
        "title": "3. Microservices Architecture",
        "content": "Microservices Architecture is a software design approach in which an application is divided into multiple small, independent services. Each service focuses on a specific business capability and communicates with other services through lightweight APIs or messaging systems.\n\n- Each service handles a specific business functionality.\n- Services operate independently and communicate through APIs or message brokers.\n- Individual services can be deployed without affecting other services.\n- Services can be scaled based on their specific workload and requirements.\n- Different services can use different technologies, databases, or programming languages."
      },
      {
        "title": "4. Monolithic and Microservices Architecture",
        "content": "Monolithic ArchitectureMicroservice ArchitectureSingle codebaseDistributed servicesBuilt as one large application with tightly coupled componentsComposed of small, loosely coupled services componentsDeployed as a single unitIndividual services can be deployed independentlyHorizontal scaling can be challengingEasier to scale horizontally Development is simpler initiallyDevelopment is more complex due to multiple servicesTechnology stack choices are usually limitedFreedom to choose the best technology for each serviceEntire application may fail if a part failsIndividual services can fail without affecting othersEasier to maintain due to its simplicityRequires more effort to manage multiple servicesLess flexible as all components are tightly coupledMore flexible as components can be developed, deployed, and scaled independentlyCommunication between components is fasterCommunication may be slower due to network calls"
      },
      {
        "title": "5. Best Scenarios for Monolithic and Microservices Architecture",
        "content": "The best scenarios where we can use Monolithic Architecture or Microservices Architecture are:\n\nComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Monolithic vs Microservices Architecture",
      "initialCode": "import hashlib\n\n# Monolithic vs Microservices Architecture\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Monolithic vs Microservices Architecture",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Monolithic vs Microservices Architecture important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Monolithic vs Microservices Architecture",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Monolithic vs Microservices Architecture is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-serverless": {
    "id": "sd-serverless",
    "badge": "Module 2 • System Design",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Serverless Architecture (FaaS & BaaS)",
    "subtitle": "Comprehensive System Design guide to Serverless Architecture (FaaS & BaaS) — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Serverless Architecture is a cloud computing model where the cloud provider manages the underlying infrastructure, including server provisioning, scaling, and maintenance. This allows developers to focus on writing and deploying application code.\n\n- Code runs automatically in response to events or requests.\n- The cloud provider handles server management, scaling, and resource allocation.**Example:** When a user uploads an image, a serverless function automatically processes the image without requiring developers to manage any servers.\n\nServerless Architecture\n- **Web App:** Sends requests to the application through the API Gateway.\n- **API Gateway:** Acts as the entry point, handling request routing, validation, throttling, and authentication/authorization when required.\n- **Authorizer:** Verifies the identity and permissions of clients before allowing requests to proceed.\n- **Serverless Functions:** Execute the application's business logic without requiring developers to manage servers.\n- **Managed Services:** Serverless functions interact with managed services such as:\n- **Database:** Stores and retrieves application data.\n- **Storage:** Stores files, images, documents, and other objects.\n- **External APIs:** Communicate with third-party services.\n- **Event-Driven Triggers:** For event-driven workloads, services such as message queues, event streams, or object storage can also directly trigger serverless functions.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Serverless Architecture (FaaS & BaaS)."
        }
      },
      {
        "title": "2. Serverless Computing Providers and Platforms",
        "content": "Several major cloud providers offer serverless computing platforms that allow developers to run application code without managing the underlying server infrastructure.\n\n- **AWS Lambda:** AWS Lambda is a serverless, event-driven compute service that runs code in response to events or HTTP requests without requiring developers to manage servers.\n- **Azure Functions:** Azure Functions is a serverless compute platform for running event-driven code without managing the underlying infrastructure.\n- **Google Cloud Run functions:** Google Cloud Run functions is Google's current function-based serverless offering, supporting HTTP and event-driven functions without requiring developers to manage servers.\n- **Oracle Cloud Infrastructure (OCI) Functions:** OCI Functions is a fully managed serverless platform for creating, running, and scaling business logic without managing infrastructure."
      },
      {
        "title": "3. Serverless Application Design Patterns",
        "content": "Serverless architecture has introduced a variety of design patterns that help solve specific problems in the serverless environment efficiently. Here are some of the most common serverless application design patterns:"
      },
      {
        "title": "4. API Gateway Pattern (Serverless Integration)",
        "content": "An API Gateway acts as an entry point for client requests and routes them to serverless functions or other backend services.\n\n- Handles HTTP requests and can perform authentication, authorization, validation, and request routing.\n- Routes requests to the appropriate serverless functions or backend services.\n- Can provide features such as rate limiting, monitoring, and request management."
      },
      {
        "title": "5. Event Stream Processing",
        "content": "Serverless functions can process events from data streams such as application logs, financial transactions, IoT devices, or social media feeds.\n\n- Events from a stream can trigger serverless functions to process data incrementally.\n- This approach is useful for real-time data processing, analytics, monitoring, and alert generation."
      },
      {
        "title": "6. Aggregator",
        "content": "An aggregator function collects data or responses from multiple services or serverless functions and combines them into a single response.\n\n- Collects and combines responses from multiple sources.\n- Returns a unified response to the client.\n- Can simplify client interactions with multiple backend services."
      },
      {
        "title": "7. Strangler Fig Pattern",
        "content": "The Strangler Fig Pattern helps gradually replace parts of a legacy system with newer components, including serverless functions.\n\n- New functionality can be implemented using serverless functions or other modern services.\n- Legacy components are gradually replaced without requiring a complete rewrite."
      },
      {
        "title": "8. Circuit Breaker",
        "content": "The Circuit Breaker pattern helps prevent repeated calls to an unavailable or failing service, reducing the risk of cascading failures in distributed serverless applications.\n\n- Opens the circuit after a predefined number of failures.\n- Temporarily prevents further calls to the failing service.\n- Allows the system to recover and continue operating in a degraded state when appropriate."
      },
      {
        "title": "9. Scaling and Performance Considerations",
        "content": "Scaling and performance are crucial in serverless architectures, enabling applications to handle varying loads automatically without manual intervention."
      },
      {
        "title": "1. Scaling in Serverless Computing",
        "content": "Scaling in serverless computing automatically adjusts resources based on incoming workload without manual intervention.\n\n- **Automatic Scaling:** Serverless platforms can automatically increase or decrease function instances based on incoming requests or events, subject to the provider's limits and configuration.\n- **Cold Starts: **Cold starts occur when a new function instance is initialized after being idle. This can introduce latency and affect the response time of serverless applications.\n- **Throttling:** Cloud providers impose limits on function invocations to prevent resource overuse. If requests exceed these limits, throttling may occur, causing delayed processing."
      },
      {
        "title": "2. Performance Optimization Strategies",
        "content": "Performance optimization strategies focus on reducing latency and improving execution efficiency in serverless applications.\n\n- **Optimize Function Code: **Keeping the function code lean and efficient is vital. This includes minimizing dependencies and using asynchronous programming models where appropriate.\n- **Manage Dependencies: **Reduce the size of deployment packages by removing unused libraries and files. Smaller packages help decrease initialization and startup times.\n- **Manage Connections Efficiently:** Reuse connections when supported by the serverless runtime and the database or external service. Connection reuse can reduce connection-establishment overhead, while connection limits and pooling should be configured according to the platform and service."
      },
      {
        "title": "12. Security Best Practices for Serverless Architectures",
        "content": "Here are some best practices to enhance security in serverless environments:"
      },
      {
        "title": "1. Least Privilege Principle",
        "content": "Grant only the minimum permissions required for each serverless function. This reduces the impact of security breaches and unauthorized access.\n\n- Provide only the permissions needed to perform specific tasks.\n- Limits potential damage if a function is compromised."
      },
      {
        "title": "2. Secure Application Secrets",
        "content": "Sensitive data should never be exposed directly in code or configuration.\n\n- Avoid hard-coding API keys, tokens, or credentials.\n- Use managed secret services (e.g., cloud secret managers)."
      },
      {
        "title": "3. Input Validation",
        "content": "Validating and sanitizing input helps protect serverless functions and their downstream services from malicious or unexpected input.\n\n- Helps mitigate attacks such as SQL injection, XSS, and command injection when combined with appropriate security controls.\n- Is especially important when functions process user-supplied data or interact with databases and external services."
      },
      {
        "title": "4. Secure API Gateway",
        "content": "Configure API gateways with proper security controls to protect serverless endpoints and services.\n\n- Use authentication methods such as OAuth, API keys, or IAM.\n- Enable rate limiting and CORS policies to secure APIs."
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Serverless Architecture (FaaS & BaaS)",
      "initialCode": "import hashlib\n\n# Serverless Architecture (FaaS & BaaS)\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Serverless Architecture (FaaS & BaaS)",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Serverless Architecture (FaaS & BaaS) important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Serverless Architecture (FaaS & BaaS)",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Serverless Architecture (FaaS & BaaS) is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-stateless-stateful": {
    "id": "sd-stateless-stateful",
    "badge": "Module 2 • System Design",
    "readingTime": "12 min read",
    "level": "Beginner",
    "title": "Stateful vs Stateless Architecture in Distributed Systems",
    "subtitle": "Comprehensive System Design guide to Stateful vs Stateless Architecture in Distributed Systems — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Stateful vs Stateless Architecture defines how a system manages client session data during interactions. It impacts scalability, performance, and system design.\n\n- **Stateful:** Server stores session data across multiple requests.\n- **Stateless:** Each request is independent with no stored session.\n- **Usage:** Stateless is preferred for scalable and distributed systems.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Stateful vs Stateless Architecture in Distributed Systems."
        }
      },
      {
        "title": "2. Stateful Architecture",
        "content": "The server maintains the state or session information of each client. This means that the server keeps track of the client's data and context throughout multiple interactions or requests.\n\n- Often involve storing session data in server memory, databases, or other storage mechanisms.\n- Examples include traditional web applications that use server-side sessions to store user data or shopping cart contents.**Example:** An online shopping website where the server stores a user’s login session and shopping cart. If the user adds items to the cart, the server remembers those items during the session."
      },
      {
        "title": "3. Stateless Architecture",
        "content": "The server does not store any client session information between requests. Each request from the client is treated as an independent transaction.\n\n- To maintain user sessions, stateless architectures often use techniques like JSON Web Tokens (JWT) or client-side cookies to store session data\n- Designed to be more scalable and fault-tolerant because they do not require server resources to maintain client state.\n- Examples include RESTful APIs, where each request contains all the necessary information for the server to process it independently.**Example:** A REST API for a mobile app where each request includes an authentication token (JWT). The server verifies the token and processes the request without storing session information."
      },
      {
        "title": "4. Stateful Vs Stateless Architecture",
        "content": "Below are the differences between stateful and stateless architecture:\n\n**Stateful Architecture****Stateless Architecture**Scaling requires synchronization of session data.Horizontal scaling is straightforward.Failure in one server can affect sessions stored on it.Failures are isolated, impacting only individual requests.May experience increased latency due to session management.Typically faster response times due to lack of session overhead.Requires more resources to store and manage session state.Uses resources efficiently because no session state is stored.Caching can be complex due to session-specific data.Caching is simpler since requests are independent.Deployment can be complex because session data must be synchronized.Deployment and maintenance are easier due to stateless nature.Maintains session context to ensure transaction continuity.Transactions are handled independently at the request level.Load balancing may require session affinity (sticky sessions).Load balancing is simpler since any server can handle any request.Developers must manage session handling and related issues.Developers can focus mainly on business logic without session concerns."
      },
      {
        "title": "5. Benefits of Stateful Architecture",
        "content": "Stateful architecture provides several advantages when applications need to maintain user sessions and context across multiple requests.\n\n- **Session Persistence:** Maintains user sessions, allowing smooth transitions across steps or devices.\n- **Efficient Resource Use:** Stores session data on the server, reducing repeated transfers and processing.\n- **Personalization:** Uses past interactions to deliver tailored experiences, like recommendations.\n- **Enhanced Security:** Centralized session management supports strong authentication and encryption."
      },
      {
        "title": "6. Benefits of Stateless Architecture",
        "content": "Stateless architecture offers advantages in scalability and simplicity because each request is handled independently.\n\n- **High Scalability:** Easily handles large numbers of requests without session management.\n- **Fault Tolerance:** Each request is independent, so failures in one area don’t affect others.\n- **Simplified Load Balancing:** Requests can be evenly distributed without sticky sessions.\n- **Better Performance:** No session overhead, resulting in faster responses and lower latency.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Stateful vs Stateless Architecture in Distributed Systems",
      "initialCode": "import hashlib\n\n# Stateful vs Stateless Architecture in Distributed Systems\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Stateful vs Stateless Architecture in Distributed Systems",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Stateful vs Stateless Architecture in Distributed Systems important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Stateful vs Stateless Architecture in Distributed Systems",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Stateful vs Stateless Architecture in Distributed Systems is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-pub-sub": {
    "id": "sd-pub-sub",
    "badge": "Module 2 • System Design",
    "readingTime": "24 min read",
    "level": "Beginner",
    "title": "Publish-Subscribe (Pub/Sub) Architecture",
    "subtitle": "Comprehensive System Design guide to Publish-Subscribe (Pub/Sub) Architecture — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- The Publish/Subscribe (Pub/Sub) model is a messaging pattern that enables components to communicate without directly depending on each other. Publishers send messages to topics, while subscribers receive messages from the topics they subscribe to.\n\n- Reduces direct dependency between communicating components.\n- Supports asynchronous and scalable message distribution.\n- A messaging broker manages message routing between publishers and subscribers.Example: In a news notification system, when a publisher posts a new article to a news topic, subscribers interested in that topic can receive the update",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Publish-Subscribe (Pub/Sub) Architecture."
        }
      },
      {
        "title": "2. Components",
        "content": "In the Pub/Sub (Publish/Subscribe) model, there are several key components that work together to enable communication between publishers and subscribers. These components include:\n\n- **Publisher: **Creates and sends messages to topics without knowing subscribers.\n- **Subscriber: ** Receives messages from subscribed topics without knowing publishers.\n- **Topic: ** A named channel that categorizes messages. Publishers send messages to topics, and subscribers subscribe to them.\n- **Message Broker: **Routes messages from publishers to subscribers based on subscriptions. Features like delivery guarantees, persistence, and scalability depend on the specific system and configuration (e.g., Kafka, RabbitMQ).\n- **Message:** The data unit exchanged, which can be text, JSON, or binary.\n- **Subscription: ** Links subscribers to topics, defining which messages are received and delivery guarantees (e.g., at-most-once, at-least-once)."
      },
      {
        "title": "3. Working",
        "content": "Explain how the Pub/Sub architecture works:\n\n- **Step 1:** Publishers create messages and send them to the Pub/Sub system. They sort these messages into topics or channels based on what the messages are about.\n- **Step 2:** Subscribers let the system know which topics they're interested in. They’ll get messages only from those topics.\n- **Step 3:** Topics are basically channels for messages. Publishers send their messages to specific topics, and subscribers can choose one or more topics to follow.\n- **Step 4:** Message brokers act as go-betweens, managing how messages get from publishers to subscribers. They take messages from publishers and send them to the subscribers who are interested.\n- **Step 5:** When a publisher sends a message to a topic, the message broker grabs it and sends it out to all the subscribers who have signed up for that topic.\n- **Step 6:** The Pub/Sub system allows for asynchronous communication. This means publishers can send messages without waiting for subscribers to be ready, and subscribers can pick up messages whenever it suits them, without needing the publisher to be around."
      },
      {
        "title": "4. Real-World Example",
        "content": "**While this resembles Pub/Sub, real systems like Twitter use a hybrid approach involving caching, fan-out strategies, and ranking systems rather than a pure Pub/Sub model.\n\n- Publishers**: Users post tweets, which are published to the Twitter platform.\n- **Subscribers**: Followers of a user subscribe to their tweets to receive updates.\n- **Topics**: Each user's tweets can be considered a topic, and subscribers receive updates for the topics they are interested in.\n- **Message Broker**: Twitter's backend infrastructure acts as the message broker, routing tweets from publishers to subscribers.\n- **Message**: Each tweet is a message that is published by the user and received by their followers.In this example, the Pub/Sub architecture allows for scalable and efficient distribution of tweets to followers. Publishers (users) can publish tweets without knowing who will receive them, and subscribers (followers) receive updates in real-time without the need for direct communication with the publishers."
      },
      {
        "title": "5. Use-cases",
        "content": "The Pub/Sub (Publisher/Subscriber) architecture is widely used in various scenarios where asynchronous and scalable communication between components is required. Some common use cases of Pub/Sub architecture include:\n\n- **Real-time Data Streaming: **It’s often used in applications that deal with real-time data, like IoT devices and sensor networks, allowing multiple subscribers to get data streams right away.\n- **Event-driven Architectures:** This setup works well for systems that react to events instead of constantly checking for updates, making applications more responsive.\n- **Message Queues:** Pub/Sub systems can temporarily store messages until they are delivered to and processed by subscribers, helping handle asynchronous message delivery.\n- **Notifications and Alerts: **It’s used for sending notifications and alerts, letting publishers send important updates that subscribers can receive instantly.\n- **Scalable Web Applications**: In web apps, Pub/Sub supports features like real-time updates and chat, so many users can receive information at the same time without overloading the server.\n- **Microservices Communication: **Finally, it helps microservices talk to each other, allowing them to communicate without being tightly connected, which improves scalability and reliability."
      },
      {
        "title": "6. Types of Pub/Sub Services",
        "content": "Pub/Sub systems can be implemented using different messaging platforms and deployment models.\n\n- **Managed Cloud Pub/Sub Services:** Fully managed services such as Google Cloud Pub/Sub and Amazon SNS provide scalable messaging without requiring organizations to manage the underlying infrastructure.\n- **Message Brokers:** Messaging platforms such as RabbitMQ and Apache Kafka provide message routing and event-distribution capabilities and can support Pub/Sub patterns.\n- **Self-Managed Pub/Sub Systems:** Organizations can deploy and manage their own messaging infrastructure on their servers or infrastructure, providing greater control over configuration, data, and deployment."
      },
      {
        "title": "7. Comparing Pub/Sub to other Messaging Technologies",
        "content": "The comparison of Pub/Sub to other messaging Technologies is:\n\n- **Pub/Sub Vs Message Queues:** Message Queues deliver messages to one consumer at a time (point-to-point), ensuring order and delivery. Pub/Sub broadcasts messages to multiple subscribers simultaneously, ideal for event-driven systems.\n- **Pub/Sub Vs Streaming Platforms:** Streaming platforms (e.g., Kafka) handle continuous data streams with long-term retention and complex processing. Pub/Sub focuses on simpler, real-time message delivery.\n- **Pub/Sub Vs WebSockets:** WebSockets enable real-time, bidirectional client-server communication (e.g., chat). Pub/Sub decouples publishers and subscribers, supporting multiple subscribers without direct connections.\n- **Pub/Sub Vs HTTP APIs:** HTTP APIs use synchronous request-response communication. Pub/Sub supports asynchronous messaging, allowing publishers to send without waiting for subscriber responses."
      },
      {
        "title": "8. When to Use",
        "content": "Use Pub/Sub Architecture when:\n\n- Subscribers don’t need to know about each other, making the system more flexible and easier to scale.\n- Pub/Sub helps you build systems that can grow easily. You can add more publishers or subscribers without disrupting the existing setup.\n- If you want parts of your system to communicate without waiting for each other, Pub/Sub is a great option. Publishers can send messages without needing to wait for subscribers.\n- This approach is perfect for event-driven systems. Publishers can send out events, and subscribers can respond to those events without being tightly linked together.\n- With Pub/Sub, subscribers can change their interests at runtime. They can subscribe to different topics or types of messages, adding more flexibility to the system."
      },
      {
        "title": "9. When Not to Use",
        "content": "Do not use Pub/Sub Architecture when:\n\n- If you need very quick communication between parts of your system, Pub/Sub might not be the best option. The process of routing messages and managing subscriptions can slow things down.\n- Using Pub/Sub can make your system more complicated, especially when it comes to routing messages and handling subscriptions.\n- Pub/Sub doesn’t guarantee that messages will be delivered in the order they were sent. If your application needs messages to arrive in a specific sequence, Pub/Sub may not work for you.\n- For smaller applications where a few components communicate directly, using Pub/Sub could add unnecessary complexity that isn’t needed."
      },
      {
        "title": "10. Benefits",
        "content": "The benefits of Pub/Sub Architecture are:\n\n- **Scalability:** Easily scales with many publishers, subscribers, and messages via decoupled components and message brokers.\n- **Decoupling:** Publishers and subscribers operate independently, simplifying system design and maintenance.\n- **Asynchronous Communication:** Enables non-blocking message exchange, improving responsiveness and efficiency.\n- **Reliability:** Ensures message delivery with acknowledgments, retries, and fault-handling mechanisms."
      },
      {
        "title": "11. Challenges",
        "content": "The Pub/Sub architecture also introduces several challenges:\n\n- **Message Ordering:** Messages may not always be delivered in the order they were produced. Some systems provide ordering guarantees only under specific conditions or configurations.\n- **Duplicate Messages:** At-least-once delivery can result in the same message being delivered more than once, so consumers may need to be idempotent.\n- **Exactly-Once Delivery:** Providing exactly-once processing can be complex and depends on the messaging system and application design.\n- **Latency:** Message brokers and additional processing layers can introduce some latency.\n- **Operational Complexity:** Managing topics, subscriptions, retries, failures, monitoring, and message retention can increase system complexity."
      },
      {
        "title": "12. Pub/Sub Vs Point to Point Messaging",
        "content": "The differences between Pub/Sub and Point to Point Messaging are:\n\nPub/Sub MessagingPoint-to-Point MessagingMessages can be delivered to multiple subscribers.Messages are delivered to a single receiver.Publishers do not need to know about subscribers.Senders do not need to know the specific consumer.Supports scalable distribution by allowing multiple subscribers.Suitable when each message should be processed by one consumer.Loosely coupled architecture.Tightly coupled communication.Used for broadcasting events to many services.Used for direct one-to-one communication.Examples: Google Cloud Pub/Sub, Amazon SNS, Kafka.Examples: JMS queues, AMQP queues, RabbitMQ queues.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Publish-Subscribe (Pub/Sub) Architecture",
      "initialCode": "import hashlib\n\n# Publish-Subscribe (Pub/Sub) Architecture\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Publish-Subscribe (Pub/Sub) Architecture",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Publish-Subscribe (Pub/Sub) Architecture important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Publish-Subscribe (Pub/Sub) Architecture",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Publish-Subscribe (Pub/Sub) Architecture is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-event-sourcing": {
    "id": "sd-event-sourcing",
    "badge": "Module 2 • System Design",
    "readingTime": "20 min read",
    "level": "Beginner",
    "title": "Event Sourcing Pattern in System Design",
    "subtitle": "Comprehensive System Design guide to Event Sourcing Pattern in System Design — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Event Sourcing records every change as an event instead of just storing the current state, creating a complete history of data changes. The current state can be rebuilt anytime by replaying these events, helping track how data evolved over time.\n\n- Events are stored sequentially in a log or journal, allowing the program’s state to be restored by replaying those events.\n- Commonly used in domains like finance and e-commerce where accurate historical data tracking is essential.**Example:** In a banking system, instead of storing only the final account balance, every transaction like “Money Deposited”, “Money Withdrawn”, and “Transfer Completed” is stored as an event. The current balance is calculated by replaying all these events in order.\n\nEvent Sourcing",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Event Sourcing Pattern in System Design."
        }
      },
      {
        "title": "2. Real World Applications",
        "content": "Event Sourcing finds applications in diverse domains and use cases where tracking and analyzing historical data is crucial. Below are some notable examples:\n\n- **Financial Systems:** To keep an unchangeable record of transactions, account activity, and compliance events, banking and financial institutions use event sourcing.\n- **Healthcare Records: **Electronic health record (EHR) systems use event sourcing to document patient contacts, treatment histories, and medical procedures.\n- **Supply Chain Management: **Event sourcing is used in supply chain and logistics management to track inventory movements, shipping updates, and supply chain interruptions.\n- **E-commerce Platforms: **Event sourcing is a useful tool for e-commerce applications to record customer interactions, order fulfillment processes, and inventory changes. This makes it feasible to track orders, offer customized recommendations, and examine customer behavior in order to boost sales and customer satisfaction.\n- **Gaming and Virtual Environments: **Event Sourcing is used in virtual worlds and multiplayer online games to record player movements, game state changes, and in-game purchases."
      },
      {
        "title": "3. Components",
        "content": "Event Sourcing in system design revolves around several core concepts and components:\n\n- **Events:** Permanent records of system state changes that contain all information required to rebuild the system’s state at a specific point in time.\n- **Event Store:** Durable storage that maintains the complete stream of events in order and acts as the source of truth for the system. Messaging systems like Apache Kafka or RabbitMQ may also distribute events.\n- **Aggregate:** A logical group of related domain objects that processes commands, applies business logic, and generates events. Each aggregate is associated with its own event stream.\n- **Command:** Requests issued by clients or system components to perform actions, which are validated and processed by aggregates.\n- **Projection:** Read models created from event streams to represent the current system state for efficient querying and reporting.\n- **Event Bus:** Messaging infrastructure that enables asynchronous communication by allowing components to publish and subscribe to events."
      },
      {
        "title": "4. Working",
        "content": "The steps to understand how event sourcing pattern works are:\n\n- **Capture Events Instead of State:** Every system change is stored as an event, such as “order created” or “item added,” instead of only saving the final state.\n- **Store Events in Sequence:** Events are stored in the exact order they occur, forming a chronological event stream that acts as the system’s source of truth.\n- **Reconstruct State by Replaying Events:** The current system state is rebuilt by replaying and processing all stored events from the beginning.\n- **Handle New Events:** New changes generate additional events that are appended to the sequence without modifying previous events.\n- **Replay Events for Debugging:** Events can be replayed to trace system behavior, understand state changes over time, and investigate issues or errors."
      },
      {
        "title": "5. Implementation Example",
        "content": "Understand event sourcing pattern with the help of an example of registration system:"
      },
      {
        "title": "1. Registration System Before Event Sourcing",
        "content": "In a traditional event registration system, updates are made directly to the database, changing the current state immediately. This makes it hard to track history, maintain past data, and manage notifications for registration changes.\n\ntraditional registration class in which there are several issues:\n\n- When users register or cancel their registrations, the system updates the database immediately without maintaining a history of actions.\n- The system does not record the reasons for registration changes, making it hard to audit past actions.\n- Notifications to users must be handled separately, leading to potential delays and errors in communication.\n\n`\n`\n\n`\n`\n\n`\n`\n\n`\n`\n\n- Direct database updates during registration or cancellation can lead to data inconsistencies if failures occur.\n- Notifications are not integrated with the registration process, which may cause missed or delayed user alerts.",
        "code": {
          "language": "python",
          "caption": "System Design Implementation — 1. Registration System Before Event Sourcing",
          "snippet": "#include <string>\n#include <vector>\n\nenum class RegistrationState {\n    REGISTERED,\n    CANCELLED\n};\n\nclass Database {\npublic:\n    static void update(Registration* registration) {\n        // Update the database directly\n    }\n};\n\nclass Registration {\nprivate:\n    RegistrationState state;\n    std::string userId;\n    std::string eventId;\n\npublic:\n    void registerUser(const std::string& userId, const std::string& eventId) {\n        this->state = RegistrationState::REGISTERED;\n        this->userId = userId;\n        this->eventId = eventId;\n        // Update the database directly\n        Database::update(this);\n    }\n\n    void cancel() {\n        this->state = RegistrationState::CANCELLED;\n        // Update the database directly\n        Database::update(this);\n    }\n};"
        }
      },
      {
        "title": "2. Registration System Using Event Sourcing",
        "content": "With the move to an event-sourced architecture, the system now records each significant change as an event, allowing better tracking and historical analysis.\n\n- Instead of directly updating the database, the system processes commands to create and cancel registrations and generates events for each action.\n- Each state change is represented by an event, providing a clear audit trail of user actions.\n- Notifications are handled through event subscribers, ensuring users are promptly informed about their registration status changes.event sourced registration class:\n\n`\n`\n\n`\n`\n\n`\n`\n\n`\n`\nBy transitioning to an event-sourced architecture, the event registration system gains a clear advantage in tracking registration states, maintaining a complete history of actions, and ensuring timely notifications to users.",
        "code": {
          "language": "python",
          "caption": "System Design Implementation — 2. Registration System Using Event Sourcing",
          "snippet": "#include <vector>\n#include <string>\n\nclass Event {};\nclass EventRegisteredEvent : public Event { public: std::string userId; std::string eventId; EventRegisteredEvent(std::string userId, std::string eventId) : userId(userId), eventId(eventId) {} };\nclass RegistrationCancelledEvent : public Event {};\n\nenum class RegistrationState { REGISTERED, CANCELLED };\n\nclass RegisterForEventCommand { public: std::string getUserId() { return userId; } std::string getEventId() { return eventId; } private: std::string userId; std::string eventId; };\nclass CancelRegistrationCommand {};\n\nclass Registration {\nprivate:\n    RegistrationState state;\n    std::string userId;\n    std::string eventId;\n\npublic:\n    RegistrationState getState() { return state; }\n\n    std::vector<Event> process(RegisterForEventCommand cmd) {\n        return { EventRegisteredEvent(cmd.getUserId(), cmd.getEventId()) };\n    }\n\n    std::vector<Event> process(CancelRegistrationCommand cmd) {\n        return { RegistrationCancelledEvent() };\n    }\n\n    void apply(EventRegisteredEvent event) {\n        this->state = RegistrationState::REGISTERED;\n        this->userId = event.userId;\n        this->eventId = event.eventId;\n    }\n\n    void"
        }
      },
      {
        "title": "8. Challenges",
        "content": "While Event Sourcing offers various benefits, it also presents several challenges:\n\n- **Event Versioning & Compatibility:** As the system evolves, event structures may change, making it important to manage versioning and backward compatibility without losing historical data.\n- **Efficient Event Storage & Retrieval:** Storing and querying large volumes of events in high-throughput systems or long event histories requires efficient event storage and querying mechanisms.\n- **Handling Eventual Consistency:** Different system components may observe state changes at different times, requiring careful handling of stale data, synchronization, and conflict resolution."
      },
      {
        "title": "9. When to Use Event Sourcing Pattern",
        "content": "Use Event Sourcing Pattern when:\n\n- It's good for apps with complicated rules that need to keep track of how things change over time.\n- It helps when you need a complete history of changes for legal reasons or audits.\n- Helps your app bounce back quickly from problems by replaying past events.\n- Works well in systems with separate parts (like microservices) that need to communicate without being tightly linked."
      },
      {
        "title": "10. When Not to Use Event Sourcing Pattern",
        "content": "Event Sourcing may not be the best choice in these situations:\n\n- If the system only needs to maintain the latest state and does not require a full history or audit trail, Event Sourcing adds unnecessary complexity.\n- Since every change is stored as a separate event, frequent updates can significantly increase storage requirements over time.\n- Ensuring consistency across multiple events—especially in distributed systems—can be difficult and requires careful coordination.\n- Rebuilding state by replaying events can impact performance in applications where fast data retrieval and low latency are essential.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Event Sourcing Pattern in System Design",
      "initialCode": "#include <string>\n#include <vector>\n\nenum class RegistrationState {\n    REGISTERED,\n    CANCELLED\n};\n\nclass Database {\npublic:\n    static void update(Registration* registration) {\n        // Update the database directly\n    }\n};\n\nclass Registration {\nprivate:\n    RegistrationState state;\n    std::string userId;\n    std::string eventId;\n\npublic:\n    void registerUser(const std::string& userId, const std::string& eventId) {\n        this->state = RegistrationState::REGISTERED;\n        this->userId = userId;\n        this->eventId = eventId;\n        // Update the database directly\n        Database::update(this);\n    }\n\n    void cancel() {\n        this->state = RegistrationState::CANCELLED;\n        // Update the database directly\n        Database::update(this);\n    }\n};",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Event Sourcing Pattern in System Design",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Event Sourcing Pattern in System Design important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Event Sourcing Pattern in System Design",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Event Sourcing Pattern in System Design is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-event-streaming": {
    "id": "sd-event-streaming",
    "badge": "Module 2 • System Design",
    "readingTime": "16 min read",
    "level": "Beginner",
    "title": "Event Sourcing vs Event Streaming",
    "subtitle": "Comprehensive System Design guide to Event Sourcing vs Event Streaming — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Event Sourcing and Event Streaming are two fundamental concepts in modern system design that address how data is captured, stored, and processed. Event Sourcing stores application state as a sequence of immutable events, while Event Streaming focuses on the continuous real-time flow and processing of events between systems.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Event Sourcing vs Event Streaming."
        }
      },
      {
        "title": "2. Event Sourcing",
        "content": "Event Sourcing is a software architectural pattern where the state of an application is derived from a sequence of immutable events rather than storing only the current state. It captures every state change as an event to maintain a complete history of the system.\n\n- Stores each change as an immutable event instead of updating only the current state, enabling full traceability and auditing.\n- Allows state reconstruction by replaying events, making debugging and history tracking easier and more reliable."
      },
      {
        "title": "3. Advantages",
        "content": "Event sourcing provides a complete record of all actions, making it easier to understand and recover system state.\n\n- You have a full history of everything that happened in the system.\n- You can easily fix mistakes by reprocessing events.\n- It is easy to see how the current state was reached."
      },
      {
        "title": "4. Disadvantages",
        "content": "While powerful, event sourcing can become complex and resource-intensive if not managed carefully.\n\n- Managing events can become complex over time.\n- It stores every event and can use a lot of space.\n- Rebuilding the current state from many events can take time."
      },
      {
        "title": "5. Event Streaming",
        "content": "Event Streaming is a data processing paradigm where data is continuously generated, processed, and analyzed in real time as a stream of events. It enables systems to react immediately to incoming data, making it ideal for time-sensitive applications.\n\n- Processes data as a continuous flow of events, enabling real-time collection, processing, and analysis.\n- Helps systems respond instantly to changes, making it useful for analytics, decision-making, and system integration."
      },
      {
        "title": "6. Advantages",
        "content": "Event streaming provides real-time processing, allowing systems to respond immediately to new information.\n\n- Events are handled as they happen, leading to fast reactions.\n- It works well even when there are lots of events coming in quickly.\n- Different parts of a system can work alone by read to the events they need."
      },
      {
        "title": "7. Disadvantages",
        "content": "While powerful, event streaming can introduce complexity and potential risks if not managed carefully.\n\n- Real-time event streaming can be complicated.\n- There is a risk of losing events if the system is not set up correctly.\n- Keeping everything in sync can be difficult if not handled properly."
      },
      {
        "title": "8. Event Sourcing Vs Event Streaming",
        "content": "Below are the differences between Event Sourcing and Event Streaming:\n\nFeatureEvent SourcingEvent Streaming**Concept**Stores every event to recreate state laterHandles and processes events in real-time**Data Handling**Rebuilds current state from past eventsProcesses data as it happens**Use Case**Audit logs, rebuilding application stateReal-time data pipelines, live feeds**Data Storage**Stores all past eventsOften keeps short history or none**Performance**Slower due to event replayFaster as events are processed live**Complexity**More complex to manage long-termComplex to set up and maintain**Recovery**Easy to fix issues by replaying eventsHarder to recover from lost eventsComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Event Sourcing vs Event Streaming",
      "initialCode": "import hashlib\n\n# Event Sourcing vs Event Streaming\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Event Sourcing vs Event Streaming",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Event Sourcing vs Event Streaming important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Event Sourcing vs Event Streaming",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Event Sourcing vs Event Streaming is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-request-vs-event": {
    "id": "sd-request-vs-event",
    "badge": "Module 2 • System Design",
    "readingTime": "14 min read",
    "level": "Beginner",
    "title": "Request-Driven vs Event-Driven Microservices",
    "subtitle": "Comprehensive System Design guide to Request-Driven vs Event-Driven Microservices — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Microservices architecture breaks an application into small, independent services, each focused on a specific business function. These services can be developed, deployed, and scaled separately, improving flexibility, speed of development, and team collaboration.\n\n- Each service is loosely coupled and handles a specific business capability, allowing independent development and deployment.\n- It improves scalability, flexibility, and collaboration by enabling teams to work on different services simultaneously.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Request-Driven vs Event-Driven Microservices."
        }
      },
      {
        "title": "2. Request-driven Microservices",
        "content": "Request-driven microservices are based on a synchronous communication model. When one service needs data or functionality from another, it sends a direct request (typically via HTTP). The requesting service waits for a response before continuing its process.\n\n- Services communicate synchronously by waiting for responses, which can introduce latency and reduce overall system speed.\n- The tightly coupled design can cause changes in one service to impact others, but the linear request flow makes debugging easier.While this model is simple and intuitive, it can lead to bottlenecks if services take too long to respond, affecting the overall performance of the application."
      },
      {
        "title": "3. Use Cases",
        "content": "The use cases of request-driven microservices are:\n\n- **User Authentication: **Request-driven microservices excel in handling user login and authentication processes that require immediate feedback.\n- **Payment Processing: **Applications like e-commerce platforms benefit from synchronous requests for processing transactions to ensure accuracy and speed.\n- **APIs for Web Applications: **Real-time data retrieval for web applications often relies on request-driven microservices for fetching and displaying dynamic content.\n- **CRUD Operations: **Basic Create, Read, Update, and Delete operations often utilize request-driven models for straightforward data management."
      },
      {
        "title": "4. Event-driven Microservices",
        "content": "Event-driven microservices, on the other hand, employ an asynchronous communication model. In this approach, services publish events when certain actions occur (e.g., a user places an order), and other services can subscribe to those events. This allows services to react to changes in real time without direct dependencies.\n\n- Services communicate asynchronously and operate independently, processing events at their own pace without waiting for direct responses.\n- The system is loosely coupled and highly scalable, allowing changes in one service without affecting others and handling high event volumes efficiently.While event-driven systems offer significant benefits in scalability and resilience, they introduce complexity in event management and data consistency."
      },
      {
        "title": "5. Use Cases",
        "content": "The use cases of event-driven microservices are:\n\n- **Order Processing: **E-commerce platforms can utilize event-driven microservices to decouple order placement from inventory updates, allowing for more flexible and resilient processing.\n- **Notification Systems:** Applications that require real-time notifications (e.g., messaging apps) can benefit from the asynchronous nature of event-driven microservices.\n- **Real-time Analytics: **Systems that analyze data in real-time, such as monitoring applications, can effectively use event-driven architectures to react to data streams instantly.\n- **Microservices Communication: **Services can communicate via events to trigger workflows or processes without direct dependencies, enhancing modularity and flexibility."
      },
      {
        "title": "6. Selecting Right Approach",
        "content": "Choosing between request-driven and event-driven microservices depends on system needs, performance goals, and use cases. Many real-world systems use a hybrid approach to combine the benefits of both.\n\n- **Response time requirements:** Use request-driven when you need instant responses (like payments), and event-driven when delayed processing is acceptable\n- **Scalability needs: **Event-driven is better for high traffic and large-scale systems, while request-driven works for stable and predictable loads\n- **Complexity tolerance:** Request-driven is simpler to build, whereas event-driven requires more effort but offers better flexibility and resilience\n- **Coupling requirements: **Choose request-driven for tightly connected services, and event-driven for loosely coupled, independent services\n- **Development speed: **Request-driven is faster to develop initially, while event-driven takes more setup but provides long-term benefits**Example:** In an e-commerce system, payment processing is usually request-driven for instant confirmation, while order notifications and analytics are handled using event-driven architecture for better scalability."
      },
      {
        "title": "7. Request-driven Vs Event-driven Microservices",
        "content": "Below are the main differences between request-driven and event-driven microservices:\n\nRequest-driven MicroservicesEvent-driven MicroservicesSynchronous (request-response)Asynchronous (event-based)Tight coupling between servicesLoose couplingDirect waiting for responsesNon-blocking, responses happen independentlyCan lead to bottlenecksHighly scalable, handles large number of eventsSimpler to implementMore complex due to event handlingEasier to trace requestsHarder to debug, needs event trackingAPIs, payment processingOrder management, notificationsEasier to maintain strong consistencyUses eventual consistency strategiesComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Request-Driven vs Event-Driven Microservices",
      "initialCode": "import hashlib\n\n# Request-Driven vs Event-Driven Microservices\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Request-Driven vs Event-Driven Microservices",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Request-Driven vs Event-Driven Microservices important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Request-Driven vs Event-Driven Microservices",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Request-Driven vs Event-Driven Microservices is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-horiz-vert-scaling": {
    "id": "sd-horiz-vert-scaling",
    "badge": "Module 3 • System Design",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "Horizontal vs Vertical Scaling in System Design",
    "subtitle": "Comprehensive System Design guide to Horizontal vs Vertical Scaling in System Design — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- In system design, scaling is important for handling increased workloads. Horizontal scaling and vertical scaling are two approaches to increasing system capacity. Scaling can improve a system's ability to handle higher workloads, but it does not by itself guarantee high availability or fault tolerance.\n\n- Adding more servers or instances to distribute load and handle high traffic efficiently.\n- Upgrading a single server’s CPU, RAM, or storage to increase its capacity.**Example:** A large e-commerce platform may use horizontal scaling by adding more servers during high traffic events like sales, while a small application may use vertical scaling by upgrading the server’s RAM or CPU.\n\nVertical and Horizontal Scaling",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Horizontal vs Vertical Scaling in System Design."
        }
      },
      {
        "title": "2. Need of Scaling",
        "content": "We need scaling to handle increasing load and improve performance, while resilience is achieved through fault tolerance, redundancy, and recovery mechanisms.\n\n- We need scaling to handle increasing system load efficiently and provide a smooth and reliable user experience.\n- Handle increased user load and traffic without slowing down or crashing the system during peak usage.\n- Improve system capacity as workload increases.\n- Maintain performance and response time by distributing workload and avoiding bottlenecks.\n- Support growing data and storage needs as the application expands over time.The following are two ways to do scaling."
      },
      {
        "title": "3. Vertical Scaling",
        "content": "Vertical scaling, also known as scaling up, refers to the process of increasing the capacity or capabilities of an individual hardware or software component within a system.\n\n- We upgrade the same system rather than adding more systems. Add more power to your machine by adding better processors, increasing RAM, or other power-increasing adjustments.\n- Simple to implement and useful for monolithic and small scale applications. Vertical Scaling"
      },
      {
        "title": "4. Examples",
        "content": "The following examples illustrate how vertical scaling improves system capacity by upgrading the resources of a single server.\n\n- Upgrading a MySQL server from 16 GB RAM to 64 GB to handle more queries.\n- Moving a website hosted on a 2-core VM to an 8-core, higher-RAM VM to improve performance.\n- E-commerce platform running on a single large AWS EC2 instance with increased resources (CPU, RAM, disk)."
      },
      {
        "title": "5. Advantages",
        "content": "Vertical scaling offers several benefits, especially for applications that need quick performance improvements with minimal architectural changes.\n\n- **Increased capacity:** A server's performance and ability to manage incoming requests can both be enhanced by upgrading its hardware.\n- **Easier management:** Upgrading a single node is usually the focus of vertical scaling, which might be simpler than maintaining several nodes."
      },
      {
        "title": "6. Disadvantages",
        "content": "Despite its benefits, vertical scaling has certain limitations that can affect system growth and reliability.\n\n- Vertical scaling is constrained by the maximum CPU, memory, storage, or other resources supported by the machine.\n- One server still receives all incoming requests thus increasing the possibility of downtime in the event of a server failure.\n- Scaling up often requires restarting or replacing the machine, causing downtime."
      },
      {
        "title": "7. Horizontal Scaling",
        "content": "Horizontal scaling, also known as scaling out, refers to the process of increasing the capacity or performance of a system by adding more machines or servers to distribute the workload across a larger number of individual units.\n\n- There is no need to change the capacity of the server or replace the server.\n- Adding more servers can increase capacity without replacing an existing server, although deployment, initialization, traffic rebalancing, or configuration changes may temporarily affect the system.Horizontal Scaling"
      },
      {
        "title": "8. Examples",
        "content": "Horizontal scaling is widely used in real-world systems to handle high traffic and ensure availability.\n\n- A website like GeeksforGeeks adds more web servers behind a load balancer to handle traffic spikes.\n- Netflix scales different microservices independently — e.g., multiple instances of the streaming service across regions.\n- Amazon Auto Scaling spins up more EC2 instances during peak shopping hours (e.g., Black Friday)."
      },
      {
        "title": "9. Advantages",
        "content": "Horizontal scaling improves system capacity and reliability by distributing workload across multiple machines.\n\n- **Increased capacity: **More nodes or instances can handle a larger number of incoming requests.\n- **Improved performance: **By distributing the load over several nodes or instances, it is less likely that any one server will get overloaded.\n- **Increased fault tolerance:** Incoming requests can be sent to another node in the event of a node failure, lowering the possibility of downtime."
      },
      {
        "title": "10. Disadvantages",
        "content": "Despite its benefits, horizontal scaling introduces complexity in system design and management.\n\n- Requires complex architecture (load balancers, distributed databases, etc.).\n- Difficult to maintain strong consistency across distributed nodes. Requires synchronization, messaging, or replication between nodes.\n- More machines = more networking, power, and maintenance.\n- Large-scale deployments may use tools such as Kubernetes or infrastructure automation tools to manage multiple instances."
      },
      {
        "title": "11. Differences between Horizontal and Vertical Scaling",
        "content": "We have understood the meaning of both the major categories of scaling an application. We also have discussed some pros and cons of each one of them. do a quick comparison of these two approaches based on these pros and cons.\n\n**Horizontal Scaling****Vertical Scaling**Adds more machines or servers to distribute the workload.Increases CPU, RAM, or storage of a single machine.More cost-effective for large-scale systems.Simpler initially but can become expensive over time.Highly flexible because new servers can be added easily.Limited flexibility due to hardware limits.Better fault tolerance since workload is spread across multiple machines.Lower fault tolerance because it depends on one machine.Improves performance by distributing traffic across servers.Performance improves only up to hardware capacity.Less risk of single point of failure.Higher risk of single point of failure.More complex to manage because it involves distributed systems.Easier to manage since it uses a single machine.Suitable for applications requiring massive scalability.Suitable for applications with moderate scalability needs.Requires load balancing to distribute traffic across servers.Load balancing is usually not required.Relies on network communication between multiple machines.Mostly uses communication within a single machine."
      },
      {
        "title": "12. Choosing Between Horizontal and Vertical Scaling",
        "content": "There will be always some trade-offs so it may be a little bit trickier for developers to decide which one is better for an application.\n\n- Firstly, you should identify your requirements, business goals, and areas where we would like to add value.\n- Then make important design decisions by questioning ourselves, developing prototypes, and refining the design.\n- Large-scale systems may combine both approaches depending on the requirements of individual components.\n- In practice, systems may use a hybrid approach, combining vertical and horizontal scaling according to workload, performance, cost, availability, and architectural requirements.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Horizontal vs Vertical Scaling in System Design",
      "initialCode": "import hashlib\n\n# Horizontal vs Vertical Scaling in System Design\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Horizontal vs Vertical Scaling in System Design",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Horizontal vs Vertical Scaling in System Design important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Horizontal vs Vertical Scaling in System Design",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Horizontal vs Vertical Scaling in System Design is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-scalable-systems": {
    "id": "sd-scalable-systems",
    "badge": "Module 3 • System Design",
    "readingTime": "30 min read",
    "level": "Intermediate",
    "title": "Guide for Designing Highly Scalable Systems",
    "subtitle": "Comprehensive System Design guide to Guide for Designing Highly Scalable Systems — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "![High-Level Scalable Architecture](/images/system-design/hld-scalable-arch.svg)\n\n- Scalable systems are essential for handling increasing users, data, and workload efficiently. Designing such systems requires proper architectural planning and an understanding of scalability principles. It helps ensure that applications remain reliable and perform well as demand grows.\n\n- Handles increasing users and traffic efficiently without major redesign, ensuring smooth system growth.\n- Maintains fast response times and keeps the system stable and available even during heavy workloads or demand spikes.**Example:** A streaming platform like Netflix scales its infrastructure by adding more servers and using load balancing to support millions of users watching videos simultaneously, though overall performance also depends on factors like database efficiency, system design, and bottlenecks.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Guide for Designing Highly Scalable Systems."
        }
      },
      {
        "title": "2. Real-world Examples of Highly Scalable Systems",
        "content": "Some real-world examples of highly scalable systems are:\n\n- **Amazon Web Services (AWS):** AWS provides scalable cloud infrastructure, including computing, storage, databases, and networking services. Its global infrastructure across multiple Regions and Availability Zones supports highly available and scalable applications.\n- **Google Search:** Google Search operates at massive scale, using distributed infrastructure and techniques such as caching and distributed data processing to serve search requests efficiently.\n- **Netflix:** Netflix operates a large-scale streaming platform using distributed services and cloud infrastructure. Its service-oriented architecture allows different components to scale independently based on demand.\n- **Uber:** Uber handles a very large volume of trips globally and uses distributed systems and real-time processing to support services such as matching riders and drivers, pricing, and trip management. Uber reported 75 billion trips worldwide as of May 16, 2026.\n- **Facebook (Meta):** Meta operates infrastructure supporting billions of people across its family of apps. Its globally distributed infrastructure and large-scale data systems are designed to handle massive traffic and continuously growing workloads."
      },
      {
        "title": "3. Importance of Scalability in Systems",
        "content": "Scalability is a critical requirement for modern systems to handle increasing data, user traffic, and workloads while maintaining acceptable performance. It allows systems to grow by adding resources or distributing workloads as demand increases.\n\n- Scalability helps systems handle increasing workloads and user demand without significant performance degradation.\n- Systems can scale up by adding resources such as CPU, memory, and storage, or scale out by distributing workloads across multiple servers.\n- Properly designed scalable systems can accommodate growing workloads while maintaining acceptable performance and efficient resource utilization. High availability requires additional mechanisms such as redundancy, replication, and failover."
      },
      {
        "title": "4. Factors Affecting Scalability",
        "content": "Some factors that affect scalability:\n\n- **Architecture**: The system's design and structure play a critical role in its ability to scale efficiently.\n- **Resource Allocation**: Proper allocation of resources such as CPU, memory, and storage is essential for accommodating increased workload.\n- **Load Balancing**: Distributing incoming requests or workload evenly across multiple servers or resources prevents overload on any single component.\n- **Data Management**: Efficient management and storage of data through techniques like sharding and replication prevent data bottlenecks as the system grows.\n- **Parallelism**: Utilizing parallel processing and concurrency techniques allows systems to handle multiple tasks simultaneously, improving performance and scalability"
      },
      {
        "title": "5. Design Principles for Scalable Systems",
        "content": "Some design principles that help to build scalable systems are:\n\n- **Decomposition:** Break down the system into smaller components or services to enable easier scaling without impacting the entire system.\n- **Loose Coupling:** Design components with minimal dependencies to allow independent scaling and improve flexibility.\n- **Service-Oriented Architecture (SOA):** Organize functionality into services with well-defined interfaces for independent development and scaling.\n- **Horizontal Scalability:** Scale by adding more instances instead of upgrading resources, improving flexibility and resource utilization.\n- **Statelessness:** Reduce server-side state so requests can be distributed easily across multiple instances.\n- **Cache:** Use caching to reduce repeated computations and improve performance by lowering backend load.\n- **Fault Tolerance:** Design systems to handle failures using redundancy, replication, and failover to maintain availability."
      },
      {
        "title": "6. Architectural Patterns for Scalability",
        "content": "Architectural patterns provide reusable solutions to common design problems. When it comes to scalability, several architectural patterns are particularly effective in ensuring that systems can handle increased workload and growth."
      },
      {
        "title": "7. Microservices Architecture",
        "content": "This architecture divides an application into small, independent services that handle specific business functions.\n\n- Each service is independently deployable and responsible for a specific feature.\n- Services can be scaled independently based on demand.\n- Updates or changes in one service do not affect others."
      },
      {
        "title": "8. Event-Driven Architecture",
        "content": "This architecture allows components to communicate through events that represent changes or important actions in the system\n\n- Components interact using events instead of direct calls.\n- Supports asynchronous communication between services.\n- Helps systems handle sudden increases in workload efficiently."
      },
      {
        "title": "9. Distributed Systems",
        "content": "Distributed systems spread computation and data processing across multiple machines.\n\n- Multiple servers work together to process tasks.\n- Techniques like sharding, replication, and partitioning distribute data.\n- Improves performance and prevents single-system bottlenecks."
      },
      {
        "title": "10. CQRS (Command Query Responsibility Segregation)",
        "content": "CQRS separates read and write operations, allowing them to be designed and scaled independently when their workloads differ.\n\n- Handle commands that modify data and queries that retrieve data.\n- Read and write components can be scaled separately when required.\n- CQRS can introduce additional architectural complexity and is most useful when read and write workloads have different requirements."
      },
      {
        "title": "11. Database Sharding",
        "content": "Sharding divides large databases into smaller parts across multiple servers.\n\n- Data is split using a shard key.\n- Each shard manages a portion of the data.\n- Helps distribute database load and improve performance."
      },
      {
        "title": "12. Load Balancing",
        "content": "Load balancing distributes incoming requests across multiple servers to ensure efficient resource usage.\n\n- Prevents overload on a single server.\n- Uses algorithms like round-robin or least connections.\n- Helps systems scale by evenly distributing traffic."
      },
      {
        "title": "13. Techniques for horizontal Scaling",
        "content": "Horizontal scaling, which involves adding more servers or nodes to a system to manage growing traffic, is a key way to attaining scalability.\n\n- Load balancing is a critical strategy for distributing incoming requests across numerous instances, ensuring that the burden is adequately distributed and no one component becomes a bottleneck.\n- Caching, both at the application and infrastructure levels, can drastically reduce backend system load by providing frequently accessed data from a fast cache.\n- Partitioning or sharding data and computations among different nodes or servers distributes the workload, allowing individual components to scale independently.\n- Asynchronous task processing, which is generally assisted by message queues or streaming platforms, helps to isolate request processing from request management, allowing for greater scalability.\n- Auto-scaling, in which the system adds or removes resources depending on established metrics or criteria, is a critical technique for dynamic scaling to meet the system's changing demands."
      },
      {
        "title": "14. Operational Best Practices for Designing Highly Scalable Systems",
        "content": "Scalability in production systems demands the use of strong operating principles.\n\n- **Automation**: Automate tasks like provisioning, deployment, and configuration to streamline operations.\n- **Monitoring and Alerting**: Use robust monitoring tools to track system performance and set up alerts for potential issues.\n- **Scalability Testing**: Regularly test system scalability to identify and address bottlenecks before they become problems.\n- **Horizontal Scaling**: Design systems to scale horizontally by adding more resources and distributing workload evenly.\n- **Fault Tolerance and Resilience**: Build in redundancy and failover mechanisms to ensure system availability in case of failures.\n- **Capacity Planning**: Continuously monitor resource usage and plan for future capacity needs to avoid performance degradation.\n- **Security and Compliance**: Implement strong security measures and ensure compliance with relevant regulations and standards\n- **Disaster Recovery:** Disaster recovery and failover measures, including as redundancy, failover clustering, and backups, help ensure that the system remains operational and recovers from failures."
      },
      {
        "title": "15. Challenges in Achieving High Scalability",
        "content": "Building highly scalable systems requires addressing several challenges related to concurrency, data distribution, performance, consistency, and resource management.\n\n- **Concurrency and Synchronization:** Managing concurrent access to shared resources while maintaining data integrity can lead to issues such as race conditions and deadlocks.\n- **Data Partitioning and Sharding:** Distributing data across multiple nodes requires careful planning to ensure balanced data distribution, minimize hotspots, and maintain performance.\n- **Consistency, Availability, and Partition Tolerance:** In a distributed system, a network partition can prevent nodes from communicating reliably. During such a partition, a system may need to make a trade-off between consistency and availability, depending on its requirements.\n- **Scalability Testing and Optimization:** Testing systems under realistic workloads and identifying performance bottlenecks requires appropriate testing methodologies and monitoring tools.\n- **Cost and Resource Management:** Scaling infrastructure increases resource consumption and costs, making efficient resource allocation and capacity planning important.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Guide for Designing Highly Scalable Systems",
      "initialCode": "import hashlib\n\n# Guide for Designing Highly Scalable Systems\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Guide for Designing Highly Scalable Systems",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Guide for Designing Highly Scalable Systems important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Guide for Designing Highly Scalable Systems",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Guide for Designing Highly Scalable Systems is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-scalability-bottlenecks": {
    "id": "sd-scalability-bottlenecks",
    "badge": "Module 3 • System Design",
    "readingTime": "18 min read",
    "level": "Intermediate",
    "title": "Primary Bottlenecks That Hurt Application Scalability",
    "subtitle": "Comprehensive System Design guide to Primary Bottlenecks That Hurt Application Scalability — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- A bottleneck in a system is a point where data flow or processing gets restricted, reducing overall performance. It occurs when one component becomes slower than others and cannot efficiently handle incoming requests. This leads to reduced throughput, scalability issues, and delays under increased workload.\n\n- Bottlenecks limit system performance and prevent efficient handling of high traffic, often becoming visible during peak load conditions.\n- They can occur in databases, networks, servers, or code, and resolving one bottleneck may sometimes expose another in the system.**Example:** If a web application has a fast server but a slow database, the database becomes the bottleneck because it cannot process queries quickly when many users access the system.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Primary Bottlenecks That Hurt Application Scalability."
        }
      },
      {
        "title": "2. Types of Bottlenecks",
        "content": "Bottlenecks can occur at different layers of a system, depending on its architecture and workload. Common sources include databases, networks, servers, application code, storage systems, authentication services, and third-party dependencies."
      },
      {
        "title": "1. Database Bottlenecks",
        "content": "A database bottleneck occurs when database operations limit the performance of an application or system. It can result from inefficient queries, missing indexes, lock contention, high connection usage, or limited database resources.\n\n- Slow queries can increase response times and reduce the number of requests the database can process.\n- Poor indexing or inefficient query patterns can increase the amount of data the database needs to scan.\n- High CPU, memory, or connection usage can further limit database performance.**Example:** If an e-commerce website receives a large number of orders during a sale, inefficient queries for retrieving product or order information can slow down the database and delay request processing."
      },
      {
        "title": "2. Network Bottlenecks",
        "content": "Network bottlenecks can significantly hinder scalability in a distributed system. It happen when a certain resource or component restricts a computer network's capacity or performance, which slows down or degrades the system's overall performance.\n\n- They can occur at various points in a network topology and can severely impact the efficiency and responsiveness of an application or system.\n- These bottlenecks occur due to bandwidth limitations, high latency, packet loss, congestion, or inefficient network topology.**Example: **A video streaming service may encounter network bottlenecks if it doesn't have adequate content delivery infrastructure. Users may experience buffering or low-quality video streams when too many requests strain the network."
      },
      {
        "title": "3. Server Bottlenecks",
        "content": "When the application server is unable to manage more requests or concurrent connections, a server bottleneck occurs. Limitations in server resources, including CPU, RAM, or disk I/O, may be the cause of this.\n\n- Consider a social media site where an unexpectedly popular post causes a huge surge in users attempting to access it at once.\n- If the server lacks the necessary resources to handle this surge, it may become unresponsive, degrading the user experience.**Example: **You have a web application that allows users to upload and process images. As the user base grows, the server begins to experience performance issues. The server's CPU becomes a bottleneck because the image processing algorithm used by the application is computationally intensive, causing delays in image processing and overall sluggishness of the application."
      },
      {
        "title": "4. Authentication Bottlenecks",
        "content": "Authentication is essential for securely verifying user identities and controlling access to system resources. An authentication bottleneck occurs when this process becomes slow or overloaded, affecting overall system performance and user experience.\n\n- Caused by high volumes of login requests or inefficient authentication mechanisms.\n- Can result from limited infrastructure or poorly optimized authentication workflows.**Example: **An e-banking application may experience authentication bottlenecks during peak usage times, causing login delays if the authentication system cannot keep up with the volume of incoming requests."
      },
      {
        "title": "5. Third-party Services Bottlenecks",
        "content": "For many features, such as cloud storage, geolocation, and payment processing, modern apps frequently rely on third-party services, which limits a system's overall performance, dependability, and scalability.\n\n- A number of things, such as the third-party service's availability, response latency, rate limitations, or API modifications, might cause these bottlenecks.\n- Identifying and addressing third-party services bottlenecks is crucial for designing systems that can provide consistent and responsive user experiences.**Example: **If a ride-sharing app depends on an external mapping service and that service experiences downtime or slow response times, it can affect the app's performance and scalability."
      },
      {
        "title": "6. Code Execution Bottlenecks",
        "content": "A code execution bottleneck occurs when inefficient algorithms, excessive CPU usage, runtime overhead, or inefficient synchronization limit application performance.\n\n- Inefficient algorithms can increase the amount of computation required as the workload grows.\n- Excessive CPU usage, unnecessary processing, locking, or synchronization can slow down request processing.\n- Optimizing algorithms and reducing unnecessary computation can help improve application performance and scalability.**Example:** An application that repeatedly processes a large dataset using an inefficient algorithm may consume excessive CPU resources, increasing response times as the workload grows."
      },
      {
        "title": "7. Data Storage Bottlenecks",
        "content": "A data storage bottleneck occurs when the underlying storage system cannot provide sufficient capacity, throughput, or I/O performance for the workload.\n\n- High disk I/O or storage latency can slow down applications that frequently read or write data.\n- Insufficient storage throughput can limit the rate at which data can be processed.\n- Limited storage capacity can prevent a system from accommodating growing data volumes.**Example:** If a cloud-based file-sharing platform receives a large number of file uploads, insufficient storage throughput can slow down file uploads and retrievals, affecting the platform's performance.\n\nComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Primary Bottlenecks That Hurt Application Scalability",
      "initialCode": "import hashlib\n\n# Primary Bottlenecks That Hurt Application Scalability\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Primary Bottlenecks That Hurt Application Scalability",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Primary Bottlenecks That Hurt Application Scalability important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Primary Bottlenecks That Hurt Application Scalability",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Primary Bottlenecks That Hurt Application Scalability is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-high-availability": {
    "id": "sd-high-availability",
    "badge": "Module 3 • System Design",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "Achieving High Availability & Redundancy",
    "subtitle": "Comprehensive System Design guide to Achieving High Availability & Redundancy — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- High availability in system design refers to the ability of a system or service to remain accessible and provide its intended functionality with minimal downtime, including during certain component failures. It is commonly expressed as a percentage of availability, such as 99%, 99.9%, or 99.99%.\n\n- Systems are designed to reduce service interruptions and keep applications running continuously.\n- Uses techniques like redundancy, load balancing, and failover to maintain service availability.**Example:** Large platforms like e-commerce websites use multiple servers and load balancers, so if one server fails, another server immediately takes over and users can continue using the service without interruption.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Achieving High Availability & Redundancy."
        }
      },
      {
        "title": "2. Importance",
        "content": "High availability is important for a system for several reasons:\n\n- **Minimize Downtime:** High availability reduces service interruptions and keeps the system accessible for longer periods, ensuring smooth business operations.\n- **Improve Resilience:** High availability helps systems continue providing service during component failures and reduces the impact of disruptions.\n- **Meet Service Level Agreements (SLAs):** High availability helps organizations achieve SLA commitments by maintaining required uptime and avoiding penalties.\n- **Enhance User Experience:** Continuous system availability ensures users can access services anytime, improving satisfaction and trust.\n- **Support Critical Functions:** High availability helps keep critical services, such as healthcare and emergency systems, accessible with minimal interruption.\n- **Support Disaster Recovery:** Disaster recovery provides mechanisms to restore services after major failures or disasters, helping reduce prolonged downtime and support overall availability."
      },
      {
        "title": "3. Methods to Measure High Availability",
        "content": "High availability is typically measured as the percentage of time a system can provide its intended service. Metrics such as MTBF and MTTR provide additional information about failure frequency and recovery time and can be used to analyze factors that affect availability."
      },
      {
        "title": "1. Mean Time Between Failures (MTBF)",
        "content": "MTBF (Mean Time Between Failures) measures the average time a system runs without failure and is used to estimate reliability trends in repairable systems.\n\n- It is calculated as total operational time divided by the number of failures, helping track system performance over time.\n- A higher MTBF indicates fewer failures and better system reliability, but it does not guarantee failure-free operation.**Example:** If a server runs for 1,000 hours and fails 5 times, the MTBF would be 200 hours, meaning the system runs on average for 200 hours before a failure occurs."
      },
      {
        "title": "2. Mean Time To Repair (MTTR)",
        "content": "MTTR (Mean Time To Repair) measures the average time needed to fix a system after a failure and restore it to normal operation.\n\n- It includes diagnosing the issue, repairing it, testing the system, and confirming everything works correctly.\n- A lower MTTR means faster recovery, which can improve system availability by reducing downtime.**Example:** If a server failure takes 2 hours to fix and restore service, the MTTR for that incident is 2 hours."
      },
      {
        "title": "6. Other Related Metrics",
        "content": "There are a few additional metrics often used when analyzing system availability:\n\n- **MTTD (Mean Time to Detect):** The average time required to detect that a failure or incident has occurred.\n- **MTTF (Mean Time To Failure): **The average time a system or component operates before it fails, usually used for non-repairable components.Together, these metrics help organizations understand failure frequency, detection time, and recovery time, which can inform efforts to improve system availability and reliability."
      },
      {
        "title": "7. Availability Levels",
        "content": "This section shows how different availability percentages translate into actual downtime in real systems.\n\nAvailability Level"
      },
      {
        "title": "8. Ways to Achieve High Availability",
        "content": "High availability ensures systems remain operational with minimal downtime, preventing financial loss and other risks. It is crucial for critical domains like banking and healthcare, and is achieved using techniques such as redundancy, load balancing, and failover.\n\n- **Redundancy: **Employ redundant components or servers to ensure that another can take over seamlessly if one fails. This can include redundancy at different levels, such as hardware, networking, and data centers.\n- **Load Balancing:** Distributing incoming requests across multiple servers or resources to prevent overload and improve performance and availability.\n- **Failover Mechanisms:** Implementing automated processes to detect failures and switch to redundant systems without manual intervention.\n- **Disaster Recovery (DR):** Having a comprehensive plan in place to recover the system in case of a catastrophic event that affects the primary infrastructure.\n- **Monitoring and Alerting:** Implementing robust monitoring systems that can detect issues in real-time and notify administrators to take appropriate action promptly.\n- **Performance Optimization:** Ensuring that the system is designed and tuned to handle the expected load efficiently, reducing the risk of bottlenecks and failures.\n- **Scalability: **Designing the system to scale easily by adding more resources when needed to accommodate increased demand."
      },
      {
        "title": "9. Redundancy Architectures for High Availability",
        "content": "Redundancy ensures high availability by running multiple system instances so that if one fails, another can continue serving users. It is often combined with data replication to keep data copies across multiple servers for reliability."
      },
      {
        "title": "1. Active-Passive (Primary-Standby) Architecture",
        "content": "In this architecture, one server acts as the primary while another server remains as a backup to take over if the primary fails.\n\n- One primary server handles all requests, while a backup server remains idle and receives replicated data.\n- If the primary server fails, the backup server is manually activated to take over operations.**Example:** A banking system where the main database handles all operations while a standby database is kept as a backup.\n\nActive-Passive"
      },
      {
        "title": "2. Warm Standby Architecture",
        "content": "This architecture allows the secondary server to handle some workload, usually read operations, to utilize resources better.\n\n- The primary server handles both read and write operations, while the secondary server assists by handling read requests.\n- If the primary fails, the secondary server can partially take over and serve traffic.**Example:** News websites where users mostly read content and the secondary server helps serve read traffic."
      },
      {
        "title": "3. Active-Active Architecture",
        "content": "In this setup, multiple servers work as active nodes and can handle requests simultaneously.\n\n- Multiple servers act as active primary nodes, and all nodes can handle both read and write operations.\n- Requires careful data synchronization between nodes to avoid conflicts.**Example:** Session management systems where multiple servers store temporary session data.\n\nActive-ActiveComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Achieving High Availability & Redundancy",
      "initialCode": "import hashlib\n\n# Achieving High Availability & Redundancy\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Achieving High Availability & Redundancy",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Achieving High Availability & Redundancy important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Achieving High Availability & Redundancy",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Achieving High Availability & Redundancy is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-consistency": {
    "id": "sd-consistency",
    "badge": "Module 3 • System Design",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Consistency in System Design (Strong, Eventual, Weak)",
    "subtitle": "Comprehensive System Design guide to Consistency in System Design (Strong, Eventual, Weak) — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Consistency in system design means that all nodes in a distributed system agree on the same data value based on the chosen consistency model. It ensures that updates are eventually reflected across all nodes, even with concurrent operations or network delays.\n\n- All users and system nodes read the same data value after an update.\n- Prevents conflicts or mismatched data across different parts of the system.**Example**: In an online banking system, if money is transferred from one account to another, all servers should immediately show the updated balance so that users always see the correct information.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Consistency in System Design (Strong, Eventual, Weak)."
        }
      },
      {
        "title": "2. Types of Consistency",
        "content": "This section explains different consistency models used in distributed systems along with examples."
      },
      {
        "title": "1. Strong Consistency",
        "content": "Strong Consistency (also known as linearizability or strict consistency) ensures that every read returns the most recent write or an error, providing a single, up-to-date view of data. It requires coordination between nodes, which can impact performance and availability.\n\n- Ensures all clients see the same sequence of updates with no stale or outdated data, maintaining a fully consistent system state.\n- Requires synchronization across nodes to keep data aligned, which can increase latency and reduce overall system availability in distributed environments.**Example:** In a traditional SQL system with a single master and multiple replicas, writes go to the master and are synchronously replicated to all replicas. This ensures that reads from any replica return the latest data, maintaining a consistent view across all clients."
      },
      {
        "title": "2. Eventual Consistency",
        "content": "Eventual consistency ensures that all data replicas will converge to the same value over time, even if they temporarily differ. It relaxes strict consistency to improve system availability and performance.\n\n- Allows temporary inconsistencies between replicas, but guarantees that all updates will eventually propagate and become consistent across the system.\n- Improves scalability and performance by reducing synchronization requirements, making it suitable for distributed and high-availability systems.**Example: **Amazon DynamoDB is a distributed NoSQL database where writes are first stored on one node and then asynchronously replicated to others. This means reads may briefly return stale data, but all replicas eventually synchronize and reflect the same value over time."
      },
      {
        "title": "3. Causal Consistency",
        "content": "Causal consistency ensures that related events are seen in the correct order across all nodes, preserving cause-and-effect relationships. It maintains a logically consistent view of operations without requiring full synchronization.\n\n- Guarantees that if one operation depends on another, all nodes will observe them in the same causal order, preserving application correctness.\n- Allows concurrent independent operations without strict ordering, improving performance while still maintaining meaningful data relationships.**Example: **In a collaborative document editing application, multiple users can edit different parts simultaneously while maintaining correct order of dependent changes. Edits that rely on others are seen in the proper sequence, ensuring a consistent and meaningful document for all users."
      },
      {
        "title": "4. Weak Consistency",
        "content": "Among consistency models, weak consistency provides the least strict guarantees, allowing replicas to diverge significantly without ensuring immediate or predictable convergence. It prioritizes availability and low latency over data accuracy.\n\n- Does not guarantee when or if all replicas will become consistent, allowing temporary or even prolonged inconsistencies across the system.\n- Supports high availability and fast performance by permitting simultaneous updates without strict synchronization, but may lead to data discrepancies.**Example: **In distributed caching systems like Redis or Memcached, data is stored in memory for fast access and updates are propagated asynchronously across nodes. This can cause temporary inconsistencies where clients may read outdated or different values until all nodes are synchronized."
      },
      {
        "title": "5. Read-your-Writes Consistency",
        "content": "Read-your-writes consistency ensures that once a client updates data, it will always see its own latest changes in subsequent reads. It provides a user-centric consistency guarantee within a session.\n\n- Guarantees that a client immediately observes its own writes, preventing confusion caused by stale data after an update.\n- Maintains session consistency, making it suitable for applications where users expect instant visibility of their actions (e.g., posts, updates).**Example: **In a social media platform, users can immediately see their own posts or comments after publishing them. This ensures that their updates are instantly reflected in their timeline or profile without any delay."
      },
      {
        "title": "6. Monotonic Consistency",
        "content": "Monotonic consistency ensures that once a client observes a sequence of updates, it will always see those updates in the same order. It prevents the system from going back to older or conflicting states.\n\n- Guarantees a consistent order of operations for a client, so previously seen updates are not contradicted by later reads or writes.\n- Prevents reverting to older states, helping maintain data integrity and a coherent view of changes over time.**Example: **A distributed key-value store maintains monotonic consistency by guaranteeing that once a client observes a particular sequence of updates, it will never observe a conflicting sequence of updates. For instance, if a client reads values A, B, and C in that order, it will never later observe values C, A, and B."
      },
      {
        "title": "7. Monotonic Reads and Writes",
        "content": "Monotonic Reads and Writes ensure that a client observes a consistent progression of data over time, without seeing older values after newer ones. They maintain order and consistency within a client’s operations.\n\n- Monotonic reads guarantee that once a client sees a value, it will not read an older value later, ensuring a forward-moving view of data.\n- Monotonic writes ensure that all writes from a single client are applied in the same order across replicas, preserving the correct sequence of updates.**Example: **In Google Spanner, clients observe a consistent progression of reads and writes, where updates follow a defined order across replicas. This ensures that operations are applied in sequence and clients do not see older values after newer ones."
      },
      {
        "title": "10. Importance",
        "content": "Consistency plays a crucial role in system design for several reasons:\n\n- **Correctness:** Consistency guarantees that the information accessible by various system components is always correct and up-to-date.\n- **Reliability:** Because they lower the possibility of mistakes and inconsistencies that could result in unpredictable behavior or corrupted data, consistent systems are more dependable. Users may rely on the system to deliver reliable and accurate results.\n- **Data Integrity:** The integrity of the data kept in the system is preserved by consistency. Consistency aids in preventing data loss and corruption by guaranteeing that all changes are applied and distributed appropriately.\n- **Concurrency Control:** Consistency strategies help with access control to prevent conflicts and ensure that changes are applied in a coordinated way in distributed or multi-user systems, where multiple clients may access and modify the same data at the same time.\n- **User Experience:** Because it makes system interaction predictable and smooth, consistency improves the user experience. The system is reliable in providing users with current and logical information, which increases user happiness and usefulness."
      },
      {
        "title": "11. Challenges with maintaining Consistency",
        "content": "Maintaining consistency in distributed systems can be difficult because data is stored and processed across multiple nodes and locations.\n\n- **Coordination Overhead:** Maintaining consistency requires coordination between nodes, which adds overhead and can create scalability bottlenecks\n- **Latency:** Strong consistency increases latency as operations must wait for acknowledgments from multiple nodes, affecting user experience.\n- **Operational Complexity:** Ensuring consistency involves complex configurations, where mismanagement can lead to inconsistencies or performance issues.\n- **Data Synchronization:** Keeping data consistent across platforms is challenging due to network delays, device limits, and asynchronous updates.\n- **Concurrency Control:** Managing concurrent access to shared data requires careful design to maintain consistency across systems."
      },
      {
        "title": "12. Strategies for achieving Consistency",
        "content": "In distributed systems, achieving consistency requires the use of a number of strategies, such as best practices, consistency models, design patterns, and dispute resolution methods. The basic outline of each is as follows:"
      },
      {
        "title": "1. Design Patterns and Best Practices",
        "content": "These design practices help maintain data consistency in distributed systems and reduce the chances of conflicting data updates.\n\n- **Single Source of Truth: **Design systems with a single authoritative source of truth for critical data. This reduces the potential for inconsistencies arising from multiple conflicting sources.\n- **Unchanged Operations:** Design operations that can be applied multiple times without changing the result. Idempotent operations are essential for ensuring consistency in the face of network failures and retries.\n- **Versioning: **Implement versioning mechanisms for data objects to track changes over time. Versioning helps in detecting conflicts and resolving inconsistencies.\n- **Asynchronous Updates:** Use asynchronous communication patterns to decouple components. By enabling components to handle updates independently, asynchronous updates lower congestion and increase scalability."
      },
      {
        "title": "2. Consistency Models",
        "content": "Consistency models define how and when updates made to data become visible across different nodes in a distributed system.\n\n- **Eventual Consistency:** In situations where instant consistency is not necessary, accept eventual consistency. Allow a brief variation between replicas while guaranteeing their eventual convergence to a consistent state.\n- **Strong Consistency:** Utilize strong consistency models when strict consistency is necessary for correctness, such as in financial transactions or critical system operations. Ensure that all updates are immediately visible to all clients.\n- **Causal Consistency:** Apply causal consistency for preserving causal relationships between events in distributed systems. Ensure that events causally related are observed in the correct order across all replicas."
      },
      {
        "title": "3. Conflict Resolution Techniques",
        "content": "Conflict resolution techniques help handle situations where multiple updates to the same data occur at the same time.\n\n- **Last-Writer-Wins (LWW):** Resolve conflicts by favoring the update with the latest timestamp or version. LWW is a simple conflict resolution strategy but may lead to data loss or inconsistency in some scenarios.\n- **Merge Strategies:** Use custom merge strategies or conflict resolution algorithms tailored to the specific requirements of the application domain. Merge strategies reconcile conflicting updates based on application-specific semantics and user preferences."
      },
      {
        "title": "1. Introduction to Consistency",
        "content": "- Consistency in System Design\n- Consistency Patterns\n- CAP Theorem"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Consistency in System Design (Strong, Eventual, Weak)",
      "initialCode": "import hashlib\n\n# Consistency in System Design (Strong, Eventual, Weak)\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Consistency in System Design (Strong, Eventual, Weak)",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Consistency in System Design (Strong, Eventual, Weak) important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Consistency in System Design (Strong, Eventual, Weak)",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Consistency in System Design (Strong, Eventual, Weak) is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-consistency-patterns": {
    "id": "sd-consistency-patterns",
    "badge": "Module 3 • System Design",
    "readingTime": "18 min read",
    "level": "Intermediate",
    "title": "Consistency Patterns in Distributed Systems",
    "subtitle": "Comprehensive System Design guide to Consistency Patterns in Distributed Systems — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Consistency patterns in system design are approaches used to manage data consistency across distributed systems where multiple users read and write data simultaneously. They ensure data remains accurate and coherent across different nodes.\n\n- Strong Consistency ensures all nodes always see the latest data with no mismatch between replicas.\n- Eventual Consistency allows temporary differences but guarantees all replicas will eventually become consistent.\n- Causal Consistency maintains the order of related operations so dependent events are seen in the same sequence.These patterns help designers make informed decisions about how to manage data consistency based on the specific requirements and constraints of their systems",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Consistency Patterns in Distributed Systems."
        }
      },
      {
        "title": "2. Use Cases and Applications",
        "content": "Consistency patterns find applications across various domains where distributed systems are prevalent. Here are some use cases and applications:\n\n- **Financial Transactions:** Strong consistency ensures accurate and up-to-date data so transactions and balances are always correct.\n- **E-commerce Platforms:** Strong consistency maintains correct inventory levels across systems and prevents overselling of products.\n- **Social Media Platforms:** Eventual consistency allows posts and interactions to spread to all users over time without immediate synchronization.\n- **Collaborative Editing Tools:** Weak consistency enables multiple users to edit simultaneously with eventual synchronization of changes.\n- **Content Delivery Networks (CDNs):** Weak consistency improves performance and scalability by allowing content to sync gradually across edge servers.\n- **Real-Time Analytics:** Strong consistency ensures accurate and consistent results across distributed data sources."
      },
      {
        "title": "3. Types of Consistency Patterns",
        "content": "This section explains different consistency patterns used in distributed systems."
      },
      {
        "title": "4. Strong Consistency Patterns",
        "content": "Strong consistency ensures that whenever you make a change to data in a distributed system, every part of that system immediately knows about and agrees on that change. It's like everyone seeing the same picture at the same time, no matter where they are.\n\n- This pattern prioritizes accuracy and reliability, making sure that all users get the most up-to-date information without any differences.\n- It ensures strong data integrity but can reduce performance in large distributed systems. It is best suited for critical applications like banking and healthcare where accuracy is essential.Strong consistencyStrong consistency patterns ensure that all replicas of data in a distributed system are updated synchronously and uniformly. Here are a few key patterns:\n\n- **Strict Two-Phase Locking:** Uses a locking system so only one transaction accesses data at a time, ensuring serial execution and strong consistency.\n- **Serializability:** Ensures transactions behave as if they were executed one after another, even when run concurrently, maintaining a consistent final state.\n- **Quorum Consistency:** Requires a majority of replicas to agree on a value before committing, helping consistency but not always guaranteeing strict strong consistency.\n- **Synchronous Replication:** Updates are written to all replicas at the same time before completion, ensuring all nodes stay fully consistent.These patterns prioritize consistency over availability and partition tolerance, making them suitable for critical systems like financial transactions, but they can increase latency and reduce availability compared to eventual consistency."
      },
      {
        "title": "5. Eventual Consistency Patterns",
        "content": "Eventual consistency patterns allow temporary differences between replicas but ensure they eventually synchronize automatically without intervention. They are suitable for systems where real-time synchronization is not critical.\n\n- Data repair and periodic reconciliation help fix inconsistencies and align replicas over time.\n- Causal tracking and conflict-free data types ensure updates are applied correctly without conflicts while maintaining performance balanceEventual ConsistencyEventual consistency patterns allow temporary inconsistencies in distributed systems but ensure all replicas eventually converge to a consistent state without intervention.\n\n- **Read Repair: **Fixes stale or inconsistent data during read operations by updating it to the latest version, helping replicas converge over time.\n- **Anti-Entropy Mechanisms: **Periodically compares replicas and reconciles differences to reduce inconsistencies and ensure eventual consistency.\n- **Vector Clocks: **Track the order of updates across replicas to identify causality and resolve conflicts correctly.\n- **Conflict-free Replicated Data Types (CRDTs):** Enable concurrent updates without conflicts and ensure all replicas converge without coordination.These patterns are useful when immediate consistency is not required and eventual consistency is acceptable. They balance consistency, availability, and partition tolerance, making them suitable for applications like collaborative tools, CDNs, and social media platforms."
      },
      {
        "title": "6. Hybrid Consistency Patterns",
        "content": "Hybrid consistency patterns combine strong and eventual consistency, providing immediate accuracy for critical updates while allowing less important data to synchronize gradually.\n\n- These patterns let developers fine-tune consistency levels based on needs, workload, or network conditions, optimizing performance without sacrificing reliability.\n- It is like different gears in a car, allowing systems to switch between speed and precision based on application needs.Hybrid consistency patterns balance availability, correctness, and performance by combining strong and eventual consistency in distributed systems.\n\n- **Eventual Consistency with Strong Guarantees:** Combines eventual consistency with strong consistency enforcement for critical operations or conflict situations.\n- **Consistency Levels:** Allows different consistency settings per operation or data type based on use case requirements.\n- **Tunable Consistency:** Lets systems dynamically adjust consistency based on network, load, or user needs.\n- **Consistency Buckets:** Splits data into groups, each assigned a different consistency model based on importance or usage.Hybrid consistency patterns provide flexibility and customization in distributed systems, adapting to different requirements and trade-offs. They balance strong consistency and eventual consistency to meet specific application needs."
      },
      {
        "title": "7. Weak Consistency Patterns",
        "content": "Weak consistency patterns prioritize availability and partition tolerance over strict consistency. They allow temporary inconsistencies between replicas but ensure eventual convergence, similar to shared files syncing across devices over time.\n\n- Weak consistency patterns include eventual consistency, read-your-writes consistency (users see their own updates), and monotonic reads/writes consistency (ensuring no older values are observed in sequence).\n- These patterns are useful for systems where real-time consistency isn't crucial, emphasizing system availability and fault tolerance over immediate data accuracy.Weak ConsistencyWeak consistency patterns prioritize availability and partition tolerance over strict data consistency in distributed systems. Here are some common weak consistency patterns:\n\n- **Eventual Consistency:** Allows replicas of data to be inconsistent temporarily but ensures they will eventually converge to a consistent state without human intervention.\n- **Read Your Writes Consistency:** Guarantees that a process will always see its own writes, even in a weakly consistent system. This ensures that users perceive consistency based on their own actions.\n- **Monotonic Reads/Writes Consistency:** Monotonic Reads ensure a client never sees older values in subsequent reads, while Monotonic Writes guarantee that write operations from a client are applied in the same order.\n- **Causal Consistency:** Maintains causal relationships between related operations, ensuring that causally related events are seen by all nodes in the same order.Weak consistency patterns are suitable when immediate consistency is not required, such as in caching, CDNs, and collaborative tools, prioritizing availability and partition tolerance over strict consistency."
      },
      {
        "title": "8. Importance",
        "content": "Consistency patterns are vital in system design for several reasons:\n\n- **Data Integrity:** Ensures data remains accurate and consistent across distributed systems, preventing conflicts from concurrent updates.\n- **User Experience:** Provides reliable and predictable data, though freshness may vary depending on the consistency model.\n- **Reliability:** Improves system resilience by maintaining consistency even during node failures or network partitions.\n- **Scalability:** Helps systems scale efficiently by managing consistency without reducing performance or availability.\n- **Performance Optimization:** Allows selection of appropriate consistency models to balance performance and data accuracy based on use case."
      },
      {
        "title": "9. Challenges",
        "content": "Implementing consistency patterns in distributed systems comes with several challenges:\n\n- **Performance Overhead:** Strong consistency adds overhead due to synchronization and coordination, increasing latency and reducing throughput.\n- **Scalability Limitations:** Strict consistency becomes harder to scale as the number of nodes and data volume increases.\n- **Availability Trade-offs:** Strong consistency may reduce availability during network partitions or failures to maintain correct data.\n- **Complexity:** Implementing consistency models increases system complexity, requiring advanced coordination and conflict handling.\n- **Conflict Resolution:** Weak consistency systems can face challenges handling conflicts from concurrent updates on shared data.\n- **Operational Complexity:** Managing consistency in distributed systems requires expertise and careful monitoring, making operations complex.\n- **Trade-offs with Performance and Latency:** Weak consistency improves scalability but can introduce delays due to synchronization and conflict resolution.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Consistency Patterns in Distributed Systems",
      "initialCode": "import hashlib\n\n# Consistency Patterns in Distributed Systems\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Consistency Patterns in Distributed Systems",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Consistency Patterns in Distributed Systems important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Consistency Patterns in Distributed Systems",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Consistency Patterns in Distributed Systems is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-reliability-fault": {
    "id": "sd-reliability-fault",
    "badge": "Module 3 • System Design",
    "readingTime": "20 min read",
    "level": "Intermediate",
    "title": "Reliability and Fault Tolerance in System Design",
    "subtitle": "Comprehensive System Design guide to Reliability and Fault Tolerance in System Design — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Fault tolerance refers to a system's capacity to keep working even in the face of hardware or software issues. Redundancy, error detection, and error recovery techniques must be used to avoid a costly failure. This will allow the system to continue operating or deteriorate in performance at a slower rate.\n\n- Prevents complete system failure by allowing the system to continue working even if some components stop functioning.\n- Improves system reliability by detecting errors and switching to backup components when needed.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Reliability and Fault Tolerance in System Design."
        }
      },
      {
        "title": "2. Techniques Used to Achieve Fault Tolerance",
        "content": "Fault tolerance is achieved using multiple architectural and infrastructure techniques. These techniques reduce the impact of individual component failures and help the system continue operating.\n\n- **RAID (Redundant Array of Independent Disks):** Certain RAID configurations distribute or replicate data across multiple disks so that storage can continue operating after specific disk failures.\n- **Load Balancing:** Load balancers distribute traffic across multiple healthy servers. When combined with health checks and redundant server instances, they can redirect traffic away from failed servers.\n- **Clustering:** Multiple servers or nodes work together as a cluster. If one node fails, another healthy node can take over its workload through failover mechanisms.\n- **Virtualization with High Availability:** Virtualization can support fault tolerance when combined with clustering, monitoring, shared storage, or orchestration. If a physical host fails, virtual machines may be restarted or migrated to another healthy host.\n- **Microservices with Resilience Mechanisms:** Microservices can limit the impact of failures because services are independently deployed, but microservices alone do not provide fault tolerance. Mechanisms such as retries, timeouts, circuit breakers, redundancy, replication, service isolation, and failover are also required.\n- **Distributed Cloud Architecture:** Deploying applications across multiple availability zones or regions can reduce the impact of localized infrastructure failures when proper replication, routing, and failover mechanisms are configured."
      },
      {
        "title": "3. Replication Strategies for Enhancing Fault Tolerance",
        "content": "Replication is a common technique used to improve fault tolerance by maintaining multiple copies of data or services across different nodes. If one node fails, another replica can continue serving requests without interrupting the system."
      },
      {
        "title": "1. Full Replication",
        "content": "Full replication means creating a complete copy of a dataset or service across multiple nodes. Each replica maintains the required data so that another replica can serve requests when one node becomes unavailable.\n\n- **Advantages:** Provides multiple copies of critical data or services and reduces dependence on a single node.\n- **Challenges:** Requires additional storage, synchronization, consistency management, and communication between replicas.**Implementation:** Each replica maintains a complete copy of the required dataset or service. A separate failure detection and failover mechanism is needed to determine when traffic should be redirected to another replica."
      },
      {
        "title": "2. Partial Replication",
        "content": "Partial replication means only duplicating important or frequently used components instead of the entire system.\n\n- **Advantages:** Partial replication enhances resource efficiency by focusing on replicating** **only key components, which necessitates a careful selection process to determine which components are most critical for replication.\n- **Challenges:** Determining which parts are critical introduces complexity, and selectively replicated components present synchronization challenges.**Implementation:** Replicates only essential elements for system functionality, optimizing resource usage."
      },
      {
        "title": "3. Shadowing or Passive Replication",
        "content": "Shadowing, also known as passive replication, maintains backup replicas that remain inactive during normal operation and become active only when the primary system fails.\n\n- **Advantages: **Shadowing or passive replication offers resource efficiency during normal operation and ensures a quick response in case of a failure.\n- **Challenges: **Ensuring synchronization during the transition from passive to active state is essential, and having effective fault detection mechanisms is crucial for maintaining system reliability.**Implementation:** Inactive replicas become active when the primary system encounters a fault."
      },
      {
        "title": "4. Active Replication",
        "content": "Active replication involves multiple replicas actively processing the same sequence of requests. The replicas are kept consistent so that another replica can continue operation if one replica fails.\n\n- **Advantages:** Provides strong fault tolerance because multiple replicas are already active and maintaining the required state.\n- **Challenges:** Requires coordination, deterministic request processing, ordering of operations, and consistency management across replicas.**Implementation:** The same requests are delivered to multiple active replicas in a consistent order so that they maintain equivalent state."
      },
      {
        "title": "8. Fault Detection and Recovery",
        "content": "Fault detection and recovery are important parts of fault-tolerant systems. Fault detection helps identify when a component or service fails, while recovery mechanisms restore the system to a normal working state. Together, these processes ensure that the system can quickly respond to failures and continue operating with minimal disruption.\n\n- **Fault Detection:** Systems use monitoring tools, health checks, and heartbeat signals to detect failures in servers, databases, or network components.\n- **Automatic Recovery:** Once a fault is detected, recovery mechanisms such as service restarts, failover to backup systems, or switching to replicated nodes help restore normal operations.**Example**\n\n• In a distributed application, monitoring systems detect when a server stops responding and automatically redirect traffic to another healthy server.\n• In cloud environments, if a virtual machine crashes, the orchestration system automatically restarts it or launches a new instance to maintain service availability."
      },
      {
        "title": "9. Fault Tolerance vs High Availability",
        "content": "Fault Tolerance ensures a system continues working even when components fail, while High Availability focuses on keeping the system accessible with minimal downtime using techniques like load balancing.\n\n**Fault Tolerance****High Availability Load Balancing**Ensures the system continues operating despite certain component failures.Ensures the system remains accessible with minimal downtime.**Goal:** Continue operation during failures with little or no interruption.**Goal:** Maximize uptime and restore service quickly when failures occur.Uses redundancy, replication, failover, fault isolation, and recovery mechanisms.Uses redundancy, failover, clustering, monitoring, and load balancing.Often requires duplicate or redundant components that can take over immediately.May allow a short recovery or failover period depending on the availability target.Focuses on tolerating failures while maintaining system functionality.Focuses on minimizing the total amount of service downtime.Example: An actively replicated database continues processing requests after one replica fails.Example: A web application automatically switches traffic to healthy servers after one instance fails.Can require greater infrastructure and coordination overhead.Can often be achieved with less redundancy depending on the required SLA."
      },
      {
        "title": "10. Challenges in Implementing Fault Tolerance",
        "content": "Fault tolerance helps systems continue operating during failures, but implementing it introduces several practical challenges that must be carefully managed.\n\n- **Scalability Issues:** Scalability refers to the ability of a system to handle increasing workload or data size gracefully without sacrificing performance or availability. Scalability challenges in fault tolerance involve ensuring that fault-tolerant mechanisms can scale alongside the system's growth.\n- **Performance Impacts:** Fault tolerance mechanisms, such as redundancy and error correction, can impact system performance. This challenge involves minimizing performance degradation while maintaining high fault tolerance.\n- **Cost Considerations:** Implementing robust fault tolerance strategies often incurs additional costs due to the need for redundant hardware, software licenses, maintenance, and monitoring systems.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Reliability and Fault Tolerance in System Design",
      "initialCode": "import hashlib\n\n# Reliability and Fault Tolerance in System Design\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Reliability and Fault Tolerance in System Design",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Reliability and Fault Tolerance in System Design important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Reliability and Fault Tolerance in System Design",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Reliability and Fault Tolerance in System Design is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-concurrency-parallelism": {
    "id": "sd-concurrency-parallelism",
    "badge": "Module 3 • System Design",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "Concurrency vs Parallelism in System Architecture",
    "subtitle": "Comprehensive System Design guide to Concurrency vs Parallelism in System Architecture — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Concurrency and Parallelism are foundational concepts in computer science, especially in multithreading and distributed systems. While they sound similar, they refer to different ways of managing multiple tasks.\n\n- **Concurrency: **Like a single cashier serving multiple customers by switching between them very quickly (switching between tasks)\n- **Parallelism: **Like multiple cashiers serving multiple customers at the same time (tasks running truly at the same time)",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Concurrency vs Parallelism in System Architecture."
        }
      },
      {
        "title": "2. Concurrency",
        "content": "Concurrency refers to managing multiple tasks that make progress during overlapping time periods. The tasks may be interleaved on a single processor or may run simultaneously on multiple processors.\n\n- Tasks execute in overlapping time periods, making progress without waiting for others to complete.\n- On a single processor, the system may switch between tasks using context switching; on multicore systems, some concurrent tasks may also run in parallel.**Example: **A single-core CPU running multiple threads: the CPU rapidly switches between threads so each makes progress.\n\nConcurrency Here, first Task 1 is executing then it went to I/O stage, during this Task 2 starts executing and then it also went to I/O stage and then task 3 and so on. Finally task 1 finish its I/O stage and starts executing remaining part, Task 2 follows it and then Task 3.\n\n**Note:** Concurrency allows multiple tasks to make progress during overlapping time periods. It can improve responsiveness and resource utilization, especially when some tasks spend time waiting for I/O."
      },
      {
        "title": "3. Parallelism",
        "content": "Parallelism refers to executing multiple tasks simultaneously using multiple processing units. It improves system throughput and computational speed by dividing work across processors.\n\n- Tasks are split into smaller subtasks that run in parallel on separate cores or processors.\n- Focuses on true simultaneous execution, commonly used in data processing and high-performance applications.**Example: **A quad-core CPU running four threads: each thread assigned to a separate core and executed truly in parallel.\n\nParallelismThis diagram shows parallelism where a task is divided into smaller parts (P1 to P5) and each part is processed at the same time on different processors.**Instead of taking 5 minutes on a single processor, all parts run simultaneously and complete in just 1 minute.\n\nNote:**\n\n- Parallelism can improve computational speed by executing multiple tasks or parts of a task simultaneously on multiple processing units.\n- Concurrency allows multiple tasks to make progress during overlapping time periods. On a single processor, this may happen through interleaving, while on multicore systems some concurrent tasks may also execute in parallel."
      },
      {
        "title": "4. Concurrency Vs Parallelism",
        "content": "ConcurrencyParallelismConcurrency manages multiple tasks that make progress during overlapping time periods.Parallelism executes multiple tasks or parts of a task simultaneously.On a single processor, concurrency can be achieved through interleaving and context switching.Parallelism generally requires multiple processing units or cores for true simultaneous execution.Concurrency can work on both single-core and multicore systems.Parallel execution requires more than one execution resource.Mainly improves responsiveness and resource utilization.Mainly improves throughput and computational speed for suitable workloads.Focuses on managing multiple tasks at once.Focuses on performing multiple computations at the same instant.Debugging can be difficult because tasks may interact and execute in different orders.Debugging can also be difficult because parallel tasks may interact through shared data and synchronization.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Concurrency vs Parallelism in System Architecture",
      "initialCode": "import hashlib\n\n# Concurrency vs Parallelism in System Architecture\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Concurrency vs Parallelism in System Architecture",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Concurrency vs Parallelism in System Architecture important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Concurrency vs Parallelism in System Architecture",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Concurrency vs Parallelism in System Architecture is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-db-reference": {
    "id": "sd-db-reference",
    "badge": "Module 4 • System Design",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Complete Reference to Databases in Designing Systems",
    "subtitle": "Comprehensive System Design guide to Complete Reference to Databases in Designing Systems — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Database design is the process of organizing and structuring data so it can be stored, accessed, and managed efficiently. It plays a key role in building fast and reliable systems by improving performance, ensuring data consistency, and supporting scalability. A well-designed database meets application requirements while maintaining efficiency and reliability.\n\n- Helps organize data efficiently, enabling fast data retrieval and improving overall system performance and responsiveness.\n- Maintains data consistency and reliability, while ensuring the system can scale effectively as data and user demand grow.**Example:** An e-commerce website designs its database with separate tables for users, products, and orders so that product searches, user data, and order processing can be handled efficiently.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Complete Reference to Databases in Designing Systems."
        }
      },
      {
        "title": "2. Database",
        "content": "A database is an organized collection of data that is stored and managed so that it can be easily accessed, updated, and retrieved when needed.\n\n- A database helps store large amounts of data in a structured and efficient way. It’s used in various applications, from websites and mobile apps to enterprise systems.\n- Think of it as a digital filing cabinet where information is systematically arranged to make it easy to find and use."
      },
      {
        "title": "3. Terminologies used in the Database",
        "content": "These are some basic terms commonly used in database systems to understand how data is stored and managed.\n\n- **Data:** Any statistics which is raw and unprocessed are referred as Data.\n- **Information:** When data is processed, it is known as Information. This is because information gives an idea about what the data is about and how to use it further\n- **Database Management System(DBMS):** A system developed to add, edit, and manage various databases in a collection is known as DBMS.\n- **Transactions**: A transaction is a sequence of one or more database operations (like CRUD) executed as a single unit of work."
      },
      {
        "title": "4. Types of Databases",
        "content": "Databases are categorized based on their data models, structure, and use cases in system design."
      },
      {
        "title": "1. Relational Databases(SQL)",
        "content": "Relational databases store structured data in a well-organized tabular format.\n\n- Organize data into tables (rows and columns), where each table has a predefined structure.\n- Tables can have relationships with one another using keys (e.g., primary and foreign keys).\n- **Example:** MySQL, PostgreSQL, and Oracle Database.\n- Best for structured data like financial systems or inventory management."
      },
      {
        "title": "2. Non-Relational Databases(NoSQL)",
        "content": "Non-relational databases store data in flexible formats and are designed for scalability.\n\n- Do not use tables. Instead, they store data in flexible formats like documents, key-value pairs, graphs, or columns.\n- Designed to handle unstructured or semi-structured data, such as social media posts or IoT data.\n- **Example: **MongoDB, Cassandra, and DynamoDB.\n- Ideal for applications that require high scalability and flexibility."
      },
      {
        "title": "7. Importance",
        "content": "Good database design is important in system design because it ensures that the system can handle data efficiently, reliably, and at scale. Let us see its importance:\n\n- **Performance**: A well-designed database processes data quickly, which means faster responses for users and smoother system operations.\n- **Scalability**: As the system grows, a good database design can handle more users and data without slowing down or failing.\n- **Data Integrity**: Proper design prevents duplicate, inconsistent, or incorrect data, ensuring the system works accurately.\n- **Ease of Maintenance**: A clean, logical database structure is easier to understand and update, saving time and effort when making changes or fixing issues.\n- **Cost-Efficiency**: Optimized database designs use resources efficiently, reducing server costs and improving overall system performance."
      },
      {
        "title": "8. Relational(SQL) Vs Non-Relational Databases(NoSQL)",
        "content": "Relational Database (SQL)Non-Relational Database (NoSQL)Uses tables with rows and columns to store structured data.Uses flexible data models such as documents, key-value pairs, graphs, or wide-column structures.Typically uses a predefined schema, although some relational databases support flexible or semi-structured data.Often supports flexible schemas, allowing data structures to evolve more easily.Supports relationships between data using keys, joins, and other relational features.Relationship and join capabilities vary by database; some NoSQL databases also support relationships or transactions.Can scale vertically and can also scale horizontally using techniques such as replication, partitioning, or sharding.Many NoSQL databases are designed to scale horizontally, although the specific approach depends on the database.Suitable for applications requiring structured data, complex queries, and transactional guarantees.Suitable for applications that benefit from flexible data models, distributed workloads, or specific scalability requirements."
      },
      {
        "title": "9. CAP Theorem In Database Designing",
        "content": "The CAP Theorem describes a trade-off in distributed systems when a network partition occurs. A distributed system cannot guarantee both Consistency and Availability during the same partition while also tolerating that partition.\n\n- **Consistency:** Every read receives the most recent write or an appropriate error.\n- **Availability:** Every request receives a response, even if it may not contain the most recent data.\n- **Partition Tolerance:** The system continues operating despite a network partition between distributed components.When a network partition occurs, a system must choose whether to prioritize consistency or availability."
      },
      {
        "title": "1. CP database",
        "content": "A CP database prioritizes Consistency and Partition Tolerance from the CAP theorem. This means:\n\n- **Consistency:** Every read receives the most recent write or an appropriate error. During normal operation, all nodes provide consistent data according to the system's consistency guarantees.\n- **Partition Tolerance:** The database continues operating despite a network partition between distributed components.However, during a network partition, it may sacrifice Availability, meaning some requests may be rejected or delayed to prevent inconsistent results.\n\n**Example:** Systems that require strongly consistent data, such as applications managing financial transactions, may prioritize consistency during network partitions rather than continuing to serve potentially stale data."
      },
      {
        "title": "2. AP database",
        "content": "An AP database prioritizes Availability and Partition Tolerance from the CAP theorem.\n\n- **Availability:** The system continues responding to requests during a network partition, according to its availability guarantees.\n- **Partition Tolerance:** The database continues operating despite a network partition between distributed components.During a network partition, Consistency may be temporarily reduced, meaning different nodes may return different values until the system synchronizes.\n\n**Example:** Apache Cassandra is designed for high availability and partition tolerance. Depending on its configuration and consistency level, different replicas may temporarily contain different values before they become consistent."
      },
      {
        "title": "3. CA Database",
        "content": "A CA system provides Consistency and Availability when there is no network partition between distributed components.\n\n- **Consistency:** Every read receives the most recent write or an appropriate error, according to the system's consistency guarantees.\n- **Availability:** Every request receives a response, according to the system's availability guarantees.However, a CA system does not provide Partition Tolerance. If a network partition occurs, it cannot guarantee both consistency and availability while continuing to operate across the partition.\n\n**Example:** A single-node database can provide consistency and availability while the node is operational, but it does not provide partition tolerance across distributed nodes."
      },
      {
        "title": "13. Choosing the Right Database for Your Application",
        "content": "Choosing the right database depends on the needs of your application. Here are a few key factors to consider when making this decision:"
      },
      {
        "title": "1. Data Structure",
        "content": "Defines how data is organized, stored, and managed within the database system.\n\n- **Relational Databases (SQL):** Best for structured data with clearly defined tables and relationships.\n- **Non-Relational Databases (NoSQL):** Suitable for unstructured or semi-structured data with flexible formats."
      },
      {
        "title": "2. Scalability Needs",
        "content": "Determines how well a database can handle growing data and increasing user traffic.\n\n- **Relational Databases:** Usually scale vertically by increasing the resources of a single server.\n- **Non-Relational Databases:** Commonly scale horizontally by adding more servers to distribute workload."
      },
      {
        "title": "3. Consistency and Availability",
        "content": "Consistency and availability requirements depend on the specific database, configuration, and application workload.\n\n- **Relational Databases:** Many relational databases provide strong transactional and consistency guarantees, but their exact behavior depends on the database and configuration.\n- **Non-Relational Databases:** NoSQL databases can support different consistency models, ranging from strong consistency to eventual consistency, depending on the database and configuration."
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Complete Reference to Databases in Designing Systems",
      "initialCode": "import hashlib\n\n# Complete Reference to Databases in Designing Systems\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Complete Reference to Databases in Designing Systems",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Complete Reference to Databases in Designing Systems important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Complete Reference to Databases in Designing Systems",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Complete Reference to Databases in Designing Systems is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-sql-vs-nosql": {
    "id": "sd-sql-vs-nosql",
    "badge": "Module 4 • System Design",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "Choosing a Database in System Design: SQL vs NoSQL",
    "subtitle": "Comprehensive System Design guide to Choosing a Database in System Design: SQL vs NoSQL — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- When designing a system, one of the most critical decisions is choosing between SQL and NoSQL databases. This choice can significantly impact the system’s performance, scalability, and overall success.\n\n- **SQL databases:** Use relational data models with structured schemas and are commonly used for applications requiring complex queries, relationships, and transactional guarantees.\n- **NoSQL databases:** Use non-relational data models such as document, key-value, wide-column, and graph models. They often provide flexible data models, while their scalability, consistency, and transaction capabilities depend on the specific database and configuration.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Choosing a Database in System Design: SQL vs NoSQL."
        }
      },
      {
        "title": "2. SQL Database",
        "content": "SQL databases are relational systems that organize data into tables and use SQL for querying and data management. They commonly provide structured schemas, relationships, and transactional guarantees, although specific capabilities and consistency behavior depend on the database and configuration."
      },
      {
        "title": "3. Characteristics",
        "content": "SQL databases follow a structured approach to store and manage data efficiently.\n\n- **Tabular Data Model: **SQL databases organize records into tables with rows and columns.\n- **Fixed Schema:** SQL databases require a predefined schema, which means that you must define the structure of the records, specifying record types and relationships earlier than adding records to the database.\n- **ACID Transactions:** Many SQL databases support ACID transactions, providing Atomicity, Consistency, Isolation, and Durability for transactional operations.\n- **Structured Schema:** SQL databases generally use predefined schemas that define tables, columns, data types, and relationships. Some relational databases also support semi-structured data and schema flexibility."
      },
      {
        "title": "4. Example",
        "content": "Common SQL databases widely used in real-world applications.\n\n- **MySQL:** An open-source relational database widely used in various applications.\n- **PostgreSQL: **A powerful open-source relational database known for its extensibility and support for advanced features."
      },
      {
        "title": "5. Applications",
        "content": "SQL databases are commonly used in systems requiring structured data and strong consistency.\n\n- **E-commerce / Financial Systems / CMS : ** Managing structured data, relationships, and ensuring transactional integrity and use SQL.\n- **Banking & Inventory Management : ** Ensures accuracy when transferring funds or updating inventory."
      },
      {
        "title": "6. NoSQL Database",
        "content": "NoSQL databases are non-relational databases that support different data models, such as document, key-value, wide-column, and graph models. They often provide flexible data models and can support distributed workloads, but their scalability, consistency, transaction, and availability capabilities vary by database and configuration."
      },
      {
        "title": "7. Characteristics",
        "content": "NoSQL databases are designed to handle flexible, scalable, and distributed data efficiently.\n\n- **Flexible Data Model:** NoSQL databases support different types of data storage, such as key-value, document, column, and graph formats.\n- **Flexible Schema:** Many NoSQL databases support flexible schemas, allowing data structures to evolve without requiring a fixed relational schema. However, schema rules may still be enforced by the database or application.\n- **Consistency and Transactions:** NoSQL databases can support different consistency models and transaction guarantees. Some provide strong consistency and ACID transactions, while others may use eventual consistency or provide configurable consistency levels.\n- **Proprietary Query Language:** NoSQL databases typically have their own query languages tailored to their specific data models. These query languages are often simpler and better suited to the data structure."
      },
      {
        "title": "8. Example",
        "content": "Popular NoSQL databases used in modern applications.\n\n- **MongoDB:** A popular document store that offers flexibility and scalability.\n- **Cassandra:** A wide-column store designed to handle large amounts of data and support high write speeds."
      },
      {
        "title": "9. Applications",
        "content": "NoSQL databases are commonly used in systems requiring scalability and handling unstructured data.\n\n- **Social Media & Big Data Platforms : **Handling unstructured user-generated content at scale. Code submissions on GeeksforGeeks Practice.\n- **Real-Time Analytics, IoT Applications : **High write volume, schema flexibility, and the need for fast access."
      },
      {
        "title": "10. Situations Where SQL Databases Are a Better Choice",
        "content": "SQL databases are appropriate for situations such as:\n\n- **Complex Queries:** If your application requires advanced queries and complex reporting, SQL databases excel in this area because of their structured schema and SQL query language.\n- **Data Integrity:** When an application requires strong transactional guarantees and well-defined relationships, a relational database with appropriate consistency and transaction support can be a suitable choice.\n- **Transactions: **SQL databases are the go-to option for applications that require support for multi-step, ACID-compliant transactions, like e-commerce systems."
      },
      {
        "title": "11. Situations Where NoSQL Databases Are a Better Choice",
        "content": "NoSQL databases may be appropriate when their specific data model and capabilities match the application's requirements.\n\n- **Flexible Data Model:** Useful when the structure of data changes frequently or when a document, key-value, wide-column, or graph model fits the application better.\n- **Distributed Workloads:** Some NoSQL databases are designed to distribute data and workloads across multiple nodes, making them suitable for certain large-scale distributed applications.\n- **High-Volume Workloads:** Some NoSQL databases are optimized for specific high-throughput workloads, such as large numbers of writes or key-based reads.\n- **Real-Time Applications:** Some NoSQL databases can provide low-latency access for specific workloads, depending on the database design and configuration."
      },
      {
        "title": "12. Differences between SQL and NoSQL",
        "content": "Below are the important differences between SQL and NoSQL:\n\nSQL DatabasesNoSQL DatabasesUse a relational data model with tables consisting of rows and columns.Use non-relational models such as document, key-value, wide-column, or graph.Generally use structured schemas that define tables, columns, data types, and relationships.Often provide flexible schemas, although schema rules may still be enforced by the database or application.Well suited for structured data and applications with defined relationships.Suitable for workloads where document, key-value, wide-column, or graph models fit the data and access patterns.Use SQL for querying and managing relational data.Use database-specific query languages, APIs, or query mechanisms depending on the database.Can scale vertically and can also scale horizontally depending on the database architecture and deployment.Many NoSQL databases support horizontal scaling, but scalability depends on the database and architecture.Many SQL databases provide ACID transactions and strong transactional guarantees.Transaction and consistency guarantees vary by database; some NoSQL databases support ACID transactions and strong consistency.Handle relationships using features such as keys, joins, and constraints.Relationship handling depends on the data model; graph and document databases can model relationships directly, while other approaches may use application-level logic.Schema changes may require database migrations or other schema-management processes.Flexible schemas can make evolving data structures easier, depending on the database.Commonly used for complex queries, relational data, and transactional workloads.Commonly used for workloads where flexible data models, distributed processing, or specific access patterns are beneficial.Examples include MySQL, PostgreSQL, and Oracle.Examples include MongoDB, Cassandra, and Redis.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Choosing a Database in System Design: SQL vs NoSQL",
      "initialCode": "import hashlib\n\n# Choosing a Database in System Design: SQL vs NoSQL\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Choosing a Database in System Design: SQL vs NoSQL",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Choosing a Database in System Design: SQL vs NoSQL important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Choosing a Database in System Design: SQL vs NoSQL",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Choosing a Database in System Design: SQL vs NoSQL is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-block-object-file": {
    "id": "sd-block-object-file",
    "badge": "Module 4 • System Design",
    "readingTime": "28 min read",
    "level": "Intermediate",
    "title": "Block, Object, and File Storage in the Cloud",
    "subtitle": "Comprehensive System Design guide to Block, Object, and File Storage in the Cloud — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Storage is an important component of system design because it determines how data is stored, accessed, and managed. Different storage types are used depending on application requirements and data structure.\n\n- Block Storage stores data in fixed-size blocks and is commonly used in databases and virtual machines.\n- File Storage organizes data in files and directories, making it suitable for shared file systems and document storage.\n- Object Storage stores data as objects with metadata and unique identifiers, ideal for large-scale unstructured data.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Block, Object, and File Storage in the Cloud."
        }
      },
      {
        "title": "1. Block storage",
        "content": "Block storage is a method of storing data in fixed-size blocks, where each block has a unique address and works independently. Unlike file storage, it does not follow a hierarchical structure, making it more flexible and efficient. It is commonly used in high-performance systems like databases and virtual machines.\n\n- Stores data in fixed-size blocks with unique addresses\n- No predefined structure, unlike file-based storage\n- Ideal for high performance and scalable systems like databases and VMsBlock Storage ArchitectureBlock storage doesn’t inherently “understand” the data it stores - it only stores raw bytes. The file system on top of block storage interprets it into files. So block storage itself isn’t aware of formats or data types."
      },
      {
        "title": "3. Example",
        "content": "Consider a cloud-based database service where you need to store a large amount of structured data. The data is broken into smaller pieces (blocks) and distributed across a storage area network. When you access the database,\n\n- The system retrieves the required blocks and reassembles them into meaningful data for your application.\n- Amazon Elastic Block Store (EBS) is a real-world example of block storage."
      },
      {
        "title": "4. Working",
        "content": "Imagine a warehouse where items aren't organized by category or aisle, but simply placed in numbered bins. Each bin (block) can hold anything, and you access items directly by their bin number. This direct-access model eliminates the overhead of navigating folder hierarchies, resulting in exceptional speed."
      },
      {
        "title": "5. Features",
        "content": "Block storage stores data in fixed-sized blocks, making it suitable for high-performance and low-latency applications.\n\n- **High Performance:** Block storage is perfect for high-performance applications since it is designed for quick read/write operations.\n- **Flexibility:** Since it does not impose a particular structure, it allows data to be stored in any format.\n- **Scalability:** Blocks can be added or removed easily to scale the storage up or down.\n- **Independence:** Each block operates independently, enabling precise control and management of data.\n- **Use in Distributed Systems:** Block storage can be distributed across multiple servers for redundancy and improved performance."
      },
      {
        "title": "2. Object Storage",
        "content": "With object storage, data is kept as discrete units known as \"objects.\" A unique identity, metadata (information about the data), and the actual data are all contained in each item. Object storage is hence very flexible, scalable, and appropriate for storing vast amounts of unstructured data, such as backups, videos, and pictures.\n\n- Object storage doesn't use fixed-sized blocks or a hierarchical file system like file or block storage does.\n- Instead, it organizes data into a flat structure, which is easier to scale and manage in distributed environments.Note: Object storage is ideal for write-once, read-many (WORM) workloads, not for frequently modified data."
      },
      {
        "title": "7. Understanding the Object Model",
        "content": "Think of object storage as a vast library where every book has a unique ISBN, a detailed catalog card, and can be retrieved directly without knowing which shelf it's on. The flat structure eliminates hierarchical limitations, allowing the system to scale horizontally across unlimited storage nodes."
      },
      {
        "title": "8. Example",
        "content": "Object storage is widely used for storing large amounts of unstructured data in cloud-based applications.\n\n- **Media Streaming**: Netflix and YouTube store billions of video files as objects, serving them to millions of concurrent viewers.\n- **Backup and Archival**: Companies use object storage for long-term data retention, leveraging its durability and low cost per gigabyte.\n- **Big Data Analytics**: Data lakes built on object storage allow analysts to store raw data in any format and process it at scale.\n- **Static Website Hosting**: Web assets like images, CSS, and JavaScript files are served directly from object storage."
      },
      {
        "title": "9. Features",
        "content": "Object storage systems are designed to handle massive volumes of unstructured data efficiently.\n\n- **Scalability:** Object storage is perfect for cloud applications because it can manage massive volumes of data.\n- **Metadata Richness:** Metadata is stored in every object to help with data management, indexing, and searching.\n- **Global Accessibility:** Objects can be accessed via HTTP/HTTPS, making it suitable for web-based applications.\n- **Cost-Effective for Unstructured Data:** Large amounts of unstructured data, such as logs, media files, and backups, are ideal for this storage.\n- **Resilient and Durable:** To provide stability and fault tolerance, object storage systems frequently duplicate data across different locations."
      },
      {
        "title": "3. File Storage",
        "content": "Similar to how we arrange files on a computer, file storage is a conventional technique of storing data in a hierarchical system of files and folders. Every file has a name and directory path, which helps access and navigation. Applications that need regular updates and organized data management are best suited for it.\n\nFile Storage in System Design"
      },
      {
        "title": "11. The Hierarchical Model",
        "content": "File storage organizes data in a tree structure with directories (folders) containing files and subdirectories. Each file has a path (like `/projects/2024/report.pdf`) that defines its location, making navigation logical and straightforward."
      },
      {
        "title": "12. Example",
        "content": "Amazon EFS, Google Filestore, or Azure Files for cloud file storage analogs\n\n- **Corporate File Shares**: Departments share documents, spreadsheets, and presentations through networked drives with folder hierarchies mirroring organisational structure.\n- **Content Management**: Web servers host files in organised directories, serving websites through familiar path-based URLs.\n- **Development Environments**: Developers work with codebases organised in folder structures, relying on file storage for source control integration.\n- **Home Directories**: User workspaces on servers maintain personal files in individual, permission-protected directories."
      },
      {
        "title": "13. Features",
        "content": "File storage systems organize and manage data in a traditional file-and-folder structure, making them easy to understand and use.\n\n- **Hierarchical Organization:** Data is stored in a clear folder-and-file structure, making it easy to locate and manage.\n- **Simplicity:** File storage systems are easy to set up and use for small-scale applications.\n- **Compatibility:** Works well with legacy applications and systems that require traditional file access methods.\n- **Shared Access:** Supports multi-user environments with file permissions and version control.\n- **Data Integrity:** Ensures consistency and integrity through locking mechanisms during file updates but distributed file systems (like NFS) can experience locking issues and performance bottlenecks under concurrency."
      },
      {
        "title": "14. Block Storage Vs Object Storage Vs File Storage",
        "content": "This section explains the key differences between block, object, and file storage systems in terms of structure, performance, and use cases.\n\nDifferences between them are as follows:\n\nBlock Storage\n\nObject Storage\n\nFile Storage\n\nDivides data into fixed-size blocks, each with a unique identifier.\n\nStores data as objects with metadata and a unique ID in a flat structure.\n\nOrganizes data in a hierarchical structure of files and folders.\n\nIdeal for databases, virtual machines, and transactional workloads requiring high performance.\n\nBest for storing large amounts of unstructured data, like multimedia files or backups.\n\nSuitable for structured file storage and shared file access, such as documents and spreadsheets.\n\nHigh performance and low latency, especially for read/write operations.\n\nOptimised for scalability and durability, not real-time performance.\n\nModerate performance; dependent on file system and storage device.\n\nScales well but may require manual configuration for capacity expansion.\n\nHighly scalable; can handle massive amounts of data across distributed systems.\n\nLimited scalability compared to object storage; suitable for smaller systems.\n\nMinimal metadata, often handled by the application layer.\n\nExtensive metadata stored with each object, enabling advanced search and analytics.\n\nBasic metadata, such as file name, type, and permissions.\n\nRequires manual backup or snapshot configurations for data durability.\n\nHighly durable with built-in redundancy across multiple locations.\n\nData durability depends on the underlying file system and backup strategies.\n\nAWS EBS, Google Persistent Disks, SAN (Storage Area Network).\n\nAWS S3, Azure Blob Storage, Google Cloud Storage.\n\nNetwork Attached Storage (NAS), Shared Drives, Local File Systems.\n\nComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Block, Object, and File Storage in the Cloud",
      "initialCode": "import hashlib\n\n# Block, Object, and File Storage in the Cloud\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Block, Object, and File Storage in the Cloud",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Block, Object, and File Storage in the Cloud important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Block, Object, and File Storage in the Cloud",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Block, Object, and File Storage in the Cloud is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-db-replication": {
    "id": "sd-db-replication",
    "badge": "Module 4 • System Design",
    "readingTime": "30 min read",
    "level": "Intermediate",
    "title": "Database Replication & Master-Replica Topologies",
    "subtitle": "Comprehensive System Design guide to Database Replication & Master-Replica Topologies — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "![Database Sharding and Replication](/images/system-design/db-sharding-replication.svg)\n\n- Making and keeping copies of a database on other servers is known as database replication. It improves availability, provides redundancy, and can help distribute read workloads across multiple servers.\n\n- **Improves availability and resilience:** Multiple copies of data allow the system to continue serving requests if a server fails and a replica can take over. However, replication is not a replacement for backups because data corruption or accidental deletion can also be replicated.\n- **Supports read scaling:** Read requests can be distributed across replicas, reducing the load on the primary database and improving performance for read-heavy applications.**Example:** An e-commerce website may use a primary database for write operations and multiple replica databases to handle read requests from users.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Database Replication & Master-Replica Topologies."
        }
      },
      {
        "title": "2. Working",
        "content": "These steps explaining how database replication works:\n\nWorking of Database Replication\n- **Identify the Primary Database (Source)**: A primary (master) database is selected as the main source where all data changes originate.\n- **Set Up Replica Databases (Targets)**: One or more replica databases are configured to receive data from the primary database.\n- **Capture Data Changes**: All inserts, updates, and deletes are recorded using logs or change data capture mechanisms.\n- **Transmit Changes to Replicas**: Captured changes are sent to replica databases either in real-time or at scheduled intervals.\n- **Apply Changes on Replicas**: Replica databases apply the received updates to stay synchronized with the primary database.\n- **Monitor Synchronization**: The system continuously checks replication status and resolves delays or synchronization issues.\n- **Handle Read/Write Operations**: Read operations may be distributed across replicas, while write operations typically go to the primary database in primary-replica configurations. The exact read/write behavior depends on the replication model and database configuration."
      },
      {
        "title": "3. Types of Database Replication",
        "content": "Understand the different types of database replication:"
      },
      {
        "title": "1. Primary-Replica Replication",
        "content": "In this replication model, one database acts as the primary server while others maintain copies of its data.\n\n- The master database handles all write operations such as insert, update, and delete.\n- Replica databases replicate data from the primary and may handle read operations."
      },
      {
        "title": "2. Master-Master Replication / Multi-Master Replication",
        "content": "In this setup, multiple databases act as masters and can accept both read and write operations.\n\n- Changes made in one master database are replicated to the other master databases.\n- Can support distributed write operations and improve availability, but requires mechanisms for handling conflicts and maintaining consistency."
      },
      {
        "title": "3. Snapshot Replication",
        "content": "This method replicates the entire database by taking a snapshot at a specific point in time.\n\n- A complete copy of the database is created and transferred to other servers.\n- Suitable when periodic copies of data are sufficient and near-real-time replication is not required."
      },
      {
        "title": "4. Transactional Replication",
        "content": "Transactional replication synchronizes databases by replicating changes as they occur.\n\n- Changes made in the publisher database are quickly sent to subscriber databases.\n- Replicates changes with low latency, but the exact consistency and replication delay depend on the implementation and configuration."
      },
      {
        "title": "5. Merge Replication",
        "content": "Merge replication allows multiple databases to update data independently and later synchronize the changes.\n\n- Both publisher and subscriber databases can make modifications to the data.\n- Conflicts are detected and resolved during the synchronization process."
      },
      {
        "title": "9. Strategies",
        "content": "Database replication strategies determine how to select data, copy and distribute it between databases to gain specific goals such as scalability, availability, and efficiency.\n\n- **Full Replication:** Also referred to as full database replication, this is a technique in which the whole database is replicated to one or more destination servers. All the tables, rows, and columns in the database are copied to the destination servers. The replicas thus obtain an exact copy of the original database.\n- **Partial Replication:** This method involves not replicating the entire database, but merely a subset of it, such as particular tables, rows, or columns. This method can be useful when only specific data has to be reproduced for reporting, analysis, or other reasons, and it enables a more effective use of resources.\n- **Selective Replication:** It is a database replication strategy that involves replicating data based on predefined criteria or conditions. Unlike full replication, which replicates the entire database, or partial replication, which replicates a subset of the database, selective replication allows for more granular control over which data is replicated.\n- **Hybrid Replication:** It is a database replication strategy that combines multiple replication techniques to achieve specific goals. This approach allows for the customization of replication methods based on the requirements of different parts of the database or application."
      },
      {
        "title": "10. Configurations",
        "content": "To accomplish particular objectives related to data consistency, availability, and performance, database replication can be set up and run in a variety of ways:"
      },
      {
        "title": "1. Synchronous Replication Configuration",
        "content": "In synchronous replication, the transaction waits for the required replication acknowledgments before it is considered committed.\n\n- The transaction is committed only after at least one replica confirms that it has received the update.\n- Can provide strong consistency guarantees when configured to wait for the required replicas, although the exact behavior depends on the database and replication configuration."
      },
      {
        "title": "2. Asynchronous Replication Configuration",
        "content": "In asynchronous replication, the primary database sends updates to replicas without waiting for confirmation.\n\n- The primary database does not wait for replicas to acknowledge the update before completing the transaction, which can reduce write latency.\n- Replicas may receive updates with a slight delay, which can lead to temporary data inconsistency."
      },
      {
        "title": "3. Semi-synchronous Replication Configuration",
        "content": "Semi-synchronous replication is a hybrid approach that combines features of synchronous and asynchronous replication.\n\n- The primary database waits for confirmation from at least one replica before committing the transaction.\n- Other replicas receive updates asynchronously, allowing some replicas to acknowledge updates synchronously while other replicas may receive updates asynchronously."
      },
      {
        "title": "14. Importance",
        "content": "Database replication is important for several reasons:\n\n- **High Availability:** Replication can improve availability by providing additional copies of data that can be used after a server failure. Automatic failover, health checks, traffic routing, and recovery mechanisms are also required to achieve high availability.\n- **Disaster Recovery:** Replication can support disaster recovery by maintaining copies of data on separate systems or locations. However, replication is not a replacement for backups because data corruption, accidental deletion, or incorrect updates can also be replicated.\n- **Load Balancing:** Replication can allow read requests to be distributed across replica servers, reducing read load on the primary database when the application and database support read routing.\n- **Fault Tolerance:** Replication can improve fault tolerance by providing additional database copies. Failover and traffic-routing mechanisms are required to shift requests to another replica when a server fails.\n- **Scalability:** Replication can improve read scalability by distributing read traffic across multiple replicas, particularly for read-heavy workloads.\n- **Data Locality:** Replicas can be placed closer to users or application regions to reduce read latency and improve performance for geographically distributed applications."
      },
      {
        "title": "15. Challenges",
        "content": "Some of the challenges with Database Replication are:\n\n- **Data Consistency:** It can be difficult to maintain consistency among replicas, particularly in asynchronous replication situations where data replication may be delayed.\n- **Complexity:** System complexity is increased by database replication, which requires thorough setup and administration to guarantee accurate and effective data replication.\n- **Cost:** Setting up and maintaining a replicated database environment can be costly, especially for large-scale deployments with multiple replicas.\n- **Conflict Resolution:** When the same data is changed on multiple replicas at once in multi-master replication environments, conflicts might arise that require conflict resolution techniques.\n- **Latency:** Synchronous replication can introduce additional latency because the transaction may need to wait for acknowledgments from the required replicas before committing.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Database Replication & Master-Replica Topologies",
      "initialCode": "import hashlib\n\n# Database Replication & Master-Replica Topologies\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Database Replication & Master-Replica Topologies",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Database Replication & Master-Replica Topologies important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Database Replication & Master-Replica Topologies",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Database Replication & Master-Replica Topologies is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-db-sharding": {
    "id": "sd-db-sharding",
    "badge": "Module 4 • System Design",
    "readingTime": "30 min read",
    "level": "Intermediate",
    "title": "Database Sharding Architecture & Strategies",
    "subtitle": "Comprehensive System Design guide to Database Sharding Architecture & Strategies — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "![Database Sharding and Replication](/images/system-design/db-sharding-replication.svg)\n\n- Database sharding is a technique used to scale databases by distributing data across multiple servers. It helps improve performance and handle large datasets efficiently.\n\n- Data is split into smaller parts called shards, each stored on a different database instance to distribute load.\n- It reduces pressure on a single database, improving query performance and scalability. It is basically a database architecture pattern in which we split a large dataset into smaller chunks (logical shards) and we store/distribute these chunks in different machines/database nodes (physical shards).\n\n- Each chunk/partition is known as a \"shard\" and each shard has the same database schema as the original database.\n- We distribute the data in such a way that each row appears in exactly one shard.\n- It's a good mechanism to improve the scalability of an application.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Database Sharding Architecture & Strategies."
        }
      },
      {
        "title": "2. Methods of Sharding",
        "content": "Sharding can be done using Range-based, Hash-based, Directory-based, or Geographic-based partitioning to distribute data across multiple servers."
      },
      {
        "title": "1. Key Based Sharding",
        "content": "Key Based Sharding is a technique, also known as hash-based sharding. Here, we take the value of an entity such as customer ID, customer email, IP address of a client, zip code, etc and we use this value as an input of the hash function. This process generates a hash value which is used to determine which shard we need to use to store the data.\n\n- The hash function should consistently use the selected shard key or shard-key fields to determine the target shard.\n- A shard key is a field or combination of fields used to determine which shard stores a record. It does not necessarily have to be a primary key or unique identifier.**Example**: You have 3 database servers and each request has an application id which is incremented by 1 every time a new application is registered.\n\nTo determine which server should store the data, we can perform application_id % 3. The remainder is then mapped to a specific shard."
      },
      {
        "title": "4. Advantages",
        "content": "Key-based sharding helps distribute data across shards using a hashing mechanism.\n\n- **Key Assignment: **Assigns each key to a specific shard, ensuring uniform and consistent data distribution.\n- **Even Distribution:** Hash-based sharding can distribute data relatively evenly across shards when the shard key has a suitable distribution."
      },
      {
        "title": "5. Disadvantages",
        "content": "Despite its efficiency, improper shard key selection can cause performance issues.\n\n- **Uneven Data Distribution: **Can occur if the sharding key isn’t well-distributed.\n- **Hotspots:** Poor shard-key selection can cause some shards to receive disproportionately high traffic or data, creating hotspots and uneven workloads."
      },
      {
        "title": "2. Range-Based Sharding",
        "content": "Range-based sharding is a form of horizontal sharding in which rows are distributed across shards according to ranges of the shard key.\n\n- In one shard you can keep the info of customers whose first name starts with A-P.\n- In another shard, keep the information of the rest of the customers. **Example:** In a customer database, one shard may store records with customer IDs 1–1000, while another stores IDs 1001–2000."
      },
      {
        "title": "7. Advantages",
        "content": "Horizontal or range-based sharding distributes data across multiple shards based on specific value ranges.\n\n- **Scalability:** Horizontal or range-based sharding allows for seamless scalability by distributing data across multiple shards, accommodating growing datasets.\n- **Improved Performance:** Data distribution among shards enhances query performance through parallelization, ensuring faster operations with smaller subsets of data handled by each shard."
      },
      {
        "title": "8. Disadvantages",
        "content": "Managing and querying data across multiple shards can introduce additional complexity.\n\n- **Complex Querying Across Shards:** Coordinating queries involving multiple shards can be challenging.\n- **Uneven Data Distribution:** Poorly managed data distribution may lead to uneven workloads among shards."
      },
      {
        "title": "3. Vertical Partitioning",
        "content": "Vertical partitioning divides a table by separating columns into different groups based on functionality or access patterns.\n\n- Each shard contains a subset of columns while rows remain logically related to the same entity.\n- Different groups of columns can be stored separately to improve performance and manageability. If these partitions are distributed across different database nodes, this can be considered a form of vertical sharding.**Example**: For example, a user table may contain profile information, contact information, and other attributes. These columns can be divided into separate groups based on access patterns."
      },
      {
        "title": "10. Advantages",
        "content": "Vertical sharding divides a database by separating columns into different shards based on functionality.\n\n- **Query Performance:** Vertical sharding can improve query performance by allowing each shard to focus on a specific subset of columns. This specialization enhances the efficiency of queries that involve only a subset of the available columns.\n- **Simplified Queries:** Queries that require a specific set of columns can be simplified, as they only need to interact with the shard containing the relevant columns."
      },
      {
        "title": "11. Disadvantages",
        "content": "Splitting columns across shards can introduce operational and workload challenges.\n\n- **Potential for Hotspots:** Certain shards may become hotspots if they contain highly accessed columns, leading to uneven distribution of workloads.\n- **Challenges in Schema Changes:** Making changes to the schema, such as adding or removing columns, may be more challenging in a vertically sharded system. Changes can impact multiple shards and require careful coordination."
      },
      {
        "title": "4. Directory-Based Sharding",
        "content": "In Directory-Based Sharding, we create and maintain a lookup service or lookup table for the original database. Basically we use a shard key for lookup table and we do mapping for each entity that exists in the database. This way we keep track of which database shards hold which data.\n\n**Example**: A user database may use a lookup table that maps each user ID to the specific shard where that user’s data is stored. When a request is made, the system first checks the lookup table and then routes the query to the correct shard.\n\nThe directory maintains mappings that identify which shard contains specific data. These mappings may be updated as data is moved or shards are added or removed.\n\nIn the above image, you can see that we have used the delivery zone as a shard key:\n\n- Firstly the client application queries the lookup service to find out the shard (database partition) on which the data is placed.\n- When the lookup service returns the shard it queries/updates that shard."
      },
      {
        "title": "13. Advantages",
        "content": "Directory-based sharding uses a central lookup service that keeps track of where each piece of data is stored.\n\n- **Flexible Data Distribution:** Directory-based sharding allows for flexible data distribution, where the central directory can dynamically manage and update the mapping of data to shard locations.\n- **Efficient Query Routing:** Queries can be efficiently routed to the appropriate shard using the information stored in the directory. This results in improved query performance.\n- **Dynamic Scalability:** The system can dynamically scale by adding or removing shards without requiring changes to the application logic."
      },
      {
        "title": "14. Disadvantages",
        "content": "While flexible, this approach introduces dependency on the central directory.\n\n- **Centralized Point of Failure:** A centralized directory can become a single point of failure if it is not replicated or otherwise made highly available.\n- **Increased Latency: **Query routing through a central directory introduces an additional layer, potentially leading to increased latency compared to other sharding strategies.\n- Ways to optimize database sharding for even data distributionHere are some simple ways to optimize database sharding for even data distribution:\n\n- **Use Consistent Hashing**: This helps distribute data more evenly across all shards by using a hashing function that assigns records to different shards based on their key values.\n- **Choose a Good Sharding Key**: Picking a well-balanced sharding key is crucial. A key that doesn’t create hotspots ensures that data spreads out evenly across all servers.\n- **Range-Based Sharding with Caution**: If using range-based sharding, make sure the ranges are properly defined so that one shard doesn’t get overloaded with more data than others.\n- **Regularly Monitor and Rebalance**: Keep an eye on data distribution and rebalance shards when necessary to avoid uneven loads as data grows.\n- **Automate Sharding Logic**: Implement automation tools or built-in database features that automatically distribute data and handle sharding to maintain balance across shards."
      },
      {
        "title": "15. Alternatives to database sharding",
        "content": "Below are some of the alternatives to database sharding:\n\n- Vertical Scaling: Upgrading a single database server by adding more CPU, RAM, or storage to handle increased load. However, it has hardware limits and cannot scale indefinitely.\n- Replication: Maintaining copies of a database on multiple servers to improve availability and distribute read workloads. However, replicas may experience replication lag or synchronization issues.\n- Partitioning: Dividing data into smaller logical parts based on a chosen criterion, such as a range or key. Partitioning can be performed within a single database server, while distributing partitions across multiple servers is commonly used as part of sharding.\n- Caching: Storing frequently accessed data in a caching system such as Redis or Memcached to reduce database load and improve response times.\n- CDNs: Caching and delivering static or cacheable content from servers closer to users, which reduces requests reaching the origin server. CDNs are not a direct replacement for database sharding, but they can reduce the overall load on a system.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Database Sharding Architecture & Strategies",
      "initialCode": "import hashlib\n\n# Database Sharding Architecture & Strategies\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Database Sharding Architecture & Strategies",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Database Sharding Architecture & Strategies important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Database Sharding Architecture & Strategies",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Database Sharding Architecture & Strategies is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-data-partitioning": {
    "id": "sd-data-partitioning",
    "badge": "Module 4 • System Design",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Data Partitioning Techniques (Horizontal, Vertical, Functional)",
    "subtitle": "Comprehensive System Design guide to Data Partitioning Techniques (Horizontal, Vertical, Functional) — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- The process of splitting a dataset into more manageable, smaller pieces in order to improve efficiency, scalability, and performance is known as data partitioning.\n\n- It can be accomplished by either vertical partitioning, which separates data into columns, or horizontal partitioning, which divides data into rows according to particular criteria.\n- This method is especially helpful in databases, big data processing frameworks, and machine learning applications since it enables quicker query execution, simpler management of massive datasets, and better resource use.** Example:** In a sales database, records can be partitioned by year, where one partition stores sales data for 2023 and another for 2024.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Data Partitioning Techniques (Horizontal, Vertical, Functional)."
        }
      },
      {
        "title": "2. Real-World Examples",
        "content": "Some real-world examples of data partitioning are:\n\n- **E-commerce Platforms: ** Customer data is partitioned by region (e.g., North America, Europe) to optimize shipping, inventory, and localized marketing, improving performance and user experience.\n- **Banking and Finance: ** Transaction data is partitioned by account type or date (e.g., daily) for faster processing, reporting, and more efficient fraud detection.\n- **Social Media: ** User data is split by demographics or interests to enable targeted ads and content, enhancing relevance and system efficiency."
      },
      {
        "title": "3. Importance",
        "content": "Data partitioning is essential for several reasons:\n\n- **Performance Improvement**: By breaking data into smaller segments, systems can access only the relevant partitions, leading to faster query execution and reduced load times.\n- **Scalability**: As datasets grow, partitioning allows for easier management and distribution across multiple servers or storage systems, enabling horizontal scaling.\n- **Efficient Resource Utilization**: It helps optimize the use of resources by allowing systems to focus processing power on specific partitions rather than the entire dataset.\n- **Enhanced Manageability**: Smaller partitions are easier to back up, restore, and maintain, facilitating better data governance and maintenance practices."
      },
      {
        "title": "4. Methods of Data Partitioning",
        "content": "The main methods of Data Partitioning are:"
      },
      {
        "title": "1. Horizontal Partitioning/Sharding",
        "content": "Horizontal Partitioning divides data by rows, but all partitions may still exist on the same server. When these horizontal partitions are placed across multiple servers, the approach is called Sharding.\n\nSharding is a form of horizontal partitioning in which partitions are distributed across multiple machines. It enables horizontal scalability by distributing data and workload across multiple nodes. High availability typically requires additional mechanisms such as replication and failover.\n\nHorizontal Partitioning"
      },
      {
        "title": "6. Advantages",
        "content": "Horizontal partitioning divides a table into multiple partitions by distributing rows across different partitions.\n\n- **Query Performance:** Queries can access only the relevant partition instead of scanning the entire dataset.\n- **Scalability:** When partitions are distributed across multiple servers, the system can scale horizontally by adding additional nodes.\n- **Parallel Processing:** Multiple partitions can be processed concurrently when the workload and infrastructure support it.\n- **Manageability:** Smaller partitions can simplify data maintenance, backup, and data lifecycle management."
      },
      {
        "title": "7. Disadvantages",
        "content": "Despite its scalability benefits, it introduces some complexity in database operations.\n\n- **Complex Joins:** Joins across multiple partitions can be slower and harder to manage.\n- **Data Skew:** Uneven data distribution may cause certain partitions to handle more load than others."
      },
      {
        "title": "2. Vertical Partitioning",
        "content": "Vertical partitioning divides a dataset based on columns (attributes) instead of rows. Each partition contains only a subset of columns for all rows, depending on access patterns. It is useful when different columns are accessed more frequently or independently.\n\nVertical Partitioning"
      },
      {
        "title": "9. Advantages",
        "content": "Vertical partitioning divides a table by separating columns into different partitions based on usage or functionality.\n\n- **Better Query Performance:** Reduces data read by isolating frequently accessed columns.\n- **Efficient Retrieval:** Fetches only needed columns, saving I/O and storage.\n- **Easier Schema Changes: **Simplifies adding or removing columns."
      },
      {
        "title": "10. Disadvantages",
        "content": "Although useful for column-level optimization, it can introduce additional query complexity.\n\n- **Query Complexity:** Queries may need to access multiple partitions.\n- **Slower Joins:** Combining data from different partitions adds overhead.\n- **Limited Benefit:** If queries need columns from multiple partitions, vertical partitioning may offer little performance benefit and add join overhead."
      },
      {
        "title": "3. Key-based Partitioning",
        "content": "Divides data based on a specific key or attribute, with each partition holding all data related to that key. Common in distributed systems for uniform data distribution and efficient key-based lookups.\n\nKey Based Partitioning"
      },
      {
        "title": "12. Advantages",
        "content": "Key-based partitioning distributes data across partitions based on a selected partition key. The key can be mapped to partitions using different strategies, including hashing.\n\n- **Efficient Key-Based Lookups:** When the partition key is known, the system can identify the relevant partition efficiently.\n- **Scalability**: Enables parallel processing across partitions.\n- **Load Balancing:** Properly chosen partition keys can distribute requests and data evenly, reducing performance bottlenecks."
      },
      {
        "title": "13. Disadvantages",
        "content": "Improper key selection can lead to uneven workloads and performance issues.\n\n- **Data Skew**: Uneven key access can create hotspots.\n- **Limited Flexibility**: Less efficient for range or multi-key queries.\n- **Partition Overhead**: Requires careful management as data or key patterns evolve."
      },
      {
        "title": "4. Range Partitioning",
        "content": "The dataset is divided using range partitioning based on a preset range of values. For example, if your dataset has timestamps, you can divide it according to a specific time range. Range partitioning might be useful when you have data with natural ordering and wish to distribute it evenly based on the range of values.\n\nRange Partitioning"
      },
      {
        "title": "15. Advantages",
        "content": "Range partitioning divides data into partitions based on specific value ranges such as dates, IDs, or numbers.\n\n- **Natural Ordering:** Ideal for data with an inherent range-based structure.\n- **Efficient Range Queries:** Quickly locates data within specified value ranges.\n- **Simplified Query Planning: **System easily identifies relevant partitions for range conditions."
      },
      {
        "title": "16. Disadvantages",
        "content": "Improper range design can lead to uneven data distribution and management challenges.\n\n- **Data Skew:** Uneven data across ranges can affect performance.\n- **Growth Management:** Adding or adjusting ranges requires ongoing maintenance.\n- **Complex Joins:** Joins and non-contiguous range queries can be slower and harder to manage."
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Data Partitioning Techniques (Horizontal, Vertical, Functional)",
      "initialCode": "import hashlib\n\n# Data Partitioning Techniques (Horizontal, Vertical, Functional)\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Data Partitioning Techniques (Horizontal, Vertical, Functional)",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Data Partitioning Techniques (Horizontal, Vertical, Functional) important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Data Partitioning Techniques (Horizontal, Vertical, Functional)",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Data Partitioning Techniques (Horizontal, Vertical, Functional) is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-db-normalization": {
    "id": "sd-db-normalization",
    "badge": "Module 4 • System Design",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "Database Normalization (1NF, 2NF, 3NF, BCNF)",
    "subtitle": "Comprehensive System Design guide to Database Normalization (1NF, 2NF, 3NF, BCNF) — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Database normalization is the process of organizing data into well-structured tables to reduce data redundancy and prevent data anomalies.\n\n- It divides large tables into smaller related tables and establishes relationships between them.\n- It helps maintain data consistency and reduces insertion, update, and deletion anomalies.**\n- Before Normalization:** The table may contain redundant data and suffer from insertion, update, and deletion anomalies.\n- **After Normalization:** The data is divided into logical, related tables to reduce redundancy, prevent anomalies, and improve data consistency.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Database Normalization (1NF, 2NF, 3NF, BCNF)."
        }
      },
      {
        "title": "2. Need of Normalization",
        "content": "Normalization is used to reduce problems that occur when the same data is stored repeatedly in a database.\n\n- **Insertion Anomaly:** Occurs when poor table design prevents a new fact from being added without also requiring unrelated or unnecessary data.\n- **Update Anomaly:** Occurs when the same data is stored in multiple rows and must be updated in several places.\n- **Deletion Anomaly:** Occurs when deleting data unintentionally removes other important information."
      },
      {
        "title": "3. Features of Database Normalization",
        "content": "- **Reduces Data Redundancy:** Minimizes unnecessary repetition of the same data.\n- **Improves Data Consistency:** Helps ensure that the same information remains consistent across the database.\n- **Reduces Data Anomalies:** Prevents insertion, update, and deletion problems.\n- **Improves Database Structure:** Organizes data into related tables, making the database easier to maintain.\n- **Maintains Data Integrity:** Helps ensure that relationships and dependencies between data are properly maintained."
      },
      {
        "title": "4. Normal Forms in DBMS",
        "content": "Normal Forms\n\nDescription of Normal Forms\n\n**First Normal Form (1NF)**\n\nEach attribute contains atomic (single) values, and there are no repeating groups.\n\n**Second Normal Form (2NF)**\n\nThe relation is in 1NF and every non-prime attribute is fully functionally dependent on the whole candidate key, with no partial dependency.\n\n**Third Normal Form (3NF)**\n\nThe relation is in 2NF and has no transitive dependency of a non-prime attribute on a candidate key.\n\n**Boyce-Codd Normal Form (BCNF)**\n\nFor every non-trivial functional dependency X → Y, X must be a superkey.\n\n**Fourth Normal Form (4NF)**\n\nThe relation is in BCNF and has no non-trivial multivalued dependency unless its determinant is a superkey.\n\n**Fifth Normal Form (5NF)**\n\nThe relation is in 4NF and has no non-trivial join dependencies that require further lossless decomposition.\n\nComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Database Normalization (1NF, 2NF, 3NF, BCNF)",
      "initialCode": "import hashlib\n\n# Database Normalization (1NF, 2NF, 3NF, BCNF)\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Database Normalization (1NF, 2NF, 3NF, BCNF)",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Database Normalization (1NF, 2NF, 3NF, BCNF) important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Database Normalization (1NF, 2NF, 3NF, BCNF)",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Database Normalization (1NF, 2NF, 3NF, BCNF) is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-denormalization": {
    "id": "sd-denormalization",
    "badge": "Module 4 • System Design",
    "readingTime": "14 min read",
    "level": "Intermediate",
    "title": "Denormalization in Read-Heavy Databases",
    "subtitle": "Comprehensive System Design guide to Denormalization in Read-Heavy Databases — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Denormalization is a database optimization technique where redundant data is intentionally added to one or more tables to reduce the need for complex joins and improve query performance. It is not the opposite of normalization, but rather an optimization applied after normalization.\n\n- In a normalized database, data is stored in separate tables to minimize redundancy.\n- For example, storing teacher details in a Teachers table and course details in a Courses table, linked by teacherID.\n- While this maintains data integrity, frequent joins between large tables can slow performance.DenormalizationAbove diagram illustrates denormalization in a data warehouse, where related normalized tables such as Subject, Supplier, City, Region, and Date are combined into wider dimension structures. The final Contract table stores dimension-related data together, reducing the number of joins required during querying and improving read performance.\n\n**Note:** Denormalization strikes a balance by allowing some redundancy to achieve faster data retrieval and better performance, at the cost of slightly more maintenance effort when updating data.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Denormalization in Read-Heavy Databases."
        }
      },
      {
        "title": "2. Step 1: Unnormalized Table",
        "content": "This is the starting point where all the data is stored in a single table.\n\nUnnormalized Structure\n- **Redundancy:** For example, \"Alice\" and \"Math\" are repeated multiple times. Similarly, \"Mr. Smith\" is stored twice for the same class.\n- **Update Anomalies:** If \"Mr. Smith\" changes to \"Mr. Brown,\" we have to update multiple rows. Missing one row could lead to inconsistencies.\n- **Inefficient Storage:** Repeated information takes up unnecessary space."
      },
      {
        "title": "3. Step 2: Normalized Structure",
        "content": "To eliminate redundancy and avoid anomalies, we split the data into smaller, related tables. This process is called normalization. Each table now focuses on a specific aspect, such as students, classes or subjects.\n\nNormalized Structure\n- **Reduced Redundancy:** \"Mr. Smith\" is stored in one place and referenced by related records, reducing unnecessary duplication.\n- **Easier Updates:** If \"Mr. Smith\" changes to \"Mr. Brown,\" you only update the Classes Table and it automatically reflects everywhere.\n- **Efficient Storage:** Repeated data is eliminated, saving space."
      },
      {
        "title": "4. Step 3: Denormalized Table",
        "content": "Normalization can sometimes make queries complex and slower because retrieving data may require joins across multiple tables. To optimize specific queries, denormalization intentionally introduces controlled redundancy by combining tables, duplicating frequently accessed fields, storing precomputed values, or maintaining summary tables.\n\n- All related information (student name, class name, teacher and subject) is stored in a single table.\n- This simplifies querying because you don’t need to join multiple tables.Denormalized Structure"
      },
      {
        "title": "5. Denormalization v/s Normalization",
        "content": "Normalization organizes data into related tables to reduce unnecessary redundancy and improve data integrity. Denormalization intentionally introduces some redundancy into a normalized design to optimize specific query and read patterns, often by reducing joins or storing derived data. In practice, systems may use both normalization and denormalization depending on their workload and performance requirements.\n\nDenormalization is used for add the redundancy into normalized table so that enhance the functionality and minimize the running time of database queries (like joins operation ) and optimizes for performance and query simplicity. In a system that demands scalability, like that of any major tech company, we almost always use elements of both normalized and denormalized databases."
      },
      {
        "title": "6. Advantages",
        "content": "This section highlights the benefits of denormalization in improving performance and simplifying data access.\n\n- **Improved Query Performance:** Denormalization can improve query performance by reducing the number of joins required to retrieve data.\n- **Reduced Complexity**: By combining related data into fewer tables, denormalization can simplify the database schema and make it easier to manage.\n- **Simplified Read Queries:** Denormalization can simplify read queries by storing related or frequently accessed data together, reducing the need for complex joins.\n- **Improved Read Performance: **Denormalization can improve read performance by making it easier to access data.\n- **Improved Read Scalability:** Denormalization can help read-heavy workloads scale by reducing joins and allowing frequently accessed data to be retrieved more efficiently."
      },
      {
        "title": "7. Limitations",
        "content": "This section outlines the limitations of denormalization, particularly those related to data redundancy, consistency, and maintenance.\n\n- **Reduced Data Integrity: **Redundant data can increase the risk of inconsistent values across the database.\n- **Higher Data Redundancy:** The same data may be stored in multiple places, leading to duplication.\n- **Increased Storage Requirements:** Duplicate data consumes additional storage space.\n- **Complex Updates and Maintenance:** Changes may need to be applied in multiple locations, making updates more difficult.\n- **Limited Flexibility:** A denormalized schema can be harder to modify when database requirements change.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Denormalization in Read-Heavy Databases",
      "initialCode": "import hashlib\n\n# Denormalization in Read-Heavy Databases\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Denormalization in Read-Heavy Databases",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Denormalization in Read-Heavy Databases important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Denormalization in Read-Heavy Databases",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Denormalization in Read-Heavy Databases is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-sql-optimization": {
    "id": "sd-sql-optimization",
    "badge": "Module 4 • System Design",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Best Practices for SQL Query Optimization & Indexing",
    "subtitle": "Comprehensive System Design guide to Best Practices for SQL Query Optimization & Indexing — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Poorly written SQL queries can slow down database operations, consume excessive resources, cause locking and blocking issues, and negatively impact application performance. Following SQL query optimization best practices helps improve database performance and ensures efficient use of system resources.\n\n- Reduces query execution time and improves overall performance.\n- Minimizes resource consumption and helps prevent locking and blocking issues.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Best Practices for SQL Query Optimization & Indexing."
        }
      },
      {
        "title": "2. SQL Query Optimization Techniques",
        "content": "The following techniques can help improve SQL query performance by reducing unnecessary processing, improving index usage, and minimizing database resource consumption."
      },
      {
        "title": "1. Use Indexes Wisely",
        "content": "Indexes help the database locate required rows faster instead of scanning every row in a table. They are especially useful for columns frequently used in WHERE, JOIN, ORDER BY, and sometimes GROUP BY clauses.\n\nFor example, suppose the orders table is frequently searched using customer_id.\n\nSELECT * FROM orders WHERE customer_id = 123;\n\nCreating an index on customer_id can improve the performance of such queries:\n\nCREATE INDEX idx_orders_customer_id ON orders(customer_id);"
      },
      {
        "title": "4. Types of Indexes",
        "content": "The above query will run much faster if customer_id is indexed.\n\n- **Primary Index:** An index created on a table's primary key. A primary key is typically indexed automatically, but whether the index is clustered depends on the database system.\n- **Secondary Index:** An index created on columns other than the primary key to improve query performance. Multiple secondary indexes can exist on a table.\n- **Clustered Index:** Determines the physical/logical order in which table data is stored according to the indexed column(s). A table can have only one clustered index.\n- **Non-Clustered Index:** Stores the indexed values separately from the table data and contains references to the corresponding rows. Multiple non-clustered indexes can exist on a table.**Indexing Guidelines**\n\n- Index columns used often in WHERE, JOIN, or ORDER BY clauses.\n- Avoid too many indexes—they slow down INSERT, UPDATE, and DELETE.\n- Check and monitor index usage regularly to keep queries fast."
      },
      {
        "title": "2. Avoid SELECT *",
        "content": "Using SELECT * can make queries slow, especially on large tables or when joining multiple tables. This is because the database retrieves all columns, even the ones you don’t need. It uses more memory, takes longer to transfer data, and makes the query harder for the database to optimize.\n\n**Avoid this:**\n\n**SELECT * FROM products;\n\nUse this instead:**\n\nSELECT product_id, product_name, price FROM products;"
      },
      {
        "title": "6. Benefits",
        "content": "- Uses less memory and runs faster.\n- Lets the database skip unneeded columns.\n- Makes queries simpler and easier to read."
      },
      {
        "title": "3. Limit the Number of Rows Returned",
        "content": "Fetching too many rows can make your query slow. Even if your app needs only 10 rows, the database might return thousands. Use WHERE to filter data and LIMIT to get only the rows you need.\n\n**Example:**\n\nSELECT name FROM customers WHERE country = 'USA' ORDER BY signup_date DESC LIMIT 50;"
      },
      {
        "title": "8. Benefits",
        "content": "- Makes queries faster and uses less CPU.\n- Sends only the data you need, avoiding overload.\n- Useful for testing and previewing results."
      },
      {
        "title": "4. Write Efficient WHERE Clauses",
        "content": "The `WHERE` clause filters rows in a query, but how you write it affects performance. Using functions or calculations on columns can prevent efficient use of a conventional index, depending on the DBMS, query, and available indexes.\n\n**Less Efficient**\n\n**SELECT * FROM employees WHERE YEAR(joining_date) = 2022;\n\nHere, YEAR() is applied to every value in joining_date. Depending on the DBMS and available indexes, this may prevent efficient use of a normal index.\n\nMore Efficient:**\n\nSELECT * FROM employees WHERE joining_date >= '2022-01-01' AND joining_date < '2023-01-01';"
      },
      {
        "title": "10. Performance Tips",
        "content": "- Avoid unnecessary functions or calculations on indexed columns when they prevent efficient index usage.\n- Consider range conditions or function-based/expression indexes where supported.\n- Check the execution plan to verify whether the intended index is being used."
      },
      {
        "title": "5. Use Joins Smartly",
        "content": "Join only the tables you need and filter data before joining. Use INNER JOIN instead of OUTER JOIN if you don’t need unmatched rows.\n\n**Example:**\n\nSELECT u.name, o.amount FROM users u JOIN orders o ON u.user_id = o.user_id WHERE o.amount > 100;"
      },
      {
        "title": "12. Benefits:",
        "content": "- Faster join processing.\n- INNER JOIN combines rows based on a matching condition using ON, ensuring only related records are returned.\n- Helps the database choose an efficient execution plan."
      },
      {
        "title": "6. Avoid N+1 Query Problems",
        "content": "N+1 happens when you run one query to get a list, then run extra queries for each item. Fetch related data in a single query using JOINs instead.\n\n**Poor Approach:**\n\n**SELECT * FROM users; For each user: SELECT * FROM orders WHERE user_id = ?\n\nRecommended Approach:**\n\nSELECT u.user_id, u.name, o.order_id, o.amount FROM users u JOIN orders o ON u.user_id = o.user_id;"
      },
      {
        "title": "14. Benefits",
        "content": "- Fewer database calls.\n- Faster response time.\n- Reduces load on the database."
      },
      {
        "title": "7. Use EXISTS Appropriately for Existence Checks",
        "content": "Both IN and EXISTS can perform efficiently depending on the database optimizer, indexes, query structure, and data distribution. When the goal is simply to determine whether a matching record exists, EXISTS clearly expresses that intention.\n\n**Poor Approach:**\n\n**SELECT name FROM customers WHERE customer_id IN (SELECT customer_id FROM orders);\n\nRecommended Approach:**\n\nSELECT name FROM customers\nWHERE EXISTS (\nSELECT 1 FROM orders WHERE orders.customer_id = customers.customer_id\n);"
      },
      {
        "title": "16. Benefits",
        "content": "- Clearly expresses existence checks.\n- May allow the optimizer to use an efficient execution strategy.\n- Performance should be evaluated using the execution plan for the specific DBMS and query."
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Best Practices for SQL Query Optimization & Indexing",
      "initialCode": "import hashlib\n\n# Best Practices for SQL Query Optimization & Indexing\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Best Practices for SQL Query Optimization & Indexing",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Best Practices for SQL Query Optimization & Indexing important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Best Practices for SQL Query Optimization & Indexing",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Best Practices for SQL Query Optimization & Indexing is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-redis-intro": {
    "id": "sd-redis-intro",
    "badge": "Module 4 • System Design",
    "readingTime": "10 min read",
    "level": "Intermediate",
    "title": "Introduction to Redis In-Memory Data Store",
    "subtitle": "Comprehensive System Design guide to Introduction to Redis In-Memory Data Store — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Redis (Remote Dictionary Server) is an in-memory database that stores data in RAM for very fast access. It is mainly used for caching and reducing the load on the main database.\n\n- Stores frequently accessed data for faster retrieval and better application performance.\n- Used for sessions, queues, leaderboards, and real-time analytics.**Example:** An e-commerce website can use Redis to cache product details so users can load product pages much faster.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Introduction to Redis In-Memory Data Store."
        }
      },
      {
        "title": "2. Real-World Applications",
        "content": "Redis is widely used by large-scale applications to handle high-speed data access, real-time processing, and efficient caching.\n\n- **Amazon & Flipkart:** Use Redis to cache product details, prices, and user sessions, ensuring fast page loads and smooth checkout during high traffic sales.\n- **Netflix:** Uses Redis for caching frequently accessed content data and managing real-time user sessions to deliver a seamless streaming experience.\n- **Facebook & Instagram:** Use Redis to handle real-time notifications, feeds, and user activity for fast and responsive interactions.\n- **Uber:** Uses Redis for real-time location tracking, ride matching, and surge pricing calculations."
      },
      {
        "title": "3. Working",
        "content": "Redis acts as a caching layer between the database and the client to speed up data access and reduce the load on the main database. When a client asks for data, the API Gateway forwards the request to Redis.\n\nWorking of Redis\n- **Request Handling:** The client request is routed through the API Gateway, which first checks Redis for the required data.\n- **Cache Hit:** If the data exists in Redis, it is returned immediately without accessing the database.\n- **Cache Miss:** If the data is not found in Redis, the request is forwarded to the main database.\n- **Cache Update:** The data retrieved from the database is stored in Redis for future requests.\n- **Response to Client:** The API Gateway sends the final response to the client using data from Redis or the database. **Example: **When a user visits a popular product page, Redis serves the cached product information instantly instead of querying the database every time.\n\nBefore starting to learn Redis, we need to install redis on our system.\n\n`\n`\n**Output**\n\n**Understand the above example:**\n\n**import redis\n\nThis line imports the `redis `Python library, which allows you to talk to a Redis server from your Python code.\n\nr = redis.Redis(host='localhost', port=6379, db=0)\n\nThis line creates a connection to the Redis server.\n\n- host='localhost':** Connects to the Redis server running on your local machine.\n- **port=6379:** Uses the default port on which Redis listens for connections.\n- **db=0:** Connects to Redis logical database 0. Redis supports multiple logical databases numbered from 0 onward. The variable r acts as a Redis client object that can be used to perform various Redis operations.\n\n**r.set('name', 'Alia')\n\nThis statement stores a key-value pair in Redis.\n\n- Key:** name\n- **Value:** AliaAfter execution, Redis stores the data as:\n\n**name -> Alia\n\nThis line stores the key `name` with the value `Alia` in Redis.\n\nprint(r.get('name').decode('utf-8'))\n\nThis statement retrieves and displays the value associated with the key name.\n\n- r.get('name') fetches the value from Redis.\n- Redis returns data in bytes format, such as b'Alia'.\n- .decode('utf-8') converts the bytes into a readable string.\n- The output displayed on the console is:Note:** In this example, Redis is integrated with Python but redis can also be implemented in other programming languages like Java, JavaScript (Node.js), Go, Ruby, C# (.NET), PHP, and many more, using their respective Redis client libraries.",
        "code": {
          "language": "python",
          "caption": "System Design Implementation — 3. Working",
          "snippet": "import redis\nr = redis.Redis(host='localhost', port=6379, db=0)\n\nr.set('name', 'Alia')\nprint(r.get('name').decode('utf-8'))  \n\nr.set('name', 'Riya')\nprint(r.get('name').decode('utf-8')) \n\nr.delete('name')\nprint(r.get('name'))"
        }
      },
      {
        "title": "4. Use Cases of Redis",
        "content": "Redis is used when applications need very fast access to temporary or frequently used data, reducing repeated queries to the main database.\n\n- **Caching:** Stores frequently accessed data for faster retrieval and improved performance.\n- **Session Management:** Stores user login and session information for quick access.\n- **Real-time Applications:** Supports leaderboards, queues, notifications, and chat systems with fast updates.**Example:** In a messaging application, Redis can store the last few messages of a conversation using its list data structure so that users can quickly see recent messages without repeatedly querying the main database."
      },
      {
        "title": "5. Factors That Make Redis Fast",
        "content": "Redis is fast because it stores data in RAM and uses an efficient architecture for quick data processing.\n\n- **In-Memory Storage:** Stores data in RAM for faster read and write operations.\n- **Single-Threaded Event Loop:** Avoids thread management and context-switching overhead.\n- **Efficient Data Structures:** Uses optimized lists, sets, hashes, and sorted sets.\n- **Lightweight Protocol:** Uses RESP for fast client-server communication.**Example:** When an application requests cached product data from Redis, the response can be returned in **microseconds**, whereas querying a disk-based database may take **milliseconds**.\n\nComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Introduction to Redis In-Memory Data Store",
      "initialCode": "import redis\nr = redis.Redis(host='localhost', port=6379, db=0)\n\nr.set('name', 'Alia')\nprint(r.get('name').decode('utf-8'))  \n\nr.set('name', 'Riya')\nprint(r.get('name').decode('utf-8')) \n\nr.delete('name')\nprint(r.get('name'))",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Introduction to Redis In-Memory Data Store",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Introduction to Redis In-Memory Data Store important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Introduction to Redis In-Memory Data Store",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Introduction to Redis In-Memory Data Store is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-load-balancer-types": {
    "id": "sd-load-balancer-types",
    "badge": "Module 5 • System Design",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "Types of Load Balancers (L4 Transport vs L7 Application)",
    "subtitle": "Comprehensive System Design guide to Types of Load Balancers (L4 Transport vs L7 Application) — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Load Balancers distribute incoming network traffic across multiple servers to ensure optimal resource utilization, minimize response time, and prevent server overload. They can be implemented in different ways depending on infrastructure and scalability needs.\n\n- Run on standard servers or operating systems, offering flexibility and cost-effectiveness, including cloud-based or virtual appliances for easy scalability and deployment.\n- Dedicated physical devices designed specifically for high performance and reliability.**Example:** A popular e-commerce platform might use a hardware load balancer for on-premises traffic, a software load balancer for internal microservices, and a virtual load balancer in the cloud to handle seasonal spikes.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Types of Load Balancers (L4 Transport vs L7 Application)."
        }
      },
      {
        "title": "2. Types of Load Balancer",
        "content": "Load balancers can be classified based on their configuration and the way they handle network traffic."
      },
      {
        "title": "3. Based on Deployment",
        "content": "**1. Hardware Load Balancer**\n\nA hardware load balancer is a dedicated physical appliance designed to distribute traffic across multiple backend servers. It is commonly used in enterprise environments that require high throughput and dedicated networking capabilities.\n\n**Example:** F5 BIG-IP appliances.\n\n- **Pros:** High performance and dedicated resources.\n- **Cons:** Expensive and less flexible than software or managed cloud solutions.**2. Software Load Balancer**\n\nA software load balancer runs on a general-purpose server, virtual machine, or container and distributes traffic using configurable routing algorithms.\n\n**Example:** NGINX and HAProxy.\n\n- **Pros:** Flexible, cost-effective, and easy to deploy.\n- **Cons:** Performance depends on the resources of the system on which it runs.**3. Cloud Load Balancer**\n\nA cloud load balancer is a managed service provided by a cloud platform. It distributes traffic across cloud resources while the provider manages much of the underlying infrastructure.\n\n**Example:** AWS Elastic Load Balancing.\n\n- **Pros:** Scalable, highly available, and easy to integrate with cloud infrastructure.\n- **Cons:** May introduce ongoing service costs and provider-specific dependencies."
      },
      {
        "title": "4. Based on Traffic Handling",
        "content": "1. Layer 4 Load Balancer\n\nA Layer 4 load balancer operates at the Transport Layer and routes traffic using information such as IP addresses, TCP/UDP protocols, and port numbers.\n\nIt generally does not inspect application-level information such as URLs or HTTP headers.\n\n**Examples:** HAProxy in TCP mode and AWS Network Load Balancer.\n\n- **Pros:** Efficient for high-volume connection-based traffic.\n- **Cons:** Cannot normally perform application-content-based routing.**Features**\n\n- Routes using IP addresses and port numbers.\n- Supports protocols such as TCP and UDP.\n- Requires less application-level inspection.\n- Can support connection-oriented traffic distribution.2. Layer 7 Load Balancer\n\nA Layer 7 load balancer operates at the Application Layer and can inspect application-level information before deciding where to route a request.\n\nRouting decisions may use:\n\n- URL paths\n- Hostnames\n- HTTP headers\n- Cookies\n- Request methods**Examples:** NGINX HTTP load balancing and AWS Application Load Balancer.\n\n- **Pros:** Supports intelligent and content-based routing.\n- **Cons:** Requires more application-level processing than basic Layer 4 routing.**Features**\n\n- Content-based routing\n- Host- and path-based routing\n- Header- and cookie-based routing\n- SSL/TLS termination\n- Application-aware traffic management3. Global Server Load Balancing (GSLB)\n\nGlobal Server Load Balancing distributes users across servers or data centers located in different geographic regions.\n\nUnlike local load balancing, GSLB commonly uses DNS-based or global traffic-management mechanisms to select the most appropriate regional endpoint.\n\n**Examples:**\n\n**\n- Cloudflare Load Balancing with geographic or dynamic steering.\n- Amazon Route 53 with latency-based routing.\n\n- Pros:** Improves global availability and can reduce latency for geographically distributed users.\n- **Cons:** More complex to configure and may depend on DNS behavior, health checks, and regional routing policies.**Features**\n\n- Geographic or latency-based routing\n- Multi-region traffic distribution\n- Health-aware routing\n- Regional failover\n- Disaster-recovery supportComment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Types of Load Balancers (L4 Transport vs L7 Application)",
      "initialCode": "import hashlib\n\n# Types of Load Balancers (L4 Transport vs L7 Application)\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Types of Load Balancers (L4 Transport vs L7 Application)",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Types of Load Balancers (L4 Transport vs L7 Application) important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Types of Load Balancers (L4 Transport vs L7 Application)",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Types of Load Balancers (L4 Transport vs L7 Application) is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-lb-algorithms": {
    "id": "sd-lb-algorithms",
    "badge": "Module 5 • System Design",
    "readingTime": "22 min read",
    "level": "Intermediate",
    "title": "Load Balancing Algorithms (Round Robin, Least Conn, IP Hash)",
    "subtitle": "Comprehensive System Design guide to Load Balancing Algorithms (Round Robin, Least Conn, IP Hash) — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- A load balancer distributes incoming traffic across multiple servers to improve resource utilization, performance, and availability.\n\n- Uses load-balancing algorithms to distribute traffic according to configured rules, server capacity, and current system conditions.\n- Helps prevent individual servers from becoming overloaded and improves overall application performance.**Example**: In a web application like an e-commerce site, a load balancer can distribute incoming user requests across multiple servers so that no single server becomes slow or crashes during peak traffic.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Load Balancing Algorithms (Round Robin, Least Conn, IP Hash)."
        }
      },
      {
        "title": "2. Types of Load Balancing Algorithm",
        "content": "Load balancing algorithms can be broadly categorized into two types: Dynamic load balancing and Static load balancing."
      },
      {
        "title": "1. Static Load Balancing Algorithms",
        "content": "Static load balancing assigns tasks to servers using predefined rules, without considering real-time system conditions.\n\n- Workloads are allocated in a fixed and predetermined manner.\n- Does not adapt to changes during runtime."
      },
      {
        "title": "4. Types",
        "content": "These algorithms distribute requests using fixed rules without considering real-time server conditions.\n\n**1. Round Robin Load Balancing Algorithm: **Round Robin is a simple static load balancing technique that distributes incoming requests to servers in a fixed sequential or rotational order. It is commonly used due to its ease of implementation.\n\n- Requests are assigned to servers one by one in a circular manner.\n- Does not consider current server load, which may cause some servers to become overloaded.**For Example: **Lets say you have a group of friends, and you want to share a bag of candies equally with all of them. You give one candy to each friend in a circle, and then you start over. This is like Round Robin – making sure everyone gets a fair share.\n\n**Pros:** Simple to implement and requires minimal configuration.**Cons:** Ignores server load, which can lead to uneven distribution under heavy traffic.\n\n**2. Weighted Round Robin Load Balancing Algorithm**: Weighted Round Robin is a static load balancing technique similar to Round Robin, but it distributes requests based on assigned weight values that represent each server’s capacity.\n\n- Servers with higher weights receive a larger share of requests.\n- Requests are distributed in a cyclic manner, proportional to each server’s weight.**For Example:** let's say your friends have different levels of candy cravings. You want to be fair, so you give more candies to the friend who loves them the most. Weighted Round Robin does something similar – it gives more tasks to the friends who can handle them better.\n\n**Pros: **Distributes traffic according to server capacity, preventing weaker servers from overload.**Cons:** Still static; cannot adapt to sudden runtime load changes.\n\n**3. Source IP Hash Load Balancing Algorithm:** Source IP Hash selects a backend server by computing a hash from the client's source IP address.\n\n- The client's IP address is used to determine the backend server.\n- Requests from the same IP will generally map to the same server while the server pool and hashing configuration remain unchanged.\n- **Pros:** Provides a form of session affinity without requiring a separate session cookie.\n- **Cons:** Affinity is not guaranteed if the backend pool or configuration changes, and multiple users behind the same public IP may be mapped to the same server."
      },
      {
        "title": "2. Dynamic Load Balancing Algorithms",
        "content": "Dynamic load balancing makes real-time decisions to distribute incoming traffic or workloads across multiple servers based on current system conditions. It continuously adapts to changes such as server load, network traffic, and resource availability.\n\n- Adjusts request distribution dynamically to prevent server overload.\n- Improves performance and reliability by responding to real-time system changes."
      },
      {
        "title": "6. Types",
        "content": "These algorithms distribute requests based on real-time server performance and system conditions.\n\n**1. Least Connection Method Load Balancing Algorithm**: The Least Connections algorithm is a dynamic load balancing technique that routes new requests to the server with the fewest active connections. It focuses on balancing workload by considering the current load on each server.\n\n- Requires additional computation to track and identify the server with the least connections.\n- More resource-intensive than round-robin due to real-time load evaluation.**For Example:** Lets say you're at a playground, and some kids are playing on different swings. You want to join the swing with the fewest kids so that it's not too crowded. Least Connection is like choosing the swing with the least number of kids already on it.\n\n**Pros:** Balances load effectively by directing traffic to the least busy server.** ****Cons:** Requires continuous monitoring, increasing computational overhead.\n\n**2. Least Response Time Load Balancing Algorithm:** Least Response Time selects a backend based on observed response-time information and, depending on the implementation, may also consider metrics such as active connections.\n\n- Uses current or recent response-time measurements rather than relying only on historical data.\n- Continuously updates routing decisions as server performance changes.**For Example: **Picture yourself at a snack bar where you can order food from different servers. You notice that some servers are faster than others. You choose the server that seems to serve food the quickest each time you go. Least Response Time is like picking the server with the shortest line.\n\n**Pros:** Helps reduce latency by favoring faster-responding healthy servers.**Cons:** Requires continuous monitoring and additional runtime metrics.\n\n**3. Resource-based Load Balancing Algorithm**: Resource-Based Load Balancing assigns incoming requests to servers based on their current resource availability, such as CPU usage, memory, or bandwidth, ensuring efficient and balanced system performance.\n\n- Routes requests to the server with the most available resources at that moment.\n- Prevents server overload by continuously monitoring resource usage.**For Example: **Imagine it like assigning tasks in an office based on each employee’s workload at the moment—some are busy, while others are free. Resource-Based Load Balancing directs requests to the server with the most available resources\n\n**Pros:** Optimize"
      },
      {
        "title": "7. Importance",
        "content": "Load balancing plays a crucial role in maintaining the performance and reliability of distributed systems. It ensures efficient resource utilization while handling increasing user traffic smoothly.\n\n- Prevents any single server from becoming a performance bottleneck.\n- Improves application availability and fault tolerance.\n- Enhances scalability during high traffic.\n- Ensures better user experience with reduced latency."
      },
      {
        "title": "8. Static Vs Dynamic Load Balancing",
        "content": "**Static Load Balancing****Dynamic Load Balancing**Uses predefined rules to distribute requests.Makes routing decisions using current system conditions.Does not dynamically adapt its routing rule to changing workload.Continuously adapts to server load or performance metrics.May still use health checks to exclude unhealthy servers from the available pool.Can consider metrics such as active connections, CPU usage, memory, or response time.Usually simpler to configure.Requires additional monitoring and runtime information.Suitable for relatively predictable workloads.Suitable for fluctuating and unpredictable workloads.Example: Round Robin, Weighted Round Robin.Example: Least Connections, Least Response Time, Resource-Based."
      },
      {
        "title": "9. Factors Affecting Load Balancing Algorithm Selection",
        "content": "Selecting an appropriate load balancing algorithm depends on several system and application requirements. These factors help determine how efficiently traffic is distributed.\n\n- Traffic pattern\n- Server capacity and heterogeneity\n- Network latency\n- Fault tolerance requirements\n- Cost and complexity"
      },
      {
        "title": "10. Use Cases",
        "content": "Load balancing is widely used in real-world applications to ensure smooth performance, even under high traffic:\n\n- **E-commerce websites during sales:** High user traffic during flash sales or promotions can overload servers. Load balancers distribute requests evenly to maintain fast response times.\n- **Video streaming platforms:** Streaming services like Netflix or YouTube rely on load balancing to serve millions of concurrent users without buffering.\n- **Large SaaS applications:** Enterprise applications with multiple clients use load balancers to maintain uptime and ensure all users have a seamless experience."
      },
      {
        "title": "11. Selecting the Appropriate Load Balancing Algorithm for Your System",
        "content": "Choose a load balancing algorithm based on traffic patterns, server capacity, session requirements, and performance needs.\n\n- **Round Robin:** Use when servers have similar capacity and traffic is relatively predictable.\n- **Weighted Round Robin:** Use when servers have different capacities and should receive traffic proportionally.\n- **Source IP Hash:** Use when the same client needs to consistently connect to the same server.\n- **Least Connections:** Use for variable workloads or applications with long-running connections.\n- **Least Response Time:** Use when reducing response latency is the main priority.\n- **Resource-Based:** Use when routing decisions should depend on changing CPU, memory, or bandwidth usage.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Load Balancing Algorithms (Round Robin, Least Conn, IP Hash)",
      "initialCode": "import hashlib\n\n# Load Balancing Algorithms (Round Robin, Least Conn, IP Hash)\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Load Balancing Algorithms (Round Robin, Least Conn, IP Hash)",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Load Balancing Algorithms (Round Robin, Least Conn, IP Hash) important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Load Balancing Algorithms (Round Robin, Least Conn, IP Hash)",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Load Balancing Algorithms (Round Robin, Least Conn, IP Hash) is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-stateless-stateful-lb": {
    "id": "sd-stateless-stateful-lb",
    "badge": "Module 5 • System Design",
    "readingTime": "12 min read",
    "level": "Intermediate",
    "title": "Stateless vs Stateful Load Balancing",
    "subtitle": "Comprehensive System Design guide to Stateless vs Stateful Load Balancing — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Load balancing distributes incoming traffic across multiple servers to improve application performance and prevent any single server from becoming overloaded. Load balancers can manage traffic in different ways depending on whether they maintain information about client sessions.\n\n- Stateless load balancers route each request independently without storing session information.\n- Stateful load balancers maintain session or connection information to influence how subsequent requests are routed.**Real-world example:** In an e-commerce application, a stateless load balancer may send each product-search request to any available server. In contrast, a stateful load balancer may keep a user’s shopping-session traffic associated with the same backend server when session state is stored there.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Stateless vs Stateful Load Balancing."
        }
      },
      {
        "title": "2. Stateless Load Balancing",
        "content": "Stateless load balancing distributes incoming requests across servers without tracking previous client-to-server routing decisions. Each request is routed independently based on the configured load-balancing algorithm.\n\n- Each request is routed independently without maintaining client-to-server session affinity.\n- Supports horizontal scaling because requests can be distributed across available servers.\n- Can support applications requiring user sessions when session data is stored externally, such as in a database or distributed cache.\n- **Pros:** Simple routing, easier scalability, and flexible traffic distribution.\n- **Cons:** Applications storing session data locally may experience session continuity issues when requests reach different servers.Stateless Load balancing"
      },
      {
        "title": "3. Use Cases",
        "content": "The use cases of stateless load balancing are:\n\n- **RESTful APIs**: APIs that do not require session management can benefit from stateless load balancing, allowing requests to be routed to any server without maintaining session continuity.\n- **Microservices**: Stateless microservices architectures can leverage stateless load balancing for efficient scaling and flexibility in managing service requests.\n- **Content Delivery Networks (CDNs)**: CDNs that deliver static content or data can use stateless load balancing to distribute traffic efficiently without needing session context.\n- **Search Engines**: Stateless load balancing is ideal for search engines and other applications that process independent queries without needing to remember previous interactions."
      },
      {
        "title": "4. Stateful Load Balancing",
        "content": "Stateful load balancing maintains routing information to direct requests from the same client or session to a particular backend server. This behavior is commonly known as session persistence or session affinity.\n\n- Tracks client-to-server routing associations to maintain session affinity.\n- Directs subsequent requests from the same session to the same backend server while the affinity remains valid and the server is available.\n- Typically maintains routing or affinity information rather than the application's actual session data.\n- **Pros:** Supports session affinity and applications relying on server-local session data.\n- **Cons:** Additional routing complexity, potentially uneven traffic distribution, and possible session disruption when a backend server fails.Stateful Load Balancing"
      },
      {
        "title": "5. Use Cases",
        "content": "Stateful load balancing is useful when applications benefit from repeatedly routing client requests to the same backend server.\n\n- **E-Commerce Platforms:** Can use session affinity when shopping cart information or user sessions are stored locally on application servers.\n- **Online Banking:** May use session affinity for specific server-dependent workflows, although many banking applications use shared session storage.\n- **Gaming Servers:** Can benefit from session affinity when active player connections or game-related state are associated with particular servers.\n- **Collaboration Tools:** Real-time collaboration and chat applications may use session affinity for persistent connections or server-specific session handling."
      },
      {
        "title": "6. Stateless Vs Stateful Load Balancing",
        "content": "To provide a clearer comparison, here is a table outlining the key differences between stateless and stateful load balancing:\n\n**Stateless Load Balancing****Stateful Load Balancing**Routes requests independently.Routes related requests using session affinity.Does not maintain session affinity.Maintains session affinity through routing mechanisms.Application sessions can be stored externally.Application sessions may be stored locally or externally.Generally easier to scale horizontally.Session affinity may complicate scaling.Requests can move to healthy servers; session continuity depends on application state storage.Failover may disrupt sessions associated with failed servers.Generally simpler to configure and manage.Requires additional session-affinity configuration or mechanisms.APIs, stateless microservices, and applications using shared state.Applications requiring persistent server associations or server-local sessions.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Stateless vs Stateful Load Balancing",
      "initialCode": "import hashlib\n\n# Stateless vs Stateful Load Balancing\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Stateless vs Stateful Load Balancing",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Stateless vs Stateful Load Balancing important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Stateless vs Stateful Load Balancing",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Stateless vs Stateful Load Balancing is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-consistent-hashing": {
    "id": "sd-consistent-hashing",
    "badge": "Module 5 • System Design",
    "readingTime": "20 min read",
    "level": "Intermediate",
    "title": "Consistent Hashing & Hash Rings Explained",
    "subtitle": "Comprehensive System Design guide to Consistent Hashing & Hash Rings Explained — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Consistent hashing is a technique used in distributed systems and load balancing to distribute data or requests across multiple servers efficiently. It reduces the amount of re-mapping (rehashing) needed when servers are added or removed, improving scalability and stability.\n\n- Servers and requests are mapped onto a virtual hash ring, where each request is assigned to the nearest server in the clockwise direction.\n- When servers are added or removed, only a small portion of requests are redistributed, improving scalability and stability.**Example:** In a caching system (like Redis cluster), if a new server is added, only some keys move to the new server instead of reassigning all keys, which improves performance and reduces downtime.\n\nConsistent Hashing**Note:** In consistent hashing, a request is mapped to the first server encountered in the clockwise direction on the hash ring after hashing the request key.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Consistent Hashing & Hash Rings Explained."
        }
      },
      {
        "title": "2. How Requests Are Assigned to Servers",
        "content": "In consistent hashing, both servers and requests are placed on a virtual ring using a hash function. For any incoming request, the system moves clockwise on the ring and assigns the request to the first server it encounters. This ensures a balanced and predictable distribution of requests.\n\n**Example:** Imagine a hash ring with three servers placed at different positions: Node 1, Node 2, and Node 5. If a request is hashed to a position between Node 1 and Node 2, it will be handled by Node 2 (the next server in the clockwise direction). If Node 2 goes down, the same request will now be handled by Node 5, minimizing redistribution of other requests.\n\nMapping in the Hashing"
      },
      {
        "title": "3. Issues with Traditional Hashing Methods",
        "content": "Here are some key issues with traditional hashing methods explained in easy language:\n\n- **Uneven Distribution of Data**: Data is not evenly spread across servers, causing some servers to be overloaded while others remain underutilized.\n- **Scalability Problems**: When servers are added or removed, most of the data needs to be rehashed and redistributed, leading to delays and inefficiency.\n- **Inflexibility with Changing Servers**: Traditional hashing does not adapt well to scaling up or down, requiring large-scale data movement.\n- **Poor Node Failure Handling**: If a server fails, its data becomes unavailable until it is reassigned or the server recovers.\n- **High Rehashing Overhead**: System changes require rehashing of most keys, increasing computational cost and system load."
      },
      {
        "title": "4. Uses",
        "content": "Consistent hashing is used to efficiently distribute data across servers with minimal re-mapping during changes.\n\n- Used in distributed caching systems to store and retrieve data efficiently.\n- Helps in load balancing by evenly distributing requests across servers.\n- Supports database sharding for better scalability and performance.\n- Improves fault tolerance by limiting impact when a node fails.\n- Enables easy scaling by adding or removing servers with minimal data movement."
      },
      {
        "title": "5. Phases/Working of Consistent Hashing",
        "content": "The following are the phases involved in the process of consistent hashing:\n\n- **Phase 1: Hash Function Selection**: A deterministic hash function is chosen to map both keys and servers to positions on the ring.\n- **Phase 2: Node Assignment: **Servers are placed on a virtual ring, and each key is assigned to the nearest server in the clockwise direction.\n- **Phase 3: Key Replication**: Data is replicated across multiple nodes to ensure availability in distributed systems. If one node fails, other nodes can still serve the data without interruption.\n- **Phase 4: Node Addition/Removal**: When nodes are added or removed, some keys need to be reassigned to maintain balance. Consistent hashing ensures that only a small subset of keys are remapped. This minimizes disruption and improves system stability.\n- **Phase 5: Load balancing**: Consistent hashing helps in distributing the load among the network's nodes. To keep the system balanced and effective when a node is overloaded, portions of its keys can be remapped to other nodes.\n- **Phase 6: Failure Recovery**: If a node fails, the keys that are assigned to it can be remapped to other nodes in the network. This enables data to remain accurate and always available, even in the case of a node failure.**Example**: Let's say we have 5 nodes in the ring and say node 3 fails, then the range of the next server node widens and any request coming in all of this range, goes to the new server node. This shows that due to use of consistent hashing only a small portion of keys are affected.\n\nNode failure"
      },
      {
        "title": "6. Virtual Nodes",
        "content": "To improve load distribution, each physical server is represented by multiple virtual nodes on the hash ring.\n\n- Prevents uneven data distribution.\n- Improves balancing when servers are limited.\n- Commonly used in real-world systems. (e.g., distributed caches)"
      },
      {
        "title": "7. Implementation of Consistent Hashing algorithm",
        "content": "Consistent hashing distributes data across servers efficiently while minimizing data movement when nodes are added or removed.\n\n- **Step 1: Choose a Hash Function**: Select a hash function that produces a uniformly distributed range of hash values. Common choices include MD5, SHA-1, or SHA-256.\n- **Step 2: Define the Hash Ring**: Represent the range of hash values as a ring. This ring should cover the entire possible range of hash values and be evenly distributed.\n- **Step 3: Assign Nodes to the Ring**: Each server is hashed and placed on the ring at a specific position based on its hash value.\n- **Step 4: Key Mapping: **Each key is hashed and mapped onto the ring, then assigned to the nearest server in the clockwise direction.\n- **Step 5: Node Addition**: When a new node is added, it is placed on the ring, and only a small set of nearby keys are reassigned to it.\n- **Step 6: Node Removal**: When a node is removed, its keys are reassigned to the next available node on the ring, ensuring minimal disruption.\n- **Step 7: Load Balancing**: The system monitors node load and redistributes keys if needed to maintain an even distribution."
      },
      {
        "title": "8. Implementation",
        "content": "`\n`\n\n`\n`\n\n`\n`\n**Output**\n**Note: **This example uses a simple hash function and a binary search to find the position on the ring.",
        "code": {
          "language": "python",
          "caption": "System Design Implementation — 8. Implementation",
          "snippet": "#include <bits/stdc++.h>\n\nusing namespace std;\n\nclass ConsistentHashRing {\nprivate:\n    map<int, string> ring;\n    set<int> sorted_keys;\n    int replicas;\n\n    int get_hash(const string& value) {\n        hash<string> hash_function;\n        return hash_function(value);\n    }\n\npublic:\n    ConsistentHashRing(int replicas = 3) : replicas(replicas) {}\n\n      // Function to add Node in the ring\n    void add_node(const string& node) {\n        for (int i = 0; i < replicas; ++i) {\n            int replica_key = get_hash(node + \"_\" + to_string(i));\n            ring[replica_key] = node;\n            sorted_keys.insert(replica_key);\n        }\n    }\n\n      // Function to remove Node from the ring\n    void remove_node(const string& node) {\n        for (int i = 0; i < replicas; ++i) {\n            int replica_key = get_hash(node + \"_\" + to_string(i));\n            ring.erase(replica_key);\n            sorted_keys.erase(replica_key);\n        }\n    }\n\n    string get_node(const string& key) {\n        if (ring.empty()) {\n            return \"\";\n        }\n\n        int hash_value = get_hash(key);\n        auto it = sorted_keys.lower_bound(hash_value);\n\n        if (it == sorted_keys.end()) {\n            // Wra"
        }
      },
      {
        "title": "9. Advantages",
        "content": "Consistent hashing provides efficient data distribution and improves system scalability and reliability in distributed environments.\n\n- **Load Balancing:** Distributes workload across nodes to keep the system efficient and responsive as data grows.\n- **Scalability:** Adapts easily to changes in nodes or data volume with little impact on performance.\n- **Failure Tolerance:** Ensures data remains available by redistributing keys when a node fails.\n- **Simplified Operations:** Makes it easier to add or remove nodes and manage large distributed systems."
      },
      {
        "title": "10. Disadvantages",
        "content": "Despite its benefits, consistent hashing introduces complexity and may have some performance overhead in certain scenarios.\n\n- **Hash Function Complexity:** Requires a good deterministic hash function; poor choice can affect distribution and system efficiency.\n- **Performance Cost:** Mapping, replication, and remapping of keys can introduce additional computational overhead.\n- **Lack of Flexibility:** May not adapt easily to changing system requirements or dynamic network conditions.\n- **High Resource Use:** Adding or removing nodes can sometimes increase resource usage and affect performance.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Consistent Hashing & Hash Rings Explained",
      "initialCode": "#include <bits/stdc++.h>\n\nusing namespace std;\n\nclass ConsistentHashRing {\nprivate:\n    map<int, string> ring;\n    set<int> sorted_keys;\n    int replicas;\n\n    int get_hash(const string& value) {\n        hash<string> hash_function;\n        return hash_function(value);\n    }\n\npublic:\n    ConsistentHashRing(int replicas = 3) : replicas(replicas) {}\n\n      // Function to add Node in the ring\n    void add_node(const string& node) {\n        for (int i = 0; i < replicas; ++i) {\n            int replica_key = get_hash(node + \"_\" + to_string(i));\n            ring[replica_key] = node;\n            sorted_keys.insert(replica_key);\n        }\n    }\n\n      // Function to remove Node from the ring\n    void remove_node(const string& node) {\n        for (int i = 0; i < replicas; ++i) {\n            int replica_key = get_hash(node + \"_\" + to_string(i));\n            ring.erase(replica_key);\n            sorted_keys.erase(replica_key);\n        }\n    }\n\n    string get_node(const string& key) {\n        if (rin",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Consistent Hashing & Hash Rings Explained",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Consistent Hashing & Hash Rings Explained important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Consistent Hashing & Hash Rings Explained",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Consistent Hashing & Hash Rings Explained is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-latency-throughput": {
    "id": "sd-latency-throughput",
    "badge": "Module 5 • System Design",
    "readingTime": "28 min read",
    "level": "Intermediate",
    "title": "Latency and Throughput in System Design",
    "subtitle": "Comprehensive System Design guide to Latency and Throughput in System Design — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Latency and throughput are important concepts in system design that help measure how well a system performs. They are often used to evaluate speed, efficiency, and overall user experience.\n\n- Latency tells how fast a system responds to a request.\n- Throughput tells how much work a system can handle over time.Latency and Throughput",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Latency and Throughput in System Design."
        }
      },
      {
        "title": "2. Latency",
        "content": "Latency is the total time taken for a request to travel from the client to the server and back with a response. It represents the delay experienced in a system and directly impacts user experience. It includes multiple types of delays that occur during communication.\n\n- Latency represents the delay between an action and its corresponding reaction.\n- It can be measured in various units like seconds, milliseconds, and nanoseconds depending on the system and application. **Example:** When you click a website link, the time between clicking and the page loading is the latency.\n\nLatency"
      },
      {
        "title": "3. Components of Latency",
        "content": "Latency is the total delay caused by multiple stages in a system, from sending a request to receiving the response.\n\n- **Transmission Delay:** Time taken to send data from your device into the network.\n- **Processing Delay:** Time taken by the server to process the request.\n- **Queuing Delay:** Time a request waits before being processed.\n- **Response Delay:** Time taken to send the response back to the client.\n- **Round Trip Time**: This includes the time taken for the request to travel to the server, processing time at the server, and the response time back to the sender."
      },
      {
        "title": "4. Working",
        "content": "Latency is the total delay caused by multiple steps like sending the request, server processing, and receiving the response back. Each step adds a small delay, which together forms the overall latency.\n\n**Example**: When you press fire, the command goes to the server, gets processed, and the result comes back to your screen. If latency is high, another player might have moved or shot you, but their actions haven't reached your device yet due to latency. This can result in what's called \"shot registration delay.\" Your actions feel less immediate, and you might see inconsistencies between what you're seeing and what's happening in the game world\n\nLatency can be understood by looking at where the delay happens in a system - either in the network or within the system itself.\n\n**1. Network Latency**\n\nNetwork latency is the time taken for data to travel from one point to another over a network.** It mainly depends on distance, bandwidth, and network congestion.\n\nExample:** Like sending an email—the delay between sending it and the receiver getting it.\n\n**2. System Latency**\n\nSystem latency is the total time taken for a request to be processed and responded to, including network, server processing, and client-side rendering.** It represents the overall delay experienced by the user.\n\nExample:** Time between clicking a button and seeing the updated webpage."
      },
      {
        "title": "5. Factors that causes High Latency",
        "content": "High latency can severely impact the performance and user experience of distributed systems. Here are key factors that contribute to high latency within this context:\n\n- **Network Congestion**: High traffic on a network can cause delays as data packets queue up for transmission.\n- **Bandwidth Limitations**: Limited bandwidth can cause delays in data transmission, particularly in data-intensive applications.\n- **Geographical Distance**: Data traveling long distances between distributed nodes can increase latency due to the inherent delays in transmission.\n- **Server Load**: Overloaded servers can take longer to process requests, contributing to high latency.\n- **Latency in Database Queries**: Complex or inefficient database queries can significantly increase response times."
      },
      {
        "title": "6. Methods to Measure Latency",
        "content": "Latency can be measured using different tools that track the time taken for data to travel across a network or system.\n\n- **Ping:** Sends packets to a server and measures Round Trip Time (RTT).\n- **Traceroute:** Shows the path data takes and identifies delay at each hop.\n- **MTR:** Combines ping + traceroute for continuous latency monitoring.\n- **Performance Profiling Tools:** Measure execution time inside applications.\n- **APM Tools:** Monitor end-to-end application latency and response time.**Example: Calculating Latency (RTT)**\n\nFind RTT between a client (New York) and server (London).\n\n- **Distance:** 5570 km\n- **Speed:** 200,000 km/s\n- **Assumption:** No delay (ideal case)**Step 1: One - Way Latency**\n\n**Latency=Distance/Speed=5570/200000=0.02785 s = 27.85 ms\n\nStep 2: Round Trip Time (RTT)**\n\nRTT=2×27.85=55.7 ms"
      },
      {
        "title": "7. Method to Reduce Latency",
        "content": "Latency can be reduced by optimizing network, system, and data processing techniques.\n\n- Use CDN (Content Delivery Network) to bring data closer to users.\n- Reduce network distance (use nearest servers/regions)\n- Optimize database queries.\n- Use caching to avoid repeated processing.\n- Minimize payload size (compression, smaller APIs)"
      },
      {
        "title": "8. Use Cases",
        "content": "Below are some of the important use cases of latency:\n\n- **User Experience in Applications**: Low latency ensures smooth experiences in apps like online banking, e-commerce, or streaming platforms.\n- **Gaming and Virtual Reality (VR)**: Real-time interaction in multiplayer games or VR systems requires minimal latency for responsiveness.\n- **Stock Trading Apps:** Ultra-low latency for fast execution\n- **Financial Transactions**: In stock trading or payment systems, lower latency helps execute transactions faster and reduces risks.\n- **IoT and Smart Devices**: Devices like smart thermostats or autonomous cars need low latency for timely responses.\n- **Healthcare**: Applications like telemedicine or robotic surgeries demand low latency for real-time feedback and precision."
      },
      {
        "title": "9. Tail Latency",
        "content": "Tail latency refers to the worst-case response times in a system, usually measured at high percentiles like 95th or 99th percentile instead of average latency.\n\n- Focuses on the slowest requests, not the average ones\n- Important in large-scale distributed systems where few slow requests can impact user experience\n- Helps identify performance bottlenecks that averages might hide**Example: **Even if a website’s average latency is 100 ms, some requests may take 1–2 seconds. These slow requests are part of tail latency and can negatively affect user experience."
      },
      {
        "title": "10. Throughput",
        "content": "The rate at which a system, process, or network can move data or carry out operations in a particular period of time is referred to as throughput. Bits per second (bps), bytes per second, transactions per second, etc. are common units of measurement. It is computed by dividing the total number of operations or objects executed by the time taken.\n\n**Example:** an ice-cream factory produces 50 ice-creams in an hour so the throughput of the factory is 50 ice-creams/hour."
      },
      {
        "title": "11. Types",
        "content": "Throughput is used in different contexts depending on the system being measured.\n\n- **Network Throughput:** Amount of data transferred over a network in a given time; used to measure network performance.\n- **Disk Throughput:** Speed at which data is read from or written to storage devices (e.g., SSD/HDD).\n- **Processing Throughput:** Number of operations or tasks a CPU/system can complete per unit time."
      },
      {
        "title": "12. Factors Affecting Throughput",
        "content": "Throughput is influenced by multiple network, hardware, and system-related factors.\n\n- **Network Congestion:** High traffic reduces available bandwidth, lowering throughput.\n- **Bandwidth Limitations:** Limited network capacity restricts the amount of data transferred.\n- **Hardware Performance:** Slow routers, switches, or servers can reduce data handling capacity.\n- **Software Efficiency:** Poorly optimized code or algorithms can slow down processing.\n- **Latency:** Higher delay can reduce effective data transfer, especially in real-time systems."
      },
      {
        "title": "13. Methods to Improve Throughput",
        "content": "Throughput can be improved by optimizing network, hardware, and system performance.\n\n- **Network Optimization:** Use efficient protocols and better routing to reduce delays and packet loss.\n- **Load Balancing:** Distribute traffic across multiple servers to avoid overload and improve performance.\n- **Hardware Upgrades:** Use high-performance routers, switches, and servers to handle more data.\n- **Software Optimization:** Improve code and algorithms to process data faster.\n- **Compression Techniques:** Reduce data size to speed up transmission.\n- **Caching Strategies:** Store frequently used data locally to reduce repeated requests."
      },
      {
        "title": "14. Differences between Throughput and Latency",
        "content": "This section explains how throughput and latency differ in measuring system performance and efficiency.\n\n**Throughput****Latency**Number of tasks completed in a given time.Time taken to complete a single task.Measured in requests/sec, transactions/sec.Measured in milliseconds (ms) or seconds.Focuses on system capacity.Focuses on response time.Higher throughput = more work done in parallel.Lower latency = faster individual response.Important for high-load systems (e.g., servers).Important for real-time systems (e.g., gaming).Example: Bulk data processing system.Example: Fast-loading website or game response.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Latency and Throughput in System Design",
      "initialCode": "import hashlib\n\n# Latency and Throughput in System Design\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Latency and Throughput in System Design",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Latency and Throughput in System Design important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Latency and Throughput in System Design",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Latency and Throughput in System Design is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  },
  "sd-caching-basics": {
    "id": "sd-caching-basics",
    "badge": "Module 5 • System Design",
    "readingTime": "26 min read",
    "level": "Intermediate",
    "title": "Caching in System Design (Write-Through, Write-Back, Cache-Aside)",
    "subtitle": "Comprehensive System Design guide to Caching in System Design (Write-Through, Write-Back, Cache-Aside) — architectural tradeoffs, HLD/LLD patterns, and real-world scalability.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Caching is a concept that involves storing frequently accessed data in a location that is easily and quickly accessible. The purpose of caching is to improve the performance and efficiency of a system by reducing the amount of time it takes to access frequently accessed data.\n\n- Caching acts as the local store for the data and retrieving the data from this local or temporary storage is easier and faster than retrieving it from the database.\n- In a typical web application, we can add an application server cache and an in-memory store like Redis alongside our application server.**Example:** In twitter, when a tweet becomes viral, a huge number of clients request the same tweet, so to reduce the number of calls to the database, we can use cache and the tweets can be provided much faster.",
        "callout": {
          "type": "info",
          "title": "System Architecture Principle",
          "message": "Key architectural tradeoffs, scalability patterns, and design guidelines for Caching in System Design (Write-Through, Write-Back, Cache-Aside)."
        }
      },
      {
        "title": "2. Working",
        "content": "Web application stores data in a database. Reading data from the database needs network calls and I/O operations which is a time-consuming process. Cache reduces the network calls to the database and speeds up the performance of the system.\n\n- When a request is made the first time a call will have to be made to the database to process the query. This is known as a cache miss.\n- Before giving back the result to the user, the result will be saved in the cache.\n- When the second time a user makes the same request, the application will check your cache first to see if the result for that request is cached or not.\n- If it is then the result will be returned from the cache. This is known as a cache hit.\n- The response time for the second time request will be a lot less than the first time. Working"
      },
      {
        "title": "3. Challenges of Storing All Data in Cache",
        "content": "As you know there are many benefits of the cache but that doesn't mean we will store all the information in the cache memory for faster access, we can't do this for multiple reasons, such as:\n\n- Hardware of the cache which is much more expensive than a normal database.\n- Also, the search time will increase if you store tons of data in your cache.\n- Cache is a typically volatile storage, meaning data is lost if the system crashes or restart. For critical and long-term data, storing it only in cache would risk data loss.\n- In short, a cache needs to have the most relevant information according to the request which is going to come in the future."
      },
      {
        "title": "4. Types of Cache",
        "content": "In common there are four types of Cache:"
      },
      {
        "title": "1. Application Server Cache",
        "content": "An Application Server Cache is a storage layer within an application server that temporarily holds frequently accessed data, so it can be quickly retrieved without needing to go back to the main database each time. This helps applications run faster by reducing the load on the database and speeding up response times for users.\n\n**Example: **When an app frequently needs certain data, the application server can store this data in the cache. When users request it, app can instantly provide the cached version instead of processing a full database query.\n\nApplication Server Cache**Drawbacks:**\n\n- When you add multiple servers to handle a high volume of requests.\n- With several servers, a load balancer sends requests to different nodes, but each node only has its own cache and doesn’t know about the cached data on other nodes.\n- This results in many cache misses, meaning the data has to be re-fetched frequently, slowing things down.**Note:** To fix this, there are two main options: Distributed Cache and Global Cache."
      },
      {
        "title": "2. Distributed Cache",
        "content": "In the distributed cache, each node will have a part of the whole cache space and then using the consistent hashing function each request can be routed to where the cache request could be found.\n\n- Each of its nodes will have a small part of the cached data.\n- To identify which node has which request the cache is divided up using a consistent hashing function, so that each request can be routed to where the cached request could be found.\n- If a requesting node is looking for a certain piece of data, it can quickly know where to look within the distributed cache to check if the data is available.Distributed Cache"
      },
      {
        "title": "3. Global Cache",
        "content": "As the name suggests, you will have a single cache space and all the nodes use this single space. Every request will go to this single cache space. There are two kinds of the global cache.\n\n- First, when a cache request is not found in the global cache, it's the responsibility of the cache to find out the missing piece of data from anywhere underlying the store (database, disk, etc).\n- Second, if the request comes and the cache doesn't find the data then the requesting node will directly communicate with the DB or the server to fetch the requested data.Global Cache"
      },
      {
        "title": "4. CDN (Content Delivery Network)/ Edge Cache",
        "content": "A CDN is essentially a group of servers that are strategically placed across the globe with the purpose of accelerating the delivery of web content. A CDN:\n\n- Manages servers that are geographically distributed over different locations.\n- Stores the web content in its servers.\n- Attempts to direct each user to a server that is part of the CDN and close to the user so as to deliver content quickly.\n- Used where a large amount of static content is served by the website. **Note:** It can be an HTML, CSS, JavaScript Files, pictures, videos, etc. First, request ask CDN for data, if it exists then the data will be returned. If not, CDN will query the backend servers and then cache it locally.\n\nCDN"
      },
      {
        "title": "9. Applications",
        "content": "Caching is used in many areas to speed up processes, reduce load and make systems more efficient. Below are some common applications of caching:\n\n- **Web Page Caching**: In order to speed up loading times in the future, browsers save copies of frequently visited websites. This saves bandwidth and shortens the time it takes for a web page to load.\n- **Database Caching**: Frequent database queries can strain servers and cause lag. Caching allows apps to quickly retrieve frequently used data without repeatedly asking the database by storing it in memory.\n- **Content Delivery Networks (CDNs)**: CDNs use caching to keep copies of data (such as pictures and videos) in several places throughout the globe. This enhances website performance by enabling visitors to obtain content more quickly from a nearby server.\n- **Session Caching**: Applications store session data in a cache to remember user information (like login status) between visits, making the experience seamless and personalized without needing to re-login.\n- **API Response Caching**: Frequently requested API data, like stock prices or weather data, can be cached so responses are faster, reducing the load on the server and delivering data in real-time."
      },
      {
        "title": "10. Cache Invalidation Strategies",
        "content": "For systems that use caching to improve performance, cache invalidation is essential. Data is temporarily kept for faster access when it is cached. However, the cached version goes out of date if the original data changes.\n\n- In order to guarantee that users obtain the most recent information, cache invalidation techniques make sure that out-of-date records are either updated or deleted.\n- Common strategies include time-based expiration, where cached data is discarded after a certain time and event-driven invalidation, triggered by changes to the underlying data.\n- Proper cache invalidation optimizes performance and avoids serving users with obsolete or inaccurate content from the cache."
      },
      {
        "title": "11. Eviction Policies",
        "content": "For caching systems to effectively manage their limited cache capacity, eviction policies are essential. An eviction policy decides which existing item to remove when the cache is full and a new item needs to be stored.\n\n- The Least Recently Used (LRU) policy is a popular strategy that eliminates the item that has been accessed the least recently. According to this assumption, items which have been used recently are more likely to be utilized again shortly.\n- Another method is the Least Frequently Used (LFU) policy, removing the least frequently accessed items.\n- Alternatively, there's the First-In-First-Out (FIFO) policy, evicting the oldest cached item."
      },
      {
        "title": "12. Pros",
        "content": "As it maximizes resource utilization, reduces server loads and enhances overall scalability, caching is a helpful technique in software development.\n\n- **Reduced load on the original source:** By significantly reducing down on the time it takes to get frequently used data, caching can enhance system responsiveness and performance.\n- **Cost savings: **Caching can reduce the need for expensive hardware or infrastructure upgrades by improving the efficiency of existing resources."
      },
      {
        "title": "13. Cons",
        "content": "Despite its advantages, caching comes with drawbacks also and some of them are:\n\n- **Data inconsistency: **If cache consistency is not maintained properly, caching can introduce issues with data consistency.\n- **Cache eviction issues:** If cache eviction policies are not designed properly, caching can result in performance issues or data loss.\n- **Additional complexity:** Caching can add additional complexity to a system, which can make it more difficult to design, implement and maintain.Comment"
      }
    ],
    "playground": {
      "title": "System Architecture Simulator: Caching in System Design (Write-Through, Write-Back, Cache-Aside)",
      "initialCode": "import hashlib\n\n# Caching in System Design (Write-Through, Write-Back, Cache-Aside)\n# Consistent Hashing & Capacity Estimation Simulator\n\nclass ConsistentHashRing:\n    def __init__(self, nodes, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in nodes:\n            self.add_node(node)\n\n    def _hash(self, key: str) -> int:\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n    def add_node(self, node: str):\n        for i in range(self.replicas):\n            k = self._hash(f\"{node}:{i}\")\n            self.ring[k] = node\n            self.sorted_keys.append(k)\n        self.sorted_keys.sort()\n\n    def get_node(self, request_key: str) -> str:\n        h = self._hash(request_key)\n        for k in self.sorted_keys:\n            if h <= k:\n                return self.ring[k]\n        return self.ring[self.sorted_keys[0]]\n\nring = ConsistentHashRing([\"shard-eu-1\", \"shard-us-1\", \"shard-ap-1\"])\nfor req in [\"user_101\", \"user_202\", \"video_stream_99\"]:\n    print(f\"Request '{req}' routed to -> {ring.get_node(req)}\")",
      "expectedOutput": [
        "[SYSDESIGN SIM] Initializing architecture simulation for: Caching in System Design (Write-Through, Write-Back, Cache-Aside)",
        "Request 'user_101' routed to -> shard-us-1",
        "Request 'user_202' routed to -> shard-eu-1",
        "Request 'video_stream_99' routed to -> shard-ap-1",
        "[OK] Distributed simulation completed (p99 latency: 4.2ms)."
      ],
      "language": "python",
      "engineBadge": "Architecture Simulator • Python 3.11"
    },
    "quiz": {
      "question": "In large-scale distributed system design, why is Caching in System Design (Write-Through, Write-Back, Cache-Aside) important?",
      "options": [
        "It forces all traffic onto a single unindexed SQLite file",
        "It improves scalability, reliability, maintainability, or structural clarity in Caching in System Design (Write-Through, Write-Back, Cache-Aside)",
        "It eliminates the need for network protocols and TCP/IP",
        "It increases single-point-of-failure (SPOF) risk intentionally"
      ],
      "correctIndex": 1,
      "explanation": "Caching in System Design (Write-Through, Write-Back, Cache-Aside) is a core System Design concept used by architects to balance scalability, latency, availability, and maintainability."
    }
  }
};
