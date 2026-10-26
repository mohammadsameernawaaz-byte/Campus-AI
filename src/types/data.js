// Initial seed data, university registries, and realistic academic materials for CampusAI

export const POPULAR_UNIVERSITIES = [
  "Jawaharlal Nehru Technological University (JNTU) Hyderabad",
  "Jawaharlal Nehru Technological University (JNTU) Kakinada",
  "Anna University, Chennai",
  "Visvesvaraya Technological University (VTU), Belagavi",
  "Osmania University, Hyderabad",
  "University of Mumbai",
  "Savitribai Phule Pune University (SPPU)",
  "Delhi University (DU)",
  "Indian Institute of Technology (IIT) Hyderabad",
  "Indian Institute of Technology (IIT) Bombay",
  "Indian Institute of Technology (IIT) Madras",
  "Indian Institute of Technology (IIT) Delhi",
  "National Institute of Technology (NIT) Warangal",
  "National Institute of Technology (NIT) Trichy",
  "International Institute of Information Technology (IIIT) Hyderabad",
  "BITS Pilani",
  "Vellore Institute of Technology (VIT)",
  "SRM Institute of Science and Technology",
  "Manipal Academy of Higher Education",
  "All India Institute of Medical Sciences (AIIMS) New Delhi",
  "Symbiosis International University",
  "Amity University"
];

export const DEGREE_BRANCHES = [
  "B.Tech - Computer Science & Engineering (CSE)",
  "B.Tech - AI & Machine Learning (CSE-AIML)",
  "B.Tech - Data Science (CSE-DS)",
  "B.Tech - Electronics & Communication Engineering (ECE)",
  "B.Tech - Electrical & Electronics Engineering (EEE)",
  "B.Tech - Information Technology (IT)",
  "B.Tech - Mechanical Engineering",
  "B.Tech - Civil Engineering",
  "BCA - Bachelor of Computer Applications",
  "MCA - Master of Computer Applications",
  "B.Sc - Computer Science",
  "B.Sc - Physical Sciences / Mathematics",
  "B.Com - General / Honours",
  "BBA - Bachelor of Business Administration",
  "MBA - Finance / Marketing / Analytics",
  "MBBS - Medicine and Surgery",
  "B.Pharm - Bachelor of Pharmacy",
  "M.Tech - Computer Science / VLSI / AI"
];

export const SEMESTER_OPTIONS = [
  "Semester 1 (Year 1)",
  "Semester 2 (Year 1)",
  "Semester 3 (Year 2)",
  "Semester 4 (Year 2)",
  "Semester 5 (Year 3)",
  "Semester 6 (Year 3)",
  "Semester 7 (Year 4)",
  "Semester 8 (Year 4)",
  "Postgraduate Year 1",
  "Postgraduate Year 2"
];

export const EXAM_PATTERNS = [
  {
    id: "jntuh-r22",
    name: "JNTU Hyderabad (JNTUH) R22 Regulation",
    shortName: "JNTUH R22",
    description: "Section A compulsory 2-mark definitions (10 questions = 20 marks), Section B choice-based 10-mark internal option problems (5 questions = 50 marks)."
  },
  {
    id: "anna-univ-2021",
    name: "Anna University Regulation 2021 (CBCS)",
    shortName: "Anna Univ 2021",
    description: "Part A short conceptual questions (10 x 2 = 20 marks), Part B analytical questions (5 x 13 = 65 marks), Part C comprehensive application problem (1 x 15 = 15 marks)."
  },
  {
    id: "vtu-2022",
    name: "VTU Belagavi 2022 Scheme (CBCS)",
    shortName: "VTU 2022",
    description: "5 syllabus modules with internal choice per module: Part A (3-mark to 6-mark sub-problems), Part B (10-mark comprehensive derivations), total 100 scaled to 50 marks."
  },
  {
    id: "osmania-cbcs",
    name: "Osmania University CBCS Examination Structure",
    shortName: "Osmania CBCS",
    description: "Part A short answer questions from all units (10 x 2 = 20 marks), Part B long analytical essay questions with internal choice (5 x 12 = 60 marks)."
  },
  {
    id: "mumbai-univ-cbcs",
    name: "University of Mumbai CBCS Pattern",
    shortName: "Mumbai Univ CBCS",
    description: "Question 1 compulsory mixed 5-mark short questions (20 marks), Questions 2 to 6 with choice (4 x 20 = 80 marks total)."
  },
  {
    id: "sppu-pune",
    name: "Savitribai Phule Pune University (SPPU) End-Sem",
    shortName: "SPPU End-Sem",
    description: "Unit-wise paired questions with internal OR options (15 marks per unit x 4 units = 60 marks)."
  },
  {
    id: "autonomous-custom",
    name: "Autonomous College Custom Blueprint",
    shortName: "Autonomous Pattern",
    description: "Flexible academic structure calibrated to autonomous institution syllabus outcomes (2-Mark, 5-Mark, and 10-Mark distributions)."
  },
  {
    id: "general-university",
    name: "General University Standard Blueprint",
    shortName: "Standard University",
    description: "Standard collegiate distribution covering 2-mark definitions, 5-mark analytical workflows, and 10-mark essay derivations."
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    name: "Data Structures Notes.pdf",
    subject: "Computer Science and Engineering",
    unit: "Unit 1 to 4: Linear & Non-Linear Structures",
    examPattern: "JNTU Hyderabad (JNTUH) R22 Regulation",
    size: "4.2 MB",
    uploadedAt: "2026-10-20T10:30:00Z",
    pageCount: 48,
    fileType: "pdf",
    status: "Processed",
    summary: {
      brief: "Core fundamentals of linear and non-linear data structures covering asymptotic notation, array operations, singly and doubly linked lists, stack evaluation, queue variants, binary search trees (BST), balanced AVL rotations, graph traversals (BFS, DFS), and comparative algorithmic complexity.",
      detailed: "Comprehensive curriculum coverage across four syllabus modules:\n1. Analysis of Algorithms: Big O, Omega, and Theta notations with best, average, and worst-case criteria.\n2. Linear Structures: Array memory indexing, dynamic arrays, singly linked list node insertion and deletion at head/tail/kth position, doubly linked lists with forward and backward pointers, circular queues overcoming standard queue overflow, and postfix evaluation using stacks.\n3. Trees and Hierarchies: Binary tree properties, full vs complete trees, recursive binary search tree traversals (Inorder, Preorder, Postorder), AVL tree balancing through LL, RR, LR, and RL rotations.\n4. Graphs and Searching: Adjacency matrix vs adjacency list representations, Breadth-First Search using queues, Depth-First Search using recursion or stacks, Dijkstra's single-source shortest path, and minimum spanning trees using Prim and Kruskal algorithms.",
      examCram: "Crucial Exam Takeaways:\n- Inorder traversal of a BST always yields sorted keys.\n- AVL tree height is strictly bounded by 1.44 log2(N).\n- Hash collisions are resolved via Chaining or Open Addressing (Linear Probing, Quadratic Probing, Double Hashing).\n- Dijkstra fails with negative edge weights; use Bellman-Ford instead.\n- Stack is LIFO (function calls, postfix); Queue is FIFO (CPU scheduling, BFS).",
      keyDefinitions: [
        { term: "Asymptotic Notation", definition: "Mathematical tool to represent time and space complexity of algorithms as input size approaches infinity." },
        { term: "AVL Tree", definition: "A self-balancing binary search tree where the difference between heights of left and right subtrees for any node cannot exceed 1." },
        { term: "Topological Sort", definition: "A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u to v, vertex u comes before v." },
        { term: "Hash Table Load Factor", definition: "The ratio of stored elements to total table capacity (alpha = n / m), determining when resizing is triggered." }
      ],
      formulas: [
        { title: "Binary Tree Maximum Nodes at Level i", formula: "2^i (assuming root is level 0)" },
        { title: "Maximum Nodes in Binary Tree of Height h", formula: "2^(h + 1) - 1" },
        { title: "AVL Balance Factor", formula: "Height(Left Subtree) - Height(Right Subtree) in {-1, 0, +1}" },
        { title: "Binary Heap Parent and Child Index (1-based)", formula: "Parent = floor(i/2), Left = 2i, Right = 2i + 1" }
      ]
    },
    questions: [
      {
        id: "q-1-1",
        type: "2-Mark",
        question: "Define Balance Factor in an AVL Tree and state its allowable values.",
        answer: "Balance Factor of a node is defined as the height of its left subtree minus the height of its right subtree: BF = Height(Left) - Height(Right). An AVL tree maintains BF in {-1, 0, +1} for every node."
      },
      {
        id: "q-1-2",
        type: "2-Mark",
        question: "Differentiate between Singly Linked List and Doubly Linked List in terms of memory overhead and traversal capability.",
        answer: "A Singly Linked List allocates one pointer (next) per node and permits unidirectional traversal. A Doubly Linked List allocates two pointers (prev and next) per node, introducing extra pointer storage overhead while enabling bidirectional traversal and O(1) predecessor deletion."
      },
      {
        id: "q-1-3",
        type: "5-Mark",
        question: "Explain the algorithm to convert an Infix expression to Postfix format using an explicit Stack data structure.",
        answer: "Algorithm:\n1. Initialize an empty operator stack and empty postfix output string.\n2. Scan tokens from left to right.\n3. If token is an operand, append to postfix output.\n4. If token is '(', push onto stack.\n5. If token is ')', pop from stack to output until '(' is encountered; discard '('.\n6. If token is an operator: while stack is non-empty and top operator has greater or equal precedence, pop to output; then push current operator.\n7. Pop any remaining operators onto the output string."
      },
      {
        id: "q-1-4",
        type: "10-Mark",
        question: "Describe Dijkstra's algorithm for single-source shortest paths on a directed weighted graph. Provide time complexity analysis using Adjacency List with Min-Heap vs Adjacency Matrix.",
        answer: "Dijkstra's Algorithm Overview:\n1. Assign distance value 0 to the source vertex and infinity to all other vertices. Initialize an empty visited set.\n2. While unvisited vertices exist, pick the vertex u with minimum distance.\n3. Mark u as visited.\n4. Update distance of all unvisited neighbors v: if dist[u] + weight(u, v) < dist[v], set dist[v] = dist[u] + weight(u, v).\n\nComplexity Analysis:\n- With Adjacency Matrix: Finding minimum takes O(V), repeated V times -> O(V^2). Edge relaxation takes O(V^2).\n- With Adjacency List and Binary Min-Heap: Extract-Min takes O(log V) for V vertices -> O(V log V). Decrease-Key takes O(log V) for E edges -> O(E log V). Total time: O((V + E) log V). Highly superior for sparse graphs where E << V^2."
      }
    ],
    quiz: [
      {
        id: "qz-1-1",
        question: "What is the worst-case time complexity of searching an element in an unbalanced Binary Search Tree?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctIndex: 2,
        explanation: "When elements are inserted in already sorted order, a binary search tree degenerates into a linear linked list of height n, making lookup O(n)."
      },
      {
        id: "qz-1-2",
        question: "Which data structure is fundamentally utilized to implement Breadth-First Search (BFS) in a graph?",
        options: ["Stack", "Queue", "Priority Queue", "Circular Array"],
        correctIndex: 1,
        explanation: "BFS explores neighboring vertices level by level, requiring a FIFO Queue to ensure closer vertices are dequeued and examined first."
      },
      {
        id: "qz-1-3",
        question: "In an AVL tree, which double rotation is applied when an insertion occurs in the left subtree of the right child?",
        options: ["Left-Left (LL)", "Right-Right (RR)", "Right-Left (RL)", "Left-Right (LR)"],
        correctIndex: 2,
        explanation: "A Right-Left (RL) rotation consists of a right rotation on the child followed by a left rotation on the unbalanced parent."
      }
    ],
    viva: [
      {
        id: "v-1-1",
        question: "Why does QuickSort perform poorly on already sorted arrays when the first element is selected as pivot?",
        expectedAnswer: "Choosing the first element on a sorted array results in completely unbalanced partitions of size 0 and n-1 at each step. This yields recursion depth n and total comparison count n*(n-1)/2, degrading time complexity to O(n^2). Randomized pivot or median-of-three selection mitigates this issue.",
        confidence: null
      },
      {
        id: "v-1-2",
        question: "What is the space complexity of Depth-First Search on a graph with V vertices and maximum depth D?",
        expectedAnswer: "DFS requires O(D) stack space proportional to the maximum recursion depth, which is O(V) in the worst case for a linear path. Unlike BFS, it does not store an entire breadth layer in memory.",
        confidence: null
      }
    ],
    flashcards: [
      {
        id: "fc-1-1",
        front: "What is the average and worst case time complexity of QuickSort?",
        back: "Average Case: O(n log n)\nWorst Case: O(n^2) when partitions are maximally skewed.",
        tag: "Algorithms"
      },
      {
        id: "fc-1-2",
        front: "State the primary condition under which Dijkstra algorithm fails.",
        back: "Dijkstra fails when the graph contains negative edge weights because it greedily assumes once a vertex is visited, its shortest distance cannot decrease.",
        tag: "Graphs"
      },
      {
        id: "fc-1-3",
        front: "How do you detect a cycle in a Singly Linked List with O(1) space?",
        back: "Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare): maintain two pointers where the slow pointer advances 1 step and the fast pointer advances 2 steps. If they meet, a cycle exists.",
        tag: "Linked Lists"
      }
    ]
  },
  {
    id: "doc-2",
    name: "Operating Systems - PPT.pptx",
    subject: "Computer Systems Engineering",
    unit: "Unit 3: Process Scheduling, Synchronization & Deadlocks",
    examPattern: "Anna University Regulation 2021 (CBCS)",
    size: "6.8 MB",
    uploadedAt: "2026-10-22T14:15:00Z",
    pageCount: 62,
    fileType: "pptx",
    status: "Processed",
    summary: {
      brief: "Analysis of modern OS process state transitions, preemptive and non-preemptive CPU scheduling metrics, race conditions, critical section solutions via semaphores and mutexes, and deadlock handling strategies.",
      detailed: "Curriculum highlights:\n1. Process Management: Process Control Block (PCB) structure, context switching mechanics, CPU burst cycles, and multilevel feedback queues.\n2. CPU Scheduling: FCFS, Shortest Job First (SJF), Shortest Remaining Time First (SRTF), Priority Scheduling with aging to prevent starvation, and Round Robin (RR) quantum tuning.\n3. Process Synchronization: Peterson's algorithm, hardware atomic instructions (TestAndSet, CompareAndSwap), binary and counting semaphores, producer-consumer problem, dining philosophers problem, and readers-writers synchronization.\n4. Deadlocks: The four Coffman conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait), Resource Allocation Graphs (RAG), Banker's algorithm for deadlock avoidance, and detection/recovery techniques.",
      examCram: "Crucial Exam Takeaways:\n- Context switch time is pure overhead; the CPU performs no productive computation during this phase.\n- Round Robin performance depends on time quantum q: if q is extremely large, RR degenerates into FCFS; if q is too small, context switch overhead dominates.\n- Banker's algorithm requires advance knowledge of maximum resource demands for each process.\n- Counting semaphores have integer values unrestricted in domain; binary semaphores are restricted to 0 and 1.",
      keyDefinitions: [
        { term: "Critical Section", definition: "A segment of code where shared resources such as memory, files, or variables are accessed, requiring mutual exclusion." },
        { term: "Deadlock", definition: "A state where every process in a set is waiting for an event that can only be caused by another process in that same set." },
        { term: "Convoy Effect", definition: "A performance phenomenon where short processes wait behind a long CPU-intensive process in FCFS scheduling." },
        { term: "Banker's Algorithm", definition: "A deadlock avoidance algorithm developed by Edsger Dijkstra that tests safety by simulating allocation of predetermined maximum resources." }
      ],
      formulas: [
        { title: "Turnaround Time (TAT)", formula: "Completion Time - Arrival Time" },
        { title: "Waiting Time (WT)", formula: "Turnaround Time - Burst Time" },
        { title: "Banker's Need Matrix", formula: "Need[i][j] = Max[i][j] - Allocation[i][j]" },
        { title: "Safe State Condition", formula: "Need[i] <= Available Vector for candidate process P_i" }
      ]
    },
    questions: [
      {
        id: "q-2-1",
        type: "2-Mark",
        question: "State the four necessary Coffman conditions required for a deadlock to occur.",
        answer: "The four Coffman conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, and 4. Circular Wait. All four conditions must hold simultaneously for a deadlock to occur."
      },
      {
        id: "q-2-2",
        type: "2-Mark",
        question: "What is the difference between Starvation and Deadlock?",
        answer: "Deadlock is a permanent state where two or more processes are blocked indefinitely waiting on each other's resources. Starvation is indefinite delay where a process is capable of running but repeatedly denied CPU access due to higher-priority processes."
      },
      {
        id: "q-2-3",
        type: "5-Mark",
        question: "Explain how Counting Semaphores solve the Bounded Buffer Producer-Consumer problem.",
        answer: "Implementation uses three semaphores:\n1. 'mutex' initialized to 1 for mutual exclusion over buffer manipulation.\n2. 'empty' initialized to N (buffer capacity) representing available slots.\n3. 'full' initialized to 0 representing filled slots.\nProducer executes wait(empty), wait(mutex), writes item, signal(mutex), signal(full).\nConsumer executes wait(full), wait(mutex), reads item, signal(mutex), signal(empty).\nThis guarantees zero buffer overflow and zero consumer reads from empty buffers."
      },
      {
        id: "q-2-4",
        type: "10-Mark",
        question: "Explain Banker's Algorithm for deadlock avoidance with safety algorithm steps and resource request evaluation.",
        answer: "Banker's Algorithm uses Available vector, Max matrix, Allocation matrix, and Need matrix (Need = Max - Allocation).\n\nSafety Algorithm:\n1. Let Work = Available and Finish[i] = false for all processes.\n2. Find an index i such that Finish[i] == false and Need[i] <= Work. If no such i exists, go to step 4.\n3. Set Work = Work + Allocation[i], Finish[i] = true, and loop back to step 2.\n4. If Finish[i] == true for all i, system is in a safe state; otherwise unsafe.\n\nResource-Request Algorithm:\nWhen process Pi requests Request[i]:\n1. If Request[i] <= Need[i], proceed; otherwise throw error.\n2. If Request[i] <= Available, pretend to allocate resources:\n   Available = Available - Request[i]\n   Allocation[i] = Allocation[i] + Request[i]\n   Need[i] = Need[i] - Request[i]\n3. Run safety check: if safe, complete allocation; if unsafe, rollback and process Pi must wait."
      }
    ],
    quiz: [
      {
        id: "qz-2-1",
        question: "Which CPU scheduling algorithm can lead to indefinite starvation of low-priority processes?",
        options: ["First-Come First-Served (FCFS)", "Round Robin (RR)", "Strict Priority Scheduling", "Shortest Remaining Time First (SRTF) with Aging"],
        correctIndex: 2,
        explanation: "Strict priority scheduling will continually grant the CPU to higher-priority processes, completely starving low-priority jobs unless aging is applied."
      },
      {
        id: "qz-2-2",
        question: "If a system has 3 processes each requesting 2 units of a single resource type, what is the minimum number of resources to prevent deadlock?",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        explanation: "Formula: Sum of (Max - 1) + 1 = 3 * (2 - 1) + 1 = 3 + 1 = 4. With 4 resources, at least one process gets 2 units, finishes, and releases its allocation."
      }
    ],
    viva: [
      {
        id: "v-2-1",
        question: "Can Peterson's solution guarantee mutual exclusion on modern multicore architectures? Why or why not?",
        expectedAnswer: "Peterson's solution is not guaranteed on modern superscalar/multicore processors due to compiler optimizations and out-of-order memory execution (memory reordering). Architectural memory barriers or hardware atomic instructions like CompareAndSwap are necessary.",
        confidence: null
      }
    ],
    flashcards: [
      {
        id: "fc-2-1",
        front: "What is Thrashing in Virtual Memory?",
        back: "A state where the operating system spends more time servicing page faults and swapping pages in and out than executing productive instructions.",
        tag: "Memory"
      },
      {
        id: "fc-2-2",
        front: "What are the two atomic operations permitted on a Semaphore S?",
        back: "wait(S) or P(S): decrements S, blocks if S <= 0.\nsignal(S) or V(S): increments S, unblocks a waiting process.",
        tag: "Synchronization"
      }
    ]
  },
  {
    id: "doc-3",
    name: "Previous Year Question Paper.pdf",
    subject: "University Semester Examination",
    unit: "Comprehensive Exam: Units 1 to 5 Model Papers",
    examPattern: "VTU Belagavi 2022 Scheme (CBCS)",
    size: "2.1 MB",
    uploadedAt: "2026-10-24T09:00:00Z",
    pageCount: 12,
    fileType: "pdf",
    status: "Processed",
    summary: {
      brief: "Compilation of high-weightage final examination questions across 2023, 2024, and 2025 university question papers with recurring patterns in algorithms, memory management, and database schemas.",
      detailed: "Analysis of recurring exam question trends:\n- 40% Weightage: Algorithmic complexity, tree rotations, graph path calculations, and dynamic programming paradigms.\n- 35% Weightage: Operating system deadlocks, CPU scheduling timelines (Gantt charts), and semaphore solutions.\n- 25% Weightage: Database normal forms (1NF to BCNF), indexing structures (B+ Trees), and ACID transaction anomalies.\nConsistent 10-mark questions appear every year on Dijkstra's algorithm, Banker's safety state evaluation, and B+ Tree node splitting.",
      examCram: "High Probability Exam Patterns:\n- Section A contains compulsory 2-mark definitions on AVL Balance Factor, Coffman conditions, and ACID properties.\n- Section B always includes a 10-mark numerical question on Banker's Algorithm with a given Allocation/Max matrix.\n- Prepare Gantt chart drawing for Round Robin with quantum = 2ms vs SRTF.",
      keyDefinitions: [
        { term: "External Fragmentation", definition: "A condition where total free memory exceeds a process request, but storage is fragmented into non-contiguous slices." },
        { term: "Strict 2-Phase Locking", definition: "Concurrency control protocol where all exclusive locks obtained by a transaction must be held until transaction commit." }
      ],
      formulas: [
        { title: "Page Table Size", formula: "(Number of Pages) * (Page Table Entry Size)" },
        { title: "Effective Memory Access Time (EMAT)", formula: "Hit_Ratio * (TLB_access + RAM_access) + (1 - Hit_Ratio) * (TLB_access + 2 * RAM_access)" }
      ]
    },
    questions: [
      {
        id: "q-3-1",
        type: "2-Mark",
        question: "Define Belady's Anomaly and name one page replacement algorithm that exhibits it.",
        answer: "Belady's Anomaly is the counter-intuitive phenomenon where increasing the number of physical page frames results in an increase in the number of page faults. It is exhibited by First-In First-Out (FIFO) page replacement."
      },
      {
        id: "q-3-2",
        type: "5-Mark",
        question: "Given page references: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3 with 3 frames, calculate total page faults using Least Recently Used (LRU).",
        answer: "Step-by-step LRU execution across 10 accesses with 3 frames results in 7 total page faults and 3 page hits (at index 4 for '0', index 6 for '0', and index 9 for '3')."
      },
      {
        id: "q-3-3",
        type: "10-Mark",
        question: "Explain the structure of a B+ Tree index. Describe node search, insertion, and splitting operations. Why are B+ Trees preferred over B Trees in database storage engines?",
        answer: "B+ Tree Properties:\n1. All actual data records or record pointers reside exclusively in leaf nodes.\n2. Leaf nodes are linked contiguously in a doubly-linked list, enabling fast sequential range scans.\n3. Internal nodes contain only indexing keys and child pointers, maximizing fan-out.\n\nSearch and Split Mechanics:\n- Search navigates internal routing keys from root to leaf in O(log_B N) I/O reads.\n- When inserting into a leaf that exceeds capacity M, the node splits into two halves of size ceil(M/2), and the middle key is copied up into the parent.\n\nWhy Preferred Over B Trees:\n- Higher fan-out per disk page: Internal nodes don't store record pointers, allowing more keys per page and shallower tree depth.\n- Range query efficiency: Range queries merely traverse leaf pointers sequentially without expensive in-order tree traversals.\n- Predictable lookup: Every record search traverses identical root-to-leaf depth."
      }
    ],
    quiz: [
      {
        id: "qz-3-1",
        question: "Which page replacement algorithm is immune to Belady's Anomaly?",
        options: ["FIFO", "Optimal Page Replacement (OPT)", "Least Recently Used (LRU)", "Both OPT and LRU"],
        correctIndex: 3,
        explanation: "Both OPT and LRU belong to the class of 'Stack Algorithms' where the set of pages in an n-frame allocation is always a strict subset of an (n+1)-frame allocation."
      }
    ],
    viva: [
      {
        id: "v-3-1",
        question: "What is the primary difference between Clustered and Non-Clustered indexing in relational databases?",
        expectedAnswer: "A clustered index dictates the physical sorting order of rows on disk, so a table can have only one clustered index. A non-clustered index creates a separate structure storing keys and pointers back to the physical data rows, allowing multiple non-clustered indexes per table.",
        confidence: null
      }
    ],
    flashcards: [
      {
        id: "fc-3-1",
        front: "What is the formula for Effective Memory Access Time (EMAT) with TLB?",
        back: "EMAT = h * (t_tlb + t_ram) + (1 - h) * (t_tlb + 2 * t_ram)\nwhere h is the TLB hit ratio.",
        tag: "Memory"
      }
    ]
  }
];

export const INITIAL_STUDY_PLANS = [
  {
    id: "sp-1",
    title: "End-Semester Computer Science Examination",
    targetDate: "2026-11-15",
    subject: "Data Structures & Operating Systems",
    status: "Active",
    tasks: [
      { id: "t-1", day: "Day 1", task: "Review Unit 1 Asymptotic Notation and Master Theorem", completed: true },
      { id: "t-2", day: "Day 2", task: "Practice Linked List reversal and cycle detection problems", completed: true },
      { id: "t-3", day: "Day 3", task: "Solve AVL Tree rotation numericals and balance factor drills", completed: true },
      { id: "t-4", day: "Day 4", task: "Master Dijkstra and Prim-Kruskal graph algorithms", completed: false },
      { id: "t-5", day: "Day 5", task: "Study Process Synchronization and Peterson algorithm", completed: false },
      { id: "t-6", day: "Day 6", task: "Complete Banker algorithm 10-mark safety check numericals", completed: false },
      { id: "t-7", day: "Day 7", task: "Solve 2024 and 2025 past year question papers under 3-hour timer", completed: false },
      { id: "t-8", day: "Day 8", task: "Final oral viva simulation and flashcards review", completed: false }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Study Material Processed",
    message: "Operating Systems - PPT.pptx has been parsed. Summaries, 2-mark & 10-mark questions, and flashcards are ready.",
    time: "2 hours ago",
    read: false,
    type: "upload"
  },
  {
    id: "notif-2",
    title: "Exam Study Plan Reminder",
    message: "Day 4 task pending: Master Dijkstra and Prim-Kruskal graph algorithms.",
    time: "5 hours ago",
    read: false,
    type: "study-plan"
  },
  {
    id: "notif-3",
    title: "New Quiz Available",
    message: "Take the 10-question practice test on Process Synchronization.",
    time: "1 day ago",
    read: true,
    type: "quiz"
  }
];

export const INITIAL_QUIZ_HISTORY = [
  {
    id: "qh-1",
    title: "Data Structures Diagnostic Quiz",
    documentName: "Data Structures Notes.pdf",
    score: 85,
    totalQuestions: 10,
    date: "2026-10-23",
    weakTopics: ["AVL Rotations (Right-Left)"]
  },
  {
    id: "qh-2",
    title: "Process Scheduling & Deadlocks Test",
    documentName: "Operating Systems - PPT.pptx",
    score: 90,
    totalQuestions: 10,
    date: "2026-10-24",
    weakTopics: ["Peterson Solution Reordering"]
  }
];

export const INITIAL_CHAT_THREADS = [
  {
    id: "thread-1",
    title: "Peterson Algorithm & Critical Section Proof",
    pinned: true,
    createdAt: "2026-10-25T14:30:00.000Z",
    updatedAt: "2026-10-25T14:35:00.000Z",
    scope: "grounded",
    attachedDocIds: ["doc-2"],
    format: "University Exam Format (2M / 5M / 10M)",
    messages: [
      {
        id: "m-1-1",
        role: "user",
        content: "Explain Peterson algorithm for critical section problem and provide the 10-mark examination proof showing mutual exclusion, progress, and bounded waiting.",
        timestamp: "2:30 PM",
        attachments: ["Operating Systems - PPT.pptx"]
      },
      {
        id: "m-1-2",
        role: "assistant",
        content: `### Peterson Solution for Two-Process Critical Section Problem

**University Marking Blueprint (10-Mark Breakdown):**
- Definition and Shared Variables: 2 Marks
- Algorithmic Structure (Entry/Exit Sections): 3 Marks
- Mathematical Invariant Proof: 4 Marks
- Modern Hardware Limitation Note: 1 Mark

---

#### 1. Fundamental Definition and Shared State
Peterson solution is a classic software-based synchronization primitive that guarantees mutual exclusion for two concurrent processes, denoted $P_0$ and $P_1$.

\`\`\`c
// Shared Global Variables
boolean flag[2]; // flag[i] = true indicates Pi is ready to enter CS
int turn;        // turn = j indicates it is Pj's turn to enter CS
\`\`\`

---

#### 2. Process Structure ($P_i$ and $P_j$ where $j = 1 - i$)

\`\`\`c
do {
    flag[i] = true;
    turn = j;
    while (flag[j] && turn == j);
    
    // CRITICAL SECTION
    // Access shared memory/file resource
    
    flag[i] = false;
    
    // REMAINDER SECTION
} while (true);
\`\`\`

---

#### 3. Formal Three-Criteria Proof

| Requirement | Proof Argument | Verdict |
| :--- | :--- | :--- |
| **Mutual Exclusion** | $P_i$ can enter CS only if \`flag[j] == false\` or \`turn == i\`. If both try simultaneously, \`turn\` will hold the last written value. The process whose write completed second gets blocked in the while loop. | **Satisfied** |
| **Progress** | A process outside the CS has \`flag == false\`, which immediately unblocks the other process from the while loop. | **Satisfied** |
| **Bounded Waiting** | Once $P_j$ leaves CS, it resets \`flag[j] = false\`. If it wants to re-enter, it must set \`turn = i\`, ensuring $P_i$ enters next. | **Satisfied** |

---

#### 4. University Exam Conclusion
On modern out-of-order processors and multi-core architectures, Peterson algorithm requires explicit memory barrier instructions (e.g., \`mfence\` or \`std::atomic_thread_fence\`) to prevent compiler instruction reordering.`,
        timestamp: "2:31 PM",
        format: "University Exam Format (2M / 5M / 10M)",
        sources: ["Operating Systems - PPT.pptx, Unit 2: Process Synchronization, Slide 18"]
      }
    ]
  },
  {
    id: "thread-2",
    title: "Master Theorem & Recurrence Relations",
    pinned: false,
    createdAt: "2026-10-25T18:10:00.000Z",
    updatedAt: "2026-10-25T18:15:00.000Z",
    scope: "universal",
    attachedDocIds: [],
    format: "Explain Like I Am a Beginner",
    messages: [
      {
        id: "m-2-1",
        role: "user",
        content: "How does the Master Theorem work for solving divide and conquer recurrence relations? Give an intuitive explanation.",
        timestamp: "6:10 PM",
        attachments: []
      },
      {
        id: "m-2-2",
        role: "assistant",
        content: `### Understanding the Master Theorem: Intuitive Guide

Imagine you are managing a large construction project with $n$ bricks. Instead of doing everything alone, you divide the job into smaller teams.

The recurrence looks like this:
$$T(n) = a \\cdot T(n / b) + f(n)$$

- **$a$**: Number of smaller sub-problems you create.
- **$b$**: How much smaller each sub-problem is (scale factor).
- **$f(n)$**: The work you do locally to split the task and combine results.

---

### The Three Master Cases (The Tug-of-War)

Think of it as a competition between **Sub-problem Creation Work** ($n^{\\log_b a}$) versus **Combining Work** ($f(n)$):

1. **Case 1 (Sub-problems Dominate):**
   - If splitting creates too many leaves and $n^{\\log_b a} > f(n)$, the bottom leaves do all the work.
   - Result: $T(n) = \\Theta(n^{\\log_b a})$.
   - Example: Strassen Matrix Multiplication.

2. **Case 2 (Perfect Balance):**
   - If splitting work matches combining work ($f(n) = \\Theta(n^{\\log_b a})$), every level of the tree does the exact same amount of work.
   - Result: $T(n) = \\Theta(n^{\\log_b a} \\cdot \\log n)$.
   - Example: Merge Sort: $T(n) = 2T(n/2) + O(n) \\implies \\Theta(n \\log n)$.

3. **Case 3 (Top Level Dominates):**
   - If combining work $f(n)$ is overwhelmingly larger than the subproblems, the root does almost all the computation.
   - Result: $T(n) = \\Theta(f(n))$.`,
        timestamp: "6:12 PM",
        format: "Explain Like I Am a Beginner",
        sources: ["Universal Algorithms Knowledge Base"]
      }
    ]
  },
  {
    id: "thread-3",
    title: "Banker Algorithm 10-Mark Numerical",
    pinned: false,
    createdAt: "2026-10-24T11:00:00.000Z",
    updatedAt: "2026-10-24T11:20:00.000Z",
    scope: "grounded",
    attachedDocIds: ["doc-2"],
    format: "University Exam Format (2M / 5M / 10M)",
    messages: [
      {
        id: "m-3-1",
        role: "user",
        content: "Walk through a complete Banker Algorithm safe state calculation with 5 processes (P0-P4) and 3 resource types (A, B, C).",
        timestamp: "11:00 AM",
        attachments: ["Operating Systems - PPT.pptx"]
      },
      {
        id: "m-3-2",
        role: "assistant",
        content: `### Banker Deadlock Avoidance Algorithm: Step-by-Step Safe State Solution

**Standard Exam Problem Data:**
- 5 Processes: $P_0, P_1, P_2, P_3, P_4$
- 3 Resource Types: $A (10), B (5), C (7)$
- **Available Vector:** $[3, 3, 2]$

#### 1. Calculation of Need Matrix
$$\\text{Need}[i] = \\text{Max}[i] - \\text{Allocation}[i]$$

| Process | Allocation (A B C) | Max (A B C) | Need (A B C) |
| :--- | :--- | :--- | :--- |
| **P0** | 0 1 0 | 7 5 3 | **7 4 3** |
| **P1** | 2 0 0 | 3 2 2 | **1 2 2** |
| **P2** | 3 0 2 | 9 0 2 | **6 0 0** |
| **P3** | 2 1 1 | 2 2 2 | **0 1 1** |
| **P4** | 0 0 2 | 4 3 3 | **4 3 1** |

---

#### 2. Safety Execution Sequence

- **Step 1:** Compare Available $[3, 3, 2]$ with $P_0$ Need $[7, 4, 3]$: Cannot satisfy ($7 > 3$).
- **Step 2:** Check $P_1$ Need $[1, 2, 2] \\le [3, 3, 2]$: **Satisfied!**
  - New Available = $[3, 3, 2] + [2, 0, 0] = [5, 3, 2]$. $P_1$ completes.
- **Step 3:** Check $P_3$ Need $[0, 1, 1] \\le [5, 3, 2]$: **Satisfied!**
  - New Available = $[5, 3, 2] + [2, 1, 1] = [7, 4, 3]$. $P_3$ completes.
- **Step 4:** Check $P_4$ Need $[4, 3, 1] \\le [7, 4, 3]$: **Satisfied!**
  - New Available = $[7, 4, 3] + [0, 0, 2] = [7, 4, 5]$. $P_4$ completes.
- **Step 5:** Check $P_0$ Need $[7, 4, 3] \\le [7, 4, 5]$: **Satisfied!**
  - New Available = $[7, 4, 5] + [0, 1, 0] = [7, 5, 5]$. $P_0$ completes.
- **Step 6:** Check $P_2$ Need $[6, 0, 0] \\le [7, 5, 5]$: **Satisfied!**
  - New Available = $[7, 5, 5] + [3, 0, 2] = [10, 5, 7]$. $P_2$ completes.

---

#### 3. Formal Examination Conclusion
The system is in a **SAFE STATE**.
The safe execution sequence is:
$$\\langle P_1, P_3, P_4, P_0, P_2 \\rangle$$
All processes terminate without deadlock risks.`,
        timestamp: "11:03 AM",
        format: "University Exam Format (2M / 5M / 10M)",
        sources: ["Operating Systems - PPT.pptx, Unit 3: Deadlocks, Slide 24"]
      }
    ]
  }
];

