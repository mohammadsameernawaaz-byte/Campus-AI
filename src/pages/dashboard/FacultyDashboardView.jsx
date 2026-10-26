import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EXAM_PATTERNS } from '../../types/data';
import {
  BookOpen,
  Award,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  Copy,
  Trash2,
  Calendar,
  ArrowRight,
  FileText,
  Eye,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const FacultyDashboardView = () => {
  const { user, navigate } = useApp();

  // Faculty State
  const [subject, setSubject] = useState('CS601: Operating Systems & System Programming');
  const [blueprint, setBlueprint] = useState(user?.examPattern || 'JNTU Hyderabad (JNTUH) R22 Regulation');
  const [examType, setExamType] = useState('End-Semester Examination (70 Marks)');
  const [twoMarkCount, setTwoMarkCount] = useState(10);
  const [fiveMarkCount, setFiveMarkCount] = useState(4);
  const [tenMarkCount, setTenMarkCount] = useState(3);
  const [difficulty, setDifficulty] = useState('Standard University Examination');
  const [includeRubrics, setIncludeRubrics] = useState(true);
  const [showSolutions, setShowSolutions] = useState(true);

  // Generation & Feedback State
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState('');
  const [activeGeneratedPaper, setActiveGeneratedPaper] = useState(null);

  // Live Metrics & Bank State
  const [questionBanksCount, setQuestionBanksCount] = useState(18);
  const [examsGeneratedCount, setExamsGeneratedCount] = useState(34);

  // Initial Curated Exam Papers Table
  const [generatedPapers, setGeneratedPapers] = useState([
    {
      id: 'paper-1',
      subject: 'CS601: Operating Systems & System Programming',
      title: 'End-Semester Final Examination 2026',
      blueprint: 'JNTUH R22 Regulation',
      breakdown: '10x 2M, 4x 5M, 3x 10M',
      totalMarks: 70,
      createdAt: '2026-10-24',
      status: 'Finalized'
    },
    {
      id: 'paper-2',
      subject: 'CS402: Database Management Systems',
      title: 'Mid-Term Assessment II',
      blueprint: 'Anna University 2021 CBCS',
      breakdown: '5x 2M, 2x 5M, 1x 10M',
      totalMarks: 30,
      createdAt: '2026-10-20',
      status: 'Approved'
    },
    {
      id: 'paper-3',
      subject: 'CS503: Computer Networks & Protocol Engineering',
      title: 'Comprehensive Pre-University Mock',
      blueprint: 'VTU 2022 Scheme',
      breakdown: '10x 2M, 6x 5M, 2x 10M',
      totalMarks: 70,
      createdAt: '2026-10-15',
      status: 'Finalized'
    }
  ]);

  const [currentDate] = useState(() => new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // Generator Handler
  const handleGeneratePaper = () => {
    setIsGenerating(true);
    setSaveFeedback('');

    setTimeout(() => {
      const totalMarksCalculated = (twoMarkCount * 2) + (fiveMarkCount * 5) + (tenMarkCount * 10);

      // Procedural generator conforming to academic course outcomes
      const generatedPartA = Array.from({ length: twoMarkCount }).map((_, i) => {
        const questionsList = [
          { q: "Define the distinction between monolithic kernels and microkernels. State one specific advantage of each.", a: "A monolithic kernel runs all OS services (VFS, IPC, drivers, scheduler) in a single kernel address space for maximum execution speed. A microkernel runs only bare primitives (IPC, basic memory, thread management) in kernel space, executing drivers and filesystems as isolated user daemons, providing fault tolerance and memory isolation.", co: "CO1", bloom: "L1 (Remember)" },
          { q: "Explain the Critical Section Problem. State the three mandatory requirements to solve it.", a: "A critical section is a code block accessing shared mutable data. Requirements: 1. Mutual Exclusion (at most one process in CS). 2. Progress (selection of next entrant cannot be indefinitely postponed). 3. Bounded Waiting (limit on times other processes enter before a pending request enters).", co: "CO2", bloom: "L2 (Understand)" },
          { q: "State Belady's Anomaly. Which fundamental page replacement algorithm is immune to it?", a: "Belady's Anomaly is the phenomenon where allocating more page frames to a process increases the number of page faults. It occurs in FIFO. Stack algorithms like LRU and Optimal Page Replacement are mathematically proven immune.", co: "CO3", bloom: "L2 (Understand)" },
          { q: "Define thrashing. How does Peter Denning's working-set model prevent it?", a: "Thrashing occurs when a process spends more time paging (swapping pages in/out) than executing code because its resident set is smaller than its working set. The working-set model tracks pages referenced in the last Delta time window and only admits processes if available frames >= sum of working sets.", co: "CO3", bloom: "L2 (Understand)" },
          { q: "What is the Translation Lookaside Buffer (TLB)? Define Effective Memory Access Time (EMAT).", a: "TLB is high-speed associative hardware cache storing virtual-to-physical page frame translations. EMAT = HitRatio * (TLB_access + RAM_access) + (1 - HitRatio) * (TLB_access + 2 * RAM_access) in single-level paging.", co: "CO4", bloom: "L2 (Understand)" },
          { q: "Compare preemptive versus non-preemptive CPU scheduling. State one trade-off.", a: "In preemptive scheduling, the OS kernel can interrupt a running process (e.g. on timer interrupt or higher priority arrival). In non-preemptive scheduling, a process yields only on termination or I/O. Preemptive offers lower response latency but incurs context switch overhead and race conditions.", co: "CO1", bloom: "L2 (Understand)" },
          { q: "State the four Coffman conditions necessary for deadlock to manifest.", a: "1. Mutual Exclusion (non-shareable resources). 2. Hold and Wait (process holds one resource while awaiting another). 3. No Preemption (resources cannot be forcibly reclaimed). 4. Circular Wait (a closed chain of processes each waiting for resource held by next).", co: "CO2", bloom: "L1 (Remember)" },
          { q: "Explain the difference between internal and external fragmentation.", a: "Internal fragmentation occurs when allocated memory block exceeds requested size, wasting memory within allocated partition. External fragmentation occurs when total free memory satisfies request, but free memory is broken into non-contiguous slices.", co: "CO3", bloom: "L2 (Understand)" },
          { q: "Describe the function of an Inode in the Unix filesystem.", a: "An Inode (index node) is a data structure storing file metadata: file mode/permissions, owner UID/GID, size, timestamp, link count, and pointers to direct, single-indirect, double-indirect, and triple-indirect data blocks.", co: "CO5", bloom: "L2 (Understand)" },
          { q: "What is a Translation Lookaside Buffer (TLB) reach? How can it be increased?", a: "TLB reach is the amount of memory accessible from the TLB: Reach = (Number of TLB Entries) * (Page Size). It can be increased by employing superpages (HugePages) or increasing associative hardware entry depth.", co: "CO4", bloom: "L2 (Understand)" }
        ];
        const item = questionsList[i % questionsList.length];
        return {
          num: `1.${String.fromCharCode(97 + i)}`,
          question: item.q,
          answer: item.a,
          co: item.co,
          bloom: item.bloom,
          marks: 2
        };
      });

      const generatedPartB = Array.from({ length: fiveMarkCount }).map((_, i) => {
        const questionsList = [
          {
            q: "Analyze the Bankers Algorithm for deadlock avoidance. Given 5 processes (P0-P4) and 3 resource types (A, B, C), outline how the Safety Algorithm determines whether a system state is secure.",
            a: "1. Initialize Work = Available, Finish[i] = false for all i. 2. Find index i such that Finish[i] == false and Need[i] <= Work. If no such i exists, proceed to Step 4. 3. Work = Work + Allocation[i], Finish[i] = true, repeat step 2. 4. If Finish[i] == true for all i, system is in safe state.",
            co: "CO2",
            bloom: "L4 (Analyze)"
          },
          {
            q: "Compare and contrast Round Robin (RR) and Shortest Remaining Time First (SRTF) scheduling algorithms with respect to average turnaround time, average waiting time, and starvation probability.",
            a: "SRTF yields mathematically minimal average waiting time but can indefinitely starve CPU-bound processes. RR guarantees bounded response time through time quantum slicing with zero starvation, but average turnaround time degrades heavily if the time quantum is chosen smaller than typical context-switch cost.",
            co: "CO2",
            bloom: "L3 (Apply)"
          },
          {
            q: "Explain inverted page tables. Contrast their storage efficiency and lookup penalty against conventional multi-level hierarchical page tables.",
            a: "An inverted page table has one entry per physical frame in RAM rather than per virtual page of every process. While it compresses memory overhead from O(virtual address space) down to O(physical RAM), every translation requires searching by (ProcessID, PageNumber), requiring hash anchoring hardware to prevent severe linear lookup latencies.",
            co: "CO4",
            bloom: "L4 (Analyze)"
          },
          {
            q: "Demonstrate the Reader-Writer synchronization problem using counting semaphores. Highlight the mechanism preventing simultaneous writer modification.",
            a: "Utilize mutex (binary semaphore) protecting read_count and rw_mutex protecting the shared resource. Reader acquires mutex, increments read_count; if read_count==1, it acquires rw_mutex. Upon leaving, reader decrements read_count; if read_count==0, it releases rw_mutex. Writers must directly acquire rw_mutex.",
            co: "CO3",
            bloom: "L3 (Apply)"
          },
          {
            q: "Explain disk scheduling algorithms: SCAN (Elevator) versus C-LOOK. Illustrate the track traversal pattern for request queue: [98, 183, 37, 122, 14, 124, 65, 67] starting at cylinder 53.",
            a: "SCAN sweeps the disk arm to the physical outer edge, servicing requests, then reverses direction. C-LOOK services requests only up to the highest requested cylinder in the current direction, then immediately jumps back to the lowest pending cylinder without traversing all the way to cylinder 0.",
            co: "CO5",
            bloom: "L4 (Analyze)"
          },
          {
            q: "Explain the architecture of Demand Paging. Detail the hardware trap, kernel interrupt handler, and frame allocation steps executed on a Page Fault.",
            a: "1. Memory access triggers MMU. 2. Internal table check discovers valid-invalid bit is 0 (invalid). 3. MMU generates page fault trap to OS kernel. 4. Kernel verifies access rights in PCB. 5. Kernel allocates free frame from pool (or invokes page replacement). 6. Disk I/O scheduled. 7. Page table updated and instruction restarted.",
            co: "CO4",
            bloom: "L4 (Analyze)"
          }
        ];
        const item = questionsList[i % questionsList.length];
        return {
          num: `2.${i + 1}`,
          question: item.q,
          answer: item.a,
          co: item.co,
          bloom: item.bloom,
          marks: 5
        };
      });

      const generatedPartC = Array.from({ length: tenMarkCount }).map((_, i) => {
        const questionsList = [
          {
            q: "(a) Design and specify a complete solution for the Dining Philosophers Problem avoiding deadlock and resource starvation using Dijkstra's monitor abstraction or asymmetric resource acquisition. (6 Marks)\n(b) Detail the concept of priority inversion in real-time embedded operating systems. Explain how Priority Ceiling and Priority Inheritance Protocols resolve the Mars Pathfinder priority anomaly. (4 Marks)",
            a: "Part (a): Solution employs state array (THINKING, HUNGRY, EATING) with condition variables self[5]. Philosopher i tests neighbors before eating. Alternatively, philosopher 4 picks up fork 0 before fork 4, breaking Coffman circular wait condition. Part (b): Priority inversion occurs when lower-priority task holding shared mutex delays medium-priority task, starving higher-priority task. Priority inheritance temporarily elevates holder to highest waiting priority.",
            co: "CO2",
            bloom: "L5 (Evaluate)"
          },
          {
            q: "(a) Consider a system with 32-bit logical addresses, 4KB page size, and 4-byte page table entries. Calculate the page table size and demonstrate why single-level paging is impractical. Design a two-level paging hierarchy showing address decomposition into outer page, inner page, and offset. (6 Marks)\n(b) Given page reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1 with 3 available physical frames. Compute total page faults under FIFO, LRU, and Optimal Replacement policies. (4 Marks)",
            a: "Part (a): 32-bit address, 4KB (2^12) pages gives 2^20 pages. Single page table requires 2^20 * 4 bytes = 4MB contiguous RAM per process. Two-level paging divides 32 bits into: Outer Page (10 bits) -> Inner Page (10 bits) -> Offset (12 bits). Only allocated page tables occupy RAM. Part (b): Optimal yields 9 faults; LRU yields 12 faults; FIFO yields 15 faults.",
            co: "CO4",
            bloom: "L5 (Evaluate)"
          },
          {
            q: "(a) Design the architectural layout of the Linux Virtual File System (VFS). Explain the four core object types (superblock, inode, dentry, file) and their function pointers. (6 Marks)\n(b) Evaluate RAID storage configurations (RAID 0, RAID 1, RAID 5, and RAID 6). Provide a comparative matrix detailing minimum disks, usable capacity, write penalty, and fault tolerance against multi-disk failure. (4 Marks)",
            a: "Part (a): VFS abstracts concrete filesystems (ext4, XFS, NFS) via object-oriented C structs: superblock_operations, inode_operations, dentry_operations, file_operations. Part (b): RAID 0 offers 0 redundancy and 100% capacity; RAID 1 mirrors with 50% capacity; RAID 5 provides parity with (N-1)/N capacity and single drive tolerance; RAID 6 adds dual Reed-Solomon parity tolerating 2 simultaneous disk failures.",
            co: "CO5",
            bloom: "L6 (Create)"
          },
          {
            q: "(a) Formulate the Chandy-Misra-Haas distributed deadlock detection algorithm. Trace the propagation of probe messages (initiator, sender, receiver) in an edge-weighted resource allocation graph. (6 Marks)\n(b) Analyze Linux kernel process scheduling using the Completely Fair Scheduler (CFS). Explain virtual runtime (vruntime), red-black tree organization, and latency targeting. (4 Marks)",
            a: "Part (a): When process Pi waits on Pj, it sends probe(initiator, sender, receiver). If probe returns to initiator, directed cycle exists, indicating distributed deadlock. Part (b): CFS eliminates discrete priority slices in favor of vruntime tracked in an augmented red-black tree. Process with minimum vruntime (leftmost node) is always dispatched next.",
            co: "CO3",
            bloom: "L6 (Create)"
          }
        ];
        const item = questionsList[i % questionsList.length];
        return {
          num: `3.${i + 1}`,
          question: item.q,
          answer: item.a,
          co: item.co,
          bloom: item.bloom,
          marks: 10
        };
      });

      const newPaper = {
        id: `paper-${Date.now()}`,
        subject: subject,
        title: `${examType.split('(')[0].trim()} - Blueprint Assessment`,
        institution: user?.college || 'CAMPUSAI AFFILIATED UNIVERSITY OF TECHNOLOGY',
        examType: examType,
        blueprint: blueprint,
        difficulty: difficulty,
        totalMarks: totalMarksCalculated,
        timeAllowed: '3 Hours',
        generatedAt: new Date().toISOString(),
        partA: generatedPartA,
        partB: generatedPartB,
        partC: generatedPartC
      };

      setActiveGeneratedPaper(newPaper);
      setExamsGeneratedCount(prev => prev + 1);
      setIsGenerating(false);
    }, 700);
  };

  // Copy Paper to Clipboard
  const handleCopyPaper = () => {
    if (!activeGeneratedPaper) return;

    let paperText = `=================================================================\n`;
    paperText += `${activeGeneratedPaper.institution}\n`;
    paperText += `${activeGeneratedPaper.title}\n`;
    paperText += `Course: ${activeGeneratedPaper.subject}\n`;
    paperText += `Blueprint: ${activeGeneratedPaper.blueprint}\n`;
    paperText += `Time Allowed: ${activeGeneratedPaper.timeAllowed} | Max Marks: ${activeGeneratedPaper.totalMarks}\n`;
    paperText += `=================================================================\n\n`;

    paperText += `PART A (${activeGeneratedPaper.partA.length * 2} Marks) - Short Answer Questions\n`;
    paperText += `Answer ALL questions. Each carries 2 Marks.\n\n`;
    activeGeneratedPaper.partA.forEach(q => {
      paperText += `[${q.num}] ${q.question} [${q.co}, ${q.bloom}, 2M]\n`;
      if (includeRubrics) {
        paperText += `     Model Key: ${q.answer}\n\n`;
      }
    });

    paperText += `\nPART B (${activeGeneratedPaper.partB.length * 5} Marks) - Analytical & Derivation Questions\n`;
    paperText += `Answer questions as specified. Each carries 5 Marks.\n\n`;
    activeGeneratedPaper.partB.forEach(q => {
      paperText += `[${q.num}] ${q.question} [${q.co}, ${q.bloom}, 5M]\n`;
      if (includeRubrics) {
        paperText += `     Model Key: ${q.answer}\n\n`;
      }
    });

    paperText += `\nPART C (${activeGeneratedPaper.partC.length * 10} Marks) - Comprehensive Design & Case Studies\n`;
    paperText += `Answer questions as specified. Each carries 10 Marks.\n\n`;
    activeGeneratedPaper.partC.forEach(q => {
      paperText += `[${q.num}] ${q.question} [${q.co}, ${q.bloom}, 10M]\n`;
      if (includeRubrics) {
        paperText += `     Model Key: ${q.answer}\n\n`;
      }
    });

    navigator.clipboard.writeText(paperText);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 3000);
  };

  // Save to Managed Table
  const handleSaveToBank = () => {
    if (!activeGeneratedPaper) return;

    const newRecord = {
      id: activeGeneratedPaper.id,
      subject: activeGeneratedPaper.subject,
      title: activeGeneratedPaper.title,
      blueprint: activeGeneratedPaper.blueprint,
      breakdown: `${activeGeneratedPaper.partA.length}x 2M, ${activeGeneratedPaper.partB.length}x 5M, ${activeGeneratedPaper.partC.length}x 10M`,
      totalMarks: activeGeneratedPaper.totalMarks,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Approved'
    };

    setGeneratedPapers([newRecord, ...generatedPapers]);
    setQuestionBanksCount(prev => prev + 1);
    setSaveFeedback(`Successfully saved "${activeGeneratedPaper.title}" to Question Bank pool!`);
    setTimeout(() => setSaveFeedback(''), 5000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. Header & Live Date */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-teal" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
              Faculty Assessment Builder View
            </span>
            <span className="badge" style={{ fontSize: '0.75rem' }}>
              Regulation Compliant
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--ink-primary)', letterSpacing: '-0.02em' }}>
            Curricular Examination Engineering
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
            Logged in as {user?.name || 'Prof. Aarav Sharma'} • {user?.college || 'International Institute of Information Technology (IIIT) Hyderabad'}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
            <Calendar size={14} color="var(--brand-coral)" style={{ marginRight: '0.25rem' }} />
            {currentDate}
          </span>
        </div>
      </div>

      {/* 2. Four Live Metric Cards for Faculty (Question Banks Created, Exams Generated, etc.) */}
      <div className="grid-4">
        {/* Metric 1: Question Banks Created */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Question Banks Created
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-teal)' }}>
              <BookOpen size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            {questionBanksCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            Units 1 to 5 mapped to syllabi
          </div>
        </div>

        {/* Metric 2: Exams Generated */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Exams Generated
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-coral)' }}>
              <Award size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            {examsGeneratedCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            Mid-term & university final papers
          </div>
        </div>

        {/* Metric 3: Active Question Pool (2M, 5M, 10M) */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Questions in Pool
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-teal)' }}>
              <HelpCircle size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            286
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            142 (2M) • 98 (5M) • 46 (10M)
          </div>
        </div>

        {/* Metric 4: Blueprint Adherence */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Blueprint Adherence
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-coral)' }}>
              <CheckCircle2 size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-coral)' }}>
            100%
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            Bloom's Taxonomy aligned
          </div>
        </div>
      </div>

      {/* 3. AI Question Paper Generator Interface */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} color="var(--brand-coral)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                AI University Question Paper Generator
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
              Synthesize full examination papers with 2-Mark (Short), 5-Mark (Analytical), and 10-Mark (Design) questions calibrated to university blueprints.
            </p>
          </div>
          <span className="badge badge-teal">Faculty Assessment Engine</span>
        </div>

        {saveFeedback && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-teal-subtle)', color: 'var(--brand-teal)', borderRadius: 'var(--radius-btn)', fontSize: '0.825rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={16} />
            <span>{saveFeedback}</span>
          </div>
        )}

        {/* Configuration Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {/* Subject & Course */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--ink-primary)' }}>
              Course Code & Subject Title *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. CS601: Operating Systems & System Programming"
              style={{ width: '100%' }}
            />
          </div>

          {/* Target Blueprint */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--ink-primary)' }}>
              Target University Blueprint *
            </label>
            <select
              value={blueprint}
              onChange={(e) => setBlueprint(e.target.value)}
              style={{ width: '100%' }}
            >
              {(EXAM_PATTERNS || []).map((pat) => {
                const name = typeof pat === 'object' ? pat.name : pat;
                return <option key={name} value={name}>{name}</option>;
              })}
            </select>
          </div>

          {/* Exam Type & Total Target */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--ink-primary)' }}>
              Examination Scope & Target Total
            </label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="End-Semester Examination (70 Marks)">End-Semester Final (70 Marks / 3 Hours)</option>
              <option value="Mid-Term Assessment (30 Marks)">Mid-Term Examination (30 Marks / 90 Mins)</option>
              <option value="Autonomous Full Model Paper (100 Marks)">Full Model Paper (100 Marks / 3 Hours)</option>
              <option value="Unit Diagnostic Test (25 Marks)">Unit Diagnostic Test (25 Marks / 45 Mins)</option>
            </select>
          </div>

          {/* Difficulty & Rigor */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--ink-primary)' }}>
              Bloom's Taxonomy Calibration
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="Standard University Examination">Standard University (Balanced Bloom's L1-L5)</option>
              <option value="Rigorous / GATE Analytical Standard">Rigorous / GATE Analytical (Heavy L4-L6)</option>
              <option value="Remedial / Foundational Assessment">Foundational / Conceptual (L1-L3)</option>
            </select>
          </div>
        </div>

        {/* Blueprint Question Breakdown Controls (2M, 5M, 10M) */}
        <div style={{
          padding: '1.25rem',
          backgroundColor: 'var(--bg-muted)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
              Mark Allocation & Question Partitioning:
            </span>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--brand-coral)' }}>
              Total Marks Calculated: {(twoMarkCount * 2) + (fiveMarkCount * 5) + (tenMarkCount * 10)} Marks
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {/* Part A: 2-Mark Short Questions */}
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.25rem' }}>
                Part A: 2-Mark Questions
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '0.75rem' }}>
                Short answer, core definitions & laws (Bloom's L1-L2)
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <select
                  value={twoMarkCount}
                  onChange={(e) => setTwoMarkCount(Number(e.target.value))}
                  style={{ width: '100%', fontSize: '0.825rem' }}
                >
                  <option value={5}>5 Questions (10 Marks)</option>
                  <option value={10}>10 Questions (20 Marks)</option>
                  <option value={12}>12 Questions (24 Marks)</option>
                </select>
              </div>
            </div>

            {/* Part B: 5-Mark Analytical Questions */}
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.25rem' }}>
                Part B: 5-Mark Questions
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '0.75rem' }}>
                Derivations, algorithmic steps, comparisons (Bloom's L3-L4)
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <select
                  value={fiveMarkCount}
                  onChange={(e) => setFiveMarkCount(Number(e.target.value))}
                  style={{ width: '100%', fontSize: '0.825rem' }}
                >
                  <option value={2}>2 Questions (10 Marks)</option>
                  <option value={4}>4 Questions (20 Marks)</option>
                  <option value={6}>6 Questions (30 Marks)</option>
                </select>
              </div>
            </div>

            {/* Part C: 10-Mark Comprehensive Questions */}
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.25rem' }}>
                Part C: 10-Mark Questions
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '0.75rem' }}>
                Architectural design, full proofs & case studies (Bloom's L5-L6)
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <select
                  value={tenMarkCount}
                  onChange={(e) => setTenMarkCount(Number(e.target.value))}
                  style={{ width: '100%', fontSize: '0.825rem' }}
                >
                  <option value={2}>2 Questions (20 Marks)</option>
                  <option value={3}>3 Questions (30 Marks)</option>
                  <option value={4}>4 Questions (40 Marks)</option>
                  <option value={5}>5 Questions (50 Marks)</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={includeRubrics}
                onChange={(e) => setIncludeRubrics(e.target.checked)}
              />
              <span>Generate Step-by-Step Model Answers & Marking Scheme Keys</span>
            </label>
          </div>
        </div>

        {/* Generate Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem' }}>
          <button
            onClick={handleGeneratePaper}
            disabled={isGenerating}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem', fontWeight: 700 }}
          >
            <Sparkles size={16} />
            <span>{isGenerating ? "Synthesizing University Blueprint Exam..." : "Generate AI Question Paper"}</span>
          </button>
        </div>

        {/* 4. Generated Question Paper Display */}
        {activeGeneratedPaper && (
          <div style={{
            marginTop: '2rem',
            border: '2px solid var(--border-strong)',
            borderRadius: 'var(--radius-card)',
            backgroundColor: 'var(--bg-surface)',
            padding: '2rem'
          }}>
            {/* Paper Header (University Standard) */}
            <div style={{
              textAlign: 'center',
              borderBottom: '2px solid var(--ink-primary)',
              paddingBottom: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-coral)' }}>
                {activeGeneratedPaper.institution}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink-primary)', margin: '0.35rem 0' }}>
                {activeGeneratedPaper.title}
              </h3>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink-secondary)' }}>
                {activeGeneratedPaper.subject}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--ink-muted)', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span><strong>Regulation:</strong> {activeGeneratedPaper.blueprint}</span>
                <span><strong>Time Allowed:</strong> {activeGeneratedPaper.timeAllowed}</span>
                <span><strong>Max Marks:</strong> {activeGeneratedPaper.totalMarks} Marks</span>
              </div>
            </div>

            {/* Candidate Instructions */}
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-btn)',
              fontSize: '0.78rem',
              color: 'var(--ink-secondary)',
              marginBottom: '1.5rem'
            }}>
              <strong>Instructions for Candidates:</strong>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <li>Part A is compulsory. Answer all {activeGeneratedPaper.partA.length} questions (2 Marks each).</li>
                <li>Part B: Answer questions as specified (5 Marks each). Show all intermediate derivations and Gantt charts.</li>
                <li>Part C: Answer questions as specified (10 Marks each). Assume suitable data wherever necessary.</li>
                <li>All questions are mapped to Course Outcomes (CO) and Revised Bloom's Taxonomy Levels.</li>
              </ul>
            </div>

            {/* Action Bar (Copy, Print, Toggle Solutions, Save to Bank) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={handleCopyPaper}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  {copyFeedback ? <Check size={14} color="var(--brand-teal)" /> : <Copy size={14} />}
                  <span>{copyFeedback ? "Paper Copied!" : "Copy Paper"}</span>
                </button>
                <button
                  onClick={handleSaveToBank}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <BookOpen size={14} />
                  <span>Save to Question Bank</span>
                </button>
              </div>

              <button
                onClick={() => setShowSolutions(prev => !prev)}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                {showSolutions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{showSolutions ? "Hide Model Answer Keys" : "Show Model Answer Keys"}</span>
              </button>
            </div>

            {/* PART A (2-Mark Questions) */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-medium)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  PART A (Short Conceptual Questions - {activeGeneratedPaper.partA.length * 2} Marks)
                </h4>
                <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                  {activeGeneratedPaper.partA.length} x 2 Marks = {activeGeneratedPaper.partA.length * 2} M
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeGeneratedPaper.partA.map((item, idx) => (
                  <div key={idx} style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                        {item.num}. {item.question}
                      </span>
                      <span className="badge" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                        [{item.co} • {item.bloom} • 2M]
                      </span>
                    </div>
                    {showSolutions && (
                      <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--brand-teal)', fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
                        <strong style={{ color: 'var(--brand-teal)' }}>Model Answer / Marking Key: </strong>
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* PART B (5-Mark Questions) */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-medium)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  PART B (Analytical & Algorithmic Problems - {activeGeneratedPaper.partB.length * 5} Marks)
                </h4>
                <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                  {activeGeneratedPaper.partB.length} x 5 Marks = {activeGeneratedPaper.partB.length * 5} M
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeGeneratedPaper.partB.map((item, idx) => (
                  <div key={idx} style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                        {item.num}. {item.question}
                      </span>
                      <span className="badge" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                        [{item.co} • {item.bloom} • 5M]
                      </span>
                    </div>
                    {showSolutions && (
                      <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--brand-coral)', fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
                        <strong style={{ color: 'var(--brand-coral)' }}>Step-by-Step Solution & Grading Rubric: </strong>
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* PART C (10-Mark Questions) */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-medium)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  PART C (Comprehensive Design & Case Studies - {activeGeneratedPaper.partC.length * 10} Marks)
                </h4>
                <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                  {activeGeneratedPaper.partC.length} x 10 Marks = {activeGeneratedPaper.partC.length * 10} M
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeGeneratedPaper.partC.map((item, idx) => (
                  <div key={idx} style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
                        {item.num}. {item.question}
                      </div>
                      <span className="badge" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                        [{item.co} • {item.bloom} • 10M]
                      </span>
                    </div>
                    {showSolutions && (
                      <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--brand-teal)', fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
                        <strong style={{ color: 'var(--brand-teal)' }}>Architectural Solution & Grading Criteria: </strong>
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Managed Question Banks & Generated Papers Table */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Department Question Banks & Examination Papers
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
              Curated examination papers and 2M / 5M / 10M question repositories ready for institutional printing.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/questions')}
            className="btn btn-secondary btn-sm"
          >
            <span>Explore All Questions Pool</span>
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Subject & Exam Title</th>
                <th>Blueprint Scheme</th>
                <th>Question Breakdown</th>
                <th>Total Marks</th>
                <th>Created Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {generatedPapers.map((paper) => (
                <tr key={paper.id}>
                  <td>
                    <div>
                      <strong style={{ fontSize: '0.875rem', display: 'block' }}>{paper.title}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{paper.subject}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                      {paper.blueprint}
                    </span>
                  </td>
                  <td>
                    <span className="font-mono" style={{ fontSize: '0.78rem' }}>{paper.breakdown}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{paper.totalMarks} M</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>{paper.createdAt}</span>
                  </td>
                  <td>
                    <span className="badge" style={{ fontSize: '0.7rem', color: 'var(--brand-teal)', backgroundColor: 'var(--bg-teal-subtle)' }}>
                      {paper.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        onClick={() => {
                          alert(`Paper "${paper.title}" loaded into print preview buffer.`);
                        }}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                        title="Print Paper"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => {
                          setGeneratedPapers(generatedPapers.filter(p => p.id !== paper.id));
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.55rem', color: 'var(--brand-coral)' }}
                        title="Delete Paper"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Faculty Quick Assessment Actions */}
      <div className="grid-4">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <HelpCircle size={16} color="var(--brand-coral)" />
              <strong style={{ fontSize: '0.95rem' }}>Question Bank Pool</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Inspect syllabus questions cataloged by 2M, 5M, and 10M mark tiers.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/questions')}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>Browse Questions</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={16} color="var(--brand-teal)" />
              <strong style={{ fontSize: '0.95rem' }}>Class Diagnostic Quizzes</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Conduct timed in-class MCQ retention evaluations.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/quizzes')}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>Review Quizzes</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <FileText size={16} color="var(--brand-coral)" />
              <strong style={{ fontSize: '0.95rem' }}>Course Syllabi & Notes</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Inspect textbook digests and unit summaries.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/summaries')}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>View Summaries</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Calendar size={16} color="var(--brand-teal)" />
              <strong style={{ fontSize: '0.95rem' }}>Examination Calendar</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Semester timetable and assessment scheduling milestones.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/study-plan')}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>View Schedule</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboardView;
