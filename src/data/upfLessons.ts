import { LessonContent } from "./lessonsData";

export const UPF_LESSONS: Record<string, LessonContent> = {
  "unified-power-format": {
    "id": "unified-power-format",
    "badge": "Module 1 • Fundamentals of Low Power Design",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "Fundamentals of Low Power Design",
    "subtitle": "Comprehensive technical guide on fundamentals of low power design within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "![IEEE 1801 UPF Multi-Voltage & Power-Gated Domains](/images/upf/upf-power-domains.svg)\n\nUnderstand static and dynamic power consumption in digital circuits Learn why leakage power dominates in nanometer technologies Identify power management challenges in modern chip design Recognize applications requiring aggressive power optimization",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "P_dynamic = α × C × V_dd² × f"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "Fundamentals of Low Power Design defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. Understanding Power Consumption in Digital Circuits",
        "content": "Power consumption in digital integrated circuits comes from two primary sources: dynamic power and static power . Understanding the difference between these two components is fundamental to implementing effective low-power strategies.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Understanding Power Consumption in Digit",
          "snippet": "P_static = I_leakage × V_dd"
        }
      },
      {
        "title": "3. Dynamic Power",
        "content": "Dynamic power is consumed when transistors switch states (0→1 or 1→0). It consists of two components: Switching Power: Energy required to charge and discharge load capacitances Short-Circuit Power: Current flowing when both PMOS and NMOS transistors are momentarily on during transitions The switching power can be expressed as: Where: α = Activity factor (probability of switching) C = Load capacitance V_dd = Supply voltage f = Clock frequency The quadratic relationship with voltage (V_dd²) means that even small voltage reductions yield significant power savings. This is why voltage scaling is a primary power optimization technique. Dynamic Power in Practice In high-performance processors, dynamic power can account for 50-70% of total power during active operation. Reducing clock frequency or supply voltage during low-activity periods is a common technique used in smartphones and laptops to extend battery life.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Dynamic Power",
          "snippet": "Original Configuration: P1 = 0.2 × 100e-12 × (1.0)² × 2e9 P1 = 0.2 × 100e-12 × 1.0 × 2e9 P1 = 40 mW New Configuration (0.8V, 1.6GHz): P2 = 0.2 × 100e-12 × (0.8)² × 1.6e9 P2 = 0.2 × 100e-12 × 0.64 × 1.6e9 P2 = 20.48 mW Power Savings: Savings = (P1 - P2) / P1 × 100% Savings = (40 - 20.48) / 40 × 100% Savings = 48.8%"
        }
      },
      {
        "title": "4. Static Power (Leakage Power)",
        "content": "Static power, also called leakage power, is consumed even when transistors are not switching. It has become increasingly dominant as process technology scales to nanometer dimensions. Main sources of leakage current include: Subthreshold Leakage: Current flowing when transistor is \"off\" but below threshold voltage Gate Leakage: Current tunneling through thin gate oxide Junction Leakage: Reverse-bias current at source/drain junctions In 28nm and below process nodes, leakage power can exceed 40% of total chip power, even during active operation. In standby modes, leakage is the only power component, making it critical for battery-operated devices. Leakage Power Impact Modern mobile processors implement sophisticated power gating techniques to completely shut off power to unused functional blocks. Without power gating, leakage current in billions of transistors would drain smartphone batteries in hours, even in standby mode."
      },
      {
        "title": "5. Why Power Reduction Matters",
        "content": "Power optimization is no longer optional—it's a fundamental requirement across all application domains:"
      },
      {
        "title": "6. Mobile and IoT Devices",
        "content": "Battery Life: Limited energy storage requires aggressive power management Form Factor: Smaller batteries demand ultra-low-power designs Always-On Operation: Sensors and connectivity require minimal standby power"
      },
      {
        "title": "7. High-Performance Computing",
        "content": "Power Delivery: Package and board power delivery limits maximum performance Thermal Management: Cooling costs and thermal limits constrain chip design Operating Costs: Data center power consumption translates directly to operational expenses"
      },
      {
        "title": "8. Automotive and Industrial",
        "content": "Thermal Constraints: Limited cooling in harsh environments Reliability: Lower power reduces thermal stress and improves MTBF Safety: Power gating ensures functional safety isolation The shift to electric vehicles has made power efficiency critical for automotive chips. Unlike gas cars, EVs are \"always on\" to some degree—monitoring battery health, waiting for over-the-air (OTA) updates, or checking for keyless entry signals. If the control electronics are not hyper-efficient in low-power modes, a car sitting at an airport for a week could lose a significant percentage of its charge."
      },
      {
        "title": "9. Power Management Challenges in Nanometer Technologies",
        "content": "As process technology scales into deep submicron nodes (28nm, 16nm, 7nm, 5nm), power management becomes increasingly complex:"
      },
      {
        "title": "10. 1. Leakage Explosion",
        "content": "Subthreshold leakage increases exponentially as threshold voltage (V_th) decreases with technology scaling. At 7nm and below, leakage can dominate total power consumption. Technology Node Gate Length Leakage % (Active) Leakage % (Standby) 180nm ~180nm 5-10% 30-40% 90nm ~90nm 15-20% 50-60% 28nm ~35nm 30-40% 70-80% 7nm ~10nm 40-50% 85-95% Note: These leakage percentages are illustrative, typical figures for a moderately-optimized design at nominal conditions — actual leakage varies significantly (by 2-3× or more, as covered later in this article) with process corner, temperature, threshold-voltage choice, and how aggressively power-gating and multi-Vt techniques are applied."
      },
      {
        "title": "11. 2. Voltage Scaling Limits",
        "content": "Traditional power reduction through voltage scaling faces limitations: Lower V_dd increases delay, limiting maximum frequency Minimum V_dd bounded by noise margins and variability Subthreshold leakage as a proportion of total power increases as V_dd approaches V_th"
      },
      {
        "title": "12. 3. Variability and Reliability",
        "content": "Process, voltage, and temperature (PVT) variations become more pronounced at advanced nodes: Process Variation: Device parameters vary across die and wafer Voltage Droop: IR drop and di/dt noise affect local supply voltage Temperature Gradients: Hotspots create non-uniform leakage Variability can cause 2-3× differences in leakage between fast and slow corners, making worst-case power budgeting extremely pessimistic."
      },
      {
        "title": "13. 4. Design Complexity",
        "content": "Modern power management requires sophisticated techniques: Multiple voltage and frequency domains Dynamic voltage and frequency scaling (DVFS) Power gating with retention and isolation Clock gating at multiple hierarchical levels Quick Check Q: Why does leakage power become more significant in advanced process nodes? Show Answer As transistors scale down, gate oxide becomes thinner and threshold voltage decreases, leading to exponentially higher subthreshold and gate leakage currents. At 7nm and below, leakage can account for 40-50% of active power and over 90% of standby power."
      },
      {
        "title": "14. The Need for Unified Power Format (UPF)",
        "content": "Implementing sophisticated power management requires coordination across the entire design flow: Specification: Define power domains, voltage levels, and power states RTL Design: Implement power-aware logic structures Verification: Simulate power state transitions and cross-domain signals Synthesis: Insert isolation, level shifters, and retention cells Physical Design: Plan power delivery and implement power switches Without a standardized format to communicate power intent, each tool would require custom power specifications, leading to inconsistencies and errors. UPF (Unified Power Format) provides a single, standardized language to specify power management intent throughout the design flow, from RTL to silicon. This ensures consistency and reduces design errors."
      },
      {
        "title": "15. Common Beginner Misconceptions",
        "content": "Misconception #1: \"Clock gating alone is sufficient for low power\" Reality: Clock gating only reduces dynamic power in sequential logic. It doesn't address leakage power or dynamic power in combinational logic. Comprehensive power management requires multiple techniques including voltage scaling and power gating. Misconception #2: \"Lower frequency always means lower power\" Reality: While dynamic power is proportional to frequency (P ∝ f), reducing frequency without voltage scaling provides limited benefits because leakage power remains constant. The relationship is: P_total = P_dynamic(f) + P_leakage (constant). Misconception #3: \"Power management is only for mobile devices\" Reality: High-performance processors, data center chips, and automotive systems all require aggressive power management due to thermal limits, power delivery constraints, and operational costs."
      },
      {
        "title": "16. Practice Exercise",
        "content": "Challenge: Calculate Power Savings A processor operates at V_dd = 1.0V, f = 2GHz with activity factor α = 0.2 and load capacitance C = 100pF. Calculate the dynamic power savings if voltage is reduced to 0.8V and frequency to 1.6GHz. Hint Use the equation P_dynamic = α × C × V_dd² × f. Calculate power for both scenarios and find the percentage reduction. Solution Result: Reducing voltage from 1.0V to 0.8V (20% reduction) and frequency from 2GHz to 1.6GHz (20% reduction) yields 48.8% dynamic power savings. Note the quadratic effect of voltage scaling."
      },
      {
        "title": "17. Summary",
        "content": "In this tutorial, you learned: Digital circuits consume power through dynamic switching (P = αCV²f) and static leakage (P = I_leakage × V_dd) Leakage power dominates in nanometer technologies, accounting for 40-50% of active power and >90% of standby power at 7nm and below Power reduction is critical across all domains: mobile (battery life), HPC (thermal/cost), automotive (reliability) Nanometer challenges include leakage explosion, voltage scaling limits, variability, and increased design complexity UPF provides standardized power intent specification across the entire design flow from RTL to silicon",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: Fundamentals of Low Power Design",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: Fundamentals of Low Power Design\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: unified-power-format",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What is the primary formula for dynamic switching power dissipation in CMOS circuits?",
      "options": [
        "P = I_leak * V_dd",
        "P = alpha * C * V_dd^2 * f",
        "P = V_dd / R_on",
        "P = alpha * C * V_dd * f^2"
      ],
      "correctIndex": 1,
      "explanation": "Dynamic switching power is given by P = alpha * C * V_dd^2 * f, where alpha is activity factor, C is load capacitance, V_dd is supply voltage, and f is clock frequency. Because voltage is squared, lowering V_dd provides the greatest power reduction."
    }
  },
  "introduction-to-upf": {
    "id": "introduction-to-upf",
    "badge": "Module 1 • Fundamentals of Low Power Design",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "Introduction to UPF",
    "subtitle": "Comprehensive technical guide on introduction to upf within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "![IEEE 1801 UPF Multi-Voltage & Power-Gated Domains](/images/upf/upf-power-domains.svg)\n\nUnderstand what UPF is and its role in low-power design Learn the history and evolution of the IEEE 1801 standard Compare UPF with other power format specifications Recognize the benefits of using UPF in the design methodology",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# Create the top-level power domain create_power_domain PD_TOP -include_scope # Create a power domain for CPU block create_power_domain PD_CPU -elements {CPU_inst} # Define supply nets create_supply_net VDD_TOP -domain PD_TOP # 1.0V supply for top create_supply_net VDD_CPU -domain PD_CPU # 0.9V supply for CPU create_supply_net VSS -domain PD_TOP # Common ground # Create supply sets (groups of related supplies) create_supply_set SS_TOP \\ -function {power VDD_TOP} \\ -function {ground VSS} create_supply_set SS_CPU \\ -function {power VDD_CPU} \\ -function {ground VSS} # Associate supply sets with domains associate_supply_set SS_TOP -handle PD_TOP associate_supply_set SS_CPU -handle PD_CPU"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "Introduction to UPF defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. What is Unified Power Format (UPF)?",
        "content": "Unified Power Format (UPF) is a standardized language for specifying power intent in electronic designs. It provides a tool-independent way to describe: Power Domains: Groups of logic operating under common power control Supply Networks: Power and ground nets with their voltage levels Power Management Strategies: Isolation, retention, level shifting, and power gating Power States: Legal combinations of supply voltages and operating modes UPF is written in Tcl syntax and consists of commands that annotate design netlists with power management information. Unlike RTL code that describes functional behavior, UPF describes power intent —how the design should behave with respect to power. UPF files are separate from RTL code, allowing power architects to specify power management strategies without modifying the functional design. This separation of concerns improves design maintainability and enables independent verification of power and function.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What is Unified Power Format (UPF)?",
          "snippet": "create_power_domain PD_TOP -include_scope create_power_domain PD_GPU -elements {GPU_block} create_supply_net VDD -domain PD_TOP -resolve final create_supply_net VDD_GPU -domain PD_GPU create_supply_net VSS create_supply_set SS_TOP -function {power VDD} -function {ground VSS} create_supply_set SS_GPU -function {power VDD_GPU} -function {ground VSS} create_power_switch SW_GPU -domain PD_GPU \\ -input_supply_port {vin VDD} \\ -output_supply_port {vout VDD_GPU} \\ -control_port {ctrl pwr_en} \\ -on_state {on vin {ctrl}} add_power_state VDD -state {ON 1.2} add_power_state VDD_GPU -state {HIGH 1.1} -state {OFF off}"
        }
      },
      {
        "title": "3. Basic UPF Example",
        "content": "Here's a simple UPF specification showing fundamental concepts: This example creates two power domains operating at different voltages (1.0V and 0.9V), demonstrating multi-voltage design—a common power optimization technique. UPF in Modern SoCs Modern smartphone processors contain 20-30 power domains, each with multiple voltage/frequency operating points. UPF enables design teams to specify this complexity once and use it consistently across simulation, synthesis, place-and-route, and power analysis tools. Without UPF, each tool would require separate, potentially inconsistent power specifications."
      },
      {
        "title": "4. History and Evolution of UPF",
        "content": "UPF has evolved significantly since its inception, with each version adding capabilities for increasingly complex power management scenarios."
      },
      {
        "title": "5. Early History: Pre-Standardization (Before 2007)",
        "content": "Before UPF, EDA vendors used proprietary formats: Cadence: Common Power Format (CPF) Synopsys: Power Compiler commands Mentor: Custom Tcl-based specifications This fragmentation created significant challenges: Designs required multiple power specifications for different tools No guarantee of consistency across the flow Difficult to exchange designs between companies using different tools Verification of power intent was tool-specific"
      },
      {
        "title": "6. IEEE 1801-2009 (UPF v2.0): First IEEE Standard",
        "content": "In 2007, Accellera (now part of IEEE) initiated the UPF standardization effort (UPF v1.0), merging concepts from CPF and Synopsys formats. IEEE 1801-2009 was the first official standard, providing: Basic power domain creation and hierarchy Supply network specification Isolation and level shifter strategies Power state tables (PST) Retention strategies IEEE 1801-2009 established the foundation that made UPF the industry-standard power format, gaining support from all major EDA vendors."
      },
      {
        "title": "7. IEEE 1801-2013 (UPF v2.1): Enhanced Capabilities",
        "content": "The 2013 revision added significant enhancements: Repeater Strategies: Signal integrity for power domain crossings Enhanced PST: More expressive power state modeling Scope Management: Better handling of hierarchical designs Supply Set Handles: Improved supply network references Map Commands: Explicit control over cell mapping"
      },
      {
        "title": "8. IEEE 1801-2015 (UPF v3.0): Verification Focus",
        "content": "The 2015 update emphasized verification and IP integration: IP-XACT Integration: Standardized IP power metadata Verification Semantics: Clarified UPF interpretation for simulators Power-Aware UPF (PA-UPF): Enhanced simulation directives Model Usage: Better specification of when models apply"
      },
      {
        "title": "9. IEEE 1801-2018 (UPF v3.1): Complex hierarchical power intent",
        "content": "This revision includes: Low-Power IP Reuse: Improved partial UPF and IP composition Advanced Power Management: Fine-grained control for complex scenarios Clarifications: Resolved ambiguities from previous versions Tool Consistency: Better defined semantics for cross-tool compatibility"
      },
      {
        "title": "10. IEEE 1801-2024 (UPF v4.0): Mixed-signal and virtual supplies",
        "content": "This revision focuses heavily on interoperability and IP reuse: Value Conversion Methods (VCM) & Tunneling: Bridges the gap between analog/mixed-signal components and digital design by allowing power supplies to connect to arbitrary HDL types more flexibly. Refinable Macros: Allow IP providers to ship \"soft IP\" with power intent that can be refined by the end-user without modifying the original source code. Virtual Supplies: Introduces the concept of virtual supply nets and supply sets, to model power states and port constraints even when physical connections aren't yet defined in the implementation. Version Year Key Features IEEE 1801-2009 2009 Basic domains, isolation, retention, level shifting, PST IEEE 1801-2013 2013 Repeaters, enhanced PST, scope management, supply handles IEEE 1801-2015 2015 IP-XACT integration, verification semantics, PA-UPF IEEE 1801-2018 2018 IP reuse, advanced power management, clarifications IEEE 1801-2024 2024 Mixed-signal interfaces, IP refinement, and virtual supplies Quick Check Q: What was the main motivation for creating UPF as a standard? Show Answer Before UPF, each EDA vendor used proprietary power formats, requiring designers to create multiple power specifications for different tools. UPF standardization enabled a single power intent specification that works across all tools in the design flow, ensuring consistency and reducing errors."
      },
      {
        "title": "11. UPF vs Common Power Format (CPF)",
        "content": "Before UPF became the standard, Common Power Format (CPF) from Cadence was widely used. Understanding the differences helps appreciate UPF's advantages:"
      },
      {
        "title": "12. Similarities",
        "content": "Both use Tcl syntax Both separate power intent from functional RTL Both support power domains, isolation, retention, and level shifting Both define power state tables"
      },
      {
        "title": "13. Key Differences",
        "content": "Aspect UPF (IEEE 1801) CPF (Cadence) Standardization IEEE standard, vendor-neutral Cadence-specific, limited adoption Tool Support All major EDA vendors Primarily Cadence tools Supply Modeling Supply sets with function roles Power nets with domain association Hierarchy Scope-based with explicit control Implicit based on instance hierarchy Verification PA-UPF for simulation semantics Limited verification directives Evolution Regular IEEE updates (2009/13/15/18) Cadence-driven, less frequent While CPF is still supported by Cadence tools for legacy designs, UPF has become the industry standard. Most new designs use UPF for maximum tool interoperability and future-proofing."
      },
      {
        "title": "14. Benefits of Using UPF",
        "content": "Adopting UPF in your design methodology provides numerous advantages across the entire development cycle:"
      },
      {
        "title": "15. 1. Tool Independence and Interoperability",
        "content": "UPF's standardization enables: Single power intent specification for all tools Freedom to choose best-in-class tools for each task Easier IP exchange between companies Reduced vendor lock-in"
      },
      {
        "title": "16. 2. Consistency Across Design Flow",
        "content": "The same UPF file used for: RTL Simulation: Verify power state transitions and X-propagation Synthesis: Insert isolation, level shifters, retention cells Place & Route: Plan power domains, place switches, route supplies Power Analysis: Estimate power consumption per domain and state Formal Verification: Check power management correctness Using identical UPF across the flow eliminates inconsistencies that could cause synthesis-simulation mismatches or implementation errors."
      },
      {
        "title": "17. 3. Separation of Concerns",
        "content": "UPF separates power intent from functional design: Functional Designers: Focus on RTL without power details Power Architects: Specify power strategy in UPF Independent Verification: Verify function and power separately Maintainability: Update power strategy without RTL changes"
      },
      {
        "title": "18. 4. Early Power Planning",
        "content": "UPF enables early power exploration: Simulate power states before RTL is complete Estimate power savings from different strategies Identify power domain boundaries early Make architectural power decisions based on simulation data"
      },
      {
        "title": "19. 5. Hierarchical and Modular Design",
        "content": "UPF supports complex hierarchies: Define power intent at IP block level Compose multiple UPF files at SoC level Reuse IP power specifications Override or extend power intent at integration UPF for IP Reuse A CPU IP block can include its own UPF specification defining internal power domains and states. When integrated into different SoCs, the CPU's UPF can be reused as-is or extended with SoC-specific power management, significantly reducing integration effort and errors."
      },
      {
        "title": "20. Limitations & Caveats",
        "content": "Wildcard Interpretation Divergence: Tools have different \"depths\" for wildcards. Some tools treat * as non-recursive (searching only the current level), while others search through the entire sub-hierarchy. Semantic Drift Between Versions : UPF versions (1.0, 2.0, 3.1, 4.0) are not always fully backward compatible. For example, how \"Power State Tables\" (PSTs) are handled changed significantly between UPF 2.1 and 3.0. The \"80/20\" Design Wall: Most EDA tools can only optimize about 20% of a chip's power (mostly at the gate level). The other 80% is \"locked in\" by your RTL and architectural decisions. UPF cannot fix a bad architecture; it can only implement a good one efficiently."
      },
      {
        "title": "21. 6. Comprehensive Power Management",
        "content": "UPF supports all modern power techniques: Multi-voltage design (multiple V_dd levels) Power gating (shutoff unused blocks) State retention (preserve state during power-down) Isolation (prevent X-propagation) Level shifting (voltage domain crossing) Dynamic voltage/frequency scaling (DVFS)"
      },
      {
        "title": "22. Common Beginner Misconceptions",
        "content": "Misconception #1: \"UPF replaces RTL design\" Reality: UPF complements RTL by adding power intent annotations. The functional RTL design remains unchanged. UPF tells EDA tools how to insert special cells (isolation, retention, level shifters) and verify power management behavior. Misconception #2: \"UPF is only needed for advanced nodes\" Reality: While advanced nodes have more severe leakage, any design with multiple voltage domains or power gating benefits from UPF. Even 28nm designs with modest power management use UPF for consistency and tool interoperability. Misconception #3: \"Learning UPF syntax is enough\" Reality: Effective UPF usage requires understanding power management concepts (isolation, retention, power states), digital design fundamentals, and how EDA tools interpret UPF. UPF syntax is just the language for expressing power architecture knowledge."
      },
      {
        "title": "23. UPF in the Design Methodology",
        "content": "UPF integrates into the standard ASIC/SoC design flow: UPF is typically created early in the design cycle during architecture definition, then refined as RTL develops. This enables early power-aware verification and synthesis experiments."
      },
      {
        "title": "24. Practice Exercise",
        "content": "Challenge: Identify UPF Components Given the following UPF snippet, identify: (1) How many power domains are created? (2) What are the supply voltage values? (3) Which domain can be power-gated? Hint Look for create_power_domain commands to count domains. Check add_power_state for voltage values. The presence of create_power_switch indicates which domain can be shut off. Solution Explanation: This UPF describes a system with an always-on top domain (1.2V) and a power-gated GPU domain (1.1V when active, OFF when idle). The power switch allows complete shutoff of the GPU to eliminate leakage when not in use."
      },
      {
        "title": "25. Summary",
        "content": "In this tutorial, you learned: UPF (IEEE 1801) is a standardized Tcl-based language for specifying power intent separately from RTL functional design UPF evolved from proprietary formats to IEEE standard: 2009 (foundation), 2013 (enhancements), 2015 (verification), 2018 (IP reuse) UPF replaced vendor-specific formats like CPF, providing tool independence and industry-wide interoperability Key benefits include: single specification across tools, separation of power/function, early power planning, IP reuse, and comprehensive power management UPF integrates throughout the design flow from architecture to signoff, ensuring consistent power intent implementation",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: Introduction to UPF",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: Introduction to UPF\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: introduction-to-upf",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What standard defines the Unified Power Format (UPF)?",
      "options": [
        "IEEE 1364",
        "IEEE 1800",
        "IEEE 1801",
        "IEEE 1451"
      ],
      "correctIndex": 2,
      "explanation": "UPF is standardized by the IEEE Standards Association under IEEE 1801 for specifying power design intent in electronic systems."
    }
  },
  "upf-design-flow": {
    "id": "upf-design-flow",
    "badge": "Module 1 • Fundamentals of Low Power Design",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Design Flow",
    "subtitle": "Comprehensive technical guide on upf design flow within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Understand where UPF fits in the RTL-to-GDS design flow Learn how simulation, synthesis, and physical design tools use UPF Recognize the role of power intent specification in each design stage Identify the EDA tool ecosystem supporting UPF",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# Architecture Decision: CPU and GPU are separate power domains create_power_domain PD_CPU -elements {CPU_subsystem} create_power_domain PD_GPU -elements {GPU_subsystem} # Architecture Decision: CPU runs at 1.0V, GPU at 0.9V for efficiency add_power_state VDD_CPU -state {ACTIVE 1.0} add_power_state VDD_GPU -state {ACTIVE 0.9} -state {SLEEP 0.0} # Architecture Decision: GPU can be power-gated to save leakage create_power_switch PSW_GPU -domain PD_GPU ..."
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Design Flow defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. UPF in the RTL-to-GDS Flow",
        "content": "The ASIC/SoC design flow transforms high-level RTL descriptions into physical silicon layouts through multiple stages. UPF integrates at each stage, ensuring power intent remains consistent from specification to implementation.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: UPF in the RTL-to-GDS Flow",
          "snippet": "# Define isolation strategy set_isolation ISO_GPU -domain PD_GPU \\ -isolation_signal iso_gpu \\ -isolation_sense high \\ -clamp_value 0 # Define retention strategy set_retention RET_GPU -domain PD_GPU \\ -retention_signal ret_gpu \\ -retention_sense high"
        }
      },
      {
        "title": "3. Traditional Design Flow (Without UPF)",
        "content": "Before UPF standardization, power management was handled differently at each stage: This approach led to inconsistencies, errors, and significant manual effort to verify power intent across tools.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Traditional Design Flow (Without UPF)",
          "snippet": "# UPF tells synthesis WHERE to insert isolation set_isolation ISO_CPU_TO_TOP -domain PD_CPU \\ -isolation_supply_set SS_TOP \\ # Use always-on supply -isolation_signal iso_cpu_en \\ -isolation_sense high \\ -clamp_value 0 \\ -location parent # Insert in parent domain # UPF specifies level shifter locations set_level_shifter LS_GPU -domain PD_GPU \\ -applies_to outputs \\ -location self # Insert at domain boundary"
        }
      },
      {
        "title": "4. Modern Flow with UPF",
        "content": "UPF provides a unified power specification used throughout the flow: The same UPF file accompanies the design through all stages, ensuring consistency. Tools read UPF to understand power intent and implement appropriate power management logic.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Modern Flow with UPF",
          "snippet": "# Map isolation strategy to specific library cell map_isolation_cell ISO_CPU_TO_TOP \\ -domain PD_CPU \\ -lib_cells {ISOL_AND_0} # Use AND-based isolation, clamp to 0 # Map level shifter to library cell map_level_shifter_cell LS_GPU \\ -domain PD_GPU \\ -lib_cells {LS_HL} # High-to-low level shifter"
        }
      },
      {
        "title": "5. Power Intent Specification Phase",
        "content": "UPF creation begins early in the design cycle, often in parallel with RTL development.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Power Intent Specification Phase",
          "snippet": "# UPF: Define power switch create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {vin VDD} \\ # Input from always-on -output_supply_port {vout VDD_CPU} \\ # Output to domain -control_port {ctrl pwr_enable_cpu} \\ -on_state {on vin {ctrl}} \\ -off_state {off {!ctrl}} # Physical design tool: # 1. Places switch cells near PD_CPU # 2. Routes VDD to switch input # 3. Routes switch output to VDD_CPU power grid # 4. Connects pwr_enable_cpu control signal"
        }
      },
      {
        "title": "6. Architecture and Planning",
        "content": "During architecture, power architects define: Power Domain Boundaries: Which blocks can be independently controlled? Voltage Levels: Operating voltages for each domain Power States: Sleep modes, active modes, performance states Power Management Strategy: When to gate power, isolate signals, retain state Control Mechanisms: How software controls power states These decisions translate directly into UPF commands: Starting UPF early enables power-aware RTL simulation before physical design, catching power management bugs when they're easiest to fix. Architecture-Stage Power Decisions In a typical mobile SoC design, power architects identify 15-25 power domains during architecture phase by analyzing functional blocks, performance requirements, and power budgets. These decisions, captured in UPF, guide the entire implementation flow and determine achievable power savings.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Architecture and Planning",
          "snippet": "# Define power states add_pst_state PST_SYSTEM \\ -state {ACTIVE {VDD_CPU ON} {VDD_GPU ON}} \\ -state {GPU_IDLE {VDD_CPU ON} {VDD_GPU OFF}} \\ -state {SLEEP {VDD_CPU OFF} {VDD_GPU OFF}} # Power analysis tool: # - Estimates power for each state # - Reports: ACTIVE=500mW, GPU_IDLE=200mW, SLEEP=5mW # - Calculates average power based on state probabilities"
        }
      },
      {
        "title": "7. UPF in Simulation and Verification",
        "content": "RTL simulation with UPF enables early detection of power management issues."
      },
      {
        "title": "8. Power-Aware Simulation",
        "content": "Simulators use UPF to: Corrupt Signal Values: Propagate 'X' from powered-off domains Check Isolation: Verify isolation cells prevent X-propagation Check Retention: Ensure state is preserved during power-down Verify Level Shifting: Validate voltage domain crossings Simulate Power States: Test state machine transitions Example UPF for simulation: During simulation, when PD_GPU powers down: Simulator forces all GPU outputs to 'X' If iso_gpu is asserted, isolation cells clamp outputs to 0 (preventing X-propagation) If ret_gpu is asserted, retention registers preserve their state Testbench can verify correct power sequencing Without UPF-aware simulation, power domain bugs (forgotten isolation, incorrect retention timing) won't be discovered until gate-level simulation or silicon, where fixes are expensive."
      },
      {
        "title": "9. Verification Challenges",
        "content": "Power-aware verification checks: X-Propagation: No unknowns from powered-off domains reach active logic Retention Coverage: All critical state is preserved during power cycles Isolation Timing: Isolation asserted before power-down, de-asserted after power-up Level Shifter Correctness: Voltage crossings handled safely Power State Legality: Only valid power state combinations reached Quick Check Q: Why is UPF-aware simulation important even before synthesis? Show Answer UPF-aware RTL simulation catches power management bugs early by checking isolation, retention, and X-propagation behavior. Finding these issues at RTL (before synthesis and layout) allows quick fixes. Discovering power bugs at gate-level or in silicon requires expensive respins and significant schedule delays."
      },
      {
        "title": "10. UPF in Logic Synthesis",
        "content": "Synthesis tools use UPF to insert special cells and optimize for power."
      },
      {
        "title": "11. Power-Aware Synthesis Tasks",
        "content": "During synthesis with UPF, tools: Insert Isolation Cells: At outputs of power-gated domains Insert Level Shifters: At voltage domain crossings Insert Retention Cells: Replace regular flip-flops with retention variants Optimize for Power: Use low-V_th cells in critical paths, high-V_th elsewhere Clock Gating: Insert clock gates for idle logic UPF guides these insertions:"
      },
      {
        "title": "12. Cell Mapping",
        "content": "Synthesis maps UPF strategies to library cells: Synthesis with UPF A typical SoC synthesis run with UPF automatically inserts thousands of special cells: isolation cells at power domain boundaries, level shifters for multi-voltage interfaces, and retention flip-flops for state preservation. Manual insertion would be error-prone and impractical; UPF automation ensures correctness and completeness."
      },
      {
        "title": "13. Multi-Voltage Optimization",
        "content": "UPF enables voltage-aware optimization: Synthesis knows which paths cross voltage domains Level shifters inserted automatically Timing analysis accounts for level shifter delays Voltage-dependent cell delays used for accurate timing Synthesis tools read UPF supply definitions to determine voltage levels for each instance, enabling accurate delay calculation and voltage-aware optimization."
      },
      {
        "title": "14. UPF in Physical Design",
        "content": "Place and route tools use UPF for physical implementation of power intent."
      },
      {
        "title": "15. Physical Design Tasks with UPF",
        "content": "During physical design, UPF guides: Floorplanning: Place power domains in separate regions Power Planning: Create power rings and stripes per domain Switch Placement: Position power switches near domain Cell Placement: Keep domain cells together, respect boundaries Power Routing: Route VDD_domain nets from switches Special Cell Handling: Place isolation/retention cells optimally"
      },
      {
        "title": "16. Power Switch Implementation",
        "content": "UPF defines power switches; place-and-route implements them:"
      },
      {
        "title": "17. Power Grid Planning",
        "content": "Multi-domain designs require separate power grids: VDD (always-on) grid spans entire die VDD_CPU grid only in CPU domain area VDD_GPU grid only in GPU domain area VSS (ground) typically shared across all domains UPF supply network definitions inform power grid planning, ensuring each domain receives appropriate supply routing without shorts between different voltage nets."
      },
      {
        "title": "18. Isolation and Retention Cell Placement",
        "content": "Physical design optimizes special cell placement: Isolation Cells: Placed at domain boundary to minimize timing impact Level Shifters: Positioned to minimize wire delay on shifted signals Retention Cells: Placed normally; connected to retention power supply Quick Check Q: Why does physical design need UPF information about power switches? Show Answer Power switches must be physically placed near their controlled domain to minimize voltage drop and routing resistance. UPF specifies which switch controls which domain, enabling the place-and-route tool to optimally position switches and route the switched power supply (e.g., VDD_CPU) from switch outputs to the domain's power grid."
      },
      {
        "title": "19. Power Analysis and Signoff",
        "content": "UPF enables accurate power estimation and verification throughout the flow."
      },
      {
        "title": "20. Power Analysis Stages",
        "content": "Stage UPF Usage Accuracy RTL UPF defines power states for activity-based estimation ±30-40% Post-Synthesis Gate-level netlist with UPF for cell-level power ±15-20% Post-Layout Parasitic-extracted netlist with UPF for state-aware analysis ±5-10% Signoff Final netlist + UPF + vectors for precise power ±3-5%"
      },
      {
        "title": "21. State-Dependent Power Analysis",
        "content": "UPF power state tables enable per-state power estimation:"
      },
      {
        "title": "22. Signoff Checks",
        "content": "Final verification with UPF includes: UPF Consistency: Verify UPF matches implemented netlist Isolation Verification: Confirm isolation cells exist at all boundaries Retention Verification: Check retention cells and control connectivity Level Shifter Verification: Validate all voltage crossings have shifters Power State Reachability: Verify all legal states are achievable Skipping UPF signoff checks can lead to silicon failures where power management doesn't work as intended, causing functional failures or excessive power consumption."
      },
      {
        "title": "23. Tool Support and Ecosystem",
        "content": "All major EDA vendors support UPF across their tool suites."
      },
      {
        "title": "24. Synopsys",
        "content": "VCS: UPF-aware RTL simulation with power-aware checks Design Compiler: UPF-guided synthesis with cell insertion IC Compiler II: UPF-driven place and route PrimeTime PX: UPF-based power analysis and signoff VC Formal: UPF formal verification"
      },
      {
        "title": "25. Cadence",
        "content": "Xcelium: UPF simulation (also supports legacy CPF) Genus: UPF synthesis and optimization Innovus: UPF physical design implementation Joules: UPF power analysis JasperGold: UPF formal verification"
      },
      {
        "title": "26. Mentor/Siemens",
        "content": "Questa: UPF-aware simulation and power-aware verification Calibre: UPF-aware physical verification (DRC/LVS)"
      },
      {
        "title": "27. Ansys (Apache)",
        "content": "PowerArtist: UPF-based RTL and gate-level power analysis RedHawk: UPF-driven power integrity signoff IEEE 1801 standardization ensures that UPF files work across all vendors' tools, enabling best-of-breed tool selection and multi-vendor flows. Multi-Vendor UPF Flows Large semiconductor companies often use mixed-vendor flows: Synopsys for synthesis, Cadence for physical design, and Mentor for verification. The same UPF file works across all tools, ensuring power intent consistency despite using different vendors at each stage. This flexibility would be impossible with proprietary power formats."
      },
      {
        "title": "28. Best Practices for UPF Integration",
        "content": "Successful UPF adoption requires following proven practices:"
      },
      {
        "title": "29. 1. Start Early",
        "content": "Create initial UPF during architecture phase Refine as RTL develops Enable early power-aware simulation"
      },
      {
        "title": "30. 2. Maintain Single Source",
        "content": "One UPF file (or consistent set) for all tools Avoid tool-specific power specifications Version control UPF with RTL"
      },
      {
        "title": "31. 3. Verify at Each Stage",
        "content": "RTL simulation: Check power state transitions Post-synthesis: Verify cell insertion Post-layout: Confirm physical implementation Signoff: Complete UPF consistency checks"
      },
      {
        "title": "32. 4. Hierarchical UPF",
        "content": "Define power intent at IP level Compose at SoC level Enable IP reuse with portable UPF"
      },
      {
        "title": "33. 5. Collaborate Across Teams",
        "content": "Power architects create UPF structure RTL designers ensure functionality Verification engineers check power management Physical designers implement intent"
      },
      {
        "title": "34. Common Beginner Mistakes",
        "content": "Mistake #1: Creating separate UPF files for different tools Problem: Inconsistencies between synthesis and physical design UPF lead to mismatches and errors. Solution: Maintain one master UPF file used by all tools. Use conditional sections if tool-specific content is unavoidable. Mistake #2: Adding UPF late in the flow (post-synthesis) Problem: Power bugs discovered late require RTL and UPF changes, causing schedule delays. Solution: Start UPF during architecture. Simulate with UPF at RTL stage to catch power management issues early. Mistake #3: Ignoring UPF verification Problem: Assuming tools correctly interpret UPF without verification can result in missing isolation, incorrect retention, or wrong level shifters. Solution: Perform UPF consistency checks at each stage: simulation logs, synthesis reports, layout DRCs, and signoff verification."
      },
      {
        "title": "35. Practice Exercise",
        "content": "Challenge: Map UPF to Design Stages For each design stage below, identify what UPF information is used and what the tool does with it: RTL Simulation Logic Synthesis Place & Route Power Analysis Hint Think about what each tool needs to know about power: simulation checks behavior, synthesis inserts cells, place-and-route implements physical structures, analysis estimates power consumption. Solution"
      },
      {
        "title": "36. Summary",
        "content": "In this tutorial, you learned: UPF integrates throughout the RTL-to-GDS flow, providing consistent power intent from specification to signoff Simulation uses UPF to verify power state transitions, isolation, retention, and X-propagation behavior Synthesis uses UPF to automatically insert isolation, level shifter, and retention cells based on power strategies Physical design uses UPF to implement power switches, create domain-specific power grids, and optimize special cell placement All major EDA vendors (Synopsys, Cadence, Mentor, Ansys) support IEEE 1801 UPF across their tool suites Best practices include starting UPF early, maintaining single source, verifying at each stage, using hierarchical UPF, and cross-team collaboration",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Design Flow",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Design Flow\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-design-flow",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "At which stages of the ASIC design flow is UPF power intent utilized?",
      "options": [
        "Only during physical place and route",
        "Only during static timing analysis (STA)",
        "Across RTL simulation, logic synthesis, formal equivalence, and physical design",
        "Only during final DRC and LVS checks"
      ],
      "correctIndex": 2,
      "explanation": "UPF is a golden constraint file that accompanies the design across the entire ASIC pipeline: power-aware simulation (RTL), power-aware synthesis, LEC/formal verification, and physical P&R."
    }
  },
  "upf-power-domains": {
    "id": "upf-power-domains",
    "badge": "Module 2 • Power Intent & Architecture",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Power Domains",
    "subtitle": "Comprehensive technical guide on upf power domains within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "![IEEE 1801 UPF Multi-Voltage & Power-Gated Domains](/images/upf/upf-power-domains.svg)\n\nUnderstand what power domains are and why they're fundamental to UPF Create power domains using the create_power_domain command Work with hierarchical power domain structures Define power domain boundaries and element membership",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "create_power_domain domain_name [options]"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Power Domains defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. What is a Power Domain?",
        "content": "A power domain is a collection of design elements (modules, instances, logic) that share common power management characteristics. All elements within a power domain: Receive power from the same supply network Operate at the same voltage level Can be controlled together (powered on/off, voltage scaled) Share the same power state behavior Power domains are the fundamental building blocks of UPF. Every design element must belong to exactly one power domain, and all power management strategies (isolation, retention, level shifting) are defined relative to power domain boundaries. Think of power domains as \"power management zones\" in your chip. Just as a building has different lighting zones that can be controlled independently, a chip has power domains that can be managed separately to optimize power consumption. Power Domains in Mobile SoCs A typical smartphone processor contains 20-30 power domains: CPU cores (each core is a separate domain), GPU shader units, display controller, camera ISP, modem baseband, and always-on sensor hub. Each domain can be independently powered off when idle, enabling significant battery savings during typical usage scenarios.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What is a Power Domain?",
          "snippet": "create_power_domain PD_TOP -include_scope"
        }
      },
      {
        "title": "3. Syntax: create_power_domain",
        "content": "The create_power_domain command is the primary UPF command for defining power domains.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Syntax: create_power_domain",
          "snippet": "create_power_domain PD_CPU -elements {cpu_inst}"
        }
      },
      {
        "title": "4. Common Parameters",
        "content": "domain_name - Unique identifier for the power domain (required) -elements {list} - Design instances belonging to this domain -include_scope - Include all hierarchy under current scope -scope instance_name - Set scope to specific instance before creating domain -supply {supply_set} - Associate supply set with domain",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Parameters",
          "snippet": "create_power_domain PD_PERIPH -elements {uart_inst spi_inst i2c_inst}"
        }
      },
      {
        "title": "5. Usage Variations",
        "content": "1. Top-Level Domain (Primary Domain): 2. Domain for Specific Elements: 3. Domain with Multiple Elements: 4. Hierarchical Domain with Scope:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Usage Variations",
          "snippet": "set_scope subsystem_inst create_power_domain PD_SUB -include_scope set_scope ."
        }
      },
      {
        "title": "6. The Primary Power Domain",
        "content": "Every UPF specification must have a primary power domain , typically the top-level domain that encompasses the entire design hierarchy. The -include_scope option means \"include all design elements in the current hierarchical scope.\" When used at the top level, this creates a domain containing everything in the design.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The Primary Power Domain",
          "snippet": "# Create primary power domain at top level create_power_domain PD_TOP -include_scope"
        }
      },
      {
        "title": "7. Why the Primary Domain Matters",
        "content": "Default Membership: Elements not explicitly assigned to another domain belong to the primary domain Always-On Logic: Often represents the always-on portion of the chip Reference Point: Other domains are defined relative to the primary domain Supply Anchor: Primary supplies (VDD, VSS) are typically defined here Convention: Name the primary domain PD_TOP , PD_CHIP , or PD_DEFAULT to clearly indicate it's the top-level domain. Quick Check Q: What happens to design elements that aren't explicitly assigned to a power domain? Show Answer Design elements not explicitly assigned to a power domain automatically belong to the primary power domain (the one created with -include_scope at the top level). This ensures every element has power management coverage.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Why the Primary Domain Matters",
          "snippet": "# CPU block operates at different voltage, can be power-gated create_power_domain PD_CPU -elements {cpu_subsystem} # GPU block can be shut off independently create_power_domain PD_GPU -elements {gpu_subsystem}"
        }
      },
      {
        "title": "8. Creating Power Domains for Design Elements",
        "content": "After creating the primary domain, define additional domains for blocks requiring independent power control.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Creating Power Domains for Design Elemen",
          "snippet": "# All peripheral blocks share 1.8V supply, can be gated together create_power_domain PD_PERIPH -elements { uart_inst spi_inst i2c_inst gpio_inst }"
        }
      },
      {
        "title": "9. Single-Element Domain",
        "content": "This removes cpu_subsystem and gpu_subsystem from PD_TOP and places them in their own domains.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Single-Element Domain",
          "snippet": "# All CPU cores (cpu_core_0, cpu_core_1, cpu_core_2, cpu_core_3) create_power_domain PD_CORES -elements {cpu_core_*} # All memory banks create_power_domain PD_MEM -elements {mem_bank[*]}"
        }
      },
      {
        "title": "10. Multi-Element Domain",
        "content": "Group multiple instances into one domain if they share power characteristics:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Multi-Element Domain",
          "snippet": "# Top-level primary domain create_power_domain PD_TOP -include_scope # CPU subsystem domain create_power_domain PD_CPU -elements {cpu_subsystem} # GPU subsystem domain create_power_domain PD_GPU -elements {gpu_subsystem} # Within CPU subsystem, define per-core domains set_scope cpu_subsystem create_power_domain PD_CORE0 -elements {core_0} create_power_domain PD_CORE1 -elements {core_1} create_power_domain PD_CORE2 -elements {core_2} create_power_domain PD_CORE3 -elements {core_3} create_power_domain PD_L2CACHE -elements {l2_cache} set_scope . ;# \".\" returns scope to the design root/top level"
        }
      },
      {
        "title": "11. Wildcard Patterns",
        "content": "Use wildcards to include multiple instances matching a pattern: Wildcard patterns are tool-dependent. Some tools support * and [*] , while others have limited pattern matching. Check your EDA tool documentation for supported syntax.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Wildcard Patterns",
          "snippet": "# Method 1: Use set_scope to navigate set_scope top/subsystem_a create_power_domain PD_SUBA -include_scope set_scope .. # Method 2: Use -scope option create_power_domain PD_SUBB -scope top/subsystem_b -include_scope # Method 3: Fully qualified element paths create_power_domain PD_SUBC -elements {top/subsystem_c}"
        }
      },
      {
        "title": "12. Hierarchical Power Domains",
        "content": "Complex designs require hierarchical power domain structures where domains contain sub-domains.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Hierarchical Power Domains",
          "snippet": "# Two domains with boundary between them create_power_domain PD_TOP -include_scope create_power_domain PD_MOTOR -elements {motor_ctrl} # Signals crossing from motor_ctrl to top-level logic # cross the PD_MOTOR → PD_TOP boundary"
        }
      },
      {
        "title": "13. Why Hierarchical Domains?",
        "content": "Modularity: Define power intent at IP block level, compose at SoC level IP Reuse: Reusable blocks bring their own power domain definitions Fine-Grained Control: Sub-domains enable more granular power management Scalability: Manage complexity of large SoCs with 20+ domains",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Why Hierarchical Domains?",
          "snippet": "# =================================================================== # Power Domain Definition for Example SoC # =================================================================== # Architecture: # - Always-on top-level domain (1.2V) # - CPU subsystem (1.0V, can be power-gated) # - GPU subsystem (0.9V, can be power-gated) # - Peripherals (1.8V, always-on) # - Memory controller (1.2V, always-on, same as top) # =================================================================== # Primary domain: Always-on, 1.2V create_power_domain PD_TOP -include_scope # CPU subsystem: 1.0V, power-gatable create_power_domain PD_CPU -elements {cpu_subsystem} # GPU subsystem: 0.9V, power-gatable create_power_domain PD_GPU -elements {gpu_subsystem} # Peripheral domain: 1.8V, always-on create_power_domain PD_PERIPH -elements { uart_inst spi_inst i2c_inst } # Memory controller stays in PD_TOP (same voltage) # No separate domain needed - it's implicitly in PD_TOP # =================================================================== # Result: # - 4 power domains defined # - PD_TOP contains: memory_ctrl and any other unassigned logic # - Each domain will later be associated with appropriate supply nets # ==================================================================="
        }
      },
      {
        "title": "14. Example: Hierarchical CPU Subsystem",
        "content": "This creates a hierarchy: Per-Core Power Gating Modern processors implement per-core power gating to save power during low-utilization workloads. When a CPU core is idle, it can be completely powered off while other cores continue running. Hierarchical UPF domains enable this fine-grained control: each core is a separate domain within the CPU subsystem domain, allowing independent on/off control.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Example: Hierarchical CPU Subsystem",
          "snippet": "# CORRECT: cpu_inst is in PD_CPU create_power_domain PD_CPU -elements {cpu_inst} # ERROR: Can't assign cpu_inst to two domains create_power_domain PD_ANOTHER -elements {cpu_inst} # Will fail or override"
        }
      },
      {
        "title": "15. Scope Management",
        "content": "The set_scope command navigates hierarchy when creating domains: Always return to the top scope with set_scope . after creating hierarchical domains to avoid accidentally creating domains in the wrong scope.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Scope Management",
          "snippet": "# PD_TOP includes everything create_power_domain PD_TOP -include_scope # PD_CPU removes cpu_subsystem from PD_TOP create_power_domain PD_CPU -elements {cpu_subsystem} # Within cpu_subsystem, PD_CORE0 removes core_0 from PD_CPU set_scope cpu_subsystem create_power_domain PD_CORE0 -elements {core_0} set_scope . # Result: # - core_0 is in PD_CORE0 (most specific) # - Other parts of cpu_subsystem are in PD_CPU # - Everything else is in PD_TOP"
        }
      },
      {
        "title": "16. Power Domain Boundaries",
        "content": "A power domain boundary is the interface between two different power domains. Signals crossing boundaries require special handling.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Power Domain Boundaries",
          "snippet": "# This includes cpu_subsystem AND all its sub-instances create_power_domain PD_CPU -elements {cpu_subsystem} # This would only include logic directly in current scope, not sub-instances # (Rarely used; -include_scope is more common for hierarchical inclusion) create_power_domain PD_FLAT -include_scope"
        }
      },
      {
        "title": "17. Identifying Boundaries",
        "content": "Boundaries exist where: Signals cross from one power domain to another Different voltage levels meet (multi-voltage design) A gated domain interfaces with always-on logic",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Identifying Boundaries",
          "snippet": "# WRONG: No primary domain create_power_domain PD_CPU -elements {cpu_inst} # CORRECT: Always create primary domain first create_power_domain PD_TOP -include_scope create_power_domain PD_CPU -elements {cpu_inst}"
        }
      },
      {
        "title": "18. Why Boundaries Matter",
        "content": "Power domain boundaries determine where UPF inserts special cells: Isolation Cells: Prevent unknown values when domain is powered off Level Shifters: Translate voltage levels in multi-voltage designs Retention Cells: May be needed at boundary to preserve interface state These strategies are covered in later modules, but understanding that boundaries are defined by domain membership is crucial. Quick Check Q: If a signal goes from cpu_inst (in PD_CPU) to mem_ctrl (in PD_TOP), where is the power domain boundary? Show Answer The boundary is at the output of cpu_inst (or input of mem_ctrl ). The signal crosses from PD_CPU domain to PD_TOP domain at this interface. UPF strategies will be applied at this boundary, such as isolation cells if PD_CPU can be powered off.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Why Boundaries Matter",
          "snippet": "# WRONG: This tries to include everything at top level create_power_domain PD_CPU -include_scope # Ambiguous or error # CORRECT: Either use -elements or set_scope first create_power_domain PD_CPU -elements {cpu_subsystem} # OR set_scope cpu_subsystem create_power_domain PD_CPU -include_scope set_scope ."
        }
      },
      {
        "title": "19. Practical Example: Multi-Domain SoC",
        "content": "Let's create a sample power domain structure for a simple SoC: This structure enables: CPU can be gated when system is idle GPU can be gated when no graphics workload Peripherals always available (1.8V for I/O compatibility) Memory controller always-on with same voltage as top SoC Power Domain Planning During SoC architecture phase, power architects analyze functional blocks to determine domain boundaries. Criteria include: independent operational modes (can this block be off while others run?), voltage requirements (does this block need different V_dd?), and power/performance tradeoffs (is the gating overhead worth the leakage savings?). These decisions directly map to create_power_domain commands.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Practical Example: Multi-Domain SoC",
          "snippet": "# WRONG ORDER: Child before parent set_scope cpu_subsystem create_power_domain PD_CORE0 -elements {core_0} set_scope . create_power_domain PD_CPU -elements {cpu_subsystem} # May override PD_CORE0 # CORRECT ORDER: Parent before children create_power_domain PD_TOP -include_scope create_power_domain PD_CPU -elements {cpu_subsystem} set_scope cpu_subsystem create_power_domain PD_CORE0 -elements {core_0} set_scope ."
        }
      },
      {
        "title": "20. Element Membership Rules",
        "content": "Understanding how UPF assigns elements to domains prevents common errors.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Element Membership Rules",
          "snippet": "# =================================================================== # Power Domain Definition for SoC Exercise # =================================================================== # Primary domain: Contains always_on_ctrl and any unassigned logic create_power_domain PD_TOP -include_scope # I/O subsystem: Always-on, 1.8V (separate domain for different voltage) create_power_domain PD_IO -elements {io_subsystem} # DSP engine: Power-gatable, 0.9V create_power_domain PD_DSP -elements {dsp_engine} # CPU cluster: Power-gatable as a whole, 1.0V create_power_domain PD_CPU_CLUSTER -elements {cpu_cluster} # Within CPU cluster, create per-core domains for fine-grained gating set_scope cpu_cluster # Individual CPU cores - can be gated independently create_power_domain PD_CORE0 -elements {cpu_core0} create_power_domain PD_CORE1 -elements {cpu_core1} # L2 cache - separate domain (could be kept on while cores sleep) create_power_domain PD_L2 -elements {shared_l2} # Return to top scope set_scope . # =================================================================== # Result: 7 power domains # - PD_TOP: always_on_ctrl (always powered, 1.2V) # - PD_IO: io_subsystem (always powered, 1.8V for I/O) # - PD_DSP: dsp_engine (gatable, 0.9V) # - PD_CPU_CLUSTER: (parent domain, can gate entire cluster) # - PD_CORE0: cpu_core0 (fine-grained per-core gating) # - PD_CORE1: cpu_core1 (fine-grained per-core gating) # - PD_L2: shared_l2 (can be controlled separately from cores) # ==================================================================="
        }
      },
      {
        "title": "21. Rule 1: Exclusive Membership",
        "content": "Each design element belongs to exactly one power domain."
      },
      {
        "title": "22. Rule 2: Hierarchical Override",
        "content": "More specific domain assignments override less specific ones:"
      },
      {
        "title": "23. Rule 3: Include Scope vs Elements",
        "content": "-include_scope includes all hierarchy at current scope, while -elements specifies explicit instances."
      },
      {
        "title": "24. Common Beginner Mistakes",
        "content": "Mistake #1: Forgetting to create the primary domain Problem: Creating child domains without a top-level primary domain causes errors or unexpected behavior. Mistake #2: Using -include_scope for child domains incorrectly Problem: Using -include_scope without setting scope can include unintended hierarchy. Mistake #3: Creating domains in wrong hierarchical order Problem: Creating child domain before parent can cause errors or inconsistent hierarchy."
      },
      {
        "title": "25. Practice Exercise",
        "content": "Challenge: Create Power Domains for an SoC Given the following SoC structure, write UPF commands to create appropriate power domains: Requirements: Create appropriate power domains for each block Enable per-core CPU power gating Ensure always_on_ctrl and io_subsystem remain powered Hint You'll need 7 domains total: 1 primary (PD_TOP), 1 for CPU cluster (PD_CPU_CLUSTER), 2 for individual cores (PD_CORE0/1), 1 for L2 cache (PD_L2), 1 for DSP (PD_DSP), and 1 for I/O (PD_IO). Remember to use set_scope for hierarchical domains. Solution Design Rationale: PD_TOP: Always-on control logic must never lose power PD_IO: Separate domain for wake capability and 1.8V I/O voltage PD_DSP: Independent gating when DSP not needed PD_CORE0/1: Per-core gating maximizes power savings during low utilization PD_L2: Separate L2 allows keeping cache powered while cores sleep (faster wake-up)"
      },
      {
        "title": "26. Summary",
        "content": "In this tutorial, you learned: Power domains are collections of design elements sharing common power management characteristics (supply, voltage, control) create_power_domain defines domains using -include_scope (hierarchical) or -elements (explicit instances) Every design must have a primary power domain (typically PD_TOP -include_scope ) containing elements not assigned elsewhere Hierarchical domains enable modular power management and IP reuse, using set_scope to navigate hierarchy Power domain boundaries (signal crossings between domains) determine where isolation, level shifters, and retention are applied Element membership is exclusive (one domain per element), with hierarchical override (specific beats general)",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Power Domains",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Power Domains\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-power-domains",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "Which UPF command creates a power domain encompassing specific RTL hierarchy instances?",
      "options": [
        "create_power_rail",
        "create_power_domain",
        "set_domain_voltage",
        "define_voltage_zone"
      ],
      "correctIndex": 1,
      "explanation": "The 'create_power_domain' command creates a power domain and assigns RTL hierarchy instances to it using the '-elements' argument."
    }
  },
  "upf-supply-networks": {
    "id": "upf-supply-networks",
    "badge": "Module 2 • Power Intent & Architecture",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Supply Networks",
    "subtitle": "Comprehensive technical guide on upf supply networks within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Understand the difference between supply nets and supply ports Create supply networks using create_supply_net and create_supply_port Define primary supply nets for standard power and ground Connect supply networks across hierarchical boundaries",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "create_supply_net net_name -domain domain_name [options]"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Supply Networks defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. Understanding Supply Networks",
        "content": "A supply network in UPF represents the power delivery infrastructure of your design. It consists of: Supply Nets: Internal power/ground nets within a power domain (e.g., VDD, VSS, VDD_CPU) Supply Ports: Connection points where supply nets cross hierarchical boundaries Supply Connections: Relationships between ports and nets across hierarchy Think of supply networks as the \"wiring diagram\" for power delivery, separate from the functional signal connectivity. Supply networks in UPF are declarative—they describe what power connections exist, not how to create them physically. Physical implementation tools use this information to build actual power grids during place and route.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Understanding Supply Networks",
          "snippet": "create_supply_net VDD -domain PD_TOP create_supply_net VSS -domain PD_TOP"
        }
      },
      {
        "title": "3. Supply Nets vs Supply Ports",
        "content": "Aspect Supply Net Supply Port Definition Internal power/ground distribution Hierarchical connection point Scope Within a power domain Crosses hierarchical boundaries Analogy Wires inside a module Pins on a module Example VDD_TOP, VSS, VDD_CPU VDD (port on cpu_inst) Physical Power Delivery In a multi-voltage SoC, different power domains receive power at different voltages through separate power rails. The always-on logic might run at 1.2V (VDD_TOP), CPU cores at 1.0V (VDD_CPU), and I/O at 1.8V (VDDIO). UPF supply networks model these distinct power rails, guiding physical design tools to create separate power grids for each domain.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Supply Nets vs Supply Ports",
          "snippet": "create_supply_net VDD_CPU -domain PD_CPU create_supply_net VSS_CPU -domain PD_CPU"
        }
      },
      {
        "title": "4. Syntax: create_supply_net",
        "content": "The create_supply_net command defines a supply net within a power domain.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Syntax: create_supply_net",
          "snippet": "create_supply_net VDD -domain PD_TOP -resolve final"
        }
      },
      {
        "title": "5. Parameters",
        "content": "net_name - Name of the supply net (required) -domain domain_name - Power domain containing this net (required) -resolve {parallel|final} - Resolution strategy for hierarchical connections -reuse - Allow reuse of existing net name",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Parameters",
          "snippet": "# Create primary power domain create_power_domain PD_TOP -include_scope # Define primary supply nets create_supply_net VDD -domain PD_TOP # Primary power (e.g., 1.2V) create_supply_net VSS -domain PD_TOP # Primary ground (0V)"
        }
      },
      {
        "title": "6. Usage Variations",
        "content": "1. Basic Supply Net: 2. Domain-Specific Supply: 3. Supply with Resolution Strategy:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Usage Variations",
          "snippet": "# =================================================================== # Multi-Voltage Supply Network Example # =================================================================== # Primary domain: 1.2V create_power_domain PD_TOP -include_scope create_supply_net VDD_TOP -domain PD_TOP # 1.2V create_supply_net VSS -domain PD_TOP # 0V (ground) # CPU domain: 1.0V create_power_domain PD_CPU -elements {cpu_inst} create_supply_net VDD_CPU -domain PD_CPU # 1.0V create_supply_net VSS -domain PD_CPU # 0V (shared ground) # I/O domain: 1.8V create_power_domain PD_IO -elements {io_subsystem} create_supply_net VDDIO -domain PD_IO # 1.8V create_supply_net VSS -domain PD_IO # 0V (shared ground) # =================================================================== # Result: Three separate VDD nets at different voltages # - VDD_TOP: 1.2V for top-level logic # - VDD_CPU: 1.0V for CPU (lower voltage = lower power) # - VDDIO: 1.8V for I/O (higher voltage for I/O standards) # - VSS: Common ground across all domains # ==================================================================="
        }
      },
      {
        "title": "7. Creating Primary Supply Nets",
        "content": "Primary supply nets are the main power (VDD) and ground (VSS) supplies for the chip. They are typically defined in the primary power domain.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Creating Primary Supply Nets",
          "snippet": "create_supply_port port_name -domain domain_name [options]"
        }
      },
      {
        "title": "8. Naming Conventions",
        "content": "Common naming patterns for supply nets: VDD / VSS: Primary power and ground VDD_domain / VSS_domain: Domain-specific supplies (VDD_CPU, VSS_CPU) VDDIO: I/O supply voltage VDD_RET: Retention supply (stays on during power-down) VDD_SW: Switched supply (output of power switch) VDDN / VDDP: N-well and P-well supplies (advanced designs) Use descriptive supply net names that indicate voltage level or purpose: VDD_1V0 , VDD_CPU_SW , VDD_AON (always-on). This improves UPF readability and reduces errors.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Naming Conventions",
          "snippet": "create_supply_port VDD_in -domain PD_CPU -direction in"
        }
      },
      {
        "title": "9. Multi-Domain Supply Networks",
        "content": "Multi-voltage designs require separate supply nets for each voltage domain.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Multi-Domain Supply Networks",
          "snippet": "create_supply_port VDD_out -domain PD_TOP -direction out"
        }
      },
      {
        "title": "10. Example: Three-Voltage Design",
        "content": "Ground (VSS) is typically shared across all domains. While you can create separate VSS nets per domain, physical implementation usually connects them to a common ground plane. Quick Check Q: Why create separate VDD nets for different power domains? Show Answer Separate VDD nets enable multi-voltage operation where different domains run at different voltages (e.g., 1.2V for top, 1.0V for CPU). They also enable power gating—a domain's VDD net can be disconnected via power switches while other domains remain powered. Physical design tools use these distinct nets to create separate power grids for each domain.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Example: Three-Voltage Design",
          "snippet": "# =================================================================== # Top-Level UPF # =================================================================== create_power_domain PD_TOP -include_scope create_supply_net VDD -domain PD_TOP create_supply_net VSS -domain PD_TOP # Top-level supply ports (connect to package pins) create_supply_port VDD_PIN -domain PD_TOP -direction in create_supply_port VSS_PIN -domain PD_TOP -direction in # Connect external ports to internal nets connect_supply_net VDD -ports {VDD_PIN} connect_supply_net VSS -ports {VSS_PIN} # =================================================================== # Sub-Module UPF (e.g., cpu_inst) # =================================================================== set_scope cpu_inst create_power_domain PD_CPU_INTERNAL -include_scope create_supply_net VDD_CPU -domain PD_CPU_INTERNAL # CPU module has supply port receiving power from parent create_supply_port VDD_CPU_PORT -domain PD_CPU_INTERNAL -direction in connect_supply_net VDD_CPU -ports {VDD_CPU_PORT} set_scope . # =================================================================== # Connection: Parent VDD → cpu_inst.VDD_CPU_PORT → VDD_CPU net # ==================================================================="
        }
      },
      {
        "title": "11. Syntax: create_supply_port",
        "content": "The create_supply_port command defines connection points for supply networks across hierarchical boundaries.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Syntax: create_supply_port",
          "snippet": "connect_supply_net net_name -ports {port_list}"
        }
      },
      {
        "title": "12. When to Use Supply Ports",
        "content": "Supply ports are needed when: Hierarchical Designs: Sub-modules receive power through ports from parent IP Integration: Reusable blocks define supply ports in their UPF Power Switches: Switch input/output ports connect to supply nets External Supplies: Top-level ports connect to off-chip power",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: When to Use Supply Ports",
          "snippet": "# Top-level net VDD connects to cpu_inst's VDD port connect_supply_net VDD -ports {cpu_inst/VDD} # Within cpu_inst, the VDD port connects to internal VDD_CPU net set_scope cpu_inst connect_supply_net VDD_CPU -ports {VDD} set_scope ."
        }
      },
      {
        "title": "13. Example: Hierarchical Supply Ports",
        "content": "IP Block Supply Interfaces Reusable IP blocks (CPU cores, DSP engines, memory controllers) define supply ports in their UPF to declare power requirements. When integrating the IP into an SoC, the system-level UPF connects the IP's supply ports to appropriate SoC supply nets. This modular approach enables IP reuse across different SoCs with varying power architectures.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Example: Hierarchical Supply Ports",
          "snippet": "# =================================================================== # Hierarchical Supply Network Example # =================================================================== # Top level create_power_domain PD_TOP -include_scope create_supply_net VDD_1V2 -domain PD_TOP create_supply_net GND -domain PD_TOP # CPU subsystem at top level create_power_domain PD_CPU -elements {cpu_subsystem} create_supply_net VDD_1V0 -domain PD_CPU create_supply_net GND -domain PD_CPU # Define supply ports for the cpu_subsystem instance -- set_scope first so # the ports are created inside cpu_subsystem's own hierarchy, matching how # they'll be referenced (cpu_subsystem/VDD) when connecting from the top set_scope cpu_subsystem create_supply_port VDD -domain PD_CPU -direction in create_supply_port VSS -domain PD_CPU -direction in set_scope . # Connect the top-level VDD_1V0/GND nets down to cpu_subsystem's ports connect_supply_net VDD_1V0 -ports {cpu_subsystem/VDD} connect_supply_net GND -ports {cpu_subsystem/VSS} # =================================================================== # Result: # - Top-level provides VDD_1V2 and GND # - CPU subsystem receives power through VDD/VSS ports # - Internally, CPU uses VDD_1V0 net (different from top-level voltage) # ==================================================================="
        }
      },
      {
        "title": "14. Connecting Supply Networks",
        "content": "The connect_supply_net command links supply nets to ports.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Connecting Supply Networks",
          "snippet": "# Final resolution: VDD is the ultimate source create_supply_net VDD -domain PD_TOP -resolve final # Parallel resolution: VDD_CPU can be driven by multiple sources create_supply_net VDD_CPU -domain PD_CPU -resolve parallel"
        }
      },
      {
        "title": "15. Complete Hierarchical Example",
        "content": "Supply port connections must respect voltage compatibility. Connecting a 1.8V net directly to a port expecting 1.0V would be physically incorrect. UPF doesn't validate voltages—it's your responsibility to ensure supply connections match the intended power architecture.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Complete Hierarchical Example",
          "snippet": "# =================================================================== # Power-Gated GPU Domain Supply Network # =================================================================== # Top-level always-on supplies create_power_domain PD_TOP -include_scope create_supply_net VDD_AON -domain PD_TOP # Always-on 1.2V create_supply_net VSS -domain PD_TOP # GPU domain with switchable supply create_power_domain PD_GPU -elements {gpu_inst} create_supply_net VDD_GPU_SW -domain PD_GPU # Switched supply (can be OFF) create_supply_net VSS -domain PD_GPU # Power switch will be defined later, connecting: # Input: VDD_AON (always available) # Output: VDD_GPU_SW (switched to GPU) # Control: Power enable signal # =================================================================== # Result: # - VDD_AON is always present (needed for control logic) # - VDD_GPU_SW can be turned off to gate GPU power # - Power switch (defined in later module) connects VDD_AON → VDD_GPU_SW # ==================================================================="
        }
      },
      {
        "title": "16. Resolution Strategies",
        "content": "The -resolve option controls how supply nets behave in hierarchical designs.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Resolution Strategies",
          "snippet": "# WRONG: Missing -domain option create_supply_net VDD # CORRECT: Always specify which domain contains the net create_supply_net VDD -domain PD_TOP"
        }
      },
      {
        "title": "17. Resolution Types",
        "content": "parallel: Net can be connected from multiple sources (default) final: Net cannot be further resolved (terminal net) In practice, -resolve final is used for top-level primary supplies that shouldn't be overridden, while -resolve parallel (default) allows hierarchical composition. For most designs, omitting -resolve (using default parallel) works fine. Use -resolve final only for top-level chip pins or when you want to explicitly prevent further connections. Quick Check Q: What's the difference between a supply net and a supply port in hierarchical designs? Show Answer A supply net is the internal power distribution within a domain (e.g., VDD_CPU inside the CPU domain). A supply port is a connection point at the boundary of a hierarchical block (e.g., the VDD pin on cpu_inst). The port connects the parent's supply net to the child's internal supply net across hierarchy levels.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Resolution Types",
          "snippet": "# OVERLY COMPLEX: Separate VSS for each domain create_supply_net VSS_TOP -domain PD_TOP create_supply_net VSS_CPU -domain PD_CPU create_supply_net VSS_GPU -domain PD_GPU # SIMPLER: Shared VSS across domains (typical) create_supply_net VSS -domain PD_TOP create_supply_net VSS -domain PD_CPU # Same name, OK for ground create_supply_net VSS -domain PD_GPU"
        }
      },
      {
        "title": "18. Practical Example: Power-Gated Domain",
        "content": "Supply networks for power-gated domains include both always-on and switched supplies. Switched Power Supplies In modern mobile SoCs, power switches control domain supplies. For example, a GPU domain might have VDD_GPU_SW (switched) and VDD_AON (always-on). When the GPU is idle, VDD_GPU_SW is disconnected, eliminating leakage. Control logic uses VDD_AON to maintain state and respond to wake events. This dual-supply approach is standard for power-gated blocks.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Practical Example: Power-Gated Domain",
          "snippet": "# Existing power domains create_power_domain PD_TOP -include_scope create_power_domain PD_CPU -elements {cpu_cluster} create_power_domain PD_DSP -elements {dsp_engine} create_power_domain PD_IO -elements {io_subsystem}"
        }
      },
      {
        "title": "19. Common Naming Patterns",
        "content": "Consistent naming improves UPF maintainability: Pattern Purpose Example VDD_domain Domain-specific power VDD_CPU, VDD_GPU, VDD_DSP VDD_voltage Voltage level indicator VDD_1V0, VDD_1V2, VDD_1V8 VDD_function Functional purpose VDD_AON (always-on), VDD_RET (retention) VDD_SW Switched supply VDD_GPU_SW, VDD_MEM_SW VSS / GND Ground VSS, GND, VSS_domain VDDIO I/O supply VDDIO, VDDIO_1V8",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Common Naming Patterns",
          "snippet": "# =================================================================== # Supply Networks for Multi-Domain SoC # =================================================================== # Top-level supplies (always-on, 1.2V) create_supply_net VDD_TOP -domain PD_TOP create_supply_net VSS -domain PD_TOP # CPU supplies (1.0V, switchable) create_supply_net VDD_CPU -domain PD_CPU create_supply_net VSS -domain PD_CPU # DSP supplies (0.9V, switchable) create_supply_net VDD_DSP -domain PD_DSP create_supply_net VSS -domain PD_DSP # I/O supplies (1.8V, always-on) create_supply_net VDDIO -domain PD_IO create_supply_net VSS -domain PD_IO # =================================================================== # Supply Network Summary: # - VDD_TOP: 1.2V, always-on (for control logic) # - VDD_CPU: 1.0V, switchable (for CPU power gating) # - VDD_DSP: 0.9V, switchable (for DSP power gating) # - VDDIO: 1.8V, always-on (for I/O wake capability) # - VSS: 0V (ground), shared across all domains # =================================================================== # Notes: # 1. VSS uses same name in all domains (physically shared ground) # 2. VDD nets have distinct names reflecting voltage/domain # 3. Later modules will add power switches to control VDD_CPU/VDD_DSP # 4. Level shifters will be needed at domain boundaries (voltage crossings)"
        }
      },
      {
        "title": "20. Common Beginner Mistakes",
        "content": "Mistake #1: Creating supply nets without specifying domain Why? Supply nets must belong to a power domain. Omitting -domain causes errors or undefined behavior. Mistake #2: Assuming supply net names match RTL signal names Problem: UPF supply nets are separate from RTL nets. A supply net named \"VDD\" in UPF doesn't automatically connect to a Verilog signal named \"VDD\". Solution: UPF supply nets are abstract power intent. Physical design tools map these to actual RTL power nets during implementation. Don't expect automatic name matching. Mistake #3: Creating unnecessary separate VSS nets for each domain Why? Ground is almost always shared across all domains. Using the same VSS name in each domain simplifies UPF and reflects physical reality."
      },
      {
        "title": "21. Practice Exercise",
        "content": "Challenge: Create Supply Networks Given the power domains from the previous module's exercise, create appropriate supply networks: Requirements: PD_TOP: 1.2V (always-on) PD_CPU: 1.0V (can be switched off) PD_DSP: 0.9V (can be switched off) PD_IO: 1.8V (always-on for wake capability) Shared ground across all domains Hint Create 5 supply nets: VDD_TOP (1.2V), VDD_CPU (1.0V), VDD_DSP (0.9V), VDDIO (1.8V), and VSS (ground). Use descriptive names indicating voltage or function. Remember to specify -domain for each net. Solution"
      },
      {
        "title": "22. Summary",
        "content": "In this tutorial, you learned: Supply networks model power delivery infrastructure with supply nets (internal distribution) and supply ports (hierarchical connections) create_supply_net defines power/ground nets within a domain, requiring -domain specification Primary supply nets (VDD, VSS) are defined in the primary power domain and represent chip-level power and ground Multi-voltage designs require separate supply nets per voltage domain (VDD_TOP, VDD_CPU, VDDIO), while ground (VSS) is typically shared create_supply_port defines connection points for hierarchical power delivery, with connect_supply_net linking ports to nets Descriptive naming (VDD_domain, VDD_voltage, VDD_SW) improves UPF maintainability and clarity",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Supply Networks",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Supply Networks\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-supply-networks",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What is the difference between a supply net and a supply port in UPF?",
      "options": [
        "A supply port is an external interface connection; a supply net distributes power internally",
        "A supply net is only used for ground rails; supply ports are for VDD rails",
        "A supply port cannot be connected to a supply net",
        "They are completely identical and interchangeable"
      ],
      "correctIndex": 0,
      "explanation": "Supply ports represent power pins and interface boundaries of an instance or top-level chip, whereas supply nets are internal conducting wires that distribute power within a domain."
    }
  },
  "upf-supply-sets": {
    "id": "upf-supply-sets",
    "badge": "Module 2 • Power Intent & Architecture",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Supply Sets and Power Distribution Networks",
    "subtitle": "Abstracting power delivery with IEEE 1801 supply sets: create_supply_set, power, ground, nwell, pwell functions, and domain binding.",
    "sections": [
      {
        "title": "1. Introduction to Supply Sets in IEEE 1801 UPF",
        "content": "In early versions of UPF (UPF 1.0), power networks were defined by explicitly declaring supply nets and supply ports (`create_supply_net`, `create_supply_port`). While functional, this approach tightly coupled power distribution to physical net names, making hierarchical reuse difficult.\n\n**Supply Sets** (introduced in UPF 2.0 and standardized in IEEE 1801) provide a powerful abstraction layer. A supply set is a bundle of related power supply functions—typically a power rail, ground rail, and optional well bias supplies—treated as a single cohesive unit.",
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Supply Set Advantage",
          "message": "Supply sets allow designers to define power intent at the architectural level without binding to specific physical net names, enabling clean IP packaging and hierarchical re-use across projects."
        }
      },
      {
        "title": "2. Creating Supply Sets with create_supply_set",
        "content": "The `create_supply_set` command instantiates a supply set handle. Each supply set comprises standardized functions:\n- **power:** Primary power supply net (VDD)\n- **ground:** Return reference net (VSS)\n- **nwell:** N-well bias supply for PMOS body biasing (optional)\n- **pwell:** P-well bias supply for NMOS body biasing (optional)\n\nExample UPF definition:\n```tcl\n# Define primary and retention supply sets\ncreate_supply_set SS_CORE \\\n    -function {power VDD_CORE} \\\n    -function {ground VSS}\n\ncreate_supply_set SS_AON \\\n    -function {power VDD_AON} \\\n    -function {ground VSS}\n```",
        "code": {
          "language": "tcl",
          "caption": "create_supply_set basic syntax",
          "snippet": "create_supply_set SS_CPU \\\n  -function {power VDD_CPU} \\\n  -function {ground VSS} \\\n  -function {nwell VDD_NWELL} \\\n  -function {pwell VSS_PWELL}"
        }
      },
      {
        "title": "3. Associating Supply Sets with Power Domains",
        "content": "Once created, a supply set can be assigned as the primary supply for a power domain using the `create_power_domain` command or `set_domain_supply_net`:\n\n```tcl\ncreate_power_domain PD_CORE \\\n    -elements {u_core} \\\n    -supply {primary SS_CORE}\n\ncreate_power_domain PD_TOP \\\n    -supply {primary SS_AON}\n```\n\nWhen a domain uses a supply set as its primary supply, all cells placed within that domain automatically inherit the supply set's `power` and `ground` connections unless overridden by isolation or retention rules."
      },
      {
        "title": "4. Supply Set Handles vs. Explicit Supply Nets",
        "content": "Using supply set handles (`SS_CORE.power`, `SS_CORE.ground`) simplifies complex commands like level shifters and isolation rules. Instead of hardcoding nets, rules refer directly to supply sets:\n\n```tcl\n# Isolation rule referencing supply sets\nset_isolation iso_core_to_top \\\n    -domain PD_CORE \\\n    -isolation_supply_set SS_AON \\\n    -clamp_value 0 \\\n    -applies_to outputs\n```\n\nIf the top-level power net name changes later, only the top-level `create_supply_set` definition needs updating; all isolation and level shifter strategies remain untouched.",
        "callout": {
          "type": "tip",
          "title": "Best Practice",
          "message": "Always specify isolation and retention power strategies using `-isolation_supply_set` rather than raw `-isolation_power_net` for maintainability."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Supply Sets and Power Distribution Networks",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Supply Sets and Power Distribution Networks\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-supply-sets",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What functions are typically grouped within an IEEE 1801 supply set?",
      "options": [
        "Clock and reset only",
        "Power (VDD) and Ground (VSS), plus optional well biasing",
        "Input, output, and bidirectional signals",
        "Scan in and scan out test signals"
      ],
      "correctIndex": 1,
      "explanation": "A UPF supply set packages power distribution functions into a bundle: primary power, ground reference, and optional nwell/pwell substrate bias supplies."
    }
  },
  "upf-power-states": {
    "id": "upf-power-states",
    "badge": "Module 2 • Power Intent & Architecture",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Power States and Power State Tables (PST)",
    "subtitle": "Specifying SoC operational voltage modes, SimState semantics, legal transition matrices, and Power State Tables in IEEE 1801.",
    "sections": [
      {
        "title": "1. Multi-Voltage SoC Operational Modes",
        "content": "![UPF Power State Table Operational Modes](/images/upf/upf-pst-table.svg)\n\nModern system-on-chip (SoC) architectures dynamically adjust their supply rails depending on operational demands. For example, during high-throughput compute, both CPU and Memory domains operate at maximum voltage (`FULL_ON`). In idle mode, the CPU domain is completely shut off (`OFF`), while the memory domain drops to a low-leakage state (`RETENTION`).\n\nUPF represents these system modes through **Power States** and **Power State Tables (PST)**.",
        "callout": {
          "type": "info",
          "title": "Why PST Matters",
          "message": "The Power State Table defines the permissible combinations of supply states across all domains. Any voltage combination not listed in the PST is flagged as an illegal operating condition during power-aware simulation."
        }
      },
      {
        "title": "2. Defining Power States with add_power_state",
        "content": "In UPF, power states can be defined on supply sets or individual power domains using `add_power_state`:\n\n```tcl\n# Define states on supply set SS_CPU\nadd_power_state SS_CPU \\\n    -state ON  {-supply_expr {power == `{FULL_ON, 0.9} && ground == `{FULL_ON, 0.0}} -simstate NORMAL} \\\n    -state OFF {-supply_expr {power == `{OFF} && ground == `{FULL_ON, 0.0}} -simstate OFF}\n```\n\nThe `-simstate` attribute dictates simulator behavior:\n- `NORMAL`: Design operates with normal functional logic evaluation.\n- `OFF`: Power is disconnected; all unisolated outputs and internal registers corrupt to unknown (`X`).\n- `CORRUPT`: Unstable intermediate power, outputs corrupt to `X` immediately.\n- `CORRUPT_ON_CHANGE`: Values are corrupted whenever inputs change."
      },
      {
        "title": "3. Creating the Power State Table (PST)",
        "content": "To coordinate multiple supply rails, UPF constructs a table using `create_pst` and populates legal combinations with `add_pst_state`:\n\n```tcl\n# 1. Create table linking supply nets\ncreate_pst soc_pst -supplies {VDD_AON VDD_CPU VDD_MEM}\n\n# 2. Add valid operational modes\nadd_pst_state ALL_ON       -pst soc_pst -state {ON  ON  ON }\nadd_pst_state CPU_SLEEP    -pst soc_pst -state {ON  OFF RET}\nadd_pst_state DEEP_STANDBY -pst soc_pst -state {ON  OFF OFF}\n```",
        "code": {
          "language": "tcl",
          "caption": "IEEE 1801 Power State Table Example",
          "snippet": "create_pst top_pst -supplies {SS_AON.power SS_CORE.power}\nadd_pst_state RUN   -pst top_pst -state {ON  ON}\nadd_pst_state SLEEP -pst top_pst -state {ON  OFF}"
        }
      },
      {
        "title": "4. Verification and Illegal State Detection",
        "content": "During power-aware simulation (PAS), the simulator checks active supply voltages against the PST at every simulation timestep. If a power management unit (PMU) sequences rails into an undefined combination—such as asserting power to a core before its level-shifter supply is enabled—the simulator flags an assertion violation:\n\n```\n** ERROR: PST VIOLATION: Illegal state combination detected at time 45000 ps:\n   VDD_AON = OFF, VDD_CPU = ON (Not defined in PST 'soc_pst')\n```",
        "callout": {
          "type": "warning",
          "title": "Sequence Timing",
          "message": "Carefully model PMU transition delays in your testbench to avoid false-positive PST errors during rapid power switching events."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Power States and Power State Tables (PST)",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Power States and Power State Tables (PST)\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-power-states",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What does the '-simstate OFF' attribute instruct the simulator to do when a domain power rail drops to 0V?",
      "options": [
        "Freeze all values at their current logic state",
        "Corrupt all unisolated outputs and un-retained registers to unknown (X)",
        "Halt the simulator execution immediately",
        "Drive all outputs to strong 0"
      ],
      "correctIndex": 1,
      "explanation": "The '-simstate OFF' attribute models electrical power shutoff by corrupting internal storage elements and unisolated outputs to unknown 'X'."
    }
  },
  "upf-power-shutoff": {
    "id": "upf-power-shutoff",
    "badge": "Module 3 • Power Management Strategies",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Power Shutoff",
    "subtitle": "Comprehensive technical guide on upf power shutoff within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Understand power gating concepts and when to use power shutoff Create power switches using the create_power_switch command Define switch control logic and on/off states Implement complete power gating strategies for domains",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "create_power_switch switch_name -domain domain_name \\ -input_supply_port {port_name supply_net} \\ -output_supply_port {port_name supply_net} \\ -control_port {port_name signal} \\ -on_state {state_name input_port {control_expr}} \\ [options]"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Power Shutoff defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. What is Power Shutoff (Power Gating)?",
        "content": "Power shutoff , also called power gating , is a technique that completely disconnects power supply from a circuit block when it's not in use. By turning off the power, you eliminate all leakage current, achieving zero power consumption in the gated domain.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What is Power Shutoff (Power Gating)?",
          "snippet": "create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_GPU} \\ -control_port {ctrl pwr_en_gpu} \\ -on_state {on in {ctrl}}"
        }
      },
      {
        "title": "3. How Power Gating Works",
        "content": "Power switches (also called power gates or header/footer switches) are inserted between the power supply and the domain: When the control signal is asserted, the switch conducts and the domain receives power. When de-asserted, the switch opens and the domain is completely unpowered. Power switches are physical transistors (typically PMOS header switches or NMOS footer switches) that act as controllable resistors between supply rails. Modern designs use header switches (between VDD and domain) more commonly than footer switches due to better noise immunity. Power Gating Impact In a typical mobile SoC, the GPU might be idle 80-90% of the time during normal usage (web browsing, messaging). Without power gating, the GPU would consume 200-300mW of leakage power continuously. With power gating, idle GPU power drops to near-zero, extending battery life by hours. This is why virtually all modern smartphone processors implement aggressive power gating across dozens of domains.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: How Power Gating Works",
          "snippet": "create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_CPU} \\ -control_port {ctrl pwr_en_cpu} \\ -on_state {on in {ctrl}} \\ -off_state {off {!ctrl}}"
        }
      },
      {
        "title": "4. When to Use Power Shutoff",
        "content": "Power gating is beneficial when: Long Idle Periods: Domain is inactive for milliseconds or longer High Leakage: Domain has significant leakage power (advanced nodes, large blocks) Acceptable Wake Latency: Application can tolerate power-up delay (microseconds to milliseconds) Frequent Sleep Cycles: Domain cycles between active and idle regularly",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: When to Use Power Shutoff",
          "snippet": "create_power_switch PSW_DSP -domain PD_DSP \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_DSP} \\ -control_port {en pwr_enable} \\ -control_port {ack pwr_ack} \\ -on_state {on in {en && ack}}"
        }
      },
      {
        "title": "5. Power Gating Overhead",
        "content": "Power gating has costs that must be considered: Overhead Type Impact Typical Value Area Power switch transistors 5-15% area overhead Wake Latency Time to power up domain 1-100 microseconds Energy Charging domain capacitance nJ to µJ per wake event Complexity Isolation, retention, control Design/verification effort Power gating is worthwhile when idle time exceeds the \"break-even point\"—the time needed to recover the energy spent powering down and up. For typical designs, break-even is 10-100 microseconds, making power gating effective for idle periods longer than ~100µs. Quick Check Q: Why does power gating eliminate leakage but clock gating doesn't? Show Answer Clock gating stops the clock to sequential logic, preventing dynamic switching power but leaving the circuit powered (leakage continues). Power gating disconnects the supply voltage entirely, eliminating both dynamic and leakage power. At advanced nodes where leakage dominates (40-50% of total power), power gating is far more effective for idle blocks.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Power Gating Overhead",
          "snippet": "# =================================================================== # Power-Gated GPU Domain # =================================================================== # Create always-on top domain create_power_domain PD_TOP -include_scope # Create GPU domain (will be power-gated) create_power_domain PD_GPU -elements {gpu_inst} # Supply nets create_supply_net VDD -domain PD_TOP # Always-on supply create_supply_net VSS -domain PD_TOP create_supply_net VDD_GPU -domain PD_GPU # Switched supply create_supply_net VSS -domain PD_GPU # Supply sets create_supply_set SS_TOP \\ -function {power VDD} \\ -function {ground VSS} create_supply_set SS_GPU \\ -function {power VDD_GPU} \\ -function {ground VSS} associate_supply_set SS_TOP -handle PD_TOP associate_supply_set SS_GPU -handle PD_GPU # Power states add_power_state VDD -state {ON 1.2} add_power_state VDD_GPU \\ -state {ACTIVE 1.0} \\ -state {OFF off} # Power switch: Controls VDD → VDD_GPU create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {vin VDD} \\ -output_supply_port {vout VDD_GPU} \\ -control_port {ctrl gpu_power_enable} \\ -on_state {on vin {ctrl}} # =================================================================== # Result: # - When gpu_power_enable = 1: Switch ON, VDD → VDD_GPU (GPU powered) # - When gpu_power_enable = 0: Switch OFF, VDD_GPU disconnected (GPU off) # ==================================================================="
        }
      },
      {
        "title": "6. Syntax: create_power_switch",
        "content": "The create_power_switch command defines a power switch in UPF.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Syntax: create_power_switch",
          "snippet": "-on_state {state_name input_port {control_expression}}"
        }
      },
      {
        "title": "7. Key Parameters",
        "content": "switch_name - Unique identifier for the power switch (required) -domain domain_name - Power domain controlled by this switch (required) -input_supply_port {name net} - Input connection (always-on supply) (required) -output_supply_port {name net} - Output connection (switched supply to domain) (required) -control_port {name signal} - Control signal(s) (required, repeatable) -on_state {name input {expr}} - Define when switch is ON (required, repeatable) -off_state {name {expr}} - Define when switch is OFF (optional)",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Key Parameters",
          "snippet": "# Simple enable (switch on when ctrl = 1) -on_state {on in {ctrl}} # Active-low enable (switch on when ctrl_n = 0) -on_state {on in {!ctrl_n}} # Two-signal AND (switch on when both high) -on_state {on in {enable && ready}} # Two-signal OR (switch on when either high) -on_state {on in {enable || override}} # Complex expression -on_state {on in {enable && !shutdown && (mode1 || mode2)}}"
        }
      },
      {
        "title": "8. Usage Variations",
        "content": "1. Basic Power Switch (Single Control): 2. Power Switch with Explicit OFF State: 3. Multiple Control Signals (AND logic):",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Usage Variations",
          "snippet": "create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_CPU} \\ -control_port {ctrl pwr_en} \\ -on_state {on in {ctrl}} \\ -off_state {off {!ctrl}}"
        }
      },
      {
        "title": "9. Creating a Basic Power Switch",
        "content": "Let's create a complete power gating example for a GPU domain.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Creating a Basic Power Switch",
          "snippet": "# Power switch requires both enable AND acknowledgment create_power_switch PSW_MODEM -domain PD_MODEM \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_MODEM} \\ -control_port {en power_enable} \\ -control_port {ack power_ready} \\ -on_state {on in {en && ack}}"
        }
      },
      {
        "title": "10. Understanding the Ports",
        "content": "input_supply_port {vin VDD}: Switch input connected to always-on VDD output_supply_port {vout VDD_GPU}: Switch output drives domain supply VDD_GPU control_port {ctrl gpu_power_enable}: Control signal from power management controller The port names ( vin , vout , ctrl ) are local to the switch definition and don't need to match RTL signal names. UPF power switches are abstract specifications. Physical design tools map these to actual power switch cells from your technology library during implementation. The UPF describes the logical behavior; the library cells provide the physical transistors.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Understanding the Ports",
          "snippet": "# Power switch enabled by software OR hardware override create_power_switch PSW_PERIPH -domain PD_PERIPH \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_PERIPH} \\ -control_port {sw sw_enable} \\ -control_port {hw hw_override} \\ -on_state {on in {sw || hw}}"
        }
      },
      {
        "title": "11. Control Logic and On/Off States",
        "content": "The -on_state and -off_state options define switch behavior based on control signals.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Control Logic and On/Off States",
          "snippet": "# Header switch (most common) create_power_switch PSW_HEADER -domain PD_CPU \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_CPU} \\ -control_port {ctrl enable} \\ -on_state {on in {ctrl}}"
        }
      },
      {
        "title": "12. On-State Definition",
        "content": "The -on_state specifies when the switch conducts: state_name: Descriptive name (e.g., \"on\", \"enabled\") input_port: Which input port provides power (typically \"in\" or \"vin\") control_expression: Boolean expression of control signals",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: On-State Definition",
          "snippet": "# Footer switch create_power_switch PSW_FOOTER -domain PD_GPU \\ -input_supply_port {in VSS} \\ -output_supply_port {out VSS_GPU} \\ -control_port {ctrl enable} \\ -on_state {on in {ctrl}}"
        }
      },
      {
        "title": "13. Off-State Definition",
        "content": "The -off_state is optional and typically defined as the complement of on-state: If you only define -on_state , the off state is implicitly the negation of all on-states. Explicitly defining -off_state improves clarity and helps tools verify correct behavior. Quick Check Q: What happens to VDD_GPU when the power switch is OFF? Show Answer When the switch is OFF, VDD_GPU is disconnected from VDD and floats to an undefined voltage (eventually decaying to ground through leakage). All logic in the GPU domain loses power, flip-flops lose state, and outputs go to unknown ('X' in simulation). This is why isolation cells are required at domain outputs to prevent X-propagation to always-on logic.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Off-State Definition",
          "snippet": "# Gate entire GPU as one domain create_power_domain PD_GPU -elements {gpu_subsystem} create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_GPU} \\ -control_port {ctrl gpu_enable} \\ -on_state {on in {ctrl}}"
        }
      },
      {
        "title": "14. Multiple Control Signals",
        "content": "Complex power control may require multiple signals with AND/OR logic.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Multiple Control Signals",
          "snippet": "# Gate each GPU shader core independently create_power_domain PD_GPU_CORE0 -elements {gpu_subsystem/core_0} create_power_domain PD_GPU_CORE1 -elements {gpu_subsystem/core_1} create_power_domain PD_GPU_CORE2 -elements {gpu_subsystem/core_2} create_power_domain PD_GPU_CORE3 -elements {gpu_subsystem/core_3} create_power_switch PSW_CORE0 -domain PD_GPU_CORE0 ... create_power_switch PSW_CORE1 -domain PD_GPU_CORE1 ... create_power_switch PSW_CORE2 -domain PD_GPU_CORE2 ... create_power_switch PSW_CORE3 -domain PD_GPU_CORE3 ..."
        }
      },
      {
        "title": "15. AND Logic (All Signals Required)",
        "content": "This implements a handshake protocol: power management controller asserts power_enable , hardware responds with power_ready , and switch turns on only when both are high.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: AND Logic (All Signals Required)",
          "snippet": "# =================================================================== # Complete Power Gating Implementation # =================================================================== # TOP DOMAIN: Always-on create_power_domain PD_TOP -include_scope create_supply_net VDD -domain PD_TOP create_supply_net VSS -domain PD_TOP create_supply_set SS_TOP \\ -function {power VDD} \\ -function {ground VSS} associate_supply_set SS_TOP -handle PD_TOP add_power_state VDD -state {ON 1.2} add_power_state VSS -state {ON 0.0} # CPU DOMAIN: Power-gated with retention create_power_domain PD_CPU -elements {cpu_subsystem} create_supply_net VDD_CPU -domain PD_CPU create_supply_net VDD_CPU_RET -domain PD_CPU create_supply_net VSS -domain PD_CPU create_supply_set SS_CPU_ACTIVE \\ -function {power VDD_CPU} \\ -function {ground VSS} create_supply_set SS_CPU_RET \\ -function {power VDD_CPU_RET} \\ -function {ground VSS} associate_supply_set SS_CPU_ACTIVE -handle PD_CPU add_power_state VDD_CPU \\ -state {ACTIVE 1.0} \\ -state {OFF off} add_power_state VDD_CPU_RET \\ -state {RETENTION 0.6} # CPU power switch with handshake control create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {vin VDD} \\ -output_supply_port {vout VDD_CPU} \\ -control_port {enable cpu_pwr_enable} \\ -control_port {ack cpu_pwr_ack} \\ -on_state {on vin {enable && ack}} \\ -off_state {off {!enable || !ack}} # GPU DOMAIN: Power-gated (no retention) create_power_domain PD_GPU -elements {gpu_subsystem} create_supply_net VDD_GPU -domain PD_GPU create_supply_net VSS -domain PD_GPU create_supply_set SS_GPU \\ -function {power VDD_GPU} \\ -function {ground VSS} associate_supply_set SS_GPU -handle PD_GPU add_power_state VDD_GPU \\ -state {ACTIVE 0.9} \\ -state {OFF off} # GPU power switch with simple enable control create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {vin VDD} \\ -output_supply_port {vout VDD_GPU} \\ -control_port {ctrl gpu_pwr_enable} \\ -on_state {on vin {ctrl}} \\ -off_state {off {!ctrl}} # =================================================================== # Power Management Sequence (CPU with retention): # 1. Power Down: # - Assert cpu_retention_enable (switch FFs to VDD_CPU_RET) # - De-assert cpu_pwr_enable # - Wait for cpu_pwr_ack to drop # - VDD_CPU turns OFF (PSW_CPU opens) # - Retention cells maintain state using VDD_CPU_RET # 2. Power Up: # - Assert cpu_pwr_enable # - Wait for cpu_pwr_ack (VDD_CPU stable) # - De-assert cpu_retention_enable (switch FFs back to VDD_CPU) # - Release reset, resume execution # ==================================================================="
        }
      },
      {
        "title": "16. OR Logic (Any Signal Sufficient)",
        "content": "This allows either software control or hardware emergency override to power on the domain. Handshake Power Control Modern SoCs use handshake protocols for safe power gating: (1) Software requests power-down via enable signal, (2) Hardware saves critical state and asserts acknowledgment, (3) Power switch turns off only after acknowledgment, (4) Reverse process for power-up with acknowledgment confirming stable supply before releasing reset. This prevents data corruption and ensures clean transitions.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: OR Logic (Any Signal Sufficient)",
          "snippet": "# WRONG: Power states not defined create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_GPU} \\ -control_port {ctrl enable} \\ -on_state {on in {ctrl}} # CORRECT: Define states before switch add_power_state VDD -state {ON 1.2} add_power_state VDD_GPU -state {ACTIVE 0.9} -state {OFF off} create_power_switch PSW_GPU -domain PD_GPU ..."
        }
      },
      {
        "title": "17. Header vs Footer Switches",
        "content": "Power switches can be placed in two locations:",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Header vs Footer Switches",
          "snippet": "# WRONG: Input and output both VDD create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD} \\ # Should be VDD_CPU -control_port {ctrl enable} \\ -on_state {on in {ctrl}} # CORRECT: Separate input (always-on) and output (switched) create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_CPU} \\ -control_port {ctrl enable} \\ -on_state {on in {ctrl}}"
        }
      },
      {
        "title": "18. Header vs Footer Comparison",
        "content": "Aspect Header Switch Footer Switch Location Between VDD and domain Between domain and VSS Transistor PMOS (better for high-side) NMOS (better for low-side) Noise Immunity Better (stable ground) Lower (bouncing ground) Usage More common in modern designs Used for specific cases Most modern designs use header switches because a stable ground reference (VSS) improves noise immunity and reduces ground bounce. Footer switches create a \"virtual ground\" that can bounce during switching, potentially causing glitches in adjacent logic.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Header vs Footer Comparison",
          "snippet": "# =================================================================== # Per-Core Power Gating for Quad-Core CPU # =================================================================== # TOP DOMAIN: Always-on create_power_domain PD_TOP -include_scope create_supply_net VDD -domain PD_TOP create_supply_net VSS -domain PD_TOP create_supply_set SS_TOP \\ -function {power VDD} \\ -function {ground VSS} associate_supply_set SS_TOP -handle PD_TOP add_power_state VDD -state {ON 1.2} add_power_state VSS -state {ON 0.0} # CORE 0 DOMAIN create_power_domain PD_CORE0 -elements {cpu_cluster/core_0} create_supply_net VDD_CORE0 -domain PD_CORE0 create_supply_net VSS -domain PD_CORE0 create_supply_set SS_CORE0 \\ -function {power VDD_CORE0} \\ -function {ground VSS} associate_supply_set SS_CORE0 -handle PD_CORE0 add_power_state VDD_CORE0 \\ -state {ACTIVE 1.0} \\ -state {OFF off} create_power_switch PSW_CORE0 -domain PD_CORE0 \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_CORE0} \\ -control_port {ctrl core0_enable} \\ -on_state {on in {ctrl}} # CORE 1 DOMAIN create_power_domain PD_CORE1 -elements {cpu_cluster/core_1} create_supply_net VDD_CORE1 -domain PD_CORE1 create_supply_net VSS -domain PD_CORE1 create_supply_set SS_CORE1 \\ -function {power VDD_CORE1} \\ -function {ground VSS} associate_supply_set SS_CORE1 -handle PD_CORE1 add_power_state VDD_CORE1 \\ -state {ACTIVE 1.0} \\ -state {OFF off} create_power_switch PSW_CORE1 -domain PD_CORE1 \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_CORE1} \\ -control_port {ctrl core1_enable} \\ -on_state {on in {ctrl}} # CORE 2 DOMAIN create_power_domain PD_CORE2 -elements {cpu_cluster/core_2} create_supply_net VDD_CORE2 -domain PD_CORE2 create_supply_net VSS -domain PD_CORE2 create_supply_set SS_CORE2 \\ -function {power VDD_CORE2} \\ -function {ground VSS} associate_supply_set SS_CORE2 -handle PD_CORE2 add_power_state VDD_CORE2 \\ -state {ACTIVE 1.0} \\ -state {OFF off} create_power_switch PSW_CORE2 -domain PD_CORE2 \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_CORE2} \\ -control_port {ctrl core2_enable} \\ -on_state {on in {ctrl}} # CORE 3 DOMAIN create_power_domain PD_CORE3 -elements {cpu_cluster/core_3} create_supply_net VDD_CORE3 -domain PD_CORE3 create_supply_net VSS -domain PD_CORE3 create_supply_set SS_CORE3 \\ -function {power VDD_CORE3} \\ -function {ground VSS} associate_supply_set SS_CORE3 -handle PD_CORE3 add_power_state VDD_CORE3 \\ -state {ACTIVE 1.0} \\ -state {OFF off} create_power_switch PSW_CORE3 -domain PD_CORE3 \\ -input_supply_port {in VDD} \\ -output_supply_port {out VDD_CORE3} \\ -control_port {ctrl core3_enable} \\ -on_state {on in {ctrl}} # =================================================================== # Usage Scenarios: # - Single-threaded workload: Only core0_enable = 1 (other cores gated) # - Dual-threaded: core0_enable and core1_enable = 1 # - Quad-threaded: All enables = 1 (maximum performance) # - Idle: All enables = 0 (all cores gated, minimum power) # ==================================================================="
        }
      },
      {
        "title": "19. Coarse vs Fine-Grained Power Gating",
        "content": "Power gating can be applied at different granularities."
      },
      {
        "title": "20. Coarse-Grained (Block-Level)",
        "content": "Benefits: Simple control, low overhead Drawbacks: All-or-nothing (can't gate parts independently)"
      },
      {
        "title": "21. Fine-Grained (Per-Core, Per-Unit)",
        "content": "Benefits: Maximum power savings (gate individual units) Drawbacks: Higher control complexity, more switches, more area Choose granularity based on usage patterns. If cores are typically all-on or all-off together, coarse-grained gating suffices. If workloads use variable core counts (1 core for light tasks, 4 for heavy), fine-grained gating enables better power scaling."
      },
      {
        "title": "22. Common Beginner Mistakes",
        "content": "Mistake #1: Creating power switch without defining supply states Why? Power switches control state transitions. The supply nets must have defined states (ACTIVE and OFF) before creating the switch that controls those transitions. Mistake #2: Using same net for input and output Why? The switch connects two different nets: input from always-on supply (VDD), output to switched domain supply (VDD_CPU). Using the same net for both defeats the purpose of power gating. Mistake #3: Forgetting isolation for power-gated domains Problem: Creating power switch without isolation strategy causes X-propagation when domain is off. Solution: Always pair power switches with isolation strategies (covered in next article). Isolation cells prevent unknowns from powered-off domains reaching always-on logic."
      },
      {
        "title": "23. Practice Exercise",
        "content": "Challenge: Implement Power Gating for Multi-Core CPU Create UPF for a 4-core CPU with per-core power gating: PD_TOP: Always-on (VDD = 1.2V) PD_CORE0-3: Individual cores, power-gatable (VDD_CORE0-3 = 1.0V active, OFF when gated) Each core has independent enable control: core0_enable , core1_enable , etc. Write the complete UPF including domains, supplies, states, and switches. Hint You'll need 5 domains (PD_TOP + 4 cores), 6 supply nets (VDD + VSS + VDD_CORE0-3), and 4 power switches. Each switch uses independent enable signal. Remember to define power states before creating switches. Solution"
      },
      {
        "title": "24. Summary",
        "content": "In this tutorial, you learned: Power shutoff (gating) eliminates leakage by disconnecting supply voltage, achieving near-zero power in idle domains create_power_switch defines switches with input (always-on), output (switched), and control ports -on_state specifies control logic (boolean expressions) determining when switches conduct Power gating overhead includes area (5-15%), wake latency (1-100µs), and design complexity, worthwhile for idle times >100µs Header switches (high-side, PMOS) are preferred over footer switches for better noise immunity Granularity choice (coarse vs fine-grained) depends on usage patterns and power/area tradeoffs",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Power Shutoff",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Power Shutoff\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-power-shutoff",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What cell structure is inserted by synthesis to disconnect power from a power-gated domain?",
      "options": [
        "Clock gate latch",
        "Power switch cell (header or footer transistor array)",
        "Level shifter cell",
        "Multiplexer buffer"
      ],
      "correctIndex": 1,
      "explanation": "Power switch cells (header switches between VDD and virtual VDD, or footer switches between virtual VSS and VSS) disconnect supply rails during sleep."
    }
  },
  "upf-multi-voltage-design": {
    "id": "upf-multi-voltage-design",
    "badge": "Module 3 • Power Management Strategies",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Multi Voltage Design",
    "subtitle": "Comprehensive technical guide on upf multi voltage design within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "![IEEE 1801 UPF Level Shifter Operation](/images/upf/upf-level-shifter.svg)\n\nUnderstand multi-voltage design concepts and power benefits Identify when level shifters are required at voltage boundaries Define level shifter strategies using set_level_shifter Implement voltage area planning in UPF",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# =================================================================== # Three-Voltage SoC: 1.2V / 1.0V / 1.8V # =================================================================== # TOP DOMAIN: 1.2V (control logic) create_power_domain PD_TOP -include_scope create_supply_net VDD_1V2 -domain PD_TOP create_supply_net VSS -domain PD_TOP create_supply_set SS_1V2 \\ -function {power VDD_1V2} \\ -function {ground VSS} associate_supply_set SS_1V2 -handle PD_TOP add_power_state VDD_1V2 -state {ON 1.2} add_power_state VSS -state {ON 0.0} # CPU DOMAIN: 1.0V (power-optimized) create_power_domain PD_CPU -elements {cpu_subsystem} create_supply_net VDD_1V0 -domain PD_CPU create_supply_net VSS -domain PD_CPU create_supply_set SS_1V0 \\ -function {power VDD_1V0} \\ -function {ground VSS} associate_supply_set SS_1V0 -handle PD_CPU add_power_state VDD_1V0 -state {ACTIVE 1.0} # I/O DOMAIN: 1.8V (external interface) create_power_domain PD_IO -elements {io_subsystem} create_supply_net VDD_1V8 -domain PD_IO create_supply_net VSS -domain PD_IO create_supply_set SS_1V8 \\ -function {power VDD_1V8} \\ -function {ground VSS} associate_supply_set SS_1V8 -handle PD_IO add_power_state VDD_1V8 -state {ON 1.8} # =================================================================== # Voltage Boundaries: # - TOP (1.2V) ↔ CPU (1.0V): Level shifters required # - TOP (1.2V) ↔ I/O (1.8V): Level shifters required # - CPU (1.0V) ↔ I/O (1.8V): Level shifters required (if signals cross) # ==================================================================="
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Multi Voltage Design defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. Understanding Multi-Voltage Design",
        "content": "Multi-voltage design partitions a chip into voltage domains, where different functional blocks operate at different supply voltages. This exploits the quadratic relationship between power and voltage (P ∝ V²) to optimize power consumption.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Understanding Multi-Voltage Design",
          "snippet": "set_level_shifter strategy_name -domain domain_name \\ -applies_to {inputs|outputs|both} \\ [options]"
        }
      },
      {
        "title": "3. Power Savings from Voltage Scaling",
        "content": "Dynamic power has a quadratic dependence on supply voltage: Reducing voltage from 1.2V to 1.0V (17% reduction) yields: This dramatic power reduction motivates multi-voltage design, despite the added complexity. While voltage scaling reduces dynamic power quadratically, it also increases delay (slower switching). Multi-voltage design assigns high voltage to speed-critical blocks and low voltage to non-critical blocks, optimizing power without sacrificing performance on critical paths. Multi-Voltage in Practice A typical mobile SoC might use: 1.2V for high-speed CPU cores and memory interfaces (performance-critical), 1.0V for GPU and DSP (moderate speed), 0.9V for peripheral controllers (low-speed), and 1.8V for I/O pads (compatibility with external devices). This voltage partitioning can reduce overall chip power by 30-40% compared to running everything at the highest required voltage (1.8V).",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Power Savings from Voltage Scaling",
          "snippet": "set_level_shifter LS_CPU -domain PD_CPU \\ -applies_to outputs \\ -location self"
        }
      },
      {
        "title": "4. Voltage Domain Boundaries",
        "content": "When signals cross between voltage domains, special handling is required.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Voltage Domain Boundaries",
          "snippet": "set_level_shifter LS_IO -domain PD_IO \\ -applies_to both \\ -location automatic"
        }
      },
      {
        "title": "5. The Level Shifting Problem",
        "content": "Consider a signal crossing from 1.0V domain to 1.2V domain: The receiving logic expects VOH (logic high output voltage) ≈ 1.2V, but gets only 1.0V. This can cause: Logic errors: 1.0V may not register as valid logic '1' in 1.2V domain Increased delay: Weak drive strength slows transitions Shoot-through current: Both PMOS and NMOS partially on simultaneously Directly connecting domains at different voltages without level shifters can cause functional failures, timing violations, and excessive power consumption due to shoot-through current. Level shifters are mandatory at voltage boundaries. Quick Check Q: Why don't signals from high-voltage to low-voltage domains have the same problem? Show Answer High-to-low transitions (e.g., 1.2V → 1.0V) are safer but still problematic. A 1.2V signal entering a 1.0V domain exceeds the gate oxide voltage rating, potentially causing oxide stress and reliability issues. Level shifters are required in both directions for safe operation, though the failure mechanisms differ (logic errors for low-to-high, reliability for high-to-low).",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The Level Shifting Problem",
          "snippet": "set_level_shifter LS_CONDITIONAL -domain PD_GPU \\ -applies_to outputs \\ -threshold 0.2 \\ # Only if voltage difference > 0.2V -location self"
        }
      },
      {
        "title": "6. Level Shifter Fundamentals",
        "content": "A level shifter is a special circuit that translates signals between voltage domains while maintaining correct logic levels.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Level Shifter Fundamentals",
          "snippet": "# Place level shifters at PD_CPU outputs (inside CPU domain) set_level_shifter LS_CPU_OUT -domain PD_CPU \\ -applies_to outputs \\ -location self"
        }
      },
      {
        "title": "7. Level Shifter Types",
        "content": "Type Direction Characteristics Low-to-High (LH) 0.9V → 1.2V Converts low-voltage signals to high-voltage High-to-Low (HL) 1.2V → 0.9V Converts high-voltage signals to low-voltage Bidirectional Both directions Used for bidirectional buses (less common)",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Level Shifter Types",
          "snippet": "# Place level shifters in parent domain (outside CPU) set_level_shifter LS_CPU_OUT -domain PD_CPU \\ -applies_to outputs \\ -location parent"
        }
      },
      {
        "title": "8. When Level Shifters Are Required",
        "content": "Different VDD levels: Any signal crossing between domains with different supply voltages Both directions: Low-to-high AND high-to-low crossings need shifters All signal types: Data, control, clock signals all require level shifting Exception: Signals within the same voltage domain never need level shifters, even if they cross power domain boundaries (e.g., two domains both at 1.0V). Level shifter delay is typically 2-5× that of a regular buffer. Place shifters carefully to minimize impact on critical timing paths, and account for shifter delay in timing analysis.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: When Level Shifters Are Required",
          "snippet": "# =================================================================== # Level Shifter Strategies for Multi-Voltage SoC # =================================================================== # CPU outputs (1.0V → 1.2V) going to top domain set_level_shifter LS_CPU_OUT -domain PD_CPU \\ -applies_to outputs \\ -location self # CPU inputs (1.2V → 1.0V) coming from top domain set_level_shifter LS_CPU_IN -domain PD_CPU \\ -applies_to inputs \\ -location parent # I/O outputs (1.8V → 1.2V) going to top domain set_level_shifter LS_IO_OUT -domain PD_IO \\ -applies_to outputs \\ -location self # I/O inputs (1.2V → 1.8V) coming from top domain set_level_shifter LS_IO_IN -domain PD_IO \\ -applies_to inputs \\ -location parent # =================================================================== # Result: # - All voltage crossings have level shifters # - Outputs shift at source domain (self) # - Inputs shift at parent domain # ==================================================================="
        }
      },
      {
        "title": "9. Multi-Voltage UPF Example",
        "content": "Let's create a complete multi-voltage design with three voltage levels. This structure creates three voltage islands. Any signal crossing between these domains requires a level shifter. Voltage Planning Strategy When planning voltage domains, group blocks by speed requirement: High-speed blocks (CPU cores, memory interfaces) get high voltage for performance. Medium-speed blocks (GPU, peripherals) use moderate voltage. Low-speed blocks (timers, power management) use low voltage for maximum power savings. I/O domains match external interface standards (1.8V, 3.3V). This strategic voltage assignment optimizes the performance-power tradeoff.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Multi-Voltage UPF Example",
          "snippet": "map_level_shifter_cell strategy_name -domain domain_name \\ -lib_cells {cell_list}"
        }
      },
      {
        "title": "10. Syntax: set_level_shifter",
        "content": "The set_level_shifter command defines level shifter requirements at voltage domain boundaries.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Syntax: set_level_shifter",
          "snippet": "# Map CPU output level shifters to library cell map_level_shifter_cell LS_CPU_OUT -domain PD_CPU \\ -lib_cells {LS_LH_1V0_1V2} # Low-to-High: 1.0V → 1.2V # Map CPU input level shifters to library cell map_level_shifter_cell LS_CPU_IN -domain PD_CPU \\ -lib_cells {LS_HL_1V2_1V0} # High-to-Low: 1.2V → 1.0V"
        }
      },
      {
        "title": "11. Key Parameters",
        "content": "strategy_name - Unique identifier for the level shifter strategy (required) -domain domain_name - Domain where shifters are applied (required) -applies_to {inputs|outputs|both} - Which signals get shifters (required) -location {self|parent|fanout|automatic} - Where shifters are placed -threshold voltage - Voltage difference threshold for shifter insertion -rule {low_to_high|high_to_low|both} - Which voltage transitions need shifters",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Key Parameters",
          "snippet": "# Only insert level shifters if voltage difference > 0.2V set_level_shifter LS_CONDITIONAL -domain PD_GPU \\ -applies_to outputs \\ -threshold 0.2 \\ -location self"
        }
      },
      {
        "title": "12. Usage Variations",
        "content": "1. Basic Level Shifter (All Outputs): 2. Bidirectional Level Shifters: 3. Threshold-Based (Only Insert if ΔV > threshold):",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Usage Variations",
          "snippet": "# =================================================================== # Complete Multi-Voltage Design with Level Shifters # =================================================================== # TOP DOMAIN: 1.2V (always-on control) create_power_domain PD_TOP -include_scope create_supply_net VDD_1V2 -domain PD_TOP create_supply_net VSS -domain PD_TOP create_supply_set SS_1V2 \\ -function {power VDD_1V2} \\ -function {ground VSS} associate_supply_set SS_1V2 -handle PD_TOP add_power_state VDD_1V2 -state {ON 1.2} # CPU DOMAIN: 1.0V (power-optimized) create_power_domain PD_CPU -elements {cpu_inst} create_supply_net VDD_1V0 -domain PD_CPU create_supply_net VSS -domain PD_CPU create_supply_set SS_1V0 \\ -function {power VDD_1V0} \\ -function {ground VSS} associate_supply_set SS_1V0 -handle PD_CPU add_power_state VDD_1V0 -state {ACTIVE 1.0} # GPU DOMAIN: 0.9V (maximum power savings) create_power_domain PD_GPU -elements {gpu_inst} create_supply_net VDD_0V9 -domain PD_GPU create_supply_net VSS -domain PD_GPU create_supply_set SS_0V9 \\ -function {power VDD_0V9} \\ -function {ground VSS} associate_supply_set SS_0V9 -handle PD_GPU add_power_state VDD_0V9 -state {ACTIVE 0.9} # I/O DOMAIN: 1.8V (external interface) create_power_domain PD_IO -elements {io_pads} create_supply_net VDD_1V8 -domain PD_IO create_supply_net VSS -domain PD_IO create_supply_set SS_1V8 \\ -function {power VDD_1V8} \\ -function {ground VSS} associate_supply_set SS_1V8 -handle PD_IO add_power_state VDD_1V8 -state {ON 1.8} # =================================================================== # LEVEL SHIFTER STRATEGIES # =================================================================== # CPU ↔ TOP (1.0V ↔ 1.2V) set_level_shifter LS_CPU_OUT -domain PD_CPU \\ -applies_to outputs \\ -location self set_level_shifter LS_CPU_IN -domain PD_CPU \\ -applies_to inputs \\ -location parent # GPU ↔ TOP (0.9V ↔ 1.2V) set_level_shifter LS_GPU_OUT -domain PD_GPU \\ -applies_to outputs \\ -location self set_level_shifter LS_GPU_IN -domain PD_GPU \\ -applies_to inputs \\ -location parent # I/O ↔ TOP (1.8V ↔ 1.2V) set_level_shifter LS_IO_OUT -domain PD_IO \\ -applies_to outputs \\ -location self set_level_shifter LS_IO_IN -domain PD_IO \\ -applies_to inputs \\ -location parent # =================================================================== # MAP TO LIBRARY CELLS (technology-specific) # =================================================================== # CPU level shifters map_level_shifter_cell LS_CPU_OUT -domain PD_CPU \\ -lib_cells {LS_LH_1V0_1V2_X1 LS_LH_1V0_1V2_X2} map_level_shifter_cell LS_CPU_IN -domain PD_CPU \\ -lib_cells {LS_HL_1V2_1V0_X1 LS_HL_1V2_1V0_X2} # GPU level shifters map_level_shifter_cell LS_GPU_OUT -domain PD_GPU \\ -lib_cells {LS_LH_0V9_1V2_X1 LS_LH_0V9_1V2_X2} map_level_shifter_cell LS_GPU_IN -domain PD_GPU \\ -lib_cells {LS_HL_1V2_0V9_X1 LS_HL_1V2_0V9_X2} # I/O level shifters map_level_shifter_cell LS_IO_OUT -domain PD_IO \\ -lib_cells {LS_HL_1V8_1V2_X1 LS_HL_1V8_1V2_X2} map_level_shifter_cell LS_IO_IN -domain PD_IO \\ -lib_cells {LS_LH_1V2_1V8_X1 LS_LH_1V2_1V8_X2} # =================================================================== # Power Savings Analysis: # - CPU at 1.0V vs 1.2V: 31% power reduction (dynamic) # - GPU at 0.9V vs 1.2V: 44% power reduction (dynamic) # - Overall chip power reduction: ~30-40% (depends on mix) # ==================================================================="
        }
      },
      {
        "title": "13. Level Shifter Placement Strategies",
        "content": "The -location option controls where level shifters are physically placed.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Level Shifter Placement Strategies",
          "snippet": "# INCOMPLETE: Only outputs have shifters set_level_shifter LS_CPU -domain PD_CPU \\ -applies_to outputs \\ -location self # COMPLETE: Both directions need shifters set_level_shifter LS_CPU_OUT -domain PD_CPU \\ -applies_to outputs \\ -location self set_level_shifter LS_CPU_IN -domain PD_CPU \\ -applies_to inputs \\ -location parent"
        }
      },
      {
        "title": "14. Location Options",
        "content": "Location Placement Use Case self Inside source domain Place shifters at output of source domain parent In parent domain Place shifters outside source domain boundary fanout At each sink One shifter per receiving instance (high fanout) automatic Tool decides Let synthesis tool choose optimal location",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Location Options",
          "snippet": "# INCOMPLETE: Strategy defined but not mapped set_level_shifter LS_CPU_OUT -domain PD_CPU \\ -applies_to outputs \\ -location self # COMPLETE: Add library cell mapping map_level_shifter_cell LS_CPU_OUT -domain PD_CPU \\ -lib_cells {LS_LH_1V0_1V2_X1}"
        }
      },
      {
        "title": "15. Parent Location",
        "content": "Use -location self by default—it's clearer for physical design and keeps voltage translation within the domain boundary. Use -location automatic if synthesis tools have better placement heuristics for your design.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Parent Location",
          "snippet": "# =================================================================== # Multi-Voltage SoC Exercise Solution # =================================================================== # CORE DOMAIN: 1.2V (high-speed) create_power_domain PD_CORE -include_scope create_supply_net VDD_1V2 -domain PD_CORE create_supply_net VSS -domain PD_CORE create_supply_set SS_1V2 \\ -function {power VDD_1V2} \\ -function {ground VSS} associate_supply_set SS_1V2 -handle PD_CORE add_power_state VDD_1V2 -state {ON 1.2} add_power_state VSS -state {ON 0.0} # CACHE DOMAIN: 1.0V (power-optimized) create_power_domain PD_CACHE -elements {l2_cache} create_supply_net VDD_1V0 -domain PD_CACHE create_supply_net VSS -domain PD_CACHE create_supply_set SS_1V0 \\ -function {power VDD_1V0} \\ -function {ground VSS} associate_supply_set SS_1V0 -handle PD_CACHE add_power_state VDD_1V0 -state {ACTIVE 1.0} # PERIPHERAL DOMAIN: 0.9V (low-power) create_power_domain PD_PERIPH -elements {periph_subsystem} create_supply_net VDD_0V9 -domain PD_PERIPH create_supply_net VSS -domain PD_PERIPH create_supply_set SS_0V9 \\ -function {power VDD_0V9} \\ -function {ground VSS} associate_supply_set SS_0V9 -handle PD_PERIPH add_power_state VDD_0V9 -state {ACTIVE 0.9} # LEVEL SHIFTER STRATEGIES # CACHE level shifters (1.0V ↔ 1.2V with CORE) set_level_shifter LS_CACHE_OUT -domain PD_CACHE \\ -applies_to outputs \\ -location self set_level_shifter LS_CACHE_IN -domain PD_CACHE \\ -applies_to inputs \\ -location parent # PERIPHERAL level shifters (0.9V ↔ 1.2V with CORE) set_level_shifter LS_PERIPH_OUT -domain PD_PERIPH \\ -applies_to outputs \\ -location self set_level_shifter LS_PERIPH_IN -domain PD_PERIPH \\ -applies_to inputs \\ -location parent # LIBRARY CELL MAPPING # Cache shifters (1.0V ↔ 1.2V) map_level_shifter_cell LS_CACHE_OUT -domain PD_CACHE \\ -lib_cells {LS_LH_1V0_1V2_X1 LS_LH_1V0_1V2_X2} map_level_shifter_cell LS_CACHE_IN -domain PD_CACHE \\ -lib_cells {LS_HL_1V2_1V0_X1 LS_HL_1V2_1V0_X2} # Peripheral shifters (0.9V ↔ 1.2V) map_level_shifter_cell LS_PERIPH_OUT -domain PD_PERIPH \\ -lib_cells {LS_LH_0V9_1V2_X1 LS_LH_0V9_1V2_X2} map_level_shifter_cell LS_PERIPH_IN -domain PD_PERIPH \\ -lib_cells {LS_HL_1V2_0V9_X1 LS_HL_1V2_0V9_X2} # =================================================================== # Note: If CACHE and PERIPH communicate directly (not through CORE), # additional level shifters needed for 1.0V ↔ 0.9V boundary # ==================================================================="
        }
      },
      {
        "title": "16. Defining Level Shifters for Multiple Domains",
        "content": "Each domain with voltage differences requires level shifter strategies. Quick Check Q: If two domains both operate at 1.0V (same voltage), do signals crossing between them need level shifters? Show Answer No. Level shifters are only required when signals cross between different voltage levels . Two domains at the same voltage (both 1.0V) can communicate directly without level shifters, even if they are separate power domains (e.g., one is power-gated and the other is always-on). However, isolation may still be needed if one domain can be powered off."
      },
      {
        "title": "17. Mapping Level Shifters to Library Cells",
        "content": "UPF level shifter strategies must be mapped to physical library cells during synthesis."
      },
      {
        "title": "18. Example",
        "content": "The -lib_cells specifies which level shifter cells from your technology library to use. Different cells are needed for: Low-to-high vs high-to-low conversion Different voltage combinations (1.0V→1.2V vs 0.9V→1.8V) Different drive strengths (X1, X2, X4) Level shifter cell names are technology-specific and come from your standard cell library. Consult your library documentation for available level shifter cells and their voltage ranges. Common naming: LS_LH (low-to-high), LS_HL (high-to-low), followed by voltage levels."
      },
      {
        "title": "19. Voltage Threshold for Conditional Level Shifting",
        "content": "The -threshold option controls when level shifters are inserted based on voltage difference."
      },
      {
        "title": "20. Example: Three Voltage Levels with Threshold",
        "content": "From Domain To Domain ΔV Threshold 0.2V Shifter Needed? 1.0V 1.1V 0.1V Below threshold No (direct connection) 1.0V 1.2V 0.2V At threshold Yes 1.0V 1.8V 0.8V Above threshold Yes Using threshold-based level shifting is risky. Small voltage differences (0.1-0.2V) may seem safe but can still cause timing issues, shoot-through current, and reliability concerns. Recommended practice: Use level shifters for any voltage difference, or set a very conservative threshold (e.g., 0.05V)."
      },
      {
        "title": "21. Common Beginner Mistakes",
        "content": "Mistake #1: Defining level shifters only for outputs, forgetting inputs Why? Voltage boundaries require level shifting in both directions . Signals going out (outputs) and coming in (inputs) both cross voltage thresholds. Mistake #2: Assuming same-voltage domains don't need any special handling Clarification: While same-voltage domains don't need level shifters, they may still need isolation if one can be power-gated. Level shifters handle voltage differences; isolation handles power-off conditions. Mistake #3: Not mapping level shifter strategies to library cells Why? UPF strategies are abstract. Synthesis needs map_level_shifter_cell to know which physical library cells to use for implementation."
      },
      {
        "title": "22. Practice Exercise",
        "content": "Challenge: Multi-Voltage SoC with Level Shifters Create a multi-voltage design with the following specifications: PD_CORE: High-speed CPU at 1.2V PD_CACHE: L2 cache at 1.0V (power-optimized) PD_PERIPH: Peripherals at 0.9V (low-power) All domains communicate, requiring level shifters between each pair. Write complete UPF including domains, supplies, states, and level shifter strategies with library cell mappings. Hint You need 3 domains, 3 supply nets (VDD_1V2, VDD_1V0, VDD_0V9), and 6 level shifter strategies (inputs + outputs for each domain). Map shifters to appropriate library cells for each voltage transition. Solution"
      },
      {
        "title": "23. Summary",
        "content": "In this tutorial, you learned: Multi-voltage design reduces power by 30-50% through quadratic voltage-power relationship (P ∝ V²), assigning optimal voltages to blocks Level shifters are required at all voltage boundaries to prevent logic errors, timing violations, and reliability issues set_level_shifter defines shifter strategies with -applies_to (inputs/outputs) and -location (placement) Both directions need shifters: low-to-high prevents logic errors, high-to-low prevents oxide stress map_level_shifter_cell connects UPF strategies to physical library cells for synthesis implementation Level shifter delay (2-5× buffer delay) impacts timing and must be considered in critical path analysis",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Multi Voltage Design",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Multi Voltage Design\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-multi-voltage-design",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "Why is a level shifter cell required when a signal crosses from a 0.8V domain to a 1.2V domain?",
      "options": [
        "To prevent the signal from arriving too early",
        "To prevent high leakage current (crowbar current) in the receiving gate caused by partial PMOS conduction",
        "Because Verilog does not allow different voltage nets",
        "To invert the logic polarity"
      ],
      "correctIndex": 1,
      "explanation": "A 0.8V high logic level cannot fully turn off a PMOS transistor connected to a 1.2V rail, causing both NMOS and PMOS to conduct simultaneously and creating massive crowbar leakage current."
    }
  },
  "upf-retention-strategies": {
    "id": "upf-retention-strategies",
    "badge": "Module 3 • Power Management Strategies",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Retention Strategies",
    "subtitle": "Comprehensive technical guide on upf retention strategies within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "![UPF Retention Register Architecture](/images/upf/upf-retention-register.svg)\n\nUnderstand state retention concepts and when retention is needed Define retention strategies using set_retention Specify retention supply and control signals Implement selective retention for critical state",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "set_retention strategy_name -domain domain_name \\ -retention_supply_set supply_set_name \\ [options]"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Retention Strategies defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. Understanding State Retention",
        "content": "State retention is a power management technique that preserves the contents of flip-flops during power domain shutoff, enabling fast wake-up without software re-initialization.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Understanding State Retention",
          "snippet": "set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -retention_condition {cpu_retention_enable}"
        }
      },
      {
        "title": "3. The State Loss Problem",
        "content": "When a power domain is gated off: This long wake latency makes power gating impractical for frequently-accessed blocks.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The State Loss Problem",
          "snippet": "set_retention RET_GPU -domain PD_GPU \\ -retention_supply_set SS_GPU_RET \\ -save_signal {gpu_save_state high} \\ -restore_signal {gpu_restore_state high}"
        }
      },
      {
        "title": "4. State Retention Solution",
        "content": "Retention flip-flops have dual power supplies: Primary Supply (VDD_domain): Normal operation power Retention Supply (VDD_RET): Always-on, low-voltage (0.6-0.8V) for state preservation Retention supply (VDD_RET) is always-on at minimal voltage (~0.6V) sufficient to preserve state but low enough to minimize leakage. This achieves near-power-gated leakage levels while enabling fast wake-up. Retention in Mobile Processors When a smartphone's display turns off, the application processor enters sleep mode with CPU cores power-gated. Without retention, waking up would require milliseconds of re-initialization (reloading OS state, cache configuration, etc.), creating noticeable lag. With retention, the processor wakes in 10-50 microseconds with all state intact, providing instant responsiveness when the user touches the screen. Quick Check Q: Why not just keep the entire domain at low voltage instead of using retention cells? Show Answer Retention cells only preserve flip-flop state , not combinational logic. Keeping the entire domain at low voltage (~0.6V) would maintain all leakage (combinational + sequential). Retention cells allow the domain to be completely powered off (zero combinational leakage) while preserving only critical state in special retention flip-flops, achieving optimal power savings.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: State Retention Solution",
          "snippet": "set_retention RET_CRITICAL -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -retention_condition {retention_en} \\ -elements {cpu_inst/control_regs cpu_inst/status_regs}"
        }
      },
      {
        "title": "5. When to Use Retention",
        "content": "Retention is beneficial when: Scenario Use Retention? Rationale Frequent power cycling Yes Fast wake-up justifies retention overhead Critical state to preserve Yes Re-initialization expensive or impossible Long sleep periods (hours) Maybe Retention leakage over time may exceed re-init cost Short sleep periods (< 1ms) Yes Re-init overhead dominates power savings Infrequent power-down No Simpler to re-initialize on rare wake events Retention is a tradeoff: faster wake-up and lower software complexity vs. additional area (retention cells) and non-zero retention supply power. Use retention for blocks that power-cycle frequently (multiple times per second) where wake latency matters.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: When to Use Retention",
          "snippet": "# =================================================================== # Power Domain with Retention # =================================================================== create_power_domain PD_CPU -elements {cpu_inst} # Supply nets create_supply_net VDD_CPU -domain PD_CPU # Primary (switchable) create_supply_net VDD_RET -domain PD_CPU # Retention (always-on) create_supply_net VSS -domain PD_CPU # Active supply set (normal operation) create_supply_set SS_CPU_ACTIVE \\ -function {power VDD_CPU} \\ -function {ground VSS} # Retention supply set (state preservation) create_supply_set SS_CPU_RET \\ -function {power VDD_RET} \\ -function {ground VSS} associate_supply_set SS_CPU_ACTIVE -handle PD_CPU # Power states add_power_state VDD_CPU \\ -state {ACTIVE 1.0} \\ -state {OFF off} add_power_state VDD_RET \\ -state {RETENTION 0.6} # Retention strategy set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -retention_condition {cpu_save_state} # =================================================================== # Behavior: # - Normal operation: FFs use VDD_CPU (1.0V) # - Power-down: cpu_save_state asserted → FFs switch to VDD_RET # - VDD_CPU turned off, retention cells hold state at 0.6V # - Power-up: VDD_CPU restored, cpu_save_state de-asserted # ==================================================================="
        }
      },
      {
        "title": "6. Retention Flip-Flop Cells",
        "content": "Retention flip-flops are special library cells with additional circuitry:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Retention Flip-Flop Cells",
          "snippet": "set_retention RET_GPU -domain PD_GPU \\ -retention_supply_set SS_GPU_RET \\ -retention_condition {gpu_retention_enable}"
        }
      },
      {
        "title": "7. Standard vs Retention Flip-Flop",
        "content": "Aspect Standard FF Retention FF Power Supplies VDD, VSS VDD, VDD_RET, VSS Control Signals CLK, D, RST CLK, D, RST, SAVE, RESTORE Area 1× baseline 1.3-1.5× (30-50% larger) Power (active) Baseline +5-10% (extra circuitry) Cost Baseline Higher (special cell) Common retention FF signals: SAVE/RESTORE (or RET_CTRL): Control signal to switch between VDD and VDD_RET VDD_RET: Retention supply port (always-on, low voltage) Retention cells have area and power overhead. Don't use retention for all flip-flops—only critical state that must be preserved. Non-critical state (can be re-initialized quickly) should use standard cells to minimize area.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Standard vs Retention Flip-Flop",
          "snippet": "set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -save_signal {cpu_save high} \\ -restore_signal {cpu_restore high}"
        }
      },
      {
        "title": "8. Syntax: set_retention",
        "content": "The set_retention command defines which flip-flops get retention and how retention is controlled.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Syntax: set_retention",
          "snippet": "# Active-high retention (retention when signal = 1) -retention_condition {ret_en} # Active-low retention (retention when signal = 0) -retention_condition {!ret_en_n} # Save on rising edge -save_signal {save high} # Restore on falling edge -restore_signal {restore low}"
        }
      },
      {
        "title": "9. Key Parameters",
        "content": "strategy_name - Unique identifier for retention strategy (required) -domain domain_name - Domain where retention is applied (required) -retention_supply_set set_name - Supply set for retention power (required) -retention_condition {expr} - Boolean expression controlling retention -save_signal {signal sense} - Signal to save state -restore_signal {signal sense} - Signal to restore state -elements {instance_list} - Specific instances to retain (optional, default = all FFs)",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Key Parameters",
          "snippet": "# Retain only control and status registers (not data path) set_retention RET_CRITICAL -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -retention_condition {retention_enable} \\ -elements { cpu_inst/control_unit/config_regs cpu_inst/control_unit/status_regs cpu_inst/mmu/tlb_state }"
        }
      },
      {
        "title": "10. Usage Variations",
        "content": "1. Basic Retention (All FFs in Domain): 2. Retention with Explicit Save/Restore: 3. Selective Retention (Specific Instances):",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Usage Variations",
          "snippet": "# =================================================================== # Complete Retention Implementation for CPU Domain # =================================================================== # TOP DOMAIN: Always-on create_power_domain PD_TOP -include_scope create_supply_net VDD_TOP -domain PD_TOP create_supply_net VSS -domain PD_TOP create_supply_set SS_TOP \\ -function {power VDD_TOP} \\ -function {ground VSS} associate_supply_set SS_TOP -handle PD_TOP add_power_state VDD_TOP -state {ON 1.2} # CPU DOMAIN: Power-gated with retention create_power_domain PD_CPU -elements {cpu_subsystem} # Supply nets: Primary (switchable) + Retention (always-on) create_supply_net VDD_CPU -domain PD_CPU create_supply_net VDD_CPU_RET -domain PD_CPU create_supply_net VSS -domain PD_CPU # Active mode supply set create_supply_set SS_CPU_ACTIVE \\ -function {power VDD_CPU} \\ -function {ground VSS} # Retention mode supply set create_supply_set SS_CPU_RET \\ -function {power VDD_CPU_RET} \\ -function {ground VSS} associate_supply_set SS_CPU_ACTIVE -handle PD_CPU # Power states add_power_state VDD_CPU \\ -state {ACTIVE 1.0} \\ -state {OFF off} add_power_state VDD_CPU_RET \\ -state {RETENTION 0.6} # Power switch create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {vin VDD_TOP} \\ -output_supply_port {vout VDD_CPU} \\ -control_port {ctrl cpu_power_enable} \\ -on_state {on vin {ctrl}} # Retention strategy set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -retention_condition {cpu_retention_enable} # =================================================================== # Power-Down Sequence: # 1. Software prepares for sleep # 2. Assert cpu_retention_enable (FFs switch to VDD_CPU_RET) # 3. De-assert cpu_power_enable (VDD_CPU turns off) # 4. CPU domain off, state preserved in retention cells # # Power-Up Sequence: # 1. Assert cpu_power_enable (VDD_CPU restores to 1.0V) # 2. Wait for VDD_CPU stable # 3. De-assert cpu_retention_enable (FFs switch back to VDD_CPU) # 4. Release reset, CPU resumes with preserved state # ==================================================================="
        }
      },
      {
        "title": "11. Defining Retention Supply Sets",
        "content": "Retention requires a separate supply set with always-on retention supply. Retention Supply Voltage Retention voltage is process-dependent, typically 0.6-0.8V at 28nm and below. This voltage must be: (1) High enough to prevent data loss in retention cells (minimum retention voltage ~0.5-0.6V), (2) Low enough to minimize leakage during retention (each 100mV increases leakage ~2-3×). Technology libraries specify safe retention voltage range; stay within this range for reliable operation.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Defining Retention Supply Sets",
          "snippet": "map_retention_cell strategy_name -domain domain_name \\ -lib_cells {cell_list}"
        }
      },
      {
        "title": "12. Retention Control Signals",
        "content": "Retention requires control signals to trigger save/restore operations.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Retention Control Signals",
          "snippet": "# Map retention strategy to library retention flip-flops map_retention_cell RET_CPU -domain PD_CPU \\ -lib_cells { DFFR_X1 # Standard drive strength DFFR_X2 # 2× drive strength DFFR_X4 # 4× drive strength }"
        }
      },
      {
        "title": "13. Using -retention_condition",
        "content": "Simple retention control with a single signal: Behavior: gpu_retention_enable = 1 : Retention active (FFs use VDD_RET) gpu_retention_enable = 0 : Normal operation (FFs use VDD_GPU)",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Using -retention_condition",
          "snippet": "# WRONG: No retention supply set defined set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ # SS_CPU_RET doesn't exist -retention_condition {ret_en} # CORRECT: Create retention supply set first create_supply_set SS_CPU_RET \\ -function {power VDD_CPU_RET} \\ -function {ground VSS} set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -retention_condition {ret_en}"
        }
      },
      {
        "title": "14. Using -save_signal and -restore_signal",
        "content": "Explicit save and restore control: Power-Down Sequence: Assert cpu_save (high) → Retention cells save state to VDD_RET Power down VDD_CPU Power-Up Sequence: Power up VDD_CPU Assert cpu_restore (high) → Retention cells restore state from VDD_RET De-assert cpu_restore The -save_signal and -restore_signal approach provides explicit control over retention timing, useful for complex power sequencing. The simpler -retention_condition is sufficient for most designs.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Using -save_signal and -restore_signal",
          "snippet": "# WRONG: Retention supply set uses switchable VDD_CPU create_supply_set SS_CPU_RET \\ -function {power VDD_CPU} \\ # This will be turned off! -function {ground VSS} # CORRECT: Use always-on retention supply create_supply_set SS_CPU_RET \\ -function {power VDD_CPU_RET} \\ # Always-on, separate supply -function {ground VSS}"
        }
      },
      {
        "title": "15. Signal Sense (high/low)",
        "content": "The sense parameter specifies active polarity: Quick Check Q: What happens if you forget to assert retention control before powering down? Show Answer If retention control is not asserted before power-down, retention cells won't switch to VDD_RET. When VDD_CPU turns off, the retention cells lose power along with the rest of the domain, and all state is lost (same as non-retention power gating). Proper power sequencing—assert retention before power-down—is critical for retention to work.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Signal Sense (high/low)",
          "snippet": "# =================================================================== # GPU Domain with Selective Retention # =================================================================== # TOP DOMAIN (always-on, for context) create_power_domain PD_TOP -include_scope create_supply_net VDD_TOP -domain PD_TOP create_supply_net VSS -domain PD_TOP create_supply_set SS_TOP \\ -function {power VDD_TOP} \\ -function {ground VSS} associate_supply_set SS_TOP -handle PD_TOP add_power_state VDD_TOP -state {ON 1.2} # GPU DOMAIN with selective retention create_power_domain PD_GPU -elements {gpu_inst} # Supply nets create_supply_net VDD_GPU -domain PD_GPU create_supply_net VDD_GPU_RET -domain PD_GPU create_supply_net VSS -domain PD_GPU # Active supply set create_supply_set SS_GPU_ACTIVE \\ -function {power VDD_GPU} \\ -function {ground VSS} # Retention supply set create_supply_set SS_GPU_RET \\ -function {power VDD_GPU_RET} \\ -function {ground VSS} associate_supply_set SS_GPU_ACTIVE -handle PD_GPU # Power states add_power_state VDD_GPU \\ -state {ACTIVE 0.9} \\ -state {OFF off} add_power_state VDD_GPU_RET \\ -state {RETENTION 0.6} add_power_state VSS -state {ON 0.0} # Power switch create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {vin VDD_TOP} \\ -output_supply_port {vout VDD_GPU} \\ -control_port {ctrl gpu_power_enable} \\ -on_state {on vin {ctrl}} # Selective retention strategy (only critical state) set_retention RET_GPU_CRITICAL -domain PD_GPU \\ -retention_supply_set SS_GPU_RET \\ -retention_condition {gpu_retention_enable} \\ -elements { gpu_inst/config_regs gpu_inst/shader_state } # =================================================================== # Notes: # - Only config_regs and shader_state preserved during power-down # - Other GPU state (shader ALU registers, temporary buffers) lost # - Software must re-initialize non-retained state on wake # - Area/power overhead minimized by selective retention # ==================================================================="
        }
      },
      {
        "title": "16. Selective Retention",
        "content": "Retain only critical state to minimize area and retention supply power."
      },
      {
        "title": "17. Retain Specific Instances",
        "content": "Benefits: Lower area (fewer retention cells) Lower retention power (less leakage on VDD_RET) Faster synthesis (less cell replacement) Considerations: Non-retained state must be re-initialized on wake Requires careful analysis of which state is critical Software must handle partial retention correctly Common candidates for selective retention: Control registers, cache tag arrays, TLB entries, power management state. Don't retain: Data path registers (ALU operands), temporary variables, re-computable state. Analyze software re-initialization cost vs. retention area/power tradeoff."
      },
      {
        "title": "18. Retention Cell Mapping",
        "content": "During synthesis, UPF retention strategies are mapped to library cells."
      },
      {
        "title": "19. Example",
        "content": "Synthesis tools will replace standard D flip-flops (DFF) with retention variants (DFFR) based on the UPF strategy and library cell availability. Retention cell names are technology-specific. Common naming patterns: DFFR (D Flip-Flop with Retention), SDFFR (Scannable DFF with Retention), DFFSR (DFF with Set/Reset and Retention). Consult your library documentation for available cells."
      },
      {
        "title": "20. Retention vs Re-Initialization Tradeoff",
        "content": "Deciding whether to use retention requires analyzing the tradeoff:"
      },
      {
        "title": "21. Retention Benefits",
        "content": "Fast wake-up (microseconds vs milliseconds) Lower software complexity (no re-init code) Better responsiveness for interactive systems"
      },
      {
        "title": "22. Retention Costs",
        "content": "Area overhead: 30-50% per retention FF Always-on retention supply (non-zero power) Additional control logic and sequencing Design/verification complexity"
      },
      {
        "title": "23. Break-Even Analysis",
        "content": "For blocks that sleep >99% of the time with frequent wake events (e.g., sensor hubs in smartphones), retention is almost always worthwhile. For blocks that sleep rarely or for very long periods (hours), simple re-initialization may be more efficient."
      },
      {
        "title": "24. Common Beginner Mistakes",
        "content": "Mistake #1: Forgetting to create retention supply set Why? Retention cells need a separate supply set with always-on retention supply (VDD_RET). This supply set must exist before referencing it in set_retention . Mistake #2: Using switchable supply for retention Why? Retention supply must remain on during power-down. If you use the main domain supply (VDD_CPU) for retention, state is lost when that supply is gated off. Mistake #3: Retaining all FFs unnecessarily Problem: Using retention for all flip-flops wastes area and power. Solution: Analyze which state is critical and use selective retention ( -elements ) for only necessary registers. Let non-critical state be re-initialized on wake."
      },
      {
        "title": "25. Practice Exercise",
        "content": "Challenge: Implement Retention for GPU Domain Create UPF for a GPU domain with selective retention: Primary supply: VDD_GPU (0.9V, switchable) Retention supply: VDD_GPU_RET (0.6V, always-on) Retain only: gpu_inst/config_regs and gpu_inst/shader_state Control: gpu_retention_enable (active-high) Write complete UPF including domains, supplies, states, power switch, and retention strategy. Hint You need 2 supply sets (SS_GPU_ACTIVE and SS_GPU_RET), 2 power states for VDD_GPU (ACTIVE and OFF), 1 state for VDD_GPU_RET (RETENTION), a power switch, and a set_retention with -elements for selective retention. Solution"
      },
      {
        "title": "26. Summary",
        "content": "In this tutorial, you learned: State retention preserves flip-flop contents during power-down using always-on low-voltage retention supply, enabling fast wake-up (µs vs ms) set_retention defines retention strategies with -retention_supply_set (always-on supply) and -retention_condition (control signal) Retention cells have 30-50% area overhead and require dual supplies (VDD_domain for active, VDD_RET ~0.6V for retention) Selective retention with -elements retains only critical state, minimizing area and retention supply power Retention is worthwhile for frequently-cycled domains where fast wake-up justifies overhead, not for infrequent or very long sleep periods Proper power sequencing critical: assert retention before power-down, de-assert after power-up and stable supply",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Retention Strategies",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Retention Strategies\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-retention-strategies",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "Where does a retention register store its state during a power shutoff event?",
      "options": [
        "In external DRAM memory",
        "In an always-on shadow balloon latch powered by a continuous auxiliary supply",
        "On the gate capacitance of standard CMOS inverters",
        "In a file on the host computer"
      ],
      "correctIndex": 1,
      "explanation": "Retention flip-flops contain a low-leakage shadow 'balloon' latch powered by an always-on supply rail (VDD_AON) that preserves register state while the main core is unpowered."
    }
  },
  "upf-isolation-strategies": {
    "id": "upf-isolation-strategies",
    "badge": "Module 3 • Power Management Strategies",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Isolation Strategies",
    "subtitle": "Comprehensive technical guide on upf isolation strategies within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "![UPF Isolation Cell Operation](/images/upf/upf-isolation-cell.svg)\n\nUnderstand the X-propagation problem and why isolation is required Define isolation strategies using set_isolation Specify isolation control signals and clamp values Choose appropriate isolation cell locations and supply sets",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "set_isolation strategy_name -domain domain_name \\ -isolation_supply_set supply_set_name \\ -clamp_value {0|1} \\ [options]"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Isolation Strategies defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. Understanding the X-Propagation Problem",
        "content": "When a power domain is gated off, all logic in that domain loses power and its outputs become undefined (X in simulation, floating voltage in silicon).",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Understanding the X-Propagation Problem",
          "snippet": "set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal iso_gpu_enable \\ -isolation_sense high"
        }
      },
      {
        "title": "3. The Problem Without Isolation",
        "content": "Consequences of X-propagation: Functional Errors: Unknown values corrupt always-on logic computations Shoot-Through Current: Intermediate voltages cause both PMOS and NMOS to conduct simultaneously, wasting power Metastability: Flip-flops receiving X may oscillate or take unpredictable values Simulation Mismatches: X-propagation in simulation doesn't match silicon behavior Without isolation, power gating is unsafe. Even if the unpowered domain is functionally \"disconnected\" by software, physical signal connections remain and X-values will propagate, potentially crashing the system or causing data corruption. Real Silicon Failures from Missing Isolation A mobile SoC taped out without proper isolation on a power-gated GPU domain. When the GPU was powered down, floating outputs propagated into the memory controller, causing random bit flips in cache coherency logic. The chip passed simulation (X-propagation detected) but failed in silicon with mysterious crashes during GPU sleep. The fix required a respin with proper isolation cells, costing months of schedule and millions in engineering costs.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The Problem Without Isolation",
          "snippet": "set_isolation ISO_CPU -domain PD_CPU \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal iso_cpu \\ -isolation_sense high \\ -location parent"
        }
      },
      {
        "title": "4. Isolation Cell Fundamentals",
        "content": "An isolation cell is a combinational cell that: Passes signals normally when isolation is disabled Clamps outputs to a known value (0 or 1) when isolation is enabled Uses always-on supply (not the gated domain supply)",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Isolation Cell Fundamentals",
          "snippet": "set_isolation ISO_INPUT -domain PD_DSP \\ -isolation_supply_set SS_TOP \\ -clamp_value 1 \\ -isolation_signal iso_dsp \\ -isolation_sense high \\ -applies_to to"
        }
      },
      {
        "title": "5. Common Isolation Cell Types",
        "content": "Cell Type Logic Function Clamp Value ISO_AND_0 out = in AND !iso Clamps to 0 when isolated ISO_OR_1 out = in OR iso Clamps to 1 when isolated ISO_AND_1 out = in AND iso_n Clamps to 0 (active-low enable) ISO_OR_0 out = in OR !iso_n Clamps to 1 (active-low enable) Isolation cells are powered by the always-on domain supply (e.g., VDD_TOP), not the gated domain supply. This ensures they remain functional to clamp outputs even when the source domain is unpowered. Quick Check Q: Why must isolation cells be powered by the always-on supply? Show Answer If isolation cells were powered by the gated domain supply (VDD_GPU), they would lose power when the domain is gated off, defeating their purpose. Isolation cells must remain operational during power-down to actively drive the clamp value (0 or 1) to prevent X-propagation. Therefore, they use the always-on supply (VDD_TOP) from the parent/destination domain.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Isolation Cell Types",
          "snippet": "set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal iso_gpu \\ -isolation_sense high"
        }
      },
      {
        "title": "6. When to Use Isolation",
        "content": "Isolation is required when: Scenario Isolation Needed? Reason Power-gated domain outputs Always YES Prevent X when domain is OFF Same-voltage, both always-on No No power-off condition Multi-voltage (both powered) No (use level shifters) Level shifters handle voltage, not isolation Power-gated + multi-voltage YES (both isolation + LS) Need isolation AND level shifting Rule of thumb: Any domain that can be powered OFF requires isolation at its outputs. If the domain is always-on (never gated), isolation is not needed. Multi-voltage alone doesn't require isolation—only power gating does.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: When to Use Isolation",
          "snippet": "set_isolation ISO_MODEM -domain PD_MODEM \\ -isolation_supply_set SS_TOP \\ -clamp_value 1 \\ -isolation_signal iso_modem \\ -isolation_sense high"
        }
      },
      {
        "title": "7. Syntax: set_isolation",
        "content": "The set_isolation command defines isolation strategies for power domain boundaries.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Syntax: set_isolation",
          "snippet": "set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal iso_gpu_enable \\ -isolation_sense high"
        }
      },
      {
        "title": "8. Key Parameters",
        "content": "strategy_name - Unique identifier for isolation strategy (required) -domain domain_name - Domain being isolated (required) -isolation_supply_set set_name - Supply set for isolation cells (required, must be always-on) -clamp_value {0|1} - Value to clamp when isolated (required) -isolation_signal signal_name - Control signal (required) -isolation_sense {high|low} - Signal polarity (active-high or active-low) -location {self|parent|fanout} - Where to place isolation cells -applies_to {from|to|both} - Signal direction (outputs, inputs, or both)",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Key Parameters",
          "snippet": "set_isolation ISO_CPU -domain PD_CPU \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal iso_cpu_n \\ -isolation_sense low"
        }
      },
      {
        "title": "9. Usage Variations",
        "content": "1. Basic Isolation (Clamp to 0): 2. Isolation with Location: 3. Isolation on Inputs (Rare):",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Usage Variations",
          "snippet": "set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal iso_gpu \\ -isolation_sense high \\ -location parent"
        }
      },
      {
        "title": "10. Choosing Clamp Value",
        "content": "The -clamp_value determines the safe logic level when isolation is active.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Choosing Clamp Value",
          "snippet": "# =================================================================== # Complete Power Gating with Isolation # =================================================================== # TOP DOMAIN: Always-on create_power_domain PD_TOP -include_scope create_supply_net VDD_TOP -domain PD_TOP create_supply_net VSS -domain PD_TOP create_supply_set SS_TOP \\ -function {power VDD_TOP} \\ -function {ground VSS} associate_supply_set SS_TOP -handle PD_TOP add_power_state VDD_TOP -state {ON 1.2} # GPU DOMAIN: Power-gated (no retention) create_power_domain PD_GPU -elements {gpu_inst} create_supply_net VDD_GPU -domain PD_GPU create_supply_net VSS -domain PD_GPU create_supply_set SS_GPU \\ -function {power VDD_GPU} \\ -function {ground VSS} associate_supply_set SS_GPU -handle PD_GPU add_power_state VDD_GPU \\ -state {ACTIVE 0.9} \\ -state {OFF off} # Power switch create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {vin VDD_TOP} \\ -output_supply_port {vout VDD_GPU} \\ -control_port {ctrl gpu_power_enable} \\ -on_state {on vin {ctrl}} # Isolation strategy set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal gpu_iso_enable \\ -isolation_sense high \\ -location parent # =================================================================== # Power-Down Sequence: # 1. Assert gpu_iso_enable = 1 (activate isolation, clamp to 0) # 2. De-assert gpu_power_enable = 0 (turn off power switch) # 3. VDD_GPU = OFF, GPU outputs safely clamped by isolation cells # # Power-Up Sequence: # 1. Assert gpu_power_enable = 1 (turn on power switch) # 2. Wait for VDD_GPU stable at 0.9V # 3. Release reset to GPU # 4. De-assert gpu_iso_enable = 0 (disable isolation, pass signals) # 5. GPU fully operational # ==================================================================="
        }
      },
      {
        "title": "11. Clamp to 0 (Most Common)",
        "content": "Use when: Receiving logic interprets 0 as inactive/safe state Enable signals (active-high) should be disabled (0 = off) Data signals where 0 is safe default",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Clamp to 0 (Most Common)",
          "snippet": "map_isolation_cell strategy_name -domain domain_name \\ -lib_cells {cell_list}"
        }
      },
      {
        "title": "12. Clamp to 1",
        "content": "Use when: Receiving logic needs 1 for safe state Active-low signals (e.g., reset_n) should be asserted (1 = inactive) Protocol requires 1 for idle state",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Clamp to 1",
          "snippet": "# Map isolation strategy to AND-based isolation cells (clamp to 0) map_isolation_cell ISO_GPU -domain PD_GPU \\ -lib_cells { ISO_AND_0_X1 # Standard drive ISO_AND_0_X2 # 2× drive ISO_AND_0_X4 # 4× drive } # Map strategy with clamp to 1 to OR-based cells map_isolation_cell ISO_MODEM -domain PD_MODEM \\ -lib_cells { ISO_OR_1_X1 ISO_OR_1_X2 }"
        }
      },
      {
        "title": "13. Signal-Specific Clamp Values",
        "content": "Different signals may need different clamp values: Signal Type Recommended Clamp Reason Enable (active-high) 0 Disable when source is off Enable (active-low) 1 Disable (inactive high) Reset_n (active-low) 1 Keep out of reset Data bus 0 All-zeros is safe default Valid/Ready 0 Not valid, not ready Choosing the wrong clamp value can cause functional errors even with isolation in place. Analyze receiving logic to determine safe values. When in doubt, use 0 for most signals, but verify with design requirements.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Signal-Specific Clamp Values",
          "snippet": "# =================================================================== # Power Gating with Retention AND Isolation # =================================================================== create_power_domain PD_CPU -elements {cpu_inst} # Supplies create_supply_net VDD_CPU -domain PD_CPU create_supply_net VDD_CPU_RET -domain PD_CPU create_supply_net VSS -domain PD_CPU # Supply sets create_supply_set SS_CPU_ACTIVE \\ -function {power VDD_CPU} \\ -function {ground VSS} create_supply_set SS_CPU_RET \\ -function {power VDD_CPU_RET} \\ -function {ground VSS} associate_supply_set SS_CPU_ACTIVE -handle PD_CPU # Power states add_power_state VDD_CPU -state {ACTIVE 1.0} -state {OFF off} add_power_state VDD_CPU_RET -state {RETENTION 0.6} # Power switch create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {vin VDD_TOP} \\ -output_supply_port {vout VDD_CPU} \\ -control_port {ctrl cpu_power_enable} \\ -on_state {on vin {ctrl}} # Retention strategy set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -retention_condition {cpu_retention_enable} # Isolation strategy set_isolation ISO_CPU -domain PD_CPU \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal cpu_iso_enable \\ -isolation_sense high \\ -location parent # =================================================================== # Power-Down Sequence (with retention): # 1. Assert cpu_retention_enable (save state to VDD_CPU_RET) # 2. Assert cpu_iso_enable (activate isolation) # 3. De-assert cpu_power_enable (turn off VDD_CPU) # 4. CPU off, state retained, outputs isolated # # Power-Up Sequence: # 1. Assert cpu_power_enable (restore VDD_CPU) # 2. De-assert cpu_retention_enable (switch FFs back to VDD_CPU) # 3. De-assert cpu_iso_enable (disable isolation) # 4. CPU operational with retained state # ==================================================================="
        }
      },
      {
        "title": "14. Isolation Control Signals",
        "content": "The -isolation_signal and -isolation_sense control when isolation is active.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Isolation Control Signals",
          "snippet": "# WRONG: Isolation cells use gated supply (will lose power!) set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_GPU \\ # GPU supply gets turned off! -clamp_value 0 \\ -isolation_signal iso_gpu \\ -isolation_sense high # CORRECT: Use always-on supply from parent/top domain set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ # Always-on supply -clamp_value 0 \\ -isolation_signal iso_gpu \\ -isolation_sense high"
        }
      },
      {
        "title": "15. Active-High Isolation (isolation_sense high)",
        "content": "Behavior: iso_gpu_enable = 0 : Isolation disabled (signals pass through) iso_gpu_enable = 1 : Isolation active (outputs clamped to 0)",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Active-High Isolation (isolation_sense h",
          "snippet": "# Consider an active-low reset signal: reset_n # WRONG: Clamping to 0 puts receiving logic in reset set_isolation ISO_BAD -domain PD_PERIPH \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ # This asserts reset! (reset_n = 0 = active) -isolation_signal iso \\ -isolation_sense high # CORRECT: Clamp to 1 to keep receiving logic out of reset set_isolation ISO_GOOD -domain PD_PERIPH \\ -isolation_supply_set SS_TOP \\ -clamp_value 1 \\ # reset_n = 1 = inactive (not in reset) -isolation_signal iso \\ -isolation_sense high"
        }
      },
      {
        "title": "16. Active-Low Isolation (isolation_sense low)",
        "content": "Behavior: iso_cpu_n = 1 : Isolation disabled (signals pass through) iso_cpu_n = 0 : Isolation active (outputs clamped to 0)",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Active-Low Isolation (isolation_sense lo",
          "snippet": "# =================================================================== # Complete Power Gating: DSP with Retention and Isolation # =================================================================== # TOP DOMAIN (always-on context) create_power_domain PD_TOP -include_scope create_supply_net VDD_TOP -domain PD_TOP create_supply_net VSS -domain PD_TOP create_supply_set SS_TOP \\ -function {power VDD_TOP} \\ -function {ground VSS} associate_supply_set SS_TOP -handle PD_TOP add_power_state VDD_TOP -state {ON 1.2} # DSP DOMAIN with retention and isolation create_power_domain PD_DSP -elements {dsp_engine} # Supply nets create_supply_net VDD_DSP -domain PD_DSP create_supply_net VDD_DSP_RET -domain PD_DSP create_supply_net VSS -domain PD_DSP # Active supply set create_supply_set SS_DSP_ACTIVE \\ -function {power VDD_DSP} \\ -function {ground VSS} # Retention supply set create_supply_set SS_DSP_RET \\ -function {power VDD_DSP_RET} \\ -function {ground VSS} associate_supply_set SS_DSP_ACTIVE -handle PD_DSP # Power states add_power_state VDD_DSP \\ -state {ACTIVE 0.9} \\ -state {OFF off} add_power_state VDD_DSP_RET \\ -state {RETENTION 0.6} add_power_state VSS -state {ON 0.0} # Power switch create_power_switch PSW_DSP -domain PD_DSP \\ -input_supply_port {vin VDD_TOP} \\ -output_supply_port {vout VDD_DSP} \\ -control_port {ctrl dsp_power_enable} \\ -on_state {on vin {ctrl}} # Retention strategy set_retention RET_DSP -domain PD_DSP \\ -retention_supply_set SS_DSP_RET \\ -retention_condition {dsp_retention_enable} # Isolation strategy set_isolation ISO_DSP -domain PD_DSP \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal dsp_iso_enable \\ -isolation_sense high \\ -location parent # =================================================================== # Complete Power Sequencing: # # Power-Down: # 1. dsp_retention_enable = 1 (save state) # 2. dsp_iso_enable = 1 (activate isolation, clamp to 0) # 3. dsp_power_enable = 0 (turn off VDD_DSP) # 4. DSP off, state retained, outputs isolated # # Power-Up: # 1. dsp_power_enable = 1 (restore VDD_DSP to 0.9V) # 2. Wait for VDD_DSP stable # 3. Release DSP reset # 4. dsp_retention_enable = 0 (restore state) # 5. dsp_iso_enable = 0 (disable isolation, pass signals) # 6. DSP fully operational # ==================================================================="
        }
      },
      {
        "title": "17. Power Sequencing with Isolation",
        "content": "Proper isolation timing is critical: Isolation must be asserted before power-down and de-asserted after power-up and reset release. This ensures outputs are clamped to safe values during the entire period when the domain is unpowered or resetting. Quick Check Q: What happens if you power down a domain without asserting isolation first? Show Answer If power is removed before isolation is asserted, there's a brief window where outputs transition from valid logic levels through intermediate voltages to undefined/floating. During this transition, X-values propagate to always-on logic before isolation cells can clamp them. This can corrupt state in receiving logic, exactly the problem isolation is meant to prevent. Always assert isolation before initiating power-down."
      },
      {
        "title": "18. Isolation Cell Location",
        "content": "The -location option controls where isolation cells are placed."
      },
      {
        "title": "19. Location Options",
        "content": "Location Placement Use Case self Inside gated domain At output of source domain (less common) parent In always-on domain Outside gated domain boundary (most common) fanout At each sink One isolation cell per receiving instance"
      },
      {
        "title": "20. Parent Location (Recommended)",
        "content": "Benefits: Isolation cells remain powered when domain is off Cleaner physical design (isolation at domain boundary) Standard approach for most designs Use -location parent as default for isolation. This ensures isolation cells are in the always-on domain where they can function during power-down. Only use -location self if you have specific physical design constraints requiring isolation inside the gated domain."
      },
      {
        "title": "21. Complete Isolation Example",
        "content": "Isolation Cell Overhead A typical GPU with 2000 output signals to always-on logic requires 2000 isolation cells. At ~5% area per cell relative to a flip-flop, isolation adds approximately 1-2% to overall GPU area. This modest overhead is essential for safe power gating—without isolation, power gating would corrupt system state and be unusable. The power savings from gating (90%+ reduction in GPU leakage) far outweighs the isolation cell area cost."
      },
      {
        "title": "22. Mapping Isolation Cells to Library",
        "content": "UPF isolation strategies are mapped to physical library cells during synthesis."
      },
      {
        "title": "23. Example",
        "content": "Synthesis tools select appropriate drive strengths based on fanout and timing requirements. Isolation cell naming is technology-specific. Common patterns: ISO_AND_0 (AND-based, clamps to 0), ISO_OR_1 (OR-based, clamps to 1), with drive strength suffixes (_X1, _X2, _X4). Consult your standard cell library for available isolation cells."
      },
      {
        "title": "24. Isolation Combined with Retention",
        "content": "Power-gated domains with retention need both isolation and retention strategies."
      },
      {
        "title": "25. Common Beginner Mistakes",
        "content": "Mistake #1: Using gated domain supply for isolation cells Why? Isolation cells must remain powered to clamp outputs when the source domain is off. Using the gated domain supply defeats the purpose—the isolation cells would lose power along with the domain. Mistake #2: De-asserting isolation before power is stable Problem: Disabling isolation while domain is still powering up allows X-propagation during the power-up transient. Solution: Power-up sequence must be: (1) Enable power, (2) Wait for stable VDD, (3) Release reset, (4) Disable isolation. Never disable isolation before power and reset are stable. Mistake #3: Choosing wrong clamp value Why? The safe clamp value depends on signal polarity. Active-high enables should clamp to 0 (disabled), active-low signals should clamp to 1 (inactive high). Analyze each signal individually."
      },
      {
        "title": "26. Practice Exercise",
        "content": "Challenge: Implement Complete Power Gating Create UPF for a DSP domain with power gating, retention, and isolation: Primary supply: VDD_DSP (0.9V, switchable) Retention supply: VDD_DSP_RET (0.6V, always-on) Isolation: Clamp to 0, active-high control (dsp_iso_enable) Retention control: dsp_retention_enable (active-high) Power control: dsp_power_enable Write complete UPF including power switch, retention strategy, and isolation strategy. Hint You need power switch (VDD_TOP → VDD_DSP), retention strategy using SS_DSP_RET, and isolation strategy using SS_TOP (always-on supply for isolation cells). Remember proper supply set associations and power states. Solution"
      },
      {
        "title": "27. Summary",
        "content": "In this tutorial, you learned: Isolation prevents X-propagation from power-gated domains by clamping outputs to known values (0 or 1) using always-on isolation cells set_isolation defines isolation strategies with -isolation_supply_set (always-on), -clamp_value (0 or 1), and control signals Isolation cells must be powered by always-on supply (parent domain) to remain functional during source domain power-down Clamp value choice is signal-specific: active-high enables → 0, active-low signals → 1, analyze receiving logic requirements Proper sequencing critical: assert isolation before power-down, de-assert after power-up and reset release Isolation combined with retention enables safe power gating with fast wake-up for frequently-cycled domains",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Isolation Strategies",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Isolation Strategies\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-isolation-strategies",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What is the primary purpose of an isolation cell in a low-power design?",
      "options": [
        "To speed up clock distribution",
        "To prevent floating/unknown (X) signals from an unpowered domain from corrupting active domains",
        "To boost voltage from 0.8V to 1.8V",
        "To encrypt data during power-down"
      ],
      "correctIndex": 1,
      "explanation": "When a domain powers down, its outputs float to intermediate voltages or 'X'. Isolation cells clamp these boundary nets to a known legal logic level (clamp-0 or clamp-1) to protect active receiving logic."
    }
  },
  "upf-advanced-level-shifters": {
    "id": "upf-advanced-level-shifters",
    "badge": "Module 3 • Power Management Strategies",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "UPF Advanced Level Shifters",
    "subtitle": "Comprehensive technical guide on upf advanced level shifters within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "![IEEE 1801 UPF Level Shifter Operation](/images/upf/upf-level-shifter.svg)\n\nImplement automatic vs explicit level shifter insertion strategies Optimize level shifter placement for timing and power Handle bidirectional signals and special cases Apply advanced mapping and cell selection techniques",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# Automatic mode: Tool infers where shifters are needed set_level_shifter LS_AUTO -domain PD_CPU \\ -applies_to outputs \\ -location automatic"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Advanced Level Shifters defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. Automatic vs Explicit Level Shifter Insertion",
        "content": "UPF provides two approaches to level shifter insertion: automatic (tool-inferred) and explicit (designer-controlled).",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Automatic vs Explicit Level Shifter Inse",
          "snippet": "# Explicit mode: Designer controls placement set_level_shifter LS_CPU_OUT -domain PD_CPU \\ -applies_to outputs \\ -location self \\ # Specific placement -rule low_to_high # Specific direction"
        }
      },
      {
        "title": "3. Automatic Level Shifter Insertion",
        "content": "With automatic insertion, synthesis tools detect voltage boundaries and insert level shifters based on UPF supply definitions: How it works: Tool analyzes supply voltage for each domain Detects signals crossing between different voltage levels Automatically inserts level shifters at crossings Chooses placement based on built-in heuristics Benefits: Simpler UPF (minimal designer effort) Tool handles complexity of large designs Automatic updates if netlist changes Drawbacks: Less control over placement May not optimize for critical timing paths Tool-dependent behavior",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Automatic Level Shifter Insertion",
          "snippet": "set_level_shifter LS_CPU_SELF -domain PD_CPU \\ -applies_to outputs \\ -location self"
        }
      },
      {
        "title": "4. Explicit Level Shifter Insertion",
        "content": "With explicit insertion, designer specifies exact placement strategy: Benefits: Precise control over placement Can optimize critical paths Predictable behavior across tools Drawbacks: More UPF code to maintain Designer must understand all voltage crossings Requires updates if design changes Use automatic insertion for initial design exploration and non-critical paths. Switch to explicit insertion for timing-critical signals or when you need precise control over level shifter placement. Hybrid Approach in Production Large SoCs typically use a hybrid strategy: automatic insertion for the bulk of signals (thousands of voltage crossings), with explicit overrides for critical paths like high-speed interfaces, clock domain crossings, and performance-sensitive control signals. This balances designer productivity with timing optimization.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Explicit Level Shifter Insertion",
          "snippet": "set_level_shifter LS_CPU_PARENT -domain PD_CPU \\ -applies_to outputs \\ -location parent"
        }
      },
      {
        "title": "5. Advanced Placement Strategies",
        "content": "Level shifter placement significantly impacts timing, power, and routability.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Advanced Placement Strategies",
          "snippet": "set_level_shifter LS_HIGH_FANOUT -domain PD_CPU \\ -applies_to outputs \\ -location fanout"
        }
      },
      {
        "title": "6. Self Placement (Source Domain)",
        "content": "When to use: Source domain has slack (not timing-critical) Minimize routing distance in destination domain Source domain has available area",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Self Placement (Source Domain)",
          "snippet": "# Only low-to-high transitions (1.0V → 1.2V) set_level_shifter LS_L2H -domain PD_CPU \\ -applies_to outputs \\ -rule low_to_high \\ -location self # Only high-to-low transitions (1.2V → 1.0V) set_level_shifter LS_H2L -domain PD_IO \\ -applies_to outputs \\ -rule high_to_low \\ -location self"
        }
      },
      {
        "title": "7. Parent Placement (Destination Domain)",
        "content": "When to use: Destination domain has timing slack Source domain is area-constrained Better for isolation (shifter in always-on domain)",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Parent Placement (Destination Domain)",
          "snippet": "# Both directions (default behavior) set_level_shifter LS_BOTH -domain PD_CPU \\ -applies_to both \\ -rule both \\ -location automatic"
        }
      },
      {
        "title": "8. Fanout Placement (At Each Sink)",
        "content": "When to use: Signal has very high fanout (>20 sinks) Individual path timing optimization needed Minimize loading on source driver Tradeoff: More area (multiple shifters) but better timing and drive strength per path. Fanout placement creates one level shifter per sink, significantly increasing area. Use only when high fanout causes timing issues with single shifter approaches. For most signals, self or parent placement suffices. Quick Check Q: A critical signal crosses from 1.0V to 1.2V domain with 2ns timing margin in source and 0.1ns margin in destination. Where should the level shifter be placed? Show Answer Place the level shifter in the source domain (self) . The source has 2ns slack to absorb the level shifter delay (typically 200-500ps), while the destination has only 0.1ns slack. Placing the shifter in the destination would likely cause a timing violation. Always place level shifters in the domain with more timing margin.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Fanout Placement (At Each Sink)",
          "snippet": "# Only insert shifters if ΔV > 0.2V set_level_shifter LS_THRESHOLD -domain PD_GPU \\ -applies_to outputs \\ -threshold 0.2 \\ -location automatic"
        }
      },
      {
        "title": "9. Rule-Based Level Shifter Insertion",
        "content": "The -rule option specifies which voltage transitions require shifters.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Rule-Based Level Shifter Insertion",
          "snippet": "# Provide multiple cell options with different drive strengths map_level_shifter_cell LS_CPU_OUT -domain PD_CPU \\ -lib_cells { LS_LH_1V0_1V2_X1 # Low drive (small loads) LS_LH_1V0_1V2_X2 # Medium drive LS_LH_1V0_1V2_X4 # High drive (high fanout) LS_LH_1V0_1V2_X8 # Very high drive }"
        }
      },
      {
        "title": "10. Use Cases for Directional Rules",
        "content": "Scenario Rule Rationale Unidirectional interface low_to_high or high_to_low Signals only flow one direction Bidirectional bus both Data flows both directions Asymmetric voltage design Specific direction only One direction is same voltage",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Use Cases for Directional Rules",
          "snippet": "# Different cells for different voltage transitions map_level_shifter_cell LS_CPU_OUT -domain PD_CPU \\ -lib_cells {LS_LH_1V0_1V2_X1 LS_LH_1V0_1V2_X2} map_level_shifter_cell LS_IO_OUT -domain PD_IO \\ -lib_cells {LS_HL_1V8_1V2_X1 LS_HL_1V8_1V2_X2}"
        }
      },
      {
        "title": "11. Threshold-Based Level Shifter Insertion",
        "content": "The -threshold option controls minimum voltage difference for shifter insertion.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Threshold-Based Level Shifter Insertion",
          "snippet": "# Wrapper converts bidir to input + output + direction control # Then apply normal level shifters to each direction set_level_shifter LS_BUS_OUT -domain PD_CPU \\ -applies_to outputs \\ -location self set_level_shifter LS_BUS_IN -domain PD_CPU \\ -applies_to inputs \\ -location parent"
        }
      },
      {
        "title": "12. Example: Conditional Insertion",
        "content": "Source V Dest V ΔV Threshold 0.2V Shifter Inserted? 1.0V 1.05V 0.05V Below No 1.0V 1.2V 0.2V At threshold Yes 0.9V 1.2V 0.3V Above Yes 1.0V 1.8V 0.8V Above Yes Conservative practice: Set threshold to 0.0V (insert shifters for any voltage difference) or very low value (0.05V). Small voltage differences can still cause reliability and timing issues. Only use higher thresholds if process characterization proves it's safe.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Example: Conditional Insertion",
          "snippet": "# Use special bidirectional level shifter cells (if available) map_level_shifter_cell LS_BIDIR -domain PD_CPU \\ -lib_cells {LS_BIDIR_1V0_1V2_X1 LS_BIDIR_1V0_1V2_X2}"
        }
      },
      {
        "title": "13. Advanced Library Cell Mapping",
        "content": "Mapping level shifters to library cells with drive strength and voltage range selection.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Advanced Library Cell Mapping",
          "snippet": "# Group related signals (e.g., data bus) for efficient placement set_level_shifter LS_DATA_BUS -domain PD_MEM \\ -applies_to outputs \\ -location self \\ -elements {mem_inst/data_out[*]} # All data bus bits together"
        }
      },
      {
        "title": "14. Multi-Cell Mapping",
        "content": "Synthesis tools select appropriate drive strength based on: Fanout (number of sinks) Capacitive load Timing requirements Power budget",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Multi-Cell Mapping",
          "snippet": "# Map critical path to fast level shifter cells map_level_shifter_cell LS_CRITICAL -domain PD_CPU \\ -lib_cells {LS_LH_FAST_1V0_1V2} # Fast but higher power variant"
        }
      },
      {
        "title": "15. Voltage-Specific Cell Mapping",
        "content": "Each voltage combination (1.0V→1.2V, 1.8V→1.2V) uses appropriate library cells designed for that range. Drive Strength Selection In a production SoC, level shifter drive strength is critical. A clock signal crossing voltage domains might require X8 drive strength (high fanout to hundreds of flip-flops), while a single control signal uses X1 (minimal area/power). Providing multiple cell options in map_level_shifter_cell allows synthesis tools to optimize each signal individually, balancing timing, area, and power.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Voltage-Specific Cell Mapping",
          "snippet": "# =================================================================== # Advanced Level Shifter Configuration # =================================================================== # Domain structure create_power_domain PD_TOP -include_scope create_power_domain PD_CPU -elements {cpu_inst} create_power_domain PD_MEM -elements {mem_ctrl} create_power_domain PD_IO -elements {io_pads} # Supply definitions (voltages: TOP=1.2V, CPU=1.0V, MEM=1.0V, IO=1.8V) # ... (supply nets, sets, states omitted for brevity) # CPU Level Shifters (1.0V ↔ 1.2V) # Critical path: Use self placement for timing control set_level_shifter LS_CPU_CRITICAL -domain PD_CPU \\ -applies_to outputs \\ -location self \\ -rule low_to_high \\ -elements {cpu_inst/critical_path/*} # Non-critical CPU outputs: Automatic placement set_level_shifter LS_CPU_GENERAL -domain PD_CPU \\ -applies_to outputs \\ -location automatic \\ -threshold 0.05 # CPU inputs: Parent placement set_level_shifter LS_CPU_IN -domain PD_CPU \\ -applies_to inputs \\ -location parent # MEM stays at 1.0V (same as CPU) - no shifters needed between CPU-MEM # IO Level Shifters (1.8V ↔ 1.2V) # High-voltage interface requires specific cells set_level_shifter LS_IO_OUT -domain PD_IO \\ -applies_to outputs \\ -location self \\ -rule high_to_low set_level_shifter LS_IO_IN -domain PD_IO \\ -applies_to inputs \\ -location parent \\ -rule low_to_high # Library Cell Mapping # Critical path: Multiple drive strengths + fast variant map_level_shifter_cell LS_CPU_CRITICAL -domain PD_CPU \\ -lib_cells { LS_LH_FAST_1V0_1V2_X2 LS_LH_FAST_1V0_1V2_X4 LS_LH_FAST_1V0_1V2_X8 } # General paths: Standard cells map_level_shifter_cell LS_CPU_GENERAL -domain PD_CPU \\ -lib_cells { LS_LH_1V0_1V2_X1 LS_LH_1V0_1V2_X2 LS_LH_1V0_1V2_X4 } map_level_shifter_cell LS_CPU_IN -domain PD_CPU \\ -lib_cells {LS_HL_1V2_1V0_X1 LS_HL_1V2_1V0_X2} # IO cells: High-voltage range map_level_shifter_cell LS_IO_OUT -domain PD_IO \\ -lib_cells {LS_HL_1V8_1V2_X1 LS_HL_1V8_1V2_X2 LS_HL_1V8_1V2_X4} map_level_shifter_cell LS_IO_IN -domain PD_IO \\ -lib_cells {LS_LH_1V2_1V8_X1 LS_LH_1V2_1V8_X2} # =================================================================== # Strategy Summary: # - Critical paths: Explicit control with fast cells # - General paths: Automatic insertion with standard cells # - CPU-MEM: Same voltage, no shifters (optimized) # - Voltage-specific cell mapping for each transition # ==================================================================="
        }
      },
      {
        "title": "16. Handling Bidirectional Signals",
        "content": "Bidirectional signals (inout ports) require special level shifter handling.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Handling Bidirectional Signals",
          "snippet": "# SUBOPTIMAL: Only one drive strength map_level_shifter_cell LS_CPU -domain PD_CPU \\ -lib_cells {LS_LH_1V0_1V2_X1} # BETTER: Multiple options for synthesis optimization map_level_shifter_cell LS_CPU -domain PD_CPU \\ -lib_cells { LS_LH_1V0_1V2_X1 LS_LH_1V0_1V2_X2 LS_LH_1V0_1V2_X4 }"
        }
      },
      {
        "title": "17. Bidirectional Challenge",
        "content": "Problem: Single wire must support voltage translation in both directions.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Bidirectional Challenge",
          "snippet": "# INCOMPLETE: Only output shifters set_level_shifter LS_CPU_OUT -domain PD_CPU \\ -applies_to outputs \\ -location self # COMPLETE: Both directions set_level_shifter LS_CPU_OUT -domain PD_CPU \\ -applies_to outputs \\ -location self set_level_shifter LS_CPU_IN -domain PD_CPU \\ -applies_to inputs \\ -location parent"
        }
      },
      {
        "title": "18. Solution 1: Separate Directional Signals",
        "content": "Convert bidirectional to separate input/output with control:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Solution 1: Separate Directional Signals",
          "snippet": "# =================================================================== # Optimized Level Shifter Strategy # =================================================================== # OPTION 1: Run critical domains at same voltage (Best for timing) # Change CACHE to 1.2V (same as CORE) - eliminates shifters on critical path # This is the preferred solution for zero shifter delay on critical path # OPTION 2: If CACHE must stay at 1.0V for power reasons: # CACHE outputs to CORE (critical path) # Place shifters in CACHE domain (has 500ps slack, can absorb LS delay) set_level_shifter LS_CACHE_TO_CORE -domain PD_CACHE \\ -applies_to outputs \\ -location self \\ # In CACHE domain (has slack) -rule low_to_high \\ -elements {cache_inst/critical_out[*]} # CACHE inputs from CORE # Place shifters in CACHE domain to keep CORE critical path clean set_level_shifter LS_CORE_TO_CACHE -domain PD_CACHE \\ -applies_to inputs \\ -location self \\ # In CACHE domain -rule high_to_low # CACHE to PERIPH (non-critical, 2ns slack) # Use automatic insertion for simplicity set_level_shifter LS_CACHE_PERIPH -domain PD_CACHE \\ -applies_to both \\ -location automatic \\ -threshold 0.05 set_level_shifter LS_PERIPH_CACHE -domain PD_PERIPH \\ -applies_to both \\ -location automatic \\ -threshold 0.05 # Cell Mapping # Critical path: Fast, multiple drive strengths map_level_shifter_cell LS_CACHE_TO_CORE -domain PD_CACHE \\ -lib_cells { LS_LH_FAST_1V0_1V2_X2 LS_LH_FAST_1V0_1V2_X4 } map_level_shifter_cell LS_CORE_TO_CACHE -domain PD_CACHE \\ -lib_cells { LS_HL_FAST_1V2_1V0_X2 LS_HL_FAST_1V2_1V0_X4 } # Non-critical: Standard cells, smaller drive map_level_shifter_cell LS_CACHE_PERIPH -domain PD_CACHE \\ -lib_cells {LS_LH_1V0_0V9_X1 LS_LH_1V0_0V9_X2} map_level_shifter_cell LS_PERIPH_CACHE -domain PD_PERIPH \\ -lib_cells {LS_LH_0V9_1V0_X1 LS_LH_0V9_1V0_X2} # =================================================================== # Key Optimizations: # 1. Critical path shifters in CACHE (has slack) not CORE (0 slack) # 2. Use FAST level shifter cells for critical signals # 3. Automatic insertion for non-critical (less UPF maintenance) # 4. Optimal solution: Run CORE and CACHE at same 1.2V (zero LS delay) # ==================================================================="
        }
      },
      {
        "title": "19. Solution 2: Bidirectional Level Shifter Cells",
        "content": "Bidirectional level shifter cells contain: Two level shifters (one per direction) Direction control logic Tri-state buffers for bus control Bidirectional level shifter cells are complex and not available in all libraries. When possible, redesign interfaces to avoid true bidirectional signals at voltage boundaries, using separate input/output paths with direction control instead."
      },
      {
        "title": "20. 1. Cluster Shifters for Related Signals",
        "content": "Benefits: Better routing, reduced area, consistent timing across bus."
      },
      {
        "title": "21. 2. Minimize Shifter Count on Critical Paths",
        "content": "Design tip: Keep critical path blocks at same voltage to minimize level shifter overhead."
      },
      {
        "title": "22. 3. Use Lower-Delay Cells for Critical Paths",
        "content": "Some libraries offer low-delay level shifters (higher power, larger area) for timing-critical signals."
      },
      {
        "title": "23. Common Beginner Mistakes",
        "content": "Mistake #1: Using automatic placement for all signals including critical paths Problem: Tool may place level shifters on critical paths without considering timing impact. Solution: Use explicit placement ( -location self/parent ) for critical paths with -elements to control timing. Reserve automatic for non-critical signals. Mistake #2: Not providing multiple drive strength options Why? Different signals have different fanout and timing requirements. Providing multiple drive strengths allows synthesis to optimize each signal individually. Mistake #3: Forgetting level shifters for both input and output directions Why? Voltage boundaries require level shifting in both directions. Signals entering the domain (inputs) need shifters just as signals leaving (outputs) do."
      },
      {
        "title": "24. Practice Exercise",
        "content": "Challenge: Optimize Level Shifters for Performance Given a design with three domains: PD_CORE: 1.2V (critical timing, 0 slack on outputs) PD_CACHE: 1.0V (moderate timing, 500ps slack) PD_PERIPH: 0.9V (non-critical, 2ns slack) CORE and CACHE communicate frequently on critical paths. Design level shifter strategies that: Minimize critical path impact (CORE ↔ CACHE) Optimize area for non-critical paths (CACHE ↔ PERIPH) Provide appropriate cell mappings Hint For critical CORE-CACHE signals, keep them at the same voltage (no shifters) by running both at 1.2V, or place shifters in CACHE domain (which has slack). For CACHE-PERIPH (non-critical), use automatic insertion to minimize UPF complexity. Solution"
      },
      {
        "title": "25. Summary",
        "content": "In this tutorial, you learned: Automatic level shifter insertion simplifies UPF but sacrifices control; explicit insertion optimizes critical paths with precise placement Placement strategies (self, parent, fanout) impact timing differently—place shifters in domains with slack to preserve critical path performance Rule-based insertion ( -rule low_to_high/high_to_low/both ) and thresholds control which voltage crossings get shifters Multi-cell mapping with various drive strengths enables synthesis optimization for individual signal requirements Bidirectional signals require special handling—separate directional paths or dedicated bidirectional level shifter cells Optimization techniques: cluster related signals, minimize shifters on critical paths, use fast cells for timing-sensitive signals",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Advanced Level Shifters",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Advanced Level Shifters\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-advanced-level-shifters",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "Which UPF command defines a level shifter rule between domains?",
      "options": [
        "set_voltage_boost",
        "set_level_shifter",
        "create_level_converter",
        "map_voltage_domain"
      ],
      "correctIndex": 1,
      "explanation": "The 'set_level_shifter' command configures level shifter strategy, direction (input, output, or both), location, and threshold voltage rules."
    }
  },
  "upf-repeater-strategies": {
    "id": "upf-repeater-strategies",
    "badge": "Module 4 • Special Architectural Networks",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "UPF Repeater Strategies",
    "subtitle": "Comprehensive technical guide on upf repeater strategies within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Understand signal integrity challenges at power domain boundaries Define repeater insertion strategies using set_repeater Specify repeater placement and distance criteria Combine repeaters with isolation and level shifters",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "set_repeater strategy_name -domain domain_name \\ -applies_to {outputs|inputs|both} \\ [options]"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Repeater Strategies defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. Signal Integrity at Power Domain Boundaries",
        "content": "Power domain crossings often involve long routing distances, creating signal integrity challenges.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Signal Integrity at Power Domain Boundar",
          "snippet": "set_repeater REP_CPU -domain PD_CPU \\ -applies_to outputs \\ -location parent"
        }
      },
      {
        "title": "3. RC Delay Scaling",
        "content": "Wire delay follows quadratic relationship with length: This quadratic scaling means long wires quickly become timing bottlenecks. In advanced process nodes (7nm, 5nm), metal resistivity increases due to grain boundary scattering and barrier thickness, making wire delay even worse. Repeater insertion becomes essential for maintaining timing closure on long nets. Physical Separation in SoCs In a large SoC, a CPU domain (top-left corner) might communicate with a memory controller (bottom-right corner) over wires spanning 5-10mm. Without repeaters, this routing distance could add 2-3ns of delay—completely unacceptable for high-speed interfaces running at 2-3GHz. Strategic repeater insertion every 1-2mm reduces delay to acceptable levels (~500ps total) while maintaining signal integrity.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: RC Delay Scaling",
          "snippet": "set_repeater REP_LONG -domain PD_MEM \\ -applies_to both \\ -location automatic \\ -distance 1000 # Insert repeater if wire > 1mm"
        }
      },
      {
        "title": "4. What Are Repeaters?",
        "content": "A repeater is a buffer inserted along a long wire to restore signal strength and reduce delay.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What Are Repeaters?",
          "snippet": "set_repeater REP_CRITICAL -domain PD_CPU \\ -applies_to outputs \\ -location self \\ -elements {cpu_inst/critical_sig[*]}"
        }
      },
      {
        "title": "5. Repeater Functionality",
        "content": "Each repeater: Restores signal to full voltage swing Improves slew rate (faster transitions) Breaks long wire into shorter segments (linear vs quadratic delay) Reduces crosstalk sensitivity",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Repeater Functionality",
          "snippet": "set_repeater REP_SELF -domain PD_CPU \\ -applies_to outputs \\ -location self"
        }
      },
      {
        "title": "6. Optimal Repeater Spacing",
        "content": "For minimum delay, repeaters should be spaced at: Use physical design tool recommendations for repeater spacing. Modern tools calculate optimal spacing based on actual wire characteristics (metal layer, width, spacing) and buffer library data. UPF repeater strategies guide where repeaters are allowed, not exact spacing. Quick Check Q: Why do repeaters reduce delay even though they add buffer delay? Show Answer Repeaters reduce RC delay (quadratic with length) more than they add buffer delay (constant). Example: 3mm wire has ~2ns RC delay. Three 1mm segments with repeaters have ~300ps RC delay + 200ps buffer delay = 500ps total, saving 1.5ns. The key is breaking the quadratic RC scaling into linear segments.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Optimal Repeater Spacing",
          "snippet": "set_repeater REP_PARENT -domain PD_CPU \\ -applies_to outputs \\ -location parent"
        }
      },
      {
        "title": "7. When to Use Repeater Strategies",
        "content": "Repeaters are beneficial when: Scenario Use Repeaters? Rationale Long distance between domains Yes Reduce RC delay, improve slew High-speed signals (>1GHz) Yes Maintain timing and signal quality Short distances (<500µm) No Added buffer delay hurts more than helps Low-speed control signals Maybe Only if physical distance is very large Signals with tight timing Yes Optimize delay with repeater insertion",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: When to Use Repeater Strategies",
          "snippet": "set_repeater REP_AUTO -domain PD_GPU \\ -applies_to both \\ -location automatic"
        }
      },
      {
        "title": "8. Syntax: set_repeater",
        "content": "The set_repeater command defines repeater insertion strategies for power domain crossings.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Syntax: set_repeater",
          "snippet": "# Insert repeater if wire exceeds 1mm (1000µm) set_repeater REP_1MM -domain PD_CPU \\ -applies_to outputs \\ -location automatic \\ -distance 1000"
        }
      },
      {
        "title": "9. Key Parameters",
        "content": "strategy_name - Unique identifier for repeater strategy (required) -domain domain_name - Domain where repeaters are applied (required) -applies_to {outputs|inputs|both} - Signal direction (required) -location {self|parent|fanout|automatic} - Repeater placement domain -distance value - Maximum wire length before repeater insertion (optional) -elements {instance_list} - Specific signals to buffer (optional)",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Key Parameters",
          "snippet": "# Power-gated GPU with long outputs set_repeater REP_GPU -domain PD_GPU \\ -applies_to outputs \\ -location parent # In always-on domain set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal gpu_iso \\ -isolation_sense high \\ -location parent # Same as repeaters"
        }
      },
      {
        "title": "10. Usage Variations",
        "content": "1. Basic Repeater Strategy: 2. Repeater with Distance Criterion: 3. Repeater for Specific Signals:",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Usage Variations",
          "snippet": "# CPU (1.0V) to TOP (1.2V) with long wire set_level_shifter LS_CPU -domain PD_CPU \\ -applies_to outputs \\ -location self set_repeater REP_CPU -domain PD_CPU \\ -applies_to outputs \\ -location parent # After level shifter -distance 1000"
        }
      },
      {
        "title": "11. Repeater Placement Strategies",
        "content": "Repeater placement affects signal integrity and which domain supplies power to repeaters.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Repeater Placement Strategies",
          "snippet": "map_repeater_cell strategy_name -domain domain_name \\ -lib_cells {cell_list}"
        }
      },
      {
        "title": "12. Self Placement (Source Domain)",
        "content": "Characteristics: Repeaters powered by source domain (PD_CPU) If source is power-gated, repeaters turn off with domain Requires isolation if source can be powered off",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Self Placement (Source Domain)",
          "snippet": "# Map repeater strategy to various buffer drive strengths map_repeater_cell REP_CPU -domain PD_CPU \\ -lib_cells { BUF_X1 # Minimum drive BUF_X2 # Standard drive BUF_X4 # High drive BUF_X8 # Maximum drive }"
        }
      },
      {
        "title": "13. Parent Placement (Destination Domain)",
        "content": "Characteristics: Repeaters powered by destination domain (PD_TOP) Repeaters remain powered if destination is always-on Better for power-gated source domains",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Parent Placement (Destination Domain)",
          "snippet": "# Critical path: Use fast buffers map_repeater_cell REP_CRITICAL -domain PD_CPU \\ -lib_cells { BUF_FAST_X2 BUF_FAST_X4 BUF_FAST_X8 } # Non-critical: Use low-power buffers map_repeater_cell REP_GENERAL -domain PD_CPU \\ -lib_cells { BUF_LP_X1 # Low-power variant BUF_LP_X2 }"
        }
      },
      {
        "title": "14. Automatic Placement (Tool Decides)",
        "content": "Physical design tool determines optimal repeater placement based on: Wire route and congestion Power domain availability Timing requirements Use -location parent (destination domain) for repeaters when the source domain can be power-gated. This ensures repeaters remain powered and functional even when the source is off, preventing X-propagation issues.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Automatic Placement (Tool Decides)",
          "snippet": "# =================================================================== # Repeater Strategy for Large SoC # =================================================================== # Domain structure create_power_domain PD_TOP -include_scope create_power_domain PD_CPU -elements {cpu_cluster} create_power_domain PD_GPU -elements {gpu_subsystem} create_power_domain PD_MEM -elements {mem_ctrl} # Supply definitions (TOP=1.2V, CPU=1.0V, GPU=0.9V, MEM=1.0V) # ... (supplies omitted for brevity) # CPU Repeaters (CPU at 1.0V, TOP at 1.2V) # Critical signals: Explicit control set_repeater REP_CPU_CRITICAL -domain PD_CPU \\ -applies_to outputs \\ -location parent \\ # In TOP domain (after level shifter) -distance 800 \\ # Conservative for critical paths -elements {cpu_cluster/critical_if[*]} # General CPU signals: Automatic with relaxed distance set_repeater REP_CPU_GENERAL -domain PD_CPU \\ -applies_to outputs \\ -location automatic \\ -distance 1500 # CPU inputs from TOP set_repeater REP_CPU_IN -domain PD_CPU \\ -applies_to inputs \\ -location parent \\ -distance 1000 # GPU Repeaters (power-gated, long distances) # Place in parent (TOP) domain so repeaters stay powered set_repeater REP_GPU -domain PD_GPU \\ -applies_to outputs \\ -location parent \\ # Always-on domain -distance 1000 set_repeater REP_GPU_IN -domain PD_GPU \\ -applies_to inputs \\ -location parent \\ -distance 1000 # MEM Repeaters (same voltage as CPU: 1.0V) # No level shifter needed between CPU-MEM set_repeater REP_MEM -domain PD_MEM \\ -applies_to both \\ -location automatic \\ -distance 1200 # Library Cell Mapping # Critical paths: Fast buffers map_repeater_cell REP_CPU_CRITICAL -domain PD_CPU \\ -lib_cells { BUF_FAST_X2 BUF_FAST_X4 BUF_FAST_X8 } # General paths: Standard buffers map_repeater_cell REP_CPU_GENERAL -domain PD_CPU \\ -lib_cells {BUF_X1 BUF_X2 BUF_X4} map_repeater_cell REP_CPU_IN -domain PD_CPU \\ -lib_cells {BUF_X1 BUF_X2 BUF_X4} map_repeater_cell REP_GPU -domain PD_GPU \\ -lib_cells {BUF_X1 BUF_X2 BUF_X4 BUF_X8} map_repeater_cell REP_GPU_IN -domain PD_GPU \\ -lib_cells {BUF_X1 BUF_X2} map_repeater_cell REP_MEM -domain PD_MEM \\ -lib_cells {BUF_X1 BUF_X2 BUF_X4} # =================================================================== # Strategy Summary: # - Critical paths: Tight distance threshold (800µm), fast buffers # - General paths: Relaxed threshold (1000-1500µm), standard buffers # - Power-gated domains: Repeaters in always-on parent domain # - Multiple drive strengths for optimization flexibility # ==================================================================="
        }
      },
      {
        "title": "15. Distance-Based Repeater Insertion",
        "content": "The -distance option specifies maximum wire length before repeater insertion.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Distance-Based Repeater Insertion",
          "snippet": "# PROBLEMATIC: Repeaters in GPU domain (can be powered off) set_repeater REP_GPU -domain PD_GPU \\ -applies_to outputs \\ -location self # Repeaters lose power when GPU is off! # BETTER: Place in always-on domain set_repeater REP_GPU -domain PD_GPU \\ -applies_to outputs \\ -location parent # Repeaters stay powered"
        }
      },
      {
        "title": "16. Example: Conditional Insertion",
        "content": "Wire Length Distance Threshold Repeater Inserted? 500µm 1000µm No (below threshold) 1000µm 1000µm Yes (at threshold) 2500µm 1000µm Yes (likely 2-3 repeaters) The -distance parameter is a guideline, not a strict rule. Physical design tools use this as input for repeater insertion algorithms, combined with actual routing information and timing constraints. Final repeater count and spacing depend on detailed place-and-route results.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Example: Conditional Insertion",
          "snippet": "# TOO CONSERVATIVE: Inserting repeaters too frequently set_repeater REP_EXCESSIVE -domain PD_CPU \\ -applies_to outputs \\ -distance 200 # 200µm is too short for most technologies # REASONABLE: Based on technology recommendations set_repeater REP_OPTIMAL -domain PD_CPU \\ -applies_to outputs \\ -distance 1000 # 1mm is typical for modern processes"
        }
      },
      {
        "title": "17. Repeaters with Isolation and Level Shifters",
        "content": "Repeaters often combine with other power management strategies.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Repeaters with Isolation and Level Shift",
          "snippet": "# SUBOPTIMAL: Single drive strength map_repeater_cell REP_CPU -domain PD_CPU \\ -lib_cells {BUF_X1} # OPTIMAL: Multiple options for different loads map_repeater_cell REP_CPU -domain PD_CPU \\ -lib_cells {BUF_X1 BUF_X2 BUF_X4 BUF_X8}"
        }
      },
      {
        "title": "18. Repeater + Isolation",
        "content": "For power-gated domains with long wires: Order: Isolation first, then repeater (ISO clamps before repeater buffers).",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Repeater + Isolation",
          "snippet": "# =================================================================== # Repeater Strategy for 6mm CPU-IO Interface # =================================================================== # Assume domains and supplies already defined # CPU at 1.0V, IO at 1.8V, both always-on # LEVEL SHIFTERS (handle voltage crossing) set_level_shifter LS_CPU_TO_IO -domain PD_CPU \\ -applies_to outputs \\ -location self # Shift before long route set_level_shifter LS_IO_TO_CPU -domain PD_IO \\ -applies_to outputs \\ -location self # REPEATER STRATEGIES # Critical 32-bit data bus: Aggressive repeater insertion set_repeater REP_DATA_BUS -domain PD_CPU \\ -applies_to outputs \\ -location automatic \\ # Let tool optimize based on routing -distance 800 \\ # Repeater every ~800µm (6mm → ~7-8 repeaters) -elements {cpu_inst/data_out[31:0]} # Control signals: Relaxed repeater insertion set_repeater REP_CONTROL -domain PD_CPU \\ -applies_to outputs \\ -location automatic \\ -distance 1500 \\ # Repeater every ~1.5mm (6mm → ~4 repeaters) -elements {cpu_inst/ctrl_*} # Inputs from IO domain (less critical, long distance) set_repeater REP_CPU_IN -domain PD_CPU \\ -applies_to inputs \\ -location automatic \\ -distance 1200 # IO domain repeaters (symmetric configuration) set_repeater REP_IO_DATA -domain PD_IO \\ -applies_to outputs \\ -location automatic \\ -distance 800 \\ -elements {io_inst/data_out[31:0]} set_repeater REP_IO_CONTROL -domain PD_IO \\ -applies_to outputs \\ -location automatic \\ -distance 1500 \\ -elements {io_inst/ctrl_*} # LIBRARY CELL MAPPING # Data bus: Fast, high-drive buffers for critical timing map_repeater_cell REP_DATA_BUS -domain PD_CPU \\ -lib_cells { BUF_FAST_X4 # High drive for long routes BUF_FAST_X8 # Very high drive option } map_repeater_cell REP_IO_DATA -domain PD_IO \\ -lib_cells { BUF_FAST_X4 BUF_FAST_X8 } # Control signals: Standard buffers (non-critical) map_repeater_cell REP_CONTROL -domain PD_CPU \\ -lib_cells {BUF_X1 BUF_X2 BUF_X4} map_repeater_cell REP_IO_CONTROL -domain PD_IO \\ -lib_cells {BUF_X1 BUF_X2 BUF_X4} # Inputs: Standard buffers map_repeater_cell REP_CPU_IN -domain PD_CPU \\ -lib_cells {BUF_X1 BUF_X2} # =================================================================== # Expected Results: # - Data bus: ~7-8 fast repeaters (aggressive for <1ns timing) # - Control: ~4 standard repeaters (relaxed for <5ns timing) # - Total area: ~300-400 repeater cells # - Timing: Data bus meets <1ns, control easily meets <5ns # ==================================================================="
        }
      },
      {
        "title": "19. Repeater + Level Shifter",
        "content": "For multi-voltage domains with long distances: Order: Level shifter first, then repeater (buffer at destination voltage). Combining Power Management Strategies A mobile SoC's power-gated GPU (0.9V) sends signals to an always-on memory controller (1.2V) located 8mm away. The signal chain requires: (1) Isolation cell (in memory domain, powered by 1.2V) to clamp when GPU is off, (2) Level shifter (0.9V → 1.2V), (3) Multiple repeaters every 1.5mm to maintain signal integrity across the long distance. This combination ensures reliable communication despite power gating and voltage differences."
      },
      {
        "title": "20. Repeater Library Cell Mapping",
        "content": "Map repeater strategies to physical buffer cells."
      },
      {
        "title": "21. Example",
        "content": "Physical design tools select appropriate buffer size based on: Downstream capacitance Fanout Timing slack Power budget"
      },
      {
        "title": "22. Specialized Repeater Cells",
        "content": "Some technologies offer low-delay or low-power buffer variants:"
      },
      {
        "title": "23. Common Beginner Mistakes",
        "content": "Mistake #1: Placing repeaters in power-gated source domain Why? If repeaters are in a power-gated domain and that domain turns off, the repeaters lose power. This can cause X-propagation even with isolation cells. Place repeaters in always-on domains for power-gated sources. Mistake #2: Using overly conservative distance thresholds Why? Excessive repeater insertion wastes area and power without timing benefit. Follow technology guidelines for optimal spacing (typically 0.5-2mm in advanced nodes). Too-short spacing adds buffer delay unnecessarily. Mistake #3: Not providing multiple buffer drive strengths Why? Different signals have different loads and timing requirements. Providing multiple drive strengths allows tools to optimize each repeater individually for best timing/power/area tradeoff."
      },
      {
        "title": "24. Practice Exercise",
        "content": "Challenge: Design Repeater Strategy for Long-Distance Communication A CPU domain (PD_CPU, 1.0V) and an I/O domain (PD_IO, 1.8V) are physically separated by 6mm. The interface includes: 32-bit data bus (critical timing: <1ns) Control signals (relaxed timing: <5ns) Both domains are always-on (no power gating) Design a repeater strategy that optimizes the critical data bus while using standard approach for control signals. Include library cell mappings. Hint For 6mm distance, you'll need multiple repeaters. Critical data bus should use tighter spacing (~800µm) with fast buffers. Control signals can use relaxed spacing (~1.5mm) with standard buffers. Don't forget level shifters for 1.0V ↔ 1.8V crossing. Solution"
      },
      {
        "title": "25. Summary",
        "content": "In this tutorial, you learned: Repeaters (buffers) reduce RC delay on long wires crossing power domains, breaking quadratic delay scaling into linear segments set_repeater defines repeater insertion with -distance threshold and -location placement strategy Placement strategies: self (source domain), parent (destination domain), automatic (tool decides)—prefer parent for power-gated sources Distance thresholds guide repeater spacing (typical: 0.5-2mm in advanced nodes), balancing delay reduction vs buffer overhead Repeaters combine with isolation (ISO first, then repeater) and level shifters (LS first, then repeater at destination voltage) Library cell mapping with multiple drive strengths enables optimization for varying loads and timing requirements",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Repeater Strategies",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Repeater Strategies\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-repeater-strategies",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What is the challenge when a signal from Domain A traverses through an unrelated Domain B to reach Domain C?",
      "options": [
        "It cannot be routed at all",
        "If Domain B is powered off, repeaters inside Domain B will cut off the signal unless they are always-on repeaters",
        "Signal frequency is doubled",
        "It automatically triggers a reset"
      ],
      "correctIndex": 1,
      "explanation": "If feedthrough signals use standard buffers inside a shutoff domain, turning off Domain B destroys communication between A and C. UPF repeater strategies ensure buffers are connected to always-on rails or routed around Domain B."
    }
  },
  "upf-always-on-networks": {
    "id": "upf-always-on-networks",
    "badge": "Module 4 • Special Architectural Networks",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "UPF Always On Networks",
    "subtitle": "Comprehensive technical guide on upf always on networks within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Understand the concept and necessity of always-on logic Define always-on supply networks in UPF Use set_domain_supply_net for always-on control distribution Implement power management controllers with always-on supplies",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# Create always-on primary domain create_power_domain PD_AON -include_scope # Always-on supply nets create_supply_net VDD_AON -domain PD_AON # Always-on power create_supply_net VSS -domain PD_AON # Ground # Always-on supply set create_supply_set SS_AON \\ -function {power VDD_AON} \\ -function {ground VSS} associate_supply_set SS_AON -handle PD_AON # Power states: Single state (always ON) add_power_state VDD_AON -state {ON 1.2} add_power_state VSS -state {ON 0.0}"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Always On Networks defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. Understanding Always-On Networks",
        "content": "An always-on network is a supply network that remains powered continuously, providing power to critical infrastructure that must function regardless of power domain states.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Understanding Always-On Networks",
          "snippet": "# Always-on domain create_power_domain PD_AON -include_scope create_supply_net VDD_AON -domain PD_AON # ... (supply sets, states) # Gated domain create_power_domain PD_CPU -elements {cpu_inst} create_supply_net VDD_CPU -domain PD_CPU # ... (supply sets, states) # Power switch controlled by always-on signal create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {vin VDD_AON} \\ # Input from always-on -output_supply_port {vout VDD_CPU} \\ # Output to gated domain -control_port {ctrl cpu_pwr_enable} \\ # Signal from always-on logic -on_state {on vin {ctrl}}"
        }
      },
      {
        "title": "3. What Requires Always-On Power?",
        "content": "Power Management Controller (PMC): Logic controlling power switches, isolation, retention Isolation Cells: Must remain powered to clamp outputs when source domain is off Level Shifters: Often powered by destination (always-on) domain Retention Cells: Require always-on retention supply (VDD_RET) Wake-Up Logic: Interrupt controllers, timer circuits for waking powered-down domains Debug Infrastructure: JTAG, scan chains, monitoring circuits Always-On Sensors: Temperature sensors, voltage monitors, security circuits Always-on networks trade power for functionality—they consume power continuously (leakage + any switching activity) but enable aggressive power gating of other domains. The key is minimizing always-on logic to essential functions only. Always-On Domain in Mobile SoCs In a smartphone processor, the always-on domain typically includes: power management controller (PMC), interrupt controller for wake events (touch screen, buttons, wireless), real-time clock (RTC), low-power sensor hub, and security processors. This consumes ~5-10mW continuously but enables the rest of the SoC (CPU, GPU, modem—potentially 1-2W when active) to be completely powered off during deep sleep, reducing standby power by 99%.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: What Requires Always-On Power?",
          "snippet": "# Isolation cells powered by and controlled from always-on set_isolation ISO_CPU -domain PD_CPU \\ -isolation_supply_set SS_AON \\ # Always-on supply -clamp_value 0 \\ -isolation_signal cpu_iso_enable \\ # Signal from AON logic -isolation_sense high \\ -location parent # In AON domain"
        }
      },
      {
        "title": "4. The Always-On Requirement Problem",
        "content": "Consider power gating without proper always-on infrastructure:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The Always-On Requirement Problem",
          "snippet": "set_domain_supply_net domain_name \\ -primary_power_net net_name \\ [-primary_ground_net net_name]"
        }
      },
      {
        "title": "5. Correct Design with Always-On",
        "content": "Failure to provide always-on supply to power management logic creates a \"chicken and egg\" problem: you need power management to restore power, but power management itself has no power. Always identify and isolate always-on requirements early in design. Quick Check Q: Why can't isolation cells be powered by the gated domain supply? Show Answer Isolation cells must remain powered to actively drive the clamp value (0 or 1) when the source domain is off. If they were powered by the gated domain supply, they would lose power along with the domain, leaving outputs floating (the exact problem isolation is meant to prevent). Isolation cells must use always-on supply from the destination domain.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Correct Design with Always-On",
          "snippet": "# Domain normally uses VDD_CPU, but control logic uses VDD_AON set_domain_supply_net PD_CPU \\ -primary_power_net VDD_AON"
        }
      },
      {
        "title": "6. Defining Always-On Supply Networks",
        "content": "Always-on supplies are defined like any other supply net, but they have a single power state (always ON). Key characteristics of always-on supplies: Single power state (no OFF state) No power switch controlling the supply Directly connected to chip power pins Used by power management infrastructure",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Defining Always-On Supply Networks",
          "snippet": "# Ensure power control uses always-on supply set_domain_supply_net PD_GPU \\ -primary_power_net VDD_AON \\ -primary_ground_net VSS"
        }
      },
      {
        "title": "7. Using Always-On Networks for Control",
        "content": "Control signals for power management must use always-on supplies.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Using Always-On Networks for Control",
          "snippet": "# Always-on domain with retention supply create_power_domain PD_AON -include_scope create_supply_net VDD_AON -domain PD_AON create_supply_net VDD_RET -domain PD_AON # Retention supply (always-on) create_supply_net VSS -domain PD_AON # Retention supply set (used by retention cells across all domains) create_supply_set SS_RET \\ -function {power VDD_RET} \\ -function {ground VSS} # Power states add_power_state VDD_AON -state {ON 1.2} add_power_state VDD_RET -state {RETENTION 0.6} # Always-on at low voltage add_power_state VSS -state {ON 0.0}"
        }
      },
      {
        "title": "8. Power Switch Control from Always-On",
        "content": "The control signal cpu_pwr_enable originates from logic in PD_AON , ensuring the power switch can be controlled even when PD_CPU is off.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Power Switch Control from Always-On",
          "snippet": "# Gated domain with retention create_power_domain PD_CPU -elements {cpu_inst} # ... (CPU supplies) # Retention strategy using always-on retention supply set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_RET \\ # Always-on retention supply -retention_condition {cpu_ret_enable}"
        }
      },
      {
        "title": "9. Isolation Control from Always-On",
        "content": "Both the isolation cell power and control signal come from the always-on domain.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Isolation Control from Always-On",
          "snippet": "# =================================================================== # Complete Always-On Network Design # =================================================================== # ALWAYS-ON DOMAIN (Primary) create_power_domain PD_AON -include_scope # Always-on supply nets create_supply_net VDD_AON -domain PD_AON # Main always-on (1.2V) create_supply_net VDD_RET -domain PD_AON # Retention (0.6V, always-on) create_supply_net VSS -domain PD_AON # Always-on supply sets create_supply_set SS_AON \\ -function {power VDD_AON} \\ -function {ground VSS} create_supply_set SS_RET \\ -function {power VDD_RET} \\ -function {ground VSS} associate_supply_set SS_AON -handle PD_AON # Always-on power states (single state each) add_power_state VDD_AON -state {ON 1.2} add_power_state VDD_RET -state {RETENTION 0.6} add_power_state VSS -state {ON 0.0} # CPU DOMAIN (Power-Gated with Retention) create_power_domain PD_CPU -elements {cpu_subsystem} create_supply_net VDD_CPU -domain PD_CPU create_supply_net VSS -domain PD_CPU create_supply_set SS_CPU \\ -function {power VDD_CPU} \\ -function {ground VSS} associate_supply_set SS_CPU -handle PD_CPU add_power_state VDD_CPU \\ -state {ACTIVE 1.0} \\ -state {OFF off} # Power switch (controlled by always-on signal) create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {vin VDD_AON} \\ # Always-on input -output_supply_port {vout VDD_CPU} \\ -control_port {ctrl cpu_pwr_enable} \\ # From AON domain -on_state {on vin {ctrl}} # Isolation (powered by always-on, controlled by always-on) set_isolation ISO_CPU -domain PD_CPU \\ -isolation_supply_set SS_AON \\ # Always-on supply -clamp_value 0 \\ -isolation_signal cpu_iso_enable \\ # From AON domain -isolation_sense high \\ -location parent # In AON domain # Retention (using always-on retention supply) set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_RET \\ # Always-on retention supply -retention_condition {cpu_ret_enable} # From AON domain # GPU DOMAIN (Power-Gated, No Retention) create_power_domain PD_GPU -elements {gpu_subsystem} create_supply_net VDD_GPU -domain PD_GPU create_supply_net VSS -domain PD_GPU create_supply_set SS_GPU \\ -function {power VDD_GPU} \\ -function {ground VSS} associate_supply_set SS_GPU -handle PD_GPU add_power_state VDD_GPU \\ -state {ACTIVE 0.9} \\ -state {OFF off} # Power switch (always-on control) create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {vin VDD_AON} \\ -output_supply_port {vout VDD_GPU} \\ -control_port {ctrl gpu_pwr_enable} \\ -on_state {on vin {ctrl}} # Isolation (always-on infrastructure) set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_AON \\ -clamp_value 0 \\ -isolation_signal gpu_iso_enable \\ -isolation_sense high \\ -location parent # =================================================================== # Always-On Network Summary: # - VDD_AON: Powers AON domain, isolation cells, power switches # - VDD_RET: Powers retention cells across all domains # - All control signals (pwr_enable, iso_enable, ret_enable) from AON # - Power management controller resides in PD_AON # =================================================================== # Power Management Controller (in Always-On Domain) # =================================================================== # The PMC logic (not shown in UPF) controls: # - cpu_pwr_enable, cpu_iso_enable, cpu_ret_enable # - gpu_pwr_enable, gpu_iso_enable # All PMC logic powered by VDD_AON, ensuring it can manage power states # regardless of which domains are currently powered on/off # ==================================================================="
        }
      },
      {
        "title": "10. Syntax: set_domain_supply_net",
        "content": "The set_domain_supply_net command explicitly associates a domain with a supply net, useful for always-on control distribution.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Syntax: set_domain_supply_net",
          "snippet": "# WRONG: Control logic in gated domain (can't control itself!) # If cpu_pwr_enable logic is in PD_CPU, it loses power when CPU is off # Now you can't turn CPU back on → system stuck # CORRECT: Control logic in always-on domain # cpu_pwr_enable logic in PD_AON → always functional → can wake CPU"
        }
      },
      {
        "title": "11. Use Cases",
        "content": "1. Override Default Domain Supply: 2. Specify Always-On for Control Paths: set_domain_supply_net is typically used for special cases where default supply association isn't appropriate, such as control logic that must remain powered independently of the domain's main supply. For most designs, associate_supply_set is sufficient.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Use Cases",
          "snippet": "# WRONG: Retention supply is switchable add_power_state VDD_RET -state {ON 0.6} -state {OFF off} # CORRECT: Retention supply is always-on (single state) add_power_state VDD_RET -state {RETENTION 0.6}"
        }
      },
      {
        "title": "12. Always-On Retention Supplies",
        "content": "Retention supplies are a special type of always-on network for state preservation. The retention supply ( VDD_RET ) is always-on but at low voltage (~0.6V) to minimize leakage while preserving state.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Always-On Retention Supplies",
          "snippet": "# =================================================================== # Always-On Infrastructure Design # =================================================================== # ALWAYS-ON DOMAIN create_power_domain PD_AON -include_scope create_supply_net VDD_AON -domain PD_AON create_supply_net VDD_RET -domain PD_AON create_supply_net VSS -domain PD_AON create_supply_set SS_AON \\ -function {power VDD_AON} \\ -function {ground VSS} create_supply_set SS_RET \\ -function {power VDD_RET} \\ -function {ground VSS} associate_supply_set SS_AON -handle PD_AON add_power_state VDD_AON -state {ON 1.2} add_power_state VDD_RET -state {RETENTION 0.6} add_power_state VSS -state {ON 0.0} # MODEM DOMAIN (Power-gated with retention) create_power_domain PD_MODEM -elements {modem_inst} create_supply_net VDD_MODEM -domain PD_MODEM create_supply_net VSS -domain PD_MODEM create_supply_set SS_MODEM \\ -function {power VDD_MODEM} \\ -function {ground VSS} associate_supply_set SS_MODEM -handle PD_MODEM add_power_state VDD_MODEM -state {ACTIVE 1.0} -state {OFF off} # Power switch (always-on infrastructure) create_power_switch PSW_MODEM -domain PD_MODEM \\ -input_supply_port {vin VDD_AON} \\ -output_supply_port {vout VDD_MODEM} \\ -control_port {ctrl modem_pwr_en} \\ -on_state {on vin {ctrl}} # Isolation (always-on) set_isolation ISO_MODEM -domain PD_MODEM \\ -isolation_supply_set SS_AON \\ -clamp_value 0 \\ -isolation_signal modem_iso_en \\ -isolation_sense high \\ -location parent # Retention (always-on retention supply) set_retention RET_MODEM -domain PD_MODEM \\ -retention_supply_set SS_RET \\ -retention_condition {modem_ret_en} # SENSOR DOMAIN (Power-gated, no retention) create_power_domain PD_SENSOR -elements {sensor_hub} create_supply_net VDD_SENSOR -domain PD_SENSOR create_supply_net VSS -domain PD_SENSOR create_supply_set SS_SENSOR \\ -function {power VDD_SENSOR} \\ -function {ground VSS} associate_supply_set SS_SENSOR -handle PD_SENSOR add_power_state VDD_SENSOR -state {ACTIVE 0.9} -state {OFF off} # Power switch (always-on infrastructure) create_power_switch PSW_SENSOR -domain PD_SENSOR \\ -input_supply_port {vin VDD_AON} \\ -output_supply_port {vout VDD_SENSOR} \\ -control_port {ctrl sensor_pwr_en} \\ -on_state {on vin {ctrl}} # Isolation (always-on) set_isolation ISO_SENSOR -domain PD_SENSOR \\ -isolation_supply_set SS_AON \\ -clamp_value 0 \\ -isolation_signal sensor_iso_en \\ -isolation_sense high \\ -location parent # =================================================================== # Always-On Infrastructure Summary: # - VDD_AON: Powers AON domain, all isolation cells, power switches # - VDD_RET: Powers modem retention cells # - All control signals (pwr_en, iso_en, ret_en) from AON domain # - Power management controller in PD_AON controls everything # ==================================================================="
        }
      },
      {
        "title": "13. Using Always-On Retention Supply",
        "content": "The retention supply set SS_RET (containing always-on VDD_RET ) is used by all retention cells across all power-gated domains. Retention Supply Distribution In a multi-core processor, a single always-on retention supply (VDD_RET at 0.6V) powers retention cells across all four CPU cores, the GPU, and the DSP. Even though each block has its own switchable main supply (VDD_CORE0-3, VDD_GPU, VDD_DSP), they all share the common retention infrastructure. This simplifies power delivery and reduces the number of always-on supplies required."
      },
      {
        "title": "14. 1. Minimize Always-On Logic",
        "content": "Always-on logic consumes power continuously. Keep it minimal: Include: Power management controller, isolation cells, wake-up logic Exclude: Application logic, data processing, non-critical peripherals A good target: Always-on domain should be <5% of total chip area and consume <10mW in deep sleep. Anything more suggests non-essential logic in the always-on domain."
      },
      {
        "title": "15. 2. Use Single Always-On Supply When Possible",
        "content": "Multiple always-on supplies increase complexity:"
      },
      {
        "title": "16. 3. Ensure Always-On for All Critical Infrastructure",
        "content": "Checklist for always-on supply usage: [ ] Power management controller logic [ ] All power switch control signals [ ] All isolation cell supplies and controls [ ] All retention cell retention supplies [ ] Wake-up interrupt controller [ ] Debug/scan infrastructure (if must work in sleep) [ ] Any safety-critical monitoring (thermal, voltage)"
      },
      {
        "title": "17. Always-On vs Low-Power Modes",
        "content": "Always-on doesn't mean \"full power\"—use low-power techniques: Technique Application to Always-On Benefit Clock Gating Gate clocks to idle AON logic Reduce dynamic power in AON Low Voltage Run AON at minimum functional voltage Reduce both dynamic and leakage High-Vth Cells Use high-Vth standard cells in AON Minimize leakage power Minimal Logic Keep AON as small as possible Less area = less leakage Always-on domain voltage is often lower than peak performance domains (e.g., 1.0V for AON, 1.2V for CPU). Always-on logic doesn't need high speed, so run it at minimum voltage that meets timing, reducing power."
      },
      {
        "title": "18. Common Beginner Mistakes",
        "content": "Mistake #1: Powering power switch control logic from the gated domain Why? Power management control must be independent of the domains it controls. Always place power management logic in an always-on domain. Mistake #2: Forgetting to provide always-on supply to retention cells Why? Retention supply must remain on during power-down to preserve state. If it has an OFF state, retention doesn't work. Mistake #3: Making always-on domain too large Problem: Including non-essential logic in always-on domain wastes power continuously. Solution: Critically evaluate what truly must be always-on. Peripheral controllers, application logic, and most data processing can be power-gated. Only power management infrastructure and wake-up logic must be always-on."
      },
      {
        "title": "19. Practice Exercise",
        "content": "Challenge: Design Always-On Infrastructure Create a power management system with: Always-on domain (PD_AON) at 1.2V Shared retention supply (VDD_RET) at 0.6V Two gated domains: PD_MODEM (1.0V) and PD_SENSOR (0.9V) PD_MODEM has retention, PD_SENSOR does not Ensure all power management infrastructure uses always-on supplies. Hint You need VDD_AON and VDD_RET in PD_AON (both always-on, single state). Power switches take VDD_AON as input. Isolation uses SS_AON. Retention uses SS_RET. All control signals originate from PD_AON. Solution"
      },
      {
        "title": "20. Summary",
        "content": "In this tutorial, you learned: Always-on networks provide continuous power to critical infrastructure: power management controller, isolation cells, retention supplies, wake-up logic Always-on supplies have single power state (ON) with no power switch, ensuring continuous functionality All power management control signals (power switch enable, isolation enable, retention enable) must originate from always-on domain Retention supplies (VDD_RET) are always-on at low voltage (~0.6V), shared across all power-gated domains Design principles: minimize always-on logic (<5% area, <10mW), use single always-on supply when possible, apply low-power techniques (clock gating, low voltage) set_domain_supply_net explicitly associates domains with supplies for special cases like always-on control distribution",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Always On Networks",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Always On Networks\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-always-on-networks",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "Which components in a low-power SoC must be placed in an Always-On (AON) power domain?",
      "options": [
        "Graphics rendering cores",
        "High-speed floating point arithmetic units",
        "Power Management Unit (PMU), wake-up interrupt logic, and real-time clock (RTC)",
        "Display frame buffers"
      ],
      "correctIndex": 2,
      "explanation": "The PMU, wake-up interrupt detectors, real-time clock, and power switch controllers must remain powered continuously to wake the system from sleep."
    }
  },
  "hierarchical-upf": {
    "id": "hierarchical-upf",
    "badge": "Module 4 • Special Architectural Networks",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "Hierarchical UPF",
    "subtitle": "Comprehensive technical guide on hierarchical upf within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Distinguish between top-down and bottom-up UPF specification approaches Use the load_upf command to integrate hierarchical UPF files Apply scope management techniques for hierarchical power domains Organize UPF files for IP reuse and team collaboration",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# top_level.upf - Top-down approach # Define all power domains from top level # Top-level domain create_power_domain PD_TOP -include_scope # CPU subsystem domains (defined from top) create_power_domain PD_CPU -elements {cpu_subsystem} create_power_domain PD_CORE0 -elements {cpu_subsystem/core_0} create_power_domain PD_CORE1 -elements {cpu_subsystem/core_1} create_power_domain PD_L2 -elements {cpu_subsystem/l2_cache} # GPU subsystem domains (defined from top) create_power_domain PD_GPU -elements {gpu_subsystem} create_power_domain PD_GPU_CORE -elements {gpu_subsystem/gpu_core} create_power_domain PD_GPU_MEM -elements {gpu_subsystem/gpu_memory} # Video codec domains (defined from top) create_power_domain PD_VIDEO -elements {video_codec} create_power_domain PD_VIDEO_DEC -elements {video_codec/decoder} create_power_domain PD_VIDEO_ENC -elements {video_codec/encoder} # All supply networks and power switches defined here create_supply_net VDD create_supply_net VDD_CPU create_supply_net VDD_GPU # ... hundreds more lines ..."
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "Hierarchical UPF defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. The Hierarchical UPF Challenge",
        "content": "Modern SoC designs integrate hundreds of IP blocks from different sources: in-house developed subsystems, licensed third-party IP, and vendor-supplied blocks. Each subsystem may have complex internal power management with multiple voltage domains, power states, and control strategies. Consider a mobile application processor integrating: CPU cluster: 12 cores with per-core power gating GPU subsystem: 64 execution units with voltage scaling Video codec: Encoder and decoder with retention AI accelerator: Custom IP with multi-voltage design Memory controller: DDR4/LPDDR5 with power-down modes Attempting to capture all power intent in a single monolithic UPF file creates serious problems: File sizes exceed 5,000+ lines, becoming unmanageable IP blocks cannot be reused - power intent tied to specific instance names Teams cannot work in parallel - everyone modifies the same file Vendor IP arrives with proprietary UPF that must be manually merged Changes to one subsystem risk breaking others Hierarchical UPF solves these problems by allowing each subsystem to define its own power intent in separate files, which are then composed at integration using scoping and supply mapping. Hierarchical UPF in Modern SoCs Modern smartphone processors use hierarchical UPF extensively. A typical design has 20-30 major IP blocks, each with its own UPF file. The CPU vendor provides a complete UPF specification for their processor cluster. The GPU comes with vendor-supplied UPF. The integration team maintains top-level UPF for interconnect and system-level power management. This modular approach enables concurrent development and reduces integration time from months to weeks.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The Hierarchical UPF Challenge",
          "snippet": "# cpu_subsystem.upf - CPU team's independent UPF file # Defines power intent relative to cpu_subsystem scope # Primary power domain (relative to this scope) create_power_domain PD_CPU -include_scope # Sub-domains within CPU subsystem create_power_domain PD_CORE0 -elements {core_0} create_power_domain PD_CORE1 -elements {core_1} create_power_domain PD_L2 -elements {l2_cache} # Supply networks local to CPU subsystem create_supply_net VDD_CPU create_supply_net VSS create_supply_net VDD_CORE0 create_supply_net VDD_CORE1 # Power switches for CPU cores create_power_switch PSW_CORE0 -domain PD_CORE0 \\ -input_supply_port {vin VDD_CPU} \\ -output_supply_port {vout VDD_CORE0} \\ -control_port {ctrl core0_power_enable} \\ -on_state {on vin {ctrl}} # ... rest of CPU-specific power intent ..."
        }
      },
      {
        "title": "3. Top-Down vs. Bottom-Up UPF Approaches",
        "content": "Two fundamental strategies exist for hierarchical UPF organization: top-down specification and bottom-up composition.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Top-Down vs. Bottom-Up UPF Approaches",
          "snippet": "# gpu_subsystem.upf - GPU team's independent UPF file create_power_domain PD_GPU -include_scope create_power_domain PD_GPU_CORE -elements {gpu_core} create_power_domain PD_GPU_MEM -elements {gpu_memory} # GPU uses multiple voltage states for DVFS create_supply_net VDD_GPU add_power_state VDD_GPU \\ -state {HIGH 1.0} \\ -state {MED 0.9} \\ -state {LOW 0.8} \\ -state {OFF off} # ... GPU-specific power management ..."
        }
      },
      {
        "title": "4. Top-Down UPF Specification",
        "content": "In the top-down approach , a single UPF file at the chip's top level defines power intent for all hierarchy levels. The integrator has complete visibility and control over the entire power architecture. Advantages of Top-Down: Complete visibility of entire power architecture in one place Easier to ensure global consistency across all domains Simpler debugging with single file No scope management complexity Disadvantages of Top-Down: Monolithic files become unmanageable (thousands of lines) No IP reuse - power intent tied to specific instance names Parallel development blocked - all teams must coordinate edits Changes to one subsystem require modifying entire file Version control conflicts when multiple engineers work simultaneously",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Top-Down UPF Specification",
          "snippet": "# top_level.upf - Top-level integration file # Loads subsystem UPF files and connects supplies create_power_domain PD_TOP -include_scope # Load CPU subsystem UPF into its scope load_upf cpu_subsystem.upf -scope cpu_subsystem # Load GPU subsystem UPF into its scope load_upf gpu_subsystem.upf -scope gpu_subsystem # Load video codec UPF load_upf video_codec.upf -scope video_codec # Define top-level supply networks create_supply_net VDD -domain PD_TOP create_supply_net VSS -domain PD_TOP # Connect top-level supplies to subsystem supplies set_domain_supply_net PD_TOP -primary_power_net VDD set_domain_supply_net PD_TOP -primary_ground_net VSS"
        }
      },
      {
        "title": "5. Bottom-Up UPF Specification",
        "content": "In the bottom-up approach , each hierarchical block defines its own UPF file with local power intent. These files are loaded and composed at the top level using the load_upf command. Advantages of Bottom-Up: Modular organization - each subsystem in separate file IP reuse - UPF files travel with IP blocks Parallel development - teams work independently Easier maintenance - changes localized to affected subsystem Scalable to large SoCs with 100+ blocks Vendor IP integration without manual merging Disadvantages of Bottom-Up: Scope management complexity Harder to visualize global power architecture Potential naming conflicts between subsystems Debugging requires tracking across multiple files Supply mapping adds integration overhead Most production SoCs use a hybrid approach : bottom-up for major IP blocks and subsystems, top-down for interconnect and glue logic. This balances modularity with control. Quick Check Q: When would you choose top-down UPF over bottom-up? Show Answer Top-down UPF is appropriate for small to medium designs (< 1000 lines total UPF) where all blocks are developed in-house by a single team, no IP reuse is planned, and having complete visibility in one file outweighs maintenance concerns. For large SoCs, multi-team projects, or designs using third-party IP, bottom-up or hybrid approaches are strongly preferred.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Bottom-Up UPF Specification",
          "snippet": "load_upf \\ -scope \\ [-supply_map ] \\ [-replace] \\ [-relative]"
        }
      },
      {
        "title": "6. The load_upf Command",
        "content": "The load_upf command is the foundation of hierarchical UPF, loading a UPF file and applying it within a specified scope.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The load_upf Command",
          "snippet": "# Load CPU subsystem UPF load_upf cpu_subsystem.upf -scope cpu_subsystem # Load GPU subsystem UPF with supply mapping load_upf gpu_subsystem.upf \\ -scope gpu_subsystem \\ -supply_map gpu_supply_map.txt # Load video codec UPF with replacement # (useful when updating IP with new power intent) load_upf video_codec_v2.upf \\ -scope video_codec \\ -replace"
        }
      },
      {
        "title": "7. Parameters",
        "content": "filename: Path to UPF file to load -scope: Hierarchical instance to apply UPF to -supply_map: File mapping subsystem supply names to top-level names -replace: Replace existing UPF for this scope (useful for updates) -relative: Interpret paths relative to load location",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Parameters",
          "snippet": "# gpu_supply_map.txt - Maps GPU internal names to top-level names # Format: VDD_GPU_INTERNAL VDD_GPU VSS_GPU_INTERNAL VSS VDD_GPU_CORE_INTERNAL VDD_GPU_CORE VDD_GPU_MEM_INTERNAL VDD_GPU_MEM"
        }
      },
      {
        "title": "8. Supply Mapping",
        "content": "When a subsystem's internal supply names don't match the top-level supply names, use a supply map file to translate names during load. Supply mapping is essential for third-party IP blocks that use different naming conventions than your design. It enables integration without modifying the vendor's UPF file, preserving IP integrity and enabling future updates.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Supply Mapping",
          "snippet": "# top_level.upf # Apply supply mapping when loading GPU UPF load_upf gpu_subsystem.upf \\ -scope gpu_subsystem \\ -supply_map gpu_supply_map.txt # Now GPU's VDD_GPU_INTERNAL references top-level VDD_GPU"
        }
      },
      {
        "title": "9. Scope Management in Hierarchical UPF",
        "content": "Scope determines the hierarchical context for UPF commands. Proper scope management is critical for hierarchical UPF organization.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Scope Management in Hierarchical UPF",
          "snippet": "# Start at top level create_power_domain PD_TOP -include_scope # Create CPU domain create_power_domain PD_CPU -elements {cpu_subsystem} # Enter CPU subsystem scope set_scope cpu_subsystem # Now in cpu_subsystem scope - create domains relative to here create_power_domain PD_CORE0 -elements {core_0} create_power_domain PD_CORE1 -elements {core_1} create_power_domain PD_L2 -elements {l2_cache} # Return to top level set_scope . # Create GPU domain at top level create_power_domain PD_GPU -elements {gpu_subsystem} # Enter GPU scope set_scope gpu_subsystem # Create GPU sub-domains create_power_domain PD_GPU_CORE -elements {gpu_core} create_power_domain PD_GPU_MEM -elements {gpu_memory} # Return to top level set_scope ."
        }
      },
      {
        "title": "10. set_scope Command",
        "content": "Changes the current scope for subsequent UPF commands. Use . to return to the top level, and .. to move up one level.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: set_scope Command",
          "snippet": "# Absolute path (from top level, starts with /) create_power_domain PD_CORE0 -elements {/cpu_subsystem/core_0} # Relative path (from current scope, no leading /) set_scope cpu_subsystem create_power_domain PD_CORE0 -elements {core_0} # Relative to cpu_subsystem"
        }
      },
      {
        "title": "11. Absolute vs. Relative Paths",
        "content": "Hierarchical paths can be absolute (from top) or relative (from current scope). Best Practice: Subsystem UPF files should use relative paths to enable IP reuse. The same UPF file should work regardless of the instance name at the top level. Quick Check Q: If you're in the cpu_cluster/cpu_core_0 scope and execute set_scope .. , what scope are you in? Show Answer You're in the cpu_cluster scope. The .. moves up one level in the hierarchy, while . returns to the top level.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Absolute vs. Relative Paths",
          "snippet": "# top_level.upf - Main integration file for mobile SoC # Top-level scope create_power_domain PD_TOP -include_scope # Load subsystem UPF files with appropriate supply mappings # CPU cluster (4x Cortex-A78 cores) load_upf ../ip_blocks/cpu_cortex_a78/upf/cpu_cluster.upf \\ -scope cpu_cluster \\ -supply_map supply_maps/cpu_supply_map.txt # GPU subsystem (Mali-G78) load_upf ../ip_blocks/gpu_mali_g78/upf/gpu_subsystem.upf \\ -scope gpu_subsystem \\ -supply_map supply_maps/gpu_supply_map.txt # Video codec (H.265 encoder/decoder) load_upf ../ip_blocks/video_codec_h265/upf/video_codec.upf \\ -scope video_codec \\ -supply_map supply_maps/video_supply_map.txt # AI accelerator (custom IP) load_upf ../ip_blocks/ai_accelerator/upf/ai_accelerator.upf \\ -scope ai_accel \\ -supply_map supply_maps/ai_supply_map.txt # Memory subsystem (DDR4 controller + LPDDR5) load_upf memory_subsystem.upf -scope memory_subsystem # Interconnect fabric (NoC) load_upf noc_interconnect.upf -scope noc # Define top-level supply networks create_supply_net VDD_SYS # System supply: 1.8V always-on create_supply_net VDD_CPU # CPU supply: 0.8V-1.1V (DVFS) create_supply_net VDD_GPU # GPU supply: 0.7V-0.9V (DVFS) create_supply_net VDD_VIDEO # Video supply: 0.9V create_supply_net VDD_AI # AI accelerator: 0.85V create_supply_net VDD_MEM # Memory: 1.1V create_supply_net VSS # Ground # Create supply sets for top level create_supply_set SS_TOP \\ -function {power VDD_SYS} \\ -function {ground VSS} associate_supply_set SS_TOP -handle PD_TOP # Isolation between major subsystems set_isolation ISO_CPU_TO_NOC -domain cpu_cluster \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal cpu_iso_enable \\ -location parent set_isolation ISO_GPU_TO_NOC -domain gpu_subsystem \\ -isolation_supply_set SS_TOP \\ -clamp_value 0 \\ -isolation_signal gpu_iso_enable \\ -location parent # Level shifters at subsystem boundaries set_level_shifter LS_CPU_OUTPUTS -domain cpu_cluster \\ -applies_to outputs \\ -location parent set_level_shifter LS_GPU_OUTPUTS -domain gpu_subsystem \\ -applies_to outputs \\ -location parent"
        }
      },
      {
        "title": "12. UPF File Organization Strategies",
        "content": "Several strategies exist for organizing UPF files in hierarchical designs. The choice depends on design size, team structure, and IP reuse requirements.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: UPF File Organization Strategies",
          "snippet": "# WRONG: Loading power management before domains exist load_upf power_switches.upf # Error: domains don't exist yet load_upf domains.upf # CORRECT: Load domains first, then power management load_upf domains.upf load_upf supplies.upf load_upf power_switches.upf"
        }
      },
      {
        "title": "13. Strategy 1: One File Per IP Block",
        "content": "Each reusable IP block has its own UPF file that travels with the RTL. Advantages: IP portability, clear ownership, easy reuse across projects Disadvantages: Requires supply mapping for integration",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Strategy 1: One File Per IP Block",
          "snippet": "# WRONG: Absolute path in cpu_subsystem.upf (breaks reusability) create_power_domain PD_CORE0 -elements {/top/cpu_subsystem/core_0} # This won't work if CPU is instantiated as \"cpu_cluster\" # CORRECT: Use relative paths for IP reuse create_power_domain PD_CORE0 -elements {core_0} # Works regardless of instance name at top level"
        }
      },
      {
        "title": "14. Strategy 2: Hierarchical Layer Files",
        "content": "Separate UPF files for each hierarchy level, with clear naming convention. Advantages: Clear hierarchy visualization, systematic naming Disadvantages: Less portable for IP reuse",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Strategy 2: Hierarchical Layer Files",
          "snippet": "# WRONG: Loading GPU UPF without supply mapping load_upf gpu_subsystem.upf -scope gpu_subsystem # Error: GPU's VDD_GPU_INTERNAL doesn't exist at top level # CORRECT: Provide supply mapping load_upf gpu_subsystem.upf \\ -scope gpu_subsystem \\ -supply_map gpu_supply_map.txt"
        }
      },
      {
        "title": "15. Strategy 3: Functional Separation",
        "content": "Separate UPF files by function: domains, supplies, power management, constraints. Advantages: Easy to find specific type of specification, good for debugging Disadvantages: Doesn't support IP reuse, load order dependencies Load Order Matters: UPF files must be loaded in dependency order. Domains must exist before you can create supply sets for them. Supplies must exist before you can create power switches. Always load in this order: 1) Domains, 2) Supplies, 3) Power management (switches, level shifters, isolation, retention), 4) Power states.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Strategy 3: Functional Separation",
          "snippet": "# WRONG: Not returning to top scope set_scope cpu_subsystem create_power_domain PD_CORE0 -elements {core_0} # Still in cpu_subsystem scope! create_power_domain PD_GPU -elements {gpu_subsystem} # Error! # CORRECT: Return to top scope before creating GPU domain set_scope cpu_subsystem create_power_domain PD_CORE0 -elements {core_0} set_scope . # Return to top create_power_domain PD_GPU -elements {gpu_subsystem}"
        }
      },
      {
        "title": "16. Complete Hierarchical Organization Example",
        "content": "Hierarchical UPF in Production A recent mobile processor design used hierarchical UPF to integrate IP from four different sources. The CPU vendor provided a 1,200-line UPF file. The GPU vendor provided a 900-line UPF file. The modem team developed their UPF in parallel with RTL. Using bottom-up hierarchical UPF with supply mapping, the integration team loaded all subsystem UPF files without modification. When the CPU vendor released a new revision, the integrator simply replaced the CPU UPF file - no changes to other subsystems. This reduced integration time by 4 months compared to a monolithic UPF approach.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Complete Hierarchical Organization Examp",
          "snippet": "# wifi_supply_map.txt VDD_WIFI_INTERNAL VDD_WIRELESS VSS_WIFI_INTERNAL VSS"
        }
      },
      {
        "title": "17. Common Beginner Mistakes",
        "content": "Mistake #1: Incorrect load order Why? Power switches reference domains and supplies. Those must exist before power switches can be created. Mistake #2: Using absolute paths in subsystem UPF files Why? Absolute paths hardcode the hierarchy, preventing IP reuse. Relative paths make the UPF portable. Mistake #3: Forgetting supply mappings Why? Third-party IP uses its own supply naming. Supply mapping translates those names to your top-level supplies. Mistake #4: Staying in subsystem scope Why? Scope persists until explicitly changed. Always return to the intended scope level.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Beginner Mistakes",
          "snippet": "# bluetooth_supply_map.txt VDD_BT_INTERNAL VDD_WIRELESS VSS_BT_INTERNAL VSS"
        }
      },
      {
        "title": "18. Practice Exercise",
        "content": "Challenge: Design Hierarchical UPF Structure You're integrating a wireless connectivity subsystem into your SoC. The subsystem includes WiFi, Bluetooth, and NFC blocks, each from different vendors with their own UPF files. The subsystem has a shared RF front-end that must remain powered during sleep. Given: WiFi UPF: wifi_ip.upf (uses VDD_WIFI_INTERNAL, VSS_WIFI_INTERNAL) Bluetooth UPF: bluetooth_ip.upf (uses VDD_BT_INTERNAL, VSS_BT_INTERNAL) NFC UPF: nfc_ip.upf (uses VDD_NFC_INTERNAL, VSS_NFC_INTERNAL) Top-level supplies: VDD_WIRELESS, VDD_RF_ALWAYS_ON, VSS Instance names: wireless_subsystem/wifi, wireless_subsystem/bluetooth, wireless_subsystem/nfc Task: Create: A subsystem-level UPF file ( wireless_subsystem.upf ) that loads the three vendor IP files Supply mapping files for each IP block A top-level integration snippet that loads the wireless subsystem Proper power domain hierarchy and always-on RF domain Hint 1 Start by creating the three supply mapping files. Each should map the vendor's internal supply names to the wireless subsystem's supply names (VDD_WIRELESS, VSS). Hint 2 In wireless_subsystem.upf , create a PD_WIRELESS domain with -include_scope, then use load_upf for each vendor IP with appropriate -scope and -supply_map parameters. Hint 3 Create a separate power domain for the RF front-end (PD_RF) with a single power state (no OFF state) to ensure it's always powered. Solution Key points in solution: Three supply mapping files translate vendor IP supply names to subsystem names Subsystem UPF loads vendor IP files with appropriate scoping RF domain has only ON state (no OFF) to ensure always-on operation Power switch for wireless uses RF supply as input Isolation uses always-on RF supply Top-level loads wireless subsystem with another level of supply mapping",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Practice Exercise",
          "snippet": "# nfc_supply_map.txt VDD_NFC_INTERNAL VDD_WIRELESS VSS_NFC_INTERNAL VSS"
        }
      },
      {
        "title": "19. Summary",
        "content": "In this tutorial, you learned: Hierarchical UPF enables modular power intent specification for complex SoCs with hundreds of IP blocks Top-down approach uses single file with complete visibility but poor scalability; bottom-up approach uses modular files enabling IP reuse and parallel development The load_upf command loads subsystem UPF files with scope and supply mapping for integration Scope management with set_scope controls hierarchical context; use relative paths in subsystem UPF for portability File organization strategies include one-per-IP (best for reuse), hierarchical layers (visualization), and functional separation (debugging) Supply mapping translates subsystem supply names to top-level names, enabling third-party IP integration without modification UPF files must be loaded in dependency order: domains, supplies, power management, power states",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Summary",
          "snippet": "# wireless_subsystem.upf - Subsystem integration file # Primary wireless domain create_power_domain PD_WIRELESS -include_scope # Always-on RF front-end domain create_power_domain PD_RF -elements {rf_frontend} # Load vendor IP UPF files with supply mapping load_upf wifi_ip.upf \\ -scope wifi \\ -supply_map wifi_supply_map.txt load_upf bluetooth_ip.upf \\ -scope bluetooth \\ -supply_map bluetooth_supply_map.txt load_upf nfc_ip.upf \\ -scope nfc \\ -supply_map nfc_supply_map.txt # Define wireless subsystem supplies create_supply_net VDD_WIRELESS create_supply_net VDD_RF_ALWAYS_ON create_supply_net VSS # Supply sets for wireless domain create_supply_set SS_WIRELESS \\ -function {power VDD_WIRELESS} \\ -function {ground VSS} associate_supply_set SS_WIRELESS -handle PD_WIRELESS # Supply set for always-on RF domain create_supply_set SS_RF_ALWAYS_ON \\ -function {power VDD_RF_ALWAYS_ON} \\ -function {ground VSS} associate_supply_set SS_RF_ALWAYS_ON -handle PD_RF # Define power states for RF (always on) add_power_state VDD_RF_ALWAYS_ON -state {ON 0.9} # Note: No OFF state - RF is always powered # Define power states for wireless (can be gated) add_power_state VDD_WIRELESS \\ -state {ON 1.0} \\ -state {OFF off} # Power switch for wireless domain (RF stays on) create_power_switch PSW_WIRELESS -domain PD_WIRELESS \\ -input_supply_port {vin VDD_RF_ALWAYS_ON} \\ -output_supply_port {vout VDD_WIRELESS} \\ -control_port {ctrl wireless_power_enable} \\ -on_state {on vin {ctrl}} # Isolation for wireless outputs (using always-on supply) set_isolation ISO_WIRELESS -domain PD_WIRELESS \\ -isolation_supply_set SS_RF_ALWAYS_ON \\ -clamp_value 0 \\ -isolation_signal wireless_iso_enable \\ -location parent"
        },
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: Hierarchical UPF",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: Hierarchical UPF\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: hierarchical-upf",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "In hierarchical UPF, how does an SoC top-level reuse power intent from pre-designed IP blocks?",
      "options": [
        "By re-writing the entire UPF from scratch without looking at the IP",
        "Using the 'load_upf' command with the '-scope' argument targeting the IP hierarchy",
        "By converting IP UPF into Verilog assign statements",
        "UPF does not support hierarchical reuse"
      ],
      "correctIndex": 1,
      "explanation": "The 'load_upf ip_block.upf -scope u_ip_inst' command loads child UPF files and binds their internal power intent to the top-level SoC hierarchy cleanly."
    }
  },
  "upf-power-aware-simulation": {
    "id": "upf-power-aware-simulation",
    "badge": "Module 5 • Power-Aware Verification",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "Power-Aware Simulation and Corruption Semantics",
    "subtitle": "Simulating power shutoff, unpowered cell output corruption to X, isolation clamping, and retention restore sequencing in VCS, Questa, and Xcelium.",
    "sections": [
      {
        "title": "1. Why Power-Aware Simulation is Critical",
        "content": "Standard Verilog/SystemVerilog RTL simulation treats all logic as permanently powered on. Signals always evaluate to standard Boolean logic (`0` or `1`), and power switches or supply nets have no effect on signal propagation.\n\n**Power-Aware Simulation (PAS)** combines RTL code with IEEE 1801 UPF power intent to simulate real silicon electrical behavior at the RTL abstraction level. It models power gating, voltage domains, level shifters, and isolation cells before synthesis.",
        "callout": {
          "type": "info",
          "title": "Key Benefit of PAS",
          "message": "PAS catches bugs such as floating inputs, missing isolation cells, premature clock activation, and retention restore timing issues months before silicon tapeout."
        }
      },
      {
        "title": "2. X-Corruption and Floating Net Semantics",
        "content": "When a power domain switches from `ON` to `OFF`, all storage elements (flip-flops, latches) and combinational logic within that domain lose power.\n\nIn power-aware simulation:\n- Any unisolated signal crossing from an unpowered domain to an active domain is automatically forced to **`X` (Unknown)**.\n- Any sequential register in the domain is corrupted to `X` upon power down, unless covered by a valid retention strategy.\n- If an `X` propagates into an active domain due to missing isolation, it can corrupt control FSMs and cause the entire chip simulation to fail.",
        "code": {
          "language": "verilog",
          "caption": "Power-aware simulation output corruption",
          "snippet": "// At t=100ns, pwr_enable drops to 0:\n// Without isolation: data_out -> 'hx (propagates X)\n// With UPF clamp:    data_out -> 1'b0 (clean clamp)"
        }
      },
      {
        "title": "3. Power-Up and Power-Down Sequencing Verification",
        "content": "A correct power shutoff sequence must follow strict ordering:\n1. **Power-Down Sequence:**\n   - 1. Assert `iso_en` = 1 (clamp domain boundary signals).\n   - 2. Assert `save` = 1 (save retention registers, if applicable).\n   - 3. Turn off power switch `pwr_en` = 0.\n   - 4. Internal signals corrupt to `X`; unpowered domain is OFF.\n2. **Power-Up Sequence:**\n   - 1. Turn on power switch `pwr_en` = 1 and wait for power-good acknowledgment.\n   - 2. Assert `restore` = 1 (restore state from retention latches).\n   - 3. Release reset and clock gating.\n   - 4. Deassert `iso_en` = 0 (restore active communication).",
        "callout": {
          "type": "warning",
          "title": "Race Condition Warning",
          "message": "If isolation is deasserted before power is fully established and stable, unknown values (X) will leak into active domains, causing catastrophic system lockup."
        }
      },
      {
        "title": "4. Setting up Power-Aware Simulation in Industry Tools",
        "content": "Major EDA tools support native UPF simulation through compiler switches:\n- **Synopsys VCS:** `vcs -upf design.upf -power_top top_module ...`\n- **Siemens Questa:** `vlog -pa_upf design.upf ...` followed by `vsim -pa ...`\n- **Cadence Xcelium:** `xrun -lps_1801 design.upf ...`\n\nThese tools generate dedicated power waveform views (FSDB / VCD) showing power rail voltages alongside digital waveforms."
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: Power-Aware Simulation and Corruption Semantics",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: Power-Aware Simulation and Corruption Semantics\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-power-aware-simulation",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What happens if a power-down sequence turns off power before asserting isolation enable?",
      "options": [
        "The simulator automatically delays power-down",
        "Floating unknown (X) values leak into active domains, potentially causing state machine deadlock or assertion failures",
        "No effect because simulation ignores isolation",
        "All active domains turn off automatically"
      ],
      "correctIndex": 1,
      "explanation": "Failure to isolate before cutting power allows intermediate X values to leak across domain boundaries into active logic, triggering race conditions and simulator failures."
    }
  },
  "upf-verification-strategies": {
    "id": "upf-verification-strategies",
    "badge": "Module 5 • Power-Aware Verification",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "UPF Verification Strategies",
    "subtitle": "Comprehensive technical guide on upf verification strategies within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Apply static UPF checking to catch syntax and semantic errors Use UPF linting tools to enforce quality and best practices Validate UPF-RTL consistency and completeness Build automated verification flows for continuous integration",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# VCS static UPF check (no simulation) vcs -sverilog \\ -upf top_level.upf \\ -upf_check_only \\ # Check UPF without simulation -upf_verbose \\ design/*.sv # Output: UPF syntax and semantic errors"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Verification Strategies defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. The $5M UPF Bug",
        "content": "Your automotive SoC completed power-aware simulation with zero errors. The testbench exercised all power domains, tested retention and isolation, and achieved 100% power coverage. You proceeded to synthesis, which also completed successfully. Place-and-route inserted 45,000 isolation cells, 12,000 retention cells, and 380 power switches. Everything looked perfect. During gate-level simulation (GLS), you discovered that 15% of your isolation cells were inserted on signals that don't actually cross power domain boundaries—they're entirely within a single domain. These unnecessary cells add 8% area overhead and 12mW leakage power. Removing them requires re-running synthesis and P&R, delaying tape-out by 3 weeks and consuming $200K in engineering resources. Worse, you found that your retention strategy has incomplete coverage—127 flip-flops that should be retained are not included in any set_retention command. The simulation testbench happened to reinitialize these registers after power-up, masking the bug. In actual silicon use-cases, this causes intermittent failures after deep sleep. A UPF linting tool would have caught both issues in 5 minutes, before synthesis. Bugs caught by linting cost hours to fix; bugs caught in GLS cost weeks; bugs caught in silicon cost months and millions of dollars.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The $5M UPF Bug",
          "snippet": "# Buggy UPF - supply net used before definition create_power_domain PD_GPU -elements {gpu_subsystem} # BUG: VDD_GPU not yet defined! create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {vin VDD} \\ -output_supply_port {vout VDD_GPU} # Error: VDD_GPU undefined # Too late - should be before power switch create_supply_net VDD_GPU"
        }
      },
      {
        "title": "3. The UPF Verification Pyramid",
        "content": "Effective UPF verification uses multiple layers, each catching different classes of bugs: Each layer builds on the previous, with faster checks at the bottom catching obvious errors, and slower checks at the top providing comprehensive validation. Multi-Layered Verification in Practice A mobile processor team integrated UPF linting into their CI pipeline, running SpyGlass LP on every commit. In the first week, the tool flagged 127 violations across their 3,500-line UPF codebase. After fixing critical issues and documenting acceptable warnings as waivers, the automated flow caught an average of 3.2 UPF bugs per week over 6 months. The estimated cost savings (avoided respins, reduced debug time) was $1.8M. Most importantly: first silicon worked correctly on all power management features with zero UPF-related bugs.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The UPF Verification Pyramid",
          "snippet": "# Fixed UPF - supplies before power switches create_power_domain PD_GPU -elements {gpu_subsystem} create_supply_net VDD_GPU # Define first create_power_switch PSW_GPU -domain PD_GPU \\ -input_supply_port {vin VDD} \\ -output_supply_port {vout VDD_GPU} # OK: VDD_GPU exists"
        }
      },
      {
        "title": "4. Layer 1: Static UPF Checking",
        "content": "Static checking validates UPF syntax and basic semantic correctness without simulating or synthesizing the design.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Layer 1: Static UPF Checking",
          "snippet": "# SpyGlass LP project file (project.prj) read_file -type verilog design/*.sv read_file -type upf top_level.upf # Select lint goals current_goal lint/upf_lint_goal # Run analysis run_goal # Generate report write_report upf_lint_report.rpt"
        }
      },
      {
        "title": "5. Built-in Simulator Checks",
        "content": "Most simulators provide UPF static checking during elaboration: Output",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Built-in Simulator Checks",
          "snippet": "# Violation: Isolation cells will lose power! set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_GPU \\ # Uses GPU supply (powers down!) -location self # In GPU domain (powers down!)"
        }
      },
      {
        "title": "6. Common Static Errors",
        "content": "Error Type Description Example Undefined references Using entities before definition Power switch references non-existent supply net Duplicate definitions Creating same entity twice Two domains with same name Scope errors Invalid hierarchical paths Domain created for non-existent instance Syntax errors TCL syntax mistakes Missing braces, invalid command options Circular dependencies Load order issues File A loads File B, File B loads File A",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Static Errors",
          "snippet": "# Violation: Retention supply powers down! set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU # Uses CPU supply (powers down!)"
        }
      },
      {
        "title": "7. Example: Catching Undefined Supply Reference",
        "content": "Output Fix: Define supply nets before using them in power switches:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Example: Catching Undefined Supply Refer",
          "snippet": "# Both domains use same voltage - level shifter not needed add_power_state VDD_CPU -state {ON 1.0} add_power_state VDD_GPU -state {ON 1.0} # Same as CPU! set_level_shifter LS_CPU_TO_GPU -domain PD_GPU \\ -applies_to inputs \\ -source PD_CPU # Unnecessary - both at 1.0V"
        }
      },
      {
        "title": "8. Layer 2: UPF Linting",
        "content": "Linting goes beyond syntax checking to enforce quality, best practices, and detect common mistakes.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Layer 2: UPF Linting",
          "snippet": "# Power domain with outputs but no isolation create_power_domain PD_MODEM -elements {modem_subsystem} create_power_switch PSW_MODEM -domain PD_MODEM \\ -input_supply_port {vin VDD} \\ -output_supply_port {vout VDD_MODEM} \\ -control_port {ctrl modem_power_en} # BUG: No set_isolation command!"
        }
      },
      {
        "title": "9. Industry UPF Linting Tools",
        "content": "Tool Vendor Key Features SpyGlass LP Siemens Comprehensive rule library, custom rules, waivers VC LP Synopsys Integrated with VCS, synthesis correlation JasperGold Cadence Formal-based checks, completeness analysis Meridian LP Siemens Cross-domain analysis, hierarchical checking",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Industry UPF Linting Tools",
          "snippet": "# Only some flip-flops retained set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -elements {cpu_subsystem/control_regs} # Only control registers! # BUG: cpu_subsystem/data_path_regs not retained!"
        }
      },
      {
        "title": "10. Common Linting Violations",
        "content": "Violation #1: Isolation Cells in Powered-Down Domain Output Violation #2: Retention Without Always-On Supply Output Violation #3: Unnecessary Level Shifters (Same Voltage) Output Violation #4: Missing Isolation on Power Domain Outputs Output Violation #5: Incomplete Retention Coverage Output Quick Check Q: Why does a linting tool flag unnecessary level shifters as a warning rather than just accepting them? Show Answer Unnecessary level shifters add significant overhead: 15% area, 8% delay, and 12mW power consumption per shifter. In a large design, hundreds of unnecessary shifters can add 10-20mm² die area and 500mW+ power. Linting tools flag these to prevent waste, but allow waivers for cases where level shifters serve other purposes (e.g., voltage tolerance, noise immunity).",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Linting Violations",
          "snippet": "# UPF creates domain for 'gpu_subsystem' create_power_domain PD_GPU -elements {gpu_subsystem}"
        }
      },
      {
        "title": "11. Layer 3: UPF-RTL Consistency Validation",
        "content": "Validates that UPF power intent is consistent with RTL structure and behavior.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Layer 3: UPF-RTL Consistency Validation",
          "snippet": "# UPF references control signals create_power_switch PSW_GPU -domain PD_GPU \\ -control_port {ctrl gpu_power_enable} # Must exist in RTL! set_isolation ISO_GPU -domain PD_GPU \\ -isolation_signal gpu_iso_enable # Must exist in RTL!"
        }
      },
      {
        "title": "12. Consistency Check #1: Power Domain Instance Existence",
        "content": "Verify that all instances referenced in create_power_domain exist in RTL: Check: Does RTL contain an instance named gpu_subsystem ? Output",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Consistency Check #1: Power Domain Insta",
          "snippet": "// RTL: Signal crosses from PD_CPU to PD_GPU module top; logic [31:0] cpu_to_gpu_data; // Crosses domains! cpu_core cpu(.output_data(cpu_to_gpu_data)); gpu_core gpu(.input_data(cpu_to_gpu_data)); endmodule"
        }
      },
      {
        "title": "13. Consistency Check #2: Control Signal Existence",
        "content": "Verify that power control signals exist in RTL: Check: Do signals gpu_power_enable and gpu_iso_enable exist? Output",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Consistency Check #2: Control Signal Exi",
          "snippet": "// RTL: CPU subsystem with flip-flops module cpu_subsystem( input logic clk, // ... ); logic [31:0] pc; // Program counter - CRITICAL logic [31:0] regs [0:31]; // Register file - CRITICAL logic [7:0] pipeline_tag; // Pipeline tag - NON-CRITICAL (can lose) always_ff @(posedge clk) begin pc <= next_pc; regs[rd] <= alu_result; pipeline_tag <= next_tag; end endmodule"
        }
      },
      {
        "title": "14. Consistency Check #3: Cross-Domain Signal Analysis",
        "content": "Identify signals that cross power domain boundaries and verify they have appropriate isolation/level shifters: Output",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Consistency Check #3: Cross-Domain Signa",
          "snippet": "# UPF: Retention only for PC and register file set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -elements {cpu_subsystem/pc cpu_subsystem/regs} # pipeline_tag not retained (acceptable - non-critical state)"
        }
      },
      {
        "title": "15. Consistency Check #4: Retention Element Coverage",
        "content": "Verify that all flip-flops in a switched domain are either retained or documented as non-critical: Check: Are there flip-flops without retention? Are they intentionally excluded? Output",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Consistency Check #4: Retention Element ",
          "snippet": "# Makefile for automated UPF verification .PHONY: all static lint consistency simulate report all: static lint consistency simulate report # Stage 1: Static UPF syntax checking static: @echo \"=== Running UPF Static Checks ===\" vcs -sverilog -upf top_level.upf -upf_check_only design/*.sv \\ 2>&1 | tee logs/upf_static.log @grep -q \"ERROR\" logs/upf_static.log && exit 1 || exit 0 # Stage 2: UPF linting lint: @echo \"=== Running UPF Linting ===\" spyglass -project upf_lint.prj -batch \\ 2>&1 | tee logs/upf_lint.log @grep -q \"LINT-ERROR\" logs/upf_lint.log && exit 1 || exit 0 # Stage 3: UPF-RTL consistency validation consistency: @echo \"=== Running UPF-RTL Consistency Checks ===\" python3 scripts/upf_consistency_check.py \\ --upf top_level.upf \\ --rtl design/*.sv \\ --report logs/consistency.rpt @grep -q \"ERROR\" logs/consistency.rpt && exit 1 || exit 0 # Stage 4: Power-aware simulation simulate: @echo \"=== Running Power-Aware Simulation ===\" vcs -sverilog -upf top_level.upf -full64 \\ -debug_access+all design/*.sv testbench/power_tb.sv ./simv +upf_iso_warn +upf_ret_warn \\ 2>&1 | tee logs/simulation.log @grep -q \"UPF-ERROR\" logs/simulation.log && exit 1 || exit 0 # Stage 5: Generate summary report report: @echo \"=== Generating UPF Verification Report ===\" python3 scripts/generate_upf_report.py \\ --static logs/upf_static.log \\ --lint logs/upf_lint.log \\ --consistency logs/consistency.rpt \\ --simulation logs/simulation.log \\ --output reports/upf_verification_summary.html @echo \"Report available at: reports/upf_verification_summary.html\" clean: rm -rf logs/* reports/* simv* csrc ucli.key"
        }
      },
      {
        "title": "16. Automated Verification Flow",
        "content": "Integrate UPF verification into continuous integration (CI) for automated checking on every commit.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Automated Verification Flow",
          "snippet": "# WRONG: Jump straight to simulation vcs -sverilog -upf buggy.upf design/*.sv ./simv # Simulation crashes due to UPF syntax errors # CORRECT: Static check first vcs -sverilog -upf buggy.upf -upf_check_only design/*.sv # Fix errors, then simulate vcs -sverilog -upf fixed.upf design/*.sv ./simv"
        }
      },
      {
        "title": "17. Multi-Stage Verification Makefile",
        "content": "Run make static first to catch syntax errors quickly (takes seconds), then make lint for quality checks (takes minutes), then make consistency , and finally make simulate for the slowest but most comprehensive checks. Fix errors at each layer before proceeding to the next.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Multi-Stage Verification Makefile",
          "snippet": "# Developer makes quick UPF change $ vi top_level.upf # Change isolation location from self to parent $ git commit -m \"Fix isolation placement\" $ git push # No verification run - breaks synthesis!"
        }
      },
      {
        "title": "18. Common Beginner Mistakes",
        "content": "Mistake #1: Skipping static checks before simulation Why? Static checks take seconds and catch basic errors. Simulation takes minutes to hours. Always run fast checks first. Mistake #2: Ignoring lint warnings Output Problem: Warnings indicate real issues that cause area/power/performance overhead or functional bugs. Treat warnings as errors during development. Mistake #3: Not verifying after UPF changes Fix: Always run verification after UPF changes, just like RTL changes: Mistake #4: Not maintaining verification documentation Document intentional exceptions to verification rules: Why? Waivers document design decisions and prevent the same warnings from being investigated repeatedly by different engineers.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Beginner Mistakes",
          "snippet": "$ vi top_level.upf $ make all # Runs static, lint, consistency, simulate $ git commit -m \"Fix isolation placement (verified)\" $ git push"
        }
      },
      {
        "title": "19. Practice Exercise",
        "content": "Challenge: Build UPF Verification Script You've inherited a UPF file from a previous engineer. Your task is to create a comprehensive verification script that checks for common issues. Given buggy UPF file: Task: Create a verification script that detects: Undefined supply nets used before definition Power domain instances that don't exist in RTL Control signals that don't exist in RTL Isolation cells using powered-down supply Isolation cells in wrong location (self vs. parent) Retention cells using non-always-on supply Switchable domains without isolation Hint 1 Parse the UPF file sequentially, tracking defined entities (supply nets, domains) in a dictionary. Flag any usage before definition. Hint 2 For RTL consistency, you'll need to parse the RTL to extract instance names and signal names. Use regular expressions to match module_name instance_name ( and logic signal_name patterns. Hint 3 For isolation location check: isolation in a switchable domain should use -location parent or -location fanout , not -location self . Solution A complete Python verification script would be approximately 200 lines. Key components: Parse UPF sequentially, building sets of defined_supply_nets, defined_domains, switchable_domains Parse RTL using regex to extract rtl_instances and rtl_signals Check each UPF command for: undefined references, missing RTL elements, incorrect locations/supplies Generate detailed error reports with line numbers and fix recommendations The script should exit with non-zero status if errors are found, enabling CI integration.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Practice Exercise",
          "snippet": "# legacy.upf - Inherited UPF with multiple issues create_power_domain PD_TOP -include_scope create_power_domain PD_CPU -elements {cpu_core} create_power_domain PD_GPU -elements {graphics_processor} # Renamed in RTL! # Power switch for CPU (missing supply net definition!) create_power_switch PSW_CPU -domain PD_CPU \\ -input_supply_port {vin VDD} \\ -output_supply_port {vout VDD_CPU} \\ -control_port {ctrl cpu_pwr_en} # Signal name changed in RTL! # Isolation in wrong location set_isolation ISO_CPU -domain PD_CPU \\ -isolation_supply_set SS_CPU \\ # Uses CPU supply (powers down!) -clamp_value 0 \\ -isolation_signal cpu_iso \\ -location self # Wrong - should be parent! # Retention with wrong supply set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU # Uses switchable supply! # GPU has no power management (missing isolation, switch, etc.)"
        }
      },
      {
        "title": "20. Summary",
        "content": "In this tutorial, you learned: UPF verification uses a multi-layered pyramid: static checking (fastest) ? linting ? consistency ? simulation ? formal (slowest, most comprehensive) Static checking validates UPF syntax and basic semantic correctness using simulator built-in checks UPF linting enforces quality and best practices, catching common mistakes like isolation in powered-down domains, retention without always-on supply, unnecessary level shifters, missing isolation, and incomplete retention coverage Consistency validation ensures UPF matches RTL: instance existence, control signal existence, cross-domain coverage, retention coverage Automated flows using Makefiles and CI pipelines enable verification on every commit, catching bugs early Best practices: run static checks first, treat warnings as errors, verify after every UPF change, document waivers for intentional exceptions Industry linting tools (SpyGlass LP, VC LP, JasperGold, Meridian LP) provide comprehensive rule libraries and customization",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Verification Strategies",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Verification Strategies\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-verification-strategies",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What is the primary role of Power Intent Verification (Static Rule Checking)?",
      "options": [
        "Checking syntax and verifying that every domain boundary has appropriate isolation and level shifting without running dynamic simulation",
        "Testing battery discharge rates",
        "Synthesizing standard cells into silicon",
        "Calculating gate delay times"
      ],
      "correctIndex": 0,
      "explanation": "Static UPF rule checking tools (such as Synopsys VC LP or Siemens Questa PowerCheck) statically verify structural power rules: missing isolation, wrong level shifter direction, and supply connectivity."
    }
  },
  "upf-debugging-power-intent": {
    "id": "upf-debugging-power-intent",
    "badge": "Module 5 • Power-Aware Verification",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "UPF Debugging Power Intent",
    "subtitle": "Comprehensive technical guide on upf debugging power intent within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Debug X-propagation issues using waveform analysis and tracing Diagnose retention and isolation cell failures systematically Trace power state transition violations Correlate UPF intent across simulation, synthesis, and P&R",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# Run simulation with X-propagation tracing ./simv +upf_iso_warn +upf_trace_x"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Debugging Power Intent defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. The Elusive Power Bug",
        "content": "Your power-aware simulation fails with a cryptic error: Output You have isolation cells specified for GPU outputs. They worked in thousands of previous simulations. What changed? Where exactly is the X coming from? Why isn't isolation preventing it? You load the waveform viewer, but with 50,000 signals across 8 power domains, finding the root cause feels like searching for a needle in a haystack. Without systematic debugging techniques, power intent issues can consume days of engineering time. This article teaches you the five-step framework to diagnose and fix these issues efficiently.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The Elusive Power Bug",
          "snippet": "# UPF file inspection set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -isolation_signal gpu_iso_enable \\ -location parent \\ -applies_to outputs # Should cover ALL outputs"
        }
      },
      {
        "title": "3. Five-Step Debugging Framework",
        "content": "Systematic Debugging in Action In a networking processor project, an intermittent bug appeared in only 1 out of every 200 boots: the packet processor would occasionally drop the first packet after wake-up from deep sleep. The debug team enabled comprehensive UPF tracing (+upf_trace_x +upf_verbose) and ran 10,000 simulations with randomized timing. They captured 47 failures and analyzed waveforms. Root cause: FIFO pointers lacked retention cells, causing undefined behavior when packets arrived within 50ns of restore. The systematic debug process—from bug report to fix—took 3 days instead of months, saving an estimated $3M respin.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Five-Step Debugging Framework",
          "snippet": "# Use simulator report to see actual coverage ./simv +upf_dump_isolation > isolation_report.txt"
        }
      },
      {
        "title": "4. Step 1: Identify the X Source",
        "content": "Output Question: Which signal in PD_GPU is driving the X? Use UPF Tracing to Find X-Propagation Paths Output",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Step 1: Identify the X Source",
          "snippet": "# BEFORE: Only covers outputs set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -isolation_signal gpu_iso_enable \\ -location parent \\ -applies_to outputs # Misses inout ports! # AFTER: Covers outputs and inout ports set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -isolation_signal gpu_iso_enable \\ -location parent \\ -applies_to \"outputs inouts\" # Fixed!"
        }
      },
      {
        "title": "5. Step 2: Localize Missing Isolation",
        "content": "Check UPF for isolation coverage: Problem: The isolation applies to \"outputs\", but is cache_snoop considered an output? Check Actual vs. Intended Coverage Output",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Step 2: Localize Missing Isolation",
          "snippet": "# Check retention UPF set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -save_signal {cpu_save_enable high} \\ -restore_signal {cpu_restore_enable high} # Check SS_CPU_RET definition create_supply_set SS_CPU_RET \\ -function {power VDD_CPU} \\ # BUG: Uses VDD_CPU (powers down!) -function {ground VSS}"
        }
      },
      {
        "title": "6. Step 3: Fix and Verify",
        "content": "Output Use +upf_trace_x simulator option to automatically trace X-propagation paths from powered-down domains to active logic. This saves hours of manual waveform analysis.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Step 3: Fix and Verify",
          "snippet": "# BEFORE: Retention supply powers down create_supply_set SS_CPU_RET \\ -function {power VDD_CPU} \\ # Wrong! -function {ground VSS} # AFTER: Dedicated always-on retention supply create_supply_net VDD_RET # Separate retention supply add_power_state VDD_RET \\ -state {ON 0.6} # Always on, no OFF state create_supply_set SS_CPU_RET \\ -function {power VDD_RET} \\ # Always-on supply -function {ground VSS} associate_supply_set SS_CPU_RET -handle PD_CPU"
        }
      },
      {
        "title": "7. Step 1: Check Retention Cell Supply",
        "content": "Most common cause: Retention supply powered down with domain. Problem: Retention supply set uses VDD_CPU, which powers down! Retention cells lose state. Use Waveform to Confirm Open waveforms and add these signals: Waveform analysis: Root cause confirmed: VDD_RET collapses to 0V when CPU powers down, causing retention cells to lose state.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Step 1: Check Retention Cell Supply",
          "snippet": "# GPU Power State Table add_pst GPU_PST -supplies {VDD_GPU} add_pst_state ACTIVE -state {VDD_GPU ON} # 1.0V add_pst_state DVFS -state {VDD_GPU SLOW} # 0.8V add_pst_state STANDBY -state {VDD_GPU SLEEP} # 0.6V add_pst_state POWEROFF -state {VDD_GPU OFF} # 0.0V # Legal transitions (directed graph) add_pst_transition -from ACTIVE -to DVFS add_pst_transition -from DVFS -to ACTIVE add_pst_transition -from DVFS -to STANDBY add_pst_transition -from STANDBY -to POWEROFF add_pst_transition -from POWEROFF -to ACTIVE # NOTE: No direct DVFS -> POWEROFF transition!"
        }
      },
      {
        "title": "8. Step 3: Verify Save/Restore Timing",
        "content": "Even with correct supply, timing issues can cause corruption: Retention Timing Requirements: Save must be asserted at least 5-10 cycles before power-down. Restore must be asserted at least 10-20 cycles after power-up to allow supply voltage stabilization. Violating these timings causes intermittent state corruption. Quick Check Q: Why do retention failures often appear intermittent (passing some runs, failing others)? Show Answer Retention cells have varying capture times due to process variation and routing delays. If the save signal duration or gap before power-down is marginal, faster cells complete capture successfully while slower cells don't. Small timing variations (PVT, clock jitter) affect which cells complete, causing non-deterministic failures. The solution is to provide adequate timing margin: hold save for 5+ cycles, wait 10+ cycles before power-down.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Step 3: Verify Save/Restore Timing",
          "snippet": "// Power management controller RTL always_ff @(posedge clk) begin case (power_mode) MODE_ACTIVE: gpu_voltage <= 1.0; // ACTIVE MODE_SLOW: gpu_voltage <= 0.8; // DVFS MODE_SLEEP: gpu_voltage <= 0.6; // STANDBY MODE_OFF: gpu_voltage <= 0.0; // POWEROFF endcase end // BUG: Direct transition from MODE_SLOW to MODE_OFF! always_comb begin if (deep_sleep_request && (current_mode == MODE_SLOW)) begin power_mode = MODE_OFF; // Illegal: DVFS -> POWEROFF! end end"
        }
      },
      {
        "title": "9. Step 2: Find Offending RTL Code",
        "content": "Which RTL code triggered the illegal transition?",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Step 2: Find Offending RTL Code",
          "snippet": "// FIXED: Multi-step transition through STANDBY always_comb begin if (deep_sleep_request) begin case (current_mode) MODE_ACTIVE: power_mode = MODE_SLOW; // ACTIVE -> DVFS MODE_SLOW: power_mode = MODE_SLEEP; // DVFS -> STANDBY MODE_SLEEP: power_mode = MODE_OFF; // STANDBY -> POWEROFF default: power_mode = current_mode; endcase end end"
        }
      },
      {
        "title": "10. Step 3: Fix FSM to Follow Legal Transitions",
        "content": "Result: Transition now takes 3 clock cycles (DVFS ? STANDBY ? POWEROFF) instead of 1, following legal PST path. Draw your PST as a state diagram during design. This makes illegal transitions obvious and helps you design the power controller FSM correctly from the start.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Step 3: Fix FSM to Follow Legal Transiti",
          "snippet": "// RTL design module power_controller( output logic gpu_iso_enable // Signal exists in RTL ); always_ff @(posedge clk) gpu_iso_enable <= gpu_power_enable_n; endmodule"
        }
      },
      {
        "title": "11. Step 1: Check RTL vs. Synthesis Netlist",
        "content": "RTL has the signal, so why doesn't synthesis find it? Check synthesis elaboration: Output Root cause: Synthesis optimizer removed the signal because it's driven to constant 0 in testbench configuration!",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Step 1: Check RTL vs. Synthesis Netlist",
          "snippet": "# Preserve power control signals from optimization set_dont_touch_network [get_pins power_controller/gpu_iso_enable] set_dont_touch_network [get_pins power_controller/gpu_power_enable] set_dont_touch_network [get_pins power_controller/cpu_save_enable] set_dont_touch_network [get_pins power_controller/cpu_restore_enable] # Alternative: Use UPF-aware synthesis flow set_app_var power_preserve_rtl_hier_names true"
        }
      },
      {
        "title": "12. Common Synthesis/Simulation Mismatches",
        "content": "Issue Simulation Synthesis Fix Control signal optimized away Signal exists Signal removed set_dont_touch_network Domain instance renamed Uses RTL name Uses syn name Update UPF or preserve names Hierarchical path changed RTL hierarchy Flattened Use dont_touch on modules Library cells missing Behavioral model No matching cell Add cells to library or remove strategy",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Synthesis/Simulation Mismatches",
          "snippet": "# VCS: Generate detailed UPF reports ./simv \\ +upf_dump_power_domain \\ # Domain hierarchy +upf_dump_supply_net \\ # Supply network topology +upf_dump_isolation > upf_isolation_report.txt \\ +upf_dump_retention > upf_retention_report.txt \\ +upf_dump_level_shifter > upf_level_shifter_report.txt"
        }
      },
      {
        "title": "13. Example: Isolation Coverage Report",
        "content": "Output Use this report to verify: All expected signals are covered Isolation cells use correct supply (always-on) Cells placed in correct location (parent domain) Area/power overhead is reasonable",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Example: Isolation Coverage Report",
          "snippet": "# WRONG: Basic simulation without tracing ./simv # Hard to debug - no X-propagation paths, no power state info # CORRECT: Enable comprehensive tracing ./simv +upf_trace_x +upf_dump_power_states +upf_verbose"
        }
      },
      {
        "title": "14. Common Beginner Mistakes",
        "content": "Mistake #1: Debugging without UPF tracing enabled Why? Without tracing, you must manually search waveforms for hours. Tracing automatically identifies X sources and propagation paths. Mistake #2: Not checking UPF reports before simulation Why? Static checks run in seconds and catch basic errors. Simulation takes minutes to hours. Mistake #3: Debugging one issue at a time (waterfall approach) Why? Waterfall debugging wastes time with repeated simulations. Comprehensive checking finds all issues in one run.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Beginner Mistakes",
          "snippet": "# WRONG: Jump straight to simulation vcs -upf buggy.upf design.sv ./simv # Fails with unclear errors # CORRECT: Static check first vcs -upf buggy.upf -upf_check_only design.sv # Finds errors immediately # Fix UPF errors vcs -upf fixed.upf design.sv ./simv"
        }
      },
      {
        "title": "15. Summary",
        "content": "In this tutorial, you learned: Five-step debugging framework: Identify ? Localize ? Isolate ? Analyze ? Fix X-propagation debug: Use +upf_trace_x to find sources automatically, check isolation coverage with +upf_dump_isolation reports Retention debug: Verify always-on retention supply, check save/restore timing with waveforms (5-10 cycle hold times, 10-20 cycle gaps) Power state debug: Examine PST for legal transitions, fix FSM to follow required paths Synthesis correlation: Preserve control signals with set_dont_touch_network, match hierarchical paths, verify library cells UPF reports provide detailed coverage, area, and power information for verification Enable comprehensive tracing (+upf_trace_x, +upf_verbose, +upf_dump_*) to debug efficiently",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Summary",
          "snippet": "# INEFFICIENT: Fix one error, re-run, repeat # Run 1: X-propagation error on signal A -> fix -> re-run # Run 2: X-propagation error on signal B -> fix -> re-run # Run 3: Retention error -> fix -> re-run # ... 10 iterations ... # EFFICIENT: Enable all checking, collect all errors ./simv +upf_iso_warn +upf_ret_warn +upf_trace_x +upf_verbose # Fix ALL reported issues in one pass # Re-run once to verify"
        },
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Debugging Power Intent",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Debugging Power Intent\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-debugging-power-intent",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "When debugging an 'X' propagation in power-aware simulation, what is the first signal to inspect?",
      "options": [
        "System clock frequency",
        "Isolation enable signal (iso_en) and power switch control (pwr_en) timing relative to domain shutoff",
        "Baud rate generator",
        "Testbench random seed"
      ],
      "correctIndex": 1,
      "explanation": "Most X-leaks stem from timing bugs in the PMU sequence: either isolation was enabled too late, or disabled too early before power-good was asserted."
    }
  },
  "upf-formal-verification": {
    "id": "upf-formal-verification",
    "badge": "Module 5 • Power-Aware Verification",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "UPF Formal Verification",
    "subtitle": "Comprehensive technical guide on upf formal verification within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Understand formal verification principles for power management Write assertions (SVA) for power intent properties Use formal tools to prove isolation and retention correctness Apply formal verification to validate power state machines",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "// Basic assertion structure assert property (@(posedge clk) disable iff (!rst_n) condition |-> consequence );"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Formal Verification defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. The Bug Simulation Can't Find",
        "content": "Your power-aware simulation runs 50,000 test vectors with 100% coverage. Every power domain, every state transition, every retention/isolation scenario—all thoroughly tested. Tape-out is next week. Then a verification engineer suggests formal verification. You're skeptical—if 50,000 tests didn't find issues, how could a mathematical tool help? But you run it anyway. Within 2 hours, the formal tool reports a counterexample: Output The bug is real. Fixing it before tape-out saves a $4M respin. Formal verification explores ALL possible behaviors mathematically, finding bugs that simulation would take billions of cycles to discover. For power management—where subtle corner cases can cause catastrophic failures—formal is essential.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: The Bug Simulation Can't Find",
          "snippet": "// Property: When GPU powers down, isolation prevents X-propagation property iso_prevents_x_propagation; @(posedge clk) disable iff (!rst_n) ($fell(gpu_power_enable)) // GPU powers down |-> ##1 !$isunknown(noc_router_input) // Next cycle: no X on NOC input endproperty assert property (iso_prevents_x_propagation) else $error(\"X-propagation detected from GPU to NOC\");"
        }
      },
      {
        "title": "3. Simulation vs. Formal",
        "content": "Aspect Simulation Formal Verification Coverage Finite test cases Exhaustive (all possibilities) Runtime Hours to days Minutes to hours Completeness Never 100% Mathematical proof (100%) Corner cases Depends on tests Automatically discovered Result \"Tests passed\" \"Property proven\" or counterexample",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Simulation vs. Formal",
          "snippet": "// Property: CPU state retained across power cycle logic [31:0] saved_pc; sequence power_down_sequence; (cpu_save_enable ##1 !cpu_save_enable ##1 !cpu_power_enable); endsequence sequence power_up_sequence; (cpu_power_enable ##[10:100] cpu_restore_enable); endsequence property retention_correctness; @(posedge clk) disable iff (!rst_n) (power_down_sequence, saved_pc = cpu_pc) // Save PC value ##1 !cpu_power_enable [*1:$] // Stay powered down ##1 power_up_sequence // Power back up |-> ##2 (cpu_pc == saved_pc) // PC value preserved endproperty assert property (retention_correctness) else $error(\"Retention failed: PC corrupted\");"
        }
      },
      {
        "title": "4. How Formal Works",
        "content": "Formal verification tools use mathematical techniques (model checking, SAT solving) to explore the entire state space of your design: Think of formal verification as asking the tool: \"Is there ANY way to violate this property?\" If the tool says \"no\" and provides a proof, you have mathematical certainty.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: How Formal Works",
          "snippet": "// Property: IO domain must be on for 10 cycles before core powers up property io_powers_up_first; @(posedge clk) disable iff (!rst_n) $rose(core_power_enable) |-> $past(io_power_enable, 10) && // IO was on 10 cycles ago $past(io_power_enable, 9) && // ... and 9 cycles ago $past(io_power_enable, 8) && // ... and 8 cycles ago // ... (or use $stable for cleaner expression) $stable(io_power_enable, 10)[*10] // IO stable for 10 cycles endproperty assert property (io_powers_up_first) else $error(\"Core powered up before IO stable\");"
        }
      },
      {
        "title": "5. Writing Power Intent Assertions (SVA)",
        "content": "System Verilog Assertions (SVA) specify properties that must always hold.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Writing Power Intent Assertions (SVA)",
          "snippet": "// Property: GPU cannot go directly from DVFS to POWEROFF property no_direct_dvfs_to_poweroff; @(posedge clk) disable iff (!rst_n) (gpu_state == DVFS) ##1 (gpu_state == POWEROFF) |-> 1'b0 // This transition is always illegal endproperty assert property (no_direct_dvfs_to_poweroff) else $error(\"Illegal power state transition: DVFS -> POWEROFF\");"
        }
      },
      {
        "title": "6. Assertion #4: Illegal State Transition Detection",
        "content": "Quick Check Q: What's the difference between an assertion failing in simulation vs. formal verification? Show Answer In simulation, an assertion failure means your specific test case triggered the bug. In formal verification, if the tool cannot prove the assertion, it provides a counterexample—the minimal input sequence that violates the property. This counterexample often reveals corner cases you never thought to test. Conversely, if formal proves the assertion, it's a mathematical guarantee the property holds for ALL possible inputs, not just the cases you tested.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Assertion #4: Illegal State Transition D",
          "snippet": "# JasperGold formal verification script analyze -sv design.sv assertions.sv upf_assertions.sv elaborate -top top_design # Load UPF upf load_upf top_level.upf # Clock and reset setup clock clk reset -expression {!rst_n} # Prove assertions prove -all # Check results report -results"
        }
      },
      {
        "title": "7. Common Beginner Mistakes",
        "content": "Mistake #1: Over-constraining the environment Why? Over-constraining limits the state space exploration, potentially hiding bugs that occur in scenarios you've assumed away. Mistake #2: Assertions that are too weak Mistake #3: Not handling inconclusive results Output Fix: Increase proof depth, add constraints to reduce state space, or break property into smaller sub-properties.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Beginner Mistakes",
          "snippet": "# VC Formal script analyze -format sverilog design.sv assertions.sv elaborate top_design # Load UPF for power-aware formal upf_load_upf top_level.upf # Setup clock clk reset rst_n # Run formal verification prove -property {iso_prevents_x_propagation} prove -property {retention_correctness} prove -property {io_powers_up_first} # Generate report report -summary"
        }
      },
      {
        "title": "8. Summary",
        "content": "In this tutorial, you learned: Formal verification provides exhaustive mathematical proofs of correctness, finding corner cases simulation would never discover SVA assertions specify power intent properties: isolation completeness, retention correctness, power sequencing, state transitions Industry tools (JasperGold, VC Formal) prove assertions or provide counterexamples showing bugs Formal results: PROVEN (mathematical guarantee), FAIL (counterexample with minimal trace), INCONCLUSIVE (needs deeper analysis) Common patterns: isolation completeness checks, retention coverage verification, power sequencing validation Avoid over-constraining (hides bugs) and weak assertions (doesn't catch all violations) Formal complements simulation: use simulation for functional coverage, formal for exhaustive property verification",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Summary",
          "snippet": "// Verify ALL cross-domain signals have isolation genvar i; generate for (i = 0; i < NUM_GPU_OUTPUTS; i++) begin : gen_iso_check assert property (@(posedge clk) disable iff (!rst_n) !gpu_power_enable |-> !$isunknown(noc_inputs[i]) ); end endgenerate"
        },
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Formal Verification",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Formal Verification\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-formal-verification",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "How does Formal Equivalence Checking (LEC) verify power intent?",
      "options": [
        "By comparing simulated clock cycles",
        "By proving mathematically that RTL + UPF is functionally equivalent to the synthesized gate-level netlist with power cells inserted",
        "By measuring thermal dissipation on a test wafer",
        "By compiling C code into machine assembly"
      ],
      "correctIndex": 1,
      "explanation": "Equivalence checking tools mathematically prove that the synthesized gate netlist (containing isolation cells, retention registers, and level shifters) behaves identically to the golden RTL under all power states."
    }
  },
  "upf-power-aware-synthesis": {
    "id": "upf-power-aware-synthesis",
    "badge": "Module 6 • Implementation & Optimization",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "UPF Power Aware Synthesis",
    "subtitle": "Comprehensive technical guide on upf power aware synthesis within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Configure power-aware synthesis flows in Design Compiler Insert and verify isolation, retention, and level shifter cells Optimize multi-Vt cell selection for leakage power reduction Validate UPF consistency between RTL and gate-level netlists",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# dc_setup.tcl - Power-aware synthesis flow # 1. Setup library and design set target_library \"your_lib.db\" set link_library \"* $target_library\" # 2. Read RTL analyze -format sverilog design/*.sv elaborate top_design # 3. Load UPF BEFORE constraints (critical!) load_upf top_level.upf # 4. Check UPF consistency check_mv_design -verbose # Must pass before proceeding! # 5. Load constraints source constraints.tcl # 6. Configure power-aware synthesis set_mv_flow true set_power_prediction true # Enable power analysis # 7. Link design with multi-voltage awareness link_mv # 8. Compile with power optimization compile_ultra -gate_clock -no_autoungroup \\ -power # Enable power optimization # 9. Check results report_mv_design -verbose report_power -hierarchy # 10. Write outputs write -format verilog -hierarchy -output synth_netlist.v write_upf synth_netlist.upf # Updated UPF for gate-level"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Power Aware Synthesis defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. From UPF to Gates",
        "content": "You've written comprehensive UPF for your multi-domain SoC. Verification passed—simulation shows perfect isolation, retention works flawlessly, and formal verification proved correctness. Now comes synthesis: transforming RTL and UPF into gates. You run standard synthesis. It completes successfully, reporting excellent area and timing. But when you check the netlist, you discover: Zero isolation cells inserted (X-propagation will occur) Zero retention cells inserted (state will be lost) All domains use the same supply (no power gating possible) No level shifters between voltage domains (potential corruption) Standard synthesis ignored your UPF completely. Power-aware synthesis is not optional—it's mandatory. Standard synthesis tools ignore UPF and produce netlists that violate power intent. You must use power-aware synthesis flows (Design Compiler with UPF support) to correctly implement low-power designs. Power-Aware Synthesis in Practice A mobile processor design had 8 power domains with 2,400 isolation cells, 800 retention flip-flops, and 150 level shifters. The first power-aware synthesis run took 6 hours and consumed 45,000 um² for special cells (3% of total area). After optimizing cell placement and using smaller library cells, area dropped to 28,000 um² (1.8%) while maintaining all power management functionality. The key: iterative refinement of UPF and synthesis constraints to balance area, timing, and power.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: From UPF to Gates",
          "snippet": "# UPF specification set_isolation ISO_GPU -domain PD_GPU \\ -isolation_supply_set SS_TOP \\ -isolation_signal gpu_iso_enable \\ -clamp_value 0 \\ -location parent"
        }
      },
      {
        "title": "3. Standard vs. Power-Aware Synthesis",
        "content": "Stage Standard Synthesis Power-Aware Synthesis Input RTL + constraints RTL + constraints + UPF Optimization Area, timing, dynamic power + Leakage power, multi-Vt Special cells None Isolation, retention, level shifters Domain awareness Single domain Multiple power domains Supply networks Single VDD/VSS Multiple supplies per domain Output Gate netlist Gate netlist + UPF netlist",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Standard vs. Power-Aware Synthesis",
          "snippet": "// Before synthesis (RTL) module top; logic [31:0] gpu_data; gpu_core gpu_inst(.data_out(gpu_data)); noc_router noc(.gpu_input(gpu_data)); endmodule // After synthesis (gate-level netlist) module top; wire [31:0] gpu_data; wire [31:0] gpu_data_iso; // Isolated version gpu_core gpu_inst(.data_out(gpu_data)); // Synthesis inserted 32 isolation cells ISO_CELL_AND iso_0 (.A(gpu_data[0]), .EN(gpu_iso_enable), .Z(gpu_data_iso[0])); ISO_CELL_AND iso_1 (.A(gpu_data[1]), .EN(gpu_iso_enable), .Z(gpu_data_iso[1])); // ... iso_2 through iso_31 ... noc_router noc(.gpu_input(gpu_data_iso)); // Receives isolated signals endmodule"
        }
      },
      {
        "title": "4. Design Compiler Power-Aware Flow",
        "content": "Critical: Load UPF before constraints. The synthesis tool needs to understand power domains before applying timing constraints, as constraints may be domain-specific.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Design Compiler Power-Aware Flow",
          "snippet": "# Check isolation cell insertion report_mv_design -isolation # Output shows: # Isolation Strategy: ISO_GPU # Signals covered: 47 # Cells inserted: 47 # Cell types: ISO_CELL_AND (47) # Total area: 2,340 um²"
        }
      },
      {
        "title": "5. Automatic Insertion by Synthesis",
        "content": "When you specify isolation in UPF, synthesis automatically inserts isolation cells: Synthesis inserts:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Automatic Insertion by Synthesis",
          "snippet": "# UPF specification set_retention RET_CPU -domain PD_CPU \\ -retention_supply_set SS_CPU_RET \\ -save_signal {cpu_save_enable high} \\ -restore_signal {cpu_restore_enable high} # Map to retention cells in library map_retention_cell RET_CPU \\ -lib_cells {DFFR_X1} # Retention flip-flop from liberty"
        }
      },
      {
        "title": "6. Verifying Isolation Insertion",
        "content": "Quick Check Q: Why does synthesis insert isolation cells automatically instead of requiring manual instantiation in RTL? Show Answer Manual instantiation would require modifying RTL with power management logic, breaking the separation of concerns between functional design and power intent. Automatic insertion by synthesis keeps RTL clean and functional, with all power management specified declaratively in UPF. This enables IP reuse (same RTL, different UPF for different integrations) and simplifies verification (verify functional RTL separately from power intent).",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Verifying Isolation Insertion",
          "snippet": "// Before synthesis (RTL) always_ff @(posedge clk) if (rst_n) pc <= next_pc; // After synthesis (gate-level) DFFR_X1 pc_reg_0 ( .D(next_pc[0]), .CK(clk), .RN(rst_n), .SAVE(cpu_save_enable), // Retention control .RESTORE(cpu_restore_enable), // Retention control .VRET(VDD_RET), // Always-on retention supply .Q(pc[0]) ); // ... pc_reg_1 through pc_reg_31 ..."
        }
      },
      {
        "title": "7. Retention Register Mapping",
        "content": "Synthesis replaces standard flip-flops with retention flip-flops: Synthesis transforms:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Retention Register Mapping",
          "snippet": "# Check retention cell insertion report_mv_design -retention # Output: # Retention Strategy: RET_CPU # Sequential elements in domain: 1,057 # Retention elements specified: 1,056 # Retention cells inserted: 1,056 # Cell types: DFFR_X1 (1,056) # Coverage: 99.9% # Missing: cpu_subsystem/pipeline_tag (intentionally excluded)"
        }
      },
      {
        "title": "8. Multi-Vt Optimization",
        "content": "Modern libraries provide multiple threshold voltage (Vt) variants of each cell: LVT (Low Vt): Fast, high leakage power RVT (Regular Vt): Balanced speed and leakage HVT (High Vt): Slow, low leakage power",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Multi-Vt Optimization",
          "snippet": "# UPF specification set_level_shifter LS_CPU_TO_GPU -domain PD_GPU \\ -applies_to inputs \\ -source PD_CPU \\ -location automatic # Let synthesis decide placement"
        }
      },
      {
        "title": "9. Multi-Vt Cell Selection Strategy",
        "content": "Synthesis result: Multi-Vt optimization is one of the most effective leakage reduction techniques, typically achieving 40-50% leakage savings with minimal area/timing impact. Always enable it in power-aware synthesis.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Multi-Vt Cell Selection Strategy",
          "snippet": "// RTL: CPU (1.0V) drives GPU (0.8V) module top; logic [31:0] cpu_to_gpu; cpu_core cpu(.data_out(cpu_to_gpu)); // 1.0V domain gpu_core gpu(.data_in(cpu_to_gpu)); // 0.8V domain endmodule // Gate-level: Level shifters inserted module top; wire [31:0] cpu_to_gpu; wire [31:0] cpu_to_gpu_shifted; // Level-shifted version cpu_core cpu(.data_out(cpu_to_gpu)); // 1.0V // Synthesis inserted 32 level shifters LS_HL_X1 ls_0 (.A(cpu_to_gpu[0]), .Z(cpu_to_gpu_shifted[0])); // LS_HL_X1: High-to-Low level shifter (1.0V -> 0.8V) // ... ls_1 through ls_31 ... gpu_core gpu(.data_in(cpu_to_gpu_shifted)); // 0.8V endmodule"
        }
      },
      {
        "title": "10. Common Beginner Mistakes",
        "content": "Mistake #1: Loading UPF after constraints Why? Constraints may reference power domains. Loading UPF first ensures domains exist when constraints are applied. Mistake #2: Missing library cell mappings Mistake #3: Not verifying special cell insertion",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Common Beginner Mistakes",
          "snippet": "# Configure multi-Vt optimization set_multi_vth_constraint \\ -type soft \\ -lvt_percentage 10 \\ # 10% LVT cells (critical paths) -hvt_percentage 60 # 60% HVT cells (non-critical paths) # Remaining 30% = RVT # Compile with multi-Vt optimization compile_ultra -gate_clock -power"
        }
      },
      {
        "title": "11. Summary",
        "content": "In this tutorial, you learned: Power-aware synthesis extends standard synthesis to handle multiple power domains, special cells, and leakage optimization Load UPF before constraints, check consistency with check_mv_design, enable multi-voltage flow Synthesis automatically inserts isolation cells, retention flip-flops, and level shifters based on UPF specifications Verify special cell insertion with report_mv_design commands before writing netlist Multi-Vt optimization achieves 40-50% leakage reduction by using HVT cells on non-critical paths Always map retention/isolation strategies to library cells before synthesis Output includes both gate-level netlist and updated UPF for physical implementation",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Summary",
          "snippet": "# WRONG: Constraints loaded before UPF source constraints.tcl load_upf top_level.upf # Too late! # CORRECT: UPF before constraints load_upf top_level.upf source constraints.tcl"
        },
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Power Aware Synthesis",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Power Aware Synthesis\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-power-aware-synthesis",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What does a logic synthesis tool (e.g., Synopsys Design Compiler) do when given RTL and a UPF file?",
      "options": [
        "It ignores the UPF file and produces standard gates",
        "It reads the UPF, partitions the design into domains, and automatically instantiates level shifters, isolation cells, and power switches from the target library",
        "It only generates timing reports",
        "It prints the UPF code as comments in the netlist"
      ],
      "correctIndex": 1,
      "explanation": "Power-aware synthesis reads the UPF specifications and automatically infers and maps the necessary power-management cells (level shifters, isolation gates, retention flops) from the standard cell library."
    }
  },
  "upf-library-cells-for-low-power": {
    "id": "upf-library-cells-for-low-power",
    "badge": "Module 6 • Implementation & Optimization",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "UPF Library Cells for Low Power",
    "subtitle": "Comprehensive technical guide on upf library cells for low power within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Understand isolation cell types and selection criteria Learn retention flip-flop architecture and timing requirements Master level shifter variants for different voltage transitions Apply multi-Vt cells for leakage power optimization",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "// ISO_AND cell schematic module ISO_AND ( input A, // Data input (from powered-down domain) input EN, // Isolation enable (always-on supply) output Z // Isolated output (to always-on domain) ); // Powered by always-on supply (VDD_AON) // When EN=0: Z=0 (isolated/clamped) // When EN=1: Z=A (pass-through) assign Z = A & EN; endmodule // ISO_OR cell schematic module ISO_OR ( input A, input EN, output Z ); // When EN=0: Z=1 (isolated/clamped) // When EN=1: Z=A (pass-through) assign Z = A | ~EN; endmodule"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Library Cells for Low Power defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. The Library Cell Foundation",
        "content": "Your UPF specifies isolation, retention, and level shifters. Synthesis transforms this intent into gates. But which gates? Standard AND gates can't function without power. Standard flip-flops lose state when power is removed. Standard buffers can't safely translate between voltage levels. Low-power design requires specialized library cells engineered specifically for power management scenarios. Using incorrect library cells—or cells not designed for power management—causes functional failures in silicon. Isolation cells without always-on supply capability allow X-propagation. Retention cells without proper power domains lose state. Level shifters without correct voltage tolerance cause signal corruption.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: The Library Cell Foundation",
          "snippet": "// Retention flip-flop (DFFR) module DFFR_X1 ( input D, // Data input input CK, // Clock input RN, // Active-low reset input SAVE, // Save trigger (capture to shadow latch) input RESTORE, // Restore trigger (restore from shadow) output Q, // Data output // Power pins input VDD, // Primary supply (switchable) input VDD_RET, // Retention supply (always-on, typically 0.6V) input VSS // Ground ); // Internal: master/slave latches (VDD powered) // Internal: shadow latch (VDD_RET powered) // Normal operation: Q follows D on CK rising edge // SAVE=1: Shadow latch captures current Q value // VDD powers down: Shadow latch retains value // VDD powers up: Q is X until... // RESTORE=1: Q restored from shadow latch endmodule"
        }
      },
      {
        "title": "3. Isolation Cell Purpose",
        "content": "When a domain powers down, its outputs become X (unknown). Isolation cells prevent this X-propagation by clamping signals to known values (0 or 1) using an always-on supply.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Isolation Cell Purpose",
          "snippet": "// LS_HL: 1.0V input to 0.8V output module LS_HL_X1 ( input A, // Input (high voltage domain, e.g., 1.0V) output Z, // Output (low voltage domain, e.g., 0.8V) input VDDH, // High voltage supply (1.0V) input VDDL, // Low voltage supply (0.8V) input VSS ); // Simple buffer architecture works because: // - 1.0V logic-high easily recognized as high by 0.8V domain // - 0V logic-low is 0V in both domains // BUT: Input protection needed to prevent PMOS gate oxide stress endmodule"
        }
      },
      {
        "title": "4. Isolation Cell Types",
        "content": "Cell Type Clamp Value Logic Function Use Case ISO_AND 0 Z = A & EN Active-low signals ISO_OR 1 Z = A | ~EN Active-high signals ISO_LO 0 Z = EN ? A : 0 Clamp to logic 0 ISO_HI 1 Z = EN ? A : 1 Clamp to logic 1",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Isolation Cell Types",
          "snippet": "// LS_LH: 0.8V input to 1.0V output module LS_LH_X1 ( input A, // Input (low voltage domain, e.g., 0.8V) output Z, // Output (high voltage domain, e.g., 1.0V) input VDDL, // Low voltage supply (0.8V) input VDDH, // High voltage supply (1.0V) input VSS ); // More complex: cross-coupled PMOS pull-up // Required because 0.8V input insufficient to fully switch // NMOS transistors in 1.0V domain // Slower than LS_HL due to cross-coupled feedback settling endmodule"
        }
      },
      {
        "title": "5. Selection Criteria",
        "content": "Clamp value: Match signal semantics (0 for active-low, 1 for active-high) Drive strength: Match fanout load (X1, X2, X4, X8) Area: Minimize for non-critical paths Supply pins: Ensure cell supports always-on supply connection Quick Check Q: Why can't a standard AND gate be used for isolation? Show Answer A standard AND gate is powered by the domain's primary supply. When the domain powers down, the AND gate itself loses power and its output becomes X—the exact problem isolation is meant to prevent. Isolation cells must be powered by an always-on supply independent of the domain being isolated, ensuring they remain functional and drive the clamp value even when the source domain is off.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Selection Criteria",
          "snippet": "// WRONG: Using LS_HL for low-to-high transition // 0.8V domain drives 1.0V domain with LS_HL cell LS_HL ls_wrong (.A(signal_08v), .Z(signal_10v)); // Result: Insufficient voltage swing, signal corruption // CORRECT: Use LS_LH for low-to-high LS_LH ls_correct (.A(signal_08v), .Z(signal_10v));"
        }
      },
      {
        "title": "6. Retention Cell Architecture",
        "content": "Retention flip-flops extend standard flip-flops with shadow latches powered by always-on retention supply:"
      },
      {
        "title": "7. Level Shifter Types",
        "content": "Different voltage transitions require different level shifter architectures: Type Transition Architecture Delay LS_HL High ? Low (1.0V ? 0.8V) Pass-through buffer Fast (~50ps) LS_LH Low ? High (0.8V ? 1.0V) Cross-coupled inverters Slow (~200ps) LS_DUAL Bidirectional Combined HL + LH Varies"
      },
      {
        "title": "8. Threshold Voltage Trade-offs",
        "content": "Modern libraries provide three Vt variants for each cell: Vt Type Speed Leakage Area Use Case LVT Fastest Highest Smallest Critical timing paths RVT Medium Medium Medium Moderate paths HVT Slowest Lowest Largest Non-critical paths"
      },
      {
        "title": "9. Leakage Power Comparison",
        "content": "Multi-Vt optimization is the single most effective leakage reduction technique, typically achieving 40-50% savings with minimal area/timing impact. Always specify multi-Vt constraints in synthesis."
      },
      {
        "title": "10. Common Beginner Mistakes",
        "content": "Mistake #1: Using isolation cells without always-on supply Symptom: X-propagation occurs despite isolation specified in UPF. Cause: Selected library cells don't support separate always-on supply pin. Fix: Verify library cells have VDD_AON pin distinct from domain VDD. Mistake #2: Insufficient retention cell hold time Symptom: Intermittent retention failures (some FFs lose state). Cause: SAVE pulse too short—slow FFs don't complete capture. Fix: Hold SAVE for =5 clock cycles, wait =10 cycles before power-down. Mistake #3: Wrong level shifter direction Mistake #4: Over-using LVT cells Impact: 3-5× higher leakage power for minimal timing benefit. Fix: Use LVT only on critical paths (10-15% of design). Use HVT on all non-critical paths (60-70%)."
      },
      {
        "title": "11. Summary",
        "content": "In this tutorial, you learned: Isolation cells (ISO_AND, ISO_OR, ISO_LO, ISO_HI) clamp signals using always-on supply, preventing X-propagation from powered-down domains Retention flip-flops use shadow latches with always-on retention supply to preserve state during power-down Level shifters translate between voltage domains: LS_HL (high-to-low, fast), LS_LH (low-to-high, slow) Multi-Vt cells (LVT/RVT/HVT) provide leakage-speed trade-offs: use LVT sparingly on critical paths, HVT extensively on non-critical paths Cell selection criteria: clamp value, drive strength, area, supply pin compatibility Retention timing: SAVE for 5+ cycles, wait 10+ cycles before power-down, restore after 20+ cycles of power-up Multi-Vt optimization achieves 40-50% leakage reduction with ~2% area overhead",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Library Cells for Low Power",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Library Cells for Low Power\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-library-cells-for-low-power",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What defines an Always-On (AON) buffer in a standard cell library?",
      "options": [
        "It has two independent power pins: a secondary continuous supply to keep it alive even when routed inside a switchable domain",
        "It operates without any power supply connection",
        "It has twice the clock speed of normal buffers",
        "It can only be used on output pins"
      ],
      "correctIndex": 0,
      "explanation": "AON cells feature continuous secondary power rails (or dedicated well connections) that remain energized even when surrounded by logic connected to a switched power rail."
    }
  },
  "upf-power-optimization": {
    "id": "upf-power-optimization",
    "badge": "Module 6 • Implementation & Optimization",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "UPF Power Optimization",
    "subtitle": "Comprehensive technical guide on upf power optimization within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Apply clock gating to reduce dynamic power by 30-40% Implement operand isolation to prevent unnecessary switching Optimize memory power management for SRAM and caches Configure DVFS for runtime power-performance trade-offs",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# Design Compiler clock gating flow compile_ultra -gate_clock \\ -gate_clock_style latch \\ # Latch-based gating (safer) -clock_gating_min_bitwidth 4 # Gate registers =4 bits # Report clock gating results report_clock_gating -verbose # Output: # Register banks with clock gating: # cpu_regs[31:0]: 32 FFs gated (saves 4.2mW) # pipeline_stage1[63:0]: 64 FFs gated (saves 7.8mW) # cache_tag_array[127:0]: 128 FFs gated (saves 12.3mW) # Total dynamic power reduction: 35%"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Power Optimization defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. The Power Optimization Stack",
        "content": "Your SoC has UPF power domains, multi-Vt optimization, and all special cells correctly inserted. Power analysis shows 2.5W consumption. Your target is 1.5W. UPF got you partway, but you need additional optimization techniques to meet the power budget. Power optimization operates at multiple levels: Architecture: DVFS, power gating granularity RTL: Clock gating, operand isolation, FSM encoding Synthesis: Multi-Vt, gate sizing, retiming Physical: Placement, routing, cell proximity Power optimization is iterative, not one-time. Each technique interacts with others—clock gating affects timing, multi-Vt affects area, DVFS affects power domains. Expect 3-5 optimization iterations to converge on the optimal solution.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: The Power Optimization Stack",
          "snippet": "// Before: FSM clock always active always_ff @(posedge clk) if (rst_n) state <= next_state; // After: Clock gating based on activity logic fsm_enable; assign fsm_enable = (state != IDLE) || (start_req); always_ff @(posedge clk) if (rst_n && fsm_enable) state <= next_state; // Synthesis inserts clock gating cell: // ICG (Integrated Clock Gate) between clk and FSM flip-flops"
        }
      },
      {
        "title": "3. Clock Power Contribution",
        "content": "Clock networks typically consume 30-40% of total dynamic power in SoCs due to: High activity factor (toggles every cycle) High fanout (drives thousands of flip-flops) Large capacitance (long wires, buffers)",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Clock Power Contribution",
          "snippet": "// ALU always operates, even when result unused always_comb begin alu_result = operand_a + operand_b; // Always computes if (alu_enable) output_reg <= alu_result; // Only used when enabled else output_reg <= output_reg; // Result discarded! end // Problem: ALU toggles on every cycle, wasting power"
        }
      },
      {
        "title": "4. Manual Clock Gating for FSMs",
        "content": "Clock gating is the highest ROI power optimization, typically achieving 30-40% dynamic power reduction with minimal area overhead (< 1%) and no performance impact.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Manual Clock Gating for FSMs",
          "snippet": "// Isolate ALU operands when disabled logic [31:0] alu_a_gated, alu_b_gated; assign alu_a_gated = alu_enable ? operand_a : 32'b0; assign alu_b_gated = alu_enable ? operand_b : 32'b0; always_comb begin alu_result = alu_a_gated + alu_b_gated; // No switching when disabled if (alu_enable) output_reg <= alu_result; else output_reg <= output_reg; end // Power savings: 60-80% when ALU disabled (typical utilization: 30%) // Net savings: ~20% of ALU power"
        }
      },
      {
        "title": "5. Unnecessary Switching Problem",
        "content": "Functional units consume power even when their outputs are discarded:",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Unnecessary Switching Problem",
          "snippet": "// L2 cache with power management module l2_cache ( input logic [31:0] addr, input logic rd_req, wr_req, input logic [1:0] power_mode, // 00=Active, 01=Idle, 10=Drowsy, 11=Off output logic [127:0] data_out ); // SRAM banks (4 x 64KB) sram_bank bank0 (.power_mode(bank0_mode), ...); sram_bank bank1 (.power_mode(bank1_mode), ...); sram_bank bank2 (.power_mode(bank2_mode), ...); sram_bank bank3 (.power_mode(bank3_mode), ...); // Bank-level power management always_comb begin // Active bank for current access active_bank = addr[17:16]; // Put inactive banks in Drowsy mode bank0_mode = (active_bank == 0) ? power_mode : 2'b10; // Drowsy bank1_mode = (active_bank == 1) ? power_mode : 2'b10; bank2_mode = (active_bank == 2) ? power_mode : 2'b10; bank3_mode = (active_bank == 3) ? power_mode : 2'b10; end // Power savings: 75% when 1/4 banks active endmodule"
        }
      },
      {
        "title": "6. SRAM Power Modes",
        "content": "SRAM arrays support multiple power modes: Mode Power Access Time Data Retention Wake-up Time Active 100% Normal Yes 0 Idle 40% N/A Yes 0 (instant) Drowsy 10% N/A Yes 2-5 cycles Power-Down 1% N/A No (loses data) 10-20 cycles",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: SRAM Power Modes",
          "snippet": "// DVFS controller monitors workload and adjusts voltage/frequency module dvfs_controller ( input logic [31:0] cpu_utilization, // 0-100% input logic [31:0] temp_sensor, // Die temperature output logic [1:0] operating_point // 00=Low, 01=Eco, 10=Normal, 11=Turbo ); always_comb begin // High utilization + low temp: Turbo mode if (cpu_utilization > 80 && temp_sensor < 85) operating_point = 2'b11; // Turbo // High utilization + high temp: Normal mode (thermal limit) else if (cpu_utilization > 60) operating_point = 2'b10; // Normal // Medium utilization: Eco mode else if (cpu_utilization > 30) operating_point = 2'b01; // Eco // Low utilization: Low power mode else operating_point = 2'b00; // Low end endmodule"
        }
      },
      {
        "title": "7. Cache Power Management Example",
        "content": "Quick Check Q: Why use Drowsy mode instead of Power-Down for inactive cache banks? Show Answer Drowsy mode retains data with 90% power savings and 2-5 cycle wake-up. Power-Down saves 99% power but loses data (requiring cache flush/reload) and takes 10-20 cycles to wake. For cache banks accessed intermittently (every 10-100 cycles), Drowsy provides better energy-performance trade-off. Power-Down is better for banks unused for 1000+ cycles."
      },
      {
        "title": "8. DVFS Operating Points",
        "content": "DVFS trades performance for power by reducing voltage and frequency: Mode Voltage Frequency Power Performance Turbo 1.1V 2.5 GHz 100% 100% Normal 1.0V 2.0 GHz 64% 80% Eco 0.9V 1.5 GHz 41% 60% Low 0.8V 1.0 GHz 26% 40% Power scales with V²f: Halving frequency and voltage reduces power by 75%"
      },
      {
        "title": "9. Common Beginner Mistakes",
        "content": "Mistake #1: Over-aggressive clock gating causing functional bugs Symptom: FSM enters wrong state, counters skip values. Cause: Clock gating condition too restrictive—gates clock when logic needs it. Fix: Conservative gating: only gate when absolutely safe (e.g., explicit enable signal). Mistake #2: Adding operand isolation to critical paths Impact: Timing violations due to added mux delay. Fix: Only apply operand isolation to non-critical paths with timing slack > 20%. Mistake #3: Not accounting for DVFS transition overhead Problem: Voltage/frequency transitions take 10-100µs. Frequent switching wastes energy. Fix: Implement hysteresis—only transition after workload stable for 1-10ms."
      },
      {
        "title": "10. Summary",
        "content": "In this tutorial, you learned: Clock gating reduces dynamic power 30-40% by disabling clocks to idle registers with minimal area overhead Operand isolation prevents unnecessary switching in functional units when outputs unused, saving 5-15% dynamic power Memory power management (Idle/Drowsy/Power-Down modes) reduces SRAM power 75-99% for inactive banks DVFS provides runtime power-performance trade-offs, with power scaling as V²f (halving both reduces power 75%) Power optimization is iterative: baseline ? clock gating ? multi-Vt ? operand isolation ? memory ? DVFS Combined techniques achieve 70-85% total power reduction from unoptimized baseline",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Power Optimization",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Power Optimization\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-power-optimization",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "What technique dynamically adjusts both voltage and frequency based on computational workload?",
      "options": [
        "Static Timing Analysis (STA)",
        "Dynamic Voltage and Frequency Scaling (DVFS)",
        "Built-in Self-Test (BIST)",
        "Clock Domain Crossing (CDC)"
      ],
      "correctIndex": 1,
      "explanation": "DVFS dynamically scales both voltage and frequency: high V and f when computational load is high, and reduced V and f during low load to maximize quadratic power savings."
    }
  },
  "upf-physical-implementation": {
    "id": "upf-physical-implementation",
    "badge": "Module 6 • Implementation & Optimization",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "UPF Physical Implementation",
    "subtitle": "Comprehensive technical guide on upf physical implementation within IEEE 1801 Unified Power Format (UPF) design and verification flow.",
    "sections": [
      {
        "title": "1. What You'll Learn",
        "content": "Configure power-aware place-and-route flows Plan voltage islands and power domain placement Route power rails and handle multi-voltage interconnect Verify IR drop, electromigration, and power grid integrity",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: What You'll Learn",
          "snippet": "# icc2_setup.tcl - Power-aware P&R flow # 1. Load design and UPF read_verilog synth_netlist.v link_design top_design load_upf synth_netlist.upf # 2. Load technology and physical libraries read_ndm_libs technology.ndm read_def floorplan.def # Pre-defined floorplan with voltage islands # 3. Power-aware checks check_mv_design -verbose # Must pass: verify UPF consistency with netlist # 4. Create power-aware placement constraints # Group cells by power domain create_placement_blockage -type hard \\ -boundary {voltage_island_cpu} \\ -name cpu_placement_region create_placement_blockage -type hard \\ -boundary {voltage_island_gpu} \\ -name gpu_placement_region # 5. Place cells with power-domain awareness place_opt -power # Power-aware placement # 6. Clock tree synthesis with domain-aware buffers clock_opt -power # 7. Route with multi-voltage awareness route_opt -power # 8. Verify power integrity check_mv_design -post_route report_power_rail_analysis report_ir_drop"
        },
        "callout": {
          "type": "info",
          "title": "IEEE 1801 Key Concept",
          "message": "UPF Physical Implementation defines essential power management intent that drives both logic synthesis and verification tools."
        }
      },
      {
        "title": "2. From Gates to Silicon",
        "content": "Your power-aware synthesis completed successfully: 2,400 isolation cells inserted, 800 retention flip-flops placed, gate-level netlist matches UPF intent. You proceed to place-and-route, expecting straightforward completion. Three weeks later, physical design is still struggling: Isolation cells placed in GPU domain lose their always-on supply Level shifters between CPU and GPU violate max transition time IR drop in VDD_GPU exceeds 10% (spec: < 5%) Power switch placement causes 2mm detour in critical timing path Standard place-and-route tools don't understand power domains, multiple supplies, or voltage-dependent constraints. Physical implementation for multi-voltage designs requires power-aware P&R tools (IC Compiler, Innovus) and careful planning. Standard flows treat all cells identically, violating power intent and causing functional/reliability failures.",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: From Gates to Silicon",
          "snippet": "# Define voltage island regions create_voltage_area VA_CPU -power_domain PD_CPU \\ -region {100 100 400 500} # x1 y1 x2 y2 in um create_voltage_area VA_GPU -power_domain PD_GPU \\ -region {450 100 850 500} create_voltage_area VA_MEM -power_domain PD_MEM \\ -region {100 550 850 800} # Reserve space for power switches (large cells) create_keepout_margin -type hard -outer {50 50 50 50} \\ -on_ref power_switch_macro"
        }
      },
      {
        "title": "3. Voltage Island Floorplan",
        "content": "Group cells from same power domain into physical regions (voltage islands):",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Voltage Island Floorplan",
          "snippet": "# Create power mesh for each domain create_pg_mesh_pattern pg_top \\ -layers {M7 M6} \\ -tracks {M7 20 M6 20} \\ -voltages {VDD_SYS VSS} create_pg_mesh_pattern pg_cpu \\ -layers {M5} \\ -tracks {M5 15} \\ -voltages {VDD_CPU} \\ -region VA_CPU create_pg_mesh_pattern pg_gpu \\ -layers {M5} \\ -tracks {M5 15} \\ -voltages {VDD_GPU} \\ -region VA_GPU # Connect cells to appropriate power rails connect_pg_net -net VDD_CPU [get_cells -hier PD_CPU/*] connect_pg_net -net VDD_GPU [get_cells -hier PD_GPU/*] connect_pg_net -net VDD_SYS [get_cells -hier {*iso_cell* *ls_cell*}]"
        }
      },
      {
        "title": "4. Multi-Voltage Power Grid",
        "content": "Each voltage domain requires dedicated power rails:",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: Multi-Voltage Power Grid",
          "snippet": "# Constrain isolation cells to parent domain set_dont_touch_placement [get_cells *iso_cell*] # Place isolation cells at domain boundary create_placement_guide -name iso_cells \\ -cells [get_cells *iso_cell*] \\ -boundary_region {interface between VA_GPU and always-on} # Verify isolation cell supply connectivity check_mv_design -isolation_cells"
        }
      },
      {
        "title": "5. Isolation Cell Placement",
        "content": "Isolation cells must be placed in the parent (always-on) domain , close to domain boundaries:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Isolation Cell Placement",
          "snippet": "# Ensure retention cells can access both supplies set_routing_rule ret_cells \\ -min_routing_layer M3 \\ -max_routing_layer M5 \\ -preferred_routing_layer_horizontal M4 \\ -preferred_routing_layer_vertical M5 # Connect retention cells to dual supplies connect_pg_net -net VDD_CPU [get_pins -hier */VDD -of [get_cells *ret_ff*]] connect_pg_net -net VDD_RET [get_pins -hier */VDD_RET -of [get_cells *ret_ff*]]"
        }
      },
      {
        "title": "6. Retention Cell Placement",
        "content": "Retention cells need connection to both primary supply (VDD_CPU) and retention supply (VDD_RET):",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Retention Cell Placement",
          "snippet": "# Run IR drop analysis report_ir_drop -threshold 0.05 # Report drops > 5% # Output: # IR Drop Hotspots: # Location (1200, 850): 8.2% drop (VDD_GPU) # Peak current: 1.8A # Grid resistance: 45mO # Recommendation: Add decoupling caps, widen power rails # # Location (400, 300): 6.1% drop (VDD_CPU) # Peak current: 1.2A # Grid resistance: 51mO"
        }
      },
      {
        "title": "7. IR Drop Problem",
        "content": "Current through power grid resistance causes voltage drop:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: IR Drop Problem",
          "snippet": "# Add power straps to reduce IR drop create_pg_strap -net VDD_GPU -layer M5 \\ -width 2.0 -spacing 50 -direction vertical # Add decoupling capacitors at hotspots insert_decap -lib_cells {DCAP_HVT_X8} \\ -locations {{1200 850} {400 300}} # Re-analyze IR drop report_ir_drop -threshold 0.05 # After fixes: Max drop = 4.8% (PASS)"
        }
      },
      {
        "title": "8. IR Drop Fixes",
        "content": "Widen power rails: Reduce resistance (R ? 1/width) Add decoupling capacitors: Supply local current spikes Add power straps: Parallel current paths reduce effective resistance Move power pads closer: Shorter distance = lower resistance Quick Check Q: Why does IR drop matter more in multi-voltage designs than single-voltage designs? Show Answer Multi-voltage designs use lower voltages (0.7-1.0V vs. traditional 1.8V), so the same absolute IR drop (e.g., 0.1V) represents a larger percentage of supply voltage. A 0.1V drop is 5.5% of 1.8V but 10% of 1.0V and 14% of 0.7V. Additionally, DVFS means timing analysis must account for worst-case IR drop at every operating point, making convergence more difficult.",
        "code": {
          "language": "verilog",
          "caption": "UPF Specification: IR Drop Fixes",
          "snippet": "# Run electromigration analysis check_em -verbose # Output: # EM Violations (3): # Net: VDD_GPU_local_87 # Segment: (1205.3, 847.2) to (1205.3, 852.8) # Width: 0.5um, Current: 3.2mA, Density: 6.4 mA/um (FAIL) # Fix: Widen wire to 2um or add parallel wire # Fix violations by widening wires set_routing_rule high_current_nets \\ -min_width 2.0 \\ -nets [get_nets *VDD_GPU_local*]"
        }
      },
      {
        "title": "9. Electromigration Problem",
        "content": "High current density in metal wires causes atoms to migrate, eventually causing open circuits:",
        "code": {
          "language": "tcl",
          "caption": "UPF Specification: Electromigration Problem",
          "snippet": "# WRONG: Single PVT corner set_operating_conditions -analysis_type on_chip_variation \\ -voltage 1.0 # CORRECT: Multiple corners for each DVFS operating point set_operating_conditions -analysis_type on_chip_variation \\ -voltage {1.0 0.9 0.8} \\ # All DVFS voltages -process {fast nominal slow}"
        }
      },
      {
        "title": "10. Common Beginner Mistakes",
        "content": "Mistake #1: Placing isolation cells in powered-down domain Symptom: X-propagation in silicon despite correct UPF. Cause: Physical design placed isolation cells in GPU domain instead of parent. Fix: Use placement constraints to force isolation cells into always-on regions. Mistake #2: Insufficient power rail width Symptom: IR drop violations, timing failures in silicon. Cause: Default rail widths sized for single-voltage, not multi-domain current. Fix: Calculate required width: W = I / (J_max × thickness), where J_max = current density limit. Mistake #3: Not verifying multi-voltage timing"
      },
      {
        "title": "11. Summary",
        "content": "In this tutorial, you learned: Power-aware physical design requires specialized P&R tools (ICC, Innovus) that understand UPF, multiple voltages, and domain placement Voltage island planning groups cells by power domain, minimizes cross-domain wiring, and reserves space for power switches Multi-voltage power grids require dedicated rails per domain with appropriate width (8-12um for primary supplies) and metal layer assignment Special cells (isolation, retention, level shifters) need careful placement: isolation in parent domain, retention with dual supply access IR drop analysis identifies voltage drop hotspots; fixes include wider rails, decoupling caps, power straps, and pad repositioning Electromigration verification ensures current density < limits (typically 2 mA/um for copper interconnect) Multi-voltage timing analysis must cover all DVFS operating points and worst-case IR drop scenarios Congratulations! You've completed the comprehensive UPF tutorial series, mastering low-power design from fundamentals through physical implementation.",
        "callout": {
          "type": "tip",
          "title": "Verification Tip",
          "message": "Always execute power-aware static checking (LPS) prior to gate-level synthesis to identify missing or misplaced power cells early."
        }
      }
    ],
    "playground": {
      "title": "IEEE 1801 UPF Simulator: UPF Physical Implementation",
      "initialCode": "// IEEE 1801 UPF Power Intent Simulation Console\n// Topic: UPF Physical Implementation\n\n// 1. Verilog DUT Definition\nmodule low_power_block (\n    input  wire        clk,\n    input  wire        rst_n,\n    input  wire        iso_en,\n    input  wire        pwr_en,\n    input  wire [7:0]  data_in,\n    output reg  [7:0]  data_out\n);\n\n  always @(posedge clk or negedge rst_n) begin\n    if (!rst_n)\n      data_out <= 8'h00;\n    else if (pwr_en)\n      data_out <= data_in + 8'h01;\n    else\n      data_out <= iso_en ? 8'h00 : 8'hxx;\n  end\n\nendmodule\n\n// 2. Associated IEEE 1801 UPF Power Intent Snippet\n// set_scope /\n// create_power_domain PD_CORE -elements {u_core}\n// set_isolation iso_core -domain PD_CORE -clamp_value 0\n",
      "expectedOutput": [
        "[UPF:PARSER] IEEE 1801 UPF 2.1 intent compiled cleanly.",
        "[CONFIG] Power Strategy: upf-physical-implementation",
        "[SIM:POWER] Power gating and isolation assertions verified.",
        "[CHECK] Zero X-leaks across active power domain boundaries.",
        "[STATUS] PASSED: All low-power verification constraints met."
      ]
    },
    "quiz": {
      "question": "During physical Place & Route (P&R), how are power-gated domains physically isolated?",
      "options": [
        "By placing them on separate silicon chips",
        "Using physical voltage island floorplans surrounded by power switch rings and routing guard bands",
        "By using different metal layers for each domain",
        "Using software operating system permissions"
      ],
      "correctIndex": 1,
      "explanation": "P&R tools floorplan switchable domains into dedicated voltage islands bounded by power switch rings, with boundary isolation cells placed at the domain perimeter."
    }
  }
};
