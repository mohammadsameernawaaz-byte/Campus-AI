import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Cpu,
  Layers,
  HelpCircle,
  Calendar,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Search,
  BookOpen
} from 'lucide-react';

export const FeaturesPage = () => {
  const { navigate } = useApp();

  return (
    <main id="main-content" style={{ paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section style={{
        paddingTop: '3.5rem',
        paddingBottom: '3rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Platform Architecture</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Document Parsing & Academic Intelligence Architecture
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
            Explore how CampusAI extracts, structures, and synthesizes semester syllabus units, recurring exam patterns, and active recall drills.
          </p>
        </div>
      </section>

      {/* Feature Section 1: Ingestion Engine */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>Module 1</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
                Multi-Format Academic Document Parser
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                CampusAI ingests unstructured PDFs, faculty PowerPoint slide decks (.pptx), Word documents (.docx), and ASCII text files up to 10MB. Text layers, mathematical expressions, algorithm steps, and slide bullet points are extracted without losing section hierarchy.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle size={18} color="var(--brand-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Slide-to-Concept Chunking:</strong> Preserves lecture order and isolates distinct topics.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle size={18} color="var(--brand-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Formula Recognition:</strong> Automatically identifies mathematical formulas and algorithm bounds.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle size={18} color="var(--brand-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Private Client Processing:</strong> No documents are used to train external language models.</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-muted)', padding: '2rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Ingestion Pipeline Specification
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
                <div className="card" style={{ padding: '0.85rem' }}>
                  <strong style={{ color: 'var(--brand-coral)' }}>Step 1: Document Tokenization</strong>
                  <div style={{ color: 'var(--ink-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    Extracts raw strings, headings, bullet lists, and table structures into normalized markdown.
                  </div>
                </div>
                <div className="card" style={{ padding: '0.85rem' }}>
                  <strong style={{ color: 'var(--brand-coral)' }}>Step 2: Syllabus Unit Mapping</strong>
                  <div style={{ color: 'var(--ink-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    Categorizes content into standard university syllabus units (Unit 1 to Unit 5).
                  </div>
                </div>
                <div className="card" style={{ padding: '0.85rem' }}>
                  <strong style={{ color: 'var(--brand-coral)' }}>Step 3: Multi-Artifact Generation</strong>
                  <div style={{ color: 'var(--ink-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    Generates 3-depth summaries, 2-mark & 10-mark questions, quizzes, and viva prompts simultaneously.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Exam Question Synthesis */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="card" style={{ backgroundColor: 'var(--bg-surface)', padding: '2rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Question Classification Matrix
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ borderLeft: '3px solid var(--brand-teal)', paddingLeft: '1rem' }}>
                  <strong style={{ fontSize: '0.9rem' }}>2-Mark Short Answer Questions</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
                    Focuses on definitions, properties, comparisons, and core axioms suitable for Section A university papers.
                  </p>
                </div>
                <div style={{ borderLeft: '3px solid var(--ink-primary)', paddingLeft: '1rem' }}>
                  <strong style={{ fontSize: '0.9rem' }}>5-Mark Analytical Questions</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
                    Algorithm step-by-step traces, derivation outlines, and intermediate numerical evaluations.
                  </p>
                </div>
                <div style={{ borderLeft: '3px solid var(--brand-coral)', paddingLeft: '1rem' }}>
                  <strong style={{ fontSize: '0.9rem' }}>10-Mark Long Essay Questions</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
                    Comprehensive design questions, complete proofs, algorithm complexity analyses, and real-world system applications.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Module 2</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
                Examination Blueprint Analysis
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                University exam questions adhere to strict structural formats. CampusAI models standard examination blueprints (such as JNTU, VTU, Anna University, and autonomous college patterns) to generate high-probability questions complete with point-wise model answers.
              </p>
              <button
                onClick={() => navigate('/dashboard/questions')}
                className="btn btn-primary"
              >
                <span>View Question Generator</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3: Faculty Assessment Tools */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '2.5rem' }}>
            <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>Faculty & Institutions</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Academic Assessment Builder for Educators
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)' }}>
              Empowering professors and department heads to draft assessments that align with institutional learning outcomes.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Question Bank Generator
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                Upload course syllabi and generate multi-tier question pools for mid-term tests and lab practical assessments in minutes.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Bloom's Taxonomy Tagging
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                Every generated question is tagged with cognitive levels: Remember, Understand, Apply, Analyze, and Evaluate.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Syllabus Ingestion Tracking
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                Department administrators can audit which course units have complete notes and verify student revision coverage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
