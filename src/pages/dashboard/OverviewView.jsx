import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { EXAM_PATTERNS } from '../../types/data';
import { parseDocumentClientSide } from '../../utils/documentParser';
import {
  FileText,
  Award,
  Calendar,
  BarChart3,
  UploadCloud,
  ArrowRight,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  BookOpen,
  HelpCircle,
  Layers
} from 'lucide-react';

import { FacultyDashboardView } from './FacultyDashboardView';
import { AdminDashboardView } from './AdminDashboardView';

export const OverviewView = () => {
  const {
    user,
    documents = [],
    addDocument,
    deleteDocument,
    calculatedMetrics,
    setActiveStudyDrawerDoc,
    navigate
  } = useApp();

  const role = (user?.role || 'Student').toLowerCase();

  if (role.includes('faculty')) {
    return <FacultyDashboardView />;
  }

  if (role.includes('admin')) {
    return <AdminDashboardView />;
  }

  const [dragActive, setDragActive] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [quickExamPattern, setQuickExamPattern] = useState(user?.examPattern || 'JNTUH R22 (10x2m short + 5x10m essay)');
  const fileInputRef = useRef(null);

  // Live formatted current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Client-side File Upload & Text Parsing Engine
  const processUploadedFile = (file) => {
    setUploadError('');
    setUploadSuccess('');

    // Validate size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadError(`File "${file.name}" exceeds the 10MB upload limit.`);
      return;
    }

    // Validate extension
    const allowedExtensions = ['.pdf', '.ppt', '.pptx', '.doc', '.docx', '.txt'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      setUploadError(`Unsupported format "${fileExt}". Please upload PDF, PPT, PPTX, DOC, DOCX, or TXT.`);
      return;
    }

    setUploadLoading(true);

    // Realistic client-side parsing & generation using unified parser
    setTimeout(async () => {
      try {
        const newDoc = await parseDocumentClientSide(
          file,
          "Uploaded Course Materials",
          "Custom Ingested Module",
          quickExamPattern
        );
        addDocument(newDoc);
        setUploadLoading(false);
        setUploadSuccess(`Successfully parsed "${file.name}" with Exam Pattern "${quickExamPattern}". Generated comprehensive summaries, 6 exam questions, 4 quiz MCQs, 3 viva questions, and 4 flashcards!`);
        setTimeout(() => setUploadSuccess(''), 6000);
      } catch (err) {
        setUploadLoading(false);
        setUploadError(`Failed to parse file: ${err.message || 'Unknown parsing error'}`);
      }
    }, 600);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. Greeting & Live Date Badge */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--ink-primary)', letterSpacing: '-0.02em' }}>
            Welcome back, {user?.name || 'Student'}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
            {user?.role || 'Student'} Workspace • {user?.college || 'Academic Workspace'}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
            <Calendar size={14} color="var(--brand-coral)" style={{ marginRight: '0.25rem' }} />
            {currentDate}
          </span>
        </div>
      </div>

      {/* 2. Four Live Metric Cards (Strictly dynamically calculated from state) */}
      <div className="grid-4">
        {/* Metric 1 */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Study Materials
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-teal)' }}>
              <FileText size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            {calculatedMetrics?.materialsCount ?? (documents?.length || 0)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            Parsed PDFs, PPTs & Notes
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Quizzes Completed
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-coral)' }}>
              <Award size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            {calculatedMetrics?.quizzesCompletedCount ?? 0}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            Practice assessments scored
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Active Study Plans
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-teal)' }}>
              <Calendar size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            {calculatedMetrics?.activePlansCount ?? 0}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            Exam schedules in progress
          </div>
        </div>

        {/* Metric 4 */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Overall Progress
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-coral)' }}>
              <BarChart3 size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-coral)' }}>
            {calculatedMetrics?.overallProgress ?? 0}%
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            Tasks & quiz milestones met
          </div>
        </div>
      </div>

      {/* 3. Interactive Drag-and-Drop File Uploader */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
              Upload Your Study Materials
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
              Accepts .pdf, .ppt, .pptx, .doc, .docx, .txt up to 10MB. Instant client extraction with zero public model training.
            </p>
          </div>
          <span className="badge badge-teal">Client-Side Parser</span>
        </div>

        {uploadError && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-soft-accent)', color: 'var(--brand-coral)', borderRadius: 'var(--radius-btn)', fontSize: '0.825rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} />
            <span>{uploadError}</span>
          </div>
        )}

        {uploadSuccess && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-teal-subtle)', color: 'var(--brand-teal)', borderRadius: 'var(--radius-btn)', fontSize: '0.825rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={16} />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {/* University Exam Pattern Tagging Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          padding: '0.85rem 1rem',
          backgroundColor: 'var(--bg-muted)',
          borderRadius: 'var(--radius-btn)',
          border: '1px solid var(--border-subtle)',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-primary)' }}>
            Exam Blueprint Tag:
          </span>
          <select
            value={quickExamPattern}
            onChange={(e) => setQuickExamPattern(e.target.value)}
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.825rem',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--ink-primary)',
              maxWidth: '380px',
              flex: 1
            }}
            aria-label="Target University Exam Pattern"
          >
            {(EXAM_PATTERNS || []).map((pattern) => {
              const patternName = typeof pattern === 'object' ? pattern.name : pattern;
              const patternId = typeof pattern === 'object' ? (pattern.id || pattern.name) : pattern;
              return (
                <option key={patternId} value={patternName}>
                  {patternName}
                </option>
              );
            })}
          </select>
          <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
            All generated 2m, 5m & 10m questions calibrate to this marking scheme
          </span>
        </div>

        {/* Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: dragActive ? '2px dashed var(--brand-coral)' : '2px dashed var(--border-medium)',
            backgroundColor: dragActive ? 'var(--bg-soft-accent)' : 'var(--bg-muted)',
            borderRadius: 'var(--radius-card)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
            style={{ display: 'none' }}
          />

          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '6px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'var(--brand-coral)'
          }}>
            <UploadCloud size={24} aria-hidden="true" />
          </div>

          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink-primary)', marginBottom: '0.25rem' }}>
            {uploadLoading ? "Analyzing & Generating Study Resources..." : "Drag and drop your lecture slides or notes here"}
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--ink-muted)' }}>
            or click to browse your local device files
          </p>
        </div>
      </div>

      {/* 4. Quick Actions Panel (4 working buttons) */}
      <div>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem' }}>
          Quick Workspace Actions
        </h2>
        <div className="grid-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="card"
            style={{
              padding: '1.25rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div>
              <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-coral)', marginBottom: '0.75rem' }}>
                <UploadCloud size={18} />
              </div>
              <strong style={{ fontSize: '0.925rem', display: 'block', marginBottom: '0.25rem' }}>Upload New File</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>Ingest new lecture slides or PDF past papers.</p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-coral)', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>Upload now</span> <ArrowRight size={12} />
            </span>
          </button>

          <button
            onClick={() => navigate('/dashboard/summaries')}
            className="card"
            style={{
              padding: '1.25rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div>
              <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-teal)', marginBottom: '0.75rem' }}>
                <FileText size={18} />
              </div>
              <strong style={{ fontSize: '0.925rem', display: 'block', marginBottom: '0.25rem' }}>Generate Summary</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>View unit summaries across 3 distinct depths.</p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-teal)', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>View summaries</span> <ArrowRight size={12} />
            </span>
          </button>

          <button
            onClick={() => navigate('/dashboard/quizzes')}
            className="card"
            style={{
              padding: '1.25rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div>
              <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-coral)', marginBottom: '0.75rem' }}>
                <Award size={18} />
              </div>
              <strong style={{ fontSize: '0.925rem', display: 'block', marginBottom: '0.25rem' }}>Create Quiz</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>Test your retention with timed multiple choice questions.</p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-coral)', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>Launch quiz</span> <ArrowRight size={12} />
            </span>
          </button>

          <button
            onClick={() => navigate('/dashboard/study-plan')}
            className="card"
            style={{
              padding: '1.25rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div>
              <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-teal)', marginBottom: '0.75rem' }}>
                <Calendar size={18} />
              </div>
              <strong style={{ fontSize: '0.925rem', display: 'block', marginBottom: '0.25rem' }}>Get Study Plan</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>Paced daily checklist before your semester examination.</p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-teal)', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>Configure schedule</span> <ArrowRight size={12} />
            </span>
          </button>
        </div>
      </div>

      {/* 5. Recent Uploads Table */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Recent Academic Uploads
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
              Click "View" on any row to launch the interactive Document Study Drawer.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/upload')}
            className="btn btn-secondary btn-sm"
          >
            <span>Manage All Files ({(documents || []).length})</span>
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Subject & Syllabus Unit</th>
                <th>Exam Pattern</th>
                <th>Size</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!documents || documents.length === 0) ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink-muted)' }}>
                    No materials uploaded yet. Drag and drop a lecture file above.
                  </td>
                </tr>
              ) : (
                (documents || []).map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} color="var(--brand-coral)" />
                        <span style={{ fontWeight: 600 }}>{doc.name}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{doc.subject}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{doc.unit}</div>
                    </td>
                    <td>
                      <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                        {doc.examPattern || 'Standard Blueprint'}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono" style={{ fontSize: '0.8rem' }}>{doc.size}</span>
                    </td>
                    <td>
                      <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                        {doc.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button
                          onClick={() => setActiveStudyDrawerDoc(doc)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                          title="Open Study Drawer"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${doc.name}?`)) {
                              deleteDocument(doc.id);
                            }
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.35rem 0.55rem', color: 'var(--brand-coral)', borderColor: 'rgba(217, 45, 32, 0.3)' }}
                          title="Delete File"
                          aria-label={`Delete ${doc.name}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Bottom 4 Resource Cards (Your Summaries, Important Questions, Quizzes, Study Plan) */}
      <div className="grid-4">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <BookOpen size={16} color="var(--brand-coral)" />
              <strong style={{ fontSize: '0.95rem' }}>Your Summaries</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Concise bulleted takeaways and formula sheets ready for download.
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
              <HelpCircle size={16} color="var(--brand-teal)" />
              <strong style={{ fontSize: '0.95rem' }}>Important Questions</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              2-Mark, 5-Mark, and 10-Mark questions with model answer keys.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/questions')}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>View Questions</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={16} color="var(--brand-coral)" />
              <strong style={{ fontSize: '0.95rem' }}>Quizzes</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Timed diagnostic assessments with automated score verification.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/quizzes')}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>Take Practice Quiz</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Calendar size={16} color="var(--brand-teal)" />
              <strong style={{ fontSize: '0.95rem' }}>Study Plan</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Exam date countdown scheduler with day-by-day revision checklist.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/study-plan')}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>View Study Plan</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Dashboard = OverviewView;
export default OverviewView;
