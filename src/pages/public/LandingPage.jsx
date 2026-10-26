import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  HelpCircle,
  Award,
  Layers,
  Calendar,
  CheckCircle,
  ArrowRight,
  Upload,
  BookOpen,
  Cpu,
  Clock,
  Sparkles,
  ShieldCheck,
  Building,
  GraduationCap,
  Users,
  ChevronRight
} from 'lucide-react';

export const LandingPage = () => {
  const { navigate, documents, setActiveStudyDrawerDoc } = useApp();

  // Hero Interactive Live Document Parser Preview State
  const sampleDocs = [
    {
      id: "doc-1",
      filename: "Data_Structures_Notes.pdf",
      subject: "Data Structures & Algorithms",
      summary: "Inorder traversal of BST produces sorted order. AVL tree height is bounded by 1.44 log2(N). Dijkstra shortest path requires non-negative edge weights.",
      questions: [
        "Define AVL Balance Factor and state allowable values in {-1, 0, +1}.",
        "Compare singly vs doubly linked list memory footprint and traversal."
      ],
      viva: "Why does QuickSort degrade to O(N^2) on sorted arrays with first element pivot?",
      flashcards: [
        { front: "Dijkstra Algorithm limitation?", back: "Fails on negative edge weights." },
        { front: "Floyd Cycle Detection time and space?", back: "O(N) time with O(1) auxiliary pointer space." }
      ]
    },
    {
      id: "doc-2",
      filename: "Operating_Systems_Unit3.pptx",
      subject: "Operating Systems",
      summary: "Four Coffman conditions for deadlock: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Banker algorithm evaluates safe state transitions.",
      questions: [
        "Differentiate between Starvation and Deadlock with concrete examples.",
        "Solve Bounded Buffer Producer-Consumer using Counting Semaphores."
      ],
      viva: "Explain why Peterson solution fails on modern multicore architectures without memory barriers.",
      flashcards: [
        { front: "Turnaround Time (TAT) formula?", back: "Completion Time - Arrival Time" },
        { front: "Counting Semaphore operations?", back: "wait(S) decrements; signal(S) increments." }
      ]
    },
    {
      id: "doc-3",
      filename: "JNTU_Previous_Paper_2025.pdf",
      subject: "Semester Examination Model",
      summary: "High recurring weightage on B+ Tree node splitting, LRU page replacement Belady anomaly proof, and two-phase locking serialization.",
      questions: [
        "Calculate page faults for reference string 7,0,1,2,0,3 using LRU with 3 frames.",
        "Explain B+ Tree leaf pointer chain efficiency for database range scans."
      ],
      viva: "Why are B+ Trees chosen over binary search trees in relational storage engines?",
      flashcards: [
        { front: "Belady Anomaly definition?", back: "More page frames causing more page faults (FIFO)." },
        { front: "Effective Memory Access Time formula?", back: "h*(t_tlb + t_ram) + (1-h)*(t_tlb + 2*t_ram)" }
      ]
    }
  ];

  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [heroActiveTab, setHeroActiveTab] = useState('summary'); // summary, questions, viva, flashcards
  const activeSample = sampleDocs[selectedSampleIndex];

  // 5-Column Core Capability Bar State
  const [activeCapability, setActiveCapability] = useState('summaries');
  const capabilities = [
    {
      id: 'summaries',
      title: 'Summaries',
      desc: 'Unit-by-unit structured summaries, formula sheets, and key definitions.',
      previewTitle: 'Automated Unit Summaries & Formula Extraction',
      previewContent: 'Converts unstructured 60-page PDF lecture notes into clear, bulleted concept sheets with variable depth: Brief, Detailed, and Exam Cram mode.',
      stat: 'Reduces reading volume by 70%'
    },
    {
      id: 'questions',
      title: 'Important Questions',
      desc: '2-Mark, 5-Mark, and 10-Mark questions with verified model answers.',
      previewTitle: 'Marks-Wise Exam Question Categorization',
      previewContent: 'Synthesizes semester exam questions from uploaded lecture notes and past university papers. Every question includes a point-by-point model answer.',
      stat: 'Covers 100% syllabus units'
    },
    {
      id: 'quizzes',
      title: 'Quizzes',
      desc: 'Timed multiple-choice assessments with immediate feedback.',
      previewTitle: 'Self-Paced Diagnostic Knowledge Checks',
      previewContent: 'Generates interactive MCQ quizzes with strict answer explanations and timer toggles. Answers directly update your dashboard readiness metric.',
      stat: 'Instant score calculation'
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      desc: 'Active recall decks with space-bar flipping and arrow navigation.',
      previewTitle: 'Spaced Repetition Active Recall Decks',
      previewContent: 'Transforms key definitions, formulas, and algorithm steps into digital flashcards designed for keyboard-first rapid revision.',
      stat: 'Optimized for spaced repetition'
    },
    {
      id: 'study-plans',
      title: 'Study Plans',
      desc: 'Exam date countdowns with daily task-based checklists.',
      previewTitle: 'Intelligent Exam Date Countdown Planner',
      previewContent: 'Input your exam date and syllabus units. CampusAI creates a day-by-day revision schedule where completed tasks update your global progress meter.',
      stat: 'Dynamic daily task pacing'
    }
  ];

  // Customer Segments Tabs State
  const [customerSegment, setCustomerSegment] = useState('students');

  // Pricing Toggle State
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' | 'semester'

  return (
    <main id="main-content">
      {/* 1. Hero Section */}
      <section style={{
        paddingTop: '3.5rem',
        paddingBottom: '4.5rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '3rem',
            alignItems: 'center'
          }} className="hero-grid">
            {/* Left Column: Headlines & CTAs */}
            <div>
              <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
                <span className="badge badge-coral">
                  Academic Exam Preparation Platform
                </span>
              </div>

              {/* Strict single H1 tag on the page */}
              <h1 style={{
                fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: 'var(--ink-primary)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}>
                Study Smarter. Achieve Better. With CampusAI.
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: 'var(--ink-secondary)',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '560px'
              }}>
                Upload your PDFs, PPTs, lecture notes, and previous question papers. Generate structured summaries, high-weightage exam questions, quizzes, viva prompts, flashcards, and study plans in one workspace.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.5rem' }}>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn btn-primary btn-lg"
                  aria-label="Start Free Workspace"
                >
                  <span>Start Free Workspace</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <button
                  onClick={() => {
                    const preview = document.getElementById('capability-bar');
                    if (preview) preview.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-secondary btn-lg"
                  aria-label="Try Interactive Demo"
                >
                  <span>Explore Capabilities</span>
                </button>
              </div>

              {/* Verifiable Factual Feature Statements (Zero Fake Reviews/Counters) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '1.5rem'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink-primary)' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Syllabus Unit Mapping</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink-primary)' }}>Zero</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Public Model Training</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink-primary)' }}>10MB</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Supported File Size</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Live Document Parser Preview (Strictly No Stock Photos) */}
            <div>
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '2px solid var(--ink-primary)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden'
              }}>
                {/* Header with Sample Document Tabs */}
                <div style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--bg-muted)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--brand-coral)' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Live Document Parser Preview
                    </span>
                  </div>
                  <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                    Interactive Engine
                  </span>
                </div>

                {/* Sample Document Selectors */}
                <div style={{
                  display: 'flex',
                  overflowX: 'auto',
                  borderBottom: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-primary)'
                }}>
                  {sampleDocs.map((doc, idx) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedSampleIndex(idx)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.8rem',
                        fontWeight: selectedSampleIndex === idx ? 700 : 500,
                        backgroundColor: selectedSampleIndex === idx ? 'var(--bg-surface)' : 'transparent',
                        color: selectedSampleIndex === idx ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                        borderBottom: selectedSampleIndex === idx ? '2px solid var(--brand-coral)' : '2px solid transparent',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <FileText size={13} aria-hidden="true" />
                      <span>{doc.filename}</span>
                    </button>
                  ))}
                </div>

                {/* Parsed Output Tabs */}
                <div style={{
                  display: 'flex',
                  gap: '0.25rem',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-surface)',
                  borderBottom: '1px solid var(--border-subtle)'
                }}>
                  {[
                    { id: 'summary', label: 'Summary' },
                    { id: 'questions', label: 'Important Qs' },
                    { id: 'viva', label: 'Viva Prep' },
                    { id: 'flashcards', label: 'Flashcards' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setHeroActiveTab(tab.id)}
                      style={{
                        padding: '0.3rem 0.65rem',
                        fontSize: '0.78rem',
                        fontWeight: heroActiveTab === tab.id ? 700 : 500,
                        borderRadius: 'var(--radius-btn)',
                        backgroundColor: heroActiveTab === tab.id ? 'var(--ink-primary)' : 'transparent',
                        color: heroActiveTab === tab.id ? 'var(--ink-inverse)' : 'var(--ink-secondary)'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Output Body */}
                <div style={{ padding: '1.25rem', minHeight: '230px', maxHeight: '280px', overflowY: 'auto', fontSize: '0.875rem' }}>
                  {heroActiveTab === 'summary' && (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-teal)', marginBottom: '0.4rem' }}>
                        EXTRACTED UNIT SUMMARY ({activeSample.subject})
                      </div>
                      <p style={{ lineHeight: 1.6, color: 'var(--ink-primary)' }}>
                        {activeSample.summary}
                      </p>
                    </div>
                  )}

                  {heroActiveTab === 'questions' && (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-teal)', marginBottom: '0.5rem' }}>
                        HIGH-WEIGHTAGE EXAM QUESTIONS
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {activeSample.questions.map((q, qIdx) => (
                          <div key={qIdx} style={{
                            padding: '0.65rem 0.85rem',
                            backgroundColor: 'var(--bg-muted)',
                            borderRadius: 'var(--radius-btn)',
                            border: '1px solid var(--border-subtle)'
                          }}>
                            <span style={{ fontWeight: 700, color: 'var(--brand-coral)', marginRight: '0.5rem' }}>
                              Q{qIdx + 1}.
                            </span>
                            <span style={{ color: 'var(--ink-primary)' }}>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {heroActiveTab === 'viva' && (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-teal)', marginBottom: '0.4rem' }}>
                        ORAL VIVA VOCE PROMPT
                      </div>
                      <div style={{
                        padding: '0.85rem',
                        backgroundColor: 'var(--bg-muted)',
                        borderRadius: 'var(--radius-btn)',
                        border: '1px solid var(--border-subtle)',
                        lineHeight: 1.5
                      }}>
                        <div style={{ fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.35rem' }}>
                          Examiner Question:
                        </div>
                        <p style={{ color: 'var(--ink-secondary)' }}>{activeSample.viva}</p>
                      </div>
                    </div>
                  )}

                  {heroActiveTab === 'flashcards' && (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-teal)', marginBottom: '0.5rem' }}>
                        ACTIVE RECALL CARDS
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.65rem' }}>
                        {activeSample.flashcards.map((fc, fcIdx) => (
                          <div key={fcIdx} style={{
                            padding: '0.75rem',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-btn)',
                            backgroundColor: 'var(--bg-muted)'
                          }}>
                            <div style={{ fontWeight: 700, fontSize: '0.825rem', color: 'var(--ink-primary)' }}>
                              {fc.front}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
                              {fc.back}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Trigger in Live Parser */}
                <div style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-muted)',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                    Parsed in 1.4 seconds client-side
                  </span>
                  <button
                    onClick={() => {
                      const fullDoc = documents.find(d => d.name.toLowerCase().includes(activeSample.filename.toLowerCase().replace('_', ' ').slice(0, 8)));
                      if (fullDoc) setActiveStudyDrawerDoc(fullDoc);
                      else setActiveStudyDrawerDoc(documents[0]);
                    }}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--brand-coral)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>Inspect Full Study Drawer</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 5-Column Core Capability Bar with Dynamic Live Drawer */}
      <section id="capability-bar" style={{
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>Core System Architecture</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Everything You Need for University Examinations
            </h2>
            <p style={{ fontSize: '0.95rem' }}>
              Select any capability below to view its functional output and implementation mechanism.
            </p>
          </div>

          {/* 5-Column Selector Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }} className="capability-selector-grid">
            {capabilities.map((cap) => {
              const isActive = activeCapability === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapability(cap.id)}
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-card)',
                    border: isActive ? '2px solid var(--ink-primary)' : '1px solid var(--border-subtle)',
                    backgroundColor: isActive ? 'var(--bg-muted)' : 'var(--bg-surface)',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: isActive ? 'var(--brand-coral)' : 'var(--ink-primary)',
                    marginBottom: '0.25rem'
                  }}>
                    {cap.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
                    {cap.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Capability Preview Drawer */}
          {(() => {
            const currentCap = capabilities.find(c => c.id === activeCapability);
            return (
              <div className="card" style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-medium)',
                padding: '2rem'
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>{currentCap.stat}</span>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                      {currentCap.previewTitle}
                    </h3>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn btn-primary"
                  >
                    <span>Launch in Workspace</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                  {currentCap.previewContent}
                </p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 3. Why Choose CampusAI Section */}
      <section style={{
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
            <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Architectural Advantages</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Why Choose CampusAI
            </h2>
            <p style={{ fontSize: '1rem' }}>
              Built specifically for undergraduate engineering, science, and commerce curricula with zero generic fluff.
            </p>
          </div>

          <div className="grid-4">
            <div className="card">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: 'var(--brand-coral)'
              }}>
                <Clock size={22} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Save Time
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                Eliminate hours of manual note condensing. Transform 120-page textbook slide decks into actionable study packs in under two minutes.
              </p>
            </div>

            <div className="card">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: 'var(--brand-teal)'
              }}>
                <Cpu size={22} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Personalized Learning
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                Adapt summaries to your preferred depth: quick 5-minute pre-lecture briefs, thorough exam cram sheets, or complete model answers.
              </p>
            </div>

            <div className="card">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: 'var(--brand-coral)'
              }}>
                <Award size={22} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Exam Ready
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                Trained on standard university examination blueprints. Accurately predicts 2-mark definitions, 5-mark analyticals, and 10-mark essays.
              </p>
            </div>

            <div className="card">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: 'var(--ink-primary)'
              }}>
                <FileText size={22} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Any Format: PDF, PPTX, DOCX, TXT
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                Seamless ingestion of faculty PowerPoint presentations, scanned syllabus sheets, handwritten exported PDFs, and plain text notes up to 10MB.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Customer Segments Section (Students vs Institutions) */}
      <section id="institutions" style={{
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>Academic Solutions</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Built for Students, Faculty, and Universities
            </h2>
            <p style={{ fontSize: '1rem' }}>
              Tailored workspaces whether you are preparing for semester finals or administering campus-wide academic assessments.
            </p>

            {/* Segment Toggle */}
            <div style={{
              display: 'inline-flex',
              padding: '0.35rem',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--border-subtle)',
              marginTop: '1.5rem'
            }}>
              <button
                onClick={() => setCustomerSegment('students')}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: customerSegment === 'students' ? 700 : 500,
                  backgroundColor: customerSegment === 'students' ? 'var(--bg-surface)' : 'transparent',
                  color: customerSegment === 'students' ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                  borderRadius: 'var(--radius-btn)',
                  boxShadow: customerSegment === 'students' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                Primary Customers: Students
              </button>
              <button
                onClick={() => setCustomerSegment('institutions')}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: customerSegment === 'institutions' ? 700 : 500,
                  backgroundColor: customerSegment === 'institutions' ? 'var(--bg-surface)' : 'transparent',
                  color: customerSegment === 'institutions' ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                  borderRadius: 'var(--radius-btn)',
                  boxShadow: customerSegment === 'institutions' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                Secondary Customers: Colleges & Faculty
              </button>
            </div>
          </div>

          {/* Segment Content */}
          {customerSegment === 'students' ? (
            <div className="grid-3">
              <div className="card">
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Undergraduate Engineering & Science
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  B.Tech, B.Sc, and BCA students managing heavy technical coursework with demanding lab vivas and comprehensive theory papers.
                </p>
                <ul style={{ fontSize: '0.825rem', color: 'var(--ink-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-coral)" /> Formula sheet and derivation breakdowns
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-coral)" /> Algorithm time complexity cheat sheets
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-coral)" /> Oral lab viva voce practice simulator
                  </li>
                </ul>
              </div>

              <div className="card">
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Postgraduate & Masters Candidates
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  M.Tech, MBA, and MCA students tackling research publications, complex case studies, and advanced seminar presentations.
                </p>
                <ul style={{ fontSize: '0.825rem', color: 'var(--ink-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-coral)" /> In-depth analytical 10-mark essay models
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-coral)" /> Research paper structure summarization
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-coral)" /> Key definitions and citation indexing
                  </li>
                </ul>
              </div>

              <div className="card">
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Pre-Exam Crammers & Working Students
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Students balancing internships and sports who need high-impact revision during the final 7 days before semester examinations.
                </p>
                <ul style={{ fontSize: '0.825rem', color: 'var(--ink-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-coral)" /> High probability recurring exam questions
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-coral)" /> Rapid keyboard-based flashcard drills
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-coral)" /> Automated day-by-day countdown checklists
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid-3">
              <div className="card">
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Colleges & University Campuses
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Campus-wide licensing providing secure, privacy-compliant study toolsets for hundreds of enrolled students.
                </p>
                <ul style={{ fontSize: '0.825rem', color: 'var(--ink-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-teal)" /> Institutional single sign-on (SSO) integration
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-teal)" /> Departmental syllabus repository management
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-teal)" /> Zero data retention on public AI models
                  </li>
                </ul>
              </div>

              <div className="card">
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Faculty & Department Professors
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Automate the creation of mid-term question banks, unit quizzes, and grading rubrics from approved syllabus texts.
                </p>
                <ul style={{ fontSize: '0.825rem', color: 'var(--ink-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-teal)" /> Automated question bank generator
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-teal)" /> Bloom's taxonomy level classification
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-teal)" /> Model answer key drafting and export
                  </li>
                </ul>
              </div>

              <div className="card">
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Academic Administrators & Deans
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Aggregate analytics on student study material engagement and syllabus coverage ahead of university accreditation.
                </p>
                <ul style={{ fontSize: '0.825rem', color: 'var(--ink-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-teal)" /> Course-level syllabus completion tracking
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-teal)" /> Diagnostic weak-topic identification reports
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--brand-teal)" /> Dedicated technical support and onboarding
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Transparent Pricing Section */}
      <section id="pricing" style={{
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Transparent Pricing</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Simple, Predictable Academic Plans
            </h2>
            <p style={{ fontSize: '1rem' }}>
              Zero hidden fees, zero pre-checked add-ons, and full 7-day money-back guarantee.
            </p>

            {/* Billing Toggle */}
            <div style={{
              display: 'inline-flex',
              padding: '0.3rem',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--border-subtle)',
              marginTop: '1.5rem'
            }}>
              <button
                onClick={() => setBillingPeriod('monthly')}
                style={{
                  padding: '0.45rem 1.15rem',
                  fontSize: '0.85rem',
                  fontWeight: billingPeriod === 'monthly' ? 700 : 500,
                  backgroundColor: billingPeriod === 'monthly' ? 'var(--bg-surface)' : 'transparent',
                  color: billingPeriod === 'monthly' ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                  borderRadius: 'var(--radius-btn)'
                }}
              >
                Monthly Plan
              </button>
              <button
                onClick={() => setBillingPeriod('semester')}
                style={{
                  padding: '0.45rem 1.15rem',
                  fontSize: '0.85rem',
                  fontWeight: billingPeriod === 'semester' ? 700 : 500,
                  backgroundColor: billingPeriod === 'semester' ? 'var(--bg-surface)' : 'transparent',
                  color: billingPeriod === 'semester' ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                  borderRadius: 'var(--radius-btn)'
                }}
              >
                Semester Pack (Save 33%)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid-3" style={{ alignItems: 'stretch' }}>
            {/* Free Plan */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge" style={{ marginBottom: '0.75rem' }}>Free Plan</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '0.25rem' }}>
                  ₹0<span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--ink-muted)' }}> / month</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.5rem' }}>
                  Essential tools for individual students testing course material summaries.
                </p>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--ink-primary)" /> Basic summaries (Brief mode)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--ink-primary)" /> 5 AI question sets per month
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--ink-primary)" /> 3 practice quizzes per month
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--ink-primary)" /> PDF and PPT upload up to 10MB
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => navigate('/signup')}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                Start Free Workspace
              </button>
            </div>

            {/* Student Premium */}
            <div className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '2px solid var(--ink-primary)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                backgroundColor: 'var(--brand-coral)',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                Recommended
              </div>

              <div>
                <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Student Premium</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '0.25rem' }}>
                  {billingPeriod === 'semester' ? '₹99' : '₹149'}
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--ink-muted)' }}>
                    {billingPeriod === 'semester' ? ' / month (billed ₹396 for 4 months)' : ' / month'}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.5rem' }}>
                  Complete exam prep workspace with unlimited question sets and viva simulations.
                </p>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-coral)" /> Unlimited document summaries (all 3 depths)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-coral)" /> High-priority 2-mark & 10-mark questions
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-coral)" /> Unlimited timed practice quizzes
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-coral)" /> Oral viva voce questions with model answers
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-coral)" /> Spaced-repetition active recall flashcards
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-coral)" /> Personalized exam countdown study plans
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => navigate('/signup')}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Upgrade to Premium
              </button>
            </div>

            {/* College / Institution Plan */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>College / Institution</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '0.25rem' }}>
                  Custom<span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--ink-muted)' }}> Annual Subscription</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.5rem' }}>
                  Campus-wide licensing for colleges, departments, and academic administrators.
                </p>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-teal)" /> Campus-wide student access
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-teal)" /> Faculty assessment & quiz generator tools
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-teal)" /> Centralized syllabus repository
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-teal)" /> Department-level student performance analytics
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} color="var(--brand-teal)" /> Dedicated account manager and SLA guarantee
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => navigate('/about')}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                Contact Academic Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Honest Bottom CTA Banner */}
      <section style={{
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        backgroundColor: 'var(--ink-primary)',
        color: 'var(--ink-inverse)'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Ready to Accelerate Your Academic Preparation?
          </h2>
          <p style={{ color: '#C0C0C0', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Upload your first lecture PDF and generate an exam study plan in under 60 seconds.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/signup')}
              className="btn btn-coral btn-lg"
              aria-label="Get Started Free on CampusAI"
            >
              <span>Get Started Free</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate('/features')}
              className="btn btn-secondary btn-lg"
              style={{ backgroundColor: 'transparent', color: '#FFFFFF', borderColor: '#4A4A4A' }}
            >
              <span>View All Features</span>
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .capability-selector-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .capability-selector-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
};
