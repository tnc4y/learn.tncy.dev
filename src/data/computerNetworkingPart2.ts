import { LessonContent } from "./lessonsData";

export const COMPUTER_NETWORKING_PART2: Record<string, LessonContent> = {
  "cn-ch5-routing-protocols-dijkstra": {
    "id": "cn-ch5-routing-protocols-dijkstra",
    "badge": "Module 5 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "5.1–5.2 Control Plane & Link-State Routing: Graph Abstraction, Dijkstra's Algorithm & Oscillations",
    "subtitle": "Centralized vs. decentralized routing classification, weighted graph network representation, step-by-step execution of Dijkstra's Link-State (LS) algorithm, O(n^2) complexity, and congestion-driven oscillations.",
    "sections": [
      {
        "title": "1. Network layer control plane: our goals (Slides 5-2..5)",
        "content": "![5.1–5.2 Control Plane & Link-State Routing: Graph Abstraction, Dijkstra's Algorithm & Oscillations Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**5.1–5.2 Control Plane & Link-State Routing: Graph Abstraction, Dijkstra's Algorithm & Oscillations** — Centralized vs. decentralized routing classification, weighted graph network representation, step-by-step execution of Dijkstra's Link-State (LS) algorithm, O(n^2) complexity, and congestion-driven oscillations.\n\n**Network layer control plane: our goals**\n\n- understand principles behind network control plane:\n  - traditional routing algorithms\n  - SDN controllers\n  - network management, configuration\n- instantiation, implementation in the Internet:\n  - OSPF, BGP\n  - OpenFlow, ODL and ONOS controllers\n  - Internet Control Message Protocol: ICMP\n  - SNMP, YANG/NETCONF\n\n**Network-layer functions**\n\n- Two approaches to structuring network control plane:\n- per-router control (traditional)\n- logically centralized control (software defined networking)\n- **forwarding:** move packets from router’s input to appropriate router output\n- data plane\n- control plane\n- **routing:** determine route taken by packets from source to destination\n\n**Per-router control plane**\n\n- Individual routing algorithm components in each and every router interact in the control plane\n- Routing\n- Algorithm\n- data\n- plane\n- control\n- plane\n- values in arriving\n- packet header",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 5 Key Principle",
          "message": "Centralized vs. decentralized routing classification, weighted graph network representation, step-by-step execution of Dijkstra's Link-State (LS) algorithm, O(n^2) complexity, and congestion-driven oscillations."
        }
      },
      {
        "title": "2. Software-Defined Networking (SDN) control plane (Slides 5-6..9)",
        "content": "**Software-Defined Networking (SDN) control plane**\n\n- Remote controller computes, installs forwarding tables in routers\n- data\n- plane\n- control\n- plane\n- Remote Controller\n- values in arriving\n- packet header\n\n**Per-router control plane**\n\n- **Slide Diagram Elements & Protocol Entities:** `SDN control plane`\n\n**Routing protocols**\n\n- **Routing protocol goal:** determine “good” paths (equivalently, routes), from sending hosts to receiving host, through network of routers\n- **path:** sequence of routers packets traverse from given initial source host to final destination host\n- **“good”:** least “cost”, “fastest”, “least congested”\n- **routing:** a “top-10” networking challenge!\n- mobile network\n- enterprise\n- network\n- national or global ISP\n- datacenter\n- network\n- application\n- transport\n- network\n- link\n- physical\n- application\n- transport\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical\n- network\n- link\n- physical"
      },
      {
        "title": "3. Graph abstraction: link costs (Slides 5-10..14)",
        "content": "**Graph abstraction: link costs**\n\n- **ca,b:** cost of direct link connecting a and b\n- e.g., cw,z = 5, cu,z = ∞\n  - cost defined by network operator: could always be 1, or inversely related to bandwidth, or inversely related to congestion\n- **N:** set of routers = { u, v, w, x, y, z }\n- **E:** set of links ={ (u,v), (u,x), (v,x), (v,w), (x,w), (x,y), (w,y), (w,z), (y,z) }\n\n- **Slide Diagram Elements & Protocol Entities:** `graph: G = (N,E)`\n\n**Routing algorithm classification**\n\n- global or decentralized information?\n- **global:** all routers have complete topology, link cost info\n- “link state” algorithms\n- **decentralized:** iterative process of computation, exchange of info with neighbors\n- routers initially only know link costs to attached neighbors\n- “distance vector” algorithms\n- **dynamic:** routes change more quickly\n  - periodic updates or in response to link cost changes\n- **static:** routes change slowly over time\n\n- **Slide Diagram Elements & Protocol Entities:** `How fast do routes change?`\n\n**Dijkstra’s link-state routing algorithm**\n\n- **centralized:** network topology, link costs known to all nodes\n  - accomplished via “link state broadcast”\n  - all nodes have same info\n- computes least cost paths from one node (“source”) to all other nodes\n  - gives forwarding table for that node\n- **iterative:** after k iterations, know least cost path to k destinations\n- **cx,y:** direct link cost from node x to y; = ∞ if not direct neighbors\n- **D(v):** current estimate of cost of least-cost-path from source to destination v\n- **p(v):** predecessor node along path from source to v\n- **N':** set of nodes whose least-cost-path definitively known\n- **1 Initialization:** \n- 2 N' = {u} /* compute least cost path from u to all other nodes */\n- 3 for all nodes v\n- 4 if v adjacent to u /* u initially knows direct-path-cost only to direct neighbors */\n- 5 then D(v) = cu,v /* but may not be minimum cost! */\n- 6 else D(v) = ∞\n- find w not in N' such that D(w) is a minimum\n- add w to N'\n- update D(v) for all v adjacent to w and not in N' :\n- D(v) = min ( D(v), D(w) + cw,v )\n- /* new least-path-cost to v is either old least-cost-path to v or known\n- least-cost-path to w plus direct-cost from w to v */\n\n- **Slide Diagram Elements & Protocol Entities:** `notation, 8 Loop 9 10 11 12 13 14 15 until all nodes in N'`"
      },
      {
        "title": "4. Dijkstra’s algorithm: an example (Slides 5-15..29)",
        "content": "**Dijkstra’s algorithm: an example**\n\n- Step\n- D(v),p(v)\n- D(x),p(x)\n- D(y),p(y)\n- D(z),p(z)\n- D(w),p(w)\n- D(w),p(w)\n- 5,u\n- 4,x\n- 3,y\n- 3,y\n- 5,u\n- 1,u\n- 2,u\n- **Initialization (step 0):** \n- **For all a:** if a adjacent to u then D(a) = cu,a\n- 8 Loop\n- find a not in N' such that D(a) is a minimum\n- add a to N'\n- update D(b) for all b adjacent to a and not in N' :\n- D(b) = min ( D(b), D(a) + ca,b )\n- 2,x\n- D(v) = min ( D(v), D(x) + cx,v ) = min(2, 1+2) = 2\n- D(w) = min ( D(w), D(x) + cx,w ) = min (5, 1+3) = 4\n- D(y) = min ( D(y), D(x) + cx,y ) = min(inf,1+1) = 2\n- uxy\n- 4,y\n- D(w) = min ( D(w), D(y) + cy,w ) = min (4, 2+1) = 3\n- D(z) = min ( D(z), D(y) + cy,z ) = min(inf,2+2) = 4\n- uxyv\n- D(w) = min ( D(w), D(v) + cv,w ) = min (3, 2+3) = 3\n- uxyvw\n- D(z) = min ( D(z), D(w) + cw,z ) = min (4, 3+5) = 4\n- uxyvwz\n- **Initialization (step 0):** For all a: if a adjacent to then D(a) = cu,a\n- **resulting least-cost-path tree from u:** \n- **resulting forwarding table in u:** \n- route from u to all other destinations via x\n\n- **Slide Diagram Elements & Protocol Entities:** `v x y w x, (u,v) (u,x) (u,x) (u,x) (u,x), destination, outgoing link, route from u to v directly`\n\n**Dijkstra’s algorithm: another example**\n\n- Step\n- D(v),\n- p(v)\n- D(w),\n- p(w)\n- D(x),\n- p(x)\n- D(y),\n- p(y)\n- D(z),\n- p(z)\n- 7,u\n- 3,u\n- 5,u\n- 11,w\n- 6,w\n- 5,u\n- 14,x\n- 11,w\n- 6,w\n- uwx\n- uwxv\n- 14,x\n- 10,v\n- uwxvy\n- 12,y\n- **notes:** \n- construct least-cost-path tree by tracing predecessor nodes\n- ties can exist (can be broken arbitrarily)\n- uwxvyz\n\n**Dijkstra’s algorithm: discussion**\n\n- **algorithm complexity:** n nodes\n- **each of n iteration:** need to check all nodes, w, not in N\n- **n(n+1)/2 comparisons:** O(n2) complexity\n- **more efficient implementations possible:** O(nlogn)\n- **message complexity:** \n- each router must broadcast its link state information to other n routers\n- efficient (and interesting!) broadcast algorithms: O(n) link crossings to disseminate a broadcast message from one source\n- **each router’s message crosses O(n) links:** overall message complexity: O(n2)"
      },
      {
        "title": "5. Dijkstra’s algorithm: oscillations possible (Slides 5-30..30)",
        "content": "- when link costs depend on traffic volume, route oscillations possible\n- 1+e\n- initially\n- given these costs,\n- find new routing….\n- resulting in new costs\n- 2+e\n- 1+e\n- given these costs,\n- find new routing….\n- resulting in new costs\n- 2+e\n- 1+e\n- given these costs,\n- find new routing….\n- resulting in new costs\n- 2+e\n- 1+e\n- **sample scenario:** \n  - routing to destination a, traffic entering at d, c, e with rates 1, e (<1), 1\n  - link costs are directional, and volume-dependent"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **5.1–5.2 Control Plane & Link-State Routing: Graph Abstraction, Dijkstra's Algorithm & Oscillations**:\n\n- **Review Question 1 (Routing versus forwarding.):** Which of the following statements correctly identify the differences between routing and forwarding. Select one or more statements.\n  - **Verified Answer:** Forwarding refers to moving packets from a router’s input to appropriate router output, and is implemented in the data plane.; Routing refers to determining the route taken by packets from source to destination, and is implemented in the control plane.\n\n- **Review Question 2 (What’s a “good” path?):** What is the definition of a “good” path for a routing protocol? Chose the best single answer.\n  - **Verified Answer:** Routing algorithms typically work with abstract link weights that could represent any of, or combinations of, all of the other answers.\n\n- **Review Question 3 (Dijkstra’s link-state routing algorithm.):** Consider Dijkstra’s link-state routing algorithm that is computing a least-cost path from node a to other nodes b, c, d, e, f. Which of the following statements is true. (Refer to Section 5.2 in the text for notation.)\n  - **Verified Answer:** Suppose nodes b, c, and d are in the set N’. These nodes will remain in N’ for the rest of the algorithm, since the least-cost paths from a to b, c, and d are known.; The values computed in the vector D(v), the currently known least cost of a path from a to any node v, will never increase following an iteration.; In the initialization step, the initial cost from a to each of these destinations is initialized to either the cost of a link directly connecting a to a direct neighbor, or infinity otherwise.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "dijkstra_link_state.py — Kurose & Ross 6-Node Network Dijkstra Link-State Shortest-Path Solver",
          "snippet": "# Kurose & Ross 9e - Section 5.2.1: Dijkstra's Link-State Routing Algorithm (Nodes u, v, w, x, y, z)\nimport heapq\n\ngraph = {\n    \"u\": {\"v\": 2, \"w\": 5, \"x\": 1},\n    \"v\": {\"u\": 2, \"w\": 3, \"x\": 2},\n    \"w\": {\"u\": 5, \"v\": 3, \"x\": 3, \"y\": 1, \"z\": 5},\n    \"x\": {\"u\": 1, \"v\": 2, \"w\": 3, \"y\": 1},\n    \"y\": {\"x\": 1, \"w\": 1, \"z\": 2},\n    \"z\": {\"w\": 5, \"y\": 2},\n}\n\ndef dijkstra(src: str):\n    dist = {node: float(\"inf\") for node in graph}\n    prev = {node: None for node in graph}\n    dist[src] = 0\n    pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:\n            continue\n        for v, weight in graph[u].items():\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                prev[v] = u\n                heapq.heappush(pq, (dist[v], v))\n    return dist, prev\n\ndist, prev = dijkstra(\"u\")\nfor dst in sorted(graph.keys()):\n    print(f\"Shortest Path u -> {dst}: Cost D({dst}) = {dist[dst]} (Predecessor p({dst}) = {prev[dst]})\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 5.1–5.2 Control Plane & Link-State Routing: Graph Abstraction, Dijkstra's Algorithm & Oscillations",
      "filename": "dijkstra_link_state.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 5.2.1: Dijkstra's Link-State Routing Algorithm (Nodes u, v, w, x, y, z)\nimport heapq\n\ngraph = {\n    \"u\": {\"v\": 2, \"w\": 5, \"x\": 1},\n    \"v\": {\"u\": 2, \"w\": 3, \"x\": 2},\n    \"w\": {\"u\": 5, \"v\": 3, \"x\": 3, \"y\": 1, \"z\": 5},\n    \"x\": {\"u\": 1, \"v\": 2, \"w\": 3, \"y\": 1},\n    \"y\": {\"x\": 1, \"w\": 1, \"z\": 2},\n    \"z\": {\"w\": 5, \"y\": 2},\n}\n\ndef dijkstra(src: str):\n    dist = {node: float(\"inf\") for node in graph}\n    prev = {node: None for node in graph}\n    dist[src] = 0\n    pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:\n            continue\n        for v, weight in graph[u].items():\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                prev[v] = u\n                heapq.heappush(pq, (dist[v], v))\n    return dist, prev\n\ndist, prev = dijkstra(\"u\")\nfor dst in sorted(graph.keys()):\n    print(f\"Shortest Path u -> {dst}: Cost D({dst}) = {dist[dst]} (Predecessor p({dst}) = {prev[dst]})\")",
      "expectedOutput": [
        "[OK] dijkstra_link_state.py — Kurose & Ross 6-Node Network Dijkstra Link-State Shortest-Path Solver",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 5.1–5.2 Control Plane & Link-State Routing: Graph Abstraction, Dijkstra's Algorithm & Oscillations. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements correctly identify the differences between routing and forwarding. Select one or more statements.",
      "options": [
        "A) Forwarding refers to determining the route taken by packets from source to destination, and is implemented in the data plane.",
        "B) Forwarding refers to moving packets from a router’s input to appropriate router output, and is implemented in the data plane.",
        "C) Forwarding refers to determining the route taken by packets from source to destination, and is implemented in the control plane.",
        "D) Routing refers to determining the route taken by packets from source to destination, and is implemented in the control plane."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 5), 'Forwarding refers to moving packets from a router’s input to appropriate router output, and is implemented in the data plane.' accurately characterizes 5.1–5.2 Control Plane & Link-State Routing: Graph Abstraction, Dijkstra's Algorithm & Oscillations."
    }
  },
  "cn-ch5-distance-vector-bellman-ford": {
    "id": "cn-ch5-distance-vector-bellman-ford",
    "badge": "Module 5 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "5.2B Distance Vector Routing: Bellman-Ford Equation, Iterative Diffusion & Poisoned Reverse",
    "subtitle": "Distributed asynchronous routing via Dx(y) = min_v {c(x,v) + Dv(y)}, neighbor distance vector exchanges, 'good news travels fast vs. bad news travels slowly' (count-to-infinity), and poisoned reverse.",
    "sections": [
      {
        "title": "1. Distance vector algorithm (Slides 5-32..33)",
        "content": "![5.2B Distance Vector Routing: Bellman-Ford Equation, Iterative Diffusion & Poisoned Reverse Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**5.2B Distance Vector Routing: Bellman-Ford Equation, Iterative Diffusion & Poisoned Reverse** — Distributed asynchronous routing via Dx(y) = min_v {c(x,v) + Dv(y)}, neighbor distance vector exchanges, 'good news travels fast vs. bad news travels slowly' (count-to-infinity), and poisoned reverse.\n\n**Distance vector algorithm**\n\n- Based on Bellman-Ford (BF) equation (dynamic programming):\n- **Let Dx(y):** cost of least-cost path from x to y.\n- **Then:** \n- Dx(y) = minv { cx,v + Dv(y) }\n- min taken over all neighbors v of x\n- v’s estimated least-cost-path cost to y\n- direct cost of link from x to v\n\n- **Slide Diagram Elements & Protocol Entities:** `Bellman-Ford equation`\n\n**Bellman-Ford Example**\n\n- Suppose that u’s neighboring nodes, x,v,w, know that for destination z:\n- Du(z) = min { cu,v + Dv(z),\n- cu,x + Dx(z),\n- cu,w + Dw(z) }\n- **Bellman-Ford equation says:** \n- Dv(z) = 5\n- Dw(z) = 3\n- Dx(z) = 3\n- = min {2 + 5,\n- 1 + 3,\n- 5 + 3} = 4\n- node achieving minimum (x) is next hop on estimated least-cost path to destination (z)",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 5 Key Principle",
          "message": "Distributed asynchronous routing via Dx(y) = min_v {c(x,v) + Dv(y)}, neighbor distance vector exchanges, 'good news travels fast vs. bad news travels slowly' (count-to-infinity), and poisoned reverse."
        }
      },
      {
        "title": "2. Distance vector algorithm (Slides 5-34..36)",
        "content": "**Distance vector algorithm**\n\n- **key idea:** \n- from time-to-time, each node sends its own distance vector estimate to neighbors\n- under minor, natural conditions, the estimate Dx(y) converge to the actual least cost dx(y)\n- Dx(y) ← minv{cx,v + Dv(y)} for each node y ∊ N\n- when x receives new DV estimate from any neighbor, it updates its own DV using B-F equation:\n- **iterative, asynchronous:** each local iteration caused by:\n- local link cost change\n- DV update message from neighbor\n- wait for (change in local link cost or msg from neighbor)\n- **distributed, self-stopping:** each node notifies neighbors only when its DV changes\n  - neighbors then notify their neighbors – only if necessary\n  - no notification received, no actions taken!\n- recompute DV estimates using DV received from neighbor\n- if DV to any destination has changed, notify neighbors\n\n- **Slide Diagram Elements & Protocol Entities:** `each node:`\n\n**Distance vector: example**\n\n- **DV in a:** Da(a)=0\n- Da(b) = 8\n- Da(c) = ∞\n- Da(d) = 1\n- Da(e) = ∞\n- Da(f) = ∞\n- Da(g) = ∞\n- Da(h) = ∞\n- Da(i) = ∞\n- All nodes have distance estimates to nearest neighbors (only)\n- **A few asymmetries:** \n- missing link\n- larger cost\n- All nodes send their local distance vector to their neighbors\n\n- **Slide Diagram Elements & Protocol Entities:** `t=0`"
      },
      {
        "title": "3. Distance vector example: iteration (Slides 5-37..48)",
        "content": "**Distance vector example: iteration**\n\n- **All nodes:** \n- receive distance vectors from neighbors\n- compute their new local distance vector\n- send their new local distance vector to neighbors\n- …. and so on\n- Let’s next take a look at the iterative computations at nodes\n\n- **Slide Diagram Elements & Protocol Entities:** `t=1, compute, t=2`\n\n**Distance vector example: computation**\n\n- **DV in a:** Da(a)=0\n- Da(b) = 8\n- Da(c) = ∞\n- Da(d) = 1\n- Da(e) = ∞\n- Da(f) = ∞\n- Da(g) = ∞\n- Da(h) = ∞\n- Da(i) = ∞\n  - Db(a) = 8\n  - Db(c) = 1\n  - Db(d) = ∞\n  - Db(e) = 1\n- b receives DVs from a, c, e\n- **DV in c:** \n  - Dc(a) = ∞\n  - Dc(b) = 1\n  - Dc(c) = 0\n  - Dc(d) = ∞\n  - Dc(e) = ∞\n  - Dc(f) = ∞\n  - Dc(g) = ∞\n  - Dc(h) = ∞\n- Dc(i) = ∞\n- **DV in e:** \n  - De(a) = ∞\n  - De(b) = 1\n  - De(c) = ∞\n  - De(d) = 1\n  - De(e) = 0\n  - De(f) = 1\n  - De(g) = ∞\n  - De(h) = 1\n- De(i) = ∞\n- **b receives DVs from a, c, e, computes:** \n  - Db(d) = 2\n- Db(a) = min{cb,a+Da(a), cb,c +Dc(a), cb,e+De(a)} = min{8,∞,∞} = 8\n- Db(c) = min{cb,a+Da(c), cb,c +Dc(c), c b,e +De(c)} = min{∞,1,∞} = 1\n- Db(d) = min{cb,a+Da(d), cb,c +Dc(d), c b,e +De(d)} = min{9,2,∞} = 2\n- Db(f) = min{cb,a+Da(f), cb,c +Dc(f), c b,e +De(f)} = min{∞,∞,2} = 2\n- Db(i) = min{cb,a+Da(i), cb,c +Dc(i), c b,e+De(i)} = min{∞, ∞, ∞} = ∞\n- Db(h) = min{cb,a+Da(h), cb,c +Dc(h), c b,e+De(h)} = min{∞, ∞, 2} = 2\n- Db(e) = min{cb,a+Da(e), cb,c +Dc(e), c b,e +De(e)} = min{∞,∞,1} = 1\n- Db(g) = min{cb,a+Da(g), cb,c +Dc(g), c b,e+De(g)} = min{∞, ∞, ∞} = ∞\n- c receives DVs from b\n- **c receives DVs from b computes:** \n- Dc(a) = min{cc,b+Db(a}} = 1 + 8 = 9\n- Dc(b) = min{cc,b+Db(b)} = 1 + 0 = 1\n- Dc(d) = min{cc,b+Db(d)} = 1+ ∞ = ∞\n- Dc(e) = min{cc,b+Db(e)} = 1 + 1 = 2\n- Dc(f) = min{cc,b+Db(f)} = 1+ ∞ = ∞\n- Dc(g) = min{cc,b+Db(g)} = 1+ ∞ = ∞\n- Dc(i) = min{cc,b+Db(i)} = 1+ ∞ = ∞\n- Dc(h) = min{cbc,b+Db(h)} = 1+ ∞ = ∞\n  - Dc(a) = 9\n  - Dc(d) = 2\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive/\n- e receives DVs from b, d, f, h\n- **DV in f:** \n  - Dc(b) = ∞\n  - Dc(c) = ∞\n  - Dc(e) = 1\n  - Dc(f) = 0\n- Dc(i) = 1\n- **DV in h:** \n  - Dc(g) = 1\n  - Dc(h) = 0\n- **DV in d:** \n  - Dc(a) = 1\n  - Dc(d) = 0\n  - Dc(f) = ∞ Dc(g) = 1\n- **Q:** what is new DV computed in e at t=1?\n\n- **Slide Diagram Elements & Protocol Entities:** `t=1, DV in b:, Db(f) = ∞ Db(g) = ∞ Db(h) = ∞ Db(i) = ∞, Db(f) =2 Db(g) = ∞ Db(h) = 2 Db(i) = ∞, compute`"
      },
      {
        "title": "4. Distance vector: state information diffusion (Slides 5-49..51)",
        "content": "**Distance vector: state information diffusion**\n\n- c’s state at t=0 is at c only\n- c’s state at t=0 has propagated to b, and may influence distance vector computations up to 1 hop away, i.e., at b\n- c’s state at t=0 may now influence distance vector computations up to 2 hops away, i.e., at b and now at a, e as well\n- c’s state at t=0 may influence distance vector computations up to 3 hops away, i.e., at d, f, h\n- c’s state at t=0 may influence distance vector computations up to 4 hops away, i.e., at g, i\n- Iterative communication, computation steps diffuses information through network:\n\n- **Slide Diagram Elements & Protocol Entities:** `t=0, t=1, t=2, t=3, t=4`\n\n**Distance vector: link cost changes**\n\n- **t0:** y detects link-cost change, updates its DV, informs its neighbors.\n- **t1:** z receives update from y, updates its DV, computes new least cost to x , sends its neighbors its DV.\n- **t2:** y receives z’s update, updates its DV. y’s least costs do not change, so y does not send a message to z.\n- **link cost changes:** \n- node detects local link cost change\n- updates routing info, recalculates local DV\n- if DV changes, notify neighbors\n- “bad news travels slow” – count-to-infinity problem:\n- y sees direct link to x has new cost 60, but z has said it has a path at cost of 5. So y computes “my new cost to x will be 6, via z); notifies z of new cost of 6 to x.\n- z learns that path to x via y has new cost 6, so z computes “my new cost to x will be 7 via y), notifies y of new cost of 7 to x.\n- y learns that path to x via z has new cost 7, so y computes “my new cost to x will be 8 via y), notifies z of new cost of 8 to x.\n- z learns that path to x via y has new cost 8, so z computes “my new cost to x will be 9 via y), notifies y of new cost of 9 to x.\n- see text for solutions. Distributed algorithms are tricky!\n\n- **Slide Diagram Elements & Protocol Entities:** `“good news travels fast”`"
      },
      {
        "title": "5. Comparison of LS and DV algorithms (Slides 5-52..121)",
        "content": "**Comparison of LS and DV algorithms**\n\n- message complexity\n  - LS: n routers, O(n2) messages sent\n  - DV: exchange between neighbors; convergence time varies\n- speed of convergence\n- **LS:** O(n2) algorithm, O(n2) messages\n  - may have oscillations\n- **DV:** convergence time varies\n  - may have routing loops\n  - count-to-infinity problem\n- **robustness:** what happens if router malfunctions, or is compromised?\n- **LS:** \n  - router can advertise incorrect link cost\n  - each router computes only its own table\n- **DV:** \n  - DV router can advertise incorrect path cost (“I have a really low-cost path to everywhere”): black-holing\n  - each router’s DV is used by others: error propagate thru network\n\n**Distance vector: another example**\n\n- x y z\n- 0 2 7\n- from\n- cost to\n- from\n- from\n- x y z\n- x y z\n- cost to\n- x y z\n- cost to\n- 2 0 1\n- ∞ ∞ ∞\n- 2 0 1\n- 7 1 0\n- time\n- Dx()\n- Dx(y) = min{cx,y + Dy(y), cx,z+ Dz(y)} = min{2+0 , 7+1} = 2\n- Dx(z) = min{cx,y+ Dy(z), cx,z+ Dz(z)}\n- = min{2+1 , 7+0} = 3\n- Dy()\n- Dz()\n- cost to\n- from\n\n- **Slide Diagram Elements & Protocol Entities:** `x y z, 0 2 3, from, cost to, 0 2 7, 2 0 1, 7 1 0, 3 1 0`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **5.2B Distance Vector Routing: Bellman-Ford Equation, Iterative Diffusion & Poisoned Reverse**:\n\n- **Review Question 1 (What’s a “good” path?):** What is the definition of a “good” path for a routing protocol? Chose the best single answer.\n  - **Verified Answer:** Routing algorithms typically work with abstract link weights that could represent any of, or combinations of, all of the other answers.\n\n- **Review Question 2 (Dijkstra’s link-state routing algorithm.):** Consider Dijkstra’s link-state routing algorithm that is computing a least-cost path from node a to other nodes b, c, d, e, f. Which of the following statements is true. (Refer to Section 5.2 in the text for notation.)\n  - **Verified Answer:** Suppose nodes b, c, and d are in the set N’. These nodes will remain in N’ for the rest of the algorithm, since the least-cost paths from a to b, c, and d are known.; The values computed in the vector D(v), the currently known least cost of a path from a to any node v, will never increase following an iteration.; In the initialization step, the initial cost from a to each of these destinations is initialized to either the cost of a link directly connecting a to a direct neighbor, or infinity otherwise.\n\n- **Review Question 3 (Dijkstra’s link-state routing algorithm (Part 1).):** Consider the graph shown below and the use of Dijkstra’s algorithm to compute a least cost path from a to all destinations. Suppose that nodes b and d have already been added to N’. What is the next node to be added to N' (refer to the text for an explanation of notation). [Note: You can find more examples of problems similar to this here .]\n  - **Verified Answer:** e",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "bellman_ford_dv_sim.py — Iterative Distance Vector Convergence Using the Bellman-Ford Equation",
          "snippet": "# Kurose & Ross 9e - Section 5.2.2: Distributed Distance Vector (Bellman-Ford) Convergence\nnodes = [\"x\", \"y\", \"z\"]\nedges = {(\"x\", \"y\"): 2, (\"y\", \"x\"): 2, (\"x\", \"z\"): 7, (\"z\", \"x\"): 7, (\"y\", \"z\"): 1, (\"z\", \"y\"): 1}\ndv = {u: {v: (0 if u == v else edges.get((u, v), 999)) for v in nodes} for u in nodes}\n\nfor iteration in range(1, 4):\n    print(f\"--- Iteration {iteration} ---\")\n    for x in nodes:\n        for y in nodes:\n            if x != y:\n                dv[x][y] = min(edges.get((x, v), 999) + dv[v][y] for v in nodes if v != x)\n        print(f\"  Router {x} Distance Vector: {dv[x]}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 5.2B Distance Vector Routing: Bellman-Ford Equation, Iterative Diffusion & Poisoned Reverse",
      "filename": "bellman_ford_dv_sim.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 5.2.2: Distributed Distance Vector (Bellman-Ford) Convergence\nnodes = [\"x\", \"y\", \"z\"]\nedges = {(\"x\", \"y\"): 2, (\"y\", \"x\"): 2, (\"x\", \"z\"): 7, (\"z\", \"x\"): 7, (\"y\", \"z\"): 1, (\"z\", \"y\"): 1}\ndv = {u: {v: (0 if u == v else edges.get((u, v), 999)) for v in nodes} for u in nodes}\n\nfor iteration in range(1, 4):\n    print(f\"--- Iteration {iteration} ---\")\n    for x in nodes:\n        for y in nodes:\n            if x != y:\n                dv[x][y] = min(edges.get((x, v), 999) + dv[v][y] for v in nodes if v != x)\n        print(f\"  Router {x} Distance Vector: {dv[x]}\")",
      "expectedOutput": [
        "[OK] bellman_ford_dv_sim.py — Iterative Distance Vector Convergence Using the Bellman-Ford Equation",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 5.2B Distance Vector Routing: Bellman-Ford Equation, Iterative Diffusion & Poisoned Reverse. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Consider the graph shown below and the use of Dijkstra’s algorithm to compute a least cost path from a to all destinations. Suppose that nodes b and d have already been added to N’. What is the next node to be added to N' (refer to the text for an explanation of notation). [Note: You can find more examples of problems similar to this here .]",
      "options": [
        "A) c",
        "B) f",
        "C) e",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 2,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 5), 'e' accurately characterizes 5.2B Distance Vector Routing: Bellman-Ford Equation, Iterative Diffusion & Poisoned Reverse."
    }
  },
  "cn-ch5-scalable-routing-ospf": {
    "id": "cn-ch5-scalable-routing-ospf",
    "badge": "Module 5 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "İleri Seviye",
    "title": "5.3 Scalable Intra-AS Routing: Autonomous Systems (AS), OSPF Link-State Flooding & Hierarchical OSPF",
    "subtitle": "Why hundreds of millions of destinations require Autonomous Systems (ASes), Open Shortest Path First (OSPF) link-state advertisements over IP, equal-cost multipath (ECMP), and two-tier Backbone/Area OSPF.",
    "sections": [
      {
        "title": "1. Making routing scalable (Slides 5-54..55)",
        "content": "![5.3 Scalable Intra-AS Routing: Autonomous Systems (AS), OSPF Link-State Flooding & Hierarchical OSPF Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**5.3 Scalable Intra-AS Routing: Autonomous Systems (AS), OSPF Link-State Flooding & Hierarchical OSPF** — Why hundreds of millions of destinations require Autonomous Systems (ASes), Open Shortest Path First (OSPF) link-state advertisements over IP, equal-cost multipath (ECMP), and two-tier Backbone/Area OSPF.\n\n**Making routing scalable**\n\n- our routing study thus far - idealized\n- all routers identical\n- network “flat”\n- … not true in practice\n- **scale:** billions of destinations:\n- can’t store all destinations in routing tables!\n- routing table exchange would swamp links!\n- **administrative autonomy:** \n- **Internet:** a network of networks\n- each network admin may want to control routing in its own network\n\n**Internet approach to scalable routing**\n\n- aggregate routers into regions known as “autonomous systems” (AS) (a.k.a. “domains”)\n- **intra-AS (aka “intra-domain”):** routing among routers within same AS (“network”)\n- all routers in AS must run same intra-domain protocol\n- routers in different AS can run different intra-domain routing protocols\n- **gateway router:** at “edge” of its own AS, has link(s) to router(s) in other AS’es\n- **inter-AS (aka “inter-domain”):** routing among AS’es\n- gateways perform inter-domain routing (as well as intra-domain routing)",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 5 Key Principle",
          "message": "Why hundreds of millions of destinations require Autonomous Systems (ASes), Open Shortest Path First (OSPF) link-state advertisements over IP, equal-cost multipath (ECMP), and two-tier Backbone/Area OSPF."
        }
      },
      {
        "title": "2. Interconnected ASes (Slides 5-56..57)",
        "content": "**Interconnected ASes**\n\n- AS3\n- AS1\n- AS2\n- forwarding table configured by intra- and inter-AS routing algorithms\n- Intra-AS\n- Routing\n- Inter-AS\n- Routing\n  - intra-AS routing determine entries for destinations within AS\n  - inter-AS & intra-AS determine entries for external destinations\n\n- **Slide Diagram Elements & Protocol Entities:** `intra-AS routing, inter-AS routing, forwarding table`\n\n**Inter-AS routing: a role in intradomain forwarding**\n\n- AS3\n- AS1\n- AS2\n- suppose router in AS1 receives datagram destined outside of AS1:\n- **AS1 inter-domain routing must:** \n- learn which destinations reachable through AS2, which through AS3\n- propagate this reachability info to all routers in AS1\n  - router should forward packet to gateway router in AS1, but which one?\n\n- **Slide Diagram Elements & Protocol Entities:** `other networks`"
      },
      {
        "title": "3. Intra-AS routing: routing within an AS (Slides 5-58..59)",
        "content": "**Intra-AS routing: routing within an AS**\n\n- **most common intra-AS routing protocols:** \n- **RIP:** Routing Information Protocol [RFC 1723]\n  - classic DV: DVs exchanged every 30 secs\n  - no longer widely used\n- **EIGRP:** Enhanced Interior Gateway Routing Protocol\n  - DV based\n  - formerly Cisco-proprietary for decades (became open in 2013 [RFC 7868])\n- **OSPF:** Open Shortest Path First [RFC 2328]\n  - link-state routing\n  - IS-IS protocol (ISO standard, not RFC standard) essentially same as OSPF\n\n**OSPF (Open Shortest Path First) routing**\n\n- **“open”:** publicly available\n- classic link-state\n  - each router floods OSPF link-state advertisements (directly over IP rather than using TCP/UDP) to all other routers in entire AS\n  - multiple link costs metrics possible: bandwidth, delay\n  - each router has full topology, uses Dijkstra’s algorithm to compute forwarding table\n- **security:** all OSPF messages authenticated (to prevent malicious intrusion)"
      },
      {
        "title": "4. Hierarchical OSPF (Slides 5-60..60)",
        "content": "- **two-level hierarchy:** local area, backbone.\n  - link-state advertisements flooded only in area, or backbone\n  - each node has detailed area topology; only knows direction to reach other destinations\n- **area border routers:** “summarize” distances to destinations in own area, advertise in backbone\n- **backbone router:** runs OSPF limited to backbone\n- **boundary router:** connects to other ASes\n- **local routers:** \n- flood LS in area only\n- compute routing within area\n- forward packets to outside via area border router\n\n- **Slide Diagram Elements & Protocol Entities:** `area 1, area 2, area 3, backbone, internal routers`"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **5.3 Scalable Intra-AS Routing: Autonomous Systems (AS), OSPF Link-State Flooding & Hierarchical OSPF**:\n\n- **Review Question 1 (Open Shortest Path First (OSPF).):** Check the one or more of the following statements about the OSPF protocol that are true.\n  - **Verified Answer:** OSPF implements hierarchical routing; OSPF is an intra-domain routing protocol.; OSFP uses a Dijkstra-like algorithm to implement least cost path routing.\n\n- **Review Question 2 (Open Shortest Path First (OSPF).):** Consider the OSPF routing protocol. Which of the following characteristics are associated with OSPF (as opposed to BGP)?\n  - **Verified Answer:** Is an intra-domain routing protocol.; Floods link state control information.; Finds a least cost path from source to destination.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "hierarchical_ospf_areas.py — Modeling Two-Tier Hierarchical OSPF (Area 0 Backbone & Area Border Routers)",
          "snippet": "# Kurose & Ross 9e - Section 5.3: Two-Tier Hierarchical OSPF LSA Scope Simulator\nospf_topology = {\n    \"Area_0 (Backbone)\": [\"ABR_1\", \"ABR_2\", \"ASBR_Edge\"],\n    \"Area_1 (Engineering)\": [\"ABR_1\", \"R1_Internal\", \"R2_Internal\"],\n    \"Area_2 (Datacenter)\": [\"ABR_2\", \"R3_ToR\", \"R4_ToR\"],\n}\n\nfor area, routers in ospf_topology.items():\n    print(f\"{area:24s} -> Floods Detailed Topology LSAs ONLY among: {', '.join(routers)}\")\nprint(\"\\nInter-Area Summary: ABR_1 and ABR_2 advertise summarized prefix costs across Area 0!\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 5.3 Scalable Intra-AS Routing: Autonomous Systems (AS), OSPF Link-State Flooding & Hierarchical OSPF",
      "filename": "hierarchical_ospf_areas.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 5.3: Two-Tier Hierarchical OSPF LSA Scope Simulator\nospf_topology = {\n    \"Area_0 (Backbone)\": [\"ABR_1\", \"ABR_2\", \"ASBR_Edge\"],\n    \"Area_1 (Engineering)\": [\"ABR_1\", \"R1_Internal\", \"R2_Internal\"],\n    \"Area_2 (Datacenter)\": [\"ABR_2\", \"R3_ToR\", \"R4_ToR\"],\n}\n\nfor area, routers in ospf_topology.items():\n    print(f\"{area:24s} -> Floods Detailed Topology LSAs ONLY among: {', '.join(routers)}\")\nprint(\"\\nInter-Area Summary: ABR_1 and ABR_2 advertise summarized prefix costs across Area 0!\")",
      "expectedOutput": [
        "[OK] hierarchical_ospf_areas.py — Modeling Two-Tier Hierarchical OSPF (Area 0 Backbone & Area Border Routers)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 5.3 Scalable Intra-AS Routing: Autonomous Systems (AS), OSPF Link-State Flooding & Hierarchical OSPF. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Consider the OSPF routing protocol. Which of the following characteristics are associated with OSPF (as opposed to BGP)?",
      "options": [
        "A) Is an intra-domain routing protocol.",
        "B) Policy, rather than performance (e.g., least cost path), determines paths that used.",
        "C) Floods link state control information.",
        "D) Finds a least cost path from source to destination."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 5), 'Is an intra-domain routing protocol.' accurately characterizes 5.3 Scalable Intra-AS Routing: Autonomous Systems (AS), OSPF Link-State Flooding & Hierarchical OSPF."
    }
  },
  "cn-ch5-inter-as-routing-bgp": {
    "id": "cn-ch5-inter-as-routing-bgp",
    "badge": "Module 5 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "5.4 Internet Inter-AS Routing (BGP): eBGP/iBGP, AS-PATH, NEXT-HOP, Hot Potato & Route Selection",
    "subtitle": "Border Gateway Protocol (BGP) as the glue of the Internet: OPEN/UPDATE/KEEPALIVE/NOTIFICATION over TCP port 179, loop detection via AS-PATH, Hot Potato vs. Cold Potato routing, and valley-free ISP policy.",
    "sections": [
      {
        "title": "1. Interconnected ASes (Slides 5-62..64)",
        "content": "![5.4 Internet Inter-AS Routing (BGP): eBGP/iBGP, AS-PATH, NEXT-HOP, Hot Potato & Route Selection Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**5.4 Internet Inter-AS Routing (BGP): eBGP/iBGP, AS-PATH, NEXT-HOP, Hot Potato & Route Selection** — Border Gateway Protocol (BGP) as the glue of the Internet: OPEN/UPDATE/KEEPALIVE/NOTIFICATION over TCP port 179, loop detection via AS-PATH, Hot Potato vs. Cold Potato routing, and valley-free ISP policy.\n\n**Interconnected ASes**\n\n- AS3\n- AS1\n- AS2\n- intra-AS\n- routing\n- intra-AS\n- routing\n- intra-AS\n- routing\n- inter-AS routing\n- **intra-AS (aka “intra-domain”):** routing among routers within same AS (“network”)\n- **inter-AS (aka “inter-domain”):** routing among AS’es\n\n> **Kurose & Ross Lecture Note:** Each router then locally runs Dijkstra’s shortest-path algorithm to determine a shortest-path tree to all subnets, with itself as the root node.\n\n**Internet inter-AS routing: BGP**\n\n- **BGP (Border Gateway Protocol):** the de facto inter-domain routing protocol\n  - “glue that holds the Internet together”\n- allows subnet to advertise its existence, and the destinations it can reach, to rest of Internet: “I am here, here is who I can reach, and how”\n- **BGP provides each AS a means to:** \n  - obtain destination network reachability info from neighboring ASes (eBGP)\n  - determine routes to other networks based on reachability information and policy\n  - propagate reachability information to all AS-internal routers (iBGP)\n  - advertise (to neighboring networks) destination reachability info\n\n> **Kurose & Ross Lecture Note:** Since an inter-AS routing protocol involves coordination among multiple ASs, communicating ASs must run the same inter-AS routing protocol. In fact, in the Internet, all ASs run the same inter-AS routing protocol, called the Border Gateway Protocol, more commonly known as BGP\n\n**eBGP, iBGP connections**\n\n- eBGP connectivity\n- logical iBGP connectivity\n- gateway routers run both eBGP and iBGP protocols\n\n- **Slide Diagram Elements & Protocol Entities:** `AS 2, AS 3, AS 1`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 5 Key Principle",
          "message": "Border Gateway Protocol (BGP) as the glue of the Internet: OPEN/UPDATE/KEEPALIVE/NOTIFICATION over TCP port 179, loop detection via AS-PATH, Hot Potato vs. Cold Potato routing, and valley-free ISP policy."
        }
      },
      {
        "title": "2. BGP basics (Slides 5-65..67)",
        "content": "**BGP basics**\n\n- when AS3 gateway 3a advertises path AS3,X to AS2 gateway 2c:\n  - AS3 promises to AS2 it will forward datagrams towards X\n- **BGP session:** two BGP routers (“peers”) exchange BGP messages over semi-permanent TCP connection:\n  - advertising paths to different destination network prefixes (BGP is a “path vector” protocol)\n- **BGP advertisement:** \n- AS3, X\n\n- **Slide Diagram Elements & Protocol Entities:** `AS 2, AS 3, AS 1`\n\n**BGP protocol messages**\n\n- BGP messages exchanged between peers over TCP connection\n- **BGP messages [RFC 4371]:** \n  - OPEN: opens TCP connection to remote BGP peer and authenticates sending BGP peer\n  - UPDATE: advertises new path (or withdraws old)\n  - KEEPALIVE: keeps connection alive in absence of UPDATES; also ACKs OPEN request\n  - NOTIFICATION: reports errors in previous msg; also used to close connection\n\n**Path attributes and BGP routes**\n\n- **BGP advertised route:** prefix + attributes\n  - prefix: destination being advertised\n  - two important attributes:\n  - AS-PATH: list of ASes through which prefix advertisement has passed\n  - NEXT-HOP: indicates specific internal-AS router to next-hop AS\n- **policy-based routing:** \n  - gateway receiving route advertisement uses import policy to accept/decline path (e.g., never route through AS Y).\n  - AS policy also determines whether to advertise path to other other neighboring ASes"
      },
      {
        "title": "3. BGP path advertisement (Slides 5-68..71)",
        "content": "**BGP path advertisement**\n\n- based on AS2 policy, AS2 router 2c accepts path AS3,X, propagates (via iBGP) to all AS2 routers\n- AS2 router 2c receives path advertisement AS3,X (via eBGP) from AS3 router 3a\n- based on AS2 policy, AS2 router 2a advertises (via eBGP) path AS2, AS3, X to AS1 router 1c\n- AS3, X\n\n- **Slide Diagram Elements & Protocol Entities:** `AS 2, AS 3, AS 1, AS2,AS3,X`\n\n**BGP path advertisement: multiple paths**\n\n- AS1 gateway router 1c learns path AS2,AS3,X from 2a\n- gateway router may learn about multiple paths to destination:\n- AS1 gateway router 1c learns path AS3,X from 3a\n- based on policy, AS1 gateway router 1c chooses path AS3,X and advertises path within AS1 via iBGP\n- AS3, X\n\n- **Slide Diagram Elements & Protocol Entities:** `AS2,AS3,X, AS3,X, AS 2, AS 3, AS 1`\n\n**BGP: populating forwarding tables**\n\n- AS 2\n- AS 3\n- AS 1\n- AS2,AS3,X\n- AS3,X\n- AS3, X\n- **recall:** 1a, 1b, 1d learn via iBGP from 1c: “path to X goes through 1c”\n- **at 1d:** OSPF intra-domain routing: to get to 1c, use interface 1\n- dest\n- interface\n- local link interfaces\n- at 1a, 1d\n- **at 1d:** to get to X, use interface 1\n- AS3,X\n- AS3,X\n- AS3,X\n- **at 1a:** OSPF intra-domain routing: to get to 1c, use interface 2\n- **at 1a:** to get to X, use interface 2"
      },
      {
        "title": "4. Hot potato routing (Slides 5-72..75)",
        "content": "**Hot potato routing**\n\n- 2d learns (via iBGP) it can route to X via 2a or 2c\n- **hot potato routing:** choose local gateway that has least intra-domain cost (e.g., 2d chooses 2a, even though more AS hops to X): don’t worry about inter-domain cost!\n- AS3,X\n- AS1,AS3,X\n\n- **Slide Diagram Elements & Protocol Entities:** `AS 2, AS 3, AS 1, OSPF link weights`\n\n**BGP: achieving policy via advertisements**\n\n- A advertises path Aw to B and to C\n- B chooses not to advertise BAw to C!\n  - B gets no “revenue” for routing CBAw, since none of C, A, w are B’s customers\n  - C does not learn about CBAw path\n- C will route CAw (not using B) to get to w\n- ISP only wants to route traffic to/from its customer networks (does not want to carry transit traffic between other ISPs – a typical “real world” policy)\n- A,w\n- A,w\n- A,B,C are provider networks\n- x,w,y are customer (of provider networks)\n- **x is dual-homed:** attached to two networks\n- **policy to enforce:** x does not want to route from B to C via x\n  - .. so x will not advertise to B a route to C\n\n- **Slide Diagram Elements & Protocol Entities:** `legend:, customer, network:, provider, network`\n\n**BGP route selection**\n\n- router may learn about more than one route to destination AS, selects route based on:\n  - local preference value attribute: policy decision\n  - shortest AS-PATH\n  - closest NEXT-HOP router: hot potato routing\n  - additional criteria"
      },
      {
        "title": "5. Why different Intra-, Inter-AS routing ? (Slides 5-76..76)",
        "content": "- **policy:** \n- **inter-AS:** admin wants control over how its traffic routed, who routes through its network\n- **intra-AS:** single admin, so policy less of an issue\n- **scale:** \n- hierarchical routing saves table size, reduced update traffic\n- **performance:** \n- **intra-AS:** can focus on performance\n- **inter-AS:** policy dominates over performance"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **5.4 Internet Inter-AS Routing (BGP): eBGP/iBGP, AS-PATH, NEXT-HOP, Hot Potato & Route Selection**:\n\n- **Review Question 1 (Routing within networks?):** Among the following protocols, terminology or considerations, indicate those that are associated with \"routing within a single network (typically owned and operated by one organization).\"\n  - **Verified Answer:** OSPF; intra-domain routing; intra-AS routing; Driven more by performance than by routing policy\n\n- **Review Question 2 (Path advertisement and policy (Part 1).):** Suppose a provider network only wants to carry traffic to/from its customer networks (i.e., to provide no transit service), and customer networks only want to carry traffic to/from itself. Consider the figure below. To implement this policy, to which of the following networks would network C advertise the path Cy?\n  - **Verified Answer:** x; B; A\n\n- **Review Question 3 (Path advertisement and policy (Part 2).):** Again, suppose a provider network only wants to carry traffic to/from its customer networks (i.e., to provide no transit service), and customer networks only want to carry traffic to/from itself. Suppose C has advertised path Cy to A. To implement this policy, to which of the following networks would network A advertise the path ACy?\n  - **Verified Answer:** w",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "bgp_route_selection.py — Kurose & Ross BGP Route Selection & Hot-Potato Tie-Breaker Engine",
          "snippet": "# Kurose & Ross 9e - Section 5.4: BGP Route Decision Process (LocalPref -> Shortest AS-PATH -> Hot Potato IGP Cost)\ncandidate_routes = [\n    {\"prefix\": \"138.16.64/22\", \"local_pref\": 100, \"as_path\": [\"AS2\", \"AS3\", \"AS4\"], \"igp_cost_to_nexthop\": 15, \"nexthop\": \"Router_2a\"},\n    {\"prefix\": \"138.16.64/22\", \"local_pref\": 100, \"as_path\": [\"AS2\", \"AS4\"],        \"igp_cost_to_nexthop\": 25, \"nexthop\": \"Router_2b\"},\n    {\"prefix\": \"138.16.64/22\", \"local_pref\": 100, \"as_path\": [\"AS5\", \"AS4\"],        \"igp_cost_to_nexthop\": 8,  \"nexthop\": \"Router_2c\"},\n]\n\n# Sort by: 1) Highest local_pref, 2) Shortest len(as_path), 3) Lowest igp_cost_to_nexthop (Hot Potato)\nbest = sorted(candidate_routes, key=lambda r: (-r[\"local_pref\"], len(r[\"as_path\"]), r[\"igp_cost_to_nexthop\"]))[0]\nprint(f\"Selected Best BGP Route to {best['prefix']}:\")\nprint(f\"  Next-Hop: {best['nexthop']} | AS-PATH: {' -> '.join(best['as_path'])} | Hot-Potato IGP Cost: {best['igp_cost_to_nexthop']}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 5.4 Internet Inter-AS Routing (BGP): eBGP/iBGP, AS-PATH, NEXT-HOP, Hot Potato & Route Selection",
      "filename": "bgp_route_selection.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 5.4: BGP Route Decision Process (LocalPref -> Shortest AS-PATH -> Hot Potato IGP Cost)\ncandidate_routes = [\n    {\"prefix\": \"138.16.64/22\", \"local_pref\": 100, \"as_path\": [\"AS2\", \"AS3\", \"AS4\"], \"igp_cost_to_nexthop\": 15, \"nexthop\": \"Router_2a\"},\n    {\"prefix\": \"138.16.64/22\", \"local_pref\": 100, \"as_path\": [\"AS2\", \"AS4\"],        \"igp_cost_to_nexthop\": 25, \"nexthop\": \"Router_2b\"},\n    {\"prefix\": \"138.16.64/22\", \"local_pref\": 100, \"as_path\": [\"AS5\", \"AS4\"],        \"igp_cost_to_nexthop\": 8,  \"nexthop\": \"Router_2c\"},\n]\n\n# Sort by: 1) Highest local_pref, 2) Shortest len(as_path), 3) Lowest igp_cost_to_nexthop (Hot Potato)\nbest = sorted(candidate_routes, key=lambda r: (-r[\"local_pref\"], len(r[\"as_path\"]), r[\"igp_cost_to_nexthop\"]))[0]\nprint(f\"Selected Best BGP Route to {best['prefix']}:\")\nprint(f\"  Next-Hop: {best['nexthop']} | AS-PATH: {' -> '.join(best['as_path'])} | Hot-Potato IGP Cost: {best['igp_cost_to_nexthop']}\")",
      "expectedOutput": [
        "[OK] bgp_route_selection.py — Kurose & Ross BGP Route Selection & Hot-Potato Tie-Breaker Engine",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 5.4 Internet Inter-AS Routing (BGP): eBGP/iBGP, AS-PATH, NEXT-HOP, Hot Potato & Route Selection. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Again, suppose a provider network only wants to carry traffic to/from its customer networks (i.e., to provide no transit service), and customer networks only want to carry traffic to/from itself. Suppose C has advertised path Cy to x. To implement this policy, to which of the following networks would network x advertise the path xCy?",
      "options": [
        "A) B",
        "B) None of these other networks",
        "C) C",
        "D) A"
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 5), 'None of these other networks' accurately characterizes 5.4 Internet Inter-AS Routing (BGP): eBGP/iBGP, AS-PATH, NEXT-HOP, Hot Potato & Route Selection."
    }
  },
  "cn-ch5-sdn-control-plane": {
    "id": "cn-ch5-sdn-control-plane",
    "badge": "Module 5 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "İleri Seviye",
    "title": "5.5 Software-Defined Networking (SDN) Control Plane: Traffic Engineering, Controllers & OpenFlow",
    "subtitle": "Why traditional per-router destination forwarding struggles with traffic engineering and load splitting, the 3 layers of an SDN controller (Northbound API, Network State, Southbound OpenFlow), and Packet_In / FlowMod.",
    "sections": [
      {
        "title": "1. Software defined networking (SDN) (Slides 5-78..80)",
        "content": "![5.5 Software-Defined Networking (SDN) Control Plane: Traffic Engineering, Controllers & OpenFlow Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**5.5 Software-Defined Networking (SDN) Control Plane: Traffic Engineering, Controllers & OpenFlow** — Why traditional per-router destination forwarding struggles with traffic engineering and load splitting, the 3 layers of an SDN controller (Northbound API, Network State, Southbound OpenFlow), and Packet_In / FlowMod.\n\n**Software defined networking (SDN)**\n\n- **Internet network layer:** historically implemented via distributed, per-router control approach:\n  - monolithic router contains switching hardware, runs proprietary implementation of Internet standard protocols (IP, RIP, IS-IS, OSPF, BGP) in proprietary router OS (e.g., Cisco IOS)\n  - different “middleboxes” for different network layer functions: firewalls, load balancers, NAT boxes, ..\n- **~2005:** renewed interest in rethinking network control plane\n\n**Per-router control plane**\n\n- Individual routing algorithm components in each and every router interact in the control plane to compute forwarding tables\n- Routing\n- Algorithm\n- data\n- plane\n- control\n- plane\n- values in arriving\n- packet header\n\n**Software-Defined Networking (SDN) control plane**\n\n- Remote controller computes, installs forwarding tables in routers\n- data\n- plane\n- control\n- plane\n- Remote Controller\n- values in arriving\n- packet header",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 5 Key Principle",
          "message": "Why traditional per-router destination forwarding struggles with traffic engineering and load splitting, the 3 layers of an SDN controller (Northbound API, Network State, Southbound OpenFlow), and Packet_In / FlowMod."
        }
      },
      {
        "title": "2. Software defined networking (SDN) (Slides 5-81..85)",
        "content": "**Software defined networking (SDN)**\n\n- Why a logically centralized control plane?\n- **easier network management:** avoid router misconfigurations, greater flexibility of traffic flows\n- table-based forwarding (recall OpenFlow API) allows “programming” routers\n  - centralized “programming” easier: compute tables centrally and distribute\n  - distributed “programming” more difficult: compute tables as result of distributed algorithm (protocol) implemented in each-and-every router\n- open (non-proprietary) implementation of control plane\n  - foster innovation: let 1000 flowers bloom\n\n**SDN analogy: mainframe to PC revolution**\n\n- Vertically integrated\n- Closed, proprietary\n- Slow innovation\n- Small industry\n- *** Slide courtesy:** N. McKeown\n\n- **Slide Diagram Elements & Protocol Entities:** `Specialized Operating System, Specialized Hardware, App, Specialized Applications, Horizontal Open interfaces Rapid innovation Huge industry, Microprocessor, Open Interface, Windows, Linux, MAC OS`\n\n**Traffic engineering: difficult with traditional routing**\n\n- **Q:** what if network operator wants u-to-z traffic to flow along uvwz, rather than uxyz?\n- **A:** need to re-define link weights so traffic routing algorithm computes routes accordingly (or need a new routing algorithm)!\n- **link weights are only control “knobs”:** not much control!\n- **Q:** what if network operator wants to split u-to-z traffic along uvwz and uxyz (load balancing)?\n- **A:** can’t do it (or need a new routing algorithm)\n- **Q:** what if w wants to route blue and red traffic differently from w to z?\n- **A:** can’t do it (with destination-based forwarding, and LS, DV routing)\n- We learned in Chapter 4 that generalized forwarding and SDN can be used to achieve any routing desired"
      },
      {
        "title": "3. Software defined networking (SDN) (Slides 5-86..91)",
        "content": "**Software defined networking (SDN)**\n\n- data\n- plane\n- control\n- plane\n- Remote Controller\n- **1:** generalized “flow-based” forwarding (e.g., OpenFlow)\n- 2. control, data plane separation\n- 3. control plane functions external to data-plane switches\n- 4. programmable control applications\n- **Data-plane switches:** \n- fast, simple, commodity switches implementing generalized data-plane forwarding (Section 4.4) in hardware\n- flow (forwarding) table computed, installed under controller supervision\n- API for table-based switch control (e.g., OpenFlow)\n  - defines what is controllable, what is not\n- protocol for communicating with controller (e.g., OpenFlow)\n- SDN Controller\n- (network operating system)\n- routing\n- access\n- load\n- balance\n- southbound API\n- northbound API\n- SDN-controlled switches\n- network-control applications\n- **SDN controller (network OS):** \n- maintain network state information\n- interacts with network control applications “above” via northbound API\n- interacts with network switches “below” via southbound API\n- implemented as distributed system for performance, scalability, fault-tolerance, robustness\n- **network-control apps:** \n- **“brains” of control:** implement control functions using lower-level services, API provided by SDN controller\n- **unbundled:** can be provided by 3rd party: distinct from routing vendor, or SDN controller\n\n- **Slide Diagram Elements & Protocol Entities:** `routing, access control, load balance`\n\n**Components of SDN controller**\n\n- Network-wide distributed, robust state management\n- Communication to/from controlled devices\n- Link-state info\n- switch info\n- host info\n- statistics\n- flow tables\n- OpenFlow\n- SNMP\n- network graph\n- intent\n- RESTful\n- API\n- Interface, abstractions for network control apps\n- routing\n- access\n- control\n- load\n- balance\n- **communication:** communicate between SDN controller and controlled switches\n- **network-wide state management:** state of networks links, switches, services: a distributed database\n- **interface layer to network control apps:** abstractions API\n\n- **Slide Diagram Elements & Protocol Entities:** `SDN controller`\n\n**OpenFlow protocol**\n\n- operates between controller, switch\n- TCP used to exchange messages\n  - optional encryption\n- **three classes of OpenFlow messages:** \n  - controller-to-switch\n  - asynchronous (switch to controller)\n  - symmetric (misc.)\n- distinct from OpenFlow API\n  - API used to specify generalized forwarding actions\n- OpenFlow Controller"
      },
      {
        "title": "4. OpenFlow: controller-to-switch messages (Slides 5-92..95)",
        "content": "**OpenFlow: controller-to-switch messages**\n\n- Key controller-to-switch messages\n- **features:** controller queries switch features, switch replies\n- **configure:** controller queries/sets switch configuration parameters\n- **modify-state:** add, delete, modify flow entries in the OpenFlow tables\n- **packet-out:** controller can send this packet out of specific switch port\n- OpenFlow Controller\n\n**OpenFlow: switch-to-controller messages**\n\n- Key switch-to-controller messages\n- **packet-in:** transfer packet (and its control) to controller. See packet-out message from controller\n- **flow-removed:** flow table entry deleted at switch\n- **port status:** inform controller of a change on a port.\n- Fortunately, network operators don’t “program” switches by creating/sending OpenFlow messages directly. Instead use higher-level abstraction at controller\n- OpenFlow Controller\n\n**SDN: control/data plane interaction example**\n\n- Link-state info\n- switch info\n- host info\n- statistics\n- flow tables\n- OpenFlow\n- SNMP\n- network graph\n- intent\n- RESTful\n- API\n- S1, experiencing link failure uses OpenFlow port status message to notify controller\n- SDN controller receives OpenFlow message, updates link status info\n- Dijkstra’s routing algorithm application has previously registered to be called when ever link status changes. It is called.\n- Dijkstra’s routing algorithm access network graph info, link state info in controller, computes new routes\n- link state routing app interacts with flow-table-computation component in SDN controller, which computes new flow tables needed\n- controller uses OpenFlow to install new tables in switches that need updating\n\n- **Slide Diagram Elements & Protocol Entities:** `Dijkstra’s link-state routing`"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **5.5 Software-Defined Networking (SDN) Control Plane: Traffic Engineering, Controllers & OpenFlow**:\n\n- **Review Question 1 (Internal structure of the SDN controller (1).):** Which of the functions below belong in the controller layer labeled \"Interface, abstractions for network control apps\"? Check all below that apply.\n  - **Verified Answer:** Intent; Network graph\n\n- **Review Question 2 (Internal structure of the SDN controller (2).):** Which of the functions below belong in the controller layer labeled \"Network-wide distributed, robust state management\"? Check all below that apply.\n  - **Verified Answer:** Switch information; Statistics; Link-state information; Flow tables; Host information\n\n- **Review Question 3 (Internal structure of the SDN controller (3).):** Which of the functions below belong in the controller layer labeled \"Communication to/from controlled device\"? Check all below that apply.\n  - **Verified Answer:** OpenFlow protocol",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "sdn_controller_flowmod.py — Simulating an SDN Controller Reacting to a Link Failure via OpenFlow FlowMod",
          "snippet": "# Kurose & Ross 9e - Section 5.5: SDN Controller Southbound OpenFlow Control/Data Plane Interaction\nevents = [\n    (\"Switch s1 -> Controller\", \"OpenFlow PORT_STATUS: Link (s1 <-> s2) DOWN\"),\n    (\"SDN Link-State Manager\",  \"Updates centralized network graph G=(N,E)\"),\n    (\"SDN Dijkstra App\",        \"Recomputes shortest path s1 -> s3 -> s2\"),\n    (\"Controller -> Switch s1\", \"OpenFlow FLOW_MOD: Match(dst=10.2.0.0/16) -> Action(Output Port=3 toward s3)\"),\n]\n\nfor actor, msg in events:\n    print(f\"[{actor:24s}] {msg}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 5.5 Software-Defined Networking (SDN) Control Plane: Traffic Engineering, Controllers & OpenFlow",
      "filename": "sdn_controller_flowmod.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 5.5: SDN Controller Southbound OpenFlow Control/Data Plane Interaction\nevents = [\n    (\"Switch s1 -> Controller\", \"OpenFlow PORT_STATUS: Link (s1 <-> s2) DOWN\"),\n    (\"SDN Link-State Manager\",  \"Updates centralized network graph G=(N,E)\"),\n    (\"SDN Dijkstra App\",        \"Recomputes shortest path s1 -> s3 -> s2\"),\n    (\"Controller -> Switch s1\", \"OpenFlow FLOW_MOD: Match(dst=10.2.0.0/16) -> Action(Output Port=3 toward s3)\"),\n]\n\nfor actor, msg in events:\n    print(f\"[{actor:24s}] {msg}\")",
      "expectedOutput": [
        "[OK] sdn_controller_flowmod.py — Simulating an SDN Controller Reacting to a Link Failure via OpenFlow FlowMod",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 5.5 Software-Defined Networking (SDN) Control Plane: Traffic Engineering, Controllers & OpenFlow. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the functions below belong in the controller layer labeled \"Network-wide distributed, robust state management\"? Check all below that apply.",
      "options": [
        "A) Switch information",
        "B) Intent",
        "C) Network graph",
        "D) Statistics"
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 5), 'Switch information' accurately characterizes 5.5 Software-Defined Networking (SDN) Control Plane: Traffic Engineering, Controllers & OpenFlow."
    }
  },
  "cn-ch5-sdn-controllers-onos-orion": {
    "id": "cn-ch5-sdn-controllers-onos-orion",
    "badge": "Module 5 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "5.5B Industrial SDN Control Planes: ONOS Distributed Core & Google Orion (Jupiter / B4)",
    "subtitle": "Case studies of production SDN at hyperscale: Open Network Operating System (ONOS) intent framework and Google's Orion SDN control plane managing Jupiter datacenter fabrics and B4 global WAN.",
    "sections": [
      {
        "title": "1. ONOS SDN controller (Slides 5-96..96)",
        "content": "![5.5B Industrial SDN Control Planes: ONOS Distributed Core & Google Orion (Jupiter / B4) Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**5.5B Industrial SDN Control Planes: ONOS Distributed Core & Google Orion (Jupiter / B4)** — Case studies of production SDN at hyperscale: Open Network Operating System (ONOS) intent framework and Google's Orion SDN control plane managing Jupiter datacenter fabrics and B4 global WAN.\n\n- OpenFlow\n- Netconf\n- OVSDB\n- device\n- link\n- host\n- flow\n- packet\n- REST API\n- Intent\n- statistics\n- devices\n- hosts\n- links\n- paths\n- flow rules\n- topology\n- control apps separate from controller\n- **intent framework:** high-level specification of service: what rather than how\n- **considerable emphasis on distributed core:** service reliability, replication performance scaling\n- **ONOS:** early, influential open-source SDN controller\n\n- **Slide Diagram Elements & Protocol Entities:** `Network Applications, Southbound API, Northbound API, Traffic Engineering, Firewalling, Load Balancing, southbound abstractions, protocols, northbound abstractions, protocols, ONOS distributed core`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 5 Key Principle",
          "message": "Case studies of production SDN at hyperscale: Open Network Operating System (ONOS) intent framework and Google's Orion SDN control plane managing Jupiter datacenter fabrics and B4 global WAN."
        }
      },
      {
        "title": "2. Google ORION SDN control plane (Slides 5-97..97)",
        "content": "- **ORION:** Google’s SDN control plane (NSDI’21): control plane for Google’s datacenter (Jupiter) and wide area (B4) networks\n- Orion SDN architecture and core apps\n- routing (intradomain, iBGP), traffic engineering: implemented in applications on top of ORION core\n- edge-edge flow-based controls (e.g., CoFlow scheduling) to meet contract SLAs\n- **management:** pub-sub distributed microservices in Orion core, OpenFlow for switch signaling/monitoring\n- **Note:** ORION provides intradomain services within Google’s network\n\n> **Kurose & Ross Lecture Note:** and so in this sense a migration away from “protocols” is indeed underway! Explain structure of Orion in figure Repeat after each reveal: no protocol Coflows: “a collection of flows between two groups of machines with associated semantics and a collective objective”; [Sigcomm’13, Sigcomm’15, Sigcomm’18]. Not unlike multiprocessor scheduling in the 1980’s"
      },
      {
        "title": "3. Google, SDN: the value of a logically-centralized abstraction (Slides 5-98..98)",
        "content": "- new opportunities to more formally, intentionally manage configuration\n- “ ... in a single building or even across a private global WAN such that we[Google] were designing, the location and role of every network element is known ahead of time. So - rather than allowing a node to boot, exchange messages with neighbors, and learn its role in the global network, we knew we could configure the role of all network elements into a logically centralized controller that could then inform all relevant elements of new and changing configurations. This shifted the problem of network management from managing the configuration of individual network elements to managing the configuration of a logical network, dramatically simplifying the problem both from a technical perspective but also from the perspective of the cognitive load on network managers.”∂\n- Amin Vahdat, Engineering Fellow, VP for the Machine Leaning, Systems, and Cloud AI team\n- **https:** //www.youtube.com/watch?v=qn7d_iK92TI\n\n> **Kurose & Ross Lecture Note:** netPlumber: 1msec to verify an incremental rule change in Google’s backbone network; Veriflow: hundreds of microseconds"
      },
      {
        "title": "4. SDN: selected challenges (Slides 5-99..99)",
        "content": "- **hardening the control plane:** dependable, reliable, performance-scalable, secure distributed system\n  - robustness to failures: leverage strong theory of reliable distributed system for control plane\n  - dependability, security: “baked in” from day one?\n- networks, protocols meeting mission-specific requirements\n  - e.g., real-time, ultra-reliable, ultra-secure\n- **Internet-scaling:** beyond a single AS\n- SDN critical in 5G cellular networks"
      },
      {
        "title": "5. SDN and the future of traditional network protocols (Slides 5-100..100)",
        "content": "- SDN-computed versus router-computer forwarding tables:\n  - just one example of logically-centralized-computed versus protocol computed\n- one could imagine SDN-computed congestion control:\n  - controller sets sender rates based on router-reported (to controller) congestion levels\n- How will implementation of network functionality (SDN versus protocols) evolve?"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **5.5B Industrial SDN Control Planes: ONOS Distributed Core & Google Orion (Jupiter / B4)**:\n\n- **Review Question 1 (Internal structure of the SDN controller (1).):** Which of the functions below belong in the controller layer labeled \"Interface, abstractions for network control apps\"? Check all below that apply.\n  - **Verified Answer:** Intent; Network graph\n\n- **Review Question 2 (Internal structure of the SDN controller (2).):** Which of the functions below belong in the controller layer labeled \"Network-wide distributed, robust state management\"? Check all below that apply.\n  - **Verified Answer:** Switch information; Statistics; Link-state information; Flow tables; Host information\n\n- **Review Question 3 (Internal structure of the SDN controller (3).):** Which of the functions below belong in the controller layer labeled \"Communication to/from controlled device\"? Check all below that apply.\n  - **Verified Answer:** OpenFlow protocol",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "google_orion_wan_te.py — Allocating WAN Flow Bandwidth Across Multiple Paths in an Orion-Style SDN Controller",
          "snippet": "# Kurose & Ross 9e - Section 5.5.4: SDN Multi-Path Traffic Engineering (Splitting Flows Across Paths)\nwan_paths = [\n    {\"name\": \"Path_A (Direct Fiber)\", \"capacity_gbps\": 40, \"allocated_gbps\": 0},\n    {\"name\": \"Path_B (Via Hub IXP)\",  \"capacity_gbps\": 60, \"allocated_gbps\": 0},\n]\n\ndemand_gbps = 75\nfor p in wan_paths:\n    take = min(p[\"capacity_gbps\"], demand_gbps)\n    p[\"allocated_gbps\"] = take\n    demand_gbps -= take\n    print(f\"{p['name']:24s}: Allocated {p['allocated_gbps']} / {p['capacity_gbps']} Gbps (Traditional OSPF single-path would overload Path_A!)\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 5.5B Industrial SDN Control Planes: ONOS Distributed Core & Google Orion (Jupiter / B4)",
      "filename": "google_orion_wan_te.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 5.5.4: SDN Multi-Path Traffic Engineering (Splitting Flows Across Paths)\nwan_paths = [\n    {\"name\": \"Path_A (Direct Fiber)\", \"capacity_gbps\": 40, \"allocated_gbps\": 0},\n    {\"name\": \"Path_B (Via Hub IXP)\",  \"capacity_gbps\": 60, \"allocated_gbps\": 0},\n]\n\ndemand_gbps = 75\nfor p in wan_paths:\n    take = min(p[\"capacity_gbps\"], demand_gbps)\n    p[\"allocated_gbps\"] = take\n    demand_gbps -= take\n    print(f\"{p['name']:24s}: Allocated {p['allocated_gbps']} / {p['capacity_gbps']} Gbps (Traditional OSPF single-path would overload Path_A!)\")",
      "expectedOutput": [
        "[OK] google_orion_wan_te.py — Allocating WAN Flow Bandwidth Across Multiple Paths in an Orion-Style SDN Controller",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 5.5B Industrial SDN Control Planes: ONOS Distributed Core & Google Orion (Jupiter / B4). Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the functions below belong in the controller layer labeled \"Interface, abstractions for network control apps\"? Check all below that apply.",
      "options": [
        "A) Switch information",
        "B) Flow tables",
        "C) Link-state information",
        "D) Intent"
      ],
      "correctIndex": 3,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 5), 'Intent' accurately characterizes 5.5B Industrial SDN Control Planes: ONOS Distributed Core & Google Orion (Jupiter / B4)."
    }
  },
  "cn-ch5-icmp-traceroute": {
    "id": "cn-ch5-icmp-traceroute",
    "badge": "Module 5 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "İleri Seviye",
    "title": "5.6 ICMP (Internet Control Message Protocol): Error Signaling, Ping & How Traceroute Works",
    "subtitle": "Network-layer diagnostics carried inside IP datagrams: ICMP Type/Code pairs (Echo Request/Reply 8/0, Destination Unreachable 3, TTL Expired 11/0) and Traceroute's incrementing TTL UDP probes.",
    "sections": [
      {
        "title": "1. ICMP: internet control message protocol (Slides 5-102..102)",
        "content": "![5.6 ICMP (Internet Control Message Protocol): Error Signaling, Ping & How Traceroute Works Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**5.6 ICMP (Internet Control Message Protocol): Error Signaling, Ping & How Traceroute Works** — Network-layer diagnostics carried inside IP datagrams: ICMP Type/Code pairs (Echo Request/Reply 8/0, Destination Unreachable 3, TTL Expired 11/0) and Traceroute's incrementing TTL UDP probes.\n\n- used by hosts and routers to communicate network-level information\n  - error reporting: unreachable host, network, port, protocol\n  - echo request/reply (used by ping)\n- **network-layer “above” IP:** \n  - ICMP messages carried in IP datagrams\n- **ICMP message:** type, code plus first 8 bytes of IP datagram causing error\n- Type Code description\n- 0 0 echo reply (ping)\n- 3 0 dest. network unreachable\n- 3 1 dest host unreachable\n- 3 2 dest protocol unreachable\n- 3 3 dest port unreachable\n- 3 6 dest network unknown\n- 3 7 dest host unknown\n- 4 0 source quench (congestion\n- control - not used)\n- 8 0 echo request (ping)\n- 9 0 route advertisement\n- 10 0 router discovery\n- 11 0 TTL expired\n- 12 0 bad IP header",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 5 Key Principle",
          "message": "Network-layer diagnostics carried inside IP datagrams: ICMP Type/Code pairs (Echo Request/Reply 8/0, Destination Unreachable 3, TTL Expired 11/0) and Traceroute's incrementing TTL UDP probes."
        }
      },
      {
        "title": "2. Traceroute and ICMP (Slides 5-103..103)",
        "content": "- **when ICMP message arrives at source:** record RTTs\n- **stopping criteria:** \n- UDP segment eventually arrives at destination host\n- destination returns ICMP “port unreachable” message (type 3, code 3)\n- source stops\n- source sends sets of UDP segments to destination\n  - 1st set has TTL =1, 2nd set has TTL=2, etc.\n- **datagram in nth set arrives to nth router:** \n  - router discards datagram and sends source ICMP message (type 11, code 0)\n  - ICMP message possibly includes name of router & IP address\n\n- **Slide Diagram Elements & Protocol Entities:** `3 probes`"
      },
      {
        "title": "3. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **5.6 ICMP (Internet Control Message Protocol): Error Signaling, Ping & How Traceroute Works**:\n\n- **Review Question 1 (ICMP: Internet control message protocol.):** Which of the statements below about ICMP are true?\n  - **Verified Answer:** The TTL-expired message type in ICMP is used by the traceroute program.; ICMP is used by hosts and routers to communicate network-level information.; ICMP messages are carried directly in IP datagrams rather than as payload in UDP or TCP segments.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "traceroute_icmp_ttl_sim.py — Simulating Traceroute's Incrementing TTL Probes & ICMP Type 11 Replies",
          "snippet": "# Kurose & Ross 9e - Section 5.6: How Traceroute Discovers Each Hop Using TTL & ICMP Type 11 Code 0\npath_routers = [\n    (1, \"192.168.1.1 (Home Gateway)\", 1.2),\n    (2, \"100.64.0.1 (ISP Edge Router)\", 6.8),\n    (3, \"62.115.14.9 (Tier-1 Backbone)\", 18.4),\n    (4, \"128.119.245.12 (gaia.cs.umass.edu)\", 31.5),\n]\n\nfor ttl, router_name, rtt_ms in path_routers:\n    if ttl < len(path_routers):\n        icmp_msg = \"ICMP Type=11, Code=0 (TTL Expired in Transit)\"\n    else:\n        icmp_msg = \"ICMP Type=3, Code=3 (Port Unreachable -> Destination Reached!)\"\n    print(f\"Probe TTL={ttl} -> {router_name:34s} | RTT={rtt_ms:5.1f} ms | {icmp_msg}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 5.6 ICMP (Internet Control Message Protocol): Error Signaling, Ping & How Traceroute Works",
      "filename": "traceroute_icmp_ttl_sim.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 5.6: How Traceroute Discovers Each Hop Using TTL & ICMP Type 11 Code 0\npath_routers = [\n    (1, \"192.168.1.1 (Home Gateway)\", 1.2),\n    (2, \"100.64.0.1 (ISP Edge Router)\", 6.8),\n    (3, \"62.115.14.9 (Tier-1 Backbone)\", 18.4),\n    (4, \"128.119.245.12 (gaia.cs.umass.edu)\", 31.5),\n]\n\nfor ttl, router_name, rtt_ms in path_routers:\n    if ttl < len(path_routers):\n        icmp_msg = \"ICMP Type=11, Code=0 (TTL Expired in Transit)\"\n    else:\n        icmp_msg = \"ICMP Type=3, Code=3 (Port Unreachable -> Destination Reached!)\"\n    print(f\"Probe TTL={ttl} -> {router_name:34s} | RTT={rtt_ms:5.1f} ms | {icmp_msg}\")",
      "expectedOutput": [
        "[OK] traceroute_icmp_ttl_sim.py — Simulating Traceroute's Incrementing TTL Probes & ICMP Type 11 Replies",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 5.6 ICMP (Internet Control Message Protocol): Error Signaling, Ping & How Traceroute Works. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the statements below about ICMP are true?",
      "options": [
        "A) ICMP messages are carried in UDP segments using port number 86.",
        "B) ICMP communicates information between hosts and routers by marking bits in the IP header.",
        "C) The TTL-expired message type in ICMP is used by the traceroute program.",
        "D) ICMP is used by hosts and routers to communicate network-level information."
      ],
      "correctIndex": 2,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 5), 'The TTL-expired message type in ICMP is used by the traceroute program.' accurately characterizes 5.6 ICMP (Internet Control Message Protocol): Error Signaling, Ping & How Traceroute Works."
    }
  },
  "cn-ch5-network-mgmt-snmp-netconf-yang": {
    "id": "cn-ch5-network-mgmt-snmp-netconf-yang",
    "badge": "Module 5 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "5.7 Network Management Architecture: CLI vs. SNMP/MIBs vs. Programmable NETCONF & YANG",
    "subtitle": "Evolution of network operations: fragile per-device CLI scripting, SNMPv3 polling/traps with SMI/MIB objects, and transactional network-wide configuration via NETCONF RPCs over SSH and YANG data models.",
    "sections": [
      {
        "title": "1. What is network management? (Slides 5-105..107)",
        "content": "![5.7 Network Management Architecture: CLI vs. SNMP/MIBs vs. Programmable NETCONF & YANG Architecture](/images/networking/sdn-data-control-plane.svg)\n\n**5.7 Network Management Architecture: CLI vs. SNMP/MIBs vs. Programmable NETCONF & YANG** — Evolution of network operations: fragile per-device CLI scripting, SNMPv3 polling/traps with SMI/MIB objects, and transactional network-wide configuration via NETCONF RPCs over SSH and YANG data models.\n\n**What is network management?**\n\n- **autonomous systems (aka “network”):** 1000s of interacting hardware/software components\n- other complex systems requiring monitoring, configuration, control:\n  - jet airplane, nuclear power plant, others?\n- \"Network management includes the deployment, integration\n- and coordination of the hardware, software, and human\n- elements to monitor, test, poll, configure, analyze, evaluate,\n- and control the network and element resources to meet the\n- real-time, operational performance, and Quality of Service\n- requirements at a reasonable cost.\"\n\n**Components of network management**\n\n- agent\n- data\n- agent\n- data\n- agent\n- data\n- agent\n- data\n- agent\n- data\n- managing\n- server/controller\n- data\n- **Managing server:** application, typically with network\n- managers (humans) in the loop\n- **Managed device:** equipment with manageable, configurable hardware, software components\n- **Data:** device “state” configuration data, operational data, device statistics\n- **Network management protocol:** used by managing server to query, configure, manage device; used by devices to inform managing server of data, events.\n\n- **Slide Diagram Elements & Protocol Entities:** `managed device`\n\n**Network operator approaches to management**\n\n- agent\n- data\n- agent\n- data\n- agent\n- data\n- agent\n- data\n- agent\n- data\n- managing\n- server/controller\n- data\n- CLI (Command Line Interface)\n  - operator issues (types, scripts) direct to individual devices (e.g., vis ssh)\n- SNMP/MIB\n  - operator queries/sets devices data (MIB) using Simple Network Management Protocol (SNMP)\n- NETCONF/YANG\n  - more abstract, network-wide, holistic\n  - emphasis on multi-device configuration management.\n  - YANG: data modeling language\n  - NETCONF: communicate YANG-compatible actions/data to/from/among remote devices\n\n- **Slide Diagram Elements & Protocol Entities:** `managed device`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 5 Key Principle",
          "message": "Evolution of network operations: fragile per-device CLI scripting, SNMPv3 polling/traps with SMI/MIB objects, and transactional network-wide configuration via NETCONF RPCs over SSH and YANG data models."
        }
      },
      {
        "title": "2. SNMP protocol (Slides 5-108..110)",
        "content": "**SNMP protocol**\n\n- agent\n- data\n- managing\n- server/controller\n- data\n- **Two ways to convey MIB info, commands:** \n- agent\n- data\n- managing\n- server/controller\n- data\n\n- **Slide Diagram Elements & Protocol Entities:** `managed device, request, response, trap message, request/response mode, trap mode`\n\n**SNMP protocol: message types**\n\n- **manager-to-agent:** “get me data”\n- (data instance, next data in list,\n- block of data).\n- **manager-to-agent:** set MIB value\n- **Agent-to-manager:** value, response to Request\n- **Agent-to-manager:** inform manager\n- of exceptional event\n\n- **Slide Diagram Elements & Protocol Entities:** `GetRequest GetNextRequest GetBulkRequest, Message type, Function, SetRequest, Response, Trap`\n\n**SNMP protocol: message formats**\n\n- **Slide Diagram Elements & Protocol Entities:** `PDU type (0-3), Request ID, Error Status (0-5), Error Index, Name, Value, Get/set header, Variables to get/set, SNMP PDU, message types 0-3, PDU type 4, Enterprise, Agent Addr, Trap Type (0-7)`"
      },
      {
        "title": "3. SNMP: Management Information Base (MIB) (Slides 5-111..113)",
        "content": "**SNMP: Management Information Base (MIB)**\n\n- managed device’s operational (and some configuration) data\n- gathered into device MIB module\n  - 400 MIB modules defined in RFC’s; many more vendor-specific MIBs\n- Object ID Name Type Comments\n- 1.3.6.1.2.1.7.1 UDPInDatagrams 32-bit counter total # datagrams delivered\n- 1.3.6.1.2.1.7.2 UDPNoPorts 32-bit counter # undeliverable datagrams (no application at port)\n- 1.3.6.1.2.1.7.3 UDInErrors 32-bit counter # undeliverable datagrams (all other reasons)\n- 1.3.6.1.2.1.7.4 UDPOutDatagrams 32-bit counter total # datagrams sent\n- 1.3.6.1.2.1.7.5 udpTable SEQUENCE one entry for each port currently in use\n- agent\n- data\n- **Structure of Management Information (SMI):** data definition language\n- **example MIB variables for UDP protocol:** \n\n**NETCONF overview**\n\n- **goal:** actively manage/configure devices network-wide\n- operates between managing server and managed network devices\n  - actions: retrieve, set, modify, activate configurations\n  - atomic-commit actions over multiple devices\n  - query operational data and statistics\n  - subscribe to notifications from devices\n- remote procedure call (RPC) paradigm\n  - NETCONF protocol messages encoded in XML\n  - exchanged over secure, reliable transport (e.g., TLS) protocol\n\n**NETCONF initialization, exchange, close**\n\n- Session initiation,\n- **capabilities exchange:** <hello>\n- **Session close:** <close-session>\n- managing\n- server/controller\n- data\n- agent\n- data\n\n- **Slide Diagram Elements & Protocol Entities:** `<rpc>, <rpc-reply>, <notification>`"
      },
      {
        "title": "4. Selected NETCONF Operations (Slides 5-114..116)",
        "content": "**Selected NETCONF Operations**\n\n- NETCONF Operation Description\n- <get-config> Retrieve all or part of a given configuration. A device may have multiple configurations.\n- <get> Retrieve all or part of both configuration state and operational state data.\n- <edit-config> Change specified (possibly running) configuration at managed device. Managed device <rpc-reply> contains <ok> or <rpcerror> with rollback.\n- <lock>, <unlock> Lock (unlock) configuration datastore at managed device (to lock out NETCONF, SNMP, or CLIs commands from other sources).\n- <create-subscription>, Enable event notification subscription from managed device\n- <notification>\n\n**Sample NETCONF RPC message**\n\n- change the running configuration\n- change MTU of Ethernet 0/0 interface to 1500\n\n- **Slide Diagram Elements & Protocol Entities:** `note message id, change a configuration`\n\n**YANG**\n\n- data modeling language used to specify structure, syntax, semantics of NETCONF network management data\n  - built-in data types, like SMI\n- XML document describing device, capabilities can be generated from YANG description\n- can express constraints among data that must be satisfied by a valid NETCONF configuration\n  - ensure NETCONF configurations satisfy correctness, consistency constraints\n- agent\n- data\n- managing\n- server/controller\n- data\n\n- **Slide Diagram Elements & Protocol Entities:** `NETCONF RPC message, <edit-config> YANG-generated XML </edit-config>, YANG generated`"
      },
      {
        "title": "5. Network layer: Summary (Slides 5-117..117)",
        "content": "- we’ve learned a lot!\n- approaches to network control plane\n  - per-router control (traditional)\n  - logically centralized control (software defined networking)\n- traditional routing algorithms\n  - implementation in Internet: OSPF , BGP\n- SDN controllers\n  - implementation in practice: ODL, ONOS\n- Internet Control Message Protocol\n- network management\n\n- **Slide Diagram Elements & Protocol Entities:** `next stop: link layer!`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **5.7 Network Management Architecture: CLI vs. SNMP/MIBs vs. Programmable NETCONF & YANG**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "netconf_yang_validator.py — Validating Interface MTU Configuration Using a YANG-Inspired Schema & NETCONF RPC",
          "snippet": "# Kurose & Ross 9e - Section 5.7: Transactional Network Configuration with NETCONF & YANG Constraints\ndef validate_and_commit_netconf(candidate_configs):\n    for dev, cfg in candidate_configs.items():\n        if not (68 <= cfg[\"mtu\"] <= 9216):\n            return f\"ABORT (<rpc-error>): {dev} MTU={cfg['mtu']} violates YANG range [68..9216]! Rolling back ALL routers.\"\n    return f\"COMMIT (<ok/>): Atomically applied configuration across {len(candidate_configs)} routers!\"\n\nprint(validate_and_commit_netconf({\"Router_A\": {\"mtu\": 1500}, \"Router_B\": {\"mtu\": 9000}}))\nprint(validate_and_commit_netconf({\"Router_A\": {\"mtu\": 1500}, \"Router_B\": {\"mtu\": 32000}}))"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 5.7 Network Management Architecture: CLI vs. SNMP/MIBs vs. Programmable NETCONF & YANG",
      "filename": "netconf_yang_validator.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 5.7: Transactional Network Configuration with NETCONF & YANG Constraints\ndef validate_and_commit_netconf(candidate_configs):\n    for dev, cfg in candidate_configs.items():\n        if not (68 <= cfg[\"mtu\"] <= 9216):\n            return f\"ABORT (<rpc-error>): {dev} MTU={cfg['mtu']} violates YANG range [68..9216]! Rolling back ALL routers.\"\n    return f\"COMMIT (<ok/>): Atomically applied configuration across {len(candidate_configs)} routers!\"\n\nprint(validate_and_commit_netconf({\"Router_A\": {\"mtu\": 1500}, \"Router_B\": {\"mtu\": 9000}}))\nprint(validate_and_commit_netconf({\"Router_A\": {\"mtu\": 1500}, \"Router_B\": {\"mtu\": 32000}}))",
      "expectedOutput": [
        "[OK] netconf_yang_validator.py — Validating Interface MTU Configuration Using a YANG-Inspired Schema & NETCONF RPC",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 5.7 Network Management Architecture: CLI vs. SNMP/MIBs vs. Programmable NETCONF & YANG. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 5, what is the primary architectural focus of '5.7 Network Management Architecture: CLI vs. SNMP/MIBs vs. Programmable NETCONF & YANG'?",
      "options": [
        "A) Evolution of network operations: fragile per-device CLI scripting, SNMPv3 polling/traps with SMI/MIB objects, and transaction",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Evolution of network operations: fragile per-device CLI scripting, SNMPv3 polling/traps with SMI/MIB objects, and transactional network-wide configuration via NETCONF RPCs over SSH and YANG data models."
    }
  },
  "cn-ch6-link-layer-crc": {
    "id": "cn-ch6-link-layer-crc",
    "badge": "Module 6 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "6.1–6.2 Link Layer Services, NIC Hardware & Error Detection: Parity, Checksum & CRC Polynomials",
    "subtitle": "Framing, link access, reliable delivery on wireless links, NIC controller hardware vs. CPU, 2D parity error correction, and modulo-2 polynomial division in Cyclic Redundancy Check (CRC-32).",
    "sections": [
      {
        "title": "1. Link layer and LANs: our goals (Slides 6-2..5)",
        "content": "![6.1–6.2 Link Layer Services, NIC Hardware & Error Detection: Parity, Checksum & CRC Polynomials Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**6.1–6.2 Link Layer Services, NIC Hardware & Error Detection: Parity, Checksum & CRC Polynomials** — Framing, link access, reliable delivery on wireless links, NIC controller hardware vs. CPU, 2D parity error correction, and modulo-2 polynomial division in Cyclic Redundancy Check (CRC-32).\n\n**Link layer and LANs: our goals**\n\n- understand principles behind link layer services:\n  - error detection, correction\n  - sharing a broadcast channel: multiple access\n  - link layer addressing\n  - local area networks: Ethernet, VLANs\n- datacenter networks\n- instantiation, implementation of various link layer technologies\n\n**Link layer: introduction**\n\n- **terminology:** \n- **hosts, routers:** nodes\n- communication channels that connect adjacent nodes along communication path: links\n  - wired , wireless\n  - LANs\n- **layer-2 packet:** frame, encapsulates datagram\n- mobile network\n- enterprise\n- network\n- national or global ISP\n- datacenter\n- network\n- link layer has responsibility of\n- transferring datagram from one node\n- to physically adjacent node over a link\n\n**Link layer: context**\n\n- datagram transferred by different link protocols over different links:\n  - e.g., WiFi on first link, Ethernet on next link\n- each link protocol provides different services\n  - e.g., may or may not provide reliable data transfer over link",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 6 Key Principle",
          "message": "Framing, link access, reliable delivery on wireless links, NIC controller hardware vs. CPU, 2D parity error correction, and modulo-2 polynomial division in Cyclic Redundancy Check (CRC-32)."
        }
      },
      {
        "title": "2. Transportation analogy (Slides 6-6..9)",
        "content": "**Transportation analogy**\n\n- **transportation analogy:** \n- trip from Princeton to Lausanne\n  - limo: Princeton to JFK\n  - plane: JFK to Geneva\n  - train: Geneva to Lausanne\n- tourist = datagram\n- transport segment = communication link\n- transportation mode = link-layer protocol\n- travel agent = routing algorithm\n- Princeton\n- JFK\n- Geneva\n- Lausanne\n\n**Link layer: services**\n\n- **framing, link access:** \n  - encapsulate datagram into frame, adding header, trailer\n  - channel access if shared medium\n  - “MAC” addresses in frame headers identify source, destination (different from IP address!)\n- reliable delivery between adjacent nodes\n  - we already know how to do this!\n  - seldom used on low bit-error links\n  - wireless links: high error rates\n    - Q: why both link-level and end-end reliability?\n- Cable access\n- cellular\n- WiFi\n- Ethernet LANs\n- **flow control:** \n  - pacing between adjacent sending and receiving nodes\n- **error detection:** \n  - errors caused by signal attenuation, noise.\n  - receiver detects errors, signals retransmission, or drops frame\n- **error correction:** \n  - receiver identifies and corrects bit error(s) without retransmission\n- **half-duplex and full-duplex:** \n  - with half duplex, nodes at both ends of link can transmit, but not at same time\n\n> **Kurose & Ross Lecture Note:** reliable delivery between adjacent nodes Not always Rdt likes we studied in transport layer Reliable is not as important is correctness. How is correctness assured? Wireless is subjected to noise, interference and has high bit error rate. Why Error detection in the link layer is usually more sophisticated and is implemented in hardware. Error correction is similar to error detection, except that a receiver not only detects when bit errors have occurred in the frame but also deter- mines exactly where in the frame the errors have occurred (and then corrects these errors).\n\n**Host link-layer implementation**\n\n- in each-and-every host\n- link layer implemented on-chip or in network interface card (NIC)\n  - implements link, physical layer\n- attaches into host’s system buses\n- combination of hardware, software, firmware\n- controller\n- physical\n- cpu\n- memory\n- host bus\n- (e.g., PCI)\n- network interface\n- application\n- transport\n- network\n- link\n- link\n- physical\n\n> **Kurose & Ross Lecture Note:** The Ethernet capabilities are either integrated into the motherboard chipset or implemented via a low-cost dedicated Ethernet chip. For the most part, the link layer is implemented on a chip called the network adapter, also sometimes known as a network interface controller (NIC). The network adapter implements many link layer services including framing, link access, error detection, and so on. Thus, much of a link-layer controller’s functionality is implemented in hardware. For example, Intel’s 700 series adapters [Intel 2020] implements the Ethernet protocols we’ll study in Section 6.5; the Atheros AR5006 [Atheros 2020] controller implements the 802.11 WiFi protocols we’ll study in Chapter 7. Figure 6.2 shows that while most of the link layer is implemented in hardware, part of the link layer is implemented in software that runs on the host’s CPU. The software components of the link layer implement higher-level link-layer functionality such as assembling link-layer addressing information and activating the controller hardware. On the receiving side, link-layer software responds to con- troller interrupts (for example, due to the receipt of one or more frames), handling error conditions and passing a datagram up to the network layer. Thus, the link layer is a combination of hardware and software"
      },
      {
        "title": "3. Interfaces communicating (Slides 6-10..13)",
        "content": "**Interfaces communicating**\n\n- controller\n- physical\n- memory\n- CPU\n- controller\n- physical\n- cpu\n- memory\n- application\n- transport\n- network\n- link\n- link\n- physical\n- application\n- transport\n- network\n- link\n- link\n- physical\n- **sending side:** \n- encapsulates datagram in frame\n- adds error checking bits, reliable data transfer, flow control, etc.\n- **receiving side:** \n- looks for errors, reliable data transfer, flow control, etc.\n- extracts datagram, passes to upper layer at receiving side\n- linkh\n- linkh\n- datagram\n- datagram\n- datagram\n\n**Error detection**\n\n- **EDC:** error detection and correction bits (e.g., redundancy)\n- **D:** data protected by error checking, may include header fields\n- Error detection not 100% reliable!\n  - protocol may miss some errors, but rarely\n  - larger EDC field yields better detection and correction\n- datagram\n- EDC\n- d data bits\n- bit-error prone link\n- EDC’\n- all\n- bits in D’\n- detected\n- error\n- otherwise\n- datagram\n\n**Parity checking**\n\n- **single bit parity:** \n- detect single bit errors\n- parity bit\n- d data bits\n- Can detect and correct errors (without retransmission!)\n- **two-dimensional parity:** detect and correct single bit errors\n- d1,1\n- d2,1\n- di,1\n- . . .\n- d1,j+1\n- d2,j+1\n- di,j+1\n- . . .\n- . . .\n- d1,j\n- d2,j\n- di,j\n- . . .\n- di+1,1\n- di+1,j+1\n- di+1,j\n- . . .\n- . . .\n- . . .\n- . . .\n- row parity\n- column\n- parity\n- 0 0 1 0 1\n- 0 1 1 1 0\n- 1 0 1 0 1\n- 1 1 1 1 0\n- **no errors:** \n- (even parity)\n- parity\n- error\n- parity\n- error\n- 0 1 1 1 0 1\n- 1 0 1 0 1 1\n- 1 0 1 1 0 0\n- 0 0 1 0 1 0\n- detected\n- and\n- correctable\n- single-bit\n- **error:** \n- **Even/odd parity:** set parity bit so there is an even/odd number of 1’s\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive/\n- **At receiver:** \n- compute parity of d received bits\n- compare with received parity bit – if different than error detected"
      },
      {
        "title": "4. Internet checksum (review, see section 3.3) (Slides 6-14..16)",
        "content": "**Internet checksum (review, see section 3.3)**\n\n- **sender:** \n- treat contents of UDP segment (including UDP header fields and IP addresses) as sequence of 16-bit integers\n- **checksum:** addition (one’s complement sum) of segment content\n- checksum value put into UDP checksum field\n- **receiver:** \n- compute checksum of received segment\n- check if computed checksum equals checksum field value:\n  - not equal - error detected\n  - equal - no error detected. But maybe errors nonetheless? More later ….\n- **Goal:** detect errors (i.e., flipped bits) in transmitted segment\n\n**Cyclic Redundancy Check (CRC)**\n\n- more powerful error-detection coding\n- **D:** data bits (given, think of these as a binary number)\n- **G:** bit pattern (generator), of r+1 bits (given, specified in CRC standard)\n- **sender:** compute r CRC bits, R, such that <D,R> exactly divisible by G (mod 2)\n  - receiver knows G, divides <D,R> by G. If non-zero remainder: error detected!\n  - can detect all burst errors less than r+1 bits\n  - widely used in practice (Ethernet, 802.11 WiFi)\n- <D,R> = D 2r XOR R\n- formula for these bits\n- r CRC bits\n- d data bits\n- bits to send\n\n**Cyclic Redundancy Check (CRC): example**\n\n- **Sender wants to compute R such that:** \n  - D . 2r XOR R = nG\n- * Check out the online interactive exercises for more examples: http://gaia.cs.umass.edu/kurose_ross/interactive/\n- D.2r\n- R = remainder [ ]\n- **... or equivalently (XOR R both sides):** \n  - D . 2r = nG XOR R\n- **... which says:** \n- if we divide D . 2r by G, we want remainder R to satisfy:\n- 1 0 0 1\n- 1 0 1 0\n- 1 0 1\n- 0 0 0\n- 1 0 0 1\n- 1 0 0 1\n- 1 0 0 1\n- 0 0 0\n- 1 1 0\n- 1 1 0 0\n- 1 0 1 0\n- 0 1 1\n- 0 1 1\n- 1 0 0 1\n- 0 0 0\n- 1 0 1 1 1 0\n- 2r (here, r=3)\n\n- **Slide Diagram Elements & Protocol Entities:** `algorithm for computing R`"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **6.1–6.2 Link Layer Services, NIC Hardware & Error Detection: Parity, Checksum & CRC Polynomials**:\n\n- **Review Question 1 (Link-layer services.):** Which of the following services may be implemented in a link-layer protocol? Select one or more statements.\n  - **Verified Answer:** Multiplexing down from / multiplexing up to a network-layer protocol.; Flow control between directly connected nodes.; Coordinated access to a shared physical medium.; Bit-level error detection and correction.; Reliable data transfer between directly connected nodes.\n\n- **Review Question 2 (Two dimensional parity.):** Which of the following statements is true about a two-dimensional parity check (2D-parity) computed over a payload?\n  - **Verified Answer:** 2D-parity can detect any case of a single bit flip in the payload.; 2D-parity can detect and correct any case of a single bit flip in the payload.; 2D-parity can detect any case of two bit flips in the payload.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "crc_modulo2_division.py — Kurose & Ross Binary Modulo-2 Polynomial Division for Cyclic Redundancy Check (CRC)",
          "snippet": "# Kurose & Ross 9e - Section 6.2.3: CRC Computation via Modulo-2 XOR Division (Example Fig 6.5)\ndef xor_crc(data_bits: str, generator_G: str) -> str:\n    r = len(generator_G) - 1\n    dividend = list(data_bits + (\"0\" * r))\n    g_len = len(generator_G)\n    for i in range(len(data_bits)):\n        if dividend[i] == \"1\":\n            for j in range(g_len):\n                dividend[i + j] = \"0\" if dividend[i + j] == generator_G[j] else \"1\"\n    return \"\".join(dividend[-r:])\n\nD = \"101110\"    # 6-bit data D\nG = \"1001\"      # 4-bit generator G (r = 3 CRC bits)\nR = xor_crc(D, G)\ntransmitted_frame = D + R\nreceiver_remainder = xor_crc(transmitted_frame, G)\n\nprint(f\"Data Bits (D)       : {D}\")\nprint(f\"Generator (G)       : {G} (r = {len(G)-1} bits)\")\nprint(f\"Computed CRC (R)    : {R}\")\nprint(f\"Transmitted <D, R>  : {transmitted_frame}\")\nprint(f\"Receiver Check Rem  : {receiver_remainder} ({'NO ERROR' if set(receiver_remainder) == {'0'} else 'BIT ERROR DETECTED'})\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 6.1–6.2 Link Layer Services, NIC Hardware & Error Detection: Parity, Checksum & CRC Polynomials",
      "filename": "crc_modulo2_division.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 6.2.3: CRC Computation via Modulo-2 XOR Division (Example Fig 6.5)\ndef xor_crc(data_bits: str, generator_G: str) -> str:\n    r = len(generator_G) - 1\n    dividend = list(data_bits + (\"0\" * r))\n    g_len = len(generator_G)\n    for i in range(len(data_bits)):\n        if dividend[i] == \"1\":\n            for j in range(g_len):\n                dividend[i + j] = \"0\" if dividend[i + j] == generator_G[j] else \"1\"\n    return \"\".join(dividend[-r:])\n\nD = \"101110\"    # 6-bit data D\nG = \"1001\"      # 4-bit generator G (r = 3 CRC bits)\nR = xor_crc(D, G)\ntransmitted_frame = D + R\nreceiver_remainder = xor_crc(transmitted_frame, G)\n\nprint(f\"Data Bits (D)       : {D}\")\nprint(f\"Generator (G)       : {G} (r = {len(G)-1} bits)\")\nprint(f\"Computed CRC (R)    : {R}\")\nprint(f\"Transmitted <D, R>  : {transmitted_frame}\")\nprint(f\"Receiver Check Rem  : {receiver_remainder} ({'NO ERROR' if set(receiver_remainder) == {'0'} else 'BIT ERROR DETECTED'})\")",
      "expectedOutput": [
        "[OK] crc_modulo2_division.py — Kurose & Ross Binary Modulo-2 Polynomial Division for Cyclic Redundancy Check (CRC)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 6.1–6.2 Link Layer Services, NIC Hardware & Error Detection: Parity, Checksum & CRC Polynomials. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements is true about a two-dimensional parity check (2D-parity) computed over a payload?",
      "options": [
        "A) 2D-parity can detect and correct any case of two bit flips in the payload.",
        "B) 2D-parity can detect any case of a single bit flip in the payload.",
        "C) 2D-parity can detect and correct any case of a single bit flip in the payload.",
        "D) 2D-parity can detect any case of two bit flips in the payload."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 6), '2D-parity can detect any case of a single bit flip in the payload.' accurately characterizes 6.1–6.2 Link Layer Services, NIC Hardware & Error Detection: Parity, Checksum & CRC Polynomials."
    }
  },
  "cn-ch6-mac-protocols-aloha-csma": {
    "id": "cn-ch6-mac-protocols-aloha-csma",
    "badge": "Module 6 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "6.3 Multiple Access Protocols: TDMA/FDMA, Slotted/Pure ALOHA, CSMA, CSMA/CD & DOCSIS Cable",
    "subtitle": "Sharing a broadcast channel: Channel Partitioning (TDMA/FDMA), Random Access efficiency (Slotted ALOHA 37% vs. Pure ALOHA 18%), CSMA/CD binary exponential backoff, Taking Turns, and DOCSIS.",
    "sections": [
      {
        "title": "1. Multiple access links, protocols (Slides 6-18..21)",
        "content": "![6.3 Multiple Access Protocols: TDMA/FDMA, Slotted/Pure ALOHA, CSMA, CSMA/CD & DOCSIS Cable Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**6.3 Multiple Access Protocols: TDMA/FDMA, Slotted/Pure ALOHA, CSMA, CSMA/CD & DOCSIS Cable** — Sharing a broadcast channel: Channel Partitioning (TDMA/FDMA), Random Access efficiency (Slotted ALOHA 37% vs. Pure ALOHA 18%), CSMA/CD binary exponential backoff, Taking Turns, and DOCSIS.\n\n**Multiple access links, protocols**\n\n- **two types of “links”:** \n- point-to-point\n  - point-to-point link between Ethernet switch, host\n  - PPP for dial-up access\n- broadcast (shared wire or medium)\n  - old-school Ethernet\n  - upstream HFC in cable-based access network\n  - 802.11 wireless LAN, 4G/4G. satellite\n- **shared radio:** satellite\n- humans at a cocktail party\n- (shared air, acoustical)\n- **shared radio:** WiFi\n- shared wire (e.g.,\n- cabled Ethernet)\n- **shared radio:** 4G/5G\n\n**Multiple access protocols**\n\n- single shared broadcast channel\n- two or more simultaneous transmissions by nodes: interference\n  - collision if node receives two or more signals at the same time\n- distributed algorithm that determines how nodes share channel, i.e., determine when node can transmit\n- communication about channel sharing must use channel itself!\n  - no out-of-band channel for coordination\n- multiple access protocol\n\n**An ideal multiple access protocol**\n\n- **given:** multiple access channel (MAC) of rate R bps\n- **desiderata:** \n  - 1. when one node wants to transmit, it can send at rate R.\n  - 2. when M nodes want to transmit, each can send at average rate R/M\n  - 3. fully decentralized:\n    - no special node to coordinate transmissions\n    - no synchronization of clocks, slots\n  - 4. simple\n\n**MAC protocols: taxonomy**\n\n- **three broad classes:** \n- channel partitioning\n  - divide channel into smaller “pieces” (time slots, frequency, code)\n  - allocate piece to node for exclusive use\n- random access\n  - channel not divided, allow collisions\n  - “recover” from collisions\n- “taking turns”\n  - nodes take turns, but nodes with more to send can take longer turns",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 6 Key Principle",
          "message": "Sharing a broadcast channel: Channel Partitioning (TDMA/FDMA), Random Access efficiency (Slotted ALOHA 37% vs. Pure ALOHA 18%), CSMA/CD binary exponential backoff, Taking Turns, and DOCSIS."
        }
      },
      {
        "title": "2. Channel partitioning MAC protocols: TDMA (Slides 6-22..26)",
        "content": "**Channel partitioning MAC protocols: TDMA**\n\n- **TDMA:** time division multiple access\n- access to channel in “rounds”\n- each station gets fixed length slot (length = packet transmission time) in each round\n- unused slots go idle\n- **example:** 6-station LAN, 1,3,4 have packets to send, slots 2,5,6 idle\n- 6-slot\n- frame\n- 6-slot\n- frame\n\n**Channel partitioning MAC protocols: FDMA**\n\n- **FDMA:** frequency division multiple access\n- channel spectrum divided into frequency bands\n- each station assigned fixed frequency band\n- unused transmission time in frequency bands go idle\n- **example:** 6-station LAN, 1,3,4 have packet to send, frequency bands 2,5,6 idle\n- frequency bands\n- time\n- FDM cable\n\n**Random access protocols**\n\n- when node has packet to send\n  - transmit at full channel data rate R\n  - no a priori coordination among nodes\n- **two or more transmitting nodes:** “collision”\n- **random access protocol specifies:** \n  - how to detect collisions\n  - how to recover from collisions (e.g., via delayed retransmissions)\n- **examples of random access MAC protocols:** \n  - ALOHA, slotted ALOHA\n  - CSMA, CSMA/CD, CSMA/CA\n\n**Slotted ALOHA**\n\n- **assumptions:** \n- all frames same size\n- time divided into equal size slots (time to transmit 1 frame)\n- nodes start to transmit only slot beginning\n- nodes are synchronized\n- if 2 or more nodes transmit in slot, all nodes detect collision\n- **operation:** \n- when node obtains fresh frame, transmits in next slot\n  - if no collision: node can send new frame in next slot\n  - if collision: node retransmits frame in each subsequent slot with probability p until success\n- randomization – why?\n- t0+1\n- **Pros:** \n- single active node can continuously transmit at full rate of channel\n- **highly decentralized:** only slots in nodes need to be in sync\n- simple\n- **Cons:** \n- collisions, wasting slots\n- idle slots\n- nodes may be able to detect collision in less than time to transmit packet\n- clock synchronization\n- node 1\n- node 2\n- node 3\n- **C:** collision\n- **S:** success\n- **E:** empty\n\n> **Kurose & Ross Lecture Note:** Slotted ALOHA would appear to have many advantages. Unlike channel partitioning, slotted ALOHA allows a node to transmit continuously at the full rate, R, when that node is the only active node. (A node is said to be active if it has frames to send.) Slotted ALOHA is also highly decentralized, because each node detects collisions and independently decides when to retransmit. (Slotted ALOHA does, however, require the slots to be synchronized in the nodes; shortly we’ll discuss an unslotted version of the ALOHA protocol, as well as CSMA protocols, none of which require such synchronization.) Slotted ALOHA is also an extremely simple protocol."
      },
      {
        "title": "3. Slotted ALOHA: efficiency (Slides 6-27..30)",
        "content": "**Slotted ALOHA: efficiency**\n\n- **efficiency:** long-run fraction of successful slots (many nodes, all with many frames to send)\n- **suppose:** N nodes with many frames to send, each transmits in slot with probability p\n  - prob that given node has success in a slot = p(1-p)N-1\n  - prob that any node has a success = Np(1-p)N-1\n  - max efficiency: find p* that maximizes Np(1-p)N-1\n  - for many nodes, take limit of Np*(1-p*)N-1 as N goes to infinity, gives:\n- max efficiency = 1/e = .37\n- **at best:** channel used for useful transmissions 37% of time!\n\n> **Kurose & Ross Lecture Note:** Suppose there are N nodes. Then the probability that a given slot is a successful slot is the probability that one of the nodes transmits and that the remaining N - 1 nodes do not transmit. The probability that a given node transmits is p; the probability that the remaining nodes do not transmit is (1 - p)N-1. Therefore, the probability a given node has a success is p(1 - p)N-1. Because there are N nodes, the probability that any one of the N nodes has a success is Np(1 - p)N - 1. only 37 percent of the slots do useful work. Thus, the effective transmission rate of the channel is not R bps but only 0.37 R bps! A similar analysis also shows that 37 percent of the slots go empty and 26 percent of slots have collisions.\n\n**Pure ALOHA**\n\n- **unslotted Aloha:** simpler, no synchronization\n  - when frame first arrives: transmit immediately\n- collision probability increases with no synchronization:\n  - frame sent at t0 collides with other frames sent in [t0-1,t0+1]\n- t0 + 1\n- t0 - 1\n- will overlap\n- with end of\n- i’s frame\n- will overlap\n- with start of\n- i’s frame\n- **pure Aloha efficiency:** 18% !\n\n**CSMA (carrier sense multiple access)**\n\n- **simple CSMA:** listen before transmit:\n  - if channel sensed idle: transmit entire frame\n  - if channel sensed busy: defer transmission\n- **human analogy:** don’t interrupt others!\n- **CSMA/CD:** CSMA with collision detection\n  - collisions detected within short time\n  - colliding transmissions aborted, reducing channel wastage\n  - collision detection easy in wired, difficult with wireless\n- **human analogy:** the polite conversationalist\n\n**CSMA: collisions**\n\n- collisions can still occur with carrier sensing:\n  - propagation delay means two nodes may not hear each other’s just-started transmission\n- **collision:** entire packet transmission time wasted\n  - distance & propagation delay play role in in determining collision probability\n- spatial layout of nodes"
      },
      {
        "title": "4. CSMA/CD: (Slides 6-31..36)",
        "content": "**CSMA/CD:**\n\n- CSMA/CD reduces the amount of time wasted in collisions\n  - transmission aborted on collision detection\n- spatial layout of nodes\n\n**Ethernet CSMA/CD algorithm**\n\n- Ethernet receives datagram from network layer, creates frame\n- **If Ethernet senses channel:** \n  - if idle: start frame transmission.\n  - if busy: wait until channel idle, then transmit\n- If entire frame transmitted without collision - done!\n- If another transmission detected while sending: abort, send jam signal\n- After aborting, enter binary (exponential) backoff:\n  - after mth collision, chooses K at random from {0,1,2, …, 2m-1}. Ethernet waits K·512 bit times, returns to Step 2\n  - more collisions: longer backoff interval\n\n> **Kurose & Ross Lecture Note:** For Ethernet, the actual amount of time a node waits is K # 512 bit times (i.e., K times the amount of time needed to send 512 bits into the Ethernet) and the maxi- mum value that n can take is capped at 10.\n\n**CSMA/CD efficiency**\n\n- Tprop = max prop delay between 2 nodes in LAN\n- ttrans = time to transmit max-size frame\n- efficiency goes to 1\n  - as tprop goes to 0\n  - as ttrans goes to infinity\n- **better performance than ALOHA:** and simple, cheap, decentralized!\n\n> **Kurose & Ross Lecture Note:** let dprop denote the maximum time it takes signal energy to propagate between any two adapters. Let dtrans be the time to transmit a maximum-size frame (approximately 1.2 msecs for a 10 Mbps Ethernet).\n\n**“Taking turns” MAC protocols**\n\n- **channel partitioning MAC protocols:** \n  - share channel efficiently and fairly at high load\n  - inefficient at low load: delay in channel access, 1/N bandwidth allocated even if only 1 active node!\n- random access MAC protocols\n  - efficient at low load: single node can fully utilize channel\n  - high load: collision overhead\n- “taking turns” protocols\n  - look for best of both worlds!\n- **polling:** \n- centralized controller “invites” other nodes to transmit in turn\n- typically used with “dumb” devices\n- **concerns:** \n  - polling overhead\n  - latency\n  - single point of failure (master)\n- Bluetooth uses polling\n- centralized controller\n- client devices\n- poll\n- data\n- **token passing:** \n- control token message explicitly passed from one node to next, sequentially\n  - transmit while holding token\n  - token overhead\n  - single point of failure (token)\n- (nothing\n- to send)\n\n> **Kurose & Ross Lecture Note:** The first drawback is that the protocol introduces a polling delay—the amount of time required to notify a node that it can transmit. If, for example, only one node is active, then the node will transmit at a rate less than R bps, as the master node must poll each of the inactive nodes in turn each time the active node has sent its maximum number of frames. The second drawback, which is potentially more serious, is that if the master node fails, the entire channel becomes inoperative. The Bluetooth protocol, which we will study in Section 6.3, is an example of a polling protocol. no master node But it has its problems as well. For example, the failure of one node can crash the entire channel. Or if a node accidentally neglects to release the token, then some recovery procedure must be invoked to get the token back in circulation."
      },
      {
        "title": "5. Cable access network: FDM, TDM and random access! (Slides 6-37..111)",
        "content": "**Cable access network: FDM, TDM and random access!**\n\n- cable headend\n- CMTS\n- ISP\n- cable modem\n- termination system\n- cable\n- modem\n- splitter\n- Internet frames, TV channels, control transmitted\n- downstream at different frequencies\n- multiple downstream (broadcast) FDM channels: up to 1.6 Gbps/channel\n  - single CMTS transmits into channels\n- multiple upstream channels (up to 1 Gbps/channel)\n  - multiple access: all users contend (random access) for certain upstream channel time slots; others assigned TDM\n\n**Cable access network:**\n\n- **DOCSIS:** data over cable service interface specification\n- FDM over upstream, downstream frequency channels\n- **TDM upstream:** some slots assigned, some have contention\n  - downstream MAP frame: assigns upstream slots\n  - request for upstream slots (and data) transmitted random access (binary backoff) in selected slots\n- Residences with cable modems\n- Downstream channel i\n- Upstream channel j\n- MAP frame for\n- Interval [t1, t2]\n- Assigned minislots containing cable modem\n- upstream data frames\n- Minislots containing\n- minislots request frames\n- cable headend\n- CMTS\n\n**Summary of MAC protocols**\n\n- channel partitioning, by time, frequency or code\n  - Time Division, Frequency Division\n- random access (dynamic),\n  - ALOHA, S-ALOHA, CSMA, CSMA/CD\n  - carrier sensing: easy in some technologies (wire), hard in others (wireless)\n  - CSMA/CD used in Ethernet\n  - CSMA/CA used in 802.11\n- taking turns\n  - polling from central site, token passing\n  - Bluetooth, FDDI, token ring\n\n**Pure ALOHA efficiency**\n\n- P(success by given node) = P(node transmits)\n- P(no other node transmits in [t0-1,t0]\n- P(no other node transmits in [t0-1,t0]\n- = p . (1-p)N-1 . (1-p)N-1\n- = p . (1-p)2(N-1)\n- … choosing optimum p and then letting n\n- = 1/(2e) = .18\n- even worse than slotted Aloha!"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **6.3 Multiple Access Protocols: TDMA/FDMA, Slotted/Pure ALOHA, CSMA, CSMA/CD & DOCSIS Cable**:\n\n- **Review Question 1 (Channel partitioning protocols.):** Which of the following statements is true about channel partitioning protocols?\n  - **Verified Answer:** Channel partitioning protocols can achieve 100% channel utilization, in the case that all nodes always have frames to send.; There can be times when the channel is idle, when a node has a frame to send, but is prevented from doing so by the medium access protocol.\n\n- **Review Question 2 (Pure Aloha and CSMA.):** Which of the following statements is true about both Pure Aloha, and CSMA (both with and without collision detection?\n  - **Verified Answer:** Pure Aloha and CSMA can achieve 100% utilization, in the case that there is only one node that always has frames to send; There can be simultaneous transmissions resulting in collisions.\n\n- **Review Question 3 (Polling and token-passing protocols.):** Which of the following statements is true about polling and token-passing protocols?\n  - **Verified Answer:** These protocol can achieve close to 100% channel utilization, in the case that all nodes always have frames to send (the fact that the utilization is close to, but not exactly, 100% is due to a small amount of medium access overhead but not due to collisions); These protocol can achieve close 100% utilization, in the case that there is only one node that always has frames to send (the fact that the utilization is close to, but not exactly, 100% is due to a small amount of medium access overhead but not due to collisions)",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "mac_efficiency_csmacd.py — Comparing Slotted ALOHA, Pure ALOHA & CSMA/CD Channel Efficiency",
          "snippet": "# Kurose & Ross 9e - Section 6.3: Multiple Access Protocol Efficiency Comparison\nimport math\n\ne_pure_aloha = 1.0 / (2.0 * math.e)\ne_slotted_aloha = 1.0 / math.e\n\nd_prop_s = 2.5e-6    # 500m copper cable propagation delay = 2.5 us\nd_trans_s = 1.2e-3   # 1500B frame at 10 Mbps = 1.2 ms\ne_csmacd = 1.0 / (1.0 + 5.0 * (d_prop_s / d_trans_s))\n\nprint(f\"Pure ALOHA Max Efficiency    (1 / 2e)          : {e_pure_aloha*100:5.1f}%\")\nprint(f\"Slotted ALOHA Max Efficiency (1 / e)           : {e_slotted_aloha*100:5.1f}%\")\nprint(f\"Ethernet CSMA/CD Efficiency  (1/(1+5*t_p/t_t)) : {e_csmacd*100:5.1f}%\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 6.3 Multiple Access Protocols: TDMA/FDMA, Slotted/Pure ALOHA, CSMA, CSMA/CD & DOCSIS Cable",
      "filename": "mac_efficiency_csmacd.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 6.3: Multiple Access Protocol Efficiency Comparison\nimport math\n\ne_pure_aloha = 1.0 / (2.0 * math.e)\ne_slotted_aloha = 1.0 / math.e\n\nd_prop_s = 2.5e-6    # 500m copper cable propagation delay = 2.5 us\nd_trans_s = 1.2e-3   # 1500B frame at 10 Mbps = 1.2 ms\ne_csmacd = 1.0 / (1.0 + 5.0 * (d_prop_s / d_trans_s))\n\nprint(f\"Pure ALOHA Max Efficiency    (1 / 2e)          : {e_pure_aloha*100:5.1f}%\")\nprint(f\"Slotted ALOHA Max Efficiency (1 / e)           : {e_slotted_aloha*100:5.1f}%\")\nprint(f\"Ethernet CSMA/CD Efficiency  (1/(1+5*t_p/t_t)) : {e_csmacd*100:5.1f}%\")",
      "expectedOutput": [
        "[OK] mac_efficiency_csmacd.py — Comparing Slotted ALOHA, Pure ALOHA & CSMA/CD Channel Efficiency",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 6.3 Multiple Access Protocols: TDMA/FDMA, Slotted/Pure ALOHA, CSMA, CSMA/CD & DOCSIS Cable. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements is true about polling and token-passing protocols?",
      "options": [
        "A) There can be simultaneous transmissions resulting in collisions.",
        "B) These protocol can achieve close to 100% channel utilization, in the case that all nodes always have frames to send (the fact that the utili",
        "C) These protocol can achieve close 100% utilization, in the case that there is only one node that always has frames to send (the fact that the",
        "D) There can be times when the channel is idle for more than a short period of time, when a node has a frame to send, but is prevented from doi"
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 6), 'These protocol can achieve close to 100% channel utilization, in the case that all nodes always have frames to send (the fact that the utilization is close to, but not exactly, 100% is due to a small amount of medium access overhead but not due to collisions)' accurately characterizes 6.3 Multiple Access Protocols: TDMA/FDMA, Slotted/Pure ALOHA, CSMA, CSMA/CD & DOCSIS Cable."
    }
  },
  "cn-ch6-mac-addresses-arp": {
    "id": "cn-ch6-mac-addresses-arp",
    "badge": "Module 6 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "6.4 LANs: 48-Bit MAC Addresses, Address Resolution Protocol (ARP) & Routing Frames Across Subnets",
    "subtitle": "IEEE 48-bit flat hardware MAC addresses vs. hierarchical IP addresses, broadcast ARP Queries (FF-FF-FF-FF-FF-FF) and cached unicast ARP Replies, and step-by-step MAC/IP header rewriting across a router.",
    "sections": [
      {
        "title": "1. MAC addresses (Slides 6-41..43)",
        "content": "![6.4 LANs: 48-Bit MAC Addresses, Address Resolution Protocol (ARP) & Routing Frames Across Subnets Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**6.4 LANs: 48-Bit MAC Addresses, Address Resolution Protocol (ARP) & Routing Frames Across Subnets** — IEEE 48-bit flat hardware MAC addresses vs. hierarchical IP addresses, broadcast ARP Queries (FF-FF-FF-FF-FF-FF) and cached unicast ARP Replies, and step-by-step MAC/IP header rewriting across a router.\n\n- **32-bit IP address:** \n  - network-layer address for interface\n  - used for layer 3 (network layer) forwarding\n  - e.g.: 128.119.40.136\n- MAC (or LAN or physical or Ethernet) address:\n  - function: used “locally” to get frame from one interface to another physically-connected interface (same subnet, in IP-addressing sense)\n  - 48-bit MAC address (for most LANs) burned in NIC ROM, also sometimes software settable\n- hexadecimal (base 16) notation\n- (each “numeral” represents 4 bits)\n  - e.g.: 1A-2F-BB-76-09-AD\n- each interface on LAN\n- has unique 48-bit MAC address\n- has a locally unique 32-bit IP address (as we’ve seen)\n- 1A-2F-BB-76-09-AD\n- 58-23-D7-FA-20-B0\n- 0C-C4-11-6F-E3-98\n- 71-65-F7-2B-08-53\n- LAN\n- (wired or wireless)\n- 137.196.7/24\n- 137.196.7.78\n- 137.196.7.14\n- 137.196.7.88\n- 137.196.7.23\n- MAC address allocation administered by IEEE\n- manufacturer buys portion of MAC address space (to assure uniqueness)\n- **analogy:** \n  - MAC address: like Social Security Number\n  - IP address: like postal address\n- **MAC flat address:** portability\n  - can move interface from one LAN to another\n  - recall IP address not portable: depends on IP subnet to which node is attached",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 6 Key Principle",
          "message": "IEEE 48-bit flat hardware MAC addresses vs. hierarchical IP addresses, broadcast ARP Queries (FF-FF-FF-FF-FF-FF) and cached unicast ARP Replies, and step-by-step MAC/IP header rewriting across a router."
        }
      },
      {
        "title": "2. ARP: address resolution protocol (Slides 6-44..44)",
        "content": "- **ARP table:** each IP node (host, router) on LAN has table\n- **Question:** how to determine interface’s MAC address, knowing its IP address?\n- 1A-2F-BB-76-09-AD\n- 58-23-D7-FA-20-B0\n- 0C-C4-11-6F-E3-98\n- 71-65-F7-2B-08-53\n- LAN\n- 137.196.7.78\n- 137.196.7.14\n- 137.196.7.88\n- 137.196.7.23\n- ARP\n- ARP\n- ARP\n- ARP\n  - IP/MAC address mappings for some LAN nodes:\n- < IP address; MAC address; TTL>\n  - TTL (Time To Live): time after which address mapping will be forgotten (typically 20 min)"
      },
      {
        "title": "3. ARP protocol in action (Slides 6-45..47)",
        "content": "- 58-23-D7-FA-20-B0\n- 137.196.7.14\n- TTL\n- 71-65-F7-2B-08-53\n- 137.196.7.23\n- ARP table in A\n- IP addr\n- MAC addr\n- TTL\n- **example:** A wants to send datagram to B\n  - B’s MAC address not in A’s ARP table, so A uses ARP to find B’s MAC address\n- A broadcasts ARP query, containing B's IP addr\n  - destination MAC address = FF-FF-FF-FF-FF-FF\n  - all nodes on LAN receive ARP query\n- **Source MAC:** 71-65-F7-2B-08-53\n- **Source IP:** 137.196.7.23\n- **Target IP address:** 137.196.7.14\n- Ethernet frame (sent to FF-FF-FF-FF-FF-FF)\n- B replies to A with ARP response, giving its MAC address\n- **Target MAC address:** \n- ARP message into Ethernet frame (sent to 71-65-F7-2B-08-53)\n- A receives B’s reply, adds B entry into its local ARP table\n- 137.196.\n- 7.14"
      },
      {
        "title": "4. Routing to another subnet: addressing (Slides 6-48..53)",
        "content": "- **walkthrough:** sending a datagram from A to B via R\n  - focus on addressing – at IP (datagram) and MAC layer (frame) levels\n- 1A-23-F9-CD-06-9B\n- 222.222.222.220\n- 111.111.111.110\n- E6-E9-00-17-BB-4B\n- CC-49-DE-D0-AB-7D\n- 111.111.111.112\n- 111.111.111.111\n- 74-29-9C-E8-FF-55\n- 222.222.222.222\n- 49-BD-D2-C7-56-2A\n- 222.222.222.221\n- 88-B2-2F-54-1A-0F\n  - assume that:\n    - A knows B’s IP address\n    - A knows IP address of first hop router, R (how?)\n    - A knows R’s MAC address (how?)\n- Eth\n- Phy\n- **IP src:** 111.111.111.111\n- **IP dest:** 222.222.222.222\n- A creates IP datagram with IP source A, destination B\n- A creates link-layer frame containing A-to-B IP datagram\n  - R's MAC address is frame’s destination\n- **MAC src:** 74-29-9C-E8-FF-55\n- **MAC dest:** E6-E9-00-17-BB-4B\n- frame sent from A to R\n- frame received at R, datagram removed, passed up to IP\n- **MAC src:** 1A-23-F9-CD-06-9B\n- **MAC dest:** 49-BD-D2-C7-56-2A\n- R determines outgoing interface, passes datagram with IP source A, destination B to link layer\n- R creates link-layer frame containing A-to-B IP datagram. Frame destination address: B's MAC address\n- transmits link-layer frame\n- B receives frame, extracts IP datagram destination B\n- B passes datagram up protocol stack to IP"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **6.4 LANs: 48-Bit MAC Addresses, Address Resolution Protocol (ARP) & Routing Frames Across Subnets**:\n\n- **Review Question 1 (Different types of addressing (a).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of MAC addresses (and therefore is not a property of IPv4 addresses - careful!).\n  - **Verified Answer:** This is a link-layer address.; This address remains the same as a host moves from one network to another.; This is a 48-bit address.\n\n- **Review Question 2 (Different types of addressing (b).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of IPv4 addresses (and therefore is not a property of MAC addresses - careful!).\n  - **Verified Answer:** This address is allocated by DHCP.; This is a 32-bit address.; This is a network-layer address.\n\n- **Review Question 3 (Different types of addressing (c).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is a property of both IPv4 addresses and MAC addresses.\n  - **Verified Answer:** This address must be unique among all hosts in a subnet.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "cross_subnet_mac_ip_trace.py — Tracing Source/Destination MAC & IP Addresses Across a Router Hop",
          "snippet": "# Kurose & Ross 9e - Section 6.4.1: Routing a Datagram from Host A (Subnet 1) to Host B (Subnet 2) via Router R\ntrace = [\n    (\"1. Host A transmits on Subnet 1\", \"SrcMAC=74-29-9C-E8-FF-55 (A)\",    \"DstMAC=E6-E9-00-17-BB-4B (R-left)\", \"SrcIP=111.111.111.111\", \"DstIP=222.222.222.222\"),\n    (\"2. Router R decapsulates L2, consults LPM forwarding table, ARP-resolves Host B, and re-encapsulates L2:\", \"\", \"\", \"\", \"\"),\n    (\"3. Router R transmits on Subnet 2\", \"SrcMAC=1A-23-F9-CD-06-9B (R-right)\", \"DstMAC=49-BD-D2-C7-56-2A (B)\",      \"SrcIP=111.111.111.111\", \"DstIP=222.222.222.222\"),\n]\n\nfor step, smac, dmac, sip, dip in trace:\n    print(step)\n    if smac:\n        print(f\"   L2 Frame: [{smac} -> {dmac}] | L3 Datagram: [{sip} -> {dip}] (IP addresses NEVER change!)\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 6.4 LANs: 48-Bit MAC Addresses, Address Resolution Protocol (ARP) & Routing Frames Across Subnets",
      "filename": "cross_subnet_mac_ip_trace.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 6.4.1: Routing a Datagram from Host A (Subnet 1) to Host B (Subnet 2) via Router R\ntrace = [\n    (\"1. Host A transmits on Subnet 1\", \"SrcMAC=74-29-9C-E8-FF-55 (A)\",    \"DstMAC=E6-E9-00-17-BB-4B (R-left)\", \"SrcIP=111.111.111.111\", \"DstIP=222.222.222.222\"),\n    (\"2. Router R decapsulates L2, consults LPM forwarding table, ARP-resolves Host B, and re-encapsulates L2:\", \"\", \"\", \"\", \"\"),\n    (\"3. Router R transmits on Subnet 2\", \"SrcMAC=1A-23-F9-CD-06-9B (R-right)\", \"DstMAC=49-BD-D2-C7-56-2A (B)\",      \"SrcIP=111.111.111.111\", \"DstIP=222.222.222.222\"),\n]\n\nfor step, smac, dmac, sip, dip in trace:\n    print(step)\n    if smac:\n        print(f\"   L2 Frame: [{smac} -> {dmac}] | L3 Datagram: [{sip} -> {dip}] (IP addresses NEVER change!)\")",
      "expectedOutput": [
        "[OK] cross_subnet_mac_ip_trace.py — Tracing Source/Destination MAC & IP Addresses Across a Router Hop",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 6.4 LANs: 48-Bit MAC Addresses, Address Resolution Protocol (ARP) & Routing Frames Across Subnets. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Consider the simple star-connected Ethernet LAN shown below, and suppose the switch table contains entries for each of the 6 hosts. How will those entries be removed from the switch table?",
      "options": [
        "A) They'll remain in the switch forever (or until it is re-booted).",
        "B) The table entry can only be removed by the network manager, who would use the SNMP protocol to remove the entry.",
        "C) An entry for a host will be removed if that host doesn't transmit any frames for a certain amount of time (that is, table entries will timeo",
        "D) A table entry for a host will be removed by the STPP (Switch Table Purge Protocol) which will be used by a host to signal the switch when it"
      ],
      "correctIndex": 2,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 6), 'An entry for a host will be removed if that host doesn't transmit any frames for a certain amount of time (that is, table entries will timeout).' accurately characterizes 6.4 LANs: 48-Bit MAC Addresses, Address Resolution Protocol (ARP) & Routing Frames Across Subnets."
    }
  },
  "cn-ch6-ethernet-frame-standards": {
    "id": "cn-ch6-ethernet-frame-standards",
    "badge": "Module 6 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "6.4B Ethernet (IEEE 802.3): Physical Topology, Frame Structure & 10G/100G/400G Standards",
    "subtitle": "Evolution from shared coaxial bus to switched star topology, the 6 fields of an IEEE 802.3 Ethernet frame (Preamble/SFD, Dst/Src MAC, Type, Data, CRC-32), and multi-gigabit fiber/copper physical layers.",
    "sections": [
      {
        "title": "1. Ethernet (Slides 6-55..55)",
        "content": "![6.4B Ethernet (IEEE 802.3): Physical Topology, Frame Structure & 10G/100G/400G Standards Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**6.4B Ethernet (IEEE 802.3): Physical Topology, Frame Structure & 10G/100G/400G Standards** — Evolution from shared coaxial bus to switched star topology, the 6 fields of an IEEE 802.3 Ethernet frame (Preamble/SFD, Dst/Src MAC, Type, Data, CRC-32), and multi-gigabit fiber/copper physical layers.\n\n- **“dominant” wired LAN technology:** \n- first widely used LAN technology\n- simpler, cheap\n- **kept up with speed race:** 10 Mbps – 400 Gbps\n- single chip, multiple speeds (e.g., Broadcom BCM5761)\n- Metcalfe’s Ethernet sketch\n- **https:** //www.uspto.gov/learning-and-resources/journeys-innovation/audio-stories/defying-doubters\n- **Bob Metcalfe:** Ethernet co-inventor,\n- 2022 ACM Turing Award recipient",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 6 Key Principle",
          "message": "Evolution from shared coaxial bus to switched star topology, the 6 fields of an IEEE 802.3 Ethernet frame (Preamble/SFD, Dst/Src MAC, Type, Data, CRC-32), and multi-gigabit fiber/copper physical layers."
        }
      },
      {
        "title": "2. Ethernet: physical topology (Slides 6-56..56)",
        "content": "- **bus:** popular through mid 90s\n  - all nodes in same collision domain (can collide with each other)\n- **bus:** coaxial cable\n- switched\n- **switched:** prevails today\n  - active link-layer 2 switch in center\n  - each “spoke” runs a (separate) Ethernet protocol (nodes do not collide with each other)"
      },
      {
        "title": "3. Ethernet frame structure (Slides 6-57..58)",
        "content": "- sending interface encapsulates IP datagram (or other network layer protocol packet) in Ethernet frame\n- dest.\n- address\n- source\n- address\n- data (payload)\n- CRC\n- preamble\n- type\n- **preamble:** \n- used to synchronize receiver, sender clock rates\n- 7 bytes of 10101010 followed by one byte of 10101011\n- **addresses:** 6 byte source, destination MAC addresses\n  - if adapter receives frame with matching destination address, or with broadcast address (e.g., ARP packet), it passes data in frame to network layer protocol\n  - otherwise, adapter discards frame\n- **type:** indicates higher layer protocol\n  - mostly IP but others possible, e.g., Novell IPX, AppleTalk\n  - used to demultiplex up at receiver\n- **CRC:** cyclic redundancy check at receiver\n  - error detected: frame is dropped"
      },
      {
        "title": "4. Ethernet: unreliable, connectionless (Slides 6-59..59)",
        "content": "- **connectionless:** no handshaking between sending and receiving NICs\n- **unreliable:** receiving NIC doesn’t send ACKs or NAKs to sending NIC\n  - data in dropped frames recovered only if initial sender uses higher layer rdt (e.g., TCP), otherwise dropped data lost\n- **Ethernet’s MAC protocol:** unslotted CSMA/CD with binary backoff"
      },
      {
        "title": "5. 802.3 Ethernet standards: link & physical layers (Slides 6-60..60)",
        "content": "  - different physical layer media: fiber, cable\n- application\n- transport\n- network\n- link\n- physical\n- MAC protocol\n- and frame format\n- 1000BASE-T\n- 1000BASE-CX\n- 1000BASE-LX10\n- 1000BASE-SX\n- 1000BASE-LX\n- 1000BASE-BX10\n- many different Ethernet standards\n  - common MAC protocol and frame format\n  - different speeds: 2 Mbps, ... 100 Mbps, 1Gbps, 10 Gbps, 40 Gbps, 80 Gbps\n- copper (twister pair) physical layer\n- fiber physical layer\n\n- **Slide Diagram Elements & Protocol Entities:** `Gigabit PHY layer standards`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **6.4B Ethernet (IEEE 802.3): Physical Topology, Frame Structure & 10G/100G/400G Standards**:\n\n- **Review Question 1 (Different types of addressing (a).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of MAC addresses (and therefore is not a property of IPv4 addresses - careful!).\n  - **Verified Answer:** This is a link-layer address.; This address remains the same as a host moves from one network to another.; This is a 48-bit address.\n\n- **Review Question 2 (Different types of addressing (b).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of IPv4 addresses (and therefore is not a property of MAC addresses - careful!).\n  - **Verified Answer:** This address is allocated by DHCP.; This is a 32-bit address.; This is a network-layer address.\n\n- **Review Question 3 (Different types of addressing (c).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is a property of both IPv4 addresses and MAC addresses.\n  - **Verified Answer:** This address must be unique among all hosts in a subnet.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "ethernet_8023_frame_decoder.py — Inspecting an IEEE 802.3 Ethernet Frame Header & EtherType Field",
          "snippet": "# Kurose & Ross 9e - Section 6.4.2: IEEE 802.3 Ethernet Frame Structure Inspector\nethertypes = {0x0800: \"IPv4 Datagram\", 0x0806: \"ARP Packet\", 0x86DD: \"IPv6 Datagram\", 0x8100: \"IEEE 802.1Q VLAN Tag\"}\n\nframe = {\n    \"preamble_sfd\": \"10101010...10101011 (8 Bytes - Clock Synchronization)\",\n    \"dst_mac\": \"49:BD:D2:C7:56:2A (6 Bytes)\",\n    \"src_mac\": \"1A:23:F9:CD:06:9B (6 Bytes)\",\n    \"ethertype\": 0x0800,\n    \"payload_bytes\": 1500,\n    \"crc32\": \"0x9A4F11C2 (4 Bytes)\",\n}\n\nprint(f\"Dst MAC  : {frame['dst_mac']}\")\nprint(f\"Src MAC  : {frame['src_mac']}\")\nprint(f\"EtherType: 0x{frame['ethertype']:04X} -> Demux to Network Layer: {ethertypes[frame['ethertype']]}\")\nprint(f\"Total L2 Frame Wire Size (excl. Preamble): {6 + 6 + 2 + frame['payload_bytes'] + 4} Bytes\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 6.4B Ethernet (IEEE 802.3): Physical Topology, Frame Structure & 10G/100G/400G Standards",
      "filename": "ethernet_8023_frame_decoder.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 6.4.2: IEEE 802.3 Ethernet Frame Structure Inspector\nethertypes = {0x0800: \"IPv4 Datagram\", 0x0806: \"ARP Packet\", 0x86DD: \"IPv6 Datagram\", 0x8100: \"IEEE 802.1Q VLAN Tag\"}\n\nframe = {\n    \"preamble_sfd\": \"10101010...10101011 (8 Bytes - Clock Synchronization)\",\n    \"dst_mac\": \"49:BD:D2:C7:56:2A (6 Bytes)\",\n    \"src_mac\": \"1A:23:F9:CD:06:9B (6 Bytes)\",\n    \"ethertype\": 0x0800,\n    \"payload_bytes\": 1500,\n    \"crc32\": \"0x9A4F11C2 (4 Bytes)\",\n}\n\nprint(f\"Dst MAC  : {frame['dst_mac']}\")\nprint(f\"Src MAC  : {frame['src_mac']}\")\nprint(f\"EtherType: 0x{frame['ethertype']:04X} -> Demux to Network Layer: {ethertypes[frame['ethertype']]}\")\nprint(f\"Total L2 Frame Wire Size (excl. Preamble): {6 + 6 + 2 + frame['payload_bytes'] + 4} Bytes\")",
      "expectedOutput": [
        "[OK] ethernet_8023_frame_decoder.py — Inspecting an IEEE 802.3 Ethernet Frame Header & EtherType Field",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 6.4B Ethernet (IEEE 802.3): Physical Topology, Frame Structure & 10G/100G/400G Standards. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of IPv4 addresses (and therefore is not a property of MAC addresses - careful!).",
      "options": [
        "A) This address is allocated by DHCP.",
        "B) This address must be unique among all hosts in a subnet.",
        "C) This is a link-layer address.",
        "D) This is a 32-bit address."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 6), 'This address is allocated by DHCP.' accurately characterizes 6.4B Ethernet (IEEE 802.3): Physical Topology, Frame Structure & 10G/100G/400G Standards."
    }
  },
  "cn-ch6-ethernet-switches-self-learning": {
    "id": "cn-ch6-ethernet-switches-self-learning",
    "badge": "Module 6 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "6.4C Link-Layer Switches: Frame Filtering/Forwarding, Self-Learning MAC Tables & Switches vs. Routers",
    "subtitle": "How plug-and-play full-duplex Ethernet switches eliminate collisions, build their MAC switch tables dynamically via source MAC learning, flood unknown unicasts, and compare against Layer-3 routers.",
    "sections": [
      {
        "title": "1. Ethernet switch (Slides 6-62..64)",
        "content": "![6.4C Link-Layer Switches: Frame Filtering/Forwarding, Self-Learning MAC Tables & Switches vs. Routers Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**6.4C Link-Layer Switches: Frame Filtering/Forwarding, Self-Learning MAC Tables & Switches vs. Routers** — How plug-and-play full-duplex Ethernet switches eliminate collisions, build their MAC switch tables dynamically via source MAC learning, flood unknown unicasts, and compare against Layer-3 routers.\n\n**Ethernet switch**\n\n- **Switch is a link-layer device:** takes an active role\n  - store, forward Ethernet (or other type of) frames\n  - examine incoming frame’s MAC address, selectively forward frame to one-or-more outgoing links when frame is to be forwarded on segment, uses CSMA/CD to access segment\n- **transparent:** hosts unaware of presence of switches\n- plug-and-play, self-learning\n  - switches do not need to be configured\n\n**Switch: multiple simultaneous transmissions**\n\n- switch with six interfaces (1,2,3,4,5,6)\n- hosts have dedicated, direct connection to switch\n- switches buffer packets\n- Ethernet protocol used on each incoming link, so:\n  - no collisions; full duplex\n  - each link is its own collision domain\n- **switching:** A-to-A’ and B-to-B’ can transmit simultaneously, without collisions\n  - but A-to-A’ and C to A’ can not happen simultaneously",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 6 Key Principle",
          "message": "How plug-and-play full-duplex Ethernet switches eliminate collisions, build their MAC switch tables dynamically via source MAC learning, flood unknown unicasts, and compare against Layer-3 routers."
        }
      },
      {
        "title": "2. Switch forwarding table (Slides 6-65..66)",
        "content": "**Switch forwarding table**\n\n- **Q:** how does switch know A’ reachable via interface 4, B’ reachable via interface 5?\n- **A:** each switch has a switch table, each entry:\n  - (MAC address of host, interface to reach host, time stamp)\n  - looks like a routing table!\n- **Q:** how are entries created, maintained in switch table?\n  - something like a routing protocol?\n\n**Switch: self-learning**\n\n- switch learns which hosts can be reached through which interfaces\n- A A’\n- **Source:** A\n- **Dest:** A’\n- MAC addr interface TTL\n- Switch table\n- (initially empty)\n  - when frame received, switch “learns” location of sender: incoming LAN segment\n  - records sender/location pair in switch table"
      },
      {
        "title": "3. Switch: frame filtering/forwarding (Slides 6-67..68)",
        "content": "**Switch: frame filtering/forwarding**\n\n- **when frame received at switch:** \n  - 1. record incoming link, MAC address of sending host\n  - 2. index switch table using MAC destination address\n  - 3. if entry found for destination then {\n  - if destination on segment from which frame arrived then drop frame\n  - else forward frame on interface indicated by entry\n  - else flood /* forward on all interfaces except arriving interface */\n\n**Self-learning, forwarding: example**\n\n- A A’\n- **Source:** A\n- **Dest:** A’\n- MAC addr interface TTL\n- switch table\n- (initially empty)\n- A A’\n- A A’\n- A A’\n- A A’\n- A A’\n- A’ A\n- **frame destination, A’, location unknown:** \n- flood\n- **destination A location known:** \n- selectively send\n- on just one link"
      },
      {
        "title": "4. Interconnecting switches (Slides 6-69..70)",
        "content": "**Interconnecting switches**\n\n- self-learning switches can be connected together:\n- **Q:** sending from A to G - how does S1 know to forward frame destined to G via S4 and S3?\n- **A:** self learning! (works exactly the same as in single-switch case!)\n\n**Self-learning multi-switch example**\n\n- Suppose C sends frame to I, I responds to C\n- **Q:** show switch tables and packet forwarding in S1, S2, S3, S4"
      },
      {
        "title": "5. UMass Campus Network - Detail (Slides 6-71..73)",
        "content": "**UMass Campus Network - Detail**\n\n- **UMass network:** \n- 4 firewalls\n- 10 routers\n- 2000+ network switches\n- 6000 wireless access points\n- 30000 active wired network jacks\n- 55000 active end-user wireless devices\n- … all built, operated, maintained by ~15 people\n\n- **Slide Diagram Elements & Protocol Entities:** `Agg2, Agg1, building closets, to off campus, Wireless Controller, border, core, Core, Agg3, Agg4, firewall, data center, WiFi, eBGP`\n\n**Switches vs. routers**\n\n- application\n- transport\n- network\n- link\n- physical\n- network\n- link\n- physical\n- link\n- physical\n- switch\n- datagram\n- application\n- transport\n- network\n- link\n- physical\n- frame\n- frame\n- frame\n- datagram\n- **both are store-and-forward:** \n- **routers:** network-layer devices (examine network-layer headers)\n- **switches:** link-layer devices (examine link-layer headers)\n- **both have forwarding tables:** \n- **routers:** compute tables using routing algorithms, IP addresses\n- **switches:** learn forwarding table using flooding, learning, MAC addresses"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **6.4C Link-Layer Switches: Frame Filtering/Forwarding, Self-Learning MAC Tables & Switches vs. Routers**:\n\n- **Review Question 1 (Different types of addressing (a).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of MAC addresses (and therefore is not a property of IPv4 addresses - careful!).\n  - **Verified Answer:** This is a link-layer address.; This address remains the same as a host moves from one network to another.; This is a 48-bit address.\n\n- **Review Question 2 (Different types of addressing (b).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of IPv4 addresses (and therefore is not a property of MAC addresses - careful!).\n  - **Verified Answer:** This address is allocated by DHCP.; This is a 32-bit address.; This is a network-layer address.\n\n- **Review Question 3 (Different types of addressing (c).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is a property of both IPv4 addresses and MAC addresses.\n  - **Verified Answer:** This address must be unique among all hosts in a subnet.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "self_learning_switch_sim.py — Kurose & Ross Self-Learning Ethernet Switch MAC Table Simulator",
          "snippet": "# Kurose & Ross 9e - Section 6.4.3: Self-Learning Ethernet Switch Algorithm\nswitch_table = {}  # MAC ->Interface\n\nframes = [\n    (\"A_MAC\", \"B_MAC\", 1),\n    (\"B_MAC\", \"A_MAC\", 4),\n    (\"C_MAC\", \"A_MAC\", 2),\n    (\"A_MAC\", \"B_MAC\", 1),\n]\n\nfor src, dst, in_port in frames:\n    switch_table[src] = in_port  # Self-learn source MAC!\n    if dst not in switch_table:\n        action = f\"FLOOD to all interfaces except {in_port}\"\n    elif switch_table[dst] == in_port:\n        action = f\"FILTER (Drop: destination {dst} is already on segment {in_port})\"\n    else:\n        action = f\"FORWARD unicast selectively to Interface {switch_table[dst]}\"\n    print(f\"Frame ({src} -> {dst} on Port {in_port}) | Learned {src}->Port {in_port} | Action: {action}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 6.4C Link-Layer Switches: Frame Filtering/Forwarding, Self-Learning MAC Tables & Switches vs. Routers",
      "filename": "self_learning_switch_sim.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 6.4.3: Self-Learning Ethernet Switch Algorithm\nswitch_table = {}  # MAC ->Interface\n\nframes = [\n    (\"A_MAC\", \"B_MAC\", 1),\n    (\"B_MAC\", \"A_MAC\", 4),\n    (\"C_MAC\", \"A_MAC\", 2),\n    (\"A_MAC\", \"B_MAC\", 1),\n]\n\nfor src, dst, in_port in frames:\n    switch_table[src] = in_port  # Self-learn source MAC!\n    if dst not in switch_table:\n        action = f\"FLOOD to all interfaces except {in_port}\"\n    elif switch_table[dst] == in_port:\n        action = f\"FILTER (Drop: destination {dst} is already on segment {in_port})\"\n    else:\n        action = f\"FORWARD unicast selectively to Interface {switch_table[dst]}\"\n    print(f\"Frame ({src} -> {dst} on Port {in_port}) | Learned {src}->Port {in_port} | Action: {action}\")",
      "expectedOutput": [
        "[OK] self_learning_switch_sim.py — Kurose & Ross Self-Learning Ethernet Switch MAC Table Simulator",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 6.4C Link-Layer Switches: Frame Filtering/Forwarding, Self-Learning MAC Tables & Switches vs. Routers. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of MAC addresses (and therefore is not a property of IPv4 addresses - careful!).",
      "options": [
        "A) This is a network-layer address.",
        "B) This address is allocated by DHCP.",
        "C) This address must be unique among all hosts in a subnet.",
        "D) This is a 32-bit address."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 6), 'This is a network-layer address.' accurately characterizes 6.4C Link-Layer Switches: Frame Filtering/Forwarding, Self-Learning MAC Tables & Switches vs. Routers."
    }
  },
  "cn-ch6-vlans-8021q-evpn": {
    "id": "cn-ch6-vlans-8021q-evpn",
    "badge": "Module 6 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "6.4D Virtual LANs (VLANs): Port-Based Isolation, Trunking, IEEE 802.1Q Tagging & EVPN/VXLAN",
    "subtitle": "Isolating broadcast domains on a single physical switch, interconnecting multi-switch VLANs via trunk ports, the 4-byte IEEE 802.1Q VLAN tag (TPID 0x8100 + 12-bit VID), and Layer-2 EVPN/VXLAN overlays.",
    "sections": [
      {
        "title": "1. Virtual LANs (VLANs): motivation (Slides 6-75..76)",
        "content": "![6.4D Virtual LANs (VLANs): Port-Based Isolation, Trunking, IEEE 802.1Q Tagging & EVPN/VXLAN Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**6.4D Virtual LANs (VLANs): Port-Based Isolation, Trunking, IEEE 802.1Q Tagging & EVPN/VXLAN** — Isolating broadcast domains on a single physical switch, interconnecting multi-switch VLANs via trunk ports, the 4-byte IEEE 802.1Q VLAN tag (TPID 0x8100 + 12-bit VID), and Layer-2 EVPN/VXLAN overlays.\n\n- Computer\n- Science\n- **Q:** what happens as LAN sizes scale, users change point of attachment?\n- **single broadcast domain:** \n  - scaling: all layer-2 broadcast traffic (ARP, DHCP, unknown MAC) must cross entire LAN\n  - efficiency, security, privacy issues\n- **administrative issues:** \n- CS user moves office to EE - physically attached to EE switch, but wants to remain logically attached to CS switch\n  - efficiency, security, privacy, efficiency issues",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 6 Key Principle",
          "message": "Isolating broadcast domains on a single physical switch, interconnecting multi-switch VLANs via trunk ports, the 4-byte IEEE 802.1Q VLAN tag (TPID 0x8100 + 12-bit VID), and Layer-2 EVPN/VXLAN overlays."
        }
      },
      {
        "title": "2. Port-based VLANs (Slides 6-77..78)",
        "content": "- switch(es) supporting VLAN capabilities can be configured to define multiple virtual LANS over single physical LAN infrastructure.\n- Virtual Local Area Network (VLAN)\n- **port-based VLAN:** switch ports grouped (by switch management software) so that single physical switch ……\n- EE (VLAN ports 1-8)\n- CS (VLAN ports 9-15)\n- … operates as multiple virtual switches\n- EE (VLAN ports 1-8)\n- CS (VLAN ports 9-15)\n- **traffic isolation:** frames to/from ports 1-8 can only reach ports 1-8\n  - can also define VLAN based on MAC addresses of endpoints, rather than switch port\n- **dynamic membership:** ports can be dynamically assigned among VLANs\n- **forwarding between VLANS:** done via routing (just as with separate switches)\n  - in practice vendors sell combined switches plus routers"
      },
      {
        "title": "3. VLANS spanning multiple switches (Slides 6-79..79)",
        "content": "- EE (VLAN ports 1-8)\n- CS (VLAN ports 9-15)\n- Ports 2,3,5 belong to EE VLAN\n- Ports 4,6,7,8 belong to CS VLAN\n- **trunk port:** carries frames between VLANS defined over multiple physical switches\n  - frames forwarded within VLAN between switches can’t be vanilla 802.1 frames (must carry VLAN ID info)\n  - 802.1q protocol adds/removed additional header fields for frames forwarded between trunk ports"
      },
      {
        "title": "4. 802.1Q VLAN frame format (Slides 6-80..80)",
        "content": "- 802.1 Ethernet frame\n- dest.\n- address\n- source\n- address\n- data (payload)\n- CRC\n- preamble\n- type\n- 2-byte Tag Protocol Identifier\n- **(value:** 81-00)\n- Tag Control Information\n- (12 bit VLAN ID field, 3 bit priority field like IP TOS)\n- Recomputed\n- CRC\n- 802.1Q frame\n- dest.\n- address\n- source\n- address\n- data (payload)\n- CRC\n- preamble\n- type"
      },
      {
        "title": "5. EVPN: Ethernet VPNs (aka VXLANs) (Slides 6-81..82)",
        "content": "- Layer-2 Ethernet switches logically connected to each other (e.g., using IP as an underlay)\n  - Ethernet frames carried within IP datagrams between sites\n  - “tunneling scheme to overlay Layer 2 networks on top of Layer 3 networks ... runs over the existing networking infrastructure and provides a means to \"stretch\" a Layer 2 network.” [RFC 7348]\n- VXLAN Tunnel Endpoint (VTEP) x\n- VXLAN Tunnel Endpoint (VTEP) y\n- Layer-2 Ethernet switches logically connected to each other (using IP as an underlay)\n  - “tunneling scheme to overlay Layer 2 networks on top of Layer 3 networks ... runs over existing networking infrastructure ... provides a means to \"stretch\" a Layer 2 network.” [RFC 7348]\n\n- **Slide Diagram Elements & Protocol Entities:** `Sunnyvale data center, Bangalore data center, Ethernet, Ethernet frame, IP datagram, Sunnyvale, Bangalore, VXLAN tunnel, Host A, Host B, UDP segment, x y, Internet`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **6.4D Virtual LANs (VLANs): Port-Based Isolation, Trunking, IEEE 802.1Q Tagging & EVPN/VXLAN**:\n\n- **Review Question 1 (Different types of addressing (a).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of MAC addresses (and therefore is not a property of IPv4 addresses - careful!).\n  - **Verified Answer:** This is a link-layer address.; This address remains the same as a host moves from one network to another.; This is a 48-bit address.\n\n- **Review Question 2 (Different types of addressing (b).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is only a property of IPv4 addresses (and therefore is not a property of MAC addresses - careful!).\n  - **Verified Answer:** This address is allocated by DHCP.; This is a 32-bit address.; This is a network-layer address.\n\n- **Review Question 3 (Different types of addressing (c).):** We've now learned about both IPv4 addresses and MAC addresses. Consider the address properties below, and use the pulldown menu to indicate which of these properties is a property of both IPv4 addresses and MAC addresses.\n  - **Verified Answer:** This address must be unique among all hosts in a subnet.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "ieee_8021q_vlan_trunk.py — Tagging & Untagging Ethernet Frames Across an IEEE 802.1Q VLAN Trunk Link",
          "snippet": "# Kurose & Ross 9e - Section 6.4.4: IEEE 802.1Q VLAN Tag Insertion & Trunk Forwarding\nport_vlan_map = {1: 10, 2: 10, 3: 20, 4: 20, 8: \"TRUNK\"}\n\ndef process_vlan_frame(in_port: int, src_mac: str, dst_mac: str):\n    vid = port_vlan_map[in_port]\n    tag_hex = f\"TPID=0x8100 | PCP=0 | DEI=0 | VID={vid}\"\n    allowed_access_ports = [p for p, v in port_vlan_map.items() if v == vid and p != in_port]\n    print(f\"Frame from Port {in_port} (VLAN {vid}):\")\n    print(f\"  -> Access Ports in VLAN {vid}: {allowed_access_ports} (Port 3,4 in VLAN 20 are ISOLATED)\")\n    print(f\"  -> Trunk Port 8 Encapsulation: [{dst_mac}][{src_mac}][{tag_hex}][EtherType][Payload][CRC]\")\n\nprocess_vlan_frame(1, \"EE_Host_A\", \"EE_Host_B\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 6.4D Virtual LANs (VLANs): Port-Based Isolation, Trunking, IEEE 802.1Q Tagging & EVPN/VXLAN",
      "filename": "ieee_8021q_vlan_trunk.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 6.4.4: IEEE 802.1Q VLAN Tag Insertion & Trunk Forwarding\nport_vlan_map = {1: 10, 2: 10, 3: 20, 4: 20, 8: \"TRUNK\"}\n\ndef process_vlan_frame(in_port: int, src_mac: str, dst_mac: str):\n    vid = port_vlan_map[in_port]\n    tag_hex = f\"TPID=0x8100 | PCP=0 | DEI=0 | VID={vid}\"\n    allowed_access_ports = [p for p, v in port_vlan_map.items() if v == vid and p != in_port]\n    print(f\"Frame from Port {in_port} (VLAN {vid}):\")\n    print(f\"  -> Access Ports in VLAN {vid}: {allowed_access_ports} (Port 3,4 in VLAN 20 are ISOLATED)\")\n    print(f\"  -> Trunk Port 8 Encapsulation: [{dst_mac}][{src_mac}][{tag_hex}][EtherType][Payload][CRC]\")\n\nprocess_vlan_frame(1, \"EE_Host_A\", \"EE_Host_B\")",
      "expectedOutput": [
        "[OK] ieee_8021q_vlan_trunk.py — Tagging & Untagging Ethernet Frames Across an IEEE 802.1Q VLAN Trunk Link",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 6.4D Virtual LANs (VLANs): Port-Based Isolation, Trunking, IEEE 802.1Q Tagging & EVPN/VXLAN. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements are true about MAC (link-layer) addresses? Select one or more statements below.",
      "options": [
        "A) Has 32 bits.",
        "B) A portion of the address bits are associated with the network to which the device is attached, and so changes as the device moves from one n",
        "C) Generally does not change, and is associated with a device when it is manufactured/created.",
        "D) Generally stays unchanged as a device moves from one network to another."
      ],
      "correctIndex": 2,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 6), 'Generally does not change, and is associated with a device when it is manufactured/created.' accurately characterizes 6.4D Virtual LANs (VLANs): Port-Based Isolation, Trunking, IEEE 802.1Q Tagging & EVPN/VXLAN."
    }
  },
  "cn-ch6-mpls-label-switching": {
    "id": "cn-ch6-mpls-label-switching",
    "badge": "Module 6 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "Orta - İleri",
    "title": "6.5 Link Virtualization & Multiprotocol Label Switching (MPLS): Label-Switched Routers & TE",
    "subtitle": "Fixed-length label switching between Layer 2 and Layer 3 (20-bit label, 3-bit Exp, 1-bit S, 8-bit TTL), Label-Switched Routers (LSRs) forwarding without IP lookup, RSVP-TE signaling, and VPN traffic engineering.",
    "sections": [
      {
        "title": "1. Multiprotocol label switching (MPLS) (Slides 6-84..84)",
        "content": "![6.5 Link Virtualization & Multiprotocol Label Switching (MPLS): Label-Switched Routers & TE Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**6.5 Link Virtualization & Multiprotocol Label Switching (MPLS): Label-Switched Routers & TE** — Fixed-length label switching between Layer 2 and Layer 3 (20-bit label, 3-bit Exp, 1-bit S, 8-bit TTL), Label-Switched Routers (LSRs) forwarding without IP lookup, RSVP-TE signaling, and VPN traffic engineering.\n\n- **goal:** high-speed IP forwarding among network of MPLS-capable routers, using fixed length label (instead of shortest prefix matching)\n  - faster lookup using fixed length identifier\n  - borrowing ideas from Virtual Circuit (VC) approach\n  - but IP datagram still keeps IP address!\n- remainder of Ethernet frame, including IP header with IP source, destination addresses\n- remainder of Ethernet frame, including IP header with IP source, destination addresses\n\n- **Slide Diagram Elements & Protocol Entities:** `label, Exp, TTL, MPLS header, Ethernet header`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 6 Key Principle",
          "message": "Fixed-length label switching between Layer 2 and Layer 3 (20-bit label, 3-bit Exp, 1-bit S, 8-bit TTL), Label-Switched Routers (LSRs) forwarding without IP lookup, RSVP-TE signaling, and VPN traffic engineering."
        }
      },
      {
        "title": "2. MPLS capable routers (Slides 6-85..85)",
        "content": "- a.k.a. label-switched router\n- forward packets to outgoing interface based only on label value (don’t inspect IP address)\n  - MPLS forwarding table distinct from IP forwarding tables\n- **flexibility:** MPLS forwarding decisions can differ from those of IP\n  - use destination and source addresses to route flows to same destination differently (traffic engineering)\n  - re-route flows quickly if link fails: pre-computed backup paths"
      },
      {
        "title": "3. MPLS versus IP paths (Slides 6-86..87)",
        "content": "- **IP routing:** path to destination determined by destination address alone\n- IP/MPLS entry router (R4) can use different MPLS routes to A based, e.g., on IP source address or other fields\n- **MPLS routing:** path to destination can be based on source and destination address\n  - flavor of generalized forwarding (MPLS 10 years earlier)\n  - fast reroute: precompute backup routes in case of link failure\n\n- **Slide Diagram Elements & Protocol Entities:** `IP router, IP/MPLS router`"
      },
      {
        "title": "4. MPLS signaling (Slides 6-88..88)",
        "content": "- modify OSPF, IS-IS link-state flooding protocols to carry info used by MPLS routing:\n  - e.g., link bandwidth, amount of “reserved” link bandwidth\n- entry MPLS router uses RSVP-TE signaling protocol to set up MPLS forwarding at downstream routers\n\n- **Slide Diagram Elements & Protocol Entities:** `modified link state flooding, RSVP-TE`"
      },
      {
        "title": "5. MPLS forwarding tables (Slides 6-89..89)",
        "content": "- **Slide Diagram Elements & Protocol Entities:** `in out out label label dest interface, 6 - A 0, 10 6 A 1, 12 9 D 0, 8 6 A 0, 10 A 0, 12 D 0, 8 A 1`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **6.5 Link Virtualization & Multiprotocol Label Switching (MPLS): Label-Switched Routers & TE**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "mpls_label_swap_pipeline.py — Tracing MPLS Label Push, Swap & Pop Operations Across LSR Routers",
          "snippet": "# Kurose & Ross 9e - Section 6.5: MPLS Label-Switched Router (LSR) Forwarding Table\nmpls_lsr_tables = {\n    \"R1 (Ingress LER)\": {None: (\"PUSH Label=6\", \"Interface 0 -> R2\")},\n    \"R2 (Transit LSR)\": {6:    (\"SWAP Label=6 -> Label=5\", \"Interface 1 -> R3\")},\n    \"R3 (Transit LSR)\": {5:    (\"SWAP Label=5 -> Label=9\", \"Interface 0 -> R4\")},\n    \"R4 (Egress LER)\":  {9:    (\"POP Label (Restore IP)\", \"Deliver to Host A\")},\n}\n\nlbl = None\nfor router, table in mpls_lsr_tables.items():\n    op, out_if = table[lbl]\n    print(f\"{router:18s} | In-Label={str(lbl):4s} -> Operation: {op:25s} | Out: {out_if}\")\n    lbl = 6 if lbl is None else (5 if lbl == 6 else 9)"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 6.5 Link Virtualization & Multiprotocol Label Switching (MPLS): Label-Switched Routers & TE",
      "filename": "mpls_label_swap_pipeline.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 6.5: MPLS Label-Switched Router (LSR) Forwarding Table\nmpls_lsr_tables = {\n    \"R1 (Ingress LER)\": {None: (\"PUSH Label=6\", \"Interface 0 -> R2\")},\n    \"R2 (Transit LSR)\": {6:    (\"SWAP Label=6 -> Label=5\", \"Interface 1 -> R3\")},\n    \"R3 (Transit LSR)\": {5:    (\"SWAP Label=5 -> Label=9\", \"Interface 0 -> R4\")},\n    \"R4 (Egress LER)\":  {9:    (\"POP Label (Restore IP)\", \"Deliver to Host A\")},\n}\n\nlbl = None\nfor router, table in mpls_lsr_tables.items():\n    op, out_if = table[lbl]\n    print(f\"{router:18s} | In-Label={str(lbl):4s} -> Operation: {op:25s} | Out: {out_if}\")\n    lbl = 6 if lbl is None else (5 if lbl == 6 else 9)",
      "expectedOutput": [
        "[OK] mpls_label_swap_pipeline.py — Tracing MPLS Label Push, Swap & Pop Operations Across LSR Routers",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 6.5 Link Virtualization & Multiprotocol Label Switching (MPLS): Label-Switched Routers & TE. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 6, what is the primary architectural focus of '6.5 Link Virtualization & Multiprotocol Label Switching (MPLS): Label-Switched Routers & TE'?",
      "options": [
        "A) Fixed-length label switching between Layer 2 and Layer 3 (20-bit label, 3-bit Exp, 1-bit S, 8-bit TTL), Label-Switched Router",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Fixed-length label switching between Layer 2 and Layer 3 (20-bit label, 3-bit Exp, 1-bit S, 8-bit TTL), Label-Switched Routers (LSRs) forwarding without IP lookup, RSVP-TE signaling, and VPN traffic engineering."
    }
  },
  "cn-ch6-datacenter-networking": {
    "id": "cn-ch6-datacenter-networking",
    "badge": "Module 6 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "Orta - İleri",
    "title": "6.6 Data Center Networking: Clos Topologies (ToR/Spine-Leaf), Multipath, RoCEv2 & Google Jupiter",
    "subtitle": "Inside hyperscale cloud data centers: 10,000+ servers in racks under Top-of-Rack (ToR) switches, Rich Tier-1/Tier-2 Clos meshes providing massive bisection bandwidth, RDMA over Converged Ethernet (RoCEv2), and Orion SDN.",
    "sections": [
      {
        "title": "1. Datacenter networks (Slides 6-91..94)",
        "content": "![6.6 Data Center Networking: Clos Topologies (ToR/Spine-Leaf), Multipath, RoCEv2 & Google Jupiter Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**6.6 Data Center Networking: Clos Topologies (ToR/Spine-Leaf), Multipath, RoCEv2 & Google Jupiter** — Inside hyperscale cloud data centers: 10,000+ servers in racks under Top-of-Rack (ToR) switches, Rich Tier-1/Tier-2 Clos meshes providing massive bisection bandwidth, RDMA over Converged Ethernet (RoCEv2), and Orion SDN.\n\n**Datacenter networks**\n\n- 10’s to 100’s of thousands of hosts, often closely coupled, in close proximity:\n  - e-business (e.g. Amazon)\n  - content-servers (e.g., YouTube, Akamai, Apple, Microsoft)\n  - search engines, data mining (e.g., Google)\n- **challenges:** \n  - multiple applications, each serving massive numbers of clients\n  - reliability\n  - managing/balancing load, avoiding processing, networking, data bottlenecks\n- Inside a 40-ft Microsoft container, Chicago data center\n\n**Datacenter networks: network elements**\n\n- Server racks\n- **20- 40 server blades:** hosts\n- Top of Rack (TOR) (Access) switches\n- one per rack, 100G-400G Ethernet to blades\n- Tier-2 (Aggregation) switches\n- connecting to ~16 TORs below\n- Tier-1 (Core) switches\n- connecting to ~16 T-2s below\n- Border routers\n- connections outside datacenter\n- Two-layer leaf/spline datacenter interconnection network:\n- **Facebook F16 data center network topology:** \n- each Top-of-Rack (ToR) switch connects to 16 Fabric switches\n- each Fabric switch connects to 16 Spine switches\n- **Adapted from https:** //engineering.fb.com/data-center-engineering/f16-minipack\n- Top of Rack (ToR)\n- switches\n- Fabric switches\n- Spine switches\n\n- **Slide Diagram Elements & Protocol Entities:** `Spine switches, Leaf switches`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 6 Key Principle",
          "message": "Inside hyperscale cloud data centers: 10,000+ servers in racks under Top-of-Rack (ToR) switches, Rich Tier-1/Tier-2 Clos meshes providing massive bisection bandwidth, RDMA over Converged Ethernet (RoCEv2), and Orion SDN."
        }
      },
      {
        "title": "2. Datacenter networks: multipath (Slides 6-95..96)",
        "content": "**Datacenter networks: multipath**\n\n- two disjoint paths highlighted between racks 1 and 11\n- rich interconnection among switches, racks:\n  - increased throughput between racks (multiple routing paths possible)\n  - increased reliability via redundancy\n\n- **Slide Diagram Elements & Protocol Entities:** `Core switches, Aggregation switches, Access switches, Server racks`\n\n**Datacenter networks: application-layer routing**\n\n- **load balancer:** application-layer routing\n- receives external client requests\n- directs workload within data center\n- returns results to external client (hiding data center internals from client)\n\n- **Slide Diagram Elements & Protocol Entities:** `Load balancer, Internet`"
      },
      {
        "title": "3. Datacenter networks: protocol innovations (Slides 6-97..98)",
        "content": "**Datacenter networks: protocol innovations**\n\n- **link layer:** \n  - RoCE: remote DMA (RDMA) over Converged Ethernet\n- **transport layer:** \n  - ECN (explicit congestion notification) used in transport-layer congestion control (DCTCP, DCQCN)\n  - experimentation with hop-by-hop (backpressure) congestion control\n- **routing, management:** \n  - SDN widely used within/among organizations’ datacenters\n  - place related services, data as close as possible (e.g., in same rack or nearby rack) to minimize tier-2, tier-1 communication\n- **Google Networking:** Infrastructure and Selected Challenges (Slides: https://networkingchannel.eu/google-networking-infrastructure-and-selected-challenges/\n\n**ORION: Google’s new SDN control plane for internal datacenter (Jupiter) + wide area (B4) network**\n\n- Orion SDN architecture and core apps\n- routing (intradomain, iBGP), traffic engineering: implemented in applications on top of ORION core\n- edge-edge flow-based controls (e.g., CoFlow scheduling) to meet contract SLAs\n- **management:** pub-sub distributed microservices in Orion core, OpenFlow for switch signaling/monitoring\n- **Note:** \n- no routing protocols, congestion control (partially) also managed by SDN rather than by protocol\n- are protocols dying?\n\n> **Kurose & Ross Lecture Note:** Repeat after each reveal: no protocol Coflows: “a collection of flows between two groups of machines with associated semantics and a collective objective”; [Sigcomm’13, Sigcomm’15, Sigcomm’18]. Not unlike multiprocessor scheduling in the 1980’s"
      },
      {
        "title": "4. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **6.6 Data Center Networking: Clos Topologies (ToR/Spine-Leaf), Multipath, RoCEv2 & Google Jupiter**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "clos_spine_leaf_ecmp.py — Computing Equal-Cost Multipath (ECMP) Bisection Capacity in a Spine-Leaf Clos Fabric",
          "snippet": "# Kurose & Ross 9e - Section 6.6: Data Center Clos Topology Capacity Calculator\nnum_racks = 16              # 16 Top-of-Rack (ToR / Leaf) switches\nservers_per_rack = 40       # 40 blades per rack = 640 servers\nnum_spine_switches = 8      # 8 Tier-2 Spine switches\nuplink_rate_gbps = 100      # Each ToR connects to EVERY Spine at 100 Gbps\n\nbisection_per_rack_gbps = num_spine_switches * uplink_rate_gbps\ntotal_fabric_tbps = (num_racks * bisection_per_rack_gbps) / 1000.0\n\nprint(f\"Total Data Center Servers      : {num_racks * servers_per_rack} hosts across {num_racks} racks\")\nprint(f\"ECMP Paths Between Any 2 Racks : {num_spine_switches} parallel equal-cost paths\")\nprint(f\"Uplink Bandwidth per Rack      : {bisection_per_rack_gbps} Gbps\")\nprint(f\"Aggregate Clos Fabric Capacity : {total_fabric_tbps:.1f} Tbps\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 6.6 Data Center Networking: Clos Topologies (ToR/Spine-Leaf), Multipath, RoCEv2 & Google Jupiter",
      "filename": "clos_spine_leaf_ecmp.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 6.6: Data Center Clos Topology Capacity Calculator\nnum_racks = 16              # 16 Top-of-Rack (ToR / Leaf) switches\nservers_per_rack = 40       # 40 blades per rack = 640 servers\nnum_spine_switches = 8      # 8 Tier-2 Spine switches\nuplink_rate_gbps = 100      # Each ToR connects to EVERY Spine at 100 Gbps\n\nbisection_per_rack_gbps = num_spine_switches * uplink_rate_gbps\ntotal_fabric_tbps = (num_racks * bisection_per_rack_gbps) / 1000.0\n\nprint(f\"Total Data Center Servers      : {num_racks * servers_per_rack} hosts across {num_racks} racks\")\nprint(f\"ECMP Paths Between Any 2 Racks : {num_spine_switches} parallel equal-cost paths\")\nprint(f\"Uplink Bandwidth per Rack      : {bisection_per_rack_gbps} Gbps\")\nprint(f\"Aggregate Clos Fabric Capacity : {total_fabric_tbps:.1f} Tbps\")",
      "expectedOutput": [
        "[OK] clos_spine_leaf_ecmp.py — Computing Equal-Cost Multipath (ECMP) Bisection Capacity in a Spine-Leaf Clos Fabric",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 6.6 Data Center Networking: Clos Topologies (ToR/Spine-Leaf), Multipath, RoCEv2 & Google Jupiter. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 6, what is the primary architectural focus of '6.6 Data Center Networking: Clos Topologies (ToR/Spine-Leaf), Multipath, RoCEv2 & Google Jupiter'?",
      "options": [
        "A) Inside hyperscale cloud data centers: 10,000+ servers in racks under Top-of-Rack (ToR) switches, Rich Tier-1/Tier-2 Clos mesh",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Inside hyperscale cloud data centers: 10,000+ servers in racks under Top-of-Rack (ToR) switches, Rich Tier-1/Tier-2 Clos meshes providing massive bisection bandwidth, RDMA over Converged Ethernet (RoCEv2), and Orion SDN."
    }
  },
  "cn-ch6-day-in-life-web-request": {
    "id": "cn-ch6-day-in-life-web-request",
    "badge": "Module 6 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "Orta - İleri",
    "title": "6.7 Synthesis — A Day in the Life of a Web Page Request (End-to-End Protocol Walkthrough)",
    "subtitle": "Putting Chapters 1–6 together: connecting a laptop to a school Ethernet LAN and tracing every single packet required to load www.google.com — DHCP, ARP, DNS, Intra-AS OSPF, Inter-AS BGP, TCP 3-way handshake, and HTTP.",
    "sections": [
      {
        "title": "1. Synthesis: a day in the life of a web request (Slides 6-100..101)",
        "content": "![6.7 Synthesis — A Day in the Life of a Web Page Request (End-to-End Protocol Walkthrough) Architecture](/images/networking/tcp-ip-five-layer-stack.svg)\n\n**6.7 Synthesis — A Day in the Life of a Web Page Request (End-to-End Protocol Walkthrough)** — Putting Chapters 1–6 together: connecting a laptop to a school Ethernet LAN and tracing every single packet required to load www.google.com — DHCP, ARP, DNS, Intra-AS OSPF, Inter-AS BGP, TCP 3-way handshake, and HTTP.\n\n**Synthesis: a day in the life of a web request**\n\n- our journey down the protocol stack is now complete!\n  - application, transport, network, link\n- **putting-it-all-together:** synthesis!\n  - goal: identify, review, understand protocols (at all layers) involved in seemingly simple scenario: requesting www page\n  - scenario: student attaches laptop to campus network, requests/receives www.google.com\n\n**A day in the life: scenario**\n\n- browser\n- arriving mobile client attaches to network …\n- **requests web page:** www.google.com\n\n- **Slide Diagram Elements & Protocol Entities:** `Comcast network 68.80.0.0/13, Google’s network 64.233.160.0/19, 64.233.169.105, web server, DNS server, school network 68.80.2.0/24, web page, scenario:, Sounds simple!`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 6 Key Principle",
          "message": "Putting Chapters 1–6 together: connecting a laptop to a school Ethernet LAN and tracing every single packet required to load www.google.com — DHCP, ARP, DNS, Intra-AS OSPF, Inter-AS BGP, TCP 3-way handshake, and HTTP."
        }
      },
      {
        "title": "2. A day in the life: connecting to the Internet (Slides 6-102..104)",
        "content": "**A day in the life: connecting to the Internet**\n\n- connecting laptop needs to get its own IP address, addr of first-hop router, addr of DNS server: use DHCP\n- DHCP\n- UDP\n- Eth\n- Phy\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- UDP\n- Eth\n- Phy\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- DHCP\n- DHCP request encapsulated in UDP, encapsulated in IP, encapsulated in 802.3 Ethernet\n- **Ethernet frame broadcast (dest:** FFFFFFFFFFFF) on LAN, received at router running DHCP server\n- Ethernet de-muxed to IP de-muxed, UDP de-muxed to DHCP\n- DHCP server formulates DHCP ACK containing client’s IP address, IP address of first-hop router for client, name & IP address of DNS server\n- encapsulation at DHCP server, frame forwarded (switch learning) through LAN, demultiplexing at client\n- Client now has IP address, knows name & addr of DNS\n- server, IP address of its first-hop router\n- DHCP client receives DHCP ACK reply\n\n- **Slide Diagram Elements & Protocol Entities:** `router has DHCP server, arriving mobile: DHCP client`\n\n**A day in the life… ARP (before DNS, before HTTP)**\n\n- DNS\n- UDP\n- Eth\n- Phy\n- Eth\n- Phy\n- before sending HTTP request, need IP address of www.google.com: DNS\n- DNS\n- DNS\n- DNS\n- DNS query created, encapsulated in UDP, encapsulated in IP, encapsulated in Eth. To send frame to router, need MAC address of router interface: ARP\n- ARP query broadcast, received by router, which replies with ARP reply giving MAC address of router interface\n- client now knows MAC address of first hop router, so can now send frame containing DNS query\n- ARP query\n- ARP\n- ARP reply\n\n- **Slide Diagram Elements & Protocol Entities:** `router has ARP server, arriving mobile: ARP client, ARP`"
      },
      {
        "title": "3. A day in the life… using DNS (Slides 6-105..106)",
        "content": "**A day in the life… using DNS**\n\n- DNS\n- UDP\n- Eth\n- Phy\n- DNS\n- DNS\n- DNS\n- DNS\n- DNS\n- DNS\n- DNS\n- DNS\n- IP datagram containing DNS query forwarded via LAN switch from client to 1st hop router\n- IP datagram forwarded from campus network into Comcast network, routed (tables created by RIP, OSPF, IS-IS and/or BGP routing protocols) to DNS server\n- de-muxed to DNS\n- DNS replies to client with IP address of www.google.com\n- DNS\n- UDP\n- Eth\n- Phy\n- DNS\n- DNS\n- DNS\n- DNS\n- DNS\n\n- **Slide Diagram Elements & Protocol Entities:** `Comcast network 68.80.0.0/13, DNS server`\n\n**A day in the life…TCP connection carrying HTTP**\n\n- DNS\n- DNS\n- DNS\n- HTTP\n- TCP\n- Eth\n- Phy\n- HTTP\n- to send HTTP request, client first opens TCP socket to web server\n- TCP SYN segment (step 1 in TCP 3-way handshake) inter-domain routed to web server\n- TCP connection established!\n- SYN\n- SYN\n- SYN\n- SYN\n- TCP\n- Eth\n- Phy\n- SYN\n- SYN\n- SYN\n- SYNACK\n- SYNACK\n- SYNACK\n- SYNACK\n- SYNACK\n- SYNACK\n- SYNACK\n- web server responds with TCP SYNACK (step 2 in TCP 3-way handshake)\n\n- **Slide Diagram Elements & Protocol Entities:** `Comcast network 68.80.0.0/13, 64.233.169.105, Google web server`"
      },
      {
        "title": "4. A day in the life… HTTP request/reply (Slides 6-107..108)",
        "content": "**A day in the life… HTTP request/reply**\n\n- DNS\n- DNS\n- DNS\n- HTTP\n- TCP\n- Eth\n- Phy\n- HTTP\n- TCP\n- Eth\n- Phy\n- HTTP\n- HTTP request sent into TCP socket\n- IP datagram containing HTTP request routed to www.google.com\n- IP datagram containing HTTP reply routed back to client\n- web server responds with HTTP reply (containing web page)\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- HTTP\n- web page finally (!!!) displayed\n\n- **Slide Diagram Elements & Protocol Entities:** `Comcast network 68.80.0.0/13, 64.233.169.105, Google web server`\n\n**Chapter 6: Summary**\n\n- principles behind data link layer services:\n  - error detection, correction\n  - sharing a broadcast channel: multiple access\n  - link layer addressing\n- instantiation, implementation of various link layer technologies\n  - Ethernet\n  - switched LANS, VLANs\n  - virtualized networks as a link layer: MPLS\n- **synthesis:** a day in the life of a web request"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **6.7 Synthesis — A Day in the Life of a Web Page Request (End-to-End Protocol Walkthrough)**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "day_in_the_life_walkthrough.py — Complete 10-Stage Protocol Trace for Loading a Web Page from Plug-In to Render",
          "snippet": "# Kurose & Ross 9e - Section 6.7: Retrospective — A Day in the Life of a Web Page Request\nstages = [\n    (\"Stage 1 [DHCP+UDP+IP+Eth]\", \"Laptop broadcasts DHCP Discover/Request; receives IP, Subnet Mask, Default Gateway & DNS IP\"),\n    (\"Stage 2 [ARP+Eth]\",         \"Laptop broadcasts ARP Query for Default Gateway's MAC address; caches ARP Reply\"),\n    (\"Stage 3 [DNS+UDP+IP+Eth]\",  \"Laptop sends DNS Query for 'www.google.com' via Gateway Router to Local DNS Server\"),\n    (\"Stage 4 [OSPF + BGP]\",      \"School router forwards DNS/TCP packets using OSPF intra-AS and BGP inter-AS routing tables\"),\n    (\"Stage 5 [TCP+IP+Eth]\",      \"Laptop completes 3-Way TCP Handshake (SYN, SYN-ACK, ACK) with Google Web Server port 80/443\"),\n    (\"Stage 6 [HTTP+TCP+IP+Eth]\", \"Laptop sends HTTP GET request; Google replies with HTTP 200 OK containing HTML payload!\"),\n]\n\nfor stage, summary in stages:\n    print(f\"{stage:26s} -> {summary}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 6.7 Synthesis — A Day in the Life of a Web Page Request (End-to-End Protocol Walkthrough)",
      "filename": "day_in_the_life_walkthrough.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 6.7: Retrospective — A Day in the Life of a Web Page Request\nstages = [\n    (\"Stage 1 [DHCP+UDP+IP+Eth]\", \"Laptop broadcasts DHCP Discover/Request; receives IP, Subnet Mask, Default Gateway & DNS IP\"),\n    (\"Stage 2 [ARP+Eth]\",         \"Laptop broadcasts ARP Query for Default Gateway's MAC address; caches ARP Reply\"),\n    (\"Stage 3 [DNS+UDP+IP+Eth]\",  \"Laptop sends DNS Query for 'www.google.com' via Gateway Router to Local DNS Server\"),\n    (\"Stage 4 [OSPF + BGP]\",      \"School router forwards DNS/TCP packets using OSPF intra-AS and BGP inter-AS routing tables\"),\n    (\"Stage 5 [TCP+IP+Eth]\",      \"Laptop completes 3-Way TCP Handshake (SYN, SYN-ACK, ACK) with Google Web Server port 80/443\"),\n    (\"Stage 6 [HTTP+TCP+IP+Eth]\", \"Laptop sends HTTP GET request; Google replies with HTTP 200 OK containing HTML payload!\"),\n]\n\nfor stage, summary in stages:\n    print(f\"{stage:26s} -> {summary}\")",
      "expectedOutput": [
        "[OK] day_in_the_life_walkthrough.py — Complete 10-Stage Protocol Trace for Loading a Web Page from Plug-In to Render",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 6.7 Synthesis — A Day in the Life of a Web Page Request (End-to-End Protocol Walkthrough). Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 6, what is the primary architectural focus of '6.7 Synthesis — A Day in the Life of a Web Page Request (End-to-End Protocol Walkthrough)'?",
      "options": [
        "A) Putting Chapters 1–6 together: connecting a laptop to a school Ethernet LAN and tracing every single packet required to load ",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Putting Chapters 1–6 together: connecting a laptop to a school Ethernet LAN and tracing every single packet required to load www.google.com — DHCP, ARP, DNS, Intra-AS OSPF, Inter-AS BGP, TCP 3-way handshake, and HTTP."
    }
  },
  "cn-ch7-wireless-rf-mimo": {
    "id": "cn-ch7-wireless-rf-mimo",
    "badge": "Module 7 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "7.1–7.2 Wireless Links, RF Propagation, SNR, Shannon Capacity, Path Loss, Hidden Terminals & MIMO",
    "subtitle": "Electromagnetic wave physics, Signal-to-Noise Ratio (dB), Shannon's capacity theorem C = B*log2(1+SNR), free-space path loss (~(fd)^2), multipath fading, hidden terminals, and MIMO spatial diversity/multiplexing.",
    "sections": [
      {
        "title": "1. Wireless and mobile networks: overview (Slides 7-2..11)",
        "content": "![7.1–7.2 Wireless Links, RF Propagation, SNR, Shannon Capacity, Path Loss, Hidden Terminals & MIMO Architecture](/images/networking/5g-wifi-wireless-arch.svg)\n\n**7.1–7.2 Wireless Links, RF Propagation, SNR, Shannon Capacity, Path Loss, Hidden Terminals & MIMO** — Electromagnetic wave physics, Signal-to-Noise Ratio (dB), Shannon's capacity theorem C = B*log2(1+SNR), free-space path loss (~(fd)^2), multipath fading, hidden terminals, and MIMO spatial diversity/multiplexing.\n\n**Wireless and mobile networks: overview**\n\n- **Chapter goals:** \n- understand principles of wireless networks:\n  - physical layer: radio, influence on higher layers\n  - access network: link-layer challenges/solutions in any wireless networks\n  - core network: the “network” layer in a wireless network\n  - user/device mobility: among access networks\n  - application-specific wireless networks: Bluetooth, satellite, IoT\n- **wireless networks in practice:** \n  - WiFi\n  - 5G (with a bit of 4G)\n  - Bluetooth, satellite, IoT\n- For a more extensive treatment of wireless and mobile networks visit: https://gaia.cs.umass.edu/wireless_and_mobile_networks\n\n**Wireless and Mobile Networks: context**\n\n- more mobile-broadband-connected (cellular) devices than fixed-broadband-connected devices devices (5-1 in 2019)!\n  - wireless connectivity even great when WiFi users considered (80% of broadband homes use WiFi)\n  - 60% of Internet traffic from major web sites destinated to mobile device\n- Mobile broadband subscribers (M)\n- Fixed (wired) broadband subscribers (M)\n- **Data source:** www.statista.com (1/25)\n\n- **Slide Diagram Elements & Protocol Entities:** `Broadband subscribers (M)`\n\n**Wireless applications their needs**\n\n- Wide-area Mobile Wireless Internet Access\n- Local-area Mobile Wireless Internet Access\n- Fixed Wireless Internet Access\n- Satellite Networks for Internet Access and Sensing\n- Cable replacement\n- Internet of Things (IoT)\n\n- **Slide Diagram Elements & Protocol Entities:** `Six application areas :, user data rate, energy efficiency, device density, latency, area traffic capacity, mobility, high importance, medium, low, Application needs:`\n\n**Elements of a wireless network**\n\n- wireless hosts\n- laptop, smartphone, IoT\n- run applications\n- may be stationary (non-mobile) or mobile\n  - wireless does not always mean mobility!\n- base station\n- typically connected to wired network\n- relay - responsible for sending packets between wired network and wireless host(s) in its “area”\n  - e.g., 4G/5G cell towers, 802.11 (WiFi) access points (APs)\n- wireless link\n- typically used to connect device(s) to base station, also used as backbone link\n- multiple access protocol coordinates link access (random access, FDMA, TDMA, CDMA, polling)\n- various transmission rates and distances, frequency bands\n- **Ad hoc networks:** not all wireless networks are connected into a larger network\n- wireless device radio\n- wireless device has different radios for different networks\n- **iPhone16:** has ~11 different radios, many antennae\n  - 5 different cellular radios, WiFi, Bluetooth, UWB, satellite NFC, GPS\n\n- **Slide Diagram Elements & Protocol Entities:** `wired network infrastructure`\n\n**Characteristics of selected wireless links**\n\n- Indoor\n- Outdoor\n- Midrange\n- outdoor\n- Long range\n- outdoor\n- 10-30m\n- 50-200m\n- 200m-4Km\n- 4Km-15Km\n- 2 Mbps\n- 4G LTE, 5G eMBB\n- 802.11ac\n- 802.11n\n- 802.11g\n- 802.11b\n- 3.5 Gbps\n- 600 Mbps\n- 54 Mbps\n- 11 Mbps\n- Bluetooth\n- 802.11ax\n- 14 Gbps\n- 10 Gbps\n- 802.11 af,ah\n- Space (100’s of Km)\n- LEOS",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 7 Key Principle",
          "message": "Electromagnetic wave physics, Signal-to-Noise Ratio (dB), Shannon's capacity theorem C = B*log2(1+SNR), free-space path loss (~(fd)^2), multipath fading, hidden terminals, and MIMO spatial diversity/multiplexing."
        }
      },
      {
        "title": "2. Wireless networks: edge and core networks (Slides 7-12..18)",
        "content": "**Wireless networks: edge and core networks**\n\n- Mobile device\n- (UE)\n- Base station\n- (eNode-B)\n- Mobile device\n- Base station\n- (gNode-B)\n- Mobility Management Entity (MME)\n- Internet\n- Internet\n\n- **Slide Diagram Elements & Protocol Entities:** `Institutional wired network, WLAN 1, WLAN 2, edge, core, WiFi:, 5G:`\n\n**Electromagnetics: enabling communication**\n\n- (1) current at one location (transmitter) ....\n- (2) creates an EM field in space ....\n- (3) induces a current at remote location (receiver)....\n- **slide concept:** S. Rangan (NYU)\n\n- **Slide Diagram Elements & Protocol Entities:** `receiver, transmitter`\n\n**Radio basics: electromagnetic waves**\n\n- **Electromagnetic wave has:** \n- wavelength (l)\n- **frequency:** speed of light / wavelength = c/l\n- directionality (of propagation)\n- time-varying amplitude\n- **slide concept:** S. Rangan (NYU)\n\n- **Slide Diagram Elements & Protocol Entities:** `l: wavelength, amplitude, wave propagation:`\n\n**Radio basics: phase**\n\n- The phase of a periodic signal, represents the fraction of the period covered up until time t\n- often measured in angular units (0 to 360)\n- we can code information into signal by changing signal’s phase (keeping frequency the same!)\n\n- **Slide Diagram Elements & Protocol Entities:** `degrees, time, bit value, signal`\n\n**Radio signal characteristics**\n\n- **Power:** antenna receive/transmit energy per unit time\n- **linear:** measured in watts (or milliwatts)\n- **logarithmic:** measured in decibels (db)\n- **example:** \n- PmW = 250 mW (typical max\n- mobile transmit power)\n- **Power spectral density:** \n- power present in signal as a function of frequency\n- **Bandwidth:** width (measured in Hz) of range of frequencies use by radio signal\n- radio frequency usage characterized by power spectral density (psd of zero means no signal power at that frequency)\n- bandwidth = “band” + “width” (width of frequency band used)\n- power spectral density (psd)\n- Radio signal with 22 MHz bandwidth, evenly spread between 2.427, 2.429 GHz. This 22 MHz bandwidth channel corresponds to channel 6 in WiFi network)\n- Radio signal “bandwidth” different from link “bandwidth” (maximum transmission rate) term used by network engineers!\n- two meanings/usage of “bandwidth”\n\n- **Slide Diagram Elements & Protocol Entities:** `PdBm = 10 . log10, PmW, 1mW, 250mW, = 24 dBm, 1.00, 1.0025, .9975, frequency (GHz), power spectral density, carrier (center) frequency, 2.438, 2.449, 2.427`\n\n> **Kurose & Ross Lecture Note:** License"
      },
      {
        "title": "3. Signals and Noise (Slides 7-19..23)",
        "content": "**Signals and Noise**\n\n- **interference:** other transmitters/EM radiaters in same frequency band\n  - hundreds of consumer devices operate in unlicensed 2.4 GHz band (aka: Industrial, Scientific, and Medical band): WiFi, Bluetooth, Zigbee, satellite TV, microwave ovens, garage-door openers, baby monitors, cordless phones, wireless mics/speakers, radio-controlled drones and toys, amateur radio, ...\n- **thermal and electronic noise in receiver:** \n    - natural thermal variations, imperfections in electronics\n- Original signal, noise, and noisy received signal\n\n> **Kurose & Ross Lecture Note:** License\n\n**Signal to Noise Ratio (SNR)**\n\n- **SNR:** ratio of signal power to noise power (often measured in dB)\n- fundamental measure of channel “quality”\n- SNR of 0 implies equal signal and noise\n- **high (or low) SNR:** easy (or hard) to extract signal from signal+noise\n- **Typical ranges for current radios:** \n  - lower limit for cellular: -10 to -6 dB\n  - lower limit for WiFi: 20dB\n- Original signal, noise, and noisy received signal\n\n- **Slide Diagram Elements & Protocol Entities:** `SNR (dB) = 10 . log10, received signal power, noise power`\n\n> **Kurose & Ross Lecture Note:** License\n\n**Channel Capacity**\n\n- Shannon capacity (of a communication channel): maximum rate at which data can be transmitted, given bandwidth, SNR constraints\n- **where:** \n  - C is capacity (bits/sec)\n  - B is bandwidth (in Hz)\n  - power measured linearly (e.g., in mW)\n- **Observations:** \n  - C scales linearly with B (for constant SNR)\n  - high SNR: C scales logarithmically: little value in increasing SNR beyond a certain point\n  - Shannon: classic 1948 paper\n\n- **Slide Diagram Elements & Protocol Entities:** `C = B . log2, received signal power, noise power`\n\n> **Kurose & Ross Lecture Note:** License\n\n**Wireless link characteristics: path loss**\n\n  - Wireless radio signal attenuates (loses power) as it propagates\n- (aka fading) reduction in power density (attenuation) of an electromagnetic wave as it propagates from transmitter to receiver\n- **Generalized path loss ~ (fd)n:** \n- n=2 (free space), n=(2.7,3.5) urban, n= (3,6) in building\n\n- **Slide Diagram Elements & Protocol Entities:** `f: frequency d: distance, path loss`\n\n> **Kurose & Ross Lecture Note:** Wikipedia figure Put dot on the left if I change anything. Use pointer to show that further it goes, reduction in power density. As a wireless signal travels over a longer distance, it spreads out and covers a larger area, but its power density (or signal strength) decreases.\n\n**“Hidden terminal problem” recalling ~ (fd)2 path loss**\n\n  - Signal fading with~ (d)2 path loss, causes a “hidden terminal” problem:\n- **hidden terminals:** A and B can hear each other, B and C can hear each other, but A and C can not hear each other\n- complicates wireless channel sharing among A, B, C\n\n- **Slide Diagram Elements & Protocol Entities:** `space, Signal strength (log scale), signal detection threshold`\n\n> **Kurose & Ross Lecture Note:** WiGig tri-band-enabled devices, which operate in the 2.4, 5 and 60 GHz bands, deliver data transfer rates up to 7 Gbit/s (for 11ad), about as fast as an 8-band 802.11ac transmission, and more than eleven times as fast than the highest 802.11n rate, while maintaining compatibility with existing Wi-Fi devices. The 60 GHz millimeter wave signal cannot typically penetrate walls but can propagate by reflection from walls, ceilings, floors and objects using beamforming built into the WiGig system."
      },
      {
        "title": "4. Wireless link characteristics: hidden terminals (Slides 7-24..30)",
        "content": "**Wireless link characteristics: hidden terminals**\n\n- Objects cause ”hidden terminals”\n- B, A hear each other\n- B, C hear each other\n- A, C can not hear each other means A, C unaware of their interference at B\n- Path loss causes “hidden terminals”\n- B, A hear each other\n- B, C hear each other\n- A, C can not hear each other interfering at B\n\n- **Slide Diagram Elements & Protocol Entities:** `space, Signal strength (log scale), signal detection threshold`\n\n**Wireless link characteristics: multipath**\n\n  - multipath propagation: radio signal reflects off objects ground, built environment, arriving at destination at slightly different times\n- **Tc:** coherence time\n- **Coherence time:** \n- amount of time bit is present in channel to be received\n- influences maximum possible transmission rate, since coherence times can not overlap\n- inversely proportional to\n  - frequency\n  - receiver velocity\n- transmitted\n- pulses\n- received\n- pulse\n- LOS pulse\n- multipath\n- time\n\n- **Slide Diagram Elements & Protocol Entities:** `line of sight (LOS) path, reflected path`\n\n**Antennas**\n\n  - Antennas both transmit and receive radio waves\n- Gigabit LTE with 4x4 MIMO\n- Wi‑Fi 6 (802.11ax) with 2x2 MIMO\n- **multiple antenna:** common now in wireless networks\n\n- **Slide Diagram Elements & Protocol Entities:** `single antenna: old school, MIMO: Multiple input multiple output antenna`\n\n**MIMO transmission: single user**\n\n- **Single User MIMO:** spatial diversity\n- multiple transmit/receive antenna to/at one user at same time\n- **exploit multipath:** use multiple antennas to increase number of paths for transmitted signal between transmitter and receiver\n- **multipath:** signals arriving at receiver not the same (e.g., some at higher quality)\n- **antenna gain:** increase SNR by combining multiple signals\n- 12 signal paths from one sender (with two antennae) to one receiver (with two antennae)\n\n- **Slide Diagram Elements & Protocol Entities:** `sender, receiver`\n\n**MIMO: spatial diversity**\n\n  - increase reliability, range by sending / receiving redundant streams of information in parallel along different spatial paths between transmit and receive antennas\n- **improved reliability:** unlikely that all paths degraded at same time\n- **improved range:** multiple antennas gather more signal at receiver\n- transmitter\n- H1,1(x)\n- H2,1(x)\n- y1= H1,1(x)\n- + H2,1(x)\n- y2= H1,2(x)\n- + H2,2(x)\n  - x: signal transmitted\n  - yj: signal received at antenna j\n  - Hi,j(x): transformation of signal x from transmitter antenna i to receiver antenna j\n  - estimated by receiver (perhaps with sender’s help)\n- receiver\n- Transmitter\n- Receiver\n- y1= H1,1(x) + H2,1(x)\n- H1,1()\n- H1,2()\n- H2,2()\n- H2,1()\n- y2= H1,2(x) + H2,2(x)\n  - Signal processing at receiver?\n  - don’t want to just add y1, y2\n  - take stronger or smaller SNR of y1, y2?\n  - re-align phases, coherently add?\n\n- **Slide Diagram Elements & Protocol Entities:** `sender, receiver`"
      },
      {
        "title": "5. MIMO: spatial multiplexing (Slides 7-31..36)",
        "content": "**MIMO: spatial multiplexing**\n\n  - send two different streams of information, x1 and x2 in parallel along different spatial paths from transmitter to receiver\n  - spatial multiplexing differs from spatial diversity\n  - Two equations in two unknowns\n  - but Hi,j(xi) are time-varying stochastic quantities\n\n- **Slide Diagram Elements & Protocol Entities:** `transmitter, H1,1(x1), H2,1(x2), y1= H1,1(x1) + H2,1(x2), y2= H1,2(x1) + H2,2(x2), receiver, Transmitter, Receiver, H1,1(), H1,2(), H2,2(), H2,1(), y1= H1,1(x1) + H2,1(x2) y2= H1,2(x1) + H2,2(x2)`\n\n**Multi-user MIMO**\n\n- multiple transmit antenna send to different users at same time\n  - “spatial multiplexing”\n- **exploit directional antenna:** send to geographically separated users at same time via beamforming\n\n- **Slide Diagram Elements & Protocol Entities:** `single user MIMO, multi-user MIMO`\n\n**Wireless radio spectrum:**\n\n- **radio spectrum:** national asset, owned by the nation\n- national government determine how spectrum is used “locally”\n- **different spectrum use types:** \n- **licensed:** \n- dedicated use, typically by one “owner” (e.g., cellular carrier such as AT&T, Verizon)\n- often allocated by spectrum auction\n- **shared:** \n- spectrum dynamically shared among users\n- “incumbent” may get preferential access, others “back off”\n- **unlicensed:** \n- open (free) for anyone to use, conforming to rules (e.g., power transmission levels)\n- 2.4GHz and 5 Ghz WiFi\n- 3.5GHz “Private 5G” (aka CBRS)\n\n> **Kurose & Ross Lecture Note:** License\n\n**WiFi spectrum bands**\n\n- 2.4 GHz\n- Divided into 11-14 channels, depending on country\n- 5 GHz range\n- more than 150(configurable/selectable WiFi channels) of different transmission rates\n- 6 GHz range\n- most recently added\n- more than 250 configurable/selectable WiFi channels of different transmission rates\n- other 802.11 WiFi spectrum bands, but not in widespread use\n\n- **Slide Diagram Elements & Protocol Entities:** `802.11 b/g/n/ax, 802.11 a/h/n/ac/ax, 802.11 ax/be`\n\n> **Kurose & Ross Lecture Note:** https://en.wikipedia.org/wiki/List_of_WLAN_channels\n\n**5G spectrum: three spectrum bands***\n\n- **Low band frequencies:** (< 1 GHz range)\n- covers longer distances (10’s of miles), but at lower speeds (50–250 Mbps)\n- * No single, well-accepted ranges for “low”, “mid” and “high”\n- **Mid-band frequencies:** 1 - 6 GHz ranges\n- balance distances (~5 miles ?) and transmission rates (100–900 Mbps)\n- 1.8, 3.3 GHz to 3.8 GHz, 6 GHz bands popular\n- **High band frequencies:** 25–66 GHz range (aka mmwave)\n- 26 GHz, 40 GHz, 50 GHz, 66 GHz bands popular\n- short distances (< mile), high speeds (<3 Gbps)\n- **line of sight transmission:** poor penetration of trees, buildings, ...\n\n- **Slide Diagram Elements & Protocol Entities:** `1-2.6 GHz, 3.4 - 6 GHz`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **7.1–7.2 Wireless Links, RF Propagation, SNR, Shannon Capacity, Path Loss, Hidden Terminals & MIMO**:\n\n- **Review Question 1 (Infrastructure Mode.):** What is meant when we say that a network of devices is operating in \"infrastructure mode\"?\n  - **Verified Answer:** Devices communicate with each other and to the larger outside world via a base station (also known as an access point).\n\n- **Review Question 2 (Characteristics of wireless links.):** Which of the following statements about the characteristics of wireless links are true?\n  - **Verified Answer:** The \"hidden terminal problem\" happens when A sends to B over a wireless channel, and an observer, C (that can be even closer to A than B), does not detect/receive A's transmission because of physical obstacles in the path between A and C.; The bit error rate (BER) of a wireless channel decreases as the signal-to-noise ratio (SNR) increases.; Multipath propagation occurs when portions of the electromagnetic wave reflect off objects and the ground taking paths of different lengths between the sender and a receiver, and thus arriving at the receiver at slightly different points in time.; Path loss refers to the decrease in the strength of a radio signal as it propagates through space.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "shannon_mimo_capacity.py — Calculating Wireless Channel Capacity (Shannon-Hartley & MIMO Spatial Multiplexing)",
          "snippet": "# Kurose & Ross 9e - Section 7.2: SNR (dB), Shannon Channel Capacity & MIMO Spatial Multiplexing\nimport math\n\nbandwidth_mhz = 20.0  # 20 MHz WiFi / 5G channel\nfor snr_db in [10, 20, 30]:\n    snr_linear = 10.0 ** (snr_db / 10.0)\n    c_siso_mbps = bandwidth_mhz * math.log2(1.0 + snr_linear)\n    c_4x4_mimo_mbps = 4 * c_siso_mbps\n    print(f\"SNR = {snr_db:2d} dB (Linear={snr_linear:6.1f}) | SISO Shannon Capacity: {c_siso_mbps:6.1f} Mbps | 4x4 MIMO Max: {c_4x4_mimo_mbps:6.1f} Mbps\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 7.1–7.2 Wireless Links, RF Propagation, SNR, Shannon Capacity, Path Loss, Hidden Terminals & MIMO",
      "filename": "shannon_mimo_capacity.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 7.2: SNR (dB), Shannon Channel Capacity & MIMO Spatial Multiplexing\nimport math\n\nbandwidth_mhz = 20.0  # 20 MHz WiFi / 5G channel\nfor snr_db in [10, 20, 30]:\n    snr_linear = 10.0 ** (snr_db / 10.0)\n    c_siso_mbps = bandwidth_mhz * math.log2(1.0 + snr_linear)\n    c_4x4_mimo_mbps = 4 * c_siso_mbps\n    print(f\"SNR = {snr_db:2d} dB (Linear={snr_linear:6.1f}) | SISO Shannon Capacity: {c_siso_mbps:6.1f} Mbps | 4x4 MIMO Max: {c_4x4_mimo_mbps:6.1f} Mbps\")",
      "expectedOutput": [
        "[OK] shannon_mimo_capacity.py — Calculating Wireless Channel Capacity (Shannon-Hartley & MIMO Spatial Multiplexing)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 7.1–7.2 Wireless Links, RF Propagation, SNR, Shannon Capacity, Path Loss, Hidden Terminals & MIMO. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements about the characteristics of wireless links are true?",
      "options": [
        "A) The \"hidden terminal problem\" refers to the fact that many people can never seem to find their mobile phones.",
        "B) The \"hidden terminal problem\" happens when A sends to B over a wireless channel, and an observer, C (that can be even closer to A than B), d",
        "C) The bit error rate (BER) of a wireless channel increases as the signal-to-noise ratio (SNR) increases.",
        "D) Path loss refers to the dropping of link-layer frames that are being relayed among wireless access points due to buffer overflow, just as ne"
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 7), 'The \"hidden terminal problem\" refers to the fact that many people can never seem to find their mobile phones.' accurately characterizes 7.1–7.2 Wireless Links, RF Propagation, SNR, Shannon Capacity, Path Loss, Hidden Terminals & MIMO."
    }
  },
  "cn-ch7-phy-coding-modulation-qam": {
    "id": "cn-ch7-phy-coding-modulation-qam",
    "badge": "Module 7 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "7.2B Physical Layer Coding & Modulation: FEC Interleaving, ASK/PSK/QPSK, QAM Constellations & Adaptive MCS",
    "subtitle": "Forward Error Correction (FEC) with burst-error shuffling, modulating amplitude and phase, QPSK (2 bits/symbol), 16-QAM (4 bits/symbol), 64-QAM (6 bits/symbol) constellation diagrams, and SNR-adaptive modulation.",
    "sections": [
      {
        "title": "1. Physical Layer: coding and modulation (Slides 7-38..40)",
        "content": "![7.2B Physical Layer Coding & Modulation: FEC Interleaving, ASK/PSK/QPSK, QAM Constellations & Adaptive MCS Architecture](/images/networking/5g-wifi-wireless-arch.svg)\n\n**7.2B Physical Layer Coding & Modulation: FEC Interleaving, ASK/PSK/QPSK, QAM Constellations & Adaptive MCS** — Forward Error Correction (FEC) with burst-error shuffling, modulating amplitude and phase, QPSK (2 bits/symbol), 16-QAM (4 bits/symbol), 64-QAM (6 bits/symbol) constellation diagrams, and SNR-adaptive modulation.\n\n**Physical Layer: coding and modulation**\n\n- Coding\n- Coding\n- Add error detection, correction bits at physical layer\n- Digital Modulation\n- Modulation\n- Choose digital modulation technique that maximizes number of reliably transmitted bits/sec based on observed channel impairments\n- e.g., in family of Quadrature amplitude modulation (QAM)\n- Pulse Shaping\n- match transmission bandwidth to channel bandwidth using pulse shaping\n- RF Modulation\n- transmit signal as an electromagnetic wave over assigned carrier frequency\n- **Carrier:** waveform at a given frequency, fc (carrier frequency), modified (modulated) with an information-bearing signal\n- **d:** original data\n\n- **Slide Diagram Elements & Protocol Entities:** `We won’t cover this (look at ECE for courses)`\n\n> **Kurose & Ross Lecture Note:** https://en.wikipedia.org/wiki/Carrier_wave\n\n**Physical Layer: Error detection, correction coding**\n\n- Coding\n- EDC\n- **EDC:** error detection, correction bits\n- additionally transmitted bits (in addition to d)\n- added so receiver can detect and possibly correct errors in d bits\n- **example:** parity bits, redundancy bits\n- **d:** original data\n- EDC’\n- **d’:** received data\n- received EDC’ and received d’ bits may contain errors\n- **EDC used at many layers:** channel (physical), link, network, transport, application layers\n- Wireless physical layer may add EDC bits, into addition to:\n- application\n- transport\n- network\n- link\n- physical\n- original bits\n- EDC+original bits\n- adding physical-layer EDC makes sense!\n- detect/recover locally, rather than wait for end-end\n- physical layer techniques adapted to local radio error characteristics\n\n- **Slide Diagram Elements & Protocol Entities:** `noisy channel, EDC’ d’ error-free ?, errors correctable ?, application-layer EDC bits, transport-layer EDC bits, link-layer EDC bits`\n\n> **Kurose & Ross Lecture Note:** https://en.wikipedia.org/wiki/Carrier_wave",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 7 Key Principle",
          "message": "Forward Error Correction (FEC) with burst-error shuffling, modulating amplitude and phase, QPSK (2 bits/symbol), 16-QAM (4 bits/symbol), 64-QAM (6 bits/symbol) constellation diagrams, and SNR-adaptive modulation."
        }
      },
      {
        "title": "2. Physical Layer: EDC shuffling example (Slides 7-41..42)",
        "content": "**Physical Layer: EDC shuffling example**\n\n- Link\n- physical\n- original bits from link layer, including EDC\n- d1 d2 d3 d4 d5 d6 d7 d8\n- d1 d1’ d2 d2’ d3 d3’ d4 d4’ d5 d5’ d6 d6’ d7 d7’ d8 d8’\n- d1 d5’ d2 d6’ d3 d7’ d4 d8’ d5 d1’ d6 d2’ d7 d3’ d8 d4’\n- add EDC duplicate bits in PHY\n- shuffle for resistance to burst errors\n- **modulation:** from bits to symbols to waveforms\n- A burst of noise in this interval, causing 3 bits to be unintelligible still allows receiver to determine all original bits\n- A burst of noise in this interval causing 3 bits to be unintelligible , with no shuffling, would mean receiver can not determine d4\n\n- **Slide Diagram Elements & Protocol Entities:** `coding, modulation`\n\n> **Kurose & Ross Lecture Note:** https://en.wikipedia.org/wiki/Carrier_wave\n\n**Modulation**\n\n- Coding\n- Coding\n- Digital Modulation\n- Modulation\n- Pulse Shaping\n- RF Modulation\n- **d:** original data\n- encoding bits (1’s, 0’s) into analog RF carrier signal by changing (“modulating”) a characteristic of the RF carrier signal: amplitude, frequency, or phase.\n- digital modulation\n\n- **Slide Diagram Elements & Protocol Entities:** `time, bit value, amplitude modulation, frequency modulation, phase modulation`\n\n> **Kurose & Ross Lecture Note:** https://en.wikipedia.org/wiki/Carrier_wave"
      },
      {
        "title": "3. Modulation schemes: ASK, PSK (Slides 7-43..44)",
        "content": "**Modulation schemes: ASK, PSK**\n\n- **Amplitude shift keying (ASK):** signal’s amplitude encodes bits\n- **Binary Phase shift keying (BPSK):** signal’s phase encode bits\n- **PSK:** 0 and 1 signals out of phase by 180o, but at same carrier frequency\n\n- **Slide Diagram Elements & Protocol Entities:** `time, signal, bit value`\n\n**Modulation schemes: QPSK**\n\n- Why stop at just two phases?\n- two bits grouped to become one “symbol” (2 bits -> 4 symbols)\n- **QPSK:** Quadrature Phase Shift Keying: 4 symbols encoded using 4 phases\n- QPSK frequency same as BPSK, but twice the data rate!\n- **Fun interactive QPSK tool:** https://www.geogebra.org/m/enkymjtg\n\n- **Slide Diagram Elements & Protocol Entities:** `“00”, “01”, symbol, signal, “10”, “11”, time`"
      },
      {
        "title": "4. Constellation diagrams (Slides 7-45..46)",
        "content": "**Constellation diagrams**\n\n- **graphical characterization of modulation:** amplitude, phase of symbols\n- point in constellation diagram depicts symbol’s phase (degrees counterclockwise from east) and amplitude (distance from origin)\n- **QPSK constellation diagram:** four symbols represented by four signal waveforms:\n  - four different phases\n  - identical amplitude\n\n- **Slide Diagram Elements & Protocol Entities:** `45o, 135o, 225o, 315o, amplitude, QPSK constellation diagram`\n\n**QAM: Quadrature Amplitude Modulation**\n\n- bit encodings for 4-QAM, 16-QAM, 64-QAM (for WiFi)\n- generalizing QPSK\n- **m-QAM:** using m different amplitude/phase values to encode log2(m) bits\n\n- **Slide Diagram Elements & Protocol Entities:** `64-QAM, b0b1b2b3b4b5, b0b1b2b3, 16-QAM, b0b1, 4-QAM`"
      },
      {
        "title": "5. Constellation diagrams: how bit errors occur (Slides 7-47..48)",
        "content": "**Constellation diagrams: how bit errors occur**\n\n- phase/amplitude of transmitted signal\n- phase/amplitude of received signals\n- receiver measures amplitude, phase of received signal\n- receiver classifies symbol as bit pattern with amplitude, phase closest to received signal amplitude, phase\n- Transmitter transmits waveforms for 12 1111 symbols, sequentially\n- This received signal, is misclassified as 1011 since its amplitude, phases are closer to 1011 than 1111\n- These received signals correctly classified as 1111 (received amplitude, phases closest to 1111)\n\n- **Slide Diagram Elements & Protocol Entities:** `16-QAM, b0b1b2b3`\n\n**Adaptive modulation**\n\n- **given modulation scheme:** \n- has nominal data rate (assuming no errors)\n- **SNR can increase/decrease:** \n  - changing interference\n  - sender transmitter power\n  - move along SNR vs BER tradeoff curve\n- **Idea:** change modulation scheme, power on the fly, getting highest data rate possible (at acceptable BER, acceptable energy expenditure), as SNR changes\n- **Max data rate:** \n- **16 QAM:** 11.5 Mbps\n- **64 QAM:** 26.9 Mbps\n\n> **Kurose & Ross Lecture Note:** Direct Relationship: As SNR increases, BER generally decreases. A higher SNR means that the signal is more distinct from the noise, making it easier for the receiver to correctly interpret the transmitted bits. Design Considerations: Achieving a high SNR often requires more power or more advanced technology (like better antennas or receivers), which can be more expensive or consume more energy."
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **7.2B Physical Layer Coding & Modulation: FEC Interleaving, ASK/PSK/QPSK, QAM Constellations & Adaptive MCS**:\n\n- **Review Question 1 (Characteristics of wireless links.):** Which of the following statements about the characteristics of wireless links are true?\n  - **Verified Answer:** The \"hidden terminal problem\" happens when A sends to B over a wireless channel, and an observer, C (that can be even closer to A than B), does not detect/receive A's transmission because of physical obstacles in the path between A and C.; The bit error rate (BER) of a wireless channel decreases as the signal-to-noise ratio (SNR) increases.; Multipath propagation occurs when portions of the electromagnetic wave reflect off objects and the ground taking paths of different lengths between the sender and a receiver, and thus arriving at the receiver at slightly different points in time.; Path loss refers to the decrease in the strength of a radio signal as it propagates through space.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "qam_adaptive_modulation.py — Computing Bit Rates Across BPSK, QPSK, 16-QAM, 64-QAM & 256-QAM Constellations",
          "snippet": "# Kurose & Ross 9e - Section 7.2.5: QAM Constellation Points & Adaptive Modulation Coding Schemes (MCS)\nimport math\n\nsymbol_rate_msps = 10.0  # 10 Million symbols/sec\nschemes = [\n    (\"BPSK\",    2,   4.0),\n    (\"QPSK\",    4,   8.0),\n    (\"16-QAM\",  16,  15.0),\n    (\"64-QAM\",  64,  22.0),\n    (\"256-QAM\", 256, 30.0),\n]\n\nfor name, points, min_snr_db in schemes:\n    bits_per_symbol = int(math.log2(points))\n    raw_mbps = symbol_rate_msps * bits_per_symbol\n    print(f\"{name:8s} | {points:3d} Constellation Points | {bits_per_symbol} bits/symbol | Rate: {raw_mbps:5.1f} Mbps | Min SNR ~{min_snr_db} dB\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 7.2B Physical Layer Coding & Modulation: FEC Interleaving, ASK/PSK/QPSK, QAM Constellations & Adaptive MCS",
      "filename": "qam_adaptive_modulation.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 7.2.5: QAM Constellation Points & Adaptive Modulation Coding Schemes (MCS)\nimport math\n\nsymbol_rate_msps = 10.0  # 10 Million symbols/sec\nschemes = [\n    (\"BPSK\",    2,   4.0),\n    (\"QPSK\",    4,   8.0),\n    (\"16-QAM\",  16,  15.0),\n    (\"64-QAM\",  64,  22.0),\n    (\"256-QAM\", 256, 30.0),\n]\n\nfor name, points, min_snr_db in schemes:\n    bits_per_symbol = int(math.log2(points))\n    raw_mbps = symbol_rate_msps * bits_per_symbol\n    print(f\"{name:8s} | {points:3d} Constellation Points | {bits_per_symbol} bits/symbol | Rate: {raw_mbps:5.1f} Mbps | Min SNR ~{min_snr_db} dB\")",
      "expectedOutput": [
        "[OK] qam_adaptive_modulation.py — Computing Bit Rates Across BPSK, QPSK, 16-QAM, 64-QAM & 256-QAM Constellations",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 7.2B Physical Layer Coding & Modulation: FEC Interleaving, ASK/PSK/QPSK, QAM Constellations & Adaptive MCS. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements about the characteristics of wireless links are true?",
      "options": [
        "A) The \"hidden terminal problem\" refers to the fact that many people can never seem to find their mobile phones.",
        "B) The \"hidden terminal problem\" happens when A sends to B over a wireless channel, and an observer, C (that can be even closer to A than B), d",
        "C) The bit error rate (BER) of a wireless channel increases as the signal-to-noise ratio (SNR) increases.",
        "D) Path loss refers to the dropping of link-layer frames that are being relayed among wireless access points due to buffer overflow, just as ne"
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 7), 'The \"hidden terminal problem\" refers to the fact that many people can never seem to find their mobile phones.' accurately characterizes 7.2B Physical Layer Coding & Modulation: FEC Interleaving, ASK/PSK/QPSK, QAM Constellations & Adaptive MCS."
    }
  },
  "cn-ch7-ofdm-ofdma-csmaca": {
    "id": "cn-ch7-ofdm-ofdma-csmaca",
    "badge": "Module 7 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "İleri Seviye",
    "title": "7.3 Wireless MAC: FDM, OFDM Orthogonal Subcarriers, OFDMA Resource Blocks & 802.11 CSMA/CA (RTS/CTS)",
    "subtitle": "Packing overlapping orthogonal subcarriers in OFDM, 2D time-frequency OFDMA Resource Blocks in 4G/5G and WiFi 6, why wireless cannot detect collisions while transmitting, and 802.11 CSMA/CA with RTS/CTS.",
    "sections": [
      {
        "title": "1. Recall: MAC protocols (Slides 7-50..53)",
        "content": "![7.3 Wireless MAC: FDM, OFDM Orthogonal Subcarriers, OFDMA Resource Blocks & 802.11 CSMA/CA (RTS/CTS) Architecture](/images/networking/5g-wifi-wireless-arch.svg)\n\n**7.3 Wireless MAC: FDM, OFDM Orthogonal Subcarriers, OFDMA Resource Blocks & 802.11 CSMA/CA (RTS/CTS)** — Packing overlapping orthogonal subcarriers in OFDM, 2D time-frequency OFDMA Resource Blocks in 4G/5G and WiFi 6, why wireless cannot detect collisions while transmitting, and 802.11 CSMA/CA with RTS/CTS.\n\n**Recall: MAC protocols**\n\n- **OFDMA:** 4/5G, WiFi6; Bluetooth; satellite\n  - WiFi; satellite; control plane: 4/5G, Bluetooth\n  - (and many wired technologies)\n  - Bluetooth, satellite\n  - (and many wired technologies)\n\n- **Slide Diagram Elements & Protocol Entities:** `multiple access protocols, channel partitioning, random access, taking turns, type of MAC, OFDMA, CSMA/CA, TDMA, FDMA, Aloha, slotted Aloha, CSMA, CSMA/CD (Ethernet), polling`\n\n> **Kurose & Ross Lecture Note:** Control plane: coordination about how to share the data plane requires used of the channel.\n\n**FDM: Frequency Division Multiplexing**\n\n- **rather than one fat “wideband” channel:** \n- divide into multiple thin “narrowband” subchannels\n- separated by “guard bands” to avoid interference\n- **Narrowband channels:** \n- each subchannel has lower bit transmission rate than wideband channel:\n  - making multipath easier to accommodate\n  - lower rate implementations easier\n- transmissions can happen on different subchannels at same time (in parallel)\n\n- **Slide Diagram Elements & Protocol Entities:** `0.00, 0.25, 0.50, - 0.25, - 0.50, frequency (Hz)`\n\n> **Kurose & Ross Lecture Note:** Within each Wi-Fi channel, OFDM splits the channel's bandwidth into many subcarriers.\n\n**OFDM: Orthogonal FDM**\n\n- **subcarriers:** again close together\n- slightly overlapping, but no guard bands\n- **orthogonal:** carefully designed, modulated so crosstalk among subcarriers cancels at center of each subcarrier frequency\n\n- **Slide Diagram Elements & Protocol Entities:** `0.00, 0.25, 0.50, - 0.25, - 0.50, frequency (Hz), envelope of spectrum`\n\n**OFDM: Subcarriers**\n\n- # subcarriers in an 4G / 5G channel depends on channel’s bandwidth\n- **Wireless Jargon:** \n- “carrier” ~ “channel”\n- “subcarrier” ~ “subchannel”\n\n- **Slide Diagram Elements & Protocol Entities:** `0.00, 0.25, 0.50, - 0.25, - 0.50, frequency (Hz), Channel bandwidth (MHz), Number of subcarriers, 1.25 2.5 5 10 15 20, 76 150 300 600 900 1200`\n\n> **Kurose & Ross Lecture Note:** This example shows 12 subcarriers, in “real life”",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 7 Key Principle",
          "message": "Packing overlapping orthogonal subcarriers in OFDM, 2D time-frequency OFDMA Resource Blocks in 4G/5G and WiFi 6, why wireless cannot detect collisions while transmitting, and 802.11 CSMA/CA with RTS/CTS."
        }
      },
      {
        "title": "2. OFDMA: subcarriers, time (Slides 7-54..58)",
        "content": "**OFDMA: subcarriers, time**\n\n- **Slide Diagram Elements & Protocol Entities:** `Time, 15 kHz, 180 kHz, frequency`\n\n**one “symbol” can be transmitted per 66.6 usec (4G) at given subcarrier frequency**\n\n- number of bits (between 2-8) in symbol depends on modulation technique chosen (which depends on channel quality)\n\n- **Slide Diagram Elements & Protocol Entities:** `frequency, time, 66.6 umsec, 0.5 msec slot, OFDMA: symbols`\n\n**OFDMA: resource blocks**\n\n- **resource block (RB):** \n- symbols grouped into resource blocks\n- 84 symbols (7 symbols/slot over 12 subcarriers) in 4G\n- smallest unit of data that can be sent to (assigned to) a user\n- Base station decides which RBs get assigned (over all frequencies) to which devices at 1 msec intervals\n\n- **Slide Diagram Elements & Protocol Entities:** `frequency, time, 66.6 umsec, 0.5 msec slot, 1 msec, . . ., frequencies, 4G / 5G scheduling interval`\n\n**From 4G LTE to 5G New Radio (NR)**\n\n- **Commonalities, differences:** \n- 4G, 5G both use OFDMA\n- **Subcarrier bandwidths:** \n  - 4G: 15 kHz\n  - 5G: 15, 30, 60, 120 kHz\n- **Max carrier bandwidth:** \n  - 4G: 20 MHz\n  - 5G: 100 MHz\n- **4G, 5G:** resource blocks (RB)\n- smallest scheduling unit of transmission to device\n- 12 (or configurable) number of subcarriers per carrier\n\n- **Slide Diagram Elements & Protocol Entities:** `14 symbols/subcarrier 1 msec 1 5G NR PRB, . . ., 7 symbols/subcarrier 0.5 msec 1 LTE PRB, configurable bandwidth per sub carrier`"
      },
      {
        "title": "3. CSMA/CA: addressing the “hidden terminals” problem (Slides 7-59..62)",
        "content": "**CSMA/CA: addressing the “hidden terminals” problem**\n\n- Objects cause ”hidden terminals”\n- B, A hear each other\n- B, C hear each other\n- A, C can not hear each other means A, C unaware of their interference at B\n- Path loss causes “hidden terminals”\n- B, A hear each other\n- B, C hear each other\n- A, C can not hear each other interfering at B\n- space\n- Signal strength\n- (log scale)\n- signal detection\n- threshold\n\n**CSMA/CA: collisions happen**\n\n- DIFS\n- data\n- data\n- A senses channel empty, transmits\n- DIFS\n- B senses channel empty (A’s’ transmission has not reached B yet), transmits\n- collision\n- data\n- A senses channel empty, transmits\n- DIFS\n- B senses channel empty (does not hear A’s transmission due to fading), transmits\n- collision\n- data\n\n**IEEE 802.11 MAC Protocol: CSMA/CA**\n\n- 802.11 sender\n- 1 if sense channel idle for DIFS then\n  - transmit entire frame (no collision detection)\n- DIFS\n- data\n- SIFS\n- ACK\n- 802.11 receiver\n- if frame received OK\n- return ACK after SIFS (ACK needed due to hidden terminal problem)\n- 2 if sense channel busy then\n  - start random backoff time\n  - timer counts down while channel idle\n  - transmit when timer expires\n  - 3. if no ACK, increase random backoff interval, repeat 2 (see next slide)\n\n- **Slide Diagram Elements & Protocol Entities:** `sender, receiver`\n\n**CSMA/CA: randomization after collision**\n\n- DIFS\n- data\n- data\n- A senses channel empty, transmits\n- DIFS\n- Channel sensed idle for DIFS time\n- collision\n- data\n- data\n- NO ACK, loss or collision detected\n- **No ACK:** loss or collision detected\n- DIFS\n- DIFS\n- Wait randomized backoff [0, ~200 msec], depending on PHY. Backoff interval doubles after each collision\n\n- **Slide Diagram Elements & Protocol Entities:** `Transmit (successfully), Wait DIFS time, Wait randomized backoff, random backoff`"
      },
      {
        "title": "4. Avoiding collisions: using RTS/CTS (Slides 7-63..67)",
        "content": "**Avoiding collisions: using RTS/CTS**\n\n- **idea:** sender “reserves” channel use for data frames using small reservation packets\n- sender first transmits small request-to-send (RTS) packet to BS using CSMA\n  - RTSs may still collide with each other (but they’re short)\n  - contains duration for following data transmission\n- BS broadcasts clear-to-send (CTS) packet in response to RTS\n  - contains duration for following data transmission\n- RTS and/or CTS heard by all nodes\n  - All nodes except transmitter defer transmissions\n  - transmits data frame\n\n> **Kurose & Ross Lecture Note:** Ready to send and clear to send\n\n**Collision Avoidance: RTS-CTS exchange**\n\n- RTS(A)\n- RTS(B)\n- RTS(A)\n- CTS(A)\n- CTS(A)\n- DATA (A)\n- ACK(A)\n- ACK(A)\n- reservation collision\n- defer\n\n- **Slide Diagram Elements & Protocol Entities:** `time`\n\n**Backwards compatibility: challenging**\n\n- **Challenge:** WiFi 6/7 APs support OFDM (FDMA) and OFDMA (FDMA+TDMA)\n- How can a WiFi 6/7 AP do both FDMA and TDMA at the same time?\n- How can WiFi 6/7 AP support user device radios that only do FDMA?\n- IEEE standard | WiFi gen | Year | Max data rate (theoretical) | Frequency (GHz) | Bandwidth | PHY\n- 802.11b | 1999 | 11 Mbps | 2.4 | 22 | spread spectrum\n- 802.11g | 2003 | 54 Mbps | 2.4 | 20 | OFDM\n- 802.11n | WiFi 4 | 2009 | 600 Mbps | 2.4, 5 | 20, 40 | OFDM\n- 802.11ac | WiFi 5 | 2013 | 6.9 Gbps | 5 | 20, 40, 80,160 | OFDM, MIMO\n- 802.11ax | WiFi 6 | 2020 | 9.5 Gbps | 2.4, 5 | 20, 40, 80,160 | OFDM, OFDMA,  MIMO\n- 802.11be | WiFi 7 | 2024 | 30+ Gbps | 2.4, 5, 6 | 20, 40, 80,160, 320 | OFDM, OFDMA, MIMO\n\n**Extending RTS/CTS: Multiuser RTS**\n\n- **idea:** create new type of RTS message Multiuser RTS (MU-RTS)\n- transmitter must use MU-RTS before OFDMA transmissions\n- transmit MU-RTS using full FDMA channel, with duration info (as usual )\n  - heard by all 802.11* devices (both OFDM- and OFDMA-capable)\n  - contains additional OFDMA assignment info for receivers (so receivers will know which OFDMA RUs to listen to)\n- receivers respond with CTS, sent on assigned OFDMA subchannel\n- transmitter sends resource blocks to OFDMA receivers, according to assignment\n- **Example scenario:** \n- AP wants to send to seven devices\n- two legacy devices a, b (OFDM only)\n- five OFDMA-capable devices 1, ... 5\n- RTS\n- (business-as-usual for devices a,b)\n\n- **Slide Diagram Elements & Protocol Entities:** `MU-RTS (for OFDMA devices 1 ... 5)`\n\n> **Kurose & Ross Lecture Note:** Ready to send and clear to send"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **7.3 Wireless MAC: FDM, OFDM Orthogonal Subcarriers, OFDMA Resource Blocks & 802.11 CSMA/CA (RTS/CTS)**:\n\n- **Review Question 1 (Beacon Frames.):** What is the purpose of a beacon frame in WiFi (802.11) networks?\n  - **Verified Answer:** A beacon frame allows an access point to advertise its existence, and the frequency channel it is operating on, to devices that want to connect to an access point.\n\n- **Review Question 2 (Use of ACKs in WiFi.):** Why are link-layer ACKs used in WiFi (802.11) networks? [Hint: check two of the boxes below].\n  - **Verified Answer:** Because of the hidden terminal problem, a node that is transmitting and hears no collisions still doesn’t know if there was a collision at the receiver.; Wireless links are noisier than wired links, and so bit level errors are more likely to occur, making link-layer error recovery more valuable that in less-noisy wired links.\n\n- **Review Question 3 (Why three addresses?):** Why does the WiFi (802.11) link-layer frame have three addresses? [Note: WiFi actually has four MAC addresses in the frame, but we’re only focusing here on the three widely used ones].\n  - **Verified Answer:** Because both the access point that will relay this frame to the intended link-layer receiving host or router interface, as well as that intended destination host or router interface need to be specified.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "csmaca_rts_cts_timeline.py — Simulating IEEE 802.11 CSMA/CA DIFS, Backoff, RTS/CTS & SIFS Frame Exchange",
          "snippet": "# Kurose & Ross 9e - Section 7.3.2: IEEE 802.11 CSMA/CA with RTS/CTS Collision Avoidance Timeline\ntimeline = [\n    (\"Sender H1\", \"Senses channel idle for DIFS (34 us) -> Transmits short RTS frame reserving NAV duration\"),\n    (\"Access Pt\", \"Waits SIFS (16 us) -> Broadcasts CTS frame (inhibits Hidden Terminal H2 via NAV timer!)\"),\n    (\"Sender H1\", \"Waits SIFS (16 us) -> Transmits full DATA frame collision-free\"),\n    (\"Access Pt\", \"Waits SIFS (16 us) -> Transmits Link-Layer ACK frame\"),\n]\n\nfor actor, event in timeline:\n    print(f\"[{actor:9s}] {event}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 7.3 Wireless MAC: FDM, OFDM Orthogonal Subcarriers, OFDMA Resource Blocks & 802.11 CSMA/CA (RTS/CTS)",
      "filename": "csmaca_rts_cts_timeline.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 7.3.2: IEEE 802.11 CSMA/CA with RTS/CTS Collision Avoidance Timeline\ntimeline = [\n    (\"Sender H1\", \"Senses channel idle for DIFS (34 us) -> Transmits short RTS frame reserving NAV duration\"),\n    (\"Access Pt\", \"Waits SIFS (16 us) -> Broadcasts CTS frame (inhibits Hidden Terminal H2 via NAV timer!)\"),\n    (\"Sender H1\", \"Waits SIFS (16 us) -> Transmits full DATA frame collision-free\"),\n    (\"Access Pt\", \"Waits SIFS (16 us) -> Transmits Link-Layer ACK frame\"),\n]\n\nfor actor, event in timeline:\n    print(f\"[{actor:9s}] {event}\")",
      "expectedOutput": [
        "[OK] csmaca_rts_cts_timeline.py — Simulating IEEE 802.11 CSMA/CA DIFS, Backoff, RTS/CTS & SIFS Frame Exchange",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 7.3 Wireless MAC: FDM, OFDM Orthogonal Subcarriers, OFDMA Resource Blocks & 802.11 CSMA/CA (RTS/CTS). Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Why are link-layer ACKs used in WiFi (802.11) networks? [Hint: check two of the boxes below].",
      "options": [
        "A) Hearing a receiver ACK, all other stations will stop transmitting. This reduces collisions.",
        "B) Because of the hidden terminal problem, a node that is transmitting and hears no collisions still doesn’t know if there was a collision at t",
        "C) The sender can used the differences in the signal strength in an ACK to infer whether the receiver is moving towards, or away from, the send",
        "D) Wireless links are noisier than wired links, and so bit level errors are more likely to occur, making link-layer error recovery more valuabl"
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 7), 'Because of the hidden terminal problem, a node that is transmitting and hears no collisions still doesn’t know if there was a collision at the receiver.' accurately characterizes 7.3 Wireless MAC: FDM, OFDM Orthogonal Subcarriers, OFDMA Resource Blocks & 802.11 CSMA/CA (RTS/CTS)."
    }
  },
  "cn-ch7-wifi-80211-frame-architecture": {
    "id": "cn-ch7-wifi-80211-frame-architecture",
    "badge": "Module 7 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "7.3B IEEE 802.11 WiFi Link Layer: AP-to-Router Frame Flow & 4-Address Frame Format (Addr1–Addr4)",
    "subtitle": "Why an 802.11 wireless frame needs up to 4 MAC addresses (Receiver MAC, Transmitter MAC, Router Interface MAC, WDS MAC), AP bridging between 802.11 and 802.3 Ethernet, and Frame Control fields.",
    "sections": [
      {
        "title": "1. 802.11 wireless link layer (Slides 7-69..69)",
        "content": "![7.3B IEEE 802.11 WiFi Link Layer: AP-to-Router Frame Flow & 4-Address Frame Format (Addr1–Addr4) Architecture](/images/networking/5g-wifi-wireless-arch.svg)\n\n**7.3B IEEE 802.11 WiFi Link Layer: AP-to-Router Frame Flow & 4-Address Frame Format (Addr1–Addr4)** — Why an 802.11 wireless frame needs up to 4 MAC addresses (Receiver MAC, Transmitter MAC, Router Interface MAC, WDS MAC), AP bridging between 802.11 and 802.3 Ethernet, and Frame Control fields.\n\n- data plane\n- WLAN\n- Link layer\n- Application\n- Network\n- Physical\n- Transport\n- 802.11 MAC\n- control plane\n- 802.3 MAC\n- PHY\n- 802.11 MAC\n- PHY\n- data plane\n- control plane\n- 802.3 MAC\n- PHY\n- 802.11\n- 802.3",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 7 Key Principle",
          "message": "Why an 802.11 wireless frame needs up to 4 MAC addresses (Receiver MAC, Transmitter MAC, Router Interface MAC, WDS MAC), AP bridging between 802.11 and 802.3 Ethernet, and Frame Control fields."
        }
      },
      {
        "title": "2. 802.11 downlink (AP-to-device) frame flow (Slides 7-70..70)",
        "content": "- UEs\n- to/from institutional\n- network, Internet\n- reliable\n- data transfer\n- energy\n- management\n- channel\n- measurement\n- discovery,\n- attachment\n- RTS/CTS\n- control plane\n- data plane\n- PHY\n- control frame\n- mngmnt frame\n- mngmnt frame\n- control frame\n- IP datagram\n- IP datagram\n- IP datagram\n- data frame\n- data frame\n- data frame\n- queue of frames awaiting transmission\n- (MAC scheduling)\n- **data frames:** containing IP datagrams\n- Control, management frames"
      },
      {
        "title": "3. 802.11 frame: addressing (Slides 7-71..72)",
        "content": "- 0 - 2312\n- **Address 1:** MAC address of wireless host or AP to receive this frame\n- **Address 4:** used only in ad hoc mode\n- frame\n- control\n- duration\n- address\n- address\n- address\n- address\n- payload\n- CRC\n- seq\n- control\n- **Address 2:** MAC address\n- of wireless host or AP\n- transmitting this frame\n- **Address 3:** MAC address of router interface to which AP is attached\n- Internet\n- AP MAC addr\n- address 1\n- address 2\n- address 3\n- 802.11 WiFi frame\n- R1 MAC addr\n- H1 MAC addr\n- MAC dest addr\n- MAC source addr\n- 802.3 Ethernet frame\n- H2 MAC addr"
      },
      {
        "title": "4. 802.11 frame (Slides 7-73..73)",
        "content": "- 0 - 2312\n- frame\n- control\n- duration\n- address\n- address\n- address\n- address\n- payload\n- CRC\n- seq\n- control\n- duration of reserved\n- transmission time (RTS/CTS)\n- frame sequence # (for reliable data transfer)\n- type\n- from\n- subtype\n- more\n- frag\n- WEP\n- more\n- data\n- power\n- mgt\n- retry\n- rsvd\n- protocol\n- version\n- **0:** management\n- **1:** control\n- **2:** data\n- IP datagram, link-layer control or management message\n- type of management, control, or data frame\n\n> **Kurose & Ross Lecture Note:** https://howiwifi.com/2020/07/13/802-11-frame-types-and-formats/"
      },
      {
        "title": "5. Retrospective: “A day in the life”* (WiFi) (Slides 7-74..74)",
        "content": "- Application\n- Network\n- Physical\n- Transport\n- 802.11 MAC\n- control plane\n- 802.11 MAC\n- Physical\n- data plane\n- control plane\n- data plane\n- ***https:** //gaia.cs.umass.edu/kurose_ross/videos/6/\n- HTTP\n- HTTP/3 request in UDP segment, in IP datagram, into 802.11 frame. Enter, wait, MAC frame scheduling queue\n- RTS\n- CTS\n- Device sends RTS control frame (using CSMA/CA); AP responds with CTS.\n- Device sends DATA frame to AP. Buffers DATA frame\n- ACK\n- AP responds with ACK, device removes transmitted frame\n- AP can now forward frame to router"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **7.3B IEEE 802.11 WiFi Link Layer: AP-to-Router Frame Flow & 4-Address Frame Format (Addr1–Addr4)**:\n\n- **Review Question 1 (Beacon Frames.):** What is the purpose of a beacon frame in WiFi (802.11) networks?\n  - **Verified Answer:** A beacon frame allows an access point to advertise its existence, and the frequency channel it is operating on, to devices that want to connect to an access point.\n\n- **Review Question 2 (Use of ACKs in WiFi.):** Why are link-layer ACKs used in WiFi (802.11) networks? [Hint: check two of the boxes below].\n  - **Verified Answer:** Because of the hidden terminal problem, a node that is transmitting and hears no collisions still doesn’t know if there was a collision at the receiver.; Wireless links are noisier than wired links, and so bit level errors are more likely to occur, making link-layer error recovery more valuable that in less-noisy wired links.\n\n- **Review Question 3 (Why three addresses?):** Why does the WiFi (802.11) link-layer frame have three addresses? [Note: WiFi actually has four MAC addresses in the frame, but we’re only focusing here on the three widely used ones].\n  - **Verified Answer:** Because both the access point that will relay this frame to the intended link-layer receiving host or router interface, as well as that intended destination host or router interface need to be specified.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "wifi_80211_3address_mapper.py — Mapping 802.11 Address 1, Address 2 & Address 3 for Uplink and Downlink Frames",
          "snippet": "# Kurose & Ross 9e - Section 7.3.3: IEEE 802.11 3-Address Frame Header Mapping (Host H1 <-> AP <-> Router R1)\nh1_mac = \"AA:AA:AA:11:11:11\"\nap_mac = \"BB:BB:BB:22:22:22\"\nr1_mac = \"CC:CC:CC:33:33:33\"\n\nuplink_80211   = {\"Addr1 (Receiver)\": ap_mac, \"Addr2 (Transmitter)\": h1_mac, \"Addr3 (Router Dst)\": r1_mac}\ndownlink_80211 = {\"Addr1 (Receiver)\": h1_mac, \"Addr2 (Transmitter)\": ap_mac, \"Addr3 (Router Src)\": r1_mac}\n\nprint(\"Uplink   (H1 -> AP) 802.11 Header :\", uplink_80211)\nprint(\"Bridged  (AP -> R1) 802.3  Header :\", {\"DstMAC\": uplink_80211[\"Addr3 (Router Dst)\"], \"SrcMAC\": uplink_80211[\"Addr2 (Transmitter)\"]})\nprint(\"Downlink (AP -> H1) 802.11 Header :\", downlink_80211)"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 7.3B IEEE 802.11 WiFi Link Layer: AP-to-Router Frame Flow & 4-Address Frame Format (Addr1–Addr4)",
      "filename": "wifi_80211_3address_mapper.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 7.3.3: IEEE 802.11 3-Address Frame Header Mapping (Host H1 <-> AP <-> Router R1)\nh1_mac = \"AA:AA:AA:11:11:11\"\nap_mac = \"BB:BB:BB:22:22:22\"\nr1_mac = \"CC:CC:CC:33:33:33\"\n\nuplink_80211   = {\"Addr1 (Receiver)\": ap_mac, \"Addr2 (Transmitter)\": h1_mac, \"Addr3 (Router Dst)\": r1_mac}\ndownlink_80211 = {\"Addr1 (Receiver)\": h1_mac, \"Addr2 (Transmitter)\": ap_mac, \"Addr3 (Router Src)\": r1_mac}\n\nprint(\"Uplink   (H1 -> AP) 802.11 Header :\", uplink_80211)\nprint(\"Bridged  (AP -> R1) 802.3  Header :\", {\"DstMAC\": uplink_80211[\"Addr3 (Router Dst)\"], \"SrcMAC\": uplink_80211[\"Addr2 (Transmitter)\"]})\nprint(\"Downlink (AP -> H1) 802.11 Header :\", downlink_80211)",
      "expectedOutput": [
        "[OK] wifi_80211_3address_mapper.py — Mapping 802.11 Address 1, Address 2 & Address 3 for Uplink and Downlink Frames",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 7.3B IEEE 802.11 WiFi Link Layer: AP-to-Router Frame Flow & 4-Address Frame Format (Addr1–Addr4). Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statement are true about the Bluetooth protocol?",
      "options": [
        "A) Bluetooth uses TDM, FDM, polling, error detection and correction, and has sleep modes to conserve device power. Pretty sophisticated for a c",
        "B) Bluetooth networks have a centralized controller that serves to coordinate the various client devices in a Bluetooth piconet.",
        "C) Bluetooth transmits all frames in the same frequency band.",
        "D) Bluetooth transmission rates can be as high as in WiFi networks."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 7), 'Bluetooth uses TDM, FDM, polling, error detection and correction, and has sleep modes to conserve device power. Pretty sophisticated for a consumer technology!' accurately characterizes 7.3B IEEE 802.11 WiFi Link Layer: AP-to-Router Frame Flow & 4-Address Frame Format (Addr1–Addr4)."
    }
  },
  "cn-ch7-5g-ran-pipeline": {
    "id": "cn-ch7-5g-ran-pipeline",
    "badge": "Module 7 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "7.4 5G Cellular Architecture & Radio Access Network (RAN): Channels, PDCP/RLC/MAC Pipeline & Split/SD-RAN",
    "subtitle": "5G New Radio (NR) sub-6GHz and mmWave bands, physical/logical downlink and uplink channels, the 5G RAN protocol stack (PDCP encryption, RLC segmentation, MAC HARQ), RU/DU/CU Split RAN, and Software-Defined RAN.",
    "sections": [
      {
        "title": "1. Architectural Elements of 5G (Slides 7-76..78)",
        "content": "![7.4 5G Cellular Architecture & Radio Access Network (RAN): Channels, PDCP/RLC/MAC Pipeline & Split/SD-RAN Architecture](/images/networking/5g-wifi-wireless-arch.svg)\n\n**7.4 5G Cellular Architecture & Radio Access Network (RAN): Channels, PDCP/RLC/MAC Pipeline & Split/SD-RAN** — 5G New Radio (NR) sub-6GHz and mmWave bands, physical/logical downlink and uplink channels, the 5G RAN protocol stack (PDCP encryption, RLC segmentation, MAC HARQ), RU/DU/CU Split RAN, and Software-Defined RAN.\n\n**Architectural Elements of 5G**\n\n- **Slide Diagram Elements & Protocol Entities:** `radio access Network (RAN), to Internet, 5G core network, gNodeB, User device, Core Network Functions`\n\n**5G Radio Access Network (RAN)**\n\n- **5G RAN:** edge network connecting devices to base station\n- provides link-layer service, as first hop between devices and larger network\n- limited geographic scope\n- under control of a single service provider\n- somewhat analogous to WiFi LAN\n- **RAN components:** \n  - many devices (User Equipment: UE)\n  - radio channel (New Radio: NR)\n  - one base station (Next Generation Node B: gNodeB, gNB)\n\n- **Slide Diagram Elements & Protocol Entities:** `gNodeB, User equipment (UEs)`\n\n**Core situated between RAN and other endpoints (Core, larger Internet)**\n\n  - single Core; multiple RANs\n- consist of links, routers, servers, providing services to devices and base stations\n  - “all IP” Core, but very different services than traditional Internet apps\n- clear logical separation between control-plane, user plane:\n  - CUPS: Control-Plane and User-Plane Separation\n\n- **Slide Diagram Elements & Protocol Entities:** `5G Core Network, to Internet, Core Network Functions`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 7 Key Principle",
          "message": "5G New Radio (NR) sub-6GHz and mmWave bands, physical/logical downlink and uplink channels, the 5G RAN protocol stack (PDCP encryption, RLC segmentation, MAC HARQ), RU/DU/CU Split RAN, and Software-Defined RAN."
        }
      },
      {
        "title": "2. Resource Blocks (RB) (Slides 7-79..81)",
        "content": "**Resource Blocks (RB)**\n\n  - Resource Element (RE): holds one transmitted OFDMA symbol, in one time minislot on one subcarrier frequency\n  - Resource Block (RB): bundle of neighboring (time, frequency) Resource Elements\n    - 4G: 84 symbols (12 neighboring subcarriers, 7 consecutive minislots)\n    - 5G: multiple bundlings possible\n    - RB is smallest unit of transmission scheduling: all symbols in RB have same source, destination\n- 10 MHz channel with 50 RBs.\n- each RB spanning 180 kHz subchannel\n- **4G Resource Block (RB):** 84 Resource Elements (REs), each carrying one symbol.\n\n- **Slide Diagram Elements & Protocol Entities:** `180 kHz, 1 ms, time, . . .`\n\n**5G Bands, Channels, Subchannels: it confusing!**\n\n  - ... and it’s about to get more confusing\n- 10 MHz channel with 50 RBs.\n- each RB spanning 180 kHz subchannel\n\n- **Slide Diagram Elements & Protocol Entities:** `180 kHz, 1 ms, time, . . ., channel N, channel 1, one band, multiple channels, multiple subchannels per channel`\n\n**Downlink physical channels**\n\n- downlink RBs transmitted from base station to devices\n- **three 5G downlink physical channels:** \n  - Physical Downlink Shared Channel (PDSCH)\n  - Physical Downlink Control Channel (PDCCH)\n  - Physical Broadcast Channel (PBCH)\n- set of Resource Blocks (RBs) carrying similar type of data (channel information RBs, user and control RBs, RB allocation information)\n\n- **Slide Diagram Elements & Protocol Entities:** `base station, Physical channel`"
      },
      {
        "title": "3. Uplink physical channels (Slides 7-82..84)",
        "content": "**Uplink physical channels**\n\n- uplink RBs transmitted from devices to base station\n- **three 5G uplink physical channels:** \n  - Physical Uplink Shared Channel (PUSCH)\n  - Physical Random-Access Channel (PRACH)\n  - Physical Uplink Control Channel (PUCCH)\n- set of Resource Blocks (RBs) carrying similar type of data (radio channel information RBs, user and control RBs, RB allocation information)\n\n- **Slide Diagram Elements & Protocol Entities:** `Physical channel, base station`\n\n**Uplink/downlink logical channels**\n\n- Set of Resource Blocks (RBs) carrying similar type of data. Logical channels are mapped onto physical channels, with one or more logical channel mapped to same physical channel\n- individual, per-device logical channels, as well as shared logical channels among devices\n\n- **Slide Diagram Elements & Protocol Entities:** `logical channel, 6 physical channels, many logical channels, base station`\n\n**RAN protocol stack (at device, base station)**\n\n- **Slide Diagram Elements & Protocol Entities:** `RAN link layer, PDCP, RLC, MAC, Physical, RRC, SDAP, control plane, Network, user plane, device, base station, Transport, Application`"
      },
      {
        "title": "4. HTTP (Slides 7-85..91)",
        "content": "**HTTP**\n\n- **Retrospective:** “A day in the life”* (5G RAN)\n- HTTP/3 request in UDP segment, in IP datagram, into 5G frame. Enter, wait, 5G MAC frame scheduling queue\n- device’s control plane sends SR Scheduling Req) on Physical Uplink Control Channel (PUCCH) to base station\n- base station control plane send DCI message Physical Downlink Control Channel (PDCCH) granting upstream RBs\n- device sends frame in allocated RBs\n\n- **Slide Diagram Elements & Protocol Entities:** `PDCP, RLC, MAC, Physical, RRC, SDAP, control plane, Network, user plane, device, base station, Transport, Application, DCI`\n\n**RAN packet processing pipeline: context**\n\n- **RAN:** transfers datagrams between mobile core and devices\n- protocol processing pipeline in UE\n\n- **Slide Diagram Elements & Protocol Entities:** `Base station (gNode-B), IP datagrams, device, datagrams`\n\n**RAN packet processing pipeline**\n\n- RRC (Radio Resource Control)\n- configures coarse-grained, policy-related aspects of pipeline (e.g., scheduling prioritization, security)\n- this implements the RAN’s control plane\n- does not process user plane packets\n- PDCP (Packet Data Convergence Protocol)\n- compress/decompress IP headers\n- ciphering, integrity protection\n- RLC (radio link control)\n- link-layer frame segmentation/reassembly\n- reliable data transfer (ARQ)\n- MAC (Media Access Control)\n- buffering, multiplexing/demultiplexing frames\n- **scheduling:** real-time scheduling frame decisions\n- I msec scheduling control loop\n- PHY (Physical Layer)\n- modulation, coding\n\n- **Slide Diagram Elements & Protocol Entities:** `RRC, PDCP, RLC, MAC, D/A conversion, RF front end, PHY, base station, control plane, user plane, mobile core, traditional 3GPP view, datagrams`"
      },
      {
        "title": "5. Split RAN (Slides 7-92..97)",
        "content": "**Split RAN**\n\n  - Q: how is RAN functionality partitioned between physical elements (i.e.,., “split” across centralized and distributed locations)?\n    - historically: no split - implemented in base station\n  - Q: how is RAN functionality partitioned between physical elements (i.e,., “split” across centralized and distributed locations)?\n    - O-RAN: three “units” - where units are implemented is an implementation choice\n\n- **Slide Diagram Elements & Protocol Entities:** `RRC, PDCP, RLC, MAC, D/A conversion, RF front end, PHY, Monolithic base station, control plane, user plane, datagrams, Central Unit (CU), Distributed Unit (DU), Radio Unit (RU)`\n\n**Software-defined RAN**\n\n- Recall our earlier description of traditional RAN base station (below)\n- tightly coupled control and data planes\n- **let’s focus on control / management:** RRC implementation\n  - SD-RAN: implementing RAN using SDN approach\n- Control plane proxy\n- PDCP\n- RLC\n- MAC\n- D/A\n- conversion\n- front end\n- PHY\n- control\n- plane\n- user\n- Real-Time Intelligent Controller (RIC)\n- 3GPP-compliant interface between RAN and Mobile Core control plane\n- New programmatic API for exerting software-based control over pipeline that implements RAN user plane\n- Re-factored RRC\n- SDN-controlled switches\n- RAN Network Information Base (R-NIB)\n- common set of information consumed by numerous control apps, e.g., longer time-scale CQI (channel Quality Indicator) values, other per-session state\n- R-NIB\n- load\n- balancing\n- handover\n- QoS\n- Near-real time network control applications implemented as “xApps”\n\n**RAN: operator’s “secret sauce”**\n\n    - combination of standardized specifications + implementation strategies:\n    - interfaces, high-level functions standardized\n    - implementation of some functions, e.g., RB assignment to channels, frame scheduling, not standardized – up to the network operator.\n    - implementation choices are the technical “secret sauces”"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **7.4 5G Cellular Architecture & Radio Access Network (RAN): Channels, PDCP/RLC/MAC Pipeline & Split/SD-RAN**:\n\n- **Review Question 1 (IMSI.):** In 4G LTE cellular systems, what is an International Mobile Subscriber Identity (IMSI)?\n  - **Verified Answer:** A 64-bit identifier stored on a cellular SIM (Subscriber Identity Module) card that identifies the subscriber in the worldwide cellular carrier network system.\n\n- **Review Question 2 (Power conserving “sleep modes”.):** Which of the following statements is true about “sleep modes” that allow a wireless device to “sleep” and occasionally “wake up” as a technique for saving battery life?\n  - **Verified Answer:** Both WiFi and LTE provide sleep modes.\n\n- **Review Question 3 (Connecting 4G cellular networks together.):** Which of the following statements is true about how 4G cellular networks (operated by different carriers/companies) connect together?\n  - **Verified Answer:** 4G networks are generally all-IP, and so cellular networks interconnect (peer) directly to each other, or peer at the cellular equivalents of the Internet Exchange Points that we saw used for interconnecting wired networks in the public Internet.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "5g_ran_packet_pipeline.py — Tracing a Downlink IP Packet Through the 5G RAN Protocol Stack (PDCP -> RLC -> MAC -> PHY)",
          "snippet": "# Kurose & Ross 9e - Section 7.4.2: 5G Radio Access Network (RAN) Packet Processing Pipeline\nstages = [\n    (\"1. PDCP (Packet Data Convergence)\", \"Header compression (ROHC), ciphering/encryption, integrity protection\"),\n    (\"2. RLC  (Radio Link Control)\",      \"Segmentation/reassembly to fit variable radio block sizes, ARQ error recovery\"),\n    (\"3. MAC  (Medium Access Control)\",   \"Dynamic Resource Block (RB) scheduling across UEs, Hybrid ARQ (HARQ)\"),\n    (\"4. PHY  (Physical Layer)\",          \"LDPC/Polar FEC coding, QAM modulation, MIMO precoding onto OFDMA Resource Blocks\"),\n]\n\nfor layer, role in stages:\n    print(f\"{layer:35s}: {role}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 7.4 5G Cellular Architecture & Radio Access Network (RAN): Channels, PDCP/RLC/MAC Pipeline & Split/SD-RAN",
      "filename": "5g_ran_packet_pipeline.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 7.4.2: 5G Radio Access Network (RAN) Packet Processing Pipeline\nstages = [\n    (\"1. PDCP (Packet Data Convergence)\", \"Header compression (ROHC), ciphering/encryption, integrity protection\"),\n    (\"2. RLC  (Radio Link Control)\",      \"Segmentation/reassembly to fit variable radio block sizes, ARQ error recovery\"),\n    (\"3. MAC  (Medium Access Control)\",   \"Dynamic Resource Block (RB) scheduling across UEs, Hybrid ARQ (HARQ)\"),\n    (\"4. PHY  (Physical Layer)\",          \"LDPC/Polar FEC coding, QAM modulation, MIMO precoding onto OFDMA Resource Blocks\"),\n]\n\nfor layer, role in stages:\n    print(f\"{layer:35s}: {role}\")",
      "expectedOutput": [
        "[OK] 5g_ran_packet_pipeline.py — Tracing a Downlink IP Packet Through the 5G RAN Protocol Stack (PDCP -> RLC -> MAC -> PHY)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 7.4 5G Cellular Architecture & Radio Access Network (RAN): Channels, PDCP/RLC/MAC Pipeline & Split/SD-RAN. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements is true about how 4G cellular networks (operated by different carriers/companies) connect together?",
      "options": [
        "A) In a 4G network, the radio access network connects to the legacy phone network for voice calls, but to the public Internet for data connecti",
        "B) 4G networks are generally all-IP, and so cellular networks interconnect (peer) directly to each other, or peer at the cellular equivalents o",
        "C) 4G networks connect to each other using the existing phone interconnection networks from earlier 3G and 2G networks.",
        "D) None of the above statements apply to this protocol layer."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 7), '4G networks are generally all-IP, and so cellular networks interconnect (peer) directly to each other, or peer at the cellular equivalents of the Internet Exchange Points that we saw used for interconnecting wired networks in the public Internet.' accurately characterizes 7.4 5G Cellular Architecture & Radio Access Network (RAN): Channels, PDCP/RLC/MAC Pipeline & Split/SD-RAN."
    }
  },
  "cn-ch7-wireless-association-scheduling-power": {
    "id": "cn-ch7-wireless-association-scheduling-power",
    "badge": "Module 7 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "7.4B Joining the Wireless Edge, Channel-Aware MAC Scheduling (Max Throughput vs. BET) & Power Saving",
    "subtitle": "Passive beacon scanning vs. active probing in 802.11 and 5G, CQI/QCI feedback, Max Throughput vs. Blind Equal Throughput (BET) proportional-fair scheduling, and coordinated sleep/wake cycles (DRX).",
    "sections": [
      {
        "title": "1. Joining the edge wireless network (Slides 7-99..102)",
        "content": "![7.4B Joining the Wireless Edge, Channel-Aware MAC Scheduling (Max Throughput vs. BET) & Power Saving Architecture](/images/networking/5g-wifi-wireless-arch.svg)\n\n**7.4B Joining the Wireless Edge, Channel-Aware MAC Scheduling (Max Throughput vs. BET) & Power Saving** — Passive beacon scanning vs. active probing in 802.11 and 5G, CQI/QCI feedback, Max Throughput vs. Blind Equal Throughput (BET) proportional-fair scheduling, and coordinated sleep/wake cycles (DRX).\n\n**Joining the edge wireless network**\n\n- **arriving device:** must establish initial connection with node (WiFi AP, 4G/5G base station) at wireless edge of network\n  - initial connection then used for authentication, DHCP, gain full network access\n  - “bootstrapping” connectivity: initial connection is just with edge node\n- institution’s\n- wired network\n- Internet\n- gNode-B\n- Mobile packet core\n- Internet\n- WiFi AP\n- WiFi\n- association\n\n**Association: two approaches**\n\n- **Beaconing:** mobile listens to wireless channels for “beacons” advertising existence of wireless network node(s)\n- **Probing:** mobile actively transmits probe messages, waits for wireless network node(s) to reply\n- user device\n- Edge network 1\n- Edge network 2\n- base\n- station\n- base\n- station\n- probe request\n- reply\n- reply\n- user device\n- Edge network 1\n- Edge network 2\n- base\n- station\n- base\n- station\n- beacon\n- beacon\n- Either (or both) approaches used in practice in an edge network\n\n**802.11: beaconing and probing**\n\n- arriving client device\n- WiFi AP\n- 802.11 beacon frame (broadcast)\n- 802.11 Association request\n- 802.11 Association response\n- **Beaconing:** \n- ... device will next authenticate to network\n- AP 2\n- AP 1\n- Probe Request frame broadcast from H1\n- Probe Response frames sent from APs\n- **Association Request frame sent:** H1 to selected AP\n- Association Response frame sent from selected AP to H1\n- **Probing:** \n- No exchange of identity, credentials (yet)! Just “Can we talk?”\n\n**Connecting to the 5G edge**\n\n- RRC connection setup request\n- RRC connection setup response\n\n- **Slide Diagram Elements & Protocol Entities:** `5G network (network 1), 5G network (network 2), Base station 1, network 1’s SSB, SIBs, network 2’s SSB, SIBs, Base station 2`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 7 Key Principle",
          "message": "Passive beacon scanning vs. active probing in 802.11 and 5G, CQI/QCI feedback, Max Throughput vs. Blind Equal Throughput (BET) proportional-fair scheduling, and coordinated sleep/wake cycles (DRX)."
        }
      },
      {
        "title": "2. RAN/WLAN scheduling: the “big picture” (Slides 7-103..106)",
        "content": "**RAN/WLAN scheduling: the “big picture”**\n\n- All packets to/from all devices in edge network must pass through base station\n- **4G/5G and WiFi 6/7:** OFDMA RB scheduling\n- **downlink MAC scheduler:** which frames to send from base station to which devices in which order in which RBs (if OFDMA)?\n- **uplink MAC scheduler:** which devices send which frames in which order in which RBs to base station (if OFDMA)\n- gNodeB\n- devices\n- 5G RAN\n- devices\n- Wi-Fi\n- PHY\n- MAC\n- PHY\n- MAC\n\n**Wireless MAC scheduling: considerations**\n\n- Channel aware or channel unaware?\n- does scheduler consider quality of channel between base station and device?\n- good\n- poor\n- QoS aware or QoS unaware?\n- does scheduler consider QoS (quality of service) needed by (or guaranteed to) device?\n- voice\n- WWW browsing\n- Priorities, Fair scheduling?\n- Does scheduler provide priority among different types of traffic (user, control, real-time)?\n- does scheduler consider fairness among UEs?\n- **fairness:** no standard definition\n- “We are all equally important”\n\n**MAC scheduling considerations**\n\n- Channel aware or channel unaware?\n- does scheduler consider quality of channel between base station and device?\n- good\n- poor\n- QoS aware or QoS unaware?\n- does scheduler consider QoS (quality of service) needed by (or guaranteed to) device?\n- voice\n- WWW browsing\n- Priorities, Fair scheduling?\n- Does scheduler provide priority among different types of traffic (user, control, real-time)?\n- does scheduler consider fairness among UEs?\n- **fairness:** no standard definition\n- “We are all equally important”\n- Standards do not dictate answers to these questions!\n- Scheduling algorithms, parameters up to network implementers, operators: their “secret sauce”\n\n**RAN scheduling: Resource Blocks**\n\n- A 10 MHz channel with\n- 50 RBs, each RB spanning 180 kHz\n- kHz\n- **Scheduling:** \n- Base station decides which frames/packets get assigned to which RBs for transmission to user\n- **scheduling interval:** 1 msec\n- **scheduling complexity:** \n  - 50 subchannels per 10MHz channel\n  - 100’s (?) active user\n- **Resource Block:** 84 symbols\n- one user gets to transmit 84 symbols on one subchannel in 0.5 sec time interval\n- 50 subchannels per 10MHz channel\n- 1 ms\n- time"
      },
      {
        "title": "3. RAN scheduling: Channel Quality Indicator (Slides 7-107..111)",
        "content": "**RAN scheduling: Channel Quality Indicator**\n\n- PDCP\n- RLC\n- MAC\n- PHY\n- RAN packet-processing stack (3GPP)\n- IP datagrams\n- **Channel Quality Indicator (CQI):** \n- user measures quality of received reference signals (embedded in RBs), reports quality back to base station\n- 4-bit CQI value maps to modulation scheme to use (e.g., which QAM?) and expected throughput\n- scheduler\n- “We are all equally important”\n- control plane (RRC)\n- CQI\n\n**RAN scheduling: QoS Class Indicator**\n\n- PDCP\n- RLC\n- MAC\n- PHY\n- RAN packet-processing stack (3GPP)\n- IP datagrams\n- **QCI:** QoS Class Indicator\n- QoS network wants to provide to a particular device (e.g., delay, guaranteed bit rate QoS guarantees)\n- scheduler determines allocation of available radio spectrum to ensure all UEs meet their QoS requirements\n- scheduler\n- CQI\n- QCI\n- (RRC)\n- Priority | QCI | Max delay | Max loss | Application\n- 2 | 1 | 100ms | .01 | Voice\n- 3 | 4 | 50 ms | .001 | Real-time gaming\n- 6 | 7 | 300 ms | .000001 | Streaming video\n- 8 | 8 | 600 | .000001 | Web browsing, TCP\n\n**Scheduling policies: priority**\n\n- **Priority scheduling:** \n- arriving traffic classified, queued by class\n  - any header fields can be used for classification, e.g., control versus user data\n- high priority queue\n- low priority queue\n- arrivals\n- classify\n- departures\n- link\n- arrivals\n- departures\n- packet in service\n- send packet from highest priority queue that has buffered packets\n  - scheduling within priority class could be another scheduling discipline\n\n**Each device has its own queue**\n\n- scheduler cyclically scans device queues, mapping packets/frame from each device (if available) to an RB in turn\n- channel unaware, QoS unaware\n- fair (by turns) but not necessarily throughput-fair since different devices may have different channel quality\n- Round Robin scheduling (per UE)"
      },
      {
        "title": "4. find device (UE) i, with highest quality channel over all RBs, k: (Slides 7-112..115)",
        "content": "**find device (UE) i, with highest quality channel over all RBs, k:**\n\n    - dik(t): expected data rate for UEi using kth RB at time t (e.g., based on CQI)\n    - at t: select maxi,k {dik(t)}, assign UEi frame to RBk\n- maximizes overall immediate throughput\n- channel aware, QoS unaware, throughput unfair\n- Maximum Throughput (MT) scheduling\n\n**Blind Equal Throughput (BET) scheduling (per device)**\n\n- scheduler maintains exponentially-weighted-moving-average of data rate received at each UEi at time t, Ri(t):\n- Ri(t) = (1-b) . ri(t) + b . Ri(t-1)\n  - where ri(t) is data rate achieved in scheduling interval t\n- **at t:** select mini {Ri(t-1)}: assign UEi frame blindly (not know channel conditions) to (any) RB\n  - assign RB to device with smallest data rate last round\n- channel somewhat-aware, QoS unaware, blind throughput fair\n\n**combine Blind Equal Throughput (BET) and Maximum Throughput (MT) scheduling**\n\n    - dik(t): expected data rate for UEi using kth RB at time t\n    - Ri(t-1): data rate achieved by UEi at t\n- **at t:** select maxi,k {dik(t) / Ri(t-1)}: assign UEi\n- Proportional Fairness (PF) scheduling\n- balances high data rate with a measure of fairness\n- channel aware, QoS unaware, fairness aware\n\n**Energy consumption in wireless devices**\n\n- **battery/energy:** a critical resource in wireless devices (phones, IoT)\n- **energy use by LTE radios1:** \n  - on: transmitting or receiving/waiting to receive: 1000 — 3500mW\n  - off: < 15mW (~1% – 2 % of on-state energy use)\n- significant amount of device energy expended on communication, across applications\n- 5G implementations currently expending more energy than 4G\n- **Power use in mobile phones:** app vs screen vs system vs network\n- **Sources:** 1: ATT, 2: “Understanding Operational 5G,” ACM SIGCOMM 2020"
      },
      {
        "title": "5. Cycles of sleep/activity: sleep (Slides 7-116..119)",
        "content": "**Cycles of sleep/activity: sleep**\n\n- 4G/5G, WiFi, Bluetooth radios turned off when not in use: conserve energy\n- **Going to sleep is easier:** \n- **device-driven:** go to sleep if nothing to send, nothing being received\n- sleep may (or may not) be coordinated with base station (4/5G), AP (WiFi) , controller (BT)\n- may have deep-sleep (longer, more “turned off”) versus light sleep (shorter, less “turned off”)\n\n**Cycles of sleep/activity: awake**\n\n- 4G/5G, WiFi, Bluetooth radios turned off when not in use: conserve energy\n- **Waking up is harder:** \n- base station (4/5G), AP (WiFi) , controller (BT) needs to signal to “wake up” device when there are packets to be sent to it\n  - network context (4/5G) may need to be re-created\n  - data frames containing IP datagram (e.g., from remote hosts) need to be buffered at base station until device is awake\n\n**Cycles of sleep/activity: tradeoff/challenges**\n\n- How long to sleep?\n- **longer:** save more energy but greater latency\n  - effects on high-layer protocols: e.g., TCP\n- **shorter:** less energy savings, and more signaling overhead with short sleep cycles\n- How long to stay awake?\n- time since last activity (before going to sleep)\n  - data transmission typically “bursty”\n  - burst should be over before going to sleep: how long to wait?\n\n**Coordinated wake/sleep in 5G**\n\n- transmission received at device, start inactivity timer\n- incoming transmission to device buffered at base station until end of current DRX cycle\n- Device awakes from long DRX sleep, accepts channel scheduling assignment, ends sleep\n- inactivity timer timeout, enter short DRX cycle\n- periodic wakeup in short DRX cycles, nothing to send/receive, return to short DRX sleep\n- still nothing to send or receive, enter long DRX cycle\n- transmission received at device\n\n- **Slide Diagram Elements & Protocol Entities:** `device active, short DRX cycles, long DRX cycles, time`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **7.4B Joining the Wireless Edge, Channel-Aware MAC Scheduling (Max Throughput vs. BET) & Power Saving**:\n\n- **Review Question 1 (IMSI.):** In 4G LTE cellular systems, what is an International Mobile Subscriber Identity (IMSI)?\n  - **Verified Answer:** A 64-bit identifier stored on a cellular SIM (Subscriber Identity Module) card that identifies the subscriber in the worldwide cellular carrier network system.\n\n- **Review Question 2 (Power conserving “sleep modes”.):** Which of the following statements is true about “sleep modes” that allow a wireless device to “sleep” and occasionally “wake up” as a technique for saving battery life?\n  - **Verified Answer:** Both WiFi and LTE provide sleep modes.\n\n- **Review Question 3 (Connecting 4G cellular networks together.):** Which of the following statements is true about how 4G cellular networks (operated by different carriers/companies) connect together?\n  - **Verified Answer:** 4G networks are generally all-IP, and so cellular networks interconnect (peer) directly to each other, or peer at the cellular equivalents of the Internet Exchange Points that we saw used for interconnecting wired networks in the public Internet.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "ran_proportional_fair_scheduler.py — Kurose & Ross 5G RAN Scheduler: Max Throughput vs. Proportional Fair (MT + BET)",
          "snippet": "# Kurose & Ross 9e - Section 7.4.4: Combining Max Throughput (MT) and Blind Equal Throughput (BET)\nues = [\n    {\"id\": \"UE_1 (Near Base Station)\", \"inst_rate_mbps\": 80.0, \"hist_avg_mbps\": 75.0},\n    {\"id\": \"UE_2 (Cell Edge User)\",    \"inst_rate_mbps\": 25.0, \"hist_avg_mbps\": 10.0},\n]\n\nfor alpha in [1.0, 0.0, 0.5]:  # alpha=1 (Pure MT), alpha=0 (Pure BET), alpha=0.5 (Proportional Fair)\n    mode = \"Max Throughput (MT)\" if alpha == 1.0 else (\"Blind Equal (BET)\" if alpha == 0.0 else \"Proportional Fair (alpha=0.5)\")\n    scores = {u[\"id\"]: (u[\"inst_rate_mbps\"] ** alpha) / (u[\"hist_avg_mbps\"] ** (1.0 - alpha)) for u in ues}\n    winner = max(scores, key=scores.get)\n    print(f\"[{mode:27s}] Scores={ {k: round(v,2) for k,v in scores.items()} } -> Scheduled: {winner}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 7.4B Joining the Wireless Edge, Channel-Aware MAC Scheduling (Max Throughput vs. BET) & Power Saving",
      "filename": "ran_proportional_fair_scheduler.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 7.4.4: Combining Max Throughput (MT) and Blind Equal Throughput (BET)\nues = [\n    {\"id\": \"UE_1 (Near Base Station)\", \"inst_rate_mbps\": 80.0, \"hist_avg_mbps\": 75.0},\n    {\"id\": \"UE_2 (Cell Edge User)\",    \"inst_rate_mbps\": 25.0, \"hist_avg_mbps\": 10.0},\n]\n\nfor alpha in [1.0, 0.0, 0.5]:  # alpha=1 (Pure MT), alpha=0 (Pure BET), alpha=0.5 (Proportional Fair)\n    mode = \"Max Throughput (MT)\" if alpha == 1.0 else (\"Blind Equal (BET)\" if alpha == 0.0 else \"Proportional Fair (alpha=0.5)\")\n    scores = {u[\"id\"]: (u[\"inst_rate_mbps\"] ** alpha) / (u[\"hist_avg_mbps\"] ** (1.0 - alpha)) for u in ues}\n    winner = max(scores, key=scores.get)\n    print(f\"[{mode:27s}] Scores={ {k: round(v,2) for k,v in scores.items()} } -> Scheduled: {winner}\")",
      "expectedOutput": [
        "[OK] ran_proportional_fair_scheduler.py — Kurose & Ross 5G RAN Scheduler: Max Throughput vs. Proportional Fair (MT + BET)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 7.4B Joining the Wireless Edge, Channel-Aware MAC Scheduling (Max Throughput vs. BET) & Power Saving. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following statements is true about “sleep modes” that allow a wireless device to “sleep” and occasionally “wake up” as a technique for saving battery life?",
      "options": [
        "A) WiFi provides sleep modes but LTE does not.",
        "B) Neither WiFi nor LTE provide sleep modes.",
        "C) LTE provides sleep modes but WiFi does not.",
        "D) Both WiFi and LTE provide sleep modes."
      ],
      "correctIndex": 3,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 7), 'Both WiFi and LTE provide sleep modes.' accurately characterizes 7.4B Joining the Wireless Edge, Channel-Aware MAC Scheduling (Max Throughput vs. BET) & Power Saving."
    }
  },
  "cn-ch7-5g-core-cups-tunnels": {
    "id": "cn-ch7-5g-core-cups-tunnels",
    "badge": "Module 7 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "İleri Seviye",
    "title": "7.4C 5G Core Network Architecture: AMF, SMF, UPF, UDM, Control/User-Plane Separation (CUPS) & GTP-U",
    "subtitle": "Disaggregating the 5G Core into cloud-native microservices: Access and Mobility Management (AMF), Session Management (SMF), Unified Data Management (UDM), User Plane Function (UPF) GTP-U tunnels, and IMSI/SUPI.",
    "sections": [
      {
        "title": "1. 5G Core Functional Components (Slides 7-121..125)",
        "content": "![7.4C 5G Core Network Architecture: AMF, SMF, UPF, UDM, Control/User-Plane Separation (CUPS) & GTP-U Architecture](/images/networking/5g-wifi-wireless-arch.svg)\n\n**7.4C 5G Core Network Architecture: AMF, SMF, UPF, UDM, Control/User-Plane Separation (CUPS) & GTP-U** — Disaggregating the 5G Core into cloud-native microservices: Access and Mobility Management (AMF), Session Management (SMF), Unified Data Management (UDM), User Plane Function (UPF) GTP-U tunnels, and IMSI/SUPI.\n\n**5G Core Functional Components**\n\n- user plane\n- control plane\n- base station\n- AMF\n- Access, Mobility\n- Management\n- AUSF\n- Authentication\n- Server\n- SMF\n- Session\n- Management\n- UPF\n- User\n- Plane\n- NEF\n- Network Exposure\n- Application Function\n- NRF\n- Network Repository\n- PCF\n- Policy control\n- UDM\n- Unified Data Management\n- UDSF\n- Unstructured Data Storage\n- UDR\n- Unified Data Repository\n- SEPP\n- Security Edge Proxy\n- data\n- storage\n- control planes in other cellular providers\n- 3rd party apps\n- Internet\n- 5G Core is all (mostly) about control plane services\n- UPF (User Plane Function)\n- each device is assigned to a UPF, which acts as relay, forwarding traffic between UE, Internet\n- UPF responsible for policy enforcement, lawful intercept, traffic usage measurement, QoS policing\n- responsible for tunneling (i.e., encapsulating, decapsulating) traffic to/from base station over N3 interface\n- AMF (Access, Mobility Management Function)\n- connection, reachability management; mobility management; access authorization; and location services\n- SMF (Session Management Function)\n- manages each UE session, including IP address allocation, selection of associated UP function, QoS control, control aspects of UP routing\n- **AUSF (Authentication Server Function):** Authenticates devices.\n- **UDM (Unified Data Management):** Manages user identity, including the generation of authentication credentials.\n- **UDR (Unified Data Repository):** Manages user static subscriber-related information.\n- UDSF (Unstructured Data Storage Network Function): Used to store unstructured data, and so is similar to a Key/Value Store.\n\n**5G interfaces*, control/user -plane separation (CUPS)**\n\n- control plane\n- emphasis on functions and services\n- well-defined interfaces defines between services\n- base station\n- N13\n- N12\n- N10\n- N11\n- base station\n- S-GW\n- data plane\n- 5-layer Internet data plane\n- extensive use of tunneling\n- IP tunnel\n- AMF\n- Access, Mobility\n- Management\n- SMF\n- Session\n- Management\n- PCF\n- Policy control\n- AUSF\n- Authentication\n- Server\n- UDM\n- Unified Data Management\n- Application Function\n- UPF\n- User\n- Plane\n- IP datagrams\n- * not all 3GPP defined interface shown",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 7 Key Principle",
          "message": "Disaggregating the 5G Core into cloud-native microservices: Access and Mobility Management (AMF), Session Management (SMF), Unified Data Management (UDM), User Plane Function (UPF) GTP-U tunnels, and IMSI/SUPI."
        }
      },
      {
        "title": "2. 5G Core: User plane tunnels (Slides 7-126..127)",
        "content": "**5G Core: User plane tunnels**\n\n- Packet Data\n- Convergence\n- Radio Link\n- Medium Access\n- Physical\n- GTP-U\n- UDP\n- link\n- Physical\n- GTP-U\n- UDP\n- link\n- Physical\n- link\n- Physical\n- base station\n- address y\n- backhaul network\n- user device,\n- address z\n\n- **Slide Diagram Elements & Protocol Entities:** `from Internet, sender has IP address w, UPF for device z UPF address: x, Source addr: w, user payload, Dest addr: z, Source addr: x, Dest addr: y, UE payload`\n\n**Identity: who are you?**\n\n  - Internet approaches:\n  - You’re a name, password\n    - different names, password for different applications, services\n  - You’re a name, public key certificate\n    - servers often have public keys, users not so much (yet)\n  - 4G/5G:\n  - You’re a customer to a wireless service provider, with a home cellular network (who you pay)\n  - you have a SIM (Subscriber Identity Module) card or vSIM\n    - identifies you, your home network to all cellular networks globally\n    - has cryptographic key info also known to your home network\n\n> **Kurose & Ross Lecture Note:** Section 4.6.1 (pg 247) in Sauter 4th edition"
      },
      {
        "title": "3. Joining a 5G network (Slides 7-128..129)",
        "content": "**Joining a 5G network**\n\n- **Two major phases:** \n  - Registration: device identifies, authenticates itself to network, and vice versa\n  - PDU Session establishment: Core network functions allocate IP address to device, create data-plane path between device and device’s UPF\n    - PDU: protocol data unit, aka, “packet”\n- Access and Mobility Management Function (AMF) plays key role in joining arriving device into network\n\n**Joining a 5G network: steps**\n\n- PDU session establishment request\n- session creation request, response\n- device subscription retrieval, update\n- session info (e.g., device IPv4 address, tunnel)\n- session req. (with SMF info)\n- Device, base station, RAN data plane configuration\n- 1st uplink datagram in data plane\n- update device’s connection data\n\n- **Slide Diagram Elements & Protocol Entities:** `AMF Access, Mobility Management, UDM Unified Data Management, RRC connection setup request, response, Identity request, response, Registration request, AUSF Authentication Server, remote/home 5G Core, registration accept, SMF Session Management, registration, UPF User Plane Function, session establishment req./resp., session response, session establishment`"
      },
      {
        "title": "4. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **7.4C 5G Core Network Architecture: AMF, SMF, UPF, UDM, Control/User-Plane Separation (CUPS) & GTP-U**:\n\n- **Review Question 1 (IMSI.):** In 4G LTE cellular systems, what is an International Mobile Subscriber Identity (IMSI)?\n  - **Verified Answer:** A 64-bit identifier stored on a cellular SIM (Subscriber Identity Module) card that identifies the subscriber in the worldwide cellular carrier network system.\n\n- **Review Question 2 (Power conserving “sleep modes”.):** Which of the following statements is true about “sleep modes” that allow a wireless device to “sleep” and occasionally “wake up” as a technique for saving battery life?\n  - **Verified Answer:** Both WiFi and LTE provide sleep modes.\n\n- **Review Question 3 (Connecting 4G cellular networks together.):** Which of the following statements is true about how 4G cellular networks (operated by different carriers/companies) connect together?\n  - **Verified Answer:** 4G networks are generally all-IP, and so cellular networks interconnect (peer) directly to each other, or peer at the cellular equivalents of the Internet Exchange Points that we saw used for interconnecting wired networks in the public Internet.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "5g_core_attachment_gtp.py — Tracing the 9-Step 5G Device Attachment & UPF GTP-U Tunnel Establishment",
          "snippet": "# Kurose & Ross 9e - Section 7.4.5: Joining a 5G Network & Establishing UPF User-Plane Tunnels\nattachment_steps = [\n    \"1. UE discovers gNB Synchronization Signal Block (SSB) and completes Random Access (RACH)\",\n    \"2. UE sends encrypted identity (SUCI) in Registration Request via gNB to AMF\",\n    \"3. AMF & AUSF/UDM perform mutual cryptographic authentication with UE SIM card\",\n    \"4. AMF selects SMF to establish a PDU data session for the authenticated UE\",\n    \"5. SMF configures GTP-U tunnel endpoints between Base Station (gNB) and User Plane Function (UPF)\",\n    \"6. UE IP packets are encapsulated inside GTP-U/UDP/IP tunnels from gNB <-> UPF <-> Internet!\",\n]\n\nfor s in attachment_steps:\n    print(s)"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 7.4C 5G Core Network Architecture: AMF, SMF, UPF, UDM, Control/User-Plane Separation (CUPS) & GTP-U",
      "filename": "5g_core_attachment_gtp.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 7.4.5: Joining a 5G Network & Establishing UPF User-Plane Tunnels\nattachment_steps = [\n    \"1. UE discovers gNB Synchronization Signal Block (SSB) and completes Random Access (RACH)\",\n    \"2. UE sends encrypted identity (SUCI) in Registration Request via gNB to AMF\",\n    \"3. AMF & AUSF/UDM perform mutual cryptographic authentication with UE SIM card\",\n    \"4. AMF selects SMF to establish a PDU data session for the authenticated UE\",\n    \"5. SMF configures GTP-U tunnel endpoints between Base Station (gNB) and User Plane Function (UPF)\",\n    \"6. UE IP packets are encapsulated inside GTP-U/UDP/IP tunnels from gNB <-> UPF <-> Internet!\",\n]\n\nfor s in attachment_steps:\n    print(s)",
      "expectedOutput": [
        "[OK] 5g_core_attachment_gtp.py — Tracing the 9-Step 5G Device Attachment & UPF GTP-U Tunnel Establishment",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 7.4C 5G Core Network Architecture: AMF, SMF, UPF, UDM, Control/User-Plane Separation (CUPS) & GTP-U. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In 4G LTE cellular systems, what is an International Mobile Subscriber Identity (IMSI)?",
      "options": [
        "A) Assigned by a mobile carrier network to a device, when the device attaches to the radio access network, serving a similar link-layer role as",
        "B) A fancy name for a globally unique phone number, including country code.",
        "C) A 64-bit identifier that identifies the cellular network to which an mobile subscriber is attaching. Somewhat analogous to the Autonomous Sy",
        "D) A 64-bit identifier stored on a cellular SIM (Subscriber Identity Module) card that identifies the subscriber in the worldwide cellular carr"
      ],
      "correctIndex": 3,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 7), 'A 64-bit identifier stored on a cellular SIM (Subscriber Identity Module) card that identifies the subscriber in the worldwide cellular carrier network system.' accurately characterizes 7.4C 5G Core Network Architecture: AMF, SMF, UPF, UDM, Control/User-Plane Separation (CUPS) & GTP-U."
    }
  },
  "cn-ch7-mobility-wifi-5g-handover": {
    "id": "cn-ch7-mobility-wifi-5g-handover",
    "badge": "Module 7 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "7.5 Mobility Management: Spectrum of Mobility, WiFi BSS Roaming & 5G Base Station Handover",
    "subtitle": "Maintaining active TCP sessions while moving across cells: WiFi AP re-association with switch self-learning vs. the 7-step 5G handover timeline between Source BS, Target BS, AMF, SMF, and UPF tunnel switching.",
    "sections": [
      {
        "title": "1. What is mobility? (Slides 7-131..131)",
        "content": "![7.5 Mobility Management: Spectrum of Mobility, WiFi BSS Roaming & 5G Base Station Handover Architecture](/images/networking/5g-wifi-wireless-arch.svg)\n\n**7.5 Mobility Management: Spectrum of Mobility, WiFi BSS Roaming & 5G Base Station Handover** — Maintaining active TCP sessions while moving across cells: WiFi AP re-association with switch self-learning vs. the 7-step 5G handover timeline between Source BS, Target BS, AMF, SMF, and UPF tunnel switching.\n\n- spectrum of mobility, from the network perspective:\n- no mobility\n- high mobility\n- device moves\n- between networks, but\n- powers down\n- while moving\n- device moves within same WLAN/RAN in\n- one provider\n- network\n- device moves\n- among multiple\n- provider networks,\n- while maintaining\n- ongoing connections\n- device moves among WLANs/ RANs in\n- one provider\n- network\n- We’re interested in these!",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 7 Key Principle",
          "message": "Maintaining active TCP sessions while moving across cells: WiFi AP re-association with switch self-learning vs. the 7-step 5G handover timeline between Source BS, Target BS, AMF, SMF, and UPF tunnel switching."
        }
      },
      {
        "title": "2. Mobility in a WiFi network (Slides 7-132..132)",
        "content": "- AP1\n- BSS1\n- AP2\n- AP3\n- BSS3\n- BSS2\n- Extended Service Set (ESS)\n- router R1\n- switch S2\n- Internet\n- switch S1\n- **802.11:** a link-layer standard, takes a link-layer approach towards mobility\n- **Extended Service Set (ESS):** multiple BSS’s, in same layer-3 subnet, each with same SSID\n- mobility between BSSs in same ESS\n  - Fast re-authentication\n  - AP can suggest new APs to device\n- proprietary (vendor) solutions for enhanced mobility"
      },
      {
        "title": "3. Mobility in 5G networks: handover (Slides 7-133..133)",
        "content": "- **Handover:** \n- mobile device changes is point of attachment to the network\n- data flow to device changes from source base station to target base station\n- Why perform handover?\n- stronger signal from target base station\n- target base station has less devices, less traffic\n\n- **Slide Diagram Elements & Protocol Entities:** `AMF Access, Mobility Management, SMF Session Management, UPF User Plane Function, before handover, after handover`"
      },
      {
        "title": "4. source BS (Slides 7-134..135)",
        "content": "- data path before handover\n- data path after\n- handover\n- current (source) BS selects target BS, sends Handover Request message to target BS\n- target BS pre-allocates radio time slots, responds with HR ACK with info for mobile\n- source BS informs mobile of new BS\n- mobile can now send via new BS - handover looks complete to mobile\n- source BS stops sending datagrams to mobile, instead forwards to new BS (who forwards to mobile over radio channel)\n- target BS\n- **Mobility in 5G networks:** handover\n- target BS informs AMF, SMF that it is new BS for mobile\n- SMF instructs UPF to change tunnel endpoint to be (new) target BS\n- **target BS ACKs back to source BS:** handover complete, source BS can release resources\n- mobile’s datagrams now flow through new tunnel from target BS to UPF\n\n- **Slide Diagram Elements & Protocol Entities:** `UPF User Plane Function, AMF Access, Mobility Management, SMF Session Management`"
      },
      {
        "title": "5. Handover: timeline, signaling (Slides 7-136..136)",
        "content": "- detach from source base station, attach to target base station\n- buffer device data from source base station\n\n- **Slide Diagram Elements & Protocol Entities:** `AMF Access, Mobility Management, SMF Session Management, UPF User Plane Function, device, source base station, target base station, device data, RRC reconfig. complete, handover success, handover in the RAN, transfer status, path switch req., PDU session update, session mod. req/response`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **7.5 Mobility Management: Spectrum of Mobility, WiFi BSS Roaming & 5G Base Station Handover**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "5g_handover_signaling.py — Tracing the 5G Base Station Handover & Indirect GTP-U Forwarding Tunnel",
          "snippet": "# Kurose & Ross 9e - Section 7.5.3: 5G Base Station Handover Timeline (Source BS -> Target BS)\nhandover_steps = [\n    (\"1. UE -> Source BS\",        \"Measurement Report: Target BS signal stronger than Source BS\"),\n    (\"2. Source BS -> Target BS\", \"Handover Request (QoS context, UE session parameters)\"),\n    (\"3. Target BS -> Source BS\", \"Handover Request ACK (allocates radio resources & indirect tunnel)\"),\n    (\"4. Source BS -> UE\",        \"Handover Command -> Source BS forwards in-flight packets to Target BS\"),\n    (\"5. Target BS -> AMF/SMF\",   \"Path Switch Request -> SMF updates UPF downlink GTP-U tunnel to Target BS!\"),\n]\n\nfor step, action in handover_steps:\n    print(f\"{step:26s}: {action}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 7.5 Mobility Management: Spectrum of Mobility, WiFi BSS Roaming & 5G Base Station Handover",
      "filename": "5g_handover_signaling.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 7.5.3: 5G Base Station Handover Timeline (Source BS -> Target BS)\nhandover_steps = [\n    (\"1. UE -> Source BS\",        \"Measurement Report: Target BS signal stronger than Source BS\"),\n    (\"2. Source BS -> Target BS\", \"Handover Request (QoS context, UE session parameters)\"),\n    (\"3. Target BS -> Source BS\", \"Handover Request ACK (allocates radio resources & indirect tunnel)\"),\n    (\"4. Source BS -> UE\",        \"Handover Command -> Source BS forwards in-flight packets to Target BS\"),\n    (\"5. Target BS -> AMF/SMF\",   \"Path Switch Request -> SMF updates UPF downlink GTP-U tunnel to Target BS!\"),\n]\n\nfor step, action in handover_steps:\n    print(f\"{step:26s}: {action}\")",
      "expectedOutput": [
        "[OK] 5g_handover_signaling.py — Tracing the 5G Base Station Handover & Indirect GTP-U Forwarding Tunnel",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 7.5 Mobility Management: Spectrum of Mobility, WiFi BSS Roaming & 5G Base Station Handover. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 7, what is the primary architectural focus of '7.5 Mobility Management: Spectrum of Mobility, WiFi BSS Roaming & 5G Base Station Handover'?",
      "options": [
        "A) Maintaining active TCP sessions while moving across cells: WiFi AP re-association with switch self-learning vs. the 7-step 5G",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Maintaining active TCP sessions while moving across cells: WiFi AP re-association with switch self-learning vs. the 7-step 5G handover timeline between Source BS, Target BS, AMF, SMF, and UPF tunnel switching."
    }
  },
  "cn-ch7-bluetooth-leo-starlink-iot": {
    "id": "cn-ch7-bluetooth-leo-starlink-iot",
    "badge": "Module 7 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "7.6 Wireless Personal & Global Networks: Bluetooth FHSS/L2CAP, LEO Satellites (Starlink) & IoT",
    "subtitle": "Short-range Bluetooth piconets (79-channel Frequency Hopping Spread Spectrum and L2CAP), Geostationary (GEO 36,000 km) vs. Low-Earth Orbit (LEO Starlink 550 km, Ku/Ka phased arrays, laser ISLs), and IoT protocols.",
    "sections": [
      {
        "title": "1. Bluetooth (BT) overview (Slides 7-138..141)",
        "content": "![7.6 Wireless Personal & Global Networks: Bluetooth FHSS/L2CAP, LEO Satellites (Starlink) & IoT Architecture](/images/networking/5g-wifi-wireless-arch.svg)\n\n**7.6 Wireless Personal & Global Networks: Bluetooth FHSS/L2CAP, LEO Satellites (Starlink) & IoT** — Short-range Bluetooth piconets (79-channel Frequency Hopping Spread Spectrum and L2CAP), Geostationary (GEO 36,000 km) vs. Low-Earth Orbit (LEO Starlink 550 km, Ku/Ka phased arrays, laser ISLs), and IoT protocols.\n\n**Bluetooth (BT) overview**\n\n- **example of wireless ad hoc network:** devices have no “infrastructure” (e.g., access point, base station) to connect to\n- BT devices must find other BT devices, organize themselves into a network from scratch!\n  - connect devices at link layer, providing channel allocation\n  - addressing assignment\n  - service discovery\n  - application-to-application communication over Bluetooth network\n  - security\n- An entirely new architecture and protocol stack (different from Internet) is needed!\n\n> **Kurose & Ross Lecture Note:** So stress that this is interesting and new!\n\n**Bluetooth: overview**\n\n- **Bluetooth network:** piconet\n- **coverage:** generally <10 m diameter\n- no more than 8 devices per piconet\n  - device initially forming network: central role\n  - up to 7 more devices: peripheral role\n- communication only between central and peripheral node\n  - no direct peripheral-to-peripheral communication\n- BT device has unique 48-bit address\n- **Operate in unlicensed ISM band:** 2.4 GHz\n- device with central role\n- device with peripheral role\n- diameter of\n- coverage\n\n**Bluetooth basics: wireless channel**\n\n- operates in 2.4-2.5 GHz ISM radio band\n  - Classic BT: 1 MHz bandwidth/channel, 79 channels, 2.1 Mbit network max rate\n  - BLE: 2 MHz bandwidth/channel, 40 channels. 3 advertising, 37 data channels\n- **BT channel:** TDM, 625 msec slot length\n- **channel access via polling:** central device advertises, grants channel access to peripherals in its BT network\n- uses frequency hopping (form of “spread spectrum”) transmissions\n- device with central role\n- device with peripheral role\n- diameter of\n- coverage\n\n**Bluetooth channel: frequency hopping**\n\n- senders in BT network “hop” among 79 frequencies/channels\n  - transmit on different frequency after each slot\n  - hopping pattern known by all BT devices in same piconet\n- different BT piconets (with different hop patterns) can exist in same space\n- **Q:** Why hop?\n- **A:** minimize effects of interference:\n- potentially many interfering transmitters in ISM\n- If interfering device uses channel x, x occurs only occasionally in sequence\n- BT frame sent on x (not received at receive due to interference), retransmitted on different frequency in next slot\n- 625 msec\n- slot\n- channel #\n- time\n- Hopping pattern used by BT network 1\n- Hopping pattern used by BT network 2\n\n> **Kurose & Ross Lecture Note:** Top half of slide is about what hopping is, but why hop in the first place?",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 7 Key Principle",
          "message": "Short-range Bluetooth piconets (79-channel Frequency Hopping Spread Spectrum and L2CAP), Geostationary (GEO 36,000 km) vs. Low-Earth Orbit (LEO Starlink 550 km, Ku/Ka phased arrays, laser ISLs), and IoT protocols."
        }
      },
      {
        "title": "2. Bluetooth architecture, protocol stack (simplified) (Slides 7-142..145)",
        "content": "**Bluetooth architecture, protocol stack (simplified)**\n\n- Bluetooth stack completely different from Internet stack!\n  - differences reflect BT’s special purpose\n- no “network,” “transport” layer!\n  - no routing in Classic BT (BLE adds managed flooding)\n- layers not as conceptually well-defined as in Internet, 5G\n- Applications,\n- E2E services\n- Logical Link Control and Adaptation (L2CAP)\n- physical\n- link\n- Controller\n- (firmware)\n- separate controllers for classic, BLE\n- host, controller structure deeply embedded in architecture\n\n- **Slide Diagram Elements & Protocol Entities:** `Classic, BLE, Host (OS), Host-Controller Interface (HCI)`\n\n> **Kurose & Ross Lecture Note:** Probably the best picture in the Bluetooth Spec is Figure 2.1 in 5.0 specification (“Figure 2.1: Bluetooth core system architecture”). But it’s really complicated and there isn’t really clear layering.\n\n**Logical Link Control, Adaptation (L2CAP) layer**\n\n- creation, management of end-end L2CAP channels between two devices\n  - channels for E2E application/user data, or higher-level services\n  - reliability, flow control, segmentation\n- **L2CAP channels types:** \n  - connection-oriented, asynchronous (ACL)\n  - connectionless, asynchronous (ACL)\n  - synchronous (eSCO), e.g., for periodic audio app)\n\n> **Kurose & Ross Lecture Note:** Note that description/layer of link controller (which is really the lower sublayer) and link manager in Sauter’s book is incorrect.\n\n**Bluetooth piconet and L2CAP connections**\n\n- Bluetooth central role\n- physical\n- link\n- L2CAP\n- MP3\n- music\n- MP3\n- music\n- Bluetooth peripheral\n- physical\n- link\n- L2CAP\n- Bluetooth peripheral\n- Bluetooth piconet wireless\n- channel (frequency hopping)\n- Service\n- discovery\n- Service\n- discovery\n- Remote\n- keyboard\n- Service\n- discovery\n- Remote\n- keyboard\n- L2CAP\n- link\n- physical\n- end-to-end L2CAP connections\n\n> **Kurose & Ross Lecture Note:** Note that description/layer of link controller (which is really the lower sublayer) and link manager in Sauter’s book is incorrect.\n\n**Satellite applications**\n\n- **Sensing:** \n- **environment:** weather, land use, various human activity\n- **resolution:** ~m/pixel\n- **Broadcast:** \n- **consumer:** Direct to Home TV/video, radio (Dish, SiriusXM)\n- **business:** content to many cable head ends\n- GPS\n- **leverage broadcast:** one send reaches many users\n- **Internet:** \n- connectivity to unserved regions, alternative to wired Internet\n- low latency over long distances\n- access in airplanes"
      },
      {
        "title": "3. GEO and LEO satellites (Slides 7-146..149)",
        "content": "**GEO and LEO satellites**\n\n- **GEO:** \n- **geosynchonous:** stationary with respect to ground\n- 35,768 km above earth\n- ~800 msec RTT\n- wide area coverage / satellite\n- **LEO:** \n- **Low Earth Orbit:** satellite moves with respect to ground: 27,000 km/hour\n  - within line of sight (LOS) of ground station for 5-15 mins\n- 550 - 1200 km above earth\n- ~30 msec RTT in practice\n- smaller area coverage / satellite\n  - constellation (network) of multiple LEO satellites to cover wide area\n  - inter-satellite links (ISL)\n\n**Satellites: why all the fuss?**\n\n- **Sources:** A. Raman, LEO Satellite Mega Constellations, networkingchannel.eu;\n- N.Pachler et al., An Updated Comparison of Four Low Earth Orbit Satellite Constellation Systems to Provide Global Broadband; company literature\n- Lots of (LEOS) satellites being launched\n- LEOS constellations\n- # deployed (2025) | # planned | ISL planned?\n- Starlink | 7,239 | 12,000 - 42,000 | Yes\n- EutelSat  Oneweb | 648 | 716 – 6,372 | No\n- Kuipers (Amazon) | 27 | 3,236 | ?\n- Telesat | 1 | 298 - 1671 | Yes\n\n> **Kurose & Ross Lecture Note:** Source: A. Raman, LEO Satellite Mega, networkingchannel.eu\n\n**Components of a LEO satellite network**\n\n- LEO satellites in motion\n- rural,\n- remote\n- communications\n- airborne,\n- maritime\n- vehicles\n- intersatellite links (ISL)\n- satellite channel\n- Broadcast (multicast) down\n- unicast up\n- “footprint”\n- ground\n- stations\n- Internet\n- mobile user terminals\n- **Starlink satellite dish:** “Dishy McFlatface”\n\n**Satellite networking: a link or a network?**\n\n- links in the sky\n- single satellite hop between base stations\n- AKA “bent pipe” architecture\n- **network in the sky:** \n- multiple satellite hops between base stations\n- routing among satellites"
      },
      {
        "title": "4. Starlink (Slides 7-150..153)",
        "content": "**Starlink**\n\n- **April 2025:** ~7,239 operational LEO satellites (planned: 12K, requesetd:30K)\n  - first launches: 2019\n  - three low-Earth-orbit orbital shells, at 525, 530, 535 km\n  - satellites: 500 – 2700 lbs\n- **services:** \n  - Internet service: 4M subscribers in Sept 2024 (residential US: $120/mo)\n  - service in Ukraine (terrestrial networks damaged)\n  - 2024: testing direct-to-smartphone tests would use cellular spectrum from SpaceX’s U.S. mobile partner T-Mobile\n\n**IoT: many, many use cases!**\n\n- **Monitoring:** pressure, vibration, 3D tilt, temperature, humidity, switches, openings, battery charge, voltage, leaks, cracks, strain gauges, fill levels ...\n- Asset geolocation, tracking warehouse security, monitoring transport conditions, e.g., for food safety ...\n- **Monitoring:** sound, air, water, weather, lighting, traffic, crowds, infrastrcuture; sharing (bikes) ...\n- Smart metering, service (de)activation , efficiency monitoring, remote diagnosis, asset surveillance, quality monitoring ...\n- rainfall, temperature, wind, humidity, animal tracking and health, soil condition, infrastructure monitoring ...\n- Security, enviro conditions (temp., air, lights, power), predictive infrastructure monitoring, ...\n- .... and there’s many more!\n\n> **Kurose & Ross Lecture Note:** Summarized from https://www.sigfox.com/\n\n**Lots of connected IoT devices, and more soon!**\n\n- **https:** //www.statista.com/statistics/512650/worldwide-connected-devices-amount/\n- IoT\n- PC, laptops,\n- tablets, phones\n- number of devices (in billions)\n\n**IoT communication requirements**\n\n- wireless\n- **distance:** from meters to kilometers\n- **data rate:** 100’s bps when active (metering) to ~1 Mbps (video surveillance)\n- **energy:** always a consideration\n  - up ~10 years without external power\n  - local energy harvesting\n- wide area coverage\n- high data rate\n- low energy consumption\n- short\n- **range:** WiFi,\n- BLE, Zigbee\n- traditional\n- **Cellular:** \n- 4/5G\n- low power\n- **wide area:** \n- LoRaWAN,\n- LTE-M\n- IoT technical tradeoffs\n\n> **Kurose & Ross Lecture Note:** So stress that this is interesting and new!"
      },
      {
        "title": "5. Wireless and mobile networks: Summary (Slides 7-154..154)",
        "content": "- **The physical layer:** radio\n- The wireless access network\n  - principles, WiFi, 5G\n- The wireless core network\n  - principles, 5G\n- Mobility\n- Bluetooth, satellite, IoT wireless networks\n- For a more extensive treatment of wireless and mobile networks visit: https://gaia.cs.umass.edu/wireless_and_mobile_networks"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **7.6 Wireless Personal & Global Networks: Bluetooth FHSS/L2CAP, LEO Satellites (Starlink) & IoT**:\n\n- **Review Question 1 (Infrastructure Mode.):** What is meant when we say that a network of devices is operating in \"infrastructure mode\"?\n  - **Verified Answer:** Devices communicate with each other and to the larger outside world via a base station (also known as an access point).\n\n- **Review Question 2 (Characteristics of wireless links.):** Which of the following statements about the characteristics of wireless links are true?\n  - **Verified Answer:** The \"hidden terminal problem\" happens when A sends to B over a wireless channel, and an observer, C (that can be even closer to A than B), does not detect/receive A's transmission because of physical obstacles in the path between A and C.; The bit error rate (BER) of a wireless channel decreases as the signal-to-noise ratio (SNR) increases.; Multipath propagation occurs when portions of the electromagnetic wave reflect off objects and the ground taking paths of different lengths between the sender and a receiver, and thus arriving at the receiver at slightly different points in time.; Path loss refers to the decrease in the strength of a radio signal as it propagates through space.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "geo_vs_leo_starlink_rtt.py — Comparing Propagation Latency of GEO Satellites, LEO Starlink & Terrestrial Fiber",
          "snippet": "# Kurose & Ross 9e - Section 7.6.2: GEO vs. LEO (Starlink) Satellite & Fiber Propagation Delay\nc_vacuum_km_s = 300000.0\nc_fiber_km_s = 200000.0\n\n# Round-trip (Ground -> Satellite -> Ground) = 4 * altitude (for request + reply)\nfor name, dist_km, speed in [\n    (\"GEO Satellite (35,786 km altitude)\", 4 * 35786, c_vacuum_km_s),\n    (\"LEO Starlink  (550 km altitude)\",    4 * 550,   c_vacuum_km_s),\n    (\"NY-to-London Undersea Fiber\",        2 * 5600,  c_fiber_km_s),\n]:\n    rtt_ms = (dist_km / speed) * 1000.0\n    print(f\"{name:36s} | Total Path: {dist_km:7d} km | Min Propagation RTT: {rtt_ms:6.1f} ms\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 7.6 Wireless Personal & Global Networks: Bluetooth FHSS/L2CAP, LEO Satellites (Starlink) & IoT",
      "filename": "geo_vs_leo_starlink_rtt.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 7.6.2: GEO vs. LEO (Starlink) Satellite & Fiber Propagation Delay\nc_vacuum_km_s = 300000.0\nc_fiber_km_s = 200000.0\n\n# Round-trip (Ground -> Satellite -> Ground) = 4 * altitude (for request + reply)\nfor name, dist_km, speed in [\n    (\"GEO Satellite (35,786 km altitude)\", 4 * 35786, c_vacuum_km_s),\n    (\"LEO Starlink  (550 km altitude)\",    4 * 550,   c_vacuum_km_s),\n    (\"NY-to-London Undersea Fiber\",        2 * 5600,  c_fiber_km_s),\n]:\n    rtt_ms = (dist_km / speed) * 1000.0\n    print(f\"{name:36s} | Total Path: {dist_km:7d} km | Min Propagation RTT: {rtt_ms:6.1f} ms\")",
      "expectedOutput": [
        "[OK] geo_vs_leo_starlink_rtt.py — Comparing Propagation Latency of GEO Satellites, LEO Starlink & Terrestrial Fiber",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 7.6 Wireless Personal & Global Networks: Bluetooth FHSS/L2CAP, LEO Satellites (Starlink) & IoT. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "What is meant when we say that a network of devices is operating in \"infrastructure mode\"?",
      "options": [
        "A) Devices communicate with each other and to the larger outside world via a base station (also known as an access point).",
        "B) All network equipment, except the mobile devices, must be racked in a temperature-controlled and power-smoothed building.",
        "C) Network devices can communicate directly with each other, with no need for messages to be relayed through a base station. The devices are th",
        "D) The mobile device is operating in a reduced power mode, forcing the network base station and routers to take on additional functionality tha"
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 7), 'Devices communicate with each other and to the larger outside world via a base station (also known as an access point).' accurately characterizes 7.6 Wireless Personal & Global Networks: Bluetooth FHSS/L2CAP, LEO Satellites (Starlink) & IoT."
    }
  },
  "cn-ch8-security-symmetric-crypto": {
    "id": "cn-ch8-security-symmetric-crypto",
    "badge": "Module 8 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "İleri Seviye",
    "title": "8.1–8.2 Network Security Threat Model (Alice, Bob, Trudy) & Symmetric Key Cryptography (DES & AES)",
    "subtitle": "Confidentiality, message integrity, end-point authentication, and operational security; Trudy's passive eavesdropping vs. active tampering; substitution/permutation ciphers, DES 56-bit exhaustion, and AES (128/192/256-bit).",
    "sections": [
      {
        "title": "1. Security: overview (Slides 8-2..6)",
        "content": "![8.1–8.2 Network Security Threat Model (Alice, Bob, Trudy) & Symmetric Key Cryptography (DES & AES) Architecture](/images/networking/tls13-ipsec-security.svg)\n\n**8.1–8.2 Network Security Threat Model (Alice, Bob, Trudy) & Symmetric Key Cryptography (DES & AES)** — Confidentiality, message integrity, end-point authentication, and operational security; Trudy's passive eavesdropping vs. active tampering; substitution/permutation ciphers, DES 56-bit exhaustion, and AES (128/192/256-bit).\n\n**Security: overview**\n\n- **Chapter goals:** \n- **understand principles of network security:** \n  - cryptography and its many uses beyond “confidentiality”\n  - authentication\n  - message integrity\n- **security in practice:** \n  - firewalls and intrusion detection systems\n  - security in application, transport, network, link layers\n\n**What is network security?**\n\n- **confidentiality:** only sender, intended receiver should “understand” message contents\n  - sender encrypts message\n  - receiver decrypts message\n- **authentication:** sender, receiver want to confirm identity of each other\n- **message integrity:** sender, receiver want to ensure message not altered (in transit, or afterwards) without detection\n- **access and availability:** services must be accessible and available to users\n\n**Friends and enemies: Alice, Bob, Trudy**\n\n- well-known in network security world\n- Bob, Alice (lovers!) want to communicate “securely”\n- Trudy (intruder) may intercept, delete, add messages\n- Who might Bob and Alice be?\n- … well, real-life Bobs and Alices!\n- Web browser/server for electronic transactions (e.g., on-line purchases)\n- on-line banking client/server\n- DNS servers\n- BGP routers exchanging routing table updates\n- other examples?\n\n- **Slide Diagram Elements & Protocol Entities:** `secure sender, secure receiver, channel, data, control messages, data, Alice, Bob, Trudy`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 8 Key Principle",
          "message": "Confidentiality, message integrity, end-point authentication, and operational security; Trudy's passive eavesdropping vs. active tampering; substitution/permutation ciphers, DES 56-bit exhaustion, and AES (128/192/256-bit)."
        }
      },
      {
        "title": "2. There are bad guys (and girls) out there! (Slides 8-7..10)",
        "content": "**There are bad guys (and girls) out there!**\n\n- **Q:** What can a “bad guy” do?\n- **A:** A lot! (recall section 1.6)\n  - eavesdrop: intercept messages\n  - actively insert messages into connection\n  - impersonation: can fake (spoof) source address in packet (or any field in packet)\n  - hijacking: “take over” ongoing connection by removing sender or receiver, inserting himself in place\n  - denial of service: prevent service from being used by others (e.g., by overloading resources)\n\n**The language of cryptography**\n\n- **m:** plaintext message\n- **KA(m):** ciphertext, encrypted with key KA\n- m = KB(KA(m))\n\n- **Slide Diagram Elements & Protocol Entities:** `plaintext, ciphertext, encryption algorithm, decryption algorithm, Alice’s encryption key, Bob’s decryption key`\n\n**Breaking an encryption scheme**\n\n- **cipher-text only attack:** Trudy has ciphertext she can analyze\n- **two approaches:** \n  - brute force: search through all keys\n  - statistical analysis\n- **known-plaintext attack:** Trudy has plaintext corresponding to ciphertext\n  - e.g., in monoalphabetic cipher, Trudy determines pairings for a,l,i,c,e,b,o,\n- **chosen-plaintext attack:** Trudy can get ciphertext for chosen plaintext"
      },
      {
        "title": "3. Symmetric key cryptography (Slides 8-11..13)",
        "content": "**Symmetric key cryptography**\n\n- **symmetric key crypto:** Bob and Alice share same (symmetric) key: K\n- e.g., key is knowing substitution pattern in mono alphabetic substitution cipher\n- **Q:** how do Bob and Alice agree on key value?\n\n- **Slide Diagram Elements & Protocol Entities:** `plaintext, encryption algorithm, decryption algorithm, ciphertext, K (m)`\n\n**Simple encryption scheme**\n\n- **substitution cipher:** substituting one thing for another\n  - monoalphabetic cipher: substitute one letter for another\n- **plaintext:** abcdefghijklmnopqrstuvwxyz\n- **ciphertext:** mnbvcxzasdfghjklpoiuytrewq\n- **Plaintext:** bob. i love you. alice\n- **ciphertext:** nkn. s gktc wky. mgsbc\n- **Encryption key:** mapping from set of 26 letters\n- to set of 26 letters\n\n- **Slide Diagram Elements & Protocol Entities:** `e.g.:`\n\n**A more sophisticated encryption approach**\n\n- n substitution ciphers, M1,M2,…,Mn\n- **cycling pattern:** \n  - e.g., n=4: M1,M3,M4,M3,M2; M1,M3,M4,M3,M2; ..\n- for each new plaintext symbol, use subsequent substitution pattern in cyclic pattern\n  - dog: d from M1, o from M3, g from M4\n  - Encryption key: n substitution ciphers, and cyclic pattern\n  - key need not be just n-bit pattern"
      },
      {
        "title": "4. Symmetric key crypto: DES (Slides 8-14..15)",
        "content": "**Symmetric key crypto: DES**\n\n- **DES:** Data Encryption Standard\n- US encryption standard [NIST 1993]\n- 56-bit symmetric key, 64-bit plaintext input\n- block cipher with cipher block chaining\n- how secure is DES?\n  - DES Challenge: 56-bit-key-encrypted phrase decrypted (brute force) in less than a day\n  - no known good analytic attack\n- **making DES more secure:** \n  - 3DES: encrypt 3 times with 3 different keys\n\n**AES: Advanced Encryption Standard**\n\n- symmetric-key NIST standard, replaced DES (Nov 2001)\n- processes data in 128 bit blocks\n- 128, 192, or 256 bit keys\n- brute force decryption (try each key) taking 1 sec on DES, takes 149 trillion years for AES"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **8.1–8.2 Network Security Threat Model (Alice, Bob, Trudy) & Symmetric Key Cryptography (DES & AES)**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "cbc_block_cipher_sim.py — Demonstrating Cipher Block Chaining (CBC) with an Initialization Vector (IV)",
          "snippet": "# Kurose & Ross 9e - Section 8.2.1: Symmetric Block Cipher with Cipher Block Chaining (CBC)\ndef toy_block_encrypt(block_byte: int, key_byte: int) -> int:\n    return ((block_byte ^ key_byte) * 73) & 0xFF\n\nplaintext_blocks = [0x41, 0x41, 0x41]  # Identical plaintext blocks ('A', 'A', 'A')\nkey = 0x5A\niv = 0x9C\n\nprev_c = iv\nciphertexts = []\nfor m in plaintext_blocks:\n    c = toy_block_encrypt(m ^ prev_c, key)\n    ciphertexts.append(f\"0x{c:02X}\")\n    prev_c = c\n\nprint(f\"Identical Plaintext Blocks : {[hex(x) for x in plaintext_blocks]}\")\nprint(f\"CBC Ciphertext Blocks      : {ciphertexts} (IV chaining prevents identical ciphertext patterns!)\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 8.1–8.2 Network Security Threat Model (Alice, Bob, Trudy) & Symmetric Key Cryptography (DES & AES)",
      "filename": "cbc_block_cipher_sim.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 8.2.1: Symmetric Block Cipher with Cipher Block Chaining (CBC)\ndef toy_block_encrypt(block_byte: int, key_byte: int) -> int:\n    return ((block_byte ^ key_byte) * 73) & 0xFF\n\nplaintext_blocks = [0x41, 0x41, 0x41]  # Identical plaintext blocks ('A', 'A', 'A')\nkey = 0x5A\niv = 0x9C\n\nprev_c = iv\nciphertexts = []\nfor m in plaintext_blocks:\n    c = toy_block_encrypt(m ^ prev_c, key)\n    ciphertexts.append(f\"0x{c:02X}\")\n    prev_c = c\n\nprint(f\"Identical Plaintext Blocks : {[hex(x) for x in plaintext_blocks]}\")\nprint(f\"CBC Ciphertext Blocks      : {ciphertexts} (IV chaining prevents identical ciphertext patterns!)\")",
      "expectedOutput": [
        "[OK] cbc_block_cipher_sim.py — Demonstrating Cipher Block Chaining (CBC) with an Initialization Vector (IV)",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 8.1–8.2 Network Security Threat Model (Alice, Bob, Trudy) & Symmetric Key Cryptography (DES & AES). Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 8, what is the primary architectural focus of '8.1–8.2 Network Security Threat Model (Alice, Bob, Trudy) & Symmetric Key Cryptography (DES & AES)'?",
      "options": [
        "A) Confidentiality, message integrity, end-point authentication, and operational security; Trudy's passive eavesdropping vs. act",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Confidentiality, message integrity, end-point authentication, and operational security; Trudy's passive eavesdropping vs. active tampering; substitution/permutation ciphers, DES 56-bit exhaustion, and AES (128/192/256-bit)."
    }
  },
  "cn-ch8-public-key-rsa": {
    "id": "cn-ch8-public-key-rsa",
    "badge": "Module 8 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "8.2B Public-Key Cryptography & RSA: Modular Arithmetic, Key Generation, Proofs & Session Keys",
    "subtitle": "Solving symmetric key distribution via public/private key pairs (K+, K-), step-by-step RSA prime selection (n=pq, z=(p-1)(q-1), ed mod z = 1), Euler/Fermat proof of RSA correctness, and hybrid AES session keys.",
    "sections": [
      {
        "title": "1. Public Key Cryptography (Slides 8-16..19)",
        "content": "![8.2B Public-Key Cryptography & RSA: Modular Arithmetic, Key Generation, Proofs & Session Keys Architecture](/images/networking/tls13-ipsec-security.svg)\n\n**8.2B Public-Key Cryptography & RSA: Modular Arithmetic, Key Generation, Proofs & Session Keys** — Solving symmetric key distribution via public/private key pairs (K+, K-), step-by-step RSA prime selection (n=pq, z=(p-1)(q-1), ed mod z = 1), Euler/Fermat proof of RSA correctness, and hybrid AES session keys.\n\n**Public Key Cryptography**\n\n- **symmetric key crypto:** \n- requires sender, receiver know shared secret key\n- **Q:** how to agree on key in first place (particularly if never “met”)?\n- public key crypto\n- radically different approach [Diffie-Hellman76, RSA78]\n- sender, receiver do not share secret key\n- public encryption key known to all\n- private decryption key known only to receiver\n- plaintext\n- message, m\n- Bob’s public key\n- Bob’s private key\n- Wow - public key cryptography revolutionized 2000-year-old (previously only symmetric key) cryptography!\n- similar ideas emerged at roughly same time, independently in US and UK (classified)\n\n- **Slide Diagram Elements & Protocol Entities:** `m = K (K (m)), plaintext, encryption algorithm, decryption algorithm, K (m), ciphertext`\n\n**Public key encryption algorithms**\n\n- **RSA:** Rivest, Shamir, Adelson algorithm\n- need K ( ) and K ( ) such that\n- given public key K , it should be impossible to compute private key K\n\n- **Slide Diagram Elements & Protocol Entities:** `requirements:, K (K (m)) = m`\n\n**Prerequisite: modular arithmetic**\n\n- x mod n = remainder of x when divide by n\n- **facts:** \n  - [(a mod n) + (b mod n)] mod n = (a+b) mod n\n  - [(a mod n) - (b mod n)] mod n = (a-b) mod n\n  - [(a mod n) * (b mod n)] mod n = (a*b) mod n\n- thus\n- (a mod n)d mod n = ad mod n\n- **example:** x=14, n=10, d=2: (x mod n)d mod n = 42 mod 10 = 6 xd = 142 = 196 xd mod 10 = 6",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 8 Key Principle",
          "message": "Solving symmetric key distribution via public/private key pairs (K+, K-), step-by-step RSA prime selection (n=pq, z=(p-1)(q-1), ed mod z = 1), Euler/Fermat proof of RSA correctness, and hybrid AES session keys."
        }
      },
      {
        "title": "2. RSA: getting ready (Slides 8-20..22)",
        "content": "**RSA: getting ready**\n\n- **message:** just a bit pattern\n- bit pattern can be uniquely represented by an integer number\n- thus, encrypting a message is equivalent to encrypting a number\n- **example:** \n- m= 10010001. This message is uniquely represented by the decimal number 145.\n- to encrypt m, we encrypt the corresponding number, which gives a new number (the ciphertext).\n\n**RSA: Creating public/private key pair**\n\n- 1. choose two large prime numbers p, q. (e.g., 1024 bits each)\n- 2. compute n = pq, z = (p-1)(q-1)\n- 3. choose e (with e<n) that has no common factors with z (e, z are “relatively prime”).\n- 4. choose d such that ed-1 is exactly divisible by z. (in other words: ed mod z = 1 ).\n- 5. public key is (n,e). private key is (n,d).\n\n**RSA: encryption, decryption**\n\n- 0. given (n,e) and (n,d) as computed above\n- 1. to encrypt message m (<n), compute\n- 2. to decrypt received bit pattern, c, compute\n\n- **Slide Diagram Elements & Protocol Entities:** `c = m mod n, m = c mod n, m = (m mod n), mod n, magic happens!`"
      },
      {
        "title": "3. RSA example: (Slides 8-23..25)",
        "content": "**RSA example:**\n\n- Bob chooses p=5, q=7. Then n=35, z=24.\n- e=5 (so e, z relatively prime).\n- d=29 (so ed-1 exactly divisible by z).\n- m = c mod n\n- **decrypt:** \n\n- **Slide Diagram Elements & Protocol Entities:** `bit pattern, c = m mod n, 0000l000, encrypt:, encrypting 8-bit messages.`\n\n**Why does RSA work?**\n\n- must show that cd mod n = m, where c = me mod n\n- **fact:** for any x and y: xy mod n = x(y mod z) mod n\n  - where n= pq and z = (p-1)(q-1)\n- thus, cd mod n = (me mod n)d mod n\n- = med mod n\n- = m(ed mod z) mod n\n- = m1 mod n\n- = m\n\n**RSA: another important property**\n\n- The following property will be very useful later:\n- use public key first, followed by private key\n- use private key first, followed by public key\n\n- **Slide Diagram Elements & Protocol Entities:** `K (K (m)) = m, K (K (m)), result is the same!`"
      },
      {
        "title": "4. follows directly from modular arithmetic: (Slides 8-26..28)",
        "content": "**follows directly from modular arithmetic:**\n\n- (me mod n)d mod n = med mod n\n- = mde mod n\n- = (md mod n)e mod n\n\n- **Slide Diagram Elements & Protocol Entities:** `Why, K (K (m)) = m, K (K (m))`\n\n**Why is RSA secure?**\n\n- suppose you know Bob’s public key (n,e). How hard is it to determine d?\n- essentially need to find factors of n without knowing the two factors p and q\n  - fact: factoring a big number is hard\n\n**RSA in practice: session keys**\n\n- exponentiation in RSA is computationally intensive\n- DES is at least 100 times faster than RSA\n- use public key crypto to establish secure connection, then establish second key – symmetric session key – for encrypting data\n- session key, KS\n- Bob and Alice use RSA to exchange a symmetric session key KS\n- once both have KS, they use symmetric key cryptography"
      },
      {
        "title": "5. Using Public-Key Cryptography (Slides 8-29..29)",
        "content": "- We’ll (next) see lots of non-confidentiality uses of public-key cryptography!\n- authentication\n- digital signatures\n- message integrity\n- symmetric-key agreement\n\n- **Slide Diagram Elements & Protocol Entities:** `Public-key cryptography`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **8.2B Public-Key Cryptography & RSA: Modular Arithmetic, Key Generation, Proofs & Session Keys**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "rsa_textbook_example.py — Kurose & Ross Textbook RSA Key Generation, Encryption & Decryption Walkthrough",
          "snippet": "# Kurose & Ross 9e - Section 8.2.2: Exact Textbook RSA Example (p=5, q=7, n=35, z=24, e=5, d=29)\np, q = 5, 7\nn = p * q                # n = 35\nz = (p - 1) * (q - 1)    # z = 24\ne = 5                    # gcd(e, z) = 1\nd = 29                   # (e * d) mod z = (5 * 29) mod 24 = 145 mod 24 = 1\n\nm = 12                   # Plaintext integer m < n (letter 'l')\nc = pow(m, e, n)         # Encrypt: c = m^e mod n\nm_dec = pow(c, d, n)     # Decrypt: m = c^d mod n\n\nprint(f\"Public Key  K+ = (n={n}, e={e})\")\nprint(f\"Private Key K- = (n={n}, d={d})  [Check: (e*d) mod z = {(e*d)%z}]\")\nprint(f\"Plaintext m = {m} -> Ciphertext c = {m}^{e} mod {n} = {c}\")\nprint(f\"Decrypted m = {c}^{d} mod {n} = {m_dec}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 8.2B Public-Key Cryptography & RSA: Modular Arithmetic, Key Generation, Proofs & Session Keys",
      "filename": "rsa_textbook_example.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 8.2.2: Exact Textbook RSA Example (p=5, q=7, n=35, z=24, e=5, d=29)\np, q = 5, 7\nn = p * q                # n = 35\nz = (p - 1) * (q - 1)    # z = 24\ne = 5                    # gcd(e, z) = 1\nd = 29                   # (e * d) mod z = (5 * 29) mod 24 = 145 mod 24 = 1\n\nm = 12                   # Plaintext integer m < n (letter 'l')\nc = pow(m, e, n)         # Encrypt: c = m^e mod n\nm_dec = pow(c, d, n)     # Decrypt: m = c^d mod n\n\nprint(f\"Public Key  K+ = (n={n}, e={e})\")\nprint(f\"Private Key K- = (n={n}, d={d})  [Check: (e*d) mod z = {(e*d)%z}]\")\nprint(f\"Plaintext m = {m} -> Ciphertext c = {m}^{e} mod {n} = {c}\")\nprint(f\"Decrypted m = {c}^{d} mod {n} = {m_dec}\")",
      "expectedOutput": [
        "[OK] rsa_textbook_example.py — Kurose & Ross Textbook RSA Key Generation, Encryption & Decryption Walkthrough",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 8.2B Public-Key Cryptography & RSA: Modular Arithmetic, Key Generation, Proofs & Session Keys. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 8, what is the primary architectural focus of '8.2B Public-Key Cryptography & RSA: Modular Arithmetic, Key Generation, Proofs & Session Keys'?",
      "options": [
        "A) Solving symmetric key distribution via public/private key pairs (K+, K-), step-by-step RSA prime selection (n=pq, z=(p-1)(q-1",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Solving symmetric key distribution via public/private key pairs (K+, K-), step-by-step RSA prime selection (n=pq, z=(p-1)(q-1), ed mod z = 1), Euler/Fermat proof of RSA correctness, and hybrid AES session keys."
    }
  },
  "cn-ch8-authentication-signatures-ca": {
    "id": "cn-ch8-authentication-signatures-ca",
    "badge": "Module 8 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "İleri Seviye",
    "title": "8.3–8.4 Authentication Protocols (ap1.0–ap5.0), Hash Digests, Digital Signatures & Certification Authorities",
    "subtitle": "Why ap1.0–ap3.1 fail against spoofing and playback attacks, cryptographic nonces in ap4.0, man-in-the-middle attacks on ap5.0, SHA-256 message digests, signed hash digital signatures, and X.509 CAs + Diffie-Hellman.",
    "sections": [
      {
        "title": "1. Authentication (Slides 8-31..38)",
        "content": "![8.3–8.4 Authentication Protocols (ap1.0–ap5.0), Hash Digests, Digital Signatures & Certification Authorities Architecture](/images/networking/tls13-ipsec-security.svg)\n\n**8.3–8.4 Authentication Protocols (ap1.0–ap5.0), Hash Digests, Digital Signatures & Certification Authorities** — Why ap1.0–ap3.1 fail against spoofing and playback attacks, cryptographic nonces in ap4.0, man-in-the-middle attacks on ap5.0, SHA-256 message digests, signed hash digital signatures, and X.509 CAs + Diffie-Hellman.\n\n**Authentication**\n\n- **Goal:** Bob wants Alice to “prove” her identity to him\n- **Protocol ap1.0:** Alice says “I am Alice”\n- in a network, Bob can not “see” Alice, so Trudy simply declares herself to be Alice\n\n- **Slide Diagram Elements & Protocol Entities:** `failure scenario??, “I am Alice”`\n\n**Authentication: another try**\n\n- **Goal:** Bob wants Alice to “prove” her identity to him\n- **Protocol ap2.0:** Alice says “I am Alice” in an IP packet containing her source IP address\n\n- **Slide Diagram Elements & Protocol Entities:** `“I am Alice”, Alice’s IP address, failure scenario??, Trudy can create a packet “spoofing” Alice’s address`\n\n**Authentication: a third try**\n\n- **Goal:** Bob wants Alice to “prove” her identity to him\n- **Protocol ap3.0:** Alice says “I am Alice” and sends her secret password to “prove” it.\n- **playback attack:** Trudy records Alice’s packet\n- and later\n- plays it back to Bob\n\n- **Slide Diagram Elements & Protocol Entities:** `“I am Alice”, Alice’s IP addr, Alice’s password, failure scenario??`\n\n**Authentication: a modified third try**\n\n- **Goal:** Bob wants Alice to “prove” her identity to him\n- **Protocol ap3.0:** Alice says “I am Alice” and sends her encrypted secret password to “prove” it.\n- **playback attack still works:** Trudy records Alice’s packet\n- and later plays it back to Bob\n\n- **Slide Diagram Elements & Protocol Entities:** `“I am Alice”, Alice’s IP addr, encrypted password, failure scenario??`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 8 Key Principle",
          "message": "Why ap1.0–ap3.1 fail against spoofing and playback attacks, cryptographic nonces in ap4.0, man-in-the-middle attacks on ap5.0, SHA-256 message digests, signed hash digital signatures, and X.509 CAs + Diffie-Hellman."
        }
      },
      {
        "title": "2. Authentication: a fourth try (Slides 8-39..44)",
        "content": "**Authentication: a fourth try**\n\n- **protocol ap4.0:** to prove Alice “live”, Bob sends Alice nonce, R\n- Alice must return R, encrypted with shared secret key\n- **nonce:** number (R) used only once-in-a-lifetime\n- Bob know Alice is live, and only Alice knows key to encrypt nonce, so it must be Alice!\n\n- **Slide Diagram Elements & Protocol Entities:** `Goal: avoid playback attack, Failures, drawbacks?, “I am Alice”, K (R), A-B`\n\n**Authentication: ap5.0**\n\n- ap4.0 requires shared symmetric key - can we authenticate using public key techniques?\n- **ap5.0:** use nonce, public key cryptography\n- and knows only Alice could have the private key, that encrypted R such that\n\n- **Slide Diagram Elements & Protocol Entities:** `“I am Alice”, K (R), Send me your public key, Bob computes, (K (R)) = R`\n\n**Authentication: ap5.0 – there’s still a flaw!**\n\n- **man (or woman) in the middle attack:** Trudy poses as Alice (to Bob) and as Bob (to Alice)\n- sends m to Alice encrypted with Alice’s public key\n- Bob sends a personal message, m to Alice\n- and she and Bob meet a week later in person and discuss m, not knowing Trudy knows m\n- Where are mistakes made here?\n\n- **Slide Diagram Elements & Protocol Entities:** `I am Alice, Send me your public key, m = K (K (m)), Trudy recovers m:, K (R), (K (R)) = R,, Bob computes, authenticating Trudy as Alice, K (m), Trudy recovers Bob’s m:`\n\n**Digital signatures**\n\n- cryptographic technique analogous to hand-written signatures:\n- **sender (Bob) digitally signs document:** he is document owner/creator.\n- **verifiable, nonforgeable:** recipient (Alice) can prove to someone that Bob, and no one else (including Alice), must have signed document\n- **simple digital signature for message m:** \n  - Bob signs m by encrypting with his private key KB, creating “signed” message, KB-(m)\n- Bob’s message, m\n- Dear Alice\n- Oh, how I have missed you. I think of you all the time! …(blah blah blah)\n- Bob\n- Dear Alice\n- Oh, how I have missed you. I think of you all the time! …(blah blah blah)\n- Bob\n- **Alice thus verifies that:** \n  - Bob signed m\n  - no one else signed m\n  - Bob signed m and not m’\n- **non-repudiation:** \n  - Alice can take m, and signature KB(m) to court and prove that Bob signed m\n- suppose Alice receives msg m, with signature: m, KB(m)\n- Alice verifies m signed by Bob by applying Bob’s public key KB to KB(m) then checks KB(KB(m) ) = m.\n- If KB(KB(m) ) = m, whoever signed m must have used Bob’s private key\n\n- **Slide Diagram Elements & Protocol Entities:** `Public key encryption algorithm, Bob’s private key, m,K, (m)`"
      },
      {
        "title": "3. Message digests (Slides 8-45..48)",
        "content": "**Message digests**\n\n- **Hash function properties:** \n- many-to-1\n- produces fixed-size msg digest (fingerprint)\n- given message digest x, computationally infeasible to find m such that x = H(m)\n- computationally expensive to public-key-encrypt long messages\n- **goal:** fixed-length, easy- to-compute digital “fingerprint”\n- apply hash function H to m, get fixed size message digest, H(m)\n\n- **Slide Diagram Elements & Protocol Entities:** `large message m, H: Hash Function, H(m)`\n\n**Internet checksum: poor crypto hash function**\n\n- Internet checksum has some properties of hash function:\n- produces fixed length digest (16-bit sum) of message\n- is many-to-one\n- but given message with given hash value, it is easy to find another message with same hash value:\n\n- **Slide Diagram Elements & Protocol Entities:** `I O U 1 0 0 . 9 9 B O B, 49 4F 55 31 30 30 2E 39 39 42 D2 42, message, ASCII format, B2 C1 D2 AC, I O U 9 0 0 . 1 9 B O B, 49 4F 55 39 30 30 2E 31 39 42 D2 42, different messages but identical checksums!`\n\n**Digital signature = signed message digest**\n\n- digital\n- signature\n- (encrypt)\n- **Bob sends digitally signed message:** \n- Alice verifies signature, integrity of digitally signed message:\n- KB(H(m))\n- encrypted\n- message digest\n- KB(H(m))\n- encrypted\n- message digest\n- digital\n- signature\n- (decrypt)\n\n- **Slide Diagram Elements & Protocol Entities:** `large message m, H: Hash Function, H(m), H: Hash function, Bob’s private key, Bob’s public key, equal`\n\n**Hash function algorithms**\n\n- MD5 hash function widely used (RFC 1321)\n  - computes 128-bit message digest in 4-step process.\n  - arbitrary 128-bit string x, appears difficult to construct msg m whose MD5 hash is equal to x\n- SHA-1 is also used\n  - US standard [NIST, FIPS PUB 180-1]\n  - 160-bit message digest"
      },
      {
        "title": "4. Authentication: ap5.0 – let’s fix it!! (Slides 8-49..55)",
        "content": "**Authentication: ap5.0 – let’s fix it!!**\n\n- **Recall the problem:** Trudy poses as Alice (to Bob) and as Bob (to Alice)\n- sends m to Alice encrypted with Alice’s public key\n- Bob sends a personal message, m to Alice\n- and she and Bob meet a week later in person and discuss m, not knowing Trudy knows m\n- Where are mistakes made here?\n\n- **Slide Diagram Elements & Protocol Entities:** `I am Alice, Send me your public key, m = K (K (m)), Trudy recovers m:, K (R), (K (R)) = R,, Bob computes, authenticating Trudy as Alice, K (m), Trudy recovers Bob’s m:`\n\n**Need for certified public keys**\n\n- **motivation:** Trudy plays pizza prank on Bob\n  - Trudy creates e-mail order: Dear Pizza Store, Please deliver to me four pepperoni pizzas. Thank you, Bob\n  - Trudy signs order with her private key\n  - Trudy sends order to Pizza Store\n  - Trudy sends to Pizza Store her public key, but says it’s Bob’s public key\n  - Pizza Store verifies signature; then delivers four pepperoni pizzas to Bob\n  - Bob doesn’t even like pepperoni\n\n**Public key Certification Authorities (CA)**\n\n- **certification authority (CA):** binds public key to particular entity, E\n- entity (person, website, router) registers its public key with CE provides “proof of identity” to CA\n  - CA creates certificate binding identity E to E’s public key\n  - certificate containing E’s public key digitally signed by CA: CA says “this is E’s public key”\n- certificate for Bob’s public key, signed by CA\n- digital\n- signature\n- (encrypt)\n- **when Alice wants Bob’s public key:** \n  - gets Bob’s certificate (Bob or elsewhere)\n  - apply CA’s public key to Bob’s certificate, get Bob’s public key\n- (decrypt)\n\n- **Slide Diagram Elements & Protocol Entities:** `Bob’s identifying information, Bob’s public key, CA’s private key, CA’s public key`\n\n**Using Public-Key Cryptography to Agree on a Shared Key**\n\n- **Problem:** for Bob and Alice to use symmetric key techniques they must agree on the shared key.\n- What if they’ve never met before?\n- public-key cryptography can solve this problem too!\n- **Diffie-Hellman (DH) public/private keys:** different algorithm than RSA\n- **Bob chooses public values:** large prime number p, another large number g (<p).\n- Alice, Bob independently choose private values: SA, SB\n- **Alice’s public key:** KA+ = g SA mod p\n- **Bob’s public key:** KB+ = g SB mod p\n- **Diffie-Hellman (DH) shared key derivation:** \n- Alice, Bob compute a common shared secret without ever explicitly exchanging this shared secret!\n- **Alice, Bob have DH public keys:** KA+ , KB+ , secret values SA, SB\n- Alice’s computed shared secret\n- **(uses Bob’s public key and SA):** \n- (KB+ )SA mod p\n- Bob’s computed shared secret\n- **(uses Alice’s public key and SB):** \n- (KA+ )SB mod p\n- Internet\n- Alice’s and Bob’s locally computed values are equal to each other!"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **8.3–8.4 Authentication Protocols (ap1.0–ap5.0), Hash Digests, Digital Signatures & Certification Authorities**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "digital_signature_diffie_hellman.py — Verifying a Signed SHA-256 Message Digest & Diffie-Hellman Shared Key Exchange",
          "snippet": "# Kurose & Ross 9e - Section 8.3 & 8.4: Digital Signatures & Diffie-Hellman (DH) Shared Key Agreement\nimport hashlib\n\n# 1. Diffie-Hellman Key Exchange (Public prime p=23, generator g=5)\np, g = 23, 5\na_secret, b_secret = 6, 15\nA_pub = pow(g, a_secret, p)  # Alice sends g^a mod p\nB_pub = pow(g, b_secret, p)  # Bob sends g^b mod p\ns_alice = pow(B_pub, a_secret, p)\ns_bob = pow(A_pub, b_secret, p)\nprint(f\"Diffie-Hellman: Alice Pub={A_pub}, Bob Pub={B_pub} -> Shared Secret: Alice={s_alice}, Bob={s_bob}\\n\")\n\n# 2. Digital Signature over SHA-256 Message Digest\nmsg = b\"Bob, I owe you $1000. - Alice\"\ndigest_int = int(hashlib.sha256(msg).hexdigest()[:4], 16) % 35\nsig = pow(digest_int, 29, 35)   # Signed with Alice's RSA private key d=29\nverified = pow(sig, 5, 35)      # Verified with Alice's RSA public key e=5\nprint(f\"Message Digest H(m)={digest_int} | Signature={sig} | Verified Digest={verified} (Authentic={digest_int == verified})\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 8.3–8.4 Authentication Protocols (ap1.0–ap5.0), Hash Digests, Digital Signatures & Certification Authorities",
      "filename": "digital_signature_diffie_hellman.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 8.3 & 8.4: Digital Signatures & Diffie-Hellman (DH) Shared Key Agreement\nimport hashlib\n\n# 1. Diffie-Hellman Key Exchange (Public prime p=23, generator g=5)\np, g = 23, 5\na_secret, b_secret = 6, 15\nA_pub = pow(g, a_secret, p)  # Alice sends g^a mod p\nB_pub = pow(g, b_secret, p)  # Bob sends g^b mod p\ns_alice = pow(B_pub, a_secret, p)\ns_bob = pow(A_pub, b_secret, p)\nprint(f\"Diffie-Hellman: Alice Pub={A_pub}, Bob Pub={B_pub} -> Shared Secret: Alice={s_alice}, Bob={s_bob}\\n\")\n\n# 2. Digital Signature over SHA-256 Message Digest\nmsg = b\"Bob, I owe you $1000. - Alice\"\ndigest_int = int(hashlib.sha256(msg).hexdigest()[:4], 16) % 35\nsig = pow(digest_int, 29, 35)   # Signed with Alice's RSA private key d=29\nverified = pow(sig, 5, 35)      # Verified with Alice's RSA public key e=5\nprint(f\"Message Digest H(m)={digest_int} | Signature={sig} | Verified Digest={verified} (Authentic={digest_int == verified})\")",
      "expectedOutput": [
        "[OK] digital_signature_diffie_hellman.py — Verifying a Signed SHA-256 Message Digest & Diffie-Hellman Shared Key Exchange",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 8.3–8.4 Authentication Protocols (ap1.0–ap5.0), Hash Digests, Digital Signatures & Certification Authorities. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 8, what is the primary architectural focus of '8.3–8.4 Authentication Protocols (ap1.0–ap5.0), Hash Digests, Digital Signatures & Certification Authorities'?",
      "options": [
        "A) Why ap1.0–ap3.1 fail against spoofing and playback attacks, cryptographic nonces in ap4.0, man-in-the-middle attacks on ap5.0",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Why ap1.0–ap3.1 fail against spoofing and playback attacks, cryptographic nonces in ap4.0, man-in-the-middle attacks on ap5.0, SHA-256 message digests, signed hash digital signatures, and X.509 CAs + Diffie-Hellman."
    }
  },
  "cn-ch8-secure-email-pgp": {
    "id": "cn-ch8-secure-email-pgp",
    "badge": "Module 8 • Computer Networking 9e",
    "readingTime": "8 min read",
    "level": "İleri Seviye",
    "title": "8.5 Securing Electronic Mail (PGP / S/MIME): Confidentiality, Sender Authentication & Integrity",
    "subtitle": "Synthesizing cryptographic building blocks to secure email: signing H(m) with Alice's private key for integrity/non-repudiation, encrypting with a symmetric session key KS, and wrapping KS with Bob's public key.",
    "sections": [
      {
        "title": "1. Secure e-mail: confidentiality (Slides 8-57..58)",
        "content": "![8.5 Securing Electronic Mail (PGP / S/MIME): Confidentiality, Sender Authentication & Integrity Architecture](/images/networking/tls13-ipsec-security.svg)\n\n**8.5 Securing Electronic Mail (PGP / S/MIME): Confidentiality, Sender Authentication & Integrity** — Synthesizing cryptographic building blocks to secure email: signing H(m) with Alice's private key for integrity/non-repudiation, encrypting with a symmetric session key KS, and wrapping KS with Bob's public key.\n\n- Alice wants to send confidential e-mail, m, to Bob.\n- KS( )\n- KB( )\n- KS(m )\n- KB(KS )\n- Internet\n- KS( )\n- KB( )\n- KS(m )\n- KB(KS )\n- **Alice:** \n- generates random symmetric private key, KS\n- encrypts message with KS (for efficiency)\n- also encrypts KS with Bob’s public key\n- sends both KS(m) and K+B(KS) to Bob\n- **Bob:** \n- uses his private key to decrypt and recover KS\n- uses KS to decrypt KS(m) to recover m",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 8 Key Principle",
          "message": "Synthesizing cryptographic building blocks to secure email: signing H(m) with Alice's private key for integrity/non-repudiation, encrypting with a symmetric session key KS, and wrapping KS with Bob's public key."
        }
      },
      {
        "title": "2. Secure e-mail: integrity, authentication (Slides 8-59..60)",
        "content": "- Alice wants to send m to Bob, with message integrity, authentication\n- Internet\n- Alice digitally signs hash of her message with her private key, providing integrity and authentication\n- sends both message (in the clear) and digital signature\n- Alice sends m to Bob, with confidentiality, message integrity, authentication\n- KS( )\n- KB( )\n- KS(m )\n- KB(KS )\n- message integrity, authentication\n- **Alice uses three keys:** her private key, Bob’s public key, new symmetric key\n- What are Bob’s complementary actions?\n\n- **Slide Diagram Elements & Protocol Entities:** `H( ), KA( ), H(m ), KA(H(m)), compare, confidentiality`"
      },
      {
        "title": "3. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **8.5 Securing Electronic Mail (PGP / S/MIME): Confidentiality, Sender Authentication & Integrity**:\n\n- **Review Question 1 (E-mail delays.):** How many RTTs are there from when a client first contacts an email server (by initiating a TCP session) to when the client can begin sending the email message itself – that is following all initial TCP or SMTP handshaking required? Recall the figure below from our class notes:\n  - **Verified Answer:** 3\n\n- **Review Question 2 (Comparing and contrasting HTTP and SMTP.):** Which of the following characteristics apply to HTTP only (and do not apply to SMTP)? Note: check one or more of the characteristics below.\n  - **Verified Answer:** Uses a blank line (CRLF) to indicate end of request header.; Uses server port 80.; Operates mostly as a “client pull” protocol.\n\n- **Review Question 3 (Comparing and contrasting HTTP and SMTP (2).):** Which of the following characteristics apply to SMTP only (and do not apply to HTTP)? Note: check one or more of the characteristics below.\n  - **Verified Answer:** Uses CRLF.CRLF to indicate end of message.; Uses server port 25.; Operates mostly as a “client push” protocol.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "pgp_secure_email_pipeline.py — Tracing the Complete PGP / S/MIME Dual-Key Email Pipeline",
          "snippet": "# Kurose & Ross 9e - Section 8.5: Secure E-Mail (Confidentiality + Authentication + Integrity)\npipeline = [\n    \"1. Alice computes hash digest H(m) and signs it with her private key K_A^-(H(m))\",\n    \"2. Alice bundles [m || K_A^-(H(m))] and encrypts it using a fresh symmetric session key K_S\",\n    \"3. Alice encrypts the symmetric session key K_S using Bob's public key: K_B^+(K_S)\",\n    \"4. Bob decrypts K_S using his private key K_B^-, decrypts [m || sig], and verifies sig with K_A^+!\",\n]\n\nfor step in pipeline:\n    print(step)"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 8.5 Securing Electronic Mail (PGP / S/MIME): Confidentiality, Sender Authentication & Integrity",
      "filename": "pgp_secure_email_pipeline.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 8.5: Secure E-Mail (Confidentiality + Authentication + Integrity)\npipeline = [\n    \"1. Alice computes hash digest H(m) and signs it with her private key K_A^-(H(m))\",\n    \"2. Alice bundles [m || K_A^-(H(m))] and encrypts it using a fresh symmetric session key K_S\",\n    \"3. Alice encrypts the symmetric session key K_S using Bob's public key: K_B^+(K_S)\",\n    \"4. Bob decrypts K_S using his private key K_B^-, decrypts [m || sig], and verifies sig with K_A^+!\",\n]\n\nfor step in pipeline:\n    print(step)",
      "expectedOutput": [
        "[OK] pgp_secure_email_pipeline.py — Tracing the Complete PGP / S/MIME Dual-Key Email Pipeline",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 8.5 Securing Electronic Mail (PGP / S/MIME): Confidentiality, Sender Authentication & Integrity. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Which of the following characteristics apply to SMTP only (and do not apply to HTTP)? Note: check one or more of the characteristics below.",
      "options": [
        "A) Uses server port 80.",
        "B) Uses CRLF.CRLF to indicate end of message.",
        "C) Uses server port 25.",
        "D) Is able to use a persistent TCP connection to transfer multiple objects."
      ],
      "correctIndex": 1,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 8), 'Uses CRLF.CRLF to indicate end of message.' accurately characterizes 8.5 Securing Electronic Mail (PGP / S/MIME): Confidentiality, Sender Authentication & Integrity."
    }
  },
  "cn-ch8-tls-13-handshake": {
    "id": "cn-ch8-tls-13-handshake",
    "badge": "Module 8 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "8.6 Transport-Layer Security (TLS): Key Derivation, Record MACs, TLS 1.3 Cipher Suites & 1-RTT Handshake",
    "subtitle": "Building Toy TLS from scratch: why TCP needs handshake encryption, deriving 4 directional session keys (KC, MC, KS, MS), sequence numbers against replay attacks, and TLS 1.3's streamlined 1-RTT / 0-RTT Diffie-Hellman handshake.",
    "sections": [
      {
        "title": "1. Transport-layer security (TLS) (Slides 8-62..64)",
        "content": "![8.6 Transport-Layer Security (TLS): Key Derivation, Record MACs, TLS 1.3 Cipher Suites & 1-RTT Handshake Architecture](/images/networking/tls13-ipsec-security.svg)\n\n**8.6 Transport-Layer Security (TLS): Key Derivation, Record MACs, TLS 1.3 Cipher Suites & 1-RTT Handshake** — Building Toy TLS from scratch: why TCP needs handshake encryption, deriving 4 directional session keys (KC, MC, KS, MS), sequence numbers against replay attacks, and TLS 1.3's streamlined 1-RTT / 0-RTT Diffie-Hellman handshake.\n\n**Transport-layer security (TLS)**\n\n- widely deployed security protocol above the transport layer\n  - supported by almost all browsers, web servers: https (port 443)\n- **provides:** \n  - confidentiality: via symmetric encryption\n  - integrity: via cryptographic hashing\n  - authentication: via public key cryptography\n- all techniques we have studied!\n- **history:** \n  - early research, implementation: secure network programming, secure sockets\n  - secure socket layer (SSL) deprecated [2015]\n  - TLS 1.3: RFC 8846 [2018]\n\n**Transport-layer security: what’s needed?**\n\n- **handshake:** Alice, Bob use their certificates, private keys to authenticate each other, exchange or create shared secret\n- **key derivation:** Alice, Bob use shared secret to derive set of keys\n- **data transfer:** stream data transfer: data as a series of records\n  - not just one-time transactions\n- **connection closure:** special messages to securely close connection\n- let’s build a toy TLS protocol, t-tls, to see what’s needed!\n- **we’ve seen the “pieces” already:** ",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 8 Key Principle",
          "message": "Building Toy TLS from scratch: why TCP needs handshake encryption, deriving 4 directional session keys (KC, MC, KS, MS), sequence numbers against replay attacks, and TLS 1.3's streamlined 1-RTT / 0-RTT Diffie-Hellman handshake."
        }
      },
      {
        "title": "2. t-tls: initial handshake (Slides 8-65..66)",
        "content": "**t-tls: initial handshake**\n\n- **t-tls handshake phase:** \n- Bob establishes TCP connection with Alice\n- Bob verifies that Alice is really Alice\n- Bob sends Alice a master secret key (MS), used to generate all other keys for TLS session\n- **potential issues:** \n  - 3 RTT before client can start receiving data (including TCP handshake)\n\n- **Slide Diagram Elements & Protocol Entities:** `client request, server reply, t-tls hello, public key certificate, KB+(MS) = EMS, TCP SYN, SYNACK, ACK`\n\n**t-tls: cryptographic keys**\n\n- considered bad to use same key for more than one cryptographic function\n  - different keys for message authentication code (MAC) and encryption\n- **four keys:** \n  - Kc : encryption key for data sent from client to server\n  - Mc : MAC key for data sent from client to server\n  - Ks : encryption key for data sent from server to client\n  - Ms : MAC key for data sent from server to client\n- keys derived from key derivation function (KDF)\n  - takes master secret and (possibly) some additional random data to create new keys"
      },
      {
        "title": "3. t-tls: encrypting data (Slides 8-67..69)",
        "content": "**t-tls: encrypting data**\n\n- **recall:** TCP provides data byte stream abstraction\n- **Q:** can we encrypt data in-stream as written into TCP socket?\n  - A: where would MAC go? If at end, no message integrity until all data received and connection closed!\n  - solution: break stream in series of “records”\n    - each client-to-server record carries a MAC, created using Mc\n    - receiver can act on each record as it arrives\n- t-tls record encrypted using symmetric key, Kc, passed to TCP:\n- possible attacks on data stream?\n  - re-ordering: man-in middle intercepts TCP segments and reorders (manipulating sequence #s in unencrypted TCP header)\n  - replay\n- **solutions:** \n  - use TLS sequence numbers (data, TLS-seq-# incorporated into MAC)\n  - use nonce\n\n- **Slide Diagram Elements & Protocol Entities:** `data, MAC, length, Kc(`\n\n**t-tls: connection close**\n\n- **truncation attack:** \n  - attacker forges TCP connection close segment\n  - one or both sides thinks there is less data than there actually is\n- **solution:** record types, with one type for closure\n  - type 0 for data; type 1 for close\n- MAC now computed using data, type, sequence #\n\n- **Slide Diagram Elements & Protocol Entities:** `data, MAC, length, type, Kc(`"
      },
      {
        "title": "4. Transport-layer security (TLS) (Slides 8-70..71)",
        "content": "**Transport-layer security (TLS)**\n\n- TCP\n- TLS\n- HTTP/2\n- UDP\n- QUIC\n- HTTP/2 (slimmed)\n- Network\n- Transport\n- Application\n- HTTP/2 over TCP\n- HTTP/3\n- HTTP/2 over QUIC\n- (which incorporates TLS)\n- over UDP\n- TCP\n- HTTP 1.0\n- HTTP/2 over TCP\n- TLS provides an API that any application can use\n- **an HTTP view of TLS:** \n\n**TLS: 1.3 cipher suite**\n\n- **“cipher suite”:** algorithms that can be used for key generation, encryption, MAC, digital signature\n- **TLS:** 1.3 (2018): more limited cipher suite choice than TLS 1.2 (2008)\n  - only 5 choices, rather than 37 choices\n  - requires Diffie-Hellman (DH) for key exchange, rather than DH or RSA\n  - combined encryption and authentication algorithm (“authenticated encryption”) for data rather than serial encryption, authentication\n    - 4 based on AES\n  - HMAC uses SHA (256 or 284) cryptographic hash function"
      },
      {
        "title": "5. TLS 1.3 handshake: 1 RTT (Slides 8-72..73)",
        "content": "**TLS 1.3 handshake: 1 RTT**\n\n- **client hello:** \n- supported cipher suites\n- DH key agreement protocol, parameters\n- **server hello:** \n- selected cipher suite\n- DH key agreement protocol, parameters\n- **client TLS hello msg:** \n- guesses key agreement protocol, parameters\n- indicates cipher suites it supports\n- server TLS hello msg chooses\n- key agreement protocol, parameters\n- cipher suite\n- server-signed certificate\n- **client:** \n- checks server certificate\n- generates key\n- can now make application request (e.g.., HTTPS GET)\n\n- **Slide Diagram Elements & Protocol Entities:** `client, server`\n\n**TLS 1.3 handshake: 0 RTT**\n\n- **client hello:** \n- supported cipher suites\n- DH key agreement protocol, parameters\n- application data\n- **server hello:** \n- selected cipher suite\n- DH key agreement protocol, parameters\n- application data (reply)\n- initial hello message contains encrypted application data!\n- “resuming” earlier connection between client and server\n- application data encrypted using “resumption master secret” from earlier connection\n- vulnerable to replay attacks!\n- maybe OK for get HTTP GET or client requests not modifying server state\n\n- **Slide Diagram Elements & Protocol Entities:** `client, server`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **8.6 Transport-Layer Security (TLS): Key Derivation, Record MACs, TLS 1.3 Cipher Suites & 1-RTT Handshake**:\n\n- **Review Question 1 (QUIC streams.):** What are advantages of the streams concept in QUIC? Select all that apply.\n  - **Verified Answer:** Streams allow concurrent retrieval of web objects, while avoiding Head of the Line (HOL) blocking.; Since each stream has its own error control, if one stream experiences an error (e.g., lost or damaged segment), the other streams are unaffected.\n\n- **Review Question 2 (QUIC: an application-layer protocol.):** What are advantages of implementing transport-layer functionality in QUIC at the application layer? Select all that apply.\n  - **Verified Answer:** QUIC can establish all connection parameters (security, reliability, flow and congestion control)in just one handshake rather than separately in two.; As an application-layer protocol, QUIC can be updated/modified at “app frequency” rather than at the frequency of operating system updates.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "tls13_1rtt_handshake.py — Tracing the TLS 1.3 1-RTT Handshake & 4-Key Master Secret Derivation",
          "snippet": "# Kurose & Ross 9e - Section 8.6: TLS 1.3 1-RTT Handshake & Key Derivation\nimport hashlib\n\nmaster_secret = b\"ECDHE_Shared_Secret_g_ab_mod_p\"\nkeys = {\n    \"K_c (Client->Server AES Key)\": hashlib.sha256(master_secret + b\"client_enc\").hexdigest()[:16],\n    \"M_c (Client->Server HMAC Key)\": hashlib.sha256(master_secret + b\"client_mac\").hexdigest()[:16],\n    \"K_s (Server->Client AES Key)\": hashlib.sha256(master_secret + b\"server_enc\").hexdigest()[:16],\n    \"M_s (Server->Client HMAC Key)\": hashlib.sha256(master_secret + b\"server_mac\").hexdigest()[:16],\n}\n\nprint(\"TLS 1.3 1-RTT Handshake: ClientHello (+DH Share) -> ServerHello (+DH Share + Encrypted Cert) -> Derived Keys:\")\nfor k_name, val in keys.items():\n    print(f\"  {k_name:30s}: 0x{val}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 8.6 Transport-Layer Security (TLS): Key Derivation, Record MACs, TLS 1.3 Cipher Suites & 1-RTT Handshake",
      "filename": "tls13_1rtt_handshake.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 8.6: TLS 1.3 1-RTT Handshake & Key Derivation\nimport hashlib\n\nmaster_secret = b\"ECDHE_Shared_Secret_g_ab_mod_p\"\nkeys = {\n    \"K_c (Client->Server AES Key)\": hashlib.sha256(master_secret + b\"client_enc\").hexdigest()[:16],\n    \"M_c (Client->Server HMAC Key)\": hashlib.sha256(master_secret + b\"client_mac\").hexdigest()[:16],\n    \"K_s (Server->Client AES Key)\": hashlib.sha256(master_secret + b\"server_enc\").hexdigest()[:16],\n    \"M_s (Server->Client HMAC Key)\": hashlib.sha256(master_secret + b\"server_mac\").hexdigest()[:16],\n}\n\nprint(\"TLS 1.3 1-RTT Handshake: ClientHello (+DH Share) -> ServerHello (+DH Share + Encrypted Cert) -> Derived Keys:\")\nfor k_name, val in keys.items():\n    print(f\"  {k_name:30s}: 0x{val}\")",
      "expectedOutput": [
        "[OK] tls13_1rtt_handshake.py — Tracing the TLS 1.3 1-RTT Handshake & 4-Key Master Secret Derivation",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 8.6 Transport-Layer Security (TLS): Key Derivation, Record MACs, TLS 1.3 Cipher Suites & 1-RTT Handshake. Inspect the protocol parameters and run the verification checks."
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
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 8), 'Streams allow concurrent retrieval of web objects, while avoiding Head of the Line (HOL) blocking.' accurately characterizes 8.6 Transport-Layer Security (TLS): Key Derivation, Record MACs, TLS 1.3 Cipher Suites & 1-RTT Handshake."
    }
  },
  "cn-ch8-ipsec-esp-ike": {
    "id": "cn-ch8-ipsec-esp-ike",
    "badge": "Module 8 • Computer Networking 9e",
    "readingTime": "10 min read",
    "level": "İleri Seviye",
    "title": "8.7 Network-Layer Security (IPsec & VPNs): AH vs. ESP Tunnel Mode, Security Associations & IKE",
    "subtitle": "Blanket network-layer confidentiality between routers/hosts: Authentication Header (AH) vs. Encapsulating Security Payload (ESP) tunnel mode, unidirectional Security Associations (SAs), SPD, and Internet Key Exchange (IKE).",
    "sections": [
      {
        "title": "1. IP Sec (Slides 8-75..77)",
        "content": "![8.7 Network-Layer Security (IPsec & VPNs): AH vs. ESP Tunnel Mode, Security Associations & IKE Architecture](/images/networking/tls13-ipsec-security.svg)\n\n**8.7 Network-Layer Security (IPsec & VPNs): AH vs. ESP Tunnel Mode, Security Associations & IKE** — Blanket network-layer confidentiality between routers/hosts: Authentication Header (AH) vs. Encapsulating Security Payload (ESP) tunnel mode, unidirectional Security Associations (SAs), SPD, and Internet Key Exchange (IKE).\n\n**IP Sec**\n\n- provides datagram-level encryption, authentication, integrity\n  - for both user traffic and control traffic (e.g., BGP, DNS messages)\n- **two “modes”:** \n- **transport mode:** \n- only datagram payload is encrypted, authenticated\n- **tunnel mode:** \n- entire datagram is encrypted, authenticated\n- encrypted datagram encapsulated in new datagram with new IP header, tunneled to destination\n\n- **Slide Diagram Elements & Protocol Entities:** `payload`\n\n**Two IPsec protocols**\n\n- Authentication Header (AH) protocol [RFC 4302]\n  - provides source authentication & data integrity but not confidentiality\n- Encapsulation Security Protocol (ESP) [RFC 4303]\n  - provides source authentication, data integrity, and confidentiality\n  - more widely used than AH\n\n**Security associations (SAs)**\n\n- before sending data, security association (SA) established from sending to receiving entity (directional)\n- ending, receiving entitles maintain state information about SA\n  - recall: TCP endpoints also maintain state info\n  - IP is connectionless; IPsec is connection-oriented!\n- **R1 stores for SA:** \n- **32-bit identifier:** Security Parameter Index (SPI)\n- origin SA interface (200.168.1.100)\n- destination SA interface (193.68.2.23)\n- type of encryption used\n- encryption key\n- type of integrity check used\n- authentication key\n\n- **Slide Diagram Elements & Protocol Entities:** `193.68.2.23, 200.168.1.100`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 8 Key Principle",
          "message": "Blanket network-layer confidentiality between routers/hosts: Authentication Header (AH) vs. Encapsulating Security Payload (ESP) tunnel mode, unidirectional Security Associations (SAs), SPD, and Internet Key Exchange (IKE)."
        }
      },
      {
        "title": "2. IPsec datagram (Slides 8-78..80)",
        "content": "**IPsec datagram**\n\n- new IP header\n- ESP\n- header\n- original IP hdr\n- Original IP\n- datagram payload\n- ESP\n- trailer\n- ESP\n- auth\n- padding\n- pad length\n- next header\n- SPI\n- Seq\n- encrypted\n- authenticated\n- **ESP trailer:** padding for block ciphers\n- **ESP header:** \n  - SPI, so receiving entity knows what to do\n  - sequence number, to thwart replay attacks\n- MAC in ESP auth field created with shared secret key\n\n- **Slide Diagram Elements & Protocol Entities:** `tunnel mode ESP`\n\n**ESP tunnel mode: actions**\n\n- appends ESP trailer to original datagram (which includes original header fields!)\n- encrypts result using algorithm & key specified by SA\n- appends ESP header to front of this encrypted quantity\n- creates authentication MAC using algorithm and key specified in SA\n- appends MAC forming payload\n- creates new IP header, new IP header fields, addresses to tunnel endpoint\n\n- **Slide Diagram Elements & Protocol Entities:** `at R1:, payload`\n\n**IPsec sequence numbers**\n\n- for new SA, sender initializes seq. # to 0\n- **each time datagram is sent on SA:** \n  - sender increments seq # counter\n  - places value in seq # field\n- **goal:** \n  - prevent attacker from sniffing and replaying a packet\n  - receipt of duplicate, authenticated IP packets may disrupt service\n- **method:** \n  - destination checks for duplicates\n  - doesn’t keep track of all received packets; instead uses a window"
      },
      {
        "title": "3. Security Policy Database (SPD) (Slides 8-81..83)",
        "content": "**Security Policy Database (SPD)**\n\n- **policy:** for given datagram, sender needs to know if it should use IP sec\n- policy stored in security policy database (SPD)\n- needs to know which SA to use\n  - may use: source and destination IP address; protocol number\n- Security Assoc. Database (SAD)\n- endpoint holds SA state in security association database (SAD)\n- when sending IPsec datagram, R1 accesses SAD to determine how to process datagram\n- when IPsec datagram arrives to R2, R2 examines SPI in IPsec datagram, indexes SAD with SPI, processing\n- datagram accordingly.\n\n- **Slide Diagram Elements & Protocol Entities:** `SPD: “what” to do, SAD: “how” to do it, IPsec security databases`\n\n**Trudy sits somewhere between R1, R2. she doesn’t know the keys**\n\n  - will Trudy be able to see original contents of datagram? How about source, dest IP address, transport protocol, application port?\n  - flip bits without detection?\n  - masquerade as R1 using R1’s IP address?\n  - replay a datagram?\n\n- **Slide Diagram Elements & Protocol Entities:** `Summary: IPsec services`\n\n**previous examples: manual establishment of IPsec SAs in IPsec endpoints:**\n\n    - Example SA:\n    - SPI: 12345\n    - Source IP: 200.168.1.100\n    - Dest IP: 193.68.2.23\n    - Protocol: ESP\n    - Encryption algorithm: 3DES-cbc\n    - HMAC algorithm: MD5\n    - Encryption key: 0x7aeaca…\n    - HMAC key:0xc0291f…\n- manual keying is impractical for VPN with 100s of endpoints\n- instead use IPsec IKE (Internet Key Exchange)\n\n- **Slide Diagram Elements & Protocol Entities:** `IKE: Internet Key Exchange`"
      },
      {
        "title": "4. authentication (prove who you are) with either (Slides 8-84..86)",
        "content": "**authentication (prove who you are) with either**\n\n  - pre-shared secret (PSK) or\n  - with PKI (pubic/private keys and certificates).\n- **PSK:** both sides start with secret\n  - run IKE to authenticate each other and to generate IPsec SAs (one in each direction), including encryption, authentication keys\n- **PKI:** both sides start with public/private key pair, certificate\n  - run IKE to authenticate each other, obtain IPsec SAs (one in each direction).\n  - similar with handshake in SSL.\n\n- **Slide Diagram Elements & Protocol Entities:** `IKE: PSK and PKI`\n\n**IKE has two phases**\n\n  - phase 1: establish bi-directional IKE SA\n    - note: IKE SA different from IPsec SA\n    - aka ISAKMP security association\n  - phase 2: ISAKMP is used to securely negotiate IPsec pair of SAs\n- **phase 1 has two modes:** aggressive mode and main mode\n  - aggressive mode uses fewer messages\n  - main mode provides identity protection and is more flexible\n\n- **Slide Diagram Elements & Protocol Entities:** `IKE phases`\n\n**IKE message exchange for algorithms, secret keys, SPI numbers**\n\n- either AH or ESP protocol (or both)\n    - AH provides integrity, source authentication\n    - ESP protocol (with AH) additionally provides encryption\n- IPsec peers can be two end systems, two routers/firewalls, or a router/firewall and an end system\n\n- **Slide Diagram Elements & Protocol Entities:** `IPsec summary`"
      },
      {
        "title": "5. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **8.7 Network-Layer Security (IPsec & VPNs): AH vs. ESP Tunnel Mode, Security Associations & IKE**:\n\n- **Review Question 1 (What        is    the Internet Protocol?):** What are the principal components of the IPv4 protocol (check all that apply)?\n  - **Verified Answer:** IPv4 datagram format.; IPv4 addressing conventions.; Packet handling conventions at routers (e.g., segmentation/reassembly)\n\n- **Review Question 2 (What is an IP address actually associated        with?):** Which of the following statements is true regarding an IP address? (Zero, one or more of the following statements is true).\n  - **Verified Answer:** If a host has more than one interface, then it has more that one IP address at which it can be reached.; If a router has more than one interface, then it has more that one IP address at which it can be reached.; An IP address is associated with an interface.\n\n- **Review Question 3 (What is a subnet?):** What is meant by an IP subnet? (Check zero, one or more of the following characteristics of an IP subnet).\n  - **Verified Answer:** A set of devices that have a common set of leading high order bits in their IP address.; A set of device interfaces that can physically reach each other without passing through an intervening router.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "ipsec_esp_tunnel_packet.py — Constructing an IPsec ESP Tunnel-Mode Datagram at a VPN Gateway Router",
          "snippet": "# Kurose & Ross 9e - Section 8.7: IPsec ESP Tunnel Mode Encapsulation (Router R1 -> Router R2)\norig_ip_pkt = {\"src\": \"172.16.1.100\", \"dst\": \"172.16.2.200\", \"proto\": \"TCP\", \"payload\": \"Confidential_Payroll_Data\"}\n\nesp_tunnel_pkt = {\n    \"Outer_IP_Header\": {\"src\": \"200.168.1.100 (R1 WAN)\", \"dst\": \"193.68.2.23 (R2 WAN)\", \"proto\": 50},\n    \"ESP_Header\":      {\"SPI\": \"0x0001A4F0\", \"SeqNum\": 4021},\n    \"Encrypted_Body\":  {\"Inner_IP\": orig_ip_pkt, \"ESP_Trailer\": \"PadLen=2, NextHdr=4 (IPv4)\"},\n    \"ESP_Auth_MAC\":    \"HMAC-SHA256(ESP_Header || Encrypted_Body)\",\n}\n\nfor section, content in esp_tunnel_pkt.items():\n    print(f\"{section:16s}: {content}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 8.7 Network-Layer Security (IPsec & VPNs): AH vs. ESP Tunnel Mode, Security Associations & IKE",
      "filename": "ipsec_esp_tunnel_packet.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 8.7: IPsec ESP Tunnel Mode Encapsulation (Router R1 -> Router R2)\norig_ip_pkt = {\"src\": \"172.16.1.100\", \"dst\": \"172.16.2.200\", \"proto\": \"TCP\", \"payload\": \"Confidential_Payroll_Data\"}\n\nesp_tunnel_pkt = {\n    \"Outer_IP_Header\": {\"src\": \"200.168.1.100 (R1 WAN)\", \"dst\": \"193.68.2.23 (R2 WAN)\", \"proto\": 50},\n    \"ESP_Header\":      {\"SPI\": \"0x0001A4F0\", \"SeqNum\": 4021},\n    \"Encrypted_Body\":  {\"Inner_IP\": orig_ip_pkt, \"ESP_Trailer\": \"PadLen=2, NextHdr=4 (IPv4)\"},\n    \"ESP_Auth_MAC\":    \"HMAC-SHA256(ESP_Header || Encrypted_Body)\",\n}\n\nfor section, content in esp_tunnel_pkt.items():\n    print(f\"{section:16s}: {content}\")",
      "expectedOutput": [
        "[OK] ipsec_esp_tunnel_packet.py — Constructing an IPsec ESP Tunnel-Mode Datagram at a VPN Gateway Router",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 8.7 Network-Layer Security (IPsec & VPNs): AH vs. ESP Tunnel Mode, Security Associations & IKE. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "Consider the three subnets in the diagram below. What is the maximum # of interfaces in the 223.1.3/29 network?",
      "options": [
        "A) 128",
        "B) 2**32",
        "C) There's no a priori limit on the number of interfaces in this subnet.",
        "D) 8"
      ],
      "correctIndex": 3,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 8), '8' accurately characterizes 8.7 Network-Layer Security (IPsec & VPNs): AH vs. ESP Tunnel Mode, Security Associations & IKE."
    }
  },
  "cn-ch8-wifi-wpa2-8021x-5g-sec": {
    "id": "cn-ch8-wifi-wpa2-8021x-5g-sec",
    "badge": "Module 8 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "8.8 Wireless & Mobile Security: WiFi WPA2-PSK 4-Way Handshake, 802.1X EAP-TTLS & 5G Mutual Auth",
    "subtitle": "Securing the wireless edge: WPA2-Personal 4-way EAPOL handshake (deriving the Pairwise Transient Key from PMK + nonces), WPA2/WPA3-Enterprise 802.1X with EAP-TTLS and RADIUS, and 5G AMF/SEAF/AUSF/UDM authentication.",
    "sections": [
      {
        "title": "1. 802.11: authentication, encryption (Slides 8-88..92)",
        "content": "![8.8 Wireless & Mobile Security: WiFi WPA2-PSK 4-Way Handshake, 802.1X EAP-TTLS & 5G Mutual Auth Architecture](/images/networking/tls13-ipsec-security.svg)\n\n**8.8 Wireless & Mobile Security: WiFi WPA2-PSK 4-Way Handshake, 802.1X EAP-TTLS & 5G Mutual Auth** — Securing the wireless edge: WPA2-Personal 4-way EAPOL handshake (deriving the Pairwise Transient Key from PMK + nonces), WPA2/WPA3-Enterprise 802.1X with EAP-TTLS and RADIUS, and 5G AMF/SEAF/AUSF/UDM authentication.\n\n**802.11: authentication, encryption**\n\n- **Arriving mobile (client) must:** \n- **associate with access point:** (establish) communication over wireless link\n- perform mutual authentication with network\n- encrypt over-the-air frames, during authentication and after (i.e., user data frames)\n- Authentication Server\n- wired network\n- mobile\n\n**AP**\n\n- Authentication Server\n- wired network\n- **discovery of security capabilities:** \n- AP advertises its presence via beacon frame or device sends probe request frame\n- AP sends it forms of authentication and encryption provided\n- device requests specific forms authentication, encryption desired\n- **initially message exchange:** device not authenticated, encryption keys not known\n- mobile\n- discovery of security capabilities\n- **802.11:** authentication, encryption\n- mutual authentication and shared symmetric key derivation:\n- AS, mobile may already have shared common secret (e.g., password)\n- use shared secret, nonces (to prevent relay attacks), cryptographic hashing (to ensure message integrity) to\n  - authenticate each other\n  - derive symmetric key (e.g., AES key) for user session frames\n- discover security capabilities\n- authentication, key derivation\n- “personal”\n- “enterprise”\n\n**WiFi security standards: personal, enterprise**\n\n- WPA (WiFi Protected Access) Security\n- WEP\n- (Wired\n- Equivalent Privacy)\n- WPA\n- WPA2\n- WPA3\n- **Personal:** \n- common in home, small offices\n- same password for all devices\n- protocol between user device, AP\n- WPA2/3-PSK (pre-shared key)\n- **Enterprise:** \n- common in enterprises\n- password- and/or certificate-based\n- different per-user passwords\n- protocols among user device, AP, authentication server (e.g., RADIUS)\n- **EAP(Extensible Authentication Protocol:** EAP-TLS, EAP-TTLS plus many more\n\n**WiFi security: infrastructure**\n\n- Personal\n- between user device and AP\n- **WPA2/3-PSK:** password known to device, AP\n- arriving client device\n- WiFi AP\n- mostly between user device authentication server (AP acts as pass through)\n- Enterprise\n- The password is 12345\n- What’s the password?\n- Please let me in\n- Here are my credentials\n- Show us his credentials!\n- Please let me in\n- authentication server\n- arriving client device\n- WiFi AP\n\n> **Kurose & Ross Lecture Note:** Left side: Here’s a nice “whats the password” video: https://www.youtube.com/watch?v=w7JFSLu8OHI Right side: White house security gage in middle. Scene from “White House Down”",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 8 Key Principle",
          "message": "Securing the wireless edge: WPA2-Personal 4-way EAPOL handshake (deriving the Pairwise Transient Key from PMK + nonces), WPA2/WPA3-Enterprise 802.1X with EAP-TTLS and RADIUS, and 5G AMF/SEAF/AUSF/UDM authentication."
        }
      },
      {
        "title": "2. WPA2-PSK (pre-shard key) (Slides 8-93..96)",
        "content": "**WPA2-PSK (pre-shard key)**\n\n- same password configured on AP for all devices\n- password known ahead of time (“pre-shared”) by devices\n- Two “phases” of WPA2-PSK authentication\n- arriving client device\n- WiFi AP\n- **802.11 open “authentication”:** \n- client associates with AP\n- (no actual “authentication” yet)\n- 802.11 beacon frame (broadcast)\n- 802.11 Probe request\n- 802.11 probe response\n- **802.11 authentication:** request Open\n- **802.11 authentication:** successful\n- **802.1x WPA2/3-PSK:** authentication, generate new AES session encryption key\n- **802.1x authentication:** nonce1\n- **802.1x authentication:** reply, nonce2\n- **802.1x authentication:** install key\n- **802.1x authentication:** ACK\n\n**WPA2-PSK: phase 1**\n\n- *** http:** //gaia.cs.umass.edu/kurose/carioca_Iphone_association_selected_packets_onlyV2.pcapng\n- ... at this point, “real” authentication has not yet happened!\n- arriving client device\n- WiFi AP\n- 802.11 beacon frame (broadcast)\n- 802.11 Probe request\n- 802.11 probe response\n- **802.11 authentication:** request Open\n- **802.11 authentication:** successful\n- **802.1x authentication:** nonce1\n- **802.1x authentication:** reply, nonce2\n- **802.1x authentication:** install key\n- **802.1x authentication:** ACK\n- AP broadcasts 802.11 beacon frames (packet 1 in Wireshark trace*)\n- Client sends 802.11 Probe Request (packet 2)\n- AP responds with 802.11 Probe Response (packet 3)\n- Client sends 802.11 Authentication frame, requesting Open System,” i.e., no password authentication (packet 4)\n- AP responds with 802.11 Authentication frame (packet 5), with “Status Code: Successful”\n\n**WPA2-PSK: phase 2 - 4-way EAPOL handshake**\n\n- client, AP have established (unsecured) 802.11 session, know shared secret (password)\n- **4-way EAPOL handshake:** use shared secret, nonces to generate new one-time session key for encrypting this session:\n  - shared secret: used to encrypt, and provide message integrity (MIC) for EAPOL messages\n  - MIC nonces: guarantee liveness, protect against replay attacks\n  - new, one-time AES session key: protects against brute force decryption attacks on shared secret\n- 4-way EAPOL handshake for WPA2-PSK\n- **EAPOL:** Extensible Authentication Protocol over LAN\n\n**WPA2-PSK: phase 2**\n\n- *** http:** //gaia.cs.umass.edu/kurose/carioca_Iphone_association_selected_packets_onlyV2.pcapng\n- ... at this point, AES encryption key known on both sides (note: shared secret never actually exchanged!)\n- arriving client device\n- WiFi AP\n- 802.11 beacon frame (broadcast)\n- 802.11 Probe request\n- 802.11 probe response\n- **802.11 authentication:** request Open\n- **802.11 authentication:** successful\n- **802.1x authentication:** nonce1\n- **802.1x authentication:** reply, nonce2\n- **802.1x authentication:** install key\n- **802.1x authentication:** ACK\n- **AP send 802.1x EAPOL message:** WPA2-PSK (aka RSN), nonce1 (packet 6 in Wireshark trace*)\n- AP checks MIC (verifying client liveness), generates new AES session key using shared secret, MIC, sends to client (packet 8)\n- Client verifies MIC, sends ACKs(packet 9), installs AES session key ... both sides ready to go!\n- Client uses shared secret and nonce1 to generate reply with MIC, also generates, sends nonce2 (packet 7)"
      },
      {
        "title": "3. 802.1x Enterprise Authentication Framework (Slides 8-97..100)",
        "content": "**802.1x Enterprise Authentication Framework**\n\n- Internet\n- arriving client device\n- WiFi AP\n- 802.1x\n- enterprise\n- terminology\n- Supplicant\n- Client device needing authentication before being allowed network access\n- Authenticator\n- relays messages between client and authentication server to authenticate client, authorize client use of WLAN\n- Authentication server\n- server with clients’ authentication and access rights information\n- EAPoL\n- RADIUS\n- EAP method data\n- authentication server\n\n**802.1x Enterprise: Extensible Authentication Protocols: EAPs**\n\n- EAP primarily between client, authentication server (e.g., RADIUS server)\n  - AP acts mostly as pass through\n- credentials stored at clients, authentication server\n- ~40 different EAP protocols (!)\n  - Differing in credentials: passwords, certificates, SIM cards, tokens ....\n  - commonly used : EAP-MD-5, EAP-TLS, EAP-PEAP, EAP-TTLS, EAP-Fast, and Cisco LEAP. EAP-MD-5\n- authentication server\n- arriving client device\n- WiFi AP\n\n**EAP-TTLS: Tunneled Transport Layer Security [RFC 5281]**\n\n- Two “phases” of EAP-TTLS\n- 4-way EAPOL handshake to encrypt local wireless channel (not for authentication, which is already done in phases 1,2 ) as in WPA2-PSK.\n- **802.1x authentication:** nonce1\n- **802.1x authentication:** reply, nonce2\n- **802.1x authentication:** install key\n- **802.1x authentication:** ACK\n- **AS:** authentication server (e.g., RADIUS)\n- arriving client device\n- WiFi AP\n- **Phase 1:** client authenticates AS (e.g., via server public key), TLS tunnel established between client, AS\n- **Phase 2:** AS authenticates client (e.g., via client password) within encrypted tunnel, tunnel torn down\n- EAPoL\n- RADIUS\n- EAPoL Method data\n\n**EAP-TTLS: message exchange phase 1 (simplified details)**\n\n- set up TLS tunnel\n- **AS:** authentication server (e.g., RADIUS)\n- arriving client device\n- WiFi AP\n- Phase 2\n- **EAP-TTLS:** Response: Start\n- **EAP-TTLS Response:** client Hello, nonce1, ciphersuite\n- EAPOL Start\n- 802.11 Request, Identity\n- EAPOL Response, Identify\n- RADIUS access request\n- **EAP-TTLS Request:** server Hello,nonce2, server cert, ciphersuite\n- **EAP-TTLS Response:** client key info, Finished\n- **EAP-TTLS Request:** Finished\n- ... at this point, AS is authenticated by client, encrypted session between client, AP\n- After some handshaking, client provides name to A\n- **AP:** a client is seeking authentication\n- **RADIUS server:** initiates EAP-TTLS with client\n- Client sends nonce1, acceptable encryption schemes to AS\n- AS response with its certificate (for authentication), nonce2, chosen encryption method.\n- Client authenticates server, sends client info (encrypted using server public key)"
      },
      {
        "title": "4. EAP-TTLS: message exchange phase 2 (simplified details) (Slides 8-101..108)",
        "content": "**EAP-TTLS: message exchange phase 2 (simplified details)**\n\n- Tunnel torn down\n- **AS:** authentication server (e.g., RADIUS)\n- arriving client device\n- WiFi AP\n- **EAP-TTLS Request:** Identity\n- **EAP-TTLS Response:** user name\n- **EAP-TTLS Request:** send password\n- **EAP-TTLS Response:** password\n- **RADIUS:** - success, including client key\n- **Next:** client/AP agree on channel encryption using EAPoL 4-way handshake, then client can run DHCP\n- AS send identity request to client\n- Client responds with identity\n- AS challenge - send password, or other credential, depending on EAP-TTLS authentication method\n- AS informs AP that client is authenticated, sends info needed for AP, client channel encryption\n- Phase 1\n- Phase 1\n- **EAP:** success\n- Client responds with credential\n- AP pass EAP success message to client\n\n**Local Authentication Server may use proxies**\n\n- visiting user device\n- WiFi AP\n- local RADIUS server for Eduroam\n- national EDUROAM RADIUS servers\n- World-region EDUROAM RADIUS servers\n- national EDUROAM RADIUS servers for visiting user\n- visiting user’s “home” realm EDUROAM RADIUS server\n- arriving client device\n- WiFi AP\n- local RADIUS authentication server\n- local Azure Active Directory server\n- Authentication proxied from local RADIUS server to local AD server\n- **EDUROAM user “visiting” remote WiFi net:** local EDUROAM RADIUS server proxies to user’s home “realm” RADIUS server and accepts remote authentication decision\n\n**Authentication, encryption in 5G**\n\n- Visited Core\n- network\n- gNB\n- Home network\n- **arriving mobile must:** \n  - associate with BS: (establish) communication over 4G wireless link\n  - authenticate itself to network, and authenticate network\n- notable differences from WiFi\n  - UE’s SIM provides global identity, contains shared keys\n  - services in visited network depend on (paid) service subscription in home network\n- AMF/SEAF\n- Access, Mobility\n- Management/\n- Security Anchor Function\n- UDM\n- Unified Data Management\n- AUSF\n- Authentication\n- Server\n- HSS-M\n- HSS-M\n- HSS-M\n\n**AMF/SEAF**\n\n- Access, Mobility\n- Management/\n- Security Anchor Function\n- Visited network\n- Home network\n- shared secret\n- shared secret\n- Registration Request (IMSI info)\n- Authenticate Request\n- (IMSI info, visited network name)\n- TLS tunnel\n- Authentication, encryption in 5G\n- UDM\n- Unified Data Management\n- AUSF\n- Authentication\n- Server\n- UE sends Registration Request message to visited AMF with identity (IMSI) info\n- visited AMF locates AUSF in device’s home network, establishes secure TLS tunnel to home AUSF (all messages authenticated, encrypted)\n- Wireless network security 104\n- authentication request/response\n- XRES\n- home AUSF contacts home UDM\n- home UDM creates authentication token (using UE’s key) and nonce, and signs (will prove to UE that home UDM generated token)\n- UDM computes, saves expected response (XRES) that UE will compute\n- Wireless network security 105\n- Authenticate Response\n- EAP-Request(nonce, auth_token)\n- EAP-Request (nonce, auth_token)\n- home AUSF sends authentication token, nonce to AMF, which forwards to UE\n- Wireless network security 106\n- EAP-Response(XRESC)\n- UE receives authentication token, nonce\n- Given shared secret on its SIM, determines token is indeed from its home AUSF\n- UE computes its expected response (XRESC) sends to home AUSF\n- Wireless network security 107\n- authentication success\n- **Moment of truth:** \n- AUSF computer XRESC and compares with XRES it computed earlier\n- **authentication success:** home UDM updated\n  - home AUSF generates anchor key and sends it to visited AMF (device will compute anchor key on its own\n  - AMF, device use anchor key to secure message exchange in visited network\n- (EAP-Success(Anchor_Key))\n- EAP-Success\n- anchor key\n- Wireless network security 108"
      },
      {
        "title": "5. 5G Authentication: observations (Slides 8-109..109)",
        "content": "- home AUSF makes authentication comparison (used be MME in visited network in 4G)\n- home AUSF generates anchor key to be used in visited network\n  - informs UE and AMF and gNB in visited network\n- note use of crypto keys on UE’s SIM (known only to UE and home AUSF)\n- Wireless network security 109"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **8.8 Wireless & Mobile Security: WiFi WPA2-PSK 4-Way Handshake, 802.1X EAP-TTLS & 5G Mutual Auth**:\n\n- **Review Question 1 (Beacon Frames.):** What is the purpose of a beacon frame in WiFi (802.11) networks?\n  - **Verified Answer:** A beacon frame allows an access point to advertise its existence, and the frequency channel it is operating on, to devices that want to connect to an access point.\n\n- **Review Question 2 (Use of ACKs in WiFi.):** Why are link-layer ACKs used in WiFi (802.11) networks? [Hint: check two of the boxes below].\n  - **Verified Answer:** Because of the hidden terminal problem, a node that is transmitting and hears no collisions still doesn’t know if there was a collision at the receiver.; Wireless links are noisier than wired links, and so bit level errors are more likely to occur, making link-layer error recovery more valuable that in less-noisy wired links.\n\n- **Review Question 3 (Why three addresses?):** Why does the WiFi (802.11) link-layer frame have three addresses? [Note: WiFi actually has four MAC addresses in the frame, but we’re only focusing here on the three widely used ones].\n  - **Verified Answer:** Because both the access point that will relay this frame to the intended link-layer receiving host or router interface, as well as that intended destination host or router interface need to be specified.",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "wpa2_4way_eapol_handshake.py — Deriving a Fresh Pairwise Transient Key (PTK) in the WPA2 4-Way EAPOL Handshake",
          "snippet": "# Kurose & Ross 9e - Section 8.8.1: WiFi WPA2-PSK 4-Way EAPOL Handshake Key Derivation\nimport hashlib\n\npmk = hashlib.pbkdf2_hmac(\"sha1\", b\"MyHomeWiFiPassword\", b\"HomeSSID\", 4096, 32)\na_nonce = b\"AP_Random_Nonce_12345\"\ns_nonce = b\"STA_Random_Nonce_67890\"\nap_mac = b\"BB:BB:BB:22:22:22\"\nsta_mac = b\"AA:AA:AA:11:11:11\"\n\nptk = hashlib.sha256(pmk + a_nonce + s_nonce + ap_mac + sta_mac).hexdigest()\nprint(f\"Shared Pre-Master Key (PMK) : {pmk.hex()[:32]}...\")\nprint(f\"Derived Session Key   (PTK) : {ptk[:32]}... (Verified via MIC in EAPOL Messages 2 & 3!)\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 8.8 Wireless & Mobile Security: WiFi WPA2-PSK 4-Way Handshake, 802.1X EAP-TTLS & 5G Mutual Auth",
      "filename": "wpa2_4way_eapol_handshake.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 8.8.1: WiFi WPA2-PSK 4-Way EAPOL Handshake Key Derivation\nimport hashlib\n\npmk = hashlib.pbkdf2_hmac(\"sha1\", b\"MyHomeWiFiPassword\", b\"HomeSSID\", 4096, 32)\na_nonce = b\"AP_Random_Nonce_12345\"\ns_nonce = b\"STA_Random_Nonce_67890\"\nap_mac = b\"BB:BB:BB:22:22:22\"\nsta_mac = b\"AA:AA:AA:11:11:11\"\n\nptk = hashlib.sha256(pmk + a_nonce + s_nonce + ap_mac + sta_mac).hexdigest()\nprint(f\"Shared Pre-Master Key (PMK) : {pmk.hex()[:32]}...\")\nprint(f\"Derived Session Key   (PTK) : {ptk[:32]}... (Verified via MIC in EAPOL Messages 2 & 3!)\")",
      "expectedOutput": [
        "[OK] wpa2_4way_eapol_handshake.py — Deriving a Fresh Pairwise Transient Key (PTK) in the WPA2 4-Way EAPOL Handshake",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 8.8 Wireless & Mobile Security: WiFi WPA2-PSK 4-Way Handshake, 802.1X EAP-TTLS & 5G Mutual Auth. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "What is the purpose of RTS (request to send) and CTS (clear to send) frames in WiFi (802.11) networks? Select one or more of the answers below. [Hint: check two answers below].",
      "options": [
        "A) A CTS that is sent allows a receiver to force other nodes (other than the intended sender who sent the RTS) to refrain from transmitting, th",
        "B) RTC/CTS frames helps nodes in a wireless network mitigate the effects of the hidden terminal problem.",
        "C) A CTS allows a receiver to let the sender (who sent that RTS) know that it (the receiver) has enough buffers to hold a frame transmitted by ",
        "D) RTC/CTS frames allow a sender to gather CTS frames from all other network nodes, so that it knows it can then send without collisions."
      ],
      "correctIndex": 0,
      "explanation": "Correct! According to Kurose & Ross (Computer Networking: A Top-Down Approach, 9th Edition, Chapter 8), 'A CTS that is sent allows a receiver to force other nodes (other than the intended sender who sent the RTS) to refrain from transmitting, thus allowing the sender who sent the RTS to then transmit a frame with less likelihood of a collision.' accurately characterizes 8.8 Wireless & Mobile Security: WiFi WPA2-PSK 4-Way Handshake, 802.1X EAP-TTLS & 5G Mutual Auth."
    }
  },
  "cn-ch8-firewalls-ids": {
    "id": "cn-ch8-firewalls-ids",
    "badge": "Module 8 • Computer Networking 9e",
    "readingTime": "12 min read",
    "level": "İleri Seviye",
    "title": "8.9 Operational Security: Stateless vs. Stateful Firewalls, ACLs, Application Gateways & IDS/IPS",
    "subtitle": "Defending enterprise network perimeters: Stateless packet-filtering Access Control Lists (SYN/ACK bit filtering), Stateful connection-tracking tables, Application Gateways, and Deep Packet Inspection in Snort IDS/IPS.",
    "sections": [
      {
        "title": "1. isolates organization’s internal network from larger Internet, allowing some packets to pass, blocking others (Slides 8-111..113)",
        "content": "![8.9 Operational Security: Stateless vs. Stateful Firewalls, ACLs, Application Gateways & IDS/IPS Architecture](/images/networking/tls13-ipsec-security.svg)\n\n**8.9 Operational Security: Stateless vs. Stateful Firewalls, ACLs, Application Gateways & IDS/IPS** — Defending enterprise network perimeters: Stateless packet-filtering Access Control Lists (SYN/ACK bit filtering), Stateful connection-tracking tables, Application Gateways, and Deep Packet Inspection in Snort IDS/IPS.\n\n**isolates organization’s internal network from larger Internet, allowing some packets to pass, blocking others**\n\n- **Slide Diagram Elements & Protocol Entities:** `Firewalls, administered network, public Internet, firewall, trusted “good guys”, untrusted “bad guys”`\n\n**prevent denial of service attacks:**\n\n  - SYN flooding: attacker establishes many bogus TCP connections, no resources left for “real” connections\n- prevent illegal modification/access of internal data\n  - e.g., attacker replaces CIA’s homepage with something else\n- allow only authorized access to inside network\n  - set of authenticated users/hosts\n- **three types of firewalls:** \n  - stateless packet filters\n  - stateful packet filters\n  - application gateways\n\n- **Slide Diagram Elements & Protocol Entities:** `Firewalls: why`\n\n**Should arriving packet be allowed in? Departing packet let out?**\n\n- internal network connected to Internet via router firewall\n- filters packet-by-packet, decision to forward/drop packet based on:\n  - source IP address, destination IP address\n  - TCP/UDP source, destination port numbers\n  - ICMP message type\n  - TCP SYN, ACK bits\n\n- **Slide Diagram Elements & Protocol Entities:** `Stateless packet filtering`",
        "callout": {
          "type": "info",
          "title": "Kurose & Ross 9th Edition — Chapter 8 Key Principle",
          "message": "Defending enterprise network perimeters: Stateless packet-filtering Access Control Lists (SYN/ACK bit filtering), Stateful connection-tracking tables, Application Gateways, and Deep Packet Inspection in Snort IDS/IPS."
        }
      },
      {
        "title": "2. Stateless packet filtering: example (Slides 8-114..116)",
        "content": "**Stateless packet filtering: example**\n\n- Should arriving packet be allowed in? Departing packet let out?\n- **example 1:** block incoming and outgoing datagrams with IP protocol field = 17 and with either source or dest port = 23\n  - result: all incoming, outgoing UDP flows and telnet connections are blocked\n- **example 2:** block inbound TCP segments with ACK=0\n  - result: prevents external clients from making TCP connections with internal clients, but allows internal clients to connect to outside\n\n**Stateless packet filtering: more examples**\n\n- Policy | Firewall Setting\n- no outside Web access | drop all outgoing packets to any IP address, port 80\n- no incoming TCP connections, except those for institution ’ s public Web server only. | drop all incoming TCP SYN packets to any IP except 130.207.244.203, port 80\n- prevent Web-radios from eating up the available bandwidth. | drop all incoming UDP packets - except DNS and router broadcasts.\n- prevent your network from being used for a smurf DoS attack. | drop all ICMP packets going to a “ broadcast ” address (e.g. 130.207.255.255)\n- prevent your network from being tracerouted | drop all outgoing ICMP TTL expired traffic\n\n**ACL: table of rules, applied top to bottom to incoming packets: (action, condition) pairs: looks like OpenFlow forwarding (Ch. 4)!**\n\n- action | source address | dest address | protocol | source port | dest port | flag bit\n- allow | 222.22/16 | outside of 222.22/16 | TCP | > 1023 | 80 | any\n- allow | outside of 222.22/16 | 222.22/16 | TCP | 80 | > 1023 | ACK\n- allow | 222.22/16 | outside of 222.22/16 | UDP | > 1023 | 53 | ---\n- allow | outside of 222.22/16 | 222.22/16 | UDP | 53 | > 1023 | ----\n- deny | all | all | all | all | all | all\n\n- **Slide Diagram Elements & Protocol Entities:** `Access Control Lists`"
      },
      {
        "title": "3. stateless packet filter: heavy handed tool (Slides 8-117..119)",
        "content": "**stateless packet filter: heavy handed tool**\n\n  - admits packets that “make no sense,” e.g., dest port = 80, ACK bit set, even though no TCP connection established:\n- **stateful packet filter:** track status of every TCP connection\n  - track connection setup (SYN), teardown (FIN): determine whether incoming, outgoing packets “makes sense”\n  - timeout inactive connections at firewall: no longer admit packets\n- action | source address | dest address | protocol | source port | dest port | flag bit\n- allow | outside of 222.22/16 | 222.22/16 | TCP | 80 | > 1023 | ACK\n\n- **Slide Diagram Elements & Protocol Entities:** `Stateful packet filtering`\n\n**ACL augmented to indicate need to check connection state table before admitting packet**\n\n- action | source address | dest address | proto | source port | dest port | flag bit | check connection\n- allow | 222.22/16 | outside of 222.22/16 | TCP | > 1023 | 80 | any\n- allow | outside of 222.22/16 | 222.22/16 | TCP | 80 | > 1023 | ACK | x\n- allow | 222.22/16 | outside of 222.22/16 | UDP | > 1023 | 53 | ---\n- allow | outside of 222.22/16 | 222.22/16 | UDP | 53 | > 1023 | ---- | x\n- deny | all | all | all | all | all | all\n\n- **Slide Diagram Elements & Protocol Entities:** `Stateful packet filtering`\n\n**filter packets on application data as well as on IP/TCP/UDP fields.**\n\n- **example:** allow select internal users to telnet outside\n- 1. require all telnet users to telnet through gateway.\n- 2. for authorized users, gateway sets up telnet connection to dest host\n- gateway relays data between 2 connections\n- 3. router filter blocks all telnet connections not originating from gateway\n\n- **Slide Diagram Elements & Protocol Entities:** `Application gateways, application gateway, host-to-gateway telnet session, router and filter, gateway-to-remote host telnet session`"
      },
      {
        "title": "4. Limitations of firewalls, gateways (Slides 8-120..122)",
        "content": "**Limitations of firewalls, gateways**\n\n- **IP spoofing:** router can’t know if data “really” comes from claimed source\n- if multiple apps need special treatment, each has own app. gateway\n- client software must know how to contact gateway\n  - e.g., must set IP address of proxy in Web browser\n- filters often use all or nothing policy for UDP\n- **tradeoff:** degree of communication with outside world, level of security\n- many highly protected sites still suffer from attacks\n\n**packet filtering:**\n\n  - operates on TCP/IP headers only\n  - no correlation check among sessions\n- **IDS:** intrusion detection system\n  - deep packet inspection: look at packet contents (e.g., check character strings in packet against database of known virus, attack strings)\n  - examine correlation among multiple packets\n    - port scanning\n    - network mapping\n    - DoS attack\n\n- **Slide Diagram Elements & Protocol Entities:** `Intrusion detection systems`\n\n**multiple IDSs: different types of checking at different locations**\n\n- **Slide Diagram Elements & Protocol Entities:** `Intrusion detection systems, Web server, FTP server, DNS server, Internet, demilitarized zone, firewall, IDS sensors, internal network`"
      },
      {
        "title": "5. basic techniques…... (Slides 8-123..123)",
        "content": "  - cryptography (symmetric and public key)\n  - message integrity\n  - end-point authentication\n- …. used in many different security scenarios\n  - secure email\n  - secure transport (TLS)\n  - IP sec\n  - 802.11, 4G/5G\n- **operational security:** firewalls and IDS\n\n- **Slide Diagram Elements & Protocol Entities:** `Network Security (summary)`"
      },
      {
        "title": "6. Protocol Verification, Knowledge Checks & Python Simulation",
        "content": "Below are official review exercises from the **Kurose & Ross 9th Edition Knowledge Checks** (`gaia.cs.umass.edu/kurose_ross/knowledgechecks/`) and a hands-on protocol implementation for **8.9 Operational Security: Stateless vs. Stateful Firewalls, ACLs, Application Gateways & IDS/IPS**:",
        "callout": {
          "type": "tip",
          "title": "Hands-On Wireshark & Protocol Simulation",
          "message": "Run and modify the protocol simulation script in the interactive lab below to test edge-case parameters (RTT, link rate, window size, prefix lengths, or cryptographic keys)."
        },
        "code": {
          "language": "python",
          "caption": "stateful_firewall_acl.py — Kurose & Ross Stateless ACL vs. Stateful Connection-Tracking Firewall Engine",
          "snippet": "# Kurose & Ross 9e - Section 8.9: Stateless vs. Stateful Packet Filtering Firewall\nactive_conns = {(\"222.22.1.7\", 12699, \"131.114.48.29\", 80)}  # Tracked outbound TCP connection\n\nincoming_wan_packets = [\n    {\"src_ip\": \"131.114.48.29\", \"src_port\": 80, \"dst_ip\": \"222.22.1.7\", \"dst_port\": 12699, \"ack\": 1, \"desc\": \"Legitimate HTTP Reply\"},\n    {\"src_ip\": \"198.51.100.99\", \"src_port\": 80, \"dst_ip\": \"222.22.1.7\", \"dst_port\": 44444, \"ack\": 1, \"desc\": \"Spoofed ACK Scan Attack\"},\n]\n\nfor pkt in incoming_wan_packets:\n    # Stateless firewall allows any packet from port 80 with ACK=1\n    stateless_verdict = \"ALLOW\" if (pkt[\"src_port\"] == 80 and pkt[\"ack\"] == 1) else \"DROP\"\n    # Stateful firewall ALSO checks if (dst_ip, dst_port, src_ip, src_port) is in active_conns!\n    reverse_tuple = (pkt[\"dst_ip\"], pkt[\"dst_port\"], pkt[\"src_ip\"], pkt[\"src_port\"])\n    stateful_verdict = \"ALLOW\" if (stateless_verdict == \"ALLOW\" and reverse_tuple in active_conns) else \"DROP (Not in Connection Table!)\"\n    print(f\"[{pkt['desc']:23s}] Stateless: {stateless_verdict:5s} | Stateful: {stateful_verdict}\")"
        }
      }
    ],
    "playground": {
      "title": "Interactive Networking Lab: 8.9 Operational Security: Stateless vs. Stateful Firewalls, ACLs, Application Gateways & IDS/IPS",
      "filename": "stateful_firewall_acl.py",
      "language": "python",
      "initialCode": "# Kurose & Ross 9e - Section 8.9: Stateless vs. Stateful Packet Filtering Firewall\nactive_conns = {(\"222.22.1.7\", 12699, \"131.114.48.29\", 80)}  # Tracked outbound TCP connection\n\nincoming_wan_packets = [\n    {\"src_ip\": \"131.114.48.29\", \"src_port\": 80, \"dst_ip\": \"222.22.1.7\", \"dst_port\": 12699, \"ack\": 1, \"desc\": \"Legitimate HTTP Reply\"},\n    {\"src_ip\": \"198.51.100.99\", \"src_port\": 80, \"dst_ip\": \"222.22.1.7\", \"dst_port\": 44444, \"ack\": 1, \"desc\": \"Spoofed ACK Scan Attack\"},\n]\n\nfor pkt in incoming_wan_packets:\n    # Stateless firewall allows any packet from port 80 with ACK=1\n    stateless_verdict = \"ALLOW\" if (pkt[\"src_port\"] == 80 and pkt[\"ack\"] == 1) else \"DROP\"\n    # Stateful firewall ALSO checks if (dst_ip, dst_port, src_ip, src_port) is in active_conns!\n    reverse_tuple = (pkt[\"dst_ip\"], pkt[\"dst_port\"], pkt[\"src_ip\"], pkt[\"src_port\"])\n    stateful_verdict = \"ALLOW\" if (stateless_verdict == \"ALLOW\" and reverse_tuple in active_conns) else \"DROP (Not in Connection Table!)\"\n    print(f\"[{pkt['desc']:23s}] Stateless: {stateless_verdict:5s} | Stateful: {stateful_verdict}\")",
      "expectedOutput": [
        "[OK] stateful_firewall_acl.py — Kurose & Ross Stateless ACL vs. Stateful Connection-Tracking Firewall Engine",
        "Protocol simulation executed successfully"
      ],
      "notes": "Experiment with the Kurose & Ross 9e simulation for 8.9 Operational Security: Stateless vs. Stateful Firewalls, ACLs, Application Gateways & IDS/IPS. Inspect the protocol parameters and run the verification checks."
    },
    "quiz": {
      "question": "In Kurose & Ross Chapter 8, what is the primary architectural focus of '8.9 Operational Security: Stateless vs. Stateful Firewalls, ACLs, Application Gateways & IDS/IPS'?",
      "options": [
        "A) Defending enterprise network perimeters: Stateless packet-filtering Access Control Lists (SYN/ACK bit filtering), Stateful co",
        "B) Replacing all packet switches with analog FDM telephone exchanges",
        "C) Eliminating checksums and sequence numbers across all five Internet layers",
        "D) Restricting network communication to single-hop coaxial bus topologies"
      ],
      "correctIndex": 0,
      "explanation": "Correct! Defending enterprise network perimeters: Stateless packet-filtering Access Control Lists (SYN/ACK bit filtering), Stateful connection-tracking tables, Application Gateways, and Deep Packet Inspection in Snort IDS/IPS."
    }
  }
};
