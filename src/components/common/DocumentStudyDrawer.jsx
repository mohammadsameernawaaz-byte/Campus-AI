import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileText, CheckCircle2, Copy, Download, Trash2, HelpCircle, Layers, BookOpen, Clock, MessageSquare } from 'lucide-react';

export const DocumentStudyDrawer = () => {
  const { activeStudyDrawerDoc, setActiveStudyDrawerDoc, deleteDocument, createNewThread, navigate } = useApp();
  const [activeTab, setActiveTab] = useState('summary');
  const [copied, setCopied] = useState(false);
  const [selectedDepth, setSelectedDepth] = useState('detailed'); // brief, detailed, examCram

  if (!activeStudyDrawerDoc) return null;

  const doc = activeStudyDrawerDoc;

  const handleChatWithFile = () => {
    createNewThread(`Chat: ${doc.name}`, 'grounded', [doc.id]);
    setActiveStudyDrawerDoc(null);
    navigate('/dashboard/chat');
  };

  const handleCopy = () => {
    let contentToCopy = '';
    if (activeTab === 'summary') {
      contentToCopy = `${doc.name} Summary (${selectedDepth.toUpperCase()}):\n\n${doc.summary[selectedDepth]}`;
    } else if (activeTab === 'questions') {
      contentToCopy = doc.questions.map(q => `[${q.type}] ${q.question}\nAnswer: ${q.answer}\n`).join('\n\n');
    } else {
      contentToCopy = JSON.stringify(doc, null, 2);
    }
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format = 'md') => {
    let text = '';
    if (format === 'txt') {
      text = `${doc.name}\nSubject: ${doc.subject}\nUnit: ${doc.unit}\nBlueprint: ${doc.examPattern || 'Standard University Marking Scheme'}\n\n`;
      text += `=== SUMMARY (${selectedDepth.toUpperCase()}) ===\n${doc.summary[selectedDepth]}\n\n`;
      text += `=== IMPORTANT EXAM QUESTIONS ===\n` + doc.questions.map(q => `[${q.type}] ${q.question}\nAnswer: ${q.answer}\n`).join('\n\n');
    } else {
      text = `# ${doc.name}\nSubject: ${doc.subject}\nUnit: ${doc.unit}\nBlueprint: ${doc.examPattern || 'Standard University Marking Scheme'}\n\n`;
      text += `## Summary (${selectedDepth.toUpperCase()})\n${doc.summary[selectedDepth]}\n\n`;
      text += `## Important Exam Questions\n` + doc.questions.map(q => `### [${q.type}] ${q.question}\n${q.answer}`).join('\n\n');
    }

    const mime = format === 'txt' ? 'text/plain' : 'text/markdown';
    const ext = format === 'txt' ? 'txt' : 'md';
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.name.replace(/\.[^/.]+$/, "")}_StudyNotes.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${doc.name}?`)) {
      deleteDocument(doc.id);
      setActiveStudyDrawerDoc(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-doc-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(21, 21, 21, 0.55)',
        backdropFilter: 'blur(3px)',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={() => setActiveStudyDrawerDoc(null)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          height: '100%',
          backgroundColor: 'var(--bg-surface)',
          borderLeft: '2px solid var(--ink-primary)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
              <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>{doc.fileType.toUpperCase()}</span>
              <span className="badge" style={{ fontSize: '0.72rem' }}>{doc.size}</span>
              {doc.examPattern && (
                <span className="badge badge-coral" style={{ fontSize: '0.72rem' }}>
                  {doc.examPattern}
                </span>
              )}
              <span className="badge" style={{ fontSize: '0.72rem' }}>{doc.status}</span>
            </div>
            <h2 id="drawer-doc-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
              {doc.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
              {doc.subject} • {doc.unit} • Blueprint: {doc.examPattern || 'Standard University Marking Scheme'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleChatWithFile}
              className="btn btn-primary btn-sm"
              title="Chat with this File"
            >
              <MessageSquare size={15} />
              <span>Chat with this File</span>
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-secondary btn-sm"
              style={{ color: 'var(--brand-coral)', borderColor: 'rgba(217, 45, 32, 0.3)' }}
              title="Delete Document"
              aria-label="Delete this document"
            >
              <Trash2 size={16} aria-hidden="true" />
              <span>Delete</span>
            </button>
            <button
              onClick={() => setActiveStudyDrawerDoc(null)}
              className="btn btn-secondary btn-sm"
              aria-label="Close drawer"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--bg-muted)',
          borderBottom: '1px solid var(--border-subtle)',
          gap: '0.75rem'
        }}>
          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto' }}>
            {[
              { id: 'summary', label: 'Summary', icon: FileText },
              { id: 'questions', label: 'Important Questions', icon: HelpCircle },
              { id: 'viva', label: 'Viva Prep', icon: BookOpen },
              { id: 'flashcards', label: 'Flashcards', icon: Layers }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.825rem',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    borderRadius: 'var(--radius-btn)',
                    backgroundColor: activeTab === tab.id ? 'var(--ink-primary)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--ink-inverse)' : 'var(--ink-secondary)'
                  }}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Copy / Download */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleCopy}
              className="btn btn-secondary btn-sm"
              title="Copy current tab text"
            >
              {copied ? <CheckCircle2 size={14} style={{ color: 'green' }} /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={() => handleDownload('md')}
              className="btn btn-primary btn-sm"
              title="Download study markdown file"
            >
              <Download size={14} />
              <span>Download MD</span>
            </button>
            <button
              onClick={() => handleDownload('txt')}
              className="btn btn-secondary btn-sm"
              title="Download plain text study notes"
            >
              <Download size={14} />
              <span>Download TXT</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {activeTab === 'summary' && (
            <div>
              {/* Depth Selector */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
                backgroundColor: 'var(--bg-muted)',
                padding: '0.4rem',
                borderRadius: 'var(--radius-btn)',
                width: 'fit-content'
              }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-muted)', paddingLeft: '0.5rem' }}>
                  Depth:
                </span>
                {[
                  { id: 'brief', label: 'Brief' },
                  { id: 'detailed', label: 'Detailed' },
                  { id: 'examCram', label: 'Exam Cram' }
                ].map(depth => (
                  <button
                    key={depth.id}
                    onClick={() => setSelectedDepth(depth.id)}
                    style={{
                      padding: '0.3rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: selectedDepth === depth.id ? 700 : 500,
                      borderRadius: 'var(--radius-btn)',
                      backgroundColor: selectedDepth === depth.id ? 'var(--bg-surface)' : 'transparent',
                      color: selectedDepth === depth.id ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                      boxShadow: selectedDepth === depth.id ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    {depth.label}
                  </button>
                ))}
              </div>

              {/* Main Summary Text */}
              <div className="card" style={{ marginBottom: '1.5rem', whiteSpace: 'pre-line', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {doc.summary[selectedDepth]}
              </div>

              {/* Key Definitions */}
              {doc.summary.keyDefinitions && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>
                    Key Definitions
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {doc.summary.keyDefinitions.map((def, idx) => (
                      <div key={idx} className="card" style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--brand-teal)', marginBottom: '0.25rem' }}>
                          {def.term}
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)' }}>
                          {def.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formula Sheet */}
              {doc.summary.formulas && (
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>
                    Formula Sheet & Mathematical Identities
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                    {doc.summary.formulas.map((f, idx) => (
                      <div key={idx} className="card" style={{ padding: '0.85rem', backgroundColor: 'var(--bg-muted)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: '0.25rem' }}>
                          {f.title}
                        </div>
                        <code style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-primary)', display: 'block' }}>
                          {f.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'questions' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', margin: 0 }}>
                  Extracted high-weightage questions categorized by marks with complete model answers.
                </p>
                {doc.examPattern && (
                  <span className="badge badge-teal" style={{ fontSize: '0.75rem' }}>
                    Blueprint: {doc.examPattern}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {doc.questions.map((q) => (
                  <div key={q.id} className="card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span className={`badge ${q.type === '10-Mark' ? 'badge-coral' : 'badge-teal'}`}>
                        {q.type}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.75rem' }}>
                      {q.question}
                    </h4>
                    <div style={{
                      backgroundColor: 'var(--bg-muted)',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-btn)',
                      fontSize: '0.875rem',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line'
                    }}>
                      <strong style={{ color: 'var(--ink-primary)', display: 'block', marginBottom: '0.25rem' }}>
                        Model Answer:
                      </strong>
                      {q.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'viva' && (
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
                Oral examination and lab viva questions testing core conceptual mechanics.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {doc.viva.map((v) => (
                  <div key={v.id} className="card" style={{ padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.5rem' }}>
                      {v.question}
                    </h4>
                    <div style={{
                      backgroundColor: 'var(--bg-muted)',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-btn)',
                      fontSize: '0.875rem',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.6
                    }}>
                      <strong style={{ color: 'var(--brand-teal)', display: 'block', marginBottom: '0.25rem' }}>
                        Expected Examiner Answer:
                      </strong>
                      {v.expectedAnswer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
                Active recall flashcards extracted from this document.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {doc.flashcards.map((fc) => (
                  <div key={fc.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className="badge" style={{ marginBottom: '0.5rem' }}>{fc.tag}</span>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                        {fc.front}
                      </h4>
                    </div>
                    <div style={{
                      backgroundColor: 'var(--bg-muted)',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-btn)',
                      fontSize: '0.85rem',
                      color: 'var(--ink-secondary)',
                      whiteSpace: 'pre-line'
                    }}>
                      {fc.back}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
